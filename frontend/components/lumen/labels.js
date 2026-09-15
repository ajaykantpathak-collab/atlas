import { Vector3 } from 'three'
import { labelWorld, LESSONS } from './lessons.js'

export function createLabels() {
  const root = document.getElementById('annotations')
  const scratch = new Vector3()
  let current = []

  function setLesson(id, bounds) {
    if (!root) return
    root.innerHTML = ''
    current = labelWorld(LESSONS[id], bounds).map((label) => {
      const el = document.createElement('div')
      el.className = 'anno'
      el.innerHTML = `<span class="anno-line"></span><span class="anno-copy"><em>${label.name}</em>${label.note}</span>`
      root.appendChild(el)
      return { ...label, el, world: new Vector3(label.x, label.y, label.z) }
    })
  }

  function update(camera, width, height) {
    for (const label of current) {
      scratch.copy(label.world)
      scratch.project(camera)
      const sx = (scratch.x * 0.5 + 0.5) * width
      const sy = (-scratch.y * 0.5 + 0.5) * height
      const visible = scratch.z > -1 && scratch.z < 1
      label.el.style.transform = `translate3d(${sx}px, ${sy}px, 0)`
      label.el.style.opacity = visible ? '1' : '0'
    }
  }

  return { setLesson, update }
}
