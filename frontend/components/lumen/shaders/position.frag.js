export const positionFragmentShader = /* glsl */ `
uniform float u_delta;
uniform vec3 u_bounds;
uniform float u_accrete;
uniform float u_voidRadius;
uniform float u_tilt;

vec3 rotateX(vec3 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec3(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 posData = texture2D(texturePosition, uv);
  vec4 velData = texture2D(textureVelocity, uv);

  vec3 position = posData.xyz;
  vec3 velocity = velData.xyz;

  position += velocity * u_delta;

  if (u_accrete > 0.5 && u_voidRadius > 0.0) {
    vec3 loc = rotateX(position, -u_tilt);
    float r = length(loc.xz);
    float swallowed = step(length(position), u_voidRadius * 0.96);
    float jetGone = step(u_bounds.y * 0.46, abs(loc.y)) * step(2.0, abs(loc.y) / max(r, 0.04));

    if (swallowed > 0.5 || jetGone > 0.5) {
      float h = hash21(uv);
      float h2 = hash21(uv + 17.13);
      float h3 = hash21(uv + 91.7);

      if (jetGone > 0.5 && h > 0.62) {
        float side = loc.y >= 0.0 ? 1.0 : -1.0;
        // restart anywhere along a narrow cone so the jet reads as a
        // thin continuous beam, not beads or a fat glowing column
        float along = h3 * u_bounds.y * 0.22;
        vec3 local = vec3(
          (h - 0.5) * (0.04 + along * 0.09),
          side * (u_voidRadius * 1.2 + along),
          (h2 - 0.5) * (0.04 + along * 0.09));
        position = rotateX(local, u_tilt);
      } else {
        float a = h * 6.2831853;
        // Accretion-style respawn: concentrate back into the hot inner disk
        // (pow bias < 1 keeps gas near the horizon instead of filling a
        // wide round halo), with a thin scale height.
        float rad = mix(u_voidRadius * 1.45, min(u_bounds.x, u_bounds.y) * 0.34, pow(h2, 2.2));
        vec3 local = vec3(cos(a) * rad, (h3 - 0.5) * 0.012, sin(a) * rad);
        position = rotateX(local, u_tilt);
      }
      velocity = vec3(0.0);
    }
  }

  vec3 halfBounds = u_bounds * 0.5;
  position = clamp(position, -halfBounds, halfBounds);

  gl_FragColor = vec4(position, posData.w);
}
`
