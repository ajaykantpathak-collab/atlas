import type { Metadata } from "next";
import type { ReactNode } from "react";

/** P5 gap 2 disposition (c): fabricated social-groups mock — no social
 *  backend exists. noindex + on-page badge. */
export const metadata: Metadata = {
  title: "Study Groups — internal demo",
  robots: { index: false, follow: false },
};

export default function StudyGroupsLayout({ children }: { children: ReactNode }) {
  return children;
}
