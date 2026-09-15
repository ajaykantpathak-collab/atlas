import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from './request';

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,
  localePrefix: 'never',
});

export type Pathnames = Record<string, string>;
