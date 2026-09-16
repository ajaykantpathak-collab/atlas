import {
  AdditiveBlending,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  ShaderMaterial,
  SphereGeometry
} from 'three'

const RING_FRAGMENT = /* glsl */ `
  varying vec2 vUv;
  uniform float u_intensity;

  void main() {
    // plane half-width maps to r=1.0 (plane is 2.6 x horizon wide, so
    // r=1.0 is 1.3 x horizon in world units)
    vec2 p = (vUv - 0.5) * 2.0;
    float r = length(p);

    // the photon ring: a razor-thin bright circle just outside the
    // silhouette (r ~ 0.83 == 1.08 x horizon), tight halo so bloom bleed
    // doesn't wash the silhouette in amber
    float ring = exp(-pow((r - 0.83) * 40.0, 2.0));
    float halo = exp(-pow((r - 0.85) * 11.0, 2.0)) * 0.22;
    float innerWash = exp(-pow((r - 0.80) * 3.2, 2.0)) * 0.05;

    // the halo brightens slightly toward the top — cheap Doppler/tilt cue
    float topBias = 1.0 + 0.18 * smoothstep(0.1, 0.9, p.y);

    float a = (ring * 1.05 + halo + innerWash) * u_intensity * topBias;
    vec3 hot = vec3(1.0, 0.965, 0.885);
    vec3 warm = vec3(1.0, 0.83, 0.58);
    vec3 col = mix(hot, warm, clamp((r - 0.70) * 1.8, 0.0, 1.0));

    gl_FragColor = vec4(col * a, a);
  }
`

const RING_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export function createHorizon() {
  const mesh = new Mesh(
    new SphereGeometry(1, 64, 48),
    new MeshBasicMaterial({ color: 0x000000 })
  )
  mesh.visible = false
  mesh.frustumCulled = false
  mesh.renderOrder = 2

  // billboarded photon ring — additive, drawn just outside the silhouette
  const ringMaterial = new ShaderMaterial({
    uniforms: { u_intensity: { value: 1 } },
    vertexShader: RING_VERTEX,
    fragmentShader: RING_FRAGMENT,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false
  })
  const ring = new Mesh(new PlaneGeometry(1, 1), ringMaterial)
  ring.visible = false
  ring.frustumCulled = false
  ring.renderOrder = 3
  mesh.add(ring)

  mesh.setLesson = (id, bounds) => {
    const on = id === 'hole'
    mesh.visible = on
    if (!on) return
    const extent = Math.min(bounds.x, bounds.y) * 0.42
    // void (0.20) ≈ sphere (0.198): the disk plunges right up to the
    // silhouette and the photon ring covers the seam
    mesh.scale.setScalar(extent * 0.198)
    // ring is a CHILD of the scaled sphere → relative scale: 2.6 makes the
    // plane's half-width 1.3 x horizon, so shader r=0.83 sits at ~1.08 x
    // horizon, hugging the silhouette
    ring.scale.setScalar(2.6)
    ringMaterial.uniforms.u_intensity.value = 1.0
  }

  // engine frame() calls this so the ring always faces the camera
  mesh.tick = (camera) => {
    if (!mesh.visible) return
    ring.quaternion.copy(camera.quaternion)
  }

  return mesh
}
