export const particlesFragmentShader = /* glsl */ `
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform vec3 u_colorC;
uniform vec3 u_colorCore;
uniform float u_opacity;

varying float v_speed;
varying float v_depth;
varying float v_role;
varying float v_light;
varying vec3 v_world;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);
  if (dist > 0.5) discard;

  float glow = 1.0 - smoothstep(0.0, 0.5, dist);
  glow = pow(glow, 1.75);

  float core = 1.0 - smoothstep(0.0, 0.15, dist);
  core = pow(core, 1.45);

  vec3 color = mix(u_colorA, u_colorB, smoothstep(0.16, 0.5, v_role));
  color = mix(color, u_colorC, smoothstep(0.55, 0.92, v_role));

  float speedT = clamp(v_speed * 0.09, 0.0, 1.0);
  color = mix(color, u_colorCore, core * 0.5 + speedT * 0.45 + v_light * 0.28);

  float depthFade = smoothstep(16.0, 5.2, v_depth);
  float alpha = (glow * 0.66 + core * 0.4) * u_opacity * mix(0.32, 1.0, depthFade);
  alpha *= 0.7 + 0.3 * (1.0 - abs(v_world.z) * 0.14);
  alpha *= 1.0 + v_light * 0.8;

  gl_FragColor = vec4(color * alpha, alpha);
}
`
