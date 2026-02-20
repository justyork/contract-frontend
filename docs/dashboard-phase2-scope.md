# Dashboard Redesign Phase 2 Scope

## Goal

Apply the new clean-premium UI foundation to authenticated `/ai/*` pages with
minimum disruption to existing business logic.

## Pages In Scope

- `/ai/layout`
- `/ai/dashboard`
- `/ai/contract/[id]`
- `/ai/analyse`
- `/ai/tokens`
- `/ai/profile`

## UX Priorities

1. Introduce a consistent authenticated shell (header + left navigation).
2. Improve dashboard scanning with filters, empty state guidance, and reusable
   contract cards.
3. Increase readability of analysis details with section grouping and severity
   badges.
4. Standardize action controls, loading states, and feedback patterns.

## Component Scope

- `components/ai/AiShell.tsx`
- `components/ai/AiSidebarNav.tsx`
- `components/ai/AiTopbar.tsx`
- `components/ai/ContractSummaryCard.tsx`
- `components/ai/EmptyState.tsx`
- `components/ai/PageHeader.tsx`

## Constraints

- Keep all existing API contracts unchanged.
- Preserve existing route URLs and deep links.
- No changes to payment/analysis backend behavior in this phase.
