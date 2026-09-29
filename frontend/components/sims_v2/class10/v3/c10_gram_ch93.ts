import type { SimDef } from '../../engine/types';

/** v3 generated — c10_gram_ch93 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_gram_ch93: SimDef = {
    id: 'v3_c10_gram_ch93',
    title: 'Reporting speech moves every tense one step.',
    subtitle: 'Covers the mechanical backshift table and deictic changes for all three sentence types.',
    classLevel: 10, subject: 'gram', topic: 'Reporting speech moves every tense one step.',
    chapters: ['c10_gram_ch93'],
    nodeIds: ['c10_gram_cbse_93_001', 'c10_gram_cbse_93_002', 'c10_gram_cbse_93_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'Build the machine visibly: Direct \'I am tired today\' → Reported \'She said (that) she was tired that day.\'.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Reporting speech moves every tense one.', text: 'Reporting speech moves every tense one step back: present→past, past→past perfect, will→would, can→could, am/is→was, have→had.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c10_gram_cbse_93_002', title: 'Identify each idea',
          dissect: { specimen: 'Reporting speech moves every tense one step.', spots: [
            { id: 's1', label: 'Reporting speech moves every tense', prompt: 'Which idea is this? — Reporting speech moves every tense one step back: present→past, past→past perfect.', answer: 'Reporting speech moves every tense', options: ['Reporting speech moves every tense', 'Reported questions lose their question', 'Commands and requests report with'] },
            { id: 's2', label: 'Reported questions lose their question', prompt: 'Which idea is this? — Reported questions lose their question grammar: no question mark, no do/does/did, and.', answer: 'Reported questions lose their question', options: ['Reported questions lose their question', 'Reporting speech moves every tense', 'Commands and requests report with'] },
            { id: 's3', label: 'Commands and requests report with', prompt: 'Which idea is this? — Commands and requests report with \'told/ordered/requested/asked + object.', answer: 'Commands and requests report with', options: ['Commands and requests report with', 'Reporting speech moves every tense', 'Reported questions lose their question'] }
          ] } },
        { type: 'build', nodeId: 'c10_gram_cbse_93_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Backshift every tense one step (unless universal truth).', 'Swap deictics — now→then, today→that day, here→there.', 'Re-anchor pronouns to the reporter\'s view.', 'Identify speaker, listener, content.'], answer: 'Identify speaker, listener, content. Re-anchor pronouns to the reporter\'s view. Backshift every tense one step (unless universal truth). Swap deictics — now→then, today→that day, here→there.' } },
        { type: 'case', nodeId: 'c10_gram_cbse_93_003', title: 'You made it',
          caseStudy: { intro: 'You finished Reporting speech moves every tense one step. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c10_gram_cbse_93_001', difficulty: 'standard',
          question: 'Reporting speech moves every tense one step back: present→past, past→past.',
          hint: 'Work step by step.',
          misconception: 'Students backshift the verb but forget pronouns and time words (\'He said he is tired today\'), or over-shift when the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Reporting speech moves every tense one step back: present→past, past→past perfect,',
                  options: ['Reporting speech moves every tense one step back: present→past, past→past perfect,', 'Reported questions lose their question grammar: no question mark, no do/does/did, and', 'Commands and requests report with \'told/ordered/requested/asked + object +'],
                  hint: 'Recall the definition.',
                  misconception: 'Students backshift the verb but forget pronouns and time words (\'He said he is tired today\'), or over-shift when the fact is still true.' }
          ],
            remediations: { 'students-backshift-the-verb-but': { steps: ['Identify speaker, listener, content.', 'Re-anchor pronouns to the reporter\'s view.', 'Backshift every tense one step (unless universal truth).', 'Swap deictics — now→then, today→that day, here→there, this→that, ago→before.'] } } },
        { type: 'subpart', nodeId: 'c10_gram_cbse_93_002', difficulty: 'standard',
          question: 'Reported questions lose their question grammar: no question mark,.',
          hint: 'Work step by step.',
          misconception: 'Students keep question order inside reported frames (\'He asked where did I live\'), keep the question mark, or use \'if\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Reported questions lose their question grammar: no question mark, no do/does/did, and',
                  options: ['Reported questions lose their question grammar: no question mark, no do/does/did, and', 'Reporting speech moves every tense one step back: present→past, past→past perfect,', 'Commands and requests report with \'told/ordered/requested/asked + object +'],
                  hint: 'Recall the definition.',
                  misconception: 'Students keep question order inside reported frames (\'He asked where did I live\'), keep the question mark, or use \'if\' for wh-questions.' }
          ],
            remediations: { 'students-keep-question-order-inside': { steps: ['Decide the type — yes/no → if/whether; wh- → keep the wh-word.', 'Delete do/does/did and restore statement order.', 'Backshift the tense.', 'Drop the question mark.'] } } },
        { type: 'subpart', nodeId: 'c10_gram_cbse_93_003', difficulty: 'standard',
          question: 'Commands and requests report with \'told/ordered/requested/asked + object.',
          hint: 'Work step by step.',
          misconception: 'Students report commands as statements (\'He said that sit down\'), forget the object slot (\'told to go\' — told WHOM?).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Commands and requests report with \'told/ordered/requested/asked + object +',
                  options: ['Commands and requests report with \'told/ordered/requested/asked + object +', 'Reporting speech moves every tense one step back: present→past, past→past perfect,', 'Reported questions lose their question grammar: no question mark, no do/does/did, and'],
                  hint: 'Recall the definition.',
                  misconception: 'Students report commands as statements (\'He said that sit down\'), forget the object slot (\'told to go\' — told WHOM?), and place \'not\'.' }
          ],
            remediations: { 'students-report-commands-as-statements': { steps: ['Pick the reporting verb that matches the original\'s force.', 'Insert the object — who is being commanded.', 'to-infinitive carries the command; \'not\' sits BEFORE \'to\'.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
