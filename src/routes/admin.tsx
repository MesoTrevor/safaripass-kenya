import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({ meta: [{ title: "Administration | Safari Pass" }, { name: "description", content: "Review Safari Pass applications and platform operations." }, { property: "og:title", content: "Administration | Safari Pass" }, { property: "og:description", content: "Review Safari Pass applications and platform operations." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <main className="min-h-screen bg-background p-8">Administration</main>,
});