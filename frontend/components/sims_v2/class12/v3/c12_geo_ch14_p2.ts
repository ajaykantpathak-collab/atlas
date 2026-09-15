import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch14_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch14_p2: SimDef = {
    id: 'v3_c12_geo_ch14_p2',
    title: 'Manufacturing Industries · Part 2/2',
    subtitle: '80% of the output, 20% of the jobs — manufacturing\'s split personality',
    classLevel: 12, subject: 'geography', topic: 'Manufacturing Industries · Part 2/2',
    chapters: ['c12_geo_ch14'],
    nodeIds: ['c12_geo_cbse_14_007', 'c12_geo_cbse_14_008', 'c12_geo_cbse_14_009', 'c12_geo_cbse_14_010', 'c12_geo_cbse_14_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Industrial classifier', intro: 'From a village potter\'s wheel to Bhilai\'s blast furnaces — one word, \'manufacturing\', holds them all. Learn its four ways of sorting.', goal: 'Classify manufacturing by raw material, scale, ownership and product, and weigh large- versus small-scale contributions.' },
    discovery: {
        question: 'Large factories produce ~80% of manufacturing GDP — yet small and cottage units employ ~80% of industrial workers. Who wins India\'s real battle?',
        options: ['Depends what\'s measured — capital-intensive giants win output; labour-intensive small units win jobs, generating 5-10x more employment per rupee of capital', 'Large scale wins both', 'Small scale wins both', 'Neither — they\'re equal'],
        answer: 'Depends what\'s measured — capital-intensive giants win output; labour-intensive small units win jobs, generating 5-10x more employment per rupee of capital',
        hook: 'Every industry wears four labels at once — raw material, scale, ownership, product type — and the map explains itself: agro-industries scatter to chase perishable crops while mineral industries cluster on the ore. A ₹50-lakh women\'s SHG bamboo unit and Bhilai Steel are both \'manufacturing\' — sorted differently on all four axes.',
    },
    teaching: [
        { title: 'Chemical and Fertiliser Industries in India', text: 'The chemical and fertiliser industry in India comprises the production of inorganic chemicals (soda ash, caustic soda, sulphuric acid), organic chemicals (petrochemicals, synthetic fibres, plastics).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_14_007', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Classify India\'s industrial zoo: tag Bhilai, Khadi, Maruti and Amul on all four bases, then explain why sugar mills hug cane fields while software doesn\'t need to.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_14_007', title: 'Chemical and Fertiliser Industries in India',
          caseStudy: { intro: 'Observe a bag of urea fertiliser used in a nearby farm — it likely came from a plant that uses natural gas as feedstock.',
            decisions: [{ prompt: 'Name the primary feedstock used in modern gas-based urea manufacturing plants in India and state one major gas pipeline that supplies them.', options: [
                { text: 'Correct answer: Natural gas (mainly methane) is the primary feedstock', outcome: 'Correct answer: Natural gas (mainly methane) is the primary feedstock; the.' },
                { text: 'naphtha', outcome: 'Not quite — Students often think **all fertiliser plants are located near the raw material source** (like iron.', reveals: 'all-fertiliser-plants-are-located' },
                { text: 'urea is still produced from naphtha at coastal refineries', outcome: 'Not quite — Students often think **all fertiliser plants are located near the raw material source** (like iron.', reveals: 'all-fertiliser-plants-are-located' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_14_008', title: 'Automobile Industry in India: Growth and Distribution',
          scaffold: { problem: 'Using 2023 production data, Chennai produced 6.2 lakh passenger vehicles (PV) out of India\'s 42.3 lakh PV.',
            steps: [
            { text: 'Identify formula — LQ = (Regional auto emp / Regional total emp) ÷ (National auto emp / National total emp).' },
            { text: 'Compute regional share = 1.8 lakh / 48 lakh = 0.0375 (3.75%).' },
            { text: 'Compute national share = 19 lakh / 650 lakh = 0.02923 (2.923%).' },
            { text: 'Divide: LQ = 0.0375 / 0.02923 = 1.283.' },
            { text: 'Interpret — LQ > 1 confirms Chennai\'s specialisation; 1.28 means 28% higher auto concentration than national average.', faded: true, blankAnswer: 'LQ = 1.28; Chennai is a specialised automobile cluster with.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_14_010', title: 'Industrial Regions of India: Major Clusters and Their Basis',
          caseStudy: { intro: 'Look at a political map of India and notice how factories cluster around Mumbai, Kolkata, Bengaluru, Jamshedpur, Ahmedabad, and Delhi — this is not random.',
            decisions: [{ prompt: 'Name the eight major industrial regions of India as identified in the NCERT textbook and state the dominant industry in the Chotanagpur.', options: [
                { text: 'The eight regions are: Mumbai-Pune, Hugli, Bangalore-Tamil Nadu, Gujarat, Chotanagpur,', outcome: 'The eight regions are: Mumbai-Pune, Hugli, Bangalore-Tamil Nadu, Gujarat, Chotanagpur.' },
                { text: 'or naming', outcome: 'Not quite — Students often believe "industrial region" means a single city with factories (e.g., "Jamshedpur.', reveals: 'industrial-region-means-a-single' },
                { text: 'industrial region', outcome: 'Not quite — Students often believe "industrial region" means a single city with factories (e.g., "Jamshedpur.', reveals: 'industrial-region-means-a-single' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_14_011', title: 'Industrial Pollution: Types (Air, Water, Soil, Noise) and Control',
          caseStudy: { intro: 'Start by asking students to observe a photograph of a industrial cluster (e.g., Dhanbad coal washeries or Ludhiana dyeing units) and list visible/audible signs.',
            decisions: [{ prompt: 'Name the four types of industrial pollution identified in the NCERT Class 12 Geography textbook and give one specific pollutant example for.', options: [
                { text: 'The four types are: (1) Air pollution', outcome: 'The four types are: (1) Air pollution — e.g., Suspended Particulate Matter (SPM) from cement.' },
                { text: 'plastic waste', outcome: 'Not quite — Students believe "pollution control" means installing an end-of-pipe device (ESP, ETP) and the.', reveals: 'pollution-control-means-installing-an' },
                { text: 'pollution control', outcome: 'Not quite — Students believe "pollution control" means installing an end-of-pipe device (ESP, ETP) and the.', reveals: 'pollution-control-means-installing-an' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A family friend is choosing where to put a scrap-based mini-steel plant. His instinct: \'Steel belongs near iron ore — that\'s where Jamshedpur is.\' Your city offers the scrap, the power, and the buyers, but no ore for hundreds of kilometres.',
            decisions: [{ prompt: 'Which locational logic actually fits his plant?', options: [
                { text: 'Locate near the market — an electric-arc mini-steel plant\'s \'raw material\' is urban scrap, not ore, so it minimises total cost beside the cities that generate scrap and buy the steel, like Mandi Gobindgarh; the Jamshedpur logic only binds ore-based integrated plants.', outcome: 'The chapter\'s rule is least total production-plus-distribution cost, not a fixed factor: once the feedstock changes from ore to scrap, the pull flips from the mineral belt to the urban market.' },
                { text: 'Follow him — proximity to raw material is the timeless top factor in industrial location.', outcome: 'That\'s the misconception the chapter targets: it holds for weight-losing ore-based steel on the Chota Nagpur coalfield, but scrap furnaces ship a lighter input and a heavier demand, so \'near raw material\' relocates to \'near scrap\' — the city.', reveals: 'raw-material-always-first' },
                { text: 'Tell him post-1991 policy doesn\'t matter, so he should ignore incentives and just chase the cheapest land.', outcome: 'Liberalisation didn\'t retire policy — SEZs and industrial corridors still steer location with tax breaks and trunk infrastructure, so skipping the incentive map is leaving money and logistics advantage on the table.', reveals: 'policy-stopped-mattering-1991' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_14_011', title: 'You made it',
          caseStudy: { intro: 'You can now sort any industry on four axes and predict its geography — the skill behind every industrial-location question.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_14_007', difficulty: 'standard',
          question: 'The chemical and fertiliser industry in India comprises the production.',
          hint: 'If stuck, revisit c10_geo_cbse_06_007 (Industrial Location Factors) and.',
          misconception: 'Students often think **all fertiliser plants are located near the raw material source** (like iron and steel).',
          parts: [
                { id: 'a', prompt: 'Name the primary feedstock used in modern gas-based urea manufacturing plants in India and state one major gas pipeline that supplies them.', answer: 'Correct answer: Natural gas (mainly methane) is the primary feedstock',
                  options: ['Correct answer: Natural gas (mainly methane) is the primary feedstock', 'naphtha', 'urea is still produced from naphtha at coastal refineries'],
                  hint: 'If stuck, revisit c10_geo_cbse_06_007 (Industrial Location Factors) and c11_geo_cbse_19_006.',
                  misconception: 'Students often think **all fertiliser plants are located near the raw material source** (like iron and steel).' },
                { id: 'b', prompt: 'A new urea plant is proposed at a site with: (a) access to a gas pipeline spur, (b) 50 km from a major consumption centre, (c) adequate water from a perennial.', answer: 'Rank: 1',
                  options: ['Rank: 1', 'urea is still produced from naphtha at coastal refineries'],
                  hint: 'If stuck, revisit c10_geo_cbse_06_007 (Industrial Location Factors) and c11_geo_cbse_19_006.',
                  misconception: 'Students often think **all fertiliser plants are located near the raw material source** (like iron and steel).' }
          ],
            remediations: { 'all-fertiliser-plants-are-located': { steps: ['Revisit c10_geo_cbse_06_007 (Industrial Location Factors) to refresh Weber’s weight-loss principle.', 'On an outline map of India, plot the HVJ pipeline, Dahej-Hazira terminals, Jhamarkotra rock phosphate, and major urea.', 'Draw arrows showing feedstock flow (gas → pipeline → plant) vs rock phosphate flow (mine → rail → plant).', 'Re-attempt Diagnostic Question 2 and 3. If still stuck, review c11_geo_cbse_19_006 (Petroleum and Natural Gas Reserves).'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_14_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **all fertiliser plants are located near the raw material source** (like iron and steel).',
          parts: [
                { id: 'a', prompt: 'Design a locational decision matrix for a proposed complex fertiliser plant (producing NPK grades) that integrates raw material sources (gas, rock phosphate.', answer: 'Criteria & weights: (1) Feedstock security (gas + ammonia) – 30%, (2) Rock',
                  options: ['Criteria & weights: (1) Feedstock security (gas + ammonia) – 30%, (2) Rock', 'urea is still produced from naphtha at coastal refineries'],
                  hint: 'If stuck, revisit c10_geo_cbse_06_007 (Industrial Location Factors) and c11_geo_cbse_19_006.',
                  misconception: 'Students often think **all fertiliser plants are located near the raw material source** (like iron and steel).' }
          ],
            remediations: { 'all-fertiliser-plants-are-located': { steps: ['Revisit c10_geo_cbse_06_007 (Industrial Location Factors) to refresh Weber’s weight-loss principle.', 'On an outline map of India, plot the HVJ pipeline, Dahej-Hazira terminals, Jhamarkotra rock phosphate, and major urea.', 'Draw arrows showing feedstock flow (gas → pipeline → plant) vs rock phosphate flow (mine → rail → plant).', 'Re-attempt Diagnostic Question 2 and 3. If still stuck, review c11_geo_cbse_19_006 (Petroleum and Natural Gas Reserves).'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_14_008', difficulty: 'standard',
          question: 'The automobile industry in India is a capital-intensive, assembly-based.',
          hint: 'If confused, revisit c12_geo_cbse_14_002 (location factors) and c11_geo_cbse_20_003.',
          misconception: 'Students believe "automobile factories locate near iron ore mines like steel plants" — they conflate raw-material.',
          parts: [
                { id: 'a', prompt: 'Name the three distinct policy phases that shaped the growth of India\'s automobile industry since Independence, and identify the landmark year that separates.', answer: 'Correct answer: Phase 1 (1947–1991)',
                  options: ['Correct answer: Phase 1 (1947–1991)', 'automobile factories locate near iron ore mines like steel plants'],
                  hint: 'If confused, revisit c12_geo_cbse_14_002 (location factors) and c11_geo_cbse_20_003 (iron-steel.',
                  misconception: 'Students believe "automobile factories locate near iron ore mines like steel plants" — they conflate raw-material orientation of basic.' },
                { id: 'b', prompt: 'A new EV battery plant is proposed near Sanand, Gujarat. Using the weighted locational factor method (Market=0.30, Raw Material=0.25, Port=0.20, Policy.', answer: 'Step 1: Multiply each rating by its weight: Market 8×0.30=2.40',
                  options: ['Step 1: Multiply each rating by its weight: Market 8×0.30=2.40', 'automobile factories locate near iron ore mines like steel plants', 'forgets to normalise weights (sum ≠ 1) or miscalculates 6×0'],
                  hint: 'If confused, revisit c12_geo_cbse_14_002 (location factors) and c11_geo_cbse_20_003 (iron-steel.',
                  misconception: 'Students believe "automobile factories locate near iron ore mines like steel plants" — they conflate raw-material orientation of basic.' }
          ],
            remediations: { 'automobile-factories-locate-near-iron': { steps: ['Revisit c12_geo_cbse_14_002 (Industrial Location Factors) — re-classify automobile as "market-oriented assembly" not.', 'On an outline map, plot Bhilai (steel), Jamshedpur (steel), Chennai (port), Gurugram (market), Pune (market+skills).', 'Re-do Diagnostic Q2 comparing Chennai vs Gurugram using the corrected logic.', 'Watch 10-min video "How Maruti chose Manesar" (SIAM case study) to internalise vendor-park logic.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_14_009', difficulty: 'standard',
          question: 'The Information Technology (IT) and Electronics industry is.',
          hint: 'If confused, re-read c12_geo_cbse_14_002\'s "Footloose Industries" subsection and the.',
          misconception: 'Students equate "IT industry" only with software services (coding, BPO) and ignore electronics hardware manufacturing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Information Technology (IT) and Electronics industry is a knowledge-intensive,',
                  options: ['The Information Technology (IT) and Electronics industry is a knowledge-intensive,', 'Manufacturing is the process of transforming raw materials into finished goods of higher', 'Industrial location factors are the geographical, economic, and political determinants', 'The cotton textile industry is an agro-based industry that processes raw cotton into'],
                  hint: 'If confused, re-read c12_geo_cbse_14_002\'s "Footloose Industries" subsection and the Class 11 node.',
                  misconception: 'Students equate "IT industry" only with software services (coding, BPO) and ignore electronics hardware manufacturing (mobile phones, PCBs.' }
          ],
            remediations: { 'students-equate-it-industry-only': { steps: ['Revisit c12_geo_cbse_14_002 (location factors) and classify IT under "footloose/high-tech" using the factor-weight.', 'On an outline map of India, plot the six hubs + one tier-2 aspirant; annotate each with the premier institute(s) and.', 'Read the 1997 STP scheme salient features (single-window, duty-free imports, tax holiday) from NCERT Class 12 Ch.14 box.', 'Re-attempt Diagnostic Q2 and Q4.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_14_010', difficulty: 'standard',
          question: 'Industrial regions are geographically concentrated areas where multiple.',
          hint: 'If unable to link regions to factors, return to node 14_002 and create a factor-industry.',
          misconception: 'Students often believe "industrial region" means a single city with factories (e.g., "Jamshedpur is an industrial.',
          parts: [
                { id: 'a', prompt: 'Explain why the Hugli industrial region developed along the Hugli river despite the region not having significant coal or iron ore deposits.', answer: 'The Hugli region developed due to: (1) historical port access at Kolkata for',
                  options: ['The Hugli region developed due to: (1) historical port access at Kolkata for', 'jute availability', 'industrial region', 'Jamshedpur is an industrial region'],
                  hint: 'If unable to link regions to factors, return to node 14_002 and create a factor-industry matching.',
                  misconception: 'Students often believe "industrial region" means a single city with factories (e.g., "Jamshedpur is an industrial region") rather than.' },
                { id: 'b', prompt: 'Using the concept of agglomeration economies, analyze why the Bangalore-Tamil Nadu region has become a hub for IT, electronics, and aerospace industries.', answer: 'Step 1: Identify absence of traditional factors',
                  options: ['Step 1: Identify absence of traditional factors', 'good climate', 'English-speaking population', 'industrial region'],
                  hint: 'If unable to link regions to factors, return to node 14_002 and create a factor-industry matching.',
                  misconception: 'Students often believe "industrial region" means a single city with factories (e.g., "Jamshedpur is an industrial region") rather than.' },
                { id: 'c', prompt: 'Compare the locational basis of the Gujarat industrial region with the Chotanagpur region.', answer: 'Similarities: (1) Both have strong transport connectivity',
                  options: ['Similarities: (1) Both have strong transport connectivity', 'both have minerals', 'both have ports', 'compare and contrast'],
                  hint: 'If unable to link regions to factors, return to node 14_002 and create a factor-industry matching.',
                  misconception: 'Students often believe "industrial region" means a single city with factories (e.g., "Jamshedpur is an industrial region") rather than.' }
          ],
            remediations: { 'industrial-region-means-a-single': { steps: ['Revisit node 14_002 (Factors Influencing Industrial Location) and create a 5-column table: Region | Raw Material |.', 'On an outline map, shade each region with a different color and draw arrows showing raw material flows (e.g., Bailadila.', 'Practice one board-style "compare two regions" question (e.g., 2022 Q: "Contrast the locational factors of Mumbai-Pune.', 'Re-attempt Diagnostic Questions 2 and 4. If errors persist, review Class 11 node c11_geo_cbse_20_005 for the.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_14_011', difficulty: 'standard',
          question: 'Industrial pollution refers to the contamination of the natural environment.',
          hint: 'If unable to link process to pollutant, revisit c12_geo_cbse_14_005 (Iron & Steel) and.',
          misconception: 'Students believe "pollution control" means installing an end-of-pipe device (ESP, ETP) and the problem is solved.',
          parts: [
                { id: 'a', prompt: 'Name the four types of industrial pollution identified in the NCERT Class 12 Geography textbook and give one specific pollutant example for each type from.', answer: 'The four types are: (1) Air pollution',
                  options: ['The four types are: (1) Air pollution', 'plastic waste', 'pollution control', 'plastic waste" as a type instead of a pollutant within soil/water'],
                  hint: 'If unable to link process to pollutant, revisit c12_geo_cbse_14_005 (Iron & Steel) and.',
                  misconception: 'Students believe "pollution control" means installing an end-of-pipe device (ESP, ETP) and the problem is solved.' },
                { id: 'b', prompt: 'A thermal power plant burns 10,000 tonnes of coal per day with 35% ash content. The electrostatic precipitator (ESP) efficiency is 99.5%.', answer: 'Step 1: Total ash produced = 10,000 t × 0.35 = 3,500 t/day',
                  options: ['Step 1: Total ash produced = 10,000 t × 0.35 = 3,500 t/day', 'efficiency', 'penetration', 'pollution control'],
                  hint: 'If unable to link process to pollutant, revisit c12_geo_cbse_14_005 (Iron & Steel) and.',
                  misconception: 'Students believe "pollution control" means installing an end-of-pipe device (ESP, ETP) and the problem is solved.' }
          ],
            remediations: { 'pollution-control-means-installing-an': { steps: ['If the student holds the end-of-pipe fixation: (1) Revisit Class 11 node c11_geo_cbse_20_006 (Industrial Pollution.', '(2) Watch a 10-min video of a functioning CETP (e.g., CETP Tiruppur) showing equalisation tank, primary clarifier.', '(3) Do a mini-case: compare stack monitoring data (PM, SO₂, NOx) for a power plant over 12 months — identify excursions.', '(4) Re-attempt Diagnostic Question 5 with focus on operational constraints.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
