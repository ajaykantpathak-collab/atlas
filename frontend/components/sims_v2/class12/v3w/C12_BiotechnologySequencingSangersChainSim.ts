import type { SimDef } from '../../engine/types';
import C12_BiotechnologySequencingSangersChainSim from '../../../simulations/c6_12/C12_BiotechnologySequencingSangersChainSim';

/** v3 wrapped master — C12_BiotechnologySequencingSangersChainSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biotechnologysequencingsangerschainsim: SimDef = {
    id: 'v3w_c12_biotechnologysequencingsangerschainsim',
    title: 'DNA Sequencing Technologies: Sanger vs Next-Generation',
    subtitle: 'This node covers the principles, workflow, and comparative analysis of Sanger.',
    classLevel: 12, subject: 'biotechnology', topic: 'DNA Sequencing Technologies: Sanger vs Next-Generation',
    chapters: [],
    nodeIds: ['c12_biotech_cbse_05_006', 'c12_biotech_cbse_02_012', 'c12_biotech_cbse_05_002', 'c12_biotech_cbse_10_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are a geneticist trying to diagnose a rare genetic disorder in a patient.', goal: 'Master DNA Sequencing Technologies: Sanger vs Next-Generation.' },
    discovery: {
        question: 'What is the fundamental biochemical principle that allows Sanger sequencing to determine the DNA sequence?',
        options: ['Sanger sequencing uses dideoxynucleotides (ddNTPs)', 'Sanger uses reversible terminators', 'Sanger sequences by synthesis without termination'],
        answer: 'Sanger sequencing uses dideoxynucleotides (ddNTPs)',
        hook: 'Students often believe that "Next-Generation Sequencing" refers to a single technology (usually Illumina) and that it.',
    },
    teaching: [
        { title: 'DNA sequencing technologies determine the.', text: 'DNA sequencing technologies determine the precise order of nucleotides (A, T, C, G) in a DNA molecule.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_05_006', title: 'DNA sequencing technologies determine.',
          scaffold: { problem: 'A diagnostic lab needs to screen 100 patient samples for a known 200 bp mutation in the CFTR gene (cystic fibrosis).',
            steps: [
            { text: 'Calculate Sanger total cost and time. 100 samples × 2 reactions/sample × ₹500 = ₹100,000.' },
            { text: 'Calculate Illumina total cost. Library prep: 100 samples × ₹2,000 = ₹200,000. Sequencing run: ₹50,000. Total = ₹250,000.' },
            { text: 'Calculate Illumina data yield vs. need. Each sample needs ~200 bp × 2 (paired-end) = 400 bp.' },
            { text: 'Compare cost per sample. Sanger: ₹1,000/sample. Illumina: ₹2,500/sample (but most capacity unused).' },
            { text: 'Interpret. For 100 targeted samples, Sanger is cheaper and faster.', faded: true, blankAnswer: 'Sanger is more cost-effective (₹100,000 vs ₹250,000) and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_02_012', title: 'Sanger dideoxy DNA sequencing is a.',
          scaffold: { problem: 'A Sanger sequencing reaction uses a primer 5\'-GTTTCCCAGTCACGAC-3\' (M13 forward) and a template with insert sequence 5\'-ATGCCGTAACTG-3\'.',
            steps: [
            { text: 'Write the full template strand sequence starting from the primer binding site.' },
            { text: 'Identify positions of A in the synthesized strand (which correspond to T in the template).' },
            { text: 'Fragment length = primer length (18) + position of terminating A. First A at position 1 → fragment = 19 nt.' },
            { text: 'Note that termination is probabilistic; these are the *possible* fragment lengths that will appear as bands.' },
            { text: 'Verify: The sequence read from the gel (bottom to top) would show A at 19, then other bases, then A at 26, A at 27 —.', faded: true, blankAnswer: '19 nt, 26 nt, 27 nt (including primer)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_05_002', title: 'Structural genomics is the systematic.',
          scaffold: { problem: 'A geneticist is mapping a 120 kb region of human chromosome 7 using STS markers.',
            steps: [
            { text: 'Identify STS markers with identical retention patterns — these are likely closely linked or at the same locus.' },
            { text: 'Recognise that radiation hybrid mapping relies on radiation-induced breaks; markers retained together in the same.' },
            { text: 'The two pattern groups (A/B/D vs C/E) are perfectly complementary — when one group is retained, the other is lost.' },
            { text: 'Since A, B, D co-segregate completely, their relative order cannot be resolved with this panel.' },
            { text: 'The most likely order is [STS-A / STS-B / STS-D] — [breakpoint] — [STS-C / STS-E] or the reverse.', faded: true, blankAnswer: 'Two bins: Bin 1 = {STS-A, STS-B, STS-D} (order unresolved);.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_10_009', title: 'Molecular diagnostics using PCR.',
          scaffold: { problem: 'A diagnostic lab validates a qPCR assay for dengue virus (DENV).',
            steps: [
            { text: 'Plot log₁₀(initial copies) vs mean Ct. x = log₁₀(N₀) = [7, 6, 5, 4, 3, 2, 1]; y = Ct = [15.2, 18.5, 21.8, 25.1, 28.4,.' },
            { text: 'Perform linear regression. Slope = (35.0 - 15.2) / (1 - 7) = 19.8 / (-6) = -3.30. Intercept ≈ 38.3.' },
            { text: 'Efficiency E = 10^(-1/slope) - 1 = 10^(-1/-3.30) - 1 = 10^(0.303) - 1 = 2.01 - 1 = 1.01 = 101%.' },
            { text: 'Dynamic range = 10¹ to 10⁷ copies/µL (7 logs). LOD = lowest dilution with ≥95% detection rate = 10 copies/µL (Ct 35.0,.' },
            { text: 'Assess acceptability: Efficiency 101% (90-110% pass), R² > 0.99 (pass), LOD 10 copies/µL (clinically adequate for.', faded: true, blankAnswer: 'Efficiency = 101%, Dynamic range = 10¹–10⁷ copies/µL (7.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_02_012', title: 'Identify each idea',
          dissect: { specimen: 'DNA Sequencing Technologies: Sanger vs Next-Generation', spots: [
            { id: 's1', label: 'DNA sequencing technologies determine the', prompt: 'Which idea is this? — DNA sequencing technologies determine the precise order of nucleotides (A, T, C, G) in a.', answer: 'DNA sequencing technologies determine the', options: ['DNA sequencing technologies determine the', 'Sanger dideoxy DNA sequencing is', 'Structural genomics is the systematic', 'Molecular diagnostics using PCR Polymerase'] },
            { id: 's2', label: 'Sanger dideoxy DNA sequencing is', prompt: 'Which idea is this? — Sanger dideoxy DNA sequencing is a chain-termination method that determines the.', answer: 'Sanger dideoxy DNA sequencing is', options: ['Sanger dideoxy DNA sequencing is', 'DNA sequencing technologies determine the', 'Structural genomics is the systematic', 'Molecular diagnostics using PCR Polymerase'] },
            { id: 's3', label: 'Structural genomics is the systematic', prompt: 'Which idea is this? — Structural genomics is the systematic determination and analysis of the three-dimensional.', answer: 'Structural genomics is the systematic', options: ['Structural genomics is the systematic', 'DNA sequencing technologies determine the', 'Sanger dideoxy DNA sequencing is', 'Molecular diagnostics using PCR Polymerase'] },
            { id: 's4', label: 'Molecular diagnostics using PCR Polymerase', prompt: 'Which idea is this? — Molecular diagnostics using PCR (Polymerase Chain Reaction) is a technique that amplifies.', answer: 'Molecular diagnostics using PCR Polymerase', options: ['Molecular diagnostics using PCR Polymerase', 'DNA sequencing technologies determine the', 'Sanger dideoxy DNA sequencing is', 'Structural genomics is the systematic'] }
          ] } }
    ],
    explore: { component: C12_BiotechnologySequencingSangersChainSim, prompt: 'Explore the interactive — DNA Sequencing Technologies: Sanger vs Next-Generation' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_006', difficulty: 'standard',
          question: 'DNA sequencing technologies determine the precise order of nucleotides (A, T,.',
          hint: 'If stuck, revisit `c11_biotech_cbse_03_006` (DNA structure) and `c11_biotech_cbse_12_005`.',
          misconception: 'Students often believe that "Next-Generation Sequencing" refers to a single technology (usually Illumina) and that it.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental biochemical principle that allows Sanger sequencing to determine the DNA sequence?', answer: 'Sanger sequencing uses dideoxynucleotides (ddNTPs)',
                  options: ['Sanger sequencing uses dideoxynucleotides (ddNTPs)', 'Sanger uses reversible terminators', 'Sanger sequences by synthesis without termination'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Next-Generation Sequencing" refers to a single technology (usually Illumina) and that it is simply "faster.' },
                { id: 'b', prompt: 'A researcher wants to sequence a 3 kb plasmid to verify a site-directed mutation.', answer: '**Sanger**: Plasmid = 3000 bp',
                  options: ['**Sanger**: Plasmid = 3000 bp', 'overkill', 'Next-Generation Sequencing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Next-Generation Sequencing" refers to a single technology (usually Illumina) and that it is simply "faster.' },
                { id: 'c', prompt: 'Compare the error profiles of Illumina and Oxford Nanopore sequencing.', answer: '**Illumina**: Low error rate (~0.1–1%), predominantly substitution errors',
                  options: ['**Illumina**: Low error rate (~0.1–1%), predominantly substitution errors', 'Nanopore is better for SNPs', 'Illumina is better for assembly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Next-Generation Sequencing" refers to a single technology (usually Illumina) and that it is simply "faster.' }
          ],
            remediations: { 'next-generation-sequencing-refers-to': { steps: ['**Revisit the biochemical basis**: Go back to Class 11 node `c11_biotech_cbse_12_010` (DNA Sequencing: Sanger Method.', 'Draw the chemical structures of dNTP vs ddNTP (missing 3\'-OH) and reversible terminator (3\'-O-azidomethyl).', '**Visualise the workflow**: Watch a 5-min animation of Illumina bridge PCR (search "Illumina sequencing by synthesis.', 'Label each step: fragment → adapter ligation → cluster generation → sequencing → imaging/basecalling.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "Next-Generation Sequencing" refers to a single technology (usually Illumina) and that it.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Third-generation nanopore sequencing has made second-generation Illumina sequencing obsolete for all applications." Defend your position.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'newer = better', 'Next-Generation Sequencing', 'faster Sanger'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Next-Generation Sequencing" refers to a single technology (usually Illumina) and that it is simply "faster.' },
                { id: 'b', prompt: 'Design a sequencing strategy to identify a novel structural variant (a 15 kb inversion) in a patient\'s genome that is missed by standard short-read sequencing.', answer: '**Technology**: Oxford Nanopore (or PacBio HiFi)',
                  options: ['**Technology**: Oxford Nanopore (or PacBio HiFi)', 'Next-Generation Sequencing', 'faster Sanger', 'Illumina sequences 1000 bp reads'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Next-Generation Sequencing" refers to a single technology (usually Illumina) and that it is simply "faster.' }
          ],
            remediations: { 'next-generation-sequencing-refers-to': { steps: ['**Revisit the biochemical basis**: Go back to Class 11 node `c11_biotech_cbse_12_010` (DNA Sequencing: Sanger Method.', 'Draw the chemical structures of dNTP vs ddNTP (missing 3\'-OH) and reversible terminator (3\'-O-azidomethyl).', '**Visualise the workflow**: Watch a 5-min animation of Illumina bridge PCR (search "Illumina sequencing by synthesis.', 'Label each step: fragment → adapter ligation → cluster generation → sequencing → imaging/basecalling.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_012', difficulty: 'standard',
          question: 'Sanger dideoxy DNA sequencing is a chain-termination method that determines the.',
          hint: 'If stuck, redraw the nucleotide structure from c11_biotech_cbse_03_008 and explicitly.',
          misconception: '**Misconception:** "The ddNTPs are added *after* the normal dNTPs, so the polymerase first makes a full-length copy and.',
          parts: [
                { id: 'a', prompt: 'Compare the information obtained from a Sanger sequencing chromatogram (four-color capillary electrophoresis) with that from a traditional four-lane.', answer: 'Same: Both produce a ladder of fragments ending at each base',
                  options: ['Same: Both produce a ladder of fragments ending at each base', 'chromatogram reads top-to-bottom', 'radioactive gel is more accurate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The ddNTPs are added *after* the normal dNTPs, so the polymerase first makes a full-length copy and then chops it up at.' }
          ],
            remediations: { 'misconception-the-ddntps-are-added': { steps: ['Revisit **c11_biotech_cbse_03_008** (Nucleotides and Nucleosides) to draw dATP vs ddATP side-by-side, highlighting the.', 'Re-watch the Sanger animation from **c11_biotech_cbse_12_010** focusing on the *simultaneous* presence of dNTPs and.', 'Do a "paper gel" exercise: write a 10-base template, simulate fragment lengths for each ddNTP at 10% incorporation,.', 'Re-attempt **DIAGNOSTIC_QUESTION_3** with a different ratio (e.g., 1:10) to reinforce the probability calculation.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "The ddNTPs are added *after* the normal dNTPs, so the polymerase first makes a full-length copy and.',
          parts: [
                { id: 'a', prompt: 'Compare the information obtained from a Sanger sequencing chromatogram (four-color capillary electrophoresis) with that from a traditional four-lane.', answer: 'Same: Both produce a ladder of fragments ending at each base',
                  options: ['Same: Both produce a ladder of fragments ending at each base', 'chromatogram reads top-to-bottom', 'radioactive gel is more accurate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The ddNTPs are added *after* the normal dNTPs, so the polymerase first makes a full-length copy and then chops it up at.' }
          ],
            remediations: { 'misconception-the-ddntps-are-added': { steps: ['Revisit **c11_biotech_cbse_03_008** (Nucleotides and Nucleosides) to draw dATP vs ddATP side-by-side, highlighting the.', 'Re-watch the Sanger animation from **c11_biotech_cbse_12_010** focusing on the *simultaneous* presence of dNTPs and.', 'Do a "paper gel" exercise: write a 10-base template, simulate fragment lengths for each ddNTP at 10% incorporation,.', 'Re-attempt **DIAGNOSTIC_QUESTION_3** with a different ratio (e.g., 1:10) to reinforce the probability calculation.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_002', difficulty: 'standard',
          question: 'Structural genomics is the systematic determination and analysis of the.',
          hint: 'If stuck on sequencing principles, revisit c11_biotech_cbse_12_010 (Sanger vs NGS) and.',
          misconception: 'Students conflate "structural genomics" with "whole-genome sequencing" — they think the *goal* is just to get the.',
          parts: [
                { id: 'a', prompt: 'Compare the *principle of base detection* in Illumina (second-generation) and Oxford Nanopore (third-generation) sequencing.', answer: 'Illumina: sequencing-by-synthesis with reversible terminators',
                  options: ['Illumina: sequencing-by-synthesis with reversible terminators', 'Nanopore uses fluorescence', 'Illumina measures current'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "structural genomics" with "whole-genome sequencing" — they think the *goal* is just to get the sequence.' }
          ],
            remediations: { 'students-conflate-structural-genomics-with': { steps: ['If the student cannot distinguish the two perspectives of structural genomics: (1) Have them re-read the NCERT.', '(2) Assign a 5-minute retrieval practice: "Without notes, write one sentence for each perspective." (3) Re-diagnose.', 'The structural genomics centre selects 50 proteins with no homology to known folds for crystallography.', 'Which perspective of structural genomics does this illustrate?" Expected answer: Protein-structure perspective.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate "structural genomics" with "whole-genome sequencing" — they think the *goal* is just to get the.',
          parts: [
                { id: 'a', prompt: 'Compare the *principle of base detection* in Illumina (second-generation) and Oxford Nanopore (third-generation) sequencing.', answer: 'Illumina: sequencing-by-synthesis with reversible terminators',
                  options: ['Illumina: sequencing-by-synthesis with reversible terminators', 'Nanopore uses fluorescence', 'Illumina measures current'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "structural genomics" with "whole-genome sequencing" — they think the *goal* is just to get the sequence.' }
          ],
            remediations: { 'students-conflate-structural-genomics-with': { steps: ['If the student cannot distinguish the two perspectives of structural genomics: (1) Have them re-read the NCERT.', '(2) Assign a 5-minute retrieval practice: "Without notes, write one sentence for each perspective." (3) Re-diagnose.', 'The structural genomics centre selects 50 proteins with no homology to known folds for crystallography.', 'Which perspective of structural genomics does this illustrate?" Expected answer: Protein-structure perspective.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_10_009', difficulty: 'standard',
          question: 'Molecular diagnostics using PCR (Polymerase Chain Reaction) is a technique that.',
          hint: 'Revisit c11_biotech_cbse_12_005 (PCR Principle) and c11_math_cbse_01_001 (Exponential.',
          misconception: 'Students believe "more PCR cycles = better detection" and routinely suggest 40-45 cycles for diagnostics.',
          parts: [
                { id: 'a', prompt: 'A patient sample tests negative for HIV by conventional PCR but positive by RT-PCR. What is the most likely explanation for this discrepancy?', answer: 'HIV is an RNA virus (retrovirus)',
                  options: ['HIV is an RNA virus (retrovirus)', 'conventional PCR is less sensitive', 'more PCR cycles = better detection'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "more PCR cycles = better detection" and routinely suggest 40-45 cycles for diagnostics.' },
                { id: 'b', prompt: 'In a real-time PCR assay for SARS-CoV-2, the N-gene amplification curve crosses the threshold at Ct = 28, while the internal control (human RNase P gene).', answer: 'Sample is positive for SARS-CoV-2 (Ct 28 < typical cutoff 35-40)',
                  options: ['Sample is positive for SARS-CoV-2 (Ct 28 < typical cutoff 35-40)', 'Ct 28 is higher than positive control Ct 25, so sample is negative', 'more PCR cycles = better detection'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "more PCR cycles = better detection" and routinely suggest 40-45 cycles for diagnostics.' },
                { id: 'c', prompt: 'Design a multiplex PCR to simultaneously detect *Plasmodium falciparum* and *P. vivax* in a single blood sample.', answer: 'primer design strategy, (',
                  options: ['primer design strategy, (', 'more PCR cycles = better detection'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "more PCR cycles = better detection" and routinely suggest 40-45 cycles for diagnostics.' }
          ],
            remediations: { 'more-pcr-cycles-better-detection': { steps: ['Revisit c11_biotech_cbse_12_005 (PCR Principle) — re-derive the amplification formula N = N₀ × 2ⁿ and plot cycles vs.', 'Watch a qPCR amplification curve video — identify baseline, exponential, linear, plateau phases.', 'Practice Ct interpretation: given 5 Ct values (20, 28, 35, 38, 42), classify each as strong positive, weak positive,.', 'Re-attempt Diagnostic Question 2 and 4.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_10_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "more PCR cycles = better detection" and routinely suggest 40-45 cycles for diagnostics.',
          parts: [
                { id: 'a', prompt: 'Critique this diagnostic PCR protocol for detecting *Mycobacterium tuberculosis* in sputum: "Extract DNA → PCR with IS6110 primers (35 cycles) → Gel.', answer: 'Flaws: (1) No internal control',
                  options: ['Flaws: (1) No internal control', 'more PCR cycles = better detection'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "more PCR cycles = better detection" and routinely suggest 40-45 cycles for diagnostics.' }
          ],
            remediations: { 'more-pcr-cycles-better-detection': { steps: ['Revisit c11_biotech_cbse_12_005 (PCR Principle) — re-derive the amplification formula N = N₀ × 2ⁿ and plot cycles vs.', 'Watch a qPCR amplification curve video — identify baseline, exponential, linear, plateau phases.', 'Practice Ct interpretation: given 5 Ct values (20, 28, 35, 38, 42), classify each as strong positive, weak positive,.', 'Re-attempt Diagnostic Question 2 and 4.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
