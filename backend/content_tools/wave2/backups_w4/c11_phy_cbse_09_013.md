## ELI5
Water climbs a thin straw; mercury sulks and sinks - capillarity, priced by surface tension. The rise follows h = 2S cos θ over ρgr: wider tube, smaller climb; friendly contact angle, climb; unfriendly, depression. The sign of cos θ is the whole verdict, and the balance is struck between the meniscus pressure jump and the weight of the lifted column.

## DEFINITION
Capillary rise is the phenomenon where a liquid ascends or descends in a narrow tube (capillary) due to the pressure difference across a curved meniscus caused by surface tension. The ascent formula \( h = \frac{2S \cos\theta}{\rho g r} \) gives the equilibrium height \( h \) (m) of the liquid column, where \( S \) is the surface tension (N/m), \( \theta \) is the contact angle (rad or °), \( \rho \) is the liquid density (kg/m³), \( g \) is acceleration due to gravity (m/s²), and \( r \) is the internal radius of the capillary tube (m). The formula assumes a uniform cylindrical tube, a hemispherical meniscus, and negligible tube length compared to the reservoir.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can calculate the capillary rise or depression for any liquid-tube combination given the physical parameters, correctly interpret the sign of \( h \) based on the contact angle, and explain why the rise is inversely proportional to the tube radius. They can also rearrange the formula to determine an unknown parameter (e.g., surface tension or contact angle) from experimental measurements.

## SCOPE_BOUNDARY
This node covers the static equilibrium derivation of the ascent formula using pressure balance across the meniscus and hydrostatic pressure variation. It includes applications to water (concave meniscus, rise) and mercury (convex meniscus, depression). It does NOT cover dynamic capillary rise (Washburn equation), non-circular cross-sections, temperature dependence of surface tension, or the effect of very wide tubes where the meniscus shape deviates from spherical.

## WALKTHROUGH
Observe a glass thermometer or a thin straw dipped in water: the water climbs up the tube, defying gravity. This is capillary rise. Now dip the same tube in mercury: the mercury level goes *down* inside the tube. Why? Recall from **c11_phy_cbse_09_012** that a curved liquid surface creates a pressure difference \( \Delta P = \frac{2S}{R} \) (Laplace pressure). The meniscus curvature radius \( R \) relates to the tube radius \( r \) by \( R = \frac{r}{\cos\theta} \) (from **c11_phy_cbse_09_014**). At the meniscus (point A), the pressure on the liquid side is lower than atmospheric for a concave meniscus (water) and higher for a convex meniscus (mercury). Using **c11_phy_cbse_09_003**, the hydrostatic pressure at the same horizontal level outside the tube (point B) is \( P_0 + \rho g h \). Equating pressures at A and B gives the ascent formula. The key is recognizing that the *sign* of \( \cos\theta \) determines rise (+) or fall (-).

Takeaway: mastery means computing rise or depression from the formula, reading the contact angle's sign, and rearranging for an unknown like surface tension. Exam moves: find-the-rise questions and why-does-it-fall items. Check yourself: the tube's length and immersion depth never enter - only radius, tension, density and angle vote. Students miss it because they expect the dipped depth to matter, when the definition's balance is struck at the meniscus: the pressure jump sets the height, and a narrower tube climbs higher on the same tension budget.

## DIAGNOSTIC_QUESTION_1
State the capillary ascent formula and define each variable with its SI unit. Why does the formula contain \( \cos\theta \) instead of \( \sin\theta \) or \( \theta \) directly?

## DIAGNOSTIC_ANSWER_1
The formula is \( h = \frac{2S \cos\theta}{\rho g r} \). Variables: \( h \) (capillary rise, m), \( S \) (surface tension, N/m), \( \theta \) (contact angle, rad/°), \( \rho \) (density, kg/m³), \( g \) (gravity, m/s²), \( r \) (tube radius, m). \( \cos\theta \) appears because the radius of curvature of the meniscus is \( R = r / \cos\theta \); the vertical component of the surface tension force supporting the column is \( 2\pi r S \cos\theta \). A wrong answer (e.g., using \( \sin\theta \) or omitting \( \cos\theta \)) reveals the student memorized the formula without understanding the geometric projection of the meniscus curvature onto the tube axis.

## DIAGNOSTIC_QUESTION_2
Water rises in a clean glass capillary tube, but mercury falls in the same tube. Using the concept of contact angle and pressure balance, explain why the *sign* of \( h \) is opposite for these two liquids.

## DIAGNOSTIC_ANSWER_2
For water-glass, \( \theta \approx 0^\circ \) (acute), so \( \cos\theta > 0 \). The meniscus is concave (curved upward), making the pressure on the liquid side *lower* than atmospheric by \( \frac{2S}{R} \). To balance, the liquid must rise to increase hydrostatic pressure at the base. For mercury-glass, \( \theta \approx 140^\circ \) (obtuse), so \( \cos\theta < 0 \). The meniscus is convex (curved downward), making the pressure on the liquid side *higher* than atmospheric. The liquid descends until the reduced hydrostatic pressure balances the excess. A student who says "mercury is heavier so it falls" confuses density (which affects magnitude) with the *direction* determined solely by the sign of \( \cos\theta \).

## DIAGNOSTIC_QUESTION_3
A glass capillary tube of internal diameter 0.40 mm is dipped vertically in water at 20°C. Given \( S = 0.072 \, \text{N/m} \), \( \theta = 0^\circ \), \( \rho = 1000 \, \text{kg/m}^3 \), and \( g = 9.8 \, \text{m/s}^2 \), calculate the capillary rise. Express your answer in cm.

## DIAGNOSTIC_ANSWER_3
**Given:** \( d = 0.40 \, \text{mm} = 0.40 \times 10^{-3} \, \text{m} \), so \( r = 0.20 \times 10^{-3} \, \text{m} \). \( S = 0.072 \, \text{N/m} \), \( \cos 0^\circ = 1 \), \( \rho = 1000 \, \text{kg/m}^3 \), \( g = 9.8 \, \text{m/s}^2 \).
**Formula:** \( h = \frac{2S \cos\theta}{\rho g r} \)
**Substitute:** \( h = \frac{2 \times 0.072 \times 1}{1000 \times 9.8 \times 0.20 \times 10^{-3}} \)
**Compute:** Numerator = 0.144 N/m. Denominator = \( 1000 \times 9.8 \times 2 \times 10^{-4} = 1.96 \, \text{N/m}^2 \).
\( h = \frac{0.144}{1.96} = 0.07347 \, \text{m} = 7.35 \, \text{cm} \).
**Unit check:** \( \frac{\text{N/m}}{(\text{kg/m}^3)(\text{m/s}^2)(\text{m})} = \frac{\text{kg·m/s}^2/\text{m}}{\text{kg/(m·s}^2)} = \text{m} \). Correct.
A wrong answer (e.g., 14.7 cm) indicates the student used diameter instead of radius. An answer of 0.735 cm suggests a unit conversion error (mm to m).

## DIAGNOSTIC_QUESTION_4
Two capillary tubes of radii \( r_1 = 0.1 \, \text{mm} \) and \( r_2 = 0.2 \, \text{mm} \) are dipped in the same liquid. The rise in the first tube is \( h_1 \). Without calculating \( h_1 \), determine the ratio \( h_2/h_1 \). If the liquid is replaced by another with twice the surface tension and half the density (contact angle unchanged), what is the new ratio \( h_2'/h_1' \)?

## DIAGNOSTIC_ANSWER_4
From \( h \propto 1/r \), \( h_2/h_1 = r_1/r_2 = 0.1/0.2 = 0.5 \). The ratio is independent of \( S \), \( \rho \), and \( \theta \) because they cancel out. For the new liquid, \( S' = 2S \), \( \rho' = \rho/2 \), so \( h' \propto S'/\rho' = (2S)/(\rho/2) = 4(S/\rho) \). Both \( h_1' \) and \( h_2' \) increase by a factor of 4, so the ratio \( h_2'/h_1' = h_2/h_1 = 0.5 \) remains unchanged. A student who claims the ratio changes has not recognized that the liquid properties scale both heights equally.

## DIAGNOSTIC_QUESTION_5
A student calculates the capillary rise of water in a tube of radius 0.5 mm and gets \( h = 2.94 \, \text{cm} \). They used \( S = 0.072 \, \text{N/m} \), \( \rho = 1000 \, \text{kg/m}^3 \), \( g = 9.8 \, \text{m/s}^2 \), \( \theta = 0^\circ \). Is their answer correct? If not, identify the error.

## DIAGNOSTIC_ANSWER_5
**Correct calculation:** \( r = 0.5 \times 10^{-3} \, \text{m} \). \( h = \frac{2 \times 0.072 \times 1}{1000 \times 9.8 \times 0.5 \times 10^{-3}} = \frac{0.144}{4.9} = 0.02939 \, \text{m} = 2.94 \, \text{cm} \). The student's answer **is correct**. A student who flags this as wrong might have mistakenly used diameter (1 mm) giving 1.47 cm, or mis-calculated the denominator. This question tests careful evaluation of a given solution rather than assuming an error exists.

## DIAGNOSTIC_QUESTION_6
Design a simple laboratory experiment to determine the surface tension of an unknown liquid using the capillary rise method. List the measurements needed, the equipment required, and the formula you would use. How would you ensure the contact angle is known or negligible?

## DIAGNOSTIC_ANSWER_6
**Equipment:** Capillary tubes of known radii (measured with a travelling microscope), a beaker, the unknown liquid, a ruler or cathetometer for height measurement, thermometer. **Measurements:** Capillary rise \( h \), tube radius \( r \), liquid density \( \rho \) (via specific gravity bottle), temperature, and contact angle \( \theta \) (using a goniometer or assuming \( \theta \approx 0^\circ \) for pure water in clean glass). **Formula:** \( S = \frac{h \rho g r}{2 \cos\theta} \). **Ensuring \( \theta \)):** Clean the tube thoroughly with chromic acid and rinse with distilled water to ensure \( \theta \approx 0^\circ \) for water. For other liquids, measure \( \theta \) independently using a sessile drop method. A poor answer omits radius measurement, ignores temperature control, or assumes \( \cos\theta = 1 \) without justification.

## COMMON_MISCONCEPTION
**Misconception:** "Capillary rise depends on the *length* of the tube immersed in the liquid or the *total length* of the tube." **Wrong Reasoning:** Students visualize the liquid "climbing" the wall and think a longer tube provides more surface for adhesion, or that immersing the tube deeper gives more "push." **Reality:** The rise height \( h \) is determined solely by the balance between the vertical component of surface tension force (\( 2\pi r S \cos\theta \)) and the weight of the raised column (\( \pi r^2 h \rho g \)). The tube length and immersion depth do not appear in the force balance. If the tube is shorter than \( h \), the liquid rises to the top and the meniscus adjusts its curvature (radius increases) to reduce the pressure difference, but the *equilibrium height* for an infinitely long tube is still given by the formula.

## ON_FAILURE
If a student believes tube length matters: (1) Perform a demo with two tubes of same radius but different lengths (e.g., 5 cm and 15 cm) dipped in the same water. Show the water rises to the *same height* in both. (2) Derive the formula again from force balance: Upward force = \( 2\pi r S \cos\theta \) (acts only at the contact line). Downward force = weight of column = \( \pi r^2 h \rho g \). Equate: \( h = \frac{2S \cos\theta}{\rho g r} \). Point out that neither the tube length nor immersion depth appears. (3) Ask: "If the tube is only 2 cm long but the calculated \( h \) is 5 cm, what happens?" Guide them to understand the meniscus flattens (R increases) until the pressure difference matches the available hydrostatic head.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_09_012, c11_phy_cbse_09_014, c11_phy_cbse_09_003
## PREREQUISITE_REASONS
c11_phy_cbse_09_012: Provides the concept of surface tension (S) and the excess pressure formula \( \Delta P = 2S/R \) for a spherical meniscus.
c11_phy_cbse_09_014: Defines contact angle (θ) and its role in determining meniscus shape (concave/convex) and the geometric relation \( R = r/\cos\theta \).
c11_phy_cbse_09_003: Supplies the hydrostatic pressure variation \( P = P_0 + \rho g h \) used to equate pressure at the meniscus (point A) and the free surface (point B).

## FORWARD_NODE_IDS

## FORWARD_REASONS

## CROSS_SUBJECT_PREREQS
c10_math_cbse_08_001, c6_math_ch05_056
## CROSS_SUBJECT_REASONS
c10_math_cbse_08_001: Trigonometric ratio \( \cos\theta \) determines the sign and magnitude of capillary rise; understanding its behavior for acute (\( \cos\theta > 0 \)) vs obtuse (\( \cos\theta < 0 \)) angles is essential.
c6_math_ch05_056: The ascent formula is a linear equation in \( h \); solving for any variable (e.g., finding \( r \) given \( h \)) requires algebraic manipulation of linear equations.

## CHAIN_DESCRIPTION
c11_phy_cbse_09_012 (Surface Tension) → c11_phy_cbse_09_014 (Angle of Contact) → c11_phy_cbse_09_013 (Capillary Rise) → c11_phy_cbse_09_014 (Advanced Angle of Contact applications)

## THIS_FORMULA
\( h = \frac{2S \cos\theta}{\rho g r} \)  (SI units: h in m, S in N/m, θ in rad/°, ρ in kg/m³, g in m/s², r in m)

## FORMULA_VARIABLES
\( h \) = capillary rise height (m), \( S \) = surface tension of liquid (N/m), \( \theta \) = contact angle between liquid and tube material (degree or radian), \( \rho \) = density of liquid (kg/m³), \( g \) = acceleration due to gravity (m/s²), \( r \) = internal radius of capillary tube (m).

## FORMULA_UNITS
m, N/m, kg/m³, m/s², m

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_08_001 | The contact angle θ appears inside a cosine function; students must evaluate cosθ for angles like 0°, 30°, 60°, 140° and understand how the sign of cosθ dictates rise (+) or depression (-).
c6_math_ch05_056 | Rearranging the formula to solve for unknowns (e.g., r = 2S cosθ / ρgh) is a direct application of solving linear equations in one variable.

## PREREQ_CONCEPT
Pressure difference across a curved liquid surface (Laplace pressure: \( \Delta P = 2S/R \)) and hydrostatic pressure variation with depth (\( \Delta P = \rho g h \)).

## PREREQ_BEFORE
Student must be able to state the excess pressure inside a spherical meniscus and write the hydrostatic pressure at a depth h in a fluid at rest.

## PREREQ_STUCK
Revisit the derivation of excess pressure for a spherical surface (Surface Tension node) and the pressure-depth relationship (Pressure with Depth node). Draw the free-body diagram of the liquid column.

## WORKED_EXAMPLE_1
**PROBLEM:** A clean glass capillary tube of internal radius 0.15 mm is dipped vertically in pure water at 25°C. The water rises to a height of 9.8 cm. Given the density of water is 997 kg/m³ and g = 9.8 m/s², calculate the surface tension of water. Assume contact angle θ = 0°.

**STEPS:**
- **Step 1:** Identify given quantities with units. \( r = 0.15 \, \text{mm} = 0.15 \times 10^{-3} \, \text{m} \), \( h = 9.8 \, \text{cm} = 0.098 \, \text{m} \), \( \rho = 997 \, \text{kg/m}^3 \), \( g = 9.8 \, \text{m/s}^2 \), \( \theta = 0^\circ \Rightarrow \cos\theta = 1 \). Find: \( S \) (N/m).
- **Step 2:** Write the ascent formula and rearrange for S. \( h = \frac{2S \cos\theta}{\rho g r} \Rightarrow S = \frac{h \rho g r}{2 \cos\theta} \).
- **Step 3:** Substitute values with units. \( S = \frac{(0.098) \times (997) \times (9.8) \times (0.15 \times 10^{-3})}{2 \times 1} \).
- **Step 4:** Compute stepwise. Numerator: \( 0.098 \times 997 = 97.706 \). \( 97.706 \times 9.8 = 957.5188 \). \( 957.5188 \times 0.15 \times 10^{-3} = 0.14362782 \). Divide by 2: \( S = 0.07181391 \, \text{N/m} \).
- **Step 5:** Round to significant figures (2 sig figs from r and h): \( S \approx 0.072 \, \text{N/m} \). Check: Standard value for water at 25°C is ~0.072 N/m. Physically reasonable.

**REASONING:** This example uses the formula "backwards" to find surface tension from a measurable rise height. The key is recognizing that for water in clean glass, θ ≈ 0° is a standard approximation. The unit analysis confirms N/m: (m × kg/m³ × m/s² × m) = kg/s² = N/m.

**ANSWER:** \( S = 0.072 \, \text{N/m} \) (or \( 7.2 \times 10^{-2} \, \text{N/m} \)).

## WORKED_EXAMPLE_2
**PROBLEM:** Mercury is poured into a U-tube where one limb is a capillary tube of radius 0.50 mm and the other limb is wide. The mercury level in the capillary limb is observed to be 1.8 cm *below* the level in the wide limb. Given density of mercury = 13,600 kg/m³, surface tension = 0.465 N/m, g = 9.8 m/s², find the contact angle of mercury with glass.

**STEPS:**
- **Step 1:** Identify given. Capillary depression \( h = -1.8 \, \text{cm} = -0.018 \, \text{m} \) (negative because it's a fall). \( r = 0.50 \times 10^{-3} \, \text{m} \), \( \rho = 13600 \, \text{kg/m}^3 \), \( S = 0.465 \, \text{N/m} \), \( g = 9.8 \, \text{m/s}^2 \). Find: \( \theta \).
- **Step 2:** Use formula \( h = \frac{2S \cos\theta}{\rho g r} \). Rearrange for \( \cos\theta \): \( \cos\theta = \frac{h \rho g r}{2S} \).
- **Step 3:** Substitute. \( \cos\theta = \frac{(-0.018) \times 13600 \times 9.8 \times (0.50 \times 10^{-3})}{2 \times 0.465} \).
- **Step 4:** Compute numerator: \( -0.018 \times 13600 = -244.8 \). \( -244.8 \times 9.8 = -2399.04 \). \( -2399.04 \times 0.5 \times 10^{-3} = -1.19952 \). Denominator: \( 0.93 \). \( \cos\theta = \frac{-1.19952}{0.93} = -1.2898 \).
- **Step 5:** **Error check!** \( \cos\theta \) cannot be less than -1. Re-examine inputs. The given depression 1.8 cm is too large for r=0.5mm. Typical depression for Hg in 0.5mm tube is ~0.5 cm. The problem data is inconsistent. *Correction for pedagogy:* Assume the observed depression is 0.50 cm. Then \( h = -0.0050 \, \text{m} \). Numerator = \( -0.005 \times 13600 \times 9.8 \times 0.5 \times 10^{-3} = -0.3332 \). \( \cos\theta = -0.3332 / 0.93 = -0.358 \). \( \theta = \cos^{-1}(-0.358) \approx 111^\circ \). This is physically reasonable (literature value ~140° for clean glass, but contamination reduces it).

**REASONING:** This example tests the sign convention (depression → negative h) and the physical constraint \( -1 \leq \cos\theta \leq 1 \). The initial inconsistent data forces the student to verify physical plausibility, a critical exam skill.

**ANSWER:** With corrected \( h = -0.50 \, \text{cm} \), \( \theta \approx 111^\circ \). (Note: Standard value for clean Hg-glass is ~140°; the difference indicates surface contamination).

## WORKED_EXAMPLE_3
**PROBLEM:** A capillary tube of radius \( r \) gives a water rise of 6.0 cm. The tube is then cut to a length of 4.0 cm and dipped vertically in the same water. (a) What is the height of the water column in the tube? (b) What is the shape of the meniscus? (c) If the tube is now inclined at 60° to the vertical, what is the length of the water column along the tube? (Assume θ = 0°, S, ρ, g constant).

**STEPS:**
- **Step 1:** Analyze the equilibrium condition. The theoretical rise for an infinite tube is \( h_0 = 6.0 \, \text{cm} \). The tube length \( L = 4.0 \, \text{cm} < h_0 \).
- **Step 2:** (a) The water rises to the top of the tube (4.0 cm) and stops. It does *not* overflow because the meniscus adjusts its curvature to reduce the pressure difference. The height of the column is \( h = L = 4.0 \, \text{cm} \).
- **Step 3:** (b) The meniscus becomes *less curved* (larger radius of curvature R) than the hemispherical shape. Since \( \Delta P = 2S/R = \rho g h \), and h is now smaller (4 cm vs 6 cm), R must increase. The meniscus is still concave but flatter.
- **Step 4:** (c) For an inclined tube, the *vertical height* of the column remains the same (4.0 cm) because the pressure balance depends on vertical height. The length along the tube \( l \) is given by \( h = l \cos\alpha \), where \( \alpha = 60^\circ \) is the angle with vertical.
- **Step 5:** Compute \( l = h / \cos 60^\circ = 4.0 \, \text{cm} / 0.5 = 8.0 \, \text{cm} \).
- **Step 6:** Verify: The tube must be at least 8.0 cm long to accommodate this column. Since the tube is only 4.0 cm long, this scenario is impossible *if the tube is sealed at the top*. If open, water would overflow. Assuming the tube is long enough for (c), the length is 8.0 cm.

**REASONING:** This problem combines three concepts: (1) Capillary rise formula, (2) Meniscus adjustment when tube is shorter than equilibrium height (a classic NCERT "Points to Ponder" concept), and (3) Inclined tube geometry (trigonometry). It tests deep understanding that \( h \) in the formula is the *vertical* height of the column, not the tube length.

**ANSWER:** (a) 4.0 cm (water reaches the top). (b) Concave but flatter than hemispherical (radius of curvature > tube radius). (c) 8.0 cm (provided tube length ≥ 8.0 cm).

## COMPETENCY_QUESTION_1
**QUESTION:** A student performs a capillary rise experiment with water in a glass tube. They measure the rise \( h \) for tubes of different radii \( r \) and plot \( h \) vs \( 1/r \). The graph is a straight line passing through the origin with slope \( m \). (a) Derive the relationship between the slope \( m \) and the surface tension \( S \). (b) If the student repeats the experiment with the same tubes but uses a liquid that wets the glass *less* effectively (larger contact angle), how will the slope change? Justify. (c) The student forgets to convert radius from mm to m. How will this affect the calculated value of \( S \)?

**COMPETENCY:** Interpreting physical situations using formulas and graphical analysis; unit analysis and dimensional reasoning.

**STEPS:**
- **Step 1:** From \( h = \frac{2S \cos\theta}{\rho g} \cdot \frac{1}{r} \), identify that \( h \) vs \( 1/r \) is linear with slope \( m = \frac{2S \cos\theta}{\rho g} \).
- **Step 2:** Solve for \( S \): \( S = \frac{m \rho g}{2 \cos\theta} \).
- **Step 3:** For a liquid that wets less effectively, \( \theta \) increases (e.g., from 0° to 30°). \( \cos\theta \) decreases. Since \( m \propto \cos\theta \), the slope decreases. The graph becomes less steep.
- **Step 4:** If \( r \) is in mm but used as meters, the \( 1/r \) values are 1000× smaller. The slope \( m \) (which is \( \Delta h / \Delta(1/r) \)) becomes 1000× larger. Since \( S \propto m \), the calculated \( S \) will be 1000× too large.

**ANSWER:** (a) \( S = \frac{m \rho g}{2 \cos\theta} \). (b) Slope decreases because \( \cos\theta \) decreases as \( \theta \) increases from 0°. (c) Calculated \( S \) will be 1000 times the true value (since 1 mm = 10⁻³ m, using mm makes 1/r 1000× smaller, slope 1000× larger).

**DIFFICULTY:** medium

## COMPETENCY_QUESTION_2
**QUESTION:** Two capillary tubes A and B of radii \( r_A = 0.2 \, \text{mm} \) and \( r_B = 0.4 \, \text{mm} \) are connected at the bottom by a horizontal tube to form an inverted U-shape (like a siphon). The open ends are dipped into a large beaker of water (θ=0°). Describe the final water levels in the two vertical limbs. Calculate the difference in water levels between the two limbs. (ρ=1000 kg/m³, S=0.072 N/m, g=9.8 m/s²).

**COMPETENCY:** Predicting outcomes from changing variables; applying the concept to a non-standard geometry (connected capillaries).

**STEPS:**
- **Step 1:** Visualize the setup: Two vertical tubes of different radii connected at the bottom, both open at top and dipped in the same reservoir. The water in each tube will rise to its own equilibrium height \( h_A \) and \( h_B \) relative to the outside water level.
- **Step 2:** Since the bottoms are connected, the pressure at the bottom horizontal section must be the same. The pressure at the meniscus in tube A is \( P_0 - \frac{2S}{r_A} \) (concave). In tube B: \( P_0 - \frac{2S}{r_B} \).
- **Step 3:** The hydrostatic pressure at the bottom from tube A side: \( P_{bot} = (P_0 - \frac{2S}{r_A}) + \rho g h_A \). From tube B side: \( P_{bot} = (P_0 - \frac{2S}{r_B}) + \rho g h_B \).
- **Step 4:** But the menisci are at different heights. The pressure at the *outside* reservoir surface is \( P_0 \). The pressure at the meniscus in A is \( P_0 - \rho g h_A \) (since it's higher). Equating: \( P_0 - \rho g h_A = P_0 - \frac{2S}{r_A} \Rightarrow h_A = \frac{2S}{\rho g r_A} \). Similarly \( h_B = \frac{2S}{\rho g r_B} \).
- **Step 5:** The levels are independent! The connection at the bottom doesn't change the individual rises because both are referenced to the same external reservoir pressure \( P_0 \). The water levels in the two limbs will be different. The difference \( \Delta h = h_A - h_B \).
- **Step 6:** Calculate: \( h_A = \frac{2 \times 0.072}{1000 \times 9.8 \times 0.2 \times 10^{-3}} = 0.0735 \, \text{m} = 7.35 \, \text{cm} \). \( h_B = \frac{2 \times 0.072}{1000 \times 9.8 \times 0.4 \times 10^{-3}} = 0.0367 \, \text{m} = 3.67 \, \text{cm} \). \( \Delta h = 7.35 - 3.67 = 3.68 \, \text{cm} \).

**ANSWER:** Water rises to 7.35 cm in tube A (radius 0.2 mm) and 3.67 cm in tube B (radius 0.4 mm). The difference in levels is 3.68 cm. The narrower tube has a higher column.

**DIFFICULTY:** hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Capillary rise is the ______ where a liquid ascends or descends in a narrow tube (capillary) due to the pressure difference across a curved meniscus caused by surface tension.

## DIAGNOSTIC_ANSWER_7
phenomenon

**A wrong answer ("event" or "process") reveals the student has paraphrased the definition's noun - capillary rise is the phenomenon defined here.** Phenomenon is the definition's own headword, and the noun is what the blank grades. Recall the curved meniscus before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a glass ______ or a thin straw dipped in water: the water climbs up the tube, defying gravity.

## DIAGNOSTIC_ANSWER_8
thermometer

**A wrong answer ("tube" or "thermos") reveals the student has swapped the walkthrough's compound noun - the climbing water sits in a glass thermometer.** Thermometer is the walkthrough's own second half of that compound, and the noun is what the blank grades. Recall the thin straw companion before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_9
What is Capillary rise? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Capillary rise is the phenomenon where a liquid ascends or descends in a narrow tube (capillary) due to the pressure difference across a curved meniscus caused by surface tension.

**A wrong answer (any paraphrase) reveals the student has not quoted the definition.** The lesson's own sentence: capillary rise is the phenomenon where a liquid ascends or descends in a narrow tube due to the pressure difference across a curved meniscus caused by surface tension.

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Capillary rise?

## DIAGNOSTIC_ANSWER_10
The tube length and immersion depth do not appear in the force balance.

**A wrong answer ( tube length or depth included) reveals the student holds the flagged mix-up.** The force balance at the meniscus knows only surface tension, density, radius and the contact angle - the tube's length and how deep it was dipped simply do not appear in the equation.

## DIAGNOSTIC_QUESTION_11
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_11
They can also rearrange the formula to determine an unknown parameter (e.g., surface tension or contact angle) from experimental measurements.

**A wrong answer (one-way calculation only) reveals the student has under-answered the mastery criterion.** Full mastery adds: rearrange the ascent formula to extract an unknown such as surface tension or contact angle from measured rise data, and interpret the sign of the result as rise or depression.
