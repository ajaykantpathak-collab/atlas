'use client'

import { motion } from 'framer-motion'

/**
 * ConceptAnimations — small animated SVG/CSS diagrams that teach real concepts.
 * These are NOT decorative. Each one visually demonstrates a real physics/math/bio concept.
 * Lightweight — pure SVG + Framer Motion, no Three.js.
 */

// 1. Projectile Motion — a ball arcs through the air showing trajectory
export function ProjectileMotion() {
  return (
    <div className="relative w-full h-32 rounded-2xl bg-surface-200/30 border border-surface-300/20 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 300 120">
        {/* Ground line */}
        <line x1="0" y1="110" x2="300" y2="110" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {/* Dotted trajectory path */}
        <path
          d="M 20 100 Q 150 -20 280 100"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeDasharray="3 4"
          opacity="0.4"
        />
        {/* Angle indicator */}
        <path d="M 20 100 L 50 70" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <text x="55" y="75" fill="rgba(255,255,255,0.3)" fontSize="9">45°</text>
        {/* Animated ball */}
        <motion.circle
          r="5"
          fill="#38BDF8"
          initial={{ cx: 20, cy: 100 }}
          animate={{ cx: [20, 280], cy: [100, 30, 100] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 6px #38BDF8)' }}
        />
        {/* Labels */}
        <text x="10" y="118" fill="rgba(255,255,255,0.3)" fontSize="8">v₀</text>
        <text x="140" y="20" fill="#38BDF8" fontSize="9" opacity="0.6">Trajectory</text>
      </svg>
      <div className="absolute bottom-1 left-2 text-[10px] text-surface-600">Projectile Motion</div>
    </div>
  )
}

// 2. DNA Helix — rotating double helix
export function DNAHelix() {
  const points = Array.from({ length: 12 }, (_, i) => i)
  return (
    <div className="relative w-full h-32 rounded-2xl bg-surface-200/30 border border-surface-300/20 overflow-hidden flex items-center justify-center">
      <svg className="h-full" viewBox="0 0 100 120">
        {points.map((i) => {
          const y = 10 + i * 9
          const phase = i * 0.6
          return (
            <motion.g key={i} animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
              <motion.circle
                cx="50"
                cy={y}
                r="3"
                fill="#FB7185"
                animate={{ cx: [50 + 20 * Math.cos(phase), 50 - 20 * Math.cos(phase), 50 + 20 * Math.cos(phase)] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 0 3px #FB7185)' }}
              />
              <motion.circle
                cx="50"
                cy={y}
                r="3"
                fill="#A78BFA"
                animate={{ cx: [50 - 20 * Math.cos(phase), 50 + 20 * Math.cos(phase), 50 - 20 * Math.cos(phase)] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 0 3px #A78BFA)' }}
              />
              <motion.line
                x1="50"
                y1={y}
                x2="50"
                y2={y}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
                animate={{
                  x1: [50 + 20 * Math.cos(phase), 50 - 20 * Math.cos(phase), 50 + 20 * Math.cos(phase)],
                  x2: [50 - 20 * Math.cos(phase), 50 + 20 * Math.cos(phase), 50 - 20 * Math.cos(phase)],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.g>
          )
        })}
      </svg>
      <div className="absolute bottom-1 left-2 text-[10px] text-surface-600">DNA Double Helix</div>
    </div>
  )
}

// 3. Quadratic Curve — draws a parabola with the formula
export function QuadraticCurve() {
  return (
    <div className="relative w-full h-32 rounded-2xl bg-surface-200/30 border border-surface-300/20 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 300 120">
        {/* Axes */}
        <line x1="150" y1="10" x2="150" y2="110" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="10" y1="60" x2="290" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {/* Parabola path */}
        <motion.path
          d="M 30 100 Q 150 -40 270 100"
          fill="none"
          stroke="#A78BFA"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 4px #A78BFA)' }}
        />
        {/* Vertex point */}
        <motion.circle
          cx="150"
          cy="20"
          r="3"
          fill="#A78BFA"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Formula */}
        <text x="160" y="25" fill="#A78BFA" fontSize="10" opacity="0.7">y = ax²</text>
        <text x="5" y="118" fill="rgba(255,255,255,0.3)" fontSize="8">x</text>
        <text x="155" y="15" fill="rgba(255,255,255,0.3)" fontSize="8">y</text>
      </svg>
      <div className="absolute bottom-1 left-2 text-[10px] text-surface-600">Quadratic Function</div>
    </div>
  )
}

// 4. Molecule Formation — atoms coming together to form a bond
export function MoleculeFormation() {
  return (
    <div className="relative w-full h-32 rounded-2xl bg-surface-200/30 border border-surface-300/20 overflow-hidden flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 300 120">
        {/* H₂O molecule */}
        {/* Oxygen center */}
        <motion.circle
          cx="150"
          cy="60"
          r="12"
          fill="#4ADE80"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ filter: 'drop-shadow(0 0 8px #4ADE80)' }}
        />
        <text x="146" y="64" fill="#0A0A0F" fontSize="9" fontWeight="bold">O</text>
        {/* Hydrogen 1 — left */}
        <motion.circle
          cx="110"
          cy="60"
          r="8"
          fill="#38BDF8"
          animate={{ cx: [90, 110, 110], opacity: [0, 1, 1] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          style={{ filter: 'drop-shadow(0 0 6px #38BDF8)' }}
        />
        <text x="107" y="63" fill="#0A0A0F" fontSize="7" fontWeight="bold">H</text>
        {/* Hydrogen 2 — right */}
        <motion.circle
          cx="190"
          cy="60"
          r="8"
          fill="#38BDF8"
          animate={{ cx: [210, 190, 190], opacity: [0, 1, 1] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          style={{ filter: 'drop-shadow(0 0 6px #38BDF8)' }}
        />
        <text x="187" y="63" fill="#0A0A0F" fontSize="7" fontWeight="bold">H</text>
        {/* Bonds */}
        <motion.line
          x1="118" y1="60" x2="138" y2="60"
          stroke="rgba(255,255,255,0.3)" strokeWidth="2"
          animate={{ opacity: [0, 0.5, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.line
          x1="162" y1="60" x2="182" y2="60"
          stroke="rgba(255,255,255,0.3)" strokeWidth="2"
          animate={{ opacity: [0, 0.5, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
        />
        <text x="125" y="85" fill="rgba(255,255,255,0.3)" fontSize="8">H₂O</text>
      </svg>
      <div className="absolute bottom-1 left-2 text-[10px] text-surface-600">Molecule Formation</div>
    </div>
  )
}

// 5. Code Execution — a code snippet typing out with output
export function CodeExecution() {
  return (
    <div className="relative w-full h-32 rounded-2xl bg-surface-200/30 border border-surface-300/20 overflow-hidden font-mono">
      <div className="p-3 text-[10px] leading-relaxed">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#22D3EE]"
        >
          <span className="text-surface-600">1</span> def fibonacci(n):
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-[#22D3EE]"
        >
          <span className="text-surface-600">2</span>{'  '}if n {'<'}= 1: return n
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-[#22D3EE]"
        >
          <span className="text-surface-600">3</span>{'  '}return fib(n-1) + fib(n-2)
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-surface-600"
        >
          <span className="text-surface-600">4</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-[#4ADE80]"
        >
          {'>>> '}fibonacci(10)
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.3] }}
          transition={{ delay: 2.0, duration: 1, repeat: Infinity }}
          className="text-white"
        >
          55
        </motion.div>
      </div>
      <div className="absolute bottom-1 left-2 text-[10px] text-surface-600 font-sans">Code Execution</div>
    </div>
  )
}

// 6. Water Cycle — animated rain, evaporation, clouds
export function WaterCycle() {
  return (
    <div className="relative w-full h-32 rounded-2xl bg-surface-200/30 border border-surface-300/20 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 300 120">
        {/* Sun */}
        <motion.circle cx="40" cy="25" r="8" fill="#FFD700"
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }}
          style={{ filter: 'drop-shadow(0 0 8px #FFD700)' }}
        />
        {/* Cloud */}
        <motion.ellipse cx="200" cy="30" rx="35" ry="12" fill="rgba(255,255,255,0.15)"
          animate={{ x: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Rain drops */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.line key={i}
            x1={180 + i * 12} y1="45" x2={180 + i * 12} y2="50"
            stroke="#38BDF8" strokeWidth="1.5"
            animate={{ y1: [45, 90], y2: [50, 95], opacity: [1, 0] }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, ease: 'easeIn' }}
          />
        ))}
        {/* Ocean */}
        <path d="M 0 95 Q 75 88 150 95 T 300 95 L 300 120 L 0 120 Z" fill="rgba(0,191,255,0.15)" />
        {/* Evaporation arrows */}
        {[0, 1, 2].map((i) => (
          <motion.path key={i}
            d={`M ${100 + i * 30} 90 L ${100 + i * 30} 60`}
            stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
          />
        ))}
        <text x="130" y="115" fill="rgba(255,255,255,0.2)" fontSize="7">Evaporation</text>
      </svg>
      <div className="absolute bottom-1 left-2 text-[10px] text-surface-600">Water Cycle</div>
    </div>
  )
}

// Grid of all concept animations
export function ConceptAnimationGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      <ProjectileMotion />
      <DNAHelix />
      <QuadraticCurve />
      <MoleculeFormation />
      <CodeExecution />
      <WaterCycle />
    </div>
  )
}
