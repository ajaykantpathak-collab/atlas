import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Pass-through layout: per-surface metadata only (P5 gap 1). */
export const metadata: Metadata = {
  title: "Practice",
  description: "Answer curriculum questions with instant, verified feedback.",
};

export default function PracticeLayout({ children }: { children: ReactNode }) {
  return children;
}
