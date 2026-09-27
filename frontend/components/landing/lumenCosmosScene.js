/**
 * lumenCosmosScene.js — the Lumen starfield mounted as the landing page's
 * living background. Reuses the exact Lumen Lab pipeline (components/lumen/*:
 * GPUComputationRenderer simulation, pointer-as-passing-mass gravity, bloom +
 * film-grade composer) with three landing-specific differences:
 *
 *   1. QUALITY TIER — the compute texture runs 288x288 = 82,944 light-points
 *      on desktop and 256x256 = 65,536 on phones (the full /lumen experience
 *      is 512x512 = 262,144), the pixel ratio is capped below the Lab's, and
 *      bloom runs at half resolution so 60fps survives behind scrolling
 *      content.
 *   2. PAUSE ON HIDDEN TAB — the rAF loop is cancelled on visibilitychange
 *      and rebuilt with a flushed clock on return.
 *   3. FULL UNBIND — every window/document listener is removable and every
 *      GPU resource is disposed, because this scene lives or dies with the
 *      landing route instead of owning the tab.
 *
 * prefers-reduced-motion never boots WebGL at all: drawStaticStarfield()
 * paints a single silent frame that the component shows instead.
 */
import {
  Clock, Color, PerspectiveCamera, Plane, Raycaster, Scene,
  Vector2, Vector3, WebGLRenderer
} from 'three'
import { createSimulation } from '../lumen/simulation'
import { createParticlePoints } from '../lumen/particles'
import { createPointer } from '../lumen/pointer'
import { createBackground } from '../lumen/background'
import { createComposer } from '../lumen/composer'
import { LESSONS } from '../lumen/lessons'

// the solar-system core sits a touch below centre so the hero copy owns the
// upper half of the screen; the disk still glows behind the stats band
const COMPOS_Y = -0.9
const DESKTOP_TEXTURE = 288 // 82,944 light-points
const MOBILE_TEXTURE = 256 // 65,536 light-points

export function initCosmos({ canvas, onReady }) {
  let disposed = false

  const coarse = window.matchMedia('(pointer: coarse)').matches
  const mobile = coarse || window.innerWidth < 768
  const textureSize = mobile ? MOBILE_TEXTURE : DESKTOP_TEXTURE
  // dpr caps: star sprites are soft glow discs behind contrast scrims, so
  // extra dpr sharpness is invisible there — 1.25 on desktop and 1.5 on
  // phones keep the bloom pipeline inside the 60fps budget even on
  // integrated/software rasterizers (the Lab itself caps at 2)
  const maxDpr = mobile ? 1.5 : 1.25

  const renderer = new WebGLRenderer({
    canvas, antialias: false, alpha: false, powerPreference: 'high-performance'
  })
  // same near-black as the landing's own bg so pre-WebGL paint matches
  renderer.setClearColor(new Color('#0a0a0f'), 1)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.toneMappingExposure = 1.08

  const scene = new Scene()
  const camera = new PerspectiveCamera(46,
    window.innerWidth / Math.max(1, window.innerHeight), 0.1, 80)
  camera.position.z = 12

  const bounds = computeBounds()
  const simulation = createSimulation(renderer, bounds, 'solar', textureSize)
  const particles = createParticlePoints(textureSize)
  const background = createBackground()
  scene.add(background)
  scene.add(particles)
  scene.position.y = COMPOS_Y

  const fx = createComposer(renderer, scene, camera)
  fx.setBloom(LESSONS.solar.bloom)
  // half-resolution bloom: blur layers don't need full-res targets, and this
  // keeps the composer's cost at a fraction of the Lab's behind live content
  const halfBloom = () => {
    const s = new Vector2()
    renderer.getSize(s)
    fx.bloom.setSize(Math.max(1, s.x / 2), Math.max(1, s.y / 2))
  }
  halfBloom()
  const pointer = createPointer()
  const clock = new Clock()
  const ndc = new Vector2()
  const worldMouse = new Vector3()
  const hitPlane = new Plane(new Vector3(0, 0, 1), 0)
  const raycaster = new Raycaster()

  // hold-to-gather payoff carried over verbatim from the Lab: a long gather
  // (>=0.9s) ends in a release — stars burst back out with a bloom surge.
  // On touch this is exactly "press and hold, then let go".
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

  let ready = false

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
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr))
    fx.setSize(width, height)
    halfBloom()
    particles.material.uniforms.u_pixelRatio.value = Math.min(window.devicePixelRatio, maxDpr)
    background.material.uniforms.u_resolution.value.set(width, height)
    bounds.copy(computeBounds())
    simulation.rebuildTargets(bounds)
  }
  window.addEventListener('resize', resize)

  function frame() {
    if (disposed) return
    const delta = Math.min(clock.getDelta(), 0.05)
    const time = clock.elapsedTime

    pointerToWorld(pointer.state.ndcX, pointer.state.ndcY, worldMouse)
    // particle space is scene-local (scene sits at COMPOS_Y) — convert the
    // pointer hit so the gravity well lands exactly under the cursor
    worldMouse.y -= COMPOS_Y
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
    fx.setBloom(LESSONS.solar.bloom + bloomBoost)

    // same gentle pointer parallax as the Lab — the sky leans toward you
    camera.position.x += (pointer.state.ndcX * 0.28 - camera.position.x) * 0.035
    camera.position.y += (pointer.state.ndcY * 0.14 - camera.position.y) * 0.035
    camera.lookAt(0, 0, 0)

    fx.render(time)

    if (!ready) {
      ready = true
      if (onReady) onReady()
    }
    raf = requestAnimationFrame(frame)
  }

  let raf = requestAnimationFrame(frame)

  // pause the render when the tab is hidden (browsers already throttle rAF in
  // background tabs; this makes the intent explicit and skips the final frame)
  const onVisibility = () => {
    if (document.hidden) {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    } else if (!disposed && !raf) {
      clock.getDelta() // drop the time accumulated while hidden
      raf = requestAnimationFrame(frame)
    }
  }
  document.addEventListener('visibilitychange', onVisibility)

  function cleanup() {
    disposed = true
    if (raf) cancelAnimationFrame(raf)
    document.removeEventListener('visibilitychange', onVisibility)
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointerdown', onHoldStart)
    window.removeEventListener('pointerup', onHoldRelease)
    pointer.destroy()
    try { simulation.gpu.dispose() } catch (e) { /* already torn down */ }
    try { fx.composer.dispose() } catch (e) { /* already torn down */ }
    particles.geometry.dispose()
    particles.material.dispose()
    background.geometry.dispose()
    background.material.dispose()
    renderer.dispose()
  }

  return { cleanup }
}

/**
 * Static one-shot starfield for prefers-reduced-motion (and any GPU without
 * float-render-target support): same near-black ink, cool wash and star
 * distribution as the animated sky, with a few Atlas-gold members — painted
 * once, never animated.
 */
export function drawStaticStarfield(canvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const width = window.innerWidth
  const height = window.innerHeight
  canvas.width = Math.max(1, Math.round(width * dpr))
  canvas.height = Math.max(1, Math.round(height * dpr))
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  ctx.fillStyle = '#0a0a0f'
  ctx.fillRect(0, 0, width, height)

  // cool nebula washes echoing background.frag.js
  const wash = (x, y, r, color) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, color)
    g.addColorStop(1, 'rgba(10,10,15,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, width, height)
  }
  wash(width * 0.5, height * 0.42, Math.max(width, height) * 0.55, 'rgba(20,31,42,0.55)')
  wash(width * 0.18, height * 0.7, width * 0.4, 'rgba(13,25,31,0.5)')
  wash(width * 0.85, height * 0.25, width * 0.3, 'rgba(17,20,38,0.45)')

  const stars = Math.round((width * height) / 1400)
  for (let i = 0; i < stars; i += 1) {
    const x = Math.random() * width
    const y = Math.random() * height
    const depth = Math.pow(Math.random(), 2.2) // few bright, many faint
    const r = 0.4 + depth * 1.5
    const tint = Math.random()
    if (tint > 0.94) ctx.fillStyle = `rgba(251,191,36,${0.35 + depth * 0.5})` // gold members
    else if (tint > 0.6) ctx.fillStyle = `rgba(168,220,200,${0.2 + depth * 0.5})`
    else ctx.fillStyle = `rgba(216,228,244,${0.16 + depth * 0.55})`
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
}
