# SafariPass Kenya

PROMPT 1 — LOVABLE

Build a Premium Kenyan Matatu Subscription, Digital Wallet & Smart Mobility Platform

Act as a world-class product designer, senior full-stack developer, fintech engineer and transport technology architect.

I want you to design and build a complete, modern, production-oriented web platform for a Kenyan transport technology startup.

The platform will transform how people pay for, access and use matatu transport in Kenya.

This is not an ordinary transport website. It is a subscription-based mobility ecosystem connecting passengers, matatu owners, SACCOs, conductors and administrators.

Build a professional, beautiful, responsive and user-friendly platform with excellent UI/UX, strong security, scalable architecture and SEO optimisation.

Do not just create a landing page. Build the actual application, its dashboards, functional navigation, database structure, user flows and working business logic.

1. BUSINESS CONCEPT

The platform allows passengers to:

* Create an account.
* Deposit money into a digital wallet.
* Pay using M-Pesa.
* Pay using debit cards and credit cards.
* Connect supported bank payment methods.
* Purchase transport subscriptions.
* Receive a digital travel pass.
* Use participating matatus belonging to different SACCOs.
* Have journeys automatically deducted from their subscription.
* Check their remaining journeys.
* View payment and travel history.
* Renew subscriptions.
* Receive notifications and receipts.

The platform should operate across participating matatus, regardless of which SACCO owns them, provided the vehicle, route and journey are authorised.

The initial launch market is Kenya, with an initial pilot focused on the Nairobi–Thika–Juja transport corridor.

Use Kenyan Shillings (KES) as the default currency.

2. BRAND AND DESIGN DIRECTION

Create a premium, modern fintech and mobility brand.

The website should feel like a combination of:

* A sophisticated digital bank.
* A modern transportation platform.
* A premium subscription service.
* A professional SaaS dashboard.

Design principles:

* Minimalist and elegant.
* Modern typography.
* Excellent spacing and visual hierarchy.
* Clean cards and dashboards.
* Smooth micro-interactions.
* Beautiful charts and analytics.
* Professional icons.
* Responsive layouts.
* Accessibility and readability.

Suggested colours:

* Deep navy: #101D35
* Primary green: #16A36A
* White: #FFFFFF
* Light background: #F5F7FA
* Dark text: #172033
* Muted grey: #718096

Use green for successful payments, active subscriptions and positive indicators.

Avoid an outdated template appearance, excessive gradients, unnecessary animations and cluttered interfaces.

Create a professional logo and temporary brand identity that can be replaced later.

3. WEBSITE STRUCTURE

Build the following pages:

PUBLIC WEBSITE:

1. Home
2. How It Works
3. Routes
4. Subscription Plans
5. Digital Wallet
6. For SACCOs and Operators
7. About Us
8. Contact
9. Frequently Asked Questions
10. Sign In
11. Create Account
12. Terms and Conditions
13. Privacy Policy
14. Refund and Cancellation Policy

AUTHENTICATED PASSENGER APPLICATION:

1. Passenger Dashboard
2. My Wallet
3. Buy Subscription
4. My Travel Pass
5. Available Routes
6. Journey History
7. Payment History
8. Notifications
9. Profile and Settings
10. Help and Support

OPERATOR APPLICATION:

1. Operator Dashboard
2. Vehicle Management
3. Driver and Conductor Management
4. Journey Records
5. Earnings and Settlements
6. Route Management
7. Reports
8. Account Settings

CONDUCTOR APPLICATION:

1. Conductor Login
2. Vehicle Selection
3. QR Scanner
4. Passenger Verification
5. Journey Confirmation
6. Offline Transaction Queue
7. Daily Journey Summary

ADMINISTRATION:

1. Admin Dashboard
2. Passenger Management
3. SACCO Management
4. Operator Management
5. Vehicle Approval
6. Route and Fare Management
7. Subscription Management
8. Wallet and Transaction Management
9. Payment Reconciliation
10. Operator Settlements
11. Refund Management
12. Fraud Monitoring
13. Analytics and Reports
14. System Settings
15. Audit Logs

4. DIGITAL WALLET

This is one of the most important features.

Every passenger should have an individual digital wallet.

The wallet should display:

* Available balance.
* Pending transactions.
* Completed deposits.
* Withdrawals, where supported.
* Subscription purchases.
* Refunds.
* Transaction history.
* Transaction reference numbers.

Allow passengers to deposit money through:

A. M-PESA

* STK Push.
* Passenger enters their Safaricom number.
* Payment request is sent to their phone.
* Passenger enters their M-Pesa PIN in the official M-Pesa interface.
* System receives payment confirmation through a verified callback.
* Wallet is credited only after verified payment success.

B. BANK AND CARD PAYMENTS

* Visa.
* Mastercard.
* Supported bank payment methods.
* Approved payment gateway integration.

Never store card numbers, CVVs or M-Pesa PINs.

Allow users to select a payment method and view payment status.

Important:

* Use a proper payment provider.
* Support sandbox and production environments.
* Do not simulate successful payments.
* Never credit wallets based on frontend confirmation alone.
* Implement secure, idempotent payment callbacks.
* Maintain a transaction ledger.
* Handle failed, pending, reversed and duplicate payments.

Build the wallet architecture so additional payment providers can be integrated later.

The wallet balance and subscription journey credits must be separate accounts.

A passenger can have money in their wallet without having an active subscription.

5. SUBSCRIPTION SYSTEM

Build a flexible subscription engine.

Passengers can purchase:

* Daily packages.
* Weekly packages.
* Monthly packages.

Every package should have configurable:

* Price.
* Number of journeys.
* Validity period.
* Eligible routes.
* Fare category.
* Rollover conditions.
* Expiry date.
* Renewal conditions.

INITIAL EXAMPLE:

Route: Nairobi to Thika.

Standard fare: KSh 100 per journey.

Monthly subscription:

* 35 journeys.
* 30-day validity.
* 5-day rollover grace period.

The subscription price must be configurable by administrators.

Do not automatically set it to KSh 3,500 simply because 35 journeys multiplied by KSh 100 equals KSh 3,500.

6. JOURNEY ROLLOVER LOGIC

Implement the following rules accurately.

Example:

A passenger purchases a monthly package of 35 journeys.

They use 27 journeys.

They have 8 unused journeys.

When the subscription reaches its expiry date:

* The 8 unused journeys become rollover credits.
* They remain usable for 5 additional calendar days.
* The passenger can use them on eligible participating routes.
* After the grace period, unused rollover credits expire.
* If the passenger renews, apply the configured renewal policy.
* Never duplicate credits during renewal.
* Keep a record of original allocation, usage, rollover and expiry.

Use separate credit batches with expiry dates so the system can track old and new journeys accurately.

Example renewal policy:

* Old rollover credits remain usable during the five-day grace period.
* New subscription credits begin their own validity period.
* Old credits are consumed before new credits.
* The user can see which credits are expiring.

Provide automated reminders:

* 7 days before expiry.
* 3 days before expiry.
* On expiry.
* During the five-day grace period.
* When credits are nearly exhausted.

7. ROUTES AND FARES

Build an administrator-controlled route system.

Example route:
Nairobi CBD ↔ Thika.

Fare:
KSh 100.

Administrators should be able to create routes with:

* Starting point.
* Destination.
* Intermediate stops.
* Fare.
* Fare category.
* Participating SACCOs.
* Approved vehicles.
* Operating status.

Support different fare bands for different routes.

Allow future expansion into:

* Juja.
* Ruiru.
* Thika.
* Nairobi.
* Kiambu.
* Nakuru.
* Other Kenyan counties.

The system must never allow a passenger to use a subscription on an unauthorised route.

8. DIGITAL TRAVEL PASS

Every passenger should receive a unique digital travel pass.

The pass should display:

* Passenger name.
* Unique passenger ID.
* Active subscription.
* Remaining journeys.
* Expiry date.
* QR code.

The conductor scans the QR code.

The backend verifies:

1. Passenger identity.
2. Subscription status.
3. Available credits.
4. Route eligibility.
5. Vehicle approval.
6. Vehicle’s SACCO participation.
7. Duplicate journey attempts.

If valid:

* Confirm boarding.
* Deduct one applicable journey credit.
* Record the vehicle.
* Record the conductor.
* Record date and time.
* Record the route.
* Provide confirmation to the passenger.

Use secure, short-lived QR tokens rather than relying on static QR images.

Support alternative SMS or membership-card verification for passengers without smartphones.

9. CONDUCTOR APP

Create a mobile-first conductor interface.

It must be simple enough for someone to operate quickly.

Main screen:

* Vehicle information.
* SACCO information.
* Current route.
* Scan passenger.
* Recent verified journeys.
* Daily journey total.

After scanning:

* Show green success screen for valid passengers.
* Show clear error messages for invalid passengers.
* Prevent duplicate scans.
* Provide an alternative verification procedure.

Support unreliable internet connections using a secure offline queue and reconciliation mechanism. Do not permit unlimited unverified offline boarding.

10. OPERATOR AND SACCO DASHBOARD

Every approved SACCO should have its own dashboard.

Show:

* Number of registered vehicles.
* Active vehicles.
* Participating drivers.
* Conductors.
* Journeys completed.
* Revenue earned.
* Pending settlements.
* Completed settlements.
* Daily and monthly analytics.

Operators must only see information belonging to their organisation.

Allow vehicle registration and administrative approval.

Allow operators to download settlement reports.

11. OPERATOR SETTLEMENT SYSTEM

Create a proper settlement engine.

Example:

A participating vehicle completes 100 verified passenger journeys.

Agreed operator settlement:
KSh 85 per journey.

Total operator payment:
KSh 8,500.

The system should:

* Calculate earnings automatically.
* Group journeys by SACCO.
* Generate settlement statements.
* Identify disputed transactions.
* Support settlement approval.
* Record payout references.
* Maintain a full financial audit trail.

Support daily, weekly and monthly settlement schedules configured by the administrator.

Never allow operators to edit completed financial transactions.

12. ADMIN DASHBOARD

Build a premium administration dashboard.

At a glance, show:

* Total registered passengers.
* Active subscribers.
* Total subscriptions sold.
* Total journeys completed.
* Total wallet deposits.
* Total subscription revenue.
* Total operator settlements.
* Pending payments.
* Active SACCOs.
* Active vehicles.

Add charts for:

* Revenue over time.
* Subscription growth.
* Journey volumes.
* Route popularity.
* Payment methods.
* Operator performance.
* Subscription renewal rates.

Include filters for dates, routes, SACCOs and vehicles.

Allow administrators to:

* Set subscription prices.
* Change standard fares.
* Create and deactivate packages.
* Approve operators and vehicles.
* Manage passenger accounts.
* View financial transactions.
* Process permitted refunds.
* Investigate fraud.
* Export reports.

Use role-based access control.

13. NOTIFICATIONS

Create an in-app notification centre.

Support:

* Subscription purchase confirmation.
* Wallet deposit confirmation.
* Successful journey verification.
* Low journey balance.
* Subscription expiry reminders.
* Rollover expiry reminders.
* Payment failures.
* Refund notifications.

Prepare integration architecture for SMS, email and WhatsApp Business notifications.

14. SECURITY AND FINANCIAL INTEGRITY

Treat this as a financial application.

Implement:

* Secure authentication.
* Email and phone verification.
* Password reset.
* Role-based permissions.
* Secure session management.
* Server-side validation.
* Rate limiting.
* Audit logs.
* Database access policies.
* Protection against duplicate payments.
* Protection against duplicate journey deductions.
* Secure payment callbacks.
* Transaction reconciliation.
* Data encryption.
* Fraud detection.

Use an immutable double-entry or equivalent auditable ledger for wallet and settlement transactions.

Do not expose sensitive financial information in frontend code.

Never allow a browser to directly modify wallet balances or journey credits.

Ensure every financial operation is processed and verified on the backend.

15. DATABASE ARCHITECTURE

Design a proper relational database.

Include tables for:

* users
* passenger_profiles
* operator_accounts
* sacco_accounts
* vehicles
* drivers
* conductors
* routes
* route_stops
* fare_categories
* subscription_plans
* subscriptions
* journey_credit_batches
* journeys
* wallet_accounts
* wallet_transactions
* ledger_entries
* payment_transactions
* payment_providers
* operator_settlements
* settlement_items
* notifications
* refunds
* support_tickets
* audit_logs

Use proper foreign keys, constraints, indexes and database-level security.

16. TECHNOLOGY STACK

Use:

Frontend:

* React.
* TypeScript.
* Tailwind CSS.
* Modern component architecture.

Backend:

* Supabase/PostgreSQL initially.
* Secure server-side functions.
* Python FastAPI or a well-structured server-side TypeScript backend for advanced services.

Integrations:

* Safaricom Daraja API for M-Pesa.
* Approved card payment gateway.
* Supported bank payment provider.
* Google Maps or Mapbox where appropriate.
* Email and SMS services.

The architecture must support future mobile applications.

17. SEO AND PUBLIC WEBSITE

Make the public website search-engine friendly.

Target search terms such as:

* Matatu subscription Kenya.
* Monthly matatu payment.
* Digital transport wallet Kenya.
* M-Pesa matatu payments.
* Nairobi matatu transport.
* Commuter subscription Kenya.

Implement:

* Semantic HTML.
* SEO page titles.
* Meta descriptions.
* Open Graph tags.
* Canonical URLs.
* XML sitemap.
* Robots.txt.
* Structured data where appropriate.
* Fast loading pages.
* Optimised images.
* Accessible navigation.
* Mobile-first design.

Build a blog and resources section for future transport news, route information and commuting guides.

18. PERFORMANCE AND USER EXPERIENCE

The website must:

* Work beautifully on mobile phones.
* Work on tablets and desktops.
* Load quickly on Kenyan mobile networks.
* Have clear loading states.
* Have friendly error messages.
* Have empty states for new accounts.
* Have confirmation screens.
* Be accessible.
* Be easy for non-technical users.

Avoid confusing menus and unnecessary steps.

19. DEMONSTRATION DATA

Include clearly labelled demonstration data for:

* Nairobi–Thika route.
* KSh 100 standard fare.
* 35-journey monthly package.
* Five-day rollover period.
* Sample SACCOs.
* Sample vehicles.
* Sample passenger accounts.
* Sample transactions.

Do not present demonstration data as real live transactions.

20. IMPORTANT IMPLEMENTATION INSTRUCTIONS

Build the application in a structured manner.

First create the public website and passenger dashboard.

Then implement:

1. Authentication.
2. Wallet architecture.
3. Subscription and journey-credit logic.
4. QR verification.
5. Conductor application.
6. Operator dashboard.
7. Admin dashboard.
8. Payment integrations.
9. Notifications.
10. Security and testing.

Do not leave buttons non-functional.

Do not create fake payment success messages.

Do not pretend M-Pesa or card integrations are live without actual credentials and verified callbacks.

Use sandbox credentials where available and provide clear configuration instructions for production credentials.

Where an external service is not yet configured, display a clear setup status rather than pretending it works.

Write clean, reusable, maintainable code.

Provide a README documenting the architecture, environment variables, database setup, API endpoints and deployment instructions.

The finished product should look like a serious Kenyan fintech and mobility startup capable of expanding nationally.

Build something exceptional.

Build it

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1c6334de-2930-4c25-8510-4dd3b73e1624).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
