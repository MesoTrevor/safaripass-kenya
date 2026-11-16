CREATE OR REPLACE FUNCTION public.admin_review_support_ticket(_ticket_id uuid, _status text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  old_status text;
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Administrator access required' USING ERRCODE = '42501';
  END IF;
  IF _status NOT IN ('in_progress', 'resolved', 'closed') THEN
    RAISE EXCEPTION 'Invalid support status' USING ERRCODE = '22023';
  END IF;
  UPDATE public.support_tickets SET status = _status WHERE id = _ticket_id RETURNING status INTO old_status;
  IF old_status IS NULL THEN RAISE EXCEPTION 'Support request not found' USING ERRCODE = 'P0002'; END IF;
  INSERT INTO public.audit_logs (actor_id, action, entity_type, entity_id, details)
  VALUES (auth.uid(), 'support_ticket_' || _status, 'support_ticket', _ticket_id, '{}'::jsonb);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_review_support_ticket(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_review_support_ticket(uuid, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_review_vehicle(_vehicle_id uuid, _status text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  found_vehicle uuid;
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Administrator access required' USING ERRCODE = '42501';
  END IF;
  IF _status NOT IN ('active', 'suspended') THEN RAISE EXCEPTION 'Invalid vehicle status' USING ERRCODE = '22023'; END IF;
  UPDATE public.vehicles SET status = _status WHERE id = _vehicle_id RETURNING id INTO found_vehicle;
  IF found_vehicle IS NULL THEN RAISE EXCEPTION 'Vehicle not found' USING ERRCODE = 'P0002'; END IF;
  INSERT INTO public.audit_logs (actor_id, action, entity_type, entity_id, details)
  VALUES (auth.uid(), 'vehicle_' || _status, 'vehicle', _vehicle_id, '{}'::jsonb);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_review_vehicle(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_review_vehicle(uuid, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_create_route(_short_code text, _origin text, _destination text, _region text DEFAULT 'Nairobi Metropolitan')
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_route_id uuid;
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Administrator access required' USING ERRCODE = '42501';
  END IF;
  IF length(btrim(_short_code)) < 1 OR length(btrim(_short_code)) > 16 OR length(btrim(_origin)) < 2 OR length(btrim(_origin)) > 120 OR length(btrim(_destination)) < 2 OR length(btrim(_destination)) > 120 OR length(btrim(_region)) < 2 OR length(btrim(_region)) > 120 THEN
    RAISE EXCEPTION 'Route details are outside allowed lengths' USING ERRCODE = '22023';
  END IF;
  INSERT INTO public.routes (short_code, origin, destination, region, status)
  VALUES (upper(btrim(_short_code)), btrim(_origin), btrim(_destination), btrim(_region), 'draft')
  RETURNING id INTO new_route_id;
  INSERT INTO public.audit_logs (actor_id, action, entity_type, entity_id, details)
  VALUES (auth.uid(), 'route_created', 'route', new_route_id, jsonb_build_object('short_code', upper(btrim(_short_code)), 'origin', btrim(_origin), 'destination', btrim(_destination), 'status', 'draft'));
  RETURN new_route_id;
END;
$$;
REVOKE ALL ON FUNCTION public.admin_create_route(text, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_create_route(text, text, text, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_set_route_status(_route_id uuid, _status text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  found_route uuid;
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Administrator access required' USING ERRCODE = '42501';
  END IF;
  IF _status NOT IN ('draft', 'active', 'inactive') THEN RAISE EXCEPTION 'Invalid route status' USING ERRCODE = '22023'; END IF;
  UPDATE public.routes SET status = _status WHERE id = _route_id RETURNING id INTO found_route;
  IF found_route IS NULL THEN RAISE EXCEPTION 'Route not found' USING ERRCODE = 'P0002'; END IF;
  INSERT INTO public.audit_logs (actor_id, action, entity_type, entity_id, details)
  VALUES (auth.uid(), 'route_' || _status, 'route', _route_id, jsonb_build_object('status', _status));
END;
$$;
REVOKE ALL ON FUNCTION public.admin_set_route_status(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_route_status(uuid, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_create_subscription_plan(_name text, _price_kes numeric, _journey_count integer, _validity_days integer, _rollover_days integer DEFAULT 0, _route_id uuid DEFAULT NULL)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_plan_id uuid;
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Administrator access required' USING ERRCODE = '42501';
  END IF;
  IF length(btrim(_name)) < 2 OR length(btrim(_name)) > 120 OR _price_kes < 0 OR _journey_count < 1 OR _validity_days < 1 OR _rollover_days < 0 THEN
    RAISE EXCEPTION 'Plan details are outside allowed values' USING ERRCODE = '22023';
  END IF;
  INSERT INTO public.subscription_plans (name, price_kes, journey_count, validity_days, rollover_days, route_id, status)
  VALUES (btrim(_name), _price_kes, _journey_count, _validity_days, _rollover_days, _route_id, 'draft')
  RETURNING id INTO new_plan_id;
  INSERT INTO public.audit_logs (actor_id, action, entity_type, entity_id, details)
  VALUES (auth.uid(), 'subscription_plan_created', 'subscription_plan', new_plan_id, jsonb_build_object('name', btrim(_name), 'price_kes', _price_kes, 'journey_count', _journey_count, 'validity_days', _validity_days, 'rollover_days', _rollover_days, 'status', 'draft'));
  RETURN new_plan_id;
END;
$$;
REVOKE ALL ON FUNCTION public.admin_create_subscription_plan(text, numeric, integer, integer, integer, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_create_subscription_plan(text, numeric, integer, integer, integer, uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_set_plan_status(_plan_id uuid, _status text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  found_plan uuid;
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Administrator access required' USING ERRCODE = '42501';
  END IF;
  IF _status NOT IN ('draft', 'active', 'inactive') THEN RAISE EXCEPTION 'Invalid plan status' USING ERRCODE = '22023'; END IF;
  UPDATE public.subscription_plans SET status = _status WHERE id = _plan_id RETURNING id INTO found_plan;
  IF found_plan IS NULL THEN RAISE EXCEPTION 'Plan not found' USING ERRCODE = 'P0002'; END IF;
  INSERT INTO public.audit_logs (actor_id, action, entity_type, entity_id, details)
  VALUES (auth.uid(), 'subscription_plan_' || _status, 'subscription_plan', _plan_id, jsonb_build_object('status', _status));
END;
$$;
REVOKE ALL ON FUNCTION public.admin_set_plan_status(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_plan_status(uuid, text) TO authenticated;