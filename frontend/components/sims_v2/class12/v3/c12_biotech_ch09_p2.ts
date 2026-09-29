import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch09_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch09_p2: SimDef = {
    id: 'v3_c12_biotech_ch09_p2',
    title: 'Stem Cell Research · Part 2/2',
    subtitle: 'Your finger heals but a limb won\'t regrow — the difference is which stem cells live there.',
    classLevel: 12, subject: 'biotechnology', topic: 'Stem Cell Research · Part 2/2',
    chapters: ['c12_biotech_ch09'],
    nodeIds: ['c12_biotech_cbse_09_007', 'c12_biotech_cbse_09_008', 'c12_biotech_cbse_09_009', 'c12_biotech_cbse_09_010', 'c12_biotech_cbse_09_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Regenerative medicine researcher', intro: 'Every tissue keeps a reserve army of unspecialised cells — medicine\'s dream is learning to command it.', goal: 'Define stem cells by self-renewal and potency and compare embryonic with adult stem cells.' },
    discovery: {
        question: 'Your cut finger heals in days — but a lost limb never regrows. What do skin and bone marrow have that makes regeneration possible?',
        options: ['Resident stem cells — unspecialised cells that self-renew indefinitely and differentiate into the tissue\'s cell types', 'Blood cells — any dividing cell can rebuild any lost tissue', 'Scar tissue — it converts back into normal tissue over time', 'Nerve endings — they instruct neighbouring cells to multiply'],
        answer: 'Resident stem cells — unspecialised cells that self-renew indefinitely and differentiate into the tissue\'s cell types',
        hook: 'Not every dividing cell is a stem cell — skin cells divide but stay skin. The two tests are self-renewal (divide without differentiating) and potency (become other cell types); where they run out, regeneration stops.',
    },
    teaching: [
        { title: 'Stem Cell Niches: Microenvironment and Regulation', text: 'A stem cell niche is a specialized, dynamic microenvironment composed of cellular (supportive stromal cells, immune cells, endothelial cells) and non-cellular components (extracellular matrix.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_09_007', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Compare nature\'s two repair crews: embryonic stem cells that can become almost anything versus adult stem cells limited to their tissue — then argue which you\'d use for leukaemia versus drug-testing heart cells.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_09_007', title: 'Stem Cell Niches: Microenvironment and Regulation',
          caseStudy: { intro: 'Imagine you are a stem cell sitting in your "home" — the bone marrow.',
            decisions: [{ prompt: 'Define "stem cell niche" and name two cellular and two non-cellular components of the hematopoietic stem cell (HSC) niche in bone marrow.', options: [
                { text: 'A stem cell niche is the specialized microenvironment that regulates stem cell fate', outcome: 'A stem cell niche is the specialized microenvironment that regulates stem cell fate.' },
                { text: 'is just a location (e.g', outcome: 'Not quite — Students often think a "niche" is just a location (e.g., "bone marrow is the HSC niche") or.', reveals: 'a-niche-is-just-a' },
                { text: ') or a single signal (e.g', outcome: 'Not quite — Students often think a "niche" is just a location (e.g., "bone marrow is the HSC niche") or.', reveals: 'a-niche-is-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_09_008', title: 'Methods of Directing Stem Cell Differentiation',
          caseStudy: { intro: 'Imagine you have a vial of human induced pluripotent stem cells (hiPSCs) — they can become *any* cell type, but left alone they form a chaotic mix.',
            decisions: [{ prompt: 'Define "directed differentiation" of stem cells in one sentence and name the two fundamental properties of stem cells that make directed.', options: [
                { text: 'Directed differentiation is the intentional guidance of stem cells toward a specific', outcome: 'Directed differentiation is the intentional guidance of stem cells toward a specific lineage using.' },
                { text: 'making stem cells change', outcome: 'Not quite — Students often believe that **a single "master factor" (e.g., "Ngn3 for β-cells" or "MyoD for.', reveals: 'a-single-master-factor-e' },
                { text: 'totipotency', outcome: 'Not quite — Students often believe that **a single "master factor" (e.g., "Ngn3 for β-cells" or "MyoD for.', reveals: 'a-single-master-factor-e' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_09_010', title: 'Stem Cell Therapy for Diabetes and Neurological Disorders',
          caseStudy: { intro: 'Imagine a 14-year-old diagnosed with Type 1 diabetes who must inject insulin 4-5 times daily, calculating doses based on food intake, activity, and glucose.',
            decisions: [{ prompt: 'A student reads that "embryonic stem cells can treat Type 1 diabetes because they are pluripotent." What is the critical missing step.', options: [
                { text: '- Step 1: Identify the sequential efficiencies: Stage 3 = 90% (0.90), Stage 4 = 75%', outcome: 'STEPS: - Step 1: Identify the sequential efficiencies: Stage 3 = 90% (0.90), Stage 4 = 75% (0.75).' },
                { text: 'sense the environment', outcome: 'Not quite — **"Stem cells automatically become the needed cell type when injected into the damaged organ."**.', reveals: 'stem-cells-automatically-become-the' },
                { text: 'transplanting undifferentiated stem cells (e', outcome: 'Not quite — **"Stem cells automatically become the needed cell type when injected into the damaged organ."**.', reveals: 'stem-cells-automatically-become-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_09_011', title: 'Ethical Issues in Embryonic Stem Cell Research',
          caseStudy: { intro: 'Imagine a couple who completed IVF treatment has 5 frozen embryos they no longer need.',
            decisions: [{ prompt: 'What is the primary ethical concern specific to embryonic stem cell research that does not apply to adult stem cell research?', options: [
                { text: 'The primary ethical concern is the destruction of a human blastocyst (early embryo) to', outcome: 'The primary ethical concern is the destruction of a human blastocyst (early embryo) to obtain the.' },
                { text: 'both involve consent issues', outcome: 'Not quite — Students often believe: **"Induced pluripotent stem cells (iPSCs) completely solve the ethical.', reveals: 'induced-pluripotent-stem-cells-ipscs' },
                { text: 'avoids embryo destruction', outcome: 'Not quite — Students often believe: **"Induced pluripotent stem cells (iPSCs) completely solve the ethical.', reveals: 'induced-pluripotent-stem-cells-ipscs' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_09_008', title: 'Identify each idea',
          dissect: { specimen: 'Stem Cell Research · Part 2/2', spots: [
            { id: 's1', label: 'Stem Cell Niches Microenvironment and Regulation', prompt: 'Which idea is this? — A stem cell niche is a specialized, dynamic microenvironment composed of cellular.', answer: 'Stem Cell Niches Microenvironment and Regulation', options: ['Stem Cell Niches Microenvironment and Regulation', 'Methods of Directing Stem Cell Differentiation', 'Applications of Stem Cells in Regenerative Medicine', 'Stem Cell Therapy for Diabetes and Neurological Disorders'] },
            { id: 's2', label: 'Methods of Directing Stem Cell Differentiation', prompt: 'Which idea is this? — Methods of directing stem cell differentiation refer to the controlled laboratory.', answer: 'Methods of Directing Stem Cell Differentiation', options: ['Methods of Directing Stem Cell Differentiation', 'Stem Cell Niches Microenvironment and Regulation', 'Applications of Stem Cells in Regenerative Medicine', 'Stem Cell Therapy for Diabetes and Neurological Disorders'] },
            { id: 's3', label: 'Applications of Stem Cells in Regenerative Medicine', prompt: 'Which idea is this? — Regenerative medicine applications of stem cells involve using the self-renewal and.', answer: 'Applications of Stem Cells in Regenerative Medicine', options: ['Applications of Stem Cells in Regenerative Medicine', 'Stem Cell Niches Microenvironment and Regulation', 'Methods of Directing Stem Cell Differentiation', 'Stem Cell Therapy for Diabetes and Neurological Disorders'] },
            { id: 's4', label: 'Stem Cell Therapy for Diabetes and Neurological Disorders', prompt: 'Which idea is this? — Stem cell therapy for diabetes and neurological disorders involves the use of pluripotent.', answer: 'Stem Cell Therapy for Diabetes and Neurological Disorders', options: ['Stem Cell Therapy for Diabetes and Neurological Disorders', 'Stem Cell Niches Microenvironment and Regulation', 'Methods of Directing Stem Cell Differentiation', 'Applications of Stem Cells in Regenerative Medicine'] },
            { id: 's5', label: 'Ethical Issues in Embryonic Stem Cell Research', prompt: 'Which idea is this? — Ethical issues in embryonic stem cell research refer to the moral concerns arising from.', answer: 'Ethical Issues in Embryonic Stem Cell Research', options: ['Ethical Issues in Embryonic Stem Cell Research', 'Stem Cell Niches Microenvironment and Regulation', 'Methods of Directing Stem Cell Differentiation', 'Applications of Stem Cells in Regenerative Medicine'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A private clinic advertises to a heart-attack patient: \'Bone-marrow stem cell injections will regrow your damaged heart muscle.\' The family asks the student, who just studied stem cells, whether the claim holds up.',
            decisions: [{ prompt: 'Can bone-marrow HSCs rebuild heart muscle?', options: [
                { text: 'No — hematopoietic stem cells are multipotent: they self-renew but differentiate only into blood lineages; making cardiomyocytes is outside their potency, so the ad overpromises.', outcome: 'Potency is lineage-restricted for adult stem cells — \'stem cell\' on a brochure doesn\'t mean \'can become anything\'; heart repair needs other cell types.' },
                { text: 'Yes — stem cells self-renew indefinitely, so injected cells will just keep dividing until the heart is rebuilt.', outcome: 'Self-renewal without potency is mere proliferation — and uncontrolled self-renewal is closer to cancer than repair.', reveals: 'self-renewal-equals-repair' },
                { text: 'Yes — the injected cells are pluripotent, so they can form every tissue including a placenta.', outcome: 'Even pluripotent cells can\'t form extra-embryonic tissues — and adult marrow cells aren\'t pluripotent anyway; the claim stacks two errors.', reveals: 'pluripotent-is-totipotent' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_09_011', title: 'You made it',
          caseStudy: { intro: 'You can now separate stem-cell hype from stem-cell biology. Potency classes are crisp board content — and the deciding variable in regenerative medicine careers.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_09_007', difficulty: 'standard',
          question: 'A stem cell niche is a specialized, dynamic microenvironment composed.',
          hint: 'If stuck, revisit c12_biotech_cbse_09_003 (potency definitions) and c11_bio_cbse_19_007.',
          misconception: 'Students often think a "niche" is just a location (e.g., "bone marrow is the HSC niche") or a single signal (e.g., "Wnt.',
          parts: [
                { id: 'a', prompt: 'Explain why a hematopoietic stem cell transplanted into the spleen (which has a different microenvironment) may fail to engraft long-term, even though the.', answer: 'The spleen lacks the specific combination of osteoblasts, endosteal hypoxia, and',
                  options: ['The spleen lacks the specific combination of osteoblasts, endosteal hypoxia, and', 'spleen has no stem cells', 'is just a location (e.g', ') or a single signal (e.g'],
                  hint: 'If stuck, revisit c12_biotech_cbse_09_003 (potency definitions) and c11_bio_cbse_19_007 (peptide.',
                  misconception: 'Students often think a "niche" is just a location (e.g., "bone marrow is the HSC niche") or a single signal (e.g., "Wnt is the niche").' },
                { id: 'b', prompt: 'A researcher cultures intestinal stem cells (ISCs) in a dish with Matrigel (ECM mimic), EGF, Noggin, and R-spondin1 (Wnt agonist).', answer: 'Missing component: Paneth cells (or their Notch ligand DLL1/4)',
                  options: ['Missing component: Paneth cells (or their Notch ligand DLL1/4)', 'is just a location (e.g', ') or a single signal (e.g', 'a "niche" is just a location (e'],
                  hint: 'If stuck, revisit c12_biotech_cbse_09_003 (potency definitions) and c11_bio_cbse_19_007 (peptide.',
                  misconception: 'Students often think a "niche" is just a location (e.g., "bone marrow is the HSC niche") or a single signal (e.g., "Wnt is the niche").' },
                { id: 'c', prompt: 'Compare the regulatory logic of the hematopoietic stem cell niche (endosteal vs. vascular niches) with the intestinal crypt niche.', answer: 'In bone marrow, the endosteal niche (osteoblasts, low O₂, TGF-β, Ang-1) enforces',
                  options: ['In bone marrow, the endosteal niche (osteoblasts, low O₂, TGF-β, Ang-1) enforces', 'both niches just have stem cells at the bottom', 'is just a location (e.g', ') or a single signal (e.g'],
                  hint: 'If stuck, revisit c12_biotech_cbse_09_003 (potency definitions) and c11_bio_cbse_19_007 (peptide.',
                  misconception: 'Students often think a "niche" is just a location (e.g., "bone marrow is the HSC niche") or a single signal (e.g., "Wnt is the niche").' }
          ],
            remediations: { 'a-niche-is-just-a': { steps: ['Have the student draw the HSC niche from memory, labeling every cell type and signal.', 'Ask them to cross out one component and predict the exact phenotypic change (e.g., "remove osteoblasts → HSCs mobilize.', 'Show a time-lapse video of HSCs in intravital microscopy (available on YouTube) so they see dynamic interactions.', 'Assign a 150-word explanation of why a single-factor knockout (e.g., CXCL12⁻/⁻) does not fully ablate the niche.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a "niche" is just a location (e.g., "bone marrow is the HSC niche") or a single signal (e.g., "Wnt.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Induced pluripotent stem cells (iPSCs) do not require a niche because they can self-renew indefinitely in defined media (e.g., mTeSR).', answer: 'The statement is false',
                  options: ['The statement is false', 'is just a location (e.g', ') or a single signal (e.g', 'a "niche" is just a location (e'],
                  hint: 'If stuck, revisit c12_biotech_cbse_09_003 (potency definitions) and c11_bio_cbse_19_007 (peptide.',
                  misconception: 'Students often think a "niche" is just a location (e.g., "bone marrow is the HSC niche") or a single signal (e.g., "Wnt is the niche").' },
                { id: 'b', prompt: 'Design a minimal synthetic niche for maintaining human mesenchymal stem cells (MSCs) in vitro for 20 passages without spontaneous differentiation.', answer: 'Cellular: Co-culture with human umbilical vein endothelial cells (HUVECs) at 1:5',
                  options: ['Cellular: Co-culture with human umbilical vein endothelial cells (HUVECs) at 1:5', 'is just a location (e.g', ') or a single signal (e.g', 'a "niche" is just a location (e'],
                  hint: 'If stuck, revisit c12_biotech_cbse_09_003 (potency definitions) and c11_bio_cbse_19_007 (peptide.',
                  misconception: 'Students often think a "niche" is just a location (e.g., "bone marrow is the HSC niche") or a single signal (e.g., "Wnt is the niche").' }
          ],
            remediations: { 'a-niche-is-just-a': { steps: ['Have the student draw the HSC niche from memory, labeling every cell type and signal.', 'Ask them to cross out one component and predict the exact phenotypic change (e.g., "remove osteoblasts → HSCs mobilize.', 'Show a time-lapse video of HSCs in intravital microscopy (available on YouTube) so they see dynamic interactions.', 'Assign a 150-word explanation of why a single-factor knockout (e.g., CXCL12⁻/⁻) does not fully ablate the niche.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_09_008', difficulty: 'standard',
          question: 'Methods of directing stem cell differentiation refer to the controlled.',
          hint: 'Revisit Class 11 Biology Chapter 3 (Plant Growth Regulators) for the concept of *hormonal.',
          misconception: 'Students often believe that **a single "master factor" (e.g., "Ngn3 for β-cells" or "MyoD for muscle") can directly.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Adding BMP4 to hiPSCs will directly give neurons because BMP4 is a neural inducer." Identify the error and explain the correct role of BMP4.', answer: 'The error: BMP4 *inhibits* neural fate and *promotes* mesoderm/epidermis',
                  options: ['The error: BMP4 *inhibits* neural fate and *promotes* mesoderm/epidermis', 'default pathway', 'master factor', 'Ngn3 for β-cells'],
                  hint: 'Revisit Class 11 Biology Chapter 3 (Plant Growth Regulators) for the concept of *hormonal cascades*.',
                  misconception: 'Students often believe that **a single "master factor" (e.g., "Ngn3 for β-cells" or "MyoD for muscle") can directly convert pluripotent.' },
                { id: 'b', prompt: 'Design a 3-day protocol to differentiate hiPSCs into definitive endoderm (DE) using only two small molecules/growth factors.', answer: 'Day 0-1: Activin A (100 ng/mL) + CHIR99021 (3 µM) in RPMI/B27 minus insulin',
                  options: ['Day 0-1: Activin A (100 ng/mL) + CHIR99021 (3 µM) in RPMI/B27 minus insulin', 'master factor', 'Ngn3 for β-cells', 'MyoD for muscle'],
                  hint: 'Revisit Class 11 Biology Chapter 3 (Plant Growth Regulators) for the concept of *hormonal cascades*.',
                  misconception: 'Students often believe that **a single "master factor" (e.g., "Ngn3 for β-cells" or "MyoD for muscle") can directly convert pluripotent.' }
          ],
            remediations: { 'a-single-master-factor-e': { steps: ['If a student cannot design a stepwise protocol: (1) Revisit **c12_biotech_cbse_09_003** (potency definitions) to recall.', 'Re-diagnostic: Ask them to outline a neural differentiation protocol with *stage-specific* inhibitors (dual SMAD.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_09_009', difficulty: 'standard',
          question: 'Regenerative medicine applications of stem cells involve using the self-renewal.',
          hint: 'Revisit node c12_biotech_cbse_09_003 (potency definitions) and c12_biotech_cbse_09_006.',
          misconception: 'Students often believe "pluripotent stem cells (ESCs/iPSCs) are always better for therapy because they can make any.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Regenerative medicine applications of stem cells involve using the self-renewal and',
                  options: ['Regenerative medicine applications of stem cells involve using the self-renewal and', 'Stem cells are unspecialized, undifferentiated cells found in multicellular organisms', 'Embryonic stem cells (ESCs) are pluripotent cells derived from the inner cell mass of a', 'Pluripotency is the ability of a stem cell to differentiate into all cell types of the'],
                  hint: 'Revisit node c12_biotech_cbse_09_003 (potency definitions) and c12_biotech_cbse_09_006 (iPSC.',
                  misconception: 'Students often believe "pluripotent stem cells (ESCs/iPSCs) are always better for therapy because they can make any cell type." They write.' }
          ],
            remediations: { 'pluripotent-stem-cells-escs-ipscs': { steps: ['If the student exhibits this misconception: Step 1 — Have them create a 3-column table: Stem Cell Type | Potency | Key.', 'Fill for ESC, iPSC, HSC, MSC.', 'Step 2 — Ask: "Why does the NCERT say bone marrow transplant is the \'notable exception\' of a successful therapy?" Guide.', 'Step 3 — Re-attempt Diagnostic Question 2 and 5.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_09_010', difficulty: 'standard',
          question: 'Stem cell therapy for diabetes and neurological disorders involves the use.',
          hint: 'Revisit c12_biotech_cbse_09_003 (potency definitions) and c12_biotech_cbse_09_008.',
          misconception: '**"Stem cells automatically become the needed cell type when injected into the damaged organ."** Students believe that.',
          parts: [
                { id: 'a', prompt: 'In a clinical trial for spinal cord injury, researchers transplant neural progenitor cells (NPCs) derived from iPSCs.', answer: '- Step 1: Calculate surviving grafted cells = 1 × 10⁶ × 15% = 150,000 cells',
                  options: ['- Step 1: Calculate surviving grafted cells = 1 × 10⁶ × 15% = 150,000 cells', 'sense the environment', 'transplanting undifferentiated stem cells (e'],
                  hint: 'Revisit c12_biotech_cbse_09_003 (potency definitions) and c12_biotech_cbse_09_008 (differentiation.',
                  misconception: '**"Stem cells automatically become the needed cell type when injected into the damaged organ."** Students believe that transplanting.' },
                { id: 'b', prompt: 'A research team generates insulin-producing cells from human ESCs using a 7-stage protocol.', answer: '- Step 1: Assess function',
                  options: ['- Step 1: Assess function', 'sense the environment', 'transplanting undifferentiated stem cells (e'],
                  hint: 'Revisit c12_biotech_cbse_09_003 (potency definitions) and c12_biotech_cbse_09_008 (differentiation.',
                  misconception: '**"Stem cells automatically become the needed cell type when injected into the damaged organ."** Students believe that transplanting.' },
                { id: 'c', prompt: 'Compare the therapeutic rationale for using *autologous iPSC-derived* beta cells versus *allogeneic ESC-derived* beta cells for Type 1 diabetes.', answer: '| Criterion | Autologous iPSC-beta | Allogeneic ESC-beta | Winner for Phase I |',
                  options: ['| Criterion | Autologous iPSC-beta | Allogeneic ESC-beta | Winner for Phase I |', 'no rejection', 'sense the environment', 'transplanting undifferentiated stem cells (e'],
                  hint: 'Revisit c12_biotech_cbse_09_003 (potency definitions) and c12_biotech_cbse_09_008 (differentiation.',
                  misconception: '**"Stem cells automatically become the needed cell type when injected into the damaged organ."** Students believe that transplanting.' }
          ],
            remediations: { 'stem-cells-automatically-become-the': { steps: ['If a student holds this misconception: (1) Show the teratoma formation assay (gold standard for pluripotency) — inject.', 'Ask: "Would you want this in a patient\'s pancreas?" (2) Walk through a 7-stage beta cell differentiation protocol.', 'Emphasize: "The *recipe* is the therapy, not the raw ingredient." (3) Contrast with MSC therapy for GvHD (where.', '(4) Revisit node c12_biotech_cbse_09_008 (Methods of Directing Stem Cell Differentiation) and c12_biotech_cbse_09_007.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_09_011', difficulty: 'standard',
          question: 'Ethical issues in embryonic stem cell research refer to the moral concerns.',
          hint: 'Revisit node c12_biotech_cbse_09_002 (Embryonic vs Adult Stem Cells) and.',
          misconception: 'Students often believe: **"Induced pluripotent stem cells (iPSCs) completely solve the ethical problems of embryonic.',
          parts: [
                { id: 'a', prompt: 'Explain why the destruction of a blastocyst for stem cell derivation is considered an ethical dilemma, referencing the concept of moral status.', answer: 'The dilemma arises',
                  options: ['The dilemma arises', 'it\'s just a bunch of cells, no dilemma', 'avoids embryo destruction', 'ethically unproblematic'],
                  hint: 'Revisit node c12_biotech_cbse_09_002 (Embryonic vs Adult Stem Cells) and c12_biotech_cbse_09_003.',
                  misconception: 'Students often believe: **"Induced pluripotent stem cells (iPSCs) completely solve the ethical problems of embryonic stem cell research."**.' }
          ],
            remediations: { 'induced-pluripotent-stem-cells-ipscs': { steps: ['If the student holds this misconception: 1.', '**Revisit node c12_biotech_cbse_09_006 (iPSCs)** and list: derivation method (viral/episomal), genetic alterations.', 'Ask: "Does each feature raise an ethical concern?" 2.', '**Review ICMR 2017 guidelines** (node c11_biotech_cbse_01_010) — note that both hESC derivation *and* iPSC clinical.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
