import type { SimDef } from '../../engine/types';
import C8_ScienceKeepingTimeWithTheSkiesSim from '../../../simulations/c6_12/C8_ScienceKeepingTimeWithTheSkiesSim';

/** v3 wrapped master — C8_ScienceKeepingTimeWithTheSkiesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_sciencekeepingtimewiththeskiessim: SimDef = {
    id: 'v3w_c8_sciencekeepingtimewiththeskiessim',
    title: 'Time Measurement Using Moon Phases: Ancient Calendars',
    subtitle: 'Covers the concept of lunar months, the structure of purely lunar calendars (like the.',
    classLevel: 8, subject: 'science', topic: 'Time Measurement Using Moon Phases: Ancient Calendars',
    chapters: [],
    nodeIds: ['c8_physics_ch7_7'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Look at a calendar hanging in your kitchen — notice how months have 30 or 31 days but the Moon\'s phases don\'t.', goal: 'Master Time Measurement Using Moon Phases: Ancient Calendars.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'A lunar calendar measures time by tracking.', text: 'A lunar calendar measures time by tracking the cyclic pattern of Moon phases, where one month equals one complete lunar cycle (synodic month) of approximately 29.5 days from New Moon to the next New.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_physics_ch7_7', title: 'A lunar calendar measures time by.',
          scaffold: { problem: 'An ancient Mesopotamian priest records the first New Moon after the spring equinox on Day 1.',
            steps: [
            { text: 'Identify the given New Moon days: Day 1, Day 30, Day 59, Day 89.' },
            { text: 'Calculate intervals between successive New Moons: 30-1 = 29 days; 59-30 = 29 days; 89-59 = 30 days.' },
            { text: 'Compute average: (29 + 29 + 30) / 3 = 88 / 3 ≈ 29.33 days.' },
            { text: 'Explain the alternation: The true synodic month is 29.53 days.' },
            { text: 'Verify: 29.33 is close to 29.53; more data would converge to 29.53.', faded: true, blankAnswer: 'Average lunar month ≈ 29.3 days (from this small sample);.' }
            ] } }
    ],
    explore: { component: C8_ScienceKeepingTimeWithTheSkiesSim, prompt: 'Explore the interactive — Time Measurement Using Moon Phases: Ancient Calendars' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch7_7', difficulty: 'standard',
          question: 'A lunar calendar measures time by tracking the cyclic pattern of Moon phases,.',
          hint: 'Revisit the "Lunar Month" node (c8_physics_ch7_5) and observe the Moon nightly for two.',
          misconception: 'Students believe the lunar month is exactly 28 days (4 weeks × 7 days) because they associate "month" with "moon" and.',
          parts: [
                { id: 'a', prompt: 'Compare the Islamic (purely lunar) and Hindu (lunisolar) calendars: which one keeps festivals in the same season every year, and what structural feature.', answer: 'The Hindu lunisolar calendar keeps festivals seasonally aligned',
                  options: ['The Hindu lunisolar calendar keeps festivals seasonally aligned', 'both use Moon phases'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the lunar month is exactly 28 days (4 weeks × 7 days) because they associate "month" with "moon" and see 4-week blocks on.' }
          ],
            remediations: { 'the-lunar-month-is-exactly': { steps: ['Have the student record the actual Moon phase each night for 2 months using a phase calendar app or direct observation.', 'Count days between two New Moons — they will get 29 or 30 days, never 28.', 'Then calculate 12 × 29.5 = 354 and compare to 365.', 'Plot both on a timeline to visualize the 11-day drift.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch7_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the lunar month is exactly 28 days (4 weeks × 7 days) because they associate "month" with "moon" and.',
          parts: [
                { id: 'a', prompt: 'Compare the Islamic (purely lunar) and Hindu (lunisolar) calendars: which one keeps festivals in the same season every year, and what structural feature.', answer: 'The Hindu lunisolar calendar keeps festivals seasonally aligned',
                  options: ['The Hindu lunisolar calendar keeps festivals seasonally aligned', 'both use Moon phases'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the lunar month is exactly 28 days (4 weeks × 7 days) because they associate "month" with "moon" and see 4-week blocks on.' }
          ],
            remediations: { 'the-lunar-month-is-exactly': { steps: ['Have the student record the actual Moon phase each night for 2 months using a phase calendar app or direct observation.', 'Count days between two New Moons — they will get 29 or 30 days, never 28.', 'Then calculate 12 × 29.5 = 354 and compare to 365.', 'Plot both on a timeline to visualize the 11-day drift.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
