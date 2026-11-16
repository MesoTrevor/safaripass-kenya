import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account")({
  ssr: false,
  head: () => ({ meta: [{ title: "My commute | Safari Pass" }, { name: "description", content: "Your Safari Pass commuter dashboard." }, { property: "og:title", content: "My commute | Safari Pass" }, { property: "og:description", content: "Your Safari Pass commuter dashboard." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <main className="min-h-screen bg-background p-8">My commute</main>,
});