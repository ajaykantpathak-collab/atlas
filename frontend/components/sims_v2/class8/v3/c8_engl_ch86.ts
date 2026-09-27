import type { SimDef } from '../../engine/types';

/** v3 generated — c8_engl_ch86 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_engl_ch86: SimDef = {
    id: 'v3_c8_engl_ch86',
    title: 'A message is a short written record — usually.',
    subtitle: 'This node covers the telephone/relay message format only. It does not cover notices.',
    classLevel: 8, subject: 'engl', topic: 'A message is a short written record — usually.',
    chapters: ['c8_engl_ch86'],
    nodeIds: ['c8_engl_cbse_86_001', 'c8_engl_cbse_86_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: '1. Imagine the scene: someone phones, the receiver is out, you must write it down.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'A message is a short written record —.', text: 'A message is a short written record — usually under 50 words — that relays essential information to an absent person.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_engl_cbse_86_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_engl_cbse_86_002', title: 'An informal invitation (and its reply).',
          caseStudy: { intro: '1. Start with the warm skeleton — \'Hi Neha,\' — because this is still a letter between friends. 2.',
            decisions: [{ prompt: 'What four logistics must an informal invitation carry?', options: [
                { text: 'What the occasion is, When it happens, Where it happens, and a request to reply (RSVP)', outcome: 'What the occasion is, When it happens, Where it happens, and a request to reply (RSVP).' },
                { text: 'warmth excuses missing details', outcome: 'Not quite — Students think warmth excuses missing details — \'do come!\' with no when or where.', reveals: 'warmth-excuses-missing-details-do' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_cbse_86_002', title: 'You made it',
          caseStudy: { intro: 'You finished A message is a short written record — usually. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_engl_cbse_86_002', difficulty: 'standard',
          question: 'An informal invitation (and its reply) follows the friendly-letter rules but.',
          hint: 'Work step by step.',
          misconception: 'Students think warmth excuses missing details — \'do come!\' with no when or where.',
          parts: [
                { id: 'a', prompt: 'What is missing from: \'Hi Neha, having a party at my place, do come! Love, Riya\'?', answer: 'The date/time of the party',
                  options: ['The date/time of the party', 'warmth excuses missing details'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think warmth excuses missing details — \'do come!\' with no when or where.' },
                { id: 'b', prompt: 'Reply to a birthday invite you cannot attend — which line is right: \'Can\'t come, busy.\' or \'So sorry, I\'ll be out of town — have a wonderful celebration!\'?', answer: 'The second — a decline stays warm, gives a brief reason, and sends good wishes',
                  options: ['The second — a decline stays warm, gives a brief reason, and sends good wishes', 'warmth excuses missing details'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think warmth excuses missing details — \'do come!\' with no when or where.' },
                { id: 'c', prompt: 'Does an informal invitation need the receiver\'s address block at the top?', answer: 'No — it follows the light informal skeleton, not the formal one',
                  options: ['No — it follows the light informal skeleton, not the formal one', 'warmth excuses missing details'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think warmth excuses missing details — \'do come!\' with no when or where.' }
          ],
            remediations: { 'warmth-excuses-missing-details-do': { steps: ['Check the checklist inside the warmth: What, When, Where, RSVP.', 'If a reply, check it answers the invitation directly and politely.', 'Then let the voice stay friendly.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_cbse_86_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think warmth excuses missing details — \'do come!\' with no when or where.',
          parts: [
                { id: 'a', prompt: 'Fill in the blank: The reply must ______ the question asked — accept with enthusiasm or decline politely.', answer: 'answer',
                  options: ['answer', 'warmth excuses missing details'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think warmth excuses missing details — \'do come!\' with no when or where.' }
          ],
            remediations: { 'warmth-excuses-missing-details-do': { steps: ['Check the checklist inside the warmth: What, When, Where, RSVP.', 'If a reply, check it answers the invitation directly and politely.', 'Then let the voice stay friendly.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
