'use client'

import { useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import {
  AtlasLogo, ATLAS_TOKENS, AtlasCard, AtlasButton, AtlasBadge,
  AtlasProgress, AtlasSkeleton, AtlasEmptyState,
} from '@/components/prism/AtlasDesignSystem'
import { AtlasLessonReader } from '@/components/prism/AtlasLessonReader'
import { AtlasSolver } from '@/components/prism/AtlasSolver'

// Lazy load 3D components (Three.js is heavy) — these use default exports
const AtlasHero3D = lazy(() => import('@/components/prism/AtlasHero3D'))
const AtlasGrowingWorld = lazy(() => import('@/components/prism/AtlasGrowingWorld'))
const AtlasMobileApp = lazy(() => import('@/components/prism/AtlasMobileAndMore'))

const SECTIONS = [
  { id: 'hero3d', label: '3D Hero' },
  { id: 'logo', label: 'Logo' },
  { id: 'growing', label: 'Growing' },
  { id: 'lesson', label: 'Lesson' },
  { id: 'solver', label: 'Solver' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'uikit', label: 'UI Kit' },
]

const TAB_STYLE: React.CSSProperties = {
  padding: '6px 14px', borderRadius: 8, fontSize: 13, border: 'none', cursor: 'pointer',
  transition: 'all 0.2s',
}

function LoadingFallback({ label }: { label: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '70vh', color: ATLAS_TOKENS.text.secondary, fontSize: 16,
    }}>
      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}>
        Loading {label}...
      </motion.div>
    </div>
  )
}

export default function AtlasV2Preview() {
  const [active, setActive] = useState('hero3d')

  return (
    <div style={{
      background: ATLAS_TOKENS.surface.void,
      color: ATLAS_TOKENS.text.primary,
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
      minHeight: '100vh',
    }}>
      {/* NAV */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 24px',
        borderBottom: `1px solid ${ATLAS_TOKENS.border.subtle}`,
        backdropFilter: 'blur(20px)',
        background: 'rgba(6,6,15,0.8)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <AtlasLogo size={36} variant="wordmark" />
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                ...TAB_STYLE,
                background: active === s.id ? 'rgba(245,166,35,0.15)' : 'transparent',
                color: active === s.id ? ATLAS_TOKENS.brand.gold : ATLAS_TOKENS.text.secondary,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      {/* CONTENT — keep all sections mounted, hide non-active to preserve WebGL context */}
      <div>
          {/* 3D HERO */}
          <section style={{ position: 'relative', height: '90vh', display: active === 'hero3d' ? 'block' : 'none' }}>
            <Suspense fallback={<LoadingFallback label="3D World" />}>
              <AtlasHero3D onEnter={() => {}} />
            </Suspense>
          </section>

          {/* LOGO */}
          <section style={{ padding: '60px 24px', maxWidth: 1200, margin: '0 auto', display: active === 'logo' ? 'block' : 'none' }}>
            <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 8 }}>The Atlas Logo</h1>
            <p style={{ color: ATLAS_TOKENS.text.secondary, marginBottom: 48 }}>A living compass — your map to mastery</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 48, alignItems: 'center' }}>
              <div>
                <p style={{ color: ATLAS_TOKENS.text.tertiary, marginBottom: 8, fontSize: 13 }}>Mark (48px)</p>
                <AtlasLogo size={48} variant="mark" />
              </div>
              <div>
                <p style={{ color: ATLAS_TOKENS.text.tertiary, marginBottom: 8, fontSize: 13 }}>Wordmark</p>
                <AtlasLogo size={40} variant="wordmark" />
              </div>
              <div>
                <p style={{ color: ATLAS_TOKENS.text.tertiary, marginBottom: 8, fontSize: 13 }}>Hero (200px)</p>
                <AtlasLogo size={200} variant="hero" />
              </div>
              <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end' }}>
                <div>
                  <p style={{ color: ATLAS_TOKENS.text.tertiary, marginBottom: 8, fontSize: 13 }}>24px</p>
                  <AtlasLogo size={24} variant="mark" />
                </div>
                <div>
                  <p style={{ color: ATLAS_TOKENS.text.tertiary, marginBottom: 8, fontSize: 13 }}>32px</p>
                  <AtlasLogo size={32} variant="mark" />
                </div>
                <div>
                  <p style={{ color: ATLAS_TOKENS.text.tertiary, marginBottom: 8, fontSize: 13 }}>64px</p>
                  <AtlasLogo size={64} variant="mark" />
                </div>
                <div>
                  <p style={{ color: ATLAS_TOKENS.text.tertiary, marginBottom: 8, fontSize: 13 }}>96px</p>
                  <AtlasLogo size={96} variant="mark" />
                </div>
              </div>
            </div>
          </section>

          {/* GROWING WORLD */}
          <section style={{ position: 'relative', height: '90vh', display: active === 'growing' ? 'block' : 'none' }}>
            <Suspense fallback={<LoadingFallback label="Growing World" />}>
              <AtlasGrowingWorld
                mastery={{ physics: 0.8, chemistry: 0.5, biology: 0.3, mathematics: 0.9, english: 0.6, hindi: 0.4 }}
                achievements={[
                  { id: '1', title: 'First Steps', tier: 'bronze', unlocked: true },
                  { id: '2', title: 'Quadratic Master', tier: 'silver', unlocked: true },
                  { id: '3', title: 'Calculus Champion', tier: 'gold', unlocked: false },
                ]}
                totalXp={2450}
                level={25}
              />
            </Suspense>
          </section>

          {/* LESSON READER */}
          <section style={{ padding: '40px 24px', display: active === 'lesson' ? 'block' : 'none' }}>
            <AtlasLessonReader
              lesson={{
                node_id: 'c10_math_001',
                title: 'GST — Computation of Tax on Basic/Cost Price',
                intro_paragraph: 'GST (Goods and Services Tax) is a comprehensive indirect tax levied on the manufacture, sale, and consumption of goods and services in India.',
                sections: [
                  {
                    section_id: 's1', heading: 'Understanding GST', order: 1,
                    content_markdown: 'GST is calculated as a percentage of the **basic price** of goods or services. The rate varies by category (5%, 12%, 18%, 28%).\n\n$$GST = (Rate * Basic Price) / 100$$\n\n- 5%: Essential goods\n- 12%: Standard rate\n- 18%: Most goods and services\n- 28%: Luxury items',
                    worked_examples: [{ question: 'Find GST on Rs 5000 at 18%', solution: 'Rs 900', steps: ['GST = (18 * 5000) / 100', 'GST = 90000 / 100', 'GST = Rs 900'] }],
                  },
                  {
                    section_id: 's2', heading: 'Total Price Calculation', order: 2,
                    content_markdown: 'Total price = Basic Price + GST.\n\n$$Total = P + (R * P / 100) = P * (1 + R/100)$$\n\n1. Calculate GST amount\n2. Add GST to basic price\n3. Round to nearest rupee',
                    worked_examples: [{ question: 'Total price for Rs 5000 at 18% GST', solution: 'Rs 5900', steps: ['Total = 5000 + 900', 'Total = Rs 5900'] }],
                  },
                ],
                summary_notes: ['GST = (Rate * Basic Price) / 100', 'Total = Basic Price + GST', 'GST rates: 5%, 12%, 18%, 28%'],
                related_nodes: [{ node_id: 'c10_math_002', title: 'Profit and Loss', subject: 'maths' }],
              }}
            />
          </section>

          {/* SOLVER */}
          <section style={{ padding: '40px 24px', display: active === 'solver' ? 'block' : 'none' }}>
            <AtlasSolver subject="maths" classLevel={10} onSolve={async () => ({
              problem_type: 'derivative',
              steps: [
                { step_number: 1, title: 'Identify', description: 'd/dx(x^2)', result: '2x', verified: true },
              ],
              final_answer: '2x', verified: true,
            })} />
          </section>

          {/* MOBILE + MORE */}
          <section style={{ padding: '40px 24px', display: active === 'mobile' ? 'block' : 'none' }}>
            <Suspense fallback={<LoadingFallback label="Mobile App" />}>
              <AtlasMobileApp />
            </Suspense>
          </section>

          {/* UI KIT */}
          <section style={{ padding: '40px 24px', maxWidth: 1200, margin: '0 auto', display: active === 'uikit' ? 'block' : 'none' }}>
            <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 48 }}>Atlas UI Kit</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Buttons</h3>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <AtlasButton variant="primary">Primary</AtlasButton>
                  <AtlasButton variant="secondary">Secondary</AtlasButton>
                  <AtlasButton variant="ghost">Ghost</AtlasButton>
                  <AtlasButton variant="primary" size="sm">Small</AtlasButton>
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Cards</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                  <AtlasCard header={<span style={{ fontWeight: 600 }}>Topic 1</span>} hoverable>Content here</AtlasCard>
                  <AtlasCard header={<span style={{ fontWeight: 600 }}>Topic 2</span>} hoverable>More content</AtlasCard>
                  <AtlasCard header={<span style={{ fontWeight: 600 }}>Topic 3</span>} hoverable>Even more</AtlasCard>
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Badges</h3>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <AtlasBadge label="Physics" variant="subject" color={ATLAS_TOKENS.subjects.physics.core} />
                  <AtlasBadge label="Chemistry" variant="subject" color={ATLAS_TOKENS.subjects.chemistry.core} />
                  <AtlasBadge label="Mastered" variant="mastery" />
                  <AtlasBadge label="7 day streak" variant="streak" />
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Progress</h3>
                <AtlasProgress value={75} showValue label="Mastery" />
              </div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Skeleton</h3>
                <AtlasSkeleton variant="card" />
              </div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Empty State</h3>
                <AtlasEmptyState title="No topics yet" description="Start your journey" action={<AtlasButton variant="primary" size="sm">Browse</AtlasButton>} />
              </div>
            </div>
          </section>
      </div>
    </div>
  )
}
