## ELI5
A microwave oven's turntable exists because its waves set up hot and cold spots - proof that electromagnetic waves carry energy in a pattern. The wave itself is a transverse duet: electric and magnetic fields oscillating at right angles to each other and to travel, needing no medium, racing at one over root mu-zero epsilon-zero. Amplitudes obey E-zero equals c B-zero, energy density splits equally between the fields, and radiation pressure is the wave's fingerprints on a wall.

## DEFINITION
An electromagnetic wave is a self-propagating transverse wave consisting of mutually perpendicular, sinusoidally oscillating electric field vector **E** and magnetic field vector **B**, both perpendicular to the direction of propagation **k**. In vacuum, it travels at the universal constant speed \(c = 1/\sqrt{\mu_0\varepsilon_0} = 3.00 \times 10^8 \text{ m/s}\), with the field amplitudes related by \(E_0 = c B_0\). The wave carries energy, momentum, and angular momentum, and exerts radiation pressure on surfaces.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) sketch the orientation of **E**, **B**, and **k** for a plane wave and state the transverse nature, (2) calculate wavelength, frequency, wave number, angular frequency, and field amplitudes using \(c = f\lambda = \omega/k\) and \(E_0 = c B_0\), (3) compute average energy density, intensity, and radiation pressure for absorption/reflection, and (4) explain why EM waves do not require a material medium and how their speed changes in a dielectric.

## SCOPE_BOUNDARY
Covers: transverse nature, mathematical representation (sinusoidal plane wave), speed in vacuum and medium, E-B amplitude relation, energy density (electric = magnetic), intensity (Poynting vector magnitude), momentum transfer and radiation pressure (for normal incidence). Does NOT cover: waveguides, polarization by scattering/reflection (beyond Malus' law), dispersion in plasma, or antenna radiation patterns (these belong to higher physics or engineering).

## WALKTHROUGH
Observe a microwave oven: the rotating turntable ensures even heating because the microwaves form standing waves with hot and cold spots — this reveals that EM waves carry energy in a spatially varying pattern. Begin by recalling from Class 11 (c11_phy_cbse_14_001) that transverse waves have oscillations perpendicular to propagation. Use Maxwell’s equations (c12_phy_cbse_08_002) to deduce that a changing **E** produces **B** and vice versa, forcing **E**, **B**, **k** to be mutually perpendicular. Derive \(c = 1/\sqrt{\mu_0\varepsilon_0}\) from the wave equation. Introduce the sinusoidal form \(E_x = E_0 \sin(kz - \omega t)\), \(B_y = B_0 \sin(kz - \omega t)\). Show that energy density \(u_E = u_B\) leads to intensity \(I = \frac{1}{2}\varepsilon_0 c E_0^2\). Finally, connect momentum \(p = U/c\) to radiation pressure \(P = I/c\) (absorption) and \(2I/c\) (reflection) — a measurable force used in solar sails.

Takeaway first: E, B and the direction of travel form a mutually perpendicular right-handed trio, E-zero equals c B-zero, and the fields share the energy equally. Exam moves: orientation questions sketching the trio, wavelength-and-amplitude questions via c equals f lambda and E-zero equals c B-zero, intensity and pressure questions for absorbing and reflecting surfaces. Method: rerun the oven - standing waves' hot spots noticed, Maxwell's duet deduced, the speed computed from two constants. Check yourself: in a medium the speed shrinks by root mu-r epsilon-r and E-zero equals v B-zero - the c in the amplitude relation is the wave's actual speed, not a universal stamp. Drill: sketch one plane wave's trio and compute intensity from a stated E-zero.

## DIAGNOSTIC_QUESTION_1
State the mutual orientation of the electric field **E**, magnetic field **B**, and propagation vector **k** in a plane electromagnetic wave travelling in vacuum. Give the SI unit of the wave number \(k\).

## DIAGNOSTIC_ANSWER_1
**E**, **B**, and **k** are mutually perpendicular (orthogonal triad). The wave number \(k\) has SI unit rad/m (or m⁻¹). A wrong answer (e.g., **E** parallel to **k**) reveals confusion with longitudinal waves like sound; missing unit indicates lack of dimensional awareness.

## DIAGNOSTIC_QUESTION_2
A plane EM wave in vacuum has electric field amplitude \(E_0 = 120 \text{ N/C}\). Without calculating, explain why the magnetic field amplitude must be \(B_0 = 4.0 \times 10^{-7} \text{ T}\). What physical principle fixes this ratio?

## DIAGNOSTIC_ANSWER_2
From Maxwell’s equations, the wave speed \(c = E_0/B_0\). Since \(c = 3.00 \times 10^8 \text{ m/s}\), \(B_0 = E_0/c = 120 / (3 \times 10^8) = 4.0 \times 10^{-7} \text{ T}\). The principle is the intrinsic coupling of **E** and **B** in free space — they are not independent; the wave impedance of vacuum \(Z_0 = \sqrt{\mu_0/\varepsilon_0} = E_0/H_0\) fixes the ratio. A student who says “they are just proportional” misses the quantitative origin from \(\mu_0\) and \(\varepsilon_0\).

## DIAGNOSTIC_QUESTION_3
A radio station broadcasts at \(f = 98.3 \text{ MHz}\) with an average intensity \(I = 2.5 \times 10^{-6} \text{ W/m}^2\) at a certain distance. Calculate (a) the wavelength \(\lambda\), (b) the electric field amplitude \(E_0\), and (c) the radiation pressure on a perfectly absorbing surface at that location.

## DIAGNOSTIC_ANSWER_3
(a) \(\lambda = c/f = (3.00 \times 10^8) / (98.3 \times 10^6) = 3.05 \text{ m}\).  
(b) \(I = \frac{1}{2}\varepsilon_0 c E_0^2 \Rightarrow E_0 = \sqrt{2I/(\varepsilon_0 c)} = \sqrt{2 \times 2.5 \times 10^{-6} / (8.85 \times 10^{-12} \times 3.00 \times 10^8)} = 1.37 \text{ V/m}\).  
(c) \(P_{\text{abs}} = I/c = 2.5 \times 10^{-6} / (3.00 \times 10^8) = 8.33 \times 10^{-15} \text{ Pa}\).  
A wrong \(\lambda\) (e.g., using \(v = 3 \times 10^8\) but wrong exponent) shows unit mishandling; forgetting the 1/2 in intensity formula is a common error from confusing peak with RMS.

## DIAGNOSTIC_QUESTION_4
Compare the average electric energy density \(\langle u_E \rangle\) and average magnetic energy density \(\langle u_B \rangle\) in a plane EM wave in vacuum. If the wave enters a dielectric with \(\varepsilon_r = 4\), \(\mu_r = 1\), how do \(\langle u_E \rangle\) and \(\langle u_B \rangle\) change relative to each other? Justify.

## DIAGNOSTIC_ANSWER_4
In vacuum, \(\langle u_E \rangle = \langle u_B \rangle = \frac{1}{4}\varepsilon_0 E_0^2 = \frac{1}{4\mu_0}B_0^2\). In a dielectric, the wave speed \(v = c/\sqrt{\varepsilon_r\mu_r} = c/2\). The amplitude ratio becomes \(E_0/B_0 = v = c/2\). Since \(\langle u_E \rangle = \frac{1}{4}\varepsilon E_0^2\) and \(\langle u_B \rangle = \frac{1}{4\mu}B_0^2\), substituting \(B_0 = 2E_0/c\) and \(\varepsilon = 4\varepsilon_0\), \(\mu = \mu_0\) gives \(\langle u_E \rangle = \varepsilon_0 E_0^2\) and \(\langle u_B \rangle = \frac{1}{\mu_0}(E_0^2/c^2) = \varepsilon_0 E_0^2\). They remain equal! The equality \(\langle u_E \rangle = \langle u_B \rangle\) holds in any linear medium because it follows from Maxwell’s equations, not just vacuum constants. A student who claims they become unequal misunderstands the symmetry of Maxwell’s equations.

## DIAGNOSTIC_QUESTION_5
A student argues: “Since light carries momentum, a flashlight should recoil like a gun when turned on. Why don’t we observe this?” Evaluate this statement quantitatively. Estimate the recoil force of a 5 W flashlight and compare it to the weight of a mosquito (\(mg \approx 2 \times 10^{-5} \text{ N}\)).

## DIAGNOSTIC_ANSWER_5
(1) The principle — light does carry momentum, so a torch beam exerts a recoil force equal to its power divided by the speed of light, (2) The estimate — for a five-watt torch the force comes to about 1.7 times ten to the minus eight newton, (3) The comparison — that is nearly a thousand times smaller than the weight of a mosquito, which is why no recoil is ever felt, (4) The verdict — the student is right in principle but the effect is negligible at everyday power levels. A wrong evaluation says light has no mass so no momentum, confusing rest mass with relativistic momentum, or divides the power by the wrong speed.

## DIAGNOSTIC_QUESTION_6
Design a thought experiment using a torsion balance to measure radiation pressure of a laser beam. Specify the key measurable quantities, the expected deflection angle formula, and one major systematic error to control.

## DIAGNOSTIC_ANSWER_6
Suspend a lightweight mirror (area \(A\), mass \(m\)) on a torsion fiber (torsion constant \(\kappa\)). Reflect a laser of power \(P\) normally onto the mirror. Radiation pressure \(P_{\text{rad}} = 2P/(cA)\) exerts force \(F = 2P/c\). Torque \(\tau = F \cdot d\) (where \(d\) is lever arm) twists fiber by angle \(\theta = \tau/\kappa = (2Pd)/(\kappa c)\). Measure \(\theta\) with an optical lever. Major systematic error: heating of the mirror causes air currents/convection producing spurious torque. Control by using a pulsed laser with low duty cycle or performing in vacuum. A poor answer omits the factor of 2 for reflection or ignores thermal effects.

## COMMON_MISCONCEPTION
Students often think the electric and magnetic fields in an EM wave are “out of phase” (like in a driven RLC circuit) because they see **E** and **B** as cause and effect. In a plane wave in vacuum, **E** and **B** oscillate **in phase** — both reach maxima and zeros simultaneously. The misconception arises from confusing the *spatial* derivative relation (\(\partial E/\partial z = -\partial B/\partial t\)) with a temporal phase shift. In a lossy medium or waveguide, a phase difference can appear, but not in free-space plane waves. Another error: writing \(E_0 = B_0\) (ignoring \(c\)) because they forget \(c\) has units m/s and \(E/B\) has units of velocity.

## ON_FAILURE
1. Revisit c11_phy_cbse_14_001 (Transverse vs Longitudinal Waves) to reinforce perpendicular oscillations.  
2. Re-derive the plane wave solution from Maxwell’s equations in vacuum (c12_phy_cbse_08_002) step by step: start with \(\nabla \times \mathbf{E} = -\partial \mathbf{B}/\partial t\) and \(\nabla \times \mathbf{B} = \mu_0\varepsilon_0 \partial \mathbf{E}/\partial t\), assume \(\mathbf{E} = E_x(z,t)\hat{\mathbf{i}}\), \(\mathbf{B} = B_y(z,t)\hat{\mathbf{j}}\), obtain \(\partial E_x/\partial z = -\partial B_y/\partial t\) and \(-\partial B_y/\partial z = \mu_0\varepsilon_0 \partial E_x/\partial t\).  
3. Substitute sinusoidal trial functions to get \(k E_0 = \omega B_0\) and \(k B_0 = \mu_0\varepsilon_0 \omega E_0\) → \(\omega/k = c\) and \(E_0/B_0 = c\).  
4. Redo Diagnostic Q2 and Q3 with this derivation fresh in mind.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_08_001, c12_phy_cbse_08_002, c11_phy_cbse_14_001, c11_phy_cbse_14_002, c11_phy_cbse_14_005, c11_phy_cbse_03_007, c11_phy_cbse_03_008, c11_math_cbse_03_001, c11_math_cbse_03_002, c11_math_cbse_13_008, c11_math_cbse_13_010

## PREREQUISITE_REASONS
c12_phy_cbse_08_001: Displacement current is the source of **B** from changing **E**, essential for wave propagation.  
c12_phy_cbse_08_002: Maxwell’s equations in vacuum are the starting point for deriving wave properties.  
c11_phy_cbse_14_001: Transverse wave concept (oscillations ⊥ propagation) is the mechanical analogue.  
c11_phy_cbse_14_002: Wave speed formula \(v = f\lambda\) and \(v = \omega/k\) are used directly.  
c11_phy_cbse_14_005: Superposition principle underlies interference/diffraction of EM waves (later).  
c11_phy_cbse_03_007: Cross product \(\mathbf{E} \times \mathbf{B}\) gives Poynting vector direction (energy flow).  
c11_phy_cbse_03_008: Vector cross product needed for \(\mathbf{E} \times \mathbf{B}\) and \(\mathbf{k}\) direction.  
c11_math_cbse_03_001: Radian measure for angular frequency \(\omega\) and wave number \(k\).  
c11_math_cbse_03_002: Degree-radian conversion for phase arguments.  
c11_math_cbse_13_008: Derivative of sinusoidal functions used in Maxwell’s equations.  
c11_math_cbse_13_010: Derivatives of sin/cos for \(\partial/\partial t\) and \(\partial/\partial z\) in wave equation.

## FORWARD_NODE_IDS
c12_phy_cbse_08_005

## FORWARD_REASONS
c12_phy_cbse_08_005: Applications (radio, microwave, X-ray) rely on wave properties: penetration (wavelength vs size), energy (photon energy), momentum (radiation pressure).

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_008, c11_math_cbse_13_010, c11_phy_cbse_03_007, c11_phy_cbse_03_008
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_008: Derivative of polynomial/trigonometric functions is used to plug sinusoidal **E**, **B** into Maxwell’s curl equations.  
c11_math_cbse_13_010: Derivatives of \(\sin(\omega t)\) and \(\sin(kz)\) give the \(\omega\) and \(k\) factors in the wave equation.  
c11_phy_cbse_03_007: Scalar (dot) product appears in energy density \(u = \frac{1}{2}\varepsilon_0 E^2 + \frac{1}{2\mu_0}B^2\).  
c11_phy_cbse_03_008: Vector (cross) product \(\mathbf{E} \times \mathbf{B}\) gives the Poynting vector \(\mathbf{S} = \frac{1}{\mu_0}\mathbf{E} \times \mathbf{B}\) for intensity and momentum flux.

## CHAIN_DESCRIPTION
c12_phy_cbse_08_002 (Maxwell's equations) → c12_phy_cbse_08_004 (Properties of EM waves) → c12_phy_cbse_08_003 (Spectrum) and c12_phy_cbse_08_005 (Applications).

## THIS_FORMULA
1. Wave speed in vacuum: \(c = \frac{1}{\sqrt{\mu_0\varepsilon_0}} = 3.00 \times 10^8 \text{ m/s}\)  
2. Wave speed in medium: \(v = \frac{1}{\sqrt{\mu\varepsilon}} = \frac{c}{\sqrt{\mu_r\varepsilon_r}}\)  
3. Plane wave (z-direction): \(E_x = E_0 \sin(kz - \omega t)\), \(B_y = B_0 \sin(kz - \omega t)\)  
4. Amplitude relation: \(E_0 = c B_0\) (vacuum), \(E_0 = v B_0\) (medium)  
5. Wave number: \(k = \frac{2\pi}{\lambda}\), angular frequency: \(\omega = 2\pi f\)  
6. Dispersion relation: \(\omega = c k\) (vacuum)  
7. Energy densities: \(u_E = \frac{1}{2}\varepsilon_0 E^2\), \(u_B = \frac{1}{2\mu_0}B^2\) → average \(\langle u_E \rangle = \langle u_B \rangle = \frac{1}{4}\varepsilon_0 E_0^2\)  
8. Intensity (average Poynting magnitude): \(I = \langle S \rangle = \frac{1}{2}\varepsilon_0 c E_0^2 = \frac{1}{2}\frac{c}{\mu_0}B_0^2\)  
9. Momentum density: \(g = \frac{u}{c}\) (vacuum)  
10. Radiation pressure (normal incidence): \(P_{\text{abs}} = I/c\), \(P_{\text{refl}} = 2I/c\)

## FORMULA_VARIABLES
\(c\) = speed of light in vacuum (m/s), \(\mu_0\) = vacuum permeability (4π×10⁻⁷ H/m), \(\varepsilon_0\) = vacuum permittivity (8.85×10⁻¹² F/m), \(\mu_r, \varepsilon_r\) = relative permeability/permittivity (dimensionless), \(E_0, B_0\) = electric/magnetic field amplitudes (V/m, T), \(k\) = wave number (rad/m), \(\omega\) = angular frequency (rad/s), \(\lambda\) = wavelength (m), \(f\) = frequency (Hz), \(u_E, u_B\) = instantaneous energy densities (J/m³), \(I\) = intensity (W/m²), \(g\) = momentum density (kg·m/s·m³), \(P\) = radiation pressure (Pa).

## FORMULA_UNITS
m/s, H/m, F/m, V/m, T, rad/m, rad/s, m, Hz, J/m³, W/m², kg/(m·s²), Pa.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_008 | Derivative of \(\sin(kz - \omega t)\) w.r.t \(z\) gives \(k\cos(...)\), w.r.t \(t\) gives \(-\omega\cos(...)\); used to satisfy Maxwell’s curl equations.  
c11_math_cbse_13_010 | Derivative of \(\cos\) is \(-\sin\); second derivatives yield wave equation \(\partial^2 E/\partial z^2 = \mu_0\varepsilon_0 \partial^2 E/\partial t^2\).  
c11_phy_cbse_03_007 | Dot product \(\mathbf{E}\cdot\mathbf{E} = E^2\) gives scalar energy density from vector field.  
c11_phy_cbse_03_008 | Cross product \(\mathbf{E} \times \mathbf{B}\) gives direction of energy flow (Poynting vector) and confirms \(\mathbf{E} \perp \mathbf{B} \perp \mathbf{k}\).
## PREREQ_CONCEPT
Maxwell’s equations in vacuum (c12_phy_cbse_08_002) and transverse wave kinematics (c11_phy_cbse_14_001, c11_phy_cbse_14_002).

## PREREQ_BEFORE
Student must be able to write the four Maxwell equations in vacuum, explain displacement current, and compute speed, wavelength, frequency relations for sinusoidal waves.

## PREREQ_STUCK
If stuck on the wave derivation, review c12_phy_cbse_08_002 (Maxwell’s Equations) and c11_phy_cbse_14_002 (Wave Speed) simultaneously — the wave equation emerges from combining the two curl equations.

## WORKED_EXAMPLE_1
PROBLEM: A plane electromagnetic wave of frequency 50.0 MHz travels in vacuum along the +x direction. At a particular point and instant, the electric field is \(\mathbf{E} = 6.0 \hat{\mathbf{j}} \text{ V/m}\). (a) What is the magnetic field \(\mathbf{B}\) at that point? (b) Write the full vector expressions for \(\mathbf{E}(x,t)\) and \(\mathbf{B}(x,t)\) assuming sinusoidal variation with zero phase at origin. (c) Calculate the average intensity of the wave.

STEPS:
- Step 1: Identify given: \(f = 50.0 \times 10^6 \text{ Hz}\), \(\mathbf{E} = 6.0 \hat{\mathbf{j}} \text{ V/m}\) (amplitude \(E_0 = 6.0 \text{ V/m}\)), propagation direction \(+x\).
- Step 2: Use \(c = 3.00 \times 10^8 \text{ m/s}\). Direction: \(\mathbf{E} \times \mathbf{B}\) must point along \(+x\). \(\hat{\mathbf{j}} \times \hat{\mathbf{k}} = \hat{\mathbf{i}}\), so \(\mathbf{B}\) is along \(+z\) direction.
- Step 3: Compute \(B_0 = E_0 / c = 6.0 / (3.00 \times 10^8) = 2.0 \times 10^{-8} \text{ T}\). Thus \(\mathbf{B} = 2.0 \times 10^{-8} \hat{\mathbf{k}} \text{ T}\).
- Step 4: Find \(\omega = 2\pi f = 2\pi \times 50.0 \times 10^6 = 3.14 \times 10^8 \text{ rad/s}\). \(k = \omega/c = (3.14 \times 10^8)/(3.00 \times 10^8) = 1.05 \text{ rad/m}\).
- Step 5: Write \(\mathbf{E}(x,t) = 6.0 \sin(1.05 x - 3.14 \times 10^8 t) \hat{\mathbf{j}} \text{ V/m}\). \(\mathbf{B}(x,t) = 2.0 \times 10^{-8} \sin(1.05 x - 3.14 \times 10^8 t) \hat{\mathbf{k}} \text{ T}\).
- Step 6: Average intensity \(I = \frac{1}{2}\varepsilon_0 c E_0^2 = \frac{1}{2} \times 8.85 \times 10^{-12} \times 3.00 \times 10^8 \times (6.0)^2 = 4.78 \times 10^{-2} \text{ W/m}^2\).

REASONING: The cross product \(\mathbf{E} \times \mathbf{B}\) gives the Poynting vector direction (energy flow). In a plane wave, **E** and **B** are in phase and their amplitudes are fixed by \(c\). The intensity formula uses the time-average of \(\sin^2\) which is 1/2.

ANSWER: (a) \(\mathbf{B} = 2.0 \times 10^{-8} \hat{\mathbf{k}} \text{ T}\) (b) \(\mathbf{E} = 6.0 \sin(1.05 x - 3.14 \times 10^8 t) \hat{\mathbf{j}} \text{ V/m}\), \(\mathbf{B} = 2.0 \times 10^{-8} \sin(1.05 x - 3.14 \times 10^8 t) \hat{\mathbf{k}} \text{ T}\) (c) \(I = 4.78 \times 10^{-2} \text{ W/m}^2\)

## WORKED_EXAMPLE_2
PROBLEM: A laser beam of power 2.0 mW is incident normally on a perfectly reflecting mirror of area 1.0 mm². The beam is uniform over the mirror. (a) Find the radiation pressure on the mirror. (b) If the mirror has mass 10 mg and is suspended by a torsion fiber with torsion constant \(\kappa = 1.0 \times 10^{-9} \text{ N·m/rad}\), and the beam hits at a distance 5.0 cm from the fiber axis, calculate the equilibrium angular deflection.

STEPS:
- Step 1: Given: \(P = 2.0 \times 10^{-3} \text{ W}\), \(A = 1.0 \times 10^{-6} \text{ m}^2\), perfect reflection, \(m = 10 \times 10^{-6} \text{ kg}\), \(\kappa = 1.0 \times 10^{-9} \text{ N·m/rad}\), lever arm \(d = 0.050 \text{ m}\).
- Step 2: Intensity \(I = P/A = 2.0 \times 10^{-3} / 1.0 \times 10^{-6} = 2000 \text{ W/m}^2\).
- Step 3: Radiation pressure for perfect reflection: \(P_{\text{rad}} = 2I/c = 2 \times 2000 / (3.00 \times 10^8) = 1.33 \times 10^{-5} \text{ Pa}\).
- Step 4: Force on mirror: \(F = P_{\text{rad}} \times A = 1.33 \times 10^{-5} \times 1.0 \times 10^{-6} = 1.33 \times 10^{-11} \text{ N}\).
- Step 5: Torque about fiber: \(\tau = F \times d = 1.33 \times 10^{-11} \times 0.050 = 6.67 \times 10^{-13} \text{ N·m}\).
- Step 6: Angular deflection: \(\theta = \tau / \kappa = 6.67 \times 10^{-13} / 1.0 \times 10^{-9} = 6.67 \times 10^{-4} \text{ rad} = 0.038^\circ\).

REASONING: Radiation pressure transfers momentum. For reflection, momentum change is twice the incident momentum per photon, hence factor 2. The torsion balance converts this tiny force into a measurable angle. The calculation chains intensity → pressure → force → torque → angle.

ANSWER: (a) \(P_{\text{rad}} = 1.33 \times 10^{-5} \text{ Pa}\) (b) \(\theta = 6.67 \times 10^{-4} \text{ rad}\) (or \(0.038^\circ\))

## WORKED_EXAMPLE_3
PROBLEM: An electromagnetic wave propagates in a non-magnetic dielectric (\(\mu_r = 1\)) with relative permittivity \(\varepsilon_r = 9\). The electric field amplitude is \(E_0 = 300 \text{ V/m}\). (a) Find the wave speed \(v\) and wavelength \(\lambda\) if frequency \(f = 100 \text{ MHz}\). (b) Determine the magnetic field amplitude \(B_0\). (c) Calculate the average energy density \(\langle u \rangle\) and intensity \(I\). (d) What is the radiation pressure on a perfectly absorbing surface in this medium?

STEPS:
- Step 1: Wave speed in medium: \(v = c/\sqrt{\varepsilon_r\mu_r} = (3.00 \times 10^8)/\sqrt{9} = 1.00 \times 10^8 \text{ m/s}\).
- Step 2: Wavelength: \(\lambda = v/f = (1.00 \times 10^8) / (100 \times 10^6) = 1.00 \text{ m}\).
- Step 3: Amplitude relation in medium: \(E_0/B_0 = v \Rightarrow B_0 = E_0/v = 300 / (1.00 \times 10^8) = 3.00 \times 10^{-6} \text{ T}\).
- Step 4: Average energy density: \(\langle u \rangle = \frac{1}{2}\varepsilon E_0^2\) (since \(\langle u_E \rangle = \langle u_B \rangle\)). \(\varepsilon = \varepsilon_r\varepsilon_0 = 9 \times 8.85 \times 10^{-12} = 7.965 \times 10^{-11} \text{ F/m}\). \(\langle u \rangle = \frac{1}{2} \times 7.965 \times 10^{-11} \times (300)^2 = 3.58 \times 10^{-6} \text{ J/m}^3\).
- Step 5: Intensity: \(I = \langle u \rangle v = 3.58 \times 10^{-6} \times 1.00 \times 10^8 = 358 \text{ W/m}^2\). Alternatively \(I = \frac{1}{2}\varepsilon v E_0^2 = \frac{1}{2} \times 7.965 \times 10^{-11} \times 1.00 \times 10^8 \times 9 \times 10^4 = 358 \text{ W/m}^2\).
- Step 6: Radiation pressure on perfect absorber: \(P = I/v = 358 / (1.00 \times 10^8) = 3.58 \times 10^{-6} \text{ Pa}\). (Note: in medium, momentum density \(g = u/v\), so pressure = \(I/v\) for absorption.)

REASONING: In a dielectric, the wave slows down, wavelength shortens, but the in-phase relation \(E_0 = v B_0\) holds. Energy density uses the medium’s \(\varepsilon\) and \(\mu\). Intensity is energy density times group velocity (here phase velocity = group velocity for non-dispersive medium). Radiation pressure uses the medium’s wave speed because momentum flux is \(u/v\).

ANSWER: (a) \(v = 1.00 \times 10^8 \text{ m/s}\), \(\lambda = 1.00 \text{ m}\) (b) \(B_0 = 3.00 \times 10^{-6} \text{ T}\) (c) \(\langle u \rangle = 3.58 \times 10^{-6} \text{ J/m}^3\), \(I = 358 \text{ W/m}^2\) (d) \(P = 3.58 \times 10^{-6} \text{ Pa}\)

## COMPETENCY_QUESTION_1
QUESTION: A student sets up an experiment with a parallel-plate capacitor connected to a high-frequency AC source (frequency \(f\)). The plates are circular with radius \(R\) and separation \(d \ll R\). The student measures the magnetic field \(B(r)\) at a distance \(r < R\) from the axis between the plates. Explain how the displacement current concept predicts a non-zero \(B(r)\) even though no conduction current flows between the plates. Derive the expression for \(B(r)\) in terms of \(r\), \(f\), \(V_0\) (peak voltage), and plate geometry. What happens to \(B(r)\) if \(r > R\)?

COMPETENCY: Interpreting physical situations using formulas and deriving field expressions from Maxwell’s equations.

STEPS:
- Step 1: Recognize that between plates, conduction current \(i_c = 0\) but displacement current \(i_d = \varepsilon_0 d\Phi_E/dt\) exists.
- Step 2: Electric field between plates: \(E = V/d = (V_0/d) \sin(\omega t)\). Electric flux through a circular loop of radius \(r\): \(\Phi_E = E \times \pi r^2\).
- Step 3: Displacement current through that loop: \(i_d = \varepsilon_0 \frac{d}{dt}(\Phi_E) = \varepsilon_0 \pi r^2 \frac{V_0}{d} \omega \cos(\omega t)\).
- Step 4: Apply Ampere-Maxwell law: \(\oint \mathbf{B} \cdot d\mathbf{l} = \mu_0 i_d\). For circular symmetry, \(B \times 2\pi r = \mu_0 i_d\).
- Step 5: Solve: \(B(r) = \frac{\mu_0 \varepsilon_0 \omega V_0 r}{2d} \cos(\omega t) = \frac{\mu_0 \varepsilon_0 r}{2d} \frac{dV}{dt}\). Peak \(B_{\text{max}} = \frac{\mu_0 \varepsilon_0 \omega V_0 r}{2d}\).
- Step 6: For \(r > R\), the flux is limited to plate area \(\pi R^2\), so \(i_d = \varepsilon_0 \pi R^2 \frac{V_0}{d} \omega \cos(\omega t)\). Then \(B(r) = \frac{\mu_0 \varepsilon_0 \omega V_0 R^2}{2d r} \cos(\omega t)\) — falls as \(1/r\).

ANSWER: \(B(r) = \frac{\mu_0 \varepsilon_0 r}{2d} \frac{dV}{dt}\) for \(r \le R\); \(B(r) = \frac{\mu_0 \varepsilon_0 R^2}{2d r} \frac{dV}{dt}\) for \(r \ge R\). The displacement current provides the missing term in Ampere’s law, making \(B\) continuous at \(r = R\).

DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: A plane EM wave of intensity \(I_0\) is incident normally on a thin, perfectly absorbing sheet of mass \(m\) and area \(A\), floating in vacuum. The sheet is initially at rest. (a) Derive the acceleration \(a\) of the sheet. (b) If the wave is a short pulse of duration \(\Delta t\) and total energy \(U\), find the final velocity \(v_f\) of the sheet. (c) Now consider the same sheet but perfectly reflecting. How do (a) and (b) change? Discuss energy conservation: where does the kinetic energy of the sheet come from in the reflecting case?

COMPETENCY: Predicting outcomes from changing variables and applying conservation laws (momentum, energy) to EM wave-matter interaction.

STEPS:
- Step 1: (a) Absorbing sheet: radiation pressure \(P = I_0/c\). Force \(F = P A = I_0 A / c\). Acceleration \(a = F/m = I_0 A / (m c)\).
- Step 2: (b) Pulse: total momentum transferred \(\Delta p = U/c\) (since \(p = U/c\) for light). Final velocity \(v_f = \Delta p / m = U/(m c)\).
- Step 3: (c) Reflecting sheet: pressure \(P = 2I_0/c\). Force \(F = 2I_0 A / c\). Acceleration \(a = 2I_0 A / (m c)\) (twice).
- Step 4: Pulse reflection: momentum change per photon is \(2p\), so total \(\Delta p = 2U/c\). Final velocity \(v_f = 2U/(m c)\) (twice).
- Step 5: Energy conservation: In reflection, the sheet gains kinetic energy \(K = \frac{1}{2} m v_f^2 = \frac{2U^2}{m c^2}\). The reflected wave loses energy — its frequency is Doppler-shifted downward (redshifted). The energy lost by the wave equals the kinetic energy gained by the sheet plus the energy remaining in the reflected wave. The sheet acts as a moving mirror; the reflected photons have lower energy.

ANSWER: (a) \(a = I_0 A / (m c)\) (absorbing), \(a = 2I_0 A / (m c)\) (reflecting). (b) \(v_f = U/(m c)\) (absorbing), \(v_f = 2U/(m c)\) (reflecting). (c) In reflecting case, the reflected wave is redshifted; the energy difference provides the sheet’s kinetic energy.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: An ______ wave is a self-propagating transverse wave consisting of mutually perpendicular, sinusoidally oscillating electric field vector E and magnetic field vector B, both perpendicular to the direction of propagation k.

## DIAGNOSTIC_ANSWER_7
electromagnetic

The electromagnetic adjective names the wave's two oscillators: an electric field and a magnetic field, no medium required. **A wrong answer (a mechanical) reveals the student has demanded a material wave where the definition's whole point is medium-free travel.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: ______ a microwave oven: the rotating turntable ensures even heating because the microwaves form standing waves with hot and cold spots — this reveals that EM waves carry energy in a spatially varying pattern.

## DIAGNOSTIC_ANSWER_8
Observe

The observing verb opens the appliance: the oven's cold spots are the wave's interference pattern caught in leftovers. **A wrong answer (a reading verb) reveals the student has studied the manual while the walkthrough studies the turntable.**

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Observe a microwave oven: the rotating turntable ensures even heating because the ______ form standing waves with hot and cold spots — this reveals that EM waves carry energy in a spatially varying pattern.

## DIAGNOSTIC_ANSWER_9
microwaves

The microwaves are the standing waves' author: the oven's field pattern is what the hot and cold spots record. **A wrong answer (the turntable) reveals the student has blamed the rotation for a pattern the waves themselves paint.** The microwaves are the pattern's painter: hot and cold spots are where their standing wave piles and starves energy.
