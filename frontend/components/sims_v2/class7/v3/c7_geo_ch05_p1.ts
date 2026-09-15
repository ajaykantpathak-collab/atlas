import type { SimDef } from '../../engine/types';

/** v3 generated — c7_geo_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_geo_ch05_p1: SimDef = {
    id: 'v3_c7_geo_ch05_p1',
    title: 'India and Her Neighbours · Part 1/2',
    subtitle: 'This node covers the geographical definition of what constitutes a neighbour (land and.',
    classLevel: 7, subject: 'geography', topic: 'India and Her Neighbours · Part 1/2',
    chapters: ['c7_geo_ch05'],
    nodeIds: ['c7_geo_ch05_001', 'c7_geo_ch05_002', 'c7_geo_ch05_003', 'c7_geo_ch05_004', 'c7_geo_ch05_005', 'c7_geo_ch05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine looking at a large village map where your house is surrounded by immediate adjacent plots and nearby.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Sri Lanka shares not a single kilometre of land border with India — the sea lies between them. So why do geographers still count it among the neighbours of India?',
        options: ['Because it sits just across the narrow Palk Strait — maritime proximity and a shared ocean zone make it a neighbour without a land border', 'They do not — only land borders make neighbours', 'Because it was once joined by a bridge, so it counts forever', 'Because maps are drawn too small to show the gap'],
        answer: 'Because it sits just across the narrow Palk Strait — maritime proximity and a shared ocean zone make it a neighbour without a land border',
        hook: 'Borders are not random ruler lines — many follow nature itself, like the Himalayan crest separating India from China. And neighbourship does not end at the shoreline: rivers and oceans connect countries as much as they divide them.',
    },
    teaching: [
        { title: 'Defining a Neighbour: Land Borders and Beyond', text: 'Defining a neighbour in geography involves understanding both immediate land borders and broader regional proximity that connects countries through shared physical geography, history, and culture.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_geo_ch05_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sort the neighbours of India into two teams — those sharing a land border and those across the water — then trace which natural feature forms each land boundary.',
        labels: ['Defining a Neighbour: Land', 'India\'s Land Boundary: Extent', 'India\'s Maritime Neighbours: Sri', 'India and Pakistan: Shared', 'India and China: Himalayan', 'India and Nepal: Cultural'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_geo_ch05_001', title: 'Defining a Neighbour: Land Borders and Beyond',
          caseStudy: { intro: 'Imagine looking at a large village map where your house is surrounded by immediate adjacent plots and nearby houses across a river or road.',
            decisions: [{ prompt: 'What is the primary physical feature that separates India from its northern land neighbours like China?', options: [
                { text: 'the Himalayan mountain range', outcome: 'The correct answer is the Himalayan mountain range. A wrong answer—such as naming a river or.' },
                { text: 'a river or an ocean', outcome: 'Not quite — Students often think that political borders are purely artificial lines drawn on a map that have.', reveals: 'political-borders-are-purely-artificial' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch05_003', title: 'India\'s Maritime Neighbours: Sri Lanka and Maldives',
          caseStudy: { intro: 'Imagine standing at the very southern tip of India in Tamil Nadu, looking out across the vast, sparkling blue waters of the Indian Ocean towards the horizon.',
            decisions: [{ prompt: 'What is the name of the narrow strip of shallow water that separates India from Sri Lanka?', options: [
                { text: 'the Palk Strait', outcome: 'The correct answer is the Palk Strait. If a student answers "the Arabian Sea" or "the Bay.' },
                { text: 'the Arabian Sea', outcome: 'Not quite — Students often think that Sri Lanka is physically attached to India because of the string.', reveals: 'sri-lanka-is-physically-attached' },
                { text: 'the Bay of Bengal', outcome: 'Not quite — Students often think that Sri Lanka is physically attached to India because of the string.', reveals: 'sri-lanka-is-physically-attached' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a map quiz, Sohail argues that Sri Lanka and the Maldives are \'not really neighbours\' of India because a person cannot walk across to them — only countries sharing a land border count.',
            decisions: [{ prompt: 'How should the class judge his claim?', options: [
                { text: 'Reject it: neighbours include maritime ones — Sri Lanka lies just across the narrow Palk Strait and shares India\'s oceanic space, monsoon systems and sea routes, so proximity across water still makes a neighbour.', outcome: 'This uses the full geographical definition: regional proximity and shared physical systems, not only shared land, define a neighbour.' },
                { text: 'Accept it — a border you cannot walk across is not a real boundary, so island nations are foreigners in every sense.', outcome: 'This ignores maritime geography; the Indian Ocean connects rather than isolates, and Sri Lanka and the Maldives share climate and waters with India.', reveals: 'neighbour-needs-land-border' },
                { text: 'Accept it, because political borders are arbitrary lines anyway and physical features like seas and mountains do not decide them.', outcome: 'Most of India\'s borders follow real landforms — Himalayan crests, river courses — and seas define maritime neighbours, so physical geography is central, not arbitrary.', reveals: 'borders-are-arbitrary' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch05_006', title: 'The bigger picture',
          caseStudy: { intro: 'A neighbour is not just who shares your wall — it is who shares your mountains, rivers, and seas. Water separates the land but not the neighbourhood.',
            decisions: [{ prompt: 'What comes next? India and Her Neighbours · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — India and Her Neighbours · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_geo_ch05_001', difficulty: 'standard',
          question: 'Defining a neighbour in geography involves understanding both immediate land.',
          hint: 'Review c6_geography_ch05_026 to relocate India\'s position on the South Asian map before.',
          misconception: 'Students often think that political borders are purely artificial lines drawn on a map that have nothing to do with.',
          parts: [
                { id: 'a', prompt: 'What is the primary physical feature that separates India from its northern land neighbours like China?', answer: 'the Himalayan mountain range',
                  options: ['the Himalayan mountain range', 'a river or an ocean'],
                  hint: 'Review c6_geography_ch05_026 to relocate India\'s position on the South Asian map before proceeding.',
                  misconception: 'Students often think that political borders are purely artificial lines drawn on a map that have nothing to do with physical geography.' }
          ],
            remediations: { 'political-borders-are-purely-artificial': { steps: ['To fix this, take a physical relief map of India and trace the northern boundary using your finger along the Himalayan.', 'Point out how the elevation drops into neighbouring valleys, showing that nature itself created the separation and the.', 'Explain that political maps are drawn to follow these pre-existing physical landforms.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch05_002', difficulty: 'standard',
          question: 'India\'s land boundary refers to the continuous international frontier.',
          hint: 'Review Class 6 Geography on the Himalayan region and desert regions to understand how.',
          misconception: 'Students often think that India\'s land boundary is a uniform man-made line fenced with barbed wire across its entire.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'India\'s land boundary refers to the continuous international frontier of approximately',
                  options: ['India\'s land boundary refers to the continuous international frontier of approximately', 'Defining a neighbour in geography involves understanding both immediate land borders and', 'Sri Lanka and the Maldives are India\'s two key maritime neighbours, separated from the', 'The shared history and geography of India and Pakistan encompasses contiguous Himalayan'],
                  hint: 'Review Class 6 Geography on the Himalayan region and desert regions to understand how high relief.',
                  misconception: 'Students often think that India\'s land boundary is a uniform man-made line fenced with barbed wire across its entire 15,106 km length.' }
          ],
            remediations: { 'india-s-land-boundary-is': { steps: ['To fix this, look at a physical relief map of India alongside a political border map.', 'Trace India\'s northern frontier over the Himalayan mountain ranges, then trace the eastern border over the hills of the.', 'Note how the border hugs natural contours rather than cutting straight across varied landscapes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch05_003', difficulty: 'standard',
          question: 'Sri Lanka and the Maldives are India\'s two key maritime neighbours, separated.',
          hint: 'Review basic map directions (North, South, East, West) and locate the Arabian Sea, Bay.',
          misconception: 'Students often think that Sri Lanka is physically attached to India because of the string of limestone shoals known.',
          parts: [
                { id: 'a', prompt: 'What is the name of the narrow strip of shallow water that separates India from Sri Lanka?', answer: 'the Palk Strait',
                  options: ['the Palk Strait', 'the Arabian Sea', 'the Bay of Bengal'],
                  hint: 'Review basic map directions (North, South, East, West) and locate the Arabian Sea, Bay of Bengal.',
                  misconception: 'Students often think that Sri Lanka is physically attached to India because of the string of limestone shoals known as Ram Sethu (Adam\'s.' }
          ],
            remediations: { 'sri-lanka-is-physically-attached': { steps: ['To fix this misconception, have the student look at a physical-political map of South Asia and trace the blue water.', 'Explain that Ram Sethu consists of submerged and partially emergent limestone shoals covered by shallow water, not.', 'Emphasize that commercial ships must navigate around Sri Lanka or through dredged channels because a continuous land.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch05_004', difficulty: 'standard',
          question: 'The shared history and geography of India and Pakistan encompasses contiguous.',
          hint: 'Review c6_geography_ch01_003 to understand how river basins span large geographic areas.',
          misconception: 'Students often assume that political borders coincide with distinct physical barriers, believing that the physical.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The shared history and geography of India and Pakistan encompasses contiguous Himalayan',
                  options: ['The shared history and geography of India and Pakistan encompasses contiguous Himalayan', 'Defining a neighbour in geography involves understanding both immediate land borders and', 'India\'s land boundary refers to the continuous international frontier of approximately', 'Sri Lanka and the Maldives are India\'s two key maritime neighbours, separated from the'],
                  hint: 'Review c6_geography_ch01_003 to understand how river basins span large geographic areas.',
                  misconception: 'Students often assume that political borders coincide with distinct physical barriers, believing that the physical geography, soil types.' }
          ],
            remediations: { 'political-borders-coincide-with-distinct': { steps: ['To fix this, guide the student to examine physical and political maps side by side.', 'Have them trace the contour lines of the Thar Desert and the Indus plains across the international boundary using.', 'Emphasize that natural features like deserts, rivers, and mountain foothills are formed by geological and climatic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch05_005', difficulty: 'standard',
          question: 'The Himalayan boundary between India and China is a high-altitude physical.',
          hint: 'Review node c6_geography_ch01_002 to refresh understanding of Himalayan landforms and.',
          misconception: 'Students often think the entire India-China border is a single, uniformly agreed-upon line across flat terrain, similar.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Himalayan boundary between India and China is a high-altitude physical frontier',
                  options: ['The Himalayan boundary between India and China is a high-altitude physical frontier', 'Defining a neighbour in geography involves understanding both immediate land borders and', 'India\'s land boundary refers to the continuous international frontier of approximately', 'Sri Lanka and the Maldives are India\'s two key maritime neighbours, separated from the'],
                  hint: 'Review node c6_geography_ch01_002 to refresh understanding of Himalayan landforms and elevations.',
                  misconception: 'Students often think the entire India-China border is a single, uniformly agreed-upon line across flat terrain, similar to a fence between.' }
          ],
            remediations: { 'the-entire-india-china-border': { steps: ['To fix this, guide the student to examine a physical relief map of northern India in three distinct sections.', 'First, point out the high plateau of Ladakh in the west.', 'Second, look at the middle mountain passes.', 'Third, observe the eastern ranges bordering Arunachal Pradesh and the Brahmaputra valley.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch05_006', difficulty: 'standard',
          question: 'The deep cultural and geographic ties between India and Nepal are shaped.',
          hint: 'Review c6_geography_ch01_002 to re-familiarize yourself with Himalayan geography and.',
          misconception: 'Students often think that the Himalayas act as a total barrier that completely separates India and Nepal culturally and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The deep cultural and geographic ties between India and Nepal are shaped by their shared',
                  options: ['The deep cultural and geographic ties between India and Nepal are shaped by their shared', 'Defining a neighbour in geography involves understanding both immediate land borders and', 'India\'s land boundary refers to the continuous international frontier of approximately', 'Sri Lanka and the Maldives are India\'s two key maritime neighbours, separated from the'],
                  hint: 'Review c6_geography_ch01_002 to re-familiarize yourself with Himalayan geography and valley.',
                  misconception: 'Students often think that the Himalayas act as a total barrier that completely separates India and Nepal culturally and physically.' }
          ],
            remediations: { 'the-himalayas-act-as-a': { steps: ['To fix this, trace the course of major rivers like the Gandak or Kosi on a physical map from their snow-capped sources.', 'Observe how these river valleys serve as natural highways and fertile cradles where people, languages, and religious.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
