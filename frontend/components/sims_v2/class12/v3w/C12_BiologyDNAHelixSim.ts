import type { SimDef } from '../../engine/types';
import C12_BiologyDNAHelixSim from '../../../simulations/three/C12_BiologyDNAHelixSim';

/** v3 wrapped master — C12_BiologyDNAHelixSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biologydnahelixsim: SimDef = {
    id: 'v3w_c12_biologydnahelixsim',
    title: 'DNAHelix',
    subtitle: 'Covers the Watson-Crick B-DNA model: helical parameters (diameter, pitch, base pairs per.',
    classLevel: 12, subject: 'biology', topic: 'DNA Structure: Double Helix Model (Watson-Crick)',
    chapters: [],
    nodeIds: ['c12_bio_cbse_06_002', 'c12_bio_cbse_06_003', 'c12_bio_cbse_06_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a twisted ladder (like a spiral staircase in an old Indian haveli) — the handrails are the.', goal: 'Master DNAHelix.' },
    discovery: {
        question: 'State the two key experimental evidences that Watson and Crick used to deduce the double helical structure of DNA, and the specific conclusion each provided.',
        options: ['Correct answer: (1) Chargaff\'s rules', 'hydrogen bonds between bases are the main force holding the two strands together', 'breaking H-bonds requires high temperature'],
        answer: 'Correct answer: (1) Chargaff\'s rules',
        hook: 'Students often think "hydrogen bonds between bases are the main force holding the two strands together" and that.',
    },
    teaching: [
        { title: 'The Watson-Crick double helix model.', text: 'The Watson-Crick double helix model describes DNA as two antiparallel polynucleotide strands coiled around a common axis in a right-handed helix, with complementary nitrogenous bases (A-T, G-C).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bio_cbse_06_002', title: 'The Watson-Crick double helix model.',
          scaffold: { problem: 'A 5000 bp viral DNA has 22% adenine. Calculate the number of cytosine residues, the total hydrogen bonds in the double helix, and the.',
            steps: [
            { text: 'Apply Chargaff\'s rules: %A = %T = 22% → %A+%T = 44% → %G+%C = 56% → %G = %C = 28%.' },
            { text: 'Number of C residues = 28% of 5000 bp = 0.28 × 5000 = 1400 cytosines (per strand?' },
            { text: 'Count H-bonds: A-T pairs = 22% of 5000 = 1100 pairs × 2 H-bonds = 2200.' },
            { text: 'Calculate Tm: %GC = 56. Tm = 69.3 + 0.41×56 - 650/5000 = 69.3 + 22.96 - 0.13 = 92.13 °C.' },
            { text: 'Verify: High GC → high Tm, consistent.', faded: true, blankAnswer: 'Cytosine residues per strand = 1400 (total 2800); Total.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_06_003', title: 'DNA packaging in eukaryotes is the.',
          scaffold: { problem: 'Human diploid genome has ~6.4 × 10^9 base pairs. Calculate the total length of DNA in a human cell nucleus.',
            steps: [
            { text: 'Calculate total DNA length = total bp × rise per bp = 6.4 × 10^9 bp × 0.34 nm/bp = 2.176 × 10^9 nm = 2.176 meters.' },
            { text: 'Calculate number of nucleosomes = total bp / repeat length = 6.4 × 10^9 bp / 200 bp per nucleosome = 3.2 × 10^7.' },
            { text: 'Calculate 10 nm fiber length. Each nucleosome (core + linker) corresponds to 200 bp = 68 nm of DNA.' },
            { text: 'Verify compaction: 2.176 m DNA → 0.352 m fiber = 6.18-fold compaction. Matches the expected ~6-fold for 10 nm fiber.' },
            { text: 'Conclusion: The 10 nm fiber reduces 2.2 meters to ~35 cm — still too long for the nucleus, necessitating higher-order.', faded: true, blankAnswer: 'Total DNA length ≈ 2.18 meters. Total nucleosomes ≈ 32.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_06_004', title: 'DNA replication is the biological.',
          scaffold: { problem: 'In a Meselson-Stahl type experiment, E. coli are grown for many generations in 15N medium, then shifted to 14N medium.',
            steps: [
            { text: 'Determine the DNA composition after each generation. Generation 0 (all 15N): all heavy-heavy (HH).' },
            { text: 'At generation 2.5, the hybrid molecules from generation 2 have each replicated once: each HL produces one HL and one.' },
            { text: 'Count molecules. Start generation 2 with 2 HL and 2 LL (total 4 molecules).' },
            { text: 'Banding: HL bands at intermediate density; LL bands at light density.' },
            { text: 'Verify: heavy band disappears after generation 1; intermediate persists but decreases by half each generation.', faded: true, blankAnswer: 'Two bands — one at intermediate density (25% of DNA, hybrid.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_06_003', title: 'Identify each idea',
          dissect: { specimen: 'DNAHelix', spots: [
            { id: 's1', label: 'The Watson-Crick double helix model', prompt: 'Which idea is this? — The Watson-Crick double helix model describes DNA as two antiparallel polynucleotide.', answer: 'The Watson-Crick double helix model', options: ['The Watson-Crick double helix model', 'DNA packaging in eukaryotes is', 'DNA replication is the biological'] },
            { id: 's2', label: 'DNA packaging in eukaryotes is', prompt: 'Which idea is this? — DNA packaging in eukaryotes is the hierarchical coiling of double-stranded DNA around.', answer: 'DNA packaging in eukaryotes is', options: ['DNA packaging in eukaryotes is', 'The Watson-Crick double helix model', 'DNA replication is the biological'] },
            { id: 's3', label: 'DNA replication is the biological', prompt: 'Which idea is this? — DNA replication is the biological process by which a double-stranded DNA molecule is.', answer: 'DNA replication is the biological', options: ['DNA replication is the biological', 'The Watson-Crick double helix model', 'DNA packaging in eukaryotes is'] }
          ] } }
    ],
    explore: { component: C12_BiologyDNAHelixSim, prompt: 'Explore the interactive — DNAHelix' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_002', difficulty: 'standard',
          question: 'The Watson-Crick double helix model describes DNA as two antiparallel.',
          hint: 'Review c11_biotech_cbse_03_008 for nucleotide chemistry and c11_bio_cbse_09_004 for base.',
          misconception: 'Students often think "hydrogen bonds between bases are the main force holding the two strands together" and that.',
          parts: [
                { id: 'a', prompt: 'State the two key experimental evidences that Watson and Crick used to deduce the double helical structure of DNA, and the specific conclusion each provided.', answer: 'Correct answer: (1) Chargaff\'s rules',
                  options: ['Correct answer: (1) Chargaff\'s rules', 'hydrogen bonds between bases are the main force holding the two strands together', 'breaking H-bonds requires high temperature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "hydrogen bonds between bases are the main force holding the two strands together" and that "breaking H-bonds requires.' },
                { id: 'b', prompt: 'A DNA sample from a thermophilic bacterium has 65% GC content.', answer: 'Correct answer: GC = 65% → G = 32.5%, C = 32.5%',
                  options: ['Correct answer: GC = 65% → G = 32.5%, C = 32.5%', 'hydrogen bonds between bases are the main force holding the two strands together', 'breaking H-bonds requires high temperature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "hydrogen bonds between bases are the main force holding the two strands together" and that "breaking H-bonds requires.' }
          ],
            remediations: { 'hydrogen-bonds-between-bases-are': { steps: ['Revisit c11_biotech_cbse_03_008 (Nucleotides and Nucleosides) to review base structures and glycosidic bond.', 'Use a physical model or 3D animation to visualize antiparallel strands and groove formation.', 'Perform a paper exercise: write a 10-base sequence, draw its complement with 5\'/3\' labels, count H-bonds.', 'Re-attempt Diagnostic Q2 and Q4.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "hydrogen bonds between bases are the main force holding the two strands together" and that.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The major groove is wider than the minor groove because purines are larger than pyrimidines." Identify the error and give the correct.', answer: 'Correct answer: The statement is incorrect',
                  options: ['Correct answer: The statement is incorrect', 'hydrogen bonds between bases are the main force holding the two strands together', 'breaking H-bonds requires high temperature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "hydrogen bonds between bases are the main force holding the two strands together" and that "breaking H-bonds requires.' }
          ],
            remediations: { 'hydrogen-bonds-between-bases-are': { steps: ['Revisit c11_biotech_cbse_03_008 (Nucleotides and Nucleosides) to review base structures and glycosidic bond.', 'Use a physical model or 3D animation to visualize antiparallel strands and groove formation.', 'Perform a paper exercise: write a 10-base sequence, draw its complement with 5\'/3\' labels, count H-bonds.', 'Re-attempt Diagnostic Q2 and Q4.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_003', difficulty: 'standard',
          question: 'DNA packaging in eukaryotes is the hierarchical coiling of double-stranded DNA.',
          hint: 'If stuck, review DNA charge and dimensions (c12_bio_cbse_06_002) and the definition of.',
          misconception: 'Students believe nucleosomes are fixed "beads" permanently glued to specific DNA sequences.',
          parts: [
                { id: 'a', prompt: 'Compare the 10 nm "beads-on-a-string" fiber and the 30 nm solenoid fiber in terms of: (a) histone composition, (b) compaction ratio, and (c) transcriptional.', answer: 'histone composition, (',
                  options: ['histone composition, (', '30 nm fiber has different core histones', 'both are equally accessible'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe nucleosomes are fixed "beads" permanently glued to specific DNA sequences.' }
          ],
            remediations: { 'nucleosomes-are-fixed-beads-permanently': { steps: ['If the student holds the static-beads misconception: Step 1 — Revisit c12_bio_cbse_06_002 (DNA structure) to recall DNA.', 'Step 2 — Watch a 2-minute animation of nucleosome sliding/remodeling (e.g., HHMI BioInteractive "Chromatin Remodeling").', 'Step 3 — Do a hands-on activity: wrap a rubber band (DNA) around a spool (histone core), then twist/pull to show how.', 'Step 4 — Re-attempt Diagnostic Question 6 (design experiment) — now they should propose FRAP or remodeler recruitment.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe nucleosomes are fixed "beads" permanently glued to specific DNA sequences.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Heterochromatin is permanently transcriptionally inactive because its DNA is too tightly packed for RNA polymerase to access." Is.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'nucleosomes are fixed "beads" permanently glued to specific DNA sequences'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe nucleosomes are fixed "beads" permanently glued to specific DNA sequences.' },
                { id: 'b', prompt: 'Compare the 10 nm "beads-on-a-string" fiber and the 30 nm solenoid fiber in terms of: (a) histone composition, (b) compaction ratio, and (c) transcriptional.', answer: 'histone composition, (',
                  options: ['histone composition, (', '30 nm fiber has different core histones', 'both are equally accessible', 'nucleosomes are fixed "beads" permanently glued to specific DNA sequences'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe nucleosomes are fixed "beads" permanently glued to specific DNA sequences.' }
          ],
            remediations: { 'nucleosomes-are-fixed-beads-permanently': { steps: ['If the student holds the static-beads misconception: Step 1 — Revisit c12_bio_cbse_06_002 (DNA structure) to recall DNA.', 'Step 2 — Watch a 2-minute animation of nucleosome sliding/remodeling (e.g., HHMI BioInteractive "Chromatin Remodeling").', 'Step 3 — Do a hands-on activity: wrap a rubber band (DNA) around a spool (histone core), then twist/pull to show how.', 'Step 4 — Re-attempt Diagnostic Question 6 (design experiment) — now they should propose FRAP or remodeler recruitment.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_004', difficulty: 'standard',
          question: 'DNA replication is the biological process by which a double-stranded DNA.',
          hint: 'If unable to draw the anti-parallel duplex with correct polarity, revisit.',
          misconception: 'Students think "semi-conservative" means each strand is half old and half new (i.e., the dispersive model).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'DNA replication is the biological process by which a double-stranded DNA molecule is',
                  options: ['DNA replication is the biological process by which a double-stranded DNA molecule is', 'The Watson-Crick double helix model describes DNA as two antiparallel polynucleotide', 'DNA packaging in eukaryotes is the hierarchical coiling of double-stranded DNA around'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "semi-conservative" means each strand is half old and half new (i.e., the dispersive model).' }
          ],
            remediations: { 'semi-conservative-means-each-strand': { steps: ['Revisit c12_bio_cbse_06_002 (DNA Structure) — physically separate a paper model of double helix into two strands; label.', 'Re-watch the Meselson-Stahl animation (NCERT QR code) focusing on band positions after each generation.', 'Do a pencil-and-paper simulation: draw a heavy double helix, replicate in light medium for 3 generations, color-code.', 'Re-attempt Diagnostic Questions 3 and 5. If still confused, ask teacher for a physical model demonstration.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "semi-conservative" means each strand is half old and half new (i.e., the dispersive model).',
          parts: [
                { id: 'a', prompt: 'A student claims: "If DNA replication were conservative, after two generations in N14 medium we would see one heavy band and one light band." Evaluate this.', answer: 'The claim is correct',
                  options: ['The claim is correct', 'semi-conservative', 'rather than', '"semi-conservative" means each strand is half old and half new (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "semi-conservative" means each strand is half old and half new (i.e., the dispersive model).' }
          ],
            remediations: { 'semi-conservative-means-each-strand': { steps: ['Revisit c12_bio_cbse_06_002 (DNA Structure) — physically separate a paper model of double helix into two strands; label.', 'Re-watch the Meselson-Stahl animation (NCERT QR code) focusing on band positions after each generation.', 'Do a pencil-and-paper simulation: draw a heavy double helix, replicate in light medium for 3 generations, color-code.', 'Re-attempt Diagnostic Questions 3 and 5. If still confused, ask teacher for a physical model demonstration.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
