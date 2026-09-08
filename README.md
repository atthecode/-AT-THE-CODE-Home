# AT THE CODE Home — fixed storefront preview

Mobile-first Cloudflare Pages build for the AT THE CODE Home furniture dropshipping storefront.

## What is fixed
- Removed all public owner/supplier sourcing notes.
- Replaced the browser-only waitlist with a Cloudflare Pages Function.
- Added a Cloudflare D1 schema for launch-list signups.
- Added consent, validation, a honeypot anti-bot field and clear success/error states.
- Added a launch-list privacy notice.
- Reworked the shop preview so unverified products are honestly shown as “Coming soon” rather than purchasable stock.
- Added customer-facing sourcing and delivery explanations.
- Improved mobile layout, accessibility and security headers.

## Deploy on Cloudflare Pages
- Framework preset: None
- Build command: leave blank
- Build output directory: `/` (repository root)
- Keep the `functions` folder in the repository root so Cloudflare Pages Functions deploy with the site.

## One required Cloudflare setup step for the waitlist
The website is safe to deploy without the database, but the form will show a clear “not connected yet” message until D1 is bound.

1. In Cloudflare, create a D1 database for the site (for example `at-the-code-home`).
2. Run the contents of `schema.sql` against that D1 database.
3. In the Pages project settings, add a D1 binding with the variable name exactly: `DB`.
4. Bind it to the database you created and redeploy.

After that, `/api/waitlist` stores launch-list entries in the `waitlist` table.

## Before taking payments
Do not switch product cards to checkout until each listing has confirmed:
- exact complete-set price;
- UK delivery price/coverage;
- import duty/VAT responsibility;
- delivery estimate;
- return/cancellation process;
- supplier media permission;
- final customer terms and privacy wording.

## Data-protection note
`privacy.html` is intentionally a launch-preview notice. Before sending marketing emails or taking orders, add the final business/data-controller contact details, unsubscribe route, retention period and any payment/email/analytics providers used by the live store.
