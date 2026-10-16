## ELI5
Pump a bicycle tyre on a Delhi winter morning and the gauge quietly disagrees with PV = nRT. The van der Waals equation repairs both failures: it corrects measured pressure upward by an attractions term for the pull molecules feel, and trims the container volume by nb for the space the molecules themselves occupy - (P + an²/V²)(V - nb) = nRT. Constant a measures the tug between molecules; constant b measures their bulk - each gas carrying its own pair.

## DEFINITION
The van der Waals equation is a modified gas law that accounts for the non-ideal behaviour of real gases by introducing two correction terms: a pressure correction term \(a\left(\frac{n}{V}\right)^2\) to account for intermolecular attractive forces, and a volume correction term \(nb\) to account for the finite volume occupied by gas molecules themselves. The complete equation is \(\left(P + a\frac{n^2}{V^2}\right)(V - nb) = nRT\), where \(a\) and \(b\) are van der Waals constants specific to each gas, \(P\) is pressure, \(V\) is volume, \(n\) is amount of substance, \(R\) is the universal gas constant, and \(T\) is absolute temperature.

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
The student must be able to: (1) derive the van der Waals equation from the ideal gas equation by identifying the physical basis for each correction term, (2) calculate pressure, volume, or temperature of a real gas using the equation with appropriate units, (3) interpret the physical significance of constants \(a\) and \(b\) and correlate them with molecular properties, and (4) explain the limitations of the van der Waals equation at very high pressures and very low temperatures.

## SCOPE_BOUNDARY
This node covers the derivation, application, and physical interpretation of the van der Waals equation for real gases including the pressure and volume correction terms, units and significance of constants \(a\) and \(b\), and calculation of gas properties under non-ideal conditions. It does NOT cover the Redlich-Kwong, Peng-Robinson, or other advanced equations of state, nor does it cover the derivation of critical constants from the van der Waals equation (which is beyond Class 11 scope).

## WALKTHROUGH
Begin with a real-world observation: when you pump air into a bicycle tyre, the pressure gauge reading deviates from what the ideal gas law predicts, especially on a cold winter morning in Delhi. Ask students to recall from c11_chem_cbse_05_010 that real gases deviate from ideal behaviour due to two factors: intermolecular forces and finite molecular volume. Connect this to the kinetic molecular theory (c11_chem_cbse_05_009) where ideal gas assumptions fail. Guide students to see that we need to "correct" the measured pressure \(P\) by adding a term for intermolecular attraction, and "correct" the container volume \(V\) by subtracting the volume occupied by molecules themselves. Show how van der Waals arrived at \(\left(P + \frac{an^2}{V^2}\right)(V - nb) = nRT\) by modifying \(PV = nRT\). End with the key insight: constant \(a\) reflects the strength of intermolecular forces (larger for polar/larger molecules), while constant \(b\) reflects molecular size (larger for bulky molecules).

Takeaway: mastery means deriving each correction term from the assumption it repairs, computing real-gas pressures with the right units, and reading the constants physically: larger a for stronger attractions, larger b for bulkier molecules, with the equation's own limits at very high pressures and very low temperatures. Exam moves: which-correction-and-why questions and compare-the-constants items. Check yourself: the winter-morning tyre is the anchor - a gauge the ideal law cannot quite predict. Students miss it because they memorise the equation's shape without its story, when every symbol marks a failed assumption: a patches the missing attractions, b patches the forgotten molecular volume.

## DIAGNOSTIC_QUESTION_1
State the van der Waals equation for 1 mole of a real gas and define each term with its SI units.

## DIAGNOSTIC_ANSWER_1
The van der Waals equation for 1 mole is \(\left(P + \frac{a}{V_m^2}\right)(V_m - b) = RT\), where \(P\) is pressure in Pa, \(V_m\) is molar volume in m³/mol, \(T\) is temperature in K, \(R = 8.314\ \text{J mol}^{-1}\text{K}^{-1}\), \(a\) is in Pa·m⁶·mol⁻² (or atm·L²·mol⁻²), and \(b\) is in m³/mol (or L/mol). A wrong answer reveals the student cannot distinguish between the extensive form (with \(n\)) and intensive molar form, or confuses the units of \(a\) (pressure × volume²/mol²) with \(b\) (volume/mol), indicating a lack of dimensional analysis practice.

## DIAGNOSTIC_QUESTION_2
Explain why the pressure correction term is added to the measured pressure \(P\) while the volume correction term is subtracted from the container volume \(V\) in the van der Waals equation.

## DIAGNOSTIC_ANSWER_2
The measured pressure \(P\) is lower than the ideal pressure because intermolecular attractions pull molecules inward, reducing wall collisions; thus we add \(\frac{an^2}{V^2}\) to recover the ideal pressure. The container volume \(V\) overestimates the free space available for molecular motion because molecules themselves occupy volume \(nb\); thus we subtract \(nb\) to get the effective free volume. A wrong answer (e.g., subtracting the pressure correction) reveals the student memorizes the equation without understanding the physical origin of each term from kinetic molecular theory.

## DIAGNOSTIC_QUESTION_3
Calculate the pressure exerted by 2.00 moles of CO₂ gas confined in a 1.00 L vessel at 300 K using the van der Waals equation. Given: \(a = 3.59\ \text{atm·L}^2\text{·mol}^{-2}\), \(b = 0.0427\ \text{L·mol}^{-1}\), \(R = 0.0821\ \text{atm·L·mol}^{-1}\text{·K}^{-1}\). Compare with the ideal gas pressure.

## DIAGNOSTIC_ANSWER_3
**Step 1:** Identify given: \(n = 2.00\ \text{mol}\), \(V = 1.00\ \text{L}\), \(T = 300\ \text{K}\), \(a = 3.59\ \text{atm·L}^2\text{·mol}^{-2}\), \(b = 0.0427\ \text{L·mol}^{-1}\), \(R = 0.0821\ \text{atm·L·mol}^{-1}\text{·K}^{-1}\).
**Step 2:** Write van der Waals equation: \(\left(P + \frac{an^2}{V^2}\right)(V - nb) = nRT\).
**Step 3:** Calculate correction terms: \(\frac{an^2}{V^2} = \frac{3.59 \times (2.00)^2}{(1.00)^2} = 14.36\ \text{atm}\); \(nb = 2.00 \times 0.0427 = 0.0854\ \text{L}\); \(V - nb = 1.00 - 0.0854 = 0.9146\ \text{L}\).
**Step 4:** Calculate \(nRT = 2.00 \times 0.0821 \times 300 = 49.26\ \text{atm·L}\).
**Step 5:** Solve for \(P\): \(P = \frac{nRT}{V - nb} - \frac{an^2}{V^2} = \frac{49.26}{0.9146} - 14.36 = 53.86 - 14.36 = 39.50\ \text{atm}\).
**Step 6:** Ideal gas pressure: \(P_{\text{ideal}} = \frac{nRT}{V} = \frac{49.26}{1.00} = 49.26\ \text{atm}\).
**Answer:** \(P_{\text{vdW}} = 39.5\ \text{atm}\), \(P_{\text{ideal}} = 49.3\ \text{atm}\). Deviation = 9.8 atm (20% lower). A wrong answer reveals errors in substitution order, unit inconsistency, or forgetting to square \(n\) in the pressure correction term.

## DIAGNOSTIC_QUESTION_4
Two gases X and Y have van der Waals constants: \(a_X = 1.39\ \text{atm·L}^2\text{·mol}^{-2}\), \(b_X = 0.0391\ \text{L·mol}^{-1}\); \(a_Y = 4.17\ \text{atm·L}^2\text{·mol}^{-2}\), \(b_Y = 0.0371\ \text{L·mol}^{-1}\). Which gas has stronger intermolecular forces? Which has larger molecular size? Predict which gas will show greater deviation from ideal behaviour at 50 atm and 300 K.

## DIAGNOSTIC_ANSWER_4
Gas Y has stronger intermolecular forces because \(a_Y > a_X\) (4.17 > 1.39). Gas X has slightly larger molecular size because \(b_X > b_Y\) (0.0391 > 0.0371). At 50 atm and 300 K, gas Y will show greater deviation because the pressure correction term \(\frac{an^2}{V^2}\) dominates at moderate pressures for gases with large \(a\), and Y's \(a\) is 3× larger. A wrong answer reveals the student cannot connect the magnitude of \(a\) to intermolecular force strength (from c11_chem_cbse_05_001/002) or misinterprets \(b\) as the dominant factor at all conditions.

## DIAGNOSTIC_QUESTION_5
A student calculates the pressure of 1 mole of N₂ at 400 K in 0.5 L using the van der Waals equation and gets a negative pressure. The constants are \(a = 1.39\ \text{atm·L}^2\text{·mol}^{-2}\), \(b = 0.0391\ \text{L·mol}^{-1}\). Identify the error in the student's approach and explain the physical limitation of the van der Waals equation exposed here.

## DIAGNOSTIC_ANSWER_5
The student likely used the equation correctly but the conditions (high density: \(V_m = 0.5\ \text{L/mol}\) close to \(b = 0.0391\ \text{L/mol}\)) push the equation beyond its validity. At such high pressures, the volume correction \(V - nb\) becomes very small, making \(\frac{nRT}{V-nb}\) huge, but the pressure correction \(\frac{an^2}{V^2}\) also becomes large. If \(V\) approaches \(nb\), the denominator \(V-nb \to 0\) causing \(P \to \infty\) mathematically, but the simple \(a/V^2\) attraction term cannot balance the strong repulsion at very short distances. The van der Waals equation fails at very high pressures because it assumes a constant \(b\) and a mean-field attraction term, ignoring molecular shape and repulsive forces at close contact. A wrong answer reveals the student treats the equation as universally valid without recognizing its domain of applicability.

## DIAGNOSTIC_QUESTION_6
Design an experiment to determine the van der Waals constants \(a\) and \(b\) for an unknown gas using only P-V-T measurements at constant temperature. Outline the graphical method and the calculations needed.

## DIAGNOSTIC_ANSWER_6
**Procedure:** Measure pressure \(P\) at several volumes \(V\) for a fixed amount \(n\) of gas at constant \(T\). **Graphical method:** Rearrange van der Waals equation to \(PV_m = RT + \left(b - \frac{a}{RT}\right)P + \cdots\) (virial expansion) or better: plot \(PV_m\) vs \(P\). At low pressures, \(PV_m = RT + \left(b - \frac{a}{RT}\right)P\). The intercept gives \(RT\), slope gives \(\left(b - \frac{a}{RT}\right)\). Repeat at 2-3 temperatures to get two equations for \(a\) and \(b\). Alternatively, use the critical constants method if critical point data is available: \(a = \frac{27R^2T_c^2}{64P_c}\), \(b = \frac{RT_c}{8P_c}\). **Criteria for good answer:** Recognizes need for multiple isotherms, uses virial expansion or critical constants, identifies that single isotherm cannot uniquely determine both constants. A poor answer suggests using only one P-V curve or ignores temperature dependence.

## COMMON_MISCONCEPTION
Students often write the van der Waals equation as \((P - \frac{an^2}{V^2})(V + nb) = nRT\), reversing both signs. They think: "attraction reduces pressure, so subtract from P" and "molecules take up space, so add to V". This is exactly backwards because the equation corrects the *measured* values to *ideal* values: measured \(P\) is too low (needs + correction), measured \(V\) is too high (needs - correction). Another error: using \(a\) and \(b\) values from tables without checking units (atm·L²·mol⁻² vs Pa·m⁶·mol⁻²) leading to 10⁵-fold errors in pressure calculations.

## ON_FAILURE
If a student reverses the signs: Have them derive the pressure correction from kinetic theory—molecules near the wall experience a net inward pull from neighbours, so they hit the wall with less momentum than ideal. The measured \(P\) is *less* than ideal \(P\), so ideal \(P = P_{\text{measured}} + \text{correction}\). For volume: draw a container with molecules as hard spheres. The center of a molecule cannot approach the wall closer than its radius, so the free volume for centers is \(V - nb\). Measured \(V\) includes molecular volume, so free volume = measured \(V - \text{correction}\). Practice unit conversion: \(1\ \text{atm·L}^2\text{·mol}^{-2} = 101325\ \text{Pa} \times (10^{-3}\ \text{m}^3)^2\text{·mol}^{-2} = 0.1013\ \text{Pa·m}^6\text{·mol}^{-2}\).

## PREREQUISITE_NODE_IDS
c11_chem_cbse_05_001, c11_chem_cbse_05_002, c11_chem_cbse_05_006, c11_chem_cbse_05_009, c11_chem_cbse_05_010, c11_chem_cbse_05_008

## PREREQUISITE_REASONS
c11_chem_cbse_05_001: Understanding van der Waals forces (London, dipole-dipole) is essential to grasp the physical origin of the 'a' constant.
c11_chem_cbse_05_002: Knowledge of London forces and dipole-dipole forces explains why 'a' varies across gases (polar vs nonpolar).
c11_chem_cbse_05_006: The ideal gas equation \(PV = nRT\) is the starting point that van der Waals modifies; students must know it thoroughly.
c11_chem_cbse_05_009: Kinetic molecular theory provides the assumptions (no intermolecular forces, negligible molecular volume) that fail for real gases.
c11_chem_cbse_05_010: Deviation from ideal behaviour (compressibility factor Z, Boyle temperature) motivates the need for a corrected equation.
c11_chem_cbse_05_008: van der Waals equation corrects for molecular volume and attraction, which affect diffusion rates at high pressure/low temperature.  

## FORWARD_NODE_IDS
c11_chem_cbse_05_012, c11_chem_cbse_05_013
## FORWARD_REASONS
c11_chem_cbse_05_012: The van der Waals equation explains the P-V behaviour of gases near condensation, which leads to the concept of vapour pressure in liquids.
c11_chem_cbse_05_013: Understanding intermolecular forces (quantified by 'a') and molecular size (quantified by 'b') provides the microscopic basis for surface tension and viscosity in liquids.

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_12_001, c11_math_cbse_05_001
## CROSS_SUBJECT_REASONS
c11_physics_ch12_001: Thermodynamics (first law, work done by gases) uses equations of state; van der Waals equation allows calculation of work for real gases: \(W = -\int P dV = -\int \left(\frac{nRT}{V-nb} - \frac{an^2}{V^2}\right) dV\).
c11_math_ch05_001: Solving the cubic equation in \(V\) from van der Waals equation \(\left(P + \frac{an^2}{V^2}\right)(V-nb) = nRT\) requires algebraic manipulation and understanding of polynomial roots, connecting to cubic equations and numerical methods.
c11_phy_cbse_12_001: Cross-subject support: The kinetic theory of gases is a theoretical model based on seven fundamental postulates (... supplies tools/facts used directly in this node.  
c11_math_cbse_05_001: Cross-subject support: Complex numbers are an extension of the real number system, defined as numbers of the form... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_chem_cbse_05_009 -> c11_chem_cbse_05_010 -> c11_chem_cbse_05_011 -> c11_chem_cbse_05_012

## THIS_FORMULA
\(\left(P + a\frac{n^2}{V^2}\right)(V - nb) = nRT\) (extensive form); \(\left(P + \frac{a}{V_m^2}\right)(V_m - b) = RT\) (molar form, \(V_m = V/n\))

## FORMULA_VARIABLES
\(P\) = pressure of the gas (Pa or atm); \(V\) = volume of the container (m³ or L); \(n\) = amount of gas (mol); \(T\) = absolute temperature (K); \(R\) = universal gas constant (8.314 J·mol⁻¹·K⁻¹ or 0.0821 atm·L·mol⁻¹·K⁻¹); \(a\) = van der Waals constant for intermolecular attraction (Pa·m⁶·mol⁻² or atm·L²·mol⁻²); \(b\) = van der Waals constant for excluded volume (m³·mol⁻¹ or L·mol⁻¹); \(V_m\) = molar volume (m³·mol⁻¹ or L·mol⁻¹)

## FORMULA_UNITS
Pressure: Pa (SI) or atm; Volume: m³ (SI) or L; Amount: mol; Temperature: K; R: 8.314 J·mol⁻¹·K⁻¹ = 0.0821 atm·L·mol⁻¹·K⁻¹; a: Pa·m⁶·mol⁻² or atm·L²·mol⁻²; b: m³·mol⁻¹ or L·mol⁻¹

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch12_001 | Thermodynamic work calculation for real gases uses the van der Waals equation to evaluate \(W = -\int P dV\) during expansion/compression, where \(P\) is expressed as a function of \(V\) from the equation.
c11_math_ch05_001 | The van der Waals equation rearranges to a cubic in \(V\): \(V^3 - (nb + \frac{nRT}{P})V^2 + \frac{an^2}{P}V - \frac{abn^3}{P} = 0\), requiring algebraic/numerical methods to find molar volume at given P,T.
c11_math_ch02_001 | Partial derivatives of the van der Waals equation give thermodynamic relations: \(\left(\frac{\partial P}{\partial T}\right)_V = \frac{nR}{V-nb}\), \(\left(\frac{\partial P}{\partial V}\right)_T = -\frac{nRT}{(V-nb)^2} + \frac{2an^2}{V^3}\).

## PREREQ_CONCEPT
The ideal gas equation \(PV = nRT\) and the two key assumptions of kinetic molecular theory that fail for real gases: (1) no intermolecular forces, (2) negligible molecular volume compared to container volume.

## PREREQ_BEFORE
The student must be able to state the ideal gas equation, define compressibility factor \(Z = \frac{PV}{nRT}\), and explain qualitatively why real gases deviate from ideality at high pressure and low temperature.

## PREREQ_STUCK
Revisit c11_chem_cbse_05_010 (Deviation from Ideal Behaviour) to review the compressibility factor graphs and the physical reasons for deviation (intermolecular forces dominate at low T, molecular volume dominates at high P).

## WORKED_EXAMPLE_1
PROBLEM: A 5.00 L cylinder contains 10.0 moles of ammonia gas (NH₃) at 300 K. Calculate the pressure using (a) ideal gas equation and (b) van der Waals equation. Given for NH₃: \(a = 4.17\ \text{atm·L}^2\text{·mol}^{-2}\), \(b = 0.0371\ \text{L·mol}^{-1}\). Explain the physical reason for the difference.
STEPS:
- Step 1: List knowns: \(n = 10.0\ \text{mol}\), \(V = 5.00\ \text{L}\), \(T = 300\ \text{K}\), \(R = 0.0821\ \text{atm·L·mol}^{-1}\text{·K}^{-1}\), \(a = 4.17\ \text{atm·L}^2\text{·mol}^{-2}\), \(b = 0.0371\ \text{L·mol}^{-1}\).
- Step 2: (a) Ideal gas law: \(P_{\text{ideal}} = \frac{nRT}{V} = \frac{10.0 \times 0.0821 \times 300}{5.00} = \frac{246.3}{5.00} = 49.26\ \text{atm}\).
- Step 3: (b) Van der Waals equation: \(\left(P + \frac{an^2}{V^2}\right)(V - nb) = nRT\). Compute corrections: \(\frac{an^2}{V^2} = \frac{4.17 \times (10.0)^2}{(5.00)^2} = \frac{417}{25} = 16.68\ \text{atm}\); \(nb = 10.0 \times 0.0371 = 0.371\ \text{L}\); \(V - nb = 5.00 - 0.371 = 4.629\ \text{L}\).
- Step 4: Solve for P: \(P = \frac{nRT}{V - nb} - \frac{an^2}{V^2} = \frac{246.3}{4.629} - 16.68 = 53.21 - 16.68 = 36.53\ \text{atm}\).
- Step 5: Compare: \(P_{\text{vdW}} = 36.5\ \text{atm}\) vs \(P_{\text{ideal}} = 49.3\ \text{atm}\). The van der Waals pressure is 26% lower.
- Step 6: Physical interpretation: At this high density (\(n/V = 2.0\ \text{mol/L}\)), intermolecular attractions in polar NH₃ (hydrogen bonding, large \(a\)) significantly reduce wall collisions, while the volume correction (smaller effect here) slightly increases pressure. The net effect is dominated by attraction.
REASONING: The ideal gas law ignores both intermolecular forces and molecular volume. For NH₃, the large \(a\) value (due to hydrogen bonding) means strong attractive forces pull molecules away from the walls, reducing pressure substantially. The volume correction \(nb\) reduces the free volume, which would increase pressure, but the attraction term dominates at this moderate temperature and high density. The 26% deviation is typical for polar gases under pressure.
ANSWER: (a) \(P_{\text{ideal}} = 49.3\ \text{atm}\); (b) \(P_{\text{vdW}} = 36.5\ \text{atm}\); deviation = 12.8 atm lower due to dominant intermolecular attraction in NH₃.

## WORKED_EXAMPLE_2
PROBLEM: For oxygen gas, \(a = 1.36\ \text{atm·L}^2\text{·mol}^{-2}\) and \(b = 0.0318\ \text{L·mol}^{-1}\). Calculate the temperature at which 2.00 moles of O₂ in a 1.00 L vessel will exert a pressure of 50.0 atm according to the van der Waals equation.
STEPS:
- Step 1: Identify knowns: \(n = 2.00\ \text{mol}\), \(V = 1.00\ \text{L}\), \(P = 50.0\ \text{atm}\), \(a = 1.36\ \text{atm·L}^2\text{·mol}^{-2}\), \(b = 0.0318\ \text{L·mol}^{-1}\), \(R = 0.0821\ \text{atm·L·mol}^{-1}\text{·K}^{-1}\). Find \(T\).
- Step 2: Write van der Waals equation: \(\left(P + \frac{an^2}{V^2}\right)(V - nb) = nRT\).
- Step 3: Compute pressure correction: \(\frac{an^2}{V^2} = \frac{1.36 \times (2.00)^2}{(1.00)^2} = 5.44\ \text{atm}\). Corrected pressure term: \(P + \frac{an^2}{V^2} = 50.0 + 5.44 = 55.44\ \text{atm}\).
- Step 4: Compute volume correction: \(nb = 2.00 \times 0.0318 = 0.0636\ \text{L}\). Free volume: \(V - nb = 1.00 - 0.0636 = 0.9364\ \text{L}\).
- Step 5: Calculate \(nRT = \left(P + \frac{an^2}{V^2}\right)(V - nb) = 55.44 \times 0.9364 = 51.91\ \text{atm·L}\).
- Step 6: Solve for T: \(T = \frac{51.91}{nR} = \frac{51.91}{2.00 \times 0.0821} = \frac{51.91}{0.1642} = 316.1\ \text{K}\).
- Step 7: Verify with ideal gas law for comparison: \(T_{\text{ideal}} = \frac{PV}{nR} = \frac{50.0 \times 1.00}{2.00 \times 0.0821} = 304.5\ \text{K}\). The van der Waals temperature is higher because the attraction correction means the gas needs more thermal energy to achieve the same pressure.
REASONING: Rearranging the van der Waals equation to solve for T requires computing both correction terms first. The pressure correction adds to measured P (attractions reduce measured P), and volume correction subtracts from V (molecules occupy space). The product gives \(nRT\). The result shows that for a given P, V, n, the real gas requires higher temperature than ideal gas to overcome intermolecular attraction.
ANSWER: \(T = 316\ \text{K}\) (43°C). Ideal gas prediction would be 304.5 K (31.5°C), showing a 11.6 K difference due to intermolecular forces.

## WORKED_EXAMPLE_3
PROBLEM: The compressibility factor \(Z = \frac{PV_m}{RT}\) for a van der Waals gas can be expressed as \(Z = \frac{V_m}{V_m - b} - \frac{a}{RTV_m}\). For CO₂ (\(a = 3.59\ \text{atm·L}^2\text{·mol}^{-2}\), \(b = 0.0427\ \text{L·mol}^{-1}\)), calculate Z at (i) 300 K and 10 atm, (ii) 300 K and 100 atm. Use iterative solution or approximation. Interpret the results in terms of dominant non-ideal effects.
STEPS:
- Step 1: Recognize that Z depends on \(V_m\), which must be found from the van der Waals equation at given P,T. Use the cubic form: \(V_m^3 - (b + \frac{RT}{P})V_m^2 + \frac{a}{P}V_m - \frac{ab}{P} = 0\).
- Step 2: For (i) P = 10 atm, T = 300 K: Compute coefficients: \(b + \frac{RT}{P} = 0.0427 + \frac{0.0821 \times 300}{10} = 0.0427 + 2.463 = 2.5057\ \text{L/mol}\); \(\frac{a}{P} = \frac{3.59}{10} = 0.359\ \text{L}^2/\text{mol}^2\); \(\frac{ab}{P} = \frac{3.59 \times 0.0427}{10} = 0.0153\ \text{L}^3/\text{mol}^3\).
- Step 3: Solve cubic for \(V_m\). Try ideal gas approximation first: \(V_m^{\text{ideal}} = \frac{RT}{P} = 2.463\ \text{L/mol}\). Use one iteration of Newton-Raphson or note that at low P, \(V_m \approx \frac{RT}{P} + b - \frac{a}{RT}\). Compute: \(V_m \approx 2.463 + 0.0427 - \frac{3.59}{0.0821 \times 300} = 2.463 + 0.0427 - 0.1457 = 2.360\ \text{L/mol}\).
- Step 4: Calculate Z at 10 atm: \(Z = \frac{PV_m}{RT} = \frac{10 \times 2.360}{0.0821 \times 300} = \frac{23.60}{24.63} = 0.958\). Alternatively use formula: \(Z = \frac{V_m}{V_m - b} - \frac{a}{RTV_m} = \frac{2.360}{2.360 - 0.0427} - \frac{3.59}{24.63 \times 2.360} = \frac{2.360}{2.3173} - \frac{3.59}{58.13} = 1.0184 - 0.0618 = 0.9566 \approx 0.957\).
- Step 5: For (ii) P = 100 atm, T = 300 K: \(V_m^{\text{ideal}} = 0.2463\ \text{L/mol}\). Since P is high, volume correction dominates. Approximate \(V_m \approx b + \frac{RT}{P + a/V_m^2}\). Iterate: Start with \(V_m = 0.2463\), compute \(\frac{a}{V_m^2} = \frac{3.59}{0.0607} = 59.1\ \text{atm}\), then \(P + a/V_m^2 = 159.1\), \(V_m = \frac{RT}{159.1} + b = 0.1547 + 0.0427 = 0.1974\). Recompute with \(V_m = 0.1974\): \(a/V_m^2 = 92.2\), \(P + a/V_m^2 = 192.2\), \(V_m = 0.1281 + 0.0427 = 0.1708\). Converging to ~0.17 L/mol.
- Step 6: Calculate Z at 100 atm: \(Z = \frac{100 \times 0.1708}{24.63} = 0.693\). Using formula: \(Z = \frac{0.1708}{0.1708 - 0.0427} - \frac{3.59}{24.63 \times 0.1708} = \frac{0.1708}{0.1281} - \frac{3.59}{4.207} = 1.333 - 0.853 = 0.480\). (Note: iterative V_m affects Z significantly; exact solution gives Z ≈ 0.6-0.7).
- Step 7: Interpretation: At 10 atm, Z < 1 (0.96) → attractive forces dominate (molecules pulled together, lower P than ideal). At 100 atm, Z is still < 1 but volume exclusion starts competing; at even higher P, Z > 1 as repulsion dominates.
REASONING: The compressibility factor Z quantifies deviation from ideality. The van der Waals equation predicts Z < 1 at moderate pressures (attraction dominant) and Z > 1 at very high pressures (excluded volume dominant). The crossover occurs at Boyle temperature. For CO₂ at 300 K (below Boyle temp ~ 714 K), Z < 1 at both pressures but approaches 1 at low P. The calculation shows how both corrections compete.
ANSWER: (i) At 10 atm, 300 K: \(Z \approx 0.96\) (attraction dominant); (ii) At 100 atm, 300 K: \(Z \approx 0.6-0.7\) (strong attraction still dominates but excluded volume reduces the deviation magnitude).

## COMPETENCY_QUESTION_1
QUESTION: A 2.00 L vessel contains a mixture of 1.00 mol N₂ and 1.00 mol CO₂ at 400 K. The van der Waals constants are: N₂ (\(a = 1.39\), \(b = 0.0391\)), CO₂ (\(a = 3.59\), \(b = 0.0427\)) in atm·L²·mol⁻² and L·mol⁻¹. Calculate the total pressure using the van der Waals equation for mixtures. For mixtures, \(a_{\text{mix}} = \sum_i \sum_j y_i y_j a_{ij}\) where \(a_{ij} = \sqrt{a_i a_j}\), and \(b_{\text{mix}} = \sum_i y_i b_i\). Compare with the ideal gas pressure and explain which gas contributes more to the deviation.
STEPS:
- Step 1: Calculate mole fractions: \(y_{\text{N}_2} = 0.5\), \(y_{\text{CO}_2} = 0.5\).
- Step 2: Compute mixture constants: \(a_{\text{mix}} = y_{\text{N}_2}^2 a_{\text{N}_2} + 2 y_{\text{N}_2} y_{\text{CO}_2} \sqrt{a_{\text{N}_2} a_{\text{CO}_2}} + y_{\text{CO}_2}^2 a_{\text{CO}_2} = 0.25(1.39) + 0.5\sqrt{1.39 \times 3.59} + 0.25(3.59) = 0.3475 + 0.5(2.233) + 0.8975 = 2.36\ \text{atm·L}^2\text{·mol}^{-2}\). \(b_{\text{mix}} = 0.5(0.0391) + 0.5(0.0427) = 0.0409\ \text{L·mol}^{-1}\).
- Step 3: Total moles \(n = 2.00\ \text{mol}\), \(V = 2.00\ \text{L}\), \(T = 400\ \text{K}\), \(R = 0.0821\).
- Step 4: Ideal pressure: \(P_{\text{ideal}} = \frac{nRT}{V} = \frac{2.00 \times 0.0821 \times 400}{2.00} = 32.84\ \text{atm}\).
- Step 5: Van der Waals: \(\frac{a_{\text{mix}} n^2}{V^2} = \frac{2.36 \times 4}{4} = 2.36\ \text{atm}\); \(nb = 2.00 \times 0.0409 = 0.0818\ \text{L}\); \(V - nb = 1.9182\ \text{L}\); \(nRT = 65.68\ \text{atm·L}\).
- Step 6: \(P_{\text{vdW}} = \frac{65.68}{1.9182} - 2.36 = 34.24 - 2.36 = 31.88\ \text{atm}\).
- Step 7: Deviation: 32.84 - 31.88 = 0.96 atm (2.9% lower). CO₂ contributes more to deviation because its \(a\) is 2.6× larger, and cross-term \(\sqrt{a_{\text{N}_2}a_{\text{CO}_2}}\) weights it heavily.
ANSWER: \(P_{\text{ideal}} = 32.8\ \text{atm}\), \(P_{\text{vdW}} = 31.9\ \text{atm}\). CO₂ dominates the deviation due to its larger \(a\) value (stronger intermolecular forces from quadrupole moment).
COMPETENCY: Applying mixing rules for van der Waals constants and interpreting molecular contributions to non-ideal behaviour.
DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: The van der Waals equation can be written as a cubic in volume: \(V^3 - (nb + \frac{nRT}{P})V^2 + \frac{an^2}{P}V - \frac{abn^3}{P} = 0\). At the critical point, this cubic has three equal real roots \(V = V_c\). Using this condition, derive the relationships between critical constants (\(T_c, P_c, V_c\)) and van der Waals constants (\(a, b\)). Then calculate \(a\) and \(b\) for a gas with \(T_c = 304\ \text{K}\), \(P_c = 73.8\ \text{atm}\), \(V_c = 0.094\ \text{L/mol}\). (This extends beyond typical Class 11 but tests deep understanding of the equation's structure.)
STEPS:
- Step 1: At critical point, the cubic has triple root \(V = V_c\), so it can be written as \((V - V_c)^3 = 0 = V^3 - 3V_cV^2 + 3V_c^2V - V_c^3\).
- Step 2: Equate coefficients with van der Waals cubic: \(V^3 - (b + \frac{RT_c}{P_c})V^2 + \frac{a}{P_c}V - \frac{ab}{P_c} = 0\).
- Step 3: Coefficient matching: \(3V_c = b + \frac{RT_c}{P_c}\); \(3V_c^2 = \frac{a}{P_c}\); \(V_c^3 = \frac{ab}{P_c}\).
- Step 4: Solve the system: From second and third: \(\frac{V_c^3}{3V_c^2} = \frac{ab/P_c}{a/P_c} \Rightarrow \frac{V_c}{3} = b \Rightarrow b = \frac{V_c}{3}\). Then \(a = 3P_cV_c^2\). And \(\frac{RT_c}{P_c} = 3V_c - b = 3V_c - \frac{V_c}{3} = \frac{8V_c}{3} \Rightarrow T_c = \frac{8P_cV_c}{3R}\).
- Step 5: Verify standard results: \(V_c = 3b\), \(P_c = \frac{a}{27b^2}\), \(T_c = \frac{8a}{27Rb}\).
- Step 6: Calculate for given gas: \(b = \frac{V_c}{3} = \frac{0.094}{3} = 0.0313\ \text{L/mol}\). \(a = 3P_cV_c^2 = 3 \times 73.8 \times (0.094)^2 = 221.4 \times 0.008836 = 1.956\ \text{atm·L}^2\text{·mol}^{-2}\).
- Step 7: Check consistency: \(T_c = \frac{8a}{27Rb} = \frac{8 \times 1.956}{27 \times 0.0821 \times 0.0313} = \frac{15.648}{0.0695} = 225\ \text{K}\)? Wait, discrepancy indicates given \(T_c, P_c, V_c\) are not perfectly consistent with vdW (real gases deviate). Use \(b = V_c/3\) and \(a = 27R^2T_c^2/(64P_c)\) as standard formulas: \(a = \frac{27 \times (0.0821)^2 \times (304)^2}{64 \times 73.8} = \frac{27 \times 0.00674 \times 92416}{4723.2} = \frac{16780}{4723} = 3.55\ \text{atm·L}^2\text{·mol}^{-2}\); \(b = \frac{RT_c}{8P_c} = \frac{0.0821 \times 304}{8 \times 73.8} = \frac{24.96}{590.4} = 0.0423\ \text{L/mol}\).
ANSWER: Derived relations: \(V_c = 3b\), \(P_c = \frac{a}{27b^2}\), \(T_c = \frac{8a}{27Rb}\). For given critical constants: \(a = 3.55\ \text{atm·L}^2\text{·mol}^{-2}\), \(b = 0.0423\ \text{L·mol}^{-1}\) (using standard thermodynamic formulas).
COMPETENCY: Deriving critical constant relationships from the cubic structure of the van der Waals equation and applying them to real gas data.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Begin with a real-world observation: when you pump air into a bicycle tyre, the ______ gauge reading deviates from what the ideal gas law predicts, especially on a cold winter morning in Delhi.

## DIAGNOSTIC_ANSWER_7
pressure

**A wrong answer ('temperature') reveals the student has swapped the walkthrough's instrument - it is the pressure gauge whose reading drifts from the ideal prediction.** Pressure is the walkthrough's own word, and the blank grades it. Recall the tyre-pumping scene - air compressed, gauge watched - before filling, and give the word exactly: the mismatch the walkthrough stages is between measured pressure and the ideal law's promise.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Begin with a real-world ______: when you pump air into a bicycle tyre, the pressure gauge reading deviates from what the ideal gas law predicts, especially on a cold winter morning in Delhi.

## DIAGNOSTIC_ANSWER_8
observation

**A wrong answer ('experiment') reveals the student has swapped the walkthrough's opener noun - the scene is introduced as a real-world observation.** Observation is the walkthrough's own noun, and the noun is what the blank grades. Recall the sentence's frame - daily life contradicting a tidy law - before filling, and give the noun exactly: the walkthrough's habit is opening at something a student can watch, then letting theory explain it.
