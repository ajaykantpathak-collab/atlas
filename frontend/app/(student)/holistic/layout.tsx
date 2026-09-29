import type { Metadata } from "next";
import type { ReactNode } from "react";

/** P5 gap 2 disposition (c): hardcoded wellness mock — no backend. noindex
 *  + on-page badge. */
export const metadata: Metadata = {
  title: "Holistic — internal demo",
  robots: { index: false, follow: false },
};

export default function HolisticLayout({ children }: { children: ReactNode }) {
  return children;
}
