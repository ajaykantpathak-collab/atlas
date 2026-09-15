import type { SimDef } from '../../engine/types';

/** v3 generated — c10_geo_ch07_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_geo_ch07_p2: SimDef = {
    id: 'v3_c10_geo_ch07_p2',
    title: 'Lifelines of National Economy · Part 2/2',
    subtitle: 'Move a nation\'s goods across five kinds of lifelines',
    classLevel: 10, subject: 'geography', topic: 'Lifelines of National Economy · Part 2/2',
    chapters: ['c10_geo_ch07'],
    nodeIds: ['c10_geo_cbse_07_007', 'c10_geo_cbse_07_008', 'c10_geo_cbse_07_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a national logistics planner', intro: 'A fish caught in Kerala, a passenger flying to Delhi, gas flowing under Gujarat — all of it is transport doing one job: connecting where things are made to where they are needed.', goal: 'Compare the five modes of transport and communication in India, and explain why each earns the title \'lifeline of the national economy.\'' },
    discovery: {
        question: 'India has roads, railways, waterways, airways and even pipelines. A fisherman\'s catch, a software engineer\'s commute and crude oil bound for a refinery all travel differently — yet the chapter calls ALL of them \'lifelines.\' What makes a mode of transport earn that title?',
        options: ['It links production centres with consumption centres — moving goods, people and services so the economy actually functions', 'It must be government-owned and nationally funded', 'Only modes that cross state borders count as lifelines', 'It must carry passengers, not just cargo'],
        answer: 'It links production centres with consumption centres — moving goods, people and services so the economy actually functions',
        hook: 'A mango that can\'t reach a market is just a falling fruit. Transport is what turns geography into an economy — every mode is a different kind of vein in the same body.',
    },
    teaching: [
        { title: 'Communication: Personal and Mass Communication (Postal, Telecom, Media)', text: 'Communication refers to the process of transmitting information, ideas, and messages between individuals or groups over distance using various media.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_geo_cbse_07_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Route a week of Indian life — farm produce to mandis, coal to power plants, crude through pipelines, passengers by rail and air — and match each cargo to the mode that fits it best.',
        labels: ['Communication: Personal and Mass', 'International Trade: Exports', 'Tourism as a Trade'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_geo_cbse_07_007', title: 'Communication: Personal and Mass Communication (Postal, Telecom, Media)',
          caseStudy: { intro: 'Imagine you are in a remote village in Rajasthan and want to send money to your brother studying in Delhi, while also watching the same news broadcast.',
            decisions: [{ prompt: 'What is the primary difference between personal communication and mass communication? Give one example of each from the Indian context.', options: [
                { text: 'Personal communication involves direct exchange between two or more specific individuals', outcome: 'Personal communication involves direct exchange between two or more specific individuals (e.g.,.' },
                { text: 'mass communication', outcome: 'Not quite — Students often think "mass communication" means only television and newspapers, forgetting that.', reveals: 'mass-communication-means-only-television' },
                { text: 'telecom', outcome: 'Not quite — Students often think "mass communication" means only television and newspapers, forgetting that.', reveals: 'mass-communication-means-only-television' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_07_008', title: 'International Trade: Exports and Imports of India (Balance of Trade)',
          scaffold: { problem: 'Using the following FY 2023-24 data (source: DGCI&S), calculate India\'s merchandise trade deficit and express it as a percentage of total.',
            steps: [
            { text: 'Identify the given data — Exports (X) = $437B, Imports (M) = $677B for FY24; X = $451B, M = $714B for FY23' },
            { text: 'Apply BoT formula for FY24 — BoT = X – M = 437 – 677 = –$240 billion (trade deficit)' },
            { text: 'Calculate total trade for FY24 — Total Trade = X + M = 437 + 677 = $1,114 billion' },
            { text: 'Compute deficit as % of total trade — Deficit % = (|BoT| / Total Trade) × 100 = (240 / 1114) × 100 = 21.5%' },
            { text: 'Repeat for FY23 — BoT = 451 – 714 = –$263B; Total Trade = 451 + 714 = $1,165B; Deficit % = (263/1165)×100 = 22.6%' },
            { text: 'Interpret — Absolute deficit narrowed ($263B → $240B) and deficit intensity fell (22.6% → 21.5%) because imports fell.', faded: true, blankAnswer: 'FY24 Merchandise Trade Deficit = $240 billion (21.5%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_07_009', title: 'Tourism as a Trade: Importance and Potential in India',
          scaffold: { problem: 'The Ministry of Tourism reports that in 2023, 9.2 million foreign tourists visited India, with average per-tourist expenditure of $1,850.',
            steps: [
            { text: 'Identify the formula for net foreign exchange earnings: Net = Gross Earnings - Import Content.' },
            { text: 'Calculate gross earnings in dollars: 9.2 million tourists × $1,850/tourist = $17,020 million = $17.02 billion.' },
            { text: 'Convert gross earnings to rupees: $17,020 million × ₹83 = ₹1,412,660 million = ₹1,41,266 crore.' },
            { text: 'Calculate import content (18% of gross): 0.18 × ₹1,41,266 crore = ₹25,427.88 crore.' },
            { text: 'Calculate net earnings: ₹1,41,266 crore - ₹25,427.88 crore = ₹1,15,838.12 crore ≈ ₹1,15,838 crore.' },
            { text: 'Interpret: This net amount enters India\'s foreign exchange reserves, strengthening the rupee and funding imports like.', faded: true, blankAnswer: 'Net foreign exchange earnings from tourism in 2023 ≈.' }
            ] } },
        { type: 'case', nodeId: 'c10_geo_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A family\'s small farm business must send two consignments to a distant city: crates of ripe mangoes that spoil in two days, and a large load of cheap building stone that can take a week. A cousin advises sending \'everything by truck — road is always best.\'',
            decisions: [{ prompt: 'How should the family actually choose between road, rail, coastal shipping and air?', options: [
                { text: 'Match the mode to the cargo — the mangoes are perishable and high-value, so speed justifies the dearer option: refrigerated trucking or air gets them there inside the spoiling window. The stone is bulky, heavy and cheap, where cost per tonne matters far more than speed — rail or coastal shipping, the cheapest per tonne-kilometre for long hauls, is the right fit.', outcome: 'Transport choice trades cost against time and cargo character: road gives door-to-door flexibility, rail and waterways win on bulk, air wins on urgency — no single mode is \'always best.\'' },
                { text: 'The cousin is right — road is always best because only trucks offer door-to-door delivery.', outcome: 'Door-to-door convenience does not beat cost for a week\'s-worth of cheap stone, and may be too slow for mangoes on a very long haul — the cargo decides, not the convenience.', reveals: 'road-always-best' },
                { text: 'They should send both by air — fastest is always safest for business.', outcome: 'Flying cheap building stone would cost more than the stone earns — speed matters only when the cargo\'s value or perishability demands it.', reveals: 'fastest-always-best' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_07_009', title: 'You made it',
          caseStudy: { intro: 'Roads knit villages to towns, rails move the bulk, pipes flow invisibly underground. Together they are why a country this size behaves like one economy.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_geo_cbse_07_007', difficulty: 'standard',
          question: 'Communication refers to the process of transmitting information, ideas, and.',
          hint: 'Review the "Transport: Importance and Various Modes" node (c10_geo_cbse_07_001) to recall.',
          misconception: 'Students often think "mass communication" means only television and newspapers, forgetting that radio (AIR) remains the.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Mobile telephony has solved India\'s communication gap completely." Using the concept of teledensity and the rural-urban divide, evaluate.', answer: 'The statement is false',
                  options: ['The statement is false', 'mass communication', 'telecom'],
                  hint: 'Review the "Transport: Importance and Various Modes" node (c10_geo_cbse_07_001) to recall how.',
                  misconception: 'Students often think "mass communication" means only television and newspapers, forgetting that radio (AIR) remains the widest-reaching.' }
          ],
            remediations: { 'mass-communication-means-only-television': { steps: ['Draw a two-column table: "Personal Communication" and "Mass Communication".', 'On an outline map of India, mark the locations of: (a) a major Doordarshan Kendra, (b) an All India Radio station in.', 'Read the "Communication" section in NCERT Class 10 Chapter 7 and highlight every function listed for India Post, BSNL.', 'Explain to a peer why a farmer in Ladakh relies more on AIR than on Instagram for weather alerts.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "mass communication" means only television and newspapers, forgetting that radio (AIR) remains the.',
          parts: [
                { id: 'a', prompt: 'Design a communication strategy for a new government scheme targeting farmers in a drought-prone district of Maharashtra.', answer: 'A good answer combines: Mass channels',
                  options: ['A good answer combines: Mass channels', 'mass communication', 'telecom'],
                  hint: 'Review the "Transport: Importance and Various Modes" node (c10_geo_cbse_07_001) to recall how.',
                  misconception: 'Students often think "mass communication" means only television and newspapers, forgetting that radio (AIR) remains the widest-reaching.' }
          ],
            remediations: { 'mass-communication-means-only-television': { steps: ['Draw a two-column table: "Personal Communication" and "Mass Communication".', 'On an outline map of India, mark the locations of: (a) a major Doordarshan Kendra, (b) an All India Radio station in.', 'Read the "Communication" section in NCERT Class 10 Chapter 7 and highlight every function listed for India Post, BSNL.', 'Explain to a peer why a farmer in Ladakh relies more on AIR than on Instagram for weather alerts.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_07_008', difficulty: 'standard',
          question: 'International trade refers to the exchange of goods and services between India.',
          hint: 'If stuck, revisit c10_geo_cbse_07_005 (Waterways: major ports and their hinterlands) and.',
          misconception: 'Students believe "Balance of Trade" and "Balance of Payments" are the same thing and use the terms interchangeably.',
          parts: [
                { id: 'a', prompt: 'Given: India\'s exports to USA = $78 billion, imports from USA = $42 billion; exports to China = $16 billion, imports from China = $101 billion (FY 2023-24.', answer: 'Step 1: Recall formula',
                  options: ['Step 1: Recall formula', 'Balance of Trade', 'Balance of Payments', 'a trade deficit is always bad and a surplus always good'],
                  hint: 'If stuck, revisit c10_geo_cbse_07_005 (Waterways: major ports and their hinterlands) and.',
                  misconception: 'Students believe "Balance of Trade" and "Balance of Payments" are the same thing and use the terms interchangeably; they also think a trade.' }
          ],
            remediations: { 'balance-of-trade-and-balance': { steps: ['Create a two-column table — Left: "Balance of Trade (Visible)", Right: "Balance of Payments (Visible + Invisible.', 'Use RBI\'s "Balance of Payments" press release (latest quarter) — locate "Trade Balance" (-$60B) and "Current Account.', 'On India\'s political map, mark 5 major ports (Mumbai, JNPT, Mundra, Chennai, Kolkata) and annotate each with its top.', 'Practice one CBSE case-study question: "Read the extract from Economic Survey 2023 on \'Merchandise Trade Deficit widens.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_07_009', difficulty: 'standard',
          question: 'Tourism as a trade refers to the economic activity where people travel to and.',
          hint: 'If stuck on "how tourism earns forex", revisit c10_geo_cbse_07_008 International Trade.',
          misconception: 'Students think "tourism potential" means only famous monuments (Taj Mahal, Jaipur forts) and ignore that India\'s.',
          parts: [
                { id: 'a', prompt: 'Explain why the same geographical feature — the Himalayas — supports both adventure tourism (trekking in Ladakh) and wellness tourism (yoga retreats.', answer: 'The Himalayas offer high-altitude terrain for trekking/mountaineering AND serene',
                  options: ['The Himalayas offer high-altitude terrain for trekking/mountaineering AND serene', 'Himalayas are cold, desert is hot', 'tourism potential', 'domestic tourism'],
                  hint: 'If stuck on "how tourism earns forex", revisit c10_geo_cbse_07_008 International Trade — invisible.',
                  misconception: 'Students think "tourism potential" means only famous monuments (Taj Mahal, Jaipur forts) and ignore that India\'s tourism potential.' },
                { id: 'b', prompt: 'A tourist from the USA spends $2,000 on a 10-day medical tourism package in Chennai (hospital stay, surgery, recovery resort). The exchange rate is ₹83 = $1.', answer: 'Step 1: Gross earnings = $2,000 × ₹83 = ₹1,66,000',
                  options: ['Step 1: Gross earnings = $2,000 × ₹83 = ₹1,66,000', 'tourism potential', 'domestic tourism', 'local travel'],
                  hint: 'If stuck on "how tourism earns forex", revisit c10_geo_cbse_07_008 International Trade — invisible.',
                  misconception: 'Students think "tourism potential" means only famous monuments (Taj Mahal, Jaipur forts) and ignore that India\'s tourism potential.' },
                { id: 'c', prompt: 'Compare the tourism potential of Kerala\'s backwaters and Rajasthan\'s palace hotels.', answer: 'Kerala backwaters: (1) Lagoon-estuary network formed by coastal geography',
                  options: ['Kerala backwaters: (1) Lagoon-estuary network formed by coastal geography', 'culture', 'nature', 'tourism potential'],
                  hint: 'If stuck on "how tourism earns forex", revisit c10_geo_cbse_07_008 International Trade — invisible.',
                  misconception: 'Students think "tourism potential" means only famous monuments (Taj Mahal, Jaipur forts) and ignore that India\'s tourism potential.' }
          ],
            remediations: { 'tourism-potential-means-only-famous': { steps: ['Open India\'s physical map (Class 6: c6_geography_ch01_001 to c6_geography_ch01_007).', 'Pick ONE state per physical division: Himalayan (Uttarakhand), Northern Plains (Uttar Pradesh), Peninsular Plateau.', 'For each, list 2 tourism types linked to THAT division\'s geography (e.g., Uttarakhand: Char Dham pilgrimage + Valley.', 'Realise tourism potential is nationwide, not monument-centric.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
