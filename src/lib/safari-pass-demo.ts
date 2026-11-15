export type DemoRoute = {
  code: string;
  origin: string;
  destination: string;
  duration: string;
  color: "green" | "teal" | "orange";
};

export type DemoPass = {
  id: string;
  name: string;
  journeys: number;
  totalJourneys: number;
  expires: string;
  color: "green" | "teal" | "orange";
};

export const DEMO_ROUTES: DemoRoute[] = [
  { code: "17", origin: "Nairobi CBD", destination: "Thika", duration: "55–75 min", color: "green" },
  { code: "44", origin: "Nairobi CBD", destination: "Juja", duration: "60–80 min", color: "teal" },
  { code: "N1", origin: "Ruiru", destination: "Nairobi CBD", duration: "45–65 min", color: "orange" },
];

export const DEMO_PASSES: DemoPass[] = [
  { id: "weekday", name: "Weekday commuter", journeys: 12, totalJourneys: 20, expires: "Valid for 18 more days", color: "green" },
  { id: "flex", name: "Flexible 10", journeys: 6, totalJourneys: 10, expires: "Valid for 11 more days", color: "teal" },
];

export type WalletActivity = { label: string; amountKes: number; date: string; status: string };
export const DEMO_WALLET: WalletActivity[] = [
  { label: "Demo top-up", amountKes: 500, date: "Today · 8:42 am", status: "Demonstration" },
  { label: "Route 17 · CBD to Thika", amountKes: -70, date: "Yesterday · 6:18 pm", status: "Demonstration" },
  { label: "Weekday commuter pass", amountKes: -1_400, date: "12 Nov · 9:05 am", status: "Demonstration" },
];

export function formatKes(amount: number): string {
  return new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(amount);
}

export function remainingRatio(remaining: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(1, Math.max(0, remaining / total));
}

export function isValidSupportMessage(subject: string, message: string): boolean {
  return subject.trim().length >= 3 && message.trim().length >= 10 && message.length <= 2000;
}
