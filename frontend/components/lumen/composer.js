import { Vector2 } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

const gradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    u_vignette: { value: 0.38 },
    u_lift: { value: 0.05 },
    u_time: { value: 0 },
    u_chroma: { value: 0.0016 },
    u_flash: { value: 0 }
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float u_vignette;
    uniform float u_lift;
    uniform float u_time;
    uniform float u_chroma;
    uniform float u_flash;
    varying vec2 vUv;

    float grain(vec2 p) {
      return fract(sin(dot(p + u_time * 12.0, vec2(12.9898, 78.233))) * 43758.5453);
    }

    vec3 film(vec3 color) {
      vec3 lifted = color + u_lift;
      lifted.r = pow(max(lifted.r, 0.0), 0.94);
      lifted.g = pow(max(lifted.g, 0.0), 1.01);
      lifted.b = pow(max(lifted.b, 0.0), 1.08);
      return lifted;
    }

    void main() {
      vec2 centered = vUv - 0.5;
      vec2 dir = centered * u_chroma * length(centered);
      float r = texture2D(tDiffuse, vUv + dir).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - dir).b;
      vec3 color = film(vec3(r, g, b));

      float vig = 1.0 - dot(centered * 1.45, centered * 1.45);
      vig = mix(1.0 - u_vignette, 1.0, clamp(vig, 0.0, 1.0));
      color *= vig;

      color += (grain(vUv * 1.7) - 0.5) * 0.035;
      color += vec3(0.05, 0.07, 0.09) * u_flash;

      gl_FragColor = vec4(color, 1.0);
    }
  `
}

export function createComposer(renderer, scene, camera) {
  const size = new Vector2()
  renderer.getSize(size)

  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))

  const bloom = new UnrealBloomPass(new Vector2(size.x, size.y), 0.72, 0.62, 0.12)
  composer.addPass(bloom)

  const grade = new ShaderPass(gradeShader)
  composer.addPass(grade)

  let flash = 0

  return {
    composer,
    bloom,
    flash() {
      flash = 1
    },
    setBloom(value) {
      bloom.strength = value
    },
    setSize(width, height) {
      composer.setSize(width, height)
      bloom.setSize(width, height)
    },
    render(time) {
      flash *= 0.9
      grade.uniforms.u_time.value = time
      grade.uniforms.u_flash.value = flash
      composer.render()
    }
  }
}
