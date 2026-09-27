'use client'

/**
 * Brand shim — the Atlas mark and the real 9,099-node galaxy.
 *
 * `PrismLogo` / `PrismCardGraph` / `PrismGlow` are kept as aliases so every
 * existing import gets the Atlas identity without touching call sites.
 */
import { AtlasMark } from '@/components/atlas/AtlasMark'
import { AtlasGalaxy } from '@/components/atlas/AtlasGalaxy'

export function PrismLogo({ size = 36, className = '' }: { size?: number; className?: string }) {
  return <AtlasMark size={size} className={className} />
}

/** Card-sized real galaxy (auth panels, feature cards). */
export function PrismCardGraph({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-[400px] h-[300px] ${className}`}>
      <AtlasGalaxy compact maxNodes={1500} className="absolute inset-0 w-full h-full" />
    </div>
  )
}

/** Logo + "Atlas" wordmark for nav bars. */
export function PrismWordmark({ className = '' }: { className?: string }) {
  return <AtlasMark size={32} wordmark className={className} />
}

/** Ambient glow with the mini galaxy inside. */
export function PrismGlow({ size = 80, intensity = 1, className = '' }: { size?: number; intensity?: number; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(251,191,36,${0.35 * intensity}) 0%, rgba(139,92,246,${0.15 * intensity}) 50%, transparent 70%)`,
          filter: 'blur(8px)',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <AtlasMark size={size * 0.85} />
      </div>
    </div>
  )
}
