'use client'
import {
  useRef,
  useMemo,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  MeshTransmissionMaterial,
  Sparkles,
  Float,
} from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
} from '@react-three/postprocessing';
import * as THREE from 'three';

// ══════════════════════════════════════════════════════════════
// ATLAS TOKENS
// ══════════════════════════════════════════════════════════════
const TOKENS = {
  gold: '#F5A623',
  goldGlow: '#FFD080',
  goldDark: '#3D2A0E',
  bgDark: '#07080F',
  dormantCore: '#3A3D4A',
  dormantGlow: '#5A5D6A',
  dormantDark: '#1A1C22',
  pathDormant: '#2A2D3A',
  pathActive: '#F5A623',
  companionDormant: '#4A3A6A',
  companionAwakened: '#F5A623',
} as const;

// ══════════════════════════════════════════════════════════════
// SUBJECT DEFINITIONS
// ══════════════════════════════════════════════════════════════
interface SubjectDef {
  id: string;
  name: string;
  emoji: string;
  core: string;
  glow: string;
  dark: string;
  position: [number, number, number];
}

const SUBJECTS: SubjectDef[] = [
  {
    id: 'math', name: 'Mathematics', emoji: '∑',
    core: '#4A9EFF', glow: '#80C4FF', dark: '#0D2847',
    position: [5.5, 1.8, 0],
  },
  {
    id: 'science', name: 'Science', emoji: '⚗',
    core: '#2ECC71', glow: '#70E8A0', dark: '#0A3320',
    position: [2.75, 2.6, 4.76],
  },
  {
    id: 'english', name: 'Literature', emoji: '✦',
    core: '#E74C8B', glow: '#FF7AB0', dark: '#3D0D25',
    position: [-2.75, 3.2, 4.76],
  },
  {
    id: 'history', name: 'History', emoji: '🏛',
    core: '#C8963E', glow: '#E8B868', dark: '#3D2808',
    position: [-5.5, 2.4, 0],
  },
  {
    id: 'arts', name: 'Creative Arts', emoji: '♪',
    core: '#B44AFF', glow: '#D080FF', dark: '#2A0A47',
    position: [-2.75, 1.6, -4.76],
  },
  {
    id: 'coding', name: 'Coding', emoji: '⟨/⟩',
    core: '#00E5CC', glow: '#60FFEE', dark: '#003D37',
    position: [2.75, 0.8, -4.76],
  },
];

// ══════════════════════════════════════════════════════════════
// HOOKS
// ══════════════════════════════════════════════════════════════

function useMouseWorld() {
  const [mouse, setMouse] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const { viewport, mouse: glMouse } = useThree();

  useEffect(() => {
    const v = new THREE.Vector3();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const ray = new THREE.Ray();

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      ray.origin.set(0, 0, 10);
      ray.direction.set(nx * viewport.width * 0.5, ny * viewport.height * 0.5, -1).normalize();
      ray.intersectPlane(plane, v);
      if (v) setMouse(v.clone());
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [viewport]);

  return mouse;
}

function useTime() {
  const t = useRef(0);
  useFrame((_, dt) => { t.current += dt; });
  return t;
}

// ══════════════════════════════════════════════════════════════
// ISLAND COMPONENT
// ══════════════════════════════════════════════════════════════
interface IslandProps {
  subject: SubjectDef;
  mastery: number;
  onClick?: (id: string) => void;
}

const islandVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMastery;
  uniform float uDormancy;

  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vDisplacement;
  varying vec3 vOrigNormal;

  // Simplex-like noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vOrigNormal = normal;
    vec3 pos = position;

    // Layered noise displacement
    float n1 = snoise(pos * 1.2 + uTime * 0.15) * 0.4;
    float n2 = snoise(pos * 2.5 - uTime * 0.1)  * 0.2;
    float n3 = snoise(pos * 5.0 + uTime * 0.25)  * 0.08;
    float terrainNoise = n1 + n2 + n3;

    // Height-biased displacement (less on edges)
    float heightFactor = smoothstep(-1.2, 0.8, pos.y);
    float disp = terrainNoise * heightFactor * (0.3 + uMastery * 0.7);
    disp *= (1.0 - uDormancy * 0.7);

    // Flatten bottom of island
    float flattenFactor = smoothstep(-0.3, 0.6, pos.y);
    pos.y += disp * flattenFactor;

    vDisplacement = disp;
    vNormal = normalize(normalMatrix * normal);
    vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const islandFragmentShader = /* glsl */ `
  uniform vec3 uColorCore;
  uniform vec3 uColorGlow;
  uniform vec3 uColorDark;
  uniform float uMastery;
  uniform float uTime;
  uniform float uHovered;

  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vDisplacement;
  varying vec3 vOrigNormal;

  void main() {
    // Lighting
    vec3 lightDir = normalize(vec3(2.0, 4.0, 3.0));
    float diff = max(dot(vNormal, lightDir), 0.0) * 0.7 + 0.3;
    float ambient = 0.25;
    float rim = pow(1.0 - max(dot(vNormal, vec3(0.0, 1.0, 0.0)), 0.0), 3.0) * 0.4;

    // Height-based color mixing
    float hNorm = smoothstep(-1.2, 1.5, vOrigNormal.y * 1.2 + vDisplacement);
    vec3 col = mix(uColorDark, uColorCore, hNorm);
    col = mix(col, uColorGlow, smoothstep(0.5, 1.0, hNorm) * 0.4);

    // Apply lighting
    col *= (ambient + diff) + rim * uColorGlow;

    // Mastery glow
    float masteryPulse = sin(uTime * 2.0) * 0.5 + 0.5;
    col += uColorGlow * uMastery * masteryPulse * 0.2;

    // Hover brightening
    col += uColorGlow * uHovered * 0.25;

    // Dormancy darkening
    col *= 0.25 + uMastery * 0.75;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Island({ subject, mastery, onClick }: IslandProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [hovered, setHovered] = useState(false);
  const time = useTime();
  const ptr = useRef<THREE.Vector3>(new THREE.Vector3());
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.4, 4);
    // Deform vertices into island shape
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      const len = Math.sqrt(x * x + z * z);
      const flatFactor = Math.max(0, 1 - Math.abs(y) * 0.8);
      const scale = 0.85 + flatFactor * 0.35;
      const stretchY = y > 0 ? 1 + y * 0.6 : 1 - Math.abs(y) * 0.2;
      pos.setXYZ(i, x * scale, y * stretchY, z * scale);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: islandVertexShader,
    fragmentShader: islandFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uMastery: { value: 0 },
      uDormancy: { value: 1 },
      uColorCore: { value: new THREE.Color(TOKENS.dormantCore) },
      uColorGlow: { value: new THREE.Color(TOKENS.dormantGlow) },
      uColorDark: { value: new THREE.Color(TOKENS.dormantDark) },
      uHovered: { value: 0 },
    },
  }), []);

  // Update colors reactively when subject colors / mastery change
  useEffect(() => {
    const core = new THREE.Color(subject.core);
    const glow = new THREE.Color(subject.glow);
    const dark = new THREE.Color(subject.dark);
    material.uniforms.uColorCore.value = core;
    material.uniforms.uColorGlow.value = glow;
    material.uniforms.uColorDark.value = dark;
  }, [subject, material]);

  useEffect(() => {
    material.uniforms.uMastery.value = mastery;
    material.uniforms.uDormancy.value = 1 - mastery;
  }, [mastery, material]);

  useFrame((_, dt) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = time.current;
    // Smooth hover
    matRef.current.uniforms.uHovered.value +=
      (hovered ? 1 : 0 - matRef.current.uniforms.uHovered.value) * Math.min(dt * 6, 1);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={subject.position}>
        <mesh
          ref={meshRef}
          geometry={geometry}
          material={material}
          onPointerEnter={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerLeave={() => setHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.(subject.id);
          }}
        />
        {/* Ground glow ring */}
        <ringGeometry args={[1.6, 2.4, 64]} />
        <meshBasicMaterial
          color={subject.core}
          transparent
          opacity={mastery * 0.3}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
          <circleGeometry args={[2.2, 64]} />
          <meshBasicMaterial
            color={subject.glow}
            transparent
            opacity={mastery * 0.12}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ══════════════════════════════════════════════════════════════
// ENERGY PATH
// ══════════════════════════════════════════════════════════════
interface PathProps {
  from: [number, number, number];
  to: [number, number, number];
  mastery: number; // min of two connected subjects
}

const pathVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMastery;
  varying vec2 vUv;
  varying float vProgress;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vProgress = uv.x;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const pathFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uMastery;
  uniform vec3 uCamPos;
  varying vec2 vUv;
  varying float vProgress;
  varying vec3 vWorldPos;

  void main() {
    // flowing dash pattern
    float speed = 0.6 + uMastery * 0.6;
    float dash = fract(vUv.x * 8.0 - uTime * speed);

    // pulse intensity
    float pulse = sin(vUv.x * 6.28318 - uTime * 2.5) * 0.5 + 0.5;
    float flow = smoothstep(0.0, 0.18, dash) * smoothstep(0.55, 0.18, dash);
    float glow = exp(-abs(vUv.y - 0.5) * 6.0);

    // strand of energy
    float strand = smoothstep(0.42, 0.5, dash) * smoothstep(0.58, 0.5, dash);
    strand *= glow;

    float alpha = (flow * 0.4 + strand * 1.2) * uMastery;
    alpha += glow * uMastery * 0.08;

    // Fade at endpoints
    alpha *= smoothstep(0.0, 0.08, vUv.x) * smoothstep(1.0, 0.92, vUv.x);

    // Fresnel-like brightness toward camera
    vec3 viewDir = normalize(uCamPos - vWorldPos);
    float fresnel = pow(1.0 - abs(vUv.y - 0.5) * 2.0, 1.5);

    vec3 col = uColor * (1.0 + pulse * 0.3);
    gl_FragColor = vec4(col, alpha * fresnel);
  }
`;

function EnergyPath({ from, to, mastery }: PathProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const time = useTime();
  const { camera } = useThree();

  const { curve, geometry } = useMemo(() => {
    const v1 = new THREE.Vector3(...from);
    const v2 = new THREE.Vector3(...to);
    const mid = v1.clone().add(v2).multiplyScalar(0.5);
    const dist = v1.distanceTo(v2);
    mid.y += dist * 0.25;
    mid.x += (Math.random() - 0.5) * dist * 0.15;
    mid.z += (Math.random() - 0.5) * dist * 0.15;
    const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
    const geo = new THREE.TubeGeometry(curve, 64, 0.08, 8, false);
    // Map UVs: tube's native v wraps around, we want x along path
    const uvAttr = geo.attributes.uv as THREE.BufferAttribute;
    const uvArr = uvAttr.array as Float32Array;
    // Re-map: each ring segment gets x = fraction along curve
    // TubeGeometry already has good uvw, but let's ensure flow direction
    return { curve, geometry: geo };
  }, [from, to]);

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: pathVertexShader,
    fragmentShader: pathFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uMastery: { value: 0 },
      uColor: { value: new THREE.Color(TOKENS.gold) },
      uCamPos: { value: new THREE.Vector3() },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  }), []);

  useFrame(() => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = time.current;
    matRef.current.uniforms.uCamPos.value.copy(camera.position);
    matRef.current.uniforms.uMastery.value +=
      (mastery - matRef.current.uniforms.uMastery.value) * 0.05;
  });

  // Flow particles along path
  const particles = useMemo(() => {
    const count = 24;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const aProgress = new Float32Array(count);
    const aSize = new Float32Array(count);
    const aOffset = new Float32Array(count);
    const p1 = new THREE.Vector3();
    const p2 = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      const t = i / count;
      curve.getPoint(t, p1);
      positions[i * 3] = p1.x;
      positions[i * 3 + 1] = p1.y;
      positions[i * 3 + 2] = p1.z;
      aProgress[i] = t;
      aSize[i] = 0.03 + Math.random() * 0.06;
      aOffset[i] = Math.random() * 6.28;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aProgress', new THREE.BufferAttribute(aProgress, 1));
    geo.setAttribute('aSize', new THREE.BufferAttribute(aSize, 1));
    geo.setAttribute('aOffset', new THREE.BufferAttribute(aOffset, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: /* glsl */ `
        attribute float aProgress;
        attribute float aSize;
        attribute float aOffset;
        uniform float uTime;
        uniform float uMastery;
        varying float vAlpha;
        void main() {
          float speed = 0.12 + uMastery * 0.12;
          float t = fract(aProgress + uTime * speed);
          float pulse = sin(aOffset + uTime * 3.0) * 0.5 + 0.5;
          vAlpha = (1.0 - abs(t - 0.5) * 2.0) * pulse * uMastery;

          vec3 pos = position;
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * (300.0 / -mv.z) * (0.5 + uMastery * 0.5);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          float a = smoothstep(1.0, 0.2, d) * vAlpha;
          gl_FragColor = vec4(uColor * 1.5, a);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
        uMastery: { value: mastery },
        uColor: { value: new THREE.Color(TOKENS.goldGlow) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return { geometry: geo, material: mat };
  }, [curve, mastery]);

  useFrame(() => {
    if (particles.material.uniforms) {
      particles.material.uniforms.uTime.value = time.current;
    }
  });

  if (mastery < 0.08) return null;

  return (
    <group>
      <mesh geometry={geometry} material={material} />
      <points geometry={particles.geometry} material={particles.material} />
    </group>
  );
}

// ══════════════════════════════════════════════════════════════
// ACHIEVEMENT MONUMENT
// ══════════════════════════════════════════════════════════════
const MONUMENT_COLORS: Record<string, { core: string; glow: string; height: number }> = {
  bronze:   { core: '#CD7F32', glow: '#FFB060', height: 0.5 },
  silver:   { core: '#C0C0C0', glow: '#FFFFFF', height: 0.9 },
  gold:     { core: '#F5A623', glow: '#FFD080', height: 1.4 },
  prism:    { core: '#FF44FF', glow: '#FFAAFF', height: 2.0 },
};

function AchievementMonument({
  subjectPos,
  tier,
  title,
}: {
  subjectPos: [number, number, number];
  tier: string;
  title: string;
}) {
  const ref = useRef<THREE.Group>(null);
  const time = useTime();
  const cfg = MONUMENT_COLORS[tier] || MONUMENT_COLORS.bronze;

  const crownGeo = useMemo(() => {
    const g = new THREE.ConeGeometry(0.18, cfg.height * 1.4, 6, 1);
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      if (p.getY(i) > 0) p.setX(i, p.getX(i) * (0.6 + Math.random() * 0.4));
      if (p.getY(i) > 0) p.setZ(i, p.getZ(i) * (0.6 + Math.random() * 0.4));
    }
    g.computeVertexNormals();
    return g;
  }, [cfg.height]);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.position.set(
      subjectPos[0] + 1.5,
      subjectPos[1] + 0.4,
      subjectPos[2] + 0.5,
    );
  }, [subjectPos]);

  return (
    <group ref={ref}>
      <Float speed={1.5} floatIntensity={0.4} rotationIntensity={0.1}>
        {/* Base pedestal */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.28, 0.35, 8]} />
          <meshStandardMaterial
            color={cfg.core}
            metalness={0.6}
            roughness={0.3}
            emissive={cfg.core}
            emissiveIntensity={0.4}
          />
        </mesh>
        {/* Crown / spire */}
        <mesh position={[0, cfg.height * 0.5 + 0.18, 0]}>
          <primitive object={crownGeo} attach="geometry" />
          <meshStandardMaterial
            color={cfg.core}
            metalness={0.8}
            roughness={0.2}
            emissive={cfg.glow}
            emissiveIntensity={0.7}
          />
        </mesh>
        {/* Glow sphere on top */}
        <mesh position={[0, cfg.height + 0.25, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color={cfg.glow} transparent opacity={0.8} />
        </mesh>
        {/* Point light */}
        <pointLight
          color={cfg.glow}
          intensity={2}
          distance={3}
          position={[0, cfg.height, 0]}
        />
      </Float>
    </group>
  );
}

// ══════════════════════════════════════════════════════════════
// COMPANION SPIRIT
// ══════════════════════════════════════════════════════════════
const companionVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPower;
  uniform float uScale;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPos;
  varying float vFresnel;

  //	Simplex 3D Noise
  vec3 mod289(vec3 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x2_ = x_ * ns.x + ns.yyyy;
    vec4 y2_ = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x2_) - abs(y2_);
    vec4 b0 = vec4(x2_.xy, y2_.xy);
    vec4 b1 = vec4(x2_.zw, y2_.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 pos = position;
    vNormal = normalize(normalMatrix * normal);

    // Organic breathing motion
    float breath = sin(uTime * 1.5) * 0.5 + 0.5;
    float noise1 = snoise(pos * 1.5 + uTime * 0.4) * 0.18;
    float noise2 = snoise(pos * 3.0 - uTime * 0.3) * 0.08;

    // Scale effect - larger = more alive
    float nFactor = 0.15 + uPower * 0.5;

    // Wispy tendrils
    float angle = atan(pos.z, pos.x);
    float radius = length(pos.xz);
    float tendril = snoise(vec3(
      cos(angle + uTime * 0.8),
      sin(angle + uTime * 0.6),
      uTime * 0.3
    )) * 0.2 * uPower;

    pos += normal * (noise1 + noise2 + tendril) * nFactor;
    pos *= uScale;

    vPosition = pos;
    vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;

    // Fresnel for glow edge
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    vFresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.5);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const companionFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uGlowColor;
  uniform float uTime;
  uniform float uPower;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPos;
  varying float vFresnel;

  void main() {
    // Soft sphere shading
    vec3 light = normalize(vec3(1.0, 1.0, 0.5));
    float diff = max(dot(normalize(vNormal), light), 0.0) * 0.5 + 0.5;

    // Pulsing energy
    float pulse = sin(uTime * 2.5 + length(vPosition) * 4.0) * 0.5 + 0.5;
    float innerGlow = pulse * 0.3 * uPower;

    // Fresnel rim
    vec3 col = uColor * diff + innerGlow;
    col += uGlowColor * vFresnel * (0.5 + uPower * 0.5);

    // Brightness scales with power
    float brightness = 0.35 + uPower * 0.65;
    col *= brightness;

    // Alpha - softer when dormant
    float alpha = 0.65 + vFresnel * 0.35 + uPower * 0.15;

    gl_FragColor = vec4(col, alpha);
  }
`;

function CompanionSpirit({ totalXp }: { totalXp: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useTime();

  // Power scales from 0 (dormant) to 1 (radiant) based on XP
  const power = Math.min(1, totalXp / 5000);

  // Scale from 0.25 (spark) to 1.4 (radiant spirit)
  const targetScale = 0.25 + power * 1.15;
  const smoothScale = useRef(0.25);
  const currentColor = useRef(new THREE.Color(TOKENS.companionDormant));

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: companionVertexShader,
    fragmentShader: companionFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPower: { value: 0 },
      uScale: { value: 0.25 },
      uColor: { value: new THREE.Color(TOKENS.companionDormant) },
      uGlowColor: { value: new THREE.Color(TOKENS.companionDormant) },
    },
    transparent: true,
    depthWrite: false,
  }), []);

  useFrame((_, dt) => {
    if (!meshRef.current) return;
    const mat = material;

    mat.uniforms.uTime.value = time.current;
    mat.uniforms.uPower.value += (power - mat.uniforms.uPower.value) * Math.min(dt * 1.5, 1);

    // Smooth scale
    smoothScale.current += (targetScale - smoothScale.current) * Math.min(dt * 2, 1);
    meshRef.current.scale.setScalar(smoothScale.current);

    // Color transition: purple → gold
    const targetCol = new THREE.Color().lerpColors(
      new THREE.Color(TOKENS.companionDormant),
      new THREE.Color(TOKENS.companionAwakened),
      power
    );
    currentColor.current.lerp(targetCol, Math.min(dt * 2, 1));
    mat.uniforms.uColor.value.copy(currentColor.current);
    mat.uniforms.uGlowColor.value.copy(currentColor.current);
  });

  // Outer orb shell
  const outerMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: TOKENS.companionAwakened,
    transparent: true,
    opacity: 0.04 + power * 0.08,
    depthWrite: false,
  }), []);

  useEffect(() => {
    outerMat.opacity = 0.04 + power * 0.08;
  }, [power, outerMat]);

  return (
    <group position={[0, 0.2, 0]}>
      {/* Inner spirit mesh */}
      <mesh ref={meshRef} material={material}>
        <sphereGeometry args={[0.5, 48, 48]} />
      </mesh>
      {/* Outer glow shell */}
      <mesh scale={[1 + power * 0.5, 1 + power * 0.5, 1 + power * 0.5]} material={outerMat}>
        <sphereGeometry args={[0.55, 32, 32]} />
      </mesh>
      {/* Core light */}
      <pointLight
        color={TOKENS.companionAwakened}
        intensity={1.5 + power * 4}
        distance={6 + power * 6}
        position={[0, 0, 0]}
      />
      {/* Ambient particles around spirit */}
      <SpiritParticles count={40 + Math.floor(power * 60)} power={power} />
    </group>
  );
}

function SpiritParticles({ count, power }: { count: number; power: number }) {
  const ref = useRef<THREE.Points>(null);
  const time = useTime();
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const aOffset = new Float32Array(count);
    const aSpeed = new Float32Array(count);
    const aRadius = new Float32Array(count);
    const aHeight = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 0.55 + Math.random() * 1.8;
      const h = (Math.random() - 0.5) * 2.5;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = h;
      pos[i * 3 + 2] = Math.sin(theta) * r;
      aOffset[i] = Math.random() * 6.28;
      aSpeed[i] = 0.3 + Math.random() * 0.8;
      aRadius[i] = r;
      aHeight[i] = h;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aOffset', new THREE.BufferAttribute(aOffset, 1));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(aSpeed, 1));
    geo.setAttribute('aRadius', new THREE.BufferAttribute(aRadius, 1));
    geo.setAttribute('aHeight', new THREE.BufferAttribute(aHeight, 1));
    return geo;
  }, [count]);

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: /* glsl */ `
      attribute float aOffset;
      attribute float aSpeed;
      attribute float aRadius;
      attribute float aHeight;
      uniform float uTime;
      uniform float uPower;
      varying float vAlpha;
      void main() {
        float angle = aOffset + uTime * aSpeed;
        vec3 pos = vec3(
          cos(angle) * aRadius,
          aHeight + sin(uTime * aSpeed * 2.0 + aOffset) * 0.4,
          sin(angle) * aRadius
        );
        float pulse = sin(uTime * 3.0 + aOffset * 5.0) * 0.5 + 0.5;
        vAlpha = (0.2 + pulse * 0.5) * (0.3 + uPower * 0.7);
        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = (3.0 + uPower * 4.0) * (200.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        float a = smoothstep(1.0, 0.0, d) * vAlpha;
        gl_FragColor = vec4(uColor, a);
      }
    `,
    uniforms: {
      uTime: { value: 0 },
      uPower: { value: power },
      uColor: { value: new THREE.Color(TOKENS.companionAwakened) },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  useFrame(() => {
    material.uniforms.uTime.value = time.current;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

// ══════════════════════════════════════════════════════════════
// WORLD SCENE (internal, holds the 3D objects)
// ══════════════════════════════════════════════════════════════
function WorldScene({
  mastery,
  achievements,
  totalXp,
  level,
  onTerritoryClick,
}: GrowingWorldProps) {
  const mouse = useMouseWorld();
  const groupRef = useRef<THREE.Group>(null);
  const time = useTime();

  // Paths: connect islands if both subjects have ≥ 0.25 mastery
  const paths = useMemo(() => {
    const connections: { from: [number, number, number]; to: [number, number, number]; mastery: number }[] = [];
    for (let i = 0; i < SUBJECTS.length; i++) {
      for (let j = i + 1; j < SUBJECTS.length; j++) {
        const a = mastery[SUBJECTS[i].id] || 0;
        const b = mastery[SUBJECTS[j].id] || 0;
        const minM = Math.min(a, b);
        if (minM > 0.2) {
          connections.push({
            from: SUBJECTS[i].position,
            to: SUBJECTS[j].position,
            mastery: minM,
          });
        }
      }
    }
    return connections;
  }, [mastery]);

  // Unlocked achievements
  const unlocked = useMemo(
    () => achievements.filter((a) => a.unlocked),
    [achievements],
  );

  // Parallax
  useFrame((_, dt) => {
    if (!groupRef.current) return;
    const t = groupRef.current;
    const tx = mouse.x * 0.06;
    const ty = mouse.y * 0.04 + Math.sin(time.current * 0.3) * 0.15;
    const tz = mouse.x * 0.03;
    t.rotation.y += ((tx * 0.3) - t.rotation.y) * Math.min(dt * 0.8, 1);
    t.rotation.x += ((ty * 0.15) - t.rotation.x) * Math.min(dt * 0.8, 1);
  });

  // Auto-rotation
  useFrame((_, dt) => {
    if (!groupRef.current || mouse.length() > 0.01) return;
    groupRef.current.rotation.y += dt * 0.06;
  });

  // Level affects ambient light
  const ambientIntensity = 0.15 + (level / 50) * 0.45;

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={ambientIntensity} color="#223355" />
      <directionalLight
        position={[5, 10, 3]}
        intensity={0.8}
        color="#ffffff"
      />
      <pointLight position={[0, 2, 0]} intensity={3} color={TOKENS.goldGlow} distance={12} />

      {/* Central world group */}
      <group ref={groupRef}>
        {/* Background starfield */}
        <Starfield />

        {/* Islands */}
        {SUBJECTS.map((subject) => (
          <Island
            key={subject.id}
            subject={subject}
            mastery={mastery[subject.id] || 0}
            onClick={onTerritoryClick}
          />
        ))}

        {/* Energy paths */}
        {paths.map((p, i) => (
          <EnergyPath
            key={i}
            from={p.from}
            to={p.to}
            mastery={p.mastery}
          />
        ))}

        {/* Achievement monuments */}
        {unlocked.map((ach, i) => {
          const subject = SUBJECTS.find(
            (s) => ach.id.startsWith(s.id),
          ) || SUBJECTS[i % SUBJECTS.length];
          return (
            <AchievementMonument
              key={ach.id}
              subjectPos={subject.position}
              tier={ach.tier}
              title={ach.title}
            />
          );
        })}

        {/* Companion Spirit */}
        <CompanionSpirit totalXp={totalXp} />

        {/* Atmosphere sparkles */}
        <Sparkles
          count={200}
          scale={18}
          size={2}
          speed={0.3}
          color={TOKENS.gold}
          opacity={0.4}
        />

        {/* Ground plane for depth reference */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]} receiveShadow>
          <circleGeometry args={[12, 64]} />
          <meshBasicMaterial
            color="#0A0B14"
            transparent
            opacity={0.6}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Camera controls */}
      <OrbitControls
        target={[0, 2, 0]}
        enableDamping
        dampingFactor={0.05}
        maxDistance={24}
        minDistance={5}
        maxPolarAngle={Math.PI * 0.7}
        minPolarAngle={0.2}
        autoRotate
        autoRotateSpeed={0.3}
        enablePan={false}
      />
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// STARFIELD
// ══════════════════════════════════════════════════════════════
function Starfield() {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 600;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = Math.random() * 20 + 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);
  const material = useMemo(() => new THREE.PointsMaterial({
    color: '#6688AA',
    size: 0.04,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
    depthWrite: false,
  }), []);
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.0002;
  });
  return <points ref={ref} geometry={geometry} material={material} />;
}

// ══════════════════════════════════════════════════════════════
// LOADING SCENE
// ══════════════════════════════════════════════════════════════
function LoadingScene() {
  const t = useTime();
  const ringRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z = t.current * 0.8;
      ringRef.current.rotation.x = Math.PI / 4;
      const s = 1 + Math.sin(t.current * 2) * 0.08;
      ringRef.current.scale.setScalar(s);
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t.current * 1.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 3]} intensity={2} color={TOKENS.gold} />
      <mesh ref={ringRef}>
        <torusGeometry args={[1, 0.04, 16, 100]} />
        <meshBasicMaterial color={TOKENS.gold} transparent opacity={0.7} />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshBasicMaterial color={TOKENS.goldGlow} transparent opacity={0.8} />
      </mesh>
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// ATLAS INFO HUD (optional, overlaid)
// ══════════════════════════════════════════════════════════════
function AtlasHUD({ level, totalXp, mastery }: GrowingWorldProps) {
  const masteredCount = Object.values(mastery).filter((m) => m >= 0.8).length;
  const avgMastery =
    Object.values(mastery).reduce((a, b) => a + b, 0) / Math.max(1, Object.keys(mastery).length);

  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        left: 20,
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8,
      }}
      >
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: `conic-gradient(${TOKENS.gold} ${(avgMastery * 360).toFixed(1)}deg, rgba(255,255,255,0.1) 0deg)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 20px ${TOKENS.gold}44`,
        }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#0A0B14',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, color: TOKENS.gold,
          }}
          >
            {level}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, opacity: 0.6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Level
          </div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>
            {totalXp.toLocaleString()} XP
          </div>
        </div>
      </div>
      <div style={{ fontSize: 12, opacity: 0.5 }}>
        {masteredCount}/{SUBJECTS.length} territories mastered
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN EXPORT — AtlasGrowingWorld
// ══════════════════════════════════════════════════════════════
export interface GrowingWorldProps {
  mastery: Record<string, number>;
  achievements: {
    id: string;
    title: string;
    tier: 'bronze' | 'silver' | 'gold' | 'prism';
    unlocked: boolean;
  }[];
  totalXp: number;
  level: number;
  onTerritoryClick?: (subjectId: string) => void;
  className?: string;
}

export default function AtlasGrowingWorld({
  mastery,
  achievements,
  totalXp,
  level,
  onTerritoryClick,
  className = '',
}: GrowingWorldProps) {
  const [sceneReady, setSceneReady] = useState(false);
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        minHeight: 500,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 16,
        background: TOKENS.bgDark,
      }}
    >
      <Canvas
        camera={{ position: [0, 6, 17], fov: 50, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        dpr={[1, 2]}
        onCreated={() => setTimeout(() => setSceneReady(true), 400)}
      >
        <color attach="background" args={[TOKENS.bgDark]} />
        <fog attach="fog" args={[TOKENS.bgDark, 10, 40]} />

        <WorldScene
          mastery={mastery}
          achievements={achievements}
          totalXp={totalXp}
          level={level}
          onTerritoryClick={onTerritoryClick}
        />

        {/* Post-processing */}
        <EffectComposer>
          <Bloom
            intensity={0.6 + Math.min(totalXp / 10000, 1) * 0.4}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>

      {/* HUD Overlay */}
      <AtlasHUD
        mastery={mastery}
        achievements={achievements}
        totalXp={totalXp}
        level={level}
        onTerritoryClick={onTerritoryClick}
      />

      {/* Loading fallback — shown before scene hydrates */}
      {!sceneReady && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 5,
          }}
        >
          <div
            id="atlas-loading-indicator"
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              border: `2px solid ${TOKENS.gold}33`,
              borderTopColor: TOKENS.gold,
              animation: 'atlasSpin 1s linear infinite',
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes atlasSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}