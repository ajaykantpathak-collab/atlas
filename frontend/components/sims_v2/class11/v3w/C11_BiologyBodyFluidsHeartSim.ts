import type { SimDef } from '../../engine/types';
import C11_BiologyBodyFluidsHeartSim from '../../../simulations/three/C11_BiologyBodyFluidsHeartSim';

/** v3 wrapped master — C11_BiologyBodyFluidsHeartSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biologybodyfluidsheartsim: SimDef = {
    id: 'v3w_c11_biologybodyfluidsheartsim',
    title: 'Body Fluids Heart',
    subtitle: 'Covers the anatomical pathways of pulmonary and systemic circuits including hepatic.',
    classLevel: 11, subject: 'biology', topic: 'Double Circulation: Pulmonary and Systemic',
    chapters: [],
    nodeIds: ['c11_bio_cbse_15_005', 'c11_bio_cbse_15_003', 'c11_bio_cbse_15_004', 'c11_bio_cbse_15_007', 'c11_bio_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine running to catch a bus in Delhi\'s winter air — your leg muscles burn, your heart pounds, and you gasp.', goal: 'Master Body Fluids Heart.' },
    discovery: {
        question: 'A patient is diagnosed with a defective bicuspid (mitral) valve that does not close completely during ventricular systole.',
        options: ['During left ventricular systole, the incompetent bicuspid valve allows blood to', 'blood flows back into the right atrium', 'no effect on lungs'],
        answer: 'During left ventricular systole, the incompetent bicuspid valve allows blood to',
        hook: 'Students frequently believe that the pulmonary artery carries oxygenated blood and the pulmonary vein carries.',
    },
    teaching: [
        { title: 'Double circulation is a circulatory pathway.', text: 'Double circulation is a circulatory pathway in which blood passes through the heart twice to complete one full circuit of the body, comprising two distinct circuits: pulmonary circulation (right.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
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
        { type: 'scaffold', nodeId: 'c11_bio_cbse_15_007', title: 'Hypertension is a chronic medical.',
          scaffold: { problem: 'A 55-year-old woman has blood pressure readings of 158/96, 152/94, and 160/98 mmHg on three separate clinic visits.',
            steps: [
            { text: 'Verify hypertension diagnosis — average systolic (158+152+160)/3 = 156.7 mmHg; average diastolic (96+94+98)/3 = 96.' },
            { text: 'Calculate MAP = 96 + 1/3(156.7 - 96) = 96 + 20.2 = 116.2 mmHg (normal <100).' },
            { text: 'Calculate Pulse Pressure = 156.7 - 96 = 60.7 mmHg (normal ~40).' },
            { text: 'Assess lipid risk — LDL 155 mg/dL (high, >130), HDL 42 mg/dL (low, <50 for women), non-HDL = 240-42 = 198 mg/dL (high).' },
            { text: 'Integrate — Hypertension + dyslipidemia = synergistic endothelial damage.' },
            { text: 'Conclusion — High cardiovascular risk requiring both antihypertensive and lipid-lowering therapy per guidelines.', faded: true, blankAnswer: 'MAP = 116.2 mmHg, Pulse Pressure = 60.7 mmHg. Stage 2.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_15_006', title: 'Regulation of cardiac activity refers.',
          scaffold: { problem: 'A 20-year-old student has a resting heart rate of 68 bpm and stroke volume of 75 mL.',
            steps: [
            { text: 'Recall the formula CO = HR × SV. Compute resting CO = 68 beats/min × 75 mL/beat = 5100 mL/min = 5.1 L/min.' },
            { text: 'Compute exercise CO = 185 beats/min × 110 mL/beat = 20,350 mL/min = 20.35 L/min.' },
            { text: 'Calculate fold increase = 20.35 / 5.1 ≈ 4.0× (cardiac output quadruples).' },
            { text: 'Analyze proportional changes: HR increased by (185-68)/68 = 172%; SV increased by (110-75)/75 = 47%.' },
            { text: 'Conclude that neural/hormonal regulation primarily drives HR up, while SV increase is constrained by reduced filling.', faded: true, blankAnswer: 'Resting CO = 5.1 L/min; Sprint CO = 20.35 L/min; 4-fold.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_15_003', title: 'Identify each idea',
          dissect: { specimen: 'Body Fluids Heart', spots: [
            { id: 's1', label: 'Double circulation is a circulatory', prompt: 'Which idea is this? — Double circulation is a circulatory pathway in which blood passes through the heart twice.', answer: 'Double circulation is a circulatory', options: ['Double circulation is a circulatory', 'The human heart is a', 'The cardiac cycle is the', 'Hypertension is a chronic medical'] },
            { id: 's2', label: 'The human heart is a', prompt: 'Which idea is this? — The human heart is a four-chambered, muscular pumping organ located in the thoracic.', answer: 'The human heart is a', options: ['The human heart is a', 'Double circulation is a circulatory', 'The cardiac cycle is the', 'Hypertension is a chronic medical'] },
            { id: 's3', label: 'The cardiac cycle is the', prompt: 'Which idea is this? — The cardiac cycle is the complete sequence of mechanical events occurring in the heart.', answer: 'The cardiac cycle is the', options: ['The cardiac cycle is the', 'Double circulation is a circulatory', 'The human heart is a', 'Hypertension is a chronic medical'] },
            { id: 's4', label: 'Hypertension is a chronic medical', prompt: 'Which idea is this? — Hypertension is a chronic medical condition characterized by persistently elevated.', answer: 'Hypertension is a chronic medical', options: ['Hypertension is a chronic medical', 'Double circulation is a circulatory', 'The human heart is a', 'The cardiac cycle is the'] },
            { id: 's5', label: 'Regulation of cardiac activity refers', prompt: 'Which idea is this? — Regulation of cardiac activity refers to the physiological mechanisms by which the.', answer: 'Regulation of cardiac activity refers', options: ['Regulation of cardiac activity refers', 'Double circulation is a circulatory', 'The human heart is a', 'The cardiac cycle is the'] }
          ] } }
    ],
    explore: { component: C11_BiologyBodyFluidsHeartSim, prompt: 'Explore the interactive — Body Fluids Heart' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_005', difficulty: 'standard',
          question: 'Double circulation is a circulatory pathway in which blood passes through the.',
          hint: 'Revisit c11_bio_cbse_15_003 (heart structure) focusing on vessel-chamber connections, and.',
          misconception: 'Students believe the pulmonary and systemic circuits operate independently — that the right heart "handles lungs" and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Double circulation is a circulatory pathway in',
                  options: ['Double circulation is a circulatory pathway in', 'The human heart is a four-chambered, muscular pumping organ located in the thoracic', 'The cardiac cycle is the complete sequence of mechanical events occurring in the heart', 'Hypertension is a chronic medical condition characterized by persistently elevated'],
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
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_007', difficulty: 'standard',
          question: 'Hypertension is a chronic medical condition characterized by persistently.',
          hint: 'Review the cardiac cycle (c11_bio_cbse_15_004) and regulation of cardiac activity.',
          misconception: 'Students believe hypertension and atherosclerosis are separate diseases — one is "high pressure," the other is.',
          parts: [
                { id: 'a', prompt: 'State the diagnostic threshold values for hypertension according to NCERT Class 11 and define systolic and diastolic pressure in one sentence each.', answer: 'Hypertension is diagnosed when repeated blood pressure readings are ≥140/90 mmHg',
                  options: ['Hypertension is diagnosed when repeated blood pressure readings are ≥140/90 mmHg', 'high pressure', 'cholesterol deposits'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe hypertension and atherosclerosis are separate diseases — one is "high pressure," the other is "cholesterol deposits." They.' },
                { id: 'b', prompt: 'Explain why hypertension is called a \'silent killer\' despite often having no symptoms, using the concept of target organ damage.', answer: 'Hypertension damages organs silently',
                  options: ['Hypertension damages organs silently', 'high pressure', 'cholesterol deposits'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe hypertension and atherosclerosis are separate diseases — one is "high pressure," the other is "cholesterol deposits." They.' },
                { id: 'c', prompt: 'A 45-year-old male has BP 150/95 mmHg, LDL 160 mg/dL, HDL 35 mg/dL, and smokes 10 cigarettes/day.', answer: 'Step 1: Identify major risk factors',
                  options: ['Step 1: Identify major risk factors', 'high pressure', 'cholesterol deposits'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe hypertension and atherosclerosis are separate diseases — one is "high pressure," the other is "cholesterol deposits." They.' }
          ],
            remediations: { 'hypertension-and-atherosclerosis-are-separate': { steps: ['Draw a feedback loop diagram on paper: Hypertension → Endothelial shear stress → VCAM-1/ICAM-1 expression → Monocyte.', 'Label each arrow with the molecular mediator (e.g., angiotensin II, ROS, MMP-9).', 'Identify two intervention points where breaking the loop benefits both conditions (ACE inhibitors reduce angiotensin.', 'Explain this to a peer using the diagram.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe hypertension and atherosclerosis are separate diseases — one is "high pressure," the other is.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Atherosclerosis is solely a lipid storage disease; lowering LDL-cholesterol alone will completely prevent coronary events." Use.', answer: 'The statement is false',
                  options: ['The statement is false', 'high pressure', 'cholesterol deposits'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe hypertension and atherosclerosis are separate diseases — one is "high pressure," the other is "cholesterol deposits." They.' }
          ],
            remediations: { 'hypertension-and-atherosclerosis-are-separate': { steps: ['Draw a feedback loop diagram on paper: Hypertension → Endothelial shear stress → VCAM-1/ICAM-1 expression → Monocyte.', 'Label each arrow with the molecular mediator (e.g., angiotensin II, ROS, MMP-9).', 'Identify two intervention points where breaking the loop benefits both conditions (ACE inhibitors reduce angiotensin.', 'Explain this to a peer using the diagram.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_006', difficulty: 'standard',
          question: 'Regulation of cardiac activity refers to the physiological mechanisms by which.',
          hint: 'If stuck, revisit c11_bio_cbse_15_003 (Heart Structure — nodal tissue location) and.',
          misconception: 'Students believe that the sympathetic and parasympathetic systems always act in a simple "on/off" or "push-pull" manner.',
          parts: [
                { id: 'a', prompt: 'A student experiences sudden fear before an exam. Trace the sequence from the hypothalamus to the change in cardiac output, naming the neural and hormonal.', answer: 'Step 1: Hypothalamus activates the sympathetic division of ANS',
                  options: ['Step 1: Hypothalamus activates the sympathetic division of ANS', 'on/off', 'push-pull'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the sympathetic and parasympathetic systems always act in a simple "on/off" or "push-pull" manner where one is active.' }
          ],
            remediations: { 'the-sympathetic-and-parasympathetic-systems': { steps: ['Have the student measure their resting pulse, then do 30 seconds of jumping jacks, and measure pulse every 10 seconds.', 'Plot the data — they will see an immediate sharp rise (parasympathetic withdrawal + sympathetic activation) and a.', 'Ask them to mark where "neural" vs "hormonal" effects dominate on their graph.', 'Explain that at rest, if they hold their breath (increasing CO₂), HR initially rises via sympathetic chemoreflex, but.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_15_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that the sympathetic and parasympathetic systems always act in a simple "on/off" or "push-pull" manner.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "During intense exercise, parasympathetic withdrawal is more important than sympathetic activation for the initial increase in heart.', answer: 'The statement is correct for the first 5–10 seconds of exercise',
                  options: ['The statement is correct for the first 5–10 seconds of exercise', 'on/off', 'push-pull'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the sympathetic and parasympathetic systems always act in a simple "on/off" or "push-pull" manner where one is active.' },
                { id: 'b', prompt: 'Design a simple experiment using only a stethoscope, stopwatch, and a volunteer to demonstrate the relative contributions of neural vs.', answer: 'Protocol: (1) Record resting HR for 1 min',
                  options: ['Protocol: (1) Record resting HR for 1 min', 'on/off', 'push-pull'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the sympathetic and parasympathetic systems always act in a simple "on/off" or "push-pull" manner where one is active.' }
          ],
            remediations: { 'the-sympathetic-and-parasympathetic-systems': { steps: ['Have the student measure their resting pulse, then do 30 seconds of jumping jacks, and measure pulse every 10 seconds.', 'Plot the data — they will see an immediate sharp rise (parasympathetic withdrawal + sympathetic activation) and a.', 'Ask them to mark where "neural" vs "hormonal" effects dominate on their graph.', 'Explain that at rest, if they hold their breath (increasing CO₂), HR initially rises via sympathetic chemoreflex, but.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
