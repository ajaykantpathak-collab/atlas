import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Pass-through layout: per-surface metadata only (P5 gap 1). */
export const metadata: Metadata = {
  title: "Today",
  description: "One composed lesson unit for today, assembled from reviews and new material.",
};

export default function TodayLayout({ children }: { children: ReactNode }) {
  return children;
}
