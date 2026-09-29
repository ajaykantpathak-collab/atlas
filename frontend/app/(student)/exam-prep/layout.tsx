import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Pass-through layout: per-surface metadata only (P5 gap 1). */
export const metadata: Metadata = {
  title: "Exam Prep",
  description: "Full CBSE-pattern pre-board papers for classes 10 and 12, with a scored report.",
};

export default function ExamPrepLayout({ children }: { children: ReactNode }) {
  return children;
}
