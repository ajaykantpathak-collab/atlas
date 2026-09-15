import {
  AdditiveBlending,
  Color,
  IcosahedronGeometry,
  Mesh,
  ShaderMaterial
} from 'three'
import { glowVertexShader } from './shaders/glow.vert.js'
import { glowFragmentShader } from './shaders/glow.frag.js'
import { LESSONS } from './lessons.js'

export function createCoreGlow() {
  const geometry = new IcosahedronGeometry(1, 3)
  const material = new ShaderMaterial({
    uniforms: {
      u_color: { value: new Color('#f0c36a') },
      u_intensity: { value: 1 },
      u_time: { value: 0 }
    },
    vertexShader: glowVertexShader,
    fragmentShader: glowFragmentShader,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false
  })

  const inner = new Mesh(geometry, material)
  const outer = new Mesh(geometry, material.clone())
  outer.material.uniforms.u_color = material.uniforms.u_color
  outer.material.uniforms.u_time = material.uniforms.u_time
  outer.scale.setScalar(1.55)
  outer.material.uniforms.u_intensity.value = 0.45

  inner.add(outer)
  inner.frustumCulled = false

  inner.setLesson = (id, bounds) => {
    const lesson = LESSONS[id]
    const scale = Math.min(bounds.x, bounds.y)
    material.uniforms.u_color.value.set(lesson.colors.a)
    if (id === 'atom') inner.scale.setScalar(scale * 0.055)
    else if (id === 'water') inner.scale.setScalar(scale * 0.07)
    else inner.scale.setScalar(scale * 0.018)
    inner.visible = id !== 'dna'
  }

  inner.tick = (time) => {
    material.uniforms.u_time.value = time
    inner.rotation.y = time * 0.12
    inner.rotation.x = Math.sin(time * 0.2) * 0.08
  }

  return inner
}
