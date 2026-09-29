import type { SimDef } from '../../engine/types';
import C10_BiologyCirculatorySystemdetailedSim from '../../../simulations/c6_12/C10_BiologyCirculatorySystemdetailedSim';

/** v3 wrapped master — C10_BiologyCirculatorySystemdetailedSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_biologycirculatorysystemdetailedsim: SimDef = {
    id: 'v3w_c10_biologycirculatorysystemdetailedsim',
    title: 'Control and Coordination in Animals vs Plants: Overview',
    subtitle: 'This node covers the fundamental comparison between animal and plant coordination systems.',
    classLevel: 10, subject: 'biology', topic: 'Control and Coordination in Animals vs Plants: Overview',
    chapters: [],
    nodeIds: ['c10_bio_cbse_02_001', 'c10_bio_cbse_02_002', 'c10_bio_cbse_02_004', 'c10_bio_cbse_02_010', 'c10_bio_cbse_01_001', 'c10_bio_cbse_01_004', 'c10_bio_cbse_01_012', 'c10_bio_cbse_03_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Observe a mimosa plant (touch-me-not) folding its leaves when touched and compare it to instantly pulling.', goal: 'Master Control and Coordination in Animals vs Plants: Overview.' },
    discovery: {
        question: 'Compare the structural adaptations of a sensory neuron (e.g., from skin to spinal cord) and a motor neuron (e.g., from spinal cord to muscle) that suit their.',
        options: ['Three key differences: (1) Sensory neurons are typically pseudounipolar', 'both are identical', 'differentiate'],
        answer: 'Three key differences: (1) Sensory neurons are typically pseudounipolar',
        hook: 'Students believe the nerve impulse is an electric current flowing through the axon like electrons in a copper wire.',
    },
    teaching: [
        { title: 'Control and coordination is the biological.', text: 'Control and coordination is the biological process by which organisms detect changes (stimuli) in their internal and external environment and produce appropriate, regulated responses; in animals this.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_bio_cbse_02_001', title: 'Control and coordination is the.',
          scaffold: { problem: 'A Class 10 student observes that when a potted plant is placed near a window, its stem bends toward the light over two days.',
            steps: [
            { text: 'Identify the stimulus in each scenario: light direction for plant, heat for human.' },
            { text: 'Identify the receptor: shoot tip photoreceptors (plant), thermoreceptors in skin (human).' },
            { text: 'Determine signal type: chemical (auxin redistribution) in plant; electrical impulse in sensory neuron, then chemical at.' },
            { text: 'Trace transmission: auxin moves down shaded side via diffusion/transport in plant; nerve impulse travels via CNS and.' },
            { text: 'Identify effector and response: differential cell elongation causes bending in plant; muscle contraction causes hand.', faded: true, blankAnswer: 'Plant: stimulus=light, receptor=photoreceptors in shoot.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_bio_cbse_02_002', title: 'A neuron is the structural and.',
          scaffold: { problem: 'Rahul touches a hot pan handle. The heat stimulus is detected by a sensory neuron in his finger.',
            steps: [
            { text: 'Identify the neuron type — sensory neuron (pseudounipolar) with peripheral dendritic ending in skin detecting heat.' },
            { text: 'Impulse starts at the dendritic ending (receptor region) where heat opens thermosensitive ion channels, causing.' },
            { text: 'Depolarization spreads to the cell body (in dorsal root ganglion) — but in sensory neurons, the impulse bypasses the.' },
            { text: 'The axon is myelinated — impulse jumps from node of Ranvier to node of Ranvier (saltatory conduction).' },
            { text: 'Impulse reaches axon terminals in the spinal cord, triggering neurotransmitter release onto an interneuron.', faded: true, blankAnswer: 'Heat → dendritic ending (receptor) → peripheral axon →.' }
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
        { type: 'scaffold', nodeId: 'c10_bio_cbse_02_010', title: 'The adrenal glands are a pair of.',
          scaffold: { problem: 'During a school fire drill, a student smells smoke and hears the alarm.',
            steps: [
            { text: 'Identify the sensory input (smoke/alarm) → processed by amygdala in temporal lobe → activates hypothalamus.' },
            { text: 'Hypothalamus activates sympathetic division of autonomic nervous system → preganglionic sympathetic fibers from.' },
            { text: 'Preganglionic fibers release acetylcholine on chromaffin cells (modified postganglionic neurons) of adrenal medulla →.' },
            { text: 'Adrenaline circulates via blood to target organs: (a) Heart: binds beta-1 adrenergic receptors on SA node → increases.' },
            { text: 'Verify: All three changes (heart rate, breathing, energy surge) are explained by adrenaline acting on specific.', faded: true, blankAnswer: 'Sensory threat → amygdala → hypothalamus → sympathetic.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_bio_cbse_01_001', title: 'Life processes are the essential.',
          scaffold: { problem: 'A Class 10 student eats a breakfast of aloo paratha with curd at 7:30 AM.',
            steps: [
            { text: 'Identify the life process that brings glucose into the body — nutrition (ingestion, digestion, absorption in small.' },
            { text: 'Identify the life process that moves absorbed glucose from intestine to leg muscles — transportation (blood.' },
            { text: 'Identify the life process that converts glucose to ATP in muscle cells — respiration (glycolysis in cytoplasm → Krebs.' },
            { text: 'Identify the life process that removes the CO₂ produced during respiration — transportation (CO₂ diffuses into blood →.' },
            { text: 'Verify that all four life processes are interconnected: nutrition provides substrate, transportation distributes.', faded: true, blankAnswer: 'Glucose from aloo paratha → Nutrition (digestion/absorption.' }
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
        { type: 'dissect', nodeId: 'c10_bio_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'Control and Coordination in Animals vs Plants: Overview', spots: [
            { id: 's1', label: 'Control and coordination is the', prompt: 'Which idea is this? — Control and coordination is the biological process by which organisms detect changes.', answer: 'Control and coordination is the', options: ['Control and coordination is the', 'A neuron is the structural', 'The human brain is the', 'The adrenal glands are a'] },
            { id: 's2', label: 'A neuron is the structural', prompt: 'Which idea is this? — A neuron is the structural and functional unit of the nervous system, specialized for.', answer: 'A neuron is the structural', options: ['A neuron is the structural', 'Control and coordination is the', 'The human brain is the', 'The adrenal glands are a'] },
            { id: 's3', label: 'The human brain is the', prompt: 'Which idea is this? — The human brain is the central control center of the nervous system, divided into three.', answer: 'The human brain is the', options: ['The human brain is the', 'Control and coordination is the', 'A neuron is the structural', 'The adrenal glands are a'] },
            { id: 's4', label: 'The adrenal glands are a', prompt: 'Which idea is this? — The adrenal glands are a pair of endocrine glands located on top of each kidney,.', answer: 'The adrenal glands are a', options: ['The adrenal glands are a', 'Control and coordination is the', 'A neuron is the structural', 'The human brain is the'] },
            { id: 's5', label: 'Life processes are the essential', prompt: 'Which idea is this? — Life processes are the essential biological activities — nutrition, respiration,.', answer: 'Life processes are the essential', options: ['Life processes are the essential', 'Control and coordination is the', 'A neuron is the structural', 'The human brain is the'] },
            { id: 's6', label: 'The human digestive system is', prompt: 'Which idea is this? — The human digestive system is an organ system comprising the alimentary canal (mouth,.', answer: 'The human digestive system is', options: ['The human digestive system is', 'Control and coordination is the', 'A neuron is the structural', 'The human brain is the'] }
          ] } }
    ],
    explore: { component: C10_BiologyCirculatorySystemdetailedSim, prompt: 'Explore the interactive — Control and Coordination in Animals vs Plants: Overview' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_001', difficulty: 'standard',
          question: 'Control and coordination is the biological process by which organisms detect.',
          hint: 'If stuck, review c9_bio_ch2_8 (neuron structure) and c6_biology_ch10_007 (plant.',
          misconception: 'Students often think plants have a "nervous system" because they respond to stimuli, and they confuse the rapid leaf.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Control and coordination is the biological process by',
                  options: ['Control and coordination is the biological process by', 'A neuron is the structural and functional unit of the nervous system, specialized for', 'The human brain is the central control center of the nervous system, divided into three', 'The adrenal glands are a pair of endocrine glands located on top of each kidney,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think plants have a "nervous system" because they respond to stimuli, and they confuse the rapid leaf folding of mimosa.' }
          ],
            remediations: { 'plants-have-a-nervous-system': { steps: ['Revisit Class 6 plant responses (c6_biology_ch10_007) and Class 9 nervous tissue (c9_bio_ch2_8) to list structures.', 'Create a two-column table: "Animal" (neurons, synapses, electrical impulses, brain, hormones in blood) vs "Plant" (no.', 'For each row, write one functional consequence (e.g., speed, distance, specificity).', 'Explain aloud why mimosa\'s electrical wave is not a nervous impulse (no neurons, all-or-none but no synapse).'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think plants have a "nervous system" because they respond to stimuli, and they confuse the rapid leaf.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Plants are less coordinated than animals because they lack a brain." Is this biologically accurate? Justify.', answer: 'The statement is inaccurate',
                  options: ['The statement is inaccurate', 'nervous system'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think plants have a "nervous system" because they respond to stimuli, and they confuse the rapid leaf folding of mimosa.' },
                { id: 'b', prompt: 'Design a simple experiment to demonstrate that a plant\'s response to light (phototropism) involves a chemical signal produced in the shoot tip, using two.', answer: 'Cover the shoot tip of seedling A with opaque foil cap',
                  options: ['Cover the shoot tip of seedling A with opaque foil cap', 'nervous system'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think plants have a "nervous system" because they respond to stimuli, and they confuse the rapid leaf folding of mimosa.' }
          ],
            remediations: { 'plants-have-a-nervous-system': { steps: ['Revisit Class 6 plant responses (c6_biology_ch10_007) and Class 9 nervous tissue (c9_bio_ch2_8) to list structures.', 'Create a two-column table: "Animal" (neurons, synapses, electrical impulses, brain, hormones in blood) vs "Plant" (no.', 'For each row, write one functional consequence (e.g., speed, distance, specificity).', 'Explain aloud why mimosa\'s electrical wave is not a nervous impulse (no neurons, all-or-none but no synapse).'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_002', difficulty: 'standard',
          question: 'A neuron is the structural and functional unit of the nervous system,.',
          hint: 'If stuck, revisit c9_bio_ch1_3 (cell membrane structure and selective permeability) and.',
          misconception: 'Students believe the nerve impulse is an electric current flowing through the axon like electrons in a copper wire.',
          parts: [
                { id: 'a', prompt: 'A patient has a demyelinating disease (like Multiple Sclerosis) where the myelin sheath is damaged but the axon itself is intact.', answer: 'Step 1: Identify the defect',
                  options: ['Step 1: Identify the defect', 'no effect because axon is intact'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the nerve impulse is an electric current flowing through the axon like electrons in a copper wire.' },
                { id: 'b', prompt: 'Compare the structural adaptations of a sensory neuron (e.g., from skin to spinal cord) and a motor neuron (e.g., from spinal cord to muscle) that suit their.', answer: 'Three key differences: (1) Sensory neurons are typically pseudounipolar',
                  options: ['Three key differences: (1) Sensory neurons are typically pseudounipolar', 'both are identical', 'differentiate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the nerve impulse is an electric current flowing through the axon like electrons in a copper wire.' }
          ],
            remediations: { 'the-nerve-impulse-is-an': { steps: ['Use the "dominoes" analogy — line up dominoes (ion channels); tipping the first (stimulus) causes a wave that travels.', 'Show a simple animation (or draw frames) of Na⁺ entering, K⁺ leaving at one spot, triggering the next spot.', 'Emphasize: no net ion flow along the axon length; each segment regenerates the signal.', 'Contrast with a wire — cut a wire, current stops; cut an axon, signal stops only at the cut, but the mechanism is local.', 'Practice writing: "Nerve impulse = wave of depolarization, not electric current" — this exact phrasing earns full marks.'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the nerve impulse is an electric current flowing through the axon like electrons in a copper wire.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Neurons cannot divide, so any damage to the nervous system is permanent and cannot be repaired." Is this entirely correct for the.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'fully correct', 'fully incorrect', 'justify'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the nerve impulse is an electric current flowing through the axon like electrons in a copper wire.' },
                { id: 'b', prompt: 'Compare the structural adaptations of a sensory neuron (e.g., from skin to spinal cord) and a motor neuron (e.g., from spinal cord to muscle) that suit their.', answer: 'Three key differences: (1) Sensory neurons are typically pseudounipolar',
                  options: ['Three key differences: (1) Sensory neurons are typically pseudounipolar', 'both are identical', 'differentiate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the nerve impulse is an electric current flowing through the axon like electrons in a copper wire.' }
          ],
            remediations: { 'the-nerve-impulse-is-an': { steps: ['Use the "dominoes" analogy — line up dominoes (ion channels); tipping the first (stimulus) causes a wave that travels.', 'Show a simple animation (or draw frames) of Na⁺ entering, K⁺ leaving at one spot, triggering the next spot.', 'Emphasize: no net ion flow along the axon length; each segment regenerates the signal.', 'Contrast with a wire — cut a wire, current stops; cut an axon, signal stops only at the cut, but the mechanism is local.', 'Practice writing: "Nerve impulse = wave of depolarization, not electric current" — this exact phrasing earns full marks.'] } } },
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
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_010', difficulty: 'standard',
          question: 'The adrenal glands are a pair of endocrine glands located on top of each.',
          hint: 'If stuck, review c10_bio_cbse_02_002 (neuron structure) and c10_bio_cbse_02_003 (reflex.',
          misconception: 'Students often believe that the adrenal medulla is stimulated by a hormone from the pituitary (like ACTH stimulates the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The adrenal glands are a pair of endocrine glands located on top of each kidney,',
                  options: ['The adrenal glands are a pair of endocrine glands located on top of each kidney,', 'Control and coordination is the biological process by', 'A neuron is the structural and functional unit of the nervous system, specialized for', 'The human brain is the central control center of the nervous system, divided into three'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the adrenal medulla is stimulated by a hormone from the pituitary (like ACTH stimulates the cortex) and.' }
          ],
            remediations: { 'the-adrenal-medulla-is-stimulated': { steps: ['Revisit c10_bio_cbse_02_002 (neuron structure) and c10_bio_cbse_02_003 (reflex arc) to recall that sympathetic.', 'Draw a simple diagram: Spinal cord → sympathetic preganglionic fiber → adrenal medulla chromaffin cell (label as.', 'Compare with pituitary-adrenal cortex axis: Hypothalamus → CRH → Pituitary → ACTH → Adrenal cortex (cortisol).', 'Time the two pathways: neural = milliseconds to seconds; hormonal cascade = minutes.', 'Write one-line summary: "Adrenal medulla = fast neural trigger → hormonal broadcast; Adrenal cortex = slow hormonal.'] } } },
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
