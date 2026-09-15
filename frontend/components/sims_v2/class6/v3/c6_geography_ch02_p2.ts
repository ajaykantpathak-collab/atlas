import type { SimDef } from '../../engine/types';

/** v3 generated — c6_geography_ch02_p2 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_geography_ch02_p2: SimDef = {
    id: 'v3_c6_geography_ch02_p2',
    title: 'Understanding the Weather · Part 2/2',
    subtitle: 'This node covers the daily impact of weather on human life and economic activities like.',
    classLevel: 6, subject: 'geography', topic: 'Understanding the Weather · Part 2/2',
    chapters: ['c6_geography_ch02'],
    nodeIds: ['c6_geography_ch02_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Think about the last time you decided what to wear to school—did you check if it was raining or sunny?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A tourist spends two rainy days in a desert town and announces that the desert has a rainy climate now. What did they get wrong?',
        options: ['Two rainy days are just weather — climate is the average pattern measured over 30 years or more', 'Nothing — rain is rain, wherever it falls', 'They got it wrong because deserts can never have rain at all', 'They should have said season instead of climate'],
        answer: 'Two rainy days are just weather — climate is the average pattern measured over 30 years or more',
        hook: 'Weather is a snapshot of today; climate is the album of many years. One unusual day never rewrites the personality of a place.',
    },
    teaching: [
        { title: 'Weather and Its Effect on Daily Life', text: 'Weather is the state of the atmosphere at a specific place and time, involving conditions like temperature, rainfall, and wind.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_geography_ch02_014', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort a pile of statements — It is hot today, This region is usually dry, Storm tonight — into weather and climate, and defend each call using the time factor.',
        labels: ['Weather and Its Effect'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_geography_ch02_014', title: 'Weather and Its Effect on Daily Life',
          caseStudy: { intro: 'Think about the last time you decided what to wear to school—did you check if it was raining or sunny?',
            decisions: [{ prompt: 'Why do farmers watch the weather forecast before they harvest their wheat crop?', options: [
                { text: 'Farmers watch the forecast', outcome: 'Farmers watch the forecast because unexpected rain during the harvest can ruin the quality of the.' },
                { text: 'to see if it\'s hot', outcome: 'Not quite — Students often think weather is only about temperature (hot or cold).', reveals: 'weather-is-only-about-temperature' },
                { text: 'weather is only about temperature (hot or cold)', outcome: 'Not quite — Students often think weather is only about temperature (hot or cold).', reveals: 'weather-is-only-about-temperature' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch02_014', title: 'Use it in the wild',
          caseStudy: { intro: 'A city gets an unusually cold day in the middle of summer. Two students argue: \'See, the climate has changed!\' versus \'That\'s just today being weird.\' Meanwhile a farmer nearby decides whether to plant rice based on last night\'s rain.',
            decisions: [{ prompt: 'Who is using \'weather\' and \'climate\' correctly?', options: [
                { text: 'The second student — weather is what happens today or this week, while climate is the pattern built over about thirty years, so one cold day cannot change a climate. And the farmer should not plant on yesterday\'s rain — crops must match the region\'s long-term climate, not one evening\'s shower.', outcome: 'The words are not interchangeable: windy today is weather, windy every monsoon for decades is climate — decisions about crops and houses follow the second.' },
                { text: 'The first student is right — any unusual day is proof the climate has shifted.', outcome: 'Climate is an average over decades — a single odd day is weather noise, not a climate signal.', reveals: 'odd-day-changes-climate' },
                { text: 'The farmer is right to plant on last night\'s rain — rain is rain, whenever it comes.', outcome: 'Planting must follow the season\'s expected pattern — a stray shower today says nothing about whether the rains will last.', reveals: 'todays-weather-guides-farming' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch02_014', title: 'You made it',
          caseStudy: { intro: 'Check the sky for weather; check the decades for climate. The umbrella question and the woolen question are answered by two different clocks.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_geography_ch02_014', difficulty: 'standard',
          question: 'Weather is the state of the atmosphere at a specific place and time, involving.',
          hint: 'Review basic definitions of "atmosphere" and "environment."',
          misconception: 'Students often think weather is only about temperature (hot or cold).',
          parts: [
                { id: 'a', prompt: 'Why do farmers watch the weather forecast before they harvest their wheat crop?', answer: 'Farmers watch the forecast',
                  options: ['Farmers watch the forecast', 'to see if it\'s hot', 'weather is only about temperature (hot or cold)'],
                  hint: 'Review basic definitions of "atmosphere" and "environment."',
                  misconception: 'Students often think weather is only about temperature (hot or cold).' },
                { id: 'b', prompt: 'How does weather influence the mode of transport a fisherman chooses for his day at sea?', answer: 'Fishermen must check for storms',
                  options: ['Fishermen must check for storms', 'to see if there are many fish', 'weather is only about temperature (hot or cold)'],
                  hint: 'Review basic definitions of "atmosphere" and "environment."',
                  misconception: 'Students often think weather is only about temperature (hot or cold).' },
                { id: 'c', prompt: 'If you are planning a school picnic, why is checking the weather report essential for your safety and fun?', answer: 'First, identify the planned location and duration',
                  options: ['First, identify the planned location and duration', 'weather is only about temperature (hot or cold)'],
                  hint: 'Review basic definitions of "atmosphere" and "environment."',
                  misconception: 'Students often think weather is only about temperature (hot or cold).' }
          ],
            remediations: { 'weather-is-only-about-temperature': { steps: ['First, ask the student to observe the sky for one week and record not just the temperature, but also if it is windy.', 'Second, ask them to find one news story where wind or rain affected a person\'s plans.', 'Third, discuss how these non-temperature factors change our daily routine.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch02_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think weather is only about temperature (hot or cold).',
          parts: [
                { id: 'a', prompt: '"Weather is just about whether we need an umbrella or not." Do you agree with this statement? Defend your answer.', answer: 'I disagree',
                  options: ['I disagree', 'weather is only about temperature (hot or cold)'],
                  hint: 'Review basic definitions of "atmosphere" and "environment."',
                  misconception: 'Students often think weather is only about temperature (hot or cold).' }
          ],
            remediations: { 'weather-is-only-about-temperature': { steps: ['First, ask the student to observe the sky for one week and record not just the temperature, but also if it is windy.', 'Second, ask them to find one news story where wind or rain affected a person\'s plans.', 'Third, discuss how these non-temperature factors change our daily routine.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
