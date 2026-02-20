# Стиль кода — Contractor Frontend

## Соглашения по именованию

### Файлы и папки

| Тип | Соглашение | Пример |
|-----|------------|--------|
| React-компоненты | PascalCase | `ContractSummaryCard.tsx`, `AiShell.tsx` |
| Хуки | camelCase, префикс `use` | `useAuth.ts`, `useContract.ts` |
| Утилиты / lib | camelCase | `api.ts`, `echo.ts`, `markdown.ts` |
| Типы | PascalCase | типы внутри `api.ts` или `types/contract.ts` |
| Папки маршрутов | lowercase | `app/ai/dashboard/`, `app/contract/[id]/` |
| Компонент страницы | `page.tsx` | соглашение Next.js App Router |
| Компонент layout | `layout.tsx` | соглашение Next.js App Router |

### Переменные и функции

| Тип | Соглашение | Пример |
|-----|------------|--------|
| Переменные, параметры | camelCase | `contractId`, `userName` |
| Константы (env, конфиг) | UPPER_SNAKE_CASE или camelCase | `NEXT_PUBLIC_API_URL` или в коде `apiBaseUrl` |
| Функции | camelCase | `getToken`, `fetchContracts` |
| React-компоненты | PascalCase | `ContractSummaryCard` |
| Обработчики событий | префикс `handle` или `on` | `handleSubmit`, `onAnalysisComplete` |
| Булевы значения | при необходимости префикс `is`, `has`, `should` | `isLoading`, `hasError` |

### TypeScript

| Тип | Соглашение | Пример |
|-----|------------|--------|
| Интерфейсы / типы | PascalCase | `Contract`, `ApiError`, `AnalysisSection` |
| Параметры дженериков | Одна буква или PascalCase | `T`, `TContract` |
| Enum (при использовании) | PascalCase; члены PascalCase или UPPER_SNAKE | `Status.Pending`, `Status.COMPLETED` |

## Соглашения по слоям

### App (страницы и лейауты)

- **Страницы:** один компонент как default export; имя файла `page.tsx`.
- **Лейауты:** один компонент как default export; имя файла `layout.tsx`; оборачивают children и общую оболочку.
- **Без бизнес-логики:** страницы собирают компоненты и вызывают хуки/lib; в теле страницы не вызывать API или Echo напрямую, если для этого есть хук/lib.

### Компоненты

- **Один основной компонент на файл;** мелкие подкомпоненты могут быть в том же файле, если не переиспользуются.
- **Интерфейс пропсов:** имя `ComponentNameProps` или инлайн-тип; экспортировать при переиспользовании.
- **Default export** для основного компонента; при необходимости named export для типов или подкомпонентов.

### Lib и контексты

- **api.ts:** экспортировать хелперы на базе `request` и общие типы (напр. `ApiError`); не экспортировать `getToken`, если он внутренний.
- **echo.ts:** экспортировать фабрику или синглтон и публичные типы; конфиг Reverb из env хранить внутри модуля.
- **Контексты:** экспортировать провайдер и хук (напр. `useAuth`); документировать, что хранится в контексте.

## Правила организации файлов

- **Колокация при малом объёме:** типы, используемые одним компонентом, могут быть в том же файле.
- **Общие типы:** в `src/types/` (напр. `api.ts`) или в отдельном файле типов в фиче.
- **Без «бочек»:** предпочтительны явные импорты; index re-export только там, где это уменьшает шум и стабильно.
- **Порядок:** сначала импорты (внешние, затем внутренние), затем типы, затем компонент/логика; придерживаться принятого в команде порядка (напр. React, затем Next, затем локальные).

## Правила обработки ошибок

- **Ошибки API:** использовать клиент из `lib/api.ts`; он бросает при не-2xx; ловить и показывать пользовательское сообщение или fallback UI.
- **Без тихих catch:** избегать `catch (e) {}`; как минимум логировать или выставлять состояние ошибки.
- **Обратная связь пользователю:** показывать загрузку во время асинхронной работы; при ошибке — состояние ошибки с повтором или сообщением.
- **Типы:** использовать `ApiError` или аналог для формы ошибки API; по возможности типизировать выбрасываемую ошибку.

## Стандарты логирования

- **Разработка:** допускаются `console.log` / `console.warn` / `console.error` для отладки; в продакшене убирать или ограничивать при чувствительных данных.
- **Продакшен:** предпочтительны отдельный логгер или отчёт об ошибках (напр. Sentry); не логировать токены и PII.
- **Без секретов:** никогда не логировать заголовок `Authorization`, токен или любой секрет.

## Правила внедрения зависимостей

- **Без DI-фреймворка:** использовать React context для зависимостей между деревьями (авторизация, тема и т.д.).
- **API и Echo:** импортировать из `lib/api` и `lib/echo` напрямую; при тестах мокать при необходимости.
- **Окружение:** читать `process.env.NEXT_PUBLIC_*` в месте вызова или в небольшом конфиг-модуле; не прокидывать env через много слоёв.

## Пример: хорошо и плохо

### Хорошо

```tsx
// components/ai/ContractSummaryCard.tsx
import { type Contract } from "@/types/api";

interface ContractSummaryCardProps {
  contract: Contract;
  onSelect?: (id: string) => void;
}

export function ContractSummaryCard({ contract, onSelect }: ContractSummaryCardProps) {
  return (
    <article>
      <h3>{contract.title ?? "Без названия"}</h3>
      <button type="button" onClick={() => onSelect?.(contract.id)}>Просмотр</button>
    </article>
  );
}
```

### Плохо

```tsx
// Смешение fetch в компоненте и any
export default function ContractSummaryCard(props: any) {
  const [c, setC] = useState(null);
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/contracts/" + props.id)
      .then(r => r.json())
      .then(setC);
  }, []);
  return <div>{c?.title}</div>;
}
```

**Почему плохо:** используется сырой `fetch` вместо `lib/api.ts`, тип `any`, нет состояний загрузки/ошибки и дублируется логика API в компоненте.

### Хорошо (использование API)

```ts
// lib/api.ts или хук
const contract = await api.getContract(id);
```

```tsx
// На странице или в контейнере
const { data, error, isLoading } = useContract(id);
if (isLoading) return <Spinner />;
if (error) return <ErrorMessage error={error} />;
return <ContractSummaryCard contract={data} />;
```

Эти правила сохраняют единообразие и удобочитаемость для AI; исключения (напр. отключение правила линтера) должны быть обоснованы и задокументированы.
