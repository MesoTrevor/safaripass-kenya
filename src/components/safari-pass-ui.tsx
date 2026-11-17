import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BusFront,
  Check,
  CircleHelp,
  CreditCard,
  Fingerprint,
  HeartHandshake,
  LogOut,
  Menu,
  Navigation,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" aria-label="Safari Pass home" className={`inline-flex items-center gap-2.5 font-semibold ${light ? "text-white" : "text-[#142B2B]"}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#DAF16B] text-[#142B2B]"><BusFront size={19} strokeWidth={2.3} /></span>
      <span className="text-[18px] leading-none">safari<span className={light ? "text-[#DAF16B]" : "text-[#167A52]"}>pass</span></span>
    </Link>
  );
}

export function SiteHeader({ active = "", sessionEmail }: { active?: string; sessionEmail?: string | null | undefined }) {
  const [open, setOpen] = useState(false);
  const publicLinks = [["Routes", "/routes"], ["Plans", "/plans"], ["Wallet", "/wallet"], ["Operators", "/operators"]] as const;
  return (
    <header className="relative z-30 bg-[#F5F6F2]">
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Wordmark />
        <nav aria-label="Main navigation" className="hidden items-center gap-9 md:flex">
          {publicLinks.map(([label, to]) => <Link key={label} to={to} className={`text-[13px] font-medium hover:text-[#167A52] ${active === label ? "text-[#167A52]" : "text-[#596660]"}`}>{label}</Link>)}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          {sessionEmail ? <Link to="/account" className="max-w-[160px] truncate text-[12px] text-[#596660]">{sessionEmail}</Link> : <Link to="/auth" className="text-[13px] font-semibold text-[#253633]">Passenger sign in</Link>}
          <Button asChild variant="outline" className="h-10 rounded-xl border-[#CDD5CB] bg-white px-4 text-[12px] font-semibold text-[#253633] shadow-none hover:bg-[#F5F6F2]"><Link to="/demo">Passenger preview <ArrowRight size={14} /></Link></Button>
        </div>
        <Button onClick={() => setOpen(!open)} variant="ghost" size="icon" className="md:hidden" aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <X size={20} /> : <Menu size={20} />}</Button>
      </div>
      {open && <nav aria-label="Mobile navigation" className="absolute left-0 right-0 top-[76px] border-t border-[#E5E9E3] bg-[#F5F6F2] p-5 shadow-lg md:hidden">
        {publicLinks.map(([label, to]) => <Link key={label} to={to} onClick={() => setOpen(false)} className="block border-b border-[#E5E9E3] py-3 text-sm font-medium text-[#253633]">{label}</Link>)}
        <Link to="/demo" onClick={() => setOpen(false)} className="block border-b border-[#E5E9E3] py-3 text-sm font-medium text-[#253633]">Passenger preview</Link>
        <Link to="/auth" onClick={() => setOpen(false)} className="block py-3 text-sm font-medium text-[#253633]">Passenger sign in</Link>
      </nav>}
    </header>
  );
}

export function Footer() {
  return <footer className="bg-[#142B2B] px-5 py-12 text-white sm:px-8 lg:px-12">
    <div className="mx-auto grid max-w-[1320px] gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
      <div><Wordmark light /><p className="mt-4 max-w-[300px] text-sm leading-6 text-white/65">Everyday travel, moving forward. Built for the Nairobi metropolitan commute.</p></div>
      <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#DAF16B]">Explore</p><div className="mt-4 grid gap-3 text-sm text-white/75"><Link to="/routes">Pilot routes</Link><Link to="/plans">Pass plans</Link><Link to="/wallet">Digital wallet</Link><Link to="/operators">For operators</Link></div></div>
      <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#DAF16B]">Passenger & help</p><div className="mt-4 grid gap-3 text-sm text-white/75"><Link to="/demo">Passenger preview</Link><Link to="/auth">Passenger sign in</Link><Link to="/support">Get help</Link><span>Payments are not yet enabled</span></div></div>
    </div>
    <div className="mx-auto mt-10 flex max-w-[1320px] flex-col gap-3 border-t border-white/15 pt-5 text-[11px] text-white/50 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Safari Pass · Nairobi, Kenya</span><span>Sample figures are clearly labelled; live payments and journeys are not enabled.</span></div>
  </footer>;
}

export function Notice({ children, tone = "lime" }: { children: ReactNode; tone?: "lime" | "sand" }) {
  return <div className={`flex items-start gap-3 rounded-xl px-4 py-3 text-[12px] leading-5 ${tone === "lime" ? "bg-[#DAF16B] text-[#142B2B]" : "bg-[#EFEEE7] text-[#56625C]"}`}><Sparkles size={16} className="mt-0.5 shrink-0" />{children}</div>;
}

export function StatusPill({ children, tone = "green" }: { children: ReactNode; tone?: "green" | "muted" | "orange" }) {
  const color = tone === "green" ? "bg-[#E8F4EC] text-[#167A52]" : tone === "orange" ? "bg-[#F8EFE0] text-[#946320]" : "bg-[#EFF1ED] text-[#6F7A74]";
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${color}`}>{children}</span>;
}

export function MiniIcon({ icon = "wallet", tone = "lime" }: { icon?: "wallet" | "credit" | "bell" | "help" | "navigate" | "shield" | "people"; tone?: "lime" | "green" | "sand" }) {
  const Icon = icon === "wallet" ? Wallet : icon === "credit" ? CreditCard : icon === "bell" ? Bell : icon === "help" ? CircleHelp : icon === "navigate" ? Navigation : icon === "shield" ? ShieldCheck : HeartHandshake;
  const color = tone === "lime" ? "bg-[#DAF16B] text-[#142B2B]" : tone === "green" ? "bg-[#E8F4EC] text-[#167A52]" : "bg-[#EFEEE7] text-[#596660]";
  return <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}><Icon size={18} /></span>;
}

export function GoogleLogo() {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>;
}

export function AuthEntry() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState<"google" | "lovable" | null>(null);
  const signInSocial = async (provider: "google" | "lovable") => {
    setBusy(provider);
    try {
      const { lovable } = await import("@/integrations/lovable");
      const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin });
      if (result.error) toast.error(result.error.message);
      else if (result.redirected) return;
      else await navigate({ to: "/account" });
    } catch (error) { toast.error(error instanceof Error ? error.message : "Sign in did not complete."); }
    setBusy(null);
  };
  return <div className="grid gap-2.5">
    <Button variant="outline" disabled={busy !== null} onClick={() => signInSocial("google")} className="h-11 rounded-xl border-[#747775] bg-white px-3 text-[13px] font-medium text-[#1F1F1F] shadow-none hover:bg-[#F5F6F2]"><GoogleLogo />{busy === "google" ? "Connecting…" : "Continue with Google"}</Button>
    <Button variant="outline" disabled={busy !== null} onClick={() => signInSocial("lovable")} className="h-11 rounded-xl border-[#DDE2DA] bg-white text-[13px] text-[#253633] shadow-none hover:bg-[#F5F6F2]"><Fingerprint size={17} />{busy === "lovable" ? "Connecting…" : "Sign in with Lovable"}</Button>
  </div>;
}

export function EmailPasswordForm() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setLoading(true); setNotice("");
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: `${window.location.origin}/account`, data: { full_name: fullName.trim(), phone: phone.trim() } } });
      if (error) { toast.error(error.message); setLoading(false); return; }
      if (!data.session) setNotice("Check your email to confirm your account. You’ll be able to sign in after confirmation.");
      else await navigate({ to: "/account" });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) toast.error(error.message); else await navigate({ to: "/account" });
    }
    setLoading(false);
  };
  return <div className="space-y-5">
    {notice && <div role="status" className="rounded-xl bg-[#E8F4EC] px-4 py-3 text-sm leading-6 text-[#167A52]">{notice}</div>}
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {mode === "signup" && <><label className="grid gap-1.5 text-xs font-semibold text-[#40514A]">Full name<input required autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-11 rounded-xl border border-[#E0E5DE] bg-white px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-[#167A52]/30" placeholder="Your name" /></label><label className="grid gap-1.5 text-xs font-semibold text-[#40514A]">Mobile number <span className="font-normal text-[#77847E]">· optional</span><input autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 rounded-xl border border-[#E0E5DE] bg-white px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-[#167A52]/30" placeholder="07xx xxx xxx" /></label></>}
      <label className="grid gap-1.5 text-xs font-semibold text-[#40514A]">Email address<input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-xl border border-[#E0E5DE] bg-white px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-[#167A52]/30" placeholder="you@example.com" /></label>
      <label className="grid gap-1.5 text-xs font-semibold text-[#40514A]">Password<input required type="password" minLength={8} autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-xl border border-[#E0E5DE] bg-white px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-[#167A52]/30" placeholder="At least 8 characters" /></label>
      <Button type="submit" disabled={loading} className="mt-2 h-11 w-full rounded-xl bg-[#142B2B] text-sm font-semibold text-white shadow-none hover:bg-[#213C3A]">{loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}<ArrowRight size={15} /></Button>
    </form>
    <div className="text-center text-xs text-[#77847E]">{mode === "signin" ? "New to Safari Pass?" : "Already have an account?"} <button className="font-semibold text-[#167A52] underline-offset-4 hover:underline" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setNotice(""); }}>{mode === "signin" ? "Create an account" : "Sign in"}</button></div>
  </div>;
}

export function SignOutButton() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSignOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message); else await navigate({ to: "/", replace: true });
    setLoading(false);
  };
  return <Button variant="ghost" size="sm" disabled={loading} onClick={onSignOut} className="h-9 px-3 text-xs text-[#68746E] hover:text-[#142B2B]"><LogOut size={15} />{loading ? "Signing out…" : "Sign out"}</Button>;
}

export function ForgotPasswordForm({ onCancel }: { onCancel: () => void }) {
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` });
    if (error) toast.error(error.message);
    else setNotice("If an account exists for that email, password reset instructions are on their way.");
    setLoading(false);
  };
  return <div className="space-y-4">
    {notice ? <p role="status" className="rounded-xl bg-[#E8F4EC] px-4 py-3 text-sm leading-6 text-[#167A52]">{notice}</p> : <form onSubmit={submit} className="grid gap-3"><label className="grid gap-1.5 text-xs font-semibold text-[#40514A]">Email address<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-11 rounded-xl border border-[#E0E5DE] bg-white px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-[#167A52]/30" placeholder="you@example.com" /></label><Button disabled={loading} className="h-11 w-full rounded-xl bg-[#142B2B] text-sm font-semibold text-white shadow-none hover:bg-[#213C3A]">{loading ? "Sending…" : "Send reset instructions"}</Button></form>}
    <button type="button" onClick={onCancel} className="w-full text-center text-xs font-semibold text-[#167A52]">Back to sign in</button>
  </div>;
}

export function useCurrentUser() {
  const [state, setState] = useState<{ ready: boolean; user: import("@supabase/supabase-js").User | null }>({ ready: false, user: null });
  useEffect(() => {
    let alive = true;
    supabase.auth.getUser().then(({ data, error }) => { if (alive) setState({ ready: true, user: error ? null : data.user }); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => { if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") setState({ ready: true, user: session?.user ?? null }); });
    return () => { alive = false; subscription.unsubscribe(); };
  }, []);
  return state;
}

export function Progress({ value }: { value: number }) {
  return <div className="h-1.5 overflow-hidden rounded-full bg-[#EAF0E9]"><div className="h-full rounded-full bg-[#167A52] transition-[width]" style={{ width: `${Math.round(Math.min(1, Math.max(0, value)) * 100)}%` }} /></div>;
}

export function ProtectedFrame({ active, children, userEmail }: { active: string; children: ReactNode; userEmail: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = [
    { label: "Overview", href: "/account", icon: Wallet },
    { label: "My passes", href: "/passes", icon: CreditCard },
    { label: "Wallet", href: "/wallet", icon: ArrowDownLeft },
    { label: "My journeys", href: "/journeys", icon: Navigation },
    { label: "Profile", href: "/profile", icon: ShieldCheck },
    { label: "Support", href: "/support", icon: CircleHelp },
  ];
  return <div className="min-h-screen bg-[#F5F6F2]">
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-[#E5E9E3] bg-white transition-transform lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex h-[74px] items-center justify-between border-b border-[#E5E9E3] px-5"><Wordmark /><Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close navigation" className="lg:hidden"><X size={17} /></Button></div>
      <div className="px-5 pb-3 pt-7 text-[10px] font-semibold uppercase tracking-[.12em] text-[#9AA49E]">Your commute</div>
      <nav aria-label="Passenger account" className="grid gap-1 px-3">{items.map(({ label, href, icon: Icon }) => <a key={label} href={href} onClick={() => setMobileOpen(false)} className={`flex h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-medium transition-colors ${active === label ? "bg-[#E8F4EC] text-[#167A52]" : "text-[#68746E] hover:bg-[#F5F6F2] hover:text-[#142B2B]"}`}><Icon size={17} />{label}{active === label && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#167A52]" />}</a>)}</nav>
      <div className="mt-auto border-t border-[#E5E9E3] px-4 py-4"><div className="mb-2 truncate text-[11px] text-[#77847E]">{userEmail}</div><SignOutButton /></div>
    </aside>
    {mobileOpen && <button className="fixed inset-0 z-30 bg-[#142B2B]/35 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu" />}
    <div className="min-h-screen lg:pl-[248px]">
      <header className="sticky top-0 z-20 flex h-[74px] items-center justify-between border-b border-[#E5E9E3] bg-[#F5F6F2]/95 px-5 backdrop-blur sm:px-8"><Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu" className="lg:hidden"><Menu size={19} /></Button><div className="hidden lg:block"><p className="text-[11px] text-[#77847E]">Your Safari Pass account</p><p className="mt-0.5 text-sm font-semibold text-[#142B2B]">{active}</p></div><div className="ml-auto inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[10px] font-semibold text-[#68746E]"><span className="h-1.5 w-1.5 rounded-full bg-[#167A52]" />Nairobi · EAT</div></header>
      <main className="mx-auto max-w-[1320px] px-4 py-7 sm:px-8 sm:py-9">{children}</main>
    </div>
  </div>;
}

export function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#167A52]">{eyebrow}</p><h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-[-.02em] text-[#142B2B] sm:text-[34px]">{title}</h1><p className="mt-2 max-w-[600px] text-[13px] leading-6 text-[#77847E]">{description}</p></div>{action}</div>;
}

export function EmptyState({ icon = "credit", title, detail, action }: { icon?: "credit" | "journey" | "help"; title: string; detail: string; action?: ReactNode }) {
  const Icon = icon === "journey" ? Navigation : icon === "help" ? CircleHelp : CreditCard;
  return <div className="flex min-h-[210px] flex-col items-center justify-center px-6 py-9 text-center"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EFEEE7] text-[#596660]"><Icon size={21} /></span><h2 className="mt-4 text-sm font-semibold text-[#142B2B]">{title}</h2><p className="mt-1 max-w-[340px] text-xs leading-5 text-[#77847E]">{detail}</p>{action && <div className="mt-4">{action}</div>}</div>;
}

export function SmallArrow() { return <ArrowUpRight size={14} className="text-[#167A52]" />; }
export function ConfirmIcon() { return <Check size={14} />; }