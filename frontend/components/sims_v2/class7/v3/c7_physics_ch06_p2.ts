import type { SimDef } from '../../engine/types';

/** v3 generated — c7_physics_ch06_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_physics_ch06_p2: SimDef = {
    id: 'v3_c7_physics_ch06_p2',
    title: 'Earth, Moon, and the Sun · Part 2/2',
    subtitle: 'Covers the geometric alignment, shadow formation (umbra, penumbra, antumbra), and types.',
    classLevel: 7, subject: 'physics', topic: 'Earth, Moon, and the Sun · Part 2/2',
    chapters: ['c7_physics_ch06'],
    nodeIds: ['c7_physics_ch06_007', 'c7_physics_ch06_008', 'c7_physics_ch06_009', 'c7_physics_ch06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine standing outside on a sunny afternoon in your school courtyard when suddenly a large playground ball.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'It is noon in India — bright sun overhead — while on the far side of the planet it is midnight. Why can the whole Earth never share daytime at once?',
        options: ['Earth is an opaque spinning sphere — sunlight lights only the half facing it, and rotation carries each side through light and dark in 24 hours', 'Because the Sun is too small to light the whole planet', 'Because clouds cover half the Earth always', 'Because night is a shadow cast by the Moon'],
        answer: 'Earth is an opaque spinning sphere — sunlight lights only the half facing it, and rotation carries each side through light and dark in 24 hours',
        hook: 'The Sun does not travel under the Earth at night — we spin. Earth rotates west to east, turning 360 degrees in 24 hours — a steady 15 degrees every hour. Stop the spin and one hemisphere would burn in endless day while the other froze in endless night.',
    },
    teaching: [
        { title: 'Solar Eclipse: Types and Explanation', text: 'A solar eclipse is an astronomical phenomenon that occurs when the Moon passes directly between the Sun and Earth, casting a shadow on Earth\'s surface and temporarily blocking all or part of the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_physics_ch06_007', title: 'Your mission',
          mission: { widget: 'orbit', validate: 'orbit:speed=50',
            instruction: 'On the lab: raise the orbital speed to 50 — does the orbit hold?.',
        context: 'Take a ball and a torch in a dark room — spin the ball slowly, watch day chase night around it — then compute how many degrees your spot on Earth turns each hour.',
            observePrompt: 'What did the orbit interactive show you?' } },
        { type: 'case', nodeId: 'c7_physics_ch06_007', title: 'Solar Eclipse: Types and Explanation',
          caseStudy: { intro: 'Imagine standing outside on a sunny afternoon in your school courtyard when suddenly a large playground ball is held close to your eye, completely blocking.',
            decisions: [{ prompt: 'Which three celestial bodies must align in a straight line for a solar eclipse to occur?', options: [
                { text: 'The Sun, the Moon, and the Earth must align in that specific order, with the Moon in the', outcome: 'The Sun, the Moon, and the Earth must align in that specific order, with the Moon in the middle.' },
                { text: 'a solar eclipse occurs every single month', outcome: 'Not quite — Students often think that a solar eclipse occurs every single month because the Moon orbits Earth.', reveals: 'a-solar-eclipse-occurs-every' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch06_008', title: 'Lunar Eclipse: Types and Explanation',
          caseStudy: { intro: 'Imagine standing outside on a clear night with a streetlamp behind you, holding your hand out so that your hand casts a shadow on a wall.',
            decisions: [{ prompt: 'What is the correct alignment of the Sun, Earth, and Moon during a lunar eclipse?', options: [
                { text: 'The correct alignment is Sun-Earth-Moon, where the Earth is positioned directly between', outcome: 'The correct alignment is Sun-Earth-Moon, where the Earth is positioned directly between the Sun and.' },
                { text: 'Sun-Moon-Earth', outcome: 'Not quite — Students frequently confuse a lunar eclipse with a solar eclipse by swapping the positions of the.', reveals: 'students-frequently-confuse-a-lunar' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch06_009', title: 'Phases of the Moon: Explanation',
          caseStudy: { intro: 'Look up at the night sky over a few weeks, and you will notice that the Moon changes its visible shape from a thin crescent to a bright full circle and back.',
            decisions: [{ prompt: 'What is the source of light that allows us to see the Moon from Earth during a moonlit night?', options: [
                { text: 'The Sun', outcome: 'The Sun. The Moon does not produce its own light; it acts as a reflector of sunlight.' },
                { text: 'the Moon itself', outcome: 'Not quite — Students often believe that the phases of the Moon are caused by the shadow of the Earth falling.', reveals: 'the-phases-of-the-moon' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'During a video call at lunchtime, Vani\'s cousin in America says it is midnight there. Vani\'s little brother objects: \'The sun must have moved under the Earth to reach them — that is where it goes at night.\'',
            decisions: [{ prompt: 'What actually explains the noon-midnight split?', options: [
                { text: 'The sun stays put; Earth spins west to east on its axis, so the half facing the sun has day while the opposite half sits in Earth\'s own shadow — as India rotates into the light, the other side rotates out of it. One rotation takes about 24 hours.', outcome: 'This swaps apparent motion for real motion: the daily cycle is Earth\'s spin carrying us in and out of sunlight, not the sun travelling around us.' },
                { text: 'The brother is right — every night the sun slips underneath the Earth and re-emerges in the east by morning.', outcome: 'That is a geocentric picture; the spinning-chair illusion makes a stationary sun seem to move, but it is our rotation that carries us away from it.', reveals: 'sun-goes-underneath' },
                { text: 'They are both partly right — it is midnight in America because clouds there are blocking the sun, and it will clear by their morning.', outcome: 'Night is not weather cover; it is the geometric shadow cast by an opaque, rotating Earth — half the planet is always dark.', reveals: 'night-is-clouds' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch06_010', title: 'You made it',
          caseStudy: { intro: 'Day and night are not the Sun coming and going — they are you, riding a spinning planet through a beam of light.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'orbit', prompt: 'Explore the orbit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'orbit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch06_007', difficulty: 'standard',
          question: 'A solar eclipse is an astronomical phenomenon that occurs when the Moon passes.',
          hint: 'Review shadow formation and straight-line light propagation in Class 6 Light topics.',
          misconception: 'Students often think that a solar eclipse occurs every single month because the Moon orbits Earth monthly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A solar eclipse is an astronomical phenomenon that occurs when the Moon passes directly',
                  options: ['A solar eclipse is an astronomical phenomenon that occurs when the Moon passes directly', 'The rotation of the Earth is the spinning of the Earth on its imaginary axis from west to', 'The apparent movement of the Sun across the sky refers to the daily east-to-west motion', 'The revolution of the Earth is the movement of the Earth in a nearly circular or'],
                  hint: 'Review shadow formation and straight-line light propagation in Class 6 Light topics.',
                  misconception: 'Students often think that a solar eclipse occurs every single month because the Moon orbits Earth monthly.' }
          ],
            remediations: { 'a-solar-eclipse-occurs-every': { steps: ['To fix this misconception, hold a globe and move a smaller ball in a tilted circle around it relative to a desk lamp.', 'Show that unless the smaller ball crosses the exact horizontal plane of the lamp and globe, its shadow misses the globe.', 'Emphasize that this tilt is why eclipses are rare events.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that a solar eclipse occurs every single month because the Moon orbits Earth monthly.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "An annular solar eclipse happens when the Moon is closest to Earth (perigee) and blocks the entire Sun." Is this statement correct.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'a solar eclipse occurs every single month'],
                  hint: 'Review shadow formation and straight-line light propagation in Class 6 Light topics.',
                  misconception: 'Students often think that a solar eclipse occurs every single month because the Moon orbits Earth monthly.' }
          ],
            remediations: { 'a-solar-eclipse-occurs-every': { steps: ['To fix this misconception, hold a globe and move a smaller ball in a tilted circle around it relative to a desk lamp.', 'Show that unless the smaller ball crosses the exact horizontal plane of the lamp and globe, its shadow misses the globe.', 'Emphasize that this tilt is why eclipses are rare events.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch06_008', difficulty: 'standard',
          question: 'A lunar eclipse is an astronomical event that occurs when the Earth passes.',
          hint: 'Review shadow properties and straight-line light travel from Class 6 light chapters.',
          misconception: 'Students frequently confuse a lunar eclipse with a solar eclipse by swapping the positions of the Earth and the Moon.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A lunar eclipse is an astronomical event that occurs when the Earth passes directly',
                  options: ['A lunar eclipse is an astronomical event that occurs when the Earth passes directly', 'The rotation of the Earth is the spinning of the Earth on its imaginary axis from west to', 'The apparent movement of the Sun across the sky refers to the daily east-to-west motion', 'The revolution of the Earth is the movement of the Earth in a nearly circular or'],
                  hint: 'Review shadow properties and straight-line light travel from Class 6 light chapters before.',
                  misconception: 'Students frequently confuse a lunar eclipse with a solar eclipse by swapping the positions of the Earth and the Moon.' }
          ],
            remediations: { 'students-frequently-confuse-a-lunar': { steps: ['To fix this, take a torch (Sun) and hold a small ball (Earth) in front of it in a dark room.', 'Place a second, smaller ball (Moon) behind the Earth so that the Earth\'s shadow falls directly on the Moon.', 'Feel the warmth of the torch on the Earth model, and observe that the Moon is safely behind the Earth, hidden in its.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch06_009', difficulty: 'standard',
          question: 'The phases of the moon are the different shapes of the illuminated portion.',
          hint: 'Review how light travels in straight lines and how shadows are formed before attempting.',
          misconception: 'Students often believe that the phases of the Moon are caused by the shadow of the Earth falling on the Moon throughout.',
          parts: [
                { id: 'a', prompt: 'What is the source of light that allows us to see the Moon from Earth during a moonlit night?', answer: 'The Sun',
                  options: ['The Sun', 'the Moon itself'],
                  hint: 'Review how light travels in straight lines and how shadows are formed before attempting phase.',
                  misconception: 'Students often believe that the phases of the Moon are caused by the shadow of the Earth falling on the Moon throughout the month.' },
                { id: 'b', prompt: 'Analyze the scenario: Suppose you observe a First Quarter moon high in the sky during evening hours.', answer: 'Correct Answer: Full Moon',
                  options: ['Correct Answer: Full Moon', 'New Moon'],
                  hint: 'Review how light travels in straight lines and how shadows are formed before attempting phase.',
                  misconception: 'Students often believe that the phases of the Moon are caused by the shadow of the Earth falling on the Moon throughout the month.' }
          ],
            remediations: { 'the-phases-of-the-moon': { steps: ['To correct this, take a small globe or ball (representing the Moon) and a torch (representing the Sun) in a dark room.', 'Have the student stand in place holding the ball while you shine the torch from one side.', 'Walk the ball in a circle around the student\'s head, and have the student observe how different amounts of the lit.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch06_010', difficulty: 'standard',
          question: 'The Earth\'s axis is an imaginary straight line passing through its North and.',
          hint: 'Review c7_physics_ch06_003 to reinforce how Earth moves along its orbital path before.',
          misconception: 'Students often believe that Earth experiences seasons because its elliptical orbit brings it physically closer to the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Earth\'s axis is an imaginary straight line passing through its North and South poles,',
                  options: ['The Earth\'s axis is an imaginary straight line passing through its North and South poles,', 'The rotation of the Earth is the spinning of the Earth on its imaginary axis from west to', 'The apparent movement of the Sun across the sky refers to the daily east-to-west motion', 'The revolution of the Earth is the movement of the Earth in a nearly circular or'],
                  hint: 'Review c7_physics_ch06_003 to reinforce how Earth moves along its orbital path before examining the.',
                  misconception: 'Students often believe that Earth experiences seasons because its elliptical orbit brings it physically closer to the Sun in summer and.' }
          ],
            remediations: { 'earth-experiences-seasons-because-its': { steps: ['To fix this misconception, have the student hold a globe at a 23.5° tilt next to a desk lamp in a dark room.', 'Direct the lamp\'s beam straight at the Southern Hemisphere and ask them to measure the angle and spread of light on the.', 'Emphasize that the Northern Hemisphere receives slanted, spread-out rays in January despite Earth being physically.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
