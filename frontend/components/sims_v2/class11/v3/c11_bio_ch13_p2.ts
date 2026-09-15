import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch13_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch13_p2: SimDef = {
    id: 'v3_c11_bio_ch13_p2',
    title: 'Plant Growth and Development · Part 2/2',
    subtitle: 'Define growth strictly enough to reject swollen wood — then graph it two different ways.',
    classLevel: 11, subject: 'biology', topic: 'Plant Growth and Development · Part 2/2',
    chapters: ['c11_bio_ch13'],
    nodeIds: ['c11_bio_cbse_13_007', 'c11_bio_cbse_13_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a crop scientist deciding whether seedlings are actually growing or just waterlogged', intro: 'Your germination trays look bigger every morning — but is that growth or just absorbed water? The distinction decides your whole experiment.', goal: 'Define growth, explain indeterminate growth via meristems, and distinguish arithmetic, geometric, and sigmoid patterns.' },
    discovery: {
        question: 'A wooden plank swells in the rain; a mango sapling grows all year. Both got bigger — but only one change is permanent, metabolic, and irreversible. What three tests does true growth pass that mere swelling fails?',
        options: ['It is irreversible, powered by metabolism, and adds protoplasm — swelling is just reversible water uptake by dead walls', 'It happens only above the soil line', 'It always produces flowers first', 'It requires sunlight; swelling happens in the dark'],
        answer: 'It is irreversible, powered by metabolism, and adds protoplasm — swelling is just reversible water uptake by dead walls',
        hook: 'Growth isn\'t \'getting bigger\' — it\'s a funded construction project run by meristems that never close, which is why plants never stop.',
    },
    teaching: [
        { title: 'Vernalisation: Cold Treatment and Flowering', text: 'Vernalisation is the process by which certain plants, particularly biennials and winter annuals, acquire the competence to flower after exposure to prolonged low temperatures (typically 0–10°C).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_13_007', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Separate growth from imbibition, name the three phases a root-tip cell passes through, and read two datasets — a root gaining 2 mm every hour versus a fruit cell swelling 350,000-fold — as arithmetic versus geometric growth.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_13_007', title: 'Vernalisation: Cold Treatment and Flowering',
          caseStudy: { intro: 'Observe a wheat field in Punjab: seeds sown in November flower in March, but the same variety sown in April fails to flower before summer heat kills it.',
            decisions: [{ prompt: 'Define vernalisation and state the typical temperature range and duration required for effective vernalisation in winter wheat.', options: [
                { text: 'Vernalisation is the acquisition of flowering competence through prolonged exposure to', outcome: 'Vernalisation is the acquisition of flowering competence through prolonged exposure to low.' },
                { text: 'cold-induced flowering', outcome: 'Not quite — Students think vernalisation *is* flowering — they say "cold makes the plant flower." The exact.', reveals: 'vernalisation-is-flowering-they-say' },
                { text: 'any cold treatment', outcome: 'Not quite — Students think vernalisation *is* flowering — they say "cold makes the plant flower." The exact.', reveals: 'vernalisation-is-flowering-they-say' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_13_008', title: 'Seed Dormancy and Germination',
          caseStudy: { intro: 'Observe a handful of mung bean (moong) seeds soaked overnight: they swell, the seed coat wrinkles, and a tiny white radicle appears.',
            decisions: [{ prompt: 'Define seed dormancy and state one key difference between dormancy and quiescence.', options: [
                { text: 'Seed dormancy is an internal, genetically controlled block that prevents germination even', outcome: 'Seed dormancy is an internal, genetically controlled block that prevents germination even when.' },
                { text: 'dormant seeds are dead or inactive', outcome: 'Not quite — Students often think that "dormant seeds are dead or inactive." In reality, dormant seeds maintain.', reveals: 'dormant-seeds-are-dead-or' },
                { text: '"dormant seeds are dead or inactive', outcome: 'Not quite — Students often think that "dormant seeds are dead or inactive." In reality, dormant seeds maintain.', reveals: 'dormant-seeds-are-dead-or' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_13_008', title: 'Identify each idea',
          dissect: { specimen: 'Plant Growth and Development · Part 2/2', spots: [
            { id: 's1', label: 'Vernalisation Cold Treatment and Flowering', prompt: 'Which idea is this? — Vernalisation is the process by which certain plants, particularly biennials and winter.', answer: 'Vernalisation Cold Treatment and Flowering', options: ['Vernalisation Cold Treatment and Flowering', 'Seed Dormancy and Germination'] },
            { id: 's2', label: 'Seed Dormancy and Germination', prompt: 'Which idea is this? — Seed dormancy is a physiological state in which a viable seed fails to germinate under.', answer: 'Seed Dormancy and Germination', options: ['Seed Dormancy and Germination', 'Vernalisation Cold Treatment and Flowering'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a science exhibit you soak dry moong seeds and they visibly double in size overnight. Your partner logs this as \'growth\' in the project notebook. Meanwhile a boiled (dead) seed placed in water also swells to the same size. The partner insists both are \'growing\'.',
            decisions: [{ prompt: 'Is the swelling growth?', options: [
                { text: 'No — swelling is imbibition, a reversible physical water uptake that even a dead seed shows. True growth is irreversible, metabolic, energy-dependent increase (cell division → elongation → maturation), starting only when the live seed\'s respiration and enzymes activate. Measure radicle length, not just diameter.', outcome: 'The live/dead pair is the perfect control: identical swelling in both proves the swelling itself isn\'t growth.' },
                { text: 'Both seeds are growing — any permanent-looking size increase counts as growth.', outcome: 'The dead seed can\'t grow — it has no metabolism; its swelling shows size increase alone doesn\'t imply growth. Also imbibition reverses on drying.', reveals: 'swelling-equals-growth' },
                { text: 'Only the live seed is growing — because its swelling is bigger.', outcome: 'Right conclusion, wrong reason: the distinction isn\'t amount but mechanism — metabolic, irreversible protoplasm increase versus passive water uptake.', reveals: 'bigger-swelling-is-growth' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_13_008', title: 'You made it',
          caseStudy: { intro: 'You can now tell a straight line from an S-curve and explain both: arithmetic when one daughter keeps dividing, geometric when everything divides.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_13_007', difficulty: 'standard',
          question: 'Vernalisation is the process by which certain plants, particularly biennials.',
          hint: 'Revisit c11_bio_cbse_13_006 and the phytochrome interconversion (Pr ↔ Pfr) mechanism.',
          misconception: 'Students think vernalisation *is* flowering — they say "cold makes the plant flower." The exact error: confusing the.',
          parts: [
                { id: 'a', prompt: 'A farmer plants winter wheat in late February instead of November. The plants grow vegetatively but do not flower before summer.', answer: 'Late February sowing provides insufficient cold duration for vernalisation',
                  options: ['Late February sowing provides insufficient cold duration for vernalisation', 'short days', 'high temperature', 'cold makes the plant flower'],
                  hint: 'Revisit c11_bio_cbse_13_006 and the phytochrome interconversion (Pr ↔ Pfr) mechanism; then review.',
                  misconception: 'Students think vernalisation *is* flowering — they say "cold makes the plant flower." The exact error: confusing the *competence.' },
                { id: 'b', prompt: 'In an experiment, winter wheat seedlings are vernalised at 4°C for 6 weeks, then returned to warm conditions.', answer: 'The long-day group will flower',
                  options: ['The long-day group will flower', 'cold makes the plant flower', 'vernalisation *is* flowering'],
                  hint: 'Revisit c11_bio_cbse_13_006 and the phytochrome interconversion (Pr ↔ Pfr) mechanism; then review.',
                  misconception: 'Students think vernalisation *is* flowering — they say "cold makes the plant flower." The exact error: confusing the *competence.' }
          ],
            remediations: { 'vernalisation-is-flowering-they-say': { steps: ['Revisit c11_bio_cbse_13_006 (Photoperiodism) and draw a two-box flowchart: Box 1 = Vernalisation (cold, meristem.', 'Use the wheat sowing calendar — November sowing → vernalisation in Dec–Jan → long days in March → flowering.', 'Contrast with spring wheat (no vernalisation needed) to see the genetic difference.', 'Explain to a peer why GA₃ spray on February-sown wheat fails.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_13_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think vernalisation *is* flowering — they say "cold makes the plant flower." The exact error: confusing the.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Gibberellic acid (GA₃) can fully substitute for vernalisation in all plants." Evaluate this statement with two specific counter-examples.', answer: 'The claim is false',
                  options: ['The claim is false', 'cold makes the plant flower', 'vernalisation *is* flowering'],
                  hint: 'Revisit c11_bio_cbse_13_006 and the phytochrome interconversion (Pr ↔ Pfr) mechanism; then review.',
                  misconception: 'Students think vernalisation *is* flowering — they say "cold makes the plant flower." The exact error: confusing the *competence.' },
                { id: 'b', prompt: 'Design a simple experiment using carrot (*Daucus carota*, a biennial) to demonstrate that vernalisation occurs at the shoot apical meristem, not in the roots.', answer: 'Grow carrot seedlings until storage root forms',
                  options: ['Grow carrot seedlings until storage root forms', 'cold makes the plant flower', 'vernalisation *is* flowering'],
                  hint: 'Revisit c11_bio_cbse_13_006 and the phytochrome interconversion (Pr ↔ Pfr) mechanism; then review.',
                  misconception: 'Students think vernalisation *is* flowering — they say "cold makes the plant flower." The exact error: confusing the *competence.' }
          ],
            remediations: { 'vernalisation-is-flowering-they-say': { steps: ['Revisit c11_bio_cbse_13_006 (Photoperiodism) and draw a two-box flowchart: Box 1 = Vernalisation (cold, meristem.', 'Use the wheat sowing calendar — November sowing → vernalisation in Dec–Jan → long days in March → flowering.', 'Contrast with spring wheat (no vernalisation needed) to see the genetic difference.', 'Explain to a peer why GA₃ spray on February-sown wheat fails.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_13_008', difficulty: 'standard',
          question: 'Seed dormancy is a physiological state in which a viable seed fails.',
          hint: 'If hormonal roles are unclear, revisit c11_bio_cbse_13_005 (ABA and Ethylene) and.',
          misconception: 'Students often think that "dormant seeds are dead or inactive." In reality, dormant seeds maintain low but measurable.',
          parts: [
                { id: 'a', prompt: 'A batch of apple seeds fails to germinate after being sown in moist soil at 25°C. The seed coats are permeable, and embryos are fully developed.', answer: 'The seeds exhibit physiological (endogenous) dormancy',
                  options: ['The seeds exhibit physiological (endogenous) dormancy', 'dormant seeds are dead or inactive', '"dormant seeds are dead or inactive'],
                  hint: 'If hormonal roles are unclear, revisit c11_bio_cbse_13_005 (ABA and Ethylene) and.',
                  misconception: 'Students often think that "dormant seeds are dead or inactive." In reality, dormant seeds maintain low but measurable respiration, actively.' }
          ],
            remediations: { 'dormant-seeds-are-dead-or': { steps: ['Soak two sets of rajma (kidney bean) seeds — one set intact, one set with a tiny nick in the seed coat — on moist.', 'Observe daily; the nicked seeds will imbibe water and germinate in 2–3 days while intact seeds remain hard.', 'Conclude that the intact seeds have a physical (exogenous) barrier, not metabolic death.', 'Then take the non-germinated intact seeds, soak them in 100 ppm GA₃ for 6 hours, and re-test; if they now germinate.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
