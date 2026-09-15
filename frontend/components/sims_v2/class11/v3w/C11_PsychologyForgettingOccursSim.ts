import type { SimDef } from '../../engine/types';
import C11_PsychologyForgettingOccursSim from '../../../simulations/c6_12/C11_PsychologyForgettingOccursSim';

/** v3 wrapped master — C11_PsychologyForgettingOccursSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_psychologyforgettingoccurssim: SimDef = {
    id: 'v3w_c11_psychologyforgettingoccurssim',
    title: 'Forgetting Occurs',
    subtitle: 'Covers three major forgetting theories (trace decay, interference, repression) with.',
    classLevel: 11, subject: 'psychology', topic: 'Theories of Forgetting: Interference, Decay and Repression',
    chapters: [],
    nodeIds: ['c11_psy_cbse_06_007', 'c11_psy_cbse_06_004', 'c11_psy_cbse_06_006', 'c11_psy_cbse_06_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you studied Hindi vocabulary yesterday, then French vocabulary today, and now you cannot recall the.', goal: 'Master Forgetting Occurs.' },
    discovery: {
        question: 'State the core assumption of Trace Decay Theory and name the classic experimental finding that contradicts it.',
        options: ['**Core assumption**: Memory traces are physical changes in the brain that fade', 'sleep reduces interference so decay is proven', 'awake group forgot less'],
        answer: '**Core assumption**: Memory traces are physical changes in the brain that fade',
        hook: '**Misconception**: "Proactive and retroactive interference are just \'forgetting because of other learning\' — the.',
    },
    teaching: [
        { title: 'Forgetting theories explain why stored.', text: 'Forgetting theories explain why stored information becomes inaccessible: **Trace Decay Theory** proposes memory traces physically fade over time due to disuse; **Interference Theory** states.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_psy_cbse_06_007', title: 'Forgetting theories explain why stored.',
          scaffold: { problem: 'A researcher wants to test whether learning Sanskrit *after* Hindi causes retroactive interference for Hindi recall.',
            steps: [
            { text: 'Identify the interference type tested — Sanskrit learned *after* Hindi, recalling *Hindi* → retroactive interference.' },
            { text: 'Compare group means — Experimental (8.2) < Control (14.7) → 6.5 word deficit.' },
            { text: 'Check if design isolates interference — Control group had *no interpolated learning* (rest only), so their forgetting.' },
            { text: 'Evaluate the similarity confound — Sanskrit list was *phonologically similar* to Hindi.' },
            { text: 'Formulate additional control — Add Group 3: Hindi → *dissimilar* Sanskrit (e.g., no phonological overlap) → recall.', faded: true, blankAnswer: 'Yes, results support retroactive interference (Experimental.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_06_004', title: 'Long-term memory (LTM) is a relatively.',
          scaffold: { problem: 'A Class 11 student, Arjun, is preparing for his Psychology exam.',
            steps: [
            { text: 'Identify Arjun\'s first encoding strategy: reading the definition five times.' },
            { text: 'Identify his second strategy: explaining in own words and linking to personal typing experience.' },
            { text: 'Analyze the exam question: it asks for an *example of procedural memory* (a skill/procedure).' },
            { text: 'Determine the correct type of memory for his answer: Semantic memory (a fact about mathematics).' },
            { text: 'Conclude: Arjun used effective elaborative rehearsal to store *semantic knowledge about procedural memory*, but he.', faded: true, blankAnswer: 'Arjun\'s maintenance rehearsal (reading 5×) failed to.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_06_006', title: 'Forgetting is the inability to retrieve.',
          scaffold: { problem: 'Ananya learns 50 history dates on Monday 10 PM for a Friday test.',
            steps: [
            { text: 'Identify the baseline forgetting curve values from Ebbinghaus\'s data: retention at 1 hr = 45%, 1 day = 35%, 2 days =.' },
            { text: 'Calculate retention **without any review** at Friday (96 hrs ≈ 4 days): directly read 25% from the curve.' },
            { text: 'Model **first review at 24 hrs (1 day)**: At 24 hrs, retention would have dropped to 35%. Review resets it to 100%.' },
            { text: 'Calculate retention at **second review (Thursday 10 PM = 48 hrs after first review)**: Using curve, 2-day retention =.' },
            { text: 'Calculate retention at **Friday test (24 hrs after second review = 1 day)**: 1-day retention = 35%.' },
            { text: 'Compare: **With reviews = 35% retained (≈17-18 dates)**; **Without reviews = 25% retained (≈12-13 dates)**.', faded: true, blankAnswer: 'With two spaced reviews: ~35% retention (17-18 dates)..' }
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
        { type: 'dissect', nodeId: 'c11_psy_cbse_06_004', title: 'Identify each idea',
          dissect: { specimen: 'Forgetting Occurs', spots: [
            { id: 's1', label: 'Forgetting theories explain why stored', prompt: 'Which idea is this? — Forgetting theories explain why stored information becomes inaccessible: **Trace Decay.', answer: 'Forgetting theories explain why stored', options: ['Forgetting theories explain why stored', 'Long-term memory LTM is a', 'Forgetting is the inability to', 'Memory as a constructive process'] },
            { id: 's2', label: 'Long-term memory LTM is a', prompt: 'Which idea is this? — Long-term memory (LTM) is a relatively permanent memory system with virtually unlimited.', answer: 'Long-term memory LTM is a', options: ['Long-term memory LTM is a', 'Forgetting theories explain why stored', 'Forgetting is the inability to', 'Memory as a constructive process'] },
            { id: 's3', label: 'Forgetting is the inability to', prompt: 'Which idea is this? — Forgetting is the inability to retrieve previously stored information from long-term.', answer: 'Forgetting is the inability to', options: ['Forgetting is the inability to', 'Forgetting theories explain why stored', 'Long-term memory LTM is a', 'Memory as a constructive process'] },
            { id: 's4', label: 'Memory as a constructive process', prompt: 'Which idea is this? — Memory as a constructive process refers to the understanding that memory is not a.', answer: 'Memory as a constructive process', options: ['Memory as a constructive process', 'Forgetting theories explain why stored', 'Long-term memory LTM is a', 'Forgetting is the inability to'] }
          ] } }
    ],
    explore: { component: C11_PsychologyForgettingOccursSim, prompt: 'Explore the interactive — Forgetting Occurs' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_007', difficulty: 'standard',
          question: 'Forgetting theories explain why stored information becomes inaccessible:.',
          hint: 'If stuck, revisit **c11_psy_cbse_06_006 (Ebbinghaus Curve)** — specifically the *shape*.',
          misconception: '**Misconception**: "Proactive and retroactive interference are just \'forgetting because of other learning\' — the.',
          parts: [
                { id: 'a', prompt: 'State the core assumption of Trace Decay Theory and name the classic experimental finding that contradicts it.', answer: '**Core assumption**: Memory traces are physical changes in the brain that fade',
                  options: ['**Core assumption**: Memory traces are physical changes in the brain that fade', 'sleep reduces interference so decay is proven', 'awake group forgot less'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "Proactive and retroactive interference are just \'forgetting because of other learning\' — the direction (past→future vs.' }
          ],
            remediations: { 'misconception-proactive-and-retroactive-interfer': { steps: ['**Step-by-step remediation**: 1.', '**Re-enact Table 6.1 physically**: Use index cards.', 'Label "List A", "List B", "Rest".', 'Student acts as experimenter: assigns "participants" (classmates) to Proactive Exp/Control and Retroactive Exp/Control.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_004', difficulty: 'standard',
          question: 'Long-term memory (LTM) is a relatively permanent memory system with virtually.',
          hint: 'Revisit **c11_psy_cbse_06_003** (Short-Term Memory and Working Memory), specifically the.',
          misconception: '**Misconception:** "Declarative memory is \'knowing that\' and procedural memory is \'knowing how\'—so if I can explain.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Long-term memory (LTM) is a relatively permanent memory system with virtually unlimited',
                  options: ['Long-term memory (LTM) is a relatively permanent memory system with virtually unlimited', 'Forgetting theories explain why stored information becomes inaccessible: **Trace Decay', 'Forgetting is the inability to retrieve previously stored information from long-term', 'Memory as a constructive process refers to the understanding that memory is not a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Declarative memory is \'knowing that\' and procedural memory is \'knowing how\'—so if I can explain *how* to do something,.' }
          ],
            remediations: { 'misconception-declarative-memory-is-knowing': { steps: ['**Confront the confusion directly:** Ask the student: "Can you explain *exactly* how you maintain balance on a.', 'Then say: "Now write down the steps." They can do it.', 'Point out: *The written steps are semantic memory; the balancing is procedural memory.', 'They are different memory traces.* 2.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_06_006', difficulty: 'standard',
          question: 'Forgetting is the inability to retrieve previously stored information from.',
          hint: 'Revisit c11_psy_cbse_06_001 (Nature of Memory) — specifically the.',
          misconception: '**Misconception:** "Ebbinghaus\'s curve means *most* forgetting happens in the first 20 minutes, so if I survive the.',
          parts: [
                { id: 'a', prompt: 'Explain why the "sleep vs. wake" comparison disproves trace decay theory as the *sole* explanation for forgetting, using the logic of "opportunity for trace.', answer: 'Trace decay theory predicts that memory traces fade from *disuse*',
                  options: ['Trace decay theory predicts that memory traces fade from *disuse*', 'sleep group forgets more', 'I\'ll just review once after 1 hour and I\'ll remember it forever'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Ebbinghaus\'s curve means *most* forgetting happens in the first 20 minutes, so if I survive the first hour, I\'m safe.".' },
                { id: 'b', prompt: 'Design a 2×2 experimental layout to test **retroactive interference** using nonsense syllables.', answer: 'what Group 1 learns in Phase 1 and Phase 2, (',
                  options: ['what Group 1 learns in Phase 1 and Phase 2, (', 'I\'ll just review once after 1 hour and I\'ll remember it forever'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Ebbinghaus\'s curve means *most* forgetting happens in the first 20 minutes, so if I survive the first hour, I\'m safe.".' },
                { id: 'c', prompt: 'A student memorizes 30 Spanish vocabulary words using the keyword method (e.g., *pato* → "pot" → duck in pot).', answer: 'The memory trace is **intact but inaccessible**',
                  options: ['The memory trace is **intact but inaccessible**', 'the memory decayed', 'restores recall instantly)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Ebbinghaus\'s curve means *most* forgetting happens in the first 20 minutes, so if I survive the first hour, I\'m safe.".' }
          ],
            remediations: { 'misconception-ebbinghaus-s-curve-means': { steps: ['**Step-by-step remediation:** 1.', '**Re-plot the curve together**: Give the student blank axes (Time: 0, 20 min, 1 hr, 9 hr, 1 day, 2 days, 6 days;.', 'Have them plot Ebbinghaus\'s actual data points — the visual flattening *after* day 1 makes the asymptotic loss.', '**Calculate "forgotten per day"**: Compute daily loss rates: Day 0→1 = 40% loss; Day 1→2 = 5%; Day 2→6 = ~1%/day.'] } } },
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
            remediations: { 'misconception-memory-works-like-a': { steps: ['**Step-by-step remediation**: 1.', '**Re-enact Bartlett\'s study in miniature**: Tell the student a short, culturally unfamiliar story (e.g., a folk tale.', 'After 10 minutes, ask them to recall it.', 'After 24 hours, ask again.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
