CREATE TYPE public.app_role AS ENUM ('passenger', 'operator', 'conductor', 'admin');
CREATE TYPE public.operator_member_role AS ENUM ('driver', 'conductor');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  phone text,
  phone_verified_at timestamptz,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Passengers read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Passengers update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE TABLE public.sacco_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name text NOT NULL,
  registration_code text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sacco_accounts TO authenticated;
GRANT SELECT ON public.sacco_accounts TO anon;
GRANT ALL ON public.sacco_accounts TO service_role;
ALTER TABLE public.sacco_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active SACCOs are public" ON public.sacco_accounts FOR SELECT TO anon, authenticated USING (status = 'active');
CREATE POLICY "Admins manage SACCOs" ON public.sacco_accounts FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.operator_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL,
  sacco_id uuid REFERENCES public.sacco_accounts(id),
  display_name text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.operator_accounts TO authenticated;
GRANT ALL ON public.operator_accounts TO service_role;
ALTER TABLE public.operator_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Operators read their own account" ON public.operator_accounts FOR SELECT TO authenticated USING (owner_id = auth.uid());
CREATE POLICY "Admins manage operator accounts" ON public.operator_accounts FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.operator_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id uuid NOT NULL REFERENCES public.operator_accounts(id),
  user_id uuid NOT NULL,
  member_role public.operator_member_role NOT NULL,
  display_name text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (operator_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.operator_members TO authenticated;
GRANT ALL ON public.operator_members TO service_role;
ALTER TABLE public.operator_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Operators and members read their own crew links" ON public.operator_members FOR SELECT TO authenticated USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.operator_accounts o WHERE o.id = operator_id AND o.owner_id = auth.uid()));
CREATE POLICY "Admins manage crew links" ON public.operator_members FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id uuid NOT NULL REFERENCES public.operator_accounts(id),
  sacco_id uuid REFERENCES public.sacco_accounts(id),
  registration_number text NOT NULL UNIQUE,
  make_model text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vehicles TO authenticated;
GRANT ALL ON public.vehicles TO service_role;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Operators manage their vehicles" ON public.vehicles FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.operator_accounts o WHERE o.id = operator_id AND o.owner_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.operator_accounts o WHERE o.id = operator_id AND o.owner_id = auth.uid()));
CREATE POLICY "Admins manage vehicles" ON public.vehicles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  short_code text NOT NULL UNIQUE,
  origin text NOT NULL,
  destination text NOT NULL,
  region text NOT NULL DEFAULT 'Nairobi Metropolitan',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'inactive')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.routes TO authenticated;
GRANT SELECT ON public.routes TO anon;
GRANT ALL ON public.routes TO service_role;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active routes are public" ON public.routes FOR SELECT TO anon, authenticated USING (status = 'active');
CREATE POLICY "Admins manage routes" ON public.routes FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.route_stops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id uuid NOT NULL REFERENCES public.routes(id),
  name text NOT NULL,
  sequence_number integer NOT NULL CHECK (sequence_number > 0),
  UNIQUE (route_id, sequence_number)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.route_stops TO authenticated;
GRANT SELECT ON public.route_stops TO anon;
GRANT ALL ON public.route_stops TO service_role;
ALTER TABLE public.route_stops ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Stops on active routes are public" ON public.route_stops FOR SELECT TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.routes r WHERE r.id = route_id AND r.status = 'active'));
CREATE POLICY "Admins manage route stops" ON public.route_stops FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.fare_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive'))
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.fare_categories TO authenticated;
GRANT SELECT ON public.fare_categories TO anon;
GRANT ALL ON public.fare_categories TO service_role;
ALTER TABLE public.fare_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active fare categories are public" ON public.fare_categories FOR SELECT TO anon, authenticated USING (status = 'active');
CREATE POLICY "Admins manage fare categories" ON public.fare_categories FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  route_id uuid REFERENCES public.routes(id),
  fare_category_id uuid REFERENCES public.fare_categories(id),
  price_kes numeric(12,2) CHECK (price_kes IS NULL OR price_kes >= 0),
  journey_count integer NOT NULL CHECK (journey_count > 0),
  validity_days integer NOT NULL CHECK (validity_days > 0),
  rollover_days integer NOT NULL DEFAULT 0 CHECK (rollover_days >= 0),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'inactive')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subscription_plans TO authenticated;
GRANT SELECT ON public.subscription_plans TO anon;
GRANT ALL ON public.subscription_plans TO service_role;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active plans are public" ON public.subscription_plans FOR SELECT TO anon, authenticated USING (status = 'active');
CREATE POLICY "Admins manage subscription plans" ON public.subscription_plans FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.wallet_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  currency text NOT NULL DEFAULT 'KES' CHECK (currency = 'KES'),
  balance_kes numeric(14,2) NOT NULL DEFAULT 0 CHECK (balance_kes >= 0),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'restricted', 'closed')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.wallet_accounts TO authenticated;
GRANT ALL ON public.wallet_accounts TO service_role;
ALTER TABLE public.wallet_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Passengers read own wallet" ON public.wallet_accounts FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE TABLE public.wallet_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id uuid NOT NULL REFERENCES public.wallet_accounts(id),
  user_id uuid NOT NULL,
  transaction_type text NOT NULL CHECK (transaction_type IN ('deposit', 'withdrawal', 'subscription', 'refund', 'adjustment')),
  status text NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'reversed')),
  amount_kes numeric(14,2) NOT NULL CHECK (amount_kes > 0),
  provider_reference text UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.wallet_transactions TO authenticated;
GRANT ALL ON public.wallet_transactions TO service_role;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Passengers read own wallet history" ON public.wallet_transactions FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE TABLE public.ledger_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  wallet_transaction_id uuid REFERENCES public.wallet_transactions(id),
  entry_type text NOT NULL,
  debit_kes numeric(14,2) NOT NULL DEFAULT 0 CHECK (debit_kes >= 0),
  credit_kes numeric(14,2) NOT NULL DEFAULT 0 CHECK (credit_kes >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK ((debit_kes > 0 AND credit_kes = 0) OR (credit_kes > 0 AND debit_kes = 0))
);
GRANT SELECT ON public.ledger_entries TO authenticated;
GRANT ALL ON public.ledger_entries TO service_role;
ALTER TABLE public.ledger_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Passengers read own ledger" ON public.ledger_entries FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE TABLE public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  plan_id uuid NOT NULL REFERENCES public.subscription_plans(id),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'expired', 'cancelled')),
  starts_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Passengers read own subscriptions" ON public.subscriptions FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE TABLE public.journey_credit_batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subscription_id uuid NOT NULL REFERENCES public.subscriptions(id),
  allocated_journeys integer NOT NULL CHECK (allocated_journeys > 0),
  remaining_journeys integer NOT NULL CHECK (remaining_journeys >= 0 AND remaining_journeys <= allocated_journeys),
  expires_at timestamptz NOT NULL,
  rollover_expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.journey_credit_batches TO authenticated;
GRANT ALL ON public.journey_credit_batches TO service_role;
ALTER TABLE public.journey_credit_batches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Passengers read own journey credits" ON public.journey_credit_batches FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE TABLE public.journeys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  route_id uuid REFERENCES public.routes(id),
  vehicle_id uuid REFERENCES public.vehicles(id),
  credit_batch_id uuid REFERENCES public.journey_credit_batches(id),
  fare_kes numeric(12,2),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected', 'reversed')),
  verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.journeys TO authenticated;
GRANT ALL ON public.journeys TO service_role;
ALTER TABLE public.journeys ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Passengers read own journeys" ON public.journeys FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE TABLE public.payment_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  provider text NOT NULL,
  provider_reference text UNIQUE,
  amount_kes numeric(14,2) NOT NULL CHECK (amount_kes > 0),
  status text NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'reversed')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.payment_transactions TO authenticated;
GRANT ALL ON public.payment_transactions TO service_role;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Passengers read own payments" ON public.payment_transactions FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE TABLE public.operator_settlements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id uuid NOT NULL REFERENCES public.operator_accounts(id),
  amount_kes numeric(14,2) NOT NULL CHECK (amount_kes >= 0),
  currency text NOT NULL DEFAULT 'KES' CHECK (currency = 'KES'),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'rejected')),
  period_start date NOT NULL,
  period_end date NOT NULL,
  payout_reference text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (period_end >= period_start)
);
GRANT SELECT ON public.operator_settlements TO authenticated;
GRANT ALL ON public.operator_settlements TO service_role;
ALTER TABLE public.operator_settlements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Operators read own settlements" ON public.operator_settlements FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.operator_accounts o WHERE o.id = operator_id AND o.owner_id = auth.uid()));
CREATE POLICY "Admins manage settlements" ON public.operator_settlements FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  category text NOT NULL,
  title text NOT NULL,
  body text NOT NULL,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Passengers read own notifications" ON public.notifications FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Passengers mark own notifications read" ON public.notifications FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE TABLE public.refunds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  payment_transaction_id uuid REFERENCES public.payment_transactions(id),
  amount_kes numeric(14,2) NOT NULL CHECK (amount_kes > 0),
  reason text,
  status text NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'approved', 'rejected', 'completed')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.refunds TO authenticated;
GRANT ALL ON public.refunds TO service_role;
ALTER TABLE public.refunds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Passengers read own refunds" ON public.refunds FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins manage refunds" ON public.refunds FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.support_tickets TO authenticated;
GRANT ALL ON public.support_tickets TO service_role;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Passengers read own tickets" ON public.support_tickets FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Passengers create own tickets" ON public.support_tickets FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins manage support tickets" ON public.support_tickets FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read audit logs" ON public.audit_logs FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX profiles_phone_idx ON public.profiles(phone);
CREATE INDEX operator_accounts_owner_idx ON public.operator_accounts(owner_id);
CREATE INDEX operator_members_user_idx ON public.operator_members(user_id);
CREATE INDEX vehicles_operator_idx ON public.vehicles(operator_id);
CREATE INDEX routes_status_idx ON public.routes(status);
CREATE INDEX plans_status_route_idx ON public.subscription_plans(status, route_id);
CREATE INDEX wallet_transactions_user_created_idx ON public.wallet_transactions(user_id, created_at DESC);
CREATE INDEX ledger_entries_user_created_idx ON public.ledger_entries(user_id, created_at DESC);
CREATE INDEX subscriptions_user_status_idx ON public.subscriptions(user_id, status);
CREATE INDEX journeys_user_created_idx ON public.journeys(user_id, created_at DESC);
CREATE INDEX payment_transactions_user_created_idx ON public.payment_transactions(user_id, created_at DESC);
CREATE INDEX notifications_user_created_idx ON public.notifications(user_id, created_at DESC);
CREATE INDEX support_tickets_user_created_idx ON public.support_tickets(user_id, created_at DESC);

CREATE OR REPLACE FUNCTION public.handle_new_safari_pass_user()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (NEW.id, NULLIF(NEW.raw_user_meta_data ->> 'full_name', ''), NULLIF(NEW.raw_user_meta_data ->> 'phone', ''))
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'passenger') ON CONFLICT (user_id, role) DO NOTHING;
  INSERT INTO public.wallet_accounts (user_id) VALUES (NEW.id) ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.handle_new_safari_pass_user() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER on_auth_user_created_safari_pass
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_safari_pass_user();
