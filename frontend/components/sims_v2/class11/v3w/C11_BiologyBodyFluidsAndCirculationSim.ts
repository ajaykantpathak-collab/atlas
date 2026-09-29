import type { SimDef } from '../../engine/types';
import C11_BiologyBodyFluidsAndCirculationSim from '../../../simulations/c6_12/C11_BiologyBodyFluidsAndCirculationSim';

/** v3 wrapped master — C11_BiologyBodyFluidsAndCirculationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biologybodyfluidsandcirculationsim: SimDef = {
    id: 'v3w_c11_biologybodyfluidsandcirculationsim',
    title: 'Lymph and Lymphatic System',
    subtitle: 'Covers the formation, composition, circulation, and functions of lymph and the lymphatic.',
    classLevel: 11, subject: 'biology', topic: 'Lymph and Lymphatic System',
    chapters: [],
    nodeIds: ['c11_bio_cbse_15_008', 'c11_bio_cbse_15_005', 'c11_bio_cbse_15_003', 'c11_bio_cbse_15_004', 'c11_bio_cbse_15_001', 'c11_bio_cbse_04_012', 'c11_bio_cbse_18_005', 'c11_bio_cbse_15_006', 'c11_bio_cbse_16_006', 'c11_bio_cbse_16_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Start with a relatable observation: when you get a small cut or swelling, you may notice a clear fluid oozing.', goal: 'Master Lymph and Lymphatic System.' },
    discovery: {
        question: 'Why is lymph described as a "colourless fluid" despite being derived from blood, which is red?',
        options: ['Lymph is colourless', 'lymph loses its colour in lymph nodes', 'blood without red cells'],
        answer: 'Lymph is colourless',
        hook: 'Students often think lymph is simply "blood without red cells" and that it circulates in a loop like blood.',
    },
    teaching: [
        { title: 'Lymph is a clear, colourless fluid derived.', text: 'Lymph is a clear, colourless fluid derived from interstitial fluid that enters the lymphatic capillaries, containing lymphocytes (mainly T and B cells) and serving as a medium for transport of.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bio_cbse_15_008', title: 'Lymph is a clear, colourless fluid.',
          scaffold: { problem: 'A person suffers a deep cut on the forearm. Initially, blood oozes out, but after a few minutes, a clear fluid continues to seep from the.',
            steps: [
            { text: 'Recognize that the initial red fluid is blood from damaged blood capillaries.' },
            { text: 'The subsequent clear fluid is lymph (or interstitial fluid) from damaged lymphatic capillaries.' },
            { text: 'Recall that as blood passes through capillaries, water and small solutes filter out to form interstitial fluid;.' },
            { text: 'Lymph lacks RBCs, platelets, and large plasma proteins (like albumin) because they are too large to cross the capillary.' },
            { text: 'Conclude that the clear fluid is lymph, derived from interstitial fluid, and its composition reflects filtration.', faded: true, blankAnswer: 'The clear fluid is lymph. It originates as interstitial.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_15_005', title: 'Double circulation is a circulatory.',
          scaffold: { problem: 'A Class 11 student measures resting heart rate = 72 bpm, stroke volume = 70 mL. Calculate cardiac output.',
            steps: [
            { text: 'Recall CO = SV × HR = 70 mL × 72 bpm = 5040 mL/min ≈ 5.0 L/min.' },
            { text: 'Recognize that in a closed series circuit, left and right ventricular outputs *must* be equal over time; otherwise.' },
            { text: 'Apply ΔP = Q × R (Ohm\'s law for fluids): same flow (Q), but systemic resistance (R_sys) is ∼6× pulmonary resistance.' },
            { text: 'Left ventricle pressure = Q × R_sys ≈ 5 L/min × 20 mmHg·min/L = 100 mmHg (mean); right ventricle pressure = Q × R_pulm.' },
            { text: 'Relate to anatomy: left ventricular wall thickness (10-15 mm) vs right (3-5 mm) matches the 6× pressure ratio.', faded: true, blankAnswer: 'CO = 5.04 L/min. Left ventricle generates higher pressure.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_15_003', title: 'The human heart is a four-chambered,.',
          scaffold: { problem: 'A newborn infant is diagnosed with a ventricular septal defect (VSD) — a hole in the interventricular septum.',
            steps: [
            { text: 'Recall normal flow — deoxygenated blood: right atrium → tricuspid valve → right ventricle → pulmonary valve → pulmonary.' },
            { text: 'Identify the defect location — the interventricular septum separates the two ventricles.' },
            { text: 'Determine shunt direction — left ventricular pressure (~120 mmHg) is much higher than right ventricular pressure (~25.' },
            { text: 'Trace consequences — extra blood volume enters right ventricle → increased pulmonary blood flow → increased pulmonary.' },
            { text: 'Chronic pressure overload on right ventricle → right ventricular hypertrophy (wall thickening) to compensate.' },
            { text: 'Conclude — VSD disrupts the pressure separation maintained by the intact interventricular septum, leading to.', faded: true, blankAnswer: 'In VSD, oxygenated blood shunts left-to-right from the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_15_004', title: 'The cardiac cycle is the complete.',
          scaffold: { problem: 'A 25-year-old male has a resting heart rate of 65 bpm. His echocardiogram shows an end-diastolic volume (EDV) of 130 mL and an end-systolic.',
            steps: [
            { text: 'Calculate stroke volume at rest: SV = EDV – ESV = 130 mL – 60 mL = 70 mL.' },
            { text: 'Calculate ejection fraction (EF): EF = SV / EDV = 70 / 130 = 0.538 (53.8%).' },
            { text: 'Calculate cardiac output at rest: CO = SV × HR = 70 mL/beat × 65 beats/min = 4550 mL/min = 4.55 L/min.' },
            { text: 'Calculate cardiac cycle duration at rest: Duration = 60 / HR = 60 / 65 = 0.923 s.' },
            { text: 'During exercise, EF constant means SV scales with EDV. Assume EDV increases slightly to 140 mL due to enhanced venous.' },
            { text: 'New CO = new SV × new HR = 75.3 mL × 110 beats/min = 8283 mL/min ≈ 8.3 L/min.', faded: true, blankAnswer: 'Resting SV = 70 mL, CO = 4.55 L/min, Cycle duration = 0.92.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_15_001', title: 'Blood is a specialized connective.',
          scaffold: { problem: 'A 25-year-old male from a malaria-endemic region in Odisha presents with cyclic fever, chills, and fatigue.',
            steps: [
            { text: 'Identify the infection — Plasmodium (malaria parasite) invades and replicates inside RBCs, causing their rupture during.' },
            { text: 'Explain low RBC count (3.8 vs 5-5.5 million) — direct destruction of infected RBCs by parasite egress and splenic.' },
            { text: 'Explain low hemoglobin (9 vs 12-16 g/dL) — each lysed RBC releases hemoglobin; free hemoglobin is scavenged by.' },
            { text: 'Explain low WBC count (4,500 vs 6,000-8,000) — Plasmodium causes transient bone marrow suppression and splenic.' },
            { text: 'Synthesize — The triad of anemia (low RBC/Hb), leukopenia, and thrombocytopenia (often seen) is characteristic of acute.', faded: true, blankAnswer: 'Malaria causes hemolytic anemia via intraerythrocytic.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_04_012', title: 'Phylum Hemichordata comprises a small.',
          scaffold: { problem: 'A researcher collects a marine worm from the Andaman intertidal zone.',
            steps: [
            { text: 'Note the three-part body plan (proboscis, collar, trunk) – characteristic of Hemichordata, not seen in Annelida.' },
            { text: 'Observe pharyngeal gill slits – shared with Chordata and some Hemichordata, but absent in Annelida and most other.' },
            { text: 'Note open circulatory system – rules out Chordata (closed) and Annelida (closed); consistent with Hemichordata and.' },
            { text: 'Identify proboscis gland as excretory organ – unique to Hemichordata (vs nephridia in Annelida, kidneys in Chordata).' },
            { text: 'Confirm absence of true notochord (only stomochord in collar) and absence of dorsal hollow nerve cord (ventral solid.' },
            { text: 'Conclude Phylum Hemichordata (e.g., Balanoglossus).', faded: true, blankAnswer: 'Phylum Hemichordata. Justification: Triploblastic,.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_15_005', title: 'Identify each idea',
          dissect: { specimen: 'Lymph and Lymphatic System', spots: [
            { id: 's1', label: 'Lymph is a clear colourless', prompt: 'Which idea is this? — Lymph is a clear, colourless fluid derived from interstitial fluid that enters the.', answer: 'Lymph is a clear colourless', options: ['Lymph is a clear colourless', 'Double circulation is a circulatory', 'The human heart is a', 'The cardiac cycle is the'] },
            { id: 's2', label: 'Double circulation is a circulatory', prompt: 'Which idea is this? — Double circulation is a circulatory pathway in which blood passes through the heart twice.', answer: 'Double circulation is a circulatory', options: ['Double circulation is a circulatory', 'Lymph is a clear colourless', 'The human heart is a', 'The cardiac cycle is the'] },
            { id: 's3', label: 'The human heart is a', prompt: 'Which idea is this? — The human heart is a four-chambered, muscular pumping organ located in the thoracic.', answer: 'The human heart is a', options: ['The human heart is a', 'Lymph is a clear colourless', 'Double circulation is a circulatory', 'The cardiac cycle is the'] },
            { id: 's4', label: 'The cardiac cycle is the', prompt: 'Which idea is this? — The cardiac cycle is the complete sequence of mechanical events occurring in the heart.', answer: 'The cardiac cycle is the', options: ['The cardiac cycle is the', 'Lymph is a clear colourless', 'Double circulation is a circulatory', 'The human heart is a'] },
            { id: 's5', label: 'Blood is a specialized connective', prompt: 'Which idea is this? — Blood is a specialized connective tissue composed of a fluid matrix called plasma (55% by.', answer: 'Blood is a specialized connective', options: ['Blood is a specialized connective', 'Lymph is a clear colourless', 'Double circulation is a circulatory', 'The human heart is a'] },
            { id: 's6', label: 'Phylum Hemichordata comprises a small', prompt: 'Which idea is this? — Phylum Hemichordata comprises a small group of exclusively marine, worm-like.', answer: 'Phylum Hemichordata comprises a small', options: ['Phylum Hemichordata comprises a small', 'Lymph is a clear colourless', 'Double circulation is a circulatory', 'The human heart is a'] }
          ] } }
    ],
    explore: { component: C11_BiologyBodyFluidsAndCirculationSim, prompt: 'Explore the interactive — Lymph and Lymphatic System' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_008', difficulty: 'standard',
          question: 'Lymph is a clear, colourless fluid derived from interstitial fluid that enters.',
          hint: 'Review "Transportation in Humans: Heart Structure and Double Circulation".',
          misconception: 'Students often think lymph is simply "blood without red cells" and that it circulates in a loop like blood.',
          parts: [
                { id: 'a', prompt: 'Why is lymph described as a "colourless fluid" despite being derived from blood, which is red?', answer: 'Lymph is colourless',
                  options: ['Lymph is colourless', 'lymph loses its colour in lymph nodes', 'blood without red cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think lymph is simply "blood without red cells" and that it circulates in a loop like blood.' },
                { id: 'b', prompt: 'A patient has a blockage in the thoracic duct. Predict the consequences on (a) fluid balance in the left leg and (b) fat absorption from the intestine.', answer: 'fluid balance in the left leg and (',
                  options: ['fluid balance in the left leg and (', 'blood without red cells', 'filters that clean lymph'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think lymph is simply "blood without red cells" and that it circulates in a loop like blood.' }
          ],
            remediations: { 'lymph-is-simply-blood-without': { steps: ['Revisit capillary exchange (Starling forces) from Class 11 (if covered) or Class 10 (c10_bio_cbse_01_009) to understand.', 'Draw a diagram: blood capillary -> interstitial space -> lymphatic capillary -> lymphatic vessel -> lymph node ->.', 'Trace the path with arrows.', 'Compare with blood circulation: heart -> arteries -> capillaries -> veins -> heart.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think lymph is simply "blood without red cells" and that it circulates in a loop like blood.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The lymphatic system is a closed circulatory system parallel to the blood vascular system." Justify your answer.', answer: 'The statement is false',
                  options: ['The statement is false', 'parallel', 'closed', 'blood without red cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think lymph is simply "blood without red cells" and that it circulates in a loop like blood.' }
          ],
            remediations: { 'lymph-is-simply-blood-without': { steps: ['Revisit capillary exchange (Starling forces) from Class 11 (if covered) or Class 10 (c10_bio_cbse_01_009) to understand.', 'Draw a diagram: blood capillary -> interstitial space -> lymphatic capillary -> lymphatic vessel -> lymph node ->.', 'Trace the path with arrows.', 'Compare with blood circulation: heart -> arteries -> capillaries -> veins -> heart.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_005', difficulty: 'standard',
          question: 'Double circulation is a circulatory pathway in which blood passes through the.',
          hint: 'Revisit c11_bio_cbse_15_003 (heart structure) focusing on vessel-chamber connections, and.',
          misconception: 'Students believe the pulmonary and systemic circuits operate independently — that the right heart "handles lungs" and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Double circulation is a circulatory pathway in',
                  options: ['Double circulation is a circulatory pathway in', 'Lymph is a clear, colourless fluid derived from interstitial fluid that enters the', 'The human heart is a four-chambered, muscular pumping organ located in the thoracic', 'The cardiac cycle is the complete sequence of mechanical events occurring in the heart'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the pulmonary and systemic circuits operate independently — that the right heart "handles lungs" and left heart "handles.' }
          ],
            remediations: { 'the-pulmonary-and-systemic-circuits': { steps: ['Draw the heart on paper with blue/red pencils.', 'Trace one RBC\'s path aloud: "Deoxygenated enters RA, passes tricuspid, RV contracts, pushes through pulmonary valve...".', 'Build a "pressure profile" table: list RA, RV, PA, LA, LV, Ao pressures (use typical values: 5, 25, 15, 8, 120, 95.', 'Plot them; visualize the two pumps.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_003', difficulty: 'standard',
          question: 'The human heart is a four-chambered, muscular pumping organ located in the.',
          hint: 'Review Class 10 Transportation in Humans (c10_bio_cbse_01_009) and Blood Composition.',
          misconception: 'Students frequently believe that the pulmonary artery carries oxygenated blood and the pulmonary vein carries.',
          parts: [
                { id: 'a', prompt: 'A patient is diagnosed with a defective bicuspid (mitral) valve that does not close completely during ventricular systole.', answer: 'During left ventricular systole, the incompetent bicuspid valve allows blood to',
                  options: ['During left ventricular systole, the incompetent bicuspid valve allows blood to', 'blood flows back into the right atrium', 'no effect on lungs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe that the pulmonary artery carries oxygenated blood and the pulmonary vein carries deoxygenated blood, because.' },
                { id: 'b', prompt: 'Compare the structure of the tricuspid valve and the bicuspid (mitral) valve.', answer: 'Both valves prevent backflow from ventricles to atria during systole',
                  options: ['Both valves prevent backflow from ventricles to atria during systole', 'tricuspid has three cusps', 'bicuspid is stronger'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe that the pulmonary artery carries oxygenated blood and the pulmonary vein carries deoxygenated blood, because.' }
          ],
            remediations: { 'students-frequently-believe-that-the': { steps: ['Draw a simple flowchart: Heart → (pulmonary artery) → Lungs → (pulmonary veins) → Heart.', 'At each arrow, write the oxygen status: deoxygenated → Lungs → oxygenated.', 'Explicitly contrast with systemic: Heart → (aorta) → Body → (vena cava) → Heart.', 'Use a mnemonic: "Pulmonary Artery = Poor oxygen (PA = Poor), Pulmonary Vein = Plenty oxygen (PV = Plenty)."', 'Practice with 5 diagram-labeling exercises where only the pulmonary vessels are shown, forcing the student to apply the.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently believe that the pulmonary artery carries oxygenated blood and the pulmonary vein carries.',
          parts: [
                { id: 'a', prompt: 'Compare the structure of the tricuspid valve and the bicuspid (mitral) valve.', answer: 'Both valves prevent backflow from ventricles to atria during systole',
                  options: ['Both valves prevent backflow from ventricles to atria during systole', 'tricuspid has three cusps', 'bicuspid is stronger'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe that the pulmonary artery carries oxygenated blood and the pulmonary vein carries deoxygenated blood, because.' }
          ],
            remediations: { 'students-frequently-believe-that-the': { steps: ['Draw a simple flowchart: Heart → (pulmonary artery) → Lungs → (pulmonary veins) → Heart.', 'At each arrow, write the oxygen status: deoxygenated → Lungs → oxygenated.', 'Explicitly contrast with systemic: Heart → (aorta) → Body → (vena cava) → Heart.', 'Use a mnemonic: "Pulmonary Artery = Poor oxygen (PA = Poor), Pulmonary Vein = Plenty oxygen (PV = Plenty)."', 'Practice with 5 diagram-labeling exercises where only the pulmonary vessels are shown, forcing the student to apply the.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_004', difficulty: 'standard',
          question: 'The cardiac cycle is the complete sequence of mechanical events occurring in.',
          hint: 'Review c11_bio_cbse_15_003 (Human Heart: Structure and Chambers) focusing on valve names,.',
          misconception: 'Students believe the "lub-dub" sounds are caused by the heart muscle contracting and relaxing (i.e., the "thump" of.',
          parts: [
                { id: 'a', prompt: 'Explain why the first heart sound (S1, "lub") is louder and longer than the second heart sound (S2, "dub") in a healthy adult.', answer: 'S1 corresponds to closure of the larger, thicker atrioventricular (tricuspid and',
                  options: ['S1 corresponds to closure of the larger, thicker atrioventricular (tricuspid and', 'S1 is louder because it\'s the first sound', 'S2 is due to AV valve closure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the "lub-dub" sounds are caused by the heart muscle contracting and relaxing (i.e., the "thump" of muscle hitting the.' },
                { id: 'b', prompt: 'A student records a heart rate of 90 beats/min in a subject after moderate exercise.', answer: 'Step 1: Cycle duration = 60 sec / 90 beats = 0.667 s per cycle',
                  options: ['Step 1: Cycle duration = 60 sec / 90 beats = 0.667 s per cycle', 'lub-dub', 'the "lub-dub" sounds are caused by the heart muscle contracting and relaxing (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the "lub-dub" sounds are caused by the heart muscle contracting and relaxing (i.e., the "thump" of muscle hitting the.' }
          ],
            remediations: { 'the-lub-dub-sounds-are': { steps: ['Use a clear plastic tube with two one-way valves (one large, one small) and water to demonstrate valve closure sounds —.', 'Draw a pressure-time graph for left atrium, left ventricle, and aorta on the same axes; mark valve open/close points.', 'Practice identifying S1 and S2 on a phonocardiogram recording: S1 coincides with the upstroke of the carotid pulse.', 'Re-read NCERT lines: "The first heart sound (lub) is associated with the closure of the tricuspid and bicuspid valves.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the "lub-dub" sounds are caused by the heart muscle contracting and relaxing (i.e., the "thump" of.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The \'atrial kick\' contributes only 10% of ventricular filling, so atrial fibrillation (loss of atrial systole) is hemodynamically.', answer: 'The statement is false',
                  options: ['The statement is false', 'lub-dub', 'the "lub-dub" sounds are caused by the heart muscle contracting and relaxing (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the "lub-dub" sounds are caused by the heart muscle contracting and relaxing (i.e., the "thump" of muscle hitting the.' }
          ],
            remediations: { 'the-lub-dub-sounds-are': { steps: ['Use a clear plastic tube with two one-way valves (one large, one small) and water to demonstrate valve closure sounds —.', 'Draw a pressure-time graph for left atrium, left ventricle, and aorta on the same axes; mark valve open/close points.', 'Practice identifying S1 and S2 on a phonocardiogram recording: S1 coincides with the upstroke of the carotid pulse.', 'Re-read NCERT lines: "The first heart sound (lub) is associated with the closure of the tricuspid and bicuspid valves.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_001', difficulty: 'standard',
          question: 'Blood is a specialized connective tissue composed of a fluid matrix called.',
          hint: 'If stuck, revisit Class 10 Chapter "Life Processes" — Blood composition (RBC, WBC,.',
          misconception: 'Students often believe that **all WBCs are phagocytic** and that **lymphocytes directly engulf bacteria** like.',
          parts: [
                { id: 'a', prompt: 'State the percentage composition of blood by volume for plasma and formed elements, and name the three major plasma proteins with one function each.', answer: 'Plasma constitutes 55% and formed elements 45% of blood volume',
                  options: ['Plasma constitutes 55% and formed elements 45% of blood volume', 'pathogens and T cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **all WBCs are phagocytic** and that **lymphocytes directly engulf bacteria** like neutrophils do.' },
                { id: 'b', prompt: 'A patient\'s blood report shows: RBC count 3.5 million/mm³, WBC count 12,000/mm³ with 80% neutrophils, platelet count 80,000/mm³.', answer: 'Abnormal values: (1) RBC 3.5 million/mm³ (low',
                  options: ['Abnormal values: (1) RBC 3.5 million/mm³ (low', 'pathogens and T cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **all WBCs are phagocytic** and that **lymphocytes directly engulf bacteria** like neutrophils do.' },
                { id: 'c', prompt: 'Compare and contrast the roles of neutrophils, eosinophils, basophils, lymphocytes (B and T), and monocytes in the immune response.', answer: 'Neutrophils and monocytes are phagocytic (engulf pathogens)',
                  options: ['Neutrophils and monocytes are phagocytic (engulf pathogens)', 'pathogens and T cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **all WBCs are phagocytic** and that **lymphocytes directly engulf bacteria** like neutrophils do.' }
          ],
            remediations: { 'all-wbcs-are-phagocytic-and': { steps: ['Draw a two-column table — "Innate Immunity (Rapid, Non-specific)" vs "Adaptive Immunity (Slow, Specific)."', 'Place neutrophils and monocytes under innate with "phagocytosis" as action; place B and T lymphocytes under adaptive.', 'For B cells, write "differentiate into plasma cells → secrete antibodies"; for T cells, write "cytotoxic T cells kill.', 'Re-read NCERT lines on WBC functions and match each cell type to its column.', 'Explain aloud why neutrophilia indicates acute bacterial infection while lymphocytosis suggests viral/chronic infection.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **all WBCs are phagocytic** and that **lymphocytes directly engulf bacteria** like.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Serum is simply plasma without fibrinogen." Is this accurate?', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'pathogens and T cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **all WBCs are phagocytic** and that **lymphocytes directly engulf bacteria** like neutrophils do.' },
                { id: 'b', prompt: 'Design a simple investigation using a light microscope and Wright\'s stain to differentiate the five types of WBCs in a peripheral blood smear.', answer: 'Prepare a thin blood smear, fix with methanol, stain with Wright\'s stain',
                  options: ['Prepare a thin blood smear, fix with methanol, stain with Wright\'s stain', 'pathogens and T cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **all WBCs are phagocytic** and that **lymphocytes directly engulf bacteria** like neutrophils do.' }
          ],
            remediations: { 'all-wbcs-are-phagocytic-and': { steps: ['Draw a two-column table — "Innate Immunity (Rapid, Non-specific)" vs "Adaptive Immunity (Slow, Specific)."', 'Place neutrophils and monocytes under innate with "phagocytosis" as action; place B and T lymphocytes under adaptive.', 'For B cells, write "differentiate into plasma cells → secrete antibodies"; for T cells, write "cytotoxic T cells kill.', 'Re-read NCERT lines on WBC functions and match each cell type to its column.', 'Explain aloud why neutrophilia indicates acute bacterial infection while lymphocytosis suggests viral/chronic infection.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_012', difficulty: 'standard',
          question: 'Phylum Hemichordata comprises a small group of exclusively marine, worm-like.',
          hint: 'If stuck, revisit c11_bio_cbse_04_001 (Basis of Classification) for coelom/germ layer.',
          misconception: 'Students believe the stomochord *is* a notochord (hence "Hemichordata = half notochord") and that hemichordates possess.',
          parts: [
                { id: 'a', prompt: 'State the three distinct body regions of a hemichordate (e.g., Balanoglossus) and name the structure in the collar region that was historically confused with a.', answer: 'The three regions are proboscis, collar, and trunk',
                  options: ['The three regions are proboscis, collar, and trunk', 'head, thorax, abdomen', 'notochord in collar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the stomochord *is* a notochord (hence "Hemichordata = half notochord") and that hemichordates possess a dorsal hollow.' },
                { id: 'b', prompt: 'A student observes a marine worm with bilateral symmetry, a true coelom, pharyngeal gill slits, and an open circulatory system.', answer: 'Phylum Hemichordata',
                  options: ['Phylum Hemichordata', 'Hemichordata = half notochord'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the stomochord *is* a notochord (hence "Hemichordata = half notochord") and that hemichordates possess a dorsal hollow.' }
          ],
            remediations: { 'the-stomochord-is-a-notochord': { steps: ['Draw a cross-section of the collar region of Balanoglossus labeling ectoderm, stomochord lumen (continuous with buccal.', 'Contrast with a chordate cross-section showing mesodermal notochord, dorsal hollow nerve cord (ectodermal), and gut.', 'Use the mnemonic "STOMO = STOModaeal (ectodermal origin) vs NOTO = NOTochord (mesodermal origin)" to lock the.', 'Re-attempt Diagnostic Question 2.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the stomochord *is* a notochord (hence "Hemichordata = half notochord") and that hemichordates possess.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The tornaria larva of Hemichordata and the bipinnaria larva of Echinodermata are evidence of a close evolutionary relationship between.', answer: 'The statement is valid',
                  options: ['The statement is valid', 'Hemichordata = half notochord'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the stomochord *is* a notochord (hence "Hemichordata = half notochord") and that hemichordates possess a dorsal hollow.' }
          ],
            remediations: { 'the-stomochord-is-a-notochord': { steps: ['Draw a cross-section of the collar region of Balanoglossus labeling ectoderm, stomochord lumen (continuous with buccal.', 'Contrast with a chordate cross-section showing mesodermal notochord, dorsal hollow nerve cord (ectodermal), and gut.', 'Use the mnemonic "STOMO = STOModaeal (ectodermal origin) vs NOTO = NOTochord (mesodermal origin)" to lock the.', 'Re-attempt Diagnostic Question 2.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
