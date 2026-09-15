/**
 * registryChunk_a.ts — Brief A registry chunk (Physics + Chemistry, 20 sims).
 *
 * AGENTS DO NOT EDIT app/3d-lab/page.tsx — this chunk is merged into the
 * /3d-lab registry by ZCode. importPath is relative to this file's folder.
 */

export interface Sim3DRegistryEntryA {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  why3d: string;
  importPath: string;
}

export const REGISTRY_A: Sim3DRegistryEntryA[] = [
  {
    id: 'vsepr-molecular-shapes',
    title: 'VSEPR Molecular Shapes — AXₙEₘ builder',
    subject: 'Chemistry',
    chapter: 'Class 11 · Chemical Bonding',
    why3d: 'Bond angles, lone-pair lobes and pyramidal vs planar shapes are spatial — orbit the molecule and watch lone pairs crush 109.5° down to 104.5°.',
    importPath: './C11_ChemistryVSEPRShapesSim',
  },
  {
    id: 'hybridization-orbitals',
    title: 'Hybridisation — sp · sp² · sp³ lobes & σ overlap',
    subject: 'Chemistry',
    chapter: 'Class 11 · Chemical Bonding',
    why3d: 'Hybridisation is a claim about directions: see the four sp³ lobes at true 109.47°, the leftover π-ready p orbitals, and slide an H 1s sphere into a live overlap integral.',
    importPath: './C11_ChemistryHybridizationOrbitalsSim',
  },
  {
    id: 'pn-junction-diode',
    title: 'p–n Junction Diode — depletion region vs bias',
    subject: 'Physics',
    chapter: 'Class 12 · Semiconductor Electronics',
    why3d: 'The depletion slab is a 3D object that breathes with √(Vbi+VR); watch it widen under reverse bias and carriers pour across only in forward.',
    importPath: './C12_PhysicsPNJunctionDiodeSim',
  },
  {
    id: 'electric-dipole-field',
    title: 'Electric Dipole — field lines & torque',
    subject: 'Physics',
    chapter: 'Class 12 · Electric Charges & Fields',
    why3d: 'Dipole field lines are 3D loops (r = C·sin²θ), not flat arrows — and the torque dynamics Iφ̈ = −pE·sinφ only make sense when you can watch the dipole swing.',
    importPath: './C12_PhysicsElectricDipoleSim',
  },
  {
    id: 'current-loop-magnetic-field',
    title: 'Current Loop & Solenoid — Biot–Savart B on axis',
    subject: 'Physics',
    chapter: 'Class 12 · Moving Charges & Magnetism',
    why3d: 'The right-hand rule is a 3D gesture: orbit the loop while every axial arrow keeps its length ∝ the true B(x) = μ₀IR²/2(R²+x²)^{3/2}.',
    importPath: './C12_PhysicsCurrentLoopFieldSim',
  },
  {
    id: 'em-wave-propagation',
    title: 'EM Wave — E⊥B⊥k travelling wave',
    subject: 'Physics',
    chapter: 'Class 12 · Electromagnetic Waves',
    why3d: 'Transversality is a 3D fact: red E and blue B arrows lock perpendicular to the travel axis and to each other, verified from any orbit angle.',
    importPath: './C12_PhysicsEMWavePropagationSim',
  },
  {
    id: 'shm-circular-projection',
    title: 'SHM as Circular Projection — phasor lab',
    subject: 'Physics',
    chapter: 'Class 11 · Oscillations',
    why3d: 'The circle-to-sine projection is the proof that a = −ω²x: watch the bob orbit while its shadow traces the sine live, with v, a and energy readouts.',
    importPath: './C11_PhysicsSHMCircularProjectionSim',
  },
  {
    id: 'transverse-longitudinal-waves',
    title: 'Transverse vs Longitudinal Waves — polarisation',
    subject: 'Physics',
    chapter: 'Class 11 · Waves',
    why3d: 'Particle direction vs propagation and the transverse-only polarisation plane are 3D facts: rotate the displacement through ŷ, ẑ and 45° and watch longitudinal compressions glow.',
    importPath: './C11_PhysicsWaveTypesSim',
  },
  {
    id: 'gyroscope-precession',
    title: 'Gyroscope — precession & angular momentum',
    subject: 'Physics',
    chapter: 'Class 11 · Rotational Motion',
    why3d: 'Precession is motion about two axes at once — spin the wheel up and the L vector sweeps a cone (Ω = Mgr/Iω); switch it off and the axle drops as a live-integrated pendulum.',
    importPath: './C11_PhysicsGyroscopePrecessionSim',
  },
  {
    id: 'young-double-slit',
    title: "Young's Double Slit — path difference & fringes",
    subject: 'Physics',
    chapter: 'Class 12 · Wave Optics',
    why3d: 'Interference is 3D geometry: march the wavefront arcs from both slits to the probe and watch Δ/λ decide bright vs dark on a true-scale screen.',
    importPath: './C12_PhysicsYoungDoubleSlitSim',
  },
  {
    id: 'prism-refraction',
    title: 'Prism Refraction — Snell trace & i–D curve',
    subject: 'Physics',
    chapter: 'Class 12 · Ray Optics',
    why3d: 'Watch a real vector-Snell ray bend twice through the prism, ride the i–D curve to its minimum (n = sin((A+Dm)/2)/sin(A/2)) and catch total internal reflection red-handed.',
    importPath: './C12_PhysicsPrismRefractionSim',
  },
  {
    id: 'bohr-atom',
    title: 'Bohr Atom — quantized orbits & photon jumps',
    subject: 'Physics',
    chapter: 'Class 12 · Atoms',
    why3d: 'Orbits spaced by the true n² law with energies −13.6/n² eV on a live ladder; fire transitions and the photon pops out coloured by its computed λ.',
    importPath: './C12_PhysicsBohrAtomSim',
  },
  {
    id: 'rutherford-scattering',
    title: 'Rutherford Scattering — α paths vs impact parameter',
    subject: 'Physics',
    chapter: 'Class 12 · Atoms',
    why3d: 'The fan of hyperbolic α-paths integrated live from F ∝ 1/r² makes "mostly empty atom" visible: only tiny-b trajectories feel the tiny massive nucleus.',
    importPath: './C12_PhysicsRutherfordScatteringSim',
  },
  {
    id: 'straight-line-motion',
    title: 'Straight-Line Motion — v = u+at ribbons race',
    subject: 'Physics',
    chapter: 'Class 11 · Motion in a Straight Line',
    why3d: 'Two cars integrate a = const live while their x–t and v–t graphs weave as 3D ribbons — the equations, the graphs and the motion are one object.',
    importPath: './C11_PhysicsStraightLineMotionSim',
  },
  {
    id: 'centre-of-mass-composite',
    title: 'Centre of Mass — composite bodies & balance test',
    subject: 'Physics',
    chapter: 'Class 11 · System of Particles',
    why3d: 'The COM is a 3D point that may float in empty space — slide masses, watch the flag track Σmᵢrᵢ/Σmᵢ exactly, then drop the body on a pivot: it holds level only at the true COM.',
    importPath: './C11_PhysicsCentreOfMassSim',
  },
  {
    id: 'close-packing-voids',
    title: 'Close Packing Voids — tetrahedral & octahedral holes',
    subject: 'Chemistry',
    chapter: 'Class 12 · Solid State',
    why3d: 'Voids live between layers: explode the ABC stack and the holes appear at true positions, with the r⁺/r⁻ slider classifying cations against the derived 0.225/0.414 limits.',
    importPath: './C12_ChemistryClosePackingVoidsSim',
  },
  {
    id: 'metallic-crystals-ccp-hcp',
    title: 'Metallic Crystals — CCP vs HCP layer stacking',
    subject: 'Chemistry',
    chapter: 'Class 12 · Solid State',
    why3d: 'The entire FCC/HCP difference is where layer 3 lands — watch both stacks build with ghost markers, then explode them to compare 74.05% packing and c/a = 1.633.',
    importPath: './C12_ChemistryMetallicCrystalsSim',
  },
  {
    id: 'band-gap-conductors-insulators',
    title: 'Band Gap — conductors, semiconductors, insulators',
    subject: 'Physics',
    chapter: 'Class 12 · Semiconductor Electronics',
    why3d: 'Bands are 3D ladders of states: heat the crystal and exactly e^(−Eg/2kT) of the drawn electrons promote, leaving holes — the count on screen is the live Boltzmann factor.',
    importPath: './C12_PhysicsBandGapSim',
  },
  {
    id: 'satellite-orbits-escape',
    title: 'Satellite Orbits & Escape — LEO to GEO, √2 rule',
    subject: 'Physics',
    chapter: 'Class 11 · Gravitation',
    why3d: 'Orbit radii are drawn to scale with Earth at 6371 km: slide LEO→GEO and watch v ∝ 1/√r and T ∝ r^{3/2}, then launch at k·v_circ and the live-integrated probe escapes at k = √2.',
    importPath: './C11_PhysicsSatelliteOrbitsSim',
  },
  {
    id: 'huygens-wavefronts',
    title: "Huygens' Wavefronts — reflection & refraction built",
    subject: 'Physics',
    chapter: 'Class 12 · Wave Optics',
    why3d: 'Secondary wavelets are 3D spheres: the new wavefront is their common tangent. March them live and both the law of reflection and Snell (with TIR) fall out as geometry.',
    importPath: './C12_PhysicsHuygensWavefrontsSim',
  },
];
