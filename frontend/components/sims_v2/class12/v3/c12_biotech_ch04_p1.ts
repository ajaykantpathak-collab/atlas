import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch04_p1: SimDef = {
    id: 'v3_c12_biotech_ch04_p1',
    title: 'rDNA Technology Applications · Part 1/2',
    subtitle: 'E. coli is fast but can\'t add sugar chains — so where do you make the drug?',
    classLevel: 12, subject: 'biotechnology', topic: 'rDNA Technology Applications · Part 1/2',
    chapters: ['c12_biotech_ch04'],
    nodeIds: ['c12_biotech_cbse_04_001', 'c12_biotech_cbse_04_002', 'c12_biotech_cbse_04_003', 'c12_biotech_cbse_04_004', 'c12_biotech_cbse_04_005', 'c12_biotech_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Biopharma production scientist', intro: 'A recombinant protein is only as good as the host that folds it — choose wrong and you harvest clumps.', goal: 'Compare E. coli and yeast expression systems for recombinant protein production.' },
    discovery: {
        question: 'Your therapeutic protein needs sugar chains (glycosylation) to work — but E. coli can\'t add them and clumps your protein into inclusion bodies. Where do you move production?',
        options: ['Yeast — a eukaryotic microbe with Golgi machinery for glycosylation that still grows fast like bacteria', 'Back to E. coli — just increase the induction temperature', 'Plant cells — the only organisms capable of glycosylation', 'Nowhere — inclusion bodies are the functional form of the protein'],
        answer: 'Yeast — a eukaryotic microbe with Golgi machinery for glycosylation that still grows fast like bacteria',
        hook: 'Host choice is a feature-matching problem: E. coli is fast but can\'t fold or decorate complex proteins; yeast adds eukaryotic processing while keeping microbial speed — picking the host is half the engineering.',
    },
    teaching: [
        { title: 'Recombinant Protein Production in E. coli Expression Systems', text: 'Recombinant protein production in *E. coli* expression systems involves cloning a target gene into a bacterial expression vector, transforming *E.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_04_001', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Match protein to production host: produce insulin in E. coli despite its missing ER/Golgi, then switch a glycosylation-dependent therapeutic to yeast — justifying each system\'s trade-offs.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_04_001', title: 'Recombinant Protein Production in E. coli Expression Systems',
          caseStudy: { intro: 'Imagine you are a biotechnologist at an Indian pharma company tasked with producing human insulin in *E. coli* for diabetic patients.',
            decisions: [{ prompt: 'What is the primary reason human insulin cannot be expressed in *E. coli* as a single continuous polypeptide identical to preproinsulin?', options: [
                { text: '*E', outcome: '*E. coli* lacks the endoplasmic reticulum and Golgi apparatus required for signal peptide cleavage.' },
                { text: 'that *E', outcome: 'Not quite — Students often believe that *E. coli* can secrete recombinant human proteins into the culture.', reveals: 'e' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_04_002', title: 'Recombinant Protein Production in Yeast Systems',
          caseStudy: { intro: 'Imagine you need to produce a human therapeutic protein that requires proper folding and sugar chains (glycosylation) to function — but *E.',
            decisions: [{ prompt: '**REMEMBER level:** Name the yeast plasmid vector used for the first licensed recombinant subunit vaccine (Hepatitis B surface antigen) and.', options: [
                { text: 'Correct answer: The vector is **pMA56**, a *S', outcome: 'Correct answer: The vector is **pMA56**, a *S. cerevisiae* shuttle vector containing the **alcohol.' },
                { text: 'pBR322 with lac promoter', outcome: 'Not quite — **Misconception:** "Yeast glycosylation is identical to human glycosylation, so any therapeutic.', reveals: 'misconception-yeast-glycosylation-is-identical' },
                { text: 'presence of glycosylation', outcome: 'Not quite — **Misconception:** "Yeast glycosylation is identical to human glycosylation, so any therapeutic.', reveals: 'misconception-yeast-glycosylation-is-identical' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_04_003', title: 'Recombinant Protein Production in Mammalian Cell Systems',
          caseStudy: { intro: 'Imagine you are a process development scientist at a Bengaluru biotech startup tasked with producing a complex, heavily glycosylated monoclonal antibody for.',
            decisions: [{ prompt: 'A student claims: "CHO cells are preferred for therapeutic antibodies because they grow faster than HEK293 cells and give higher volumetric.', options: [
                { text: 'The statement contains two errors: (1) HEK293 cells typically grow faster (doubling time', outcome: 'The statement contains two errors: (1) HEK293 cells typically grow faster (doubling time ~24 h).' },
                { text: 'simple media', outcome: 'Not quite — Students believe "mammalian cells = human glycosylation." They write in exams: "CHO cells produce.', reveals: 'mammalian-cells-human-glycosylation' },
                { text: 'mammalian cells = human glycosylation', outcome: 'Not quite — Students believe "mammalian cells = human glycosylation." They write in exams: "CHO cells produce.', reveals: 'mammalian-cells-human-glycosylation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_04_004', title: 'Human Insulin Production via rDNA Technology',
          caseStudy: { intro: 'Imagine a diabetic patient in 1980 who develops an allergic rash after every porcine insulin injection.',
            decisions: [{ prompt: 'What is the primary structural difference between preproinsulin, proinsulin, and mature insulin in terms of amino acid composition and.', options: [
                { text: 'Preproinsulin is a 110-amino acid single chain containing a 24-residue signal peptide,', outcome: 'Preproinsulin is a 110-amino acid single chain containing a 24-residue signal peptide, the B-chain.' },
                { text: 'proinsulin has three chains A, B, and C', outcome: 'Not quite — Students often believe that the human insulin gene (coding for preproinsulin) can be directly.', reveals: 'the-human-insulin-gene-coding' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_04_005', title: 'Human Growth Hormone Production in Recombinant Systems',
          caseStudy: { intro: 'Imagine a 10-year-old child diagnosed with growth hormone deficiency — they need daily HGH injections for years.',
            decisions: [{ prompt: 'What is the length of the mature human growth hormone polypeptide in amino acids, and why is the signal peptide a problem for bacterial.', options: [
                { text: 'Mature HGH is 191 amino acids', outcome: 'Mature HGH is 191 amino acids. The signal peptide (26 aa) is not removed by *E.' },
                { text: '191 aa includes signal peptide', outcome: 'Not quite — Students often think the signal peptide is removed by *E. coli* because "bacteria also secrete.', reveals: 'the-signal-peptide-is-removed' },
                { text: 'bacteria cleave signal peptides', outcome: 'Not quite — Students often think the signal peptide is removed by *E. coli* because "bacteria also secrete.', reveals: 'the-signal-peptide-is-removed' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_04_006', title: 'Recombininant Subunit Vaccines and DNA Vaccines',
          caseStudy: { intro: 'Imagine you are a vaccine developer in 1985 trying to make a hepatitis B vaccine without using human blood products.',
            decisions: [{ prompt: 'What is the key antigenic component used in the recombinant hepatitis B subunit vaccine, and in which host organism is it commercially.', options: [
                { text: 'The key antigenic component is the hepatitis B surface antigen (HBsAg), produced in', outcome: 'The key antigenic component is the hepatitis B surface antigen (HBsAg), produced in Saccharomyces.' },
                { text: 'whole killed virus', outcome: 'Not quite — Students often think DNA vaccines work by integrating into the host\'s chromosomes, altering the.', reveals: 'dna-vaccines-work-by-integrating' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'rDNA Technology Applications · Part 1/2', spots: [
            { id: 's1', label: 'Recombinant Protein Production in E coli Expression Systems', prompt: 'Which idea is this? — Recombinant protein production in *E. coli* expression systems involves cloning a target.', answer: 'Recombinant Protein Production in E coli Expression Systems', options: ['Recombinant Protein Production in E coli Expression Systems', 'Recombinant Protein Production in Yeast Systems', 'Recombinant Protein Production in Mammalian Cell Systems', 'Human Insulin Production via rDNA Technology'] },
            { id: 's2', label: 'Recombinant Protein Production in Yeast Systems', prompt: 'Which idea is this? — Recombinant protein production in yeast systems refers to the use of eukaryotic.', answer: 'Recombinant Protein Production in Yeast Systems', options: ['Recombinant Protein Production in Yeast Systems', 'Recombinant Protein Production in E coli Expression Systems', 'Recombinant Protein Production in Mammalian Cell Systems', 'Human Insulin Production via rDNA Technology'] },
            { id: 's3', label: 'Recombinant Protein Production in Mammalian Cell Systems', prompt: 'Which idea is this? — Recombinant protein production in mammalian cell systems refers to the use of cultured.', answer: 'Recombinant Protein Production in Mammalian Cell Systems', options: ['Recombinant Protein Production in Mammalian Cell Systems', 'Recombinant Protein Production in E coli Expression Systems', 'Recombinant Protein Production in Yeast Systems', 'Human Insulin Production via rDNA Technology'] },
            { id: 's4', label: 'Human Insulin Production via rDNA Technology', prompt: 'Which idea is this? — Human insulin production via rDNA technology is the process of synthesizing biologically.', answer: 'Human Insulin Production via rDNA Technology', options: ['Human Insulin Production via rDNA Technology', 'Recombinant Protein Production in E coli Expression Systems', 'Recombinant Protein Production in Yeast Systems', 'Recombinant Protein Production in Mammalian Cell Systems'] },
            { id: 's5', label: 'Human Growth Hormone Production in Recombinant Systems', prompt: 'Which idea is this? — Human Growth Hormone (HGH) production in recombinant systems refers to the.', answer: 'Human Growth Hormone Production in Recombinant Systems', options: ['Human Growth Hormone Production in Recombinant Systems', 'Recombinant Protein Production in E coli Expression Systems', 'Recombinant Protein Production in Yeast Systems', 'Recombinant Protein Production in Mammalian Cell Systems'] },
            { id: 's6', label: 'Recombininant Subunit Vaccines and DNA Vaccines', prompt: 'Which idea is this? — Recombinant subunit vaccines contain only a specific antigenic protein or peptide from.', answer: 'Recombininant Subunit Vaccines and DNA Vaccines', options: ['Recombininant Subunit Vaccines and DNA Vaccines', 'Recombinant Protein Production in E coli Expression Systems', 'Recombinant Protein Production in Yeast Systems', 'Recombinant Protein Production in Mammalian Cell Systems'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A biotech startup interns a student on their insulin project. The plan on the whiteboard: express the full human preproinsulin sequence as one polypeptide in E. coli and \'let the bacteria secrete mature insulin into the medium\'.',
            decisions: [{ prompt: 'Where does this plan break?', options: [
                { text: 'E. coli has no ER or Golgi — it can\'t cleave the signal peptide or C-peptide or form disulfide bonds; express the A and B chains separately as fusions, cleave them off, and refold oxidatively.', outcome: 'That\'s the Humulin strategy: bacteria transcribe and translate fine but can\'t do eukaryotic post-translational processing.' },
                { text: 'The plan is sound — E. coli secretes recombinant human proteins into the medium the way human cells do.', outcome: 'Bacteria lack a secretory pathway for complex eukaryotic proteins; the precursor would sit unprocessed, likely as inclusion bodies.', reveals: 'ecoli-secretes-protein' },
                { text: 'It only needs a stronger promoter — low yield, not processing, is the bottleneck.', outcome: 'More expression makes more unprocessed precursor, not more insulin; the defect is the missing processing machinery.', reveals: 'stronger-promoter-fixes-processing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now choose expression hosts the way industry does — by capability, not habit. E. coli vs yeast trade-offs are sharp board material and the daily calculus of biopharma manufacturing.',
            decisions: [{ prompt: 'What comes next? rDNA Technology Applications · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — rDNA Technology Applications · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_04_001', difficulty: 'standard',
          question: 'Recombinant protein production in *E. coli* expression systems involves cloning.',
          hint: 'If stuck, revisit the insulin maturation pathway in Fig. 4.13 (NCERT) and the.',
          misconception: 'Students often believe that *E. coli* can secrete recombinant human proteins into the culture medium like mammalian.',
          parts: [
                { id: 'a', prompt: 'In the Humulin® production process, why were the A and B chains of insulin expressed as separate fusion proteins with β-galactosidase rather than as a single.', answer: 'Expressing separate A and B chains avoids the need for *E',
                  options: ['Expressing separate A and B chains avoids the need for *E', 'to increase yield', 'that *E'],
                  hint: 'If stuck, revisit the insulin maturation pathway in Fig. 4.13 (NCERT) and the endomembrane system.',
                  misconception: 'Students often believe that *E. coli* can secrete recombinant human proteins into the culture medium like mammalian cells do.' }
          ],
            remediations: { 'e': { steps: ['Revisit c11_biotech_cbse_08_005 (Endomembrane System) to list organelles *E.', 'Re-read the NCERT Box 7 on HGH signal peptide removal — note the explicit statement “the bacterium fails to remove the.', 'Practice drawing the insulin expression construct (Fig.', '4.14) from memory, labeling: lac promoter, β-gal gene, EcoRI sites, A-chain, B-chain, CNBr cleavage sites.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that *E. coli* can secrete recombinant human proteins into the culture medium like mammalian.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: “Inclusion bodies are always undesirable in *E.', answer: 'Inclusion bodies can be beneficial when: (1) the protein is toxic to *E',
                  options: ['Inclusion bodies can be beneficial when: (1) the protein is toxic to *E', 'inclusion bodies are always bad', 'that *E'],
                  hint: 'If stuck, revisit the insulin maturation pathway in Fig. 4.13 (NCERT) and the endomembrane system.',
                  misconception: 'Students often believe that *E. coli* can secrete recombinant human proteins into the culture medium like mammalian cells do.' }
          ],
            remediations: { 'e': { steps: ['Revisit c11_biotech_cbse_08_005 (Endomembrane System) to list organelles *E.', 'Re-read the NCERT Box 7 on HGH signal peptide removal — note the explicit statement “the bacterium fails to remove the.', 'Practice drawing the insulin expression construct (Fig.', '4.14) from memory, labeling: lac promoter, β-gal gene, EcoRI sites, A-chain, B-chain, CNBr cleavage sites.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_04_002', difficulty: 'standard',
          question: 'Recombinant protein production in yeast systems refers to the use of eukaryotic.',
          hint: 'Revisit **c11_biotech_cbse_02_005** (Golgi) and **c11_biotech_cbse_12_008** (Vectors).',
          misconception: '**Misconception:** "Yeast glycosylation is identical to human glycosylation, so any therapeutic protein made in yeast.',
          parts: [
                { id: 'a', prompt: '**REMEMBER level:** Name the yeast plasmid vector used for the first licensed recombinant subunit vaccine (Hepatitis B surface antigen) and state the promoter.', answer: 'Correct answer: The vector is **pMA56**, a *S',
                  options: ['Correct answer: The vector is **pMA56**, a *S', 'pBR322 with lac promoter', 'presence of glycosylation', 'correct glycosylation'],
                  hint: 'Revisit **c11_biotech_cbse_02_005** (Golgi) and **c11_biotech_cbse_12_008** (Vectors) — focus.',
                  misconception: '**Misconception:** "Yeast glycosylation is identical to human glycosylation, so any therapeutic protein made in yeast is clinically safe.".' },
                { id: 'b', prompt: '**UNDERSTAND level:** A researcher clones a human glycoprotein gene into *S. cerevisiae* under the GAL1 promoter with an α-factor secretion signal.', answer: 'Correct answer: *S',
                  options: ['Correct answer: *S', 'protease degradation', 'incorrect folding', 'presence of glycosylation'],
                  hint: 'Revisit **c11_biotech_cbse_02_005** (Golgi) and **c11_biotech_cbse_12_008** (Vectors) — focus.',
                  misconception: '**Misconception:** "Yeast glycosylation is identical to human glycosylation, so any therapeutic protein made in yeast is clinically safe.".' },
                { id: 'c', prompt: '**APPLY level:** You are tasked to produce a 45 kDa human cytokine that requires disulfide bonds and one N-glycosylation site for activity. Choose between *E.', answer: 'Correct answer: Choose ***P',
                  options: ['Correct answer: Choose ***P', 'presence of glycosylation', 'correct glycosylation', 'yeast performs post-translational modifications'],
                  hint: 'Revisit **c11_biotech_cbse_02_005** (Golgi) and **c11_biotech_cbse_12_008** (Vectors) — focus.',
                  misconception: '**Misconception:** "Yeast glycosylation is identical to human glycosylation, so any therapeutic protein made in yeast is clinically safe.".' },
                { id: 'd', prompt: '**ANALYZE level:** Compare the vector architectures of pMA56 (yeast) and pET-28a (E. coli) for recombinant protein production.', answer: 'Correct answer: (1) **2µm ARS (Autonomously Replicating Sequence)**',
                  options: ['Correct answer: (1) **2µm ARS (Autonomously Replicating Sequence)**', 'promoter and terminator', 'presence of glycosylation', 'correct glycosylation'],
                  hint: 'Revisit **c11_biotech_cbse_02_005** (Golgi) and **c11_biotech_cbse_12_008** (Vectors) — focus.',
                  misconception: '**Misconception:** "Yeast glycosylation is identical to human glycosylation, so any therapeutic protein made in yeast is clinically safe.".' }
          ],
            remediations: { 'misconception-yeast-glycosylation-is-identical': { steps: ['If the student holds this misconception: (1) Show side-by-side glycan structures: yeast Man₉GlcNAc₂ vs human complex.', '(2) Assign a 5-minute exercise: "List three therapeutic proteins produced in yeast (HBsAg, insulin, granulocyte.', 'Ask: why the split?" (3) Direct them to revisit **c11_biotech_cbse_07_009** (Post-Translational Modifications) and.', 'Re-diagnose with a fresh question: "Why was the first recombinant mAb (muromonab-CD3) made in hybridoma (mouse myeloma).'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_04_003', difficulty: 'standard',
          question: 'Recombinant protein production in mammalian cell systems refers to the use.',
          hint: 'If stuck, revisit c11_biotech_cbse_07_009 (Post-Translational Modifications) and.',
          misconception: 'Students believe "mammalian cells = human glycosylation." They write in exams: "CHO cells produce identical.',
          parts: [
                { id: 'a', prompt: 'Explain why a therapeutic glycoprotein produced in CHO cells may still show immunogenic glycoforms despite CHO being a mammalian system.', answer: 'CHO cells lack β1,4-galactosyltransferase activity on some branches and express',
                  options: ['CHO cells lack β1,4-galactosyltransferase activity on some branches and express', 'CHO glycosylation is identical to human', 'mammalian cells = human glycosylation', 'CHO cells produce identical glycosylation to humans'],
                  hint: 'If stuck, revisit c11_biotech_cbse_07_009 (Post-Translational Modifications) and.',
                  misconception: 'Students believe "mammalian cells = human glycosylation." They write in exams: "CHO cells produce identical glycosylation to humans." This.' },
                { id: 'b', prompt: 'Compare the DHFR/MTX and GS/MSX selection-amplification systems in CHO cells on: (a) stringency of selection, (b) copy number achievable, (c) impact on host.', answer: 'stringency of selection, (',
                  options: ['stringency of selection, (', 'mammalian cells = human glycosylation', 'CHO cells produce identical glycosylation to humans', '"mammalian cells = human glycosylation'],
                  hint: 'If stuck, revisit c11_biotech_cbse_07_009 (Post-Translational Modifications) and.',
                  misconception: 'Students believe "mammalian cells = human glycosylation." They write in exams: "CHO cells produce identical glycosylation to humans." This.' }
          ],
            remediations: { 'mammalian-cells-human-glycosylation': { steps: ['Revisit c11_biotech_cbse_03_003 (Protein Structure: glycosylation as PTM) and c11_biotech_cbse_12_011 (Animal Cell.', 'Draw the N-glycan core (Man3GlcNAc2) and map human vs. CHO branching: human adds Galβ1,4GlcNAc (LacNAc) → sialic acid.', 'Practice NEET 2022 Q: "Therapeutic antibody produced in CHO shows immunogenicity due to —" (answer: non-human.', 'Re-attempt Diagnostic Q2 and Q6 with this structural lens.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_04_004', difficulty: 'standard',
          question: 'Human insulin production via rDNA technology is the process of synthesizing.',
          hint: 'Revisit c11_biotech_cbse_07_007 (Translation) and c11_bio_cbse_19_003 (Pancreas: Insulin.',
          misconception: 'Students often believe that the human insulin gene (coding for preproinsulin) can be directly inserted into *E.',
          parts: [
                { id: 'a', prompt: 'A researcher wants to produce human insulin in *E. coli* using the original 1979 strategy.', answer: 'Cyanogen bromide (CNBr) is used',
                  options: ['Cyanogen bromide (CNBr) is used', 'trypsin', 'restriction enzyme'],
                  hint: 'Revisit c11_biotech_cbse_07_007 (Translation) and c11_bio_cbse_19_003 (Pancreas: Insulin and.',
                  misconception: 'Students often believe that the human insulin gene (coding for preproinsulin) can be directly inserted into *E.' }
          ],
            remediations: { 'the-human-insulin-gene-coding': { steps: ['If a student cannot explain why separate A/B chain expression is needed, first revisit c11_biotech_cbse_07_007.', 'Then review c11_biotech_cbse_03_003 (Levels of Protein Structure) to see that disulfide bonds are tertiary/quaternary.', 'Finally, re-read the NCERT Fig.', '4.14 stepwise: (1) insert A-chain gene next to β-gal, (2) insert B-chain gene next to β-gal, (3) transform *E.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_04_005', difficulty: 'standard',
          question: 'Human Growth Hormone (HGH) production in recombinant systems refers to the.',
          hint: 'If stuck, review the signal peptide cleavage mechanism in c11_biotech_cbse_02_004 and the.',
          misconception: 'Students often think the signal peptide is removed by *E. coli* because "bacteria also secrete proteins." They confuse.',
          parts: [
                { id: 'a', prompt: 'What is the length of the mature human growth hormone polypeptide in amino acids, and why is the signal peptide a problem for bacterial expression?', answer: 'Mature HGH is 191 amino acids',
                  options: ['Mature HGH is 191 amino acids', '191 aa includes signal peptide', 'bacteria cleave signal peptides', 'bacteria also secrete proteins'],
                  hint: 'If stuck, review the signal peptide cleavage mechanism in c11_biotech_cbse_02_004 and the cloning.',
                  misconception: 'Students often think the signal peptide is removed by *E. coli* because "bacteria also secrete proteins." They confuse the Sec-dependent.' },
                { id: 'b', prompt: 'Compare the recombinant HGH production strategy (cDNA + EcoRI + synthetic linker) with the recombinant insulin strategy (separate A- and B-chain fusion.', answer: '1) Insulin requires disulfide bond formation between two separate chains',
                  options: ['1) Insulin requires disulfide bond formation between two separate chains', 'both use β-gal fusion', 'bacteria also secrete proteins', 'the signal peptide is removed by *E'],
                  hint: 'If stuck, review the signal peptide cleavage mechanism in c11_biotech_cbse_02_004 and the cloning.',
                  misconception: 'Students often think the signal peptide is removed by *E. coli* because "bacteria also secrete proteins." They confuse the Sec-dependent.' }
          ],
            remediations: { 'the-signal-peptide-is-removed': { steps: ['Revisit c11_biotech_cbse_02_004 (Endoplasmic Reticulum) to understand eukaryotic signal peptide cleavage by signal.', 'Revisit c11_biotech_cbse_12_007 (Restriction Enzymes) to practice mapping EcoRI sites in a given cDNA sequence.', 'Revisit c12_biotech_cbse_04_004 (Human Insulin Production) to contrast the two-chain insulin strategy with single-chain.', 'Redo Diagnostic Question 3 as a written exercise: draw the cDNA map with EcoRI sites, show the 50-aa deletion, and.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_04_006', difficulty: 'standard',
          question: 'Recombinant subunit vaccines contain only a specific antigenic protein.',
          hint: 'Revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and Cloning) and.',
          misconception: 'Students often think DNA vaccines work by integrating into the host\'s chromosomes, altering the person\'s DNA.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Recombinant subunit vaccines contain only a specific antigenic protein or peptide from a',
                  options: ['Recombinant subunit vaccines contain only a specific antigenic protein or peptide from a', 'Recombinant protein production in *E', 'Recombinant protein production in yeast systems refers to the use of eukaryotic', 'Recombinant protein production in mammalian cell systems refers to the use of cultured'],
                  hint: 'Revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and Cloning) and practice.',
                  misconception: 'Students often think DNA vaccines work by integrating into the host\'s chromosomes, altering the person\'s DNA.' }
          ],
            remediations: { 'dna-vaccines-work-by-integrating': { steps: ['If a student insists DNA vaccines integrate, have them (1) list the enzymes required for genomic integration.', 'Re-test with a true/false: "DNA vaccine plasmids have an integrase gene." (False)'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
