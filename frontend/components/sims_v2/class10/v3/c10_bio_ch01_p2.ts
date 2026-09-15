import type { SimDef } from '../../engine/types';

/** v3 generated — c10_bio_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_bio_ch01_p2: SimDef = {
    id: 'v3_c10_bio_ch01_p2',
    title: 'Life Processes · Part 2/2',
    subtitle: 'Trace food to energy, and find out what your body throws out and why',
    classLevel: 10, subject: 'biology', topic: 'Life Processes · Part 2/2',
    chapters: ['c10_bio_ch01'],
    nodeIds: ['c10_bio_cbse_01_007', 'c10_bio_cbse_01_008', 'c10_bio_cbse_01_009', 'c10_bio_cbse_01_010', 'c10_bio_cbse_01_011', 'c10_bio_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sports physiologist figuring out what fuels a sprinter', intro: 'A student eats an aloo paratha at 7:30 and is cycling hard by 8:00. Somewhere between the plate and the leg muscles, four life processes are working in perfect relay.', goal: 'Explain how the four life processes interlock, and never again confuse excretion with simply removing undigested food.' },
    discovery: {
        question: 'You ate a samosa an hour ago — where is it right now, doing what?',
        options: ['Being broken into molecules your cells absorb', 'Sitting whole in your stomach', 'Already converted to pure energy', 'Filtered out by the liver'],
        answer: 'Being broken into molecules your cells absorb',
        hook: 'Digestion is disassembly — a samosa becomes glucose, amino acids, and fatty acids on an assembly line.',
    },
    teaching: [
        { title: 'Respiration: Aerobic vs Anaerobic and Energy Release', text: 'Respiration is a catabolic biochemical process in which living cells break down glucose (C₆H₁₂O₆) stepwise to release energy in the form of ATP; aerobic respiration occurs in the presence of oxygen.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_bio_cbse_01_007', title: 'Your mission',
          mission: { widget: 'heart', validate: 'heart:rate=80',
            instruction: 'On the lab: raise the heart rate to 80 bpm — watch the ECG trace.',
        context: 'Push the food to 60% — which organ is it in?',
            observePrompt: 'What did the heart interactive show you?' } },
        { type: 'case', nodeId: 'c10_bio_cbse_01_008', title: 'Respiration in Humans: Respiratory System and Gas Exchange in Alveoli',
          caseStudy: { intro: 'Observe your own breathing: place one hand on your chest and the other on your abdomen.',
            decisions: [{ prompt: 'Name the specific site in the human respiratory system where actual gas exchange between air and blood occurs, and state the approximate.', options: [
                { text: 'The site is the alveoli (alveolar sacs)', outcome: 'The site is the alveoli (alveolar sacs). The respiratory membrane (alveolar epithelium + capillary.' },
                { text: 'trachea', outcome: 'Not quite — Students often think that the air we inhale goes directly into the blood, or that oxygen.', reveals: 'the-air-we-inhale-goes' },
                { text: 'bronchi', outcome: 'Not quite — Students often think that the air we inhale goes directly into the blood, or that oxygen.', reveals: 'the-air-we-inhale-goes' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_01_009', title: 'Transportation in Humans: Heart Structure and Double Circulation',
          caseStudy: { intro: 'Place your fingers on your wrist or neck and feel your pulse — that rhythmic throb is your heart pumping blood.',
            decisions: [{ prompt: 'Name the four chambers of the human heart and state which chamber receives deoxygenated blood from the body.', options: [
                { text: 'The four chambers are right atrium, right ventricle, left atrium, left ventricle', outcome: 'The four chambers are right atrium, right ventricle, left atrium, left ventricle.' },
                { text: 'left atrium receives deoxygenated blood', outcome: 'Not quite — Students often think the heart pumps blood in a single loop: body → heart → lungs → heart → body.', reveals: 'the-heart-pumps-blood-in' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_01_010', title: 'Blood: Composition (RBC, WBC, Platelets, Plasma) and Functions',
          caseStudy: { intro: 'Start by asking the student to recall the last time they got a small cut — they saw red liquid (blood) and later a scab formed.',
            decisions: [{ prompt: 'Name the iron-containing pigment in red blood cells that binds reversibly with oxygen, and state the average lifespan of a human RBC.', options: [
                { text: 'Correct answer: Hemoglobin (or haemoglobin)', outcome: 'Correct answer: Hemoglobin (or haemoglobin); average lifespan is 120 days.' },
                { text: 'hemocyanin', outcome: 'Not quite — Students think "WBCs are only of one type and all WBCs eat bacteria." They write "WBCs engulf.', reveals: 'wbcs-are-only-of-one' },
                { text: 'WBCs are only of one type and all WBCs eat bacteria', outcome: 'Not quite — Students think "WBCs are only of one type and all WBCs eat bacteria." They write "WBCs engulf.', reveals: 'wbcs-are-only-of-one' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_01_011', title: 'Transportation in Plants: Xylem (Water) and Phloem (Food)',
          caseStudy: { intro: 'Imagine a tall coconut tree in Kerala drawing water from deep sandy soil up to its crown 20 meters high without a pump — how does it defy gravity?',
            decisions: [{ prompt: 'Name the two main vascular tissues in plants and state the primary substance each transports.', options: [
                { text: 'Xylem transports water and minerals upward (unidirectional, root to shoot)', outcome: 'Xylem transports water and minerals upward (unidirectional, root to shoot).' },
                { text: 'xylem transports food', outcome: 'Not quite — Students believe **"phloem transports food only downward from leaves to roots"** because textbooks.', reveals: 'phloem-transports-food-only-downward' },
                { text: 'phloem transports water upward only', outcome: 'Not quite — Students believe **"phloem transports food only downward from leaves to roots"** because textbooks.', reveals: 'phloem-transports-food-only-downward' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_01_012', title: 'Excretion in Humans: Kidneys, Nephron and Urine Formation',
          caseStudy: { intro: 'Begin with a relatable observation: "Notice how your urine is dark yellow and less in volume when you play cricket in the summer heat without drinking enough.',
            decisions: [{ prompt: 'Name the functional unit of the human kidney and state its two main structural components that form the renal corpuscle.', options: [
                { text: 'The functional unit is the nephron', outcome: 'The functional unit is the nephron. The renal corpuscle consists of the glomerulus (a capillary.' },
                { text: 'kidney tubule', outcome: 'Not quite — Students often think the kidney "makes" urine by actively secreting wastes into an empty tubule.', reveals: 'the-kidney-makes-urine-by' },
                { text: 'collecting duct', outcome: 'Not quite — Students often think the kidney "makes" urine by actively secreting wastes into an empty tubule.', reveals: 'the-kidney-makes-urine-by' }
            ] }] } },
        { type: 'dissect', nodeId: 'c10_bio_cbse_01_008', title: 'Identify each idea',
          dissect: { specimen: 'Life Processes · Part 2/2', spots: [
            { id: 's1', label: 'Respiration Aerobic vs Anaerobic and Energy Release', prompt: 'Which idea is this? — Respiration is a catabolic biochemical process in which living cells break down glucose.', answer: 'Respiration Aerobic vs Anaerobic and Energy Release', options: ['Respiration Aerobic vs Anaerobic and Energy Release', 'Blood Composition RBC WBC Platelets Plasma and Functions', 'Transportation in Plants Xylem Water and Phloem Food', 'Excretion in Humans Kidneys Nephron and Urine Formation'] },
            { id: 's2', label: 'Blood Composition RBC WBC Platelets Plasma and Functions', prompt: 'Which idea is this? — Blood is a specialized connective tissue composed of a liquid matrix called plasma (55%.', answer: 'Blood Composition RBC WBC Platelets Plasma and Functions', options: ['Blood Composition RBC WBC Platelets Plasma and Functions', 'Respiration Aerobic vs Anaerobic and Energy Release', 'Transportation in Plants Xylem Water and Phloem Food', 'Excretion in Humans Kidneys Nephron and Urine Formation'] },
            { id: 's3', label: 'Transportation in Plants Xylem Water and Phloem Food', prompt: 'Which idea is this? — Transportation in plants is the vital biological process by which water, minerals, and.', answer: 'Transportation in Plants Xylem Water and Phloem Food', options: ['Transportation in Plants Xylem Water and Phloem Food', 'Respiration Aerobic vs Anaerobic and Energy Release', 'Blood Composition RBC WBC Platelets Plasma and Functions', 'Excretion in Humans Kidneys Nephron and Urine Formation'] },
            { id: 's4', label: 'Excretion in Humans Kidneys Nephron and Urine Formation', prompt: 'Which idea is this? — Excretion in humans is the biological process by which metabolic wastes, primarily.', answer: 'Excretion in Humans Kidneys Nephron and Urine Formation', options: ['Excretion in Humans Kidneys Nephron and Urine Formation', 'Respiration Aerobic vs Anaerobic and Energy Release', 'Blood Composition RBC WBC Platelets Plasma and Functions', 'Transportation in Plants Xylem Water and Phloem Food'] }
          ] } },
        { type: 'case', nodeId: 'c10_bio_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Aarav skips breakfast and plays a full football match at school. By half-time his leg muscles are burning and feel heavy, and he is panting hard. His teammate tells him to just breathe faster for a minute and he will be fine.',
            decisions: [{ prompt: 'What is actually happening in his muscles, and what will really help?', options: [
                { text: 'His muscles have outrun their oxygen supply and switched to anaerobic respiration, which releases little energy and produces lactic acid — that acid buildup is the burn. Rest, slow deep breathing, and some food help because the lactic acid must be carried to the liver and broken down using oxygen.', outcome: 'This matches how respiration and transport really work: oxygen delivery is limited by blood flow, not just breathing speed, and clearing lactic acid takes minutes of aerobic respiration.' },
                { text: 'The burn means his muscles ran out of oxygen completely, so breathing as fast as possible will instantly turn the lactic acid back into energy and he can sprint again.', outcome: 'Breathing faster cannot instantly raise oxygen delivery — that depends on the heart and circulation — and lactic acid still has to be processed biochemically, which takes time.', reveals: 'instant-oxygen-fix' },
                { text: 'It is simple dehydration — a big glass of water and the burning will stop immediately.', outcome: 'Water helps hydration but does not remove the lactic acid or restore the glucose his muscles need.', reveals: 'fatigue-is-dehydration' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_01_012', title: 'You made it',
          caseStudy: { intro: 'Ingestion to egestion — your body is a processing plant. Now you know the floor plan.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'heart', prompt: 'Explore the heart interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'heart', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_007', difficulty: 'standard',
          question: 'Respiration is a catabolic biochemical process in which living cells break down.',
          hint: 'Revisit Class 7 node c7_bio_ch02_009 (Respiration in Animals: Aerobic and Anaerobic) and.',
          misconception: 'Students often write "anaerobic respiration occurs in the absence of mitochondria" or "anaerobic respiration happens.',
          parts: [
                { id: 'a', prompt: 'Explain why pyruvate enters the mitochondria for aerobic respiration but remains in the cytoplasm for anaerobic respiration.', answer: 'Pyruvate enters mitochondria only when oxygen is available',
                  options: ['Pyruvate enters mitochondria only when oxygen is available', 'pyruvate is too large to enter mitochondria without oxygen', 'pyruvate chooses its path'],
                  hint: 'Revisit Class 7 node c7_bio_ch02_009 (Respiration in Animals: Aerobic and Anaerobic) and Class 9.',
                  misconception: 'Students often write "anaerobic respiration occurs in the absence of mitochondria" or "anaerobic respiration happens in the cytoplasm.' },
                { id: 'b', prompt: 'A student runs a 100 m sprint and then jogs slowly for 5 minutes.', answer: 'During the sprint: anaerobic respiration predominates (glycolysis → lactate)',
                  options: ['During the sprint: anaerobic respiration predominates (glycolysis → lactate)', 'the body chooses aerobic', 'lactic acid is removed by breathing'],
                  hint: 'Revisit Class 7 node c7_bio_ch02_009 (Respiration in Animals: Aerobic and Anaerobic) and Class 9.',
                  misconception: 'Students often write "anaerobic respiration occurs in the absence of mitochondria" or "anaerobic respiration happens in the cytoplasm.' },
                { id: 'c', prompt: 'Analyze the following statement: "Yeast cells produce ethanol and CO₂ during anaerobic respiration, so they must have a different glycolysis pathway than human.', answer: 'The error is assuming different end products imply different glycolysis',
                  options: ['The error is assuming different end products imply different glycolysis', 'yeast has a special glycolysis'],
                  hint: 'Revisit Class 7 node c7_bio_ch02_009 (Respiration in Animals: Aerobic and Anaerobic) and Class 9.',
                  misconception: 'Students often write "anaerobic respiration occurs in the absence of mitochondria" or "anaerobic respiration happens in the cytoplasm.' }
          ],
            remediations: { 'students-often-write-anaerobic-respiration': { steps: ['Show a micrograph of human skeletal muscle cell packed with mitochondria; ask "If mitochondria are present, why does.', 'Demonstrate with a simple analogy — a factory (mitochondria) can only run when electricity (oxygen) is supplied.', 'Have the student write the fate of pyruvate in two columns: "O₂ present → mitochondria → acetyl-CoA → Krebs → ETC" and.', 'Assign a 2-mark board-style question: "State the site of glycolysis and Krebs cycle.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_008', difficulty: 'standard',
          question: 'The human respiratory system is a series of organs (nostrils, nasal cavity.',
          hint: 'If stuck, revisit Class 7 node c7_bio_ch02_011 (Breathing Mechanism) and Class 9 node.',
          misconception: 'Students often think that the air we inhale goes directly into the blood, or that oxygen is "breathed in" and carbon.',
          parts: [
                { id: 'a', prompt: 'Name the specific site in the human respiratory system where actual gas exchange between air and blood occurs, and state the approximate thickness of the.', answer: 'The site is the alveoli (alveolar sacs)',
                  options: ['The site is the alveoli (alveolar sacs)', 'trachea', 'bronchi', 'cell membrane thickness'],
                  hint: 'If stuck, revisit Class 7 node c7_bio_ch02_011 (Breathing Mechanism) and Class 9 node c9_bio_ch1_3.',
                  misconception: 'Students often think that the air we inhale goes directly into the blood, or that oxygen is "breathed in" and carbon dioxide is "breathed.' },
                { id: 'b', prompt: 'A person living at high altitude (e.g., Leh, Ladakh at 3500 m) has a lower arterial partial pressure of oxygen (PaO₂) than a person at sea level.', answer: 'At high altitude, atmospheric pressure is lower (e.g., ~650 mmHg at 3500 m)',
                  options: ['At high altitude, atmospheric pressure is lower (e.g., ~650 mmHg at 3500 m)', 'less oxygen', 'breathed out', 'alveoli → bronchioles → blood'],
                  hint: 'If stuck, revisit Class 7 node c7_bio_ch02_011 (Breathing Mechanism) and Class 9 node c9_bio_ch1_3.',
                  misconception: 'Students often think that the air we inhale goes directly into the blood, or that oxygen is "breathed in" and carbon dioxide is "breathed.' }
          ],
            remediations: { 'the-air-we-inhale-goes': { steps: ['Have the student draw the respiratory tract from memory, then compare with a labeled diagram.', 'Use a syringe without a needle: pull plunger → volume increases → pressure drops → air enters.', 'Write the diffusion equation: Rate ∝ (Surface Area × ΔP) / Thickness.', 'Practice writing the sequence: "Atmospheric air (PO₂ 159 mmHg) → Alveolar air (PO₂ 104 mmHg) → Arterial blood (PO₂ 95.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the air we inhale goes directly into the blood, or that oxygen is "breathed in" and carbon.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since exhalation is a passive process that does not require muscle contraction, the diaphragm must be completely relaxed and dome-shaped.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'yes, it\'s fully correct', 'exhalation uses abdominal muscles always', 'breathed out'],
                  hint: 'If stuck, revisit Class 7 node c7_bio_ch02_011 (Breathing Mechanism) and Class 9 node c9_bio_ch1_3.',
                  misconception: 'Students often think that the air we inhale goes directly into the blood, or that oxygen is "breathed in" and carbon dioxide is "breathed.' },
                { id: 'b', prompt: 'Design a simple classroom demonstration using household items (balloons, plastic bottle, straw, clay) to model the mechanism of human inhalation and.', answer: 'Model: Cut the bottom off a plastic bottle',
                  options: ['Model: Cut the bottom off a plastic bottle', 'breathed out', 'alveoli → bronchioles → blood', 'gas exchange happens in the bronchi'],
                  hint: 'If stuck, revisit Class 7 node c7_bio_ch02_011 (Breathing Mechanism) and Class 9 node c9_bio_ch1_3.',
                  misconception: 'Students often think that the air we inhale goes directly into the blood, or that oxygen is "breathed in" and carbon dioxide is "breathed.' }
          ],
            remediations: { 'the-air-we-inhale-goes': { steps: ['Have the student draw the respiratory tract from memory, then compare with a labeled diagram.', 'Use a syringe without a needle: pull plunger → volume increases → pressure drops → air enters.', 'Write the diffusion equation: Rate ∝ (Surface Area × ΔP) / Thickness.', 'Practice writing the sequence: "Atmospheric air (PO₂ 159 mmHg) → Alveolar air (PO₂ 104 mmHg) → Arterial blood (PO₂ 95.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_009', difficulty: 'standard',
          question: 'The human heart is a four-chambered muscular organ (two atria and two.',
          hint: 'If stuck, revisit the gas exchange process in alveoli (c10_bio_cbse_01_008) and the.',
          misconception: 'Students often think the heart pumps blood in a single loop: body → heart → lungs → heart → body, but they forget that.',
          parts: [
                { id: 'a', prompt: 'Name the four chambers of the human heart and state which chamber receives deoxygenated blood from the body.', answer: 'The four chambers are right atrium, right ventricle, left atrium, left ventricle',
                  options: ['The four chambers are right atrium, right ventricle, left atrium, left ventricle', 'left atrium receives deoxygenated blood'],
                  hint: 'If stuck, revisit the gas exchange process in alveoli (c10_bio_cbse_01_008) and the distinction.',
                  misconception: 'Students often think the heart pumps blood in a single loop: body → heart → lungs → heart → body, but they forget that the left and right.' },
                { id: 'b', prompt: 'Compare the thickness of the walls of the left ventricle and right ventricle.', answer: 'The left ventricle wall is much thicker than the right ventricle wall',
                  options: ['The left ventricle wall is much thicker than the right ventricle wall', 'right ventricle is thicker'],
                  hint: 'If stuck, revisit the gas exchange process in alveoli (c10_bio_cbse_01_008) and the distinction.',
                  misconception: 'Students often think the heart pumps blood in a single loop: body → heart → lungs → heart → body, but they forget that the left and right.' }
          ],
            remediations: { 'the-heart-pumps-blood-in': { steps: ['Draw a large heart diagram on paper with four chambers and major vessels.', 'Use red and blue pencils to trace two separate paths: blue from body → right atrium → right ventricle → pulmonary.', 'Label each vessel with its name and oxygenation state.', 'Recite aloud: "Arteries carry blood away from heart; veins carry blood toward heart.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_010', difficulty: 'standard',
          question: 'Blood is a specialized connective tissue composed of a liquid matrix called.',
          hint: 'If stuck, revisit Class 9 Animal Tissues (c9_bio_ch2_6) for blood as connective tissue.',
          misconception: 'Students think "WBCs are only of one type and all WBCs eat bacteria." They write "WBCs engulf pathogens" as the sole.',
          parts: [
                { id: 'a', prompt: 'Name the iron-containing pigment in red blood cells that binds reversibly with oxygen, and state the average lifespan of a human RBC in circulation.', answer: 'Correct answer: Hemoglobin (or haemoglobin)',
                  options: ['Correct answer: Hemoglobin (or haemoglobin)', 'hemocyanin', 'WBCs are only of one type and all WBCs eat bacteria', 'WBCs engulf pathogens'],
                  hint: 'If stuck, revisit Class 9 Animal Tissues (c9_bio_ch2_6) for blood as connective tissue, and Class 6.',
                  misconception: 'Students think "WBCs are only of one type and all WBCs eat bacteria." They write "WBCs engulf pathogens" as the sole function, ignoring.' },
                { id: 'b', prompt: 'Explain why mature human RBCs lack a nucleus and mitochondria, and how this structural adaptation directly supports their primary function.', answer: 'Correct answer: Absence of nucleus and mitochondria maximizes internal space for',
                  options: ['Correct answer: Absence of nucleus and mitochondria maximizes internal space for', 'RBCs are dead cells', 'they don\'t need energy', 'WBCs are only of one type and all WBCs eat bacteria'],
                  hint: 'If stuck, revisit Class 9 Animal Tissues (c9_bio_ch2_6) for blood as connective tissue, and Class 6.',
                  misconception: 'Students think "WBCs are only of one type and all WBCs eat bacteria." They write "WBCs engulf pathogens" as the sole function, ignoring.' }
          ],
            remediations: { 'wbcs-are-only-of-one': { steps: ['Draw a table with columns: WBC Type, Nucleus Shape, Cytoplasm, Granules, Main Function.', 'Fill using NCERT Fig. 6.9 (or standard diagram): Neutrophil (multi-lobed, granular, phagocytosis), Lymphocyte (large.', 'Practice two past board questions: (a) "Which WBC is responsible for allergic response?" (b) "Differentiate between.', 'Verify answers with marking scheme — note that "production of antibodies" must be linked to lymphocytes only.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_011', difficulty: 'standard',
          question: 'Transportation in plants is the vital biological process by which water.',
          hint: 'Revisit c9_bio_ch2_4 (Complex Permanent Tissues: Xylem and Phloem) — focus on diagrams.',
          misconception: 'Students believe **"phloem transports food only downward from leaves to roots"** because textbooks often show arrows.',
          parts: [
                { id: 'a', prompt: 'Name the two main vascular tissues in plants and state the primary substance each transports. Also, specify the direction of transport in each.', answer: 'Xylem transports water and minerals upward (unidirectional, root to shoot)',
                  options: ['Xylem transports water and minerals upward (unidirectional, root to shoot)', 'xylem transports food', 'phloem transports water upward only', 'phloem transports food only downward from leaves to roots'],
                  hint: 'Revisit c9_bio_ch2_4 (Complex Permanent Tissues: Xylem and Phloem) — focus on diagrams.',
                  misconception: 'Students believe **"phloem transports food only downward from leaves to roots"** because textbooks often show arrows downward.' },
                { id: 'b', prompt: 'Explain why xylem transport is described as a \'passive process\' while phloem transport requires \'living companion cells\'.', answer: 'Xylem uses dead vessels/tracheids',
                  options: ['Xylem uses dead vessels/tracheids', 'both need energy', 'xylem uses root pressure only', 'phloem transports food only downward from leaves to roots'],
                  hint: 'Revisit c9_bio_ch2_4 (Complex Permanent Tissues: Xylem and Phloem) — focus on diagrams.',
                  misconception: 'Students believe **"phloem transports food only downward from leaves to roots"** because textbooks often show arrows downward.' },
                { id: 'c', prompt: 'A student ties a plastic bag around a leafy branch of a mango tree in the afternoon. After 2 hours, water droplets collect inside the bag.', answer: 'Process: Transpiration (specifically stomatal transpiration)',
                  options: ['Process: Transpiration (specifically stomatal transpiration)', 'phloem transports food only downward from leaves to roots', 'transpiration occurs at night', 'guttation is driven by transpiration pull'],
                  hint: 'Revisit c9_bio_ch2_4 (Complex Permanent Tissues: Xylem and Phloem) — focus on diagrams.',
                  misconception: 'Students believe **"phloem transports food only downward from leaves to roots"** because textbooks often show arrows downward.' },
                { id: 'd', prompt: 'Compare the mechanism of water movement in xylem (cohesion-tension theory) with food movement in phloem (pressure-flow hypothesis) in a table with columns.', answer: '| Aspect | Xylem (Cohesion-Tension) | Phloem (Pressure-Flow) |',
                  options: ['| Aspect | Xylem (Cohesion-Tension) | Phloem (Pressure-Flow) |', 'phloem transports food only downward from leaves to roots', 'transpiration occurs at night', 'guttation is driven by transpiration pull'],
                  hint: 'Revisit c9_bio_ch2_4 (Complex Permanent Tissues: Xylem and Phloem) — focus on diagrams.',
                  misconception: 'Students believe **"phloem transports food only downward from leaves to roots"** because textbooks often show arrows downward.' }
          ],
            remediations: { 'phloem-transports-food-only-downward': { steps: ['Show a time-lapse video of dye (eosin) moving up a cut stem (xylem) vs.', 'Conduct a girdling experiment on a potted bean plant — remove a ring of bark (phloem) — observe swelling above cut.', 'Compare guttation droplets (morning, leaf margins) vs. transpiration (plastic bag experiment, afternoon).', 'Have student draw a concept map linking source-sink dynamics to seasonal changes (spring: root→shoot; summer.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_012', difficulty: 'standard',
          question: 'Excretion in humans is the biological process by which metabolic wastes.',
          hint: 'If stuck, review double circulation (c10_bio_cbse_01_009) and blood composition.',
          misconception: 'Students often think the kidney "makes" urine by actively secreting wastes into an empty tubule, rather than.',
          parts: [
                { id: 'a', prompt: 'Name the functional unit of the human kidney and state its two main structural components that form the renal corpuscle.', answer: 'The functional unit is the nephron',
                  options: ['The functional unit is the nephron', 'kidney tubule', 'collecting duct', 'secretion'],
                  hint: 'If stuck, review double circulation (c10_bio_cbse_01_009) and blood composition.',
                  misconception: 'Students often think the kidney "makes" urine by actively secreting wastes into an empty tubule, rather than understanding urine is formed.' },
                { id: 'b', prompt: 'Compare the composition of glomerular filtrate, tubular fluid at the end of the proximal convoluted tubule, and final urine in a healthy human.', answer: 'Glomerular filtrate: contains glucose, amino acids, water, salts, urea',
                  options: ['Glomerular filtrate: contains glucose, amino acids, water, salts, urea', 'urea is completely reabsorbed', 'salts are not reabsorbed', 'secretion'],
                  hint: 'If stuck, review double circulation (c10_bio_cbse_01_009) and blood composition.',
                  misconception: 'Students often think the kidney "makes" urine by actively secreting wastes into an empty tubule, rather than understanding urine is formed.' }
          ],
            remediations: { 'the-kidney-makes-urine-by': { steps: ['Draw a simple nephron diagram with blood vessels (afferent/efferent arteriole, peritubular capillaries).', 'Take a red pen and trace the path of a glucose molecule: blood → glomerulus → filtrate → PCT → back to blood (active.', 'Take a blue pen and trace urea: blood → glomerulus → filtrate → stays in tubule → urine (partial passive reabsorption.', 'Take a green pen and trace water: filtered → reabsorbed in PCT (65%) → loop of Henle (15%) → collecting duct (regulated.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
