# UX/UI Дизайн: Страница анализа контракта

## 1. UX Анализ

### 1.1 Целевая аудитория

**Основные пользователи:**
- **Юристы и правовые консультанты** — нуждаются в быстром понимании рисков и ключевых пунктов
- **Бизнес-менеджеры и руководители** — требуют четкого представления финансовых и стратегических последствий
- **Финансовые аналитики** — фокусируются на финансовых обязательствах и рисках
- **Операционные менеджеры** — интересуются практическими аспектами выполнения контракта

**Характеристики пользователей:**
- Ограниченное время на изучение документа
- Высокая когнитивная нагрузка при работе с юридическими документами
- Необходимость быстрого принятия решений
- Разный уровень юридической экспертизы

### 1.2 Основные цели пользователей

1. **Быстро оценить безопасность подписания контракта**
   - Понять общий риск (score + severity)
   - Выявить критические проблемы

2. **Изучить детали по приоритетам**
   - Найти скрытые обязательства и риски
   - Понять финансовые последствия
   - Оценить операционные требования

3. **Подготовиться к переговорам**
   - Определить приоритеты переговоров
   - Выявить односторонние пункты
   - Понять условия расторжения

4. **Принять решение**
   - Сравнить перспективы (legal/financial/operational/strategic)
   - Оценить соответствие требованиям
   - Получить рекомендации

### 1.3 Ключевые действия пользователей

1. **Сканирование** — быстро просмотреть критическую информацию (score, risks)
2. **Углубленное изучение** — детально изучить конкретные разделы
3. **Сравнение** — сопоставить разные перспективы и риски
4. **Действие** — использовать информацию для переговоров или принятия решения

---

## 2. Информационная архитектура

### 2.1 Группировка контента

**Уровень 1: Критическая информация (всегда видима)**
- Score Card (signing recommendation + risk severity)
- Quick Summary (contract type, parties)

**Уровень 2: Основные разделы (accordion, по умолчанию свернуты)**
- **Risks & Issues** (группа)
  - Risks
  - Hidden Clauses
  - Hidden Obligations
  - Hidden Financial Obligations
  - One-Sided Clauses
  - Compliance Issues

- **Analysis Perspectives** (группа)
  - Legal Perspective
  - Financial Perspective
  - Operational Perspective
  - Strategic Perspective

- **Contract Details** (группа)
  - Key Points
  - Termination Conditions
  - Suggestions
  - Negotiation Priorities

### 2.2 Навигация

**Вертикальная прокрутка** с якорными ссылками для быстрого перехода:
- Score Summary (верх страницы)
- Risks & Issues
- Analysis Perspectives
- Contract Details

**Визуальная навигация:**
- Цветовое кодирование по важности (critical/high/medium/low)
- Иконки для быстрой идентификации типов контента
- Индикаторы количества элементов в каждой секции

### 2.3 Иерархия контента

```
1. Score Card (высокий приоритет, всегда видим)
   ├─ Signing Recommendation (1-10)
   └─ Risk Severity (low/medium/high/critical)

2. Quick Summary (средний приоритет, всегда видим)
   ├─ Contract Type
   └─ Parties

3. Risks & Issues (высокий приоритет, accordion)
   ├─ Risks (критично)
   ├─ Hidden Clauses (критично)
   ├─ Hidden Obligations (высокий)
   ├─ Hidden Financial Obligations (высокий)
   ├─ One-Sided Clauses (средний)
   └─ Compliance Issues (средний)

4. Analysis Perspectives (средний приоритет, accordion)
   ├─ Legal Perspective
   ├─ Financial Perspective
   ├─ Operational Perspective
   └─ Strategic Perspective

5. Contract Details (низкий приоритет, accordion)
   ├─ Key Points
   ├─ Termination Conditions
   ├─ Suggestions
   └─ Negotiation Priorities
```

---

## 3. UI Концепция

### 3.1 Визуальный стиль

**Общий подход:**
- Минималистичный современный SaaS стиль
- Четкая визуальная иерархия
- Фокус на читаемости и сканируемости
- Использование белого пространства для снижения когнитивной нагрузки

**Принципы дизайна:**
- **8pt grid system** — все отступы кратные 8px
- **Контрастность** — четкое разделение важной и второстепенной информации
- **Прогрессивное раскрытие** — accordion для детальной информации
- **Визуальные маркеры** — иконки и цветовое кодирование для быстрой ориентации

### 3.2 Цветовая система

**Базовые цвета (из globals.css):**
- `--primary: #2563eb` (синий для CTA)
- `--foreground: #0f172a` (основной текст)
- `--foreground-muted: #64748b` (второстепенный текст)
- `--surface: #ffffff` (карточки)
- `--surface-muted: #f1f5f9` (фоны)
- `--border: #e2e8f0` (границы)

**Расширенная палитра для анализа:**

**Score Colors:**
- **8-10 (Safe)**: `bg-emerald-50 text-emerald-700 border-emerald-200`
- **5-7 (Caution)**: `bg-amber-50 text-amber-700 border-amber-200`
- **1-4 (Danger)**: `bg-red-50 text-red-700 border-red-200`

**Risk Severity Colors:**
- **Critical**: `bg-red-50 text-red-700 border-red-200`
- **High**: `bg-orange-50 text-orange-700 border-orange-200`
- **Medium**: `bg-amber-50 text-amber-700 border-amber-200`
- **Low**: `bg-emerald-50 text-emerald-700 border-emerald-200`

**Section Colors (для иконок и акцентов):**
- **Risks**: `text-red-600`
- **Financial**: `text-blue-600`
- **Legal**: `text-purple-600`
- **Operational**: `text-teal-600`
- **Strategic**: `text-indigo-600`
- **Compliance**: `text-orange-600`

### 3.3 Типографика

**Заголовки:**
- **H1 (Page Title)**: `text-3xl font-bold tracking-tight` (30px)
- **H2 (Section Title)**: `text-xl font-semibold` (20px)
- **H3 (Subsection Title)**: `text-lg font-semibold` (18px)
- **H4 (Card Title)**: `text-base font-semibold` (16px)

**Текст:**
- **Body Large**: `text-base` (16px) — основной текст
- **Body**: `text-sm` (14px) — стандартный текст
- **Body Small**: `text-xs` (12px) — метаданные

**Цвета текста:**
- Основной: `text-[var(--foreground)]`
- Второстепенный: `text-[var(--foreground-muted)]`
- Акцентный: `text-[var(--primary)]`

### 3.4 Стиль компонентов

**Card:**
- Скругление: `rounded-[var(--radius-xl)]` (20px)
- Тень: `shadow-[var(--shadow-soft)]`
- Hover: легкое поднятие `hover:-translate-y-0.5`
- Padding: `p-6` (24px)

**Badge:**
- Скругление: `rounded-[var(--radius-pill)]`
- Padding: `px-3 py-1.5`
- Font: `text-sm font-semibold`

**Accordion:**
- Плавная анимация раскрытия/сворачивания
- Иконка ChevronDown для индикации состояния
- Hover эффект на заголовке

---

## 4. Структура экрана

### 4.1 Layout блоки

```
┌─────────────────────────────────────────┐
│ PageHeader                              │
│ "Analysis result"                       │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ ScoreCard (всегда видим)                │
│ ┌──────────┐  ┌──────────┐            │
│ │ Score    │  │ Risk     │            │
│ │ 7/10     │  │ Medium   │            │
│ └──────────┘  └──────────┘            │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ QuickSummary (всегда видим)             │
│ Contract Type | Parties                 │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ SectionGroup: Risks & Issues            │
│ ▼ [Icon] Risks & Issues (3)            │
│   ┌─────────────────────────────────┐  │
│   │ Accordion: Risks                │  │
│   │   • Risk item 1                 │  │
│   │   • Risk item 2                 │  │
│   └─────────────────────────────────┘  │
│   ┌─────────────────────────────────┐  │
│   │ Accordion: Hidden Clauses       │  │
│   └─────────────────────────────────┘  │
│   ...                                   │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ SectionGroup: Analysis Perspectives     │
│ ▼ [Icon] Analysis Perspectives         │
│   ┌─────────────────────────────────┐  │
│   │ Accordion: Legal Perspective     │  │
│   └─────────────────────────────────┘  │
│   ...                                   │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ SectionGroup: Contract Details          │
│ ▼ [Icon] Contract Details              │
│   ...                                   │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ Back to dashboard link                  │
└─────────────────────────────────────────┘
```

### 4.2 Ключевые элементы

**ScoreCard:**
- Два больших блока: Score и Risk Severity
- Визуальное представление с крупными цифрами
- Цветовое кодирование по уровню риска
- Иконки для быстрого понимания

**QuickSummary:**
- Компактная карточка с основной информацией
- Горизонтальное расположение Contract Type и Parties
- Badge стиль для визуального выделения

**SectionGroup:**
- Заголовок группы с иконкой и счетчиком элементов
- Accordion функциональность для раскрытия/сворачивания
- Визуальное разделение между группами

**AnalysisSection (внутри accordion):**
- Заголовок с иконкой типа анализа
- Список элементов или текстовая информация
- Цветовое кодирование по типу

### 4.3 Логика взаимодействия

**По умолчанию:**
- ScoreCard и QuickSummary всегда видны
- Все SectionGroup свернуты
- При первом открытии показывается подсказка о возможности раскрыть секции

**Интерактивность:**
- Клик на SectionGroup заголовок → раскрыть/свернуть все секции группы
- Клик на отдельный Accordion → раскрыть/свернуть конкретную секцию
- Плавные анимации при раскрытии/сворачивании
- Сохранение состояния раскрытых секций в localStorage (опционально)

**Визуальная обратная связь:**
- Hover эффекты на интерактивных элементах
- Изменение иконки ChevronDown при раскрытии
- Подсветка активной секции

---

## 5. Спецификация компонентов

### 5.1 ScoreCard

**Назначение:** Отображение критической информации о контракте (score и risk severity)

**Props:**
```typescript
interface ScoreCardProps {
  score: number; // 1-10
  riskSeverity: 'low' | 'medium' | 'high' | 'critical';
}
```

**Структура:**
- Два блока рядом (на мобильных - вертикально)
- Левый блок: Score с крупной цифрой и текстом "Signing Recommendation"
- Правый блок: Risk Severity с текстом и цветовым индикатором

**Визуальное представление:**
- Крупные цифры (score): `text-4xl font-bold`
- Подпись: `text-sm text-[var(--foreground-muted)]`
- Цветовая схема зависит от значения
- Иконки: CheckCircle для безопасных, AlertTriangle для рисков

**Состояния:**
- Default: отображается всегда
- Hover: легкое увеличение тени

### 5.2 Accordion

**Назначение:** Раскрываемая/сворачиваемая секция контента

**Props:**
```typescript
interface AccordionProps {
  title: string;
  icon?: ReactNode; // Lucide icon
  defaultOpen?: boolean;
  children: ReactNode;
  count?: number; // Количество элементов для отображения в заголовке
  variant?: 'default' | 'danger' | 'warning'; // Для цветового кодирования
}
```

**Структура:**
- Заголовок с иконкой, текстом, счетчиком и ChevronDown
- Контент (раскрывается/сворачивается)
- Плавная анимация высоты

**Интерактивность:**
- Клик на заголовок → toggle состояния
- ChevronDown поворачивается на 180° при раскрытии
- Transition: `transition-all duration-300 ease-in-out`

**Визуальное представление:**
- Заголовок: `flex items-center justify-between p-4 cursor-pointer hover:bg-[var(--surface-muted)]`
- Контент: `px-4 pb-4` с анимацией

### 5.3 SectionGroup

**Назначение:** Группировка связанных секций анализа

**Props:**
```typescript
interface SectionGroupProps {
  title: string;
  icon: ReactNode; // Lucide icon
  defaultOpen?: boolean;
  children: ReactNode;
  totalCount?: number; // Общее количество элементов во всех секциях
}
```

**Структура:**
- Заголовок группы с иконкой и счетчиком
- Accordion функциональность для всей группы
- Дочерние Accordion компоненты внутри

**Интерактивность:**
- Клик на заголовок группы → раскрыть/свернуть все дочерние секции
- Визуальная индикация раскрытого состояния

**Визуальное представление:**
- Заголовок: более крупный, с иконкой слева
- Разделитель после заголовка
- Отступ для дочерних секций

### 5.4 RiskBadge

**Назначение:** Визуальное представление уровня риска

**Props:**
```typescript
interface RiskBadgeProps {
  severity: 'low' | 'medium' | 'high' | 'critical';
  label?: string; // Опциональный текст
}
```

**Визуальное представление:**
- Цветовое кодирование по severity
- Иконка (AlertCircle для рисков)
- Текст severity с capital case

**Варианты:**
- `low`: зеленый (emerald)
- `medium`: желтый (amber)
- `high`: оранжевый (orange)
- `critical`: красный (red)

### 5.5 AnalysisSection

**Назначение:** Отображение списка или текста анализа

**Props:**
```typescript
interface AnalysisSectionProps {
  title: string;
  icon: ReactNode;
  items?: string[]; // Для списков
  text?: string; // Для текстового контента
  variant?: 'list' | 'text';
  itemIcon?: ReactNode; // Иконка для элементов списка
}
```

**Структура:**
- Заголовок с иконкой
- Список элементов с иконками или текстовый блок
- Стилизация элементов списка

**Визуальное представление:**
- Элементы списка: `flex items-start gap-3` с иконкой слева
- Текст: `whitespace-pre-wrap` для сохранения форматирования
- Отступы между элементами: `space-y-2`

### 5.6 QuickSummary

**Назначение:** Компактное отображение основной информации

**Props:**
```typescript
interface QuickSummaryProps {
  contractType?: string;
  parties?: string[];
}
```

**Структура:**
- Горизонтальное расположение (на мобильных - вертикально)
- Contract Type как Badge
- Parties как список или chips

**Визуальное представление:**
- Компактная Card с `p-4`
- Flex layout для горизонтального расположения
- Badge стиль для Contract Type

---

## 6. UX Улучшения

### 6.1 Loading States

**Во время загрузки анализа:**
- Progress bar с этапами (уже реализовано)
- Плавный переход к результату

**При загрузке данных:**
- Skeleton loaders для ScoreCard и секций
- Плавное появление контента (`animate-contract-result-in`)

### 6.2 Empty States

**Если секция пуста:**
- Не отображать секцию вообще (как сейчас)
- Или показать сообщение "No items" с иконкой

**Если весь анализ пуст:**
- Сообщение об ошибке с возможностью вернуться на dashboard

### 6.3 Error States

**Ошибка загрузки:**
- Красная карточка с сообщением об ошибке
- Кнопка "Retry" для повторной попытки
- Ссылка "Back to dashboard"

**Ошибка анализа:**
- Уже реализовано в текущем коде
- Улучшить визуальное представление ошибки

### 6.4 Accessibility

**Клавиатурная навигация:**
- Tab порядок: ScoreCard → QuickSummary → SectionGroups → Accordions
- Enter/Space для раскрытия accordion
- Escape для сворачивания всех секций

**ARIA атрибуты:**
- `aria-expanded` для accordion
- `aria-label` для иконок
- `role="region"` для секций
- `aria-live="polite"` для динамического контента

**Семантика:**
- Использование правильных HTML тегов (h1-h4, ul, li)
- Правильная структура заголовков
- Alt текст для иконок (через aria-label)

**Цветовой контраст:**
- Минимальный контраст 4.5:1 для текста
- Не полагаться только на цвет для передачи информации

**Focus States:**
- Видимые focus rings на всех интерактивных элементах
- Использование `focus-ring` класса

### 6.5 Responsive Design

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Адаптация:**
- ScoreCard: вертикальное расположение на мобильных
- QuickSummary: вертикальное расположение на мобильных
- Accordion: полная ширина на всех устройствах
- Отступы: уменьшение padding на мобильных (`p-4` вместо `p-6`)

### 6.6 Performance

**Оптимизации:**
- Lazy loading для иконок (динамический импорт)
- Виртуализация для длинных списков (если элементов > 50)
- Мемоизация компонентов с React.memo
- Debounce для интерактивных элементов (если нужно)

---

## 7. Иконки (Lucide React)

**Рекомендуемые иконки:**
- Score: `CheckCircle2` (safe), `AlertTriangle` (warning), `XCircle` (danger)
- Risk: `AlertCircle`, `ShieldAlert`
- Legal: `Scale`, `FileText`
- Financial: `DollarSign`, `TrendingUp`
- Operational: `Settings`, `Workflow`
- Strategic: `Target`, `Lightbulb`
- Compliance: `ShieldCheck`, `CheckCircle`
- Hidden: `EyeOff`, `Lock`
- Termination: `X`, `FileX`
- Negotiation: `Handshake`, `MessageSquare`
- Parties: `Users`, `Building2`
- Contract Type: `FileContract`, `FileCheck`

---

## 8. Реализация

### 8.1 Порядок создания компонентов

1. **RiskBadge** — простой компонент для начала
2. **ScoreCard** — критический компонент
3. **Accordion** — базовый интерактивный компонент
4. **AnalysisSection** — компонент для отображения данных
5. **SectionGroup** — группировка секций
6. **QuickSummary** — финальный компонент

### 8.2 Интеграция в страницу

**Структура page.tsx:**
```typescript
<PageHeader />
<ScoreCard score={score} riskSeverity={r.risk_severity} />
<QuickSummary contractType={r.contract_type} parties={r.parties} />
<SectionGroup title="Risks & Issues" icon={<AlertCircle />}>
  <Accordion title="Risks" items={r.risks} />
  <Accordion title="Hidden Clauses" items={r.hidden_clauses} />
  ...
</SectionGroup>
<SectionGroup title="Analysis Perspectives" icon={<FileText />}>
  <Accordion title="Legal Perspective" text={r.legal_perspective} />
  ...
</SectionGroup>
...
```

### 8.3 Стилизация

**Подход:**
- Использование существующих CSS переменных
- Tailwind классы для утилитарных стилей
- Минимальные кастомные стили
- Следование существующему дизайн-системе

---

## 9. Чеклист реализации

- [ ] Создать компонент RiskBadge
- [ ] Создать компонент ScoreCard
- [ ] Создать компонент Accordion
- [ ] Создать компонент AnalysisSection
- [ ] Создать компонент SectionGroup
- [ ] Создать компонент QuickSummary
- [ ] Интегрировать компоненты в page.tsx
- [ ] Добавить иконки из lucide-react
- [ ] Реализовать цветовое кодирование
- [ ] Добавить анимации и transitions
- [ ] Протестировать accessibility
- [ ] Протестировать responsive design
- [ ] Добавить loading states
- [ ] Добавить empty states
- [ ] Оптимизировать performance

---

## 10. Примеры использования

### ScoreCard
```tsx
<ScoreCard score={7} riskSeverity="medium" />
```

### Accordion
```tsx
<Accordion 
  title="Risks" 
  icon={<AlertCircle />}
  count={5}
  variant="danger"
>
  <AnalysisSection items={risks} variant="list" />
</Accordion>
```

### SectionGroup
```tsx
<SectionGroup 
  title="Risks & Issues" 
  icon={<ShieldAlert />}
  totalCount={12}
>
  <Accordion title="Risks" items={risks} />
  <Accordion title="Hidden Clauses" items={hiddenClauses} />
</SectionGroup>
```

---

**Конец документа**
