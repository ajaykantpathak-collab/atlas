export const particlesVertexShader = /* glsl */ `
uniform sampler2D u_positionTexture;
uniform sampler2D u_velocityTexture;
uniform sampler2D u_targetTexture;
uniform float u_size;
uniform float u_pixelRatio;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_voidRadius;

attribute vec2 a_reference;
attribute float a_size;

varying float v_speed;
varying float v_depth;
varying float v_role;
varying float v_light;
varying vec3 v_world;

void main() {
  vec4 posData = texture2D(u_positionTexture, a_reference);
  vec3 velocity = texture2D(u_velocityTexture, a_reference).xyz;
  vec3 pos = posData.xyz;

  v_speed = length(velocity);
  v_world = pos;
  v_role = texture2D(u_targetTexture, a_reference).w;

  float mouseDist = length(pos.xy - u_mouse);
  v_light = 1.0 - smoothstep(0.0, 2.8, mouseDist);
  v_light *= v_light;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  v_depth = -mvPosition.z;

  if (u_voidRadius > 0.0 && length(pos) < u_voidRadius) {
    gl_PointSize = 0.0;
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }

  float atten = 230.0 / max(1.0, -mvPosition.z);
  float speedBoost = 1.0 + clamp(v_speed * 0.07, 0.0, 0.9);
  float roleBoost = mix(1.25, 0.82, v_role);
  float pulse = 1.0 + sin(u_time * 2.4 + v_role * 6.283) * 0.04;
  gl_PointSize = a_size * u_size * u_pixelRatio * atten * speedBoost * roleBoost * pulse;
  gl_PointSize *= 1.0 + v_light * 0.85;
  gl_PointSize = clamp(gl_PointSize, 0.7, 13.0);
  gl_Position = projectionMatrix * mvPosition;
}
`
