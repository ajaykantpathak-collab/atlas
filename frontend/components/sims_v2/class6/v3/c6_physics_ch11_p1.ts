import type { SimDef } from '../../engine/types';

/** v3 generated — c6_physics_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_physics_ch11_p1: SimDef = {
    id: 'v3_c6_physics_ch11_p1',
    title: 'Light: Shadows and Reflections · Part 1/2',
    subtitle: 'This node covers the classification of natural and artificial light sources.',
    classLevel: 6, subject: 'physics', topic: 'Light: Shadows and Reflections · Part 1/2',
    chapters: ['c6_physics_ch11'],
    nodeIds: ['c6_physics_ch11_035', 'c6_physics_ch11_036', 'c6_physics_ch11_037', 'c6_physics_ch11_038', 'c6_physics_ch11_039', 'c6_physics_ch11_040'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you are sitting in your room at night. If you turn off all the switches, why is it suddenly dark?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'On a bright moonlit night, a friend calls the Moon a natural source of light, just like the Sun. Are they right?',
        options: ['No — the Moon only bounces sunlight back to us; a true source makes its own light, like the Sun, stars, or a firefly', 'Yes — anything glowing in the night sky counts as a source', 'Yes — moonlight is made inside the Moon', 'No — the Moon is actually an artificial satellite'],
        answer: 'No — the Moon only bounces sunlight back to us; a true source makes its own light, like the Sun, stars, or a firefly',
        hook: 'Glowing is not the same as producing. Mirrors and the Moon reflect light made elsewhere — while a tiny firefly, glowing by its own chemistry, is a genuine natural source. Artificial sources are the ones humans built, like bulbs and candles.',
    },
    teaching: [
        { title: 'Sources of Light: Natural and Artificial', text: 'Sources of light are objects that emit or produce their own light (natural sources) or objects that have been created to provide illumination (artificial sources).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_physics_ch11_035', title: 'Your mission',
          mission: { widget: 'prism', validate: 'prism:angle=60',
            instruction: 'On the lab: set the light angle to 60° — how does the spectrum shift?.',
        context: 'Sort a jumble of glowing things — Sun, moon, mirror, firefly, candle, phone screen — into emitters, reflectors, natural, and artificial, and defend each label.',
            observePrompt: 'What did the prism interactive show you?' } },
        { type: 'case', nodeId: 'c6_physics_ch11_035', title: 'Sources of Light: Natural and Artificial',
          caseStudy: { intro: 'Imagine you are sitting in your room at night. If you turn off all the switches, why is it suddenly dark?',
            decisions: [{ prompt: 'Which of these is a natural source of light: a lit candle, the Sun, a torch, or a street lamp?', options: [
                { text: 'The Sun is the natural source', outcome: 'The Sun is the natural source. A wrong answer (like choosing a candle) shows the student confuses.' },
                { text: 'things that give light', outcome: 'Not quite — Students often categorize the Moon as a "natural source of light." They see it glowing in the night.', reveals: 'students-often-categorize-the-moon' },
                { text: 'things that exist naturally', outcome: 'Not quite — Students often categorize the Moon as a "natural source of light." They see it glowing in the night.', reveals: 'students-often-categorize-the-moon' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch11_036', title: 'Light Travels in Straight Lines',
          caseStudy: { intro: 'Have you ever tried to look at a light bulb through a garden hose? If the hose is straight, you see the light clearly; if you bend it, the light disappears.',
            decisions: [{ prompt: 'What happens to light when it encounters an obstacle?', options: [
                { text: 'Light is blocked by the obstacle, creating a shadow on the other side', outcome: 'Light is blocked by the obstacle, creating a shadow on the other side because it cannot bend around.' },
                { text: 'light "fills" a room like water fills a bucket, assuming it can go anywhere', outcome: 'Not quite — Students often believe light "fills" a room like water fills a bucket, assuming it can go anywhere.', reveals: 'light-fills-a-room-like' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch11_037', title: 'Transparent, Translucent, and Opaque Materials',
          caseStudy: { intro: 'Imagine you are looking through your bedroom window; why can you see the street clearly, but when you look through a piece of buttered paper or a frosted.',
            decisions: [{ prompt: 'If you hold a piece of plain glass in front of your eyes, what happens to the light coming from the objects on the other side?', options: [
                { text: 'The light passes through the glass almost completely, allowing you to see objects clearly', outcome: 'The light passes through the glass almost completely, allowing you to see objects clearly.' },
                { text: 'if they can see *any* light through an object, it must be transparent', outcome: 'Not quite — Students often think that if they can see *any* light through an object, it must be transparent.', reveals: 'if-they-can-see-any' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch11_038', title: 'Shadow Formation and Its Properties',
          caseStudy: { intro: 'Have you ever noticed your shadow getting longer on the ground as the sun sets?',
            decisions: [{ prompt: 'What are the three essential components required to form a shadow?', options: [
                { text: 'The three components are a light source, an opaque object, and a surface', outcome: 'The three components are a light source, an opaque object, and a surface.' },
                { text: 'by our eyes', outcome: 'Not quite — Students often believe that the shadow is "attached" to the object or is a projection of the.', reveals: 'the-shadow-is-attached-to' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch11_039', title: 'Reflection of Light: Bouncing Off Surfaces',
          caseStudy: { intro: 'Have you ever wondered why you can see your face in a mirror but not in a plain white wall?',
            decisions: [{ prompt: 'What happens to light when it hits a mirror? a) It is destroyed. b) It bounces off the surface. c) It stays inside the mirror.', options: [
                { text: '(b)', outcome: 'The correct answer is (b). A student who chooses (a) or (c) likely thinks of light as an object.' },
                { text: 'reflection', outcome: 'Not quite — Students often believe that "reflection" only happens with mirrors.', reveals: 'reflection-only-happens-with-mirrors' },
                { text: '"reflection" only happens with mirrors', outcome: 'Not quite — Students often believe that "reflection" only happens with mirrors.', reveals: 'reflection-only-happens-with-mirrors' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch11_040', title: 'Images Formed by a Plane Mirror',
          caseStudy: { intro: 'Have you ever noticed that when you comb your hair in front of a mirror, your right hand appears to be your left hand?',
            decisions: [{ prompt: 'What is the special term used to describe why your right hand appears as your left hand in a mirror?', options: [
                { text: 'The term is "lateral inversion." Answering incorrectly often suggests the student', outcome: 'The term is "lateral inversion." Answering incorrectly often suggests the student confuses this.' },
                { text: 'lateral inversion', outcome: 'Not quite — Students often believe that the mirror image is "inverted" (upside down) like a reflection in.', reveals: 'the-mirror-image-is-inverted' },
                { text: 'reflection', outcome: 'Not quite — Students often believe that the mirror image is "inverted" (upside down) like a reflection in.', reveals: 'the-mirror-image-is-inverted' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch11_035', title: 'Use it in the wild',
          caseStudy: { intro: 'On a terrace at night, a friend points at the bright moon and says, \'The Moon is a light source — look how it lights up the whole garden.\' You have a ball and a lamp to prove otherwise.',
            decisions: [{ prompt: 'How does the ball-and-lamp test settle it?', options: [
                { text: 'Switch the lamp on in a dark room and the ball glows — yet switch the lamp off and the ball makes no light of its own. The Moon is the same: it shines only because sunlight bounces off it, so it is a reflector, not a source. A true source — a star, a flame, a torch — produces its own light.', outcome: 'The test separates \'gives out light\' from \'gives back light\' — anything visible by reflected light, like the ball or the Moon, fails the lamp-off check.' },
                { text: 'The friend is right — anything that lights up your garden is by definition a light source.', outcome: 'Brightness is not proof of production — the ball glows under the lamp too, but goes dark the instant the lamp is off, showing it only reflects.', reveals: 'bright-means-source' },
                { text: 'The Moon is half a source — it makes some light and reflects the rest.', outcome: 'It makes none — its entire glow is borrowed sunlight, which the ball-and-lamp demonstration mimics exactly.', reveals: 'moon-is-half-source' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch11_040', title: 'The bigger picture',
          caseStudy: { intro: 'Ask one question of any bright thing: did it make this light, or borrow it? That single test separates every source from every mirror.',
            decisions: [{ prompt: 'What comes next? Light: Shadows and Reflections · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Light: Shadows and Reflections · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'prism', prompt: 'Explore the prism interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'prism', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch11_035', difficulty: 'standard',
          question: 'Sources of light are objects that emit or produce their own light (natural.',
          hint: 'Review the properties of light as an energy form.',
          misconception: 'Students often categorize the Moon as a "natural source of light." They see it glowing in the night sky and assume.',
          parts: [
                { id: 'a', prompt: 'Which of these is a natural source of light: a lit candle, the Sun, a torch, or a street lamp?', answer: 'The Sun is the natural source',
                  options: ['The Sun is the natural source', 'things that give light', 'things that exist naturally'],
                  hint: 'Review the properties of light as an energy form.',
                  misconception: 'Students often categorize the Moon as a "natural source of light." They see it glowing in the night sky and assume it produces its own.' },
                { id: 'b', prompt: 'If you are in a dark room and switch on a study lamp, is the lamp a natural or artificial source of light? Why?', answer: 'It is an artificial source',
                  options: ['It is an artificial source', 'artificial'],
                  hint: 'Review the properties of light as an energy form.',
                  misconception: 'Students often categorize the Moon as a "natural source of light." They see it glowing in the night sky and assume it produces its own.' },
                { id: 'c', prompt: 'No, it is a natural source. Even though it is not a star or the sun, it is a living organism that produces its own light without human help.', answer: '**Correct Answer:** No, a firefly is a natural source of light',
                  options: ['**Correct Answer:** No, a firefly is a natural source of light', 'Yes, because it glows'],
                  hint: 'Review the properties of light as an energy form.',
                  misconception: 'Students often categorize the Moon as a "natural source of light." They see it glowing in the night sky and assume it produces its own.' }
          ],
            remediations: { 'students-often-categorize-the-moon': { steps: ['Ask the student to look at a mirror in a dark room.', 'Explain that if the mirror were a "source," it would glow even in total darkness.', 'Use a flashlight to show that the mirror only "shows" the light from the torch.', 'Conclude that the Moon acts like the mirror, reflecting sunlight, not creating it.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch11_036', difficulty: 'standard',
          question: 'Light is a form of energy that travels in a straight line, known as rectilinear.',
          hint: 'Review the "straight pipe" activity in Chapter 11.',
          misconception: 'Students often believe light "fills" a room like water fills a bucket, assuming it can go anywhere.',
          parts: [
                { id: 'a', prompt: 'What happens to light when it encounters an obstacle?', answer: 'Light is blocked by the obstacle, creating a shadow on the other side',
                  options: ['Light is blocked by the obstacle, creating a shadow on the other side', 'light "fills" a room like water fills a bucket, assuming it can go anywhere'],
                  hint: 'Review the "straight pipe" activity in Chapter 11.',
                  misconception: 'Students often believe light "fills" a room like water fills a bucket, assuming it can go anywhere.' },
                { id: 'b', prompt: 'If you hold a straight pipe and a curved pipe to look at a candle, which one allows you to see the flame and why?', answer: 'Only the straight pipe works',
                  options: ['Only the straight pipe works', 'light "fills" a room like water fills a bucket, assuming it can go anywhere'],
                  hint: 'Review the "straight pipe" activity in Chapter 11.',
                  misconception: 'Students often believe light "fills" a room like water fills a bucket, assuming it can go anywhere.' },
                { id: 'c', prompt: 'A light source is placed in front of a circular ball. If the ball is moved closer to the wall behind it, what happens to the size of the shadow?', answer: 'The shadow size decreases (or becomes sharper)',
                  options: ['The shadow size decreases (or becomes sharper)', 'of blocked light rays', 'light "fills" a room like water fills a bucket, assuming it can go anywhere'],
                  hint: 'Review the "straight pipe" activity in Chapter 11.',
                  misconception: 'Students often believe light "fills" a room like water fills a bucket, assuming it can go anywhere.' }
          ],
            remediations: { 'light-fills-a-room-like': { steps: ['First, ask the student to trace a line from a light source to a wall using a ruler.', 'Then, place a pencil in the middle of that line and ask, "Where does the light go now?" Guide them to see that the.', 'Repeat this with a sheet of paper to show that the shadow is exactly the shape of the part of the paper blocking the.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch11_037', difficulty: 'standard',
          question: 'Materials are classified by how much light they allow to pass through them.',
          hint: 'Review the concept that light travels in straight lines and interacts with matter.',
          misconception: 'Students often think that if they can see *any* light through an object, it must be transparent.',
          parts: [
                { id: 'a', prompt: 'You are given a piece of wax paper. You can see the glow of a flashlight through it, but you cannot see the shape of the flashlight clearly.', answer: 'This is a translucent material',
                  options: ['This is a translucent material', 'allowing some light', 'allowing all light', 'if they can see *any* light through an object, it must be transparent'],
                  hint: 'Review the concept that light travels in straight lines and interacts with matter.',
                  misconception: 'Students often think that if they can see *any* light through an object, it must be transparent.' },
                { id: 'b', prompt: 'Compare a wooden door and a glass window. If you wanted privacy, which material would you choose and why?', answer: 'You would choose the wooden door',
                  options: ['You would choose the wooden door', 'if they can see *any* light through an object, it must be transparent'],
                  hint: 'Review the concept that light travels in straight lines and interacts with matter.',
                  misconception: 'Students often think that if they can see *any* light through an object, it must be transparent.' }
          ],
            remediations: { 'if-they-can-see-any': { steps: ['First, ask the student to hold a clear plastic sheet and a piece of frosted plastic up to a lamp.', 'Ask them to describe what they see (the light bulb) in each case.', 'Point out that in the clear sheet, they can see the shape of the bulb, but in the frosted one, they only see a glow.', 'Emphasize that "seeing the shape clearly" is the test for transparency.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch11_037', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that if they can see *any* light through an object, it must be transparent.',
          parts: [
                { id: 'a', prompt: 'If a material allows a little bit of light to pass but makes everything look like a blurry patch of color, does it behave more like glass or more like a wall?', answer: 'It behaves more like neither, but specifically, it is a translucent material',
                  options: ['It behaves more like neither, but specifically, it is a translucent material', 'if they can see *any* light through an object, it must be transparent'],
                  hint: 'Review the concept that light travels in straight lines and interacts with matter.',
                  misconception: 'Students often think that if they can see *any* light through an object, it must be transparent.' },
                { id: 'b', prompt: 'Create a list of three objects found in your school bag and classify each one as transparent, translucent, or opaque.', answer: 'Acceptable answers include: Plastic scale (transparent), thin plastic file cover',
                  options: ['Acceptable answers include: Plastic scale (transparent), thin plastic file cover', 'if they can see *any* light through an object, it must be transparent'],
                  hint: 'Review the concept that light travels in straight lines and interacts with matter.',
                  misconception: 'Students often think that if they can see *any* light through an object, it must be transparent.' }
          ],
            remediations: { 'if-they-can-see-any': { steps: ['First, ask the student to hold a clear plastic sheet and a piece of frosted plastic up to a lamp.', 'Ask them to describe what they see (the light bulb) in each case.', 'Point out that in the clear sheet, they can see the shape of the bulb, but in the frosted one, they only see a glow.', 'Emphasize that "seeing the shape clearly" is the test for transparency.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch11_038', difficulty: 'standard',
          question: 'A shadow is a dark region created when an opaque object prevents light from.',
          hint: 'Review the properties of materials regarding light transmission.',
          misconception: 'Students often believe that the shadow is "attached" to the object or is a projection of the object\'s surface features.',
          parts: [
                { id: 'a', prompt: 'What are the three essential components required to form a shadow?', answer: 'The three components are a light source, an opaque object, and a surface',
                  options: ['The three components are a light source, an opaque object, and a surface', 'by our eyes'],
                  hint: 'Review the properties of materials regarding light transmission.',
                  misconception: 'Students often believe that the shadow is "attached" to the object or is a projection of the object\'s surface features.' },
                { id: 'b', prompt: 'Why does a shadow appear black or dark even if the object casting it is bright red?', answer: 'A shadow is dark',
                  options: ['A shadow is dark', 'projects', 'no light', 'attached'],
                  hint: 'Review the properties of materials regarding light transmission.',
                  misconception: 'Students often believe that the shadow is "attached" to the object or is a projection of the object\'s surface features.' },
                { id: 'c', prompt: 'If you use a very small, bright bulb as a light source, will you see a penumbra? Why or why not?', answer: 'No, you will only see an umbra (a sharp-edged dark patch)',
                  options: ['No, you will only see an umbra (a sharp-edged dark patch)', 'attached'],
                  hint: 'Review the properties of materials regarding light transmission.',
                  misconception: 'Students often believe that the shadow is "attached" to the object or is a projection of the object\'s surface features.' },
                { id: 'd', prompt: 'Compare the umbra and the penumbra in terms of light blockage.', answer: 'The umbra is the darkest central part where all light from the source is blocked',
                  options: ['The umbra is the darkest central part where all light from the source is blocked', 'attached', 'both parts block the same amount of light'],
                  hint: 'Review the properties of materials regarding light transmission.',
                  misconception: 'Students often believe that the shadow is "attached" to the object or is a projection of the object\'s surface features.' }
          ],
            remediations: { 'the-shadow-is-attached-to': { steps: ['Ask the student to stand in a dark room with a torch pointed at their hand.', 'Ask them: "Can you see the skin texture or the color of your shirt in the shadow on the wall?" Point out that the.', 'Remind them that a shadow is simply a "hole" in the light.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch11_039', difficulty: 'standard',
          question: 'Reflection is the bouncing of light rays off a surface. We see objects only.',
          hint: 'Review the concept of light traveling in straight lines as a "ray."',
          misconception: 'Students often believe that "reflection" only happens with mirrors.',
          parts: [
                { id: 'a', prompt: 'What happens to light when it hits a mirror? a) It is destroyed. b) It bounces off the surface. c) It stays inside the mirror.', answer: 'It bounces off the surface',
                  options: ['It bounces off the surface', 'reflection', '"reflection" only happens with mirrors'],
                  hint: 'Review the concept of light traveling in straight lines as a "ray."',
                  misconception: 'Students often believe that "reflection" only happens with mirrors.' },
                { id: 'b', prompt: 'If a light ray hits a mirror at an angle of 30 degrees, at what angle will it bounce off?', answer: 'The light will bounce off at 30 degrees',
                  options: ['The light will bounce off at 30 degrees', 'reflection', '"reflection" only happens with mirrors'],
                  hint: 'Review the concept of light traveling in straight lines as a "ray."',
                  misconception: 'Students often believe that "reflection" only happens with mirrors.' }
          ],
            remediations: { 'reflection-only-happens-with-mirrors': { steps: ['Ask the student: "If you are in a dark room, can you see a red ball?" When they say "no," ask "why?" Guide them.', 'Explain that everything they see—the wall, the floor, the pen—is reflecting light, but just not in the organized way.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch11_040', difficulty: 'standard',
          question: 'A plane mirror is a flat, smooth reflecting surface that produces an image.',
          hint: 'Review the concept of how shadows are formed by blocking light.',
          misconception: 'Students often believe that the mirror image is "inverted" (upside down) like a reflection in a lake.',
          parts: [
                { id: 'a', prompt: 'If you stand 2 metres in front of a plane mirror, how far behind the mirror does your image appear to be?', answer: 'It appears 2 metres behind the mirror',
                  options: ['It appears 2 metres behind the mirror', '0 metres', '4 metres', 'inverted'],
                  hint: 'Review the concept of how shadows are formed by blocking light.',
                  misconception: 'Students often believe that the mirror image is "inverted" (upside down) like a reflection in a lake.' },
                { id: 'b', prompt: 'Why is an image formed by a plane mirror called a "virtual" image?', answer: 'It is called virtual',
                  options: ['It is called virtual', 'inverted', 'the mirror image is "inverted" (upside down) like a reflection in a lake'],
                  hint: 'Review the concept of how shadows are formed by blocking light.',
                  misconception: 'Students often believe that the mirror image is "inverted" (upside down) like a reflection in a lake.' }
          ],
            remediations: { 'the-mirror-image-is-inverted': { steps: ['Ask the student to stand in front of a mirror and raise their right hand.', 'Ask: "Does the mirror image raise its head or its hand?" Then point to the horizontal side and ask: "Is the hand on the.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
