/**
 * lumenEngine.js — the Lumen Lab experience, ported from the workspace
 * build with the core untouched. The only changes:
 *   1. wrapped in initLumen({ canvas, cursorEl, clockEl, countEl, root })
 *      so it mounts into a React route instead of module-level DOM lookups
 *   2. setLesson also notifies React (onLesson callback) for the UI cards
 *   3. cleanup() disposes everything on route unmount
 * Everything else — simulation, shaders, lessons, physics — verbatim.
 */
import {
  Clock, Color, PerspectiveCamera, Plane, Raycaster, Scene,
  Vector2, Vector3, WebGLRenderer
} from 'three'
import { createSimulation, PARTICLE_COUNT } from './simulation'
import { createParticlePoints } from './particles'
import { createPointer } from './pointer'
import { createBackground } from './background'
import { createComposer } from './composer'
import { createUI } from './ui'
import { createLabels } from './labels'
import { createHorizon } from './horizon'
import { LESSONS } from './lessons'

export function initLumen({ canvas, cursorEl, clockEl, countEl, root, onLesson }) {
  let disposed = false

  const renderer = new WebGLRenderer({
    canvas, antialias: false, alpha: false, powerPreference: 'high-performance'
  })
  renderer.setClearColor(new Color('#0b1018'), 1)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(root.clientWidth || window.innerWidth, root.clientHeight || window.innerHeight)
  renderer.toneMappingExposure = 1.08

  const scene = new Scene()
  const camera = new PerspectiveCamera(46,
    (root.clientWidth || 1) / (root.clientHeight || 1), 0.1, 80)
  camera.position.z = 12

  const bounds = computeBounds()
  const simulation = createSimulation(renderer, bounds, 'solar')
  const particles = createParticlePoints()
  const background = createBackground()
  const labels = createLabels()
  const horizon = createHorizon()
  scene.add(background)
  scene.add(horizon)
  scene.add(particles)

  const fx = createComposer(renderer, scene, camera)
  const pointer = createPointer()
  const ui = createUI()
  const clock = new Clock()
  const ndc = new Vector2()
  const worldMouse = new Vector3()
  const hitPlane = new Plane(new Vector3(0, 0, 1), 0)
  const raycaster = new Raycaster()
  const cursorPos = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 }

  // hold-to-gather payoff: a long gather (>=0.9s) ends in a release —
  // stars burst back out with a bloom surge instead of just dispersing
  let holdStart = 0
  let bloomBoost = 0
  const onHoldStart = () => { holdStart = performance.now() }
  const onHoldRelease = () => {
    if (performance.now() - holdStart > 900) {
      simulation.burst(1.6)
      bloomBoost = 0.7
    }
  }
  window.addEventListener('pointerdown', onHoldStart)
  window.addEventListener('pointerup', onHoldRelease)

  if (countEl) countEl.textContent = PARTICLE_COUNT.toLocaleString()

  function voidRadiusFor(id) {
    if (id !== 'hole') return 0
    return Math.min(bounds.x, bounds.y) * 0.42 * 0.27
  }

  labels.setLesson('solar', bounds)
  horizon.setLesson('solar', bounds)
  ui.render('solar')
  ui.onSelect(setLesson)
  fx.setBloom(LESSONS.solar.bloom)
  particles.setVoid(0)
  if (onLesson) onLesson('solar')

  function setLesson(id) {
    if (!LESSONS[id] || id === simulation.lessonId) return
    simulation.setLesson(id, bounds)
    particles.setPalette(id)
    particles.setVoid(voidRadiusFor(id))
    background.setLesson(id)
    labels.setLesson(id, bounds)
    horizon.setLesson(id, bounds)
    fx.setBloom(LESSONS[id].bloom)
    fx.flash()
    ui.render(id)
    if (onLesson) onLesson(id)
  }

  function computeBounds() {
    const distance = camera.position.z
    const height = 2 * Math.tan((camera.fov * Math.PI) / 360) * distance
    const width = height * camera.aspect
    return new Vector3(width * 0.96, height * 0.96, 3.4)
  }

  function pointerToWorld(ndcX, ndcY, target) {
    ndc.set(ndcX, ndcY)
    raycaster.setFromCamera(ndc, camera)
    const hit = raycaster.ray.intersectPlane(hitPlane, target)
    if (!hit) target.set(ndcX * bounds.x * 0.5, ndcY * bounds.y * 0.5, 0)
    return target
  }

  function resize() {
    if (disposed) return
    const width = root.clientWidth || window.innerWidth
    const height = root.clientHeight || window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    fx.setSize(width, height)
    particles.material.uniforms.u_pixelRatio.value = Math.min(window.devicePixelRatio, 2)
    background.material.uniforms.u_resolution.value.set(width, height)
    const next = computeBounds()
    bounds.copy(next)
    simulation.rebuildTargets(bounds)
    labels.setLesson(simulation.lessonId, bounds)
    horizon.setLesson(simulation.lessonId, bounds)
    particles.setVoid(voidRadiusFor(simulation.lessonId))
  }

  window.addEventListener('resize', resize)
  const ro = new ResizeObserver(resize)
  if (root) ro.observe(root)

  function pad(v) { return String(v).padStart(2, '0') }
  function tickClock() {
    if (!clockEl) return
    const now = new Date()
    clockEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  }
  tickClock()
  const clockTimer = setInterval(tickClock, 1000)

  function frame() {
    if (disposed) return
    const delta = clock.getDelta()
    const time = clock.elapsedTime

    pointerToWorld(pointer.state.ndcX, pointer.state.ndcY, worldMouse)
    pointer.update(worldMouse.x, worldMouse.y)
    simulation.compute(time, delta, pointer.state)
    particles.tick(delta)
    bloomBoost *= Math.pow(0.22, delta)

    particles.material.uniforms.u_positionTexture.value = simulation.positionTexture
    particles.material.uniforms.u_velocityTexture.value = simulation.velocityTexture
    particles.material.uniforms.u_targetTexture.value = simulation.targetTexture
    particles.material.uniforms.u_mouse.value.set(worldMouse.x, worldMouse.y)
    particles.material.uniforms.u_time.value = time
    background.material.uniforms.u_time.value = time
    background.material.uniforms.u_mouse.value.set(pointer.state.ndcX, pointer.state.ndcY)
    fx.setBloom((LESSONS[simulation.lessonId] || LESSONS.solar).bloom + bloomBoost)

    camera.position.x += (pointer.state.ndcX * 0.28 - camera.position.x) * 0.035
    camera.position.y += (pointer.state.ndcY * 0.14 - camera.position.y) * 0.035
    camera.lookAt(0, 0, 0)

    labels.update(camera, window.innerWidth, window.innerHeight)

    cursorPos.x += (pointer.state.clientX - cursorPos.x) * 0.22
    cursorPos.y += (pointer.state.clientY - cursorPos.y) * 0.22
    if (cursorEl) {
      cursorEl.style.transform =
        `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) scale(${1 + pointer.state.attract * 0.45})`
    }

    fx.render(time)
    raf = requestAnimationFrame(frame)
  }

  let raf = requestAnimationFrame(frame)

  function cleanup() {
    disposed = true
    cancelAnimationFrame(raf)
    clearInterval(clockTimer)
    window.removeEventListener('pointerdown', onHoldStart)
    window.removeEventListener('pointerup', onHoldRelease)
    window.removeEventListener('resize', resize)
    ro.disconnect()
    renderer.dispose()
  }

  return { cleanup, setLesson }
}
