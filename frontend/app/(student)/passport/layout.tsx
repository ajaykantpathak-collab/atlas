import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Pass-through layout: per-surface metadata only (P5 gap 1). */
export const metadata: Metadata = {
  title: "Mastery Passport",
  description: "Your subject-by-subject mastery transcript, from real attempts only.",
};

export default function PassportLayout({ children }: { children: ReactNode }) {
  return children;
}
