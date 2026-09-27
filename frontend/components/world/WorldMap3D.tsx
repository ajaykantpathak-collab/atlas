'use client'

/**
 * WorldMap3D — the knowledge universe, designed not scattered.
 * - Scoped: student's own class lights the view; the rest is distant context
 * - Legible: 3D subject-region labels, class rings you can read
 * - Guided: a gold beacon marks the recommended next node
 * - Contextual: edges appear only for the hovered node — info, not noise
 * - Performant: instanced spheres near, Points LOD far
 * - Alive: soft chime on hover, ambient nebula glow
 */
import { useMemo, useRef, useState, useCallback, useEffect, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Text, Line, Billboard } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'
import GALAXY from './GALAXY.json'
import WC from './world_content.json'
import { getNodesMastery, syncPendingResults } from '@/lib/masteryStore'
import { audioManager } from '../../lib/sim-engine/audio'
import SIM_INDEX from '../sims_v2/SIM_INDEX.json'

type GNode = { id: string; cls: number; subj: string; chap: number; pos: [number, number, number]; sim: string | null }
const NODES = GALAXY.nodes as GNode[]

/* A star counts as "lit" from the server-side BKT mastery probability
   (×100) at this threshold — the same bar /api/progress/overview uses
   for its mastered count, so the HUD and dashboard always agree. */
export const GALAXY_LIT_THRESHOLD = 80

const SUBJ_COLORS: [RegExp, string][] = [
    [/phys/i, '#38bdf8'], [/chem/i, '#a78bfa'], [/bio|life|sci/i, '#34d399'],
    [/math|stat/i, '#818cf8'], [/hist/i, '#f59e0b'], [/geo/i, '#2dd4bf'],
    [/civ|pol|ps/i, '#fb7185'], [/eco|bs|acc/i, '#4ade80'],
    [/eng|hin|urd|san|kar|tam|tel|mar|ben|lang/i, '#e879f9'],
    [/cs|ip|comp|ca/i, '#22d3ee'], [/soc|psy|hs/i, '#fb923c'],
]
const subjColor = (s: string) => SUBJ_COLORS.find(([re]) => re.test(s))?.[1] ?? '#94a3b8'

/* ═══ Lumen-style soft glow sprite — shared by stars and nebula dust ═══ */
let _glowTex: THREE.Texture | null = null
function glowTexture(): THREE.Texture {
    if (!_glowTex) {
        const c = document.createElement('canvas')
        c.width = c.height = 64
        const g = c.getContext('2d')!
        const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
        grad.addColorStop(0, 'rgba(255,255,255,1)')
        grad.addColorStop(0.25, 'rgba(255,255,255,0.55)')
        grad.addColorStop(0.6, 'rgba(255,255,255,0.12)')
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        g.fillStyle = grad
        g.fillRect(0, 0, 64, 64)
        _glowTex = new THREE.CanvasTexture(c)
    }
    return _glowTex
}

/* adjacency: node index → its connected node indices */
const ADJ = (() => {
    const m = new Map<number, number[]>();
    for (const [a, b] of GALAXY.edges) {
        (m.get(a) ?? m.set(a, []).get(a)!).push(b);
        (m.get(b) ?? m.set(b, []).get(b)!).push(a);
    }
    return m;
})();

/* subject sector centroids — where the region labels float */
/* region labels sit at each subject's wedge mid-angle — never collide */
const SECTORS = (GALAXY.sectors as { subj: string; pos: [number, number, number]; n: number }[])
    .filter(s => s.n >= 100);

/* ═══ node field — instanced spheres (near) + Points (far LOD) ═══ */
function NodeField({ mastery, classLevel, onHover, onSelect }: {
    mastery: Record<string, number>; classLevel: number | null; onHover: (n: GNode | null) => void;
    onSelect?: (n: GNode | null) => void;
}) {
    const spheres = useRef<THREE.InstancedMesh>(null!)
    const points = useRef<THREE.Points>(null!)
    const { camera } = useThree()
    /* drag guard — a rotate that starts on a star must not read as a tap */
    const downAt = useRef<{ x: number; y: number } | null>(null)
    useEffect(() => {
        const down = (e: PointerEvent) => { downAt.current = { x: e.clientX, y: e.clientY } }
        window.addEventListener('pointerdown', down, { passive: true })
        return () => window.removeEventListener('pointerdown', down)
    }, [])

    const { geo, pGeo, colors } = useMemo(() => {
        const geo = new THREE.SphereGeometry(0.55, 10, 10)
        const pGeo = new THREE.BufferGeometry()
        const pos = new Float32Array(NODES.length * 3)
        const colors = new Float32Array(NODES.length * 3)
        const c = new THREE.Color()
        NODES.forEach((n, i) => {
            pos.set(n.pos, i * 3)
            const m = mastery[n.id] ?? 0
            const mine = !classLevel || n.cls === classLevel
            if (m >= GALAXY_LIT_THRESHOLD) {
                // mastered — a lit gold star, bright far beyond its subject hue
                c.set('#fbbf24').multiplyScalar(mine ? 2.6 : 0.6)
            } else {
                const lit = mine ? 0.3 + (m / 100) * 2.2 : 0.09      // other classes = faint dust
                c.set(subjColor(n.subj)).multiplyScalar(lit)
            }
            colors.set([c.r, c.g, c.b], i * 3)
        })
        pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
        pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        return { geo, pGeo, colors }
    }, [mastery, classLevel])

    useEffect(() => {
        const m = spheres.current
        if (!m) return
        const mat4 = new THREE.Matrix4()
        NODES.forEach((n, i) => {
            const mine = !classLevel || n.cls === classLevel
            const s = mine ? 0.75 + ((mastery[n.id] ?? 0) / 100) * 1.0 : 0.35
            mat4.makeScale(s, s, s).setPosition(...n.pos)
            m.setMatrixAt(i, mat4)
        })
        m.instanceMatrix.needsUpdate = true
        m.instanceColor = new THREE.InstancedBufferAttribute(colors, 3)
        m.instanceColor.needsUpdate = true
    }, [mastery, classLevel, colors])

    /* LOD: spheres near, points far */
    useFrame(() => {
        const far = camera.position.length() > 380
        if (spheres.current) spheres.current.visible = !far
        if (points.current) points.current.visible = far
    })

    const onMove = useCallback((e: any) => {
        e.stopPropagation()
        const id = e.instanceId as number | undefined
        onHover(id != null ? NODES[id] : null)
        document.body.style.cursor = id != null ? 'pointer' : 'default'
        if (id != null) audioManager.play('tap')
    }, [onHover])

    /* tap = select a star (Galaxy Home). A rotate drag (>6px travel) is
       NOT a tap. Desktop and touch share the same pointer pipeline. */
    const onTap = useCallback((e: any) => {
        if (!onSelect) return
        e.stopPropagation()
        const d = downAt.current
        if (d && e.clientX != null && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 6) return
        const id = e.instanceId as number | undefined
        onSelect(id != null ? NODES[id] : null)
    }, [onSelect])

    return (
        <group>
            <instancedMesh ref={spheres} args={[geo, undefined, NODES.length]}
                onPointerMove={onMove}
                onPointerOut={() => { onHover(null); document.body.style.cursor = 'default' }}
                onPointerUp={onTap}>
                <meshBasicMaterial toneMapped={false} />
            </instancedMesh>
            <points ref={points} geometry={pGeo}>
                <pointsMaterial map={glowTexture()} size={11.5} vertexColors sizeAttenuation
                    transparent opacity={1} depthWrite={false} blending={THREE.AdditiveBlending}
                    toneMapped={false} />
            </points>
        </group>
    )
}

/* ═══ context edges — only for the hovered (or selected) node ═══ */
function HoverEdges({ node }: { node: GNode | null }) {
    const geo = useMemo(() => {
        if (!node) return null
        const idx = NODES.indexOf(node)
        const links = ADJ.get(idx) ?? []
        const pos = new Float32Array(links.length * 6)
        links.forEach((j, i) => {
            pos.set(node.pos, i * 6)
            pos.set(NODES[j].pos, i * 6 + 3)
        })
        const g = new THREE.BufferGeometry()
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
        return g
    }, [node])
    if (!geo) return null
    return (
        <lineSegments geometry={geo}>
            <lineBasicMaterial color="#fbbf24" transparent opacity={0.7} />
        </lineSegments>
    )
}

/* ═══ mastered pulse — one halo cloud over the LIT stars ═══
   Built once per mastery load (static geometry); the only per-frame
   work is two material uniforms on a SINGLE shared material, so the
   60fps budget is untouched even with thousands of lit stars. */
function MasteredGlow({ mastery }: { mastery: Record<string, number> }) {
    const mat = useRef<THREE.PointsMaterial>(null!)
    const geo = useMemo(() => {
        const lit = NODES.filter(n => (mastery[n.id] ?? 0) >= GALAXY_LIT_THRESHOLD)
        if (!lit.length) return null
        const pos = new Float32Array(lit.length * 3)
        lit.forEach((n, i) => pos.set(n.pos, i * 3))
        const g = new THREE.BufferGeometry()
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
        return g
    }, [mastery])
    useFrame(({ clock }) => {
        if (!mat.current) return
        const p = 0.5 + Math.sin(clock.elapsedTime * 1.7) * 0.5
        mat.current.size = 13 + p * 5
        mat.current.opacity = 0.5 + p * 0.35
    })
    if (!geo) return null
    return (
        <points geometry={geo}>
            <pointsMaterial ref={mat} map={glowTexture()} color="#fcd34d" size={16}
                sizeAttenuation transparent depthWrite={false}
                blending={THREE.AdditiveBlending} toneMapped={false} />
        </points>
    )
}

/* ═══ selection ring — marks the star the topic panel is open for ═══ */
function SelectionRing({ node }: { node: GNode }) {
    const ring = useRef<THREE.Mesh>(null!)
    useFrame(({ clock }) => {
        if (!ring.current) return
        const p = 1 + Math.sin(clock.elapsedTime * 2.4) * 0.12
        ring.current.scale.set(p, p, p)
    })
    return (
        <Billboard position={node.pos}>
            <mesh ref={ring}>
                <ringGeometry args={[3.4, 4.1, 40]} />
                <meshBasicMaterial color="#fbbf24" transparent opacity={0.9}
                    side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
            </mesh>
        </Billboard>
    )
}

/* ═══ camera glide — eases the camera to a selected star ═══
   Keeps the current viewing direction, closes to a readable distance,
   cancels the moment the user grabs the controls. */
function CameraGlide({ target, controls }: { target: GNode | null; controls: MutableRefObject<any> }) {
    const { camera } = useThree()
    const anim = useRef<{ fromPos: THREE.Vector3; toPos: THREE.Vector3; fromTgt: THREE.Vector3; toTgt: THREE.Vector3; t0: number } | null>(null)

    useEffect(() => {
        const c = controls.current
        if (!target || !c) return
        const tgt = new THREE.Vector3(...target.pos)
        const dir = camera.position.clone().sub(c.target).normalize()
        if (!dir.lengthSq()) dir.set(0, 0.35, 1).normalize()
        const toPos = tgt.clone().add(dir.multiplyScalar(95))
        anim.current = {
            fromPos: camera.position.clone(), toPos,
            fromTgt: c.target.clone(), toTgt: tgt,
            t0: performance.now(),
        }
    }, [target, controls, camera])

    useEffect(() => {
        const c = controls.current
        if (!c) return
        const cancel = () => { anim.current = null }
        c.addEventListener('start', cancel)
        return () => c.removeEventListener('start', cancel)
    }, [controls])

    useFrame(() => {
        const a = anim.current
        const c = controls.current
        if (!a || !c) return
        const k = Math.min(1, (performance.now() - a.t0) / 950)
        const e = 1 - Math.pow(1 - k, 3)
        camera.position.lerpVectors(a.fromPos, a.toPos, e)
        c.target.lerpVectors(a.fromTgt, a.toTgt, e)
        c.update()
        if (k >= 1) anim.current = null
    })
    return null
}

/* ═══ nebula dust — big soft colour washes behind each subject sector ═══ */
function NebulaDust() {
    return (
        <group>
            {SECTORS.map((s) => {
                const d = 55 + Math.sqrt(s.n) * 9
                return (
                    <group key={s.subj} position={[s.pos[0], s.pos[1] - 10, s.pos[2]]}>
                        <sprite scale={[d * 1.5, d * 1.05, 1]}>
                            <spriteMaterial map={glowTexture()} color='#2a1e5c' transparent
                                opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false}
                                toneMapped={false} />
                        </sprite>
                        <sprite scale={[d * 0.85, d * 0.6, 1]}>
                            <spriteMaterial map={glowTexture()} color={subjColor(s.subj)} transparent
                                opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false}
                                toneMapped={false} />
                        </sprite>
                    </group>
                )
            })}
        </group>
    )
}

/* ═══ region labels + nebula glow ═══ */
const WC_SUBJ = WC.subjects as Record<string, { name?: string; emoji?: string; blurb?: string }>;
const subjName = (slug: string) => (WC_SUBJ[slug]?.name ?? slug.replace(/_/g, ' ')).toUpperCase();

function Regions() {
    return (
        <group>
            {SECTORS.map((s, i) => (
                <group key={s.subj} position={[s.pos[0], s.pos[1] + (i % 3) * 6, s.pos[2]]}>
                    <Billboard>
                        <Text fontSize={2.2 + Math.sqrt(s.n) * 0.1} color={subjColor(s.subj)} anchorX="center" anchorY="middle"
                            outlineWidth={0.1} outlineColor="#020617" fontWeight={800}
                            letterSpacing={0.4}>
                            {subjName(s.subj)}
                        </Text>
                    </Billboard>
                </group>
            ))}
        </group>
    )
}

/* ═══ the beacon — recommended next node gets a golden pillar ═══ */
function Beacon({ node }: { node: GNode }) {
    const beam = useRef<THREE.Mesh>(null!)
    useFrame(({ clock }) => {
        if (beam.current) {
            const p = 0.5 + Math.sin(clock.elapsedTime * 2.2) * 0.3
            ;(beam.current.material as THREE.MeshBasicMaterial).opacity = 0.25 + p * 0.2
        }
    })
    return (
        <group position={node.pos}>
            <mesh ref={beam}>
                <cylinderGeometry args={[0.35, 0.6, 26, 16, 1, true]} />
                <meshBasicMaterial color="#fbbf24" transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
            </mesh>
            <Billboard position={[0, 3.2, 0]}>
                <Text fontSize={1.15} color="#fde68a" anchorX="center" fontWeight={800}>▲ next up</Text>
            </Billboard>
        </group>
    )
}

function Drift() {
    useFrame((s) => { s.scene.rotation.y = s.clock.elapsedTime * 0.012 })
    return null
}

function ClickToSim({ onGo }: { onGo: (id: string) => void }) {
    const { camera, raycaster, pointer, scene } = useThree()
    useEffect(() => {
        const onClick = () => {
            raycaster.setFromCamera(pointer, camera)
            const inst = scene.children.find(o => (o as any).isInstancedMesh) as THREE.InstancedMesh | undefined
            if (!inst) return
            const hits = raycaster.intersectObject(inst)
            const id = hits[0]?.instanceId
            if (id != null && NODES[id]?.sim) onGo(NODES[id].sim!)
        }
        window.addEventListener('click', onClick)
        return () => window.removeEventListener('click', onClick)
    }, [camera, raycaster, pointer, scene, onGo])
    return null
}

export function WorldMap3D({ classLevel, serverMastery, onSelect, selectedId, showHud = true }: {
    classLevel?: number | null
    /* Server truth (GET /api/progress/mastery/all → nodeId → 0-100).
       When PROVIDED it replaces the localStorage store entirely; when
       OMITTED the legacy local-mastery behaviour is preserved. `null`
       (fetch failed / signed out) renders the honest all-dim sky. */
    serverMastery?: Record<string, number> | null
    /* Star tap → Galaxy Home topic panel. Replaces the click-to-sim jump. */
    onSelect?: (n: GNode | null) => void
    selectedId?: string | null
    /* Galaxy Home renders its own richer HUD, so the built-in mini HUD
       can be switched off. */
    showHud?: boolean
}) {
    const [localMastery, setLocalMastery] = useState<Record<string, number>>({})
    const [hover, setHover] = useState<GNode | null>(null)
    const [cls, setCls] = useState<number | null>(classLevel ?? null)
    const controls = useRef<any>(null)
    const router = useRouter()

    const mastery = serverMastery !== undefined ? (serverMastery ?? {}) : localMastery

    const [newlyLit, setNewlyLit] = useState(0)

    useEffect(() => {
        if (serverMastery !== undefined) return  // server truth owns the sky
        // flush any sim results queued while offline — fire-and-forget
        void syncPendingResults()

        const m = getNodesMastery(NODES.map(n => n.id))
        const out: Record<string, number> = {}
        NODES.forEach(n => { out[n.id] = m[n.id]?.bestScore ?? 0 })
        setLocalMastery(out)

        // how many stars were lit since the galaxy was last open? —
        // the welcome-back payoff moment when returning from a sim.
        try {
            const seen = Number(localStorage.getItem('atlas_galaxy_seen_stars') ?? '0')
            const nowLit = Object.values(out).filter(v => v >= GALAXY_LIT_THRESHOLD).length
            if (nowLit > seen) setNewlyLit(nowLit - seen)
            localStorage.setItem('atlas_galaxy_seen_stars', String(nowLit))
        } catch { }
    }, [serverMastery])

    /* the star the topic panel is open for — also the camera-glide target */
    const selectedNode = useMemo(
        () => (selectedId ? NODES.find(n => n.id === selectedId) ?? null : null),
        [selectedId])

    /* recommended next = lowest-mastery in-progress node of their class,
       else first unexplored node of their class */
    const nextNode = useMemo(() => {
        const mine = NODES.filter(n => (cls ? n.cls === cls : true))
        const inProgress = mine.filter(n => (mastery[n.id] ?? 0) > 0 && (mastery[n.id] ?? 0) < 70)
        return inProgress[0] ?? mine.find(n => (mastery[n.id] ?? 0) === 0) ?? mine[0]
    }, [mastery, cls])

    const mastered = useMemo(() =>
        Object.entries(mastery).filter(([id, v]) => v >= 70 && (!cls || NODES.find(n => n.id === id)?.cls === cls)).length,
        [mastery, cls])

    // nodes whose SRS review window has passed — the "dimming" stars
    const dueForReview = useMemo(() => {
        const data = getNodesMastery(NODES.map(n => n.id))
        return Object.values(data).filter(n => n.status === 'needs_review').length
    }, [mastery])

    const mine = useMemo(() => NODES.filter(n => !cls || n.cls === cls), [cls])
    const centroid = useMemo(() => {
        if (!mine.length) return [0, 140, 260] as [number, number, number]
        const c = mine.reduce((a, n) => [a[0] + n.pos[0], a[1] + n.pos[1], a[2] + n.pos[2]], [0, 0, 0])
        // pull back far enough that the whole disc reads as one galaxy
        return [c[0] / mine.length, c[1] / mine.length + 180, c[2] / mine.length + 560] as [number, number, number]
    }, [mine])

    const classes = Array.from(new Set(NODES.map(n => n.cls))).sort((a, b) => a - b)

    return (
        <div className="relative w-full h-full">
            <Canvas camera={{ position: centroid, fov: 55 }} dpr={[1, 1.5]}>
                <color attach="background" args={['#020617']} />
                <ambientLight intensity={0.4} />
                <Stars radius={400} depth={60} count={5200} factor={4.5} fade speed={0.35} />
                <Regions />
                <NebulaDust />
                <NodeField mastery={mastery} classLevel={cls} onHover={setHover} onSelect={onSelect} />
                <MasteredGlow mastery={mastery} />
                <HoverEdges node={selectedNode ?? hover} />
                {selectedNode && <SelectionRing node={selectedNode} />}
                {nextNode && <Beacon node={nextNode} />}
                <Drift />
                <CameraGlide target={selectedNode} controls={controls} />
                <OrbitControls ref={controls} enablePan enableZoom enableRotate minDistance={20} maxDistance={620}
                    autoRotate={!selectedNode} autoRotateSpeed={0.35} />
                {!onSelect && <ClickToSim onGo={(id) => { audioManager.play('success'); router.push(`/sims-v2/${id}`) }} />}
                <EffectComposer>
                    <Bloom intensity={1.35} luminanceThreshold={0.055} luminanceSmoothing={0.82} mipmapBlur />
                    <Noise premultiply opacity={0.07} />
                    <Vignette offset={0.22} darkness={0.72} />
                </EffectComposer>
            </Canvas>

            {/* class scope chips */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 flex gap-1.5 flex-wrap justify-center max-w-[60%]">
                <button onClick={() => setCls(null)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-black backdrop-blur border transition ${!cls ? 'bg-amber-500 text-slate-900 border-amber-400' : 'bg-slate-900/70 text-slate-300 border-slate-600 hover:border-slate-400'}`}>
                    ALL
                </button>
                {classes.map(c => (
                    <button key={c} onClick={() => setCls(c === cls ? null : c)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-black backdrop-blur border transition ${cls === c ? 'bg-sky-400 text-slate-900 border-sky-300' : 'bg-slate-900/70 text-slate-300 border-slate-600 hover:border-slate-400'}`}>
                        CLASS {c}
                    </button>
                ))}
            </div>

            {/* hover tooltip */}
            {hover && (
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 pointer-events-none">
                    <div className="bg-slate-900/90 border border-sky-400/40 rounded-2xl px-5 py-3 text-center shadow-2xl backdrop-blur">
                        <p className="text-xs font-black text-sky-300 uppercase tracking-widest">
                            class {hover.cls} · {(WC_SUBJ[hover.subj]?.name ?? hover.subj.replace(/_/g, ' '))} · {(WC.constellations as Record<string,string>)[`c${hover.cls}_${hover.subj}_ch${String(hover.chap).padStart(2,'0')}`] ?? `ch ${hover.chap}`}
                        </p>
                        <p className="text-sm font-bold text-white mt-0.5">
                            {hover.sim && (SIM_INDEX as Record<string, { t: string }>)[hover.sim]?.t
                                ? (SIM_INDEX as Record<string, { t: string }>)[hover.sim].t
                                : 'Chapter node'}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">
                            {(mastery[hover.id] ?? 0) >= GALAXY_LIT_THRESHOLD ? '✨ mastered' : (mastery[hover.id] ?? 0) > 0 ? '🌱 in progress' : '🌑 unexplored'}
                            {hover.sim && !onSelect ? ' — click to enter' : onSelect ? ' — tap to open' : ''}
                        </p>
                    </div>
                </div>
            )}

            {/* HUD — legacy pages; Galaxy Home renders its own richer one */}
            {showHud && (
                <div className="absolute top-5 left-5 bg-slate-900/80 border border-slate-700 rounded-2xl px-4 py-3 backdrop-blur">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cls ? `class ${cls} universe` : 'your universe'}</p>
                    <p className="text-xl font-black text-white">{mastered.toLocaleString()} <span className="text-sm text-slate-400 font-bold">/ {mine.length.toLocaleString()} stars lit</span></p>
                    {dueForReview > 0 && (
                        <p className="text-[11px] font-bold text-amber-300 mt-1">🔁 {dueForReview} need a review pass — mastered fades without it</p>
                    )}
                    {newlyLit > 0 && (
                        <p className="text-[11px] font-black text-emerald-300 mt-1 animate-pulse">✨ +{newlyLit} star{newlyLit > 1 ? 's' : ''} lit since you were last here!</p>
                    )}
                </div>
            )}
        </div>
    )
}
