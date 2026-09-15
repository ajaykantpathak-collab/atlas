import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eco_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eco_ch01_p2: SimDef = {
    id: 'v3_c11_eco_ch01_p2',
    title: 'Indian Economy on the Eve of Independence · Part 2/2',
    subtitle: 'Separate real infrastructure from developmental impact on the eve of independence.',
    classLevel: 11, subject: 'economics', topic: 'Indian Economy on the Eve of Independence · Part 2/2',
    chapters: ['c11_eco_ch01'],
    nodeIds: ['c11_eco_cbse_01_007', 'c11_eco_cbse_01_008', 'c11_eco_cbse_01_009', 'c11_eco_cbse_01_010', 'c11_eco_cbse_01_011', 'c11_eco_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an economic historian auditing two centuries of colonial policy', intro: 'A weaver\'s looms in 1750 Bengal stand idle by 1850 while Lancashire hums. Trace the policy that flipped the trade.', goal: 'Explain colonial exploitation, deindustrialisation and per-capita stagnation under British rule.' },
    discovery: {
        question: 'The British left India the world\'s fourth-largest railway network — often cited as proof colonial rule modernised the economy. What does the network\'s design reveal?',
        options: ['Port-to-hinterland lines built to move raw materials out, at a guaranteed 5% return paid from Indian revenues', 'Inter-regional lines designed to integrate Indian markets for Indian industry', 'Routes chosen to connect famine-prone districts to food surpluses', 'A passenger-first network funded by British taxpayers'],
        answer: 'Port-to-hinterland lines built to move raw materials out, at a guaranteed 5% return paid from Indian revenues',
        hook: 'Infrastructure isn\'t automatically development — ask who paid for it, who profited, and what it was built to carry.',
    },
    teaching: [
        { title: 'Modern Industry: Limited Growth and Lopsided Pattern', text: 'Modern Industry\'s Limited Growth and Lopsided Pattern refers to the structural distortion in India\'s industrial sector under British rule where modern factory-based manufacturing emerged but remained.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eco_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Weigh the social benefits of railways and telegraphs against surplus extraction, then show how population growth erased per-capita gains.',
        labels: ['Modern Industry: Limited Growth', 'Foreign Trade: Composition', 'Drain of Wealth: Dadanath', 'Demographic Conditions: High Mortality', 'Occupational Structure: Heavy Dependence', 'Infrastructure: Railways, Roads'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_01_007', title: 'Modern Industry: Limited Growth and Lopsided Pattern',
          scaffold: { problem: 'In 1939, India\'s cotton textile industry had 200 mills with 10 million spindles. Each spindle required replacement every 8 years.',
            steps: [
            { text: 'Identify the capital good in question — textile spindles are capital goods (machinery components), not consumer goods.' },
            { text: 'Calculate annual replacement demand: 10 million spindles / 8 years = 1.25 million spindles per year.' },
            { text: 'Calculate annual import cost: 1.25 million × ₹15 = ₹18.75 million = ₹1.875 crore.' },
            { text: 'Calculate percentage of output: (₹1.875 crore / ₹120 crore) × 100 = 1.56%.' },
            { text: 'Interpret economically — this 1.56% is a *permanent* foreign exchange leakage; every year, 1.56% of cotton textile.', faded: true, blankAnswer: 'Annual spindle import bill = ₹1.875 crore; Percentage.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_01_008', title: 'Foreign Trade: Composition and Direction Under British Rule',
          scaffold: { problem: 'In 1913, India\'s total exports were ₹320 crore and total imports ₹250 crore.',
            steps: [
            { text: 'Identify the given data — total exports (X=320), total imports (M=250), bilateral flows for Britain (X_UK=140.' },
            { text: 'Calculate overall trade balance = X - M = 320 - 250 = +₹70 crore (surplus).' },
            { text: 'Calculate total trade volume = X + M = 320 + 250 = 570. Britain\'s trade = 140 + 180 = 320.' },
            { text: 'Calculate bilateral balances: With Britain = 140 - 180 = -₹40 crore (deficit).' },
            { text: 'Interpret: The China surplus (opium/tea triangular trade) financed the Britain deficit.', faded: true, blankAnswer: '(a) +₹70 crore surplus, (b) 56.1%, (c) Britain: -₹40 crore.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_01_009', title: 'Drain of Wealth: Dadanath Naoroji\'s Theory',
          scaffold: { problem: 'In 1900, India\'s merchandise exports were £180 million, imports £100 million.',
            steps: [
            { text: 'Identify all visible and invisible items from the problem statement.' },
            { text: 'Compute merchandise trade balance = X - M = 180 - 100 = £80 million (surplus).' },
            { text: 'Compute total invisible debits = 20+15+10+8+12 = £65 million. Net invisible balance = IC - Total Invisible Debits = 5.' },
            { text: 'Current account balance = Merchandise balance + Net invisible balance = 80 + (-60) = +£20 million.' },
            { text: 'Drain as % of NI = (60 / 500) × 100 = 12%. This exceeds Naoroji\'s 6-8% because by 1900, railway guarantees and debt.', faded: true, blankAnswer: '(a) £80 million surplus, (b) -£60 million, (c) +£20.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_01_010', title: 'Demographic Conditions: High Mortality and Low Life Expectancy',
          scaffold: { problem: 'In 1941, British India\'s population was approximately 31.8 crore.',
            steps: [
            { text: 'Identify given data — Population = 31.8 crore = 318 million; CDR = 42/1000; CBR = 45/1000; IMR = 218/1000' },
            { text: 'Recall formulas — Deaths = (CDR/1000) × Population; Births = (CBR/1000) × Population; Natural Increase = Births.' },
            { text: 'Calculate deaths — (42/1000) × 318,000,000 = 13,356,000 deaths per year' },
            { text: 'Calculate births — (45/1000) × 318,000,000 = 14,310,000 births per year' },
            { text: 'Calculate natural increase and growth rate — 14,310,000 - 13,356,000 = 954,000; Growth rate = (954,000/318,000,000).' },
            { text: 'Calculate infant deaths — (218/1000) × 14,310,000 = 3,119,580 infant deaths per year' },
            { text: 'Interpret — Despite high birth rate, growth was only 0.3% because death rate was almost as high; 1 in 4.6 births.', faded: true, blankAnswer: '(a) 13.36 million deaths/year; (b) 14.31 million.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_01_011', title: 'Occupational Structure: Heavy Dependence on Agriculture',
          scaffold: { problem: 'According to the 1931 Census, India\'s total workforce was 139.5 million.',
            steps: [
            { text: 'Identify the given data: Total workforce = 139.5 million; Agriculture = 100.4 million; Manufacturing = 13.9 million.' },
            { text: 'Recall the formula for sectoral share: (Sector workforce / Total workforce) × 100.' },
            { text: 'Calculate agriculture share = (100.4 / 139.5) × 100 = 71.97% ≈ 72%.' },
            { text: 'Calculate manufacturing share = (13.9 / 139.5) × 100 = 9.96% ≈ 10%.' },
            { text: 'Calculate services share = (25.2 / 139.5) × 100 = 18.06% ≈ 18%.' },
            { text: 'Calculate workforce participation rate = (Total workforce / Total population) × 100 = (139.5 / 350) × 100 = 39.86% ≈.', faded: true, blankAnswer: 'Agriculture 72%, Manufacturing 10%, Services 18%; Workforce.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_01_012', title: 'Infrastructure: Railways, Roads and Limited Development',
          caseStudy: { intro: 'Imagine you are travelling from your village to the nearest city by train. You notice the railway line cuts through fertile fields and connects to a port.',
            decisions: [{ prompt: 'What were the two primary colonial motives for building railways in India, according to the NCERT text?', options: [
                { text: 'The two primary motives were: (1) to mobilise the army quickly across the vast territory,', outcome: 'The two primary motives were: (1) to mobilise the army quickly across the vast territory, and (2).' },
                { text: 'connecting Indian villages to markets', outcome: 'Not quite — Students often believe that because the British built a vast railway network, they "modernised".', reveals: 'because-the-british-built-a' },
                { text: 'promoting Indian industrialisation', outcome: 'Not quite — Students often believe that because the British built a vast railway network, they "modernised".', reveals: 'because-the-british-built-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a history-economics debate, the motion is: \'Colonial rule modernised India — there were cotton mills, jute mills, TISCO steel and railways by 1947, so talk of deindustrialisation is exaggeration.\' Your teammate prepares to concede: \'Fine, modern factories did exist, so the drain-of-wealth argument fails.\'',
            decisions: [{ prompt: 'How do you rebut without denying the factories?', options: [
                { text: 'Deindustrialisation means destruction of the autonomous industrial ecosystem — traditional handicrafts collapsed while modern industry grew lopsided: foreign-owned, machinery imported, markets colonial, and no capital-goods sector (\'who made TISCO\'s machines? British firms\'). Plus the export surplus never returned as investment — that drain is the mechanism, and it\'s untouched by the fact that some mills existed.', outcome: 'The claim survives precisely because it\'s structural, not absolute: industry existed but was dependent; surplus left and didn\'t come back.' },
                { text: 'Concede — if TISCO and the mills existed, India wasn\'t deindustrialised, and the drain argument collapses.', outcome: 'Existence of foreign-dominated enclaves doesn\'t refute deindustrialisation; the weavers\' muslin economy died while machine-built plants served the metropole.', reveals: 'some-industry-no-deindustrialisation' },
                { text: 'Argue the opposite extreme — India had literally zero modern industry in 1947, everything was destroyed.', outcome: 'Factually false — mills and TISCO existed; overclaiming loses the debate to any examiner citing them.', reveals: 'deindustrialisation-means-zero-industry' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_01_012', title: 'You made it',
          caseStudy: { intro: 'Colonialism didn\'t leave India without activity — it left activity wired to serve someone else\'s economy.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_007', difficulty: 'standard',
          question: 'Modern Industry\'s Limited Growth and Lopsided Pattern refers to the structural.',
          hint: 'Revisit Class 8 Economics "Capital as a Factor of Production" (c8_eco_ch1_5) and Class 10.',
          misconception: 'Students equate "modern industry" with "factory production" and assume TISCO (1907) made India a steel-producing.',
          parts: [
                { id: 'a', prompt: 'State the approximate share of the modern industrial sector in India\'s GDP at the time of independence, and name the two industries that dominated this sector.', answer: 'The modern industrial sector contributed less than 5% to GDP at independence',
                  options: ['The modern industrial sector contributed less than 5% to GDP at independence', '15-20%', 'iron and steel', 'India had iron and steel industry so capital goods were not absent'],
                  hint: 'Revisit Class 8 Economics "Capital as a Factor of Production" (c8_eco_ch1_5) and Class 10 Economics.',
                  misconception: 'Students equate "modern industry" with "factory production" and assume TISCO (1907) made India a steel-producing nation.' },
                { id: 'b', prompt: 'Explain why the absence of a capital goods industry made India\'s industrial growth "lopsided" rather than merely "slow."', answer: '"Slow" means low growth rate',
                  options: ['"Slow" means low growth rate', 'low growth rate', 'India had iron and steel industry so capital goods were not absent'],
                  hint: 'Revisit Class 8 Economics "Capital as a Factor of Production" (c8_eco_ch1_5) and Class 10 Economics.',
                  misconception: 'Students equate "modern industry" with "factory production" and assume TISCO (1907) made India a steel-producing nation.' },
                { id: 'c', prompt: 'Using the data below, calculate the ratio of consumer goods industries to capital goods industries in 1947, and interpret what this ratio implies for.', answer: 'Consumer goods total = 120+45+10+5+3 = ₹183 crore',
                  options: ['Consumer goods total = 120+45+10+5+3 = ₹183 crore', 'India had iron and steel industry so capital goods were not absent'],
                  hint: 'Revisit Class 8 Economics "Capital as a Factor of Production" (c8_eco_ch1_5) and Class 10 Economics.',
                  misconception: 'Students equate "modern industry" with "factory production" and assume TISCO (1907) made India a steel-producing nation.' }
          ],
            remediations: { 'students-equate-modern-industry-with': { steps: ['Distinguish *product categories* — list 5 consumer goods (cloth, sugar, paper) and 5 capital goods (lathe machines.', 'Check 1947 production data for each capital good — all zero.', 'Trace *why* — British tariff policy (no protection for capital goods), managing agency system (profits remitted, not.', 'Re-read NCERT para: "Hardly any capital goods industry to help promote further industrialisation." The key phrase.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "modern industry" with "factory production" and assume TISCO (1907) made India a steel-producing.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the claim: "The British developed India\'s infrastructure (railways, ports, telegraph) which laid the foundation for modern industry."', answer: 'The claim is partially true but misleading',
                  options: ['The claim is partially true but misleading', 'India had iron and steel industry so capital goods were not absent'],
                  hint: 'Revisit Class 8 Economics "Capital as a Factor of Production" (c8_eco_ch1_5) and Class 10 Economics.',
                  misconception: 'Students equate "modern industry" with "factory production" and assume TISCO (1907) made India a steel-producing nation.' },
                { id: 'b', prompt: 'Construct a counterfactual industrial structure for 1947 India that would have been "balanced" rather than "lopsided." Specify: (a) two additional capital.', answer: 'two additional capital goods industries needed, (',
                  options: ['two additional capital goods industries needed, (', 'India had iron and steel industry so capital goods were not absent'],
                  hint: 'Revisit Class 8 Economics "Capital as a Factor of Production" (c8_eco_ch1_5) and Class 10 Economics.',
                  misconception: 'Students equate "modern industry" with "factory production" and assume TISCO (1907) made India a steel-producing nation.' }
          ],
            remediations: { 'students-equate-modern-industry-with': { steps: ['Distinguish *product categories* — list 5 consumer goods (cloth, sugar, paper) and 5 capital goods (lathe machines.', 'Check 1947 production data for each capital good — all zero.', 'Trace *why* — British tariff policy (no protection for capital goods), managing agency system (profits remitted, not.', 'Re-read NCERT para: "Hardly any capital goods industry to help promote further industrialisation." The key phrase.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_008', difficulty: 'standard',
          question: 'Foreign trade composition and direction under British rule refers to the.',
          hint: 'If stuck on trade calculations, review Class 10 Statistics (c10_math_cbse_13_001) for.',
          misconception: 'Students believe "export surplus = economic strength" because modern economics teaches trade surpluses build foreign.',
          parts: [
                { id: 'a', prompt: 'Using the hypothetical data below, calculate the percentage share of Britain in India\'s total foreign trade and determine whether India had a trade surplus.', answer: 'Step 1: Total exports = 180+40+15+10+15 = 260 ₹ crore',
                  options: ['Step 1: Total exports = 180+40+15+10+15 = 260 ₹ crore', 'export surplus = economic strength'],
                  hint: 'If stuck on trade calculations, review Class 10 Statistics (c10_math_cbse_13_001) for percentage.',
                  misconception: 'Students believe "export surplus = economic strength" because modern economics teaches trade surpluses build foreign reserves.' }
          ],
            remediations: { 'export-surplus-economic-strength-because': { steps: ['Revisit the distinction between visible trade (goods) and invisible trade (services, interest, profits) using.', 'Calculate net transfer = visible surplus - invisible deficits using Dadabhai Naoroji\'s 1880 estimates (export surplus.', 'Connect to Node c11_eco_cbse_01_009 (Drain of Wealth) — the export surplus *was* the drain.', 'Contrast with post-1991 India where export surpluses *do* build forex reserves because there are no colonial home.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_009', difficulty: 'standard',
          question: 'The Drain of Wealth theory, propounded by Dadabhai Naoroji in his 1867 work.',
          hint: 'Revisit c11_eco_cbse_01_008 (Foreign Trade) to see how export surplus was generated, and.',
          misconception: 'Students believe the Drain of Wealth was simply "Britain stealing gold from India" — a literal bullion drain.',
          parts: [
                { id: 'a', prompt: 'Using Naoroji\'s 1880 estimate that India\'s annual drain was £30-40 million against a national income of approximately £500 million, calculate the drain as.', answer: 'Step 1: Naoroji\'s range: £30m/£500m = 6%',
                  options: ['Step 1: Naoroji\'s range: £30m/£500m = 6%', 'Britain stealing gold from India'],
                  hint: 'Revisit c11_eco_cbse_01_008 (Foreign Trade) to see how export surplus was generated, and.',
                  misconception: 'Students believe the Drain of Wealth was simply "Britain stealing gold from India" — a literal bullion drain.' }
          ],
            remediations: { 'the-drain-of-wealth-was': { steps: ['If the student conflates drain with literal gold outflow: (1) Have them trace a single transaction: Indian peasant pays.', 'No gold moves; real goods (grain, cotton) move from India to Britain.', '(2) Use the identity: Export Surplus = Net Invisible Debits + Capital Inflow.', 'Show historical data (1900): Export Surplus £80m, Invisible Debits £65m, Capital Inflow £15m.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_010', difficulty: 'standard',
          question: 'Demographic conditions refer to the quantitative and qualitative.',
          hint: 'If stuck on demographic indicators, revisit c8_eco_ch2_6 (Birth Rate and Death Rate) and.',
          misconception: 'Students often think "high mortality was inevitable in a tropical country" or "British built hospitals so health.',
          parts: [
                { id: 'a', prompt: 'Using the data: Life expectancy at birth = 32 years; IMR = 218/1000; Female literacy = 7%.', answer: 'Step 1: Probability of surviving infancy = 1 - 0.218 = 0.782',
                  options: ['Step 1: Probability of surviving infancy = 1 - 0.218 = 0.782', 'high mortality was inevitable in a tropical country', 'British built hospitals so health improved'],
                  hint: 'If stuck on demographic indicators, revisit c8_eco_ch2_6 (Birth Rate and Death Rate) and.',
                  misconception: 'Students often think "high mortality was inevitable in a tropical country" or "British built hospitals so health improved." The error.' }
          ],
            remediations: { 'high-mortality-was-inevitable-in': { steps: ['Re-read NCERT Section 1.6 "Demographic Condition" — highlight every quantitative indicator (IMR 218, LE 32, literacy.', 'Create a cause-effect chain: Zamindari → Rent extraction → Peasant indebtedness → Malnutrition → Low immunity → High.', 'Compare with Class 8 Demography (c8_eco_ch2_6) formulas: CDR = Deaths/Population × 1000.', 'Practice calculating "years of life lost" — if LE=32 and potential LE=70, each death loses 38 years.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_011', difficulty: 'standard',
          question: 'Occupational structure refers to the distribution of the working population.',
          hint: 'Review Class 10 Economics Chapter 2 (Sectors of the Indian Economy) nodes.',
          misconception: 'Students often think that a high percentage of workforce in agriculture means agriculture contributed a similarly high.',
          parts: [
                { id: 'a', prompt: 'Using the 1931 Census data: total workforce = 100 million, agriculture = 72 million, manufacturing = 10 million, services = 18 million.', answer: 'Step 1: Original shares: Agriculture = 72%, Manufacturing = 10%, Services = 18%',
                  options: ['Step 1: Original shares: Agriculture = 72%, Manufacturing = 10%, Services = 18%', 'occupational structure', 'sectoral composition of GDP', 'they move together'],
                  hint: 'Review Class 10 Economics Chapter 2 (Sectors of the Indian Economy) nodes c10_eco_cbse_02_001 and.',
                  misconception: 'Students often think that a high percentage of workforce in agriculture means agriculture contributed a similarly high percentage to GDP.' },
                { id: 'b', prompt: 'Compare the occupational structure of the Madras Presidency (where agriculture\'s share declined) with that of Orissa (where it increased) during the colonial.', answer: 'Madras Presidency saw growth in manufacturing (textiles) and services (port,',
                  options: ['Madras Presidency saw growth in manufacturing (textiles) and services (port,', 'better soil', 'culture', 'occupational structure'],
                  hint: 'Review Class 10 Economics Chapter 2 (Sectors of the Indian Economy) nodes c10_eco_cbse_02_001 and.',
                  misconception: 'Students often think that a high percentage of workforce in agriculture means agriculture contributed a similarly high percentage to GDP.' }
          ],
            remediations: { 'a-high-percentage-of-workforce': { steps: ['If the student confuses workforce share with GDP share, have them calculate labor productivity (output per worker) for.', 'Show that agriculture\'s output per worker is 0.69, industry\'s is 2.0, services\' is 1.67.', 'Then ask: "Why does agriculture employ 72% but produce only 50%?" This reveals disguised unemployment.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_012', difficulty: 'standard',
          question: 'Infrastructure under colonial rule refers to the basic physical and.',
          hint: 'If stuck, revisit the *Drain of Wealth* node (c11_eco_cbse_01_009) and the.',
          misconception: 'Students often believe that because the British built a vast railway network, they "modernised" India\'s economy.',
          parts: [
                { id: 'a', prompt: 'Using the data below, calculate the approximate percentage of India\'s railway network that served direct colonial extraction purposes if 80% of freight traffic.', answer: 'Step 1: Identify the proxy',
                  options: ['Step 1: Identify the proxy', 'modernised'],
                  hint: 'If stuck, revisit the *Drain of Wealth* node (c11_eco_cbse_01_009) and the *Commercialisation.',
                  misconception: 'Students often believe that because the British built a vast railway network, they "modernised" India\'s economy.' },
                { id: 'b', prompt: 'Compare the impact of railways on (a) village self-sufficiency and (b) volume of India\'s exports.', answer: 'village self-sufficiency and (',
                  options: ['village self-sufficiency and (', 'exports brought gold into India', 'modernised'],
                  hint: 'If stuck, revisit the *Drain of Wealth* node (c11_eco_cbse_01_009) and the *Commercialisation.',
                  misconception: 'Students often believe that because the British built a vast railway network, they "modernised" India\'s economy.' }
          ],
            remediations: { 'because-the-british-built-a': { steps: ['If a student holds this misconception, do this 3-step remediation: 1.', '**Map Exercise**: On an outline map of India, plot the major railway lines as of 1947.', 'Observe clustering around ports (Bombay, Calcutta, Madras) and mineral belts (Jharia, Raniganj) — not population.', '**Data Comparison**: Compare per capita railway route length in 1947 (≈0.15 km per 1000 people) with that in Britain.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
