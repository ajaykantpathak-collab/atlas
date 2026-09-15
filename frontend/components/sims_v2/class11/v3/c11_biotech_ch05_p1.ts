import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch05_p1: SimDef = {
    id: 'v3_c11_biotech_ch05_p1',
    title: 'Cell Division and Cell Death (Apoptosis) · Part 1/2',
    subtitle: 'Walk the cell cycle, mitosis and meiosis, then meet programmed cell death.',
    classLevel: 11, subject: 'biotechnology', topic: 'Cell Division and Cell Death (Apoptosis) · Part 1/2',
    chapters: ['c11_biotech_ch05'],
    nodeIds: ['c11_biotech_cbse_05_001', 'c11_biotech_cbse_05_002', 'c11_biotech_cbse_05_003', 'c11_biotech_cbse_05_004', 'c11_biotech_cbse_05_005', 'c11_biotech_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a developmental biologist watching an embryo\'s fingers unsculpt', intro: 'Your body built itself partly by killing the right cells at the right time.', goal: 'Sequence cell cycle phases, distinguish mitosis from meiosis, and define apoptosis vs necrosis.' },
    discovery: {
        question: 'A tadpole loses its tail and a human embryo loses the webbing between fingers — yet no wound ever forms. The cells didn\'t die violently. What did they do?',
        options: ['They executed apoptosis — a programmed, tidy self-destruction the body schedules', 'They were eaten by immune cells invading the tissue', 'They migrated to other organs and changed identity', 'They simply stopped dividing and dissolved on their own'],
        answer: 'They executed apoptosis — a programmed, tidy self-destruction the body schedules',
        hook: 'Cell death can be a plan, not an accident — apoptosis sculpts the body the way a sculptor removes stone.',
    },
    teaching: [
        { title: 'Cell Cycle: Phases and Checkpoints', text: 'The cell cycle is an ordered sequence of events in which a eukaryotic cell grows, duplicates its genetic material (DNA), and divides into two genetically identical daughter cells, comprising two.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_05_001', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Track a cell through the cycle\'s checkpoints and compare clean apoptosis against messy necrosis.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_05_001', title: 'Cell Cycle: Phases and Checkpoints',
          caseStudy: { intro: 'Imagine a single fertilized egg (zygote) developing into a newborn baby with trillions of cells.',
            decisions: [{ prompt: 'A student draws the cell cycle as a circle with four equal quadrants labeled G1, S, G2, M.', options: [
                { text: 'The inaccuracy is depicting all phases as equal duration', outcome: 'The inaccuracy is depicting all phases as equal duration. In a typical 24-hour human somatic cell.' },
                { text: 'the order is wrong', outcome: 'Not quite — **"Interphase is a \'resting phase\' where the cell is inactive."** Students confuse the historical.', reveals: 'interphase-is-a-resting-phase' },
                { text: 'Interphase is a \'resting phase\' where the cell is inactive', outcome: 'Not quite — **"Interphase is a \'resting phase\' where the cell is inactive."** Students confuse the historical.', reveals: 'interphase-is-a-resting-phase' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_05_002', title: 'Interphase: G1, S and G2 Phases',
          caseStudy: { intro: 'Imagine a single cell in your bone marrow that must divide to produce red blood cells—how does it "know" when it has grown enough, copied its DNA correctly.',
            decisions: [{ prompt: 'State the DNA content (C-value) and chromosome number (n-value) of a human somatic cell at the start of G1, at the end of S phase, and.', options: [
                { text: 'Start of G1: 2C DNA, 2n chromosomes (46 chromosomes, each with one chromatid)', outcome: 'Start of G1: 2C DNA, 2n chromosomes (46 chromosomes, each with one chromatid).' },
                { text: 'chromosome number doubles during S phase', outcome: 'Not quite — Students believe "chromosome number doubles during S phase" because they see replicated chromosomes.', reveals: 'chromosome-number-doubles-during-s' },
                { text: 'two chromosomes', outcome: 'Not quite — Students believe "chromosome number doubles during S phase" because they see replicated chromosomes.', reveals: 'chromosome-number-doubles-during-s' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_05_003', title: 'Mitosis: Prophase, Metaphase, Anaphase and Telophase',
          caseStudy: { intro: 'Imagine you\'re examining an onion root tip slide under a microscope — you see cells frozen in different shapes: some with thick X-shaped chromosomes lined.',
            decisions: [{ prompt: 'A student observes a cell under the microscope where chromosomes appear as thin, long threads and the nuclear envelope is still intact.', options: [
                { text: 'The cell is in early prophase', outcome: 'The cell is in early prophase. Chromatin condensation by condensin complexes has begun but.' },
                { text: 'metaphase', outcome: 'Not quite — Students believe that "chromosomes line up at the metaphase plate because spindle fibers push them.', reveals: 'chromosomes-line-up-at-the' },
                { text: 'interphase', outcome: 'Not quite — Students believe that "chromosomes line up at the metaphase plate because spindle fibers push them.', reveals: 'chromosomes-line-up-at-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_05_004', title: 'Significance of Mitosis: Growth and Repair',
          caseStudy: { intro: 'Imagine a deep cut on your finger — within days, the skin knits back together seamlessly.',
            decisions: [{ prompt: 'State the chromosome number and DNA content (C-value) of each daughter cell immediately after mitosis and cytokinesis in a human somatic.', options: [
                { text: 'Each daughter cell has 46 chromosomes (2n) and 2C DNA content', outcome: 'Each daughter cell has 46 chromosomes (2n) and 2C DNA content.' },
                { text: 'growth by mitosis', outcome: 'Not quite — Students often think "growth by mitosis" means cells just get bigger (hypertrophy) or that repair.', reveals: 'growth-by-mitosis-means-cells' },
                { text: 'repair mitosis', outcome: 'Not quite — Students often think "growth by mitosis" means cells just get bigger (hypertrophy) or that repair.', reveals: 'growth-by-mitosis-means-cells' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_05_005', title: 'Meiosis I: Reductional Division and Prophase I Stages',
          caseStudy: { intro: 'Imagine you are comparing two siblings from the same parents — they share features but are not identical.',
            decisions: [{ prompt: 'What is the defining event that occurs during Pachytene of Prophase I, and what structure marks its occurrence?', options: [
                { text: 'The defining event of Pachytene is crossing over', outcome: 'The defining event of Pachytene is crossing over — the exchange of genetic material between.' },
                { text: 'pairing of homologous chromosomes', outcome: 'Not quite — Students often believe that "crossing over occurs between sister chromatids" because they confuse.', reveals: 'crossing-over-occurs-between-sister' },
                { text: 'condensation of chromosomes', outcome: 'Not quite — Students often believe that "crossing over occurs between sister chromatids" because they confuse.', reveals: 'crossing-over-occurs-between-sister' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_05_006', title: 'Meiosis II: Equational Division',
          caseStudy: { intro: 'Imagine you are tracking a single chromosome from your father\'s sperm formation.',
            decisions: [{ prompt: 'A student claims: "Meiosis II is exactly like mitosis because both separate sister chromatids." Is this statement correct?', options: [
                { text: 'The statement is incorrect', outcome: 'The statement is incorrect. Two key differences: (1) Meiosis II starts with haploid (n) chromosomes.' },
                { text: 'Meiosis II is just mitosis in haploid cells', outcome: 'Not quite — Students believe "Meiosis II is just mitosis in haploid cells" and that the four products.', reveals: 'meiosis-ii-is-just-mitosis' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'Cell Division and Cell Death (Apoptosis) · Part 1/2', spots: [
            { id: 's1', label: 'Cell Cycle Phases and Checkpoints', prompt: 'Which idea is this? — The cell cycle is an ordered sequence of events in which a eukaryotic cell grows.', answer: 'Cell Cycle Phases and Checkpoints', options: ['Cell Cycle Phases and Checkpoints', 'Interphase G1 S and G2 Phases', 'Mitosis Prophase Metaphase Anaphase and Telophase', 'Significance of Mitosis Growth and Repair'] },
            { id: 's2', label: 'Interphase G1 S and G2 Phases', prompt: 'Which idea is this? — Interphase is the preparatory phase of the cell cycle between two successive mitotic.', answer: 'Interphase G1 S and G2 Phases', options: ['Interphase G1 S and G2 Phases', 'Cell Cycle Phases and Checkpoints', 'Mitosis Prophase Metaphase Anaphase and Telophase', 'Significance of Mitosis Growth and Repair'] },
            { id: 's3', label: 'Mitosis Prophase Metaphase Anaphase and Telophase', prompt: 'Which idea is this? — Mitosis is an equational cell division process where a single diploid parent cell divides.', answer: 'Mitosis Prophase Metaphase Anaphase and Telophase', options: ['Mitosis Prophase Metaphase Anaphase and Telophase', 'Cell Cycle Phases and Checkpoints', 'Interphase G1 S and G2 Phases', 'Significance of Mitosis Growth and Repair'] },
            { id: 's4', label: 'Significance of Mitosis Growth and Repair', prompt: 'Which idea is this? — Mitosis is the equational division of a eukaryotic somatic cell that produces two.', answer: 'Significance of Mitosis Growth and Repair', options: ['Significance of Mitosis Growth and Repair', 'Cell Cycle Phases and Checkpoints', 'Interphase G1 S and G2 Phases', 'Mitosis Prophase Metaphase Anaphase and Telophase'] },
            { id: 's5', label: 'Meiosis I Reductional Division and Prophase I Stages', prompt: 'Which idea is this? — Meiosis I is the first of two consecutive nuclear divisions in meiosis, known.', answer: 'Meiosis I Reductional Division and Prophase I Stages', options: ['Meiosis I Reductional Division and Prophase I Stages', 'Cell Cycle Phases and Checkpoints', 'Interphase G1 S and G2 Phases', 'Mitosis Prophase Metaphase Anaphase and Telophase'] },
            { id: 's6', label: 'Meiosis II Equational Division', prompt: 'Which idea is this? — Meiosis II is the second consecutive nuclear division in meiosis where sister chromatids.', answer: 'Meiosis II Equational Division', options: ['Meiosis II Equational Division', 'Cell Cycle Phases and Checkpoints', 'Interphase G1 S and G2 Phases', 'Mitosis Prophase Metaphase Anaphase and Telophase'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re assisting a college cancer-biology lab that is screening a new drug on cultured cells. You notice treated cells accumulate in G2 with damaged DNA and never enter mitosis, while untreated cells zip through. A junior says: \'The drug must act during M phase — interphase is just the resting stage anyway, nothing important happens there.\'',
            decisions: [{ prompt: 'What\'s wrong with the junior\'s reasoning?', options: [
                { text: 'The drug likely works by triggering the G2/M checkpoint in response to DNA damage — and interphase is anything but resting: G1 builds mass and proteins, S replicates the entire genome, G2 verifies fidelity. Checkpoints sit inside interphase precisely because that\'s where the damage occurs and is detected.', outcome: 'Cell-cycle checkpoints are quality gates inside G1/S/G2; calling interphase \'resting\' hides where regulation actually happens.' },
                { text: 'Agreed — all the interesting events are in mitosis; G1, S and G2 are just the cell idling between divisions.', outcome: 'In a 24-hour cycle M takes about an hour; the other 23 hours replicate 6 billion base pairs and build the mitotic machinery — the busiest part of the cycle.', reveals: 'interphase-is-resting' },
                { text: 'The drug clearly acts in S phase — DNA damage can only happen while DNA is being copied.', outcome: 'DNA damage can arise in any phase (radiation, chemicals, stalled processes); the observed G2 accumulation points at the G2/M checkpoint checking replication fidelity, not at S phase itself.', reveals: 'damage-only-in-s-phase' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Life balances division and deletion — checkpoints decide which cells multiply and which quietly retire.',
            decisions: [{ prompt: 'What comes next? Cell Division and Cell Death (Apoptosis) · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Cell Division and Cell Death (Apoptosis) · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_001', difficulty: 'standard',
          question: 'The cell cycle is an ordered sequence of events in which a eukaryotic cell.',
          hint: 'Revisit Class 10 node c10_bio_cbse_04_005 (Sex Determination) and c9_bio_ch1_12 (Cell.',
          misconception: '**"Interphase is a \'resting phase\' where the cell is inactive."** Students confuse the historical term "resting phase".',
          parts: [
                { id: 'a', prompt: 'A student draws the cell cycle as a circle with four equal quadrants labeled G1, S, G2, M.', answer: 'The inaccuracy is depicting all phases as equal duration',
                  options: ['The inaccuracy is depicting all phases as equal duration', 'the order is wrong', 'Interphase is a \'resting phase\' where the cell is inactive', 'resting phase'],
                  hint: 'Revisit Class 10 node c10_bio_cbse_04_005 (Sex Determination) and c9_bio_ch1_12 (Cell Division).',
                  misconception: '**"Interphase is a \'resting phase\' where the cell is inactive."** Students confuse the historical term "resting phase" (coined because.' }
          ],
            remediations: { 'interphase-is-a-resting-phase': { steps: ['**Confront the term:** Write "RESTING PHASE" on board, cross it out, write "PREPARATION PHASE".', '**Quantify activity:** Ask: "If a cell divides in 24h and M phase is 1h, what happens in the other 23h?" List.', '**Map checkpoints to activity:** Show that G1/S checks *nutrients/size/DNA damage* before committing to the massive.', 'G2/M checks *replication fidelity* before the mechanical risk of mitosis.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**"Interphase is a \'resting phase\' where the cell is inactive."** Students confuse the historical term "resting phase".',
          parts: [
                { id: 'a', prompt: '"Checkpoints are fail-safe mechanisms that make the cell cycle error-proof." **Evaluate** this statement. Is it true, false, or conditionally true?', answer: '**Conditionally true / False in absolute terms.** Checkpoints are **surveillance',
                  options: ['**Conditionally true / False in absolute terms.** Checkpoints are **surveillance', 'Interphase is a \'resting phase\' where the cell is inactive', 'resting phase'],
                  hint: 'Revisit Class 10 node c10_bio_cbse_04_005 (Sex Determination) and c9_bio_ch1_12 (Cell Division).',
                  misconception: '**"Interphase is a \'resting phase\' where the cell is inactive."** Students confuse the historical term "resting phase" (coined because.' },
                { id: 'b', prompt: 'Design a **hypothetical experiment** using fluorescence microscopy (e.g., FUCCI system: red fluorescent protein in G1, green in S/G2/M) to visually distinguish.', answer: '**FUCCI System Logic:** Cdt1 (Red) accumulates in G1',
                  options: ['**FUCCI System Logic:** Cdt1 (Red) accumulates in G1', 'Interphase is a \'resting phase\' where the cell is inactive', 'resting phase'],
                  hint: 'Revisit Class 10 node c10_bio_cbse_04_005 (Sex Determination) and c9_bio_ch1_12 (Cell Division).',
                  misconception: '**"Interphase is a \'resting phase\' where the cell is inactive."** Students confuse the historical term "resting phase" (coined because.' }
          ],
            remediations: { 'interphase-is-a-resting-phase': { steps: ['**Confront the term:** Write "RESTING PHASE" on board, cross it out, write "PREPARATION PHASE".', '**Quantify activity:** Ask: "If a cell divides in 24h and M phase is 1h, what happens in the other 23h?" List.', '**Map checkpoints to activity:** Show that G1/S checks *nutrients/size/DNA damage* before committing to the massive.', 'G2/M checks *replication fidelity* before the mechanical risk of mitosis.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_002', difficulty: 'standard',
          question: 'Interphase is the preparatory phase of the cell cycle between two successive.',
          hint: 'Revisit Class 9 node c9_bio_ch1_5 (Nucleus: Structure and Functions) and Class 11 node.',
          misconception: 'Students believe "chromosome number doubles during S phase" because they see replicated chromosomes as "two.',
          parts: [
                { id: 'a', prompt: 'State the DNA content (C-value) and chromosome number (n-value) of a human somatic cell at the start of G1, at the end of S phase, and at the end of G2 phase.', answer: 'Start of G1: 2C DNA, 2n chromosomes (46 chromosomes, each with one chromatid)',
                  options: ['Start of G1: 2C DNA, 2n chromosomes (46 chromosomes, each with one chromatid)', 'chromosome number doubles during S phase', 'two chromosomes', 'chromosome number becomes 4n after S phase'],
                  hint: 'Revisit Class 9 node c9_bio_ch1_5 (Nucleus: Structure and Functions) and Class 11 node.',
                  misconception: 'Students believe "chromosome number doubles during S phase" because they see replicated chromosomes as "two chromosomes." They count.' },
                { id: 'b', prompt: 'A student claims: "During S phase, the chromosome number doubles from 46 to 92 because DNA replicates." Explain why this statement is incorrect using the.', answer: 'A chromosome is defined by its centromere',
                  options: ['A chromosome is defined by its centromere', 'chromosome number doubles during S phase', 'two chromosomes'],
                  hint: 'Revisit Class 9 node c9_bio_ch1_5 (Nucleus: Structure and Functions) and Class 11 node.',
                  misconception: 'Students believe "chromosome number doubles during S phase" because they see replicated chromosomes as "two chromosomes." They count.' },
                { id: 'c', prompt: 'A cultured human fibroblast is treated with a drug that irreversibly inhibits DNA polymerase α at the start of S phase.', answer: 'DNA content remains 2C (no replication)',
                  options: ['DNA content remains 2C (no replication)', 'chromosome number doubles during S phase', 'two chromosomes'],
                  hint: 'Revisit Class 9 node c9_bio_ch1_5 (Nucleus: Structure and Functions) and Class 11 node.',
                  misconception: 'Students believe "chromosome number doubles during S phase" because they see replicated chromosomes as "two chromosomes." They count.' }
          ],
            remediations: { 'chromosome-number-doubles-during-s': { steps: ['Draw a single chromosome before S phase (one centromere, one chromatid) and after S phase (one centromere, two sister.', 'Count centromeres in both drawings—emphasize "one centromere = one chromosome."', 'Practice NCERT-style question: "Chromosome number remains 2n in S phase; only DNA content changes from 2C to 4C."', 'Use the mnemonic "Centromere Counts, Chromatids Copy" to lock the distinction.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_003', difficulty: 'standard',
          question: 'Mitosis is an equational cell division process where a single diploid parent.',
          hint: 'Revisit c11_biotech_cbse_05_002 (Interphase: S phase) — specifically the outcome of DNA.',
          misconception: 'Students believe that "chromosomes line up at the metaphase plate because spindle fibers push them there." The error.',
          parts: [
                { id: 'a', prompt: 'A student observes a cell under the microscope where chromosomes appear as thin, long threads and the nuclear envelope is still intact.', answer: 'The cell is in early prophase',
                  options: ['The cell is in early prophase', 'metaphase', 'interphase', 'Spindle fibers grow longer and push chromosomes to the middle'],
                  hint: 'Revisit c11_biotech_cbse_05_002 (Interphase: S phase) — specifically the outcome of DNA replication.',
                  misconception: 'Students believe that "chromosomes line up at the metaphase plate because spindle fibers push them there." The error: they think.' },
                { id: 'b', prompt: 'A researcher treats dividing cells with a drug that prevents microtubule polymerization.', answer: 'Cells will arrest in prometaphase/metaphase transition',
                  options: ['Cells will arrest in prometaphase/metaphase transition', 'prophase arrest', 'anaphase arrest', 'Spindle fibers grow longer and push chromosomes to the middle'],
                  hint: 'Revisit c11_biotech_cbse_05_002 (Interphase: S phase) — specifically the outcome of DNA replication.',
                  misconception: 'Students believe that "chromosomes line up at the metaphase plate because spindle fibers push them there." The error: they think.' }
          ],
            remediations: { 'chromosomes-line-up-at-the': { steps: ['Show a live-cell imaging video (e.g., GFP-tubulin + mCherry-H2B) of mitosis — pause at metaphase and ask: "Are.', 'Use a physical model: attach two strings (microtubules) to a central ring (kinetochore); pull both strings equally.', 'Explain: "Alignment is tug-of-war equilibrium, not pushing." 4.', 'Have student redraw metaphase with arrows showing microtubule depolymerization at kinetochores generating poleward.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_004', difficulty: 'standard',
          question: 'Mitosis is the equational division of a eukaryotic somatic cell that produces.',
          hint: 'Review c11_biotech_cbse_05_003 anaphase: sister chromatids separate, each becoming.',
          misconception: 'Students often think "growth by mitosis" means cells just get bigger (hypertrophy) or that repair uses a special.',
          parts: [
                { id: 'a', prompt: 'State the chromosome number and DNA content (C-value) of each daughter cell immediately after mitosis and cytokinesis in a human somatic cell that started G1.', answer: 'Each daughter cell has 46 chromosomes (2n) and 2C DNA content',
                  options: ['Each daughter cell has 46 chromosomes (2n) and 2C DNA content', 'growth by mitosis', 'repair mitosis'],
                  hint: 'Review c11_biotech_cbse_05_003 anaphase: sister chromatids separate, each becoming a chromosome.',
                  misconception: 'Students often think "growth by mitosis" means cells just get bigger (hypertrophy) or that repair uses a special "repair mitosis" different.' },
                { id: 'b', prompt: 'A patient receives a skin graft from an identical twin. The graft survives without immunosuppression.', answer: 'Autograft: yes (identical genome)',
                  options: ['Autograft: yes (identical genome)', 'growth by mitosis', 'repair mitosis'],
                  hint: 'Review c11_biotech_cbse_05_003 anaphase: sister chromatids separate, each becoming a chromosome.',
                  misconception: 'Students often think "growth by mitosis" means cells just get bigger (hypertrophy) or that repair uses a special "repair mitosis" different.' },
                { id: 'c', prompt: 'Compare the role of mitosis in planarian regeneration (neoblast-driven) versus human liver regeneration (hepatocyte proliferation).', answer: 'Similarity: both rely on mitosis of somatic cells to restore tissue mass',
                  options: ['Similarity: both rely on mitosis of somatic cells to restore tissue mass', 'growth by mitosis', 'repair mitosis'],
                  hint: 'Review c11_biotech_cbse_05_003 anaphase: sister chromatids separate, each becoming a chromosome.',
                  misconception: 'Students often think "growth by mitosis" means cells just get bigger (hypertrophy) or that repair uses a special "repair mitosis" different.' }
          ],
            remediations: { 'growth-by-mitosis-means-cells': { steps: ['Revisit c11_biotech_cbse_05_003: list the 4 mitotic stages and identify where chromosome number is conserved (anaphase.', 'Use a pipe-cleaner model: duplicate chromosomes (S phase), align (metaphase), separate sisters (anaphase), reform.', 'Count chromosomes at each step — always 46.', 'Contrast with meiosis I (homologue separation) using the same model.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_005', difficulty: 'standard',
          question: 'Meiosis I is the first of two consecutive nuclear divisions in meiosis, known.',
          hint: 'If stuck, revisit the mitosis stages in c11_biotech_cbse_05_003 (especially metaphase.',
          misconception: 'Students often believe that "crossing over occurs between sister chromatids" because they confuse the term \'chromatid\'.',
          parts: [
                { id: 'a', prompt: 'What is the defining event that occurs during Pachytene of Prophase I, and what structure marks its occurrence?', answer: 'The defining event of Pachytene is crossing over',
                  options: ['The defining event of Pachytene is crossing over', 'pairing of homologous chromosomes', 'condensation of chromosomes', 'crossing over occurs between sister chromatids'],
                  hint: 'If stuck, revisit the mitosis stages in c11_biotech_cbse_05_003 (especially metaphase alignment and.',
                  misconception: 'Students often believe that "crossing over occurs between sister chromatids" because they confuse the term \'chromatid\' with \'chromosome\'.' }
          ],
            remediations: { 'crossing-over-occurs-between-sister': { steps: ['Use a physical model (pipe cleaners of two colors for maternal/paternal chromosomes) to show that each chromosome has.', 'Demonstrate synapsis by pairing the two homologous pipe cleaners.', 'Show crossing over by twisting and exchanging segments between non-sister chromatids (one from each homologue).', 'Explicitly state: "Sister chromatids are identical copies — crossing over between them would create no new combination.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_006', difficulty: 'standard',
          question: 'Meiosis II is the second consecutive nuclear division in meiosis where sister.',
          hint: 'Revisit c11_biotech_cbse_05_003 (Mitosis) for sister chromatid separation mechanics, and.',
          misconception: 'Students believe "Meiosis II is just mitosis in haploid cells" and that the four products of meiosis are genetically.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Meiosis II is exactly like mitosis because both separate sister chromatids." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'Meiosis II is just mitosis in haploid cells'],
                  hint: 'Revisit c11_biotech_cbse_05_003 (Mitosis) for sister chromatid separation mechanics, and.',
                  misconception: 'Students believe "Meiosis II is just mitosis in haploid cells" and that the four products of meiosis are genetically identical except for.' },
                { id: 'b', prompt: 'During Metaphase II of human spermatogenesis, a secondary spermatocyte contains 23 chromosomes.', answer: 'At Metaphase II: 23 chromosomes × 2 chromatids each = 46 DNA molecules',
                  options: ['At Metaphase II: 23 chromosomes × 2 chromatids each = 46 DNA molecules', 'Meiosis II is just mitosis in haploid cells', '23 DNA molecules at Metaphase II'],
                  hint: 'Revisit c11_biotech_cbse_05_003 (Mitosis) for sister chromatid separation mechanics, and.',
                  misconception: 'Students believe "Meiosis II is just mitosis in haploid cells" and that the four products of meiosis are genetically identical except for.' },
                { id: 'c', prompt: 'A cell in Prophase II has 14 chromosomes. The organism is diploid with 2n=28. Trace this cell back to the zygote: How many chromosomes did the zygote have?', answer: 'Zygote: 2n=28 chromosomes (14 homologous pairs)',
                  options: ['Zygote: 2n=28 chromosomes (14 homologous pairs)', 'Meiosis II is just mitosis in haploid cells'],
                  hint: 'Revisit c11_biotech_cbse_05_003 (Mitosis) for sister chromatid separation mechanics, and.',
                  misconception: 'Students believe "Meiosis II is just mitosis in haploid cells" and that the four products of meiosis are genetically identical except for.' },
                { id: 'd', prompt: 'Compare the kinetochore-microtubule attachment in Metaphase I vs. Metaphase II.', answer: 'Metaphase I: Sister kinetochores attach to microtubules from the SAME pole',
                  options: ['Metaphase I: Sister kinetochores attach to microtubules from the SAME pole', 'homologs separate in I, sisters separate in II', 'Meiosis II is just mitosis in haploid cells'],
                  hint: 'Revisit c11_biotech_cbse_05_003 (Mitosis) for sister chromatid separation mechanics, and.',
                  misconception: 'Students believe "Meiosis II is just mitosis in haploid cells" and that the four products of meiosis are genetically identical except for.' }
          ],
            remediations: { 'meiosis-ii-is-just-mitosis': { steps: ['Have the student draw a single replicated chromosome (two chromatids) with heterozygous alleles (e.g., A/a) and show.', 'Trace the four resulting chromatids through Meiosis I (homologs separate) and Meiosis II (sisters separate).', 'Ask: "Are the two chromatids of each chromosome still identical after crossing over?" 4.', 'Force the realization: Meiosis II separates NON-IDENTICAL sisters, creating recombinant chromatids as independent units.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
