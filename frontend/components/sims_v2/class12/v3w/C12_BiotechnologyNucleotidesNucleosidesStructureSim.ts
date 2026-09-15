import type { SimDef } from '../../engine/types';
import C12_BiotechnologyNucleotidesNucleosidesStructureSim from '../../../simulations/c6_12/C12_BiotechnologyNucleotidesNucleosidesStructureSim';

/** v3 wrapped master — C12_BiotechnologyNucleotidesNucleosidesStructureSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biotechnologynucleotidesnucleosidesstructuresim: SimDef = {
    id: 'v3w_c12_biotechnologynucleotidesnucleosidesstructuresim',
    title: 'nology Nucleotides Nucleosides Structure',
    subtitle: 'Covers classification of biological databases (primary, secondary, composite), major.',
    classLevel: 12, subject: 'biotechnology', topic: 'Bioinformatics: Biological Databases and Analysis Tools',
    chapters: [],
    nodeIds: ['c12_biotech_cbse_05_007', 'c12_biotech_cbse_02_007', 'c12_biotech_cbse_05_005', 'c12_biotech_cbse_05_006', 'c12_biotech_cbse_02_003', 'c12_biotech_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you have just sequenced a novel gene from a drought-tolerant millet variety grown in Rajasthan.', goal: 'Master nology Nucleotides Nucleosides Structure.' },
    discovery: {
        question: 'Name the three major primary nucleotide sequence databases that form the International Nucleotide Sequence Database Collaboration (INSDC) and state the.',
        options: ['The three databases are GenBank (USA), EMBL-EBI (Europe), and DDBJ (Japan)', 'the entire internet', 'all known sequences'],
        answer: 'The three databases are GenBank (USA), EMBL-EBI (Europe), and DDBJ (Japan)',
        hook: 'Students believe that BLAST searches "the entire internet" or "all known sequences" and that a top hit with 99%.',
    },
    teaching: [
        { title: 'Bioinformatics is the interdisciplinary.', text: 'Bioinformatics is the interdisciplinary science that creates, maintains, and analyses biological databases and computational tools to store, retrieve, and interpret genomic, transcriptomic, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_05_007', title: 'Bioinformatics is the interdisciplinary.',
          scaffold: { problem: 'A researcher has a 2.5 kb genomic DNA fragment from a newly isolated soil bacterium.',
            steps: [
            { text: 'Identify the appropriate primary nucleotide database for submission — GenBank (via BankIt/Sequin) because it\'s part of.' },
            { text: 'Retrieve the sequence in FASTA format from GenBank using the accession number.' },
            { text: 'Run BLASTN (nucleotide vs nucleotide) against the "nr" (non-redundant) database limited to Bacteria (taxid:2) to find.' },
            { text: 'For conserved protein domains, run BLASTX (translated query vs protein database) against UniProtKB/Swiss-Prot (curated).' },
            { text: 'Save BLAST results in XML or tabular format for parsing; extract hit sequences in FASTA for multiple alignment.', faded: true, blankAnswer: 'Workflow: Submit to GenBank → Retrieve FASTA → BLASTN (nr,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_02_007', title: 'Primer design for PCR is the process of.',
          scaffold: { problem: 'A researcher wants to amplify a 500 bp gene fragment. The coding strand sequence at the 5\' end is: 5\'-ATG GCT AGC TGA TCC GTA ACC-3\'.',
            steps: [
            { text: 'Extract the first 20 nucleotides of the coding strand as the forward primer (5\'→3\'): 5\'-ATGGCTAGCTGATCCGTAAC-3\'.' },
            { text: 'Count nucleotides: A=5, T=5, G=5, C=5. Total N=20. GC count = 10. GC% = (10/20)×100 = 50%.' },
            { text: 'Apply Wallace rule: Tm = 2×(A+T) + 4×(G+C) = 2×(5+5) + 4×(5+5) = 2×10 + 4×10 = 20 + 40 = 60°C.' },
            { text: 'Apply salt-adjusted formula: Tm = 81.5 + 16.6×log10(0.05) + 41×(50) - 600/20. log10(0.05) = -1.3010.' },
            { text: 'Evaluate criteria: Length 20 nt (✓ 18-30), GC% 50% (✓ 40-60%), Wallace Tm 60°C (✓ 55-65°C), Salt-adjusted Tm 50.4°C.', faded: true, blankAnswer: 'Primer: 5\'-ATGGCTAGCTGATCCGTAAC-3\'; GC% = 50%; Wallace Tm =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_05_005', title: 'The Human Genome Project (HGP) was an.',
          scaffold: { problem: 'The HGP consortium used a hierarchical shotgun approach. A chromosome 22 BAC contig consists of 10 overlapping BAC clones, each averaging.',
            steps: [
            { text: 'Identify given values: number of BACs (n = 10), average insert size = 150 kb, overlap = 30 kb.' },
            { text: 'Recognize that total contig length = (n × insert size) - ((n-1) × overlap) because overlaps are counted twice if simply.' },
            { text: 'Substitute values: Total length = (10 × 150 kb) - (9 × 30 kb) = 1500 kb - 270 kb = 1230 kb.' },
            { text: 'Convert kilobases to megabases: 1230 kb ÷ 1000 = 1.23 Mb.' },
            { text: 'Interpret: This contig covers 1.23 Mb of chromosome 22 euchromatin; actual chromosome 22 is ~51 Mb, so many such.', faded: true, blankAnswer: '1.23 Mb' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_05_006', title: 'DNA sequencing technologies determine.',
          scaffold: { problem: 'A diagnostic lab needs to screen 100 patient samples for a known 200 bp mutation in the CFTR gene (cystic fibrosis).',
            steps: [
            { text: 'Calculate Sanger total cost and time. 100 samples × 2 reactions/sample × ₹500 = ₹100,000.' },
            { text: 'Calculate Illumina total cost. Library prep: 100 samples × ₹2,000 = ₹200,000. Sequencing run: ₹50,000. Total = ₹250,000.' },
            { text: 'Calculate Illumina data yield vs. need. Each sample needs ~200 bp × 2 (paired-end) = 400 bp.' },
            { text: 'Compare cost per sample. Sanger: ₹1,000/sample. Illumina: ₹2,500/sample (but most capacity unused).' },
            { text: 'Interpret. For 100 targeted samples, Sanger is cheaper and faster.', faded: true, blankAnswer: 'Sanger is more cost-effective (₹100,000 vs ₹250,000) and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_02_003', title: 'DNA ligase is an enzyme that catalyzes.',
          scaffold: { problem: 'A recombinant plasmid is constructed by ligating a 2.5 kb insert (with EcoRI sticky ends) into a 4.0 kb vector (also cut with EcoRI).',
            steps: [
            { text: 'Calculate the molar amount of vector. Use the formula: moles = (mass in g) / (length in bp × 660 g/mol per bp).' },
            { text: 'Determine moles of insert needed for 3:1 molar ratio. Moles of insert = 3 × moles of vector = 3 × 1.89 × 10⁻¹⁴ = 5.68 ×.' },
            { text: 'Calculate mass of insert. Insert length = 2500 bp. Molar mass of insert = 2500 × 660 = 1.65 × 10⁶ g/mol.' },
            { text: 'Explain the 3:1 ratio. Sticky ends anneal transiently; a higher insert concentration drives the equilibrium toward.' },
            { text: 'Verify: The mass ratio insert:vector = 93.7 ng : 50 ng ≈ 1.87:1, which is reasonable because the insert is smaller.', faded: true, blankAnswer: '93.7 ng of insert DNA.' }
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
        { type: 'dissect', nodeId: 'c12_biotech_cbse_02_007', title: 'Identify each idea',
          dissect: { specimen: 'nology Nucleotides Nucleosides Structure', spots: [
            { id: 's1', label: 'Bioinformatics is the interdisciplinary science', prompt: 'Which idea is this? — Bioinformatics is the interdisciplinary science that creates, maintains, and analyses.', answer: 'Bioinformatics is the interdisciplinary science', options: ['Bioinformatics is the interdisciplinary science', 'Primer design for PCR is', 'The Human Genome Project HGP', 'DNA sequencing technologies determine the'] },
            { id: 's2', label: 'Primer design for PCR is', prompt: 'Which idea is this? — Primer design for PCR is the process of selecting short, single-stranded DNA.', answer: 'Primer design for PCR is', options: ['Primer design for PCR is', 'Bioinformatics is the interdisciplinary science', 'The Human Genome Project HGP', 'DNA sequencing technologies determine the'] },
            { id: 's3', label: 'The Human Genome Project HGP', prompt: 'Which idea is this? — The Human Genome Project (HGP) was an international scientific research project.', answer: 'The Human Genome Project HGP', options: ['The Human Genome Project HGP', 'Bioinformatics is the interdisciplinary science', 'Primer design for PCR is', 'DNA sequencing technologies determine the'] },
            { id: 's4', label: 'DNA sequencing technologies determine the', prompt: 'Which idea is this? — DNA sequencing technologies determine the precise order of nucleotides (A, T, C, G) in a.', answer: 'DNA sequencing technologies determine the', options: ['DNA sequencing technologies determine the', 'Bioinformatics is the interdisciplinary science', 'Primer design for PCR is', 'The Human Genome Project HGP'] },
            { id: 's5', label: 'DNA ligase is an enzyme', prompt: 'Which idea is this? — DNA ligase is an enzyme that catalyzes the formation of a phosphodiester bond between the.', answer: 'DNA ligase is an enzyme', options: ['DNA ligase is an enzyme', 'Bioinformatics is the interdisciplinary science', 'Primer design for PCR is', 'The Human Genome Project HGP'] },
            { id: 's6', label: 'Sanger dideoxy DNA sequencing is', prompt: 'Which idea is this? — Sanger dideoxy DNA sequencing is a chain-termination method that determines the.', answer: 'Sanger dideoxy DNA sequencing is', options: ['Sanger dideoxy DNA sequencing is', 'Bioinformatics is the interdisciplinary science', 'Primer design for PCR is', 'The Human Genome Project HGP'] }
          ] } }
    ],
    explore: { component: C12_BiotechnologyNucleotidesNucleosidesStructureSim, prompt: 'Explore the interactive — nology Nucleotides Nucleosides Structure' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_007', difficulty: 'standard',
          question: 'Bioinformatics is the interdisciplinary science that creates, maintains, and.',
          hint: 'Revisit c11_biotech_cbse_09_002 (database classification) and c11_biotech_cbse_09_005.',
          misconception: 'Students believe that BLAST searches "the entire internet" or "all known sequences" and that a top hit with 99%.',
          parts: [
                { id: 'a', prompt: 'Name the three major primary nucleotide sequence databases that form the International Nucleotide Sequence Database Collaboration (INSDC) and state the.', answer: 'The three databases are GenBank (USA), EMBL-EBI (Europe), and DDBJ (Japan)',
                  options: ['The three databases are GenBank (USA), EMBL-EBI (Europe), and DDBJ (Japan)', 'the entire internet', 'all known sequences'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that BLAST searches "the entire internet" or "all known sequences" and that a top hit with 99% identity always means the.' },
                { id: 'b', prompt: 'You have a 1.2 kb cDNA sequence from a medicinal plant. You want to find all known protein sequences that share significant similarity.', answer: 'Use BLASTX (translated nucleotide query vs protein database) against the',
                  options: ['Use BLASTX (translated nucleotide query vs protein database) against the', 'the entire internet', 'all known sequences'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that BLAST searches "the entire internet" or "all known sequences" and that a top hit with 99% identity always means the.' }
          ],
            remediations: { 'blast-searches-the-entire-internet': { steps: ['Have the student open NCBI\'s GenBank and UniProt homepages; compare the "Submission" vs "Reviewed" badges.', 'Run a BLASTN search with a short random sequence against nr and note the E-values — discuss why hits appear by chance.', 'Retrieve a GenBank record with "WARNING: LOW QUALITY SEQUENCE" flag and examine the COMMENT section.', 'Re-attempt DIAGNOSTIC_QUESTION_3 and DIAGNOSTIC_QUESTION_5 with this concrete experience.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that BLAST searches "the entire internet" or "all known sequences" and that a top hit with 99%.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A BLAST hit with E-value = 10⁻⁵ is more significant than a hit with E-value = 10⁻⁵⁰." Defend your evaluation with the definition of.', answer: 'The statement is false',
                  options: ['The statement is false', 'the entire internet', 'all known sequences'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that BLAST searches "the entire internet" or "all known sequences" and that a top hit with 99% identity always means the.' }
          ],
            remediations: { 'blast-searches-the-entire-internet': { steps: ['Have the student open NCBI\'s GenBank and UniProt homepages; compare the "Submission" vs "Reviewed" badges.', 'Run a BLASTN search with a short random sequence against nr and note the E-values — discuss why hits appear by chance.', 'Retrieve a GenBank record with "WARNING: LOW QUALITY SEQUENCE" flag and examine the COMMENT section.', 'Re-attempt DIAGNOSTIC_QUESTION_3 and DIAGNOSTIC_QUESTION_5 with this concrete experience.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_007', difficulty: 'standard',
          question: 'Primer design for PCR is the process of selecting short, single-stranded DNA.',
          hint: 'Revisit c11_biotech_cbse_03_006 (DNA Structure) and practice writing complementary.',
          misconception: 'Students often believe that "longer primers are always more specific" and design 35–40 nt primers.',
          parts: [
                { id: 'a', prompt: 'A student writes a forward primer sequence: 5\'-ATGCGTACGTACGTACGT-3\'.', answer: 'The primer has 20 nucleotides',
                  options: ['The primer has 20 nucleotides', 'longer primers are always more specific', '"longer primers are always more specific" and design 35–40 nt primers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "longer primers are always more specific" and design 35–40 nt primers.' },
                { id: 'b', prompt: 'Explain why a primer pair with a ΔTm (difference in melting temperatures) of 12°C would likely fail in a standard PCR, even if both primers individually have.', answer: 'PCR uses a single annealing temperature for both primers',
                  options: ['PCR uses a single annealing temperature for both primers', 'it works because both are in range', 'longer primers are always more specific'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "longer primers are always more specific" and design 35–40 nt primers.' },
                { id: 'c', prompt: 'Given the target DNA sequence: 5\'-...ATG GCT AGC TGA TCC GTA...-3\' (coding strand), design a 20-nucleotide forward primer starting at the ATG start codon.', answer: 'Forward primer (same as coding strand start): 5\'-ATGGCTAGCTGATCCGTA-3\' (20 nt)',
                  options: ['Forward primer (same as coding strand start): 5\'-ATGGCTAGCTGATCCGTA-3\' (20 nt)', 'longer primers are always more specific', '"longer primers are always more specific" and design 35–40 nt primers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "longer primers are always more specific" and design 35–40 nt primers.' }
          ],
            remediations: { 'longer-primers-are-always-more': { steps: ['If a student cannot calculate Tm or GC%, direct them to: (1) revisit c11_biotech_cbse_03_006 (DNA Structure) to.', 'Re-diagnostic: Give a new 20-mer and ask for both Tm values and whether they differ by >3°C.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "longer primers are always more specific" and design 35–40 nt primers.',
          parts: [
                { id: 'a', prompt: 'A researcher claims: "For maximum specificity, I always design primers with the highest possible GC content (80–90%) because G-C pairs have three hydrogen.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'longer primers are always more specific', '"longer primers are always more specific" and design 35–40 nt primers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "longer primers are always more specific" and design 35–40 nt primers.' },
                { id: 'b', prompt: 'Create a 22-nucleotide forward primer for the sequence 5\'-ATG GAA TTC GAT CCA GCT AGC-3\' (coding strand) such that: (a) it starts at the ATG, (b) its GC% is.', answer: 'Target start: ATGGAA',
                  options: ['Target start: ATGGAA', 'longer primers are always more specific', '"longer primers are always more specific" and design 35–40 nt primers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "longer primers are always more specific" and design 35–40 nt primers.' }
          ],
            remediations: { 'longer-primers-are-always-more': { steps: ['If a student cannot calculate Tm or GC%, direct them to: (1) revisit c11_biotech_cbse_03_006 (DNA Structure) to.', 'Re-diagnostic: Give a new 20-mer and ask for both Tm values and whether they differ by >3°C.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_005', difficulty: 'standard',
          question: 'The Human Genome Project (HGP) was an international scientific research project.',
          hint: 'Revisit c12_biotech_cbse_05_002 (Structural Genomics) sections on STS mapping and BAC.',
          misconception: 'Students often think the Human Genome Project "finished" in 2003 with a single, complete, error-free sequence of one.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Human Genome Project (HGP) was an international scientific research project',
                  options: ['The Human Genome Project (HGP) was an international scientific research project', 'Bioinformatics is the interdisciplinary science that creates, maintains, and analyses', 'Primer design for PCR is the process of selecting short, single-stranded DNA', 'DNA sequencing technologies determine the precise order of nucleotides (A, T, C, G) in a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Human Genome Project "finished" in 2003 with a single, complete, error-free sequence of one human.' }
          ],
            remediations: { 'the-human-genome-project-finished': { steps: ['If a student holds this misconception, guide them through: (1) Show the 2001 Nature/Science papers labeled "draft.', '(3) Assign a mini-task: Use UCSC Genome Browser to view gap tracks in GRCh37 vs GRCh38 vs T2T-CHM13.', '(4) Re-ask Diagnostic Question 5 to confirm corrected understanding.'] } } },
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
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_003', difficulty: 'standard',
          question: 'DNA ligase is an enzyme that catalyzes the formation of a phosphodiester bond.',
          hint: 'Revisit c11_biotech_cbse_03_008 (Nucleotides and Nucleosides) and c11_biotech_cbse_03_006.',
          misconception: 'Students often believe that DNA ligase "recognizes" specific DNA sequences like restriction enzymes do.',
          parts: [
                { id: 'a', prompt: 'Explain why DNA ligase requires ATP (or NAD⁺) even though the phosphodiester bond formation is a condensation reaction that releases water.', answer: 'The direct condensation between a 3\'-OH and a 5\'-phosphate is thermodynamically',
                  options: ['The direct condensation between a 3\'-OH and a 5\'-phosphate is thermodynamically', 'ATP provides energy for the bond', 'recognizes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that DNA ligase "recognizes" specific DNA sequences like restriction enzymes do.' },
                { id: 'b', prompt: 'A researcher sets up two ligation reactions: Reaction A contains a 3 kb vector and a 1 kb insert, both cut with BamHI (sticky ends).', answer: 'Reaction A (sticky ends) will have higher yield',
                  options: ['Reaction A (sticky ends) will have higher yield', 'both are equal because DNA concentration is the same', 'recognizes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that DNA ligase "recognizes" specific DNA sequences like restriction enzymes do.' },
                { id: 'c', prompt: 'Compare the cofactor requirements of T4 DNA ligase (from bacteriophage T4) and E. coli DNA ligase.', answer: 'T4 DNA ligase uses ATP as a cofactor, while E',
                  options: ['T4 DNA ligase uses ATP as a cofactor, while E', 'recognizes', 'DNA ligase "recognizes" specific DNA sequences like restriction enzymes do'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that DNA ligase "recognizes" specific DNA sequences like restriction enzymes do.' }
          ],
            remediations: { 'dna-ligase-recognizes-specific-dna': { steps: ['If a student exhibits the above misconception, do the following: (1) Show a side-by-side comparison: restriction enzyme.', 'DNA ligase binding to a generic nick.', 'Highlight that EcoRI makes sequence-specific contacts with bases in the major groove, while ligase contacts the.', '(2) Have the student predict whether T4 DNA ligase can join a nick in a synthetic duplex with a random sequence (e.g.,.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that DNA ligase "recognizes" specific DNA sequences like restriction enzymes do.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If I treat a linearized vector with alkaline phosphatase (which removes 5\'-phosphates), then add insert DNA with 5\'-phosphates, DNA ligase.', answer: 'The claim is false',
                  options: ['The claim is false', 'recognizes', 'DNA ligase "recognizes" specific DNA sequences like restriction enzymes do'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that DNA ligase "recognizes" specific DNA sequences like restriction enzymes do.' }
          ],
            remediations: { 'dna-ligase-recognizes-specific-dna': { steps: ['If a student exhibits the above misconception, do the following: (1) Show a side-by-side comparison: restriction enzyme.', 'DNA ligase binding to a generic nick.', 'Highlight that EcoRI makes sequence-specific contacts with bases in the major groove, while ligase contacts the.', '(2) Have the student predict whether T4 DNA ligase can join a nick in a synthetic duplex with a random sequence (e.g.,.'] } } },
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
            remediations: { 'misconception-the-ddntps-are-added': { steps: ['Revisit **c11_biotech_cbse_03_008** (Nucleotides and Nucleosides) to draw dATP vs ddATP side-by-side, highlighting the.', 'Re-watch the Sanger animation from **c11_biotech_cbse_12_010** focusing on the *simultaneous* presence of dNTPs and.', 'Do a "paper gel" exercise: write a 10-base template, simulate fragment lengths for each ddNTP at 10% incorporation,.', 'Re-attempt **DIAGNOSTIC_QUESTION_3** with a different ratio (e.g., 1:10) to reinforce the probability calculation.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
