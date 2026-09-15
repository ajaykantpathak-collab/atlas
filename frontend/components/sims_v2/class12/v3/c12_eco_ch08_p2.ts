import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch08_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch08_p2: SimDef = {
    id: 'v3_c12_eco_ch08_p2',
    title: 'National Income Accounting · Part 2/2',
    subtitle: 'The diaspora\'s money doesn\'t do what the headline claims',
    classLevel: 12, subject: 'economics', topic: 'National Income Accounting · Part 2/2',
    chapters: ['c12_eco_ch08'],
    nodeIds: ['c12_eco_cbse_08_007', 'c12_eco_cbse_08_008', 'c12_eco_cbse_08_009', 'c12_eco_cbse_08_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'National accountant', intro: 'One number — GDP — drives every economic debate in the country. Learn what it counts, what it misses, and how it morphs into national income.', goal: 'Define GDP, GNP, NNP and National Income, and convert between aggregates using NFIA, depreciation and net indirect taxes.' },
    discovery: {
        question: 'A headline boasts \'GNP exceeds GDP — thank our diaspora\'s remittances!\' Sounds patriotic, but is the accounting right?',
        options: ['No — remittances are transfers, not factor income; India\'s net factor income from abroad is negative, so GNP sits below GDP', 'Yes — remittances are factor income', 'Yes — anything from abroad counts', 'No — GNP and GDP are identical measures'],
        answer: 'No — remittances are transfers, not factor income; India\'s net factor income from abroad is negative, so GNP sits below GDP',
        hook: 'GDP counts production inside the border; GNP counts income of residents wherever they are — bridged by net FACTOR income (wages, rent, interest, profit), not transfers. Then depreciation turns gross to net, and net indirect taxes turn market price into true factor cost.',
    },
    teaching: [
        { title: 'Expenditure Method: Components of Final Expenditure', text: 'The Expenditure Method measures Gross Domestic Product at Market Prices (GDPmp) by summing the final expenditures made by all sectors of the economy on domestically produced goods and services during.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the national accounts ladder yourself: climb GDP → GNP → NNP → National Income with real numbers, then test whether a growing GDP actually means a wealthier nation.',
        labels: ['Expenditure Method: Components', 'Net Exports and Net', 'GDP and Welfare: Limitations', 'Real GDP per Capita'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_08_007', title: 'Expenditure Method: Components of Final Expenditure',
          scaffold: { problem: 'From the following data for India (hypothetical, ₹ lakh crore), calculate GDPmp and the share of each component in GDPmp: Private Final.',
            steps: [
            { text: 'Identify C = 120, G = 25.' },
            { text: 'Compute I = Gross Fixed Capital Formation + Change in Stocks + Valuables = 40 + 5 + 2 = 47.' },
            { text: 'Compute Net Exports = X − M = 30 − 35 = −5.' },
            { text: 'GDPmp = C + G + I + (X − M) = 120 + 25 + 47 + (−5) = 187 lakh crore.' },
            { text: 'Calculate shares: C% = (120/187)×100 = 64.2%; G% = 13.4%; I% = 25.1%; Net Exports% = −2.7%.', faded: true, blankAnswer: 'GDPmp = 187 lakh crore; Shares: C = 64.2%, G = 13.4%,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_08_008', title: 'Net Exports and Net Factor Income from Abroad',
          scaffold: { problem: 'In 2023-24, India\'s merchandise exports were ₹36.5 lakh crore, services exports ₹25.8 lakh crore, merchandise imports ₹57.2 lakh crore.',
            steps: [
            { text: 'Identify total exports X = Merchandise Exports + Services Exports = 36.5 + 25.8 = ₹62.3 lakh crore.' },
            { text: 'Identify total imports M = Merchandise Imports + Services Imports = 57.2 + 13.4 = ₹70.6 lakh crore.' },
            { text: 'Compute Net Exports NX = X – M = 62.3 – 70.6 = –₹8.3 lakh crore (trade deficit).' },
            { text: 'Compute Factor Income Received = 0.8 + 3.2 = ₹4.0 lakh crore.' },
            { text: 'Compute Factor Income Paid = 0.3 + 4.5 = ₹4.8 lakh crore.' },
            { text: 'Compute NFIA = Received – Paid = 4.0 – 4.8 = –₹0.8 lakh crore (net outflow).', faded: true, blankAnswer: 'Net Exports = –₹8.3 lakh crore; NFIA = –₹0.8 lakh crore.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_08_009', title: 'GDP and Welfare: Limitations of GDP as an Indicator',
          caseStudy: { intro: 'Imagine a Class 12 student, Priya, comparing two Indian states: Gujarat (high GSDP per capita) and Kerala (lower GSDP per capita but higher life expectancy.',
            decisions: [{ prompt: 'Define GDP and state one fundamental reason why it is an incomplete measure of economic welfare.', options: [
                { text: 'GDP is the total market value of all final goods and services produced within a country\'s', outcome: 'GDP is the total market value of all final goods and services produced within a country\'s domestic.' },
                { text: 'GDP excludes exports', outcome: 'Not quite — Students often believe "higher GDP always means better standard of living" and write in board.', reveals: 'higher-gdp-always-means-better' },
                { text: 'higher GDP always means better standard of living', outcome: 'Not quite — Students often believe "higher GDP always means better standard of living" and write in board.', reveals: 'higher-gdp-always-means-better' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_08_010', title: 'Real GDP per Capita as a Measure of Standard of Living',
          scaffold: { problem: 'India\'s Real GDP (at 2011-12 prices) was ₹87.36 lakh crore in 2011-12 and ₹145.69 lakh crore in 2022-23 (advance estimates).',
            steps: [
            { text: 'Identify the formula: Real GDP per Capita = Real GDP / Population.' },
            { text: 'Compute 2011-12 per capita: ₹87.36 lakh crore / 121 crore = ₹72,198 per person (approx).' },
            { text: 'Compute 2022-23 per capita: ₹145.69 lakh crore / 140 crore = ₹1,04,064 per person (approx).' },
            { text: 'Calculate total growth factor: (1,04,064 / 72,198) = 1.441. Total growth = 44.1% over 11 years.' },
            { text: 'Annualized growth rate: (1.441)^(1/11) - 1 = 1.034 - 1 = 3.4% per annum (using compound annual growth rate formula).', faded: true, blankAnswer: '2011-12: ₹72,198; 2022-23: ₹1,04,064; Annualized growth.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_08_007', title: 'A real-world call',
          caseStudy: { intro: 'An economy can grow fast by extracting resources now, or sustainably by growing slower. The fast path shows results this decade; the sustainable path pays off for the next generation.',
            decisions: [{ prompt: 'Who is growth actually for?', options: [
                { text: 'Now — poverty today can\'t wait for tomorrow\'s environment', outcome: 'The urgency argument; the trap is that \'now\' never ends — there\'s always another urgent reason to postpone sustainability.' },
                { text: 'Tomorrow — growth that destroys its own foundation isn\'t growth', outcome: 'The sustainability argument; the honest cost is slower improvement for people living now.' },
                { text: 'Both — the only wrong answer is pretending there\'s no trade-off', outcome: 'Development economics\' real position — green growth is possible but costs more upfront; someone has to fund that difference.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A headline claims India\'s GNP exceeds its GDP \'because of the huge remittances the diaspora sends home\'. A student repeats it in a class presentation on national income.',
            decisions: [{ prompt: 'Does the claim survive the definitions?', options: [
                { text: 'No — family remittances are transfers, not factor income; India\'s net factor income from abroad is actually negative, so GNP typically sits below GDP.', outcome: 'Only wages, rent, interest and profit crossing borders count as factor income — gifts and maintenance flows don\'t enter the GDP→GNP bridge.' },
                { text: 'Yes — money earned abroad and sent home is exactly what \'factor income from abroad\' means.', outcome: 'That confuses a transfer with a factor payment; remittances for family upkeep are unilateral transfers outside the accounts.', reveals: 'remittances-are-factor-income' },
                { text: 'Maybe — but if anything, subtracting NFIA from GDP gives GNP, so the headline could go either way.', outcome: 'The sign matters: GNP = GDP + NFIA; flipping the sign breaks every chained aggregate downstream.', reveals: 'nfia-sign-flipped' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_08_010', title: 'You made it',
          caseStudy: { intro: 'You can now walk the whole GDP→GNP→NNP→NI chain without tripping on signs — the calculation boards repeat every single year.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_007', difficulty: 'standard',
          question: 'The Expenditure Method measures Gross Domestic Product at Market Prices (GDPmp).',
          hint: 'If stuck on classifying a transaction, ask: "Is this a final purchase of a newly produced.',
          misconception: 'Students often treat \'Gross Domestic Capital Formation\' as only \'Gross Fixed Capital Formation\', ignoring Change.',
          parts: [
                { id: 'a', prompt: 'Why are imports (M) subtracted in the expenditure method formula GDPmp = C + G + I + (X − M)? Explain using the concept of domestic production.', answer: 'C, G, and I include expenditure on both domestic and imported goods',
                  options: ['C, G, and I include expenditure on both domestic and imported goods', 'imports are subtracted'],
                  hint: 'If stuck on classifying a transaction, ask: "Is this a final purchase of a newly produced domestic.',
                  misconception: 'Students often treat \'Gross Domestic Capital Formation\' as only \'Gross Fixed Capital Formation\', ignoring Change in Stocks and Valuables.' },
                { id: 'b', prompt: 'A car manufacturer produces ₹500 crore worth of cars in 2023-24.', answer: 'Only final expenditure on domestic output counts',
                  options: ['Only final expenditure on domestic output counts', 'includes the ₹80 crore steel purchase in I or G double-counts intermediate goods'],
                  hint: 'If stuck on classifying a transaction, ask: "Is this a final purchase of a newly produced domestic.',
                  misconception: 'Students often treat \'Gross Domestic Capital Formation\' as only \'Gross Fixed Capital Formation\', ignoring Change in Stocks and Valuables.' }
          ],
            remediations: { 'students-often-treat-gross-domestic': { steps: ['Revisit node c12_eco_cbse_08_004 (Circular Flow and Three Methods) to see how expenditure flows become income.', 'Review the distinction between final and intermediate goods using the car manufacturer example in Diagnostic 4.', 'Practice classifying 10 transactions (e.g., household buys rice, firm buys laptop, government pays salaries, export.', 'Re-attempt Diagnostic 3 and 4 with fresh numbers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_008', difficulty: 'standard',
          question: 'Net Exports (NX) is the difference between a country\'s total exports of goods.',
          hint: 'If stuck, immediately review the "Domestic vs National" table in c12_eco_cbse_08_001 and.',
          misconception: 'Students treat Net Exports and Net Factor Income from Abroad as the same concept because both involve "net" and.',
          parts: [
                { id: 'a', prompt: 'India\'s exports are ₹30 lakh crore, imports are ₹42 lakh crore.', answer: 'Net Exports = 30 – 42 = –₹12 lakh crore (trade deficit)',
                  options: ['Net Exports = 30 – 42 = –₹12 lakh crore (trade deficit)', 'received/paid'],
                  hint: 'If stuck, immediately review the "Domestic vs National" table in c12_eco_cbse_08_001 and the.',
                  misconception: 'Students treat Net Exports and Net Factor Income from Abroad as the same concept because both involve "net" and "abroad".' }
          ],
            remediations: { 'students-treat-net-exports-and': { steps: ['Revisit c12_eco_cbse_08_001 (Basic Concepts: GDP, GNP, NNP) to clarify the domestic vs national distinction.', 'Draw a two-column table: Column A "Trade Flows (Goods/Services)" → Exports, Imports, Net Exports.', 'Practice 5 numerical problems where only one of NX or NFIA is non-zero, then both non-zero.', 'Re-attempt Diagnostic Question 3 and 4. If errors persist, review the circular flow diagram in c12_eco_cbse_08_004.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_009', difficulty: 'standard',
          question: 'GDP (Gross Domestic Product) measures the total market value of all final goods.',
          hint: 'If confused about why GDP misses welfare, revisit c10_eco_cbse_01_009 (Limitations of Per.',
          misconception: 'Students often believe "higher GDP always means better standard of living" and write in board exams: "GDP growth.',
          parts: [
                { id: 'a', prompt: 'India\'s GDP grew 7.2% in FY 2022-23 while the Gini coefficient (inequality measure) rose from 0.35 to 0.38.', answer: 'GDP per capita growth ≈ 7.2% - 0.9% = 6.3%',
                  options: ['GDP per capita growth ≈ 7.2% - 0.9% = 6.3%', 'welfare improved by 6.3% for everyone', 'higher GDP always means better standard of living', 'GDP growth implies welfare improvement'],
                  hint: 'If confused about why GDP misses welfare, revisit c10_eco_cbse_01_009 (Limitations of Per Capita.',
                  misconception: 'Students often believe "higher GDP always means better standard of living" and write in board exams: "GDP growth implies welfare.' }
          ],
            remediations: { 'higher-gdp-always-means-better': { steps: ['Revisit c10_eco_cbse_01_009 (Limitations of Per Capita Income) and c10_eco_cbse_01_006 (HDI) to rebuild the conceptual.', 'Create a two-column table: "What GDP Counts" vs.', '"What GDP Misses for Welfare" with 5 Indian examples each (e.g., counts: factory output; misses: mother\'s childcare).', 'Take the diagnostic question 3 (GDP per capita vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_010', difficulty: 'standard',
          question: 'Real GDP per Capita is the inflation-adjusted total value of all final goods.',
          hint: 'If stuck on the division or growth decomposition, revisit c8_math_ch7_6 (Unitary Method).',
          misconception: 'Students often believe Real GDP per Capita is a direct measure of "standard of living" or "happiness." They write.',
          parts: [
                { id: 'a', prompt: 'Define Real GDP per Capita and state its unit of measurement.', answer: 'Real GDP per Capita = Real GDP (at constant prices) / Mid-year Population',
                  options: ['Real GDP per Capita = Real GDP (at constant prices) / Mid-year Population', 'Rupees', 'standard of living', 'happiness'],
                  hint: 'If stuck on the division or growth decomposition, revisit c8_math_ch7_6 (Unitary Method) and.',
                  misconception: 'Students often believe Real GDP per Capita is a direct measure of "standard of living" or "happiness." They write in exams: "Higher Real.' },
                { id: 'b', prompt: 'Country A has Real GDP of ₹200 lakh crore and population 100 crore. Country B has Real GDP of ₹150 lakh crore and population 50 crore.', answer: 'Country A: ₹200 lakh crore / 100 crore = ₹2,00,000 per person',
                  options: ['Country A: ₹200 lakh crore / 100 crore = ₹2,00,000 per person', 'aggregate fallacy', 'standard of living', 'happiness'],
                  hint: 'If stuck on the division or growth decomposition, revisit c8_math_ch7_6 (Unitary Method) and.',
                  misconception: 'Students often believe Real GDP per Capita is a direct measure of "standard of living" or "happiness." They write in exams: "Higher Real.' },
                { id: 'c', prompt: '"Real GDP per Capita in India doubled between 2004-05 and 2022-23.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'it\'s not perfect', 'standard of living', 'happiness'],
                  hint: 'If stuck on the division or growth decomposition, revisit c8_math_ch7_6 (Unitary Method) and.',
                  misconception: 'Students often believe Real GDP per Capita is a direct measure of "standard of living" or "happiness." They write in exams: "Higher Real.' }
          ],
            remediations: { 'real-gdp-per-capita-is': { steps: ['If the student cannot articulate the three core limitations with Indian examples, do: (1) Revisit c12_eco_cbse_08_009.', '(2) Revisit c8_eco_ch2_3 (Population Size) and c8_eco_ch2_9 (Demographic Dividend) to reinforce population dynamics.', '(3) Work through the Worked Example 3 below step-by-step with actual Indian data (Real GDP 2011-12 series, Census 2011.', '(4) Re-attempt Diagnostic Question 4 and 6, writing full structured answers with headings: "Limitation 1.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_08_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Real GDP per Capita is a direct measure of "standard of living" or "happiness." They write.',
          parts: [
                { id: 'a', prompt: 'The government is deciding between two policies: Policy X raises Real GDP by 3% with no population change.', answer: 'Current per capita growth ≈ 6% – 1% = 5%',
                  options: ['Current per capita growth ≈ 6% – 1% = 5%', 'population control helps', 'standard of living', 'happiness'],
                  hint: 'If stuck on the division or growth decomposition, revisit c8_math_ch7_6 (Unitary Method) and.',
                  misconception: 'Students often believe Real GDP per Capita is a direct measure of "standard of living" or "happiness." They write in exams: "Higher Real.' }
          ],
            remediations: { 'real-gdp-per-capita-is': { steps: ['If the student cannot articulate the three core limitations with Indian examples, do: (1) Revisit c12_eco_cbse_08_009.', '(2) Revisit c8_eco_ch2_3 (Population Size) and c8_eco_ch2_9 (Demographic Dividend) to reinforce population dynamics.', '(3) Work through the Worked Example 3 below step-by-step with actual Indian data (Real GDP 2011-12 series, Census 2011.', '(4) Re-attempt Diagnostic Question 4 and 6, writing full structured answers with headings: "Limitation 1.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
