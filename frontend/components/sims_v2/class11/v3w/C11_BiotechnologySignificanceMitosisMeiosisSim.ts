import type { SimDef } from '../../engine/types';
import C11_BiotechnologySignificanceMitosisMeiosisSim from '../../../simulations/c6_12/C11_BiotechnologySignificanceMitosisMeiosisSim';

/** v3 wrapped master — C11_BiotechnologySignificanceMitosisMeiosisSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biotechnologysignificancemitosismeiosissim: SimDef = {
    id: 'v3w_c11_biotechnologysignificancemitosismeiosissim',
    title: 'Significance of Mitosis: Growth and Repair',
    subtitle: 'This node covers the biological significance of mitosis in multicellular organisms:.',
    classLevel: 11, subject: 'biotechnology', topic: 'Significance of Mitosis: Growth and Repair',
    chapters: [],
    nodeIds: ['c11_biotech_cbse_05_004', 'c11_biotech_cbse_05_003', 'c11_biotech_cbse_05_006', 'c11_biotech_cbse_05_002', 'c11_biotech_cbse_05_007', 'c11_biotech_cbse_05_001', 'c11_biotech_cbse_05_005', 'c11_biotech_cbse_05_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine a deep cut on your finger — within days, the skin knits back together seamlessly.', goal: 'Master Significance of Mitosis: Growth and Repair.' },
    discovery: {
        question: 'State the chromosome number and DNA content (C-value) of each daughter cell immediately after mitosis and cytokinesis in a human somatic cell that started G1.',
        options: ['Each daughter cell has 46 chromosomes (2n) and 2C DNA content', 'growth by mitosis', 'repair mitosis'],
        answer: 'Each daughter cell has 46 chromosomes (2n) and 2C DNA content',
        hook: 'Students often think "growth by mitosis" means cells just get bigger (hypertrophy) or that repair uses a special.',
    },
    teaching: [
        { title: 'Mitosis is the equational division of a.', text: 'Mitosis is the equational division of a eukaryotic somatic cell that produces two genetically identical daughter cells, each with the same chromosome number (2n) and DNA content (2C) as the parent.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_05_004', title: 'Mitosis is the equational division of a.',
          scaffold: { problem: 'A single human skin fibroblast in culture undergoes mitosis every 24 hours.',
            steps: [
            { text: 'Identify given: 1 starting cell, division time = 24 h, duration = 5 days = 120 h.' },
            { text: 'Calculate number of division cycles: 120 h / 24 h = 5 cycles.' },
            { text: 'Use exponential growth formula N = N₀ × 2ⁿ where N₀=1, n=5 → N = 32 cells.' },
            { text: 'Total divisions = sum of divisions per generation: 1 + 2 + 4 + 8 + 16 = 31 divisions (or 2⁵ - 1).' },
            { text: 'Genetic identity: each mitosis separates sister chromatids (identical DNA copies from S phase), so all 32 cells have.', faded: true, blankAnswer: '32 cells after 5 days; 31 total mitotic divisions; all.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_05_003', title: 'Mitosis is an equational cell division.',
          scaffold: { problem: 'A root tip cell of onion (2n = 16) is observed in metaphase. How many chromatids are visible, and how many kinetochores are attached to.',
            steps: [
            { text: 'Identify the chromosome number: Onion is diploid with 2n = 16 chromosomes.' },
            { text: 'Recall that after S phase, each chromosome replicates into two sister chromatids.' },
            { text: 'Each sister chromatid has its own kinetochore at the centromere.' },
            { text: 'In metaphase, each kinetochore is attached to microtubules from one pole.' },
            { text: 'Verify: 16 chromosomes × 2 chromatids = 32 chromatids = 32 kinetochores = 32 microtubule attachment sites.', faded: true, blankAnswer: '32 chromatids visible; 32 kinetochores attached to spindle.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_05_006', title: 'Meiosis II is the second consecutive.',
          scaffold: { problem: 'A human primary spermatocyte (2n=46) enters meiosis. After Meiosis I, two secondary spermatocytes form.',
            steps: [
            { text: 'Identify the starting state in the secondary spermatocyte after Meiosis I.' },
            { text: 'In Meiosis II, sister chromatids separate. For Chromosome 1, the two chromatids (Ab and aB) go to different spermatids.' },
            { text: 'Combine the chromatids into four spermatids. Each spermatid gets one chromatid from Chromosome 1 and one from.' },
            { text: 'Note that Chromosome 2 chromatids are identical, so the only variation comes from Chromosome 1.' },
            { text: 'Interpret: Meiosis II separated the recombinant chromatids created in Meiosis I, producing gametes with new allele.', faded: true, blankAnswer: 'Four spermatids: two with genotype Ab/C, two with genotype.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_05_002', title: 'Interphase is the preparatory phase of.',
          scaffold: { problem: 'A human somatic cell in G1 phase has 46 chromosomes and 4.6 pg of DNA.',
            steps: [
            { text: 'Identify given values: G1 DNA = 4.6 pg (2C), chromosome number = 46 (2n). Each chromosome has 1 chromatid in G1.' },
            { text: 'Recall S phase definition: DNA replicates semi-conservatively; each chromatid becomes a template for a new sister.' },
            { text: 'Compute end-of-S DNA content: 4.6 pg × 2 = 9.2 pg (4C). Chromatid count: 46 chromosomes × 2 chromatids each = 92.' },
            { text: 'G2 phase involves no further DNA replication; DNA content stays 9.2 pg (4C), chromatid count stays 92.' },
            { text: 'Verify: Chromosome number = centromere count = 46 at all stages. DNA content doubles only once per cycle.', faded: true, blankAnswer: 'End of S phase: DNA = 9.2 pg (4C), chromatids = 92,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_05_007', title: 'Meiosis is a specialized reductional.',
          scaffold: { problem: 'A diploid cell of a fruit fly (Drosophila melanogaster) has 2n = 8 chromosomes.',
            steps: [
            { text: 'Identify the haploid number n from the diploid number 2n = 8. n = 8/2 = 4 homologous pairs.' },
            { text: 'Recall the formula for independent assortment combinations: 2^n, where n is the number of homologous pairs.' },
            { text: 'Substitute n = 4 into the formula: 2^4 = 16.' },
            { text: 'Interpret the result: 16 distinct gamete genotypes are possible from independent assortment alone, assuming no crossing.' },
            { text: 'Analyze the effect of crossing over: With 2 chiasmata per pair (average), each chromosome pair can produce recombinant.' },
            { text: 'Conclude: Independent assortment gives 16 chromosomal combinations; crossing over generates new allele combinations on.', faded: true, blankAnswer: '16 gamete types from independent assortment alone; crossing.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_05_001', title: 'The cell cycle is an ordered sequence.',
          scaffold: { problem: 'A pathologist examines a biopsy from a 1 cm³ tumor. Assuming the tumor started from a single mutated cell, the average cell cycle time is.',
            steps: [
            { text: 'Calculate the number of cells in 1 cm³ tumor. Number of cells = Total Volume / Cell Volume = 10¹² µm³ / 4,000 µm³ = 2.5.' },
            { text: 'Determine the number of doublings (n) needed from 1 cell to reach 2.5 × 10⁸ cells.' },
            { text: 'Compute log₂(2.5 × 10⁸). log₂(2.5 × 10⁸) = log₂(2.5) + log₂(10⁸) ≈ 1.32 + 26.58 = 27.9 doublings.' },
            { text: 'Calculate total time. Time = Number of doublings × Cycle time = 28 × 30 hours = 840 hours.' },
            { text: 'Convert to days. 840 hours / 24 hours/day = 35 days.', faded: true, blankAnswer: '35 days (minimum).' }
            ] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_05_003', title: 'Identify each idea',
          dissect: { specimen: 'Significance of Mitosis: Growth and Repair', spots: [
            { id: 's1', label: 'Mitosis is the equational division', prompt: 'Which idea is this? — Mitosis is the equational division of a eukaryotic somatic cell that produces two.', answer: 'Mitosis is the equational division', options: ['Mitosis is the equational division', 'Mitosis is an equational cell', 'Meiosis II is the second', 'Interphase is the preparatory phase'] },
            { id: 's2', label: 'Mitosis is an equational cell', prompt: 'Which idea is this? — Mitosis is an equational cell division process where a single diploid parent cell divides.', answer: 'Mitosis is an equational cell', options: ['Mitosis is an equational cell', 'Mitosis is the equational division', 'Meiosis II is the second', 'Interphase is the preparatory phase'] },
            { id: 's3', label: 'Meiosis II is the second', prompt: 'Which idea is this? — Meiosis II is the second consecutive nuclear division in meiosis where sister chromatids.', answer: 'Meiosis II is the second', options: ['Meiosis II is the second', 'Mitosis is the equational division', 'Mitosis is an equational cell', 'Interphase is the preparatory phase'] },
            { id: 's4', label: 'Interphase is the preparatory phase', prompt: 'Which idea is this? — Interphase is the preparatory phase of the cell cycle between two successive mitotic.', answer: 'Interphase is the preparatory phase', options: ['Interphase is the preparatory phase', 'Mitosis is the equational division', 'Mitosis is an equational cell', 'Meiosis II is the second'] },
            { id: 's5', label: 'Meiosis is a specialized reductional', prompt: 'Which idea is this? — Meiosis is a specialized reductional division in germ cells that produces four.', answer: 'Meiosis is a specialized reductional', options: ['Meiosis is a specialized reductional', 'Mitosis is the equational division', 'Mitosis is an equational cell', 'Meiosis II is the second'] },
            { id: 's6', label: 'The cell cycle is an', prompt: 'Which idea is this? — The cell cycle is an ordered sequence of events in which a eukaryotic cell grows,.', answer: 'The cell cycle is an', options: ['The cell cycle is an', 'Mitosis is the equational division', 'Mitosis is an equational cell', 'Meiosis II is the second'] }
          ] } }
    ],
    explore: { component: C11_BiotechnologySignificanceMitosisMeiosisSim, prompt: 'Explore the interactive — Significance of Mitosis: Growth and Repair' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_004', difficulty: 'standard',
          question: 'Mitosis is the equational division of a eukaryotic somatic cell that produces.',
          hint: 'Review c11_biotech_cbse_05_003 anaphase: sister chromatids separate, each becoming a.',
          misconception: 'Students often think "growth by mitosis" means cells just get bigger (hypertrophy) or that repair uses a special.',
          parts: [
                { id: 'a', prompt: 'State the chromosome number and DNA content (C-value) of each daughter cell immediately after mitosis and cytokinesis in a human somatic cell that started G1.', answer: 'Each daughter cell has 46 chromosomes (2n) and 2C DNA content',
                  options: ['Each daughter cell has 46 chromosomes (2n) and 2C DNA content', 'growth by mitosis', 'repair mitosis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "growth by mitosis" means cells just get bigger (hypertrophy) or that repair uses a special "repair mitosis" different.' },
                { id: 'b', prompt: 'A patient receives a skin graft from an identical twin. The graft survives without immunosuppression.', answer: 'Autograft: yes (identical genome)',
                  options: ['Autograft: yes (identical genome)', 'growth by mitosis', 'repair mitosis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "growth by mitosis" means cells just get bigger (hypertrophy) or that repair uses a special "repair mitosis" different.' },
                { id: 'c', prompt: 'Compare the role of mitosis in planarian regeneration (neoblast-driven) versus human liver regeneration (hepatocyte proliferation).', answer: 'Similarity: both rely on mitosis of somatic cells to restore tissue mass',
                  options: ['Similarity: both rely on mitosis of somatic cells to restore tissue mass', 'growth by mitosis', 'repair mitosis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "growth by mitosis" means cells just get bigger (hypertrophy) or that repair uses a special "repair mitosis" different.' }
          ],
            remediations: { 'growth-by-mitosis-means-cells': { steps: ['Revisit c11_biotech_cbse_05_003: list the 4 mitotic stages and identify where chromosome number is conserved (anaphase.', 'Use a pipe-cleaner model: duplicate chromosomes (S phase), align (metaphase), separate sisters (anaphase), reform.', 'Count chromosomes at each step — always 46.', 'Contrast with meiosis I (homologue separation) using the same model.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_003', difficulty: 'standard',
          question: 'Mitosis is an equational cell division process where a single diploid parent.',
          hint: 'Revisit c11_biotech_cbse_05_002 (Interphase: S phase) — specifically the outcome of DNA.',
          misconception: 'Students believe that "chromosomes line up at the metaphase plate because spindle fibers push them there." The error:.',
          parts: [
                { id: 'a', prompt: 'A student observes a cell under the microscope where chromosomes appear as thin, long threads and the nuclear envelope is still intact.', answer: 'The cell is in early prophase',
                  options: ['The cell is in early prophase', 'metaphase', 'interphase'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "chromosomes line up at the metaphase plate because spindle fibers push them there." The error: they think.' },
                { id: 'b', prompt: 'A researcher treats dividing cells with a drug that prevents microtubule polymerization.', answer: 'Cells will arrest in prometaphase/metaphase transition',
                  options: ['Cells will arrest in prometaphase/metaphase transition', 'prophase arrest', 'anaphase arrest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "chromosomes line up at the metaphase plate because spindle fibers push them there." The error: they think.' }
          ],
            remediations: { 'chromosomes-line-up-at-the': { steps: ['Show a live-cell imaging video (e.g., GFP-tubulin + mCherry-H2B) of mitosis — pause at metaphase and ask: "Are.', 'Use a physical model: attach two strings (microtubules) to a central ring (kinetochore); pull both strings equally —.', 'Explain: "Alignment is tug-of-war equilibrium, not pushing." 4.', 'Have student redraw metaphase with arrows showing microtubule depolymerization at kinetochores generating poleward.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "chromosomes line up at the metaphase plate because spindle fibers push them there." The error:.',
          parts: [
                { id: 'a', prompt: 'A cell line has a mutation in the gene encoding the kinetochore protein Ndc80, reducing its microtubule-binding affinity by 90%.', answer: 'These cells cannot complete mitosis normally',
                  options: ['These cells cannot complete mitosis normally', 'cells will divide but with errors', 'Spindle fibers grow longer and push chromosomes to the middle', '"chromosomes line up at the metaphase plate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "chromosomes line up at the metaphase plate because spindle fibers push them there." The error: they think.' }
          ],
            remediations: { 'chromosomes-line-up-at-the': { steps: ['Show a live-cell imaging video (e.g., GFP-tubulin + mCherry-H2B) of mitosis — pause at metaphase and ask: "Are.', 'Use a physical model: attach two strings (microtubules) to a central ring (kinetochore); pull both strings equally —.', 'Explain: "Alignment is tug-of-war equilibrium, not pushing." 4.', 'Have student redraw metaphase with arrows showing microtubule depolymerization at kinetochores generating poleward.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_006', difficulty: 'standard',
          question: 'Meiosis II is the second consecutive nuclear division in meiosis where sister.',
          hint: 'Revisit c11_biotech_cbse_05_003 (Mitosis) for sister chromatid separation mechanics, and.',
          misconception: 'Students believe "Meiosis II is just mitosis in haploid cells" and that the four products of meiosis are genetically.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Meiosis II is exactly like mitosis because both separate sister chromatids." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'Meiosis II is just mitosis in haploid cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Meiosis II is just mitosis in haploid cells" and that the four products of meiosis are genetically identical except for.' },
                { id: 'b', prompt: 'During Metaphase II of human spermatogenesis, a secondary spermatocyte contains 23 chromosomes.', answer: 'At Metaphase II: 23 chromosomes × 2 chromatids each = 46 DNA molecules',
                  options: ['At Metaphase II: 23 chromosomes × 2 chromatids each = 46 DNA molecules', 'Meiosis II is just mitosis in haploid cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Meiosis II is just mitosis in haploid cells" and that the four products of meiosis are genetically identical except for.' },
                { id: 'c', prompt: 'A cell in Prophase II has 14 chromosomes. The organism is diploid with 2n=28. Trace this cell back to the zygote: How many chromosomes did the zygote have?', answer: 'Zygote: 2n=28 chromosomes (14 homologous pairs)',
                  options: ['Zygote: 2n=28 chromosomes (14 homologous pairs)', 'Meiosis II is just mitosis in haploid cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Meiosis II is just mitosis in haploid cells" and that the four products of meiosis are genetically identical except for.' }
          ],
            remediations: { 'meiosis-ii-is-just-mitosis': { steps: ['Have the student draw a single replicated chromosome (two chromatids) with heterozygous alleles (e.g., A/a) and show a.', 'Trace the four resulting chromatids through Meiosis I (homologs separate) and Meiosis II (sisters separate).', 'Ask: "Are the two chromatids of each chromosome still identical after crossing over?" 4.', 'Force the realization: Meiosis II separates NON-IDENTICAL sisters, creating recombinant chromatids as independent units.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Meiosis II is just mitosis in haploid cells" and that the four products of meiosis are genetically.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Interkinesis between Meiosis I and II is functionally equivalent to a G1 phase because no DNA replication occurs." Support or refute with.', answer: 'Refute',
                  options: ['Refute', 'no DNA replication', 'functional equivalence', 'Meiosis II is just mitosis in haploid cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Meiosis II is just mitosis in haploid cells" and that the four products of meiosis are genetically identical except for.' },
                { id: 'b', prompt: 'Design a hypothetical experiment using fluorescent tags to distinguish whether a given cell division is Meiosis II or mitosis.', answer: 'What to label, (',
                  options: ['What to label, (', 'Meiosis II is just mitosis in haploid cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Meiosis II is just mitosis in haploid cells" and that the four products of meiosis are genetically identical except for.' }
          ],
            remediations: { 'meiosis-ii-is-just-mitosis': { steps: ['Have the student draw a single replicated chromosome (two chromatids) with heterozygous alleles (e.g., A/a) and show a.', 'Trace the four resulting chromatids through Meiosis I (homologs separate) and Meiosis II (sisters separate).', 'Ask: "Are the two chromatids of each chromosome still identical after crossing over?" 4.', 'Force the realization: Meiosis II separates NON-IDENTICAL sisters, creating recombinant chromatids as independent units.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_002', difficulty: 'standard',
          question: 'Interphase is the preparatory phase of the cell cycle between two successive.',
          hint: 'Revisit Class 9 node c9_bio_ch1_5 (Nucleus: Structure and Functions) and Class 11 node.',
          misconception: 'Students believe "chromosome number doubles during S phase" because they see replicated chromosomes as "two.',
          parts: [
                { id: 'a', prompt: 'State the DNA content (C-value) and chromosome number (n-value) of a human somatic cell at the start of G1, at the end of S phase, and at the end of G2 phase.', answer: 'Start of G1: 2C DNA, 2n chromosomes (46 chromosomes, each with one chromatid)',
                  options: ['Start of G1: 2C DNA, 2n chromosomes (46 chromosomes, each with one chromatid)', 'chromosome number doubles during S phase', 'two chromosomes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "chromosome number doubles during S phase" because they see replicated chromosomes as "two chromosomes." They count.' },
                { id: 'b', prompt: 'A student claims: "During S phase, the chromosome number doubles from 46 to 92 because DNA replicates." Explain why this statement is incorrect using the.', answer: 'A chromosome is defined by its centromere',
                  options: ['A chromosome is defined by its centromere', 'chromosome number doubles during S phase', 'two chromosomes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "chromosome number doubles during S phase" because they see replicated chromosomes as "two chromosomes." They count.' },
                { id: 'c', prompt: 'A cultured human fibroblast is treated with a drug that irreversibly inhibits DNA polymerase α at the start of S phase.', answer: 'DNA content remains 2C (no replication)',
                  options: ['DNA content remains 2C (no replication)', 'chromosome number doubles during S phase', 'two chromosomes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "chromosome number doubles during S phase" because they see replicated chromosomes as "two chromosomes." They count.' }
          ],
            remediations: { 'chromosome-number-doubles-during-s': { steps: ['Draw a single chromosome before S phase (one centromere, one chromatid) and after S phase (one centromere, two sister.', 'Count centromeres in both drawings—emphasize "one centromere = one chromosome."', 'Practice NCERT-style question: "Chromosome number remains 2n in S phase; only DNA content changes from 2C to 4C."', 'Use the mnemonic "Centromere Counts, Chromatids Copy" to lock the distinction.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "chromosome number doubles during S phase" because they see replicated chromosomes as "two.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A neuron in the adult brain is permanently stuck in G1 phase." Is this accurate? If not, correct it using the concept of G0.', answer: 'Inaccurate',
                  options: ['Inaccurate', 'chromosome number doubles during S phase', 'two chromosomes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "chromosome number doubles during S phase" because they see replicated chromosomes as "two chromosomes." They count.' }
          ],
            remediations: { 'chromosome-number-doubles-during-s': { steps: ['Draw a single chromosome before S phase (one centromere, one chromatid) and after S phase (one centromere, two sister.', 'Count centromeres in both drawings—emphasize "one centromere = one chromosome."', 'Practice NCERT-style question: "Chromosome number remains 2n in S phase; only DNA content changes from 2C to 4C."', 'Use the mnemonic "Centromere Counts, Chromatids Copy" to lock the distinction.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_007', difficulty: 'standard',
          question: 'Meiosis is a specialized reductional division in germ cells that produces four.',
          hint: 'If stuck, revisit c11_biotech_cbse_05_005 (Prophase I substages) and draw the.',
          misconception: 'Students often believe that **crossing over occurs in Prophase II** (like mitotic prophase) or that it happens.',
          parts: [
                { id: 'a', prompt: 'An organism has a diploid chromosome number of 2n = 8. Calculate the number of genetically distinct gamete types possible from independent assortment alone.', answer: 'Number of homologous pairs = n = 4',
                  options: ['Number of homologous pairs = n = 4', 'Crossing over in Prophase II creates variation between the four final cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **crossing over occurs in Prophase II** (like mitotic prophase) or that it happens **between sister.' }
          ],
            remediations: { 'crossing-over-occurs-in-prophase': { steps: ['If the student holds this misconception: (1) Have them draw a single homologous pair (one maternal, one paternal.', '(2) Ask: "Where are the homologous chromosomes?', 'Where are the sister chromatids?" (3) Point out: At pachytene, homologs are paired → crossing over possible.', 'At Metaphase I, homologs are at the plate → independent assortment possible.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_001', difficulty: 'standard',
          question: 'The cell cycle is an ordered sequence of events in which a eukaryotic cell.',
          hint: 'Revisit Class 10 node c10_bio_cbse_04_005 (Sex Determination) and c9_bio_ch1_12 (Cell.',
          misconception: '**"Interphase is a \'resting phase\' where the cell is inactive."** Students confuse the historical term "resting phase".',
          parts: [
                { id: 'a', prompt: 'A student draws the cell cycle as a circle with four equal quadrants labeled G1, S, G2, M.', answer: 'The inaccuracy is depicting all phases as equal duration',
                  options: ['The inaccuracy is depicting all phases as equal duration', 'the order is wrong', 'Interphase is a \'resting phase\' where the cell is inactive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"Interphase is a \'resting phase\' where the cell is inactive."** Students confuse the historical term "resting phase" (coined because.' }
          ],
            remediations: { 'interphase-is-a-resting-phase': { steps: ['**Confront the term:** Write "RESTING PHASE" on board, cross it out, write "PREPARATION PHASE".', '**Quantify activity:** Ask: "If a cell divides in 24h and M phase is 1h, what happens in the other 23h?" List:.', '**Map checkpoints to activity:** Show that G1/S checks *nutrients/size/DNA damage* before committing to the massive.', 'G2/M checks *replication fidelity* before the mechanical risk of mitosis.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**"Interphase is a \'resting phase\' where the cell is inactive."** Students confuse the historical term "resting phase".',
          parts: [
                { id: 'a', prompt: '"Checkpoints are fail-safe mechanisms that make the cell cycle error-proof." **Evaluate** this statement. Is it true, false, or conditionally true?', answer: '**Conditionally true / False in absolute terms.** Checkpoints are **surveillance',
                  options: ['**Conditionally true / False in absolute terms.** Checkpoints are **surveillance', 'Interphase is a \'resting phase\' where the cell is inactive', 'resting phase'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"Interphase is a \'resting phase\' where the cell is inactive."** Students confuse the historical term "resting phase" (coined because.' },
                { id: 'b', prompt: 'Design a **hypothetical experiment** using fluorescence microscopy (e.g., FUCCI system: red fluorescent protein in G1, green in S/G2/M) to visually distinguish.', answer: '**FUCCI System Logic:** Cdt1 (Red) accumulates in G1',
                  options: ['**FUCCI System Logic:** Cdt1 (Red) accumulates in G1', 'Interphase is a \'resting phase\' where the cell is inactive', 'resting phase'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"Interphase is a \'resting phase\' where the cell is inactive."** Students confuse the historical term "resting phase" (coined because.' }
          ],
            remediations: { 'interphase-is-a-resting-phase': { steps: ['**Confront the term:** Write "RESTING PHASE" on board, cross it out, write "PREPARATION PHASE".', '**Quantify activity:** Ask: "If a cell divides in 24h and M phase is 1h, what happens in the other 23h?" List:.', '**Map checkpoints to activity:** Show that G1/S checks *nutrients/size/DNA damage* before committing to the massive.', 'G2/M checks *replication fidelity* before the mechanical risk of mitosis.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
