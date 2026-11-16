import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/support")({
  ssr: false,
  head: () => ({ meta: [{ title: "Support | Safari Pass" }, { name: "description", content: "Get help with your Safari Pass account." }, { property: "og:title", content: "Support | Safari Pass" }, { property: "og:description", content: "Get help with your Safari Pass account." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <main className="min-h-screen bg-background p-8">Support</main>,
});