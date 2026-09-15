import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch14_p1: SimDef = {
    id: 'v3_c12_geo_ch14_p1',
    title: 'Manufacturing Industries · Part 1/2',
    subtitle: '80% of the output, 20% of the jobs — manufacturing\'s split personality',
    classLevel: 12, subject: 'geography', topic: 'Manufacturing Industries · Part 1/2',
    chapters: ['c12_geo_ch14'],
    nodeIds: ['c12_geo_cbse_14_001', 'c12_geo_cbse_14_002', 'c12_geo_cbse_14_003', 'c12_geo_cbse_14_004', 'c12_geo_cbse_14_005', 'c12_geo_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Industrial classifier', intro: 'From a village potter\'s wheel to Bhilai\'s blast furnaces — one word, \'manufacturing\', holds them all. Learn its four ways of sorting.', goal: 'Classify manufacturing by raw material, scale, ownership and product, and weigh large- versus small-scale contributions.' },
    discovery: {
        question: 'Large factories produce ~80% of manufacturing GDP — yet small and cottage units employ ~80% of industrial workers. Who wins India\'s real battle?',
        options: ['Depends what\'s measured — capital-intensive giants win output; labour-intensive small units win jobs, generating 5-10x more employment per rupee of capital', 'Large scale wins both', 'Small scale wins both', 'Neither — they\'re equal'],
        answer: 'Depends what\'s measured — capital-intensive giants win output; labour-intensive small units win jobs, generating 5-10x more employment per rupee of capital',
        hook: 'Every industry wears four labels at once — raw material, scale, ownership, product type — and the map explains itself: agro-industries scatter to chase perishable crops while mineral industries cluster on the ore. A ₹50-lakh women\'s SHG bamboo unit and Bhilai Steel are both \'manufacturing\' — sorted differently on all four axes.',
    },
    teaching: [
        { title: 'Manufacturing Industries: Importance and Classification', text: 'Manufacturing is the process of transforming raw materials into finished goods of higher value through mechanical, chemical, or manual operations, using machinery, labour, and energy; it forms the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_14_001', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Classify India\'s industrial zoo: tag Bhilai, Khadi, Maruti and Amul on all four bases, then explain why sugar mills hug cane fields while software doesn\'t need to.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_14_001', title: 'Manufacturing Industries: Importance and Classification',
          caseStudy: { intro: 'Look at your smartphone — its components come from mineral-based industries (metals), chemical-based industries (plastics, battery), and electronics assembly.',
            decisions: [{ prompt: 'Define manufacturing as per NCERT Class 12 Geography and state its sectoral classification in the three-sector economic model.', options: [
                { text: 'Manufacturing is the transformation of raw materials into finished goods of higher value', outcome: 'Manufacturing is the transformation of raw materials into finished goods of higher value using.' },
                { text: 'primary sector', outcome: 'Not quite — Students confuse "agro-based" with "agriculture" — they classify sugar industry as "primary".', reveals: 'students-confuse-agro-based-with' },
                { text: 'only making things by hand', outcome: 'Not quite — Students confuse "agro-based" with "agriculture" — they classify sugar industry as "primary".', reveals: 'students-confuse-agro-based-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_14_002', title: 'Factors Influencing Industrial Location in India',
          caseStudy: { intro: 'Observe a map of India’s major industrial clusters — notice how the iron & steel plants hug the Chota Nagpur Plateau while cotton textiles cluster around.',
            decisions: [{ prompt: 'Name the seven classical factors influencing industrial location and give one Indian example where each factor played a decisive role.', options: [
                { text: 'The seven factors are: (1) Raw material – iron & steel at Jamshedpur (iron ore + coal)', outcome: 'The seven factors are: (1) Raw material – iron & steel at Jamshedpur (iron ore + coal); (2) Power.' },
                { text: 'climate', outcome: 'Not quite — Students believe “nearness to raw material” is *always* the top factor.', reveals: 'nearness-to-raw-material-is' },
                { text: 'nearness to raw material', outcome: 'Not quite — Students believe “nearness to raw material” is *always* the top factor.', reveals: 'nearness-to-raw-material-is' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_14_003', title: 'Agro-Based Industries: Cotton Textile Industry (Distribution and Problems)',
          scaffold: { problem: 'A new cotton mill is proposed in Adilabad (Telangana), a cotton-growing district.',
            steps: [
            { text: 'Identify raw-material advantage — Adilabad produces 4.5 lakh bales/year; ginning mills exist locally; cotton transport.' },
            { text: 'Assess market access — nearest port (Krishnapatnam) 450 km by road; no direct rail to major consumption centres (Delhi.' },
            { text: 'Check power situation — Telangana industrial tariff ₹7.20/kWh with 4–6 hours daily unscheduled cuts; no gas pipeline.' },
            { text: 'Labour and humidity — semi-arid climate (RH 40–50%) increases yarn breakage on high-speed looms; skilled textile labour.' },
            { text: 'Synthesize — raw-material saving ≈ ₹2/kg cotton, but market-access penalty + power downtime + humidification cost.', faded: true, blankAnswer: 'The claim is incomplete; Adilabad suits ginning/pressing.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_14_004', title: 'Agro-Based Industries: Jute and Sugar Industry',
          caseStudy: { intro: 'Imagine you are travelling by train from Howrah to Varanasi: just after leaving Howrah, you see clusters of jute mills along the Hugli river; hundreds.',
            decisions: [{ prompt: 'Name the three states that account for over 80% of India\'s jute production and the primary river basin where jute mills are concentrated.', options: [
                { text: 'Correct answer: West Bengal, Bihar, and Assam produce over 80% of jute', outcome: 'Correct answer: West Bengal, Bihar, and Assam produce over 80% of jute; mills are concentrated.' },
                { text: 'Punjab or the Ganga main stem', outcome: 'Not quite — Students believe the sugar industry is located in Uttar Pradesh solely because it is the largest.', reveals: 'the-sugar-industry-is-located' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_14_005', title: 'Mineral-Based Industries: Iron and Steel Industry in India',
          caseStudy: { intro: 'Start with a real-world observation: "Look at the rail tracks, bridges, and construction sites around you — every kilogram of that steel began as red-brown.',
            decisions: [{ prompt: 'Name the two main types of iron ore found in India and state which one has higher iron content.', options: [
                { text: 'The two main types are haematite (Fe₂O₃, 60–70% Fe) and magnetite (Fe₃O₄, >70% Fe)', outcome: 'The two main types are haematite (Fe₂O₃, 60–70% Fe) and magnetite (Fe₃O₄, >70% Fe).' },
                { text: 'haematite has higher Fe', outcome: 'Not quite — Students believe "all Indian steel plants use domestic coking coal." In reality, India has.', reveals: 'all-indian-steel-plants-use' },
                { text: 'all Indian steel plants use domestic coking coal', outcome: 'Not quite — Students believe "all Indian steel plants use domestic coking coal." In reality, India has.', reveals: 'all-indian-steel-plants-use' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_14_006', title: 'Mineral-Based Industries: Aluminium Smelting and Cement Industry',
          caseStudy: { intro: 'Begin by showing a picture of a bauxite mine in Odisha and an aluminium smelter in Koraput — ask why they are not at the same site.',
            decisions: [{ prompt: 'Name the two most important locational factors for aluminium smelting in India and state which one is decisive.', options: [
                { text: 'Correct answer: Bauxite availability and cheap electricity; cheap electricity is decisive', outcome: 'Correct answer: Bauxite availability and cheap electricity; cheap electricity is decisive because.' },
                { text: 'raw material orientation', outcome: 'Not quite — Students think aluminium smelters are located near bauxite mines because "raw material orientation".', reveals: 'aluminium-smelters-are-located-near' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A family friend is choosing where to put a scrap-based mini-steel plant. His instinct: \'Steel belongs near iron ore — that\'s where Jamshedpur is.\' Your city offers the scrap, the power, and the buyers, but no ore for hundreds of kilometres.',
            decisions: [{ prompt: 'Which locational logic actually fits his plant?', options: [
                { text: 'Locate near the market — an electric-arc mini-steel plant\'s \'raw material\' is urban scrap, not ore, so it minimises total cost beside the cities that generate scrap and buy the steel, like Mandi Gobindgarh; the Jamshedpur logic only binds ore-based integrated plants.', outcome: 'The chapter\'s rule is least total production-plus-distribution cost, not a fixed factor: once the feedstock changes from ore to scrap, the pull flips from the mineral belt to the urban market.' },
                { text: 'Follow him — proximity to raw material is the timeless top factor in industrial location.', outcome: 'That\'s the misconception the chapter targets: it holds for weight-losing ore-based steel on the Chota Nagpur coalfield, but scrap furnaces ship a lighter input and a heavier demand, so \'near raw material\' relocates to \'near scrap\' — the city.', reveals: 'raw-material-always-first' },
                { text: 'Tell him post-1991 policy doesn\'t matter, so he should ignore incentives and just chase the cheapest land.', outcome: 'Liberalisation didn\'t retire policy — SEZs and industrial corridors still steer location with tax breaks and trunk infrastructure, so skipping the incentive map is leaving money and logistics advantage on the table.', reveals: 'policy-stopped-mattering-1991' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now sort any industry on four axes and predict its geography — the skill behind every industrial-location question.',
            decisions: [{ prompt: 'What comes next? Manufacturing Industries · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Manufacturing Industries · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_14_001', difficulty: 'standard',
          question: 'Manufacturing is the process of transforming raw materials into finished goods.',
          hint: 'If stuck, review c11_geo_cbse_20_001 "Manufacturing: Importance and Factors Influencing.',
          misconception: 'Students confuse "agro-based" with "agriculture" — they classify sugar industry as "primary" because it uses sugarcane.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Manufacturing is the process of transforming raw materials into finished goods of higher',
                  options: ['Manufacturing is the process of transforming raw materials into finished goods of higher', 'Industrial location factors are the geographical, economic, and political determinants', 'The cotton textile industry is an agro-based industry that processes raw cotton into', 'Agro-based industries like jute and sugar use agricultural raw materials that are'],
                  hint: 'If stuck, review c11_geo_cbse_20_001 "Manufacturing: Importance and Factors Influencing Industrial.',
                  misconception: 'Students confuse "agro-based" with "agriculture" — they classify sugar industry as "primary" because it uses sugarcane, not recognizing.' }
          ],
            remediations: { 'students-confuse-agro-based-with': { steps: ['Revisit c10_geo_cbse_06_001 (manufacturing definition) and c11_geo_cbse_20_001 (classification bases).', 'Make a 4-column table with the four classification bases as headers; fill in 10 industries from your district using.', 'For each industry, justify the classification in one sentence citing the specific criterion (e.g., "₹12 Cr investment →.', 'Re-attempt Diagnostic Question 3 with three new local industries.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_14_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse "agro-based" with "agriculture" — they classify sugar industry as "primary" because it uses sugarcane.',
          parts: [
                { id: 'a', prompt: 'Design a classification flowchart for a new industry: "Bamboo furniture manufacturing unit in Tripura with ₹50 lakh investment, owned by a women\'s self-help.', answer: 'Flowchart decisions: 1',
                  options: ['Flowchart decisions: 1', 'agro-based', 'agriculture', 'primary'],
                  hint: 'If stuck, review c11_geo_cbse_20_001 "Manufacturing: Importance and Factors Influencing Industrial.',
                  misconception: 'Students confuse "agro-based" with "agriculture" — they classify sugar industry as "primary" because it uses sugarcane, not recognizing.' }
          ],
            remediations: { 'students-confuse-agro-based-with': { steps: ['Revisit c10_geo_cbse_06_001 (manufacturing definition) and c11_geo_cbse_20_001 (classification bases).', 'Make a 4-column table with the four classification bases as headers; fill in 10 industries from your district using.', 'For each industry, justify the classification in one sentence citing the specific criterion (e.g., "₹12 Cr investment →.', 'Re-attempt Diagnostic Question 3 with three new local industries.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_14_002', difficulty: 'standard',
          question: 'Industrial location factors are the geographical, economic, and political.',
          hint: 'If stuck, review c10_geo_cbse_06_007 (Industrial Location Factors) and practice plotting.',
          misconception: 'Students believe “nearness to raw material” is *always* the top factor.',
          parts: [
                { id: 'a', prompt: 'Using the concept of “weight-losing” vs “weight-gaining” industries, classify the following and state the implied locational pull: (i) Sugar milling, (ii).', answer: '(i) Sugar – weight-losing (sugarcane loses sucrose rapidly)',
                  options: ['(i) Sugar – weight-losing (sugarcane loses sucrose rapidly)', 'nearness to raw material', 'labour-intensive', 'low-wage'],
                  hint: 'If stuck, review c10_geo_cbse_06_007 (Industrial Location Factors) and practice plotting.',
                  misconception: 'Students believe “nearness to raw material” is *always* the top factor.' },
                { id: 'b', prompt: 'Compare the locational advantages of the Mumbai-Pune industrial belt and the Chota Nagpur Plateau.', answer: 'Common: (1) Transport – both have dense rail/road/port connectivity',
                  options: ['Common: (1) Transport – both have dense rail/road/port connectivity', 'nearness to raw material', 'labour-intensive', 'low-wage'],
                  hint: 'If stuck, review c10_geo_cbse_06_007 (Industrial Location Factors) and practice plotting.',
                  misconception: 'Students believe “nearness to raw material” is *always* the top factor.' }
          ],
            remediations: { 'nearness-to-raw-material-is': { steps: ['Revisit c10_geo_cbse_06_007 (Industrial Location Factors) and c11_geo_cbse_20_001 (Manufacturing Importance & Factors).', 'On an outline map of India, plot: coal fields, iron ore belts, cotton zones, major ports, million-plus cities.', 'Overlay actual industrial clusters (from node 14_010) and write one-sentence justification for each cluster using the.', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_14_003', difficulty: 'standard',
          question: 'The cotton textile industry is an agro-based industry that processes raw cotton.',
          hint: 'If the material index logic feels shaky, re-work c10_geo_cbse_06_007 Example 2 (iron.',
          misconception: 'Students believe "cotton textile mills are located only where cotton grows" and therefore place all mills on a map.',
          parts: [
                { id: 'a', prompt: 'Name the four major cotton textile industrial clusters in India and give one representative centre for each.', answer: 'Correct answer: (1) Western Cluster – Mumbai/Ahmedabad, (2) Southern Cluster –',
                  options: ['Correct answer: (1) Western Cluster – Mumbai/Ahmedabad, (2) Southern Cluster –', 'Punjab', 'Haryana', 'cotton textile mills are located only where cotton grows'],
                  hint: 'If the material index logic feels shaky, re-work c10_geo_cbse_06_007 Example 2 (iron vs textile.',
                  misconception: 'Students believe "cotton textile mills are located only where cotton grows" and therefore place all mills on a map in Maharashtra/Gujarat.' },
                { id: 'b', prompt: 'A mill in Coimbatore (Tamil Nadu) uses 60% locally grown cotton and 40% imported long-staple cotton.', answer: 'Step 1: Weighted cost = (0.60 × 55) + (0.40 × 120) = 33 + 48 = ₹81/kg',
                  options: ['Step 1: Weighted cost = (0.60 × 55) + (0.40 × 120) = 33 + 48 = ₹81/kg', 'imported cotton is better', 'cotton textile mills are located only where cotton grows'],
                  hint: 'If the material index logic feels shaky, re-work c10_geo_cbse_06_007 Example 2 (iron vs textile.',
                  misconception: 'Students believe "cotton textile mills are located only where cotton grows" and therefore place all mills on a map in Maharashtra/Gujarat.' }
          ],
            remediations: { 'cotton-textile-mills-are-located': { steps: ['Revisit c11_geo_cbse_18_006 (cotton crop distribution) and mark cotton-growing districts on a blank map.', 'Overlay actual mill locations from c12_geo_cbse_14_003 textbook map — observe mismatches (Coimbatore, Kolkata).', 'For each mismatch, write one locational pull factor (port, humidity, hydro-power, market).', 'Re-attempt Diagnostic Question 4. If still stuck, review Weber\'s material index in c10_geo_cbse_06_007.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_14_004', difficulty: 'standard',
          question: 'Agro-based industries like jute and sugar use agricultural raw materials that.',
          hint: 'If stuck, re-read the "Factors Influencing Industrial Location" section in NCERT Class 12.',
          misconception: 'Students believe the sugar industry is located in Uttar Pradesh solely because it is the largest sugarcane producer.',
          parts: [
                { id: 'a', prompt: 'Name the three states that account for over 80% of India\'s jute production and the primary river basin where jute mills are concentrated.', answer: 'Correct answer: West Bengal, Bihar, and Assam produce over 80% of jute',
                  options: ['Correct answer: West Bengal, Bihar, and Assam produce over 80% of jute', 'Punjab or the Ganga main stem'],
                  hint: 'If stuck, re-read the "Factors Influencing Industrial Location" section in NCERT Class 12 Chapter.',
                  misconception: 'Students believe the sugar industry is located in Uttar Pradesh solely because it is the largest sugarcane producer, ignoring that.' }
          ],
            remediations: { 'the-sugar-industry-is-located': { steps: ['Revisit c12_geo_cbse_14_002 (Factors Influencing Industrial Location) and list the five factors; identify which factor.', 'On an outline map, mark the Hugli industrial belt and the two sugar belts; write one locational factor next to each.', 'Re-do Diagnostic Question 4 as a table on paper, then check against the answer key.', 'If confusion remains, watch a 10-minute video on "jute retting process" to visualise why stagnant water.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_14_005', difficulty: 'standard',
          question: 'The Iron and Steel Industry is a mineral-based, heavy manufacturing sector that.',
          hint: 'If stuck, revise c10_geo_cbse_05_002 (iron ore belts) and c10_geo_cbse_05_005 (coal.',
          misconception: 'Students believe "all Indian steel plants use domestic coking coal." In reality, India has negligible coking coal.',
          parts: [
                { id: 'a', prompt: 'On an outline map of India, mark and label: (a) the oldest private-sector integrated steel plant, (b) a coastal plant that imports coking coal, (c) a plant.', answer: 'the oldest private-sector integrated steel plant, (',
                  options: ['the oldest private-sector integrated steel plant, (', 'all Indian steel plants use domestic coking coal', 'why coastal plants are competitive', 'impact of global coking coal price spikes on Indian steel margins'],
                  hint: 'If stuck, revise c10_geo_cbse_05_002 (iron ore belts) and c10_geo_cbse_05_005 (coal types) — draw.',
                  misconception: 'Students believe "all Indian steel plants use domestic coking coal." In reality, India has negligible coking coal reserves (only 34.' }
          ],
            remediations: { 'all-indian-steel-plants-use': { steps: ['Revisit c10_geo_cbse_05_002 (iron ore types/distribution) and c10_geo_cbse_05_005 (coal types) — make a two-column.', 'On a map, mark Jharia, Raniganj, Korba, Talcher — label each "coking" or "non-coking."', 'For each major steel plant, write its coal source (domestic washed / imported).', 'Re-attempt Diagnostic Q2 and Q3. If still stuck, watch the 10-min NPTEL lecture "Indian Steel Industry: Raw Material.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_14_006', difficulty: 'standard',
          question: 'Aluminium smelting is the electrolytic extraction of aluminium from alumina.',
          hint: 'If stuck, review the "Locational Factors" section in c12_geo_cbse_14_002 and the mineral.',
          misconception: 'Students think aluminium smelters are located near bauxite mines because "raw material orientation" is the universal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Aluminium smelting is the electrolytic extraction of aluminium from alumina (derived from',
                  options: ['Aluminium smelting is the electrolytic extraction of aluminium from alumina (derived from', 'Manufacturing is the process of transforming raw materials into finished goods of higher', 'Industrial location factors are the geographical, economic, and political determinants', 'The cotton textile industry is an agro-based industry that processes raw cotton into'],
                  hint: 'If stuck, review the "Locational Factors" section in c12_geo_cbse_14_002 and the mineral.',
                  misconception: 'Students think aluminium smelters are located near bauxite mines because "raw material orientation" is the universal rule for weight-losing.' }
          ],
            remediations: { 'aluminium-smelters-are-located-near': { steps: ['Revisit c10_geo_cbse_06_003 (Iron & Steel location factors) to contrast raw-material vs energy orientation.', 'Watch a 5-min video of Hall-Héroult process to visualise electricity intensity.', 'On a blank map, plot all bauxite mines and all aluminium smelters; draw arrows from mines to smelters and note power.', 'Re-attempt Diagnostic Question 1 and 3.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
