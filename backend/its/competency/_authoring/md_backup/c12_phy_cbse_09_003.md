## DEFINITION
Refraction is the bending of a light ray when it passes obliquely from one transparent medium into another due to a change in its speed. Snell's law states that for a given pair of media and a given wavelength of light, the ratio of the sine of the angle of incidence (i) to the sine of the angle of refraction (r) is a constant, called the relative refractive index (n₂₁): n₂₁ = sin i / sin r. The angles are measured from the normal at the point of incidence. The absolute refractive index of a medium (n) is the ratio of the speed of light in vacuum (c) to its speed in that medium (v): n = c/v.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) state Snell's law in both forms (n₁ sin i = n₂ sin r and n₂₁ = sin i / sin r), (2) identify the correct angles from a ray diagram, (3) calculate any one of the four quantities (n₁, n₂, i, r) given the other three, (4) predict whether the ray bends towards or away from the normal based on relative optical densities, and (5) explain why optical density is distinct from mass density using the example of turpentine and water.

## SCOPE_BOUNDARY
This node covers refraction at a plane interface between two isotropic, homogeneous, transparent media. It includes Snell's law, relative and absolute refractive indices, and the concept of optical density. It does NOT cover total internal reflection (next node), refraction at spherical surfaces, lenses, prisms, or dispersion. It assumes the ray picture of light (geometrical optics) and paraxial approximation is not required here.

## WALKTHROUGH
Observe a pencil partially immersed in a glass of water — it appears bent at the water surface. This everyday observation is refraction. Begin by placing a rectangular glass slab on a white sheet, trace its outline, and direct a pin at an angle to one face. View from the other side and place two more pins so all four appear collinear. Remove the slab, join the pin holes, and measure the angles with the normal. You will find sin i / sin r is constant for different angles. This constant is the relative refractive index of glass with respect to air. Connect this to Class 10 knowledge: the speed of light decreases in glass, causing the ray to bend towards the normal. The key formula n₁ sin i = n₂ sin r emerges from the definition n = c/v and the wavefront continuity condition at the boundary.

## DIAGNOSTIC_QUESTION_1
State Snell's law of refraction in terms of the absolute refractive indices of the two media and the angles of incidence and refraction. Define each symbol and its SI unit.

## DIAGNOSTIC_ANSWER_1
Snell's law: n₁ sin i = n₂ sin r. Here n₁ = absolute refractive index of medium 1 (dimensionless), n₂ = absolute refractive index of medium 2 (dimensionless), i = angle of incidence (radian or degree), r = angle of refraction (radian or degree). A wrong answer (e.g., writing sin i / sin r = n₁/n₂ or swapping n₁ and n₂) reveals confusion about which medium's refractive index multiplies which angle. The correct form follows from n = c/v and the fact that the tangential component of the wave vector is continuous across the boundary.

## DIAGNOSTIC_QUESTION_2
A ray of light travels from water (n = 1.33) into crown glass (n = 1.52). Will the ray bend towards the normal or away from the normal? Explain using the concept of optical density and the speed of light in the two media.

## DIAGNOSTIC_ANSWER_2
The ray bends towards the normal. Crown glass (n=1.52) is optically denser than water (n=1.33) because light travels slower in glass (v = c/1.52) than in water (v = c/1.33). When light enters a medium where its speed decreases, the wavefronts bend such that the ray turns towards the normal. A student who says "away from the normal" incorrectly thinks higher refractive index means faster speed, or confuses optical density with mass density (glass has higher mass density than water, but the reasoning must be based on speed of light/optical density).

## DIAGNOSTIC_QUESTION_3
A light ray in air (n = 1.00) strikes a glass slab (n = 1.50) at an angle of incidence of 35°. Calculate the angle of refraction inside the glass. Give your answer in degrees to one decimal place.

## DIAGNOSTIC_ANSWER_3
Given: n₁ = 1.00, n₂ = 1.50, i = 35°. Using n₁ sin i = n₂ sin r → sin r = (n₁/n₂) sin i = (1.00/1.50) × sin 35° = 0.6667 × 0.5736 = 0.3824. r = sin⁻¹(0.3824) = 22.5°. A wrong answer like 57° or 23.5° (using sin 35° ≈ 0.57 without division) reveals either swapping n₁ and n₂ (sin r = 1.5 × sin 35° = 0.86 → r ≈ 59°) or forgetting to take inverse sine. Unit check: refractive indices are dimensionless, angles in degrees, final answer in degrees.

## DIAGNOSTIC_QUESTION_4
A student performs the glass slab experiment and obtains the following data for sin i and sin r:

| sin i | 0.20 | 0.40 | 0.60 | 0.80 |
| sin r | 0.13 | 0.26 | 0.39 | 0.52 |

Plot sin i vs sin r mentally. What does the slope represent? If the student accidentally swapped the axes (plotting sin r on y-axis and sin i on x-axis), what would the slope represent then?

## DIAGNOSTIC_ANSWER_4
The data shows sin i / sin r = 0.20/0.13 ≈ 1.54 (constant). Plotting sin i (y) vs sin r (x) gives a straight line through origin with slope = n₂₁ = n_glass/n_air ≈ 1.54. If axes are swapped (sin r vs sin i), the slope becomes 1/n₂₁ = n₁₂ ≈ 0.65. A student who says the slope is always n₂₁ regardless of axes does not understand that slope = Δy/Δx. This tests whether they can interpret graphical representation of Snell's law and the reciprocal relationship between relative refractive indices.

## DIAGNOSTIC_QUESTION_5
A ray of light passes from medium A (n = 1.6) to medium B (n = 1.2). The angle of incidence is 40°. A student calculates the angle of refraction as 60°. Evaluate this answer. Is it physically possible? If not, what phenomenon occurs instead?

## DIAGNOSTIC_ANSWER_5
The calculation gives sin r = (n_A/n_B) sin i = (1.6/1.2) × sin 40° = 1.333 × 0.6428 = 0.857. Then r = sin⁻¹(0.857) ≈ 59°. The student's 60° is close but not exact. However, the critical angle for this interface is sin⁻¹(n_B/n_A) = sin⁻¹(1.2/1.6) = sin⁻¹(0.75) = 48.6°. Since i = 40° < 48.6°, refraction does occur and the answer is physically possible (ray bends away from normal). If the student had used i = 50°, then sin r > 1, which is impossible, and total internal reflection would occur. A wrong evaluation that says "60° is impossible because sin r > 1" reveals the student didn't check the critical angle condition or miscalculated n_A/n_B.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a laser pointer, a semicircular glass block, and a protractor to verify Snell's law and determine the refractive index of glass. Describe how you would ensure the incident ray passes through the centre of the flat face, and why this geometry avoids refraction at the curved surface.

## DIAGNOSTIC_ANSWER_6
Place the semicircular block on a protractor with its flat face along the 0°-180° line and its centre at the protractor's centre. Direct the laser at the centre of the flat face at various angles of incidence. The ray enters undeviated at the flat face (normal incidence? No — wait: if the ray hits the flat face at an angle, it refracts. But if we want to measure refraction at the curved surface? Actually, standard method: send ray through curved surface towards centre, so it hits flat face at normal incidence and exits undeviated. Then rotate the block to change angle at curved surface. Better: Place the flat face on the protractor baseline, shine laser at the centre of the flat face at angle i. The ray refracts into glass, travels straight to the curved surface, and exits along the radius (normal to curved surface), so no refraction at exit. Measure the angle of the emergent ray (which equals r inside the glass). Plot sin i vs sin r. The geometry ensures the ray inside the glass is along a radius, so it meets the curved surface normally (angle of incidence = 0) and exits without bending. A poor answer would miss the "radius-normal" reasoning or suggest measuring at the curved surface directly.

## COMMON_MISCONCEPTION
Students often believe that "optically denser" means "higher mass density". They argue that since turpentine (mass density ~0.87 g/cm³) floats on water (1.0 g/cm³), turpentine must be optically rarer. In reality, turpentine has a higher refractive index (1.47) than water (1.33), so it is optically denser — light travels slower in turpentine. The misconception arises from confusing mass density (mass/volume) with optical density (c/v). Another error: students write Snell's law as sin i / sin r = n₁/n₂ (swapping the indices) because they memorize "n₁ sin i = n₂ sin r" but don't understand that n₂₁ = n₂/n₁ = sin i / sin r.

## ON_FAILURE
If a student confuses optical vs mass density, have them measure the speed of light in different media using the formula v = c/n and compare with mass density tables. For the index-swapping error, make them derive n₂₁ = sin i / sin r from n = c/v and the wavefront diagram (Huygens' construction) step by step: (1) draw wavefronts in medium 1, (2) show time for wavefront to travel distance in medium 2, (3) equate the tangential components. Then re-do Diagnostic Question 2 and 4 with this derivation fresh in mind.

## PREREQUISITE_NODE_IDS
c10_phy_cbse_04_006, c10_phy_cbse_04_007, c12_phy_cbse_09_001, c11_math_cbse_03_003
## PREREQUISITE_REASONS
c10_phy_cbse_04_006: Class 10 introduced laws of refraction and Snell's law qualitatively; this node builds quantitative rigor.
c10_phy_cbse_04_007: Class 10 defined refractive index (relative and absolute); Class 12 extends to optical density vs mass density and reciprocal relations.
c12_phy_cbse_09_001: Sign convention and ray diagram rules from reflection are prerequisites for consistent ray tracing in refraction.
c11_math_cbse_03_003: Trigonometric functions (sine) are essential for Snell's law calculations and understanding the sine relationship.

## FORWARD_NODE_IDS
c12_phy_cbse_09_004, c12_phy_cbse_09_005, c12_phy_cbse_09_008
## FORWARD_REASONS
c12_phy_cbse_09_004: Total internal reflection is a direct consequence of Snell's law when n₁ > n₂ and i exceeds the critical angle.
c12_phy_cbse_09_005: Refraction at spherical surfaces uses Snell's law at each point on the curved interface with paraxial approximation.
c12_phy_cbse_09_008: Prism refraction applies Snell's law at two plane surfaces; minimum deviation derivation relies on n = sin((A+Dₘ)/2)/sin(A/2).

## CROSS_SUBJECT_PREREQS
c10_math_cbse_08_001, c11_math_cbse_03_003, c11_math_cbse_13_002
## CROSS_SUBJECT_REASONS
c10_math_cbse_08_001: Trigonometric ratios (sin, cos, tan) in right triangles are used to relate angles of incidence/refraction to the normal.
c11_math_cbse_03_003: Trigonometric functions for any angle (beyond 90°) allow handling of angles > 90° in advanced problems (e.g., grazing incidence).
c11_math_cbse_13_002: Algebraic methods of evaluating limits are used in deriving the lens maker's formula from Snell's law at spherical surfaces (small angle approximation sin θ ≈ θ).

## CHAIN_DESCRIPTION
c10_phy_cbse_04_006 -> c12_phy_cbse_09_003 -> c12_phy_cbse_09_004

## THIS_FORMULA
n₁ sin i = n₂ sin r  (Snell's law in terms of absolute refractive indices);  n₂₁ = sin i / sin r = n₂/n₁ = v₁/v₂  (relative refractive index)

## FORMULA_VARIABLES
n₁ = absolute refractive index of medium 1 (dimensionless), n₂ = absolute refractive index of medium 2 (dimensionless), i = angle of incidence measured from the normal (radian or degree), r = angle of refraction measured from the normal (radian or degree), v₁ = speed of light in medium 1 (m/s), v₂ = speed of light in medium 2 (m/s), n₂₁ = relative refractive index of medium 2 with respect to medium 1 (dimensionless)

## FORMULA_UNITS
dimensionless (refractive indices), radian or degree (angles), m/s (speed of light)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_08_001 | Trigonometric ratios (sin, cos, tan) are used to compute angles from Snell's law and to relate geometry of ray diagrams to right triangles.
c11_math_cbse_13_002 | Algebraic limit evaluation (sin θ ≈ θ for small θ) is used in deriving the refraction formula at spherical surfaces from Snell's law, connecting to the next node.
## PREREQ_CONCEPT
Understanding that light changes speed when crossing media, and that the frequency remains constant while wavelength changes proportionally to speed.

## PREREQ_BEFORE
The student must be able to draw a normal to a surface, measure angles from the normal, and compute sine of an angle using a calculator or tables.

## PREREQ_STUCK
If stuck, revisit Class 10 refraction experiments (c10_phy_cbse_04_006) and trigonometric ratios (c10_math_cbse_08_001). Practice drawing normals and measuring i and r on printed ray diagrams.

## WORKED_EXAMPLE_1
PROBLEM: A fisherman in Kerala looks into a river at a fish. The ray from the fish enters the water-air interface at an angle of refraction r = 30° in air. If the refractive index of water is 4/3, find the angle of incidence i in water. At what speed does light travel in water? (c = 3.00 × 10⁸ m/s)

STEPS:
- Step 1: Identify given: n_water = 4/3 ≈ 1.333, n_air = 1.00, r = 30° (in air), c = 3.00 × 10⁸ m/s. Find i (in water) and v_water.
- Step 2: Apply Snell's law at water-air interface. Light goes from water (medium 1) to air (medium 2). n₁ sin i = n₂ sin r → (4/3) sin i = 1 × sin 30°.
- Step 3: sin 30° = 0.5. So (4/3) sin i = 0.5 → sin i = 0.5 × 3/4 = 0.375.
- Step 4: i = sin⁻¹(0.375) = 22.0° (to one decimal). Speed in water: v = c/n = (3.00 × 10⁸) / (4/3) = 2.25 × 10⁸ m/s.
- Step 5: Check: i < r (22° < 30°), so ray bends away from normal when going from denser to rarer — correct. Speed in water < c — correct.

REASONING: Snell's law relates the angles in the two media via their refractive indices. The absolute refractive index gives the speed reduction factor. The ray bends away from the normal when entering a rarer medium (air), so the angle in air (r) must be larger than the angle in water (i).

ANSWER: Angle of incidence in water i = 22.0°; Speed of light in water = 2.25 × 10⁸ m/s.

## WORKED_EXAMPLE_2
PROBLEM: A rectangular glass slab (n = 1.5) is placed in a liquid of unknown refractive index n_L. A ray of light in the liquid strikes the slab at an angle of incidence 45°. The angle of refraction inside the glass is measured to be 30°. Find n_L. If the slab is now immersed in another liquid where n_L' = 1.6, will total internal reflection occur at the glass-liquid interface for the same angle of incidence (45°)? (Critical angle for glass-liquid interface: sin i_c = n_L'/n_glass)

STEPS:
- Step 1: Given: n_glass = 1.5, i = 45° (in liquid), r = 30° (in glass). Find n_L.
- Step 2: Apply Snell's law at liquid-glass interface: n_L sin i = n_glass sin r → n_L sin 45° = 1.5 sin 30°.
- Step 3: sin 45° = 1/√2 ≈ 0.7071, sin 30° = 0.5. So n_L × 0.7071 = 1.5 × 0.5 = 0.75 → n_L = 0.75 / 0.7071 ≈ 1.06.
- Step 4: For second liquid, n_L' = 1.6. Light now goes from glass (n=1.5) to liquid (n=1.6)? Wait: the ray is incident from liquid side at 45°. But the question says "for the same angle of incidence (45°)" — but now the incident medium is liquid (n=1.6) and the other medium is glass (n=1.5). So light goes from denser (liquid) to rarer (glass). Check critical angle: sin i_c = n_glass / n_liquid = 1.5 / 1.6 = 0.9375 → i_c = sin⁻¹(0.9375) ≈ 69.6°.
- Step 5: Given i = 45° < 69.6°, so total internal reflection does NOT occur; refraction happens.

REASONING: Snell's law applies at any plane interface. The relative refractive index determines the bending direction. Total internal reflection only occurs when light travels from optically denser to rarer medium AND angle of incidence exceeds critical angle. Here, n_liquid > n_glass, so liquid is denser. The critical angle is large (69.6°), and 45° is below it.

ANSWER: n_L ≈ 1.06. For n_L' = 1.6, critical angle ≈ 69.6°, so at i = 45° total internal reflection does not occur.

## WORKED_EXAMPLE_3
PROBLEM: A ray of light passes through three parallel slabs of different materials with refractive indices n₁ = 1.3, n₂ = 1.5, n₃ = 1.4, all in air (n₀ = 1.0). The ray enters the first slab from air at i₀ = 40°. Find the angle of emergence into air after the third slab. Show that the emergent ray is parallel to the incident ray but laterally displaced.

STEPS:
- Step 1: At air-slab1 interface: n₀ sin i₀ = n₁ sin i₁ → 1.0 × sin 40° = 1.3 sin i₁ → sin i₁ = 0.6428 / 1.3 = 0.4945 → i₁ = 29.6°.
- Step 2: At slab1-slab2 interface: n₁ sin i₁ = n₂ sin i₂ → 1.3 × 0.4945 = 1.5 sin i₂ → sin i₂ = 0.6428 / 1.5 = 0.4285 → i₂ = 25.4°.
- Step 3: At slab2-slab3 interface: n₂ sin i₂ = n₃ sin i₃ → 1.5 × 0.4285 = 1.4 sin i₃ → sin i₃ = 0.6428 / 1.4 = 0.4591 → i₃ = 27.3°.
- Step 4: At slab3-air interface: n₃ sin i₃ = n₀ sin i_emergent → 1.4 × 0.4591 = 1.0 × sin i_e → sin i_e = 0.6428 → i_e = 40.0°.
- Step 5: The emergent angle equals the incident angle (40°). The ray is parallel to the original direction. Lateral displacement occurs because each interface shifts the ray sideways; the total shift depends on slab thicknesses and angles.

REASONING: For multiple parallel interfaces, Snell's law gives n₀ sin i₀ = n₁ sin i₁ = n₂ sin i₂ = n₃ sin i₃ = n₀ sin i_e. The intermediate indices cancel out, so the final angle depends only on the initial and final media (both air). This is why a rectangular slab in air produces an emergent ray parallel to the incident ray.

ANSWER: Angle of emergence = 40.0° (parallel to incident ray). The ray is laterally displaced; the displacement magnitude requires slab thicknesses.

## COMPETENCY_QUESTION_1
QUESTION: A student claims: "If I immerse a glass slab (n=1.5) in a liquid of refractive index 1.5, the slab will become invisible because there is no refraction at the interfaces." Evaluate this claim. Is the slab completely invisible? What about reflections? What happens to a ray incident normally? What happens to a ray incident at 60°?

COMPETENCY: Interpreting physical situations using formulas and predicting outcomes from changing variables

STEPS:
- Step 1: Analyze the claim using Snell's law: n₁ sin i = n₂ sin r. If n₁ = n₂ = 1.5, then sin i = sin r → i = r for all angles.
- Step 2: No refraction means no bending, so the ray passes straight through as if the slab weren't there. The slab does not deviate light.
- Step 3: However, reflection still occurs at each interface because reflection depends on the refractive index contrast. If n₁ = n₂, the reflection coefficient (Fresnel equations) becomes zero — no reflection either. So for normal incidence, no reflection and no refraction → completely transparent.
- Step 4: For oblique incidence, even if n₁ = n₂, the reflection coefficient for s- and p-polarized light is zero only if the impedances match exactly (which they do if n and μ are same). So no reflection, no refraction → ray passes undeviated and without intensity loss.
- Step 5: But the slab has two surfaces. If the liquid fills the space perfectly and has exactly the same n, the slab is optically indistinguishable from the liquid. It becomes invisible.

ANSWER: The claim is correct. When n_slab = n_liquid, there is no refraction (i = r) and no reflection (reflection coefficient = 0) at either interface. The ray passes straight through without deviation or intensity loss for any angle of incidence. The slab becomes invisible. (In practice, exact index matching is difficult; impurities and surface roughness cause some scattering.)

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A ray of light travels from medium A (n_A = 1.8) to medium B (n_B = 1.2). The angle of incidence is 50°. (a) Calculate the angle of refraction. (b) Determine if total internal reflection occurs. (c) If the ray is reversed (travels from B to A at the same angle of 50° measured from the normal in B), what is the new angle of refraction in A? (d) Explain the physical reason for the difference in the two directions.

COMPETENCY: Unit analysis and dimensional reasoning, and predicting outcomes from changing variables

STEPS:
- Step 1: (a) A → B: n_A sin i_A = n_B sin r_B → 1.8 sin 50° = 1.2 sin r_B. sin 50° = 0.7660. sin r_B = (1.8/1.2) × 0.7660 = 1.5 × 0.7660 = 1.149.
- Step 2: sin r_B > 1, which is impossible. Therefore, refraction cannot occur. Total internal reflection occurs.
- Step 3: Critical angle i_c = sin⁻¹(n_B/n_A) = sin⁻¹(1.2/1.8) = sin⁻¹(0.6667) = 41.8°. Since i_A = 50° > 41.8°, TIR occurs.
- Step 4: (c) Reversed: B → A, i_B = 50°. n_B sin i_B = n_A sin r_A → 1.2 sin 50° = 1.8 sin r_A → sin r_A = (1.2/1.8) × 0.7660 = 0.6667 × 0.7660 = 0.5107 → r_A = sin⁻¹(0.5107) = 30.7°.
- Step 5: (d) Physical reason: TIR only happens when light goes from denser to rarer medium (higher n to lower n) and angle exceeds critical angle. In reverse direction (rarer to denser), refraction always occurs for any angle of incidence (0° to 90°) because sin r_A = (n_B/n_A) sin i_B ≤ n_B/n_A < 1. The asymmetry arises because the wave speed increases in the rarer medium, causing the wavefront to bend away from the normal; beyond a certain angle, the wave cannot propagate in the second medium.

ANSWER: (a) No real angle of refraction (sin r > 1). (b) Yes, total internal reflection occurs (i = 50° > i_c = 41.8°). (c) For reversed direction, r_A = 30.7°. (d) TIR requires light to travel from optically denser to rarer medium; in the reverse direction, light enters a denser medium where speed decreases, so refraction always occurs.

DIFFICULTY: hard