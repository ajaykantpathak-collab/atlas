import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Points,
  ShaderMaterial,
  Vector2
} from 'three'
import { particlesVertexShader } from './shaders/particles.vert.js'
import { particlesFragmentShader } from './shaders/particles.frag.js'
import { PARTICLE_COUNT, TEXTURE_SIZE } from './simulation.js'
import { LESSONS } from './lessons.js'

export function createParticlePoints() {
  const geometry = new BufferGeometry()
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const references = new Float32Array(PARTICLE_COUNT * 2)
  const sizes = new Float32Array(PARTICLE_COUNT)

  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const x = (i % TEXTURE_SIZE) / TEXTURE_SIZE
    const y = Math.floor(i / TEXTURE_SIZE) / TEXTURE_SIZE
    references[i * 2] = x
    references[i * 2 + 1] = y
    sizes[i] = 0.28 + Math.pow(Math.random(), 2.4) * 1.7
  }

  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('a_reference', new BufferAttribute(references, 2))
  geometry.setAttribute('a_size', new BufferAttribute(sizes, 1))

  const material = new ShaderMaterial({
    uniforms: {
      u_positionTexture: { value: null },
      u_velocityTexture: { value: null },
      u_targetTexture: { value: null },
      u_size: { value: 1.12 },
      u_pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      u_colorA: { value: new Color(LESSONS.solar.colors.a) },
      u_colorB: { value: new Color(LESSONS.solar.colors.b) },
      u_colorC: { value: new Color(LESSONS.solar.colors.c) },
      u_colorCore: { value: new Color(LESSONS.solar.colors.core) },
      u_opacity: { value: 0.46 },
      u_mouse: { value: new Vector2() },
      u_time: { value: 0 },
      u_voidRadius: { value: 0 }
    },
    vertexShader: particlesVertexShader,
    fragmentShader: particlesFragmentShader,
    blending: AdditiveBlending,
    depthWrite: false,
    transparent: true
  })

  const points = new Points(geometry, material)
  points.frustumCulled = false
  // palette bleed: setPalette sets DESTINATIONS, tick(dt) eases the live
  // colors toward them so lesson switches blend (~1s) instead of snapping
  const paletteTarget = {
    a: new Color(LESSONS.solar.colors.a),
    b: new Color(LESSONS.solar.colors.b),
    c: new Color(LESSONS.solar.colors.c),
    core: new Color(LESSONS.solar.colors.core),
  }
  points.setPalette = (lessonId) => {
    const colors = LESSONS[lessonId].colors
    paletteTarget.a.set(colors.a)
    paletteTarget.b.set(colors.b)
    paletteTarget.c.set(colors.c)
    paletteTarget.core.set(colors.core)
  }
  points.tick = (dt) => {
    const k = Math.min(1, Math.max(0, 1 - Math.pow(0.32, dt)))
    const u = material.uniforms
    u.u_colorA.value.lerp(paletteTarget.a, k)
    u.u_colorB.value.lerp(paletteTarget.b, k)
    u.u_colorC.value.lerp(paletteTarget.c, k)
    u.u_colorCore.value.lerp(paletteTarget.core, k)
  }
  points.setVoid = (radius) => {
    material.uniforms.u_voidRadius.value = radius
  }
  return points
}
