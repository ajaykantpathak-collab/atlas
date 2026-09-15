import type { SimDef } from '../../engine/types';

/** v3 generated — c9_physics_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_physics_ch01_p2: SimDef = {
    id: 'v3_c9_physics_ch01_p2',
    title: 'Entering the World of Science · Part 2/2',
    subtitle: 'Why \'I saw it work\' isn\'t enough',
    classLevel: 9, subject: 'physics', topic: 'Entering the World of Science · Part 2/2',
    chapters: ['c9_physics_ch01'],
    nodeIds: ['c9_physics_ch1_6', 'c9_physics_ch1_7', 'c9_physics_ch1_8', 'c9_physics_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a claim-checker for the internet age', intro: 'Every day, forwards and family wisdom make claims about the world. Your job: tell which ones could survive a real scientific test — and which crumble the moment controls appear.', goal: 'Distinguish scientific from non-scientific claims using falsifiability, controls, reproducibility and peer review — and understand science as communally verified knowledge.' },
    discovery: {
        question: 'A student meticulously records which colour shirt they wear on \'lucky\' exam days for a whole month — neat table, perfect order. Is that science?',
        options: ['No — personal tidiness isn\'t science; a claim must be falsifiable, controlled and checked by others, which \'lucky shirt\' tracking never does', 'Yes — systematic recording is science', 'Yes — if the data is accurate enough', 'No — only lab coats count as science'],
        answer: 'No — personal tidiness isn\'t science; a claim must be falsifiable, controlled and checked by others, which \'lucky shirt\' tracking never does',
        hook: 'A scientific \'theory\' is the opposite of a guess — it\'s the highest-status, most-tested explanation there is. And science never \'proves\' anything true; it survives by failing to be falsified, one reproducible test at a time.',
    },
    teaching: [
        { title: 'Accuracy and Precision in Measurement', text: 'Accuracy refers to how close a measured value is to the true or accepted value of the quantity being measured, while precision refers to how close repeated measurements of the same quantity are.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_physics_ch1_6', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Run a WhatsApp forward — \'NASA confirms lemon on forehead cures migraine instantly\' — through the gauntlet: is it falsifiable, peer-reviewed, reproducible? Then turn a home superstition into a controlled, testable investigation.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_physics_ch1_6', title: 'Accuracy and Precision in Measurement',
          scaffold: { problem: 'In a school lab, the density of aluminium is determined by measuring mass and volume.',
            steps: [
            { text: 'Identify given quantities with units. Mass m = 27.345 g (5 sig fig, least count 0.001 g).' },
            { text: 'Formula for density ρ = m/V. Check units: g / cm³ = g/cm³. Significant figures: m has 5 sig fig, V has 3 sig fig →.' },
            { text: 'Substitute values: ρ = 27.345 g / 10.2 cm³ = 2.680882... g/cm³.' },
            { text: 'Round to 3 significant figures: ρ = 2.68 g/cm³. Compute absolute error = |2.68 - 2.70| = 0.02 g/cm³.' },
            { text: 'Verify: Density of aluminium ~2.7 g/cm³, our value 2.68 is close. Error < 1% is reasonable for school lab.', faded: true, blankAnswer: 'ρ = 2.68 g/cm³, absolute error = 0.02 g/cm³, relative error.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch1_7', title: 'Tools and Instruments in Scientific Investigation',
          scaffold: { problem: 'A vernier caliper has 1 cm main scale divided into 10 divisions (so 1 MSD = 0.1 cm).',
            steps: [
            { text: 'Identify given quantities: 1 MSD = 0.1 cm, N = 50, zero error = –2 VSD (vernier zero left of main scale zero → negative.' },
            { text: 'Calculate least count: LC = 1 MSD / N = 0.1 cm / 50 = 0.002 cm. Verify units: cm/division → cm.' },
            { text: 'Determine zero error: Zero error = –2 × LC = –2 × 0.002 cm = –0.004 cm. Zero correction = –(Zero error) = +0.004 cm.' },
            { text: 'Compute observed reading: Observed = MSR + (VSR × LC) = 1.2 cm + (24 × 0.002 cm) = 1.2 cm + 0.048 cm = 1.248 cm.' },
            { text: 'Apply zero correction: True reading = Observed + Zero correction = 1.248 cm + 0.004 cm = 1.252 cm.', faded: true, blankAnswer: '1.252 cm' }
            ] } },
        { type: 'case', nodeId: 'c9_physics_ch1_8', title: 'Collaboration and Communication in Science',
          caseStudy: { intro: 'Imagine reading a news headline: "Indian scientists at IUCAA and global partners detect gravitational waves using LIGO." A Class 9 student sees that this.',
            decisions: [{ prompt: 'What is the primary purpose of peer review in scientific publishing?', options: [
                { text: 'Peer review subjects a manuscript to independent evaluation by experts in the same field', outcome: 'Peer review subjects a manuscript to independent evaluation by experts in the same field to assess.' },
                { text: 'to check grammar', outcome: 'Not quite — Students believe collaboration in science simply means "working in a group" or "dividing tasks,".', reveals: 'collaboration-in-science-simply-means' },
                { text: 'to ensure the result is correct', outcome: 'Not quite — Students believe collaboration in science simply means "working in a group" or "dividing tasks,".', reveals: 'collaboration-in-science-simply-means' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch1_9', title: 'Safety in the Science Laboratory',
          caseStudy: { intro: 'Imagine you are about to verify Ohm\'s law using a battery, rheostat, and ammeter in your school lab.',
            decisions: [{ prompt: 'What is the primary purpose of the Globally Harmonized System (GHS) hazard pictograms on chemical containers in a school laboratory?', options: [
                { text: 'The primary purpose is to provide a standardized, language-independent visual warning', outcome: 'The primary purpose is to provide a standardized, language-independent visual warning about the.' },
                { text: 'to show the chemical name', outcome: 'Not quite — Students believe "safety is mostly about wearing goggles and not running" — they equate safety with.', reveals: 'safety-is-mostly-about-wearing' },
                { text: 'to indicate price', outcome: 'Not quite — Students believe "safety is mostly about wearing goggles and not running" — they equate safety with.', reveals: 'safety-is-mostly-about-wearing' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch1_6', title: 'A real-world call',
          caseStudy: { intro: 'Gravitational physics made GPS possible — free to everyone, precise to metres. The same physics guides weapons to the same precision. Einstein\'s equations are on both sides.',
            decisions: [{ prompt: 'Can a scientist choose which uses their work enables?', options: [
                { text: 'No — fundamental knowledge belongs to everyone', outcome: 'The openness argument; the counter is that \'everyone\' includes the ones you\'d least want to enable.' },
                { text: 'Yes — publish selectively, patent defensively', outcome: 'The controlled-release answer; it works for applied work but fails for the fundamentals — physics can\'t be unpublished.' },
                { text: 'You choose the field, not the use — pick fields carefully', outcome: 'The career-ethics answer — a physicist chooses what to work on; the uses that follow are harder to control but not unknowable.' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch1_6', title: 'Use it in the wild',
          caseStudy: { intro: 'A WhatsApp forward announces: \'NASA confirms — rubbing lemon on the forehead cures migraine instantly.\' A student who has seen his grandmother\'s remedies \'work many times\' calls it scientific because someone observed it.',
            decisions: [{ prompt: 'Does observation alone make the claim scientific?', options: [
                { text: 'No — systematic science demands more than watching: a falsifiable, measurable claim, controlled comparison (placebo, dosage), reproducibility by independent testers, and peer review. \'It worked for grandma\' is observation without controls; a forward citing NASA is authority without method.', outcome: 'This applies the communal, testable-evidence criteria that separate science from anecdote — personal observation is necessary but nowhere near sufficient.' },
                { text: 'It counts as scientific — repeated observation is exactly how science collects its facts.', outcome: 'Repeated uncontrolled observation cannot rule out placebo or natural recovery; science starts only when the claim is structured so evidence could prove it false.', reveals: 'observation-is-enough' },
                { text: 'It is scientific because NASA said so — trusted institutions make a claim reliable.', outcome: 'That is appeal to authority: no study, no mechanism, no replication is cited — an institution\'s name is not a method.', reveals: 'authority-is-proof' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch1_9', title: 'You made it',
          caseStudy: { intro: 'Science is systematic because it\'s communally verified: falsifiable claims, controlled tests, results anyone can replicate. Observing something many times isn\'t enough — Grandma\'s tulsi cure still needs a placebo group.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch1_6', difficulty: 'standard',
          question: 'Accuracy refers to how close a measured value is to the true or accepted value.',
          hint: 'Review c9_physics_ch1_5 (least count, zero error, reading instruments) and.',
          misconception: 'Students believe that "more decimal places in a measurement = more accurate".',
          parts: [
                { id: 'a', prompt: 'A student measures the length of a physics textbook three times using a metre scale and gets 25.4 cm, 25.5 cm, and 25.4 cm. The actual length is 25.0 cm.', answer: 'Correct answer: C) Low accuracy, high precision',
                  options: ['Correct answer: C) Low accuracy, high precision', 'consistent readings = correct readings', 'more decimal places in a measurement = more accurate', 'the spread is large when it is actually small'],
                  hint: 'Review c9_physics_ch1_5 (least count, zero error, reading instruments) and c8_physics_ch1_6.',
                  misconception: 'Students believe that "more decimal places in a measurement = more accurate".' },
                { id: 'b', prompt: 'Why does a vernier caliper with a zero error of +0.02 cm give precise but inaccurate measurements for the diameter of a wire, even if the student takes 10.', answer: 'Correct answer: Zero error is a systematic error',
                  options: ['Correct answer: Zero error is a systematic error', 'zero error makes readings random', 'it affects both equally', 'more decimal places in a measurement = more accurate'],
                  hint: 'Review c9_physics_ch1_5 (least count, zero error, reading instruments) and c8_physics_ch1_6.',
                  misconception: 'Students believe that "more decimal places in a measurement = more accurate".' }
          ],
            remediations: { 'more-decimal-places-in-a': { steps: ['Take a metre scale and a vernier caliper. Measure the same object (e.g., diameter of a coin) with both.', 'Introduce a known systematic error in the vernier (e.g., add a 0.02 cm shim on the fixed jaw). Measure again.', 'Discuss: "More decimals ≠ more accuracy. Accuracy needs correct calibration. Precision needs consistency."', 'Practice identifying systematic vs random errors in 5 lab scenarios (e.g., parallax error, temperature expansion, zero.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch1_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "more decimal places in a measurement = more accurate".',
          parts: [
                { id: 'a', prompt: 'A student calculates the area of a rectangular metal sheet by measuring length = 12.4 cm (3 sig fig) and breadth = 3.2 cm (2 sig fig) using a vernier caliper.', answer: 'The student\'s answer is wrong',
                  options: ['The student\'s answer is wrong', 'keep 3 sig fig because length has 3', 'more decimal places in a measurement = more accurate', '"more decimal places in a measurement = more accurate"'],
                  hint: 'Review c9_physics_ch1_5 (least count, zero error, reading instruments) and c8_physics_ch1_6.',
                  misconception: 'Students believe that "more decimal places in a measurement = more accurate".' }
          ],
            remediations: { 'more-decimal-places-in-a': { steps: ['Take a metre scale and a vernier caliper. Measure the same object (e.g., diameter of a coin) with both.', 'Introduce a known systematic error in the vernier (e.g., add a 0.02 cm shim on the fixed jaw). Measure again.', 'Discuss: "More decimals ≠ more accuracy. Accuracy needs correct calibration. Precision needs consistency."', 'Practice identifying systematic vs random errors in 5 lab scenarios (e.g., parallax error, temperature expansion, zero.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch1_7', difficulty: 'standard',
          question: 'Tools and instruments in scientific investigation are standardized devices used.',
          hint: 'Revisit c9_physics_ch1_6 (Accuracy and Precision in Measurement) and practice reading.',
          misconception: 'Students often treat zero error and zero correction as having the same sign.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Tools and instruments in scientific investigation are standardized devices used to',
                  options: ['Tools and instruments in scientific investigation are standardized devices used to', 'Science as a systematic study of nature is the organized, evidence-based enterprise that', 'Science and Society: Impact on Daily Life refers to the bidirectional relationship where', 'Motion is the change in position of a body with respect to its surroundings over time,'],
                  hint: 'Revisit c9_physics_ch1_6 (Accuracy and Precision in Measurement) and practice reading vernier scale.',
                  misconception: 'Students often treat zero error and zero correction as having the same sign.' }
          ],
            remediations: { 'students-often-treat-zero-error': { steps: ['Draw two caliper diagrams: one with zero error +0.03 cm, another with –0.03 cm.', 'Ask the student to state the zero error sign in each case.', 'Write the formula True reading = Observed reading – Zero error on the board.', 'Give three numerical observed readings for each diagram and have the student compute the true reading step by step.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch1_8', difficulty: 'standard',
          question: 'Collaboration and communication in science refer to the structured processes.',
          hint: 'Revisit c9_physics_ch1_4 (Hypothesis and Testing) and c6_physics_ch01_002 (The Scientific.',
          misconception: 'Students believe collaboration in science simply means "working in a group" or "dividing tasks," and that communication.',
          parts: [
                { id: 'a', prompt: 'Why is replication considered a cornerstone of scientific reliability, whereas a single experiment is never sufficient?', answer: 'Replication by independent groups using different equipment or methods rules out',
                  options: ['Replication by independent groups using different equipment or methods rules out', 'replication just confirms the result', 'working in a group', 'dividing tasks'],
                  hint: 'Revisit c9_physics_ch1_4 (Hypothesis and Testing) and c6_physics_ch01_002 (The Scientific Method).',
                  misconception: 'Students believe collaboration in science simply means "working in a group" or "dividing tasks," and that communication is just writing.' }
          ],
            remediations: { 'collaboration-in-science-simply-means': { steps: ['Assign a 10-minute "Measurement Protocol Challenge": pairs must write a step-by-step procedure for measuring the.', 'Swap procedures with another pair; attempt to follow them *exactly* without asking questions.', 'Compare results; discuss every ambiguity found (e.g., "zero error not mentioned," "which face of anvil?").', 'Rewrite the protocol incorporating the missing specifications.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch1_9', difficulty: 'standard',
          question: 'Laboratory safety is the systematic practice of identifying, assessing, and.',
          hint: 'Review c9_physics_ch1_7 (Tools and Instruments) to recall equipment-specific hazards, and.',
          misconception: 'Students believe "safety is mostly about wearing goggles and not running" — they equate safety with passive.',
          parts: [
                { id: 'a', prompt: 'Compare the fire hazards of using a Bunsen burner versus a hot plate for heating a flammable organic solvent (like ethanol) in a distillation setup.', answer: 'A hot plate is significantly safer',
                  options: ['A hot plate is significantly safer', 'better control', 'safety is mostly about wearing goggles and not running'],
                  hint: 'Review c9_physics_ch1_7 (Tools and Instruments) to recall equipment-specific hazards, and.',
                  misconception: 'Students believe "safety is mostly about wearing goggles and not running" — they equate safety with passive rule-following rather than.' }
          ],
            remediations: { 'safety-is-mostly-about-wearing': { steps: ['Have the student perform a "Hazard Hunt" on a staged lab setup (e.g., frayed cord, unlabeled beaker, blocked exit.', 'For each hazard found, require them to: name the hazard type, state the possible injury, propose.', 'Debrief by mapping their findings to the 5 categories in the Safety Passport.', 'Repeat with a different setup until they independently identify ≥90% of planted hazards.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
