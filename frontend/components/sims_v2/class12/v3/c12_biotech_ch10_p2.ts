import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch10_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch10_p2: SimDef = {
    id: 'v3_c12_biotech_ch10_p2',
    title: 'Biotechnology in Health · Part 2/2',
    subtitle: 'A vaccine that never touched the virus — and one you could eat as a banana.',
    classLevel: 12, subject: 'biotechnology', topic: 'Biotechnology in Health · Part 2/2',
    chapters: ['c12_biotech_ch10'],
    nodeIds: ['c12_biotech_cbse_10_007', 'c12_biotech_cbse_10_008', 'c12_biotech_cbse_10_009', 'c12_biotech_cbse_10_010', 'c12_biotech_cbse_10_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Vaccine technologist', intro: 'The safest vaccine contains only what the immune system needs to see — biotechnology builds exactly that.', goal: 'Explain recombinant vaccine production and the concept of edible vaccines.' },
    discovery: {
        question: 'The 1980s Hepatitis B vaccine was made from infected donors\' plasma — risking HIV contamination. How did engineers make it safe without ever growing the virus?',
        options: ['Cloned the surface-antigen gene into yeast, which secretes pure HBsAg protein for the vaccine', 'Heated the donor plasma until all contaminants were destroyed', 'Synthesised the whole virus chemically in a reactor', 'Bred a weaker strain of Hepatitis B in chicken eggs'],
        answer: 'Cloned the surface-antigen gene into yeast, which secretes pure HBsAg protein for the vaccine',
        hook: 'A vaccine needs the antigen, not the pathogen — recombinant DNA let us manufacture just the flag the immune system recognises. Students assume vaccines must contain the germ; this one never touched it.',
    },
    teaching: [
        { title: 'Gene Therapy Approaches for Cancer Treatment', text: 'Gene therapy for cancer involves the introduction of genetic material into a patient\'s cells to treat or prevent cancer by correcting defective genes, enhancing immune recognition of tumor cells.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_10_007', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Rebuild the Hepatitis B vaccine the recombinant way, then push further: design an edible vaccine where a banana delivers the antigen straight to gut immune tissue — no syringe, no cold chain.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_10_007', title: 'Gene Therapy Approaches for Cancer Treatment',
          caseStudy: { intro: 'Imagine a patient with advanced hepatocellular carcinoma who cannot undergo surgery — how can we use biotechnology to deliver a "genetic drug" directly.',
            decisions: [{ prompt: 'Name the six major mechanistic categories of cancer gene therapy approaches and give one specific therapeutic gene example for each.', options: [
                { text: 'The six categories with examples: (1) Suicide gene therapy', outcome: 'The six categories with examples: (1) Suicide gene therapy — HSV-tk (herpes simplex virus thymidine.' },
                { text: 'CAR-T therapy', outcome: 'Not quite — Students often conflate "gene therapy" with "immunotherapy" and write "CAR-T cell therapy" as.', reveals: 'students-often-conflate-gene-therapy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_10_008', title: 'Pharmacogenomics and Personalized Medicine',
          caseStudy: { intro: 'Imagine a patient prescribed standard-dose warfarin for atrial fibrillation develops life-threatening bleeding after 3 days.',
            decisions: [{ prompt: 'Define pharmacogenomics and state how it differs from pharmacogenetics in scope and clinical application.', options: [
                { text: 'Pharmacogenomics studies genome-wide variation (multiple genes, gene-gene interactions,', outcome: 'Pharmacogenomics studies genome-wide variation (multiple genes, gene-gene interactions, non-coding.' },
                { text: 'normal', outcome: 'Not quite — Students often believe pharmacogenomics only involves drug-metabolizing enzymes (CYPs) and that.', reveals: 'pharmacogenomics-only-involves-drug-metabolizing' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_10_009', title: 'Molecular Diagnostics: PCR-Based Disease Detection',
          scaffold: { problem: 'A diagnostic lab validates a qPCR assay for dengue virus (DENV).',
            steps: [
            { text: 'Plot log₁₀(initial copies) vs mean Ct. x = log₁₀(N₀) = [7, 6, 5, 4, 3, 2, 1]; y = Ct = [15.2, 18.5, 21.8, 25.1, 28.4.' },
            { text: 'Perform linear regression. Slope = (35.0 - 15.2) / (1 - 7) = 19.8 / (-6) = -3.30. Intercept ≈ 38.3.' },
            { text: 'Efficiency E = 10^(-1/slope) - 1 = 10^(-1/-3.30) - 1 = 10^(0.303) - 1 = 2.01 - 1 = 1.01 = 101%.' },
            { text: 'Dynamic range = 10¹ to 10⁷ copies/µL (7 logs). LOD = lowest dilution with ≥95% detection rate = 10 copies/µL (Ct 35.0.' },
            { text: 'Assess acceptability: Efficiency 101% (90-110% pass), R² > 0.99 (pass), LOD 10 copies/µL (clinically adequate for.', faded: true, blankAnswer: 'Efficiency = 101%, Dynamic range = 10¹–10⁷ copies/µL (7.' }
            ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_10_010', title: 'ELISA: Principle, Formats, and Diagnostic Applications',
          caseStudy: { intro: 'Imagine a doctor needs to confirm if a patient has been exposed to SARS-CoV-2 — the virus causing COVID-19.',
            decisions: [{ prompt: 'In a sandwich ELISA designed to detect a viral antigen in patient serum, which component is immobilised on the microtitre plate well as the.', options: [
                { text: 'A known monoclonal or polyclonal antibody specific to the viral antigen is immobilised as', outcome: 'A known monoclonal or polyclonal antibody specific to the viral antigen is immobilised as the.' },
                { text: 'the patient\'s antigen', outcome: 'Not quite — Students believe "ELISA detects the virus directly" — they confuse the target analyte (antibody vs.', reveals: 'elisa-detects-the-virus-directly' },
                { text: 'the enzyme-conjugated antibody', outcome: 'Not quite — Students believe "ELISA detects the virus directly" — they confuse the target analyte (antibody vs.', reveals: 'elisa-detects-the-virus-directly' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_10_011', title: 'Biosensors in Healthcare and Point-of-Care Testing',
          caseStudy: { intro: 'Imagine a diabetic patient pricking their finger and getting a blood glucose reading in 5 seconds from a handheld device — no lab, no wait.',
            decisions: [{ prompt: 'A student defines a biosensor as "a device that uses biology to detect chemicals." What critical component is missing from this definition.', options: [
                { text: 'The definition misses the **transducer**', outcome: 'The definition misses the **transducer** — the component that converts the biological recognition.' },
                { text: 'transducer', outcome: 'Not quite — Students think **any device using a biomolecule is a biosensor** — e.g., calling a PCR machine.', reveals: 'any-device-using-a-biomolecule' },
                { text: 'signal conversion', outcome: 'Not quite — Students think **any device using a biomolecule is a biosensor** — e.g., calling a PCR machine.', reveals: 'any-device-using-a-biomolecule' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_10_008', title: 'Identify each idea',
          dissect: { specimen: 'Biotechnology in Health · Part 2/2', spots: [
            { id: 's1', label: 'Gene Therapy Approaches for Cancer Treatment', prompt: 'Which idea is this? — Gene therapy for cancer involves the introduction of genetic material into a patient\'s.', answer: 'Gene Therapy Approaches for Cancer Treatment', options: ['Gene Therapy Approaches for Cancer Treatment', 'Pharmacogenomics and Personalized Medicine', 'Molecular Diagnostics PCR-Based Disease Detection', 'ELISA Principle Formats and Diagnostic Applications'] },
            { id: 's2', label: 'Pharmacogenomics and Personalized Medicine', prompt: 'Which idea is this? — Pharmacogenomics is the study of how an individual\'s entire genome (including multiple.', answer: 'Pharmacogenomics and Personalized Medicine', options: ['Pharmacogenomics and Personalized Medicine', 'Gene Therapy Approaches for Cancer Treatment', 'Molecular Diagnostics PCR-Based Disease Detection', 'ELISA Principle Formats and Diagnostic Applications'] },
            { id: 's3', label: 'Molecular Diagnostics PCR-Based Disease Detection', prompt: 'Which idea is this? — Molecular diagnostics using PCR (Polymerase Chain Reaction) is a technique that amplifies.', answer: 'Molecular Diagnostics PCR-Based Disease Detection', options: ['Molecular Diagnostics PCR-Based Disease Detection', 'Gene Therapy Approaches for Cancer Treatment', 'Pharmacogenomics and Personalized Medicine', 'ELISA Principle Formats and Diagnostic Applications'] },
            { id: 's4', label: 'ELISA Principle Formats and Diagnostic Applications', prompt: 'Which idea is this? — ELISA (Enzyme-Linked Immunosorbent Assay) is a plate-based immunoassay technique that.', answer: 'ELISA Principle Formats and Diagnostic Applications', options: ['ELISA Principle Formats and Diagnostic Applications', 'Gene Therapy Approaches for Cancer Treatment', 'Pharmacogenomics and Personalized Medicine', 'Molecular Diagnostics PCR-Based Disease Detection'] },
            { id: 's5', label: 'Biosensors in Healthcare and Point-of-Care Testing', prompt: 'Which idea is this? — A biosensor is an analytical device that integrates a biological recognition element.', answer: 'Biosensors in Healthcare and Point-of-Care Testing', options: ['Biosensors in Healthcare and Point-of-Care Testing', 'Gene Therapy Approaches for Cancer Treatment', 'Pharmacogenomics and Personalized Medicine', 'Molecular Diagnostics PCR-Based Disease Detection'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_10_007', title: 'A real-world call',
          caseStudy: { intro: 'A pharmaceutical company prices a life-saving drug high to recover research costs — research that made the drug possible. Generics could make it affordable but cut the profit that funds the next drug.',
            decisions: [{ prompt: 'Who\'s right — the patient or the pipeline?', options: [
                { text: 'The patient — a drug nobody can afford saves nobody', outcome: 'Access-first reasoning; the counterweight is that without profit, the next drug may never exist.' },
                { text: 'The pipeline — today\'s price funds tomorrow\'s cure', outcome: 'The innovation argument; honest about economics, cold about who dies waiting for tomorrow.' },
                { text: 'Both — public funding for research, open access for medicine', outcome: 'The structural answer — pays the pipeline with taxes instead of patients; requires public willingness to fund it.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A vaccine manufacturer wants to scale up Hepatitis B surface antigen for a recombinant vaccine. A junior engineer suggests switching the production host from yeast to E. coli \'for faster growth and higher yield\'.',
            decisions: [{ prompt: 'Is E. coli the right host here?', options: [
                { text: 'No — HBsAg must form disulfide bonds and self-assemble into virus-like particles, which needs eukaryotic folding machinery; in E. coli it lands in inclusion bodies and never becomes immunogenic VLPs.', outcome: 'Yeast (Saccharomyces cerevisiae) performs the post-translational processing that makes the antigen fold and assemble correctly — yield is useless without conformation.' },
                { text: 'Yes — E. coli is the standard cloning host and its higher yield means more vaccine per batch.', outcome: 'High yield of misfolded antigen is worthless; the immunogenic epitopes depend on correct folding and particle assembly bacteria can\'t do.', reveals: 'ecoli-yield-beats-folding' },
                { text: 'Yes — the vaccine works by delivering the HBsAg gene into the patient\'s cells anyway, so the production host barely matters.', outcome: 'That confuses a recombinant vaccine with a DNA vaccine: the shot contains yeast-made protein VLPs, not plasmid DNA.', reveals: 'recombinant-is-dna-vaccine' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_10_011', title: 'You made it',
          caseStudy: { intro: 'You\'ve seen vaccines go from borrowed blood to engineered fruit. Recombinant and edible vaccines are favourite board applications — and the future of immunisation in low-resource settings.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_10_007', difficulty: 'standard',
          question: 'Gene therapy for cancer involves the introduction of genetic material into.',
          hint: 'If vector biology is weak, revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology.',
          misconception: 'Students often conflate "gene therapy" with "immunotherapy" and write "CAR-T cell therapy" as an example of cancer gene.',
          parts: [
                { id: 'a', prompt: 'Name the six major mechanistic categories of cancer gene therapy approaches and give one specific therapeutic gene example for each category.', answer: 'The six categories with examples: (1) Suicide gene therapy',
                  options: ['The six categories with examples: (1) Suicide gene therapy', 'CAR-T therapy'],
                  hint: 'If vector biology is weak, revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and.',
                  misconception: 'Students often conflate "gene therapy" with "immunotherapy" and write "CAR-T cell therapy" as an example of cancer gene therapy.' }
          ],
            remediations: { 'students-often-conflate-gene-therapy': { steps: ['If the student cannot distinguish gene therapy categories or confuses CAR-T with gene therapy: Step 1 — Revisit.', 'Place SCID-ADA, Gendicine, T-VEC in column 1; CAR-T in column 2.', 'Step 2 — For each cancer gene therapy category, write one sentence: "This strategy delivers [gene] via [vector].', 'Step 4 — Watch the 10-minute NPTEL lecture "Cancer Gene Therapy: Strategies and Vectors" (IIT Madras Biotechnology).'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_10_008', difficulty: 'standard',
          question: 'Pharmacogenomics is the study of how an individual\'s entire genome (including.',
          hint: 'If stuck, review c11_biotech_cbse_08_008 (autosomal recessive/co-dominant inheritance).',
          misconception: 'Students often believe pharmacogenomics only involves drug-metabolizing enzymes (CYPs) and that a "normal" genotype.',
          parts: [
                { id: 'a', prompt: 'A 7-year-old with acute lymphoblastic leukemia is started on 6-mercaptopurine (6-MP). Pre-therapeutic TPMT genotyping shows *1/*3A (intermediate metabolizer).', answer: 'TPMT *1/*3A (intermediate metabolizer) → reduce 6-MP dose to 30-50% of standard',
                  options: ['TPMT *1/*3A (intermediate metabolizer) → reduce 6-MP dose to 30-50% of standard', 'increase dose for better efficacy', 'CYP450 involvement', 'normal'],
                  hint: 'If stuck, review c11_biotech_cbse_08_008 (autosomal recessive/co-dominant inheritance) and.',
                  misconception: 'Students often believe pharmacogenomics only involves drug-metabolizing enzymes (CYPs) and that a "normal" genotype guarantees drug safety.' },
                { id: 'b', prompt: 'Compare and contrast the clinical implementation strategies for HLA-B*57:01 screening before abacavir vs. CYP2D6 genotyping before codeine.', answer: 'type of adverse reaction prevented, (',
                  options: ['type of adverse reaction prevented, (', 'pre-emptive only', 'normal'],
                  hint: 'If stuck, review c11_biotech_cbse_08_008 (autosomal recessive/co-dominant inheritance) and.',
                  misconception: 'Students often believe pharmacogenomics only involves drug-metabolizing enzymes (CYPs) and that a "normal" genotype guarantees drug safety.' }
          ],
            remediations: { 'pharmacogenomics-only-involves-drug-metabolizing': { steps: ['Revisit c11_biotech_cbse_07_006 (Genetic Code) and c11_biotech_cbse_07_010 (Lac Operon) to reinforce gene expression.', 'Review c11_biotech_cbse_08_008 (Single Gene Disorders) and c11_biotech_cbse_08_009 (X-linked Disorders) for.', 'Study CPIC guideline supplements for warfarin (CYP2C9/VKORC1) and clopidogrel (CYP2C19) — map each variant to enzyme.', 'Complete a re-diagnostic: Given a CYP2D6 *1/*41 genotype, predict phenotype, codeine metabolism, and clinical action.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe pharmacogenomics only involves drug-metabolizing enzymes (CYPs) and that a "normal" genotype.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Pharmacogenomic testing should be implemented universally for all patients before prescribing any drug because it eliminates adverse.', answer: 'The statement is scientifically invalid and ethically problematic',
                  options: ['The statement is scientifically invalid and ethically problematic', 'normal'],
                  hint: 'If stuck, review c11_biotech_cbse_08_008 (autosomal recessive/co-dominant inheritance) and.',
                  misconception: 'Students often believe pharmacogenomics only involves drug-metabolizing enzymes (CYPs) and that a "normal" genotype guarantees drug safety.' },
                { id: 'b', prompt: 'Design a pharmacogenomic implementation protocol for a tertiary care hospital in India introducing pre-emptive CYP2C19 genotyping for clopidogrel in PCI.', answer: 'sample type and turnaround time target, (',
                  options: ['sample type and turnaround time target, (', 'normal'],
                  hint: 'If stuck, review c11_biotech_cbse_08_008 (autosomal recessive/co-dominant inheritance) and.',
                  misconception: 'Students often believe pharmacogenomics only involves drug-metabolizing enzymes (CYPs) and that a "normal" genotype guarantees drug safety.' }
          ],
            remediations: { 'pharmacogenomics-only-involves-drug-metabolizing': { steps: ['Revisit c11_biotech_cbse_07_006 (Genetic Code) and c11_biotech_cbse_07_010 (Lac Operon) to reinforce gene expression.', 'Review c11_biotech_cbse_08_008 (Single Gene Disorders) and c11_biotech_cbse_08_009 (X-linked Disorders) for.', 'Study CPIC guideline supplements for warfarin (CYP2C9/VKORC1) and clopidogrel (CYP2C19) — map each variant to enzyme.', 'Complete a re-diagnostic: Given a CYP2D6 *1/*41 genotype, predict phenotype, codeine metabolism, and clinical action.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_10_009', difficulty: 'standard',
          question: 'Molecular diagnostics using PCR (Polymerase Chain Reaction) is a technique that.',
          hint: 'Revisit c11_biotech_cbse_12_005 (PCR Principle) and c11_math_cbse_01_001 (Exponential.',
          misconception: 'Students believe "more PCR cycles = better detection" and routinely suggest 40-45 cycles for diagnostics.',
          parts: [
                { id: 'a', prompt: 'A patient sample tests negative for HIV by conventional PCR but positive by RT-PCR. What is the most likely explanation for this discrepancy?', answer: 'HIV is an RNA virus (retrovirus)',
                  options: ['HIV is an RNA virus (retrovirus)', 'conventional PCR is less sensitive', 'more PCR cycles = better detection'],
                  hint: 'Revisit c11_biotech_cbse_12_005 (PCR Principle) and c11_math_cbse_01_001 (Exponential Functions).',
                  misconception: 'Students believe "more PCR cycles = better detection" and routinely suggest 40-45 cycles for diagnostics.' },
                { id: 'b', prompt: 'In a real-time PCR assay for SARS-CoV-2, the N-gene amplification curve crosses the threshold at Ct = 28, while the internal control (human RNase P gene).', answer: 'Sample is positive for SARS-CoV-2 (Ct 28 < typical cutoff 35-40)',
                  options: ['Sample is positive for SARS-CoV-2 (Ct 28 < typical cutoff 35-40)', 'Ct 28 is higher than positive control Ct 25, so sample is negative', 'more PCR cycles = better detection'],
                  hint: 'Revisit c11_biotech_cbse_12_005 (PCR Principle) and c11_math_cbse_01_001 (Exponential Functions).',
                  misconception: 'Students believe "more PCR cycles = better detection" and routinely suggest 40-45 cycles for diagnostics.' },
                { id: 'c', prompt: 'Design a multiplex PCR to simultaneously detect *Plasmodium falciparum* and *P. vivax* in a single blood sample.', answer: 'primer design strategy, (',
                  options: ['primer design strategy, (', 'more PCR cycles = better detection'],
                  hint: 'Revisit c11_biotech_cbse_12_005 (PCR Principle) and c11_math_cbse_01_001 (Exponential Functions).',
                  misconception: 'Students believe "more PCR cycles = better detection" and routinely suggest 40-45 cycles for diagnostics.' }
          ],
            remediations: { 'more-pcr-cycles-better-detection': { steps: ['Revisit c11_biotech_cbse_12_005 (PCR Principle) — re-derive the amplification formula N = N₀ × 2ⁿ and plot cycles.', 'Watch a qPCR amplification curve video — identify baseline, exponential, linear, plateau phases.', 'Practice Ct interpretation: given 5 Ct values (20, 28, 35, 38, 42), classify each as strong positive, weak positive.', 'Re-attempt Diagnostic Question 2 and 4.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_10_010', difficulty: 'standard',
          question: 'ELISA (Enzyme-Linked Immunosorbent Assay) is a plate-based immunoassay.',
          hint: 'Review c11_biotech_cbse_03_002 (protein-antibody structure) and c12_biotech_cbse_10_005.',
          misconception: 'Students believe "ELISA detects the virus directly" — they confuse the target analyte (antibody vs.',
          parts: [
                { id: 'a', prompt: 'A researcher wants to measure the concentration of anti-dengue IgG antibodies in human serum samples. Which ELISA format is most appropriate and why?', answer: 'Indirect ELISA is most appropriate',
                  options: ['Indirect ELISA is most appropriate', 'sandwich ELISA', 'ELISA detects the virus directly', '"ELISA detects the virus directly"'],
                  hint: 'Review c11_biotech_cbse_03_002 (protein-antibody structure) and c12_biotech_cbse_10_005 (monoclonal.',
                  misconception: 'Students believe "ELISA detects the virus directly" — they confuse the target analyte (antibody vs.' },
                { id: 'b', prompt: 'Compare the sensitivity and specificity of direct ELISA vs. indirect ELISA for detecting a low-abundance bacterial antigen in a complex clinical sample.', answer: 'Indirect ELISA has higher sensitivity',
                  options: ['Indirect ELISA has higher sensitivity', 'indirect is better in all aspects', 'ELISA detects the virus directly', '"ELISA detects the virus directly"'],
                  hint: 'Review c11_biotech_cbse_03_002 (protein-antibody structure) and c12_biotech_cbse_10_005 (monoclonal.',
                  misconception: 'Students believe "ELISA detects the virus directly" — they confuse the target analyte (antibody vs.' }
          ],
            remediations: { 'elisa-detects-the-virus-directly': { steps: ['Revisit c11_biotech_cbse_03_002 (Proteins: antigen-antibody specificity) and c12_biotech_cbse_10_005 (Monoclonal.', 'Draw a 4-panel flowchart for each ELISA format showing: (coated molecule) → (sample analyte) → (detection antibody) →.', 'Take Diagnostic Questions 2 and 3 again — if still wrong, explicitly map each component to "known reagent" vs.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_10_011', difficulty: 'standard',
          question: 'A biosensor is an analytical device that integrates a biological recognition.',
          hint: 'If stuck, revisit c11_biotech_cbse_04_004 (enzyme kinetics) and c12_biotech_cbse_10_010.',
          misconception: 'Students think **any device using a biomolecule is a biosensor** — e.g., calling a PCR machine a "DNA biosensor".',
          parts: [
                { id: 'a', prompt: 'A student defines a biosensor as "a device that uses biology to detect chemicals." What critical component is missing from this definition, and why does its.', answer: 'The definition misses the **transducer**',
                  options: ['The definition misses the **transducer**', 'transducer', 'signal conversion', 'a biological element integrated with a physicochemical transducer'],
                  hint: 'If stuck, revisit c11_biotech_cbse_04_004 (enzyme kinetics) and c12_biotech_cbse_10_010 (ELISA).',
                  misconception: 'Students think **any device using a biomolecule is a biosensor** — e.g., calling a PCR machine a "DNA biosensor" because it uses primers.' },
                { id: 'b', prompt: 'In a glucose biosensor strip, glucose oxidase (GOx) catalyzes: Glucose + O₂ → Gluconic acid + H₂O₂. The H₂O₂ is oxidized at the anode: H₂O₂ → O₂ + 2H⁺ + 2e⁻.', answer: 'No, the claim is incorrect',
                  options: ['No, the claim is incorrect', 'DNA biosensor', 'biosensor', 'molecular diagnostic tool'],
                  hint: 'If stuck, revisit c11_biotech_cbse_04_004 (enzyme kinetics) and c12_biotech_cbse_10_010 (ELISA).',
                  misconception: 'Students think **any device using a biomolecule is a biosensor** — e.g., calling a PCR machine a "DNA biosensor" because it uses primers.' },
                { id: 'c', prompt: 'A pregnancy test strip uses anti-hCG antibodies conjugated to gold nanoparticles (AuNPs) on a nitrocellulose membrane.', answer: 'Bioreceptor: anti-hCG antibody (on AuNP and test line)',
                  options: ['Bioreceptor: anti-hCG antibody (on AuNP and test line)', 'DNA biosensor', 'biosensor', 'molecular diagnostic tool'],
                  hint: 'If stuck, revisit c11_biotech_cbse_04_004 (enzyme kinetics) and c12_biotech_cbse_10_010 (ELISA).',
                  misconception: 'Students think **any device using a biomolecule is a biosensor** — e.g., calling a PCR machine a "DNA biosensor" because it uses primers.' },
                { id: 'd', prompt: 'Compare an amperometric glucose biosensor (first-generation, O₂-dependent) and a mediated (second-generation) glucose biosensor using ferrocene as electron.', answer: 'Second-generation (mediated) performs better',
                  options: ['Second-generation (mediated) performs better', 'DNA biosensor', 'biosensor', 'molecular diagnostic tool'],
                  hint: 'If stuck, revisit c11_biotech_cbse_04_004 (enzyme kinetics) and c12_biotech_cbse_10_010 (ELISA).',
                  misconception: 'Students think **any device using a biomolecule is a biosensor** — e.g., calling a PCR machine a "DNA biosensor" because it uses primers.' }
          ],
            remediations: { 'any-device-using-a-biomolecule': { steps: ['If the student conflates biosensors with general bioanalytical tools: (1) Have them draw a **3-box flowchart** for.', '(2) Ask: "Which box is *integrated and instantaneous*?" Only the strip has all steps in one disposable unit with.', '(3) Revisit c12_biotech_cbse_10_010 (ELISA) and c12_biotech_cbse_10_009 (PCR) — explicitly contrast their multi-step.', 'biosensor\'s single-step POCT workflow.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
