import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Pass-through layout: per-surface metadata only (P5 gap 1). */
export const metadata: Metadata = {
  title: "Review",
  description: "A focused spaced-repetition session for the items due today.",
};

export default function ReviewLayout({ children }: { children: ReactNode }) {
  return children;
}
