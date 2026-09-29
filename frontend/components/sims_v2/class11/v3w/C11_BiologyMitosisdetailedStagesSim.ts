import type { SimDef } from '../../engine/types';
import C11_BiologyMitosisdetailedStagesSim from '../../../simulations/c6_12/C11_BiologyMitosisdetailedStagesSim';

/** v3 wrapped master — C11_BiologyMitosisdetailedStagesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biologymitosisdetailedstagessim: SimDef = {
    id: 'v3w_c11_biologymitosisdetailedstagessim',
    title: 'Cell Cycle: Phases and Duration',
    subtitle: 'Covers the definition, phases, and typical duration of the eukaryotic cell cycle as per.',
    classLevel: 11, subject: 'biology', topic: 'Cell Cycle: Phases and Duration',
    chapters: [],
    nodeIds: ['c11_bio_cbse_10_001', 'c11_bio_cbse_10_004', 'c11_bio_cbse_10_005', 'c11_bio_cbse_10_006', 'c11_bio_cbse_10_002', 'c11_bio_cbse_10_003', 'c11_bio_cbse_10_007', 'c11_bio_cbse_02_004', 'c11_bio_cbse_08_009', 'c11_bio_cbse_04_006', 'c11_bio_cbse_04_014', 'c11_bio_cbse_12_001', 'c11_bio_cbse_11_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe a healing skin wound: new cells appear daily to close the gap.', goal: 'Master Cell Cycle: Phases and Duration.' },
    discovery: {
        question: 'What are the two main phases of the cell cycle, and which phase occupies more than 95% of the total cycle duration in a typical human cell?',
        options: ['The two main phases are Interphase and M Phase', 'M Phase is longer', 'Interphase is a resting phase where nothing happens'],
        answer: 'The two main phases are Interphase and M Phase',
        hook: 'Students think "Interphase is a resting phase where nothing happens" because the nucleus looks calm.',
    },
    teaching: [
        { title: 'The cell cycle is an ordered sequence of.', text: 'The cell cycle is an ordered sequence of events in which a eukaryotic cell duplicates its genome, synthesizes other cellular constituents, and divides into two genetically identical daughter cells,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bio_cbse_10_001', title: 'The cell cycle is an ordered sequence.',
          scaffold: { problem: 'A human fibroblast in culture has a 24-hour cell cycle. If the S phase lasts 8 hours, G2 lasts 4 hours, and M phase lasts 1 hour, calculate.',
            steps: [
            { text: 'Recall total cycle = G1 + S + G2 + M. Substitute known values: 24 h = G1 + 8 h + 4 h + 1 h.' },
            { text: 'Solve for G1: G1 = 24 - 13 = 11 hours.' },
            { text: 'Recognize G1 is the primary growth and decision phase where cells assess size, nutrients, and signals before committing.' },
            { text: 'Connect variability: differentiated cells (neurons) exit to G0 (infinite G1), stem cells have short G1, cancer cells.' },
            { text: 'Conclude G1 duration reflects the cell\'s integration of external/internal cues, making it the main regulatory.', faded: true, blankAnswer: 'G1 = 11 hours. G1 varies because it integrates growth.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_10_004', title: 'Metaphase, anaphase, and telophase are.',
          scaffold: { problem: 'An onion root tip cell has 16 chromosomes in G1. The cell is observed in metaphase. How many centromeres are visible?',
            steps: [
            { text: 'Recall that G1 chromosome number = 16 (2N = 16). DNA content = 2C.' },
            { text: 'After S phase, DNA replicates. Each chromosome now has two sister chromatids, but centromere number remains 16.' },
            { text: 'In metaphase, chromosomes are maximally condensed and aligned.' },
            { text: 'Each chromatid is one DNA molecule. 16 chromosomes × 2 chromatids = 32 DNA molecules.' },
            { text: 'In anaphase, centromeres split → 16 daughter chromosomes move to each pole.', faded: true, blankAnswer: 'Centromeres visible in metaphase = 16. DNA molecules.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_10_005', title: 'Mitosis is an equational cell division.',
          scaffold: { problem: 'A Class 11 student observes that a skin cut heals in 5-7 days but a spinal cord injury causes permanent paralysis.',
            steps: [
            { text: 'Identify the tissues involved — skin epidermis (stratified squamous epithelium) vs. spinal cord (nervous tissue).' },
            { text: 'Recall mitotic capacity — epidermal basal layer cells are stem-like, continuously dividing (mitotically active); mature.' },
            { text: 'Apply nucleo-cytoplasmic ratio principle — skin cells divide to replace lost cells, restoring ratio; neurons cannot.' },
            { text: 'Consider repair mechanism — skin heals by regeneration (mitosis); spinal cord heals by gliosis (glial scar, no neuronal.' },
            { text: 'Conclude — Mitosis enables repair only in tissues with retained mitotic capacity; permanent tissues lack this.', faded: true, blankAnswer: 'Skin heals by mitotic regeneration of epidermal stem cells;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_10_006', title: 'Meiosis I is the reductional division.',
          scaffold: { problem: 'In a diploid organism with 2n = 12 chromosomes, a primary spermatocyte enters Meiosis I.',
            steps: [
            { text: 'Identify starting condition: Primary spermatocyte is diploid (2n = 12) and has completed S phase, so each of the 12.' },
            { text: 'Recall Meiosis I is reductional: homologous chromosomes separate, sister chromatids do not.' },
            { text: 'Since each chromosome still has two chromatids, DNA content per cell = half of 4C = 2C.' },
            { text: 'Verify: Total DNA conserved (2 cells × 2C = 4C). Chromosome number halved (12 → 6).' },
            { text: 'State final answer: Each secondary spermatocyte has n = 6 chromosomes and 2C DNA content.', faded: true, blankAnswer: 'Each secondary spermatocyte contains 6 chromosomes (n = 6).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_10_002', title: 'Interphase is the longest phase of the.',
          scaffold: { problem: 'A maize (corn) root tip cell has 20 chromosomes in G1. Determine the chromosome number and DNA content (in C-value) at the end of G1, end.',
            steps: [
            { text: 'Identify starting values: G1 chromosome number = 20 (2n), DNA content = 2C (by definition of 2C as G1 DNA amount).' },
            { text: 'Recall S phase event: DNA replication occurs, each chromosome duplicates its DNA to form two sister chromatids joined.' },
            { text: 'Apply centromere-count rule: chromosome number = number of centromeres.' },
            { text: 'Track DNA content: DNA doubles during S phase, so end of S = 4C. No further DNA synthesis in G2, so end of G2 = 4C.' },
            { text: 'Summarize in a table: G1: 20 chromosomes, 2C; S: 20 chromosomes, 4C; G2: 20 chromosomes, 4C.', faded: true, blankAnswer: 'End of G1: 20 chromosomes, 2C. End of S: 20 chromosomes,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_10_003', title: 'Prophase is the first stage of.',
          scaffold: { problem: 'An onion root tip cell has 16 chromosomes in G1. Determine the chromosome number (n) and DNA content (C) at late prophase.',
            steps: [
            { text: 'Identify G1 values: chromosome number = 2n = 16, DNA content = 2C (given).' },
            { text: 'Recall S phase: DNA replication occurs, centrioles duplicate. DNA content doubles from 2C to 4C.' },
            { text: 'Recall G2 phase: no DNA replication, cell grows, synthesizes mitotic proteins. Values unchanged: 2n = 16, 4C.' },
            { text: 'Prophase: chromatin condenses into visible chromosomes (each still two chromatids at one centromere).' },
            { text: 'Conclude: at late prophase, chromosome number = 16 (2n), DNA content = 4C.', faded: true, blankAnswer: 'Late prophase: chromosome number = 16 (2n), DNA content =.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_10_004', title: 'Identify each idea',
          dissect: { specimen: 'Cell Cycle: Phases and Duration', spots: [
            { id: 's1', label: 'The cell cycle is an', prompt: 'Which idea is this? — The cell cycle is an ordered sequence of events in which a eukaryotic cell duplicates its.', answer: 'The cell cycle is an', options: ['The cell cycle is an', 'Metaphase anaphase and telophase are', 'Mitosis is an equational cell', 'Meiosis I is the reductional'] },
            { id: 's2', label: 'Metaphase anaphase and telophase are', prompt: 'Which idea is this? — Metaphase, anaphase, and telophase are the three sequential stages of karyokinesis.', answer: 'Metaphase anaphase and telophase are', options: ['Metaphase anaphase and telophase are', 'The cell cycle is an', 'Mitosis is an equational cell', 'Meiosis I is the reductional'] },
            { id: 's3', label: 'Mitosis is an equational cell', prompt: 'Which idea is this? — Mitosis is an equational cell division process in which a single diploid parent cell.', answer: 'Mitosis is an equational cell', options: ['Mitosis is an equational cell', 'The cell cycle is an', 'Metaphase anaphase and telophase are', 'Meiosis I is the reductional'] },
            { id: 's4', label: 'Meiosis I is the reductional', prompt: 'Which idea is this? — Meiosis I is the reductional division in which homologous chromosomes separate, reducing.', answer: 'Meiosis I is the reductional', options: ['Meiosis I is the reductional', 'The cell cycle is an', 'Metaphase anaphase and telophase are', 'Mitosis is an equational cell'] },
            { id: 's5', label: 'Interphase is the longest phase', prompt: 'Which idea is this? — Interphase is the longest phase of the cell cycle where a eukaryotic cell prepares for.', answer: 'Interphase is the longest phase', options: ['Interphase is the longest phase', 'The cell cycle is an', 'Metaphase anaphase and telophase are', 'Mitosis is an equational cell'] },
            { id: 's6', label: 'Prophase is the first stage', prompt: 'Which idea is this? — Prophase is the first stage of karyokinesis in mitosis, following the S and G2 phases of.', answer: 'Prophase is the first stage', options: ['Prophase is the first stage', 'The cell cycle is an', 'Metaphase anaphase and telophase are', 'Mitosis is an equational cell'] }
          ] } }
    ],
    explore: { component: C11_BiologyMitosisdetailedStagesSim, prompt: 'Explore the interactive — Cell Cycle: Phases and Duration' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_001', difficulty: 'standard',
          question: 'The cell cycle is an ordered sequence of events in which a eukaryotic cell.',
          hint: 'Revisit Class 9 "Cell Division" (c9_bio_ch1_12) and Class 8 "Cell Structure".',
          misconception: 'Students think "Interphase is a resting phase where nothing happens" because the nucleus looks calm.',
          parts: [
                { id: 'a', prompt: 'What are the two main phases of the cell cycle, and which phase occupies more than 95% of the total cycle duration in a typical human cell?', answer: 'The two main phases are Interphase and M Phase',
                  options: ['The two main phases are Interphase and M Phase', 'M Phase is longer', 'Interphase is a resting phase where nothing happens'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "Interphase is a resting phase where nothing happens" because the nucleus looks calm.' },
                { id: 'b', prompt: 'A cell in G1 phase has 2n chromosomes and 2C DNA content. After S phase, the DNA content becomes 4C but the chromosome number remains 2n.', answer: 'Chromosome number (n) counts centromeres',
                  options: ['Chromosome number (n) counts centromeres', 'chromosomes double to 4n', 'Interphase is a resting phase where nothing happens'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "Interphase is a resting phase where nothing happens" because the nucleus looks calm.' },
                { id: 'c', prompt: 'Compare the fate of a liver cell (hepatocyte) and a cardiac muscle cell (cardiomyocyte) in an adult human with respect to the cell cycle.', answer: 'Hepatocytes are in G0 (quiescent) – they can re-enter G1 and divide upon injury',
                  options: ['Hepatocytes are in G0 (quiescent) – they can re-enter G1 and divide upon injury', 'resting', 'Interphase is a resting phase where nothing happens'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "Interphase is a resting phase where nothing happens" because the nucleus looks calm.' }
          ],
            remediations: { 'interphase-is-a-resting-phase': { steps: ['Show a time-lapse video of a cultured cell (e.g., HeLa) with fluorescent tubulin and histone tags – students see.', 'Have them list 5 metabolic processes occurring in G1 (e.g., ribosome biogenesis, ATP production, cyclin D synthesis).', 'Re-read NCERT line "interphase, though called the resting phase, is the time during which the cell is preparing for.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "Interphase is a resting phase where nothing happens" because the nucleus looks calm.',
          parts: [
                { id: 'a', prompt: 'A researcher claims: "Cytokinesis always follows karyokinesis, so the number of nuclei always equals the number of cells." Evaluate this statement with a.', answer: 'The statement is false',
                  options: ['The statement is false', 'Interphase is a resting phase where nothing happens', '"Interphase is a resting phase where nothing happens"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "Interphase is a resting phase where nothing happens" because the nucleus looks calm.' },
                { id: 'b', prompt: 'Design a simple experiment using onion root tips to demonstrate that Interphase lasts longer than M Phase.', answer: 'Stain root tip squash with acetocarmine or Feulgen',
                  options: ['Stain root tip squash with acetocarmine or Feulgen', 'Interphase is a resting phase where nothing happens', '"Interphase is a resting phase where nothing happens"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "Interphase is a resting phase where nothing happens" because the nucleus looks calm.' }
          ],
            remediations: { 'interphase-is-a-resting-phase': { steps: ['Show a time-lapse video of a cultured cell (e.g., HeLa) with fluorescent tubulin and histone tags – students see.', 'Have them list 5 metabolic processes occurring in G1 (e.g., ribosome biogenesis, ATP production, cyclin D synthesis).', 'Re-read NCERT line "interphase, though called the resting phase, is the time during which the cell is preparing for.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_004', difficulty: 'standard',
          question: 'Metaphase, anaphase, and telophase are the three sequential stages of.',
          hint: 'Review c11_bio_cbse_10_003 (Mitosis: Prophase) and c11_bio_cbse_10_002 (Interphase: S.',
          misconception: 'Students often think that in anaphase, chromosomes are "pulled by their arms" toward the poles.',
          parts: [
                { id: 'a', prompt: 'What is the defining event that marks the transition from metaphase to anaphase in mitosis?', answer: 'The splitting of centromeres',
                  options: ['The splitting of centromeres', 'alignment of chromosomes at the equator', 'disappearance of nuclear envelope'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in anaphase, chromosomes are "pulled by their arms" toward the poles.' },
                { id: 'b', prompt: 'Why do chromosomes align at the metaphase plate instead of remaining randomly scattered in the cytoplasm?', answer: 'Chromosomes align',
                  options: ['Chromosomes align', 'chromosomes are pushed by spindle fibres', 'they align due to cytoplasmic streaming'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in anaphase, chromosomes are "pulled by their arms" toward the poles.' },
                { id: 'c', prompt: 'A cell in metaphase has 46 chromosomes. How many chromosomes and how much DNA (in C-value) will be present in each daughter nucleus at the end of telophase?', answer: 'At metaphase, 46 chromosomes each consist of two sister chromatids (4C DNA)',
                  options: ['At metaphase, 46 chromosomes each consist of two sister chromatids (4C DNA)', 'pulled by their arms', 'in anaphase, chromosomes are "pulled by their arms" toward the poles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in anaphase, chromosomes are "pulled by their arms" toward the poles.' }
          ],
            remediations: { 'in-anaphase': { steps: ['Show a clear animated video of anaphase highlighting kinetochore microtubules shortening at the poleward end.', 'Have students draw anaphase chromosomes with centromeres at the leading edge and arms trailing.', 'Use a physical model: attach strings (spindle fibres) to the centre of a cardboard chromosome (centromere) and pull —.', 'Ask students to explain why the centromere must lead (it is the attachment point for force generation).'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that in anaphase, chromosomes are "pulled by their arms" toward the poles.',
          parts: [
                { id: 'a', prompt: 'A researcher treats dividing cells with a drug that prevents spindle fibre formation.', answer: 'Mitosis will arrest at metaphase',
                  options: ['Mitosis will arrest at metaphase', 'prophase', 'anaphase', 'pulled by their arms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in anaphase, chromosomes are "pulled by their arms" toward the poles.' }
          ],
            remediations: { 'in-anaphase': { steps: ['Show a clear animated video of anaphase highlighting kinetochore microtubules shortening at the poleward end.', 'Have students draw anaphase chromosomes with centromeres at the leading edge and arms trailing.', 'Use a physical model: attach strings (spindle fibres) to the centre of a cardboard chromosome (centromere) and pull —.', 'Ask students to explain why the centromere must lead (it is the attachment point for force generation).'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_005', difficulty: 'standard',
          question: 'Mitosis is an equational cell division process in which a single diploid parent.',
          hint: 'Revisit c11_bio_cbse_10_004 (anaphase-telophase) to confirm sister chromatid separation.',
          misconception: 'Students believe mitosis occurs in all living cells of an organism throughout life.',
          parts: [
                { id: 'a', prompt: 'State the chromosome number and DNA content in daughter cells immediately after mitosis if the parent cell was diploid (2n) with 2C DNA content at G1.', answer: 'Daughter cells are diploid (2n) with 2C DNA content',
                  options: ['Correct answer: Daughter cells are diploid (2n) with 2C DNA content', 'mitosis occurs in all living cells of an organism throughout life'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe mitosis occurs in all living cells of an organism throughout life.' },
                { id: 'b', prompt: 'A farmer notices that the sugarcane crop in his field regrows after harvesting the upper stalks.', answer: 'Intercalary meristem at the nodes',
                  options: ['Correct answer: Intercalary meristem at the nodes', 'mitosis occurs in all living cells of an organism throughout life'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe mitosis occurs in all living cells of an organism throughout life.' },
                { id: 'c', prompt: 'Compare the role of mitosis in human skin epithelium versus honeybee drone (male) development. What fundamental difference in ploidy exists?', answer: 'Human skin mitosis occurs in diploid somatic cells (2n → 2n)',
                  options: ['Correct answer: Human skin mitosis occurs in diploid somatic cells (2n → 2n)', 'mitosis occurs in all living cells of an organism throughout life'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe mitosis occurs in all living cells of an organism throughout life.' }
          ],
            remediations: { 'mitosis-occurs-in-all-living': { steps: ['Show prepared slides of onion root tip (meristem) vs. mature leaf epidermis — identify mitotic figures only in root tip.', 'Use EdU/BrdU labeling concept: pulse-chase experiment in mice shows labeling only in intestinal crypts and bone marrow,.', 'Relate to G0 concept from c11_bio_cbse_10_001 — cells in G0 have withdrawn from cycle.', 'Write a comparison table: "Mitotically active tissues" vs. "Post-mitotic tissues" in animals and plants.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe mitosis occurs in all living cells of an organism throughout life.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Mitosis alone is sufficient for the long-term survival of a multicellular species." Justify your answer.', answer: 'False',
                  options: ['Correct answer: False', 'mitosis occurs in all living cells of an organism throughout life'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe mitosis occurs in all living cells of an organism throughout life.' }
          ],
            remediations: { 'mitosis-occurs-in-all-living': { steps: ['Show prepared slides of onion root tip (meristem) vs. mature leaf epidermis — identify mitotic figures only in root tip.', 'Use EdU/BrdU labeling concept: pulse-chase experiment in mice shows labeling only in intestinal crypts and bone marrow,.', 'Relate to G0 concept from c11_bio_cbse_10_001 — cells in G0 have withdrawn from cycle.', 'Write a comparison table: "Mitotically active tissues" vs. "Post-mitotic tissues" in animals and plants.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_006', difficulty: 'standard',
          question: 'Meiosis I is the reductional division in which homologous chromosomes separate,.',
          hint: 'Revisit c11_bio_cbse_10_002 (S phase DNA replication) and c9_bio_ch1_12 (basic meiosis.',
          misconception: 'Students often think "crossing over occurs in metaphase I because that\'s when chromosomes are aligned" or "chiasmata.',
          parts: [
                { id: 'a', prompt: 'Name the five sequential sub-stages of Prophase I and state the one defining chromosomal event that characterises each sub-stage.', answer: 'Leptotene: chromosomes become visible as thin threads',
                  options: ['Leptotene: chromosomes become visible as thin threads', 'crossing over in zygotene', 'chiasmata in pachytene'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "crossing over occurs in metaphase I because that\'s when chromosomes are aligned" or "chiasmata are the sites where.' }
          ],
            remediations: { 'crossing-over-occurs-in-metaphase': { steps: ['Draw a timeline of Prophase I sub-stages on paper, labeling each with its key event (synapsis → crossing over →.', 'Use two different coloured pens to represent paternal and maternal chromatids; physically model crossing over by.', 'Verify that chiasmata appear only after synaptonemal complex removal (diplotene).', 'Contrast with a separate diagram of Metaphase I showing kinetochores on centromeres (spindle attachment) versus.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "crossing over occurs in metaphase I because that\'s when chromosomes are aligned" or "chiasmata.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since crossing over occurs in pachytene, chiasmata should be visible in pachytene." Evaluate this statement and explain why chiasmata become.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'crossing over occurs in metaphase I', 'chiasmata are the sites where chromosomes attach to spindle fibres', 'crossing over happens at the metaphase plate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "crossing over occurs in metaphase I because that\'s when chromosomes are aligned" or "chiasmata are the sites where.' }
          ],
            remediations: { 'crossing-over-occurs-in-metaphase': { steps: ['Draw a timeline of Prophase I sub-stages on paper, labeling each with its key event (synapsis → crossing over →.', 'Use two different coloured pens to represent paternal and maternal chromatids; physically model crossing over by.', 'Verify that chiasmata appear only after synaptonemal complex removal (diplotene).', 'Contrast with a separate diagram of Metaphase I showing kinetochores on centromeres (spindle attachment) versus.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_002', difficulty: 'standard',
          question: 'Interphase is the longest phase of the cell cycle where a eukaryotic cell.',
          hint: 'Review Class 9 node c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) and Class 10 node.',
          misconception: 'Students often think that after S phase the chromosome number becomes 4n (e.g., 92 in humans) because "DNA doubled.".',
          parts: [
                { id: 'a', prompt: 'A student claims: "During S phase, the chromosome number doubles from 2n to 4n because DNA replicates." Explain why this statement is incorrect using the.', answer: 'Chromosome number (n) counts centromeres',
                  options: ['Chromosome number (n) counts centromeres', 'DNA doubled', 'after S phase the chromosome number becomes 4n (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that after S phase the chromosome number becomes 4n (e.g., 92 in humans) because "DNA doubled." They confuse the.' },
                { id: 'b', prompt: 'A human skin cell in G1 has 46 chromosomes and 2C DNA content. Predict the chromosome number and DNA content at the end of S phase and at the end of G2 phase.', answer: 'End of S phase: 46 chromosomes (2n), 4C DNA',
                  options: ['End of S phase: 46 chromosomes (2n), 4C DNA', 'DNA doubled', 'after S phase the chromosome number becomes 4n (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that after S phase the chromosome number becomes 4n (e.g., 92 in humans) because "DNA doubled." They confuse the.' }
          ],
            remediations: { 'after-s-phase-the-chromosome': { steps: ['Draw a single chromosome in G1 (one chromatid, one centromere) and after S phase (two chromatids, one centromere).', 'Count centromeres in both drawings – the number is unchanged.', 'Define chromosome number as centromere number.', 'Practice with NCERT Exercise Question 16: track N and C values through the cycle until the distinction becomes.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that after S phase the chromosome number becomes 4n (e.g., 92 in humans) because "DNA doubled.".',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Neurons and cardiac muscle cells are permanently stuck in G1 phase because they cannot divide." Is this accurate?', answer: 'The claim is inaccurate',
                  options: ['The claim is inaccurate', 'DNA doubled', 'after S phase the chromosome number becomes 4n (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that after S phase the chromosome number becomes 4n (e.g., 92 in humans) because "DNA doubled." They confuse the.' }
          ],
            remediations: { 'after-s-phase-the-chromosome': { steps: ['Draw a single chromosome in G1 (one chromatid, one centromere) and after S phase (two chromatids, one centromere).', 'Count centromeres in both drawings – the number is unchanged.', 'Define chromosome number as centromere number.', 'Practice with NCERT Exercise Question 16: track N and C values through the cycle until the distinction becomes.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_003', difficulty: 'standard',
          question: 'Prophase is the first stage of karyokinesis in mitosis, following the S and G2.',
          hint: 'Review c11_bio_cbse_10_002 (Interphase: G1, S, G2 Phases) focusing on S-phase DNA.',
          misconception: 'Students think "chromosomes replicate in prophase" because they see double-structured chromosomes (two chromatids).',
          parts: [
                { id: 'a', prompt: 'Explain why chromosomes become visible only during prophase even though DNA replication was completed in S phase.', answer: 'During S phase, replicated DNA remains as loosely packed chromatin fibres',
                  options: ['During S phase, replicated DNA remains as loosely packed chromatin fibres', 'DNA replicates in prophase', 'chromosomes form in G2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "chromosomes replicate in prophase" because they see double-structured chromosomes (two chromatids).' },
                { id: 'b', prompt: 'A student observes a plant cell in prophase but sees no centrioles or asters. Is this observation correct?', answer: 'Yes, correct',
                  options: ['Yes, correct', 'plant cells have centrioles', 'no spindle forms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "chromosomes replicate in prophase" because they see double-structured chromosomes (two chromatids).' },
                { id: 'c', prompt: 'Compare the chromosome number (n) and DNA content (C) in a human somatic cell at late G2 phase versus late prophase. Are they the same or different? Justify.', answer: 'Same: both are 2n chromosome number and 4C DNA content',
                  options: ['Same: both are 2n chromosome number and 4C DNA content', '4n in prophase', '2C in prophase'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "chromosomes replicate in prophase" because they see double-structured chromosomes (two chromatids).' }
          ],
            remediations: { 'chromosomes-replicate-in-prophase-because': { steps: ['Revisit c11_bio_cbse_10_002 (Interphase: S phase) — confirm DNA replication timing.', 'Draw a timeline: G1 (2C, 2n) → S (replication) → G2 (4C, 2n) → Prophase (4C, 2n, condensed).', 'Use a pipe-cleaner model: twist two strands (chromatids) in S phase, then coil tightly in prophase.', 'Compare animal vs plant prophase diagrams side-by-side; label centrosome/aster vs MTOC/spindle only.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "chromosomes replicate in prophase" because they see double-structured chromosomes (two chromatids).',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using onion root tips and a light microscope to estimate the relative duration of prophase compared to other mitotic stages.', answer: 'Fix and stain onion root tip squashes (aceto-orcein/Feulgen)',
                  options: ['Fix and stain onion root tip squashes (aceto-orcein/Feulgen)', 'chromosomes replicate in prophase'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "chromosomes replicate in prophase" because they see double-structured chromosomes (two chromatids).' }
          ],
            remediations: { 'chromosomes-replicate-in-prophase-because': { steps: ['Revisit c11_bio_cbse_10_002 (Interphase: S phase) — confirm DNA replication timing.', 'Draw a timeline: G1 (2C, 2n) → S (replication) → G2 (4C, 2n) → Prophase (4C, 2n, condensed).', 'Use a pipe-cleaner model: twist two strands (chromatids) in S phase, then coil tightly in prophase.', 'Compare animal vs plant prophase diagrams side-by-side; label centrosome/aster vs MTOC/spindle only.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
