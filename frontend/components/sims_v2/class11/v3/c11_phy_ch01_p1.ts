import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch01_p1: SimDef = {
    id: 'v3_c11_phy_ch01_p1',
    title: 'Units and Measurements · Part 1/3',
    subtitle: 'Unpack the famous units into the seven base ones underneath.',
    classLevel: 11, subject: 'physics', topic: 'Units and Measurements · Part 1/3',
    chapters: ['c11_phy_ch01'],
    nodeIds: ['c11_phy_cbse_01_001', 'c11_phy_cbse_01_002', 'c11_phy_cbse_01_003', 'c11_phy_cbse_01_004', 'c11_phy_cbse_01_005', 'c11_phy_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a lab calibrator checking what a unit really contains', intro: 'The dairy\'s steel \'litre\' and NPL\'s light-speed-defined metre are the same word with very different pedigrees.', goal: 'Distinguish base from derived units and express any unit in SI base form.' },
    discovery: {
        question: 'Force = mass × acceleration, so the unit of force is kg·m/s — correct?',
        options: ['No — acceleration is m/s², so the newton unfolds as kg·m·s⁻²; kg·m/s is momentum\'s unit', 'Yes — velocity and acceleration share units', 'Yes — newton is a fundamental unit anyway', 'No — it\'s kg·m·s⁻¹'],
        answer: 'No — acceleration is m/s², so the newton unfolds as kg·m·s⁻²; kg·m/s is momentum\'s unit',
        hook: 'Newtons and joules aren\'t fundamental — they\'re shorthand; every derived unit is base units multiplied and divided with no hidden factor.',
    },
    teaching: [
        { title: 'Introduction to Units and Measurement', text: 'Measurement is the process of comparing a physical quantity with a chosen standard called a unit.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_01_001', title: 'Your mission',
          mission: { widget: 'weigh', validate: 'weigh:grams=40',
            instruction: 'On the lab: weigh out 40 g — is the scale balanced?.',
        context: 'Convert 72 km/h into 20 m/s honestly, then break \'J·s\' and \'N\' back into base units until nothing but m, kg, s remains.',
            observePrompt: 'What did the weigh interactive show you?' } },
        { type: 'case', nodeId: 'c11_phy_cbse_01_001', title: 'Introduction to Units and Measurement',
          caseStudy: { intro: 'Look at the ceiling fan in your classroom — its blades rotate at a certain speed. How would you describe that speed to someone?',
            decisions: [{ prompt: 'A student measures the length of a lab table and records it as "2.5". The teacher says the measurement is incomplete.', options: [
                { text: 'The measurement is incomplete', outcome: 'The measurement is incomplete because a physical quantity requires both a numerical magnitude and.' },
                { text: 'the number is enough', outcome: 'Not quite — Students often think "unit" and "physical quantity" are interchangeable — e.g., they say "the force.', reveals: 'unit-and-physical-quantity-are' },
                { text: 'add the instrument name', outcome: 'Not quite — Students often think "unit" and "physical quantity" are interchangeable — e.g., they say "the force.', reveals: 'unit-and-physical-quantity-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_01_002', title: 'The International System of Units (SI)',
          caseStudy: { intro: 'Imagine you are buying milk at a local dairy in Delhi — the seller measures "1 litre" using a steel container.',
            decisions: [{ prompt: 'Name the seven SI base quantities, their units, and symbols. For any one base unit, state the defining constant fixed in its 2019 revision.', options: [
                { text: 'The seven base quantities are: length (metre, m), mass (kilogram, kg), time (second, s),', outcome: 'The seven base quantities are: length (metre, m), mass (kilogram, kg), time (second, s), electric.' },
                { text: 'newton', outcome: 'Not quite — Students believe "SI unit" means "metric unit" and use them interchangeably.', reveals: 'si-unit-means-metric-unit' },
                { text: 'SI unit', outcome: 'Not quite — Students believe "SI unit" means "metric unit" and use them interchangeably.', reveals: 'si-unit-means-metric-unit' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_01_003', title: 'Significant Figures: Rules and Counting',
          caseStudy: { intro: 'Imagine you measure the length of a physics lab table with a metre scale (least count 0.1 cm) and record it as 152.3 cm.',
            decisions: [{ prompt: 'State the number of significant figures in each of the following measurements: (a) 0.00450 kg, (b) 6.02 × 10²³ mol⁻¹, (c) 1500 m, (d) 1.500.', options: [
                { text: '(a) 3 significant figures (the zeros before 45 are not significant; the trailing zero', outcome: '(a) 3 significant figures (the zeros before 45 are not significant; the trailing zero after 5.' },
                { text: 'all zeros in a number are either always significant or never significant', outcome: 'Not quite — Students often believe that all zeros in a number are either always significant or never.', reveals: 'all-zeros-in-a-number' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_01_004', title: 'Significant Figures in Calculations',
          scaffold: { problem: 'A rectangular metal sheet has length = 16.2 cm (measured with a metre scale, least count 0.1 cm) and breadth = 10.1 cm (same scale).',
            steps: [
            { text: 'Identify given quantities: length l = 16.2 cm (3 significant figures, 1 decimal place), breadth b = 10.1 cm (3.' },
            { text: 'Apply multiplication rule: result must have the same number of significant figures as the factor with the least.' },
            { text: 'Compute raw product: 16.2 × 10.1 = 163.62 cm².' },
            { text: 'Round to 3 significant figures: 163.62 → 164 cm² (since the 4th digit is 6 > 5, round up the 3rd digit from 3 to 4).' },
            { text: 'Interpret uncertainty: 164 cm² implies the true value lies between 163.5 and 164.5 cm², so uncertainty ≈ ±0.5 cm².', faded: true, blankAnswer: 'Area = 164 cm² (or 1.64 × 10² cm²) with implied uncertainty.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_01_005', title: 'Rounding Off Significant Figures',
          scaffold: { problem: 'A student measures the diameter of a steel ball using a screw gauge with least count 0.01 mm.',
            steps: [
            { text: 'Identify the given measurements and their significant figures.' },
            { text: 'Calculate the mean diameter. Sum = 4.52 + 4.53 + 4.51 + 4.52 + 4.54 = 22.62 mm. Mean = 22.62 / 5 = 4.524 mm.' },
            { text: 'Calculate radius r = d/2 = 4.52 mm / 2 = 2.26 mm. The factor 2 is exact, so radius has 3 significant figures (same.' },
            { text: 'Calculate volume V = (4/3)πr³. The factors 4/3 and π are exact constants (infinite significant figures).' },
            { text: 'V = (4/3) × π × 11.54 = 48.34... mm³. The final result is limited by the 3 significant figures of the radius.', faded: true, blankAnswer: 'Mean diameter = 4.52 mm (3 significant figures); Volume.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_01_006', title: 'Dimensional Analysis: Dimensional Formula',
          scaffold: { problem: 'Derive the dimensional formula of pressure. Given: Pressure = Force / Area. Force = mass × acceleration. Acceleration = velocity / time.',
            steps: [
            { text: 'Identify the target quantity: Pressure (P). Write its defining equation: P = F / A.' },
            { text: 'Break down Force (F) into base quantities: F = m × a. Mass m → [M]. Acceleration a = v / t.' },
            { text: 'Break down Area (A): Area = length × breadth → [L] × [L] = [L²].' },
            { text: 'Combine: P = [M L T⁻²] / [L²] = [M L⁻¹ T⁻²].' },
            { text: 'Verify: Pressure is force per unit area. Force has [M L T⁻²], area has [L²].', faded: true, blankAnswer: '[Pressure] = [M L⁻¹ T⁻²]' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a lab-report review, a junior writes \'force = 10 N\' and explains: \'the newton is a fundamental unit like the kilogram — it has its own name.\' He also says \'SI and metric are the same thing.\'',
            decisions: [{ prompt: 'What does the measurement framework actually require?', options: [
                { text: 'Separate quantity from unit and name from status: \'N\' is the unit, force is the quantity — every measurement is numerical value × unit. The newton is a DERIVED unit: shorthand for kg·m·s⁻², not fundamental. And SI isn\'t just \'metric\': it\'s the coherent system where derived units are products of the seven base units with no conversion factors — that\'s what makes dimensional analysis work.', outcome: 'The report tightens: units decompose into the base alphabet, and SI\'s coherence — not just its names — is the point.' },
                { text: 'Let the newton stand as fundamental — it has a special name, after all.', outcome: 'Special names honour convenience, not fundamentality: N and J unpack into kg, m, s — only the seven base units are irreducible.', reveals: 'named-units-are-fundamental' },
                { text: 'Accept SI = metric — they\'re just two names for the same units.', outcome: 'Metric is a family of systems (CGS, MKS, FPS) with different bases; SI is specifically the coherent one — a dyne isn\'t \'another SI unit\', it\'s a different system\'s unit.', reveals: 'si-equals-metric' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'A measurement is a number times a standard — lose the unit and \'5\' could mean five grams or five tonnes.',
            decisions: [{ prompt: 'What comes next? Units and Measurements · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Units and Measurements · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'weigh', prompt: 'Explore the weigh interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'weigh', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_01_001', difficulty: 'standard',
          question: 'Measurement is the process of comparing a physical quantity with a chosen.',
          hint: 'If stuck, revisit Class 9 Science Chapter 1 (Measurement: Units and Standards) and Class.',
          misconception: 'Students often think "unit" and "physical quantity" are interchangeable — e.g., they say "the force is 10 newton" but.',
          parts: [
                { id: 'a', prompt: 'A student measures the length of a lab table and records it as "2.5". The teacher says the measurement is incomplete.', answer: 'The measurement is incomplete',
                  options: ['The measurement is incomplete', 'the number is enough', 'add the instrument name', 'physical quantity'],
                  hint: 'If stuck, revisit Class 9 Science Chapter 1 (Measurement: Units and Standards) and Class 7 Math.',
                  misconception: 'Students often think "unit" and "physical quantity" are interchangeable — e.g., they say "the force is 10 newton" but write "force = 10 N".' },
                { id: 'b', prompt: 'Why do we need a system of units like SI instead of using different units for every physical quantity?', answer: 'Physical quantities are interrelated through physical laws (e.g., force = mass ×',
                  options: ['Physical quantities are interrelated through physical laws (e.g., force = mass ×', 'SI is just a convention', 'to make calculations easier', 'physical quantity'],
                  hint: 'If stuck, revisit Class 9 Science Chapter 1 (Measurement: Units and Standards) and Class 7 Math.',
                  misconception: 'Students often think "unit" and "physical quantity" are interchangeable — e.g., they say "the force is 10 newton" but write "force = 10 N".' },
                { id: 'c', prompt: 'The speed of a car is 72 km/h. Express this speed in SI base units (m/s) and identify which of the two units (km/h or m/s) is an SI derived unit and which.', answer: '72 km/h = 72 × (1000 m) / (3600 s) = 20 m/s',
                  options: ['72 km/h = 72 × (1000 m) / (3600 s) = 20 m/s', 'physical quantity', 'the force is 10 newton', 'force = 10 N'],
                  hint: 'If stuck, revisit Class 9 Science Chapter 1 (Measurement: Units and Standards) and Class 7 Math.',
                  misconception: 'Students often think "unit" and "physical quantity" are interchangeable — e.g., they say "the force is 10 newton" but write "force = 10 N".' },
                { id: 'd', prompt: 'Consider the equation for kinetic energy: K = ½ mv². Using only the SI base units (kg, m, s), show that the unit of kinetic energy (joule) is equivalent.', answer: '[K] = [M][L/T]² = kg·(m/s)² = kg·m²·s⁻²',
                  options: ['[K] = [M][L/T]² = kg·(m/s)² = kg·m²·s⁻²', '½ kg·m²·s⁻²', 'physical quantity', 'the force is 10 newton'],
                  hint: 'If stuck, revisit Class 9 Science Chapter 1 (Measurement: Units and Standards) and Class 7 Math.',
                  misconception: 'Students often think "unit" and "physical quantity" are interchangeable — e.g., they say "the force is 10 newton" but write "force = 10 N".' }
          ],
            remediations: { 'unit-and-physical-quantity-are': { steps: ['Take three derived quantities (force, energy, power) and write each in terms of kg, m, s only.', 'For each, identify the physical law that defines it (F=ma, W=Fd, P=W/t).', 'Substitute the base units step by step.', 'Verify that the special name (N, J, W) is just a label for that combination.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "unit" and "physical quantity" are interchangeable — e.g., they say "the force is 10 newton" but.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The SI unit of force is newton (N). Since force = mass × acceleration, we can also write the unit of force as kg·m/s. Is this correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'yes, because force = mass × velocity', 'physical quantity', 'the force is 10 newton'],
                  hint: 'If stuck, revisit Class 9 Science Chapter 1 (Measurement: Units and Standards) and Class 7 Math.',
                  misconception: 'Students often think "unit" and "physical quantity" are interchangeable — e.g., they say "the force is 10 newton" but write "force = 10 N".' },
                { id: 'b', prompt: 'Design a simple experiment using only a metre scale, a stopwatch, and a ball to determine the value of acceleration due to gravity (g).', answer: 'Measure height of fall h (metre, m) and time of fall t (second, s)',
                  options: ['Measure height of fall h (metre, m) and time of fall t (second, s)', 'physical quantity', 'the force is 10 newton', 'force = 10 N'],
                  hint: 'If stuck, revisit Class 9 Science Chapter 1 (Measurement: Units and Standards) and Class 7 Math.',
                  misconception: 'Students often think "unit" and "physical quantity" are interchangeable — e.g., they say "the force is 10 newton" but write "force = 10 N".' }
          ],
            remediations: { 'unit-and-physical-quantity-are': { steps: ['Take three derived quantities (force, energy, power) and write each in terms of kg, m, s only.', 'For each, identify the physical law that defines it (F=ma, W=Fd, P=W/t).', 'Substitute the base units step by step.', 'Verify that the special name (N, J, W) is just a label for that combination.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_01_002', difficulty: 'standard',
          question: 'The International System of Units (SI) is the globally accepted coherent system.',
          hint: 'If stuck, revisit Class 8 Math node c8_math_ch2_3 (exponential notation) and Class 7.',
          misconception: 'Students believe "SI unit" means "metric unit" and use them interchangeably.',
          parts: [
                { id: 'a', prompt: 'A physics textbook states: "The force F = 5 kg·m/s²." Rewrite this using the correct SI derived unit with its special name and symbol.', answer: 'The statement should read: "The force F = 5 N" (newton, symbol N)',
                  options: ['The statement should read: "The force F = 5 N" (newton, symbol N)', '5 kg·m/s²', 'newton', 'SI unit'],
                  hint: 'If stuck, revisit Class 8 Math node c8_math_ch2_3 (exponential notation) and Class 7 Physics node.',
                  misconception: 'Students believe "SI unit" means "metric unit" and use them interchangeably.' },
                { id: 'b', prompt: 'Compare the following two measurements: (a) 4.700 m and (b) 4700 mm. Do they have the same number of significant figures?', answer: 'Yes, both have four significant figures',
                  options: ['Yes, both have four significant figures', 'SI unit', 'metric unit', '"SI unit" means "metric unit" and use them interchangeably'],
                  hint: 'If stuck, revisit Class 8 Math node c8_math_ch2_3 (exponential notation) and Class 7 Physics node.',
                  misconception: 'Students believe "SI unit" means "metric unit" and use them interchangeably.' }
          ],
            remediations: { 'si-unit-means-metric-unit': { steps: ['Have the student write the dimensions of force, energy, and power in both CGS and SI.', 'Ask them to derive the conversion factor between erg and joule, then between dyne and newton.', 'Point out that in SI, the numerical factor is always 1 (by design), while in CGS it is also 1 — but the base units.', 'Show that the *coherence* of SI means Ohm\'s law V = IR holds with V in volts, I in amperes, R in ohms *without* any.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_01_003', difficulty: 'standard',
          question: 'Significant figures are the digits in a measured value that are known reliably.',
          hint: 'Review Class 6 Math: Decimals (place value, comparing decimals) and Class 8 Math.',
          misconception: 'Students often believe that all zeros in a number are either always significant or never significant.',
          parts: [
                { id: 'a', prompt: 'State the number of significant figures in each of the following measurements: (a) 0.00450 kg, (b) 6.02 × 10²³ mol⁻¹, (c) 1500 m, (d) 1.500 × 10³ m.', answer: '0.00450 kg, (',
                  options: ['0.00450 kg, (', 'all zeros in a number are either always significant or never significant'],
                  hint: 'Review Class 6 Math: Decimals (place value, comparing decimals) and Class 8 Math: Exponents and.',
                  misconception: 'Students often believe that all zeros in a number are either always significant or never significant.' },
                { id: 'b', prompt: 'A student measures the diameter of a wire using a screw gauge and records it as 0.00250 cm.', answer: 'The second student incorrectly counts the leading zeros (0.00) as significant',
                  options: ['The second student incorrectly counts the leading zeros (0.00) as significant', 'number of digits', 'significant figures', 'all zeros in a number are either always significant or never significant'],
                  hint: 'Review Class 6 Math: Decimals (place value, comparing decimals) and Class 8 Math: Exponents and.',
                  misconception: 'Students often believe that all zeros in a number are either always significant or never significant.' },
                { id: 'c', prompt: 'The mass of a chemical sample is measured as 12.450 g on a digital balance.', answer: '12.450 g has 5 significant figures (trailing zero after decimal is significant)',
                  options: ['12.450 g has 5 significant figures (trailing zero after decimal is significant)', 'all zeros in a number are either always significant or never significant'],
                  hint: 'Review Class 6 Math: Decimals (place value, comparing decimals) and Class 8 Math: Exponents and.',
                  misconception: 'Students often believe that all zeros in a number are either always significant or never significant.' }
          ],
            remediations: { 'all-zeros-in-a-number': { steps: ['If a student cannot distinguish the types of zeros, have them write three numbers: (1) 1500 (no decimal), (2) 1500.', '(with decimal), (3) 1.500 × 10³.', 'Ask them to identify which zeros are measured and which are placeholders.', 'Then, use a metre scale to measure a 1.5 m rod and record as 150 cm.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_01_004', difficulty: 'standard',
          question: 'Significant figures in calculations refer to the rules that dictate how many.',
          hint: 'Revisit node c11_phy_cbse_01_003 (Significant Figures: Rules and Counting) and practice.',
          misconception: 'Students often believe that the number of significant figures in a final answer is determined by the measurement with.',
          parts: [
                { id: 'a', prompt: 'Why does the rule for addition/subtraction depend on decimal places rather than significant figures?', answer: 'In addition/subtraction, the uncertainty is in the last decimal place',
                  options: ['In addition/subtraction, the uncertainty is in the last decimal place', 'both have 3 and 2 SF so answer should have 2 SF', 'more precision is better'],
                  hint: 'Revisit node c11_phy_cbse_01_003 (Significant Figures: Rules and Counting) and practice identifying.',
                  misconception: 'Students often believe that the number of significant figures in a final answer is determined by the measurement with the most significant.' },
                { id: 'b', prompt: 'A student adds three lengths: 436.32 m, 227.2 m, and 0.301 m. The calculator shows 663.821 m. The student writes the final answer as 663.8 m.', answer: '663.8 m',
                  options: ['663.8 m', 'more precision is better'],
                  hint: 'Revisit node c11_phy_cbse_01_003 (Significant Figures: Rules and Counting) and practice identifying.',
                  misconception: 'Students often believe that the number of significant figures in a final answer is determined by the measurement with the most significant.' }
          ],
            remediations: { 'the-number-of-significant-figures': { steps: ['Have the student measure a rectangle\'s length (12.3 cm) and breadth (4.1 cm) with a ruler (least count 0.1 cm).', 'Calculate area on calculator: 50.43 cm².', 'Ask "Which measurement is less precise?" (breadth, 2 SF vs 3 SF).', 'Explain that the area cannot be known to 4 digits when one side is only known to 2 digits.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_01_005', difficulty: 'standard',
          question: 'Rounding off significant figures is the process of reducing the number.',
          hint: 'If stuck, review the significant figure counting rules (c11_phy_cbse_01_003) and the.',
          misconception: 'Students believe that "rounding up when the digit is 5 or more" is the universal rule, not knowing the even-odd.',
          parts: [
                { id: 'a', prompt: 'A student calculates the volume of a cube of side 3.204 cm using a calculator and gets 32.896128 cm³. The side length has 4 significant figures.', answer: 'The student should report 32.90 cm³ (4 significant figures)',
                  options: ['The student should report 32.90 cm³ (4 significant figures)', 'rounding up when the digit is 5 or more'],
                  hint: 'If stuck, review the significant figure counting rules (c11_phy_cbse_01_003) and the arithmetic.',
                  misconception: 'Students believe that "rounding up when the digit is 5 or more" is the universal rule, not knowing the even-odd convention for digit 5.' },
                { id: 'b', prompt: 'In a multi-step calculation, a student computes the density of a metal block: mass = 24.53 g (4 sig fig), volume = 3.21 cm³ (3 sig fig).', answer: 'The error is rounding the intermediate reciprocal to 3 significant figures',
                  options: ['The error is rounding the intermediate reciprocal to 3 significant figures', 'rounding up when the digit is 5 or more'],
                  hint: 'If stuck, review the significant figure counting rules (c11_phy_cbse_01_003) and the arithmetic.',
                  misconception: 'Students believe that "rounding up when the digit is 5 or more" is the universal rule, not knowing the even-odd convention for digit 5.' },
                { id: 'c', prompt: 'A physics experiment requires calculating the time period of a simple pendulum using T = 2π√(L/g).', answer: 'The student\'s answer 2.01 s (3 sig fig) is incorrect',
                  options: ['The student\'s answer 2.01 s (3 sig fig) is incorrect', 'rounding up when the digit is 5 or more'],
                  hint: 'If stuck, review the significant figure counting rules (c11_phy_cbse_01_003) and the arithmetic.',
                  misconception: 'Students believe that "rounding up when the digit is 5 or more" is the universal rule, not knowing the even-odd convention for digit 5.' }
          ],
            remediations: { 'rounding-up-when-the-digit': { steps: ['Have the student round these numbers to 3 significant figures using both rules: 1.235, 1.245, 1.255, 1.265.', 'Give a multi-step calculation: density = 15.23 g / 2.41 cm³. Ask student to compute 1/2.41 first.', 'Ask student to identify exact numbers in formulae like C = 2πr, v = 2πr/T, KE = ½mv² and state their significant figure.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_01_006', difficulty: 'standard',
          question: 'The dimensional formula of a physical quantity is an expression that shows how.',
          hint: 'If stuck, revisit the defining equations of force, work, energy, power, pressure from.',
          misconception: 'Students believe that a dimensionless quantity (like angle, refractive index, or strain) has "no dimensions" and write.',
          parts: [
                { id: 'a', prompt: 'Work and torque both have the dimensional formula [M L² T⁻²]. A student claims: "Since they have the same dimensions, work and torque are the same physical.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'no dimensions'],
                  hint: 'If stuck, revisit the defining equations of force, work, energy, power, pressure from Class 9.',
                  misconception: 'Students believe that a dimensionless quantity (like angle, refractive index, or strain) has "no dimensions" and write its dimensional.' }
          ],
            remediations: { 'a-dimensionless-quantity-like-angle': { steps: ['Write the dimensional formula of angle explicitly: angle = arc length / radius = [L]/[L] = [M⁰ L⁰ T⁰].', 'Show that any ratio of same-dimension quantities yields [M⁰ L⁰ T⁰].', 'Practice checking equations with dimensionless constants (e.g., v = u + at, s = ut + ½at²) and emphasize that numerical.', 'Assign 5 quantities (refractive index, specific gravity, Poisson\'s ratio, solid angle, Reynolds number) and ask.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
