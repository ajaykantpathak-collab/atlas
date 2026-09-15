import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch09_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch09_p2: SimDef = {
    id: 'v3_c11_biotech_ch09_p2',
    title: 'Introduction to Bioinformatics · Part 2/2',
    subtitle: 'Meet databases, sequence alignment and the logic of guessing function from similarity.',
    classLevel: 11, subject: 'biotechnology', topic: 'Introduction to Bioinformatics · Part 2/2',
    chapters: ['c11_biotech_ch09'],
    nodeIds: ['c11_biotech_cbse_09_007', 'c11_biotech_cbse_09_008', 'c11_biotech_cbse_09_009', 'c11_biotech_cbse_09_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a bioinformatics analyst annotating a newly sequenced genome', intro: 'A hard drive full of ATGCs and no living sample — decode it anyway.', goal: 'Describe biological databases, pairwise alignment and the central workflow of bioinformatics.' },
    discovery: {
        question: 'A researcher sequences a new virus and needs to know what its genes might do — before ever culturing it. Which tool makes that guess possible?',
        options: ['Aligning its sequence against global databases where similar sequences already carry annotations', 'X-ray crystallography of the whole virus', 'Staining the virus and reading colour bands under a microscope', 'Randomly mutating the genome and watching for changes'],
        answer: 'Aligning its sequence against global databases where similar sequences already carry annotations',
        hook: 'Bioinformatics bets that similar sequence means similar function — a billion-letter search engine for biology.',
    },
    teaching: [
        { title: 'Pairwise Sequence Alignment: Dynamic Programming', text: 'Pairwise sequence alignment using dynamic programming is a computational algorithm that finds the optimal alignment between two biological sequences (DNA, RNA, or protein) by breaking the problem.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_09_007', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Query a sequence database, run a BLAST-style comparison, and predict a gene\'s function from its matches.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_09_007', title: 'Pairwise Sequence Alignment: Dynamic Programming',
          caseStudy: { intro: 'Imagine you have two DNA sequences from different patients: Patient A has "ATCG" and Patient B has "ACG".',
            decisions: [{ prompt: 'Define the recurrence relation for the Needleman-Wunsch global alignment algorithm with linear gap penalty, specifying all variables and.', options: [
                { text: 'The recurrence is: F(i,j) = max{ F(i-1,j-1) + s(x_i, y_j), F(i-1,j) - d, F(i,j-1) - d }', outcome: 'The recurrence is: F(i,j) = max{ F(i-1,j-1) + s(x_i, y_j), F(i-1,j) - d, F(i,j-1) - d } where.' },
                { text: 'the alignment score up to that point', outcome: 'Not quite — Students believe that the dynamic programming matrix cells represent "the alignment score up.', reveals: 'the-dynamic-programming-matrix-cells' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_09_008', title: 'Scoring Matrices: PAM and BLOSUM',
          scaffold: { problem: 'You are aligning two protein sequences: Sequence A (human insulin, 51 aa) and Sequence B (pig insulin, 51 aa).',
            steps: [
            { text: 'Determine the percentage identity: 50/51 = 98% identity. This indicates very recent divergence (short evolutionary.' },
            { text: 'Recall PAM numbering: PAM1 = 1% change (99% identity), PAM30 ≈ 30 mutations/100 residues (~70% identity).' },
            { text: 'Recall BLOSUM numbering: BLOSUM90 = blocks from sequences ≥90% identity, BLOSUM80 = ≥80% identity.' },
            { text: 'Select PAM20 (or PAM10 if available) and BLOSUM90. Note that standard software often provides PAM30 as the lowest PAM.' },
            { text: 'Verify: Both matrices will give high positive scores for identical matches and moderate penalties for the single.', faded: true, blankAnswer: 'PAM20 (or PAM10) and BLOSUM90.' }
            ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_09_010', title: 'Phylogenetic Trees: Construction Methods',
          caseStudy: { intro: 'Imagine you have sequenced the cytochrome c gene from five different mammals (human, chimpanzee, mouse, rat, cow) and want to know which two are most closely.',
            decisions: [{ prompt: 'Define "p-distance" between two aligned sequences and state its limitation for deep evolutionary comparisons.', options: [
                { text: 'p-distance is the proportion of nucleotide (or amino acid) sites at', outcome: 'p-distance is the proportion of nucleotide (or amino acid) sites at which two aligned sequences.' },
                { text: 'p-distance is the number of substitutions per site', outcome: 'Not quite — Students often think "Maximum Parsimony always gives the true tree because it follows Occam\'s.', reveals: 'maximum-parsimony-always-gives-the' },
                { text: 'Maximum Parsimony always gives the true tree', outcome: 'Not quite — Students often think "Maximum Parsimony always gives the true tree because it follows Occam\'s.', reveals: 'maximum-parsimony-always-gives-the' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_09_008', title: 'Identify each idea',
          dissect: { specimen: 'Introduction to Bioinformatics · Part 2/2', spots: [
            { id: 's1', label: 'Pairwise Sequence Alignment Dynamic Programming', prompt: 'Which idea is this? — Pairwise sequence alignment using dynamic programming is a computational algorithm that.', answer: 'Pairwise Sequence Alignment Dynamic Programming', options: ['Pairwise Sequence Alignment Dynamic Programming', 'Scoring Matrices PAM and BLOSUM', 'BLAST Basic Local Alignment Search Tool', 'Phylogenetic Trees Construction Methods'] },
            { id: 's2', label: 'Scoring Matrices PAM and BLOSUM', prompt: 'Which idea is this? — Scoring matrices (PAM and BLOSUM) are quantitative substitution matrices used in sequence.', answer: 'Scoring Matrices PAM and BLOSUM', options: ['Scoring Matrices PAM and BLOSUM', 'Pairwise Sequence Alignment Dynamic Programming', 'BLAST Basic Local Alignment Search Tool', 'Phylogenetic Trees Construction Methods'] },
            { id: 's3', label: 'BLAST Basic Local Alignment Search Tool', prompt: 'Which idea is this? — BLAST (Basic Local Alignment Search Tool) is a heuristic algorithm that rapidly compares.', answer: 'BLAST Basic Local Alignment Search Tool', options: ['BLAST Basic Local Alignment Search Tool', 'Pairwise Sequence Alignment Dynamic Programming', 'Scoring Matrices PAM and BLOSUM', 'Phylogenetic Trees Construction Methods'] },
            { id: 's4', label: 'Phylogenetic Trees Construction Methods', prompt: 'Which idea is this? — A phylogenetic tree is a branching diagram that represents the evolutionary relationships.', answer: 'Phylogenetic Trees Construction Methods', options: ['Phylogenetic Trees Construction Methods', 'Pairwise Sequence Alignment Dynamic Programming', 'Scoring Matrices PAM and BLOSUM', 'BLAST Basic Local Alignment Search Tool'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A cousin in medical college is analysing sequencing reads from a patient\'s tumour. She pastes one raw read into BLAST, gets a top hit, and declares the diagnosis done: \'Bioinformatics = BLAST, one tool, one answer.\'',
            decisions: [{ prompt: 'Is one BLAST hit a diagnosis?', options: [
                { text: 'No — bioinformatics is a pipeline: raw reads → quality control (adapter/quality trimming) → alignment to reference → variant calling → annotation against curated databases → interpretation. Skipping QC or stopping at the first BLAST hit risks artifacts being read as mutations.', outcome: 'Each stage\'s output constrains the next; a single top hit without QC, alignment statistics and clinical annotation is not evidence.' },
                { text: 'Yes — BLAST searches the entire known database, so the top hit IS the answer.', outcome: 'BLAST is one tool in a multi-stage workflow; uncleaned reads and unverified variants make the \'top hit\' meaningless for diagnosis.', reveals: 'bioinformatics-is-blast' },
                { text: 'No — she should instead download all known genomes and compare them manually to be thorough.', outcome: 'That replaces the pipeline with brute force; the field exists because petabyte-scale data needs indexed databases and staged algorithms, not manual reading.', reveals: 'manual-comparison-more-thorough' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_09_010', title: 'You made it',
          caseStudy: { intro: 'Modern biology generates data faster than labs can test it — informatics turns sequence into hypothesis.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_09_007', difficulty: 'standard',
          question: 'Pairwise sequence alignment using dynamic programming is a computational.',
          hint: 'Review the concept of "optimal substructure" from dynamic programming (CS) and the.',
          misconception: 'Students believe that the dynamic programming matrix cells represent "the alignment score up to that point" in a vague.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why a greedy approach (always choosing the best immediate option: match if possible, otherwise gap) fails to find the globally.', answer: 'A greedy approach aligns "AG" perfectly (score +4), then faces "CT" vs "T"',
                  options: ['A greedy approach aligns "AG" perfectly (score +4), then faces "CT" vs "T"', 'greedy works for simple cases', 'the alignment score up to that point'],
                  hint: 'Review the concept of "optimal substructure" from dynamic programming (CS) and the definition.',
                  misconception: 'Students believe that the dynamic programming matrix cells represent "the alignment score up to that point" in a vague sense, and that.' },
                { id: 'b', prompt: 'Given sequences X="GATTACA" and Y="GCATGCU" with scoring: match=+3, mismatch=-1, gap=-2.', answer: 'First compute needed prior cells: F(2,1): X[1..2]="GA", Y[1]="G"',
                  options: ['First compute needed prior cells: F(2,1): X[1..2]="GA", Y[1]="G"', 'the alignment score up to that point'],
                  hint: 'Review the concept of "optimal substructure" from dynamic programming (CS) and the definition.',
                  misconception: 'Students believe that the dynamic programming matrix cells represent "the alignment score up to that point" in a vague sense, and that.' },
                { id: 'c', prompt: 'Compare the traceback procedures for Needleman-Wunsch and Smith-Waterman algorithms. Specifically: (a) Where does traceback start in each?', answer: 'Where does traceback start in each?',
                  options: ['Where does traceback start in each?', 'both start at bottom-right', 'the alignment score up to that point'],
                  hint: 'Review the concept of "optimal substructure" from dynamic programming (CS) and the definition.',
                  misconception: 'Students believe that the dynamic programming matrix cells represent "the alignment score up to that point" in a vague sense, and that.' }
          ],
            remediations: { 'the-dynamic-programming-matrix-cells': { steps: ['Have the student compute a 3×3 matrix by hand for sequences "AT" and "A" with match=+1, mismatch=-1, gap=-1.', 'Ask them to traceback from F(2,1) by following the *recorded sources*, not by comparing neighbor values.', 'Show them what happens if they follow max neighbor instead — they get a different, suboptimal alignment.', 'Explicitly state: "The matrix stores optimal SCORES. The traceback follows the CHOICES that achieved those scores.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that the dynamic programming matrix cells represent "the alignment score up to that point" in a vague.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since dynamic programming is O(mn) time and space, and we only need the final score, we can reduce space to O(min(m,n)) by keeping only two.', answer: 'The claim is partially correct but incomplete',
                  options: ['The claim is partially correct but incomplete', 'yes, two rows work for everything', 'no, space cannot be reduced', 'the alignment score up to that point'],
                  hint: 'Review the concept of "optimal substructure" from dynamic programming (CS) and the definition.',
                  misconception: 'Students believe that the dynamic programming matrix cells represent "the alignment score up to that point" in a vague sense, and that.' },
                { id: 'b', prompt: 'Design a novel scoring scheme for aligning two DNA sequences where transitions (A↔G, C↔T) are penalized less than transversions (purine↔pyrimidine), and gaps.', answer: 'Scoring scheme: Match=+5',
                  options: ['Scoring scheme: Match=+5', 'the alignment score up to that point'],
                  hint: 'Review the concept of "optimal substructure" from dynamic programming (CS) and the definition.',
                  misconception: 'Students believe that the dynamic programming matrix cells represent "the alignment score up to that point" in a vague sense, and that.' }
          ],
            remediations: { 'the-dynamic-programming-matrix-cells': { steps: ['Have the student compute a 3×3 matrix by hand for sequences "AT" and "A" with match=+1, mismatch=-1, gap=-1.', 'Ask them to traceback from F(2,1) by following the *recorded sources*, not by comparing neighbor values.', 'Show them what happens if they follow max neighbor instead — they get a different, suboptimal alignment.', 'Explicitly state: "The matrix stores optimal SCORES. The traceback follows the CHOICES that achieved those scores.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_09_008', difficulty: 'standard',
          question: 'Scoring matrices (PAM and BLOSUM) are quantitative substitution matrices used.',
          hint: 'Revisit the dynamic programming alignment node (c11_biotech_cbse_09_007) and trace how.',
          misconception: 'Students often believe that "PAM matrices are for global alignment and BLOSUM matrices are for local alignment" as.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Scoring matrices (PAM and BLOSUM) are quantitative substitution matrices used in sequence',
                  options: ['Scoring matrices (PAM and BLOSUM) are quantitative substitution matrices used in sequence', 'Bioinformatics is an interdisciplinary field that integrates computational, mathematical,', 'Primary databases store raw experimental data submitted directly by researchers (e.g.,', 'GenBank, EMBL (European Molecular Biology Laboratory), and DDBJ (DNA Data Bank of Japan)'],
                  hint: 'Revisit the dynamic programming alignment node (c11_biotech_cbse_09_007) and trace how changing the.',
                  misconception: 'Students often believe that "PAM matrices are for global alignment and BLOSUM matrices are for local alignment" as an absolute rule.' }
          ],
            remediations: { 'pam-matrices-are-for-global': { steps: ['Draw a two-column table on paper. Column 1: PAM series (1, 30, 120, 250). Column 2: BLOSUM series (90, 80, 62, 45, 30).', 'Label each with "evolutionary distance" (short/long) and "percentage identity" (high/low).', 'Write the derivation logic in one sentence each: "PAM: extrapolated from 1% change global alignments" vs "BLOSUM.', 'Practice mapping scenarios: "human vs chimp protein" → BLOSUM80/PAM30; "human vs yeast protein" → BLOSUM45/PAM250.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_09_009', difficulty: 'standard',
          question: 'BLAST (Basic Local Alignment Search Tool) is a heuristic algorithm that rapidly.',
          hint: 'If stuck, revisit **c11_biotech_cbse_09_006 (Sequence Alignment: Global and Local)** and.',
          misconception: '**Misconception:** "A lower E-value always means the sequences are more similar (higher % identity)." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'Explain why the default word size (W) differs between blastn (W=11) and blastp (W=3), and how changing W affects sensitivity and speed.', answer: 'Correct answer: Nucleotide alphabet size is 4 (A,T,G,C)',
                  options: ['Correct answer: Nucleotide alphabet size is 4 (A,T,G,C)', 'blastp uses W=3 because proteins are longer'],
                  hint: 'If stuck, revisit **c11_biotech_cbse_09_006 (Sequence Alignment: Global and Local)** and.',
                  misconception: '**Misconception:** "A lower E-value always means the sequences are more similar (higher % identity)." **Why it\'s wrong:** E-value depends.' },
                { id: 'b', prompt: 'Compare and contrast the heuristic strategy of BLAST with the dynamic programming algorithm (Needleman-Wunsch / Smith-Waterman) in terms of: (a) guaranteed.', answer: 'Correct comparison: (a) DP guarantees globally/locally optimal alignment',
                  options: ['Correct comparison: (a) DP guarantees globally/locally optimal alignment', 'BLAST is always faster and better'],
                  hint: 'If stuck, revisit **c11_biotech_cbse_09_006 (Sequence Alignment: Global and Local)** and.',
                  misconception: '**Misconception:** "A lower E-value always means the sequences are more similar (higher % identity)." **Why it\'s wrong:** E-value depends.' }
          ],
            remediations: { 'misconception-a-lower-e-value': { steps: ['**Step-by-step remediation:** 1.', '**Re-derive the E-value formula** from Karlin-Altschul statistics: E = K * m * n * e^(-λS).', 'Identify each variable: m = query length, n = database size, S = bit score (raw score normalized by λ).', '**Create a mini-table**: Fix S=50 bits, n=1e8.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_09_010', difficulty: 'standard',
          question: 'A phylogenetic tree is a branching diagram that represents the evolutionary.',
          hint: 'Revisit c11_biotech_cbse_09_007 (Dynamic Programming for pairwise alignment) and practice.',
          misconception: 'Students often think "Maximum Parsimony always gives the true tree because it follows Occam\'s razor" and "bootstrap.',
          parts: [
                { id: 'a', prompt: 'Define "p-distance" between two aligned sequences and state its limitation for deep evolutionary comparisons.', answer: 'p-distance is the proportion of nucleotide (or amino acid) sites at',
                  options: ['p-distance is the proportion of nucleotide (or amino acid) sites at', 'p-distance is the number of substitutions per site', 'Maximum Parsimony always gives the true tree', 'bootstrap value of 95% means there is a 95% probability the clade is true'],
                  hint: 'Revisit c11_biotech_cbse_09_007 (Dynamic Programming for pairwise alignment) and practice aligning.',
                  misconception: 'Students often think "Maximum Parsimony always gives the true tree because it follows Occam\'s razor" and "bootstrap value of 95% means.' },
                { id: 'b', prompt: 'Explain why UPGMA assumes a molecular clock and what happens to the tree topology if this assumption is violated.', answer: 'UPGMA assumes a molecular clock',
                  options: ['UPGMA assumes a molecular clock', 'UPGMA does not assume a clock', 'Maximum Parsimony always gives the true tree', 'bootstrap value of 95% means there is a 95% probability the clade is true'],
                  hint: 'Revisit c11_biotech_cbse_09_007 (Dynamic Programming for pairwise alignment) and practice aligning.',
                  misconception: 'Students often think "Maximum Parsimony always gives the true tree because it follows Occam\'s razor" and "bootstrap value of 95% means.' },
                { id: 'c', prompt: 'Given the following p-distance matrix for four taxa (A, B, C, D), perform the first two clustering steps of UPGMA and draw the partially resolved tree with.', answer: 'Step 1: Smallest distance is A-B (0.2)',
                  options: ['Step 1: Smallest distance is A-B (0.2)', 'Maximum Parsimony always gives the true tree', 'bootstrap value of 95% means there is a 95% probability the clade is true'],
                  hint: 'Revisit c11_biotech_cbse_09_007 (Dynamic Programming for pairwise alignment) and practice aligning.',
                  misconception: 'Students often think "Maximum Parsimony always gives the true tree because it follows Occam\'s razor" and "bootstrap value of 95% means.' },
                { id: 'd', prompt: 'Compare Neighbor-Joining and UPGMA in terms of: (a) molecular clock assumption, (b) tree output (rooted/unrooted), (c) computational complexity for large.', answer: 'molecular clock assumption, (',
                  options: ['molecular clock assumption, (', 'NJ assumes a clock', 'Maximum Parsimony always gives the true tree', 'bootstrap value of 95% means there is a 95% probability the clade is true'],
                  hint: 'Revisit c11_biotech_cbse_09_007 (Dynamic Programming for pairwise alignment) and practice aligning.',
                  misconception: 'Students often think "Maximum Parsimony always gives the true tree because it follows Occam\'s razor" and "bootstrap value of 95% means.' }
          ],
            remediations: { 'maximum-parsimony-always-gives-the': { steps: ['Draw a 4-taxon tree with two long branches and two short branches (Felsenstein zone).', 'Show that parsimony groups the two long branches together due to convergent substitutions, while likelihood (with.', 'Explain bootstrap as: "If I resample my alignment columns 100 times, how many times does this split appear?" — it\'s.', 'Have the student compute parsimony score for two alternative topologies on a 4-sequence, 5-site alignment to see that.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
