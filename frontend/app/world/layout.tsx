import type { Metadata } from "next";
import type { ReactNode } from "react";

/** P5 gap 2 disposition (c): decorative "Living World" demo. Not product —
 *  noindex + on-page badge (see components/InternalDemoBadge). */
export const metadata: Metadata = {
  title: "World — internal demo",
  robots: { index: false, follow: false },
};

export default function WorldLayout({ children }: { children: ReactNode }) {
  return children;
}
