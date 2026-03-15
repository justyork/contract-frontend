# Развёртывание — Contractor Frontend

## Обзор CI/CD

Фронтенд — результат статической/Node-сборки: собрать один раз, затем отдавать артефакт. Типичный пайплайн:

1. **Триггер:** push или PR в целевую ветку (напр. `main`, `staging`).
2. **Установка:** `npm ci` (или `yarn install --frozen-lockfile`) для воспроизводимой установки.
3. **Линт:** `npm run lint`.
4. **Проверка типов / сборка:** `npm run build` (включает TypeScript).
5. **Деплой:** загрузка результата сборки на хостинг (напр. Vercel, Netlify или свой Node-сервер с `next start`).

Миграции БД и воркеры очередей в деплой фронтенда не входят. Contractor API разворачивается отдельно.

## Стратегия веток

| Ветка | Назначение | Деплой в |
|-------|------------|----------|
| `main` (или `master`) | Код, готовый к продакшену | Production |
| `staging` (опционально) | Предпродакшен | Staging |
| Фича-ветки | Разработка, PR | Превью (если настроено) или не деплоятся |

Вливать в `main` только после ревью и прохождения проверок. Ветка staging опциональна; в некоторых настройках есть только `main` и превью из PR.

## Поток развёртывания

```
Коммит → Push в ветку
  → CI: install, lint, build
  → При успехе: деплой в окружение (preview / staging / production)
  → Здоровье: приложение отдаётся и может достучаться до API (вручную или smoke-проверка)
```

**Схема потока:**

```
[Разработчик] → git push
       ↓
[CI] install → lint → build
       ↓ (успех)
[Хостинг] развёрнут результат сборки
       ↓
[Рантайм] Next.js отдаёт приложение; приложение обращается к NEXT_PUBLIC_API_URL
```

## Стратегия отката

1. **Реверт коммита:** откатить мерж-коммит в `main`, push; повторный деплой.
2. **Повторный деплой предыдущей сборки:** если хостинг хранит предыдущие артефакты — запустить деплой последней успешной сборки.
3. **Откат окружения:** если сбой из-за env (напр. неверный URL API) — исправить переменные на хостинге и переразвернуть или перезапустить без смены кода.

Не откатывать Contractor API только из-за проблемы фронтенда, если только фронтенд не зависит от изменения API, которое нужно откатить.

## Проверки здоровья

- **Сборка:** в CI должны проходить `npm run build` и `npm run lint`.
- **Рантайм:** после деплоя корневой URL (напр. `https://app.example.com/`) должен отдавать 200 и оболочку приложения.
- **Зависимость от API:** при недоступности или неверной настройке API вызовы будут 4xx/5xx; API мониторить отдельно. При необходимости — отдельная страница «health» или «ping», вызывающая лёгкий эндпоинт API и показывающая статус.

## Интеграция мониторинга

- **Ошибки:** интеграция с сервисом отчётов об ошибках (напр. Sentry) для необработанных исключений и неудачных вызовов API; конфиг на время сборки или в рантайме (напр. `NEXT_PUBLIC_SENTRY_DSN`).
- **Аналитика:** при использовании подключать через env или скрипт; учитывать PII и согласие.
- **Логи:** логи платформы хостинга (напр. Vercel) для запросов/ответов и серверных логов; без секретов в логах.

## Правила версионирования релизов

- **Семантическое версионирование:** опционально для приложения (напр. версия в `package.json`); часто «релиз» — это Git-тег или коммит в `main`.
- **Changelog:** фиксировать пользовательские изменения в CHANGELOG или release notes при выпуске релиза.
- **Совместимость:** документировать требуемый `NEXT_PUBLIC_API_URL` и минимальную версию API при зависимости фронтенда от конкретных эндпоинтов или полей.

## Пример: Vercel

1. Подключить репозиторий (или подкаталог `contractor-frontend`) к Vercel.
2. Указать корневую директорию `contractor-frontend` при монорепо.
3. Команда сборки: `npm run build` (или `yarn build`).
4. Вывод: стандартный вывод Next.js (`.next` + статика).
5. Задать переменные окружения в панели Vercel: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_REVERB_*` и т.д.
6. Продакшен-ветка: `main`; опционально превью для PR.

## Пример: свой Node-сервер

```bash
npm ci
npm run build
NODE_ENV=production npm run start
```

Запускает Next.js в продакшен-режиме на порту по умолчанию (3000); разместить за обратным прокси (напр. nginx) с HTTPS. Переменные окружения задавать в процессе или в `.env.production` (секреты не коммитить).

## Пример: Hetzner + GitHub Actions (Ubuntu + aaPanel)

Деплой по SSH при push в `develop` (staging) или `master` (production). Workflow: `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`.

**GitHub Secrets:**

| Secret | Описание |
|--------|----------|
| `SSH_PRIVATE_KEY` | Приватный ключ для SSH (без пароля) |
| `SSH_HOST` | Хост или IP сервера |
| `SSH_USER` | Пользователь ОС |
| `DEPLOY_PATH_STAGING` | Путь к коду staging, напр. `/var/www/clealex-frontend-staging` |
| `DEPLOY_PATH_PRODUCTION` | Путь к коду production, напр. `/var/www/clealex-frontend` |

**На сервере:** два каталога (staging и production), в каждом клон репо с соответствующей веткой и свой `.env`/`.env.production`. После `git pull` выполняется `npm ci`, `npm run build` и перезапуск приложения (PM2 или systemd; имена сервисов в `deploy.yml` при необходимости изменить: напр. `clealex-frontend-staging`, `clealex-frontend`).

## Устранение неполадок: старый контент после деплоя

**PM2 не кеширует ответы** — это только менеджер процессов. Кеш даёт либо браузер, либо прокси перед приложением (чаще всего nginx или CDN).

### Если перезагрузка в терминале (pm2 restart / node) не помогает

Значит кеш **не в приложении**, а **перед ним** (nginx или CDN). Next.js уже отдаёт новое, но ответ кешируется прокси.

**Быстрая проверка на сервере** — сравнить ответ с localhost и по публичному домену:

```bash
# Порт приложения (если не 3000 — подставить свой)
PORT=3000

# Ответ напрямую от приложения (должен быть новый контент и Cache-Control: s-maxage=0)
echo "=== Ответ от приложения (127.0.0.1:$PORT) ==="
curl -sI "http://127.0.0.1:$PORT/"

# Ответ через nginx/внешний адрес (если здесь старый контент или старые заголовки — кеш в nginx/CDN)
echo "=== Ответ по домену (через nginx) ==="
curl -sI "https://ВАШ_ДОМЕН/"
```

Если по `127.0.0.1` всё новое, а по домену — старое, **нужно править nginx (или очистить кеш CDN)**. См. шаги 3 и 4 ниже.

### 1. Убедиться, что крутится новый процесс

На сервере:

```bash
pm2 list
pm2 show clealex-frontend   # смотреть "uptime" — после рестарта должно обнулиться
```

Если в деплое указано неверное имя (не то, под которым зарегистрирован процесс), `pm2 restart clealex-frontend` ничего не перезапустит и будет работать старый процесс. Имена в `deploy.yml` должны совпадать с `pm2 list`.

### 2. Проверить ответ напрямую от Node (минуя nginx)

На сервере:

```bash
curl -sI http://127.0.0.1:3000/
```

Посмотреть заголовок **Cache-Control**: должно быть `s-maxage=0` (как в `next.config.ts`). Если контент/заголовки правильные по `curl` на localhost, но в браузере по домену — старый, кеш не в PM2 и не в Next.js.

### 3. Кеш nginx (Hetzner + aaPanel)

Если перед приложением стоит nginx, он может кешировать ответы. Нужно отключить кеш прокси для этого сайта.

**Где править (aaPanel):** Website → нужный сайт → Settings → Configuration File (или конфиг вручную в `/www/server/panel/vhost/nginx/ИМЯ_САЙТА.conf`).

**Что искать и убрать/заменить:**
- Строки с `proxy_cache`, `proxy_cache_path`, `proxy_cache_valid` — удалить или закомментировать для location, который проксирует на Next.js.
- В блок `location /` (или тот, что проксирует на порт приложения) добавить или оставить:

```nginx
proxy_cache off;
proxy_no_cache 1;
proxy_cache_bypass 1;
```

**Полный пример location для Next.js (без кеша):** см. ниже пример для aaPanel.

**Пример: конфиг aaPanel для Next.js (clealex.com)**

Почему старый контент не уходит:

1. **`proxy_ignore_headers Set-Cookie Cache-Control expires`** — nginx не учитывает заголовок Cache-Control от Next.js, поэтому настройки из `next.config.ts` не действуют на уровне прокси.
2. **`proxy_cache cache_one`** и **`proxy_cache_valid 200 304 301 302 1m`** — nginx кеширует все ответы на 1 минуту; после деплоя пользователи до минуты видят старую версию.

Нужно убрать кеш прокси для этого location и не игнорировать Cache-Control. Вариант конфига (заменить блок `#PROXY-START` … `#PROXY-END` на такой):

```nginx
#PROXY-START/www/wwwroot/clealex.com
location ^~ /
{
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_http_version 1.1;

    # Отключаем кеш nginx — иначе после деплоя до 1m отдаётся старый контент
    proxy_cache off;
    proxy_no_cache 1;
    proxy_cache_bypass 1;
    # Не игнорировать Cache-Control от Next.js (убрать proxy_ignore_headers для Cache-Control)
    proxy_ignore_headers Set-Cookie;

    add_header X-Cache-Status $upstream_cache_status;

    # Кеш только для статики по расширению (опционально; для Next.js статика уже с хешем в имени)
    if ( $uri ~* "\.(gif|png|jpg|css|js|woff|woff2)$" )
    {
        expires 1m;
    }
}
#PROXY-END/
```

Удалено: `proxy_cache cache_one`, `proxy_cache_key`, `proxy_cache_valid`, из `proxy_ignore_headers` убраны `Cache-Control` и `expires`. Добавлено: `proxy_cache off`, `proxy_no_cache 1`, `proxy_cache_bypass 1`.

После правок: Save в aaPanel → Nginx → Reload (или `sudo nginx -t && sudo systemctl reload nginx`).

### 4. CDN (Cloudflare и т.п.)

Если перед сервером стоит CDN, после деплоя сделать **Purge Cache** в панели CDN. Дальше настроить кеш так, чтобы HTML не кешировался долго или учитывался Cache-Control от апстрима.

Этот документ — единственная ссылка по развёртыванию фронтенда; обновлять при изменении CI или хостинга.
