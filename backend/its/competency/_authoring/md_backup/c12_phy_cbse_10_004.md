## DEFINITION
Coherent sources are two or more wave sources that maintain a constant phase difference and have the same frequency, enabling stable interference patterns where positions of maxima and minima remain fixed in time. Incoherent sources have a rapidly varying phase difference, causing the interference pattern to fluctuate and time-average to uniform intensity.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
Student can derive the condition for constructive and destructive interference from path difference, calculate resultant intensity using I = 4I₀ cos²(φ/2) for coherent sources and I = 2I₀ for incoherent sources, and explain why two independent sodium lamps cannot produce sustained interference fringes.

## SCOPE_BOUNDARY
Covers: definition of coherence, superposition principle for two waves, derivation of intensity distribution for coherent/incoherent sources, Young's double slit as a method to create coherence, conditions for sustained interference. Does NOT cover: fringe width calculation (node c12_phy_cbse_10_005), detailed intensity distribution across screen (node c12_phy_cbse_10_006), diffraction effects (node c12_phy_cbse_10_007).

## WALKTHROUGH
Observe two LED bulbs in your room — they illuminate the wall uniformly without dark/bright bands. Now recall the ripple tank from Class 11 where two vibrating needles created stable nodal/antinodal lines. The difference is coherence: the needles were mechanically linked (same driver), while LEDs are independent. In Young's 1801 experiment, he used a single pinhole to illuminate two closely spaced pinholes, "locking" their phases. We begin by writing displacements y₁ = a cos ωt and y₂ = a cos(ωt + φ), then superpose them using trigonometric identities to find resultant amplitude and intensity. The key step is recognizing φ = (2π/λ) × path difference.

## DIAGNOSTIC_QUESTION_1
Two identical tuning forks of frequency 512 Hz are struck simultaneously. Fork A is at x = 0 m, Fork B is at x = 1.5 m. A microphone at x = 3.0 m detects sound. Speed of sound = 340 m/s. Are the two sources coherent? What is the phase difference at the microphone?

## DIAGNOSTIC_ANSWER_1
Yes, the sources are coherent because they have the same frequency (512 Hz) and maintain a constant phase relationship (both struck simultaneously). Wavelength λ = v/f = 340/512 = 0.664 m. Path difference Δx = (3.0 - 1.5) - (3.0 - 0) = -1.5 m. Phase difference φ = (2π/λ) × |Δx| = (2π/0.664) × 1.5 = 14.2 rad ≡ 1.6 rad (mod 2π). WRONG ANSWER REVEALS: If student says "not coherent because they are separate forks", they confuse independence with incoherence — coherence requires constant phase difference, not common origin. If they forget 2π factor or use degrees/radians inconsistently, they lack unit discipline.

## DIAGNOSTIC_QUESTION_2
In a Young's double slit experiment, the two slits are illuminated by a single sodium lamp (λ = 589 nm). A student covers one slit with a thin mica sheet of thickness 2 μm and refractive index 1.58. Explain whether the central fringe shifts, and if so, in which direction and by how many fringes.

## DIAGNOSTIC_ANSWER_2
Yes, central fringe shifts. The mica introduces additional optical path = (μ - 1)t = (1.58 - 1) × 2 × 10⁻⁶ = 1.16 × 10⁻⁶ m. Number of fringes shifted = (μ - 1)t / λ = 1.16 × 10⁻⁶ / 589 × 10⁻⁹ = 1.97 ≈ 2 fringes. Since the covered slit's light is delayed (longer optical path), the central maximum moves TOWARDS the covered slit to compensate. WRONG ANSWER REVEALS: If student says "fringe shifts away from covered slit", they misunderstand that the wave through mica is slower, so its phase lags — the pattern shifts to where geometrical path difference cancels this lag. If they compute (μt)/λ instead of (μ-1)t/λ, they forget the path in air is replaced, not added.

## DIAGNOSTIC_QUESTION_3
Two coherent sources S₁ and S₂ emit light of wavelength 600 nm with equal intensity I₀ = 4 W/m². At point P on a screen, the path difference S₂P - S₁P = 450 nm. Calculate the resultant intensity at P. If the sources were incoherent, what would be the intensity at P?

## DIAGNOSTIC_ANSWER_3
Given: λ = 600 nm, Δx = 450 nm, I₀ = 4 W/m². Phase difference φ = (2π/λ) × Δx = (2π/600) × 450 = 1.5π rad. For coherent sources: I = 4I₀ cos²(φ/2) = 4 × 4 × cos²(0.75π) = 16 × cos²(135°) = 16 × (-1/√2)² = 16 × ½ = 8 W/m². For incoherent sources: I = 2I₀ = 2 × 4 = 8 W/m². (Coincidentally same here because cos²(φ/2) = ½). WRONG ANSWER REVEALS: If student uses φ = (2π/λ)Δx but forgets the factor of 2 in 4I₀, they get 2 W/m². If they use I = I₀ + I₀ + 2√(I₀I₀)cosφ but mis-evaluate cos(1.5π) = 0, they get 8 W/m² correctly but for wrong reason (cos 1.5π = 0, not ½). If they say incoherent gives 4 W/m², they think intensities don't add.

## DIAGNOSTIC_QUESTION_4
A student sets up Young's double slit with slit separation d = 0.5 mm, screen distance D = 1.2 m, using a He-Ne laser (λ = 632.8 nm). They observe clear fringes. Then they replace the laser with a white light LED bulb placed at the same position. The fringes disappear. Explain why, using the concept of temporal coherence and spectral width. Calculate the coherence length of the LED if its spectral width Δλ = 30 nm at λ = 600 nm.

## DIAGNOSTIC_ANSWER_4
White light LED emits a broad spectrum (Δλ ≈ 30 nm). Each wavelength produces its own fringe pattern with slightly different fringe spacing (β ∝ λ). These patterns overlap and wash out because the central maxima coincide but higher orders diverge. Temporal coherence length L_c = λ²/Δλ = (600 × 10⁻⁹)² / (30 × 10⁻⁹) = 3.6 × 10⁻⁶ m = 3.6 μm. For interference to be visible, path difference must be < L_c. In Young's setup, path difference at m-th fringe ≈ mλ. For m = 1, Δx = 600 nm < 3.6 μm, so central few fringes might be visible but contrast degrades rapidly. WRONG ANSWER REVEALS: If student says "white light has no coherence", they confuse temporal coherence (finite) with spatial coherence. If they compute L_c = λ/Δλ instead of λ²/Δλ, they use wrong formula. If they say "all fringes disappear completely", they don't realize central white fringe persists with coloured edges.

## DIAGNOSTIC_QUESTION_5
Evaluate the following statement: "Two independent laser pointers of the same wavelength (650 nm) can produce a stable interference pattern on a screen because lasers are highly coherent sources." Identify the error and explain the correct physics.

## DIAGNOSTIC_ANSWER_5
The statement is FALSE. Even though each laser has high temporal coherence (narrow linewidth), two INDEPENDENT lasers have no fixed phase relationship — their phases drift randomly due to independent quantum fluctuations in the gain medium. The phase difference changes rapidly (~MHz to GHz), so the interference pattern fluctuates faster than the eye/detector can resolve, time-averaging to I = 2I₀. To get stable fringes, the two beams must be derived from a SINGLE laser (e.g., by beam splitter or double slit), ensuring common origin and locked phases. WRONG ANSWER REVEALS: Student confuses "coherence of a single source" with "mutual coherence between two sources". They think monochromaticity alone guarantees interference, missing that constant phase difference is the critical requirement.

## DIAGNOSTIC_QUESTION_6
Design a tabletop experiment using household items to demonstrate that two independent light sources (e.g., two smartphone flashlights) do not produce interference fringes, but a single source split into two paths does. List materials, procedure, and expected observations.

## DIAGNOSTIC_ANSWER_6
Materials: Two smartphones with flashlights, a piece of aluminium foil, a pin, a white wall/screen, a dark room. Procedure: (1) Turn on both flashlights, place them side by side 5 cm apart, shine on wall 2 m away — observe uniform illumination, no fringes. (2) Make a double slit in foil: fold foil, use pin to make two closely spaced pinholes (~0.5 mm apart). (3) Use ONE flashlight to illuminate the double slit (hold foil close to flashlight). (4) Observe screen — clear interference fringes appear. Expected: Step 1 shows no fringes (independent sources, random phase). Step 4 shows fringes (single source split, locked phases). WRONG ANSWER REVEALS: If student expects fringes in step 1, they don't grasp that independence = incoherence. If they use two flashlights for step 4, they miss the point of common origin. If they don't mention dark room, they ignore ambient light washing out low-contrast fringes.

## COMMON_MISCONCEPTION
Students believe that "monochromatic" and "coherent" are synonymous — they think any single-colour light (like a sodium lamp or red LED) is automatically coherent and will interfere. In reality, a sodium lamp emits wave trains ~10⁻¹⁰ s long with random phase jumps; two independent sodium lamps have uncorrelated phase jumps, so no stable interference. Coherence requires BOTH same frequency AND constant phase difference. Another error: students think "equal intensity" is needed for interference — but unequal intensities still interfere, just with reduced contrast (visibility = 2√(I₁I₂)/(I₁+I₂)).

## ON_FAILURE
1. Revisit c11_phy_cbse_14_005 (Principle of Superposition) — practice adding y₁ = a₁ cos ωt and y₂ = a₂ cos(ωt + φ) using phasor diagrams. 2. Revisit c11_phy_cbse_14_006 (Interference of Waves) — derive I = I₁ + I₂ + 2√(I₁I₂) cos φ from amplitude addition. 3. Do the aluminium foil double slit experiment (Diagnostic Q6) physically — seeing fringes appear/disappear with one/two sources cements the concept. 4. Re-diagnostic: Explain why two laser pointers don't interfere but a laser + beam splitter does.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_14_005, c11_phy_cbse_14_006, c12_phy_cbse_10_001, c12_phy_cbse_10_002
## PREREQUISITE_REASONS
c11_phy_cbse_14_005: Principle of superposition is the mathematical foundation for adding wave displacements — without it, interference derivation cannot begin.
c11_phy_cbse_14_006: Constructive/destructive interference conditions (path difference = nλ, (n+½)λ) are directly applied here for light waves.
c12_phy_cbse_10_001: Huygens' principle explains how a single wavefront splits into two coherent wavelets at the double slit — the physical origin of coherence in Young's experiment.
c12_phy_cbse_10_002: Refraction/reflection via Huygens shows how wavefronts propagate — needed to understand how the single source illuminates both slits with same phase.

## FORWARD_NODE_IDS
c12_phy_cbse_10_005, c12_phy_cbse_10_006, c12_phy_cbse_10_007, c12_phy_cbse_10_008

## FORWARD_REASONS
c12_phy_cbse_10_005: Young's Double Slit Experiment uses the coherence concept developed here to derive fringe width β = λD/d — the spatial scale of the interference pattern.
c12_phy_cbse_10_006: Intensity distribution across the screen (I = 4I₀ cos²(πd sinθ/λ)) builds directly on the I = 4I₀ cos²(φ/2) formula derived in this node.
c12_phy_cbse_10_007: Coherent sources and superposition principle are needed to understand how wavelets interfere.  
c12_phy_cbse_10_008: Coherent sources and interference establish the wave nature of light and superposition principle, which underlies polarization as a transverse wave phenomenon.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_03_009, c11_math_cbse_03_012
## CROSS_SUBJECT_REASONS
c11_math_cbse_03_009: Sum-to-product trigonometric identities (cos A + cos B = 2 cos((A+B)/2) cos((A-B)/2)) are essential for deriving the resultant amplitude and intensity from superposition of two waves.
c11_math_cbse_03_012: Transformation formulae (product-to-sum) allow converting the time-domain superposition into a form where the interference term cos(φ/2) is explicit — this mathematical step is the bridge between wave addition and intensity pattern.

## CHAIN_DESCRIPTION
c11_phy_cbse_14_005 -> c12_phy_cbse_10_004 -> c12_phy_cbse_10_005

## THIS_FORMULA
I = 4I₀ cos²(φ/2) for coherent sources (W/m²); I = 2I₀ for incoherent sources (W/m²); φ = (2π/λ) × Δx (rad); Constructive: Δx = nλ; Destructive: Δx = (n + ½)λ

## FORMULA_VARIABLES
I = resultant intensity (W/m²), I₀ = intensity from each source alone (W/m²), φ = phase difference between waves at observation point (rad), λ = wavelength in medium (m), Δx = path difference (m), n = integer (0, ±1, ±2...)

## FORMULA_UNITS
W/m², rad, m

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_03_009 | Trigonometric sum-to-product identity cos A + cos B = 2 cos((A+B)/2) cos((A-B)/2) is used to add y₁ = a cos ωt and y₂ = a cos(ωt + φ) and obtain resultant amplitude 2a cos(φ/2).
c11_math_cbse_03_012 | Product-to-sum transformations help express the time-averaged intensity ⟨cos²(ωt + φ/2)⟩ = ½, leading to I ∝ 4a² cos²(φ/2) × ½ = 2a² cos²(φ/2) — the factor of ½ from time averaging is often missed by students.
## PREREQ_CONCEPT
Superposition principle for waves: resultant displacement is vector sum of individual displacements; intensity is proportional to square of resultant amplitude.

## PREREQ_BEFORE
Student must be able to add two sinusoidal functions of same frequency with a phase difference using trigonometric identities, and understand that intensity ∝ amplitude².

## PREREQ_STUCK
If stuck on the trigonometry, review c11_math_cbse_03_009 (sum/difference formulas) and practice: cos θ + cos(θ + φ) = 2 cos(φ/2) cos(θ + φ/2). If stuck on physics, review c11_phy_cbse_14_005 (superposition) and c11_phy_cbse_14_006 (interference conditions).

## WORKED_EXAMPLE_1
PROBLEM: In a physics lab, a student uses a He-Ne laser (λ = 632.8 nm) to illuminate a double slit with separation d = 0.4 mm. The screen is 2.0 m away. At a point P on the screen, the path difference from the two slits is measured to be 949.2 nm. (a) Calculate the phase difference at P. (b) If intensity from each slit alone at P is 2.5 mW/m², find the resultant intensity at P. (c) How many bright fringes are there between the central maximum and point P?

STEPS:
- Step 1: Identify given quantities: λ = 632.8 × 10⁻⁹ m, Δx = 949.2 × 10⁻⁹ m, I₀ = 2.5 × 10⁻³ W/m². Find: φ, I, number of bright fringes n.
- Step 2: Phase difference formula: φ = (2π/λ) × Δx. Check units: (rad/m) × m = rad ✓.
- Step 3: Substitute: φ = (2π / 632.8 × 10⁻⁹) × 949.2 × 10⁻⁹ = 2π × (949.2 / 632.8) = 2π × 1.5 = 3π rad.
- Step 4: Resultant intensity for coherent sources: I = 4I₀ cos²(φ/2) = 4 × 2.5 × 10⁻³ × cos²(3π/2) = 10 × 10⁻³ × cos²(270°) = 10 × 10⁻³ × 0 = 0 W/m². This is destructive interference.
- Step 5: For bright fringes, Δx = nλ. So n = Δx/λ = 949.2 / 632.8 = 1.5. Since n must be integer for bright fringes, there is 1 bright fringe (n=1) between central max (n=0) and point P. Point P lies at the first dark fringe (n=1.5).
- Step 6: Verify: φ = 3π corresponds to Δx = 1.5λ — exactly the condition for first minimum. Intensity = 0 is physically correct for destructive interference.

REASONING: The phase difference directly determines whether interference is constructive or destructive. Here φ = 3π (odd multiple of π) gives destructive interference. The number of bright fringes passed equals the integer part of Δx/λ. The zero intensity result confirms P is a dark fringe.

ANSWER: (a) φ = 3π rad (or 540°), (b) I = 0 W/m² (destructive interference), (c) 1 bright fringe between central maximum and point P.

## WORKED_EXAMPLE_2
PROBLEM: Two coherent sources S₁ and S₂ emit light of wavelength 500 nm. Their intensities at a point Q are I₁ = 9 W/m² and I₂ = 4 W/m² respectively. The phase difference at Q is 60°. Calculate the resultant intensity at Q. If the same sources were incoherent, what would be the intensity? What is the visibility (contrast) of the fringes?

STEPS:
- Step 1: Given: λ = 500 nm (not needed directly), I₁ = 9 W/m², I₂ = 4 W/m², φ = 60° = π/3 rad. Find: I_coherent, I_incoherent, visibility V.
- Step 2: General interference formula for unequal intensities: I = I₁ + I₂ + 2√(I₁I₂) cos φ. Check units: all terms in W/m² ✓.
- Step 3: Substitute for coherent case: I = 9 + 4 + 2√(9×4) cos(π/3) = 13 + 2×6×0.5 = 13 + 6 = 19 W/m².
- Step 4: For incoherent sources: I_incoherent = I₁ + I₂ = 9 + 4 = 13 W/m² (time-averaged, cos φ averages to 0).
- Step 5: Visibility V = (I_max - I_min) / (I_max + I_min). I_max occurs at φ = 0: I_max = 9 + 4 + 2×6×1 = 25 W/m². I_min occurs at φ = π: I_min = 9 + 4 + 2×6×(-1) = 1 W/m². So V = (25 - 1) / (25 + 1) = 24/26 = 12/13 ≈ 0.923.
- Step 6: Verify: For equal intensities (I₁ = I₂ = I₀), V = 1. Here I₁ ≠ I₂, so V < 1. Result 0.923 is high contrast because intensities are comparable (ratio 9:4 = 2.25).

REASONING: Unequal intensities still interfere but with reduced contrast. The general formula I = I₁ + I₂ + 2√(I₁I₂) cos φ reduces to I = 4I₀ cos²(φ/2) when I₁ = I₂ = I₀. Visibility quantifies fringe contrast — crucial for experimental detection.

ANSWER: Coherent intensity = 19 W/m², Incoherent intensity = 13 W/m², Visibility = 12/13 ≈ 0.923 (92.3% contrast).

## WORKED_EXAMPLE_3
PROBLEM: A Young's double slit experiment uses a sodium lamp (λ = 589 nm) with a single slit S (width 0.1 mm) illuminating double slits S₁, S₂ (separation 0.5 mm). The single slit is 1.0 m from the double slit plane. Screen is 2.0 m from double slits. (a) Explain why the single slit is necessary for coherence. (b) Calculate the maximum path difference introduced by the finite width of S that still allows visible fringes. (c) If the sodium lamp is replaced by a white LED (Δλ = 40 nm at 600 nm), estimate how many bright fringes remain visible.

STEPS:
- Step 1: Understand the setup: Single slit S acts as a spatial filter. Each point on S emits spherical waves; for a point source, S₁ and S₂ receive light with fixed phase relationship. For an extended source, different points on S produce shifted fringe patterns that overlap and wash out.
- Step 2: Spatial coherence condition: For fringes to be visible, the angular size of source S as seen from double slits must satisfy θ < λ/d. Here θ ≈ (width of S) / (distance to double slits) = 0.1 mm / 1000 mm = 10⁻⁴ rad. λ/d = 589 × 10⁻⁹ / 0.5 × 10⁻³ = 1.178 × 10⁻³ rad. Since θ < λ/d, spatial coherence is adequate.
- Step 3: Maximum path difference from source width: Rays from top and bottom of S to S₁ and S₂ create path differences. The maximum optical path difference between extreme rays ≈ (width of S) × (d / D_source) = 0.1 × 10⁻³ × (0.5 × 10⁻³ / 1.0) = 5 × 10⁻⁸ m = 50 nm. This is < λ/2 (≈ 295 nm), so fringes from all points of S overlap constructively.
- Step 4: For white LED: Temporal coherence length L_c = λ²/Δλ = (600 × 10⁻⁹)² / (40 × 10⁻⁹) = 9 × 10⁻⁶ m = 9 μm. In YDSE, path difference at m-th fringe ≈ mλ (for small angles). Maximum m for visible fringes: m_max ≈ L_c / λ = 9 × 10⁻⁶ / 600 × 10⁻⁹ = 15. So about 15 bright fringes on each side of central maximum remain visible before washing out.
- Step 5: Verify: Central white fringe (m=0) always visible. Coloured fringes appear for m=1,2,... up to ~15. Beyond that, different λ fringes overlap completely → uniform white light. This matches experimental observation: white light YDSE shows few coloured fringes near centre.

REASONING: This problem combines spatial coherence (source size) and temporal coherence (spectral width) — both are required for sustained interference. The single slit ensures spatial coherence by limiting the angular size of the effective source. The spectral width limits temporal coherence, restricting the number of observable fringes.

ANSWER: (a) Single slit S creates a spatially coherent source by limiting angular size θ < λ/d, ensuring S₁ and S₂ receive correlated phases. (b) Maximum path difference from S's width ≈ 50 nm < λ/2, so fringes don't wash out. (c) ~15 bright fringes visible on each side of central maximum (total ~31 fringes including central).

## COMPETENCY_QUESTION_1
QUESTION: A student performs Young's double slit experiment with a green laser (λ = 532 nm). They observe clear fringes on a screen 1.5 m away. Then they place a thin glass plate (thickness 10 μm, refractive index 1.5) in front of one slit. The central bright fringe shifts by 12 fringes. (a) Verify if this shift is consistent with the given parameters. (b) The student now removes the glass plate and instead moves the laser source sideways by 2 mm (keeping the single slit illuminating the double slits). Will the fringe pattern shift? Explain. (c) If the laser is replaced by a green LED (same λ but Δλ = 20 nm), how many fringes will be visible?

COMPETENCY: Interpreting physical situations using formulas and predicting outcomes from changing variables

STEPS:
- Step 1: Understand the physical situation — glass plate introduces additional optical path, shifting the pattern. Moving the source laterally changes the illumination angle.
- Step 2: (a) Fringe shift due to glass plate: Δn = (μ - 1)t / λ = (1.5 - 1) × 10 × 10⁻⁶ / (532 × 10⁻⁹) = 0.5 × 10⁻⁵ / 5.32 × 10⁻⁷ = 9.4 fringes. Given shift is 12 fringes — NOT consistent. Possible error in thickness or refractive index.
- Step 3: (b) Moving the laser source sideways: The single slit S is illuminated at an angle. This introduces a constant phase difference between S₁ and S₂ because the wavefront reaches them at different times. The entire fringe pattern shifts laterally but fringe spacing remains unchanged. Yes, pattern shifts.
- Step 4: (c) Coherence length L_c = λ²/Δλ = (532 × 10⁻⁹)² / (20 × 10⁻⁹) = 1.41 × 10⁻⁵ m = 14.1 μm. Maximum fringes m_max = L_c / λ = 14.1 × 10⁻⁶ / 532 × 10⁻⁹ ≈ 26.5. So about 26 fringes on each side (total ~53 fringes) visible.

ANSWER: (a) Expected shift = 9.4 fringes; observed 12 fringes is inconsistent — check glass thickness or n. (b) Yes, fringe pattern shifts laterally because the incident wavefront is tilted, introducing a constant phase difference between slits. (c) ~26 bright fringes on each side of central maximum (total ~53 fringes) will be visible before contrast degrades.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a modified Young's experiment, the two slits are illuminated by two independent but phase-locked lasers (same frequency, fixed phase difference φ₀ = π/4). The slits have unequal widths, so intensities at screen center are I₁ = 4I₀ and I₂ = I₀. (a) Derive the expression for intensity at any point on the screen as a function of position y. (b) Find the position of the central maximum (maximum intensity). (c) Calculate the fringe visibility. (d) If the phase lock fails and φ₀ becomes random, what happens to the pattern?

COMPETENCY: Applying multiple concepts (interference, phase locking, unequal intensities, visibility) to a novel experimental configuration

STEPS:
- Step 1: Identify the physics — two coherent sources with fixed initial phase difference φ₀ and unequal intensities. Path difference at position y: Δx ≈ yd/D (small angle). Phase difference from path: φ_path = (2π/λ)(yd/D). Total phase difference: φ = φ₀ + φ_path.
- Step 2: (a) General intensity: I(y) = I₁ + I₂ + 2√(I₁I₂) cos φ = 4I₀ + I₀ + 2√(4I₀·I₀) cos(π/4 + 2πyd/λD) = 5I₀ + 4I₀ cos(π/4 + 2πyd/λD).
- Step 3: (b) Maximum intensity when cos(...) = 1 → π/4 + 2πyd/λD = 2πm. For central maximum (m=0): π/4 + 2πyd/λD = 0 → y = -λD/(8d). Central maximum shifts from y=0 by λD/(8d) towards the slit with the phase lag (since φ₀ = π/4 means S₂ leads S₁ by π/4, so maximum moves toward S₁).
- Step 4: (c) I_max = 5I₀ + 4I₀ = 9I₀ (when cos = 1). I_min = 5I₀ - 4I₀ = I₀ (when cos = -1). Visibility V = (9I₀ - I₀)/(9I₀ + I₀) = 8I₀/10I₀ = 0.8.
- Step 5: (d) If phase lock fails, φ₀ becomes random and time-varying. The cos(φ₀ + φ_path) term averages to zero over time. Intensity becomes time-independent: I = I₁ + I₂ = 5I₀ everywhere — uniform illumination, no fringes. This is the transition from coherent to incoherent superposition.

ANSWER: (a) I(y) = 5I₀ + 4I₀ cos(π/4 + 2πyd/λD). (b) Central maximum at y = -λD/(8d) (shifted from geometric center). (c) Visibility = 0.8 (80% contrast). (d) Fringes disappear completely; screen shows uniform intensity 5I₀.

DIFFICULTY: hard