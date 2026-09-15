import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch01_p1: SimDef = {
    id: 'v3_c11_bs_ch01_p1',
    title: 'Business, Trade and Commerce · Part 1/2',
    subtitle: 'Reopen the ledgers of a subcontinent that once held a third of the world\'s economy.',
    classLevel: 11, subject: 'business_studies', topic: 'Business, Trade and Commerce · Part 1/2',
    chapters: ['c11_bs_ch01'],
    nodeIds: ['c11_bs_cbse_01_001', 'c11_bs_cbse_01_002', 'c11_bs_cbse_01_003', 'c11_bs_cbse_01_004', 'c11_bs_cbse_01_005', 'c11_bs_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a historian auditing medieval India\'s commercial machinery', intro: 'The records show India was the world\'s sink for precious metals. Your task: find the machinery — routes, goods, and credit — that pulled them in.', goal: 'Explain ancient Indian trade routes, exports and imports, the Hundi system, and the shift in India\'s share of the world economy.' },
    discovery: {
        question: 'A 15th-century merchant in Surat needs to move a fortune to a partner in Cairo — but carrying chests of silver across the Indian Ocean invites pirates and thieves. How did Indian merchants transfer money without moving a single coin?',
        options: ['The Hundi — a written credit instrument the partner could present to a banker in Cairo for payment', 'Letters of credit issued by the British East India Company', 'Digital bank transfers via Indian Ocean trade guilds', 'Bartering spices directly for foreign goods at every port'],
        answer: 'The Hundi — a written credit instrument the partner could present to a banker in Cairo for payment',
        hook: 'India\'s early commercial dominance rested on financial engineering, not just spices — the Hundi solved long-distance payment centuries before wire transfers.',
    },
    teaching: [
        { title: 'History of Trade and Commerce in India: Early Beginnings', text: 'The history of trade and commerce in India traces the evolution of economic exchange from ancient barter systems to sophisticated maritime and overland trade networks, indigenous credit instruments.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reconstruct why India held a giant share of the world economy: map its export commodities and trade routes, explain the Hundi\'s security logic, and trace the collapse of that share under colonial rule.',
        labels: ['History of Trade', 'Concepts of Business, Profession', 'Business: Characteristics and Economic', 'Classification of Business Activities', 'Industry: Primary, Secondary', 'Commerce: Trade and Auxiliaries'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_01_002', title: 'Concepts of Business, Profession and Employment: Distinction',
          caseStudy: { intro: 'Imagine three Class 11 graduates: Arjun opens a mobile accessories shop, Priya becomes a chartered accountant after clearing ICAI exams, and Rohan joins a bank.',
            decisions: [{ prompt: 'State the mode of establishment for a profession and explain how it differs from that of a business.', options: [
                { text: 'A profession is established through membership of a professional body and obtaining a', outcome: 'A profession is established through membership of a professional body and obtaining a certificate.' },
                { text: 'both need registration', outcome: 'Not quite — Students often think "profession is just a high-skill job" and "business is any profit-making.', reveals: 'profession-is-just-a-high' },
                { text: 'profession is just a high-skill job', outcome: 'Not quite — Students often think "profession is just a high-skill job" and "business is any profit-making.', reveals: 'profession-is-just-a-high' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_01_003', title: 'Business: Characteristics and Economic Activities',
          caseStudy: { intro: 'Imagine your neighbour, Mrs. Sharma, cooks delicious rajma-chawal every Sunday and gives it to her family — is that a business?',
            decisions: [{ prompt: 'State the seven characteristics of business activities as per NCERT Class 11 Business Studies.', options: [
                { text: 'The seven characteristics are: (i) An economic activity, (ii) Production or procurement', outcome: 'The seven characteristics are: (i) An economic activity, (ii) Production or procurement of goods.' },
                { text: 'social service', outcome: 'Not quite — Students believe that any activity involving buying and selling, or any activity that earns money.', reveals: 'any-activity-involving-buying-and' },
                { text: 'government registration', outcome: 'Not quite — Students believe that any activity involving buying and selling, or any activity that earns money.', reveals: 'any-activity-involving-buying-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_01_004', title: 'Classification of Business Activities: Industry and Commerce',
          caseStudy: { intro: 'Imagine you are visiting an industrial estate: you see a coal mine, a steel plant, a textile factory, a construction site, a bank branch, a transport company\'s.',
            decisions: [{ prompt: 'Define \'Industry\' and \'Commerce\' as classifications of business activities. Give one example of each.', options: [
                { text: '**Correct Answer:** Industry refers to economic activities connected with conversion of', outcome: '**Correct Answer:** Industry refers to economic activities connected with conversion of resources.' },
                { text: 'large factories only', outcome: 'Not quite — **Misconception:** "Tertiary Industry = Commerce." Students often equate the *service sector*.', reveals: 'misconception-tertiary-industry-commerce' },
                { text: 'only buying and selling', outcome: 'Not quite — **Misconception:** "Tertiary Industry = Commerce." Students often equate the *service sector*.', reveals: 'misconception-tertiary-industry-commerce' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_01_006', title: 'Commerce: Trade and Auxiliaries to Trade',
          caseStudy: { intro: 'Imagine you are a mango farmer in Ratnagiri, Maharashtra. You have produced the best Alphonso mangoes, but your customers are in Delhi, Mumbai, and even Dubai.',
            decisions: [{ prompt: 'What is the fundamental difference between \'trade\' and \'auxiliaries to trade\' in the context of commerce?', options: [
                { text: 'Trade refers to the actual buying and selling of goods and services (the exchange', outcome: 'Trade refers to the actual buying and selling of goods and services (the exchange itself), while.' },
                { text: 'Trade includes transport and banking', outcome: 'Not quite — Students often memorize the list of auxiliaries (transport, banking, insurance, warehousing.', reveals: 'students-often-memorize-the-list' },
                { text: 'lists examples without distinguishing the core activity (exchange vs', outcome: 'Not quite — Students often memorize the list of auxiliaries (transport, banking, insurance, warehousing.', reveals: 'students-often-memorize-the-list' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your commerce club is staging an exhibition on \'How Indian merchants paid each other in 1600\'. One exhibit shows a Surat merchant who needs to pay a Calicut spice supplier. A teammate scripts it as: \'He loads gold coins on a bullock cart and hopes they arrive — India ran on barter before the British brought banking.\'',
            decisions: [{ prompt: 'Fix the script so it\'s historically accurate.', options: [
                { text: 'Show him issuing a Hundi — a negotiable credit instrument: his banker in Surat takes the money and writes a Hundi payable to the Calicut supplier, who presents it to a local banker for payment; the two bankers settle later through offsetting trade flows. No coins cross the country.', outcome: 'India had indigenous credit networks and instruments centuries before colonial rule; barter-and-coins undersells a system that made India a top global economy.' },
                { text: 'Keep the barter script — without banks, long-distance payment meant physically moving valuables or swapping goods.', outcome: 'The Hundi system solved exactly this problem: community-trust credit transfer between merchant-bankers, documented since early medieval inscriptions.', reveals: 'ancient-india-barter-only' },
                { text: 'Have the merchant use a British-style bill of exchange — India\'s own instruments were too primitive for inter-city trade.', outcome: 'Hundi predates and parallels European bills; treating credit as a Western import erases a documented indigenous banking tradition.', reveals: 'credit-is-western-import' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You saw that prosperity was a system — production, trade routes, and credit instruments working together — and systems can be dismantled.',
            decisions: [{ prompt: 'What comes next? Business, Trade and Commerce · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Business, Trade and Commerce · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_001', difficulty: 'standard',
          question: 'The history of trade and commerce in India traces the evolution of economic.',
          hint: 'Review the double coincidence of wants (c6_economics_ch11_002) and the emergence of money.',
          misconception: 'Students often believe that **ancient Indian trade was primarily barter-based** and that **banking/credit instruments.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The history of trade and commerce in India traces the evolution of economic exchange from',
                  options: ['The history of trade and commerce in India traces the evolution of economic exchange from', 'Business, profession, and employment are three distinct categories of economic', 'Business is an economic activity involving the regular production, procurement, and', 'Business activities are classified into two broad categories: **Industry**'],
                  hint: 'Review the double coincidence of wants (c6_economics_ch11_002) and the emergence of money.',
                  misconception: 'Students often believe that **ancient Indian trade was primarily barter-based** and that **banking/credit instruments are modern Western.' }
          ],
            remediations: { 'ancient-indian-trade-was-primarily': { steps: ['If the student holds this misconception: (1) Show a timeline: **600 BCE — Punch-marked coins; 200 BCE — Indo-Greek.', '(2) Walk through a concrete transaction: *Merchant A (Surat) gives 1000 silver rupees to banker B, receives a Hundi.', 'Merchant C presents Hundi to banker D (Calicut), gets paid.', 'Banker B and D settle later via offsetting trade flows.* (3) Emphasise: **No coins moved between Surat and Calicut**.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_002', difficulty: 'standard',
          question: 'Business, profession, and employment are three distinct categories of economic.',
          hint: 'Revisit Class 9 Economics Chapter 1 (Factors of Production) and Class 10 Economics.',
          misconception: 'Students often think "profession is just a high-skill job" and "business is any profit-making activity." They classify.',
          parts: [
                { id: 'a', prompt: 'A person sells homemade pickles once at a school fair and earns ₹2,000. Is this a business activity?', answer: 'No, this is not a business activity',
                  options: ['No, this is not a business activity', 'yes, because profit was earned', 'profession is just a high-skill job', 'business is any profit-making activity'],
                  hint: 'Revisit Class 9 Economics Chapter 1 (Factors of Production) and Class 10 Economics Chapter 2.',
                  misconception: 'Students often think "profession is just a high-skill job" and "business is any profit-making activity." They classify a salaried software.' }
          ],
            remediations: { 'profession-is-just-a-high': { steps: ['If a student misclassifies, do NOT re-read the table.', 'Instead: 1) Pick one clear example (e.g., a lawyer vs.', '2) For each of the 9 criteria, ask: "Who decides the setup?', 'What qualification is mandatory?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "profession is just a high-skill job" and "business is any profit-making activity." They classify.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "A chartered accountant who sets up a CA firm with partners is running a business, not a profession." Defend or refute with reference to the.', answer: 'Refute',
                  options: ['Refute', 'profession is just a high-skill job', 'business is any profit-making activity'],
                  hint: 'Revisit Class 9 Economics Chapter 1 (Factors of Production) and Class 10 Economics Chapter 2.',
                  misconception: 'Students often think "profession is just a high-skill job" and "business is any profit-making activity." They classify a salaried software.' },
                { id: 'b', prompt: 'Create a realistic scenario of a person transitioning from employment to profession to business over their career.', answer: 'Example: Phase 1 (Employment): Rohan works as junior accountant at a firm',
                  options: ['Example: Phase 1 (Employment): Rohan works as junior accountant at a firm', 'profession is just a high-skill job', 'business is any profit-making activity'],
                  hint: 'Revisit Class 9 Economics Chapter 1 (Factors of Production) and Class 10 Economics Chapter 2.',
                  misconception: 'Students often think "profession is just a high-skill job" and "business is any profit-making activity." They classify a salaried software.' }
          ],
            remediations: { 'profession-is-just-a-high': { steps: ['If a student misclassifies, do NOT re-read the table.', 'Instead: 1) Pick one clear example (e.g., a lawyer vs.', '2) For each of the 9 criteria, ask: "Who decides the setup?', 'What qualification is mandatory?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_003', difficulty: 'standard',
          question: 'Business is an economic activity involving the regular production, procurement.',
          hint: 'If stuck, revisit c11_bs_cbse_01_002 (Concepts of Business, Profession and Employment).',
          misconception: 'Students believe that any activity involving buying and selling, or any activity that earns money, is a business.',
          parts: [
                { id: 'a', prompt: 'A student sells his old bicycle on OLX for a profit of ₹2,000. He argues this is a business activity because he earned a profit.', answer: 'Selling a personal bicycle once is a single transaction, not a regular dealing',
                  options: ['Selling a personal bicycle once is a single transaction, not a regular dealing', 'it is business because he made profit', 'it is not business'],
                  hint: 'If stuck, revisit c11_bs_cbse_01_002 (Concepts of Business, Profession and Employment) and the.',
                  misconception: 'Students believe that any activity involving buying and selling, or any activity that earns money, is a business.' },
                { id: 'b', prompt: 'Rahul, a Class 11 student, bakes cookies at home and sells them to classmates during lunch break every Friday for three months.', answer: 'This is a business activity',
                  options: ['This is a business activity', 'not business because he\'s', 'not business because it\'s small scale', 'business requires legal registration, large scale, or adult status'],
                  hint: 'If stuck, revisit c11_bs_cbse_01_002 (Concepts of Business, Profession and Employment) and the.',
                  misconception: 'Students believe that any activity involving buying and selling, or any activity that earns money, is a business.' },
                { id: 'c', prompt: 'Compare the \'reward\' and \'risk\' characteristics of Business, Profession, and Employment using a table.', answer: '| Basis | Business | Profession | Employment |',
                  options: ['| Basis | Business | Profession | Employment |', 'profession has highest risk', 'business risk is only about fire/theft'],
                  hint: 'If stuck, revisit c11_bs_cbse_01_002 (Concepts of Business, Profession and Employment) and the.',
                  misconception: 'Students believe that any activity involving buying and selling, or any activity that earns money, is a business.' }
          ],
            remediations: { 'any-activity-involving-buying-and': { steps: ['Ask the student to list the seven characteristics from memory.', 'Present the "car sale" example and have them test each characteristic one by one: "Was it regular?', 'Highlight the two failed characteristics (regularity, uncertainty) and explain that business is a SYSTEM of repeated.', 'Give a new scenario (e.g., "A farmer grows wheat and sells at mandi every harvest") and have the student verify all.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_004', difficulty: 'standard',
          question: 'Business activities are classified into two broad categories: **Industry**.',
          hint: 'Revisit the "Characteristics of Business Activities" (Section 1.2.1) and "Comparison.',
          misconception: '**Misconception:** "Tertiary Industry = Commerce." Students often equate the *service sector* (Tertiary Industry).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Business activities are classified into two broad categories: **Industry**',
                  options: ['Business activities are classified into two broad categories: **Industry**', 'The history of trade and commerce in India traces the evolution of economic exchange from', 'Business, profession, and employment are three distinct categories of economic', 'Business is an economic activity involving the regular production, procurement, and'],
                  hint: 'Revisit the "Characteristics of Business Activities" (Section 1.2.1) and "Comparison of Business.',
                  misconception: '**Misconception:** "Tertiary Industry = Commerce." Students often equate the *service sector* (Tertiary Industry) entirely with Commerce.' }
          ],
            remediations: { 'misconception-tertiary-industry-commerce': { steps: ['**Draw the NCERT Flowchart** (Fig 1.1) from memory: Business Activities → Industry (Primary/Secondary/Tertiary) AND.', 'Emphasize the **AND** – they are parallel branches, not hierarchical.', '**Create a 3-Column Table**: Column A: Activity (e.g., Coal Mining, Cement Factory, Transport Co., Doctor, Wholesaler).', 'Fill for 10 diverse activities.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_005', difficulty: 'standard',
          question: 'Industry refers to economic activities connected with the conversion.',
          hint: 'If stuck, revisit Class 10 Economics Chapter 2 (Sectors of the Indian Economy) node.',
          misconception: 'Students often classify all agriculture as \'extractive primary industry\' because it uses land.',
          parts: [
                { id: 'a', prompt: 'Classify the following activities into primary, secondary, or tertiary industry with justification: (a) A fish hatchery supplying fingerlings to farmers, (b).', answer: 'A fish hatchery supplying fingerlings to farmers, (',
                  options: ['A fish hatchery supplying fingerlings to farmers, (', 'any use of natural resources is primary, missing the processing aspect'],
                  hint: 'If stuck, revisit Class 10 Economics Chapter 2 (Sectors of the Indian Economy) node.',
                  misconception: 'Students often classify all agriculture as \'extractive primary industry\' because it uses land.' }
          ],
            remediations: { 'students-often-classify-all-agriculture': { steps: ['If a student misclassifies farming as extractive: (1) Ask them to define \'genetic industry\' from the textbook: "engaged.', '(3) Have them categorize 10 activities (e.g., apple orchard, coal mining, poultry, wild herb collection, fish hatchery).', '(4) Emphasize the keyword: **\'reproduction\'** = genetic; **\'drawing from natural sources without reproduction\'**.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_01_006', difficulty: 'standard',
          question: 'Commerce is the branch of business that encompasses all activities necessary.',
          hint: 'If unclear on the Industry vs. Commerce distinction, revisit c11_bs_cbse_01_004.',
          misconception: 'Students often memorize the list of auxiliaries (transport, banking, insurance, warehousing, advertising) as isolated.',
          parts: [
                { id: 'a', prompt: 'A student says: "Advertising is not an auxiliary to trade because it does not physically move goods like transport does." Explain why this statement reflects.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'Trade includes transport and banking'],
                  hint: 'If unclear on the Industry vs. Commerce distinction, revisit c11_bs_cbse_01_004 (Classification.',
                  misconception: 'Students often memorize the list of auxiliaries (transport, banking, insurance, warehousing, advertising) as isolated definitions without.' },
                { id: 'b', prompt: 'A wheat farmer in Punjab sells his harvest to a flour mill in the same village.', answer: 'Hindrance of persons is removed by trade (farmer to mill)',
                  options: ['Hindrance of persons is removed by trade (farmer to mill)', 'Trade includes transport and banking'],
                  hint: 'If unclear on the Industry vs. Commerce distinction, revisit c11_bs_cbse_01_004 (Classification.',
                  misconception: 'Students often memorize the list of auxiliaries (transport, banking, insurance, warehousing, advertising) as isolated definitions without.' },
                { id: 'c', prompt: 'Compare the role of \'banking\' and \'insurance\' as auxiliaries to trade. In what way do they address fundamentally different types of uncertainty in business?', answer: 'Banking addresses the hindrance of finance',
                  options: ['Banking addresses the hindrance of finance', 'give money', 'Trade includes transport and banking'],
                  hint: 'If unclear on the Industry vs. Commerce distinction, revisit c11_bs_cbse_01_004 (Classification.',
                  misconception: 'Students often memorize the list of auxiliaries (transport, banking, insurance, warehousing, advertising) as isolated definitions without.' }
          ],
            remediations: { 'students-often-memorize-the-list': { steps: ['Draw the \'Hindrance → Auxiliary\' mapping table on paper: Persons→Trade, Place→Transport, Time→Warehousing.', 'For each auxiliary, write ONE sentence: "Without ____, the hindrance of ____ would prevent exchange because ____."', 'Take a simple product (e.g., textbook) and trace its journey from publisher to student, labeling which auxiliary.', 'Re-attempt Diagnostic Questions 3 and 4 using this map. Do not re-read definitions — rebuild the logic chain.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
