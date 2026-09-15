import type { SimDef } from '../../engine/types';

/** v3 generated — c7_geo_ch02_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_geo_ch02_p2: SimDef = {
    id: 'v3_c7_geo_ch02_p2',
    title: 'Understanding the Weather · Part 2/2',
    subtitle: 'Covers the three primary meteorological instruments (thermometer, barometer, rain gauge).',
    classLevel: 7, subject: 'geography', topic: 'Understanding the Weather · Part 2/2',
    chapters: ['c7_geo_ch02'],
    nodeIds: ['c7_geo_ch02_007', 'c7_geo_ch02_008', 'c7_geo_ch02_009', 'c7_geo_ch02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'When you step outside on a hot, rainy afternoon in Mumbai, you can feel that it is warm and wet, but you.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'On a clear, still winter morning a friend looks outside and announces there is no weather today. What are they completely missing?',
        options: ['Weather is always happening — temperature, wind, humidity, and pressure are all at work even when the sky is calm', 'Nothing — calm air really does mean no weather', 'They are right — weather only exists when it rains or storms', 'Weather only counts at night'],
        answer: 'Weather is always happening — temperature, wind, humidity, and pressure are all at work even when the sky is calm',
        hook: 'Weather is not just rain-versus-shine. It is the combined state of all the elements of the atmosphere at once — which is why two neighbouring cities can have completely different weather on the very same afternoon.',
    },
    teaching: [
        { title: 'Weather Instruments: Thermometer, Barometer, Rain Gauge', text: 'Weather instruments are specialized scientific tools—specifically the thermometer for temperature, barometer for air pressure, and rain gauge for precipitation—used by meteorologists to precisely.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_geo_ch02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Build a school weather chart — track temperature, wind, humidity, and rainfall twice a day — and catch the atmosphere changing even on the quietest days.',
        labels: ['Weather Instruments: Thermometer, Barometer,', 'Weather Forecasting: Methods', 'Difference Between Weather', 'Extreme Weather Events: Storms,'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_geo_ch02_010', title: 'Extreme Weather Events: Storms, Droughts, Heat Waves',
          scaffold: { problem: 'A meteorological department in coastal Andhra Pradesh records a drop in barometric pressure from 1010 hPa to 980 hPa over 24 hours.',
            steps: [
            { text: 'Identify the initial and final barometric pressure readings (1010 hPa dropping to 980 hPa).' },
            { text: 'Note the sharp increase in wind speed (15 km/h to 110 km/h).' },
            { text: 'Apply the geographical principle that falling air pressure creates a steep pressure gradient, causing surrounding air.' },
            { text: 'Recognize that a severe cyclonic storm is forming over the warm ocean waters near the coast.' },
            { text: 'Verify that gale-force winds exceeding 88-117 km/h and dropping pressure are classic indicators of a severe cyclonic.', faded: true, blankAnswer: 'A severe tropical cyclone is approaching, driven by a rapid.' }
            ] } },
        { type: 'case', nodeId: 'c7_geo_ch02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'During a school weather-diary project, Ravi looks outside on a calm, clear winter morning in Punjab and writes \'no weather today\' because nothing dramatic is happening. His partner says he is missing most of the report.',
            decisions: [{ prompt: 'What should Ravi actually record for that morning?', options: [
                { text: 'Temperature, how dry or moist the air feels, wind speed and direction, and cloud cover — weather is the combined state of all these elements at that moment, and a calm clear morning is still a weather condition.', outcome: 'This treats weather as the full set of atmospheric elements, not just rain or storms, which is what a weather diary is meant to track.' },
                { text: 'Ravi is right — weather only counts when it rains or storms, so the entry can stay blank until something changes.', outcome: 'Leaving it blank loses the data: clear skies, low wind and dry cold air are themselves weather elements that explain later changes.', reveals: 'weather-means-rain' },
                { text: 'He should copy yesterday\'s entries, because weather stays roughly the same from one day to the next.', outcome: 'Weather is dynamic and can shift within hours — copying yesterday assumes a stability the real atmosphere does not have.', reveals: 'weather-is-static' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch02_010', title: 'You made it',
          caseStudy: { intro: 'There is never no weather — only weather you have not measured yet. The sky is always up to something.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_geo_ch02_007', difficulty: 'standard',
          question: 'Weather instruments are specialized scientific tools—specifically the.',
          hint: 'Review c7_geo_ch02_001 to understand the core elements of weather before tackling their.',
          misconception: 'Students often think that a barometer measures wind speed or humidity because all weather instruments look like complex.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Weather instruments are specialized scientific tools—specifically the thermometer for',
                  options: ['Weather instruments are specialized scientific tools—specifically the thermometer for', 'Weather is the day-to-day state of the atmosphere at a specific place and time,', 'The atmosphere is a vast blanket of gases surrounding the Earth, held in place by', 'Temperature is the degree of hotness or coldness of the atmosphere, measured in degrees'],
                  hint: 'Review c7_geo_ch02_001 to understand the core elements of weather before tackling their measurement.',
                  misconception: 'Students often think that a barometer measures wind speed or humidity because all weather instruments look like complex dials or gauges.' }
          ],
            remediations: { 'a-barometer-measures-wind-speed': { steps: ['To fix this, guide the student to physically connect air pressure to weight: remind them that the atmosphere is a thick.', 'Show a diagram of a mercury or aneroid barometer where decreasing air weight allows a flexible metal chamber to expand.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that a barometer measures wind speed or humidity because all weather instruments look like complex.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether placing a maximum-minimum thermometer directly on a sunny concrete rooftop in Delhi will give an accurate reading of the ambient air.', answer: 'It will not give an accurate reading',
                  options: ['It will not give an accurate reading', 'thermometers measure direct sunlight rather than air temperature'],
                  hint: 'Review c7_geo_ch02_001 to understand the core elements of weather before tackling their measurement.',
                  misconception: 'Students often think that a barometer measures wind speed or humidity because all weather instruments look like complex dials or gauges.' }
          ],
            remediations: { 'a-barometer-measures-wind-speed': { steps: ['To fix this, guide the student to physically connect air pressure to weight: remind them that the atmosphere is a thick.', 'Show a diagram of a mercury or aneroid barometer where decreasing air weight allows a flexible metal chamber to expand.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch02_008', difficulty: 'standard',
          question: 'Weather forecasting is the scientific process of predicting atmospheric.',
          hint: 'Review c7_geo_ch02_007 to understand how thermometers, barometers, and rain gauges gather.',
          misconception: 'Students often believe that weather forecasts are exact predictions that should never have errors, thinking that modern.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Weather forecasting is the scientific process of predicting atmospheric conditions—such',
                  options: ['Weather forecasting is the scientific process of predicting atmospheric conditions—such', 'Weather is the day-to-day state of the atmosphere at a specific place and time,', 'The atmosphere is a vast blanket of gases surrounding the Earth, held in place by', 'Temperature is the degree of hotness or coldness of the atmosphere, measured in degrees'],
                  hint: 'Review c7_geo_ch02_007 to understand how thermometers, barometers, and rain gauges gather the raw.',
                  misconception: 'Students often believe that weather forecasts are exact predictions that should never have errors, thinking that modern computers can see.' }
          ],
            remediations: { 'weather-forecasts-are-exact-predictions': { steps: ['To fix this, guide the student through a simple tracking exercise using a map of India.', 'Show them two satellite images taken 6 hours apart of a moving cloud mass over the Arabian Sea, and explain how.', 'Emphasize that forecasts are probability-based scientific estimations, not absolute certainties, because air pressure.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch02_009', difficulty: 'standard',
          question: 'Weather is the day-to-day atmospheric condition of a specific place in terms.',
          hint: 'Revisit basic weather definitions and elements (c7_geo_ch02_001) to understand daily.',
          misconception: 'Students often think that if it rains for three days in a row, the climate of that region has temporarily turned into.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Weather is the day-to-day atmospheric condition of a specific place in terms of',
                  options: ['Weather is the day-to-day atmospheric condition of a specific place in terms of', 'Weather is the day-to-day state of the atmosphere at a specific place and time,', 'The atmosphere is a vast blanket of gases surrounding the Earth, held in place by', 'Temperature is the degree of hotness or coldness of the atmosphere, measured in degrees'],
                  hint: 'Revisit basic weather definitions and elements (c7_geo_ch02_001) to understand daily atmospheric.',
                  misconception: 'Students often think that if it rains for three days in a row, the climate of that region has temporarily turned into a rainy climate.' }
          ],
            remediations: { 'if-it-rains-for-three': { steps: ['Review daily temperature and rainfall logs from a weather diary, then compare them with a 30-year climate graph of the.', 'Emphasize that while weather changes daily, climate remains the steady background pattern over decades.', 'Use a local calendar analogy where daily moods (weather) differ from a person\'s lifelong personality (climate).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch02_010', difficulty: 'standard',
          question: 'Extreme weather events are severe, sudden, and out-of-the-ordinary.',
          hint: 'Review the basics of air pressure and wind movement from c7_geo_ch02_005 and monsoon.',
          misconception: 'Students often think that droughts are caused solely by human activities like cutting down trees, completely missing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Extreme weather events are severe, sudden, and out-of-the-ordinary meteorological',
                  options: ['Extreme weather events are severe, sudden, and out-of-the-ordinary meteorological', 'Weather is the day-to-day state of the atmosphere at a specific place and time,', 'The atmosphere is a vast blanket of gases surrounding the Earth, held in place by', 'Temperature is the degree of hotness or coldness of the atmosphere, measured in degrees'],
                  hint: 'Review the basics of air pressure and wind movement from c7_geo_ch02_005 and monsoon patterns from.',
                  misconception: 'Students often think that droughts are caused solely by human activities like cutting down trees, completely missing that meteorological.' }
          ],
            remediations: { 'droughts-are-caused-solely-by': { steps: ['To fix this misconception, guide the student step-by-step using a regional weather map: 1.', 'Point out the monsoon winds coming from the ocean.', 'Explain how global atmospheric pressure systems can push rain-bearing clouds away from a region, causing a failure.', 'Distinguish between regional meteorological drought (lack of rain from clouds) and local water scarcity (overuse.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
