import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/operator")({
  ssr: false,
  head: () => ({ meta: [{ title: "Operator workspace | Safari Pass" }, { name: "description", content: "Manage your verified Safari Pass operator account and vehicles." }, { property: "og:title", content: "Operator workspace | Safari Pass" }, { property: "og:description", content: "Manage your verified Safari Pass operator account and vehicles." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <main className="min-h-screen bg-background p-8">Operator workspace</main>,
});