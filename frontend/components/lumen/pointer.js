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

  window.addEventListener('pointermove', readPointer, { passive: true })
  window.addEventListener('pointerdown', (event) => {
    if (isUi(event)) return
    attractTarget = 1
  })
  window.addEventListener('pointerup', () => {
    attractTarget = 0
  })
  window.addEventListener('pointercancel', () => {
    attractTarget = 0
  })

  window.addEventListener(
    'wheel',
    (event) => {
      scrollImpulse += event.deltaY * 0.0035
    },
    { passive: true }
  )

  return {
    state,
    update(worldX, worldY) {
      state.worldX = worldX
      state.worldY = worldY
      state.attract += (attractTarget - state.attract) * 0.12
      scrollImpulse *= 0.88
      state.scroll = scrollImpulse
    }
  }
}
