# Analytics (Google Tag Manager)

When `NEXT_PUBLIC_GTM_ID` is set, the app loads Google Tag Manager and pushes events to `window.dataLayer`. Configure tags in GTM (e.g. GA4 event tag) using these event names as triggers.

## Event names (dataLayer)


| Event                     | When                                                | Typical use                  |
| ------------------------- | --------------------------------------------------- | ---------------------------- |
| `event_user_registred`    | User completed registration                         | Sign-up conversion           |
| `event_user_logged_in`    | User logged in (email or OAuth)                     | Login conversion             |
| `event_payment_received`  | Payment confirmed on success page                   | Revenue / payment conversion |
| `event_tokens_purchased`  | Same moment; includes `tokens` (number)             | Funnel, LTV                  |
| `event_analyze_started`   | User submitted contract for analysis                | Engagement                   |
| `event_analyze_completed` | Analysis finished; includes `contract_id`, `tokens` | Core action conversion       |
| `event_analyze_failed`    | Analysis request failed; includes `reason` (string) | Error tracking               |


## Engagement events (from `data-analytics-event`)

Clicks on elements with `data-analytics-event="<name>"` push that name to the dataLayer with `event_category: "engagement"`. Existing attributes:

- `hero_cta_click`, `hero_demo_click`, `demo_tab_switch`
- `pricing_cta_click`, `final_cta_click`
- `header_dashboard_click`, `header_get_started_click`

In GTM: create a Custom Event trigger with Event name matching one of these (or use a regex), then send to GA4 as a custom event.

## GTM setup

1. Create a GTM container and note the ID (e.g. `GTM-XXXXXX`).
2. Set `NEXT_PUBLIC_GTM_ID=GTM-XXXXXX` in your environment and redeploy.
3. GTM loads only when the user has accepted analytics cookies ("Accept all" in the cookie banner). If the user has not chosen yet or chose "Necessary only", the GTM script is not injected.

## Setting up GA4 in GTM

Do the following in the GTM and GA4 web interfaces.

1. **Create a GA4 property** at [analytics.google.com](https://analytics.google.com) and note the **Measurement ID** (format `G-XXXXXXXXXX`).
2. **GA4 Configuration tag** (base pageview and GA4 connection):
  - In GTM: **Tags** → **New** → Tag type **Google Analytics: GA4 Configuration**.
  - Enter your Measurement ID.
  - Trigger: **All Pages**.
  - Save and publish.
3. **GA4 Event tags** for dataLayer events: create one tag per event (or group with a single tag and multiple triggers if your setup allows). For each event:
  - **Tags** → **New** → Tag type **Google Analytics: GA4 Event**.
  - Configuration Tag: select the GA4 Configuration tag from step 2.
  - Event Name: exact dataLayer event name (see table below).
  - Trigger: **Custom Event**, Event name = same as above.
  - For events with parameters, add **Event Parameters** in the tag and use GTM **Data Layer Variable** (e.g. Variable name `tokens` for the `tokens` key in dataLayer).

  | dataLayer event name      | GA4 Event name (same)     | Parameters to map (Data Layer Variable) |
  | ------------------------- | ------------------------- | --------------------------------------- |
  | `event_user_registred`    | `event_user_registred`    | —                                       |
  | `event_user_logged_in`    | `event_user_logged_in`    | —                                       |
  | `event_payment_received`  | `event_payment_received`  | —                                       |
  | `event_tokens_purchased`  | `event_tokens_purchased`  | `tokens`                                |
  | `event_analyze_started`   | `event_analyze_started`   | —                                       |
  | `event_analyze_completed` | `event_analyze_completed` | `contract_id`, `tokens`                 |
  | `event_analyze_failed`    | `event_analyze_failed`    | `reason` (optional)                     |

4. **Engagement events** (`hero_cta_click`, `pricing_cta_click`, etc.): create a **Custom Event** trigger for each name (or one trigger with a regex matching all engagement event names), then a GA4 Event tag that fires on that trigger; send the event name as the GA4 event name so they appear in GA4 as custom events.
5. **Consent Mode (optional):** To use Google Consent Mode v2 later, add Consent Initialization in GTM and tie GA4 tags to consent state; this complements the app's behaviour of loading GTM only when the user has accepted analytics cookies.

