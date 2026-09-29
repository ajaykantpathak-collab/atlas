import type { Metadata } from "next";
import type { ReactNode } from "react";

/** P5 gap 2 disposition (c): hardcoded cognitive-skills mock — no backend.
 *  noindex + on-page badge. */
export const metadata: Metadata = {
  title: "Cognitive — internal demo",
  robots: { index: false, follow: false },
};

export default function CognitiveLayout({ children }: { children: ReactNode }) {
  return children;
}
