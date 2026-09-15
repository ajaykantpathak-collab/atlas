import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch15_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch15_p2: SimDef = {
    id: 'v3_c11_bio_ch15_p2',
    title: 'Body Fluids and Circulation · Part 2/2',
    subtitle: 'Read blood as a designed tissue — plasma proteins, anucleate carriers, and a defence force with specialties.',
    classLevel: 11, subject: 'biology', topic: 'Body Fluids and Circulation · Part 2/2',
    chapters: ['c11_bio_ch15'],
    nodeIds: ['c11_bio_cbse_15_007', 'c11_bio_cbse_15_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a haematologist interpreting a patient\'s differential count', intro: 'Three values on this report are flagged abnormal. Each one is a different system failing — name them and predict the consequences.', goal: 'Describe plasma and formed elements, classify leucocytes and their roles, and connect RBC structure to gas transport and lifespan.' },
    discovery: {
        question: 'Your red blood cells are made, work flat out for 120 days, and are recycled — and they accomplish this with no nucleus at all. Losing the nucleus sounds like a defect. Why is it actually the whole point?',
        options: ['Ejecting the nucleus frees maximum room for haemoglobin and lets the biconcave disc flex through capillaries — at the cost of being unable to repair itself', 'The nucleus is lost so the cell becomes lighter and floats in plasma', 'The nucleus migrates into neighbouring cells for storage', 'It isn\'t lost — it\'s just invisible under a light microscope'],
        answer: 'Ejecting the nucleus frees maximum room for haemoglobin and lets the biconcave disc flex through capillaries — at the cost of being unable to repair itself',
        hook: 'Blood cells are engineered sacrifices — every feature of an RBC trades longevity for cargo capacity.',
    },
    teaching: [
        { title: 'Disorders of Circulatory System: Hypertension and Atherosclerosis', text: 'Hypertension is a chronic medical condition characterized by persistently elevated systemic arterial blood pressure (≥140/90 mmHg on repeated measurements) that damages vascular endothelium and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_15_007', title: 'Your mission',
          mission: { widget: 'heart', validate: 'heart:rate=80',
            instruction: 'On the lab: raise the heart rate to 80 bpm — watch the ECG trace.',
        context: 'Read a real blood report — low RBCs, high neutrophils, low platelets — and diagnose what\'s wrong, then explain why \'serum is plasma without fibrinogen\' is almost right but incomplete.',
            observePrompt: 'What did the heart interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_15_007', title: 'Disorders of Circulatory System: Hypertension and Atherosclerosis',
          scaffold: { problem: 'A 55-year-old woman has blood pressure readings of 158/96, 152/94, and 160/98 mmHg on three separate clinic visits.',
            steps: [
            { text: 'Verify hypertension diagnosis — average systolic (158+152+160)/3 = 156.7 mmHg; average diastolic (96+94+98)/3 = 96.' },
            { text: 'Calculate MAP = 96 + 1/3(156.7 - 96) = 96 + 20.2 = 116.2 mmHg (normal <100).' },
            { text: 'Calculate Pulse Pressure = 156.7 - 96 = 60.7 mmHg (normal ~40).' },
            { text: 'Assess lipid risk — LDL 155 mg/dL (high, >130), HDL 42 mg/dL (low, <50 for women), non-HDL = 240-42 = 198 mg/dL (high).' },
            { text: 'Integrate — Hypertension + dyslipidemia = synergistic endothelial damage.' },
            { text: 'Conclusion — High cardiovascular risk requiring both antihypertensive and lipid-lowering therapy per guidelines.', faded: true, blankAnswer: 'MAP = 116.2 mmHg, Pulse Pressure = 60.7 mmHg. Stage 2.' }
            ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_15_008', title: 'Lymph and Lymphatic System',
          caseStudy: { intro: 'Start with a relatable observation: when you get a small cut or swelling, you may notice a clear fluid oozing out – that\'s not blood, it\'s lymph.',
            decisions: [{ prompt: 'What is the primary source of lymph in the human body, and how does it enter the lymphatic system?', options: [
                { text: 'Lymph originates as interstitial fluid (tissue fluid) that forms when water and small', outcome: 'Lymph originates as interstitial fluid (tissue fluid) that forms when water and small water-soluble.' },
                { text: 'lymph is secreted by lymph nodes', outcome: 'Not quite — Students often think lymph is simply "blood without red cells" and that it circulates in a loop.', reveals: 'lymph-is-simply-blood-without' },
                { text: 'lymph comes directly from arteries', outcome: 'Not quite — Students often think lymph is simply "blood without red cells" and that it circulates in a loop.', reveals: 'lymph-is-simply-blood-without' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_15_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your school hosts a blood-donation camp and a doctor shows smears explaining why a patient\'s report reads \'neutrophilia last week, lymphocytosis this week\'. A volunteer explains to donors: \'All white cells fight infection the same way — they eat germs. T cells eat bacteria, B cells make the eating chemicals.\'',
            decisions: [{ prompt: 'Correct the volunteer\'s explanation.', options: [
                { text: 'Innate responders (neutrophils, monocytes) phagocytose fast — that\'s the early neutrophilia in acute bacterial infection. Adaptive lymphocytes don\'t engulf: B cells mature into plasma cells that secrete antibodies, T cells kill infected cells or activate other immune cells — explaining the later lymphocytosis in viral/chronic phases.', outcome: 'WBC types split into innate phagocytes and adaptive lymphocytes with distinct weapons; the differential count reads like an infection timeline.' },
                { text: 'The volunteer is right — every WBC fights by engulfing pathogens; the different names are just sizes.', outcome: 'Lymphocytes don\'t phagocytose at all; they run antibody production and cell-mediated killing — a different division of immune labour.', reveals: 'all-wbc-are-phagocytes' },
                { text: 'Close, but swapped: T cells make the antibodies and B cells do the eating.', outcome: 'Reversed — B cells (via plasma cells) secrete antibodies; T cells kill infected cells or coordinate the response; neither \'eats\' bacteria like neutrophils do.', reveals: 'b-and-t-roles-swapped' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_15_008', title: 'You made it',
          caseStudy: { intro: 'You turned a table of cell counts into a clinical story: anaemia, infection, bleeding risk — blood composition is a diagnostic language.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'heart', prompt: 'Explore the heart interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'heart', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_007', difficulty: 'standard',
          question: 'Hypertension is a chronic medical condition characterized by persistently.',
          hint: 'Review the cardiac cycle (c11_bio_cbse_15_004) and regulation of cardiac activity.',
          misconception: 'Students believe hypertension and atherosclerosis are separate diseases — one is "high pressure," the other.',
          parts: [
                { id: 'a', prompt: 'State the diagnostic threshold values for hypertension according to NCERT Class 11 and define systolic and diastolic pressure in one sentence each.', answer: 'Hypertension is diagnosed when repeated blood pressure readings are ≥140/90 mmHg',
                  options: ['Hypertension is diagnosed when repeated blood pressure readings are ≥140/90 mmHg', 'high pressure', 'cholesterol deposits'],
                  hint: 'Review the cardiac cycle (c11_bio_cbse_15_004) and regulation of cardiac activity.',
                  misconception: 'Students believe hypertension and atherosclerosis are separate diseases — one is "high pressure," the other is "cholesterol deposits." They.' },
                { id: 'b', prompt: 'Explain why hypertension is called a \'silent killer\' despite often having no symptoms, using the concept of target organ damage.', answer: 'Hypertension damages organs silently',
                  options: ['Hypertension damages organs silently', 'high pressure', 'cholesterol deposits'],
                  hint: 'Review the cardiac cycle (c11_bio_cbse_15_004) and regulation of cardiac activity.',
                  misconception: 'Students believe hypertension and atherosclerosis are separate diseases — one is "high pressure," the other is "cholesterol deposits." They.' },
                { id: 'c', prompt: 'A 45-year-old male has BP 150/95 mmHg, LDL 160 mg/dL, HDL 35 mg/dL, and smokes 10 cigarettes/day.', answer: 'Step 1: Identify major risk factors',
                  options: ['Step 1: Identify major risk factors', 'high pressure', 'cholesterol deposits'],
                  hint: 'Review the cardiac cycle (c11_bio_cbse_15_004) and regulation of cardiac activity.',
                  misconception: 'Students believe hypertension and atherosclerosis are separate diseases — one is "high pressure," the other is "cholesterol deposits." They.' },
                { id: 'd', prompt: 'Compare the hemodynamic consequences of chronic hypertension versus acute coronary occlusion on left ventricular workload using the concepts of afterload and.', answer: 'Chronic hypertension increases afterload (pressure against',
                  options: ['Chronic hypertension increases afterload (pressure against', 'high pressure', 'cholesterol deposits'],
                  hint: 'Review the cardiac cycle (c11_bio_cbse_15_004) and regulation of cardiac activity.',
                  misconception: 'Students believe hypertension and atherosclerosis are separate diseases — one is "high pressure," the other is "cholesterol deposits." They.' }
          ],
            remediations: { 'hypertension-and-atherosclerosis-are-separate': { steps: ['Draw a feedback loop diagram on paper: Hypertension → Endothelial shear stress → VCAM-1/ICAM-1 expression → Monocyte.', 'Label each arrow with the molecular mediator (e.g., angiotensin II, ROS, MMP-9).', 'Identify two intervention points where breaking the loop benefits both conditions (ACE inhibitors reduce angiotensin.', 'Explain this to a peer using the diagram.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe hypertension and atherosclerosis are separate diseases — one is "high pressure," the other.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Atherosclerosis is solely a lipid storage disease; lowering LDL-cholesterol alone will completely prevent coronary events." Use.', answer: 'The statement is false',
                  options: ['The statement is false', 'high pressure', 'cholesterol deposits'],
                  hint: 'Review the cardiac cycle (c11_bio_cbse_15_004) and regulation of cardiac activity.',
                  misconception: 'Students believe hypertension and atherosclerosis are separate diseases — one is "high pressure," the other is "cholesterol deposits." They.' }
          ],
            remediations: { 'hypertension-and-atherosclerosis-are-separate': { steps: ['Draw a feedback loop diagram on paper: Hypertension → Endothelial shear stress → VCAM-1/ICAM-1 expression → Monocyte.', 'Label each arrow with the molecular mediator (e.g., angiotensin II, ROS, MMP-9).', 'Identify two intervention points where breaking the loop benefits both conditions (ACE inhibitors reduce angiotensin.', 'Explain this to a peer using the diagram.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_008', difficulty: 'standard',
          question: 'Lymph is a clear, colourless fluid derived from interstitial fluid that enters.',
          hint: 'Review "Transportation in Humans: Heart Structure and Double Circulation".',
          misconception: 'Students often think lymph is simply "blood without red cells" and that it circulates in a loop like blood.',
          parts: [
                { id: 'a', prompt: 'Why is lymph described as a "colourless fluid" despite being derived from blood, which is red?', answer: 'Lymph is colourless',
                  options: ['Lymph is colourless', 'lymph loses its colour in lymph nodes', 'blood without red cells', 'filters that clean lymph'],
                  hint: 'Review "Transportation in Humans: Heart Structure and Double Circulation" (c10_bio_cbse_01_009) and.',
                  misconception: 'Students often think lymph is simply "blood without red cells" and that it circulates in a loop like blood.' },
                { id: 'b', prompt: 'A patient has a blockage in the thoracic duct. Predict the consequences on (a) fluid balance in the left leg and (b) fat absorption from the intestine.', answer: 'fluid balance in the left leg and (',
                  options: ['fluid balance in the left leg and (', 'blood without red cells', 'filters that clean lymph'],
                  hint: 'Review "Transportation in Humans: Heart Structure and Double Circulation" (c10_bio_cbse_01_009) and.',
                  misconception: 'Students often think lymph is simply "blood without red cells" and that it circulates in a loop like blood.' }
          ],
            remediations: { 'lymph-is-simply-blood-without': { steps: ['Revisit capillary exchange (Starling forces) from Class 11 (if covered) or Class 10 (c10_bio_cbse_01_009) to understand.', 'Draw a diagram: blood capillary -> interstitial space -> lymphatic capillary -> lymphatic vessel -> lymph node ->.', 'Trace the path with arrows.', 'Compare with blood circulation: heart -> arteries -> capillaries -> veins -> heart.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
