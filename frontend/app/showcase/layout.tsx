import type { Metadata } from "next";
import type { ReactNode } from "react";

/** P5 gap 2 disposition (c): internal WebGL demo. Not product — kept out of
 *  search indexes and badged on-page so nothing pretends to be product. */
export const metadata: Metadata = {
  title: "Showcase — internal demo",
  robots: { index: false, follow: false },
};

export default function ShowcaseLayout({ children }: { children: ReactNode }) {
  return children;
}
