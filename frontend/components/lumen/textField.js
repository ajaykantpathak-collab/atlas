const TEXT_LINES = ['AETHER']

export function createTextField({ width = 2048, height = 768, canvas } = {}) {
  const el = canvas || document.createElement('canvas')
  el.width = width
  el.height = height

  const ctx = el.getContext('2d', { willReadFrequently: true })
  return {
    canvas: el,
    ctx,
    width,
    height,
    sample(worldBounds) {
      return sampleTextTargets(ctx, width, height, worldBounds)
    },
    draw(text = TEXT_LINES) {
      drawText(ctx, width, height, text)
    }
  }
}

function drawText(ctx, width, height, lines) {
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `500 ${Math.floor(width * 0.18)}px "Cormorant Garamond", "Times New Roman", serif`

  const count = lines.length
  const gap = height / (count + 1)
  for (let i = 0; i < count; i += 1) {
    ctx.fillText(lines[i], width * 0.5, gap * (i + 1) + height * 0.02)
  }

  ctx.globalAlpha = 0.18
  ctx.font = `italic 400 ${Math.floor(width * 0.028)}px "Cormorant Garamond", serif`
  ctx.fillText('a field of light, held in tension', width * 0.5, height * 0.78)
  ctx.globalAlpha = 1
}

function sampleTextTargets(ctx, width, height, worldBounds) {
  const image = ctx.getImageData(0, 0, width, height)
  const { data } = image
  const coords = []
  const stride = 2

  for (let y = 0; y < height; y += stride) {
    for (let x = 0; x < width; x += stride) {
      const i = (y * width + x) * 4
      if (data[i] > 24) {
        coords.push(x, y)
      }
    }
  }

  if (coords.length === 0) {
    coords.push(width * 0.5, height * 0.5)
  }

  return {
    coords,
    toWorld(px, py) {
      const nx = px / width - 0.5
      const ny = 0.5 - py / height
      return [
        nx * worldBounds.x * 0.88,
        ny * worldBounds.y * 0.62,
        (Math.random() - 0.5) * worldBounds.z * 0.045
      ]
    }
  }
}

export function fillTargetTexture(textureData, size, sampler) {
  const { coords, toWorld } = sampler
  const pairCount = coords.length / 2
  const count = size * size

  for (let i = 0; i < count; i += 1) {
    const pick = Math.floor(Math.random() * pairCount)
    const px = coords[pick * 2]
    const py = coords[pick * 2 + 1]
    const [x, y, z] = toWorld(px, py)
    const stride = i * 4
    textureData[stride] = x
    textureData[stride + 1] = y
    textureData[stride + 2] = z
    textureData[stride + 3] = 1
  }
}

export function seedFromTargets(positionData, targetData, count, scatter = 0.18) {
  for (let i = 0; i < count; i += 1) {
    const stride = i * 4
    positionData[stride] = targetData[stride] + (Math.random() - 0.5) * scatter
    positionData[stride + 1] = targetData[stride + 1] + (Math.random() - 0.5) * scatter
    positionData[stride + 2] = targetData[stride + 2] + (Math.random() - 0.5) * scatter * 0.4
    positionData[stride + 3] = 1
  }
}
