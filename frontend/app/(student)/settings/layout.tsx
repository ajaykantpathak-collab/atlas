import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Pass-through layout: per-surface metadata only (P5 gap 1). */
export const metadata: Metadata = {
  title: "Settings",
  description: "Language, appearance, accessibility and account controls.",
};

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return children;
}
