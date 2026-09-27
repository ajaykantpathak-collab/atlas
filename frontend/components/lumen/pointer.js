export function createPointer() {
  const state = {
    ndcX: 0,
    ndcY: 0,
    worldX: 0,
    worldY: 0,
    attract: 0,
    scroll: 0,
    clientX: window.innerWidth * 0.5,
    clientY: window.innerHeight * 0.5
  }

  let scrollImpulse = 0
  let attractTarget = 0

  const readPointer = (event) => {
    state.clientX = event.clientX
    state.clientY = event.clientY
    state.ndcX = (event.clientX / window.innerWidth) * 2 - 1
    state.ndcY = -((event.clientY / window.innerHeight) * 2 - 1)
  }

  const isUi = (event) => event.target.closest('button, .dock, .lesson-card')

  const onPointerMove = (event) => readPointer(event)
  const onPointerDown = (event) => {
    if (isUi(event)) return
    attractTarget = 1
  }
  const onPointerUp = () => {
    attractTarget = 0
  }
  const onPointerCancel = () => {
    attractTarget = 0
  }
  const onWheel = (event) => {
    scrollImpulse += event.deltaY * 0.0035
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerCancel)
  window.addEventListener('wheel', onWheel, { passive: true })

  return {
    state,
    update(worldX, worldY) {
      state.worldX = worldX
      state.worldY = worldY
      state.attract += (attractTarget - state.attract) * 0.12
      scrollImpulse *= 0.88
      state.scroll = scrollImpulse
    },
    // lets embeds (landing cosmos) fully unbind; the Lumen Lab never unmounts
    // its pointer mid-session so it simply never calls this
    destroy() {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerCancel)
      window.removeEventListener('wheel', onWheel)
    }
  }
}
