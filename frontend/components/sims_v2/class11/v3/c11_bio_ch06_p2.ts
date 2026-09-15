import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch06_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch06_p2: SimDef = {
    id: 'v3_c11_bio_ch06_p2',
    title: 'Anatomy of Flowering Plants · Part 2/2',
    subtitle: 'Track where plants keep their dividing cells — and why location decides how they grow.',
    classLevel: 11, subject: 'biology', topic: 'Anatomy of Flowering Plants · Part 2/2',
    chapters: ['c11_bio_ch06'],
    nodeIds: ['c11_bio_cbse_06_007', 'c11_bio_cbse_06_008', 'c11_bio_cbse_06_009', 'c11_bio_cbse_06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a plant anatomist explaining growth patterns to a plantation manager', intro: 'Why does one stem thicken for fifty years while a grass blade survives a goat? The answer is three kinds of meristem in three different places.', goal: 'Distinguish meristematic from permanent tissue, locate apical, lateral, and intercalary meristems, and connect each to a growth pattern.' },
    discovery: {
        question: 'Mow a lawn to the roots and it regrows in days; prune a mango\'s tip and that branch stops elongating. Same kingdom, opposite outcomes. Where does grass hide the meristem that the mango keeps exposed?',
        options: ['At the base of each internode — intercalary meristems sit below grazing height and keep dividing', 'In the roots — grass regrows entirely from underground buds', 'In the leaf tip — grass leaves grow from their ends', 'Inside the seed — every cut triggers new germination'],
        answer: 'At the base of each internode — intercalary meristems sit below grazing height and keep dividing',
        hook: 'Growth isn\'t located \'at the tips\' everywhere — position of the meristem dictates whether a plant survives being cut.',
    },
    teaching: [
        { title: 'Secondary Growth in Dicot Stem', text: 'Secondary growth in dicot stem is the increase in girth (diameter) due to the activity of two lateral meristems: the vascular cambium, which produces secondary xylem (wood) toward the inside and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_06_007', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Identify which meristem — apical, lateral, or intercalary — explains a thickening mango trunk, a regrowing lawn, and an elongating shoot tip, then separate the permanent tissues they produce.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_06_007', title: 'Secondary Growth in Dicot Stem',
          caseStudy: { intro: 'Observe the trunk of a neem or mango tree in your school courtyard — its rough, thick bark and massive girth are not present in the seedling.',
            decisions: [{ prompt: 'Define "fascicular cambium" and "interfascicular cambium" and state their precise locations in a young dicot stem before the vascular.', options: [
                { text: 'Fascicular cambium (intrafascicular cambium) is the strip of primary meristematic cells', outcome: 'Fascicular cambium (intrafascicular cambium) is the strip of primary meristematic cells located.' },
                { text: 'inside the xylem', outcome: 'Not quite — **Misconception:** "The vascular cambium is a single layer of cells that divides only once per year.', reveals: 'misconception-the-vascular-cambium-is' },
                { text: 'outside the phloem', outcome: 'Not quite — **Misconception:** "The vascular cambium is a single layer of cells that divides only once per year.', reveals: 'misconception-the-vascular-cambium-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_06_008', title: 'Secondary Growth in Dicot Root',
          caseStudy: { intro: 'Pull a carrot or radish from your kitchen — the thick, fleshy taproot you hold is a direct result of secondary growth.',
            decisions: [{ prompt: 'Name the two tissues in a primary dicot root that give rise to the vascular cambium during secondary growth.', options: [
                { text: 'The vascular cambium originates from **conjunctive tissue** (parenchyma between xylem and', outcome: 'The vascular cambium originates from **conjunctive tissue** (parenchyma between xylem and phloem.' },
                { text: 'intrafascicular cambium', outcome: 'Not quite — Students often believe that **vascular cambium in roots arises solely from the pericycle**.', reveals: 'vascular-cambium-in-roots-arises' },
                { text: 'medullary rays', outcome: 'Not quite — Students often believe that **vascular cambium in roots arises solely from the pericycle**.', reveals: 'vascular-cambium-in-roots-arises' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_06_009', title: 'Anomalous Secondary Growth',
          caseStudy: { intro: 'Observe a transverse section of an old *Bignonia* stem (a common ornamental climber in Indian gardens) under a microscope.',
            decisions: [{ prompt: 'Define anomalous secondary growth and give one example where it occurs due to the formation of accessory cambia.', options: [
                { text: 'Anomalous secondary growth is any deviation from the normal pattern of secondary growth', outcome: 'Anomalous secondary growth is any deviation from the normal pattern of secondary growth involving.' },
                { text: 'abnormal growth due to disease', outcome: 'Not quite — Students often think "anomalous" means "abnormal due to disease or injury" and that the plant.', reveals: 'anomalous-means-abnormal-due-to' },
                { text: 'anomalous', outcome: 'Not quite — Students often think "anomalous" means "abnormal due to disease or injury" and that the plant.', reveals: 'anomalous-means-abnormal-due-to' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_06_010', title: 'Commercial Importance of Secondary Growth',
          caseStudy: { intro: 'Look at a wooden desk, a cork notice board, and a bottle stopper — all come from the same biological process: secondary growth in dicot trees.',
            decisions: [{ prompt: 'Name the two lateral meristems responsible for secondary growth in dicot stems and state the main commercial product derived from each.', options: [
                { text: 'Vascular cambium produces secondary xylem (wood/timber) and secondary phloem (bast', outcome: 'Vascular cambium produces secondary xylem (wood/timber) and secondary phloem (bast fibers, resins).' },
                { text: 'apical meristem produces wood', outcome: 'Not quite — Students believe "all wood is secondary xylem" and that "monocots like bamboo and palm produce true.', reveals: 'all-wood-is-secondary-xylem' },
                { text: 'all wood is secondary xylem', outcome: 'Not quite — Students believe "all wood is secondary xylem" and that "monocots like bamboo and palm produce true.', reveals: 'all-wood-is-secondary-xylem' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_06_008', title: 'Identify each idea',
          dissect: { specimen: 'Anatomy of Flowering Plants · Part 2/2', spots: [
            { id: 's1', label: 'Secondary Growth in Dicot Stem', prompt: 'Which idea is this? — Secondary growth in dicot stem is the increase in girth (diameter) due to the activity.', answer: 'Secondary Growth in Dicot Stem', options: ['Secondary Growth in Dicot Stem', 'Secondary Growth in Dicot Root', 'Anomalous Secondary Growth', 'Commercial Importance of Secondary Growth'] },
            { id: 's2', label: 'Secondary Growth in Dicot Root', prompt: 'Which idea is this? — Secondary growth in dicot root is the increase in girth (diameter) resulting from the.', answer: 'Secondary Growth in Dicot Root', options: ['Secondary Growth in Dicot Root', 'Secondary Growth in Dicot Stem', 'Anomalous Secondary Growth', 'Commercial Importance of Secondary Growth'] },
            { id: 's3', label: 'Anomalous Secondary Growth', prompt: 'Which idea is this? — Anomalous secondary growth refers to any deviation from the typical pattern of secondary.', answer: 'Anomalous Secondary Growth', options: ['Anomalous Secondary Growth', 'Secondary Growth in Dicot Stem', 'Secondary Growth in Dicot Root', 'Commercial Importance of Secondary Growth'] },
            { id: 's4', label: 'Commercial Importance of Secondary Growth', prompt: 'Which idea is this? — Commercial importance of secondary growth refers to the economic value derived from.', answer: 'Commercial Importance of Secondary Growth', options: ['Commercial Importance of Secondary Growth', 'Secondary Growth in Dicot Stem', 'Secondary Growth in Dicot Root', 'Anomalous Secondary Growth'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'The school gardener poses two puzzles to your biology group: \'My lawn gets mowed every week and regrows in days, but your desk-mate\'s rose bush, if cut to the ground, dies. Meanwhile my mango trunk gets fatter every year though no new tip forms.\' A junior answers: \'Growth only happens at root and shoot tips — the grass must be growing from its tips that survived mowing.\'',
            decisions: [{ prompt: 'Which meristems explain the lawn and the mango trunk?', options: [
                { text: 'Lawn: intercalary meristems at the base of grass nodes keep dividing after the blade tips are cut — regrowth comes from the base, not the tip. Mango trunk: the lateral meristem (vascular cambium) adds secondary xylem and phloem each year, thickening the stem without any new tip.', outcome: 'Meristems aren\'t only apical — intercalary (nodes) and lateral (cambium) divisions explain regrowth-after-mowing and trunk thickening.' },
                { text: 'The junior is right — all plant growth is apical, so the grass tip must have survived under the soil.', outcome: 'If growth were purely apical, mown grass and a girdled trunk couldn\'t grow; intercalary and lateral meristems exist precisely where apical growth can\'t help.', reveals: 'meristems-only-at-tips' },
                { text: 'The mango thickens because old cells keep dividing forever — permanent tissue can always revert to dividing.', outcome: 'Permanent tissues have lost division capacity; thickening comes from the vascular cambium, a dedicated lateral meristem — not from tired old cells reactivating.', reveals: 'permanent-tissue-redivides' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_06_010', title: 'You made it',
          caseStudy: { intro: 'You can now read a plant\'s body plan as a map of where division still happens — meristems are the living engine, permanent tissues the finished product.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_007', difficulty: 'standard',
          question: 'Secondary growth in dicot stem is the increase in girth (diameter) due to the.',
          hint: 'If stuck, revisit **c11_bio_cbse_06_005 (Anatomy of Dicot and Monocot Stems)**.',
          misconception: '**Misconception:** "The vascular cambium is a single layer of cells that divides only once per year to produce one.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary growth in dicot stem is the increase in girth (diameter) due to the activity of',
                  options: ['Secondary growth in dicot stem is the increase in girth (diameter) due to the activity of', 'Plant tissues are groups of structurally and functionally similar cells that originate', 'Simple permanent tissues are groups of structurally and functionally similar cells that', 'Complex tissues are heterogeneous tissues composed of more than one type of cell that'],
                  hint: 'If stuck, revisit **c11_bio_cbse_06_005 (Anatomy of Dicot and Monocot Stems)** to re-learn the.',
                  misconception: '**Misconception:** "The vascular cambium is a single layer of cells that divides only once per year to produce one layer of xylem and one.' }
          ],
            remediations: { 'misconception-the-vascular-cambium-is': { steps: ['** Use a permanent slide of T.S. *Helianthus* stem showing vascular cambium zone (not just a line).', '** Show a time-lapse animation (or diagram sequence) of a single fusiform initial dividing periclinally 5 times.', '** Give a numerical problem: "If a fusiform initial divides periclinally every 3 days for 60 days (spring), how many.', '** Have student draw a labeled diagram of the cambial zone showing: fusiform initial, ray initial, recent xylem.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_008', difficulty: 'standard',
          question: 'Secondary growth in dicot root is the increase in girth (diameter) resulting.',
          hint: 'Review node c11_bio_cbse_06_004, focusing on the region between xylem and phloem.',
          misconception: 'Students often believe that **vascular cambium in roots arises solely from the pericycle** (analogous.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary growth in dicot root is the increase in girth (diameter) resulting from the',
                  options: ['Secondary growth in dicot root is the increase in girth (diameter) resulting from the', 'Plant tissues are groups of structurally and functionally similar cells that originate', 'Simple permanent tissues are groups of structurally and functionally similar cells that', 'Complex tissues are heterogeneous tissues composed of more than one type of cell that'],
                  hint: 'Review node c11_bio_cbse_06_004, focusing on the region between xylem and phloem (conjunctive.',
                  misconception: 'Students often believe that **vascular cambium in roots arises solely from the pericycle** (analogous to interfascicular cambium in stems).' }
          ],
            remediations: { 'vascular-cambium-in-roots-arises': { steps: ['Revisit **c11_bio_cbse_06_004** (primary dicot root T.S.) and physically point to the **conjunctive tissue** (between.', 'Draw a 4-step cartoon: (a) Primary root → (b) Conjunctive tissue cells divide → (c) Pericycle cells opposite phloem.', 'Contrast with stem: list "Root: conjunctive tissue + pericycle" vs "Stem: intrafascicular + interfascicular" on.', 'Practice labelling the **pericycle** as the origin of cork cambium in three different root diagrams until automatic.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_009', difficulty: 'standard',
          question: 'Anomalous secondary growth refers to any deviation from the typical pattern.',
          hint: 'If stuck, review the "Secondary Growth in Dicot Stem" (c11_bio_cbse_06_007) focusing.',
          misconception: 'Students often think "anomalous" means "abnormal due to disease or injury" and that the plant is unhealthy.',
          parts: [
                { id: 'a', prompt: 'A transverse section of a stem shows conjoint, collateral, open vascular bundles arranged in a ring.', answer: 'The plant is *Boerhaavia* (or *Chenopodium*)',
                  options: ['The plant is *Boerhaavia* (or *Chenopodium*)', 'anomalous', 'abnormal due to disease or injury'],
                  hint: 'If stuck, review the "Secondary Growth in Dicot Stem" (c11_bio_cbse_06_007) focusing on the.',
                  misconception: 'Students often think "anomalous" means "abnormal due to disease or injury" and that the plant is unhealthy.' }
          ],
            remediations: { 'anomalous-means-abnormal-due-to': { steps: ['Revisit c11_bio_cbse_06_007 to firmly establish the *normal* dicot secondary growth pattern (single cambium ring →.', 'Create a comparison table with three columns: Feature, Normal Dicot (*Helianthus*), Anomalous Dicot.', 'Practice drawing labeled T.S. diagrams of *Bignonia* (wedges) and *Boerhaavia* (concentric rings) from memory, labeling.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "anomalous" means "abnormal due to disease or injury" and that the plant is unhealthy.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Anomalous secondary growth is a defect in the plant\'s development caused by environmental stress." Justify your answer with two.', answer: 'The statement is false',
                  options: ['The statement is false', 'anomalous', 'abnormal/pathological', 'abnormal due to disease or injury'],
                  hint: 'If stuck, review the "Secondary Growth in Dicot Stem" (c11_bio_cbse_06_007) focusing on the.',
                  misconception: 'Students often think "anomalous" means "abnormal due to disease or injury" and that the plant is unhealthy.' },
                { id: 'b', prompt: 'Design a simple microscopic observation plan to distinguish between a stem undergoing normal secondary growth (e.g., *Eucalyptus*) and one showing anomalous.', answer: 'Plan: Take T.S',
                  options: ['Plan: Take T.S', 'anomalous', 'abnormal due to disease or injury'],
                  hint: 'If stuck, review the "Secondary Growth in Dicot Stem" (c11_bio_cbse_06_007) focusing on the.',
                  misconception: 'Students often think "anomalous" means "abnormal due to disease or injury" and that the plant is unhealthy.' }
          ],
            remediations: { 'anomalous-means-abnormal-due-to': { steps: ['Revisit c11_bio_cbse_06_007 to firmly establish the *normal* dicot secondary growth pattern (single cambium ring →.', 'Create a comparison table with three columns: Feature, Normal Dicot (*Helianthus*), Anomalous Dicot.', 'Practice drawing labeled T.S. diagrams of *Bignonia* (wedges) and *Boerhaavia* (concentric rings) from memory, labeling.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_010', difficulty: 'standard',
          question: 'Commercial importance of secondary growth refers to the economic value derived.',
          hint: 'Review c11_bio_cbse_06_007 (Secondary Growth in Dicot Stem) focusing on Fig.',
          misconception: 'Students believe "all wood is secondary xylem" and that "monocots like bamboo and palm produce true wood." They also.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Commercial importance of secondary growth refers to the economic value derived from',
                  options: ['Commercial importance of secondary growth refers to the economic value derived from', 'Plant tissues are groups of structurally and functionally similar cells that originate', 'Simple permanent tissues are groups of structurally and functionally similar cells that', 'Complex tissues are heterogeneous tissues composed of more than one type of cell that'],
                  hint: 'Review c11_bio_cbse_06_007 (Secondary Growth in Dicot Stem) focusing on Fig.',
                  misconception: 'Students believe "all wood is secondary xylem" and that "monocots like bamboo and palm produce true wood." They also think cork is just.' }
          ],
            remediations: { 'all-wood-is-secondary-xylem': { steps: ['Revisit c11_bio_cbse_06_007 (Secondary Growth in Dicot Stem): draw and label vascular cambium, secondary xylem.', 'Compare a dicot stem cross-section (sunflower) with a monocot stem (maize) and a "woody" monocot (bamboo) — note.', 'Examine a cork oak bark sample: locate phellogen (thin layer), phellem (cork), phelloderm; simulate "over-stripping".', '6.8 (secondary growth) to trace product-to-tissue mapping: timber ← secondary xylem; cork ← phellem; bast fiber ←.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
