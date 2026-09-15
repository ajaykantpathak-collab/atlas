import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch05_p2: SimDef = {
    id: 'v3_c11_biotech_ch05_p2',
    title: 'Cell Division and Cell Death (Apoptosis) · Part 2/2',
    subtitle: 'Walk the cell cycle, mitosis and meiosis, then meet programmed cell death.',
    classLevel: 11, subject: 'biotechnology', topic: 'Cell Division and Cell Death (Apoptosis) · Part 2/2',
    chapters: ['c11_biotech_ch05'],
    nodeIds: ['c11_biotech_cbse_05_007', 'c11_biotech_cbse_05_008', 'c11_biotech_cbse_05_009', 'c11_biotech_cbse_05_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a developmental biologist watching an embryo\'s fingers unsculpt', intro: 'Your body built itself partly by killing the right cells at the right time.', goal: 'Sequence cell cycle phases, distinguish mitosis from meiosis, and define apoptosis vs necrosis.' },
    discovery: {
        question: 'A tadpole loses its tail and a human embryo loses the webbing between fingers — yet no wound ever forms. The cells didn\'t die violently. What did they do?',
        options: ['They executed apoptosis — a programmed, tidy self-destruction the body schedules', 'They were eaten by immune cells invading the tissue', 'They migrated to other organs and changed identity', 'They simply stopped dividing and dissolved on their own'],
        answer: 'They executed apoptosis — a programmed, tidy self-destruction the body schedules',
        hook: 'Cell death can be a plan, not an accident — apoptosis sculpts the body the way a sculptor removes stone.',
    },
    teaching: [
        { title: 'Significance of Meiosis: Genetic Recombination and Variation', text: 'Meiosis is a specialized reductional division in germ cells that produces four genetically unique haploid gametes from a single diploid cell, ensuring species-specific chromosome number stability.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_05_007', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Track a cell through the cycle\'s checkpoints and compare clean apoptosis against messy necrosis.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_05_007', title: 'Significance of Meiosis: Genetic Recombination and Variation',
          caseStudy: { intro: 'Imagine you and your sibling have the same parents but look completely different — different eye colour, height, even blood type.',
            decisions: [{ prompt: 'What is the specific stage of meiosis where crossing over occurs, and between which chromatids does it take place?', options: [
                { text: 'Crossing over occurs during the **pachytene stage of Prophase I** and takes place between', outcome: 'Crossing over occurs during the **pachytene stage of Prophase I** and takes place between.' },
                { text: 'prophase II', outcome: 'Not quite — Students often believe that **crossing over occurs in Prophase II** (like mitotic prophase) or that.', reveals: 'crossing-over-occurs-in-prophase' },
                { text: 'between sister chromatids', outcome: 'Not quite — Students often believe that **crossing over occurs in Prophase II** (like mitotic prophase) or that.', reveals: 'crossing-over-occurs-in-prophase' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_05_008', title: 'Apoptosis: Mechanism and Pathways',
          caseStudy: { intro: 'Have you ever wondered how a tadpole loses its tail to become a frog, or how your fingers separated in the womb?',
            decisions: [{ prompt: 'What is the defining characteristic that distinguishes apoptosis from necrosis in terms of the cell\'s energy requirement and control?', options: [
                { text: 'Apoptosis is an energy-dependent (ATP-requiring), genetically controlled process, whereas', outcome: 'Apoptosis is an energy-dependent (ATP-requiring), genetically controlled process, whereas necrosis.' },
                { text: 'both are energy-independent', outcome: 'Not quite — Students often think apoptosis and necrosis are simply "two types of cell death" without.', reveals: 'apoptosis-and-necrosis-are-simply' },
                { text: 'apoptosis is uncontrolled', outcome: 'Not quite — Students often think apoptosis and necrosis are simply "two types of cell death" without.', reveals: 'apoptosis-and-necrosis-are-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_05_009', title: 'Necrosis vs Apoptosis: Comparison',
          caseStudy: { intro: 'Think about the last time you got a small cut on your finger – the skin cells at the injury site die messily, causing redness and swelling.',
            decisions: [{ prompt: 'Define apoptosis and necrosis in one sentence each, highlighting the fundamental difference in their initiation.', options: [
                { text: 'Apoptosis is a programmed, internally initiated suicide program requiring ATP', outcome: 'Apoptosis is a programmed, internally initiated suicide program requiring ATP; necrosis is.' },
                { text: 'both are cell death', outcome: 'Not quite — Students often believe apoptosis and necrosis are simply "two types of cell death" with overlapping.', reveals: 'apoptosis-and-necrosis-are-simply' },
                { text: 'two types of cell death', outcome: 'Not quite — Students often believe apoptosis and necrosis are simply "two types of cell death" with overlapping.', reveals: 'apoptosis-and-necrosis-are-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_05_010', title: 'Regulation of Cell Cycle: Cyclins and CDKs',
          caseStudy: { intro: 'Imagine a car engine (CDK) that cannot run without a specific gear (cyclin) engaged at the right moment; the cell cycle is the journey, and checkpoints are.',
            decisions: [{ prompt: 'Name the cyclin-CDK complex that is primarily responsible for phosphorylating the retinoblastoma protein (Rb) in mid-to-late G1 phase, and.', options: [
                { text: 'Correct answer: Cyclin D-CDK4/6 complex phosphorylates Rb in mid-to-late G1, leading to', outcome: 'Correct answer: Cyclin D-CDK4/6 complex phosphorylates Rb in mid-to-late G1, leading to partial.' },
                { text: 'Cyclin B binds CDK1 and activates it immediately at the G2/M boundary', outcome: 'Not quite — Students often believe that CDKs are *only* active when bound to cyclins, and that cyclin binding.', reveals: 'cdks-are-only-active-when' },
                { text: 'cyclin B-CDK1 or stating that Rb phosphorylation activates Rb', outcome: 'Not quite — Students often believe that CDKs are *only* active when bound to cyclins, and that cyclin binding.', reveals: 'cdks-are-only-active-when' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_05_008', title: 'Identify each idea',
          dissect: { specimen: 'Cell Division and Cell Death (Apoptosis) · Part 2/2', spots: [
            { id: 's1', label: 'Significance of Meiosis Genetic Recombination and Variation', prompt: 'Which idea is this? — Meiosis is a specialized reductional division in germ cells that produces four.', answer: 'Significance of Meiosis Genetic Recombination and Variation', options: ['Significance of Meiosis Genetic Recombination and Variation', 'Apoptosis Mechanism and Pathways', 'Necrosis vs Apoptosis Comparison', 'Regulation of Cell Cycle Cyclins and CDKs'] },
            { id: 's2', label: 'Apoptosis Mechanism and Pathways', prompt: 'Which idea is this? — Apoptosis is a genetically programmed, energy-dependent (ATP-requiring) process.', answer: 'Apoptosis Mechanism and Pathways', options: ['Apoptosis Mechanism and Pathways', 'Significance of Meiosis Genetic Recombination and Variation', 'Necrosis vs Apoptosis Comparison', 'Regulation of Cell Cycle Cyclins and CDKs'] },
            { id: 's3', label: 'Necrosis vs Apoptosis Comparison', prompt: 'Which idea is this? — Apoptosis is a genetically programmed, energy-dependent, and tightly regulated form.', answer: 'Necrosis vs Apoptosis Comparison', options: ['Necrosis vs Apoptosis Comparison', 'Significance of Meiosis Genetic Recombination and Variation', 'Apoptosis Mechanism and Pathways', 'Regulation of Cell Cycle Cyclins and CDKs'] },
            { id: 's4', label: 'Regulation of Cell Cycle Cyclins and CDKs', prompt: 'Which idea is this? — Cyclins are regulatory proteins whose concentrations oscillate cyclically during the cell.', answer: 'Regulation of Cell Cycle Cyclins and CDKs', options: ['Regulation of Cell Cycle Cyclins and CDKs', 'Significance of Meiosis Genetic Recombination and Variation', 'Apoptosis Mechanism and Pathways', 'Necrosis vs Apoptosis Comparison'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re assisting a college cancer-biology lab that is screening a new drug on cultured cells. You notice treated cells accumulate in G2 with damaged DNA and never enter mitosis, while untreated cells zip through. A junior says: \'The drug must act during M phase — interphase is just the resting stage anyway, nothing important happens there.\'',
            decisions: [{ prompt: 'What\'s wrong with the junior\'s reasoning?', options: [
                { text: 'The drug likely works by triggering the G2/M checkpoint in response to DNA damage — and interphase is anything but resting: G1 builds mass and proteins, S replicates the entire genome, G2 verifies fidelity. Checkpoints sit inside interphase precisely because that\'s where the damage occurs and is detected.', outcome: 'Cell-cycle checkpoints are quality gates inside G1/S/G2; calling interphase \'resting\' hides where regulation actually happens.' },
                { text: 'Agreed — all the interesting events are in mitosis; G1, S and G2 are just the cell idling between divisions.', outcome: 'In a 24-hour cycle M takes about an hour; the other 23 hours replicate 6 billion base pairs and build the mitotic machinery — the busiest part of the cycle.', reveals: 'interphase-is-resting' },
                { text: 'The drug clearly acts in S phase — DNA damage can only happen while DNA is being copied.', outcome: 'DNA damage can arise in any phase (radiation, chemicals, stalled processes); the observed G2 accumulation points at the G2/M checkpoint checking replication fidelity, not at S phase itself.', reveals: 'damage-only-in-s-phase' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_05_010', title: 'You made it',
          caseStudy: { intro: 'Life balances division and deletion — checkpoints decide which cells multiply and which quietly retire.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_007', difficulty: 'standard',
          question: 'Meiosis is a specialized reductional division in germ cells that produces four.',
          hint: 'If stuck, revisit c11_biotech_cbse_05_005 (Prophase I substages) and draw the.',
          misconception: 'Students often believe that **crossing over occurs in Prophase II** (like mitotic prophase) or that it happens.',
          parts: [
                { id: 'a', prompt: 'An organism has a diploid chromosome number of 2n = 8. Calculate the number of genetically distinct gamete types possible from independent assortment alone.', answer: 'Number of homologous pairs = n = 4',
                  options: ['Number of homologous pairs = n = 4', 'Crossing over in Prophase II creates variation between the four final cells'],
                  hint: 'If stuck, revisit c11_biotech_cbse_05_005 (Prophase I substages) and draw the synaptonemal complex.',
                  misconception: 'Students often believe that **crossing over occurs in Prophase II** (like mitotic prophase) or that it happens **between sister.' }
          ],
            remediations: { 'crossing-over-occurs-in-prophase': { steps: ['If the student holds this misconception: (1) Have them draw a single homologous pair (one maternal, one paternal.', '(2) Ask: "Where are the homologous chromosomes?', 'Where are the sister chromatids?" (3) Point out: At pachytene, homologs are paired → crossing over possible.', 'At Metaphase I, homologs are at the plate → independent assortment possible.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_008', difficulty: 'standard',
          question: 'Apoptosis is a genetically programmed, energy-dependent (ATP-requiring) process.',
          hint: 'If stuck, revisit mitochondrial structure (c9_bio_ch1_9) and the cell signaling.',
          misconception: 'Students often think apoptosis and necrosis are simply "two types of cell death" without recognizing that apoptosis.',
          parts: [
                { id: 'a', prompt: 'A researcher treats cells with a pan-caspase inhibitor (z-VAD-fmk) and then induces apoptosis via the intrinsic pathway using staurosporine.', answer: 'cytochrome c release from mitochondria, (',
                  options: ['cytochrome c release from mitochondria, (', 'two types of cell death', 'Apoptosis causes inflammation'],
                  hint: 'If stuck, revisit mitochondrial structure (c9_bio_ch1_9) and the cell signaling classification.',
                  misconception: 'Students often think apoptosis and necrosis are simply "two types of cell death" without recognizing that apoptosis is an active.' }
          ],
            remediations: { 'apoptosis-and-necrosis-are-simply': { steps: ['Have the student create a 6-row comparison table: Feature | Apoptosis | Necrosis.', 'Show time-lapse microscopy videos (or animations) of apoptosis (blebbing, apoptotic bodies) vs.', 'Ask: "Why does z-VAD-fmk block apoptotic body formation but not cytochrome c release?" to reinforce pathway hierarchy.', 'Assign case analysis: "Neurons in stroke (necrosis) vs. Alzheimer\'s (apoptosis) – explain the different triggers and.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think apoptosis and necrosis are simply "two types of cell death" without recognizing that apoptosis.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Since apoptosis eliminates damaged cells, a drug that globally enhances apoptosis would be an ideal universal cancer therapy." Provide.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'two types of cell death', 'Apoptosis causes inflammation'],
                  hint: 'If stuck, revisit mitochondrial structure (c9_bio_ch1_9) and the cell signaling classification.',
                  misconception: 'Students often think apoptosis and necrosis are simply "two types of cell death" without recognizing that apoptosis is an active.' }
          ],
            remediations: { 'apoptosis-and-necrosis-are-simply': { steps: ['Have the student create a 6-row comparison table: Feature | Apoptosis | Necrosis.', 'Show time-lapse microscopy videos (or animations) of apoptosis (blebbing, apoptotic bodies) vs.', 'Ask: "Why does z-VAD-fmk block apoptotic body formation but not cytochrome c release?" to reinforce pathway hierarchy.', 'Assign case analysis: "Neurons in stroke (necrosis) vs. Alzheimer\'s (apoptosis) – explain the different triggers and.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_009', difficulty: 'standard',
          question: 'Apoptosis is a genetically programmed, energy-dependent, and tightly regulated.',
          hint: 'Revisit c11_biotech_cbse_05_008 and focus on the ATP requirement for apoptosome formation.',
          misconception: 'Students often believe apoptosis and necrosis are simply "two types of cell death" with overlapping features, leading.',
          parts: [
                { id: 'a', prompt: 'Define apoptosis and necrosis in one sentence each, highlighting the fundamental difference in their initiation.', answer: 'Apoptosis is a programmed, internally initiated suicide program requiring ATP',
                  options: ['Apoptosis is a programmed, internally initiated suicide program requiring ATP', 'both are cell death', 'two types of cell death', 'necrosis also has blebbing'],
                  hint: 'Revisit c11_biotech_cbse_05_008 and focus on the ATP requirement for apoptosome formation and the.',
                  misconception: 'Students often believe apoptosis and necrosis are simply "two types of cell death" with overlapping features, leading them to claim.' },
                { id: 'b', prompt: 'A cell culture is treated with a metabolic inhibitor that completely blocks ATP synthesis.', answer: 'Early apoptotic markers (condensation, laddering) appear',
                  options: ['Early apoptotic markers (condensation, laddering) appear', 'two types of cell death', 'necrosis also has blebbing', 'apoptosis can cause inflammation if not cleared'],
                  hint: 'Revisit c11_biotech_cbse_05_008 and focus on the ATP requirement for apoptosome formation and the.',
                  misconception: 'Students often believe apoptosis and necrosis are simply "two types of cell death" with overlapping features, leading them to claim.' }
          ],
            remediations: { 'apoptosis-and-necrosis-are-simply': { steps: ['Show side-by-side time-lapse videos of apoptotic vs.', 'necrotic cells; pause at 30 min, 2 h, 6 h to highlight membrane dynamics.', 'Have students build a 7-column comparison table (Trigger, ATP, Caspases, DNA pattern, Membrane, Inflammation, Example).', 'Use a flowchart: "ATP present?'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_010', difficulty: 'standard',
          question: 'Cyclins are regulatory proteins whose concentrations oscillate cyclically.',
          hint: 'Revisit c11_biotech_cbse_05_001 (Cell Cycle: Phases and Checkpoints) and c9_bio_ch1_12.',
          misconception: 'Students often believe that CDKs are *only* active when bound to cyclins, and that cyclin binding alone fully activates.',
          parts: [
                { id: 'a', prompt: 'A researcher observes that a mammalian cell line arrests in G2 phase with high levels of cyclin B and CDK1 protein, but the CDK1 kinase activity remains low.', answer: 'Correct answer: CDK1 is likely maintained in an inactive state by inhibitory',
                  options: ['Correct answer: CDK1 is likely maintained in an inactive state by inhibitory', 'Cyclin B binds CDK1 and activates it immediately at the G2/M boundary'],
                  hint: 'Revisit c11_biotech_cbse_05_001 (Cell Cycle: Phases and Checkpoints) and c9_bio_ch1_12 (Cell.',
                  misconception: 'Students often believe that CDKs are *only* active when bound to cyclins, and that cyclin binding alone fully activates the kinase.' },
                { id: 'b', prompt: 'A mutation in the gene encoding p21^Cip1^ (a Cip/Kip family CKI) renders it unable to bind CDK2.', answer: 'Correct answer: The G1/S checkpoint will fail',
                  options: ['Correct answer: The G1/S checkpoint will fail', 'Cyclin B binds CDK1 and activates it immediately at the G2/M boundary'],
                  hint: 'Revisit c11_biotech_cbse_05_001 (Cell Cycle: Phases and Checkpoints) and c9_bio_ch1_12 (Cell.',
                  misconception: 'Students often believe that CDKs are *only* active when bound to cyclins, and that cyclin binding alone fully activates the kinase.' }
          ],
            remediations: { 'cdks-are-only-active-when': { steps: ['If a student exhibits this misconception, do the following: (1) Draw a three-step activation flowchart on the board.', '(2) Use the analogy of a car: cyclin = key inserted, CAK phosphorylation = turning the key to "on", Cdc25 action.', '(3) Give a mini-case: "A cell has high cyclin B and CDK1 protein in G2, but Wee1 is overactive.', 'What is the CDK1 activity state?'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
