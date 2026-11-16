CREATE OR REPLACE FUNCTION public.request_operator_account(_display_name text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_operator_id uuid;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Sign in is required' USING ERRCODE = '42501';
  END IF;
  IF _display_name IS NULL OR length(btrim(_display_name)) < 2 OR length(btrim(_display_name)) > 120 THEN
    RAISE EXCEPTION 'Enter an organization name between 2 and 120 characters' USING ERRCODE = '22023';
  END IF;
  IF EXISTS (SELECT 1 FROM public.operator_accounts WHERE owner_id = auth.uid() AND status IN ('pending', 'active')) THEN
    RAISE EXCEPTION 'You already have an operator application or active account' USING ERRCODE = '23505';
  END IF;
  INSERT INTO public.operator_accounts (owner_id, display_name, status)
  VALUES (auth.uid(), btrim(_display_name), 'pending')
  RETURNING id INTO new_operator_id;
  INSERT INTO public.audit_logs (actor_id, action, entity_type, entity_id, details)
  VALUES (auth.uid(), 'operator_application_submitted', 'operator_account', new_operator_id, jsonb_build_object('display_name', btrim(_display_name)));
  RETURN new_operator_id;
END;
$$;
REVOKE ALL ON FUNCTION public.request_operator_account(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.request_operator_account(text) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_review_operator(_operator_id uuid, _status text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_owner_id uuid;
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Administrator access required' USING ERRCODE = '42501';
  END IF;
  IF _status NOT IN ('active', 'suspended') THEN
    RAISE EXCEPTION 'Only active or suspended status can be assigned' USING ERRCODE = '22023';
  END IF;
  UPDATE public.operator_accounts
  SET status = _status
  WHERE id = _operator_id
  RETURNING owner_id INTO target_owner_id;
  IF target_owner_id IS NULL THEN
    RAISE EXCEPTION 'Operator account not found' USING ERRCODE = 'P0002';
  END IF;
  IF _status = 'active' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (target_owner_id, 'operator'::public.app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  INSERT INTO public.audit_logs (actor_id, action, entity_type, entity_id, details)
  VALUES (auth.uid(), 'operator_application_' || _status, 'operator_account', _operator_id, '{}'::jsonb);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_review_operator(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_review_operator(uuid, text) TO authenticated;

DROP POLICY "Operators manage their vehicles" ON public.vehicles;
CREATE POLICY "Active operators manage their vehicles" ON public.vehicles
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.operator_accounts o WHERE o.id = operator_id AND o.owner_id = auth.uid() AND o.status = 'active'))
WITH CHECK (EXISTS (SELECT 1 FROM public.operator_accounts o WHERE o.id = operator_id AND o.owner_id = auth.uid() AND o.status = 'active'));