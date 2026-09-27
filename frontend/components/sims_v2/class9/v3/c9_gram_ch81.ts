import type { SimDef } from '../../engine/types';

/** v3 generated — c9_gram_ch81 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_gram_ch81: SimDef = {
    id: 'v3_c9_gram_ch81',
    title: 'Modals are graded on function: ability.',
    subtitle: 'Covers the nine core modals in declaratives and questions. Does NOT cover modal perfects.',
    classLevel: 9, subject: 'gram', topic: 'Modals are graded on function: ability.',
    chapters: ['c9_gram_ch81'],
    nodeIds: ['c9_gram_cbse_81_001', 'c9_gram_cbse_81_002', 'c9_gram_ch81_003', 'c9_gram_ch81_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'The obligation ladder: may < should < must. The possibility ladder: might < may < could < will(probability).', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Modals are graded on function: ability.', text: 'Modals are graded on function: ability (can/could), permission (may/can), obligation (must), advice (should/ought to), possibility (may/might/could), request (would/could).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c9_gram_cbse_81_002', title: 'Identify each idea',
          dissect: { specimen: 'Modals are graded on function: ability.', spots: [
            { id: 's1', label: 'Modals are graded on function', prompt: 'Which idea is this? — Modals are graded on function: ability (can/could), permission (may/can), obligation.', answer: 'Modals are graded on function', options: ['Modals are graded on function', 'Modal perfects should have', 'Modals encode politeness levels in', 'Semi-modals have to need to'] },
            { id: 's2', label: 'Modal perfects should have', prompt: 'Which idea is this? — Modal perfects — should have, must have, could have, might have + V3 — talk about a past.', answer: 'Modal perfects should have', options: ['Modal perfects should have', 'Modals are graded on function', 'Modals encode politeness levels in', 'Semi-modals have to need to'] },
            { id: 's3', label: 'Modals encode politeness levels in', prompt: 'Which idea is this? — Modals encode politeness levels in requests and permissions: \'can\' is casual/neutral.', answer: 'Modals encode politeness levels in', options: ['Modals encode politeness levels in', 'Modals are graded on function', 'Modal perfects should have', 'Semi-modals have to need to'] },
            { id: 's4', label: 'Semi-modals have to need to', prompt: 'Which idea is this? — Semi-modals (have to, need to, used to, ought to, be able to) express modal meanings.', answer: 'Semi-modals have to need to', options: ['Semi-modals have to need to', 'Modals are graded on function', 'Modal perfects should have', 'Modals encode politeness levels in'] }
          ] } },
        { type: 'build', nodeId: 'c9_gram_cbse_81_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Ask what the sentence DOES — advise, permit, command, guess?', 'Gauge the strength the context needs.', 'Match the modal whose function+strength fits.'], answer: 'Ask what the sentence DOES — advise, permit, command, guess? Gauge the strength the context needs. Match the modal whose function+strength fits.' } },
        { type: 'case', nodeId: 'c9_gram_ch81_004', title: 'You made it',
          caseStudy: { intro: 'You finished Modals are graded on function: ability. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c9_gram_cbse_81_001', difficulty: 'standard',
          question: 'Modals are graded on function: ability (can/could), permission (may/can).',
          hint: 'Work step by step.',
          misconception: 'Students pick by politeness-feel, overusing \'should\' and \'can\', and treat \'must\'/\'should\' as synonyms — the strength.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Modals are graded on function: ability (can/could), permission (may/can), obligation',
                  options: ['Modals are graded on function: ability (can/could), permission (may/can), obligation', 'Modal perfects — should have, must have, could have, might have + V3 — talk about a past', 'Modals encode politeness levels in requests and permissions: \'can\' is casual/neutral', 'Semi-modals (have to, need to, used to, ought to, be able to) express modal meanings'],
                  hint: 'Recall the definition.',
                  misconception: 'Students pick by politeness-feel, overusing \'should\' and \'can\', and treat \'must\'/\'should\' as synonyms — the strength distinction.' }
          ],
            remediations: { 'students-pick-by-politeness-feel': { steps: ['Ask what the sentence DOES — advise, permit, command, guess?', 'Gauge the strength the context needs.', 'Match the modal whose function+strength fits.'] } } },
        { type: 'subpart', nodeId: 'c9_gram_cbse_81_002', difficulty: 'standard',
          question: 'Modal perfects — should have, must have, could have, might have + V3 — talk.',
          hint: 'Work step by step.',
          misconception: 'Students write \'should had\' (double-past), confuse deduction-must with obligation-must, and use \'would have\' without.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Modal perfects — should have, must have, could have, might have + V3 — talk about a past',
                  options: ['Modal perfects — should have, must have, could have, might have + V3 — talk about a past', 'Modals are graded on function: ability (can/could), permission (may/can), obligation', 'Modals encode politeness levels in requests and permissions: \'can\' is casual/neutral', 'Semi-modals (have to, need to, used to, ought to, be able to) express modal meanings'],
                  hint: 'Recall the definition.',
                  misconception: 'Students write \'should had\' (double-past), confuse deduction-must with obligation-must, and use \'would have\' without an if-condition.' }
          ],
            remediations: { 'students-write-should-had-double': { steps: ['Confirm the event is past → have + V3 is forced.', 'Name the stance — deduction (must), reproach (should), lost chance (could), weak guess (might).', '\'would have\' needs an if-clause or implied condition — don\'t float it.'] } } },
        { type: 'subpart', nodeId: 'c9_gram_ch81_003', difficulty: 'standard',
          question: 'Modals encode politeness levels in requests and permissions: \'can\'.',
          hint: 'Work step by step.',
          misconception: 'Students learn \'could = past of can\' and miss the politeness ladder entirely — using \'can\' to the principal reads.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Modals encode politeness levels in requests and permissions: \'can\' is casual/neutral',
                  options: ['Modals encode politeness levels in requests and permissions: \'can\' is casual/neutral', 'Modals are graded on function: ability (can/could), permission (may/can), obligation', 'Modal perfects — should have, must have, could have, might have + V3 — talk about a past', 'Semi-modals (have to, need to, used to, ought to, be able to) express modal meanings'],
                  hint: 'Recall the definition.',
                  misconception: 'Students learn \'could = past of can\' and miss the politeness ladder entirely — using \'can\' to the principal reads as careless, not wrong.' }
          ],
            remediations: { 'students-learn-could-past-of': { steps: ['Look at who\'s being asked — peer → can, adult/stranger → could, formal authority → may.', 'The social distance sets the rung.'] } } },
        { type: 'subpart', nodeId: 'c9_gram_ch81_004', difficulty: 'standard',
          question: 'Semi-modals (have to, need to, used to, ought to, be able to) express modal.',
          hint: 'Work step by step.',
          misconception: 'Students treat \'have to\' as a pure modal — \'Have you to go?\' — or confuse \'used to\' (finished habit) with \'be used.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Semi-modals (have to, need to, used to, ought to, be able to) express modal meanings',
                  options: ['Semi-modals (have to, need to, used to, ought to, be able to) express modal meanings', 'Modals are graded on function: ability (can/could), permission (may/can), obligation', 'Modal perfects — should have, must have, could have, might have + V3 — talk about a past', 'Modals encode politeness levels in requests and permissions: \'can\' is casual/neutral'],
                  hint: 'Recall the definition.',
                  misconception: 'Students treat \'have to\' as a pure modal — \'Have you to go?\' — or confuse \'used to\' (finished habit) with \'be used to -ing\' (current.' }
          ],
            remediations: { 'students-treat-have-to-as': { steps: ['Test with a question: if it needs \'do/does/did\', it\'s a semi-modal.', 'For \'used to\', ask: ended habit (used to + verb) or current familiarity (be used to + -ing)?'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
