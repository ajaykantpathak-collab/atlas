import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hist_ch01_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hist_ch01_p2: SimDef = {
    id: 'v3_c11_hist_ch01_p2',
    title: 'Writing and City Life · Part 2/2',
    subtitle: 'See how a desert birthed cities — and bookkeeping birthed writing.',
    classLevel: 11, subject: 'history', topic: 'Writing and City Life · Part 2/2',
    chapters: ['c11_hist_ch01'],
    nodeIds: ['c11_hist_cbse_01_007', 'c11_hist_cbse_01_008', 'c11_hist_cbse_01_009', 'c11_hist_cbse_01_010', 'c11_hist_cbse_01_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an archaeologist decoding Uruk\'s clay tablets', intro: 'Between the Tigris and Euphrates, a rainless south out-traded its resource-rich north — institutions did what geography couldn\'t.', goal: 'Explain how irrigation and temple economies produced cities, and how accounting produced cuneiform.' },
    discovery: {
        question: 'Southern Mesopotamia was a desert with under 150 mm of rain — yet it produced the world\'s first cities. How?',
        options: ['Human-engineered irrigation plus temple institutions that mobilised surplus — not natural bounty', 'The desert was secretly fertile crescent land', 'Rivers alone made farming effortless', 'Kings built cities first and writing followed their glory'],
        answer: 'Human-engineered irrigation plus temple institutions that mobilised surplus — not natural bounty',
        hook: 'And writing didn\'t start with royal boasting — the earliest tablets are temple accounts; kings like Enmerkar adopted the tablet, they didn\'t invent it.',
    },
    teaching: [
        { title: 'Babylon and Hammurabi\'s Code of Laws', text: 'Babylon emerged as the dominant political and cultural centre of southern Mesopotamia after 2000 BCE, reaching its zenith under King Hammurabi (c.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hist_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Draw the resource flows between mountain, steppe and desert zones, then trace clay tokens into syllabic cuneiform — a script, not a language.',
        labels: ['Babylon and Hammurabi\'s Code', 'Mathematics, Astronomy and', 'Trade, Commerce and Long-Distance', 'Cities as Centres', 'The Legacy of Mesopotamian'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hist_cbse_01_009', title: 'Trade, Commerce and Long-Distance Exchange',
          caseStudy: { intro: 'Imagine you are standing at the banks of the Euphrates near modern-day Nasiriyah, Iraq—once the site of ancient Ur.',
            decisions: [{ prompt: 'What were the two primary categories of goods that Mesopotamia exported to obtain copper, tin, and timber from Anatolia, Iran, and the Gulf?', options: [
                { text: 'Mesopotamia exported abundant textiles (woollen cloth) and agricultural produce (grain,', outcome: 'Mesopotamia exported abundant textiles (woollen cloth) and agricultural produce (grain, dates.' },
                { text: 'exporting metal tools or precious stones', outcome: 'Not quite — Students often think Mesopotamian trade was a simple "barter between cities" like a village market.', reveals: 'mesopotamian-trade-was-a-simple' },
                { text: 'barter between cities', outcome: 'Not quite — Students often think Mesopotamian trade was a simple "barter between cities" like a village market.', reveals: 'mesopotamian-trade-was-a-simple' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_01_010', title: 'Cities as Centres of Specialised Craft Production',
          caseStudy: { intro: 'Imagine you\'re visiting the National Museum in Delhi and see a Harappan carnelian bead necklace—tiny beads drilled with microscopic precision.',
            decisions: [{ prompt: 'What were the three primary raw materials that southern Mesopotamia lacked but were essential for bronze-age craft production, and from.', options: [
                { text: 'Southern Mesopotamia lacked copper, tin, and quality timber', outcome: 'Southern Mesopotamia lacked copper, tin, and quality timber. Copper came from Oman (Magan) and.' },
                { text: 'advanced', outcome: 'Not quite — Students believe Mesopotamian cities developed craft specialisation because they were "advanced".', reveals: 'mesopotamian-cities-developed-craft-specialisati' },
                { text: 'innovative', outcome: 'Not quite — Students believe Mesopotamian cities developed craft specialisation because they were "advanced".', reveals: 'mesopotamian-cities-developed-craft-specialisati' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_01_011', title: 'The Legacy of Mesopotamian Civilisation',
          caseStudy: { intro: 'Imagine you are checking the time on your phone—12:30 PM, 60 minutes in an hour, 24 hours in a day. Ask yourself: who decided on these numbers?',
            decisions: [{ prompt: 'What is the sexagesimal value recorded on c. 1800 BCE tablets for the square root of 2, and how accurate is it compared to the modern value?', options: [
                { text: 'The tablets give √2 as 1 + 24/60 + 51/60² + 10/60³ = 1.41421296', outcome: 'The tablets give √2 as 1 + 24/60 + 51/60² + 10/60³ = 1.41421296, which differs from the true value.' },
                { text: 'they used √2 = 1.41', outcome: 'Not quite — Students often believe Mesopotamian mathematics was "primitive" because it used base-60 instead.', reveals: 'mesopotamian-mathematics-was-primitive-because' },
                { text: 'primitive', outcome: 'Not quite — Students often believe Mesopotamian mathematics was "primitive" because it used base-60 instead.', reveals: 'mesopotamian-mathematics-was-primitive-because' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Comparing Harappan and Mesopotamian cities in class, a teammate concludes: \'Mesopotamia was the Fertile Crescent — rich soil and rivers, so cities naturally sprouted. And cuneiform was the Sumerian language they wrote literature in.\'',
            decisions: [{ prompt: 'What does the evidence actually show?', options: [
                { text: 'Correct both: southern Mesopotamia was a near-rainless desert — agriculture only worked through engineered irrigation, and unpredictable floods threatened it, so cities arose as solutions to water problems via temples, writing and kingship. And cuneiform is a script, not a language — wedge-shaped signs adapted for Sumerian, Akkadian, Hittite and more; it was born as a bureaucratic accounting technology, not for literature.', outcome: 'The comparison sharpens: geography posed problems that social organisation solved — and writing began as admin, millennia before it recorded Gilgamesh.' },
                { text: 'Accept the bounty story — fertile land plus rivers equals cities, same as the Indus.', outcome: 'The south was desert, not bounty: ≤150 mm rainfall meant irrigation had to be built collectively — urbanism was a response to scarcity, not a gift of nature.', reveals: 'fertile-crescent-naturally-rich' },
                { text: 'Keep the language claim — cuneiform is what Sumerians spoke, so it died with them.', outcome: 'Cuneiform is a script system like the Latin alphabet — it outlived Sumerian by writing Akkadian and other languages across empires for 3,000 years.', reveals: 'cuneiform-is-a-language' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_01_011', title: 'You made it',
          caseStudy: { intro: 'A desert farmed by canals and a temple keeping ration lists — the city was an accounting invention before it was an architectural one.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_007', difficulty: 'standard',
          question: 'Babylon emerged as the dominant political and cultural centre of southern.',
          hint: 'Revisit c11_hist_cbse_01_006 (Akkadian Empire) and c11_hist_cbse_01_003 (Cuneiform.',
          misconception: 'Students often believe Hammurabi\'s Code was the \'first written law code\' in history and that it applied equally to all.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Babylon emerged as the dominant political and cultural centre of southern Mesopotamia',
                  options: ['Babylon emerged as the dominant political and cultural centre of southern Mesopotamia', 'Mesopotamia (Greek: *mesos* \'middle\', *potamos* \'river\') refers to the historical region', 'The origins of writing in Mesopotamia (c', 'Cuneiform script is the wedge-shaped writing system developed in ancient Mesopotamia'],
                  hint: 'Revisit c11_hist_cbse_01_006 (Akkadian Empire) and c11_hist_cbse_01_003 (Cuneiform Script) to see.',
                  misconception: 'Students often believe Hammurabi\'s Code was the \'first written law code\' in history and that it applied equally to all people.' }
          ],
            remediations: { 'hammurabi-s-code-was-the': { steps: ['Re-read the timeline in NCERT (p. 28) to sequence Ur-Nammu, Lipit-Ishtar, and Hammurabi correctly.', 'Compare Law 196 (awīlum) with Law 198 (muškēnum) and Law 199 (wardum) in a translated excerpt to see class gradation.', 'Review c11_hist_cbse_01_003 on literacy rates — only scribes read cuneiform.', 'Write a 3-point correction: \'Not first code; not equal application; not for public reading but royal spectacle.\''], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_008', difficulty: 'standard',
          question: 'The Mesopotamian sexagesimal (base-60) number system, developed c.',
          hint: 'Review the cuneiform script node (c11_hist_cbse_01_003) and the Sumerian city-states node.',
          misconception: 'Students often believe the sexagesimal system was a primitive, clumsy precursor to decimals, used only for timekeeping.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Mesopotamian sexagesimal (base-60) number system, developed c',
                  options: ['The Mesopotamian sexagesimal (base-60) number system, developed c', 'Mesopotamia (Greek: *mesos* \'middle\', *potamos* \'river\') refers to the historical region', 'The origins of writing in Mesopotamia (c', 'Cuneiform script is the wedge-shaped writing system developed in ancient Mesopotamia'],
                  hint: 'Review the cuneiform script node (c11_hist_cbse_01_003) and the Sumerian city-states node.',
                  misconception: 'Students often believe the sexagesimal system was a primitive, clumsy precursor to decimals, used only for timekeeping.' }
          ],
            remediations: { 'the-sexagesimal-system-was-a': { steps: ['If the student cannot convert sexagesimal to decimal, use a concrete scaffold: 1) Draw a place-value chart with columns.', '2) Place digits from a known tablet (e.g., 1;24,51,10) in columns.', '3) Compute each column\'s decimal value using a calculator.', '5) Compare with the reciprocal operation: multiply decimal 1.4142 by 60 repeatedly to recover sexagesimal digits.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_009', difficulty: 'standard',
          question: 'Trade, Commerce and Long-Distance Exchange in Mesopotamia (c. 3000–1800 BCE).',
          hint: 'Revisit the map of Mesopotamia (NCERT Map 2) and identify: the alluvial south (Ur, Uruk).',
          misconception: 'Students often think Mesopotamian trade was a simple "barter between cities" like a village market.',
          parts: [
                { id: 'a', prompt: 'A cuneiform tablet from Mari records that a single river boat carried 300 wine jars and officers levied a charge of one-tenth the cargo\'s value.', answer: '300 jars × 5 shekels = 1,500 shekels total value',
                  options: ['300 jars × 5 shekels = 1,500 shekels total value', 'barter between cities', 'Mesopotamian trade was a simple "barter between cities" like a village market'],
                  hint: 'Revisit the map of Mesopotamia (NCERT Map 2) and identify: the alluvial south (Ur, Uruk), the.',
                  misconception: 'Students often think Mesopotamian trade was a simple "barter between cities" like a village market.' }
          ],
            remediations: { 'mesopotamian-trade-was-a-simple': { steps: ['If the student holds the "simple barter" view, have them: (1) Read the Enmerkar epic excerpt (NCERT p.', '15) where the king *invents writing* to manage a failed trade mission—note the royal initiative.', '(2) Examine the Mari palace plan (NCERT p.', '22–23): locate the scribes\' office, tablet storage, and single guarded entrance—evidence of controlled trade.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Mesopotamian trade was a simple "barter between cities" like a village market.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Mesopotamian long-distance trade was primarily driven by royal demand for luxury goods rather than by the needs of urban craft production."', answer: 'The claim is partially true but incomplete',
                  options: ['The claim is partially true but incomplete', 'luxury', 'necessity', 'barter between cities'],
                  hint: 'Revisit the map of Mesopotamia (NCERT Map 2) and identify: the alluvial south (Ur, Uruk), the.',
                  misconception: 'Students often think Mesopotamian trade was a simple "barter between cities" like a village market.' }
          ],
            remediations: { 'mesopotamian-trade-was-a-simple': { steps: ['If the student holds the "simple barter" view, have them: (1) Read the Enmerkar epic excerpt (NCERT p.', '15) where the king *invents writing* to manage a failed trade mission—note the royal initiative.', '(2) Examine the Mari palace plan (NCERT p.', '22–23): locate the scribes\' office, tablet storage, and single guarded entrance—evidence of controlled trade.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_010', difficulty: 'standard',
          question: 'Cities as centres of specialised craft production refers to the urban economic.',
          hint: 'Review the Bronze Age trade network map (NCERT p.11, Map 2) and the textbook description.',
          misconception: 'Students believe Mesopotamian cities developed craft specialisation because they were "advanced" or "innovative,".',
          parts: [
                { id: 'a', prompt: 'What were the three primary raw materials that southern Mesopotamia lacked but were essential for bronze-age craft production, and from which regions were they.', answer: 'Southern Mesopotamia lacked copper, tin, and quality timber',
                  options: ['Southern Mesopotamia lacked copper, tin, and quality timber', 'advanced', 'innovative', 'iron or gold as primary bronze-age needs'],
                  hint: 'Review the Bronze Age trade network map (NCERT p.11, Map 2) and the textbook description of copper.',
                  misconception: 'Students believe Mesopotamian cities developed craft specialisation because they were "advanced" or "innovative," rather than understanding.' },
                { id: 'b', prompt: 'A cylinder seal impression from Ur shows a banquet scene with musicians, a seated ruler, and attendants. The seal is made of lapis lazuli from Afghanistan.', answer: 'Minimum crafts: lapis lazuli miner (Afghanistan), long-distance trader,',
                  options: ['Minimum crafts: lapis lazuli miner (Afghanistan), long-distance trader,', 'advanced', 'innovative'],
                  hint: 'Review the Bronze Age trade network map (NCERT p.11, Map 2) and the textbook description of copper.',
                  misconception: 'Students believe Mesopotamian cities developed craft specialisation because they were "advanced" or "innovative," rather than understanding.' },
                { id: 'c', prompt: 'Compare the organisation of craft production in Mesopotamian cities (Uruk/Ur) with Harappan cities (Mohenjo-daro/Dholavira).', answer: 'Similarities: (1) Both used standardised weights/measures for craft trade',
                  options: ['Similarities: (1) Both used standardised weights/measures for craft trade', 'centralised', 'advanced', 'innovative'],
                  hint: 'Review the Bronze Age trade network map (NCERT p.11, Map 2) and the textbook description of copper.',
                  misconception: 'Students believe Mesopotamian cities developed craft specialisation because they were "advanced" or "innovative," rather than understanding.' }
          ],
            remediations: { 'mesopotamian-cities-developed-craft-specialisati': { steps: ['If the student holds this misconception: (1) Have them map the raw material sources for Mesopotamian vs.', 'Harappan crafts on a blank West Asia/South Asia map—visualising the distance to copper/tin/lapis for Mesopotamia vs.', '(2) Compare a Mesopotamian ration tablet (listing "10 litres barley to 5 weavers for 30 days") with Harappan workshop.', '(3) Read the Enmerkar epic excerpt (NCERT p.15) showing the king organising trade for temple beautification—not.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_011', difficulty: 'standard',
          question: 'The Legacy of Mesopotamian Civilisation refers to the enduring intellectual.',
          hint: 'Revisit the worked example in node c11_hist_cbse_01_008 where the square root of 2.',
          misconception: 'Students often believe Mesopotamian mathematics was "primitive" because it used base-60 instead of base-10, and they.',
          parts: [
                { id: 'a', prompt: 'What is the sexagesimal value recorded on c. 1800 BCE tablets for the square root of 2, and how accurate is it compared to the modern value?', answer: 'The tablets give √2 as 1 + 24/60 + 51/60² + 10/60³ = 1.41421296',
                  options: ['The tablets give √2 as 1 + 24/60 + 51/60² + 10/60³ = 1.41421296', 'they used √2 = 1.41', 'primitive', 'liking old things'],
                  hint: 'Revisit the worked example in node c11_hist_cbse_01_008 where the square root of 2 is calculated.',
                  misconception: 'Students often believe Mesopotamian mathematics was "primitive" because it used base-60 instead of base-10, and they assume the 60-minute.' },
                { id: 'b', prompt: 'A student claims: "The 60-minute hour came from the Greeks because they invented geometry." Using evidence from the chapter, explain why this is incorrect and.', answer: 'The sexagesimal system (base-60) originated in Mesopotamia c',
                  options: ['The sexagesimal system (base-60) originated in Mesopotamia c', 'primitive', 'liking old things', 'the 60-minute hour is a modern metric invention'],
                  hint: 'Revisit the worked example in node c11_hist_cbse_01_008 where the square root of 2 is calculated.',
                  misconception: 'Students often believe Mesopotamian mathematics was "primitive" because it used base-60 instead of base-10, and they assume the 60-minute.' }
          ],
            remediations: { 'mesopotamian-mathematics-was-primitive-because': { steps: ['Have the student convert 1.5 hours into sexagesimal notation (1;30) and 45 minutes into a fraction of an hour (45/60.', 'Use a two-column table: "Assurbanipal" vs.', '"Nabonidus" with rows for *method* (collecting/copying vs.', 'excavating/inspecting), *purpose* (scholarly preservation vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
