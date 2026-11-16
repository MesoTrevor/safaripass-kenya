import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo")({
  head: () => ({ meta: [{ title: "Passenger preview | Safari Pass" }, { name: "description", content: "Explore a clearly labelled sample Safari Pass commuter dashboard." }, { property: "og:title", content: "Passenger preview | Safari Pass" }, { property: "og:description", content: "Explore a clearly labelled sample Safari Pass commuter dashboard." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <main className="min-h-screen bg-background p-8">Safari Pass passenger preview</main>,
});