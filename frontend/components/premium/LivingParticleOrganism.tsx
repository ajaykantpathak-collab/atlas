'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ============================================================
// LIVING PARTICLE ORGANISM — v4 (FIRECRACKER BATTLE)
//
// Concept:
//   Two firecracker epicenters burst explosively.
//   Particles from each repel the other group — they fight for space.
//   9 stages (scroll-driven), each a new burst configuration.
//   The system remembers: particle trails persist, past burst energy
//   lingers in the field, battle history saved to localStorage.
//   "Nothing here is forgotten."
//
// Physics:
//   - Each particle belongs to epicenter A or B
//   - Burst: explosive radial velocity from its epicenter
//   - Intra-group: mild cohesion (particles stay near their own kind)
//   - Inter-group: strong repulsion (the two firecrackers fight)
//   - Friction slows particles over time
//   - Trail: each particle leaves a fading ghost position (memory)
//   - 9 stages: scroll triggers new bursts with different params
// ============================================================

const PARTICLE_COUNT = 40000;
const HALF = PARTICLE_COUNT / 2;

// --- 9 burst stages ---
// Each stage defines: epicenter A position, epicenter B position,
// burst intensity, repulsion strength, cohesion, color tint
interface Stage {
  name: string;
  posA: [number, number];
  posB: [number, number];
  burstPower: number;   // explosive outward velocity
  repulsion: number;    // inter-group repulsion (the fight)
  cohesion: number;     // intra-group cohesion
  friction: number;      // velocity damping
  tintA: [number, number, number]; // color of group A
  tintB: [number, number, number]; // color of group B
}

const STAGES: Stage[] = [
  {
    name: 'ignition',
    posA: [-2.5, 0], posB: [2.5, 0],
    burstPower: 3.0, repulsion: 5.0, cohesion: 0.5, friction: 0.92,
    tintA: [1.0, 0.85, 0.6], tintB: [0.6, 0.8, 1.0],
  },
  {
    name: 'spark',
    posA: [-3, 1.5], posB: [3, -1.5],
    burstPower: 4.0, repulsion: 6.0, cohesion: 0.4, friction: 0.90,
    tintA: [1.0, 0.7, 0.4], tintB: [0.4, 0.7, 1.0],
  },
  {
    name: 'bloom',
    posA: [0, 2.5], posB: [0, -2.5],
    burstPower: 5.0, repulsion: 7.0, cohesion: 0.3, friction: 0.88,
    tintA: [1.0, 0.9, 0.5], tintB: [0.5, 0.9, 1.0],
  },
  {
    name: 'clash',
    posA: [-2, -2], posB: [2, 2],
    burstPower: 6.0, repulsion: 9.0, cohesion: 0.2, friction: 0.86,
    tintA: [1.0, 0.6, 0.3], tintB: [0.3, 0.6, 1.0],
  },
  {
    name: 'cascade',
    posA: [-3.5, 0], posB: [3.5, 0],
    burstPower: 7.0, repulsion: 10.0, cohesion: 0.15, friction: 0.84,
    tintA: [1.0, 0.5, 0.2], tintB: [0.2, 0.5, 1.0],
  },
  {
    name: 'frenzy',
    posA: [-1.5, 2], posB: [1.5, -2],
    burstPower: 8.0, repulsion: 12.0, cohesion: 0.1, friction: 0.82,
    tintA: [1.0, 0.4, 0.15], tintB: [0.15, 0.4, 1.0],
  },
  {
    name: 'inferno',
    posA: [0, 0], posB: [0, 0], // same center — maximum clash
    burstPower: 9.0, repulsion: 15.0, cohesion: 0.05, friction: 0.80,
    tintA: [1.0, 0.3, 0.1], tintB: [0.1, 0.3, 1.0],
  },
  {
    name: 'aftermath',
    posA: [-3, -1], posB: [3, 1],
    burstPower: 4.0, repulsion: 4.0, cohesion: 0.6, friction: 0.94,
    tintA: [1.0, 0.8, 0.5], tintB: [0.5, 0.8, 1.0],
  },
  {
    name: 'echo',
    posA: [-2, 1], posB: [2, -1],
    burstPower: 2.0, repulsion: 2.0, cohesion: 0.8, friction: 0.96,
    tintA: [1.0, 0.95, 0.8], tintB: [0.8, 0.95, 1.0],
  },
];

// --- Lerp helper ---
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function lerpStage(a: Stage, b: Stage, t: number): Stage {
  return {
    name: t < 0.5 ? a.name : b.name,
    posA: [lerp(a.posA[0], b.posA[0], t), lerp(a.posA[1], b.posA[1], t)],
    posB: [lerp(a.posB[0], b.posB[0], t), lerp(a.posB[1], b.posB[1], t)],
    burstPower: lerp(a.burstPower, b.burstPower, t),
    repulsion: lerp(a.repulsion, b.repulsion, t),
    cohesion: lerp(a.cohesion, b.cohesion, t),
    friction: lerp(a.friction, b.friction, t),
    tintA: [lerp(a.tintA[0], b.tintA[0], t), lerp(a.tintA[1], b.tintA[1], t), lerp(a.tintA[2], b.tintA[2], t)],
    tintB: [lerp(a.tintB[0], b.tintB[0], t), lerp(a.tintB[1], b.tintB[1], t), lerp(a.tintB[2], b.tintB[2], t)],
  };
}

function getStage(scroll: number): { stage: Stage; idx: number; t: number } {
  const scaled = scroll * (STAGES.length - 1);
  const idx = Math.floor(scaled);
  const t = scaled - idx;
  const current = STAGES[idx];
  const next = STAGES[Math.min(idx + 1, STAGES.length - 1)];
  return { stage: lerpStage(current, next, t), idx, t };
}

// --- Mouse memory ---
interface MemoryPoint { x: number; y: number; strength: number; timestamp: number }
const MAX_MEMORY = 150;
const MEM_KEY = 'organism_firecracker_memory';
const SCROLL_KEY = 'organism_firecracker_scroll';
const BATTLE_KEY = 'organism_battle_history';

function loadMemory(): MemoryPoint[] {
  try {
    const s = localStorage.getItem(MEM_KEY);
    if (s) {
      const now = Date.now();
      return (JSON.parse(s) as MemoryPoint[])
        .filter(m => now - m.timestamp < 600000)
        .map(m => ({ ...m, strength: m.strength * 0.4 }));
    }
  } catch {}
  return [];
}
function saveMemory(m: MemoryPoint[]) {
  try { localStorage.setItem(MEM_KEY, JSON.stringify(m.slice(-MAX_MEMORY))); } catch {}
}
function loadScroll(): number {
  try { return parseFloat(localStorage.getItem(SCROLL_KEY) || '0'); } catch { return 0; }
}
function saveScroll(s: number) {
  try { localStorage.setItem(SCROLL_KEY, String(s)); } catch {}
}
// Battle history — how many times each stage has been visited
function loadBattleHistory(): number[] {
  try {
    const s = localStorage.getItem(BATTLE_KEY);
    if (s) return JSON.parse(s);
  } catch {}
  return new Array(STAGES.length).fill(0);
}
function saveBattleHistory(h: number[]) {
  try { localStorage.setItem(BATTLE_KEY, JSON.stringify(h)); } catch {}
}

// --- Firecracker simulation ---
class FirecrackerBattle {
  count: number;
  positions: Float32Array;   // x, y interleaved
  velocities: Float32Array;  // vx, vy interleaved
  group: Uint8Array;         // 0 = group A, 1 = group B
  trailX: Float32Array;      // previous position (memory trail)
  trailY: Float32Array;
  burstTime: Float32Array;   // when this particle last burst (for fade)
  age: Float32Array;         // particle age

  constructor(count: number) {
    this.count = count;
    this.positions = new Float32Array(count * 2);
    this.velocities = new Float32Array(count * 2);
    this.group = new Uint8Array(count);
    this.trailX = new Float32Array(count);
    this.trailY = new Float32Array(count);
    this.burstTime = new Float32Array(count);
    this.age = new Float32Array(count);

    // First half = group A, second half = group B
    for (let i = 0; i < count; i++) {
      this.group[i] = i < HALF ? 0 : 1;
      // Start at epicenter
      const stage = STAGES[0];
      const center = i < HALF ? stage.posA : stage.posB;
      this.positions[i * 2] = center[0];
      this.positions[i * 2 + 1] = center[1];
      // Initial burst velocity (radial outward)
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * stage.burstPower;
      this.velocities[i * 2] = Math.cos(angle) * speed;
      this.velocities[i * 2 + 1] = Math.sin(angle) * speed;
      this.trailX[i] = center[0];
      this.trailY[i] = center[1];
      this.burstTime[i] = 0;
      this.age[i] = 0;
    }
  }

  burst(stage: Stage, time: number, groupFilter: number = -1) {
    // Re-energize particles: give them explosive velocity from their epicenter
    for (let i = 0; i < this.count; i++) {
      if (groupFilter >= 0 && this.group[i] !== groupFilter) continue;
      const center = this.group[i] === 0 ? stage.posA : stage.posB;
      // Teleport to epicenter
      this.positions[i * 2] = center[0] + (Math.random() - 0.5) * 0.3;
      this.positions[i * 2 + 1] = center[1] + (Math.random() - 0.5) * 0.3;
      // Explosive radial velocity
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.5 + Math.random() * 0.5) * stage.burstPower;
      this.velocities[i * 2] = Math.cos(angle) * speed;
      this.velocities[i * 2 + 1] = Math.sin(angle) * speed;
      this.burstTime[i] = time;
      this.age[i] = 0;
    }
  }

  step(stage: Stage, dt: number, time: number, mouse: { x: number; y: number; active: boolean }, memory: MemoryPoint[]) {
    const posA = stage.posA;
    const posB = stage.posB;
    const repulsion = stage.repulsion;
    const cohesion = stage.cohesion;
    const friction = stage.friction;

    for (let i = 0; i < this.count; i++) {
      const px = this.positions[i * 2];
      const py = this.positions[i * 2 + 1];
      const g = this.group[i];

      // Save trail (memory of where particle was)
      this.trailX[i] = px;
      this.trailY[i] = py;

      let fx = 0;
      let fy = 0;

      // Repulsion from the OTHER epicenter (the fight)
      const otherCenter = g === 0 ? posB : posA;
      const ddx_other = px - otherCenter[0];
      const ddy_other = py - otherCenter[1];
      const distOther = Math.sqrt(ddx_other * ddx_other + ddy_other * ddy_other);
      if (distOther > 0.01 && distOther < 6.0) {
        const force = repulsion / (distOther * distOther + 0.5);
        fx += (ddx_other / distOther) * force;
        fy += (ddy_other / distOther) * force;
      }

      // Cohesion toward own epicenter (keep the group together)
      const ownCenter = g === 0 ? posA : posB;
      const ddx_own = ownCenter[0] - px;
      const ddy_own = ownCenter[1] - py;
      const distOwn = Math.sqrt(ddx_own * ddx_own + ddy_own * ddy_own);
      if (distOwn > 0.01) {
        const force = cohesion * 0.05;
        fx += (ddx_own / distOwn) * force;
        fy += (ddy_own / distOwn) * force;
      }

      // Mouse interaction — push particles away from cursor
      if (mouse.active) {
        const ddx_m = px - mouse.x;
        const ddy_m = py - mouse.y;
        const distM = Math.sqrt(ddx_m * ddx_m + ddy_m * ddy_m);
        if (distM > 0.01 && distM < 3.0) {
          const force = 2.0 / (distM * distM + 0.3);
          fx += (ddx_m / distM) * force;
          fy += (ddy_m / distM) * force;
        }
      }

      // Memory attraction — particles drift toward remembered mouse positions
      const memLen = memory.length;
      if (memLen > 0) {
        for (let m = 0; m < 3; m++) {
          const mi = Math.floor((m / 3) * memLen + memLen / 6);
          if (mi >= memLen) continue;
          const mp = memory[mi];
          const ddx = mp.x - px;
          const ddy = mp.y - py;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist > 0.3 && dist < 4.0) {
            const force = mp.strength * 0.1 / (dist * 0.5 + 0.5);
            fx += (ddx / dist) * force;
            fy += (ddy / dist) * force;
          }
        }
      }

      // Update velocity
      let vx = this.velocities[i * 2] + fx * dt;
      let vy = this.velocities[i * 2 + 1] + fy * dt;

      // Friction
      vx *= friction;
      vy *= friction;

      // Clamp
      const speed = Math.sqrt(vx * vx + vy * vy);
      const maxV = stage.burstPower * 1.5;
      if (speed > maxV) {
        vx = (vx / speed) * maxV;
        vy = (vy / speed) * maxV;
      }

      this.velocities[i * 2] = vx;
      this.velocities[i * 2 + 1] = vy;

      // Update position
      let x = px + vx * dt;
      let y = py + vy * dt;

      // Soft border
      const bound = 6;
      if (x < -bound) { x = -bound; vx *= -0.5; }
      if (x > bound) { x = bound; vx *= -0.5; }
      if (y < -bound) { y = -bound; vy *= -0.5; }
      if (y > bound) { y = bound; vy *= -0.5; }
      this.velocities[i * 2] = vx;
      this.velocities[i * 2 + 1] = vy;

      this.positions[i * 2] = x;
      this.positions[i * 2 + 1] = y;
      this.age[i] += dt;
    }
  }
}

// --- Shaders ---
const vertexShader = `
  attribute float aGroup;     // 0 = A, 1 = B
  attribute float aAge;       // particle age (for fade)
  attribute float aSpeed;     // current speed
  attribute float aTrailX;    // trail position (memory)
  attribute float aTrailY;
  
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec3 uTintA;
  uniform vec3 uTintB;
  
  varying vec3 vColor;
  varying float vAlpha;
  varying float vGlow;
  
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size based on speed (fast = big/bright, slow = dim)
    float size = (2.0 + aSpeed * 8.0) * uPixelRatio;
    gl_PointSize = size * (300.0 / -mvPosition.z);
    
    // Color: blend between group tints, brighter when fast
    vec3 baseColor = mix(uTintA, uTintB, aGroup);
    vColor = baseColor * (0.7 + aSpeed * 1.5);
    
    // Alpha: fade in after burst, fade out with age
    float burstFade = smoothstep(0.0, 0.3, aAge);
    float ageFade = 1.0 - smoothstep(3.0, 8.0, aAge);
    vAlpha = burstFade * ageFade * (0.4 + aSpeed * 0.6);
    
    // Glow intensity for bloom
    vGlow = aSpeed;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vGlow;
  
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;
    
    // Gaussian glow
    float core = smoothstep(0.5, 0.0, dist);
    float glow = exp(-4.0 * dist * dist) * 0.6;
    float alpha = (core * 0.5 + glow) * vAlpha;
    
    // Boost brightness for bloom
    vec3 color = vColor * (1.0 + vGlow * 2.0);
    
    gl_FragColor = vec4(color, alpha);
  }
`;

// --- Trail shader (renders fading ghost positions) ---
const trailVertexShader = `
  attribute float aGroup;
  attribute float aAge;
  
  uniform float uPixelRatio;
  uniform vec3 uTintA;
  uniform vec3 uTintB;
  
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    gl_PointSize = 1.5 * uPixelRatio * (300.0 / -mvPosition.z);
    
    vec3 baseColor = mix(uTintA, uTintB, aGroup);
    vColor = baseColor * 0.3;
    
    // Trails fade quickly
    vAlpha = (1.0 - smoothstep(0.5, 2.0, aAge)) * 0.15;
  }
`;

const trailFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

// --- Main simulation component ---
function FirecrackerOrganism() {
  const [scroll, setScroll] = useState(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const memoryRef = useRef<MemoryPoint[]>(loadMemory());
  const scrollRef = useRef(loadScroll());
  const battleHistoryRef = useRef<number[]>(loadBattleHistory());
  const lastMemSave = useRef(0);
  const lastScrollSave = useRef(0);
  const lastStageIdx = useRef(-1);
  const burstCooldown = useRef(0);

  // Create simulation
  const sim = useMemo(() => new FirecrackerBattle(PARTICLE_COUNT), []);

  // Geometry for main particles
  const { geometry, trailGeometry, uniforms, trailUniforms } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const groups = new Float32Array(PARTICLE_COUNT);
    const ages = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const trailX = new Float32Array(PARTICLE_COUNT);
    const trailY = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = sim.positions[i * 2];
      positions[i * 3 + 1] = sim.positions[i * 2 + 1];
      positions[i * 3 + 2] = 0;
      groups[i] = sim.group[i];
      ages[i] = sim.age[i];
      speeds[i] = 0;
      trailX[i] = sim.trailX[i];
      trailY[i] = sim.trailY[i];
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aGroup', new THREE.BufferAttribute(groups, 1));
    geo.setAttribute('aAge', new THREE.BufferAttribute(ages, 1));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute('aTrailX', new THREE.BufferAttribute(trailX, 1));
    geo.setAttribute('aTrailY', new THREE.BufferAttribute(trailY, 1));

    // Trail geometry uses trail positions
    const trailPos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      trailPos[i * 3] = sim.trailX[i];
      trailPos[i * 3 + 1] = sim.trailY[i];
      trailPos[i * 3 + 2] = 0;
    }
    const tGeo = new THREE.BufferGeometry();
    tGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
    tGeo.setAttribute('aGroup', new THREE.BufferAttribute(groups, 1));
    tGeo.setAttribute('aAge', new THREE.BufferAttribute(ages, 1));

    const uni = {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uTintA: { value: new THREE.Color(1.0, 0.85, 0.6) },
      uTintB: { value: new THREE.Color(0.6, 0.8, 1.0) },
    };
    const tUni = {
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uTintA: { value: new THREE.Color(1.0, 0.85, 0.6) },
      uTintB: { value: new THREE.Color(0.6, 0.8, 1.0) },
    };

    return { geometry: geo, trailGeometry: tGeo, uniforms: uni, trailUniforms: tUni };
  }, [sim]);

  // Event listeners
  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const s = max > 0 ? window.scrollY / max : 0;
      setScroll(s);
      scrollRef.current = s;
      const now = Date.now();
      if (now - lastScrollSave.current > 500) {
        lastScrollSave.current = now;
        saveScroll(s);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = ((e.clientX / window.innerWidth) * 2 - 1) * 5;
      const y = -((e.clientY / window.innerHeight) * 2 - 1) * 4;
      mouseRef.current = { x, y, active: true };
      const now = Date.now();
      const mem = memoryRef.current;
      if (mem.length === 0 || now - mem[mem.length - 1].timestamp > 100) {
        mem.push({ x, y, strength: 1.0, timestamp: now });
        if (mem.length > MAX_MEMORY) mem.shift();
        if (now - lastMemSave.current > 1000) {
          lastMemSave.current = now;
          saveMemory(mem);
        }
      }
    };

    const handleMouseLeave = () => { mouseRef.current.active = false; };

    const saved = loadScroll();
    if (saved > 0) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, saved * max);
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    uniforms.uTime.value = time;

    const { stage, idx } = getStage(scroll);

    // Trigger burst when entering a new stage
    if (idx !== lastStageIdx.current) {
      lastStageIdx.current = idx;
      battleHistoryRef.current[idx] = (battleHistoryRef.current[idx] || 0) + 1;
      saveBattleHistory(battleHistoryRef.current);
      // Burst both groups
      sim.burst(stage, time, -1);
      burstCooldown.current = 0;
    }

    // Periodic re-burst (every ~2s, the firecrackers re-ignite)
    burstCooldown.current += 0.016;
    if (burstCooldown.current > 2.5) {
      burstCooldown.current = 0;
      // Alternate which group bursts first (the fight)
      sim.burst(stage, time, 0);
      setTimeout(() => sim.burst(stage, time + 0.1, 1), 100);
    }

    // Decay memory
    const now = Date.now();
    const mem = memoryRef.current;
    for (let i = mem.length - 1; i >= 0; i--) {
      const age = (now - mem[i].timestamp) / 1000;
      mem[i].strength = Math.max(0, 1.0 - age / 120);
      if (mem[i].strength <= 0.01) mem.splice(i, 1);
    }

    // Run simulation
    sim.step(stage, 0.016, time, mouseRef.current, mem);

    // Update buffers
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    const ageAttr = geometry.getAttribute('aAge') as THREE.BufferAttribute;
    const speedAttr = geometry.getAttribute('aSpeed') as THREE.BufferAttribute;
    const trailXAttr = geometry.getAttribute('aTrailX') as THREE.BufferAttribute;
    const trailYAttr = geometry.getAttribute('aTrailY') as THREE.BufferAttribute;
    const trailPosAttr = trailGeometry.getAttribute('position') as THREE.BufferAttribute;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      posAttr.array[i * 3] = sim.positions[i * 2];
      posAttr.array[i * 3 + 1] = sim.positions[i * 2 + 1];
      ageAttr.array[i] = sim.age[i];
      const vx = sim.velocities[i * 2];
      const vy = sim.velocities[i * 2 + 1];
      const maxV = stage.burstPower * 1.5;
      speedAttr.array[i] = Math.min(1, Math.sqrt(vx * vx + vy * vy) / maxV);
      trailXAttr.array[i] = sim.trailX[i];
      trailYAttr.array[i] = sim.trailY[i];
      trailPosAttr.array[i * 3] = sim.trailX[i];
      trailPosAttr.array[i * 3 + 1] = sim.trailY[i];
    }
    posAttr.needsUpdate = true;
    ageAttr.needsUpdate = true;
    speedAttr.needsUpdate = true;
    trailXAttr.needsUpdate = true;
    trailYAttr.needsUpdate = true;
    trailPosAttr.needsUpdate = true;

    // Update colors
    uniforms.uTintA.value.setRGB(stage.tintA[0], stage.tintA[1], stage.tintA[2]);
    uniforms.uTintB.value.setRGB(stage.tintB[0], stage.tintB[1], stage.tintB[2]);
    trailUniforms.uTintA.value.setRGB(stage.tintA[0], stage.tintA[1], stage.tintA[2]);
    trailUniforms.uTintB.value.setRGB(stage.tintB[0], stage.tintB[1], stage.tintB[2]);
  });

  return (
    <>
      {/* Trail layer (fading ghosts) */}
      <points geometry={trailGeometry}>
        <shaderMaterial
          vertexShader={trailVertexShader}
          fragmentShader={trailFragmentShader}
          uniforms={trailUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* Main particles */}
      <points geometry={geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

// --- Overlay ---
function Overlay({ scroll }: { scroll: number }) {
  const { stage, idx } = getStage(scroll);
  const [battleHistory, setBattleHistory] = useState<number[]>(loadBattleHistory());

  useEffect(() => {
    const interval = setInterval(() => {
      setBattleHistory([...loadBattleHistory()]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 flex flex-col justify-between p-6 md:p-12">
      <div className="flex justify-between items-start">
        <div className="text-white/40 text-[10px] md:text-xs tracking-[0.3em] uppercase font-mono">
          Firecracker Battle
        </div>
        <div className="text-white/30 text-[10px] md:text-xs font-mono">
          {Math.round(scroll * 100)}%
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-white/50 text-xs md:text-sm tracking-[0.2em] uppercase font-mono mb-2 transition-all duration-700">
          {stage.name}
        </div>
        <div className="text-white/20 text-[10px] md:text-xs font-mono mb-3">
          fought {battleHistory[idx] || 0} times
        </div>
        <div className="flex gap-1.5">
          {STAGES.map((s, i) => (
            <div key={i} className="h-px transition-all duration-700"
              style={{
                width: i === idx ? '28px' : '10px',
                backgroundColor: i <= idx ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.12)',
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="text-white/25 text-[10px] md:text-xs font-mono max-w-[200px] md:max-w-xs leading-relaxed">
          Two firecrackers burst and fight for space. They remember every clash.
        </div>
        <div className="text-white/15 text-[10px] md:text-xs font-mono italic">
          nothing here is forgotten
        </div>
      </div>
    </div>
  );
}

export default function LivingParticleOrganism() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const h = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="relative w-full" style={{ height: '900vh' }}>
      <div className="fixed inset-0 z-0 bg-black">
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }} gl={{ antialias: true, alpha: false }}>
          <FirecrackerOrganism />
          <EffectComposer>
            <Bloom intensity={2.0} luminanceThreshold={0.05} luminanceSmoothing={0.9} mipmapBlur />
          </EffectComposer>
        </Canvas>
      </div>
      <Overlay scroll={scroll} />
      <div className="relative z-20 pointer-events-none">
        {STAGES.map((s, i) => (
          <div key={i} className="h-screen flex items-center justify-center">
            <div className="opacity-0 select-none"><h2 className="text-white/0 text-4xl">{s.name}</h2></div>
          </div>
        ))}
      </div>
    </div>
  );
}
