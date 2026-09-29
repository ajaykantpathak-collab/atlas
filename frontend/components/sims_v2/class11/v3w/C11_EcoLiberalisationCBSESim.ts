import type { SimDef } from '../../engine/types';
import C11_EcoLiberalisationCBSESim from '../../../simulations/c6_12_new/C11_EcoLiberalisationCBSESim';

/** v3 wrapped master — C11_EcoLiberalisationCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_ecoliberalisationcbsesim: SimDef = {
    id: 'v3w_c11_ecoliberalisationcbsesim',
    title: 'New Economic Policy: LPG Framework and Rationale',
    subtitle: 'This node covers the conceptual framework, rationale, and broad classification of NEP.',
    classLevel: 11, subject: 'economics', topic: 'New Economic Policy: LPG Framework and Rationale',
    chapters: [],
    nodeIds: ['c11_eco_cbse_03_002', 'c11_eco_cbse_03_003', 'c11_eco_cbse_03_004', 'c11_eco_cbse_03_005', 'c11_eco_cbse_03_006', 'c11_eco_cbse_03_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you run a small manufacturing unit in 1990: you need a government license to produce, cannot import.', goal: 'Master New Economic Policy: LPG Framework and Rationale.' },
    discovery: {
        question: 'Explain why the Narasimham Committee (1991) recommended reducing SLR and CRR *gradually* rather than abolishing them immediately, linking your answer to.',
        options: ['**Answer:** SLR financed the government\'s fiscal deficit by forcing banks to buy', 'to prevent inflation', 'to help banks earn more profit'],
        answer: '**Answer:** SLR financed the government\'s fiscal deficit by forcing banks to buy',
        hook: '**Misconception:** "Financial liberalisation means the RBI stopped regulating banks and let them do whatever they want.',
    },
    teaching: [
        { title: 'The New Economic Policy (NEP) of 1991 is a.', text: 'The New Economic Policy (NEP) of 1991 is a comprehensive set of economic reforms structured around three pillars — Liberalisation (removing government controls on private enterprise), Privatisation.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_eco_cbse_03_002', title: 'The New Economic Policy (NEP) of 1991.',
          scaffold: { problem: 'In 1990-91, India\'s import tariff on capital goods averaged 120%.',
            steps: [
            { text: 'Identify the economic concept — import tariff as a tax on capital goods raises the domestic price of investment,.' },
            { text: 'Recall the formula: Tariff payment = FOB price × Tariff rate. Pre-reform rate = 120% = 1.2; Post-reform rate = 25% =.' },
            { text: 'Calculate pre-reform tariff = $100,000 × 1.2 = $120,000. Post-reform tariff = $100,000 × 0.25 = $25,000.' },
            { text: 'Tariff savings = $120,000 - $25,000 = $95,000 per machine. At 1991 exchange rate (~₹25/$), this is ₹2.375 crore saved.' },
            { text: 'Interpret economically — the firm can now afford 4.8 machines for the same landed cost of 1 machine pre-reform,.', faded: true, blankAnswer: 'Tariff savings = $95,000 per machine (₹2.375 crore at 1991.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_03_003', title: 'Industrial sector liberalisation refers.',
          scaffold: { problem: 'A firm wanted to produce 50,000 bicycles annually in 1988. In 1988, industrial licensing required the firm to obtain a capacity licence.',
            steps: [
            { text: 'Identify the economic concept — licensing as a quantity restriction creating deadweight loss (DWL) by preventing.' },
            { text: 'Calculate 1988 outcome: Licensed output = 30,000. Profit per unit = ₹3,500 - ₹2,000 = ₹1,500.' },
            { text: 'Calculate 1995 outcome: Market output = 50,000 (demand = supply at price).' },
            { text: 'DWL in 1988 = Producer surplus loss from restricted output = (50,000 - 30,000) × ₹1,500 = ₹3 crore.' },
            { text: 'Interpret: Licensing transferred ₹3 crore of potential surplus from producers (and consumers) to...', faded: true, blankAnswer: 'Deadweight loss in 1988 = ₹3 crore. Gain in producer.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_03_004', title: 'Financial Sector Reforms under.',
          scaffold: { problem: 'In 1991, a public sector bank had NDTL of ₹5,000 crore. CRR = 15%, SLR = 38.5%.',
            steps: [
            { text: 'Calculate 1991 locked funds = (0.15 + 0.385) × 5,000 = ₹2,675 crore. Lendable = ₹2,325 crore.' },
            { text: '1991 interest income = (Loans: 2,325 × 11%) + (SLR: 1,925 × 6%) + (CRR: 750 × 0%) = ₹255.75 + ₹115.5 + 0 = ₹371.25.' },
            { text: 'Calculate 2024 locked funds = (0.045 + 0.18) × 50,000 = ₹11,250 crore. Lendable = ₹38,750 crore.' },
            { text: '2024 interest income = (Loans: 38,750 × 9%) + (SLR: 9,000 × 7%) + (CRR: 2,250 × 3.35%) = ₹3,487.5 + ₹630 + ₹75.375 =.' },
            { text: 'Compare *per ₹100 NDTL*: 1991 = ₹371.25/5,000 = ₹7.425; 2024 = ₹4,192.875/50,000 = ₹8.386.', faded: true, blankAnswer: 'Annual interest income per ₹100 NDTL increased from ₹7.43.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_03_005', title: 'Tax reforms under liberalisation refer.',
          scaffold: { problem: 'In 1990-91, India\'s gross tax revenue was ₹1,10,000 crore and GDP was ₹5,86,000 crore.',
            steps: [
            { text: 'Identify the given data — tax revenue and GDP for two time points (1990-91 and 2000-01).' },
            { text: 'Calculate tax-GDP ratio for 1990-91 = (1,10,000 / 5,86,000) × 100 = 18.77%.' },
            { text: 'Calculate tax-GDP ratio for 2000-01 = (2,60,000 / 20,00,000) × 100 = 13.00%.' },
            { text: 'Compute percentage change in tax revenue = ((2,60,000 - 1,10,000) / 1,10,000) × 100 = 136.36%.' },
            { text: 'Compute percentage change in GDP = ((20,00,000 - 5,86,000) / 5,86,000) × 100 = 241.30%.' },
            { text: 'Calculate tax buoyancy = 136.36% / 241.30% = 0.565.' },
            { text: 'Interpret — buoyancy < 1 means tax revenue grew slower than GDP; the falling tax-GDP ratio (18.77% → 13.00%) confirms.', faded: true, blankAnswer: '1990-91 tax-GDP ratio = 18.77%; 2000-01 tax-GDP ratio =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_03_006', title: 'Foreign Exchange Reforms refer to the.',
          scaffold: { problem: 'An Indian textile exporter sells shirts to a US buyer at $15 per shirt. In June 1991, the exchange rate was ₹21.14/$.',
            steps: [
            { text: 'Identify the economic concept — devaluation increases domestic currency value of foreign currency earnings.' },
            { text: 'Calculate pre-devaluation rupee revenue: Revenue_old = $15 × ₹21.14 = ₹317.10 per shirt.' },
            { text: 'Calculate post-devaluation rupee revenue: Revenue_new = $15 × ₹25.80 = ₹387.00 per shirt.' },
            { text: 'Compute profit margins: Profit_old = ₹317.10 - ₹200 = ₹117.10; Profit_new = ₹387.00 - ₹200 = ₹187.00.' },
            { text: 'Percentage change in profit = [(187 - 117.10) / 117.10] × 100 = 59.7% increase.' },
            { text: 'Economic interpretation — devaluation acts as a windfall gain for exporters with domestic cost structures, improving.', faded: true, blankAnswer: '(a) ₹317.10 → ₹387.00 per shirt; (b) ₹117.10 → ₹187.00 per.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_03_008', title: 'Globalisation in the Indian context.',
          scaffold: { problem: 'India\'s bound tariff on wheat is 100% (WTO commitment). Applied MFN tariff is 40%. International wheat price (CIF) is ₹1,800/quintal.',
            steps: [
            { text: 'Identify given data — Bound rate = 100%, Applied rate = 40%, P_w = ₹1,800/q, P_d = ₹2,300/q' },
            { text: 'Calculate tariff water = Bound rate - Applied rate = 100% - 40% = 60 percentage points.' },
            { text: 'Calculate border price with applied tariff = P_w × (1 + Applied rate) = 1800 × 1.40 = ₹2,520/q.' },
            { text: 'Calculate NPR = [(P_d - P_w) / P_w] × 100 = [(2300 - 1800) / 1800] × 100 = 27.8%.' },
            { text: 'Calculate implicit tariff equivalent = [(P_d - P_w) / P_w] × 100 = 27.8% (same as NPR here since no QR).' },
            { text: 'WTO compliance check — Applied rate (40%) ≤ Bound rate (100%), so no violation.', faded: true, blankAnswer: '(a) Tariff water = 60 pp, (b) Border price = ₹2,520/q, (c).' }
            ] } },
        { type: 'dissect', nodeId: 'c11_eco_cbse_03_003', title: 'Identify each idea',
          dissect: { specimen: 'New Economic Policy: LPG Framework and Rationale', spots: [
            { id: 's1', label: 'The New Economic Policy NEP', prompt: 'Which idea is this? — The New Economic Policy (NEP) of 1991 is a comprehensive set of economic reforms.', answer: 'The New Economic Policy NEP', options: ['The New Economic Policy NEP', 'Industrial sector liberalisation refers to', 'Financial Sector Reforms under Liberalisation', 'Tax reforms under liberalisation refer'] },
            { id: 's2', label: 'Industrial sector liberalisation refers to', prompt: 'Which idea is this? — Industrial sector liberalisation refers to the systematic dismantling of government.', answer: 'Industrial sector liberalisation refers to', options: ['Industrial sector liberalisation refers to', 'The New Economic Policy NEP', 'Financial Sector Reforms under Liberalisation', 'Tax reforms under liberalisation refer'] },
            { id: 's3', label: 'Financial Sector Reforms under Liberalisation', prompt: 'Which idea is this? — Financial Sector Reforms under Liberalisation refer to the systematic deregulation and.', answer: 'Financial Sector Reforms under Liberalisation', options: ['Financial Sector Reforms under Liberalisation', 'The New Economic Policy NEP', 'Industrial sector liberalisation refers to', 'Tax reforms under liberalisation refer'] },
            { id: 's4', label: 'Tax reforms under liberalisation refer', prompt: 'Which idea is this? — Tax reforms under liberalisation refer to the systematic restructuring of India\'s.', answer: 'Tax reforms under liberalisation refer', options: ['Tax reforms under liberalisation refer', 'The New Economic Policy NEP', 'Industrial sector liberalisation refers to', 'Financial Sector Reforms under Liberalisation'] },
            { id: 's5', label: 'Foreign Exchange Reforms refer to', prompt: 'Which idea is this? — Foreign Exchange Reforms refer to the 1991 policy shift where India devalued the rupee by.', answer: 'Foreign Exchange Reforms refer to', options: ['Foreign Exchange Reforms refer to', 'The New Economic Policy NEP', 'Industrial sector liberalisation refers to', 'Financial Sector Reforms under Liberalisation'] },
            { id: 's6', label: 'Globalisation in the Indian context', prompt: 'Which idea is this? — Globalisation in the Indian context refers to the systematic integration of the domestic.', answer: 'Globalisation in the Indian context', options: ['Globalisation in the Indian context', 'The New Economic Policy NEP', 'Industrial sector liberalisation refers to', 'Financial Sector Reforms under Liberalisation'] }
          ] } }
    ],
    explore: { component: C11_EcoLiberalisationCBSESim, prompt: 'Explore the interactive — New Economic Policy: LPG Framework and Rationale' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_002', difficulty: 'standard',
          question: 'The New Economic Policy (NEP) of 1991 is a comprehensive set of economic.',
          hint: 'Revisit c11_eco_cbse_03_001 Section 3.2: focus on the sequence — fiscal deficit →.',
          misconception: 'Students equate "Liberalisation" with "Privatisation" — thinking both mean "selling government companies." In reality,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The New Economic Policy (NEP) of 1991 is a comprehensive set of economic reforms',
                  options: ['The New Economic Policy (NEP) of 1991 is a comprehensive set of economic reforms', 'Industrial sector liberalisation refers to the systematic dismantling of government', 'Financial Sector Reforms under Liberalisation refer to the systematic deregulation and', 'Tax reforms under liberalisation refer to the systematic restructuring of India\'s'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Liberalisation" with "Privatisation" — thinking both mean "selling government companies." In reality, Liberalisation =.' }
          ],
            remediations: { 'students-equate-liberalisation-with-privatisatio': { steps: ['If a student conflates the two, do this 3-step fix: (1) Draw two columns: "New Private Firm Enters" vs "Govt Sells.', '(2) Ask: "Which generates revenue for government?" Only Privatisation.', '(3) Ask: "Which increases competition immediately?" Both, but Liberalisation does so by expanding the player pool;.', 'Use the Navratna example (Box 3.1): granting autonomy is Liberalisation-lite; selling equity is Privatisation.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_003', difficulty: 'standard',
          question: 'Industrial sector liberalisation refers to the systematic dismantling of.',
          hint: 'If stuck, revisit c11_eco_cbse_03_001 (BoP crisis) and c11_eco_cbse_03_002 (LPG.',
          misconception: 'Students believe "abolition of industrial licensing = complete deregulation = all industries free to operate without.',
          parts: [
                { id: 'a', prompt: 'Why did the government retain industrial licensing for alcohol, cigarettes, hazardous chemicals, industrial explosives, electronics, aerospace, and drugs &.', answer: 'Licensing was retained for: (a) alcohol & cigarettes',
                  options: ['Licensing was retained for: (a) alcohol & cigarettes', 'these are profitable sectors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "abolition of industrial licensing = complete deregulation = all industries free to operate without any government.' },
                { id: 'b', prompt: 'Compare the pre-1991 and post-1991 industrial policy on the dimension of "firm size and scale".', answer: 'Pre-1991: Many goods (e.g., garments, toys, leather products) reserved for SSI',
                  options: ['Pre-1991: Many goods (e.g., garments, toys, leather products) reserved for SSI', 'employment loss in SSI'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "abolition of industrial licensing = complete deregulation = all industries free to operate without any government.' }
          ],
            remediations: { 'abolition-of-industrial-licensing-complete': { steps: ['Create a two-column table: "Pre-1991 Controls" vs "Post-1991 Controls" using NCERT text.', 'Ask: "Which column has more items?" Students often find Column 2 longer.', 'Explain: Liberalisation changed the *type* of regulation (from entry/quantity to quality/safety/environment), not the.', 'Apply to a concrete case: "To set up a paint factory in 1990 vs 2024 — list permissions needed." This makes the.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "abolition of industrial licensing = complete deregulation = all industries free to operate without.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Abolition of industrial licensing was sufficient to create a competitive industrial sector in India." Use evidence from the NCERT text.', answer: 'The statement is false',
                  options: ['The statement is false', 'yes, licensing removal created competition'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "abolition of industrial licensing = complete deregulation = all industries free to operate without any government.' },
                { id: 'b', prompt: 'Compare the pre-1991 and post-1991 industrial policy on the dimension of "firm size and scale".', answer: 'Pre-1991: Many goods (e.g., garments, toys, leather products) reserved for SSI',
                  options: ['Pre-1991: Many goods (e.g., garments, toys, leather products) reserved for SSI', 'employment loss in SSI'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "abolition of industrial licensing = complete deregulation = all industries free to operate without any government.' }
          ],
            remediations: { 'abolition-of-industrial-licensing-complete': { steps: ['Create a two-column table: "Pre-1991 Controls" vs "Post-1991 Controls" using NCERT text.', 'Ask: "Which column has more items?" Students often find Column 2 longer.', 'Explain: Liberalisation changed the *type* of regulation (from entry/quantity to quality/safety/environment), not the.', 'Apply to a concrete case: "To set up a paint factory in 1990 vs 2024 — list permissions needed." This makes the.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_004', difficulty: 'standard',
          question: 'Financial Sector Reforms under Liberalisation refer to the systematic.',
          hint: 'If stuck, revisit **Class 10: "Loan Activities of Banks" (c10_eco_cbse_03_003)** and.',
          misconception: '**Misconception:** "Financial liberalisation means the RBI stopped regulating banks and let them do whatever they want.',
          parts: [
                { id: 'a', prompt: 'Explain why the Narasimham Committee (1991) recommended reducing SLR and CRR *gradually* rather than abolishing them immediately, linking your answer to.', answer: '**Answer:** SLR financed the government\'s fiscal deficit by forcing banks to buy',
                  options: ['**Answer:** SLR financed the government\'s fiscal deficit by forcing banks to buy', 'to prevent inflation', 'to help banks earn more profit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Financial liberalisation means the RBI stopped regulating banks and let them do whatever they want — no more CRR, SLR,.' }
          ],
            remediations: { 'misconception-financial-liberalisation-means-the': { steps: ['**Revisit the Narasimham Committee I (1991) and II (1998) recommendations** — create a two-column table: "Pre-reform.', 'Map each: e.g., "Fixed lending rates → Base Rate/MCLR system with risk-based pricing"; "High SLR/CRR → Gradual.', '**Work through a numerical example:** Take a bank with ₹100 crore deposits.', 'Show balance sheet pre-1991 (₹53.5 cr in SLR+CRR, ₹46.5 cr loans) vs post-reform (₹22.5 cr in SLR+CRR, ₹77.5 cr loans +.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_005', difficulty: 'standard',
          question: 'Tax reforms under liberalisation refer to the systematic restructuring of.',
          hint: 'If stuck, revisit Class 11 Chapter 2 "Government Budget and Economy" — specifically the.',
          misconception: 'Students believe "lower tax rates automatically mean lower government revenue" and "GST is just a new name for VAT.".',
          parts: [
                { id: 'a', prompt: 'Calculate the tax-GDP ratio for India in 1990-91 and 2022-23 given: 1990-91 tax revenue ₹1,10,000 crore, GDP ₹5,86,000 crore; 2022-23 tax revenue ₹30,40,000.', answer: 'Step 1: 1990-91 tax-GDP ratio = (1,10,000 / 5,86,000) × 100 = 18.77%',
                  options: ['Step 1: 1990-91 tax-GDP ratio = (1,10,000 / 5,86,000) × 100 = 18.77%', 'reforms failed because ratio fell', 'lower tax rates automatically mean lower government revenue'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "lower tax rates automatically mean lower government revenue" and "GST is just a new name for VAT." The first error.' },
                { id: 'b', prompt: 'Analyse the following statement: "The reduction in peak customs duty from 150% (1991) to 10-15% (post-reforms) and the introduction of GST have had opposite.', answer: 'The statement is partially accurate but oversimplified',
                  options: ['The statement is partially accurate but oversimplified', 'both reduced revenue', 'lower tax rates automatically mean lower government revenue'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "lower tax rates automatically mean lower government revenue" and "GST is just a new name for VAT." The first error.' }
          ],
            remediations: { 'lower-tax-rates-automatically-mean': { steps: ['Draw a Laffer curve (revenue on Y-axis, tax rate on X-axis) — mark pre-1991 point on the downward slope (high rate, low.', 'Trace India\'s actual tax-GDP ratio from Economic Survey data: 1990-91 (18.8%), 2000-01 (13.5%), 2010-11 (10.5%),.', 'Create a 3-stage flow chart: Manufacturer (excise) → Wholesaler (VAT) → Retailer (VAT) showing tax-on-tax; then GST.', 'Calculate effective tax rate on a ₹1000 product under old vs GST (assume 12% GST, 10% VAT + 12% excise cascading).'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "lower tax rates automatically mean lower government revenue" and "GST is just a new name for VAT.".',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Post-1991 tax reforms successfully reduced the fiscal deficit because lower tax rates led to higher compliance and thus higher absolute.', answer: 'The claim is false',
                  options: ['The claim is false', 'reforms fixed the deficit', 'lower tax rates automatically mean lower government revenue', 'GST is just a new name for VAT'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "lower tax rates automatically mean lower government revenue" and "GST is just a new name for VAT." The first error.' },
                { id: 'b', prompt: 'Design a simplified tax reform proposal for a hypothetical state government that currently has: (a) 5% VAT on goods, (b) 8% entertainment tax, (c) 10% luxury.', answer: 'Proposal: Single SGST rate of 12% on all goods and services (replacing VAT,',
                  options: ['Proposal: Single SGST rate of 12% on all goods and services (replacing VAT,', 'lower tax rates automatically mean lower government revenue', 'GST is just a new name for VAT'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "lower tax rates automatically mean lower government revenue" and "GST is just a new name for VAT." The first error.' },
                { id: 'c', prompt: 'Analyse the following statement: "The reduction in peak customs duty from 150% (1991) to 10-15% (post-reforms) and the introduction of GST have had opposite.', answer: 'The statement is partially accurate but oversimplified',
                  options: ['The statement is partially accurate but oversimplified', 'both reduced revenue', 'lower tax rates automatically mean lower government revenue', 'GST is just a new name for VAT'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "lower tax rates automatically mean lower government revenue" and "GST is just a new name for VAT." The first error.' }
          ],
            remediations: { 'lower-tax-rates-automatically-mean': { steps: ['Draw a Laffer curve (revenue on Y-axis, tax rate on X-axis) — mark pre-1991 point on the downward slope (high rate, low.', 'Trace India\'s actual tax-GDP ratio from Economic Survey data: 1990-91 (18.8%), 2000-01 (13.5%), 2010-11 (10.5%),.', 'Create a 3-stage flow chart: Manufacturer (excise) → Wholesaler (VAT) → Retailer (VAT) showing tax-on-tax; then GST.', 'Calculate effective tax rate on a ₹1000 product under old vs GST (assume 12% GST, 10% VAT + 12% excise cascading).'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_006', difficulty: 'standard',
          question: 'Foreign Exchange Reforms refer to the 1991 policy shift where India devalued.',
          hint: 'Review c11_eco_cbse_03_001 (BoP Crisis) focusing on the reserve depletion timeline: March.',
          misconception: 'Students often believe "devaluation always causes inflation" as an absolute rule.',
          parts: [
                { id: 'a', prompt: 'Compare the impact of the 1991 devaluation on (a) an Indian importer of crude oil and (b) an Indian exporter of software services.', answer: 'an Indian importer of crude oil and (',
                  options: ['an Indian importer of crude oil and (', 'both benefit', 'devaluation always causes inflation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "devaluation always causes inflation" as an absolute rule.' }
          ],
            remediations: { 'devaluation-always-causes-inflation-as': { steps: ['Revisit the BoP crisis node (c11_eco_cbse_03_001) — calculate how many weeks of imports $1.1B covered at 1991 monthly.', 'Use the demand-supply framework from c6_economics_ch12_003: draw forex market diagram showing fixed rate above.', 'Show devaluation as moving fixed rate down to equilibrium, eliminating shortage.', 'Quantify: if oil imports = 30% of import bill, 22% devaluation raises oil import bill by 6.6% of total imports —.', 'Compare with 1966 devaluation (57%) which caused higher inflation due to larger magnitude and weaker supply response.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "devaluation always causes inflation" as an absolute rule.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The 1991 rupee devaluation was successful because foreign exchange reserves rose from $1.1 billion in June 1991 to $646 billion in.', answer: 'The statement commits the post hoc fallacy',
                  options: ['The statement commits the post hoc fallacy', 'devaluation always causes inflation', '"devaluation always causes inflation" as an absolute rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "devaluation always causes inflation" as an absolute rule.' },
                { id: 'b', prompt: 'Compare the impact of the 1991 devaluation on (a) an Indian importer of crude oil and (b) an Indian exporter of software services.', answer: 'an Indian importer of crude oil and (',
                  options: ['an Indian importer of crude oil and (', 'both benefit', 'devaluation always causes inflation', '"devaluation always causes inflation" as an absolute rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "devaluation always causes inflation" as an absolute rule.' }
          ],
            remediations: { 'devaluation-always-causes-inflation-as': { steps: ['Revisit the BoP crisis node (c11_eco_cbse_03_001) — calculate how many weeks of imports $1.1B covered at 1991 monthly.', 'Use the demand-supply framework from c6_economics_ch12_003: draw forex market diagram showing fixed rate above.', 'Show devaluation as moving fixed rate down to equilibrium, eliminating shortage.', 'Quantify: if oil imports = 30% of import bill, 22% devaluation raises oil import bill by 6.6% of total imports —.', 'Compare with 1966 devaluation (57%) which caused higher inflation due to larger magnitude and weaker supply response.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_008', difficulty: 'standard',
          question: 'Globalisation in the Indian context refers to the systematic integration of the.',
          hint: 'Revisit Class 10 Ch4 Globalisation nodes (c10_eco_cbse_04_003 to 04_005) and Class 11.',
          misconception: 'Students believe "WTO forces India to eliminate all tariffs and subsidies." In reality, WTO only binds *maximum*.',
          parts: [
                { id: 'a', prompt: 'India agreed to reduce its bound tariff rate on industrial goods from an average of 100% (1990) to 40% by 2005 under WTO.', answer: 'Tariff water = Bound rate (40%) - Applied rate (15%) = 25 percentage points',
                  options: ['Tariff water = Bound rate (40%) - Applied rate (15%) = 25 percentage points', 'water is 15%', 'it doesn\'t matter'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "WTO forces India to eliminate all tariffs and subsidies." In reality, WTO only binds *maximum* (bound) tariff.' }
          ],
            remediations: { 'wto-forces-india-to-eliminate': { steps: ['Distinguish bound vs applied tariff using India\'s Tariff Schedule (ITC-HS) — pick 5 items, find bound rate (WTO IDB).', 'Map India\'s agricultural subsidies by box colour using Economic Survey data — classify fertiliser, power, irrigation,.', 'Read WTO dispute DS503 (US — Countervailing Measures on Indian Steel) to see how India defended export subsidies under.', 'Re-attempt Diagnostic Q2 and Q5 with this data.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "WTO forces India to eliminate all tariffs and subsidies." In reality, WTO only binds *maximum*.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "India\'s trade liberalisation under WTO has been asymmetric—developed countries maintained high agricultural subsidies and non-tariff.', answer: 'The statement is largely correct',
                  options: ['The statement is largely correct', 'WTO forces India to eliminate all tariffs and subsidies', 'liberalisation commitments', 'zero tariffs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "WTO forces India to eliminate all tariffs and subsidies." In reality, WTO only binds *maximum* (bound) tariff.' },
                { id: 'b', prompt: 'Design a trade policy response for India if the EU imposes a Carbon Border Adjustment Mechanism (CBAM) on steel/aluminium imports from 2026, arguing it.', answer: 'legal basis at WTO, (',
                  options: ['legal basis at WTO, (', 'WTO forces India to eliminate all tariffs and subsidies', 'liberalisation commitments', 'zero tariffs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "WTO forces India to eliminate all tariffs and subsidies." In reality, WTO only binds *maximum* (bound) tariff.' }
          ],
            remediations: { 'wto-forces-india-to-eliminate': { steps: ['Distinguish bound vs applied tariff using India\'s Tariff Schedule (ITC-HS) — pick 5 items, find bound rate (WTO IDB).', 'Map India\'s agricultural subsidies by box colour using Economic Survey data — classify fertiliser, power, irrigation,.', 'Read WTO dispute DS503 (US — Countervailing Measures on Indian Steel) to see how India defended export subsidies under.', 'Re-attempt Diagnostic Q2 and Q5 with this data.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
