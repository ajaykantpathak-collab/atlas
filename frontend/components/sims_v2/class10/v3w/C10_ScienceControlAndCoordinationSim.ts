import type { SimDef } from '../../engine/types';
import C10_ScienceControlAndCoordinationSim from '../../../simulations/c6_12/C10_ScienceControlAndCoordinationSim';

/** v3 wrapped master — C10_ScienceControlAndCoordinationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_sciencecontrolandcoordinationsim: SimDef = {
    id: 'v3w_c10_sciencecontrolandcoordinationsim',
    title: 'Control And Coordination',
    subtitle: 'This node covers the fundamental comparison between animal and plant coordination systems.',
    classLevel: 10, subject: 'science', topic: 'Control and Coordination in Animals vs Plants: Overview',
    chapters: [],
    nodeIds: ['c10_bio_cbse_02_001', 'c10_bio_cbse_02_010', 'c10_bio_cbse_02_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Observe a mimosa plant (touch-me-not) folding its leaves when touched and compare it to instantly pulling.', goal: 'Master Control And Coordination.' },
    discovery: {
        question: 'Name the three major divisions of the human brain and give one main function of each.',
        options: ['The three divisions are: (1) Forebrain', 'cerebrum controls breathing', 'midbrain'],
        answer: 'The three divisions are: (1) Forebrain',
        hook: 'Students think the "midbrain" is a minor relay with no distinct function, so they write "connects forebrain and.',
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
        { type: 'scaffold', nodeId: 'c10_bio_cbse_02_010', title: 'The adrenal glands are a pair of.',
          scaffold: { problem: 'During a school fire drill, a student smells smoke and hears the alarm.',
            steps: [
            { text: 'Identify the sensory input (smoke/alarm) → processed by amygdala in temporal lobe → activates hypothalamus.' },
            { text: 'Hypothalamus activates sympathetic division of autonomic nervous system → preganglionic sympathetic fibers from.' },
            { text: 'Preganglionic fibers release acetylcholine on chromaffin cells (modified postganglionic neurons) of adrenal medulla →.' },
            { text: 'Adrenaline circulates via blood to target organs: (a) Heart: binds beta-1 adrenergic receptors on SA node → increases.' },
            { text: 'Verify: All three changes (heart rate, breathing, energy surge) are explained by adrenaline acting on specific.', faded: true, blankAnswer: 'Sensory threat → amygdala → hypothalamus → sympathetic.' }
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
        { type: 'dissect', nodeId: 'c10_bio_cbse_02_010', title: 'Identify each idea',
          dissect: { specimen: 'Control And Coordination', spots: [
            { id: 's1', label: 'Control and coordination is the', prompt: 'Which idea is this? — Control and coordination is the biological process by which organisms detect changes.', answer: 'Control and coordination is the', options: ['Control and coordination is the', 'The adrenal glands are a', 'The human brain is the'] },
            { id: 's2', label: 'The adrenal glands are a', prompt: 'Which idea is this? — The adrenal glands are a pair of endocrine glands located on top of each kidney,.', answer: 'The adrenal glands are a', options: ['The adrenal glands are a', 'Control and coordination is the', 'The human brain is the'] },
            { id: 's3', label: 'The human brain is the', prompt: 'Which idea is this? — The human brain is the central control center of the nervous system, divided into three.', answer: 'The human brain is the', options: ['The human brain is the', 'Control and coordination is the', 'The adrenal glands are a'] }
          ] } }
    ],
    explore: { component: C10_ScienceControlAndCoordinationSim, prompt: 'Explore the interactive — Control And Coordination' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_001', difficulty: 'standard',
          question: 'Control and coordination is the biological process by which organisms detect.',
          hint: 'If stuck, review c9_bio_ch2_8 (neuron structure) and c6_biology_ch10_007 (plant.',
          misconception: 'Students often think plants have a "nervous system" because they respond to stimuli, and they confuse the rapid leaf.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Control and coordination is the biological process by',
                  options: ['Control and coordination is the biological process by', 'The adrenal glands are a pair of endocrine glands located on top of each kidney,', 'The human brain is the central control center of the nervous system, divided into three'],
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
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_010', difficulty: 'standard',
          question: 'The adrenal glands are a pair of endocrine glands located on top of each.',
          hint: 'If stuck, review c10_bio_cbse_02_002 (neuron structure) and c10_bio_cbse_02_003 (reflex.',
          misconception: 'Students often believe that the adrenal medulla is stimulated by a hormone from the pituitary (like ACTH stimulates the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The adrenal glands are a pair of endocrine glands located on top of each kidney,',
                  options: ['The adrenal glands are a pair of endocrine glands located on top of each kidney,', 'Control and coordination is the biological process by', 'The human brain is the central control center of the nervous system, divided into three'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the adrenal medulla is stimulated by a hormone from the pituitary (like ACTH stimulates the cortex) and.' }
          ],
            remediations: { 'the-adrenal-medulla-is-stimulated': { steps: ['Revisit c10_bio_cbse_02_002 (neuron structure) and c10_bio_cbse_02_003 (reflex arc) to recall that sympathetic.', 'Draw a simple diagram: Spinal cord → sympathetic preganglionic fiber → adrenal medulla chromaffin cell (label as.', 'Compare with pituitary-adrenal cortex axis: Hypothalamus → CRH → Pituitary → ACTH → Adrenal cortex (cortisol).', 'Time the two pathways: neural = milliseconds to seconds; hormonal cascade = minutes.', 'Write one-line summary: "Adrenal medulla = fast neural trigger → hormonal broadcast; Adrenal cortex = slow hormonal.'] } } },
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
            remediations: { 'the-midbrain-is-a-minor': { steps: ['Draw a simple brainstem cross-section on paper: label midbrain at top, pons middle, medulla bottom.', 'Write "Superior colliculus → visual reflex (e.g., blink at bright light)" and "Inferior colliculus → auditory reflex.', 'Say aloud: "Midbrain = Reflex center for sight & sound."', 'Practice one NCERT exemplar question: "Which part of the brain controls the reflex movement of the head when a sudden.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
