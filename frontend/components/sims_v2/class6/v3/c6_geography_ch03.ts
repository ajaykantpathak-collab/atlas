import type { SimDef } from '../../engine/types';

/** v3 generated — c6_geography_ch03 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_geography_ch03: SimDef = {
    id: 'v3_c6_geography_ch03',
    title: 'Climates of India',
    subtitle: 'This node covers the definition of climate and factors like latitude, altitude, distance.',
    classLevel: 6, subject: 'geography', topic: 'Climates of India',
    chapters: ['c6_geography_ch03'],
    nodeIds: ['c6_geography_ch03_015', 'c6_geography_ch03_016', 'c6_geography_ch03_017', 'c6_geography_ch03_018', 'c6_geography_ch03_019'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you are packing for a trip to Srinagar in December versus Chennai in December; why do you pack heavy.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'It is December. Srinagar needs heavy woolens, Chennai needs light cotton — and a mountaintop sitting near the equator is still freezing. What invisible recipe is setting each temperature?',
        options: ['Latitude, altitude, and distance from the sea mix together to cook the climate of each place', 'Luck — some places are just born cold', 'Only the month decides — same month should mean same temperature', 'Buildings — cities make their own climate from concrete'],
        answer: 'Latitude, altitude, and distance from the sea mix together to cook the climate of each place',
        hook: 'Climate is not random and not decided by one thing. Where a place sits on the globe, how high it rises, and how near the sea it is — each factor adjusts the temperature like a dial.',
    },
    teaching: [
        { title: 'What is Climate? Understanding Long-Term Patterns', text: 'Climate is the long-term pattern of weather conditions—such as temperature, humidity, and rainfall—for a specific region, typically calculated over a period of 30 years or more.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_geography_ch03_015', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Given three mystery cities — one near the equator, one on a high peak, one far inland — predict which is hottest, coldest, and most extreme, then explain each using the climate factors.',
        labels: ['What is Climate? Understanding', 'The Monsoons: India\'s Lifeline', 'Seasons of India: Winter,', 'Climate and Agriculture: How', 'Climate Diversity: From Snow'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_geography_ch03_015', title: 'What is Climate? Understanding Long-Term Patterns',
          caseStudy: { intro: 'Imagine you are packing for a trip to Srinagar in December versus Chennai in December; why do you pack heavy woolens for one and light cotton clothes for the.',
            decisions: [{ prompt: 'What is the minimum time period usually used to determine the climate of a place?', options: [
                { text: 'The climate is typically determined over a period of 30 years or more', outcome: 'The climate is typically determined over a period of 30 years or more.' },
                { text: 'a few days', outcome: 'Not quite — Students often use the terms "weather" and "climate" interchangeably.', reveals: 'students-often-use-the-terms' },
                { text: 'one year', outcome: 'Not quite — Students often use the terms "weather" and "climate" interchangeably.', reveals: 'students-often-use-the-terms' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch03_016', title: 'The Monsoons: India\'s Lifeline',
          caseStudy: { intro: 'Imagine you are standing on a beach on a hot summer afternoon; why does the breeze feel like it’s blowing from the water toward you?',
            decisions: [{ prompt: 'What does the word "monsoon" mean, and where does it come from?', options: [
                { text: 'It comes from the Arabic word "mausim,"', outcome: 'It comes from the Arabic word "mausim," which means "season." A student who guesses "heavy rain".' },
                { text: 'rainy clouds', outcome: 'Not quite — Students often believe that the monsoon is just "rainy clouds" that appear out of nowhere.', reveals: 'the-monsoon-is-just-rainy' },
                { text: 'the monsoon is just "rainy clouds" that appear out of nowhere', outcome: 'Not quite — Students often believe that the monsoon is just "rainy clouds" that appear out of nowhere.', reveals: 'the-monsoon-is-just-rainy' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch03_017', title: 'Seasons of India: Winter, Summer, Monsoon, Post-Monsoon',
          caseStudy: { intro: 'Have you ever noticed that your clothes change from sweaters in December to light cotton shirts in May?',
            decisions: [{ prompt: 'What are the four main seasons experienced in India?', options: [
                { text: 'The four seasons are Winter, Summer, Monsoon, and Post-Monsoon', outcome: 'The four seasons are Winter, Summer, Monsoon, and Post-Monsoon.' },
                { text: 'Summer', outcome: 'Not quite — Students often think "Summer" is the only time the sun is hot, failing to realize that.', reveals: 'summer-is-the-only-time' },
                { text: 'Pre-monsoon', outcome: 'Not quite — Students often think "Summer" is the only time the sun is hot, failing to realize that.', reveals: 'summer-is-the-only-time' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch03_018', title: 'Climate and Agriculture: How Weather Shapes Farming',
          caseStudy: { intro: 'Have you ever wondered why your favorite bowl of rice comes from the wet, warm south or east, while your roti (wheat bread) comes from the cooler, seasonal.',
            decisions: [{ prompt: 'What are the two main climatic conditions required for growing rice?', options: [
                { text: 'Rice requires heavy rainfall (over 100 cm annually) and warm temperatures', outcome: 'Rice requires heavy rainfall (over 100 cm annually) and warm temperatures.' },
                { text: 'monsoon-fed', outcome: 'Not quite — Students often think crops can grow anywhere if farmers just "work hard enough." They fail.', reveals: 'crops-can-grow-anywhere-if' },
                { text: 'work hard enough', outcome: 'Not quite — Students often think crops can grow anywhere if farmers just "work hard enough." They fail.', reveals: 'crops-can-grow-anywhere-if' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch03_019', title: 'Climate Diversity: From Snow to Desert',
          caseStudy: { intro: 'Have you ever wondered why you might need a heavy woolen sweater in Ladakh but a light cotton shirt in Kerala?',
            decisions: [{ prompt: 'Which Indian region is known as a "cold desert" and experiences temperatures as low as minus 30 degrees Celsius?', options: [
                { text: 'Ladakh is the cold desert', outcome: 'Ladakh is the cold desert. A wrong answer here suggests the student is confusing altitude-based.' },
                { text: 'all deserts are hot', outcome: 'Not quite — Students often assume that all deserts are hot. They associate the word "desert" only with sand and.', reveals: 'all-deserts-are-hot' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch03_015', title: 'Use it in the wild',
          caseStudy: { intro: 'A family argues over a holiday: hill station or beach city. Dad insists the beach city must be cooler \'because sea breeze,\' while the daughter claims the hills will be cooler even though they are far from the sea.',
            decisions: [{ prompt: 'Who is closer to right, and why?', options: [
                { text: 'The daughter — altitude cools the air, so a hill station is usually cooler than a low coastal city even though the sea is far away. But Dad\'s sea logic has truth in it: coastal places stay mild with small swings between day and season, while inland cities swing between very hot days and cold ones — the sea moderates rather than simply chills.', outcome: 'Two climate rules are at play: height lowers temperature, and the sea softens extremes — hill stations win on coolness, coastal cities on evenness.' },
                { text: 'Dad is right — anything near the sea is always colder than anywhere inland.', outcome: 'The sea moderates swings but does not make coasts the coldest — a high hill station far inland beats a beach city on coolness.', reveals: 'coast-is-coldest' },
                { text: 'Neither — distance from the sea and height do not affect temperature, only the season does.', outcome: 'Season matters, but geography rewrites it — altitude and the sea\'s moderating pull are exactly why Ooty and Chennai feel so different in the same month.', reveals: 'geography-doesnt-matter' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch03_019', title: 'You made it',
          caseStudy: { intro: 'Every place has a climate recipe: a pinch of latitude, a height of altitude, a splash of sea. Learn the recipe and you can predict a place before you ever visit.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_geography_ch03_015', difficulty: 'standard',
          question: 'Climate is the long-term pattern of weather conditions—such as temperature.',
          hint: 'Review basic concepts of Earth\'s shape and its position relative to the Sun.',
          misconception: 'Students often use the terms "weather" and "climate" interchangeably.',
          parts: [
                { id: 'a', prompt: 'What is the minimum time period usually used to determine the climate of a place?', answer: 'The climate is typically determined over a period of 30 years or more',
                  options: ['The climate is typically determined over a period of 30 years or more', 'a few days', 'one year'],
                  hint: 'Review basic concepts of Earth\'s shape and its position relative to the Sun.',
                  misconception: 'Students often use the terms "weather" and "climate" interchangeably.' }
          ],
            remediations: { 'students-often-use-the-terms': { steps: ['First, ask the student to track the weather for one week and notice how it fluctuates daily.', 'Then, ask them to find the "average" temperature for that week.', 'Finally, explain that climate is just a much longer version of that "average" calculation, spanning 30 years instead.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch03_016', difficulty: 'standard',
          question: 'The monsoon is a seasonal reversal of wind patterns that brings heavy.',
          hint: 'Review the concept of how land heats up faster than water during the day or summer.',
          misconception: 'Students often believe that the monsoon is just "rainy clouds" that appear out of nowhere.',
          parts: [
                { id: 'a', prompt: 'What does the word "monsoon" mean, and where does it come from?', answer: 'It comes from the Arabic word "mausim,"',
                  options: ['It comes from the Arabic word "mausim,"', 'rainy clouds', 'the monsoon is just "rainy clouds" that appear out of nowhere'],
                  hint: 'Review the concept of how land heats up faster than water during the day or summer.',
                  misconception: 'Students often believe that the monsoon is just "rainy clouds" that appear out of nowhere.' },
                { id: 'b', prompt: 'If 75% of India\'s annual rainfall happens between June and September, what would likely happen to farming if the wind direction did not reverse?', answer: 'Identify that crops depend on this 75% of water',
                  options: ['Identify that crops depend on this 75% of water', 'rainy clouds', 'rain happens randomly rather than due to this specific wind pattern', 'the monsoon is just "rainy clouds" that appear out of nowhere'],
                  hint: 'Review the concept of how land heats up faster than water during the day or summer.',
                  misconception: 'Students often believe that the monsoon is just "rainy clouds" that appear out of nowhere.' },
                { id: 'c', prompt: 'Compare the summer monsoon to a giant "delivery system." What is it delivering, and why is it essential?', answer: 'It delivers moisture/water from the ocean to the land',
                  options: ['It delivers moisture/water from the ocean to the land', 'rainy clouds', 'the monsoon is just "rainy clouds" that appear out of nowhere'],
                  hint: 'Review the concept of how land heats up faster than water during the day or summer.',
                  misconception: 'Students often believe that the monsoon is just "rainy clouds" that appear out of nowhere.' }
          ],
            remediations: { 'the-monsoon-is-just-rainy': { steps: ['Draw a simple diagram of a stove (land) and a cold bowl of water (ocean).', 'Explain that the heat over the stove creates an "empty space" that pulls air toward it.', 'Ask them to trace with their finger how the ocean air fills that empty space on the map of India.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch03_016', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the monsoon is just "rainy clouds" that appear out of nowhere.',
          parts: [
                { id: 'a', prompt: 'Is it accurate to say the monsoon is just a rainy season? Why or why not?', answer: 'No, it is a seasonal reversal of winds',
                  options: ['No, it is a seasonal reversal of winds', 'rainy clouds', 'the monsoon is just "rainy clouds" that appear out of nowhere'],
                  hint: 'Review the concept of how land heats up faster than water during the day or summer.',
                  misconception: 'Students often believe that the monsoon is just "rainy clouds" that appear out of nowhere.' }
          ],
            remediations: { 'the-monsoon-is-just-rainy': { steps: ['Draw a simple diagram of a stove (land) and a cold bowl of water (ocean).', 'Explain that the heat over the stove creates an "empty space" that pulls air toward it.', 'Ask them to trace with their finger how the ocean air fills that empty space on the map of India.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch03_017', difficulty: 'standard',
          question: 'The climate of India is divided into four distinct seasons: Winter, Summer.',
          hint: 'Review the calendar and identify when your local region feels coldest and hottest.',
          misconception: 'Students often think "Summer" is the only time the sun is hot, failing to realize that "Pre-monsoon" or Summer.',
          parts: [
                { id: 'a', prompt: 'What are the four main seasons experienced in India?', answer: 'The four seasons are Winter, Summer, Monsoon, and Post-Monsoon',
                  options: ['The four seasons are Winter, Summer, Monsoon, and Post-Monsoon', 'Summer', 'Pre-monsoon'],
                  hint: 'Review the calendar and identify when your local region feels coldest and hottest.',
                  misconception: 'Students often think "Summer" is the only time the sun is hot, failing to realize that "Pre-monsoon" or Summer is specifically defined.' },
                { id: 'b', prompt: 'Why is winter considered the season for rabi crops like wheat and mustard?', answer: 'Winter is the season for these crops',
                  options: ['Winter is the season for these crops', 'Summer', 'Pre-monsoon'],
                  hint: 'Review the calendar and identify when your local region feels coldest and hottest.',
                  misconception: 'Students often think "Summer" is the only time the sun is hot, failing to realize that "Pre-monsoon" or Summer is specifically defined.' }
          ],
            remediations: { 'summer-is-the-only-time': { steps: ['First, draw a circle on a paper representing 12 months.', 'Second, color-code the segments for the four seasons.', 'Third, write one \'key activity\' (e.g., \'Harvest Wheat\') inside the Winter segment.', 'This visual aid connects the time of year to the agricultural outcome.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch03_018', difficulty: 'standard',
          question: 'Climate and agriculture describe the relationship where specific weather.',
          hint: 'Review the definition of precipitation and temperature as climate factors.',
          misconception: 'Students often think crops can grow anywhere if farmers just "work hard enough." They fail to realize that climate is.',
          parts: [
                { id: 'a', prompt: 'What are the two main climatic conditions required for growing rice?', answer: 'Rice requires heavy rainfall (over 100 cm annually) and warm temperatures',
                  options: ['Rice requires heavy rainfall (over 100 cm annually) and warm temperatures', 'monsoon-fed', 'work hard enough', 'crops can grow anywhere if farmers just "work hard enough'],
                  hint: 'Review the definition of precipitation and temperature as climate factors.',
                  misconception: 'Students often think crops can grow anywhere if farmers just "work hard enough." They fail to realize that climate is a biological limit.' },
                { id: 'b', prompt: 'Why is wheat primarily grown in the Northern Plains of India during the \'rabi\' season?', answer: 'Wheat needs moderate rainfall and cool weather during its growth',
                  options: ['Wheat needs moderate rainfall and cool weather during its growth', 'work hard enough', 'crops can grow anywhere if farmers just "work hard enough'],
                  hint: 'Review the definition of precipitation and temperature as climate factors.',
                  misconception: 'Students often think crops can grow anywhere if farmers just "work hard enough." They fail to realize that climate is a biological limit.' },
                { id: 'c', prompt: 'If a farmer in a region with very low rainfall and high heat wants to plant a crop, why might they struggle to grow wheat?', answer: 'Wheat needs moderate rainfall (50-75 cm)',
                  options: ['Wheat needs moderate rainfall (50-75 cm)', 'work hard enough', 'crops can grow anywhere if farmers just "work hard enough'],
                  hint: 'Review the definition of precipitation and temperature as climate factors.',
                  misconception: 'Students often think crops can grow anywhere if farmers just "work hard enough." They fail to realize that climate is a biological limit.' }
          ],
            remediations: { 'crops-can-grow-anywhere-if': { steps: ['Ask the student: "If you move a polar bear to a hot desert, will it survive just because you give it food?" 2.', 'Explain that plants are like animals; they have physical bodies that need specific temperatures to function.', 'Show them a table comparing the "rainfall needs" of rice vs.', 'Have them re-classify a crop based *only* on the rainfall column.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch03_019', difficulty: 'standard',
          question: 'Climate diversity refers to the variations in temperature, humidity, and.',
          hint: 'Review the definitions of "altitude" and "precipitation" in the textbook.',
          misconception: 'Students often assume that all deserts are hot. They associate the word "desert" only with sand and heat (like the.',
          parts: [
                { id: 'a', prompt: 'Which Indian region is known as a "cold desert" and experiences temperatures as low as minus 30 degrees Celsius?', answer: 'Ladakh is the cold desert',
                  options: ['Ladakh is the cold desert', 'all deserts are hot'],
                  hint: 'Review the definitions of "altitude" and "precipitation" in the textbook.',
                  misconception: 'Students often assume that all deserts are hot. They associate the word "desert" only with sand and heat (like the Thar), failing.' },
                { id: 'b', prompt: 'If you were traveling from the Thar Desert to the tropical climate of Kerala, how would you change your packing strategy?', answer: 'Identify Thar as hot/dry (needs loose cotton, sun protection)',
                  options: ['Identify Thar as hot/dry (needs loose cotton, sun protection)', 'dry heat', 'humid heat', 'all deserts are hot'],
                  hint: 'Review the definitions of "altitude" and "precipitation" in the textbook.',
                  misconception: 'Students often assume that all deserts are hot. They associate the word "desert" only with sand and heat (like the Thar), failing.' }
          ],
            remediations: { 'all-deserts-are-hot': { steps: ['Ask the student to define "desert" based on rainfall rather than temperature.', 'Provide a list of characteristics (rainfall < 25cm, extreme temp) and ask them to apply it to both the Sahara and.', 'Confirm they understand that "dryness" is the primary factor, not "heat."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
