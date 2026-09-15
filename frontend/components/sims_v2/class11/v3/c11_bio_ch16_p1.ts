import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch16_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch16_p1: SimDef = {
    id: 'v3_c11_bio_ch16_p1',
    title: 'Excretory Products and Their Elimination · Part 1/2',
    subtitle: 'Read the kidney\'s internal geography to see why a million nephrons need a cortex and a medulla.',
    classLevel: 11, subject: 'biology', topic: 'Excretory Products and Their Elimination · Part 1/2',
    chapters: ['c11_bio_ch16'],
    nodeIds: ['c11_bio_cbse_16_001', 'c11_bio_cbse_16_002', 'c11_bio_cbse_16_003', 'c11_bio_cbse_16_004', 'c11_bio_cbse_16_005', 'c11_bio_cbse_16_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a renal physiologist explaining a stenosis scan to a patient', intro: 'A narrowed renal artery is starving one kidney. To predict the fallout, you must first know exactly what each internal zone was doing.', goal: 'Label kidney anatomy, trace its double capillary circulation, and distinguish cortical from juxtamedullary nephrons by loop length.' },
    discovery: {
        question: 'You drink two litres of water; a desert mammal drinks almost none — yet its urine is far more concentrated than yours could ever be. The difference isn\'t willpower. What architectural feature inside the kidney makes concentrated urine possible?',
        options: ['Long loops of Henle dipping deep into the medulla, building a counter-current gradient the cortex alone cannot create', 'A thicker bladder wall that squeezes water back into blood', 'More glomeruli packed into the cortex', 'A wider ureter that slows urine flow'],
        answer: 'Long loops of Henle dipping deep into the medulla, building a counter-current gradient the cortex alone cannot create',
        hook: 'The kidney\'s cortex filters, but the medulla concentrates — the geography of nephron segments across zones is the whole trick.',
    },
    teaching: [
        { title: 'Human Excretory System: Kidney Structure', text: 'The human excretory system consists of a pair of bean-shaped kidneys located retroperitoneally between the last thoracic and third lumbar vertebrae, each containing approximately one million nephrons.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_16_001', title: 'Your mission',
          mission: { widget: 'nephron', validate: 'nephron:flow=60',
            instruction: 'On the lab: increase the filtration flow to 60 — what gets filtered?.',
        context: 'Map a kidney\'s longitudinal section — cortex, pyramids, columns, calyces, pelvis — and trace blood from renal artery through two capillary beds to renal vein, explaining why filtration happens in one zone and concentration in another.',
            observePrompt: 'What did the nephron interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_16_001', title: 'Human Excretory System: Kidney Structure',
          scaffold: { problem: 'A 25-year-old male undergoes a kidney donation evaluation. CT angiography shows his left kidney has a single renal artery, but the right.',
            steps: [
            { text: 'Recall that renal arteries branch into segmental arteries (superior, anterosuperior, anteroinferior, inferior.' },
            { text: 'Recognize that multiple renal arteries (accessory arteries) usually arise directly from the aorta and enter the kidney.' },
            { text: 'Analyze donor risk: A kidney with a single renal artery leaves the donor with a kidney that has normal single-artery.' },
            { text: 'Analyze recipient surgery: Transplanting a single-artery kidney requires only one arterial anastomosis (to iliac.' },
            { text: 'Consider segmental infarction risk: Accessory arteries often supply polar segments; if one thromboses post-transplant.' },
            { text: 'Conclude: The LEFT kidney (single renal artery) is preferable for both donor safety (remaining kidney has standard.', faded: true, blankAnswer: 'Harvest the LEFT kidney (single renal artery). It offers.' }
            ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_16_002', title: 'Nephron: Structure and Function',
          caseStudy: { intro: 'Imagine you drink a large glass of nimbu pani on a hot Delhi afternoon. Within 30 minutes, you feel the urge to urinate — but your urine is pale and dilute.',
            decisions: [{ prompt: 'List the sequential parts of a single nephron through which filtrate flows, starting from Bowman\'s capsule to the point it enters the renal.', options: [
                { text: 'Correct sequence: Bowman\'s capsule → Proximal Convoluted Tubule (PCT) → Descending limb', outcome: 'Correct sequence: Bowman\'s capsule → Proximal Convoluted Tubule (PCT) → Descending limb of Loop.' },
                { text: 'The loop of Henle *concentrates* the filtrate throughout its length', outcome: 'Not quite — **Misconception:** "The loop of Henle *concentrates* the filtrate throughout its length." Students.', reveals: 'misconception-the-loop-of-henle' },
                { text: 'filtrate gets progressively more concentrated', outcome: 'Not quite — **Misconception:** "The loop of Henle *concentrates* the filtrate throughout its length." Students.', reveals: 'misconception-the-loop-of-henle' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_16_003', title: 'Urine Formation: Glomerular Filtration',
          scaffold: { problem: 'A 25-year-old male has systemic BP 120/80 mmHg, afferent arteriolar resistance 0.08 mmHg·min/mL, efferent arteriolar resistance 0.12.',
            steps: [
            { text: 'Calculate mean arterial pressure (MAP) = Diastolic + 1/3(Pulse Pressure) = 80 + 1/3(40) = 93.3 mmHg.' },
            { text: 'Use voltage divider formula for glomerular capillary pressure: P_GC = [R_E/(R_A + R_E)] × P_A + [R_A/(R_A + R_E)] × P_V.' },
            { text: 'Compute Net Filtration Pressure: NFP = (P_GC - P_BC) - (π_GC - π_BC) = (60 - 15) - (30 - 0) = 45 - 30 = 15 mmHg.' },
            { text: 'Calculate GFR = Kf × NFP = 12.5 mL/min/mmHg × 15 mmHg = 187.5 mL/min.' },
            { text: 'Compare with normal (125 mL/min). This elevated GFR suggests hyperfiltration (e.g., early diabetes or high protein.', faded: true, blankAnswer: 'GFR = 187.5 mL/min (hyperfiltration).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_16_004', title: 'Urine Formation: Tubular Reabsorption and Secretion',
          scaffold: { problem: 'A healthy 70 kg male has GFR = 125 mL/min, plasma [glucose] = 5 mmol/L, plasma [Na+] = 140 mmol/L.',
            steps: [
            { text: 'Calculate filtered load = GFR × Plasma concentration. Glucose: 125 mL/min × 5 mmol/L = 125 × 0.005 mmol/min = 0.625.' },
            { text: 'Calculate excretion rate = Urine flow × Urine concentration. Glucose: 1.5 × 0 = 0 mmol/min.' },
            { text: 'Reabsorption rate = Filtered load - Excretion rate. Glucose: 0.625 - 0 = 0.625 mmol/min.' },
            { text: 'Fractional reabsorption = (Reabsorption rate / Filtered load) × 100. Glucose: (0.625/0.625)×100 = 100%.' },
            { text: 'Interpret: Glucose is completely reabsorbed via high-affinity SGLT2 in PCT until transport maximum (Tm) is reached (~11.', faded: true, blankAnswer: '(a) Glucose filtered load = 0.625 mmol/min; Na+ filtered.' }
            ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_16_005', title: 'Regulation of Kidney Function: ADH and RAAS',
          caseStudy: { intro: 'Notice how your urine output decreases on a hot summer day when you sweat heavily, but increases after drinking a large glass of water.',
            decisions: [{ prompt: 'Name the hormone released by the neurohypophysis in response to increased blood osmolarity and state its primary action on the nephron.', options: [
                { text: 'Antidiuretic hormone (ADH) or vasopressin is released', outcome: 'Antidiuretic hormone (ADH) or vasopressin is released; it increases water permeability of the late.' },
                { text: 'antidiuretic', outcome: 'Not quite — Students often believe that ADH increases urine output (diuresis) because its name "antidiuretic".', reveals: 'adh-increases-urine-output-diuresis' },
                { text: 'against diuresis', outcome: 'Not quite — Students often believe that ADH increases urine output (diuresis) because its name "antidiuretic".', reveals: 'adh-increases-urine-output-diuresis' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_16_006', title: 'Composition of Urine',
          scaffold: { problem: 'A 60 kg male has plasma urea = 40 mg/dL, GFR = 110 mL/min, urine volume = 1.8 L/day, urine urea concentration = 1.2 g/dL.',
            steps: [
            { text: 'Convert all units to consistent system (mg, mL, min). Plasma urea = 40 mg/dL = 0.4 mg/mL.' },
            { text: 'Filtered load = GFR × Plasma concentration = 110 mL/min × 0.4 mg/mL = 44 mg/min.' },
            { text: 'Excretion rate = Urine flow × Urine concentration = 1.25 mL/min × 12 mg/mL = 15 mg/min.' },
            { text: 'Reabsorbed amount = Filtered load - Excretion rate = 44 - 15 = 29 mg/min.' },
            { text: 'Urea clearance = Excretion rate / Plasma concentration = 15 mg/min / 0.4 mg/mL = 37.5 mL/min.' },
            { text: 'Interpretation: Urea clearance (37.5) < GFR (110) because urea is partially reabsorbed (~50% typically; here 66% due.', faded: true, blankAnswer: '(a) 44 mg/min, (b) 15 mg/min, (c) 65.9%, (d) 37.5 mL/min.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_16_002', title: 'Identify each idea',
          dissect: { specimen: 'Excretory Products and Their Elimination · Part 1/2', spots: [
            { id: 's1', label: 'Human Excretory System Kidney Structure', prompt: 'Which idea is this? — The human excretory system consists of a pair of bean-shaped kidneys located.', answer: 'Human Excretory System Kidney Structure', options: ['Human Excretory System Kidney Structure', 'Nephron Structure and Function', 'Urine Formation Glomerular Filtration', 'Urine Formation Tubular Reabsorption and Secretion'] },
            { id: 's2', label: 'Nephron Structure and Function', prompt: 'Which idea is this? — A nephron is the microscopic structural and functional unit of the kidney, composed of.', answer: 'Nephron Structure and Function', options: ['Nephron Structure and Function', 'Human Excretory System Kidney Structure', 'Urine Formation Glomerular Filtration', 'Urine Formation Tubular Reabsorption and Secretion'] },
            { id: 's3', label: 'Urine Formation Glomerular Filtration', prompt: 'Which idea is this? — Glomerular filtration is the passive, non-selective process where blood plasma is forced.', answer: 'Urine Formation Glomerular Filtration', options: ['Urine Formation Glomerular Filtration', 'Human Excretory System Kidney Structure', 'Nephron Structure and Function', 'Urine Formation Tubular Reabsorption and Secretion'] },
            { id: 's4', label: 'Urine Formation Tubular Reabsorption and Secretion', prompt: 'Which idea is this? — Tubular reabsorption is the selective process by which the renal tubules reclaim.', answer: 'Urine Formation Tubular Reabsorption and Secretion', options: ['Urine Formation Tubular Reabsorption and Secretion', 'Human Excretory System Kidney Structure', 'Nephron Structure and Function', 'Urine Formation Glomerular Filtration'] },
            { id: 's5', label: 'Regulation of Kidney Function ADH and RAAS', prompt: 'Which idea is this? — Regulation of kidney function refers to the hormonal feedback mechanisms (primarily ADH.', answer: 'Regulation of Kidney Function ADH and RAAS', options: ['Regulation of Kidney Function ADH and RAAS', 'Human Excretory System Kidney Structure', 'Nephron Structure and Function', 'Urine Formation Glomerular Filtration'] },
            { id: 's6', label: 'Composition of Urine', prompt: 'Which idea is this? — Urine composition refers to the quantitative and qualitative profile of dissolved solutes.', answer: 'Composition of Urine', options: ['Composition of Urine', 'Human Excretory System Kidney Structure', 'Nephron Structure and Function', 'Urine Formation Glomerular Filtration'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_16_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A hospital nephrology resident asks your internship group a puzzle: \'A rare disorder destroys only the juxtamedullary nephrons — about 15% of the total. Predict what the patient complains of.\' A teammate shrugs: \'Losing 15% of filters just means 15% less filtration — mild problem.\'',
            decisions: [{ prompt: 'What does the patient actually suffer?', options: [
                { text: 'GFR falls only ~15%, but urine concentrating ability collapses: the deep medullary osmotic gradient is built solely by the long loops of Henle and vasa recta of juxtamedullary nephrons. The patient passes large volumes of dilute urine and dehydrates fast, even though 85% of nephrons still filter.', outcome: 'Cortical nephrons filter but can\'t build the gradient; the minority with long loops does the concentrating — losing them is a drought-tolerance disaster, not a filtration one.' },
                { text: 'The teammate is right — every nephron filters and concentrates equally, so 15% loss is a 15% loss.', outcome: 'Nephron labour is divided: ~85% are cortical with short loops that never reach the deep medulla; they can\'t substitute for the gradient-builders.', reveals: 'all-nephrons-identical' },
                { text: 'The patient can\'t filter blood at all — no juxtamedullary nephrons means no glomerular filtration.', outcome: 'Filtration happens in the cortical glomeruli of every nephron and continues fine; the deficit is in concentrating urine, not producing it.', reveals: 'loop-nephrons-do-all-filtering' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_16_006', title: 'The bigger picture',
          caseStudy: { intro: 'You stopped picturing the kidney as a single filter and saw it as a zoned factory — cortical filtration upstream, medullary concentration downstream.',
            decisions: [{ prompt: 'What comes next? Excretory Products and Their Elimination · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Excretory Products and Their Elimination · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'nephron', prompt: 'Explore the nephron interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'nephron', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_001', difficulty: 'standard',
          question: 'The human excretory system consists of a pair of bean-shaped kidneys located.',
          hint: 'If stuck on kidney histology, revisit Class 9 Animal Tissues (c9_bio_ch2_5, c9_bio_ch2_6).',
          misconception: 'Students often believe that *all* nephrons have long loops of Henle extending deep into the medulla, and that the "loop.',
          parts: [
                { id: 'a', prompt: 'A student draws a longitudinal section of the human kidney and labels the "renal pelvis" as the space *inside* the medullary pyramids. Is this correct?', answer: 'No, this is incorrect',
                  options: ['No, this is incorrect', 'loop of Henle'],
                  hint: 'If stuck on kidney histology, revisit Class 9 Animal Tissues (c9_bio_ch2_5, c9_bio_ch2_6).',
                  misconception: 'Students often believe that *all* nephrons have long loops of Henle extending deep into the medulla, and that the "loop of Henle" is.' },
                { id: 'b', prompt: 'Compare cortical nephrons and juxtamedullary nephrons across *four* structural features: (a) location of glomerulus, (b) length of loop of Henle, (c).', answer: 'location of glomerulus, (',
                  options: ['location of glomerulus, (', 'loop of Henle'],
                  hint: 'If stuck on kidney histology, revisit Class 9 Animal Tissues (c9_bio_ch2_5, c9_bio_ch2_6).',
                  misconception: 'Students often believe that *all* nephrons have long loops of Henle extending deep into the medulla, and that the "loop of Henle" is.' }
          ],
            remediations: { 'all-nephrons-have-long-loops': { steps: ['Show students a histological cross-section of kidney cortex vs.', 'Use a nephron distribution diagram (NCERT Fig 16.3 vs. actual proportion) to visually demonstrate that only nephrons.', 'Trace a cortical nephron\'s loop — it turns back in the outer medulla; trace a juxtamedullary nephron — it descends.', 'Connect to function: "Short loops = no deep gradient contribution; long loops = gradient builders."'], labTask: { instruction: 'On the interactive: increase the filtration flow to 60 — what gets filtered? — then check.', widget: 'nephron', validate: 'nephron:flow=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that *all* nephrons have long loops of Henle extending deep into the medulla, and that the "loop.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The efferent arteriole is narrower than the afferent arteriole solely to increase glomerular filtration rate." Is this fully correct.', answer: 'Partially correct but incomplete',
                  options: ['Partially correct but incomplete', 'loop of Henle'],
                  hint: 'If stuck on kidney histology, revisit Class 9 Animal Tissues (c9_bio_ch2_5, c9_bio_ch2_6).',
                  misconception: 'Students often believe that *all* nephrons have long loops of Henle extending deep into the medulla, and that the "loop of Henle" is.' },
                { id: 'b', prompt: 'Design a simple thought experiment: If you could surgically remove *only* the juxtamedullary nephrons from a healthy human kidney (leaving all cortical.', answer: 'total GFR, (',
                  options: ['total GFR, (', 'loop of Henle'],
                  hint: 'If stuck on kidney histology, revisit Class 9 Animal Tissues (c9_bio_ch2_5, c9_bio_ch2_6).',
                  misconception: 'Students often believe that *all* nephrons have long loops of Henle extending deep into the medulla, and that the "loop of Henle" is.' }
          ],
            remediations: { 'all-nephrons-have-long-loops': { steps: ['Show students a histological cross-section of kidney cortex vs.', 'Use a nephron distribution diagram (NCERT Fig 16.3 vs. actual proportion) to visually demonstrate that only nephrons.', 'Trace a cortical nephron\'s loop — it turns back in the outer medulla; trace a juxtamedullary nephron — it descends.', 'Connect to function: "Short loops = no deep gradient contribution; long loops = gradient builders."'], labTask: { instruction: 'On the interactive: increase the filtration flow to 60 — what gets filtered? — then check.', widget: 'nephron', validate: 'nephron:flow=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_002', difficulty: 'standard',
          question: 'A nephron is the microscopic structural and functional unit of the kidney.',
          hint: 'If stuck on epithelial structure-function links, revisit c9_bio_ch2_5 (Animal Tissues.',
          misconception: '**Misconception:** "The loop of Henle *concentrates* the filtrate throughout its length." Students think filtrate gets.',
          parts: [
                { id: 'a', prompt: 'A patient has a congenital defect where the tight junctions between PCT epithelial cells are "leaky" (abnormally high paracellular permeability).', answer: 'glucose reabsorption, (',
                  options: ['glucose reabsorption, (', 'The loop of Henle *concentrates* the filtrate throughout its length', 'filtrate gets progressively more concentrated'],
                  hint: 'If stuck on epithelial structure-function links, revisit c9_bio_ch2_5 (Animal Tissues: Epithelial.',
                  misconception: '**Misconception:** "The loop of Henle *concentrates* the filtrate throughout its length." Students think filtrate gets progressively more.' }
          ],
            remediations: { 'misconception-the-loop-of-henle': { steps: ['**Visualise the "U-turn":** Draw a large U-shaped loop on paper.', 'Label descending limb: "H₂O OUT only → filtrate CONCENTRATES".', 'Label ascending limb: "NaCl OUT only (active) → filtrate DILUTES".', 'Use two coloured pens (blue for water, red for salt).'], labTask: { instruction: 'On the interactive: increase the filtration flow to 60 — what gets filtered? — then check.', widget: 'nephron', validate: 'nephron:flow=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_003', difficulty: 'standard',
          question: 'Glomerular filtration is the passive, non-selective process where blood plasma.',
          hint: 'Review "Capillary Exchange" in Class 11 Physics (if covered) or Class 10 Biology.',
          misconception: 'Students often believe that "filtration fraction = GFR/RPF" is constant, and therefore if GFR falls, renal plasma flow.',
          parts: [
                { id: 'a', prompt: 'What is the normal glomerular filtration rate (GFR) in a healthy adult human, and what fraction of cardiac output does renal blood flow represent?', answer: 'Normal GFR ≈ 125 mL/min (180 L/day)',
                  options: ['Normal GFR ≈ 125 mL/min (180 L/day)', 'GFR = 1.5 L/day', 'renal flow = 5% of cardiac output', 'filtration fraction = GFR/RPF'],
                  hint: 'Review "Capillary Exchange" in Class 11 Physics (if covered) or Class 10 Biology.',
                  misconception: 'Students often believe that "filtration fraction = GFR/RPF" is constant, and therefore if GFR falls, renal plasma flow (RPF) must fall.' }
          ],
            remediations: { 'filtration-fraction-gfr-rpf-is': { steps: ['Draw a glomerulus with afferent/efferent arterioles labeled R_A and R_E.', 'Write Ohm\'s law analog: P_GC = (R_E/(R_A+R_E)) × P_A + (R_A/(R_A+R_E)) × P_V (P_A = arterial pressure, P_V = venous.', 'Show mathematically: increasing R_E raises P_GC more than increasing R_A lowers it.', 'Calculate FF = GFR/RPF = Kf × NFP / RPF.'], labTask: { instruction: 'On the interactive: increase the filtration flow to 60 — what gets filtered? — then check.', widget: 'nephron', validate: 'nephron:flow=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_004', difficulty: 'standard',
          question: 'Tubular reabsorption is the selective process by which the renal tubules.',
          hint: 'If stuck, revisit c11_bio_cbse_16_002 (nephron segment histology) and c9_bio_ch1_3.',
          misconception: 'Students believe "water follows salt passively everywhere in the nephron" and fail to recognize that water permeability.',
          parts: [
                { id: 'a', prompt: 'Name the specific nephron segment where 100% of filtered glucose is normally reabsorbed, and identify the transport mechanism (including the co-transported.', answer: 'Proximal convoluted tubule (PCT)',
                  options: ['Proximal convoluted tubule (PCT)', 'facilitated diffusion alone', 'water follows salt passively everywhere in the nephron', 'less Na+ reabsorption'],
                  hint: 'If stuck, revisit c11_bio_cbse_16_002 (nephron segment histology) and c9_bio_ch1_3 (membrane.',
                  misconception: 'Students believe "water follows salt passively everywhere in the nephron" and fail to recognize that water permeability is segment-specific.' },
                { id: 'b', prompt: 'A patient takes a loop diuretic (furosemide) that inhibits NKCC2 in the thick ascending limb.', answer: 'medullary interstitial osmolarity, (',
                  options: ['medullary interstitial osmolarity, (', 'water follows salt passively everywhere in the nephron', 'less Na+ reabsorption'],
                  hint: 'If stuck, revisit c11_bio_cbse_16_002 (nephron segment histology) and c9_bio_ch1_3 (membrane.',
                  misconception: 'Students believe "water follows salt passively everywhere in the nephron" and fail to recognize that water permeability is segment-specific.' }
          ],
            remediations: { 'water-follows-salt-passively-everywhere': { steps: ['Draw a nephron cross-section table with columns: Segment, Apical Transporters, Basolateral Transporters, Water.', 'For each segment, write the net effect on filtrate osmolarity and volume.', 'Test yourself — cover the table and predict what happens to urine volume/osmolarity if ADH is absent, if NKCC2.', 'Re-read NCERT Figure 16.5 focusing on arrow directions (reabsorption vs secretion) and colours (water vs solutes) until.'], labTask: { instruction: 'On the interactive: increase the filtration flow to 60 — what gets filtered? — then check.', widget: 'nephron', validate: 'nephron:flow=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_005', difficulty: 'standard',
          question: 'Regulation of kidney function refers to the hormonal feedback mechanisms.',
          hint: 'Review the counter-current multiplier (c11_bio_cbse_16_004) and JGA structure.',
          misconception: 'Students often believe that ADH increases urine output (diuresis) because its name "antidiuretic" is misinterpreted.',
          parts: [
                { id: 'a', prompt: 'Name the hormone released by the neurohypophysis in response to increased blood osmolarity and state its primary action on the nephron.', answer: 'Antidiuretic hormone (ADH) or vasopressin is released',
                  options: ['Antidiuretic hormone (ADH) or vasopressin is released', 'antidiuretic', 'against diuresis', 'aldosterone or saying ADH causes diuresis'],
                  hint: 'Review the counter-current multiplier (c11_bio_cbse_16_004) and JGA structure (c11_bio_cbse_16_003).',
                  misconception: 'Students often believe that ADH increases urine output (diuresis) because its name "antidiuretic" is misinterpreted as "against diuresis".' },
                { id: 'b', prompt: 'Explain why a fall in glomerular blood pressure triggers renin release from JG cells, and describe the two major effects of angiotensin II on kidney function.', answer: 'JG cells are modified smooth muscle cells of the afferent arteriole that act as',
                  options: ['JG cells are modified smooth muscle cells of the afferent arteriole that act as', 'antidiuretic', 'against diuresis'],
                  hint: 'Review the counter-current multiplier (c11_bio_cbse_16_004) and JGA structure (c11_bio_cbse_16_003).',
                  misconception: 'Students often believe that ADH increases urine output (diuresis) because its name "antidiuretic" is misinterpreted as "against diuresis".' },
                { id: 'c', prompt: 'Compare and contrast the triggers, sources, and renal targets of ADH and ANF. Why is ANF considered a physiological antagonist of RAAS?', answer: 'ADH: triggered by high plasma osmolarity/low volume',
                  options: ['ADH: triggered by high plasma osmolarity/low volume', 'antidiuretic', 'against diuresis'],
                  hint: 'Review the counter-current multiplier (c11_bio_cbse_16_004) and JGA structure (c11_bio_cbse_16_003).',
                  misconception: 'Students often believe that ADH increases urine output (diuresis) because its name "antidiuretic" is misinterpreted as "against diuresis".' }
          ],
            remediations: { 'adh-increases-urine-output-diuresis': { steps: ['Revisit the meaning of "antidiuretic" — break the word: anti- (against) + diuretic (urine-promoting) = against urine.', 'Draw a two-column table: ADH vs aldosterone — list hormone, stimulus, source, target cells, molecular action (aquaporin.', 'Sketch the RAAS flowchart with three trigger pathways: (a) renal baroreceptor (JG cell stretch), (b) macula densa (low.', 'Practice explaining aloud: "Low BP → renin → angiotensin II → aldosterone → Na⁺ reabsorption → water follows IF ADH.'], labTask: { instruction: 'On the interactive: increase the filtration flow to 60 — what gets filtered? — then check.', widget: 'nephron', validate: 'nephron:flow=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_006', difficulty: 'standard',
          question: 'Urine composition refers to the quantitative and qualitative profile.',
          hint: 'If stuck, revisit the "Reabsorption and secretion of major substances at different parts.',
          misconception: 'Students believe that "urine composition is fixed" — i.e., the kidney produces urine of constant composition regardless.',
          parts: [
                { id: 'a', prompt: 'An APPLY level question: A patient\'s 24-hour urine shows: volume 1.2 L, urea 18 g, creatinine 0.8 g, glucose 45 g, ketones positive.', answer: 'Correct answer: Diabetes mellitus (uncontrolled)',
                  options: ['Correct answer: Diabetes mellitus (uncontrolled)', 'urine composition is fixed', '"urine composition is fixed"'],
                  hint: 'If stuck, revisit the "Reabsorption and secretion of major substances at different parts of the.',
                  misconception: 'Students believe that "urine composition is fixed" — i.e., the kidney produces urine of constant composition regardless of hydration, diet.' }
          ],
            remediations: { 'urine-composition-is-fixed-i': { steps: ['Revisit the counter-current mechanism (node 16_004) and ADH action (node 16_005) — observe how medullary gradient + ADH.', 'Create a table: "Condition → Hormone → Tubular Effect → Urine Change" for 4 scenarios: (a) water loading, (b).', 'Solve a numerical: "If GFR = 125 mL/min, plasma urea = 30 mg/dL, urine volume = 1.5 L/day, urine urea = 20 g/day →.'], labTask: { instruction: 'On the interactive: increase the filtration flow to 60 — what gets filtered? — then check.', widget: 'nephron', validate: 'nephron:flow=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
