## ELI5
Fire electrons at a nickel crystal and the scattering pattern snaps into diffraction peaks - Davisson and Germer's proof that electrons carry wavelengths. Bragg's law reads the wavelength off the crystal's plane spacing and the peak angle; de Broglie's formula predicts it from the accelerating voltage. The two agree, and wave-particle duality stops being a proposal: h over root two m e V measured in reflected electrons.

## DEFINITION
The Davisson-Germer experiment (1927) demonstrated the wave nature of electrons by observing diffraction patterns when a beam of electrons is scattered off a single crystal of nickel. The experiment confirmed the de Broglie hypothesis by showing that the wavelength of electrons calculated from the diffraction maxima using Bragg's law (\(n\lambda = 2d \sin\theta\)) matches the de Broglie wavelength \(\lambda = h/p = h/\sqrt{2meV}\). The key measured quantities are the accelerating voltage \(V\) (volts), the crystal plane spacing \(d\) (metres), and the scattering angle \(\theta\) (radians or degrees).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to: (1) describe the experimental setup and the role of each component (electron gun, nickel crystal, detector), (2) apply Bragg's law to relate the observed diffraction angle to the electron wavelength, (3) calculate the de Broglie wavelength from the accelerating voltage and verify the agreement with the Bragg wavelength, and (4) explain why the experiment is a direct confirmation of matter-wave duality.

## SCOPE_BOUNDARY
This node covers the Davisson-Germer experiment in detail: apparatus, principle (Bragg diffraction from crystal planes), the relationship between accelerating voltage and electron wavelength, and the quantitative verification of de Broglie's hypothesis. It does NOT cover G.P. Thomson's parallel electron diffraction experiment, the theoretical derivation of Bragg's law from scratch, or relativistic corrections to electron wavelength (which are beyond Class 12 scope). It also does not cover the Heisenberg uncertainty principle (next node).

## WALKTHROUGH
Imagine you shine a laser through a fine mesh and see a diffraction pattern on a wall — that's light behaving as a wave. Now, replace the laser with an electron gun (like in an old TV tube) and the mesh with a polished nickel crystal. In 1927, Davisson and Germer did exactly this: they fired electrons at a nickel target and measured the intensity of scattered electrons at different angles. They found sharp peaks — just like X-ray diffraction — proving electrons have a wavelength. Start by recalling the de Broglie relation \(\lambda = h/p\) from the previous node. Then, visualize the crystal as a stack of parallel planes separated by distance \(d\). When electrons scatter off these planes, constructive interference occurs at angles satisfying Bragg's law: \(n\lambda = 2d \sin\theta\). The experiment varies the accelerating voltage \(V\) (which changes electron momentum \(p\) and hence \(\lambda\)) and measures the angle \(\theta\) of maximum intensity. The match between \(\lambda_{\text{de Broglie}} = h/\sqrt{2meV}\) and \(\lambda_{\text{Bragg}} = 2d \sin\theta / n\) is the quantitative proof.

Takeaway first: the Davisson-Germer experiment is de Broglie's hypothesis audited - Bragg's law measuring the wavelength, the accelerating voltage predicting it, the numbers meeting. Exam moves: setup questions naming gun, crystal and detector, Bragg-law questions on the peak angle, wavelength-matching questions between the two formulas, and significance questions on duality's proof. Method: rerun the nickel target - voltage varied, peaks tracked, the two wavelengths compared at every setting. Check yourself: the scattering angle is twice the Bragg angle for planes parallel to the surface - the geometry's factor of two is where the computation usually trips. Drill: compute the de Broglie wavelength at one voltage and show it matches Bragg's reading.

## DIAGNOSTIC_QUESTION_1
What is the physical quantity that the Davisson-Germer experiment directly measures to confirm the wave nature of electrons? State the SI unit of this quantity.

## DIAGNOSTIC_ANSWER_1
The experiment directly measures the **scattering angle \(\theta\)** (in radians or degrees) at which the intensity of scattered electrons is maximum. The SI unit of angle is radian (rad), though degrees are commonly used. A wrong answer (e.g., "it measures wavelength directly") reveals the misconception that wavelength is a direct measurement rather than an inference from the diffraction angle via Bragg's law.

## DIAGNOSTIC_QUESTION_2
In the Davisson-Germer experiment, the nickel crystal acts as a three-dimensional diffraction grating. Explain why the condition for constructive interference is given by Bragg's law \(n\lambda = 2d \sin\theta\) and not by the double-slit formula \(d \sin\theta = n\lambda\). What does the factor of 2 represent physically?

## DIAGNOSTIC_ANSWER_2
Bragg's law arises from reflection off successive crystal planes. The path difference between waves reflected from adjacent planes is \(2d \sin\theta\) (factor 2 because the wave travels down to the lower plane and back up). The double-slit formula \(d \sin\theta = n\lambda\) assumes transmission through two slits with path difference \(d \sin\theta\). A wrong answer (e.g., "the factor 2 is because there are two slits") shows confusion between reflection from parallel planes and transmission through two apertures.

## DIAGNOSTIC_QUESTION_3
An electron is accelerated through a potential difference of 54 V in a Davisson-Germer type experiment. The nickel crystal has an interplanar spacing \(d = 0.91 \, \text{Å}\). Calculate the de Broglie wavelength of the electron and the angle \(\theta\) for the first-order (\(n=1\)) diffraction maximum. Use \(h = 6.63 \times 10^{-34} \, \text{J·s}\), \(m_e = 9.11 \times 10^{-31} \, \text{kg}\), \(e = 1.60 \times 10^{-19} \, \text{C}\).

## DIAGNOSTIC_ANSWER_3
**Step 1:** de Broglie wavelength \(\lambda = h/\sqrt{2meV}\).  
\(2meV = 2 \times 9.11\times10^{-31} \times 1.60\times10^{-19} \times 54 = 1.573 \times 10^{-47} \, \text{kg·J}\).  
\(\sqrt{2meV} = \sqrt{1.573 \times 10^{-47}} = 3.966 \times 10^{-24} \, \text{kg·m/s}\).  
\(\lambda = 6.63\times10^{-34} / 3.966\times10^{-24} = 1.67 \times 10^{-10} \, \text{m} = 1.67 \, \text{Å}\).  
**Step 2:** Bragg's law for \(n=1\): \(\lambda = 2d \sin\theta\).  
\(d = 0.91 \, \text{Å} = 0.91 \times 10^{-10} \, \text{m}\).  
\(\sin\theta = \lambda/(2d) = 1.67 / (2 \times 0.91) = 0.9176\).  
\(\theta = \sin^{-1}(0.9176) \approx 66.5^\circ\).  
A wrong answer (e.g., using \(d \sin\theta = n\lambda\) or forgetting to convert Å to m) reveals unit inconsistency or formula confusion.

## DIAGNOSTIC_QUESTION_4
The Davisson-Germer experiment originally used a polycrystalline nickel target, but after an accidental heating (which created a single large crystal), they observed sharp diffraction peaks. Analyze why a polycrystalline target would not show sharp peaks, and how the single crystal produces well-defined maxima. Relate this to the concept of coherent scattering.

## DIAGNOSTIC_ANSWER_4
A polycrystalline target consists of many randomly oriented microcrystals. Each microcrystal diffracts at its own set of angles, smearing the pattern into a broad ring (like a powder X-ray pattern). A single crystal has all planes parallel, so scattered waves from all planes add coherently at the Bragg angle, giving sharp peaks. A wrong answer (e.g., "polycrystalline has no planes") shows misunderstanding of polycrystalline structure and coherence.

## DIAGNOSTIC_QUESTION_5
A student claims: "The Davisson-Germer experiment proves that electrons are waves because the diffraction pattern looks exactly like X-ray diffraction." Evaluate this claim. Is the reasoning sufficient? What additional quantitative check is necessary to confirm de Broglie's hypothesis specifically?

## DIAGNOSTIC_ANSWER_5
The claim is partially correct but incomplete. A diffraction pattern alone only shows wave-like behaviour; it does not prove the wavelength is given by \(\lambda = h/p\). The crucial quantitative check is that the measured wavelength (from Bragg's law using the known \(d\) and \(\theta\)) matches the de Broglie wavelength calculated from the accelerating voltage \(V\). Without this numerical agreement, the pattern could be explained by some other wavelength. A wrong evaluation (e.g., "the pattern is enough") misses the quantitative verification that is the heart of the experiment.

## DIAGNOSTIC_QUESTION_6
Design a thought experiment: If you could vary the accelerating voltage continuously in a Davisson-Germer setup and plot the intensity of scattered electrons at a fixed angle \(\theta = 50^\circ\) versus voltage \(V\), what would the graph look like? Explain the physical origin of the peaks and their spacing. (Assume \(d = 0.91 \, \text{Å}\), \(n=1\).)

## DIAGNOSTIC_ANSWER_6
The graph would show sharp peaks at voltages satisfying \(h/\sqrt{2meV} = 2d \sin\theta\). As \(V\) increases, \(\lambda\) decreases, so the Bragg condition is met at discrete voltages. Peaks occur when \(\sqrt{V} \propto 1/\lambda \propto n\), so \(V \propto 1/n^2\). The peaks get closer at higher \(V\). A poor answer (e.g., "a straight line") reveals failure to connect the voltage-wavelength relationship to the Bragg condition.

## COMMON_MISCONCEPTION
Students often think the angle \(\theta\) in Bragg's law is the angle between the incident beam and the crystal surface (glancing angle), but in the Davisson-Germer geometry, \(\theta\) is the angle between the incident beam and the crystal planes (which is the complement of the glancing angle if the planes are parallel to the surface). They also confuse the scattering angle \(\phi\) (angle between incident and scattered beam) with the Bragg angle \(\theta\): for specular reflection from planes parallel to the surface, \(\phi = 2\theta\). This leads to a factor-of-2 error in calculating \(\lambda\). Another error is using the double-slit formula \(d\sin\theta = n\lambda\) instead of Bragg's law \(2d\sin\theta = n\lambda\), missing the factor of 2 from the round-trip path difference between adjacent planes.

## ON_FAILURE
1. Revisit the de Broglie hypothesis node (c12_phy_cbse_11_004) to solidify \(\lambda = h/p\) and its derivation from \(p = \sqrt{2meV}\).  
2. Review Class 11 wave optics: interference from multiple slits (c11_phy_cbse_14_005) and the concept of path difference.  
3. Draw the crystal planes, incident beam, and reflected beam; label the glancing angle \(\alpha\) and Bragg angle \(\theta = 90^\circ - \alpha\). Practice converting between them.  
4. Re-solve Diagnostic Question 3 step-by-step, explicitly writing the path difference as \(2d\sin\theta\).  
5. Take a re-diagnostic: solve a similar problem with \(V = 120 \, \text{V}\), \(d = 2.15 \, \text{Å}\), find \(\theta\) for \(n=2\).

## PREREQUISITE_NODE_IDS
c12_phy_cbse_11_004, c11_phy_cbse_14_005, c11_phy_cbse_14_006
## PREREQUISITE_REASONS
c12_phy_cbse_11_004: Provides the de Broglie wavelength formula \(\lambda = h/p\) and the concept of matter waves, which is the theoretical basis the experiment tests.  
c11_phy_cbse_14_005: Principle of superposition of waves is essential to understand constructive interference in diffraction.  
c11_phy_cbse_14_006: Interference of waves (constructive/destructive) explains why sharp peaks appear only when path difference is an integer multiple of wavelength.

## FORWARD_NODE_IDS
c12_phy_cbse_11_006
## FORWARD_REASONS
c12_phy_cbse_11_006: Heisenberg's Uncertainty Principle builds on the wave-particle duality established by Davisson-Germer; the wave nature implies a fundamental limit on simultaneous precision of position and momentum.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_03_001, c11_math_cbse_08_001
## CROSS_SUBJECT_REASONS
c11_math_cbse_03_001: Angles in degrees and radians are used in Bragg's law; students must convert and compute \(\sin\theta\) correctly.  
c11_math_cbse_08_001: Trigonometric ratios (sine) are directly used in Bragg's law \(n\lambda = 2d \sin\theta\); understanding the sine function's range is crucial for checking physical validity.

## CHAIN_DESCRIPTION
c12_phy_cbse_11_004 -> c12_phy_cbse_11_005 -> c12_phy_cbse_11_006

## THIS_FORMULA
de Broglie wavelength: \(\lambda = \frac{h}{p} = \frac{h}{\sqrt{2 m_e e V}}\) (metres). Bragg's law for crystal diffraction: \(n\lambda = 2d \sin\theta\) (metres). Relation between scattering angle \(\phi\) and Bragg angle \(\theta\) for planes parallel to surface: \(\phi = 2\theta\).

## FORMULA_VARIABLES
\(\lambda\) = de Broglie wavelength (m), \(h\) = Planck's constant = \(6.63 \times 10^{-34}\) J·s, \(p\) = electron momentum (kg·m/s), \(m_e\) = electron mass = \(9.11 \times 10^{-31}\) kg, \(e\) = elementary charge = \(1.60 \times 10^{-19}\) C, \(V\) = accelerating voltage (V), \(d\) = interplanar spacing of crystal (m), \(\theta\) = Bragg angle (angle between incident beam and crystal planes) (rad or °), \(n\) = diffraction order (integer), \(\phi\) = scattering angle (angle between incident and detected beam) (rad or °).

## FORMULA_UNITS
m, J·s, kg·m/s, kg, C, V, m, rad/°, dimensionless, rad/°

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_03_001 | Bragg's law requires computing \(\sin\theta\); angle measure conversion between degrees and radians is essential for calculator use.
c11_math_cbse_08_001 | The sine function appears in Bragg's law; its domain \([-1,1]\) imposes the condition \(\lambda \le 2d\) for a diffraction order to exist.
## PREREQ_CONCEPT
de Broglie hypothesis (matter waves) and wave interference (constructive interference condition).

## PREREQ_BEFORE
Student must be able to calculate de Broglie wavelength from accelerating voltage and apply the condition for constructive interference from multiple equally spaced sources.

## PREREQ_STUCK
If stuck, revisit the de Broglie hypothesis node (c12_phy_cbse_11_004) and Class 11 wave interference (c11_phy_cbse_14_005, c11_phy_cbse_14_006).

## WORKED_EXAMPLE_1
PROBLEM: In a Davisson-Germer experiment, electrons are accelerated through 54 V and strike a nickel crystal. The detector measures a strong peak at a scattering angle \(\phi = 50^\circ\). The crystal planes are parallel to the surface. Given the interplanar spacing \(d = 0.91 \, \text{Å}\), verify that the de Broglie wavelength matches the Bragg wavelength for first-order diffraction. Use \(h = 6.63 \times 10^{-34} \, \text{J·s}\), \(m_e = 9.11 \times 10^{-31} \, \text{kg}\), \(e = 1.60 \times 10^{-19} \, \text{C}\).

STEPS:
- Step 1: Identify given quantities: \(V = 54 \, \text{V}\), \(\phi = 50^\circ\), \(d = 0.91 \, \text{Å} = 0.91 \times 10^{-10} \, \text{m}\), \(n = 1\). Constants: \(h, m_e, e\).
- Step 2: Compute de Broglie wavelength \(\lambda_{\text{dB}} = h / \sqrt{2 m_e e V}\).  
  \(2 m_e e V = 2 \times 9.11\times10^{-31} \times 1.60\times10^{-19} \times 54 = 1.573 \times 10^{-47} \, \text{kg·J}\).  
  \(\sqrt{2 m_e e V} = 3.966 \times 10^{-24} \, \text{kg·m/s}\).  
  \(\lambda_{\text{dB}} = 6.63\times10^{-34} / 3.966\times10^{-24} = 1.67 \times 10^{-10} \, \text{m} = 1.67 \, \text{Å}\).
- Step 3: Relate scattering angle \(\phi\) to Bragg angle \(\theta\). For planes parallel to surface, \(\phi = 2\theta\) (specular reflection). So \(\theta = \phi/2 = 25^\circ\).
- Step 4: Compute Bragg wavelength \(\lambda_{\text{Bragg}} = 2d \sin\theta / n = 2 \times 0.91\times10^{-10} \times \sin 25^\circ\).  
  \(\sin 25^\circ = 0.4226\).  
  \(\lambda_{\text{Bragg}} = 2 \times 0.91\times10^{-10} \times 0.4226 = 1.67 \times 10^{-10} \, \text{m} = 1.67 \, \text{Å}\).
- Step 5: Compare: \(\lambda_{\text{dB}} = \lambda_{\text{Bragg}} = 1.67 \, \text{Å}\). The match confirms de Broglie's hypothesis.

REASONING: The de Broglie wavelength is derived from the electron's kinetic energy gained through voltage \(V\). Bragg's law gives the wavelength required for constructive interference from crystal planes. The equality of the two independent calculations is the experimental proof.

ANSWER: \(\lambda_{\text{dB}} = \lambda_{\text{Bragg}} = 1.67 \times 10^{-10} \, \text{m}\) (or 1.67 Å). Verification successful.

## WORKED_EXAMPLE_2
PROBLEM: A Davisson-Germer setup uses a crystal with \(d = 2.15 \, \text{Å}\). The detector is fixed at a scattering angle \(\phi = 60^\circ\) (planes parallel to surface). At what accelerating voltage \(V\) will the first-order (\(n=1\)) diffraction peak appear? Use \(h = 6.63 \times 10^{-34} \, \text{J·s}\), \(m_e = 9.11 \times 10^{-31} \, \text{kg}\), \(e = 1.60 \times 10^{-19} \, \text{C}\).

STEPS:
- Step 1: Given: \(d = 2.15 \, \text{Å} = 2.15 \times 10^{-10} \, \text{m}\), \(\phi = 60^\circ\), \(n = 1\). Find \(V\).
- Step 2: Bragg angle \(\theta = \phi/2 = 30^\circ\).
- Step 3: Bragg's law: \(\lambda = 2d \sin\theta = 2 \times 2.15\times10^{-10} \times \sin 30^\circ = 2 \times 2.15\times10^{-10} \times 0.5 = 2.15 \times 10^{-10} \, \text{m}\).
- Step 4: de Broglie wavelength \(\lambda = h / \sqrt{2 m_e e V}\). Solve for \(V\):  
  \(\sqrt{2 m_e e V} = h / \lambda\)  
  \(2 m_e e V = h^2 / \lambda^2\)  
  \(V = h^2 / (2 m_e e \lambda^2)\).
- Step 5: Substitute values:  
  \(h^2 = (6.63\times10^{-34})^2 = 4.396 \times 10^{-67} \, \text{J}^2\text{s}^2\).  
  \(\lambda^2 = (2.15\times10^{-10})^2 = 4.6225 \times 10^{-20} \, \text{m}^2\).  
  \(2 m_e e = 2 \times 9.11\times10^{-31} \times 1.60\times10^{-19} = 2.915 \times 10^{-49} \, \text{kg·C}\).  
  \(V = 4.396\times10^{-67} / (2.915\times10^{-49} \times 4.6225\times10^{-20}) = 4.396\times10^{-67} / 1.347\times10^{-68} = 32.6 \, \text{V}\).
- Step 6: Check reasonableness: Voltage is positive and in typical range (tens of volts). Unit analysis: J = kg·m²/s², C·V = J, so V = J/C works out.

REASONING: The fixed detector angle selects a specific Bragg wavelength. The accelerating voltage must be tuned so that the electron's de Broglie wavelength matches that Bragg wavelength. This is how the original experiment mapped out the \(\lambda(V)\) relationship.

ANSWER: \(V = 32.6 \, \text{V}\) (approximately 33 V).

## WORKED_EXAMPLE_3
PROBLEM: In a modified Davisson-Germer experiment, the nickel crystal is rotated so that the crystal planes make an angle of \(10^\circ\) with the surface. The incident electron beam is normal to the surface. The detector is placed at a scattering angle \(\phi = 40^\circ\) relative to the incident beam. For first-order diffraction (\(n=1\)) and \(d = 0.91 \, \text{Å}\), find the required accelerating voltage \(V\). (Hint: The Bragg angle \(\theta\) is the angle between the incident beam and the crystal planes.)

STEPS:
- Step 1: Understand geometry. Incident beam is normal to surface. Crystal planes are tilted \(10^\circ\) from surface. Therefore, the angle between incident beam and crystal planes is \(\theta = 90^\circ - 10^\circ = 80^\circ\)? Wait: If planes are at \(10^\circ\) to surface, the normal to the planes is at \(80^\circ\) to the surface normal. The incident beam is along the surface normal. The angle between incident beam and planes is the complement of the angle between incident beam and plane normal. Actually, Bragg angle \(\theta\) is defined as the angle between incident beam and the crystal planes. If planes are tilted by \(10^\circ\) from surface, then the angle between surface normal (incident beam) and planes is \(90^\circ - 10^\circ = 80^\circ\). So \(\theta = 80^\circ\).
- Step 2: But the detector is at scattering angle \(\phi = 40^\circ\). For diffraction to occur, the scattering geometry must satisfy the Bragg condition. The scattering angle \(\phi\) is the angle between incident and scattered beams. For a given set of planes, the diffracted beam makes an angle \(2\theta\) with the incident beam? Actually, for specular reflection from planes, the angle of incidence equals angle of reflection measured from the planes. So the total deflection is \(2\theta\). But here the planes are not parallel to the surface. The incident beam is normal to surface. The angle of incidence on the planes is \(\theta = 80^\circ\). The reflected beam will make an angle \(\theta\) with the planes on the other side. The angle between incident and reflected beams is \(2\theta = 160^\circ\). But the detector is at \(40^\circ\). This suggests the detector is not catching the specular reflection from these planes. Wait, the problem says "detector is placed at a scattering angle \(\phi = 40^\circ\)". That means we are looking for a diffraction peak at that detector position. The Bragg condition must be satisfied for some set of planes. However, the problem states "crystal planes make an angle of \(10^\circ\) with the surface" — this likely means we are considering a specific set of planes. The incident beam is normal to surface. The angle between incident beam and these planes is \(90^\circ - 10^\circ = 80^\circ\). But the detector is at \(40^\circ\). For Bragg diffraction, the scattering angle \(\phi\) is related to the Bragg angle \(\theta\) by \(\phi = 2\theta\) only if the detector is in the plane of incidence and the reflection is specular. If \(\phi = 40^\circ\), then \(\theta = 20^\circ\). But the geometry says the angle between incident beam and the given planes is \(80^\circ\). Contradiction. Let's re-read: "crystal planes make an angle of \(10^\circ\) with the surface. The incident electron beam is normal to the surface. The detector is placed at a scattering angle \(\phi = 40^\circ\) relative to the incident beam." This means the detector is at \(40^\circ\). The Bragg angle \(\theta\) for the planes that diffract into this detector is not necessarily the angle between incident beam and the given planes. Actually, the crystal has many planes. The given planes (at \(10^\circ\) to surface) might not be the ones diffracting. But the problem says "for first-order diffraction (\(n=1\)) and \(d = 0.91 \, \text{Å}\)". It implies these are the planes with spacing \(d\). So we must find the Bragg angle \(\theta\) that satisfies the geometry. The incident beam direction is fixed (normal to surface). The detector direction is fixed (at \(\phi = 40^\circ\)). The planes that can diffract from incident to detector must satisfy the Bragg law and the geometry: the angle between incident beam and planes is \(\theta\), and the angle between diffracted beam and planes is also \(\theta\). The total angle between incident and diffracted beams is \(2\theta\). Therefore, \(\phi = 2\theta\). So \(\theta = \phi/2 = 20^\circ\). This is the Bragg angle for the planes that produce the peak at this detector position. The fact that the crystal is rotated by \(10^\circ\) means the planes that satisfy this are not the ones parallel to the surface, but some other set. The spacing \(d = 0.91 \, \text{Å}\) is given for those planes. So we use \(\theta = 20^\circ\).
- Step 3: Compute Bragg wavelength: \(\lambda = 2d \sin\theta = 2 \times 0.91\times10^{-10} \times \sin 20^\circ\). \(\sin 20^\circ = 0.3420\). \(\lambda = 2 \times 0.91\times10^{-10} \times 0.3420 = 6.22 \times 10^{-11} \, \text{m}\).
- Step 4: Find \(V\) from \(\lambda = h / \sqrt{2 m_e e V}\).  
  \(V = h^2 / (2 m_e e \lambda^2)\).  
  \(h^2 = 4.396\times10^{-67}\).  
  \(\lambda^2 = (6.22\times10^{-11})^2 = 3.87\times10^{-21}\).  
  \(2 m_e e = 2.915\times10^{-49}\).  
  \(V = 4.396\times10^{-67} / (2.915\times10^{-49} \times 3.87\times10^{-21}) = 4.396\times10^{-67} / 1.128\times10^{-69} = 389.7 \, \text{V}\).
- Step 5: Check: \(\lambda = 0.622 \, \text{Å}\), typical for a few hundred volts. Reasonable.

REASONING: The geometry of Bragg diffraction requires that the scattering angle \(\phi = 2\theta\) where \(\theta\) is the angle between the incident beam and the diffracting planes. The crystal rotation changes which planes are at the correct orientation, but the relationship \(\phi = 2\theta\) holds for the planes that actually diffract into the detector. The given \(d\) is the spacing of those planes.

ANSWER: \(V \approx 390 \, \text{V}\).

## COMPETENCY_QUESTION_1
QUESTION: In the Davisson-Germer experiment, the intensity of scattered electrons is measured as a function of the scattering angle \(\phi\) for a fixed accelerating voltage. A student argues: "If electrons are particles, they should scatter randomly; the peaks prove they are waves." Another student says: "The peaks only prove that the crystal has a periodic structure; any particle would show peaks if it interacts with a periodic potential." Evaluate both arguments. Which aspects of the experiment specifically confirm the de Broglie wavelength formula \(\lambda = h/\sqrt{2meV}\)?

COMPETENCY: Interpreting physical situations using formulas and distinguishing between qualitative and quantitative evidence.

STEPS:
- Step 1: Identify the claim of each student.
- Step 2: Recognize that the first student's argument is qualitative: diffraction peaks imply wave nature. This is correct but incomplete.
- Step 3: The second student's argument is a classical particle scattering resonance; however, the periodic potential would not give the specific angular dependence matching \(\lambda = h/p\) without the wave hypothesis.
- Step 4: The key quantitative confirmation is that the peak angles \(\phi\) satisfy \(\phi = 2\theta\) with \(\sin\theta = n\lambda/(2d)\), and the \(\lambda\) computed from this matches \(h/\sqrt{2meV}\) for each voltage \(V\). The voltage dependence of the peak positions is the smoking gun.
- Step 5: Conclude that the experiment confirms de Broglie's formula because the measured \(\lambda\) varies with \(V\) exactly as predicted.

ANSWER: The first student correctly identifies that diffraction peaks indicate wave behaviour. The second student's classical resonance argument cannot explain why the peak angles shift with accelerating voltage exactly according to \(\lambda \propto 1/\sqrt{V}\). The quantitative agreement between \(\lambda_{\text{Bragg}} = 2d \sin(\phi/2)\) and \(\lambda_{\text{de Broglie}} = h/\sqrt{2meV}\) across multiple voltages is the specific confirmation of de Broglie's hypothesis.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A Davisson-Germer type experiment is performed with a crystal of unknown interplanar spacing \(d\). The following data are collected for first-order diffraction peaks:

| Accelerating Voltage \(V\) (V) | Scattering Angle \(\phi\) (°) |
|-------------------------------|-------------------------------|
| 54                            | 50                            |
| 60                            | 47                            |
| 68                            | 43                            |

Assuming the crystal planes are parallel to the surface, determine the interplanar spacing \(d\). Use \(h = 6.63 \times 10^{-34} \, \text{J·s}\), \(m_e = 9.11 \times 10^{-31} \, \text{kg}\), \(e = 1.60 \times 10^{-19} \, \text{C}\). Comment on the consistency of the data.

COMPETENCY: Predicting outcomes from changing variables and unit analysis with dimensional reasoning.

STEPS:
- Step 1: For each row, compute \(\lambda_{\text{dB}} = h / \sqrt{2 m_e e V}\).
- Step 2: Compute Bragg angle \(\theta = \phi/2\).
- Step 3: Use Bragg's law \(d = n\lambda / (2 \sin\theta)\) with \(n=1\) to find \(d\) for each row.
- Step 4: Check if \(d\) is constant across rows. If yes, the data are consistent and \(d\) is determined.
- Step 5: Perform calculations:
  - \(V=54\): \(\lambda = 1.67 \, \text{Å}\), \(\theta=25^\circ\), \(\sin25^\circ=0.4226\), \(d = 1.67 / (2 \times 0.4226) = 1.98 \, \text{Å}\).
  - \(V=60\): \(\lambda = 1.58 \, \text{Å}\), \(\theta=23.5^\circ\), \(\sin23.5^\circ=0.3987\), \(d = 1.58 / (2 \times 0.3987) = 1.98 \, \text{Å}\).
  - \(V=68\): \(\lambda = 1.48 \, \text{Å}\), \(\theta=21.5^\circ\), \(\sin21.5^\circ=0.3665\), \(d = 1.48 / (2 \times 0.3665) = 2.02 \, \text{Å}\).
- Step 6: The values are consistent around \(d \approx 2.0 \, \text{Å}\). Small variations due to rounding.

ANSWER: \(d \approx 2.0 \times 10^{-10} \, \text{m}\) (2.0 Å). The data are consistent with Bragg's law and de Broglie's formula, confirming the crystal's interplanar spacing.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The Davisson-Germer experiment (1927) demonstrated the wave nature of electrons by observing ______ patterns when a beam of electrons is scattered off a single crystal of nickel.

## DIAGNOSTIC_ANSWER_7
diffraction

The diffraction patterns are the evidence: peaks and minima in scattered electrons are waves announcing themselves. **A wrong answer (deflection) reveals the student has cited mere bending when the experiment's proof is the interference pattern's fine structure.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you shine a laser through a fine mesh and see a ______ pattern on a wall — that's light behaving as a wave.

## DIAGNOSTIC_ANSWER_8
diffraction

The diffraction pattern completes the mesh demo: light through a grid and electrons through a crystal drawing the same signature. **A wrong answer (a shadow) reveals the student has dimmed the mesh demo's pattern into a plain silhouette.**

## DIAGNOSTIC_QUESTION_9
Fill in the blank: The Davisson-Germer experiment (______) demonstrated the wave nature of electrons by observing diffraction patterns when a beam of electrons is scattered off a single crystal of nickel.

## DIAGNOSTIC_ANSWER_9
1927

The year stamps the proof: Davisson and Germer's nineteen twenty-seven campaign turned de Broglie's proposal into measured fact. **A wrong answer (another year) reveals the student has redated the audit and with it the history of duality.** The year stamps the proof: nineteen twenty-seven turned de Broglie's proposal into measured fact.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
The student must be able to: (1) describe the experimental setup and the role of each component (electron gun, nickel crystal, detector), (2) apply Bragg's law to relate the observed diffraction angle to the electron wavelength, (3) calculate the de Broglie wavelength from the accelerating voltage and verify the agreement with the Bragg.

## DIAGNOSTIC_QUESTION_11
Fill in the blank: The Davisson-Germer experiment (1927) ______ the wave nature of electrons by observing diffraction patterns when a beam of electrons is scattered off a single crystal of nickel.

## DIAGNOSTIC_ANSWER_11
demonstrated

The demonstrated verb is the experiment's verdict: observed diffraction peaks matching predicted wavelengths is confirmation, not suggestion. **A wrong answer (suggested) reveals the student has softened a measurement into an opinion.**
