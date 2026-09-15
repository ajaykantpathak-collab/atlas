import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch10_p1: SimDef = {
    id: 'v3_c11_bio_ch10_p1',
    title: 'Cell Cycle and Cell Division · Part 1/2',
    subtitle: 'Division is the finale, not the story — spend your time in interphase where the real work happens.',
    classLevel: 11, subject: 'biology', topic: 'Cell Cycle and Cell Division · Part 1/2',
    chapters: ['c11_bio_ch10'],
    nodeIds: ['c11_bio_cbse_10_001', 'c11_bio_cbse_10_002', 'c11_bio_cbse_10_003', 'c11_bio_cbse_10_004', 'c11_bio_cbse_10_005', 'c11_bio_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a cell biologist counting phases in an onion root tip squash', intro: 'Of 500 cells on your slide, 480 sit in interphase. That ratio is the chapter\'s thesis — now explain what they\'re all busy doing.', goal: 'Describe cell-cycle phases and durations, distinguish chromosome number from DNA content, and explain G0, karyokinesis, and cytokinesis.' },
    discovery: {
        question: 'In a 24-hour human cell cycle, the actual division — chromosomes lining up, splitting, cells pinching apart — takes about one hour. What is the cell doing for the other 23, and why can\'t it just skip to the dramatic part?',
        options: ['Interphase: growing and replicating its DNA so each daughter inherits a complete, accurate genome — division without it delivers half-empty cells', 'Resting — division exhausts the cell, so it sleeps most of the day', 'Dividing continuously but too slowly to see', 'Waiting for permission from neighbouring cells'],
        answer: 'Interphase: growing and replicating its DNA so each daughter inherits a complete, accurate genome — division without it delivers half-empty cells',
        hook: 'Mitosis is the visible minute; interphase is the invisible day — and the invisible part is where all the accuracy is won or lost.',
    },
    teaching: [
        { title: 'Cell Cycle: Phases and Duration', text: 'The cell cycle is an ordered sequence of events in which a eukaryotic cell duplicates its genome, synthesizes other cellular constituents, and divides into two genetically identical daughter cells.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_10_001', title: 'Your mission',
          mission: { widget: 'mitosis', validate: 'mitosis:stage=50',
            instruction: 'On the lab: move to stage 50 — what phase is the cell in?.',
        context: 'Track a cell through G1, S, G2, and M: explain how DNA doubles to 4C while chromosome count stays 2n, why a liver cell waits in G0 while a heart cell can never return, and how coconut endosperm ends up multinucleate.',
            observePrompt: 'What did the mitosis interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_10_001', title: 'Cell Cycle: Phases and Duration',
          caseStudy: { intro: 'Observe a healing skin wound: new cells appear daily to close the gap.',
            decisions: [{ prompt: 'What are the two main phases of the cell cycle, and which phase occupies more than 95% of the total cycle duration in a typical human cell?', options: [
                { text: 'The two main phases are Interphase and M Phase', outcome: 'The two main phases are Interphase and M Phase. Interphase occupies >95% of the cycle (≈23 hours.' },
                { text: 'M Phase is longer', outcome: 'Not quite — Students think "Interphase is a resting phase where nothing happens" because the nucleus looks.', reveals: 'interphase-is-a-resting-phase' },
                { text: 'Interphase is a resting phase where nothing happens', outcome: 'Not quite — Students think "Interphase is a resting phase where nothing happens" because the nucleus looks.', reveals: 'interphase-is-a-resting-phase' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_10_002', title: 'Interphase: G1, S, G2 Phases',
          scaffold: { problem: 'A maize (corn) root tip cell has 20 chromosomes in G1. Determine the chromosome number and DNA content (in C-value) at the end of G1, end.',
            steps: [
            { text: 'Identify starting values: G1 chromosome number = 20 (2n), DNA content = 2C (by definition of 2C as G1 DNA amount).' },
            { text: 'Recall S phase event: DNA replication occurs, each chromosome duplicates its DNA to form two sister chromatids joined.' },
            { text: 'Apply centromere-count rule: chromosome number = number of centromeres.' },
            { text: 'Track DNA content: DNA doubles during S phase, so end of S = 4C. No further DNA synthesis in G2, so end of G2 = 4C.' },
            { text: 'Summarize in a table: G1: 20 chromosomes, 2C; S: 20 chromosomes, 4C; G2: 20 chromosomes, 4C.', faded: true, blankAnswer: 'End of G1: 20 chromosomes, 2C. End of S: 20 chromosomes.' }
            ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_10_003', title: 'Mitosis: Prophase',
          caseStudy: { intro: 'Observe an onion root tip slide under a compound microscope — you see many cells, but a few look different: their nuclei are gone and dark thread-like.',
            decisions: [{ prompt: 'Define prophase of mitosis and list the four key microscopic hallmarks that distinguish a prophase cell from an interphase cell.', options: [
                { text: 'Prophase is the first stage of mitotic karyokinesis where chromatin condenses into', outcome: 'Prophase is the first stage of mitotic karyokinesis where chromatin condenses into discrete.' },
                { text: 'chromosomes align at equator', outcome: 'Not quite — Students think "chromosomes replicate in prophase" because they see double-structured chromosomes.', reveals: 'chromosomes-replicate-in-prophase-because' },
                { text: 'two chromatids', outcome: 'Not quite — Students think "chromosomes replicate in prophase" because they see double-structured chromosomes.', reveals: 'chromosomes-replicate-in-prophase-because' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_10_004', title: 'Mitosis: Metaphase, Anaphase, Telophase',
          caseStudy: { intro: 'Imagine watching a time-lapse video of an onion root tip cell dividing: you see chromosomes suddenly line up like beads on a string at the cell\'s centre.',
            decisions: [{ prompt: 'What is the defining event that marks the transition from metaphase to anaphase in mitosis?', options: [
                { text: 'The splitting of centromeres', outcome: 'The splitting of centromeres, which separates sister chromatids into individual daughter.' },
                { text: 'alignment of chromosomes at the equator', outcome: 'Not quite — Students often think that in anaphase, chromosomes are "pulled by their arms" toward the poles.', reveals: 'in-anaphase' },
                { text: 'disappearance of nuclear envelope', outcome: 'Not quite — Students often think that in anaphase, chromosomes are "pulled by their arms" toward the poles.', reveals: 'in-anaphase' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_10_005', title: 'Significance of Mitosis',
          caseStudy: { intro: 'Observe a mango tree in your courtyard: it grows taller every year, heals bark wounds within weeks, and produces new leaves each spring.',
            decisions: [{ prompt: 'State the chromosome number and DNA content in daughter cells immediately after mitosis if the parent cell was diploid (2n) with 2C DNA.', options: [
                { text: 'Correct answer: Daughter cells are diploid (2n) with 2C DNA content', outcome: 'Correct answer: Daughter cells are diploid (2n) with 2C DNA content.' },
                { text: 'mitosis occurs in all living cells of an organism throughout life', outcome: 'Not quite — Students believe mitosis occurs in all living cells of an organism throughout life.', reveals: 'mitosis-occurs-in-all-living' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_10_006', title: 'Meiosis: Meiosis I - Reductional Division',
          caseStudy: { intro: 'Observe how siblings from the same parents show different combinations of traits — eye colour, hair texture, height — despite inheriting chromosomes from the.',
            decisions: [{ prompt: 'Name the five sequential sub-stages of Prophase I and state the one defining chromosomal event that characterises each sub-stage.', options: [
                { text: 'Leptotene: chromosomes become visible as thin threads', outcome: 'Leptotene: chromosomes become visible as thin threads; Zygotene: synapsis begins, homologous.' },
                { text: 'crossing over in zygotene', outcome: 'Not quite — Students often think "crossing over occurs in metaphase I because that\'s when chromosomes are.', reveals: 'crossing-over-occurs-in-metaphase' },
                { text: 'chiasmata in pachytene', outcome: 'Not quite — Students often think "crossing over occurs in metaphase I because that\'s when chromosomes are.', reveals: 'crossing-over-occurs-in-metaphase' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'Cell Cycle and Cell Division · Part 1/2', spots: [
            { id: 's1', label: 'Cell Cycle Phases and Duration', prompt: 'Which idea is this? — The cell cycle is an ordered sequence of events in which a eukaryotic cell duplicates its.', answer: 'Cell Cycle Phases and Duration', options: ['Cell Cycle Phases and Duration', 'Interphase G1 S G2 Phases', 'Mitosis Prophase', 'Mitosis Metaphase Anaphase Telophase'] },
            { id: 's2', label: 'Interphase G1 S G2 Phases', prompt: 'Which idea is this? — Interphase is the longest phase of the cell cycle where a eukaryotic cell prepares for.', answer: 'Interphase G1 S G2 Phases', options: ['Interphase G1 S G2 Phases', 'Cell Cycle Phases and Duration', 'Mitosis Prophase', 'Mitosis Metaphase Anaphase Telophase'] },
            { id: 's3', label: 'Mitosis Prophase', prompt: 'Which idea is this? — Prophase is the first stage of karyokinesis in mitosis, following the S and G2 phases.', answer: 'Mitosis Prophase', options: ['Mitosis Prophase', 'Cell Cycle Phases and Duration', 'Interphase G1 S G2 Phases', 'Mitosis Metaphase Anaphase Telophase'] },
            { id: 's4', label: 'Mitosis Metaphase Anaphase Telophase', prompt: 'Which idea is this? — Metaphase, anaphase, and telophase are the three sequential stages of karyokinesis.', answer: 'Mitosis Metaphase Anaphase Telophase', options: ['Mitosis Metaphase Anaphase Telophase', 'Cell Cycle Phases and Duration', 'Interphase G1 S G2 Phases', 'Mitosis Prophase'] },
            { id: 's5', label: 'Significance of Mitosis', prompt: 'Which idea is this? — Mitosis is an equational cell division process in which a single diploid parent cell.', answer: 'Significance of Mitosis', options: ['Significance of Mitosis', 'Cell Cycle Phases and Duration', 'Interphase G1 S G2 Phases', 'Mitosis Prophase'] },
            { id: 's6', label: 'Meiosis Meiosis I - Reductional Division', prompt: 'Which idea is this? — Meiosis I is the reductional division in which homologous chromosomes separate, reducing.', answer: 'Meiosis Meiosis I - Reductional Division', options: ['Meiosis Meiosis I - Reductional Division', 'Cell Cycle Phases and Duration', 'Interphase G1 S G2 Phases', 'Mitosis Prophase'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a biology practical you squash an onion root tip, stain with acetocarmine, and count 500 cells: 482 show a normal-looking nucleus with no visible chromosomes, 18 show condensed chromosomes in various mitotic stages. Your partner writes the conclusion: \'Root tip cells spend most of their time resting and occasionally divide.\'',
            decisions: [{ prompt: 'Is \'resting\' the right word for what those 482 cells are doing?', options: [
                { text: 'No — those cells are in interphase, which your own count proves occupies >95% of the cycle. Far from resting: G1 builds proteins and organelles, S replicates the entire genome, G2 synthesises tubulin and checkpoint proteins. Interphase is the most metabolically intense stretch of the cycle.', outcome: 'The \'resting phase\' label is a historical artefact — chromosomes are invisible then, so it looked idle; the cell is actually doing the heavy preparatory work.' },
                { text: 'Yes — the calm-looking nucleus without chromosomes means the cell is dormant between divisions.', outcome: 'Invisible chromosomes ≠ inactivity; that \'calm\' nucleus is replicating billions of base pairs and building the machinery for mitosis.', reveals: 'interphase-is-resting' },
                { text: 'Your count is biased — most cells are in mitosis but the stain missed them.', outcome: 'The stain marks condensed chromosomes reliably; the 96:4 ratio is exactly what theory predicts — interphase dominates because division is the short final act.', reveals: 'mitosis-dominates-cycle' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now separate DNA content from chromosome count and karyokinesis from cytokinesis — the four distinctions the whole chapter quietly depends on.',
            decisions: [{ prompt: 'What comes next? Cell Cycle and Cell Division · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Cell Cycle and Cell Division · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'mitosis', prompt: 'Explore the mitosis interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'mitosis', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_001', difficulty: 'standard',
          question: 'The cell cycle is an ordered sequence of events in which a eukaryotic cell.',
          hint: 'Revisit Class 9 "Cell Division" (c9_bio_ch1_12) and Class 8 "Cell Structure".',
          misconception: 'Students think "Interphase is a resting phase where nothing happens" because the nucleus looks calm.',
          parts: [
                { id: 'a', prompt: 'What are the two main phases of the cell cycle, and which phase occupies more than 95% of the total cycle duration in a typical human cell?', answer: 'The two main phases are Interphase and M Phase',
                  options: ['The two main phases are Interphase and M Phase', 'M Phase is longer', 'Interphase is a resting phase where nothing happens', '"Interphase is a resting phase where nothing happens"'],
                  hint: 'Revisit Class 9 "Cell Division" (c9_bio_ch1_12) and Class 8 "Cell Structure" (c8_bio_ch1_3).',
                  misconception: 'Students think "Interphase is a resting phase where nothing happens" because the nucleus looks calm.' },
                { id: 'b', prompt: 'A cell in G1 phase has 2n chromosomes and 2C DNA content. After S phase, the DNA content becomes 4C but the chromosome number remains 2n.', answer: 'Chromosome number (n) counts centromeres',
                  options: ['Chromosome number (n) counts centromeres', 'chromosomes double to 4n', 'Interphase is a resting phase where nothing happens', '"Interphase is a resting phase where nothing happens"'],
                  hint: 'Revisit Class 9 "Cell Division" (c9_bio_ch1_12) and Class 8 "Cell Structure" (c8_bio_ch1_3).',
                  misconception: 'Students think "Interphase is a resting phase where nothing happens" because the nucleus looks calm.' },
                { id: 'c', prompt: 'Compare the fate of a liver cell (hepatocyte) and a cardiac muscle cell (cardiomyocyte) in an adult human with respect to the cell cycle.', answer: 'Hepatocytes are in G0 (quiescent) – they can re-enter G1 and divide upon injury',
                  options: ['Hepatocytes are in G0 (quiescent) – they can re-enter G1 and divide upon injury', 'resting', 'Interphase is a resting phase where nothing happens', '"Interphase is a resting phase where nothing happens"'],
                  hint: 'Revisit Class 9 "Cell Division" (c9_bio_ch1_12) and Class 8 "Cell Structure" (c8_bio_ch1_3).',
                  misconception: 'Students think "Interphase is a resting phase where nothing happens" because the nucleus looks calm.' }
          ],
            remediations: { 'interphase-is-a-resting-phase': { steps: ['Show a time-lapse video of a cultured cell (e.g., HeLa) with fluorescent tubulin and histone tags – students see.', 'Have them list 5 metabolic processes occurring in G1 (e.g., ribosome biogenesis, ATP production, cyclin D synthesis).', 'Re-read NCERT line "interphase, though called the resting phase, is the time during which the cell is preparing for.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "Interphase is a resting phase where nothing happens" because the nucleus looks calm.',
          parts: [
                { id: 'a', prompt: 'A researcher claims: "Cytokinesis always follows karyokinesis, so the number of nuclei always equals the number of cells." Evaluate this statement with.', answer: 'The statement is false',
                  options: ['The statement is false', 'Interphase is a resting phase where nothing happens', '"Interphase is a resting phase where nothing happens"'],
                  hint: 'Revisit Class 9 "Cell Division" (c9_bio_ch1_12) and Class 8 "Cell Structure" (c8_bio_ch1_3).',
                  misconception: 'Students think "Interphase is a resting phase where nothing happens" because the nucleus looks calm.' },
                { id: 'b', prompt: 'Design a simple experiment using onion root tips to demonstrate that Interphase lasts longer than M Phase.', answer: 'Stain root tip squash with acetocarmine or Feulgen',
                  options: ['Stain root tip squash with acetocarmine or Feulgen', 'Interphase is a resting phase where nothing happens', '"Interphase is a resting phase where nothing happens"'],
                  hint: 'Revisit Class 9 "Cell Division" (c9_bio_ch1_12) and Class 8 "Cell Structure" (c8_bio_ch1_3).',
                  misconception: 'Students think "Interphase is a resting phase where nothing happens" because the nucleus looks calm.' }
          ],
            remediations: { 'interphase-is-a-resting-phase': { steps: ['Show a time-lapse video of a cultured cell (e.g., HeLa) with fluorescent tubulin and histone tags – students see.', 'Have them list 5 metabolic processes occurring in G1 (e.g., ribosome biogenesis, ATP production, cyclin D synthesis).', 'Re-read NCERT line "interphase, though called the resting phase, is the time during which the cell is preparing for.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_002', difficulty: 'standard',
          question: 'Interphase is the longest phase of the cell cycle where a eukaryotic cell.',
          hint: 'Review Class 9 node c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) and Class 10 node.',
          misconception: 'Students often think that after S phase the chromosome number becomes 4n (e.g., 92 in humans) because "DNA doubled.".',
          parts: [
                { id: 'a', prompt: 'A student claims: "During S phase, the chromosome number doubles from 2n to 4n because DNA replicates." Explain why this statement is incorrect using the.', answer: 'Chromosome number (n) counts centromeres',
                  options: ['Chromosome number (n) counts centromeres', 'DNA doubled', 'after S phase the chromosome number becomes 4n (e'],
                  hint: 'Review Class 9 node c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) and Class 10 node.',
                  misconception: 'Students often think that after S phase the chromosome number becomes 4n (e.g., 92 in humans) because "DNA doubled." They confuse the.' },
                { id: 'b', prompt: 'A human skin cell in G1 has 46 chromosomes and 2C DNA content. Predict the chromosome number and DNA content at the end of S phase and at the end of G2 phase.', answer: 'End of S phase: 46 chromosomes (2n), 4C DNA',
                  options: ['End of S phase: 46 chromosomes (2n), 4C DNA', 'DNA doubled', 'after S phase the chromosome number becomes 4n (e'],
                  hint: 'Review Class 9 node c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) and Class 10 node.',
                  misconception: 'Students often think that after S phase the chromosome number becomes 4n (e.g., 92 in humans) because "DNA doubled." They confuse the.' }
          ],
            remediations: { 'after-s-phase-the-chromosome': { steps: ['Draw a single chromosome in G1 (one chromatid, one centromere) and after S phase (two chromatids, one centromere).', 'Count centromeres in both drawings – the number is unchanged.', 'Define chromosome number as centromere number.', 'Practice with NCERT Exercise Question 16: track N and C values through the cycle until the distinction becomes.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_003', difficulty: 'standard',
          question: 'Prophase is the first stage of karyokinesis in mitosis, following the S and G2.',
          hint: 'Review c11_bio_cbse_10_002 (Interphase: G1, S, G2 Phases) focusing on S-phase DNA.',
          misconception: 'Students think "chromosomes replicate in prophase" because they see double-structured chromosomes (two chromatids).',
          parts: [
                { id: 'a', prompt: 'Explain why chromosomes become visible only during prophase even though DNA replication was completed in S phase.', answer: 'During S phase, replicated DNA remains as loosely packed chromatin fibres',
                  options: ['During S phase, replicated DNA remains as loosely packed chromatin fibres', 'DNA replicates in prophase', 'chromosomes form in G2', 'chromosomes replicate in prophase'],
                  hint: 'Review c11_bio_cbse_10_002 (Interphase: G1, S, G2 Phases) focusing on S-phase DNA replication and.',
                  misconception: 'Students think "chromosomes replicate in prophase" because they see double-structured chromosomes (two chromatids).' },
                { id: 'b', prompt: 'A student observes a plant cell in prophase but sees no centrioles or asters. Is this observation correct?', answer: 'Yes, correct',
                  options: ['Yes, correct', 'plant cells have centrioles', 'no spindle forms', 'chromosomes replicate in prophase'],
                  hint: 'Review c11_bio_cbse_10_002 (Interphase: G1, S, G2 Phases) focusing on S-phase DNA replication and.',
                  misconception: 'Students think "chromosomes replicate in prophase" because they see double-structured chromosomes (two chromatids).' },
                { id: 'c', prompt: 'Compare the chromosome number (n) and DNA content (C) in a human somatic cell at late G2 phase versus late prophase. Are they the same or different? Justify.', answer: 'Same: both are 2n chromosome number and 4C DNA content',
                  options: ['Same: both are 2n chromosome number and 4C DNA content', '4n in prophase', '2C in prophase', 'chromosomes replicate in prophase'],
                  hint: 'Review c11_bio_cbse_10_002 (Interphase: G1, S, G2 Phases) focusing on S-phase DNA replication and.',
                  misconception: 'Students think "chromosomes replicate in prophase" because they see double-structured chromosomes (two chromatids).' }
          ],
            remediations: { 'chromosomes-replicate-in-prophase-because': { steps: ['Revisit c11_bio_cbse_10_002 (Interphase: S phase) — confirm DNA replication timing.', 'Draw a timeline: G1 (2C, 2n) → S (replication) → G2 (4C, 2n) → Prophase (4C, 2n, condensed).', 'Use a pipe-cleaner model: twist two strands (chromatids) in S phase, then coil tightly in prophase.', 'Compare animal vs plant prophase diagrams side-by-side; label centrosome/aster vs MTOC/spindle only.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_004', difficulty: 'standard',
          question: 'Metaphase, anaphase, and telophase are the three sequential stages.',
          hint: 'Review c11_bio_cbse_10_003 (Mitosis: Prophase) and c11_bio_cbse_10_002 (Interphase:.',
          misconception: 'Students often think that in anaphase, chromosomes are "pulled by their arms" toward the poles.',
          parts: [
                { id: 'a', prompt: 'What is the defining event that marks the transition from metaphase to anaphase in mitosis?', answer: 'The splitting of centromeres',
                  options: ['The splitting of centromeres', 'alignment of chromosomes at the equator', 'disappearance of nuclear envelope', 'pulled by their arms'],
                  hint: 'Review c11_bio_cbse_10_003 (Mitosis: Prophase) and c11_bio_cbse_10_002 (Interphase: S phase DNA.',
                  misconception: 'Students often think that in anaphase, chromosomes are "pulled by their arms" toward the poles.' },
                { id: 'b', prompt: 'Why do chromosomes align at the metaphase plate instead of remaining randomly scattered in the cytoplasm?', answer: 'Chromosomes align',
                  options: ['Chromosomes align', 'chromosomes are pushed by spindle fibres', 'they align due to cytoplasmic streaming', 'pulled by their arms'],
                  hint: 'Review c11_bio_cbse_10_003 (Mitosis: Prophase) and c11_bio_cbse_10_002 (Interphase: S phase DNA.',
                  misconception: 'Students often think that in anaphase, chromosomes are "pulled by their arms" toward the poles.' },
                { id: 'c', prompt: 'A cell in metaphase has 46 chromosomes. How many chromosomes and how much DNA (in C-value) will be present in each daughter nucleus at the end of telophase?', answer: 'At metaphase, 46 chromosomes each consist of two sister chromatids (4C DNA)',
                  options: ['At metaphase, 46 chromosomes each consist of two sister chromatids (4C DNA)', 'pulled by their arms', 'in anaphase, chromosomes are "pulled by their arms" toward the poles'],
                  hint: 'Review c11_bio_cbse_10_003 (Mitosis: Prophase) and c11_bio_cbse_10_002 (Interphase: S phase DNA.',
                  misconception: 'Students often think that in anaphase, chromosomes are "pulled by their arms" toward the poles.' }
          ],
            remediations: { 'in-anaphase': { steps: ['Show a clear animated video of anaphase highlighting kinetochore microtubules shortening at the poleward end.', 'Have students draw anaphase chromosomes with centromeres at the leading edge and arms trailing.', 'Use a physical model: attach strings (spindle fibres) to the centre of a cardboard chromosome (centromere) and pull.', 'Ask students to explain why the centromere must lead (it is the attachment point for force generation).'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_005', difficulty: 'standard',
          question: 'Mitosis is an equational cell division process in which a single diploid parent.',
          hint: 'Revisit c11_bio_cbse_10_004 (anaphase-telophase) to confirm sister chromatid separation.',
          misconception: 'Students believe mitosis occurs in all living cells of an organism throughout life.',
          parts: [
                { id: 'a', prompt: 'State the chromosome number and DNA content in daughter cells immediately after mitosis if the parent cell was diploid (2n) with 2C DNA content at G1.', answer: 'Correct answer: Daughter cells are diploid (2n) with 2C DNA content',
                  options: ['Correct answer: Daughter cells are diploid (2n) with 2C DNA content', 'mitosis occurs in all living cells of an organism throughout life'],
                  hint: 'Revisit c11_bio_cbse_10_004 (anaphase-telophase) to confirm sister chromatid separation and nuclear.',
                  misconception: 'Students believe mitosis occurs in all living cells of an organism throughout life.' },
                { id: 'b', prompt: 'A farmer notices that the sugarcane crop in his field regrows after harvesting the upper stalks.', answer: 'Correct answer: Intercalary meristem at the nodes',
                  options: ['Correct answer: Intercalary meristem at the nodes', 'mitosis occurs in all living cells of an organism throughout life'],
                  hint: 'Revisit c11_bio_cbse_10_004 (anaphase-telophase) to confirm sister chromatid separation and nuclear.',
                  misconception: 'Students believe mitosis occurs in all living cells of an organism throughout life.' },
                { id: 'c', prompt: 'Compare the role of mitosis in human skin epithelium versus honeybee drone (male) development. What fundamental difference in ploidy exists?', answer: 'Correct answer: Human skin mitosis occurs in diploid somatic cells (2n → 2n)',
                  options: ['Correct answer: Human skin mitosis occurs in diploid somatic cells (2n → 2n)', 'mitosis occurs in all living cells of an organism throughout life'],
                  hint: 'Revisit c11_bio_cbse_10_004 (anaphase-telophase) to confirm sister chromatid separation and nuclear.',
                  misconception: 'Students believe mitosis occurs in all living cells of an organism throughout life.' }
          ],
            remediations: { 'mitosis-occurs-in-all-living': { steps: ['Show prepared slides of onion root tip (meristem) vs. mature leaf epidermis — identify mitotic figures only in root tip.', 'Use EdU/BrdU labeling concept: pulse-chase experiment in mice shows labeling only in intestinal crypts and bone marrow.', 'Relate to G0 concept from c11_bio_cbse_10_001 — cells in G0 have withdrawn from cycle.', 'Write a comparison table: "Mitotically active tissues" vs. "Post-mitotic tissues" in animals and plants.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_006', difficulty: 'standard',
          question: 'Meiosis I is the reductional division in which homologous chromosomes separate.',
          hint: 'Revisit c11_bio_cbse_10_002 (S phase DNA replication) and c9_bio_ch1_12 (basic meiosis.',
          misconception: 'Students often think "crossing over occurs in metaphase I because that\'s when chromosomes are aligned" or "chiasmata.',
          parts: [
                { id: 'a', prompt: 'Name the five sequential sub-stages of Prophase I and state the one defining chromosomal event that characterises each sub-stage.', answer: 'Leptotene: chromosomes become visible as thin threads',
                  options: ['Leptotene: chromosomes become visible as thin threads', 'crossing over in zygotene', 'chiasmata in pachytene', 'crossing over occurs in metaphase I'],
                  hint: 'Revisit c11_bio_cbse_10_002 (S phase DNA replication) and c9_bio_ch1_12 (basic meiosis definition).',
                  misconception: 'Students often think "crossing over occurs in metaphase I because that\'s when chromosomes are aligned" or "chiasmata are the sites where.' }
          ],
            remediations: { 'crossing-over-occurs-in-metaphase': { steps: ['Draw a timeline of Prophase I sub-stages on paper, labeling each with its key event (synapsis → crossing over →.', 'Use two different coloured pens to represent paternal and maternal chromatids; physically model crossing over.', 'Verify that chiasmata appear only after synaptonemal complex removal (diplotene).', 'Contrast with a separate diagram of Metaphase I showing kinetochores on centromeres (spindle attachment) versus.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
