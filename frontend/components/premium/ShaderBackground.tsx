'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uIntensity;

  // Simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    vec2 centered = uv - 0.5;
    centered.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.15;
    vec2 mouseInfluence = (uMouse - 0.5) * 0.3;

    float noise1 = snoise(centered * 2.0 + vec2(t, t * 0.7) + mouseInfluence);
    float noise2 = snoise(centered * 4.0 + vec2(-t * 0.5, t) + mouseInfluence * 0.5);
    float noise3 = snoise(centered * 8.0 + vec2(t * 0.3, -t * 0.4));

    float combined = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
    combined *= uIntensity;

    vec3 color1 = vec3(0.388, 0.400, 0.945); // brand-500
    vec3 color2 = vec3(0.545, 0.361, 0.965); // purple
    vec3 color3 = vec3(0.851, 0.275, 0.937); // accent-500
    vec3 color4 = vec3(0.220, 0.741, 0.969); // cyan

    vec3 finalColor = mix(color1, color2, smoothstep(-0.3, 0.3, combined));
    finalColor = mix(finalColor, color3, smoothstep(0.0, 0.6, combined));
    finalColor = mix(finalColor, color4, smoothstep(0.3, 0.8, noise3 * 0.5 + 0.5));

    float vignette = 1.0 - length(centered) * 0.8;
    finalColor *= vignette;
    finalColor *= 0.4;

    gl_FragColor = vec4(finalColor, 0.6);
  }
`

function ShaderPlane({ intensity = 1.0 }: { intensity?: number }) {
  const mesh = useRef<THREE.Mesh>(null!)
  const material = useRef<THREE.ShaderMaterial>(null!)

  useFrame((state) => {
    if (!material.current) return
    material.current.uniforms.uTime.value = state.clock.elapsedTime
    material.current.uniforms.uMouse.value.set(
      state.mouse.x * 0.5 + 0.5,
      state.mouse.y * 0.5 + 0.5
    )
  })

  return (
    <mesh ref={mesh} scale={[2, 2, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uResolution: { value: new THREE.Vector2(1, 1) },
          uIntensity: { value: intensity },
        }}
      />
    </mesh>
  )
}

interface ShaderBackgroundProps {
  className?: string
  intensity?: number
}

export function ShaderBackground({ className = '', intensity = 1.0 }: ShaderBackgroundProps) {
  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`} style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ShaderPlane intensity={intensity} />
      </Canvas>
    </div>
  )
}
