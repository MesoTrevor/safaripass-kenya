import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, LockKeyhole, Smartphone, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer, SiteHeader } from "@/components/safari-pass-ui";

export const Route = createFileRoute("/wallet")({
  head: () => ({ meta: [
    { title: "Digital wallet | Safari Pass" },
    { name: "description", content: "Learn about the planned Safari Pass commuter wallet and current payment setup status." },
    { property: "og:title", content: "Digital wallet | Safari Pass" },
    { property: "og:description", content: "Learn about the planned Safari Pass commuter wallet and current payment setup status." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: WalletInfoPage,
});

function WalletInfoPage() {
  return <main className="min-h-screen bg-safari-canvas text-safari-ink">
    <SiteHeader active="Wallet" />
    <section className="border-b border-safari-line bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12"><div className="mx-auto max-w-[1120px]">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-safari-green">A CLEARER WAY TO PAY</p>
      <h1 className="mt-4 max-w-[740px] text-4xl font-semibold leading-tight sm:text-5xl">A commuter wallet, with trust built in.</h1>
      <p className="mt-5 max-w-[680px] text-base leading-7 text-safari-muted">Safari Pass plans to bring payment records and travel passes into one clear experience. Real payments are not enabled yet.</p>
    </div></section>
    <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12"><div className="mx-auto max-w-[1120px]">
      <div className="grid gap-8 md:grid-cols-3">
        <article className="border-t border-safari-line pt-5"><span className="flex h-10 w-10 items-center justify-center bg-safari-pale-green text-safari-green"><WalletCards size={19} /></span><h2 className="mt-4 text-lg font-semibold">One clear record</h2><p className="mt-2 text-sm leading-6 text-safari-muted">A planned view of confirmed wallet activity and pass details.</p></article>
        <article className="border-t border-safari-line pt-5"><span className="flex h-10 w-10 items-center justify-center bg-safari-pale-green text-safari-green"><Smartphone size={19} /></span><h2 className="mt-4 text-lg font-semibold">Kenyan payments in mind</h2><p className="mt-2 text-sm leading-6 text-safari-muted">M-Pesa, card and bank options require provider setup and verification before launch.</p></article>
        <article className="border-t border-safari-line pt-5"><span className="flex h-10 w-10 items-center justify-center bg-safari-pale-green text-safari-green"><LockKeyhole size={19} /></span><h2 className="mt-4 text-lg font-semibold">No pretend transactions</h2><p className="mt-2 text-sm leading-6 text-safari-muted">No deposits, top-ups, purchases or journey deductions are processed or shown as successful.</p></article>
      </div>
      <div className="mt-12 border-y border-safari-line py-6"><p className="text-sm font-semibold">Payment setup is not complete.</p><p className="mt-2 max-w-[720px] text-sm leading-6 text-safari-muted">Provider connections, verified payment confirmations and settlement checks must be in place before the wallet can accept or move money. Any preview is marked as a demonstration and is not a receipt or live balance.</p></div>
      <div className="mt-8 flex flex-wrap items-center gap-4"><Button asChild className="h-11 rounded-md bg-safari-green px-5 text-sm font-semibold text-white shadow-none hover:bg-safari-green-dark"><a href="/demo">See the labelled preview <ArrowRight size={16} /></a></Button><a href="/plans" className="text-sm font-semibold text-safari-text underline underline-offset-4">Learn about passes</a></div>
    </div></section>
    <Footer />
  </main>;
}