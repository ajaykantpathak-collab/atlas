'use client';

import { useTranslations as useNextIntlTranslations } from 'next-intl';

/**
 * Wrapper around next-intl's useTranslations for type safety.
 * Usage: const t = useTranslations('learn'); t('title')
 */
export function useTranslations(namespace?: string) {
  return useNextIntlTranslations(namespace);
}
