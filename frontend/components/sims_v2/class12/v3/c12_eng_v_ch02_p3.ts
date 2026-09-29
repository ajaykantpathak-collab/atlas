import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_v_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_v_ch02_p3: SimDef = {
    id: 'v3_c12_eng_v_ch02_p3',
    title: 'The Tiger King · Part 3/3',
    subtitle: 'Ninety-nine tigers couldn\'t kill him — a wooden one did',
    classLevel: 12, subject: 'eng_v', topic: 'The Tiger King · Part 3/3',
    chapters: ['c12_eng_v_ch02'],
    nodeIds: ['c12_eng_v_cbse_02_013', 'c12_eng_v_cbse_02_014', 'c12_eng_v_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Satire reader', intro: 'A newborn growls \'Let tigers beware!\' A state reorganises itself around a prophecy. Satire at full pounce.', goal: 'Read The Tiger King as political satire on princely arrogance, colonial paramountcy and the delusion of mastering fate.' },
    discovery: {
        question: 'A Maharaja kills 99 real tigers to cheat a prophecy — and dies from a wooden toy tiger\'s splinter. Why does the smallest tiger win?',
        options: ['That\'s the satire\'s engine — power can command armies of death yet not a splinter; hubris is undone by the trivial thing it never deigned to fear', 'Luck — fate is random', 'The toy was actually alive', 'The astrologer lied'],
        answer: 'That\'s the satire\'s engine — power can command armies of death yet not a splinter; hubris is undone by the trivial thing it never deigned to fear',
        hook: 'The fable is double-barrelled satire: a prince who marries for tiger access mocks princely despotism, while a British officer\'s photo-op safaris skewer the Raj. The nonsense initials in his absurd title parody imperial honours — read the laughter as indictment.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'The Tiger King\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_v_cbse_02_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the hunt and the hubris: unpack the talking-infant prophecy, weigh paramountcy\'s leash on the Maharaja, and trace how a splinter completes what ninety-nine tigers couldn\'t.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_02_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'The Tiger King\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'Define dramatic irony and give one specific example from "The Tiger King" where the reader knows something the Maharaja does not.', options: [
                { text: 'Dramatic irony occurs when the audience/reader possesses knowledge that a character', outcome: 'Dramatic irony occurs when the audience/reader possesses knowledge that a character lacks, creating.' },
                { text: 'irony is when something unexpected happens', outcome: 'Not quite — Students believe the wooden tiger killing the Maharaja is merely "ironic bad luck" or "fate.', reveals: 'the-wooden-tiger-killing-the' },
                { text: 'ironic bad luck', outcome: 'Not quite — Students believe the wooden tiger killing the Maharaja is merely "ironic bad luck" or "fate.', reveals: 'the-wooden-tiger-killing-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_02_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'The Tiger King\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'Define the PEEL structure for answering a 5-mark literature question in CBSE Class 12 English.', options: [
                { text: 'PEEL stands for Point (one-sentence direct answer to the question), Evidence (a brief', outcome: 'PEEL stands for Point (one-sentence direct answer to the question), Evidence (a brief quote.' },
                { text: 'PEEL means writing a long paragraph', outcome: 'Not quite — Students believe "writing skills" means using flowery vocabulary and long sentences.', reveals: 'writing-skills-means-using-flowery' },
                { text: 'writing skills', outcome: 'Not quite — Students believe "writing skills" means using flowery vocabulary and long sentences.', reveals: 'writing-skills-means-using-flowery' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_02_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'The Tiger King\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'Define "dramatic irony" as it operates in The Tiger King, and give ONE specific instance from the text where the audience knows something.', options: [
                { text: 'Dramatic irony occurs when the reader/audience possesses knowledge that a character', outcome: 'Dramatic irony occurs when the reader/audience possesses knowledge that a character lacks, creating.' },
                { text: 'irony is when something funny happens', outcome: 'Not quite — Students treat "discussion" as "taking turns giving prepared speeches" — they memorize answers.', reveals: 'students-treat-discussion-as-taking' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A senior\'s horoscope once \'warned\' he\'d fail at his hundredth venture, so he\'s obsessively raced through 99 small projects and is now engineering the hundredth to be bulletproof — while ignoring a trivial, silly flaw in it.',
            decisions: [{ prompt: 'What does \'The Tiger King\' suggest here?', options: [
                { text: 'Watch for the wooden tiger — the Maharaja survives 99 real tigers but is killed by a sliver from a toy; obsession with defeating a prophecy blinds you to the absurd, insignificant thing that actually fulfils it.', outcome: 'The story\'s situational irony is that the prophecy arrives disguised as a birthday gift; treating the threat as a tiger-shaped contest is exactly the blindness that gets the Maharaja.' },
                { text: 'Help him make project number hundred genuinely flawless so the prediction can\'t bite.', outcome: 'That\'s the Maharaja\'s own logic — hunting the 100th tiger harder; the dewan\'s planted, half-dead tiger already shows the real danger isn\'t the one you\'re staging.', reveals: 'perfect-the-hundredth' },
                { text: 'Tell him prophecies are nonsense, so project hundred carries no special risk at all.', outcome: 'The story doesn\'t disprove the prophecy — it fulfils it through the least respected object in the tale; dismissing the warning entirely misses that anxiety about the wrong target is itself the hazard.', reveals: 'prophecy-is-nonsense' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'You can now read absurdity as critique — Kalki\'s laughing fable about power, prophecy and the splinter that topples kings.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_02_013', difficulty: 'standard',
          question: 'Critical thinking on \'The Tiger King\' — analysing the text to reach.',
          hint: 'If stuck, revisit c12_eng_v_cbse_02_009 (Literary Devices: Irony and Symbolism).',
          misconception: 'Students believe the wooden tiger killing the Maharaja is merely "ironic bad luck" or "fate catching up." They miss.',
          parts: [
                { id: 'a', prompt: 'Explain why the Maharaja\'s minions (dewan, hunters, shopkeeper) obey his irrational orders. Are they sincere loyalists or driven by fear?', answer: 'The minions are driven by fear, not sincerity',
                  options: ['The minions are driven by fear, not sincerity', 'loyalty', 'ironic bad luck', 'fate catching up'],
                  hint: 'If stuck, revisit c12_eng_v_cbse_02_009 (Literary Devices: Irony and Symbolism) to re-learn how.',
                  misconception: 'Students believe the wooden tiger killing the Maharaja is merely "ironic bad luck" or "fate catching up." They miss that Kalki constructs.' }
          ],
            remediations: { 'the-wooden-tiger-killing-the': { steps: ['If the student treats the ending as mere irony: (1) Re-read the toy shop scene — list every detail (price.', '(2) Map each detail to a parallel in the Maharaja\'s rule (e.g., "slivers like quills" → his prickly, unskilled.', '(3) Ask: "Could the Maharaja have died this way if he had been a just, attentive ruler?" (4) Conclude: the wooden tiger.', 'The author ensures the prophecy fulfills itself through the Maharaja\'s own choices — that is the satire\'s engine.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_02_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the wooden tiger killing the Maharaja is merely "ironic bad luck" or "fate catching up." They miss.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The astrologer\'s prophecy was self-fulfilling — the Maharaja\'s actions to avoid it caused it to come true." Defend or refute with.', answer: 'The statement is defensible',
                  options: ['The statement is defensible', 'pure fate', 'The Maharaja started out on a tiger hunt', 'ironic bad luck'],
                  hint: 'If stuck, revisit c12_eng_v_cbse_02_009 (Literary Devices: Irony and Symbolism) to re-learn how.',
                  misconception: 'Students believe the wooden tiger killing the Maharaja is merely "ironic bad luck" or "fate catching up." They miss that Kalki constructs.' }
          ],
            remediations: { 'the-wooden-tiger-killing-the': { steps: ['If the student treats the ending as mere irony: (1) Re-read the toy shop scene — list every detail (price.', '(2) Map each detail to a parallel in the Maharaja\'s rule (e.g., "slivers like quills" → his prickly, unskilled.', '(3) Ask: "Could the Maharaja have died this way if he had been a just, attentive ruler?" (4) Conclude: the wooden tiger.', 'The author ensures the prophecy fulfills itself through the Maharaja\'s own choices — that is the satire\'s engine.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_02_014', difficulty: 'standard',
          question: 'Writing skills from \'The Tiger King\' — using the text as a model or springboard.',
          hint: 'If stuck on evidence selection, re-read the "Reading with Insight" questions and map each.',
          misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.',
          parts: [
                { id: 'a', prompt: 'Explain why the following weak answer fails: "The Maharaja killed 99 tigers because the astrologer said he would die by a tiger.', answer: 'The answer fails',
                  options: ['The answer fails', 'summary', 'analysis', 'writing skills'],
                  hint: 'If stuck on evidence selection, re-read the "Reading with Insight" questions and map each to 2-3.',
                  misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.' },
                { id: 'b', prompt: 'Apply the PEEL structure to write a 4-sentence response to: "What is the author\'s indirect comment on subjecting innocent animals to the willfulness of human.', answer: 'Point: Kalki condemns human arrogance that treats wildlife as props for ego',
                  options: ['Point: Kalki condemns human arrogance that treats wildlife as props for ego', 'twisted logic', 'writing skills', 'The Maharaja\'s tyranny manifests in his monopoly on tiger hunting'],
                  hint: 'If stuck on evidence selection, re-read the "Reading with Insight" questions and map each to 2-3.',
                  misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.' },
                { id: 'c', prompt: 'Analyze the difference between a "character sketch" answer and a "thematic analysis" answer for the Maharaja. Give one structural distinction.', answer: 'A character sketch organizes by *traits* (e.g., arrogance, obstinacy, moments of',
                  options: ['A character sketch organizes by *traits* (e.g., arrogance, obstinacy, moments of', 'writing skills', 'The Maharaja\'s tyranny manifests in his monopoly on tiger hunting', 'good English'],
                  hint: 'If stuck on evidence selection, re-read the "Reading with Insight" questions and map each to 2-3.',
                  misconception: 'Students believe "writing skills" means using flowery vocabulary and long sentences.' }
          ],
            remediations: { 'writing-skills-means-using-flowery': { steps: ['Have the student rewrite the flowery sentence above into a 15-word analytical sentence.', 'Give them a 5-mark question and a highlighter: mark Point (yellow), Evidence (pink), Explanation (green), Link (blue).', 'If any color is missing, they rewrite that component only.', 'Practice with a timer: 7 minutes per 5-mark answer.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_02_015', difficulty: 'standard',
          question: 'Discussion points on \'The Tiger King\' — speaking and listening around the text.',
          hint: 'If stuck, return to node c12_eng_v_cbse_02_013 (Critical Thinking) and complete written.',
          misconception: 'Students treat "discussion" as "taking turns giving prepared speeches" — they memorize answers to the five NCERT.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the Maharaja\'s minions obey him — is it sincerity, fear, or something else? Support with TWO textual details.', answer: 'The minions operate from fear and self-preservation, not sincerity',
                  options: ['The minions operate from fear and self-preservation, not sincerity', 'loyalty', 'respect'],
                  hint: 'If stuck, return to node c12_eng_v_cbse_02_013 (Critical Thinking) and complete written CERL.',
                  misconception: 'Students treat "discussion" as "taking turns giving prepared speeches" — they memorize answers to the five NCERT questions and recite them.' },
                { id: 'b', prompt: 'Analyze how the wooden toy tiger functions as a symbol. Compare its role in the prophecy\'s fulfillment with the 99 real tigers.', answer: 'The 99 real tigers represent the Maharaja\'s violent agency',
                  options: ['The 99 real tigers represent the Maharaja\'s violent agency', 'ironic twist'],
                  hint: 'If stuck, return to node c12_eng_v_cbse_02_013 (Critical Thinking) and complete written CERL.',
                  misconception: 'Students treat "discussion" as "taking turns giving prepared speeches" — they memorize answers to the five NCERT questions and recite them.' }
          ],
            remediations: { 'students-treat-discussion-as-taking': { steps: ['If a student cannot sustain interactive dialogue: Step 1 — Assign roles in triads: Speaker (2 min), Listener (takes.', 'Step 2 — Use "Discussion Stem Cards" (physical or digital): "Building on...", "I see it differently because...", "Can.', 'Step 4 — Record 3-min discussion, self-assess using CBSE rubric (Fluency, Coherence, Interaction, Vocabulary, Grammar).', 'Revisit node c12_eng_v_cbse_02_013 (Critical Thinking) for evidence-gathering if content is weak.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
