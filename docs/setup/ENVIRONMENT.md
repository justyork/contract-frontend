# Окружение — Contractor Frontend

## Окружения

| Окружение | Назначение | Типичный URL |
|-----------|------------|--------------|
| **Development** | Локальная разработка | `http://localhost:3000` |
| **Staging** | Предпродакшен-тестирование | напр. `https://staging-app.example.com` |
| **Production** | Боевое приложение | напр. `https://clealex.com` |

В браузер попадают только переменные с префиксом `NEXT_PUBLIC_`. Остальные в Next.js — на время сборки или только для сервера; в этом приложении основные потоки рендерятся на клиенте, поэтому **никогда не помещайте секреты в `NEXT_PUBLIC_*`**.

## Различия между окружениями

| Аспект | Development | Staging | Production |
|--------|-------------|---------|------------|
| URL API | Обычно локальный (напр. `http://localhost:8080/api`) | Базовый URL API стейджинга | Базовый URL API продакшена |
| Reverb | Опционально; локальный Reverb или выключен | Reverb стейджинга или выключен | Reverb продакшена (WSS) |
| Stripe | Тестовый publishable key | Тестовый или боевой по политике | Боевой publishable key |
| Отчёт об ошибках | Консоль / dev tools | Опционально | Полный (напр. Sentry) |
| Source maps | Часто включены | Опционально | Обычно выключены или загружаются отдельно |

## Обязательные переменные окружения

| Переменная | Обязательна | Описание |
|------------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Да | Базовый URL Contractor API, без завершающего слэша (напр. `http://localhost:8080/api`). Используется для REST и редиректов авторизации. |

## Опциональные переменные окружения

| Переменная | Обязательна | Описание |
|------------|-------------|----------|
| `NEXT_PUBLIC_REVERB_APP_KEY` | Нет | Ключ приложения Reverb для WebSocket. Если не задан, прогресс в реальном времени может быть отключён или использоваться опрос. |
| `NEXT_PUBLIC_REVERB_HOST` | Нет | Хост Reverb (по умолчанию — hostname из URL API, если не задан). |
| `NEXT_PUBLIC_REVERB_PORT` | Нет | Порт Reverb (по умолчанию `8081`). |
| `NEXT_PUBLIC_REVERB_SCHEME` | Нет | `http` или `https`; в продакшене использовать `https` для WSS. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Нет | Publishable key Stripe для checkout на клиенте (напр. `pk_test_...` или `pk_live_...`). |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Нет | Email для страницы Contact & Support (поддержка, запросы по персональным данным). В проде задать реальное значение. |
| `NEXT_PUBLIC_COMPANY_NAME` | Нет | Название компании для страницы Contact & Support и согласованности с Privacy/Terms. |
| `NEXT_PUBLIC_COMPANY_ADDRESS` | Нет | Юридический адрес для страницы Contact & Support. |
| `NEXT_PUBLIC_GTM_ID` | Нет | ID контейнера Google Tag Manager (напр. `GTM-XXXXXX`). При задании GTM подключается только после согласия пользователя на аналитические cookies («Accept all»); события отправляются в `dataLayer` для настройки тегов в GTM (GA4 и др.). |

## Правила работы с секретами

1. **Без секретов в репозитории:** не коммитить `.env`, `.env.local` и любые файлы с секретами.
2. **Клиентский бандл:** только `NEXT_PUBLIC_*` подставляются при сборке; использовать их только для несекретной конфигурации (URL, publishable keys).
3. **Ключи и секреты API:** секретный ключ Stripe, секреты API и секрет приложения Reverb хранятся только на сервере Contractor API.
4. **CI/CD:** задавать переменные в платформе CI/CD (напр. Vercel, GitHub Actions) как защищённые; не выводить их в логах.
5. **.gitignore:** в `.gitignore` должны быть `.env.local`, `.env.*.local` и `.env`.

## Порядок загрузки конфигурации

Next.js загружает env-файлы в таком порядке (позже переопределяет раньше):

1. `process.env` (система/шелл)
2. `.env`
3. `.env.local` (переопределяет `.env`; не коммитится)
4. `.env.development` / `.env.production` (в зависимости от NODE_ENV)
5. `.env.development.local` / `.env.production.local` (в зависимости от NODE_ENV; не коммитится)

Для локальной разработки используйте `.env.local` и не добавляйте его в систему версий.

## Изоляция окружений при развёртывании

- **Staging и production** должны использовать разные базовые URL API и при необходимости разные ключи Stripe (тест и боевой).
- **Production** должен использовать HTTPS для приложения и WSS для Reverb (`NEXT_PUBLIC_REVERB_SCHEME=https`).
- Не использовать продакшен-ключи и URL в разработке и на стейджинге.

## Пример `.env.local` (разработка)

```bash
# Contractor API (локально)
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Reverb (локально; опционально)
NEXT_PUBLIC_REVERB_APP_KEY=your-reverb-app-key
NEXT_PUBLIC_REVERB_HOST=localhost
NEXT_PUBLIC_REVERB_PORT=8081
NEXT_PUBLIC_REVERB_SCHEME=http

# Тестовый ключ Stripe (опционально)
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Подставьте реальные значения вместо плейсхолдеров; убедитесь, что `.env.local` указан в `.gitignore`.
