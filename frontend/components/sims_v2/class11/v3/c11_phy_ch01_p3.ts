import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch01_p3: SimDef = {
    id: 'v3_c11_phy_ch01_p3',
    title: 'Units and Measurements · Part 3/3',
    subtitle: 'Unpack the famous units into the seven base ones underneath.',
    classLevel: 11, subject: 'physics', topic: 'Units and Measurements · Part 3/3',
    chapters: ['c11_phy_ch01'],
    nodeIds: ['c11_phy_cbse_01_013', 'c11_phy_cbse_01_014', 'c11_phy_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a lab calibrator checking what a unit really contains', intro: 'The dairy\'s steel \'litre\' and NPL\'s light-speed-defined metre are the same word with very different pedigrees.', goal: 'Distinguish base from derived units and express any unit in SI base form.' },
    discovery: {
        question: 'Force = mass × acceleration, so the unit of force is kg·m/s — correct?',
        options: ['No — acceleration is m/s², so the newton unfolds as kg·m·s⁻²; kg·m/s is momentum\'s unit', 'Yes — velocity and acceleration share units', 'Yes — newton is a fundamental unit anyway', 'No — it\'s kg·m·s⁻¹'],
        answer: 'No — acceleration is m/s², so the newton unfolds as kg·m·s⁻²; kg·m/s is momentum\'s unit',
        hook: 'Newtons and joules aren\'t fundamental — they\'re shorthand; every derived unit is base units multiplied and divided with no hidden factor.',
    },
    teaching: [
        { title: 'Accuracy and Precision of Instruments', text: 'Accuracy is the degree of closeness of a measured value to the true (accepted standard) value of the physical quantity being measured.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_01_013', title: 'Your mission',
          mission: { widget: 'weigh', validate: 'weigh:grams=40',
            instruction: 'On the lab: weigh out 40 g — is the scale balanced?.',
        context: 'Convert 72 km/h into 20 m/s honestly, then break \'J·s\' and \'N\' back into base units until nothing but m, kg, s remains.',
            observePrompt: 'What did the weigh interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_01_013', title: 'Accuracy and Precision of Instruments',
          scaffold: { problem: 'A vernier caliper has 10 divisions on its vernier scale that coincide with 9 divisions on the main scale. Each main scale division is 1 mm.',
            steps: [
            { text: 'Identify given values: 1 MSD = 1 mm, 10 VSD = 9 MSD.' },
            { text: 'Calculate 1 VSD = (9 MSD) / 10 = 9 mm / 10 = 0.9 mm.' },
            { text: 'Apply formula LC = 1 MSD - 1 VSD = 1 mm - 0.9 mm = 0.1 mm.' },
            { text: 'Convert to cm: 0.1 mm = 0.01 cm.' },
            { text: 'Verify: LC = MSD / n = 1 mm / 10 = 0.1 mm. Consistent.', faded: true, blankAnswer: 'Least count = 0.1 mm = 0.01 cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_01_014', title: 'Errors in Measurement: Systematic and Random',
          scaffold: { problem: 'In a school physics lab, a student uses a screw gauge (least count = 0.01 mm) to measure the diameter of a wire.',
            steps: [
            { text: 'Identify given quantities – least count = 0.01 mm, zero error = -0.02 mm (negative means instrument reads less than.' },
            { text: 'Apply zero correction – since zero error is -0.02 mm, we ADD 0.02 mm to each reading (corrected = raw - zero error.' },
            { text: 'Compute mean of corrected readings: a_mean = (0.50+0.52+0.51+0.49+0.53+0.50)/6 = 3.05/6 = 0.50833 mm ≈ 0.51 mm (rounded.' },
            { text: 'Calculate absolute deviations from mean: |0.50-0.51|=0.01, |0.52-0.51|=0.01, |0.51-0.51|=0.00, |0.49-0.51|=0.02.' },
            { text: 'Relative error = Δa_mean / a_mean = 0.01 / 0.51 = 0.0196. Percentage error = 0.0196 × 100% = 1.96% ≈ 2.0%.' },
            { text: 'Assess accuracy – true value = 0.50 mm, measured mean = 0.51 mm. Difference = 0.01 mm.', faded: true, blankAnswer: '(a) 0.50, 0.52, 0.51, 0.49, 0.53, 0.50 mm; (b) 0.51 mm; (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_01_015', title: 'Combination of Errors: Propagation',
          scaffold: { problem: 'The length and breadth of a rectangular metal sheet are measured using a vernier caliper (least count 0.01 cm) as l = 12.34 cm and b = 8.45.',
            steps: [
            { text: 'Identify given values and errors. l = 12.34 cm, b = 8.45 cm. Least count = 0.01 cm → Δl = Δb = 0.01 cm (assuming least.' },
            { text: 'Compute the nominal area. A = l × b = 12.34 × 8.45 = 104.273 cm².' },
            { text: 'Calculate relative errors. Δl/l = 0.01/12.34 ≈ 0.000810. Δb/b = 0.01/8.45 ≈ 0.001183.' },
            { text: 'Add relative errors for product. ΔA/A = 0.000810 + 0.001183 = 0.001993.' },
            { text: 'Convert to absolute error. ΔA = 0.001993 × 104.273 cm² ≈ 0.2078 cm². Round ΔA to 1 significant figure → 0.2 cm².' },
            { text: 'Round area to match decimal place of error (0.2 has 1 decimal). A = 104.3 cm².', faded: true, blankAnswer: '(104.3 ± 0.2) cm²' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'In a lab-report review, a junior writes \'force = 10 N\' and explains: \'the newton is a fundamental unit like the kilogram — it has its own name.\' He also says \'SI and metric are the same thing.\'',
            decisions: [{ prompt: 'What does the measurement framework actually require?', options: [
                { text: 'Separate quantity from unit and name from status: \'N\' is the unit, force is the quantity — every measurement is numerical value × unit. The newton is a DERIVED unit: shorthand for kg·m·s⁻², not fundamental. And SI isn\'t just \'metric\': it\'s the coherent system where derived units are products of the seven base units with no conversion factors — that\'s what makes dimensional analysis work.', outcome: 'The report tightens: units decompose into the base alphabet, and SI\'s coherence — not just its names — is the point.' },
                { text: 'Let the newton stand as fundamental — it has a special name, after all.', outcome: 'Special names honour convenience, not fundamentality: N and J unpack into kg, m, s — only the seven base units are irreducible.', reveals: 'named-units-are-fundamental' },
                { text: 'Accept SI = metric — they\'re just two names for the same units.', outcome: 'Metric is a family of systems (CGS, MKS, FPS) with different bases; SI is specifically the coherent one — a dyne isn\'t \'another SI unit\', it\'s a different system\'s unit.', reveals: 'si-equals-metric' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'A measurement is a number times a standard — lose the unit and \'5\' could mean five grams or five tonnes.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'weigh', prompt: 'Explore the weigh interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'weigh', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_01_013', difficulty: 'standard',
          question: 'Accuracy is the degree of closeness of a measured value to the true (accepted.',
          hint: 'If stuck, revisit c11_phy_cbse_01_003 (significant figures rules) and c11_phy_cbse_01_010.',
          misconception: 'Students believe "high precision implies high accuracy" and vice versa.',
          parts: [
                { id: 'a', prompt: 'Define accuracy and precision in the context of experimental measurements. State the SI unit of least count.', answer: 'Accuracy is the closeness of a measured value to the true value',
                  options: ['Accuracy is the closeness of a measured value to the true value', 'high precision implies high accuracy', '"high precision implies high accuracy" and vice versa'],
                  hint: 'If stuck, revisit c11_phy_cbse_01_003 (significant figures rules) and c11_phy_cbse_01_010 (vernier.',
                  misconception: 'Students believe "high precision implies high accuracy" and vice versa.' },
                { id: 'b', prompt: 'A screw gauge has a pitch of 0.5 mm and 50 divisions on its circular scale. Calculate its least count in mm and cm.', answer: 'Least count = Pitch / Number of divisions = 0.5 mm / 50 = 0.01 mm = 0.001 cm',
                  options: ['Least count = Pitch / Number of divisions = 0.5 mm / 50 = 0.01 mm = 0.001 cm', 'high precision implies high accuracy', '"high precision implies high accuracy" and vice versa'],
                  hint: 'If stuck, revisit c11_phy_cbse_01_003 (significant figures rules) and c11_phy_cbse_01_010 (vernier.',
                  misconception: 'Students believe "high precision implies high accuracy" and vice versa.' },
                { id: 'c', prompt: 'Two instruments A and B measure the same quantity. Instrument A has least count 0.01 cm; Instrument B has least count 0.001 cm.', answer: 'The claim is false',
                  options: ['The claim is false', 'high precision implies high accuracy', '"high precision implies high accuracy" and vice versa'],
                  hint: 'If stuck, revisit c11_phy_cbse_01_003 (significant figures rules) and c11_phy_cbse_01_010 (vernier.',
                  misconception: 'Students believe "high precision implies high accuracy" and vice versa.' }
          ],
            remediations: { 'high-precision-implies-high-accuracy': { steps: ['Draw a target diagram on the board — four scenarios: (a) tight cluster at bullseye (accurate & precise), (b) tight.', 'Give the student a metre scale and a vernier caliper. Ask them to measure the thickness of a single sheet of paper.', 'Have them measure a known standard (e.g., a gauge block of 10.00 mm) with both instruments.', 'Guide them to calculate the deviation from the standard for each.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_01_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "high precision implies high accuracy" and vice versa.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using only a metre scale (LC 1 mm), a vernier caliper (LC 0.01 cm), and a screw gauge (LC 0.001 cm) to demonstrate the difference.', answer: 'Object: Diameter of a steel ball bearing (~1 cm)',
                  options: ['Object: Diameter of a steel ball bearing (~1 cm)', 'high precision implies high accuracy', '"high precision implies high accuracy" and vice versa'],
                  hint: 'If stuck, revisit c11_phy_cbse_01_003 (significant figures rules) and c11_phy_cbse_01_010 (vernier.',
                  misconception: 'Students believe "high precision implies high accuracy" and vice versa.' }
          ],
            remediations: { 'high-precision-implies-high-accuracy': { steps: ['Draw a target diagram on the board — four scenarios: (a) tight cluster at bullseye (accurate & precise), (b) tight.', 'Give the student a metre scale and a vernier caliper. Ask them to measure the thickness of a single sheet of paper.', 'Have them measure a known standard (e.g., a gauge block of 10.00 mm) with both instruments.', 'Guide them to calculate the deviation from the standard for each.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_01_014', difficulty: 'standard',
          question: 'Systematic errors are reproducible inaccuracies consistently occurring in the.',
          hint: 'Review least count determination (node 013) and significant figure rules for mean.',
          misconception: 'Students believe that "taking more readings always reduces error" and confuse *precision* (small random scatter) with.',
          parts: [
                { id: 'a', prompt: 'A student measures the time period of a simple pendulum using a stopwatch.', answer: 'This is a systematic error (personal error – reaction time delay)',
                  options: ['This is a systematic error (personal error – reaction time delay)', 'taking more readings always reduces error'],
                  hint: 'Review least count determination (node 013) and significant figure rules for mean calculation.',
                  misconception: 'Students believe that "taking more readings always reduces error" and confuse *precision* (small random scatter) with *accuracy* (closeness.' },
                { id: 'b', prompt: 'Why does taking more readings and averaging reduce random error but not systematic error? Explain using the concept of error distribution.', answer: 'Random errors follow a symmetric distribution around the true value',
                  options: ['Random errors follow a symmetric distribution around the true value', 'averaging always improves accuracy', 'taking more readings always reduces error'],
                  hint: 'Review least count determination (node 013) and significant figure rules for mean calculation.',
                  misconception: 'Students believe that "taking more readings always reduces error" and confuse *precision* (small random scatter) with *accuracy* (closeness.' },
                { id: 'c', prompt: 'A vernier caliper has a least count of 0.01 cm. A student measures a rod\'s length five times: 3.21 cm, 3.23 cm, 3.22 cm, 3.20 cm, 3.24 cm.', answer: 'mean absolute error, (',
                  options: ['mean absolute error, (', 'taking more readings always reduces error'],
                  hint: 'Review least count determination (node 013) and significant figure rules for mean calculation.',
                  misconception: 'Students believe that "taking more readings always reduces error" and confuse *precision* (small random scatter) with *accuracy* (closeness.' },
                { id: 'd', prompt: 'In an experiment to determine g using a simple pendulum, a student uses a stopwatch with least count 0.1 s and measures time for 20 oscillations.', answer: 'g = 4π²L/T²',
                  options: ['g = 4π²L/T²', 'taking more readings always reduces error'],
                  hint: 'Review least count determination (node 013) and significant figure rules for mean calculation.',
                  misconception: 'Students believe that "taking more readings always reduces error" and confuse *precision* (small random scatter) with *accuracy* (closeness.' }
          ],
            remediations: { 'taking-more-readings-always-reduces': { steps: ['Give the student a screw gauge with a known zero error (e.g., +0.01 mm).', 'Have them compute the mean and compare to 5.00 mm. They will see mean ≈ 5.01 mm.', 'Ask: "Why didn\'t averaging five readings give 5.00 mm?"', 'Guide them to subtract 0.01 mm from each reading and re-average.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_01_015', difficulty: 'standard',
          question: 'Combination of errors (propagation) is the set of rules used to determine the.',
          hint: 'Revisit c11_phy_cbse_01_014 to practice calculating absolute and relative errors for.',
          misconception: 'Students frequently add absolute errors directly for multiplication or division (e.g., for A = l×b, they write ΔA = Δl.',
          parts: [
                { id: 'a', prompt: 'State the rule for the absolute error in a quantity Z = A + B, where A and B are measured quantities with absolute errors ΔA and ΔB respectively.', answer: 'The absolute error in Z is ΔZ = ΔA + ΔB',
                  options: ['The absolute error in Z is ΔZ = ΔA + ΔB', 'adding in quadrature'],
                  hint: 'Revisit c11_phy_cbse_01_014 to practice calculating absolute and relative errors for single.',
                  misconception: 'Students frequently add absolute errors directly for multiplication or division (e.g., for A = l×b, they write ΔA = Δl + Δb).' }
          ],
            remediations: { 'students-frequently-add-absolute-errors': { steps: ['Take a rectangle with l=10±1 cm, b=10±1 cm.', 'Show that adding absolute errors gives ΔA = 1+1 = 2 cm² → Area = 100±2 cm².', 'Now compute actual max/min area: (11×11)=121, (9×9)=81.', 'Spread is 121-81=40 cm², half-range ≈20 cm².'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
