import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch11_p1: SimDef = {
    id: 'v3_c12_geo_ch11_p1',
    title: 'Land Resources and Agriculture · Part 1/2',
    subtitle: 'Forests grew on paper while shrinking on the ground',
    classLevel: 12, subject: 'geography', topic: 'Land Resources and Agriculture · Part 1/2',
    chapters: ['c12_geo_ch11'],
    nodeIds: ['c12_geo_cbse_11_001', 'c12_geo_cbse_11_002', 'c12_geo_cbse_11_003', 'c12_geo_cbse_11_004', 'c12_geo_cbse_11_005', 'c12_geo_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Land-use analyst', intro: 'Every village patwari keeps nine ledgers for the same soil. Learn to read what each column really measures.', goal: 'Master India\'s nine land-use categories, the reporting-vs-geographical-area distinction, and 70 years of land-use change.' },
    discovery: {
        question: 'India\'s records show forest land \'increasing\' since 1950 — but satellites keep reporting shrinking green cover. Which is lying?',
        options: ['Neither — revenue records count legally notified forest area, which grew by demarcation; satellite data counts actual tree canopy. Different measures, different truths', 'The satellites are lying', 'The records are lying', 'Forests really are growing'],
        answer: 'Neither — revenue records count legally notified forest area, which grew by demarcation; satellite data counts actual tree canopy. Different measures, different truths',
        hook: 'Two more denominator traps: \'reporting area\' is whatever land revenue surveyed — not India\'s fixed geographical area — and \'net area sown\' rose while total cultivable land fell, meaning the farm belt is intensifying, not expanding. Fallows and culturable waste are shrinking for the same reason: pressure.',
    },
    teaching: [
        { title: 'Land Resources in India: Utilisation Pattern and Categories', text: 'Land use categories are the nine-fold classification of India\'s reporting area maintained in land revenue records, including forests, barren and wastelands, non-agricultural uses, permanent pastures.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_11_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Audit India\'s land ledger: read the nine-fold classification across 70 years, compute cropping intensity, and explain where all the spare land went.',
        labels: ['Land Resources in India', 'Land Use Changes', 'Common Property Resources: Concept', 'Agriculture in India: Importance', 'Cropping Seasons in India', 'Major Food Crops: Rice'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_11_001', title: 'Land Resources in India: Utilisation Pattern and Categories',
          scaffold: { problem: 'A district has reporting area 500,000 ha. Land revenue records show: Forest 75,000 ha, Barren/Wasteland 30,000 ha, Non-agricultural 60,000.',
            steps: [
            { text: 'Sum all given categories except NSA: 75,000 + 30,000 + 60,000 + 25,000 + 15,000 + 40,000 + 35,000 + 20,000 = 300,000 ha.' },
            { text: 'Reporting area = sum of all nine categories = 500,000 ha. So NSA = 500,000 – 300,000 = 200,000 ha.' },
            { text: 'Verify NSA % = (200,000 / 500,000) × 100 = 40% (plausible, near national 45.6%).' },
            { text: 'Cropping Intensity = (GCA / NSA) × 100 = (380,000 / 200,000) × 100 = 190%.' },
            { text: 'Interpret: CI > 100% means double cropping; 190% implies near triple cropping on irrigated parts — high intensity.', faded: true, blankAnswer: 'Net Area Sown = 200,000 ha; Cropping Intensity = 190%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_11_002', title: 'Land Use Changes in India: Trends and Implications',
          scaffold: { problem: 'In a state, reporting area is 50 lakh hectares. In 1950–51, net sown area was 41.7% of reporting area; in 2019–20 it is 45.6%.',
            steps: [
            { text: 'Identify reporting area = 50,00,000 ha (fixed for the calculation).' },
            { text: 'Compute 1950–51 net sown area = 41.7% × 50,00,000 = 20,85,000 ha.' },
            { text: 'Compute 2019–20 net sown area = 45.6% × 50,00,000 = 22,80,000 ha.' },
            { text: 'Absolute increase in net sown area = 22,80,000 – 20,85,000 = 1,95,000 ha.' },
            { text: 'Compute 1950–51 culturable wasteland = 8.0% × 50,00,000 = 4,00,000 ha.' },
            { text: 'Compute 2019–20 culturable wasteland = 3.9% × 50,00,000 = 1,95,000 ha.' },
            { text: 'Absolute decrease in culturable wasteland = 4,00,000 – 1,95,000 = 2,05,000 ha.' },
            { text: 'Percentage of wasteland loss converted to net sown = (1,95,000 / 2,05,000) × 100 = 95.1%.', faded: true, blankAnswer: '(a) 1,95,000 ha; (b) 2,05,000 ha; (c) 95.1% of the.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_11_003', title: 'Common Property Resources: Concept and Significance',
          caseStudy: { intro: 'Imagine walking through a village in Rajasthan: you see a shared pond where cattle drink, a patch of grassland where goats graze, and a small forest where.',
            decisions: [{ prompt: 'Define Common Property Resources (CPRs) and give two examples from rural India.', options: [
                { text: 'CPRs are community natural resources where every member has access and usage rights with', outcome: 'CPRs are community natural resources where every member has access and usage rights with.' },
                { text: 'government-owned forest only', outcome: 'Not quite — Students often think CPRs are the same as “government wastelands” or “open-access resources” where.', reveals: 'cprs-are-the-same-as' },
                { text: 'open access with no rules', outcome: 'Not quite — Students often think CPRs are the same as “government wastelands” or “open-access resources” where.', reveals: 'cprs-are-the-same-as' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_11_004', title: 'Agriculture in India: Importance in Economy and Employment',
          scaffold: { problem: 'Using the data from Table 3.1 (NCERT), calculate the percentage point change in the share of Net Area Sown in total cultivable land between.',
            steps: [
            { text: 'From Table 3.1, Net Area Sown as % of total cultivable land: 1950-51 = 70.0%, 2019-20 = 79.0%.' },
            { text: 'Net Area Sown as % of reporting area: 1950-51 = 41.7%, 2019-20 = 45.6%. Absolute increase = 3.9 percentage points.' },
            { text: 'CAGR formula: (End Value / Start Value)^(1/n) - 1. Here n = 2019-20 - 1950-51 = 69 years.' },
            { text: 'CAGR = (45.6 / 41.7)^(1/69) - 1 = (1.0935)^(0.01449) - 1 ≈ 1.00128 - 1 = 0.00128 = 0.128% per annum.' },
            { text: 'Interpretation: Net sown area expanded very slowly (0.13%/yr) — confirming NCERT\'s "scope for bringing additional land.', faded: true, blankAnswer: 'Share in cultivable land rose 9 percentage points (70% →.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_11_005', title: 'Cropping Seasons in India: Kharif, Rabi and Zaid Crops',
          scaffold: { problem: 'A farmer in Bikaner (Rajasthan) has 5 ha of sandy loam soil, tubewell irrigation (depth 80 m, discharge 2 l/s), and wants to maximise.',
            steps: [
            { text: 'Identify Bikaner\'s climate — arid, SW Monsoon onset ~15 July, withdrawal ~15 Sept; annual rainfall <300 mm; winter min.' },
            { text: 'Kharif window (Jul–Oct): Only 90 rainfed days. Choose Pearl Millet (Bajra) — 75-day variety, sown 20 Jul, harvested 15.' },
            { text: 'Rabi window (Nov–Mar): 150 days, cool (10–25°C), low evaporation. Choose Mustard (110-day) + Wheat (120-day) intercrop.' },
            { text: 'Zaid window (Apr–Jun): 60 days, extreme heat (40–48°C), high ET₀ (>10 mm/day). Only feasible with high irrigation.' },
            { text: 'Verify water budget — total irrigation = 2×30 + 4×60 + 2×40 = 380 mm ≈ 1,900 m³/ha.', faded: true, blankAnswer: 'Kharif — Bajra (20 Jul–15 Oct); Rabi — Mustard+Wheat.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_11_006', title: 'Major Food Crops: Rice and Wheat (Distribution and Conditions)',
          caseStudy: { intro: 'Start by observing your daily meal: a plate of rice (common in the south/east) and wheat roti (common in the north).',
            decisions: [{ prompt: 'Name the two Indian states that are the largest producers of rice and the two largest producers of wheat, according to the latest NCERT.', options: [
                { text: 'Correct answer: Rice', outcome: 'Correct answer: Rice — West Bengal and Uttar Pradesh; Wheat — Uttar Pradesh and Madhya Pradesh.' },
                { text: 'Punjab for rice or Bihar for wheat', outcome: 'Not quite — Students often think rice *only* grows in high-rainfall areas (like West Bengal) and wheat *only*.', reveals: 'rice-only-grows-in-high' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a journalism internship, your editor drafts a celebratory headline: \'India\'s forests grew from 14% to 24% — green cover nearly doubled since 1950.\' The source is a land-revenue statistics table, not satellite imagery.',
            decisions: [{ prompt: 'What correction does the land-use chapter require before publishing?', options: [
                { text: 'Reframe it — \'area under forest\' in revenue records means legally notified forest land, not measured tree canopy; the rise reflects administrative reclassification while actual forest cover may have stagnated or degraded.', outcome: 'The chapter drills exactly this trap: legal category and physical cover are different variables, and the revenue table answers \'how much land is reserved for forests\', not \'how much forest exists\'.' },
                { text: 'Run it — a 10-point rise in the official statistics is a solid story either way.', outcome: 'The number is real but the claim isn\'t: notified area grew while satellite-measured cover tells a different story, so the headline converts a bookkeeping change into an ecological claim.', reveals: 'records-equal-reality' },
                { text: 'Flip the headline to \'net sown area rose, so farmland is not scarce\' — land-use data is too ambiguous for forest claims anyway.', outcome: 'That makes the opposite error: net sown area grew by drawing down culturable wasteland and fallows — the cultivable stock shrank even as the cropped share rose, which is why the chapter pushes land-saving technology.', reveals: 'sown-rise-means-abundance' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read land-use statistics like a revenue officer — knowing the difference between land that\'s legal, land that\'s mapped, and land that\'s green.',
            decisions: [{ prompt: 'What comes next? Land Resources and Agriculture · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Land Resources and Agriculture · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_11_001', difficulty: 'standard',
          question: 'Land use categories are the nine-fold classification of India\'s reporting area.',
          hint: 'Revisit c11_geo_cbse_18_001 (Land Resources: Utilisation Pattern in India) and.',
          misconception: 'Students think "current fallow" and "fallow other than current fallow" are just "fallow land" — they miss the critical.',
          parts: [
                { id: 'a', prompt: 'Define "reporting area" and explain how it differs from "geographical area" in the context of Indian land use statistics.', answer: 'Reporting area is the total area for',
                  options: ['Reporting area is the total area for', 'they are the same', 'current fallow', 'fallow other than current fallow'],
                  hint: 'Revisit c11_geo_cbse_18_001 (Land Resources: Utilisation Pattern in India) and c10_geo_cbse_01_009.',
                  misconception: 'Students think "current fallow" and "fallow other than current fallow" are just "fallow land" — they miss the critical 1-year and 5-year.' },
                { id: 'b', prompt: 'Using Table 3.1, calculate the actual increase and rate of increase (simple growth rate) for Net Area Sown between 1950–51 and 2019–20. Show steps.', answer: 'Step 1: Identify values',
                  options: ['Step 1: Identify values', 'current fallow', 'fallow other than current fallow', 'fallow land'],
                  hint: 'Revisit c11_geo_cbse_18_001 (Land Resources: Utilisation Pattern in India) and c10_geo_cbse_01_009.',
                  misconception: 'Students think "current fallow" and "fallow other than current fallow" are just "fallow land" — they miss the critical 1-year and 5-year.' },
                { id: 'c', prompt: 'Compare the trends of "Culturable Wasteland" and "Fallow other than Current Fallow" between 1950–51 and 2019–20. Explain the common driver for their decline.', answer: 'Both declined: Culturable Wasteland 8.0% → 3.9%',
                  options: ['Both declined: Culturable Wasteland 8.0% → 3.9%', 'climate change', 'soil erosion', 'current fallow'],
                  hint: 'Revisit c11_geo_cbse_18_001 (Land Resources: Utilisation Pattern in India) and c10_geo_cbse_01_009.',
                  misconception: 'Students think "current fallow" and "fallow other than current fallow" are just "fallow land" — they miss the critical 1-year and 5-year.' }
          ],
            remediations: { 'current-fallow-and-fallow-other': { steps: ['Draw a timeline on paper: 0 years (current fallow) → 1–5 years (fallow other than current fallow) → >5 years.', 'Re-read NCERT definitions (i)–(ix) aloud, highlighting the time thresholds.', 'Take Appendix Table (vi) data for your state, classify each year\'s fallow into the three sub-categories, plot trends.', 'Explain to a peer why a 3-year fallow is NOT culturable wasteland.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "current fallow" and "fallow other than current fallow" are just "fallow land" — they miss the critical.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Increasing cropping intensity is the only viable strategy for India to raise agricultural output given limited scope for expanding net.', answer: 'Partially true but incomplete',
                  options: ['Partially true but incomplete', 'current fallow', 'fallow other than current fallow', 'fallow land'],
                  hint: 'Revisit c11_geo_cbse_18_001 (Land Resources: Utilisation Pattern in India) and c10_geo_cbse_01_009.',
                  misconception: 'Students think "current fallow" and "fallow other than current fallow" are just "fallow land" — they miss the critical 1-year and 5-year.' },
                { id: 'b', prompt: 'Design a land use plan for a hypothetical 1000-ha village in semi-arid Rajasthan (annual rainfall 60 cm) that maximizes livelihood security for landless.', answer: 'Good answer allocates: (1) 200 ha permanent pasture (CPR for livestock/fodder',
                  options: ['Good answer allocates: (1) 200 ha permanent pasture (CPR for livestock/fodder', 'current fallow', 'fallow other than current fallow', 'fallow land'],
                  hint: 'Revisit c11_geo_cbse_18_001 (Land Resources: Utilisation Pattern in India) and c10_geo_cbse_01_009.',
                  misconception: 'Students think "current fallow" and "fallow other than current fallow" are just "fallow land" — they miss the critical 1-year and 5-year.' }
          ],
            remediations: { 'current-fallow-and-fallow-other': { steps: ['Draw a timeline on paper: 0 years (current fallow) → 1–5 years (fallow other than current fallow) → >5 years.', 'Re-read NCERT definitions (i)–(ix) aloud, highlighting the time thresholds.', 'Take Appendix Table (vi) data for your state, classify each year\'s fallow into the three sub-categories, plot trends.', 'Explain to a peer why a 3-year fallow is NOT culturable wasteland.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_11_002', difficulty: 'standard',
          question: 'Land use change in India refers to the shifting proportional allocation of the.',
          hint: 'Revisit c12_geo_cbse_11_001 (Land Resources in India: Utilisation Pattern) and.',
          misconception: 'Students treat "reporting area" and "geographical area" as interchangeable.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Land use change in India refers to the shifting proportional allocation of the country\'s',
                  options: ['Land use change in India refers to the shifting proportional allocation of the country\'s', 'Land use categories are the nine-fold classification of India\'s reporting area maintained', 'Common Property Resources (CPRs) are community-owned natural resources where every member', 'Agriculture in India is a land-based primary economic activity that contributes'],
                  hint: 'Revisit c12_geo_cbse_11_001 (Land Resources in India: Utilisation Pattern) and c11_geo_cbse_18_002.',
                  misconception: 'Students treat "reporting area" and "geographical area" as interchangeable.' }
          ],
            remediations: { 'students-treat-reporting-area-and': { steps: ['Re-read the textbook\'s first two paragraphs under "Land Use Categories" — highlight the sentences "area under actual.', 'On a blank India outline map, shade the *notified* forest area of your state (from State Forest Report) vs the *actual*.', 'Re-attempt Diagnostic Q2 and Q4; if still stuck, revisit c11_geo_cbse_14_007 (Forest Cover in India: Distribution and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_11_003', difficulty: 'standard',
          question: 'Common Property Resources (CPRs) are community-owned natural resources where.',
          hint: 'Revisit c10_geo_cbse_01_003 (Resources: Classification by Ownership) and create a table.',
          misconception: 'Students often think CPRs are the same as “government wastelands” or “open-access resources” where anyone can take.',
          parts: [
                { id: 'a', prompt: 'A village has 100 hectares of culturable wasteland classified as CPR. Over a decade, 30 hectares are converted to private cultivation.', answer: 'livestock economy and (',
                  options: ['livestock economy and (', 'less grass', 'government wastelands', 'open-access resources'],
                  hint: 'Revisit c10_geo_cbse_01_003 (Resources: Classification by Ownership) and create a table comparing.',
                  misconception: 'Students often think CPRs are the same as “government wastelands” or “open-access resources” where anyone can take anything without rules.' },
                { id: 'b', prompt: 'Compare CPRs and private agricultural land in terms of: (i) access rights, (ii) management responsibility, (iii) equity outcome for landless households.', answer: '(i) CPRs: all community members have access',
                  options: ['(i) CPRs: all community members have access', 'government land', 'anyone can use private land', 'government wastelands'],
                  hint: 'Revisit c10_geo_cbse_01_003 (Resources: Classification by Ownership) and create a table comparing.',
                  misconception: 'Students often think CPRs are the same as “government wastelands” or “open-access resources” where anyone can take anything without rules.' }
          ],
            remediations: { 'cprs-are-the-same-as': { steps: ['If the student holds this misconception: (1) Revisit c10_geo_cbse_01_003 (Resource Classification by Ownership).', '(2) Study c11_soc_cbse_08_003 (Property Relations and Control Over Natural Resources) for the sociological distinction.', '(3) Use a local example: visit a village pond or pasture, interview elders about rules (e.g., “only two cows per.', '(4) Re-attempt Diagnostic Question 4 to test the corrected understanding.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_11_004', difficulty: 'standard',
          question: 'Agriculture in India is a land-based primary economic activity that contributes.',
          hint: 'If stuck on why workforce share declines slower than GDP share, revisit "disguised.',
          misconception: 'Students think "agriculture\'s declining GDP share means it is becoming unimportant" — they confuse relative share with.',
          parts: [
                { id: 'a', prompt: 'According to recent data, what is the approximate share of agriculture and allied sectors in India\'s Gross Value Added (GVA) at current prices, and what.', answer: 'Agriculture contributes ~14-18% to GVA and employs ~42-45% of the workforce',
                  options: ['Agriculture contributes ~14-18% to GVA and employs ~42-45% of the workforce', '50% GDP, 70% workforce', 'agriculture\'s declining GDP share means it is becoming unimportant'],
                  hint: 'If stuck on why workforce share declines slower than GDP share, revisit "disguised unemployment".',
                  misconception: 'Students think "agriculture\'s declining GDP share means it is becoming unimportant" — they confuse relative share with absolute.' },
                { id: 'b', prompt: 'Calculate the cropping intensity for a district where Net Sown Area (NSA) is 1.2 lakh hectares and Gross Cropped Area (GCA) is 1.8 lakh hectares.', answer: 'Step 1: CI = (GCA/NSA) × 100 = (1.8/1.2) × 100 = 150%',
                  options: ['Step 1: CI = (GCA/NSA) × 100 = (1.8/1.2) × 100 = 150%', 'agriculture\'s declining GDP share means it is becoming unimportant'],
                  hint: 'If stuck on why workforce share declines slower than GDP share, revisit "disguised unemployment".',
                  misconception: 'Students think "agriculture\'s declining GDP share means it is becoming unimportant" — they confuse relative share with absolute.' }
          ],
            remediations: { 'agriculture-s-declining-gdp-share': { steps: ['Revisit c10_geo_cbse_04_010 (Class 10 agriculture contribution) and c11_geo_cbse_18_003 (Class 11 importance.', 'Draw a two-axis graph: X-axis = year (1950-2020), Y1 = % GDP share (declining curve), Y2 = % workforce share (slowly.', 'Calculate labour productivity ratio: (Agri GDP share / Agri workforce share) = (15/45) = 0.33 vs non-agri (85/55).', 'Re-attempt Diagnostic Q2 and Q4 with this quantitative lens.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_11_005', difficulty: 'standard',
          question: 'Cropping seasons in India are distinct agricultural cycles determined by the.',
          hint: 'If unable to map monsoon onset or winter isotherms, revise Class 11 nodes.',
          misconception: 'Students believe "Zaid is a minor, optional season everywhere." In reality, Zaid is **critical in the northwestern.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Kharif crops are sown in June and harvested in October everywhere in India." Identify the geographical inaccuracy in this statement and.', answer: 'The statement assumes a uniform June sowing date across India',
                  options: ['The statement assumes a uniform June sowing date across India', 'Zaid is a minor, optional season everywhere', 'Kharif = rice everywhere', '"Zaid is a minor, optional season everywhere'],
                  hint: 'If unable to map monsoon onset or winter isotherms, revise Class 11 nodes c11_geo_cbse_10_002.',
                  misconception: 'Students believe "Zaid is a minor, optional season everywhere." In reality, Zaid is **critical in the northwestern plains** (Punjab.' },
                { id: 'b', prompt: 'Given: Net Sown Area (NSA) of a district = 1,20,000 ha; Gross Cropped Area (GCA) = 1,80,000 ha. Calculate the Cropping Intensity (CI).', answer: 'Step 1: CI = (GCA / NSA) × 100 = (1,80,000 / 1,20,000) × 100 = 150%',
                  options: ['Step 1: CI = (GCA / NSA) × 100 = (1,80,000 / 1,20,000) × 100 = 150%', 'Zaid is a minor, optional season everywhere', 'Kharif = rice everywhere', '"Zaid is a minor, optional season everywhere'],
                  hint: 'If unable to map monsoon onset or winter isotherms, revise Class 11 nodes c11_geo_cbse_10_002.',
                  misconception: 'Students believe "Zaid is a minor, optional season everywhere." In reality, Zaid is **critical in the northwestern plains** (Punjab.' },
                { id: 'c', prompt: 'Compare the cropping season logic in the Indo-Gangetic Plain (IGP) vs. the Deccan Plateau.', answer: 'IGP: Strong continental climate',
                  options: ['IGP: Strong continental climate', 'soil difference', 'Zaid is a minor, optional season everywhere', 'Kharif = rice everywhere'],
                  hint: 'If unable to map monsoon onset or winter isotherms, revise Class 11 nodes c11_geo_cbse_10_002.',
                  misconception: 'Students believe "Zaid is a minor, optional season everywhere." In reality, Zaid is **critical in the northwestern plains** (Punjab.' }
          ],
            remediations: { 'zaid-is-a-minor': { steps: ['Revisit c11_geo_cbse_10_003 (Seasons in India) — map the 4-season climate (Winter, Summer, SW Monsoon, Retreating.', 'Use the NCERT Table 3.2 (Cropping Seasons) — draw a timeline for a northern state (e.g., Haryana) and a southern state.', 'Re-attempt Diagnostic Q2 and Q4 — if still confused, watch the IMD monsoon onset animation (imd.gov.in) to visualise.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_11_006', difficulty: 'standard',
          question: 'Rice and wheat are India\'s two dominant foodgrain crops: rice is a kharif crop.',
          hint: 'If stuck, review the kharif/rabi table in c12_geo_cbse_11_005 and the monsoon map.',
          misconception: 'Students often think rice *only* grows in high-rainfall areas (like West Bengal) and wheat *only* in low-rainfall areas.',
          parts: [
                { id: 'a', prompt: 'Name the two Indian states that are the largest producers of rice and the two largest producers of wheat, according to the latest NCERT data.', answer: 'Correct answer: Rice',
                  options: ['Correct answer: Rice', 'Punjab for rice or Bihar for wheat'],
                  hint: 'If stuck, review the kharif/rabi table in c12_geo_cbse_11_005 and the monsoon map.',
                  misconception: 'Students often think rice *only* grows in high-rainfall areas (like West Bengal) and wheat *only* in low-rainfall areas (like Punjab).' }
          ],
            remediations: { 'rice-only-grows-in-high': { steps: ['Revisit the NCERT maps (Fig.', '3.3 and 3.4) and overlay an irrigation map (canal/tubewell density) — note where rice appears outside high-rainfall.', 'Review Class 10 node c10_geo_cbse_04_004 (Major Crops: Rice, Wheat) for the basic climate-soil table.', 'Do a quick map exercise: shade rice areas in blue, wheat in yellow, and mark major canals (Bhakra, Indira Gandhi, Upper.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
