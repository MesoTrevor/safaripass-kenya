# Safari Pass — continue toward the full platform

## Build sequence
1. Replace the blank home with a complete, mobile-friendly Safari Pass public experience and interactive sample passenger dashboard. Use the existing Nairobi matatu image, the user-selected brand palette, real working navigation, and page-specific metadata. Clearly distinguish all sample figures and journeys from real account activity.
2. Add the account entry points and protected passenger experience using the already-enabled account methods and the confirmed passenger/operator profile requirement. Make the signed-in state visible and support sign-out. Add operator/conductor and administration areas as separate, role-gated workspaces rather than implying sample accounts are live.
3. Create the minimum secure data foundation for profiles, separately stored roles, routes, subscription plans, wallets, ledger records, subscriptions, journeys, notifications, and operator/vehicle records. Keep all user data owner- or organization-scoped; grant only the database access required by its policies. Keep financial writes server-validated and ledger/audit records protected.
4. Implement and test only workflows that can be made trustworthy with configured services. Keep wallet deposits, M-Pesa/cards, settlements and real journey deductions explicitly unavailable until a provider and verified callbacks are configured; never show simulated financial success.
5. Update the roadmap and README to state what is complete, what needs external setup, and what is not yet production-ready. Run existing tests and verify the main public and account flows.

## Technical details
- Keep TanStack Start routes, semantic Tailwind tokens, generated Supabase clients, and Lovable Cloud. Use authenticated server functions for private reads/writes and RLS as a second boundary.
- Do not use client-editable metadata for roles. Only trusted backend/admin operations may assign elevated roles.
- No live payment provider credentials or callback configuration are currently available; do not claim payment, settlement, or production readiness.
