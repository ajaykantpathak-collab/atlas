import type { SimDef } from '../../engine/types';

/** v3 generated — c7_geo_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_geo_ch03_p1: SimDef = {
    id: 'v3_c7_geo_ch03_p1',
    title: 'Climates of India · Part 1/2',
    subtitle: 'This node covers the fundamental scientific differences between weather and climate using.',
    classLevel: 7, subject: 'geography', topic: 'Climates of India · Part 1/2',
    chapters: ['c7_geo_ch03'],
    nodeIds: ['c7_geo_ch03_001', 'c7_geo_ch03_002', 'c7_geo_ch03_003', 'c7_geo_ch03_004', 'c7_geo_ch03_005', 'c7_geo_ch03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Look outside your window on a July morning in Mumbai; you might see heavy rain clouds and puddles on the.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Rajasthan gets one unusually rainy March week, and a student declares the desert climate officially over. What is the flaw in the verdict?',
        options: ['One wet week is weather — climate is the average pattern over 30 years, so a single odd spell changes nothing', 'No flaw — one rainy week really can end a desert', 'The rain was fake — deserts cannot get rain', 'Climate changes every season anyway'],
        answer: 'One wet week is weather — climate is the average pattern over 30 years, so a single odd spell changes nothing',
        hook: 'Weather is the outfit you wear today; climate is the whole wardrobe built over decades. A freezing January in a subtropical city does not rewrite its climate any more than one rain shower rewrites a desert.',
    },
    teaching: [
        { title: 'Climate vs Weather: Understanding the Difference', text: 'Weather refers to the day-to-day atmospheric conditions of a specific place, whereas climate represents the average weather pattern of a region calculated over a long period, typically 30 years.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_geo_ch03_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sort a pile of statements — today is 34 degrees, monsoon arrives each June, a freak hailstorm hit Tuesday — into weather and climate, then defend the 30-year rule.',
        labels: ['Climate vs Weather: Understanding', 'Seasons in India: Spring,', 'Monsoons: Formation and Mechanism', 'Southwest Monsoon: Onset', 'Northeast Monsoon: Retreating Monsoon', 'Climate Regions of India'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_geo_ch03_002', title: 'Seasons in India: Spring, Summer, Monsoon, Autumn, Winter',
          caseStudy: { intro: 'When you walk outside in Delhi or Chennai in May, the air feels scorching and dry, but by July, heavy downpours fill the streets.',
            decisions: [{ prompt: 'Which Indian season is generally associated with the months of March to May, characterized by very high temperatures and low pressure over.', options: [
                { text: 'Summer (or Pre-Monsoon / Hot Weather Season)', outcome: 'The correct answer is Summer (or Pre-Monsoon / Hot Weather Season).' },
                { text: 'Winter', outcome: 'Not quite — Students often think that India only has three seasons (Summer, Winter, and Monsoon) because those.', reveals: 'india-only-has-three-seasons' },
                { text: 'Monsoon', outcome: 'Not quite — Students often think that India only has three seasons (Summer, Winter, and Monsoon) because those.', reveals: 'india-only-has-three-seasons' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch03_004', title: 'Southwest Monsoon: Onset and Progress in India',
          caseStudy: { intro: 'When the intense summer heat bakes the northern plains of India by May, you might notice hot, dry winds and clear blue skies, making everyone wait eagerly for.',
            decisions: [{ prompt: 'Which month does the Southwest Monsoon typically make its official onset at the southern tip of the Indian mainland (Kerala)?', options: [
                { text: 'The Southwest Monsoon typically arrives at the southern tip of Kerala around the 1st of', outcome: 'The Southwest Monsoon typically arrives at the southern tip of Kerala around the 1st of June.' },
                { text: 'January', outcome: 'Not quite — Students often believe that the monsoon is a single rainstorm that covers the whole country.', reveals: 'the-monsoon-is-a-single' },
                { text: 'October', outcome: 'Not quite — Students often believe that the monsoon is a single rainstorm that covers the whole country.', reveals: 'the-monsoon-is-a-single' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch03_005', title: 'Northeast Monsoon: Retreating Monsoon Season',
          caseStudy: { intro: 'As October arrives in many parts of India, you might notice that the heavy, humid rains of July and August have stopped, the skies are clearing up, and days.',
            decisions: [{ prompt: 'During which months does the retreating monsoon and Northeast Monsoon season primarily affect the Indian subcontinent?', options: [
                { text: 'The season primarily occurs from October to December', outcome: 'The season primarily occurs from October to December. A student who answers "June to September".' },
                { text: 'June to September', outcome: 'Not quite — Students often believe that the Northeast Monsoon is just a continuation of the Southwest Monsoon.', reveals: 'the-northeast-monsoon-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'After five straight days of unseasonal March rain in Jaisalmer, a local headline declares \'Thar is no longer a desert — its climate has permanently changed.\' A classmate asks whether the headline is right.',
            decisions: [{ prompt: 'What is the correct geographical reading of those five days?', options: [
                { text: 'The rain is a weather anomaly — climate is the average pattern over about 30 years, so five wet days cannot reclassify the desert. Only a sustained shift in long-term averages would count.', outcome: 'This separates a single short-term event from the decades of data that define a climate, which is exactly what the headline confuses.' },
                { text: 'The headline is right — five days of heavy rain is real data, so the desert classification should be updated immediately.', outcome: 'One wet spell is far too short; climate classifications rest on roughly 30-year normals, not single events.', reveals: 'anomaly-is-climate' },
                { text: 'Weather and climate are the same thing here, so the question cannot be answered either way.', outcome: 'They differ precisely by timescale: weather is day-to-day, climate is the long-term average — that difference is what resolves the question.', reveals: 'weather-equals-climate' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Weather is the event; climate is the rule. Never let one odd afternoon overrule thirty years of evidence.',
            decisions: [{ prompt: 'What comes next? Climates of India · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Climates of India · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_geo_ch03_001', difficulty: 'standard',
          question: 'Weather refers to the day-to-day atmospheric conditions of a specific place.',
          hint: 'Review node c6_geography_ch02_008 to re-examine the basic differences between daily.',
          misconception: 'Students often think that if a particular summer is unusually cool or rainy, the permanent climate of that region has.',
          parts: [
                { id: 'a', prompt: 'Analyze the statement: "Global warming is causing today\'s afternoon rain shower in Bengaluru." Is this statement geographically accurate, and how does.', answer: 'The statement is inaccurate',
                  options: ['The statement is inaccurate', 'climate'],
                  hint: 'Review node c6_geography_ch02_008 to re-examine the basic differences between daily weather and.',
                  misconception: 'Students often think that if a particular summer is unusually cool or rainy, the permanent climate of that region has changed.' }
          ],
            remediations: { 'if-a-particular-summer-is': { steps: ['To fix this misconception, use a classroom analogy: compare weather to what clothes you choose to wear on a specific.', 'Next, look at a climatic map of India and point out that a single rainy week in Thar does not alter the 30-year average.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch03_002', difficulty: 'standard',
          question: 'The cycle of seasons in India—encompassing spring, summer, monsoon, autumn, and.',
          hint: 'Review c7_geo_ch03_001 to understand how long-term climatic patterns govern annual.',
          misconception: 'Students often think that India only has three seasons (Summer, Winter, and Monsoon) because those are the most.',
          parts: [
                { id: 'a', prompt: 'Which Indian season is generally associated with the months of March to May, characterized by very high temperatures and low pressure over the northern plains?', answer: 'Summer (or Pre-Monsoon / Hot Weather Season)',
                  options: ['Summer (or Pre-Monsoon / Hot Weather Season)', 'Winter', 'Monsoon'],
                  hint: 'Review c7_geo_ch03_001 to understand how long-term climatic patterns govern annual temperature.',
                  misconception: 'Students often think that India only has three seasons (Summer, Winter, and Monsoon) because those are the most dramatic, completely.' }
          ],
            remediations: { 'india-only-has-three-seasons': { steps: ['Label the heavy monsoon months (June to September).', 'Mark the cold winter months (December to February).', 'Insert the peak summer months (April to May).', 'Highlight the two vital transition periods—Spring (March) and Autumn/Post-Monsoon (October to November)—noting how.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch03_003', difficulty: 'standard',
          question: 'The monsoon is a large-scale seasonal reversal of wind direction that brings.',
          hint: 'Review wind and air pressure principles from Class 6 geography to understand how pressure.',
          misconception: 'Students often believe that monsoon winds are pulled onto the Indian subcontinent purely because of mountain ranges.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The monsoon is a large-scale seasonal reversal of wind direction that brings heavy',
                  options: ['The monsoon is a large-scale seasonal reversal of wind direction that brings heavy', 'Weather refers to the day-to-day atmospheric conditions of a specific place, whereas', 'The cycle of seasons in India—encompassing spring, summer, monsoon, autumn, and', 'The onset and progress of the Southwest Monsoon refer to the arrival of rain-bearing'],
                  hint: 'Review wind and air pressure principles from Class 6 geography to understand how pressure gradients.',
                  misconception: 'Students often believe that monsoon winds are pulled onto the Indian subcontinent purely because of mountain ranges like the Himalayas.' }
          ],
            remediations: { 'monsoon-winds-are-pulled-onto': { steps: ['To fix this misconception, draw a side-by-side comparison of a heated landmass and a cooler ocean on a whiteboard.', 'Use arrows to show air rising over the hot land (low pressure) and heavy air sinking over the cool ocean (high.', 'Emphasize that wind is simply air rushing from high pressure to low pressure, and the Himalayas only block or channel.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch03_004', difficulty: 'standard',
          question: 'The onset and progress of the Southwest Monsoon refer to the arrival.',
          hint: 'Review c7_geo_ch03_003 to understand basic monsoon formation before mapping its progress.',
          misconception: 'Students often believe that the monsoon is a single rainstorm that covers the whole country overnight.',
          parts: [
                { id: 'a', prompt: 'Why does the Southwest Monsoon split into two distinct branches—the Arabian Sea branch and the Bay of Bengal branch—upon reaching the southern tip.', answer: 'The monsoon splits',
                  options: ['The monsoon splits', 'the monsoon is a single rainstorm that covers the whole country overnight'],
                  hint: 'Review c7_geo_ch03_003 to understand basic monsoon formation before mapping its progress.',
                  misconception: 'Students often believe that the monsoon is a single rainstorm that covers the whole country overnight.' }
          ],
            remediations: { 'the-monsoon-is-a-single': { steps: ['To fix this, trace a standard India monsoon onset map using colored pencils.', 'Draw arrows starting from June 1 in Kerala, add intermediate dates like June 15 for central India, and end with July 15.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch03_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the monsoon is a single rainstorm that covers the whole country overnight.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The entire country of India experiences the onset of the monsoon on the exact same day in June." Is this correct, and why or why not?', answer: 'This statement is incorrect',
                  options: ['This statement is incorrect', 'the monsoon is a single rainstorm that covers the whole country overnight'],
                  hint: 'Review c7_geo_ch03_003 to understand basic monsoon formation before mapping its progress.',
                  misconception: 'Students often believe that the monsoon is a single rainstorm that covers the whole country overnight.' }
          ],
            remediations: { 'the-monsoon-is-a-single': { steps: ['To fix this, trace a standard India monsoon onset map using colored pencils.', 'Draw arrows starting from June 1 in Kerala, add intermediate dates like June 15 for central India, and end with July 15.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch03_005', difficulty: 'standard',
          question: 'The Northeast Monsoon, also known as the retreating monsoon or post-monsoon.',
          hint: 'Review the basic concept of air pressure and wind movement from c6_geography_ch02_011.',
          misconception: 'Students often believe that the Northeast Monsoon is just a continuation of the Southwest Monsoon simply blowing.',
          parts: [
                { id: 'a', prompt: 'During which months does the retreating monsoon and Northeast Monsoon season primarily affect the Indian subcontinent?', answer: 'The season primarily occurs from October to December',
                  options: ['The season primarily occurs from October to December', 'June to September'],
                  hint: 'Review the basic concept of air pressure and wind movement from c6_geography_ch02_011 to see how.',
                  misconception: 'Students often believe that the Northeast Monsoon is just a continuation of the Southwest Monsoon simply blowing backward in a straight.' }
          ],
            remediations: { 'the-northeast-monsoon-is-just': { steps: ['Draw a simple map of India and sketch Southwest Monsoon arrows moving from the ocean onto the land (June–September).', 'Erase those arrows and draw new arrows pointing from the northern interior landmass toward the southeast.', 'Highlight the Bay of Bengal and trace a colored marker showing how the wind curves over the water before hitting Tamil.', 'Emphasize that most of India is shielded by land during this period, making Tamil Nadu the primary recipient of this.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch03_006', difficulty: 'standard',
          question: 'The classification of India\'s climate regions involves dividing the country.',
          hint: 'Review the physical divisions of India map and the basic definitions of temperature and.',
          misconception: 'Students often believe that India\'s climate regions are determined solely by how close a place is to the equator.',
          parts: [
                { id: 'a', prompt: 'If a weather station in Shillong (Meghalaya) records an average July temperature of 22°C while a station in Jaisalmer (Rajasthan) records 38°C in the same.', answer: 'Altitude and Relief',
                  options: ['Altitude and Relief', 'latitude'],
                  hint: 'Review the physical divisions of India map and the basic definitions of temperature and.',
                  misconception: 'Students often believe that India\'s climate regions are determined solely by how close a place is to the equator (latitude), completely.' }
          ],
            remediations: { 'india-s-climate-regions-are': { steps: ['To correct this misconception, use a physical relief map of India alongside a climate region map: 1.', 'Point out two cities at the same latitude, such as Kolkata (coastal plain) and Ranchi (Chota Nagpur Plateau).', 'Have the student trace how altitude and distance from the sea create different temperature ranges between them.', 'Demonstrate how mountain barriers block monsoon winds to create dry zones right next to wet zones, proving that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
