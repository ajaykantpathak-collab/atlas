import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch15_p1: SimDef = {
    id: 'v3_c11_bio_ch15_p1',
    title: 'Body Fluids and Circulation · Part 1/2',
    subtitle: 'Read blood as a designed tissue — plasma proteins, anucleate carriers, and a defence force with specialties.',
    classLevel: 11, subject: 'biology', topic: 'Body Fluids and Circulation · Part 1/2',
    chapters: ['c11_bio_ch15'],
    nodeIds: ['c11_bio_cbse_15_001', 'c11_bio_cbse_15_002', 'c11_bio_cbse_15_003', 'c11_bio_cbse_15_004', 'c11_bio_cbse_15_005', 'c11_bio_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a haematologist interpreting a patient\'s differential count', intro: 'Three values on this report are flagged abnormal. Each one is a different system failing — name them and predict the consequences.', goal: 'Describe plasma and formed elements, classify leucocytes and their roles, and connect RBC structure to gas transport and lifespan.' },
    discovery: {
        question: 'Your red blood cells are made, work flat out for 120 days, and are recycled — and they accomplish this with no nucleus at all. Losing the nucleus sounds like a defect. Why is it actually the whole point?',
        options: ['Ejecting the nucleus frees maximum room for haemoglobin and lets the biconcave disc flex through capillaries — at the cost of being unable to repair itself', 'The nucleus is lost so the cell becomes lighter and floats in plasma', 'The nucleus migrates into neighbouring cells for storage', 'It isn\'t lost — it\'s just invisible under a light microscope'],
        answer: 'Ejecting the nucleus frees maximum room for haemoglobin and lets the biconcave disc flex through capillaries — at the cost of being unable to repair itself',
        hook: 'Blood cells are engineered sacrifices — every feature of an RBC trades longevity for cargo capacity.',
    },
    teaching: [
        { title: 'Blood: Plasma and Formed Elements', text: 'Blood is a specialized connective tissue composed of a fluid matrix called plasma (55% by volume) and cellular components called formed elements (45% by volume) including erythrocytes (RBCs).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_15_001', title: 'Your mission',
          mission: { widget: 'heart', validate: 'heart:rate=80',
            instruction: 'On the lab: raise the heart rate to 80 bpm — watch the ECG trace.',
        context: 'Read a real blood report — low RBCs, high neutrophils, low platelets — and diagnose what\'s wrong, then explain why \'serum is plasma without fibrinogen\' is almost right but incomplete.',
            observePrompt: 'What did the heart interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_15_001', title: 'Blood: Plasma and Formed Elements',
          caseStudy: { intro: 'When you get a small cut on your finger while chopping vegetables, you notice the bleeding stops within minutes — this everyday observation reveals blood\'s.',
            decisions: [{ prompt: 'State the percentage composition of blood by volume for plasma and formed elements, and name the three major plasma proteins with one.', options: [
                { text: 'Plasma constitutes 55% and formed elements 45% of blood volume', outcome: 'Plasma constitutes 55% and formed elements 45% of blood volume.' },
                { text: 'pathogens and T cells', outcome: 'Not quite — Students often believe that **all WBCs are phagocytic** and that **lymphocytes directly engulf.', reveals: 'all-wbcs-are-phagocytic-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_15_002', title: 'Blood Groups: ABO and Rh System',
          caseStudy: { intro: 'Imagine you are at a blood donation camp in your city. The technician pricks a donor\'s finger, mixes a drop of blood with two different solutions on a glass.',
            decisions: [{ prompt: 'State the antigens present on RBCs and antibodies present in plasma for a person with blood group AB positive.', options: [
                { text: 'Correct answer: Antigens on RBCs: A, B, and Rh (D)', outcome: 'Correct answer: Antigens on RBCs: A, B, and Rh (D). Antibodies in plasma: None (no anti-A,.' },
                { text: 'O has no antigens to pass on', outcome: 'Not quite — Students believe that a mother with blood group O negative and father AB positive *cannot* have.', reveals: 'a-mother-with-blood-group' },
                { text: 'anti-A or anti-B are present', outcome: 'Not quite — Students believe that a mother with blood group O negative and father AB positive *cannot* have.', reveals: 'a-mother-with-blood-group' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_15_003', title: 'Human Heart: Structure and Chambers',
          caseStudy: { intro: 'Place your hand on the left side of your chest — you feel a rhythmic thumping.',
            decisions: [{ prompt: 'Name the four chambers of the human heart and state which chamber receives deoxygenated blood from the body and which pumps oxygenated.', options: [
                { text: 'The four chambers are: right atrium, right ventricle, left atrium, left ventricle', outcome: 'The four chambers are: right atrium, right ventricle, left atrium, left ventricle.' },
                { text: 'the left atrium receives blood from the body', outcome: 'Not quite — Students frequently believe that the pulmonary artery carries oxygenated blood and the pulmonary.', reveals: 'students-frequently-believe-that-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_15_004', title: 'Cardiac Cycle: Phases and Heart Sounds',
          scaffold: { problem: 'A 25-year-old male has a resting heart rate of 65 bpm. His echocardiogram shows an end-diastolic volume (EDV) of 130 mL and an end-systolic.',
            steps: [
            { text: 'Calculate stroke volume at rest: SV = EDV – ESV = 130 mL – 60 mL = 70 mL.' },
            { text: 'Calculate ejection fraction (EF): EF = SV / EDV = 70 / 130 = 0.538 (53.8%).' },
            { text: 'Calculate cardiac output at rest: CO = SV × HR = 70 mL/beat × 65 beats/min = 4550 mL/min = 4.55 L/min.' },
            { text: 'Calculate cardiac cycle duration at rest: Duration = 60 / HR = 60 / 65 = 0.923 s.' },
            { text: 'During exercise, EF constant means SV scales with EDV. Assume EDV increases slightly to 140 mL due to enhanced venous.' },
            { text: 'New CO = new SV × new HR = 75.3 mL × 110 beats/min = 8283 mL/min ≈ 8.3 L/min.', faded: true, blankAnswer: 'Resting SV = 70 mL, CO = 4.55 L/min, Cycle duration = 0.92.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_15_005', title: 'Double Circulation: Pulmonary and Systemic',
          scaffold: { problem: 'A Class 11 student measures resting heart rate = 72 bpm, stroke volume = 70 mL. Calculate cardiac output.',
            steps: [
            { text: 'Recall CO = SV × HR = 70 mL × 72 bpm = 5040 mL/min ≈ 5.0 L/min.' },
            { text: 'Recognize that in a closed series circuit, left and right ventricular outputs *must* be equal over time; otherwise.' },
            { text: 'Apply ΔP = Q × R (Ohm\'s law for fluids): same flow (Q), but systemic resistance (R_sys) is ∼6× pulmonary resistance.' },
            { text: 'Left ventricle pressure = Q × R_sys ≈ 5 L/min × 20 mmHg·min/L = 100 mmHg (mean); right ventricle pressure = Q × R_pulm.' },
            { text: 'Relate to anatomy: left ventricular wall thickness (10-15 mm) vs right (3-5 mm) matches the 6× pressure ratio.', faded: true, blankAnswer: 'CO = 5.04 L/min. Left ventricle generates higher pressure.' }
            ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_15_006', title: 'Regulation of Cardiac Activity: Neural and Hormonal',
          caseStudy: { intro: 'Notice how your heart races when you sprint to catch a bus or before an exam — this is not the heart deciding on its own, but your brain and hormones.',
            decisions: [{ prompt: 'What is the intrinsic firing rate of the human sino-atrial node, and why is the heart described as myogenic?', options: [
                { text: 'The SA node intrinsically fires at 70–75 action potentials per minute (average 72 bpm)', outcome: 'The SA node intrinsically fires at 70–75 action potentials per minute (average 72 bpm) without any.' },
                { text: 'heart needs nerves to beat', outcome: 'Not quite — Students believe that the sympathetic and parasympathetic systems always act in a simple "on/off".', reveals: 'the-sympathetic-and-parasympathetic-systems' },
                { text: 'on/off', outcome: 'Not quite — Students believe that the sympathetic and parasympathetic systems always act in a simple "on/off".', reveals: 'the-sympathetic-and-parasympathetic-systems' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_15_002', title: 'Identify each idea',
          dissect: { specimen: 'Body Fluids and Circulation · Part 1/2', spots: [
            { id: 's1', label: 'Blood Plasma and Formed Elements', prompt: 'Which idea is this? — Blood is a specialized connective tissue composed of a fluid matrix called plasma (55%.', answer: 'Blood Plasma and Formed Elements', options: ['Blood Plasma and Formed Elements', 'Blood Groups ABO and Rh System', 'Human Heart Structure and Chambers', 'Cardiac Cycle Phases and Heart Sounds'] },
            { id: 's2', label: 'Blood Groups ABO and Rh System', prompt: 'Which idea is this? — The ABO blood group system classifies human blood based on the presence or absence of two.', answer: 'Blood Groups ABO and Rh System', options: ['Blood Groups ABO and Rh System', 'Blood Plasma and Formed Elements', 'Human Heart Structure and Chambers', 'Cardiac Cycle Phases and Heart Sounds'] },
            { id: 's3', label: 'Human Heart Structure and Chambers', prompt: 'Which idea is this? — The human heart is a four-chambered, muscular pumping organ located in the thoracic.', answer: 'Human Heart Structure and Chambers', options: ['Human Heart Structure and Chambers', 'Blood Plasma and Formed Elements', 'Blood Groups ABO and Rh System', 'Cardiac Cycle Phases and Heart Sounds'] },
            { id: 's4', label: 'Cardiac Cycle Phases and Heart Sounds', prompt: 'Which idea is this? — The cardiac cycle is the complete sequence of mechanical events occurring in the heart.', answer: 'Cardiac Cycle Phases and Heart Sounds', options: ['Cardiac Cycle Phases and Heart Sounds', 'Blood Plasma and Formed Elements', 'Blood Groups ABO and Rh System', 'Human Heart Structure and Chambers'] },
            { id: 's5', label: 'Double Circulation Pulmonary and Systemic', prompt: 'Which idea is this? — Double circulation is a circulatory pathway in which blood passes through the heart twice.', answer: 'Double Circulation Pulmonary and Systemic', options: ['Double Circulation Pulmonary and Systemic', 'Blood Plasma and Formed Elements', 'Blood Groups ABO and Rh System', 'Human Heart Structure and Chambers'] },
            { id: 's6', label: 'Regulation of Cardiac Activity Neural and Hormonal', prompt: 'Which idea is this? — Regulation of cardiac activity refers to the physiological mechanisms by which the.', answer: 'Regulation of Cardiac Activity Neural and Hormonal', options: ['Regulation of Cardiac Activity Neural and Hormonal', 'Blood Plasma and Formed Elements', 'Blood Groups ABO and Rh System', 'Human Heart Structure and Chambers'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_15_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your school hosts a blood-donation camp and a doctor shows smears explaining why a patient\'s report reads \'neutrophilia last week, lymphocytosis this week\'. A volunteer explains to donors: \'All white cells fight infection the same way — they eat germs. T cells eat bacteria, B cells make the eating chemicals.\'',
            decisions: [{ prompt: 'Correct the volunteer\'s explanation.', options: [
                { text: 'Innate responders (neutrophils, monocytes) phagocytose fast — that\'s the early neutrophilia in acute bacterial infection. Adaptive lymphocytes don\'t engulf: B cells mature into plasma cells that secrete antibodies, T cells kill infected cells or activate other immune cells — explaining the later lymphocytosis in viral/chronic phases.', outcome: 'WBC types split into innate phagocytes and adaptive lymphocytes with distinct weapons; the differential count reads like an infection timeline.' },
                { text: 'The volunteer is right — every WBC fights by engulfing pathogens; the different names are just sizes.', outcome: 'Lymphocytes don\'t phagocytose at all; they run antibody production and cell-mediated killing — a different division of immune labour.', reveals: 'all-wbc-are-phagocytes' },
                { text: 'Close, but swapped: T cells make the antibodies and B cells do the eating.', outcome: 'Reversed — B cells (via plasma cells) secrete antibodies; T cells kill infected cells or coordinate the response; neither \'eats\' bacteria like neutrophils do.', reveals: 'b-and-t-roles-swapped' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_15_006', title: 'The bigger picture',
          caseStudy: { intro: 'You turned a table of cell counts into a clinical story: anaemia, infection, bleeding risk — blood composition is a diagnostic language.',
            decisions: [{ prompt: 'What comes next? Body Fluids and Circulation · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Body Fluids and Circulation · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'heart', prompt: 'Explore the heart interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'heart', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_001', difficulty: 'standard',
          question: 'Blood is a specialized connective tissue composed of a fluid matrix called.',
          hint: 'If stuck, revisit Class 10 Chapter "Life Processes" — Blood composition (RBC, WBC.',
          misconception: 'Students often believe that **all WBCs are phagocytic** and that **lymphocytes directly engulf bacteria** like.',
          parts: [
                { id: 'a', prompt: 'State the percentage composition of blood by volume for plasma and formed elements, and name the three major plasma proteins with one function each.', answer: 'Plasma constitutes 55% and formed elements 45% of blood volume',
                  options: ['Plasma constitutes 55% and formed elements 45% of blood volume', 'pathogens and T cells'],
                  hint: 'If stuck, revisit Class 10 Chapter "Life Processes" — Blood composition (RBC, WBC, platelets.',
                  misconception: 'Students often believe that **all WBCs are phagocytic** and that **lymphocytes directly engulf bacteria** like neutrophils do.' },
                { id: 'b', prompt: 'A patient\'s blood report shows: RBC count 3.5 million/mm³, WBC count 12,000/mm³ with 80% neutrophils, platelet count 80,000/mm³.', answer: 'Abnormal values: (1) RBC 3.5 million/mm³ (low',
                  options: ['Abnormal values: (1) RBC 3.5 million/mm³ (low', 'pathogens and T cells'],
                  hint: 'If stuck, revisit Class 10 Chapter "Life Processes" — Blood composition (RBC, WBC, platelets.',
                  misconception: 'Students often believe that **all WBCs are phagocytic** and that **lymphocytes directly engulf bacteria** like neutrophils do.' },
                { id: 'c', prompt: 'Compare and contrast the roles of neutrophils, eosinophils, basophils, lymphocytes (B and T), and monocytes in the immune response.', answer: 'Neutrophils and monocytes are phagocytic (engulf pathogens)',
                  options: ['Neutrophils and monocytes are phagocytic (engulf pathogens)', 'pathogens and T cells'],
                  hint: 'If stuck, revisit Class 10 Chapter "Life Processes" — Blood composition (RBC, WBC, platelets.',
                  misconception: 'Students often believe that **all WBCs are phagocytic** and that **lymphocytes directly engulf bacteria** like neutrophils do.' }
          ],
            remediations: { 'all-wbcs-are-phagocytic-and': { steps: ['Draw a two-column table — "Innate Immunity (Rapid, Non-specific)" vs "Adaptive Immunity (Slow, Specific)."', 'Place neutrophils and monocytes under innate with "phagocytosis" as action; place B and T lymphocytes under adaptive.', 'For B cells, write "differentiate into plasma cells → secrete antibodies"; for T cells, write "cytotoxic T cells kill.', 'Re-read NCERT lines on WBC functions and match each cell type to its column.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **all WBCs are phagocytic** and that **lymphocytes directly engulf bacteria** like.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Serum is simply plasma without fibrinogen." Is this accurate?', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'pathogens and T cells'],
                  hint: 'If stuck, revisit Class 10 Chapter "Life Processes" — Blood composition (RBC, WBC, platelets.',
                  misconception: 'Students often believe that **all WBCs are phagocytic** and that **lymphocytes directly engulf bacteria** like neutrophils do.' },
                { id: 'b', prompt: 'Design a simple investigation using a light microscope and Wright\'s stain to differentiate the five types of WBCs in a peripheral blood smear.', answer: 'Prepare a thin blood smear, fix with methanol, stain with Wright\'s stain',
                  options: ['Prepare a thin blood smear, fix with methanol, stain with Wright\'s stain', 'pathogens and T cells'],
                  hint: 'If stuck, revisit Class 10 Chapter "Life Processes" — Blood composition (RBC, WBC, platelets.',
                  misconception: 'Students often believe that **all WBCs are phagocytic** and that **lymphocytes directly engulf bacteria** like neutrophils do.' }
          ],
            remediations: { 'all-wbcs-are-phagocytic-and': { steps: ['Draw a two-column table — "Innate Immunity (Rapid, Non-specific)" vs "Adaptive Immunity (Slow, Specific)."', 'Place neutrophils and monocytes under innate with "phagocytosis" as action; place B and T lymphocytes under adaptive.', 'For B cells, write "differentiate into plasma cells → secrete antibodies"; for T cells, write "cytotoxic T cells kill.', 'Re-read NCERT lines on WBC functions and match each cell type to its column.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_002', difficulty: 'standard',
          question: 'The ABO blood group system classifies human blood based on the presence.',
          hint: 'Review Class 10 genetics (c10_bio_cbse_04_004) for multiple alleles and codominance, and.',
          misconception: 'Students believe that a mother with blood group O negative and father AB positive *cannot* have a child with blood.',
          parts: [
                { id: 'a', prompt: 'State the antigens present on RBCs and antibodies present in plasma for a person with blood group AB positive.', answer: 'Correct answer: Antigens on RBCs: A, B, and Rh (D)',
                  options: ['Correct answer: Antigens on RBCs: A, B, and Rh (D)', 'O has no antigens to pass on', 'anti-A or anti-B are present'],
                  hint: 'Review Class 10 genetics (c10_bio_cbse_04_004) for multiple alleles and codominance, and Class 8.',
                  misconception: 'Students believe that a mother with blood group O negative and father AB positive *cannot* have a child with blood group B positive because.' },
                { id: 'b', prompt: 'Explain why a person with blood group O is called a \'universal donor\' for whole blood but *not* a universal donor for plasma.', answer: 'Correct answer: Group O RBCs lack A and B antigens, so they are not attacked by',
                  options: ['Correct answer: Group O RBCs lack A and B antigens, so they are not attacked by', 'O = universal donor', 'O has no antigens to pass on'],
                  hint: 'Review Class 10 genetics (c10_bio_cbse_04_004) for multiple alleles and codominance, and Class 8.',
                  misconception: 'Students believe that a mother with blood group O negative and father AB positive *cannot* have a child with blood group B positive because.' },
                { id: 'c', prompt: 'A patient with blood group B negative requires an urgent red blood cell transfusion.', answer: 'Correct answer: Only O negative is compatible',
                  options: ['Correct answer: Only O negative is compatible', 'same ABO group = always safe', 'O has no antigens to pass on', 'B positive'],
                  hint: 'Review Class 10 genetics (c10_bio_cbse_04_004) for multiple alleles and codominance, and Class 8.',
                  misconception: 'Students believe that a mother with blood group O negative and father AB positive *cannot* have a child with blood group B positive because.' }
          ],
            remediations: { 'a-mother-with-blood-group': { steps: ['Revisit the ABO allele system (IA, IB, i) from Class 10 genetics (c10_bio_cbse_04_004).', 'Construct a Punnett square for mother (ii) × father (IAIB). Show that 50% offspring are IAi (group A) and 50% are IBi.', 'Do the same for Rh: mother (rr) × father (Rr) → 50% Rr (Rh+), 50% rr (Rh-).', 'Combine: child can be B+ (IBi, Rr). This allele-level approach replaces the faulty "antigen-only" mental model.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_003', difficulty: 'standard',
          question: 'The human heart is a four-chambered, muscular pumping organ located in the.',
          hint: 'Review Class 10 Transportation in Humans (c10_bio_cbse_01_009) and Blood Composition.',
          misconception: 'Students frequently believe that the pulmonary artery carries oxygenated blood and the pulmonary vein carries.',
          parts: [
                { id: 'a', prompt: 'A patient is diagnosed with a defective bicuspid (mitral) valve that does not close completely during ventricular systole.', answer: 'During left ventricular systole, the incompetent bicuspid valve allows blood to',
                  options: ['During left ventricular systole, the incompetent bicuspid valve allows blood to', 'blood flows back into the right atrium', 'no effect on lungs', 'double circulation'],
                  hint: 'Review Class 10 Transportation in Humans (c10_bio_cbse_01_009) and Blood Composition.',
                  misconception: 'Students frequently believe that the pulmonary artery carries oxygenated blood and the pulmonary vein carries deoxygenated blood, because.' },
                { id: 'b', prompt: 'Compare the structure of the tricuspid valve and the bicuspid (mitral) valve.', answer: 'Both valves prevent backflow from ventricles to atria during systole',
                  options: ['Both valves prevent backflow from ventricles to atria during systole', 'tricuspid has three cusps', 'bicuspid is stronger'],
                  hint: 'Review Class 10 Transportation in Humans (c10_bio_cbse_01_009) and Blood Composition.',
                  misconception: 'Students frequently believe that the pulmonary artery carries oxygenated blood and the pulmonary vein carries deoxygenated blood, because.' }
          ],
            remediations: { 'students-frequently-believe-that-the': { steps: ['Draw a simple flowchart: Heart → (pulmonary artery) → Lungs → (pulmonary veins) → Heart.', 'At each arrow, write the oxygen status: deoxygenated → Lungs → oxygenated.', 'Explicitly contrast with systemic: Heart → (aorta) → Body → (vena cava) → Heart.', 'Use a mnemonic: "Pulmonary Artery = Poor oxygen (PA = Poor), Pulmonary Vein = Plenty oxygen (PV = Plenty)."'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_004', difficulty: 'standard',
          question: 'The cardiac cycle is the complete sequence of mechanical events occurring.',
          hint: 'Review c11_bio_cbse_15_003 (Human Heart: Structure and Chambers) focusing on valve names.',
          misconception: 'Students believe the "lub-dub" sounds are caused by the heart muscle contracting and relaxing (i.e., the "thump".',
          parts: [
                { id: 'a', prompt: 'Explain why the first heart sound (S1, "lub") is louder and longer than the second heart sound (S2, "dub") in a healthy adult.', answer: 'S1 corresponds to closure of the larger, thicker atrioventricular (tricuspid and',
                  options: ['S1 corresponds to closure of the larger, thicker atrioventricular (tricuspid and', 'S1 is louder because it\'s the first sound', 'S2 is due to AV valve closure', 'lub-dub'],
                  hint: 'Review c11_bio_cbse_15_003 (Human Heart: Structure and Chambers) focusing on valve names.',
                  misconception: 'Students believe the "lub-dub" sounds are caused by the heart muscle contracting and relaxing (i.e., the "thump" of muscle hitting the.' },
                { id: 'b', prompt: 'A student records a heart rate of 90 beats/min in a subject after moderate exercise.', answer: 'Step 1: Cycle duration = 60 sec / 90 beats = 0.667 s per cycle',
                  options: ['Step 1: Cycle duration = 60 sec / 90 beats = 0.667 s per cycle', 'lub-dub', 'the "lub-dub" sounds are caused by the heart muscle contracting and relaxing (i'],
                  hint: 'Review c11_bio_cbse_15_003 (Human Heart: Structure and Chambers) focusing on valve names.',
                  misconception: 'Students believe the "lub-dub" sounds are caused by the heart muscle contracting and relaxing (i.e., the "thump" of muscle hitting the.' }
          ],
            remediations: { 'the-lub-dub-sounds-are': { steps: ['Use a clear plastic tube with two one-way valves (one large, one small) and water to demonstrate valve closure sounds.', 'Draw a pressure-time graph for left atrium, left ventricle, and aorta on the same axes; mark valve open/close points.', 'Practice identifying S1 and S2 on a phonocardiogram recording: S1 coincides with the upstroke of the carotid pulse.', 'Re-read NCERT lines: "The first heart sound (lub) is associated with the closure of the tricuspid and bicuspid valves.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_005', difficulty: 'standard',
          question: 'Double circulation is a circulatory pathway in which blood passes through the.',
          hint: 'Revisit c11_bio_cbse_15_003 (heart structure) focusing on vessel-chamber connections, and.',
          misconception: 'Students believe the pulmonary and systemic circuits operate independently — that the right heart "handles lungs" and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Double circulation is a circulatory pathway in',
                  options: ['Double circulation is a circulatory pathway in', 'Blood is a specialized connective tissue composed of a fluid matrix called plasma (55% by', 'The ABO blood group system classifies human blood based on the presence or absence of two', 'The human heart is a four-chambered, muscular pumping organ located in the thoracic'],
                  hint: 'Revisit c11_bio_cbse_15_003 (heart structure) focusing on vessel-chamber connections, and.',
                  misconception: 'Students believe the pulmonary and systemic circuits operate independently — that the right heart "handles lungs" and left heart "handles.' }
          ],
            remediations: { 'the-pulmonary-and-systemic-circuits': { steps: ['Draw the heart on paper with blue/red pencils.', 'Trace one RBC\'s path aloud: "Deoxygenated enters RA, passes tricuspid, RV contracts, pushes through pulmonary valve...".', 'Build a "pressure profile" table: list RA, RV, PA, LA, LV, Ao pressures (use typical values: 5, 25, 15, 8, 120, 95.', 'Plot them; visualize the two pumps.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_006', difficulty: 'standard',
          question: 'Regulation of cardiac activity refers to the physiological mechanisms by which.',
          hint: 'If stuck, revisit c11_bio_cbse_15_003 (Heart Structure — nodal tissue location) and.',
          misconception: 'Students believe that the sympathetic and parasympathetic systems always act in a simple "on/off" or "push-pull" manner.',
          parts: [
                { id: 'a', prompt: 'A student experiences sudden fear before an exam. Trace the sequence from the hypothalamus to the change in cardiac output, naming the neural and hormonal.', answer: 'Step 1: Hypothalamus activates the sympathetic division of ANS',
                  options: ['Step 1: Hypothalamus activates the sympathetic division of ANS', 'on/off', 'push-pull'],
                  hint: 'If stuck, revisit c11_bio_cbse_15_003 (Heart Structure — nodal tissue location) and.',
                  misconception: 'Students believe that the sympathetic and parasympathetic systems always act in a simple "on/off" or "push-pull" manner where one is active.' }
          ],
            remediations: { 'the-sympathetic-and-parasympathetic-systems': { steps: ['Have the student measure their resting pulse, then do 30 seconds of jumping jacks, and measure pulse every 10 seconds.', 'Plot the data — they will see an immediate sharp rise (parasympathetic withdrawal + sympathetic activation) and.', 'Ask them to mark where "neural" vs "hormonal" effects dominate on their graph.', 'Explain that at rest, if they hold their breath (increasing CO₂), HR initially rises via sympathetic chemoreflex, but.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
