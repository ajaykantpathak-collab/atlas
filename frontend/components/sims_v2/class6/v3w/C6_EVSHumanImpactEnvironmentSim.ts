import type { SimDef } from '../../engine/types';
import C6_EVSHumanImpactEnvironmentSim from '../../../simulations/c6_12/C6_EVSHumanImpactEnvironmentSim';

/** v3 wrapped master — C6_EVSHumanImpactEnvironmentSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_evshumanimpactenvironmentsim: SimDef = {
    id: 'v3w_c6_evshumanimpactenvironmentsim',
    title: 'Human Impact Environment',
    subtitle: 'This node covers the classification of changes based on utility and impact.',
    classLevel: 6, subject: 'evs', topic: 'Are All Changes Desirable? Good and Bad Changes',
    chapters: [],
    nodeIds: ['c6_chemistry_ch05_007', 'c6_geography_ch03_019', 'c6_geography_ch02_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever noticed that while you love the smell of a fresh, juicy mango, you feel sad when that same.', goal: 'Master Human Impact Environment.' },
    discovery: {
        question: 'Is the rusting of a bicycle chain a desirable or undesirable change? Why?',
        options: ['It is an undesirable change', 'desirable', '"fast" changes are desirable and "slow" changes are undesirable'],
        answer: 'It is an undesirable change',
        hook: 'Students often think "fast" changes are desirable and "slow" changes are undesirable.',
    },
    teaching: [
        { title: 'A change is considered "desirable" if it.', text: 'A change is considered "desirable" if it provides a benefit or fulfills a human need, while an "undesirable" change is one that causes harm, waste, or unwanted outcomes.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_chemistry_ch05_007', title: 'A change is considered "desirable" if.',
          caseStudy: { intro: 'Have you ever noticed that while you love the smell of a fresh, juicy mango, you feel sad when that same mango sits on the counter too long and becomes squishy.',
            decisions: [{ prompt: 'What is the main difference between a desirable change and an undesirable change?', options: [
                { text: 'A desirable change is one that is useful or beneficial to us, while an undesirable change', outcome: 'A desirable change is one that is useful or beneficial to us, while an undesirable change is one.' },
                { text: '"fast" changes are desirable and "slow" changes are undesirable', outcome: 'Not quite — Students often think "fast" changes are desirable and "slow" changes are undesirable.', reveals: 'fast-changes-are-desirable-and' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_geography_ch03_019', title: 'Climate diversity refers to the.',
          scaffold: { problem: 'A traveler moves from Delhi (Ganga Plain) to Ladakh. What climate shifts do they experience?',
            steps: [
            { text: 'Identify Delhi\'s climate: Moderate, seasonal, generally humid.' },
            { text: 'Identify Ladakh\'s climate: High altitude, cold desert, very dry.' },
            { text: 'Compare temperature: Hot/Warm -> Freezing.' },
            { text: 'Compare moisture: Seasonal rain -> Almost no rain.' },
            { text: 'Interpret: The traveler moves from a fertile plain to a high-altitude, barren, cold landscape.', faded: true, blankAnswer: 'The traveler experiences a drop in temperature and a.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_geography_ch02_014', title: 'Weather is the state of the atmosphere.',
          scaffold: { problem: 'A farmer in Punjab has a field of wheat ready to harvest. The forecast shows heavy rain in 24 hours. What should the farmer do?',
            steps: [
            { text: 'Identify the risk (rain can damage mature wheat).' },
            { text: 'Identify the urgency (rain is coming in 24 hours).' },
            { text: 'Consult the labor/resource availability to expedite harvest.' },
            { text: 'Execute emergency harvesting or store existing grain safely.' },
            { text: 'Protect the yield from moisture.', faded: true, blankAnswer: 'The farmer should hire extra help to harvest the crop.' }
            ] } }
    ],
    explore: { component: C6_EVSHumanImpactEnvironmentSim, prompt: 'Explore the interactive — Human Impact Environment' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_007', difficulty: 'standard',
          question: 'A change is considered "desirable" if it provides a benefit or fulfills a human.',
          hint: 'Review the definitions of physical and chemical changes in the textbook.',
          misconception: 'Students often think "fast" changes are desirable and "slow" changes are undesirable.',
          parts: [
                { id: 'a', prompt: 'Is the rusting of a bicycle chain a desirable or undesirable change? Why?', answer: 'It is an undesirable change',
                  options: ['It is an undesirable change', 'desirable', '"fast" changes are desirable and "slow" changes are undesirable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "fast" changes are desirable and "slow" changes are undesirable.' },
                { id: 'b', prompt: 'If a bowl of milk is left in the sun on a hot day and turns into sour curd, how would you classify this?', answer: 'It depends on the intent',
                  options: ['It depends on the intent', '"fast" changes are desirable and "slow" changes are undesirable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "fast" changes are desirable and "slow" changes are undesirable.' }
          ],
            remediations: { 'fast-changes-are-desirable-and': { steps: ['Ask the student to list three changes: one they like, one they dislike, and one that is neutral.', 'Then, ask them to write one sentence for each explaining *why* it helps or hurts them.', 'This separates the speed of the change from its impact.'] } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "fast" changes are desirable and "slow" changes are undesirable.',
          parts: [
                { id: 'a', prompt: 'Can a change be both desirable and undesirable at the same time? Defend your answer.', answer: 'Yes, it can be, depending on who is affected',
                  options: ['Yes, it can be, depending on who is affected', '"fast" changes are desirable and "slow" changes are undesirable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "fast" changes are desirable and "slow" changes are undesirable.' },
                { id: 'b', prompt: 'Think of a change that happens in your kitchen. Explain why it is desirable and what might happen if we couldn\'t control it.', answer: 'A good answer would be "cooking food." It is desirable',
                  options: ['A good answer would be "cooking food." It is desirable', '"fast" changes are desirable and "slow" changes are undesirable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "fast" changes are desirable and "slow" changes are undesirable.' }
          ],
            remediations: { 'fast-changes-are-desirable-and': { steps: ['Ask the student to list three changes: one they like, one they dislike, and one that is neutral.', 'Then, ask them to write one sentence for each explaining *why* it helps or hurts them.', 'This separates the speed of the change from its impact.'] } } },
        { type: 'subpart', nodeId: 'c6_geography_ch03_019', difficulty: 'standard',
          question: 'Climate diversity refers to the variations in temperature, humidity, and.',
          hint: 'Review the definitions of "altitude" and "precipitation" in the textbook.',
          misconception: 'Students often assume that all deserts are hot. They associate the word "desert" only with sand and heat (like the.',
          parts: [
                { id: 'a', prompt: 'Which Indian region is known as a "cold desert" and experiences temperatures as low as minus 30 degrees Celsius?', answer: 'Ladakh is the cold desert',
                  options: ['Ladakh is the cold desert', 'all deserts are hot'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that all deserts are hot. They associate the word "desert" only with sand and heat (like the Thar), failing to.' }
          ],
            remediations: { 'all-deserts-are-hot': { steps: ['Ask the student to define "desert" based on rainfall rather than temperature.', 'Provide a list of characteristics (rainfall < 25cm, extreme temp) and ask them to apply it to both the Sahara and.', 'Confirm they understand that "dryness" is the primary factor, not "heat."'] } } },
        { type: 'subpart', nodeId: 'c6_geography_ch03_019', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that all deserts are hot. They associate the word "desert" only with sand and heat (like the.',
          parts: [
                { id: 'a', prompt: 'Is it accurate to describe all of India as having a single "hot" climate? Why or why not?', answer: 'No, because India’s climate is diverse',
                  options: ['No, because India’s climate is diverse', 'all deserts are hot'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that all deserts are hot. They associate the word "desert" only with sand and heat (like the Thar), failing to.' }
          ],
            remediations: { 'all-deserts-are-hot': { steps: ['Ask the student to define "desert" based on rainfall rather than temperature.', 'Provide a list of characteristics (rainfall < 25cm, extreme temp) and ask them to apply it to both the Sahara and.', 'Confirm they understand that "dryness" is the primary factor, not "heat."'] } } },
        { type: 'subpart', nodeId: 'c6_geography_ch02_014', difficulty: 'standard',
          question: 'Weather is the state of the atmosphere at a specific place and time, involving.',
          hint: 'Review basic definitions of "atmosphere" and "environment."',
          misconception: 'Students often think weather is only about temperature (hot or cold).',
          parts: [
                { id: 'a', prompt: 'Why do farmers watch the weather forecast before they harvest their wheat crop?', answer: 'Farmers watch the forecast',
                  options: ['Farmers watch the forecast', 'to see if it\'s hot', 'weather is only about temperature (hot or cold)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think weather is only about temperature (hot or cold).' },
                { id: 'b', prompt: 'How does weather influence the mode of transport a fisherman chooses for his day at sea?', answer: 'Fishermen must check for storms',
                  options: ['Fishermen must check for storms', 'to see if there are many fish', 'weather is only about temperature (hot or cold)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think weather is only about temperature (hot or cold).' },
                { id: 'c', prompt: 'If you are planning a school picnic, why is checking the weather report essential for your safety and fun?', answer: 'First, identify the planned location and duration',
                  options: ['First, identify the planned location and duration', 'weather is only about temperature (hot or cold)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think weather is only about temperature (hot or cold).' }
          ],
            remediations: { 'weather-is-only-about-temperature': { steps: ['First, ask the student to observe the sky for one week and record not just the temperature, but also if it is windy,.', 'Second, ask them to find one news story where wind or rain affected a person\'s plans.', 'Third, discuss how these non-temperature factors change our daily routine.'] } } },
        { type: 'subpart', nodeId: 'c6_geography_ch02_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think weather is only about temperature (hot or cold).',
          parts: [
                { id: 'a', prompt: '"Weather is just about whether we need an umbrella or not." Do you agree with this statement? Defend your answer.', answer: 'I disagree',
                  options: ['I disagree', 'weather is only about temperature (hot or cold)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think weather is only about temperature (hot or cold).' }
          ],
            remediations: { 'weather-is-only-about-temperature': { steps: ['First, ask the student to observe the sky for one week and record not just the temperature, but also if it is windy,.', 'Second, ask them to find one news story where wind or rain affected a person\'s plans.', 'Third, discuss how these non-temperature factors change our daily routine.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
