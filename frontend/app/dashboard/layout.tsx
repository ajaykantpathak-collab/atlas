import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Pass-through layout: per-surface metadata only (P5 gap 1). */
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your command center — mastery, activity, and today's one mission.",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return children;
}
