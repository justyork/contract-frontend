# Установка — Contractor Frontend

## Системные требования

| Требование | Версия / примечания |
|------------|---------------------|
| **Node.js** | >= 20.9.0 (требуется для Next.js 16) |
| **npm** | 9+ (или yarn; lockfile присутствует) |

Фронтенд — приложение на Next.js 16; убедитесь, что Node соответствует [требованиям Next.js](https://nextjs.org/docs/get-started/installation).

## Необходимые инструменты и версии

| Инструмент | Назначение |
|------------|------------|
| Node.js 20.x LTS | Среда выполнения |
| npm 9+ или yarn | Менеджер пакетов |
| Git | Контроль версий |

База данных и очереди внутри фронтенда не используются; все бэкенд-сервисы предоставляет Contractor API.

## Шаги установки

### 1. Клонирование и переход в проект

При работе из корня монорепозитория:

```bash
cd /path/to/PROJECT1_CONTRACT/contractor-frontend
```

### 2. Установка зависимостей

```bash
npm install
```

Или с yarn:

```bash
yarn install
```

### 3. Файл окружения

Скопируйте пример и задайте значения (см. [ENVIRONMENT.md](ENVIRONMENT.md)):

```bash
cp .env.example .env.local
```

Отредактируйте `.env.local` и укажите как минимум:

- `NEXT_PUBLIC_API_URL` — базовый URL Contractor API (напр. `http://localhost:8080/api`).

Опционально для прогресса в реальном времени:

- `NEXT_PUBLIC_REVERB_APP_KEY`, `NEXT_PUBLIC_REVERB_HOST`, `NEXT_PUBLIC_REVERB_PORT`, `NEXT_PUBLIC_REVERB_SCHEME`

### 4. Запуск сервера разработки

```bash
npm run dev
```

Или:

```bash
yarn dev
```

Откройте [http://localhost:3000](http://localhost:3000). Приложение будет обращаться к API по `NEXT_PUBLIC_API_URL`; убедитесь, что Contractor API запущен и CORS разрешает origin фронтенда.

## База данных, очереди и cron

Фронтенд **не** использует базу данных, очереди или cron. Все постоянные данные и фоновая работа выполняются Contractor API. Миграции и воркеры для фронтенда не требуются.

## Локальный рабочий процесс

1. **Запуск API (отдельный терминал):** из корня монорепо или `contractor-api` запустите Laravel (напр. `sail up` или `php artisan serve` + queue worker + при необходимости Reverb). См. [INSTALLATION.md](../../../INSTALLATION.md) в корне проекта или документацию contractor-api.
2. **Запуск фронтенда:** из `contractor-frontend` выполните `npm run dev`.
3. **Окружение:** используйте `.env.local` для локальных переопределений; не коммитьте его.
4. **Проверка сборки:** перед коммитом выполняйте `npm run build`, чтобы выявить ошибки сборки и типов.
5. **Линтер:** `npm run lint` (ESLint).

## Миграции

Не применимо. У фронтенда нет миграций. Изменения схемы и данных выполняются в Contractor API.

## Краткая сводка команд

| Команда | Назначение |
|---------|------------|
| `npm install` | Установка зависимостей |
| `npm run dev` | Запуск dev-сервера (порт 3000 по умолчанию) |
| `npm run build` | Продакшен-сборка |
| `npm run start` | Запуск продакшен-сервера (после сборки) |
| `npm run lint` | Запуск ESLint |

При использовании Makefile монорепо из корня проекта `make dev` может запускать и API, и фронтенд; см. [README](../../../README.md) или [INSTALLATION.md](../../../INSTALLATION.md) в корне.

## Устранение неполадок

| Проблема | Действие |
|----------|----------|
| Порт 3000 занят | Другой порт: `npm run dev -- -p 3001` |
| Вызовы API падают | Проверить `NEXT_PUBLIC_API_URL` и что API запущен; проверить CORS и вкладку Network |
| WebSocket не подключается | Проверить переменные Reverb и что Reverb запущен; см. [ENVIRONMENT.md](ENVIRONMENT.md) |
| Сборка падает | Выполнить `npm run build` и исправить ошибки TypeScript/ESLint; проверить версию Node |
