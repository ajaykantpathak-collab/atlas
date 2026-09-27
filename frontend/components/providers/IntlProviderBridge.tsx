'use client';

/**
 * IntlProviderBridge — makes the EN/हिंदी toggle REAL.
 *
 * The locale lives in LanguageProvider (localStorage "app-locale", set by
 * components/LanguageSwitcher). next-intl needs locale + messages at the
 * provider, and the root layout is a server component — so this client
 * bridge picks the message bundle for the CURRENT locale and feeds it to
 * NextIntlClientProvider. Chrome strings translate; student-authored
 * corpus content is untouched (it stays in its authored language).
 *
 * Initial render is always EN on server AND client (no hydration drift);
 * the stored preference is applied in a LanguageProvider effect, exactly
 * like every other localStorage-backed preference in this app.
 */

import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import type { ReactNode } from 'react';
import enMessages from '@/messages/en.json';
import hiMessages from '@/messages/hi.json';
import { LanguageProvider, useLanguage } from '@/lib/i18n/LanguageProvider';

const MESSAGES = {
  en: enMessages,
  hi: hiMessages,
} as const;

function Bridge({ children }: { children: ReactNode }) {
  const { locale } = useLanguage();
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={MESSAGES[locale] as unknown as AbstractIntlMessages}
      timeZone="Asia/Kolkata"
    >
      {children}
    </NextIntlClientProvider>
  );
}

export default function IntlProviderBridge({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <Bridge>{children}</Bridge>
    </LanguageProvider>
  );
}
