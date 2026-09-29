import type { SimDef } from '../../engine/types';
import C12_GeographyIndustriesAgrobasedSim from '../../../simulations/c6_12/C12_GeographyIndustriesAgrobasedSim';

/** v3 wrapped master — C12_GeographyIndustriesAgrobasedSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_geographyindustriesagrobasedsim: SimDef = {
    id: 'v3w_c12_geographyindustriesagrobasedsim',
    title: 'Secondary Activities: Definition and Importance',
    subtitle: 'Covers the definition, characteristics, economic importance (value addition, employment,.',
    classLevel: 12, subject: 'geography', topic: 'Secondary Activities: Definition and Importance',
    chapters: [],
    nodeIds: ['c12_geo_cbse_06_001', 'c12_geo_cbse_06_002', 'c12_geo_cbse_06_005', 'c12_geo_cbse_06_009', 'c12_geo_cbse_14_001', 'c12_geo_cbse_14_003', 'c12_geo_cbse_14_004', 'c12_geo_cbse_11_004', 'c12_geo_cbse_11_008', 'c12_geo_cbse_06_010', 'c12_geo_cbse_06_011', 'c12_geo_cbse_14_005', 'c12_geo_cbse_14_006', 'c12_geo_cbse_14_007', 'c12_geo_cbse_14_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Look around your classroom — the desk, chair, fan, window glass, and even the pen in your hand are all.', goal: 'Master Secondary Activities: Definition and Importance.' },
    discovery: {
        question: 'Define \'value addition\' in manufacturing and give one example each of a weight-losing industry and a weight-gaining industry.',
        options: ['Value addition is the increase in economic value of a product at each stage of', 'textile is weight-losing', 'manufacturing = factory production'],
        answer: 'Value addition is the increase in economic value of a product at each stage of',
        hook: 'Students think "manufacturing = factory production" and equate it only with large-scale, machine-driven assembly lines.',
    },
    teaching: [
        { title: 'Secondary activities involve the processing.', text: 'Secondary activities involve the processing of raw materials obtained from the primary sector (agriculture, mining, forestry, fishing) into finished or semi-finished goods through manufacturing,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_geo_cbse_06_001', title: 'Secondary activities involve the.',
          scaffold: { problem: 'Classify each activity as Primary (P), Secondary (S), or Tertiary (T): (i) Mining limestone, (ii) Making cement from limestone, (iii).',
            steps: [
            { text: 'Identify the nature of each activity — extraction, transformation, transport, professional service, construction.' },
            { text: 'Recall definitions: Primary = extraction of natural resources; Secondary = processing/manufacturing/construction;.' },
            { text: 'Apply to (i): Limestone is extracted from earth → Primary.' },
            { text: 'Apply to (ii): Limestone chemically transformed into cement in a factory → Secondary (manufacturing).' },
            { text: 'Apply to (iii): Movement of goods → Tertiary (transport service).' },
            { text: 'Apply to (iv): Intellectual/professional service → Tertiary.' },
            { text: 'Apply to (v): Construction is a secondary activity (creates fixed asset) → Secondary.', faded: true, blankAnswer: '(i) P, (ii) S, (iii) T, (iv) T, (v) S.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_06_002', title: 'Manufacturing is the process of.',
          scaffold: { problem: 'A mini steel plant in Raipur uses 1,200 tonnes/day of iron ore (65% Fe) and 400 tonnes/day of coal to produce 600 tonnes/day of crude steel.',
            steps: [
            { text: 'Calculate Fe input = 1,200 × 0.65 = 780 tonnes Fe/day. Fe in steel = 600 × 0.992 = 595.2 tonnes Fe/day (since 0.8% C).' },
            { text: 'Total input weight = 1,200 (ore) + 400 (coal) = 1,600 tonnes. Total output weight = 600 (steel) + 300 (slag) +.' },
            { text: 'Daily input cost = (1,200 × 5,000) + (400 × 8,000) = ₹60 lakh + ₹32 lakh = ₹92 lakh.' },
            { text: 'Value added per day = ₹330 lakh – ₹92 lakh = ₹238 lakh. Value added per tonne steel = ₹238 lakh / 600 = ₹39,667/t.' },
            { text: 'Interpret: High weight loss (62.5%) pulls plant to raw material (iron ore/coal) — Raipur is on Chotanagpur plateau.', faded: true, blankAnswer: '(a) Fe recovery = 76.3%. (b) Weight loss ratio = 62.5%. (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_06_005', title: 'Large-scale industries are.',
          scaffold: { problem: 'Classify the following into household, small-scale, or large-scale industry using Indian statutory criteria: (a) A handloom weaving unit in.',
            steps: [
            { text: 'Recall MSMED Act 2006 thresholds for manufacturing: Micro ≤₹25 lakh, Small ≤₹5 crore, Medium ≤₹50 crore; above ₹50.' },
            { text: 'For (a): Investment ₹5 lakh (<₹25 lakh) and 2 artisans → Household / Micro.' },
            { text: 'For (b): Investment ₹12 crore (between ₹5 crore and ₹50 crore) → Small-scale (actually Medium enterprise, but in.' },
            { text: 'For (c): Investment ₹2 lakh crore (≫₹50 crore) and 5,000 workers → Large-scale.' },
            { text: 'Verify with technology: (a) manual loom, (b) power looms, (c) continuous catalytic cracking — consistent with scale.', faded: true, blankAnswer: '(a) Household/Micro, (b) Small-scale (Medium enterprise),.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_06_009', title: 'Agro-based industries are manufacturing.',
          scaffold: { problem: 'A food processing entrepreneur plans to set up a 10 MT/day banana puree unit in Theni district, Tamil Nadu.',
            steps: [
            { text: 'Identify raw material weight per unit of product. 100 kg banana → 45 kg puree.' },
            { text: 'Compute Material Index = Raw material weight / Product weight = 2.22 / 1 = 2.22.' },
            { text: 'Interpret MI = 2.22 > 1 → strong raw material orientation. Transporting 2.22 kg of perishable banana (75% water) incurs.' },
            { text: 'Evaluate options. Farm gate minimises banana transport but lacks power, water, labour, effluent disposal.' },
            { text: 'Recommend Theni town as optimal — balances raw material proximity (within 15-20 km catchment) with industrial.', faded: true, blankAnswer: 'Material Index = 2.22. Optimal location: Theni town (15 km.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_14_001', title: 'Manufacturing is the process of.',
          scaffold: { problem: 'A district has 120 manufacturing units. 45 use agricultural raw materials (cotton, jute, sugarcane), 30 use minerals (iron ore, limestone,.',
            steps: [
            { text: 'Tabulate raw material distribution — calculate percentages: Agro 37.5%, Mineral 25%, Chemical 20.8%, Forest 12.5%,.' },
            { text: 'Tabulate scale distribution — Cottage/Micro (<₹25L): 75%, Small (₹25L–₹10Cr): 16.7%, Large (>₹10Cr): 8.3%.' },
            { text: 'Tabulate ownership — Private (proprietorship/partnership + pvt ltd): 83.3%, Public: 12.5%, Cooperative: 4.2%.' },
            { text: 'Tabulate product type — Consumer goods: 66.7%, Basic/Capital goods: 33.3%. Dominant: Consumer goods.' },
            { text: 'Interpret — District has a dispersed, labour-intensive, agro-forest based industrial structure typical of.', faded: true, blankAnswer: 'Industrial structure: Predominantly agro-based (37.5%),.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_14_003', title: 'The cotton textile industry is an.',
          scaffold: { problem: 'A new cotton mill is proposed in Adilabad (Telangana), a cotton-growing district.',
            steps: [
            { text: 'Identify raw-material advantage — Adilabad produces 4.5 lakh bales/year; ginning mills exist locally; cotton transport.' },
            { text: 'Assess market access — nearest port (Krishnapatnam) 450 km by road; no direct rail to major consumption centres (Delhi,.' },
            { text: 'Check power situation — Telangana industrial tariff ₹7.20/kWh with 4–6 hours daily unscheduled cuts; no gas pipeline;.' },
            { text: 'Labour and humidity — semi-arid climate (RH 40–50%) increases yarn breakage on high-speed looms; skilled textile labour.' },
            { text: 'Synthesize — raw-material saving ≈ ₹2/kg cotton, but market-access penalty + power downtime + humidification cost +.', faded: true, blankAnswer: 'The claim is incomplete; Adilabad suits ginning/pressing,.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_geo_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'Secondary Activities: Definition and Importance', spots: [
            { id: 's1', label: 'Secondary activities involve the processing', prompt: 'Which idea is this? — Secondary activities involve the processing of raw materials obtained from the primary.', answer: 'Secondary activities involve the processing', options: ['Secondary activities involve the processing', 'Manufacturing is the process of', 'Large-scale industries are manufacturing units', 'Agro-based industries are manufacturing industries'] },
            { id: 's2', label: 'Manufacturing is the process of', prompt: 'Which idea is this? — Manufacturing is the process of transforming raw materials extracted from the primary.', answer: 'Manufacturing is the process of', options: ['Manufacturing is the process of', 'Secondary activities involve the processing', 'Large-scale industries are manufacturing units', 'Agro-based industries are manufacturing industries'] },
            { id: 's3', label: 'Large-scale industries are manufacturing units', prompt: 'Which idea is this? — Large-scale industries are manufacturing units that employ a large workforce (typically.', answer: 'Large-scale industries are manufacturing units', options: ['Large-scale industries are manufacturing units', 'Secondary activities involve the processing', 'Manufacturing is the process of', 'Agro-based industries are manufacturing industries'] },
            { id: 's4', label: 'Agro-based industries are manufacturing industries', prompt: 'Which idea is this? — Agro-based industries are manufacturing industries that use agricultural products as raw.', answer: 'Agro-based industries are manufacturing industries', options: ['Agro-based industries are manufacturing industries', 'Secondary activities involve the processing', 'Manufacturing is the process of', 'Large-scale industries are manufacturing units'] },
            { id: 's5', label: 'The cotton textile industry is', prompt: 'Which idea is this? — The cotton textile industry is an agro-based industry that processes raw cotton into.', answer: 'The cotton textile industry is', options: ['The cotton textile industry is', 'Secondary activities involve the processing', 'Manufacturing is the process of', 'Large-scale industries are manufacturing units'] }
          ] } }
    ],
    explore: { component: C12_GeographyIndustriesAgrobasedSim, prompt: 'Explore the interactive — Secondary Activities: Definition and Importance' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_06_001', difficulty: 'standard',
          question: 'Secondary activities involve the processing of raw materials obtained from the.',
          hint: 'If unable to distinguish sectors, revisit Class 10 Economics chapter \'Sectors of the.',
          misconception: 'Students often equate \'secondary activities\' only with large factories (chimneys, assembly lines) and exclude.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary activities involve the processing of raw materials obtained from the primary',
                  options: ['Secondary activities involve the processing of raw materials obtained from the primary', 'Manufacturing is the process of transforming raw materials extracted from the primary', 'Large-scale industries are manufacturing units that employ a large workforce (typically', 'Agro-based industries are manufacturing industries that use agricultural products as raw'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate \'secondary activities\' only with large factories (chimneys, assembly lines) and exclude small-scale household.' }
          ],
            remediations: { 'students-often-equate-secondary-activities': { steps: ['Revisit Class 10 node c10_geo_cbse_06_001 (Manufacturing: Importance and Industrial Location Factors) — focus on the.', 'Create a three-column table: Primary / Secondary / Tertiary. List 5 local examples for each from your district (e.g.,.', 'For each secondary example, trace the raw material to its primary source and the final product to its tertiary seller.', 'Re-attempt Diagnostic Question 1 and 2. If confusion persists, watch the NCERT Class 12 Geography lecture on \'Secondary.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_06_002', difficulty: 'standard',
          question: 'Manufacturing is the process of transforming raw materials extracted from the.',
          hint: 'If stuck, revisit c10_geo_cbse_06_001 (Manufacturing: Importance and Industrial Location.',
          misconception: 'Students think "manufacturing = factory production" and equate it only with large-scale, machine-driven assembly lines.',
          parts: [
                { id: 'a', prompt: 'Define \'value addition\' in manufacturing and give one example each of a weight-losing industry and a weight-gaining industry.', answer: 'Value addition is the increase in economic value of a product at each stage of',
                  options: ['Value addition is the increase in economic value of a product at each stage of', 'textile is weight-losing', 'manufacturing = factory production'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "manufacturing = factory production" and equate it only with large-scale, machine-driven assembly lines.' },
                { id: 'b', prompt: 'A bauxite mine in Odisha produces 10 lakh tonnes/year of ore (Al₂O₃ content 45%). The alumina refinery extracts alumina (Al₂O₃) with 90% recovery.', answer: 'Step 1: Al₂O₃ in ore = 10,00,000 × 0.45 = 4,50,000 tonnes',
                  options: ['Step 1: Al₂O₃ in ore = 10,00,000 × 0.45 = 4,50,000 tonnes', 'manufacturing = factory production'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "manufacturing = factory production" and equate it only with large-scale, machine-driven assembly lines.' }
          ],
            remediations: { 'manufacturing-factory-production-and-equate': { steps: ['If the student cannot distinguish manufacturing from services or primary activities: (1) Revisit c12_geo_cbse_06_001.', 'no — wheat → flour is manufacturing), a vegetable vendor (tertiary — no transformation), a brick kiln (manufacturing —.', '(3) Draw a 3-column table: Activity | Input | Output | Value Added?', 'Complete for 10 local activities.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "manufacturing = factory production" and equate it only with large-scale, machine-driven assembly lines.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India\'s manufacturing share in GDP has stagnated at 15–17% because we export raw materials (iron ore, cotton) instead of processed.', answer: 'The statement is partially correct but oversimplified',
                  options: ['The statement is partially correct but oversimplified', 'colonial legacy', 'policy neglect', 'manufacturing = factory production'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "manufacturing = factory production" and equate it only with large-scale, machine-driven assembly lines.' }
          ],
            remediations: { 'manufacturing-factory-production-and-equate': { steps: ['If the student cannot distinguish manufacturing from services or primary activities: (1) Revisit c12_geo_cbse_06_001.', 'no — wheat → flour is manufacturing), a vegetable vendor (tertiary — no transformation), a brick kiln (manufacturing —.', '(3) Draw a 3-column table: Activity | Input | Output | Value Added?', 'Complete for 10 local activities.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_06_005', difficulty: 'standard',
          question: 'Large-scale industries are manufacturing units that employ a large workforce.',
          hint: 'If stuck, review the comparison table in c12_geo_cbse_06_004 and the Weberian factors in.',
          misconception: 'Students often equate "large-scale industry" **only with heavy industries** (iron & steel, cement) and forget that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Large-scale industries are manufacturing units that employ a large workforce (typically',
                  options: ['Large-scale industries are manufacturing units that employ a large workforce (typically', 'Secondary activities involve the processing of raw materials obtained from the primary', 'Manufacturing is the process of transforming raw materials extracted from the primary', 'Agro-based industries are manufacturing industries that use agricultural products as raw'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "large-scale industry" **only with heavy industries** (iron & steel, cement) and forget that **automobile,.' }
          ],
            remediations: { 'students-often-equate-large-scale': { steps: ['Revisit **c12_geo_cbse_06_004** (Small-Scale Industries) to sharpen the contrast table: capital, labour, technology,.', 'Open the latest **MSMED Act notification** (or PIB release) and note the current investment limits for.', 'On a map of India, mark **five large-scale industrial clusters** (Jamshedpur, Bhilai, Gurugram, Pune, Chennai) and.', 'Re-attempt Diagnostic Questions 3 and 4 after 24 hours.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_06_009', difficulty: 'standard',
          question: 'Agro-based industries are manufacturing industries that use agricultural.',
          hint: 'If unable to compute or interpret material index, revisit c12_geo_cbse_06_006 (Weber\'s.',
          misconception: 'Students treat all agro-based industries as uniformly "raw-material oriented" because textbooks list them together.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Agro-based industries are manufacturing industries that use agricultural products as raw',
                  options: ['Agro-based industries are manufacturing industries that use agricultural products as raw', 'Secondary activities involve the processing of raw materials obtained from the primary', 'Manufacturing is the process of transforming raw materials extracted from the primary', 'Large-scale industries are manufacturing units that employ a large workforce (typically'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat all agro-based industries as uniformly "raw-material oriented" because textbooks list them together.' }
          ],
            remediations: { 'students-treat-all-agro-based': { steps: ['Revisit c10_geo_cbse_06_002 (sugar industry location) and c11_geo_cbse_20_002 (cotton textile location) — create a.', 'On an outline map of India, plot three food processing clusters (Krishnagiri tomato, Anand dairy, Ratnagiri mango) and.', 'Re-attempt Diagnostic Question 2 and 4; if still incorrect, watch the 12-minute NPTEL lecture "Location of Agro-Based.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_14_001', difficulty: 'standard',
          question: 'Manufacturing is the process of transforming raw materials into finished goods.',
          hint: 'If stuck, review c11_geo_cbse_20_001 "Manufacturing: Importance and Factors Influencing.',
          misconception: 'Students confuse "agro-based" with "agriculture" — they classify sugar industry as "primary" because it uses sugarcane,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Manufacturing is the process of transforming raw materials into finished goods of higher',
                  options: ['Manufacturing is the process of transforming raw materials into finished goods of higher', 'Secondary activities involve the processing of raw materials obtained from the primary', 'Manufacturing is the process of transforming raw materials extracted from the primary', 'Large-scale industries are manufacturing units that employ a large workforce (typically'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse "agro-based" with "agriculture" — they classify sugar industry as "primary" because it uses sugarcane, not recognizing.' }
          ],
            remediations: { 'students-confuse-agro-based-with': { steps: ['Revisit c10_geo_cbse_06_001 (manufacturing definition) and c11_geo_cbse_20_001 (classification bases).', 'Make a 4-column table with the four classification bases as headers; fill in 10 industries from your district using.', 'For each industry, justify the classification in one sentence citing the specific criterion (e.g., "₹12 Cr investment →.', 'Re-attempt Diagnostic Question 3 with three new local industries.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_14_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse "agro-based" with "agriculture" — they classify sugar industry as "primary" because it uses sugarcane,.',
          parts: [
                { id: 'a', prompt: 'Design a classification flowchart for a new industry: "Bamboo furniture manufacturing unit in Tripura with ₹50 lakh investment, owned by a women\'s self-help.', answer: 'Flowchart decisions: 1',
                  options: ['Flowchart decisions: 1', 'agro-based', 'agriculture', 'primary'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse "agro-based" with "agriculture" — they classify sugar industry as "primary" because it uses sugarcane, not recognizing.' }
          ],
            remediations: { 'students-confuse-agro-based-with': { steps: ['Revisit c10_geo_cbse_06_001 (manufacturing definition) and c11_geo_cbse_20_001 (classification bases).', 'Make a 4-column table with the four classification bases as headers; fill in 10 industries from your district using.', 'For each industry, justify the classification in one sentence citing the specific criterion (e.g., "₹12 Cr investment →.', 'Re-attempt Diagnostic Question 3 with three new local industries.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_14_003', difficulty: 'standard',
          question: 'The cotton textile industry is an agro-based industry that processes raw cotton.',
          hint: 'If the material index logic feels shaky, re-work c10_geo_cbse_06_007 Example 2 (iron vs.',
          misconception: 'Students believe "cotton textile mills are located only where cotton grows" and therefore place all mills on a map in.',
          parts: [
                { id: 'a', prompt: 'Name the four major cotton textile industrial clusters in India and give one representative centre for each.', answer: '(1) Western Cluster – Mumbai/Ahmedabad, (2) Southern Cluster –',
                  options: ['Correct answer: (1) Western Cluster – Mumbai/Ahmedabad, (2) Southern Cluster –', 'Punjab', 'Haryana'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "cotton textile mills are located only where cotton grows" and therefore place all mills on a map in Maharashtra/Gujarat.' },
                { id: 'b', prompt: 'A mill in Coimbatore (Tamil Nadu) uses 60% locally grown cotton and 40% imported long-staple cotton.', answer: 'Step 1: Weighted cost = (0.60 × 55) + (0.40 × 120) = 33 + 48 = ₹81/kg',
                  options: ['Step 1: Weighted cost = (0.60 × 55) + (0.40 × 120) = 33 + 48 = ₹81/kg', 'imported cotton is better', 'cotton textile mills are located only where cotton grows'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "cotton textile mills are located only where cotton grows" and therefore place all mills on a map in Maharashtra/Gujarat.' }
          ],
            remediations: { 'cotton-textile-mills-are-located': { steps: ['Revisit c11_geo_cbse_18_006 (cotton crop distribution) and mark cotton-growing districts on a blank map.', 'Overlay actual mill locations from c12_geo_cbse_14_003 textbook map — observe mismatches (Coimbatore, Kolkata).', 'For each mismatch, write one locational pull factor (port, humidity, hydro-power, market).', 'Re-attempt Diagnostic Question 4. If still stuck, review Weber\'s material index in c10_geo_cbse_06_007.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
