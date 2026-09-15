import type { SimDef } from '../../engine/types';

/** v3 generated — c9_eco_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_eco_ch01_p1: SimDef = {
    id: 'v3_c9_eco_ch01_p1',
    title: 'Understanding Economics: Scarcity and Choice · Part 1/2',
    subtitle: 'Why you can never have it all',
    classLevel: 9, subject: 'economics', topic: 'Understanding Economics: Scarcity and Choice · Part 1/2',
    chapters: ['c9_eco_ch01'],
    nodeIds: ['c9_eco_ch1_1', 'c9_eco_ch1_10', 'c9_eco_ch1_11', 'c9_eco_ch1_2', 'c9_eco_ch1_3', 'c9_eco_ch1_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a budget-stretched planner', intro: '₹500, five wishes, one week — your pocket-money crisis is the whole economy in miniature. Find out why \'just produce more\' never ends the problem.', goal: 'Understand scarcity as unlimited wants versus limited resources — the root of every economy — and the three central questions (what, how, for whom) it forces on every society.' },
    discovery: {
        question: 'Clean air is free in a mountain village but \'scarce\' in Delhi — nobody sells it in either place, so how can air be scarce?',
        options: ['Scarcity = wants exceeding supply, not price tags: in Delhi, demand for clean air outruns its shrinking supply', 'It can\'t — only things with prices can be scarce', 'Delhi\'s air is scarce because it\'s dirty', 'Village air is different air'],
        answer: 'Scarcity = wants exceeding supply, not price tags: in Delhi, demand for clean air outruns its shrinking supply',
        hook: 'Scarcity isn\'t shortage or poverty — even a billionaire faces it, because wants are unlimited while land, time and resources aren\'t. Rich or poor, every society must still answer what to produce, how, and for whom.',
    },
    teaching: [
        { title: 'Scarcity: The Fundamental Economic Problem', text: 'Scarcity is the fundamental economic problem arising because human wants are unlimited while the resources (land, labour, capital, entrepreneurship) available to satisfy them are limited in supply.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_eco_ch1_1', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Take a ₹500 pocket-money dilemma and a 10-hectare farm and find the three questions hiding inside every choice — what to make, how to make it, who gets it — then test whether getting richer ever makes scarcity disappear.',
        labels: ['Scarcity: The Fundamental Economic', 'Public Goods: Characteristics', 'India\'s Post-1991 Economic Reforms', 'Unlimited Wants and Limited', 'Choice and Opportunity Cost', 'What to Produce: Economic'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_eco_ch1_1', title: 'Scarcity: The Fundamental Economic Problem',
          caseStudy: { intro: 'Imagine a Class 9 student named Rohan who has ₹500 pocket money for the week but wants to buy a new cricket bat (₹2000), go to a movie with friends (₹300), buy.',
            decisions: [{ prompt: 'Define scarcity in economics and state the two conditions that must both be true for scarcity to exist.', options: [
                { text: 'Correct answer: Scarcity is the condition where unlimited human wants exceed the limited', outcome: 'Correct answer: Scarcity is the condition where unlimited human wants exceed the limited resources.' },
                { text: 'limited resources', outcome: 'Not quite — Students believe scarcity is the same as "shortage" or "poverty".', reveals: 'scarcity-is-the-same-as' },
                { text: 'scarcity means shortage of a specific good', outcome: 'Not quite — Students believe scarcity is the same as "shortage" or "poverty".', reveals: 'scarcity-is-the-same-as' }
            ] }] } },
        { type: 'case', nodeId: 'c9_eco_ch1_10', title: 'Public Goods: Characteristics and Government Provision',
          caseStudy: { intro: 'Imagine you are walking home at 8 PM in your neighbourhood in Bengaluru.',
            decisions: [{ prompt: 'Define a public good using the two essential economic characteristics. Give one example of a public good provided by the Indian government.', options: [
                { text: 'A public good is **non-excludable** (no one can be prevented from using it) and', outcome: 'A public good is **non-excludable** (no one can be prevented from using it) and **non-rivalrous**.' },
                { text: 'a good provided by the government', outcome: 'Not quite — **Misconception:** "Any good provided free by the government is a public good." **Exact error:**.', reveals: 'misconception-any-good-provided-free' }
            ] }] } },
        { type: 'case', nodeId: 'c9_eco_ch1_11', title: 'India\'s Post-1991 Economic Reforms: Liberalisation',
          caseStudy: { intro: 'Imagine your family runs a small textile factory in 1990: you need a government licence to produce more cloth, cannot import better machinery without.',
            decisions: [{ prompt: 'What was the level of India\'s foreign exchange reserves in June 1991, and why did this trigger the economic reforms?', options: [
                { text: 'India\'s foreign exchange reserves stood at approximately $1.2 billion in June 1991,', outcome: 'India\'s foreign exchange reserves stood at approximately $1.2 billion in June 1991, sufficient for.' },
                { text: '$5 billion', outcome: 'Not quite — Students often believe "liberalisation meant the government stopped all regulation" — confusing.', reveals: 'liberalisation-meant-the-government-stopped' },
                { text: 'reserves were comfortable', outcome: 'Not quite — Students often believe "liberalisation meant the government stopped all regulation" — confusing.', reveals: 'liberalisation-meant-the-government-stopped' }
            ] }] } },
        { type: 'case', nodeId: 'c9_eco_ch1_2', title: 'Unlimited Wants and Limited Resources',
          caseStudy: { intro: 'Imagine a small farmer in Maharashtra with 2 hectares of land (limited resource).',
            decisions: [{ prompt: 'Define \'limited resources\' in economics and name the four categories of factors of production.', options: [
                { text: 'Limited resources are the scarce factors of production used to create goods and services:', outcome: 'Limited resources are the scarce factors of production used to create goods and services: land.' },
                { text: 'raw materials', outcome: 'Not quite — Students believe scarcity is only a problem for the poor or developing countries.', reveals: 'scarcity-is-only-a-problem' },
                { text: 'scarcity is only a problem for the poor or developing countries', outcome: 'Not quite — Students believe scarcity is only a problem for the poor or developing countries.', reveals: 'scarcity-is-only-a-problem' }
            ] }] } },
        { type: 'case', nodeId: 'c9_eco_ch1_3', title: 'Choice and Opportunity Cost: Definition and Examples',
          caseStudy: { intro: 'Imagine you have ₹500 to spend on a Sunday afternoon. You can either watch a movie (ticket ₹300, snacks ₹150, travel ₹50) or buy a second-hand cricket bat.',
            decisions: [{ prompt: 'Define opportunity cost in your own words and give a one-sentence example from daily life.', options: [
                { text: 'Correct answer: Opportunity cost is the value of the next best alternative given up when', outcome: 'Correct answer: Opportunity cost is the value of the next best alternative given up when a choice.' },
                { text: 'the money spent', outcome: 'Not quite — Students believe opportunity cost is the sum of all alternatives forgone, or only the monetary.', reveals: 'opportunity-cost-is-the-sum' }
            ] }] } },
        { type: 'case', nodeId: 'c9_eco_ch1_4', title: 'What to Produce: Economic Decision Making',
          caseStudy: { intro: 'Imagine a farmer in Punjab with 10 hectares of land who must decide whether to grow wheat, rice, or sugarcane this season.',
            decisions: [{ prompt: 'Define the "What to Produce" problem in economics and state the two main factors that influence this decision in a market economy.', options: [
                { text: 'The "What to Produce" problem is the decision of', outcome: 'The "What to Produce" problem is the decision of which goods and services and in what quantities.' },
                { text: 'government decides', outcome: 'Not quite — Students often believe the "What to Produce" decision is made independently by each producer based.', reveals: 'the-what-to-produce-decision' },
                { text: 'producers decide arbitrarily', outcome: 'Not quite — Students often believe the "What to Produce" decision is made independently by each producer based.', reveals: 'the-what-to-produce-decision' }
            ] }] } },
        { type: 'case', nodeId: 'c9_eco_ch1_1', title: 'A real-world call',
          caseStudy: { intro: 'A vaccine exists for a disease that mainly kills in poor countries. Developing it cost billions; the countries that need it can least afford it.',
            decisions: [{ prompt: 'Should medicine be priced by what it cost or by who needs it?', options: [
                { text: 'By cost — unfunded research doesn\'t happen', outcome: 'The innovation answer; honest that it means the poorest wait longest for the medicine they need most.' },
                { text: 'By need — a medicine that doesn\'t reach the sick failed', outcome: 'The access answer; without the pipeline of profitable drugs, the next vaccine never gets funded.' },
                { text: 'Tier it — rich countries pay full price, poor ones pay cost', outcome: 'The differential-pricing answer — actually used for HIV drugs; works only if wealthier markets accept subsidizing the rest.' }
            ] }] } },
        { type: 'case', nodeId: 'c9_eco_ch1_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Scrolling a rich celebrity\'s interview, Rohan scoffs: \'Scarcity is a poor family\'s problem — a billionaire faces none.\' Yet the same billionaire must choose which of three rival projects to fund, and still has only 24 hours a day.',
            decisions: [{ prompt: 'Who is right about scarcity?', options: [
                { text: 'Scarcity is universal, not a poverty symptom — it exists whenever wants outrun resources, and every budget, from ₹500 of pocket money to a ₹45 lakh crore national budget, must still answer what to produce, how, and for whom.', outcome: 'This keeps the two-sided definition — unlimited wants against limited means — which holds at every income level.' },
                { text: 'Rohan is right — once you can afford everything you want, scarcity disappears.', outcome: 'Wants expand with means, and some resources — time, land, attention — stay fixed for everyone; even a billionaire\'s choices sacrifice alternatives.', reveals: 'rich-means-no-scarcity' },
                { text: 'Both miss it — scarcity is just a shortage, solved whenever shops restock the shelves.', outcome: 'A shortage is a temporary gap at a price; scarcity is the permanent condition that wants exceed resources — restocking never ends it.', reveals: 'scarcity-is-shortage' }
            ] }] } },
        { type: 'case', nodeId: 'c9_eco_ch1_4', title: 'The bigger picture',
          caseStudy: { intro: 'Unlimited wants + limited resources = the permanent itch called scarcity. It forces every household and every government to choose — and choosing anything always costs the alternative you gave up.',
            decisions: [{ prompt: 'What comes next? Understanding Economics: Scarcity and Choice · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Understanding Economics: Scarcity and Choice · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_eco_ch1_1', difficulty: 'standard',
          question: 'Scarcity is the fundamental economic problem arising because human wants are.',
          hint: 'If stuck, revisit c8_eco_ch1_2 (Factors of Production: Definition and Types) and classify.',
          misconception: 'Students believe scarcity is the same as "shortage" or "poverty".',
          parts: [
                { id: 'a', prompt: 'A farmer in Punjab has 10 hectares of land. He can grow either wheat (yield 5 tonnes/hectare, price ₹2200/tonne) or rice (yield 4 tonnes/hectare, price.', answer: 'Step 1: Wheat revenue = 10 hectares × 5 tonnes/hectare × ₹2200/tonne = ₹1,10,000',
                  options: ['Step 1: Wheat revenue = 10 hectares × 5 tonnes/hectare × ₹2200/tonne = ₹1,10,000', 'shortage', 'poverty', 'If we produce more, scarcity goes away'],
                  hint: 'If stuck, revisit c8_eco_ch1_2 (Factors of Production: Definition and Types) and classify 5 items.',
                  misconception: 'Students believe scarcity is the same as "shortage" or "poverty".' },
                { id: 'b', prompt: 'Compare the scarcity problem faced by a household (monthly income ₹30,000) and the Government of India (annual budget ₹45 lakh crore).', answer: 'Similarities: (1) Both have unlimited wants (household: better food, education,',
                  options: ['Similarities: (1) Both have unlimited wants (household: better food, education,', 'government can print money so it has no scarcity', 'shortage', 'poverty'],
                  hint: 'If stuck, revisit c8_eco_ch1_2 (Factors of Production: Definition and Types) and classify 5 items.',
                  misconception: 'Students believe scarcity is the same as "shortage" or "poverty".' }
          ],
            remediations: { 'scarcity-is-the-same-as': { steps: ['Ask the student to list 5 things they want right now (unlimited wants).', 'Ask them to list the resources they have to get those things (money, time, skills — all limited).', 'Show that even if you double their money, new wants appear (better phone, travel, investments).', 'Contrast with a *shortage*: "Onion price ₹100/kg last month, now ₹30/kg" — shortage disappeared, but scarcity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe scarcity is the same as "shortage" or "poverty".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "If India becomes a developed country with high per capita income, the problem of scarcity will be solved." Use economic reasoning.', answer: 'The statement is false',
                  options: ['The statement is false', 'shortage', 'poverty', 'If we produce more, scarcity goes away'],
                  hint: 'If stuck, revisit c8_eco_ch1_2 (Factors of Production: Definition and Types) and classify 5 items.',
                  misconception: 'Students believe scarcity is the same as "shortage" or "poverty".' }
          ],
            remediations: { 'scarcity-is-the-same-as': { steps: ['Ask the student to list 5 things they want right now (unlimited wants).', 'Ask them to list the resources they have to get those things (money, time, skills — all limited).', 'Show that even if you double their money, new wants appear (better phone, travel, investments).', 'Contrast with a *shortage*: "Onion price ₹100/kg last month, now ₹30/kg" — shortage disappeared, but scarcity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_10', difficulty: 'standard',
          question: 'Public goods are goods characterized by **non-excludability** (impossible.',
          hint: 'Revisit **c9_eco_ch1_4 (What to Produce)** and **c9_eco_ch1_8 (Planned vs Market.',
          misconception: '**Misconception:** "Any good provided free by the government is a public good." **Exact error:** Students conflate.',
          parts: [
                { id: 'a', prompt: 'Define a public good using the two essential economic characteristics. Give one example of a public good provided by the Indian government.', answer: 'A public good is **non-excludable** (no one can be prevented from using it) and',
                  options: ['A public good is **non-excludable** (no one can be prevented from using it) and', 'a good provided by the government'],
                  hint: 'Revisit **c9_eco_ch1_4 (What to Produce)** and **c9_eco_ch1_8 (Planned vs Market.',
                  misconception: '**Misconception:** "Any good provided free by the government is a public good." **Exact error:** Students conflate *zero-price provision*.' },
                { id: 'b', prompt: 'Compare **national defense** and **a toll highway**. Both are provided by the government.', answer: '| Characteristic | National Defense | Toll Highway |',
                  options: ['| Characteristic | National Defense | Toll Highway |', 'both are public goods'],
                  hint: 'Revisit **c9_eco_ch1_4 (What to Produce)** and **c9_eco_ch1_8 (Planned vs Market.',
                  misconception: '**Misconception:** "Any good provided free by the government is a public good." **Exact error:** Students conflate *zero-price provision*.' }
          ],
            remediations: { 'misconception-any-good-provided-free': { steps: ['Draw a 2×2 matrix on paper: rows = Excludable / Non-excludable; columns = Rivalrous / Non-rivalrous.', 'Place these goods in correct cells: **National defense, Streetlight, Clean air, Toll road, Mid-Day Meal, Ujjwala LPG.', 'Label each cell: Public Good / Club Good / Common Resource / Private Good.', 'For each, write *one sentence* explaining *why* it fits that cell using the two characteristics.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_11', difficulty: 'standard',
          question: 'India\'s Post-1991 Economic Reforms refer to the structural adjustment programme.',
          hint: 'If stuck, revisit c9_eco_ch1_8 (Planned vs Market Economy) and c9_eco_ch1_9 (Mixed.',
          misconception: 'Students often believe "liberalisation meant the government stopped all regulation" — confusing liberalisation.',
          parts: [
                { id: 'a', prompt: 'Compare the pre-1991 FDI policy (maximum 40% equity cap, case-by-case approval via FIPB/FERA) with the post-1991 automatic approval route for 51% equity in 34.', answer: 'Pre-1991, foreign capital was viewed with suspicion',
                  options: ['Pre-1991, foreign capital was viewed with suspicion', 'FDI allowed', 'liberalisation meant the government stopped all regulation', 'liberalisation caused unchecked pollution'],
                  hint: 'If stuck, revisit c9_eco_ch1_8 (Planned vs Market Economy) and c9_eco_ch1_9 (Mixed Economy).',
                  misconception: 'Students often believe "liberalisation meant the government stopped all regulation" — confusing liberalisation (removing entry/production.' }
          ],
            remediations: { 'liberalisation-meant-the-government-stopped': { steps: ['If the student holds this misconception, conduct a three-step remediation: (1) Create a two-column table: Pre-1991.', 'Post-1991 Regulations (Environmental Clearance, SEBI ICDR norms, Competition Act, RBI prudential norms, FEMA 1999.', '(2) Use the Maruti Suzuki case: pre-1991 required licence + MRTP + FERA (for Suzuki JV); post-1991 second plant needed.', '(3) Ask student to identify which controls were *removed* (licensing, MRTP asset threshold, CCI pricing, FERA criminal.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_2', difficulty: 'standard',
          question: 'Unlimited wants refer to the endless desire of individuals and societies for.',
          hint: 'Revisit c8_eco_ch1_2 to c8_eco_ch1_6: Factors of Production definitions and examples.',
          misconception: 'Students believe scarcity is only a problem for the poor or developing countries.',
          parts: [
                { id: 'a', prompt: 'Explain why the statement "If India had more money, we could satisfy all our wants" is economically incorrect.', answer: 'Money is a medium of exchange, not a resource itself',
                  options: ['Money is a medium of exchange, not a resource itself', 'scarcity is only a problem for the poor or developing countries'],
                  hint: 'Revisit c8_eco_ch1_2 to c8_eco_ch1_6: Factors of Production definitions and examples.',
                  misconception: 'Students believe scarcity is only a problem for the poor or developing countries.' },
                { id: 'b', prompt: 'A village has 100 hectares of cultivable land, 200 workers, and ₹50 lakh capital. It wants to produce wheat, build a school, and start a textile unit.', answer: 'Land is limited to 100 hectares',
                  options: ['Land is limited to 100 hectares', 'we can do all if we work harder', 'scarcity is only a problem for the poor or developing countries'],
                  hint: 'Revisit c8_eco_ch1_2 to c8_eco_ch1_6: Factors of Production definitions and examples.',
                  misconception: 'Students believe scarcity is only a problem for the poor or developing countries.' }
          ],
            remediations: { 'scarcity-is-only-a-problem': { steps: ['Take a newspaper headline about a government budget (e.g., "Centre allocates ₹10 lakh crore for infrastructure, cuts.', 'Identify the limited resource (tax revenue).', 'List competing wants (infrastructure, education, defence, subsidies).', 'Explain why tax revenue is finite (limited tax base, economic activity).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_3', difficulty: 'standard',
          question: 'Opportunity cost is the value of the next best alternative forgone when.',
          hint: 'Revisit c9_eco_ch1_1 (Scarcity) and c8_eco_ch1_2 (Factors of Production) to see how.',
          misconception: 'Students believe opportunity cost is the sum of all alternatives forgone, or only the monetary expense of the chosen.',
          parts: [
                { id: 'a', prompt: 'Compare two students: Priya spends 3 hours daily on tuition earning ₹500/hour as a tutor; Rohan spends 3 hours daily studying for exams, expecting.', answer: 'Correct answer: Priya\'s opportunity cost is the study time forgone',
                  options: ['Correct answer: Priya\'s opportunity cost is the study time forgone', 'Priya\'s opportunity cost is higher'],
                  hint: 'Revisit c9_eco_ch1_1 (Scarcity) and c8_eco_ch1_2 (Factors of Production) to see how limited.',
                  misconception: 'Students believe opportunity cost is the sum of all alternatives forgone, or only the monetary expense of the chosen option.' }
          ],
            remediations: { 'opportunity-cost-is-the-sum': { steps: ['Use a two-column table: "Chosen Option" and "Next Best Alternative". List only ONE alternative in the second column.', 'Value the next best alternative in monetary terms if possible (e.g., resale value, wage), otherwise describe.', 'Practice with three scenarios: (a) spending pocket money, (b) allocating study time, (c) farmer\'s crop choice.', 'Emphasize that the chosen option\'s cost is irrelevant; only the forgone alternative\'s value matters.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_4', difficulty: 'standard',
          question: 'The "What to Produce" problem refers to the fundamental economic decision.',
          hint: 'Revisit c9_eco_ch1_3 (Choice and Opportunity Cost) — practice calculating opportunity.',
          misconception: 'Students often believe the "What to Produce" decision is made independently by each producer based on what they *want*.',
          parts: [
                { id: 'a', prompt: 'Define the "What to Produce" problem in economics and state the two main factors that influence this decision in a market economy.', answer: 'The "What to Produce" problem is the decision of',
                  options: ['The "What to Produce" problem is the decision of', 'government decides', 'producers decide arbitrarily', 'What to Produce'],
                  hint: 'Revisit c9_eco_ch1_3 (Choice and Opportunity Cost) — practice calculating opportunity cost from.',
                  misconception: 'Students often believe the "What to Produce" decision is made independently by each producer based on what they *want* to make, ignoring.' },
                { id: 'b', prompt: 'Why does the Production Possibility Curve (PPC) slope downward from left to right? Explain the economic reasoning behind this shape.', answer: 'The PPC slopes downward',
                  options: ['The PPC slopes downward', 'it slopes downward', 'because of diminishing returns', 'What to Produce'],
                  hint: 'Revisit c9_eco_ch1_3 (Choice and Opportunity Cost) — practice calculating opportunity cost from.',
                  misconception: 'Students often believe the "What to Produce" decision is made independently by each producer based on what they *want* to make, ignoring.' }
          ],
            remediations: { 'the-what-to-produce-decision': { steps: ['Draw a PPC for a two-good economy (e.g., smartphones vs. grain) on graph paper.', 'Pick a point outside the curve — ask "Can we produce here today?" No — resources insufficient.', 'Pick a point inside — "Are resources fully used?" No — unemployment.', 'Pick a point on the curve — "To get 10 more smartphones, what happens to grain?" Must fall.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
