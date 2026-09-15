'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Stage, Layer, Rect, Line, Circle, Text, Group } from 'react-konva'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, CheckCircle2, Target, Lightbulb } from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════════════════
   LeverSimulation — Guided discovery, not a sandbox.

   The student works through 3 challenges, each teaching a specific concept:

   Challenge 1: "Balance equal weights" → teaches EQUILIBRIUM
     - Load = 4N, Effort = 4N, fulcrum in the middle
     - Lesson: When forces are equal AND distances are equal, it balances.
     - This is the principle of moments in its simplest form.

   Challenge 2: "Balance unequal weights" → teaches the TRADE-OFF
     - Load = 8N, Effort = 2N (locked)
     - Student must move the fulcrum to balance
     - Lesson: A small force far away balances a big force close up.
     - This is WHY levers work — you trade distance for force.

   Challenge 3: "Lift 10N with only 2N" → teaches MECHANICAL ADVANTAGE
     - Load = 10N, Effort adjustable but capped at 2N
     - Student must find the right fulcrum position
     - Lesson: MA = Load/Effort = 5. The effort arm must be 5× the load arm.
     - This is the practical application — how engineers design tools.

   After each challenge, the tutor explains what they just learned.
   ═══════════════════════════════════════════════════════════════════════════ */

interface LeverSimulationProps {
  onComplete?: () => void
  className?: string
}

const BEAM_LENGTH = 320
const BEAM_Y = 160
const STAGE_W = 400
const STAGE_H = 280

interface Challenge {
  id: number
  title: string
  goal: string
  hint: string
  lesson: string
  loadFixed: boolean
  loadValue: number
  effortFixed: boolean
  effortValue: number
  effortMax?: number
  startFulcrum: number
}

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: 'Challenge 1: Balance It',
    goal: 'The beam is tilted. Move the fulcrum to make it balance.',
    hint: 'Both weights are equal (4N). Where should the fulcrum be for equal weights to balance?',
    lesson: 'When forces are EQUAL, they balance only when the fulcrum is exactly in the MIDDLE. This is equilibrium — clockwise moment = anticlockwise moment. 4N × distance = 4N × distance, so distances must be equal.',
    loadFixed: true,
    loadValue: 4,
    effortFixed: true,
    effortValue: 4,
    startFulcrum: 0.3, // starts off-center so beam is tilted
  },
  {
    id: 2,
    title: 'Challenge 2: Heavy Load, Light Effort',
    goal: 'The load is 8N but you only have 2N of effort. Find the fulcrum position that balances.',
    hint: '8N is 4× heavier than 2N. So the 2N force needs to be 4× FURTHER from the fulcrum. Move the fulcrum close to the heavy load.',
    lesson: 'A small force FAR from the pivot balances a big force CLOSE to it. This is the whole idea behind a lever — you trade distance for force. 8N × 1 unit = 2N × 4 units. Both moments are 8 N·m.',
    loadFixed: true,
    loadValue: 8,
    effortFixed: true,
    effortValue: 2,
    startFulcrum: 0.5,
  },
  {
    id: 3,
    title: 'Challenge 3: Lift 10N with 2N',
    goal: 'You need to lift 10N but can only push with 2N. Adjust the fulcrum AND the effort to balance.',
    hint: 'MA = Load/Effort = 10/2 = 5. The effort arm must be 5× the load arm. Move the fulcrum very close to the load.',
    lesson: 'Mechanical Advantage = Load ÷ Effort = 10 ÷ 2 = 5. You multiplied your force 5 times! This is why a crowbar can lift a stone your hands can\'t. Engineers design tools so the effort arm is much longer than the load arm.',
    loadFixed: true,
    loadValue: 10,
    effortFixed: false,
    effortValue: 2,
    effortMax: 2,
    startFulcrum: 0.5,
  },
]

export function LeverSimulation({ onComplete, className }: LeverSimulationProps) {
  const [challengeIdx, setChallengeIdx] = useState(0)
  const [fulcrumFrac, setFulcrumFrac] = useState(CHALLENGES[0].startFulcrum)
  const [load, setLoad] = useState(CHALLENGES[0].loadValue)
  const [effort, setEffort] = useState(CHALLENGES[0].effortValue)
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(new Set())
  const [showHint, setShowHint] = useState(false)
  const [showLesson, setShowLesson] = useState(false)

  const challenge = CHALLENGES[challengeIdx]

  // ─── Physics ─────────────────────────────────────────────────────────────
  const fulcrumX = 40 + fulcrumFrac * BEAM_LENGTH
  const loadArm = fulcrumFrac
  const effortArm = 1 - fulcrumFrac
  const acwMoment = load * loadArm
  const cwMoment = effort * effortArm
  const netMoment = cwMoment - acwMoment
  const isBalanced = Math.abs(netMoment) < 0.05

  const maxTilt = 15
  const tiltDeg = Math.max(-maxTilt, Math.min(maxTilt, netMoment * 4))
  const tiltRad = (tiltDeg * Math.PI) / 180
  const ma = effort > 0 ? load / effort : 0

  // ─── Drag fulcrum ────────────────────────────────────────────────────────
  const stageRef = useRef<any>(null)
  const draggingFulcrum = useRef(false)

  const handleStageMouseMove = useCallback(() => {
    if (!draggingFulcrum.current || !stageRef.current) return
    const pos = stageRef.current.getPointerPosition()
    if (!pos) return
    const frac = (pos.x - 40) / BEAM_LENGTH
    setFulcrumFrac(Math.max(0.05, Math.min(0.95, frac)))
  }, [])

  const handleStageMouseUp = useCallback(() => {
    draggingFulcrum.current = false
  }, [])

  const handleFulcrumMouseDown = useCallback(() => {
    draggingFulcrum.current = true
  }, [])

  // ─── Challenge completion ────────────────────────────────────────────────
  useEffect(() => {
    if (isBalanced && !completedChallenges.has(challenge.id)) {
      const newCompleted = new Set(completedChallenges)
      newCompleted.add(challenge.id)
      setCompletedChallenges(newCompleted)
      setShowLesson(true)
    }
  }, [isBalanced, challenge.id, completedChallenges])

  // ─── Next challenge ──────────────────────────────────────────────────────
  const handleNextChallenge = useCallback(() => {
    const nextIdx = challengeIdx + 1
    if (nextIdx < CHALLENGES.length) {
      const next = CHALLENGES[nextIdx]
      setChallengeIdx(nextIdx)
      setFulcrumFrac(next.startFulcrum)
      setLoad(next.loadValue)
      setEffort(next.effortValue)
      setShowHint(false)
      setShowLesson(false)
    } else if (onComplete) {
      onComplete()
    }
  }, [challengeIdx, onComplete])

  // ─── Reset current challenge ─────────────────────────────────────────────
  const handleReset = useCallback(() => {
    setFulcrumFrac(challenge.startFulcrum)
    setLoad(challenge.loadValue)
    setEffort(challenge.effortValue)
    setShowHint(false)
    setShowLesson(false)
    setCompletedChallenges(prev => {
      const next = new Set(prev)
      next.delete(challenge.id)
      return next
    })
  }, [challenge])

  // ─── Beam endpoints ──────────────────────────────────────────────────────
  const beamLeftX = fulcrumX - fulcrumFrac * BEAM_LENGTH
  const beamRightX = fulcrumX + (1 - fulcrumFrac) * BEAM_LENGTH
  const cos = Math.cos(tiltRad)
  const sin = Math.sin(tiltRad)
  const leftDx = beamLeftX - fulcrumX
  const leftEndX = fulcrumX + leftDx * cos
  const leftEndY = BEAM_Y + leftDx * sin
  const rightDx = beamRightX - fulcrumX
  const rightEndX = fulcrumX + rightDx * cos
  const rightEndY = BEAM_Y + rightDx * sin

  const allDone = completedChallenges.size === CHALLENGES.length

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className={`rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-white/10 overflow-hidden ${className || ''}`}>
      {/* Header with challenge progress */}
      <div className="px-4 py-3 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target size={14} className="text-amber-400" />
            <span className="text-xs font-mono text-white/60 uppercase tracking-wider">{challenge.title}</span>
          </div>
          <div className="flex gap-1">
            {CHALLENGES.map((c, i) => (
              <div
                key={c.id}
                className={`w-2 h-2 rounded-full ${
                  completedChallenges.has(c.id)
                    ? 'bg-green-400'
                    : i === challengeIdx
                    ? 'bg-amber-400 animate-pulse'
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-white/80 leading-relaxed">{challenge.goal}</p>
      </div>

      {/* Canvas */}
      <div className="flex justify-center bg-black/20 py-2 relative">
        {/* Drag instruction overlay */}
        {!isBalanced && (
          <div className="absolute top-1 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-xs text-amber-300 font-mono pointer-events-none">
            👆 Drag the yellow fulcrum to balance the beam
          </div>
        )}
        <Stage
          ref={stageRef}
          width={STAGE_W}
          height={STAGE_H}
          onMouseMove={handleStageMouseMove}
          onMouseUp={handleStageMouseUp}
          onMouseLeave={handleStageMouseUp}
        >
          <Layer>
            {/* Ground line */}
            <Line
              x={0}
              y={BEAM_Y + 55}
              points={[0, 0, STAGE_W, 0]}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={1}
              dash={[4, 4]}
            />

            {/* Fulcrum (draggable) */}
            <Group
              x={fulcrumX}
              y={BEAM_Y}
              onMouseDown={handleFulcrumMouseDown}
              onTap={handleFulcrumMouseDown}
            >
              <Line
                points={[-16, 45, 0, 0, 16, 45]}
                fill="rgba(251, 191, 36, 0.3)"
                closed
                stroke="rgb(251, 191, 36)"
                strokeWidth={2}
              />
              <Circle
                x={0}
                y={0}
                radius={9}
                fill="rgb(251, 191, 36)"
                shadowColor="rgb(251, 191, 36)"
                shadowBlur={12}
              />
              <Text
                x={-35}
                y={48}
                text="← drag →"
                fontSize={9}
                fontFamily="monospace"
                fill="rgba(251, 191, 36, 0.6)"
                width={70}
                align="center"
              />
            </Group>

            {/* Beam */}
            <Line
              points={[leftEndX, leftEndY, rightEndX, rightEndY]}
              stroke={isBalanced ? 'rgb(74, 222, 128)' : 'rgba(255,255,255,0.7)'}
              strokeWidth={6}
              lineCap="round"
              shadowColor={isBalanced ? 'rgb(74, 222, 128)' : 'transparent'}
              shadowBlur={isBalanced ? 15 : 0}
            />

            {/* Load (left) */}
            <Group x={leftEndX} y={leftEndY - 22}>
              <Rect
                x={-18}
                y={-18}
                width={36}
                height={28}
                fill="rgba(244, 114, 182, 0.2)"
                stroke="rgb(244, 114, 182)"
                strokeWidth={2}
                cornerRadius={4}
              />
              <Text
                x={-18}
                y={-10}
                text={`${load}N`}
                fontSize={12}
                fontFamily="monospace"
                fill="rgb(244, 114, 182)"
                width={36}
                align="center"
                fontWeight="bold"
              />
              <Line x={0} y={0} points={[0, 0, 0, 10]} stroke="rgba(244, 114, 182, 0.5)" strokeWidth={2} />
              <Text x={-25} y={-34} text="LOAD" fontSize={8} fontFamily="monospace" fill="rgba(244, 114, 182, 0.6)" width={50} align="center" />
            </Group>

            {/* Effort (right) */}
            <Group x={rightEndX} y={rightEndY}>
              <Line x={0} y={-22} points={[0, 0, 0, 22]} stroke="rgba(56, 189, 248, 0.5)" strokeWidth={2} />
              <Line x={0} y={-22} points={[0, -18, 0, -4]} stroke="rgb(56, 189, 248)" strokeWidth={3} lineCap="round" />
              <Line x={0} y={-4} points={[-5, -9, 0, -4, 5, -9]} fill="rgb(56, 189, 248)" closed stroke="rgb(56, 189, 248)" strokeWidth={2} />
              <Text x={-18} y={-40} text={`${effort}N`} fontSize={12} fontFamily="monospace" fill="rgb(56, 189, 248)" width={36} align="center" fontWeight="bold" />
              <Text x={-25} y={-54} text="EFFORT" fontSize={8} fontFamily="monospace" fill="rgba(56, 189, 248, 0.6)" width={50} align="center" />
            </Group>

            {/* Balance indicator */}
            {isBalanced && (
              <Group x={STAGE_W / 2} y={30}>
                <Rect x={-55} y={-12} width={110} height={24} fill="rgba(74, 222, 128, 0.15)" stroke="rgb(74, 222, 128)" strokeWidth={1} cornerRadius={12} />
                <Text x={-55} y={-6} text="✓ BALANCED!" fontSize={12} fontFamily="monospace" fill="rgb(74, 222, 128)" width={110} align="center" fontWeight="bold" />
              </Group>
            )}

            {/* Arm length labels */}
            <Group>
              <Text x={leftEndX + 10} y={BEAM_Y + 20} text={`arm: ${(loadArm).toFixed(2)}m`} fontSize={9} fontFamily="monospace" fill="rgba(244, 114, 182, 0.6)" />
              <Text x={rightEndX - 70} y={BEAM_Y + 20} text={`arm: ${(effortArm).toFixed(2)}m`} fontSize={9} fontFamily="monospace" fill="rgba(56, 189, 248, 0.6)" />
            </Group>
          </Layer>
        </Stage>
      </div>

      {/* Controls — only show effort slider if not fixed */}
      {!challenge.effortFixed && (
        <div className="px-4 py-2 border-t border-white/10">
          <div className="flex items-center gap-3">
            <label className="text-xs font-mono text-sky-400 w-16">Effort</label>
            <input
              type="range"
              min={1}
              max={challenge.effortMax || 10}
              step={1}
              value={effort}
              onChange={(e) => setEffort(Number(e.target.value))}
              className="flex-1 accent-sky-400"
            />
            <span className="text-xs font-mono text-white/60 w-12 text-right">{effort} N</span>
          </div>
        </div>
      )}

      {/* Live readings */}
      <div className="px-4 py-2 grid grid-cols-3 gap-2 border-t border-white/10">
        <Reading label="ACW Moment" value={`${acwMoment.toFixed(1)}`} unit="N·m" color="rgb(244, 114, 182)" highlight={netMoment < 0} />
        <Reading label="CW Moment" value={`${cwMoment.toFixed(1)}`} unit="N·m" color="rgb(56, 189, 248)" highlight={netMoment > 0} />
        <Reading label="MA" value={isBalanced ? ma.toFixed(1) : '—'} unit="" color="rgb(251, 191, 36)" highlight={isBalanced} />
      </div>

      {/* Hint button */}
      {!showLesson && !isBalanced && (
        <div className="px-4 pb-2">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1 text-xs text-amber-400/60 hover:text-amber-400 transition-colors"
          >
            <Lightbulb size={12} />
            {showHint ? 'Hide hint' : 'Need a hint?'}
          </button>
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 rounded-lg bg-amber-500/5 border border-amber-500/10 px-3 py-2"
              >
                <p className="text-xs text-amber-200/70 leading-relaxed">{challenge.hint}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Lesson — appears when challenge is completed */}
      <AnimatePresence>
        {showLesson && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pb-3"
          >
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={14} className="text-green-400" />
                <span className="text-xs font-mono text-green-400 uppercase tracking-wider">
                  {allDone ? 'All Challenges Complete!' : `Challenge ${challenge.id} Complete!`}
                </span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed mb-3">{challenge.lesson}</p>
              <button
                onClick={handleNextChallenge}
                className="w-full py-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300 text-sm font-medium hover:bg-green-500/30 transition-all flex items-center justify-center gap-2"
              >
                {allDone ? 'Finish simulation' : `Next challenge →`}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset */}
      {!showLesson && (
        <div className="px-4 pb-3 flex justify-end">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            <RotateCcw size={11} />
            Reset
          </button>
        </div>
      )}
    </div>
  )
}

function Reading({ label, value, unit, color, highlight }: { label: string; value: string; unit: string; color: string; highlight: boolean }) {
  return (
    <motion.div
      animate={{ scale: highlight ? 1.03 : 1 }}
      className="rounded-xl bg-white/5 border border-white/10 px-2 py-1.5 text-center"
      style={highlight ? { borderColor: `${color}40`, background: `${color}10` } : {}}
    >
      <div className="text-[9px] font-mono uppercase tracking-wider text-white/40">{label}</div>
      <div className="text-sm font-mono font-bold mt-0.5" style={{ color }}>
        {value}<span className="text-[10px] opacity-60"> {unit}</span>
      </div>
    </motion.div>
  )
}
