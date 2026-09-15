import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eco_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eco_ch03_p1: SimDef = {
    id: 'v3_c11_eco_ch03_p1',
    title: 'Economic Reforms since 1991 · Part 1/2',
    subtitle: 'Follow the 1991 crisis from drained reserves to the LPG reforms it forced.',
    classLevel: 11, subject: 'economics', topic: 'Economic Reforms since 1991 · Part 1/2',
    chapters: ['c11_eco_ch03'],
    nodeIds: ['c11_eco_cbse_03_001', 'c11_eco_cbse_03_002', 'c11_eco_cbse_03_003', 'c11_eco_cbse_03_004', 'c11_eco_cbse_03_005', 'c11_eco_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a policy analyst dissecting the 1991 bailout', intro: 'A household spending ₹70,000 on ₹50,000 income eventually meets a lender with conditions. In 1991, that household was India.', goal: 'Explain the balance-of-payments crisis and distinguish liberalisation, privatisation and globalisation.' },
    discovery: {
        question: 'In July 1991 the rupee was devalued 18-19%, and many accounts call that the moment the crisis \'began.\' What does the timeline actually show?',
        options: ['Devaluation was the corrective response — reserves had already collapsed to roughly two weeks of imports', 'Devaluation caused the crisis by shrinking reserves overnight', 'The crisis was invented to justify an IMF loan', 'Reserves were healthy; only the fiscal deficit triggered reform'],
        answer: 'Devaluation was the corrective response — reserves had already collapsed to roughly two weeks of imports',
        hook: 'Cause and cure get confused when they sit a week apart — the devaluation was medicine for a decade of deficits, not the disease.',
    },
    teaching: [
        { title: 'Background: Balance of Payments Crisis of 1991', text: 'The Balance of Payments Crisis of 1991 was a severe external sector crisis where India\'s foreign exchange reserves plummeted to barely two weeks of import cover (approximately US$1.2 billion.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eco_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compute import cover from reserves and monthly imports, then separate liberalisation from privatisation in the LPG package.',
        labels: ['Background: Balance of Payments', 'New Economic Policy: LPG', 'Liberalisation: Industrial Sector Reforms', 'Liberalisation: Financial Sector Reforms', 'Liberalisation: Tax Reforms', 'Liberalisation: Foreign Exchange Reforms'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_03_001', title: 'Background: Balance of Payments Crisis of 1991',
          scaffold: { problem: 'In 1990-91, India\'s GDP was ₹5,86,212 crore. The gross fiscal deficit was 8.4% of GDP.',
            steps: [
            { text: 'Identify given data — GDP = ₹5,86,212 crore; fiscal deficit = 8.4% of GDP; CAD = $9.7 billion; exchange rate.' },
            { text: 'Compute fiscal deficit in ₹ crore = 8.4% × 5,86,212 = 0.084 × 5,86,212 = ₹49,242 crore.' },
            { text: 'Convert CAD to ₹ crore = $9.7 billion × ₹17.50/$ = ₹169.75 billion = ₹16,975 crore.' },
            { text: 'Convert net external borrowing to ₹ crore = $3.2 billion × ₹17.50/$ = ₹56 billion = ₹5,600 crore.' },
            { text: 'Proportion of fiscal deficit financed by foreign borrowing = ₹5,600 / ₹49,242 = 11.4%.' },
            { text: 'Interpret — only ~11% of fiscal deficit came from abroad; the rest was domestic borrowing (market loans, RBI ad hoc.', faded: true, blankAnswer: '(a) ₹49,242 crore, (b) ₹16,975 crore, (c) 11.4%' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_03_004', title: 'Liberalisation: Financial Sector Reforms and Banking',
          scaffold: { problem: 'In 1991, a public sector bank had NDTL of ₹5,000 crore. CRR = 15%, SLR = 38.5%.',
            steps: [
            { text: 'Calculate 1991 locked funds = (0.15 + 0.385) × 5,000 = ₹2,675 crore. Lendable = ₹2,325 crore.' },
            { text: '1991 interest income = (Loans: 2,325 × 11%) + (SLR: 1,925 × 6%) + (CRR: 750 × 0%) = ₹255.75 + ₹115.5 + 0 = ₹371.25.' },
            { text: 'Calculate 2024 locked funds = (0.045 + 0.18) × 50,000 = ₹11,250 crore. Lendable = ₹38,750 crore.' },
            { text: '2024 interest income = (Loans: 38,750 × 9%) + (SLR: 9,000 × 7%) + (CRR: 2,250 × 3.35%) = ₹3,487.5 + ₹630 + ₹75.375.' },
            { text: 'Compare *per ₹100 NDTL*: 1991 = ₹371.25/5,000 = ₹7.425; 2024 = ₹4,192.875/50,000 = ₹8.386.', faded: true, blankAnswer: 'Annual interest income per ₹100 NDTL increased from ₹7.43.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_03_005', title: 'Liberalisation: Tax Reforms and Fiscal Policy',
          scaffold: { problem: 'In 1990-91, India\'s gross tax revenue was ₹1,10,000 crore and GDP was ₹5,86,000 crore.',
            steps: [
            { text: 'Identify the given data — tax revenue and GDP for two time points (1990-91 and 2000-01).' },
            { text: 'Calculate tax-GDP ratio for 1990-91 = (1,10,000 / 5,86,000) × 100 = 18.77%.' },
            { text: 'Calculate tax-GDP ratio for 2000-01 = (2,60,000 / 20,00,000) × 100 = 13.00%.' },
            { text: 'Compute percentage change in tax revenue = ((2,60,000 - 1,10,000) / 1,10,000) × 100 = 136.36%.' },
            { text: 'Compute percentage change in GDP = ((20,00,000 - 5,86,000) / 5,86,000) × 100 = 241.30%.' },
            { text: 'Calculate tax buoyancy = 136.36% / 241.30% = 0.565.' },
            { text: 'Interpret — buoyancy < 1 means tax revenue grew slower than GDP; the falling tax-GDP ratio (18.77% → 13.00%) confirms.', faded: true, blankAnswer: '1990-91 tax-GDP ratio = 18.77%; 2000-01 tax-GDP ratio.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_03_006', title: 'Liberalisation: Foreign Exchange Reforms and Rupee Devaluation',
          scaffold: { problem: 'An Indian textile exporter sells shirts to a US buyer at $15 per shirt. In June 1991, the exchange rate was ₹21.14/$.',
            steps: [
            { text: 'Identify the economic concept — devaluation increases domestic currency value of foreign currency earnings.' },
            { text: 'Calculate pre-devaluation rupee revenue: Revenue_old = $15 × ₹21.14 = ₹317.10 per shirt.' },
            { text: 'Calculate post-devaluation rupee revenue: Revenue_new = $15 × ₹25.80 = ₹387.00 per shirt.' },
            { text: 'Compute profit margins: Profit_old = ₹317.10 - ₹200 = ₹117.10; Profit_new = ₹387.00 - ₹200 = ₹187.00.' },
            { text: 'Percentage change in profit = [(187 - 117.10) / 117.10] × 100 = 59.7% increase.' },
            { text: 'Economic interpretation — devaluation acts as a windfall gain for exporters with domestic cost structures, improving.', faded: true, blankAnswer: '(a) ₹317.10 → ₹387.00 per shirt; (b) ₹117.10 → ₹187.00 per.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_03_001', title: 'A real-world call',
          caseStudy: { intro: 'The 1991 reforms opened India\'s economy — growth accelerated, inequality widened, and whole sectors of protected industry collapsed. Thirty years later, both results are still visible.',
            decisions: [{ prompt: 'Were the reforms worth it?', options: [
                { text: 'Yes — the alternative was stagnation', outcome: 'Largely supported by growth data; the cost is measured in the industries and communities that didn\'t survive the transition.' },
                { text: 'Yes, but the safety net should have come first', outcome: 'The critique most economists accept now — reform without protection for the displaced made the cost unnecessarily brutal.' },
                { text: 'Mixed — worth asking the workers who lost, not just the economy that grew', outcome: 'The distributional answer — the aggregate won; the question is whether \'the economy\' includes the people it ran over.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a mock-parliament session on \'Who caused 1991?\', a member argues: \'The crisis was caused by the July 1991 devaluation of the rupee — before that, India\'s economy was stable. Also, India basically had no exports, which is why we ran out of dollars.\'',
            decisions: [{ prompt: 'Untangle cause from response.', options: [
                { text: 'Devaluation was the medicine, not the disease: the causal chain ran 1980s fiscal deficits → excess demand → rising imports + appreciated real exchange rate → current account deficit → reserves down to ~2 weeks of imports → forced IMF loan whose package included devaluation. And India did export — textiles, gems, engineering goods — but export growth lagged import growth.', outcome: 'Reversing response and cause hides the real lesson: persistent twin deficits, not a single currency move, drain reserves.' },
                { text: 'The member is right — reserves were fine until the rupee was devalued in July 1991.', outcome: 'Reserves had already collapsed to roughly US$1.2 billion before July; devaluation was a condition of the emergency IMF support, not the trigger.', reveals: 'devaluation-caused-the-crisis' },
                { text: 'Right that exports were the problem — India exported nothing in the 1980s.', outcome: 'Exports existed and grew; the failure was relative — import growth outpaced export growth while the fixed nominal rate plus inflation appreciated the real exchange rate.', reveals: 'india-had-no-exports' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: '1991 wasn\'t a choice to open up — it was a bill coming due, and the conditions rewired how India produces and trades.',
            decisions: [{ prompt: 'What comes next? Economic Reforms since 1991 · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Economic Reforms since 1991 · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_001', difficulty: 'standard',
          question: 'The Balance of Payments Crisis of 1991 was a severe external sector crisis.',
          hint: 'If stuck, revisit Class 10 GDP and sectoral accounting (c10_eco_cbse_02_003) and RBI\'s.',
          misconception: 'Students often believe the 1991 crisis was caused *by* the rupee devaluation in July 1991, confusing the policy.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Balance of Payments Crisis of 1991 was a severe external sector crisis where India\'s',
                  options: ['The Balance of Payments Crisis of 1991 was a severe external sector crisis where India\'s', 'The New Economic Policy (NEP) of 1991 is a comprehensive set of economic reforms', 'Industrial sector liberalisation refers to the systematic dismantling of government', 'Financial Sector Reforms under Liberalisation refer to the systematic deregulation and'],
                  hint: 'If stuck, revisit Class 10 GDP and sectoral accounting (c10_eco_cbse_02_003) and RBI\'s reserve.',
                  misconception: 'Students often believe the 1991 crisis was caused *by* the rupee devaluation in July 1991, confusing the policy response with the cause.' }
          ],
            remediations: { 'the-1991-crisis-was-caused': { steps: ['Revisit the identity: Current Account Deficit = (Investment - Savings) + (Government Spending - Tax Revenue).', 'Plot the real effective exchange rate (REER) index 1980-91 — it appreciated ~20% due to fixed nominal rate + higher.', 'Trace the causal chain: Fiscal deficit ↑ → domestic demand ↑ → imports ↑ + interest rates ↑ → capital inflows.', 'Contrast with 1991-92: devaluation (nominal ↓ 18%, real ↓ 15%) + fiscal consolidation (deficit ↓ to 5.7%) → current.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_002', difficulty: 'standard',
          question: 'The New Economic Policy (NEP) of 1991 is a comprehensive set of economic.',
          hint: 'Revisit c11_eco_cbse_03_001 Section 3.2: focus on the sequence — fiscal deficit →.',
          misconception: 'Students equate "Liberalisation" with "Privatisation" — thinking both mean "selling government companies." In reality.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The New Economic Policy (NEP) of 1991 is a comprehensive set of economic reforms',
                  options: ['The New Economic Policy (NEP) of 1991 is a comprehensive set of economic reforms', 'The Balance of Payments Crisis of 1991 was a severe external sector crisis where India\'s', 'Industrial sector liberalisation refers to the systematic dismantling of government', 'Financial Sector Reforms under Liberalisation refer to the systematic deregulation and'],
                  hint: 'Revisit c11_eco_cbse_03_001 Section 3.2: focus on the sequence — fiscal deficit → borrowing →.',
                  misconception: 'Students equate "Liberalisation" with "Privatisation" — thinking both mean "selling government companies." In reality, Liberalisation.' }
          ],
            remediations: { 'students-equate-liberalisation-with-privatisatio': { steps: ['If a student conflates the two, do this 3-step fix: (1) Draw two columns: "New Private Firm Enters" vs "Govt Sells.', '(2) Ask: "Which generates revenue for government?" Only Privatisation.', '(3) Ask: "Which increases competition immediately?" Both, but Liberalisation does so by expanding the player pool.', 'Use the Navratna example (Box 3.1): granting autonomy is Liberalisation-lite; selling equity is Privatisation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_003', difficulty: 'standard',
          question: 'Industrial sector liberalisation refers to the systematic dismantling.',
          hint: 'If stuck, revisit c11_eco_cbse_03_001 (BoP crisis) and c11_eco_cbse_03_002 (LPG.',
          misconception: 'Students believe "abolition of industrial licensing = complete deregulation = all industries free to operate without.',
          parts: [
                { id: 'a', prompt: 'Why did the government retain industrial licensing for alcohol, cigarettes, hazardous chemicals, industrial explosives, electronics, aerospace, and drugs &.', answer: 'Licensing was retained for: (a) alcohol & cigarettes',
                  options: ['Licensing was retained for: (a) alcohol & cigarettes', 'these are profitable sectors'],
                  hint: 'If stuck, revisit c11_eco_cbse_03_001 (BoP crisis) and c11_eco_cbse_03_002 (LPG framework) to see.',
                  misconception: 'Students believe "abolition of industrial licensing = complete deregulation = all industries free to operate without any government.' },
                { id: 'b', prompt: 'Compare the pre-1991 and post-1991 industrial policy on the dimension of "firm size and scale".', answer: 'Pre-1991: Many goods (e.g., garments, toys, leather products) reserved for SSI',
                  options: ['Pre-1991: Many goods (e.g., garments, toys, leather products) reserved for SSI', 'employment loss in SSI'],
                  hint: 'If stuck, revisit c11_eco_cbse_03_001 (BoP crisis) and c11_eco_cbse_03_002 (LPG framework) to see.',
                  misconception: 'Students believe "abolition of industrial licensing = complete deregulation = all industries free to operate without any government.' }
          ],
            remediations: { 'abolition-of-industrial-licensing-complete': { steps: ['Create a two-column table: "Pre-1991 Controls" vs "Post-1991 Controls" using NCERT text.', 'Ask: "Which column has more items?" Students often find Column 2 longer.', 'Explain: Liberalisation changed the *type* of regulation (from entry/quantity to quality/safety/environment), not the.', 'Apply to a concrete case: "To set up a paint factory in 1990 vs 2024 — list permissions needed." This makes the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "abolition of industrial licensing = complete deregulation = all industries free to operate without.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Abolition of industrial licensing was sufficient to create a competitive industrial sector in India." Use evidence from the NCERT text.', answer: 'The statement is false',
                  options: ['The statement is false', 'yes, licensing removal created competition'],
                  hint: 'If stuck, revisit c11_eco_cbse_03_001 (BoP crisis) and c11_eco_cbse_03_002 (LPG framework) to see.',
                  misconception: 'Students believe "abolition of industrial licensing = complete deregulation = all industries free to operate without any government.' }
          ],
            remediations: { 'abolition-of-industrial-licensing-complete': { steps: ['Create a two-column table: "Pre-1991 Controls" vs "Post-1991 Controls" using NCERT text.', 'Ask: "Which column has more items?" Students often find Column 2 longer.', 'Explain: Liberalisation changed the *type* of regulation (from entry/quantity to quality/safety/environment), not the.', 'Apply to a concrete case: "To set up a paint factory in 1990 vs 2024 — list permissions needed." This makes the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_004', difficulty: 'standard',
          question: 'Financial Sector Reforms under Liberalisation refer to the systematic.',
          hint: 'If stuck, revisit **Class 10: "Loan Activities of Banks" (c10_eco_cbse_03_003)** and.',
          misconception: '**Misconception:** "Financial liberalisation means the RBI stopped regulating banks and let them do whatever they want.',
          parts: [
                { id: 'a', prompt: 'Explain why the Narasimham Committee (1991) recommended reducing SLR and CRR *gradually* rather than abolishing them immediately, linking your answer.', answer: '**Answer:** SLR financed the government\'s fiscal deficit by forcing banks to buy',
                  options: ['**Answer:** SLR financed the government\'s fiscal deficit by forcing banks to buy', 'to prevent inflation', 'to help banks earn more profit'],
                  hint: 'If stuck, revisit **Class 10: "Loan Activities of Banks" (c10_eco_cbse_03_003)** and **Class 11.',
                  misconception: '**Misconception:** "Financial liberalisation means the RBI stopped regulating banks and let them do whatever they want — no more CRR, SLR.' }
          ],
            remediations: { 'misconception-financial-liberalisation-means-the': { steps: ['**Revisit the Narasimham Committee I (1991) and II (1998) recommendations** — create a two-column table: "Pre-reform.', 'Map each: e.g., "Fixed lending rates → Base Rate/MCLR system with risk-based pricing"; "High SLR/CRR → Gradual.', '**Work through a numerical example:** Take a bank with ₹100 crore deposits.', 'Show balance sheet pre-1991 (₹53.5 cr in SLR+CRR, ₹46.5 cr loans) vs post-reform (₹22.5 cr in SLR+CRR, ₹77.5 cr loans.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_005', difficulty: 'standard',
          question: 'Tax reforms under liberalisation refer to the systematic restructuring.',
          hint: 'If stuck, revisit Class 11 Chapter 2 "Government Budget and Economy" — specifically the.',
          misconception: 'Students believe "lower tax rates automatically mean lower government revenue" and "GST is just a new name for VAT.".',
          parts: [
                { id: 'a', prompt: 'Calculate the tax-GDP ratio for India in 1990-91 and 2022-23 given: 1990-91 tax revenue ₹1,10,000 crore, GDP ₹5,86,000 crore; 2022-23 tax revenue ₹30,40,000.', answer: 'Step 1: 1990-91 tax-GDP ratio = (1,10,000 / 5,86,000) × 100 = 18.77%',
                  options: ['Step 1: 1990-91 tax-GDP ratio = (1,10,000 / 5,86,000) × 100 = 18.77%', 'reforms failed because ratio fell', 'lower tax rates automatically mean lower government revenue', 'GST is just a new name for VAT'],
                  hint: 'If stuck, revisit Class 11 Chapter 2 "Government Budget and Economy" — specifically the sections.',
                  misconception: 'Students believe "lower tax rates automatically mean lower government revenue" and "GST is just a new name for VAT." The first error.' },
                { id: 'b', prompt: 'Analyse the following statement: "The reduction in peak customs duty from 150% (1991) to 10-15% (post-reforms) and the introduction of GST have had opposite.', answer: 'The statement is partially accurate but oversimplified',
                  options: ['The statement is partially accurate but oversimplified', 'both reduced revenue', 'lower tax rates automatically mean lower government revenue', 'GST is just a new name for VAT'],
                  hint: 'If stuck, revisit Class 11 Chapter 2 "Government Budget and Economy" — specifically the sections.',
                  misconception: 'Students believe "lower tax rates automatically mean lower government revenue" and "GST is just a new name for VAT." The first error.' }
          ],
            remediations: { 'lower-tax-rates-automatically-mean': { steps: ['Draw a Laffer curve (revenue on Y-axis, tax rate on X-axis) — mark pre-1991 point on the downward slope (high rate, low.', 'Trace India\'s actual tax-GDP ratio from Economic Survey data: 1990-91 (18.8%), 2000-01 (13.5%), 2010-11 (10.5%).', 'Create a 3-stage flow chart: Manufacturer (excise) → Wholesaler (VAT) → Retailer (VAT) showing tax-on-tax; then GST.', 'Calculate effective tax rate on a ₹1000 product under old vs GST (assume 12% GST, 10% VAT + 12% excise cascading).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_006', difficulty: 'standard',
          question: 'Foreign Exchange Reforms refer to the 1991 policy shift where India devalued.',
          hint: 'Review c11_eco_cbse_03_001 (BoP Crisis) focusing on the reserve depletion timeline: March.',
          misconception: 'Students often believe "devaluation always causes inflation" as an absolute rule.',
          parts: [
                { id: 'a', prompt: 'Compare the impact of the 1991 devaluation on (a) an Indian importer of crude oil and (b) an Indian exporter of software services.', answer: 'an Indian importer of crude oil and (',
                  options: ['an Indian importer of crude oil and (', 'both benefit', 'devaluation always causes inflation', '"devaluation always causes inflation" as an absolute rule'],
                  hint: 'Review c11_eco_cbse_03_001 (BoP Crisis) focusing on the reserve depletion timeline: March 1991.',
                  misconception: 'Students often believe "devaluation always causes inflation" as an absolute rule.' }
          ],
            remediations: { 'devaluation-always-causes-inflation-as': { steps: ['Revisit the BoP crisis node (c11_eco_cbse_03_001) — calculate how many weeks of imports $1.1B covered at 1991 monthly.', 'Use the demand-supply framework from c6_economics_ch12_003: draw forex market diagram showing fixed rate above.', 'Show devaluation as moving fixed rate down to equilibrium, eliminating shortage.', 'Quantify: if oil imports = 30% of import bill, 22% devaluation raises oil import bill by 6.6% of total imports.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
