import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/journeys")({
  ssr: false,
  head: () => ({ meta: [{ title: "My journeys | Safari Pass" }, { name: "description", content: "Review verified travel records associated with your account." }, { property: "og:title", content: "My journeys | Safari Pass" }, { property: "og:description", content: "Review verified travel records associated with your account." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <main className="min-h-screen bg-background p-8">My journeys</main>,
});