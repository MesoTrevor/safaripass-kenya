import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, BusFront, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/safari-pass-ui";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Choose a new password | Safari Pass" }, { name: "description", content: "Set a new password for your Safari Pass account." }, { property: "og:title", content: "Choose a new password | Safari Pass" }, { property: "og:description", content: "Set a new password for your Safari Pass account." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [recovery, setRecovery] = useState(false);
  const [checked, setChecked] = useState(false);
  const [done, setDone] = useState(false);
  const checkRecovery = async () => {
    if (checked) return;
    setChecked(true);
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const queryParams = new URLSearchParams(window.location.search);
    const type = hashParams.get("type") ?? queryParams.get("type");
    if (type === "recovery") {
      if (hashParams.has("access_token") && hashParams.has("refresh_token")) {
        const { error } = await supabase.auth.setSession({ access_token: hashParams.get("access_token") ?? "", refresh_token: hashParams.get("refresh_token") ?? "" });
        setRecovery(!error);
      } else {
        const { data, error } = await supabase.auth.getSession();
        setRecovery(!error && Boolean(data.session));
      }
    }
  };
  void checkRecovery();
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!recovery) { toast.error("Open the password reset link from your email first."); return; }
    if (password !== confirm) { toast.error("The passwords don’t match."); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) toast.error(error.message); else setDone(true);
    setLoading(false);
  };
  return <main className="flex min-h-screen items-center justify-center bg-[#F5F6F2] px-5 py-10"><section className="w-full max-w-[440px] rounded-2xl border border-[#E4E9E2] bg-white p-6 shadow-sm sm:p-9"><div className="flex items-center justify-between"><Wordmark /><Link to="/auth" aria-label="Back to sign in" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F6F2] text-[#68746E]"><ArrowLeft size={17} /></Link></div><div className="mt-9"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F4EC] text-[#167A52]"><LockKeyhole size={19} /></span><h1 className="mt-4 text-[25px] font-semibold tracking-[-.02em] text-[#142B2B]">Choose a new password</h1><p className="mt-2 text-[12px] leading-6 text-[#77847E]">{done ? "Your password has been updated." : recovery ? "Choose a secure password with at least eight characters." : "Use the secure reset link we sent to your email to continue."}</p></div>{done ? <Button onClick={() => navigate({ to: "/auth" })} className="mt-6 h-11 w-full rounded-xl bg-[#167A52] text-sm font-semibold text-white shadow-none">Continue to sign in</Button> : recovery ? <form onSubmit={submit} className="mt-6 grid gap-4"><label className="grid gap-1.5 text-xs font-semibold text-[#40514A]">New password<input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-11 rounded-xl border border-[#E0E5DE] bg-white px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-[#167A52]/30" /></label><label className="grid gap-1.5 text-xs font-semibold text-[#40514A]">Confirm password<input required minLength={8} type="password" autoComplete="new-password" value={confirm} onChange={(event) => setConfirm(event.target.value)} className="h-11 rounded-xl border border-[#E0E5DE] bg-white px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-[#167A52]/30" /></label><Button disabled={loading} className="h-11 rounded-xl bg-[#167A52] text-sm font-semibold text-white shadow-none">{loading ? "Updating…" : "Save new password"}</Button></form> : <Button onClick={() => navigate({ to: "/auth" })} variant="outline" className="mt-6 h-11 w-full rounded-xl border-[#DDE2DA] bg-white text-sm font-semibold text-[#253633] shadow-none">Back to sign in</Button>}</section></main>;
}