export const backgroundFragmentShader = /* glsl */ `
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_tint;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 centered = uv - 0.5;
  centered.x *= u_resolution.x / max(u_resolution.y, 1.0);

  vec3 ink = vec3(0.043, 0.063, 0.094);
  vec3 wash = mix(vec3(0.07, 0.1, 0.13), u_tint, 0.55);

  float radial = 1.0 - smoothstep(0.05, 0.85, length(centered));
  float mouseGlow = 1.0 - smoothstep(0.0, 0.55, length(centered - u_mouse * 0.22));

  float drift = sin(u_time * 0.07 + uv.x * 2.4) * 0.5 + 0.5;
  vec3 color = mix(ink, wash, radial * 0.5 + drift * 0.08);
  color += u_tint * mouseGlow * 0.35;
  color += vec3(0.02, 0.03, 0.05) * (1.0 - uv.y) * 0.3;

  gl_FragColor = vec4(color, 1.0);
}
`
