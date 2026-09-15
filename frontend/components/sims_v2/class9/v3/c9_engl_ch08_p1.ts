import type { SimDef } from '../../engine/types';

/** v3 generated — c9_engl_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_engl_ch08_p1: SimDef = {
    id: 'v3_c9_engl_ch08_p1',
    title: 'Follow That Dream · Part 1/2',
    subtitle: 'A letter where the anecdote IS the argument',
    classLevel: 9, subject: 'engl', topic: 'Follow That Dream · Part 1/2',
    chapters: ['c9_engl_ch08'],
    nodeIds: ['c9_engl_ch8_1', 'c9_engl_ch8_10', 'c9_engl_ch8_2', 'c9_engl_ch8_3', 'c9_engl_ch8_4', 'c9_engl_ch8_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a letter analyst', intro: 'A mother who gave up dancing writes to a daughter standing at her own crossroads. Your task: extract the advice, the proof and the promise — without turning her metaphor into a tragedy.', goal: 'Summarise an epistolary text by extracting the writer\'s purpose, central advice, supporting anecdote and tone — in objective reported speech, not personal reaction.' },
    discovery: {
        question: 'A mother writes: \'I didn\'t become the dancer I dreamed of, but I choreograph my life every day.\' A student summarises: \'The mother regrets not becoming a dancer.\' What did they misread?',
        options: ['Everything — she isn\'t mourning the lost dream; she\'s showing how dreams transform into new purpose', 'Nothing — regret is exactly what she means', 'The word \'choreograph\' is just a spelling error', 'She actually became a famous dancer'],
        answer: 'Everything — she isn\'t mourning the lost dream; she\'s showing how dreams transform into new purpose',
        hook: 'A letter isn\'t a story with a plot — it\'s an argument: claim → personal evidence → warning → reassurance. Summarise it as \'first she said X, then Y\' and you miss that the dance anecdote exists to PROVE the advice, not to fill a timeline.',
    },
    teaching: [
        { title: 'Text Summary: A Mother\'s Letter to Her Daughter', text: 'A text summary of an epistolary piece condenses the letter\'s core message, the writer\'s purpose, key supporting details, and emotional tone into a concise, objective paragraph written in the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_engl_ch8_1', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Distil a mother\'s letter to her daughter into 80-100 words: who writes to whom, the core advice (pursue the dream, skip the shortcuts), the dance-dream anecdote as evidence, and the supportive-but-realistic closing — all in reported speech.',
        labels: ['Text Summary: A Mother\'s', 'Discussion: Balancing Dreams with', 'Text Type: Epistolary Form', 'Theme: Pursuing Dreams with', 'Theme: Effort, Investment', 'Theme: Obstacles and Changing'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_engl_ch8_1', title: 'Text Summary: A Mother\'s Letter to Her Daughter',
          caseStudy: { intro: 'Imagine your younger sibling asks you what the letter in today\'s English class was about, but they only have two minutes before their tuition starts.',
            decisions: [{ prompt: 'What is the primary purpose of a text summary for a board exam answer?', options: [
                { text: 'The primary purpose is to demonstrate comprehension by concisely restating the text\'s', outcome: 'The primary purpose is to demonstrate comprehension by concisely restating the text\'s main ideas.' },
                { text: 'to give my opinion on the letter', outcome: 'Not quite — Students treat the letter as a story with a plot sequence ("First she says X, then she tells.', reveals: 'students-treat-the-letter-as' },
                { text: 'to copy important lines', outcome: 'Not quite — Students treat the letter as a story with a plot sequence ("First she says X, then she tells.', reveals: 'students-treat-the-letter-as' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch8_10', title: 'Discussion: Balancing Dreams with Practical Realities',
          caseStudy: { intro: 'Imagine you are a Class 9 student who dreams of becoming a professional footballer, but your parents insist you focus entirely on the upcoming board exams.',
            decisions: [{ prompt: 'Define "practical realities" in the context of pursuing a dream, using one example from the mother\'s letter.', options: [
                { text: 'Practical realities are tangible constraints—time, money, health, family obligations,', outcome: 'Practical realities are tangible constraints—time, money, health, family obligations, market.' },
                { text: 'practical realities are just excuses parents make', outcome: 'Not quite — Students equate "balancing" with "compromising downwards"—they think the mother means "dream.', reveals: 'students-equate-balancing-with-compromising' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch8_2', title: 'Text Type: Epistolary Form (Letter Writing)',
          caseStudy: { intro: 'Imagine you find an old letter from your grandmother tucked inside a book — the handwriting, the crossed-out words, the "my dearest" at the start — it feels.',
            decisions: [{ prompt: 'What is the defining structural feature of an epistolary text that distinguishes it from a first-person narrative?', options: [
                { text: 'An epistolary text is structured as a document (letter, diary entry, email) addressed to', outcome: 'An epistolary text is structured as a document (letter, diary entry, email) addressed to a specific.' },
                { text: 'both use \'I\'', outcome: 'Not quite — Students think "epistolary" just means "written in first person" or "uses \'I\' and \'you\'." They miss.', reveals: 'epistolary-just-means-written-in' },
                { text: 'epistolary', outcome: 'Not quite — Students think "epistolary" just means "written in first person" or "uses \'I\' and \'you\'." They miss.', reveals: 'epistolary-just-means-written-in' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch8_3', title: 'Theme: Pursuing Dreams with Conviction and Sacrifice',
          caseStudy: { intro: 'Imagine you dream of becoming a classical dancer, but your family expects you to choose a stable government job.',
            decisions: [{ prompt: 'What is the core meaning of "conviction" in the context of pursuing a dream, as implied by the mother\'s letter?', options: [
                { text: 'Conviction means a deep, unshakeable belief in the worth and possibility of one\'s dream', outcome: 'Conviction means a deep, unshakeable belief in the worth and possibility of one\'s dream that.' },
                { text: 'conviction means stubbornness', outcome: 'Not quite — Students often think "sacrifice" in this theme means only giving up material things (money, sleep).', reveals: 'sacrifice-in-this-theme-means' },
                { text: 'conviction means ignoring advice', outcome: 'Not quite — Students often think "sacrifice" in this theme means only giving up material things (money, sleep).', reveals: 'sacrifice-in-this-theme-means' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch8_4', title: 'Theme: Effort, Investment and Long-Term Commitment',
          caseStudy: { intro: 'Imagine you want to learn the guitar. You buy one, strum a few chords, and it sounds terrible. You quit after a week.',
            decisions: [{ prompt: 'What is the mother\'s primary metaphor for "investment" in the letter, and how does it differ from a financial definition?', options: [
                { text: 'The mother\'s primary metaphor for investment is the expenditure of *time, repeated', outcome: 'The mother\'s primary metaphor for investment is the expenditure of *time, repeated effort, and.' },
                { text: 'she invested money in driving lessons', outcome: 'Not quite — Students often conflate **"Effort"** (a single intense burst of energy) with.', reveals: 'students-often-conflate-effort-a' },
                { text: 'investment', outcome: 'Not quite — Students often conflate **"Effort"** (a single intense burst of energy) with.', reveals: 'students-often-conflate-effort-a' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch8_5', title: 'Theme: Obstacles and Changing Life Circumstances',
          caseStudy: { intro: 'Imagine you are planning to become a doctor, but suddenly your family needs you to help run the family shop after your father falls ill. How would you feel?',
            decisions: [{ prompt: 'What are the two main obstacles the mother explicitly states prevented her from becoming a professional dancer?', options: [
                { text: 'The mother states that her marriage at a young age and the subsequent responsibilities of', outcome: 'The mother states that her marriage at a young age and the subsequent responsibilities.' },
                { text: 'lack of talent', outcome: 'Not quite — Students often think "obstacles" in this theme are only *external* events (marriage, money, war).', reveals: 'obstacles-in-this-theme-are' },
                { text: 'financial problems', outcome: 'Not quite — Students often think "obstacles" in this theme are only *external* events (marriage, money, war).', reveals: 'obstacles-in-this-theme-are' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch8_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Summarising a mother\'s letter to her daughter about chasing a dream, a student writes: \'First she says she loves her daughter. Then she talks about her own dance dream. Then she warns about shortcuts. It was heartfelt and I felt inspired.\'',
            decisions: [{ prompt: 'How should this reflective letter be summarised instead?', options: [
                { text: 'As an argument, not an event list: \'The mother urges her daughter to pursue her dream with conviction; her own abandoned dance ambition shows that unfulfilled dreams get rechoreographed into new purpose, she warns against shortcuts, and closes by affirming family support\' — claim, evidence, warning, reassurance, reported without \'I felt.\'', outcome: 'This maps the letter\'s logic — the anecdote supports the advice — and keeps the summary objective, which is what epistolary summarising demands.' },
                { text: 'The draft stands — a letter is a small story, so \'first… then… then\' plus a reaction is a fair summary.', outcome: 'A reflective letter is persuasive, not narrative; sequencing its paragraphs like scenes misses that each part serves the advice, and \'I felt inspired\' belongs to a personal response.', reveals: 'letter-is-story' },
                { text: 'Fix it by naming the emotion properly — call the tone \'heartfelt and touching\' since the letter is emotional.', outcome: 'Describing tone is fine, but only objectively — \'encouraging yet realistic\'; adjectives of your own feeling are your response, not her letter.', reveals: 'my-feelings-are-tone' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch8_5', title: 'The bigger picture',
          caseStudy: { intro: 'Summarising a letter means distilling its argument, not its timeline. Report the advice and the evidence for it — and keep \'heartfelt\' and \'I felt inspired\' out; your feelings aren\'t the text.',
            decisions: [{ prompt: 'What comes next? Follow That Dream · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Follow That Dream · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_engl_ch8_1', difficulty: 'standard',
          question: 'A text summary of an epistolary piece condenses the letter\'s core message, the.',
          hint: 'Review "Claim-Evidence-Reasoning" structure from Class 8 science lab reports or Class 8.',
          misconception: 'Students treat the letter as a story with a plot sequence ("First she says X, then she tells a story about Y, then she.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A text summary of an epistolary piece condenses the letter\'s core message, the writer\'s',
                  options: ['A text summary of an epistolary piece condenses the letter\'s core message, the writer\'s', 'Balancing Dreams with Practical Realities is the critical life skill of evaluating', 'Epistolary form is a literary technique where a narrative is presented through a series', 'The theme "Pursuing Dreams with Conviction and Sacrifice" refers to the central idea in'],
                  hint: 'Review "Claim-Evidence-Reasoning" structure from Class 8 science lab reports or Class 8 English.',
                  misconception: 'Students treat the letter as a story with a plot sequence ("First she says X, then she tells a story about Y, then she warns about Z").' }
          ],
            remediations: { 'students-treat-the-letter-as': { steps: ['Give the student a 3-column table: Column A: Paragraph number.', 'Column B: What the mother *says* (paraphrased).', 'Column C: What the paragraph *does* (Function: Opening claim / Personal evidence / Practical warning / Closing.', 'Have them fill it for the letter.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch8_10', difficulty: 'standard',
          question: 'Balancing Dreams with Practical Realities is the critical life skill.',
          hint: 'If stuck, review the "climb" metaphor in c9_engl_ch8_7 and the "realism" value.',
          misconception: 'Students equate "balancing" with "compromising downwards"—they think the mother means "dream smaller." In reality, the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Balancing Dreams with Practical Realities is the critical life skill of evaluating',
                  options: ['Balancing Dreams with Practical Realities is the critical life skill of evaluating', 'A text summary of an epistolary piece condenses the letter\'s core message, the writer\'s', 'Epistolary form is a literary technique where a narrative is presented through a series', 'The theme "Pursuing Dreams with Conviction and Sacrifice" refers to the central idea in'],
                  hint: 'If stuck, review the "climb" metaphor in c9_engl_ch8_7 and the "realism" value in c9_engl_ch8_9.',
                  misconception: 'Students equate "balancing" with "compromising downwards"—they think the mother means "dream smaller." In reality, the letter uses the.' }
          ],
            remediations: { 'students-equate-balancing-with-compromising': { steps: ['Re-read the letter\'s closing paragraph aloud; highlight every verb that denotes *action* (test, carry, hold, wait.', 'Create a two-column table: "My Dream\'s Summit" (unchanged) vs.', '"My Current Gear/Route" (adaptable).', 'For each practical reality listed, brainstorm one "gear" solution from the letter (e.g., reality: no money for coaching.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch8_2', difficulty: 'standard',
          question: 'Epistolary form is a literary technique where a narrative is presented through.',
          hint: 'Review c7_engl_ch05_008 (epistolary form basics) and annotate a personal letter for every.',
          misconception: 'Students think "epistolary" just means "written in first person" or "uses \'I\' and \'you\'." They miss that the *material.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The letter format makes the mother\'s advice more convincing because letters are personal." Improve this analysis by applying the concept.', answer: 'Step 1: Identify the claim',
                  options: ['Step 1: Identify the claim', 'it\'s personal', 'epistolary', 'written in first person'],
                  hint: 'Review c7_engl_ch05_008 (epistolary form basics) and annotate a personal letter for every.',
                  misconception: 'Students think "epistolary" just means "written in first person" or "uses \'I\' and \'you\'." They miss that the *material conventions* — date.' },
                { id: 'b', prompt: 'Compare the epistolary form in "Follow That Dream" (single letter, mother to daughter) with the diary-entry form in *The Diary of Anne Frank*.', answer: 'The mother\'s letter is *relational*',
                  options: ['The mother\'s letter is *relational*', 'both are private', 'epistolary', 'written in first person'],
                  hint: 'Review c7_engl_ch05_008 (epistolary form basics) and annotate a personal letter for every.',
                  misconception: 'Students think "epistolary" just means "written in first person" or "uses \'I\' and \'you\'." They miss that the *material conventions* — date.' }
          ],
            remediations: { 'epistolary-just-means-written-in': { steps: ['Show two versions of the same advice — one as a letter ("My dear daughter, today by your old window..."), one as.', 'Ask: "What does the daughter *gain* in version 1 that she doesn\'t in version 2?" (Direct address, proof of effort.', 'Have student annotate the NCERT letter for *every* convention (date, salutation, "you" count, sign-off.', 'Co-write a one-sentence analysis: "The letter form makes the mother\'s love *tangible* because..."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch8_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "epistolary" just means "written in first person" or "uses \'I\' and \'you\'." They miss that the *material.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The epistolary form in \'Follow That Dream\' limits the narrative because we only get the mother\'s perspective — we never hear the.', answer: 'Challenge',
                  options: ['Challenge', 'epistolary', 'written in first person', 'uses \'I\' and \'you\''],
                  hint: 'Review c7_engl_ch05_008 (epistolary form basics) and annotate a personal letter for every.',
                  misconception: 'Students think "epistolary" just means "written in first person" or "uses \'I\' and \'you\'." They miss that the *material conventions* — date.' },
                { id: 'b', prompt: 'Write a 50-word "letter within a letter" — the daughter\'s reply to her mother, composed *inside the margins* of the original letter, that uses epistolary.', answer: 'A strong reply: "Ma',
                  options: ['A strong reply: "Ma', 'epistolary', 'written in first person', 'uses \'I\' and \'you\''],
                  hint: 'Review c7_engl_ch05_008 (epistolary form basics) and annotate a personal letter for every.',
                  misconception: 'Students think "epistolary" just means "written in first person" or "uses \'I\' and \'you\'." They miss that the *material conventions* — date.' }
          ],
            remediations: { 'epistolary-just-means-written-in': { steps: ['Show two versions of the same advice — one as a letter ("My dear daughter, today by your old window..."), one as.', 'Ask: "What does the daughter *gain* in version 1 that she doesn\'t in version 2?" (Direct address, proof of effort.', 'Have student annotate the NCERT letter for *every* convention (date, salutation, "you" count, sign-off.', 'Co-write a one-sentence analysis: "The letter form makes the mother\'s love *tangible* because..."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch8_3', difficulty: 'standard',
          question: 'The theme "Pursuing Dreams with Conviction and Sacrifice" refers to the central.',
          hint: 'Review the text summary (c9_engl_ch8_1) and re-read the letter focusing on the mother\'s.',
          misconception: 'Students often think "sacrifice" in this theme means only giving up material things (money, sleep) and that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The theme "Pursuing Dreams with Conviction and Sacrifice" refers to the central idea in',
                  options: ['The theme "Pursuing Dreams with Conviction and Sacrifice" refers to the central idea in', 'A text summary of an epistolary piece condenses the letter\'s core message, the writer\'s', 'Balancing Dreams with Practical Realities is the critical life skill of evaluating', 'Epistolary form is a literary technique where a narrative is presented through a series'],
                  hint: 'Review the text summary (c9_engl_ch8_1) and re-read the letter focusing on the mother\'s past.',
                  misconception: 'Students often think "sacrifice" in this theme means only giving up material things (money, sleep) and that "conviction" means never.' }
          ],
            remediations: { 'sacrifice-in-this-theme-means': { steps: ['Re-read the mother\'s anecdote paragraph and highlight every verb phrase showing choice (e.g., "I chose," "I let go," "I.', 'Ask: "Did she lose these things, or did she trade them?" 3.', 'Write two columns: "What she gave up" and "What she gained." 4.', 'Discuss: "Where in the letter does she admit fear or doubt?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch8_4', difficulty: 'standard',
          question: 'The theme of "Effort, Investment and Long-Term Commitment" in this chapter.',
          hint: 'If stuck, review the **Driving Anecdote (Paragraphs 3-4)** and **Career Anecdote.',
          misconception: 'Students often conflate **"Effort"** (a single intense burst of energy) with **"Investment/Long-term Commitment"** (a.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the anecdote about learning to drive illustrates "long-term commitment" rather than just "hard work."', answer: 'The driving anecdote shows long-term commitment',
                  options: ['The driving anecdote shows long-term commitment', 'she worked hard to pass the test'],
                  hint: 'If stuck, review the **Driving Anecdote (Paragraphs 3-4)** and **Career Anecdote (Paragraphs 5-6)**.',
                  misconception: 'Students often conflate **"Effort"** (a single intense burst of energy) with **"Investment/Long-term Commitment"** (a sustained.' }
          ],
            remediations: { 'students-often-conflate-effort-a': { steps: ['**Re-read Paragraphs 3-4 (Driving Anecdote):** Ask the student to draw a *timeline*: Day 1 (Fear) -> Week 2 (Stalling).', 'Force them to label the "Investment Zone" (Weeks 1-8).', '**Vocabulary Swap:** Have them replace "worked hard" with "invested time," "persisted through," "allocated effort to".', '**Contrast Exercise:** Give two micro-stories: "Rohit studied 10 hours the night before" vs "Rohit studied 1 hour daily.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch8_5', difficulty: 'standard',
          question: 'The theme of obstacles and changing life circumstances refers to the central.',
          hint: 'If stuck, review c9_engl_ch8_1 (Text Summary) to re-familiarize with the mother\'s.',
          misconception: 'Students often think "obstacles" in this theme are only *external* events (marriage, money, war) and miss the.',
          parts: [
                { id: 'a', prompt: 'Compare the mother\'s obstacles (marriage, motherhood) with the potential obstacles the daughter might face in becoming a pilot (gender bias, financial cost.', answer: 'The comparison shows that while the *form* of obstacles shifts (domestic duty vs',
                  options: ['The comparison shows that while the *form* of obstacles shifts (domestic duty vs', 'one is home, one is work', 'obstacles'],
                  hint: 'If stuck, review c9_engl_ch8_1 (Text Summary) to re-familiarize with the mother\'s timeline, then.',
                  misconception: 'Students often think "obstacles" in this theme are only *external* events (marriage, money, war) and miss the *internal* obstacles the.' }
          ],
            remediations: { 'obstacles-in-this-theme-are': { steps: ['Re-read the letter marking every phrase where the mother describes a feeling (e.g., "heart ached," "guilt," "quiet.', 'Create a two-column chart: left column = external event, right column = internal response.', 'Discuss: "Which column shows the real obstacle?" 4.', 'Write one paragraph arguing that the mother\'s *internal* struggle was harder than the external one, using two quotes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
