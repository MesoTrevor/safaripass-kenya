import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/wallet")({
  ssr: false,
  head: () => ({ meta: [{ title: "My wallet | Safari Pass" }, { name: "description", content: "Review your Safari Pass wallet balance and transaction history." }, { property: "og:title", content: "My wallet | Safari Pass" }, { property: "og:description", content: "Review your Safari Pass wallet balance and transaction history." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <main className="min-h-screen bg-background p-8">My wallet</main>,
});