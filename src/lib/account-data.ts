import { supabase } from "@/integrations/supabase/client";

function unwrap<T>(result: { data: T | null; error: { message: string } | null }): T {
  if (result.error) throw new Error(result.error.message);
  if (result.data === null) throw new Error("Safari Pass could not load this account.");
  return result.data;
}

export async function loadPassengerOverview(userId: string) {
  const [profileResult, walletResult, passResult, journeysResult, noticesResult] = await Promise.all([
    supabase.from("profiles").select("full_name,phone,avatar_url").eq("id", userId).maybeSingle(),
    supabase.from("wallet_accounts").select("id,balance_kes,currency,status").eq("user_id", userId).maybeSingle(),
    supabase.from("journey_credit_batches").select("id,allocated_journeys,remaining_journeys,expires_at,rollover_expires_at").eq("user_id", userId).order("expires_at", { ascending: true }),
    supabase.from("journeys").select("id,status,fare_kes,verified_at,created_at,route:routes(short_code,origin,destination)").eq("user_id", userId).order("created_at", { ascending: false }).limit(5),
    supabase.from("notifications").select("id,title,body,created_at,read_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(4),
  ]);
  const profile = unwrap(profileResult);
  const wallet = unwrap(walletResult);
  const passes = unwrap(passResult);
  const journeys = unwrap(journeysResult);
  const notifications = unwrap(noticesResult);
  return { profile, wallet, passes, journeys, notifications };
}

export async function loadPassengerPasses(userId: string) {
  const [batchResult, subscriptionResult, planResult] = await Promise.all([
    supabase.from("journey_credit_batches").select("id,allocated_journeys,remaining_journeys,expires_at,rollover_expires_at,subscription_id").eq("user_id", userId).order("expires_at", { ascending: true }),
    supabase.from("subscriptions").select("id,plan_id,status,starts_at,expires_at,created_at").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase.from("subscription_plans").select("id,name,price_kes,journey_count,validity_days,rollover_days,route_id").eq("status", "active").order("journey_count"),
  ]);
  return { batches: unwrap(batchResult), subscriptions: unwrap(subscriptionResult), plans: unwrap(planResult) };
}

export async function loadPassengerWallet(userId: string) {
  const [walletResult, activityResult, paymentsResult] = await Promise.all([
    supabase.from("wallet_accounts").select("id,balance_kes,currency,status").eq("user_id", userId).maybeSingle(),
    supabase.from("wallet_transactions").select("id,transaction_type,status,amount_kes,created_at,provider_reference").eq("user_id", userId).order("created_at", { ascending: false }).limit(50),
    supabase.from("payment_transactions").select("id,provider,status,amount_kes,created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(20),
  ]);
  return { wallet: unwrap(walletResult), activity: unwrap(activityResult), payments: unwrap(paymentsResult) };
}

export async function loadPassengerJourneys(userId: string) {
  const [journeyResult, batchesResult] = await Promise.all([
    supabase.from("journeys").select("id,status,fare_kes,verified_at,created_at,route:routes(short_code,origin,destination)").eq("user_id", userId).order("created_at", { ascending: false }).limit(100),
    supabase.from("journey_credit_batches").select("id,allocated_journeys,remaining_journeys,expires_at").eq("user_id", userId).order("expires_at", { ascending: true }),
  ]);
  return { journeys: unwrap(journeyResult), batches: unwrap(batchesResult) };
}

export async function loadPassengerProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("id,full_name,phone,phone_verified_at,avatar_url,created_at,updated_at").eq("id", userId).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function savePassengerProfile(userId: string, values: { full_name: string; phone: string }) {
  const { data, error } = await supabase.from("profiles").update({ full_name: values.full_name.trim(), phone: values.phone.trim() || null }).eq("id", userId).select("id,full_name,phone,phone_verified_at,avatar_url,created_at,updated_at").single();
  if (error) throw new Error(error.message);
  return data;
}

export async function loadSupportTickets(userId: string) {
  const { data, error } = await supabase.from("support_tickets").select("id,subject,message,status,created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(50);
  if (error) throw new Error(error.message);
  return data;
}

export async function createSupportTicket(userId: string, subject: string, message: string) {
  const { data, error } = await supabase.from("support_tickets").insert({ user_id: userId, subject: subject.trim(), message: message.trim() }).select("id,subject,message,status,created_at").single();
  if (error) throw new Error(error.message);
  return data;
}

export async function loadOperatorWorkspace(userId: string) {
  const { data: operator, error } = await supabase.from("operator_accounts").select("id,display_name,status,sacco_id,created_at").eq("owner_id", userId).maybeSingle();
  if (error) throw new Error(error.message);
  if (!operator || operator.status !== "active") return { operator, vehicles: [], settlements: [] };
  const [vehicles, settlements] = await Promise.all([
    supabase.from("vehicles").select("id,registration_number,make_model,status,created_at").eq("operator_id", operator.id).order("created_at", { ascending: false }),
    supabase.from("operator_settlements").select("id,amount_kes,status,period_start,period_end,currency,created_at").eq("operator_id", operator.id).order("created_at", { ascending: false }).limit(20),
  ]);
  return { operator, vehicles: unwrap(vehicles), settlements: unwrap(settlements) };
}

export async function requestOperatorAccount(displayName: string) {
  const { data, error } = await supabase.rpc("request_operator_account", { _display_name: displayName.trim() });
  if (error) throw new Error(error.message);
  return data;
}

export async function addOperatorVehicle(operatorId: string, registrationNumber: string, makeModel: string) {
  const { data, error } = await supabase.from("vehicles").insert({ operator_id: operatorId, registration_number: registrationNumber.trim().toUpperCase(), make_model: makeModel.trim() || null }).select("id,registration_number,make_model,status,created_at").single();
  if (error) throw new Error(error.message);
  return data;
}

export async function loadConductorWorkspace(userId: string) {
  const { data, error } = await supabase.from("operator_members").select("id,operator_id,member_role,display_name,status,created_at").eq("user_id", userId).order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function loadAdminWorkspace() {
  const [operators, routes, plans, tickets, settlements, journeys, payments] = await Promise.all([
    supabase.from("operator_accounts").select("id,owner_id,display_name,status,sacco_id,created_at").eq("status", "pending").order("created_at", { ascending: true }).limit(50),
    supabase.from("routes").select("id,short_code,origin,destination,region,status,created_at").order("created_at", { ascending: false }).limit(100),
    supabase.from("subscription_plans").select("id,name,price_kes,journey_count,validity_days,status,created_at").order("created_at", { ascending: false }).limit(100),
    supabase.from("support_tickets").select("id,user_id,subject,message,status,created_at").in("status", ["open", "in_progress"]).order("created_at", { ascending: true }).limit(50),
    supabase.from("operator_settlements").select("id,operator_id,amount_kes,currency,status,period_start,period_end,created_at").eq("status", "pending").order("created_at", { ascending: true }).limit(50),
    supabase.from("journeys").select("id,status,fare_kes,created_at,verified_at").order("created_at", { ascending: false }).limit(100),
    supabase.from("payment_transactions").select("id,provider,status,amount_kes,created_at").order("created_at", { ascending: false }).limit(100),
  ]);
  return { operators: unwrap(operators), routes: unwrap(routes), plans: unwrap(plans), tickets: unwrap(tickets), settlements: unwrap(settlements), journeys: unwrap(journeys), payments: unwrap(payments) };
}

export async function reviewOperator(operatorId: string, status: "active" | "suspended") {
  const { error } = await supabase.rpc("admin_review_operator", { _operator_id: operatorId, _status: status });
  if (error) throw new Error(error.message);
}

export async function assignRole(userId: string, role: "passenger" | "operator" | "conductor") {
  const { error } = await supabase.rpc("admin_assign_role", { _target_user_id: userId, _role: role });
  if (error) throw new Error(error.message);
}

export async function loadOperatorVehicles() {
  const { data, error } = await supabase.from("vehicles").select("id,operator_id,registration_number,make_model,status,created_at").order("created_at", { ascending: false }).limit(100);
  if (error) throw new Error(error.message);
  return data;
}

export async function loadAdminAuditLog() {
  const { data, error } = await supabase.from("audit_logs").select("id,actor_id,action,entity_type,entity_id,details,created_at").order("created_at", { ascending: false }).limit(100);
  if (error) throw new Error(error.message);
  return data;
}

export async function setVehicleStatus(vehicleId: string, status: "active" | "suspended") {
  const { error } = await supabase.rpc("admin_review_vehicle", { _vehicle_id: vehicleId, _status: status });
  if (error) throw new Error(error.message);
}

export async function setSupportStatus(ticketId: string, status: "in_progress" | "resolved" | "closed") {
  const { error } = await supabase.rpc("admin_review_support_ticket", { _ticket_id: ticketId, _status: status });
  if (error) throw new Error(error.message);
}

export async function createAdminRoute(values: { short_code: string; origin: string; destination: string; region: string }) {
  const { data, error } = await supabase.rpc("admin_create_route", {
    _short_code: values.short_code.trim(), _origin: values.origin.trim(), _destination: values.destination.trim(), _region: values.region.trim() || "Nairobi Metropolitan",
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function setRouteStatus(routeId: string, status: "draft" | "active" | "inactive") {
  const { error } = await supabase.rpc("admin_set_route_status", { _route_id: routeId, _status: status });
  if (error) throw new Error(error.message);
}

export async function createAdminPlan(values: { name: string; price_kes: number; journey_count: number; validity_days: number; rollover_days: number; route_id?: string }) {
  const args = {
    _name: values.name.trim(),
    _price_kes: values.price_kes,
    _journey_count: values.journey_count,
    _validity_days: values.validity_days,
    _rollover_days: values.rollover_days,
  };
  const { data, error } = values.route_id
    ? await supabase.rpc("admin_create_subscription_plan", { ...args, _route_id: values.route_id })
    : await supabase.rpc("admin_create_subscription_plan", args);
  if (error) throw new Error(error.message);
  return data;
}

export async function setPlanStatus(planId: string, status: "draft" | "active" | "inactive") {
  const { error } = await supabase.rpc("admin_set_plan_status", { _plan_id: planId, _status: status });
  if (error) throw new Error(error.message);
}

export async function loadAdminUsers() {
  const { data, error } = await supabase.from("user_roles").select("user_id,role,created_at").order("created_at", { ascending: false }).limit(200);
  if (error) throw new Error(error.message);
  return data;
}

export function accountDataQueryError(error: unknown): string {
  return error instanceof Error ? error.message : "Safari Pass could not load this account.";
}