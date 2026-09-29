import type { SimDef } from '../../engine/types';
import C11_BiologyCirculatoryDisordersSim from '../../../simulations/c6_12/C11_BiologyCirculatoryDisordersSim';

/** v3 wrapped master — C11_BiologyCirculatoryDisordersSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biologycirculatorydisorderssim: SimDef = {
    id: 'v3w_c11_biologycirculatorydisorderssim',
    title: 'Human Heart: Structure and Chambers',
    subtitle: 'This node covers the gross anatomical structure of the human heart: chambers, septa,.',
    classLevel: 11, subject: 'biology', topic: 'Human Heart: Structure and Chambers',
    chapters: [],
    nodeIds: ['c11_bio_cbse_15_003', 'c11_bio_cbse_15_005', 'c11_bio_cbse_15_001', 'c11_bio_cbse_15_008', 'c11_bio_cbse_04_002', 'c11_bio_cbse_04_008', 'c11_bio_cbse_04_009', 'c11_bio_cbse_04_012', 'c11_bio_cbse_04_013'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Place your hand on the left side of your chest — you feel a rhythmic thumping.', goal: 'Master Human Heart: Structure and Chambers.' },
    discovery: {
        question: 'A patient is diagnosed with a defective bicuspid (mitral) valve that does not close completely during ventricular systole.',
        options: ['During left ventricular systole, the incompetent bicuspid valve allows blood to', 'blood flows back into the right atrium', 'no effect on lungs'],
        answer: 'During left ventricular systole, the incompetent bicuspid valve allows blood to',
        hook: 'Students frequently believe that the pulmonary artery carries oxygenated blood and the pulmonary vein carries.',
    },
    teaching: [
        { title: 'The human heart is a four-chambered,.', text: 'The human heart is a four-chambered, muscular pumping organ located in the thoracic cavity between the lungs, enclosed by a double-walled pericardium.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
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
        { type: 'scaffold', nodeId: 'c11_bio_cbse_15_005', title: 'Double circulation is a circulatory.',
          scaffold: { problem: 'A Class 11 student measures resting heart rate = 72 bpm, stroke volume = 70 mL. Calculate cardiac output.',
            steps: [
            { text: 'Recall CO = SV × HR = 70 mL × 72 bpm = 5040 mL/min ≈ 5.0 L/min.' },
            { text: 'Recognize that in a closed series circuit, left and right ventricular outputs *must* be equal over time; otherwise.' },
            { text: 'Apply ΔP = Q × R (Ohm\'s law for fluids): same flow (Q), but systemic resistance (R_sys) is ∼6× pulmonary resistance.' },
            { text: 'Left ventricle pressure = Q × R_sys ≈ 5 L/min × 20 mmHg·min/L = 100 mmHg (mean); right ventricle pressure = Q × R_pulm.' },
            { text: 'Relate to anatomy: left ventricular wall thickness (10-15 mm) vs right (3-5 mm) matches the 6× pressure ratio.', faded: true, blankAnswer: 'CO = 5.04 L/min. Left ventricle generates higher pressure.' }
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
        { type: 'scaffold', nodeId: 'c11_bio_cbse_15_008', title: 'Lymph is a clear, colourless fluid.',
          scaffold: { problem: 'A person suffers a deep cut on the forearm. Initially, blood oozes out, but after a few minutes, a clear fluid continues to seep from the.',
            steps: [
            { text: 'Recognize that the initial red fluid is blood from damaged blood capillaries.' },
            { text: 'The subsequent clear fluid is lymph (or interstitial fluid) from damaged lymphatic capillaries.' },
            { text: 'Recall that as blood passes through capillaries, water and small solutes filter out to form interstitial fluid;.' },
            { text: 'Lymph lacks RBCs, platelets, and large plasma proteins (like albumin) because they are too large to cross the capillary.' },
            { text: 'Conclude that the clear fluid is lymph, derived from interstitial fluid, and its composition reflects filtration.', faded: true, blankAnswer: 'The clear fluid is lymph. It originates as interstitial.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_04_002', title: 'Levels of organisation in animals.',
          scaffold: { problem: 'A biology student observes two unknown specimens under a dissecting microscope.',
            steps: [
            { text: 'Identify Specimen A\'s key features - flattened body (dorso-ventral), unsegmented, single opening (mouth+anus combined),.' },
            { text: 'Recall that single opening = incomplete digestive system; flattened body + no coelom (implied by no segmental.' },
            { text: 'Match to phylum Platyhelminthes characteristics: triploblastic, acoelomate, bilateral, organ level, incomplete gut.' },
            { text: 'Identify Specimen B\'s key features - metameric segmentation (visible rings), dorsal vessel (closed circulation), paired.' },
            { text: 'Recall that segmentation + closed circulation + complete gut + coelom (implied by segmental coelomic compartments) =.' },
            { text: 'Conclude Specimen A = Organ level (Platyhelminthes); Specimen B = Organ-system level (Annelida).', faded: true, blankAnswer: 'Specimen A - Organ level (Platyhelminthes). Specimen B -.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_04_008', title: 'Phylum Annelida consists of.',
          scaffold: { problem: 'A student collects a worm from a freshwater stream. It has a cylindrical body with visible segments, paired lateral appendages bearing.',
            steps: [
            { text: 'Observe key features — segmented body, lateral appendages with setae, distinct head with sensory organs, aquatic.' },
            { text: 'Recall phylum characteristics: segmentation + coelom + closed circulation + nephridia = Annelida.' },
            { text: 'Recall class distinctions: Polychaeta have parapodia (lateral appendages) with many setae, well-developed head, mostly.' },
            { text: 'Match specimen to Polychaeta (e.g., Nereis) based on parapodia and head.' },
            { text: 'Contrast locomotion: Polychaete uses parapodia (with acicula for support) for swimming/crawling; earthworm uses.', faded: true, blankAnswer: 'Phylum Annelida, Class Polychaeta (likely Nereis)..' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_15_005', title: 'Identify each idea',
          dissect: { specimen: 'Human Heart: Structure and Chambers', spots: [
            { id: 's1', label: 'The human heart is a', prompt: 'Which idea is this? — The human heart is a four-chambered, muscular pumping organ located in the thoracic.', answer: 'The human heart is a', options: ['The human heart is a', 'Double circulation is a circulatory', 'Blood is a specialized connective', 'Lymph is a clear colourless'] },
            { id: 's2', label: 'Double circulation is a circulatory', prompt: 'Which idea is this? — Double circulation is a circulatory pathway in which blood passes through the heart twice.', answer: 'Double circulation is a circulatory', options: ['Double circulation is a circulatory', 'The human heart is a', 'Blood is a specialized connective', 'Lymph is a clear colourless'] },
            { id: 's3', label: 'Blood is a specialized connective', prompt: 'Which idea is this? — Blood is a specialized connective tissue composed of a fluid matrix called plasma (55% by.', answer: 'Blood is a specialized connective', options: ['Blood is a specialized connective', 'The human heart is a', 'Double circulation is a circulatory', 'Lymph is a clear colourless'] },
            { id: 's4', label: 'Lymph is a clear colourless', prompt: 'Which idea is this? — Lymph is a clear, colourless fluid derived from interstitial fluid that enters the.', answer: 'Lymph is a clear colourless', options: ['Lymph is a clear colourless', 'The human heart is a', 'Double circulation is a circulatory', 'Blood is a specialized connective'] },
            { id: 's5', label: 'Levels of organisation in animals', prompt: 'Which idea is this? — Levels of organisation in animals describe the hierarchical complexity of structural and.', answer: 'Levels of organisation in animals', options: ['Levels of organisation in animals', 'The human heart is a', 'Double circulation is a circulatory', 'Blood is a specialized connective'] },
            { id: 's6', label: 'Phylum Annelida consists of triploblastic', prompt: 'Which idea is this? — Phylum Annelida consists of triploblastic, bilaterally symmetrical, coelomate animals.', answer: 'Phylum Annelida consists of triploblastic', options: ['Phylum Annelida consists of triploblastic', 'The human heart is a', 'Double circulation is a circulatory', 'Blood is a specialized connective'] }
          ] } }
    ],
    explore: { component: C11_BiologyCirculatoryDisordersSim, prompt: 'Explore the interactive — Human Heart: Structure and Chambers' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_005', difficulty: 'standard',
          question: 'Double circulation is a circulatory pathway in which blood passes through the.',
          hint: 'Revisit c11_bio_cbse_15_003 (heart structure) focusing on vessel-chamber connections, and.',
          misconception: 'Students believe the pulmonary and systemic circuits operate independently — that the right heart "handles lungs" and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Double circulation is a circulatory pathway in',
                  options: ['Double circulation is a circulatory pathway in', 'The human heart is a four-chambered, muscular pumping organ located in the thoracic', 'Blood is a specialized connective tissue composed of a fluid matrix called plasma (55% by', 'Lymph is a clear, colourless fluid derived from interstitial fluid that enters the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the pulmonary and systemic circuits operate independently — that the right heart "handles lungs" and left heart "handles.' }
          ],
            remediations: { 'the-pulmonary-and-systemic-circuits': { steps: ['Draw the heart on paper with blue/red pencils.', 'Trace one RBC\'s path aloud: "Deoxygenated enters RA, passes tricuspid, RV contracts, pushes through pulmonary valve...".', 'Build a "pressure profile" table: list RA, RV, PA, LA, LV, Ao pressures (use typical values: 5, 25, 15, 8, 120, 95.', 'Plot them; visualize the two pumps.'] } } },
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
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_002', difficulty: 'standard',
          question: 'Levels of organisation in animals describe the hierarchical complexity of.',
          hint: 'Review Class 9 Animal Tissues (c9_bio_ch2_5 to c9_bio_ch2_8) focusing on tissue.',
          misconception: 'Students believe "organ level of organisation" and "organ system level of organisation" differ only in the number of.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Cnidaria and Ctenophora both show tissue level of organisation, so they must have identical digestive system complexity." Evaluate this.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'level of organisation', 'identical system complexity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "organ level of organisation" and "organ system level of organisation" differ only in the number of organs present, and.' },
                { id: 'b', prompt: 'Given an unknown triploblastic animal with organ-level organisation, bilateral symmetry, and an incomplete digestive system (single opening), identify its.', answer: 'Phylum Platyhelminthes',
                  options: ['Phylum Platyhelminthes', 'organ level of organisation', 'organ system level of organisation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "organ level of organisation" and "organ system level of organisation" differ only in the number of organs present, and.' },
                { id: 'c', prompt: 'Compare the circulatory system organisation in Annelida (earthworm) and Arthropoda (cockroach) at the organ-system level.', answer: 'Both achieve organ-system level',
                  options: ['Both achieve organ-system level', 'open circulation means lower organisation level', 'organ level of organisation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "organ level of organisation" and "organ system level of organisation" differ only in the number of organs present, and.' }
          ],
            remediations: { 'organ-level-of-organisation-and': { steps: ['Draw two flowcharts side-by-side. Left: "Organ Level (Platyhelminthes)" - list organs as isolated boxes (Brain,.', 'Ask "Which diagram shows organs working as a coordinated unit for a physiological function?"', 'Have student write one-sentence definition: "Organ system level = organs linked by common physiological function and.', 'Apply to new example - leech (Hirudinaria) has segmented nephridia connected by longitudinal excretory canals → organ.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "organ level of organisation" and "organ system level of organisation" differ only in the number of.',
          parts: [
                { id: 'a', prompt: 'A researcher discovers a new marine worm with these features: triploblastic, bilateral symmetry, true coelom, metameric segmentation, complete digestive.', answer: 'Organ-system level',
                  options: ['Organ-system level', 'segmentation', 'complete gut', 'organ level of organisation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "organ level of organisation" and "organ system level of organisation" differ only in the number of organs present, and.' }
          ],
            remediations: { 'organ-level-of-organisation-and': { steps: ['Draw two flowcharts side-by-side. Left: "Organ Level (Platyhelminthes)" - list organs as isolated boxes (Brain,.', 'Ask "Which diagram shows organs working as a coordinated unit for a physiological function?"', 'Have student write one-sentence definition: "Organ system level = organs linked by common physiological function and.', 'Apply to new example - leech (Hirudinaria) has segmented nephridia connected by longitudinal excretory canals → organ.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_008', difficulty: 'standard',
          question: 'Phylum Annelida consists of triploblastic, bilaterally symmetrical, coelomate.',
          hint: 'Revisit c11_bio_cbse_04_001 (Basis of Classification) sections 4.1.3, 4.1.4, 4.1.5 and.',
          misconception: 'Students often think "metameric segmentation" means only external rings (annuli).',
          parts: [
                { id: 'a', prompt: 'An unknown worm specimen shows: (i) distinct external rings, (ii) parapodia with setae on lateral sides, (iii) closed circulation, (iv) nephridia in each.', answer: 'Class Polychaeta (e.g., Nereis)',
                  options: ['Class Polychaeta (e.g., Nereis)', 'metameric segmentation', '"metameric segmentation" means only external rings (annuli)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metameric segmentation" means only external rings (annuli).' },
                { id: 'b', prompt: 'Compare the excretory structures of Platyhelminthes (flame cells), Aschelminthes (excretory tube), and Annelida (nephridia).', answer: 'Flame cells (protonephridia) in acoelomates filter interstitial fluid',
                  options: ['Flame cells (protonephridia) in acoelomates filter interstitial fluid', 'metameric segmentation', '"metameric segmentation" means only external rings (annuli)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metameric segmentation" means only external rings (annuli).' }
          ],
            remediations: { 'metameric-segmentation-means-only-external': { steps: ['Draw a cross-section of an earthworm segment showing coelom, gut, ventral nerve cord, nephridium, and.', 'Label which structures are repeated in each segment (nephridium, nerve ganglion, blood vessel loops).', 'Contrast with a leech cross-section — note reduced coelom (botryoidal tissue) and fixed segment number.', 'Write one-sentence definition: "True metamerism = internal organ repetition, not just external rings."'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "metameric segmentation" means only external rings (annuli).',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Earthworms are hermaphrodites but cross-fertilization is obligatory; therefore, they cannot self-fertilize." Is it fully correct?', answer: 'Statement is correct',
                  options: ['Statement is correct', 'metameric segmentation', '"metameric segmentation" means only external rings (annuli)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metameric segmentation" means only external rings (annuli).' },
                { id: 'b', prompt: 'Compare the excretory structures of Platyhelminthes (flame cells), Aschelminthes (excretory tube), and Annelida (nephridia).', answer: 'Flame cells (protonephridia) in acoelomates filter interstitial fluid',
                  options: ['Flame cells (protonephridia) in acoelomates filter interstitial fluid', 'metameric segmentation', '"metameric segmentation" means only external rings (annuli)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metameric segmentation" means only external rings (annuli).' }
          ],
            remediations: { 'metameric-segmentation-means-only-external': { steps: ['Draw a cross-section of an earthworm segment showing coelom, gut, ventral nerve cord, nephridium, and.', 'Label which structures are repeated in each segment (nephridium, nerve ganglion, blood vessel loops).', 'Contrast with a leech cross-section — note reduced coelom (botryoidal tissue) and fixed segment number.', 'Write one-sentence definition: "True metamerism = internal organ repetition, not just external rings."'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
