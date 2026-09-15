import { Color, Mesh, PlaneGeometry, ShaderMaterial, Vector2 } from 'three'
import { backgroundVertexShader } from './shaders/background.vert.js'
import { backgroundFragmentShader } from './shaders/background.frag.js'
import { LESSONS } from './lessons.js'

export function createBackground() {
  const material = new ShaderMaterial({
    uniforms: {
      u_time: { value: 0 },
      u_resolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
      u_mouse: { value: new Vector2() },
      u_tint: { value: new Color().fromArray(LESSONS.solar.tint) }
    },
    vertexShader: backgroundVertexShader,
    fragmentShader: backgroundFragmentShader,
    depthWrite: false,
    depthTest: false
  })

  const mesh = new Mesh(new PlaneGeometry(2, 2), material)
  mesh.frustumCulled = false
  mesh.renderOrder = -1
  mesh.setLesson = (id) => {
    material.uniforms.u_tint.value.fromArray(LESSONS[id].tint)
  }
  return mesh
}
