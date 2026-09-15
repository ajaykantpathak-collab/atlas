import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eco_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eco_ch01_p1: SimDef = {
    id: 'v3_c11_eco_ch01_p1',
    title: 'Indian Economy on the Eve of Independence · Part 1/2',
    subtitle: 'Separate real infrastructure from developmental impact on the eve of independence.',
    classLevel: 11, subject: 'economics', topic: 'Indian Economy on the Eve of Independence · Part 1/2',
    chapters: ['c11_eco_ch01'],
    nodeIds: ['c11_eco_cbse_01_001', 'c11_eco_cbse_01_002', 'c11_eco_cbse_01_003', 'c11_eco_cbse_01_004', 'c11_eco_cbse_01_005', 'c11_eco_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an economic historian auditing two centuries of colonial policy', intro: 'A weaver\'s looms in 1750 Bengal stand idle by 1850 while Lancashire hums. Trace the policy that flipped the trade.', goal: 'Explain colonial exploitation, deindustrialisation and per-capita stagnation under British rule.' },
    discovery: {
        question: 'The British left India the world\'s fourth-largest railway network — often cited as proof colonial rule modernised the economy. What does the network\'s design reveal?',
        options: ['Port-to-hinterland lines built to move raw materials out, at a guaranteed 5% return paid from Indian revenues', 'Inter-regional lines designed to integrate Indian markets for Indian industry', 'Routes chosen to connect famine-prone districts to food surpluses', 'A passenger-first network funded by British taxpayers'],
        answer: 'Port-to-hinterland lines built to move raw materials out, at a guaranteed 5% return paid from Indian revenues',
        hook: 'Infrastructure isn\'t automatically development — ask who paid for it, who profited, and what it was built to carry.',
    },
    teaching: [
        { title: 'Colonial Exploitation: British Rule and Economic Stagnation', text: 'Colonial exploitation refers to the systematic extraction of economic surplus from a colonised territory (India) to the colonising power (Britain) through state-enforced policies that restructure the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eco_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Weigh the social benefits of railways and telegraphs against surplus extraction, then show how population growth erased per-capita gains.',
        labels: ['Colonial Exploitation: British Rule', 'Low Level of Economic', 'Agricultural Sector: Stagnation', 'Agriculture: Zamindari, Ryotwari', 'Commercialisation of Crops: Indigo,', 'Industrial Sector: Decline'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_01_001', title: 'Colonial Exploitation: British Rule and Economic Stagnation',
          scaffold: { problem: 'Using Dadabhai Naoroji\'s 1867-68 estimates: India\'s exports = ₹135 crores, imports = ₹95 crores.',
            steps: [
            { text: 'Compute export surplus = Exports - Imports = ₹135 - ₹95 = ₹40 crores' },
            { text: 'Compute total drain channels = Home charges + War expenditure + Invisible payments = ₹30 + ₹5 + ₹10 = ₹45 crores' },
            { text: 'Note drain (₹45 crores) > export surplus (₹40 crores) — difference (₹5 crores) financed by borrowing/asset sales.' },
            { text: 'Drain D = ₹45 crores (annual flow, 1867-68)' },
            { text: 'Foregone capital stock calculation: Future Value = P × (1 + r)^n where P = ₹5 crores (initial annual drain), r = 4%.' },
            { text: 'FV = 5 × (1.04)^80 = 5 × 23.05 ≈ ₹115 crores (1947 value of *first year\'s* drain alone)' },
            { text: 'Total foregone stock = Sum of geometric series: D × [(1+r)^n - 1]/r = 45 × [(1.04)^80 - 1]/0.04 ≈ 45 × 576.25 ≈ ₹25,931.', faded: true, blankAnswer: 'Annual drain (1867-68) = ₹45 crores; Foregone capital stock.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_01_002', title: 'Low Level of Economic Development Under British Rule',
          scaffold: { problem: 'Using V.K.R.V. Rao\'s methodology, estimate India\'s per capita income in 1900-01 given: Net National Product at factor cost = ₹11,500 crore.',
            steps: [
            { text: 'Identify the formula for per capita income: PCI = NNP / Population' },
            { text: 'Calculate 1900-01 PCI: ₹11,500 crore / 238 million = ₹11,500 × 10^7 / 238 × 10^6 = ₹115,000 / 238 = ₹483.19 per annum' },
            { text: 'Calculate 1946-47 PCI (given): ₹265 per annum (note: this shows DECLINE, indicating data issues or different base years)' },
            { text: 'Recognize the anomaly — Rao\'s actual estimate for 1900-01 was ~₹200, for 1946-47 ~₹265.' },
            { text: 'Calculate annual growth rate over 47 years: (265/200)^(1/47) - 1 = (1.325)^(0.02128) - 1 = 1.00606 - 1 = 0.606% ≈ 0.6%.', faded: true, blankAnswer: 'Per capita income grew at approximately 0.6% per annum.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_01_003', title: 'Agricultural Sector: Stagnation and Decline',
          scaffold: { problem: 'In 1900, Bengal Presidency produced 12 million tonnes of rice on 6 million hectares.',
            steps: [
            { text: 'Compute yield_1900 = 12,000,000 tonnes / 6,000,000 ha = 2,000 kg/ha (20 quintals/ha).' },
            { text: 'Compute yield_1947 = 13,200,000 tonnes / 7,200,000 ha = 1,833 kg/ha (18.33 quintals/ha).' },
            { text: 'Yield change = (1,833 - 2,000) / 2,000 = -8.35% over 47 years. Annualised ≈ -0.18% per year (negative).' },
            { text: 'Per capita_1900 = 12,000,000,000 kg / 40,000,000 = 300 kg/person/year.' },
            { text: 'Output growth total = (13.2 - 12.0) / 12.0 = +10% over 47 years ≈ +0.21%/year.' },
            { text: 'Interpretation: Area expansion (+0.41%) more than offset by yield decline (-0.20%), yielding meagre output growth.', faded: true, blankAnswer: '(a) 2,000 kg/ha (1900), 1,833 kg/ha (1947); (b) -0.18% per.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_01_004', title: 'Agriculture: Zamindari, Ryotwari and Mahalwari Land Settlements',
          scaffold: { problem: 'In a Mahalwari village in the North-Western Provinces, the total revenue demand for the mahal is ₹50,000 per year.',
            steps: [
            { text: 'Identify the total revenue demand (₹50,000) and the number of families originally liable (100).' },
            { text: 'Compute the original per-family share: ₹50,000 / 100 = ₹500 per family.' },
            { text: 'After flood, only 80 families can pay; the revenue demand remains ₹50,000 (state does not remit).' },
            { text: 'Compute new per-family share: ₹50,000 / 80 = ₹625 per family.' },
            { text: 'Additional burden = ₹625 - ₹500 = ₹125 per family (25% increase).' },
            { text: 'Interpret: This extra burden falls on families who may also have suffered partial losses, leading to indebtedness, land.', faded: true, blankAnswer: 'Additional burden = ₹125 per family (25% increase). The.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_01_005', title: 'Commercialisation of Crops: Indigo, Cotton and Jute',
          scaffold: { problem: 'In a Bengal district in 1890, total cropped area was 500,000 hectares.',
            steps: [
            { text: 'Calculate Commercialisation Index 1890 = (Jute Area / Total Cropped Area) × 100 = (120,000 / 500,000) × 100 = 24%' },
            { text: 'Calculate Commercialisation Index 1910 = (180,000 / 500,000) × 100 = 36%' },
            { text: 'Compute annual growth rate of commercialisation index: ((36/24)^(1/20) - 1) × 100 = (1.5^0.05 - 1) × 100 ≈ (1.0205 - 1).' },
            { text: 'Compute rice area decline: (300,000 - 250,000) / 300,000 = 16.7% over 20 years, or ~0.91% annually' },
            { text: 'With population growing 1% annually and rice area falling 0.91%, per capita rice availability declined ~1.9% per year.', faded: true, blankAnswer: 'Commercialisation Index: 1890 = 24%, 1910 = 36%; Annual.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_01_006', title: 'Industrial Sector: Decline of Handicrafts and Artisans',
          scaffold: { problem: 'In 1835, a Dhaka weaver produced 10 metres of muslin per month selling at ₹5/metre. British machine-cloth entered duty-free at ₹0.80/metre.',
            steps: [
            { text: 'Calculate pre-entry revenue and profit. Revenue = 10 m × ₹5 = ₹50. Total cost = ₹12 + ₹8 + ₹15 = ₹35.' },
            { text: 'Identify the new market price after British entry. British cloth sells at ₹0.80/m; weaver must match this to sell.' },
            { text: 'Calculate new profit/loss. Costs unchanged at ₹35 (raw cotton, loom, subsistence). Loss = ₹8 - ₹35 = -₹27 per month.' },
            { text: 'Determine the implicit tariff protection British cloth enjoyed.' },
            { text: 'Interpret economically. The weaver\'s loss is not due to inefficiency (cost ₹3.50/m vs British ₹0.80/m reflects.', faded: true, blankAnswer: 'Pre-entry profit: ₹15/month. Post-entry loss: ₹27/month.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a history-economics debate, the motion is: \'Colonial rule modernised India — there were cotton mills, jute mills, TISCO steel and railways by 1947, so talk of deindustrialisation is exaggeration.\' Your teammate prepares to concede: \'Fine, modern factories did exist, so the drain-of-wealth argument fails.\'',
            decisions: [{ prompt: 'How do you rebut without denying the factories?', options: [
                { text: 'Deindustrialisation means destruction of the autonomous industrial ecosystem — traditional handicrafts collapsed while modern industry grew lopsided: foreign-owned, machinery imported, markets colonial, and no capital-goods sector (\'who made TISCO\'s machines? British firms\'). Plus the export surplus never returned as investment — that drain is the mechanism, and it\'s untouched by the fact that some mills existed.', outcome: 'The claim survives precisely because it\'s structural, not absolute: industry existed but was dependent; surplus left and didn\'t come back.' },
                { text: 'Concede — if TISCO and the mills existed, India wasn\'t deindustrialised, and the drain argument collapses.', outcome: 'Existence of foreign-dominated enclaves doesn\'t refute deindustrialisation; the weavers\' muslin economy died while machine-built plants served the metropole.', reveals: 'some-industry-no-deindustrialisation' },
                { text: 'Argue the opposite extreme — India had literally zero modern industry in 1947, everything was destroyed.', outcome: 'Factually false — mills and TISCO existed; overclaiming loses the debate to any examiner citing them.', reveals: 'deindustrialisation-means-zero-industry' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Colonialism didn\'t leave India without activity — it left activity wired to serve someone else\'s economy.',
            decisions: [{ prompt: 'What comes next? Indian Economy on the Eve of Independence · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Indian Economy on the Eve of Independence · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_001', difficulty: 'standard',
          question: 'Colonial exploitation refers to the systematic extraction of economic surplus.',
          hint: 'Revisit Class 10 node c10_eco_cbse_02_001 (sectoral classification) and Class 9 node.',
          misconception: 'Students believe "deindustrialisation" means *absolute decline* in all manufacturing.',
          parts: [
                { id: 'a', prompt: 'Given: India\'s aggregate real output growth (1900-1947) < 2% per annum; per capita output growth ≈ 0.5% per annum; population growth ≈ 1.2% per annum.', answer: 'Step 1: Let Y = total real output, P = population, y = Y/P = per capita output',
                  options: ['Step 1: Let Y = total real output, P = population, y = Y/P = per capita output', 'growth', 'deindustrialisation', '"deindustrialisation" means *absolute decline* in all manufacturing'],
                  hint: 'Revisit Class 10 node c10_eco_cbse_02_001 (sectoral classification) and Class 9 node c9_eco_ch1_3.',
                  misconception: 'Students believe "deindustrialisation" means *absolute decline* in all manufacturing.' }
          ],
            remediations: { 'deindustrialisation-means-absolute-decline-in': { steps: ['Draw a two-column table: "Handicrafts (Pre-1850)" vs. "Modern Industry (1850-1947)".', 'Calculate *value-added share* of modern industry in 1947 GDP (~7-8%) vs.', 'Identify the *missing link*: capital goods industry (machine tools, heavy electricals) — ask "Who made the machines for.', 'Conclude: deindustrialisation = *destruction of autonomous industrial ecosystem*, not absence of factories.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "deindustrialisation" means *absolute decline* in all manufacturing.',
          parts: [
                { id: 'a', prompt: 'Construct a *counterfactual development path* for India (1757-1947) assuming: (a) no colonial rule, (b) indigenous rulers adopt Meiji-style selective.', answer: '(i) Sectoral shares: Primary < 50% (vs',
                  options: ['(i) Sectoral shares: Primary < 50% (vs', 'deindustrialisation', '"deindustrialisation" means *absolute decline* in all manufacturing'],
                  hint: 'Revisit Class 10 node c10_eco_cbse_02_001 (sectoral classification) and Class 9 node c9_eco_ch1_3.',
                  misconception: 'Students believe "deindustrialisation" means *absolute decline* in all manufacturing.' }
          ],
            remediations: { 'deindustrialisation-means-absolute-decline-in': { steps: ['Draw a two-column table: "Handicrafts (Pre-1850)" vs. "Modern Industry (1850-1947)".', 'Calculate *value-added share* of modern industry in 1947 GDP (~7-8%) vs.', 'Identify the *missing link*: capital goods industry (machine tools, heavy electricals) — ask "Who made the machines for.', 'Conclude: deindustrialisation = *destruction of autonomous industrial ecosystem*, not absence of factories.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_002', difficulty: 'standard',
          question: 'Low level of economic development under British rule refers to the systematic.',
          hint: 'Review Class 10 GDP measurement (c10_eco_cbse_02_003) and Class 8 percentage applications.',
          misconception: 'Students often believe "low economic development" means the British did nothing — no railways, no ports, no modern.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Low level of economic development under British rule refers to the systematic',
                  options: ['Low level of economic development under British rule refers to the systematic', 'Colonial exploitation refers to the systematic extraction of economic surplus from a', 'Agricultural stagnation under British colonial rule refers to the persistent near-zero', 'The Zamindari, Ryotwari, and Mahalwari systems were three distinct land revenue'],
                  hint: 'Review Class 10 GDP measurement (c10_eco_cbse_02_003) and Class 8 percentage applications.',
                  misconception: 'Students often believe "low economic development" means the British did nothing — no railways, no ports, no modern industry.' }
          ],
            remediations: { 'low-economic-development-means-the': { steps: ['Have student list 5 British-built infrastructures/industries (railways, TISCO, cotton mills, telegraph, ports).', 'For each, ask: "Who primarily benefited? What was the design logic?"', 'Contrast with post-independence First Five Year Plan priorities (irrigation, power, heavy industry, rural roads).', 'Create a two-column table: Colonial Investment vs. Developmental Investment.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_003', difficulty: 'standard',
          question: 'Agricultural stagnation under British colonial rule refers to the persistent.',
          hint: 'If stuck on productivity decomposition, revisit c8_math_ch7_8 (direct proportion) and.',
          misconception: 'Students often believe "agricultural stagnation means total foodgrain output did not increase." The NCERT explicitly.',
          parts: [
                { id: 'a', prompt: 'State the approximate percentage of India\'s population dependent on agriculture on the eve of independence and the aggregate real output growth rate during the.', answer: 'About 85% of the population depended on agriculture',
                  options: ['About 85% of the population depended on agriculture', '50% population', '5% growth', 'agricultural stagnation means total foodgrain output did not increase'],
                  hint: 'If stuck on productivity decomposition, revisit c8_math_ch7_8 (direct proportion) and c8_math_ch8_6.',
                  misconception: 'Students often believe "agricultural stagnation means total foodgrain output did not increase." The NCERT explicitly states absolute output.' },
                { id: 'b', prompt: 'Using the data below, calculate the annual growth rate of yield (kg/hectare) for foodgrains in British India (1900-1947) and interpret the result.', answer: 'Step 1: Yield_1900 = 50.0 / 100.0 = 500 kg/ha',
                  options: ['Step 1: Yield_1900 = 50.0 / 100.0 = 500 kg/ha', 'agricultural stagnation means total foodgrain output did not increase', 'Was there *any* growth in agriculture?', '"agricultural stagnation means total foodgrain output did not increase'],
                  hint: 'If stuck on productivity decomposition, revisit c8_math_ch7_8 (direct proportion) and c8_math_ch8_6.',
                  misconception: 'Students often believe "agricultural stagnation means total foodgrain output did not increase." The NCERT explicitly states absolute output.' }
          ],
            remediations: { 'agricultural-stagnation-means-total-foodgrain': { steps: ['Re-read NCERT para on "productivity became low though... expansion of aggregate area" — highlight the two distinct.', 'Draw a two-panel diagram: Panel A — Output = Area × Yield. Show Area ↑, Yield → flat, Output ↑ slightly.', 'Work through Diagnostic Question 3 calculation again with a different dataset (e.g., cotton vs.', 'List the *common* constraints across all three land systems (revenue rigidity, no state investment, export orientation).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_004', difficulty: 'standard',
          question: 'The Zamindari, Ryotwari, and Mahalwari systems were three distinct land revenue.',
          hint: 'If stuck, revisit the "Work These Out" box in NCERT Section 1.3 and the paragraph.',
          misconception: 'Students often think the Ryotwari system was "pro-peasant" simply because it recognised the cultivator as the.',
          parts: [
                { id: 'a', prompt: 'Name the three major land revenue systems introduced by the British in India and the region where each was primarily implemented.', answer: 'The three systems are: (1) Zamindari System',
                  options: ['The three systems are: (1) Zamindari System', 'pro-peasant'],
                  hint: 'If stuck, revisit the "Work These Out" box in NCERT Section 1.3 and the paragraph on zamindari.',
                  misconception: 'Students often think the Ryotwari system was "pro-peasant" simply because it recognised the cultivator as the proprietor and removed the.' },
                { id: 'b', prompt: 'A ryot in the Madras Presidency holds 5 hectares of land. The revenue demand is fixed at 50% of the estimated gross produce value.', answer: 'Normal year: Gross value = 5 ha × ₹40,000 = ₹2,00,000',
                  options: ['Normal year: Gross value = 5 ha × ₹40,000 = ₹2,00,000', 'pro-peasant'],
                  hint: 'If stuck, revisit the "Work These Out" box in NCERT Section 1.3 and the paragraph on zamindari.',
                  misconception: 'Students often think the Ryotwari system was "pro-peasant" simply because it recognised the cultivator as the proprietor and removed the.' },
                { id: 'c', prompt: 'Compare the Mahalwari system with the Zamindari system on the basis of (a) unit of revenue settlement, (b) ownership rights, and (c) incentive for collective.', answer: 'unit of revenue settlement, (',
                  options: ['unit of revenue settlement, (', 'pro-peasant'],
                  hint: 'If stuck, revisit the "Work These Out" box in NCERT Section 1.3 and the paragraph on zamindari.',
                  misconception: 'Students often think the Ryotwari system was "pro-peasant" simply because it recognised the cultivator as the proprietor and removed the.' }
          ],
            remediations: { 'the-ryotwari-system-was-pro': { steps: ['Re-read the NCERT paragraph on Ryotwari (Section 1.3) noting the phrase "revenue demand was fixed at 50% of the.', 'Calculate the cultivator\'s surplus after paying revenue and meeting subsistence needs using a numerical example (like.', 'Compare with the Zamindari case where the zamindar\'s demand was often a share of net produce (after seed, labour costs).', 'Write a two-sentence conclusion: "Formal proprietorship without a cap on revenue demand offered no real protection.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_005', difficulty: 'standard',
          question: 'Commercialisation of crops refers to the structural shift in Indian agriculture.',
          hint: 'Review Node 004 (Land Revenue Systems) focusing on revenue fixation methods, peasant.',
          misconception: 'Students often think commercialisation means "farmers started selling crops in markets instead of consuming them,".',
          parts: [
                { id: 'a', prompt: 'Compare the impact of commercialisation on jute cultivators in Bengal versus cotton cultivators in western India (Maharashtra/Gujarat), considering land tenure.', answer: 'Jute in Bengal (zamindari): Cultivators were tenants-at-will with no land rights',
                  options: ['Jute in Bengal (zamindari): Cultivators were tenants-at-will with no land rights', 'farmers started selling crops in markets instead of consuming them'],
                  hint: 'Review Node 004 (Land Revenue Systems) focusing on revenue fixation methods, peasant indebtedness.',
                  misconception: 'Students often think commercialisation means "farmers started selling crops in markets instead of consuming them," implying a voluntary.' }
          ],
            remediations: { 'commercialisation-means-farmers-started-selling': { steps: ['Revisit Node 004 (land revenue systems) to understand how zamindari/ryotwari created cash revenue imperatives.', 'For each crop, identify the specific coercive mechanism: indigo = tinkathia + dadon; cotton = moneylender advance.', 'Calculate the "terms of trade" for each: peasant sale price vs.', 'Trace how revenue + debt + low price = no surplus for food purchase.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_006', difficulty: 'standard',
          question: 'Deindustrialisation refers to the deliberate and systematic decline of India\'s.',
          hint: 'Revisit c11_eco_cbse_01_001 (colonial exploitation framework) and c6_economics_ch12_003.',
          misconception: 'Students believe deindustrialisation happened because Indian handicrafts were "inefficient" or "could not compete" with.',
          parts: [
                { id: 'a', prompt: 'Explain why the famous Daccai muslin industry collapsed even though its products were globally renowned for quality, using the concepts of discriminatory.', answer: 'Daccai muslin collapsed',
                  options: ['Daccai muslin collapsed', 'lack of demand', 'inferior quality', 'inefficient'],
                  hint: 'Revisit c11_eco_cbse_01_001 (colonial exploitation framework) and c6_economics_ch12_003.',
                  misconception: 'Students believe deindustrialisation happened because Indian handicrafts were "inefficient" or "could not compete" with modern technology.' },
                { id: 'b', prompt: 'In 1850, India exported £3 million worth of raw cotton to Britain and imported £8 million worth of British cotton textiles.', answer: '1850 trade balance: -£5 million (imports > exports)',
                  options: ['1850 trade balance: -£5 million (imports > exports)', 'inefficient', 'could not compete'],
                  hint: 'Revisit c11_eco_cbse_01_001 (colonial exploitation framework) and c6_economics_ch12_003.',
                  misconception: 'Students believe deindustrialisation happened because Indian handicrafts were "inefficient" or "could not compete" with modern technology.' }
          ],
            remediations: { 'deindustrialisation-happened-because-indian-hand': { steps: ['Show the 1813 Charter Act (ended East India Company monopoly, opened India to British manufacturers) and 1882 Indian.', 'Compare pre-1800 export data — India exported £2.3 million textiles in 1790; by 1850 exports near zero while imports.', 'Have students calculate the effective protection rate: British cloth sold at 1/10th price not due to productivity but.', 'Contrast with Japan (Meiji Restoration) — same period, protected infant industries, built capital goods sector.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
