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
import { useMemo, useRef, useState, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Text, Line, Billboard } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'
import GALAXY from './GALAXY.json'
import WC from './world_content.json'
import { getNodesMastery, syncPendingResults } from '@/lib/masteryStore'
import { audioManager } from '../../lib/sim-engine/audio'
import SIM_INDEX from '../sims_v2/SIM_INDEX.json'

type GNode = { id: string; cls: number; subj: string; chap: number; pos: [number, number, number]; sim: string | null }
const NODES = GALAXY.nodes as GNode[]

const SUBJ_COLORS: [RegExp, string][] = [
    [/phys/i, '#38bdf8'], [/chem/i, '#a78bfa'], [/bio|life|sci/i, '#34d399'],
    [/math|stat/i, '#818cf8'], [/hist/i, '#f59e0b'], [/geo/i, '#2dd4bf'],
    [/civ|pol|ps/i, '#fb7185'], [/eco|bs|acc/i, '#4ade80'],
    [/eng|hin|urd|san|kar|tam|tel|mar|ben|lang/i, '#e879f9'],
    [/cs|ip|comp|ca/i, '#22d3ee'], [/soc|psy|hs/i, '#fb923c'],
]
const subjColor = (s: string) => SUBJ_COLORS.find(([re]) => re.test(s))?.[1] ?? '#94a3b8'

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
function NodeField({ mastery, classLevel, onHover }: {
    mastery: Record<string, number>; classLevel: number | null; onHover: (n: GNode | null) => void;
}) {
    const spheres = useRef<THREE.InstancedMesh>(null!)
    const points = useRef<THREE.Points>(null!)
    const { camera } = useThree()

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
            const lit = mine ? 0.2 + (m / 100) * 1.7 : 0.06      // other classes = faint dust
            c.set(subjColor(n.subj)).multiplyScalar(lit)
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

    return (
        <group>
            <instancedMesh ref={spheres} args={[geo, undefined, NODES.length]}
                onPointerMove={onMove}
                onPointerOut={() => { onHover(null); document.body.style.cursor = 'default' }}>
                <meshBasicMaterial toneMapped={false} />
            </instancedMesh>
            <points ref={points} geometry={pGeo}>
                <pointsMaterial size={1.6} vertexColors sizeAttenuation transparent opacity={0.9} />
            </points>
        </group>
    )
}

/* ═══ context edges — only for the hovered node ═══ */
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

export function WorldMap3D({ classLevel }: { classLevel?: number | null }) {
    const [mastery, setMastery] = useState<Record<string, number>>({})
    const [hover, setHover] = useState<GNode | null>(null)
    const [cls, setCls] = useState<number | null>(classLevel ?? null)
    const router = useRouter()

    const [newlyLit, setNewlyLit] = useState(0)

    useEffect(() => {
        // flush any sim results queued while offline — fire-and-forget
        void syncPendingResults()

        const m = getNodesMastery(NODES.map(n => n.id))
        const out: Record<string, number> = {}
        NODES.forEach(n => { out[n.id] = m[n.id]?.bestScore ?? 0 })
        setMastery(out)

        // how many stars were lit since the galaxy was last open? —
        // the welcome-back payoff moment when returning from a sim.
        try {
            const seen = Number(localStorage.getItem('atlas_galaxy_seen_stars') ?? '0')
            const nowLit = Object.values(out).filter(v => v >= 70).length
            if (nowLit > seen) setNewlyLit(nowLit - seen)
            localStorage.setItem('atlas_galaxy_seen_stars', String(nowLit))
        } catch { }
    }, [])

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
        return [c[0] / mine.length, c[1] / mine.length + 60, c[2] / mine.length + 120] as [number, number, number]
    }, [mine])

    const classes = Array.from(new Set(NODES.map(n => n.cls))).sort((a, b) => a - b)

    return (
        <div className="relative w-full h-full">
            <Canvas camera={{ position: centroid, fov: 55 }} dpr={[1, 1.5]}>
                <color attach="background" args={['#020617']} />
                <ambientLight intensity={0.4} />
                <Stars radius={400} depth={60} count={3000} factor={4} fade speed={0.5} />
                <Regions />
                <NodeField mastery={mastery} classLevel={cls} onHover={setHover} />
                <HoverEdges node={hover} />
                {nextNode && <Beacon node={nextNode} />}
                <Drift />
                <OrbitControls enablePan enableZoom enableRotate minDistance={20} maxDistance={620}
                    autoRotate autoRotateSpeed={0.35} />
                <ClickToSim onGo={(id) => { audioManager.play('success'); router.push(`/sims-v2/${id}`) }} />
                <EffectComposer><Bloom intensity={0.8} luminanceThreshold={0.18} luminanceSmoothing={0.7} /></EffectComposer>
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
                            {(mastery[hover.id] ?? 0) >= 70 ? '✨ mastered' : (mastery[hover.id] ?? 0) > 0 ? '🌱 in progress' : '🌑 unexplored'}
                            {hover.sim ? ' — click to enter' : ''}
                        </p>
                    </div>
                </div>
            )}

            {/* HUD */}
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
        </div>
    )
}
