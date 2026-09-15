'use client';

/**
 * AtlasCore3D — the floating heart of the AtlasHero3D world, lifted out as a
 * single "world element" for the landing art composition. It drifts inside
 * the GalaxyCanvas star field (galaxy behind, world element within it):
 *
 *   · SHARP core pass — crisp bright nucleus (small, hard-edged falloff),
 *     thin 4-point diffraction spikes (canvas-generated sprite, additive),
 *     and a tight tilted accretion-disc ring pair with distinct edges.
 *     The old one-big-soft-glow "flat sun" is gone; the halo sprite is
 *     small and supports the nucleus instead of blurring over it.
 *   · two tilted gold orbit rings + one thin ice ring, counter-rotating
 *   · two companion spirits (gold + ice) orbiting on inclined ellipses
 *
 * Supernova link: when GalaxyCanvas detects a click on the core it fires an
 * `atlas:supernova` window event; this core flares in sync (nucleus brightens
 * and swells, spikes sharpen, rings speed up) via a per-frame exponential
 * envelope — no React state, no re-renders.
 *
 * Fully transparent background so the galaxy shows through. No text anywhere.
 * With prefers-reduced-motion the canvas renders a single static frame
 * (frameloop="demand") — still beautiful, zero motion.
 */

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const GOLD = '#F5A623';
const GOLD_LIGHT = '#FFE9C0';
const ICE = '#7CC4FF';

/** TIGHT radial glow texture — small bright centre, fast falloff, no haze. */
function useGlowTexture(inner: string, mid: string) {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 128;
    c.height = 128;
    const g = c.getContext('2d');
    if (g) {
      const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, inner);
      grad.addColorStop(0.22, mid); // tight: most energy in the inner fifth
      grad.addColorStop(0.5, 'rgba(245,166,35,0.06)');
      grad.addColorStop(1, 'rgba(245,166,35,0)');
      g.fillStyle = grad;
      g.fillRect(0, 0, 128, 128);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, [inner, mid]);
}

/** SHARP 4-point diffraction-spike texture — thin tapered arms, hard centre. */
function useSpikeTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 256;
    const g = c.getContext('2d');
    if (g) {
      const cx = 128;
      const L = 124;
      for (let arm = 0; arm < 4; arm++) {
        const a = (arm * Math.PI) / 2;
        g.save();
        g.translate(cx, cx);
        g.rotate(a);
        const grad = g.createLinearGradient(0, 0, L, 0);
        grad.addColorStop(0, 'rgba(255,246,224,0.95)');
        grad.addColorStop(0.3, 'rgba(255,236,196,0.4)');
        grad.addColorStop(1, 'rgba(255,236,196,0)');
        g.fillStyle = grad;
        // tapered spike: ~3px at centre → 0 at tip
        g.beginPath();
        g.moveTo(0, -1.6);
        g.lineTo(L, 0);
        g.lineTo(0, 1.6);
        g.closePath();
        g.fill();
        // brighter inner sliver
        g.fillStyle = 'rgba(255,252,242,0.9)';
        g.beginPath();
        g.moveTo(0, -0.9);
        g.lineTo(L * 0.4, 0);
        g.lineTo(0, 0.9);
        g.closePath();
        g.fill();
        g.restore();
      }
    }
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function Core({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const coreMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const nucleus = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);
  const discRing = useRef<THREE.Group>(null);
  const spikeSprite = useRef<THREE.Sprite>(null);
  const spikeMat = useRef<THREE.SpriteMaterial>(null);
  const glowMat = useRef<THREE.SpriteMaterial>(null);
  const spiritA = useRef<THREE.Mesh>(null);
  const spiritB = useRef<THREE.Mesh>(null);

  // supernova envelope state (refs — no React re-render)
  const novaAge = useRef(99);
  const lastT = useRef(0);

  const glow = useGlowTexture('rgba(255,224,160,0.9)', 'rgba(245,166,35,0.22)');
  const iceGlow = useGlowTexture('rgba(190,228,255,0.8)', 'rgba(124,196,255,0.25)');
  const spikes = useSpikeTexture();

  // listen for the galaxy-canvas supernova so both cores flare as one
  useEffect(() => {
    if (reduced) return;
    const onNova = () => {
      novaAge.current = 0;
    };
    window.addEventListener('atlas:supernova', onNova);
    return () => window.removeEventListener('atlas:supernova', onNova);
  }, [reduced]);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    lastT.current = t;
    if (reduced) return;

    // supernova envelope — sharp attack, exponential decay (delta-based)
    if (novaAge.current < 4) novaAge.current += delta;
    const nova = novaAge.current < 4 ? Math.exp(-novaAge.current * 2.6) : 0;

    if (group.current) {
      group.current.rotation.y = t * 0.12;
      group.current.rotation.x = Math.sin(t * 0.23) * 0.07;
    }
    if (core.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.05 + nova * 0.45;
      core.current.scale.set(s, s, s);
    }
    if (coreMat.current) {
      coreMat.current.emissiveIntensity = 0.85 + nova * 3.2;
    }
    if (nucleus.current) {
      const s = 1 + nova * 0.9;
      nucleus.current.scale.set(s, s, s);
    }
    if (ringA.current) ringA.current.rotation.z = t * (0.2 + nova * 1.2);
    if (ringB.current) ringB.current.rotation.z = -t * (0.14 + nova * 0.9);
    if (ringC.current) ringC.current.rotation.z = t * 0.09;
    if (discRing.current) {
      // slow precession of the accretion disc; supernova spins it up
      discRing.current.rotation.y = t * (0.22 + nova * 1.6);
    }
    if (spikeSprite.current) {
      const s = 5.2 * (1 + nova * 0.5);
      spikeSprite.current.scale.set(s, s, 1);
    }
    if (spikeMat.current) {
      spikeMat.current.opacity = 0.85 + nova * 0.15;
      spikeMat.current.rotation = t * 0.02;
    }
    if (glowMat.current) {
      glowMat.current.opacity = 0.45 + nova * 0.45;
    }

    if (spiritA.current) {
      const a = t * 0.5;
      spiritA.current.position.set(
        Math.cos(a) * 2.7,
        Math.sin(a * 0.9) * 0.55,
        Math.sin(a) * 2.7
      );
    }
    if (spiritB.current) {
      const a = -t * 0.34 + 2.2;
      spiritB.current.position.set(
        Math.cos(a) * 3.3,
        Math.sin(a) * 0.8,
        Math.sin(a) * 3.3
      );
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.4} color="#8FA0D0" />
      <pointLight position={[0, 0.6, 0]} intensity={1.7} distance={14} color={GOLD} />
      <directionalLight position={[5, 7, 6]} intensity={0.5} color="#9FB4FF" />

      {/* tight halo — supports the nucleus, never blurs over it */}
      <sprite scale={[4.6, 4.6, 1]}>
        <spriteMaterial
          ref={glowMat}
          map={glow}
          transparent
          opacity={0.45}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      {/* SHARP diffraction spikes — thin 4-point star, additive */}
      <sprite ref={spikeSprite} scale={[5.2, 5.2, 1]}>
        <spriteMaterial
          ref={spikeMat}
          map={spikes}
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      {/* the Atlas heart — crisp golden icosahedron */}
      <mesh ref={core}>
        <icosahedronGeometry args={[1.02, 2]} />
        <meshPhysicalMaterial
          ref={coreMat}
          color={new THREE.Color(GOLD)}
          emissive={new THREE.Color(GOLD)}
          emissiveIntensity={0.85}
          metalness={0.85}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
      {/* hard-edged nucleus: small, intense, near-white */}
      <mesh ref={nucleus}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshBasicMaterial
          color={GOLD_LIGHT}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshBasicMaterial color="#FFFDF4" blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* tight accretion-disc ring pair — distinct edges, tilted like the disc */}
      <group ref={discRing} rotation={[Math.PI / 2.35, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.016, 8, 140]} />
          <meshBasicMaterial
            color={GOLD_LIGHT}
            transparent
            opacity={0.75}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh>
          <torusGeometry args={[1.82, 0.008, 8, 140]} />
          <meshBasicMaterial
            color={GOLD}
            transparent
            opacity={0.32}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* gyroscopic rings */}
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[2.35, 0.04, 8, 96]} />
        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ringB} rotation={[-Math.PI / 3, Math.PI / 5, 0]}>
        <torusGeometry args={[2.75, 0.028, 8, 96]} />
        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.24}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ringC} rotation={[Math.PI / 1.9, -Math.PI / 3.2, 0]}>
        <torusGeometry args={[3.15, 0.016, 8, 96]} />
        <meshBasicMaterial
          color={ICE}
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* companion spirits */}
      <mesh ref={spiritA}>
        <sphereGeometry args={[0.09, 14, 14]} />
        <meshBasicMaterial color={GOLD_LIGHT} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={spiritB}>
        <sphereGeometry args={[0.07, 14, 14]} />
        <meshBasicMaterial color={ICE} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <sprite scale={[1.6, 1.6, 1]} position={[2.7, 0, 0]}>
        <spriteMaterial
          map={iceGlow}
          transparent
          opacity={0.22}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </group>
  );
}

export default function AtlasCore3D({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.7, 7.4], fov: 40, near: 0.1, far: 60 }}
      frameloop={reduced ? 'demand' : 'always'}
      style={{ background: 'transparent', pointerEvents: 'none' }}
    >
      <Float speed={1.1} floatIntensity={0.5} rotationIntensity={0.12}>
        <Core reduced={reduced} />
      </Float>
    </Canvas>
  );
}
