import {
  DataTexture,
  FloatType,
  RGBAFormat,
  NearestFilter,
  ClampToEdgeWrapping,
  Vector2,
  Vector3
} from 'three'
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js'
import { positionFragmentShader } from './shaders/position.frag.js'
import { velocityFragmentShader } from './shaders/velocity.frag.js'
import { LESSONS, VIEW_TILT, fillFromCloud, generateCloud } from './lessons.js'
import { seedFromTargets } from './textField.js'

export const TEXTURE_SIZE = 512
export const PARTICLE_COUNT = TEXTURE_SIZE * TEXTURE_SIZE

// textureSize is optional so lighter embeds (the landing cosmos runs 320x320
// = 102,400 light-points) can share this exact pipeline; the full Lumen Lab
// keeps the default 512x512 = 262,144.
export function createSimulation(renderer, bounds, lessonId = 'solar', textureSize = TEXTURE_SIZE) {
  const size = textureSize
  const gpu = new GPUComputationRenderer(size, size, renderer)

  const positionTexture = gpu.createTexture()
  const velocityTexture = gpu.createTexture()
  const targetTexture = createTargetTexture(size)

  let currentId = lessonId
  writeLesson(targetTexture, currentId, bounds, size)
  seedFromTargets(positionTexture.image.data, targetTexture.image.data, size * size, 2.4)
  seedVelocities(velocityTexture.image.data, size * size)

  const positionVar = gpu.addVariable('texturePosition', positionFragmentShader, positionTexture)
  const velocityVar = gpu.addVariable('textureVelocity', velocityFragmentShader, velocityTexture)

  gpu.setVariableDependencies(positionVar, [positionVar, velocityVar])
  gpu.setVariableDependencies(velocityVar, [positionVar, velocityVar])

  const lesson = LESSONS[currentId]

  Object.assign(positionVar.material.uniforms, {
    u_delta: { value: 0.016 },
    u_bounds: { value: bounds.clone() },
    u_accrete: { value: lessonId === 'hole' ? 1 : 0 },
    u_voidRadius: { value: 0 },
    u_tilt: { value: lesson.tilt ?? VIEW_TILT }
  })

  Object.assign(velocityVar.material.uniforms, {
    u_time: { value: 0 },
    u_delta: { value: 0.016 },
    u_friction: { value: lesson.friction },
    u_noiseScale: { value: 0.13 },
    u_noiseStrength: { value: lesson.noise },
    u_pointerRadius: { value: Math.max(bounds.x, bounds.y) * 0.2 },
    u_pointerForce: { value: 58.0 },
    u_attract: { value: 0 },
    u_scroll: { value: 0 },
    u_textStrength: { value: lesson.hold },
    u_spin: { value: lesson.spin },
    u_orbit: { value: lesson.orbit },
    u_kepler: { value: lesson.kepler },
    u_shear: { value: lesson.shear ?? 1.45 },
    u_burst: { value: 0 },
    u_tilt: { value: lesson.tilt ?? VIEW_TILT },
    u_accrete: { value: lessonId === 'hole' ? 1 : 0 },
    u_voidRadius: { value: 0 },
    u_mouse: { value: new Vector2() },
    u_bounds: { value: bounds.clone() },
    u_targets: { value: targetTexture }
  })

  const error = gpu.init()
  if (error !== null) {
    throw new Error(error)
  }

  let burst = 0

  function applyLesson(id) {
    const next = LESSONS[id]
    if (!next) return
    currentId = id
    velocityVar.material.uniforms.u_friction.value = next.friction
    velocityVar.material.uniforms.u_noiseStrength.value = next.noise
    velocityVar.material.uniforms.u_textStrength.value = next.hold
    velocityVar.material.uniforms.u_spin.value = next.spin
    velocityVar.material.uniforms.u_orbit.value = next.orbit
    velocityVar.material.uniforms.u_kepler.value = next.kepler
    velocityVar.material.uniforms.u_shear.value = next.shear ?? 1.45
    const tilt = next.tilt ?? VIEW_TILT
    velocityVar.material.uniforms.u_tilt.value = tilt
    positionVar.material.uniforms.u_tilt.value = tilt
    const accrete = id === 'hole' ? 1 : 0
    velocityVar.material.uniforms.u_accrete.value = accrete
    positionVar.material.uniforms.u_accrete.value = accrete
  }

  return {
    gpu,
    positionVar,
    velocityVar,
    targetTexture,
    get lessonId() {
      return currentId
    },
    get positionTexture() {
      return gpu.getCurrentRenderTarget(positionVar).texture
    },
    get velocityTexture() {
      return gpu.getCurrentRenderTarget(velocityVar).texture
    },
    compute(time, delta, pointer) {
      const dt = Math.min(delta, 0.033)
      burst *= Math.pow(0.12, dt)
      positionVar.material.uniforms.u_delta.value = dt
      positionVar.material.uniforms.u_bounds.value.copy(bounds)

      velocityVar.material.uniforms.u_time.value = time
      velocityVar.material.uniforms.u_delta.value = dt
      velocityVar.material.uniforms.u_mouse.value.set(pointer.worldX, pointer.worldY)
      velocityVar.material.uniforms.u_attract.value = pointer.attract
      velocityVar.material.uniforms.u_scroll.value = pointer.scroll
      velocityVar.material.uniforms.u_pointerRadius.value = Math.max(bounds.x, bounds.y) * 0.2
      velocityVar.material.uniforms.u_burst.value = burst
      velocityVar.material.uniforms.u_bounds.value.copy(bounds)

      const voidR = currentId === 'hole' ? Math.min(bounds.x, bounds.y) * 0.42 * 0.2 : 0
      positionVar.material.uniforms.u_voidRadius.value = voidR
      velocityVar.material.uniforms.u_voidRadius.value = voidR
      positionVar.material.uniforms.u_bounds.value.copy(bounds)

      gpu.compute()
    },
    setLesson(id, worldBounds) {
      applyLesson(id)
      writeLesson(targetTexture, id, worldBounds, size)
      burst = 1
    },
    rebuildTargets(worldBounds) {
      writeLesson(targetTexture, currentId, worldBounds, size)
    },
    burst(strength = 1.5) {
      burst = strength
    }
  }
}

function writeLesson(texture, id, bounds, size = TEXTURE_SIZE) {
  const cloud = generateCloud(id, bounds)
  fillFromCloud(texture.image.data, size, cloud)
  texture.needsUpdate = true
}

function createTargetTexture(size = TEXTURE_SIZE) {
  const data = new Float32Array(size * size * 4)
  const texture = new DataTexture(data, size, size, RGBAFormat, FloatType)
  texture.magFilter = NearestFilter
  texture.minFilter = NearestFilter
  texture.wrapS = ClampToEdgeWrapping
  texture.wrapT = ClampToEdgeWrapping
  texture.needsUpdate = true
  return texture
}

function seedVelocities(data, count = PARTICLE_COUNT) {
  for (let i = 0; i < count; i += 1) {
    const stride = i * 4
    data[stride] = (Math.random() * 2 - 1) * 0.08
    data[stride + 1] = (Math.random() * 2 - 1) * 0.08
    data[stride + 2] = (Math.random() * 2 - 1) * 0.04
    data[stride + 3] = 1
  }
}
