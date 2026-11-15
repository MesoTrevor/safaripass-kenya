import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DashboardNavItems, SignOutButton, Wordmark } from "@/components/safari-pass-ui";
import { useCurrentUser } from "@/components/safari-pass-ui";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data, error } = await (await import("@/integrations/supabase/client")).supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth", search: { next: location.href } });
    return { sessionUser: data.user };
  },
  component: AuthenticatedShell,
});

function AuthenticatedShell() {
  const { ready, user } = useCurrentUser();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = Route.useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => { setMobileOpen(false); }, [location]);
  if (!ready || !user) return <div className="min-h-screen bg-[#F5F6F2]" aria-label="Loading your account"><div className="h-1 animate-pulse bg-[#167A52]" /></div>;
  return <div className="min-h-screen bg-[#F5F6F2]">
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-[#E5E9E3] bg-white transition-transform lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"} ${collapsed ? "lg:w-[78px]" : ""}`}>
      <div className="flex h-[74px] items-center justify-between border-b border-[#E5E9E3] px-5"><Wordmark /> <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className="hidden lg:inline-flex">{collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}</Button><Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close menu" className="lg:hidden">×</Button></div>
      <div className="px-5 pt-7 pb-3 text-[10px] font-semibold uppercase tracking-[.12em] text-[#9AA49E]">{collapsed ? "" : "Your commute"}</div>
      <nav aria-label="Passenger account" className="grid gap-1 px-3">{DashboardNavItems.map(({ label, to, icon: Icon }) => { const active = location === to; return <a key={to} href={to} title={collapsed ? label : undefined} onClick={(e) => { e.preventDefault(); window.history.pushState(null, "", to); window.dispatchEvent(new PopStateEvent("popstate")); }} className={`flex h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-medium transition-colors ${active ? "bg-[#E8F4EC] text-[#167A52]" : "text-[#68746E] hover:bg-[#F5F6F2] hover:text-[#142B2B]"}`}><Icon size={17} /><span className={collapsed ? "lg:sr-only" : ""}>{label}</span>{active && !collapsed && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#167A52]" />}</a>; })}</nav>
      <div className="mt-auto border-t border-[#E5E9E3] px-4 py-4"><div className="mb-2 truncate text-[11px] text-[#77847E]">{collapsed ? user.email?.slice(0, 1).toUpperCase() : user.email}</div><SignOutButton /></div>
    </aside>
    {mobileOpen && <button className="fixed inset-0 z-30 bg-[#142B2B]/35 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu" />}
    <div className={`min-h-screen transition-[padding] ${collapsed ? "lg:pl-[78px]" : "lg:pl-[248px]"}`}>
      <header className="sticky top-0 z-20 flex h-[74px] items-center justify-between border-b border-[#E5E9E3] bg-[#F5F6F2]/95 px-5 backdrop-blur sm:px-8"><Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu" className="lg:hidden"><span className="text-lg">☰</span></Button><div className="hidden lg:block"><p className="text-[11px] text-[#77847E]">Good to see you back</p><p className="mt-0.5 max-w-[420px] truncate text-sm font-semibold text-[#142B2B]">{user.user_metadata?.full_name || user.email?.split("@")[0] || "Commuter"}</p></div><div className="ml-auto inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[10px] font-semibold text-[#68746E]"><span className="h-1.5 w-1.5 rounded-full bg-[#167A52]" />Nairobi time · EAT</div></header>
      <main className="mx-auto max-w-[1320px] px-4 py-7 sm:px-8 sm:py-9"><Outlet /></main>
    </div>
  </div>;
}
