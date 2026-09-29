import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Pass-through layout: per-surface metadata only (P5 gap 1). */
export const metadata: Metadata = {
  title: "Sandbox",
  description: "Interactive science and maths experiments — 3D worlds and parameter labs.",
};

export default function SandboxLayout({ children }: { children: ReactNode }) {
  return children;
}
