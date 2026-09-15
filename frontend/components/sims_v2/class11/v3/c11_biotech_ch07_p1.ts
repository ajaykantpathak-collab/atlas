import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch07_p1: SimDef = {
    id: 'v3_c11_biotech_ch07_p1',
    title: 'Eukaryotic Gene Expression · Part 1/2',
    subtitle: 'Trace transcription, RNA processing and translation in eukaryotes.',
    classLevel: 11, subject: 'biotechnology', topic: 'Eukaryotic Gene Expression · Part 1/2',
    chapters: ['c11_biotech_ch07'],
    nodeIds: ['c11_biotech_cbse_07_001', 'c11_biotech_cbse_07_002', 'c11_biotech_cbse_07_003', 'c11_biotech_cbse_07_004', 'c11_biotech_cbse_07_005', 'c11_biotech_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a molecular biologist debugging why a cell isn\'t making its protein', intro: 'The gene is there, the ribosomes work — yet no protein. Somewhere in the pipeline, the signal died.', goal: 'Outline transcription, splicing, capping, polyadenylation and translation, and sites of regulation.' },
    discovery: {
        question: 'A bacterium reads a gene straight off the DNA, but a human cell must first cut out long stretches of the gene\'s transcript before it can make protein. Why the extra surgery?',
        options: ['Eukaryotic genes contain introns that are spliced out, leaving exons to be joined into mature mRNA', 'Human DNA contains errors that must be deleted before reading', 'The extra stretches are viruses hiding inside genes', 'Splicing is decorative — the protein is identical either way'],
        answer: 'Eukaryotic genes contain introns that are spliced out, leaving exons to be joined into mature mRNA',
        hook: 'A eukaryotic gene is a movie with deleted scenes — splicing decides which footage makes the final cut.',
    },
    teaching: [
        { title: 'Central Dogma of Molecular Biology', text: 'The Central Dogma of Molecular Biology describes the unidirectional flow of genetic information in biological systems: DNA is replicated to DNA, transcribed into RNA, and translated into protein.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_07_001', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Follow a eukaryotic gene from transcription through splicing to translation, and find where regulation can intercept it.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_07_001', title: 'Central Dogma of Molecular Biology',
          caseStudy: { intro: 'Imagine you are a bioengineer at an Indian vaccine company (like Serum Institute or Bharat Biotech) tasked with producing an mRNA vaccine for a new virus.',
            decisions: [{ prompt: 'State the Central Dogma of Molecular Biology as proposed by Francis Crick, including the one major exception discovered later.', options: [
                { text: 'The Central Dogma states that genetic information flows from DNA → RNA → Protein', outcome: 'The Central Dogma states that genetic information flows from DNA → RNA → Protein.' },
                { text: 'DNA → Protein directly', outcome: 'Not quite — **Misconception**: "The Central Dogma means DNA makes RNA makes Protein *in that exact order.', reveals: 'misconception-the-central-dogma-means' },
                { text: 'Protein → DNA', outcome: 'Not quite — **Misconception**: "The Central Dogma means DNA makes RNA makes Protein *in that exact order.', reveals: 'misconception-the-central-dogma-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_07_002', title: 'Transcription: Initiation, Elongation and Termination',
          caseStudy: { intro: 'Imagine you\'re a forensic scientist analysing a crime scene where only a tiny DNA fragment was recovered.',
            decisions: [{ prompt: 'Define the term "transcription unit" and list its three essential cis-acting DNA elements in the 5\'→3\' direction along the coding strand.', options: [
                { text: 'A transcription unit is the stretch of DNA transcribed into a single RNA molecule', outcome: 'A transcription unit is the stretch of DNA transcribed into a single RNA molecule.' },
                { text: 'operator', outcome: 'Not quite — Students believe "the coding strand is the template for transcription because it has the same.', reveals: 'the-coding-strand-is-the' },
                { text: 'enhancer', outcome: 'Not quite — Students believe "the coding strand is the template for transcription because it has the same.', reveals: 'the-coding-strand-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_07_003', title: 'RNA Polymerase: Types and Function',
          caseStudy: { intro: 'Imagine you are a forensic biotechnologist analyzing a crime scene sample: you need to amplify a specific gene fragment using PCR, but first you must.',
            decisions: [{ prompt: 'Name the three eukaryotic nuclear RNA polymerases and state the major class of RNA each transcribes.', options: [
                { text: 'RNA Polymerase I transcribes 28S, 18S, and 5.8S rRNA', outcome: 'RNA Polymerase I transcribes 28S, 18S, and 5.8S rRNA; RNA Polymerase II transcribes hnRNA.' },
                { text: 'RNA Polymerase II transcribes all mRNAs', outcome: 'Not quite — Students often believe that "RNA Polymerase II transcribes all mRNAs" and therefore assume it also.', reveals: 'rna-polymerase-ii-transcribes-all' },
                { text: 'it also transcribes the 5\' cap and poly-A tail', outcome: 'Not quite — Students often believe that "RNA Polymerase II transcribes all mRNAs" and therefore assume it also.', reveals: 'rna-polymerase-ii-transcribes-all' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_07_004', title: 'Post-Transcriptional Modifications: Capping and Polyadenylation',
          caseStudy: { intro: 'Imagine a pharmaceutical company in Hyderabad producing recombinant insulin: the human insulin gene is inserted into a eukaryotic expression vector (e.g., CHO.',
            decisions: [{ prompt: 'What is the chemical nature of the 5\' cap structure added to eukaryotic pre-mRNA?', options: [
                { text: 'The 5\' cap is 7-methylguanosine linked to the first transcribed nucleotide via a 5\'-5\'', outcome: 'The 5\' cap is 7-methylguanosine linked to the first transcribed nucleotide via a 5\'-5\' triphosphate.' },
                { text: 'a methylated adenine', outcome: 'Not quite — Students often believe that the 5\' cap is simply a methylated guanine nucleotide attached by.', reveals: 'the-5-cap-is-simply' },
                { text: 'a simple GTP attached by 3\'-5\' phosphodiester bond', outcome: 'Not quite — Students often believe that the 5\' cap is simply a methylated guanine nucleotide attached by.', reveals: 'the-5-cap-is-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_07_005', title: 'RNA Splicing: Introns and Exons',
          caseStudy: { intro: 'Imagine a patient with β-thalassemia who produces abnormal hemoglobin because a single G→A mutation at the 5\' splice site of intron 1 in the β-globin gene.',
            decisions: [{ prompt: 'A student writes: "Introns are non-coding DNA sequences that are removed during transcription." Identify the two factual errors in this.', options: [
                { text: 'Errors: (1) Introns are removed from the *primary transcript (pre-mRNA/hnRNA)*, not from', outcome: 'Errors: (1) Introns are removed from the *primary transcript (pre-mRNA/hnRNA)*, not from DNA—the.' },
                { text: 'Introns are evolutionary junk that are simply discarded', outcome: 'Not quite — Students believe: "Introns are evolutionary junk that are simply discarded." This error arises.', reveals: 'introns-are-evolutionary-junk-that' },
                { text: 'Introns have no function', outcome: 'Not quite — Students believe: "Introns are evolutionary junk that are simply discarded." This error arises.', reveals: 'introns-are-evolutionary-junk-that' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_07_006', title: 'Genetic Code: Codons and Their Properties',
          caseStudy: { intro: 'Imagine you receive a WhatsApp message written in a language where every word is exactly three letters long, some words mean the same thing (synonyms), three.',
            decisions: [{ prompt: 'Define a codon and state how many codons exist in the standard genetic code.', options: [
                { text: 'A codon is a sequence of three consecutive nucleotides in mRNA that specifies an amino', outcome: 'A codon is a sequence of three consecutive nucleotides in mRNA that specifies an amino acid or.' },
                { text: 'a codon is a pair of nucleotides', outcome: 'Not quite — Students often think that because the code is degenerate, a mutation in the third base of a codon.', reveals: 'because-the-code-is-degenerate' },
                { text: 'there are 20 codons', outcome: 'Not quite — Students often think that because the code is degenerate, a mutation in the third base of a codon.', reveals: 'because-the-code-is-degenerate' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'Eukaryotic Gene Expression · Part 1/2', spots: [
            { id: 's1', label: 'Central Dogma of Molecular Biology', prompt: 'Which idea is this? — The Central Dogma of Molecular Biology describes the unidirectional flow of genetic.', answer: 'Central Dogma of Molecular Biology', options: ['Central Dogma of Molecular Biology', 'Transcription Initiation Elongation and Termination', 'RNA Polymerase Types and Function', 'RNA Splicing Introns and Exons'] },
            { id: 's2', label: 'Transcription Initiation Elongation and Termination', prompt: 'Which idea is this? — Transcription is the enzyme-catalysed synthesis of a complementary RNA strand using a DNA.', answer: 'Transcription Initiation Elongation and Termination', options: ['Transcription Initiation Elongation and Termination', 'Central Dogma of Molecular Biology', 'RNA Polymerase Types and Function', 'RNA Splicing Introns and Exons'] },
            { id: 's3', label: 'RNA Polymerase Types and Function', prompt: 'Which idea is this? — RNA polymerase is a DNA-dependent RNA polymerase enzyme that synthesizes RNA molecules.', answer: 'RNA Polymerase Types and Function', options: ['RNA Polymerase Types and Function', 'Central Dogma of Molecular Biology', 'Transcription Initiation Elongation and Termination', 'RNA Splicing Introns and Exons'] },
            { id: 's4', label: 'RNA Splicing Introns and Exons', prompt: 'Which idea is this? — RNA splicing is the precise, ATP-dependent post-transcriptional process in eukaryotes.', answer: 'RNA Splicing Introns and Exons', options: ['RNA Splicing Introns and Exons', 'Central Dogma of Molecular Biology', 'Transcription Initiation Elongation and Termination', 'RNA Polymerase Types and Function'] },
            { id: 's5', label: 'Genetic Code Codons and Their Properties', prompt: 'Which idea is this? — The genetic code is the set of rules by which the sequence of nucleotides in messenger.', answer: 'Genetic Code Codons and Their Properties', options: ['Genetic Code Codons and Their Properties', 'Central Dogma of Molecular Biology', 'Transcription Initiation Elongation and Termination', 'RNA Polymerase Types and Function'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a vaccine-awareness talk, someone asks: \'How can an RNA virus like HIV end up inside our DNA? Doesn\'t the Central Dogma say information only goes DNA→RNA→Protein? That means HIV is breaking the laws of molecular biology!\'',
            decisions: [{ prompt: 'Does reverse transcription violate the Central Dogma?', options: [
                { text: 'No — Crick\'s dogma forbids information flowing OUT of protein (Protein→DNA/RNA/Protein). RNA→DNA via reverse transcriptase was unknown in 1958 but never forbidden; it\'s an added pathway consistent with the rule that protein can\'t pass information back.', outcome: 'The dogma is about directionality of information flow, not a mandatory three-step pipeline; retroviruses extend the map without breaking it.' },
                { text: 'Yes — RNA→DNA is backwards, so HIV literally violates the Central Dogma.', outcome: 'The dogma never required the exact sequence DNA→RNA→Protein; it only banned protein as an information source. Reverse transcription is a legitimate extra arrow.', reveals: 'retrovirus-breaks-dogma' },
                { text: 'No violation because the virus converts RNA to protein directly — no DNA is ever made.', outcome: 'HIV does make a DNA copy (that\'s why it\'s a retrovirus and integrates into the genome); the defence is that RNA→DNA was always permitted, not that it doesn\'t happen.', reveals: 'hiv-makes-no-dna' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Gene expression is a pipeline with editing stations — control any station and you control the protein.',
            decisions: [{ prompt: 'What comes next? Eukaryotic Gene Expression · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Eukaryotic Gene Expression · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_07_001', difficulty: 'standard',
          question: 'The Central Dogma of Molecular Biology describes the unidirectional flow.',
          hint: 'If stuck, revisit **c9_bio_ch1_5 (Nucleus structure)** and **c10_chem_cbse_04_001.',
          misconception: '**Misconception**: "The Central Dogma means DNA makes RNA makes Protein *in that exact order always*, so retroviruses.',
          parts: [
                { id: 'a', prompt: 'State the Central Dogma of Molecular Biology as proposed by Francis Crick, including the one major exception discovered later.', answer: 'The Central Dogma states that genetic information flows from DNA → RNA → Protein',
                  options: ['The Central Dogma states that genetic information flows from DNA → RNA → Protein', 'DNA → Protein directly', 'Protein → DNA'],
                  hint: 'If stuck, revisit **c9_bio_ch1_5 (Nucleus structure)** and **c10_chem_cbse_04_001 (Covalent bonding.',
                  misconception: '**Misconception**: "The Central Dogma means DNA makes RNA makes Protein *in that exact order always*, so retroviruses \'break\' the Dogma.".' }
          ],
            remediations: { 'misconception-the-central-dogma-means': { steps: ['**Re-draw the Dogma** on a blank sheet: Draw 4 nodes (DNA, RNA, Protein, Reverse Transcriptase) and 5 arrows.', '**Recite Crick\'s actual 1958 statement**: "The central dogma states that once \'information\' has passed into protein.', '**Classify 5 scenarios** as "Allowed by Dogma" or "Forbidden by Dogma": (a) DNA→DNA, (b) RNA→DNA, (c) RNA→Protein, (d).', '**Explain aloud** why (b) is allowed but (d) is forbidden, using the phrase "sequence information" vs "conformational.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception**: "The Central Dogma means DNA makes RNA makes Protein *in that exact order always*, so retroviruses.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The Central Dogma is violated by prions (infectious proteins like in Mad Cow Disease) because proteins replicate themselves without.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'replication of a phenotypic state', 'transfer of genetic information'],
                  hint: 'If stuck, revisit **c9_bio_ch1_5 (Nucleus structure)** and **c10_chem_cbse_04_001 (Covalent bonding.',
                  misconception: '**Misconception**: "The Central Dogma means DNA makes RNA makes Protein *in that exact order always*, so retroviruses \'break\' the Dogma.".' }
          ],
            remediations: { 'misconception-the-central-dogma-means': { steps: ['**Re-draw the Dogma** on a blank sheet: Draw 4 nodes (DNA, RNA, Protein, Reverse Transcriptase) and 5 arrows.', '**Recite Crick\'s actual 1958 statement**: "The central dogma states that once \'information\' has passed into protein.', '**Classify 5 scenarios** as "Allowed by Dogma" or "Forbidden by Dogma": (a) DNA→DNA, (b) RNA→DNA, (c) RNA→Protein, (d).', '**Explain aloud** why (b) is allowed but (d) is forbidden, using the phrase "sequence information" vs "conformational.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_07_002', difficulty: 'standard',
          question: 'Transcription is the enzyme-catalysed synthesis of a complementary RNA strand.',
          hint: 'If stuck, revisit c11_biotech_cbse_07_001 (Central Dogma) for the "why" of transcription.',
          misconception: 'Students believe "the coding strand is the template for transcription because it has the same sequence as mRNA (except.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In eukaryotes, RNA polymerase II binds directly to the TATA box to initiate transcription." Explain why this statement is incorrect and.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'Pol II binds TATA box', 'This error arises from the name'],
                  hint: 'If stuck, revisit c11_biotech_cbse_07_001 (Central Dogma) for the "why" of transcription, and.',
                  misconception: 'Students believe "the coding strand is the template for transcription because it has the same sequence as mRNA (except T/U)." This error.' },
                { id: 'b', prompt: 'Given the template strand sequence 3\'-TACTCGGATCCG-5\', write the complete mRNA sequence produced (include 5\'/3\' labels).', answer: 'Template: 3\'-T A C T C G G A T C C G-5\' mRNA: 5\'-A U G A G C C U A G G C-3\' (12',
                  options: ['Template: 3\'-T A C T C G G A T C C G-5\' mRNA: 5\'-A U G A G C C U A G G C-3\' (12', 'This error arises from the name'],
                  hint: 'If stuck, revisit c11_biotech_cbse_07_001 (Central Dogma) for the "why" of transcription, and.',
                  misconception: 'Students believe "the coding strand is the template for transcription because it has the same sequence as mRNA (except T/U)." This error.' }
          ],
            remediations: { 'the-coding-strand-is-the': { steps: ['Have student physically model transcription with coloured strings - red for template (3\'→5\'), blue for coding (5\'→3\').', 'Give a 6-base template (3\'-ATGCAT-5\') and ask: "Which strand does polymerase sit on? Which direction does it move?', 'Explicitly contrast: "Coding strand is the \'reference sequence\' in databases; template strand is the \'working copy\'.', 'Practice 5 conversions daily until automatic: template → mRNA → coding strand → template.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_07_003', difficulty: 'standard',
          question: 'RNA polymerase is a DNA-dependent RNA polymerase enzyme that synthesizes RNA.',
          hint: 'Revisit c11_biotech_cbse_07_001 (Central Dogma) to reinforce DNA→RNA→Protein flow, and.',
          misconception: 'Students often believe that "RNA Polymerase II transcribes all mRNAs" and therefore assume it also transcribes the 5\'.',
          parts: [
                { id: 'a', prompt: 'Name the three eukaryotic nuclear RNA polymerases and state the major class of RNA each transcribes.', answer: 'RNA Polymerase I transcribes 28S, 18S, and 5.8S rRNA',
                  options: ['RNA Polymerase I transcribes 28S, 18S, and 5.8S rRNA', 'RNA Polymerase II transcribes all mRNAs', 'it also transcribes the 5\' cap and poly-A tail'],
                  hint: 'Revisit c11_biotech_cbse_07_001 (Central Dogma) to reinforce DNA→RNA→Protein flow, and.',
                  misconception: 'Students often believe that "RNA Polymerase II transcribes all mRNAs" and therefore assume it also transcribes the 5\' cap and poly-A tail.' },
                { id: 'b', prompt: 'Explain why RNA polymerase can initiate RNA synthesis de novo (without a primer) whereas DNA polymerase absolutely requires a primer with a free 3\'-OH group.', answer: 'RNA polymerase uses ribonucleoside triphosphates (rNTPs) as substrates',
                  options: ['RNA polymerase uses ribonucleoside triphosphates (rNTPs) as substrates', 'has a built-in primer', 'RNA Polymerase II transcribes all mRNAs', 'it also transcribes the 5\' cap and poly-A tail'],
                  hint: 'Revisit c11_biotech_cbse_07_001 (Central Dogma) to reinforce DNA→RNA→Protein flow, and.',
                  misconception: 'Students often believe that "RNA Polymerase II transcribes all mRNAs" and therefore assume it also transcribes the 5\' cap and poly-A tail.' },
                { id: 'c', prompt: 'A researcher treats a prokaryotic cell extract with an antibody that specifically binds and inactivates the sigma (σ) factor of RNA polymerase.', answer: 'a housekeeping gene with a strong consensus promoter, and (',
                  options: ['a housekeeping gene with a strong consensus promoter, and (', 'transcription continues normally', 'RNA Polymerase II transcribes all mRNAs', 'it also transcribes the 5\' cap and poly-A tail'],
                  hint: 'Revisit c11_biotech_cbse_07_001 (Central Dogma) to reinforce DNA→RNA→Protein flow, and.',
                  misconception: 'Students often believe that "RNA Polymerase II transcribes all mRNAs" and therefore assume it also transcribes the 5\' cap and poly-A tail.' }
          ],
            remediations: { 'rna-polymerase-ii-transcribes-all': { steps: ['If a student makes this error: (1) Have them draw a timeline: "DNA template → Pol II elongation → 3\' end cleavage.', '(2) Use the analogy: Pol II is the "scribe writing the letter"; capping/polyadenylation enzymes are the "editor adding.', 'This forces separation of synthesis from processing.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_07_004', difficulty: 'standard',
          question: 'Post-transcriptional modifications are enzymatic processing events that convert.',
          hint: 'Revisit c11_biotech_cbse_07_003 (RNA Polymerase: Types and Function) to recall that RNA.',
          misconception: 'Students often believe that the 5\' cap is simply a methylated guanine nucleotide attached by a normal 3\'-5\'.',
          parts: [
                { id: 'a', prompt: 'A researcher observes that a mutant eukaryotic cell line produces mRNA that is rapidly degraded in the cytoplasm.', answer: 'The poly(A) tail binds poly(A)-binding protein (PABP)',
                  options: ['The poly(A) tail binds poly(A)-binding protein (PABP)', 'translation initiation failure'],
                  hint: 'Revisit c11_biotech_cbse_07_003 (RNA Polymerase: Types and Function) to recall that RNA Pol.',
                  misconception: 'Students often believe that the 5\' cap is simply a methylated guanine nucleotide attached by a normal 3\'-5\' phosphodiester bond (like the.' },
                { id: 'b', prompt: 'In an in vitro capping assay, you provide: (i) synthetic pre-mRNA with a 5\' triphosphate end, (ii) GTP, (iii) S-adenosylmethionine (SAM), (iv) the three.', answer: 'The product will be GpppN (unmethylated cap, also called Cap 0)',
                  options: ['The product will be GpppN (unmethylated cap, also called Cap 0)', 'no cap forms', 'm⁷GpppN still forms'],
                  hint: 'Revisit c11_biotech_cbse_07_003 (RNA Polymerase: Types and Function) to recall that RNA Pol.',
                  misconception: 'Students often believe that the 5\' cap is simply a methylated guanine nucleotide attached by a normal 3\'-5\' phosphodiester bond (like the.' }
          ],
            remediations: { 'the-5-cap-is-simply': { steps: ['If a student draws the cap as a standard 3\'-5\' linked nucleotide: (1) Have them write the chemical reaction: RNA 5\'.', '(2) Ask them to identify which phosphate groups come from the RNA and which from GTP.', '(3) Show a space-filling model of m⁷GpppG vs.', 'a normal 3\'-5\' linked dinucleotide to visualize the inverted orientation.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_07_005', difficulty: 'standard',
          question: 'RNA splicing is the precise, ATP-dependent post-transcriptional process.',
          hint: 'Revisit c11_biotech_cbse_07_002 (Transcription) and c11_biotech_cbse_07_004.',
          misconception: 'Students believe: "Introns are evolutionary junk that are simply discarded." This error arises because textbooks.',
          parts: [
                { id: 'a', prompt: 'Given the pre-mRNA sequence: 5\'-AUG **GUAAGU** ... (intron) ... **UACUAAC** ... (intron) ...', answer: '5\' splice site: GUAAGU (consensus GURAGU, R=purine)',
                  options: ['5\' splice site: GUAAGU (consensus GURAGU, R=purine)', 'Introns are evolutionary junk that are simply discarded', 'Introns have no function'],
                  hint: 'Revisit c11_biotech_cbse_07_002 (Transcription) and c11_biotech_cbse_07_004.',
                  misconception: 'Students believe: "Introns are evolutionary junk that are simply discarded." This error arises because textbooks emphasize intron removal.' },
                { id: 'b', prompt: 'Compare constitutive splicing and alternative splicing in terms of: (a) splice site strength, (b) regulatory protein involvement (SR proteins vs hnRNPs), and.', answer: 'splice site strength, (',
                  options: ['splice site strength, (', 'Introns are evolutionary junk that are simply discarded', 'Introns have no function'],
                  hint: 'Revisit c11_biotech_cbse_07_002 (Transcription) and c11_biotech_cbse_07_004.',
                  misconception: 'Students believe: "Introns are evolutionary junk that are simply discarded." This error arises because textbooks emphasize intron removal.' }
          ],
            remediations: { 'introns-are-evolutionary-junk-that': { steps: ['Show the student the β-globin gene locus (HBB) on UCSC Genome Browser—highlight conserved non-coding sequences *within*.', 'Give a worksheet: "Find the snoRNA genes embedded in introns of ribosomal protein genes" using Ensembl.', 'Walk through the "exon shuffling" hypothesis: have the student map immunoglobulin domains to exons and see intron phase.', 'Assign a 1-page critique: "Why would natural selection preserve introns if they were junk?" forcing them to confront.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_07_006', difficulty: 'standard',
          question: 'The genetic code is the set of rules by which the sequence of nucleotides.',
          hint: 'Review transcription (c11_biotech_cbse_07_002) to practice DNA→mRNA base pairing, and.',
          misconception: 'Students often think that because the code is degenerate, a mutation in the third base of a codon never changes the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The genetic code is the set of rules by',
                  options: ['The genetic code is the set of rules by', 'The Central Dogma of Molecular Biology describes the unidirectional flow of genetic', 'Transcription is the enzyme-catalysed synthesis of a complementary RNA strand using a DNA', 'RNA polymerase is a DNA-dependent RNA polymerase enzyme that synthesizes RNA molecules'],
                  hint: 'Review transcription (c11_biotech_cbse_07_002) to practice DNA→mRNA base pairing, and Class 10.',
                  misconception: 'Students often think that because the code is degenerate, a mutation in the third base of a codon never changes the amino acid (silent.' }
          ],
            remediations: { 'because-the-code-is-degenerate': { steps: ['Have the student pick one amino acid with four codons (e.g., Glycine: GGU, GGC, GGA, GGG) and one with two codons where.', 'Ask them to list all possible single-base substitutions at the third position and check the codon table for the.', 'Guide them to see that for Glycine all third-base changes are silent, but for His/Gln a U↔A change alters the amino.', 'Conclude that degeneracy pattern varies by amino acid; wobble rules are specific to tRNA anticodons, not a blanket rule.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
