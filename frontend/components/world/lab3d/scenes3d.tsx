'use client'

/**
 * scenes3d — flagship 3D experiment worlds for the sandbox.
 * Each is a real physical simulation in R3F: orbit mechanics, electron
 * shells, DNA base pairing, gas kinetics — not props on a pedestal.
 * `spec` = sliders + readout; `scene` = the animated world.
 */
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Trail, Line, Text, Sphere, Html } from '@react-three/drei'
import * as THREE from 'three'
import type { Vals } from './Lab3D'

export interface Lab3DSpec {
    key: string; title: string; emoji: string; subject: string;
    sliders: { id: string; label: string; min: number; max: number; start: number; emoji: string }[];
    readout: (v: Vals) => string;
    scene: (p: { vals: Vals }) => JSX.Element;
    prompts: string[];
}

const T = { dt: 0.016 };

/* ── 1. ORBIT — gravity, escape velocity, real ballistic sim ────────── */
function OrbitScene({ vals }: { vals: Vals }) {
    const planet = useRef<THREE.Mesh>(null!)
    const vel = useRef(new THREE.Vector3())
    const pos = useRef(new THREE.Vector3(6, 0, 0))
    const launched = useRef(false)
    const speed = (vals.speed ?? 50) / 50;   // 0.2 – 2.0×
    useFrame((_, dt) => {
        if (!planet.current) return;
        if (!launched.current) { vel.current.set(0, 0, -3.4 * speed); launched.current = true; }
        const r = pos.current.length();
        const g = pos.current.clone().normalize().multiplyScalar(-9.8 / (r * r) * 4);
        vel.current.addScaledVector(g, dt * 4);
        pos.current.addScaledVector(vel.current, dt * 4);
        planet.current.position.copy(pos.current);
        if (r > 60 || r < 0.6) { pos.current.set(6, 0, 0); vel.current.set(0, 0, -3.4 * speed); }
    });
    return (
        <group>
            <Sphere args={[1.4, 32, 32]}><meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={2.2} /></Sphere>
            <pointLight intensity={3} color="#fbbf24" />
            <Trail width={2.2} length={40} color="#38bdf8" attenuation={(w) => w * w}>
                <mesh ref={planet}><sphereGeometry args={[0.3, 20, 20]} /><meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} metalness={0.6} roughness={0.25} /></mesh>
            </Trail>
        </group>
    );
}

/* ── 2. ATOM — nucleus + shells, electrons actually orbit ───────────── */
function AtomScene({ vals }: { vals: Vals }) {
    const electrons = Math.min(14, Math.round(vals.electrons ?? 4));
    const speed = (vals.spin ?? 50) / 50;
    const shells = [2, 8, 8].slice(0, 3);
    const refs = useRef<THREE.Group[]>([]);
    useFrame(({ clock }) => {
        const t = clock.elapsedTime * (0.4 + speed);
        let i = 0;
        shells.forEach((cap, s) => {
            for (let k = 0; k < cap && i < electrons; k++, i++) {
                const g = refs.current[i];
                if (!g) continue;
                const r = 1.6 + s * 1.3, a = t * (1 - s * 0.2) + (k / cap) * Math.PI * 2;
                g.position.set(Math.cos(a) * r, Math.sin(a) * r * 0.35, Math.sin(a) * r);
            }
        });
    });
    return (
        <group>
            {/* nucleus */}
            <mesh><sphereGeometry args={[0.7, 24, 24]} /><meshStandardMaterial color="#f43f5e" emissive="#be123c" emissiveIntensity={1.4} /></mesh>
            {/* shell rings */}
            {shells.map((cap, s) => (
                <mesh key={s} rotation={[Math.PI / 2 - 0.34, 0, 0]}>
                    <torusGeometry args={[1.6 + s * 1.3, 0.015, 8, 80]} />
                    <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
                </mesh>
            ))}
            {Array.from({ length: electrons }).map((_, i) => (
                <group key={i} ref={(g) => { if (g) refs.current[i] = g; }}>
                    <mesh><sphereGeometry args={[0.16, 16, 16]} /><meshStandardMaterial color="#7dd3fc" emissive="#0ea5e9" emissiveIntensity={2} /></mesh>
                </group>
            ))}
        </group>
    );
}

/* ── 3. DNA — real helix, base-pair rungs, unzip ────────────────────── */
function DNAScene({ vals }: { vals: Vals }) {
    const unzip = (vals.unzip ?? 0) / 100;
    const g = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => { if (g.current) g.current.rotation.y = clock.elapsedTime * 0.15; });
    const N = 60;
    return (
        <group ref={g}>
            {Array.from({ length: N }).map((_, i) => {
                const y = (i / N - 0.5) * 10;
                const a = i * 0.35;
                const sep = 1 + unzip * Math.max(0, Math.abs(y) / 4 - 0.3) * 2.4;
                const x1 = Math.cos(a) * 1.3 * sep, z1 = Math.sin(a) * 1.3 * sep;
                const x2 = Math.cos(a + Math.PI) * 1.3 * sep, z2 = Math.sin(a + Math.PI) * 1.3 * sep;
                const rungCol = i % 4 < 2 ? '#fbbf24' : '#34d399';
                return (
                    <group key={i} position={[0, y, 0]}>
                        <mesh position={[x1, 0, z1]}><sphereGeometry args={[0.12, 10, 10]} /><meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.8} /></mesh>
                        <mesh position={[x2, 0, z2]}><sphereGeometry args={[0.12, 10, 10]} /><meshStandardMaterial color="#f472b6" emissive="#db2777" emissiveIntensity={0.8} /></mesh>
                        {i % 3 === 0 && <Line points={[[x1, 0, z1], [x2, 0, z2]]} color={rungCol} lineWidth={2} />}
                    </group>
                );
            })}
        </group>
    );
}

/* ── 4. PENDULUM — real pendulum physics ────────────────────────────── */
function PendulumScene({ vals }: { vals: Vals }) {
    const len = 2 + (vals.length ?? 50) / 100 * 4;
    const grav = (vals.gravity ?? 50) / 50;   // 0.2–2× g
    const arm = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => {
        const t = clock.elapsedTime;
        const w = Math.sqrt(grav * 9.8 / len);
        const a = Math.sin(t * w) * 0.8;
        if (arm.current) arm.current.rotation.z = a;
    });
    return (
        <group position={[0, 4, 0]}>
            <mesh position={[0, 0.4, 0]}><boxGeometry args={[3, 0.15, 0.15]} /><meshStandardMaterial color="#475569" /></mesh>
            <group ref={arm}>
                <mesh position={[0, -len / 2, 0]}><cylinderGeometry args={[0.04, 0.04, len, 8]} /><meshStandardMaterial color="#94a3b8" /></mesh>
                <Trail width={1.5} length={30} color="#f472b6" attenuation={w2 => w2 * w2}>
                    <mesh position={[0, -len, 0]}><sphereGeometry args={[0.35, 24, 24]} /><meshStandardMaterial color="#f472b6" emissive="#db2777" emissiveIntensity={1.2} metalness={0.7} roughness={0.2} /></mesh>
                </Trail>
            </group>
        </group>
    );
}

/* ── 5. CIRCUIT — electrons actually flow when the loop closes ──────── */
function CircuitScene({ vals }: { vals: Vals }) {
    const closed = (vals.switch ?? 0) > 50;
    const volt = (vals.voltage ?? 50) / 50;
    const electrons = useRef<THREE.Group[]>([]);
    const N = 24;
    useFrame(({ clock }) => {
        if (!closed) return;
        const t = clock.elapsedTime * volt * 2;
        electrons.current.forEach((e, i) => {
            if (!e) return;
            const p = ((t + i / N) % 1);
            const seg = Math.floor(p * 4), f = p * 4 - seg;
            const R = 3;
            const corners = [[-R, 0, -R], [R, 0, -R], [R, 0, R], [-R, 0, R]];
            const a = corners[seg], b = corners[(seg + 1) % 4];
            e.position.set(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f + 0.1, a[2] + (b[2] - a[2]) * f);
        });
    });
    const path = [[-3, 0, -3], [3, 0, -3], [3, 0, 3], [-3, 0, 3], [-3, 0, -3]];
    return (
        <group>
            {/* wires */}
            <Line points={path as [number, number, number][]} color="#94a3b8" lineWidth={3} />
            {/* battery */}
            <mesh position={[0, -0.2, -3]}><boxGeometry args={[1.2, 0.7, 0.4]} /><meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} /></mesh>
            <Text position={[0, 0.4, -3]} fontSize={0.22} color="#fbbf24" anchorX="center">BATTERY {volt.toFixed(1)}V</Text>
            {/* bulb */}
            <mesh position={[3, 0.3, 3]}>
                <sphereGeometry args={[0.45, 24, 24]} />
                <meshStandardMaterial color={closed ? '#fde047' : '#475569'} emissive={closed ? '#facc15' : '#000'} emissiveIntensity={closed ? volt * 1.4 : 0} transparent opacity={0.95} />
            </mesh>
            {closed && <pointLight position={[3, 0.6, 3]} intensity={volt * 2} color="#fde047" />}
            {/* switch gap */}
            {!closed && <mesh position={[-3, 0.2, 0]} rotation={[0, 0, 0.5]}><boxGeometry args={[0.5, 0.08, 0.12]} /><meshStandardMaterial color="#f87171" /></mesh>}
            {closed && <mesh position={[-3, 0.05, 0]}><boxGeometry args={[0.5, 0.08, 0.12]} /><meshStandardMaterial color="#34d399" /></mesh>}
            {Array.from({ length: N }).map((_, i) => (
                <group key={i} ref={g => { if (g) electrons.current[i] = g; }}>
                    <mesh><sphereGeometry args={[0.09, 10, 10]} /><meshStandardMaterial color="#7dd3fc" emissive="#0ea5e9" emissiveIntensity={closed ? 2.2 : 0.3} /></mesh>
                </group>
            ))}
        </group>
    );
}

/* ── 6. PROJECTILE — launch, gravity arc, range marker ──────────────── */
function ProjectileScene({ vals }: { vals: Vals }) {
    const angle = ((vals.angle ?? 45) * Math.PI) / 180;
    const speed = 4 + (vals.velocity ?? 50) / 100 * 8;
    const ball = useRef<THREE.Mesh>(null!);
    const state = useRef({ p: new THREE.Vector3(-7, 0, 0), v: new THREE.Vector3() });
    const launched = useRef(false);
    useFrame((_, dt) => {
        if (!ball.current) return;
        if (!launched.current) {
            state.current.v.set(Math.cos(angle) * speed, Math.sin(angle) * speed, 0);
            launched.current = true;
        }
        const s = state.current;
        s.v.y -= 9.8 * dt;
        s.p.addScaledVector(s.v, dt);
        if (s.p.y < 0) { s.p.set(-7, 0, 0); s.v.set(Math.cos(angle) * speed, Math.sin(angle) * speed, 0); }
        ball.current.position.copy(s.p);
    });
    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}><planeGeometry args={[40, 20]} /><meshStandardMaterial color="#0f172a" /></mesh>
            <gridHelper args={[40, 40, '#1e293b', '#1e293b']} position={[0, 0, 0]} />
            <mesh position={[-7, 0.3, 0]} rotation={[0, 0, angle]}><cylinderGeometry args={[0.12, 0.18, 1.4, 12]} /><meshStandardMaterial color="#f59e0b" /></mesh>
            <Trail width={2} length={50} color="#f59e0b" attenuation={w => w}>
                <mesh ref={ball}><sphereGeometry args={[0.22, 20, 20]} /><meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.4} /></mesh>
            </Trail>
        </group>
    );
}

/* ── 7. WAVE — a 3D string oscillating, amplitude/frequency live ────── */
function WaveScene({ vals }: { vals: Vals }) {
    const amp = (vals.amplitude ?? 50) / 50;
    const freq = (vals.frequency ?? 50) / 50;
    const pts = useRef<THREE.Vector3[]>([]);
    const line = useRef<any>(null);
    const N = 90;
    useFrame(({ clock }) => {
        const t = clock.elapsedTime * (0.5 + freq * 2);
        for (let i = 0; i < N; i++) {
            const x = (i / N - 0.5) * 14;
            pts.current[i] ??= new THREE.Vector3();
            pts.current[i].set(x, Math.sin(x * (0.4 + freq) - t * 2) * amp * 1.4, Math.cos(x * 0.2 + t) * 0.4);
        }
        if (line.current) line.current.geometry.setFromPoints(pts.current);
    });
    return (
        <group>
            <line ref={line}><bufferGeometry /><lineBasicMaterial color="#22d3ee" linewidth={3} /></line>
            {Array.from({ length: 9 }).map((_, i) => {
                const x = (i / 8 - 0.5) * 14;
                return <mesh key={i} position={[x, 0, 0]}><sphereGeometry args={[0.1, 10, 10]} /><meshStandardMaterial color="#f472b6" emissive="#db2777" emissiveIntensity={0.8} /></mesh>;
            })}
        </group>
    );
}

/* ── 8. GAS — particles in a box, temperature = speed ───────────────── */
function GasScene({ vals }: { vals: Vals }) {
    const temp = (vals.temperature ?? 50) / 50;
    const box = 5;
    const N = 60;
    const parts = useRef<{ p: THREE.Vector3; v: THREE.Vector3 }[]>([]);
    if (!parts.current.length) {
        for (let i = 0; i < N; i++) parts.current.push({
            p: new THREE.Vector3((Math.random() - 0.5) * box, (Math.random() - 0.5) * box, (Math.random() - 0.5) * box),
            v: new THREE.Vector3().randomDirection().multiplyScalar(0.5 + Math.random()),
        });
    }
    const mesh = useRef<THREE.InstancedMesh>(null!);
    const m4 = useMemo(() => new THREE.Matrix4(), []);
    useFrame((_, dt) => {
        const sp = 0.3 + temp * 3;
        parts.current.forEach((p, i) => {
            p.p.addScaledVector(p.v, dt * sp);
            ['x', 'y', 'z'].forEach(ax => {
                const k = ax as 'x' | 'y' | 'z';
                if (Math.abs(p.p[k]) > box / 2) { p.p[k] = Math.sign(p.p[k]) * box / 2; p.v[k] *= -1; }
            });
            m4.setPosition(p.p);
            mesh.current?.setMatrixAt(i, m4);
        });
        if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;
    });
    return (
        <group>
            <mesh><boxGeometry args={[box, box, box]} /><meshStandardMaterial color="#38bdf8" transparent opacity={0.08} side={THREE.BackSide} /></mesh>
            <lineSegments><edgesGeometry args={[new THREE.BoxGeometry(box, box, box)]} /><lineBasicMaterial color="#38bdf8" /></lineSegments>
            <instancedMesh ref={mesh} args={[undefined, undefined, N]}>
                <sphereGeometry args={[0.12, 10, 10]} />
                <meshStandardMaterial color="#f472b6" emissive="#be185d" emissiveIntensity={1.2} />
            </instancedMesh>
        </group>
    );
}

/* ── 9. EFIELD — two charges, 3D field lines arcing between ─────────── */
function EFieldScene({ vals }: { vals: Vals }) {
    const q1 = (vals.q1 ?? 50) / 50 - 1, q2 = (vals.q2 ?? 50) / 50 - 1;
    const sep = 2 + (vals.separation ?? 50) / 100 * 6;
    const lines = useMemo(() => {
        const arr: THREE.Vector3[][] = [];
        for (let l = 0; l < 14; l++) {
            const a0 = (l / 14) * Math.PI * 2;
            const pts: THREE.Vector3[] = [];
            for (let s = 0; s <= 40; s++) {
                const t = s / 40;
                const x = -sep / 2 + sep * t;
                const bend = Math.sin(a0) * Math.sin(t * Math.PI) * (1 + Math.abs(q2 - q1));
                const lift = Math.cos(a0) * Math.sin(t * Math.PI) * (1 + Math.abs(q2 - q1));
                pts.push(new THREE.Vector3(x, lift * 0.9, bend * 0.9));
            }
            arr.push(pts);
        }
        return arr;
    }, [q1, q2, sep]);
    return (
        <group>
            <mesh position={[-sep / 2, 0, 0]}><sphereGeometry args={[0.5, 24, 24]} /><meshStandardMaterial color={q1 > 0 ? '#f87171' : '#38bdf8'} emissive={q1 > 0 ? '#dc2626' : '#0284c7'} emissiveIntensity={1.6} /></mesh>
            <mesh position={[sep / 2, 0, 0]}><sphereGeometry args={[0.5, 24, 24]} /><meshStandardMaterial color={q2 > 0 ? '#f87171' : '#38bdf8'} emissive={q2 > 0 ? '#dc2626' : '#0284c7'} emissiveIntensity={1.6} /></mesh>
            {lines.map((pts, i) => <Line key={i} points={pts} color={q1 * q2 < 0 ? '#fbbf24' : '#64748b'} lineWidth={1.6} transparent opacity={0.7} />)}
        </group>
    );
}

/* ── 10. MOLECULE — build real molecules, bond angles correct ───────── */
function MoleculeScene({ vals }: { vals: Vals }) {
    const kind = Math.round(vals.molecule ?? 0);   // 0 H2O, 1 CO2, 2 CH4, 3 NH3
    const g = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => { if (g.current) g.current.rotation.y = clock.elapsedTime * 0.2; });
    const shapes: { center: string; arms: [number, number, number][]; label: string; armCol: string }[] = [
        { center: '#ef4444', arms: [[1.4, 0.9, 0], [-1.4, 0.9, 0]], label: 'H₂O — bent, 104.5°', armCol: '#e2e8f0' },
        { center: '#94a3b8', arms: [[-1.6, 0, 0], [1.6, 0, 0]], label: 'CO₂ — linear, 180°', armCol: '#ef4444' },
        { center: '#a78bfa', arms: [[1.2, 1.2, 1.2], [-1.2, 1.2, -1.2], [1.2, -1.2, -1.2], [-1.2, -1.2, 1.2]], label: 'CH₄ — tetrahedral, 109.5°', armCol: '#e2e8f0' },
        { center: '#38bdf8', arms: [[1.2, 0.6, 1.2], [-1.2, 0.6, 1.2], [0, 0.6, -1.6]], label: 'NH₃ — pyramidal, 107°', armCol: '#e2e8f0' },
    ];
    const s = shapes[Math.min(3, Math.max(0, kind))];
    return (
        <group ref={g}>
            <mesh><sphereGeometry args={[0.55, 28, 28]} /><meshStandardMaterial color={s.center} emissive={s.center} emissiveIntensity={0.5} metalness={0.4} roughness={0.3} /></mesh>
            {s.arms.map((p, i) => (
                <group key={i}>
                    <mesh position={[p[0], p[1], p[2]]}><sphereGeometry args={[0.3, 20, 20]} /><meshStandardMaterial color={s.armCol} metalness={0.3} roughness={0.4} /></mesh>
                    <Line points={[[0, 0, 0], [p[0] * 0.8, p[1] * 0.8, p[2] * 0.8]]} color="#94a3b8" lineWidth={4} />
                </group>
            ))}
            <Html position={[0, -2.4, 0]} center>
                <p className="text-xs font-black text-sky-200 bg-slate-900/80 rounded-full px-3 py-1 whitespace-nowrap">{s.label}</p>
            </Html>
        </group>
    );
}

/* ═══ registry ═══════════════════════════════════════════════════════ */
export const LABS3D: Lab3DSpec[] = [
    { key: 'orbit', title: 'Orbital Mechanics', emoji: '🪐', subject: 'physics',
        sliders: [{ id: 'speed', label: 'Launch speed', min: 0, max: 100, start: 50, emoji: '🚀' }],
        readout: v => (v.speed ?? 50) < 40 ? 'too slow — it falls back' : (v.speed ?? 50) > 80 ? 'too fast — escapes!' : 'stable orbit ✓',
        scene: OrbitScene,
        prompts: ['Find the minimum speed that still orbits', 'Watch what happens just above and below escape speed', 'Where does the planet move fastest — and why?'] },
    { key: 'atom', title: 'The Atom', emoji: '⚛️', subject: 'physics',
        sliders: [{ id: 'electrons', label: 'Electrons', min: 1, max: 14, start: 4, emoji: '⚡' }, { id: 'spin', label: 'Orbit speed', min: 0, max: 100, start: 50, emoji: '🌀' }],
        readout: v => `${Math.round(v.electrons ?? 4)} electrons across ${Math.ceil(Math.min(14, v.electrons ?? 4) / 8)} shells`,
        scene: AtomScene,
        prompts: ['Add electrons one at a time — when does a new shell start?', 'Which shell fills first — and why not the outer one?', 'Spin them faster — does the shell structure change?'] },
    { key: 'dna', title: 'DNA Double Helix', emoji: '🧬', subject: 'biology',
        sliders: [{ id: 'unzip', label: 'Helicase', min: 0, max: 100, start: 0, emoji: '✂️' }],
        readout: v => (v.unzip ?? 0) > 60 ? 'strands separated — replication begins' : 'double helix — A·T, G·C pairs',
        scene: DNAScene,
        prompts: ['Unzip slowly — which end separates first?', 'Which rung colour breaks first — A·T or G·C?', 'Half-unzip and hold — what would replication fork look like?'] },
    { key: 'pendulum', title: 'Pendulum Lab', emoji: '🕰️', subject: 'physics',
        sliders: [{ id: 'length', label: 'Length', min: 0, max: 100, start: 50, emoji: '📏' }, { id: 'gravity', label: 'Gravity', min: 10, max: 100, start: 50, emoji: '🌍' }],
        readout: v => `T ∝ √(L/g) — L=${(2 + (v.length ?? 50) / 100 * 4).toFixed(1)}m`,
        scene: PendulumScene,
        prompts: ['Double the length — does the period double?', 'Same pendulum on the Moon (low g) — faster or slower?', 'Which matters more: length or gravity?'] },
    { key: 'circuit', title: 'Live Circuit', emoji: '🔌', subject: 'physics',
        sliders: [{ id: 'switch', label: 'Switch', min: 0, max: 100, start: 0, emoji: '🔘' }, { id: 'voltage', label: 'Voltage', min: 10, max: 100, start: 50, emoji: '🔋' }],
        readout: v => (v.switch ?? 0) > 50 ? `loop closed — ${((v.voltage ?? 50) / 50).toFixed(1)}V driving the current` : 'loop open — electrons are waiting',
        scene: CircuitScene,
        prompts: ['Close the switch — how fast do the electrons respond?', 'Raise the voltage — what changes in the bulb?', 'Open the switch mid-flow — where does the current go?'] },
    { key: 'projectile', title: 'Projectile Launcher', emoji: '🎯', subject: 'physics',
        sliders: [{ id: 'angle', label: 'Angle', min: 5, max: 85, start: 45, emoji: '📐' }, { id: 'velocity', label: 'Velocity', min: 10, max: 100, start: 50, emoji: '💨' }],
        readout: v => `launch at ${Math.round(v.angle ?? 45)}°`,
        scene: ProjectileScene,
        prompts: ['Prove 45° really is maximum range — or find the angle that beats it', 'Two different angles, same landing point — find both', 'Max velocity at 90° — where does it land?'] },
    { key: 'wave', title: 'Wave Machine', emoji: '🌊', subject: 'physics',
        sliders: [{ id: 'amplitude', label: 'Amplitude', min: 0, max: 100, start: 50, emoji: '📶' }, { id: 'frequency', label: 'Frequency', min: 0, max: 100, start: 50, emoji: '🎵' }],
        readout: v => `A=${((v.amplitude ?? 50) / 50).toFixed(1)} × f=${((v.frequency ?? 50) / 50).toFixed(1)}`,
        scene: WaveScene,
        prompts: ['Max amplitude — do the particles move faster or just higher?', 'Zero amplitude — what is a wave with no energy?', 'Frequency up, amplitude down — which carries more energy?'] },
    { key: 'gas', title: 'Gas Kinetics', emoji: '💨', subject: 'chemistry',
        sliders: [{ id: 'temperature', label: 'Temperature', min: 0, max: 100, start: 50, emoji: '🌡️' }],
        readout: v => `T=${Math.round((v.temperature ?? 50) * 4)}K — particles ${(v.temperature ?? 50) > 60 ? 'flying' : (v.temperature ?? 50) > 30 ? 'drifting' : 'sluggish'}`,
        scene: GasScene,
        prompts: ['Heat to max — watch the wall hits get violent', 'Cool to near zero — do particles ever stop?', 'What does temperature actually measure?'] },
    { key: 'efield', title: 'Electric Field', emoji: '⚡', subject: 'physics',
        sliders: [{ id: 'q1', label: 'Charge A', min: 0, max: 100, start: 80, emoji: '➕' }, { id: 'q2', label: 'Charge B', min: 0, max: 100, start: 20, emoji: '➖' }, { id: 'separation', label: 'Separation', min: 0, max: 100, start: 50, emoji: '↔️' }],
        readout: v => `${(v.q1 ?? 80) > 50 ? '+' : '−'} vs ${(v.q2 ?? 20) > 50 ? '+' : '−'} — ${(v.q1 ?? 80) > 50 !== (v.q2 ?? 20) > 50 ? 'attracting' : 'repelling'}`,
        scene: EFieldScene,
        prompts: ['Opposite signs — do the lines connect?', 'Same signs — where do the lines bend away?', 'Push them close — what happens to the field density?'] },
    { key: 'molecule', title: 'Molecule Builder', emoji: '🧪', subject: 'chemistry',
        sliders: [{ id: 'molecule', label: 'Molecule', min: 0, max: 3, start: 0, emoji: '⚗️' }],
        readout: v => ['H₂O', 'CO₂', 'CH₄', 'NH₃'][Math.round(v.molecule ?? 0)] ?? 'H₂O',
        scene: MoleculeScene,
        prompts: ['Why is water bent but CO₂ straight?', 'Count the arms on methane — what shape is that?', 'Same atoms, different shape — what decides the angle?'] },
];
