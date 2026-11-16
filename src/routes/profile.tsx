import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  ssr: false,
  head: () => ({ meta: [{ title: "My profile | Safari Pass" }, { name: "description", content: "Manage your Safari Pass passenger profile." }, { property: "og:title", content: "My profile | Safari Pass" }, { property: "og:description", content: "Manage your Safari Pass passenger profile." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <main className="min-h-screen bg-background p-8">My profile</main>,
});