import type { SimDef } from '../../engine/types';

/** v3 generated — c6_geography_ch05 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_geography_ch05: SimDef = {
    id: 'v3_c6_geography_ch05',
    title: 'India and Her Neighbours',
    subtitle: 'This node covers the identification and cardinal location of India\'s seven land.',
    classLevel: 6, subject: 'geography', topic: 'India and Her Neighbours',
    chapters: ['c6_geography_ch05'],
    nodeIds: ['c6_geography_ch05_026', 'c6_geography_ch05_028', 'c6_geography_ch05_029', 'c6_geography_ch05_031'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'If you were to invite all your friends to a party, you would start by looking at who lives right next door.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A classmate claims every neighbour of India shares a land border with it. Which two neighbours quietly prove them wrong — and why?',
        options: ['Sri Lanka and the Maldives — they sit across the ocean with water, not land, between them and India', 'China and Nepal — they are separated by tall mountains', 'Pakistan and Bangladesh — their borders were drawn later', 'Bhutan and Myanmar — they are too small to touch India'],
        answer: 'Sri Lanka and the Maldives — they sit across the ocean with water, not land, between them and India',
        hook: 'Neighbours come in two kinds: land neighbours that share a border and island neighbours across the sea. Direction matters too — Pakistan to the west, Myanmar to the east, China and Nepal to the north.',
    },
    teaching: [
        { title: 'Who Are India\'s Neighbours? A Map Overview', text: 'India’s neighbours are the countries that share land borders with India, located in South Asia, along with island nations situated in the nearby Indian Ocean.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_geography_ch05_026', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Stand at the centre of India and turn like a compass — name the neighbour in each direction and mark which two you can only reach by crossing water.',
        labels: ['Who Are India\'s Neighbours?', 'Shared Borders: Pakistan, China,', 'Cultural Links With Neighbouring', 'Trade and Economic Relations', 'India\'s Maritime Neighbours: Sri', 'Geopolitical Significance of India\'s'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_geography_ch05_026', title: 'Who Are India\'s Neighbours? A Map Overview',
          caseStudy: { intro: 'If you were to invite all your friends to a party, you would start by looking at who lives right next door to your house, wouldn\'t you?',
            decisions: [{ prompt: 'Name the two countries that share a border with India to the North.', options: [
                { text: 'The two countries are China and Nepal', outcome: 'The two countries are China and Nepal. A student who misses one or names a country in a different.' },
                { text: 'Seven Sisters', outcome: 'Not quite — Students often confuse the placement of the "Seven Sisters" states in the Northeast with the.', reveals: 'students-often-confuse-the-placement' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch05_027', title: 'Shared Borders: Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar',
          caseStudy: { intro: 'Imagine you are standing on a giant map of India; if you started walking from the Thar Desert and kept walking along the edge of our country, what would you.',
            decisions: [{ prompt: 'Name three countries that share a land border with India.', options: [
                { text: 'Pakistan, China, and Nepal', outcome: 'Pakistan, China, and Nepal. A wrong answer here suggests the student is confusing land neighbors.' },
                { text: 'a border is a physical fence or wall that looks the same everywhere', outcome: 'Not quite — Students often think a border is a physical fence or wall that looks the same everywhere.', reveals: 'a-border-is-a-physical' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch05_028', title: 'Cultural Links With Neighbouring Countries',
          caseStudy: { intro: 'Have you ever visited a friend\'s house and realized you share the same favorite food or festival traditions?',
            decisions: [{ prompt: 'Name one religion that originated in the Indian region and is now shared with countries like Nepal and Sri Lanka.', options: [
                { text: 'Buddhism (or Hinduism)', outcome: 'Buddhism (or Hinduism). A wrong answer suggests the student is guessing or hasn\'t read the text.' },
                { text: 'cultural links', outcome: 'Not quite — Students often confuse "cultural links" with "political alliances" or "trade agreements." They.', reveals: 'students-often-confuse-cultural-links' },
                { text: 'political alliances', outcome: 'Not quite — Students often confuse "cultural links" with "political alliances" or "trade agreements." They.', reveals: 'students-often-confuse-cultural-links' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch05_029', title: 'Trade and Economic Relations With Neighbours',
          caseStudy: { intro: 'Have you ever traded your extra pens for a friend\'s eraser during class? Nations do the same thing on a massive scale!',
            decisions: [{ prompt: 'What is one major item that India provides to Nepal as part of their trade relationship?', options: [
                { text: 'India supplies fuel and manufactured goods to Nepal', outcome: 'India supplies fuel and manufactured goods to Nepal. A wrong answer here suggests the student has.' },
                { text: 'selling', outcome: 'Not quite — Students often think trade is just "selling" things to others.', reveals: 'trade-is-just-selling-things' },
                { text: 'trade is just "selling" things to others', outcome: 'Not quite — Students often think trade is just "selling" things to others.', reveals: 'trade-is-just-selling-things' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch05_030', title: 'India\'s Maritime Neighbours: Sri Lanka, Maldives',
          caseStudy: { intro: 'Imagine you are standing on the southern tip of India looking out at the vast Indian Ocean; have you ever wondered what lies beyond the horizon?',
            decisions: [{ prompt: 'Name the two island nations that are considered India’s maritime neighbours.', options: [
                { text: 'The two nations are Sri Lanka and the Maldives', outcome: 'The two nations are Sri Lanka and the Maldives. A student who misses this suggests they have not.' },
                { text: 'neighbours', outcome: 'Not quite — Students often think "neighbours" must touch the land border of India.', reveals: 'neighbours-must-touch-the-land' },
                { text: '"neighbours" must touch the land border of India', outcome: 'Not quite — Students often think "neighbours" must touch the land border of India.', reveals: 'neighbours-must-touch-the-land' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch05_031', title: 'Geopolitical Significance of India\'s Location',
          caseStudy: { intro: 'Imagine you are playing a board game where you hold the center square.',
            decisions: [{ prompt: 'What are the two major island groups belonging to India that extend its presence into the Indian Ocean?', options: [
                { text: 'The Lakshadweep Islands are in the west (Arabian Sea) and the Andaman and Nicobar Islands', outcome: 'The Lakshadweep Islands are in the west (Arabian Sea) and the Andaman and Nicobar Islands are.' },
                { text: 'geopolitical significance', outcome: 'Not quite — Students often think "geopolitical significance" means military power or fighting, but in this.', reveals: 'geopolitical-significance-means-military-power' },
                { text: 'strategic location', outcome: 'Not quite — Students often think "geopolitical significance" means military power or fighting, but in this.', reveals: 'geopolitical-significance-means-military-power' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch05_026', title: 'Use it in the wild',
          caseStudy: { intro: 'In a map quiz, a student lists India\'s neighbours and is corrected for including Sri Lanka and the Maldives. \'They don\'t share a land border,\' his teammate insists, \'so they aren\'t neighbours.\'',
            decisions: [{ prompt: 'Do island nations count as neighbours?', options: [
                { text: 'Yes — a neighbour is any country lying close, whether across land or across water. A ship sailing south from Kochi reaches an island nation directly, so Sri Lanka and the Maldives are India\'s neighbours just as the land-border countries are; the sea is a connection, not a wall.', outcome: 'India\'s neighbourhood has two kinds — countries sharing land borders and island nations across the sea — and both count on the map and in trade.' },
                { text: 'The teammate is right — neighbours are defined by shared land borders, so islands are out.', outcome: 'Borders across water are still borders — a short sea crossing makes countries neighbours, which is why Sri Lanka sits on India\'s neighbour list.', reveals: 'neighbour-needs-land-border' },
                { text: 'Only the biggest nearby countries count — small island nations are too minor to be called neighbours.', outcome: 'Size does not decide neighbourship — proximity does, and the Maldives is close enough to reach by sea.', reveals: 'small-countries-arent-neighbours' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch05_031', title: 'You made it',
          caseStudy: { intro: 'India has seven land neighbours and two island ones. Know the direction of each, and the map of South Asia falls into place.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_geography_ch05_026', difficulty: 'standard',
          question: 'India’s neighbours are the countries that share land borders with India.',
          hint: 'Review the cardinal directions (North, South, East, West) on a compass rose.',
          misconception: 'Students often confuse the placement of the "Seven Sisters" states in the Northeast with the borders of Myanmar and.',
          parts: [
                { id: 'a', prompt: 'Name the two countries that share a border with India to the North.', answer: 'The two countries are China and Nepal',
                  options: ['The two countries are China and Nepal', 'Seven Sisters'],
                  hint: 'Review the cardinal directions (North, South, East, West) on a compass rose.',
                  misconception: 'Students often confuse the placement of the "Seven Sisters" states in the Northeast with the borders of Myanmar and Bangladesh.' },
                { id: 'b', prompt: 'Explain why Sri Lanka is described as an "island neighbour" rather than a land neighbour.', answer: 'Sri Lanka is an island neighbour',
                  options: ['Sri Lanka is an island neighbour', 'it is too small', 'Seven Sisters'],
                  hint: 'Review the cardinal directions (North, South, East, West) on a compass rose.',
                  misconception: 'Students often confuse the placement of the "Seven Sisters" states in the Northeast with the borders of Myanmar and Bangladesh.' }
          ],
            remediations: { 'students-often-confuse-the-placement': { steps: ['First, have the student trace the outline of India with their finger, pausing at the "neck" of the country.', 'Then, ask them to place a dot for each neighbour, starting from the West (Pakistan) and moving clockwise.', 'Say: "Imagine you are drawing a circle around India; put a sticker on every country you touch on the way."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch05_026', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the placement of the "Seven Sisters" states in the Northeast with the borders of Myanmar and.',
          parts: [
                { id: 'a', prompt: 'Is it accurate to say that all of India’s neighbours share a land border? Justify your answer.', answer: 'No, it is inaccurate',
                  options: ['No, it is inaccurate', 'Seven Sisters'],
                  hint: 'Review the cardinal directions (North, South, East, West) on a compass rose.',
                  misconception: 'Students often confuse the placement of the "Seven Sisters" states in the Northeast with the borders of Myanmar and Bangladesh.' }
          ],
            remediations: { 'students-often-confuse-the-placement': { steps: ['First, have the student trace the outline of India with their finger, pausing at the "neck" of the country.', 'Then, ask them to place a dot for each neighbour, starting from the West (Pakistan) and moving clockwise.', 'Say: "Imagine you are drawing a circle around India; put a sticker on every country you touch on the way."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch05_027', difficulty: 'standard',
          question: 'India’s land borders are the imaginary lines marking the extent of our.',
          hint: 'Review the "India\'s Location" section of the textbook to understand where the country.',
          misconception: 'Students often think a border is a physical fence or wall that looks the same everywhere.',
          parts: [
                { id: 'a', prompt: 'Name three countries that share a land border with India.', answer: 'Pakistan, China, and Nepal',
                  options: ['Pakistan, China, and Nepal', 'a border is a physical fence or wall that looks the same everywhere'],
                  hint: 'Review the "India\'s Location" section of the textbook to understand where the country sits.',
                  misconception: 'Students often think a border is a physical fence or wall that looks the same everywhere.' }
          ],
            remediations: { 'a-border-is-a-physical': { steps: ['First, show the student a photo of the Thar Desert and a photo of the Himalayas.', 'Ask them to point to where these might be on an outline map of India.', 'Then, draw a thick line on the map where these features exist and explain that the border follows these natural shapes.', 'Finally, ask them to find one other border region and guess what the land looks like there.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch05_028', difficulty: 'standard',
          question: 'Cultural links with neighbouring countries refer to the shared historical.',
          hint: 'Review the map of India and its neighbouring countries in Chapter 1.',
          misconception: 'Students often confuse "cultural links" with "political alliances" or "trade agreements." They assume that because.',
          parts: [
                { id: 'a', prompt: 'Name one religion that originated in the Indian region and is now shared with countries like Nepal and Sri Lanka.', answer: 'Buddhism (or Hinduism)',
                  options: ['Buddhism (or Hinduism)', 'cultural links', 'political alliances', 'trade agreements'],
                  hint: 'Review the map of India and its neighbouring countries in Chapter 1.',
                  misconception: 'Students often confuse "cultural links" with "political alliances" or "trade agreements." They assume that because countries are.' },
                { id: 'b', prompt: 'How does the shared history of Buddhism impact the relationship between India and Sri Lanka?', answer: 'It creates a common cultural heritage',
                  options: ['It creates a common cultural heritage', 'cultural links', 'political alliances', 'trade agreements'],
                  hint: 'Review the map of India and its neighbouring countries in Chapter 1.',
                  misconception: 'Students often confuse "cultural links" with "political alliances" or "trade agreements." They assume that because countries are.' }
          ],
            remediations: { 'students-often-confuse-cultural-links': { steps: ['Ask the student to list three things they share with a friend (like a favorite book or game) that don\'t involve money.', 'Explain that cultural links are like these shared interests between countries.', 'Then, ask them to re-read the specific sentences about Pashupatinath Temple and Buddhism to identify the "shared.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch05_029', difficulty: 'standard',
          question: 'Trade and economic relations refer to the exchange of goods, resources, and.',
          hint: 'Review the map of India and its land neighbors in the chapter introduction.',
          misconception: 'Students often think trade is just "selling" things to others.',
          parts: [
                { id: 'a', prompt: 'What is one major item that India provides to Nepal as part of their trade relationship?', answer: 'India supplies fuel and manufactured goods to Nepal',
                  options: ['India supplies fuel and manufactured goods to Nepal', 'selling', 'trade is just "selling" things to others'],
                  hint: 'Review the map of India and its land neighbors in the chapter introduction.',
                  misconception: 'Students often think trade is just "selling" things to others.' },
                { id: 'b', prompt: 'If Bhutan has a lot of mountain rivers, what is one useful product India might import from them?', answer: 'India imports hydroelectric power',
                  options: ['India imports hydroelectric power', 'selling', 'trade is just "selling" things to others'],
                  hint: 'Review the map of India and its land neighbors in the chapter introduction.',
                  misconception: 'Students often think trade is just "selling" things to others.' }
          ],
            remediations: { 'trade-is-just-selling-things': { steps: ['Ask the student to list three things they buy from a shop and three things they produce at home.', 'Explain that countries act like households that cannot make everything they need.', 'Show them a list of "Imports" and "Exports" for a specific neighbor and ask them to circle which is buying and which.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch05_030', difficulty: 'standard',
          question: 'India’s maritime neighbours are sovereign island nations located in the Indian.',
          hint: 'Review the map of the Indian Ocean in Chapter 2.',
          misconception: 'Students often think "neighbours" must touch the land border of India.',
          parts: [
                { id: 'a', prompt: 'Name the two island nations that are considered India’s maritime neighbours.', answer: 'The two nations are Sri Lanka and the Maldives',
                  options: ['The two nations are Sri Lanka and the Maldives', 'neighbours', '"neighbours" must touch the land border of India'],
                  hint: 'Review the map of the Indian Ocean in Chapter 2.',
                  misconception: 'Students often think "neighbours" must touch the land border of India.' },
                { id: 'b', prompt: 'Why do we call Sri Lanka and the Maldives "maritime" neighbours instead of "land" neighbours?', answer: 'They are called maritime neighbours',
                  options: ['They are called maritime neighbours', 'maritime', 'terrestrial', 'neighbours'],
                  hint: 'Review the map of the Indian Ocean in Chapter 2.',
                  misconception: 'Students often think "neighbours" must touch the land border of India.' }
          ],
            remediations: { 'neighbours-must-touch-the-land': { steps: ['Ask the student to visualize their own house.', 'If a neighbor lives across a small river or a road, are they still a neighbor?', 'Explain that "maritime neighbour" simply means a neighbor you reach by crossing the sea, just like a neighbor across.', 'Point to the Palk Strait on the map and explain it as a "sea-street" connecting the two lands.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch05_031', difficulty: 'standard',
          question: 'India’s geopolitical significance refers to the strategic advantage its.',
          hint: 'Review the world map in the NCERT textbook to identify the relative positions of Africa.',
          misconception: 'Students often think "geopolitical significance" means military power or fighting, but in this context, it refers.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'India’s geopolitical significance refers to the strategic advantage its location',
                  options: ['India’s geopolitical significance refers to the strategic advantage its location', 'India’s neighbours are the countries that share land borders with India, located in South', 'India’s land borders are the imaginary lines marking the extent of our country\'s', 'Cultural links with neighbouring countries refer to the shared historical, religious, and'],
                  hint: 'Review the world map in the NCERT textbook to identify the relative positions of Africa, Asia, and.',
                  misconception: 'Students often think "geopolitical significance" means military power or fighting, but in this context, it refers to the importance.' }
          ],
            remediations: { 'geopolitical-significance-means-military-power': { steps: ['Ask the student: "If you have a house in the middle of a busy marketplace versus a house in the middle of the desert.', 'Tell them: "We are talking about how trade flows past our borders, not about weapons or soldiers."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
