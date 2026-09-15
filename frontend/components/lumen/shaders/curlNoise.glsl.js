export const curlNoise = /* glsl */ `
vec3 curlNoise(vec3 p) {
  const float e = 0.1;
  vec3 dx = vec3(e, 0.0, 0.0);
  vec3 dy = vec3(0.0, e, 0.0);
  vec3 dz = vec3(0.0, 0.0, e);

  vec3 pX0 = snoiseVec3(p - dx);
  vec3 pX1 = snoiseVec3(p + dx);
  vec3 pY0 = snoiseVec3(p - dy);
  vec3 pY1 = snoiseVec3(p + dy);
  vec3 pZ0 = snoiseVec3(p - dz);
  vec3 pZ1 = snoiseVec3(p + dz);

  float x = pY1.z - pY0.z - pZ1.y + pZ0.y;
  float y = pZ1.x - pZ0.x - pX1.z + pX0.z;
  float z = pX1.y - pX0.y - pY1.x + pY0.x;

  return normalize(vec3(x, y, z) / (2.0 * e));
}
`
