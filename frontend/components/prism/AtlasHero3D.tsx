'use client'
import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
  type ReactNode,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Sphere,
  Torus,
  TorusKnot,
  Text,
  Billboard,
  Sparkles,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { Color, Vector3, type Mesh, type Group } from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Compass } from "lucide-react";

// ═══════════════════════════════════════════════════════
// CONSTANTS & TOKENS
// ═══════════════════════════════════════════════════════
const ATLAS_GOLD = "#F5A623";
const ATLAS_DARK = "#0B0A0F";
const ATLAS_PANEL = "#16131C";
const WORLD_BG = "#05030A";

const SUBJECTS = [
  { id: "physics", name: "Physics", native: "भौतिकी", color: "#4DA6FF", emoji: "⚛️", angle: 0 },
  { id: "chemistry", name: "Chemistry", native: "रसायनशास्त्र", color: "#4AE68C", emoji: "⚗️", angle: Math.PI / 3 },
  { id: "biology", name: "Biology", native: "जीवविज्ञान", color: "#FF7EB3", emoji: "🧬", angle: (2 * Math.PI) / 3 },
  { id: "maths", name: "Mathematics", native: "गणित", color: "#B47EFF", emoji: "📐", angle: Math.PI },
  { id: "english", name: "English", native: "अंग्रेजी", color: "#FFB3D9", emoji: "📖", angle: (4 * Math.PI) / 3 },
  { id: "hindi", name: "Hindi", native: "हिंदी", color: "#FF9F5C", emoji: "📝", angle: (5 * Math.PI) / 3 },
] as const;

const DAY_DURATION = 24; // seconds for full cycle
const TERRITORY_RADIUS = 7;
const WORLD_RADIUS = 20;
const BRIDGE_CURVE_HEIGHT = 1.8;

// ═══════════════════════════════════════════════════════
// SHARED STATE
// ═══════════════════════════════════════════════════════
const mouseState = { x: 0, y: 0, active: false };

// ═══════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════
interface SubjectData {
  id: string;
  name: string;
  native: string;
  color: string;
  emoji: string;
  angle: number;
}

interface AtlasHero3DProps {
  onEnter?: () => void;
  className?: string;
}

interface WindowExtensions {
  __flyCameraTo?: (pos: [number, number, number]) => void;
  __flyToSubject?: (id: string) => void;
  __atlasLoaded?: () => void;
}

// ═══════════════════════════════════════════════════════
// SKY & ENVIRONMENT
// ═══════════════════════════════════════════════════════
function SkyDome({ time }: { time: number }) {
  const dayPhase = (time % DAY_DURATION) / DAY_DURATION; // 0-1

  // Dawn: 0.2-0.3, Day: 0.3-0.7, Dusk: 0.7-0.8, Night: 0.8-0.2
  const getSkyColor = (): [string, string] => {
    if (dayPhase < 0.2 || dayPhase > 0.85) {
      return ["#020010", "#05020F"]; // Night
    } else if (dayPhase < 0.3) {
      const t = (dayPhase - 0.2) / 0.1;
      return ["#020010", lerpColor("#FF6B35", "#4A90D9", t)]; // Dawn
    } else if (dayPhase < 0.7) {
      return ["#1A3A5C", "#4A90D9"]; // Day
    } else if (dayPhase < 0.85) {
      const t = (dayPhase - 0.7) / 0.15;
      return [lerpColor("#4A90D9", "#FF6B35", t), lerpColor("#1A3A5C", "#CC4400", t)]; // Dusk
    }
    return ["#020010", "#05020F"];
  };

  const [topColor, bottomColor] = getSkyColor();

  return (
    <mesh scale={[120, 120, 120]} position={[0, -20, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color={topColor}
        side={THREE.BackSide}
        fog={false}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function lerpColor(a: string, b: string, t: number): string {
  const ca = new Color(a);
  const cb = new Color(b);
  const result = ca.lerp(cb, t);
  return `#${result.getHexString()}`;
}

// ═══════════════════════════════════════════════════════
// PROCEDURAL STARFIELD
// ═══════════════════════════════════════════════════════
function StarField() {
  const count = 800;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 50 + Math.random() * 30;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);
  const sizes = useMemo(
    () =>
      new Float32Array(
        Array.from({ length: count }, () => Math.random() * 2.5 + 0.5)
      ),
    [count]
  );

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FFEECC"
        size={0.15}
        sizeAttenuation
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ═══════════════════════════════════════════════════════
// AMBIENT DUST
// ═══════════════════════════════════════════════════════
function AmbientDust({ count = 300 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.015;
    const posArr = meshRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += Math.sin(Date.now() * 0.001 + i) * delta * 0.02;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#F5A623"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ═══════════════════════════════════════════════════════
// ENERGY BRIDGE
// ═══════════════════════════════════════════════════════
function EnergyBridge({
  start,
  end,
  color,
  progress = 0,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  progress?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const flowRef = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => {
    const mid = new Vector3(
      (start[0] + end[0]) / 2,
      Math.max(start[1], end[1]) + BRIDGE_CURVE_HEIGHT,
      (start[2] + end[2]) / 2
    );
    return new THREE.QuadraticBezierCurve3(
      new Vector3(...start),
      mid,
      new Vector3(...end)
    );
  }, [start, end]);

  const tubeSegments = 64;

  useFrame((_, delta) => {
    if (!flowRef.current) return;
    const t = ((Date.now() * 0.0008 + progress * 100) % 1);
    const point = curve.getPoint(t);
    flowRef.current.position.copy(point);
    if (flowRef.current.material instanceof THREE.MeshBasicMaterial) {
      flowRef.current.material.opacity = 0.3 + 0.5 * Math.sin(t * Math.PI);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <tubeGeometry args={[curve, tubeSegments, 0.06, 8, false]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={flowRef}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ═══════════════════════════════════════════════════════
// TERRITORY — PHYSICS (Crystal Formations)
// ═══════════════════════════════════════════════════════
function PhysicsTerritory({
  color,
  hovered,
}: {
  color: string;
  hovered: boolean;
}) {
  const groupRef = useRef<Group>(null);
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new Color(color),
        emissive: new Color(color),
        emissiveIntensity: hovered ? 0.6 : 0.2,
        metalness: 0.3,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.85,
      }),
    [color, hovered]
  );

  const crystalPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      const r = 1.2 + Math.random() * 0.8;
      positions.push([
        Math.cos(angle) * r,
        (Math.random() - 0.5) * 2.5,
        Math.sin(angle) * r,
      ]);
    }
    positions.push([0, 1.8, 0]);
    return positions;
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
      <group ref={groupRef}>
        <Sparkles count={30} size={3} scale={[4, 4, 4]} color={color} speed={0.3} />
        {/* Central large crystal */}
        <mesh material={material}>
          <octahedronGeometry args={[1.0, 0]} />
        </mesh>
        {/* Outer crystals */}
        {crystalPositions.map((pos, i) => (
          <mesh key={i} material={material} position={pos} scale={0.3 + Math.random() * 0.5}>
            <octahedronGeometry args={[1, 0]} />
          </mesh>
        ))}
        {/* Floating rings */}
        <Torus args={[1.8, 0.04, 8, 48]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color={color} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
        </Torus>
        <Torus args={[1.5, 0.03, 8, 48]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <meshBasicMaterial color={color} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
        </Torus>
        {/* Small orbiting particles */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <Sphere key={`orb-${i}`} args={[0.05, 8, 8]} position={[Math.cos(a) * 2, 0, Math.sin(a) * 2]}>
              <meshBasicMaterial color={color} blending={THREE.AdditiveBlending} />
            </Sphere>
          );
        })}
      </group>
    </Float>
  );
}

// ═══════════════════════════════════════════════════════
// TERRITORY — CHEMISTRY (Molecular Orbital)
// ═══════════════════════════════════════════════════════
function ChemistryTerritory({
  color,
  hovered,
}: {
  color: string;
  hovered: boolean;
}) {
  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new Color(color),
        emissive: new Color(color),
        emissiveIntensity: hovered ? 0.5 : 0.15,
        metalness: 0.2,
        roughness: 0.2,
        clearcoat: 0.8,
        transparent: true,
        opacity: 0.8,
      }),
    [color, hovered]
  );

  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [color]
  );

  return (
    <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.5}>
      <group>
        <Sparkles count={20} size={2.5} scale={[3, 3, 3]} color={color} speed={0.4} />
        {/* Central nucleus */}
        <mesh material={mat}>
          <sphereGeometry args={[0.8, 32, 32]} />
        </mesh>
        {/* Orbital shells */}
        <Torus args={[1.4, 0.03, 8, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color={color} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
        </Torus>
        <Torus args={[1.9, 0.025, 8, 64]} rotation={[Math.PI / 3, Math.PI / 5, 0]}>
          <meshBasicMaterial color={color} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
        </Torus>
        <Torus args={[2.3, 0.02, 8, 64]} rotation={[-Math.PI / 4, Math.PI / 3, Math.PI / 6]}>
          <meshBasicMaterial color={color} transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
        </Torus>
        {/* Electron spheres on orbits */}
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <Sphere key={`e1-${i}`} args={[0.08, 16, 16]} position={[Math.cos(a) * 1.4, 0, Math.sin(a) * 1.4]}>
              <meshBasicMaterial color={color} blending={THREE.AdditiveBlending} />
            </Sphere>
          );
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2 + 0.5;
          return (
            <Sphere key={`e2-${i}`} args={[0.06, 16, 16]} position={[Math.cos(a) * 1.9, Math.sin(a) * 0.4, Math.sin(a) * 1.9]}>
              <meshBasicMaterial color={color} blending={THREE.AdditiveBlending} />
            </Sphere>
          );
        })}
      </group>
    </Float>
  );
}

// ═══════════════════════════════════════════════════════
// TERRITORY — BIOLOGY (Organic Tree / Coral)
// ═══════════════════════════════════════════════════════
function BiologyTerritory({
  color,
  hovered,
}: {
  color: string;
  hovered: boolean;
}) {
  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new Color(color),
        emissive: new Color(color),
        emissiveIntensity: hovered ? 0.4 : 0.1,
        metalness: 0.1,
        roughness: 0.6,
        clearcoat: 0.4,
      }),
    [color, hovered]
  );

  const branches = useMemo(() => {
    const b: [number, number, number, number, number][] = [];
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const tilt = 0.3 + Math.random() * 0.4;
      b.push([Math.cos(a) * tilt, 1.5 + Math.random() * 1.5, Math.sin(a) * tilt, 0.4 + Math.random() * 0.4, 1.5 + Math.random() * 2]);
    }
    return b;
  }, []);

  return (
    <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.35}>
      <group>
        <Sparkles count={25} size={2} scale={[3, 3, 3]} color={color} speed={0.2} />
        {/* Trunk */}
        <mesh material={mat} position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.12, 0.2, 2, 8]} />
        </mesh>
        {/* Branches */}
        {branches.map(([bx, by, bz, length, radius], i) => (
          <mesh key={i} material={mat} position={[bx, by, bz]} rotation={[0, 0, Math.atan2(bx, bz)]}>
            <cylinderGeometry args={[radius * 0.4, radius, length, 6]} />
          </mesh>
        ))}
        {/* Leaves / fruit */}
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2;
          const h = 1.5 + (i % 3) * 0.7;
          const r = 0.8;
          return (
            <Sphere key={`leaf-${i}`} args={[0.12 + Math.random() * 0.1, 8, 8]} position={[Math.cos(a) * r, h, Math.sin(a) * r]}>
              <meshPhysicalMaterial
                color={new Color(color)}
                emissive={new Color(color)}
                emissiveIntensity={0.5}
                roughness={0.4}
              />
            </Sphere>
          );
        })}
      </group>
    </Float>
  );
}

// ═══════════════════════════════════════════════════════
// TERRITORY — MATHEMATICS (Platonic Solids)
// ═══════════════════════════════════════════════════════
function MathsTerritory({
  color,
  hovered,
}: {
  color: string;
  hovered: boolean;
}) {
  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new Color(color),
        emissive: new Color(color),
        emissiveIntensity: hovered ? 0.5 : 0.15,
        metalness: 0.4,
        roughness: 0.15,
        clearcoat: 0.9,
        wireframe: false,
      }),
    [color, hovered]
  );

  const wireMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [color]
  );

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
      <group>
        <Sparkles count={20} size={2} scale={[3, 3, 3]} color={color} speed={0.5} />
        {/* Icosahedron (20 faces) */}
        <mesh material={mat}>
          <icosahedronGeometry args={[1.0, 0]} />
        </mesh>
        <mesh material={wireMat} scale={1.05}>
          <icosahedronGeometry args={[1.0, 0]} />
        </mesh>
        {/* Orbiting solids */}
        {[
          { geo: "octahedronGeometry", args: [0.3], r: 1.6, y: 0.8, speed: 0.5 },
          { geo: "dodecahedronGeometry", args: [0.25], r: 1.5, y: -0.5, speed: -0.4 },
          { geo: "tetrahedronGeometry", args: [0.2], r: 1.7, y: 0.3, speed: 0.6 },
          { geo: "octahedronGeometry", args: [0.15], r: 1.4, y: 1.2, speed: -0.35 },
          { geo: "dodecahedronGeometry", args: [0.18], r: 1.65, y: -0.8, speed: 0.45 },
        ].map((s, i) => (
          <OrbitingSolid key={i} {...s} color={color} material={mat} wireMat={wireMat} />
        ))}
        {/* Base ring */}
        <Torus args={[1.8, 0.03, 8, 48]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color={color} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
        </Torus>
      </group>
    </Float>
  );
}

function OrbitingSolid({
  geo,
  args,
  r,
  y,
  speed,
  color,
  material,
  wireMat,
}: {
  geo: string;
  args: number[];
  r: number;
  y: number;
  speed: number;
  color: string;
  material: THREE.MeshPhysicalMaterial;
  wireMat: THREE.MeshBasicMaterial;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime * speed;
    meshRef.current.position.set(Math.cos(t) * r, y, Math.sin(t) * r);
    meshRef.current.rotation.x += 0.02;
    meshRef.current.rotation.y += 0.03;
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const GeometryClass = (THREE as any)[geo];
  return (
    <mesh ref={meshRef} material={material}>
      <GeometryClass args={args} />
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════
// TERRITORY — ENGLISH (Flowing Ribbons)
// ═══════════════════════════════════════════════════════
function EnglishTerritory({
  color,
  hovered,
}: {
  color: string;
  hovered: boolean;
}) {
  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new Color(color),
        emissive: new Color(color),
        emissiveIntensity: hovered ? 0.45 : 0.1,
        metalness: 0.3,
        roughness: 0.25,
        clearcoat: 0.7,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      }),
    [color, hovered]
  );

  return (
    <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.45}>
      <group>
        <Sparkles count={18} size={2} scale={[3, 3, 3]} color={color} speed={0.35} />
        {/* Torus knot ribbons */}
        <TorusKnot args={[0.8, 0.12, 100, 16, 2, 3]} material={mat} />
        <TorusKnot args={[1.2, 0.06, 80, 12, 3, 4]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <meshBasicMaterial color={color} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
        </TorusKnot>
        {/* Floating letter-like orbs */}
        {Array.from({ length: 8 }).map((_, i) => {
          const t = i / 8 * Math.PI * 2;
          return (
            <Sphere key={`orb-${i}`} args={[0.08, 16, 16]} position={[Math.cos(t) * 1.3, Math.sin(t * 2) * 0.5, Math.sin(t) * 1.3]}>
              <meshBasicMaterial color={color} blending={THREE.AdditiveBlending} />
            </Sphere>
          );
        })}
      </group>
    </Float>
  );
}

// ═══════════════════════════════════════════════════════
// TERRITORY — HINDI (Saffron Spires)
// ═══════════════════════════════════════════════════════
function HindiTerritory({
  color,
  hovered,
}: {
  color: string;
  hovered: boolean;
}) {
  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new Color(color),
        emissive: new Color(color),
        emissiveIntensity: hovered ? 0.5 : 0.15,
        metalness: 0.35,
        roughness: 0.2,
        clearcoat: 0.8,
      }),
    [color, hovered]
  );

  const goldenMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new Color(ATLAS_GOLD),
        emissive: new Color(ATLAS_GOLD),
        emissiveIntensity: hovered ? 0.6 : 0.2,
        metalness: 0.8,
        roughness: 0.1,
        clearcoat: 1,
      }),
    [hovered]
  );

  const spires = useMemo(() => {
    const s: { x: number; z: number; h: number; r: number }[] = [];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const r = 0.6 + Math.random() * 1.0;
      s.push({
        x: Math.cos(a) * r,
        z: Math.sin(a) * r,
        h: 1 + Math.random() * 3.5,
        r: 0.08 + Math.random() * 0.12,
      });
    }
    return s;
  }, []);

  return (
    <Float speed={1.3} rotationIntensity={0.08} floatIntensity={0.4}>
      <group>
        <Sparkles count={22} size={2} scale={[3, 3, 3]} color={color} speed={0.3} />
        {/* Central golden dome */}
        <mesh material={goldenMat} position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
        </mesh>
        {/* Spires */}
        {spires.map((s, i) => (
          <mesh key={i} material={mat} position={[s.x, s.h / 2, s.z]}>
            <cylinderGeometry args={[s.r, s.r * 1.3, s.h, 6]} />
          </mesh>
        ))}
        {/* Spire tips */}
        {spires.map((s, i) => (
          <Sphere key={`tip-${i}`} args={[s.r * 1.5, 8, 8]} position={[s.x, s.h, s.z]}>
            <meshBasicMaterial color={ATLAS_GOLD} blending={THREE.AdditiveBlending} />
          </Sphere>
        ))}
        {/* Connecting base */}
        <Torus args={[1.5, 0.04, 8, 48]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color={color} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
        </Torus>
      </group>
    </Float>
  );
}

// ═══════════════════════════════════════════════════════
// TERRITORY WRAPPER
// ═══════════════════════════════════════════════════════
function Territory({
  subject,
  position,
  onClick,
  onHover,
  isHovered,
}: {
  subject: SubjectData;
  position: [number, number, number];
  onClick: () => void;
  onHover: (val: boolean) => void;
  isHovered: boolean;
}) {
  const groupRef = useRef<Group>(null);
  const innerRef = useRef<Group>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Pulse animation
  useFrame(({ clock }) => {
    if (!innerRef.current) return;
    const t = clock.elapsedTime;
    const scale = isHovered ? 1.15 : 1 + Math.sin(t * 1.5) * 0.04;
    innerRef.current.scale.lerp(
      new THREE.Vector3(scale, scale, scale),
      0.08
    );
    const yOff = isHovered ? 0.4 : Math.sin(t * 0.8) * 0.12;
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + yOff;
    }
  });

  const renderTerritory = () => {
    switch (subject.id) {
      case "physics":
        return (
          <PhysicsTerritory color={subject.color} hovered={isHovered} />
        );
      case "chemistry":
        return (
          <ChemistryTerritory color={subject.color} hovered={isHovered} />
        );
      case "biology":
        return (
          <BiologyTerritory color={subject.color} hovered={isHovered} />
        );
      case "maths":
        return (
          <MathsTerritory color={subject.color} hovered={isHovered} />
        );
      case "english":
        return (
          <EnglishTerritory color={subject.color} hovered={isHovered} />
        );
      case "hindi":
        return (
          <HindiTerritory color={subject.color} hovered={isHovered} />
        );
      default:
        return null;
    }
  };

  return (
    <group ref={groupRef} position={position}>
      <group
        ref={innerRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(false);
          document.body.style.cursor = "auto";
        }}
      >
        {isLoaded ? (
          renderTerritory()
        ) : (
          <Sphere args={[0.5, 16, 16]} onClick={() => setIsLoaded(true)}>
            <meshBasicMaterial color={subject.color} />
          </Sphere>
        )}
        <Billboard
          follow
          position={[0, 2.2, 0]}
          lockX={false}
          lockY={false}
          lockZ={false}
        >
          <Text
            fontSize={0.52}
            color={ATLAS_GOLD}
            anchorX="center"
            anchorY="bottom"
            outlineWidth={0.03}
            outlineColor={ATLAS_DARK}
          >
            {subject.name}
          </Text>
          <Text
            fontSize={0.32}
            color="#E8E0CC"
            anchorX="center"
            anchorY="top"
            position={[0, -0.12, 0]}
            outlineWidth={0.02}
            outlineColor={ATLAS_DARK}
          >
            {subject.native}
          </Text>
        </Billboard>
        {/* Glow base */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
          <ringGeometry args={[1.2, 1.8, 32]} />
          <meshBasicMaterial
            color={subject.color}
            transparent
            opacity={isHovered ? 0.4 : 0.15}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

// ═══════════════════════════════════════════════════════
// COMPANION SPIRIT
// ═══════════════════════════════════════════════════════
function Companion() {
  const groupRef = useRef<Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const trailPositions = useRef<THREE.Vector3[]>([]);
  const trailRef = useRef<THREE.Points>(null);
  const waypointIndex = useRef(0);
  const companionSpeed = useRef(0.35);

  // Generate circular waypoints passing through each territory
  const waypoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < SUBJECTS.length; i++) {
      const a = (i / SUBJECTS.length) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * TERRITORY_RADIUS, 1, Math.sin(a) * TERRITORY_RADIUS));
    }
    return pts;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Move toward current waypoint
    const target = waypoints[waypointIndex.current];
    const currentPos = groupRef.current.position;
    const dir = new THREE.Vector3().subVectors(target, currentPos);

    if (dir.length() < 0.5) {
      waypointIndex.current = (waypointIndex.current + 1) % waypoints.length;
    }

    dir.normalize();
    const speed = companionSpeed.current * delta;
    const newPos = currentPos.clone().add(dir.clone().multiplyScalar(speed));

    // Mouse influence
    if (mouseState.active) {
      const mouseTarget = new THREE.Vector3(
        mouseState.x * 10,
        mouseState.y * 5 + 2,
        -3
      );
      newPos.lerp(mouseTarget, 0.01);
    }

    // Smooth follow
    groupRef.current.position.lerp(newPos, 0.03);

    // Face direction of travel
    const velocity = new THREE.Vector3().subVectors(newPos, currentPos);
    if (velocity.length() > 0.01) {
      const angle = Math.atan2(velocity.x, velocity.z);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        angle,
        0.05
      );
    }

    // Floating bob
    groupRef.current.position.y +=
      Math.sin(Date.now() * 0.003) * 0.015 * delta * 10;

    // Pulse glow
    if (glowRef.current) {
      const pulse = 1 + Math.sin(Date.now() * 0.005) * 0.3;
      glowRef.current.intensity = 1.5 * pulse;
    }

    // Update trail
    const pos = groupRef.current.position.clone();
    trailPositions.current.unshift(pos);
    if (trailPositions.current.length > 40) trailPositions.current.pop();

    if (trailRef.current) {
      const posArr = trailRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      const arr = posArr.array as Float32Array;
      for (let i = 0; i < trailPositions.current.length; i++) {
        arr[i * 3] = trailPositions.current[i].x;
        arr[i * 3 + 1] = trailPositions.current[i].y;
        arr[i * 3 + 2] = trailPositions.current[i].z;
      }
      trailRef.current.geometry.setDrawRange(
        0,
        trailPositions.current.length
      );
      trailRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const trailData = useMemo(
    () => ({
      positions: new Float32Array(40 * 3),
      sizes: new Float32Array(40),
    }),
    []
  );

  // Initialize sizes
  useEffect(() => {
    for (let i = 0; i < 40; i++) {
      trailData.sizes[i] = (1 - i / 40) * 0.15;
    }
  }, []);

  return (
    <group ref={groupRef} position={[TERRITORY_RADIUS, 1, 0]}>
      {/* Point light */}
      <pointLight ref={glowRef} color={ATLAS_GOLD} intensity={1.5} distance={8} />

      {/* Main spirit orb */}
      <Float speed={4} floatIntensity={0.3}>
        <Sphere args={[0.15, 16, 16]}>
          <meshBasicMaterial
            color={ATLAS_GOLD}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </Sphere>
      </Float>

      {/* Outer glow shell */}
      <Sphere args={[0.3, 16, 16]}>
        <meshBasicMaterial
          color={ATLAS_GOLD}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Particle trail */}
      <points ref={trailRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={40}
            array={trailData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={40}
            array={trailData.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          color={ATLAS_GOLD}
          size={0.1}
          sizeAttenuation
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// ═══════════════════════════════════════════════════════
// CENTRAL CORE (Atlas Heart)
// ═══════════════════════════════════════════════════════
function CentralCore() {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.1;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;

    if (coreRef.current) {
      const s = 1 + Math.sin(t * 2) * 0.08;
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <Float speed={1} floatIntensity={0.2}>
      <group ref={groupRef}>
        <Sparkles count={40} size={4} scale={[6, 6, 6]} color={ATLAS_GOLD} speed={0.2} />
        <mesh ref={coreRef} position={[0, 0, 0]}>
          <icosahedronGeometry args={[0.9, 2]} />
          <meshPhysicalMaterial
            color={new Color(ATLAS_GOLD)}
            emissive={new Color(ATLAS_GOLD)}
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0}
            transparent
            opacity={0.7}
          />
        </mesh>
        {/* Inner glow */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial
            color={ATLAS_GOLD}
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        {/* Outer ring */}
        <Torus args={[2.2, 0.05, 8, 64]} rotation={[Math.PI / 2.5, 0, 0]}>
          <meshBasicMaterial
            color={ATLAS_GOLD}
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </Torus>
        <Torus args={[2.5, 0.03, 8, 64]} rotation={[-Math.PI / 3, Math.PI / 5, 0]}>
          <meshBasicMaterial
            color={ATLAS_GOLD}
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </Torus>
      </group>
    </Float>
  );
}

// ═══════════════════════════════════════════════════════
// WORLD LIGHTS (animated)
// ═══════════════════════════════════════════════════════
function WorldLights({ time }: { time: number }) {
  const lightsRef = useRef<THREE.Group>(null);
  const dayPhase = (time % DAY_DURATION) / DAY_DURATION;

  const getIntensity = useCallback(
    (base: number) => {
      // Brightest during midday (0.5)
      const brightness =
        Math.sin((dayPhase - 0.15) * Math.PI * 2) * 0.5 + 0.5;
      return base * (0.3 + brightness * 0.7);
    },
    [dayPhase]
  );

  const getSunColor = useCallback((): string => {
    if (dayPhase < 0.2 || dayPhase > 0.85) return "#334466";
    if (dayPhase < 0.3) return lerpColor("#FF6B35", "#FFDD88", (dayPhase - 0.2) / 0.1);
    if (dayPhase > 0.75) return lerpColor("#FFDD88", "#FF6B35", (dayPhase - 0.75) / 0.1);
    return "#FFDD88";
  }, [dayPhase]);

  return (
    <group ref={lightsRef}>
      {/* Ambient */}
      <ambientLight
        color="#334466"
        intensity={getIntensity(0.4)}
      />
      {/* Main directional (sun) */}
      <directionalLight
        color={getSunColor()}
        intensity={getIntensity(2)}
        position={[10, 15, 5]}
      />
      {/* Central glow point light */}
      <pointLight
        color={ATLAS_GOLD}
        intensity={getIntensity(3)}
        distance={25}
        position={[0, 2, 0]}
      />
      {/* Per-subject point lights */}
      {SUBJECTS.map((s) => {
        const pos: [number, number, number] = [
          Math.cos(s.angle) * TERRITORY_RADIUS,
          2,
          Math.sin(s.angle) * TERRITORY_RADIUS,
        ];
        return (
          <pointLight
            key={s.id}
            color={s.color}
            intensity={getIntensity(1.2)}
            distance={10}
            position={pos}
          />
        );
      })}
    </group>
  );
}

// ═══════════════════════════════════════════════════════
// WORLD (Main scene content)
// ═══════════════════════════════════════════════════════
function World({
  hoveredSubject,
  setHoveredSubject,
  onTerritoryClick,
  time,
}: {
  hoveredSubject: string | null;
  setHoveredSubject: (id: string | null) => void;
  onTerritoryClick: () => void;
  time: number;
}) {
  const worldRef = useRef<Group>(null);
  const { viewport, camera } = useThree();

  // Territory positions
  const territoryPositions = useMemo(() => {
    return SUBJECTS.map((s) => [
      Math.cos(s.angle) * TERRITORY_RADIUS,
      0,
      Math.sin(s.angle) * TERRITORY_RADIUS,
    ] as [number, number, number]);
  }, []);

  // Mouse parallax for world rotation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseState.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseState.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseState.active = true;
    };
    const handleMouseLeave = () => {
      mouseState.active = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Idle timeout
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();
  const idleRef = useRef(true);
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleActivity = () => {
      mouseState.active = true;
      idleRef.current = false;
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        idleRef.current = true;
      }, 4000);
    };
    window.addEventListener("mousemove", handleActivity);
    return () => {
      window.removeEventListener("mousemove", handleActivity);
      clearTimeout(idleTimer.current);
    };
  }, []);

  useFrame((_, delta) => {
    if (!worldRef.current) return;
    const t = Date.now() * 0.0001;

    // Subtle auto-rotate
    if (idleRef.current) {
      targetRotation.current.y += delta * 0.08;
    } else {
      // Mouse parallax (subtle)
      targetRotation.current.y +=
        (mouseState.x * 0.15 - targetRotation.current.y) * 0.02;
      targetRotation.current.x +=
        (mouseState.y * 0.08 - targetRotation.current.x) * 0.02;
    }

    // Smooth lerp
    worldRef.current.rotation.y +=
      (targetRotation.current.y - worldRef.current.rotation.y) * 0.03;
    worldRef.current.rotation.x +=
      (targetRotation.current.x - worldRef.current.rotation.x) * 0.03;
  });

  return (
    <group ref={worldRef}>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
        <circleGeometry args={[25, 64]} />
        <meshStandardMaterial
          color="#0A0812"
          roughness={0.95}
          metalness={0.05}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Grid rings on ground */}
      {[3, 6, 9, 12, 15, 18, 22].map((r, i) => (
        <Torus key={`grid-${i}`} args={[r, 0.01, 4, 80]} rotation={[Math.PI / 2, 0, 0]} position={[0, -2.48, 0]}>
          <meshBasicMaterial
            color={ATLAS_GOLD}
            transparent
            opacity={0.06 - i * 0.006}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </Torus>
      ))}
      {/* Radial lines */}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return (
          <mesh key={`line-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.49, 0]}>
            <planeGeometry args={[22, 0.005]} />
            <meshBasicMaterial
              color={ATLAS_GOLD}
              transparent
              opacity={0.04}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
            {/* @ts-ignore */}
            {/* We need to rotate the plane... use a simpler approach */}
          </mesh>
        );
      })}

      {/* Central Core */}
      <CentralCore />

      {/* Territories */}
      {SUBJECTS.map((subject, i) => (
        <Territory
          key={subject.id}
          subject={subject}
          position={territoryPositions[i]}
          onClick={onTerritoryClick}
          onHover={(val) => setHoveredSubject(val ? subject.id : null)}
          isHovered={hoveredSubject === subject.id}
        />
      ))}

      {/* Energy Bridges */}
      {SUBJECTS.map((subject, i) => {
        const nextIndex = (i + 1) % SUBJECTS.length;
        const next = SUBJECTS[nextIndex];
        return (
          <EnergyBridge
            key={`bridge-${subject.id}`}
            start={territoryPositions[i]}
            end={territoryPositions[nextIndex]}
            color={subject.color}
            progress={i / SUBJECTS.length}
          />
        );
      })}

      {/* Companion */}
      <Companion />
    </group>
  );
}

// ═══════════════════════════════════════════════════════
// CAMERA CONTROLLER
// ═══════════════════════════════════════════════════════
function CameraController({
  onFlyTo,
}: {
  onFlyTo: (pos: [number, number, number]) => void;
}) {
  const { camera, invalidate } = useThree();
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const flyTarget = useRef<THREE.Vector3 | null>(null);

  useEffect(() => {
    camera.position.set(0, 14, 22);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame(() => {
    if (flyTarget.current) {
      // Smooth camera fly
      camera.position.lerp(flyTarget.current, 0.02);
      targetLookAt.current.set(0, 0, 0);
      if (camera.position.distanceTo(flyTarget.current) < 0.1) {
        flyTarget.current = null;
      }
    }
    currentLookAt.current.lerp(targetLookAt.current, 0.05);
    camera.lookAt(currentLookAt.current);
  });

  // Expose flyTo method
  useEffect(() => {
    (window as unknown as WindowExtensions).__flyCameraTo = (pos: [number, number, number]) => {
      flyTarget.current = new THREE.Vector3(...pos);
    };
    (window as unknown as WindowExtensions).__flyToSubject = (id: string) => {
      const subject = SUBJECTS.find(s => s.id === id);
      if (!subject) return;
      const angle = subject.angle;
      const flyPos: [number, number, number] = [
        Math.cos(angle) * TERRITORY_RADIUS * 0.7,
        5,
        Math.sin(angle) * TERRITORY_RADIUS * 0.7 + 6,
      ];
      (window as unknown as WindowExtensions).__flyCameraTo?.(flyPos);
    };
  }, []);

  return null;
}

// ═══════════════════════════════════════════════════════
// LOADING OVERLAY
// ═══════════════════════════════════════════════════════
function LoadingOverlay() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 15, 90));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleLoaded = useCallback(() => {
    setProgress(100);
  }, []);

  // Expose to parent
  useEffect(() => {
    (window as unknown as WindowExtensions).__atlasLoaded = handleLoaded;
  }, [handleLoaded]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05030A]">
      <div className="relative mb-8">
        {/* Spinning ring */}
        <div
          className="w-20 h-20 rounded-full border-2 border-transparent animate-spin"
          style={{
            borderTopColor: ATLAS_GOLD,
            borderRightColor: "rgba(245,166,35,0.3)",
            animationDuration: "1.5s",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Compass className="w-8 h-8" style={{ color: ATLAS_GOLD }} />
        </div>
      </div>
      <h2
        className="text-xl font-bold tracking-wider mb-2"
        style={{ color: ATLAS_GOLD }}
      >
        ATLAS
      </h2>
      <p className="text-sm text-gray-500 mb-6 tracking-wide">
        Preparing your world...
      </p>
      <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: ATLAS_GOLD }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// FALLBACK for Suspense
// ═══════════════════════════════════════════════════════
function TerritoryFallback() {
  return (
    <Sphere args={[0.5, 16, 16]} position={[0, 0, 0]}>
      <meshBasicMaterial color={ATLAS_GOLD} wireframe />
    </Sphere>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN: AtlasHero3D
// ═══════════════════════════════════════════════════════
export default function AtlasHero3D({
  onEnter,
  className,
}: AtlasHero3DProps) {
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState(0);

  // Track elapsed time for day/night cycle
  useEffect(() => {
    const startTime = Date.now();
    const tick = () => {
      setTime((Date.now() - startTime) / 1000);
      rafId = requestAnimationFrame(tick);
    };
    let rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleTerritoryClick = useCallback(() => {
    onEnter?.();
  }, [onEnter]);

  const handleCanvasCreated = useCallback(() => {
    setTimeout(() => {
      const loadedFn = (window as unknown as WindowExtensions).__atlasLoaded;
      loadedFn?.();
      setTimeout(() => setLoaded(true), 600);
    }, 1500);
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <LoadingOverlay />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Canvas */}
      <div className={className} style={{ position: "absolute", inset: 0 }}>
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-[#05030A]">
              <div
                className="w-12 h-12 rounded-full border-2 animate-spin"
                style={{
                  borderColor: "transparent",
                  borderTopColor: ATLAS_GOLD,
                  animationDuration: "1s",
                }}
              />
            </div>
          }
        >
          <Canvas
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: "high-performance",
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.2,
            }}
            camera={{ position: [0, 14, 22], fov: 50, near: 0.5, far: 120 }}
            onCreated={handleCanvasCreated}
            frameloop="always"
          >
            {/* Background color */}
            <color attach="background" args={[WORLD_BG]} />
            <fog attach="fog" args={["#05030A", 20, 60]} />

            {/* World content */}
            <Suspense fallback={null}>
              <SkyDome time={time} />
            </Suspense>

            <Suspense fallback={null}>
              <StarField />
            </Suspense>

            <Suspense fallback={null}>
              <AmbientDust count={250} />
            </Suspense>

            <Suspense fallback={null}>
              <WorldLights time={time} />
            </Suspense>

            <Suspense fallback={null}>
              <World
                hoveredSubject={hoveredSubject}
                setHoveredSubject={setHoveredSubject}
                onTerritoryClick={handleTerritoryClick}
                time={time}
              />
            </Suspense>

            <Suspense fallback={null}>
              <CameraController
                onFlyTo={() => {}}
              />
            </Suspense>

            {/* Post-processing */}
            <EffectComposer>
              <Bloom
                intensity={0.7}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
              <Vignette
                eskil={false}
                offset={0.1}
                darkness={0.6}
              />
              <ChromaticAberration
                blendFunction={THREE.NormalBlending}
                offset={new THREE.Vector2(0.0004, 0.0004)}
                radialModulation={false}
                modulationOffset={0}
              />
            </EffectComposer>
          </Canvas>
        </Suspense>
      </div>

      {/* Hover label overlay */}
      <AnimatePresence>
        {hoveredSubject && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
          >
            <div
              className="px-6 py-3 rounded-2xl backdrop-blur-xl border"
              style={{
                backgroundColor: "rgba(11,10,15,0.8)",
                borderColor: `${SUBJECTS.find(s => s.id === hoveredSubject)?.color}40`,
                boxShadow: `0 0 30px ${SUBJECTS.find(s => s.id === hoveredSubject)?.color}20`,
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">
                  {SUBJECTS.find(s => s.id === hoveredSubject)?.emoji}
                </span>
                <div>
                  <p
                    className="font-bold text-sm tracking-wide"
                    style={{
                      color: SUBJECTS.find(s => s.id === hoveredSubject)?.color,
                    }}
                  >
                    {SUBJECTS.find(s => s.id === hoveredSubject)?.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {SUBJECTS.find(s => s.id === hoveredSubject)?.native}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      >
        <p className="text-xs text-gray-500 tracking-widest uppercase">
          Explore the world of knowledge
        </p>
      </motion.div>
    </>
  );
}