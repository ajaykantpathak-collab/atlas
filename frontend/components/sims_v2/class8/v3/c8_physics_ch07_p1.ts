import type { SimDef } from '../../engine/types';

/** v3 generated — c8_physics_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_physics_ch07_p1: SimDef = {
    id: 'v3_c8_physics_ch07_p1',
    title: 'Keeping Time with the Skies · Part 1/2',
    subtitle: 'The Moon\'s shadow trick that isn\'t a shadow',
    classLevel: 8, subject: 'physics', topic: 'Keeping Time with the Skies · Part 1/2',
    chapters: ['c8_physics_ch07'],
    nodeIds: ['c8_physics_ch7_1', 'c8_physics_ch7_10', 'c8_physics_ch7_11', 'c8_physics_ch7_2', 'c8_physics_ch7_3', 'c8_physics_ch7_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sky-watcher decoding the Moon', intro: 'Every night the Moon wears a different shape — and the popular explanation (Earth\'s shadow) is flat-out wrong. Build a tabletop model and watch the real reason unfold.', goal: 'Understand Moon phases as the changing view of the Moon\'s sunlit half during its orbit — distinguishing phases from eclipses and identifying new, crescent, quarter, gibbous and full phases.' },
    discovery: {
        question: 'The Moon goes from a thin crescent to a fat full disc every month. Is Earth\'s shadow slowly covering it each night?',
        options: ['No — the Moon is always half-lit by the Sun; phases are just us seeing different slices of that lit half as it orbits', 'Yes — Earth\'s shadow causes every phase', 'The Moon makes its own light and dims it', 'Clouds cover parts of the Moon'],
        answer: 'No — the Moon is always half-lit by the Sun; phases are just us seeing different slices of that lit half as it orbits',
        hook: 'The dark part of the Moon is the Moon\'s own night, not Earth\'s shadow — that only bites during a rare lunar eclipse. Grab a lamp and a ball: orbit the ball around your head and you\'ll see every phase appear with zero shadows involved.',
    },
    teaching: [
        { title: 'Moon\'s Changing Appearance: Phases of the Moon', text: 'The phases of the Moon are the cyclical changes in the appearance of the Moon\'s sunlit portion as observed from Earth, caused by the changing relative positions of the Sun, Earth, and Moon as the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_physics_ch7_1', title: 'Your mission',
          mission: { widget: 'moon', validate: 'moon:phase=80',
            instruction: 'On the lab: sweep to full moon — what does the lit fraction do?.',
        context: 'Run the lamp-ball-head experiment: hold a ball at arm\'s length, turn slowly in a dark room, and draw the lit shape at four positions — then name the phase at each Sun–Earth–Moon angle.',
            observePrompt: 'What did the moon interactive show you?' } },
        { type: 'case', nodeId: 'c8_physics_ch7_1', title: 'Moon\'s Changing Appearance: Phases of the Moon',
          caseStudy: { intro: 'Begin by asking students to recall the Moon\'s appearance over the past month: "Have you noticed the Moon looks like a thin curve some nights and a full circle.',
            decisions: [{ prompt: 'What is the name of the Moon phase when the Moon is positioned directly between the Sun and the Earth, with its dark side facing Earth?', options: [
                { text: 'The phase is called the **New Moon**', outcome: 'The phase is called the **New Moon**. A wrong answer (e.g., "Full Moon" or "Crescent") reveals the.' },
                { text: 'Full Moon', outcome: 'Not quite — Students believe the Moon\'s phases are caused by the Earth\'s shadow falling on the Moon (i.e., they.', reveals: 'the-moon-s-phases-are' },
                { text: 'Crescent', outcome: 'Not quite — Students believe the Moon\'s phases are caused by the Earth\'s shadow falling on the Moon (i.e., they.', reveals: 'the-moon-s-phases-are' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch7_10', title: 'Solar Eclipse: Moon Between Sun and Earth',
          caseStudy: { intro: 'Imagine you are in a dark room with a single bright bulb (the Sun) and you hold a small ball (the Moon) between the bulb and a wall (Earth).',
            decisions: [{ prompt: 'What is the essential alignment of the Sun, Moon, and Earth required for a solar eclipse to occur, and during which Moon phase does this.', options: [
                { text: 'The Sun, Moon, and Earth must be nearly in a straight line with the Moon in the middle', outcome: 'The Sun, Moon, and Earth must be nearly in a straight line with the Moon in the middle.' },
                { text: 'Full Moon', outcome: 'Not quite — Students often believe a solar eclipse occurs every month at New Moon because they see the Moon.', reveals: 'a-solar-eclipse-occurs-every' },
                { text: 'Earth in the middle', outcome: 'Not quite — Students often believe a solar eclipse occurs every month at New Moon because they see the Moon.', reveals: 'a-solar-eclipse-occurs-every' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch7_11', title: 'Predicting Moon Phases: Pattern and Cycle',
          scaffold: { problem: 'On 1st November (Diwali week), the Moon is observed as a Waning Crescent in Mumbai.',
            steps: [
            { text: 'Identify given: reference phase = Waning Crescent on 1st Nov. Target = 15th Nov (14 days later).' },
            { text: 'Determine phase duration = 29.5 days / 8 phases = 3.6875 days per phase. Sequence order: ...' },
            { text: 'Calculate number of phase steps in 14 days: 14 days ÷ 3.6875 days/phase = 3.796 phases.' },
            { text: 'Count forward in cycle: Waning Crescent (current) → (1) New Moon → (2) Waxing Crescent → (3) First Quarter → (4) Waxing.' },
            { text: 'Verify: 14 days is slightly less than half-cycle (14.75 days).', faded: true, blankAnswer: 'Waxing Gibbous' }
            ] } },
        { type: 'case', nodeId: 'c8_physics_ch7_2', title: 'Why the Moon Changes Shape: Relative Positions of Sun, Moon, Earth',
          caseStudy: { intro: 'Observe the Moon on two different nights a week apart — you will see a distinctly different shape, like a thin crescent versus a half-circle.',
            decisions: [{ prompt: 'A student draws the Sun, Earth, and Moon in a straight line with Earth in the middle.', options: [
                { text: 'The phase would be **Full Moon**', outcome: 'The phase would be **Full Moon**. With Earth in the middle, the Sun and Moon are on opposite sides.' },
                { text: 'New Moon', outcome: 'Not quite — **The Earth\'s shadow causes the Moon\'s phases.** Students often believe that the dark part of the.', reveals: 'the-earth-s-shadow-causes' },
                { text: 'Lunar Eclipse', outcome: 'Not quite — **The Earth\'s shadow causes the Moon\'s phases.** Students often believe that the dark part of the.', reveals: 'the-earth-s-shadow-causes' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch7_3', title: 'New Moon, Crescent, Quarter, Gibbous, and Full Moon',
          caseStudy: { intro: 'Begin with a real-world observation: ask students to recall the Moon\'s shape on different nights over the past month—sometimes a thin sliver, sometimes.',
            decisions: [{ prompt: 'What is the name of the Moon phase when the entire sunlit side of the Moon faces Earth, making the Moon appear as a complete bright circle?', options: [
                { text: 'Full Moon', outcome: 'Full Moon. A wrong answer (e.g., "New Moon" or "Quarter Moon") reveals the student cannot match the.' },
                { text: 'New Moon', outcome: 'Not quite — Students often believe the Moon\'s phases are caused by Earth\'s shadow falling on the Moon (like.', reveals: 'the-moon-s-phases-are' },
                { text: 'Quarter Moon', outcome: 'Not quite — Students often believe the Moon\'s phases are caused by Earth\'s shadow falling on the Moon (like.', reveals: 'the-moon-s-phases-are' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch7_4', title: 'Waxing and Waning Phases: Increasing and Decreasing Bright Portion',
          caseStudy: { intro: 'Look at the Moon tonight and note its shape — is it a thin crescent, a half circle, or nearly full?',
            decisions: [{ prompt: 'What is the difference between a waxing crescent Moon and a waning crescent Moon in terms of the illuminated portion?', options: [
                { text: 'A waxing crescent has the illuminated portion increasing (growing larger each night) and', outcome: 'A waxing crescent has the illuminated portion increasing (growing larger each night) and the bright.' },
                { text: 'waxing', outcome: 'Not quite — Students often think "waxing" means the Moon is getting physically larger or that the bright side.', reveals: 'waxing-means-the-moon-is' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch7_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Watching the moon shrink from full to a thin crescent over two weeks, Dev\'s sister says, \'Earth\'s shadow is slowly covering the moon — that\'s why it changes shape every night.\'',
            decisions: [{ prompt: 'Is Earth\'s shadow the cause?', options: [
                { text: 'No — the sun always lights half the moon; as the moon orbits Earth we simply see different fractions of that lit half, and the dark part is the moon\'s own night side. Earth\'s shadow produces a lunar eclipse only on rare full-moon nights, roughly twice a year — not a monthly cycle.', outcome: 'This separates the two phenomena: phases are viewing geometry on a half-lit sphere; eclipses are shadow events.' },
                { text: 'His sister is right — anything that darkens part of the moon is a shadow, and Earth\'s is the only one around.', outcome: 'If a shadow caused phases, every night would be an eclipse; the moon\'s unlit half is its own night, visible in different proportions as it orbits.', reveals: 'phases-are-shadow' },
                { text: 'Neither — the moon makes its own light and dims it on a schedule, like a lamp being turned down.', outcome: 'The moon emits no light; it reflects sunlight, and phases come from how much of the sunlit half faces us.', reveals: 'moon-self-dims' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch7_4', title: 'The bigger picture',
          caseStudy: { intro: 'Phases are a viewing-angle story, not a shadow story. The Moon\'s 29.5-day orbit keeps changing how much of its sunlit half we get to see — from new sliver to full disc.',
            decisions: [{ prompt: 'What comes next? Keeping Time with the Skies · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Keeping Time with the Skies · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'moon', prompt: 'Explore the moon interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'moon', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch7_1', difficulty: 'standard',
          question: 'The phases of the Moon are the cyclical changes in the appearance of the Moon\'s.',
          hint: 'Review the "Lamp-Ball-Head" model from Class 7 (c7_physics_ch06_009) to re-establish that.',
          misconception: 'Students believe the Moon\'s phases are caused by the Earth\'s shadow falling on the Moon (i.e., they think every phase.',
          parts: [
                { id: 'a', prompt: 'What is the name of the Moon phase when the Moon is positioned directly between the Sun and the Earth, with its dark side facing Earth?', answer: 'The phase is called the **New Moon**',
                  options: ['The phase is called the **New Moon**', 'Full Moon', 'Crescent', 'the Moon\'s phases are caused by the Earth\'s shadow falling on the Moon (i'],
                  hint: 'Review the "Lamp-Ball-Head" model from Class 7 (c7_physics_ch06_009) to re-establish that the.',
                  misconception: 'Students believe the Moon\'s phases are caused by the Earth\'s shadow falling on the Moon (i.e., they think every phase is a partial lunar.' },
                { id: 'b', prompt: 'Why does the Moon appear as a thin crescent a few days after the New Moon, even though the Sun is still lighting up half of the Moon\'s surface?', answer: 'The Moon appears as a crescent',
                  options: ['The Moon appears as a crescent', 'Earth\'s shadow covers most of the Moon', 'the Moon\'s phases are caused by the Earth\'s shadow falling on the Moon (i', 'every phase is a partial lunar eclipse)'],
                  hint: 'Review the "Lamp-Ball-Head" model from Class 7 (c7_physics_ch06_009) to re-establish that the.',
                  misconception: 'Students believe the Moon\'s phases are caused by the Earth\'s shadow falling on the Moon (i.e., they think every phase is a partial lunar.' },
                { id: 'c', prompt: 'Compare the Moon\'s phase seen from Earth when the Moon is at Position A (90° from Sun-Earth line) versus Position B (180° from Sun-Earth line).', answer: 'At Position A, half the visible disk is lit (Quarter phase)',
                  options: ['At Position A, half the visible disk is lit (Quarter phase)', 'fraction decreases', 'the Moon\'s phases are caused by the Earth\'s shadow falling on the Moon (i', 'every phase is a partial lunar eclipse)'],
                  hint: 'Review the "Lamp-Ball-Head" model from Class 7 (c7_physics_ch06_009) to re-establish that the.',
                  misconception: 'Students believe the Moon\'s phases are caused by the Earth\'s shadow falling on the Moon (i.e., they think every phase is a partial lunar.' }
          ],
            remediations: { 'the-moon-s-phases-are': { steps: ['If a student holds this misconception, conduct the "Lamp-Ball-Head" activity immediately.', '1) Place lamp (Sun) on table.', '2) Student holds white ball (Moon) at arm\'s length.', '3) Student orbits ball around head (Earth) slowly.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch7_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Moon\'s phases are caused by the Earth\'s shadow falling on the Moon (i.e., they think every phase.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The Moon\'s phases are caused by the Earth\'s shadow falling on the Moon, just like a lunar eclipse but partial." Evaluate this statement.', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'the Moon\'s phases are caused by the Earth\'s shadow falling on the Moon (i', 'every phase is a partial lunar eclipse)'],
                  hint: 'Review the "Lamp-Ball-Head" model from Class 7 (c7_physics_ch06_009) to re-establish that the.',
                  misconception: 'Students believe the Moon\'s phases are caused by the Earth\'s shadow falling on the Moon (i.e., they think every phase is a partial lunar.' }
          ],
            remediations: { 'the-moon-s-phases-are': { steps: ['If a student holds this misconception, conduct the "Lamp-Ball-Head" activity immediately.', '1) Place lamp (Sun) on table.', '2) Student holds white ball (Moon) at arm\'s length.', '3) Student orbits ball around head (Earth) slowly.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch7_10', difficulty: 'standard',
          question: 'A solar eclipse occurs when the Moon passes directly between the Sun and Earth.',
          hint: 'Revisit the pinhole camera and shadow activities from Class 6 (c6_physics_ch11_038.',
          misconception: 'Students often believe a solar eclipse occurs every month at New Moon because they see the Moon "between" Sun and Earth.',
          parts: [
                { id: 'a', prompt: 'The Moon\'s orbit is tilted about 5° relative to Earth\'s orbit around the Sun. Analyze why this tilt prevents a solar eclipse from occurring every New Moon.', answer: 'During most New Moons, the Moon passes above or below the Sun-Earth line',
                  options: ['During most New Moons, the Moon passes above or below the Sun-Earth line', 'The Moon is too far away', 'between'],
                  hint: 'Revisit the pinhole camera and shadow activities from Class 6 (c6_physics_ch11_038.',
                  misconception: 'Students often believe a solar eclipse occurs every month at New Moon because they see the Moon "between" Sun and Earth in 2D textbook.' }
          ],
            remediations: { 'a-solar-eclipse-occurs-every': { steps: ['Use a physical model: Stick a pin (Earth) and a smaller pin (Moon) on a cardboard at a 5° angle.', 'Shine a torch (Sun) from 2 m away.', 'Rotate the Moon pin around Earth pin; students see the Moon\'s shadow (a tiny dot on paper) misses the Earth pin most.', 'Only when the Moon pin crosses the line between torch and Earth pin (the node) does the shadow hit Earth.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch7_11', difficulty: 'standard',
          question: 'Predicting moon phases is the process of determining the Moon\'s illuminated.',
          hint: 'Review the 8-phase sequence (c8_physics_ch7_3) and the lunar month length.',
          misconception: 'Students think the Moon\'s phase cycle is exactly 28 days (4 weeks × 7 days) because they memorize "4 weeks per phase".',
          parts: [
                { id: 'a', prompt: 'If today is a New Moon, what will be the Moon\'s phase after exactly 29.5 days?', answer: 'New Moon',
                  options: ['New Moon', '4 weeks per phase', 'the cycle is 28 days'],
                  hint: 'Review the 8-phase sequence (c8_physics_ch7_3) and the lunar month length (c8_physics_ch7_5) with.',
                  misconception: 'Students think the Moon\'s phase cycle is exactly 28 days (4 weeks × 7 days) because they memorize "4 weeks per phase" from primary school.' },
                { id: 'b', prompt: 'Explain why the Moon\'s phase on a given date shifts by about one day each calendar month (e.g., Full Moon on 1st January, then ~31st January, then ~1st March).', answer: 'The lunar cycle (29.5 days) is shorter than most calendar months (30 or 31 days)',
                  options: ['The lunar cycle (29.5 days) is shorter than most calendar months (30 or 31 days)', 'Moon phases follow calendar months exactly', '4 weeks per phase'],
                  hint: 'Review the 8-phase sequence (c8_physics_ch7_3) and the lunar month length (c8_physics_ch7_5) with.',
                  misconception: 'Students think the Moon\'s phase cycle is exactly 28 days (4 weeks × 7 days) because they memorize "4 weeks per phase" from primary school.' },
                { id: 'c', prompt: 'Today is 10th October and the Moon is a Waxing Gibbous. What phase will it be on 20th October (10 days later)? Show your step-by-step counting.', answer: 'Waning Gibbous',
                  options: ['Waning Gibbous', '4 weeks per phase'],
                  hint: 'Review the 8-phase sequence (c8_physics_ch7_3) and the lunar month length (c8_physics_ch7_5) with.',
                  misconception: 'Students think the Moon\'s phase cycle is exactly 28 days (4 weeks × 7 days) because they memorize "4 weeks per phase" from primary school.' },
                { id: 'd', prompt: 'Compare two prediction methods: (A) Count days forward in the 8-phase cycle. (B) Multiply days by (360°/29.5) to get angular advance.', answer: 'Method A is more practical and equally accurate for Class 8',
                  options: ['Method A is more practical and equally accurate for Class 8', '4 weeks per phase'],
                  hint: 'Review the 8-phase sequence (c8_physics_ch7_3) and the lunar month length (c8_physics_ch7_5) with.',
                  misconception: 'Students think the Moon\'s phase cycle is exactly 28 days (4 weeks × 7 days) because they memorize "4 weeks per phase" from primary school.' }
          ],
            remediations: { 'the-moon-s-phase-cycle': { steps: ['Have the student track the Moon for 2 months in a notebook: draw the phase each night and write the date.', 'After 29-30 days, they will see the pattern repeat at 29.5 days, not 28.', 'Then recalculate: 29.5 ÷ 8 = 3.6875 days per phase.', 'Practice predicting 5, 10, 15 days ahead using this precise value, comparing with their log.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch7_2', difficulty: 'standard',
          question: 'The changing shape of the Moon (phases) is caused by the changing relative.',
          hint: 'Review the Class 6/7 concept that the Moon reflects sunlight (c6_physics_ch12_051.',
          misconception: '**The Earth\'s shadow causes the Moon\'s phases.** Students often believe that the dark part of the Moon is Earth\'s.',
          parts: [
                { id: 'a', prompt: 'A student draws the Sun, Earth, and Moon in a straight line with Earth in the middle. What phase of the Moon would be seen from Earth, and why?', answer: 'The phase would be **Full Moon**',
                  options: ['The phase would be **Full Moon**', 'New Moon', 'Lunar Eclipse'],
                  hint: 'Review the Class 6/7 concept that the Moon reflects sunlight (c6_physics_ch12_051.',
                  misconception: '**The Earth\'s shadow causes the Moon\'s phases.** Students often believe that the dark part of the Moon is Earth\'s shadow falling on it.' },
                { id: 'b', prompt: 'The Moon is at a 90° angle from the Sun as seen from Earth (i.e., the Sun-Earth-Moon angle is 90°).', answer: 'The phase is **First Quarter (or Last Quarter, depending on orbital direction)**',
                  options: ['The phase is **First Quarter (or Last Quarter, depending on orbital direction)**', 'Crescent', 'Gibbous'],
                  hint: 'Review the Class 6/7 concept that the Moon reflects sunlight (c6_physics_ch12_051.',
                  misconception: '**The Earth\'s shadow causes the Moon\'s phases.** Students often believe that the dark part of the Moon is Earth\'s shadow falling on it.' }
          ],
            remediations: { 'the-earth-s-shadow-causes': { steps: ['In a dark room, hold a ball (Moon) near a single lamp (Sun).', 'Observe the ball from arm\'s length (Earth position) — you see phases.', 'Now deliberately cast **your head\'s shadow** on the ball — this is a lunar eclipse, notice it only happens when your.', 'Move the ball slightly above/below the shadow — phases return without any shadow.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch7_3', difficulty: 'standard',
          question: 'The phases of the Moon—New Moon, Crescent, Quarter, Gibbous, and Full Moon—are.',
          hint: 'Review the Class 7 explanation of Moon phases (c7_physics_ch06_009) and the reflection.',
          misconception: 'Students often believe the Moon\'s phases are caused by Earth\'s shadow falling on the Moon (like a lunar eclipse).',
          parts: [
                { id: 'a', prompt: 'What is the name of the Moon phase when the entire sunlit side of the Moon faces Earth, making the Moon appear as a complete bright circle?', answer: 'Full Moon',
                  options: ['Full Moon', 'New Moon', 'Quarter Moon'],
                  hint: 'Review the Class 7 explanation of Moon phases (c7_physics_ch06_009) and the reflection of light.',
                  misconception: 'Students often believe the Moon\'s phases are caused by Earth\'s shadow falling on the Moon (like a lunar eclipse).' },
                { id: 'b', prompt: 'If you observe the Moon in the evening sky and it looks like a thick, convex shape more than half but not fully illuminated, which phase name applies?', answer: 'Waxing Gibbous (or simply Gibbous)',
                  options: ['Waxing Gibbous (or simply Gibbous)', 'Crescent', 'Quarter'],
                  hint: 'Review the Class 7 explanation of Moon phases (c7_physics_ch06_009) and the reflection of light.',
                  misconception: 'Students often believe the Moon\'s phases are caused by Earth\'s shadow falling on the Moon (like a lunar eclipse).' }
          ],
            remediations: { 'the-moon-s-phases-are': { steps: ['Use a ball-on-a-stick (Moon) and a bright lamp (Sun) in a darkened room.', 'Have the student hold the "Moon" at arm\'s length and orbit it around their head (Earth) while watching the lit portion.', 'At each position, ask: "How much of the lit side do you see?" They will see the phases change without any shadow from.', 'Then explicitly contrast: "When does Earth\'s shadow actually hit the Moon?'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch7_4', difficulty: 'standard',
          question: 'Waxing and waning describe the cyclic change in the visible sunlit portion.',
          hint: 'Review the Moon phase diagram from c8_physics_ch7_3 and the reflection concept from.',
          misconception: 'Students often think "waxing" means the Moon is getting physically larger or that the bright side is always on the same.',
          parts: [
                { id: 'a', prompt: 'Why does the Moon appear to change shape (phases) over a month? Explain using the relative positions of the Sun, Earth, and Moon.', answer: 'The Moon does not produce its own light',
                  options: ['The Moon does not produce its own light', 'Earth\'s shadow causes phases', 'the Moon changes shape physically', 'waxing'],
                  hint: 'Review the Moon phase diagram from c8_physics_ch7_3 and the reflection concept from.',
                  misconception: 'Students often think "waxing" means the Moon is getting physically larger or that the bright side is always on the same side.' }
          ],
            remediations: { 'waxing-means-the-moon-is': { steps: ['Use a lamp (Sun), a ball (Moon), and your head (Earth) in a dark room.', 'Hold the ball at arm\'s length and move it counterclockwise around your head (simulating orbit).', 'At each position, note which part of the ball is lit and whether the lit portion visible to you is growing or shrinking.', 'Relate the ball\'s position to the phase names: when the ball moves from between you and the lamp (New) to opposite the.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
