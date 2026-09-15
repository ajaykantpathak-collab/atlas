import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eco_ch03_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eco_ch03_p2: SimDef = {
    id: 'v3_c11_eco_ch03_p2',
    title: 'Economic Reforms since 1991 · Part 2/2',
    subtitle: 'Follow the 1991 crisis from drained reserves to the LPG reforms it forced.',
    classLevel: 11, subject: 'economics', topic: 'Economic Reforms since 1991 · Part 2/2',
    chapters: ['c11_eco_ch03'],
    nodeIds: ['c11_eco_cbse_03_007', 'c11_eco_cbse_03_008', 'c11_eco_cbse_03_009', 'c11_eco_cbse_03_010', 'c11_eco_cbse_03_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a policy analyst dissecting the 1991 bailout', intro: 'A household spending ₹70,000 on ₹50,000 income eventually meets a lender with conditions. In 1991, that household was India.', goal: 'Explain the balance-of-payments crisis and distinguish liberalisation, privatisation and globalisation.' },
    discovery: {
        question: 'In July 1991 the rupee was devalued 18-19%, and many accounts call that the moment the crisis \'began.\' What does the timeline actually show?',
        options: ['Devaluation was the corrective response — reserves had already collapsed to roughly two weeks of imports', 'Devaluation caused the crisis by shrinking reserves overnight', 'The crisis was invented to justify an IMF loan', 'Reserves were healthy; only the fiscal deficit triggered reform'],
        answer: 'Devaluation was the corrective response — reserves had already collapsed to roughly two weeks of imports',
        hook: 'Cause and cure get confused when they sit a week apart — the devaluation was medicine for a decade of deficits, not the disease.',
    },
    teaching: [
        { title: 'Privatisation: Disinvestment and Navratna Policy', text: 'Privatisation is the process of transferring ownership, management, or control of public sector enterprises (PSEs) to the private sector, primarily through disinvestment (sale of government equity.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eco_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compute import cover from reserves and monthly imports, then separate liberalisation from privatisation in the LPG package.',
        labels: ['Privatisation: Disinvestment and Navratna', 'Globalisation: WTO and Trade', 'Globalisation: FDI Policy', 'Assessment of LPG Reforms'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eco_cbse_03_007', title: 'Privatisation: Disinvestment and Navratna Policy',
          caseStudy: { intro: 'Imagine you see a news headline: "Government sells 5% stake in LIC for ₹21,000 crore — largest IPO ever." Ask: Why does the government sell shares in.',
            decisions: [{ prompt: 'Define disinvestment and state its two primary objectives as per the 1991 reform framework.', options: [
                { text: 'Disinvestment is the sale of government equity in public sector enterprises to private', outcome: 'Disinvestment is the sale of government equity in public sector enterprises to private investors.' },
                { text: 'to reduce fiscal deficit only', outcome: 'Not quite — Students believe "disinvestment = privatisation" and that *all* disinvestment reduces government.', reveals: 'disinvestment-privatisation-and-that-all' },
                { text: 'disinvestment = privatisation', outcome: 'Not quite — Students believe "disinvestment = privatisation" and that *all* disinvestment reduces government.', reveals: 'disinvestment-privatisation-and-that-all' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_03_008', title: 'Globalisation: WTO and Trade Liberalisation',
          scaffold: { problem: 'India\'s bound tariff on wheat is 100% (WTO commitment). Applied MFN tariff is 40%. International wheat price (CIF) is ₹1,800/quintal.',
            steps: [
            { text: 'Identify given data — Bound rate = 100%, Applied rate = 40%, P_w = ₹1,800/q, P_d = ₹2,300/q' },
            { text: 'Calculate tariff water = Bound rate - Applied rate = 100% - 40% = 60 percentage points.' },
            { text: 'Calculate border price with applied tariff = P_w × (1 + Applied rate) = 1800 × 1.40 = ₹2,520/q.' },
            { text: 'Calculate NPR = [(P_d - P_w) / P_w] × 100 = [(2300 - 1800) / 1800] × 100 = 27.8%.' },
            { text: 'Calculate implicit tariff equivalent = [(P_d - P_w) / P_w] × 100 = 27.8% (same as NPR here since no QR).' },
            { text: 'WTO compliance check — Applied rate (40%) ≤ Bound rate (100%), so no violation.', faded: true, blankAnswer: '(a) Tariff water = 60 pp, (b) Border price = ₹2,520/q, (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_03_009', title: 'Globalisation: FDI Policy and Capital Inflows',
          scaffold: { problem: 'The RBI reports FDI equity inflows of ₹1,80,000 crore in 2021-22 and ₹2,20,000 crore in 2022-23.',
            steps: [
            { text: 'Convert ₹ values to US$ using the respective average exchange rates.' },
            { text: '2021-22 FDI in $ = 1,80,000 / 74.5 = $2,416 million. 2022-23 FDI in $ = 2,20,000 / 80.2 = $2,743 million.' },
            { text: 'Growth in $ terms = (2,743 - 2,416) / 2,416 × 100 = 13.5%.' },
            { text: 'Growth in ₹ terms = (2,20,000 - 1,80,000) / 1,80,000 × 100 = 22.2%.' },
            { text: 'The difference (22.2% vs 13.5%) arises because the rupee depreciated (₹74.5 → ₹80.2), inflating the ₹ value even if $.', faded: true, blankAnswer: 'Growth in US$ terms = 13.5%; Growth in ₹ terms = 22.2%. The.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_03_010', title: 'Assessment of LPG Reforms: Growth and Inequality',
          scaffold: { problem: 'Using Table 3.1 data, compute the employment-weighted GDP growth for 2021-22 assuming employment shares: Agriculture 42%, Industry 25%.',
            steps: [
            { text: 'Extract 2021-22 sectoral GVA growth rates from Table 3.1: Agriculture 4.8%, Industry 12.7%, Services 9.2% (all marked *.' },
            { text: 'Recall employment shares (NSSO PLFS 2021-22 approx.): Agriculture 42%, Industry 25%, Services 33%.' },
            { text: 'Apply employment-weighted growth formula: (4.8 × 0.42) + (12.7 × 0.25) + (9.2 × 0.33).' },
            { text: 'Calculate: 2.016 + 3.175 + 3.036 = 8.227%.' },
            { text: 'Compare with reported GDP growth 9.4%. Gap = 9.4 - 8.227 = 1.173 percentage points.' },
            { text: 'Interpret: The 1.17 pp gap arises because GDP weights by output share (services ~55%), not employment share.', faded: true, blankAnswer: 'Employment-weighted growth = 8.23% vs reported GDP growth.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_03_011', title: 'Assessment of LPG Reforms: Agriculture and Employment Impact',
          scaffold: { problem: 'According to NSSO surveys, India\'s workforce grew from 340 million in 1993-94 to 397 million in 2004-05 (11-year period).',
            steps: [
            { text: 'Identify given data: Employment₁ = 340 million (1993-94), Employment₂ = 397 million (2004-05), GDP CAGR = 6.0% per.' },
            { text: 'Calculate % change in employment: ((397 - 340) / 340) × 100 = (57/340) × 100 = 16.76% over 11 years.' },
            { text: 'Calculate cumulative GDP growth over 11 years at 6% CAGR: (1.06)^11 - 1 = 1.898 - 1 = 0.898 = 89.8%.' },
            { text: 'Compute employment elasticity = %ΔEmployment / %ΔGDP = 16.76% / 89.8% = 0.187.' },
            { text: 'Interpret: Elasticity < 0.2 indicates very low employment intensity — for every 1% GDP growth, employment grew only.', faded: true, blankAnswer: 'Employment elasticity = 0.187 (unitless), indicating highly.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_03_007', title: 'A real-world call',
          caseStudy: { intro: 'The 1991 reforms opened India\'s economy — growth accelerated, inequality widened, and whole sectors of protected industry collapsed. Thirty years later, both results are still visible.',
            decisions: [{ prompt: 'Were the reforms worth it?', options: [
                { text: 'Yes — the alternative was stagnation', outcome: 'Largely supported by growth data; the cost is measured in the industries and communities that didn\'t survive the transition.' },
                { text: 'Yes, but the safety net should have come first', outcome: 'The critique most economists accept now — reform without protection for the displaced made the cost unnecessarily brutal.' },
                { text: 'Mixed — worth asking the workers who lost, not just the economy that grew', outcome: 'The distributional answer — the aggregate won; the question is whether \'the economy\' includes the people it ran over.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a mock-parliament session on \'Who caused 1991?\', a member argues: \'The crisis was caused by the July 1991 devaluation of the rupee — before that, India\'s economy was stable. Also, India basically had no exports, which is why we ran out of dollars.\'',
            decisions: [{ prompt: 'Untangle cause from response.', options: [
                { text: 'Devaluation was the medicine, not the disease: the causal chain ran 1980s fiscal deficits → excess demand → rising imports + appreciated real exchange rate → current account deficit → reserves down to ~2 weeks of imports → forced IMF loan whose package included devaluation. And India did export — textiles, gems, engineering goods — but export growth lagged import growth.', outcome: 'Reversing response and cause hides the real lesson: persistent twin deficits, not a single currency move, drain reserves.' },
                { text: 'The member is right — reserves were fine until the rupee was devalued in July 1991.', outcome: 'Reserves had already collapsed to roughly US$1.2 billion before July; devaluation was a condition of the emergency IMF support, not the trigger.', reveals: 'devaluation-caused-the-crisis' },
                { text: 'Right that exports were the problem — India exported nothing in the 1980s.', outcome: 'Exports existed and grew; the failure was relative — import growth outpaced export growth while the fixed nominal rate plus inflation appreciated the real exchange rate.', reveals: 'india-had-no-exports' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_03_011', title: 'You made it',
          caseStudy: { intro: '1991 wasn\'t a choice to open up — it was a bill coming due, and the conditions rewired how India produces and trades.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_007', difficulty: 'standard',
          question: 'Privatisation is the process of transferring ownership, management, or control.',
          hint: 'Revisit c11_eco_cbse_03_001 (BoP crisis) and c9_eco_ch1_9 (mixed economy) — focus on the.',
          misconception: 'Students believe "disinvestment = privatisation" and that *all* disinvestment reduces government ownership below 51%.',
          parts: [
                { id: 'a', prompt: 'In 2022-23, the disinvestment target was ₹65,000 crore and actual receipts were ₹46,000 crore. Calculate the shortfall percentage.', answer: 'Shortfall = ₹65,000 - ₹46,000 = ₹19,000 crore',
                  options: ['Shortfall = ₹65,000 - ₹46,000 = ₹19,000 crore', 'disinvestment = privatisation', 'ONGC was privatised in 2010'],
                  hint: 'Revisit c11_eco_cbse_03_001 (BoP crisis) and c9_eco_ch1_9 (mixed economy) — focus on the *fiscal.',
                  misconception: 'Students believe "disinvestment = privatisation" and that *all* disinvestment reduces government ownership below 51%.' }
          ],
            remediations: { 'disinvestment-privatisation-and-that-all': { steps: ['Draw a 2×2 matrix: rows = Ownership (Majority Govt / Minority Govt / Zero Govt), columns = Management (Govt / Private).', 'For each cell, write one Indian example (e.g., LIC IPO → Majority Govt + Govt Mgmt; Air India → Zero Govt + Private.', 'Memorise the Navratna criteria table (net worth, profit, listing) from NCERT Box 3.1.', 'Re-read the critique paragraph in NCERT (p.51) — underline "undervalued," "revenue deficit," "social infrastructure."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_008', difficulty: 'standard',
          question: 'Globalisation in the Indian context refers to the systematic integration of the.',
          hint: 'Revisit Class 10 Ch4 Globalisation nodes (c10_eco_cbse_04_003 to 04_005) and Class 11.',
          misconception: 'Students believe "WTO forces India to eliminate all tariffs and subsidies." In reality, WTO only binds *maximum*.',
          parts: [
                { id: 'a', prompt: 'India agreed to reduce its bound tariff rate on industrial goods from an average of 100% (1990) to 40% by 2005 under WTO.', answer: 'Tariff water = Bound rate (40%) - Applied rate (15%) = 25 percentage points',
                  options: ['Tariff water = Bound rate (40%) - Applied rate (15%) = 25 percentage points', 'water is 15%', 'it doesn\'t matter', 'WTO forces India to eliminate all tariffs and subsidies'],
                  hint: 'Revisit Class 10 Ch4 Globalisation nodes (c10_eco_cbse_04_003 to 04_005) and Class 11.',
                  misconception: 'Students believe "WTO forces India to eliminate all tariffs and subsidies." In reality, WTO only binds *maximum* (bound) tariff.' }
          ],
            remediations: { 'wto-forces-india-to-eliminate': { steps: ['Distinguish bound vs applied tariff using India\'s Tariff Schedule (ITC-HS) — pick 5 items, find bound rate (WTO IDB).', 'Map India\'s agricultural subsidies by box colour using Economic Survey data — classify fertiliser, power, irrigation.', 'Read WTO dispute DS503 (US — Countervailing Measures on Indian Steel) to see how India defended export subsidies under.', 'Re-attempt Diagnostic Q2 and Q5 with this data.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "WTO forces India to eliminate all tariffs and subsidies." In reality, WTO only binds *maximum*.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "India\'s trade liberalisation under WTO has been asymmetric—developed countries maintained high agricultural subsidies and non-tariff.', answer: 'The statement is largely correct',
                  options: ['The statement is largely correct', 'WTO forces India to eliminate all tariffs and subsidies', 'liberalisation commitments', 'zero tariffs'],
                  hint: 'Revisit Class 10 Ch4 Globalisation nodes (c10_eco_cbse_04_003 to 04_005) and Class 11.',
                  misconception: 'Students believe "WTO forces India to eliminate all tariffs and subsidies." In reality, WTO only binds *maximum* (bound) tariff.' },
                { id: 'b', prompt: 'Design a trade policy response for India if the EU imposes a Carbon Border Adjustment Mechanism (CBAM) on steel/aluminium imports from 2026, arguing.', answer: 'legal basis at WTO, (',
                  options: ['legal basis at WTO, (', 'WTO forces India to eliminate all tariffs and subsidies', 'liberalisation commitments', 'zero tariffs'],
                  hint: 'Revisit Class 10 Ch4 Globalisation nodes (c10_eco_cbse_04_003 to 04_005) and Class 11.',
                  misconception: 'Students believe "WTO forces India to eliminate all tariffs and subsidies." In reality, WTO only binds *maximum* (bound) tariff.' }
          ],
            remediations: { 'wto-forces-india-to-eliminate': { steps: ['Distinguish bound vs applied tariff using India\'s Tariff Schedule (ITC-HS) — pick 5 items, find bound rate (WTO IDB).', 'Map India\'s agricultural subsidies by box colour using Economic Survey data — classify fertiliser, power, irrigation.', 'Read WTO dispute DS503 (US — Countervailing Measures on Indian Steel) to see how India defended export subsidies under.', 'Re-attempt Diagnostic Q2 and Q5 with this data.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_009', difficulty: 'standard',
          question: 'FDI policy refers to the regulatory framework that governs the entry.',
          hint: 'Revisit the 1991 BoP crisis (node c11_eco_cbse_03_001) and the foreign exchange reforms.',
          misconception: 'Students often treat "FDI policy liberalisation" as synonymous with "100% FDI allowed in all sectors".',
          parts: [
                { id: 'a', prompt: 'In 2020, India raised the FDI cap in defence manufacturing from 49% (automatic route up to 49%, government route beyond) to 74% under automatic route.', answer: 'capital inflows, (',
                  options: ['capital inflows, (', '100% FDI is now allowed', 'automatic route for 74%', 'no limit'],
                  hint: 'Revisit the 1991 BoP crisis (node c11_eco_cbse_03_001) and the foreign exchange reforms (node.',
                  misconception: 'Students often treat "FDI policy liberalisation" as synonymous with "100% FDI allowed in all sectors".' }
          ],
            remediations: { 'students-often-treat-fdi-policy': { steps: ['Create a two-column table: Column A = "Automatic Route Sectors" (e.g., manufacturing, IT, renewable energy), Column.', 'Pick one recent news item (e.g., "FDI in space sector liberalised") and identify which route applies.', 'Plot a simple line graph of FDI vs FII inflows (2015-2023) using RBI data; observe FII volatility vs FDI stability.', 'Re-read the definition of "lasting interest" and "control" to internalise the FDI-FII distinction.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_010', difficulty: 'standard',
          question: 'The assessment of LPG reforms evaluates the impact of Liberalisation.',
          hint: 'If stuck, revisit Class 10 GDP measurement (c10_eco_cbse_02_003) and Class 8.',
          misconception: 'Students believe "higher GDP growth automatically reduces inequality" because they confuse aggregate growth with.',
          parts: [
                { id: 'a', prompt: 'State the GDP growth rate of the services sector during 2007-12 and 2021-22 from Table 3.1, and identify which sector had the lowest growth in 2021-22.', answer: 'Services sector grew at 10% (2007-12) and 9.2% (2021-22)',
                  options: ['Services sector grew at 10% (2007-12) and 9.2% (2021-22)', 'higher GDP growth automatically reduces inequality'],
                  hint: 'If stuck, revisit Class 10 GDP measurement (c10_eco_cbse_02_003) and Class 8 percentage/exponential.',
                  misconception: 'Students believe "higher GDP growth automatically reduces inequality" because they confuse aggregate growth with per-capita income.' },
                { id: 'b', prompt: 'Explain why a rise in aggregate GDP growth from 5.6% (1980-91) to 9.4% (2021-22) does not necessarily mean proportional improvement in living standards for.', answer: 'Aggregate GDP growth is a weighted average',
                  options: ['Aggregate GDP growth is a weighted average', 'trickle-down', 'overall growth benefits all', 'higher GDP growth automatically reduces inequality'],
                  hint: 'If stuck, revisit Class 10 GDP measurement (c10_eco_cbse_02_003) and Class 8 percentage/exponential.',
                  misconception: 'Students believe "higher GDP growth automatically reduces inequality" because they confuse aggregate growth with per-capita income.' },
                { id: 'c', prompt: 'Calculate the compound annual growth rate (CAGR) of FDI inflows from US$100 million (1990-91) to US$23 billion (2022-23) over 32 years. Show steps.', answer: 'Step 1: Convert to same units: 100 million = 0.1 billion',
                  options: ['Step 1: Convert to same units: 100 million = 0.1 billion', 'higher GDP growth automatically reduces inequality'],
                  hint: 'If stuck, revisit Class 10 GDP measurement (c10_eco_cbse_02_003) and Class 8 percentage/exponential.',
                  misconception: 'Students believe "higher GDP growth automatically reduces inequality" because they confuse aggregate growth with per-capita income.' },
                { id: 'd', prompt: 'Compare the industrial sector growth trajectory across four periods: 1980-91 (7.1%), 1992-2001 (6.5%), 2002-07 (9.4%), 2021-22 (12.7%*).', answer: 'GVA (Gross Value Added) = GDP + Subsidies - Indirect Taxes',
                  options: ['GVA (Gross Value Added) = GDP + Subsidies - Indirect Taxes', 'higher GDP growth automatically reduces inequality'],
                  hint: 'If stuck, revisit Class 10 GDP measurement (c10_eco_cbse_02_003) and Class 8 percentage/exponential.',
                  misconception: 'Students believe "higher GDP growth automatically reduces inequality" because they confuse aggregate growth with per-capita income.' }
          ],
            remediations: { 'higher-gdp-growth-automatically-reduces': { steps: ['Revisit Table 3.1. Calculate the employment-weighted growth: (Agriculture growth × 0.42) + (Industry growth × 0.25).', 'Compare with simple average.', 'Read NCERT paragraph on "growth concentrated only in select services... rather than vital sectors like agriculture."', 'Plot a simple bar chart of sectoral growth vs employment share — visualizing the divergence cures the aggregation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_011', difficulty: 'standard',
          question: 'The assessment of LPG reforms on agriculture and employment evaluates how.',
          hint: 'Review c11_eco_cbse_03_002 (LPG framework) and c11_eco_cbse_03_008 (WTO/trade.',
          misconception: 'Students believe "globalisation automatically helps agriculture because India can export more." In reality, the NCERT.',
          parts: [
                { id: 'a', prompt: 'State the agriculture sector growth rate during 1980-91 and 1992-2001 as per Table 3.1 in the NCERT textbook.', answer: 'Agriculture growth was 3.6% during 1980-91 and declined to 3.3% during 1992-2001',
                  options: ['Agriculture growth was 3.6% during 1980-91 and declined to 3.3% during 1992-2001', 'globalisation automatically helps agriculture', 'growth increased', '"globalisation automatically helps agriculture'],
                  hint: 'Review c11_eco_cbse_03_002 (LPG framework) and c11_eco_cbse_03_008 (WTO/trade liberalisation).',
                  misconception: 'Students believe "globalisation automatically helps agriculture because India can export more." In reality, the NCERT shows: (a).' },
                { id: 'b', prompt: 'Using the Mahadeva case study: if fertiliser cost rose by ₹2,000 per half-acre due to subsidy removal, and imported edible oil reduced groundnut price.', answer: 'Step 1: Original revenue = 2 quintals × ₹7,000 = ₹14,000',
                  options: ['Step 1: Original revenue = 2 quintals × ₹7,000 = ₹14,000', 'globalisation automatically helps agriculture', '"globalisation automatically helps agriculture'],
                  hint: 'Review c11_eco_cbse_03_002 (LPG framework) and c11_eco_cbse_03_008 (WTO/trade liberalisation).',
                  misconception: 'Students believe "globalisation automatically helps agriculture because India can export more." In reality, the NCERT shows: (a).' },
                { id: 'c', prompt: 'Compare the growth rates of agriculture, industry, and services during 2007-12 from Table 3.1.', answer: '2007-12: Agriculture 3.2%, Industry 7.4%, Services 10%',
                  options: ['2007-12: Agriculture 3.2%, Industry 7.4%, Services 10%', 'industry grew fastest', 'balanced growth', 'globalisation automatically helps agriculture'],
                  hint: 'Review c11_eco_cbse_03_002 (LPG framework) and c11_eco_cbse_03_008 (WTO/trade liberalisation).',
                  misconception: 'Students believe "globalisation automatically helps agriculture because India can export more." In reality, the NCERT shows: (a).' }
          ],
            remediations: { 'globalisation-automatically-helps-agriculture-be': { steps: ['Re-read the Mahadeva case study (NCERT page 49) and identify three specific reform measures that hurt him (subsidy cut.', 'Plot agriculture vs services growth from Table 3.1 for all five periods (1980-91, 1992-2001, 2002-07, 2007-12, 2021-22).', 'Calculate employment elasticity for 1992-2001: if GDP grew 6.4% and employment grew ~1% (NSSO data), elasticity = 1/6.4.', 'Write one paragraph linking low elasticity to "skill mismatch: services need educated workers; displaced farm workers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
