import type { SimDef } from '../../engine/types';
import C11_BiotechToolsTechniquesCBSESim from '../../../simulations/c6_12_new/C11_BiotechToolsTechniquesCBSESim';

/** v3 wrapped master — C11_BiotechToolsTechniquesCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biotechtoolstechniquescbsesim: SimDef = {
    id: 'v3w_c11_biotechtoolstechniquescbsesim',
    title: 'Branches of Biotechnology: Blue, Green, Red and White',
    subtitle: 'This node covers the four-colour classification system (Blue, Green, Red, White) as.',
    classLevel: 11, subject: 'biotechnology', topic: 'Branches of Biotechnology: Blue, Green, Red and White',
    chapters: [],
    nodeIds: ['c11_biotech_cbse_01_004', 'c11_biotech_cbse_01_006', 'c11_biotech_cbse_10_001', 'c11_biotech_cbse_10_004', 'c11_biotech_cbse_10_005', 'c11_biotech_cbse_10_006', 'c11_biotech_cbse_10_007', 'c11_biotech_cbse_10_009', 'c11_biotech_cbse_01_008', 'c11_biotech_cbse_10_008', 'c11_biotech_cbse_01_003', 'c11_biotech_cbse_01_005', 'c11_biotech_cbse_09_009', 'c11_biotech_cbse_11_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you walk into a supermarket and see four products: a packet of Bt cotton seeds, a vial of recombinant.', goal: 'Master Branches of Biotechnology: Blue, Green, Red and White.' },
    discovery: {
        question: 'Classify the following into the correct branch and justify in one sentence each: (a) Production of human growth hormone in E.',
        options: ['Production of human growth hormone in E', 'Red uses rDNA, White uses fermentation', 'the colour code indicates the *technique* used (e'],
        answer: 'Production of human growth hormone in E',
        hook: 'Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White uses fermentation").',
    },
    teaching: [
        { title: 'Biotechnology is categorized into four major.', text: 'Biotechnology is categorized into four major branches based on the application domain: Blue Biotechnology applies biological processes to marine and freshwater organisms for seafood enhancement,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_01_004', title: 'Biotechnology is categorized into four.',
          scaffold: { problem: 'A biotech startup proposes three projects: (P1) Expressing a cold-adapted lipase from Arctic Pseudomonas in E.',
            steps: [
            { text: 'Analyze P1 – source organism is Arctic bacterium (marine/microbe), but the product is an industrial enzyme for.' },
            { text: 'Analyze P2 – source gene is from fish (marine animal), but the host is a crop plant (tomato) and the trait is.' },
            { text: 'Analyze P3 – source organism is marine sponge (marine animal), product is an anticancer drug for human therapy.' },
            { text: 'Verify no project fits Red biotechnology (which requires human/animal health products from recombinant.' },
            { text: 'Summarize classification: P1=White, P2=Green, P3=Blue.', faded: true, blankAnswer: 'P1 – White Biotechnology; P2 – Green Biotechnology; P3 –.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_01_006', title: 'Biotechnology in medicine (Red.',
          scaffold: { problem: 'A biotech startup in Pune wants to produce a recombinant human growth hormone (hGH) for clinical trials.',
            steps: [
            { text: 'Analyze hGH structure — 191 amino acids, 2 disulfide bonds (Cys53-Cys165, Cys182-Cys189), NO glycosylation sites.' },
            { text: 'Evaluate intron issue — E. coli and Pichia lack splicing machinery; must use cDNA (intron-less) for all hosts.' },
            { text: 'Assess disulfide bond formation — E. coli cytoplasm is reducing (thioredoxin/glutaredoxin); disulfide bonds form only.' },
            { text: 'Glycosylation — hGH is non-glycosylated, so hyperglycosylation in Pichia (α-1,3-mannose) or CHO (complex glycans) is.' },
            { text: 'Compare yield/regulation — E. coli: highest yield (g/L), fastest, cheapest, established for hGH (Genotropin®,.' },
            { text: 'Synthesize recommendation — **E. coli BL21(DE3) with periplasmic secretion (pelB signal peptide) or cytoplasmic.', faded: true, blankAnswer: 'E. coli BL21(DE3) with periplasmic targeting or SHuffle.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_10_001', title: 'Protein Structure Databases are curated.',
          scaffold: { problem: 'A student wants to study the active site geometry of human lysozyme (UniProt P61626) for a science fair project.',
            steps: [
            { text: 'Identify the line starting with EXPDTA to determine the experimental method.' },
            { text: 'Identify the REMARK 2 line (or the TITLE line) to extract the resolution value in Angstroms.' },
            { text: 'Locate the first ATOM record (line starting with ATOM) and read the atom serial number, atom name, residue name, chain.' },
            { text: 'Record the values: Method = X-RAY DIFFRACTION; Resolution = 1.50 Å; First atom = Atom 1, N, GLY, Chain A, Residue 1,.' },
            { text: 'Verify that the coordinates are in Angstroms (standard for PDB) and that the resolution is suitable for detailed.', faded: true, blankAnswer: 'Experimental method: X-ray diffraction; Resolution: 1.50 Å;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_10_004', title: 'Homology modelling is a computational.',
          scaffold: { problem: 'A researcher has identified a novel kinase from *Azotobacter vinelandii* (sequence length 320 aa).',
            steps: [
            { text: 'Identify the goal — global homology model of full-length 320 aa protein.' },
            { text: 'Evaluate Template A: 38% identity (>30% threshold for global modelling), 87% coverage (most of target covered), high.' },
            { text: 'Evaluate Template B: 42% identity (higher), but only 50% coverage — half the target (160 residues) would lack a.' },
            { text: 'Compare: For *global* modelling, coverage is critical. Template A covers 280/320 residues with reliable identity;.' },
            { text: 'Decision: Choose Template A. For the uncovered 40 residues (likely termini/loops), use loop modelling or secondary.', faded: true, blankAnswer: 'Template A (1ATP) is the better choice for global modelling.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_10_005', title: 'Threading (fold recognition) is a.',
          scaffold: { problem: 'A research team isolates a novel thermophilic enzyme (210 amino acids) from a hot spring in Ladakh.',
            steps: [
            { text: 'Obtain target protein sequence (210 residues) from genomic/mass spectrometry data.' },
            { text: 'Run BLASTP against PDB database to detect homologues with known structure — this corresponds to the "Homologue in PDB?".' },
            { text: 'BLASTP returns no significant hits (E-value > 0.001) → answer NO to "Homologue in PDB?" → proceed to "Fold Prediction".' },
            { text: 'Submit sequence to threading server (Threader/LIBELLULA) which performs sequence-structure alignment against fold.' },
            { text: 'Threader returns ranked fold matches with Z-scores; top hit Z-score = 8.3 (> 5–6 threshold) for TIM-barrel fold →.' },
            { text: 'Build 3D model by aligning target sequence onto the TIM-barrel backbone (1tim) and modelling loops/side chains → "3-D.' },
            { text: 'Validate model (Ramachandran plot, Verify3D, ProSA) before biological interpretation — connects to.', faded: true, blankAnswer: 'The team correctly followed the Fig. 10.1 pipeline: BLASTP.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_10_006', title: 'The Ramachandran Plot is a.',
          scaffold: { problem: 'A structural biologist determines the crystal structure of a 180-residue enzyme at 2.1 Å resolution.',
            steps: [
            { text: 'Identify total residues (N=180) and count in each category: Favored=158, Allowed=18, Generously allowed=3, Outlier=1.' },
            { text: 'Calculate percentage in most favored regions: (158/180) × 100 = 87.78% ≈ 87.8%.' },
            { text: 'Calculate percentage in outlier (disallowed) regions: (1/180) × 100 = 0.56%.' },
            { text: 'Compare with standard thresholds: Favored ≥90% (FAIL: 87.8% < 90%), Outliers <0.5% (FAIL: 0.56% > 0.5%).' },
            { text: 'Analyze the outlier: Gly78 at φ=+85°, ψ=-15° falls in the "generously allowed" region for glycine (upper-right quadrant.' },
            { text: 'Refinement strategy: (a) Check 2Fo-Fc and Fo-Fc electron density maps at Gly78 — if density is weak, rebuild with φ/ψ.', faded: true, blankAnswer: 'Favored = 87.8% (fails ≥90% threshold), Outliers = 0.56%.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_01_006', title: 'Identify each idea',
          dissect: { specimen: 'Branches of Biotechnology: Blue, Green, Red and White', spots: [
            { id: 's1', label: 'Biotechnology is categorized into four', prompt: 'Which idea is this? — Biotechnology is categorized into four major branches based on the application domain:.', answer: 'Biotechnology is categorized into four', options: ['Biotechnology is categorized into four', 'Biotechnology in medicine Red Biotechnology', 'Protein Structure Databases are curated', 'Homology modelling is a computational'] },
            { id: 's2', label: 'Biotechnology in medicine Red Biotechnology', prompt: 'Which idea is this? — Biotechnology in medicine (Red Biotechnology) encompasses the application of recombinant.', answer: 'Biotechnology in medicine Red Biotechnology', options: ['Biotechnology in medicine Red Biotechnology', 'Biotechnology is categorized into four', 'Protein Structure Databases are curated', 'Homology modelling is a computational'] },
            { id: 's3', label: 'Protein Structure Databases are curated', prompt: 'Which idea is this? — Protein Structure Databases are curated repositories that store experimentally determined.', answer: 'Protein Structure Databases are curated', options: ['Protein Structure Databases are curated', 'Biotechnology is categorized into four', 'Biotechnology in medicine Red Biotechnology', 'Homology modelling is a computational'] },
            { id: 's4', label: 'Homology modelling is a computational', prompt: 'Which idea is this? — Homology modelling is a computational method for predicting the three-dimensional.', answer: 'Homology modelling is a computational', options: ['Homology modelling is a computational', 'Biotechnology is categorized into four', 'Biotechnology in medicine Red Biotechnology', 'Protein Structure Databases are curated'] },
            { id: 's5', label: 'Threading fold recognition is a', prompt: 'Which idea is this? — Threading (fold recognition) is a computational method that aligns a target protein.', answer: 'Threading fold recognition is a', options: ['Threading fold recognition is a', 'Biotechnology is categorized into four', 'Biotechnology in medicine Red Biotechnology', 'Protein Structure Databases are curated'] },
            { id: 's6', label: 'The Ramachandran Plot is a', prompt: 'Which idea is this? — The Ramachandran Plot is a two-dimensional scatter plot of the backbone dihedral angles φ.', answer: 'The Ramachandran Plot is a', options: ['The Ramachandran Plot is a', 'Biotechnology is categorized into four', 'Biotechnology in medicine Red Biotechnology', 'Protein Structure Databases are curated'] }
          ] } }
    ],
    explore: { component: C11_BiotechToolsTechniquesCBSESim, prompt: 'Explore the interactive — Branches of Biotechnology: Blue, Green, Red and White' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_004', difficulty: 'standard',
          question: 'Biotechnology is categorized into four major branches based on the application.',
          hint: 'Revisit Node 001 (definition) and Node 003 (rDNA technology as the core tool of modern.',
          misconception: 'Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White uses fermentation").',
          parts: [
                { id: 'a', prompt: 'Classify the following into the correct branch and justify in one sentence each: (a) Production of human growth hormone in E.', answer: 'Production of human growth hormone in E',
                  options: ['Production of human growth hormone in E', 'Red uses rDNA, White uses fermentation', 'the colour code indicates the *technique* used (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White uses fermentation").' },
                { id: 'b', prompt: 'Compare Red and White biotechnology on three parameters: (i) primary host system, (ii) regulatory stringency, (iii) typical product purification challenge.', answer: '| Parameter | Red Biotechnology | White Biotechnology |',
                  options: ['| Parameter | Red Biotechnology | White Biotechnology |', 'Red uses rDNA, White uses fermentation', 'the colour code indicates the *technique* used (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White uses fermentation").' }
          ],
            remediations: { 'the-colour-code-indicates-the': { steps: ['Ask the student to list the *source organism* for each example (insulin → E.', 'Have them group by organism type: microbes for industry (White), plants for farm (Green), human proteins in microbes.', 'Explicitly state: "The colour tells you WHERE the biology comes from and WHERE the product goes, not HOW it\'s made."', 'Give a new scenario: "A company engineers yeast to produce a coral reef sunscreen compound." Student classifies: marine.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White uses fermentation").',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Blue biotechnology is just a subset of Green biotechnology because both deal with living organisms and the environment." Defend or.', answer: 'Refute',
                  options: ['Refute', 'environmental benefit', 'biological resource base', 'Red uses rDNA, White uses fermentation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White uses fermentation").' },
                { id: 'b', prompt: 'Design a concept map that links the four branches to (i) the biological system used, (ii) the key enabling technology, and (iii) one flagship product.', answer: 'Central node: "Branches of Biotechnology"',
                  options: ['Central node: "Branches of Biotechnology"', 'Red uses rDNA, White uses fermentation', 'the colour code indicates the *technique* used (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White uses fermentation").' },
                { id: 'c', prompt: 'Compare Red and White biotechnology on three parameters: (i) primary host system, (ii) regulatory stringency, (iii) typical product purification challenge.', answer: '| Parameter | Red Biotechnology | White Biotechnology |',
                  options: ['| Parameter | Red Biotechnology | White Biotechnology |', 'Red uses rDNA, White uses fermentation', 'the colour code indicates the *technique* used (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White uses fermentation").' }
          ],
            remediations: { 'the-colour-code-indicates-the': { steps: ['Ask the student to list the *source organism* for each example (insulin → E.', 'Have them group by organism type: microbes for industry (White), plants for farm (Green), human proteins in microbes.', 'Explicitly state: "The colour tells you WHERE the biology comes from and WHERE the product goes, not HOW it\'s made."', 'Give a new scenario: "A company engineers yeast to produce a coral reef sunscreen compound." Student classifies: marine.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_006', difficulty: 'standard',
          question: 'Biotechnology in medicine (Red Biotechnology) encompasses the application of.',
          hint: 'Revisit the rDNA technology flowchart (isolation → vector → host → expression) from.',
          misconception: '**Misconception:** "Recombinant vaccines and gene therapy both involve putting genes into humans, so they are.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Biotechnology in medicine (Red Biotechnology) encompasses the application of recombinant',
                  options: ['Biotechnology in medicine (Red Biotechnology) encompasses the application of recombinant', 'Biotechnology is categorized into four major branches based on the application domain:', 'Protein Structure Databases are curated repositories that store experimentally determined', 'Homology modelling is a computational method for predicting the three-dimensional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Recombinant vaccines and gene therapy both involve putting genes into humans, so they are essentially the same.' }
          ],
            remediations: { 'misconception-recombinant-vaccines-and-gene': { steps: ['**Clarify the "gene" destination:** Draw a T-table: Vaccine = gene stays in *production cell* (yeast/E.', 'coli) → protein purified → injected.', 'Gene therapy = gene enters *patient\'s cell* (via vector) → protein made *in vivo*.', 'ADA" analogy:** Recombinant insulin = bakery makes bread (protein), you eat it.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Recombinant vaccines and gene therapy both involve putting genes into humans, so they are.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Edible vaccines expressed in transgenic plants (e.g., potato expressing measles antigen) are the ideal solution for global.', answer: '**Answer:** The statement overpromises',
                  options: ['**Answer:** The statement overpromises', 'antigen expression in plant', 'effective mucosal vaccine'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Recombinant vaccines and gene therapy both involve putting genes into humans, so they are essentially the same.' }
          ],
            remediations: { 'misconception-recombinant-vaccines-and-gene': { steps: ['**Clarify the "gene" destination:** Draw a T-table: Vaccine = gene stays in *production cell* (yeast/E.', 'coli) → protein purified → injected.', 'Gene therapy = gene enters *patient\'s cell* (via vector) → protein made *in vivo*.', 'ADA" analogy:** Recombinant insulin = bakery makes bread (protein), you eat it.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_001', difficulty: 'standard',
          question: 'Protein Structure Databases are curated repositories that store experimentally.',
          hint: 'If stuck, revisit Class 11 Biology Chapter "Biomolecules" (protein structure levels) and.',
          misconception: 'Students often think PDB and CATH are interchangeable "structure databases" and that a PDB ID directly gives a CATH.',
          parts: [
                { id: 'a', prompt: 'A student downloads the PDB entry 1CRN (crambin) and sees the header line "EXPDTA X-RAY DIFFRACTION" and "RESOLUTION 1.50 ANGSTROMS".', answer: 'Yes, it is suitable',
                  options: ['Yes, it is suitable', 'structure databases', 'Homology'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think PDB and CATH are interchangeable "structure databases" and that a PDB ID directly gives a CATH code.' }
          ],
            remediations: { 'pdb-and-cath-are-interchangeable': { steps: ['Have the student open the PDB entry for 1TIM (triose phosphate isomerase) and the corresponding CATH entries for its.', 'Ask them to list the chains in the PDB file (A and B) and then check how many CATH domains are assigned per chain.', 'Guide them to see that each chain is a single domain but CATH splits the barrel into two evolutionary units?', 'Actually, TIM barrel is one domain per chain.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think PDB and CATH are interchangeable "structure databases" and that a PDB ID directly gives a CATH.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Since PDB contains all known protein structures, CATH is redundant because one can simply search PDB for structural similarity using.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'structure databases', 'Homology'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think PDB and CATH are interchangeable "structure databases" and that a PDB ID directly gives a CATH code.' }
          ],
            remediations: { 'pdb-and-cath-are-interchangeable': { steps: ['Have the student open the PDB entry for 1TIM (triose phosphate isomerase) and the corresponding CATH entries for its.', 'Ask them to list the chains in the PDB file (A and B) and then check how many CATH domains are assigned per chain.', 'Guide them to see that each chain is a single domain but CATH splits the barrel into two evolutionary units?', 'Actually, TIM barrel is one domain per chain.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_004', difficulty: 'standard',
          question: 'Homology modelling is a computational method for predicting the.',
          hint: 'Revisit c11_biotech_cbse_10_001 (PDB database navigation and BLAST search) and.',
          misconception: 'Students often believe that **sequence identity percentage alone determines model quality**, ignoring alignment.',
          parts: [
                { id: 'a', prompt: 'You are given a target protein sequence of 250 residues. A BLAST search against PDB returns a template with 28% sequence identity over 180 aligned residues.', answer: 'No, a reliable *global* model cannot be built',
                  options: ['No, a reliable *global* model cannot be built', 'yes, because identity >25%'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **sequence identity percentage alone determines model quality**, ignoring alignment coverage, template.' }
          ],
            remediations: { 'sequence-identity-percentage-alone-determines': { steps: ['If a student fixates on %identity: (1) Show two real cases from literature: Case A — 35% identity, 50% coverage, model.', '(2) Have them run a *thought experiment*: "If you only model the conserved core (50%), can you predict the function of.', '(4) Assign a mini-task: Use SWISS-MODEL to build models for two templates with different identity/coverage trade-offs.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_005', difficulty: 'standard',
          question: 'Threading (fold recognition) is a computational method that aligns a target.',
          hint: 'Revisit the "twilight zone" (20–30% identity) and "midnight zone" (<20% identity).',
          misconception: 'Students often believe threading and ab initio modelling are simply "Plan B and Plan C" after homology modelling fails,.',
          parts: [
                { id: 'a', prompt: 'A researcher has a 150-residue protein sequence with no significant BLAST hit against PDB (E-value > 0.01).', answer: 'Threading (fold recognition) should be attempted first',
                  options: ['Threading (fold recognition) should be attempted first', 'Plan B and Plan C'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe threading and ab initio modelling are simply "Plan B and Plan C" after homology modelling fails, without.' },
                { id: 'b', prompt: 'A protein sequence of 200 residues is submitted to a threading server (e.g., Threader).', answer: 'The TIM-barrel fold (Z-score 6.5) is more likely correct',
                  options: ['The TIM-barrel fold (Z-score 6.5) is more likely correct', 'Plan B and Plan C'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe threading and ab initio modelling are simply "Plan B and Plan C" after homology modelling fails, without.' },
                { id: 'c', prompt: 'Compare and contrast the computational cost (time/resources) and expected accuracy of threading versus ab initio modelling for a 100-residue protein.', answer: 'Threading is less compute-intensive (minutes to hours)',
                  options: ['Threading is less compute-intensive (minutes to hours)', 'Plan B and Plan C'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe threading and ab initio modelling are simply "Plan B and Plan C" after homology modelling fails, without.' }
          ],
            remediations: { 'threading-and-ab-initio-modelling': { steps: ['Have the student draw the Fig. 10.1 flowchart from memory on a blank sheet.', 'Ask them to label each decision diamond with the specific bioinformatics tool (BLAST, Threader, QUARK) and the.', 'Give three 1-sentence scenarios (e.g., "25% identity to 2xyz_A", "No BLAST hit, Threader Z-score 7.2", "No hit in PDB.', 'Explicitly contrast "template-based" (homology, threading) vs "template-free" (ab initio) by asking: "In which method.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe threading and ab initio modelling are simply "Plan B and Plan C" after homology modelling fails,.',
          parts: [
                { id: 'a', prompt: 'Design a decision flowchart (text-based) for a structural biologist who has just obtained a novel 180-residue protein sequence.', answer: 'Expected flowchart logic: 1',
                  options: ['Expected flowchart logic: 1', 'Plan B and Plan C'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe threading and ab initio modelling are simply "Plan B and Plan C" after homology modelling fails, without.' }
          ],
            remediations: { 'threading-and-ab-initio-modelling': { steps: ['Have the student draw the Fig. 10.1 flowchart from memory on a blank sheet.', 'Ask them to label each decision diamond with the specific bioinformatics tool (BLAST, Threader, QUARK) and the.', 'Give three 1-sentence scenarios (e.g., "25% identity to 2xyz_A", "No BLAST hit, Threader Z-score 7.2", "No hit in PDB.', 'Explicitly contrast "template-based" (homology, threading) vs "template-free" (ab initio) by asking: "In which method.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_006', difficulty: 'standard',
          question: 'The Ramachandran Plot is a two-dimensional scatter plot of the backbone.',
          hint: 'Revisit peptide bond resonance structure (c10_chem_cbse_04_001) and amino acid chirality.',
          misconception: 'Students often believe that "allowed region" on a Ramachandran plot means "thermodynamically favorable for that.',
          parts: [
                { id: 'a', prompt: 'A homology model of a 250-residue protein yields the following Ramachandran statistics from PROCHECK: 210 residues in most favored regions, 30 in additionally.', answer: 'Favored % = (210/250) × 100 = 84%',
                  options: ['Favored % = (210/250) × 100 = 84%', 'allowed region', 'thermodynamically favorable for that specific protein'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "allowed region" on a Ramachandran plot means "thermodynamically favorable for that specific protein." In.' },
                { id: 'b', prompt: 'Compare the Ramachandran plot signatures of an α-helix, a parallel β-sheet, and a left-handed α-helix (α_L).', answer: 'α-helix: φ≈-60°, ψ≈-45° (lower-left quadrant)',
                  options: ['α-helix: φ≈-60°, ψ≈-45° (lower-left quadrant)', 'disallowed', 'allowed region'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "allowed region" on a Ramachandran plot means "thermodynamically favorable for that specific protein." In.' }
          ],
            remediations: { 'allowed-region-on-a-ramachandran': { steps: ['Have the student physically build a peptide backbone model (using molecular modeling kit or paper strips) for three.', 'Show a glycine vs. alanine Ramachandran plot side-by-side; ask the student to identify which atom (Cβ) causes the.', 'Give a deliberately flawed homology model (e.g., from a low-identity template) with good Ramachandran stats but bad.', 'Require the student to write a one-paragraph validation report for a PDB entry using all four metrics from Diagnostic.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "allowed region" on a Ramachandran plot means "thermodynamically favorable for that.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If a protein structure has 95% residues in favored regions of the Ramachandran plot, it is definitely a correct native structure." Evaluate.', answer: 'The claim is FALSE',
                  options: ['The claim is FALSE', 'allowed region', 'thermodynamically favorable for that specific protein'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "allowed region" on a Ramachandran plot means "thermodynamically favorable for that specific protein." In.' },
                { id: 'b', prompt: 'Design a validation workflow for a newly predicted protein structure that integrates Ramachandran analysis with at least two other independent quality metrics.', answer: 'Workflow: (1) Ramachandran plot (PROCHECK/MolProbity)',
                  options: ['Workflow: (1) Ramachandran plot (PROCHECK/MolProbity)', 'allowed region', 'thermodynamically favorable for that specific protein'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "allowed region" on a Ramachandran plot means "thermodynamically favorable for that specific protein." In.' },
                { id: 'c', prompt: 'Compare the Ramachandran plot signatures of an α-helix, a parallel β-sheet, and a left-handed α-helix (α_L).', answer: 'α-helix: φ≈-60°, ψ≈-45° (lower-left quadrant)',
                  options: ['α-helix: φ≈-60°, ψ≈-45° (lower-left quadrant)', 'disallowed', 'allowed region', 'thermodynamically favorable for that specific protein'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "allowed region" on a Ramachandran plot means "thermodynamically favorable for that specific protein." In.' }
          ],
            remediations: { 'allowed-region-on-a-ramachandran': { steps: ['Have the student physically build a peptide backbone model (using molecular modeling kit or paper strips) for three.', 'Show a glycine vs. alanine Ramachandran plot side-by-side; ask the student to identify which atom (Cβ) causes the.', 'Give a deliberately flawed homology model (e.g., from a low-identity template) with good Ramachandran stats but bad.', 'Require the student to write a one-paragraph validation report for a PDB entry using all four metrics from Diagnostic.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
