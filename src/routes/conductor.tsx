import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/conductor")({
  ssr: false,
  head: () => ({ meta: [{ title: "Conductor workspace | Safari Pass" }, { name: "description", content: "Open your verified Safari Pass conductor workspace." }, { property: "og:title", content: "Conductor workspace | Safari Pass" }, { property: "og:description", content: "Open your verified Safari Pass conductor workspace." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <main className="min-h-screen bg-background p-8">Conductor workspace</main>,
});