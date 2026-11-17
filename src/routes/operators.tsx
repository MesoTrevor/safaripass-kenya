import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BusFront, ClipboardCheck, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer, SiteHeader } from "@/components/safari-pass-ui";

export const Route = createFileRoute("/operators")({
  head: () => ({ meta: [
    { title: "For transport operators | Safari Pass" },
    { name: "description", content: "Learn how Safari Pass plans to work with Kenyan SACCOs, matatu operators and conductors." },
    { property: "og:title", content: "For transport operators | Safari Pass" },
    { property: "og:description", content: "Learn how Safari Pass plans to work with Kenyan SACCOs, matatu operators and conductors." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: OperatorsPage,
});

const details = [
  { icon: BusFront, title: "For SACCOs and fleets", text: "A planned way to present verified routes and fleet information to commuters." },
  { icon: UsersRound, title: "For conductors", text: "A future role in confirming passenger journeys through approved operator tools." },
  { icon: ClipboardCheck, title: "Verification comes first", text: "Operator accounts and transport activity require review. This page does not grant access or confirm a partnership." },
];

function OperatorsPage() {
  return <main className="min-h-screen bg-safari-canvas text-safari-ink">
    <SiteHeader active="Operators" />
    <section className="border-b border-safari-line bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12"><div className="mx-auto max-w-[1120px]">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-safari-green">FOR SACCOs & TRANSPORT OPERATORS</p>
      <h1 className="mt-4 max-w-[760px] text-4xl font-semibold leading-tight sm:text-5xl">Build a better-connected commute together.</h1>
      <p className="mt-5 max-w-[680px] text-base leading-7 text-safari-muted">Safari Pass is being developed with Nairobi-area transport operators in mind. The goal is to make route information clearer and support verified pass journeys.</p>
    </div></section>
    <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12"><div className="mx-auto max-w-[1120px]">
      <div className="grid gap-8 md:grid-cols-3">{details.map(({ icon: Icon, title, text }) => <article key={title} className="border-t border-safari-line pt-5"><span className="flex h-10 w-10 items-center justify-center bg-safari-pale-green text-safari-green"><Icon size={19} /></span><h2 className="mt-4 text-lg font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-safari-muted">{text}</p></article>)}</div>
      <div className="mt-12 flex flex-col gap-5 border-y border-safari-line py-7 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-lg font-semibold">Interested in the pilot?</h2><p className="mt-2 max-w-[650px] text-sm leading-6 text-safari-muted">Operator requests are reviewed before any private workspace is enabled. Applying requires signing in; submitting a request does not create verified operator status.</p></div><Button asChild className="h-11 w-fit shrink-0 rounded-md bg-safari-green px-5 text-sm font-semibold text-white shadow-none hover:bg-safari-green-dark"><a href="/operator-apply">Operator sign in & application <ArrowRight size={16} /></a></Button></div>
    </div></section>
    <Footer />
  </main>;
}