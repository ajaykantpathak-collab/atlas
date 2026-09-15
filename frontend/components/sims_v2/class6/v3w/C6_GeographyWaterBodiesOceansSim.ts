import type { SimDef } from '../../engine/types';
import C6_GeographyWaterBodiesOceansSim from '../../../simulations/c6_12/C6_GeographyWaterBodiesOceansSim';

/** v3 wrapped master — C6_GeographyWaterBodiesOceansSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_geographywaterbodiesoceanssim: SimDef = {
    id: 'v3w_c6_geographywaterbodiesoceanssim',
    title: 'Water Bodies Oceans',
    subtitle: 'This node covers the basic mechanism of seasonal wind reversal and the importance of the.',
    classLevel: 6, subject: 'geography', topic: 'The Monsoons: India\'s Lifeline',
    chapters: [],
    nodeIds: ['c6_geography_ch03_016', 'c6_geography_ch03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine you are standing on a beach on a hot summer afternoon; why does the breeze feel like it’s blowing.', goal: 'Master Water Bodies Oceans.' },
    discovery: {
        question: 'What does the word "monsoon" mean, and where does it come from?',
        options: ['It comes from the Arabic word "mausim,"', 'rainy clouds', 'the monsoon is just "rainy clouds" that appear out of nowhere'],
        answer: 'It comes from the Arabic word "mausim,"',
        hook: 'Students often believe that the monsoon is just "rainy clouds" that appear out of nowhere.',
    },
    teaching: [
        { title: 'The monsoon is a seasonal reversal of wind.', text: 'The monsoon is a seasonal reversal of wind patterns that brings heavy, life-sustaining rainfall to India between June and September.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_geography_ch03_016', title: 'The monsoon is a seasonal reversal of.',
          scaffold: { problem: 'A farmer in Punjab is worried because the monsoon winds have been delayed by two weeks. How does this affect his water cycle?',
            steps: [
            { text: 'Identify that the monsoon delivers 75% of the annual rainfall.' },
            { text: 'Recognize that delay means the "low pressure" pull is not yet strong enough.' },
            { text: 'Conclude that irrigation systems will have to work harder to compensate for the missing rain.' },
            { text: 'Analyze the stress on groundwater levels.', faded: true, blankAnswer: 'The delay slows down the arrival of moist air, forcing the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_geography_ch03_015', title: 'Climate is the long-term pattern of.',
          scaffold: { problem: 'You are planning a trip to two Indian cities: Ooty (a hill station) and Chennai (a coastal city).',
            steps: [
            { text: 'Identify that Ooty is at a high altitude and Chennai is at sea level near the coast.' },
            { text: 'Apply the principle that altitude lowers temperature (lapse rate).' },
            { text: 'Apply the principle that proximity to the sea moderates temperature.' },
            { text: 'Conclude that Ooty\'s high altitude makes it consistently cooler.', faded: true, blankAnswer: 'Ooty will be cooler because higher altitudes have lower.' }
            ] } },
        { type: 'dissect', nodeId: 'c6_geography_ch03_015', title: 'Identify each idea',
          dissect: { specimen: 'Water Bodies Oceans', spots: [
            { id: 's1', label: 'The monsoon is a seasonal', prompt: 'Which idea is this? — The monsoon is a seasonal reversal of wind patterns that brings heavy, life-sustaining.', answer: 'The monsoon is a seasonal', options: ['The monsoon is a seasonal', 'Climate is the long-term pattern'] },
            { id: 's2', label: 'Climate is the long-term pattern', prompt: 'Which idea is this? — Climate is the long-term pattern of weather conditions—such as temperature, humidity, and.', answer: 'Climate is the long-term pattern', options: ['Climate is the long-term pattern', 'The monsoon is a seasonal'] }
          ] } }
    ],
    explore: { component: C6_GeographyWaterBodiesOceansSim, prompt: 'Explore the interactive — Water Bodies Oceans' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_geography_ch03_016', difficulty: 'standard',
          question: 'The monsoon is a seasonal reversal of wind patterns that brings heavy,.',
          hint: 'Review the concept of how land heats up faster than water during the day or summer.',
          misconception: 'Students often believe that the monsoon is just "rainy clouds" that appear out of nowhere.',
          parts: [
                { id: 'a', prompt: 'What does the word "monsoon" mean, and where does it come from?', answer: 'It comes from the Arabic word "mausim,"',
                  options: ['It comes from the Arabic word "mausim,"', 'rainy clouds', 'the monsoon is just "rainy clouds" that appear out of nowhere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the monsoon is just "rainy clouds" that appear out of nowhere.' },
                { id: 'b', prompt: 'Compare the summer monsoon to a giant "delivery system." What is it delivering, and why is it essential?', answer: 'It delivers moisture/water from the ocean to the land',
                  options: ['It delivers moisture/water from the ocean to the land', 'rainy clouds', 'the monsoon is just "rainy clouds" that appear out of nowhere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the monsoon is just "rainy clouds" that appear out of nowhere.' }
          ],
            remediations: { 'the-monsoon-is-just-rainy': { steps: ['Draw a simple diagram of a stove (land) and a cold bowl of water (ocean).', 'Explain that the heat over the stove creates an "empty space" that pulls air toward it.', 'Ask them to trace with their finger how the ocean air fills that empty space on the map of India.'] } } },
        { type: 'subpart', nodeId: 'c6_geography_ch03_016', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the monsoon is just "rainy clouds" that appear out of nowhere.',
          parts: [
                { id: 'a', prompt: 'Is it accurate to say the monsoon is just a rainy season? Why or why not?', answer: 'No, it is a seasonal reversal of winds',
                  options: ['No, it is a seasonal reversal of winds', 'rainy clouds', 'the monsoon is just "rainy clouds" that appear out of nowhere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the monsoon is just "rainy clouds" that appear out of nowhere.' },
                { id: 'b', prompt: 'Compare the summer monsoon to a giant "delivery system." What is it delivering, and why is it essential?', answer: 'It delivers moisture/water from the ocean to the land',
                  options: ['It delivers moisture/water from the ocean to the land', 'rainy clouds', 'the monsoon is just "rainy clouds" that appear out of nowhere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the monsoon is just "rainy clouds" that appear out of nowhere.' }
          ],
            remediations: { 'the-monsoon-is-just-rainy': { steps: ['Draw a simple diagram of a stove (land) and a cold bowl of water (ocean).', 'Explain that the heat over the stove creates an "empty space" that pulls air toward it.', 'Ask them to trace with their finger how the ocean air fills that empty space on the map of India.'] } } },
        { type: 'subpart', nodeId: 'c6_geography_ch03_015', difficulty: 'standard',
          question: 'Climate is the long-term pattern of weather conditions—such as temperature,.',
          hint: 'Review basic concepts of Earth\'s shape and its position relative to the Sun.',
          misconception: 'Students often use the terms "weather" and "climate" interchangeably.',
          parts: [
                { id: 'a', prompt: 'What is the minimum time period usually used to determine the climate of a place?', answer: 'The climate is typically determined over a period of 30 years or more',
                  options: ['The climate is typically determined over a period of 30 years or more', 'a few days', 'one year'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often use the terms "weather" and "climate" interchangeably.' }
          ],
            remediations: { 'students-often-use-the-terms': { steps: ['First, ask the student to track the weather for one week and notice how it fluctuates daily.', 'Then, ask them to find the "average" temperature for that week.', 'Finally, explain that climate is just a much longer version of that "average" calculation, spanning 30 years instead of.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
