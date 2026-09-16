export const backgroundFragmentShader = /* glsl */ `
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_tint;

varying vec2 vUv;

// hash-based starfield: two parallax-free layers, per-star twinkle phase.
// ~18% of cells carry a star so the sky reads deep, not noisy.
float star(vec2 uv, float cells, float thresh, float time) {
  vec2 grid = uv * cells;
  vec2 id = floor(grid);
  vec2 f = fract(grid) - 0.5;
  float h = fract(sin(dot(id, vec2(127.1, 311.7))) * 43758.5453);
  if (h < thresh) return 0.0;
  vec2 off = (vec2(fract(h * 137.31), fract(h * 271.13)) - 0.5) * 0.72;
  float d = length(f - off);
  float body = 1.0 - smoothstep(0.0, 0.10 + h * 0.06, d);
  body = pow(body, 1.6);
  float tw = 0.62 + 0.38 * sin(time * (0.5 + h * 1.9) + h * 43.0);
  return body * tw * (0.35 + (h - thresh) * 2.4);
}

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

  // starfield — dim dust of far stars + a sparse brighter layer
  vec2 suv = uv;
  suv.x *= u_resolution.x / max(u_resolution.y, 1.0);
  float stars =
      star(suv + vec2(0.13, 0.71), 34.0, 0.80, u_time) * 0.42
    + star(suv + vec2(0.57, 0.29), 15.0, 0.86, u_time) * 0.85;
  color += vec3(0.78, 0.84, 0.96) * stars;

  gl_FragColor = vec4(color, 1.0);
}
`
