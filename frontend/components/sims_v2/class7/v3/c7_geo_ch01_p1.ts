import type { SimDef } from '../../engine/types';

/** v3 generated — c7_geo_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_geo_ch01_p1: SimDef = {
    id: 'v3_c7_geo_ch01_p1',
    title: 'Geographical Diversity of India · Part 1/2',
    subtitle: 'Covers the latitudinal and longitudinal extent of India\'s mainland, its hemispheric.',
    classLevel: 7, subject: 'geography', topic: 'Geographical Diversity of India · Part 1/2',
    chapters: ['c7_geo_ch01'],
    nodeIds: ['c7_geo_ch01_001', 'c7_geo_ch01_002', 'c7_geo_ch01_003', 'c7_geo_ch01_004', 'c7_geo_ch01_005', 'c7_geo_ch01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'When you look at a globe or a world map of India, you might wonder why the southern part feels tropical with.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'The sun rises over Arunachal Pradesh almost two hours before it reaches Gujarat — yet both states read the exact same clock time. Where do those missing two hours hide?',
        options: ['In longitude — India spans about 30 degrees, Earth turns one degree every 4 minutes, and a single standard meridian keeps the whole country on one clock', 'In latitude — the east is simply closer to the sun', 'Nowhere — the sun rises everywhere in India at the same moment', 'In the mountains — the Himalayas delay the sunlight'],
        answer: 'In longitude — India spans about 30 degrees, Earth turns one degree every 4 minutes, and a single standard meridian keeps the whole country on one clock',
        hook: 'Latitude and longitude do different jobs: latitude sets climate (8 to 37 degrees North gives India tropical-to-temperate zones), while longitude sets time. Mixing them up is the classic map-reading trap.',
    },
    teaching: [
        { title: 'India\'s Location: Latitude, Longitude and Extent', text: 'India\'s location, latitude, longitude, and extent refer to its precise geographical coordinates on the globe, spanning roughly 8°4\'N to 37°6\'North latitudes and 68°7\'E to 97°25\'East longitudes, which.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_geo_ch01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Plot India on the degree grid — stretch from 8 N to 37 N and 68 E to 97 E — then calculate why 30 degrees of longitude costs the east two hours of morning sun.',
        labels: ['India\'s Location: Latitude, Longitude', 'Indian Subcontinent: Definition', 'Physical Divisions of India', 'Himalayan Mountain Range: Northern', 'Northern Plains: Formation', 'Peninsular Plateau: Deccan'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_geo_ch01_001', title: 'India\'s Location: Latitude, Longitude and Extent',
          scaffold: { problem: 'Calculate the approximate longitudinal distance in degrees between Gujarat (68°7\'E) and Arunachal Pradesh (97°25\'E), and determine the.',
            steps: [
            { text: 'Identify the westernmost longitude of India as approximately 68°7\'E and the easternmost longitude as approximately.' },
            { text: 'Subtract the western longitude from the eastern longitude to find the total longitudinal extent (97°25\'E - 68°7\'E).' },
            { text: 'Compute the subtraction: 25 minutes - 7 minutes = 18 minutes; 97 degrees - 68 degrees = 29 degrees (approx.' },
            { text: 'Multiply the degree difference by 4 minutes (since Earth takes 4 minutes to rotate 1 degree): 29 degrees * 4 minutes.' },
            { text: 'Convert 120 minutes into hours by dividing by 60, resulting in a 2-hour time difference between Gujarat and Arunachal.', faded: true, blankAnswer: 'The longitudinal extent is approximately 29°18\' (about.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_geo_ch01_004', title: 'Himalayan Mountain Range: Northern Boundary',
          scaffold: { problem: 'A trekking team starts at an altitude of 1,200 meters in the Shivalik foothills and climbs up to a base camp in the Himadri range at 4,200.',
            steps: [
            { text: 'Identify the starting altitude ($1,200\\text{ m}$) and ending altitude ($4,200\\text{ m}$).' },
            { text: 'Calculate the net elevation gain by subtracting start from end: $4200 - 1200 = 3,000\\text{ meters}$.' },
            { text: 'Calculate the total temperature drop by multiplying the thousand-meter units by the lapse rate: $\\frac{3000}{1000}.' },
            { text: 'Subtract the temperature drop from the starting temperature: $28^\\circ\\text{C} - 19.5^\\circ\\text{C}.' },
            { text: 'Verify and interpret the result, recognizing that a drop of nearly 20°C reflects the severe transition from subtropical.', faded: true, blankAnswer: 'The expected temperature at the base camp is 8.5°C.' }
            ] } },
        { type: 'case', nodeId: 'c7_geo_ch01_005', title: 'Northern Plains: Formation and Significance',
          caseStudy: { intro: 'When you look at a bag of fine garden soil or walk along a muddy riverbank after the monsoon, you are seeing miniature versions of what built the vast.',
            decisions: [{ prompt: 'Which three major river systems are primarily responsible for the formation and nourishment of the Northern Plains of India?', options: [
                { text: 'The Indus, Ganga, and Brahmaputra river systems', outcome: 'The Indus, Ganga, and Brahmaputra river systems. A student who answers incorrectly—such as naming.' },
                { text: 'southern rivers like the Godavari or Krishna', outcome: 'Not quite — Students often believe that the Northern Plains were formed in a single massive flood event.', reveals: 'the-northern-plains-were-formed' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Meera in Ahmedabad video-calls her cousin in Arunachal Pradesh at 6 PM. Her cousin says it has been dark for nearly two hours, while Meera\'s street is still bright. Both clocks show the exact same Indian Standard Time.',
            decisions: [{ prompt: 'How should Meera explain the mismatch between the sun and the clock?', options: [
                { text: 'India spans about 30 degrees of longitude, and since Earth rotates 1 degree in roughly 4 minutes, the sun rises and sets almost two hours earlier in the east. One standard meridian keeps both clocks on the same time, but it cannot move the sun.', outcome: 'This applies the 4-minutes-per-degree rule correctly: longitude governs solar time, while IST only standardises the clock.' },
                { text: 'Her cousin\'s clocks and watches must all be running two hours fast — she should ask him to reset them.', outcome: 'Both clocks read the same standard time by design; the difference is in solar time, not faulty clocks.', reveals: 'clocks-must-be-wrong' },
                { text: 'It is because Arunachal is at a higher latitude, and latitude is what controls the time of sunrise and sunset.', outcome: 'Latitude shapes climate and day-length, but east-to-west differences in solar time come from longitude as Earth rotates.', reveals: 'latitude-controls-time' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every country has a grid address. Read the latitude for its seasons and the longitude for its sunrise — India runs on both at once.',
            decisions: [{ prompt: 'What comes next? Geographical Diversity of India · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Geographical Diversity of India · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_geo_ch01_001', difficulty: 'standard',
          question: 'India\'s location, latitude, longitude, and extent refer to its precise.',
          hint: 'Review basic map coordinates, equator, and prime meridian from earlier geography lessons.',
          misconception: 'Students often confuse latitude and longitude, thinking that longitude lines measure distance north and south of the.',
          parts: [
                { id: 'a', prompt: 'If a traveler moves from Kanyakumari (approx. 8°N) to Srinagar (approx.', answer: 'Identify Kanyakumari\'s latitude as 8°N and Srinagar\'s latitude as 34°N',
                  options: ['Identify Kanyakumari\'s latitude as 8°N and Srinagar\'s latitude as 34°N', 'climate stays the same across latitudes'],
                  hint: 'Review basic map coordinates, equator, and prime meridian from earlier geography lessons before.',
                  misconception: 'Students often confuse latitude and longitude, thinking that longitude lines measure distance north and south of the equator, or they.' }
          ],
            remediations: { 'students-often-confuse-latitude-and': { steps: ['To fix this, draw a simple grid on paper where horizontal lines (latitudes) look like rungs of a ladder (think \'lat\'.', 'Show students on a map that India\'s longitude is around 82°30\'E, which is far east of the Prime Meridian (0°), proving.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch01_002', difficulty: 'standard',
          question: 'The Indian Subcontinent is a distinct geographical and cultural region in South.',
          hint: 'Review basic map directions (North, South, East, West) and practice distinguishing.',
          misconception: 'Students often think that any country located in South Asia is automatically part of the Indian Subcontinent, or they.',
          parts: [
                { id: 'a', prompt: 'Why is the region containing India and its immediate neighbours referred to as a "subcontinent" rather than just a regular country or a continent?', answer: 'It is called a subcontinent',
                  options: ['It is called a subcontinent', 'subcontinent'],
                  hint: 'Review basic map directions (North, South, East, West) and practice distinguishing between land.',
                  misconception: 'Students often think that any country located in South Asia is automatically part of the Indian Subcontinent, or they confuse land.' }
          ],
            remediations: { 'any-country-located-in-south': { steps: ['To fix this, take a physical and political map of South Asia and use a colored pencil to trace India\'s dry land borders.', 'Point out that land neighbours (like Pakistan, China, Nepal, Bhutan, Bangladesh, and Myanmar) share a continuous soil.', 'Then, point to the blue water separating India from Sri Lanka and Maldives, explaining that because you must cross the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch01_003', difficulty: 'standard',
          question: 'The physical divisions of India refer to the broad structural landform.',
          hint: 'Review the physical map of India in the atlas, focusing on the color-coded elevation.',
          misconception: 'Students often think that all flat land in India belongs to the Northern Plains, failing to distinguish between the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The physical divisions of India refer to the broad structural landform units—namely the',
                  options: ['The physical divisions of India refer to the broad structural landform units—namely the', 'India\'s location, latitude, longitude, and extent refer to its precise geographical', 'The Indian Subcontinent is a distinct geographical and cultural region in South Asia that', 'The Himalayan Mountain Range forms the majestic northern boundary of India, stretching in'],
                  hint: 'Review the physical map of India in the atlas, focusing on the color-coded elevation bands that.',
                  misconception: 'Students often think that all flat land in India belongs to the Northern Plains, failing to distinguish between the alluvial Northern.' }
          ],
            remediations: { 'all-flat-land-in-india': { steps: ['To correct this misconception, guide the student to examine cross-sectional relief diagrams and contour maps of India.', 'Have them check two things: elevation above sea level (plateaus are elevated tablelands, plains are low-lying river.', 'Use a side-profile drawing to show that high-altitude flat areas are plateaus, while low-altitude flat areas near river.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch01_004', difficulty: 'standard',
          question: 'The Himalayan Mountain Range forms the majestic northern boundary of India.',
          hint: 'Review basic plate tectonics and how temperature changes with height (lapse rate) using.',
          misconception: 'Students often believe that the Himalayas are a single, uniform wall of rock of the same height and age, or they think.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Himalayan Mountain Range forms the majestic northern boundary of India, stretching in',
                  options: ['The Himalayan Mountain Range forms the majestic northern boundary of India, stretching in', 'India\'s location, latitude, longitude, and extent refer to its precise geographical', 'The Indian Subcontinent is a distinct geographical and cultural region in South Asia that', 'The physical divisions of India refer to the broad structural landform units—namely the'],
                  hint: 'Review basic plate tectonics and how temperature changes with height (lapse rate) using local hill.',
                  misconception: 'Students often believe that the Himalayas are a single, uniform wall of rock of the same height and age, or they think that all rivers.' }
          ],
            remediations: { 'the-himalayas-are-a-single': { steps: ['To correct this, have the student draw a cross-sectional diagram of the Himalayas showing the three distinct ranges.', 'Then, trace a river like the Ganga from its glacial source in the Himadri down through the mountain gorges into the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch01_005', difficulty: 'standard',
          question: 'The Northern Plains of India are a vast, flat, and extremely fertile alluvial.',
          hint: 'Review node c7_geo_ch01_004 to understand how Himalayan river systems originate and flow.',
          misconception: 'Students often believe that the Northern Plains were formed in a single massive flood event in ancient times rather.',
          parts: [
                { id: 'a', prompt: 'Which three major river systems are primarily responsible for the formation and nourishment of the Northern Plains of India?', answer: 'The Indus, Ganga, and Brahmaputra river systems',
                  options: ['The Indus, Ganga, and Brahmaputra river systems', 'southern rivers like the Godavari or Krishna'],
                  hint: 'Review node c7_geo_ch01_004 to understand how Himalayan river systems originate and flow southward.',
                  misconception: 'Students often believe that the Northern Plains were formed in a single massive flood event in ancient times rather than through millions.' }
          ],
            remediations: { 'the-northern-plains-were-formed': { steps: ['To correct this, have the student trace the journey of a river from an ice glacier in the Himalayas down to the sea.', 'Point out how sediment is deposited gradually in stages (bhabar, terai, bhangar, khadar) rather than all at once.', 'Compare pictures of the dry, sandy western plains of Punjab with the lush, wet deltaic plains of West Bengal to show.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch01_006', difficulty: 'standard',
          question: 'The Peninsular Plateau is a massive, triangular tableland composed of ancient.',
          hint: 'Review basic landform types (mountains vs. plains vs. plateaus) from Class 6 before.',
          misconception: 'Students often think that the entire Peninsular Plateau is a single, flat, uniform tableland that tilts exclusively.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Peninsular Plateau is a massive, triangular tableland composed of ancient crystalline',
                  options: ['The Peninsular Plateau is a massive, triangular tableland composed of ancient crystalline', 'India\'s location, latitude, longitude, and extent refer to its precise geographical', 'The Indian Subcontinent is a distinct geographical and cultural region in South Asia that', 'The physical divisions of India refer to the broad structural landform units—namely the'],
                  hint: 'Review basic landform types (mountains vs. plains vs. plateaus) from Class 6 before analyzing.',
                  misconception: 'Students often think that the entire Peninsular Plateau is a single, flat, uniform tableland that tilts exclusively toward the east.' }
          ],
            remediations: { 'the-entire-peninsular-plateau-is': { steps: ['To fix this, draw a quick cross-section sketch of India from north to south on a slate.', 'Draw the Vindhya range, drop a valley for the Narmada River, and then draw a massive step-up for the Deccan Plateau.', 'Label the northward-flowing rivers (Chambal, Betwa) in the northern section and the eastward-flowing rivers (Godavari.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
