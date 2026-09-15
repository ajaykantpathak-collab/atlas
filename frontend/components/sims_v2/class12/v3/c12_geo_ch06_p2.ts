import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch06_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch06_p2: SimDef = {
    id: 'v3_c12_geo_ch06_p2',
    title: 'Secondary Activities · Part 2/2',
    subtitle: 'A tailor stitching imported cloth isn\'t \'industry\' — here\'s why',
    classLevel: 12, subject: 'geography', topic: 'Secondary Activities · Part 2/2',
    chapters: ['c12_geo_ch06'],
    nodeIds: ['c12_geo_cbse_06_007', 'c12_geo_cbse_06_008', 'c12_geo_cbse_06_009', 'c12_geo_cbse_06_010', 'c12_geo_cbse_06_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Industrial geographer', intro: 'Everything in your classroom was once raw. The transformation that made it — that\'s the secondary sector\'s whole story.', goal: 'Define secondary activities through value addition and link industrial location to raw materials, power and markets.' },
    discovery: {
        question: 'Cotton grown, cotton woven, shirts sold, bales trucked — which of these four is the secondary activity?',
        options: ['The weaving — it transforms a raw material into a manufactured good; growing is primary, selling and trucking are tertiary', 'The growing — it comes first', 'The selling — it\'s the final stage', 'All four together'],
        answer: 'The weaving — it transforms a raw material into a manufactured good; growing is primary, selling and trucking are tertiary',
        hook: 'Secondary isn\'t just \'big factories with chimneys\' — pottery, handlooms and food processing count too. And the real definition is economic: value addition, where the output outvalues the inputs — crude oil\'s parts are worth far more apart than together.',
    },
    teaching: [
        { title: 'Factors Affecting Industrial Location: Market, Transport, Capital', text: 'Market, transport, and capital are three critical locational factors for secondary activities: **market** refers to the demand for finished goods and its purchasing power, influencing industries.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow a raw material\'s climb up the value ladder: turn sugarcane into sugar stage by stage, locate an aluminium smelter by its ore and power needs, and weigh manufacturing\'s jobs-versus-pollution ledger.',
        labels: ['Factors Affecting Industrial Location', 'Major Industrial Regions', 'Agro-Based Industries: Food Processing', 'Mineral-Based Industries: Iron', 'High-Tech Industries and Knowledge-Based'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_06_007', title: 'Factors Affecting Industrial Location: Market, Transport, Capital',
          caseStudy: { intro: 'Observe a familiar industrial cluster near your city — perhaps a food-processing unit on the highway or a textile mill near a railway station. Ask: why here?',
            decisions: [{ prompt: 'Name the three factors affecting industrial location covered in this node and give one one-sentence definition for each.', options: [
                { text: 'Correct answer: Market', outcome: 'Correct answer: Market — the demand for finished goods and purchasing power of consumers; Transport.' },
                { text: 'market', outcome: 'Not quite — Students often think "market" means only the local city population, ignoring **purchasing power**.', reveals: 'market-means-only-the-local' },
                { text: 'raw material or labour', outcome: 'Not quite — Students often think "market" means only the local city population, ignoring **purchasing power**.', reveals: 'market-means-only-the-local' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_06_008', title: 'Major Industrial Regions of the World',
          caseStudy: { intro: 'Look at the industrial landscape around Jamshedpur or Bhilai — you see steel plants, coal mines, railways, and worker townships all clustered together.',
            decisions: [{ prompt: 'Name any four major industrial regions of the world and the country each belongs to.', options: [
                { text: 'Correct answer: (1) Great Lakes Region', outcome: 'Correct answer: (1) Great Lakes Region — USA; (2) Ruhr Region — Germany; (3) Moscow-Tula Region.' },
                { text: 'Mumbai-Pune region', outcome: 'Not quite — Students memorise a static list of regions (e.g., "Ruhr = coal + iron") and assume these factors.', reveals: 'students-memorise-a-static-list' },
                { text: 'Silicon Valley — primary industrial region', outcome: 'Not quite — Students memorise a static list of regions (e.g., "Ruhr = coal + iron") and assume these factors.', reveals: 'students-memorise-a-static-list' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_06_009', title: 'Agro-Based Industries: Food Processing and Beverages',
          scaffold: { problem: 'A food processing entrepreneur plans to set up a 10 MT/day banana puree unit in Theni district, Tamil Nadu.',
            steps: [
            { text: 'Identify raw material weight per unit of product. 100 kg banana → 45 kg puree.' },
            { text: 'Compute Material Index = Raw material weight / Product weight = 2.22 / 1 = 2.22.' },
            { text: 'Interpret MI = 2.22 > 1 → strong raw material orientation. Transporting 2.22 kg of perishable banana (75% water) incurs.' },
            { text: 'Evaluate options. Farm gate minimises banana transport but lacks power, water, labour, effluent disposal.' },
            { text: 'Recommend Theni town as optimal — balances raw material proximity (within 15-20 km catchment) with industrial.', faded: true, blankAnswer: 'Material Index = 2.22. Optimal location: Theni town (15.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_06_010', title: 'Mineral-Based Industries: Iron and Steel, Petrochemicals',
          caseStudy: { intro: 'Observe a freight train loaded with iron ore from Odisha moving toward a steel plant in Chhattisgarh — this visible movement illustrates the core geographical.',
            decisions: [{ prompt: 'Name the three essential raw materials for a blast furnace in the iron and steel industry and state the typical weight ratio of iron ore.', options: [
                { text: 'The three essential raw materials are iron ore (haematite/magnetite), coking coal, and', outcome: 'The three essential raw materials are iron ore (haematite/magnetite), coking coal, and limestone.' },
                { text: '\'coal\' without specifying coking coal, or reversing the ratios', outcome: 'Not quite — Students often believe that the iron and steel industry locates solely at the iron ore source.', reveals: 'the-iron-and-steel-industry' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_06_011', title: 'High-Tech Industries and Knowledge-Based Economy',
          caseStudy: { intro: 'Observe a smartphone in your hand — its chip was designed in the USA, fabricated in Taiwan, assembled in China/India, and runs software coded in Bengaluru.',
            decisions: [{ prompt: 'Define "quaternary activities" and give two examples from the Indian context.', options: [
                { text: 'Quaternary activities are knowledge-oriented service sector activities involving the', outcome: 'Quaternary activities are knowledge-oriented service sector activities involving the collection.' },
                { text: 'call centres', outcome: 'Not quite — Students equate "high-tech industry" with "IT/software services only" and ignore.', reveals: 'students-equate-high-tech-industry' },
                { text: 'manufacturing', outcome: 'Not quite — Students equate "high-tech industry" with "IT/software services only" and ignore.', reveals: 'students-equate-high-tech-industry' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend\'s agri-startup is pitching two units to investors: a sugar mill and a beverage-bottling plant. To save on \'factory costs\', the deck puts both units side-by-side at a single industrial park near the city market.',
            decisions: [{ prompt: 'What does the geography of manufacturing say about that site plan?', options: [
                { text: 'Split them — the sugar mill belongs in the cane fields because cane loses sucrose within a day or two of cutting and sheds weight as it\'s crushed; the bottling plant belongs near the market because adding water makes the product heavier, so value-to-weight pulls it marketward.', outcome: 'Perishability and weight-loss push raw-material-oriented location; weight-gain pushes market-oriented location — the same industrial park can\'t be right for both ends of that logic.' },
                { text: 'Approve it — co-locating shares power and labour, and raw materials can always be trucked in.', outcome: 'Trucking cane loses sucrose to enzymatic inversion on the way — the value literally evaporates in transit; the chapter\'s 24–48 hour crushing window is why mills sit inside cane belts, not beside markets.', reveals: 'location-is-just-rent' },
                { text: 'Object that neither counts as real manufacturing anyway — both are just processing, not factory production.', outcome: 'That\'s the scale misconception: manufacturing is any transformation of raw material into a more valuable product — a village oil ghani and a pulping plant qualify; the objection discards the framework instead of using it.', reveals: 'manufacturing-needs-machines' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_06_011', title: 'You made it',
          caseStudy: { intro: 'You can now read any product as a value-adding chain — and predict where its factory will stand by asking what it needs most: ore, power, or buyers.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_06_007', difficulty: 'standard',
          question: 'Market, transport, and capital are three critical locational factors for.',
          hint: 'If stuck, review c12_geo_cbse_06_006 (raw material factor) and c11_geo_cbse_20_001.',
          misconception: 'Students often think "market" means only the local city population, ignoring **purchasing power** and **income levels**.',
          parts: [
                { id: 'a', prompt: 'Name the three factors affecting industrial location covered in this node and give one one-sentence definition for each.', answer: 'Correct answer: Market',
                  options: ['Correct answer: Market', 'market', 'raw material or labour'],
                  hint: 'If stuck, review c12_geo_cbse_06_006 (raw material factor) and c11_geo_cbse_20_001 (manufacturing.',
                  misconception: 'Students often think "market" means only the local city population, ignoring **purchasing power** and **income levels** — a factory making.' },
                { id: 'b', prompt: 'Compare the role of capital in the location of (a) a large integrated steel plant and (b) a small-scale readymade garment unit.', answer: 'a large integrated steel plant and (',
                  options: ['a large integrated steel plant and (', 'market'],
                  hint: 'If stuck, review c12_geo_cbse_06_006 (raw material factor) and c11_geo_cbse_20_001 (manufacturing.',
                  misconception: 'Students often think "market" means only the local city population, ignoring **purchasing power** and **income levels** — a factory making.' }
          ],
            remediations: { 'market-means-only-the-local': { steps: ['Revisit c12_geo_cbse_06_006 (raw material factor) to recall the Weberian least-cost framework.', 'Draw a simple diagram: factory at centre, arrows for raw material inbound, finished goods outbound — label transport.', 'Use a real example: compare Maruti Suzuki (Gurugram/Manesar) vs.', 'Tata Motors (Pune/Sanand) — list market, transport, capital factors for each.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "market" means only the local city population, ignoring **purchasing power** and **income levels**.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "With modern containerized shipping and air freight, transport is no longer a significant factor in industrial location; markets are.', answer: 'The statement is partially true for high-value, low-weight goods (electronics,',
                  options: ['The statement is partially true for high-value, low-weight goods (electronics,', 'market'],
                  hint: 'If stuck, review c12_geo_cbse_06_006 (raw material factor) and c11_geo_cbse_20_001 (manufacturing.',
                  misconception: 'Students often think "market" means only the local city population, ignoring **purchasing power** and **income levels** — a factory making.' }
          ],
            remediations: { 'market-means-only-the-local': { steps: ['Revisit c12_geo_cbse_06_006 (raw material factor) to recall the Weberian least-cost framework.', 'Draw a simple diagram: factory at centre, arrows for raw material inbound, finished goods outbound — label transport.', 'Use a real example: compare Maruti Suzuki (Gurugram/Manesar) vs.', 'Tata Motors (Pune/Sanand) — list market, transport, capital factors for each.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_06_008', difficulty: 'standard',
          question: 'Major Industrial Regions of the World are geographically concentrated zones.',
          hint: 'If stuck, re-read NCERT Class 12 Chapter 6 sections "Factors Affecting Industrial.',
          misconception: 'Students memorise a static list of regions (e.g., "Ruhr = coal + iron") and assume these factors remain unchanged.',
          parts: [
                { id: 'a', prompt: 'Name any four major industrial regions of the world and the country each belongs to.', answer: 'Correct answer: (1) Great Lakes Region',
                  options: ['Correct answer: (1) Great Lakes Region', 'Mumbai-Pune region', 'Silicon Valley — primary industrial region', 'changing industrial landscape'],
                  hint: 'If stuck, re-read NCERT Class 12 Chapter 6 sections "Factors Affecting Industrial Location" (raw.',
                  misconception: 'Students memorise a static list of regions (e.g., "Ruhr = coal + iron") and assume these factors remain unchanged.' },
                { id: 'b', prompt: 'On a blank world map, locate and label the following: (a) Great Lakes Industrial Region, (b) Ruhr Industrial Region, (c) Tokyo-Yokohama Industrial Region, (d).', answer: 'Correct mapping and factors: (a) Great Lakes',
                  options: ['Correct mapping and factors: (a) Great Lakes', 'changing industrial landscape'],
                  hint: 'If stuck, re-read NCERT Class 12 Chapter 6 sections "Factors Affecting Industrial Location" (raw.',
                  misconception: 'Students memorise a static list of regions (e.g., "Ruhr = coal + iron") and assume these factors remain unchanged.' }
          ],
            remediations: { 'students-memorise-a-static-list': { steps: ['Revisit c12_geo_cbse_06_006 (raw material, power, labour factors) and c12_geo_cbse_06_007 (market, transport, policy.', 'Watch a 10-min video on Ruhr\'s structural transformation (search "Ruhr structural change renewable energy").', 'On a blank map, draw arrows showing import/export flows for Ruhr (iron ore in via Rotterdam-Rhine, steel out to EU) and.', 'Re-attempt Diagnostic Q2 and Q4. If still stuck, schedule a 15-min doubt session with teacher focusing on "dynamic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_06_009', difficulty: 'standard',
          question: 'Agro-based industries are manufacturing industries that use agricultural.',
          hint: 'If unable to compute or interpret material index, revisit c12_geo_cbse_06_006 (Weber\'s.',
          misconception: 'Students treat all agro-based industries as uniformly "raw-material oriented" because textbooks list them together.',
          parts: [
                { id: 'a', prompt: 'Name two agricultural raw materials that are highly perishable and two that are non-perishable, and state why perishability matters for industrial location.', answer: 'Perishable: tomato, milk, fish, mango',
                  options: ['Perishable: tomato, milk, fish, mango', 'wheat as perishable'],
                  hint: 'If unable to compute or interpret material index, revisit c12_geo_cbse_06_006 (Weber\'s location.',
                  misconception: 'Students treat all agro-based industries as uniformly "raw-material oriented" because textbooks list them together.' }
          ],
            remediations: { 'students-treat-all-agro-based': { steps: ['Revisit c10_geo_cbse_06_002 (sugar industry location) and c11_geo_cbse_20_002 (cotton textile location) — create.', 'On an outline map of India, plot three food processing clusters (Krishnagiri tomato, Anand dairy, Ratnagiri mango) and.', 'Re-attempt Diagnostic Question 2 and 4; if still incorrect, watch the 12-minute NPTEL lecture "Location of Agro-Based.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_06_010', difficulty: 'standard',
          question: 'Mineral-based industries are manufacturing sectors that use mineral ores and.',
          hint: 'If stuck, review the \'Factors Affecting Industrial Location\' nodes (c12_geo_cbse_06_006.',
          misconception: 'Students often believe that the iron and steel industry locates solely at the iron ore source because \'iron ore is the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Mineral-based industries are manufacturing sectors that use mineral ores and fossil fuels',
                  options: ['Mineral-based industries are manufacturing sectors that use mineral ores and fossil fuels', 'Secondary activities involve the processing of raw materials obtained from the primary', 'Manufacturing is the process of transforming raw materials extracted from the primary', 'Household industries (cottage industries) are the smallest manufacturing units where'],
                  hint: 'If stuck, review the \'Factors Affecting Industrial Location\' nodes (c12_geo_cbse_06_006.',
                  misconception: 'Students often believe that the iron and steel industry locates solely at the iron ore source because \'iron ore is the main raw material\'.' }
          ],
            remediations: { 'the-iron-and-steel-industry': { steps: ['Revisit c10_geo_cbse_06_003 (Iron and Steel Industry in India) and c11_geo_cbse_20_003 (Mineral-Based Industries).', 'On an outline map of India, mark the major coking coalfields (Jharia, Raniganj, Bokaro, Korba, Talcher) and iron ore.', 'Calculate the \'tonne-km\' for ore and coal for Bhilai, Rourkela, and Jamshedpur using distances from your map.', 'Re-attempt Diagnostic Question 2 and 3; if still incorrect, review the freight equalization policy (1970s-1990s).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_06_011', difficulty: 'standard',
          question: 'High-tech industries are knowledge-intensive manufacturing and service sectors.',
          hint: 'If stuck on "why Bengaluru not Bhilai for IT?", revisit c12_geo_cbse_06_006 (location.',
          misconception: 'Students equate "high-tech industry" with "IT/software services only" and ignore hardware/manufacturing segments.',
          parts: [
                { id: 'a', prompt: 'Why do high-tech industries cluster near major universities (e.g., Stanford-Silicon Valley, IISc-Bengaluru) rather than near raw material sources or large.', answer: 'High-tech industries depend on *tacit knowledge*',
                  options: ['High-tech industries depend on *tacit knowledge*', 'cheap land', 'transport cost minimisation'],
                  hint: 'If stuck on "why Bengaluru not Bhilai for IT?", revisit c12_geo_cbse_06_006 (location factors) and.',
                  misconception: 'Students equate "high-tech industry" with "IT/software services only" and ignore hardware/manufacturing segments (semiconductor fabs.' }
          ],
            remediations: { 'students-equate-high-tech-industry': { steps: ['Revisit c12_geo_cbse_06_001 (secondary vs tertiary distinction) and c12_geo_cbse_06_002 (manufacturing definition).', 'Use the "collar colour" table from NCERT (p.52) — map Red=primary, Blue=secondary, White=tertiary, Gold=quinary.', 'Re-do Diagnostic Q2 and Q3 focusing on the *skill/knowledge intensity* criterion.', 'Watch 10-min video "How a semiconductor fab works" to see high-tech *manufacturing* in action.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
