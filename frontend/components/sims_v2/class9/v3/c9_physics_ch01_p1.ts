import type { SimDef } from '../../engine/types';

/** v3 generated — c9_physics_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_physics_ch01_p1: SimDef = {
    id: 'v3_c9_physics_ch01_p1',
    title: 'Entering the World of Science · Part 1/2',
    subtitle: 'Why \'I saw it work\' isn\'t enough',
    classLevel: 9, subject: 'physics', topic: 'Entering the World of Science · Part 1/2',
    chapters: ['c9_physics_ch01'],
    nodeIds: ['c9_physics_ch1_1', 'c9_physics_ch1_10', 'c9_physics_ch1_2', 'c9_physics_ch1_3', 'c9_physics_ch1_4', 'c9_physics_ch1_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a claim-checker for the internet age', intro: 'Every day, forwards and family wisdom make claims about the world. Your job: tell which ones could survive a real scientific test — and which crumble the moment controls appear.', goal: 'Distinguish scientific from non-scientific claims using falsifiability, controls, reproducibility and peer review — and understand science as communally verified knowledge.' },
    discovery: {
        question: 'A student meticulously records which colour shirt they wear on \'lucky\' exam days for a whole month — neat table, perfect order. Is that science?',
        options: ['No — personal tidiness isn\'t science; a claim must be falsifiable, controlled and checked by others, which \'lucky shirt\' tracking never does', 'Yes — systematic recording is science', 'Yes — if the data is accurate enough', 'No — only lab coats count as science'],
        answer: 'No — personal tidiness isn\'t science; a claim must be falsifiable, controlled and checked by others, which \'lucky shirt\' tracking never does',
        hook: 'A scientific \'theory\' is the opposite of a guess — it\'s the highest-status, most-tested explanation there is. And science never \'proves\' anything true; it survives by failing to be falsified, one reproducible test at a time.',
    },
    teaching: [
        { title: 'Science as a Systematic Study of Nature', text: 'Science as a systematic study of nature is the organized, evidence-based enterprise that builds and organizes knowledge through testable explanations and predictions about the natural world.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_physics_ch1_1', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Run a WhatsApp forward — \'NASA confirms lemon on forehead cures migraine instantly\' — through the gauntlet: is it falsifiable, peer-reviewed, reproducible? Then turn a home superstition into a controlled, testable investigation.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'case', nodeId: 'c9_physics_ch1_1', title: 'Science as a Systematic Study of Nature',
          caseStudy: { intro: 'Look at the ceiling fan above you — it rotates at a steady speed, but have you wondered how we *know* the electrical energy converts to kinetic energy with.',
            decisions: [{ prompt: 'A student says: "My grandmother knows that tulsi leaves cure fever because she has seen it work many times.', options: [
                { text: 'No, the student is not correct', outcome: 'No, the student is not correct. While the grandmother\'s knowledge is based on observation, it lacks.' },
                { text: 'systematic', outcome: 'Not quite — Students believe "systematic" only means "step-by-step procedure" (like following a lab manual).', reveals: 'systematic-only-means-step-by' },
                { text: 'step-by-step procedure', outcome: 'Not quite — Students believe "systematic" only means "step-by-step procedure" (like following a lab manual).', reveals: 'systematic-only-means-step-by' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch1_10', title: 'Science and Society: Impact on Daily Life',
          caseStudy: { intro: 'Observe a ceiling fan in your classroom: it converts electrical energy into kinetic energy of air using a motor based on the magnetic effect of current.',
            decisions: [{ prompt: 'Name one physics principle from Class 9 (motion, force, gravitation, work/energy, or sound) that enables the working of a bicycle, and.', options: [
                { text: 'Principle: Newton\'s laws of motion (especially second law F=ma and third law', outcome: 'Principle: Newton\'s laws of motion (especially second law F=ma and third law action-reaction) and.' },
                { text: 'thermodynamics', outcome: 'Not quite — Students think "science impacts society only through big inventions like rockets or smartphones".', reveals: 'science-impacts-society-only-through' },
                { text: 'science impacts society only through big inventions like rockets or smartphones', outcome: 'Not quite — Students think "science impacts society only through big inventions like rockets or smartphones".', reveals: 'science-impacts-society-only-through' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch1_2', title: 'Model Building in Science: Representing Reality',
          caseStudy: { intro: 'You are sitting in a chair reading this. Are you at rest or in motion? Relative to the chair and the room, you are at rest — your position does not change.',
            decisions: [{ prompt: 'Define motion and rest. Are they absolute or relative?', options: [
                { text: 'Motion is the change in position of a body with respect to its surroundings over time', outcome: 'Motion is the change in position of a body with respect to its surroundings over time.' },
                { text: 'rest means not moving', outcome: 'Not quite — Students think rest and motion are absolute — a body is "really" at rest or "really" in motion.', reveals: 'rest-and-motion-are-absolute' },
                { text: 'relative to what', outcome: 'Not quite — Students think rest and motion are absolute — a body is "really" at rest or "really" in motion.', reveals: 'rest-and-motion-are-absolute' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch1_3', title: 'Observation and Inference in Scientific Investigation',
          caseStudy: { intro: 'Imagine you switch on a ceiling fan in a hot Indian summer afternoon.',
            decisions: [{ prompt: 'State the fundamental difference between an observation and an inference in a scientific investigation.', options: [
                { text: 'An observation is a direct, factual record from senses/instruments (e.g., "The pendulum', outcome: 'An observation is a direct, factual record from senses/instruments (e.g., "The pendulum completed.' },
                { text: 'photosynthesis occurred', outcome: 'Not quite — Students believe that any statement using scientific vocabulary (e.g., "photosynthesis occurred".', reveals: 'any-statement-using-scientific-vocabulary' },
                { text: 'electrons flow', outcome: 'Not quite — Students believe that any statement using scientific vocabulary (e.g., "photosynthesis occurred".', reveals: 'any-statement-using-scientific-vocabulary' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch1_4', title: 'Hypothesis and Testing in the Scientific Method',
          caseStudy: { intro: 'Imagine you notice that a ceiling fan runs slower when the voltage drops during a summer afternoon power fluctuation — this everyday observation sparks.',
            decisions: [{ prompt: 'A student writes: "My hypothesis is that heavier objects fall faster because gravity pulls them more." Identify the two fundamental flaws.', options: [
                { text: 'The statement is not falsifiable (it asserts a "because" mechanism without a testable', outcome: 'The statement is not falsifiable (it asserts a "because" mechanism without a testable prediction.' },
                { text: 'because', outcome: 'Not quite — Students believe a hypothesis is "an educated guess" that gets "proven true" by an experiment.', reveals: 'a-hypothesis-is-an-educated' },
                { text: 'If mass increases, then time of fall decreases', outcome: 'Not quite — Students believe a hypothesis is "an educated guess" that gets "proven true" by an experiment.', reveals: 'a-hypothesis-is-an-educated' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch1_5', title: 'Measurement: Units and Standards in Science',
          caseStudy: { intro: 'Imagine you are buying cloth for a kurta in a Delhi market: the shopkeeper measures it with a "haath" (forearm length), but your tailor in Mumbai uses a metre.',
            decisions: [{ prompt: 'State the SI base unit and its symbol for each of the following quantities: (a) length, (b) mass, (c) time, (d) electric current, (e).', options: [
                { text: '(a) metre (m), (b) kilogram (kg), (c) second (s), (d) ampere (A), (e) kelvin (K)', outcome: '(a) metre (m), (b) kilogram (kg), (c) second (s), (d) ampere (A), (e) kelvin (K).' },
                { text: 'metric unit', outcome: 'Not quite — Students believe that "metric unit" and "SI unit" are synonyms, so they write "cm" or "g" in final.', reveals: 'metric-unit-and-si-unit' },
                { text: 'SI unit', outcome: 'Not quite — Students believe that "metric unit" and "SI unit" are synonyms, so they write "cm" or "g" in final.', reveals: 'metric-unit-and-si-unit' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch1_1', title: 'A real-world call',
          caseStudy: { intro: 'Gravitational physics made GPS possible — free to everyone, precise to metres. The same physics guides weapons to the same precision. Einstein\'s equations are on both sides.',
            decisions: [{ prompt: 'Can a scientist choose which uses their work enables?', options: [
                { text: 'No — fundamental knowledge belongs to everyone', outcome: 'The openness argument; the counter is that \'everyone\' includes the ones you\'d least want to enable.' },
                { text: 'Yes — publish selectively, patent defensively', outcome: 'The controlled-release answer; it works for applied work but fails for the fundamentals — physics can\'t be unpublished.' },
                { text: 'You choose the field, not the use — pick fields carefully', outcome: 'The career-ethics answer — a physicist chooses what to work on; the uses that follow are harder to control but not unknowable.' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch1_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A WhatsApp forward announces: \'NASA confirms — rubbing lemon on the forehead cures migraine instantly.\' A student who has seen his grandmother\'s remedies \'work many times\' calls it scientific because someone observed it.',
            decisions: [{ prompt: 'Does observation alone make the claim scientific?', options: [
                { text: 'No — systematic science demands more than watching: a falsifiable, measurable claim, controlled comparison (placebo, dosage), reproducibility by independent testers, and peer review. \'It worked for grandma\' is observation without controls; a forward citing NASA is authority without method.', outcome: 'This applies the communal, testable-evidence criteria that separate science from anecdote — personal observation is necessary but nowhere near sufficient.' },
                { text: 'It counts as scientific — repeated observation is exactly how science collects its facts.', outcome: 'Repeated uncontrolled observation cannot rule out placebo or natural recovery; science starts only when the claim is structured so evidence could prove it false.', reveals: 'observation-is-enough' },
                { text: 'It is scientific because NASA said so — trusted institutions make a claim reliable.', outcome: 'That is appeal to authority: no study, no mechanism, no replication is cited — an institution\'s name is not a method.', reveals: 'authority-is-proof' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch1_5', title: 'The bigger picture',
          caseStudy: { intro: 'Science is systematic because it\'s communally verified: falsifiable claims, controlled tests, results anyone can replicate. Observing something many times isn\'t enough — Grandma\'s tulsi cure still needs a placebo group.',
            decisions: [{ prompt: 'What comes next? Entering the World of Science · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Entering the World of Science · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch1_1', difficulty: 'standard',
          question: 'Science as a systematic study of nature is the organized, evidence-based.',
          hint: 'If stuck, revisit c8_physics_ch1_5 (Variables in Experiments) and c8_physics_ch1_3.',
          misconception: 'Students believe "systematic" only means "step-by-step procedure" (like following a lab manual).',
          parts: [
                { id: 'a', prompt: 'A student says: "My grandmother knows that tulsi leaves cure fever because she has seen it work many times.', answer: 'No, the student is not correct',
                  options: ['No, the student is not correct', 'systematic', 'step-by-step procedure', '"systematic" only means "step-by-step procedure" (like following a lab manual)'],
                  hint: 'If stuck, revisit c8_physics_ch1_5 (Variables in Experiments) and c8_physics_ch1_3 (Designing.',
                  misconception: 'Students believe "systematic" only means "step-by-step procedure" (like following a lab manual).' },
                { id: 'b', prompt: 'Two students debate: Student A says "A theory in science is just a guess that hasn\'t been proven yet." Student B says "A scientific theory is.', answer: 'Student B is correct',
                  options: ['Student B is correct', 'systematic', 'step-by-step procedure', '"systematic" only means "step-by-step procedure" (like following a lab manual)'],
                  hint: 'If stuck, revisit c8_physics_ch1_5 (Variables in Experiments) and c8_physics_ch1_3 (Designing.',
                  misconception: 'Students believe "systematic" only means "step-by-step procedure" (like following a lab manual).' },
                { id: 'c', prompt: 'Analyze this statement: "Science progresses by proving theories true." Explain why this statement is epistemologically incorrect.', answer: 'Science does not *prove* theories true',
                  options: ['Science does not *prove* theories true', 'not yet falsified', 'proven true', 'systematic'],
                  hint: 'If stuck, revisit c8_physics_ch1_5 (Variables in Experiments) and c8_physics_ch1_3 (Designing.',
                  misconception: 'Students believe "systematic" only means "step-by-step procedure" (like following a lab manual).' }
          ],
            remediations: { 'systematic-only-means-step-by': { steps: ['If the student conflates personal orderliness with scientific systematicity: (1) Have them compare two.', '(B) A class conducts a double-blind test: 30 students randomly assigned red/blue shirts, same mock exam, scores.', '(2) Ask: "Which investigation would convince *another school* to adopt the shirt color?', 'Why?" (3) Guide them to see that (B) uses controls, randomization, statistical analysis, and public data — the *social*.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch1_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "systematic" only means "step-by-step procedure" (like following a lab manual).',
          parts: [
                { id: 'a', prompt: 'A Class 9 student reads a WhatsApp forward: "NASA confirms: rubbing lemon on forehead cures migraine instantly." Evaluate this claim using *three* criteria.', answer: 'Judgment: Reject',
                  options: ['Judgment: Reject', 'accept because NASA is authoritative', 'systematic', 'step-by-step procedure'],
                  hint: 'If stuck, revisit c8_physics_ch1_5 (Variables in Experiments) and c8_physics_ch1_3 (Designing.',
                  misconception: 'Students believe "systematic" only means "step-by-step procedure" (like following a lab manual).' }
          ],
            remediations: { 'systematic-only-means-step-by': { steps: ['If the student conflates personal orderliness with scientific systematicity: (1) Have them compare two.', '(B) A class conducts a double-blind test: 30 students randomly assigned red/blue shirts, same mock exam, scores.', '(2) Ask: "Which investigation would convince *another school* to adopt the shirt color?', 'Why?" (3) Guide them to see that (B) uses controls, randomization, statistical analysis, and public data — the *social*.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch1_10', difficulty: 'standard',
          question: 'Science and Society: Impact on Daily Life refers to the bidirectional.',
          hint: 'If stuck, revisit Class 8 "Heating Effect of Electric Current" (c8_physics_ch2_6) and.',
          misconception: 'Students think "science impacts society only through big inventions like rockets or smartphones" and overlook how.',
          parts: [
                { id: 'a', prompt: 'Name one physics principle from Class 9 (motion, force, gravitation, work/energy, or sound) that enables the working of a bicycle, and state the technology.', answer: 'Principle: Newton\'s laws of motion (especially second law F=ma and third law',
                  options: ['Principle: Newton\'s laws of motion (especially second law F=ma and third law', 'thermodynamics', 'science impacts society only through big inventions like rockets or smartphones'],
                  hint: 'If stuck, revisit Class 8 "Heating Effect of Electric Current" (c8_physics_ch2_6) and "Applications.',
                  misconception: 'Students think "science impacts society only through big inventions like rockets or smartphones" and overlook how fundamental principles.' }
          ],
            remediations: { 'science-impacts-society-only-through': { steps: ['Pick five objects in your kitchen (pressure cooker, LPG stove, refrigerator, mixer grinder, water filter).', 'For each, identify the core physics principle (pressure, combustion/thermodynamics, heat pump/thermodynamics.', 'Write one sentence on how that object changed a daily routine (cooking time, food preservation, labor).', 'Discuss with a peer: what happens if the object fails or is unavailable?'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch1_2', difficulty: 'standard',
          question: 'Motion is the change in position of a body with respect to its surroundings.',
          hint: 'Revisit c9_physics_ch1_1 (Introduction to Physics) for the basic framework of physical.',
          misconception: 'Students think rest and motion are absolute — a body is "really" at rest or "really" in motion.',
          parts: [
                { id: 'a', prompt: 'What is a reference frame, and why is it necessary for describing motion?', answer: 'A reference frame is the object or system relative to',
                  options: ['A reference frame is the object or system relative to', 'a reference frame is a coordinate system', 'really', 'rest and motion are absolute'],
                  hint: 'Revisit c9_physics_ch1_1 (Introduction to Physics) for the basic framework of physical measurement.',
                  misconception: 'Students think rest and motion are absolute — a body is "really" at rest or "really" in motion.' },
                { id: 'b', prompt: 'A tree stands on the ground. A car drives past it at 60 km/h. Describe the tree\'s motion from two different reference frames.', answer: 'Frame 1 (ground reference): The tree is at rest',
                  options: ['Frame 1 (ground reference): The tree is at rest', 'the tree is at rest, period', 'really', 'rest and motion are absolute'],
                  hint: 'Revisit c9_physics_ch1_1 (Introduction to Physics) for the basic framework of physical measurement.',
                  misconception: 'Students think rest and motion are absolute — a body is "really" at rest or "really" in motion.' }
          ],
            remediations: { 'rest-and-motion-are-absolute': { steps: ['Ask: "Are you moving?" (Relative to the room: no.', 'Relative to the Sun: yes.) 2.', 'Ask: "Is the car moving relative to the table?', 'Introduce "reference frame" — the thing we measure relative to.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch1_3', difficulty: 'standard',
          question: 'Observation is the direct gathering of information through the senses.',
          hint: 'Revisit c8_physics_ch1_2 (Observation and Experimentation in Science) and.',
          misconception: 'Students believe that any statement using scientific vocabulary (e.g., "photosynthesis occurred", "electrons flow").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Observation is the direct gathering of information through the senses or instruments,',
                  options: ['Observation is the direct gathering of information through the senses or instruments,', 'Science as a systematic study of nature is the organized, evidence-based enterprise that', 'Science and Society: Impact on Daily Life refers to the bidirectional relationship where', 'Motion is the change in position of a body with respect to its surroundings over time,'],
                  hint: 'Revisit c8_physics_ch1_2 (Observation and Experimentation in Science) and c6_physics_ch01_002 (The.',
                  misconception: 'Students believe that any statement using scientific vocabulary (e.g., "photosynthesis occurred", "electrons flow") is an observation.' }
          ],
            remediations: { 'any-statement-using-scientific-vocabulary': { steps: ['Show a 30-second video of a candle burning (no narration).', 'Ask the student to write 5 sentences *only* describing what they see/hear/smell – no "because", "therefore",.', 'Together, convert each observation into an inference using "suggests that" or "could mean".', 'Repeat with a new phenomenon (e.g., ice melting) until the student consistently separates the two columns.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch1_4', difficulty: 'standard',
          question: 'A hypothesis is a testable, falsifiable prediction about the relationship.',
          hint: 'Revisit c8_physics_ch1_5 (Variables in Experiments) and practice classifying variables.',
          misconception: 'Students believe a hypothesis is "an educated guess" that gets "proven true" by an experiment — they write hypotheses.',
          parts: [
                { id: 'a', prompt: 'Two students test "Does temperature affect the bounce height of a rubber ball?" Student A drops the ball from 1 m onto a concrete floor at 10°C, 20°C, 30°C.', answer: 'Student A\'s design is valid',
                  options: ['Student A\'s design is valid', 'an educated guess', 'proven true', 'Temperature affects resistance'],
                  hint: 'Revisit c8_physics_ch1_5 (Variables in Experiments) and practice classifying variables in 5.',
                  misconception: 'Students believe a hypothesis is "an educated guess" that gets "proven true" by an experiment — they write hypotheses as vague statements.' }
          ],
            remediations: { 'a-hypothesis-is-an-educated': { steps: ['Have the student rewrite three vague statements (e.g., "Light affects plant growth") into directional, testable "If.', 'Give them a sample dataset with an anomaly and ask: "Does this prove the hypothesis?', 'Use the pendulum example — ask them to design a test where mass is the independent variable; they will see that period.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch1_5', difficulty: 'standard',
          question: 'Measurement in science is the process of comparing an unknown physical quantity.',
          hint: 'If stuck, review Class 7 "Units of Speed and Their Conversions" (c7_physics_ch04_010) for.',
          misconception: 'Students believe that "metric unit" and "SI unit" are synonyms, so they write "cm" or "g" in final answers thinking.',
          parts: [
                { id: 'a', prompt: 'State the SI base unit and its symbol for each of the following quantities: (a) length, (b) mass, (c) time, (d) electric current, (e) thermodynamic temperature.', answer: 'length, (',
                  options: ['length, (', 'metric unit', 'SI unit'],
                  hint: 'If stuck, review Class 7 "Units of Speed and Their Conversions" (c7_physics_ch04_010) for practice.',
                  misconception: 'Students believe that "metric unit" and "SI unit" are synonyms, so they write "cm" or "g" in final answers thinking they are using SI.' },
                { id: 'b', prompt: 'A car travels at 72 km/h. Convert this speed into m/s. Show all steps including unit cancellation.', answer: 'Step 1: Write given value with units: 72 km/h',
                  options: ['Step 1: Write given value with units: 72 km/h', 'divide by 3.6', 'metric unit', 'SI unit'],
                  hint: 'If stuck, review Class 7 "Units of Speed and Their Conversions" (c7_physics_ch04_010) for practice.',
                  misconception: 'Students believe that "metric unit" and "SI unit" are synonyms, so they write "cm" or "g" in final answers thinking they are using SI.' },
                { id: 'c', prompt: 'The formula for pressure is P = F/A. If force is measured in newtons (N) and area in square metres (m²), what is the SI unit of pressure?', answer: 'Pressure = Force / Area = N / m²',
                  options: ['Pressure = Force / Area = N / m²', 'pascal', 'metric unit', 'SI unit'],
                  hint: 'If stuck, review Class 7 "Units of Speed and Their Conversions" (c7_physics_ch04_010) for practice.',
                  misconception: 'Students believe that "metric unit" and "SI unit" are synonyms, so they write "cm" or "g" in final answers thinking they are using SI.' }
          ],
            remediations: { 'metric-unit-and-si-unit': { steps: ['Have the student write the metric prefix table (kilo, hecto, deca, base, deci, centi, milli) with their powers of ten.', 'Give a conversion problem (e.g., 3.5 km to m) and require them to write the conversion factor as a fraction (1000 m / 1.', 'Ask them to identify the SI base unit for each quantity in a list (length → m, mass → kg, volume → m³ not litre).', 'Practice deriving units for force, pressure, energy from formulas using only kg, m, s until they can do it without.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
