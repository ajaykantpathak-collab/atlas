import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hist_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hist_ch01_p1: SimDef = {
    id: 'v3_c11_hist_ch01_p1',
    title: 'Writing and City Life · Part 1/2',
    subtitle: 'See how a desert birthed cities — and bookkeeping birthed writing.',
    classLevel: 11, subject: 'history', topic: 'Writing and City Life · Part 1/2',
    chapters: ['c11_hist_ch01'],
    nodeIds: ['c11_hist_cbse_01_001', 'c11_hist_cbse_01_002', 'c11_hist_cbse_01_003', 'c11_hist_cbse_01_004', 'c11_hist_cbse_01_005', 'c11_hist_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an archaeologist decoding Uruk\'s clay tablets', intro: 'Between the Tigris and Euphrates, a rainless south out-traded its resource-rich north — institutions did what geography couldn\'t.', goal: 'Explain how irrigation and temple economies produced cities, and how accounting produced cuneiform.' },
    discovery: {
        question: 'Southern Mesopotamia was a desert with under 150 mm of rain — yet it produced the world\'s first cities. How?',
        options: ['Human-engineered irrigation plus temple institutions that mobilised surplus — not natural bounty', 'The desert was secretly fertile crescent land', 'Rivers alone made farming effortless', 'Kings built cities first and writing followed their glory'],
        answer: 'Human-engineered irrigation plus temple institutions that mobilised surplus — not natural bounty',
        hook: 'And writing didn\'t start with royal boasting — the earliest tablets are temple accounts; kings like Enmerkar adopted the tablet, they didn\'t invent it.',
    },
    teaching: [
        { title: 'Mesopotamia: Geography and the Significance of the Twin Rivers', text: 'Mesopotamia (Greek: *mesos* \'middle\', *potamos* \'river\') refers to the historical region in modern-day Iraq situated between the Tigris and Euphrates rivers.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hist_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Draw the resource flows between mountain, steppe and desert zones, then trace clay tokens into syllabic cuneiform — a script, not a language.',
        labels: ['Mesopotamia: Geography and', 'The Origins of Writing', 'Cuneiform Script: Development, Materials', 'Sumerian City-States: Ur, Uruk', 'The Temple and', 'Akkadian Empire: Sargon'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hist_cbse_01_001', title: 'Mesopotamia: Geography and the Significance of the Twin Rivers',
          caseStudy: { intro: 'Imagine you are standing at the banks of the Indus River at Dholavira (Gujarat), a Harappan site you studied in Class 6.',
            decisions: [{ prompt: 'Name the two rivers that define Mesopotamia and state the modern country where the southern alluvial zone (Sumer/Babylonia) is located.', options: [
                { text: 'The two rivers are the **Tigris** and the **Euphrates**', outcome: 'The two rivers are the **Tigris** and the **Euphrates**; the southern alluvial zone lies.' },
                { text: 'Mesopotamia had good farming so cities grew', outcome: 'Not quite — Students conflate **"Mesopotamia = fertile crescent = naturally rich agriculture"** and assume.', reveals: 'students-conflate-mesopotamia-fertile-crescent' },
                { text: 'the Indus or Nile, or placing Sumer in Iran/Syria', outcome: 'Not quite — Students conflate **"Mesopotamia = fertile crescent = naturally rich agriculture"** and assume.', reveals: 'students-conflate-mesopotamia-fertile-crescent' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_01_002', title: 'The Origins of Writing: From Tokens to Cuneiform Script',
          caseStudy: { intro: 'Imagine you find a small clay ball with markings in your grandfather\'s old box — he tells you it\'s a "token" farmers used 5000 years ago to count grain before.',
            decisions: [{ prompt: 'What was the primary material used for writing in early Mesopotamia, and approximately when do the earliest written tablets date to?', options: [
                { text: 'The primary material was clay, and the earliest tablets date to c', outcome: 'The primary material was clay, and the earliest tablets date to c. 3200 BCE from Uruk.' },
                { text: 'papyrus', outcome: 'Not quite — Students believe "cuneiform" refers to the *language* (like "Sanskrit") rather than the *script*.', reveals: 'cuneiform-refers-to-the-language' },
                { text: '2000 BCE', outcome: 'Not quite — Students believe "cuneiform" refers to the *language* (like "Sanskrit") rather than the *script*.', reveals: 'cuneiform-refers-to-the-language' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_01_003', title: 'Cuneiform Script: Development, Materials and Uses',
          caseStudy: { intro: 'Imagine you find a sealed clay envelope from 2800 BCE at a temple in Uruk — inside are tokens representing grain quantities, but the outside bears wedge marks.',
            decisions: [{ prompt: 'What is the approximate date of the earliest known cuneiform tablets from Uruk, and what primary content do they record?', options: [
                { text: 'The earliest cuneiform tablets date to c', outcome: 'The earliest cuneiform tablets date to c. 3200 BCE from Uruk and record lists of commodities (oxen.' },
                { text: '2000 BCE', outcome: 'Not quite — Students often believe cuneiform was an alphabet where each wedge equals a letter (like English).', reveals: 'cuneiform-was-an-alphabet-where' },
                { text: 'law codes', outcome: 'Not quite — Students often believe cuneiform was an alphabet where each wedge equals a letter (like English).', reveals: 'cuneiform-was-an-alphabet-where' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_01_004', title: 'Sumerian City-States: Ur, Uruk and Early Urbanisation',
          caseStudy: { intro: 'Imagine you are standing at the excavated ruins of Ur in present-day Iraq — the same region where Abraham of the Bible is said to have lived.',
            decisions: [{ prompt: 'What were the two primary environmental challenges in southern Mesopotamia that made centralized management of irrigation and trade.', options: [
                { text: 'The two primary challenges were: (1) Unpredictable flooding of the Euphrates and Tigris', outcome: 'The two primary challenges were: (1) Unpredictable flooding of the Euphrates and Tigris — channels.' },
                { text: 'low rainfall', outcome: 'Not quite — Students often believe Mesopotamian cities arose *because* of high agricultural productivity alone.', reveals: 'mesopotamian-cities-arose-because-of' },
                { text: 'desert climate', outcome: 'Not quite — Students often believe Mesopotamian cities arose *because* of high agricultural productivity alone.', reveals: 'mesopotamian-cities-arose-because-of' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_01_005', title: 'The Temple and the Palace as Centres of Power',
          caseStudy: { intro: 'Imagine you are standing at the Great Bath of Mohenjo-daro from your Class 6 studies — a massive public structure that required organised labour, stored water.',
            decisions: [{ prompt: 'What were the two primary institutional centres of power in early Mesopotamian city-states, and which gods were associated with the.', options: [
                { text: 'The two primary centres were the Temple (residence of the patron deity) and the Palace', outcome: 'The two primary centres were the Temple (residence of the patron deity) and the Palace (residence.' },
                { text: 'the palace and the market', outcome: 'Not quite — Students believe the temple and palace were separate, competing institutions from the start — like.', reveals: 'the-temple-and-palace-were' },
                { text: 'the king and the priest alone', outcome: 'Not quite — Students believe the temple and palace were separate, competing institutions from the start — like.', reveals: 'the-temple-and-palace-were' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Comparing Harappan and Mesopotamian cities in class, a teammate concludes: \'Mesopotamia was the Fertile Crescent — rich soil and rivers, so cities naturally sprouted. And cuneiform was the Sumerian language they wrote literature in.\'',
            decisions: [{ prompt: 'What does the evidence actually show?', options: [
                { text: 'Correct both: southern Mesopotamia was a near-rainless desert — agriculture only worked through engineered irrigation, and unpredictable floods threatened it, so cities arose as solutions to water problems via temples, writing and kingship. And cuneiform is a script, not a language — wedge-shaped signs adapted for Sumerian, Akkadian, Hittite and more; it was born as a bureaucratic accounting technology, not for literature.', outcome: 'The comparison sharpens: geography posed problems that social organisation solved — and writing began as admin, millennia before it recorded Gilgamesh.' },
                { text: 'Accept the bounty story — fertile land plus rivers equals cities, same as the Indus.', outcome: 'The south was desert, not bounty: ≤150 mm rainfall meant irrigation had to be built collectively — urbanism was a response to scarcity, not a gift of nature.', reveals: 'fertile-crescent-naturally-rich' },
                { text: 'Keep the language claim — cuneiform is what Sumerians spoke, so it died with them.', outcome: 'Cuneiform is a script system like the Latin alphabet — it outlived Sumerian by writing Akkadian and other languages across empires for 3,000 years.', reveals: 'cuneiform-is-a-language' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'A desert farmed by canals and a temple keeping ration lists — the city was an accounting invention before it was an architectural one.',
            decisions: [{ prompt: 'What comes next? Writing and City Life · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Writing and City Life · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_001', difficulty: 'standard',
          question: 'Mesopotamia (Greek: *mesos* \'middle\', *potamos* \'river\') refers to the.',
          hint: 'Revisit **c6_history_ch04_003** (Harappan town planning) and **c6_history_ch04_004**.',
          misconception: 'Students conflate **"Mesopotamia = fertile crescent = naturally rich agriculture"** and assume urbanisation was.',
          parts: [
                { id: 'a', prompt: 'Name the two rivers that define Mesopotamia and state the modern country where the southern alluvial zone (Sumer/Babylonia) is located.', answer: 'The two rivers are the **Tigris** and the **Euphrates**',
                  options: ['The two rivers are the **Tigris** and the **Euphrates**', 'Mesopotamia had good farming so cities grew', 'the Indus or Nile, or placing Sumer in Iran/Syria'],
                  hint: 'Revisit **c6_history_ch04_003** (Harappan town planning) and **c6_history_ch04_004** (Harappan.',
                  misconception: 'Students conflate **"Mesopotamia = fertile crescent = naturally rich agriculture"** and assume urbanisation was a passive outcome.' },
                { id: 'b', prompt: 'Using the NCERT\'s description of the three ecological zones (north-eastern plains, northern steppe, southern desert), construct a resource-flow diagram showing.', answer: '**Flows**: (1) **Silt & water** → mountains → southern desert (agriculture)',
                  options: ['**Flows**: (1) **Silt & water** → mountains → southern desert (agriculture)', 'Mesopotamia had good farming so cities grew'],
                  hint: 'Revisit **c6_history_ch04_003** (Harappan town planning) and **c6_history_ch04_004** (Harappan.',
                  misconception: 'Students conflate **"Mesopotamia = fertile crescent = naturally rich agriculture"** and assume urbanisation was a passive outcome.' }
          ],
            remediations: { 'students-conflate-mesopotamia-fertile-crescent': { steps: ['**Map exercise**: Print NCERT Map 2.', 'Colour-code the three zones (green=mountains, yellow=steppe, brown=desert).', 'Draw arrows for *each* resource flow (silt, grain, timber, copper, wool).', 'Label *who* manages each flow (villagers, temples, kings, merchants).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate **"Mesopotamia = fertile crescent = naturally rich agriculture"** and assume urbanisation was.',
          parts: [
                { id: 'a', prompt: 'The NCERT argues: "Let us not… make the mistake of thinking that cities grew simply because of rural prosperity." Evaluate this claim using evidence from the.', answer: 'The claim is **valid**',
                  options: ['The claim is **valid**', 'Mesopotamia had good farming so cities grew'],
                  hint: 'Revisit **c6_history_ch04_003** (Harappan town planning) and **c6_history_ch04_004** (Harappan.',
                  misconception: 'Students conflate **"Mesopotamia = fertile crescent = naturally rich agriculture"** and assume urbanisation was a passive outcome.' }
          ],
            remediations: { 'students-conflate-mesopotamia-fertile-crescent': { steps: ['**Map exercise**: Print NCERT Map 2.', 'Colour-code the three zones (green=mountains, yellow=steppe, brown=desert).', 'Draw arrows for *each* resource flow (silt, grain, timber, copper, wool).', 'Label *who* manages each flow (villagers, temples, kings, merchants).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_002', difficulty: 'standard',
          question: 'The origins of writing in Mesopotamia (c. 3200 BCE) trace the evolutionary.',
          hint: 'Revisit c11_hist_cbse_01_001 (Mesopotamia geography) and the NCERT section "Urbanisation.',
          misconception: 'Students believe "cuneiform" refers to the *language* (like "Sanskrit") rather than the *script* (wedge-shaped signs).',
          parts: [
                { id: 'a', prompt: 'What was the primary material used for writing in early Mesopotamia, and approximately when do the earliest written tablets date to?', answer: 'The primary material was clay, and the earliest tablets date to c',
                  options: ['The primary material was clay, and the earliest tablets date to c', 'papyrus', '2000 BCE', 'cuneiform'],
                  hint: 'Revisit c11_hist_cbse_01_001 (Mesopotamia geography) and the NCERT section "Urbanisation.',
                  misconception: 'Students believe "cuneiform" refers to the *language* (like "Sanskrit") rather than the *script* (wedge-shaped signs), and that it was used.' },
                { id: 'b', prompt: 'Why did the earliest Mesopotamian tablets (c. 3200 BCE) contain lists of oxen, fish, and bread loaves rather than stories or laws?', answer: 'These tablets recorded temple redistributive transactions — goods brought in or',
                  options: ['These tablets recorded temple redistributive transactions — goods brought in or', 'they hadn\'t invented literature yet', 'cuneiform', 'Sanskrit'],
                  hint: 'Revisit c11_hist_cbse_01_001 (Mesopotamia geography) and the NCERT section "Urbanisation.',
                  misconception: 'Students believe "cuneiform" refers to the *language* (like "Sanskrit") rather than the *script* (wedge-shaped signs), and that it was used.' },
                { id: 'c', prompt: 'A student claims: "Cuneiform signs began as pictures of objects and always remained pictures." Using the evolution from tokens to syllabic cuneiform, explain.', answer: 'The evolution was: 3D tokens (c',
                  options: ['The evolution was: 3D tokens (c', 'cuneiform', 'Sanskrit'],
                  hint: 'Revisit c11_hist_cbse_01_001 (Mesopotamia geography) and the NCERT section "Urbanisation.',
                  misconception: 'Students believe "cuneiform" refers to the *language* (like "Sanskrit") rather than the *script* (wedge-shaped signs), and that it was used.' }
          ],
            remediations: { 'cuneiform-refers-to-the-language': { steps: ['Show a side-by-side image of a Sumerian tablet (c. 2500 BCE) and an Akkadian tablet (c.', 'Have students identify *identical signs* (e.g., the sign for "king" / "šar") used for different words.', 'Map the spread: use Map 1 (NCERT p. 10) to trace cuneiform from Uruk → Syria (Ebla) → Turkey (Hittites) → Egypt (Amarna.', 'Assign a 3-sentence write-up: "Cuneiform is a script, not a language. Evidence: ______."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_003', difficulty: 'standard',
          question: 'Cuneiform script is the wedge-shaped writing system developed in ancient.',
          hint: 'Revisit c11_hist_cbse_01_002 — focus on the bullae (clay envelopes) and how token.',
          misconception: 'Students often believe cuneiform was an alphabet where each wedge equals a letter (like English), and that most.',
          parts: [
                { id: 'a', prompt: 'What is the approximate date of the earliest known cuneiform tablets from Uruk, and what primary content do they record?', answer: 'The earliest cuneiform tablets date to c',
                  options: ['The earliest cuneiform tablets date to c', '2000 BCE', 'law codes', 'writing began with literature or laws rather than economic administration'],
                  hint: 'Revisit c11_hist_cbse_01_002 — focus on the bullae (clay envelopes) and how token impressions.',
                  misconception: 'Students often believe cuneiform was an alphabet where each wedge equals a letter (like English), and that most Mesopotamians could.' },
                { id: 'b', prompt: 'Why did Mesopotamian scribes use a reed stylus on clay tablets rather than ink on papyrus or carving on stone, given that Egypt used papyrus and the Harappans.', answer: 'Mesopotamia lacked papyrus and had limited stone/wood',
                  options: ['Mesopotamia lacked papyrus and had limited stone/wood', 'clay was more durable'],
                  hint: 'Revisit c11_hist_cbse_01_002 — focus on the bullae (clay envelopes) and how token impressions.',
                  misconception: 'Students often believe cuneiform was an alphabet where each wedge equals a letter (like English), and that most Mesopotamians could.' },
                { id: 'c', prompt: 'A scribe in 2600 BCE Uruk receives an order: "Record the delivery of 300 litres of barley to the temple storehouse, received from Farmer A, witnessed.', answer: '(1) Collect levigated clay from riverbed',
                  options: ['(1) Collect levigated clay from riverbed', 'moist clay'],
                  hint: 'Revisit c11_hist_cbse_01_002 — focus on the bullae (clay envelopes) and how token impressions.',
                  misconception: 'Students often believe cuneiform was an alphabet where each wedge equals a letter (like English), and that most Mesopotamians could.' }
          ],
            remediations: { 'cuneiform-was-an-alphabet-where': { steps: ['Show the student a photo of a cuneiform tablet (e.g., the mathematical tablet with √2) and a school exercise tablet.', 'Have them copy 5 signs with a reed on clay — time them; discuss physical difficulty.', 'Compare with a Brahmi alphabet chart — highlight sign-count difference.', 'Read the NCERT passage on literacy ("Very few Mesopotamians could read and write...'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_004', difficulty: 'standard',
          question: 'Sumerian city-states were independent, temple-centered urban settlements.',
          hint: 'If stuck, revisit Class 9 Geography Ch. 2 (Drainage) on river regimes and Class 6 History.',
          misconception: 'Students often believe Mesopotamian cities arose *because* of high agricultural productivity alone ("fertile crescent.',
          parts: [
                { id: 'a', prompt: 'Explain why the earliest Mesopotamian writing (c. 3200 BCE) emerged in temple economies of Uruk rather than in palaces or marketplaces.', answer: 'Writing emerged in temples',
                  options: ['Writing emerged in temples', 'kings needed to record laws', 'merchants needed contracts', 'fertile crescent = easy farming'],
                  hint: 'If stuck, revisit Class 9 Geography Ch. 2 (Drainage) on river regimes and Class 6 History Ch.',
                  misconception: 'Students often believe Mesopotamian cities arose *because* of high agricultural productivity alone ("fertile crescent = easy farming").' },
                { id: 'b', prompt: 'A historian argues: "The city-state of Ur (c. 2500 BCE) was more socially stratified than Mohenjo-daro (c.', answer: 'The claim is partially valid but oversimplified',
                  options: ['The claim is partially valid but oversimplified', 'fertile crescent = easy farming'],
                  hint: 'If stuck, revisit Class 9 Geography Ch. 2 (Drainage) on river regimes and Class 6 History Ch.',
                  misconception: 'Students often believe Mesopotamian cities arose *because* of high agricultural productivity alone ("fertile crescent = easy farming").' }
          ],
            remediations: { 'mesopotamian-cities-arose-because-of': { steps: ['11–13 (Geography of Mesopotamia) and 16–18 (Temples and Kings) — annotate every phrase linking *environment*.', 'functioned as irrigation canals" → "organized trade and storage needed").', 'Compare Map 2 (Mesopotamia: Mountains, Steppe, Desert, Irrigated Zone) with Class 6 Harappan map — list *five* resource.', 'Write a 100-word answer: "Why did the temple become the first urban institution in Sumer but not in the Indus?" Use.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_005', difficulty: 'standard',
          question: 'The Temple and the Palace as Centres of Power refers to the dual institutional.',
          hint: 'Revisit the Enmerkar epic (NCERT p. 15) and the Uruk temple plan (NCERT p.',
          misconception: 'Students believe the temple and palace were separate, competing institutions from the start — like "church vs state".',
          parts: [
                { id: 'a', prompt: 'Why did the temple in southern Mesopotamia gradually take on economic functions like oil pressing, grain grinding, and textile weaving, rather than remaining.', answer: 'The temple became an economic organiser',
                  options: ['The temple became an economic organiser', 'priests wanted profit', 'kings forced temples to work', 'household'],
                  hint: 'Revisit the Enmerkar epic (NCERT p. 15) and the Uruk temple plan (NCERT p.',
                  misconception: 'Students believe the temple and palace were separate, competing institutions from the start — like "church vs state" in medieval Europe.' }
          ],
            remediations: { 'the-temple-and-palace-were': { steps: ['Re-read the Enmerkar epic passage in NCERT (p. 15) — note who initiates trade, who writes the tablet, and for whose.', 'Compare the Uruk temple plan (p. 16) with the Mari palace plan (p.', 'List three functions the temple performed (land owner, employer, record-keeper) and trace which the palace absorbed.', 'Write one paragraph explaining why "secularisation" is the wrong analytical lens for 1800 BCE Mesopotamia.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_006', difficulty: 'standard',
          question: 'The Akkadian Empire (c. 2370–2150 BCE) was the first multi-city territorial.',
          hint: 'Revisit node c11_hist_cbse_01_004 (Sumerian City-States) and the section "Urbanisation.',
          misconception: 'Students conflate the Akkadian Empire with the later Neo-Assyrian Empire (c.',
          parts: [
                { id: 'a', prompt: 'Compare the political integration strategies of Sargon of Akkad (c. 2370 BCE) and Chandragupta Maurya (c. 321 BCE).', answer: 'Similarities: both used a professional standing army independent of local chiefs',
                  options: ['Similarities: both used a professional standing army independent of local chiefs', 'both built empires'],
                  hint: 'Revisit node c11_hist_cbse_01_004 (Sumerian City-States) and the section "Urbanisation in Southern.',
                  misconception: 'Students conflate the Akkadian Empire with the later Neo-Assyrian Empire (c.' }
          ],
            remediations: { 'students-conflate-the-akkadian-empire': { steps: ['On Map 2 (NCERT p. 11), locate the "Irrigated Zone of the South" (Sumer) and the "Steppe" (north) — note Agade lay.', 'Read the paragraph on p. 21: "nomadic communities of the western desert filtered into the prosperous agricultural.', 'Compare with the Assyrian Empire description on p. 26 (Timeline: "c. 1100 BCE Establishment of the Assyrian kingdom").', 'Write one sentence distinguishing the two: "Akkadian Empire = first empire, southern/central base, pastoralist origin.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
