import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch93 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch93: SimDef = {
    id: 'v3_c10_engl_ch93',
    title: 'An argumentative essay follows a five-paragraph.',
    subtitle: 'This node covers argumentative structure only — thesis, distinct reasons, evidence.',
    classLevel: 10, subject: 'engl', topic: 'An argumentative essay follows a five-paragraph.',
    chapters: ['c10_engl_ch93'],
    nodeIds: ['c10_engl_cbse_93_001', 'c10_engl_cbse_93_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '1. State the charge: pick a thesis that argues — \'Social media should be limited for under-16s\', not \'Social.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'An argumentative essay follows a.', text: 'An argumentative essay follows a five-paragraph spine: an introduction ending in a thesis (the claim being defended), three body paragraphs each opening with a topic sentence that states one.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_93_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_93_001', title: 'An argumentative essay follows a.',
          caseStudy: { intro: '1. State the charge: pick a thesis that argues — \'Social media should be limited for under-16s\', not \'Social media exists\'. 2.',
            decisions: [{ prompt: 'Which is a thesis: \'Sports are played in school\' or \'Sports periods should be mandatory because fitness shapes learning\'?', options: [
                { text: 'The second — a thesis makes a claim that can be argued', outcome: 'The second — a thesis makes a claim that can be argued; the first merely states a fact.' },
                { text: 'length is argument', outcome: 'Not quite — Students think length is argument — more paragraphs, more examples, more \'very important\'.', reveals: 'length-is-argument-more-paragraphs' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_93_002', title: 'You made it',
          caseStudy: { intro: 'You finished An argumentative essay follows a five-paragraph. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_93_001', difficulty: 'standard',
          question: 'An argumentative essay follows a five-paragraph spine: an introduction ending.',
          hint: 'Work step by step.',
          misconception: 'Students think length is argument — more paragraphs, more examples, more \'very important\'.',
          parts: [
                { id: 'a', prompt: 'Which is a thesis: \'Sports are played in school\' or \'Sports periods should be mandatory because fitness shapes learning\'?', answer: 'The second — a thesis makes a claim that can be argued',
                  options: ['The second — a thesis makes a claim that can be argued', 'length is argument'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think length is argument — more paragraphs, more examples, more \'very important\'.' },
                { id: 'b', prompt: 'A body paragraph reads: \'Many students play sports. Sports include cricket and football. Cricket is popular.\' What is wrong?', answer: 'No reason is advanced',
                  options: ['No reason is advanced', 'length is argument'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think length is argument — more paragraphs, more examples, more \'very important\'.' },
                { id: 'c', prompt: 'Fill in the blank: An argumentative essay has a ______ spine: thesis → three body paragraphs → conclusion.', answer: 'five-paragraph',
                  options: ['five-paragraph', 'length is argument'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think length is argument — more paragraphs, more examples, more \'very important\'.' }
          ],
            remediations: { 'length-is-argument-more-paragraphs': { steps: ['Rebuild the spine on paper: thesis line, three topic sentences — each must name a different reason — then the verdict.', 'If two paragraphs argue the same thing, merge them and find a new reason.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_93_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think length is argument — more paragraphs, more examples, more \'very important\'.',
          parts: [
                { id: 'a', prompt: 'What does each body paragraph owe the thesis?', answer: 'One distinct reason plus evidence',
                  options: ['One distinct reason plus evidence', 'length is argument'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think length is argument — more paragraphs, more examples, more \'very important\'.' }
          ],
            remediations: { 'length-is-argument-more-paragraphs': { steps: ['Rebuild the spine on paper: thesis line, three topic sentences — each must name a different reason — then the verdict.', 'If two paragraphs argue the same thing, merge them and find a new reason.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
