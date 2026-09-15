import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch09_p1: SimDef = {
    id: 'v3_c12_biotech_ch09_p1',
    title: 'Stem Cell Research · Part 1/2',
    subtitle: 'Your finger heals but a limb won\'t regrow — the difference is which stem cells live there.',
    classLevel: 12, subject: 'biotechnology', topic: 'Stem Cell Research · Part 1/2',
    chapters: ['c12_biotech_ch09'],
    nodeIds: ['c12_biotech_cbse_09_001', 'c12_biotech_cbse_09_002', 'c12_biotech_cbse_09_003', 'c12_biotech_cbse_09_004', 'c12_biotech_cbse_09_005', 'c12_biotech_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Regenerative medicine researcher', intro: 'Every tissue keeps a reserve army of unspecialised cells — medicine\'s dream is learning to command it.', goal: 'Define stem cells by self-renewal and potency and compare embryonic with adult stem cells.' },
    discovery: {
        question: 'Your cut finger heals in days — but a lost limb never regrows. What do skin and bone marrow have that makes regeneration possible?',
        options: ['Resident stem cells — unspecialised cells that self-renew indefinitely and differentiate into the tissue\'s cell types', 'Blood cells — any dividing cell can rebuild any lost tissue', 'Scar tissue — it converts back into normal tissue over time', 'Nerve endings — they instruct neighbouring cells to multiply'],
        answer: 'Resident stem cells — unspecialised cells that self-renew indefinitely and differentiate into the tissue\'s cell types',
        hook: 'Not every dividing cell is a stem cell — skin cells divide but stay skin. The two tests are self-renewal (divide without differentiating) and potency (become other cell types); where they run out, regeneration stops.',
    },
    teaching: [
        { title: 'Stem Cells: Definition and Key Properties (Self-Renewal, Potency)', text: 'Stem cells are unspecialized, undifferentiated cells found in multicellular organisms that possess two defining properties: (1) **self-renewal** — the ability to undergo repeated mitotic divisions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_09_001', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Compare nature\'s two repair crews: embryonic stem cells that can become almost anything versus adult stem cells limited to their tissue — then argue which you\'d use for leukaemia versus drug-testing heart cells.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_09_001', title: 'Stem Cells: Definition and Key Properties (Self-Renewal, Potency)',
          caseStudy: { intro: 'Imagine you cut your finger — within days, the skin repairs itself. But if you lose a limb, it doesn\'t grow back.',
            decisions: [{ prompt: 'A student writes: "Stem cells are cells that can divide many times." Is this definition complete?', options: [
                { text: 'No, the definition is incomplete', outcome: 'No, the definition is incomplete. It captures **self-renewal** (repeated mitotic division while.' },
                { text: 'all body cell types', outcome: 'Not quite — **Misconception:** "Pluripotent stem cells can form a complete organism because they can make all.', reveals: 'misconception-pluripotent-stem-cells-can' },
                { text: 'all cell types including extra-embryonic', outcome: 'Not quite — **Misconception:** "Pluripotent stem cells can form a complete organism because they can make all.', reveals: 'misconception-pluripotent-stem-cells-can' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_09_002', title: 'Types of Stem Cells: Embryonic vs Adult (Somatic)',
          caseStudy: { intro: 'Imagine a patient needs a bone marrow transplant for leukaemia — doctors use hematopoietic stem cells from a donor\'s bone marrow (adult stem cells).',
            decisions: [{ prompt: 'State the exact source of human embryonic stem cells (hESCs) and the stage of embryonic development from which they are isolated.', options: [
                { text: 'Human embryonic stem cells are isolated from the inner cell mass (ICM) of a blastocyst', outcome: 'Human embryonic stem cells are isolated from the inner cell mass (ICM) of a blastocyst, which forms.' },
                { text: 'from the morula', outcome: 'Not quite — Students often think "pluripotent means can make ANY cell including placenta" — they confuse.', reveals: 'pluripotent-means-can-make-any' },
                { text: 'from the zygote', outcome: 'Not quite — Students often think "pluripotent means can make ANY cell including placenta" — they confuse.', reveals: 'pluripotent-means-can-make-any' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_09_003', title: 'Pluripotency, Multipotency, and Unipotency Defined',
          caseStudy: { intro: 'Imagine you are a doctor trying to choose the right stem cell source for a patient who needs new cartilage (mesoderm lineage) versus a patient who needs.',
            decisions: [{ prompt: 'Define \'multipotent stem cell\' and give one example from the human body.', options: [
                { text: 'A multipotent stem cell can differentiate into multiple cell types but only within a', outcome: 'A multipotent stem cell can differentiate into multiple cell types but only within a closely.' },
                { text: 'can differentiate into any cell type', outcome: 'Not quite — Students often think "multipotent = can become many cell types = almost pluripotent" and use the.', reveals: 'multipotent-can-become-many-cell' },
                { text: 'can form a complete organism', outcome: 'Not quite — Students often think "multipotent = can become many cell types = almost pluripotent" and use the.', reveals: 'multipotent-can-become-many-cell' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_09_004', title: 'Hematopoietic Stem Cells: Source and Clinical Use',
          caseStudy: { intro: 'Imagine a 10-year-old child diagnosed with acute lymphoblastic leukemia (ALL) whose chemotherapy has failed.',
            decisions: [{ prompt: 'Name the three main clinical sources of hematopoietic stem cells used for transplantation and state the typical volume of bone marrow.', options: [
                { text: 'The three main sources are: (1) Bone marrow (harvested by aspiration from the posterior', outcome: 'The three main sources are: (1) Bone marrow (harvested by aspiration from the posterior iliac.' },
                { text: 'embryonic stem cells', outcome: 'Not quite — Students often believe that "bone marrow transplant" means surgically transplanting a piece.', reveals: 'bone-marrow-transplant-means-surgically' },
                { text: 'adipose tissue', outcome: 'Not quite — Students often believe that "bone marrow transplant" means surgically transplanting a piece.', reveals: 'bone-marrow-transplant-means-surgically' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_09_005', title: 'Mesenchymal Stem Cells: Properties and Applications',
          caseStudy: { intro: 'Imagine a patient with a severe cartilage defect in the knee — the cushioning tissue doesn\'t heal because it lacks blood supply.',
            decisions: [{ prompt: 'State the three minimal criteria proposed by the International Society for Cellular Therapy (ISCT) to define human mesenchymal stem cells.', options: [
                { text: 'The three ISCT minimal criteria are: (1) plastic adherence under standard culture', outcome: 'The three ISCT minimal criteria are: (1) plastic adherence under standard culture conditions; (2).' },
                { text: 'What is the main mechanism of MSC therapy in myocardial infarction?', outcome: 'Not quite — Students often believe MSCs *directly differentiate and replace* damaged cells in vivo as their.', reveals: 'mscs-directly-differentiate-and-replace' },
                { text: 'differentiation into cardiomyocytes', outcome: 'Not quite — Students often believe MSCs *directly differentiate and replace* damaged cells in vivo as their.', reveals: 'mscs-directly-differentiate-and-replace' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_09_006', title: 'Induced Pluripotent Stem Cells (iPSCs): Yamanaka Factors',
          caseStudy: { intro: 'Imagine a patient with Parkinson\'s disease needs dopamine-producing neurons transplanted, but using embryonic stem cells raises ethical concerns and immune.',
            decisions: [{ prompt: 'What are the four Yamanaka factors used to generate induced pluripotent stem cells (iPSCs), and which one is an oncogene that poses.', options: [
                { text: 'The four Yamanaka factors are Oct4, Sox2, Klf4, and c-Myc (OSKM)', outcome: 'The four Yamanaka factors are Oct4, Sox2, Klf4, and c-Myc (OSKM).' },
                { text: 'Oct4 is inserted and stays on', outcome: 'Not quite — Students often believe that "iPSCs are made by adding stem cell genes to a normal cell, so they.', reveals: 'ipscs-are-made-by-adding' },
                { text: 'the cell is already pluripotent', outcome: 'Not quite — Students often believe that "iPSCs are made by adding stem cell genes to a normal cell, so they.', reveals: 'ipscs-are-made-by-adding' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'Stem Cell Research · Part 1/2', spots: [
            { id: 's1', label: 'Types of Stem Cells Embryonic vs Adult Somatic', prompt: 'Which idea is this? — Embryonic stem cells (ESCs) are pluripotent cells derived from the inner cell mass of.', answer: 'Types of Stem Cells Embryonic vs Adult Somatic', options: ['Types of Stem Cells Embryonic vs Adult Somatic', 'Pluripotency Multipotency and Unipotency Defined', 'Hematopoietic Stem Cells Source and Clinical Use', 'Mesenchymal Stem Cells Properties and Applications'] },
            { id: 's2', label: 'Pluripotency Multipotency and Unipotency Defined', prompt: 'Which idea is this? — Pluripotency is the ability of a stem cell to differentiate into all cell types of the.', answer: 'Pluripotency Multipotency and Unipotency Defined', options: ['Pluripotency Multipotency and Unipotency Defined', 'Types of Stem Cells Embryonic vs Adult Somatic', 'Hematopoietic Stem Cells Source and Clinical Use', 'Mesenchymal Stem Cells Properties and Applications'] },
            { id: 's3', label: 'Hematopoietic Stem Cells Source and Clinical Use', prompt: 'Which idea is this? — Hematopoietic stem cells (HSCs) are multipotent adult stem cells residing primarily.', answer: 'Hematopoietic Stem Cells Source and Clinical Use', options: ['Hematopoietic Stem Cells Source and Clinical Use', 'Types of Stem Cells Embryonic vs Adult Somatic', 'Pluripotency Multipotency and Unipotency Defined', 'Mesenchymal Stem Cells Properties and Applications'] },
            { id: 's4', label: 'Mesenchymal Stem Cells Properties and Applications', prompt: 'Which idea is this? — Mesenchymal stem cells (MSCs) are multipotent adult stem cells of mesodermal origin that.', answer: 'Mesenchymal Stem Cells Properties and Applications', options: ['Mesenchymal Stem Cells Properties and Applications', 'Types of Stem Cells Embryonic vs Adult Somatic', 'Pluripotency Multipotency and Unipotency Defined', 'Hematopoietic Stem Cells Source and Clinical Use'] },
            { id: 's5', label: 'Induced Pluripotent Stem Cells iPSCs Yamanaka Factors', prompt: 'Which idea is this? — Induced Pluripotent Stem Cells (iPSCs) are somatic cells that have been genetically.', answer: 'Induced Pluripotent Stem Cells iPSCs Yamanaka Factors', options: ['Induced Pluripotent Stem Cells iPSCs Yamanaka Factors', 'Types of Stem Cells Embryonic vs Adult Somatic', 'Pluripotency Multipotency and Unipotency Defined', 'Hematopoietic Stem Cells Source and Clinical Use'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A private clinic advertises to a heart-attack patient: \'Bone-marrow stem cell injections will regrow your damaged heart muscle.\' The family asks the student, who just studied stem cells, whether the claim holds up.',
            decisions: [{ prompt: 'Can bone-marrow HSCs rebuild heart muscle?', options: [
                { text: 'No — hematopoietic stem cells are multipotent: they self-renew but differentiate only into blood lineages; making cardiomyocytes is outside their potency, so the ad overpromises.', outcome: 'Potency is lineage-restricted for adult stem cells — \'stem cell\' on a brochure doesn\'t mean \'can become anything\'; heart repair needs other cell types.' },
                { text: 'Yes — stem cells self-renew indefinitely, so injected cells will just keep dividing until the heart is rebuilt.', outcome: 'Self-renewal without potency is mere proliferation — and uncontrolled self-renewal is closer to cancer than repair.', reveals: 'self-renewal-equals-repair' },
                { text: 'Yes — the injected cells are pluripotent, so they can form every tissue including a placenta.', outcome: 'Even pluripotent cells can\'t form extra-embryonic tissues — and adult marrow cells aren\'t pluripotent anyway; the claim stacks two errors.', reveals: 'pluripotent-is-totipotent' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now separate stem-cell hype from stem-cell biology. Potency classes are crisp board content — and the deciding variable in regenerative medicine careers.',
            decisions: [{ prompt: 'What comes next? Stem Cell Research · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Stem Cell Research · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_09_001', difficulty: 'standard',
          question: 'Stem cells are unspecialized, undifferentiated cells found in multicellular.',
          hint: 'If stuck on self-renewal mechanism, revisit c11_biotech_cbse_05_001 (cell cycle.',
          misconception: '**Misconception:** "Pluripotent stem cells can form a complete organism because they can make all cell types of the.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Stem cells are cells that can divide many times." Is this definition complete? If not, what is missing and why does it matter?', answer: 'No, the definition is incomplete',
                  options: ['No, the definition is incomplete', 'all body cell types', 'all cell types including extra-embryonic'],
                  hint: 'If stuck on self-renewal mechanism, revisit c11_biotech_cbse_05_001 (cell cycle checkpoints) and.',
                  misconception: '**Misconception:** "Pluripotent stem cells can form a complete organism because they can make all cell types of the body." **Why it\'s.' },
                { id: 'b', prompt: 'Explain in your own words why the zygote is totipotent but the inner cell mass (ICM) of the blastocyst is pluripotent, not totipotent.', answer: 'The zygote is **totipotent**',
                  options: ['The zygote is **totipotent**', 'all cell types of the body', 'all cell types including extra-embryonic', 'all body cell types'],
                  hint: 'If stuck on self-renewal mechanism, revisit c11_biotech_cbse_05_001 (cell cycle checkpoints) and.',
                  misconception: '**Misconception:** "Pluripotent stem cells can form a complete organism because they can make all cell types of the body." **Why it\'s.' },
                { id: 'c', prompt: 'A researcher isolates cells from adult bone marrow. These cells can self-renew and differentiate into erythrocytes, neutrophils, monocytes, and platelets.', answer: 'These are **multipotent hematopoietic stem cells (HSCs)**',
                  options: ['These are **multipotent hematopoietic stem cells (HSCs)**', 'all body cell types', 'all cell types including extra-embryonic'],
                  hint: 'If stuck on self-renewal mechanism, revisit c11_biotech_cbse_05_001 (cell cycle checkpoints) and.',
                  misconception: '**Misconception:** "Pluripotent stem cells can form a complete organism because they can make all cell types of the body." **Why it\'s.' },
                { id: 'd', prompt: 'Compare and contrast: (a) Embryonic stem cells (ESCs) derived from the ICM, and (b) Adult stem cells from bone marrow.', answer: '| Feature | Embryonic Stem Cells (ESCs) | Adult Stem Cells (Bone Marrow) |',
                  options: ['| Feature | Embryonic Stem Cells (ESCs) | Adult Stem Cells (Bone Marrow) |', 'all body cell types', 'all cell types including extra-embryonic'],
                  hint: 'If stuck on self-renewal mechanism, revisit c11_biotech_cbse_05_001 (cell cycle checkpoints) and.',
                  misconception: '**Misconception:** "Pluripotent stem cells can form a complete organism because they can make all cell types of the body." **Why it\'s.' }
          ],
            remediations: { 'misconception-pluripotent-stem-cells-can': { steps: ['** Draw the developmental timeline on paper: Zygote → 2-cell → 4-cell → 8-cell (all **totipotent**) → Morula →.', '** Ask: "Can ICM cells make placenta?" Answer: No — trophectoderm already committed. Therefore ICM = **pluripotent**.', '** Revisit NCERT Fig 9.1(b) and the definitions: "Totipotent = embryo + extra-embryonic; Pluripotent = all germ layers.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Pluripotent stem cells can form a complete organism because they can make all cell types of the.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Since unipotent stem cells (like epidermal stem cells) can only produce one cell type, they are less useful for regenerative medicine.', answer: '**Judgment: The claim is oversimplified',
                  options: ['**Judgment: The claim is oversimplified', 'all body cell types', 'all cell types including extra-embryonic'],
                  hint: 'If stuck on self-renewal mechanism, revisit c11_biotech_cbse_05_001 (cell cycle checkpoints) and.',
                  misconception: '**Misconception:** "Pluripotent stem cells can form a complete organism because they can make all cell types of the body." **Why it\'s.' }
          ],
            remediations: { 'misconception-pluripotent-stem-cells-can': { steps: ['** Draw the developmental timeline on paper: Zygote → 2-cell → 4-cell → 8-cell (all **totipotent**) → Morula →.', '** Ask: "Can ICM cells make placenta?" Answer: No — trophectoderm already committed. Therefore ICM = **pluripotent**.', '** Revisit NCERT Fig 9.1(b) and the definitions: "Totipotent = embryo + extra-embryonic; Pluripotent = all germ layers.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_09_002', difficulty: 'standard',
          question: 'Embryonic stem cells (ESCs) are pluripotent cells derived from the inner cell.',
          hint: 'If unable to identify blastocyst structures or define stem cell properties, revisit.',
          misconception: 'Students often think "pluripotent means can make ANY cell including placenta" — they confuse pluripotent with.',
          parts: [
                { id: 'a', prompt: 'A research team wants to generate insulin-producing pancreatic beta cells for a Type 1 diabetes therapy.', answer: 'They should choose hESCs',
                  options: ['They should choose hESCs', 'pluripotent means can make ANY cell including placenta'],
                  hint: 'If unable to identify blastocyst structures or define stem cell properties, revisit.',
                  misconception: 'Students often think "pluripotent means can make ANY cell including placenta" — they confuse pluripotent with totipotent.' }
          ],
            remediations: { 'pluripotent-means-can-make-any': { steps: ['If the student confuses totipotent and pluripotent: (1) Re-read the NCERT definitions of totipotent ("produce both.', '(2) Draw a two-column table: Totipotent vs Pluripotent — list "Can form placenta?" (Yes/No), "Example" (Zygote / ICM.', '(3) Re-attempt Diagnostic Question 1 and 3, explicitly naming the germ layers and extra-embryonic tissues.', '(4) If still stuck, revisit node c12_biotech_cbse_09_003 (Pluripotency, Multipotency, and Unipotency Defined) for.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_09_003', difficulty: 'standard',
          question: 'Pluripotency is the ability of a stem cell to differentiate into all cell types.',
          hint: 'If germ layers are unclear, revisit c11_bio_cbse_03_010 (Pregnancy and Embryonic.',
          misconception: 'Students often think "multipotent = can become many cell types = almost pluripotent" and use the terms interchangeably.',
          parts: [
                { id: 'a', prompt: 'A researcher isolates stem cells from the umbilical cord blood of a newborn.', answer: 'These are multipotent stem cells (specifically hematopoietic stem cells)',
                  options: ['These are multipotent stem cells (specifically hematopoietic stem cells)', 'multipotent = can become many cell types = almost pluripotent', 'HSCs can become liver cells'],
                  hint: 'If germ layers are unclear, revisit c11_bio_cbse_03_010 (Pregnancy and Embryonic Development).',
                  misconception: 'Students often think "multipotent = can become many cell types = almost pluripotent" and use the terms interchangeably.' }
          ],
            remediations: { 'multipotent-can-become-many-cell': { steps: ['If a student cannot distinguish multipotent from pluripotent, do this 3-step remediation: (1) Draw a 3-column table.', 'Fill: Ectoderm → ESC → Neural stem cell; Mesoderm → ESC → HSC; Endoderm → ESC → Hepatic progenitor.', '(2) Ask: "Can the multipotent example in column 3 make a cell type from a DIFFERENT germ layer?" Answer must be NO.', '(3) Re-attempt Diagnostic Question 3 with this table as reference.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_09_004', difficulty: 'standard',
          question: 'Hematopoietic stem cells (HSCs) are multipotent adult stem cells residing.',
          hint: 'If stuck, revisit the definition of multipotency (c12_biotech_cbse_09_003) and the adult.',
          misconception: 'Students often believe that "bone marrow transplant" means surgically transplanting a piece of solid bone or that the.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast umbilical cord blood (UCB) and mobilized peripheral blood (PBSC) as HSC sources for allogeneic transplantation across these four.', answer: 'HLA matching stringency, (',
                  options: ['HLA matching stringency, (', 'bone marrow transplant'],
                  hint: 'If stuck, revisit the definition of multipotency (c12_biotech_cbse_09_003) and the adult stem cell.',
                  misconception: 'Students often believe that "bone marrow transplant" means surgically transplanting a piece of solid bone or that the donor\'s bone marrow.' }
          ],
            remediations: { 'bone-marrow-transplant-means-surgically': { steps: ['If the student confuses HSC sources or transplant types: (1) Revisit node c12_biotech_cbse_09_002 (Types of Stem Cells.', '(2) Create a 3-column table: Source | Collection Method | Key Advantage | Key Limitation.', 'Fill it from NCERT text and class notes.', '(3) Practice the HLA matching rule: "Autologous = self (no HLA match needed); Allogeneic = donor (HLA match critical).'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_09_005', difficulty: 'standard',
          question: 'Mesenchymal stem cells (MSCs) are multipotent adult stem cells of mesodermal.',
          hint: 'Revisit c12_biotech_cbse_09_003 (potency definitions) and c12_biotech_cbse_09_004 (HSC.',
          misconception: 'Students often believe MSCs *directly differentiate and replace* damaged cells in vivo as their primary mechanism.',
          parts: [
                { id: 'a', prompt: 'A researcher isolates plastic-adherent cells from human adipose tissue that differentiate into fat, bone, and cartilage in vitro.', answer: 'No, these are not MSCs per ISCT criteria',
                  options: ['No, these are not MSCs per ISCT criteria', 'What is the main mechanism of MSC therapy in myocardial infarction?', 'differentiation into cardiomyocytes', 'paracrine-mediated cardioprotection and immunomodulation'],
                  hint: 'Revisit c12_biotech_cbse_09_003 (potency definitions) and c12_biotech_cbse_09_004 (HSC vs.',
                  misconception: 'Students often believe MSCs *directly differentiate and replace* damaged cells in vivo as their primary mechanism.' }
          ],
            remediations: { 'mscs-directly-differentiate-and-replace': { steps: ['If the student holds the differentiation-replacement misconception: (1) Show them a timeline figure: MSC injection →.', '(2) Assign a 2015-2020 review paper on "MSC secretome" and ask them to list 5 factors and their targets.', '(3) Re-diagnose with a question: "In a rat MI model, human MSCs improve ejection fraction but <1% engraft.', 'Explain." If they still cite differentiation, revisit the *paracrine vs.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_09_006', difficulty: 'standard',
          question: 'Induced Pluripotent Stem Cells (iPSCs) are somatic cells that have been.',
          hint: 'Revisit c12_biotech_cbse_09_003 (pluripotency definition) and c11_biotech_cbse_07_010.',
          misconception: 'Students often believe that "iPSCs are made by adding stem cell genes to a normal cell, so they become stem cells.',
          parts: [
                { id: 'a', prompt: 'What are the four Yamanaka factors used to generate induced pluripotent stem cells (iPSCs), and which one is an oncogene that poses a tumorigenicity risk.', answer: 'The four Yamanaka factors are Oct4, Sox2, Klf4, and c-Myc (OSKM)',
                  options: ['The four Yamanaka factors are Oct4, Sox2, Klf4, and c-Myc (OSKM)', 'Oct4 is inserted and stays on', 'the cell is already pluripotent', 'Nanog instead of Klf4, or missing c-Myc'],
                  hint: 'Revisit c12_biotech_cbse_09_003 (pluripotency definition) and c11_biotech_cbse_07_010.',
                  misconception: 'Students often believe that "iPSCs are made by adding stem cell genes to a normal cell, so they become stem cells instantly." The error.' },
                { id: 'b', prompt: 'A student claims: "iPSCs are exactly identical to embryonic stem cells because both are pluripotent." Explain why this statement is incorrect by comparing.', answer: 'iPSCs are *similar* but not *identical* to ESCs',
                  options: ['iPSCs are *similar* but not *identical* to ESCs', 'Oct4 is inserted and stays on', 'the cell is already pluripotent'],
                  hint: 'Revisit c12_biotech_cbse_09_003 (pluripotency definition) and c11_biotech_cbse_07_010.',
                  misconception: 'Students often believe that "iPSCs are made by adding stem cell genes to a normal cell, so they become stem cells instantly." The error.' }
          ],
            remediations: { 'ipscs-are-made-by-adding': { steps: ['If the student holds the above misconception: (1) Show a time-lapse video of reprogramming (days 0–21) highlighting.', '(2) Use a diagram: exogenous OSKM (viral) → activates endogenous Oct4/Sox2/Nanog → exogenous transgenes silenced.', '(3) Assign a mini-task: "Compare qPCR primer sets: one amplifying only the viral transgene (WPRE sequence) vs one.', 'Which proves reprogramming?" (4) Re-test with Diagnostic Question 3 — require them to list *endogenous* markers, not.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
