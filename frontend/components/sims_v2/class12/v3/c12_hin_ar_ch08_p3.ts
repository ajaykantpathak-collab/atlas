import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch08_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch08_p3',
    title: 'mek\'kadj tks\'kh · Part 3/3',
    subtitle: 'The village finally spoke — in its own voice',
    classLevel: 12, subject: 'hin_ar', topic: 'mek\'kadj tks\'kh · Part 3/3',
    chapters: ['c12_hin_ar_ch08'],
    nodeIds: ['c12_hin_ar_cbse_08_013', 'c12_hin_ar_cbse_08_014', 'c12_hin_ar_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Regional-language poetry reader', intro: 'A freedom fighter from Araria refused to translate the village for the city. The dialect is the poem\'s argument.', goal: 'Read Renu\'s poem through lok-bhasha politics, body-as-knowing and post-Quit India longing.' },
    discovery: {
        question: 'Premchand wrote about villages in standard Hindi; Renu wrote from inside the village in its own folk speech. Why is the difference more than style?',
        options: ['Epistemic resistance — letting the village speak in its own tongue refuses the outsider-reformer\'s gaze and declares whose language counts as literature', 'Renu couldn\'t write proper Hindi', 'Dialect is just local colour', 'No real difference'],
        answer: 'Epistemic resistance — letting the village speak in its own tongue refuses the outsider-reformer\'s gaze and declares whose language counts as literature',
        hook: 'Renu\'s philosophy erased the body-mind split — mud on knees IS knowing the world. A Quit India prisoner writing children\'s free play isn\'t just nostalgic: that village is the autonomous world he fought for, reclaimed in folk speech.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the disciplined process of examining a text\'s explicit and implicit meanings by evaluating evidence, identifying underlying assumptions, recognizing patterns.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_08_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Hear a poem in lok-bhasha: weigh dialect as political choice, read bodily play as a way of knowing, and connect a freedom fighter\'s childhood to the freedom he couldn\'t finish.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re handed a poem in an exam that mixes three dialects, uses a rare four-stanza meter, and describes children eating mud and catching fireflies.',
            decisions: [{ prompt: 'What is the *chappay* (छप्पय) meter\'s defining structural feature, and how many stanzas does the prescribed poem contain?', options: [
                { text: 'The *chappay* meter consists of four stanzas (चरण) where the first three stanzas have a', outcome: 'The *chappay* meter consists of four stanzas (चरण) where the first three stanzas have a *dhruv*.' },
                { text: 'six stanzas', outcome: 'Not quite — Students conflate *identifying* dialect words with *analyzing* their function.', reveals: 'students-conflate-identifying-dialect-words' },
                { text: 'no refrain structure', outcome: 'Not quite — Students conflate *identifying* dialect words with *analyzing* their function.', reveals: 'students-conflate-identifying-dialect-words' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you sit in the exam hall, read the question "How does Nagarjun contrast the world of the bud with the world of the child?" and your mind goes blank.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for literature?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students believe "writing skills" means "using big words and long sentences." They write flowery.', reveals: 'writing-skills-means-using-big' },
                { text: 'writing skills', outcome: 'Not quite — Students believe "writing skills" means "using big words and long sentences." They write flowery.', reveals: 'writing-skills-means-using-big' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend selected for a national poetry fest wants to strip the dialect words from her village poems — \'real Hindi shouldn\'t smell of fields.\' The poems\' best lines are built from exactly those folk words and her grandmother\'s sayings.',
            decisions: [{ prompt: 'What does Renu\'s poem with the vine refrain say to her plan?', options: [
                { text: 'Keep the dialect — the poem builds from village scenes to the claim that script clings to language and language to life like a vine to a tree; cutting the folk idiom severs the very root the refrain keeps reaffirming.', outcome: 'The refrain isn\'t decoration: each stanza\'s memory ends by clinging back to the soil, so her \'impure\' words are the structural backbone of what makes the poems live.' },
                { text: 'Support the polish — standard literary Hindi is the tree; dialect is a creeper that needs pruning to grow upward.', outcome: 'The poem reverses that hierarchy — the vine survives because it clings; dialect isn\'t a parasite on standard language but the living connection that keeps the whole organism fed.', reveals: 'standard-above-dialect' },
                { text: 'Suggest writing two versions: a dialect draft for home and a cleaned-up one for the fest.', outcome: 'The poem\'s fourth stanza universalises the personal — the folk voice is the argument, not a first draft to be translated away; the split treats rootedness as a private habit to hide in public.', reveals: 'dialect-is-private-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_015', title: 'You made it',
          caseStudy: { intro: 'You can now hear regional speech as literature\'s politics — and read a child\'s muddy play as reclaimed freedom.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the disciplined process of examining.',
          hint: 'If stuck on dialect-function analysis, revisit the "Language as Epistemology" mini-lesson.',
          misconception: 'Students conflate *identifying* dialect words with *analyzing* their function.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking in literary analysis is the disciplined process of examining a text\'s',
                  options: ['Critical thinking in literary analysis is the disciplined process of examining a text\'s', '"Before You Read: Context and Background" for Chapter 8 provides the essential', 'Plot and Narrative Structure in a narrative poem refers to the sequence of events,', 'Setting and Atmosphere refers to the time, place, physical environment, and'],
                  hint: 'If stuck on dialect-function analysis, revisit the "Language as Epistemology" mini-lesson.',
                  misconception: 'Students conflate *identifying* dialect words with *analyzing* their function.' }
          ],
            remediations: { 'students-conflate-identifying-dialect-words': { steps: ['Have the student re-read stanza 1 aloud, clapping the *chappay* beat (ta-DUM ta-DUM ta-DUM ta-DUM / ta-DUM ta-DUM).', 'Give a two-column worksheet: Column A = dialect word/phrase, Column B = "What knowledge system does this word belong.', 'Ask: "If you replaced every dialect word with standard Hindi synonyms, what would be lost?" Guide them to see that.', 'Re-attempt Diagnostic Question 2 with this scaffold. If still stuck, revisit c11_hin_ar_cbse_08_013 (Class 11 Critical.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_014', difficulty: 'standard',
          question: 'Writing skills based on a chapter refer to the ability to compose structured.',
          hint: 'If stuck, revisit c12_hin_ar_cbse_08_013 (Critical Thinking) — specifically the worked.',
          misconception: 'Students believe "writing skills" means "using big words and long sentences." They write flowery introductions ("Since.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for literature?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Line', 'writing skills', 'using big words and long sentences'],
                  hint: 'If stuck, revisit c12_hin_ar_cbse_08_013 (Critical Thinking) — specifically the worked example.',
                  misconception: 'Students believe "writing skills" means "using big words and long sentences." They write flowery introductions ("Since time immemorial.' }
          ],
            remediations: { 'writing-skills-means-using-big': { steps: ['If a student cannot produce a PEEL paragraph, do NOT ask them to "write more." Instead: (1) Give them a completed PEEL.', '(2) Have them verbally answer a question while you scribe, then together label each utterance.', '(3) Assign a "PEEL skeleton" exercise: provide the Point and Evidence, they write only Explanation and Link.', 'Re-diagnose with Diagnostic Question 3 after 2 days.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills" means "using big words and long sentences." They write flowery introductions ("Since.',
          parts: [
                { id: 'a', prompt: 'A student argues: "The last stanza (LoPNan) breaks the rhyme scheme because the poet got tired of rhyming." Evaluate this interpretation using evidence from.', answer: 'The interpretation is weak',
                  options: ['The interpretation is weak', 'writing skills', 'using big words and long sentences', 'Since time immemorial, poets have'],
                  hint: 'If stuck, revisit c12_hin_ar_cbse_08_013 (Critical Thinking) — specifically the worked example.',
                  misconception: 'Students believe "writing skills" means "using big words and long sentences." They write flowery introductions ("Since time immemorial.' }
          ],
            remediations: { 'writing-skills-means-using-big': { steps: ['If a student cannot produce a PEEL paragraph, do NOT ask them to "write more." Instead: (1) Give them a completed PEEL.', '(2) Have them verbally answer a question while you scribe, then together label each utterance.', '(3) Assign a "PEEL skeleton" exercise: provide the Point and Evidence, they write only Explanation and Link.', 'Re-diagnose with Diagnostic Question 3 after 2 days.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'यदि रूपक विश्लेषण में अटके: **c12_hin_ar_cbse_08_009** पर लौटें — व्यंग्य और प्रतीकवाद की.',
          misconception: 'छात्र समझते हैं कि \'चर्चा बिंदु\' (Discussion Points) का अर्थ है **अपनी राय देना** — "मुझे लगता है परीक्षा बुरी है".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points refers to the structured oral communication',
                  options: ['Speaking and Listening: Discussion Points refers to the structured oral communication', '"Before You Read: Context and Background" for Chapter 8 provides the essential', 'Plot and Narrative Structure in a narrative poem refers to the sequence of events,', 'Setting and Atmosphere refers to the time, place, physical environment, and'],
                  hint: 'यदि रूपक विश्लेषण में अटके: **c12_hin_ar_cbse_08_009** पर लौटें — व्यंग्य और प्रतीकवाद की लिखित.',
                  misconception: 'छात्र समझते हैं कि \'चर्चा बिंदु\' (Discussion Points) का अर्थ है **अपनी राय देना** — "मुझे लगता है परीक्षा बुरी है", "गाँव का जीवन अच्छा.' }
          ],
            remediations: { 'discussion-points': { steps: ['**चरण 1:** छात्र को कविता के **तीन केंद्रीय रूपक** (झक्कड़/पेड़, कंकड़, उदार गृह) की सूची बनाने को कहें — प्रत्येक के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
