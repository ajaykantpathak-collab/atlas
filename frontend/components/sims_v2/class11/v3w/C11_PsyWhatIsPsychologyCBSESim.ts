import type { SimDef } from '../../engine/types';
import C11_PsyWhatIsPsychologyCBSESim from '../../../simulations/c6_12_new/C11_PsyWhatIsPsychologyCBSESim';

/** v3 wrapped master — C11_PsyWhatIsPsychologyCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_psywhatispsychologycbsesim: SimDef = {
    id: 'v3w_c11_psywhatispsychologycbsesim',
    title: 'Psy What Is Psychology CBSE',
    subtitle: 'This node covers William James\'s functionalism, the stream of consciousness concept.',
    classLevel: 11, subject: 'science', topic: 'Functionalism: William James and Stream of Consciousness',
    chapters: [],
    nodeIds: ['c11_psy_cbse_01_005', 'c11_psy_cbse_06_008', 'c11_psy_cbse_03_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you\'re watching a cricket match on TV while simultaneously thinking about your upcoming exam, hearing.', goal: 'Master Psy What Is Psychology CBSE.' },
    discovery: {
        question: 'Critique this statement using James\'s principles: "Since consciousness is a continuous stream, we can never scientifically study it—science requires fixed,.',
        options: ['Invalid criticism', 'stream of consciousness', 'stream of thought'],
        answer: 'Invalid criticism',
        hook: 'Students confuse "stream of consciousness" with "stream of thought" in literature (e.g., Joyce, Woolf), assuming James.',
    },
    teaching: [
        { title: 'Functionalism is a school of psychology.', text: 'Functionalism is a school of psychology founded by William James that studies the adaptive functions of consciousness and behaviour—how mental processes help organisms survive and adjust to their.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_psy_cbse_01_005', title: 'Functionalism is a school of psychology.',
          scaffold: { problem: 'A Class 11 student, Arjun, is preparing for his Psychology exam.',
            steps: [
            { text: 'Identify the two concurrent currents in Arjun\'s stream—the textbook content (intended focus) and the cricket match.' },
            { text: 'Apply James\'s concept of "selective attention": the stream has a focus (cricket thoughts) and a fringe (vague awareness.' },
            { text: 'Apply "intentionality": every moment of the stream is *about* something—here, the cricket match became the intentional.' },
            { text: 'Apply "continuity": the stream never stopped; it flowed from one thought to another without a gap, even though the.' },
            { text: 'Explain adaptiveness: James argues consciousness selects what is *currently most relevant* to the organism\'s goals.', faded: true, blankAnswer: '(a) Arjun\'s stream continuously flowed but its focus.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_06_008', title: 'Memory as a constructive process refers.',
          scaffold: { problem: 'Bartlett asked English participants to recall the "War of the Ghosts" story after 1 hour, 1 day, 1 week, and 1 month.',
            steps: [
            { text: 'Identify leveling transformations — at 1 hour, supernatural elements were dropped (leveling: unfamiliar details.' },
            { text: 'Identify sharpening transformations — at 1 day, the dramatic death scene was exaggerated (sharpening: striking details.' },
            { text: 'Identify assimilation transformations — at 1 day, "canoe" became "boat" and "seal-hunting" became "fishing".' },
            { text: 'Synthesize the pattern — over time, the story moved *systematically* toward the participant\'s English cultural schemas:.' },
            { text: 'Connect to the constructive model — the participant is not *forgetting* the story (forgetting would produce gaps); they.', faded: true, blankAnswer: 'The participant\'s recall shows systematic transformations.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_03_004', title: 'Neonate and infant reflexes are.',
          scaffold: { problem: 'A pediatrician tests a 5‑month‑old infant and observes: (a) no rooting when cheek stroked, (b) strong Moro response to loud noise, (c).',
            steps: [
            { text: 'Identify each reflex being tested: (a) rooting, (b) Moro, (c) palmar grasp, (d) Babinski.' },
            { text: 'Recall the typical disappearance ages from Table 3.1: rooting 3–6 mo, Moro 6–7 mo, palmar grasp 3–4 mo, Babinski 8–12.' },
            { text: 'Compare observed responses to norms at 5 months: rooting absent = typical (disappeared on time); Moro present = typical.' },
            { text: 'Interpret the atypical palmar grasp: persistence beyond 4 months suggests delayed cortical inhibition of the grasp.' },
            { text: 'Formulate a clinical note: “Rooting and Babinski age‑appropriate; Moro age‑appropriate; palmar grasp persists — refer.' },
            { text: 'Reflect on how this assessment uses reflex integration as a window into CNS maturation.', faded: true, blankAnswer: '(a) Typical — rooting normally gone by 3–6 mo. (b) Typical.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_psy_cbse_06_008', title: 'Identify each idea',
          dissect: { specimen: 'Psy What Is Psychology CBSE', spots: [
            { id: 's1', label: 'Functionalism is a school of', prompt: 'Which idea is this? — Functionalism is a school of psychology founded by William James that studies the.', answer: 'Functionalism is a school of', options: ['Functionalism is a school of', 'Memory as a constructive process', 'Neonate and infant reflexes are'] },
            { id: 's2', label: 'Memory as a constructive process', prompt: 'Which idea is this? — Memory as a constructive process refers to the understanding that memory is not a.', answer: 'Memory as a constructive process', options: ['Memory as a constructive process', 'Functionalism is a school of', 'Neonate and infant reflexes are'] },
            { id: 's3', label: 'Neonate and infant reflexes are', prompt: 'Which idea is this? — Neonate and infant reflexes are involuntary, automatic motor responses to specific.', answer: 'Neonate and infant reflexes are', options: ['Neonate and infant reflexes are', 'Functionalism is a school of', 'Memory as a constructive process'] }
          ] } }
    ],
    explore: { component: C11_PsyWhatIsPsychologyCBSESim, prompt: 'Explore the interactive — Psy What Is Psychology CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_005', difficulty: 'standard',
          question: 'Functionalism is a school of psychology founded by William James that studies.',
          hint: 'Revisit c11_psy_cbse_01_004: Focus on why introspection failed as a universal method.',
          misconception: 'Students confuse "stream of consciousness" with "stream of thought" in literature (e.g., Joyce, Woolf), assuming James.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Functionalism is a school of psychology founded by William James that studies the',
                  options: ['Functionalism is a school of psychology founded by William James that studies the', 'Memory as a constructive process refers to the understanding that memory is not a', 'Neonate and infant reflexes are involuntary, automatic motor responses to specific'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse "stream of consciousness" with "stream of thought" in literature (e.g., Joyce, Woolf), assuming James meant a narrative.' }
          ],
            remediations: { 'students-confuse-stream-of-consciousness': { steps: ['Have the student close their eyes for 30 seconds and notice everything in awareness—sounds, bodily sensations, fleeting.', 'Ask: "Did your awareness come in separate sentences, or as a shifting field where some things were sharp (focus) and.', 'Map their report to James\'s four characteristics using a diagram: draw a river with a bright center (focus) and misty.', 'Contrast with structuralism: "If Wundt asked you to report \'elements,\' what would you have to do to your stream?".'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse "stream of consciousness" with "stream of thought" in literature (e.g., Joyce, Woolf), assuming James.',
          parts: [
                { id: 'a', prompt: 'Critique this statement using James\'s principles: "Since consciousness is a continuous stream, we can never scientifically study it—science requires fixed,.', answer: 'Invalid criticism',
                  options: ['Invalid criticism', 'stream of consciousness', 'stream of thought'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse "stream of consciousness" with "stream of thought" in literature (e.g., Joyce, Woolf), assuming James meant a narrative.' },
                { id: 'b', prompt: 'Create an original real-life example (not from the textbook) that illustrates all four characteristics of James\'s stream of consciousness: continuity,.', answer: 'Example: A driver navigating Delhi traffic while planning dinner',
                  options: ['Example: A driver navigating Delhi traffic while planning dinner', 'stream of consciousness', 'stream of thought'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse "stream of consciousness" with "stream of thought" in literature (e.g., Joyce, Woolf), assuming James meant a narrative.' }
          ],
            remediations: { 'students-confuse-stream-of-consciousness': { steps: ['Have the student close their eyes for 30 seconds and notice everything in awareness—sounds, bodily sensations, fleeting.', 'Ask: "Did your awareness come in separate sentences, or as a shifting field where some things were sharp (focus) and.', 'Map their report to James\'s four characteristics using a diagram: draw a river with a bright center (focus) and misty.', 'Contrast with structuralism: "If Wundt asked you to report \'elements,\' what would you have to do to your stream?".'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_008', difficulty: 'standard',
          question: 'Memory as a constructive process refers to the understanding that memory is not.',
          hint: 'If the student cannot grasp reconstruction (keeps thinking of memory as playback), return.',
          misconception: '**Misconception**: "Memory works like a video camera — it records events faithfully and replays them on demand.',
          parts: [
                { id: 'a', prompt: 'Define "schema" in your own words and explain how schemas influence memory at each of the three stages: encoding, storage, and retrieval.', answer: 'A schema is a mental framework',
                  options: ['A schema is a mental framework', 'a memory', 'a category'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "Memory works like a video camera — it records events faithfully and replays them on demand.' },
                { id: 'b', prompt: 'Distinguish between "reproductive memory" and "reconstructive memory." Why is the reproductive model (memory as faithful playback) empirically inadequate?', answer: '**Reproductive memory**: the mind records events like a camera and replays them',
                  options: ['**Reproductive memory**: the mind records events like a camera and replays them', 'reproductive memory is wrong'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "Memory works like a video camera — it records events faithfully and replays them on demand.' },
                { id: 'c', prompt: 'Explain how the reconstructive nature of memory undermines the reliability of eyewitness testimony.', answer: 'The reconstructive nature of memory undermines eyewitness reliability',
                  options: ['The reconstructive nature of memory undermines eyewitness reliability', 'eyewitnesses are unreliable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "Memory works like a video camera — it records events faithfully and replays them on demand.' }
          ],
            remediations: { 'misconception-memory-works-like-a': { steps: ['**Step-by-step remediation**: 1.', '**Re-enact Bartlett\'s study in miniature**: Tell the student a short, culturally unfamiliar story (e.g., a folk tale.', 'After 10 minutes, ask them to recall it.', 'After 24 hours, ask again.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_004', difficulty: 'standard',
          question: 'Neonate and infant reflexes are involuntary, automatic motor responses to.',
          hint: 'If stuck, revisit Class 10 Biology Chapter 2 “Reflex Action and Reflex Arc”.',
          misconception: 'Students often think that **reflexes disappear because the baby “learns” not to do them** (i.e., voluntary suppression.',
          parts: [
                { id: 'a', prompt: 'A newborn turns its head toward the breast and makes sucking movements when the cheek is stroked.', answer: 'The reflex is the **rooting reflex**',
                  options: ['The reflex is the **rooting reflex**', 'sucking reflex', 'learns'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that **reflexes disappear because the baby “learns” not to do them** (i.e., voluntary suppression through practice).' },
                { id: 'b', prompt: 'Compare the Babinski reflex and the plantar grasp reflex (toe curling when the sole is touched).', answer: '**Babinski reflex**: stimulus = stroking lateral sole',
                  options: ['**Babinski reflex**: stimulus = stroking lateral sole', 'learns', '**reflexes disappear'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that **reflexes disappear because the baby “learns” not to do them** (i.e., voluntary suppression through practice).' }
          ],
            remediations: { 'reflexes-disappear-because-the-baby': { steps: ['If a student holds this misconception, do the following: (1) Show a video of a 1‑month‑old and a 7‑month‑old both.', '(2) Use the analogy of a **software update**: the brainstem “firmware” runs the reflex; the cortex “installs an update”.', '(3) Ask the student to predict what happens to the Babinski reflex in an adult with a spinal cord injury (it reappears.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that **reflexes disappear because the baby “learns” not to do them** (i.e., voluntary suppression.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: “Reflexes are useless leftovers from evolution; they disappear because they are not needed.” Use evidence from the NCERT text and the.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'learns', '**reflexes disappear'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that **reflexes disappear because the baby “learns” not to do them** (i.e., voluntary suppression through practice).' },
                { id: 'b', prompt: 'Design a simple observational checklist for a parent to track gross‑motor milestones from birth to 12 months.', answer: 'A good checklist might include: (1) **Head control** (2–3 mo)',
                  options: ['A good checklist might include: (1) **Head control** (2–3 mo)', 'learns', '**reflexes disappear'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that **reflexes disappear because the baby “learns” not to do them** (i.e., voluntary suppression through practice).' },
                { id: 'c', prompt: 'Compare the Babinski reflex and the plantar grasp reflex (toe curling when the sole is touched).', answer: '**Babinski reflex**: stimulus = stroking lateral sole',
                  options: ['**Babinski reflex**: stimulus = stroking lateral sole', 'learns', '**reflexes disappear'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that **reflexes disappear because the baby “learns” not to do them** (i.e., voluntary suppression through practice).' }
          ],
            remediations: { 'reflexes-disappear-because-the-baby': { steps: ['If a student holds this misconception, do the following: (1) Show a video of a 1‑month‑old and a 7‑month‑old both.', '(2) Use the analogy of a **software update**: the brainstem “firmware” runs the reflex; the cortex “installs an update”.', '(3) Ask the student to predict what happens to the Babinski reflex in an adult with a spinal cord injury (it reappears.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
