import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Pass-through layout: per-surface metadata only (P5 gap 1). The page
 *  is a client component and cannot export metadata itself. */
export const metadata: Metadata = {
  title: "Learn",
  description: "Browse the syllabus by subject and open any concept's lesson.",
};

export default function LearnLayout({ children }: { children: ReactNode }) {
  return children;
}
