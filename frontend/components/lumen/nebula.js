/**
 * nebula.js — volumetric-looking gas clouds behind the particle field.
 *
 * A handful of large, slowly-morphing fbm sprites (fragment-shader fbm on
 * a fullscreen-ish plane per cloud) tinted per lesson. Additive, very low
 * alpha — this is the "gas" that makes the reference photo rich.
 */

import * as THREE from 'three'

const NEBULA_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float u_time;
uniform float u_seed;
uniform vec3 u_tint_a;
uniform vec3 u_tint_b;
uniform float u_intensity;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

float vnoise(vec2 pt) {
  vec2 ip = floor(pt);
  vec2 fp = fract(pt);
  vec2 sm = fp * fp * (3.0 - 2.0 * fp);
  float n00 = hash2(ip);
  float n10 = hash2(ip + vec2(1.0, 0.0));
  float n01 = hash2(ip + vec2(0.0, 1.0));
  float n11 = hash2(ip + vec2(1.0, 1.0));
  float nx0 = mix(n00, n10, sm.x);
  float nx1 = mix(n01, n11, sm.x);
  return mix(nx0, nx1, sm.y);
}

float fbm(vec2 pp) {
  float acc = 0.0;
  float amp = 0.55;
  vec2 wp = pp;
  for (int i = 0; i < 5; i++) {
    acc += amp * vnoise(wp);
    wp = wp * 2.03 + vec2(11.7, 5.3);
    amp *= 0.5;
  }
  return acc;
}

void main() {
  vec2 p = (vUv - 0.5) * 2.0;
  float r = length(p);
  float edge = 1.0 - smoothstep(0.35, 1.0, r);

  vec2 q = p * 2.6 + vec2(u_seed * 13.7, u_seed * 7.1);
  float f1 = fbm(q + vec2(u_time * 0.014, -u_time * 0.011));
  vec2 q2 = q * 1.9 - vec2(u_time * 0.008, u_time * 0.017);
  float f2 = fbm(q2);
  float gas = f1 * 0.72 + f2 * 0.42;

  float fil = 1.0 - abs(2.0 * f2 - 1.0);
  gas = gas * 0.72 + fil * fil * 0.5;

  float density = smoothstep(0.42, 0.95, gas) * edge;
  vec3 col = mix(u_tint_a, u_tint_b, clamp(f2 * 1.4, 0.0, 1.0));
  col += vec3(1.0, 0.92, 0.8) * pow(fil, 3.0) * 0.35;

  gl_FragColor = vec4(col * density * u_intensity, density * u_intensity * 0.5);
}
`

const NEBULA_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export function createNebula(tintA, tintB) {
  const group = new THREE.Group()
  const layers = []

  const makeLayer = (z, scale, intensity, seed, ta, tb) => {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_seed: { value: seed },
        u_intensity: { value: intensity },
        u_tint_a: { value: new THREE.Color(ta) },
        u_tint_b: { value: new THREE.Color(tb) },
      },
      vertexShader: NEBULA_VERT,
      fragmentShader: NEBULA_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(scale, scale * 0.62), mat)
    mesh.position.z = z
    group.add(mesh)
    layers.push(mat)
    return mesh
  }

  // far cool violet sheet
  makeLayer(-26, 120, 0.10, 3.1, '#1a1440', '#3a2a6a')
  // mid electric-blue filaments
  makeLayer(-16, 88, 0.085, 7.9, '#12204a', '#2a4a8a')
  // near warm emission (orange/pink cores like the reference)
  makeLayer(-8, 60, 0.06, 12.3, '#5a2410', '#c85820')

  return {
    group,
    update(t) {
      for (const m of layers) m.uniforms.u_time.value = t
    },
    setLesson(ta, tb) {
      // re-tint per lesson (keep the warm emission layer)
      layers[0].uniforms.u_tint_a.value.set(ta)
      layers[0].uniforms.u_tint_b.value.set(tb)
      layers[1].uniforms.u_tint_a.value.set(ta).lerp(new THREE.Color('#2a4a8a'), 0.5)
    },
    dispose() {
      for (const mesh of group.children) {
        mesh.geometry.dispose()
        mesh.material.dispose()
      }
    },
  }
}
