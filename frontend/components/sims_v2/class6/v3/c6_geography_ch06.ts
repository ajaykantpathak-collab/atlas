import type { SimDef } from '../../engine/types';

/** v3 generated — c6_geography_ch06 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_geography_ch06: SimDef = {
    id: 'v3_c6_geography_ch06',
    title: 'Locating Places on the Earth',
    subtitle: 'This node covers what a map is and the roles of scale, symbols, and direction.',
    classLevel: 6, subject: 'geography', topic: 'Locating Places on the Earth',
    chapters: ['c6_geography_ch06'],
    nodeIds: ['c6_geography_ch06_001', 'c6_geography_ch06_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Draw your classroom on paper — a rectangle for the room, small boxes for desks, a mark for the door.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Maps, scale, symbols, and direction', text: 'A map is a representation of an area — or the whole Earth — drawn to scale on a flat surface. Maps use symbols, directions, and a scale to show the location of places and features.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_geography_ch06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['Maps, scale, symbols,', 'Globe, latitude, and longitude'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_geography_ch06_001', title: 'Maps, scale, symbols, and direction',
          caseStudy: { intro: 'Draw your classroom on paper — a rectangle for the room, small boxes for desks, a mark for the door. You just made a map: a place drawn flat, seen from above.',
            decisions: [{ prompt: 'What is a map?', options: [
                { text: 'A flat scaled drawing of a place', outcome: 'A flat scaled drawing of a place. A map is a flat drawing that represents an area or the whole.' },
                { text: 'picture', outcome: 'Not quite — Students often think a map shows things "as big as they are." Everything on a map is shrunken.', reveals: 'a-map-shows-things-as' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch06_002', title: 'Globe, latitude, and longitude',
          caseStudy: { intro: 'A flat map shrinks a round Earth — and a ball squashed flat always stretches at the edges, which is why countries near the poles look stretched on flat maps.',
            decisions: [{ prompt: 'What is a globe?', options: [
                { text: 'A ball-shaped model of the Earth', outcome: 'A ball-shaped model of the Earth. A globe is a three-dimensional spherical model of the Earth that.' },
                { text: 'a big map', outcome: 'Not quite — Students often confuse the two lines — latitude and longitude.', reveals: 'students-often-confuse-the-two' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch06_002', title: 'You made it',
          caseStudy: { intro: 'You finished Locating Places on the Earth — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_geography_ch06_001', difficulty: 'standard',
          question: 'A map is a representation of an area — or the whole Earth — drawn to scale on.',
          hint: 'If stuck, draw a room map together — the scale idea lands when they shrink a real place.',
          misconception: 'Students often think a map shows things "as big as they are." Everything on a map is shrunken by the scale — a 5.',
          parts: [
                { id: 'a', prompt: 'What is a map?', answer: 'A flat scaled drawing of a place',
                  options: ['A flat scaled drawing of a place', 'picture'],
                  hint: 'If stuck, draw a room map together — the scale idea lands when they shrink a real place.',
                  misconception: 'Students often think a map shows things "as big as they are." Everything on a map is shrunken by the scale — a 5 cm road on the page may.' },
                { id: 'b', prompt: 'What is the scale of a map?', answer: 'The shrinking ratio between map and ground',
                  options: ['The shrinking ratio between map and ground', 'scale is the map\'s size'],
                  hint: 'If stuck, draw a room map together — the scale idea lands when they shrink a real place.',
                  misconception: 'Students often think a map shows things "as big as they are." Everything on a map is shrunken by the scale — a 5 cm road on the page may.' },
                { id: 'c', prompt: 'Why do maps use symbols instead of drawing things as they look?', answer: 'Real features cannot fit at map size',
                  options: ['Real features cannot fit at map size', 'to look nice'],
                  hint: 'If stuck, draw a room map together — the scale idea lands when they shrink a real place.',
                  misconception: 'Students often think a map shows things "as big as they are." Everything on a map is shrunken by the scale — a 5 cm road on the page may.' }
          ],
            remediations: { 'a-map-shows-things-as': { steps: ['If the student confuses map distance with real distance, draw a toy map of the classroom together with the rule "1.', 'Then give two map distances and let them convert both to real ones alone.', 'Finish by asking what the scale would need to be to fit the whole town on the page.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a map shows things "as big as they are." Everything on a map is shrunken by the scale — a 5.',
          parts: [
                { id: 'a', prompt: 'Why does every map carry a north arrow?', answer: 'It fixes the map to real directions',
                  options: ['It fixes the map to real directions', 'it is decoration'],
                  hint: 'If stuck, draw a room map together — the scale idea lands when they shrink a real place.',
                  misconception: 'Students often think a map shows things "as big as they are." Everything on a map is shrunken by the scale — a 5 cm road on the page may.' }
          ],
            remediations: { 'a-map-shows-things-as': { steps: ['If the student confuses map distance with real distance, draw a toy map of the classroom together with the rule "1.', 'Then give two map distances and let them convert both to real ones alone.', 'Finish by asking what the scale would need to be to fit the whole town on the page.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch06_002', difficulty: 'standard',
          question: 'A globe is a three-dimensional spherical model of the Earth showing its true.',
          hint: 'If stuck, revisit "Maps and Scale" — the flat drawing that the globe corrects.',
          misconception: 'Students often confuse the two lines — latitude and longitude.',
          parts: [
                { id: 'a', prompt: 'What is a globe?', answer: 'A ball-shaped model of the Earth',
                  options: ['A ball-shaped model of the Earth', 'a big map'],
                  hint: 'If stuck, revisit "Maps and Scale" — the flat drawing that the globe corrects.',
                  misconception: 'Students often confuse the two lines — latitude and longitude.' }
          ],
            remediations: { 'students-often-confuse-the-two': { steps: ['If the student swaps the two lines, use the ladder image — latitudes are the flat "rungs" of a ladder (lat = flat).', 'Then find one city together by "rung number + long-line number." 3.', 'Finish by having them locate their own town\'s rough coordinates on a globe or map app.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
