import type { SimDef } from '../../engine/types';

/** v3 generated — c8_physics_ch07_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_physics_ch07_p2: SimDef = {
    id: 'v3_c8_physics_ch07_p2',
    title: 'Keeping Time with the Skies · Part 2/2',
    subtitle: 'The Moon\'s shadow trick that isn\'t a shadow',
    classLevel: 8, subject: 'physics', topic: 'Keeping Time with the Skies · Part 2/2',
    chapters: ['c8_physics_ch07'],
    nodeIds: ['c8_physics_ch7_5', 'c8_physics_ch7_6', 'c8_physics_ch7_7', 'c8_physics_ch7_8', 'c8_physics_ch7_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sky-watcher decoding the Moon', intro: 'Every night the Moon wears a different shape — and the popular explanation (Earth\'s shadow) is flat-out wrong. Build a tabletop model and watch the real reason unfold.', goal: 'Understand Moon phases as the changing view of the Moon\'s sunlit half during its orbit — distinguishing phases from eclipses and identifying new, crescent, quarter, gibbous and full phases.' },
    discovery: {
        question: 'The Moon goes from a thin crescent to a fat full disc every month. Is Earth\'s shadow slowly covering it each night?',
        options: ['No — the Moon is always half-lit by the Sun; phases are just us seeing different slices of that lit half as it orbits', 'Yes — Earth\'s shadow causes every phase', 'The Moon makes its own light and dims it', 'Clouds cover parts of the Moon'],
        answer: 'No — the Moon is always half-lit by the Sun; phases are just us seeing different slices of that lit half as it orbits',
        hook: 'The dark part of the Moon is the Moon\'s own night, not Earth\'s shadow — that only bites during a rare lunar eclipse. Grab a lamp and a ball: orbit the ball around your head and you\'ll see every phase appear with zero shadows involved.',
    },
    teaching: [
        { title: 'Lunar Month: Time Between Two Identical Moon Phases', text: 'A lunar month (synodic month) is the average time interval between two successive occurrences of the same Moon phase (e.g., New Moon to New Moon), approximately 29.5 days, caused by the Moon.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_physics_ch7_5', title: 'Your mission',
          mission: { widget: 'moon', validate: 'moon:phase=80',
            instruction: 'On the lab: sweep to full moon — what does the lit fraction do?.',
        context: 'Run the lamp-ball-head experiment: hold a ball at arm\'s length, turn slowly in a dark room, and draw the lit shape at four positions — then name the phase at each Sun–Earth–Moon angle.',
            observePrompt: 'What did the moon interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_physics_ch7_5', title: 'Lunar Month: Time Between Two Identical Moon Phases',
          scaffold: { problem: 'A farmer in Maharashtra plants crops on the day of Amavasya (New Moon) on 15th June. He wants to harvest on the next Purnima (Full Moon).',
            steps: [
            { text: 'Identify given: Start date = 15th June (New Moon). Target phase = Full Moon (half a lunar month later).' },
            { text: 'Add 14.75 days to 15th June. June has 30 days. Days remaining in June after 15th = 30 - 15 = 15 days.' },
            { text: 'Since 14.75 days < 15 days, the target date falls in June. 15th June + 14.75 days = 29.75th June ≈ 29th June (evening).' },
            { text: 'Verify: From New Moon to Full Moon is waxing phase, takes ~14.75 days. 15th to 30th June is 15 days, reasonable.' },
            { text: 'State answer with context: The farmer should plan harvest around 30th June (Purnima).', faded: true, blankAnswer: 'Approximately 30th June (Purnima)' }
            ] } },
        { type: 'case', nodeId: 'c8_physics_ch7_6', title: 'Moon Visible During Daytime: Explanation',
          caseStudy: { intro: 'Look up at the sky around 10 AM on a clear day in Delhi — you might spot a pale Moon hanging above the school building.',
            decisions: [{ prompt: 'Why can we see the Moon during the day even though the Sun is shining brightly?', options: [
                { text: 'The Moon reflects sunlight just like it does at night', outcome: 'The Moon reflects sunlight just like it does at night. When the Moon is above the horizon during.' },
                { text: 'the Moon makes its own light during the day', outcome: 'Not quite — Students believe the Moon is "only a night object" because they associate it with darkness and.', reveals: 'the-moon-is-only-a' },
                { text: 'only a night object', outcome: 'Not quite — Students believe the Moon is "only a night object" because they associate it with darkness and.', reveals: 'the-moon-is-only-a' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch7_7', title: 'Time Measurement Using Moon Phases: Ancient Calendars',
          caseStudy: { intro: 'Look at a calendar hanging in your kitchen — notice how months have 30 or 31 days but the Moon\'s phases don\'t match those dates perfectly.',
            decisions: [{ prompt: 'What is the approximate duration of one lunar month (synodic month) in days, and which two identical Moon phases mark its beginning and end?', options: [
                { text: 'One lunar month is approximately 29.5 days, measured from one New Moon to the next New', outcome: 'One lunar month is approximately 29.5 days, measured from one New Moon to the next New Moon (or.' },
                { text: '28 days', outcome: 'Not quite — Students believe the lunar month is exactly 28 days (4 weeks × 7 days) because they associate.', reveals: 'the-lunar-month-is-exactly' },
                { text: '30 days exactly', outcome: 'Not quite — Students believe the lunar month is exactly 28 days (4 weeks × 7 days) because they associate.', reveals: 'the-lunar-month-is-exactly' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch7_8', title: 'Solar Day: Earth\'s Rotation and Day-Night Cycle',
          scaffold: { problem: 'The city of Bhopal is at longitude 77.4° E. Indian Standard Time (IST) is based on 82.5° E.',
            steps: [
            { text: 'Identify given quantities — Bhopal longitude = 77.4° E, IST meridian = 82.5° E. Earth\'s angular speed = 15° per hour.' },
            { text: 'Calculate longitude difference — Δλ = 82.5° – 77.4° = 5.1° (Bhopal is west of IST meridian).' },
            { text: 'Convert longitude difference to time difference — Δt = Δλ / 15° per hour = 5.1° / 15° per hour = 0.34 hours.' },
            { text: 'Convert decimal hours to minutes — 0.34 hours × 60 minutes/hour = 20.4 minutes ≈ 20 minutes.' },
            { text: 'Determine local solar noon in IST — Since Bhopal is west, the Sun crosses later there.', faded: true, blankAnswer: '12:20 PM IST' }
            ] } },
        { type: 'case', nodeId: 'c8_physics_ch7_9', title: 'Lunar Eclipse: Earth Between Sun and Moon',
          caseStudy: { intro: 'Imagine watching a bright Full Moon slowly dim and turn a deep coppery red — like the "Blood Moon" seen from your terrace in Delhi last year.',
            decisions: [{ prompt: 'What is the exact alignment of the Sun, Earth, and Moon during a lunar eclipse, and during which lunar phase does it occur?', options: [
                { text: 'During a lunar eclipse, the Sun, Earth, and Moon align in a straight line with Earth in', outcome: 'During a lunar eclipse, the Sun, Earth, and Moon align in a straight line with Earth in the middle.' },
                { text: 'Moon between Sun and Earth', outcome: 'Not quite — Students believe the Moon\'s phases are caused by Earth\'s shadow falling on the Moon (e.g.', reveals: 'the-moon-s-phases-are' },
                { text: 'New Moon', outcome: 'Not quite — Students believe the Moon\'s phases are caused by Earth\'s shadow falling on the Moon (e.g.', reveals: 'the-moon-s-phases-are' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch7_5', title: 'Use it in the wild',
          caseStudy: { intro: 'Watching the moon shrink from full to a thin crescent over two weeks, Dev\'s sister says, \'Earth\'s shadow is slowly covering the moon — that\'s why it changes shape every night.\'',
            decisions: [{ prompt: 'Is Earth\'s shadow the cause?', options: [
                { text: 'No — the sun always lights half the moon; as the moon orbits Earth we simply see different fractions of that lit half, and the dark part is the moon\'s own night side. Earth\'s shadow produces a lunar eclipse only on rare full-moon nights, roughly twice a year — not a monthly cycle.', outcome: 'This separates the two phenomena: phases are viewing geometry on a half-lit sphere; eclipses are shadow events.' },
                { text: 'His sister is right — anything that darkens part of the moon is a shadow, and Earth\'s is the only one around.', outcome: 'If a shadow caused phases, every night would be an eclipse; the moon\'s unlit half is its own night, visible in different proportions as it orbits.', reveals: 'phases-are-shadow' },
                { text: 'Neither — the moon makes its own light and dims it on a schedule, like a lamp being turned down.', outcome: 'The moon emits no light; it reflects sunlight, and phases come from how much of the sunlit half faces us.', reveals: 'moon-self-dims' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch7_9', title: 'You made it',
          caseStudy: { intro: 'Phases are a viewing-angle story, not a shadow story. The Moon\'s 29.5-day orbit keeps changing how much of its sunlit half we get to see — from new sliver to full disc.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'moon', prompt: 'Explore the moon interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'moon', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch7_5', difficulty: 'standard',
          question: 'A lunar month (synodic month) is the average time interval between two.',
          hint: 'Review c7_physics_ch06_009 (Phases of the Moon: Explanation) and c7_physics_ch06_003.',
          misconception: 'Students often believe the lunar month equals the Moon\'s orbital period (27.3 days) because they think the Moon returns.',
          parts: [
                { id: 'a', prompt: 'If today is a Full Moon (Purnima) on 1st October, on what approximate date will the next Full Moon occur? Show your calculation.', answer: 'Step 1: Lunar month = 29.5 days',
                  options: ['Step 1: Lunar month = 29.5 days', 'the lunar month equals the Moon\'s orbital period (27', 'the Moon returns to the same position relative to the Sun after one orbit'],
                  hint: 'Review c7_physics_ch06_009 (Phases of the Moon: Explanation) and c7_physics_ch06_003 (Revolution.',
                  misconception: 'Students often believe the lunar month equals the Moon\'s orbital period (27.3 days) because they think the Moon returns to the same.' },
                { id: 'b', prompt: 'A student claims: "Since the Moon orbits Earth in 27.3 days, we should see a Full Moon every 27.3 days." Analyze this statement and explain why it is incorrect.', answer: 'The statement ignores Earth\'s motion around the Sun',
                  options: ['The statement ignores Earth\'s motion around the Sun', 'the lunar month equals the Moon\'s orbital period (27', 'the Moon returns to the same position relative to the Sun after one orbit'],
                  hint: 'Review c7_physics_ch06_009 (Phases of the Moon: Explanation) and c7_physics_ch06_003 (Revolution.',
                  misconception: 'Students often believe the lunar month equals the Moon\'s orbital period (27.3 days) because they think the Moon returns to the same.' }
          ],
            remediations: { 'the-lunar-month-equals-the': { steps: ['Use a lamp (Sun), a ball on a string (Moon), and your head (Earth) in a dark room.', 'Orbit the "Moon" around your head once (27.3 days simulation) while slowly walking in a circle around the "Sun".', 'Notice the "Moon" phase (lit portion) after one orbit is not the same as start — it\'s slightly less illuminated.', 'Continue orbiting until the phase matches the start; count the extra fraction of orbit needed.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch7_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the lunar month equals the Moon\'s orbital period (27.3 days) because they think the Moon returns.',
          parts: [
                { id: 'a', prompt: 'Evaluate this method for predicting the Moon phase 100 days from today: "Divide 100 by 29.5, take the remainder, and count that many days forward in the phase.', answer: 'Yes, the method is reliable for approximate prediction',
                  options: ['Yes, the method is reliable for approximate prediction', 'the lunar month equals the Moon\'s orbital period (27', 'the Moon returns to the same position relative to the Sun after one orbit'],
                  hint: 'Review c7_physics_ch06_009 (Phases of the Moon: Explanation) and c7_physics_ch06_003 (Revolution.',
                  misconception: 'Students often believe the lunar month equals the Moon\'s orbital period (27.3 days) because they think the Moon returns to the same.' }
          ],
            remediations: { 'the-lunar-month-equals-the': { steps: ['Use a lamp (Sun), a ball on a string (Moon), and your head (Earth) in a dark room.', 'Orbit the "Moon" around your head once (27.3 days simulation) while slowly walking in a circle around the "Sun".', 'Notice the "Moon" phase (lit portion) after one orbit is not the same as start — it\'s slightly less illuminated.', 'Continue orbiting until the phase matches the start; count the extra fraction of orbit needed.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch7_6', difficulty: 'standard',
          question: 'The Moon is visible during daytime when its orbital position places it above.',
          hint: 'Review c8_physics_ch7_2 (relative positions cause phases) and c8_physics_ch7_5 (lunar.',
          misconception: 'Students believe the Moon is "only a night object" because they associate it with darkness and bedtime stories.',
          parts: [
                { id: 'a', prompt: 'Why can we see the Moon during the day even though the Sun is shining brightly?', answer: 'The Moon reflects sunlight just like it does at night',
                  options: ['The Moon reflects sunlight just like it does at night', 'the Moon makes its own light during the day', 'only a night object'],
                  hint: 'Review c8_physics_ch7_2 (relative positions cause phases) and c8_physics_ch7_5 (lunar month timing).',
                  misconception: 'Students believe the Moon is "only a night object" because they associate it with darkness and bedtime stories.' },
                { id: 'b', prompt: 'If you see a half-Moon (first quarter) high in the sky at 3 PM, where is the Sun relative to the Moon and Earth?', answer: 'At first quarter, the Moon is 90° east of the Sun as seen from Earth',
                  options: ['At first quarter, the Moon is 90° east of the Sun as seen from Earth', 'only a night object'],
                  hint: 'Review c8_physics_ch7_2 (relative positions cause phases) and c8_physics_ch7_5 (lunar month timing).',
                  misconception: 'Students believe the Moon is "only a night object" because they associate it with darkness and bedtime stories.' },
                { id: 'c', prompt: 'The Moon rises about 50 minutes later each day. If the Moon rose at 6:00 AM today, at what approximate time will it rise 7 days from now? Show your calculation.', answer: 'Daily delay = 50 minutes',
                  options: ['Daily delay = 50 minutes', '6:00 AM', 'only a night object'],
                  hint: 'Review c8_physics_ch7_2 (relative positions cause phases) and c8_physics_ch7_5 (lunar month timing).',
                  misconception: 'Students believe the Moon is "only a night object" because they associate it with darkness and bedtime stories.' },
                { id: 'd', prompt: 'Compare these two statements: (A) "The Moon is only visible at night because that\'s when it comes out." (B) "The Moon is visible whenever it\'s above the.', answer: 'Statement B is accurate',
                  options: ['Statement B is accurate', 'only a night object'],
                  hint: 'Review c8_physics_ch7_2 (relative positions cause phases) and c8_physics_ch7_5 (lunar month timing).',
                  misconception: 'Students believe the Moon is "only a night object" because they associate it with darkness and bedtime stories.' }
          ],
            remediations: { 'the-moon-is-only-a': { steps: ['Take the student outside at 10 AM on a day when the Moon is in waxing gibbous phase (3-4 days before Full Moon).', 'Have them point to the Moon, then trace an imaginary line to the Sun.', 'Ask: "Is the Moon between us and the Sun, or on the other side?" Then use a lamp (Sun), a ball (Moon), and their head.', 'Repeat for waning gibbous (after Full Moon) in the afternoon.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch7_7', difficulty: 'standard',
          question: 'A lunar calendar measures time by tracking the cyclic pattern of Moon phases.',
          hint: 'Revisit the "Lunar Month" node (c8_physics_ch7_5) and observe the Moon nightly for two.',
          misconception: 'Students believe the lunar month is exactly 28 days (4 weeks × 7 days) because they associate "month" with "moon" and.',
          parts: [
                { id: 'a', prompt: 'Compare the Islamic (purely lunar) and Hindu (lunisolar) calendars: which one keeps festivals in the same season every year, and what structural feature.', answer: 'The Hindu lunisolar calendar keeps festivals seasonally aligned',
                  options: ['The Hindu lunisolar calendar keeps festivals seasonally aligned', 'both use Moon phases'],
                  hint: 'Revisit the "Lunar Month" node (c8_physics_ch7_5) and observe the Moon nightly for two weeks to see.',
                  misconception: 'Students believe the lunar month is exactly 28 days (4 weeks × 7 days) because they associate "month" with "moon" and see 4-week blocks.' }
          ],
            remediations: { 'the-lunar-month-is-exactly': { steps: ['Have the student record the actual Moon phase each night for 2 months using a phase calendar app or direct observation.', 'Count days between two New Moons — they will get 29 or 30 days, never 28.', 'Then calculate 12 × 29.5 = 354 and compare to 365.', 'Plot both on a timeline to visualize the 11-day drift.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch7_8', difficulty: 'standard',
          question: 'A solar day is the time interval between two successive transits of the Sun.',
          hint: 'Revisit c7_physics_ch06_001 (Rotation of Earth: Day and Night Cycle) and observe.',
          misconception: 'Students often think the solar day equals the time for one 360° rotation of Earth (sidereal day), ignoring that Earth\'s.',
          parts: [
                { id: 'a', prompt: 'Why is a solar day about 4 minutes longer than a sidereal day? Use the terms \'rotation\', \'orbit\', and \'meridian\' in your explanation.', answer: 'Earth rotates 360° relative to distant stars in a sidereal day (23h 56m)',
                  options: ['Earth rotates 360° relative to distant stars in a sidereal day (23h 56m)', 'rotation alone determines the solar day, missing the combined effect'],
                  hint: 'Revisit c7_physics_ch06_001 (Rotation of Earth: Day and Night Cycle) and observe a sundial.',
                  misconception: 'Students often think the solar day equals the time for one 360° rotation of Earth (sidereal day), ignoring that Earth\'s orbital motion.' }
          ],
            remediations: { 'the-solar-day-equals-the': { steps: ['Use a globe and lamp: mark a meridian with tape.', 'Rotate globe 360° (count rotations) while keeping lamp fixed — observe the tape no longer points at lamp.', 'Move globe 1/365 of a circle around lamp (simulate 1 day of orbit).', 'Rotate globe further until tape points at lamp again — count the extra fraction of rotation.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch7_9', difficulty: 'standard',
          question: 'A lunar eclipse occurs when the Earth comes directly between the Sun and the.',
          hint: 'Review "Shadow Formation and Its Properties" (c6_physics_ch11_038) and "Light Travels.',
          misconception: 'Students believe the Moon\'s phases are caused by Earth\'s shadow falling on the Moon (e.g., "crescent Moon = Earth\'s.',
          parts: [
                { id: 'a', prompt: 'A student draws a diagram showing the Moon\'s orbit as a perfect circle in the same plane as Earth\'s orbit around the Sun.', answer: 'The Moon\'s orbit is inclined ~5° to the ecliptic (Earth\'s orbital plane)',
                  options: ['The Moon\'s orbit is inclined ~5° to the ecliptic (Earth\'s orbital plane)', 'crescent Moon = Earth\'s shadow covering most of the Moon', 'the Moon\'s phases are caused by Earth\'s shadow falling on the Moon (e'],
                  hint: 'Review "Shadow Formation and Its Properties" (c6_physics_ch11_038) and "Light Travels in Straight.',
                  misconception: 'Students believe the Moon\'s phases are caused by Earth\'s shadow falling on the Moon (e.g., "crescent Moon = Earth\'s shadow covering most.' }
          ],
            remediations: { 'the-moon-s-phases-are': { steps: ['In a dark room, hold a white ball (Moon) at arm\'s length near a single lamp (Sun).', 'Observe the ball\'s lit shape as you move it around your head — this reproduces phases without any Earth shadow.', 'Then place a large ball (Earth) between the lamp and the white ball to cast a real shadow — this creates an eclipse.', 'Explicitly contrast: "Phases happen every month; eclipses need perfect alignment at nodes." 4.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
