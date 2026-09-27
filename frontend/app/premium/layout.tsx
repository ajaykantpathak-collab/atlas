import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import '../premium.css'
import { QueryProvider } from '@/components/providers/QueryProvider'
import PWAProvider from '@/components/pwa/PWAProvider'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Atlas Premium — AI Learning Companion',
  description: 'Premium AI-powered personalized learning for CBSE & CISCE students with 3D graphics, WebGL shaders, and adaptive intelligence.',
}

// Nested layout: must NOT render <html>/<body> — the root layout owns the
// document. Rendering a second document here caused a body-className
// hydration mismatch warning on every /premium page (server rendered the
// root body classes, client expected this layout's `font-sans` body).
// Font CSS variables are inherited, so the wrapper div below covers the
// whole premium subtree.
export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryProvider>
      {/* PWAProvider: /premium hosts the real offline library page — the SW
          must be registered here too, with the same idempotent guard. */}
      <PWAProvider>
        <div
          className={`font-sans min-h-screen ${jakarta.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
        >
          {children}
        </div>
      </PWAProvider>
    </QueryProvider>
  )
}
