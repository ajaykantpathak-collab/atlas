import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch11_p2: SimDef = {
    id: 'v3_c12_geo_ch11_p2',
    title: 'Land Resources and Agriculture · Part 2/2',
    subtitle: 'Forests grew on paper while shrinking on the ground',
    classLevel: 12, subject: 'geography', topic: 'Land Resources and Agriculture · Part 2/2',
    chapters: ['c12_geo_ch11'],
    nodeIds: ['c12_geo_cbse_11_007', 'c12_geo_cbse_11_008', 'c12_geo_cbse_11_009', 'c12_geo_cbse_11_010', 'c12_geo_cbse_11_011', 'c12_geo_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Land-use analyst', intro: 'Every village patwari keeps nine ledgers for the same soil. Learn to read what each column really measures.', goal: 'Master India\'s nine land-use categories, the reporting-vs-geographical-area distinction, and 70 years of land-use change.' },
    discovery: {
        question: 'India\'s records show forest land \'increasing\' since 1950 — but satellites keep reporting shrinking green cover. Which is lying?',
        options: ['Neither — revenue records count legally notified forest area, which grew by demarcation; satellite data counts actual tree canopy. Different measures, different truths', 'The satellites are lying', 'The records are lying', 'Forests really are growing'],
        answer: 'Neither — revenue records count legally notified forest area, which grew by demarcation; satellite data counts actual tree canopy. Different measures, different truths',
        hook: 'Two more denominator traps: \'reporting area\' is whatever land revenue surveyed — not India\'s fixed geographical area — and \'net area sown\' rose while total cultivable land fell, meaning the farm belt is intensifying, not expanding. Fallows and culturable waste are shrinking for the same reason: pressure.',
    },
    teaching: [
        { title: 'Major Food Crops: Maize, Pulses and Millets', text: 'Maize, pulses (gram and tur/arhar), and millets (jowar, bajra, ragi) are major food crops in India classified as coarse cereals and legumes, predominantly grown in semi-arid to sub-humid regions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_11_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Audit India\'s land ledger: read the nine-fold classification across 70 years, compute cropping intensity, and explain where all the spare land went.',
        labels: ['Major Food Crops: Maize,', 'Major Commercial Crops: Sugarcane,', 'Major Commercial Crops: Oilseeds,', 'Green Revolution and Its', 'Agricultural Development: Technological', 'Food Security and Public'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_11_007', title: 'Major Food Crops: Maize, Pulses and Millets',
          scaffold: { problem: 'Using the NCERT data, calculate the approximate share of coarse cereals (jowar, bajra, maize, ragi) in India\'s total cropped area, given.',
            steps: [
            { text: 'Identify given data from textbook: "Cereals occupy about 54 per cent of total cropped area in India." Rice ~25%, Wheat.' },
            { text: 'Calculate fine grains share: Rice (25%) + Wheat (14%) = 39% of total cropped area.' },
            { text: 'Calculate coarse cereals share: Total cereals (54%) – Fine grains (39%) = 15% of total cropped area.' },
            { text: 'Explain decline: Green Revolution (1960s onward) introduced HYV rice/wheat + irrigation + fertilizers.' },
            { text: 'Verify: Decline is structural — not because coarse cereals are inferior, but because **incentive systems (price.', faded: true, blankAnswer: 'Coarse cereals ≈ 15–16.5% of total cropped area. Decline.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_11_008', title: 'Major Commercial Crops: Sugarcane, Cotton, Jute',
          scaffold: { problem: 'A farmer in Nanded district, Maharashtra (black soil, 75 cm annual rainfall, no canal irrigation) wants to choose between cotton and.',
            steps: [
            { text: 'Identify the agro-climatic profile of Nanded — Deccan plateau, vertisols (black cotton soil), semi-arid (75.' },
            { text: 'Recall cotton\'s envelope — 21-30°C, 50-100 cm rainfall, kharif, thrives on black soil\'s moisture retention.' },
            { text: 'Recall sugarcane\'s envelope — tropical, 100-150 cm rainfall, 10-12 month duration, high water demand (1500-2500 mm).' },
            { text: 'Match: Nanded\'s 75 cm rainfall + no irrigation = fits cotton perfectly; fails sugarcane\'s irrigation and rainfall.' },
            { text: 'Verify with real data — Nanded is in Maharashtra\'s cotton belt; sugarcane in Maharashtra is confined to irrigated.', faded: true, blankAnswer: 'Recommend cotton. It is the geographically appropriate crop.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_11_009', title: 'Major Commercial Crops: Oilseeds, Tea and Coffee',
          caseStudy: { intro: 'Observe the cooking oil, tea, and coffee in your kitchen — these everyday items come from specific agro-climatic zones in India.',
            decisions: [{ prompt: 'Name the four major oilseed crops grown in India and identify which one is a rabi crop while the others are primarily kharif crops.', options: [
                { text: 'The four major oilseeds are groundnut, rapeseed & mustard, soyabean, and sunflower', outcome: 'The four major oilseeds are groundnut, rapeseed & mustard, soyabean, and sunflower.' },
                { text: 'All oilseeds are kharif crops', outcome: 'Not quite — Students often believe: (1) "All oilseeds are kharif crops" — but rapeseed & mustard is a major.', reveals: '1-all-oilseeds-are-kharif' },
                { text: 'cotton or jute as oilseeds, or misidentifying the season', outcome: 'Not quite — Students often believe: (1) "All oilseeds are kharif crops" — but rapeseed & mustard is a major.', reveals: '1-all-oilseeds-are-kharif' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_11_010', title: 'Green Revolution and Its Impact on Indian Agriculture',
          scaffold: { problem: 'A farmer in Karnal district (Haryana) has 4 hectares of net sown area.',
            steps: [
            { text: 'Identify pre-GR system — single crop (wheat only), rainfed, yield = 800 kg/ha. Annual output per hectare = 800 kg.' },
            { text: 'Identify post-GR system — double cropping (rice + wheat), irrigated, yields = 4,500 + 4,200 = 8,700 kg/ha/year.' },
            { text: 'Compute per-hectare increase = 8,700 - 800 = 7,900 kg/ha (9.875× increase).' },
            { text: 'Compute total farm output change: Pre = 4 ha × 800 kg = 3,200 kg. Post = 4 ha × 8,700 kg = 34,800 kg.' },
            { text: 'Explain irrigation\'s role — rice requires 1,200-1,500 mm water; Karnal receives ~700 mm rainfall, mostly in monsoon.', faded: true, blankAnswer: 'Per-hectare annual output rose from 800 kg to 8,700.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_11_011', title: 'Agricultural Development: Technological and Institutional Reforms',
          scaffold: { problem: 'Calculate the cropping intensity for a district where Net Sown Area is 150,000 hectares and Gross Cropped Area is 240,000 hectares.',
            steps: [
            { text: 'Identify the formula: Cropping Intensity (%) = (GCA / NSA) × 100.' },
            { text: 'Substitute values: GCA = 240,000 ha, NSA = 150,000 ha.' },
            { text: 'Compute ratio: 240,000 / 150,000 = 1.6.' },
            { text: 'Multiply by 100: 1.6 × 100 = 160%.' },
            { text: 'Interpret: 160% means 60% of NSA is double-cropped. In rainfed Marathwada, this implies protective irrigation.', faded: true, blankAnswer: 'Cropping Intensity = 160%. In rainfed areas, this signals.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_11_012', title: 'Food Security and Public Distribution System in India',
          caseStudy: { intro: 'Imagine standing outside a Fair Price Shop in your village or city early morning: you see ration cards being swiped on an e-PoS machine, biometric.',
            decisions: [{ prompt: 'What are the three components of food security as defined by the World Food Summit and adopted in India\'s policy framework?', options: [
                { text: 'The three components are: (1) Availability', outcome: 'The three components are: (1) Availability — sufficient quantities of food of appropriate quality.' },
                { text: 'production and distribution', outcome: 'Not quite — Students often think "Food Security = Buffer Stock = FCI godowns full of grain." They equate.', reveals: 'food-security-buffer-stock-fci' },
                { text: 'Food Security = Buffer Stock = FCI godowns full of grain', outcome: 'Not quite — Students often think "Food Security = Buffer Stock = FCI godowns full of grain." They equate.', reveals: 'food-security-buffer-stock-fci' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a journalism internship, your editor drafts a celebratory headline: \'India\'s forests grew from 14% to 24% — green cover nearly doubled since 1950.\' The source is a land-revenue statistics table, not satellite imagery.',
            decisions: [{ prompt: 'What correction does the land-use chapter require before publishing?', options: [
                { text: 'Reframe it — \'area under forest\' in revenue records means legally notified forest land, not measured tree canopy; the rise reflects administrative reclassification while actual forest cover may have stagnated or degraded.', outcome: 'The chapter drills exactly this trap: legal category and physical cover are different variables, and the revenue table answers \'how much land is reserved for forests\', not \'how much forest exists\'.' },
                { text: 'Run it — a 10-point rise in the official statistics is a solid story either way.', outcome: 'The number is real but the claim isn\'t: notified area grew while satellite-measured cover tells a different story, so the headline converts a bookkeeping change into an ecological claim.', reveals: 'records-equal-reality' },
                { text: 'Flip the headline to \'net sown area rose, so farmland is not scarce\' — land-use data is too ambiguous for forest claims anyway.', outcome: 'That makes the opposite error: net sown area grew by drawing down culturable wasteland and fallows — the cultivable stock shrank even as the cropped share rose, which is why the chapter pushes land-saving technology.', reveals: 'sown-rise-means-abundance' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_11_012', title: 'You made it',
          caseStudy: { intro: 'You can now read land-use statistics like a revenue officer — knowing the difference between land that\'s legal, land that\'s mapped, and land that\'s green.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_11_007', difficulty: 'standard',
          question: 'Maize, pulses (gram and tur/arhar), and millets (jowar, bajra, ragi) are major.',
          hint: 'If unsure about seasonal classification or soil-crop matching, review.',
          misconception: 'Students treat "millets" as a single crop with uniform requirements, writing "millets grow in dry areas with low.',
          parts: [
                { id: 'a', prompt: 'Name the three leading states for maize production in India and identify whether maize is predominantly a kharif or rabi crop in each of these states.', answer: 'Karnataka, Madhya Pradesh, and Bihar are the top three maize-producing states',
                  options: ['Karnataka, Madhya Pradesh, and Bihar are the top three maize-producing states', 'kharif cereals', 'Punjab or Haryana, or saying maize is rabi in Karnataka'],
                  hint: 'If unsure about seasonal classification or soil-crop matching, review **c10_geo_cbse_04_003**.',
                  misconception: 'Students treat "millets" as a single crop with uniform requirements, writing "millets grow in dry areas with low rainfall" without.' },
                { id: 'b', prompt: 'Why does gram (chickpea) cultivation decline in Punjab, Haryana, and northern Rajasthan after the Green Revolution, even though these states have irrigation.', answer: 'Gram is a rainfed rabi crop requiring only 1–2 light irrigations',
                  options: ['Gram is a rainfed rabi crop requiring only 1–2 light irrigations', 'gram needs more water than wheat', 'soil became saline', 'kharif cereals'],
                  hint: 'If unsure about seasonal classification or soil-crop matching, review **c10_geo_cbse_04_003**.',
                  misconception: 'Students treat "millets" as a single crop with uniform requirements, writing "millets grow in dry areas with low rainfall" without.' },
                { id: 'c', prompt: 'A farmer in Maharashtra\'s Marathwada region (annual rainfall 70 cm, shallow black soil) wants to maximise protein production per hectare with minimal.', answer: 'Choose **tur (arhar)** in **kharif season**',
                  options: ['Choose **tur (arhar)** in **kharif season**', 'kharif cereals'],
                  hint: 'If unsure about seasonal classification or soil-crop matching, review **c10_geo_cbse_04_003**.',
                  misconception: 'Students treat "millets" as a single crop with uniform requirements, writing "millets grow in dry areas with low rainfall" without.' }
          ],
            remediations: { 'students-treat-millets-as-a': { steps: ['Revisit **c10_geo_cbse_04_004** (Major Crops: Rice, Wheat, Maize and Millets) — make a 3-column table: Crop | Rainfall.', 'On an outline map of India, shade three zones: (a) **Millet Zone** (Rajasthan-Gujarat for bajra; Maharashtra-Karnataka.', 'Write one sentence per crop explaining **why it is NOT grown in the other two zones** (e.g., "Bajra fails in Deccan.', 'Re-attempt Diagnostic Questions 2, 4, and 6.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "millets" as a single crop with uniform requirements, writing "millets grow in dry areas with low.',
          parts: [
                { id: 'a', prompt: 'Design a two-year cropping sequence for a 2-hectare rainfed farm in Telangana\'s Deccan Plateau (annual rainfall 85 cm, black cotton soil, kharif rainfall 70.', answer: 'Year 1 Kharif: **Maize + Pigeon pea (tur) intercropping** (1:2 row ratio)',
                  options: ['Year 1 Kharif: **Maize + Pigeon pea (tur) intercropping** (1:2 row ratio)', 'kharif cereals'],
                  hint: 'If unsure about seasonal classification or soil-crop matching, review **c10_geo_cbse_04_003**.',
                  misconception: 'Students treat "millets" as a single crop with uniform requirements, writing "millets grow in dry areas with low rainfall" without.' }
          ],
            remediations: { 'students-treat-millets-as-a': { steps: ['Revisit **c10_geo_cbse_04_004** (Major Crops: Rice, Wheat, Maize and Millets) — make a 3-column table: Crop | Rainfall.', 'On an outline map of India, shade three zones: (a) **Millet Zone** (Rajasthan-Gujarat for bajra; Maharashtra-Karnataka.', 'Write one sentence per crop explaining **why it is NOT grown in the other two zones** (e.g., "Bajra fails in Deccan.', 'Re-attempt Diagnostic Questions 2, 4, and 6.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_11_008', difficulty: 'standard',
          question: 'Sugarcane, cotton, and jute are India\'s three principal commercial fibre and.',
          hint: 'If unsure about a crop\'s geographical limits, return to the soil-climate-crop matrix.',
          misconception: 'Students consistently confuse the cotton-growing zones by listing states randomly (e.g., "Gujarat, Punjab, Tamil Nadu").',
          parts: [
                { id: 'a', prompt: 'Name the three distinct cotton-growing zones of India and the dominant cotton type (short staple vs. long staple) in each zone.', answer: 'Correct answer: (1) North-west zone (Punjab, Haryana, northern Rajasthan)',
                  options: ['Correct answer: (1) North-west zone (Punjab, Haryana, northern Rajasthan)', 'Gujarat, Maharashtra, Punjab', 'Gujarat, Punjab, Tamil Nadu', 'lists states without zoning (e'],
                  hint: 'If unsure about a crop\'s geographical limits, return to the soil-climate-crop matrix.',
                  misconception: 'Students consistently confuse the cotton-growing zones by listing states randomly (e.g., "Gujarat, Punjab, Tamil Nadu") without recognising.' },
                { id: 'b', prompt: 'Given: Uttar Pradesh has 22% of India\'s net sown area but produces ~40% of the country\'s sugarcane.', answer: 'Step 1: UP concentration index = 40 / 22 = 1.82',
                  options: ['Step 1: UP concentration index = 40 / 22 = 1.82', 'Gujarat, Punjab, Tamil Nadu'],
                  hint: 'If unsure about a crop\'s geographical limits, return to the soil-climate-crop matrix.',
                  misconception: 'Students consistently confuse the cotton-growing zones by listing states randomly (e.g., "Gujarat, Punjab, Tamil Nadu") without recognising.' }
          ],
            remediations: { 'students-consistently-confuse-the-cotton': { steps: ['Revisit c11_geo_cbse_12_004 (Alluvial Soils) and c11_geo_cbse_12_005 (Black Soils) — draw a table comparing.', 'On an outline map, shade the three cotton zones with different patterns; label each with staple type and irrigation.', 'Calculate sugarcane yield (tonnes/ha) for UP vs. Tamil Nadu using latest Agricultural Statistics data — this forces the.', 'Watch a 5-minute video on jute retting in West Bengal to visualise why flowing water won\'t work and why the delta.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_11_009', difficulty: 'standard',
          question: 'Major commercial crops in India — oilseeds (groundnut, rapeseed & mustard.',
          hint: 'If stuck on seasonal classification, re-read Table 3.2 (Cropping Seasons) in NCERT.',
          misconception: 'Students often believe: (1) "All oilseeds are kharif crops" — but rapeseed & mustard is a major rabi oilseed.',
          parts: [
                { id: 'a', prompt: 'A farmer in western Madhya Pradesh (Malwa plateau) has 5 hectares of black cotton soil (regur) with 80 cm annual rainfall, mostly in July–September.', answer: 'Soyabean (kharif) is most suitable',
                  options: ['Soyabean (kharif) is most suitable', 'All oilseeds are kharif crops'],
                  hint: 'If stuck on seasonal classification, re-read Table 3.2 (Cropping Seasons) in NCERT Chapter 3.',
                  misconception: 'Students often believe: (1) "All oilseeds are kharif crops" — but rapeseed & mustard is a major rabi oilseed in north-west India.' },
                { id: 'b', prompt: 'Compare the geographical reasons for the decline in area under "tree crops and groves" (land-use category) with the expansion of oilseed cultivation in India.', answer: 'Tree crops/groves declined due to conversion to agricultural land (net sown area',
                  options: ['Tree crops/groves declined due to conversion to agricultural land (net sown area', 'urbanization', 'non-agricultural uses', 'tree crops'],
                  hint: 'If stuck on seasonal classification, re-read Table 3.2 (Cropping Seasons) in NCERT Chapter 3.',
                  misconception: 'Students often believe: (1) "All oilseeds are kharif crops" — but rapeseed & mustard is a major rabi oilseed in north-west India.' }
          ],
            remediations: { '1-all-oilseeds-are-kharif': { steps: ['If misconceptions persist: (1) Revisit c12_geo_cbse_11_005 (Cropping Seasons) to relearn kharif/rabi/zaid boundaries.', '(2) On an outline map, shade the Malwa plateau, Marathwada, Gujarat, Rajasthan for oilseeds; Brahmaputra valley.', '(3) Cross-reference with Class 11 soil nodes: c11_geo_cbse_12_005 (Black Soils → soyabean), c11_geo_cbse_12_007.', '(4) Re-attempt Diagnostic Questions 2 and 3 after map exercise.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_11_010', difficulty: 'standard',
          question: 'The Green Revolution in India (mid-1960s onward) refers to the rapid increase.',
          hint: 'If stuck on spatial diffusion: revisit c12_geo_cbse_11_006 (rice/wheat distribution maps).',
          misconception: 'Students believe the Green Revolution was *only* about HYV seeds — "better seeds gave more grain." They miss that HYVs.',
          parts: [
                { id: 'a', prompt: 'Name the two countries from which the High-Yielding Variety (HYV) seeds of wheat and rice were introduced in India during the Green Revolution.', answer: 'Correct: Wheat HYVs came from Mexico (CIMMYT, Norman Borlaug’s dwarf varieties)',
                  options: ['Correct: Wheat HYVs came from Mexico (CIMMYT, Norman Borlaug’s dwarf varieties)', 'USA and Japan', 'Punjab and Haryana', 'better seeds gave more grain'],
                  hint: 'If stuck on spatial diffusion: revisit c12_geo_cbse_11_006 (rice/wheat distribution maps) and.',
                  misconception: 'Students believe the Green Revolution was *only* about HYV seeds — "better seeds gave more grain." They miss that HYVs are.' },
                { id: 'b', prompt: 'Calculate the cropping intensity for a district where Net Sown Area (NSA) is 1,20,000 hectares and Gross Cropped Area (GCA) is 1,80,000 hectares.', answer: 'Step 1: Recall formula',
                  options: ['Step 1: Recall formula', 'better seeds gave more grain', 'the Green Revolution was *only* about HYV seeds'],
                  hint: 'If stuck on spatial diffusion: revisit c12_geo_cbse_11_006 (rice/wheat distribution maps) and.',
                  misconception: 'Students believe the Green Revolution was *only* about HYV seeds — "better seeds gave more grain." They miss that HYVs are.' },
                { id: 'c', prompt: 'Compare the ecological consequences of the Green Revolution in the northwestern alluvial plains (Punjab-Haryana) versus the eastern rainfed regions.', answer: 'Correct: Northwestern plains',
                  options: ['Correct: Northwestern plains', 'better seeds gave more grain', 'the Green Revolution was *only* about HYV seeds'],
                  hint: 'If stuck on spatial diffusion: revisit c12_geo_cbse_11_006 (rice/wheat distribution maps) and.',
                  misconception: 'Students believe the Green Revolution was *only* about HYV seeds — "better seeds gave more grain." They miss that HYVs are.' }
          ],
            remediations: { 'the-green-revolution-was-only': { steps: ['Revisit node c12_geo_cbse_11_005 (Cropping Seasons) — verify why rabi wheat *requires* irrigation in north India.', 'Re-read NCERT p. 35-36 "New seed varieties... assured supply of soil moisture through irrigation was a basic.', 'Draw a 2×2 matrix: (Irrigated + HYV) = High Yield; (Rainfed + HYV) = Low Yield/Risk; (Irrigated + Traditional) = Medium.', 'Explain to a peer why "seeds alone" is a category error — seeds are *necessary but not sufficient*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_11_011', difficulty: 'standard',
          question: 'Agricultural development in India refers to the sustained increase.',
          hint: 'If stuck, re-read NCERT Class 12 Chapter 3 section "Agricultural Development in India".',
          misconception: 'Students equate "technological reform" only with Green Revolution inputs (HYV seeds, fertilizers) and "institutional.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Agricultural development in India refers to the sustained increase in agricultural',
                  options: ['Agricultural development in India refers to the sustained increase in agricultural', 'Land use categories are the nine-fold classification of India\'s reporting area maintained', 'Land use change in India refers to the shifting proportional allocation of the country\'s', 'Common Property Resources (CPRs) are community-owned natural resources where every member'],
                  hint: 'If stuck, re-read NCERT Class 12 Chapter 3 section "Agricultural Development in India" (pages.',
                  misconception: 'Students equate "technological reform" only with Green Revolution inputs (HYV seeds, fertilizers) and "institutional reform" only with land.' }
          ],
            remediations: { 'students-equate-technological-reform-only': { steps: ['Revisit c12_geo_cbse_11_010 (Green Revolution) to lock the technological package.', 'Map each problem in "Problems of Indian Agriculture" (NCERT 37-38) to a specific institutional reform: erratic monsoon.', 'Create a two-column table (Problem ↔ Institutional Reform with Scheme Name) for 5 problems.', 'Re-attempt Diagnostic Q6.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_11_012', difficulty: 'standard',
          question: 'Food security in India refers to the state where all citizens have physical.',
          hint: 'Revisit c12_geo_cbse_11_006 (rice/wheat distribution) and c10_geo_cbse_04_009 (PDS.',
          misconception: 'Students often think "Food Security = Buffer Stock = FCI godowns full of grain." They equate national-level stockpiles.',
          parts: [
                { id: 'a', prompt: 'What are the three components of food security as defined by the World Food Summit and adopted in India\'s policy framework?', answer: 'The three components are: (1) Availability',
                  options: ['The three components are: (1) Availability', 'production and distribution', 'Food Security = Buffer Stock = FCI godowns full of grain', '"Food Security = Buffer Stock = FCI godowns full of grain'],
                  hint: 'Revisit c12_geo_cbse_11_006 (rice/wheat distribution) and c10_geo_cbse_04_009 (PDS basics).',
                  misconception: 'Students often think "Food Security = Buffer Stock = FCI godowns full of grain." They equate national-level stockpiles with household food.' },
                { id: 'b', prompt: 'A household in a rural area of Uttar Pradesh holds an Antyodaya Anna Yojana (AAY) ration card.', answer: 'Step 1: Recall NFSA entitlements',
                  options: ['Step 1: Recall NFSA entitlements', 'Food Security = Buffer Stock = FCI godowns full of grain', '"Food Security = Buffer Stock = FCI godowns full of grain'],
                  hint: 'Revisit c12_geo_cbse_11_006 (rice/wheat distribution) and c10_geo_cbse_04_009 (PDS basics).',
                  misconception: 'Students often think "Food Security = Buffer Stock = FCI godowns full of grain." They equate national-level stockpiles with household food.' }
          ],
            remediations: { 'food-security-buffer-stock-fci': { steps: ['If the student holds this misconception: Step 1 — Show the FCI stock vs.', 'buffer norm graph (2015-2023) from the Department of Food & Public Distribution annual reports; ask them to calculate.', 'Step 2 — Map a tribal district (e.g., Koraput, Odisha) and trace the PDS supply chain from Punjab mandi to FPS.', 'Step 3 — Read NFSA Section 10 (entitlements) and Section 29 (vigilance committees); role-play a Gram Sabha social audit.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
