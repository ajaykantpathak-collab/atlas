import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch06_p1: SimDef = {
    id: 'v3_c12_biotech_ch06_p1',
    title: 'Plant Tissue Culture · Part 1/2',
    subtitle: 'One carrot cell holds the blueprint for a whole carrot — Haberlandt called it in 1902.',
    classLevel: 12, subject: 'biotechnology', topic: 'Plant Tissue Culture · Part 1/2',
    chapters: ['c12_biotech_ch06'],
    nodeIds: ['c12_biotech_cbse_06_001', 'c12_biotech_cbse_06_002', 'c12_biotech_cbse_06_003', 'c12_biotech_cbse_06_004', 'c12_biotech_cbse_06_005', 'c12_biotech_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Plant biotechnologist', intro: 'A root cell \'remembering\' how to build leaves is not magic — it\'s the entire basis of plant tissue culture.', goal: 'Define totipotency and outline the history and biological basis of plant tissue culture.' },
    discovery: {
        question: 'A single differentiated carrot root cell — orange, non-dividing — is placed on nutrient gel and regenerates an entire carrot plant. What property made this possible?',
        options: ['Totipotency — the cell retains the complete genetic programme and can dedifferentiate, divide and rebuild the whole plant', 'Mutation — the gel induced new genes that built the missing organs', 'Photosynthesis — light energy reorganised the cell\'s DNA', 'Fertilisation — a hidden gamete in the root completed the development'],
        answer: 'Totipotency — the cell retains the complete genetic programme and can dedifferentiate, divide and rebuild the whole plant',
        hook: 'Differentiation silences genes — it doesn\'t delete them. Haberlandt\'s 1902 insight still startles students: every somatic cell carries the full blueprint; tissue culture just gives it permission to restart.',
    },
    teaching: [
        { title: 'Cell Totipotency: Concept and Biological Basis', text: 'Cell totipotency is the inherent genetic potential of a single plant cell to dedifferentiate, divide, and regenerate into a complete, fertile plant under appropriate in vitro culture conditions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_06_001', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Prove totipotency yourself: take an explant from a differentiated tissue, drive it through callus to shoot and root regeneration, and trace the milestones from Haberlandt\'s concept to modern media.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_06_001', title: 'Cell Totipotency: Concept and Biological Basis',
          caseStudy: { intro: 'Imagine you take a tiny piece of carrot root (a fully differentiated, orange, non-dividing cell) and place it on a nutrient gel with the right hormones.',
            decisions: [{ prompt: 'Define cell totipotency as stated by Gottlieb Haberlandt in 1902. How does the NCERT textbook phrase this concept?', options: [
                { text: 'Correct answer: "Theoretically all plant cells are able to give rise to a complete plant."', outcome: 'Correct answer: "Theoretically all plant cells are able to give rise to a complete plant." A wrong.' },
                { text: 'Theoretically all plant cells are able to give rise to a complete plant', outcome: 'Not quite — Students believe "totipotency means any plant cell can *always* become a whole plant." They ignore.', reveals: 'totipotency-means-any-plant-cell' },
                { text: 'only meristematic cells can form a whole plant', outcome: 'Not quite — Students believe "totipotency means any plant cell can *always* become a whole plant." They ignore.', reveals: 'totipotency-means-any-plant-cell' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_06_002', title: 'History and Milestones of Plant Tissue Culture',
          caseStudy: { intro: 'Imagine you are a plant breeder in 1900 trying to propagate a rare medicinal plant that produces seeds only once every 10 years.',
            decisions: [{ prompt: 'Who first proposed the concept of cellular totipotency in plants, and in what year was this idea presented?', options: [
                { text: 'Gottlieb Haberlandt proposed the concept of cellular totipotency in 1902', outcome: 'Gottlieb Haberlandt proposed the concept of cellular totipotency in 1902.' },
                { text: 'Skoog, Murashige, or Steward', outcome: 'Not quite — Students memorize milestone names and years as isolated facts (e.g., "Haberlandt 1902, MS medium.', reveals: 'students-memorize-milestone-names-and' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_06_003', title: 'Nutrient Media Composition: Murashige and Skoog Medium',
          scaffold: { problem: 'The standard MS medium contains potassium nitrate (KNO₃) at 1900 mg/L. You have a 10× macro stock solution.',
            steps: [
            { text: 'Identify the target final concentration in 1× MS: 1900 mg/L KNO₃.' },
            { text: 'Since the stock is 10×, its concentration must be 10 times the final concentration: 1900 mg/L × 10 = 19,000 mg/L = 19.' },
            { text: 'Convert to millimolar: 19,000 mg/L ÷ 101 mg/mmol = 188.1 mM (≈ 188 mM).' },
            { text: 'For 500 mL (0.5 L) of 10× stock, mass needed = concentration (g/L) × volume (L) = 19 g/L × 0.5 L = 9.5 g.' },
            { text: 'Verify: 9.5 g in 0.5 L = 19 g/L = 19,000 mg/L. Diluting 10-fold gives 1900 mg/L — correct.', faded: true, blankAnswer: '(a) 19,000 mg/L or 188 mM; (b) 9.5 g' }
            ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_06_004', title: 'Plant Growth Regulators: Auxins and Cytokinins Roles',
          caseStudy: { intro: 'Imagine you have a small piece of tobacco leaf (explant) on MS medium — it just sits there, green but unresponsive.',
            decisions: [{ prompt: 'A student writes: "Auxins promote shoot formation and cytokinins promote root formation in tissue culture." Is this statement correct?', options: [
                { text: 'The statement is incorrect', outcome: 'The statement is incorrect — it reverses the primary roles: auxins (especially at higher.' },
                { text: 'explain the role', outcome: 'Not quite — Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that.', reveals: 'auxin-root-hormone' },
                { text: 'auxin = root hormone, cytokinin = shoot hormone', outcome: 'Not quite — Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that.', reveals: 'auxin-root-hormone' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_06_005', title: 'Explant Selection and Surface Sterilization Techniques',
          caseStudy: { intro: 'Imagine you want to clone a prized disease-free banana plant for a farmer in Maharashtra — you cannot just cut a leaf and put it on gel; fungi and bacteria.',
            decisions: [{ prompt: 'A REMEMBER level question: List the four most common chemical disinfectants used for plant explant surface sterilization and state the.', options: [
                { text: 'Correct answer: (1) Sodium hypochlorite (NaOCl)', outcome: 'Correct answer: (1) Sodium hypochlorite (NaOCl) — 1–4% available chlorine (typically 2–3% for 10–20.' },
                { text: '5% NaOCl for 30 min', outcome: 'Not quite — Students believe "stronger sterilization = cleaner culture" and write protocols like "5% NaOCl for.', reveals: 'stronger-sterilization-cleaner-culture-and' },
                { text: 'stronger sterilization = cleaner culture', outcome: 'Not quite — Students believe "stronger sterilization = cleaner culture" and write protocols like "5% NaOCl for.', reveals: 'stronger-sterilization-cleaner-culture-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_06_006', title: 'Callus Culture: Induction and Maintenance',
          caseStudy: { intro: 'Imagine you have a small piece of carrot root (explant) and you want to grow an undifferentiated callus mass that can later be used to regenerate a whole plant.',
            decisions: [{ prompt: 'Define "callus" in the context of plant tissue culture and state the primary hormonal requirement for its induction from a mature.', options: [
                { text: 'Callus is an unorganized, proliferating mass of undifferentiated parenchyma cells formed', outcome: 'Callus is an unorganized, proliferating mass of undifferentiated parenchyma cells formed in vitro.' },
                { text: 'callus is organized tissue', outcome: 'Not quite — **Misconception:** "Callus is just a mass of undifferentiated cells, so any auxin will work and the.', reveals: 'misconception-callus-is-just-a' },
                { text: 'cytokinin alone induces callus', outcome: 'Not quite — **Misconception:** "Callus is just a mass of undifferentiated cells, so any auxin will work and the.', reveals: 'misconception-callus-is-just-a' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'Plant Tissue Culture · Part 1/2', spots: [
            { id: 's1', label: 'Cell Totipotency Concept and Biological Basis', prompt: 'Which idea is this? — Cell totipotency is the inherent genetic potential of a single plant cell.', answer: 'Cell Totipotency Concept and Biological Basis', options: ['Cell Totipotency Concept and Biological Basis', 'History and Milestones of Plant Tissue Culture', 'Nutrient Media Composition Murashige and Skoog Medium', 'Plant Growth Regulators Auxins and Cytokinins Roles'] },
            { id: 's2', label: 'History and Milestones of Plant Tissue Culture', prompt: 'Which idea is this? — The history and milestones of plant tissue culture trace the chronological development.', answer: 'History and Milestones of Plant Tissue Culture', options: ['History and Milestones of Plant Tissue Culture', 'Cell Totipotency Concept and Biological Basis', 'Nutrient Media Composition Murashige and Skoog Medium', 'Plant Growth Regulators Auxins and Cytokinins Roles'] },
            { id: 's3', label: 'Nutrient Media Composition Murashige and Skoog Medium', prompt: 'Which idea is this? — Murashige and Skoog (MS) medium is a chemically defined, widely used plant tissue culture.', answer: 'Nutrient Media Composition Murashige and Skoog Medium', options: ['Nutrient Media Composition Murashige and Skoog Medium', 'Cell Totipotency Concept and Biological Basis', 'History and Milestones of Plant Tissue Culture', 'Plant Growth Regulators Auxins and Cytokinins Roles'] },
            { id: 's4', label: 'Plant Growth Regulators Auxins and Cytokinins Roles', prompt: 'Which idea is this? — Auxins and cytokinins are the two primary classes of plant growth regulators used.', answer: 'Plant Growth Regulators Auxins and Cytokinins Roles', options: ['Plant Growth Regulators Auxins and Cytokinins Roles', 'Cell Totipotency Concept and Biological Basis', 'History and Milestones of Plant Tissue Culture', 'Nutrient Media Composition Murashige and Skoog Medium'] },
            { id: 's5', label: 'Explant Selection and Surface Sterilization Techniques', prompt: 'Which idea is this? — Explant selection is the process of choosing a specific plant part (meristem, leaf disc.', answer: 'Explant Selection and Surface Sterilization Techniques', options: ['Explant Selection and Surface Sterilization Techniques', 'Cell Totipotency Concept and Biological Basis', 'History and Milestones of Plant Tissue Culture', 'Nutrient Media Composition Murashige and Skoog Medium'] },
            { id: 's6', label: 'Callus Culture Induction and Maintenance', prompt: 'Which idea is this? — Callus culture is the in vitro technique of inducing an unorganized, proliferating mass.', answer: 'Callus Culture Induction and Maintenance', options: ['Callus Culture Induction and Maintenance', 'Cell Totipotency Concept and Biological Basis', 'History and Milestones of Plant Tissue Culture', 'Nutrient Media Composition Murashige and Skoog Medium'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Interning at a tissue-culture nursery, a student is told to clone a rare orchid. \'Every plant cell is totipotent,\' he reasons, and harvests mature xylem vessel strands from the stem as his explant.',
            decisions: [{ prompt: 'Will this explant regenerate a plant?', options: [
                { text: 'No — totipotency needs a living, nucleated cell that can dedifferentiate and re-enter the cell cycle; mature xylem vessels are dead, enucleate and lignified. Use living parenchyma or mesophyll tissue.', outcome: 'Haberlandt\'s \'theoretically all cells\' has limits: cell viability, genotype and epigenetic state decide whether the potential can actually be expressed.' },
                { text: 'Yes — totipotency means any plant cell can always regenerate a whole plant, so xylem works.', outcome: 'Steward\'s carrot proof used living phloem cells; dead, nucleus-free cells have nothing left to reprogram.', reveals: 'all-cells-always-totipotent' },
                { text: 'No — but only because xylem lacks chloroplasts; a cell with chlorophyll can always regenerate.', outcome: 'Chloroplasts aren\'t the criterion — a living nucleus and competent cytoplasm are; plenty of non-photosynthetic tissues regenerate fine.', reveals: 'chlorophyll-drives-totipotency' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now understand why one cell can become a whole plant — the founding idea of plant biotech. Totipotency is a short-answer certainty on boards and the working principle of the entire propagation industry.',
            decisions: [{ prompt: 'What comes next? Plant Tissue Culture · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Plant Tissue Culture · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_001', difficulty: 'standard',
          question: 'Cell totipotency is the inherent genetic potential of a single plant cell.',
          hint: 'If stuck, revisit c11_biotech_cbse_02_009 (nucleus/chromatin) and c11_bio_cbse_13_003/004.',
          misconception: 'Students believe "totipotency means any plant cell can *always* become a whole plant." They ignore three critical.',
          parts: [
                { id: 'a', prompt: 'A researcher isolates single cells from the pith of a mature tobacco plant and cultures them on MS medium with 2,4-D (auxin) and kinetin (cytokinin).', answer: 'Correct answer: (1) Dedifferentiation',
                  options: ['Correct answer: (1) Dedifferentiation', 'mitosis causes callus', 'auxin alone causes shoots', 'totipotency means any plant cell can *always* become a whole plant'],
                  hint: 'If stuck, revisit c11_biotech_cbse_02_009 (nucleus/chromatin) and c11_bio_cbse_13_003/004.',
                  misconception: 'Students believe "totipotency means any plant cell can *always* become a whole plant." They ignore three critical constraints: (1).' },
                { id: 'b', prompt: 'Compare the genetic basis of totipotency in plants vs. animals.', answer: 'Correct analysis: (a) Both have identical nuclear DNA in somatic cells (genetic',
                  options: ['Correct analysis: (a) Both have identical nuclear DNA in somatic cells (genetic', 'totipotency means any plant cell can *always* become a whole plant', '"totipotency means any plant cell can *always* become a whole plant'],
                  hint: 'If stuck, revisit c11_biotech_cbse_02_009 (nucleus/chromatin) and c11_bio_cbse_13_003/004.',
                  misconception: 'Students believe "totipotency means any plant cell can *always* become a whole plant." They ignore three critical constraints: (1).' }
          ],
            remediations: { 'totipotency-means-any-plant-cell': { steps: ['If the student holds the above misconception: Step 1 — Show a micrograph of mature xylem (dead, lignified, no nucleus).', 'Step 3 — Assign a mini-literature search: "Find one crop where somatic embryogenesis fails despite optimized PGRs.".', 'This forces confrontation with the difference between *theoretical potential* and *practical realizability*.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "totipotency means any plant cell can *always* become a whole plant." They ignore three critical.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Haberlandt\'s totipotency concept was proven by Steward\'s carrot experiment (1958), so we now know *every* plant cell is totipotent.".', answer: 'Correct evaluation: The statement is *partially incorrect*',
                  options: ['Correct evaluation: The statement is *partially incorrect*', 'yes, it\'s proven', 'totipotency means any plant cell can *always* become a whole plant', '"totipotency means any plant cell can *always* become a whole plant'],
                  hint: 'If stuck, revisit c11_biotech_cbse_02_009 (nucleus/chromatin) and c11_bio_cbse_13_003/004.',
                  misconception: 'Students believe "totipotency means any plant cell can *always* become a whole plant." They ignore three critical constraints: (1).' },
                { id: 'b', prompt: 'Design a thought experiment: You have a variegated plant (green and white sectors). You culture single cells from the white (chloroplast-deficient) sector.', answer: 'Expected answer: The regenerated plant will be *all-white* (non-variegated)',
                  options: ['Expected answer: The regenerated plant will be *all-white* (non-variegated)', 'it will be variegated', 'totipotency means any plant cell can *always* become a whole plant', '"totipotency means any plant cell can *always* become a whole plant'],
                  hint: 'If stuck, revisit c11_biotech_cbse_02_009 (nucleus/chromatin) and c11_bio_cbse_13_003/004.',
                  misconception: 'Students believe "totipotency means any plant cell can *always* become a whole plant." They ignore three critical constraints: (1).' }
          ],
            remediations: { 'totipotency-means-any-plant-cell': { steps: ['If the student holds the above misconception: Step 1 — Show a micrograph of mature xylem (dead, lignified, no nucleus).', 'Step 3 — Assign a mini-literature search: "Find one crop where somatic embryogenesis fails despite optimized PGRs.".', 'This forces confrontation with the difference between *theoretical potential* and *practical realizability*.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_002', difficulty: 'standard',
          question: 'The history and milestones of plant tissue culture trace the chronological.',
          hint: 'If stuck, revisit c12_biotech_cbse_06_001 (Cell Totipotency) and focus on the distinction.',
          misconception: 'Students memorize milestone names and years as isolated facts (e.g., "Haberlandt 1902, MS medium 1962") without.',
          parts: [
                { id: 'a', prompt: 'Who first proposed the concept of cellular totipotency in plants, and in what year was this idea presented?', answer: 'Gottlieb Haberlandt proposed the concept of cellular totipotency in 1902',
                  options: ['Gottlieb Haberlandt proposed the concept of cellular totipotency in 1902', 'Skoog, Murashige, or Steward'],
                  hint: 'If stuck, revisit c12_biotech_cbse_06_001 (Cell Totipotency) and focus on the distinction between.',
                  misconception: 'Students memorize milestone names and years as isolated facts (e.g., "Haberlandt 1902, MS medium 1962") without understanding the causal.' },
                { id: 'b', prompt: 'Compare the scientific contributions of Murashige & Skoog (1962) versus Steward et al. (1958). Which milestone had broader impact on the field and why?', answer: 'Steward (1958) demonstrated somatic embryogenesis in carrot, proving totipotency',
                  options: ['Steward (1958) demonstrated somatic embryogenesis in carrot, proving totipotency', 'Steward was more important'],
                  hint: 'If stuck, revisit c12_biotech_cbse_06_001 (Cell Totipotency) and focus on the distinction between.',
                  misconception: 'Students memorize milestone names and years as isolated facts (e.g., "Haberlandt 1902, MS medium 1962") without understanding the causal.' }
          ],
            remediations: { 'students-memorize-milestone-names-and': { steps: ['If the student cannot sequence milestones causally: (1) Have them draw a flowchart with arrows showing "enabled".', '(2) Assign a 200-word paragraph explaining why 1957 (Skoog & Miller) had to precede 1962 (MS medium) for the latter.', '(3) Re-diagnose with DIAGNOSTIC_QUESTION_4 to verify they now grasp the dependency chain.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_003', difficulty: 'standard',
          question: 'Murashige and Skoog (MS) medium is a chemically defined, widely used plant.',
          hint: 'If stuck on concentration calculations, revisit Class 11 Chemistry node.',
          misconception: 'Students often think "MS medium" is a single fixed recipe that must never be altered.',
          parts: [
                { id: 'a', prompt: 'A student prepares MS medium but forgets to add the iron source (FeSO₄·7H₂O and Na₂EDTA).', answer: 'Iron is immobile in plants',
                  options: ['Iron is immobile in plants', 'iron deficiency causes general yellowing of all leaves', 'iron is mobile so old leaves turn yellow first', 'MS medium'],
                  hint: 'If stuck on concentration calculations, revisit Class 11 Chemistry node c11_chem_cbse_01_013.',
                  misconception: 'Students often think "MS medium" is a single fixed recipe that must never be altered.' },
                { id: 'b', prompt: 'Compare the nitrogen source in MS medium (NH₄NO₃ + KNO₃) with that in a typical microbial medium like LB broth (tryptone/yeast extract).', answer: 'MS uses defined inorganic salts (NH₄⁺ and NO₃⁻)',
                  options: ['MS uses defined inorganic salts (NH₄⁺ and NO₃⁻)', 'plants cannot use organic nitrogen', 'MS medium', '"MS medium" is a single fixed recipe that must never be altered'],
                  hint: 'If stuck on concentration calculations, revisit Class 11 Chemistry node c11_chem_cbse_01_013.',
                  misconception: 'Students often think "MS medium" is a single fixed recipe that must never be altered.' }
          ],
            remediations: { 'ms-medium-is-a-single': { steps: ['Revisit the distinction between **basal medium** (macros, micros, vitamins, carbon, gelling agent) and **supplements**.', 'Review the standard MS macro/micro/vitamin tables (NCERT Appendix or standard protocol sheets) and create a one-page.', 'Practice 3–4 dilution calculations: given a stock concentration and desired final concentration, compute the volume.', 'Re-diagnostic: Ask the student to write the full composition of "MS basal medium" and then "MS medium for shoot.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_004', difficulty: 'standard',
          question: 'Auxins and cytokinins are the two primary classes of plant growth regulators.',
          hint: 'If stuck, review c11_bio_cbse_13_003 and c11_bio_cbse_13_004 — specifically the tables.',
          misconception: 'Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that (a) the ratio.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Auxins promote shoot formation and cytokinins promote root formation in tissue culture." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'explain the role', 'auxin = root hormone, cytokinin = shoot hormone'],
                  hint: 'If stuck, review c11_bio_cbse_13_003 and c11_bio_cbse_13_004 — specifically the tables listing.',
                  misconception: 'Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that (a) the ratio matters more than.' },
                { id: 'b', prompt: 'An explant of carrot root is cultured on MS medium supplemented with 2 mg/L 2,4-D and 0.2 mg/L kinetin. After 3 weeks, a white, friable callus forms.', answer: 'Shoot organogenesis (adventitious shoot formation) will occur',
                  options: ['Shoot organogenesis (adventitious shoot formation) will occur', 'auxin = root hormone, cytokinin = shoot hormone'],
                  hint: 'If stuck, review c11_bio_cbse_13_003 and c11_bio_cbse_13_004 — specifically the tables listing.',
                  misconception: 'Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that (a) the ratio matters more than.' },
                { id: 'c', prompt: 'A researcher wants to induce direct somatic embryogenesis from citrus nucellar callus.', answer: 'Stage 1 (induction): MS + 2 mg/L 2,4-D + 0.5 mg/L BAP for 4 weeks',
                  options: ['Stage 1 (induction): MS + 2 mg/L 2,4-D + 0.5 mg/L BAP for 4 weeks', 'auxin = root hormone, cytokinin = shoot hormone'],
                  hint: 'If stuck, review c11_bio_cbse_13_003 and c11_bio_cbse_13_004 — specifically the tables listing.',
                  misconception: 'Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that (a) the ratio matters more than.' }
          ],
            remediations: { 'auxin-root-hormone': { steps: ['If the student cannot predict morphogenic outcomes from hormone ratios: (1) Revisit c11_bio_cbse_13_003 (Auxins) and.', '(2) Draw a 2×2 grid: x-axis = auxin concentration (low→high), y-axis = cytokinin concentration (low→high); label the.', '(3) Re-attempt Diagnostic Questions 2 and 3; if still incorrect, watch the NCERT lab manual video "Organogenesis.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_005', difficulty: 'standard',
          question: 'Explant selection is the process of choosing a specific plant part (meristem.',
          hint: 'If stuck, revisit c12_biotech_cbse_06_001 (totipotency basis) and c11_biotech_cbse_12_011.',
          misconception: 'Students believe "stronger sterilization = cleaner culture" and write protocols like "5% NaOCl for 30 min" for all.',
          parts: [
                { id: 'a', prompt: 'A REMEMBER level question: List the four most common chemical disinfectants used for plant explant surface sterilization and state the typical concentration.', answer: 'Correct answer: (1) Sodium hypochlorite (NaOCl)',
                  options: ['Correct answer: (1) Sodium hypochlorite (NaOCl)', '5% NaOCl for 30 min', 'stronger sterilization = cleaner culture'],
                  hint: 'If stuck, revisit c12_biotech_cbse_06_001 (totipotency basis) and c11_biotech_cbse_12_011 (aseptic.',
                  misconception: 'Students believe "stronger sterilization = cleaner culture" and write protocols like "5% NaOCl for 30 min" for all explants.' },
                { id: 'b', prompt: 'An UNDERSTAND level question: Explain why meristem-tip culture (0.1–0.5 mm) is the preferred explant for virus elimination in crops like potato and banana.', answer: 'Correct answer: Meristems lack vascular tissue and often have no virus particles',
                  options: ['Correct answer: Meristems lack vascular tissue and often have no virus particles', 'meristems are more totipotent', 'leaf discs are too differentiated', 'stronger sterilization = cleaner culture'],
                  hint: 'If stuck, revisit c12_biotech_cbse_06_001 (totipotency basis) and c11_biotech_cbse_12_011 (aseptic.',
                  misconception: 'Students believe "stronger sterilization = cleaner culture" and write protocols like "5% NaOCl for 30 min" for all explants.' },
                { id: 'c', prompt: 'An APPLY level question: You have 500 mL of commercial bleach containing 10% (w/v) available chlorine.', answer: 'Calculation: C₁V₁ = C₂V₂ → (10%) × V₁ = (2.5%) × 1000 mL → V₁ = 250 mL bleach',
                  options: ['Calculation: C₁V₁ = C₂V₂ → (10%) × V₁ = (2.5%) × 1000 mL → V₁ = 250 mL bleach', 'stronger sterilization = cleaner culture', '5% NaOCl for 30 min'],
                  hint: 'If stuck, revisit c12_biotech_cbse_06_001 (totipotency basis) and c11_biotech_cbse_12_011 (aseptic.',
                  misconception: 'Students believe "stronger sterilization = cleaner culture" and write protocols like "5% NaOCl for 30 min" for all explants.' },
                { id: 'd', prompt: 'An ANALYZE level question: Compare and contrast the contamination patterns observed when (a) sterilization time is too short vs.', answer: 'sterilization time is too short vs',
                  options: ['sterilization time is too short vs', 'high concentration kills contaminants better so it\'s fine', 'stronger sterilization = cleaner culture', '5% NaOCl for 30 min'],
                  hint: 'If stuck, revisit c12_biotech_cbse_06_001 (totipotency basis) and c11_biotech_cbse_12_011 (aseptic.',
                  misconception: 'Students believe "stronger sterilization = cleaner culture" and write protocols like "5% NaOCl for 30 min" for all explants.' }
          ],
            remediations: { 'stronger-sterilization-cleaner-culture-and': { steps: ['If the student exhibits the "stronger is better" misconception: Step 1 — Show them a photo series of the same explant.', 'Step 2 — Have them calculate the C×t product for each and plot % survival vs.', 'C×t to visualize the peaked response.', 'Step 3 — Assign a re-diagnostic: "Design a 2% NaOCl, 10 min protocol for tomato leaf discs; predict outcome if changed.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_006', difficulty: 'standard',
          question: 'Callus culture is the in vitro technique of inducing an unorganized.',
          hint: 'If stuck on PGR selection, revisit the Skoog-Miller ratio concept.',
          misconception: '**Misconception:** "Callus is just a mass of undifferentiated cells, so any auxin will work and the exact.',
          parts: [
                { id: 'a', prompt: 'You are tasked with establishing a callus culture from mature nodal segments of *Azadirachta indica* (neem), a woody tree known for high phenolic content.', answer: '**Protocol:** 1',
                  options: ['**Protocol:** 1', '2,4-D, NAA, IAA, and IBA are interchangeable for callus induction'],
                  hint: 'If stuck on PGR selection, revisit the Skoog-Miller ratio concept in c12_biotech_cbse_06_004 and.',
                  misconception: '**Misconception:** "Callus is just a mass of undifferentiated cells, so any auxin will work and the exact type/concentration doesn\'t matter.' },
                { id: 'b', prompt: 'Compare and contrast "friable callus" and "compact callus" in terms of: (a) cellular structure, (b) suitability for cell suspension culture initiation, (c).', answer: '| Feature | Friable Callus | Compact Callus |',
                  options: ['| Feature | Friable Callus | Compact Callus |', '2,4-D, NAA, IAA, and IBA are interchangeable for callus induction'],
                  hint: 'If stuck on PGR selection, revisit the Skoog-Miller ratio concept in c12_biotech_cbse_06_004 and.',
                  misconception: '**Misconception:** "Callus is just a mass of undifferentiated cells, so any auxin will work and the exact type/concentration doesn\'t matter.' }
          ],
            remediations: { 'misconception-callus-is-just-a': { steps: ['**Revisit c12_biotech_cbse_06_004 (PGRs: Auxins & Cytokinins Role)** — focus on the Skoog-Miller hypothesis, the.', 'NAA/IAA (resistance to degradation, receptor binding affinity for TIR1/AFB), and the quantitative auxin:cytokinin ratio.', '**Revisit c12_biotech_cbse_06_003 (MS Medium Composition)** — understand why MS high nitrate:ammonium ratio (20:1) and.', '**Diagnostic re-test:** Give the student a new explant type (e.g., *Datura innoxia* hypocotyl) and ask them to write.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
