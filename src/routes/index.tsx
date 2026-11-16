import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Clock3, Compass, Fingerprint, Leaf, Route as RouteIcon, ShieldCheck, Smartphone, Sparkles, TicketCheck, WalletCards } from "lucide-react";
import { useCurrentUser, SiteHeader, Footer } from "@/components/safari-pass-ui";
import { Button } from "@/components/ui/button";
import matatuImage from "@/assets/safari-pass-matatu.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Safari Pass | Move with the city" }, { name: "description", content: "The smarter way to move across Nairobi, Thika and Juja. Plan your commute and explore a better way to ride." }, { property: "og:title", content: "Safari Pass | Move with the city" }, { property: "og:description", content: "The smarter way to move across Nairobi, Thika and Juja." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: HomePage,
});

function HomePage() {
  const { ready, user } = useCurrentUser();
  const [routes, setRoutes] = useState<{ short_code: string; origin: string; destination: string }[]>([]);
  useEffect(() => {
    let live = true;
    import("@/integrations/supabase/client").then(({ supabase }) => supabase.from("routes").select("short_code,origin,destination").eq("status", "active").order("short_code").then(({ data }) => { if (live && data) setRoutes(data); }));
    return () => { live = false; };
  }, []);
  const pilotRoutes = routes.length ? routes : [
    { short_code: "17", origin: "Nairobi CBD", destination: "Thika" },
    { short_code: "44", origin: "Nairobi CBD", destination: "Juja" },
    { short_code: "N1", origin: "Ruiru", destination: "Nairobi CBD" },
  ];
  return <main className="min-h-screen bg-[#F5F6F2] text-[#142B2B]">
    <SiteHeader active="Routes" sessionEmail={ready ? user?.email : undefined} />
    <section className="mx-auto grid min-h-[690px] max-w-[1320px] items-center gap-8 px-5 pb-14 pt-9 sm:px-8 md:min-h-[710px] md:grid-cols-[1.02fr_.98fr] md:px-12 md:py-12">
      <div className="relative z-10 max-w-[580px] py-5 md:py-8">
        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#167A52]"><span className="h-[1px] w-6 bg-[#167A52]" />Nairobi · Thika · Juja</p>
        <h1 className="mt-6 max-w-[580px] text-[45px] font-semibold leading-[1.05] tracking-[-.035em] text-[#142B2B] sm:text-[57px] md:text-[64px]">Move with<br />the <span className="relative inline-block">city<span aria-hidden="true" className="absolute -bottom-1 left-0 right-0 h-[9px] -rotate-1 rounded-full bg-[#DAF16B]" /></span>. Not against it.</h1>
        <p className="mt-6 max-w-[470px] text-[14px] leading-7 text-[#68746E] sm:text-[15px]">A calmer, clearer way to get around. Find your route, keep your commute together, and make every trip feel a little more yours.</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild className="h-12 rounded-xl bg-[#167A52] px-5 text-[13px] font-semibold text-white shadow-none hover:bg-[#116846]"><a href="/demo">Explore the passenger preview <ArrowRight size={16} /></a></Button>
          <a href="#routes" className="inline-flex h-12 items-center gap-2 rounded-xl px-4 text-[13px] font-semibold text-[#253633] hover:bg-white">See pilot routes <ArrowUpRight size={15} /></a>
        </div>
        <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[11px] font-medium text-[#68746E]"><span className="h-1.5 w-1.5 rounded-full bg-[#167A52]" />Nairobi metropolitan pilot</div>
        <div className="mt-10 grid max-w-[465px] grid-cols-3 border-t border-[#DEE4DC] pt-5">
          <div><p className="text-[22px] font-semibold leading-none text-[#142B2B]">01</p><p className="mt-2 text-[10px] text-[#77847E]">Pilot corridor</p></div>
          <div className="border-l border-[#DEE4DC] pl-5"><p className="text-[22px] font-semibold leading-none text-[#142B2B]">KES</p><p className="mt-2 text-[10px] text-[#77847E]">Built for local travel</p></div>
          <div className="border-l border-[#DEE4DC] pl-5"><p className="text-[22px] font-semibold leading-none text-[#142B2B]">01</p><p className="mt-2 text-[10px] text-[#77847E]">City, connected</p></div>
        </div>
      </div>
      <div className="relative min-h-[390px] sm:min-h-[470px] md:min-h-[540px]">
        <div className="absolute inset-0 overflow-hidden rounded-[24px] bg-[#E1E7DE]"><img src={matatuImage} alt="A colourful Kenyan matatu travelling through central Nairobi" className="h-full w-full object-cover object-[58%_center]" /><div className="absolute inset-0 bg-gradient-to-t from-[#142B2B]/55 via-transparent to-[#142B2B]/5" />
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/90 px-3 py-2 text-[10px] font-semibold text-[#253633] backdrop-blur"><Compass size={14} className="text-[#167A52]" />Everyday travel, moving forward</div>
          <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-7 sm:left-7"><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#DAF16B]">THE NAIROBI COMMUTE</p><p className="mt-2 max-w-[350px] text-[23px] font-semibold leading-tight sm:text-[28px]">A little more ease in every journey.</p></div>
        </div>
        <div className="absolute -bottom-4 right-4 flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-xl sm:-right-3 sm:bottom-12 sm:p-4"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F4EC] text-[#167A52]"><TicketCheck size={18} /></span><div><p className="text-[11px] font-semibold text-[#142B2B]">Your commute, in one place</p><p className="mt-1 text-[10px] text-[#77847E]">Routes · passes · journey history</p></div></div>
      </div>
    </section>
    <section id="routes" className="scroll-mt-5 border-y border-[#E5E9E3] bg-white px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
      <div className="mx-auto max-w-[1320px]"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#167A52]">THE PILOT</p><h2 className="mt-2 text-[27px] font-semibold tracking-[-.02em] text-[#142B2B] sm:text-[32px]">One city. A better-connected commute.</h2><p className="mt-2 max-w-[580px] text-[13px] leading-6 text-[#77847E]">Starting across the Nairobi–Thika–Juja corridor, with route details shown as they are confirmed.</p></div><span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F5F6F2] px-3 py-2 text-[10px] font-semibold text-[#68746E]"><span className="h-1.5 w-1.5 rounded-full bg-[#167A52]" /> {routes.length ? "Active route listings" : "Illustrative corridor examples"}</span></div>
        <div className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-[#E5E9E3] bg-[#E5E9E3] md:grid-cols-3">{pilotRoutes.map((item, i) => <article key={item.short_code} className="flex min-h-[148px] flex-col justify-between bg-white p-5 sm:p-6"><div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F4EC] text-[#167A52]"><RouteIcon size={17} /></span><span className="text-[10px] font-semibold uppercase tracking-[.1em] text-[#A0AAA3]">{String(i + 1).padStart(2, "0")}</span></div><div className="mt-5"><p className="text-[14px] font-semibold text-[#253633]">{item.origin} <span className="text-[#167A52]">→</span> {item.destination}</p><p className="mt-1 text-[10px] text-[#77847E]">Route {item.short_code} · route status and fares subject to operator confirmation</p></div></article>)}</div>
      </div>
    </section>
    <section id="about" className="scroll-mt-5 px-5 py-14 sm:px-8 sm:py-18 lg:px-12"><div className="mx-auto max-w-[1320px]"><div className="grid gap-10 md:grid-cols-[.83fr_1.17fr] md:items-start"><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#167A52]">MADE FOR THE EVERYDAY</p><h2 className="mt-3 max-w-[430px] text-[32px] font-semibold leading-[1.13] tracking-[-.025em] text-[#142B2B] sm:text-[40px]">The whole commute, a little more together.</h2><p className="mt-4 max-w-[400px] text-[13px] leading-6 text-[#68746E]">We’re bringing the pieces of your everyday travel into one simpler place. Start by exploring the clearly labelled passenger preview.</p><a href="/demo" className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold text-[#167A52]">Take a look <ArrowRight size={15} /></a></div>
        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">{[
          { icon: RouteIcon, title: "Routes at a glance", text: "Explore the Nairobi, Thika and Juja pilot corridor, with details as they’re confirmed." },
          { icon: WalletCards, title: "Your money stays clear", text: "See how a future wallet experience could keep balances and transaction history together." },
          { icon: TicketCheck, title: "Passes that fit your routine", text: "Explore a sample pass layout without purchasing a subscription or deducting credits." },
          { icon: ShieldCheck, title: "Built around trust", text: "Your account is private; sensitive trip records and payments are never fabricated." },
        ].map(({ icon: Icon, title, text }) => <article key={title} className="border-t border-[#DDE3DA] pt-4"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#DAF16B] text-[#142B2B]"><Icon size={18} /></span><h3 className="mt-3 text-[13px] font-semibold text-[#253633]">{title}</h3><p className="mt-1.5 text-[11px] leading-5 text-[#77847E]">{text}</p></article>)}</div>
      </div></div></section>
    <section id="operators" className="scroll-mt-5 border-y border-[#E5E9E3] bg-[#EFEEE7] px-5 py-11 sm:px-8 sm:py-14 lg:px-12"><div className="mx-auto flex max-w-[1320px] flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#167A52]"><Fingerprint size={20} /></span><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#167A52]">FOR SACCOs & OPERATORS</p><h2 className="mt-1 text-[22px] font-semibold tracking-[-.02em] text-[#142B2B]">Your fleet is part of the journey.</h2><p className="mt-2 max-w-[590px] text-[12px] leading-6 text-[#68746E]">Register your interest in managing vehicles and commuter routes. Operator access stays limited until your application is reviewed.</p></div></div><Button asChild variant="outline" className="h-11 w-fit shrink-0 rounded-xl border-[#CDD5CB] bg-white px-4 text-[12px] font-semibold text-[#253633] shadow-none hover:bg-[#F5F6F2]"><a href="/operator-apply">Explore operator access <ArrowRight size={15} /></a></Button></div></section>
    <section className="px-5 py-12 sm:px-8 sm:py-14 lg:px-12"><div className="mx-auto grid max-w-[1320px] items-center gap-7 rounded-[22px] bg-[#142B2B] px-6 py-8 text-white sm:px-10 sm:py-10 md:grid-cols-[1fr_auto]"><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#DAF16B]">A FIRST LOOK</p><h2 className="mt-2 text-[25px] font-semibold leading-tight sm:text-[31px]">Your daily route, ready when you are.</h2><p className="mt-2 max-w-[530px] text-[12px] leading-6 text-white/65">Open the passenger preview to explore the account layout and sample data. No payment or journey is created.</p></div><Button asChild className="h-12 w-fit rounded-xl bg-[#DAF16B] px-5 text-[12px] font-semibold text-[#142B2B] shadow-none hover:bg-[#CDE45A]"><a href="/demo">Open passenger preview <ArrowRight size={15} /></a></Button></div></section>
    <Footer />
  </main>;
}