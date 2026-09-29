import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch14_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch14_p3: SimDef = {
    id: 'v3_c11_eng_w_ch14_p3',
    title: 'Mother Tongue (Poem) · Part 3/3',
    subtitle: 'Watch a request for a pen become a language\'s fight for its script.',
    classLevel: 11, subject: 'eng_w', topic: 'Mother Tongue (Poem) · Part 3/3',
    chapters: ['c11_eng_w_ch14'],
    nodeIds: ['c11_eng_w_cbse_14_013', 'c11_eng_w_cbse_14_014', 'c11_eng_w_cbse_14_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a petitioner negotiating with a reed for a quill', intro: '\'Give me a quill, quickly — she must be looking for me.\' The urgency is a whole language demanding to be written down.', goal: 'Read the poem\'s request-and-response structure as an allegory of script deprivation.' },
    discovery: {
        question: 'A poet begs a reed for a quill, and the reed cuts off its own hand to give one. What is the poem actually asking for?',
        options: ['A script — the quill is Dogri\'s lost written form, and the reed\'s severed hand is the cost of a language claiming it', 'A pen — the poet simply needs to write a poem', 'Ink — the reed produces writing fluid', 'Inspiration — the reed is a muse figure'],
        answer: 'A script — the quill is Dogri\'s lost written form, and the reed\'s severed hand is the cost of a language claiming it',
        hook: 'She serves \'a Shahni, not a Shah\' — the climax isn\'t the gift of the quill but the naming of who it\'s for: her mother tongue.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Mother Tongue\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_14_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map the six stanzas onto the dramatic arc, place the climax at the revelation of Dogri, and weigh what translation keeps and loses.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Mother Tongue\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What does the quill symbolize in the poem "Mother Tongue"?', options: [
                { text: 'The quill symbolizes the script (specifically the Sharade script) needed to write the', outcome: 'The quill symbolizes the script (specifically the Sharade script) needed to write the mother tongue.' },
                { text: 'a feather', outcome: 'Not quite — Students often think the reed\'s "hand" is literally a hand, missing that it\'s a reed stem cut.', reveals: 'the-reed-s-hand-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Mother Tongue\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What does the "quill" symbolise in the poem "Mother Tongue"?', options: [
                { text: 'The quill symbolises the script (specifically the Sharade script) through', outcome: 'The quill symbolises the script (specifically the Sharade script) through which the mother tongue.' },
                { text: 'writing tool', outcome: 'Not quite — Students treat the poem as a simple "love letter to my language" and write generic emotional.', reveals: 'students-treat-the-poem-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Mother Tongue\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What is the primary purpose of a structured literary discussion in Class 11 English, as distinct from casual conversation about a poem?', options: [
                { text: 'The primary purpose is to collaboratively construct deeper analytical understanding', outcome: 'The primary purpose is to collaboratively construct deeper analytical understanding through.' },
                { text: 'to share feelings about the poem', outcome: 'Not quite — Students believe a literary discussion is successful if everyone speaks once and agrees on.', reveals: 'a-literary-discussion-is-successful' },
                { text: 'message', outcome: 'Not quite — Students believe a literary discussion is successful if everyone speaks once and agrees on.', reveals: 'a-literary-discussion-is-successful' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your linguistics club is preparing a stall on endangered scripts. A junior suggests Padma Sachdev\'s Dogri poem about the reed but summarises it as \'a poet asks a plant for a pen so she can write.\' You know the stakes are bigger than stationery.',
            decisions: [{ prompt: 'What\'s the right interpretation to put on the stall poster?', options: [
                { text: 'Frame it as a language claiming its right to be written: Dogri lost its own script (Sharade) and survives in borrowed scripts, so the reed\'s violent generosity — cutting off its own hand to become the poet\'s quill — allegorises what a script-less language demands. The climax isn\'t the gift of the pen but the revelation \'That Shahni is my mother tongue / Dogri.\'', outcome: 'The poster now explains the allegory: the quill is the script itself, and the reed\'s sacrifice mirrors a community adapting to keep its language alive.' },
                { text: 'Keep the junior\'s summary — it\'s a charming request for a pen, which suits a stationery-themed corner of the stall.', outcome: 'The literal reading erases the poem\'s subject: a whole language\'s deprivation, not one poet\'s need for a writing tool.', reveals: 'literally-about-a-pen' },
                { text: 'Present it as an environmental poem — the reed is harmed, so it\'s about plants suffering for human art.', outcome: 'The reed offers itself willingly; the wound serves the allegory of a mother tongue demanding written form, not a conservation message.', reveals: 'reed-poem-is-environmental' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_14_015', title: 'You made it',
          caseStudy: { intro: 'The reed refuses until it hears the mistress\'s name — a language without a script is a servant asking to be written.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_14_013', difficulty: 'standard',
          question: 'Critical thinking on \'Mother Tongue\' — analysing the text to reach.',
          hint: 'Review the PEEL method (Point, Evidence, Explanation, Link) and practice identifying.',
          misconception: 'Students often think the reed\'s "hand" is literally a hand, missing that it\'s a reed stem cut to make a quill.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking on \'Mother Tongue\'',
                  options: ['Critical thinking on \'Mother Tongue\'', '\'Mother Tongue\' (Woven Words, ch', 'The plot/narrative arc of \'Mother Tongue\'', 'The setting of \'Mother Tongue\''],
                  hint: 'Review the PEEL method (Point, Evidence, Explanation, Link) and practice identifying symbols in.',
                  misconception: 'Students often think the reed\'s "hand" is literally a hand, missing that it\'s a reed stem cut to make a quill, symbolizing the script\'s.' }
          ],
            remediations: { 'the-reed-s-hand-is': { steps: ['If a student makes this error, first ask them to draw the reed and label its parts (stem, quill).', 'Then, have them list what the Shah does (writes accounts) vs.', 'what the Shahni does (commands servants).', 'Finally, guide them to reread the reed\'s final line ("I too am her servant") and connect "cut off its hand" to the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_14_014', difficulty: 'standard',
          question: 'Writing skills from \'Mother Tongue\' — using the text as a model or springboard.',
          hint: 'If stuck, review the "About the Poet" note in the textbook and the analysis in node.',
          misconception: 'Students treat the poem as a simple "love letter to my language" and write generic emotional responses ("the poet loves.',
          parts: [
                { id: 'a', prompt: 'What does the "quill" symbolise in the poem "Mother Tongue"?', answer: 'The quill symbolises the script (specifically the Sharade script) through',
                  options: ['The quill symbolises the script (specifically the Sharade script) through', 'writing tool'],
                  hint: 'If stuck, review the "About the Poet" note in the textbook and the analysis in node.',
                  misconception: 'Students treat the poem as a simple "love letter to my language" and write generic emotional responses ("the poet loves Dogri very much").' }
          ],
            remediations: { 'students-treat-the-poem-as': { steps: ['Re-read the "About the Poet" note in the textbook — it explicitly states the poem "bemoans the deprivation of Dogri.', 'Map each character: Shahni = Dogri (language), Reed = Sharade (script), Quill = writing instrument cut from the script.', 'Rewrite one PEEL paragraph using only this allegorical map, not emotional language.', 'Compare with your earlier answer — circle every sentence that described feelings without textual evidence; replace each.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_14_015', difficulty: 'standard',
          question: 'Discussion points on \'Mother Tongue\' — speaking and listening around the text.',
          hint: 'If stuck, review the personification of the reed and the Shahni in c11_eng_w_cbse_14_009.',
          misconception: 'Students believe a literary discussion is successful if everyone speaks once and agrees on a "message." In reality.',
          parts: [
                { id: 'a', prompt: 'In "Mother Tongue," the poet says the reed "cut off its hand / Gave it to me." A student claims this is just a metaphor for breaking a reed to make a pen.', answer: 'The interpretation is incomplete',
                  options: ['The interpretation is incomplete', 'message'],
                  hint: 'If stuck, review the personification of the reed and the Shahni in c11_eng_w_cbse_14_009.',
                  misconception: 'Students believe a literary discussion is successful if everyone speaks once and agrees on a "message." In reality, senior secondary.' }
          ],
            remediations: { 'a-literary-discussion-is-successful': { steps: ['If a student falls into this misconception, assign a 3-minute "devil\'s advocate" exercise: after their group reaches.', 'Debrief by highlighting how the counter-argument revealed a nuance (e.g., the reed\'s irritation as both protective and.', 'Then have the group rewrite their collective summary to include this tension.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_14_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe a literary discussion is successful if everyone speaks once and agrees on a "message." In reality.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The poem is only about the loss of the Sharade script; the personal dialogue with the reed is just a narrative frame." Defend or refute.', answer: 'Refute',
                  options: ['Refute', 'message'],
                  hint: 'If stuck, review the personification of the reed and the Shahni in c11_eng_w_cbse_14_009.',
                  misconception: 'Students believe a literary discussion is successful if everyone speaks once and agrees on a "message." In reality, senior secondary.' },
                { id: 'b', prompt: 'Create a 30-second opening statement for a group discussion on "Mother Tongue" that hooks listeners, states a clear analytical thesis, and invites response.', answer: 'A strong opening: "The reed doesn\'t just give a quill',
                  options: ['A strong opening: "The reed doesn\'t just give a quill', 'message'],
                  hint: 'If stuck, review the personification of the reed and the Shahni in c11_eng_w_cbse_14_009.',
                  misconception: 'Students believe a literary discussion is successful if everyone speaks once and agrees on a "message." In reality, senior secondary.' }
          ],
            remediations: { 'a-literary-discussion-is-successful': { steps: ['If a student falls into this misconception, assign a 3-minute "devil\'s advocate" exercise: after their group reaches.', 'Debrief by highlighting how the counter-argument revealed a nuance (e.g., the reed\'s irritation as both protective and.', 'Then have the group rewrite their collective summary to include this tension.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
