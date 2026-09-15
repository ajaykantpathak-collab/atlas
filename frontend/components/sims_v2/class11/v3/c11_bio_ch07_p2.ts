import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch07_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch07_p2: SimDef = {
    id: 'v3_c11_bio_ch07_p2',
    title: 'Structural Organisation in Animals · Part 2/2',
    subtitle: 'Read epithelial tissue like a spec sheet — shape, layers, and junctions reveal the job.',
    classLevel: 11, subject: 'biology', topic: 'Structural Organisation in Animals · Part 2/2',
    chapters: ['c11_bio_ch07'],
    nodeIds: ['c11_bio_cbse_07_007', 'c11_bio_cbse_07_008', 'c11_bio_cbse_07_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a histologist diagnosing why a patient\'s gut lining has gone leaky', intro: 'A genetic defect just broke the tight-junction protein claudin in a patient\'s intestine. Predict the consequences — and learn to read epithelium properly.', goal: 'Classify epithelial types by layers and cell shape, and link apical specialisations and junctions to absorption, secretion, and protection.' },
    discovery: {
        question: 'Your small intestine absorbs nutrients frantically; your oesophagus just takes a beating from food. Both are \'epithelium\', yet one is a single layer of tall cells bristling with microvilli and the other is a stack of flat cells. What principle dictates the difference?',
        options: ['Architecture matches demand — single columnar with a brush border for absorption, stratified squamous where abrasion must be survived', 'Absorbing surfaces need thick walls, so the intestine is actually stratified', 'The oesophagus is simpler because it is an older, more primitive organ', 'Cell shape is random; only the basement membrane matters'],
        answer: 'Architecture matches demand — single columnar with a brush border for absorption, stratified squamous where abrasion must be survived',
        hook: 'Two questions — how many layers, what cell shape — decode every epithelium, because structure is always a receipt for function.',
    },
    teaching: [
        { title: 'Frog Anatomy: Respiratory System', text: 'The frog respiratory system is a multimodal gas exchange apparatus comprising cutaneous (skin), buccopharyngeal (buccal cavity lining), and pulmonary (lung) surfaces that collectively facilitate.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_07_007', title: 'Your mission',
          mission: { widget: 'heart', validate: 'heart:rate=80',
            instruction: 'On the lab: raise the heart rate to 80 bpm — watch the ECG trace.',
        context: 'Identify epithelia from microscope descriptions — flat single layers in alveoli, brush-bordered columnar in the gut, pseudostratified ciliated sheets in the trachea — and predict what breaks when junction proteins fail.',
            observePrompt: 'What did the heart interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_07_007', title: 'Frog Anatomy: Respiratory System',
          scaffold: { problem: 'A 25g frog (Rana tigrina) at rest on land at 25°C has a metabolic O2 consumption of 0.8 mL O2/g/hr.',
            steps: [
            { text: 'Convert metabolic rate to mL O2/min: 0.8 mL O2/g/hr × 25g ÷ 60 min/hr = 0.333 mL O2/min total demand.' },
            { text: 'Apply Fick\'s law J = (D × A × ΔP) / d for each surface. Convert d to cm: skin 0.004 cm, buccal 0.0015 cm, lung 0.0005.' },
            { text: 'Calculate cutaneous J = (2.1e-5 × 85 × 60) / 0.004 = 0.0268 cm³/s = 1.61 mL/min.' },
            { text: 'Calculate buccopharyngeal J = (2.1e-5 × 12 × 60) / 0.0015 = 0.0101 cm³/s = 0.605 mL/min.' },
            { text: 'Calculate pulmonary J = (2.1e-5 × 20 × 60) / 0.0005 = 0.0504 cm³/s = 3.02 mL/min.' },
            { text: 'Compare each to demand (0.333 mL/min). All three individually exceed demand; combined capacity >> demand.', faded: true, blankAnswer: 'Theoretical max capacities: Cutaneous 1.61 mL/min.' }
            ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_07_008', title: 'Frog Anatomy: Circulatory System',
          caseStudy: { intro: 'Imagine watching a dissected frog\'s heart beating rhythmically in a biology lab — you notice it has only three visible chambers, unlike the four-chambered.',
            decisions: [{ prompt: 'How many chambers are present in the heart of a frog, and what are their names?', options: [
                { text: 'The frog heart has three chambers: two atria (right and left) and one ventricle', outcome: 'The frog heart has three chambers: two atria (right and left) and one ventricle.' },
                { text: 'four chambers', outcome: 'Not quite — Students believe the frog\'s single ventricle pumps a 50:50 mixture of oxygenated and deoxygenated.', reveals: 'the-frog-s-single-ventricle' },
                { text: 'two chambers', outcome: 'Not quite — Students believe the frog\'s single ventricle pumps a 50:50 mixture of oxygenated and deoxygenated.', reveals: 'the-frog-s-single-ventricle' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_07_009', title: 'Frog Anatomy: Nervous and Excretory Systems',
          caseStudy: { intro: 'Observe a frog in a pond: it instantly leaps when a shadow falls, and later you see it excrete a semi‑solid white paste.',
            decisions: [{ prompt: 'Name the three main divisions of the frog\'s brain and state one characteristic structure found in each division.', options: [
                { text: 'The three divisions are: (1) Forebrain – contains olfactory lobes, paired cerebral', outcome: 'The three divisions are: (1) Forebrain – contains olfactory lobes, paired cerebral hemispheres, and.' },
                { text: 'cerebrum, cerebellum, medulla', outcome: 'Not quite — Students often think the frog\'s brain is a simpler version of the human brain with the same parts.', reveals: 'the-frog-s-brain-is' },
                { text: 'cerebrum, cerebellum, medulla" without optic lobes or diencephalon', outcome: 'Not quite — Students often think the frog\'s brain is a simpler version of the human brain with the same parts.', reveals: 'the-frog-s-brain-is' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_07_008', title: 'Identify each idea',
          dissect: { specimen: 'Structural Organisation in Animals · Part 2/2', spots: [
            { id: 's1', label: 'Frog Anatomy Respiratory System', prompt: 'Which idea is this? — The frog respiratory system is a multimodal gas exchange apparatus comprising cutaneous.', answer: 'Frog Anatomy Respiratory System', options: ['Frog Anatomy Respiratory System', 'Frog Anatomy Circulatory System', 'Frog Anatomy Nervous and Excretory Systems'] },
            { id: 's2', label: 'Frog Anatomy Circulatory System', prompt: 'Which idea is this? — The frog circulatory system is a closed, single-circuit vascular system comprising.', answer: 'Frog Anatomy Circulatory System', options: ['Frog Anatomy Circulatory System', 'Frog Anatomy Respiratory System', 'Frog Anatomy Nervous and Excretory Systems'] },
            { id: 's3', label: 'Frog Anatomy Nervous and Excretory Systems', prompt: 'Which idea is this? — The frog\'s nervous system comprises a central nervous system (brain and spinal cord),.', answer: 'Frog Anatomy Nervous and Excretory Systems', options: ['Frog Anatomy Nervous and Excretory Systems', 'Frog Anatomy Respiratory System', 'Frog Anatomy Circulatory System'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'During a hospital lab visit, a pathologist shows your group two slides: skin epidermis healing after a scrape, and trachea lining that looks \'stacked\' under the microscope. A student says: \'In stratified skin epithelium the surface cells must divide to repair the scrape; and the trachea is clearly stratified too — the nuclei are at different levels.\'',
            decisions: [{ prompt: 'Which cells actually repair the skin, and is the trachea truly stratified?', options: [
                { text: 'Only the basal layer of the epidermis — the single row of cells touching the basement membrane — divides and pushes new cells upward; shed surface cells are terminally differentiated and cannot proliferate. The trachea is pseudostratified: nuclei at different heights, but every cell still contacts the basement membrane.', outcome: 'The basement-membrane-contact test separates true stratified epithelium (upper cells lose contact) from pseudostratified (all cells keep contact); repair capacity lives only in the basal layer.' },
                { text: 'Surface cells divide and reattach to heal the scrape — that\'s why skin heals fast.', outcome: 'Superficial cells are dead or anucleate and sloughing off; they can\'t divide — regeneration is the basal cells\' job alone.', reveals: 'surface-cells-heal-wounds' },
                { text: 'Trachea is truly stratified — nuclei at different levels prove stacked layers.', outcome: 'Staggered nuclei can fake stratification; trace each cell down — if every cell reaches the basement membrane it\'s pseudostratified, not stratified.', reveals: 'staggered-nuclei-mean-stratified' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_07_009', title: 'You made it',
          caseStudy: { intro: 'You stopped memorising tissue names and started reading them: layer count plus cell shape plus surface specialisation equals job description.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'heart', prompt: 'Explore the heart interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'heart', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_07_007', difficulty: 'standard',
          question: 'The frog respiratory system is a multimodal gas exchange apparatus comprising.',
          hint: 'Revisit Class 9 Chapter 1 (Cell membrane permeability) and Class 10 Chapter 1.',
          misconception: 'Students believe frogs "breathe through their skin" as a simple alternative to lungs, imagining cutaneous respiration.',
          parts: [
                { id: 'a', prompt: 'A researcher measures oxygen consumption in a frog at 20°C under three conditions: (i) fully submerged in aerated water, (ii) on land at rest, (iii) on land.', answer: 'Rank order: (iii) > (ii) > (i)',
                  options: ['Rank order: (iii) > (ii) > (i)', 'breathe through their skin'],
                  hint: 'Revisit Class 9 Chapter 1 (Cell membrane permeability) and Class 10 Chapter 1 (Respiration.',
                  misconception: 'Students believe frogs "breathe through their skin" as a simple alternative to lungs, imagining cutaneous respiration works like gills.' },
                { id: 'b', prompt: 'Compare the structural design of frog lungs (paired, thin-walled, poorly septated sacs) with mammalian lungs (highly branched bronchial tree ending.', answer: 'Frog lungs have low internal surface area (minimal septation)',
                  options: ['Frog lungs have low internal surface area (minimal septation)', 'frog lungs are primitive/inefficient', 'breathe through their skin'],
                  hint: 'Revisit Class 9 Chapter 1 (Cell membrane permeability) and Class 10 Chapter 1 (Respiration.',
                  misconception: 'Students believe frogs "breathe through their skin" as a simple alternative to lungs, imagining cutaneous respiration works like gills.' }
          ],
            remediations: { 'frogs-breathe-through-their-skin': { steps: ['Have student calculate theoretical maximum O2 flux through frog skin using Fick\'s law: J = D × A × ΔP / d.', 'Compare with measured pulmonary ventilation volumes from literature (frog lung volume ~1.5 mL, ventilation frequency.', 'Conclude quantitatively that skin alone cannot support activity; lungs are essential for terrestrial life.', 'Re-read NCERT lines: "On land, the buccal cavity, skin and lungs act as the respiratory organs" — note the "and" not.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe frogs "breathe through their skin" as a simple alternative to lungs, imagining cutaneous respiration.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The glottis in frogs remains open continuously to allow free airflow between buccal cavity and lungs, unlike the mammalian epiglottis.', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'breathe through their skin'],
                  hint: 'Revisit Class 9 Chapter 1 (Cell membrane permeability) and Class 10 Chapter 1 (Respiration.',
                  misconception: 'Students believe frogs "breathe through their skin" as a simple alternative to lungs, imagining cutaneous respiration works like gills.' },
                { id: 'b', prompt: 'Design a simple experiment using a live frog (ethically approved, non-invasive) to demonstrate that cutaneous respiration contributes significantly to total.', answer: 'Place frog in a sealed respirometer chamber with known O2 concentration at 20°C',
                  options: ['Place frog in a sealed respirometer chamber with known O2 concentration at 20°C', 'breathe through their skin'],
                  hint: 'Revisit Class 9 Chapter 1 (Cell membrane permeability) and Class 10 Chapter 1 (Respiration.',
                  misconception: 'Students believe frogs "breathe through their skin" as a simple alternative to lungs, imagining cutaneous respiration works like gills.' }
          ],
            remediations: { 'frogs-breathe-through-their-skin': { steps: ['Have student calculate theoretical maximum O2 flux through frog skin using Fick\'s law: J = D × A × ΔP / d.', 'Compare with measured pulmonary ventilation volumes from literature (frog lung volume ~1.5 mL, ventilation frequency.', 'Conclude quantitatively that skin alone cannot support activity; lungs are essential for terrestrial life.', 'Re-read NCERT lines: "On land, the buccal cavity, skin and lungs act as the respiratory organs" — note the "and" not.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_07_008', difficulty: 'standard',
          question: 'The frog circulatory system is a closed, single-circuit vascular system.',
          hint: 'If stuck, revisit Class 10 Chapter "Life Processes" — specifically the section.',
          misconception: 'Students believe the frog\'s single ventricle pumps a 50:50 mixture of oxygenated and deoxygenated blood to both.',
          parts: [
                { id: 'a', prompt: 'How many chambers are present in the heart of a frog, and what are their names?', answer: 'The frog heart has three chambers: two atria (right and left) and one ventricle',
                  options: ['The frog heart has three chambers: two atria (right and left) and one ventricle', 'four chambers', 'two chambers', 'there is no septum'],
                  hint: 'If stuck, revisit Class 10 Chapter "Life Processes" — specifically the section "Transportation.',
                  misconception: 'Students believe the frog\'s single ventricle pumps a 50:50 mixture of oxygenated and deoxygenated blood to both systemic and pulmocutaneous.' }
          ],
            remediations: { 'the-frog-s-single-ventricle': { steps: ['Re-draw the frog heart longitudinal section, labeling sinus venosus, right/left atria, ventricle, conus arteriosus, and.', 'Use two colored pens (red/blue) to trace blood from vena cava → sinus venosus → right atrium → ventricle → conus →.', 'Explain aloud how the spiral valve\'s position during ventricular systole guides the two streams.', 'Compare with the human heart diagram from Class 10 (c10_bio_cbse_01_009) to contrast anatomical vs.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_07_009', difficulty: 'standard',
          question: 'The frog\'s nervous system comprises a central nervous system (brain and spinal.',
          hint: 'Review Class 10 neural control and coordination (reflex arc, brain parts) and excretory.',
          misconception: 'Students often think the frog\'s brain is a simpler version of the human brain with the same parts just smaller.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The frog\'s nervous system comprises a central nervous system (brain and spinal cord), a',
                  options: ['The frog\'s nervous system comprises a central nervous system (brain and spinal cord), a', 'Epithelial tissue is a sheet of tightly packed cells with minimal intercellular matrix,', 'Connective tissue is the most abundant and widely distributed tissue in complex animals,', 'Muscular tissue is a specialized animal tissue composed of elongated cells (muscle'],
                  hint: 'Review Class 10 neural control and coordination (reflex arc, brain parts) and excretory system.',
                  misconception: 'Students often think the frog\'s brain is a simpler version of the human brain with the same parts just smaller.' }
          ],
            remediations: { 'the-frog-s-brain-is': { steps: ['Draw side‑by‑side diagrams of frog and human brains, labelling optic lobes, olfactory lobes, cerebral hemispheres.', 'Use a table to compare nephron structure: list "loop of Henle", "collecting duct", "glomerulus" and mark present/absent.', 'Watch a 2‑minute video of frog feeding (showing tongue projection) and identify the cranial nerves involved.', 'Re‑read the NCERT paragraph on excretory system and highlight the words "urinogenital duct", "cloaca", "urinary.'], labTask: { instruction: 'On the interactive: raise the heart rate to 80 bpm — watch the ECG trace — then check.', widget: 'heart', validate: 'heart:rate=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
