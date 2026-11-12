# Safari Pass — first product milestone

## What to build

Create the first usable slice of Safari Pass: a Kenyan commuter mobility website with a clear public-facing home and an interactive, explicitly labelled passenger dashboard preview.

- Replace the template at `/` with a polished Safari Pass home for the Nairobi–Thika–Juja pilot, including clear navigation to routes, plans, wallet information, operator information, and the passenger preview.
- Build a named passenger preview page with representative route, subscription, travel-pass, and history data. Mark every example as demonstration data; never represent a payment, deposit, or journey as real or successful.
- Make the main preview interactions useful without implying live financial processing: navigate between dashboard sections, inspect sample details, and show a clear not-yet-connected state for payment actions.
- Add meaningful page-specific SEO metadata and keep the layout usable on mobile and desktop.

## Visual direction

Use Safari Pass’s requested Kenyan mobility/fintech identity: deep navy, green for positive states, white, and a cool light background; use restrained, high-contrast typography and a locally relevant visual asset. Preserve the project’s semantic-token design system.

## Technical details

- Keep the first milestone frontend-only; do not enable Cloud, write a database schema, or introduce authentication/payment code yet.
- Keep public home and passenger preview on separate, shareable top-level routes, with navigation links that resolve to real pages.
- Keep demo data visibly distinct from live account, wallet, and payment data.
- Update the project guidance and README to describe the first-milestone boundary and unsupported live services.
- Run the existing route test and verify the preview pages render without build/runtime errors.
