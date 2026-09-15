'use client'

/**
 * lab3d.tsx — world-class 3D lab scenes (React Three Fiber).
 * Drop-in upgrade for the 2D canvas SCENES painters: same slider contract
 * (vals: Record<string, number>), rendered as real-time 3D with lighting,
 * bloom and physics-meaningful visuals. CanvasLab routes here when a
 * LABS3D scene exists for spec.scene; 2D stays as the fallback.
 */
import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, Text, Billboard } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

type V = Record<string, number>
type Scene = React.FC<{ v: V; labels?: string[] }>

// NOTE: HAS_3D in lab3d_keys.ts must stay in sync with the LABS3D
// registry below — canvasLab uses that set to decide whether to
// dynamic-import this module (keeping three.js out of the main chunk).

/* ── shared bits ─────────────────────────────────────────── */
const Stage: React.FC<{ children: React.ReactNode; cam?: [number, number, number] }> = ({ children, cam = [0, 0.6, 5.2] }) => (
    <Canvas camera={{ position: cam, fov: 42 }} dpr={[1, 1.75]} gl={{ antialias: true }}
        style={{ background: 'radial-gradient(ellipse at 50% 30%, #0b1030 0%, #020617 80%)' }}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 4]} intensity={0.9} />
        {children}
        <EffectComposer><Bloom intensity={0.9} luminanceThreshold={0.18} mipmapBlur /></EffectComposer>
    </Canvas>
)

const Glow = ({ pos, r = 0.28, color }: { pos: [number, number, number]; r?: number; color: string }) => (
    <mesh position={pos}>
        <sphereGeometry args={[r, 24, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.4} roughness={0.3} />
    </mesh>
)

const Label = ({ children, pos, size = 0.22, color = '#e2e8f0' }: { children: string; pos: [number, number, number]; size?: number; color?: string }) => (
    <Billboard position={pos}><Text fontSize={size} color={color} fontWeight={700} anchorX="center" outlineWidth={0.02} outlineColor="#020617">{children}</Text></Billboard>
)

/* write Vector3 points into a drei Line's geometry (LineSegmentsGeometry.setPositions) */
const setLinePts = (r: React.MutableRefObject<any>, pts: THREE.Vector3[]) => {
    const g = r.current?.geometry
    if (!g?.setPositions) return
    const flat = new Float32Array(pts.length * 3)
    pts.forEach((p, i) => { flat[i * 3] = p.x; flat[i * 3 + 1] = p.y; flat[i * 3 + 2] = p.z })
    g.setPositions(flat)
}

/* ═══ E-FIELD — two charges, real 3D field-line integration ═══ */
const EField: Scene = ({ v }) => {
    const q1 = (v.q1 ?? 80) / 50 - 1            // -1..+1
    const q2 = (v.q2 ?? 20) / 50 - 1
    const sep = 1.2 + (v.separation ?? 60) / 50 // distance
    const A: [number, number, number] = [-sep / 2, 0, 0]
    const B: [number, number, number] = [sep / 2, 0, 0]

    const lines = useMemo(() => {
        const E = (x: number, y: number): [number, number] => {
            const f = (q: number, cx: number) => { const dx = x - cx, r2 = dx * dx + y * y + 1e-4; return [q * dx / r2 ** 1.5, q * y / r2 ** 1.5] as [number, number] }
            const [a1, a2] = f(q1, A[0]), [b1, b2] = f(q2, B[0])
            return [a1 + b1, a2 + b2]
        }
        const out: [number, number, number][][] = []
        const src = q1 !== 0 ? A : B, qs = q1 !== 0 ? q1 : q2
        for (let i = 0; i < 12; i++) {
            const th = (i / 12) * Math.PI * 2
            let x = src[0] + Math.cos(th) * 0.32 * Math.sign(qs), y = Math.sin(th) * 0.32
            const pts: [number, number, number][] = []
            for (let s = 0; s < 60; s++) {
                pts.push([x, y, 0])
                const [ex, ey] = E(x, y); const m = Math.hypot(ex, ey) + 1e-6
                x += ex / m * 0.09; y += ey / m * 0.09
                const dB = Math.hypot(x - B[0], y), dA = Math.hypot(x - A[0], y)
                if ((q2 !== 0 && dB < 0.3) || (q1 !== 0 && dA < 0.3) || Math.abs(x) > 3 || Math.abs(y) > 2.4) break
            }
            out.push(pts)
        }
        return out
    }, [q1, q2, sep])

    return (<>
        {lines.map((p, i) => <Line key={i} points={p} color="#7dd3fc" lineWidth={1.2} transparent opacity={0.75} />)}
        {q1 !== 0 && <Glow pos={A} color={q1 > 0 ? '#f87171' : '#60a5fa'} />}
        {q2 !== 0 && <Glow pos={B} color={q2 > 0 ? '#f87171' : '#60a5fa'} />}
        {q1 !== 0 && <Label pos={[A[0], 0.5, 0]}>{q1 > 0 ? '+' : '−'}</Label>}
        {q2 !== 0 && <Label pos={[B[0], 0.5, 0]}>{q2 > 0 ? '+' : '−'}</Label>}
    </>)
}

/* ═══ CIRCUIT — wire loop, battery, bulb, electron flow ═══ */
const Circuit: Scene = ({ v }) => {
    const closed = (v.switch ?? 0) > 0
    const volts = (v.voltage ?? 50) / 100
    const N = 60
    const dots = useRef<THREE.InstancedMesh>(null)
    const path = useMemo(() => new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.6, -0.8, 0), new THREE.Vector3(1.6, -0.8, 0),
        new THREE.Vector3(1.9, 0, 0), new THREE.Vector3(1.6, 0.8, 0),
        new THREE.Vector3(-1.6, 0.8, 0), new THREE.Vector3(-1.9, 0, 0),
    ], true), [])
    const wire = useMemo(() => path.getPoints(80).map(p => [p.x, p.y, p.z] as [number, number, number]), [path])
    const tmp = useMemo(() => new THREE.Object3D(), [])

    useFrame(({ clock }) => {
        if (!dots.current) return
        const t = clock.getElapsedTime() * (closed ? 0.06 + volts * 0.14 : 0)
        for (let i = 0; i < N; i++) {
            const p = path.getPointAt((i / N + t) % 1)
            tmp.position.copy(p); tmp.updateMatrix()
            dots.current.setMatrixAt(i, tmp.matrix)
        }
        dots.current.instanceMatrix.needsUpdate = true
    })

    return (<>
        <Line points={wire} color="#94a3b8" lineWidth={3} />
        {/* battery */}
        <group position={[-1.6, -0.8, 0]}>
            <mesh><boxGeometry args={[0.5, 0.34, 0.3]} /><meshStandardMaterial color="#334155" roughness={0.4} /></mesh>
            <Label pos={[0, 0.35, 0]} size={0.2} color="#fbbf24">⚡ cell</Label>
        </group>
        {/* bulb */}
        <group position={[1.6, 0.8, 0]}>
            <mesh><sphereGeometry args={[0.26, 20, 20]} />
                <meshStandardMaterial color="#fef3c7" emissive="#fbbf24" emissiveIntensity={closed ? 0.4 + volts * 3 : 0.05} transparent opacity={0.95} /></mesh>
            {closed && volts > 0.15 && <pointLight intensity={volts * 6} color="#fbbf24" distance={4} />}
            <Label pos={[0, 0.42, 0]} size={0.2}>💡</Label>
        </group>
        {/* electrons */}
        <instancedMesh ref={dots} args={[undefined, undefined, N]}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshStandardMaterial color="#67e8f9" emissive="#22d3ee" emissiveIntensity={closed ? 3 : 0.3} />
        </instancedMesh>
        {/* switch gap indicator */}
        {!closed && <Label pos={[0, -1.15, 0]} size={0.2} color="#f87171">switch open — no flow</Label>}
        {closed && <Label pos={[0, -1.15, 0]} size={0.2} color="#4ade80">electrons flowing · I ∝ V</Label>}
    </>)
}

/* ═══ PRISM — white light disperses into the spectrum ═══ */
const Prism: Scene = ({ v }) => {
    const spread = (v.angle ?? 60) / 100
    const prism = useMemo(() => {
        const s = new THREE.Shape()
        s.moveTo(-0.8, -0.6); s.lineTo(0.8, -0.6); s.lineTo(0, 0.8); s.closePath()
        return new THREE.ExtrudeGeometry(s, { depth: 0.5, bevelEnabled: false })
    }, [])
    const RAINBOW = ['#ef4444', '#f97316', '#facc15', '#4ade80', '#38bdf8', '#a78bfa']
    return (<>
        {/* incident white ray */}
        <Line points={[[-3, 0.45, 0.25], [-0.35, -0.05, 0.25]]} color="#ffffff" lineWidth={4} />
        <mesh geometry={prism} position={[0, 0, 0]}>
            <meshPhysicalMaterial color="#bae6fd" transmission={0.9} thickness={1.2} roughness={0.05} transparent opacity={0.75} />
        </mesh>
        {/* dispersed rays fan out */}
        {RAINBOW.map((c, i) => {
            const a = (-0.12 - i * 0.07) * (0.4 + spread)
            const pts: [number, number, number][] = [[0.35, -0.15, 0.25], [0.35 + 3.2, -0.15 + a * 3.2, 0.25]]
            return <Line key={c} points={pts} color={c} lineWidth={3} />
        })}
        <Label pos={[-2.4, 0.8, 0.25]} size={0.18} color="#e2e8f0">white light</Label>
        <Label pos={[2.2, 0.6, 0.25]} size={0.18} color="#facc15">spectrum — n depends on λ</Label>
    </>)
}

/* ═══ WAVE — a 3D string you can pluck ═══ */
const Wave: Scene = ({ v }) => {
    const A = (v.amplitude ?? 50) / 100 * 0.8
    const f = 0.8 + (v.frequency ?? 40) / 40
    const line = useRef<any>(null)
    const beads = useRef<THREE.InstancedMesh>(null)
    const tmp = useMemo(() => new THREE.Object3D(), [])
    const N = 28
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        const pts: THREE.Vector3[] = []
        for (let i = 0; i <= 120; i++) {
            const x = -3 + (i / 120) * 6
            pts.push(new THREE.Vector3(x, Math.sin(x * f * 1.4 - t * 3.2) * A, 0))
        }
        setLinePts(line, pts)
        if (beads.current) {
            for (let i = 0; i < N; i++) {
                const x = -3 + (i / (N - 1)) * 6
                tmp.position.set(x, Math.sin(x * f * 1.4 - t * 3.2) * A, 0)
                tmp.updateMatrix(); beads.current.setMatrixAt(i, tmp.matrix)
            }
            beads.current.instanceMatrix.needsUpdate = true
        }
    })
    return (<>
        <Line ref={line} points={Array.from({ length: 121 }, (_, i) => [-3 + (i / 120) * 6, 0, 0] as [number, number, number])} color="#38bdf8" lineWidth={3} />
        <instancedMesh ref={beads} args={[undefined, undefined, N]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#f472b6" emissive="#ec4899" emissiveIntensity={1.6} />
        </instancedMesh>
        <Label pos={[-3.2, 0.9, 0]} size={0.18} color="#fda4af">particles bob ⊥ travel</Label>
        <Label pos={[3.2, 0.9, 0]} size={0.18} color="#7dd3fc">wave travels →</Label>
    </>)
}

/* ═══ GAS — particles bouncing in a piston box ═══ */
const Gas: Scene = ({ v }) => {
    const temp = (v.temperature ?? 50) / 100
    const comp = (v.compression ?? 20) / 100
    const boxW = 3.4 * (1 - comp * 0.55)
    const N = 80
    const mesh = useRef<THREE.InstancedMesh>(null)
    const state = useMemo(() => Array.from({ length: N }, () => ({
        p: new THREE.Vector3((Math.random() - 0.5) * boxW, (Math.random() - 0.5) * 1.8, (Math.random() - 0.5) * 1.8),
        d: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
    })), [])
    const tmp = useMemo(() => new THREE.Object3D(), [])
    useFrame(() => {
        if (!mesh.current) return
        const sp = 0.02 + temp * 0.09
        const hw = boxW / 2 - 0.06
        state.forEach((s, i) => {
            s.p.addScaledVector(s.d, sp)
            if (Math.abs(s.p.x) > hw) { s.d.x *= -1; s.p.x = Math.sign(s.p.x) * hw }
            if (Math.abs(s.p.y) > 0.9) { s.d.y *= -1; s.p.y = Math.sign(s.p.y) * 0.9 }
            if (Math.abs(s.p.z) > 0.9) { s.d.z *= -1; s.p.z = Math.sign(s.p.z) * 0.9 }
            tmp.position.copy(s.p); tmp.updateMatrix()
            mesh.current!.setMatrixAt(i, tmp.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })
    const heat = temp > 0.66 ? '#f87171' : temp > 0.33 ? '#fbbf24' : '#60a5fa'
    return (<>
        <mesh>
            <boxGeometry args={[boxW, 2, 2]} />
            <meshPhysicalMaterial color="#94a3b8" transparent opacity={0.14} roughness={0.1} side={THREE.BackSide} />
        </mesh>
        {/* piston face */}
        <mesh position={[boxW / 2 + 0.15, 0, 0]}>
            <boxGeometry args={[0.22, 2, 2]} />
            <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.35} />
        </mesh>
        <instancedMesh ref={mesh} args={[undefined, undefined, N]}>
            <sphereGeometry args={[0.055, 8, 8]} />
            <meshStandardMaterial color={heat} emissive={heat} emissiveIntensity={1.8} />
        </instancedMesh>
        <Label pos={[0, 1.25, 0]} size={0.2} color={heat}>{temp > 0.66 ? 'hot — particles racing' : temp > 0.33 ? 'warm' : 'cold — slow drift'}</Label>
    </>)
}

/* ═══ PENDULUM — real period T ∝ √L ═══ */
const Pendulum: Scene = ({ v }) => {
    const L = 0.8 + (v.length ?? 50) / 100 * 1.8
    const pivot = useRef<THREE.Group>(null)
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        const T = Math.sqrt(L / 0.9) * 1.4          // T ∝ √L
        pivot.current!.rotation.z = Math.sin(t * (Math.PI * 2 / T)) * 0.7
    })
    return (<>
        <mesh position={[0, 1.4, 0]}><boxGeometry args={[3, 0.12, 0.12]} /><meshStandardMaterial color="#475569" /></mesh>
        <group ref={pivot} position={[0, 1.35, 0]}>
            <mesh position={[0, -L / 2, 0]}><cylinderGeometry args={[0.02, 0.02, L]} /><meshStandardMaterial color="#94a3b8" /></mesh>
            <Glow pos={[0, -L, 0]} r={0.22} color="#f472b6" />
        </group>
        <Label pos={[0, -1.5, 0]} size={0.2} color="#fda4af">T ∝ √L — longer swings slower</Label>
    </>)
}

/* ═══ ORBIT — launch speed decides: fall, orbit, or escape ═══ */
const Orbit: Scene = ({ v }) => {
    const speed = (v.speed ?? 30) / 100
    const planet = useRef<THREE.Group>(null)
    const trail = useRef<any>(null)
    const pts = useRef<THREE.Vector3[]>([])
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        const r = 1.9
        const w = 0.4 + speed * 1.2
        const x = Math.cos(t * w) * r, z = Math.sin(t * w) * r * 0.7
        const y = speed < 0.35 ? Math.max(-1.1, -((t * w) % 6) * 0.4) : speed > 0.8 ? ((t * w) % 8) * 0.5 - 1 : 0
        planet.current?.position.set(x, y, z)
        pts.current.push(new THREE.Vector3(x, y, z))
        if (pts.current.length > 90) pts.current.shift()
        setLinePts(trail, pts.current)
    })
    return (<>
        <Glow pos={[0, 0, 0]} r={0.45} color="#fbbf24" />
        <pointLight position={[0, 0, 0]} intensity={8} color="#fbbf24" />
        <group ref={planet}>
            <mesh><sphereGeometry args={[0.16, 16, 16]} /><meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={1.4} /></mesh>
        </group>
        <Line ref={trail} points={[[0, 0, 0], [0.01, 0, 0]]} color="#38bdf8" lineWidth={1.5} transparent opacity={0.7} />
        <Label pos={[0, -1.6, 0]} size={0.19} color="#93c5fd">{speed < 0.35 ? 'too slow — gravity wins' : speed > 0.8 ? 'too fast — escaping!' : 'stable orbit'}</Label>
    </>)
}

/* ═══ ATOM — nucleus + electron shells ═══ */
const Atom: Scene = ({ v }) => {
    const n = Math.max(1, Math.round(v.electrons ?? 3))
    const shells = useRef<THREE.Group>(null)
    useFrame(({ clock }) => { if (shells.current) shells.current.rotation.y = clock.getElapsedTime() * 0.4 })
    const shellOf = (i: number) => (i < 2 ? 0 : i < 10 ? 1 : 2)
    return (<>
        <Glow pos={[0, 0, 0]} r={0.3} color="#fb7185" />
        <Label pos={[0, 0.55, 0]} size={0.18} color="#fda4af">nucleus</Label>
        <group ref={shells}>
            {[0.8, 1.3, 1.8].slice(0, Math.max(1, shellOf(n - 1) + 1)).map((r, si) => (
                <group key={si}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[r, 0.008, 8, 64]} />
                        <meshBasicMaterial color="#475569" transparent opacity={0.6} />
                    </mesh>
                    {Array.from({ length: n }, (_, i) => ({ i, s: shellOf(i) })).filter(e => e.s === si).map((e, j, arr) => {
                        const th = (j / arr.length) * Math.PI * 2
                        return <Glow key={e.i} pos={[Math.cos(th) * r, 0, Math.sin(th) * r]} r={0.09} color="#67e8f9" />
                    })}
                </group>
            ))}
        </group>
        <Label pos={[0, -2.1, 0]} size={0.19} color="#a5b4fc">{`${n} electron${n > 1 ? 's' : ''} in shells — 2, 8, …`}</Label>
    </>)
}

/* ═══ LENS — rays converge through a biconvex lens ═══ */
const Lens: Scene = ({ v }) => {
    const f = 0.8 + (v.focal ?? 50) / 100 * 2     // focal length in scene units
    const objX = -2.6
    // image position via 1/f = 1/do + 1/di → di = f*do/(do-f)
    const dobj = Math.abs(objX), di = dobj > f ? (f * dobj) / (dobj - f) : 0
    const m = di ? di / dobj : 0
    return (<>
        {/* lens body — two intersecting spheres' intersection ~ biconvex */}
        <mesh rotation={[0, 0, 0]}>
            <sphereGeometry args={[0.75, 32, 32]} />
            <meshPhysicalMaterial color="#bae6fd" transmission={0.85} thickness={0.4} roughness={0.05} transparent opacity={0.6} />
        </mesh>
        <mesh scale={[0.32, 1, 0.32]}><sphereGeometry args={[0.78, 32, 32]} />
            <meshPhysicalMaterial color="#e0f2fe" transmission={0.92} thickness={0.3} roughness={0.05} transparent opacity={0.85} /></mesh>
        {/* axis */}
        <Line points={[[-3.4, 0, 0], [3.4, 0, 0]]} color="#334155" lineWidth={1} dashed dashSize={0.1} gapSize={0.06} />
        {/* object arrow */}
        <group position={[objX, 0, 0]}>
            <mesh position={[0, 0.35, 0]}><coneGeometry args={[0.08, 0.18, 8]} /><meshStandardMaterial color="#4ade80" emissive="#22c55e" emissiveIntensity={1.2} /></mesh>
            <mesh position={[0, 0.15, 0]}><cylinderGeometry args={[0.025, 0.025, 0.5]} /><meshStandardMaterial color="#4ade80" /></mesh>
        </group>
        {/* rays: parallel → through F; through center → straight */}
        {di > 0 && di < 3.2 ? (<>
            <Line points={[[objX, 0.45, 0], [0, 0.45, 0], [di, -0.45 * m, 0], [3.4, -0.45 * m - (3.4 - di) * (0.45 * (1 + m)) / Math.max(di, 0.001) * 0.4, 0]]} color="#facc15" lineWidth={2} />
            <Line points={[[objX, 0.45, 0], [0, 0.45 * (1 - 0) * 0.9, 0], [di, -0.45 * m, 0]]} color="#fb923c" lineWidth={2} />
            {/* image arrow — inverted */}
            <group position={[di, 0, 0]}>
                <mesh position={[0, -0.45 * m + 0.05, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.08, 0.16, 8]} /><meshStandardMaterial color="#f472b6" emissive="#ec4899" emissiveIntensity={1.2} /></mesh>
                <mesh position={[0, -0.22 * m, 0]}><cylinderGeometry args={[0.025, 0.025, 0.45 * m]} /><meshStandardMaterial color="#f472b6" /></mesh>
            </group>
            <Label pos={[di, -0.6 * m - 0.25, 0]} size={0.16} color="#f9a8d4">real, inverted image</Label>
        </>) : (
            <Line points={[[objX, 0.45, 0], [0, 0.45, 0], [3.4, 0.45 + (3.4) * (0.45 / Math.max(dobj - 0.01, 0.01)) * 0.25, 0]]} color="#facc15" lineWidth={2} />
        )}
        {/* focal points */}
        {[f, -f].map(x => <Label key={x} pos={[x, -0.3, 0]} size={0.17} color="#fbbf24">F</Label>)}
    </>)
}

/* ═══ TITRATE — burette drips into a flask; colour flips at endpoint ═══ */
const Titrate: Scene = ({ v }) => {
    const d = (v.drops ?? 0) / 100
    const pH = d < 0.45 ? 2 + d * 8 : d < 0.55 ? 7 : 7 + (d - 0.55) * 18
    const pink = Math.min(1, Math.max(0, (pH - 8.2) / 1.5))
    const liquid = useMemo(() => new THREE.Color('#f8fafc').lerp(new THREE.Color('#f472b6'), pink), [pink])
    const drop = useRef<THREE.Mesh>(null)
    useFrame(({ clock }) => {
        if (drop.current && d < 1) {
            const t = (clock.getElapsedTime() * 1.6) % 1
            drop.current.position.y = 1.4 - t * 1.1
            drop.current.visible = t < 0.95
        } else if (drop.current) drop.current.visible = false
    })
    return (<>
        {/* burette */}
        <mesh position={[0, 1.5, 0]}><cylinderGeometry args={[0.07, 0.07, 0.9, 16]} />
            <meshPhysicalMaterial color="#e2e8f0" transparent opacity={0.5} roughness={0.1} /></mesh>
        <mesh ref={drop} position={[0, 1.4, 0]}><sphereGeometry args={[0.05, 10, 10]} /><meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={1.5} /></mesh>
        {/* flask */}
        <mesh position={[0, -0.5, 0]}><coneGeometry args={[0.9, 1.3, 32, 1, true]} />
            <meshPhysicalMaterial color="#cbd5e1" transparent opacity={0.3} roughness={0.1} side={THREE.DoubleSide} /></mesh>
        {/* liquid */}
        <mesh position={[0, -0.85, 0]}><cylinderGeometry args={[0.55, 0.72, 0.5, 32]} />
            <meshStandardMaterial color={liquid} emissive={liquid} emissiveIntensity={pink * 1.6} transparent opacity={0.9} /></mesh>
        <Label pos={[0, -1.5, 0]} size={0.2} color={pink > 0.3 ? '#f9a8d4' : '#cbd5e1'}>
            {pH < 7 ? `acidic · pH ${pH.toFixed(1)}` : pink > 0.3 ? `endpoint! pH ${pH.toFixed(1)}` : `neutral · pH ${pH.toFixed(1)}`}
        </Label>
    </>)
}

/* ═══ VECTOR — a + b = resultant on a grid ═══ */
const Vector: Scene = ({ v }) => {
    const ax = (v.ax ?? 60) / 20 - 2.5, ay = (v.ay ?? 50) / 20 - 2.5
    const bx = (v.bx ?? 40) / 20 - 2, by = (v.by ?? 60) / 20 - 2
    const Arrow = ({ to, color }: { to: [number, number, number]; color: string }) => {
        const dir = new THREE.Vector3(...to); const len = dir.length()
        return (<group>
            <Line points={[[0, 0, 0], to]} color={color} lineWidth={4} />
            <mesh position={to}><sphereGeometry args={[0.08, 10, 10]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} /></mesh>
        </group>)
    }
    return (<>
        <gridHelper args={[7, 14, '#1e293b', '#0f172a']} position={[0, -1.4, 0]} />
        <Arrow to={[ax, ay, 0]} color="#4ade80" />
        <Arrow to={[ax + bx, ay + by, 0]} color="#f472b6" />
        {/* b shown from tip of a (parallelogram) */}
        <Line points={[[ax, ay, 0], [ax + bx, ay + by, 0]]} color="#f472b6" lineWidth={2} dashed dashSize={0.08} gapSize={0.05} />
        <Label pos={[ax / 2 - 0.3, ay / 2, 0]} size={0.18} color="#86efac">a</Label>
        <Label pos={[(ax + bx) / 2 + 0.4, (ay + by) / 2, 0]} size={0.18} color="#f9a8d4">a + b</Label>
    </>)
}

/* ═══ EMAG — magnet through a coil → induced current ═══ */
const Emag: Scene = ({ v }) => {
    const speed = (v.speed ?? 50) / 100
    const turns = 3 + Math.round((v.turns ?? 40) / 20)
    const mag = useRef<THREE.Group>(null)
    const glow = useRef<THREE.MeshStandardMaterial>(null)
    const coil = useMemo(() => {
        const pts: THREE.Vector3[] = []
        for (let i = 0; i <= turns * 40; i++) {
            const t = (i / 40) / turns * 2 - 1
            pts.push(new THREE.Vector3(t * 1.1, Math.cos(i / 40 * Math.PI * 2) * 0.4, Math.sin(i / 40 * Math.PI * 2) * 0.4))
        }
        return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), turns * 40, 0.025, 8)
    }, [turns])
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        const x = Math.sin(t * (0.8 + speed * 2.4)) * 1.6
        mag.current?.position.set(x, 0, 0)
        const induced = Math.abs(Math.cos(t * (0.8 + speed * 2.4))) * speed
        if (glow.current) glow.current.emissiveIntensity = 0.3 + induced * 3
    })
    return (<>
        <mesh geometry={coil}>
            <meshStandardMaterial ref={glow} color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.5} metalness={0.7} roughness={0.3} />
        </mesh>
        <group ref={mag}>
            <mesh position={[-0.14, 0, 0]}><boxGeometry args={[0.28, 0.22, 0.22]} /><meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} /></mesh>
            <mesh position={[0.14, 0, 0]}><boxGeometry args={[0.28, 0.22, 0.22]} /><meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.8} /></mesh>
        </group>
        <Label pos={[0, 0.85, 0]} size={0.19} color="#fde68a">moving magnet → changing flux → current</Label>
    </>)
}

/* ═══ CELL — zoom inside an organic cell ═══ */
const Cell: Scene = ({ v }) => {
    const zoom = (v.zoom ?? 30) / 100
    const blob = useRef<THREE.Mesh>(null)
    useFrame(({ clock }) => {
        if (blob.current) blob.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 1.4) * 0.03)
    })
    return (<>
        <mesh ref={blob}>
            <sphereGeometry args={[1.5, 48, 48]} />
            <meshPhysicalMaterial color="#86efac" transmission={0.75} thickness={1.5} roughness={0.3} transparent opacity={0.8} />
        </mesh>
        {/* nucleus */}
        <Glow pos={[0.2, 0.1, 0]} r={0.5} color="#a78bfa" />
        {/* organelles visible when zoomed */}
        {zoom > 0.5 && (<>
            {[...Array(6)].map((_, i) => {
                const th = i * 1.05, r = 0.95
                return <mesh key={i} position={[Math.cos(th) * r, Math.sin(th * 1.7) * 0.7, Math.sin(th) * r]} rotation={[th, th * 0.6, 0]}>
                    <capsuleGeometry args={[0.09, 0.3, 6, 12]} />
                    <meshStandardMaterial color="#fb923c" emissive="#f97316" emissiveIntensity={1.4} />
                </mesh>
            })}
            <Label pos={[0.2, 0.8, 0]} size={0.16} color="#ddd6fe">nucleus</Label>
            <Label pos={[-1, -0.9, 0]} size={0.16} color="#fdba74">mitochondria</Label>
        </>)}
        <Label pos={[0, -1.9, 0]} size={0.19} color="#bbf7d0">{zoom > 0.5 ? 'organelles resolved' : 'zoom in to see inside'}</Label>
    </>)
}

/* ═══ MOON — phase sweep around Earth ═══ */
const Moon: Scene = ({ v }) => {
    const phase = (v.phase ?? 0) / 100 * Math.PI * 2
    const mx = Math.cos(phase) * 2.2, mz = Math.sin(phase) * 2.2
    return (<>
        <Glow pos={[0, 0, 0]} r={0.4} color="#60a5fa" />
        {/* sunlight from the right */}
        <directionalLight position={[6, 0, 0]} intensity={2.4} color="#fef3c7" />
        <mesh position={[mx, 0, mz]}>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.9} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
            <torusGeometry args={[2.2, 0.006, 8, 80]} />
            <meshBasicMaterial color="#334155" transparent opacity={0.5} />
        </mesh>
        <Label pos={[0, -1.4, 0]} size={0.19} color="#c7d2fe">{['new moon', 'waxing crescent', 'first quarter', 'waxing gibbous', 'full moon'][Math.min(4, Math.floor((v.phase ?? 0) / 20))]}</Label>
        <Label pos={[3.1, 0.5, 0]} size={0.16} color="#fde68a">☀ light →</Label>
    </>)
}

/* ═══ DNA — double helix unzips ═══ */
const Dna: Scene = ({ v }) => {
    const unzip = (v.unzip ?? 0) / 100
    const N = 40
    const { a, b, rungs } = useMemo(() => {
        const a: THREE.Vector3[] = [], b: THREE.Vector3[] = [], rungs: [THREE.Vector3, THREE.Vector3][] = []
        for (let i = 0; i < N; i++) {
            const t = i / N * Math.PI * 4, y = -1.4 + (i / N) * 2.8
            const split = (i / N) < unzip ? unzip * 1.6 : 0
            const ax = Math.cos(t) * 0.5 - split, bx = Math.cos(t + Math.PI) * 0.5 + split
            const az = Math.sin(t) * 0.5, bz = Math.sin(t + Math.PI) * 0.5
            a.push(new THREE.Vector3(ax, y, az)); b.push(new THREE.Vector3(bx, y, bz))
            if (i % 4 === 0 && (i / N) >= unzip) rungs.push([a[i], b[i]])
        }
        return { a, b, rungs }
    }, [unzip])
    return (<>
        <Line points={a} color="#38bdf8" lineWidth={3} />
        <Line points={b} color="#f472b6" lineWidth={3} />
        {rungs.map((r, i) => <Line key={i} points={r} color="#94a3b8" lineWidth={2} />)}
        <Label pos={[0, 1.75, 0]} size={0.18} color="#bae6fd">{unzip > 0.6 ? 'unzipped — replication ready' : 'A·T  G·C base pairs'}</Label>
    </>)
}

/* ═══ PROJECTILE — real ballistic arc ═══ */
const Projectile: Scene = ({ v }) => {
    const speed = (v.speed ?? 60) / 100 * 4 + 1
    const ang = (v.angle ?? 45) * Math.PI / 180
    const ball = useRef<THREE.Group>(null)
    const trail = useRef<any>(null)
    const pts = useRef<THREE.Vector3[]>([])
    useFrame(({ clock }) => {
        const t = (clock.getElapsedTime() * 0.8) % 3.2
        const x = -2.4 + speed * Math.cos(ang) * t
        const y = Math.max(-1.2, -1.2 + speed * Math.sin(ang) * t - 2.4 * t * t)
        ball.current?.position.set(x, y, 0)
        if (x < -2.3) pts.current = []
        pts.current.push(new THREE.Vector3(x, y, 0))
        if (pts.current.length > 70) pts.current.shift()
        setLinePts(trail, pts.current)
    })
    return (<>
        <mesh position={[0, -1.3, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[8, 3]} /><meshStandardMaterial color="#14532d" /></mesh>
        <group ref={ball}><mesh><sphereGeometry args={[0.14, 16, 16]} /><meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.8} /></mesh></group>
        <Line ref={trail} points={[[0, 0, 0], [0.01, 0, 0]]} color="#fbbf24" lineWidth={2} transparent opacity={0.7} dashed dashSize={0.08} gapSize={0.05} />
        <Label pos={[0, 1.5, 0]} size={0.19} color="#fde68a">{`${v.angle ?? 45}° — x keeps v, y feels g`}</Label>
    </>)
}

/* ═══ HEART — beating heart + ECG trace ═══ */
const Heart: Scene = ({ v }) => {
    const bpm = v.rate ?? 70
    const heart = useRef<THREE.Mesh>(null)
    const ecg = useRef<any>(null)
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        const beat = Math.pow(Math.max(0, Math.sin(t * bpm / 60 * Math.PI * 2)), 8)
        heart.current?.scale.setScalar(1 + beat * 0.12)
        // scrolling ECG trace
        const pts: THREE.Vector3[] = []
        for (let i = 0; i <= 100; i++) {
            const x = -3 + (i / 100) * 6
            const ph = ((t * bpm / 60 * Math.PI * 2 - x * 2) % (Math.PI * 2))
            const y = -1.5 + (ph < 0.3 ? Math.sin(ph / 0.3 * Math.PI) * 0.5 : ph < 0.5 ? -Math.sin((ph - 0.3) / 0.2 * Math.PI) * 0.15 : 0)
            pts.push(new THREE.Vector3(x, y, 0))
        }
        setLinePts(ecg, pts)
    })
    return (<>
        <mesh ref={heart}><sphereGeometry args={[0.55, 32, 32]} />
            <meshStandardMaterial color="#f87171" emissive="#dc2626" emissiveIntensity={1.6} roughness={0.35} /></mesh>
        <mesh position={[0.3, 0.35, 0.2]} rotation={[0.4, 0, -0.5]}><capsuleGeometry args={[0.12, 0.4, 6, 12]} /><meshStandardMaterial color="#ef4444" /></mesh>
        <mesh position={[-0.28, 0.38, 0.15]} rotation={[0.3, 0, 0.55]}><capsuleGeometry args={[0.11, 0.38, 6, 12]} /><meshStandardMaterial color="#3b82f6" /></mesh>
        <Line ref={ecg} points={[[-3, -1.5, 0], [3, -1.5, 0]]} color="#4ade80" lineWidth={2} />
        <Label pos={[0, -2, 0]} size={0.18} color="#86efac">{`${bpm} bpm`}</Label>
    </>)
}

/* ═══ CONIC — a plane slices a double cone (math) ═══ */
const Conic: Scene = ({ v }) => {
    const tilt = (v.tilt ?? 20) / 100
    const kind = tilt < 0.25 ? 'circle' : tilt < 0.55 ? 'ellipse' : tilt < 0.8 ? 'parabola' : 'hyperbola'
    const plane = useRef<THREE.Mesh>(null)
    useFrame(() => { if (plane.current) plane.current.rotation.x = -0.3 - tilt * 1.4 })
    return (<>
        <mesh position={[0, 0.9, 0]}><coneGeometry args={[1, 1.8, 48, 1, true]} />
            <meshPhysicalMaterial color="#a78bfa" transparent opacity={0.35} side={THREE.DoubleSide} roughness={0.2} /></mesh>
        <mesh position={[0, -0.9, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[1, 1.8, 48, 1, true]} />
            <meshPhysicalMaterial color="#a78bfa" transparent opacity={0.35} side={THREE.DoubleSide} roughness={0.2} /></mesh>
        <mesh ref={plane} position={[0, 0.35 - tilt * 0.5, 0]}>
            <boxGeometry args={[2.6, 0.015, 2.6]} />
            <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.7} transparent opacity={0.55} />
        </mesh>
        {/* the conic curve — shape follows the actual conic type */}
        {kind === 'hyperbola' ? (
            [[0.55, -1.15], [-0.55, 1.15]].map(([x, y], i) => (
                <Line key={i} points={Array.from({ length: 24 }, (_, j) => {
                    const t = (j / 23 - 0.5) * 2.2
                    return [x + Math.sinh(t) * 0.28, y + Math.cosh(t) * 0.22 * (i ? -1 : 1), 0] as [number, number, number]
                })} color="#4ade80" lineWidth={3} />
            ))
        ) : kind === 'parabola' ? (
            <Line points={Array.from({ length: 30 }, (_, j) => {
                const t = (j / 29 - 0.5) * 2.4
                return [t * 0.7, -0.35 + t * t * 0.35, 0] as [number, number, number]
            })} color="#4ade80" lineWidth={3} />
        ) : (
            <mesh position={[0, 0.35 - tilt * 0.5 + 0.01, 0]} rotation={[-0.3 - tilt * 1.4, 0, 0]}
                scale={kind === 'ellipse' ? [1, 0.72, 1] : [1, 1, 1]}>
                <torusGeometry args={[0.42 - tilt * 0.28, 0.02, 8, 48]} />
                <meshStandardMaterial color="#4ade80" emissive="#22c55e" emissiveIntensity={2} />
            </mesh>
        )}
        <Label pos={[0, -2, 0]} size={0.22} color="#fde68a">{`the slice makes a ${kind}`}</Label>
    </>)
}

/* ═══ SPECTRUM — sweep the EM spectrum (physics) ═══ */
const Spectrum: Scene = ({ v }) => {
    const band = (v.band ?? 40) / 100
    const line = useRef<any>(null)
    const N = 120
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        const lambda = 3 - band * 2.6            // long radio → short gamma
        const pts: THREE.Vector3[] = []
        for (let i = 0; i <= N; i++) {
            const x = -3 + (i / N) * 6
            pts.push(new THREE.Vector3(x, Math.sin(x * (6 / lambda) - t * 4) * 0.5, 0))
        }
        setLinePts(line, pts)
    })
    const name = ['radio', 'microwave', 'infrared', 'visible', 'UV', 'X-ray', 'gamma'][Math.min(6, Math.floor(band * 7))]
    const col = band < 0.15 ? '#f87171' : band < 0.3 ? '#fb923c' : band < 0.5 ? '#4ade80' : band < 0.7 ? '#38bdf8' : '#a78bfa'
    return (<>
        <Line ref={line} points={[[-3, 0, 0], [3, 0, 0]]} color={col} lineWidth={3} />
        <Label pos={[0, 1, 0]} size={0.24} color={col}>{name}</Label>
        <Label pos={[0, -1, 0]} size={0.18} color="#94a3b8">λ shrinks → energy grows</Label>
    </>)
}

/* ═══ MITOSIS — chromosomes split and migrate (bio) ═══ */
const Mitosis: Scene = ({ v }) => {
    const stage = (v.stage ?? 0) / 100
    const names = ['prophase — chromosomes condense', 'metaphase — line up at the equator', 'anaphase — pulled apart', 'telophase — two new cells']
    const phase = Math.min(3, Math.floor(stage * 4))
    const spread = stage < 0.5 ? 0 : (stage - 0.5) * 2 * 0.9
    return (<>
        <mesh><sphereGeometry args={[1.6, 32, 32]} />
            <meshPhysicalMaterial color="#86efac" transparent opacity={0.15 + (1 - stage) * 0.15} roughness={0.3} /></mesh>
        {[0.35, -0.35].map((x, i) => (<group key={i} position={[x + (i ? spread : -spread), 0, 0]}>
            {[0, 1, 2].map(j => (
                <mesh key={j} position={[0, (j - 1) * 0.35, (j - 1) * 0.15]} rotation={[0.4 * (j - 1), 0, i ? -0.4 : 0.4]}>
                    <torusKnotGeometry args={[0.13, 0.045, 32, 6]} />
                    <meshStandardMaterial color={j === 1 ? '#f472b6' : '#a78bfa'} emissive={j === 1 ? '#ec4899' : '#8b5cf6'} emissiveIntensity={1.4} />
                </mesh>))}
        </group>))}
        {/* spindle fibres at anaphase */}
        {phase >= 2 && [-0.35, 0.35].map((x, i) => (
            <Line key={i} points={[[x * 2.4, 0, 0], [x + (i ? spread : -spread), 0, 0]]} color="#7dd3fc" lineWidth={1} transparent opacity={0.6} />
        ))}
        <Label pos={[0, -1.9, 0]} size={0.2} color="#bbf7d0">{names[phase]}</Label>
    </>)
}

/* ═══ EQUILIBRIUM — A ⇌ B particle balance (chem) ═══ */
const Equil: Scene = ({ v }) => {
    const add = (v.concentration ?? 30) / 100
    const N = 24
    const mesh = useRef<THREE.InstancedMesh>(null)
    const tmp = useMemo(() => new THREE.Object3D(), [])
    const state = useMemo(() => Array.from({ length: N }, (_, i) => ({
        p: new THREE.Vector3((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.4),
        d: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
        side: i < N / 2 ? 'A' : 'B',
    })), [])
    const target = Math.round(N * (0.25 + add * 0.5))   // add reactant → shift right
    useFrame(() => {
        if (!mesh.current) return
        const colA = new THREE.Color('#60a5fa'), colB = new THREE.Color('#f472b6')
        let aCount = 0
        state.forEach((s, i) => {
            s.p.addScaledVector(s.d, 0.02)
            if (Math.abs(s.p.x) > 1.6) s.d.x *= -1
            if (Math.abs(s.p.y) > 0.8) s.d.y *= -1
            if (Math.abs(s.p.z) > 0.7) s.d.z *= -1
            // stochastic flipping toward equilibrium ratio
            if (Math.random() < 0.002) s.side = s.side === 'A' ? 'B' : 'A'
            if (s.side === 'A') aCount++
            tmp.position.copy(s.p); tmp.updateMatrix()
            mesh.current!.setMatrixAt(i, tmp.matrix)
            mesh.current!.setColorAt(i, s.side === 'A' ? colA : colB)
        })
        // nudge toward Le Chatelier target
        if (aCount !== target && Math.random() < 0.05) {
            const flip = state.find(s => aCount > target ? s.side === 'A' : s.side === 'B')
            if (flip) flip.side = aCount > target ? 'B' : 'A'
        }
        mesh.current.instanceMatrix.needsUpdate = true
        if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true
    })
    return (<>
        <mesh><boxGeometry args={[3.4, 1.8, 1.6]} />
            <meshPhysicalMaterial color="#94a3b8" transparent opacity={0.12} side={THREE.BackSide} /></mesh>
        <instancedMesh ref={mesh} args={[undefined, undefined, N]}>
            <sphereGeometry args={[0.09, 10, 10]} />
            <meshStandardMaterial color="#ffffff" />
        </instancedMesh>
        <Label pos={[0, 1.2, 0]} size={0.19} color="#bae6fd">A (blue) ⇌ B (pink) — add A, watch it shift</Label>
    </>)
}

/* ═══ NEPHRON — blood filters through the tubule (bio) ═══ */
const Nephron: Scene = ({ v }) => {
    const flow = (v.flow ?? 50) / 100
    const mesh = useRef<THREE.InstancedMesh>(null)
    const tmp = useMemo(() => new THREE.Object3D(), [])
    const path = useMemo(() => new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.8, 0.8, 0), new THREE.Vector3(-0.8, 0.8, 0),
        new THREE.Vector3(-0.4, 0, 0), new THREE.Vector3(0, -0.8, 0),
        new THREE.Vector3(0.8, -0.8, 0), new THREE.Vector3(1.4, 0, 0), new THREE.Vector3(1.8, 0.8, 0),
    ]), [])
    const tube = useMemo(() => new THREE.TubeGeometry(path, 60, 0.12, 10), [path])
    const N = 40
    useFrame(({ clock }) => {
        if (!mesh.current) return
        const t = clock.getElapsedTime() * (0.03 + flow * 0.1)
        for (let i = 0; i < N; i++) {
            tmp.position.copy(path.getPointAt((i / N + t) % 1))
            tmp.updateMatrix(); mesh.current.setMatrixAt(i, tmp.matrix)
        }
        mesh.current.instanceMatrix.needsUpdate = true
    })
    return (<>
        <mesh geometry={tube}><meshPhysicalMaterial color="#fca5a5" transparent opacity={0.5} roughness={0.3} /></mesh>
        <instancedMesh ref={mesh} args={[undefined, undefined, N]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.8} />
        </instancedMesh>
        <Glow pos={[-1.8, 0.8, 0]} r={0.22} color="#f87171" />
        <Label pos={[-1.8, 1.2, 0]} size={0.17} color="#fecaca">glomerulus</Label>
        <Label pos={[0, -1.4, 0]} size={0.18} color="#fde68a">waste filters out — water + salts reabsorbed</Label>
    </>)
}

/* ═══ REFLEX — signal races the arc (bio) ═══ */
const Reflex: Scene = ({ v }) => {
    const speed = (v.speed ?? 50) / 100
    const sig = useRef<THREE.Mesh>(null)
    const path = useMemo(() => new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.4, -0.6, 0), new THREE.Vector3(-1.2, 0.4, 0),
        new THREE.Vector3(0, 0.8, 0), new THREE.Vector3(1.2, 0.4, 0), new THREE.Vector3(2.4, -0.6, 0),
    ]), [])
    useFrame(({ clock }) => {
        if (!sig.current) return
        const t = (clock.getElapsedTime() * (0.15 + speed * 0.5)) % 1
        sig.current.position.copy(path.getPointAt(t))
    })
    return (<>
        <Line points={path.getPoints(60).map(p => [p.x, p.y, p.z] as [number, number, number])} color="#a78bfa" lineWidth={4} />
        <mesh ref={sig}><sphereGeometry args={[0.13, 14, 14]} /><meshStandardMaterial color="#facc15" emissive="#eab308" emissiveIntensity={3} /></mesh>
        <Glow pos={[-2.4, -0.6, 0]} r={0.16} color="#f87171" />
        <Glow pos={[0, 0.85, 0]} r={0.14} color="#a78bfa" />
        <Glow pos={[2.4, -0.6, 0]} r={0.16} color="#4ade80" />
        <Label pos={[-2.4, -1, 0]} size={0.16} color="#fca5a5">receptor</Label>
        <Label pos={[0, 1.15, 0]} size={0.16} color="#ddd6fe">spinal cord</Label>
        <Label pos={[2.4, -1, 0]} size={0.16} color="#86efac">muscle</Label>
    </>)
}

/* ═══ DIGEST — food travels the tract (bio) ═══ */
const Digest: Scene = ({ v }) => {
    const prog = (v.progress ?? 0) / 100
    const path = useMemo(() => new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 1.6, 0), new THREE.Vector3(0.3, 0.9, 0),
        new THREE.Vector3(-0.5, 0.4, 0), new THREE.Vector3(0.5, -0.1, 0),
        new THREE.Vector3(-0.5, -0.6, 0), new THREE.Vector3(0.3, -1.1, 0), new THREE.Vector3(0, -1.7, 0),
    ]), [])
    const tube = useMemo(() => new THREE.TubeGeometry(path, 80, 0.14, 10), [path])
    const food = path.getPointAt(Math.min(0.999, prog))
    return (<>
        <mesh geometry={tube}><meshPhysicalMaterial color="#fda4af" transparent opacity={0.45} roughness={0.4} /></mesh>
        <Glow pos={[food.x, food.y, food.z]} r={0.14} color="#fbbf24" />
        <Label pos={[0.9, 1.6, 0]} size={0.16} color="#fecaca">mouth</Label>
        <Label pos={[0.9, -1.7, 0]} size={0.16} color="#fca5a5">exit</Label>
        <Label pos={[0, -2.1, 0]} size={0.18} color="#fde68a">{prog < 0.3 ? 'stomach churns' : prog < 0.7 ? 'small intestine absorbs' : 'large intestine dries'}</Label>
    </>)
}

/* ═══ SUPPLY — crossing curves in 3D (econ) ═══ */
const Supply: Scene = ({ v }) => {
    const s = (v.supply ?? 50) / 100, d = (v.demand ?? 50) / 100
    // supply: upward slope shifted by s; demand: downward shifted by d
    const sPts: [number, number, number][] = [], dPts: [number, number, number][] = []
    for (let i = 0; i <= 40; i++) {
        const x = -2.4 + (i / 40) * 4.8
        sPts.push([x, (x * 0.5 + (s - 0.5) * 1.6), 0])
        dPts.push([x, (-x * 0.5 - (d - 0.5) * 1.6), 0])
    }
    // equilibrium x where the two lines cross
    const ex = (s - 0.5) * 1.6 + (d - 0.5) * 1.6
    const ey = ex * 0.5 + (s - 0.5) * 1.6
    return (<>
        <Line points={[[-2.6, 0, 0], [2.6, 0, 0]]} color="#475569" lineWidth={1.5} />
        <Line points={[[0, -1.4, 0], [0, 1.4, 0]]} color="#475569" lineWidth={1.5} />
        <Line points={sPts} color="#38bdf8" lineWidth={3} />
        <Line points={dPts} color="#f472b6" lineWidth={3} />
        <Glow pos={[ex, ey, 0]} r={0.11} color="#fbbf24" />
        <Label pos={[ex, ey + 0.3, 0]} size={0.16} color="#fde68a">equilibrium price</Label>
        <Label pos={[2.2, 1.3, 0]} size={0.16} color="#7dd3fc">supply</Label>
        <Label pos={[2.2, -1.3, 0]} size={0.16} color="#f9a8d4">demand</Label>
    </>)
}

/* ═══ PH — probe slides the scale (chem) ═══ */
const Ph: Scene = ({ v }) => {
    const ph = (v.probe ?? 50) / 100 * 14
    const col = ph < 3 ? '#ef4444' : ph < 6 ? '#fb923c' : ph < 8 ? '#4ade80' : ph < 11 ? '#38bdf8' : '#a78bfa'
    return (<>
        {/* the scale */}
        {Array.from({ length: 15 }, (_, i) => (
            <mesh key={i} position={[-2.8 + i * 0.4, -0.6, 0]}>
                <boxGeometry args={[0.36, 0.16, 0.16]} />
                <meshStandardMaterial color={i < 3 ? '#ef4444' : i < 6 ? '#fb923c' : i < 8 ? '#4ade80' : i < 11 ? '#38bdf8' : '#a78bfa'}
                    emissive={i < 3 ? '#ef4444' : i < 6 ? '#fb923c' : i < 8 ? '#4ade80' : i < 11 ? '#38bdf8' : '#a78bfa'}
                    emissiveIntensity={Math.abs(i - ph) < 0.5 ? 2.2 : 0.15} />
            </mesh>))}
        {/* beaker */}
        <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[0.7, 0.55, 1.2, 32, 1, true]} />
            <meshPhysicalMaterial color="#cbd5e1" transparent opacity={0.3} roughness={0.1} side={THREE.DoubleSide} /></mesh>
        <mesh position={[0, 0.15, 0]}><cylinderGeometry args={[0.62, 0.52, 0.7, 32]} />
            <meshStandardMaterial color={col} emissive={col} emissiveIntensity={1.4} transparent opacity={0.85} /></mesh>
        <Label pos={[0, 1.3, 0]} size={0.22} color={col}>{`pH ${ph.toFixed(1)} — ${ph < 7 ? 'acidic' : ph > 7 ? 'basic' : 'neutral'}`}</Label>
    </>)
}

/* ═══ BALANCE — seesaw tips by weight (junior) ═══ */
const Balance: Scene = ({ v }) => {
    const l = (v.left ?? 0) / 10, r = (v.right ?? 0) / 10
    const tilt = (r - l) * 0.35
    return (<>
        <mesh position={[0, -0.9, 0]}><coneGeometry args={[0.4, 0.9, 4]} /><meshStandardMaterial color="#64748b" /></mesh>
        <group rotation={[0, 0, tilt]}>
            <mesh position={[0, -0.42, 0]}><boxGeometry args={[4.4, 0.1, 0.5]} /><meshStandardMaterial color="#f59e0b" /></mesh>
            {[...Array(Math.round(v.left ?? 0))].map((_, i) => (
                <mesh key={'l' + i} position={[-1.9 + (i % 3) * 0.32, -0.2 + Math.floor(i / 3) * 0.3, 0]}>
                    <boxGeometry args={[0.26, 0.26, 0.26]} /><meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.9} /></mesh>))}
            {[...Array(Math.round(v.right ?? 0))].map((_, i) => (
                <mesh key={'r' + i} position={[1.9 - (i % 3) * 0.32, -0.2 + Math.floor(i / 3) * 0.3, 0]}>
                    <boxGeometry args={[0.26, 0.26, 0.26]} /><meshStandardMaterial color="#f472b6" emissive="#ec4899" emissiveIntensity={0.9} /></mesh>))}
        </group>
        <Label pos={[0, 0.9, 0]} size={0.22} color={l === r && l > 0 ? '#4ade80' : '#e2e8f0'}>
            {l === r && l > 0 ? 'BALANCED!' : l > r ? 'left is heavier' : 'right is heavier'}
        </Label>
    </>)
}

/* ═══ POUR — water rises in the jug (junior) ═══ */
const Pour: Scene = ({ v }) => {
    const fill = (v.fill ?? 0) / 100
    const drops = useRef<THREE.Group>(null)
    useFrame(({ clock }) => {
        if (drops.current) drops.current.children.forEach((d, i) => {
            d.position.y = 1.5 - ((clock.getElapsedTime() * 1.4 + i * 0.37) % 1) * 1.1
        })
    })
    return (<>
        <mesh position={[0, -0.2, 0]}><cylinderGeometry args={[0.8, 0.7, 2, 32, 1, true]} />
            <meshPhysicalMaterial color="#cbd5e1" transparent opacity={0.25} roughness={0.1} side={THREE.DoubleSide} /></mesh>
        <mesh position={[0, -1.15 + fill * 0.95, 0]}><cylinderGeometry args={[0.72, 0.66, Math.max(0.05, fill * 1.9), 32]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={1.2} transparent opacity={0.85} /></mesh>
        {fill > 0 && fill < 1 && <group ref={drops}>
            {[...Array(4)].map((_, i) => (
                <mesh key={i} position={[0, 1.5 - i * 0.28, 0]}>
                    <sphereGeometry args={[0.05, 8, 8]} /><meshStandardMaterial color="#7dd3fc" transparent opacity={0.8} /></mesh>))}
        </group>}
        <Label pos={[0, 1.6, 0]} size={0.22} color="#7dd3fc">{`${Math.round(fill * 100)}% full`}</Label>
    </>)
}

/* ═══ GROW — sun + water → the plant rises (junior) ═══ */
const Grow: Scene = ({ v }) => {
    const g = Math.min(1, ((v.sun ?? 0) + (v.water ?? 0)) / 200)
    const h = 0.3 + g * 1.6
    return (<>
        <mesh position={[0, -1.15, 0]}><cylinderGeometry args={[2, 2.2, 0.35, 24]} /><meshStandardMaterial color="#713f12" /></mesh>
        <Glow pos={[1.8, 1.3, -0.5]} r={0.22 + (v.sun ?? 0) / 100 * 0.15} color="#facc15" />
        {(v.water ?? 0) > 20 && [...Array(8)].map((_, i) => (
            <mesh key={i} position={[-1.2 + i * 0.3, 0.9 - (i % 3) * 0.3, 0]}><sphereGeometry args={[0.04, 8, 8]} />
                <meshStandardMaterial color="#7dd3fc" transparent opacity={0.8} /></mesh>))}
        <mesh position={[0, -1 + h / 2, 0]}><cylinderGeometry args={[0.05, 0.08, h, 10]} />
            <meshStandardMaterial color="#22c55e" emissive="#16a34a" emissiveIntensity={0.7} /></mesh>
        {g > 0.3 && [-0.35, 0.35].map((x, i) => (
            <mesh key={i} position={[x, -0.9 + h * 0.7, 0]} rotation={[0, 0, i ? -0.6 : 0.6]} scale={[1, 0.4, 0.6]}>
                <sphereGeometry args={[0.22, 16, 12]} /><meshStandardMaterial color="#4ade80" emissive="#22c55e" emissiveIntensity={0.8} /></mesh>))}
        {g > 0.75 && <Glow pos={[0, -1 + h + 0.15, 0]} r={0.18} color="#f472b6" />}
        <Label pos={[0, 1.7, 0]} size={0.2} color="#bbf7d0">{g > 0.75 ? 'blooming!' : g > 0.3 ? 'growing…' : 'needs sun + water'}</Label>
    </>)
}

/* ═══ MOLECULE — ball & stick, atoms bond in 3D (chem/biotech) ═══ */
const Molecule: Scene = ({ v }) => {
    const n = Math.max(2, Math.min(8, Math.round(v.atoms ?? 4)))
    const g = useRef<THREE.Group>(null)
    useFrame(({ clock }) => { if (g.current) g.current.rotation.y = clock.getElapsedTime() * 0.5 })
    // carbon chain skeleton — zigzag like real hydrocarbons
    const pos = useMemo(() => Array.from({ length: n }, (_, i) => new THREE.Vector3(
        (i - (n - 1) / 2) * 0.72, (i % 2 ? 0.36 : -0.36) * (n > 2 ? 1 : 0), (i % 3 - 1) * 0.26)), [n])
    const bonds = useMemo(() => pos.slice(0, -1).map((p, i) => {
        const mid = p.clone().add(pos[i + 1]).multiplyScalar(0.5)
        const d = pos[i + 1].clone().sub(p); const len = d.length()
        return { mid, len, rot: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()) }
    }), [pos])
    return (<>
        <group ref={g}>
            {pos.map((p, i) => (<group key={i} position={p}>
                <Glow pos={[0, 0, 0]} r={0.26} color={i === 0 ? '#f472b6' : '#67e8f9'} />
                {/* hydrogen stubs */}
                {n > 2 && <Glow pos={[0, i % 2 ? -0.38 : 0.38, 0.2]} r={0.11} color="#e2e8f0" />}
            </group>))}
            {bonds.map((b, i) => (
                <mesh key={i} position={b.mid} quaternion={b.rot}>
                    <cylinderGeometry args={[0.06, 0.06, b.len, 10]} />
                    <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.3} />
                </mesh>))}
        </group>
        <Label pos={[0, -1.4, 0]} size={0.2} color="#bae6fd">{`${n} atoms bonded — spin the chain`}</Label>
    </>)
}

/* ═══ SOLID — cylinder with live radius/height (math mensuration) ═══ */
const Solid: Scene = ({ v }) => {
    const r = 0.4 + (v.radius ?? 50) / 100 * 0.9
    const h = 0.5 + (v.height ?? 50) / 100 * 1.6
    const vol = Math.PI * r * r * h
    return (<>
        <mesh position={[0, h / 2 - 1, 0]}>
            <cylinderGeometry args={[r, r, h, 40, 1, true]} />
            <meshPhysicalMaterial color="#7dd3fc" transparent opacity={0.35} roughness={0.15} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, h / 2 - 1, 0]}><cylinderGeometry args={[r * 0.98, r * 0.98, h * 0.98, 40]} />
            <meshPhysicalMaterial color="#38bdf8" transparent opacity={0.18} roughness={0.2} /></mesh>
        {/* radius + height guides */}
        <Line points={[[0, -1, 0], [r, -1, 0]]} color="#fbbf24" lineWidth={2.5} />
        <Line points={[[r + 0.15, -1, 0], [r + 0.15, -1 + h, 0]]} color="#f472b6" lineWidth={2.5} />
        <Label pos={[r / 2, -1.25, 0]} size={0.17} color="#fde68a">r</Label>
        <Label pos={[r + 0.45, -1 + h / 2, 0]} size={0.17} color="#f9a8d4">h</Label>
        <Label pos={[0, 1.5, 0]} size={0.2} color="#bae6fd">{`V = πr²h ≈ ${vol.toFixed(1)}`}</Label>
    </>)
}

/* ═══ UNIT CIRCLE — angle sweeps, sin/cos live (trig) ═══ */
const UnitCircle: Scene = ({ v }) => {
    const th = (v.angle ?? 25) / 100 * Math.PI * 2
    const x = Math.cos(th) * 1.5, y = Math.sin(th) * 1.5
    return (<>
        <mesh><torusGeometry args={[1.5, 0.015, 8, 96]} />
            <meshBasicMaterial color="#475569" /></mesh>
        <Line points={[[-2, 0, 0], [2, 0, 0]]} color="#334155" lineWidth={1} />
        <Line points={[[0, -2, 0], [0, 2, 0]]} color="#334155" lineWidth={1} />
        {/* radius arm */}
        <Line points={[[0, 0, 0], [x, y, 0]]} color="#facc15" lineWidth={3.5} />
        <Glow pos={[x, y, 0]} r={0.09} color="#facc15" />
        {/* cos (x) and sin (y) projections */}
        <Line points={[[0, 0, 0], [x, 0, 0]]} color="#38bdf8" lineWidth={5} />
        <Line points={[[x, 0, 0], [x, y, 0]]} color="#f472b6" lineWidth={5} />
        <Label pos={[x / 2, -0.22, 0]} size={0.17} color="#7dd3fc">{`cos = ${Math.cos(th).toFixed(2)}`}</Label>
        <Label pos={[x + 0.5, y / 2, 0]} size={0.17} color="#f9a8d4">{`sin = ${Math.sin(th).toFixed(2)}`}</Label>
        <Label pos={[0, 2, 0]} size={0.19} color="#e2e8f0">{`θ = ${Math.round((v.angle ?? 25) / 100 * 360)}°`}</Label>
    </>)
}

/* ═══ GRAPH — y = mx + c on a 3D coordinate floor (math) ═══ */
const Graph3d: Scene = ({ v }) => {
    const m = (v.slope ?? 62) / 25 - 2
    const c = (v.intercept ?? 50) / 12.5 - 4
    const pts: [number, number, number][] = []
    for (let i = 0; i <= 60; i++) {
        const x = -2.5 + (i / 60) * 5
        const y = Math.max(-1.5, Math.min(1.5, m * x * 0.5 + c * 0.35))
        pts.push([x, y, 0])
    }
    return (<>
        <gridHelper args={[6, 12, '#1e293b', '#0f172a']} position={[0, -1.5, 0]} />
        <Line points={[[-2.7, 0, 0], [2.7, 0, 0]]} color="#64748b" lineWidth={1.5} />
        <Line points={[[0, -1.5, 0], [0, 1.5, 0]]} color="#64748b" lineWidth={1.5} />
        <Line points={pts} color="#4ade80" lineWidth={4} />
        <Glow pos={[0, c * 0.35, 0]} r={0.07} color="#facc15" />
        <Label pos={[2.2, 1.2, 0]} size={0.19} color="#86efac">{`y = ${m.toFixed(1)}x ${c >= 0 ? '+' : '−'} ${Math.abs(c).toFixed(1)}`}</Label>
    </>)
}

/* ═══ GLOBE — Earth's tilt makes seasons (geography) ═══ */
const Globe: Scene = ({ v }) => {
    const tilt = ((v.tilt ?? 50) / 100 - 0.5) * 0.9
    const earth = useRef<THREE.Group>(null)
    useFrame(({ clock }) => { if (earth.current) earth.current.rotation.y = clock.getElapsedTime() * 0.5 })
    return (<>
        <directionalLight position={[5, 0, 0]} intensity={2.6} color="#fef3c7" />
        <Glow pos={[3.4, 0, 0]} r={0.25} color="#fde68a" />
        <group rotation={[0, 0, tilt]}>
            <group ref={earth}>
                <mesh><sphereGeometry args={[1, 40, 40]} />
                    <meshStandardMaterial color="#38bdf8" roughness={0.7} emissive="#0ea5e9" emissiveIntensity={0.25} /></mesh>
                {/* continents-ish blobs */}
                {[[0.4, 0.3], [-0.5, 0.6], [0.1, -0.5], [-0.3, -0.7], [0.7, -0.2]].map(([x, y], i) => (
                    <mesh key={i} position={[x, y, 0.92]}>
                        <sphereGeometry args={[0.16, 12, 12]} /><meshStandardMaterial color="#4ade80" roughness={0.8} /></mesh>))}
            </group>
            {/* axis */}
            <mesh><cylinderGeometry args={[0.015, 0.015, 2.8, 6]} /><meshStandardMaterial color="#94a3b8" /></mesh>
        </group>
        <Label pos={[0, -1.7, 0]} size={0.19} color="#bae6fd">{`tilt ${Math.round(tilt * 57)}° — that's why seasons happen`}</Label>
    </>)
}

/* ═══ ELECTRIC — battery powers the bulb (junior) ═══ */
const Electric: Scene = ({ v }) => {
    const p = (v.power ?? 0) / 100
    return (<>
        <mesh position={[-1.4, -0.6, 0]}><boxGeometry args={[0.5, 0.7, 0.4]} />
            <meshStandardMaterial color="#334155" metalness={0.5} roughness={0.3} /></mesh>
        <Label pos={[-1.4, 0.05, 0]} size={0.18} color="#fbbf24">⚡ battery</Label>
        <Line points={[[-1.4, -0.2, 0], [-1.4, 0.6, 0], [1.4, 0.6, 0], [1.4, -0.2, 0], [1.4, -0.6, 0], [-1.4, -0.6, 0], [-1.4, -0.2, 0]]} color="#94a3b8" lineWidth={2.5} />
        <group position={[1.4, 0.6, 0]}>
            <mesh><sphereGeometry args={[0.3, 20, 20]} />
                <meshStandardMaterial color="#fef3c7" emissive="#fbbf24" emissiveIntensity={p > 0.5 ? 2.6 : p * 2} transparent opacity={0.95} /></mesh>
            {p > 0.5 && <pointLight intensity={p * 6} color="#fbbf24" distance={4} />}
        </group>
        <Label pos={[0, -1.3, 0]} size={0.2} color={p > 0.5 ? '#4ade80' : '#e2e8f0'}>{p > 0.5 ? 'LIT! enough power' : 'not enough power yet'}</Label>
    </>)
}

/* ═══ WEIGH — the scale reads the mass (junior) ═══ */
const Weigh: Scene = ({ v }) => {
    const g = v.grams ?? 0
    const sink = g / 100 * 0.5
    return (<>
        <mesh position={[0, -0.9, 0]}><boxGeometry args={[2.6, 0.18, 1.4]} /><meshStandardMaterial color="#475569" /></mesh>
        <mesh position={[0, -0.3 - sink * 0.4, 0]}><cylinderGeometry args={[0.7, 0.5, 0.14, 24]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.3} /></mesh>
        {g > 0 && <mesh position={[0, -0.1 - sink * 0.4, 0]}><boxGeometry args={[0.5, 0.4, 0.5]} />
            <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.7} /></mesh>}
        {/* dial */}
        <mesh position={[0, 0.9, 0]}><circleGeometry args={[0.55, 32]} /><meshStandardMaterial color="#f8fafc" /></mesh>
        <mesh position={[0, 0.9, 0.02]} rotation={[0, 0, -g / 100 * Math.PI * 0.8 + Math.PI * 0.4]}>
            <boxGeometry args={[0.05, 0.45, 0.02]} /><meshStandardMaterial color="#ef4444" /></mesh>
        <Label pos={[0, 1.7, 0]} size={0.24} color="#fde68a">{`${g} g`}</Label>
    </>)
}

/* ═══ FRACTION — 3D pie slices shade (junior) ═══ */
const Fraction3d: Scene = ({ v }) => {
    const parts = Math.max(2, Math.round(v.parts ?? 4))
    const shaded = Math.min(parts, Math.round(v.shaded ?? 1))
    return (<>
        {Array.from({ length: parts }, (_, i) => {
            const a0 = (i / parts) * Math.PI * 2, a1 = ((i + 1) / parts) * Math.PI * 2
            const on = i < shaded
            return (<group key={i}>
                <mesh position={[Math.cos((a0 + a1) / 2) * 0.06, 0, Math.sin((a0 + a1) / 2) * 0.06]} rotation={[0, -a0, 0]}>
                    <cylinderGeometry args={[1.2, 1.2, 0.18, 24, 1, false, 0, a1 - a0]} />
                    <meshStandardMaterial color={on ? '#4ade80' : '#1e293b'} emissive={on ? '#22c55e' : '#0f172a'} emissiveIntensity={on ? 1.4 : 0.4} />
                </mesh></group>)
        })}
        <Label pos={[0, 1.3, 0]} size={0.24} color="#bbf7d0">{`${shaded} / ${parts}`}</Label>
    </>)
}

/* ═══ CYCLE — sun evaporates, clouds rain (junior water cycle) ═══ */
const Cycle: Scene = ({ v }) => {
    const heat = (v.heat ?? 0) / 100, time = (v.time ?? 0) / 100
    const rain = heat > 0.6 && time > 0.8
    return (<>
        <Glow pos={[1.9, 1.3, 0]} r={0.2 + heat * 0.18} color="#facc15" />
        {/* sea */}
        <mesh position={[0, -1.15, 0]}><boxGeometry args={[5, 0.3, 2]} /><meshStandardMaterial color="#0ea5e9" emissive="#0284c7" emissiveIntensity={0.5} /></mesh>
        {/* vapour wisps */}
        {heat > 0.3 && [...Array(6)].map((_, i) => (
            <mesh key={i} position={[-1 + i * 0.4, -0.6 + heat * 0.5 - (i % 3) * 0.15, 0]}>
                <sphereGeometry args={[0.09, 10, 10]} /><meshStandardMaterial color="#e0f2fe" transparent opacity={0.5 + heat * 0.3} /></mesh>))}
        {/* cloud */}
        {heat > 0.5 && <group position={[0, 1, 0]}>
            {[-0.35, 0, 0.35].map((x, i) => <mesh key={i} position={[x, (i % 2) * 0.12, 0]}>
                <sphereGeometry args={[0.32, 16, 16]} /><meshStandardMaterial color={rain ? '#64748b' : '#cbd5e1'} transparent opacity={0.9} /></mesh>)}
        </group>}
        {/* rain */}
        {rain && [...Array(14)].map((_, i) => (
            <mesh key={i} position={[-0.6 + (i % 5) * 0.3, 0.6 - (i % 4) * 0.35 - (time * 0.2), 0]}>
                <capsuleGeometry args={[0.02, 0.12, 4, 6]} /><meshStandardMaterial color="#7dd3fc" emissive="#38bdf8" emissiveIntensity={1.2} /></mesh>))}
        <Label pos={[0, 1.75, 0]} size={0.19} color="#bae6fd">{rain ? 'RAINING — the cycle completes!' : heat > 0.5 ? 'clouds forming…' : 'heat the water'}</Label>
    </>)
}

/* ═══ JUMP — frog hops the number line (junior) ═══ */
const Jump: Scene = ({ v }) => {
    const pos = Math.round(v.pos ?? 0)
    const frog = useRef<THREE.Group>(null)
    useFrame(({ clock }) => {
        if (frog.current) frog.current.position.y = Math.abs(Math.sin(clock.getElapsedTime() * 3)) * 0.25 - 0.55
    })
    return (<>
        {Array.from({ length: 11 }, (_, i) => (
            <group key={i} position={[-2.5 + i * 0.5, -0.8, 0]}>
                <mesh><cylinderGeometry args={[0.2, 0.2, 0.06, 20]} />
                    <meshStandardMaterial color={i === pos ? '#4ade80' : '#334155'} emissive={i === pos ? '#22c55e' : '#0f172a'} emissiveIntensity={i === pos ? 1.6 : 0.3} /></mesh>
                <Label pos={[0, -0.35, 0]} size={0.16} color={i === pos ? '#bbf7d0' : '#64748b'}>{`${i}`}</Label>
            </group>))}
        <group ref={frog} position={[-2.5 + pos * 0.5, -0.55, 0]}>
            <Glow pos={[0, 0.15, 0]} r={0.16} color="#4ade80" />
        </group>
        <Label pos={[0, 0.8, 0]} size={0.2} color="#bbf7d0">{`frog is on ${pos}`}</Label>
    </>)
}

/* ═══ STRETCH — tape measures the bar (junior) ═══ */
const Stretch: Scene = ({ v }) => {
    const len = (v.length ?? 0) / 100
    return (<>
        <mesh position={[0, -0.4, 0]}><boxGeometry args={[3.4, 0.3, 0.3]} />
            <meshStandardMaterial color="#a78bfa" emissive="#8b5cf6" emissiveIntensity={0.6} /></mesh>
        {/* tape extends */}
        <mesh position={[-1.7 + len * 1.7, -0.1, 0]}><boxGeometry args={[len * 3.4, 0.1, 0.12]} />
            <meshStandardMaterial color="#facc15" emissive="#eab308" emissiveIntensity={0.9} /></mesh>
        <Label pos={[0, 0.7, 0]} size={0.2} color="#fde68a">{`tape shows ${Math.round(len * 10)} cm`}</Label>
    </>)
}

/* ═══ FLOW — a process you walk stage by stage ═══ */
const Flow3d: Scene = ({ v, labels }) => {
    const stage = Math.min(4, Math.floor((v.stage ?? 0) / 20))
    const g = useRef<THREE.Group>(null)
    useFrame(({ clock }) => { if (g.current) g.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.25 })
    const name = (i: number) => labels?.[i] ?? `Stage ${i + 1}`
    return (<>
        <group ref={g}>
            {/* connecting path */}
            <Line points={[[-2.4, 0, 0], [2.4, 0, 0]]} color="#334155" lineWidth={3} />
            {Array.from({ length: 5 }, (_, i) => {
                const x = -2.4 + i * 1.2, active = i === stage, done = i < stage
                return (<group key={i} position={[x, 0, 0]}>
                    <mesh>
                        <sphereGeometry args={[active ? 0.3 : 0.2, 20, 20]} />
                        <meshStandardMaterial color={active ? '#fbbf24' : done ? '#4ade80' : '#475569'}
                            emissive={active ? '#f59e0b' : done ? '#22c55e' : '#1e293b'}
                            emissiveIntensity={active ? 2.4 : done ? 1.2 : 0.4} />
                    </mesh>
                    {active && <pointLight intensity={3} color="#fbbf24" distance={2.5} />}
                    <Label pos={[0, 0.55, 0]} size={0.13} color={active ? '#fde68a' : done ? '#86efac' : '#64748b'}>{name(i).slice(0, 18)}</Label>
                </group>)
            })}
            {/* travelling spark along the path */}
            <Glow pos={[-2.4 + stage * 1.2, 0.45, 0]} r={0.07} color="#facc15" />
        </group>
        <Label pos={[0, -0.9, 0]} size={0.2} color="#e2e8f0">{`${name(stage)} — stage ${stage + 1} of 5`}</Label>
    </>)
}

/* ═══ TIMELINE — a ribbon of time you scrub along ═══ */
const Timeline3d: Scene = ({ v, labels }) => {
    const year = (v.year ?? 0) / 100
    const marker = useRef<THREE.Group>(null)
    useFrame(({ clock }) => {
        if (marker.current) marker.current.position.y = 0.35 + Math.abs(Math.sin(clock.getElapsedTime() * 2.4)) * 0.08
    })
    return (<>
        {/* the ribbon */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[5.6, 0.06, 0.5]} />
            <meshStandardMaterial color="#1e293b" metalness={0.4} roughness={0.4} />
        </mesh>
        {/* era notches — chapter topics when the builder supplies them */}
        {Array.from({ length: 9 }, (_, i) => {
            const x = -2.8 + i * 0.7, passed = x / 5.6 + 0.5 <= year
            const label = labels?.[Math.round(i / 8 * ((labels.length || 1) - 1))]
            const near = Math.abs(x / 5.6 + 0.5 - year) < 0.22
            return (<group key={i} position={[x, 0, 0]}>
                <mesh position={[0, 0.06, 0]}>
                    <boxGeometry args={[0.05, 0.14, 0.54]} />
                    <meshStandardMaterial color={passed ? '#a78bfa' : '#334155'} emissive={passed ? '#8b5cf6' : '#0f172a'} emissiveIntensity={passed ? 1.4 : 0.2} />
                </mesh>
                {label && (i === 0 || i === 8 || near) &&
                    <Label pos={[0, near ? 0.7 : 0.55, 0]} size={near ? 0.16 : 0.11} color={passed ? '#ddd6fe' : '#94a3b8'}>{label.slice(0, 22)}</Label>}
            </group>)
        })}
        {/* you-are-here marker */}
        <group ref={marker} position={[-2.8 + year * 5.6, 0.35, 0]}>
            <mesh rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.12, 0.3, 4]} />
                <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={2.2} /></mesh>
            <pointLight intensity={2} color="#fbbf24" distance={2} />
        </group>
        <Label pos={[0, -0.75, 0]} size={0.2} color="#c4b5fd">{`${Math.round(year * 100)}% through the era — what came before what?`}</Label>
    </>)
}

/* ═══ registry — scene name → 3D component ═══ */
export const LABS3D: Record<string, Scene> = {
    efield: EField, circuit: Circuit, prism: Prism, wave: Wave, gas: Gas,
    pendulum: Pendulum, orbit: Orbit, atom: Atom, lens: Lens, titrate: Titrate,
    vector: Vector, emag: Emag, cell: Cell, moon: Moon, dna: Dna,
    projectile: Projectile, heart: Heart, conic: Conic, spectrum: Spectrum,
    mitosis: Mitosis, equilibrium: Equil, nephron: Nephron, reflex: Reflex,
    digest: Digest, supply: Supply, ph: Ph, balance: Balance, pour: Pour, grow: Grow,
    molecule: Molecule, solid: Solid, unitcircle: UnitCircle, graph: Graph3d,
    globe: Globe, electric: Electric, weigh: Weigh, fraction: Fraction3d,
    cycle: Cycle, jump: Jump, stretch: Stretch,
    flow: Flow3d, timeline: Timeline3d,
}

/** Render a 3D lab scene for a spec.scene key, or null if no 3D version. */
export function Lab3D({ scene, vals, labels }: { scene: string; vals: V; labels?: string[] }) {
    const S = LABS3D[scene]
    if (!S) return null
    return <Stage><S v={vals} labels={labels} /></Stage>
}
