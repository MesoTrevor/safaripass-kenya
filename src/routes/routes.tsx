import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock3, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer, SiteHeader } from "@/components/safari-pass-ui";
import { DEMO_ROUTES } from "@/lib/safari-pass-demo";

export const Route = createFileRoute("/routes")({
  head: () => ({ meta: [
    { title: "Pilot routes | Safari Pass" },
    { name: "description", content: "Explore the planned Safari Pass Nairobi, Thika and Juja pilot corridor." },
    { property: "og:title", content: "Pilot routes | Safari Pass" },
    { property: "og:description", content: "Explore the planned Safari Pass Nairobi, Thika and Juja pilot corridor." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: RoutesPage,
});

function RoutesPage() {
  return <main className="min-h-screen bg-safari-canvas text-safari-ink">
    <SiteHeader active="Routes" />
    <section className="border-b border-safari-line bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-[1120px]">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-safari-green">NAIROBI · THIKA · JUJA</p>
        <h1 className="mt-4 max-w-[760px] text-4xl font-semibold leading-tight sm:text-5xl">The daily corridor, made easier to navigate.</h1>
        <p className="mt-5 max-w-[660px] text-base leading-7 text-safari-muted">Safari Pass is starting with the Nairobi metropolitan commute. Route names below are illustrative pilot examples; operators have not confirmed live timetables, stops or fares.</p>
        <div className="mt-7 inline-flex items-center gap-2 border-l-2 border-safari-green pl-3 text-sm font-medium text-safari-text"><MapPin size={16} className="text-safari-green" /> Nairobi metropolitan pilot corridor</div>
      </div>
    </section>
    <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
      <div className="mx-auto max-w-[1120px]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-safari-green">PILOT EXAMPLES</p><h2 className="mt-2 text-2xl font-semibold">A first look at the corridor</h2></div><span className="text-xs text-safari-muted">Not live service information</span></div>
        <div className="mt-7 divide-y divide-safari-line border-y border-safari-line">
          {DEMO_ROUTES.map((route, index) => <article key={route.code} className="grid gap-4 py-6 sm:grid-cols-[72px_minmax(0,1fr)_180px] sm:items-center">
            <span className="flex h-11 w-11 items-center justify-center bg-safari-pale-green text-safari-green"><Navigation size={19} /></span>
            <div><p className="text-base font-semibold">{route.origin} <span className="text-safari-green">→</span> {route.destination}</p><p className="mt-1 text-sm text-safari-muted">Illustrative route {route.code} · example {index + 1}</p></div>
            <div className="flex items-center gap-2 text-xs text-safari-muted"><Clock3 size={15} /> Example time: {route.duration}</div>
          </article>)}
        </div>
        <p className="mt-5 max-w-[760px] text-xs leading-6 text-safari-muted">These examples are not a timetable or a promise of service. Confirmed operators, stop locations, fares and departure details will be published here when available.</p>
        <Button asChild className="mt-8 h-11 rounded-md bg-safari-green px-5 text-sm font-semibold text-white shadow-none hover:bg-safari-green-dark"><a href="/plans">Explore pass plans <ArrowRight size={16} /></a></Button>
      </div>
    </section>
    <Footer />
  </main>;
}