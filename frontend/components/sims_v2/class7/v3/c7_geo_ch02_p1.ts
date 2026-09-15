import type { SimDef } from '../../engine/types';

/** v3 generated — c7_geo_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_geo_ch02_p1: SimDef = {
    id: 'v3_c7_geo_ch02_p1',
    title: 'Understanding the Weather · Part 1/2',
    subtitle: 'Covers the definition of weather and its primary individual elements (temperature.',
    classLevel: 7, subject: 'geography', topic: 'Understanding the Weather · Part 1/2',
    chapters: ['c7_geo_ch02'],
    nodeIds: ['c7_geo_ch02_001', 'c7_geo_ch02_002', 'c7_geo_ch02_003', 'c7_geo_ch02_004', 'c7_geo_ch02_005', 'c7_geo_ch02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Look out your window on a hot summer morning in Delhi; you might see clear blue skies, but by late afternoon.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'On a clear, still winter morning a friend looks outside and announces there is no weather today. What are they completely missing?',
        options: ['Weather is always happening — temperature, wind, humidity, and pressure are all at work even when the sky is calm', 'Nothing — calm air really does mean no weather', 'They are right — weather only exists when it rains or storms', 'Weather only counts at night'],
        answer: 'Weather is always happening — temperature, wind, humidity, and pressure are all at work even when the sky is calm',
        hook: 'Weather is not just rain-versus-shine. It is the combined state of all the elements of the atmosphere at once — which is why two neighbouring cities can have completely different weather on the very same afternoon.',
    },
    teaching: [
        { title: 'Weather: Definition and Elements', text: 'Weather is the day-to-day state of the atmosphere at a specific place and time, characterized by changes in elements such as temperature, humidity, wind, and precipitation.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_geo_ch02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Build a school weather chart — track temperature, wind, humidity, and rainfall twice a day — and catch the atmosphere changing even on the quietest days.',
        labels: ['Weather: Definition and Elements', 'Atmosphere: Layers and Composition', 'Temperature: Measurement and Factors', 'Humidity: Measurement and Its', 'Wind: Causes and Types', 'Rainfall: Types and Measurement'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_geo_ch02_001', title: 'Weather: Definition and Elements',
          caseStudy: { intro: 'Look out your window on a hot summer morning in Delhi; you might see clear blue skies, but by late afternoon, sudden dark clouds and a cool gust of wind can.',
            decisions: [{ prompt: 'What is the primary difference between weather and climate when observing an Indian state over different time frames?', options: [
                { text: 'Weather refers to short-term, day-to-day atmospheric conditions, whereas climate', outcome: 'Weather refers to short-term, day-to-day atmospheric conditions, whereas climate represents.' },
                { text: 'weather', outcome: 'Not quite — Students often think that "weather" only refers to whether it is raining or sunny, completely.', reveals: 'weather-only-refers-to-whether' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch02_002', title: 'Atmosphere: Layers and Composition',
          caseStudy: { intro: 'When you look up at the sky on a clear afternoon in Delhi or look out over the Himalayan peaks, it feels like the air goes on forever without a boundary.',
            decisions: [{ prompt: 'Which gas makes up the largest percentage of the Earth\'s atmosphere by volume?', options: [
                { text: 'Nitrogen, which makes up approximately 78% of the atmosphere', outcome: 'Nitrogen, which makes up approximately 78% of the atmosphere. A student who answers "Oxygen" has.' },
                { text: 'Oxygen', outcome: 'Not quite — Students often believe that the atmosphere ends abruptly at a certain height where space begins.', reveals: 'the-atmosphere-ends-abruptly-at' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c7_geo_ch02_003', title: 'Temperature: Measurement and Factors Affecting It',
          scaffold: { problem: 'A trekker starts at Haridwar (altitude 300 meters) where the temperature is 28°C and climbs up to Chopta (altitude 3,000 meters).',
            steps: [
            { text: 'Identify the starting temperature (28°C) and starting altitude (300 m) at Haridwar.' },
            { text: 'Calculate the total change in altitude between Chopta and Haridwar: 3,000 m - 300 m = 2,700 meters.' },
            { text: 'Apply the lapse rate (decrease of 6.5°C per 1,000 meters): (2,700 / 1,000) * 6.5°C = 2.7 * 6.5 = 17.55°C temperature.' },
            { text: 'Subtract the total drop from the starting temperature: 28°C - 17.55°C = 10.45°C.' },
            { text: 'Verify that temperature decreases with increasing altitude in mountainous terrain.', faded: true, blankAnswer: 'The expected temperature at Chopta is approximately 10.45°C.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_geo_ch02_004', title: 'Humidity: Measurement and Its Role in Weather',
          scaffold: { problem: 'During a humid monsoon day in Kolkata, a weather station measures that 1 cubic metre of air contains 20 grams of water vapour.',
            steps: [
            { text: 'Identify the current water vapour content in the air (20 g/m³).' },
            { text: 'Identify the maximum water vapour capacity at 25°C (25 g/m³).' },
            { text: 'Set up the formula for relative humidity: (Current Content / Maximum Capacity) × 100.' },
            { text: 'Substitute the values: (20 / 25) × 100 = 0.8 × 100 = 80%.' },
            { text: 'Interpret the result: A relative humidity of 80% means the air is holding 80% of the total moisture it can possibly.', faded: true, blankAnswer: '80% relative humidity.' }
            ] } },
        { type: 'case', nodeId: 'c7_geo_ch02_005', title: 'Wind: Causes and Types',
          caseStudy: { intro: 'When you stand outside on a hot summer afternoon in the Northern Plains of India, you might suddenly feel a hot, dry gust of wind blowing across your face—this.',
            decisions: [{ prompt: 'What fundamental atmospheric condition causes air to move horizontally across the Earth\'s surface as wind?', options: [
                { text: 'Air moves horizontally', outcome: 'Air moves horizontally because of differences in atmospheric pressure between two regions, flowing.' },
                { text: 'earthquakes', outcome: 'Not quite — Students often think that wind blows vertically upward all the time because hot air rises.', reveals: 'wind-blows-vertically-upward-all' },
                { text: 'ocean currents', outcome: 'Not quite — Students often think that wind blows vertically upward all the time because hot air rises.', reveals: 'wind-blows-vertically-upward-all' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'During a school weather-diary project, Ravi looks outside on a calm, clear winter morning in Punjab and writes \'no weather today\' because nothing dramatic is happening. His partner says he is missing most of the report.',
            decisions: [{ prompt: 'What should Ravi actually record for that morning?', options: [
                { text: 'Temperature, how dry or moist the air feels, wind speed and direction, and cloud cover — weather is the combined state of all these elements at that moment, and a calm clear morning is still a weather condition.', outcome: 'This treats weather as the full set of atmospheric elements, not just rain or storms, which is what a weather diary is meant to track.' },
                { text: 'Ravi is right — weather only counts when it rains or storms, so the entry can stay blank until something changes.', outcome: 'Leaving it blank loses the data: clear skies, low wind and dry cold air are themselves weather elements that explain later changes.', reveals: 'weather-means-rain' },
                { text: 'He should copy yesterday\'s entries, because weather stays roughly the same from one day to the next.', outcome: 'Weather is dynamic and can shift within hours — copying yesterday assumes a stability the real atmosphere does not have.', reveals: 'weather-is-static' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch02_006', title: 'The bigger picture',
          caseStudy: { intro: 'There is never no weather — only weather you have not measured yet. The sky is always up to something.',
            decisions: [{ prompt: 'What comes next? Understanding the Weather · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Understanding the Weather · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_geo_ch02_001', difficulty: 'standard',
          question: 'Weather is the day-to-day state of the atmosphere at a specific place and time.',
          hint: 'Review Grade 6 concepts on atmospheric observations and basic weather diaries before.',
          misconception: 'Students often think that "weather" only refers to whether it is raining or sunny, completely ignoring that wind speed.',
          parts: [
                { id: 'a', prompt: 'What is the primary difference between weather and climate when observing an Indian state over different time frames?', answer: 'Weather refers to short-term, day-to-day atmospheric conditions, whereas climate',
                  options: ['Weather refers to short-term, day-to-day atmospheric conditions, whereas climate', 'weather'],
                  hint: 'Review Grade 6 concepts on atmospheric observations and basic weather diaries before attempting.',
                  misconception: 'Students often think that "weather" only refers to whether it is raining or sunny, completely ignoring that wind speed, atmospheric.' },
                { id: 'b', prompt: 'Why can two neighboring cities in Uttar Pradesh experience completely different weather conditions on the exact same afternoon?', answer: 'Because weather elements like local wind direction, cloud cover, and localized',
                  options: ['Because weather elements like local wind direction, cloud cover, and localized', 'weather'],
                  hint: 'Review Grade 6 concepts on atmospheric observations and basic weather diaries before attempting.',
                  misconception: 'Students often think that "weather" only refers to whether it is raining or sunny, completely ignoring that wind speed, atmospheric.' }
          ],
            remediations: { 'weather-only-refers-to-whether': { steps: ['To fix this, guide the student to step outside and systematically check three distinct things: feel the air.', 'Emphasize that weather is the combined total of all these active elements happening simultaneously around us, whether.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "weather" only refers to whether it is raining or sunny, completely ignoring that wind speed.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Weather is entirely unpredictable, so studying its elements has no practical value for farmers in rural India."', answer: 'The statement is false',
                  options: ['The statement is false', 'weather'],
                  hint: 'Review Grade 6 concepts on atmospheric observations and basic weather diaries before attempting.',
                  misconception: 'Students often think that "weather" only refers to whether it is raining or sunny, completely ignoring that wind speed, atmospheric.' },
                { id: 'b', prompt: 'Design a simple local observation chart for a school in Kolkata that tracks all four major weather elements during the onset of the monsoon season.', answer: 'A successful chart should include columns for date/time, temperature (using a',
                  options: ['A successful chart should include columns for date/time, temperature (using a', 'weather'],
                  hint: 'Review Grade 6 concepts on atmospheric observations and basic weather diaries before attempting.',
                  misconception: 'Students often think that "weather" only refers to whether it is raining or sunny, completely ignoring that wind speed, atmospheric.' }
          ],
            remediations: { 'weather-only-refers-to-whether': { steps: ['To fix this, guide the student to step outside and systematically check three distinct things: feel the air.', 'Emphasize that weather is the combined total of all these active elements happening simultaneously around us, whether.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch02_002', difficulty: 'standard',
          question: 'The atmosphere is a vast blanket of gases surrounding the Earth, held in place.',
          hint: 'Review c6_geography_ch02_008 to recall how air and weather interact near the Earth\'s.',
          misconception: 'Students often believe that the atmosphere ends abruptly at a certain height where space begins, imagining a visible.',
          parts: [
                { id: 'a', prompt: 'Which gas makes up the largest percentage of the Earth\'s atmosphere by volume?', answer: 'Nitrogen, which makes up approximately 78% of the atmosphere',
                  options: ['Nitrogen, which makes up approximately 78% of the atmosphere', 'Oxygen'],
                  hint: 'Review c6_geography_ch02_008 to recall how air and weather interact near the Earth\'s surface.',
                  misconception: 'Students often believe that the atmosphere ends abruptly at a certain height where space begins, imagining a visible ceiling or a sharp.' },
                { id: 'b', prompt: 'If an airplane is flying smoothly at an altitude of 12 kilometers to avoid stormy weather, which atmospheric layer is it currently cruising through, and why.', answer: 'The airplane is flying in the lower stratosphere (just above the tropopause)',
                  options: ['The airplane is flying in the lower stratosphere (just above the tropopause)', 'troposphere'],
                  hint: 'Review c6_geography_ch02_008 to recall how air and weather interact near the Earth\'s surface.',
                  misconception: 'Students often believe that the atmosphere ends abruptly at a certain height where space begins, imagining a visible ceiling or a sharp.' }
          ],
            remediations: { 'the-atmosphere-ends-abruptly-at': { steps: ['To correct this, draw a vertical axis on the board representing altitude from 0 km to 500 km and sketch a temperature.', 'Emphasize that air density decreases smoothly due to gravity pulling gas molecules closer to the Earth\'s surface.', 'Use the analogy of a heavy wool blanket that is thickest and warmest near your body (surface) and thins out at the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch02_003', difficulty: 'standard',
          question: 'Temperature is the degree of hotness or coldness of the atmosphere, measured.',
          hint: 'Review c6_geography_ch02_009 to practice reading thermometer scales and understanding.',
          misconception: 'Students often believe that temperature is highest at noon everywhere on Earth because the sun is directly overhead.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Temperature is the degree of hotness or coldness of the atmosphere, measured in degrees',
                  options: ['Temperature is the degree of hotness or coldness of the atmosphere, measured in degrees', 'Weather is the day-to-day state of the atmosphere at a specific place and time,', 'The atmosphere is a vast blanket of gases surrounding the Earth, held in place by', 'Humidity is the amount of invisible water vapour present in the air at any given time and'],
                  hint: 'Review c6_geography_ch02_009 to practice reading thermometer scales and understanding basic thermal.',
                  misconception: 'Students often believe that temperature is highest at noon everywhere on Earth because the sun is directly overhead, ignoring how.' }
          ],
            remediations: { 'temperature-is-highest-at-noon': { steps: ['Draw a timeline showing the sun\'s position at 12:00 PM versus ground heat absorption at 3:00 PM.', 'Explain that the Earth\'s surface must first absorb solar energy before heating the air above it, creating a time lag.', 'Use a local daily temperature chart from an Indian weather report to show peak heat occurring hours after maximum.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch02_004', difficulty: 'standard',
          question: 'Humidity is the amount of invisible water vapour present in the air at any.',
          hint: 'Review the water cycle and atmospheric composition to understand how water enters the air.',
          misconception: 'Students often think that high humidity means it is about to rain immediately, or they confuse the temperature of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Humidity is the amount of invisible water vapour present in the air at any given time and',
                  options: ['Humidity is the amount of invisible water vapour present in the air at any given time and', 'Weather is the day-to-day state of the atmosphere at a specific place and time,', 'The atmosphere is a vast blanket of gases surrounding the Earth, held in place by', 'Temperature is the degree of hotness or coldness of the atmosphere, measured in degrees'],
                  hint: 'Review the water cycle and atmospheric composition to understand how water enters the air as gas.',
                  misconception: 'Students often think that high humidity means it is about to rain immediately, or they confuse the temperature of the air with the amount.' }
          ],
            remediations: { 'high-humidity-means-it-is': { steps: ['To fix this, guide the student to compare two contrasting locations: a coastal city (like Kochi) and a desert region.', 'Use the concept that air acts like a sponge; coastal air is a wet sponge holding lots of water, while desert air is.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch02_005', difficulty: 'standard',
          question: 'Wind is the horizontal movement of air from areas of high atmospheric pressure.',
          hint: 'Review c7_geo_ch02_003 to understand how temperature gradients create high and.',
          misconception: 'Students often think that wind blows vertically upward all the time because hot air rises, forgetting that "wind".',
          parts: [
                { id: 'a', prompt: 'What fundamental atmospheric condition causes air to move horizontally across the Earth\'s surface as wind?', answer: 'Air moves horizontally',
                  options: ['Air moves horizontally', 'earthquakes', 'ocean currents'],
                  hint: 'Review c7_geo_ch02_003 to understand how temperature gradients create high and low-pressure zones.',
                  misconception: 'Students often think that wind blows vertically upward all the time because hot air rises, forgetting that "wind" specifically refers.' }
          ],
            remediations: { 'wind-blows-vertically-upward-all': { steps: ['To fix this, draw a simple cross-section diagram showing air being heated over a landmass, rising vertically, and.', 'Then, show cooler, heavier air from a nearby high-pressure region rushing horizontally along the ground to fill that.', 'Practice comparing pressure values on weather maps to reinforce that wind speed depends on how close together the high.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch02_006', difficulty: 'standard',
          question: 'Rainfall is the primary form of precipitation where condensed water droplets.',
          hint: 'Review c7_geo_ch02_004 to understand humidity and saturation before attempting rainfall.',
          misconception: 'Students often believe that all rainfall in India is caused solely by the summer monsoon winds, completely overlooking.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rainfall is the primary form of precipitation where condensed water droplets in clouds',
                  options: ['Rainfall is the primary form of precipitation where condensed water droplets in clouds', 'Weather is the day-to-day state of the atmosphere at a specific place and time,', 'The atmosphere is a vast blanket of gases surrounding the Earth, held in place by', 'Temperature is the degree of hotness or coldness of the atmosphere, measured in degrees'],
                  hint: 'Review c7_geo_ch02_004 to understand humidity and saturation before attempting rainfall types and.',
                  misconception: 'Students often believe that all rainfall in India is caused solely by the summer monsoon winds, completely overlooking local convectional.' }
          ],
            remediations: { 'all-rainfall-in-india-is': { steps: ['Review the different triggers of air uplift using a cross-section diagram.', 'Contrast how the Southwest Monsoon winds rise over the Western Ghats (relief rainfall) with how intense summer sun.', 'Have the student trace air movement arrows on a regional map of India.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
