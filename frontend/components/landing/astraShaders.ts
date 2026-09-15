/**
 * astraShaders.ts — raw GLSL for the GPGPU particle hero.
 *
 * Kept apart from the scene: these are template-literal strings consumed
 * by GPUComputationRenderer (position + velocity passes) and by the
 * THREE.Points ShaderMaterial (render pass).
 *
 * Coordinate contract:
 *  - position texture: xyz = world position, w = life (unused headroom)
 *  - velocity texture: xyz = velocity, w = text-attractor weight (0..1)
 *  - u_touch: xy = pointer in NDC, z = radius, w = mode (+1 repel, -1 attract)
 */

// ─────────────────────────────────────────────────────────────
// Simplex noise (Ashima, 3D) — shared chunk
// ─────────────────────────────────────────────────────────────
export const SIMPLEX_NOISE = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(
    dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.5 - vec4(
    dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1),
                                 dot(p2, x2), dot(p3, x3)));
}

// ── Curl of a 3D potential field built from three offset simplex reads.
// Divergence-free → fluid, organic turbulence.
vec3 curlNoise(vec3 p) {
  const float e = 0.12;
  vec3 dx = vec3(e, 0.0, 0.0);
  vec3 dy = vec3(0.0, e, 0.0);
  vec3 dz = vec3(0.0, 0.0, e);

  vec3 p_x0 = p - dx, p_x1 = p + dx;
  vec3 p_y0 = p - dy, p_y1 = p + dy;
  vec3 p_z0 = p - dz, p_z1 = p + dz;

  float x = snoise(p_y1) - snoise(p_y0) - snoise(p_z1) + snoise(p_z0);
  float y = snoise(p_z1) - snoise(p_z0) - snoise(p_x1) + snoise(p_x0);
  float z = snoise(p_x1) - snoise(p_x0) - snoise(p_y1) + snoise(p_y0);

  return normalize(vec3(x, y, z) / (2.0 * e) + 1e-6);
}
`;

// ─────────────────────────────────────────────────────────────
// VELOCITY pass — a living galaxy:
//   · differential rotation ω(r) = V/(rc+r) around the galactic core
//   · spiral-arm density bias (stars linger in the arms)
//   · curl-noise turbulence (two octaves) for molecular-cloud motion
//   · text attractor seek (the morph target)
//   · pointer repel/attract field + scroll wind + friction
// ─────────────────────────────────────────────────────────────
export const VELOCITY_SHADER = /* glsl */ `
uniform float u_dt;
uniform float u_time;
uniform vec2  u_mouse;      // NDC [-1, 1]
uniform float u_scroll;     // accumulated scroll delta
uniform vec4  u_touch;      // xy NDC, z radius, w mode (+1 repel / -1 attract)
uniform vec3  u_bounds;     // half-extents of the keep-in box
uniform float u_seek;       // 0..1 text-morph strength (eases over the cycle)
uniform sampler2D u_text_targets;

${SIMPLEX_NOISE}

// galactic core sits at the world origin; disc lies in the xz plane
const vec3 CORE = vec3(0.0);
const float RC = 9.0;      // rotation-curve core radius (world units)
const float V0 = 3.4;      // flat rotation velocity

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 posData = texture2D(texturePosition, uv);
  vec4 velData = texture2D(textureVelocity, uv);
  vec3 vel = velData.xyz;
  vec3 pos = posData.xyz;
  float textW = velData.w;

  // ── differential rotation about the galactic axis (y) ──
  vec3 rel = pos - CORE;
  float rad = length(rel.xz);
  float omega = V0 / (RC + rad);
  vec3 tangent = normalize(vec3(-rel.z, 0.0, rel.x) + 1e-5);
  vel += (tangent * omega - vel) * vec3(0.9, 0.15, 0.9) * u_dt;
  // mild vertical settling into the disc plane — galaxies are flat
  vel.y -= pos.y * 0.12 * u_dt;

  // ── molecular-cloud turbulence: two octaves of divergence-free curl ──
  vec3 turb = curlNoise(pos * 0.055 + vec3(0.0, u_time * 0.03, 0.0)) * 1.15;
  turb += curlNoise(pos * 0.21 - vec3(u_time * 0.045, 0.0, 0.0)) * 0.5;
  // arms shear the turbulence: motion along the arm reads as flow
  vel += turb * u_dt * 3.2;

  // ── text attractor: seek the morph target, weighted per-particle ──
  vec3 target = texture2D(u_text_targets, uv).xyz;
  vec3 toTarget = target - pos;
  vel += toTarget * (2.6 * textW * u_seek) * u_dt;

  // ── core gravity: slight inward pull beyond the bulge (keeps shape) ──
  vel += -normalize(rel + 1e-5) * 0.22 * u_dt * smoothstep(6.0, 30.0, rad);

  // ── pointer field inside the viewport plane ──
  vec2 d2 = pos.xz - u_mouse;
  float dist = length(d2);
  if (dist < u_touch.z && dist > 1e-4) {
    float fall = 1.0 - dist / u_touch.z;
    fall = fall * fall;                              // sharper centre
    vec2 dir = d2 / max(dist, 1e-4);
    vel.xz += dir * fall * u_touch.w * 26.0 * u_dt;
    // swirl: the well drags stars around it, not just away
    vel.xz += vec2(-dir.y, dir.x) * fall * u_touch.w * 9.0 * u_dt;
  }

  // ── scroll wind ──
  vel.y += u_scroll * 1.4 * u_dt;

  // friction — no infinite acceleration
  vel *= pow(0.82, u_dt * 60.0);

  // soft bounds
  vec3 lim = vec3(
    step(u_bounds.x, abs(pos.x)),
    step(u_bounds.y, abs(pos.y)),
    step(u_bounds.z, abs(pos.z)));
  vel -= lim * sign(pos) * vel * 2.0;

  gl_FragColor = vec4(vel, textW);
}
`;

// ─────────────────────────────────────────────────────────────
// POSITION pass — integrate velocity, clamp to bounds, age stars
// ─────────────────────────────────────────────────────────────
export const POSITION_SHADER = /* glsl */ `
uniform float u_dt;
uniform float u_time;
uniform vec3  u_bounds;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 posData = texture2D(texturePosition, uv);
  vec4 velData = texture2D(textureVelocity, uv);

  vec3 pos = posData.xyz + velData.xyz * u_dt;

  // stellar lifecycle: distant stars slowly respawn in the spiral arms
  // (only when far from the text morph — respawning would fight the seek)
  if (u_time > 0.0) {
    float seed = hash(posData.xyz);
    if (seed > 0.9975 && length(velData.xyz) < 1.2) {
      float arm = floor(hash(pos.xyz + 7.0) * 4.0) * 1.5707963;
      float rr = 14.0 + hash(pos.zxy) * 22.0;
      float ang = arm + rr * 0.31 + hash(pos.xyx) * 0.55;
      pos = vec3(cos(ang) * rr, (hash(pos + 3.1) - 0.5) * 2.2, sin(ang) * rr);
    }
  }

  pos = clamp(pos, -u_bounds, u_bounds);
  gl_FragColor = vec4(pos, posData.w);
}
`;

// ─────────────────────────────────────────────────────────────
// RENDER pass — glowing points, additive, no depth write
// ─────────────────────────────────────────────────────────────
export const RENDER_VERTEX = /* glsl */ `
uniform float u_size;
uniform float u_pixel_ratio;
uniform sampler2D textureVelocity;
attribute float a_seed;
varying float v_seed;
varying float v_speed;

void main() {
  v_seed = a_seed;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vec4 vel = texture2D(textureVelocity, uv);
  v_speed = length(vel.xyz);
  gl_PointSize = u_size * u_pixel_ratio *
    (1.0 + v_speed * 0.35) * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const RENDER_FRAGMENT = /* glsl */ `
uniform vec3 u_color_a;   // core colour (warm)
uniform vec3 u_color_b;   // fast colour (electric)
varying float v_seed;
varying float v_speed;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float glow = exp(-d * d * 14.0);          // smooth radial gradient
  float coreMask = smoothstep(0.16, 0.0, d); // tiny hot centre

  vec3 col = mix(u_color_a, u_color_b, clamp(v_speed * 0.4, 0.0, 1.0));
  col += vec3(1.0) * coreMask * 0.55;
  float alpha = glow * (0.34 + 0.4 * fract(v_seed * 7.31));

  gl_FragColor = vec4(col * (0.7 + v_speed * 0.3), alpha);
}
`;
