import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch07_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch07_p2: SimDef = {
    id: 'v3_c11_biotech_ch07_p2',
    title: 'Eukaryotic Gene Expression · Part 2/2',
    subtitle: 'Trace transcription, RNA processing and translation in eukaryotes.',
    classLevel: 11, subject: 'biotechnology', topic: 'Eukaryotic Gene Expression · Part 2/2',
    chapters: ['c11_biotech_ch07'],
    nodeIds: ['c11_biotech_cbse_07_007', 'c11_biotech_cbse_07_008', 'c11_biotech_cbse_07_009', 'c11_biotech_cbse_07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a molecular biologist debugging why a cell isn\'t making its protein', intro: 'The gene is there, the ribosomes work — yet no protein. Somewhere in the pipeline, the signal died.', goal: 'Outline transcription, splicing, capping, polyadenylation and translation, and sites of regulation.' },
    discovery: {
        question: 'A bacterium reads a gene straight off the DNA, but a human cell must first cut out long stretches of the gene\'s transcript before it can make protein. Why the extra surgery?',
        options: ['Eukaryotic genes contain introns that are spliced out, leaving exons to be joined into mature mRNA', 'Human DNA contains errors that must be deleted before reading', 'The extra stretches are viruses hiding inside genes', 'Splicing is decorative — the protein is identical either way'],
        answer: 'Eukaryotic genes contain introns that are spliced out, leaving exons to be joined into mature mRNA',
        hook: 'A eukaryotic gene is a movie with deleted scenes — splicing decides which footage makes the final cut.',
    },
    teaching: [
        { title: 'Translation: Initiation, Elongation and Termination', text: 'Translation is the process by which the genetic information encoded in the nucleotide sequence of a mature mRNA molecule is decoded into the specific amino acid sequence of a polypeptide chain.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_07_007', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Follow a eukaryotic gene from transcription through splicing to translation, and find where regulation can intercept it.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_07_007', title: 'Translation: Initiation, Elongation and Termination',
          caseStudy: { intro: 'Imagine you are a quality-control engineer at a pharmaceutical company in Hyderabad producing recombinant human insulin in *E. coli*.',
            decisions: [{ prompt: 'A student writes: "During translation initiation in prokaryotes, the 30S ribosomal subunit binds directly to the AUG start codon on the.', options: [
                { text: 'The statement is incorrect', outcome: 'The statement is incorrect. The 30S subunit does not bind directly to the AUG codon.' },
                { text: 'Draw an arrow showing the direction of ribosome movement on the mRNA', outcome: 'Not quite — **Misconception:** "The ribosome moves along the mRNA in the 3\'→5\' direction because the mRNA.', reveals: 'misconception-the-ribosome-moves-along' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_07_008', title: 'Role of tRNA and Ribosomes in Translation',
          caseStudy: { intro: 'Imagine you are a quality-control manager at a factory that assembles custom proteins based on mRNA blueprints.',
            decisions: [{ prompt: 'Define the term "charging of tRNA" and state the enzyme responsible. What is the high-energy bond formed in the product?', options: [
                { text: 'Charging of tRNA (aminoacylation) is the ATP-dependent attachment of a specific amino', outcome: 'Charging of tRNA (aminoacylation) is the ATP-dependent attachment of a specific amino acid to its.' },
                { text: 'peptide bond', outcome: 'Not quite — Students often believe that the ribosome\'s peptidyl transferase activity is carried out by.', reveals: 'the-ribosome-s-peptidyl-transferase' },
                { text: 'phosphodiester bond', outcome: 'Not quite — Students often believe that the ribosome\'s peptidyl transferase activity is carried out by.', reveals: 'the-ribosome-s-peptidyl-transferase' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_07_009', title: 'Post-Translational Modifications of Proteins',
          caseStudy: { intro: 'Imagine you order a custom-built smartphone: the factory assembles the basic chassis (translation), but before delivery, technicians install the camera module.',
            decisions: [{ prompt: 'Define post-translational modification and distinguish it from co-translational modification with one specific example of each.', options: [
                { text: 'Post-translational modification (PTM) is a covalent enzymatic alteration of a polypeptide', outcome: 'Post-translational modification (PTM) is a covalent enzymatic alteration of a polypeptide after.' },
                { text: 'on/off switches', outcome: 'Not quite — Students believe PTMs are merely "on/off switches" like phosphorylation, ignoring that: (1) Many.', reveals: 'ptms-are-merely-on-off' },
                { text: 'PTM code', outcome: 'Not quite — Students believe PTMs are merely "on/off switches" like phosphorylation, ignoring that: (1) Many.', reveals: 'ptms-are-merely-on-off' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_07_010', title: 'Regulation of Gene Expression: Lac Operon',
          caseStudy: { intro: 'Imagine you are an *E. coli* bacterium living in the human large intestine.',
            decisions: [{ prompt: 'In the absence of lactose, the lac repressor protein binds to which specific DNA segment to prevent transcription of structural genes?', options: [
                { text: 'The lac repressor binds to the **operator (lacO)**, a DNA segment located between the', outcome: 'The lac repressor binds to the **operator (lacO)**, a DNA segment located between the promoter and.' },
                { text: 'promoter', outcome: 'Not quite — Students believe **"lactose binds directly to the operator to turn ON the operon"** or **"lactose.', reveals: 'lactose-binds-directly-to-the' },
                { text: 'regulatory gene', outcome: 'Not quite — Students believe **"lactose binds directly to the operator to turn ON the operon"** or **"lactose.', reveals: 'lactose-binds-directly-to-the' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_07_008', title: 'Identify each idea',
          dissect: { specimen: 'Eukaryotic Gene Expression · Part 2/2', spots: [
            { id: 's1', label: 'Translation Initiation Elongation and Termination', prompt: 'Which idea is this? — Translation is the process by which the genetic information encoded in the nucleotide.', answer: 'Translation Initiation Elongation and Termination', options: ['Translation Initiation Elongation and Termination', 'Role of tRNA and Ribosomes in Translation', 'Post-Translational Modifications of Proteins', 'Regulation of Gene Expression Lac Operon'] },
            { id: 's2', label: 'Role of tRNA and Ribosomes in Translation', prompt: 'Which idea is this? — tRNA (transfer RNA) is a small, cloverleaf-shaped adaptor molecule that carries.', answer: 'Role of tRNA and Ribosomes in Translation', options: ['Role of tRNA and Ribosomes in Translation', 'Translation Initiation Elongation and Termination', 'Post-Translational Modifications of Proteins', 'Regulation of Gene Expression Lac Operon'] },
            { id: 's3', label: 'Post-Translational Modifications of Proteins', prompt: 'Which idea is this? — Post-translational modifications (PTMs) are covalent, enzymatic modifications.', answer: 'Post-Translational Modifications of Proteins', options: ['Post-Translational Modifications of Proteins', 'Translation Initiation Elongation and Termination', 'Role of tRNA and Ribosomes in Translation', 'Regulation of Gene Expression Lac Operon'] },
            { id: 's4', label: 'Regulation of Gene Expression Lac Operon', prompt: 'Which idea is this? — The lac operon is an inducible operon in *E. coli* comprising three structural genes.', answer: 'Regulation of Gene Expression Lac Operon', options: ['Regulation of Gene Expression Lac Operon', 'Translation Initiation Elongation and Termination', 'Role of tRNA and Ribosomes in Translation', 'Post-Translational Modifications of Proteins'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a vaccine-awareness talk, someone asks: \'How can an RNA virus like HIV end up inside our DNA? Doesn\'t the Central Dogma say information only goes DNA→RNA→Protein? That means HIV is breaking the laws of molecular biology!\'',
            decisions: [{ prompt: 'Does reverse transcription violate the Central Dogma?', options: [
                { text: 'No — Crick\'s dogma forbids information flowing OUT of protein (Protein→DNA/RNA/Protein). RNA→DNA via reverse transcriptase was unknown in 1958 but never forbidden; it\'s an added pathway consistent with the rule that protein can\'t pass information back.', outcome: 'The dogma is about directionality of information flow, not a mandatory three-step pipeline; retroviruses extend the map without breaking it.' },
                { text: 'Yes — RNA→DNA is backwards, so HIV literally violates the Central Dogma.', outcome: 'The dogma never required the exact sequence DNA→RNA→Protein; it only banned protein as an information source. Reverse transcription is a legitimate extra arrow.', reveals: 'retrovirus-breaks-dogma' },
                { text: 'No violation because the virus converts RNA to protein directly — no DNA is ever made.', outcome: 'HIV does make a DNA copy (that\'s why it\'s a retrovirus and integrates into the genome); the defence is that RNA→DNA was always permitted, not that it doesn\'t happen.', reveals: 'hiv-makes-no-dna' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_07_010', title: 'You made it',
          caseStudy: { intro: 'Gene expression is a pipeline with editing stations — control any station and you control the protein.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_07_007', difficulty: 'standard',
          question: 'Translation is the process by which the genetic information encoded in the.',
          hint: 'If stuck, revisit **c11_biotech_cbse_07_006 (Genetic Code)** and practice: (a) writing.',
          misconception: '**Misconception:** "The ribosome moves along the mRNA in the 3\'→5\' direction because the mRNA is read 5\'→3\'." **Why.',
          parts: [
                { id: 'a', prompt: 'A student writes: "During translation initiation in prokaryotes, the 30S ribosomal subunit binds directly to the AUG start codon on the mRNA." Is this.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'Draw an arrow showing the direction of ribosome movement on the mRNA'],
                  hint: 'If stuck, revisit **c11_biotech_cbse_07_006 (Genetic Code)** and practice: (a) writing the amino.',
                  misconception: '**Misconception:** "The ribosome moves along the mRNA in the 3\'→5\' direction because the mRNA is read 5\'→3\'." **Why it arises:** Students.' },
                { id: 'b', prompt: 'An mRNA sequence in a prokaryote is: 5\'-AUG GCU UAA-3\'. A mutation changes the second codon from GCU to GAU. The gene codes for a tripeptide.', answer: '**Step 1:** Identify codons: Original = AUG (Met), GCU (Ala), UAA (Stop)',
                  options: ['**Step 1:** Identify codons: Original = AUG (Met), GCU (Ala), UAA (Stop)', 'polypeptide remains attached', 'Draw an arrow showing the direction of ribosome movement on the mRNA', 'a "wrong" amino acid prevents release'],
                  hint: 'If stuck, revisit **c11_biotech_cbse_07_006 (Genetic Code)** and practice: (a) writing the amino.',
                  misconception: '**Misconception:** "The ribosome moves along the mRNA in the 3\'→5\' direction because the mRNA is read 5\'→3\'." **Why it arises:** Students.' }
          ],
            remediations: { 'misconception-the-ribosome-moves-along': { steps: ['** Use a physical analogy: Hold a rope (mRNA) with two hands (ribosome subunits).', '** Show NCERT Fig 7.30 "Ribosome now moves along mRNA in 5\'→3\' direction" and explicitly annotate: "This means the.', '** Give a 3-codon mRNA (AUG-UUU-UAA). Ask: "After fMet-Phe is made, which codon enters the A site next?', '** Assign a "movement mapping" exercise: For each translocation event, write the codon that *exits* the E site, the.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_07_008', difficulty: 'standard',
          question: 'tRNA (transfer RNA) is a small, cloverleaf-shaped adaptor molecule that carries.',
          hint: 'Revisit the Genetic Code table (NCERT Fig 7.25) and practice writing anticodons for given.',
          misconception: 'Students often believe that the ribosome\'s peptidyl transferase activity is carried out by a protein enzyme, because.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'tRNA (transfer RNA) is a small, cloverleaf-shaped adaptor molecule that carries a',
                  options: ['tRNA (transfer RNA) is a small, cloverleaf-shaped adaptor molecule that carries a', 'The Central Dogma of Molecular Biology describes the unidirectional flow of genetic', 'Transcription is the enzyme-catalysed synthesis of a complementary RNA strand using a DNA', 'RNA polymerase is a DNA-dependent RNA polymerase enzyme that synthesizes RNA molecules'],
                  hint: 'Revisit the Genetic Code table (NCERT Fig 7.25) and practice writing anticodons for given codons.',
                  misconception: 'Students often believe that the ribosome\'s peptidyl transferase activity is carried out by a protein enzyme, because most biological.' }
          ],
            remediations: { 'the-ribosome-s-peptidyl-transferase': { steps: ['If a student conflates protein enzymes with ribozymes or misattributes the energy source: (1) Have them compare the.', 'peptidyl transfer (ester → amide, ΔG ≈ 0, catalyzed by rRNA).', '(2) Use the "molecular fossil" argument: the peptidyl transferase center is universally conserved rRNA, supporting the.', '(3) Assign a problem: "Calculate the net high-energy phosphate bonds consumed per peptide bond added (2 ATP for.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_07_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the ribosome\'s peptidyl transferase activity is carried out by a protein enzyme, because.',
          parts: [
                { id: 'a', prompt: 'A researcher mutates the CCA sequence at the 3\' end of a tRNA^Ser to CCG. The tRNA is still transcribed and folded correctly.', answer: 'aminoacylation by seryl-tRNA synthetase, (',
                  options: ['aminoacylation by seryl-tRNA synthetase, (', 'no effect because anticodon is unchanged'],
                  hint: 'Revisit the Genetic Code table (NCERT Fig 7.25) and practice writing anticodons for given codons.',
                  misconception: 'Students often believe that the ribosome\'s peptidyl transferase activity is carried out by a protein enzyme, because most biological.' }
          ],
            remediations: { 'the-ribosome-s-peptidyl-transferase': { steps: ['If a student conflates protein enzymes with ribozymes or misattributes the energy source: (1) Have them compare the.', 'peptidyl transfer (ester → amide, ΔG ≈ 0, catalyzed by rRNA).', '(2) Use the "molecular fossil" argument: the peptidyl transferase center is universally conserved rRNA, supporting the.', '(3) Assign a problem: "Calculate the net high-energy phosphate bonds consumed per peptide bond added (2 ATP for.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_07_009', difficulty: 'standard',
          question: 'Post-translational modifications (PTMs) are covalent, enzymatic modifications.',
          hint: 'Revisit c11_biotech_cbse_07_007 (Translation termination) and c9_bio_ch1_7 (ER targeting.',
          misconception: 'Students believe PTMs are merely "on/off switches" like phosphorylation, ignoring that: (1) Many PTMs are combinatorial.',
          parts: [
                { id: 'a', prompt: 'A researcher treats cells with tunicamycin (inhibits N-linked glycosylation) and observes that a transmembrane receptor accumulates in the ER and fails.', answer: 'N-linked glycosylation adds Glc₃Man₉GlcNAc₂ to Asn-X-Ser/Thr sequons in the ER',
                  options: ['N-linked glycosylation adds Glc₃Man₉GlcNAc₂ to Asn-X-Ser/Thr sequons in the ER', 'on/off switches', 'PTM code', 'Phosphorylation activates, ubiquitination degrades'],
                  hint: 'Revisit c11_biotech_cbse_07_007 (Translation termination) and c9_bio_ch1_7 (ER targeting via SRP).',
                  misconception: 'Students believe PTMs are merely "on/off switches" like phosphorylation, ignoring that: (1) Many PTMs are combinatorial — a single protein.' },
                { id: 'b', prompt: 'Predict the functional consequence if the lysine residue at position 48 of ubiquitin (K48) is mutated to arginine in a ubiquitination cascade targeting cyclin.', answer: 'K48R mutation prevents K48-linked polyubiquitin chain formation',
                  options: ['K48R mutation prevents K48-linked polyubiquitin chain formation', 'no ubiquitination occurs', 'on/off switches', 'PTM code'],
                  hint: 'Revisit c11_biotech_cbse_07_007 (Translation termination) and c9_bio_ch1_7 (ER targeting via SRP).',
                  misconception: 'Students believe PTMs are merely "on/off switches" like phosphorylation, ignoring that: (1) Many PTMs are combinatorial — a single protein.' }
          ],
            remediations: { 'ptms-are-merely-on-off': { steps: ['Have student draw a single polypeptide with 5 modification sites labeled (S, T, Y, K, N) and annotate each with: enzyme.', 'Use insulin maturation as a worked case: preproinsulin (ER signal peptide cleavage) → proinsulin (disulfide bonds.', 'Assign a "PTM of the week" deep-dive (e.g., SUMOylation: E1 SAE1/SAE2, E2 Ubc9, E3 PIAS/RanBP2; targets nuclear.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_07_010', difficulty: 'standard',
          question: 'The lac operon is an inducible operon in *E. coli* comprising three structural.',
          hint: 'Revisit c11_biotech_cbse_07_002 (Transcription initiation) and c11_biotech_cbse_07_009.',
          misconception: 'Students believe **"lactose binds directly to the operator to turn ON the operon"** or **"lactose activates RNA.',
          parts: [
                { id: 'a', prompt: 'A mutant *E. coli* strain has a non-functional *lacI* gene (no repressor protein produced).', answer: 'medium with glucose only, (',
                  options: ['medium with glucose only, (', 'OFF in glucose, ON in lactose', 'inducer binds repressor', 'inducer activates polymerase'],
                  hint: 'Revisit c11_biotech_cbse_07_002 (Transcription initiation) and c11_biotech_cbse_07_009 (Allosteric.',
                  misconception: 'Students believe **"lactose binds directly to the operator to turn ON the operon"** or **"lactose activates RNA polymerase."** The exact.' }
          ],
            remediations: { 'lactose-binds-directly-to-the': { steps: ['**Physical model**: Give student three objects — a "repressor" (clothespin), "operator" (cardboard slot), "inducer".', 'Show: clothespin clips onto slot (repressor on operator).', 'Stretch rubber band over clothespin jaws (inducer binds repressor) → clothespin springs open → falls off slot.', '**Trace the molecule**: Ask: "Which molecule has the allosteric site — DNA or protein?" → Protein.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
