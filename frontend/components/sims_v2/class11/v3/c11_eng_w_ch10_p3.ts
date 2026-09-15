import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch10_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch10_p3: SimDef = {
    id: 'v3_c11_eng_w_ch10_p3',
    title: 'Let Me Not to the Marriage of True Minds (Poem) · Part 3/3',
    subtitle: 'Read a love poem that behaves like a courtroom brief.',
    classLevel: 11, subject: 'eng_w', topic: 'Let Me Not to the Marriage of True Minds (Poem) · Part 3/3',
    chapters: ['c11_eng_w_ch10'],
    nodeIds: ['c11_eng_w_cbse_10_013', 'c11_eng_w_cbse_10_014', 'c11_eng_w_cbse_10_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a logician cross-examining a sonnet', intro: 'Love that \'bends with the remover to remove\' gets struck from the definition — then the poet dares you to disprove him.', goal: 'Identify the Shakespearean sonnet\'s argumentative structure, volta and closing wager.' },
    discovery: {
        question: '\'If this be error and upon me proved, / I never writ, nor no man ever loved.\' Logical proof of his definition — or a trap?',
        options: ['A rhetorical trap — to refute him you\'d have to prove he never wrote or that nobody ever loved, an impossible burden', 'A watertight logical proof of true love\'s constancy', 'A confession that his definition is probably wrong', 'A legal loophole admitting exceptions'],
        answer: 'A rhetorical trap — to refute him you\'d have to prove he never wrote or that nobody ever loved, an impossible burden',
        hook: 'The sonnet argues like a lawyer — define by negation, turn at \'O no, it is an ever-fixed mark,\' then stake everything on a verdict no one can overturn.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves examining a text\'s structure, language, and techniques to interpret its deeper meaning, evaluate the effectiveness of its arguments, and construct.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_10_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Mark the ABAB CDCD EFEF GG skeleton, find the volta at line 9, and try building your own quatrain that argues by negation.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you are in the exam hall and the question reads: "How does Shakespeare use nautical imagery to define true love in Sonnet 116?" You feel stuck because.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Layout', outcome: 'Not quite — Students believe that "writing about a poem" means summarizing it line by line or listing poetic.', reveals: 'writing-about-a-poem-means' },
                { text: 'writing about a poem', outcome: 'Not quite — Students believe that "writing about a poem" means summarizing it line by line or listing poetic.', reveals: 'writing-about-a-poem-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a college seminar discussing whether Shakespeare\'s definition of love in Sonnet 116 is realistic or idealistic.',
            decisions: [{ prompt: 'What are the three essential components of an effective literary discussion point at senior secondary level?', options: [
                { text: 'An effective literary discussion point requires: (1) a clear interpretive claim about the', outcome: 'An effective literary discussion point requires: (1) a clear interpretive claim about the text, (2).' },
                { text: 'opinions', outcome: 'Not quite — Students believe "discussion" means sharing personal opinions about love ("I think love does.', reveals: 'discussion-means-sharing-personal-opinions' },
                { text: 'feelings', outcome: 'Not quite — Students believe "discussion" means sharing personal opinions about love ("I think love does.', reveals: 'discussion-means-sharing-personal-opinions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For the literature fest you must defend choosing Shakespeare\'s \'Let me not to the marriage of true minds\' for a wedding-reading segment. A judge objects: \'A love poem for a wedding should celebrate feelings changing and growing — this one claims real love never changes. Isn\'t that unrealistic and cold?\'',
            decisions: [{ prompt: 'Is \'love that doesn\'t change\' unrealistic or the poem\'s point?', options: [
                { text: 'It\'s the argument: the sonnet defines true love as the fixed pole — \'an ever-fixed mark\' that is \'not Time\'s fool\'; love that bends when the beloved changes was never love. The impersonal, almost legal register (\'admit impediments\', \'I never writ\') is the claim of a universal law, not coldness — the couplet stakes the poet\'s whole credibility on it.', outcome: 'The sonnet doesn\'t describe cosy feelings; it lays down a test: whatever alters with time or looks isn\'t love at all.' },
                { text: 'The judge is right — pick a warmer poem; unchanging love is a cold ideal nobody lives up to.', outcome: 'That swaps the poem\'s definitional claim for a mood; its power is precisely the extremity — love as the one thing time can\'t corrupt.', reveals: 'constancy-is-cold' },
                { text: 'It\'s actually about physical attraction lasting forever — love means never finding faults.', outcome: 'The poem explicitly excludes the changeable and the physical (\'rosy lips and cheeks\' yield to Time); it praises constancy of the bond, not frozen beauty.', reveals: 'love-means-never-aging' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_015', title: 'You made it',
          caseStudy: { intro: 'Three quatrains to build the case, one couplet to slam the door — the sonnet\'s shape is the argument.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_10_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves examining a text\'s structure.',
          hint: 'Review the sonnet structure (quatrain/couplet) and the definition of metaphor from.',
          misconception: 'Students often treat the poem as a simple romantic declaration ("Shakespeare says love lasts forever") and miss its.',
          parts: [
                { id: 'a', prompt: 'In the line "It is the star to every wandering bark," identify the two things being compared and explain what quality of the star makes it an apt metaphor for.', answer: 'The star (fixed, constant, reliable guide) is compared to true love',
                  options: ['The star (fixed, constant, reliable guide) is compared to true love', 'tempests'],
                  hint: 'Review the sonnet structure (quatrain/couplet) and the definition of metaphor from.',
                  misconception: 'Students often treat the poem as a simple romantic declaration ("Shakespeare says love lasts forever") and miss its *argumentative.' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['Have the student rewrite the first quatrain as a formal logical syllogism: "Premise 1: True love admits no impediments.', 'Premise 2: Altering love admits impediments.', 'Conclusion: Altering love is not true love." 2.', 'Ask them to circle every negative word (not, never, no, nor) and write the positive assertion each one denies.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_10_014', difficulty: 'standard',
          question: 'Writing Skills: Based on the Chapter refers to the ability to compose.',
          hint: 'Review the PEEL method from c8_engl_ch1_17 and practice embedding quotations from the.',
          misconception: 'Students believe that "writing about a poem" means summarizing it line by line or listing poetic devices (alliteration.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Layout', 'writing about a poem'],
                  hint: 'Review the PEEL method from c8_engl_ch1_17 and practice embedding quotations from the poem\'s.',
                  misconception: 'Students believe that "writing about a poem" means summarizing it line by line or listing poetic devices (alliteration, metaphor) without.' },
                { id: 'b', prompt: 'Improve this weak answer using PEEL: "Shakespeare says love is not time\'s fool. He means love doesn\'t change when time passes. The sickle is time\'s tool.', answer: 'Improved answer: Point',
                  options: ['Improved answer: Point', 'writing about a poem'],
                  hint: 'Review the PEEL method from c8_engl_ch1_17 and practice embedding quotations from the poem\'s.',
                  misconception: 'Students believe that "writing about a poem" means summarizing it line by line or listing poetic devices (alliteration, metaphor) without.' },
                { id: 'c', prompt: 'Compare these two responses to "Explain the phrase \'his bending sickle\'s compass\'." Response A: "It means Time\'s curved blade reaches everyone." Response.', answer: 'Response B is superior',
                  options: ['Response B is superior', 'writing about a poem'],
                  hint: 'Review the PEEL method from c8_engl_ch1_17 and practice embedding quotations from the poem\'s.',
                  misconception: 'Students believe that "writing about a poem" means summarizing it line by line or listing poetic devices (alliteration, metaphor) without.' }
          ],
            remediations: { 'writing-about-a-poem-means': { steps: ['Have the student highlight every device they spot in a stanza.', 'For each, ask: "What word does this device emphasize?', 'What idea does that word carry?" 3.', 'Model turning one device into a full Explanation sentence: "The alliteration on \'alter/alteration\' creates a sonic echo.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_10_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "writing about a poem" means summarizing it line by line or listing poetic devices (alliteration.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The couplet \'If this be error and upon me proved, / I never writ, nor no man ever loved\' is just Shakespeare boasting." Evaluate this.', answer: 'The interpretation is reductive and invalid',
                  options: ['The interpretation is reductive and invalid', 'writing about a poem'],
                  hint: 'Review the PEEL method from c8_engl_ch1_17 and practice embedding quotations from the poem\'s.',
                  misconception: 'Students believe that "writing about a poem" means summarizing it line by line or listing poetic devices (alliteration, metaphor) without.' },
                { id: 'b', prompt: 'Write a new PEEL paragraph (4-5 sentences) answering: "How does the sonnet\'s structure (three quatrains + couplet) reinforce its argument about love\'s.', answer: 'A strong answer: Point',
                  options: ['A strong answer: Point', 'writing about a poem'],
                  hint: 'Review the PEEL method from c8_engl_ch1_17 and practice embedding quotations from the poem\'s.',
                  misconception: 'Students believe that "writing about a poem" means summarizing it line by line or listing poetic devices (alliteration, metaphor) without.' }
          ],
            remediations: { 'writing-about-a-poem-means': { steps: ['Have the student highlight every device they spot in a stanza.', 'For each, ask: "What word does this device emphasize?', 'What idea does that word carry?" 3.', 'Model turning one device into a full Explanation sentence: "The alliteration on \'alter/alteration\' creates a sonic echo.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_10_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to structured oral activities.',
          hint: 'Review c11_eng_w_cbse_10_013 (Critical Thinking) for PEEL structure and.',
          misconception: 'Students believe "discussion" means sharing personal opinions about love ("I think love does change") rather than.',
          parts: [
                { id: 'a', prompt: 'Explain why the statement "Shakespeare says love never changes" is an insufficient discussion point for Sonnet 116, and rewrite it as a stronger analytical.', answer: 'The statement is insufficient',
                  options: ['The statement is insufficient', 'discussion', 'I think love does change', 'love does change") rather than analyzing Shakespeare\'s argument'],
                  hint: 'Review c11_eng_w_cbse_10_013 (Critical Thinking) for PEEL structure and c11_eng_w_cbse_10_008.',
                  misconception: 'Students believe "discussion" means sharing personal opinions about love ("I think love does change") rather than analyzing Shakespeare\'s.' },
                { id: 'b', prompt: 'Compare two interpretations of the final couplet (lines 13-14): (A) "Shakespeare stakes his reputation as a poet on this definition—if he\'s wrong, his writing.', answer: 'Interpretation A better fits the structure',
                  options: ['Interpretation A better fits the structure', 'discussion', 'I think love does change', 'love does change") rather than analyzing Shakespeare\'s argument'],
                  hint: 'Review c11_eng_w_cbse_10_013 (Critical Thinking) for PEEL structure and c11_eng_w_cbse_10_008.',
                  misconception: 'Students believe "discussion" means sharing personal opinions about love ("I think love does change") rather than analyzing Shakespeare\'s.' }
          ],
            remediations: { 'discussion-means-sharing-personal-opinions': { steps: ['If a student offers personal opinion instead of textual analysis: 1.', 'Acknowledge: "That\'s a real-life perspective." 2.', 'Redirect: "Let\'s see how Shakespeare addresses that in line 11: \'Love alters not with his brief hours and weeks.\' What.', 'Model: "So a discussion point could be: \'Does limiting alteration to \'brief hours and weeks\' make Shakespeare\'s claim.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
