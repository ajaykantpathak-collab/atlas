## DEFINITION
The ionisation constant of a weak acid (Ka) is the equilibrium constant for its partial dissociation in aqueous solution: HA(aq) ⇌ H⁺(aq) + A⁻(aq), where Ka = [H⁺][A⁻]/[HA]. The ionisation constant of a weak base (Kb) is the equilibrium constant for its reaction with water: B(aq) + H₂O(l) ⇌ BH⁺(aq) + OH⁻(aq), where Kb = [BH⁺][OH⁻]/[B]. Both are temperature-dependent equilibrium constants with units of mol L⁻¹ (or dimensionless when using activities).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
Student can: (1) Write correct ionisation equilibrium expressions for any weak acid/base and calculate Ka/Kb from given concentration and pH data; (2) Apply Ostwald's dilution law (α = √(Ka/C)) to find degree of ionisation and verify the 5% approximation rule; (3) Use Ka × Kb = Kw for conjugate acid-base pairs to solve multi-step problems involving salt hydrolysis and buffer preparation.

## SCOPE_BOUNDARY
Covers: Ionisation equilibria of weak monoprotic acids and monobasic bases, Ka/Kb expressions, degree of ionisation (α), Ostwald's dilution law, relationship Ka × Kb = Kw for conjugate pairs, calculation of pH from Ka/Kb and vice versa. Does NOT cover: Polyprotic acid stepwise ionisation (Ka₁, Ka₂), Lewis acid-base theory (covered in sibling node c11_chem_cbse_07_010), buffer calculations (c11_chem_cbse_07_013), or salt hydrolysis (c11_chem_cbse_07_015).

## WALKTHROUGH
Observe a bottle of vinegar (5% acetic acid) and a bottle of ammonia solution (used for cleaning) in your kitchen. Both taste/smell sharp but neither conducts electricity as well as hydrochloric acid or sodium hydroxide solutions of the same concentration. This tells you they are partially ionised — they exist in equilibrium between molecules and ions. Start by writing the equilibrium for acetic acid: CH₃COOH ⇌ H⁺ + CH₃COO⁻. Notice that water concentration is constant and omitted from Ka. Connect this to the Law of Chemical Equilibrium (c11_chem_cbse_07_003) where Kc = [products]/[reactants]. The key step is recognising that for weak acids, [H⁺] ≠ initial concentration — you must use the equilibrium expression with an ICE table. End with the quantitative relationship: Ka = Cα²/(1-α) ≈ Cα² when α < 5%.

## DIAGNOSTIC_QUESTION_1
Write the expression for the acid ionisation constant (Ka) for hydrocyanic acid (HCN) and the base ionisation constant (Kb) for methylamine (CH₃NH₂). State the units of Ka and Kb.

## DIAGNOSTIC_ANSWER_1
Ka(HCN) = [H⁺][CN⁻]/[HCN]; Kb(CH₃NH₂) = [CH₃NH₃⁺][OH⁻]/[CH₃NH₂]. Units: mol L⁻¹ (or dimensionless if activities are used). A wrong answer reveals the student either includes water in the Kb expression (treating it as a reactant with variable concentration) or writes the reciprocal expression, confusing Ka with 1/Ka. This indicates they haven't internalised that equilibrium constants omit pure liquids and that the forward reaction defines the constant.

## DIAGNOSTIC_QUESTION_2
A 0.10 M solution of a weak acid HA has pH = 3.00. A student calculates Ka = (10⁻³)²/0.10 = 1.0 × 10⁻⁵. Is this calculation correct? Explain why or why not, and provide the exact Ka value.

## DIAGNOSTIC_ANSWER_2
The calculation is approximate, not exact. It assumes [H⁺]eq = [A⁻]eq = 10⁻³ M and [HA]eq ≈ 0.10 M (ignoring the decrease due to ionisation). Exact Ka = (10⁻³)²/(0.10 - 10⁻³) = 1.01 × 10⁻⁵. The 5% rule (α = 10⁻³/0.10 = 1% < 5%) justifies the approximation. A wrong answer (saying it's exactly correct) reveals the student doesn't understand the approximation's validity condition or that equilibrium concentration of HA is (C - Cα), not C. This is a classic board exam trap — they ask "calculate Ka" and expect the exact expression.

## DIAGNOSTIC_QUESTION_3
Calculate the degree of ionisation (α) and pH of a 0.05 M acetic acid solution given Ka = 1.8 × 10⁻⁵. Show all steps including the validity check for the approximation.

## DIAGNOSTIC_ANSWER_3
Step 1: Write Ka = Cα²/(1-α). Step 2: Check if α < 5% using approximation α ≈ √(Ka/C) = √(1.8×10⁻⁵/0.05) = √(3.6×10⁻⁴) = 0.019 = 1.9% < 5% → approximation valid. Step 3: α = 0.019. Step 4: [H⁺] = Cα = 0.05 × 0.019 = 9.5 × 10⁻⁴ M. Step 5: pH = -log(9.5×10⁻⁴) = 3.02. A wrong answer (e.g., α = 0.19 or pH = 2.02) reveals the student either forgot to take square root, misplaced decimal in Ka/C, or used [H⁺] = √(Ka) instead of √(Ka×C). This shows confusion between Ostwald's law (α = √(Ka/C)) and [H⁺] = √(Ka×C).

## DIAGNOSTIC_QUESTION_4
The Ka of acetic acid is 1.8 × 10⁻⁵ at 298 K. The Kb of its conjugate base (acetate ion) is 5.6 × 10⁻¹⁰. Verify that Ka × Kb = Kw. Now, if the temperature is raised to 310 K where Kw = 1.47 × 10⁻¹⁴, what happens to Ka and Kb individually? Can you determine their new values from this information alone?

## DIAGNOSTIC_ANSWER_4
At 298 K: Ka × Kb = (1.8×10⁻⁵)(5.6×10⁻¹⁰) = 1.008×10⁻¹⁴ ≈ Kw (1.0×10⁻¹⁴). At 310 K, Kw increases to 1.47×10⁻¹⁴. The product Ka×Kb must equal the new Kw, but we CANNOT determine individual new Ka and Kb values from this alone — they depend on the enthalpy of ionisation of each species (van't Hoff equation). A wrong answer claiming Ka and Kb both increase by the same factor reveals the student thinks Ka and Kb scale identically with temperature, ignoring that acid and base ionisation have different ΔH values. This tests deep understanding of the thermodynamic origin of equilibrium constants.

## DIAGNOSTIC_QUESTION_5
A student is given two 0.1 M solutions: one of weak acid HA (Ka = 1.0 × 10⁻⁵) and one of weak base B (Kb = 1.0 × 10⁻⁵). They claim both solutions have the same pH. Evaluate this claim.

## DIAGNOSTIC_ANSWER_5
The claim is FALSE. For HA: [H⁺] = √(Ka×C) = √(10⁻⁵ × 0.1) = √10⁻⁶ = 10⁻³ M → pH = 3. For B: [OH⁻] = √(Kb×C) = 10⁻³ M → pOH = 3 → pH = 14 - 3 = 11. The acid solution is acidic (pH 3), the basic solution is basic (pH 11). A wrong answer (pH = 3 for both) reveals the student calculates [H⁺] for the base instead of [OH⁻], or forgets pH + pOH = 14. This is a fundamental confusion between acid and base ionisation equilibria — they treat Kb as if it directly gives [H⁺].

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using only household materials (vinegar, baking soda, pH paper, measuring cups) to demonstrate that acetic acid is a weak acid while HCl (toilet cleaner) is a strong acid. Explain how your observations would differ and what quantitative estimate you could make.

## DIAGNOSTIC_ANSWER_6
Take equal volumes (e.g., 50 mL) of vinegar (~0.8 M CH₃COOH) and diluted toilet cleaner (~0.1 M HCl). Add 1 tsp baking soda (NaHCO₃) to each. HCl reacts vigorously with immediate CO₂ evolution (strong acid → complete H⁺). Vinegar reacts slowly with less vigorous fizzing (weak acid → partial H⁺, equilibrium shifts as CO₂ leaves). Use pH paper: HCl solution pH ≈ 1, vinegar pH ≈ 2.4. Estimate Ka: from vinegar pH, [H⁺] = 10⁻²·⁴ = 4×10⁻³ M, α = 4×10⁻³/0.8 = 0.5%, Ka ≈ Cα² = 0.8×(0.005)² = 2×10⁻⁵ (close to actual 1.8×10⁻⁵). A poor answer uses only qualitative "more fizz" without pH measurement or quantitative estimation, showing they can't connect observation to equilibrium constant.

## COMMON_MISCONCEPTION
Students write the base ionisation equilibrium as B + H₂O ⇌ BH⁺ + OH⁻ but then write Kb = [BH⁺][OH⁻]/([B][H₂O]), including water concentration. They treat water as a reactant with variable concentration instead of recognising it as the solvent (pure liquid) with constant activity = 1. This leads to wrong units (mol² L⁻² instead of mol L⁻¹) and incorrect numerical values. Example: For 0.1 M NH₃, they calculate Kb = [NH₄⁺][OH⁻]/([NH₃]×55.5) instead of /[NH₃], getting a value 55.5 times too small. This error persists because they mechanically apply "concentration of all species" rule from Kc without the "omit pure solids/liquids" caveat.

## ON_FAILURE
Step 1: Revisit the definition of equilibrium constant Kc from c11_chem_cbse_07_003 — emphasise that pure liquids (solvents) and pure solids are omitted because their activities are constant (unity). Step 2: Write the ionisation of NH₃ two ways: (a) NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ and (b) NH₃ ⇌ NH₄⁺ + OH⁻ (with water implied). Show that Kc for (a) would include [H₂O], but standard Kb is defined for (b) by convention. Step 3: Do a numerical comparison: calculate Kb for 0.1 M NH₃ (pH=11.1) both ways — with and without [H₂O] — to see the 55.5 factor difference. Step 4: Memorise the rule: "In aqueous acid/base ionisation, water is the solvent — never appears in Ka/Kb expression."

## PREREQUISITE_NODE_IDS
c11_chem_cbse_07_003, c11_chem_cbse_07_009, c10_chem_cbse_02_008, c11_chem_cbse_07_010

## PREREQUISITE_REASONS
c11_chem_cbse_07_003: Law of Chemical Equilibrium provides the foundation for writing Ka/Kb as equilibrium constants with concentration expressions.
c11_chem_cbse_07_009: Ionic Equilibrium: Acids and Bases introduces Arrhenius/Brønsted-Lowry definitions and the concept of weak vs strong acids/bases — essential prerequisite for understanding partial ionisation.
c10_chem_cbse_02_008: pH Scale from Class 10 gives the logarithmic relationship between [H⁺] and pH, needed for calculating pH from Ka and vice versa.
c11_chem_cbse_07_010: Ka/Kb calculations for weak acids/bases often involve Lewis acid-base equilibria (e.g., metal ion hydrolysis).  

## FORWARD_NODE_IDS
c11_chem_cbse_07_012, c11_chem_cbse_07_013, c11_chem_cbse_07_015, c11_chem_cbse_07_014, c12_chem_cbse_01_011, c12_chem_cbse_02_006, c12_chem_cbse_08_006, c12_chem_cbse_08_009, c12_chem_cbse_09_007, c12_chem_cbse_10_010, c12_chem_cbse_01_010

## FORWARD_REASONS
c11_chem_cbse_07_012: pH Scale Calculations directly uses Ka/Kb to compute [H⁺] and pH of weak acid/base solutions — the primary application of this node.
c11_chem_cbse_07_013: Buffer Solutions require Ka of weak acid and Kb of conjugate base (via Ka×Kb=Kw) to apply Henderson-Hasselbalch equation.
c11_chem_cbse_07_015: Hydrolysis of Salts uses Kb of anion (from Ka of conjugate acid) and Ka of cation (from Kb of conjugate base) to find pH of salt solutions.
c11_chem_cbse_07_014: Ionisation constants (Ka, Kb) familiarize students with equilibrium constants for weak electrolytes, analogous to Ksp for sparingly soluble salts.  
c12_chem_cbse_01_011: Ionisation of weak acids (Ka, degree of dissociation α) is directly applied in calculating α from i for weak electrolytes.  
c12_chem_cbse_02_006: Covers Ka, Kb, Ostwald's dilution law, and α = √(Ka/c) for weak acids — essential for the Ka = cα²/(1-α) derivation used here.  
c12_chem_cbse_08_006: pH calculations and conjugate base stability directly apply to enolate resonance stabilization.  
c12_chem_cbse_08_009: Ka, Kb, pKa definitions and calculations are essential for quantifying acidity  
c12_chem_cbse_09_007: pH scale and pKb definition are directly used to quantify basicity.  
c12_chem_cbse_10_010: Ionisation of acids/bases, Ka/Kb — relevant for understanding protonation states of hormone/receptor binding sites at physiological pH.  
c12_chem_cbse_01_010: id equilibrium. This integrates colligative properties (Class 12) with ionic equilibrium (Class 11, c11_chem_cbse_07_011).  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_01_001, c11_math_cbse_02_001
## CROSS_SUBJECT_REASONS
c11_math_cbse_01_001: Logarithms and their properties (log(ab) = log a + log b, log(a/b) = log a - log b, log aⁿ = n log a) are essential for pH = -log[H⁺] calculations and manipulating Ka expressions.
c11_math_cbse_02_001: Quadratic equations (ax² + bx + c = 0) are needed when the 5% approximation fails and exact solution of Ka = Cα²/(1-α) requires solving Cα² + Kaα - Ka = 0.

## CHAIN_DESCRIPTION
c11_chem_cbse_07_003 -> c11_chem_cbse_07_009 -> c11_chem_cbse_07_011 -> c11_chem_cbse_07_012 -> c11_chem_cbse_07_013

## THIS_FORMULA
Ka = [H⁺][A⁻]/[HA] (weak acid); Kb = [BH⁺][OH⁻]/[B] (weak base); Ka × Kb = Kw (conjugate pair); α = √(Ka/C) (Ostwald's dilution law, α < 5%); [H⁺] = √(Ka×C); pH = -log[H⁺]

## FORMULA_VARIABLES
Ka = acid ionisation constant (mol L⁻¹); Kb = base ionisation constant (mol L⁻¹); [H⁺] = hydrogen ion concentration at equilibrium (mol L⁻¹); [A⁻] = conjugate base concentration (mol L⁻¹); [HA] = undissociated acid concentration (mol L⁻¹); [BH⁺] = conjugate acid concentration (mol L⁻¹); [OH⁻] = hydroxide ion concentration (mol L⁻¹); [B] = undissociated base concentration (mol L⁻¹); C = initial molar concentration of acid/base (mol L⁻¹); α = degree of ionisation (dimensionless); Kw = ionic product of water = 1.0 × 10⁻¹⁴ at 298 K (mol² L⁻²); pH = -log₁₀[H⁺] (dimensionless)

## FORMULA_UNITS
Ka, Kb: mol L⁻¹ (or dimensionless with activities); Kw: mol² L⁻²; C: mol L⁻¹; α: dimensionless; pH, pOH, pKa, pKb: dimensionless

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_01_001 | Logarithm properties enable pH = -log[H⁺] and pKa = -log Ka calculations; also used in Henderson-Hasselbalch equation for buffers
c11_math_cbse_02_001 | Quadratic formula solves exact equilibrium concentrations when α > 5% approximation fails
c11_physics_cbse_03_001 | Thermodynamics (ΔG° = -RT ln K) connects to temperature dependence of Ka/Kb via van't Hoff equation
c11_biology_cbse_02_001 | Blood buffer system (H₂CO₃/HCO₃⁻) applies Ka/Kb and conjugate pair concepts to maintain pH 7.4

## PREREQ_CONCEPT
Equilibrium constant expression (Kc) for homogeneous equilibria in aqueous solutions, with pure liquids omitted.

## PREREQ_BEFORE
Student must be able to write Kc for a given equilibrium reaction and identify when to omit water/solids.

## PREREQ_STUCK
Review c11_chem_cbse_07_003 (Law of Chemical Equilibrium) — specifically the rule for writing Kc expressions and omitting pure liquids.

## WORKED_EXAMPLE_1
PROBLEM: The pH of a 0.02 M solution of a weak monoprotic acid HX is 2.85 at 298 K. Calculate (i) the hydrogen ion concentration, (ii) the degree of ionisation, (iii) the acid ionisation constant Ka, and (iv) the pKa of the acid.

STEPS:
- Step 1: Identify given data: C = 0.02 M, pH = 2.85, T = 298 K. Find [H⁺], α, Ka, pKa.
- Step 2: Calculate [H⁺] from pH: [H⁺] = 10⁻ᵖᴴ = 10⁻²·⁸⁵ = 1.41 × 10⁻³ M (using antilog: 10⁻²·⁸⁵ = 10⁻³ × 10⁰·¹⁵ = 1.41 × 10⁻³).
- Step 3: Calculate degree of ionisation α = [H⁺]/C = (1.41 × 10⁻³)/0.02 = 0.0705 = 7.05%. Check approximation validity: α = 7.05% > 5% → approximation α ≈ √(Ka/C) is NOT valid; must use exact formula.
- Step 4: Use exact Ka expression: Ka = [H⁺][X⁻]/[HX] = [H⁺]²/(C - [H⁺]) because [H⁺] = [X⁻] and [HX]eq = C - [H⁺]. Substitute: Ka = (1.41×10⁻³)²/(0.02 - 1.41×10⁻³) = 1.99×10⁻⁶/0.01859 = 1.07 × 10⁻⁴.
- Step 5: Calculate pKa = -log Ka = -log(1.07 × 10⁻⁴) = 4 - log 1.07 = 4 - 0.029 = 3.97.
- Step 6: Verify consistency: Using Ka = 1.07×10⁻⁴, C = 0.02, solve quadratic Cα² + Kaα - Ka = 0 → α = 0.0705. Matches Step 3.

REASONING: The pH directly gives [H⁺] at equilibrium. Since HX ⇌ H⁺ + X⁻, stoichiometry gives [H⁺] = [X⁻]. The equilibrium [HX] is initial minus dissociated. The 5% check is critical — here α > 5% so the approximation Ka ≈ Cα² would give Ka = 0.02 × (0.0705)² = 9.94 × 10⁻⁵ (7% error). Board exams often test this distinction.

ANSWER: (i) [H⁺] = 1.41 × 10⁻³ M, (ii) α = 0.0705 (7.05%), (iii) Ka = 1.07 × 10⁻⁴, (iv) pKa = 3.97

## WORKED_EXAMPLE_2
PROBLEM: A 0.15 M solution of a weak base B has pH = 11.20 at 298 K. Calculate Kb of the base and Ka of its conjugate acid BH⁺. If 0.10 mol of HCl is added to 1 L of this solution, what will be the approximate pH of the resulting solution? (Assume volume change negligible)

STEPS:
- Step 1: Given C = 0.15 M, pH = 11.20. Find pOH = 14 - 11.20 = 2.80. [OH⁻] = 10⁻²·⁸⁰ = 1.58 × 10⁻³ M.
- Step 2: Degree of ionisation α = [OH⁻]/C = 1.58×10⁻³/0.15 = 0.0105 = 1.05% < 5% → approximation valid.
- Step 3: Kb = [BH⁺][OH⁻]/[B] ≈ Cα² = 0.15 × (0.0105)² = 1.65 × 10⁻⁵. (Exact: (1.58×10⁻³)²/(0.15 - 1.58×10⁻³) = 1.67 × 10⁻⁵).
- Step 4: Ka of conjugate acid BH⁺ = Kw/Kb = 1.0×10⁻¹⁴/1.65×10⁻⁵ = 6.06 × 10⁻¹⁰. pKa = 9.22.
- Step 5: Adding 0.10 mol HCl to 1 L of 0.15 M B: HCl is strong acid, reacts completely with B: B + H⁺ → BH⁺. Initial moles: B = 0.15, H⁺ = 0.10. After reaction: B = 0.05 mol, BH⁺ = 0.10 mol. This creates a buffer solution!
- Step 6: Use Henderson-Hasselbalch: pH = pKa + log([B]/[BH⁺]) = 9.22 + log(0.05/0.10) = 9.22 - 0.30 = 8.92. (Approximate because we ignore water autoionisation and activity effects).

REASONING: The problem combines three concepts: (1) Kb from pH of weak base, (2) conjugate pair relationship Ka×Kb=Kw, (3) buffer formation when strong acid is added to weak base in non-stoichiometric amounts. Step 5 is the key insight — the resulting mixture is a buffer, not a simple weak base solution. This mirrors board exam questions that link Ka/Kb to buffer preparation.

ANSWER: Kb = 1.65 × 10⁻⁵, Ka(BH⁺) = 6.06 × 10⁻¹⁰, pH after adding HCl ≈ 8.92

## WORKED_EXAMPLE_3
PROBLEM: The Ka of formic acid (HCOOH) is 1.8 × 10⁻⁴ at 298 K. Calculate the pH of a solution prepared by dissolving 2.3 g of sodium formate (HCOONa) in 500 mL of 0.1 M formic acid solution. Molar mass of HCOONa = 68 g mol⁻¹. Then, determine the volume of 0.2 M NaOH required to be added to 200 mL of this buffer to change its pH by exactly 0.5 units.

STEPS:
- Step 1: Calculate moles of HCOONa = 2.3/68 = 0.0338 mol. Volume = 0.5 L → [HCOO⁻] = 0.0676 M. [HCOOH] = 0.1 M (given, assume negligible dilution from solid addition).
- Step 2: This is an acidic buffer. pKa = -log(1.8×10⁻⁴) = 3.74. Use Henderson-Hasselbalch: pH = pKa + log([salt]/[acid]) = 3.74 + log(0.0676/0.1) = 3.74 - 0.17 = 3.57.
- Step 3: Target pH = 3.57 + 0.5 = 4.07. Take 200 mL of buffer: initial moles HCOOH = 0.1 × 0.2 = 0.02 mol; HCOO⁻ = 0.0676 × 0.2 = 0.0135 mol.
- Step 4: Adding NaOH (strong base) reacts with HCOOH: HCOOH + OH⁻ → HCOO⁻ + H₂O. Let x = moles NaOH added. New moles: HCOOH = 0.02 - x, HCOO⁻ = 0.0135 + x.
- Step 5: New pH = 4.07 = 3.74 + log((0.0135+x)/(0.02-x)). So log((0.0135+x)/(0.02-x)) = 0.33 → (0.0135+x)/(0.02-x) = 10⁰·³³ = 2.14.
- Step 6: Solve: 0.0135 + x = 2.14(0.02 - x) = 0.0428 - 2.14x → 3.14x = 0.0293 → x = 0.00933 mol. Volume of 0.2 M NaOH = 0.00933/0.2 = 0.0467 L = 46.7 mL.
- Step 7: Verify buffer capacity: final [HCOOH] = (0.02-0.00933)/0.2467 = 0.043 M, [HCOO⁻] = (0.0135+0.00933)/0.2467 = 0.092 M. Ratio = 2.14, pH = 3.74 + log(2.14) = 4.07 ✓.

REASONING: This integrates Ka, buffer equation (derived from Ka), stoichiometry of strong base-weak acid reaction, and buffer capacity calculation. Step 5 uses the exact buffer equation, not approximation. The volume change (200 mL → 246.7 mL) is included in concentration ratio but cancels out in Henderson-Hasselbalch since both species are in same volume. This is a typical 5-mark board question combining multiple concepts.

ANSWER: Initial buffer pH = 3.57; Volume of 0.2 M NaOH required = 46.7 mL

## COMPETENCY_QUESTION_1
QUESTION: A student prepares two solutions: Solution A contains 0.1 M CH₃COOH (Ka = 1.8×10⁻⁵) and Solution B contains 0.1 M NH₃ (Kb = 1.8×10⁻⁵). They measure the pH of both and find pH(A) = 2.87 and pH(B) = 11.13. The student concludes: "Since Ka of CH₃COOH equals Kb of NH₃, the solutions are equally acidic and basic respectively, so their pH values are symmetric about 7." Evaluate this conclusion. Is the symmetry exact? Justify mathematically.

COMPETENCY: Interpreting chemical equations and relating properties to equilibrium constants

STEPS:
- Step 1: Calculate [H⁺] for A: pH = 2.87 → [H⁺] = 1.35×10⁻³ M. For B: pOH = 14 - 11.13 = 2.87 → [OH⁻] = 1.35×10⁻³ M. The ion concentrations are equal.
- Step 2: Check if pH(A) + pH(B) = 14? 2.87 + 11.13 = 14.00. Yes, symmetric about 7.
- Step 3: Is this exact for all concentrations? For weak acid: [H⁺] = √(Ka·C). For weak base: [OH⁻] = √(Kb·C). If Ka = Kb and C same, then [H⁺] = [OH⁻] → pH = 14 - pOH → pH(acid) + pH(base) = 14.
- Step 4: But this assumes the 5% approximation holds for both. If α > 5%, exact expressions differ: Ka = [H⁺]²/(C-[H⁺]), Kb = [OH⁻]²/(C-[OH⁻]). If Ka=Kb and C same, then [H⁺] = [OH⁻] still holds exactly because the equations are identical in form.
- Step 5: Conclusion: The symmetry IS exact when Ka = Kb and concentrations are equal, regardless of approximation validity, because the equilibrium expressions are mathematically identical. The student's reasoning is correct but incomplete — they didn't prove it holds beyond the approximation.

ANSWER: The conclusion is correct — pH values are exactly symmetric about 7 (sum = 14) when Ka = Kb and initial concentrations are equal. This holds exactly because the equilibrium equations for [H⁺] and [OH⁻] are mathematically identical: Ka = x²/(C-x) and Kb = y²/(C-y) with Ka=Kb implies x=y.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The Ka of a weak acid HA is 2.5 × 10⁻⁵ at 298 K. A 0.2 M solution of its sodium salt NaA is prepared. (i) Write the hydrolysis reaction of A⁻ and its Kb expression. (ii) Calculate the pH of the NaA solution. (iii) If 100 mL of 0.1 M HCl is added to 400 mL of this NaA solution, calculate the new pH. (iv) Explain why the pH change is less than what would occur if the same HCl were added to 400 mL of pure water.

COMPETENCY: Predicting reaction products and applying equilibrium concepts to buffer systems

STEPS:
- Step 1: Hydrolysis: A⁻ + H₂O ⇌ HA + OH⁻. Kb = Kw/Ka = 10⁻¹⁴/2.5×10⁻⁵ = 4.0 × 10⁻¹⁰.
- Step 2: For 0.2 M NaA, [A⁻] ≈ 0.2 M. Kb = [HA][OH⁻]/[A⁻] ≈ x²/0.2 → x = [OH⁻] = √(4×10⁻¹⁰ × 0.2) = √(8×10⁻¹¹) = 8.94×10⁻⁶ M. pOH = 5.05, pH = 8.95. Check α = x/0.2 = 4.5×10⁻⁵ << 5% ✓.
- Step 3: After adding 100 mL 0.1 M HCl to 400 mL 0.2 M NaA: Total volume = 500 mL. Moles NaA = 0.2 × 0.4 = 0.08 mol. Moles HCl = 0.1 × 0.1 = 0.01 mol. Reaction: A⁻ + H⁺ → HA. Remaining A⁻ = 0.07 mol, formed HA = 0.01 mol. [A⁻] = 0.07/0.5 = 0.14 M, [HA] = 0.01/0.5 = 0.02 M. This is a buffer!
- Step 4: pH = pKa + log([A⁻]/[HA]) = -log(2.5×10⁻⁵) + log(0.14/0.02) = 4.60 + log(7) = 4.60 + 0.85 = 5.45.
- Step 5: In pure water (400 mL + 100 mL = 500 mL), 0.01 mol HCl gives [H⁺] = 0.01/0.5 = 0.02 M → pH = 1.70. The buffer resists pH change because added H⁺ is consumed by A⁻ (Le Chatelier's principle on A⁻ + H₂O ⇌ HA + OH⁻), converting strong acid to weak acid HA. The pH change in buffer: 8.95 → 5.45 (ΔpH = 3.5). In water: 7 → 1.70 (ΔpH = 5.3).

ANSWER: (i) A⁻ + H₂O ⇌ HA + OH⁻, Kb = [HA][OH⁻]/[A⁻] = 4.0×10⁻¹⁰. (ii) pH = 8.95. (iii) pH = 5.45. (iv) Buffer action: A⁻ consumes added H⁺ forming weak acid HA, minimising [H⁺] change.

DIFFICULTY: hard