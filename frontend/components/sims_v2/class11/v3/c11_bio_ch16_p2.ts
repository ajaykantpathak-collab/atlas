import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch16_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch16_p2: SimDef = {
    id: 'v3_c11_bio_ch16_p2',
    title: 'Excretory Products and Their Elimination · Part 2/2',
    subtitle: 'Read the kidney\'s internal geography to see why a million nephrons need a cortex and a medulla.',
    classLevel: 11, subject: 'biology', topic: 'Excretory Products and Their Elimination · Part 2/2',
    chapters: ['c11_bio_ch16'],
    nodeIds: ['c11_bio_cbse_16_007', 'c11_bio_cbse_16_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a renal physiologist explaining a stenosis scan to a patient', intro: 'A narrowed renal artery is starving one kidney. To predict the fallout, you must first know exactly what each internal zone was doing.', goal: 'Label kidney anatomy, trace its double capillary circulation, and distinguish cortical from juxtamedullary nephrons by loop length.' },
    discovery: {
        question: 'You drink two litres of water; a desert mammal drinks almost none — yet its urine is far more concentrated than yours could ever be. The difference isn\'t willpower. What architectural feature inside the kidney makes concentrated urine possible?',
        options: ['Long loops of Henle dipping deep into the medulla, building a counter-current gradient the cortex alone cannot create', 'A thicker bladder wall that squeezes water back into blood', 'More glomeruli packed into the cortex', 'A wider ureter that slows urine flow'],
        answer: 'Long loops of Henle dipping deep into the medulla, building a counter-current gradient the cortex alone cannot create',
        hook: 'The kidney\'s cortex filters, but the medulla concentrates — the geography of nephron segments across zones is the whole trick.',
    },
    teaching: [
        { title: 'Disorders: Kidney Stones and Kidney Failure', text: 'Kidney stones (renal calculi) are hard, crystalline mineral deposits (commonly calcium oxalate or phosphate) that form within the renal pelvis or calyces due to supersaturation of urine, while kidney.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_16_007', title: 'Your mission',
          mission: { widget: 'nephron', validate: 'nephron:flow=60',
            instruction: 'On the lab: increase the filtration flow to 60 — what gets filtered?.',
        context: 'Map a kidney\'s longitudinal section — cortex, pyramids, columns, calyces, pelvis — and trace blood from renal artery through two capillary beds to renal vein, explaining why filtration happens in one zone and concentration in another.',
            observePrompt: 'What did the nephron interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_16_007', title: 'Disorders: Kidney Stones and Kidney Failure',
          caseStudy: { intro: 'Begin by asking students if they have seen someone in their family or neighborhood who avoids drinking water during long bus journeys to avoid using public.',
            decisions: [{ prompt: 'Name the crystalline salt most commonly found in human renal calculi and state the urinary condition that promotes its precipitation.', options: [
                { text: 'Calcium oxalate is the most common constituent', outcome: 'Calcium oxalate is the most common constituent; precipitation occurs when urine becomes.' },
                { text: 'uric acid crystals', outcome: 'Not quite — Students believe hemodialysis "cleans the blood completely" like a filter, not realizing it only.', reveals: 'hemodialysis-cleans-the-blood-completely' },
                { text: 'dehydration alone', outcome: 'Not quite — Students believe hemodialysis "cleans the blood completely" like a filter, not realizing it only.', reveals: 'hemodialysis-cleans-the-blood-completely' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_16_008', title: 'Role of Other Organs in Excretion',
          caseStudy: { intro: 'Observe your breath on a cold Delhi winter morning — the visible mist is water vapour excreted by your lungs along with ~200 mL CO₂ every minute.',
            decisions: [{ prompt: 'Name the three major accessory excretory organs in humans and the primary waste each eliminates.', options: [
                { text: 'Lungs eliminate carbon dioxide and water vapour', outcome: 'Lungs eliminate carbon dioxide and water vapour; liver eliminates bilirubin, biliverdin.' },
                { text: 'kidneys, liver, skin', outcome: 'Not quite — Students believe the liver "filters blood like kidneys" and directly excretes wastes into urine.', reveals: 'the-liver-filters-blood-like' },
                { text: 'filters blood like kidneys', outcome: 'Not quite — Students believe the liver "filters blood like kidneys" and directly excretes wastes into urine.', reveals: 'the-liver-filters-blood-like' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_16_008', title: 'Identify each idea',
          dissect: { specimen: 'Excretory Products and Their Elimination · Part 2/2', spots: [
            { id: 's1', label: 'Disorders Kidney Stones and Kidney Failure', prompt: 'Which idea is this? — Kidney stones (renal calculi) are hard, crystalline mineral deposits (commonly calcium.', answer: 'Disorders Kidney Stones and Kidney Failure', options: ['Disorders Kidney Stones and Kidney Failure', 'Role of Other Organs in Excretion'] },
            { id: 's2', label: 'Role of Other Organs in Excretion', prompt: 'Which idea is this? — Accessory excretory organs are non-renal structures (lungs, liver, skin) that eliminate.', answer: 'Role of Other Organs in Excretion', options: ['Role of Other Organs in Excretion', 'Disorders Kidney Stones and Kidney Failure'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_16_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A hospital nephrology resident asks your internship group a puzzle: \'A rare disorder destroys only the juxtamedullary nephrons — about 15% of the total. Predict what the patient complains of.\' A teammate shrugs: \'Losing 15% of filters just means 15% less filtration — mild problem.\'',
            decisions: [{ prompt: 'What does the patient actually suffer?', options: [
                { text: 'GFR falls only ~15%, but urine concentrating ability collapses: the deep medullary osmotic gradient is built solely by the long loops of Henle and vasa recta of juxtamedullary nephrons. The patient passes large volumes of dilute urine and dehydrates fast, even though 85% of nephrons still filter.', outcome: 'Cortical nephrons filter but can\'t build the gradient; the minority with long loops does the concentrating — losing them is a drought-tolerance disaster, not a filtration one.' },
                { text: 'The teammate is right — every nephron filters and concentrates equally, so 15% loss is a 15% loss.', outcome: 'Nephron labour is divided: ~85% are cortical with short loops that never reach the deep medulla; they can\'t substitute for the gradient-builders.', reveals: 'all-nephrons-identical' },
                { text: 'The patient can\'t filter blood at all — no juxtamedullary nephrons means no glomerular filtration.', outcome: 'Filtration happens in the cortical glomeruli of every nephron and continues fine; the deficit is in concentrating urine, not producing it.', reveals: 'loop-nephrons-do-all-filtering' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_16_008', title: 'You made it',
          caseStudy: { intro: 'You stopped picturing the kidney as a single filter and saw it as a zoned factory — cortical filtration upstream, medullary concentration downstream.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'nephron', prompt: 'Explore the nephron interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'nephron', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_007', difficulty: 'standard',
          question: 'Kidney stones (renal calculi) are hard, crystalline mineral deposits (commonly.',
          hint: 'Revisit c11_bio_cbse_16_003 (GFR definition), c11_bio_cbse_16_004 (PCT/DCT/collecting.',
          misconception: 'Students believe hemodialysis "cleans the blood completely" like a filter, not realizing it only removes small solutes.',
          parts: [
                { id: 'a', prompt: 'Name the crystalline salt most commonly found in human renal calculi and state the urinary condition that promotes its precipitation.', answer: 'Calcium oxalate is the most common constituent',
                  options: ['Calcium oxalate is the most common constituent', 'uric acid crystals', 'dehydration alone', 'cleans the blood completely'],
                  hint: 'Revisit c11_bio_cbse_16_003 (GFR definition), c11_bio_cbse_16_004 (PCT/DCT/collecting duct.',
                  misconception: 'Students believe hemodialysis "cleans the blood completely" like a filter, not realizing it only removes small solutes by diffusion down.' }
          ],
            remediations: { 'hemodialysis-cleans-the-blood-completely': { steps: ['Demonstrate diffusion using a dialysis tubing bag with starch solution placed in iodine water — only small iodine.', 'Show that adding urea to the outside fluid stops net urea removal (equilibrium).', 'Contrast with a labeled nephron diagram highlighting reabsorption/secretion steps absent in dialysis.', 'Assign a case study where a dialysis patient develops anemia and bone pain despite "clean blood" reports.'], labTask: { instruction: 'On the interactive: increase the filtration flow to 60 — what gets filtered? — then check.', widget: 'nephron', validate: 'nephron:flow=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe hemodialysis "cleans the blood completely" like a filter, not realizing it only removes small solutes.',
          parts: [
                { id: 'a', prompt: 'Design a public health awareness poster for a rural Indian community that explains the link between three modifiable lifestyle factors and kidney stone.', answer: 'A good poster would depict: (1) "Drink 8-10 glasses of water daily" (prevents',
                  options: ['A good poster would depict: (1) "Drink 8-10 glasses of water daily" (prevents', 'cleans the blood completely'],
                  hint: 'Revisit c11_bio_cbse_16_003 (GFR definition), c11_bio_cbse_16_004 (PCT/DCT/collecting duct.',
                  misconception: 'Students believe hemodialysis "cleans the blood completely" like a filter, not realizing it only removes small solutes by diffusion down.' }
          ],
            remediations: { 'hemodialysis-cleans-the-blood-completely': { steps: ['Demonstrate diffusion using a dialysis tubing bag with starch solution placed in iodine water — only small iodine.', 'Show that adding urea to the outside fluid stops net urea removal (equilibrium).', 'Contrast with a labeled nephron diagram highlighting reabsorption/secretion steps absent in dialysis.', 'Assign a case study where a dialysis patient develops anemia and bone pain despite "clean blood" reports.'], labTask: { instruction: 'On the interactive: increase the filtration flow to 60 — what gets filtered? — then check.', widget: 'nephron', validate: 'nephron:flow=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_008', difficulty: 'standard',
          question: 'Accessory excretory organs are non-renal structures (lungs, liver, skin) that.',
          hint: 'Revisit Class 10 "Excretion in Humans" (c10_bio_cbse_01_012) and "Cellular Respiration".',
          misconception: 'Students believe the liver "filters blood like kidneys" and directly excretes wastes into urine.',
          parts: [
                { id: 'a', prompt: 'Name the three major accessory excretory organs in humans and the primary waste each eliminates.', answer: 'Lungs eliminate carbon dioxide and water vapour',
                  options: ['Lungs eliminate carbon dioxide and water vapour', 'kidneys, liver, skin', 'filters blood like kidneys', 'liver removes urea from blood and sends it to kidney'],
                  hint: 'Revisit Class 10 "Excretion in Humans" (c10_bio_cbse_01_012) and "Cellular Respiration".',
                  misconception: 'Students believe the liver "filters blood like kidneys" and directly excretes wastes into urine.' },
                { id: 'b', prompt: 'Why can the kidneys not excrete carbon dioxide effectively, necessitating pulmonary excretion?', answer: 'CO₂ is a gas with high diffusion coefficient and low solubility in plasma',
                  options: ['CO₂ is a gas with high diffusion coefficient and low solubility in plasma', 'CO₂ is not filtered', 'filters blood like kidneys', 'liver removes urea from blood and sends it to kidney'],
                  hint: 'Revisit Class 10 "Excretion in Humans" (c10_bio_cbse_01_012) and "Cellular Respiration".',
                  misconception: 'Students believe the liver "filters blood like kidneys" and directly excretes wastes into urine.' },
                { id: 'c', prompt: 'A patient with severe liver cirrhosis develops jaundice and elevated blood cholesterol.', answer: 'Haemoglobin → heme → biliverdin (via heme oxygenase) → bilirubin (via biliverdin',
                  options: ['Haemoglobin → heme → biliverdin (via heme oxygenase) → bilirubin (via biliverdin', 'filters blood like kidneys', 'liver removes urea from blood and sends it to kidney', 'the liver "filters blood like kidneys" and directly excretes wastes into urine'],
                  hint: 'Revisit Class 10 "Excretion in Humans" (c10_bio_cbse_01_012) and "Cellular Respiration".',
                  misconception: 'Students believe the liver "filters blood like kidneys" and directly excretes wastes into urine.' }
          ],
            remediations: { 'the-liver-filters-blood-like': { steps: ['Draw a flowchart: Protein catabolism → NH₃ → (liver) urea → blood → (kidney) urine.', 'Use a two-column table: "Renal excretion" (filtration, reabsorption, secretion → urine) vs.', 'Perform the lime water test (Diagnostic Q6) to viscerally experience pulmonary CO₂ excretion.', 'Re-read NCERT 16.7 lines: "Liver secretes bile... pass out along with digestive wastes" and "Sweat...'], labTask: { instruction: 'On the interactive: increase the filtration flow to 60 — what gets filtered? — then check.', widget: 'nephron', validate: 'nephron:flow=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
