import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch01_p2: SimDef = {
    id: 'v3_c11_phy_ch01_p2',
    title: 'Units and Measurements · Part 2/3',
    subtitle: 'Unpack the famous units into the seven base ones underneath.',
    classLevel: 11, subject: 'physics', topic: 'Units and Measurements · Part 2/3',
    chapters: ['c11_phy_ch01'],
    nodeIds: ['c11_phy_cbse_01_007', 'c11_phy_cbse_01_008', 'c11_phy_cbse_01_009', 'c11_phy_cbse_01_010', 'c11_phy_cbse_01_011', 'c11_phy_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a lab calibrator checking what a unit really contains', intro: 'The dairy\'s steel \'litre\' and NPL\'s light-speed-defined metre are the same word with very different pedigrees.', goal: 'Distinguish base from derived units and express any unit in SI base form.' },
    discovery: {
        question: 'Force = mass × acceleration, so the unit of force is kg·m/s — correct?',
        options: ['No — acceleration is m/s², so the newton unfolds as kg·m·s⁻²; kg·m/s is momentum\'s unit', 'Yes — velocity and acceleration share units', 'Yes — newton is a fundamental unit anyway', 'No — it\'s kg·m·s⁻¹'],
        answer: 'No — acceleration is m/s², so the newton unfolds as kg·m·s⁻²; kg·m/s is momentum\'s unit',
        hook: 'Newtons and joules aren\'t fundamental — they\'re shorthand; every derived unit is base units multiplied and divided with no hidden factor.',
    },
    teaching: [
        { title: 'Applications of Dimensional Analysis', text: 'Dimensional analysis is a mathematical technique used to check the dimensional consistency of physical equations and to derive relationships between physical quantities by expressing each quantity.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_01_007', title: 'Your mission',
          mission: { widget: 'weigh', validate: 'weigh:grams=40',
            instruction: 'On the lab: weigh out 40 g — is the scale balanced?.',
        context: 'Convert 72 km/h into 20 m/s honestly, then break \'J·s\' and \'N\' back into base units until nothing but m, kg, s remains.',
            observePrompt: 'What did the weigh interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_01_007', title: 'Applications of Dimensional Analysis',
          scaffold: { problem: 'The frequency f of a stretched string depends on its length l, tension T, and mass per unit length μ.',
            steps: [
            { text: 'Identify the dependent quantity (frequency f) and independent quantities (l, T, μ).' },
            { text: 'Assume a product-of-powers relation: f = k l^x T^y μ^z where k is dimensionless.' },
            { text: 'Simplify RHS using exponent laws: [T⁻¹] = [M^(y+z) L^(x+y-z) T^(-2y)].' },
            { text: 'Equate powers of M, L, T on both sides: M: y+z = 0; L: x+y-z = 0; T: -2y = -1.' },
            { text: 'Solve the system: From T: y = 1/2. From M: z = -y = -1/2. From L: x + 1/2 - (-1/2) = 0 → x + 1 = 0 → x = -1.' },
            { text: 'Substitute back: f = k l^(-1) T^(1/2) μ^(-1/2) = (k/l) √(T/μ).', faded: true, blankAnswer: 'f = (k/l) √(T/μ) where k is a dimensionless constant (k.' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_01_008', title: 'Limitations of Dimensional Analysis',
          caseStudy: { intro: 'Imagine you\'re trying to find the time period of a simple pendulum using dimensional analysis.',
            decisions: [{ prompt: 'State any three limitations of dimensional analysis as per NCERT Class 11 curriculum.', options: [
                { text: 'The three limitations are: (1) Cannot determine dimensionless numerical constants (e.g.,', outcome: 'The three limitations are: (1) Cannot determine dimensionless numerical constants (e.g., 2, π.' },
                { text: 'cannot find constants', outcome: 'Not quite — Students believe that if an equation is dimensionally consistent, it must be physically correct.', reveals: 'if-an-equation-is-dimensionally' },
                { text: 'if an equation is dimensionally consistent, it must be physically correct', outcome: 'Not quite — Students believe that if an equation is dimensionally consistent, it must be physically correct.', reveals: 'if-an-equation-is-dimensionally' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_01_009', title: 'Order of Magnitude and Estimation',
          scaffold: { problem: 'The radius of a hydrogen atom is 0.53 Å (1 Å = 10^-10 m). The radius of a proton is 0.84 fm (1 fm = 10^-15 m).',
            steps: [
            { text: 'Convert both radii to metres in scientific notation. Hydrogen: 0.53 Å = 0.53 × 10^-10 m = 5.3 × 10^-11 m.' },
            { text: 'Identify base a and exponent b for each. Hydrogen: a_H = 5.3, b_H = -11. Proton: a_p = 8.4, b_p = -16.' },
            { text: 'Apply NCERT rounding rule to find order of magnitude. Hydrogen: 5.3 > 5 → order_H = -11 + 1 = -10.' },
            { text: 'Calculate difference in orders of magnitude. Δorder = order_H - order_p = (-10) - (-15) = 5.' },
            { text: 'Verify by direct ratio. Ratio = (5.3×10^-11) / (8.4×10^-16) = 0.63 × 10^5 = 6.3 × 10^4.' },
            { text: 'State final answer with interpretation. The hydrogen atom is 5 orders of magnitude larger in radius than the proton.', faded: true, blankAnswer: '5 orders of magnitude' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_01_010', title: 'Measurement of Length: Direct and Indirect Methods',
          scaffold: { problem: 'A student uses a vernier calipers to measure the internal diameter of a cylindrical pipe. The main scale reading is 3.1 cm.',
            steps: [
            { text: 'Identify given values: MSR = 3.1 cm, coinciding division = 6, 20 VSD = 19 MSD, 1 MSD = 0.1 cm, zero error = -0.02 cm.' },
            { text: 'Calculate least count: 20 VSD = 19 MSD = 19 × 0.1 = 1.9 cm, so 1 VSD = 1.9/20 = 0.095 cm.' },
            { text: 'Calculate vernier scale reading: VSR = coinciding division × LC = 6 × 0.005 = 0.03 cm.' },
            { text: 'Calculate observed reading: Observed = MSR + VSR = 3.1 + 0.03 = 3.13 cm.' },
            { text: 'Apply zero error correction: Corrected = Observed - Zero Error = 3.13 - (-0.02) = 3.13 + 0.02 = 3.15 cm.' },
            { text: 'Report with proper significant figures: MSR has 2 decimal places (0.1 cm precision), VSR has 3 decimal places (0.005.', faded: true, blankAnswer: '3.15 cm (or 31.5 mm)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_01_011', title: 'Measurement of Large Distances: Parallax Method',
          scaffold: { problem: 'The nearest star to the Sun, Proxima Centauri, has a parallax angle of 0.7687 arcseconds.',
            steps: [
            { text: 'Identify given: parallax angle p = 0.7687 arcsec. Baseline for annual parallax is 1 AU (by definition of parsec).' },
            { text: 'Use parsec definition: distance in parsecs = 1 / p(arcsec) = 1 / 0.7687 = 1.301 pc.' },
            { text: 'Convert parsecs to meters: 1 pc = 3.086 × 10¹⁶ m. Distance = 1.301 × 3.086 × 10¹⁶ = 4.015 × 10¹⁶ m.' },
            { text: 'Convert meters to light-years: 1 ly = 9.461 × 10¹⁵ m. Distance = 4.015 × 10¹⁶ / 9.461 × 10¹⁵ = 4.244 ly.' },
            { text: 'Verify reasonableness: Known distance to Proxima Centauri is ~4.24 ly. Answer matches.' },
            { text: 'State final answers with units: (a) 1.301 pc, (b) 4.015 × 10¹⁶ m, (c) 4.244 ly.', faded: true, blankAnswer: '(a) 1.301 pc, (b) 4.015 × 10¹⁶ m, (c) 4.244 ly' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_01_012', title: 'Measurement of Mass and Time',
          caseStudy: { intro: 'Observe a vegetable vendor using a beam balance with standard weights to measure 1 kg of onions, and a student using a digital stopwatch to time a 100 m race.',
            decisions: [{ prompt: 'State the modern SI definition of the kilogram and the second, including the fixed numerical values of the fundamental constants involved.', options: [
                { text: 'The kilogram is defined by fixing the Planck constant h = 6.62607015×10⁻³⁴ J·s (exact)', outcome: 'The kilogram is defined by fixing the Planck constant h = 6.62607015×10⁻³⁴ J·s (exact).' },
                { text: 'kilogram is the mass of the IPK cylinder', outcome: 'Not quite — Students often believe that "mass is measured in kg and weight in newtons, so they are completely.', reveals: 'mass-is-measured-in-kg' },
                { text: 'second is 1/86400 of a mean solar day', outcome: 'Not quite — Students often believe that "mass is measured in kg and weight in newtons, so they are completely.', reveals: 'mass-is-measured-in-kg' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a lab-report review, a junior writes \'force = 10 N\' and explains: \'the newton is a fundamental unit like the kilogram — it has its own name.\' He also says \'SI and metric are the same thing.\'',
            decisions: [{ prompt: 'What does the measurement framework actually require?', options: [
                { text: 'Separate quantity from unit and name from status: \'N\' is the unit, force is the quantity — every measurement is numerical value × unit. The newton is a DERIVED unit: shorthand for kg·m·s⁻², not fundamental. And SI isn\'t just \'metric\': it\'s the coherent system where derived units are products of the seven base units with no conversion factors — that\'s what makes dimensional analysis work.', outcome: 'The report tightens: units decompose into the base alphabet, and SI\'s coherence — not just its names — is the point.' },
                { text: 'Let the newton stand as fundamental — it has a special name, after all.', outcome: 'Special names honour convenience, not fundamentality: N and J unpack into kg, m, s — only the seven base units are irreducible.', reveals: 'named-units-are-fundamental' },
                { text: 'Accept SI = metric — they\'re just two names for the same units.', outcome: 'Metric is a family of systems (CGS, MKS, FPS) with different bases; SI is specifically the coherent one — a dyne isn\'t \'another SI unit\', it\'s a different system\'s unit.', reveals: 'si-equals-metric' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'A measurement is a number times a standard — lose the unit and \'5\' could mean five grams or five tonnes.',
            decisions: [{ prompt: 'What comes next? Units and Measurements · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Units and Measurements · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'weigh', prompt: 'Explore the weigh interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'weigh', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_01_007', difficulty: 'standard',
          question: 'Dimensional analysis is a mathematical technique used to check the dimensional.',
          hint: 'If stuck, immediately revisit c11_phy_cbse_01_006 (Dimensional Analysis: Dimensional.',
          misconception: 'Students believe that if an equation is dimensionally correct, it is physically correct.',
          parts: [
                { id: 'a', prompt: 'The time period T of a gas bubble oscillating under water depends on pressure P, density ρ, and energy E of the explosion.', answer: 'Assume T = k P^a ρ^b E^c',
                  options: ['Assume T = k P^a ρ^b E^c', 'if an equation is dimensionally correct, it is physically correct'],
                  hint: 'If stuck, immediately revisit c11_phy_cbse_01_006 (Dimensional Analysis: Dimensional Formula) and.',
                  misconception: 'Students believe that if an equation is dimensionally correct, it is physically correct.' },
                { id: 'b', prompt: 'The escape velocity v_e from a planet is given by v_e = √(2GM/R). A student proposes an alternative formula v_e = k G^x M^y R^z where k is dimensionless.', answer: '[v_e] = [L T⁻¹]',
                  options: ['[v_e] = [L T⁻¹]', 'if an equation is dimensionally correct, it is physically correct'],
                  hint: 'If stuck, immediately revisit c11_phy_cbse_01_006 (Dimensional Analysis: Dimensional Formula) and.',
                  misconception: 'Students believe that if an equation is dimensionally correct, it is physically correct.' }
          ],
            remediations: { 'if-an-equation-is-dimensionally': { steps: ['Take two dimensionally correct but physically different equations (e.g., KE = ½mv² vs KE = mv²; or T = 2π√(l/g) vs.', 'Verify both have identical dimensions on all terms.', 'Explain that dimensional analysis cannot distinguish them because dimensionless constants (½ vs 1, 2π vs π) have.', 'State the rule: "Dimensional analysis can ONLY rule out wrong equations; it can NEVER confirm a unique right equation."'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that if an equation is dimensionally correct, it is physically correct.',
          parts: [
                { id: 'a', prompt: 'A physics textbook states: "The argument of a trigonometric function must be dimensionless." Evaluate the dimensional correctness of the equation x = A sin(ωt.', answer: 'The equation IS dimensionally correct',
                  options: ['The equation IS dimensionally correct', 'if an equation is dimensionally correct, it is physically correct'],
                  hint: 'If stuck, immediately revisit c11_phy_cbse_01_006 (Dimensional Analysis: Dimensional Formula) and.',
                  misconception: 'Students believe that if an equation is dimensionally correct, it is physically correct.' },
                { id: 'b', prompt: 'Design a thought experiment to test whether the period of a simple pendulum depends on the mass of the bob using only dimensional analysis reasoning (no actual.', answer: 'Dimensional analysis setup: T = k l^x g^y m^z',
                  options: ['Dimensional analysis setup: T = k l^x g^y m^z', 'dimensionally allowed', 'physically determined', 'if an equation is dimensionally correct, it is physically correct'],
                  hint: 'If stuck, immediately revisit c11_phy_cbse_01_006 (Dimensional Analysis: Dimensional Formula) and.',
                  misconception: 'Students believe that if an equation is dimensionally correct, it is physically correct.' }
          ],
            remediations: { 'if-an-equation-is-dimensionally': { steps: ['Take two dimensionally correct but physically different equations (e.g., KE = ½mv² vs KE = mv²; or T = 2π√(l/g) vs.', 'Verify both have identical dimensions on all terms.', 'Explain that dimensional analysis cannot distinguish them because dimensionless constants (½ vs 1, 2π vs π) have.', 'State the rule: "Dimensional analysis can ONLY rule out wrong equations; it can NEVER confirm a unique right equation."'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_01_008', difficulty: 'standard',
          question: 'Dimensional analysis is a powerful tool for checking dimensional consistency.',
          hint: 'Revisit c11_phy_cbse_01_007 Example 1.5 (pendulum derivation) and practice writing.',
          misconception: 'Students believe that if an equation is dimensionally consistent, it must be physically correct.',
          parts: [
                { id: 'a', prompt: 'Why can dimensional analysis not determine the value of dimensionless constants like 2π in the time period formula of a simple pendulum?', answer: 'Dimensional analysis equates dimensions on both sides of an equation',
                  options: ['Dimensional analysis equates dimensions on both sides of an equation', 'because constants have no units', 'if an equation is dimensionally consistent, it must be physically correct'],
                  hint: 'Revisit c11_phy_cbse_01_007 Example 1.5 (pendulum derivation) and practice writing dimensional.',
                  misconception: 'Students believe that if an equation is dimensionally consistent, it must be physically correct.' },
                { id: 'b', prompt: 'A student proposes the formula for the time period of a simple pendulum as T = 2π√(m/lg) using dimensional analysis.', answer: 'The error is including mass (m) in the formula',
                  options: ['The error is including mass (m) in the formula', 'if an equation is dimensionally consistent, it must be physically correct'],
                  hint: 'Revisit c11_phy_cbse_01_007 Example 1.5 (pendulum derivation) and practice writing dimensional.',
                  misconception: 'Students believe that if an equation is dimensionally consistent, it must be physically correct.' }
          ],
            remediations: { 'if-an-equation-is-dimensionally': { steps: ['Write down the dimensions of both sides of "Work = Torque" and confirm they match [ML²T⁻²].', 'Look up the definitions: Work = F·d (dot product, scalar), Torque = r × F (cross product, vector).', 'Realize dimensional analysis cannot distinguish scalar vs vector, dot vs cross product, or energy vs moment.', 'Practice identifying 5 pairs of quantities with same dimensions but different physical meanings (e.g., pressure.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_01_009', difficulty: 'standard',
          question: 'Order of magnitude is the power of 10 (exponent b) when a physical quantity.',
          hint: 'Review Class 8 Math Chapter 2 (Exponents and Powers) node c8_math_ch2_3 for exponential.',
          misconception: 'Students believe the order of magnitude is simply the exponent when the number is written in any scientific notation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Order of magnitude is the power of 10 (exponent b) when a physical quantity is expressed',
                  options: ['Order of magnitude is the power of 10 (exponent b) when a physical quantity is expressed', 'Measurement is the process of comparing a physical quantity with a chosen standard called', 'The International System of Units (SI) is the globally accepted coherent system of', 'Significant figures are the digits in a measured value that are known reliably plus the'],
                  hint: 'Review Class 8 Math Chapter 2 (Exponents and Powers) node c8_math_ch2_3 for exponential notation.',
                  misconception: 'Students believe the order of magnitude is simply the exponent when the number is written in any scientific notation form (e.g., 8.5.' }
          ],
            remediations: { 'the-order-of-magnitude-is': { steps: ['Revisit NCERT Section 1.3 point (3) — the paragraph starting "In order to get an approximate idea...".', 'Practice converting 10 numbers from decimal to scientific notation, then apply the rounding rule to each: write the.', 'Do NCERT Exercise 1.14 and 1.15 — these explicitly test order-of-magnitude reasoning with atomic volumes and molar.', 'Create a table: Quantity | Scientific Notation | Base a | a≤5? | Rounded Form | Order of Magnitude.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_01_010', difficulty: 'standard',
          question: 'Measurement of length is the process of comparing an unknown length with.',
          hint: 'If stuck, revisit c11_phy_cbse_01_003 (significant figures rules) and c9_physics_ch1_6.',
          misconception: 'Students believe that zero error in vernier calipers or screw gauge is always subtracted from the observed reading.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Measurement of length is the process of comparing an unknown length with a standard unit',
                  options: ['Measurement of length is the process of comparing an unknown length with a standard unit', 'Measurement is the process of comparing a physical quantity with a chosen standard called', 'The International System of Units (SI) is the globally accepted coherent system of', 'Significant figures are the digits in a measured value that are known reliably plus the'],
                  hint: 'If stuck, revisit c11_phy_cbse_01_003 (significant figures rules) and c9_physics_ch1_6 (accuracy.',
                  misconception: 'Students believe that zero error in vernier calipers or screw gauge is always subtracted from the observed reading.' }
          ],
            remediations: { 'zero-error-in-vernier-calipers': { steps: ['Hold a vernier calipers with jaws closed. Observe if the vernier zero is to the right (positive) or left (negative).', 'Note which vernier division coincides with a main scale division.', 'Zero error = (coinciding division number) × LC with sign: right = positive, left = negative.', 'Practice with 5 objects: measure each, record observed reading, apply zero error correction with sign, and verify.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_01_011', difficulty: 'standard',
          question: 'The parallax method measures large distances by observing the apparent shift.',
          hint: 'Review Class 10 trigonometry (c10_math_cbse_08_003 to 08_005) for angle units and Class 9.',
          misconception: 'Students often think the parallax angle is the total angular shift observed between the two positions (i.e., 2θ).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The parallax method measures large distances by observing the apparent shift (parallax',
                  options: ['The parallax method measures large distances by observing the apparent shift (parallax', 'Measurement is the process of comparing a physical quantity with a chosen standard called', 'The International System of Units (SI) is the globally accepted coherent system of', 'Significant figures are the digits in a measured value that are known reliably plus the'],
                  hint: 'Review Class 10 trigonometry (c10_math_cbse_08_003 to 08_005) for angle units and Class 9.',
                  misconception: 'Students often think the parallax angle is the total angular shift observed between the two positions (i.e., 2θ).' }
          ],
            remediations: { 'the-parallax-angle-is-the': { steps: ['Draw a diagram: star at distance d, baseline b.', 'Show the two lines of sight from the baseline endpoints to the star.', 'The angle between these lines at the star is the parallax angle θ.', 'Place a finger at arm\'s length (star), observe with left eye then right eye (baseline = interocular distance).'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_01_012', difficulty: 'standard',
          question: 'Mass is the measure of the quantity of matter in a body, with the SI unit.',
          hint: 'Revisit the distinction between mass and weight (Class 9 Force and Laws of Motion) and.',
          misconception: 'Students often believe that "mass is measured in kg and weight in newtons, so they are completely different and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Mass is the measure of the quantity of matter in a body, with the SI unit kilogram (kg)',
                  options: ['Mass is the measure of the quantity of matter in a body, with the SI unit kilogram (kg)', 'Measurement is the process of comparing a physical quantity with a chosen standard called', 'The International System of Units (SI) is the globally accepted coherent system of', 'Significant figures are the digits in a measured value that are known reliably plus the'],
                  hint: 'Revisit the distinction between mass and weight (Class 9 Force and Laws of Motion) and the SI base.',
                  misconception: 'Students often believe that "mass is measured in kg and weight in newtons, so they are completely different and unrelated." They fail.' }
          ],
            remediations: { 'mass-is-measured-in-kg': { steps: ['If the student confuses mass and weight: Perform a thought experiment: "Take a beam balance and a spring balance to the.', 'The beam balance still balances 100 g against 100 g; the spring balance reads 1/6th.', 'Which instrument measures mass?" If the student uses the old definition of kilogram (IPK): Show the NPL India or BIPM.', 'If the student thinks time is defined by Earth\'s rotation: Ask "Why do we need leap seconds?" and explain that Earth\'s.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
