import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch09_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch09_p2: SimDef = {
    id: 'v3_c11_bs_ch09_p2',
    title: 'MSME and Business Entrepreneurship · Part 2/2',
    subtitle: 'Two thresholds stand between an enterprise and its benefits — clear both, at the stricter rung.',
    classLevel: 11, subject: 'business_studies', topic: 'MSME and Business Entrepreneurship · Part 2/2',
    chapters: ['c11_bs_ch09'],
    nodeIds: ['c11_bs_cbse_09_007', 'c11_bs_cbse_09_008', 'c11_bs_cbse_09_009', 'c11_bs_cbse_09_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a registration clerk deciding which MSME certificate to issue', intro: 'Five applications, five pairs of numbers. Each applicant argues for the category with better benefits — your table decides, not their preference.', goal: 'Apply the MSMED investment-plus-turnover criteria to classify enterprises as Micro, Small, or Medium.' },
    discovery: {
        question: 'A service unit invests ₹8 crore in equipment and turns over ₹45 crore a year. Investment says Small; a careless reading of turnover says... also Small — but a student cries \'Micro, the turnover is under ₹50 crore!\' What rule settles it?',
        options: ['Both criteria must be met simultaneously, and the lower category wins — ₹8 crore blows past Micro\'s ₹1 crore investment cap regardless of turnover', 'Turnover alone decides; investment is only checked for manufacturers', 'The higher of the two categories always applies', 'Average the two criteria and round down'],
        answer: 'Both criteria must be met simultaneously, and the lower category wins — ₹8 crore blows past Micro\'s ₹1 crore investment cap regardless of turnover',
        hook: 'MSME status is a dual lock — investment AND turnover — and the stricter of your two numbers owns you.',
    },
    teaching: [
        { title: 'Entrepreneurship Development: Process and Need', text: 'Entrepreneurship development is the systematic, step-by-step process of enhancing entrepreneurial skills and knowledge through structured training, education, and support systems to enable.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify five enterprises — from a ₹0.8-crore furniture workshop to a ₹40-crore auto-parts maker — as Micro, Small, or Medium using both thresholds, and explain what benefits ride on getting the label right.',
        labels: ['Entrepreneurship Development: Process', 'Types of Entrepreneurs: Classification', 'Role of Entrepreneur', 'Incentives for MSMEs: Tax'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_09_007', title: 'Entrepreneurship Development: Process and Need',
          caseStudy: { intro: 'Imagine a Class 11 student, Priya, who loves baking and wants to start a home-based cookie business but has no idea how to move from "making tasty cookies".',
            decisions: [{ prompt: 'State the five sequential stages of the entrepreneurship development process as described in the NCERT framework for systematic.', options: [
                { text: 'The five stages are: (1) Entrepreneurial Awareness/Simulation, (2) Motivation', outcome: 'The five stages are: (1) Entrepreneurial Awareness/Simulation, (2) Motivation Development, (3).' },
                { text: 'idea generation, funding, hiring, marketing, profit', outcome: 'Not quite — **Misconception:** "Entrepreneurship Development Programmes (EDPs) are only for people who already.', reveals: 'misconception-entrepreneurship-development-progr' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_09_008', title: 'Types of Entrepreneurs: Classification',
          caseStudy: { intro: 'Imagine you are at a local market in Delhi and see three different business owners: a woman running a small pickle-making unit from her home, a young man who.',
            decisions: [{ prompt: 'State any four bases on which entrepreneurs can be classified.', options: [
                { text: 'Correct answer: Entrepreneurs can be classified on the basis of (1) type of business', outcome: 'Correct answer: Entrepreneurs can be classified on the basis of (1) type of business activity.' },
                { text: 'He is a technical entrepreneur', outcome: 'Not quite — Students often think that an entrepreneur belongs to only one \'type\' (e.g., "He is a technical.', reveals: 'an-entrepreneur-belongs-to-only' },
                { text: 'an entrepreneur belongs to only one \'type\' (e', outcome: 'Not quite — Students often think that an entrepreneur belongs to only one \'type\' (e.g., "He is a technical.', reveals: 'an-entrepreneur-belongs-to-only' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_09_010', title: 'Incentives for MSMEs: Tax Holidays, Subsidies and Credit Facilities',
          scaffold: { problem: 'A small enterprise (manufacturing) set up in a notified backward area in 2024 has an annual taxable business income of ₹30 lakh for.',
            steps: [
            { text: 'Identify the exemption percentage for Year 1 (first 5 years) = 100%.' },
            { text: 'Compute exempt income = ₹30 lakh × 100% = ₹30 lakh.' },
            { text: 'Compute taxable income after exemption = ₹30 lakh - ₹30 lakh = ₹0.' },
            { text: 'Tax saving in Year 1 = Exempt income × Tax rate = ₹30 lakh × 25% = ₹7.5 lakh.' },
            { text: 'For Years 6-10, exemption = 50%. Annual exempt income = ₹30 lakh × 50% = ₹15 lakh.' },
            { text: 'Total 10-year tax saving = (5 × ₹7.5 lakh) + (5 × ₹3.75 lakh) = ₹37.5 lakh + ₹18.75 lakh = ₹56.25 lakh.', faded: true, blankAnswer: 'Year 1 tax saving = ₹7.5 lakh; Total 10-year tax saving.' }
            ] } },
        { type: 'case', nodeId: 'c11_bs_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your uncle wants MSME benefits for his unit: investment in machinery ₹12 crore, annual turnover ₹8 crore. He insists it\'s \'Small\' because turnover fits the Small band, while his accountant claims \'Micro\' because... turnover is low. You must settle it before the Udyam registration.',
            decisions: [{ prompt: 'What is the correct classification?', options: [
                { text: 'Medium — the Act uses a dual threshold where BOTH limits must be met at each level: Micro fails (investment >₹1 cr), Small fails (investment >₹10 cr), Medium passes (≤₹50 cr investment AND ≤₹250 cr turnover). The first category where both criteria clear wins.', outcome: 'Neither \'turnover decides\' nor \'higher capacity decides\' — run the checks in ascending order and take the first band where both conditions pass.' },
                { text: 'Small — ₹8 crore turnover sits inside the Small band, and turnover reflects real activity better than sunk investment.', outcome: 'The dual test is a gate, not a preference: ₹12 cr investment breaks Small\'s ₹10 cr investment ceiling, so the unit can\'t be Small whatever its turnover.', reveals: 'turnover-alone-decides' },
                { text: 'Micro — smaller turnover should pull the classification down to the lowest qualifying label.', outcome: 'There\'s no \'pulling down\' to a band whose limits are breached; Micro needs investment ≤₹1 cr, which ₹12 cr fails outright.', reveals: 'lower-category-wins' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_09_010', title: 'You made it',
          caseStudy: { intro: 'You mastered the composite test: two numbers, two limits, and the more restrictive verdict always prevails.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_09_007', difficulty: 'standard',
          question: 'Entrepreneurship development is the systematic, step-by-step process.',
          hint: 'Revisit the "Characteristics of Entrepreneurship" (systematic activity, innovation.',
          misconception: '**Misconception:** "Entrepreneurship Development Programmes (EDPs) are only for people who already have a business idea.',
          parts: [
                { id: 'a', prompt: 'State the five sequential stages of the entrepreneurship development process as described in the NCERT framework for systematic entrepreneurial activity.', answer: 'The five stages are: (1) Entrepreneurial Awareness/Simulation, (2) Motivation',
                  options: ['The five stages are: (1) Entrepreneurial Awareness/Simulation, (2) Motivation', 'idea generation, funding, hiring, marketing, profit'],
                  hint: 'Revisit the "Characteristics of Entrepreneurship" (systematic activity, innovation, risk-taking).',
                  misconception: '**Misconception:** "Entrepreneurship Development Programmes (EDPs) are only for people who already have a business idea and want funding.".' },
                { id: 'b', prompt: 'Explain in your own words why entrepreneurship is described as a "systematic, step-by-step and purposeful activity" rather than a mysterious gift or charm.', answer: 'Entrepreneurship is systematic',
                  options: ['Entrepreneurship is systematic', 'entrepreneurs are born risk-takers'],
                  hint: 'Revisit the "Characteristics of Entrepreneurship" (systematic activity, innovation, risk-taking).',
                  misconception: '**Misconception:** "Entrepreneurship Development Programmes (EDPs) are only for people who already have a business idea and want funding.".' },
                { id: 'c', prompt: 'Priya (from the walkthrough) has completed a 3-week Entrepreneurship Development Programme (EDP) and received a certificate.', answer: 'The immediate next stage is **Follow-up/Post-training Support** (Stage 5)',
                  options: ['The immediate next stage is **Follow-up/Post-training Support** (Stage 5)', 'she starts production immediately'],
                  hint: 'Revisit the "Characteristics of Entrepreneurship" (systematic activity, innovation, risk-taking).',
                  misconception: '**Misconception:** "Entrepreneurship Development Programmes (EDPs) are only for people who already have a business idea and want funding.".' },
                { id: 'd', prompt: 'Compare the "need for entrepreneurship" in a developing economy (India) versus a developed economy (e.g., USA) using the textbook\'s distinction: "a developing.', answer: 'Two conditions: (1) **Shrinking public/large-sector employment**',
                  options: ['Two conditions: (1) **Shrinking public/large-sector employment**', 'innovation', 'GDP growth'],
                  hint: 'Revisit the "Characteristics of Entrepreneurship" (systematic activity, innovation, risk-taking).',
                  misconception: '**Misconception:** "Entrepreneurship Development Programmes (EDPs) are only for people who already have a business idea and want funding.".' }
          ],
            remediations: { 'misconception-entrepreneurship-development-progr': { steps: ['**Contrast "Business Lifecycle" vs "Development Process":** Draw two timelines on the board.', 'Top: Idea → Launch → Growth → Maturity (Business Lifecycle).', 'Bottom: Simulation → Motivation → Competency → Plan → Follow-up (EDP Process).', 'Ask: "Which one can a 16-year-old with *no idea* enter tomorrow?" (Bottom).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_09_008', difficulty: 'standard',
          question: 'Entrepreneurs can be classified into distinct categories based on specific.',
          hint: 'Revisit the definition and characteristics of entrepreneurship in c11_bs_cbse_09_005.',
          misconception: 'Students often think that an entrepreneur belongs to only one \'type\' (e.g., "He is a technical entrepreneur" as if that.',
          parts: [
                { id: 'a', prompt: 'Ramesh, a mechanical engineer, started a small unit manufacturing customised CNC machine parts for automotive companies.', answer: 'Correct answer: (a) Technical entrepreneur –',
                  options: ['Correct answer: (a) Technical entrepreneur –', 'He is a technical entrepreneur', 'an entrepreneur belongs to only one \'type\' (e'],
                  hint: 'Revisit the definition and characteristics of entrepreneurship in c11_bs_cbse_09_005, especially.',
                  misconception: 'Students often think that an entrepreneur belongs to only one \'type\' (e.g., "He is a technical entrepreneur" as if that is his sole.' },
                { id: 'b', prompt: 'Compare and contrast \'Fabian entrepreneurs\' and \'Drone entrepreneurs\' in terms of their attitude towards change and risk.', answer: 'Correct answer: Fabian entrepreneurs are cautious and sceptical about change',
                  options: ['Correct answer: Fabian entrepreneurs are cautious and sceptical about change', 'He is a technical entrepreneur', 'an entrepreneur belongs to only one \'type\' (e'],
                  hint: 'Revisit the definition and characteristics of entrepreneurship in c11_bs_cbse_09_005, especially.',
                  misconception: 'Students often think that an entrepreneur belongs to only one \'type\' (e.g., "He is a technical entrepreneur" as if that is his sole.' }
          ],
            remediations: { 'an-entrepreneur-belongs-to-only': { steps: ['Draw a table with eight columns (one per base) and rows for three diverse Indian entrepreneurs (e.g., a rural woman.', 'Ask the student to fill every cell for each entrepreneur, forcing them to assign a category from each base.', 'Discuss how the same person occupies multiple categories at once.', 'Give a new entrepreneur description and have the student classify them across all eight bases in under two minutes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_09_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that an entrepreneur belongs to only one \'type\' (e.g., "He is a technical entrepreneur" as if that.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Women entrepreneurs in rural India face a unique set of challenges that are not fully captured by classifying them only under \'gender\'.', answer: 'Correct answer: The statement is valid',
                  options: ['Correct answer: The statement is valid', 'He is a technical entrepreneur', 'an entrepreneur belongs to only one \'type\' (e'],
                  hint: 'Revisit the definition and characteristics of entrepreneurship in c11_bs_cbse_09_005, especially.',
                  misconception: 'Students often think that an entrepreneur belongs to only one \'type\' (e.g., "He is a technical entrepreneur" as if that is his sole.' }
          ],
            remediations: { 'an-entrepreneur-belongs-to-only': { steps: ['Draw a table with eight columns (one per base) and rows for three diverse Indian entrepreneurs (e.g., a rural woman.', 'Ask the student to fill every cell for each entrepreneur, forcing them to assign a category from each base.', 'Discuss how the same person occupies multiple categories at once.', 'Give a new entrepreneur description and have the student classify them across all eight bases in under two minutes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_09_009', difficulty: 'standard',
          question: 'An entrepreneur is an economic agent who identifies opportunities, mobilises.',
          hint: 'Revisit c9_eco_ch1_7 (Factors of Production: Entrepreneurship) and c8_eco_ch1_6.',
          misconception: 'Students equate \'entrepreneur\' with \'small business owner\' and \'economic development\' with \'GDP growth\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An entrepreneur is an economic agent who identifies opportunities, mobilises factors of',
                  options: ['An entrepreneur is an economic agent who identifies opportunities, mobilises factors of', 'Micro, Small and Medium Enterprises (MSME) are business entities classified under the', 'Micro, Small and Medium Enterprises (MSMEs) are defined under the MSMED Act, 2006 based', 'Problems Faced by MSMEs in India refer to the structural, operational, and environmental'],
                  hint: 'Revisit c9_eco_ch1_7 (Factors of Production: Entrepreneurship) and c8_eco_ch1_6 (Entrepreneurship.',
                  misconception: 'Students equate \'entrepreneur\' with \'small business owner\' and \'economic development\' with \'GDP growth\'.' }
          ],
            remediations: { 'students-equate-entrepreneur-with-small': { steps: ['Ask the student to define \'economic development\' without using the word \'GDP\'.', 'Give two micro-caselets — one replicative (tea stall), one innovative (EV battery recycling).', 'Explicitly contrast \'risk\' (coin toss, known odds) vs \'uncertainty\' (launching India\'s first private rocket, unknown.', 'Require them to rewrite the definition using \'mobilises\', \'introduces\', \'bears uncertainty\', \'creates value\' — verbs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_09_010', difficulty: 'standard',
          question: 'Incentives for MSMEs are government-provided financial and non-financial.',
          hint: 'Revisit node c11_bs_cbse_09_001 (MSME classification table with investment/turnover.',
          misconception: 'Students often believe **tax holiday means zero tax liability forever** — they confuse "holiday" (temporary) with.',
          parts: [
                { id: 'a', prompt: 'A micro enterprise invests ₹40 lakh in eligible plant and machinery under CLCSS (15% capital subsidy, maximum ₹15 lakh).', answer: 'Step 1: Eligible subsidy = 15% of ₹40 lakh = ₹6 lakh (within ₹15 lakh cap)',
                  options: ['Step 1: Eligible subsidy = 15% of ₹40 lakh = ₹6 lakh (within ₹15 lakh cap)', 'holiday', 'exemption'],
                  hint: 'Revisit node c11_bs_cbse_09_001 (MSME classification table with investment/turnover limits) and.',
                  misconception: 'Students often believe **tax holiday means zero tax liability forever** — they confuse "holiday" (temporary) with "exemption" (permanent).' }
          ],
            remediations: { 'tax-holiday-means-zero-tax': { steps: ['If a student exhibits these misconceptions, do **not** simply re-read the scheme list.', 'Instead: (1) Take the **CGTMSE circular** (available on cgtmse.in) and highlight the "extent of guarantee" table.', '(2) Show a **sample CLCSS application form** — point out the "technical appraisal" and "joint inspection" columns.', '(3) Use the **Income Tax Act Section 10AA/80-IA** bare text — underline "consecutive assessment years" and "subject.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
