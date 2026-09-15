import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch07_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch07_p2: SimDef = {
    id: 'v3_c12_bio_ch07_p2',
    title: 'Evolution · Part 2/2',
    subtitle: 'A spark in a flask, a farm of finches — two experiments that explain all of life.',
    classLevel: 12, subject: 'biology', topic: 'Evolution · Part 2/2',
    chapters: ['c12_bio_ch07'],
    nodeIds: ['c12_bio_cbse_07_007', 'c12_bio_cbse_07_008', 'c12_bio_cbse_07_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Evolutionary biologist reconstructing origins', intro: 'Where life came from and how it changes are different questions — great scientists keep them separate.', goal: 'Explain the Oparin-Haldane/Miller-Urey chemical evolution model and Darwinian natural selection.' },
    discovery: {
        question: 'Giraffes have long necks — Lamarck said they stretched, Darwin said something else. What?',
        options: ['Long-necked giraffes survived and reproduced more', 'Necks grew longer each generation through use', 'Mutation pushed every giraffe\'s neck longer', 'Trees grew taller so giraffes adapted'],
        answer: 'Long-necked giraffes survived and reproduced more',
        hook: 'Evolution does not try — it selects. That one word changes how you read this entire chapter.',
    },
    teaching: [
        { title: 'Speciation: Allopatric and Sympatric', text: 'Speciation is the evolutionary process by which populations of a single species diverge into two or more distinct species that are reproductively isolated from each other.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_07_007', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Reconstruct the origin-of-life argument stepwise — reducing atmosphere, energy sources, organic monomers, protocells — then connect it to Darwin\'s natural selection using the antibiotic-resistance plate as your model.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_07_007', title: 'Speciation: Allopatric and Sympatric',
          caseStudy: { intro: 'Imagine you see two groups of similar-looking birds on opposite sides of a newly formed canyon in the Western Ghats — they cannot fly across.',
            decisions: [{ prompt: 'Define allopatric speciation and name the initial isolating mechanism.', options: [
                { text: 'Allopatric speciation is the formation of new species from populations that are', outcome: 'Allopatric speciation is the formation of new species from populations that are geographically.' },
                { text: 'speciation due to polyploidy', outcome: 'Not quite — Students often think that geographic isolation alone instantly creates a new species.', reveals: 'geographic-isolation-alone-instantly-creates' },
                { text: 'geographic isolation alone instantly creates a new species', outcome: 'Not quite — Students often think that geographic isolation alone instantly creates a new species.', reveals: 'geographic-isolation-alone-instantly-creates' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_07_008', title: 'Adaptive Radiation: Darwin\'s Finches',
          caseStudy: { intro: 'Start by showing a picture of the Galápagos Islands and ask: "Why do finches on different islands have such different beaks?" Connect to prior knowledge.',
            decisions: [{ prompt: 'What is adaptive radiation, and how does it differ from convergent evolution?', options: [
                { text: 'Adaptive radiation is the diversification of a single ancestral lineage into multiple', outcome: 'Adaptive radiation is the diversification of a single ancestral lineage into multiple species, each.' },
                { text: 'adaptive radiation produces similar traits', outcome: 'Not quite — Students often think adaptive radiation happens because organisms "try" to adapt to new niches.', reveals: 'adaptive-radiation-happens-because-organisms' },
                { text: 'confuses the two (e', outcome: 'Not quite — Students often think adaptive radiation happens because organisms "try" to adapt to new niches.', reveals: 'adaptive-radiation-happens-because-organisms' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_07_009', title: 'Human Evolution: Hominid Lineage',
          caseStudy: { intro: 'Begin by asking the student to observe their own hand — the precision grip enabled by a fully opposable thumb and the ability to walk upright on two legs.',
            decisions: [{ prompt: 'Name the earliest hominid genus in the human lineage that shows clear evidence of habitual bipedalism, and state the approximate geological.', options: [
                { text: 'The earliest hominid genus with clear habitual bipedalism is Australopithecus (e.g., A', outcome: 'The earliest hominid genus with clear habitual bipedalism is Australopithecus (e.g., A.' },
                { text: 'Homo habilis', outcome: 'Not quite — Students often believe human evolution followed a straight line: Dryopithecus → Ramapithecus →.', reveals: 'human-evolution-followed-a-straight' },
                { text: 'Dryopithecus', outcome: 'Not quite — Students often believe human evolution followed a straight line: Dryopithecus → Ramapithecus →.', reveals: 'human-evolution-followed-a-straight' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_07_008', title: 'Identify each idea',
          dissect: { specimen: 'Evolution · Part 2/2', spots: [
            { id: 's1', label: 'Speciation Allopatric and Sympatric', prompt: 'Which idea is this? — Speciation is the evolutionary process by which populations of a single species diverge.', answer: 'Speciation Allopatric and Sympatric', options: ['Speciation Allopatric and Sympatric', 'Adaptive Radiation Darwins Finches', 'Human Evolution Hominid Lineage'] },
            { id: 's2', label: 'Adaptive Radiation Darwins Finches', prompt: 'Which idea is this? — Adaptive radiation is the process by which a single ancestral species rapidly diversifies.', answer: 'Adaptive Radiation Darwins Finches', options: ['Adaptive Radiation Darwins Finches', 'Speciation Allopatric and Sympatric', 'Human Evolution Hominid Lineage'] },
            { id: 's3', label: 'Human Evolution Hominid Lineage', prompt: 'Which idea is this? — Human evolution refers to the evolutionary process leading to the emergence.', answer: 'Human Evolution Hominid Lineage', options: ['Human Evolution Hominid Lineage', 'Speciation Allopatric and Sympatric', 'Adaptive Radiation Darwins Finches'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student\'s origin-of-life project ends with the claim: \'Miller and Urey proved life began exactly as Oparin and Haldane described — lightning in a pond made the first cell.\'',
            decisions: [{ prompt: 'What did the 1953 spark experiment actually establish?', options: [
                { text: 'Only stage two — that inorganic gases (CH₄, NH₃, H₂, H₂O) under sparking can abiotically yield amino acids; polymerisation into macromolecules and bounded protocells remained undemonstrated.', outcome: 'Chemical evolution is multi-stage: showing monomers can form isn\'t showing a living cell arose — the claim overgeneralises partial evidence.' },
                { text: 'The claim stands — amino acids appeared, so the whole pathway to the first cell is proven.', outcome: 'Finding bricks isn\'t building the house: stages 3 and 4 (polymers, protocells with metabolism and heredity) were never part of that apparatus.', reveals: 'miller-urey-proved-everything' },
                { text: 'It failed anyway — without free oxygen in the gas mix, no organic molecules could form.', outcome: 'Backwards: the reducing, oxygen-free atmosphere was essential — free O₂ would have oxidised and destroyed nascent organics.', reveals: 'oxygen-needed-for-organics' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_07_009', title: 'You made it',
          caseStudy: { intro: 'Variation, selection, drift, speciation — you now hold the framework that explains all of biology.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_007', difficulty: 'standard',
          question: 'Speciation is the evolutionary process by which populations of a single species.',
          hint: 'If stuck, review c12_bio_cbse_07_006 (Microevolution) for how allele frequencies change.',
          misconception: 'Students often think that geographic isolation alone instantly creates a new species.',
          parts: [
                { id: 'a', prompt: 'Define allopatric speciation and name the initial isolating mechanism.', answer: 'Allopatric speciation is the formation of new species from populations that are',
                  options: ['Allopatric speciation is the formation of new species from populations that are', 'speciation due to polyploidy', 'geographic isolation alone instantly creates a new species'],
                  hint: 'If stuck, review c12_bio_cbse_07_006 (Microevolution) for how allele frequencies change in isolated.',
                  misconception: 'Students often think that geographic isolation alone instantly creates a new species.' },
                { id: 'b', prompt: 'Explain why polyploidy leads to instant reproductive isolation in plants but rarely in animals.', answer: 'Polyploidy creates immediate postzygotic isolation',
                  options: ['Polyploidy creates immediate postzygotic isolation', 'animals don\'t have chromosomes', 'geographic isolation alone instantly creates a new species'],
                  hint: 'If stuck, review c12_bio_cbse_07_006 (Microevolution) for how allele frequencies change in isolated.',
                  misconception: 'Students often think that geographic isolation alone instantly creates a new species.' },
                { id: 'c', prompt: 'A population of frogs is split by a newly formed highway. After 50 generations, the two groups are brought together in a lab and produce viable but sterile.', answer: 'This is allopatric speciation (geographic isolation by the highway)',
                  options: ['This is allopatric speciation (geographic isolation by the highway)', 'sympatric speciation with prezygotic barrier', 'geographic isolation alone instantly creates a new species'],
                  hint: 'If stuck, review c12_bio_cbse_07_006 (Microevolution) for how allele frequencies change in isolated.',
                  misconception: 'Students often think that geographic isolation alone instantly creates a new species.' }
          ],
            remediations: { 'geographic-isolation-alone-instantly-creates': { steps: ['If the student holds this misconception, have them revisit c12_bio_cbse_07_006 (Microevolution: Change in Allele.', 'Then do a stepwise exercise: (1) Draw a timeline showing barrier formation → zero gene flow → mutation/selection/drift.', '(2) Identify at which point the biological species concept would recognize two species.', '(3) Use the "ring species" example (e.g., Ensatina salamanders) to show that geographic separation alone does not.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that geographic isolation alone instantly creates a new species.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Sympatric speciation is impossible because gene flow always homogenizes populations in the same area."', answer: 'The statement is false',
                  options: ['The statement is false', 'allopatry-only', 'geographic isolation alone instantly creates a new species'],
                  hint: 'If stuck, review c12_bio_cbse_07_006 (Microevolution) for how allele frequencies change in isolated.',
                  misconception: 'Students often think that geographic isolation alone instantly creates a new species.' }
          ],
            remediations: { 'geographic-isolation-alone-instantly-creates': { steps: ['If the student holds this misconception, have them revisit c12_bio_cbse_07_006 (Microevolution: Change in Allele.', 'Then do a stepwise exercise: (1) Draw a timeline showing barrier formation → zero gene flow → mutation/selection/drift.', '(2) Identify at which point the biological species concept would recognize two species.', '(3) Use the "ring species" example (e.g., Ensatina salamanders) to show that geographic separation alone does not.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_008', difficulty: 'standard',
          question: 'Adaptive radiation is the process by which a single ancestral species rapidly.',
          hint: 'If stuck, review c12_bio_cbse_07_002 (Darwin\'s postulates) and c12_bio_cbse_07_007.',
          misconception: 'Students often think adaptive radiation happens because organisms "try" to adapt to new niches (Lamarckian view).',
          parts: [
                { id: 'a', prompt: 'A new island forms volcanically near the Galápagos. A few finches from an existing island colonize it.', answer: 'Initially, variation in beak size exists',
                  options: ['Initially, variation in beak size exists', 'predicts only one beak type (e'],
                  hint: 'If stuck, review c12_bio_cbse_07_002 (Darwin\'s postulates) and c12_bio_cbse_07_007 (speciation.',
                  misconception: 'Students often think adaptive radiation happens because organisms "try" to adapt to new niches (Lamarckian view).' }
          ],
            remediations: { 'adaptive-radiation-happens-because-organisms': { steps: ['If the student holds the Lamarckian misconception, have them revisit c12_bio_cbse_07_002 (Darwin\'s postulates) and.', 'Then conduct a thought experiment: "If a finch stretches its beak to reach insects, will its offspring inherit a longer.', 'Re-diagnose with DIAGNOSTIC_QUESTION_2.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_009', difficulty: 'standard',
          question: 'Human evolution refers to the evolutionary process leading to the emergence.',
          hint: 'If stuck, review the definition of hominid vs. hominoid (c11_bio_cbse_04_013) and the.',
          misconception: 'Students often believe human evolution followed a straight line: Dryopithecus → Ramapithecus → Australopithecus → Homo.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Human evolution refers to the evolutionary process leading to the emergence of',
                  options: ['Human evolution refers to the evolutionary process leading to the emergence of', 'The Oparin-Haldane theory proposes that life originated on early Earth through a gradual', 'Darwin\'s theory of natural selection proposes that evolution occurs through the', 'Evidences for evolution from paleontology and anatomy demonstrate that present-day'],
                  hint: 'If stuck, review the definition of hominid vs. hominoid (c11_bio_cbse_04_013) and the principles.',
                  misconception: 'Students often believe human evolution followed a straight line: Dryopithecus → Ramapithecus → Australopithecus → Homo habilis → Homo.' }
          ],
            remediations: { 'human-evolution-followed-a-straight': { steps: ['If the student cannot distinguish between linear and branching patterns, have them revisit c10_bio_cbse_04_010.', 'Then, using a set of hominid fossil cards with dates and locations, ask them to place each on a timeline and map.', 'Next, guide them to draw a phylogenetic tree showing branching points (e.g., Paranthropus side branch.', 'Finally, give a re-diagnostic: "Given that Homo erectus fossils in Java are dated to 1.8 Ma and in Dmanisi to 1.8.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
