## ELI5
The ground-floor tap runs fiercer than the terrace one - depth is buying pressure. Hydrostatics: at depth h below the surface, the pressure is the surface value plus density times g times depth. The container's shape is irrelevant, the paradox that confused centuries: pressure cares only how far under the surface you are, never how wide the water above.

## DEFINITION
Hydrostatic pressure at a depth \(h\) in a fluid of uniform density \(\rho\) is the normal force per unit area exerted by the fluid column above that point, given by \(P = P_0 + \rho gh\), where \(P_0\) is the pressure at the free surface (often atmospheric pressure), \(g\) is acceleration due to gravity, and \(h\) is the vertical depth measured downward from the free surface. The SI unit is pascal (Pa) or N·m⁻².

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
Student can derive the pressure-depth relationship from force balance on a fluid element, compute absolute and gauge pressures at any depth in a static fluid, and explain why pressure depends only on vertical depth and not on container shape (hydrostatic paradox).

## SCOPE_BOUNDARY
Covers the variation of pressure with depth in an incompressible fluid at rest under uniform gravity. Derives \(P = P_0 + \rho gh\) and discusses gauge pressure. Does NOT cover pressure variation in compressible fluids (gases), accelerated fluids, or dynamic pressure in moving fluids (Bernoulli’s equation is in a later node).

## WALKTHROUGH
Observe a water tank in your home: the tap on the ground floor flows faster than the one on the terrace. This happens because water pressure increases with depth. Begin by drawing a vertical cylindrical fluid element of cross-section \(A\) and height \(h\). Identify forces: downward force \(P_1A\) on top face, upward force \(P_2A\) on bottom face, and weight \(mg = \rho Ahg\) acting downward. Apply equilibrium condition (net force = 0) to get \((P_2 - P_1)A = \rho Ahg\). Cancel \(A\) to obtain \(\Delta P = \rho gh\). Emphasize that \(A\) cancels out, proving pressure depends only on vertical height difference, not on container shape or cross-section.

Takeaway: mastery means deriving the depth law from a fluid element's equilibrium, separating absolute from gauge pressure, and explaining the hydrostatic paradox. Exam moves: find-the-pressure-at-depth questions and shape-paradox items. Check yourself: the area cancels in the derivation - that cancellation is the theorem, not an accident. Students miss it because the ocean's weight seems to matter, when the definition's balance is local: each column of fluid carries exactly the pressure of its own height, and a slender tube matches a lake at the same depth. Height, not shape, writes the pressure gauge.

## DIAGNOSTIC_QUESTION_1
State the formula for absolute pressure at depth \(h\) in a liquid of density \(\rho\) open to atmosphere, and give the SI unit of each term.

## DIAGNOSTIC_ANSWER_1
\(P = P_{\text{atm}} + \rho gh\). \(P\) and \(P_{\text{atm}}\) in Pa (N·m⁻²), \(\rho\) in kg·m⁻³, \(g\) in m·s⁻², \(h\) in m. A wrong answer (e.g., missing \(P_{\text{atm}}\) or using cm for \(h\)) reveals confusion between gauge and absolute pressure or unit inconsistency.

## DIAGNOSTIC_QUESTION_2
Why does the pressure at the bottom of a V-shaped vessel and a cylindrical vessel filled to the same height with the same liquid come out equal, even though the V-shaped vessel holds less liquid?

## DIAGNOSTIC_ANSWER_2
Pressure at a depth depends only on the vertical height of the fluid column above that point (\(P = P_0 + \rho gh\)), not on the total weight or shape of the container. The V-shaped vessel exerts the same pressure because the vertical depth is identical. A wrong answer citing total weight or volume indicates the student has not internalized the hydrostatic paradox and still thinks pressure = total weight / bottom area.

## DIAGNOSTIC_QUESTION_3
A diver is 15 m below the surface of a lake (density \(1000\ \text{kg·m}^{-3}\)). Atmospheric pressure is \(1.01 \times 10^5\ \text{Pa}\). Take \(g = 9.8\ \text{m·s}^{-2}\). Calculate (a) the gauge pressure and (b) the absolute pressure on the diver.

## DIAGNOSTIC_ANSWER_3
(a) Gauge pressure \(P_g = \rho gh = 1000 \times 9.8 \times 15 = 1.47 \times 10^5\ \text{Pa}\).  
(b) Absolute pressure \(P = P_{\text{atm}} + P_g = 1.01 \times 10^5 + 1.47 \times 10^5 = 2.48 \times 10^5\ \text{Pa}\).  
A wrong answer (e.g., forgetting to add atmospheric pressure, or using \(g=10\) without stating it) shows computational carelessness or confusion between gauge and absolute pressure.

## DIAGNOSTIC_QUESTION_4
Two points A and B are at the same horizontal level inside a continuous static fluid. Point A is under a wide section of the container, point B under a narrow tube. Compare the pressures at A and B and justify using the pressure-depth formula.

## DIAGNOSTIC_ANSWER_4
Pressures at A and B are equal. Since they are at the same horizontal level, their vertical depths \(h\) from the free surface are identical. By \(P = P_0 + \rho gh\), with same \(P_0\), \(\rho\), \(g\), and \(h\), \(P_A = P_B\). A wrong answer claiming higher pressure under the wider section reveals the misconception that pressure depends on the weight of fluid directly above the point rather than vertical depth.

## DIAGNOSTIC_QUESTION_5
A student argues: "If I double the cross-sectional area of the cylindrical element in the derivation, the weight doubles and the area doubles, so pressure should remain the same. But if I use a conical element instead, the slanted sides exert vertical forces, so the simple formula \(\Delta P = \rho gh\) might not hold." Evaluate this argument.

## DIAGNOSTIC_ANSWER_5
The argument is partially correct for the cylinder but wrong for the cone. For any shape, the net vertical force from pressure on the slanted sides exactly balances the extra weight, so \(\Delta P = \rho gh\) holds universally for static fluids. The student correctly sees the cylinder's area cancels but incorrectly assumes the formula fails for other shapes. This reveals a lack of understanding that the derivation using a cylinder is a special case of a general principle (Pascal's law + equilibrium).

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using household items to demonstrate that water pressure at the bottom of a container depends only on the height of the water column, not on the container's shape.

## DIAGNOSTIC_ANSWER_6
Take three plastic bottles of different shapes (wide, narrow, slanted) but same height. Cut off the bottoms and attach a thin rubber sheet with a small straw to each bottom. Fill each with water to the same height. Observe the water rise in the straws: they will reach the same height, showing equal pressure at the bottom. A poor answer (e.g., measuring flow rate from holes at different heights) confuses pressure with flow velocity and does not isolate the depth dependence.

## COMMON_MISCONCEPTION
Students often believe that pressure at the bottom of a container equals the total weight of the fluid divided by the bottom area (\(P = \frac{\text{total weight}}{A_{\text{bottom}}}\)). They think a V-shaped vessel exerts less pressure than a cylindrical one of the same height because it holds less water. This ignores the vertical component of force exerted by the slanted walls on the fluid, which adds to the bottom pressure. The misconception persists because the weight/area formula works accidentally for straight-walled cylinders.

## ON_FAILURE
If the student holds the weight/area misconception:  
1. Draw a free-body diagram of the fluid in a V-shaped vessel, showing forces on the slanted walls.  
2. Resolve the normal reaction from the walls into vertical components; show they add upward force on the fluid.  
3. Apply equilibrium: \(P_{\text{bottom}} A_{\text{bottom}} = \text{weight of fluid} + \text{vertical wall forces}\).  
4. Conclude \(P_{\text{bottom}} > \frac{\text{weight}}{A_{\text{bottom}}}\).  
5. Repeat for a cylinder (vertical walls → zero vertical wall force) to see why the simple formula works there.  
6. Finally, re-derive \(\Delta P = \rho gh\) using a vertical cylinder to reinforce the correct, universal formula.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_09_001, c11_phy_cbse_09_002, c8_physics_ch4_1, c8_physics_ch4_2, c9_physics_ch3_4
## PREREQUISITE_REASONS
c11_phy_cbse_09_001: Defines pressure as normal force per unit area and introduces pascal.  
c11_phy_cbse_09_002: Establishes Pascal's law (pressure same at same horizontal level) used in the derivation.  
c8_physics_ch4_1: Prior concept of pressure as force/area from Class 8.  
c8_physics_ch4_2: SI unit of pressure (pascal) from Class 8.  
c9_physics_ch3_4: Newton's second law (\(F=ma\)) for equilibrium of fluid element.

## FORWARD_NODE_IDS
c11_phy_cbse_09_004, c11_phy_cbse_09_005, c11_phy_cbse_09_006, c11_phy_cbse_09_007, c11_phy_cbse_09_008, c11_phy_cbse_09_011, c11_phy_cbse_09_013

## FORWARD_REASONS
c11_phy_cbse_09_004: Atmospheric pressure and gauge pressure directly use \(P = P_{\text{atm}} + \rho gh\).  
c11_phy_cbse_09_005: Hydraulic machines rely on pressure transmission and depth-independent pressure at same level.  
c11_phy_cbse_09_006: Buoyant force (Archimedes' principle) is derived from pressure difference on top and bottom surfaces of submerged object.
c11_phy_cbse_09_007: Equation of continuity (Av = constant) and streamline flow concept are essential for relating velocities at different cross-sections.  
c11_phy_cbse_09_008: Variation of Pressure with Depth — gives the hydrostatic pressure term ρgh used in Bernoulli's equation.  
c11_phy_cbse_09_011: Pressure variation with depth (P = Pa + ρgh) introduces density ρ and the concept of fluid properties varying with position.  
c11_phy_cbse_09_013: Supplies the hydrostatic pressure variation \( P = P_0 + \rho g h \) used to equate pressure at the meniscus (point A) and the free surface (point B).  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_01_001, c11_math_cbse_01_002
## CROSS_SUBJECT_REASONS
c11_math_cbse_01_001: Sets and functions used to define pressure as a scalar field \(P(h)\) varying with depth.  
c11_math_cbse_01_002: Relations and functions model the linear relationship \(P = P_0 + \rho gh\) between pressure and depth.

## CHAIN_DESCRIPTION
c11_phy_cbse_09_001 -> c11_phy_cbse_09_002 -> c11_phy_cbse_09_003 -> c11_phy_cbse_09_004 -> c11_phy_cbse_09_005

## THIS_FORMULA
\(P = P_0 + \rho gh\) (absolute pressure), \(\Delta P = \rho gh\) (gauge pressure difference between two depths)

## FORMULA_VARIABLES
\(P\) = absolute pressure at depth \(h\) (Pa), \(P_0\) = pressure at free surface (Pa), \(\rho\) = fluid density (kg·m⁻³), \(g\) = acceleration due to gravity (m·s⁻²), \(h\) = vertical depth below free surface (m)

## FORMULA_UNITS
Pa, kg·m⁻³, m·s⁻², m

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_01_001 | Pressure as a function of depth: \(P(h) = P_0 + \rho gh\) is a linear function mapping depth to pressure.  
c11_math_cbse_01_002 | The relation between pressure and depth is a linear relation with slope \(\rho g\) and intercept \(P_0\).

## PREREQ_CONCEPT
Equilibrium of forces on a fluid element (Newton's second law with \(a=0\)) and definition of density \(\rho = m/V\).

## PREREQ_BEFORE
Student must be able to draw free-body diagrams, resolve forces, and apply \(\Sigma F = 0\) for static equilibrium. Must know density formula and SI units.

## PREREQ_STUCK
Review Newton's second law for static equilibrium (Class 9, Chapter 3) and density definition (Class 11, Chapter 9, Section 9.2).

## WORKED_EXAMPLE_1
PROBLEM: A rectangular water tank in a house has a base area of \(2\ \text{m}^2\) and is filled to a height of \(3\ \text{m}\). The density of water is \(1000\ \text{kg·m}^{-3}\) and \(g = 9.8\ \text{m·s}^{-2}\). Atmospheric pressure is \(1.01 \times 10^5\ \text{Pa}\). Find (a) the gauge pressure at the bottom, (b) the absolute pressure at the bottom, (c) the total force exerted by water on the base.

STEPS:
- Step 1: Identify given: \(h = 3\ \text{m}\), \(\rho = 1000\ \text{kg·m}^{-3}\), \(g = 9.8\ \text{m·s}^{-2}\), \(P_{\text{atm}} = 1.01 \times 10^5\ \text{Pa}\), \(A = 2\ \text{m}^2\).
- Step 2: Gauge pressure formula: \(P_g = \rho gh\). Check units: \((\text{kg·m}^{-3})(\text{m·s}^{-2})(\text{m}) = \text{kg·m}^{-1}\text{s}^{-2} = \text{Pa}\).
- Step 3: Compute \(P_g = 1000 \times 9.8 \times 3 = 29,400\ \text{Pa} = 2.94 \times 10^4\ \text{Pa}\).
- Step 4: Absolute pressure: \(P = P_{\text{atm}} + P_g = 1.01 \times 10^5 + 2.94 \times 10^4 = 1.304 \times 10^5\ \text{Pa}\).
- Step 5: Force on base: \(F = P \times A\). Use absolute pressure because atmosphere also pushes down on the water surface, transmitting to base. \(F = 1.304 \times 10^5 \times 2 = 2.608 \times 10^5\ \text{N}\).
- Step 6: Verify reasonableness: Gauge pressure ~0.3 atm, absolute ~1.3 atm, force ~26 tonnes weight equivalent. Makes sense for a 3 m water column.

REASONING: Gauge pressure depends only on the water column; absolute pressure adds atmospheric pressure transmitted through the water. The total force on the base uses absolute pressure because the atmosphere contributes to the net downward force on the base via the water column.

ANSWER: (a) \(2.94 \times 10^4\ \text{Pa}\), (b) \(1.304 \times 10^5\ \text{Pa}\), (c) \(2.608 \times 10^5\ \text{N}\)

## WORKED_EXAMPLE_2
PROBLEM: A U-tube contains mercury (density \(13,600\ \text{kg·m}^{-3}\)). Water is poured into one arm to a height of \(20\ \text{cm}\) above the mercury-water interface. The other arm is open to atmosphere. Find the difference in mercury levels in the two arms. Take \(g = 9.8\ \text{m·s}^{-2}\).

STEPS:
- Step 1: Sketch: Left arm: water column (height \(h_w = 0.20\ \text{m}\)) on top of mercury. Right arm: mercury only, open to atmosphere. Let mercury level difference be \(\Delta h\) (right side higher).
- Step 2: Pressure at the mercury-water interface (left side) = \(P_{\text{atm}} + \rho_w g h_w\). Pressure at same horizontal level in right arm (inside mercury) = \(P_{\text{atm}} + \rho_{Hg} g \Delta h\).
- Step 3: By Pascal's law, pressures at same horizontal level in a continuous static fluid are equal: \(P_{\text{atm}} + \rho_w g h_w = P_{\text{atm}} + \rho_{Hg} g \Delta h\).
- Step 4: Cancel \(P_{\text{atm}}\) and \(g\): \(\rho_w h_w = \rho_{Hg} \Delta h\).
- Step 5: Solve: \(\Delta h = \frac{\rho_w}{\rho_{Hg}} h_w = \frac{1000}{13600} \times 0.20 = 0.0147\ \text{m} = 1.47\ \text{cm}\).
- Step 6: Check units: ratio of densities dimensionless, times meters gives meters. Mercury is denser, so level difference is small. Reasonable.

REASONING: The pressure at the interface must be equal from both sides. The water column adds pressure on the left; the mercury column difference balances it on the right. This is a classic manometer problem applying the hydrostatic pressure formula to two fluids.

ANSWER: \(1.47\ \text{cm}\) (mercury higher in the right arm)

## WORKED_EXAMPLE_3
PROBLEM: A submarine is at a depth of \(500\ \text{m}\) in sea water (density \(1030\ \text{kg·m}^{-3}\)). Its hatch is a circle of diameter \(1.2\ \text{m}\). The interior is maintained at 1 atm (\(1.01 \times 10^5\ \text{Pa}\)). Calculate the net force on the hatch. Take \(g = 9.8\ \text{m·s}^{-2}\).

STEPS:
- Step 1: Given: \(h = 500\ \text{m}\), \(\rho = 1030\ \text{kg·m}^{-3}\), \(g = 9.8\ \text{m·s}^{-2}\), \(P_{\text{in}} = 1.01 \times 10^5\ \text{Pa}\), hatch diameter \(d = 1.2\ \text{m}\) → radius \(r = 0.6\ \text{m}\), area \(A = \pi r^2 = \pi \times 0.36 = 1.131\ \text{m}^2\).
- Step 2: Outside absolute pressure: \(P_{\text{out}} = P_{\text{atm}} + \rho gh\). Use \(P_{\text{atm}} = 1.01 \times 10^5\ \text{Pa}\).
- Step 3: Compute \(\rho gh = 1030 \times 9.8 \times 500 = 5.047 \times 10^6\ \text{Pa}\).
- Step 4: \(P_{\text{out}} = 1.01 \times 10^5 + 5.047 \times 10^6 = 5.148 \times 10^6\ \text{Pa}\).
- Step 5: Net pressure on hatch (outside - inside) = gauge pressure at that depth = \(\rho gh = 5.047 \times 10^6\ \text{Pa}\). (Atmospheric pressure cancels because it acts on both sides.)
- Step 6: Net force \(F = P_{\text{gauge}} \times A = 5.047 \times 10^6 \times 1.131 = 5.71 \times 10^6\ \text{N}\).
- Step 7: Reasonableness: ~5.7 MN, equivalent to ~580 tonnes. Submarine hatches are heavily reinforced.

REASONING: The net force is due to gauge pressure because atmospheric pressure acts on both sides of the hatch (outside via water column, inside directly). The area is calculated from the diameter. The large force explains why deep-sea vessels need thick hatches.

ANSWER: \(5.71 \times 10^6\ \text{N}\) (directed inward)

## COMPETENCY_QUESTION_1
QUESTION: A cylindrical tank of height 10 m and cross-section 2 m² is filled with oil of density 800 kg·m⁻³. It stands on a weighing scale. The tank walls are massless. The scale reads the total weight of the oil. Now a vertical tube of cross-section 0.01 m² is attached to the top of the tank and filled with the same oil to an additional height of 5 m. The scale reading increases. Explain why the increase in scale reading is much larger than the weight of the oil added in the tube. Calculate the increase in scale reading.

COMPETENCY: Interpreting physical situations using formulas; Predicting outcomes from changing variables

STEPS:
- Step 1: Understand the system: The tube increases the effective depth of oil at the bottom of the tank from 10 m to 15 m.
- Step 2: Pressure at bottom before: \(P_1 = P_{\text{atm}} + \rho g (10)\). After: \(P_2 = P_{\text{atm}} + \rho g (15)\).
- Step 3: Increase in gauge pressure at bottom: \(\Delta P = \rho g (5) = 800 \times 9.8 \times 5 = 39,200\ \text{Pa}\).
- Step 4: This increased pressure acts on the entire base area of the tank (2 m²), not just the tube area.
- Step 5: Increase in force on base (scale reading increase) = \(\Delta P \times A_{\text{tank}} = 39,200 \times 2 = 78,400\ \text{N}\).
- Step 6: Weight of oil added in tube = \(\rho g \times \text{volume} = 800 \times 9.8 \times (0.01 \times 5) = 392\ \text{N}\).
- Step 7: The scale reading increases by 78,400 N, which is 200 times the weight of added oil (392 N). This is the hydrostatic paradox: pressure depends on depth, and the force on the large base multiplies the pressure increase.

ANSWER: Increase in scale reading = \(78,400\ \text{N}\) (or \(7.84 \times 10^4\ \text{N}\)). The increase is much larger than the added oil's weight (392 N) because the increased pressure acts on the whole base area.

DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: A dam holds back a reservoir of water. The dam is 50 m high and 200 m wide. The water depth is 45 m. Atmospheric pressure acts on both the water surface and the downstream face of the dam. (a) Derive an expression for the total horizontal force exerted by the water on the dam. (b) If the dam is made of concrete (density 2400 kg·m⁻³) and has a triangular cross-section with base width 30 m, check if the dam is safe against overturning by taking moments about the downstream toe. Assume no water seeps under the dam. Use \(g = 9.8\ \text{m·s}^{-2}\).

COMPETENCY: Unit analysis and dimensional reasoning; Combining concepts (pressure distribution, moment equilibrium)

STEPS:
- Step 1: Pressure varies linearly with depth: \(P(h) = \rho g h\) (gauge). At depth \(h\), force on a horizontal strip of width \(W = 200\ \text{m}\) and height \(dh\) is \(dF = P(h) \times W \times dh = \rho g h W dh\).
- Step 2: Integrate from \(h=0\) to \(h=45\ \text{m}\): \(F = \int_0^{45} \rho g W h dh = \frac{1}{2} \rho g W H^2\) where \(H=45\ \text{m}\).
- Step 3: Compute: \(F = 0.5 \times 1000 \times 9.8 \times 200 \times 45^2 = 1.9845 \times 10^9\ \text{N}\).
- Step 4: This force acts at the centroid of the pressure triangle, i.e., at \(h = H/3 = 15\ \text{m}\) from the bottom (or 30 m from surface).
- Step 5: Weight of dam: Cross-section area = \(0.5 \times 30 \times 50 = 750\ \text{m}^2\). Volume per meter length = 750 m³. Mass = \(2400 \times 750 = 1.8 \times 10^6\ \text{kg}\). Weight \(W = 1.764 \times 10^7\ \text{N}\) per meter length. For 200 m width, total weight = \(3.528 \times 10^9\ \text{N}\).
- Step 6: Center of gravity of triangular dam is at 1/3 base from the vertical face (upstream). Base = 30 m, so CG is 10 m from upstream face, i.e., 20 m from downstream toe.
- Step 7: Moment about downstream toe: Water force moment = \(F \times 15 = 1.9845 \times 10^9 \times 15 = 2.977 \times 10^{10}\ \text{N·m}\) (overturning). Weight moment = \(3.528 \times 10^9 \times 20 = 7.056 \times 10^{10}\ \text{N·m}\) (stabilizing).
- Step 8: Stabilizing moment > overturning moment (7.06e10 > 2.98e10). Dam is safe against overturning (factor of safety ~2.37).

ANSWER: (a) \(F = \frac{1}{2} \rho g W H^2 = 1.98 \times 10^9\ \text{N}\) acting at 15 m above base. (b) Overturning moment = \(2.98 \times 10^{10}\ \text{N·m}\), Stabilizing moment = \(7.06 \times 10^{10}\ \text{N·m}\). Dam is safe.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: ______ a water tank in your home: the tap on the ground floor flows faster than the one on the terrace.

## DIAGNOSTIC_ANSWER_7
Observe

**A wrong answer ("Imagine" or "Picture") reveals the student has swapped the walkthrough's opener - observe a water tank in your home.** Observe is the walkthrough's own opening word, and the word is what the blank grades. Recall the faster ground-floor tap before filling, and fill the word exactly as written.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
Student can derive the pressure-depth relationship from force balance on a fluid element, compute absolute and gauge pressures at any depth in a static fluid, and explain why pressure depends only on vertical depth and not on container shape (hydrostatic paradox).
