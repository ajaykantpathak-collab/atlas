import { Mesh, MeshBasicMaterial, SphereGeometry } from 'three'

export function createHorizon() {
  const mesh = new Mesh(
    new SphereGeometry(1, 48, 32),
    new MeshBasicMaterial({ color: 0x05080e })
  )
  mesh.visible = false
  mesh.frustumCulled = false
  mesh.renderOrder = 2
  mesh.setLesson = (id, bounds) => {
    const on = id === 'hole'
    mesh.visible = on
    if (!on) return
    const extent = Math.min(bounds.x, bounds.y) * 0.42
    mesh.scale.setScalar(extent * 0.255)
  }
  return mesh
}
