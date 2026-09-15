import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch20_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch20_p2: SimDef = {
    id: 'v3_c11_geo_ch20_p2',
    title: 'Manufacturing Industries · Part 2/2',
    subtitle: 'Work out why some industries chase ore, some chase power, and some chase nothing but a market.',
    classLevel: 11, subject: 'geography', topic: 'Manufacturing Industries · Part 2/2',
    chapters: ['c11_geo_ch20'],
    nodeIds: ['c11_geo_cbse_20_007', 'c11_geo_cbse_20_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an industrial geographer placing a factory on the map', intro: 'A T-shirt\'s cotton was ginned in Vidarbha, woven in Bhiwandi, stitched in Tiruppur — each stage obeyed a different pull.', goal: 'Apply locational factors — weight-loss, power, market, policy — to Indian industries.' },
    discovery: {
        question: 'An aluminium smelter needs 15,000 kWh per tonne. Bauxite sits in Odisha, cheap hydro power in Himachal — where does the smelter go?',
        options: ['Near the power — smelting loses no weight but devours electricity, while the alumina refinery belongs near the bauxite', 'Near the bauxite — factories always sit by raw material', 'At the port — exports decide location', 'Midway — to split transport costs evenly'],
        answer: 'Near the power — smelting loses no weight but devours electricity, while the alumina refinery belongs near the bauxite',
        hook: '\'Industries sit near raw materials\' only holds for weight-losing inputs — ginning hugs the cotton belt, but spinning and smelting follow power and markets.',
    },
    teaching: [
        { title: 'Small Scale and Cottage Industries: Role in Economy', text: 'Small scale and cottage industries are manufacturing units characterized by low capital investment (up to ₹50 crore for plant and machinery), labor-intensive production using local raw materials and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_20_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run material-index logic on aluminium\'s two stages, then test whether policy alone can plant a factory — Nano\'s Sanand versus POSCO\'s stalled Odisha dream.',
        labels: ['Small Scale and Cottage', 'Industrial Policy and Liberalisation'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_20_007', title: 'Small Scale and Cottage Industries: Role in Economy',
          scaffold: { problem: 'Analyze why the Tirupur (Tamil Nadu) knitwear cluster, employing 600,000 workers in 10,000+ small units, exports ₹30,000 crore annually.',
            steps: [
            { text: 'Identify the cluster characteristics — homogeneous product (cotton knitwear), geographic concentration (15 km radius).' },
            { text: 'Apply agglomeration economy concepts — external economies of scale: labor market pooling (specialized skills available.' },
            { text: 'Analyze the value chain — Tirupur units are export-oriented, integrated with global buyers (H&M, C&A) through merchant.' },
            { text: 'Calculate collective scale — 10,000 units × 50 workers = 500,000 direct jobs; cluster turnover = sum of micro-turnovers.' },
            { text: 'Interpret policy role — NIFT-Tea campus provides design/tech support; CETP (Common Effluent Treatment Plant) funded.', faded: true, blankAnswer: 'Tirupur succeeds due to agglomeration economies (labor.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_20_008', title: 'Industrial Policy and Liberalisation Since 1991',
          caseStudy: { intro: 'Observe the industrial landscape around your city: thirty years ago, a new factory needed dozens of government licenses; today, most sectors require only.',
            decisions: [{ prompt: 'What were the three specific industries that remained reserved for the public sector after the 1991 Industrial Policy reforms, and which.', options: [
                { text: 'The three industries reserved for the public sector post-1991 were atomic energy,', outcome: 'The three industries reserved for the public sector post-1991 were atomic energy, railways.' },
                { text: 'opened all sectors to 100% FDI immediately', outcome: 'Not quite — Students believe the 1991 reforms "opened all sectors to 100% FDI immediately" — in reality, the.', reveals: 'the-1991-reforms-opened-all' },
                { text: 'coal, iron & steel, or telecommunications', outcome: 'Not quite — Students believe the 1991 reforms "opened all sectors to 100% FDI immediately" — in reality, the.', reveals: 'the-1991-reforms-opened-all' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_20_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a case-study on \'why industries locate where they do\', a student generalises from iron and steel: \'Every factory sits next to its raw material — a soda-ash plant should be built beside a salt mine, and cotton mills belong in the cotton fields.\'',
            decisions: [{ prompt: 'Where does the raw-material rule fail?', options: [
                { text: 'Introduce the weight-losing vs weight-gaining/footloose split: only weight-losing inputs pull a plant to the source — and even in cotton, just ginning (65% weight loss) is material-bound while spinning and weaving chase power, labour and markets. Soda ash gains weight and needs ammonia and CO₂ too, so it locates near glass and chemical consumers. Jute retting is the extreme case — absolute site fixation on water of the right pH, temperature and slow flow.', outcome: 'The rule gets its real form: industries locate where total input-plus-distribution cost is lowest — which can be the source, the market, or neither.' },
                { text: 'Defend the rule — agro-based industries are weight-losing, so the factory goes to the field.', outcome: 'Only some stages are weight-losing: cotton spinning/weaving are footloose and migrated to power and port access — mills aren\'t married to the field.', reveals: 'all-agro-industry-material-bound' },
                { text: 'Split the difference — locate the soda-ash plant midway between the salt mine and the market.', outcome: 'Midway maximises neither advantage: with a weight-gaining product and multiple critical inputs, the optimum is the market, not a compromise point.', reveals: 'halfway-location-is-optimal' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_20_008', title: 'You made it',
          caseStudy: { intro: 'A factory locates where the whole input-output bill is cheapest — and government can sweeten that bill but can\'t write it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_20_007', difficulty: 'standard',
          question: 'Small scale and cottage industries are manufacturing units characterized by low.',
          hint: 'Revisit c10_geo_cbse_06_001 (manufacturing importance/classification) and.',
          misconception: 'Students think "small scale industry" and "cottage industry" are interchangeable terms for any small factory.',
          parts: [
                { id: 'a', prompt: 'A small scale textile unit in Surat employs 35 workers with ₹30 crore plant investment. It processes 500 kg cotton yarn daily into grey cloth.', answer: 'Initial: Capital-labor = ₹3000 lakh / 35 = ₹85.7 lakh/worker',
                  options: ['Initial: Capital-labor = ₹3000 lakh / 35 = ₹85.7 lakh/worker', 'small scale industry', 'cottage industry'],
                  hint: 'Revisit c10_geo_cbse_06_001 (manufacturing importance/classification) and c10_geo_cbse_06_007.',
                  misconception: 'Students think "small scale industry" and "cottage industry" are interchangeable terms for any small factory.' }
          ],
            remediations: { 'small-scale-industry-and-cottage': { steps: ['Create a two-column table contrasting Cottage vs Small Scale on 5 dimensions: (a) Labor type (family vs hired), (b).', 'Map 5 local examples (bidi rolling, handloom, pottery, power loom, auto parts) to correct column using the table.', 'For each example, identify which government scheme applies (PMEGP, SFURTI, CGTMSE, CLCSS) — this forces the distinction.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_20_008', difficulty: 'standard',
          question: 'Industrial Policy and Liberalisation Since 1991 refers to the comprehensive.',
          hint: 'Revisit c11_geo_cbse_20_001 (location factors) and c10_geo_cbse_06_007 (Weber/Smith.',
          misconception: 'Students believe the 1991 reforms "opened all sectors to 100% FDI immediately" — in reality, the 1991 policy allowed.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Industrial Policy and Liberalisation',
                  options: ['Industrial Policy and Liberalisation', 'Manufacturing is the large-scale transformation of raw materials into finished goods', 'Agro-based industries are manufacturing units that use agricultural raw materials', 'The iron and steel industry is a heavy, weight-losing mineral-based industry that'],
                  hint: 'Revisit c11_geo_cbse_20_001 (location factors) and c10_geo_cbse_06_007 (Weber/Smith models).',
                  misconception: 'Students believe the 1991 reforms "opened all sectors to 100% FDI immediately" — in reality, the 1991 policy allowed automatic approval.' }
          ],
            remediations: { 'the-1991-reforms-opened-all': { steps: ['Create a timeline table (1991, 1997, 2000, 2014, 2020) mapping FDI cap evolution for 5 key sectors (automobiles.', 'Map the 34 industries in the 1991 "Annex III" (automatic 51% FDI list) on a sectoral chart — note the absence.', 'Compare the 1991 public sector reform (disinvestment of loss-making units, professional management) with the 1999.', 'Re-read the diagnostic answers for Q2 and Q4 to internalise the geographical distinction between delicensing (location.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_20_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the 1991 reforms "opened all sectors to 100% FDI immediately" — in reality, the 1991 policy allowed.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The 1991 liberalisation reduced regional industrial disparities in India by allowing market forces to guide investment to backward areas.".', answer: 'The claim is false',
                  options: ['The claim is false', 'Special Economic Zones in backward areas', 'opened all sectors to 100% FDI immediately'],
                  hint: 'Revisit c11_geo_cbse_20_001 (location factors) and c10_geo_cbse_06_007 (Weber/Smith models).',
                  misconception: 'Students believe the 1991 reforms "opened all sectors to 100% FDI immediately" — in reality, the 1991 policy allowed automatic approval.' },
                { id: 'b', prompt: 'Design a policy framework for a hypothetical "Industrial Policy 2030" that addresses the geographical imbalances created by the 1991 reforms.', answer: 'a spatial targeting mechanism using infrastructure corridors, (',
                  options: ['a spatial targeting mechanism using infrastructure corridors, (', 'opened all sectors to 100% FDI immediately'],
                  hint: 'Revisit c11_geo_cbse_20_001 (location factors) and c10_geo_cbse_06_007 (Weber/Smith models).',
                  misconception: 'Students believe the 1991 reforms "opened all sectors to 100% FDI immediately" — in reality, the 1991 policy allowed automatic approval.' }
          ],
            remediations: { 'the-1991-reforms-opened-all': { steps: ['Create a timeline table (1991, 1997, 2000, 2014, 2020) mapping FDI cap evolution for 5 key sectors (automobiles.', 'Map the 34 industries in the 1991 "Annex III" (automatic 51% FDI list) on a sectoral chart — note the absence.', 'Compare the 1991 public sector reform (disinvestment of loss-making units, professional management) with the 1999.', 'Re-read the diagnostic answers for Q2 and Q4 to internalise the geographical distinction between delicensing (location.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
