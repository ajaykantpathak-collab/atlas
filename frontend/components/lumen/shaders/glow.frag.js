export const glowFragmentShader = /* glsl */ `
uniform vec3 u_color;
uniform float u_intensity;
uniform float u_time;

varying vec3 vNormal;
varying vec3 vView;

void main() {
  vec3 n = normalize(vNormal);
  vec3 v = normalize(vView);
  float fresnel = pow(1.0 - abs(dot(n, v)), 2.4);
  float pulse = 0.85 + 0.15 * sin(u_time * 2.1);
  vec3 color = u_color * (0.18 + fresnel * 1.35) * u_intensity * pulse;
  float alpha = (0.08 + fresnel * 0.72) * u_intensity;
  gl_FragColor = vec4(color, alpha);
}
`
