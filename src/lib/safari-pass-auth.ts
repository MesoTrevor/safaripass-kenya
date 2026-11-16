import { redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export async function requireUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw redirect({ to: "/auth" });
  return { sessionUser: data.user };
}

export async function requireAppRole(allowed: string[]) {
  const { sessionUser } = await requireUser();
  const { data: roles, error } = await supabase.from("user_roles").select("role").eq("user_id", sessionUser.id);
  if (error) throw new Error("Your access could not be verified. Please try again.");
  const matching = (roles ?? []).map((row) => row.role).find((role) => allowed.includes(role));
  if (!matching) throw redirect({ to: "/account" });
  return { sessionUser, roles: (roles ?? []).map((row) => row.role), role: matching };
}
