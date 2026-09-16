## DEFINITION
Osmotic pressure (Π) is the minimum excess pressure that must be applied to a solution to prevent the net flow of solvent molecules through a semipermeable membrane from the pure solvent (or dilute solution) into the solution. It is a colligative property directly proportional to the molar concentration of solute particles for dilute solutions, expressed as Π = iCRT where i is the van't Hoff factor, C is molarity (mol L⁻¹), R is the gas constant, and T is absolute temperature.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
Student can: (1) Derive Π = iCRT from the ideal gas equation and explain the analogy between solute particles and gas molecules, (2) Calculate molar mass of macromolecules (proteins, polymers) from osmotic pressure data using M₂ = (w₂RT)/(ΠV), (3) Distinguish isotonic, hypotonic, and hypertonic solutions and predict direction of osmosis in biological contexts (e.g., IV fluids, plant cells), (4) Solve JEE/NEET problems combining osmotic pressure with van't Hoff factor for dissociation/association.

## SCOPE_BOUNDARY
Covers: Definition of osmosis and osmotic pressure, semipermeable membrane concept, derivation of Π = CRT from kinetic theory/ideal gas law, molar mass determination formula M₂ = (w₂RT)/(ΠV), isotonic/hypertonic/hypotonic classification, reverse osmosis for water purification, van't Hoff factor incorporation (Π = iCRT). Does NOT cover: Detailed membrane transport biology, osmotic coefficient for non-ideal solutions beyond van't Hoff factor, statistical mechanical derivation of osmotic pressure, or Donnan equilibrium.

## WALKTHROUGH
Imagine placing a raw mango in concentrated brine (salt water) — it shrivels as water leaves its cells. Now place wilted lettuce in fresh water — it becomes crisp as water enters. Both phenomena are osmosis: solvent (water) moves through semipermeable cell membranes from lower solute concentration to higher solute concentration. In Class 11 (c11_chem_cbse_05_006), you learned PV = nRT for gases. Here we make a powerful analogy: solute particles in dilute solution behave like gas molecules occupying the solution volume, exerting a "pressure" — osmotic pressure. Start by visualising the thistle funnel experiment (Fig 1.9 NCERT): semipermeable membrane tied at the mouth, filled with solution, inverted in pure solvent. The liquid column rises until the hydrostatic pressure (ρgh) balances the osmotic influx. That equilibrium height gives Π. Connect this to the ideal gas law: n₂/V = C (molarity), so ΠV = n₂RT → Π = CRT. This analogy is the key to solving every osmotic pressure problem in boards and JEE/NEET.

## DIAGNOSTIC_QUESTION_1
State the formula for osmotic pressure of a dilute solution and define each term with its SI unit. Why is molarity (not molality) used in this formula?

## DIAGNOSTIC_ANSWER_1
Π = iCRT where Π = osmotic pressure (Pa), i = van't Hoff factor (dimensionless), C = molar concentration (mol m⁻³ or mol L⁻¹ with R adjusted), R = gas constant (8.314 J mol⁻¹ K⁻¹ or 0.083 L bar mol⁻¹ K⁻¹), T = absolute temperature (K). Molarity is used because osmotic pressure depends on number of solute particles per unit volume of solution (like gas pressure depends on molecules per unit volume), and volume of solution appears naturally in the derivation ΠV = n₂RT. Molality uses mass of solvent, which doesn't appear in the ideal gas analogy. A wrong answer using molality reveals confusion between the four colligative properties — only osmotic pressure uses molarity; the other three (ΔT_b, ΔT_f, Δp/p°) use molality/mole fraction because they involve pure solvent properties.

## DIAGNOSTIC_QUESTION_2
A student writes: "Osmotic pressure is the pressure exerted by the solute particles on the semipermeable membrane." Is this statement correct? Explain why or why not using the kinetic molecular picture.

## DIAGNOSTIC_ANSWER_2
The statement is incorrect. Osmotic pressure is NOT the pressure exerted by solute particles on the membrane. In the kinetic picture, solute particles are too large to pass through the membrane pores; they collide with the membrane but this is not the origin of Π. Instead, Π arises because solvent molecules on the pure solvent side strike the membrane more frequently than solvent molecules on the solution side (where some surface sites are occupied by solute particles). This imbalance creates a net solvent flux toward the solution. The pressure we apply on the solution side (Π) counteracts this net flux by increasing the escaping tendency of solvent molecules from the solution side. A student who thinks solute particles "push" on the membrane confuses osmotic pressure with gas pressure — in gases, molecules hit the walls; in osmosis, the membrane is impermeable to solute, so solute-wall collisions don't drive the flow.

## DIAGNOSTIC_QUESTION_3
200 cm³ of an aqueous protein solution contains 1.26 g of protein. The osmotic pressure at 300 K is 2.57 × 10⁻³ bar. Calculate the molar mass of the protein. (R = 0.083 L bar mol⁻¹ K⁻¹)

## DIAGNOSTIC_ANSWER_3
Given: w₂ = 1.26 g, V = 200 cm³ = 0.200 L, Π = 2.57 × 10⁻³ bar, T = 300 K, R = 0.083 L bar mol⁻¹ K⁻¹.
Step 1: Use M₂ = (w₂RT)/(ΠV)
Step 2: Substitute values: M₂ = (1.26 g × 0.083 L bar mol⁻¹ K⁻¹ × 300 K) / (2.57 × 10⁻³ bar × 0.200 L)
Step 3: Numerator = 1.26 × 0.083 × 300 = 31.374
Step 4: Denominator = 2.57 × 10⁻³ × 0.200 = 5.14 × 10⁻⁴
Step 5: M₂ = 31.374 / 5.14 × 10⁻⁴ = 61,039 g mol⁻¹ ≈ 61.0 kg mol⁻¹
Answer: 6.10 × 10⁴ g mol⁻¹ (or 61.0 kg mol⁻¹).
A wrong answer typically comes from: (a) using V = 200 L instead of 0.200 L → M₂ too small by 1000×, (b) using R = 8.314 J mol⁻¹ K⁻¹ without converting bar to Pa → unit mismatch, (c) forgetting to convert cm³ to L. This tests unit vigilance — a critical JEE/NEET skill.

## DIAGNOSTIC_QUESTION_4
Two solutions are separated by a semipermeable membrane: Solution A is 0.1 M NaCl, Solution B is 0.1 M glucose. Both at 298 K. Predict the direction of net solvent flow and justify using van't Hoff factors. Assume complete dissociation for NaCl.

## DIAGNOSTIC_ANSWER_4
Solution A (0.1 M NaCl): i ≈ 2 (NaCl → Na⁺ + Cl⁻), effective particle concentration = iC = 0.2 osmol L⁻¹.
Solution B (0.1 M glucose): i = 1 (non-electrolyte), effective particle concentration = 0.1 osmol L⁻¹.
Since Π ∝ iC, Π_A > Π_B. Solvent flows from lower osmotic pressure (Solution B, glucose) to higher osmotic pressure (Solution A, NaCl).
Net flow: Glucose side → NaCl side.
Justification: Osmotic pressure depends on total molar concentration of solute particles (osmolarity), not formula concentration. NaCl provides twice the particles per formula unit. A student answering "no flow because both are 0.1 M" ignores the van't Hoff factor — a classic board exam trap. In JEE, they may give incomplete dissociation (i = 1.8) requiring calculation of effective osmolarity.

## DIAGNOSTIC_QUESTION_5
Evaluate this statement: "Reverse osmosis can purify sea water because applying pressure greater than osmotic pressure forces pure water through the membrane, leaving salts behind. The minimum pressure required is exactly equal to the osmotic pressure of sea water." Is the "exactly equal" part correct? Explain.

## DIAGNOSTIC_ANSWER_5
The statement is partially incorrect. The minimum pressure to *stop* osmosis (equilibrium) is exactly Π. But to *produce* pure water at a practical rate (reverse osmosis), the applied pressure must be **greater than** Π (typically 1.5–2×Π for sea water). At P = Π, net flux is zero — no water is produced. At P > Π, net solvent flux reverses: water flows from solution to pure side. The "exactly equal" phrasing confuses thermodynamic equilibrium (zero net flow) with the operational requirement for desalination (positive product flux). A student who says "exactly equal" treats reverse osmosis as a static balance rather than a driven process. In JEE, they may ask: "If applied pressure = 1.2Π, what is the direction of net water flow?" Answer: From solution to pure water (reverse osmosis occurs).

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using household materials to demonstrate osmosis and estimate the osmotic pressure of a sugar solution qualitatively. List materials, procedure, observation, and how you would relate the observation to Π.

## DIAGNOSTIC_ANSWER_6
Materials: Potato (semipermeable cell membranes), knife, two bowls, water, sugar, scale, ruler.
Procedure: (1) Cut potato into 4 identical cylinders (same dimensions). (2) Weigh each (initial mass m₀). (3) Place two in pure water, two in saturated sugar solution (~2 M). (4) Wait 30 min. (5) Remove, blot dry, reweigh (final mass m).
Observation: Potato in water gains mass (water enters cells → turgid). Potato in sugar solution loses mass (water leaves cells → plasmolysis).
Qualitative Π estimate: The sugar solution is hypertonic relative to potato cell sap. The mass loss rate correlates with Π difference. To quantify: Plot % mass change vs. sugar concentration for multiple solutions. The concentration where % change = 0 is isotonic with cell sap; its Π equals cell sap Π. At 298 K, 0.3 M sugar ≈ isotonic with plant cells → Π ≈ 0.3 × 0.083 × 298 ≈ 7.4 bar.
A poor answer uses dialysis tubing (not household) or suggests measuring height of liquid column (requires thistle funnel). The potato method is accessible and demonstrates the core concept: water moves toward higher solute concentration.

## COMMON_MISCONCEPTION
Students confuse the formula Π = CRT with Π = (n₂/V)RT and use molality (m) instead of molarity (C). They write: "Π = mRT" or "Π = (w₂/M₂)RT" without dividing by volume V. This happens because the other three colligative properties (ΔT_b, ΔT_f, Δp/p°) use molality or mole fraction. In JEE/NEET, a question gives molality and density, expecting conversion to molarity: C = (m × d × 1000) / (1000 + m × M₂) ≈ m × d for dilute solutions. Another error: Using R = 0.0821 L atm mol⁻¹ K⁻¹ when Π is in bar (1 bar = 0.987 atm ≈ 1 atm, but not exact). Board exams accept R = 0.083 L bar mol⁻¹ K⁻¹; competitive exams may use 0.0821 L atm mol⁻¹ K⁻¹ and require unit conversion. Students also forget the van't Hoff factor i for electrolytes, writing Π = CRT instead of Π = iCRT, leading to molar mass values that are i-times too high.

## ON_FAILURE
If a student uses molality in Π = mRT: (1) Revisit c12_chem_cbse_01_007 (Relative Lowering of Vapour Pressure) and c12_chem_cbse_01_008 (Elevation of Boiling Point) — note both use molality/mole fraction because they relate to pure solvent vapour pressure curves. (2) Re-derive Π from ideal gas law: ΠV = n₂RT → Π = (n₂/V)RT = CRT. Emphasise: V is solution volume, not solvent mass. (3) Practice conversion: Given 0.1 m glucose (density 1.02 g mL⁻¹), find C. C = (0.1 mol/kg × 1.02 kg/L × 1000) / (1000 + 0.1×180) ≈ 0.098 M. (4) Redo Diagnostic Q3 with deliberate unit errors, then correct them. (5) Re-diagnostic: "Calculate Π of 0.1 m NaCl (i=1.9) at 298 K, density = 1.01 g mL⁻¹." Correct answer: C ≈ 0.1 × 1.01 = 0.101 M, Π = 1.9 × 0.101 × 0.083 × 298 ≈ 4.73 bar.

## PREREQUISITE_NODE_IDS
c12_chem_cbse_01_003, c12_chem_cbse_01_004, c11_chem_cbse_01_013, c11_chem_cbse_05_006, c11_chem_cbse_07_001, c12_chem_cbse_01_002, c12_chem_cbse_01_005, c12_chem_cbse_01_006, c12_chem_cbse_01_007, c12_chem_cbse_01_008, c12_chem_cbse_01_009, c11_chem_cbse_07_011

## PREREQUISITE_REASONS
c12_chem_cbse_01_003: Mole fraction and molarity definitions needed for concentration terms in Π = iCRT and M₂ = (w₂RT)/(ΠV).
c12_chem_cbse_01_004: Molality definition needed to distinguish from molarity and convert when problems give molality + density.
c11_chem_cbse_01_013: Molarity concept (mol L⁻¹) is the direct concentration variable in Π = CRT.
c11_chem_cbse_05_006: Ideal gas equation PV = nRT is the basis for the derivation ΠV = n₂RT → Π = CRT.
c11_chem_cbse_07_001: Dynamic equilibrium concept explains why osmosis stops when applied pressure = Π (equilibrium between chemical potentials).
c12_chem_cbse_01_002: Osmotic pressure (colligative property) depends on solute concentration; gas solubility concepts (Henry's law) are applied in biological contexts like blood gas transport.  
c12_chem_cbse_01_005: Osmotic pressure relates to vapour pressure lowering via chemical potential.  
c12_chem_cbse_01_006: Requires Ideal solutions are binary liquid mixtures that obey Raoult's law across all concentration... - this node (Osmotic pressure (Π) is the minimum excess pressure that must be applied to a solution to...) builds directly on that foundation.  
c12_chem_cbse_01_007: Osmotic pressure is the fourth colligative property, all linked by the same thermodynamic origin.  
c12_chem_cbse_01_008: Osmotic pressure — the fourth colligative property; uses molarity (not molality) and introduces van't Hoff equation Π = iCRT.  
c12_chem_cbse_01_009: Osmotic pressure is the fourth colligative property; same theoretical framework (vapour pressure lowering → chemical potential equality).  
c11_chem_cbse_07_011: id equilibrium. This integrates colligative properties (Class 12) with ionic equilibrium (Class 11, c11_chem_cbse_07_011).  

## FORWARD_NODE_IDS
c12_chem_cbse_01_011
## FORWARD_REASONS
c12_chem_cbse_01_011: Van't Hoff factor (i) modifies all colligative property equations including Π = iCRT. Understanding osmotic pressure without i is incomplete; the next node quantifies dissociation/association effects on Π.

## CROSS_SUBJECT_PREREQS
c12_phy_cbse_02_001, c12_bio_cbse_02_001
## CROSS_SUBJECT_REASONS
c12_physics_cbse_02_001: Thermodynamics — chemical potential μ = μ° + RT ln a; osmotic pressure is the pressure difference that equalises chemical potential of solvent across a semipermeable membrane (μ_solvent(pure) = μ_solvent(solution) + V_mΠ). This connects to Class 12 Physics thermodynamic equilibrium.
c12_biology_cbse_02_001: Cell biology — osmosis in plant/animal cells, turgor pressure, plasmolysis, isotonic IV fluids (0.9% NaCl), edema. The biological semipermeable membrane (phospholipid bilayer + aquaporins) is the real-world counterpart of the thistle funnel membrane.
c12_phy_cbse_02_001: Cross-subject support: Electrostatic potential at a point in an electric field is the work done by an external ag... supplies tools/facts used directly in this node.  
c12_bio_cbse_02_001: Cross-subject support: A flower is the specialized reproductive shoot of an angiosperm, composed of four distinct... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_chem_cbse_05_006 (Ideal Gas Law) → c12_chem_cbse_01_010 (Osmotic Pressure) → c12_chem_cbse_01_011 (Van't Hoff Factor)

## THIS_FORMULA
Π = iCRT = i (n₂/V) RT = i (w₂/M₂V) RT → M₂ = (i w₂ RT) / (Π V)

## FORMULA_VARIABLES
Π = osmotic pressure (Pa or bar), i = van't Hoff factor (dimensionless), C = molar concentration of solute (mol L⁻¹), R = gas constant (0.083 L bar mol⁻¹ K⁻¹ or 8.314 J mol⁻¹ K⁻¹), T = absolute temperature (K), n₂ = moles of solute, V = volume of solution (L), w₂ = mass of solute (g), M₂ = molar mass of solute (g mol⁻¹)

## FORMULA_UNITS
Π: Pa (SI) or bar (common in chemistry); 1 bar = 10⁵ Pa. C: mol L⁻¹ (molarity). R: 0.083 L bar mol⁻¹ K⁻¹ or 8.314 J mol⁻¹ K⁻¹. T: K. M₂: g mol⁻¹. V: L. w₂: g.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_02_001 | Chemical potential equality at equilibrium: μ₁*(T,P) = μ₁(T,P+Π) + RT ln x₁ → Π = -(RT/V_m) ln x₁ ≈ (RT/V_m) x₂ = CRT for dilute solutions.
 c12_bio_cbse_02_001 | Osmosis in cells: 0.9% NaCl (≈ 0.15 M, i≈2 → 0.3 osmol L⁻¹) is isotonic with blood; 5% glucose (≈ 0.28 M) is isotonic. Hypotonic → cell lysis (animal) / turgidity (plant); Hypertonic → crenation (animal) / plasmolysis (plant).
## PREREQ_CONCEPT
Ideal gas equation (PV = nRT) and molarity (mol L⁻¹) — the derivation ΠV = n₂RT treats solute particles as an ideal gas confined in the solution volume.

## PREREQ_BEFORE
Student must be able to: (1) Write PV = nRT and identify each variable with units, (2) Calculate molarity from mass, molar mass, and solution volume, (3) Convert between bar, atm, and Pa (1 bar = 0.987 atm = 10⁵ Pa), (4) Explain dynamic equilibrium in terms of opposing rates (from c11_chem_cbse_07_001).

## PREREQ_STUCK
If stuck on derivation: Revisit c11_chem_cbse_05_006 (Ideal Gas Equation) and visualise solute particles as gas molecules in volume V. If stuck on units: Make a unit conversion table (bar ↔ Pa ↔ atm) and practise with R = 0.083 L bar mol⁻¹ K⁻¹ and R = 8.314 J mol⁻¹ K⁻¹.

## WORKED_EXAMPLE_1
PROBLEM: A patient needs intravenous (IV) fluid that is isotonic with blood (osmotic pressure ≈ 7.65 bar at 310 K). The hospital has glucose (C₆H₁₂O₆, M = 180 g mol⁻¹) and NaCl (M = 58.5 g mol⁻¹, i = 1.9 at this concentration). Calculate the mass of each solute required to prepare 500 mL of isotonic solution. Which is preferable and why? (R = 0.083 L bar mol⁻¹ K⁻¹)

STEPS:
- Step 1: Identify target osmotic pressure Π = 7.65 bar, T = 310 K, V = 0.500 L. For glucose (non-electrolyte), i = 1. For NaCl, i = 1.9 (given).
- Step 2: Use Π = iCRT → C = Π/(iRT). Calculate required molarity for each solute.
- Step 3: For glucose: C_glu = 7.65 / (1 × 0.083 × 310) = 7.65 / 25.73 = 0.297 M.
- Step 4: For NaCl: C_NaCl = 7.65 / (1.9 × 0.083 × 310) = 7.65 / 48.89 = 0.156 M.
- Step 5: Convert molarity to mass: w = C × V × M.
- Step 6: Glucose mass = 0.297 mol L⁻¹ × 0.500 L × 180 g mol⁻¹ = 26.7 g.
- Step 7: NaCl mass = 0.156 mol L⁻¹ × 0.500 L × 58.5 g mol⁻¹ = 4.56 g.
- Step 8: Compare: Glucose provides calories (energy) but no electrolytes. NaCl provides Na⁺ and Cl⁻ essential for nerve/muscle function. Clinical practice: Normal saline (0.9% NaCl ≈ 0.154 M) is used for volume replacement; 5% glucose (≈ 0.28 M) for energy + water. Both are approximately isotonic.
REASONING: The calculation uses Π = iCRT directly. The van't Hoff factor for NaCl (1.9 < 2) accounts for incomplete dissociation/ion pairing at this concentration. Glucose (i=1) requires higher molarity to achieve same Π. In medical practice, the choice depends on clinical need: saline restores electrolytes, glucose provides metabolic fuel.
ANSWER: Glucose: 26.7 g in 500 mL (5.34% w/v). NaCl: 4.56 g in 500 mL (0.91% w/v). Normal saline (0.9% NaCl) and 5% glucose are standard isotonic IV fluids.

## WORKED_EXAMPLE_2
PROBLEM: 1.5 g of a polymer is dissolved in 250 mL of water at 298 K. The osmotic pressure of the solution is 3.2 × 10⁻³ bar. The polymer partially associates into dimers (2 monomers ⇌ dimer) with degree of association α = 0.4. Calculate the molar mass of the monomer unit. (R = 0.083 L bar mol⁻¹ K⁻¹)

STEPS:
- Step 1: Write given data: w₂ = 1.5 g, V = 0.250 L, Π = 3.2 × 10⁻³ bar, T = 298 K, α = 0.4 (association).
- Step 2: For association 2M ⇌ M₂, van't Hoff factor i = 1 - α/2. (Derivation: Initial 1 mol M → at equilibrium: (1-α) mol M + (α/2) mol M₂. Total moles = 1 - α + α/2 = 1 - α/2. i = total moles / initial moles = 1 - α/2).
- Step 3: Calculate i = 1 - 0.4/2 = 1 - 0.2 = 0.8.
- Step 4: Use M₂(apparent) = (w₂ RT) / (Π V) — this gives the apparent molar mass based on observed Π.
- Step 5: M₂(apparent) = (1.5 × 0.083 × 298) / (3.2 × 10⁻³ × 0.250) = 37.077 / 0.0008 = 46,346 g mol⁻¹.
- Step 6: True molar mass of monomer M_monomer = M₂(apparent) × i (since i = M_normal / M_abnormal, and M_abnormal = M₂(apparent)). Wait: i = Normal molar mass / Abnormal molar mass. Here Normal = M_monomer (if no association), Abnormal = M₂(apparent). So M_monomer = i × M₂(apparent)? No: i = M_normal / M_abnormal → M_normal = i × M_abnormal. But M_abnormal is the experimentally determined molar mass assuming i=1. So M_monomer = i × M₂(apparent) = 0.8 × 46,346 = 37,077 g mol⁻¹.
- Step 7: Alternatively, use Π = i (w₂/M_monomer) (RT/V) → M_monomer = i w₂ RT / (Π V) = 0.8 × 1.5 × 0.083 × 298 / (3.2e-3 × 0.25) = 37,077 g mol⁻¹.
REASONING: Association reduces the number of particles, so i < 1. The apparent molar mass (calculated assuming i=1) is higher than the true monomer molar mass by factor 1/i. The formula i = 1 - α/2 is specific to dimerisation; for trimerisation it would be 1 - 2α/3. This problem combines osmotic pressure with van't Hoff factor for association — a JEE Advanced favourite.
ANSWER: Molar mass of monomer = 3.71 × 10⁴ g mol⁻¹ (37.1 kg mol⁻¹).

## WORKED_EXAMPLE_3
PROBLEM: A 0.02 M solution of a weak monoprotic acid HA (M = 60 g mol⁻¹) at 298 K has an osmotic pressure of 0.52 bar. The same concentration of HCl (strong acid) at 298 K has Π = 0.98 bar. Calculate the degree of dissociation (α) and dissociation constant (K_a) of HA. (R = 0.083 L bar mol⁻¹ K⁻¹)

STEPS:
- Step 1: For HCl (strong, i ≈ 2): Π_HCl = i_HCl C RT → 0.98 = 2 × 0.02 × 0.083 × 298 = 0.987 bar (matches, confirms i=2).
- Step 2: For HA (weak): Π_HA = i_HA C RT → 0.52 = i_HA × 0.02 × 0.083 × 298 = i_HA × 0.4935.
- Step 3: i_HA = 0.52 / 0.4935 = 1.0537.
- Step 4: For weak acid HA ⇌ H⁺ + A⁻, i = 1 + α. So α = i - 1 = 0.0537.
- Step 5: Calculate K_a: At equilibrium, [HA] = C(1-α), [H⁺] = Cα, [A⁻] = Cα.
- Step 6: K_a = [H⁺][A⁻]/[HA] = (Cα)² / (C(1-α)) = C α² / (1-α).
- Step 7: K_a = 0.02 × (0.0537)² / (1 - 0.0537) = 0.02 × 0.002884 / 0.9463 = 6.09 × 10⁻⁵.
- Step 8: Verify: pK_a = -log(6.09×10⁻⁵) = 4.21, reasonable for a weak acid.
REASONING: This problem uses osmotic pressure as a tool to measure the van't Hoff factor, which directly gives the degree of dissociation for a weak electrolyte. The comparison with a strong electrolyte (HCl) at same concentration calibrates the "ideal" i=2 value. The calculation of K_a from α and C is standard weak acid equilibrium. This integrates colligative properties (Class 12) with ionic equilibrium (Class 11, c11_chem_cbse_07_011).
ANSWER: Degree of dissociation α = 0.0537 (5.37%). Dissociation constant K_a = 6.1 × 10⁻⁵.

## COMPETENCY_QUESTION_1
QUESTION: A research student prepares two solutions at 298 K: Solution X contains 5.0 g of polymer P (molar mass 50,000 g mol⁻¹) in 200 mL water. Solution Y contains 0.5 g of NaCl in 200 mL water. The student claims Solution X has higher osmotic pressure because it has more mass of solute. Is the claim correct? Calculate Π for both solutions and explain the result in terms of number of particles. (R = 0.083 L bar mol⁻¹ K⁻¹, i_NaCl = 1.9)

COMPETENCY: Interpreting chemical equations and relating properties to particle concentration
STEPS:
- Step 1: Calculate molarity of each solute. For P: n = 5.0/50000 = 1.0×10⁻⁴ mol, V = 0.200 L → C = 5.0×10⁻⁴ M. For NaCl: n = 0.5/58.5 = 8.55×10⁻³ mol → C = 0.0427 M.
- Step 2: Calculate effective particle concentration (osmolarity) = iC. For P: i=1 → 5.0×10⁻⁴ osmol L⁻¹. For NaCl: i=1.9 → 1.9 × 0.0427 = 0.0811 osmol L⁻¹.
- Step 3: Calculate Π = iCRT. Π_P = 1 × 5.0×10⁻⁴ × 0.083 × 298 = 0.0124 bar. Π_NaCl = 1.9 × 0.0427 × 0.083 × 298 = 2.01 bar.
- Step 4: Compare: Π_NaCl (2.01 bar) >> Π_P (0.0124 bar). The claim is false.
- Step 5: Explain: Osmotic pressure depends on number of solute particles per unit volume, not mass. NaCl dissociates into ~2 particles per formula unit and has much higher molar concentration (0.0427 M vs 0.0005 M) despite lower mass.
ANSWER: Claim is incorrect. Π_X = 0.0124 bar, Π_Y = 2.01 bar. Solution Y (NaCl) has ~160× higher osmotic pressure because it has 85× higher molar concentration and each formula unit yields ~2 particles. Mass of solute is irrelevant; particle concentration (osmolarity) determines Π.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a desalination plant, sea water (assume 0.6 M NaCl, i = 1.8) at 298 K is processed by reverse osmosis. The membrane has a water permeability coefficient A = 2.5 × 10⁻¹² m s⁻¹ Pa⁻¹. (a) Calculate the minimum applied pressure required to obtain pure water at a flux of 20 L m⁻² h⁻¹. (b) If the plant processes 10⁶ L/day, what is the minimum membrane area required? (c) Explain why the actual applied pressure in industrial plants is typically 55–70 bar, higher than your calculated minimum. (R = 8.314 J mol⁻¹ K⁻¹)

COMPETENCY: Predicting reaction/process outcomes and applying multi-step quantitative reasoning
STEPS:
- Step 1: Calculate osmotic pressure of sea water: Π = iCRT = 1.8 × 600 mol m⁻³ × 8.314 × 298 = 2.68 × 10⁶ Pa = 26.8 bar. (Note: C = 0.6 mol L⁻¹ = 600 mol m⁻³ for SI units with R=8.314).
- Step 2: Net driving pressure for reverse osmosis: ΔP = P_applied - Π. Water flux J = A × ΔP.
- Step 3: Convert flux: 20 L m⁻² h⁻¹ = 20 × 10⁻³ m³ / (m² × 3600 s) = 5.56 × 10⁻⁶ m s⁻¹.
- Step 4: ΔP = J / A = (5.56 × 10⁻⁶) / (2.5 × 10⁻¹²) = 2.22 × 10⁶ Pa = 22.2 bar.
- Step 5: P_applied = Π + ΔP = 26.8 + 22.2 = 49.0 bar. This is the minimum for that flux.
- Step 6: Membrane area: Daily volume = 10⁶ L = 1000 m³. Flux per day = 20 L m⁻² h⁻¹ × 24 h = 480 L m⁻² day⁻¹ = 0.48 m³ m⁻² day⁻¹. Area = 1000 / 0.48 = 2083 m².
- Step 7: Explain higher industrial pressure: (i) Concentration polarisation — salt builds up at membrane surface, increasing local Π. (ii) Membrane fouling reduces effective A. (iii) Salt passage requires higher ΔP to maintain product quality. (iv) Energy recovery devices have pressure losses. (v) Safety margin for feed variability.
ANSWER: (a) Minimum applied pressure = 49.0 bar. (b) Minimum membrane area = 2083 m². (c) Actual pressures (55–70 bar) exceed minimum due to concentration polarisation, fouling, salt rejection requirements, and system inefficiencies.
DIFFICULTY: hard