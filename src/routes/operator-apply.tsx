import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/operator-apply")({
  ssr: false,
  head: () => ({ meta: [{ title: "Apply as an operator | Safari Pass" }, { name: "description", content: "Request a verified Safari Pass operator workspace." }, { property: "og:title", content: "Apply as an operator | Safari Pass" }, { property: "og:description", content: "Request a verified Safari Pass operator workspace." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <main className="min-h-screen bg-background p-8">Apply as an operator</main>,
});