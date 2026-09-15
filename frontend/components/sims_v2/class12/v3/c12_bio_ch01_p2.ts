import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch01_p2 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch01_p2: SimDef = {
    id: 'v3_c12_bio_ch01_p2',
    title: 'Reproduction in Organisms · Part 2/2',
    subtitle: 'A potato eye and a mango flower perform the same miracle by opposite logic.',
    classLevel: 12, subject: 'biology', topic: 'Reproduction in Organisms · Part 2/2',
    chapters: ['c12_bio_ch01'],
    nodeIds: ['c12_bio_cbse_01_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Field biologist cataloguing reproduction strategies', intro: 'Life has exactly two ways to copy itself — and the difference decides whether a species survives change.', goal: 'Distinguish asexual from sexual reproduction by mechanism and evaluate the significance of each.' },
    discovery: {
        question: 'A potato sprouts a new plant from an \'eye\' while a mango needs flowers, pollen and seeds. What single feature truly separates these two modes of reproduction?',
        options: ['Whether gametes fuse — the potato clones itself through mitosis; the mango requires fertilisation between gametes', 'Whether a seed forms — everything producing seeds is sexual, everything else asexual', 'Whether two parents exist — sexual reproduction always needs two separate individuals', 'Whether the offspring looks different — identical offspring always mean asexual reproduction'],
        answer: 'Whether gametes fuse — the potato clones itself through mitosis; the mango requires fertilisation between gametes',
        hook: 'Students count parents or look for seeds — the real boundary is gamete fusion, which is why a single organism can still reproduce sexually and identical-looking offspring can come from either mode.',
    },
    teaching: [
        { title: 'Post-fertilization Events: Embryogenesis', text: 'Post-fertilization events encompass the sequential developmental processes initiated after double fertilization in angiosperms, including endosperm formation from the triploid primary endosperm.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_01_007', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Sort a field of organisms — Amoeba, yeast in idli batter, Spirogyra, flowering plants — into their reproductive modes, then defend why variation matters more than speed for a species\' future.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_01_007', title: 'Post-fertilization Events: Embryogenesis',
          caseStudy: { intro: 'When you slice open a tender coconut, the refreshing water you drink is actually free-nuclear endosperm — thousands of nuclei floating in cytoplasm before cell.',
            decisions: [{ prompt: 'Name the two products of double fertilization in angiosperms and state the ploidy of each nucleus involved in their formation.', options: [
                { text: 'The two products are: (1) diploid zygote (2n) formed by syngamy', outcome: 'The two products are: (1) diploid zygote (2n) formed by syngamy — fusion of one male gamete (n).' },
                { text: 'zygote is triploid', outcome: 'Not quite — Students believe the zygote divides immediately after fertilization to form the embryo, and that.', reveals: 'the-zygote-divides-immediately-after' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A banana grower\'s entire plantation — all raised from suckers of one parent plant — gets wiped out by a new fungus, while a nearby patch grown from seeds shows mixed survival. He asks the agri-student intern why his field had zero resistant plants.',
            decisions: [{ prompt: 'What explains the wipe-out?', options: [
                { text: 'Suckers are asexual clones — genetically identical, so no variation in resistance existed; the seed-grown patch came through meiosis and fertilisation, so some plants carried resistance combinations.', outcome: 'Clonal propagation is fast and uniform, but uniformity means one pathogen can fell the whole field; variation is the insurance sexual reproduction buys.' },
                { text: 'The fungus was simply too strong — the mode of reproduction makes no difference to whether plants resist disease.', outcome: 'Resistance is genetic; with identical genomes every plant shares the same susceptibility, so reproduction mode is exactly what decided the outcome.', reveals: 'reproduction-mode-irrelevant' },
                { text: 'Asexual reproduction is a primitive, failed strategy — the farmer should never have used suckers at all.', outcome: 'In stable conditions cloning is cheap and rapid — it\'s the standard for uniform crops; the real cost is losing variation for new threats, not that the mode is \'primitive\'.', reveals: 'asexual-always-inferior' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_01_007', title: 'You made it',
          caseStudy: { intro: 'You can now classify any reproduction you meet by its mechanism, not its looks. Asexual vs sexual anchoring is core board content — and the opening question of all evolutionary biology.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_01_007', difficulty: 'standard',
          question: 'Post-fertilization events encompass the sequential developmental processes.',
          hint: 'Revisit c12_bio_cbse_01_006 — specifically the double fertilization event: one male.',
          misconception: 'Students believe the zygote divides immediately after fertilization to form the embryo, and that endosperm and embryo.',
          parts: [
                { id: 'a', prompt: 'Name the two products of double fertilization in angiosperms and state the ploidy of each nucleus involved in their formation.', answer: 'The two products are: (1) diploid zygote (2n) formed by syngamy',
                  options: ['The two products are: (1) diploid zygote (2n) formed by syngamy', 'zygote is triploid'],
                  hint: 'Revisit c12_bio_cbse_01_006 — specifically the double fertilization event: one male gamete + egg.',
                  misconception: 'Students believe the zygote divides immediately after fertilization to form the embryo, and that endosperm and embryo develop.' },
                { id: 'b', prompt: 'Why does endosperm development always precede embryo development in angiosperms? Explain the adaptive significance using the concept of resource allocation.', answer: 'Endosperm develops first',
                  options: ['Endosperm develops first', 'zygote divides first', 'they develop simultaneously'],
                  hint: 'Revisit c12_bio_cbse_01_006 — specifically the double fertilization event: one male gamete + egg.',
                  misconception: 'Students believe the zygote divides immediately after fertilization to form the embryo, and that endosperm and embryo develop.' },
                { id: 'c', prompt: 'A student observes a coconut seed and notes: "The coconut water is liquid endosperm and the white kernel is solid endosperm." Is this correct?', answer: 'Yes, correct',
                  options: ['Yes, correct', 'cellular endosperm'],
                  hint: 'Revisit c12_bio_cbse_01_006 — specifically the double fertilization event: one male gamete + egg.',
                  misconception: 'Students believe the zygote divides immediately after fertilization to form the embryo, and that endosperm and embryo develop.' }
          ],
            remediations: { 'the-zygote-divides-immediately-after': { steps: ['Revisit c12_bio_cbse_01_006 (Fertilization) to re-confirm double fertilization products — draw the embryo sac labeling.', 'Use c11_bio_cbse_05_008 (Seed Structure) to physically dissect soaked pea, castor, and maize seeds — identify endosperm.', 'Create a timeline diagram: fertilization → PEN divisions (free-nuclear) → cellularization → zygote division → proembryo.', 'Re-attempt Diagnostic Q2 and Q3 — if still incorrect, watch a time-lapse video of Arabidopsis embryogenesis (available.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the zygote divides immediately after fertilization to form the embryo, and that endosperm and embryo.',
          parts: [
                { id: 'a', prompt: 'In a plant breeding program, F1 hybrid seeds must be produced annually because progeny segregate. How does apomixis solve this problem?', answer: 'Apomixis bypasses meiosis and fertilization',
                  options: ['Apomixis bypasses meiosis and fertilization', 'apomixis involves meiosis', 'heterosis is lost'],
                  hint: 'Revisit c12_bio_cbse_01_006 — specifically the double fertilization event: one male gamete + egg.',
                  misconception: 'Students believe the zygote divides immediately after fertilization to form the embryo, and that endosperm and embryo develop.' }
          ],
            remediations: { 'the-zygote-divides-immediately-after': { steps: ['Revisit c12_bio_cbse_01_006 (Fertilization) to re-confirm double fertilization products — draw the embryo sac labeling.', 'Use c11_bio_cbse_05_008 (Seed Structure) to physically dissect soaked pea, castor, and maize seeds — identify endosperm.', 'Create a timeline diagram: fertilization → PEN divisions (free-nuclear) → cellularization → zygote division → proembryo.', 'Re-attempt Diagnostic Q2 and Q3 — if still incorrect, watch a time-lapse video of Arabidopsis embryogenesis (available.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
