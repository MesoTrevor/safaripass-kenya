import { redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export async function requireUser(redirectTo = "/auth") {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw redirect({ to: redirectTo as "/auth" });
  return data.user;
}

export async function requireAppRole(allowed: string[], fallback = "/account") {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw redirect({ to: "/auth" });
  const { data: roles, error } = await supabase.from("user_roles").select("role").eq("user_id", userData.user.id);
  if (error) throw new Error("Your access could not be verified. Please try again.");
  const matching = (roles ?? []).map((row) => row.role).find((role) => allowed.includes(role));
  if (!matching) throw redirect({ to: fallback as "/account" });
  return { user: userData.user, roles: (roles ?? []).map((row) => row.role), role: matching };
}
