# Contralytic / Contractor Frontend

This is the frontend for Contralytic MVP — AI-powered contract analysis SaaS built with [Next.js](https://nextjs.org).

## Quick Start

**Using Makefile (recommended):**
```bash
make install    # Install dependencies
make dev       # Start development server
```

**Or using npm directly:**
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run `make help` to see all available commands.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Документация

Структурированная документация для AI-агентов и разработчиков в `docs/`:

- **[docs/README.md](docs/README.md)** — оглавление и быстрые ссылки
- **[AGENTS.md](AGENTS.md)** — роли и процессы AI-агентов
- **Установка:** [docs/setup/SETUP.md](docs/setup/SETUP.md), [docs/setup/ENVIRONMENT.md](docs/setup/ENVIRONMENT.md)
- **Архитектура:** [docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md), [docs/architecture/CONTEXT_MAP.md](docs/architecture/CONTEXT_MAP.md)

Скопируйте `.env.example` в `.env.local` и задайте `NEXT_PUBLIC_API_URL` (и при необходимости переменные Reverb/Stripe). См. [docs/setup/ENVIRONMENT.md](docs/setup/ENVIRONMENT.md).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
