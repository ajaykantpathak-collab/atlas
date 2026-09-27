import type { SimDef } from '../../engine/types';
import C11_BiologyNephronFiltrationSim from '../../../simulations/three/C11_BiologyNephronFiltrationSim';

/** v3 wrapped master — C11_BiologyNephronFiltrationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biologynephronfiltrationsim: SimDef = {
    id: 'v3w_c11_biologynephronfiltrationsim',
    title: 'Nephron Filtration',
    subtitle: 'This node covers the gross and microscopic anatomy of the human kidney and excretory.',
    classLevel: 11, subject: 'biology', topic: 'Human Excretory System: Kidney Structure',
    chapters: [],
    nodeIds: ['c11_bio_cbse_16_001', 'c11_bio_cbse_16_002', 'c11_bio_cbse_16_004', 'c11_bio_cbse_16_005', 'c11_bio_cbse_16_003', 'c11_bio_cbse_16_006', 'c11_bio_cbse_16_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Begin by asking students to place their hands on their lower back, just below the rib cage — this is where.', goal: 'Master Nephron Filtration.' },
    discovery: {
        question: 'A patient has a congenital defect where the tight junctions between PCT epithelial cells are "leaky" (abnormally high paracellular permeability).',
        options: ['glucose reabsorption, (', 'The loop of Henle *concentrates* the filtrate throughout its length', 'filtrate gets progressively more concentrated'],
        answer: 'glucose reabsorption, (',
        hook: '**Misconception:** "The loop of Henle *concentrates* the filtrate throughout its length." Students think filtrate gets.',
    },
    teaching: [
        { title: 'The human excretory system consists of a.', text: 'The human excretory system consists of a pair of bean-shaped kidneys located retroperitoneally between the last thoracic and third lumbar vertebrae, each containing approximately one million nephrons.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bio_cbse_16_001', title: 'The human excretory system consists of.',
          scaffold: { problem: 'A 25-year-old male undergoes a kidney donation evaluation. CT angiography shows his left kidney has a single renal artery, but the right.',
            steps: [
            { text: 'Recall that renal arteries branch into segmental arteries (superior, anterosuperior, anteroinferior, inferior,.' },
            { text: 'Recognize that multiple renal arteries (accessory arteries) usually arise directly from the aorta and enter the kidney.' },
            { text: 'Analyze donor risk: A kidney with a single renal artery leaves the donor with a kidney that has normal single-artery.' },
            { text: 'Analyze recipient surgery: Transplanting a single-artery kidney requires only one arterial anastomosis (to iliac.' },
            { text: 'Consider segmental infarction risk: Accessory arteries often supply polar segments; if one thromboses post-transplant,.' },
            { text: 'Conclude: The LEFT kidney (single renal artery) is preferable for both donor safety (remaining kidney has standard.', faded: true, blankAnswer: 'Harvest the LEFT kidney (single renal artery). It offers.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_16_002', title: 'A nephron is the microscopic structural.',
          scaffold: { problem: 'A researcher isolates a single cortical nephron and perfuses its tubule with artificial filtrate containing 5 mM glucose, 140 mM Na⁺, and.',
            steps: [
            { text: 'Identify the segment responsible for glucose reabsorption. Glucose is reabsorbed almost exclusively in the PCT via.' },
            { text: 'Recall the transport maximum (Tm) for glucose. In humans, Tm for glucose is ~375 mg/min (≈ 2.1 mM at normal GFR).' },
            { text: 'Apply to PCT. Since filtered load << Tm, *all* glucose is reabsorbed in PCT. Glucose concentration at end of PCT = 0 mM.' },
            { text: 'Trace downstream. No glucose enters loop of Henle, DCT, or collecting duct (no glucose transporters expressed there).' },
            { text: 'Verify with clinical correlation. This matches normal physiology: zero glucose in urine (glycosuria only appears when.', faded: true, blankAnswer: 'Glucose concentration: End of PCT = 0 mM; End of Loop of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_16_004', title: 'Tubular reabsorption is the selective.',
          scaffold: { problem: 'A healthy 70 kg male has GFR = 125 mL/min, plasma [glucose] = 5 mmol/L, plasma [Na+] = 140 mmol/L.',
            steps: [
            { text: 'Calculate filtered load = GFR × Plasma concentration. Glucose: 125 mL/min × 5 mmol/L = 125 × 0.005 mmol/min = 0.625.' },
            { text: 'Calculate excretion rate = Urine flow × Urine concentration. Glucose: 1.5 × 0 = 0 mmol/min.' },
            { text: 'Reabsorption rate = Filtered load - Excretion rate. Glucose: 0.625 - 0 = 0.625 mmol/min.' },
            { text: 'Fractional reabsorption = (Reabsorption rate / Filtered load) × 100. Glucose: (0.625/0.625)×100 = 100%.' },
            { text: 'Interpret: Glucose is completely reabsorbed via high-affinity SGLT2 in PCT until transport maximum (Tm) is reached (~11.', faded: true, blankAnswer: '(a) Glucose filtered load = 0.625 mmol/min; Na+ filtered.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_16_005', title: 'Regulation of kidney function refers to.',
          scaffold: { problem: 'A marathon runner loses 3 L of sweat (hypotonic fluid) during a race in 35°C heat. She drinks only 500 mL water at the finish.',
            steps: [
            { text: 'Identify the primary disturbance — loss of hypotonic sweat increases plasma osmolarity and decreases blood volume.' },
            { text: 'Determine sensors activated — hypothalamic osmoreceptors detect high osmolarity; atrial baroreceptors and JG cells.' },
            { text: 'Trace ADH pathway — osmoreceptors stimulate neurohypophysis → ADH release → aquaporin-2 insertion in collecting ducts →.' },
            { text: 'Trace RAAS pathway — JG cells release renin → angiotensin II formation → efferent arteriole constriction (maintains.' },
            { text: 'Integrate ANF — atrial stretch is low, so ANF secretion is suppressed, removing its inhibitory effect on RAAS.' },
            { text: 'Synthesize outcome — both hormones promote water and Na⁺ retention; urine volume will be very low (< 0.5 mL/min) and.', faded: true, blankAnswer: 'Urine volume drastically reduced (oliguria), urine.' }
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
        { type: 'dissect', nodeId: 'c11_bio_cbse_16_002', title: 'Identify each idea',
          dissect: { specimen: 'Nephron Filtration', spots: [
            { id: 's1', label: 'The human excretory system consists', prompt: 'Which idea is this? — The human excretory system consists of a pair of bean-shaped kidneys located.', answer: 'The human excretory system consists', options: ['The human excretory system consists', 'A nephron is the microscopic', 'Tubular reabsorption is the selective', 'Regulation of kidney function refers'] },
            { id: 's2', label: 'A nephron is the microscopic', prompt: 'Which idea is this? — A nephron is the microscopic structural and functional unit of the kidney, composed of a.', answer: 'A nephron is the microscopic', options: ['A nephron is the microscopic', 'The human excretory system consists', 'Tubular reabsorption is the selective', 'Regulation of kidney function refers'] },
            { id: 's3', label: 'Tubular reabsorption is the selective', prompt: 'Which idea is this? — Tubular reabsorption is the selective process by which the renal tubules reclaim.', answer: 'Tubular reabsorption is the selective', options: ['Tubular reabsorption is the selective', 'The human excretory system consists', 'A nephron is the microscopic', 'Regulation of kidney function refers'] },
            { id: 's4', label: 'Regulation of kidney function refers', prompt: 'Which idea is this? — Regulation of kidney function refers to the hormonal feedback mechanisms (primarily ADH,.', answer: 'Regulation of kidney function refers', options: ['Regulation of kidney function refers', 'The human excretory system consists', 'A nephron is the microscopic', 'Tubular reabsorption is the selective'] },
            { id: 's5', label: 'Glomerular filtration is the passive', prompt: 'Which idea is this? — Glomerular filtration is the passive, non-selective process where blood plasma is forced.', answer: 'Glomerular filtration is the passive', options: ['Glomerular filtration is the passive', 'The human excretory system consists', 'A nephron is the microscopic', 'Tubular reabsorption is the selective'] },
            { id: 's6', label: 'Urine composition refers to the', prompt: 'Which idea is this? — Urine composition refers to the quantitative and qualitative profile of dissolved solutes.', answer: 'Urine composition refers to the', options: ['Urine composition refers to the', 'The human excretory system consists', 'A nephron is the microscopic', 'Tubular reabsorption is the selective'] }
          ] } }
    ],
    explore: { component: C11_BiologyNephronFiltrationSim, prompt: 'Explore the interactive — Nephron Filtration' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_001', difficulty: 'standard',
          question: 'The human excretory system consists of a pair of bean-shaped kidneys located.',
          hint: 'If stuck on kidney histology, revisit Class 9 Animal Tissues (c9_bio_ch2_5, c9_bio_ch2_6).',
          misconception: 'Students often believe that *all* nephrons have long loops of Henle extending deep into the medulla, and that the "loop.',
          parts: [
                { id: 'a', prompt: 'A student draws a longitudinal section of the human kidney and labels the "renal pelvis" as the space *inside* the medullary pyramids. Is this correct?', answer: 'No, this is incorrect',
                  options: ['No, this is incorrect', 'loop of Henle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that *all* nephrons have long loops of Henle extending deep into the medulla, and that the "loop of Henle" is a.' },
                { id: 'b', prompt: 'Compare cortical nephrons and juxtamedullary nephrons across *four* structural features: (a) location of glomerulus, (b) length of loop of Henle, (c).', answer: 'location of glomerulus, (',
                  options: ['location of glomerulus, (', 'loop of Henle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that *all* nephrons have long loops of Henle extending deep into the medulla, and that the "loop of Henle" is a.' }
          ],
            remediations: { 'all-nephrons-have-long-loops': { steps: ['Show students a histological cross-section of kidney cortex vs.', 'Use a nephron distribution diagram (NCERT Fig 16.3 vs. actual proportion) to visually demonstrate that only nephrons.', 'Trace a cortical nephron\'s loop — it turns back in the outer medulla; trace a juxtamedullary nephron — it descends to.', 'Connect to function: "Short loops = no deep gradient contribution; long loops = gradient builders."', 'Ask: "If all nephrons had long loops, where would all the glomeruli fit?" — cortex would be too crowded.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that *all* nephrons have long loops of Henle extending deep into the medulla, and that the "loop.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The efferent arteriole is narrower than the afferent arteriole solely to increase glomerular filtration rate." Is this fully correct,.', answer: 'Partially correct but incomplete',
                  options: ['Partially correct but incomplete', 'loop of Henle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that *all* nephrons have long loops of Henle extending deep into the medulla, and that the "loop of Henle" is a.' },
                { id: 'b', prompt: 'Design a simple thought experiment: If you could surgically remove *only* the juxtamedullary nephrons from a healthy human kidney (leaving all cortical.', answer: 'total GFR, (',
                  options: ['total GFR, (', 'loop of Henle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that *all* nephrons have long loops of Henle extending deep into the medulla, and that the "loop of Henle" is a.' },
                { id: 'c', prompt: 'Compare cortical nephrons and juxtamedullary nephrons across *four* structural features: (a) location of glomerulus, (b) length of loop of Henle, (c).', answer: 'location of glomerulus, (',
                  options: ['location of glomerulus, (', 'loop of Henle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that *all* nephrons have long loops of Henle extending deep into the medulla, and that the "loop of Henle" is a.' }
          ],
            remediations: { 'all-nephrons-have-long-loops': { steps: ['Show students a histological cross-section of kidney cortex vs.', 'Use a nephron distribution diagram (NCERT Fig 16.3 vs. actual proportion) to visually demonstrate that only nephrons.', 'Trace a cortical nephron\'s loop — it turns back in the outer medulla; trace a juxtamedullary nephron — it descends to.', 'Connect to function: "Short loops = no deep gradient contribution; long loops = gradient builders."', 'Ask: "If all nephrons had long loops, where would all the glomeruli fit?" — cortex would be too crowded.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_002', difficulty: 'standard',
          question: 'A nephron is the microscopic structural and functional unit of the kidney,.',
          hint: 'If stuck on epithelial structure-function links, revisit c9_bio_ch2_5 (Animal Tissues:.',
          misconception: '**Misconception:** "The loop of Henle *concentrates* the filtrate throughout its length." Students think filtrate gets.',
          parts: [
                { id: 'a', prompt: 'A patient has a congenital defect where the tight junctions between PCT epithelial cells are "leaky" (abnormally high paracellular permeability).', answer: 'glucose reabsorption, (',
                  options: ['glucose reabsorption, (', 'The loop of Henle *concentrates* the filtrate throughout its length', 'filtrate gets progressively more concentrated'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The loop of Henle *concentrates* the filtrate throughout its length." Students think filtrate gets progressively more.' }
          ],
            remediations: { 'misconception-the-loop-of-henle': { steps: ['**Visualise the "U-turn":** Draw a large U-shaped loop on paper.', 'Label descending limb: "H₂O OUT only → filtrate CONCENTRATES".', 'Label ascending limb: "NaCl OUT only (active) → filtrate DILUTES".', 'Use two coloured pens (blue for water, red for salt).'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "The loop of Henle *concentrates* the filtrate throughout its length." Students think filtrate gets.',
          parts: [
                { id: 'a', prompt: 'Design a thought experiment (using only physiological principles, no modern tech) to demonstrate that the *collecting duct* is the site where final urine.', answer: '**Experiment:** Isolate perfused kidney tubules (conceptually)',
                  options: ['**Experiment:** Isolate perfused kidney tubules (conceptually)', 'The loop of Henle *concentrates* the filtrate throughout its length', 'filtrate gets progressively more concentrated'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The loop of Henle *concentrates* the filtrate throughout its length." Students think filtrate gets progressively more.' }
          ],
            remediations: { 'misconception-the-loop-of-henle': { steps: ['**Visualise the "U-turn":** Draw a large U-shaped loop on paper.', 'Label descending limb: "H₂O OUT only → filtrate CONCENTRATES".', 'Label ascending limb: "NaCl OUT only (active) → filtrate DILUTES".', 'Use two coloured pens (blue for water, red for salt).'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_004', difficulty: 'standard',
          question: 'Tubular reabsorption is the selective process by which the renal tubules.',
          hint: 'If stuck, revisit c11_bio_cbse_16_002 (nephron segment histology) and c9_bio_ch1_3.',
          misconception: 'Students believe "water follows salt passively everywhere in the nephron" and fail to recognize that water permeability.',
          parts: [
                { id: 'a', prompt: 'Name the specific nephron segment where 100% of filtered glucose is normally reabsorbed, and identify the transport mechanism (including the co-transported.', answer: 'Proximal convoluted tubule (PCT)',
                  options: ['Proximal convoluted tubule (PCT)', 'facilitated diffusion alone', 'water follows salt passively everywhere in the nephron'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "water follows salt passively everywhere in the nephron" and fail to recognize that water permeability is segment-specific.' },
                { id: 'b', prompt: 'A patient takes a loop diuretic (furosemide) that inhibits NKCC2 in the thick ascending limb.', answer: 'medullary interstitial osmolarity, (',
                  options: ['medullary interstitial osmolarity, (', 'water follows salt passively everywhere in the nephron', 'less Na+ reabsorption'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "water follows salt passively everywhere in the nephron" and fail to recognize that water permeability is segment-specific.' }
          ],
            remediations: { 'water-follows-salt-passively-everywhere': { steps: ['Draw a nephron cross-section table with columns: Segment, Apical Transporters, Basolateral Transporters, Water.', 'For each segment, write the net effect on filtrate osmolarity and volume.', 'Test yourself — cover the table and predict what happens to urine volume/osmolarity if ADH is absent, if NKCC2 is.', 'Re-read NCERT Figure 16.5 focusing on arrow directions (reabsorption vs secretion) and colours (water vs solutes) until.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "water follows salt passively everywhere in the nephron" and fail to recognize that water permeability.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Aldosterone increases Na+ reabsorption in the collecting duct solely by inserting ENaC channels into the apical membrane." Identify.', answer: 'Partially correct but incomplete',
                  options: ['Partially correct but incomplete', 'water follows salt passively everywhere in the nephron', 'less Na+ reabsorption'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "water follows salt passively everywhere in the nephron" and fail to recognize that water permeability is segment-specific.' }
          ],
            remediations: { 'water-follows-salt-passively-everywhere': { steps: ['Draw a nephron cross-section table with columns: Segment, Apical Transporters, Basolateral Transporters, Water.', 'For each segment, write the net effect on filtrate osmolarity and volume.', 'Test yourself — cover the table and predict what happens to urine volume/osmolarity if ADH is absent, if NKCC2 is.', 'Re-read NCERT Figure 16.5 focusing on arrow directions (reabsorption vs secretion) and colours (water vs solutes) until.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_005', difficulty: 'standard',
          question: 'Regulation of kidney function refers to the hormonal feedback mechanisms.',
          hint: 'Review the counter-current multiplier (c11_bio_cbse_16_004) and JGA structure.',
          misconception: 'Students often believe that ADH increases urine output (diuresis) because its name "antidiuretic" is misinterpreted as.',
          parts: [
                { id: 'a', prompt: 'Name the hormone released by the neurohypophysis in response to increased blood osmolarity and state its primary action on the nephron.', answer: 'Antidiuretic hormone (ADH) or vasopressin is released',
                  options: ['Antidiuretic hormone (ADH) or vasopressin is released', 'antidiuretic', 'against diuresis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that ADH increases urine output (diuresis) because its name "antidiuretic" is misinterpreted as "against diuresis".' },
                { id: 'b', prompt: 'Explain why a fall in glomerular blood pressure triggers renin release from JG cells, and describe the two major effects of angiotensin II on kidney function.', answer: 'JG cells are modified smooth muscle cells of the afferent arteriole that act as',
                  options: ['JG cells are modified smooth muscle cells of the afferent arteriole that act as', 'antidiuretic', 'against diuresis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that ADH increases urine output (diuresis) because its name "antidiuretic" is misinterpreted as "against diuresis".' },
                { id: 'c', prompt: 'Compare and contrast the triggers, sources, and renal targets of ADH and ANF. Why is ANF considered a physiological antagonist of RAAS?', answer: 'ADH: triggered by high plasma osmolarity/low volume',
                  options: ['ADH: triggered by high plasma osmolarity/low volume', 'antidiuretic', 'against diuresis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that ADH increases urine output (diuresis) because its name "antidiuretic" is misinterpreted as "against diuresis".' }
          ],
            remediations: { 'adh-increases-urine-output-diuresis': { steps: ['Revisit the meaning of "antidiuretic" — break the word: anti- (against) + diuretic (urine-promoting) = against urine.', 'Draw a two-column table: ADH vs aldosterone — list hormone, stimulus, source, target cells, molecular action (aquaporin.', 'Sketch the RAAS flowchart with three trigger pathways: (a) renal baroreceptor (JG cell stretch), (b) macula densa (low.', 'Practice explaining aloud: "Low BP → renin → angiotensin II → aldosterone → Na⁺ reabsorption → water follows IF ADH.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that ADH increases urine output (diuresis) because its name "antidiuretic" is misinterpreted as.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "ADH and aldosterone both increase water reabsorption, so they are functionally redundant." Provide two distinct reasons why this is.', answer: 'The statement is false',
                  options: ['The statement is false', 'antidiuretic', 'against diuresis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that ADH increases urine output (diuresis) because its name "antidiuretic" is misinterpreted as "against diuresis".' },
                { id: 'b', prompt: 'Design a simple experiment using a human volunteer to demonstrate the effect of ADH on urine output and osmolarity.', answer: 'Control: volunteer drinks 500 mL water after overnight fast',
                  options: ['Control: volunteer drinks 500 mL water after overnight fast', 'antidiuretic', 'against diuresis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that ADH increases urine output (diuresis) because its name "antidiuretic" is misinterpreted as "against diuresis".' }
          ],
            remediations: { 'adh-increases-urine-output-diuresis': { steps: ['Revisit the meaning of "antidiuretic" — break the word: anti- (against) + diuretic (urine-promoting) = against urine.', 'Draw a two-column table: ADH vs aldosterone — list hormone, stimulus, source, target cells, molecular action (aquaporin.', 'Sketch the RAAS flowchart with three trigger pathways: (a) renal baroreceptor (JG cell stretch), (b) macula densa (low.', 'Practice explaining aloud: "Low BP → renin → angiotensin II → aldosterone → Na⁺ reabsorption → water follows IF ADH.'] } } },
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
        { type: 'subpart', nodeId: 'c11_bio_cbse_16_006', difficulty: 'standard',
          question: 'Urine composition refers to the quantitative and qualitative profile of.',
          hint: 'If stuck, revisit the "Reabsorption and secretion of major substances at different parts.',
          misconception: 'Students believe that "urine composition is fixed" — i.e., the kidney produces urine of constant composition regardless.',
          parts: [
                { id: 'a', prompt: 'An APPLY level question: A patient\'s 24-hour urine shows: volume 1.2 L, urea 18 g, creatinine 0.8 g, glucose 45 g, ketones positive.', answer: 'Correct answer: Diabetes mellitus (uncontrolled)',
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
                { id: 'a', prompt: 'An EVALUATE level question: A student claims: "Since urine pH is normally acidic (~6.0), the kidney must secrete H⁺ into the filtrate throughout the nephron.".', answer: 'Correct answer: Partially correct but incomplete',
                  options: ['Correct answer: Partially correct but incomplete', 'urine composition is fixed', '"urine composition is fixed"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "urine composition is fixed" — i.e., the kidney produces urine of constant composition regardless of hydration, diet,.' }
          ],
            remediations: { 'urine-composition-is-fixed-i': { steps: ['Revisit the counter-current mechanism (node 16_004) and ADH action (node 16_005) — observe how medullary gradient + ADH.', 'Create a table: "Condition → Hormone → Tubular Effect → Urine Change" for 4 scenarios: (a) water loading, (b).', 'Solve a numerical: "If GFR = 125 mL/min, plasma urea = 30 mg/dL, urine volume = 1.5 L/day, urine urea = 20 g/day →.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
