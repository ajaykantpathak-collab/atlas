import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch12_p2 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch12_p2: SimDef = {
    id: 'v3_c12_bio_ch12_p2',
    title: 'Biotechnology and Its Applications · Part 2/2',
    subtitle: 'The pesticide is inside the plant — how Bt cotton outsmarted the bollworm.',
    classLevel: 12, subject: 'biology', topic: 'Biotechnology and Its Applications · Part 2/2',
    chapters: ['c12_bio_ch12'],
    nodeIds: ['c12_bio_cbse_12_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Agricultural biotechnologist', intro: 'The best pesticide is one the plant makes itself — biotechnology turned that idea into India\'s cotton fields.', goal: 'Explain Bt cotton\'s Cry toxin mechanism and RNA interference for pest resistance.' },
    discovery: {
        question: 'A Maharashtra farmer stops spraying 15-20 times a season, yet his bolls survive the bollworm. What did Bt cotton change inside the plant?',
        options: ['The plant now produces a Cry toxin from Bacillus thuringiensis that kills larvae that eat it', 'The plant was coated permanently with a pesticide that never washes off', 'The cotton\'s taste changed so insects simply avoid it', 'The plant attracts predator insects that eat all the bollworms'],
        answer: 'The plant now produces a Cry toxin from Bacillus thuringiensis that kills larvae that eat it',
        hook: 'Bt cotton isn\'t sprayed — it\'s armed. The insecticide moved inside the plant\'s own cells, which is why the protection can\'t wash off and why only pests that bite the plant are harmed.',
    },
    teaching: [
        { title: 'Ethical Issues in Biotechnology', text: 'Ethical issues in biotechnology encompass the moral, legal, and social dilemmas arising from the manipulation of living organisms and biological systems, including genetic engineering of crops.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_12_007', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Engineer pest resistance two ways: trace how the Cry toxin protects Bt cotton, then design an RNAi crop that silences an essential gene inside any nematode that feeds on it.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_12_007', title: 'Ethical Issues in Biotechnology',
          caseStudy: { intro: 'Imagine a farmer in Vidarbha planting Bt cotton seeds — he gains pest resistance but faces debt from expensive seeds and potential resistance development.',
            decisions: [{ prompt: 'Define the term "substantial equivalence" in the context of GM food safety assessment and name the Indian regulatory body that uses this.', options: [
                { text: 'Substantial equivalence is the principle that a GM food is considered as safe as its', outcome: 'Substantial equivalence is the principle that a GM food is considered as safe as its conventional.' },
                { text: 'identical DNA', outcome: 'Not quite — Students often equate **biosafety** (preventing harm to health/environment via containment, risk.', reveals: 'students-often-equate-biosafety-preventing' },
                { text: 'gene therapy is banned in India', outcome: 'Not quite — Students often equate **biosafety** (preventing harm to health/environment via containment, risk.', reveals: 'students-often-equate-biosafety-preventing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_12_007', title: 'A real-world call',
          caseStudy: { intro: 'A genetically modified mosquito could collapse a malaria-carrying population. Release it and a disease that kills children could shrink. Release it and you can\'t call it back.',
            decisions: [{ prompt: 'Is irreversible prevention better than preventable deaths?', options: [
                { text: 'Release it — children are dying now', outcome: 'The urgent-compassion answer; the risk is ecological effects that only appear years after the decision.' },
                { text: 'Wait — \'can\'t be recalled\' demands certainty', outcome: 'The precautionary answer; each year of waiting is a year of deaths that certainty didn\'t prevent.' },
                { text: 'Release it in stages — contained first, wild only after data', outcome: 'The staged answer — slower, but \'irreversible\' isn\'t a reason to skip the reversible steps.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A farmer switching to Bt cotton hears two rumours at the mandi: \'the plant\'s own poison kills every insect including the bees\' and \'once you plant Bt you never spray again\'. He asks the agri-science student what\'s actually true.',
            decisions: [{ prompt: 'How does Bt toxin really behave?', options: [
                { text: 'It\'s narrowly specific: the Cry protoxin activates only in the alkaline gut of lepidopteran larvae and binds receptors bees and humans lack — but sucking pests like aphids and whitefly escape, so spraying for them continues.', outcome: 'Bt cotton cuts bollworm sprays drastically without harming pollinators — yet it\'s not broad-spectrum, so integrated pest management still applies.' },
                { text: 'First rumour is right — a plant that makes insecticide poisons every insect that touches it, including bees and ladybirds.', outcome: 'Bees lack the alkaline midgut and cadherin receptors the protoxin needs; field studies show pollinator and predator populations unharmed.', reveals: 'bt-kills-all-insects' },
                { text: 'Second rumour is right — the plant produces its own insecticide, so all pesticide use ends.', outcome: 'Cry proteins hit only caterpillars; aphids, jassids and whiteflies still attack the crop and must be managed separately.', reveals: 'bt-is-broad-spectrum' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_12_007', title: 'You made it',
          caseStudy: { intro: 'You\'ve now engineered immunity into a plant — conceptually at least. Bt cotton and RNAi are board favourites and the flagship proof that biotechnology can feed and protect crops.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_12_007', difficulty: 'standard',
          question: 'Ethical issues in biotechnology encompass the moral, legal, and social dilemmas.',
          hint: 'If stuck, revisit c11_biotech_cbse_01_010 (Biosafety regulations) and create a one-page.',
          misconception: 'Students often equate **biosafety** (preventing harm to health/environment via containment, risk assessment) with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Ethical issues in biotechnology encompass the moral, legal, and social dilemmas arising',
                  options: ['Ethical issues in biotechnology encompass the moral, legal, and social dilemmas arising', 'Bt cotton is a genetically modified crop created by introducing cry genes from the', 'RNA interference (RNAi) is a conserved eukaryotic gene-silencing mechanism where', 'Gene therapy for SCID (Severe Combined Immunodeficiency) is a medical intervention that'],
                  hint: 'If stuck, revisit c11_biotech_cbse_01_010 (Biosafety regulations) and create a one-page flowchart.',
                  misconception: 'Students often equate **biosafety** (preventing harm to health/environment via containment, risk assessment) with **bioethics** (moral.' }
          ],
            remediations: { 'students-often-equate-biosafety-preventing': { steps: ['If the student cannot distinguish biosafety vs.', 'bioethics, or misidentifies regulatory bodies: 1.', 'Revisit **c11_biotech_cbse_01_009** (Ethical Issues in Biotechnology: Bioethics) for definitions of bioethics.', 'Revisit **c11_biotech_cbse_01_010** (Biosafety: Regulations and Guidelines) for the hierarchy: IBSC → RCGM → GEAC →.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_12_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate **biosafety** (preventing harm to health/environment via containment, risk assessment) with.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The GEAC\'s approval of Bt brinjal in 2009 was scientifically sound but ethically flawed because it ignored socio-economic impacts.', answer: '**Scientifically sound**: GEAC relied on substantial equivalence (nutritional',
                  options: ['**Scientifically sound**: GEAC relied on substantial equivalence (nutritional', 'GEAC only does science, ethics is not their job', 'ethical, social, and economic considerations', 'gene therapy is banned in India'],
                  hint: 'If stuck, revisit c11_biotech_cbse_01_010 (Biosafety regulations) and create a one-page flowchart.',
                  misconception: 'Students often equate **biosafety** (preventing harm to health/environment via containment, risk assessment) with **bioethics** (moral.' }
          ],
            remediations: { 'students-often-equate-biosafety-preventing': { steps: ['If the student cannot distinguish biosafety vs.', 'bioethics, or misidentifies regulatory bodies: 1.', 'Revisit **c11_biotech_cbse_01_009** (Ethical Issues in Biotechnology: Bioethics) for definitions of bioethics.', 'Revisit **c11_biotech_cbse_01_010** (Biosafety: Regulations and Guidelines) for the hierarchy: IBSC → RCGM → GEAC →.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
