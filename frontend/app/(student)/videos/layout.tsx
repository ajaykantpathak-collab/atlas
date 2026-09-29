import type { Metadata } from "next";
import type { ReactNode } from "react";

/** P5 gap 2 disposition (c): hardcoded demo video list — no video backend
 *  exists. noindex + on-page badge so the fabricated catalogue never
 *  masquerades as product. */
export const metadata: Metadata = {
  title: "Videos — internal demo",
  robots: { index: false, follow: false },
};

export default function VideosLayout({ children }: { children: ReactNode }) {
  return children;
}
