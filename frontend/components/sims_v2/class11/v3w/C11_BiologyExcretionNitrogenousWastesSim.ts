import type { SimDef } from '../../engine/types';
import C11_BiologyExcretionNitrogenousWastesSim from '../../../simulations/c6_12/C11_BiologyExcretionNitrogenousWastesSim';

/** v3 wrapped master — C11_BiologyExcretionNitrogenousWastesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biologyexcretionnitrogenouswastessim: SimDef = {
    id: 'v3w_c11_biologyexcretionnitrogenouswastessim',
    title: 'Composition of Urine',
    subtitle: 'Covers: normal physical characteristics (volume, color, pH, specific gravity, odor),.',
    classLevel: 11, subject: 'biology', topic: 'Composition of Urine',
    chapters: [],
    nodeIds: ['c11_bio_cbse_16_006', 'c11_bio_cbse_07_009', 'c11_bio_cbse_16_003', 'c11_bio_cbse_16_007', 'c11_bio_cbse_16_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe a routine urinalysis report from a local pathology lab — notice how a simple "dipstick test" reveals.', goal: 'Master Composition of Urine.' },
    discovery: {
        question: 'An APPLY level question: A patient\'s 24-hour urine shows: volume 1.2 L, urea 18 g, creatinine 0.8 g, glucose 45 g, ketones positive.',
        options: ['Diabetes mellitus (uncontrolled)', 'urine composition is fixed', '"urine composition is fixed"'],
        answer: 'Diabetes mellitus (uncontrolled)',
        hook: 'Students believe that "urine composition is fixed" — i.e., the kidney produces urine of constant composition regardless.',
    },
    teaching: [
        { title: 'Urine composition refers to the quantitative.', text: 'Urine composition refers to the quantitative and qualitative profile of dissolved solutes (primarily nitrogenous wastes like urea, uric acid, creatinine; electrolytes like Na⁺, K⁺, Cl⁻, HCO₃⁻,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bio_cbse_16_006', title: 'Urine composition refers to the.',
          scaffold: { problem: 'A 60 kg male has plasma urea = 40 mg/dL, GFR = 110 mL/min, urine volume = 1.8 L/day, urine urea concentration = 1.2 g/dL.',
            steps: [
            { text: 'Convert all units to consistent system (mg, mL, min). Plasma urea = 40 mg/dL = 0.4 mg/mL.' },
            { text: 'Filtered load = GFR × Plasma concentration = 110 mL/min × 0.4 mg/mL = 44 mg/min.' },
            { text: 'Excretion rate = Urine flow × Urine concentration = 1.25 mL/min × 12 mg/mL = 15 mg/min.' },
            { text: 'Reabsorbed amount = Filtered load - Excretion rate = 44 - 15 = 29 mg/min.' },
            { text: 'Urea clearance = Excretion rate / Plasma concentration = 15 mg/min / 0.4 mg/mL = 37.5 mL/min.' },
            { text: 'Interpretation: Urea clearance (37.5) < GFR (110) because urea is partially reabsorbed (~50% typically; here 66% due to.', faded: true, blankAnswer: '(a) 44 mg/min, (b) 15 mg/min, (c) 65.9%, (d) 37.5 mL/min..' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_07_009', title: 'The frog\'s nervous system comprises a.',
          scaffold: { problem: 'A frog\'s optic lobe is experimentally lesioned. Predict the effect on its feeding behaviour and explain the neural basis.',
            steps: [
            { text: 'Identify the sensory modality involved in detecting prey – vision.' },
            { text: 'Recall that the optic nerve (cranial nerve II) carries visual information to the optic lobes in the midbrain.' },
            { text: 'Recognise that the optic lobes are the primary visual processing centres in the frog brain.' },
            { text: 'Deduce that lesioning the optic lobes disrupts visual processing, so the frog cannot detect or accurately strike at.' },
            { text: 'Conclude that feeding behaviour relying on visual cues will be severely impaired, though olfactory or tactile cues.', faded: true, blankAnswer: 'The frog will lose its ability to visually detect and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_16_003', title: 'Glomerular filtration is the passive,.',
          scaffold: { problem: 'A 25-year-old male has systemic BP 120/80 mmHg, afferent arteriolar resistance 0.08 mmHg·min/mL, efferent arteriolar resistance 0.12.',
            steps: [
            { text: 'Calculate mean arterial pressure (MAP) = Diastolic + 1/3(Pulse Pressure) = 80 + 1/3(40) = 93.3 mmHg.' },
            { text: 'Use voltage divider formula for glomerular capillary pressure: P_GC = [R_E/(R_A + R_E)] × P_A + [R_A/(R_A + R_E)] × P_V.' },
            { text: 'Compute Net Filtration Pressure: NFP = (P_GC - P_BC) - (π_GC - π_BC) = (60 - 15) - (30 - 0) = 45 - 30 = 15 mmHg.' },
            { text: 'Calculate GFR = Kf × NFP = 12.5 mL/min/mmHg × 15 mmHg = 187.5 mL/min.' },
            { text: 'Compare with normal (125 mL/min). This elevated GFR suggests hyperfiltration (e.g., early diabetes or high protein.', faded: true, blankAnswer: 'GFR = 187.5 mL/min (hyperfiltration).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_16_007', title: 'Kidney stones (renal calculi) are hard,.',
          scaffold: { problem: 'A 45-year-old male farmer from Rajasthan presents with severe colicky flank pain radiating to groin, hematuria, and history of low water.',
            steps: [
            { text: 'Identify the environmental trigger — high ambient temperature and physical labor cause excessive sweating, reducing.' },
            { text: 'Link to renal physiology — low volume activates RAAS and ADH, maximizing water reabsorption in collecting ducts,.' },
            { text: 'Apply solubility principle — concentrated urine increases ionic product of calcium and oxalate beyond solubility.' },
            { text: 'Trace crystal growth — crystals aggregate on Randall\'s plaques (interstitial calcium phosphate deposits) in the.' },
            { text: 'Explain obstruction — the 8 mm stone blocks the pelviureteric junction, causing upstream dilation (hydronephrosis),.', faded: true, blankAnswer: 'Dehydration → concentrated urine → supersaturation of Ca²⁺.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_16_008', title: 'Accessory excretory organs are.',
          scaffold: { problem: 'A 45-year-old male with chronic obstructive pulmonary disease (COPD) develops respiratory acidosis (blood pH 7.25, PₐCO₂ 65 mmHg).',
            steps: [
            { text: 'Identify the primary defect — COPD reduces alveolar ventilation → decreased CO₂ excretion → PₐCO₂ rises from normal 40.' },
            { text: 'Apply CO₂ hydration equilibrium: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻.' },
            { text: 'Calculate expected pH change using Henderson-Hasselbalch: pH = 6.1 + log([HCO₃⁻]/(0.03 × PₐCO₂)).' },
            { text: 'Explain renal compensation mechanism — proximal tubule increases H⁺ secretion (via Na⁺/H⁺ exchanger) and generates new.' },
            { text: 'Conclude that lungs provide rapid (minutes) CO₂/pH control; kidneys provide slow (days) HCO₃⁻ regeneration —.', faded: true, blankAnswer: 'Impaired CO₂ excretion → elevated PₐCO₂ → right-shift of.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_07_009', title: 'Identify each idea',
          dissect: { specimen: 'Composition of Urine', spots: [
            { id: 's1', label: 'Urine composition refers to the', prompt: 'Which idea is this? — Urine composition refers to the quantitative and qualitative profile of dissolved solutes.', answer: 'Urine composition refers to the', options: ['Urine composition refers to the', 'The frogs nervous system comprises', 'Glomerular filtration is the passive', 'Kidney stones renal calculi are'] },
            { id: 's2', label: 'The frogs nervous system comprises', prompt: 'Which idea is this? — The frog\'s nervous system comprises a central nervous system (brain and spinal cord), a.', answer: 'The frogs nervous system comprises', options: ['The frogs nervous system comprises', 'Urine composition refers to the', 'Glomerular filtration is the passive', 'Kidney stones renal calculi are'] },
            { id: 's3', label: 'Glomerular filtration is the passive', prompt: 'Which idea is this? — Glomerular filtration is the passive, non-selective process where blood plasma is forced.', answer: 'Glomerular filtration is the passive', options: ['Glomerular filtration is the passive', 'Urine composition refers to the', 'The frogs nervous system comprises', 'Kidney stones renal calculi are'] },
            { id: 's4', label: 'Kidney stones renal calculi are', prompt: 'Which idea is this? — Kidney stones (renal calculi) are hard, crystalline mineral deposits (commonly calcium.', answer: 'Kidney stones renal calculi are', options: ['Kidney stones renal calculi are', 'Urine composition refers to the', 'The frogs nervous system comprises', 'Glomerular filtration is the passive'] },
            { id: 's5', label: 'Accessory excretory organs are non-renal', prompt: 'Which idea is this? — Accessory excretory organs are non-renal structures (lungs, liver, skin) that eliminate.', answer: 'Accessory excretory organs are non-renal', options: ['Accessory excretory organs are non-renal', 'Urine composition refers to the', 'The frogs nervous system comprises', 'Glomerular filtration is the passive'] }
          ] } }
    ],
    explore: { component: C11_BiologyExcretionNitrogenousWastesSim, prompt: 'Explore the interactive — Composition of Urine' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_006', difficulty: 'standard',
          question: 'Urine composition refers to the quantitative and qualitative profile of.',
          hint: 'If stuck, revisit the "Reabsorption and secretion of major substances at different parts.',
          misconception: 'Students believe that "urine composition is fixed" — i.e., the kidney produces urine of constant composition regardless.',
          parts: [
                { id: 'a', prompt: 'An APPLY level question: A patient\'s 24-hour urine shows: volume 1.2 L, urea 18 g, creatinine 0.8 g, glucose 45 g, ketones positive.', answer: 'Diabetes mellitus (uncontrolled)',
                  options: ['Correct answer: Diabetes mellitus (uncontrolled)', 'urine composition is fixed', '"urine composition is fixed"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "urine composition is fixed" — i.e., the kidney produces urine of constant composition regardless of hydration, diet,.' }
          ],
            remediations: { 'urine-composition-is-fixed-i': { steps: ['Revisit the counter-current mechanism (node 16_004) and ADH action (node 16_005) — observe how medullary gradient + ADH.', 'Create a table: "Condition → Hormone → Tubular Effect → Urine Change" for 4 scenarios: (a) water loading, (b).', 'Solve a numerical: "If GFR = 125 mL/min, plasma urea = 30 mg/dL, urine volume = 1.5 L/day, urine urea = 20 g/day →.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "urine composition is fixed" — i.e., the kidney produces urine of constant composition regardless.',
          parts: [
                { id: 'a', prompt: 'An EVALUATE level question: A student claims: "Since urine pH is normally acidic (~6.0), the kidney must secrete H⁺ into the filtrate throughout the nephron.".', answer: 'Partially correct but incomplete',
                  options: ['Correct answer: Partially correct but incomplete', 'urine composition is fixed', '"urine composition is fixed"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "urine composition is fixed" — i.e., the kidney produces urine of constant composition regardless of hydration, diet,.' }
          ],
            remediations: { 'urine-composition-is-fixed-i': { steps: ['Revisit the counter-current mechanism (node 16_004) and ADH action (node 16_005) — observe how medullary gradient + ADH.', 'Create a table: "Condition → Hormone → Tubular Effect → Urine Change" for 4 scenarios: (a) water loading, (b).', 'Solve a numerical: "If GFR = 125 mL/min, plasma urea = 30 mg/dL, urine volume = 1.5 L/day, urine urea = 20 g/day →.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_07_009', difficulty: 'standard',
          question: 'The frog\'s nervous system comprises a central nervous system (brain and spinal.',
          hint: 'Review Class 10 neural control and coordination (reflex arc, brain parts) and excretory.',
          misconception: 'Students often think the frog\'s brain is a simpler version of the human brain with the same parts just smaller.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The frog\'s nervous system comprises a central nervous system (brain and spinal cord), a',
                  options: ['The frog\'s nervous system comprises a central nervous system (brain and spinal cord), a', 'Urine composition refers to the quantitative and qualitative profile of dissolved solutes', 'Glomerular filtration is the passive, non-selective process where blood plasma is forced', 'Kidney stones (renal calculi) are hard, crystalline mineral deposits (commonly calcium'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the frog\'s brain is a simpler version of the human brain with the same parts just smaller.' }
          ],
            remediations: { 'the-frog-s-brain-is': { steps: ['Draw side‑by‑side diagrams of frog and human brains, labelling optic lobes, olfactory lobes, cerebral hemispheres,.', 'Use a table to compare nephron structure: list "loop of Henle", "collecting duct", "glomerulus" and mark present/absent.', 'Watch a 2‑minute video of frog feeding (showing tongue projection) and identify the cranial nerves involved.', 'Re‑read the NCERT paragraph on excretory system and highlight the words "urinogenital duct", "cloaca", "urinary.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_003', difficulty: 'standard',
          question: 'Glomerular filtration is the passive, non-selective process where blood plasma.',
          hint: 'Review "Capillary Exchange" in Class 11 Physics (if covered) or Class 10 Biology.',
          misconception: 'Students often believe that "filtration fraction = GFR/RPF" is constant, and therefore if GFR falls, renal plasma flow.',
          parts: [
                { id: 'a', prompt: 'What is the normal glomerular filtration rate (GFR) in a healthy adult human, and what fraction of cardiac output does renal blood flow represent?', answer: 'Normal GFR ≈ 125 mL/min (180 L/day)',
                  options: ['Normal GFR ≈ 125 mL/min (180 L/day)', 'GFR = 1.5 L/day', 'renal flow = 5% of cardiac output'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "filtration fraction = GFR/RPF" is constant, and therefore if GFR falls, renal plasma flow (RPF) must fall.' }
          ],
            remediations: { 'filtration-fraction-gfr-rpf-is': { steps: ['Draw a glomerulus with afferent/efferent arterioles labeled R_A and R_E.', 'Write Ohm\'s law analog: P_GC = (R_E/(R_A+R_E)) × P_A + (R_A/(R_A+R_E)) × P_V (P_A = arterial pressure, P_V = venous.', 'Show mathematically: increasing R_E raises P_GC more than increasing R_A lowers it.', 'Calculate FF = GFR/RPF = Kf × NFP / RPF.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "filtration fraction = GFR/RPF" is constant, and therefore if GFR falls, renal plasma flow.',
          parts: [
                { id: 'a', prompt: 'Design a thought experiment using inulin clearance to prove that a substance is neither reabsorbed nor secreted by the tubules, and explain how the result.', answer: 'Infuse inulin to steady-state plasma concentration (P_in)',
                  options: ['Infuse inulin to steady-state plasma concentration (P_in)', 'filtration fraction = GFR/RPF'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "filtration fraction = GFR/RPF" is constant, and therefore if GFR falls, renal plasma flow (RPF) must fall.' }
          ],
            remediations: { 'filtration-fraction-gfr-rpf-is': { steps: ['Draw a glomerulus with afferent/efferent arterioles labeled R_A and R_E.', 'Write Ohm\'s law analog: P_GC = (R_E/(R_A+R_E)) × P_A + (R_A/(R_A+R_E)) × P_V (P_A = arterial pressure, P_V = venous.', 'Show mathematically: increasing R_E raises P_GC more than increasing R_A lowers it.', 'Calculate FF = GFR/RPF = Kf × NFP / RPF.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_007', difficulty: 'standard',
          question: 'Kidney stones (renal calculi) are hard, crystalline mineral deposits (commonly.',
          hint: 'Revisit c11_bio_cbse_16_003 (GFR definition), c11_bio_cbse_16_004 (PCT/DCT/collecting.',
          misconception: 'Students believe hemodialysis "cleans the blood completely" like a filter, not realizing it only removes small solutes.',
          parts: [
                { id: 'a', prompt: 'Name the crystalline salt most commonly found in human renal calculi and state the urinary condition that promotes its precipitation.', answer: 'Calcium oxalate is the most common constituent',
                  options: ['Calcium oxalate is the most common constituent', 'uric acid crystals', 'dehydration alone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe hemodialysis "cleans the blood completely" like a filter, not realizing it only removes small solutes by diffusion down.' }
          ],
            remediations: { 'hemodialysis-cleans-the-blood-completely': { steps: ['Demonstrate diffusion using a dialysis tubing bag with starch solution placed in iodine water — only small iodine.', 'Show that adding urea to the outside fluid stops net urea removal (equilibrium).', 'Contrast with a labeled nephron diagram highlighting reabsorption/secretion steps absent in dialysis.', 'Assign a case study where a dialysis patient develops anemia and bone pain despite "clean blood" reports.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe hemodialysis "cleans the blood completely" like a filter, not realizing it only removes small solutes.',
          parts: [
                { id: 'a', prompt: 'Design a public health awareness poster for a rural Indian community that explains the link between three modifiable lifestyle factors and kidney stone.', answer: 'A good poster would depict: (1) "Drink 8-10 glasses of water daily" (prevents',
                  options: ['A good poster would depict: (1) "Drink 8-10 glasses of water daily" (prevents', 'cleans the blood completely'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe hemodialysis "cleans the blood completely" like a filter, not realizing it only removes small solutes by diffusion down.' }
          ],
            remediations: { 'hemodialysis-cleans-the-blood-completely': { steps: ['Demonstrate diffusion using a dialysis tubing bag with starch solution placed in iodine water — only small iodine.', 'Show that adding urea to the outside fluid stops net urea removal (equilibrium).', 'Contrast with a labeled nephron diagram highlighting reabsorption/secretion steps absent in dialysis.', 'Assign a case study where a dialysis patient develops anemia and bone pain despite "clean blood" reports.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_008', difficulty: 'standard',
          question: 'Accessory excretory organs are non-renal structures (lungs, liver, skin) that.',
          hint: 'Revisit Class 10 "Excretion in Humans" (c10_bio_cbse_01_012) and "Cellular Respiration".',
          misconception: 'Students believe the liver "filters blood like kidneys" and directly excretes wastes into urine.',
          parts: [
                { id: 'a', prompt: 'Name the three major accessory excretory organs in humans and the primary waste each eliminates.', answer: 'Lungs eliminate carbon dioxide and water vapour',
                  options: ['Lungs eliminate carbon dioxide and water vapour', 'kidneys, liver, skin', 'filters blood like kidneys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the liver "filters blood like kidneys" and directly excretes wastes into urine.' },
                { id: 'b', prompt: 'Why can the kidneys not excrete carbon dioxide effectively, necessitating pulmonary excretion?', answer: 'CO₂ is a gas with high diffusion coefficient and low solubility in plasma',
                  options: ['CO₂ is a gas with high diffusion coefficient and low solubility in plasma', 'CO₂ is not filtered', 'filters blood like kidneys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the liver "filters blood like kidneys" and directly excretes wastes into urine.' },
                { id: 'c', prompt: 'A patient with severe liver cirrhosis develops jaundice and elevated blood cholesterol.', answer: 'Haemoglobin → heme → biliverdin (via heme oxygenase) → bilirubin (via biliverdin',
                  options: ['Haemoglobin → heme → biliverdin (via heme oxygenase) → bilirubin (via biliverdin', 'filters blood like kidneys', 'liver removes urea from blood and sends it to kidney'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the liver "filters blood like kidneys" and directly excretes wastes into urine.' }
          ],
            remediations: { 'the-liver-filters-blood-like': { steps: ['Draw a flowchart: Protein catabolism → NH₃ → (liver) urea → blood → (kidney) urine.', 'Use a two-column table: "Renal excretion" (filtration, reabsorption, secretion → urine) vs.', 'Perform the lime water test (Diagnostic Q6) to viscerally experience pulmonary CO₂ excretion.', 'Re-read NCERT 16.7 lines: "Liver secretes bile... pass out along with digestive wastes" and "Sweat...'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the liver "filters blood like kidneys" and directly excretes wastes into urine.',
          parts: [
                { id: 'a', prompt: 'Design a simple classroom demonstration to show that exhaled air contains more CO₂ and water vapour than inhaled air, using materials available in an Indian.', answer: 'Use two test tubes with 5 mL lime water (Ca(OH)₂)',
                  options: ['Use two test tubes with 5 mL lime water (Ca(OH)₂)', 'filters blood like kidneys', 'liver removes urea from blood and sends it to kidney', 'the liver "filters blood like kidneys" and directly excretes wastes into urine'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the liver "filters blood like kidneys" and directly excretes wastes into urine.' }
          ],
            remediations: { 'the-liver-filters-blood-like': { steps: ['Draw a flowchart: Protein catabolism → NH₃ → (liver) urea → blood → (kidney) urine.', 'Use a two-column table: "Renal excretion" (filtration, reabsorption, secretion → urine) vs.', 'Perform the lime water test (Diagnostic Q6) to viscerally experience pulmonary CO₂ excretion.', 'Re-read NCERT 16.7 lines: "Liver secretes bile... pass out along with digestive wastes" and "Sweat...'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
