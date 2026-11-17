import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Repeat2, TicketCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer, SiteHeader } from "@/components/safari-pass-ui";

export const Route = createFileRoute("/plans")({
  head: () => ({ meta: [
    { title: "Commuter pass plans | Safari Pass" },
    { name: "description", content: "Learn about the planned Safari Pass commuter pass options for Nairobi, Thika and Juja." },
    { property: "og:title", content: "Commuter pass plans | Safari Pass" },
    { property: "og:description", content: "Learn about the planned Safari Pass commuter pass options for Nairobi, Thika and Juja." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PlansPage,
});

const concepts = [
  { icon: CalendarDays, title: "Weekday commute", detail: "A straightforward pass concept for regular weekday travel." },
  { icon: Repeat2, title: "Flexible travel", detail: "A pass concept for commuters whose weekly routine changes." },
  { icon: TicketCheck, title: "Your pass, in one place", detail: "A clear view of pass details and verified journey use." },
];

function PlansPage() {
  return <main className="min-h-screen bg-safari-canvas text-safari-ink">
    <SiteHeader active="Plans" />
    <section className="border-b border-safari-line bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12"><div className="mx-auto max-w-[1120px]">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-safari-green">COMMUTER PASSES</p>
      <h1 className="mt-4 max-w-[740px] text-4xl font-semibold leading-tight sm:text-5xl">A travel pass that fits your routine.</h1>
      <p className="mt-5 max-w-[680px] text-base leading-7 text-safari-muted">Safari Pass is being designed to bring commuter passes and verified journeys together. These are service concepts—not published plans or offers for sale.</p>
    </div></section>
    <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12"><div className="mx-auto max-w-[1120px]">
      <div className="grid gap-8 md:grid-cols-3">{concepts.map(({ icon: Icon, title, detail }) => <article key={title} className="border-t-2 border-safari-green pt-5"><span className="flex h-10 w-10 items-center justify-center bg-safari-pale-green text-safari-green"><Icon size={19} /></span><h2 className="mt-4 text-lg font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-safari-muted">{detail}</p></article>)}</div>
      <div className="mt-12 border-y border-safari-line py-6"><p className="text-sm font-semibold">Plans and prices are not published yet.</p><p className="mt-2 max-w-[720px] text-sm leading-6 text-safari-muted">No pass can currently be purchased. Prices, credit limits and validity will be shown only after participating operators and service details are confirmed. No payment will be requested on this page.</p></div>
      <div className="mt-8 flex flex-wrap items-center gap-4"><Button asChild className="h-11 rounded-md bg-safari-green px-5 text-sm font-semibold text-white shadow-none hover:bg-safari-green-dark"><a href="/routes">View pilot routes <ArrowRight size={16} /></a></Button><a href="/demo" className="text-sm font-semibold text-safari-text underline underline-offset-4">See the clearly labelled passenger preview</a></div>
    </div></section>
    <Footer />
  </main>;
}