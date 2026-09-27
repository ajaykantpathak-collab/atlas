import type { ReactNode } from 'react';
import PWAProvider from '@/components/pwa/PWAProvider';
import StudentDock from '@/components/student/StudentDock';

/**
 * Student route-group layout.
 *
 * Owns PWA concerns for every student surface (galaxy, learn, practice,
 * offline pages): service-worker registration (versioned inside public/sw.js)
 * and the dismissable add-to-home-screen prompt. Pages still own their
 * full-height layout — the only shared chrome is StudentDock, the persistent
 * bottom navigation ([CHILD-LENS][P3 NO-GLOBAL-NAV]: /practice, /progress,
 * lessons and /diagnostic were mutually unreachable except via browser Back).
 */
export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <PWAProvider>
      {/* Dock clearance: StudentDock floats ~70px over the bottom of every
          student page; without this scroll room the last interactive element
          on a page (a start button, the last MCQ option) renders UNDER the
          dock and is unclickable — verified by synthetic-student testing. */}
      <div className="pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))]">
        {children}
      </div>
      <StudentDock />
    </PWAProvider>
  );
}
