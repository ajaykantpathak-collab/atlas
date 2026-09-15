import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hist_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hist_ch02_p2: SimDef = {
    id: 'v3_c9_hist_ch02_p2',
    title: 'Early Humans and the First Civilisations · Part 2/2',
    subtitle: 'The 99% of history before farms existed',
    classLevel: 9, subject: 'history', topic: 'Early Humans and the First Civilisations · Part 2/2',
    chapters: ['c9_hist_ch02'],
    nodeIds: ['c9_hist_ch2_5', 'c9_hist_ch2_6', 'c9_hist_ch2_7', 'c9_hist_ch2_8', 'c9_hist_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a palaeo-detective at Bhimbetka', intro: 'Thirty-thousand-year-old paintings on a Madhya Pradesh rock wall: people hunting, dancing, cooperating. Reconstruct how they lived — and why it wasn\'t the miserable struggle you imagined.', goal: 'Understand early human evolution and hunter-gatherer life — Out of Africa origins, fire and tools, egalitarian bands — and how sedentary agriculture reshaped society.' },
    discovery: {
        question: 'We picture hunter-gatherers as starving, desperate survivors — yet the !Kung San spent only 15-20 hours a week getting food and ate 75+ plant species. Was pre-farming life actually the harder one?',
        options: ['No — diverse diets, short work weeks and shared food made foragers healthier than early farmers, who got harder labour and worse nutrition', 'Yes — farming obviously improved everything', 'The !Kung San were just lucky', 'Hunter-gatherers were actually rich'],
        answer: 'No — diverse diets, short work weeks and shared food made foragers healthier than early farmers, who got harder labour and worse nutrition',
        hook: 'Evolution wasn\'t a straight escalator: Homo sapiens, Neanderthals, Denisovans and Homo floresiensis overlapped and even interbred — most non-Africans still carry 1–4% Neanderthal DNA. And DNA proves nearly everyone\'s roots trace back to Africa ~300,000 years ago.',
    },
    teaching: [
        { title: 'Neolithic Period: Agriculture and Settlement', text: 'The Neolithic Period (c. 7000–3000 BCE in the Indian subcontinent) marks the transition from nomadic hunter-gatherer societies to settled agricultural communities characterized by the domestication.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hist_ch2_5', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Walk 2.5 million years in fast-forward: Homo habilis\' first tools, fire cooking supper and expanding brains, the Out-of-Africa trek, and the Bhimbetka cave artists — then explain how sitting still (farming) accidentally invented property and hierarchy.',
        labels: ['Neolithic Period: Agriculture', 'Mehrgarh: Early Agricultural Settlement', 'Harappan (Sindhu-Sarasvati) Civilisation: Urban', 'Harappan Civilisation: Trade, Crafts', 'Mesopotamian Civilisation: Writing'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_hist_ch2_5', title: 'Neolithic Period: Agriculture and Settlement',
          caseStudy: { intro: 'Imagine you are standing at the archaeological site of Mehrgarh near the Bolan Pass in Balochistan.',
            decisions: [{ prompt: 'Name the two key archaeological sites in the Indian subcontinent that provide the earliest evidence of Neolithic agriculture and.', options: [
                { text: 'Mehrgarh (Balochistan, c', outcome: 'Mehrgarh (Balochistan, c. 7000 BCE) and Lahuradewa (Ganga Valley, c.' },
                { text: 'humans invented farming', outcome: 'Not quite — Students believe the Neolithic Revolution was a single event where "humans invented farming" and.', reveals: 'the-neolithic-revolution-was-a' },
                { text: 'Harappa or Mohenjo-daro', outcome: 'Not quite — Students believe the Neolithic Revolution was a single event where "humans invented farming" and.', reveals: 'the-neolithic-revolution-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch2_6', title: 'Mehrgarh: Early Agricultural Settlement',
          caseStudy: { intro: 'Imagine you are visiting a museum and see a display of tiny, charred wheat grains and a clay figurine from a site called Mehrgarh, dated to 7000 BCE.',
            decisions: [{ prompt: 'What is the approximate time range of the Mehrgarh settlement, and in which modern-day country is it located?', options: [
                { text: 'Mehrgarh dates from c', outcome: 'Mehrgarh dates from c. 7000 BCE to 2500 BCE and is located in present-day Balochistan, Pakistan.' },
                { text: 'an early village', outcome: 'Not quite — Students often think Mehrgarh is simply "an early village" that happened to exist before the.', reveals: 'mehrgarh-is-simply-an-early' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch2_7', title: 'Harappan (Sindhu-Sarasvati) Civilisation: Urban Planning',
          caseStudy: { intro: 'Imagine you are visiting Dholavira in Gujarat and notice the city is divided into a high walled citadel and a lower town with streets crossing at perfect right.',
            decisions: [{ prompt: 'What is the standard ratio of length:breadth:height for Harappan baked bricks, and at which major site was this ratio first systematically.', options: [
                { text: 'The standard ratio is 4:2:1 (e.g., 28 cm × 14 cm × 7 cm), first systematically documented', outcome: 'The standard ratio is 4:2:1 (e.g., 28 cm × 14 cm × 7 cm), first systematically documented.' },
                { text: 'varied by city', outcome: 'Not quite — Students believe Harappan cities were "all identical clones" — that every city had a Great Bath,.', reveals: 'harappan-cities-were-all-identical' },
                { text: 'all identical clones', outcome: 'Not quite — Students believe Harappan cities were "all identical clones" — that every city had a Great Bath,.', reveals: 'harappan-cities-were-all-identical' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch2_8', title: 'Harappan Civilisation: Trade, Crafts and Decline',
          caseStudy: { intro: 'Imagine you are holding a carnelian bead from a Harappan site in your hand—its tiny drill hole is so perfect it rivals modern laser work.',
            decisions: [{ prompt: 'Name two raw materials the Harappans imported from outside the Indus valley and their most likely source regions.', options: [
                { text: 'Correct: Copper from the Khetri mines (Rajasthan) or Oman', outcome: 'Correct: Copper from the Khetri mines (Rajasthan) or Oman; Tin likely from Afghanistan/Central.' },
                { text: 'iron from Mesopotamia', outcome: 'Not quite — Students believe the Harappan civilisation "vanished suddenly" around 1900 BCE due to an Aryan.', reveals: 'the-harappan-civilisation-vanished-suddenly' },
                { text: 'vanished suddenly', outcome: 'Not quite — Students believe the Harappan civilisation "vanished suddenly" around 1900 BCE due to an Aryan.', reveals: 'the-harappan-civilisation-vanished-suddenly' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch2_9', title: 'Mesopotamian Civilisation: Writing and Urbanisation',
          caseStudy: { intro: 'Imagine you\'re standing at the ruins of Mohenjo-daro in Sindh—grid streets, standardized bricks, the Great Bath.',
            decisions: [{ prompt: 'Name the script invented in Mesopotamia, the material it was written on, and the approximate period when it first appeared.', options: [
                { text: 'Cuneiform script, written on clay tablets, first appearing c', outcome: 'Cuneiform script, written on clay tablets, first appearing c. 3200 BCE in Uruk.' },
                { text: 'hieroglyphics on papyrus', outcome: 'Not quite — Students believe Mesopotamian writing *evolved gradually from pictures to letters* like.', reveals: 'mesopotamian-writing-evolved-gradually-from' },
                { text: 'Brahmi script on stone', outcome: 'Not quite — Students believe Mesopotamian writing *evolved gradually from pictures to letters* like.', reveals: 'mesopotamian-writing-evolved-gradually-from' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch2_5', title: 'Use it in the wild',
          caseStudy: { intro: 'At the Bhimbetka rock shelters, a visitor sneers at the 30,000-year-old hunting paintings: \'These people barely survived — starving, sick, always on the edge. Farming finally rescued them.\'',
            decisions: [{ prompt: 'Does the evidence support the sneer?', options: [
                { text: 'Mostly not — ethnographic parallels like the !Kung San show foragers worked 15–20 hours a week, ate dozens of plant species, shared equally and stayed healthy; early farmers in fact worked harder, ate narrower diets and built hierarchies. \'Primitive\' is a progress myth, not a finding.', outcome: 'This confronts the progress narrative with the actual evidence — foraging was often healthier and more equal than early farming.' },
                { text: 'The visitor is right — without farms or cities, life was unrelieved misery, which is why humans invented agriculture.', outcome: 'Skeletal evidence shows foragers were taller and better-toothed than early farmers; agriculture was adopted for other pressures, not because foraging failed.', reveals: 'foragers-were-miserable' },
                { text: 'Half right — hunter-gatherers were healthy only because there were so few people; hardship arrived purely from population growth.', outcome: 'The record shows active advantages — diverse diet, short work, egalitarian sharing — not merely the absence of crowding; the sneer still misreads the evidence.', reveals: 'few-people-lucky' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch2_9', title: 'You made it',
          caseStudy: { intro: 'For 99% of our story we were mobile foragers — equal, well-fed, cooperative. Settled farming brought surplus, and surplus brought kings. \'Progress\' was a trade, not a gift.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hist_ch2_5', difficulty: 'standard',
          question: 'The Neolithic Period (c. 7000–3000 BCE in the Indian subcontinent) marks the.',
          hint: 'If stuck, revisit c9_hist_ch2_4 and focus on: (1) microliths as composite tools for.',
          misconception: 'Students believe the Neolithic Revolution was a single event where "humans invented farming" and immediately settled.',
          parts: [
                { id: 'a', prompt: 'Name the two key archaeological sites in the Indian subcontinent that provide the earliest evidence of Neolithic agriculture and settlement, and state the.', answer: 'Mehrgarh (Balochistan, c',
                  options: ['Mehrgarh (Balochistan, c', 'humans invented farming', 'Harappa or Mohenjo-daro'],
                  hint: 'If stuck, revisit c9_hist_ch2_4 and focus on: (1) microliths as composite tools for harvesting wild.',
                  misconception: 'Students believe the Neolithic Revolution was a single event where "humans invented farming" and immediately settled into villages.' }
          ],
            remediations: { 'the-neolithic-revolution-was-a': { steps: ['Revisit c9_hist_ch2_4 (Mesolithic) to recall how hunter-gatherers already managed wild cereals and used microliths for.', 'On a map of the subcontinent, plot Mehrgarh, Lahuradewa, Burzahom, Piklihal, and Chirand; note rainfall, altitude, and.', 'For each site, write one sentence: "At [site], people grew [crop] because [ecological reason]." This builds the mosaic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_6', difficulty: 'standard',
          question: 'Mehrgarh is a Neolithic archaeological site located in the Kachi Plain.',
          hint: 'Revisit the Neolithic Period node (c9_hist_ch2_5) and review the definitions.',
          misconception: 'Students often think Mehrgarh is simply "an early village" that happened to exist before the Harappans, missing that.',
          parts: [
                { id: 'a', prompt: 'What is the approximate time range of the Mehrgarh settlement, and in which modern-day country is it located?', answer: 'Mehrgarh dates from c',
                  options: ['Mehrgarh dates from c', 'an early village'],
                  hint: 'Revisit the Neolithic Period node (c9_hist_ch2_5) and review the definitions of "domestication.',
                  misconception: 'Students often think Mehrgarh is simply "an early village" that happened to exist before the Harappans, missing that it represents.' }
          ],
            remediations: { 'mehrgarh-is-simply-an-early': { steps: ['If the student holds this misconception, have them: (1) Draw a map locating Mehrgarh, the Bolan Pass, and major.', '(2) Construct a stratigraphic column of Mehrgarh\'s 7 periods using textbook images, labeling the *first appearance*.', '(3) Write a one-paragraph argument: "Mehrgarh is the nursery of the Harappan Civilisation" using three specific.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_7', difficulty: 'standard',
          question: 'The Harappan (Sindhu-Sarasvati) Civilisation\'s urban planning (c.',
          hint: 'Revisit Class 6 "Harappan Cities: Town Planning and Architecture" (c6_history_ch04_003).',
          misconception: 'Students believe Harappan cities were "all identical clones" — that every city had a Great Bath, a granary, and the.',
          parts: [
                { id: 'a', prompt: 'A newly excavated Harappan site shows a citadel mound but no grid streets in the lower town — instead, lanes curve organically.', answer: 'It does not fit the mature Harappan model',
                  options: ['It does not fit the mature Harappan model', 'local variation', 'all identical clones'],
                  hint: 'Revisit Class 6 "Harappan Cities: Town Planning and Architecture" (c6_history_ch04_003) and list.',
                  misconception: 'Students believe Harappan cities were "all identical clones" — that every city had a Great Bath, a granary, and the exact same layout.' },
                { id: 'b', prompt: 'Compare the drainage systems of Mohenjo-daro and Dholavira. What does the difference in construction material (baked brick vs.', answer: 'Mohenjo-daro used baked bricks',
                  options: ['Mohenjo-daro used baked bricks', 'one used brick, one stone', 'all identical clones'],
                  hint: 'Revisit Class 6 "Harappan Cities: Town Planning and Architecture" (c6_history_ch04_003) and list.',
                  misconception: 'Students believe Harappan cities were "all identical clones" — that every city had a Great Bath, a granary, and the exact same layout.' }
          ],
            remediations: { 'harappan-cities-were-all-identical': { steps: ['Create a comparison table of five major sites (Mohenjo-daro, Harappa, Dholavira, Lothal, Kalibangan) with columns.', 'Fill using Class 6 knowledge + this node.', 'Highlight which features appear in ALL sites (grid, drainage, brick ratio, citadel/lower town) vs.', 'Write a 3-sentence conclusion: "Uniformity is in the *system*, not the *structures*." This directly replaces the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Harappan cities were "all identical clones" — that every city had a Great Bath, a granary, and the.',
          parts: [
                { id: 'a', prompt: 'Some historians argue the "citadel" was a religious center, others a administrative elite residence.', answer: 'Administrative elite residence is better supported',
                  options: ['Administrative elite residence is better supported', 'religious center', 'all identical clones'],
                  hint: 'Revisit Class 6 "Harappan Cities: Town Planning and Architecture" (c6_history_ch04_003) and list.',
                  misconception: 'Students believe Harappan cities were "all identical clones" — that every city had a Great Bath, a granary, and the exact same layout.' },
                { id: 'b', prompt: 'Design a 5-point checklist an archaeologist would use to confirm a newly discovered site belongs to the *mature* Harappan urban phase (not early or late).', answer: '1) Citadel on raised western mound with fortification wall',
                  options: ['1) Citadel on raised western mound with fortification wall', 'all identical clones'],
                  hint: 'Revisit Class 6 "Harappan Cities: Town Planning and Architecture" (c6_history_ch04_003) and list.',
                  misconception: 'Students believe Harappan cities were "all identical clones" — that every city had a Great Bath, a granary, and the exact same layout.' }
          ],
            remediations: { 'harappan-cities-were-all-identical': { steps: ['Create a comparison table of five major sites (Mohenjo-daro, Harappa, Dholavira, Lothal, Kalibangan) with columns.', 'Fill using Class 6 knowledge + this node.', 'Highlight which features appear in ALL sites (grid, drainage, brick ratio, citadel/lower town) vs.', 'Write a 3-sentence conclusion: "Uniformity is in the *system*, not the *structures*." This directly replaces the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_8', difficulty: 'standard',
          question: 'The Harappan Civilisation (c. 2600–1900 BCE), flourishing in the.',
          hint: 'If stuck, re-read c9_hist_ch2_7 on "Citadel vs Lower Town" economic functions and.',
          misconception: 'Students believe the Harappan civilisation "vanished suddenly" around 1900 BCE due to an Aryan invasion that destroyed.',
          parts: [
                { id: 'a', prompt: 'Name two raw materials the Harappans imported from outside the Indus valley and their most likely source regions.', answer: 'Correct: Copper from the Khetri mines (Rajasthan) or Oman',
                  options: ['Correct: Copper from the Khetri mines (Rajasthan) or Oman', 'iron from Mesopotamia', 'vanished suddenly'],
                  hint: 'If stuck, re-read c9_hist_ch2_7 on "Citadel vs Lower Town" economic functions and.',
                  misconception: 'Students believe the Harappan civilisation "vanished suddenly" around 1900 BCE due to an Aryan invasion that destroyed cities and killed.' }
          ],
            remediations: { 'the-harappan-civilisation-vanished-suddenly': { steps: ['Re-visit c9_hist_ch2_7: list the *urban* traits (writing, weights, citadels, drains) that define the Mature Harappan.', 'Late Harappan sites; observe the *eastward/southward shift* (not abandonment).', 'Read the "Cemetery H" culture description (NCERT Class 12 Themes in Indian History, Ch.1) to see which Harappan traits.', 'Write a 3-sentence summary: "The city ended; the people and their farming/craft traditions continued."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_9', difficulty: 'standard',
          question: 'Mesopotamian Civilisation (c. 3500–500 BCE) emerged in the fertile river.',
          hint: 'Revisit the Harappan town planning node (c6_history_ch04_003) and the "Second.',
          misconception: 'Students believe Mesopotamian writing *evolved gradually from pictures to letters* like an alphabet, and that Harappan.',
          parts: [
                { id: 'a', prompt: 'Name the script invented in Mesopotamia, the material it was written on, and the approximate period when it first appeared.', answer: 'Cuneiform script, written on clay tablets, first appearing c',
                  options: ['Cuneiform script, written on clay tablets, first appearing c', 'hieroglyphics on papyrus', 'Brahmi script on stone', 'undeciphered cuneiform'],
                  hint: 'Revisit the Harappan town planning node (c6_history_ch04_003) and the "Second Urbanisation".',
                  misconception: 'Students believe Mesopotamian writing *evolved gradually from pictures to letters* like an alphabet, and that Harappan script.' }
          ],
            remediations: { 'mesopotamian-writing-evolved-gradually-from': { steps: ['Show side-by-side images of a Uruk IV pictographic tablet and a Harappan seal—ask students to identify *three visual.', 'Use the "token-to-tablet" sequence (Schmandt-Besserat) to demonstrate cuneiform\'s *administrative* origin, not.', 'Map the *absence* of Harappan bilingual texts vs. Mesopotamian multilingual corpora (Sumerian/Akkadian) to explain.', 'Assign a 100-word comparison: "Why cuneiform\'s logo-syllabic nature suited Mesopotamian bureaucracy better than.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
