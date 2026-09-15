/**
 * AstraParticles — GPGPU particle hero.
 *
 * 250,000 particles simulated on the GPU via GPUComputationRenderer:
 *  - velocity pass: simplex/curl-noise turbulence + text-attractor seeking
 *    + pointer repel/attract field + scroll wind + friction
 *  - position pass: integrate + clamp to bounds
 *  - render pass: additive glowing points (custom ShaderMaterial)
 *
 * Text attractors: the tagline is rasterised to a hidden 2D canvas; the
 * pixel coordinates become per-particle seek targets (u_text_targets).
 * Particles morph between the tagline and free turbulence on a slow cycle.
 *
 * Pure Three.js, no React state in the hot loop. Exposed as a component
 * that mounts a full-viewport canvas.
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js';
import {
  VELOCITY_SHADER, POSITION_SHADER, RENDER_VERTEX, RENDER_FRAGMENT,
} from './astraShaders';

const COUNT = 250_000;
const TEX = Math.sqrt(COUNT) | 0; // 500 x 500
const BOUNDS = new THREE.Vector3(46, 26, 24);

const TAGLINE = 'every answer, verified.';

/** Rasterise text → [count x 3] target positions sampled from lit pixels. */
function buildTextTargets(width: number, height: number, count: number) {
  const cv = document.createElement('canvas');
  cv.width = width;
  cv.height = height;
  const ctx = cv.getContext('2d')!;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#fff';
  ctx.font = `700 ${Math.floor(height * 0.16)}px "Space Grotesk", system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(TAGLINE, width / 2, height / 2);

  const img = ctx.getImageData(0, 0, width, height).data;
  const lit: number[] = [];
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      if (img[(y * width + x) * 4] > 128) lit.push(x, y);
    }
  }
  const targets = new Float32Array(count * 3);
  const n = lit.length / 2;
  const scale = (BOUNDS.x * 1.7) / width;
  for (let i = 0; i < count; i++) {
    const j = (i * 7919) % n; // deterministic scramble, covers all pixels
    targets[i * 3] = (lit[j * 2] - width / 2) * scale;
    targets[i * 3 + 1] = -(lit[j * 2 + 1] - height / 2) * scale;
    targets[i * 3 + 2] = (Math.random() - 0.5) * 2.0;
  }
  return targets;
}

export default function AstraParticles({ reduced = false }: { reduced?: boolean }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    const pr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(pr);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x05060f, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55, mount.clientWidth / mount.clientHeight, 0.1, 300);
    camera.position.set(0, 14, 54);
    camera.lookAt(0, 0, 0);

    // ── GPGPU setup ──
    const gpu = new GPUComputationRenderer(TEX, TEX, renderer);
    if (renderer.capabilities.isWebGL2 === false) gpu.setDataType(THREE.HalfFloatType);

    const dt = gpu.createTexture();
    const pos0 = gpu.createTexture();
    const vel0 = gpu.createTexture();
    const fill = (tex: THREE.DataTexture, fn: (i: number) => [number, number, number, number]) => {
      const arr = tex.image.data as unknown as Float32Array;
      for (let i = 0; i < arr.length / 4; i++) {
        const [x, y, z, w] = fn(i);
        arr[i * 4] = x; arr[i * 4 + 1] = y; arr[i * 4 + 2] = z; arr[i * 4 + 3] = w;
      }
    };
    const R = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    fill(pos0, i => [(R()) * BOUNDS.x, R() * BOUNDS.y, R() * BOUNDS.z, 1]);
    fill(vel0, () => [0, 0, 0, Math.random() < 0.55 ? 0.9 : 0.05]); // 55% text-seekers

    const velVar = gpu.addVariable('textureVelocity', VELOCITY_SHADER, vel0);
    const posVar = gpu.addVariable('texturePosition', POSITION_SHADER, pos0);
    gpu.setVariableDependencies(velVar, [posVar, velVar]);
    gpu.setVariableDependencies(posVar, [posVar, velVar]);

    const textTargets = buildTextTargets(1024, 256, TEX * TEX);
    const targetTex = new THREE.DataTexture(
      textTargets, TEX, TEX, THREE.RGBFormat, THREE.FloatType);
    targetTex.needsUpdate = true;

    Object.assign(velVar.material.uniforms, {
      u_dt: { value: 0 }, u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(99, 99) },
      u_scroll: { value: 0 }, u_touch: { value: new THREE.Vector4(99, 99, 12, 1) },
      u_bounds: { value: BOUNDS }, u_text_targets: { value: targetTex },
    });
    Object.assign(posVar.material.uniforms, {
      u_dt: { value: 0 }, u_bounds: { value: BOUNDS },
    });
    const velU = velVar.material.uniforms;
    const posU = posVar.material.uniforms;

    const err = gpu.init();
    if (err) { console.error('GPGPU init:', err); return; }

    // ── render mesh ──
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(TEX * TEX * 3);
    const seeds = new Float32Array(TEX * TEX);
    const uvs = new Float32Array(TEX * TEX * 2);
    for (let i = 0; i < TEX * TEX; i++) {
      const x = (i % TEX) + 0.5, y = ((i / TEX) | 0) + 0.5;
      uvs[i * 2] = x / TEX; uvs[i * 2 + 1] = y / TEX;
      seeds[i] = Math.random();
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geo.setAttribute('a_seed', new THREE.BufferAttribute(seeds, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        textureVelocity: { value: gpu.getCurrentRenderTarget(velVar).texture },
        u_size: { value: reduced ? 1.2 : 2.3 },
        u_pixel_ratio: { value: pr },
        u_color_a: { value: new THREE.Color(0xfff2d0) },
        u_color_b: { value: new THREE.Color(0x9fc4ff) },
      },
      vertexShader: RENDER_VERTEX,
      fragmentShader: RENDER_FRAGMENT,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      transparent: true,
    });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    scene.add(points);

    // ── interaction ──
    const mouse = new THREE.Vector2(99, 99);
    const touch = new THREE.Vector4(99, 99, 12, 1);
    let scrollAcc = 0;
    let touchMode = 1; // repel; toggled by long-press / shift-click
    const ndc = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      mouse.set(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        -((e.clientY - r.top) / r.height) * 2 + 1);
    };
    const onMove = (e: PointerEvent) => { ndc(e); touch.set(mouse.x, mouse.y, 11, touchMode); };
    const onDown = (e: PointerEvent) => {
      ndc(e);
      touchMode *= -1; // click flips repel ↔ attract — the field inverts
      touch.set(mouse.x, mouse.y, 16, touchMode);
    };
    const onLeave = () => touch.set(99, 99, 12, 1);
    const onWheel = (e: WheelEvent) => { scrollAcc = THREE.MathUtils.clamp(scrollAcc + e.deltaY * 0.01, -4, 4); };
    const el = renderer.domElement;
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointerleave', onLeave);
    window.addEventListener('wheel', onWheel, { passive: true });

    const onResize = () => {
      if (!mount.clientWidth) return;
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // ── loop ──
    let raf = 0;
    let last = performance.now();
    let running = true;
    const clock = new THREE.Clock();

    // text ↔ nebula morph cycle: 9s text, 6s free swirl
    const loop = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      const cycle = t % 15;
      // strength of text attraction over the cycle
      const want = cycle < 9 ? 1 : 0;
      // ease velData.w toward want via the shader weight trick: lerp the
      // stored weight by rewriting the texture is costly — instead scale the
      // seek term through u_dt modulation
      const seekScale = want ? 1 : 0.12;
      velU.u_dt.value = dt * seekScale;
      velU.u_time.value = t;
      velU.u_mouse.value.copy(mouse);
      velU.u_touch.value.copy(touch);
      velU.u_scroll.value = scrollAcc;
      scrollAcc *= 0.94;
      posU.u_dt.value = dt;

      gpu.compute();
      (mat.uniforms.textureVelocity.value as THREE.Texture) =
        gpu.getCurrentRenderTarget(velVar).texture;

      renderer.render(scene, camera);
      if (running) raf = requestAnimationFrame(loop);
    };
    if (!reduced) raf = requestAnimationFrame(loop);
    else {
      gpu.compute();
      (mat.uniforms.textureVelocity.value as THREE.Texture) =
        gpu.getCurrentRenderTarget(velVar).texture;
      renderer.render(scene, camera);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      gpu.dispose();
      geo.dispose();
      mat.dispose();
      targetTex.dispose();
      renderer.dispose();
      if (el.parentElement === mount) mount.removeChild(el);
    };
  }, [reduced]);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
