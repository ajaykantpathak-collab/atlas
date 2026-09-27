import type { SimDef } from '../../engine/types';
import C10_ScienceLifeProcessesSim from '../../../simulations/c6_12/C10_ScienceLifeProcessesSim';

/** v3 wrapped master — C10_ScienceLifeProcessesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_sciencelifeprocessessim: SimDef = {
    id: 'v3w_c10_sciencelifeprocessessim',
    title: 'Life Processes',
    subtitle: 'This node covers the definition, classification, and functional overview of the four.',
    classLevel: 10, subject: 'science', topic: 'What Are Life Processes: Nutrition, Respiration, Transportation, Excretion',
    chapters: [],
    nodeIds: ['c10_bio_cbse_01_001', 'c10_bio_cbse_01_010', 'c10_bio_cbse_02_004', 'c10_bio_cbse_03_001', 'c10_bio_cbse_01_002', 'c10_bio_cbse_01_004', 'c10_bio_cbse_01_005', 'c10_bio_cbse_02_008', 'c10_bio_cbse_03_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Observe a Class 10 student rushing to school: they eat a paratha for breakfast (nutrition), breathe heavily.', goal: 'Master Life Processes.' },
    discovery: {
        question: 'A student argues: "Transportation is only needed in large animals like humans because they have a heart and blood vessels.',
        options: ['The claim is incorrect', 'blood circulation', 'plants perform photosynthesis during the day and respiration only at night'],
        answer: 'The claim is incorrect',
        hook: 'Students believe that "plants perform photosynthesis during the day and respiration only at night." The exact wrong.',
    },
    teaching: [
        { title: 'Life processes are the essential biological.', text: 'Life processes are the essential biological activities — nutrition, respiration, transportation, and excretion — that living organisms perform continuously to maintain homeostasis, obtain energy, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_bio_cbse_01_001', title: 'Life processes are the essential.',
          scaffold: { problem: 'A Class 10 student eats a breakfast of aloo paratha with curd at 7:30 AM.',
            steps: [
            { text: 'Identify the life process that brings glucose into the body — nutrition (ingestion, digestion, absorption in small.' },
            { text: 'Identify the life process that moves absorbed glucose from intestine to leg muscles — transportation (blood.' },
            { text: 'Identify the life process that converts glucose to ATP in muscle cells — respiration (glycolysis in cytoplasm → Krebs.' },
            { text: 'Identify the life process that removes the CO₂ produced during respiration — transportation (CO₂ diffuses into blood →.' },
            { text: 'Verify that all four life processes are interconnected: nutrition provides substrate, transportation distributes.', faded: true, blankAnswer: 'Glucose from aloo paratha → Nutrition (digestion/absorption.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_bio_cbse_01_010', title: 'Blood is a specialized connective.',
          scaffold: { problem: 'During a routine health check-up in a rural Indian primary health centre, a 14-year-old girl is found to have hemoglobin of 8 g/dL (normal.',
            steps: [
            { text: 'Identify the key parameter — hemoglobin concentration is low (8 g/dL vs normal 12–15 g/dL), indicating anemia.' },
            { text: 'Recall RBC structure — mature RBCs are biconcave, anucleate cells packed with hemoglobin (each RBC contains ~270.' },
            { text: 'Recall hemoglobin function — each hemoglobin molecule binds 4 O2 molecules reversibly; total O2 carrying capacity of.' },
            { text: 'Trace the cause-effect chain: Low Hb → reduced O2 content per 100 mL blood → reduced O2 delivery to tissues (muscles,.' },
            { text: 'Verify with clinical correlation: In iron-deficiency anemia (common in Indian adolescent girls due to dietary.', faded: true, blankAnswer: 'The girl\'s low hemoglobin reduces the oxygen-carrying.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_bio_cbse_02_004', title: 'The human brain is the central control.',
          scaffold: { problem: 'Riya touches a hot tawa (griddle) and pulls her hand back instantly (reflex).',
            steps: [
            { text: 'Identify the stimulus — thermal energy activates thermoreceptors in skin of finger.' },
            { text: 'Trace the reflex arc — sensory neuron → interneuron in spinal cord → motor neuron → biceps contraction (hand.' },
            { text: 'Follow the sensory pathway to brain — sensory neuron also sends impulse via spinal cord white matter tracts to thalamus.' },
            { text: 'Thalamus routes impulse to sensory cortex of cerebrum (parietal lobe) for conscious perception of pain ("Ouch!").' },
            { text: 'Cerebrum (frontal lobe) initiates voluntary response — Riya decides to run cold water over the burn.', faded: true, blankAnswer: 'The reflex withdrawal is spinal (no brain). Pain perception.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_bio_cbse_03_001', title: 'Reproduction is the biological process.',
          scaffold: { problem: 'A farmer grows strawberries using runners (stolons) from a single parent plant that produces exceptionally sweet fruit.',
            steps: [
            { text: 'Identify the reproduction mode — runners (stolons) are a form of vegetative propagation, which is asexual reproduction.' },
            { text: 'Recall the cellular mechanism — new plants arise from mitotic divisions of somatic cells in the runner; no meiosis, no.' },
            { text: 'Determine the genetic consequence — all offspring are genetic clones of the parent plant; they have identical disease.' },
            { text: 'Apply to the scenario — the fungal pathogen evolved to overcome the resistance genotype of the parent; since all clones.' },
            { text: 'Propose a strategy — introduce sexual reproduction by growing strawberries from seeds (cross-pollination between.', faded: true, blankAnswer: 'The crop was wiped out because asexual reproduction via.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_bio_cbse_01_002', title: 'Autotrophic nutrition is a mode of.',
          scaffold: { problem: 'A Class 10 student places a potted money plant (variegated leaves) in a dark cupboard for 48 hours, then exposes it to sunlight for 6.',
            steps: [
            { text: 'Identify the biological process being tested — photosynthesis (starch production as evidence).' },
            { text: 'Recall that destarching in dark for 48 hrs uses up stored starch via respiration, ensuring any starch found later is.' },
            { text: 'Recognize that variegated leaves have chlorophyll only in green patches (white patches lack chloroplasts/chlorophyll).' },
            { text: 'Apply the principle: photosynthesis requires chlorophyll to trap light energy.' },
            { text: 'Conclude: Chlorophyll is necessary for photosynthesis. This proves plants are photoautotrophs — they need.', faded: true, blankAnswer: 'Green patches photosynthesize (have chlorophyll), producing.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_bio_cbse_01_004', title: 'The human digestive system is an organ.',
          scaffold: { problem: 'Trace the complete journey of a mouthful of roti (mainly starch) through the human digestive system.',
            steps: [
            { text: 'Identify the food component — roti is primarily starch (polysaccharide carbohydrate).' },
            { text: 'Recall the sequence of organs in the alimentary canal: Mouth → Oesophagus → Stomach → Small Intestine (Duodenum,.' },
            { text: 'Map the carbohydrate-digesting enzymes to each site: Mouth → Salivary amylase (ptyalin) in saliva; Stomach → NO.' },
            { text: 'Trace the chemical transformation: Starch → (salivary/pancreatic amylase) → Maltose + maltotriose + α-limit dextrins →.' },
            { text: 'Note absorption site: Glucose absorbed in jejunum/ileum via active transport (SGLT1) into blood capillaries of villi.', faded: true, blankAnswer: 'Roti (starch) → Mouth: salivary amylase → maltose/dextrins;.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_bio_cbse_01_010', title: 'Identify each idea',
          dissect: { specimen: 'Life Processes', spots: [
            { id: 's1', label: 'Life processes are the essential', prompt: 'Which idea is this? — Life processes are the essential biological activities — nutrition, respiration,.', answer: 'Life processes are the essential', options: ['Life processes are the essential', 'Blood is a specialized connective', 'The human brain is the', 'Reproduction is the biological process'] },
            { id: 's2', label: 'Blood is a specialized connective', prompt: 'Which idea is this? — Blood is a specialized connective tissue composed of a liquid matrix called plasma (55%.', answer: 'Blood is a specialized connective', options: ['Blood is a specialized connective', 'Life processes are the essential', 'The human brain is the', 'Reproduction is the biological process'] },
            { id: 's3', label: 'The human brain is the', prompt: 'Which idea is this? — The human brain is the central control center of the nervous system, divided into three.', answer: 'The human brain is the', options: ['The human brain is the', 'Life processes are the essential', 'Blood is a specialized connective', 'Reproduction is the biological process'] },
            { id: 's4', label: 'Reproduction is the biological process', prompt: 'Which idea is this? — Reproduction is the biological process by which living organisms produce new individuals.', answer: 'Reproduction is the biological process', options: ['Reproduction is the biological process', 'Life processes are the essential', 'Blood is a specialized connective', 'The human brain is the'] },
            { id: 's5', label: 'Autotrophic nutrition is a mode', prompt: 'Which idea is this? — Autotrophic nutrition is a mode of nutrition in which organisms synthesize their own.', answer: 'Autotrophic nutrition is a mode', options: ['Autotrophic nutrition is a mode', 'Life processes are the essential', 'Blood is a specialized connective', 'The human brain is the'] },
            { id: 's6', label: 'The human digestive system is', prompt: 'Which idea is this? — The human digestive system is an organ system comprising the alimentary canal (mouth,.', answer: 'The human digestive system is', options: ['The human digestive system is', 'Life processes are the essential', 'Blood is a specialized connective', 'The human brain is the'] }
          ] } }
    ],
    explore: { component: C10_ScienceLifeProcessesSim, prompt: 'Explore the interactive — Life Processes' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_001', difficulty: 'standard',
          question: 'Life processes are the essential biological activities — nutrition,.',
          hint: 'If stuck, revisit c9_bio_ch1_9 (mitochondria function) and c9_bio_ch2_4 (xylem and phloem.',
          misconception: 'Students believe that "plants perform photosynthesis during the day and respiration only at night." The exact wrong.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Transportation is only needed in large animals like humans because they have a heart and blood vessels.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'blood circulation', 'plants perform photosynthesis during the day and respiration only at night'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "plants perform photosynthesis during the day and respiration only at night." The exact wrong reasoning: they think.' }
          ],
            remediations: { 'plants-perform-photosynthesis-during-the': { steps: ['Place a potted plant in a dark cupboard for 24 hours — observe that it still respires (use a CO₂ sensor or lime water.', 'Place the same plant in bright light — test for O₂ release (photosynthesis) while noting CO₂ is still produced.', 'Explain that roots, which lack chlorophyll, respire continuously day and night.', 'Write the balanced equations side-by-side: Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light, chlorophyll);.'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "plants perform photosynthesis during the day and respiration only at night." The exact wrong.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Excretion is simply the removal of undigested food from the body." Provide a biologically accurate correction.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'plants perform photosynthesis during the day and respiration only at night', '"plants perform photosynthesis during the day and respiration only at night'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "plants perform photosynthesis during the day and respiration only at night." The exact wrong reasoning: they think.' }
          ],
            remediations: { 'plants-perform-photosynthesis-during-the': { steps: ['Place a potted plant in a dark cupboard for 24 hours — observe that it still respires (use a CO₂ sensor or lime water.', 'Place the same plant in bright light — test for O₂ release (photosynthesis) while noting CO₂ is still produced.', 'Explain that roots, which lack chlorophyll, respire continuously day and night.', 'Write the balanced equations side-by-side: Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light, chlorophyll);.'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_010', difficulty: 'standard',
          question: 'Blood is a specialized connective tissue composed of a liquid matrix called.',
          hint: 'If stuck, revisit Class 9 Animal Tissues (c9_bio_ch2_6) for blood as connective tissue,.',
          misconception: 'Students think "WBCs are only of one type and all WBCs eat bacteria." They write "WBCs engulf pathogens" as the sole.',
          parts: [
                { id: 'a', prompt: 'Name the iron-containing pigment in red blood cells that binds reversibly with oxygen, and state the average lifespan of a human RBC in circulation.', answer: 'Hemoglobin (or haemoglobin)',
                  options: ['Correct answer: Hemoglobin (or haemoglobin)', 'hemocyanin', 'WBCs are only of one type and all WBCs eat bacteria'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "WBCs are only of one type and all WBCs eat bacteria." They write "WBCs engulf pathogens" as the sole function, ignoring.' },
                { id: 'b', prompt: 'Explain why mature human RBCs lack a nucleus and mitochondria, and how this structural adaptation directly supports their primary function.', answer: 'Absence of nucleus and mitochondria maximizes internal space for',
                  options: ['Correct answer: Absence of nucleus and mitochondria maximizes internal space for', 'RBCs are dead cells', 'they don\'t need energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "WBCs are only of one type and all WBCs eat bacteria." They write "WBCs engulf pathogens" as the sole function, ignoring.' }
          ],
            remediations: { 'wbcs-are-only-of-one': { steps: ['Draw a table with columns: WBC Type, Nucleus Shape, Cytoplasm, Granules, Main Function.', 'Fill using NCERT Fig. 6.9 (or standard diagram): Neutrophil (multi-lobed, granular, phagocytosis), Lymphocyte (large.', 'Practice two past board questions: (a) "Which WBC is responsible for allergic response?" (b) "Differentiate between.', 'Verify answers with marking scheme — note that "production of antibodies" must be linked to lymphocytes only.'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "WBCs are only of one type and all WBCs eat bacteria." They write "WBCs engulf pathogens" as the sole.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Plasma is just water with dissolved salts; removing it and replacing with saline (0.9% NaCl) during transfusion has no effect on.', answer: 'Correct evaluation: Statement is false',
                  options: ['Correct evaluation: Statement is false', 'WBCs are only of one type and all WBCs eat bacteria', 'WBCs engulf pathogens', '"WBCs are only of one type and all WBCs eat bacteria'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "WBCs are only of one type and all WBCs eat bacteria." They write "WBCs engulf pathogens" as the sole function, ignoring.' }
          ],
            remediations: { 'wbcs-are-only-of-one': { steps: ['Draw a table with columns: WBC Type, Nucleus Shape, Cytoplasm, Granules, Main Function.', 'Fill using NCERT Fig. 6.9 (or standard diagram): Neutrophil (multi-lobed, granular, phagocytosis), Lymphocyte (large.', 'Practice two past board questions: (a) "Which WBC is responsible for allergic response?" (b) "Differentiate between.', 'Verify answers with marking scheme — note that "production of antibodies" must be linked to lymphocytes only.'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_004', difficulty: 'standard',
          question: 'The human brain is the central control center of the nervous system, divided.',
          hint: 'Revisit c10_bio_cbse_02_002 (neuron structure) and c9_bio_ch2_8 (nervous tissue) — focus.',
          misconception: 'Students think the "midbrain" is a minor relay with no distinct function, so they write "connects forebrain and.',
          parts: [
                { id: 'a', prompt: 'Name the three major divisions of the human brain and give one main function of each.', answer: 'The three divisions are: (1) Forebrain',
                  options: ['The three divisions are: (1) Forebrain', 'cerebrum controls breathing', 'midbrain'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the "midbrain" is a minor relay with no distinct function, so they write "connects forebrain and hindbrain" as its only.' },
                { id: 'b', prompt: 'A student writes: "The cerebrum controls involuntary actions like heartbeat and breathing." Is this correct? Explain why or why not.', answer: 'Incorrect',
                  options: ['Incorrect', 'midbrain', 'connects forebrain and hindbrain'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the "midbrain" is a minor relay with no distinct function, so they write "connects forebrain and hindbrain" as its only.' },
                { id: 'c', prompt: 'Compare the roles of the thalamus and hypothalamus in the forebrain. How does a tumor in each region produce different symptom clusters?', answer: 'Thalamus: major sensory relay station (except smell) to cerebrum',
                  options: ['Thalamus: major sensory relay station (except smell) to cerebrum', 'brain dysfunction', 'differentiate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the "midbrain" is a minor relay with no distinct function, so they write "connects forebrain and hindbrain" as its only.' }
          ],
            remediations: { 'the-midbrain-is-a-minor': { steps: ['Draw a simple brainstem cross-section on paper: label midbrain at top, pons middle, medulla bottom.', 'Write "Superior colliculus → visual reflex (e.g., blink at bright light)" and "Inferior colliculus → auditory reflex.', 'Say aloud: "Midbrain = Reflex center for sight & sound."', 'Practice one NCERT exemplar question: "Which part of the brain controls the reflex movement of the head when a sudden.'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think the "midbrain" is a minor relay with no distinct function, so they write "connects forebrain and.',
          parts: [
                { id: 'a', prompt: 'A head injury patient stops breathing but their heart continues beating for a few minutes. The doctor says the medulla is damaged but the pons is intact.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'pons controls breathing', 'midbrain', 'connects forebrain and hindbrain'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the "midbrain" is a minor relay with no distinct function, so they write "connects forebrain and hindbrain" as its only.' }
          ],
            remediations: { 'the-midbrain-is-a-minor': { steps: ['Draw a simple brainstem cross-section on paper: label midbrain at top, pons middle, medulla bottom.', 'Write "Superior colliculus → visual reflex (e.g., blink at bright light)" and "Inferior colliculus → auditory reflex.', 'Say aloud: "Midbrain = Reflex center for sight & sound."', 'Practice one NCERT exemplar question: "Which part of the brain controls the reflex movement of the head when a sudden.'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_03_001', difficulty: 'standard',
          question: 'Reproduction is the biological process by which living organisms produce new.',
          hint: 'If stuck, revisit c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) for the mechanism of.',
          misconception: 'Students believe that "reproduction is necessary for the survival of the organism" and write answers like "reproduction.',
          parts: [
                { id: 'a', prompt: 'Define reproduction in biological terms and state why it is considered a characteristic of life, but not essential for the survival of an individual organism.', answer: 'Reproduction is the biological process by',
                  options: ['Reproduction is the biological process by', 'reproduction keeps the organism alive', 'reproduction provides energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "reproduction is necessary for the survival of the organism" and write answers like "reproduction provides energy to.' },
                { id: 'b', prompt: 'A student says: "Asexual reproduction is better because it produces many offspring quickly without needing a partner." Explain why this statement is incomplete.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'asexual is faster', 'sexual needs two parents'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "reproduction is necessary for the survival of the organism" and write answers like "reproduction provides energy to.' },
                { id: 'c', prompt: 'A bacterium divides by binary fission every 20 minutes under ideal conditions.', answer: 'The flowering plant population will show far greater genetic diversity',
                  options: ['The flowering plant population will show far greater genetic diversity', 'reproduction is necessary for the survival of the organism', 'reproduction provides energy to the body'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "reproduction is necessary for the survival of the organism" and write answers like "reproduction provides energy to.' }
          ],
            remediations: { 'reproduction-is-necessary-for-the': { steps: ['Ask the student to list what an individual organism needs to stay alive for one day (food, water, oxygen, waste.', 'Ask what happens if that organism never reproduces — it lives and dies normally, but its genetic line ends.', 'Show a diagram of a mule (sterile hybrid) — it eats, breathes, grows, but cannot reproduce.', 'Contrast with a bacterial colony — each division is reproduction, but the "individual" is the cell line.', 'Have the student write the corrected definition: "Reproduction ensures species continuity, not individual survival."'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "reproduction is necessary for the survival of the organism" and write answers like "reproduction.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Since asexual reproduction produces offspring faster and with less energy, it is the superior mode of reproduction and sexual.', answer: 'The claim is false',
                  options: ['The claim is false', 'sexual reproduction is better', 'one mode is better', 'reproduction is necessary for the survival of the organism'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "reproduction is necessary for the survival of the organism" and write answers like "reproduction provides energy to.' }
          ],
            remediations: { 'reproduction-is-necessary-for-the': { steps: ['Ask the student to list what an individual organism needs to stay alive for one day (food, water, oxygen, waste.', 'Ask what happens if that organism never reproduces — it lives and dies normally, but its genetic line ends.', 'Show a diagram of a mule (sterile hybrid) — it eats, breathes, grows, but cannot reproduce.', 'Contrast with a bacterial colony — each division is reproduction, but the "individual" is the cell line.', 'Have the student write the corrected definition: "Reproduction ensures species continuity, not individual survival."'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_002', difficulty: 'standard',
          question: 'Autotrophic nutrition is a mode of nutrition in which organisms synthesize.',
          hint: 'If stuck, review c9_bio_ch1_10 (plastids) and c8_bio_ch1_6 (plant cell vs animal cell) to.',
          misconception: 'Students believe that the oxygen released during photosynthesis comes from carbon dioxide (CO₂), not water (H₂O).',
          parts: [
                { id: 'a', prompt: 'Why is chlorophyll essential for photosynthesis in plants, but not for chemoautotrophs? Explain using the energy source for each group.', answer: 'Chlorophyll is essential for photoautotrophs',
                  options: ['Chlorophyll is essential for photoautotrophs', 'chlorophyll makes food'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the oxygen released during photosynthesis comes from carbon dioxide (CO₂), not water (H₂O).' }
          ],
            remediations: { 'the-oxygen-released-during-photosynthesis': { steps: ['Revisit the photosynthesis equation — note that 6 CO₂ provide 12 O atoms, but 6 O₂ released has 12 O atoms; if O₂ came.', 'Recall Class 9 (c9_bio_ch1_10) — chloroplast structure: thylakoids split H₂O (photolysis).', 'Watch a 2-minute animation of photolysis showing H₂O → 2H⁺ + 2e⁻ + ½O₂.', 'Write the correct statement: "Oxygen released in photosynthesis comes from water, not carbon dioxide."'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that the oxygen released during photosynthesis comes from carbon dioxide (CO₂), not water (H₂O).',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "During the day, plants only photosynthesize; at night, they only respire." Is it correct?', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'dominant process', 'exclusive process'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the oxygen released during photosynthesis comes from carbon dioxide (CO₂), not water (H₂O).' }
          ],
            remediations: { 'the-oxygen-released-during-photosynthesis': { steps: ['Revisit the photosynthesis equation — note that 6 CO₂ provide 12 O atoms, but 6 O₂ released has 12 O atoms; if O₂ came.', 'Recall Class 9 (c9_bio_ch1_10) — chloroplast structure: thylakoids split H₂O (photolysis).', 'Watch a 2-minute animation of photolysis showing H₂O → 2H⁺ + 2e⁻ + ½O₂.', 'Write the correct statement: "Oxygen released in photosynthesis comes from water, not carbon dioxide."'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_004', difficulty: 'standard',
          question: 'The human digestive system is an organ system comprising the alimentary canal.',
          hint: 'Review Class 7 nodes c7_bio_ch02_003 (Alimentary Canal) and c7_bio_ch02_004–007.',
          misconception: 'Students believe the **stomach is the main site of digestion** because it visibly churns food and secretes strong acid.',
          parts: [
                { id: 'a', prompt: 'Name the three major associated digestive glands of the human digestive system and state the main secretion of each that enters the duodenum.', answer: 'The three major associated glands are: (1) Salivary glands',
                  options: ['The three major associated glands are: (1) Salivary glands', 'associated glands'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the **stomach is the main site of digestion** because it visibly churns food and secretes strong acid.' },
                { id: 'b', prompt: 'A person undergoes surgical removal of the gallbladder (cholecystectomy).', answer: 'Fat digestion becomes less efficient, especially after a fatty meal',
                  options: ['Fat digestion becomes less efficient, especially after a fatty meal', 'fat digestion stops completely', 'bile is not produced'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the **stomach is the main site of digestion** because it visibly churns food and secretes strong acid.' },
                { id: 'c', prompt: 'Compare the role of salivary amylase (ptyalin) and pancreatic amylase in carbohydrate digestion. Why does salivary amylase stop working in the stomach?', answer: 'Both enzymes hydrolyse starch (polysaccharide) into maltose (disaccharide)',
                  options: ['Both enzymes hydrolyse starch (polysaccharide) into maltose (disaccharide)', 'salivary amylase digests protein', 'both work in stomach'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the **stomach is the main site of digestion** because it visibly churns food and secretes strong acid.' }
          ],
            remediations: { 'the-stomach-is-the-main': { steps: ['**Visual comparison:** Draw two columns — "Stomach" vs "Small Intestine".', 'List: enzymes present, pH, surface area features, % absorption.', '**Hands-on model:** Use a long tube (small intestine) with folded inner surface (villi) vs a sac (stomach) to show.', '**Enzyme mapping:** Create a flowchart: Mouth → salivary amylase (starch); Stomach → pepsin (protein); Duodenum →.'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the **stomach is the main site of digestion** because it visibly churns food and secretes strong acid.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Digestion of proteins begins in the mouth because saliva contains enzymes." Evaluate this statement and justify your answer.', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'yes, because saliva has enzymes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the **stomach is the main site of digestion** because it visibly churns food and secretes strong acid.' }
          ],
            remediations: { 'the-stomach-is-the-main': { steps: ['**Visual comparison:** Draw two columns — "Stomach" vs "Small Intestine".', 'List: enzymes present, pH, surface area features, % absorption.', '**Hands-on model:** Use a long tube (small intestine) with folded inner surface (villi) vs a sac (stomach) to show.', '**Enzyme mapping:** Create a flowchart: Mouth → salivary amylase (starch); Stomach → pepsin (protein); Duodenum →.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
