import type { SimDef } from '../../engine/types';
import C9_BiologyCellTheoryCellSim from '../../../simulations/c6_12/C9_BiologyCellTheoryCellSim';

/** v3 wrapped master — C9_BiologyCellTheoryCellSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_biologycelltheorycellsim: SimDef = {
    id: 'v3w_c9_biologycelltheorycellsim',
    title: 'Cell Theory Cell',
    subtitle: 'This node covers the historical discoveries of Hooke (cork cells, 1665) and Leeuwenhoek.',
    classLevel: 9, subject: 'biology', topic: 'Discovery of the Cell: Hooke and Leeuwenhoek',
    chapters: [],
    nodeIds: ['c9_bio_ch1_1', 'c9_bio_ch1_2', 'c9_bio_ch1_10', 'c9_bio_ch1_11', 'c9_bio_ch1_12', 'c9_bio_ch1_3', 'c9_bio_ch1_4', 'c9_bio_ch1_5', 'c9_bio_ch1_6', 'c9_bio_ch1_7', 'c9_bio_ch1_8'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine placing a thin slice of onion peel on a slide in your school lab: you see tiny, brick-like.', goal: 'Master Cell Theory Cell.' },
    discovery: {
        question: 'Evaluate this claim: "Leeuwenhoek discovered bacteria, so he should be credited with discovering the cell, not Hooke." Provide a biological justification for.',
        options: ['The claim is **partially valid but incomplete**', 'living cell', '** The exact wrong reasoning'],
        answer: 'The claim is **partially valid but incomplete**',
        hook: 'Students believe **Hooke discovered the "living cell" because he coined the term "cell."** The exact wrong reasoning:.',
    },
    teaching: [
        { title: 'The discovery of the cell refers to the.', text: 'The discovery of the cell refers to the foundational observations by Robert Hooke (1665), who first coined the term "cell" after viewing dead cork tissue under a compound microscope, and Antonie van.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_bio_ch1_1', title: 'The discovery of the cell refers to the.',
          scaffold: { problem: 'A Class 9 student views a permanent slide of cork tissue under a compound microscope (40x objective, 10x eyepiece).',
            steps: [
            { text: 'Identify the specimen: cork = phellem (dead, suberized protective tissue of bark), not living parenchyma.' },
            { text: 'Recall Hooke\'s 1665 observation: he used a similar compound microscope (~30x) on cork and saw only walls, coining.' },
            { text: 'Apply cell biology: mature cork cells lose protoplasm (cytoplasm, nucleus, organelles) and deposit lignin/suberin in.' },
            { text: 'Analyze microscope limitation: even with 400x, a light microscope cannot resolve internal structures if they are absent.' },
            { text: 'Synthesize: The student sees **dead cell walls**, not "empty living cells." The conclusion confuses a specific dead.', faded: true, blankAnswer: 'The student observes dead, lignified cell walls of cork.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch1_2', title: 'Cell Theory, as proposed by Matthias.',
          scaffold: { problem: 'A Class 9 student observes a drop of pond water under a microscope and sees Paramecium (a protozoan), Spirogyra filaments (algae), and some.',
            steps: [
            { text: 'Identify the organisms observed — Paramecium (unicellular animal-like protist), Spirogyra (multicellular plant-like.' },
            { text: 'Recall postulate 1 — all living organisms are composed of cells.' },
            { text: 'Recall postulate 2 — cell is the basic unit of structure and function.' },
            { text: 'Recall postulate 3 — cells arise from pre-existing cells. Observe binary fission in Paramecium or fragmentation in.' },
            { text: 'Evaluate the claim: The observation *supports* postulates 1 and 2 directly.', faded: true, blankAnswer: 'The student\'s claim is partially correct. The observation.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch1_10', title: 'Plastids are double-membrane-bound,.',
          scaffold: { problem: 'A student observes a cross-section of a carrot root (orange) and a spinach leaf (green) under a microscope.',
            steps: [
            { text: 'Recognize that both carrot root and spinach leaf are plant tissues, so the observed organelles are plastids.' },
            { text: 'Recall that color in plastids comes from specific pigments: chlorophyll (green) in chloroplasts, carotenoids.' },
            { text: 'Analyze the carrot observation: orange crystalline bodies indicate massive accumulation of β-carotene (a carotenoid) in.' },
            { text: 'Analyze the spinach observation: green stacks are grana (thylakoid stacks) containing chlorophyll in chloroplasts,.' },
            { text: 'Conclude: Carrot root cells contain chromoplasts (pigment storage); spinach leaf cells contain chloroplasts.', faded: true, blankAnswer: 'Carrot root: Chromoplasts (store carotenoid pigments like.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch1_11', title: 'A vacuole is a membrane-bound organelle.',
          scaffold: { problem: 'A farmer notices that his chilli plants wilt at noon on a hot summer day but recover by evening without additional watering.',
            steps: [
            { text: 'Identify the biological process — transpiration pull creates tension in xylem, lowering leaf water potential; mesophyll.' },
            { text: 'Recall the relevant principle — water moves from higher to lower water potential; vacuole loses water to cytoplasm,.' },
            { text: 'Apply to the scenario — as water leaves the central vacuole, its volume decreases, turgor pressure (Ψp) drops toward.' },
            { text: 'Trace the cause-effect chain — at noon, high temperature and light increase transpiration rate > water uptake rate; by.' },
            { text: 'Verify and conclude — water re-enters vacuoles by osmosis, Ψp becomes positive again, cells regain turgor, leaves.', faded: true, blankAnswer: 'Wilting occurs when transpiration-driven water loss shrinks.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch1_12', title: 'Cell division is the biological process.',
          scaffold: { problem: 'A farmer notices that the onion root tips in his field show rapid growth after rains.',
            steps: [
            { text: 'Recognize that the number of cells in a stage is proportional to the time spent in that stage (assuming asynchronous.' },
            { text: 'Calculate the fraction of cells in metaphase: 3 cells / 100 total cells = 0.03.' },
            { text: 'Apply the proportion to total cycle time: 0.03 × 24 hours = 0.72 hours.' },
            { text: 'Convert to minutes: 0.72 × 60 = 43.2 minutes.' },
            { text: 'Verify logic - metaphase is brief (chromosome alignment checkpoint), so ~43 minutes is biologically plausible compared.', faded: true, blankAnswer: 'Metaphase duration ≈ 43 minutes (0.72 hours).' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch1_3', title: 'The cell membrane (plasma membrane) is.',
          scaffold: { problem: 'A student places deshelled eggs (membrane intact) in three solutions: (A) pure water, (B) 10% salt solution, (C) 20% salt solution.',
            steps: [
            { text: 'Identify the system — egg membrane is selectively permeable (water passes, solutes mostly blocked).' },
            { text: 'Recall water potential (Ψ) = Ψs + Ψp. Pure water has Ψ = 0 (highest). Adding solute lowers Ψs (more negative).' },
            { text: 'Compare Ψ of each solution to egg interior (approx. 0.9% salts, Ψ ≈ -300 kPa).' },
            { text: 'Link water movement to mass change: influx → swelling (A); efflux → shrinkage (B, C), more in C.' },
            { text: 'Conclude: direction of osmosis is always from higher to lower water potential; magnitude depends on gradient steepness.', faded: true, blankAnswer: 'Egg in water (Ψ=0) gains water (swells); in 10% and 20%.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_bio_ch1_2', title: 'Identify each idea',
          dissect: { specimen: 'Cell Theory Cell', spots: [
            { id: 's1', label: 'The discovery of the cell', prompt: 'Which idea is this? — The discovery of the cell refers to the foundational observations by Robert Hooke (1665),.', answer: 'The discovery of the cell', options: ['The discovery of the cell', 'Cell Theory as proposed by', 'A vacuole is a membrane-bound', 'Cell division is the biological'] },
            { id: 's2', label: 'Cell Theory as proposed by', prompt: 'Which idea is this? — Cell Theory, as proposed by Matthias Schleiden (1838) and Theodor Schwann (1839), states.', answer: 'Cell Theory as proposed by', options: ['Cell Theory as proposed by', 'The discovery of the cell', 'A vacuole is a membrane-bound', 'Cell division is the biological'] },
            { id: 's3', label: 'A vacuole is a membrane-bound', prompt: 'Which idea is this? — A vacuole is a membrane-bound organelle filled with cell sap (a solution of water,.', answer: 'A vacuole is a membrane-bound', options: ['A vacuole is a membrane-bound', 'The discovery of the cell', 'Cell Theory as proposed by', 'Cell division is the biological'] },
            { id: 's4', label: 'Cell division is the biological', prompt: 'Which idea is this? — Cell division is the biological process by which a parent cell divides into two or more.', answer: 'Cell division is the biological', options: ['Cell division is the biological', 'The discovery of the cell', 'Cell Theory as proposed by', 'A vacuole is a membrane-bound'] },
            { id: 's5', label: 'The cell membrane plasma membrane', prompt: 'Which idea is this? — The cell membrane (plasma membrane) is a dynamic, fluid phospholipid bilayer embedded.', answer: 'The cell membrane plasma membrane', options: ['The cell membrane plasma membrane', 'The discovery of the cell', 'Cell Theory as proposed by', 'A vacuole is a membrane-bound'] }
          ] } }
    ],
    explore: { component: C9_BiologyCellTheoryCellSim, prompt: 'Explore the interactive — Cell Theory Cell' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_bio_ch1_1', difficulty: 'standard',
          question: 'The discovery of the cell refers to the foundational observations by Robert.',
          hint: 'Revisit c8_bio_ch1_2 (microscope parts and function) and c8_bio_ch1_3 (cell wall.',
          misconception: 'Students believe **Hooke discovered the "living cell" because he coined the term "cell."** The exact wrong reasoning:.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The discovery of the cell refers to the foundational observations by Robert Hooke (1665),',
                  options: ['The discovery of the cell refers to the foundational observations by Robert Hooke (1665),', 'Cell Theory, as proposed by Matthias Schleiden (1838) and Theodor Schwann (1839), states', 'Plastids are double-membrane-bound, semi-autonomous organelles found exclusively in plant', 'A vacuole is a membrane-bound organelle filled with cell sap (a solution of water,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **Hooke discovered the "living cell" because he coined the term "cell."** The exact wrong reasoning: "Hooke looked at.' }
          ],
            remediations: { 'hooke-discovered-the-living-cell': { steps: ['**Observe directly:** Prepare two slides: (a) iodine-stained onion peel (fixed, walled, static) → "Hooke\'s view"; (b).', '**Tabulate:** Specimen | Staining | Movement | Wall visible | Living?', '**Conclude:** Hooke\'s "cells" = dead walls; Leeuwenhoek\'s "animalcules" = living units.', '**Write a 3-line note:** "Term \'cell\' from Hooke (structure); Concept of living cell from Leeuwenhoek (function)." This.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **Hooke discovered the "living cell" because he coined the term "cell."** The exact wrong reasoning:.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Leeuwenhoek discovered bacteria, so he should be credited with discovering the cell, not Hooke." Provide a biological justification for.', answer: 'The claim is **partially valid but incomplete**',
                  options: ['The claim is **partially valid but incomplete**', 'living cell', '** The exact wrong reasoning', '**Hooke discovered the "living cell"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **Hooke discovered the "living cell" because he coined the term "cell."** The exact wrong reasoning: "Hooke looked at.' },
                { id: 'b', prompt: 'Design a simple investigation using only a compound microscope (school lab), onion peel, and pond water to demonstrate the complementary nature of Hooke\'s and.', answer: '**Investigation:** 1) Mount stained onion peel (iodine) → observe fixed, walled',
                  options: ['**Investigation:** 1) Mount stained onion peel (iodine) → observe fixed, walled', 'living cell', '** The exact wrong reasoning', '**Hooke discovered the "living cell"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **Hooke discovered the "living cell" because he coined the term "cell."** The exact wrong reasoning: "Hooke looked at.' }
          ],
            remediations: { 'hooke-discovered-the-living-cell': { steps: ['**Observe directly:** Prepare two slides: (a) iodine-stained onion peel (fixed, walled, static) → "Hooke\'s view"; (b).', '**Tabulate:** Specimen | Staining | Movement | Wall visible | Living?', '**Conclude:** Hooke\'s "cells" = dead walls; Leeuwenhoek\'s "animalcules" = living units.', '**Write a 3-line note:** "Term \'cell\' from Hooke (structure); Concept of living cell from Leeuwenhoek (function)." This.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_2', difficulty: 'standard',
          question: 'Cell Theory, as proposed by Matthias Schleiden (1838) and Theodor Schwann.',
          hint: 'If stuck, revisit c8_bio_ch1_3 (What Is a Cell?) and c8_bio_ch1_8 (Levels of.',
          misconception: 'Students often think Schleiden and Schwann *together* proposed all three postulates in one paper.',
          parts: [
                { id: 'a', prompt: 'Why was Schleiden\'s conclusion that \'all plants are made of cells\' (1838) and Schwann\'s extension to animals (1839) considered a unification of biology?', answer: 'Before cell theory, plants and animals were studied as separate kingdoms with no',
                  options: ['Before cell theory, plants and animals were studied as separate kingdoms with no', 'Schleiden and Schwann *together* proposed all three postulates in one paper'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Schleiden and Schwann *together* proposed all three postulates in one paper.' },
                { id: 'b', prompt: 'A student argues: "Viruses have genetic material and evolve, so they should be considered living cells according to cell theory." Use the postulates of cell.', answer: 'Step 1: Recall postulate 1',
                  options: ['Step 1: Recall postulate 1', 'Schleiden and Schwann *together* proposed all three postulates in one paper'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Schleiden and Schwann *together* proposed all three postulates in one paper.' },
                { id: 'c', prompt: 'Compare the evidence available to Schleiden (plant cells) and Schwann (animal cells) in the 1830s.', answer: 'Schleiden studied plant tissues (e.g., onion epidermis, cork)',
                  options: ['Schleiden studied plant tissues (e.g., onion epidermis, cork)', 'Schleiden and Schwann *together* proposed all three postulates in one paper'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Schleiden and Schwann *together* proposed all three postulates in one paper.' }
          ],
            remediations: { 'schleiden-and-schwann-together-proposed': { steps: ['Create a timeline on the board: 1665 Hooke → 1674 Leeuwenhoek → 1838 Schleiden → 1839 Schwann → 1855 Virchow.', 'Give each student a \'role card\' (Schleiden, Schwann, Virchow) with one key observation they made (plant cells, animal.', 'Have them argue in character: "I proved plants are cellular," "I proved animals are cellular," "I proved cells come.', 'Ask the class to vote on which postulate each scientist contributed.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Schleiden and Schwann *together* proposed all three postulates in one paper.',
          parts: [
                { id: 'a', prompt: 'Design a simple investigation using materials from a typical Indian kitchen/garden to demonstrate *one* postulate of cell theory to a Class 6 student.', answer: 'Material: Onion peel (epidermis) and a drop of curd (dahi)',
                  options: ['Material: Onion peel (epidermis) and a drop of curd (dahi)', 'Schleiden and Schwann *together* proposed all three postulates in one paper'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Schleiden and Schwann *together* proposed all three postulates in one paper.' }
          ],
            remediations: { 'schleiden-and-schwann-together-proposed': { steps: ['Create a timeline on the board: 1665 Hooke → 1674 Leeuwenhoek → 1838 Schleiden → 1839 Schwann → 1855 Virchow.', 'Give each student a \'role card\' (Schleiden, Schwann, Virchow) with one key observation they made (plant cells, animal.', 'Have them argue in character: "I proved plants are cellular," "I proved animals are cellular," "I proved cells come.', 'Ask the class to vote on which postulate each scientist contributed.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_10', difficulty: 'standard',
          question: 'Plastids are double-membrane-bound, semi-autonomous organelles found.',
          hint: 'Revisit the plant cell diagram and the function of chloroplasts from Class 8.',
          misconception: 'Students often believe that chromoplasts are "dead" or "degenerate" chloroplasts that have simply lost chlorophyll, and.',
          parts: [
                { id: 'a', prompt: 'A student observes a green mango turning yellow as it ripens. They claim, "The chloroplasts in the mango skin have died and disappeared, so the yellow color.', answer: 'The explanation is incorrect',
                  options: ['The explanation is incorrect', 'degenerate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that chromoplasts are "dead" or "degenerate" chloroplasts that have simply lost chlorophyll, and that leucoplasts.' },
                { id: 'b', prompt: 'Potato tubers are underground stems that store starch in leucoplasts (amyloplasts). If a potato is left in sunlight for several days, its skin turns green.', answer: 'The leucoplasts (amyloplasts) in the potato skin differentiate into chloroplasts',
                  options: ['The leucoplasts (amyloplasts) in the potato skin differentiate into chloroplasts', 'new chloroplasts are made from scratch', 'chloroplasts move from the leaves'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that chromoplasts are "dead" or "degenerate" chloroplasts that have simply lost chlorophyll, and that leucoplasts.' }
          ],
            remediations: { 'chromoplasts-are-dead-or-degenerate': { steps: ['Show a time-lapse video or series of images of tomato ripening (green → breaker → red) and potato greening (white →.', 'Have students prepare temporary mounts of potato peel from a dark-stored tuber and a light-exposed tuber; stain with.', 'Use a concept map to trace: Proplastid → (light) → Chloroplast → (ripening) → Chromoplast AND Proplastid → (dark,.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that chromoplasts are "dead" or "degenerate" chloroplasts that have simply lost chlorophyll, and.',
          parts: [
                { id: 'a', prompt: 'A biology textbook states: "Leucoplasts are non-functional, colorless organelles that only take up space in root cells." Evaluate this statement and provide a.', answer: 'The statement is false',
                  options: ['The statement is false', 'degenerate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that chromoplasts are "dead" or "degenerate" chloroplasts that have simply lost chlorophyll, and that leucoplasts.' },
                { id: 'b', prompt: 'Design a simple investigation using locally available plant material to demonstrate that plastids can interconvert from one type to another.', answer: 'Material: Potato tubers (or cauliflower curds) and spinach/coriander leaves',
                  options: ['Material: Potato tubers (or cauliflower curds) and spinach/coriander leaves', 'degenerate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that chromoplasts are "dead" or "degenerate" chloroplasts that have simply lost chlorophyll, and that leucoplasts.' }
          ],
            remediations: { 'chromoplasts-are-dead-or-degenerate': { steps: ['Show a time-lapse video or series of images of tomato ripening (green → breaker → red) and potato greening (white →.', 'Have students prepare temporary mounts of potato peel from a dark-stored tuber and a light-exposed tuber; stain with.', 'Use a concept map to trace: Proplastid → (light) → Chloroplast → (ripening) → Chromoplast AND Proplastid → (dark,.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_11', difficulty: 'standard',
          question: 'A vacuole is a membrane-bound organelle filled with cell sap (a solution of.',
          hint: 'Review c9_bio_ch1_3 (osmosis, selective permeability) and c9_bio_ch1_4 (cell wall.',
          misconception: 'Students think "vacuoles are just storage bags for waste" and that "animal cells have no vacuoles." The exact wrong.',
          parts: [
                { id: 'a', prompt: 'What is the name of the single membrane that surrounds the vacuole, and what is the fluid inside the vacuole called?', answer: 'The membrane is called the tonoplast, and the fluid inside is called cell sap',
                  options: ['The membrane is called the tonoplast, and the fluid inside is called cell sap', 'cell membrane', 'vacuolar membrane'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "vacuoles are just storage bags for waste" and that "animal cells have no vacuoles." The exact wrong reasoning: they equate.' }
          ],
            remediations: { 'vacuoles-are-just-storage-bags': { steps: ['Show a time-lapse video (or series of microscope images) of onion epidermal cells in distilled water vs.', 'Have them measure cell length before/after to quantify turgor loss.', 'Ask: "If the vacuole were just a waste bag, why does its size change reversibly with water movement?"', 'Connect to c9_bio_ch1_3 (osmosis across selectively permeable membrane) and c9_bio_ch1_4 (cell wall resisting pressure).'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_11', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "vacuoles are just storage bags for waste" and that "animal cells have no vacuoles." The exact wrong.',
          parts: [
                { id: 'a', prompt: 'A textbook states: "Vacuoles in plant cells are mainly for storage of waste, while in animal cells they are for digestion." Evaluate this statement and correct.', answer: 'The statement is partially incorrect',
                  options: ['The statement is partially incorrect', 'vacuoles are just storage bags for waste', 'animal cells have no vacuoles', 'garbage dump'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "vacuoles are just storage bags for waste" and that "animal cells have no vacuoles." The exact wrong reasoning: they equate.' }
          ],
            remediations: { 'vacuoles-are-just-storage-bags': { steps: ['Show a time-lapse video (or series of microscope images) of onion epidermal cells in distilled water vs.', 'Have them measure cell length before/after to quantify turgor loss.', 'Ask: "If the vacuole were just a waste bag, why does its size change reversibly with water movement?"', 'Connect to c9_bio_ch1_3 (osmosis across selectively permeable membrane) and c9_bio_ch1_4 (cell wall resisting pressure).'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_12', difficulty: 'standard',
          question: 'Cell division is the biological process by which a parent cell divides into two.',
          hint: 'Revisit c9_bio_ch1_5 (Nucleus: Structure and Functions) for chromosome organization and.',
          misconception: 'Students think **"Meiosis II is just like mitosis"** because both separate sister chromatids.',
          parts: [
                { id: 'a', prompt: 'Name the phase of the cell cycle where DNA replication occurs and state the chromosome composition (chromatids per chromosome) at the end of this phase in a.', answer: 'DNA replication occurs in the **S phase (Synthesis phase) of Interphase**',
                  options: ['DNA replication occurs in the **S phase (Synthesis phase) of Interphase**', 'Prophase', 'Mitosis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think **"Meiosis II is just like mitosis"** because both separate sister chromatids.' },
                { id: 'b', prompt: 'Explain why homologous chromosomes pair up (synapsis) in Prophase I of meiosis but do not pair in prophase of mitosis.', answer: 'Homologous chromosomes pair in Prophase I to enable **crossing over (genetic',
                  options: ['Homologous chromosomes pair in Prophase I to enable **crossing over (genetic', 'pairing happens in both', 'pairing is for separation of sister chromatids'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think **"Meiosis II is just like mitosis"** because both separate sister chromatids.' }
          ],
            remediations: { 'meiosis-ii-is-just-like': { steps: ['Use pipe cleaners (two long = maternal/paternal homologues, each folded to show two chromatids) to model Meiosis I:.', 'Model Meiosis II: separate sister chromatids → four cells with n unduplicated chromosomes.', 'Contrast with mitosis model: start with 2n duplicated chromosomes, separate sisters directly → two 2n cells.', 'Count chromosomes at each stage aloud. The physical manipulation of "homologues vs sisters" and "with/without S phase.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_12', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think **"Meiosis II is just like mitosis"** because both separate sister chromatids.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Crossing over in meiosis creates new allele combinations on chromosomes, but it also happens in mitosis during Prophase." Evaluate this.', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'Meiosis II is just like mitosis', '**"Meiosis II is just like mitosis"**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think **"Meiosis II is just like mitosis"** because both separate sister chromatids.' }
          ],
            remediations: { 'meiosis-ii-is-just-like': { steps: ['Use pipe cleaners (two long = maternal/paternal homologues, each folded to show two chromatids) to model Meiosis I:.', 'Model Meiosis II: separate sister chromatids → four cells with n unduplicated chromosomes.', 'Contrast with mitosis model: start with 2n duplicated chromosomes, separate sisters directly → two 2n cells.', 'Count chromosomes at each stage aloud. The physical manipulation of "homologues vs sisters" and "with/without S phase.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_3', difficulty: 'standard',
          question: 'The cell membrane (plasma membrane) is a dynamic, fluid phospholipid bilayer.',
          hint: 'If stuck, revisit Class 8 "Cell Membrane, Cytoplasm, and Nucleus: Functions".',
          misconception: 'Students believe that "selective permeability means the membrane actively chooses what to let in" — they.',
          parts: [
                { id: 'a', prompt: 'A red blood cell is placed in a solution of 0.9% NaCl (isotonic) and another in distilled water (hypotonic).', answer: 'In 0.9% NaCl (isotonic), water moves equally in and out',
                  options: ['In 0.9% NaCl (isotonic), water moves equally in and out', 'cell shrinks in water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "selective permeability means the membrane actively chooses what to let in" — they anthropomorphize the membrane as a.' },
                { id: 'b', prompt: 'Compare and contrast facilitated diffusion and active transport using three criteria: energy requirement, direction relative to concentration gradient, and.', answer: 'Facilitated diffusion: no ATP, down gradient, uses channel/carrier proteins',
                  options: ['Facilitated diffusion: no ATP, down gradient, uses channel/carrier proteins', 'both need energy', 'protein-mediated'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "selective permeability means the membrane actively chooses what to let in" — they anthropomorphize the membrane as a.' }
          ],
            remediations: { 'selective-permeability-means-the-membrane': { steps: ['Show a dialysis tubing experiment — starch stays inside, iodine enters, turning starch blue-black.', 'Use a lipid bilayer simulation (e.g., PhET Membrane Channels) — let students try passing O₂, CO₂, glucose, ions.', 'Ask: "If the membrane \'knew\' the cell needed K⁺, why does K⁺ leak out without the Na⁺/K⁺ pump?" This forces.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "selective permeability means the membrane actively chooses what to let in" — they.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using potato cubes and sugar solutions of different concentrations to demonstrate osmosis.', answer: 'Independent variable: concentration of sucrose solution (0%, 5%, 10%, 15%)',
                  options: ['Independent variable: concentration of sucrose solution (0%, 5%, 10%, 15%)', 'measure water level'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "selective permeability means the membrane actively chooses what to let in" — they anthropomorphize the membrane as a.' },
                { id: 'b', prompt: 'Compare and contrast facilitated diffusion and active transport using three criteria: energy requirement, direction relative to concentration gradient, and.', answer: 'Facilitated diffusion: no ATP, down gradient, uses channel/carrier proteins',
                  options: ['Facilitated diffusion: no ATP, down gradient, uses channel/carrier proteins', 'both need energy', 'protein-mediated', 'energy-dependent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "selective permeability means the membrane actively chooses what to let in" — they anthropomorphize the membrane as a.' }
          ],
            remediations: { 'selective-permeability-means-the-membrane': { steps: ['Show a dialysis tubing experiment — starch stays inside, iodine enters, turning starch blue-black.', 'Use a lipid bilayer simulation (e.g., PhET Membrane Channels) — let students try passing O₂, CO₂, glucose, ions.', 'Ask: "If the membrane \'knew\' the cell needed K⁺, why does K⁺ leak out without the Na⁺/K⁺ pump?" This forces.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
