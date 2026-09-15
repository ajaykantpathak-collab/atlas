import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch10_p1: SimDef = {
    id: 'v3_c12_biotech_ch10_p1',
    title: 'Biotechnology in Health · Part 1/2',
    subtitle: 'A vaccine that never touched the virus — and one you could eat as a banana.',
    classLevel: 12, subject: 'biotechnology', topic: 'Biotechnology in Health · Part 1/2',
    chapters: ['c12_biotech_ch10'],
    nodeIds: ['c12_biotech_cbse_10_001', 'c12_biotech_cbse_10_002', 'c12_biotech_cbse_10_003', 'c12_biotech_cbse_10_004', 'c12_biotech_cbse_10_005', 'c12_biotech_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Vaccine technologist', intro: 'The safest vaccine contains only what the immune system needs to see — biotechnology builds exactly that.', goal: 'Explain recombinant vaccine production and the concept of edible vaccines.' },
    discovery: {
        question: 'The 1980s Hepatitis B vaccine was made from infected donors\' plasma — risking HIV contamination. How did engineers make it safe without ever growing the virus?',
        options: ['Cloned the surface-antigen gene into yeast, which secretes pure HBsAg protein for the vaccine', 'Heated the donor plasma until all contaminants were destroyed', 'Synthesised the whole virus chemically in a reactor', 'Bred a weaker strain of Hepatitis B in chicken eggs'],
        answer: 'Cloned the surface-antigen gene into yeast, which secretes pure HBsAg protein for the vaccine',
        hook: 'A vaccine needs the antigen, not the pathogen — recombinant DNA let us manufacture just the flag the immune system recognises. Students assume vaccines must contain the germ; this one never touched it.',
    },
    teaching: [
        { title: 'Recombininant Vaccines: Hepatitis B Surface Antigen Example', text: 'A recombinant vaccine is produced by inserting the gene encoding a specific pathogen antigen (e.g., Hepatitis B surface antigen, HBsAg) into a host organism (yeast or mammalian cells) using.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_10_001', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Rebuild the Hepatitis B vaccine the recombinant way, then push further: design an edible vaccine where a banana delivers the antigen straight to gut immune tissue — no syringe, no cold chain.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_10_001', title: 'Recombininant Vaccines: Hepatitis B Surface Antigen Example',
          caseStudy: { intro: 'Imagine you\'re a biotech engineer in 1986 tasked with making a Hepatitis B vaccine safer — the old vaccine used plasma from infected donors, risking HIV.',
            decisions: [{ prompt: 'What is the specific antigenic component used in the recombinant Hepatitis B vaccine, and in which host organism is it commercially.', options: [
                { text: 'The recombinant Hepatitis B vaccine uses the Hepatitis B surface antigen (HBsAg) produced', outcome: 'The recombinant Hepatitis B vaccine uses the Hepatitis B surface antigen (HBsAg) produced.' },
                { text: 'whole killed virus', outcome: 'Not quite — Students consistently confuse "recombinant vaccine" with "DNA vaccine" — they think the Hepatitis.', reveals: 'students-consistently-confuse-recombinant-vaccin' },
                { text: 'the Hepatitis B vaccine injects plasmid DNA into patients', outcome: 'Not quite — Students consistently confuse "recombinant vaccine" with "DNA vaccine" — they think the Hepatitis.', reveals: 'students-consistently-confuse-recombinant-vaccin' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_10_002', title: 'Edible Vaccines: Concept and Plant-Based Production',
          caseStudy: { intro: 'Imagine a child in a remote Indian village getting vaccinated against hepatitis B by simply eating a banana — no syringe, no nurse, no refrigerator needed.',
            decisions: [{ prompt: 'Define "edible vaccine" and name two specific examples of antigens that have been successfully expressed in plants for oral immunization.', options: [
                { text: 'An edible vaccine is a plant-produced subunit vaccine where a gene encoding a pathogenic', outcome: 'An edible vaccine is a plant-produced subunit vaccine where a gene encoding a pathogenic antigen.' },
                { text: 'eating weakened virus', outcome: 'Not quite — Students believe edible vaccines are simply "plants expressing antigens that you eat" and assume.', reveals: 'edible-vaccines-are-simply-plants' },
                { text: 'plant extract injected', outcome: 'Not quite — Students believe edible vaccines are simply "plants expressing antigens that you eat" and assume.', reveals: 'edible-vaccines-are-simply-plants' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_10_003', title: 'DNA Vaccines: Principle, Construction, and Advantages',
          caseStudy: { intro: 'Imagine you are a scientist in 1990 trying to make a vaccine for a dangerous virus — you cannot grow the virus in large quantities safely, and killed vaccines.',
            decisions: [{ prompt: 'What is the fundamental difference between a DNA vaccine and a recombinant protein vaccine (like Hepatitis B vaccine) in terms of what.', options: [
                { text: 'A DNA vaccine administers plasmid DNA encoding the antigen', outcome: 'A DNA vaccine administers plasmid DNA encoding the antigen; the antigen is produced *inside the.' },
                { text: 'both give protein', outcome: 'Not quite — **Misconception:** "DNA vaccines integrate into the host genome and can cause cancer or genetic.', reveals: 'misconception-dna-vaccines-integrate-into' },
                { text: 'Disadvantage of DNA vaccine: risk of insertional mutagenesis causing cancer', outcome: 'Not quite — **Misconception:** "DNA vaccines integrate into the host genome and can cause cancer or genetic.', reveals: 'misconception-dna-vaccines-integrate-into' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_10_004', title: 'Recombininant Therapeutic Proteins and Their Production',
          caseStudy: { intro: 'Imagine a 12-year-old child diagnosed with Type 1 diabetes who needs insulin injections daily.',
            decisions: [{ prompt: 'A student writes: "Recombinant human insulin is produced by inserting the human insulin gene into E.', options: [
                { text: 'The error: E', outcome: 'The error: E. coli does not secrete mature insulin into the medium.' },
                { text: 'recombinant protein = identical to human protein', outcome: 'Not quite — Students believe that "recombinant protein = identical to human protein" and that "E.', reveals: 'recombinant-protein-identical-to-human' },
                { text: '"recombinant protein = identical to human protein" and that "E', outcome: 'Not quite — Students believe that "recombinant protein = identical to human protein" and that "E.', reveals: 'recombinant-protein-identical-to-human' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_10_006', title: 'Gene Therapy for SCID: ADA Deficiency Case',
          caseStudy: { intro: 'Imagine a newborn diagnosed with SCID — no T cells, no B cells, no NK cells — facing certain death from opportunistic infections unless they live in a sterile.',
            decisions: [{ prompt: 'A REMEMBER level question: State the full form of SCID and ADA in the context of this gene therapy.', options: [
                { text: 'SCID = Severe Combined Immunodeficiency', outcome: 'SCID = Severe Combined Immunodeficiency; ADA = Adenosine Deaminase.' },
                { text: 'chromosome 14', outcome: 'Not quite — Students conflate ADA-SCID gene therapy with X-linked SCID (IL2RG) gene therapy and assume both use.', reveals: 'students-conflate-ada-scid-gene' },
                { text: 'X chromosome', outcome: 'Not quite — Students conflate ADA-SCID gene therapy with X-linked SCID (IL2RG) gene therapy and assume both use.', reveals: 'students-conflate-ada-scid-gene' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'Biotechnology in Health · Part 1/2', spots: [
            { id: 's1', label: 'Recombininant Vaccines Hepatitis B Surface Antigen Example', prompt: 'Which idea is this? — A recombinant vaccine is produced by inserting the gene encoding a specific pathogen.', answer: 'Recombininant Vaccines Hepatitis B Surface Antigen Example', options: ['Recombininant Vaccines Hepatitis B Surface Antigen Example', 'Edible Vaccines Concept and Plant-Based Production', 'DNA Vaccines Principle Construction and Advantages', 'Recombininant Therapeutic Proteins and Their Production'] },
            { id: 's2', label: 'Edible Vaccines Concept and Plant-Based Production', prompt: 'Which idea is this? — Edible vaccines are subunit vaccines produced by introducing selected genes encoding.', answer: 'Edible Vaccines Concept and Plant-Based Production', options: ['Edible Vaccines Concept and Plant-Based Production', 'Recombininant Vaccines Hepatitis B Surface Antigen Example', 'DNA Vaccines Principle Construction and Advantages', 'Recombininant Therapeutic Proteins and Their Production'] },
            { id: 's3', label: 'DNA Vaccines Principle Construction and Advantages', prompt: 'Which idea is this? — A DNA vaccine is a plasmid-based vaccine that delivers a gene encoding a specific.', answer: 'DNA Vaccines Principle Construction and Advantages', options: ['DNA Vaccines Principle Construction and Advantages', 'Recombininant Vaccines Hepatitis B Surface Antigen Example', 'Edible Vaccines Concept and Plant-Based Production', 'Recombininant Therapeutic Proteins and Their Production'] },
            { id: 's4', label: 'Recombininant Therapeutic Proteins and Their Production', prompt: 'Which idea is this? — Recombinant therapeutic proteins are human or human-like proteins produced by genetically.', answer: 'Recombininant Therapeutic Proteins and Their Production', options: ['Recombininant Therapeutic Proteins and Their Production', 'Recombininant Vaccines Hepatitis B Surface Antigen Example', 'Edible Vaccines Concept and Plant-Based Production', 'DNA Vaccines Principle Construction and Advantages'] },
            { id: 's5', label: 'Monoclonal Antibodies in Targeted Therapy', prompt: 'Which idea is this? — Monoclonal antibodies (mAbs) are identical immunoglobulin molecules produced by a single.', answer: 'Monoclonal Antibodies in Targeted Therapy', options: ['Monoclonal Antibodies in Targeted Therapy', 'Recombininant Vaccines Hepatitis B Surface Antigen Example', 'Edible Vaccines Concept and Plant-Based Production', 'DNA Vaccines Principle Construction and Advantages'] },
            { id: 's6', label: 'Gene Therapy for SCID ADA Deficiency Case', prompt: 'Which idea is this? — Gene therapy for ADA-deficient SCID is a somatic cell gene therapy approach where.', answer: 'Gene Therapy for SCID ADA Deficiency Case', options: ['Gene Therapy for SCID ADA Deficiency Case', 'Recombininant Vaccines Hepatitis B Surface Antigen Example', 'Edible Vaccines Concept and Plant-Based Production', 'DNA Vaccines Principle Construction and Advantages'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_10_001', title: 'A real-world call',
          caseStudy: { intro: 'A pharmaceutical company prices a life-saving drug high to recover research costs — research that made the drug possible. Generics could make it affordable but cut the profit that funds the next drug.',
            decisions: [{ prompt: 'Who\'s right — the patient or the pipeline?', options: [
                { text: 'The patient — a drug nobody can afford saves nobody', outcome: 'Access-first reasoning; the counterweight is that without profit, the next drug may never exist.' },
                { text: 'The pipeline — today\'s price funds tomorrow\'s cure', outcome: 'The innovation argument; honest about economics, cold about who dies waiting for tomorrow.' },
                { text: 'Both — public funding for research, open access for medicine', outcome: 'The structural answer — pays the pipeline with taxes instead of patients; requires public willingness to fund it.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A vaccine manufacturer wants to scale up Hepatitis B surface antigen for a recombinant vaccine. A junior engineer suggests switching the production host from yeast to E. coli \'for faster growth and higher yield\'.',
            decisions: [{ prompt: 'Is E. coli the right host here?', options: [
                { text: 'No — HBsAg must form disulfide bonds and self-assemble into virus-like particles, which needs eukaryotic folding machinery; in E. coli it lands in inclusion bodies and never becomes immunogenic VLPs.', outcome: 'Yeast (Saccharomyces cerevisiae) performs the post-translational processing that makes the antigen fold and assemble correctly — yield is useless without conformation.' },
                { text: 'Yes — E. coli is the standard cloning host and its higher yield means more vaccine per batch.', outcome: 'High yield of misfolded antigen is worthless; the immunogenic epitopes depend on correct folding and particle assembly bacteria can\'t do.', reveals: 'ecoli-yield-beats-folding' },
                { text: 'Yes — the vaccine works by delivering the HBsAg gene into the patient\'s cells anyway, so the production host barely matters.', outcome: 'That confuses a recombinant vaccine with a DNA vaccine: the shot contains yeast-made protein VLPs, not plasmid DNA.', reveals: 'recombinant-is-dna-vaccine' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You\'ve seen vaccines go from borrowed blood to engineered fruit. Recombinant and edible vaccines are favourite board applications — and the future of immunisation in low-resource settings.',
            decisions: [{ prompt: 'What comes next? Biotechnology in Health · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Biotechnology in Health · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_10_001', difficulty: 'standard',
          question: 'A recombinant vaccine is produced by inserting the gene encoding a specific.',
          hint: 'If stuck on expression host choice, revisit c11_biotech_cbse_07_007 (Translation) and.',
          misconception: 'Students consistently confuse "recombinant vaccine" with "DNA vaccine" — they think the Hepatitis B vaccine injects.',
          parts: [
                { id: 'a', prompt: 'A biotech company wants to produce a recombinant vaccine for a new virus whose surface glycoprotein requires N-linked glycosylation for neutralizing epitopes.', answer: 'Host: Pichia pastoris or mammalian cells (CHO)',
                  options: ['Host: Pichia pastoris or mammalian cells (CHO)', 'recombinant vaccine', 'DNA vaccine', 'the Hepatitis B vaccine injects plasmid DNA into patients'],
                  hint: 'If stuck on expression host choice, revisit c11_biotech_cbse_07_007 (Translation) and.',
                  misconception: 'Students consistently confuse "recombinant vaccine" with "DNA vaccine" — they think the Hepatitis B vaccine injects plasmid DNA into.' }
          ],
            remediations: { 'students-consistently-confuse-recombinant-vaccin': { steps: ['Revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology) — distinguish *cloning host* (yeast/E.', 'Rewatch the VLP assembly animation — HBsAg spontaneously forms 22 nm particles in yeast ER/Golgi; no viral nucleic acid.', 'Do a table comparison: Column A = Recombinant subunit vaccine (HBsAg protein), Column B = DNA vaccine (plasmid DNA).', 'Re-attempt Diagnostic Q2 and Q4 — if you still pick E. coli or miss the adjuvant rationale, re-read the protein folding.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse "recombinant vaccine" with "DNA vaccine" — they think the Hepatitis B vaccine injects.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The recombinant Hepatitis B vaccine is safer than the plasma-derived vaccine because it contains no viral DNA." Is this the complete.', answer: 'The statement is true but incomplete',
                  options: ['The statement is true but incomplete', 'recombinant vaccine', 'DNA vaccine', 'the Hepatitis B vaccine injects plasmid DNA into patients'],
                  hint: 'If stuck on expression host choice, revisit c11_biotech_cbse_07_007 (Translation) and.',
                  misconception: 'Students consistently confuse "recombinant vaccine" with "DNA vaccine" — they think the Hepatitis B vaccine injects plasmid DNA into.' }
          ],
            remediations: { 'students-consistently-confuse-recombinant-vaccin': { steps: ['Revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology) — distinguish *cloning host* (yeast/E.', 'Rewatch the VLP assembly animation — HBsAg spontaneously forms 22 nm particles in yeast ER/Golgi; no viral nucleic acid.', 'Do a table comparison: Column A = Recombinant subunit vaccine (HBsAg protein), Column B = DNA vaccine (plasmid DNA).', 'Re-attempt Diagnostic Q2 and Q4 — if you still pick E. coli or miss the adjuvant rationale, re-read the protein folding.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_10_002', difficulty: 'standard',
          question: 'Edible vaccines are subunit vaccines produced by introducing selected genes.',
          hint: 'Revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology) for cloning steps and.',
          misconception: 'Students believe edible vaccines are simply "plants expressing antigens that you eat" and assume the plant\'s natural.',
          parts: [
                { id: 'a', prompt: 'Explain why edible vaccines are classified as "mucosal vaccines" and describe the role of M cells and gut-associated lymphoid tissue (GALT) in generating.', answer: 'Edible vaccines target mucosal surfaces (gut)',
                  options: ['Edible vaccines target mucosal surfaces (gut)', 'stomach digestion', 'bloodstream absorption', 'plants expressing antigens that you eat'],
                  hint: 'Revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology) for cloning steps and c8_bio_ch2_9.',
                  misconception: 'Students believe edible vaccines are simply "plants expressing antigens that you eat" and assume the plant\'s natural glycosylation.' }
          ],
            remediations: { 'edible-vaccines-are-simply-plants': { steps: ['If the student conflates plant and human glycosylation or ignores dosage control: 1.', 'Revisit c11_biotech_cbse_09_002 (Proteins) and c11_biotech_cbse_09_003 (Lipids) to compare N-glycosylation pathways.', 'Review c11_biotech_cbse_12_008 (Recombinant DNA Technology) for *Agrobacterium*-mediated transformation steps and.', 'Re-do Diagnostic Question 4 with a table comparing banana vs potato vs lettuce on glycosylation, cooking, dosage, and.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_10_003', difficulty: 'standard',
          question: 'A DNA vaccine is a plasmid-based vaccine that delivers a gene encoding.',
          hint: 'Revisit c11_biotech_cbse_12_008 (plasmid vectors) and.',
          misconception: '**Misconception:** "DNA vaccines integrate into the host genome and can cause cancer or genetic mutations." **Why.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental difference between a DNA vaccine and a recombinant protein vaccine (like Hepatitis B vaccine) in terms of what is administered to the.', answer: 'A DNA vaccine administers plasmid DNA encoding the antigen',
                  options: ['A DNA vaccine administers plasmid DNA encoding the antigen', 'both give protein', 'Disadvantage of DNA vaccine: risk of insertional mutagenesis causing cancer'],
                  hint: 'Revisit c11_biotech_cbse_12_008 (plasmid vectors) and.',
                  misconception: '**Misconception:** "DNA vaccines integrate into the host genome and can cause cancer or genetic mutations." **Why students think this:**.' },
                { id: 'b', prompt: 'A student claims: "DNA vaccines are better than live attenuated vaccines because they cannot revert to virulence." Evaluate this statement.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'advantages of DNA vaccines', 'Disadvantage of DNA vaccine: risk of insertional mutagenesis causing cancer'],
                  hint: 'Revisit c11_biotech_cbse_12_008 (plasmid vectors) and.',
                  misconception: '**Misconception:** "DNA vaccines integrate into the host genome and can cause cancer or genetic mutations." **Why students think this:**.' }
          ],
            remediations: { 'misconception-dna-vaccines-integrate-into': { steps: ['** Show them a plasmid map (e.g., pVAX1) — point out: no *att* sites, no *int* gene, no LTRs.', '** Contrast with lentiviral vector (has *int* gene, LTRs) used in gene therapy — *that* integrates. **', '** Assign a 5-minute writing task: "Explain to a 10th grader why plasmid DNA in the nucleus ≠ genomic integration.', '** Re-diagnose with Diagnostic Question 4 (comparison table) — if they now correctly state "integration risk.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_10_004', difficulty: 'standard',
          question: 'Recombinant therapeutic proteins are human or human-like proteins produced.',
          hint: 'Revisit c11_biotech_cbse_07_009 (Post-Translational Modifications) and draw a table.',
          misconception: 'Students believe that "recombinant protein = identical to human protein" and that "E.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Recombinant human insulin is produced by inserting the human insulin gene into E.', answer: 'The error: E',
                  options: ['The error: E', 'recombinant protein = identical to human protein', '"recombinant protein = identical to human protein" and that "E'],
                  hint: 'Revisit c11_biotech_cbse_07_009 (Post-Translational Modifications) and draw a table comparing E.',
                  misconception: 'Students believe that "recombinant protein = identical to human protein" and that "E.' },
                { id: 'b', prompt: 'Compare and contrast the two-phase cultivation process for recombinant human insulin production in E.', answer: '**Two-phase insulin (E',
                  options: ['**Two-phase insulin (E', 'recombinant protein = identical to human protein', '"recombinant protein = identical to human protein" and that "E'],
                  hint: 'Revisit c11_biotech_cbse_07_009 (Post-Translational Modifications) and draw a table comparing E.',
                  misconception: 'Students believe that "recombinant protein = identical to human protein" and that "E.' }
          ],
            remediations: { 'recombinant-protein-identical-to-human': { steps: ['If the student holds this misconception: (1) Show side-by-side SDS-PAGE of reduced/non-reduced insulin from E.', 'coli vs human pancreas — ask "Why does E.', 'coli sample show high-molecular-weight smear without DTT?" (disulfide scrambling).', '(2) Assign a 15-min task: "List 5 therapeutic proteins produced in E.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_10_005', difficulty: 'standard',
          question: 'Monoclonal antibodies (mAbs) are identical immunoglobulin molecules produced.',
          hint: 'If stuck, review c11_biotech_cbse_03_003 (Levels of Protein Structure: Primary.',
          misconception: 'Students often believe: "Monoclonal antibodies are \'magic bullets\' that directly kill cancer cells upon binding." The.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Monoclonal antibodies (mAbs) are identical immunoglobulin molecules produced by a single',
                  options: ['Monoclonal antibodies (mAbs) are identical immunoglobulin molecules produced by a single', 'A recombinant vaccine is produced by inserting the gene encoding a specific pathogen', 'Edible vaccines are subunit vaccines produced by introducing selected genes encoding', 'A DNA vaccine is a plasmid-based vaccine that delivers a gene encoding a specific'],
                  hint: 'If stuck, review c11_biotech_cbse_03_003 (Levels of Protein Structure: Primary to Quaternary) for.',
                  misconception: 'Students often believe: "Monoclonal antibodies are \'magic bullets\' that directly kill cancer cells upon binding." The reality: most naked.' }
          ],
            remediations: { 'monoclonal-antibodies-are-magic-bullets': { steps: ['Revisit c11_biotech_cbse_03_003 (antibody structure) — draw IgG with labeled Fab/Fc, hinge, CDRs, heavy/light chains.', 'Re-watch hybridoma animation (NCERT Lab Manual) focusing on HAT selection logic — write the salvage/de novo pathway.', 'Make a table: mAb name | target | mechanism (ADCC/CDC/signal blockade/angiogenesis inhibition/checkpoint) | generation.', 'Re-attempt Diagnostic Q4 and Q5. If still stuck, review c11_biotech_cbse_12_011 (animal cell culture) for bioreactor.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_10_006', difficulty: 'standard',
          question: 'Gene therapy for ADA-deficient SCID is a somatic cell gene therapy approach.',
          hint: 'If stuck on lymphocyte-selective toxicity: revisit c11_bio_cbse_12_002 (Glycolysis/ATP).',
          misconception: 'Students conflate ADA-SCID gene therapy with X-linked SCID (IL2RG) gene therapy and assume both use gammaretroviral.',
          parts: [
                { id: 'a', prompt: 'A REMEMBER level question: State the full form of SCID and ADA in the context of this gene therapy. What chromosome carries the human ADA gene?', answer: 'SCID = Severe Combined Immunodeficiency',
                  options: ['SCID = Severe Combined Immunodeficiency', 'chromosome 14', 'X chromosome'],
                  hint: 'If stuck on lymphocyte-selective toxicity: revisit c11_bio_cbse_12_002 (Glycolysis/ATP) and.',
                  misconception: 'Students conflate ADA-SCID gene therapy with X-linked SCID (IL2RG) gene therapy and assume both use gammaretroviral vectors with identical.' },
                { id: 'b', prompt: 'An UNDERSTAND level question: Explain why deoxyadenosine accumulation is selectively toxic to lymphocytes but not to most other cell types, referencing the.', answer: 'In ADA deficiency, adenosine and deoxyadenosine accumulate',
                  options: ['In ADA deficiency, adenosine and deoxyadenosine accumulate', 'ADA breaks down adenosine'],
                  hint: 'If stuck on lymphocyte-selective toxicity: revisit c11_bio_cbse_12_002 (Glycolysis/ATP) and.',
                  misconception: 'Students conflate ADA-SCID gene therapy with X-linked SCID (IL2RG) gene therapy and assume both use gammaretroviral vectors with identical.' }
          ],
            remediations: { 'students-conflate-ada-scid-gene': { steps: ['Revisit c11_biotech_cbse_07_007 (Translation) and c11_biotech_cbse_07_010 (Lac Operon) to reinforce gene expression.', 'Review c11_biotech_cbse_08_008 (Single Gene Disorders) for autosomal recessive inheritance of ADA deficiency vs.', 'Study c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors) — focus on retroviral vs.', 'Re-attempt Diagnostic Questions 2 and 4 with emphasis on purine metabolism biochemistry and vector integration.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
