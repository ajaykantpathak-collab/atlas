import type { SimDef } from '../../engine/types';

/** v3 generated — c7_geo_ch03_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_geo_ch03_p2: SimDef = {
    id: 'v3_c7_geo_ch03_p2',
    title: 'Climates of India · Part 2/2',
    subtitle: 'Covers the three primary factors of latitude, altitude, and distance from the sea as they.',
    classLevel: 7, subject: 'geography', topic: 'Climates of India · Part 2/2',
    chapters: ['c7_geo_ch03'],
    nodeIds: ['c7_geo_ch03_007', 'c7_geo_ch03_008', 'c7_geo_ch03_009', 'c7_geo_ch03_010', 'c7_geo_ch03_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'When you travel from the warm beaches of Chennai in December to the snow-covered slopes of Shimla in the same.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Rajasthan gets one unusually rainy March week, and a student declares the desert climate officially over. What is the flaw in the verdict?',
        options: ['One wet week is weather — climate is the average pattern over 30 years, so a single odd spell changes nothing', 'No flaw — one rainy week really can end a desert', 'The rain was fake — deserts cannot get rain', 'Climate changes every season anyway'],
        answer: 'One wet week is weather — climate is the average pattern over 30 years, so a single odd spell changes nothing',
        hook: 'Weather is the outfit you wear today; climate is the whole wardrobe built over decades. A freezing January in a subtropical city does not rewrite its climate any more than one rain shower rewrites a desert.',
    },
    teaching: [
        { title: 'Factors Affecting India\'s Climate: Latitude, Altitude, Distance from Sea', text: 'The climate of India is primarily shaped by three major physical factors: latitude (distance from the Equator), altitude (height above sea level), and distance from the sea (maritime versus.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_geo_ch03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sort a pile of statements — today is 34 degrees, monsoon arrives each June, a freak hailstorm hit Tuesday — into weather and climate, then defend the 30-year rule.',
        labels: ['Factors Affecting India\'s Climate', 'Effect of Climate', 'Climate Change: Causes', 'Preparing for Natural Disasters'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_geo_ch03_008', title: 'Identify each idea',
          dissect: { specimen: 'Climates of India · Part 2/2', spots: [
            { id: 's1', label: 'Effect of Climate on Agriculture and Economy', prompt: 'Which idea is this? — The effect of climate on agriculture and economy refers to how temperature, rainfall.', answer: 'Effect of Climate on Agriculture and Economy', options: ['Effect of Climate on Agriculture and Economy', 'Effect of Climate on Culture and Society', 'Climate Change Causes and Consequences', 'Preparing for Natural Disasters Linked to Climate'] },
            { id: 's2', label: 'Effect of Climate on Culture and Society', prompt: 'Which idea is this? — The way climate shapes culture and society refers to how long-term weather patterns.', answer: 'Effect of Climate on Culture and Society', options: ['Effect of Climate on Culture and Society', 'Effect of Climate on Agriculture and Economy', 'Climate Change Causes and Consequences', 'Preparing for Natural Disasters Linked to Climate'] },
            { id: 's3', label: 'Climate Change Causes and Consequences', prompt: 'Which idea is this? — Climate change refers to long-term shifts in temperature, precipitation patterns, and.', answer: 'Climate Change Causes and Consequences', options: ['Climate Change Causes and Consequences', 'Effect of Climate on Agriculture and Economy', 'Effect of Climate on Culture and Society', 'Preparing for Natural Disasters Linked to Climate'] },
            { id: 's4', label: 'Preparing for Natural Disasters Linked to Climate', prompt: 'Which idea is this? — Preparing for natural disasters linked to climate involves identifying regions vulnerable.', answer: 'Preparing for Natural Disasters Linked to Climate', options: ['Preparing for Natural Disasters Linked to Climate', 'Effect of Climate on Agriculture and Economy', 'Effect of Climate on Culture and Society', 'Climate Change Causes and Consequences'] }
          ] } },
        { type: 'case', nodeId: 'c7_geo_ch03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'After five straight days of unseasonal March rain in Jaisalmer, a local headline declares \'Thar is no longer a desert — its climate has permanently changed.\' A classmate asks whether the headline is right.',
            decisions: [{ prompt: 'What is the correct geographical reading of those five days?', options: [
                { text: 'The rain is a weather anomaly — climate is the average pattern over about 30 years, so five wet days cannot reclassify the desert. Only a sustained shift in long-term averages would count.', outcome: 'This separates a single short-term event from the decades of data that define a climate, which is exactly what the headline confuses.' },
                { text: 'The headline is right — five days of heavy rain is real data, so the desert classification should be updated immediately.', outcome: 'One wet spell is far too short; climate classifications rest on roughly 30-year normals, not single events.', reveals: 'anomaly-is-climate' },
                { text: 'Weather and climate are the same thing here, so the question cannot be answered either way.', outcome: 'They differ precisely by timescale: weather is day-to-day, climate is the long-term average — that difference is what resolves the question.', reveals: 'weather-equals-climate' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch03_011', title: 'You made it',
          caseStudy: { intro: 'Weather is the event; climate is the rule. Never let one odd afternoon overrule thirty years of evidence.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_geo_ch03_007', difficulty: 'standard',
          question: 'The climate of India is primarily shaped by three major physical factors.',
          hint: 'Review c6_geography_ch02_011 to reinforce how temperature and air pressure behave across.',
          misconception: 'Students often believe that all parts of India near the Tropic of Cancer experience the exact same weather because they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The climate of India is primarily shaped by three major physical factors: latitude',
                  options: ['The climate of India is primarily shaped by three major physical factors: latitude', 'Weather refers to the day-to-day atmospheric conditions of a specific place, whereas', 'The cycle of seasons in India—encompassing spring, summer, monsoon, autumn, and', 'The monsoon is a large-scale seasonal reversal of wind direction that brings heavy'],
                  hint: 'Review c6_geography_ch02_011 to reinforce how temperature and air pressure behave across different.',
                  misconception: 'Students often believe that all parts of India near the Tropic of Cancer experience the exact same weather because they share the same.' }
          ],
            remediations: { 'all-parts-of-india-near': { steps: ['To correct this, take a blank map of India and point out two cities at the same latitude—such as Mumbai (coastal) and.', 'Have the student look up their temperature ranges to see how distance from the sea creates different climate types.', 'Next, compare Nagpur with Mahabaleshwar (a hill station nearby) to show how altitude drops the temperature even further.', 'Step-by-step map comparison breaks the habit of relying on latitude alone.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch03_008', difficulty: 'standard',
          question: 'The effect of climate on agriculture and economy refers to how temperature.',
          hint: 'Review the climate classification node (c7_geo_ch03_006) and recall how temperature and.',
          misconception: 'Students often believe that agricultural success depends entirely on the sheer volume of water applied through.',
          parts: [
                { id: 'a', prompt: 'A region in the Deccan Plateau experiences an average annual rainfall of less than 750 mm, which is unevenly distributed across months.', answer: 'Jowar (Sorghum) and Bajra (Pearl Millet)',
                  options: ['Jowar (Sorghum) and Bajra (Pearl Millet)', 'all grains have the same water requirements regardless of climate'],
                  hint: 'Review the climate classification node (c7_geo_ch03_006) and recall how temperature and rainfall.',
                  misconception: 'Students often believe that agricultural success depends entirely on the sheer volume of water applied through irrigation, ignoring the.' }
          ],
            remediations: { 'agricultural-success-depends-entirely-on': { steps: ['To correct this, take a regional climate map of India and overlay it with a major crop distribution map.', 'Trace how winter temperatures in northern India enable wheat cultivation, whereas tropical heat in the southern coastal.', 'Emphasize that plants are living organisms tied to specific atmospheric thermal limits, not just water absorbers.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch03_009', difficulty: 'standard',
          question: 'The way climate shapes culture and society refers to how long-term weather.',
          hint: 'Review c7_geo_ch03_008 to reconnect how climate drives agriculture, which in turn forms.',
          misconception: 'Students often believe that cultural practices like food, clothing, and festivals are chosen entirely by random.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The way climate shapes culture and society refers to how long-term weather patterns,',
                  options: ['The way climate shapes culture and society refers to how long-term weather patterns,', 'Weather refers to the day-to-day atmospheric conditions of a specific place, whereas', 'The cycle of seasons in India—encompassing spring, summer, monsoon, autumn, and', 'The monsoon is a large-scale seasonal reversal of wind direction that brings heavy'],
                  hint: 'Review c7_geo_ch03_008 to reconnect how climate drives agriculture, which in turn forms the.',
                  misconception: 'Students often believe that cultural practices like food, clothing, and festivals are chosen entirely by random tradition or fashion.' }
          ],
            remediations: { 'cultural-practices-like-food': { steps: ['To fix this, guide the student to compare two contrasting Indian states, such as Punjab and Kerala.', 'Have them list the staple food, typical clothing, and house design for each, and then link every item directly to the.', 'This demonstrates that human culture is deeply rooted in environmental adaptation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch03_010', difficulty: 'standard',
          question: 'Climate change refers to long-term shifts in temperature, precipitation.',
          hint: 'Review c7_geo_ch03_003 to reinforce how thermal low pressure over the Indian subcontinent.',
          misconception: 'Students often think climate change only means that summers become slightly hotter everywhere, failing to realize.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Climate change refers to long-term shifts in temperature, precipitation patterns, and',
                  options: ['Climate change refers to long-term shifts in temperature, precipitation patterns, and', 'Weather refers to the day-to-day atmospheric conditions of a specific place, whereas', 'The cycle of seasons in India—encompassing spring, summer, monsoon, autumn, and', 'The monsoon is a large-scale seasonal reversal of wind direction that brings heavy'],
                  hint: 'Review c7_geo_ch03_003 to reinforce how thermal low pressure over the Indian subcontinent attracts.',
                  misconception: 'Students often think climate change only means that summers become slightly hotter everywhere, failing to realize it fundamentally disrupts.' }
          ],
            remediations: { 'climate-change-only-means-that': { steps: ['To correct this, take out a physical rainfall distribution map of India and compare historical monsoon patterns with.', 'Trace how a warmer Arabian Sea and Bay of Bengal inject more moisture into the atmosphere, leading to intense.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch03_011', difficulty: 'standard',
          question: 'Preparing for natural disasters linked to climate involves identifying regions.',
          hint: 'Review c7_geo_ch03_010 to understand how changing climate drivers intensify extreme.',
          misconception: 'Students often believe that natural disasters caused by climate, such as floods and droughts, happen entirely by chance.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Preparing for natural disasters linked to climate involves identifying regions vulnerable',
                  options: ['Preparing for natural disasters linked to climate involves identifying regions vulnerable', 'Weather refers to the day-to-day atmospheric conditions of a specific place, whereas', 'The cycle of seasons in India—encompassing spring, summer, monsoon, autumn, and', 'The monsoon is a large-scale seasonal reversal of wind direction that brings heavy'],
                  hint: 'Review c7_geo_ch03_010 to understand how changing climate drivers intensify extreme weather events.',
                  misconception: 'Students often believe that natural disasters caused by climate, such as floods and droughts, happen entirely by chance without any.' }
          ],
            remediations: { 'natural-disasters-caused-by-climate': { steps: ['To correct this, take a physical map of India and overlay historical hazard zones: highlight coastal belts for.', 'Explain that understanding where these hazards occur based on relief and climate allows communities to build.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
