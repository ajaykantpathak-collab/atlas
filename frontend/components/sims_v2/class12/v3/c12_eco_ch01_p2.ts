import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch01_p2: SimDef = {
    id: 'v3_c12_eco_ch01_p2',
    title: 'Introduction · Part 2/2',
    subtitle: 'Even billionaires can\'t buy a 25th hour',
    classLevel: 12, subject: 'economics', topic: 'Introduction · Part 2/2',
    chapters: ['c12_eco_ch01'],
    nodeIds: ['c12_eco_cbse_01_007', 'c12_eco_cbse_01_008', 'c12_eco_cbse_01_009', 'c12_eco_cbse_01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Economist', intro: 'Unlimited wants, limited resources — that collision is the whole of economics. Everything else is detail.', goal: 'Explain scarcity, choice and opportunity cost, and frame the economy\'s central problems on a PPF.' },
    discovery: {
        question: 'A billionaire and a street vendor both face scarcity. The billionaire has every rupee she needs — so what\'s still scarce for her?',
        options: ['Time, attention and unique goods — scarcity is unlimited wants versus limited resources, and no fortune buys a 25th hour', 'Nothing — scarcity is only a poor person\'s problem', 'Her accountant handles scarcity for her', 'Money — even billionaires run out eventually'],
        answer: 'Time, attention and unique goods — scarcity is unlimited wants versus limited resources, and no fortune buys a 25th hour',
        hook: 'Scarcity isn\'t shortage — a shortage is a temporary market gap; scarcity is permanent and universal. And opportunity cost isn\'t what you spent — it\'s the next best alternative you gave up, including the ₹3 lakh salary a student forgoes for college.',
    },
    teaching: [
        { title: 'Positive and Normative Economics: Meaning and Difference', text: 'Positive economics deals with objective, testable statements about how the economy works — describing "what is" or "what will be" based on cause-effect relationships that can be verified with data.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Put a price on every choice: compute the opportunity cost of a Sunday\'s three options, then draw the trade-offs a Punjab farmer faces choosing wheat over rice on the production possibility frontier.',
        labels: ['Positive and Normative Economics', 'Economic Agents: Households, Firms', 'Circular Flow of Income', 'Assumptions of the Circular'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eco_cbse_01_007', title: 'Positive and Normative Economics: Meaning and Difference',
          caseStudy: { intro: 'Imagine you\'re reading a news headline: "RBI raises repo rate to 6.5% to control inflation." A classmate says, "That\'s good — high interest rates hurt poor.',
            decisions: [{ prompt: 'Classify the following statement as positive or normative: "India\'s fiscal deficit for 2023-24 was 5.8% of GDP."', options: [
                { text: '**Answer:** Positive', outcome: '**Answer:** Positive. It states a measurable fact about a past macroeconomic variable that can.' },
                { text: 'normative', outcome: 'Not quite — Students often think "positive = good/desirable" and "normative = bad/opinionated" because of the.', reveals: 'positive-good-desirable-and-normative' },
                { text: 'they confuse a factual magnitude with a value judgment', outcome: 'Not quite — Students often think "positive = good/desirable" and "normative = bad/opinionated" because of the.', reveals: 'positive-good-desirable-and-normative' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_01_008', title: 'Economic Agents: Households, Firms and Government',
          caseStudy: { intro: 'Imagine a typical Indian village: **Ramesh\'s family** (household) works on their own farm and also as labourers for **GreenFields Agro Ltd.** (firm), earning.',
            decisions: [{ prompt: 'Define \'economic agent\' in the macroeconomic sense and name the three primary domestic agents identified in the NCERT framework.', options: [
                { text: 'An economic agent is any individual or institution that takes economic decisions (what to', outcome: 'An economic agent is any individual or institution that takes economic decisions (what to produce.' },
                { text: '\'banks\' or \'RBI\' as a primary agent instead of government', outcome: 'Not quite — **"Households only consume; firms only produce; government only taxes."** Students memorise these.', reveals: 'households-only-consume' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_01_009', title: 'Circular Flow of Income: Real and Money Flows',
          scaffold: { problem: 'In a simple two-sector economy, firms produce 25,000 units of a good at ₹40 per unit.',
            steps: [
            { text: 'Identify the given data — quantity = 25,000 units, price = ₹40/unit, wages = ₹5,00,000, rent = ₹3,00,000, interest.' },
            { text: 'Calculate value of output using the formula: Value of Output = Quantity × Price = 25,000 × ₹40 = ₹10,00,000.' },
            { text: 'Calculate total known factor payments: Wages + Rent + Interest = ₹5,00,000 + ₹3,00,000 + ₹2,00,000 = ₹10,00,000.' },
            { text: 'Since Total Factor Payments must equal Value of Output in this model, Profit = Value of Output − (Wages + Rent.' },
            { text: 'Total Factor Payments = ₹10,00,000 + ₹0 = ₹10,00,000. Consumption Expenditure = Total Factor Payments (since.' },
            { text: 'Verify identity: Value of Output (₹10,00,000) = Total Factor Payments (₹10,00,000) = Consumption Expenditure.', faded: true, blankAnswer: '(a) Value of Output = ₹10,00,000; (b) Profit = ₹0; (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_01_010', title: 'Assumptions of the Circular Flow Model (Two-Sector Economy)',
          scaffold: { problem: 'In a hypothetical two-sector economy, firms pay ₹500 crore as wages, ₹200 crore as rent, ₹150 crore as interest, and ₹150 crore as profit.',
            steps: [
            { text: 'Identify the factor payments made by firms to households: wages (₹500 cr), rent (₹200 cr), interest (₹150 cr), profit.' },
            { text: 'Sum all factor payments to get aggregate income Y = 500 + 200 + 150 + 150 = ₹1,000 crore.' },
            { text: 'Apply the "no savings" assumption: households spend entire income on consumption, so C = Y = ₹1,000 crore.' },
            { text: 'Verify equilibrium: Money flow from firms to households (factor payments) = ₹1,000 crore.' },
            { text: 'Interpret economically: In this simplified economy, every rupee earned returns to firms as revenue, allowing them.', faded: true, blankAnswer: 'Y = ₹1,000 crore, C = ₹1,000 crore, Equilibrium holds (Y.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On Sunday a student picks a free cricket match over a ₹500 tutoring shift and a study block, then tells his mother the outing \'cost nothing — entry was free\'.',
            decisions: [{ prompt: 'What did the afternoon actually cost?', options: [
                { text: 'The value of the next best alternative forgone — the ₹500 earnings if work outranks study for him; zero ticket price doesn\'t make the choice costless because his time was scarce.', outcome: 'Opportunity cost is what you gave up, not what you paid; a free event still consumes hours that had a best alternative use.' },
                { text: 'Nothing — with no money spent, there\'s no cost at all.', outcome: 'Scarcity binds through time even when price is zero; every choice forfeits a next-best use.', reveals: 'free-means-no-cost' },
                { text: 'The combined value of everything else he could have done — tutoring pay plus study gains together.', outcome: 'Opportunity cost is the single best alternative, not the sum of all forgone options — you could only ever have picked one of them.', reveals: 'cost-is-all-alternatives' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_01_010', title: 'You made it',
          caseStudy: { intro: 'You now see the hidden price tag on every decision — the forgone alternative. That single idea powers everything from consumer theory to government budgets.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_007', difficulty: 'standard',
          question: 'Positive economics deals with objective, testable statements about how the.',
          hint: 'If confused, revisit Class 9 "Choice and Opportunity Cost" (c9_eco_ch1_3) and Class 12.',
          misconception: 'Students often think "positive = good/desirable" and "normative = bad/opinionated" because of the everyday meaning.',
          parts: [
                { id: 'a', prompt: 'Classify the following statement as positive or normative: "India\'s fiscal deficit for 2023-24 was 5.8% of GDP."', answer: '**Answer:** Positive',
                  options: ['**Answer:** Positive', 'normative', 'they confuse a factual magnitude with a value judgment', 'normative = bad/opinionated'],
                  hint: 'If confused, revisit Class 9 "Choice and Opportunity Cost" (c9_eco_ch1_3) and Class 12 "Scarcity.',
                  misconception: 'Students often think "positive = good/desirable" and "normative = bad/opinionated" because of the everyday meaning of "positive.".' },
                { id: 'b', prompt: 'Explain why "The government should increase MGNREGA wages to ensure a living wage for rural workers" is a normative statement, even though it references.', answer: '**Answer:** The statement contains "should" and "living wage"',
                  options: ['**Answer:** The statement contains "should" and "living wage"', 'positive because MGNREGA is real', 'should increase', 'positive = good/desirable'],
                  hint: 'If confused, revisit Class 9 "Choice and Opportunity Cost" (c9_eco_ch1_3) and Class 12 "Scarcity.',
                  misconception: 'Students often think "positive = good/desirable" and "normative = bad/opinionated" because of the everyday meaning of "positive.".' }
          ],
            remediations: { 'positive-good-desirable-and-normative': { steps: ['Revisit the definition: write "Positive = testable with data (what is/what will be)" and "Normative = value judgment.', 'Take 5 headlines from today\'s *Business Standard* or *Economic Times*.', 'Highlight every "should," "must," "fair," "unjust" → label N.', 'Highlight every measurable claim (%, ₹, employment numbers) → label P.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "positive = good/desirable" and "normative = bad/opinionated" because of the everyday meaning.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Positive economics is more scientific than normative economics, so policymakers should ignore normative statements." Is the claim itself.', answer: '**Answer:** The claim is **normative**',
                  options: ['**Answer:** The claim is **normative**', 'positive because it describes what economics does', 'should', 'positive = good/desirable'],
                  hint: 'If confused, revisit Class 9 "Choice and Opportunity Cost" (c9_eco_ch1_3) and Class 12 "Scarcity.',
                  misconception: 'Students often think "positive = good/desirable" and "normative = bad/opinionated" because of the everyday meaning of "positive.".' },
                { id: 'b', prompt: 'Construct two statements about India\'s Public Distribution System (PDS): one positive, one normative.', answer: '**Sample positive:** "PDS grain leakage in 2022-23 was estimated at 28% of total',
                  options: ['**Sample positive:** "PDS grain leakage in 2022-23 was estimated at 28% of total', 'positive = good/desirable', 'normative = bad/opinionated', 'positive'],
                  hint: 'If confused, revisit Class 9 "Choice and Opportunity Cost" (c9_eco_ch1_3) and Class 12 "Scarcity.',
                  misconception: 'Students often think "positive = good/desirable" and "normative = bad/opinionated" because of the everyday meaning of "positive.".' }
          ],
            remediations: { 'positive-good-desirable-and-normative': { steps: ['Revisit the definition: write "Positive = testable with data (what is/what will be)" and "Normative = value judgment.', 'Take 5 headlines from today\'s *Business Standard* or *Economic Times*.', 'Highlight every "should," "must," "fair," "unjust" → label N.', 'Highlight every measurable claim (%, ₹, employment numbers) → label P.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_008', difficulty: 'standard',
          question: 'Economic agents are the decision-making units in an economy that undertake.',
          hint: 'If stuck on agent classification, revisit **c8_eco_ch1_2** (Factors of Production) and.',
          misconception: '**"Households only consume; firms only produce; government only taxes."** Students memorise these as rigid, exclusive.',
          parts: [
                { id: 'a', prompt: 'In a mixed economy like India, the government produces goods/services (e.g., railways, defence) AND regulates private firms.', answer: 'As a **producer**, the government wants its enterprises (e.g., BSNL, Air India',
                  options: ['As a **producer**, the government wants its enterprises (e.g., BSNL, Air India', 'government firms are always inefficient', 'regulation always helps public firms'],
                  hint: 'If stuck on agent classification, revisit **c8_eco_ch1_2** (Factors of Production) and.',
                  misconception: '**"Households only consume; firms only produce; government only taxes."** Students memorise these as rigid, exclusive roles.' }
          ],
            remediations: { 'households-only-consume': { steps: ['Revisit **c8_eco_ch1_2** (Factors of Production) and **c8_eco_ch1_6** (Entrepreneurship) to recall that households.', 'Draw a **two-column table**: Column A = "Activities of Ramesh\'s Family" (work, save, buy, sell surplus milk, pay tax).', 'Fill it for 10 activities.', 'Read the NCERT paragraph starting "In both the developed and developing countries, apart from the private capitalist.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_009', difficulty: 'standard',
          question: 'The circular flow of income illustrates the continuous movement of goods.',
          hint: 'If stuck, review c9_eco_ch1_7 (Factors of Production) and c12_eco_cbse_01_008 (Economic.',
          misconception: 'Students believe that "money flow creates real flow" or that money circulates independently of goods/services.',
          parts: [
                { id: 'a', prompt: 'In the two-sector circular flow model, which of the following represents a real flow from households to firms?', answer: 'Correct answer: C) Labour services supplied by workers',
                  options: ['Correct answer: C) Labour services supplied by workers', 'payment for labour', 'money flow creates real flow', '"payment for labour" is the real flow rather than the labour service itself'],
                  hint: 'If stuck, review c9_eco_ch1_7 (Factors of Production) and c12_eco_cbse_01_008 (Economic Agents).',
                  misconception: 'Students believe that "money flow creates real flow" or that money circulates independently of goods/services.' },
                { id: 'b', prompt: 'A firm produces 10,000 units of a good at ₹50 per unit. It pays ₹2,00,000 as wages, ₹1,50,000 as rent, ₹1,00,000 as interest, and the rest as profit.', answer: 'Step 1: Value of output = 10,000 units × ₹50 = ₹5,00,000',
                  options: ['Step 1: Value of output = 10,000 units × ₹50 = ₹5,00,000', 'money flow creates real flow'],
                  hint: 'If stuck, review c9_eco_ch1_7 (Factors of Production) and c12_eco_cbse_01_008 (Economic Agents).',
                  misconception: 'Students believe that "money flow creates real flow" or that money circulates independently of goods/services.' },
                { id: 'c', prompt: 'Compare the direction of real flow and money flow between households and firms in the circular flow diagram. Why do they flow in opposite directions?', answer: 'Correct answer: Real flow of factor services goes from households → firms',
                  options: ['Correct answer: Real flow of factor services goes from households → firms', 'money follows goods', 'money flow creates real flow', 'both flows go the same way (e'],
                  hint: 'If stuck, review c9_eco_ch1_7 (Factors of Production) and c12_eco_cbse_01_008 (Economic Agents).',
                  misconception: 'Students believe that "money flow creates real flow" or that money circulates independently of goods/services.' }
          ],
            remediations: { 'money-flow-creates-real-flow': { steps: ['Revisit c12_eco_cbse_01_008 (Economic Agents) to clarify that households own factors and firms hire them.', 'Use a physical analogy — a barter exchange where a farmer gives wheat (real flow) to a weaver who gives cloth (real.', 'Draw the two-sector diagram from memory, labeling all 4 factor payments and 2 real flows.', 'Take the diagnostic question 3 again with different numbers (e.g., output = 500 units @ ₹20, wages = ₹4,000, rent.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_010', difficulty: 'standard',
          question: 'The assumptions of the two-sector circular flow model are the simplifying.',
          hint: 'If stuck, review the distinction between real flows (goods, services, factor services).',
          misconception: 'Students often believe the two-sector circular flow model assumes that savings are zero in the real world.',
          parts: [
                { id: 'a', prompt: 'State any four assumptions of the two-sector circular flow model of income.', answer: 'The four core assumptions are: (1) The economy consists of only two sectors',
                  options: ['The four core assumptions are: (1) The economy consists of only two sectors', 'savings are channelled through banks', 'government collects taxes', 'savings are zero in the real world'],
                  hint: 'If stuck, review the distinction between real flows (goods, services, factor services) and money.',
                  misconception: 'Students often believe the two-sector circular flow model assumes that savings are zero in the real world.' }
          ],
            remediations: { 'the-two-sector-circular-flow': { steps: ['If the student cannot distinguish between a modelling assumption and a real-world description, have them: (1) Revisit.', '(2) Draw the two-sector diagram from memory, then add a "Savings" arrow and ask "Where does this money go?" — leading.', '(3) Use a numerical example: Household income ₹100, consumption ₹80, savings ₹20.', 'Show that without a financial sector, firms only receive ₹80, so factor payments cannot be ₹100.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
