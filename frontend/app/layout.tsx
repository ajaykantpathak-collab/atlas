import type { Metadata } from "next";
import "./globals.css";
import QueryClientWrapper from "@/components/QueryClientWrapper";
import { NextIntlClientProvider } from "next-intl";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import enMessages from "@/messages/en.json";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Atlas — Every answer verified, never guessed | CBSE · ICSE · ISC",
  description:
    "Atlas maps your entire syllabus as a living galaxy — interactive simulations, verified step-by-step solutions, per-concept mastery and board-pattern exams for Classes 1–12 across CBSE, ICSE & ISC.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = "en";
  const messages = enMessages;

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-gray-50">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
              if(localStorage.getItem('sw-purged')) return;
              localStorage.setItem('sw-purged','1');
              if('serviceWorker' in navigator){
                navigator.serviceWorker.getRegistrations().then(function(rs){
                  rs.forEach(function(r){ r.unregister(); });
                });
              }
              if(window.caches && caches.keys){
                caches.keys().then(function(ks){ ks.forEach(function(k){ caches.delete(k); }); });
              }
            }catch(e){}})();`,
          }}
        />
        <a href="#main-content" className="skip-link">Skip to content</a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LanguageProvider>
            <QueryClientWrapper>{children}</QueryClientWrapper>
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
