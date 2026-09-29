import type { SimDef } from '../../engine/types';
import C11_HistoryWritingCityLifeSim from '../../../simulations/c6_12/C11_HistoryWritingCityLifeSim';

/** v3 wrapped master — C11_HistoryWritingCityLifeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_historywritingcitylifesim: SimDef = {
    id: 'v3w_c11_historywritingcitylifesim',
    title: 'The Temple and the Palace as Centres of Power',
    subtitle: 'Covers the emergence of temple institutions (c. 5000 BCE), transition to palace authority.',
    classLevel: 11, subject: 'history', topic: 'The Temple and the Palace as Centres of Power',
    chapters: [],
    nodeIds: ['c11_hist_cbse_01_005', 'c11_hist_cbse_01_001', 'c11_hist_cbse_01_004', 'c11_hist_cbse_01_010', 'c11_hist_cbse_01_002', 'c11_hist_cbse_01_003', 'c11_hist_cbse_01_011', 'c11_hist_cbse_01_006', 'c11_hist_cbse_01_009', 'c11_hist_cbse_07_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are standing at the Great Bath of Mohenjo-daro from your Class 6 studies — a massive public.', goal: 'Master The Temple and the Palace as Centres of Power.' },
    discovery: {
        question: 'Why did the temple in southern Mesopotamia gradually take on economic functions like oil pressing, grain grinding, and textile weaving, rather than remaining.',
        options: ['The temple became an economic organiser', 'priests wanted profit', 'kings forced temples to work'],
        answer: 'The temple became an economic organiser',
        hook: 'Students believe the temple and palace were separate, competing institutions from the start — like "church vs state" in.',
    },
    teaching: [
        { title: 'The Temple and the Palace as Centres of.', text: 'The Temple and the Palace as Centres of Power refers to the dual institutional framework in early Mesopotamian city-states (c.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_hist_cbse_01_005', title: 'The Temple and the Palace as Centres of.',
          scaffold: { problem: 'Using the NCERT description of Uruk (c. 3000 BCE), explain how the temple\'s control over four specific resources (land, labour, trade.',
            steps: [
            { text: 'Identify the four resource domains from the text — agricultural land (god as theoretical owner), labour (ration lists.' },
            { text: 'For land — cite NCERT: "The god was also the theoretical owner of the agricultural fields, the fisheries, and the herds.' },
            { text: 'For labour — cite NCERT: "War captives and local people were put to work for the temple... paid rations.' },
            { text: 'For trade — cite the Enmerkar epic: king sends messenger for lapis lazuli and silver for temple beautification; writing.' },
            { text: 'For metallurgy — cite NCERT: "Bronze tools came into use for various crafts...' },
            { text: 'Synthesise — the temple integrated these four domains: land produced surplus, labour processed it, trade brought.', faded: true, blankAnswer: 'The temple at Uruk functioned as the central institution.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_01_001', title: 'Mesopotamia (Greek: *mesos* \'middle\',.',
          scaffold: { problem: 'Explain how the **seasonal flood regime of the Euphrates** (spring snowmelt from Anatolian mountains) created a *time-bound management.',
            steps: [
            { text: 'Identify the hydrological fact — Euphrates floods in **April–May** (spring melt), *after* the winter sowing (November).' },
            { text: 'Identify the geographical constraint — Southern Mesopotamia receives **<150 mm rain**; agriculture is *entirely*.' },
            { text: 'Analyse the labour requirement — Building/maintaining canals, levees, and regulators requires **coordinated labour**.' },
            { text: 'Trace the institutional solution — **Temples** (already ritual centres) become **organisers of corvée labour**, storers.' },
            { text: 'Evaluate the outcome — Temple control of *water* → control of *surplus* → control of *craft specialists* (fed by.', faded: true, blankAnswer: 'The Euphrates\' spring flood, arriving at the critical.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_01_004', title: 'Sumerian city-states were independent,.',
          scaffold: { problem: 'Using the "Enmerkar and the Lord of Aratta" epic and archaeological evidence from Uruk, explain how the need for imported prestige goods.',
            steps: [
            { text: 'Identify the historical context — Uruk’s expansion (250 → 400 hectares) required temple construction and elite display,.' },
            { text: 'Analyze the epic’s plot — Enmerkar’s messengers fail orally; he invents writing on clay to transmit complex demands.' },
            { text: 'Corroborate with archaeology — earliest tablets (c. 3200 BCE) from Uruk’s Eanna precinct are *commodity lists* (grain,.' },
            { text: 'Link to bronze technology — bronze (copper+tin) tools were essential for stone carving, seal-making, warfare; their.' },
            { text: 'Synthesize — Royal monopoly on long-distance exchange → need for reliable communication → writing → bureaucratic.', faded: true, blankAnswer: 'The demand for exotic prestige goods and bronze-making.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_01_010', title: 'Cities as centres of specialised craft.',
          scaffold: { problem: 'Analyse how the production of a single bronze dagger in Ur c. 2500 BCE reveals the entire urban economic system of early Mesopotamia.',
            steps: [
            { text: 'Identify the raw materials—copper (from Oman/Magan or Cyprus/Alashiya) and tin (from Afghanistan/Central Asia via.' },
            { text: 'Trace the trade logistics—copper transported by sea (Dilmun/Bahrain entrepôt) or land (Iranian routes); tin via.' },
            { text: 'Identify the institutional organiser—the temple or palace that financed expeditions, stored metals, and allocated them.' },
            { text: 'Analyse the craft chain—miner → smelter → trader → temple storehouse → bronze-smith (using bronze tools himself) →.' },
            { text: 'Evaluate the systemic implications—this dagger represents a city that cannot exist without writing (to track metal),.', faded: true, blankAnswer: 'The bronze dagger is not just a weapon; it is material.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_01_002', title: 'The origins of writing in Mesopotamia.',
          scaffold: { problem: 'Explain why the shift from impressed tokens on clay envelopes (bullae) to incised pictographs on flat tablets (c.',
            steps: [
            { text: 'Identify the limitation of bullae — to verify contents, the envelope must be broken, destroying the record; tokens.' },
            { text: 'Recognise that impressing token shapes *on the outside* of the bulla before sealing allowed verification without.' },
            { text: 'Note that flattening the envelope into a tablet and incising signs with a reed stylus allowed *multiple transactions on.' },
            { text: 'Connect to the NCERT evidence: "lists of oxen, fish, bread loaves" on single tablets (p.' },
            { text: 'Conclude: the breakthrough is *random access* — any entry can be checked without destroying others — enabling.', faded: true, blankAnswer: 'The shift from bullae to tablets transformed writing from a.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_01_003', title: 'Cuneiform script is the wedge-shaped.',
          scaffold: { problem: 'Analyze how the material properties of clay and reed determined the formal characteristics of cuneiform signs (wedge shape, direction of.',
            steps: [
            { text: 'Identify the raw materials — alluvial clay (fine-grained, plastic when wet, hard when dry) and reed stems (hollow,.' },
            { text: 'Link clay properties to tablet form — palm-sized because larger tablets crack during drying; flattened surfaces because.' },
            { text: 'Link reed properties to sign morphology — oblique cut creates a triangular tip; pressing (not dragging) avoids tearing.' },
            { text: 'Derive writing direction — right-to-left, top-to-bottom avoids smudging fresh signs with the writing hand (right-handed.' },
            { text: 'Connect to scribal training — students copied sign lists (e.g., *Sumerian-Akkadian lexical lists*) on small practice.' },
            { text: 'Evaluate systemic impact — these constraints made cuneiform slow to write, bulky to store, and unsuited for rapid.', faded: true, blankAnswer: 'Clay\'s plasticity and sun-drying dictated small, flat.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_hist_cbse_01_001', title: 'Identify each idea',
          dissect: { specimen: 'The Temple and the Palace as Centres of Power', spots: [
            { id: 's1', label: 'The Temple and the Palace', prompt: 'Which idea is this? — The Temple and the Palace as Centres of Power refers to the dual institutional framework.', answer: 'The Temple and the Palace', options: ['The Temple and the Palace', 'Mesopotamia Greek mesos middle potamos', 'Sumerian city-states were independent temple-centered', 'Cities as centres of specialised'] },
            { id: 's2', label: 'Mesopotamia Greek mesos middle potamos', prompt: 'Which idea is this? — Mesopotamia (Greek: *mesos* \'middle\', *potamos* \'river\') refers to the historical region.', answer: 'Mesopotamia Greek mesos middle potamos', options: ['Mesopotamia Greek mesos middle potamos', 'The Temple and the Palace', 'Sumerian city-states were independent temple-centered', 'Cities as centres of specialised'] },
            { id: 's3', label: 'Sumerian city-states were independent temple-centered', prompt: 'Which idea is this? — Sumerian city-states were independent, temple-centered urban settlements in southern.', answer: 'Sumerian city-states were independent temple-centered', options: ['Sumerian city-states were independent temple-centered', 'The Temple and the Palace', 'Mesopotamia Greek mesos middle potamos', 'Cities as centres of specialised'] },
            { id: 's4', label: 'Cities as centres of specialised', prompt: 'Which idea is this? — Cities as centres of specialised craft production refers to the urban economic.', answer: 'Cities as centres of specialised', options: ['Cities as centres of specialised', 'The Temple and the Palace', 'Mesopotamia Greek mesos middle potamos', 'Sumerian city-states were independent temple-centered'] },
            { id: 's5', label: 'The origins of writing in', prompt: 'Which idea is this? — The origins of writing in Mesopotamia (c. 3200 BCE) trace the evolutionary transition.', answer: 'The origins of writing in', options: ['The origins of writing in', 'The Temple and the Palace', 'Mesopotamia Greek mesos middle potamos', 'Sumerian city-states were independent temple-centered'] },
            { id: 's6', label: 'Cuneiform script is the wedge-shaped', prompt: 'Which idea is this? — Cuneiform script is the wedge-shaped writing system developed in ancient Mesopotamia.', answer: 'Cuneiform script is the wedge-shaped', options: ['Cuneiform script is the wedge-shaped', 'The Temple and the Palace', 'Mesopotamia Greek mesos middle potamos', 'Sumerian city-states were independent temple-centered'] }
          ] } }
    ],
    explore: { component: C11_HistoryWritingCityLifeSim, prompt: 'Explore the interactive — The Temple and the Palace as Centres of Power' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_005', difficulty: 'standard',
          question: 'The Temple and the Palace as Centres of Power refers to the dual institutional.',
          hint: 'Revisit the Enmerkar epic (NCERT p. 15) and the Uruk temple plan (NCERT p.',
          misconception: 'Students believe the temple and palace were separate, competing institutions from the start — like "church vs state" in.',
          parts: [
                { id: 'a', prompt: 'Why did the temple in southern Mesopotamia gradually take on economic functions like oil pressing, grain grinding, and textile weaving, rather than remaining.', answer: 'The temple became an economic organiser',
                  options: ['The temple became an economic organiser', 'priests wanted profit', 'kings forced temples to work'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the temple and palace were separate, competing institutions from the start — like "church vs state" in medieval Europe.' }
          ],
            remediations: { 'the-temple-and-palace-were': { steps: ['Re-read the Enmerkar epic passage in NCERT (p. 15) — note who initiates trade, who writes the tablet, and for whose.', 'Compare the Uruk temple plan (p. 16) with the Mari palace plan (p.', 'List three functions the temple performed (land owner, employer, record-keeper) and trace which the palace absorbed at.', 'Write one paragraph explaining why "secularisation" is the wrong analytical lens for 1800 BCE Mesopotamia.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the temple and palace were separate, competing institutions from the start — like "church vs state" in.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The palace at Mari was merely a royal residence; the real economic power remained with the temple." Use evidence from the palace plan,.', answer: 'The claim is false',
                  options: ['The claim is false', 'church vs state', 'priests lost power to kings', 'institutional functions differentiated while sharing sacral authority'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the temple and palace were separate, competing institutions from the start — like "church vs state" in medieval Europe.' }
          ],
            remediations: { 'the-temple-and-palace-were': { steps: ['Re-read the Enmerkar epic passage in NCERT (p. 15) — note who initiates trade, who writes the tablet, and for whose.', 'Compare the Uruk temple plan (p. 16) with the Mari palace plan (p.', 'List three functions the temple performed (land owner, employer, record-keeper) and trace which the palace absorbed at.', 'Write one paragraph explaining why "secularisation" is the wrong analytical lens for 1800 BCE Mesopotamia.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_001', difficulty: 'standard',
          question: 'Mesopotamia (Greek: *mesos* \'middle\', *potamos* \'river\') refers to the.',
          hint: 'Revisit **c6_history_ch04_003** (Harappan town planning) and **c6_history_ch04_004**.',
          misconception: 'Students conflate **"Mesopotamia = fertile crescent = naturally rich agriculture"** and assume urbanisation was a.',
          parts: [
                { id: 'a', prompt: 'Name the two rivers that define Mesopotamia and state the modern country where the southern alluvial zone (Sumer/Babylonia) is located.', answer: 'The two rivers are the **Tigris** and the **Euphrates**',
                  options: ['The two rivers are the **Tigris** and the **Euphrates**', 'Mesopotamia had good farming so cities grew'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate **"Mesopotamia = fertile crescent = naturally rich agriculture"** and assume urbanisation was a passive outcome of.' },
                { id: 'b', prompt: 'Using the NCERT\'s description of the three ecological zones (north-eastern plains, northern steppe, southern desert), construct a resource-flow diagram showing.', answer: '**Flows**: (1) **Silt & water** → mountains → southern desert (agriculture)',
                  options: ['**Flows**: (1) **Silt & water** → mountains → southern desert (agriculture)', 'Mesopotamia had good farming so cities grew'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate **"Mesopotamia = fertile crescent = naturally rich agriculture"** and assume urbanisation was a passive outcome of.' }
          ],
            remediations: { 'students-conflate-mesopotamia-fertile-crescent': { steps: ['**Map exercise**: Print NCERT Map 2.', 'Colour-code the three zones (green=mountains, yellow=steppe, brown=desert).', 'Draw arrows for *each* resource flow (silt, grain, timber, copper, wool).', 'Label *who* manages each flow (villagers, temples, kings, merchants).'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate **"Mesopotamia = fertile crescent = naturally rich agriculture"** and assume urbanisation was a.',
          parts: [
                { id: 'a', prompt: 'The NCERT argues: "Let us not… make the mistake of thinking that cities grew simply because of rural prosperity." Evaluate this claim using evidence from the.', answer: 'The claim is **valid**',
                  options: ['The claim is **valid**', 'Mesopotamia had good farming so cities grew'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate **"Mesopotamia = fertile crescent = naturally rich agriculture"** and assume urbanisation was a passive outcome of.' }
          ],
            remediations: { 'students-conflate-mesopotamia-fertile-crescent': { steps: ['**Map exercise**: Print NCERT Map 2.', 'Colour-code the three zones (green=mountains, yellow=steppe, brown=desert).', 'Draw arrows for *each* resource flow (silt, grain, timber, copper, wool).', 'Label *who* manages each flow (villagers, temples, kings, merchants).'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_004', difficulty: 'standard',
          question: 'Sumerian city-states were independent, temple-centered urban settlements in.',
          hint: 'If stuck, revisit Class 9 Geography Ch. 2 (Drainage) on river regimes and Class 6 History.',
          misconception: 'Students often believe Mesopotamian cities arose *because* of high agricultural productivity alone ("fertile crescent =.',
          parts: [
                { id: 'a', prompt: 'Explain why the earliest Mesopotamian writing (c. 3200 BCE) emerged in temple economies of Uruk rather than in palaces or marketplaces.', answer: 'Writing emerged in temples',
                  options: ['Writing emerged in temples', 'kings needed to record laws', 'merchants needed contracts'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Mesopotamian cities arose *because* of high agricultural productivity alone ("fertile crescent = easy farming").' },
                { id: 'b', prompt: 'A historian argues: "The city-state of Ur (c. 2500 BCE) was more socially stratified than Mohenjo-daro (c.', answer: 'The claim is partially valid but oversimplified',
                  options: ['The claim is partially valid but oversimplified', 'fertile crescent = easy farming'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Mesopotamian cities arose *because* of high agricultural productivity alone ("fertile crescent = easy farming").' }
          ],
            remediations: { 'mesopotamian-cities-arose-because-of': { steps: ['11–13 (Geography of Mesopotamia) and 16–18 (Temples and Kings) — annotate every phrase linking *environment* to.', 'functioned as irrigation canals" → "organized trade and storage needed").', 'Compare Map 2 (Mesopotamia: Mountains, Steppe, Desert, Irrigated Zone) with Class 6 Harappan map — list *five* resource.', 'Write a 100-word answer: "Why did the temple become the first urban institution in Sumer but not in the Indus?" Use.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Mesopotamian cities arose *because* of high agricultural productivity alone ("fertile crescent =.',
          parts: [
                { id: 'a', prompt: 'Assess the significance of the "Enmerkar and the Lord of Aratta" epic for understanding the relationship between kingship, writing, and long-distance trade in.', answer: 'The epic reveals three linked developments: (1) Kingship *organized* trade',
                  options: ['The epic reveals three linked developments: (1) Kingship *organized* trade', 'fertile crescent = easy farming'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Mesopotamian cities arose *because* of high agricultural productivity alone ("fertile crescent = easy farming").' }
          ],
            remediations: { 'mesopotamian-cities-arose-because-of': { steps: ['11–13 (Geography of Mesopotamia) and 16–18 (Temples and Kings) — annotate every phrase linking *environment* to.', 'functioned as irrigation canals" → "organized trade and storage needed").', 'Compare Map 2 (Mesopotamia: Mountains, Steppe, Desert, Irrigated Zone) with Class 6 Harappan map — list *five* resource.', 'Write a 100-word answer: "Why did the temple become the first urban institution in Sumer but not in the Indus?" Use.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_010', difficulty: 'standard',
          question: 'Cities as centres of specialised craft production refers to the urban economic.',
          hint: 'Review the Bronze Age trade network map (NCERT p.11, Map 2) and the textbook description.',
          misconception: 'Students believe Mesopotamian cities developed craft specialisation because they were "advanced" or "innovative,".',
          parts: [
                { id: 'a', prompt: 'What were the three primary raw materials that southern Mesopotamia lacked but were essential for bronze-age craft production, and from which regions were they.', answer: 'Southern Mesopotamia lacked copper, tin, and quality timber',
                  options: ['Southern Mesopotamia lacked copper, tin, and quality timber', 'advanced', 'innovative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Mesopotamian cities developed craft specialisation because they were "advanced" or "innovative," rather than understanding.' },
                { id: 'b', prompt: 'A cylinder seal impression from Ur shows a banquet scene with musicians, a seated ruler, and attendants. The seal is made of lapis lazuli from Afghanistan.', answer: 'Minimum crafts: lapis lazuli miner (Afghanistan), long-distance trader,',
                  options: ['Minimum crafts: lapis lazuli miner (Afghanistan), long-distance trader,', 'advanced', 'innovative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Mesopotamian cities developed craft specialisation because they were "advanced" or "innovative," rather than understanding.' },
                { id: 'c', prompt: 'Compare the organisation of craft production in Mesopotamian cities (Uruk/Ur) with Harappan cities (Mohenjo-daro/Dholavira).', answer: 'Similarities: (1) Both used standardised weights/measures for craft trade',
                  options: ['Similarities: (1) Both used standardised weights/measures for craft trade', 'centralised', 'advanced'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Mesopotamian cities developed craft specialisation because they were "advanced" or "innovative," rather than understanding.' }
          ],
            remediations: { 'mesopotamian-cities-developed-craft-specialisati': { steps: ['If the student holds this misconception: (1) Have them map the raw material sources for Mesopotamian vs.', 'Harappan crafts on a blank West Asia/South Asia map—visualising the distance to copper/tin/lapis for Mesopotamia vs.', '(2) Compare a Mesopotamian ration tablet (listing "10 litres barley to 5 weavers for 30 days") with Harappan workshop.', '(3) Read the Enmerkar epic excerpt (NCERT p.15) showing the king organising trade for temple beautification—not.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Mesopotamian cities developed craft specialisation because they were "advanced" or "innovative,".',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The invention of the potter\'s wheel in Mesopotamia c.', answer: 'The claim is partially correct but incomplete',
                  options: ['The claim is partially correct but incomplete', 'advanced', 'innovative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Mesopotamian cities developed craft specialisation because they were "advanced" or "innovative," rather than understanding.' },
                { id: 'b', prompt: 'Construct a historical argument: "Writing emerged in Mesopotamia as a tool for managing craft production and trade, not for literature or religion." Use three.', answer: 'Evidence supporting: (1) Earliest tablets (Uruk IV, c',
                  options: ['Evidence supporting: (1) Earliest tablets (Uruk IV, c', 'advanced', 'innovative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Mesopotamian cities developed craft specialisation because they were "advanced" or "innovative," rather than understanding.' }
          ],
            remediations: { 'mesopotamian-cities-developed-craft-specialisati': { steps: ['If the student holds this misconception: (1) Have them map the raw material sources for Mesopotamian vs.', 'Harappan crafts on a blank West Asia/South Asia map—visualising the distance to copper/tin/lapis for Mesopotamia vs.', '(2) Compare a Mesopotamian ration tablet (listing "10 litres barley to 5 weavers for 30 days") with Harappan workshop.', '(3) Read the Enmerkar epic excerpt (NCERT p.15) showing the king organising trade for temple beautification—not.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_002', difficulty: 'standard',
          question: 'The origins of writing in Mesopotamia (c. 3200 BCE) trace the evolutionary.',
          hint: 'Revisit c11_hist_cbse_01_001 (Mesopotamia geography) and the NCERT section "Urbanisation.',
          misconception: 'Students believe "cuneiform" refers to the *language* (like "Sanskrit") rather than the *script* (wedge-shaped signs),.',
          parts: [
                { id: 'a', prompt: 'What was the primary material used for writing in early Mesopotamia, and approximately when do the earliest written tablets date to?', answer: 'The primary material was clay, and the earliest tablets date to c',
                  options: ['The primary material was clay, and the earliest tablets date to c', 'papyrus', '2000 BCE'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "cuneiform" refers to the *language* (like "Sanskrit") rather than the *script* (wedge-shaped signs), and that it was used.' },
                { id: 'b', prompt: 'Why did the earliest Mesopotamian tablets (c. 3200 BCE) contain lists of oxen, fish, and bread loaves rather than stories or laws?', answer: 'These tablets recorded temple redistributive transactions — goods brought in or',
                  options: ['These tablets recorded temple redistributive transactions — goods brought in or', 'they hadn\'t invented literature yet', 'cuneiform'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "cuneiform" refers to the *language* (like "Sanskrit") rather than the *script* (wedge-shaped signs), and that it was used.' },
                { id: 'c', prompt: 'A student claims: "Cuneiform signs began as pictures of objects and always remained pictures." Using the evolution from tokens to syllabic cuneiform, explain.', answer: 'The evolution was: 3D tokens (c',
                  options: ['The evolution was: 3D tokens (c', 'cuneiform', 'Sanskrit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "cuneiform" refers to the *language* (like "Sanskrit") rather than the *script* (wedge-shaped signs), and that it was used.' }
          ],
            remediations: { 'cuneiform-refers-to-the-language': { steps: ['Show a side-by-side image of a Sumerian tablet (c. 2500 BCE) and an Akkadian tablet (c.', 'Have students identify *identical signs* (e.g., the sign for "king" / "šar") used for different words.', 'Map the spread: use Map 1 (NCERT p. 10) to trace cuneiform from Uruk → Syria (Ebla) → Turkey (Hittites) → Egypt (Amarna.', 'Assign a 3-sentence write-up: "Cuneiform is a script, not a language. Evidence: ______."'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "cuneiform" refers to the *language* (like "Sanskrit") rather than the *script* (wedge-shaped signs),.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Writing in Mesopotamia was invented by kings to glorify their deeds." Use evidence from the Uruk period (c.', answer: 'The claim is *partially true but chronologically reversed*',
                  options: ['The claim is *partially true but chronologically reversed*', 'cuneiform', 'Sanskrit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "cuneiform" refers to the *language* (like "Sanskrit") rather than the *script* (wedge-shaped signs), and that it was used.' },
                { id: 'b', prompt: 'Construct a 4-stage timeline showing the *material and cognitive shifts* from Neolithic tokens to developed cuneiform, labelling each stage with: (a).', answer: 'Stage 1: c',
                  options: ['Stage 1: c', 'cuneiform', 'Sanskrit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "cuneiform" refers to the *language* (like "Sanskrit") rather than the *script* (wedge-shaped signs), and that it was used.' }
          ],
            remediations: { 'cuneiform-refers-to-the-language': { steps: ['Show a side-by-side image of a Sumerian tablet (c. 2500 BCE) and an Akkadian tablet (c.', 'Have students identify *identical signs* (e.g., the sign for "king" / "šar") used for different words.', 'Map the spread: use Map 1 (NCERT p. 10) to trace cuneiform from Uruk → Syria (Ebla) → Turkey (Hittites) → Egypt (Amarna.', 'Assign a 3-sentence write-up: "Cuneiform is a script, not a language. Evidence: ______."'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_003', difficulty: 'standard',
          question: 'Cuneiform script is the wedge-shaped writing system developed in ancient.',
          hint: 'Revisit c11_hist_cbse_01_002 — focus on the bullae (clay envelopes) and how token.',
          misconception: 'Students often believe cuneiform was an alphabet where each wedge equals a letter (like English), and that most.',
          parts: [
                { id: 'a', prompt: 'What is the approximate date of the earliest known cuneiform tablets from Uruk, and what primary content do they record?', answer: 'The earliest cuneiform tablets date to c',
                  options: ['The earliest cuneiform tablets date to c', '2000 BCE', 'law codes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe cuneiform was an alphabet where each wedge equals a letter (like English), and that most Mesopotamians could.' },
                { id: 'b', prompt: 'Why did Mesopotamian scribes use a reed stylus on clay tablets rather than ink on papyrus or carving on stone, given that Egypt used papyrus and the Harappans.', answer: 'Mesopotamia lacked papyrus and had limited stone/wood',
                  options: ['Mesopotamia lacked papyrus and had limited stone/wood', 'clay was more durable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe cuneiform was an alphabet where each wedge equals a letter (like English), and that most Mesopotamians could.' },
                { id: 'c', prompt: 'A scribe in 2600 BCE Uruk receives an order: "Record the delivery of 300 litres of barley to the temple storehouse, received from Farmer A, witnessed by.', answer: '(1) Collect levigated clay from riverbed',
                  options: ['(1) Collect levigated clay from riverbed', 'moist clay'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe cuneiform was an alphabet where each wedge equals a letter (like English), and that most Mesopotamians could.' }
          ],
            remediations: { 'cuneiform-was-an-alphabet-where': { steps: ['Show the student a photo of a cuneiform tablet (e.g., the mathematical tablet with √2) and a school exercise tablet.', 'Have them copy 5 signs with a reed on clay — time them; discuss physical difficulty.', 'Compare with a Brahmi alphabet chart — highlight sign-count difference.', 'Read the NCERT passage on literacy ("Very few Mesopotamians could read and write...', 'Rewrite a 3-mark answer: "Explain why literacy was limited in Mesopotamia" using evidence from steps 1–4.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe cuneiform was an alphabet where each wedge equals a letter (like English), and that most.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Cuneiform\'s longevity (3200 BCE – 1st century CE) proves it was a perfectly efficient writing system for all Mesopotamian languages."', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'yes, it lasted 3000 years'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe cuneiform was an alphabet where each wedge equals a letter (like English), and that most Mesopotamians could.' }
          ],
            remediations: { 'cuneiform-was-an-alphabet-where': { steps: ['Show the student a photo of a cuneiform tablet (e.g., the mathematical tablet with √2) and a school exercise tablet.', 'Have them copy 5 signs with a reed on clay — time them; discuss physical difficulty.', 'Compare with a Brahmi alphabet chart — highlight sign-count difference.', 'Read the NCERT passage on literacy ("Very few Mesopotamians could read and write...', 'Rewrite a 3-mark answer: "Explain why literacy was limited in Mesopotamia" using evidence from steps 1–4.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
