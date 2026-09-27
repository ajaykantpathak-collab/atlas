import type { SimDef } from '../../engine/types';
import C12_GeoTransportCommunicationCBSESim from '../../../simulations/c6_12_new/C12_GeoTransportCommunicationCBSESim';

/** v3 wrapped master — C12_GeoTransportCommunicationCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_geotransportcommunicationcbsesim: SimDef = {
    id: 'v3w_c12_geotransportcommunicationcbsesim',
    title: 'Geo Transport Communication CBSE',
    subtitle: 'This node covers the conceptual definition of transport, its economic significance.',
    classLevel: 12, subject: 'science', topic: 'Transport: Definition and Importance in Economy',
    chapters: [],
    nodeIds: ['c12_geo_cbse_08_001', 'c12_geo_cbse_08_002', 'c12_geo_cbse_08_004', 'c12_geo_cbse_08_006', 'c12_geo_cbse_08_010', 'c12_geo_cbse_08_011', 'c12_geo_cbse_15_011', 'c12_geo_cbse_15_012', 'c12_geo_cbse_07_001', 'c12_geo_cbse_07_002', 'c12_geo_cbse_07_003', 'c12_geo_cbse_07_004', 'c12_geo_cbse_07_005', 'c12_geo_cbse_04_010', 'c12_geo_cbse_08_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine standing at a railway crossing in your town: a goods train loaded with coal from Jharkhand passes,.', goal: 'Master Geo Transport Communication CBSE.' },
    discovery: {
        question: 'A farmer in western Uttar Pradesh grows sugarcane. The nearest sugar mill is 40 km away by road, but the road is unpaved and becomes unusable in monsoon.',
        options: ['Correct answer: Implicit transport cost = ₹340 – ₹280 = ₹60/quintal', 'loss due to middlemen', 'transport importance = connectivity'],
        answer: 'Implicit transport cost = ₹340 – ₹280 = ₹60/quintal',
        hook: 'Students think "transport importance = connectivity" and write vague statements like "it connects places." The precise.',
    },
    teaching: [
        { title: 'Transport is the physical movement of.', text: 'Transport is the physical movement of people, goods, and services from one location to another using various modes (road, rail, water, air, pipeline) across space.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_geo_cbse_08_001', title: 'Transport is the physical movement of.',
          scaffold: { problem: 'A cement plant in Satna (Madhya Pradesh) sources limestone from a quarry 25 km away (by road) and sells cement to a distributor in Varanasi.',
            steps: [
            { text: 'Calculate annual road transport cost (Option A) = Rate × Distance × Annual Volume = ₹3.50 × 25 km × 4,000,000 tonnes =.' },
            { text: 'Calculate present value of Option A over 20 years at 10%: PV = Annual Cost × [1 - (1+r)^-n]/r = ₹35 cr × [1 -.' },
            { text: 'Calculate annual rail transport cost (Option B, excluding capital) = (Rate × Distance + Terminal) × Volume = (₹1.20 ×.' },
            { text: 'Present value of Option B operating cost = ₹44 cr × 8.5136 = ₹374.60 crore.' },
            { text: 'Compare: Option A PV = ₹297.98 crore; Option B PV = ₹494.60 crore.' },
            { text: 'Sensitivity check: At what volume does rail become cheaper? Set PV_A = PV_B → 3.50×25×V×8.5136 = 120 +.', faded: true, blankAnswer: 'Option A (road transport) minimizes present value cost at.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_08_002', title: 'Land transport comprises roadways and.',
          scaffold: { problem: 'A logistics manager must move 5,000 tonnes of cement monthly from a plant in Satna (Madhya Pradesh) to a depot in Varanasi (Uttar Pradesh),.',
            steps: [
            { text: 'Identify the geographical context — Satna to Varanasi is 320 km on the North Central Railway zone (BG), connecting.' },
            { text: 'Recall the cost structure — Rail has low variable cost (₹/tonne-km) but high fixed terminal cost (loading/unloading,.' },
            { text: 'Calculate rail cost per trip — One rake = 58 × 68 = 3,944 tonnes.' },
            { text: 'Calculate road cost — 5,000 t ÷ 25 t/truck = 200 truck trips/month. Road cost = 5,000 t × 320 km × ₹2.80 = ₹4,48,00,000.' },
            { text: 'Compare and interpret — Rail saves ₹66,43,360/month (14.8% cheaper).', faded: true, blankAnswer: 'Rail: ₹3.82 crore/month; Road: ₹4.48 crore/month. Rail.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_08_004', title: 'Air transport is the movement of.',
          scaffold: { problem: 'A company in Mumbai wants to transport 500 tonnes of perishable mangoes (Alphonso) to Dubai.',
            steps: [
            { text: 'Calculate total transport cost per kg for each mode.' },
            { text: 'Calculate total revenue per kg (selling price).' },
            { text: 'Calculate profit per kg = revenue - transport cost (ignore other costs for simplicity).' },
            { text: 'Consider perishability: mangoes shelf life ~10 days. Sea transit 7 days leaves 3 days for sale; air transit <1 day.' },
            { text: 'Factor in risk of spoilage: sea has higher spoilage risk (assume 10% loss), air 2% loss. Adjust effective revenue.' },
            { text: 'Compare net profit per kg and total for 500 tonnes.', faded: true, blankAnswer: 'Air freight cost = ₹120/kg; Sea freight cost = ₹15/kg..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_08_006', title: 'Major trans-continental highways are.',
          scaffold: { problem: 'A logistics firm wants to ship machinery from Rotterdam (Netherlands) to Shanghai (China) by road.',
            steps: [
            { text: 'Identify the highway corridor — European route E30 connects to Asian Highway AH6 (Trans-Siberian) at the.' },
            { text: 'Measure map distance: Rotterdam to Moscow ≈ 2,500 km; Moscow to Vladivostok ≈ 9,300 km; Vladivostok to Shanghai (by.' },
            { text: 'List physical barriers: (a) Ural Mountains (Europe–Asia divide), (b) West Siberian Plain (vast wetlands, permafrost in.' },
            { text: 'Note seasonal constraints: permafrost thaw in summer reduces load capacity; winter ice roads supplement but are.' },
            { text: 'Conclude that while feasible, rail (Trans-Siberian Railway) is preferred for heavy machinery due to lower cost and.', faded: true, blankAnswer: 'Approximate road distance 13,000 km; major barriers: Ural.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_08_010', title: 'Internet and Digital Communication.',
          scaffold: { problem: 'A startup in Jharkhand\'s Ranchi wants to offer telemedicine to villages in Simdega district (150 km away, hilly, 40% forest cover).',
            steps: [
            { text: 'Identify the bottleneck — last-mile 4G congestion, not backhaul (hospital has fiber).' },
            { text: 'Propose dedicated spectrum — use CBRS (Citizens Broadband Radio Service) or unlicensed 5 GHz for point-to-multipoint.' },
            { text: 'Calculate link budget — 5 GHz PtMP with 23 dBm EIRP, 15 km range, 20 MHz channel → ~100 Mbps aggregate capacity (using.' },
            { text: 'Address power — solar + battery at each village CPE (Customer Premises Equipment) since grid is unreliable.' },
            { text: 'Institutional model — partner with NHM (National Health Mission) for sustainability; train ASHA workers as digital.', faded: true, blankAnswer: 'Hybrid architecture: Fiber backhaul to hospital → PtMP 5.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_08_011', title: 'Transport and communication systems act.',
          caseStudy: { intro: 'Observe a smartphone in your hand: its components were designed in California, fabricated in Taiwan, assembled in China using rare earths from Australia and.',
            decisions: [{ prompt: '**REMEMBER level**: Name the two major undersea fibre-optic cable landing stations on India\'s west coast and two on the east coast that.', options: [
                { text: '**Correct answer**: West coast', outcome: '**Correct answer**: West coast — Mumbai (multiple cables: SEA-ME-WE 3, 4, 5; I-ME-WE; TIC; EIG,.' },
                { text: 'Mumbai and Chennai', outcome: 'Not quite — **Students think "globalisation = internet" and believe physical transport (ships, rail, trucks) is.', reveals: 'students-think-globalisation-internet-and' },
                { text: 'Bengaluru', outcome: 'Not quite — **Students think "globalisation = internet" and believe physical transport (ships, rail, trucks) is.', reveals: 'students-think-globalisation-internet-and' }
            ] }] } }
    ],
    explore: { component: C12_GeoTransportCommunicationCBSESim, prompt: 'Explore the interactive — Geo Transport Communication CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_001', difficulty: 'standard',
          question: 'Transport is the physical movement of people, goods, and services from one.',
          hint: 'If stuck on "why transport matters economically," revisit Class 11 node.',
          misconception: 'Students think "transport importance = connectivity" and write vague statements like "it connects places." The precise.',
          parts: [
                { id: 'a', prompt: 'A farmer in western Uttar Pradesh grows sugarcane. The nearest sugar mill is 40 km away by road, but the road is unpaved and becomes unusable in monsoon.', answer: 'Implicit transport cost = ₹340 – ₹280 = ₹60/quintal',
                  options: ['Correct answer: Implicit transport cost = ₹340 – ₹280 = ₹60/quintal', 'loss due to middlemen', 'transport importance = connectivity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "transport importance = connectivity" and write vague statements like "it connects places." The precise geographical error:.' },
                { id: 'b', prompt: 'Compare the economic role of the Golden Quadrilateral (NHAI highway network) with the Dedicated Freight Corridor (DFC) railway.', answer: 'The DFC contributes more to manufacturing competitiveness',
                  options: ['Correct answer: The DFC contributes more to manufacturing competitiveness', 'highways are better', 'transport importance = connectivity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "transport importance = connectivity" and write vague statements like "it connects places." The precise geographical error:.' }
          ],
            remediations: { 'transport-importance-connectivity-and-write': { steps: ['If the student cannot articulate the economic role beyond "connectivity": (1) Revisit Class 11 node c11_geo_cbse_21_001.', '(2) Draw a simple diagram: Resource region → Transport link → Market region.', 'Label "high transport cost" and "low transport cost" arrows; write the effect on price gap and trade volume.', '(3) Re-attempt Diagnostic Question 3 (farmer example) with a different crop (e.g., milk in Gujarat) to internalize.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "transport importance = connectivity" and write vague statements like "it connects places." The precise.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Inland water transport is the cheapest mode, so India should shift all bulk freight from rail to rivers." Consider at least three.', answer: 'Correct evaluation: The statement is flawed',
                  options: ['Correct evaluation: The statement is flawed', 'transport importance = connectivity', 'it connects places'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "transport importance = connectivity" and write vague statements like "it connects places." The precise geographical error:.' },
                { id: 'b', prompt: 'Compare the economic role of the Golden Quadrilateral (NHAI highway network) with the Dedicated Freight Corridor (DFC) railway.', answer: 'The DFC contributes more to manufacturing competitiveness',
                  options: ['Correct answer: The DFC contributes more to manufacturing competitiveness', 'highways are better', 'transport importance = connectivity', 'it connects places'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "transport importance = connectivity" and write vague statements like "it connects places." The precise geographical error:.' }
          ],
            remediations: { 'transport-importance-connectivity-and-write': { steps: ['If the student cannot articulate the economic role beyond "connectivity": (1) Revisit Class 11 node c11_geo_cbse_21_001.', '(2) Draw a simple diagram: Resource region → Transport link → Market region.', 'Label "high transport cost" and "low transport cost" arrows; write the effect on price gap and trade volume.', '(3) Re-attempt Diagnostic Question 3 (farmer example) with a different crop (e.g., milk in Gujarat) to internalize.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_002', difficulty: 'standard',
          question: 'Land transport comprises roadways and railways that move people and goods over.',
          hint: 'If road hierarchy is fuzzy: Revisit c10_geo_cbse_07_002 and draw the 5-level pyramid with.',
          misconception: 'Students think "National Highways are the widest/best roads" and "Railways are always cheaper than roads." Reality: (1).',
          parts: [
                { id: 'a', prompt: 'A student sees "NH-44" on a map. What does the "NH" prefix indicate, and which authority is responsible for its construction and maintenance?', answer: 'Correct: NH = National Highway',
                  options: ['Correct: NH = National Highway', 'State PWD', 'District Administration'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "National Highways are the widest/best roads" and "Railways are always cheaper than roads." Reality: (1) NH width varies.' },
                { id: 'b', prompt: 'A freight consignment of 2,500 tonnes of coal must move from Jharsuguda (Odisha) to Tuticorin (Tamil Nadu).', answer: 'Step 1: Railway capacity per rake = 58 wagons × 68 t = 3,944 tonnes',
                  options: ['Step 1: Railway capacity per rake = 58 wagons × 68 t = 3,944 tonnes', '2,500/68 = 37 wagons', 'National Highways are the widest/best roads'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "National Highways are the widest/best roads" and "Railways are always cheaper than roads." Reality: (1) NH width varies.' },
                { id: 'c', prompt: 'Compare the Konkan Railway (Roha–Thokur) and the Himalayan Railway (Jammu–Baramulla–Srinagar) on THREE parameters: gauge, terrain challenge, and strategic.', answer: 'Correct: | Parameter | Konkan Railway | Himalayan Railway (USBRL) |',
                  options: ['Correct: | Parameter | Konkan Railway | Himalayan Railway (USBRL) |', 'BG is faster', 'BG is cheaper to build'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "National Highways are the widest/best roads" and "Railways are always cheaper than roads." Reality: (1) NH width varies.' }
          ],
            remediations: { 'national-highways-are-the-widest': { steps: ['If student confuses road hierarchy: Draw a 5-level pyramid on paper — NH (top, 1.5 lakh km), SH (2nd, 1.8 lakh km), MDR.', 'Label each with: Authority (NHAI/PWD/ZP), Funding (Central/State/District), Typical width, Function.', 'Then take a 50 km journey on Google Maps from your town to nearest city — trace the road categories you travel on.', 'If student thinks rail always cheaper: Calculate cost for 3 scenarios using ₹/tonne-km: (a) Coal 1,000 km, 3,000 t; (b).'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "National Highways are the widest/best roads" and "Railways are always cheaper than roads." Reality: (1).',
          parts: [
                { id: 'a', prompt: 'Evaluate: "Converting all Metre Gauge (MG) and Narrow Gauge (NG) lines to Broad Gauge (BG) under Project Unigauge is always economically justified." Use the.', answer: 'Correct evaluation: NOT always justified',
                  options: ['Correct evaluation: NOT always justified', 'yes, BG is better', 'Project Unigauge critique', 'National Highways are the widest/best roads'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "National Highways are the widest/best roads" and "Railways are always cheaper than roads." Reality: (1) NH width varies.' }
          ],
            remediations: { 'national-highways-are-the-widest': { steps: ['If student confuses road hierarchy: Draw a 5-level pyramid on paper — NH (top, 1.5 lakh km), SH (2nd, 1.8 lakh km), MDR.', 'Label each with: Authority (NHAI/PWD/ZP), Funding (Central/State/District), Typical width, Function.', 'Then take a 50 km journey on Google Maps from your town to nearest city — trace the road categories you travel on.', 'If student thinks rail always cheaper: Calculate cost for 3 scenarios using ₹/tonne-km: (a) Coal 1,000 km, 3,000 t; (b).'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_004', difficulty: 'standard',
          question: 'Air transport is the movement of passengers and cargo by aircraft (airplanes,.',
          hint: 'If stuck, review the comparison table of transport modes from Class 10 Chapter 7.',
          misconception: 'Students often think pipelines are only for oil and gas, and forget they also transport water, slurry (coal, iron ore),.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Air transport is the movement of passengers and cargo by aircraft (airplanes,',
                  options: ['Air transport is the movement of passengers and cargo by aircraft (airplanes,', 'Transport is the physical movement of people, goods, and services from one location to', 'Land transport comprises roadways and railways that move people and goods over the', 'Major trans-continental highways are long-distance, high-standard road networks that'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think pipelines are only for oil and gas, and forget they also transport water, slurry (coal, iron ore), and even milk.' }
          ],
            remediations: { 'pipelines-are-only-for-oil': { steps: ['Revisit Class 10 node c10_geo_cbse_07_004 (Pipelines) and c10_geo_cbse_07_006 (Airways) for basic definitions.', 'Review Class 11 nodes c11_geo_cbse_21_005 and c11_geo_cbse_21_006 for Indian networks.', 'Create a comparison table: parameters (speed, cost, capacity, commodity type, environmental impact) for air vs pipeline.', 'Practice map work: locate major airports (Delhi, Mumbai, Chennai, Kolkata, Bengaluru, Hyderabad) and pipeline networks.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_006', difficulty: 'standard',
          question: 'Major trans-continental highways are long-distance, high-standard road networks.',
          hint: 'Review world physical maps (Class 6–8) and the core-periphery model from Class 12 Human.',
          misconception: 'Students often think the Pan-American Highway is a single, continuous, paved road from Prudhoe Bay (Alaska) to Ushuaia.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Major trans-continental highways are long-distance, high-standard road networks that',
                  options: ['Major trans-continental highways are long-distance, high-standard road networks that', 'Transport is the physical movement of people, goods, and services from one location to', 'Land transport comprises roadways and railways that move people and goods over the', 'Air transport is the movement of passengers and cargo by aircraft (airplanes,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Pan-American Highway is a single, continuous, paved road from Prudhoe Bay (Alaska) to Ushuaia (Argentina).' }
          ],
            remediations: { 'the-pan-american-highway-is': { steps: ['Open a political world map and physically trace the Pan-American Highway from Alaska to Argentina; mark the Darién Gap.', 'Watch a 5-minute documentary clip on the Darién Gap (e.g., BBC “World’s Most Dangerous Road”) to visualise the.', 'Re-draw the route on a blank outline map, labelling the gap and noting “ferry/ship required.” 4.', 'Re-attempt Diagnostic Question 2.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Pan-American Highway is a single, continuous, paved road from Prudhoe Bay (Alaska) to Ushuaia.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: “Highway 1 in Australia is a true trans-continental highway because it circles the entire continent.” Justify your answer with.', answer: 'The statement is misleading',
                  options: ['The statement is misleading', 'long coastal road', 'trans-continental corridor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Pan-American Highway is a single, continuous, paved road from Prudhoe Bay (Alaska) to Ushuaia (Argentina).' }
          ],
            remediations: { 'the-pan-american-highway-is': { steps: ['Open a political world map and physically trace the Pan-American Highway from Alaska to Argentina; mark the Darién Gap.', 'Watch a 5-minute documentary clip on the Darién Gap (e.g., BBC “World’s Most Dangerous Road”) to visualise the.', 'Re-draw the route on a blank outline map, labelling the gap and noting “ferry/ship required.” 4.', 'Re-attempt Diagnostic Question 2.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_010', difficulty: 'standard',
          question: 'Internet and Digital Communication Networks refer to the interconnected global.',
          hint: 'If stuck on "why fiber doesn\'t reach every village", revisit c12_geo_cbse_08_008.',
          misconception: 'Students equate "internet penetration" with "broadband subscription" and assume urban-rural gap is only about.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Internet and Digital Communication Networks refer to the interconnected global',
                  options: ['Internet and Digital Communication Networks refer to the interconnected global', 'Transport is the physical movement of people, goods, and services from one location to', 'Land transport comprises roadways and railways that move people and goods over the', 'Air transport is the movement of passengers and cargo by aircraft (airplanes,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "internet penetration" with "broadband subscription" and assume urban-rural gap is only about affordability.' }
          ],
            remediations: { 'students-equate-internet-penetration-with': { steps: ['Revisit c12_geo_cbse_08_008 (Personal vs Mass Communication) to recall the hierarchy: personal → mass → digital.', 'On a map of India, plot submarine cable landing stations (Mumbai, Chennai, Kochi, Tuticorin, Thiruvananthapuram) and.', 'Use TRAI\'s "MySpeed" app data (publicly available) to compare median download speeds in your district vs a metro —.', 'Re-attempt Diagnostic Question 3 with a new location (e.g., Lakshadweep vs Gujarat) to internalize the physics of.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_011', difficulty: 'standard',
          question: 'Transport and communication systems act as the circulatory and nervous systems.',
          hint: 'If stuck on modal choice (ship vs rail vs air), revisit **c12_geo_cbse_08_003** (Water.',
          misconception: '**Students think "globalisation = internet" and believe physical transport (ships, rail, trucks) is becoming less.',
          parts: [
                { id: 'a', prompt: '**REMEMBER level**: Name the two major undersea fibre-optic cable landing stations on India\'s west coast and two on the east coast that carry the bulk of.', answer: '**Correct answer**: West coast',
                  options: ['**Correct answer**: West coast', 'Mumbai and Chennai', 'Bengaluru'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students think "globalisation = internet" and believe physical transport (ships, rail, trucks) is becoming less important because.' },
                { id: 'b', prompt: '**APPLY level**: A garment exporter in Tiruppur (Tamil Nadu) ships 500 TEUs (twenty-foot equivalent units) of cotton knitwear monthly to Los Angeles via JNPT.', answer: '**Correct working**: Step 1: Daily demand = 500/30 = 16.67 TEU/day',
                  options: ['**Correct working**: Step 1: Daily demand = 500/30 = 16.67 TEU/day', 'globalisation = internet', 'everything is digital now'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students think "globalisation = internet" and believe physical transport (ships, rail, trucks) is becoming less important because.' }
          ],
            remediations: { 'students-think-globalisation-internet-and': { steps: ['**Step 1**: Revisit the smartphone component journey in the Walkthrough.', 'Physically trace *each* component on a world map (use an atlas or Google Earth) — mark the mine, factory, port, cable.', '**Step 2**: Review **c12_geo_cbse_08_003** (Water Transport) and **c12_geo_cbse_08_010** (Internet and Digital.', 'Make a two-column table: "What moves by ship/cable?" vs.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Students think "globalisation = internet" and believe physical transport (ships, rail, trucks) is becoming less.',
          parts: [
                { id: 'a', prompt: '**EVALUATE level**: "India\'s push for \'Digital Public Infrastructure\' (Aadhaar, UPI, DigiLocker, ONDC) is a communication revolution that will do more for.', answer: '**Correct critique**: The statement is *partially true but incomplete*',
                  options: ['**Correct critique**: The statement is *partially true but incomplete*', 'digital makes distance irrelevant', 'physical ports are all that matters', 'globalisation = internet'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students think "globalisation = internet" and believe physical transport (ships, rail, trucks) is becoming less important because.' }
          ],
            remediations: { 'students-think-globalisation-internet-and': { steps: ['**Step 1**: Revisit the smartphone component journey in the Walkthrough.', 'Physically trace *each* component on a world map (use an atlas or Google Earth) — mark the mine, factory, port, cable.', '**Step 2**: Review **c12_geo_cbse_08_003** (Water Transport) and **c12_geo_cbse_08_010** (Internet and Digital.', 'Make a two-column table: "What moves by ship/cable?" vs.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
