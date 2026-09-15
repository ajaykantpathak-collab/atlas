import type { SimDef } from '../../engine/types';

/** v3 generated — c10_eco_ch04_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_eco_ch04_p2: SimDef = {
    id: 'v3_c10_eco_ch04_p2',
    title: 'Globalisation and the Indian Economy · Part 2/2',
    subtitle: 'Unpick the global journey of the products in your pocket',
    classLevel: 10, subject: 'economics', topic: 'Globalisation and the Indian Economy · Part 2/2',
    chapters: ['c10_eco_ch04'],
    nodeIds: ['c10_eco_cbse_04_007', 'c10_eco_cbse_04_008', 'c10_eco_cbse_04_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a trade analyst mapping where products really come from', intro: 'Samsung, Apple, Xiaomi and Lava all fight for space on one Indian shelf — a sight impossible when import duties topped 100% and two car models ruled the roads.', goal: 'Explain global production chains and market integration, including why prices converge but never fully equalise.' },
    discovery: {
        question: 'Your phone was \'assembled in India\' — yet its processor was designed in the USA, chips came from Korea, the screen from China. So which country actually made your phone?',
        options: ['No single country — a global production chain splits each stage wherever it\'s cheapest or most skilled', 'China — because most parts shipped from there', 'India — because final assembly is where a product is \'made\'', 'The USA — because the company that designed it is American'],
        answer: 'No single country — a global production chain splits each stage wherever it\'s cheapest or most skilled',
        hook: 'Globalisation isn\'t about importing finished goods — it\'s about slicing one product across the planet so each piece is made where it makes most sense.',
    },
    teaching: [
        { title: 'Impact of Globalisation in India: Negative Effects on Small Producers', text: 'The negative effects of globalisation on small producers in India refer to the adverse consequences faced by small-scale industries, artisans, and farmers due to increased foreign competition.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_eco_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow an electric scooter\'s battery, body and assembly across three countries, compute the landed cost of imported wheat, and judge who wins when markets integrate.',
        labels: ['Impact of Globalisation', 'Fair Globalisation: Steps', 'Role of MNCs'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_eco_cbse_04_007', title: 'Impact of Globalisation in India: Negative Effects on Small Producers',
          caseStudy: { intro: 'Imagine a small toy manufacturer in Channapatna, Karnataka, who has been making wooden toys for generations.',
            decisions: [{ prompt: 'State two specific reasons why small-scale industries in India faced closure after the 1991 liberalisation policies.', options: [
                { text: 'Correct answer: (1) Removal of import restrictions and reduction of tariffs allowed', outcome: 'Correct answer: (1) Removal of import restrictions and reduction of tariffs allowed cheaper foreign.' },
                { text: 'globalisation increased exports for everyone', outcome: 'Not quite — Students often think "globalisation hurts all small producers equally" and write generic answers.', reveals: 'globalisation-hurts-all-small-producers' },
                { text: 'globalisation hurts all small producers equally', outcome: 'Not quite — Students often think "globalisation hurts all small producers equally" and write generic answers.', reveals: 'globalisation-hurts-all-small-producers' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_04_009', title: 'Role of MNCs in the Indian Economy: Benefits and Concerns',
          caseStudy: { intro: 'Imagine you walk into a Reliance Digital store in Bengaluru: you see Samsung phones (South Korean MNC), Dell laptops (US MNC), and boAt headphones (Indian.',
            decisions: [{ prompt: 'Define Foreign Direct Investment (FDI) in the context of MNC operations in India, and state the two main entry routes (greenfield and.', options: [
                { text: 'FDI is investment by a resident entity of one economy (the MNC) obtaining a lasting', outcome: 'FDI is investment by a resident entity of one economy (the MNC) obtaining a lasting interest (10%.' },
                { text: 'lasting interest with control', outcome: 'Not quite — Students believe "MNCs only exploit cheap Indian labor and take all profits abroad" — they cite low.', reveals: 'mncs-only-exploit-cheap-indian' },
                { text: 'short-term financial asset holding', outcome: 'Not quite — Students believe "MNCs only exploit cheap Indian labor and take all profits abroad" — they cite low.', reveals: 'mncs-only-exploit-cheap-indian' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_04_007', title: 'A real-world call',
          caseStudy: { intro: 'A multinational brings jobs to an Indian town but pays less than it would abroad and ships profits home. A local company pays fairly but can\'t compete on price and is closing.',
            decisions: [{ prompt: 'Is globalisation good when it saves jobs but squeezes them?', options: [
                { text: 'Take the jobs — some income beats none', outcome: 'True for the worker today; the question is whether \'today\' becomes a permanent arrangement.' },
                { text: 'Protect the local company', outcome: 'Keeps value and dignity local, but protection can hide inefficiency until the protection itself fails.' },
                { text: 'Take the jobs AND fight for better terms', outcome: 'The hard middle — requires worker organizing and regulation, which is exactly what globalisation pressures governments to skip.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student unboxes a new smartphone and reads the fine print: designed in California, processor from one country, display from another, assembled in India, sold worldwide. Her brother asks why the company doesn\'t just make the whole phone in one factory.',
            decisions: [{ prompt: 'What explains the phone\'s multi-country production?', options: [
                { text: 'The company is an MNC spreading production across a global chain — each stage goes where it is most advantageous: advanced components where the technology and skilled engineers are, assembly where costs and skills balance, sales where the markets are. Interlinked production across borders is exactly what globalisation means.', outcome: 'No single location is best at everything, so the firm coordinates factories in several countries — cheaper labour, better technology and market access at different stages lower total cost.' },
                { text: 'It is mostly for the label — companies scatter production across countries so the box looks impressive, but one factory could do it all just as cheaply.', outcome: 'The spread is economic, not decorative — each stage really does cost less or perform better in its chosen location, which is why assembly plants, chip fabs and display makers sit in different countries.', reveals: 'global-spread-is-marketing' },
                { text: 'Phones are made in many countries only because trade rules force companies to share production between nations.', outcome: 'Firms choose multi-country production to cut costs and access skills and markets — trade rules shape where they can go, but no rule forces them to split production.', reveals: 'rules-force-global-production' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_04_009', title: 'You made it',
          caseStudy: { intro: 'One product, many passports. MNCs stitch the world into a single factory — and the fight is over who captures the value and who gets just the wages.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_eco_cbse_04_007', difficulty: 'standard',
          question: 'The negative effects of globalisation on small producers in India refer to the.',
          hint: 'If stuck, revisit c10_eco_cbse_04_004 (Liberalisation) and c8_eco_ch1_2 (Factors.',
          misconception: 'Students often think "globalisation hurts all small producers equally" and write generic answers like "small industries.',
          parts: [
                { id: 'a', prompt: 'Explain why a small garment manufacturer in Tirupur might lose business to a large MNC-branded garment company even if both sell similar quality cotton shirts.', answer: 'Correct answer: The MNC benefits from economies of scale (bulk purchasing of raw',
                  options: ['Correct answer: The MNC benefits from economies of scale (bulk purchasing of raw', 'the MNC pays lower wages', 'globalisation hurts all small producers equally', 'small industries closed down'],
                  hint: 'If stuck, revisit c10_eco_cbse_04_004 (Liberalisation) and c8_eco_ch1_2 (Factors of Production).',
                  misconception: 'Students often think "globalisation hurts all small producers equally" and write generic answers like "small industries closed down." The.' },
                { id: 'b', prompt: 'A small farmer in Maharashtra grows cotton. After globalisation, he faces two changes: (a) international cotton prices fall due to subsidies in the USA, and.', answer: 'Step 1: Domestic market effective price = ₹5,200 (no extra cost)',
                  options: ['Step 1: Domestic market effective price = ₹5,200 (no extra cost)', 'globalisation hurts all small producers equally', 'small industries closed down', 'liberalisation'],
                  hint: 'If stuck, revisit c10_eco_cbse_04_004 (Liberalisation) and c8_eco_ch1_2 (Factors of Production).',
                  misconception: 'Students often think "globalisation hurts all small producers equally" and write generic answers like "small industries closed down." The.' },
                { id: 'c', prompt: 'Compare the impact of globalisation on a traditional handloom weaver in Varanasi versus a small auto-components manufacturer in Pune supplying to an MNC.', answer: 'Similarity: Both face competitive pressure from global integration',
                  options: ['Similarity: Both face competitive pressure from global integration', 'both benefit equally from technology transfer', 'globalisation hurts all small producers equally', 'small industries closed down'],
                  hint: 'If stuck, revisit c10_eco_cbse_04_004 (Liberalisation) and c8_eco_ch1_2 (Factors of Production).',
                  misconception: 'Students often think "globalisation hurts all small producers equally" and write generic answers like "small industries closed down." The.' }
          ],
            remediations: { 'globalisation-hurts-all-small-producers': { steps: ['Revisit c10_eco_cbse_04_002 (Foreign Trade and Integration) to recall how tariff reduction changes relative prices.', 'Use data from the Annual Survey of Industries (ASI) or NSSO reports to compare growth rates of export-oriented vs.', 'Map specific Indian clusters (e.g., Ludhiana hosiery vs. Firozabad glass) to see divergent outcomes.', 'Practice writing answers that distinguish between "necessary condition" (liberalisation) and "sufficient condition".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_04_008', difficulty: 'standard',
          question: 'Fair globalisation refers to a process of global economic integration where the.',
          hint: 'If stuck, revisit the negative effects of globalisation (c10_eco_cbse_04_007) and the.',
          misconception: 'Students often think fair globalisation means every country gets exactly the same benefits, or that it requires.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Fair globalisation refers to a process of global economic integration where the benefits',
                  options: ['Fair globalisation refers to a process of global economic integration where the benefits', 'A Multinational Corporation (MNC) is a company that owns or controls production of goods', 'Foreign trade refers to the exchange of goods, services, and capital across international', 'Globalisation is the process of increasing interconnectedness and integration of national'],
                  hint: 'If stuck, revisit the negative effects of globalisation (c10_eco_cbse_04_007) and the role.',
                  misconception: 'Students often think fair globalisation means every country gets exactly the same benefits, or that it requires stopping globalisation.' }
          ],
            remediations: { 'fair-globalisation-means-every-country': { steps: ['If a student holds this misconception, use a concrete data example: Show India\'s GDP growth post-1991 alongside rising.', 'Then illustrate how a policy like MGNREGA (rural employment guarantee) redistributes some gains.', 'Ask: "Does this stop globalisation?', 'No, it makes its outcomes fairer." Guide them to distinguish between the process and the outcome.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_04_009', difficulty: 'standard',
          question: 'Multinational Corporations (MNCs) are large enterprises that own or control.',
          hint: 'If stuck, revisit c9_eco_ch2_10 (Market Equilibrium) and practice drawing supply shifts.',
          misconception: 'Students believe "MNCs only exploit cheap Indian labor and take all profits abroad" — they cite low factory wages.',
          parts: [
                { id: 'a', prompt: 'The Government of India launched the Production Linked Incentive (PLI) scheme for mobile manufacturing in 2020.', answer: 'CAGR = (Ending Value / Beginning Value)^(1/n) - 1',
                  options: ['CAGR = (Ending Value / Beginning Value)^(1/n) - 1', 'MNCs only exploit cheap Indian labor and take all profits abroad'],
                  hint: 'If stuck, revisit c9_eco_ch2_10 (Market Equilibrium) and practice drawing supply shifts with.',
                  misconception: 'Students believe "MNCs only exploit cheap Indian labor and take all profits abroad" — they cite low factory wages (e.g., ₹15,000/month for.' },
                { id: 'b', prompt: 'Compare the impact of Amazon (e-commerce MNC) on two Indian stakeholders: (a) a small kirana store owner in Tier-2 city, and (b) a consumer in a metro city.', answer: 'a small kirana store owner in Tier-2 city, and (',
                  options: ['a small kirana store owner in Tier-2 city, and (', 'MNCs only exploit cheap Indian labor and take all profits abroad'],
                  hint: 'If stuck, revisit c9_eco_ch2_10 (Market Equilibrium) and practice drawing supply shifts with.',
                  misconception: 'Students believe "MNCs only exploit cheap Indian labor and take all profits abroad" — they cite low factory wages (e.g., ₹15,000/month for.' }
          ],
            remediations: { 'mncs-only-exploit-cheap-indian': { steps: ['Revisit c10_eco_cbse_04_001 (MNC definition and global production networks) — identify exactly which MNC, which sector.', 'Pull real data from RBI\'s "Census on Foreign Liabilities and Assets of Indian Direct Investment Companies" (latest.', 'Draw a supply-demand diagram for that sector pre- and post-MNC entry — label consumer surplus, producer surplus.', 'Write a 4-point answer: (i) Benefit 1 with data, (ii) Benefit 2 with data, (iii) Concern 1 with data, (iv) Concern 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_04_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "MNCs only exploit cheap Indian labor and take all profits abroad" — they cite low factory wages.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "MNCs in the pharmaceutical sector (e.g., Pfizer, Novartis) strengthen India\'s health security by bringing patented life-saving drugs.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'patents are bad for poor countries', 'says "patents are bad for poor countries" ignores the innovation incentive'],
                  hint: 'If stuck, revisit c9_eco_ch2_10 (Market Equilibrium) and practice drawing supply shifts with.',
                  misconception: 'Students believe "MNCs only exploit cheap Indian labor and take all profits abroad" — they cite low factory wages (e.g., ₹15,000/month for.' }
          ],
            remediations: { 'mncs-only-exploit-cheap-indian': { steps: ['Revisit c10_eco_cbse_04_001 (MNC definition and global production networks) — identify exactly which MNC, which sector.', 'Pull real data from RBI\'s "Census on Foreign Liabilities and Assets of Indian Direct Investment Companies" (latest.', 'Draw a supply-demand diagram for that sector pre- and post-MNC entry — label consumer surplus, producer surplus.', 'Write a 4-point answer: (i) Benefit 1 with data, (ii) Benefit 2 with data, (iii) Concern 1 with data, (iv) Concern 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
