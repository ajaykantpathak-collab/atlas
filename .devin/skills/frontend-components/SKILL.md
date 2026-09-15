---
name: frontend-components
description: Follow frontend patterns when creating Next.js pages and React components
allowed-tools:
  - read
  - write
  - edit
  - grep
  - glob
triggers:
  - model
---

# Frontend Component Patterns

## Architecture
- Next.js 14 App Router with TypeScript
- Tailwind CSS with custom design system (brand, accent, surface colors)
- Zustand for auth state, React Query for server state
- Premium components in `components/premium/`
- All pages use `'use client'` directive

## Service Layer Pattern
```typescript
// services/content.service.ts
import { api } from '@/lib/api'

export const contentService = {
  getSubjects: () => api.get<SubjectListResponse>('/api/content/subjects'),
  getKnowledgeGraph: () => api.get<KnowledgeGraphResponse>('/api/content/graph'),
}
```

## React Query Hook Pattern
```typescript
// hooks/useContent.ts
export function useSubjects() {
  return useQuery({ queryKey: ['subjects'], queryFn: contentService.getSubjects })
}
```

## Page Pattern
```typescript
'use client'
import { useSubjects } from '@/hooks/useContent'

export default function Page() {
  const { data, isLoading } = useSubjects()
  if (isLoading) return <PremiumLoader />
  return <div>...</div>
}
```

## Design System
- Glass morphism: `glass-card`, `glass-strong`
- Premium effects: TiltCard, GlowCard, Spotlight, BorderBeam
- Animations: ScrollReveal, StaggerContainer, TextReveal
- Colors: brand (indigo), accent (pink), surface (dark grays), gold, mint
- Fonts: Plus Jakarta Sans (body), Space Grotesk (display), JetBrains Mono (code)

## API Integration
- Base URL: `process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'`
- Auth token in localStorage as 'token'
- All API calls go through `lib/api.ts` wrapper
- Service modules in `services/` directory
- React Query hooks in `hooks/` directory
