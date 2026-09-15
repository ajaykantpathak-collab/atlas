import type { SimDef } from '../../engine/types';

/** v3 generated — c7_geo_ch01_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_geo_ch01_p2: SimDef = {
    id: 'v3_c7_geo_ch01_p2',
    title: 'Geographical Diversity of India · Part 2/2',
    subtitle: 'Covers the physical characteristics, regional subdivisions, lagoons (kayals), deltas, and.',
    classLevel: 7, subject: 'geography', topic: 'Geographical Diversity of India · Part 2/2',
    chapters: ['c7_geo_ch01'],
    nodeIds: ['c7_geo_ch01_007', 'c7_geo_ch01_008', 'c7_geo_ch01_009', 'c7_geo_ch01_010', 'c7_geo_ch01_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine traveling from Mumbai down to the beaches of Kerala, or across from Chennai up to the delta of the.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'The sun rises over Arunachal Pradesh almost two hours before it reaches Gujarat — yet both states read the exact same clock time. Where do those missing two hours hide?',
        options: ['In longitude — India spans about 30 degrees, Earth turns one degree every 4 minutes, and a single standard meridian keeps the whole country on one clock', 'In latitude — the east is simply closer to the sun', 'Nowhere — the sun rises everywhere in India at the same moment', 'In the mountains — the Himalayas delay the sunlight'],
        answer: 'In longitude — India spans about 30 degrees, Earth turns one degree every 4 minutes, and a single standard meridian keeps the whole country on one clock',
        hook: 'Latitude and longitude do different jobs: latitude sets climate (8 to 37 degrees North gives India tropical-to-temperate zones), while longitude sets time. Mixing them up is the classic map-reading trap.',
    },
    teaching: [
        { title: 'Coastal Plains: Eastern and Western Coasts', text: 'The coastal plains of India are narrow strips of flat, fertile land flanking the Peninsular Plateau, wedged between the Western Ghats and the Arabian Sea on the west, and the Eastern Ghats and the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_geo_ch01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Plot India on the degree grid — stretch from 8 N to 37 N and 68 E to 97 E — then calculate why 30 degrees of longitude costs the east two hours of morning sun.',
        labels: ['Coastal Plains: Eastern', 'Islands of India: Andaman-Nicobar', 'Rivers of India: Major', 'Climate Diversity Due', 'Impact of Geography'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_geo_ch01_007', title: 'Coastal Plains: Eastern and Western Coasts',
          caseStudy: { intro: 'Imagine traveling from Mumbai down to the beaches of Kerala, or across from Chennai up to the delta of the Mahanadi River.',
            decisions: [{ prompt: 'Which regional subdivision of the Western Coastal Plain lies along the coast of Karnataka and northern Kerala?', options: [
                { text: 'The Kanara coast (or Canara coast)', outcome: 'The Kanara coast (or Canara coast). A student who answers "Coromandel" or "Malabar" has confused.' },
                { text: 'Coromandel', outcome: 'Not quite — Students often think that all coastal plains in India are identical sandy beaches with broad.', reveals: 'all-coastal-plains-in-india' },
                { text: 'Malabar', outcome: 'Not quite — Students often think that all coastal plains in India are identical sandy beaches with broad.', reveals: 'all-coastal-plains-in-india' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch01_008', title: 'Islands of India: Andaman-Nicobar and Lakshadweep',
          caseStudy: { intro: 'When looking at a physical map of India, you notice two clusters of land separated from the mainland by vast stretches of the Arabian Sea and the Bay.',
            decisions: [{ prompt: 'Which ocean body contains the Lakshadweep Islands, and what is their primary geological origin?', options: [
                { text: 'The Lakshadweep Islands are located in the Arabian Sea and are formed of coral deposits', outcome: 'The Lakshadweep Islands are located in the Arabian Sea and are formed of coral deposits (coral.' },
                { text: 'Lakshadweep has high mountain peaks like Saddle Peak', outcome: 'Not quite — Students often think all Indian islands are formed the same way, assuming Lakshadweep and.', reveals: 'all-indian-islands-are-formed' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Meera in Ahmedabad video-calls her cousin in Arunachal Pradesh at 6 PM. Her cousin says it has been dark for nearly two hours, while Meera\'s street is still bright. Both clocks show the exact same Indian Standard Time.',
            decisions: [{ prompt: 'How should Meera explain the mismatch between the sun and the clock?', options: [
                { text: 'India spans about 30 degrees of longitude, and since Earth rotates 1 degree in roughly 4 minutes, the sun rises and sets almost two hours earlier in the east. One standard meridian keeps both clocks on the same time, but it cannot move the sun.', outcome: 'This applies the 4-minutes-per-degree rule correctly: longitude governs solar time, while IST only standardises the clock.' },
                { text: 'Her cousin\'s clocks and watches must all be running two hours fast — she should ask him to reset them.', outcome: 'Both clocks read the same standard time by design; the difference is in solar time, not faulty clocks.', reveals: 'clocks-must-be-wrong' },
                { text: 'It is because Arunachal is at a higher latitude, and latitude is what controls the time of sunrise and sunset.', outcome: 'Latitude shapes climate and day-length, but east-to-west differences in solar time come from longitude as Earth rotates.', reveals: 'latitude-controls-time' }
            ] }] } },
        { type: 'case', nodeId: 'c7_geo_ch01_011', title: 'You made it',
          caseStudy: { intro: 'Every country has a grid address. Read the latitude for its seasons and the longitude for its sunrise — India runs on both at once.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_geo_ch01_007', difficulty: 'standard',
          question: 'The coastal plains of India are narrow strips of flat, fertile land flanking.',
          hint: 'Review node c7_geo_ch01_006 (Peninsular Plateau: Deccan and Central Highlands).',
          misconception: 'Students often think that all coastal plains in India are identical sandy beaches with broad deltas, failing.',
          parts: [
                { id: 'a', prompt: 'Which regional subdivision of the Western Coastal Plain lies along the coast of Karnataka and northern Kerala?', answer: 'The Kanara coast (or Canara coast)',
                  options: ['The Kanara coast (or Canara coast)', 'Coromandel', 'Malabar'],
                  hint: 'Review node c7_geo_ch01_006 (Peninsular Plateau: Deccan and Central Highlands) to understand how.',
                  misconception: 'Students often think that all coastal plains in India are identical sandy beaches with broad deltas, failing to distinguish between the.' }
          ],
            remediations: { 'all-coastal-plains-in-india': { steps: ['To correct this, take a physical outline map of India and use a blue colored pencil to trace the Arabian Sea side and.', 'Draw vertical lines representing the Western Ghats very close to the western coast to show why the Western Plain.', 'Have the student label the specific sub-divisions (Konkan, Kanara, Malabar, Coromandel, Northern Circars) using.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch01_008', difficulty: 'standard',
          question: 'The Islands of India comprise two major groups: the Andaman and Nicobar Islands.',
          hint: 'Review the physical map of India in Chapter 1, specifically tracing the coastline from.',
          misconception: 'Students often think all Indian islands are formed the same way, assuming Lakshadweep and Andaman-Nicobar are both.',
          parts: [
                { id: 'a', prompt: 'Why do the Andaman and Nicobar Islands experience a different seismic risk profile compared to the Lakshadweep Islands?', answer: 'The Andaman and Nicobar Islands lie along an active tectonic plate boundary (the',
                  options: ['The Andaman and Nicobar Islands lie along an active tectonic plate boundary (the', 'Lakshadweep has high mountain peaks like Saddle Peak'],
                  hint: 'Review the physical map of India in Chapter 1, specifically tracing the coastline from Gujarat down.',
                  misconception: 'Students often think all Indian islands are formed the same way, assuming Lakshadweep and Andaman-Nicobar are both volcanic or both coral.' }
          ],
            remediations: { 'all-indian-islands-are-formed': { steps: ['To fix this, draw a quick two-column comparison chart on a map: Column A (Andaman and Nicobar) -> Mountain peaks.', 'Column B (Lakshadweep) -> Coral atolls, Arabian Sea, formed by skeletal remains of tiny marine polyps (coral), flat.', 'Have the student point to each on an outline map and state their formation type aloud.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch01_009', difficulty: 'standard',
          question: 'The major river systems of India comprise extensive networks of perennial.',
          hint: 'Review physical divisions of India (mountains and plateaus) and basic map reading.',
          misconception: 'Students often assume all Indian rivers flow into the Bay of Bengal and share identical flow characteristics.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The major river systems of India comprise extensive networks of perennial Himalayan',
                  options: ['The major river systems of India comprise extensive networks of perennial Himalayan', 'India\'s location, latitude, longitude, and extent refer to its precise geographical', 'The Indian Subcontinent is a distinct geographical and cultural region in South Asia that', 'The physical divisions of India refer to the broad structural landform units—namely the'],
                  hint: 'Review physical divisions of India (mountains and plateaus) and basic map reading of cardinal.',
                  misconception: 'Students often assume all Indian rivers flow into the Bay of Bengal and share identical flow characteristics.' }
          ],
            remediations: { 'all-indian-rivers-flow-into': { steps: ['Take an outline map of India and trace the Continental Divide that separates east-flowing and west-flowing rivers.', 'Color Himalayan rivers in blue (highlighting origin in northern snow mountains) and Peninsular rivers in green.', 'Mark the Arabian Sea on the left and Bay of Bengal on the right, explicitly categorizing Narmada and Tapi as the major.', 'Review how seasonal monsoons affect water volume differently in these two categories.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch01_010', difficulty: 'standard',
          question: 'Climate diversity due to geographical features refers to the wide variation.',
          hint: 'Review the physical divisions of India map and the basics of orographic rainfall before.',
          misconception: 'Students often believe that temperature and rainfall patterns across India are determined solely by how far north.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Climate diversity due to geographical features refers to the wide variation in',
                  options: ['Climate diversity due to geographical features refers to the wide variation in', 'India\'s location, latitude, longitude, and extent refer to its precise geographical', 'The Indian Subcontinent is a distinct geographical and cultural region in South Asia that', 'The physical divisions of India refer to the broad structural landform units—namely the'],
                  hint: 'Review the physical divisions of India map and the basics of orographic rainfall before tackling.',
                  misconception: 'Students often believe that temperature and rainfall patterns across India are determined solely by how far north or south a place is from.' }
          ],
            remediations: { 'temperature-and-rainfall-patterns-across': { steps: ['Review a physical map of India alongside a climate/rainfall map.', 'Point out how stations at similar latitudes (like Mumbai on the coast and Nagpur inland, or Delhi in the plains and.', 'Explain that physical landforms act like walls and sponges that redirect wind and trap moisture.', 'Use the rainshadow effect diagram to show how mountains block clouds.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_geo_ch01_011', difficulty: 'standard',
          question: 'The way natural landforms, climate zones, and river systems shape the clothing.',
          hint: 'Review physical divisions and climate diversity in c7_geo_ch01_003 and c7_geo_ch01_010.',
          misconception: 'Students often believe that regional cultural differences in India, such as food and clothing, are caused solely.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The way natural landforms, climate zones, and river systems shape the clothing, food',
                  options: ['The way natural landforms, climate zones, and river systems shape the clothing, food', 'India\'s location, latitude, longitude, and extent refer to its precise geographical', 'The Indian Subcontinent is a distinct geographical and cultural region in South Asia that', 'The physical divisions of India refer to the broad structural landform units—namely the'],
                  hint: 'Review physical divisions and climate diversity in c7_geo_ch01_003 and c7_geo_ch01_010.',
                  misconception: 'Students often believe that regional cultural differences in India, such as food and clothing, are caused solely by religious or historical.' }
          ],
            remediations: { 'regional-cultural-differences-in-india': { steps: ['Take two contrasting Indian regions studied earlier, such as the Thar Desert (c6_geography_ch01_007) and the Himalayan.', 'List the water availability and temperature of each region.', 'Connect water and temperature directly to what crops grow there, what clothes people wear to stay warm or cool, and how.', 'Conclude that culture grows out of how humans solve survival challenges posed by their physical surroundings.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
