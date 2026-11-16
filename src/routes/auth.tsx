import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in | Safari Pass" }, { name: "description", content: "Sign in or create your Safari Pass commuter account." }, { property: "og:title", content: "Sign in | Safari Pass" }, { property: "og:description", content: "Sign in or create your Safari Pass commuter account." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <main className="min-h-screen bg-background p-8">Safari Pass sign in</main>,
});