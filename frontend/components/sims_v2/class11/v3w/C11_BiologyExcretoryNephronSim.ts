import type { SimDef } from '../../engine/types';
import C11_BiologyExcretoryNephronSim from '../../../simulations/c6_12/C11_BiologyExcretoryNephronSim';

/** v3 wrapped master — C11_BiologyExcretoryNephronSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biologyexcretorynephronsim: SimDef = {
    id: 'v3w_c11_biologyexcretorynephronsim',
    title: 'Human Excretory System: Kidney Structure',
    subtitle: 'This node covers the gross and microscopic anatomy of the human kidney and excretory.',
    classLevel: 11, subject: 'biology', topic: 'Human Excretory System: Kidney Structure',
    chapters: [],
    nodeIds: ['c11_bio_cbse_16_001', 'c11_bio_cbse_07_009', 'c11_bio_cbse_16_002', 'c11_bio_cbse_16_004', 'c11_bio_cbse_16_005', 'c11_bio_cbse_16_008', 'c11_bio_cbse_07_005', 'c11_bio_cbse_07_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Begin by asking students to place their hands on their lower back, just below the rib cage — this is where.', goal: 'Master Human Excretory System: Kidney Structure.' },
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
        { type: 'scaffold', nodeId: 'c11_bio_cbse_07_009', title: 'The frog\'s nervous system comprises a.',
          scaffold: { problem: 'A frog\'s optic lobe is experimentally lesioned. Predict the effect on its feeding behaviour and explain the neural basis.',
            steps: [
            { text: 'Identify the sensory modality involved in detecting prey – vision.' },
            { text: 'Recall that the optic nerve (cranial nerve II) carries visual information to the optic lobes in the midbrain.' },
            { text: 'Recognise that the optic lobes are the primary visual processing centres in the frog brain.' },
            { text: 'Deduce that lesioning the optic lobes disrupts visual processing, so the frog cannot detect or accurately strike at.' },
            { text: 'Conclude that feeding behaviour relying on visual cues will be severely impaired, though olfactory or tactile cues.', faded: true, blankAnswer: 'The frog will lose its ability to visually detect and.' }
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
          dissect: { specimen: 'Human Excretory System: Kidney Structure', spots: [
            { id: 's1', label: 'The human excretory system consists', prompt: 'Which idea is this? — The human excretory system consists of a pair of bean-shaped kidneys located.', answer: 'The human excretory system consists', options: ['The human excretory system consists', 'The frogs nervous system comprises', 'A nephron is the microscopic', 'Tubular reabsorption is the selective'] },
            { id: 's2', label: 'The frogs nervous system comprises', prompt: 'Which idea is this? — The frog\'s nervous system comprises a central nervous system (brain and spinal cord), a.', answer: 'The frogs nervous system comprises', options: ['The frogs nervous system comprises', 'The human excretory system consists', 'A nephron is the microscopic', 'Tubular reabsorption is the selective'] },
            { id: 's3', label: 'A nephron is the microscopic', prompt: 'Which idea is this? — A nephron is the microscopic structural and functional unit of the kidney, composed of a.', answer: 'A nephron is the microscopic', options: ['A nephron is the microscopic', 'The human excretory system consists', 'The frogs nervous system comprises', 'Tubular reabsorption is the selective'] },
            { id: 's4', label: 'Tubular reabsorption is the selective', prompt: 'Which idea is this? — Tubular reabsorption is the selective process by which the renal tubules reclaim.', answer: 'Tubular reabsorption is the selective', options: ['Tubular reabsorption is the selective', 'The human excretory system consists', 'The frogs nervous system comprises', 'A nephron is the microscopic'] },
            { id: 's5', label: 'Regulation of kidney function refers', prompt: 'Which idea is this? — Regulation of kidney function refers to the hormonal feedback mechanisms (primarily ADH,.', answer: 'Regulation of kidney function refers', options: ['Regulation of kidney function refers', 'The human excretory system consists', 'The frogs nervous system comprises', 'A nephron is the microscopic'] },
            { id: 's6', label: 'Accessory excretory organs are non-renal', prompt: 'Which idea is this? — Accessory excretory organs are non-renal structures (lungs, liver, skin) that eliminate.', answer: 'Accessory excretory organs are non-renal', options: ['Accessory excretory organs are non-renal', 'The human excretory system consists', 'The frogs nervous system comprises', 'A nephron is the microscopic'] }
          ] } }
    ],
    explore: { component: C11_BiologyExcretoryNephronSim, prompt: 'Explore the interactive — Human Excretory System: Kidney Structure' },
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
        { type: 'subpart', nodeId: 'c11_bio_cbse_07_009', difficulty: 'standard',
          question: 'The frog\'s nervous system comprises a central nervous system (brain and spinal.',
          hint: 'Review Class 10 neural control and coordination (reflex arc, brain parts) and excretory.',
          misconception: 'Students often think the frog\'s brain is a simpler version of the human brain with the same parts just smaller.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The frog\'s nervous system comprises a central nervous system (brain and spinal cord), a',
                  options: ['The frog\'s nervous system comprises a central nervous system (brain and spinal cord), a', 'The human excretory system consists of a pair of bean-shaped kidneys located', 'A nephron is the microscopic structural and functional unit of the kidney, composed of a', 'Tubular reabsorption is the selective process by'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the frog\'s brain is a simpler version of the human brain with the same parts just smaller.' }
          ],
            remediations: { 'the-frog-s-brain-is': { steps: ['Draw side‑by‑side diagrams of frog and human brains, labelling optic lobes, olfactory lobes, cerebral hemispheres,.', 'Use a table to compare nephron structure: list "loop of Henle", "collecting duct", "glomerulus" and mark present/absent.', 'Watch a 2‑minute video of frog feeding (showing tongue projection) and identify the cranial nerves involved.', 'Re‑read the NCERT paragraph on excretory system and highlight the words "urinogenital duct", "cloaca", "urinary.'] } } },
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
