/**
 * Discovery shared subject metadata — icon + brand color for every subject
 * key that appears in the live data:
 *
 *   - GET /api/tutor-graph/stats → "subjects" dict keys (lowercase, e.g.
 *     "social_science")  — used by the Atlas subject strip
 *   - GET /api/content/search  → per-node "subject" display names (e.g.
 *     "Social Science")  — used by the live topics dropdown
 *
 * One lookup normalizes both shapes (lowercase + underscores→spaces).
 */
import {
  Atom, BookOpen, Brain, Briefcase, Calculator, Cpu, Dna, FlaskConical,
  Home, Landmark, Languages, Leaf, MapPin, Scale, Sigma, TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { friendlyNodeTitle } from '@/lib/nodeTitle'

export type SubjectMeta = { icon: LucideIcon; color: string }

const SUBJECT_META: Record<string, SubjectMeta> = {
  physics: { icon: Atom, color: '#38BDF8' },
  chemistry: { icon: FlaskConical, color: '#FBBF24' },
  maths: { icon: Sigma, color: '#A78BFA' },
  mathematics: { icon: Calculator, color: '#A78BFA' },
  'applied maths': { icon: Sigma, color: '#A78BFA' },
  science: { icon: FlaskConical, color: '#38BDF8' },
  biology: { icon: Leaf, color: '#FB7185' },
  biotechnology: { icon: Dna, color: '#4ADE80' },
  english: { icon: BookOpen, color: '#F87171' },
  hindi: { icon: Languages, color: '#FB923C' },
  'social science': { icon: MapPin, color: '#A78BFA' },
  history: { icon: Landmark, color: '#F87171' },
  geography: { icon: MapPin, color: '#34D399' },
  economics: { icon: TrendingUp, color: '#34D399' },
  accountancy: { icon: Calculator, color: '#38BDF8' },
  'business studies': { icon: Briefcase, color: '#FBBF24' },
  'political science': { icon: Scale, color: '#F87171' },
  psychology: { icon: Brain, color: '#A78BFA' },
  sociology: { icon: Users, color: '#38BDF8' },
  'computer science': { icon: Cpu, color: '#38BDF8' },
  'informatics practices': { icon: Cpu, color: '#A78BFA' },
  'home science': { icon: Home, color: '#FB923C' },
}

export function subjectMeta(subject: string): SubjectMeta {
  return (
    SUBJECT_META[subject.toLowerCase().replace(/_/g, ' ')] ?? {
      icon: BookOpen,
      color: '#94A3B8',
    }
  )
}

/**
 * friendlyNodeTitle with the raw-id fallback guarded OFF: returns the
 * structured "Class 7 · Biology · Chapter 3 · Topic 4" form, or null when
 * the id matched no known shape — a humanized raw id ("C10 phy cbse 01
 * 001") must never reach the screen.
 */
export function prettyNodeTitle(nodeId: string): string | null {
  const title = friendlyNodeTitle(nodeId)
  return title.includes('·') ? title : null
}
