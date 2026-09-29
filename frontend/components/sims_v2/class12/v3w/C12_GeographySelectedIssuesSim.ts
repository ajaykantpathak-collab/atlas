import type { SimDef } from '../../engine/types';
import C12_GeographySelectedIssuesSim from '../../../simulations/c6_12/C12_GeographySelectedIssuesSim';

/** v3 wrapped master — C12_GeographySelectedIssuesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_geographyselectedissuessim: SimDef = {
    id: 'v3w_c12_geographyselectedissuessim',
    title: 'Dams: Benefits and Environmental and Social Concerns',
    subtitle: 'Covers benefits (irrigation, hydropower, flood control, water supply), environmental.',
    classLevel: 12, subject: 'geography', topic: 'Dams: Benefits and Environmental and Social Concerns',
    chapters: [],
    nodeIds: ['c12_geo_cbse_12_011', 'c12_geo_cbse_09_008', 'c12_geo_cbse_14_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine standing near the Bhakra-Nangal Dam on the Sutlej River: you see a massive concrete wall holding back.', goal: 'Master Dams: Benefits and Environmental and Social Concerns.' },
    discovery: {
        question: 'Evaluate the statement: "India\'s urbanization is \'exclusionary\' because census towns grow without municipal governance, denying residents basic services." Use.',
        options: ['Valid evaluation: 2011 Census added 2,774 new census towns (vs', 'urbanization', '"urbanization" means only migration to big cities (Mumbai, Delhi)'],
        answer: 'Valid evaluation: 2011 Census added 2,774 new census towns (vs',
        hook: 'Students think "urbanization" means only migration to big cities (Mumbai, Delhi).',
    },
    teaching: [
        { title: 'Dams are large barriers constructed across.', text: 'Dams are large barriers constructed across rivers to store water in reservoirs, serving multipurpose objectives such as irrigation, hydroelectric power generation, flood control, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_011', title: 'Dams are large barriers constructed.',
          scaffold: { problem: 'Analyze the benefits and environmental concerns of the Tehri Dam on the Bhagirathi River (tributary of Ganga) in Uttarakhand.',
            steps: [
            { text: 'Identify the multipurpose objectives: irrigation (2.7 lakh ha in western UP), hydroelectricity (1000 MW), flood.' },
            { text: 'List benefits: transformed agriculture in upper Ganga plains, peak power for northern grid, reduced flood risk in.' },
            { text: 'Identify environmental concerns: submergence of 42 km² of forest (including part of Rajaji National Park buffer),.' },
            { text: 'Assess social concerns: displacement of Old Tehri town (population ~25,000) and 100+ villages; rehabilitation in New.' },
            { text: 'Synthesize trade-offs: National benefits (power, water for capital) vs.', faded: true, blankAnswer: 'Tehri Dam provides significant national benefits.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_09_008', title: 'Rural-urban composition refers to the.',
          scaffold: { problem: 'Census 2001: India\'s urban population = 286.1 million, rural = 742.5 million. Census 2011: urban = 377.1 million, rural = 833.5 million.',
            steps: [
            { text: 'Compute urban decadal growth rate 2001–11 = (377.1 - 286.1) / 286.1 × 100 = 91.0 / 286.1 × 100 = 31.81%.' },
            { text: 'Compute rural decadal growth rate 2001–11 = (833.5 - 742.5) / 742.5 × 100 = 91.0 / 742.5 × 100 = 12.26%.' },
            { text: 'URGD = 31.81 - 12.26 = 19.55 pp (≈19.6 pp).' },
            { text: 'Compare with 1991–2001 URGD (17.2 pp): URGD increased by 2.35 pp, indicating acceleration of urbanization despite.' },
            { text: 'Interpret: The rise in URGD is driven by census town proliferation (reclassification) and migration to non-metro urban.', faded: true, blankAnswer: 'URGD = 19.6 pp (2001–11), up from 17.2 pp (1991–2001)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_14_005', title: 'The Iron and Steel Industry is a.',
          scaffold: { problem: 'Using Weber\'s weight-loss principle, explain why the integrated steel plant at Rourkela (Odisha) was located at its specific site despite.',
            steps: [
            { text: 'Identify raw materials and their weight ratios. For 1 tonne crude steel: ~1.5 tonnes iron ore (haematite), ~0.8 tonnes.' },
            { text: 'Determine weight loss. Blast furnace removes oxygen (from ore) and volatiles (from coal) — output (pig iron) ≈ 1 tonne,.' },
            { text: 'Map distances from Rourkela. Iron ore: Barsua/Kalta (30 km). Limestone: Birmitrapur (15 km).' },
            { text: 'Calculate tonne-km for each material if plant were at Jharia instead. Iron ore: 1.5 t × 300 km = 450 tonne-km.' },
            { text: 'Conclude. Despite coal distance, the massive weight of iron ore (highest tonnage) makes ore-proximity optimal.', faded: true, blankAnswer: 'Rourkela is sited near iron ore (Barsua, 30 km) and.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_geo_cbse_09_008', title: 'Identify each idea',
          dissect: { specimen: 'Dams: Benefits and Environmental and Social Concerns', spots: [
            { id: 's1', label: 'Dams are large barriers constructed', prompt: 'Which idea is this? — Dams are large barriers constructed across rivers to store water in reservoirs, serving.', answer: 'Dams are large barriers constructed', options: ['Dams are large barriers constructed', 'Rural-urban composition refers to the', 'The Iron and Steel Industry'] },
            { id: 's2', label: 'Rural-urban composition refers to the', prompt: 'Which idea is this? — Rural-urban composition refers to the distribution of a country\'s population between.', answer: 'Rural-urban composition refers to the', options: ['Rural-urban composition refers to the', 'Dams are large barriers constructed', 'The Iron and Steel Industry'] },
            { id: 's3', label: 'The Iron and Steel Industry', prompt: 'Which idea is this? — The Iron and Steel Industry is a mineral-based, heavy manufacturing sector that converts.', answer: 'The Iron and Steel Industry', options: ['The Iron and Steel Industry', 'Dams are large barriers constructed', 'Rural-urban composition refers to the'] }
          ] } }
    ],
    explore: { component: C12_GeographySelectedIssuesSim, prompt: 'Explore the interactive — Dams: Benefits and Environmental and Social Concerns' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_011', difficulty: 'standard',
          question: 'Dams are large barriers constructed across rivers to store water in reservoirs,.',
          hint: 'If stuck, revisit the Bhakra-Nangal and Damodar Valley case studies in.',
          misconception: 'Students often believe that environmental concerns of dams are limited to the submergence area (reservoir), ignoring.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dams are large barriers constructed across rivers to store water in reservoirs, serving',
                  options: ['Dams are large barriers constructed across rivers to store water in reservoirs, serving', 'Rural-urban composition refers to the distribution of a country\'s population between', 'The Iron and Steel Industry is a mineral-based, heavy manufacturing sector that converts'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that environmental concerns of dams are limited to the submergence area (reservoir), ignoring downstream impacts.' }
          ],
            remediations: { 'environmental-concerns-of-dams-are': { steps: ['1) Revisit c11_geo_cbse_13_008 (Class 11 Dams: Benefits and Environmental/Social Concerns) and c10_geo_cbse_03_003.', '2) Create a two-column table: "Upstream/Reservoir Impacts" vs "Downstream Impacts" for Tehri Dam using NCERT Fig 4.1.', '3) Watch the 10-minute documentary "Narmada: A Valley Rises" (available on YouTube) to visualize displacement and.', '4) Re-attempt Diagnostic Questions 2, 4, and 6 after this review.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that environmental concerns of dams are limited to the submergence area (reservoir), ignoring.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The benefits of the Bhakra-Nangal Project outweigh its environmental and social costs." Provide a reasoned judgment with three pieces.', answer: 'Judgment: Benefits are significant but costs are substantial and ongoing',
                  options: ['Judgment: Benefits are significant but costs are substantial and ongoing', 'dams are good for development'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that environmental concerns of dams are limited to the submergence area (reservoir), ignoring downstream impacts.' }
          ],
            remediations: { 'environmental-concerns-of-dams-are': { steps: ['1) Revisit c11_geo_cbse_13_008 (Class 11 Dams: Benefits and Environmental/Social Concerns) and c10_geo_cbse_03_003.', '2) Create a two-column table: "Upstream/Reservoir Impacts" vs "Downstream Impacts" for Tehri Dam using NCERT Fig 4.1.', '3) Watch the 10-minute documentary "Narmada: A Valley Rises" (available on YouTube) to visualize displacement and.', '4) Re-attempt Diagnostic Questions 2, 4, and 6 after this review.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_09_008', difficulty: 'standard',
          question: 'Rural-urban composition refers to the distribution of a country\'s population.',
          hint: 'If unsure about census town criteria or growth rate formula, review c11_geo_cbse_16_004.',
          misconception: 'Students think "urbanization" means only migration to big cities (Mumbai, Delhi).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rural-urban composition refers to the distribution of a country\'s population between',
                  options: ['Rural-urban composition refers to the distribution of a country\'s population between', 'Dams are large barriers constructed across rivers to store water in reservoirs, serving', 'The Iron and Steel Industry is a mineral-based, heavy manufacturing sector that converts'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "urbanization" means only migration to big cities (Mumbai, Delhi).' }
          ],
            remediations: { 'urbanization-means-only-migration-to': { steps: ['Revisit c11_geo_cbse_17_004 (Urbanisation in India: Trends, Causes and Problems) — focus on the distinction between.', 'Download Census 2011 PCA for your state; identify 5 census towns and verify the three criteria.', 'Plot a scatter diagram: x-axis = % urban (2001), y-axis = urban growth rate (2001–11) for all states; observe the.', 'Re-attempt Diagnostic Question 4 with this visual evidence.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_09_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "urbanization" means only migration to big cities (Mumbai, Delhi).',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India\'s urbanization is \'exclusionary\' because census towns grow without municipal governance, denying residents basic services." Use.', answer: 'Valid evaluation: 2011 Census added 2,774 new census towns (vs',
                  options: ['Valid evaluation: 2011 Census added 2,774 new census towns (vs', 'urbanization', '"urbanization" means only migration to big cities (Mumbai, Delhi)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "urbanization" means only migration to big cities (Mumbai, Delhi).' },
                { id: 'b', prompt: 'Design a two-indicator map (choropleth + proportional symbols) to show state-level urbanization level and urban growth rate (2001–2011).', answer: 'Choropleth: % urban population (2011)',
                  options: ['Choropleth: % urban population (2011)', 'urbanization', '"urbanization" means only migration to big cities (Mumbai, Delhi)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "urbanization" means only migration to big cities (Mumbai, Delhi).' }
          ],
            remediations: { 'urbanization-means-only-migration-to': { steps: ['Revisit c11_geo_cbse_17_004 (Urbanisation in India: Trends, Causes and Problems) — focus on the distinction between.', 'Download Census 2011 PCA for your state; identify 5 census towns and verify the three criteria.', 'Plot a scatter diagram: x-axis = % urban (2001), y-axis = urban growth rate (2001–11) for all states; observe the.', 'Re-attempt Diagnostic Question 4 with this visual evidence.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_14_005', difficulty: 'standard',
          question: 'The Iron and Steel Industry is a mineral-based, heavy manufacturing sector that.',
          hint: 'If stuck, revise c10_geo_cbse_05_002 (iron ore belts) and c10_geo_cbse_05_005 (coal.',
          misconception: 'Students believe "all Indian steel plants use domestic coking coal." In reality, India has negligible coking coal.',
          parts: [
                { id: 'a', prompt: 'On an outline map of India, mark and label: (a) the oldest private-sector integrated steel plant, (b) a coastal plant that imports coking coal, (c) a plant in.', answer: 'the oldest private-sector integrated steel plant, (',
                  options: ['the oldest private-sector integrated steel plant, (', 'all Indian steel plants use domestic coking coal', 'why coastal plants are competitive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "all Indian steel plants use domestic coking coal." In reality, India has negligible coking coal reserves (only 34 BT,.' }
          ],
            remediations: { 'all-indian-steel-plants-use': { steps: ['Revisit c10_geo_cbse_05_002 (iron ore types/distribution) and c10_geo_cbse_05_005 (coal types) — make a two-column.', 'On a map, mark Jharia, Raniganj, Korba, Talcher — label each "coking" or "non-coking."', 'For each major steel plant, write its coal source (domestic washed / imported).', 'Re-attempt Diagnostic Q2 and Q3. If still stuck, watch the 10-min NPTEL lecture "Indian Steel Industry: Raw Material.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_14_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "all Indian steel plants use domestic coking coal." In reality, India has negligible coking coal.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India\'s per capita steel consumption (≈78 kg) is low because the industry lacks capacity." Use data: current capacity ≈160 MT,.', answer: 'The statement is false',
                  options: ['The statement is false', 'lack of capacity', 'all Indian steel plants use domestic coking coal', 'why coastal plants are competitive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "all Indian steel plants use domestic coking coal." In reality, India has negligible coking coal reserves (only 34 BT,.' },
                { id: 'b', prompt: 'Design a locational proposal for a new 5 MTPA integrated steel plant in India.', answer: 'Example: Odisha, Keonjhar district',
                  options: ['Example: Odisha, Keonjhar district', 'all Indian steel plants use domestic coking coal', 'why coastal plants are competitive', 'impact of global coking coal price spikes on Indian steel margins'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "all Indian steel plants use domestic coking coal." In reality, India has negligible coking coal reserves (only 34 BT,.' }
          ],
            remediations: { 'all-indian-steel-plants-use': { steps: ['Revisit c10_geo_cbse_05_002 (iron ore types/distribution) and c10_geo_cbse_05_005 (coal types) — make a two-column.', 'On a map, mark Jharia, Raniganj, Korba, Talcher — label each "coking" or "non-coking."', 'For each major steel plant, write its coal source (domestic washed / imported).', 'Re-attempt Diagnostic Q2 and Q3. If still stuck, watch the 10-min NPTEL lecture "Indian Steel Industry: Raw Material.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
