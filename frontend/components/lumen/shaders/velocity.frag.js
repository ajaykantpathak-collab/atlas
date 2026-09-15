import { simplexNoise3d } from './simplexNoise3d.glsl.js'
import { curlNoise } from './curlNoise.glsl.js'

export const velocityFragmentShader = /* glsl */ `
${simplexNoise3d}
${curlNoise}

uniform float u_time;
uniform float u_delta;
uniform float u_friction;
uniform float u_noiseScale;
uniform float u_noiseStrength;
uniform float u_pointerRadius;
uniform float u_pointerForce;
uniform float u_attract;
uniform float u_scroll;
uniform float u_textStrength;
uniform float u_spin;
uniform float u_orbit;
uniform float u_kepler;
uniform float u_shear;
uniform float u_burst;
uniform float u_tilt;
uniform float u_accrete;
uniform float u_voidRadius;
uniform vec2 u_mouse;
uniform vec3 u_bounds;
uniform sampler2D u_targets;

vec3 rotateY(vec3 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec3(p.x * c - p.z * s, p.y, p.x * s + p.z * c);
}

vec3 rotateX(vec3 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec3(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 position = texture2D(texturePosition, uv).xyz;
  vec3 velocity = texture2D(textureVelocity, uv).xyz;
  vec4 targetData = texture2D(u_targets, uv);
  vec3 target = targetData.xyz;
  float role = targetData.w;

  vec3 local = rotateX(target, -u_tilt);
  float radial = length(local.xz);
  float jet = abs(local.y) / max(radial, 0.08);
  float omega = u_kepler / pow(max(radial, 0.22), u_shear);
  if (jet > 1.6) omega *= 0.08;
  if (radial < 0.16) omega = u_spin;

  vec3 spunLocal = rotateY(local, u_time * omega);
  vec3 spun = rotateX(spunLocal, u_tilt);

  vec3 samplePos = position * u_noiseScale + vec3(u_time * 0.02, u_time * 0.016, u_time * 0.012);
  vec3 curl = curlNoise(samplePos);
  float scrollWarp = clamp(u_scroll, -2.4, 2.4);
  curl.xy += vec2(-curl.y, curl.x) * scrollWarp * 0.4;
  velocity += curl * u_noiseStrength * u_delta;

  if (u_orbit > 0.001 && radial > 0.2) {
    vec3 axis = normalize(rotateX(vec3(0.0, 1.0, 0.0), u_tilt));
    vec3 tangent = cross(axis, normalize(position + vec3(0.0001)));
    velocity += tangent * u_orbit * u_delta;
  }

  if (u_burst > 0.001) {
    vec3 away = length(position) > 0.0001 ? normalize(position) : vec3(0.0, 1.0, 0.0);
    velocity += away * u_burst * (0.4 + role) * u_delta * 16.0;
  }

  vec2 toParticle = position.xy - u_mouse;
  float dist = length(toParticle);
  float radius = max(u_pointerRadius, 0.8);
  float influence = pow(1.0 - smoothstep(0.0, radius, dist), 0.55);

  if (influence > 0.001) {
    vec2 dir = dist > 0.0001 ? normalize(toParticle) : vec2(1.0, 0.0);
    float polarity = mix(1.0, -1.0, u_attract);
    vec2 pointerForce = dir * influence * u_pointerForce * polarity;
    vec2 swirl = vec2(-dir.y, dir.x) * influence * u_pointerForce * 0.34 * (1.0 - u_attract);
    velocity.xy += (pointerForce + swirl) * u_delta;
  }

  float hold = mix(1.0, 0.08, influence) * (1.0 - u_burst * 0.85);

  if (u_accrete > 0.5) {
    vec3 posLocal = rotateX(position, -u_tilt);
    float rNow = length(posLocal.xz);
    float jetness = abs(posLocal.y) / max(rNow, 0.04);

    if (role > 0.88 || jetness > 2.2) {
      float signY = posLocal.y >= 0.0 ? 1.0 : -1.0;
      vec3 axis = rotateX(vec3(0.0, signY, 0.0), u_tilt);
      velocity += axis * 3.6 * u_delta * 60.0;
      vec3 off = position - axis * dot(position, axis);
      velocity -= off * 1.8 * u_delta;
      hold = 0.08;
    } else {
      float omegaNow = (u_kepler * 2.8) / pow(max(rNow, 0.16), 1.6);
      vec3 tangLocal = vec3(-posLocal.z, 0.0, posLocal.x);
      float tl = length(tangLocal);
      if (tl > 0.0001) {
        vec3 tangent = rotateX(tangLocal / tl, u_tilt) * omegaNow * rNow;
        velocity += (tangent - velocity) * min(1.0, 10.0 * u_delta);
      }

      vec3 inward = rotateX(vec3(-posLocal.x, posLocal.y * -0.08, -posLocal.z), u_tilt);
      float il = length(inward);
      if (il > 0.0001) {
        float fall = mix(2.4, 0.35, smoothstep(u_voidRadius * 1.6, u_voidRadius * 6.0, rNow));
        velocity += (inward / il) * fall * u_delta * 10.0;
      }
      hold = 0.28;
    }
  }

  vec3 toTarget = spun - position;
  velocity += toTarget * u_textStrength * hold * u_delta;

  float friction = pow(u_friction, u_delta * 60.0);
  velocity *= friction;

  float maxSpeed = u_accrete > 0.5 ? 16.0 : 6.4;
  float speed = length(velocity);
  if (speed > maxSpeed) velocity *= maxSpeed / speed;

  gl_FragColor = vec4(velocity, 1.0);
}
`
