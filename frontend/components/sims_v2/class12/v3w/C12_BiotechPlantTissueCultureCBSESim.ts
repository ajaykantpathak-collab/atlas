import type { SimDef } from '../../engine/types';
import C12_BiotechPlantTissueCultureCBSESim from '../../../simulations/c6_12_new/C12_BiotechPlantTissueCultureCBSESim';

/** v3 wrapped master — C12_BiotechPlantTissueCultureCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biotechplanttissueculturecbsesim: SimDef = {
    id: 'v3w_c12_biotechplanttissueculturecbsesim',
    title: 'Plant Tissue Culture CBSE',
    subtitle: 'This node covers the historical progression from Haberlandt\'s totipotency concept (1902).',
    classLevel: 12, subject: 'biotechnology', topic: 'History and Milestones of Plant Tissue Culture',
    chapters: [],
    nodeIds: ['c12_biotech_cbse_06_002', 'c12_biotech_cbse_06_003', 'c12_biotech_cbse_06_004', 'c12_biotech_cbse_06_005', 'c12_biotech_cbse_06_007', 'c12_biotech_cbse_06_008', 'c12_biotech_cbse_06_011', 'c12_biotech_cbse_07_001', 'c12_biotech_cbse_07_003', 'c12_biotech_cbse_07_005', 'c12_biotech_cbse_07_006', 'c12_biotech_cbse_07_010', 'c12_biotech_cbse_06_001', 'c12_biotech_cbse_06_006', 'c12_biotech_cbse_07_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are a plant breeder in 1900 trying to propagate a rare medicinal plant that produces seeds only.', goal: 'Master Plant Tissue Culture CBSE.' },
    discovery: {
        question: 'A student prepares MS medium but forgets to add the iron source (FeSO₄·7H₂O and Na₂EDTA).',
        options: ['Iron is immobile in plants', 'iron deficiency causes general yellowing of all leaves', 'iron is mobile so old leaves turn yellow first'],
        answer: 'Iron is immobile in plants',
        hook: 'Students often think "MS medium" is a single fixed recipe that must never be altered.',
    },
    teaching: [
        { title: 'The history and milestones of plant tissue.', text: 'The history and milestones of plant tissue culture trace the chronological development of in vitro plant cultivation from Gottlieb Haberlandt\'s 1902 concept of cellular totipotency through key.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_06_002', title: 'The history and milestones of plant.',
          scaffold: { problem: 'A Class 12 student is asked to arrange these milestones in chronological order and identify which milestone directly enabled the next: (A).',
            steps: [
            { text: 'Identify the earliest milestone — Haberlandt\'s 1902 theoretical proposal of totipotency (E) is the conceptual origin.' },
            { text: 'Find the first experimental validation — Gautheret & Nobecourt (1939) achieved sustained callus growth (D), proving.' },
            { text: 'Identify the breakthrough in developmental control — Skoog & Miller (1957) discovered auxin/cytokinin ratios direct.' },
            { text: 'Locate the somatic embryogenesis proof — Steward (1958) demonstrated bipolar embryo formation from single cells (C),.' },
            { text: 'Identify the standardization milestone — Murashige & Skoog (1962) created a reproducible medium (A) that made all prior.' },
            { text: 'Verify causal chain: E (concept) → D (callus proliferation) → B (organized regeneration control) → C (embryogenic.', faded: true, blankAnswer: 'Chronological order: E (1902) → D (1939) → B (1957) → C.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_06_003', title: 'Murashige and Skoog (MS) medium is a.',
          scaffold: { problem: 'The standard MS medium contains potassium nitrate (KNO₃) at 1900 mg/L. You have a 10× macro stock solution.',
            steps: [
            { text: 'Identify the target final concentration in 1× MS: 1900 mg/L KNO₃.' },
            { text: 'Since the stock is 10×, its concentration must be 10 times the final concentration: 1900 mg/L × 10 = 19,000 mg/L = 19.' },
            { text: 'Convert to millimolar: 19,000 mg/L ÷ 101 mg/mmol = 188.1 mM (≈ 188 mM).' },
            { text: 'For 500 mL (0.5 L) of 10× stock, mass needed = concentration (g/L) × volume (L) = 19 g/L × 0.5 L = 9.5 g.' },
            { text: 'Verify: 9.5 g in 0.5 L = 19 g/L = 19,000 mg/L. Diluting 10-fold gives 1900 mg/L — correct.', faded: true, blankAnswer: '(a) 19,000 mg/L or 188 mM; (b) 9.5 g' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_06_004', title: 'Auxins and cytokinins are the two.',
          scaffold: { problem: 'A tissue culture lab is establishing a micropropagation protocol for banana (Musa sp., monocot).',
            steps: [
            { text: 'Calculate auxin:cytokinin molar ratios for each medium. NAA MW = 186.2 g/mol, BAP MW = 225.3 g/mol.' },
            { text: 'Interpret ratios using Skoog-Miller: Medium A (high cytokinin:auxin ≈ 16.5) → strong shoot promotion, minimal callus.' },
            { text: 'Evaluate shoot quality: Medium A gives highest shoot number without callus or hyperhydricity — ideal for.' },
            { text: 'Recommend Medium A (0.1 mg/L NAA + 2 mg/L BAP) as optimal for banana shoot multiplication.' },
            { text: 'Note that rooting will require a separate medium (e.g., ½ MS + 1–2 mg/L IBA, no cytokinin) — multiplication and rooting.', faded: true, blankAnswer: 'Optimal medium = A (0.1 mg/L NAA + 2 mg/L BAP);.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_06_005', title: 'Explant selection is the process of.',
          scaffold: { problem: 'A tissue culture lab needs to prepare 2 L of 3% (v/v) sodium hypochlorite solution from commercial bleach labeled "10% w/v available.',
            steps: [
            { text: 'Identify given — Stock: 10% w/v NaOCl (10 g/100 mL = 100 g/L); Target: 3% v/v NaOCl. But careful: 3% v/v of what?' },
            { text: 'Calculate for 2 L — Volume of commercial bleach = 3% × 2000 mL = 60 mL.' },
            { text: 'Calculate final NaOCl concentration in w/v — 60 mL of 10% w/v bleach contains 60 mL × (10 g/100 mL) = 6 g NaOCl.' },
            { text: 'Calculate molarity — Moles NaOCl = 6 g / 74.44 g/mol = 0.0806 mol.' },
            { text: 'Verify — 40 mM NaOCl is within typical effective range (20–100 mM). pH adjustment to 6.5 would give ~90% as HOCl.', faded: true, blankAnswer: '60 mL commercial bleach + 1940 mL sterile distilled water;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_06_007', title: 'Cell suspension culture is a plant.',
          scaffold: { problem: 'A *Catharanthus roseus* suspension culture is inoculated at 5% PCV (5 mL settled cells in 100 mL medium). After 48 hours, PCV = 40 mL.',
            steps: [
            { text: 'Identify given: X₀ = 5 mL, Xₜ = 40 mL, t = 48 h = 2 days.' },
            { text: 'Use µ = (ln Xₜ - ln X₀) / t = (ln 40 - ln 5) / 2 = (3.6889 - 1.6094) / 2 = 2.0795 / 2 = 1.0397 day⁻¹.' },
            { text: 'Calculate td = ln 2 / µ = 0.6931 / 1.0397 = 0.6667 days = 16 hours.' },
            { text: 'Predict X at 72 h (3 days): X₇₂ = X₀ * e^(µ·t) = 5 * e^(1.0397 * 3) = 5 * e^3.1191 = 5 * 22.627 = 113.1 mL.' },
            { text: 'Interpret: 113 mL PCV in 100 mL medium is impossible (max ~50-60% packing) → culture will enter stationary phase before.', faded: true, blankAnswer: '(a) µ = 1.04 day⁻¹, (b) td = 16 h, (c) Predicted PCV = 113.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_06_008', title: 'Organogenesis in plant tissue culture.',
          scaffold: { problem: 'A protocol for shoot induction in *Solanum melongena* (brinjal) uses MS medium with 2 mg/L BAP (MW 225.25 g/mol) and 0.1 mg/L NAA (MW.',
            steps: [
            { text: 'Convert BAP from mg/L to μM: (2 mg/L) / (225.25 g/mol) × 1000 = 8.88 μM BAP.' },
            { text: 'Convert NAA from mg/L to μM: (0.1 mg/L) / (186.21 g/mol) × 1000 = 0.54 μM NAA.' },
            { text: 'Calculate molar ratio: [BAP] / [NAA] = 8.88 / 0.54 ≈ 16.4 : 1 (cytokinin:auxin).' },
            { text: 'Interpret using Skoog-Miller principle: Ratio > 10:1 strongly favors shoot organogenesis.' },
            { text: 'Verify with literature: Standard brinjal shoot induction uses 2 mg/L BAP + 0.1 mg/L NAA — prediction matches.', faded: true, blankAnswer: '[BAP] = 8.88 μM, [NAA] = 0.54 μM, Ratio = 16.4:1 → Shoot.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_06_003', title: 'Identify each idea',
          dissect: { specimen: 'Plant Tissue Culture CBSE', spots: [
            { id: 's1', label: 'The history and milestones of', prompt: 'Which idea is this? — The history and milestones of plant tissue culture trace the chronological development of.', answer: 'The history and milestones of', options: ['The history and milestones of', 'Murashige and Skoog MS medium', 'Auxins and cytokinins are the', 'Explant selection is the process'] },
            { id: 's2', label: 'Murashige and Skoog MS medium', prompt: 'Which idea is this? — Murashige and Skoog (MS) medium is a chemically defined, widely used plant tissue culture.', answer: 'Murashige and Skoog MS medium', options: ['Murashige and Skoog MS medium', 'The history and milestones of', 'Auxins and cytokinins are the', 'Explant selection is the process'] },
            { id: 's3', label: 'Auxins and cytokinins are the', prompt: 'Which idea is this? — Auxins and cytokinins are the two primary classes of plant growth regulators used in.', answer: 'Auxins and cytokinins are the', options: ['Auxins and cytokinins are the', 'The history and milestones of', 'Murashige and Skoog MS medium', 'Explant selection is the process'] },
            { id: 's4', label: 'Explant selection is the process', prompt: 'Which idea is this? — Explant selection is the process of choosing a specific plant part (meristem, leaf disc,.', answer: 'Explant selection is the process', options: ['Explant selection is the process', 'The history and milestones of', 'Murashige and Skoog MS medium', 'Auxins and cytokinins are the'] },
            { id: 's5', label: 'Cell suspension culture is a', prompt: 'Which idea is this? — Cell suspension culture is a plant tissue culture system where friable callus tissue is.', answer: 'Cell suspension culture is a', options: ['Cell suspension culture is a', 'The history and milestones of', 'Murashige and Skoog MS medium', 'Auxins and cytokinins are the'] },
            { id: 's6', label: 'Organogenesis in plant tissue culture', prompt: 'Which idea is this? — Organogenesis in plant tissue culture is the process by which organized structures.', answer: 'Organogenesis in plant tissue culture', options: ['Organogenesis in plant tissue culture', 'The history and milestones of', 'Murashige and Skoog MS medium', 'Auxins and cytokinins are the'] }
          ] } }
    ],
    explore: { component: C12_BiotechPlantTissueCultureCBSESim, prompt: 'Explore the interactive — Plant Tissue Culture CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_002', difficulty: 'standard',
          question: 'The history and milestones of plant tissue culture trace the chronological.',
          hint: 'If stuck, revisit c12_biotech_cbse_06_001 (Cell Totipotency) and focus on the distinction.',
          misconception: 'Students memorize milestone names and years as isolated facts (e.g., "Haberlandt 1902, MS medium 1962") without.',
          parts: [
                { id: 'a', prompt: 'Compare the scientific contributions of Murashige & Skoog (1962) versus Steward et al. (1958). Which milestone had broader impact on the field and why?', answer: 'Steward (1958) demonstrated somatic embryogenesis in carrot, proving totipotency',
                  options: ['Steward (1958) demonstrated somatic embryogenesis in carrot, proving totipotency', 'Steward was more important'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students memorize milestone names and years as isolated facts (e.g., "Haberlandt 1902, MS medium 1962") without understanding the causal.' }
          ],
            remediations: { 'students-memorize-milestone-names-and': { steps: ['If the student cannot sequence milestones causally: (1) Have them draw a flowchart with arrows showing "enabled".', '(2) Assign a 200-word paragraph explaining why 1957 (Skoog & Miller) had to precede 1962 (MS medium) for the latter to.', '(3) Re-diagnose with DIAGNOSTIC_QUESTION_4 to verify they now grasp the dependency chain.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students memorize milestone names and years as isolated facts (e.g., "Haberlandt 1902, MS medium 1962") without.',
          parts: [
                { id: 'a', prompt: 'Compare the scientific contributions of Murashige & Skoog (1962) versus Steward et al. (1958). Which milestone had broader impact on the field and why?', answer: 'Steward (1958) demonstrated somatic embryogenesis in carrot, proving totipotency',
                  options: ['Steward (1958) demonstrated somatic embryogenesis in carrot, proving totipotency', 'Steward was more important'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students memorize milestone names and years as isolated facts (e.g., "Haberlandt 1902, MS medium 1962") without understanding the causal.' }
          ],
            remediations: { 'students-memorize-milestone-names-and': { steps: ['If the student cannot sequence milestones causally: (1) Have them draw a flowchart with arrows showing "enabled".', '(2) Assign a 200-word paragraph explaining why 1957 (Skoog & Miller) had to precede 1962 (MS medium) for the latter to.', '(3) Re-diagnose with DIAGNOSTIC_QUESTION_4 to verify they now grasp the dependency chain.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_003', difficulty: 'standard',
          question: 'Murashige and Skoog (MS) medium is a chemically defined, widely used plant.',
          hint: 'If stuck on concentration calculations, revisit Class 11 Chemistry node.',
          misconception: 'Students often think "MS medium" is a single fixed recipe that must never be altered.',
          parts: [
                { id: 'a', prompt: 'A student prepares MS medium but forgets to add the iron source (FeSO₄·7H₂O and Na₂EDTA).', answer: 'Iron is immobile in plants',
                  options: ['Iron is immobile in plants', 'iron deficiency causes general yellowing of all leaves', 'iron is mobile so old leaves turn yellow first'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "MS medium" is a single fixed recipe that must never be altered.' },
                { id: 'b', prompt: 'Compare the nitrogen source in MS medium (NH₄NO₃ + KNO₃) with that in a typical microbial medium like LB broth (tryptone/yeast extract).', answer: 'MS uses defined inorganic salts (NH₄⁺ and NO₃⁻)',
                  options: ['MS uses defined inorganic salts (NH₄⁺ and NO₃⁻)', 'plants cannot use organic nitrogen', 'MS medium'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "MS medium" is a single fixed recipe that must never be altered.' }
          ],
            remediations: { 'ms-medium-is-a-single': { steps: ['Revisit the distinction between **basal medium** (macros, micros, vitamins, carbon, gelling agent) and **supplements**.', 'Review the standard MS macro/micro/vitamin tables (NCERT Appendix or standard protocol sheets) and create a one-page.', 'Practice 3–4 dilution calculations: given a stock concentration and desired final concentration, compute the volume of.', 'Re-diagnostic: Ask the student to write the full composition of "MS basal medium" and then "MS medium for shoot.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "MS medium" is a single fixed recipe that must never be altered.',
          parts: [
                { id: 'a', prompt: 'A protocol for somatic embryogenesis in carrot calls for "MS medium with 2,4-D at 2 mg/L and kinetin at 0.5 mg/L." The lab has 1 mg/mL stock solutions of both.', answer: '1 mL of 1 mg/mL stock in 1 L gives 1 mg/L, not 2 mg/L',
                  options: ['1 mL of 1 mg/mL stock in 1 L gives 1 mg/L, not 2 mg/L', '1 mL each is correct', 'MS medium', '"MS medium" is a single fixed recipe that must never be altered'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "MS medium" is a single fixed recipe that must never be altered.' },
                { id: 'b', prompt: 'Compare the nitrogen source in MS medium (NH₄NO₃ + KNO₃) with that in a typical microbial medium like LB broth (tryptone/yeast extract).', answer: 'MS uses defined inorganic salts (NH₄⁺ and NO₃⁻)',
                  options: ['MS uses defined inorganic salts (NH₄⁺ and NO₃⁻)', 'plants cannot use organic nitrogen', 'MS medium', '"MS medium" is a single fixed recipe that must never be altered'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "MS medium" is a single fixed recipe that must never be altered.' }
          ],
            remediations: { 'ms-medium-is-a-single': { steps: ['Revisit the distinction between **basal medium** (macros, micros, vitamins, carbon, gelling agent) and **supplements**.', 'Review the standard MS macro/micro/vitamin tables (NCERT Appendix or standard protocol sheets) and create a one-page.', 'Practice 3–4 dilution calculations: given a stock concentration and desired final concentration, compute the volume of.', 'Re-diagnostic: Ask the student to write the full composition of "MS basal medium" and then "MS medium for shoot.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_004', difficulty: 'standard',
          question: 'Auxins and cytokinins are the two primary classes of plant growth regulators.',
          hint: 'If stuck, review c11_bio_cbse_13_003 and c11_bio_cbse_13_004 — specifically the tables.',
          misconception: 'Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that (a) the ratio.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Auxins promote shoot formation and cytokinins promote root formation in tissue culture." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'explain the role', 'auxin = root hormone, cytokinin = shoot hormone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that (a) the ratio matters more than.' },
                { id: 'b', prompt: 'An explant of carrot root is cultured on MS medium supplemented with 2 mg/L 2,4-D and 0.2 mg/L kinetin. After 3 weeks, a white, friable callus forms.', answer: 'Shoot organogenesis (adventitious shoot formation) will occur',
                  options: ['Shoot organogenesis (adventitious shoot formation) will occur', 'auxin = root hormone, cytokinin = shoot hormone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that (a) the ratio matters more than.' },
                { id: 'c', prompt: 'A researcher wants to induce direct somatic embryogenesis from citrus nucellar callus.', answer: 'Stage 1 (induction): MS + 2 mg/L 2,4-D + 0.5 mg/L BAP for 4 weeks',
                  options: ['Stage 1 (induction): MS + 2 mg/L 2,4-D + 0.5 mg/L BAP for 4 weeks', 'auxin = root hormone, cytokinin = shoot hormone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that (a) the ratio matters more than.' }
          ],
            remediations: { 'auxin-root-hormone': { steps: ['If the student cannot predict morphogenic outcomes from hormone ratios: (1) Revisit c11_bio_cbse_13_003 (Auxins) and.', '(2) Draw a 2×2 grid: x-axis = auxin concentration (low→high), y-axis = cytokinin concentration (low→high); label the.', '(3) Re-attempt Diagnostic Questions 2 and 3; if still incorrect, watch the NCERT lab manual video "Organogenesis in.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that (a) the ratio.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "For any given plant species, there exists a single universal auxin:cytokinin ratio that produces optimal shoot regeneration across all.', answer: 'The claim is false',
                  options: ['The claim is false', 'auxin = root hormone, cytokinin = shoot hormone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that (a) the ratio matters more than.' },
                { id: 'b', prompt: 'Create a novel 3-step micropropagation protocol for a hypothetical endangered medicinal plant (assume it is a dicot shrub) using only auxin and cytokinin.', answer: 'Step 1 (shoot initiation): MS + 0.1 mg/L NAA + 2 mg/L BAP',
                  options: ['Step 1 (shoot initiation): MS + 0.1 mg/L NAA + 2 mg/L BAP', 'auxin = root hormone, cytokinin = shoot hormone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that (a) the ratio matters more than.' }
          ],
            remediations: { 'auxin-root-hormone': { steps: ['If the student cannot predict morphogenic outcomes from hormone ratios: (1) Revisit c11_bio_cbse_13_003 (Auxins) and.', '(2) Draw a 2×2 grid: x-axis = auxin concentration (low→high), y-axis = cytokinin concentration (low→high); label the.', '(3) Re-attempt Diagnostic Questions 2 and 3; if still incorrect, watch the NCERT lab manual video "Organogenesis in.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_005', difficulty: 'standard',
          question: 'Explant selection is the process of choosing a specific plant part (meristem,.',
          hint: 'If stuck, revisit c12_biotech_cbse_06_001 (totipotency basis) and c11_biotech_cbse_12_011.',
          misconception: 'Students believe "stronger sterilization = cleaner culture" and write protocols like "5% NaOCl for 30 min" for all.',
          parts: [
                { id: 'a', prompt: 'A REMEMBER level question: List the four most common chemical disinfectants used for plant explant surface sterilization and state the typical concentration.', answer: '(1) Sodium hypochlorite (NaOCl)',
                  options: ['Correct answer: (1) Sodium hypochlorite (NaOCl)', '5% NaOCl for 30 min', 'stronger sterilization = cleaner culture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "stronger sterilization = cleaner culture" and write protocols like "5% NaOCl for 30 min" for all explants.' },
                { id: 'b', prompt: 'An UNDERSTAND level question: Explain why meristem-tip culture (0.1–0.5 mm) is the preferred explant for virus elimination in crops like potato and banana,.', answer: 'Meristems lack vascular tissue and often have no virus particles',
                  options: ['Correct answer: Meristems lack vascular tissue and often have no virus particles', 'meristems are more totipotent', 'leaf discs are too differentiated'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "stronger sterilization = cleaner culture" and write protocols like "5% NaOCl for 30 min" for all explants.' },
                { id: 'c', prompt: 'An APPLY level question: You have 500 mL of commercial bleach containing 10% (w/v) available chlorine.', answer: 'Calculation: C₁V₁ = C₂V₂ → (10%) × V₁ = (2.5%) × 1000 mL → V₁ = 250 mL bleach',
                  options: ['Calculation: C₁V₁ = C₂V₂ → (10%) × V₁ = (2.5%) × 1000 mL → V₁ = 250 mL bleach', 'stronger sterilization = cleaner culture', '5% NaOCl for 30 min'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "stronger sterilization = cleaner culture" and write protocols like "5% NaOCl for 30 min" for all explants.' }
          ],
            remediations: { 'stronger-sterilization-cleaner-culture-and': { steps: ['If the student exhibits the "stronger is better" misconception: Step 1 — Show them a photo series of the same explant.', 'Step 2 — Have them calculate the C×t product for each and plot % survival vs.', 'C×t to visualize the peaked response.', 'Step 3 — Assign a re-diagnostic: "Design a 2% NaOCl, 10 min protocol for tomato leaf discs; predict outcome if changed.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_007', difficulty: 'standard',
          question: 'Cell suspension culture is a plant tissue culture system where friable callus.',
          hint: 'If unable to distinguish friable callus, revisit c12_biotech_cbse_06_006 and practice.',
          misconception: '**Misconception:** "Suspension culture grows faster than callus because liquid medium has better nutrient diffusion.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cell suspension culture is a plant tissue culture system where friable callus tissue is',
                  options: ['Cell suspension culture is a plant tissue culture system where friable callus tissue is', 'The history and milestones of plant tissue culture trace the chronological development of', 'Murashige and Skoog (MS) medium is a chemically defined, widely used plant tissue culture', 'Auxins and cytokinins are the two primary classes of plant growth regulators used in'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Suspension culture grows faster than callus because liquid medium has better nutrient diffusion." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-suspension-culture-grows-faster': { steps: ['If a student cannot explain why agitation is needed beyond "mixing," make them: 1.', 'Revisit **c12_biotech_cbse_06_006 (Callus Culture)** — observe how friability is assessed (visual + tactile).', 'Perform a **thought experiment**: "What happens to a 5 mm callus piece in static liquid vs.', 'shaken liquid after 48 h?" Sketch both.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_008', difficulty: 'standard',
          question: 'Organogenesis in plant tissue culture is the process by which organized.',
          hint: 'Revisit c12_biotech_cbse_06_004 (PGR roles) and practice converting mg/L to μM for auxins.',
          misconception: 'Students believe "high cytokinin always gives shoots, high auxin always gives roots" as an absolute rule.',
          parts: [
                { id: 'a', prompt: 'Define organogenesis in the context of plant tissue culture and distinguish it from somatic embryogenesis based on the origin of the regenerated structure.', answer: 'Organogenesis is the de novo formation of organs (shoots/roots) directly from',
                  options: ['Organogenesis is the de novo formation of organs (shoots/roots) directly from', 'both form whole plants so they are the same', 'high cytokinin always gives shoots, high auxin always gives roots'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "high cytokinin always gives shoots, high auxin always gives roots" as an absolute rule.' },
                { id: 'b', prompt: 'A student prepares MS medium with 2 mg/L NAA (auxin) and 0.5 mg/L BAP (cytokinin) for shoot induction from tobacco leaf callus.', answer: 'The auxin:cytokinin ratio is 4:1 (high auxin)',
                  options: ['The auxin:cytokinin ratio is 4:1 (high auxin)', 'NAA is needed for shoots', 'auxin for roots, cytokinin for shoots'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "high cytokinin always gives shoots, high auxin always gives roots" as an absolute rule.' },
                { id: 'c', prompt: 'Compare and contrast *direct organogenesis* and *indirect organogenesis* in terms of: (a) genetic fidelity of regenerants, (b) time to plantlet formation, (c).', answer: 'genetic fidelity of regenerants, (',
                  options: ['genetic fidelity of regenerants, (', 'indirect is better for transformation', 'high cytokinin always gives shoots, high auxin always gives roots'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "high cytokinin always gives shoots, high auxin always gives roots" as an absolute rule.' }
          ],
            remediations: { 'high-cytokinin-always-gives-shoots': { steps: ['If a student cannot predict morphogenic outcome from hormone ratios: Step 1 — Revisit c12_biotech_cbse_06_004 (PGR.', 'Step 3 — Analyze a published protocol (e.g., tobacco leaf disc organogenesis) and identify the exact ratio used at each.', 'Step 4 — Re-attempt Diagnostic Questions 2 and 3.', 'If still stuck, the gap is usually *quantitative reasoning with ratios* — review Class 10 math (ratios/proportions) in.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "high cytokinin always gives shoots, high auxin always gives roots" as an absolute rule.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "For commercial micropropagation, indirect organogenesis via callus is preferred over direct organogenesis because it produces higher.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'high cytokinin always gives shoots, high auxin always gives roots'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "high cytokinin always gives shoots, high auxin always gives roots" as an absolute rule.' }
          ],
            remediations: { 'high-cytokinin-always-gives-shoots': { steps: ['If a student cannot predict morphogenic outcome from hormone ratios: Step 1 — Revisit c12_biotech_cbse_06_004 (PGR.', 'Step 3 — Analyze a published protocol (e.g., tobacco leaf disc organogenesis) and identify the exact ratio used at each.', 'Step 4 — Re-attempt Diagnostic Questions 2 and 3.', 'If still stuck, the gap is usually *quantitative reasoning with ratios* — review Class 10 math (ratios/proportions) in.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
