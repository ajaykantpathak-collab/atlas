import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch20_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch20_p3: SimDef = {
    id: 'v3_c11_eng_w_ch20_p3',
    title: 'Ajamil and the Tigers (Poem) · Part 3/3',
    subtitle: 'Read a shepherd\'s treaty with tigers as Emergency-era satire.',
    classLevel: 11, subject: 'eng_w', topic: 'Ajamil and the Tigers (Poem) · Part 3/3',
    chapters: ['c11_eng_w_ch20'],
    nodeIds: ['c11_eng_w_cbse_20_013', 'c11_eng_w_cbse_20_014', 'c11_eng_w_cbse_20_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader watching a leader shake paws with predators', intro: 'The tigers came for the sheep; the shepherd fed them lamb chops and called it diplomacy — and the pond got shared.', goal: 'Distinguish fable from satire and read the treaty as managed, not resolved, conflict.' },
    discovery: {
        question: 'Talking animals, rhyming ease, a shepherd and tigers — a children\'s fable with a tidy moral?',
        options: ['No — the fable form is a set-up: the shepherd collaborates with the tigers, making it a satire of political complicity', 'Yes — animal characters always mean a child\'s moral tale', 'Yes — the ending is a happy treaty, so the moral is trust', 'No — but only because of the leather jackets and swear words'],
        answer: 'No — the fable form is a set-up: the shepherd collaborates with the tigers, making it a satire of political complicity',
        hook: 'The tiger king lies \'we came as friends,\' Ajamil pretends to believe him — and both know the flock pays for the handshake.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves examining a text beyond its literal meaning to evaluate its underlying arguments, assumptions, and implications, using textual evidence to support.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_20_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split fable, allegory and satire in the poem, spot the dramatic irony in the tiger king\'s lie, and judge whether the shared-pond ending resolves or merely manages the conflict.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re reading a political cartoon in a newspaper - the drawing shows animals, but you instantly understand it\'s about politicians and voters.',
            decisions: [{ prompt: 'What is the primary allegorical correspondence in the poem: who or what do the tigers, sheep, sheepdog, and Ajamil represent in the.', options: [
                { text: 'The tigers represent predatory politicians/powerful elites', outcome: 'The tigers represent predatory politicians/powerful elites; the sheep represent the common.' },
                { text: 'tigers are just animals', outcome: 'Not quite — Students often interpret the poem as a simple fable about "clever compromise" or "pragmatic peace,".', reveals: 'students-often-interpret-the-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re sitting in the exam hall and the question reads: "The poem \'Ajamil and the Tigers\' is a satire on political compromise.',
            decisions: [{ prompt: 'What is the primary purpose of using the PEEL structure when writing an analytical answer on a poem?', options: [
                { text: 'The primary purpose of PEEL is to ensure each paragraph contains a clear Point (topic', outcome: 'The primary purpose of PEEL is to ensure each paragraph contains a clear Point (topic sentence).' },
                { text: 'PEEL is for summarizing the poem', outcome: 'Not quite — Students believe that writing a detailed summary of the poem with a few quotes constitutes a good.', reveals: 'writing-a-detailed-summary-of' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a student council meeting discussing a controversial school policy where the administration compromises with a powerful group.',
            decisions: [{ prompt: 'What is the central allegorical meaning of the \'tigers\' and \'sheep\' in Arun Kolatkar\'s poem "Ajamil and the Tigers"?', options: [
                { text: 'The tigers represent predatory political powers or oppressors, while the sheep represent', outcome: 'The tigers represent predatory political powers or oppressors, while the sheep represent the.' },
                { text: 'tigers are just animals', outcome: 'Not quite — Students often think a group discussion on literature is just sharing personal opinions ("I liked.', reveals: 'a-group-discussion-on-literature' },
                { text: 'I liked the poem', outcome: 'Not quite — Students often think a group discussion on literature is just sharing personal opinions ("I liked.', reveals: 'a-group-discussion-on-literature' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school magazine\'s satire issue you submit Kolatkar\'s \'Ajamil and the Tigers\'. The editor returns it: \'Talking animals, treaty over lamb chops — this is a children\'s fable. What\'s it doing in a satire issue?\'',
            decisions: [{ prompt: 'How do you defend the submission?', options: [
                { text: 'Argue that the poem hijacks the fable form to subvert it: written during the Emergency era and drawn from Jejuri, it\'s an allegory where the tiger king is the political class, Ajamil the shepherd is the complicit middle class, and the sheep are the common people. The \'happy ending\' is a corrupt bargain — the shepherd pretends to believe the tigers\' lie and peace is bought with \'gifts of sheep.\' The moral isn\'t a lesson; it\'s a cynical exposé.', outcome: 'The editor sees the weapon under the whimsy: fable surface, allegory underneath — the resolution is exploitation dressed as harmony.' },
                { text: 'Withdraw it — the editor\'s right that animal stories with treaties belong in children\'s pages.', outcome: 'The animal fable surface is the disguise, not the genre: coarse language, treaty politics, and sacrificed sheep mark it as adult satire of a political class.', reveals: 'talking-animals-is-childrens-fable' },
                { text: 'Resubmit it as a poem about wildlife conservation — tigers and sheep learning to share the pond.', outcome: 'The shared pond is a full stomach maintained by exploitation; reading it as harmony repeats Ajamil\'s own self-deception.', reveals: 'treaty-is-happy-ending' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_20_015', title: 'You made it',
          caseStudy: { intro: 'Well-fed tigers, fat sheep, a flute all day — the peace is real only as long as someone keeps paying for it in mutton.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_20_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves examining a text beyond its.',
          hint: 'If stuck, review c11_eng_w_cbse_20_009 (Irony and Symbolism) to practice identifying.',
          misconception: 'Students often interpret the poem as a simple fable about "clever compromise" or "pragmatic peace," praising Ajamil for.',
          parts: [
                { id: 'a', prompt: 'What is the primary allegorical correspondence in the poem: who or what do the tigers, sheep, sheepdog, and Ajamil represent in the political satire?', answer: 'The tigers represent predatory politicians/powerful elites',
                  options: ['The tigers represent predatory politicians/powerful elites', 'tigers are just animals'],
                  hint: 'If stuck, review c11_eng_w_cbse_20_009 (Irony and Symbolism) to practice identifying verbal.',
                  misconception: 'Students often interpret the poem as a simple fable about "clever compromise" or "pragmatic peace," praising Ajamil for avoiding conflict.' }
          ],
            remediations: { 'students-often-interpret-the-poem': { steps: ['Have the student list the tigers\' actions in chronological order (starving → threatening → attacking → captured → lying.', 'Ask: "At which point did the tigers stop being predators?"', 'Connect "have got to eat some time" to the ending\'s "fat sheep" - if tigers must eat, and sheep are the only meat, the.', 'Re-read Ajamil\'s lines with this lens: his "flute playing" is willful ignorance of the feeding schedule he authorized.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_20_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often interpret the poem as a simple fable about "clever compromise" or "pragmatic peace," praising Ajamil for.',
          parts: [
                { id: 'a', prompt: 'Evaluate the poem\'s ending: "well fed tigers and fat sheep drink from the same pond with a full stomach for a common bond." Is this a stable resolution or.', answer: 'It\'s a satirical trap disguised as harmony',
                  options: ['It\'s a satirical trap disguised as harmony', 'happy ending'],
                  hint: 'If stuck, review c11_eng_w_cbse_20_009 (Irony and Symbolism) to practice identifying verbal.',
                  misconception: 'Students often interpret the poem as a simple fable about "clever compromise" or "pragmatic peace," praising Ajamil for avoiding conflict.' }
          ],
            remediations: { 'students-often-interpret-the-poem': { steps: ['Have the student list the tigers\' actions in chronological order (starving → threatening → attacking → captured → lying.', 'Ask: "At which point did the tigers stop being predators?"', 'Connect "have got to eat some time" to the ending\'s "fat sheep" - if tigers must eat, and sheep are the only meat, the.', 'Re-read Ajamil\'s lines with this lens: his "flute playing" is willful ignorance of the feeding schedule he authorized.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_20_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter "Ajamil and the Tigers" refer to the.',
          hint: 'If stuck, review the distinction between fable, allegory, and satire (NCERT "Try This.',
          misconception: 'Students believe that writing a detailed summary of the poem with a few quotes constitutes a good analytical answer.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Ajamil is a clever shepherd because he signs a treaty with the tigers and gets gifts." Why is this an inadequate analytical statement for.', answer: 'The statement is a plot summary, not analysis',
                  options: ['The statement is a plot summary, not analysis', 'It\'s correct because it describes what happens'],
                  hint: 'If stuck, review the distinction between fable, allegory, and satire (NCERT "Try This Out") and.',
                  misconception: 'Students believe that writing a detailed summary of the poem with a few quotes constitutes a good analytical answer.' }
          ],
            remediations: { 'writing-a-detailed-summary-of': { steps: ['Show the student a side-by-side comparison: a 4/10 summary-heavy answer vs a 9/10 analytical answer on the same.', 'Have them highlight the Point, Evidence, Explanation, Link in the strong answer using four colored pens.', 'Give them a new question and ask them to write only the Point and Evidence sentences first; check that the Point is.', 'Gradually build to full PEEL paragraphs, insisting that every Evidence sentence is followed by an Explanation sentence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_20_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, review the allegorical mapping in node c11_eng_w_cbse_20_006 and the irony.',
          misconception: 'Students often think a group discussion on literature is just sharing personal opinions ("I liked the poem").',
          parts: [
                { id: 'a', prompt: 'Compare the roles of the sheepdog and Ajamil in the poem. How does the contrast between them highlight the poem\'s critique of leadership?', answer: 'The sheepdog represents honest, efficient institutions (captures 51 tigers',
                  options: ['The sheepdog represents honest, efficient institutions (captures 51 tigers', 'I liked the poem', 'discussion points', 'summary points'],
                  hint: 'If stuck, review the allegorical mapping in node c11_eng_w_cbse_20_006 and the irony analysis.',
                  misconception: 'Students often think a group discussion on literature is just sharing personal opinions ("I liked the poem").' }
          ],
            remediations: { 'a-group-discussion-on-literature': { steps: ['If a student falls into this misconception, have them practice converting a summary point into an analytical discussion.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
