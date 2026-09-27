import type { SimDef } from '../../engine/types';

/** v3 generated — c11_engl_ch86 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_engl_ch86: SimDef = {
    id: 'v3_c11_engl_ch86',
    title: 'A speech script follows a listener-contract:.',
    subtitle: 'This node covers the speech format and spoken register. Debates with formal propositions.',
    classLevel: 11, subject: 'engl', topic: 'A speech script follows a listener-contract:.',
    chapters: ['c11_engl_ch86'],
    nodeIds: ['c11_engl_cbse_86_001', 'c11_engl_cbse_86_002', 'c11_engl_cbse_86_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '1. Open on the contract: \'Respected Principal, teachers, and my dear friends\' — the audience is named before.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'A speech script follows a.', text: 'A speech script follows a listener-contract: a greeting that names the audience, a hook (often a question), a body built from short speakable sentences with address markers (\'my friends\', \'let us\'.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_engl_cbse_86_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_engl_cbse_86_003', title: 'A Class 11 event report follows the.',
          caseStudy: { intro: '1. Stack the format: headline → byline → place/date line → lead → body → quote. 2.',
            decisions: [{ prompt: 'Order a report\'s elements: body details, headline, lead (4W), byline, quote.', options: [
                { text: 'Headline → byline → lead (What-When-Where-Who) → body details → quote', outcome: 'Headline → byline → lead (What-When-Where-Who) → body details → quote.' },
                { text: 'the report\'s job is recounting their experience', outcome: 'Not quite — Students think the report\'s job is recounting their experience — \'I attended, I loved\'.', reveals: 'the-report-s-job-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_engl_cbse_86_003', title: 'You made it',
          caseStudy: { intro: 'You finished A speech script follows a listener-contract:. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_engl_cbse_86_001', difficulty: 'standard',
          question: 'A speech script follows a listener-contract: a greeting that names the.',
          hint: 'Work step by step.',
          misconception: 'Students write speeches as essays that happen to be read aloud — dense paragraphs, no audience.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A speech script follows a listener-contract: a greeting that names the audience, a hook',
                  options: ['A speech script follows a listener-contract: a greeting that names the audience, a hook', 'An article is a magazine/newspaper genre between report and essay: it carries a catchy', 'A Class 11 event report follows the inverted pyramid inside a fixed stack: headline,'],
                  hint: 'Recall the definition.',
                  misconception: 'Students write speeches as essays that happen to be read aloud — dense paragraphs, no audience.' }
          ],
            remediations: { 'students-write-speeches-as-essays': { steps: ['Re-add the audience: greeting at the top, a question hook, an address marker every paragraph or two, and a closing call.', 'Then read each sentence aloud — if it can\'t be said in one breath, split it.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_engl_cbse_86_002', difficulty: 'standard',
          question: 'An article is a magazine/newspaper genre between report and essay: it carries.',
          hint: 'Work step by step.',
          misconception: 'Students hear \'articles may have voice\' and overcorrect into chat — slang, \'literally\', \'fr\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An article is a magazine/newspaper genre between report and essay: it carries a catchy',
                  options: ['An article is a magazine/newspaper genre between report and essay: it carries a catchy', 'A speech script follows a listener-contract: a greeting that names the audience, a hook', 'A Class 11 event report follows the inverted pyramid inside a fixed stack: headline,'],
                  hint: 'Recall the definition.',
                  misconception: 'Students hear \'articles may have voice\' and overcorrect into chat — slang, \'literally\', \'fr\'.' }
          ],
            remediations: { 'students-hear-articles-may-have': { steps: ['Check the middle lane: title + byline present?', 'Body sentences are yours but still publishable?', 'Strip netspeak, keep the angle.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_engl_cbse_86_003', difficulty: 'standard',
          question: 'A Class 11 event report follows the inverted pyramid inside a fixed stack.',
          hint: 'Work step by step.',
          misconception: 'Students think the report\'s job is recounting their experience — \'I attended, I loved\'.',
          parts: [
                { id: 'a', prompt: 'Order a report\'s elements: body details, headline, lead (4W), byline, quote.', answer: 'Headline → byline → lead (What-When-Where-Who) → body details → quote',
                  options: ['Headline → byline → lead (What-When-Where-Who) → body details → quote', 'the report\'s job is recounting their experience'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think the report\'s job is recounting their experience — \'I attended, I loved\'.' },
                { id: 'b', prompt: 'Where does \'said the Principal\' attach, and why does the attribution matter?', answer: 'After the quoted remark',
                  options: ['After the quoted remark', 'the report\'s job is recounting their experience'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think the report\'s job is recounting their experience — \'I attended, I loved\'.' },
                { id: 'c', prompt: 'Fix for a report: \'I was thrilled to see the amazing projects!!!\'', answer: '\'The projects drew an enthusiastic response from students and parents.\'',
                  options: ['\'The projects drew an enthusiastic response from students and parents.\'', 'the report\'s job is recounting their experience'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think the report\'s job is recounting their experience — \'I attended, I loved\'.' },
                { id: 'd', prompt: 'The lead alone must do what?', answer: 'Let a reader leave informed',
                  options: ['Let a reader leave informed', 'the report\'s job is recounting their experience'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think the report\'s job is recounting their experience — \'I attended, I loved\'.' }
          ],
            remediations: { 'the-report-s-job-is': { steps: ['Re-stack: headline, byline, place/date, 4W lead, details, attributed quote.', 'Then search for \'I\' and exclamations and replace them with objective past-tense statements.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_engl_cbse_86_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think the report\'s job is recounting their experience — \'I attended, I loved\'.',
          parts: [
                { id: 'a', prompt: 'Fill in the blank: An event report for the school magazine: headline → byline → ______ → lead → details → quote.', answer: 'place/date line',
                  options: ['place/date line', 'the report\'s job is recounting their experience'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think the report\'s job is recounting their experience — \'I attended, I loved\'.' }
          ],
            remediations: { 'the-report-s-job-is': { steps: ['Re-stack: headline, byline, place/date, 4W lead, details, attributed quote.', 'Then search for \'I\' and exclamations and replace them with objective past-tense statements.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
