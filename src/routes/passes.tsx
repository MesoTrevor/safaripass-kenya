import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/passes")({
  ssr: false,
  head: () => ({ meta: [{ title: "My passes | Safari Pass" }, { name: "description", content: "View your Safari Pass subscriptions and journey credits." }, { property: "og:title", content: "My passes | Safari Pass" }, { property: "og:description", content: "View your Safari Pass subscriptions and journey credits." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <main className="min-h-screen bg-background p-8">My passes</main>,
});