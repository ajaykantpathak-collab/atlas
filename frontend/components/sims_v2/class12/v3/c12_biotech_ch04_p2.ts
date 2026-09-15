import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch04_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch04_p2: SimDef = {
    id: 'v3_c12_biotech_ch04_p2',
    title: 'rDNA Technology Applications · Part 2/2',
    subtitle: 'E. coli is fast but can\'t add sugar chains — so where do you make the drug?',
    classLevel: 12, subject: 'biotechnology', topic: 'rDNA Technology Applications · Part 2/2',
    chapters: ['c12_biotech_ch04'],
    nodeIds: ['c12_biotech_cbse_04_007', 'c12_biotech_cbse_04_008', 'c12_biotech_cbse_04_009', 'c12_biotech_cbse_04_010', 'c12_biotech_cbse_04_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Biopharma production scientist', intro: 'A recombinant protein is only as good as the host that folds it — choose wrong and you harvest clumps.', goal: 'Compare E. coli and yeast expression systems for recombinant protein production.' },
    discovery: {
        question: 'Your therapeutic protein needs sugar chains (glycosylation) to work — but E. coli can\'t add them and clumps your protein into inclusion bodies. Where do you move production?',
        options: ['Yeast — a eukaryotic microbe with Golgi machinery for glycosylation that still grows fast like bacteria', 'Back to E. coli — just increase the induction temperature', 'Plant cells — the only organisms capable of glycosylation', 'Nowhere — inclusion bodies are the functional form of the protein'],
        answer: 'Yeast — a eukaryotic microbe with Golgi machinery for glycosylation that still grows fast like bacteria',
        hook: 'Host choice is a feature-matching problem: E. coli is fast but can\'t fold or decorate complex proteins; yeast adds eukaryotic processing while keeping microbial speed — picking the host is half the engineering.',
    },
    teaching: [
        { title: 'Monoclonal Antibody Production via Hybridoma Technology', text: 'Monoclonal antibody production via hybridoma technology is a method to generate identical antibodies specific to a single epitope by fusing a short-lived antibody-secreting B lymphocyte (plasma cell).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_04_007', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Match protein to production host: produce insulin in E. coli despite its missing ER/Golgi, then switch a glycosylation-dependent therapeutic to yeast — justifying each system\'s trade-offs.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_04_007', title: 'Monoclonal Antibody Production via Hybridoma Technology',
          caseStudy: { intro: 'Imagine a doctor needs a diagnostic kit that detects ONLY the pregnancy hormone hCG without cross-reacting with similar hormones — this requires antibodies.',
            decisions: [{ prompt: 'What is the fundamental difference between polyclonal antibodies produced by conventional immunisation and monoclonal antibodies produced.', options: [
                { text: 'Polyclonal antibodies are a heterogeneous mixture that recognise multiple epitopes on the', outcome: 'Polyclonal antibodies are a heterogeneous mixture that recognise multiple epitopes on the same.' },
                { text: 'polyclonal antibodies are stronger', outcome: 'Not quite — Students believe that hybridoma technology directly produces "human" monoclonal antibodies ready.', reveals: 'hybridoma-technology-directly-produces-human' },
                { text: 'monoclonal antibodies recognise the whole antigen', outcome: 'Not quite — Students believe that hybridoma technology directly produces "human" monoclonal antibodies ready.', reveals: 'hybridoma-technology-directly-produces-human' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_04_008', title: 'Gene Therapy: Types and Delivery Approaches',
          caseStudy: { intro: 'Imagine a 4-year-old girl with Severe Combined Immunodeficiency (SCID) — she cannot fight infections because her ADA gene is defective.',
            decisions: [{ prompt: 'Define gene therapy and name the three main approaches classified by functional strategy.', options: [
                { text: '**Correct answer:** Gene therapy is a technique designed to repair faulty genes by', outcome: '**Correct answer:** Gene therapy is a technique designed to repair faulty genes by introducing.' },
                { text: 'ex vivo and in vivo', outcome: 'Not quite — **"Ex vivo gene therapy means the vector is non-viral; in vivo means viral vector."** Students.', reveals: 'ex-vivo-gene-therapy-means' },
                { text: 'somatic and germ-line', outcome: 'Not quite — **"Ex vivo gene therapy means the vector is non-viral; in vivo means viral vector."** Students.', reveals: 'ex-vivo-gene-therapy-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_04_009', title: 'Ex Vivo vs In Vivo Gene Therapy Strategies',
          caseStudy: { intro: 'Imagine a child born with Severe Combined Immunodeficiency (SCID) — their T cells cannot make adenosine deaminase (ADA), leaving them defenseless against.',
            decisions: [{ prompt: 'Define ex vivo gene therapy and name the first human disease successfully treated using this approach.', options: [
                { text: 'Ex vivo gene therapy: target cells are removed from the patient, genetically modified in', outcome: 'Ex vivo gene therapy: target cells are removed from the patient, genetically modified in culture.' },
                { text: 'injecting virus directly into patient', outcome: 'Not quite — Students often think "ex vivo means the therapy happens outside the body, so it\'s always safer and.', reveals: 'ex-vivo-means-the-therapy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_04_010', title: 'Enzyme Replacement Therapy for Lysosomal Storage Disorders',
          caseStudy: { intro: 'Imagine a 6-year-old child diagnosed with Gaucher disease type 1 — their spleen is massively enlarged, they bruise easily, and bone pain keeps them awake.',
            decisions: [{ prompt: 'A patient with Gaucher disease type 1 has a homozygous mutation in the GBA gene resulting in deficient glucocerebrosidase activity.', options: [
                { text: 'Correct answer: Glucocerebroside (glucosylceramide)', outcome: 'Correct answer: Glucocerebroside (glucosylceramide). Glucocerebrosidase normally cleaves the.' },
                { text: 'Gaucher cells', outcome: 'Not quite — **Misconception:** "ERT works for all lysosomal storage disorders because you just replace the.', reveals: 'misconception-ert-works-for-all' },
                { text: 'ERT is universally effective across all LSDs', outcome: 'Not quite — **Misconception:** "ERT works for all lysosomal storage disorders because you just replace the.', reveals: 'misconception-ert-works-for-all' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_04_011', title: 'Protein Engineering: Principles and Rational Design',
          caseStudy: { intro: 'Imagine you are a biotechnologist tasked with designing an insulin variant that acts faster after injection to better mimic physiological post-prandial insulin.',
            decisions: [{ prompt: 'What is the fundamental difference between rational protein design and directed evolution in terms of the initial knowledge required?', options: [
                { text: 'Rational design requires prior knowledge of the protein\'s 3D structure and', outcome: 'Rational design requires prior knowledge of the protein\'s 3D structure and structure-function.' },
                { text: 'both require 3D structure', outcome: 'Not quite — Students often believe rational design means "changing any amino acid to improve a property" and.', reveals: 'rational-design-means-changing-any' },
                { text: 'changing any amino acid to improve a property', outcome: 'Not quite — Students often believe rational design means "changing any amino acid to improve a property" and.', reveals: 'rational-design-means-changing-any' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_04_008', title: 'Identify each idea',
          dissect: { specimen: 'rDNA Technology Applications · Part 2/2', spots: [
            { id: 's1', label: 'Monoclonal Antibody Production via Hybridoma Technology', prompt: 'Which idea is this? — Monoclonal antibody production via hybridoma technology is a method to generate identical.', answer: 'Monoclonal Antibody Production via Hybridoma Technology', options: ['Monoclonal Antibody Production via Hybridoma Technology', 'Gene Therapy Types and Delivery Approaches', 'Ex Vivo vs In Vivo Gene Therapy Strategies', 'Enzyme Replacement Therapy for Lysosomal Storage Disorders'] },
            { id: 's2', label: 'Gene Therapy Types and Delivery Approaches', prompt: 'Which idea is this? — Gene therapy is a medical technique that aims to treat or cure genetic disorders.', answer: 'Gene Therapy Types and Delivery Approaches', options: ['Gene Therapy Types and Delivery Approaches', 'Monoclonal Antibody Production via Hybridoma Technology', 'Ex Vivo vs In Vivo Gene Therapy Strategies', 'Enzyme Replacement Therapy for Lysosomal Storage Disorders'] },
            { id: 's3', label: 'Ex Vivo vs In Vivo Gene Therapy Strategies', prompt: 'Which idea is this? — Ex vivo gene therapy involves removing target cells from a patient, genetically modifying.', answer: 'Ex Vivo vs In Vivo Gene Therapy Strategies', options: ['Ex Vivo vs In Vivo Gene Therapy Strategies', 'Monoclonal Antibody Production via Hybridoma Technology', 'Gene Therapy Types and Delivery Approaches', 'Enzyme Replacement Therapy for Lysosomal Storage Disorders'] },
            { id: 's4', label: 'Enzyme Replacement Therapy for Lysosomal Storage Disorders', prompt: 'Which idea is this? — Enzyme Replacement Therapy (ERT) for Lysosomal Storage Disorders (LSDs) is a therapeutic.', answer: 'Enzyme Replacement Therapy for Lysosomal Storage Disorders', options: ['Enzyme Replacement Therapy for Lysosomal Storage Disorders', 'Monoclonal Antibody Production via Hybridoma Technology', 'Gene Therapy Types and Delivery Approaches', 'Ex Vivo vs In Vivo Gene Therapy Strategies'] },
            { id: 's5', label: 'Protein Engineering Principles and Rational Design', prompt: 'Which idea is this? — Protein engineering is the deliberate modification of a protein\'s amino acid sequence.', answer: 'Protein Engineering Principles and Rational Design', options: ['Protein Engineering Principles and Rational Design', 'Monoclonal Antibody Production via Hybridoma Technology', 'Gene Therapy Types and Delivery Approaches', 'Ex Vivo vs In Vivo Gene Therapy Strategies'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A biotech startup interns a student on their insulin project. The plan on the whiteboard: express the full human preproinsulin sequence as one polypeptide in E. coli and \'let the bacteria secrete mature insulin into the medium\'.',
            decisions: [{ prompt: 'Where does this plan break?', options: [
                { text: 'E. coli has no ER or Golgi — it can\'t cleave the signal peptide or C-peptide or form disulfide bonds; express the A and B chains separately as fusions, cleave them off, and refold oxidatively.', outcome: 'That\'s the Humulin strategy: bacteria transcribe and translate fine but can\'t do eukaryotic post-translational processing.' },
                { text: 'The plan is sound — E. coli secretes recombinant human proteins into the medium the way human cells do.', outcome: 'Bacteria lack a secretory pathway for complex eukaryotic proteins; the precursor would sit unprocessed, likely as inclusion bodies.', reveals: 'ecoli-secretes-protein' },
                { text: 'It only needs a stronger promoter — low yield, not processing, is the bottleneck.', outcome: 'More expression makes more unprocessed precursor, not more insulin; the defect is the missing processing machinery.', reveals: 'stronger-promoter-fixes-processing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_04_011', title: 'You made it',
          caseStudy: { intro: 'You now choose expression hosts the way industry does — by capability, not habit. E. coli vs yeast trade-offs are sharp board material and the daily calculus of biopharma manufacturing.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_04_007', difficulty: 'standard',
          question: 'Monoclonal antibody production via hybridoma technology is a method to generate.',
          hint: 'Revisit c11_bio_cbse_15_001 (B lymphocytes in blood), c11_biotech_cbse_12_011 (cell.',
          misconception: 'Students believe that hybridoma technology directly produces "human" monoclonal antibodies ready for therapy.',
          parts: [
                { id: 'a', prompt: 'In hybridoma selection using HAT medium, myeloma cells are engineered to lack hypoxanthine-guanine phosphoribosyltransferase (HGPRT).', answer: 'HAT medium contains aminopterin',
                  options: ['HAT medium contains aminopterin', 'HAT medium kills B cells', 'myeloma cells survive', 'hybridoma = therapeutic antibody'],
                  hint: 'Revisit c11_bio_cbse_15_001 (B lymphocytes in blood), c11_biotech_cbse_12_011 (cell culture.',
                  misconception: 'Students believe that hybridoma technology directly produces "human" monoclonal antibodies ready for therapy.' }
          ],
            remediations: { 'hybridoma-technology-directly-produces-human': { steps: ['If a student conflates hybridoma output with therapeutic-ready antibodies: Step 1 — Have them list the species origin.', 'chimeric (mouse variable + human constant) vs.', 'humanised (mouse CDRs + human framework).', 'Step 2 — Ask them to predict the immune response if mouse IgG is injected into humans (HAMA).'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that hybridoma technology directly produces "human" monoclonal antibodies ready for therapy.',
          parts: [
                { id: 'a', prompt: 'A research team develops a monoclonal antibody against a cancer cell surface antigen using hybridoma technology.', answer: 'Possible reasons: (1) Epitope denaturation in ELISA coating vs',
                  options: ['Possible reasons: (1) Epitope denaturation in ELISA coating vs', 'ELISA is more sensitive', 'flow cytometry is broken', 'hybridoma = therapeutic antibody'],
                  hint: 'Revisit c11_bio_cbse_15_001 (B lymphocytes in blood), c11_biotech_cbse_12_011 (cell culture.',
                  misconception: 'Students believe that hybridoma technology directly produces "human" monoclonal antibodies ready for therapy.' },
                { id: 'b', prompt: 'Design a hybridoma-based strategy to generate a monoclonal antibody that specifically neutralises the SARS-CoV-2 spike protein receptor-binding domain (RBD).', answer: 'Immunise mice with purified RBD protein (not whole spike) adjuvanted with alum',
                  options: ['Immunise mice with purified RBD protein (not whole spike) adjuvanted with alum', 'hybridoma = therapeutic antibody'],
                  hint: 'Revisit c11_bio_cbse_15_001 (B lymphocytes in blood), c11_biotech_cbse_12_011 (cell culture.',
                  misconception: 'Students believe that hybridoma technology directly produces "human" monoclonal antibodies ready for therapy.' }
          ],
            remediations: { 'hybridoma-technology-directly-produces-human': { steps: ['If a student conflates hybridoma output with therapeutic-ready antibodies: Step 1 — Have them list the species origin.', 'chimeric (mouse variable + human constant) vs.', 'humanised (mouse CDRs + human framework).', 'Step 2 — Ask them to predict the immune response if mouse IgG is injected into humans (HAMA).'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_04_008', difficulty: 'standard',
          question: 'Gene therapy is a medical technique that aims to treat or cure genetic.',
          hint: 'If stuck on vector properties, revisit c11_biotech_cbse_12_008 (Vectors and Cloning) and.',
          misconception: '**"Ex vivo gene therapy means the vector is non-viral; in vivo means viral vector."** Students often conflate.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Gene therapy is a medical technique that aims to treat or cure genetic disorders by',
                  options: ['Gene therapy is a medical technique that aims to treat or cure genetic disorders by', 'Recombinant protein production in *E', 'Recombinant protein production in yeast systems refers to the use of eukaryotic', 'Recombinant protein production in mammalian cell systems refers to the use of cultured'],
                  hint: 'If stuck on vector properties, revisit c11_biotech_cbse_12_008 (Vectors and Cloning) and make.',
                  misconception: '**"Ex vivo gene therapy means the vector is non-viral; in vivo means viral vector."** Students often conflate **delivery strategy** (ex.' }
          ],
            remediations: { 'ex-vivo-gene-therapy-means': { steps: ['**Revisit the 3-axis framework:** Draw a 2x2x2 cube: Axis 1 = Delivery (ex vivo/in vivo), Axis 2 = Target.', 'Place 8 example therapies (real or hypothetical) in the 8 corners.', '**Re-watch/Re-read vector tropism:** Go to c11_biotech_cbse_12_008 (Vectors and Cloning) and list which vectors.', '**Do a targeted diagnostic:** Answer this: "Why is AAV preferred over lentivirus for in vivo liver gene therapy?".'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_04_009', difficulty: 'standard',
          question: 'Ex vivo gene therapy involves removing target cells from a patient, genetically.',
          hint: 'Review c12_biotech_cbse_04_008 (viral vector table) and c11_biotech_cbse_12_008 (vector.',
          misconception: 'Students often think "ex vivo means the therapy happens outside the body, so it\'s always safer and permanent." They.',
          parts: [
                { id: 'a', prompt: 'Compare the immune response risks of ex vivo vs. in vivo gene therapy when using adenoviral vectors.', answer: 'In vivo poses higher risk',
                  options: ['In vivo poses higher risk', 'both are equal'],
                  hint: 'Review c12_biotech_cbse_04_008 (viral vector table) and c11_biotech_cbse_12_008 (vector properties).',
                  misconception: 'Students often think "ex vivo means the therapy happens outside the body, so it\'s always safer and permanent." They confuse the controlled.' }
          ],
            remediations: { 'ex-vivo-means-the-therapy': { steps: ['Revisit c12_biotech_cbse_04_008 (Gene Therapy: Types and Delivery Approaches) to clarify vector types (retrovirus.', 'Draw a two-column table: ex vivo vs in vivo, listing steps, vector examples, target cells, and clinical outcomes.', 'For each row, ask: "Does the vector integrate?', 'Is the target cell a stem cell?'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_04_010', difficulty: 'standard',
          question: 'Enzyme Replacement Therapy (ERT) for Lysosomal Storage Disorders (LSDs) is.',
          hint: 'If stuck, immediately review c11_biotech_cbse_02_006 (Lysosomes: M6P receptor pathway).',
          misconception: '**Misconception:** "ERT works for all lysosomal storage disorders because you just replace the missing enzyme." **Why.',
          parts: [
                { id: 'a', prompt: 'A patient with Gaucher disease type 1 has a homozygous mutation in the GBA gene resulting in deficient glucocerebrosidase activity.', answer: 'Correct answer: Glucocerebroside (glucosylceramide)',
                  options: ['Correct answer: Glucocerebroside (glucosylceramide)', 'Gaucher cells', 'ERT is universally effective across all LSDs'],
                  hint: 'If stuck, immediately review c11_biotech_cbse_02_006 (Lysosomes: M6P receptor pathway) and.',
                  misconception: '**Misconception:** "ERT works for all lysosomal storage disorders because you just replace the missing enzyme." **Why it\'s wrong:**.' },
                { id: 'b', prompt: 'Elelyso (taliglucerase alfa) is produced in carrot cell culture and approved for Gaucher disease.', answer: 'Correct explanation: While plants typically add β(1,2)-xylose and α(1,3)-fucose',
                  options: ['Correct explanation: While plants typically add β(1,2)-xylose and α(1,3)-fucose', 'human-like or nothing', 'ERT is universally effective across all LSDs'],
                  hint: 'If stuck, immediately review c11_biotech_cbse_02_006 (Lysosomes: M6P receptor pathway) and.',
                  misconception: '**Misconception:** "ERT works for all lysosomal storage disorders because you just replace the missing enzyme." **Why it\'s wrong:**.' },
                { id: 'c', prompt: 'A researcher wants to produce recombinant human α-galactosidase A (deficient in Fabry disease) for ERT.', answer: 'Correct answer: (i) CHO cells',
                  options: ['Correct answer: (i) CHO cells', 'ERT is universally effective across all LSDs'],
                  hint: 'If stuck, immediately review c11_biotech_cbse_02_006 (Lysosomes: M6P receptor pathway) and.',
                  misconception: '**Misconception:** "ERT works for all lysosomal storage disorders because you just replace the missing enzyme." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-ert-works-for-all': { steps: ['If a student cannot distinguish targeting mechanisms (mannose receptor vs.', '**Revisit c11_biotech_cbse_02_006 (Lysosomes)** — confirm understanding that lysosomal enzymes are tagged with M6P.', '**Revisit c11_biotech_cbse_04_004/005 (Enzyme kinetics/inhibition)** — recall that enzyme *delivery* to the correct.', '**Draw a table** with columns: LSD | Deficient Enzyme | Primary Affected Cell Type | Targeting Receptor | ERT Product.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_04_011', difficulty: 'standard',
          question: 'Protein engineering is the deliberate modification of a protein\'s amino acid.',
          hint: 'Revisit c11_biotech_cbse_10_006 (Ramachandran Plot) and c11_biotech_cbse_10_004 (Homology.',
          misconception: 'Students often believe rational design means "changing any amino acid to improve a property" and that more mutations.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental difference between rational protein design and directed evolution in terms of the initial knowledge required?', answer: 'Rational design requires prior knowledge of the protein\'s 3D structure and',
                  options: ['Rational design requires prior knowledge of the protein\'s 3D structure and', 'both require 3D structure', 'changing any amino acid to improve a property', 'interface residue'],
                  hint: 'Revisit c11_biotech_cbse_10_006 (Ramachandran Plot) and c11_biotech_cbse_10_004 (Homology.',
                  misconception: 'Students often believe rational design means "changing any amino acid to improve a property" and that more mutations always yield better.' },
                { id: 'b', prompt: 'A researcher wants to reduce the immunogenicity of a murine monoclonal antibody for human therapy.', answer: 'Chimerization retains murine variable regions (VH/VL)',
                  options: ['Chimerization retains murine variable regions (VH/VL)', 'changing any amino acid to improve a property', 'interface residue', 'any surface residue'],
                  hint: 'Revisit c11_biotech_cbse_10_006 (Ramachandran Plot) and c11_biotech_cbse_10_004 (Homology.',
                  misconception: 'Students often believe rational design means "changing any amino acid to improve a property" and that more mutations always yield better.' },
                { id: 'c', prompt: 'Given the insulin hexamer structure (PDB: 1ZNJ), you observe that B-chain residues B24 Phe, B25 Tyr, and B26 Tyr form a hydrophobic pocket that stabilizes.', answer: 'Substitute B28 Pro with Asp (B28 Pro→Asp)',
                  options: ['Substitute B28 Pro with Asp (B28 Pro→Asp)', 'changing any amino acid to improve a property', 'interface residue', 'any surface residue'],
                  hint: 'Revisit c11_biotech_cbse_10_006 (Ramachandran Plot) and c11_biotech_cbse_10_004 (Homology.',
                  misconception: 'Students often believe rational design means "changing any amino acid to improve a property" and that more mutations always yield better.' }
          ],
            remediations: { 'rational-design-means-changing-any': { steps: ['If a student cannot distinguish functional vs.', 'structural residues in a protein structure: (1) Revisit c11_biotech_cbse_03_003 (Levels of Protein Structure) to review.', '(2) Use PyMOL (c11_biotech_cbse_10_007) to load 1ZNJ, color by conservation (ConSurf server), and observe that B24-B26.', '(3) Re-do Diagnostic Question 3 with this structural insight.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
