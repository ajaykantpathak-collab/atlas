import type { Metadata } from "next";
import type { ReactNode } from "react";

/** P5 gap 2 disposition (c): challenge mock — "Run Code" does a static
 *  construct check, not real execution; no execution backend. noindex +
 *  on-page badge. */
export const metadata: Metadata = {
  title: "Coding Playground — internal demo",
  robots: { index: false, follow: false },
};

export default function CodingPlaygroundLayout({ children }: { children: ReactNode }) {
  return children;
}
