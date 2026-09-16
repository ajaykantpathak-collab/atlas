# 3D CONCEPTS WAVE — TOPIC INVENTORY & AGENT BRIEFS

Owner decision (2026-09-13): ZCode builds 3D sims manually AND 2 subagents
build 20 each. Slots free when the 2 MCQ agents finish → launch BRIEF A and
BRIEF B below immediately then. Pattern reference: the 3 finished sims in
components/simulations/three/ (Crystal Lattices, Kepler, 3D Geometry) and
Sim3DStage.tsx. Route: app/3d-lab/page.tsx (ZCode integrates registries —
AGENTS DO NOT EDIT page.tsx; export a chunk file instead).

QUALITY BAR (from the 3 finished sims — binding):
- Real numerics integrated live (no canned animation). Derive by hand once.
- Atlas dark/gold, HUD readouts with units, misconception killer,
  "What to try" ×2, 3-question check, Reset. ~300-450 lines each.
- Deterministic: no Math.random() at render time (hydration crashes).
- Each sim: node-id comments mapping to CBSE chapter.
- Gate: npx tsc --noEmit — only the 2 known KnowledgeGraph3DReal errors.

## BRIEF A — PHYSICS + CHEMISTRY (20, priority order)
Done by ZCode (do not rebuild): Kepler orbits; crystal lattices; 3D geometry.
1.  VSEPR molecular shapes (C11 bonding): linear→octahedral geometries with
    bond angles 180/120/109.5/90; lone-pair distortion NH3 107°, H2O 104.5°;
    build molecules by VSEPR formula AXnEm.
2.  Hybridization orbitals (C11): sp linear, sp² trigonal, sp³ tetrahedral —
    orbital lobes in true 3D orientation + sigma overlap demo.
3.  p-n Junction diode (C12 semi): depletion region, barrier field, forward/
    reverse bias animation in 3D.
4.  Electric dipole field (C12 charges): 3D field lines of ± pair, torque
    in uniform field.
5.  Magnetic field of a current loop (C12 moving charges): B along axis,
    right-hand rule in 3D, solenoid extension.
6.  EM wave propagation (C12 EM waves): E⊥B⊥k travelling wave, oscilloscope
    planes.
7.  SHM as circular projection (C11 oscillations): circle → sine, phasor.
8.  Transverse vs longitudinal waves (C11 waves): 3D spring, polarization
    (transverse only).
9.  Gyroscope / angular momentum (C11 rotation): precession, L vector.
10. Young's double slit in 3D (C12 wave optics): path difference geometry,
    fringe field on a screen plane.
11. Refraction through prism (C12 ray optics): 3D prism, i-d curve live.
12. Bohr atom (C12 atoms): quantized orbit radii/energies to scale, photon
    jump animation. E_n = -13.6/n².
13. Rutherford scattering (C12 atoms): alpha trajectories past nucleus,
    impact parameter ↔ deflection.
14. Motion in a straight line 3D race track (C11 kinematics) — v-t/x-t
    visualized as ribbons in space.
15. Centre of mass of composite bodies (C11 system of particles): build from
    primitives, COM flag floats to the true point.
16. Close packing voids (C12 solid state): tetrahedral/octahedral holes in
    CCP — counts per atom (2n, n).
17. Metallic crystal structures (C12): CCP/HCP stacking ABC vs AB layers.
18. Conductors/insulators band gap (C12 semi): 3D band ladders + Fermi level.
19. Satellite orbits & escape (C11 gravitation): LEO/GEO to scale, escape
    trajectory swing.
20. Wavefront & Huygens construction (C12 optics): wavelets building a new
    wavefront in 3D.

## BRIEF B — MATHS + BIOLOGY (20, priority order)
1.  Vectors: dot & cross product (C11): a×b as true perpendicular vector,
    |a×b| = area parallelogram live, right-hand rule.
2.  Conic sections from a cone (C11 conics): slice a 3D cone → circle/
    ellipse/parabola/hyperbola. THE classic.
3.  Solids of revolution (C12 integrals): y=f(x) spun about the axis —
    disc/washer method, V = π∫y² dx live.
4.  Lines & planes in space (C12 3D geometry): skew/parallel/intersecting
    lines; point-to-plane distance foot.
5.  Plane through 3 points (C12): normal vector, equation ax+by+cz=d live.
6.  Maxima/minima on surfaces (C12 AOD): z=f(x,y) surface + tangent plane.
7.  Definite integral as signed volume/area (C12): Riemann boxes morphing
    to smooth region.
8.  Matrix linear transforms (C12 matrices): rotate/shear/scale a cube;
    determinant as volume scale.
9.  Direction cosines lab (C11 3D): unit sphere, l,m,n legs, Euler angles.
10. Scalar triple product (C12 vectors): parallelepiped volume, coplanarity.
11. Probability dice/sample-space tower (C11 prob): outcome stacks in 3D.
12. DNA double helix (C12 molecular basis): base pairs, major/minor groove,
    antiparallel strands. 2 nm × 3.4 nm × 10 bp/turn proportions.
13. Protein structure levels (C12 biomolecules): primary→quaternary ribbons.
14. Lipid bilayer membrane (C11 cell): phospholipid sea, embedded proteins,
    fluidity temperature slider.
15. Cell ultrastructure fly-through (C11 cell): nucleus/mito/ER/Golgi as
    labeled solids.
16. Mitosis spindle 3D (C11 cell cycle): chromosome capture by spindle.
17. Neuron & synapse (C11 neural control): signal travel, vesicle release.
18. Nephron filtration 3D (C11 excretion): glomerulus→loop→collecting duct
    flow with selective reabsorption highlights.
19. Human heart chambers flow (C11 body fluids): deoxy/oxy paths colored.
20. Transpiration xylem pull (C11 plant): water column cohesion-tension.

## QUEUE RULES
- Launch A then B the instant agent slots free (one each).
- Each agent: build in priority order, minimum 12, target 20 sims.
- Each agent writes registry chunk components/simulations/three/
  registryChunk_{a|b}.ts exporting Sim3DEntry[] (id/title/subject/chapter/
  why3d/icon-name/Component dynamic import). ZCode merges into /3d-lab.
- After both land: ZCode merges registries, full typecheck, visual pass,
  re-run gauntlet for MCQ verification in the same pass.
