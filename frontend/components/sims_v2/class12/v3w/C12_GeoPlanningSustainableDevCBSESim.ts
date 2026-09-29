import type { SimDef } from '../../engine/types';
import C12_GeoPlanningSustainableDevCBSESim from '../../../simulations/c6_12_new/C12_GeoPlanningSustainableDevCBSESim';

/** v3 wrapped master — C12_GeoPlanningSustainableDevCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_geoplanningsustainabledevcbsesim: SimDef = {
    id: 'v3w_c12_geoplanningsustainabledevcbsesim',
    title: 'Disaster Management: Mitigation, Preparedness, Response, Recovery',
    subtitle: 'Covers the four phases of disaster management cycle as per NDMA guidelines and Class 12.',
    classLevel: 12, subject: 'science', topic: 'Disaster Management: Mitigation, Preparedness, Response, Recovery',
    chapters: [],
    nodeIds: ['c12_geo_cbse_17_009', 'c12_geo_cbse_17_010', 'c12_geo_cbse_04_007', 'c12_geo_cbse_04_010', 'c12_geo_cbse_10_008', 'c12_geo_cbse_10_010', 'c12_geo_cbse_02_010', 'c12_geo_cbse_12_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you\'re in a village in Assam\'s Majuli island during the 2022 Brahmaputra floods — water rises.', goal: 'Master Disaster Management: Mitigation, Preparedness, Response, Recovery.' },
    discovery: {
        question: 'Explain why "compact city" form is considered more sustainable than "sprawl" for Indian metropolitan regions, linking land use, transport, and energy.',
        options: ['Compact city form', 'saving land', 'analyse the relationship'],
        answer: 'Compact city form',
        hook: 'Students equate "Smart City" with "high-tech city" (flying cars, AI everywhere) and assume sustainability is automatic.',
    },
    teaching: [
        { title: 'Disaster management is a continuous and.', text: 'Disaster management is a continuous and integrated cycle of four interdependent phases — mitigation (reducing risk before disaster), preparedness (building capacity to respond), response (immediate.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_geo_cbse_17_009', title: 'Disaster management is a continuous and.',
          scaffold: { problem: 'The District Magistrate of Morigaon (Assam) must prepare a flood contingency plan before monsoon.',
            steps: [
            { text: 'Map exposure — Overlay Census 2011 village boundaries on CWC flood inundation layer (20-year return period) using QGIS;.' },
            { text: 'Assess vulnerability — Conduct household survey (ASHA workers) scoring houses on: plinth height (<0.5m = high),.' },
            { text: 'Early warning dissemination design — Establish 3-tier chain: CWC gauge (Neamatighat) → DDMA WhatsApp (District EOC) →.' },
            { text: 'Evacuation logistics — Pre-position 15 community boats (procure via SDRF fund) at 5 strategic ghats; designate 20.' },
            { text: 'Mock drill — Conduct district-level drill on June 1 (pre-monsoon): simulate "Red Alert" at 6 AM, evacuate 3.' },
            { text: 'Institutionalize — Issue DM order under Section 30 (DM Act 2005) making plan legally binding; allocate ₹50 lakh from.', faded: true, blankAnswer: 'A 6-component preparedness plan: (1) GIS-based exposure.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_17_010', title: 'Sustainable development is development.',
          scaffold: { problem: 'A village in Bundelkhand region (Uttar Pradesh) faces severe water scarcity, soil erosion, and out-migration.',
            steps: [
            { text: 'Identify the environmental pillar – construct check dams and contour bunds on the hilly terrain to arrest soil erosion.' },
            { text: 'Identify the economic pillar – promote agroforestry (e.g., amla, bamboo) and dairy farming to provide income; link to.' },
            { text: 'Identify the social pillar – form a village watershed committee with representation of women and marginalized groups to.' },
            { text: 'Integrate – show how environmental improvement (water availability) enables economic activities, which are sustained by.' },
            { text: 'Verify – check if plan addresses root causes (water scarcity, erosion) and is locally adaptable.', faded: true, blankAnswer: 'A plan with check dams (environmental), agroforestry/dairy.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_04_007', title: 'Urbanisation is the process of.',
          scaffold: { problem: 'According to Census 2011, India\'s total population was 1210.9 million and urban population was 377.1 million.',
            steps: [
            { text: 'Identify the given data for both census years: total and urban populations.' },
            { text: 'Compute urbanisation rate for each year using formula: (Urban/Total)×100.' },
            { text: 'Compute decadal urban growth rate: [(Urban_2011 – Urban_2001)/Urban_2001]×100.' },
            { text: 'Compute decadal total population growth rate: [(Total_2011 – Total_2001)/Total_2001]×100.' },
            { text: 'Compute absolute increase in urban and total population; find urban share of total increase = (Urban increase / Total.' },
            { text: 'Interpret: urbanisation rate rose from 27.8% to 31.1%; urban growth (31.8%) exceeded total growth (17.7%), indicating.', faded: true, blankAnswer: '(a) 2001: 27.8%, 2011: 31.1%. (b) Urban growth rate = 31.8%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_04_010', title: 'Sustainable settlement planning is a.',
          scaffold: { problem: 'The Municipal Corporation of City X (population 1.5 million) plans a Smart City proposal for Area-Based Development (ABD) in a 500-acre.',
            steps: [
            { text: 'Identify the proposal\'s key parameters — land use mix, density (implied by 60% residential on 300 acres ≈ 150 du/acre.' },
            { text: 'Assess Environmental pillar — Positive: 50% water recycling, 25% solar, TOD reduces VKT.' },
            { text: 'Assess Social pillar — Positive: Mixed-income housing suggests inclusion.' },
            { text: 'Assess Economic pillar — Positive: Commercial component generates revenue.' },
            { text: 'Synthesise and propose improvements — Improvement 1: Mandate in-situ slum rehabilitation with tenure security and.', faded: true, blankAnswer: 'The proposal scores moderate on environment.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_10_008', title: 'Urban settlement problems refer to the.',
          scaffold: { problem: 'Using Census 2011 data, analyze the slum population percentage in three million-plus cities: Mumbai (41.3%), Kolkata (29.6%), Chennai.',
            steps: [
            { text: 'Identify the slum percentage for each city from Census 2011 tables.' },
            { text: 'Note Mumbai\'s percentage is significantly higher than other metros.' },
            { text: 'Recall Mumbai\'s geography: linear north-south peninsula, constrained by sea and hills, limiting land expansion.' },
            { text: 'Connect to historical development: colonial port city attracted massive migration, high land values pushed poor to.' },
            { text: 'Consider economic structure: large informal sector (textiles, recycling, services) provides employment but not formal.' },
            { text: 'Synthesize: Physical constraints + historical migration + informal economy = high slum incidence.', faded: true, blankAnswer: 'Mumbai\'s slum percentage (41.3%) is highest due to its.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_10_010', title: 'The Smart Cities Mission (launched.',
          scaffold: { problem: 'Bhubaneswar (Odisha) was the first Round 1 winner (Jan 2016). Its ABD covers 985 acres (retrofitting + greenfield) in the Bhubaneswar Town.',
            steps: [
            { text: 'Convert city area to acres: 422 km² × 247.105 acres/km² = 104,278 acres.' },
            { text: 'ABD % = (985 / 104,278) × 100 = 0.945% (≈ 0.95%).' },
            { text: 'Identify project geography: Water supply (Pan-City) = ₹1,200 cr; Traffic management (Pan-City) = ₹350 cr; Rooftop solar.' },
            { text: 'Total Pan-City value = 1,200 + 350 = ₹1,550 cr. Total ABD value = ₹200 cr. Total = ₹1,750 cr (subset of ₹4,500 cr).' },
            { text: 'Pan-City % = (1,550 / 1,750) × 100 = 88.6%. ABD % = 11.4%.' },
            { text: 'Interpret: Even though ABD is spatial focus (0.95% area), Pan-City solutions dominate investment because they serve.', faded: true, blankAnswer: '(a) 0.95% of city area. (b) Pan-City = 88.6%, ABD = 11.4%.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_geo_cbse_17_010', title: 'Identify each idea',
          dissect: { specimen: 'Disaster Management: Mitigation, Preparedness, Response, Recovery', spots: [
            { id: 's1', label: 'Disaster management is a continuous', prompt: 'Which idea is this? — Disaster management is a continuous and integrated cycle of four interdependent phases —.', answer: 'Disaster management is a continuous', options: ['Disaster management is a continuous', 'Sustainable development is development that', 'Urbanisation is the process of', 'Sustainable settlement planning is a'] },
            { id: 's2', label: 'Sustainable development is development that', prompt: 'Which idea is this? — Sustainable development is development that meets the needs of the present without.', answer: 'Sustainable development is development that', options: ['Sustainable development is development that', 'Disaster management is a continuous', 'Urbanisation is the process of', 'Sustainable settlement planning is a'] },
            { id: 's3', label: 'Urbanisation is the process of', prompt: 'Which idea is this? — Urbanisation is the process of population concentration in urban areas, marked by an.', answer: 'Urbanisation is the process of', options: ['Urbanisation is the process of', 'Disaster management is a continuous', 'Sustainable development is development that', 'Sustainable settlement planning is a'] },
            { id: 's4', label: 'Sustainable settlement planning is a', prompt: 'Which idea is this? — Sustainable settlement planning is a holistic approach to designing and managing human.', answer: 'Sustainable settlement planning is a', options: ['Sustainable settlement planning is a', 'Disaster management is a continuous', 'Sustainable development is development that', 'Urbanisation is the process of'] },
            { id: 's5', label: 'Urban settlement problems refer to', prompt: 'Which idea is this? — Urban settlement problems refer to the adverse conditions arising from rapid and.', answer: 'Urban settlement problems refer to', options: ['Urban settlement problems refer to', 'Disaster management is a continuous', 'Sustainable development is development that', 'Urbanisation is the process of'] },
            { id: 's6', label: 'The Smart Cities Mission launched', prompt: 'Which idea is this? — The Smart Cities Mission (launched 2015) is a Government of India urban renewal program.', answer: 'The Smart Cities Mission launched', options: ['The Smart Cities Mission launched', 'Disaster management is a continuous', 'Sustainable development is development that', 'Urbanisation is the process of'] }
          ] } }
    ],
    explore: { component: C12_GeoPlanningSustainableDevCBSESim, prompt: 'Explore the interactive — Disaster Management: Mitigation, Preparedness, Response, Recovery' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_009', difficulty: 'standard',
          question: 'Disaster management is a continuous and integrated cycle of four interdependent.',
          hint: 'Revisit c11_geo_cbse_11_008 Section 3 (Disaster Management Cycle) and practice.',
          misconception: 'Students equate "disaster management" with "disaster response/relief distribution" — writing essays on NDRF boats and.',
          parts: [
                { id: 'a', prompt: 'Explain why community-based disaster preparedness (CBDP) is more effective than top-down government alerts alone for cyclone-prone Odisha coast.', answer: 'CBDP ensures last-mile connectivity',
                  options: ['CBDP ensures last-mile connectivity', 'government has better technology'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "disaster management" with "disaster response/relief distribution" — writing essays on NDRF boats and food packets for.' }
          ],
            remediations: { 'students-equate-disaster-management-with': { steps: ['Revisit c11_geo_cbse_11_008 (Class 11 Disaster Management) — re-read the mitigation/preparedness/response definitions.', 'Draw the disaster management cycle diagram (circular, not linear) labeling feedback loops: recovery → mitigation (build.', 'Take the 2018 Kerala floods case study — classify 10 reported actions (e.g., "Fisherfolk rescued 65,000 people" =.', 'Re-attempt Diagnostic Questions 1-3. If still stuck, map your village/ward\'s disaster management plan (ask local.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_010', difficulty: 'standard',
          question: 'Sustainable development is development that meets the needs of the present.',
          hint: 'If stuck, revisit the Jhabua watershed management case study (NCERT Class 12 Chapter 9).',
          misconception: 'Students often think sustainable development means only environmental protection (e.g., planting trees) and ignore the.',
          parts: [
                { id: 'a', prompt: 'Given the data: Jhabua district treated 20% of its total area under watershed management in five years, resulting in a 30% increase in groundwater recharge and.', answer: 'Area treated = 20% of 6,782 km² = 1,356.4 km²',
                  options: ['Area treated = 20% of 6,782 km² = 1,356.4 km²', 'sustainable development means only environmental protection (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think sustainable development means only environmental protection (e.g., planting trees) and ignore the economic and social.' },
                { id: 'b', prompt: 'Compare the Namami Gange programme and the Jhabua watershed management approach in terms of scale, stakeholder involvement, and integration of the three.', answer: 'Namami Gange is a large-scale, top-down government programme focusing on sewage',
                  options: ['Namami Gange is a large-scale, top-down government programme focusing on sewage', 'sustainable development means only environmental protection (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think sustainable development means only environmental protection (e.g., planting trees) and ignore the economic and social.' }
          ],
            remediations: { 'sustainable-development-means-only-environmental': { steps: ['Revisit the Brundtland definition and the three-pillar diagram (economic, social, environmental).', 'Study the Jhabua case study (NCERT) and identify how each pillar is addressed.', 'Create a table for two Indian programmes (Namami Gange, Smart Cities) listing actions under each pillar.', 'Re-attempt Diagnostic Question 2 and 5.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think sustainable development means only environmental protection (e.g., planting trees) and ignore the.',
          parts: [
                { id: 'a', prompt: 'Design a sustainable development plan for a hypothetical drought-prone district in Maharashtra, incorporating water conservation, livelihood support, and.', answer: 'Good answer: 1) Watershed structures (check dams, contour trenches) to recharge',
                  options: ['Good answer: 1) Watershed structures (check dams, contour trenches) to recharge', 'sustainable development means only environmental protection (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think sustainable development means only environmental protection (e.g., planting trees) and ignore the economic and social.' },
                { id: 'b', prompt: 'Compare the Namami Gange programme and the Jhabua watershed management approach in terms of scale, stakeholder involvement, and integration of the three.', answer: 'Namami Gange is a large-scale, top-down government programme focusing on sewage',
                  options: ['Namami Gange is a large-scale, top-down government programme focusing on sewage', 'sustainable development means only environmental protection (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think sustainable development means only environmental protection (e.g., planting trees) and ignore the economic and social.' }
          ],
            remediations: { 'sustainable-development-means-only-environmental': { steps: ['Revisit the Brundtland definition and the three-pillar diagram (economic, social, environmental).', 'Study the Jhabua case study (NCERT) and identify how each pillar is addressed.', 'Create a table for two Indian programmes (Namami Gange, Smart Cities) listing actions under each pillar.', 'Re-attempt Diagnostic Question 2 and 5.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_007', difficulty: 'standard',
          question: 'Urbanisation is the process of population concentration in urban areas, marked.',
          hint: 'If stuck, review the definition of Census towns vs. statutory towns (c12_geo_cbse_04_002).',
          misconception: 'Students often equate urbanisation with "growth of big cities" and ignore the growth of small and medium towns.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Urbanisation is the process of population concentration in urban areas, marked by an',
                  options: ['Urbanisation is the process of population concentration in urban areas, marked by an', 'Disaster management is a continuous and integrated cycle of four interdependent phases', 'Sustainable development is development that meets the needs of the present without', 'Sustainable settlement planning is a holistic approach to designing and managing human'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate urbanisation with "growth of big cities" and ignore the growth of small and medium towns.' }
          ],
            remediations: { 'students-often-equate-urbanisation-with': { steps: ['Revisit c12_geo_cbse_04_002 (rural vs urban criteria) to recall how India defines urban (statutory + Census towns).', 'Review c11_geo_cbse_17_004 (urbanisation in India trends) and plot India\'s urbanisation rate (1901–2011) on graph paper.', 'Calculate urban growth rate and urbanisation rate for two consecutive Census years (e.g., 2001 and 2011) using the.', 'Compare India\'s urban primacy index (Delhi vs. Mumbai) with that of the USA (New York vs.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_010', difficulty: 'standard',
          question: 'Sustainable settlement planning is a holistic approach to designing and.',
          hint: 'If stuck on sustainability pillars, revisit c11_soc_cbse_08_008 (Sustainable Development:.',
          misconception: 'Students equate "Smart City" with "high-tech city" (flying cars, AI everywhere) and assume sustainability is automatic.',
          parts: [
                { id: 'a', prompt: 'Explain why "compact city" form is considered more sustainable than "sprawl" for Indian metropolitan regions, linking land use, transport, and energy.', answer: 'Compact city form',
                  options: ['Compact city form', 'saving land', 'analyse the relationship'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Smart City" with "high-tech city" (flying cars, AI everywhere) and assume sustainability is automatic.' },
                { id: 'b', prompt: 'A city of 2 million people currently supplies 110 lpcd water. The Smart Cities Mission targets 135 lpcd with 24×7 supply.', answer: 'Step 1: Current effective supply per capita = 110 lpcd × (1 – 0.40) = 66 lpcd',
                  options: ['Step 1: Current effective supply per capita = 110 lpcd × (1 – 0.40) = 66 lpcd', 'calculate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Smart City" with "high-tech city" (flying cars, AI everywhere) and assume sustainability is automatic.' },
                { id: 'c', prompt: 'Compare the RURBAN Mission (Shyama Prasad Mukherji Rurban Mission) and the Smart Cities Mission in terms of: (a) spatial unit of intervention, (b) core.', answer: 'spatial unit of intervention, (',
                  options: ['spatial unit of intervention, (', 'urban missions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Smart City" with "high-tech city" (flying cars, AI everywhere) and assume sustainability is automatic.' }
          ],
            remediations: { 'students-equate-smart-city-with': { steps: ['Revisit c11_geo_cbse_17_006 (Urban Problems) and c11_geo_cbse_17_008 (Smart Cities Mission) — list 5 urban problems.', 'Draw a systems diagram: water-energy-waste-food-mobility flows for a 1 km² neighbourhood — mark where technology.', 'Take the CUET 2023/2024 geography case-based question on Smart Cities (available on NTA website) and write a 150-word.', 'Verify with teacher using the marking scheme — check if you addressed equity, ecology, and economy, not just tech.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "Smart City" with "high-tech city" (flying cars, AI everywhere) and assume sustainability is automatic.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Smart Cities Mission is primarily a technology mission, not a sustainability mission." Use three specific arguments grounded in the.', answer: 'The statement is partially true but incomplete',
                  options: ['The statement is partially true but incomplete', 'discuss', 'assertion-reason'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Smart City" with "high-tech city" (flying cars, AI everywhere) and assume sustainability is automatic.' }
          ],
            remediations: { 'students-equate-smart-city-with': { steps: ['Revisit c11_geo_cbse_17_006 (Urban Problems) and c11_geo_cbse_17_008 (Smart Cities Mission) — list 5 urban problems.', 'Draw a systems diagram: water-energy-waste-food-mobility flows for a 1 km² neighbourhood — mark where technology.', 'Take the CUET 2023/2024 geography case-based question on Smart Cities (available on NTA website) and write a 150-word.', 'Verify with teacher using the marking scheme — check if you addressed equity, ecology, and economy, not just tech.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_10_008', difficulty: 'standard',
          question: 'Urban settlement problems refer to the adverse conditions arising from rapid.',
          hint: 'If stuck, revisit c12_geo_cbse_10_005 (Urbanisation trends) and c12_geo_cbse_10_007.',
          misconception: 'Students often think slums are purely a result of "rural-urban migration" and that stopping migration will solve the.',
          parts: [
                { id: 'a', prompt: 'According to Census 2011, what percentage of India\'s urban population lived in slums, and which state had the highest slum population?', answer: 'As per Census 2011, 17.4% of India\'s urban population lived in slums',
                  options: ['As per Census 2011, 17.4% of India\'s urban population lived in slums', 'rural-urban migration', 'congestion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think slums are purely a result of "rural-urban migration" and that stopping migration will solve the problem.' },
                { id: 'b', prompt: 'Explain why slums tend to develop on ecologically fragile lands (e.g., floodplains, steep slopes) in Indian cities, and how this increases vulnerability to.', answer: 'Slums develop on ecologically fragile lands',
                  options: ['Slums develop on ecologically fragile lands', 'poor planning', 'rural-urban migration'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think slums are purely a result of "rural-urban migration" and that stopping migration will solve the problem.' },
                { id: 'c', prompt: 'Calculate the approximate population density of a slum cluster in Mumbai (Dharavi) given: area = 2.1 sq km, population = 850,000.', answer: 'Step 1: Density = Population / Area = 850,000 / 2.1 = 404,762 persons/sq km',
                  options: ['Step 1: Density = Population / Area = 850,000 / 2.1 = 404,762 persons/sq km', 'rural-urban migration', 'congestion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think slums are purely a result of "rural-urban migration" and that stopping migration will solve the problem.' }
          ],
            remediations: { 'slums-are-purely-a-result': { steps: ['If the student holds the migration-only misconception, have them: (1) Revisit c11_geo_cbse_16_004 (Rural-Urban.', '(2) Analyze Census 2011 slum data: compare slum growth rate vs urban growth rate.', '(3) Map a city\'s slum locations (using Bhuvan or OpenStreetMap) and note their proximity to employment centers, not.', '(4) Re-attempt Diagnostic Question 2 with this evidence.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_10_010', difficulty: 'standard',
          question: 'The Smart Cities Mission (launched 2015) is a Government of India urban renewal.',
          hint: 'If stuck on SPV structure or funding flow, revisit c11_ps_cbse_17_006 (74th Amendment).',
          misconception: 'Students think "Smart City = IT city / high-tech city" and equate it with Bengaluru/Hyderabad\'s IT parks.',
          parts: [
                { id: 'a', prompt: 'Name the two distinct development models under the Smart Cities Mission and state the minimum area requirement for Area-Based Development (ABD) as per Mission.', answer: 'Correct: (1) Area-Based Development (ABD)',
                  options: ['Correct: (1) Area-Based Development (ABD)', 'ABD requires 100 acres', 'only one model exists'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "Smart City = IT city / high-tech city" and equate it with Bengaluru/Hyderabad\'s IT parks.' },
                { id: 'b', prompt: 'Explain why the Smart Cities Mission uses a "Challenge Method" (competitive selection) instead of formula-based allocation like AMRUT.', answer: 'Correct: Challenge Method ensures cities compete on proposal quality (vision,',
                  options: ['Correct: Challenge Method ensures cities compete on proposal quality (vision,', 'to save money', 'because some cities are smarter'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "Smart City = IT city / high-tech city" and equate it with Bengaluru/Hyderabad\'s IT parks.' },
                { id: 'c', prompt: 'A city\'s Smart City Proposal allocates ₹2,000 crore: 60% for ABD (retrofitting 120 acres), 20% for Pan-City (Integrated Command Control Centre), 10% for O&M,.', answer: 'Step 1: ABD allocation = 60% of ₹2,000 cr = ₹1,200 cr',
                  options: ['Step 1: ABD allocation = 60% of ₹2,000 cr = ₹1,200 cr', 'Smart City = IT city / high-tech city'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "Smart City = IT city / high-tech city" and equate it with Bengaluru/Hyderabad\'s IT parks.' }
          ],
            remediations: { 'smart-city-it-city-high': { steps: ['Revisit **c11_geo_cbse_17_008** (Smart Cities Mission intro) and **c12_geo_cbse_10_008** (Urban problems) to relink.', 'Download *one* actual Smart City Proposal (e.g., Bhubaneswar Round 1 winner) from smartcities.gov.in.', 'Map its ABD area on Google Earth; list 5 Pan-City projects.', 'Re-do Diagnostic Q3 (calculation) with that city\'s numbers.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_10_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "Smart City = IT city / high-tech city" and equate it with Bengaluru/Hyderabad\'s IT parks.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Smart Cities Mission solves urban problems by applying technology to infrastructure." Use the Mission\'s definition of "smart.', answer: 'Correct: The statement is reductionist',
                  options: ['Correct: The statement is reductionist', 'yes, because ICCC uses IoT', 'sustainable and inclusive', 'Smart City = IT city / high-tech city'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "Smart City = IT city / high-tech city" and equate it with Bengaluru/Hyderabad\'s IT parks.' }
          ],
            remediations: { 'smart-city-it-city-high': { steps: ['Revisit **c11_geo_cbse_17_008** (Smart Cities Mission intro) and **c12_geo_cbse_10_008** (Urban problems) to relink.', 'Download *one* actual Smart City Proposal (e.g., Bhubaneswar Round 1 winner) from smartcities.gov.in.', 'Map its ABD area on Google Earth; list 5 Pan-City projects.', 'Re-do Diagnostic Q3 (calculation) with that city\'s numbers.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
