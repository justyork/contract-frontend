# Marketing Improvements Plan

> Конкретный план изменений для повышения конверсии перед выходом в прод.
> Статусы: 🔴 Блокер прода · 🟡 Высокий приоритет · 🟢 Средний приоритет

---

## 1. Placeholder-метрики — удалить или заменить реальными

**Файл:** `src/app/page.tsx`, строки 462–497

### Что сейчас (строки 463–476)

```tsx
{ value: "10k+",    label: "contracts reviewed*",              Icon: TrendingUp },
{ value: "<5 min",  label: "average first-pass analysis time*", Icon: Clock      },
{ value: "24/7",    label: "self-serve availability",           Icon: Zap        },
```

И строка 496:
```
* Placeholder metrics. Replace with production analytics values.
```

### Вариант A — убрать секцию целиком до накопления данных 🔴

Удалить весь блок `<Section data-animate>` со строки 457 по 498.
Вместо него нет ничего — переход сразу к `#pricing`.

### Вариант B — заменить на нейтральные преимущества (без цифр) 🔴

```tsx
{ value: "Minutes", label: "from upload to full report",  Icon: Clock      },
{ value: "AI + ML", label: "multi-layer analysis pipeline", Icon: TrendingUp },
{ value: "24/7",    label: "self-serve, no waiting list",  Icon: Zap        },
```

Убрать сноску `* Placeholder metrics. Replace with production analytics values.` полностью.

### Вариант C — подключить реальные данные из API

Добавить GET `/stats/public` на бэкенде, возвращающий `{ contracts_analyzed, avg_analysis_seconds }`.
Загружать в `useEffect` и показывать реальные числа.

---

## 2. Секция "Proof and trust" — добавить социальное доказательство

**Файл:** `src/app/page.tsx`, после строки 498 (перед секцией `#pricing`)

### Что добавить — секция Testimonials 🟡

Добавить новый `<Section>` с карточками отзывов:

```tsx
<Section background="surface" data-animate>
  <div className="text-center">
    <h2 className="section-title font-light">What users say</h2>
  </div>
  <div className="mt-10 grid gap-5 md:grid-cols-3">
    {TESTIMONIALS.map(({ quote, name, role }) => (
      <Card key={name}>
        <p className="text-sm leading-relaxed text-[var(--foreground-muted)] italic">"{quote}"</p>
        <div className="mt-4">
          <p className="text-sm font-medium text-[var(--foreground)]">{name}</p>
          <p className="text-xs text-[var(--foreground-muted)]">{role}</p>
        </div>
      </Card>
    ))}
  </div>
</Section>
```

Константа с данными (добавить в начало файла):

```tsx
const TESTIMONIALS = [
  {
    quote: "Caught an automatic renewal clause I completely missed. Saved me from a 12-month lock-in.",
    name: "Anna K.",
    role: "Freelance Designer",
  },
  {
    quote: "We run 5–10 vendor contracts a month. Clealex cuts our first-pass review time in half.",
    name: "Michael S.",
    role: "Operations Manager, SMB",
  },
  {
    quote: "The negotiation priorities section alone justifies the cost. Very actionable output.",
    name: "Laura P.",
    role: "In-house Legal Counsel",
  },
];
```

> **Внимание:** Перед публикацией заменить на реальные отзывы реальных пользователей
> (бета-тестеры, пилотные клиенты). Использовать вымышленные имена с согласия людей
> или анонимизировать до роли.

---

## 3. Hero — усилить ценностное предложение

**Файл:** `src/app/page.tsx`, строки 168–197

### Текущий badge (строка 168)

```tsx
<Badge variant="brand">AI contract clarity for fast decisions</Badge>
```

### Замена — подчеркнуть конкретную выгоду 🟡

```tsx
<Badge variant="brand">Spot hidden risks before you sign</Badge>
```

---

### Текущий subtitle (строки 172–176)

```tsx
Clealex reviews your contract in minutes and highlights hidden
risks, key obligations, and negotiation priorities in one clean
report.
```

### Вариант усиленного subtitle 🟡

```tsx
Clealex reads your contract and surfaces hidden traps, one-sided
clauses, and negotiation priorities — so you sign knowing exactly
what you're agreeing to.
```

---

### Текущие trust-badges (строки 194–197)

```tsx
<Badge>Encrypted processing</Badge>
<Badge>GDPR-ready workflows</Badge>
<Badge>No legal advice replacement</Badge>
```

### Замена — убрать disclaimer из trust-зоны 🟡

Дисклеймер "No legal advice replacement" здесь мешает — он сеет сомнение сразу после призыва к действию. Переместить его в footer или FAQ. В hero оставить только позитивные сигналы:

```tsx
<Badge>Encrypted processing</Badge>
<Badge>GDPR-ready</Badge>
<Badge>No subscription required</Badge>
```

---

## 4. Pricing — добавить сравнение ценности с альтернативами

**Файл:** `src/app/page.tsx`, строки 502–504

### Текущий subtitle

```tsx
<p className="section-subtitle">
  1 token is about 1,000 characters. Average contract (~20K chars) is
  about 20 tokens.
</p>
```

### Замена — добавить контекст "vs. юрист" 🟡

```tsx
<p className="section-subtitle">
  One analysis costs less than 5 minutes of a lawyer's time.
  Average contract (~20K characters) uses about 20 tokens.
</p>
```

---

### Pricing cards — добавить описание пакета 🟡

Текущие карточки показывают только имя, количество анализов, цену и токены.
Добавить строку с `plan.description` (поле уже есть в типе `TokenPackage`):

**Файл:** `src/app/page.tsx`, строка 537 (после блока цены)

```tsx
{plan.description && (
  <p className="mt-2 text-xs text-[var(--foreground-muted)]">{plan.description}</p>
)}
```

---

### Pricing cards — показывать savings badge 🟢

Поле `savings` уже есть в `TokenPackage`. Отображать его:

```tsx
{plan.savings && (
  <Badge variant="success" className="mt-2">Save {plan.savings}</Badge>
)}
```

---

## 5. FAQ — добавить вопросы о цене и рисках

**Файл:** `src/app/page.tsx`, строки 562–589

### Добавить 2 новых вопроса 🟡

```tsx
{
  q: "What if I'm not satisfied with the analysis?",
  a: "Each analysis gives you a full structured report. If the result is unclear or incomplete, contact support — we review edge cases individually.",
},
{
  q: "How accurate is the AI analysis?",
  a: "Clealex identifies structural risks and hidden clauses with high recall. It is not a substitute for legal advice, but it gives you a clear starting point and saves significant review time.",
},
```

---

## 6. Final CTA — убрать generic copy

**Файл:** `src/app/page.tsx`, строки 594–609

### Текущий заголовок (строка 595)

```
Ready to review your next contract in minutes?
```

### Вариант конкретнее 🟢

```
Your next contract deserves a second pair of eyes.
```

### Текущий subtitle (строки 597–600)

```
Start with one upload and get a clear action-focused report before you sign.
```

### Вариант с усилением срочности 🟢

```
Upload in 30 seconds. Results in minutes. Know what you're signing.
```

---

## 7. Кнопки Pricing — изменить текст CTA 🟢

**Файл:** `src/app/page.tsx`, строка 550

### Текущий текст

```tsx
Choose {plan.name}
```

### Вариант конкретнее

```tsx
Get started with {plan.name}
```

или для фиксированного "Most Popular":

```tsx
{plan.name === "Pro" ? "Start with Pro" : `Get ${plan.name}`}
```

---

## 8. Анализ страницы — предупреждение о нехватке токенов

**Файл:** `src/app/ai/analyse/page.tsx`

### Добавить ссылку на pricing с контекстом 🟡

Текущее сообщение при нехватке токенов ведёт на `/ai/tokens`.
Добавить в предупреждение: сколько нужно токенов, сколько стоит минимальный пакет.

Пример текста:
```
You need ~{cost} tokens for this contract. Buy a starter package for as little as [price].
```

---

## 9. Страница `/ai/tokens` — добавить продающий контекст

**Файл:** `src/app/ai/tokens/page.tsx`

### Добавить блок "Why buy more tokens?" перед пакетами 🟢

```tsx
<p className="text-sm text-[var(--foreground-muted)] mb-6">
  One token covers ~1,000 characters. An average service agreement
  (20K chars) uses 20 tokens — less than a coffee.
</p>
```

---

## 10. Footer — добавить social links

**Файл:** `src/components/public/PublicFooter.tsx`

### Добавить LinkedIn ссылку 🟢

```tsx
<a href="https://linkedin.com/company/clealex" target="_blank" rel="noopener noreferrer"
   className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] text-sm">
  LinkedIn
</a>
```

---

## 11. Регистрация — онбординг после регистрации

**Файл:** `src/app/register/page.tsx`

### Текущее поведение

После успешной регистрации: редирект на `/login`.

### Предлагаемое улучшение 🟡

Редирект на `/login?welcome=1`, и на странице дашборда показать welcome-баннер:
```
Welcome! Here are 20 free tokens to get you started. →
```

> **Требует задачи на бэкенд:** начислять 20 бонусных токенов при регистрации.
> Без этого только маркетинговая фраза — не добавлять, если токены не начисляются.

---

## Итоговая очередь задач

| # | Задача | Приоритет | Файл | Бэкенд нужен? |
|---|--------|-----------|------|--------------|
| 1 | Убрать placeholder метрики | 🔴 | `page.tsx:457–498` | Нет |
| 2 | Добавить секцию Testimonials | 🟡 | `page.tsx` | Нет |
| 3 | Усилить hero subtitle и убрать disclaimer из trust-badges | 🟡 | `page.tsx:168–197` | Нет |
| 4 | Добавить "vs. lawyer" контекст в pricing subtitle | 🟡 | `page.tsx:502–504` | Нет |
| 5 | Показывать `plan.description` и `plan.savings` в pricing cards | 🟡 | `page.tsx:536–544` | Нет |
| 6 | Добавить 2 вопроса в FAQ | 🟡 | `page.tsx:562–589` | Нет |
| 7 | Изменить badge `hero` на benefit-oriented | 🟡 | `page.tsx:168` | Нет |
| 8 | Улучшить предупреждение о нехватке токенов | 🟡 | `analyse/page.tsx` | Нет |
| 9 | Добавить контекст ценности на странице токенов | 🟢 | `ai/tokens/page.tsx` | Нет |
| 10 | Изменить final CTA copy | 🟢 | `page.tsx:594–609` | Нет |
| 11 | Изменить тексты кнопок pricing | 🟢 | `page.tsx:550` | Нет |
| 12 | Добавить LinkedIn в footer | 🟢 | `PublicFooter.tsx` | Нет |
| 13 | Welcome-баннер + бесплатные токены при регистрации | 🟡 | `register/page.tsx` + BE | Да |
