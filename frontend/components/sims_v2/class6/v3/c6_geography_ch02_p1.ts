import type { SimDef } from '../../engine/types';

/** v3 generated — c6_geography_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_geography_ch02_p1: SimDef = {
    id: 'v3_c6_geography_ch02_p1',
    title: 'Understanding the Weather · Part 1/2',
    subtitle: 'This node covers the distinction between weather and climate. It excludes meteorology.',
    classLevel: 6, subject: 'geography', topic: 'Understanding the Weather · Part 1/2',
    chapters: ['c6_geography_ch02'],
    nodeIds: ['c6_geography_ch02_008', 'c6_geography_ch02_009', 'c6_geography_ch02_010', 'c6_geography_ch02_011', 'c6_geography_ch02_012', 'c6_geography_ch02_013'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you are packing your school bag in the morning. If you see dark clouds, you pack an umbrella—that.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A tourist spends two rainy days in a desert town and announces that the desert has a rainy climate now. What did they get wrong?',
        options: ['Two rainy days are just weather — climate is the average pattern measured over 30 years or more', 'Nothing — rain is rain, wherever it falls', 'They got it wrong because deserts can never have rain at all', 'They should have said season instead of climate'],
        answer: 'Two rainy days are just weather — climate is the average pattern measured over 30 years or more',
        hook: 'Weather is a snapshot of today; climate is the album of many years. One unusual day never rewrites the personality of a place.',
    },
    teaching: [
        { title: 'What is Weather and How It Differs From Climate', text: 'Weather is the short-term state of the atmosphere at a specific time and place, while climate is the average pattern of weather conditions in a region observed over a long period (typically 30 years.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_geography_ch02_008', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort a pile of statements — It is hot today, This region is usually dry, Storm tonight — into weather and climate, and defend each call using the time factor.',
        labels: ['What is Weather', 'Measuring Temperature: Thermometers', 'Rainfall: How We Measure', 'Wind and Air Pressure', 'Weather Instruments and How', 'Recording Weather: Keeping'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_geography_ch02_008', title: 'What is Weather and How It Differs From Climate',
          caseStudy: { intro: 'Imagine you are packing your school bag in the morning. If you see dark clouds, you pack an umbrella—that is checking the *weather*.',
            decisions: [{ prompt: 'What is the most important factor that distinguishes "weather" from "climate"?', options: [
                { text: 'The factor is time', outcome: 'The factor is time. Weather is for a short period (daily/hourly), while climate is the average over.' },
                { text: 'what the weather is like', outcome: 'Not quite — Students often think climate is just "what the weather is like" without realizing the 30-year.', reveals: 'climate-is-just-what-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch02_009', title: 'Measuring Temperature: Thermometers and Scales',
          caseStudy: { intro: 'Have you ever noticed how your mother checks if you have a fever by using a device, or how you feel a difference between the air in the morning and at noon?',
            decisions: [{ prompt: 'What is the primary substance inside the tube of a standard thermometer that allows it to work?', options: [
                { text: 'It uses a liquid like mercury or alcohol', outcome: 'It uses a liquid like mercury or alcohol. A wrong answer suggests the student hasn\'t grasped the.' },
                { text: 'gets hot', outcome: 'Not quite — Students often believe the liquid "gets hot" and therefore moves.', reveals: 'the-liquid-gets-hot-and' },
                { text: 'the liquid "gets hot" and therefore moves', outcome: 'Not quite — Students often believe the liquid "gets hot" and therefore moves.', reveals: 'the-liquid-gets-hot-and' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch02_011', title: 'Wind and Air Pressure: What Drives Weather',
          caseStudy: { intro: 'Have you ever felt a sudden breeze when you open a window, or wondered why a fan makes air move?',
            decisions: [{ prompt: 'What is wind?', options: [
                { text: 'Wind is simply air in motion', outcome: 'Wind is simply air in motion. A student who answers "a type of gas" or "the weather" is confusing.' },
                { text: 'a type of gas', outcome: 'Not quite — Students often believe that "wind creates pressure," when it is actually the opposite: pressure.', reveals: 'wind-creates-pressure' },
                { text: 'the weather', outcome: 'Not quite — Students often believe that "wind creates pressure," when it is actually the opposite: pressure.', reveals: 'wind-creates-pressure' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch02_012', title: 'Weather Instruments and How They Work',
          caseStudy: { intro: 'Imagine you are planning a school picnic and you hear the weather reporter say "it will be windy and cold tomorrow." How do they know that?',
            decisions: [{ prompt: 'Which instrument would you use to find out how much rain fell during a monsoon shower?', options: [
                { text: 'The rain gauge', outcome: 'The rain gauge. If a student answers "thermometer" or "barometer," they are confusing the.' },
                { text: 'thermometer', outcome: 'Not quite — Students often think a thermometer measures "how hot the sun is," rather than the temperature.', reveals: 'a-thermometer-measures-how-hot' },
                { text: 'barometer', outcome: 'Not quite — Students often think a thermometer measures "how hot the sun is," rather than the temperature.', reveals: 'a-thermometer-measures-how-hot' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch02_013', title: 'Recording Weather: Keeping a Weather Diary',
          caseStudy: { intro: 'Have you ever noticed that you need a sweater in the morning but feel hot by the afternoon, or that the wind feels different right before it rains?',
            decisions: [{ prompt: 'What are two examples of observations you should record in your weather diary?', options: [
                { text: 'Temperature and wind direction (or rainfall/cloud cover)', outcome: 'Temperature and wind direction (or rainfall/cloud cover). A wrong answer suggests the student.' },
                { text: 'weather', outcome: 'Not quite — Students often think that "weather" is just whether it is sunny or rainy.', reveals: 'weather-is-just-whether-it' },
                { text: '"weather" is just whether it is sunny or rainy', outcome: 'Not quite — Students often think that "weather" is just whether it is sunny or rainy.', reveals: 'weather-is-just-whether-it' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch02_008', title: 'Use it in the wild',
          caseStudy: { intro: 'A city gets an unusually cold day in the middle of summer. Two students argue: \'See, the climate has changed!\' versus \'That\'s just today being weird.\' Meanwhile a farmer nearby decides whether to plant rice based on last night\'s rain.',
            decisions: [{ prompt: 'Who is using \'weather\' and \'climate\' correctly?', options: [
                { text: 'The second student — weather is what happens today or this week, while climate is the pattern built over about thirty years, so one cold day cannot change a climate. And the farmer should not plant on yesterday\'s rain — crops must match the region\'s long-term climate, not one evening\'s shower.', outcome: 'The words are not interchangeable: windy today is weather, windy every monsoon for decades is climate — decisions about crops and houses follow the second.' },
                { text: 'The first student is right — any unusual day is proof the climate has shifted.', outcome: 'Climate is an average over decades — a single odd day is weather noise, not a climate signal.', reveals: 'odd-day-changes-climate' },
                { text: 'The farmer is right to plant on last night\'s rain — rain is rain, whenever it comes.', outcome: 'Planting must follow the season\'s expected pattern — a stray shower today says nothing about whether the rains will last.', reveals: 'todays-weather-guides-farming' }
            ] }] } },
        { type: 'case', nodeId: 'c6_geography_ch02_013', title: 'The bigger picture',
          caseStudy: { intro: 'Check the sky for weather; check the decades for climate. The umbrella question and the woolen question are answered by two different clocks.',
            decisions: [{ prompt: 'What comes next? Understanding the Weather · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Understanding the Weather · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_geography_ch02_008', difficulty: 'standard',
          question: 'Weather is the short-term state of the atmosphere at a specific time and place.',
          hint: 'Review the basic components of weather: temperature, wind, and rainfall.',
          misconception: 'Students often think climate is just "what the weather is like" without realizing the 30-year requirement.',
          parts: [
                { id: 'a', prompt: 'What is the most important factor that distinguishes "weather" from "climate"?', answer: 'The factor is time',
                  options: ['The factor is time', 'what the weather is like'],
                  hint: 'Review the basic components of weather: temperature, wind, and rainfall.',
                  misconception: 'Students often think climate is just "what the weather is like" without realizing the 30-year requirement.' },
                { id: 'b', prompt: 'If a news reporter says, "Today is very hot in Delhi," are they talking about weather or climate? Why?', answer: 'They are talking about weather',
                  options: ['They are talking about weather', 'what the weather is like'],
                  hint: 'Review the basic components of weather: temperature, wind, and rainfall.',
                  misconception: 'Students often think climate is just "what the weather is like" without realizing the 30-year requirement.' },
                { id: 'c', prompt: 'Analyze this: Why can the weather change within a few hours, but the climate of a place remains mostly the same for years?', answer: 'Weather changes quickly',
                  options: ['Weather changes quickly', 'what the weather is like', 'the atmosphere is static or that climate can shift as easily as a morning breeze'],
                  hint: 'Review the basic components of weather: temperature, wind, and rainfall.',
                  misconception: 'Students often think climate is just "what the weather is like" without realizing the 30-year requirement.' }
          ],
            remediations: { 'climate-is-just-what-the': { steps: ['First, ask the student to define "average." Second, explain that if you have a test every day for a month, your.', 'Third, ask them to identify which one is better for predicting long-term trends.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think climate is just "what the weather is like" without realizing the 30-year requirement.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "The climate of my city was rainy yesterday." Is this logically sound?', answer: 'No, it is illogical',
                  options: ['No, it is illogical', 'The weather in my city was rainy yesterday', 'time duration', 'what the weather is like'],
                  hint: 'Review the basic components of weather: temperature, wind, and rainfall.',
                  misconception: 'Students often think climate is just "what the weather is like" without realizing the 30-year requirement.' }
          ],
            remediations: { 'climate-is-just-what-the': { steps: ['First, ask the student to define "average." Second, explain that if you have a test every day for a month, your.', 'Third, ask them to identify which one is better for predicting long-term trends.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch02_009', difficulty: 'standard',
          question: 'A thermometer is a scientific instrument designed to measure the degree.',
          hint: 'Review the concept of how heat energy affects the movement of particles in a liquid.',
          misconception: 'Students often believe the liquid "gets hot" and therefore moves.',
          parts: [
                { id: 'a', prompt: 'What is the primary substance inside the tube of a standard thermometer that allows it to work?', answer: 'It uses a liquid like mercury or alcohol',
                  options: ['It uses a liquid like mercury or alcohol', 'gets hot', 'the liquid "gets hot" and therefore moves'],
                  hint: 'Review the concept of how heat energy affects the movement of particles in a liquid.',
                  misconception: 'Students often believe the liquid "gets hot" and therefore moves.' },
                { id: 'b', prompt: 'If you take a thermometer out of a cold room and put it into the hot sun, what happens to the liquid inside the tube?', answer: 'The liquid expands and rises up the tube',
                  options: ['The liquid expands and rises up the tube', 'gets hot', 'the liquid "gets hot" and therefore moves'],
                  hint: 'Review the concept of how heat energy affects the movement of particles in a liquid.',
                  misconception: 'Students often believe the liquid "gets hot" and therefore moves.' },
                { id: 'c', prompt: 'You are looking at a thermometer where the liquid level is at the mark \'20\'. If the temperature drops, will the liquid level go above or below the 20 mark?', answer: 'It will go below the 20 mark',
                  options: ['It will go below the 20 mark', 'gets hot', 'the liquid "gets hot" and therefore moves'],
                  hint: 'Review the concept of how heat energy affects the movement of particles in a liquid.',
                  misconception: 'Students often believe the liquid "gets hot" and therefore moves.' },
                { id: 'd', prompt: 'Why is it necessary for the glass tube of a thermometer to have a "narrow bore" (a very thin opening)?', answer: 'A narrow bore makes it easier to see small changes in the volume of the liquid',
                  options: ['A narrow bore makes it easier to see small changes in the volume of the liquid', 'gets hot', 'the liquid "gets hot" and therefore moves'],
                  hint: 'Review the concept of how heat energy affects the movement of particles in a liquid.',
                  misconception: 'Students often believe the liquid "gets hot" and therefore moves.' }
          ],
            remediations: { 'the-liquid-gets-hot-and': { steps: ['Ask the student: "Does the liquid move because it is hot, or does it move because the heat forces it to take up more.', 'Explain that the liquid in the thermometer is just like the air in the balloon—it needs more room when it gets warm.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch02_010', difficulty: 'standard',
          question: 'Rainfall is a type of precipitation measured by an instrument called a rain.',
          hint: 'Review the difference between the \'height\' of an object and the \'space\' it occupies.',
          misconception: 'Students often believe that a rain gauge measures the total volume of rain that falls on an entire city (like \'gallons\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rainfall is a type of precipitation measured by an instrument called a rain gauge',
                  options: ['Rainfall is a type of precipitation measured by an instrument called a rain gauge', 'Weather is the short-term state of the atmosphere at a specific time and place, while', 'A thermometer is a scientific instrument designed to measure the degree of hotness or', 'Wind is the movement of air across the Earth\'s surface, caused by differences in air'],
                  hint: 'Review the difference between the \'height\' of an object and the \'space\' it occupies (volume).',
                  misconception: 'Students often believe that a rain gauge measures the total volume of rain that falls on an entire city (like \'gallons\' or \'buckets\').' }
          ],
            remediations: { 'a-rain-gauge-measures-the': { steps: ['If a student is stuck, explain that we aren\'t counting the \'drops\' of rain, but measuring the \'thickness\' of a water.', 'Ask them: \'If you spill a glass of water on a small tile, it creates a puddle, but if you spill it on the whole floor.', 'The rain gauge helps us measure the thickness of that puddle.\''], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch02_011', difficulty: 'standard',
          question: 'Wind is the movement of air across the Earth\'s surface, caused by differences.',
          hint: 'Review the properties of gases: heating makes them expand.',
          misconception: 'Students often believe that "wind creates pressure," when it is actually the opposite: pressure differences create.',
          parts: [
                { id: 'a', prompt: 'What is wind?', answer: 'Wind is simply air in motion',
                  options: ['Wind is simply air in motion', 'a type of gas', 'the weather', 'wind creates pressure'],
                  hint: 'Review the properties of gases: heating makes them expand.',
                  misconception: 'Students often believe that "wind creates pressure," when it is actually the opposite: pressure differences create wind.' },
                { id: 'b', prompt: 'If a region is very cold, will the air there have high or low pressure?', answer: 'The air will have high pressure',
                  options: ['The air will have high pressure', 'low pressure', 'wind creates pressure'],
                  hint: 'Review the properties of gases: heating makes them expand.',
                  misconception: 'Students often believe that "wind creates pressure," when it is actually the opposite: pressure differences create wind.' },
                { id: 'c', prompt: 'If City A is hot and City B is cold, in which direction will the wind blow?', answer: 'The wind will blow from City B (cold/high pressure) to City A (hot/low pressure)',
                  options: ['The wind will blow from City B (cold/high pressure) to City A (hot/low pressure)', 'high-to-low', 'wind creates pressure'],
                  hint: 'Review the properties of gases: heating makes them expand.',
                  misconception: 'Students often believe that "wind creates pressure," when it is actually the opposite: pressure differences create wind.' },
                { id: 'd', prompt: 'Why does warm air rise?', answer: 'Warm air expands',
                  options: ['Warm air expands', 'because it is fast', 'wind creates pressure'],
                  hint: 'Review the properties of gases: heating makes them expand.',
                  misconception: 'Students often believe that "wind creates pressure," when it is actually the opposite: pressure differences create wind.' }
          ],
            remediations: { 'wind-creates-pressure': { steps: ['Explain the "Crowded Room" analogy: High pressure is a room full of people; low pressure is an empty room.', 'Ask: "If you open the door between them, where do people go?" 3.', 'Confirm they see that people move from full to empty, just as air moves from high to low.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch02_012', difficulty: 'standard',
          question: 'Weather instruments are specialized tools used by meteorologists to measure.',
          hint: 'Review c6_science_measurement_of_length_and_temperature.',
          misconception: 'Students often think a thermometer measures "how hot the sun is," rather than the temperature of the air around us.',
          parts: [
                { id: 'a', prompt: 'Which instrument would you use to find out how much rain fell during a monsoon shower?', answer: 'The rain gauge',
                  options: ['The rain gauge', 'thermometer', 'barometer'],
                  hint: 'Review c6_science_measurement_of_length_and_temperature.',
                  misconception: 'Students often think a thermometer measures "how hot the sun is," rather than the temperature of the air around us.' }
          ],
            remediations: { 'a-thermometer-measures-how-hot': { steps: ['First, ask the student to hold a thermometer in the shade and then in the sun to see the difference.', 'Explain that the instrument measures the heat of the air (the environment) at that specific location.', 'Finally, reinforce that "weather" is about the air right where we are, not the sun\'s actual temperature in space.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_geography_ch02_013', difficulty: 'standard',
          question: 'A weather diary is a personal, ongoing log used to record daily atmospheric.',
          hint: 'Review basic compass points (N, S, E, W) and how to read a thermometer.',
          misconception: 'Students often think that "weather" is just whether it is sunny or rainy.',
          parts: [
                { id: 'a', prompt: 'What are two examples of observations you should record in your weather diary?', answer: 'Temperature and wind direction (or rainfall/cloud cover)',
                  options: ['Temperature and wind direction (or rainfall/cloud cover)', 'weather', '"weather" is just whether it is sunny or rainy'],
                  hint: 'Review basic compass points (N, S, E, W) and how to read a thermometer.',
                  misconception: 'Students often think that "weather" is just whether it is sunny or rainy.' },
                { id: 'b', prompt: 'If you notice that the temperature drops every time the wind starts blowing from the north, what have you successfully created?', answer: 'You have identified a weather pattern',
                  options: ['You have identified a weather pattern', 'weather', '"weather" is just whether it is sunny or rainy'],
                  hint: 'Review basic compass points (N, S, E, W) and how to read a thermometer.',
                  misconception: 'Students often think that "weather" is just whether it is sunny or rainy.' }
          ],
            remediations: { 'weather-is-just-whether-it': { steps: ['Start by reviewing the components of weather.', 'Ask the student to look out the window and list everything they see (e.g., leaves moving = wind, bright sun.', 'Then, help them create a table with these categories to use for their next three entries.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
