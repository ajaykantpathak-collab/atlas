import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch06_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch06_p2: SimDef = {
    id: 'v3_c11_bs_ch06_p2',
    title: 'Social Responsibilities of Business and Business Ethics · Part 2/2',
    subtitle: 'Where the law\'s boundary ends, a business\'s real test begins.',
    classLevel: 11, subject: 'business_studies', topic: 'Social Responsibilities of Business and Business Ethics · Part 2/2',
    chapters: ['c11_bs_ch06'],
    nodeIds: ['c11_bs_cbse_06_007', 'c11_bs_cbse_06_008', 'c11_bs_cbse_06_009', 'c11_bs_cbse_06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an ethics officer drafting a factory\'s responsibility charter', intro: 'Management wants to claim credit for everything the factory does. Your charter must separate compliance from conscience from charity.', goal: 'Define social responsibility, distinguish it from legal compliance, and classify actions as legal, ethical, or discretionary.' },
    discovery: {
        question: 'Factory A treats its waste only because a new law forces it to. Factory B installs the same expensive equipment voluntarily after neighbours complain — no law requires it. Which factory is exercising social responsibility?',
        options: ['Only B — social responsibility begins where the law ends; compelled compliance is merely legal responsibility', 'Only A — it followed the law, which defines responsibility', 'Both — pollution control is always socially responsible', 'Neither — only charity donations count'],
        answer: 'Only B — social responsibility begins where the law ends; compelled compliance is merely legal responsibility',
        hook: 'The voluntariness is the whole concept — an act you were forced into carries no ethical credit.',
    },
    teaching: [
        { title: 'Social Responsibility vs Legal Responsibility: Distinction', text: 'Social responsibility is a firm\'s voluntary obligation to act in ways that benefit society beyond what is legally mandated, while legal responsibility is the compulsory compliance with statutory laws.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort a company\'s actions — paying minimum wage, voluntarily over-treating effluent, funding a village school — into legal, ethical, and discretionary responsibilities, and argue whether a business owes anything beyond compliance.',
        labels: ['Social Responsibility vs Legal', 'Corporate Social Responsibility (CSR)', 'Ethical Issues in Business', 'Role of Business'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_06_007', title: 'Social Responsibility vs Legal Responsibility: Distinction',
          caseStudy: { intro: 'Imagine a factory legally discharging treated wastewater within permitted pollution limits, yet nearby villagers complain of health issues.',
            decisions: [{ prompt: 'A company pays minimum wages as prescribed by the Minimum Wages Act, 1948. The workers demand higher wages citing rising inflation.', options: [
                { text: 'No, because social responsibility includes ethical responsibility (fair wages beyond', outcome: 'No, because social responsibility includes ethical responsibility (fair wages beyond legal minimum).' },
                { text: 'Yes, because they follow the law', outcome: 'Not quite — Students equate "legal responsibility" with "social responsibility" because both involve "doing the.', reveals: 'students-equate-legal-responsibility-with' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_bs_cbse_06_008', title: 'Corporate Social Responsibility (CSR): Meaning and Practices',
          scaffold: { problem: '"GreenEnergy Ltd." is a listed company with the following financials for the three years preceding FY 2023-24: FY 2020-21: Net Profit ₹120.',
            steps: [
            { text: 'Check applicability criteria for FY 2022-23 (the immediately preceding financial year).' },
            { text: 'Compute average net profit of the three preceding years: (₹120 crore + ₹150 crore + ₹180 crore) / 3 = ₹450 crore / 3.' },
            { text: 'Apply the 2% formula: 2% of ₹150 crore = (2/100) × 150 = ₹3 crore.' },
            { text: 'Verify that the company has constituted a CSR committee with at least three directors including one independent.' },
            { text: 'Confirm that the ₹3 crore will be spent on activities listed in Schedule VII (e.g., environmental sustainability.' },
            { text: 'State the final answer: GreenEnergy Ltd. must spend at least ₹3 crore on CSR in FY 2023-24.', faded: true, blankAnswer: 'Yes, CSR provisions apply. Minimum CSR expenditure for.' }
            ] } },
        { type: 'case', nodeId: 'c11_bs_cbse_06_009', title: 'Ethical Issues in Business: Unfair Trade Practices and Consumer Exploitation',
          caseStudy: { intro: 'Imagine you buy a 1 kg packet of branded wheat flour for ₹55, but when you weigh it at home on a verified digital scale, it shows only 920 grams.',
            decisions: [{ prompt: 'Define unfair trade practice and give two distinct examples from the Indian consumer market context that are NOT mere poor service but.', options: [
                { text: 'Correct answer: Unfair trade practice is a deceptive or fraudulent business method used', outcome: 'Correct answer: Unfair trade practice is a deceptive or fraudulent business method used to promote.' },
                { text: 'rude staff', outcome: 'Not quite — Students often believe that "unfair trade practice" only applies to large corporations or branded.', reveals: 'unfair-trade-practice-only-applies' },
                { text: 'late delivery', outcome: 'Not quite — Students often believe that "unfair trade practice" only applies to large corporations or branded.', reveals: 'unfair-trade-practice-only-applies' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_06_010', title: 'Role of Business in Environmental Protection',
          caseStudy: { intro: 'Imagine you live near an industrial area where the river has turned black, the air smells of chemicals, and children have breathing problems — the factory.',
            decisions: [{ prompt: 'State the seven specific steps that business enterprises should take for environmental protection as per NCERT.', options: [
                { text: 'The seven steps are: (i) Top management commitment to create work culture for', outcome: 'The seven steps are: (i) Top management commitment to create work culture for environmental.' },
                { text: 'environmental protection by business', outcome: 'Not quite — Students often believe "environmental protection by business" means only end-of-pipe solutions like.', reveals: 'environmental-protection-by-business-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your friend\'s tiffin service legally uses single-use plastic boxes (the law doesn\'t ban them yet). She also pays her two delivery staff slightly below the legal minimum wage during a \'trial month\', and plans a big Diwali donation to a temple as \'her social responsibility for the year\'.',
            decisions: [{ prompt: 'Sort her actions into legal, ethical and discretionary responsibility.', options: [
                { text: 'Below-minimum wages is illegal — not responsibility at all. Switching from plastic to reusable dabbas before the law forces it would be genuine social responsibility: voluntary, beyond compliance, with short-term cost. The temple donation is discretionary philanthropy — nice, but it doesn\'t offset legal or ethical failures.', outcome: 'Social responsibility starts where law ends; it isn\'t charity sprinkled over violations — fair wages are an obligation, not generosity.' },
                { text: 'The donation makes her socially responsible — giving back to society is exactly what the term means.', outcome: 'Charity is only the discretionary tip of responsibility; paying legal wages and not polluting are obligations that no donation can substitute for.', reveals: 'csr-equals-charity' },
                { text: 'The trial-month wage cut is fine — she\'s a small business and social responsibility applies only to large corporates.', outcome: 'Minimum wage is legal responsibility, binding on every employer regardless of size; smallness exempts no one from law or ethics.', reveals: 'responsibility-only-for-big-firms' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_06_010', title: 'You made it',
          caseStudy: { intro: 'You learned the taxonomy of obligation: what law demands, what society expects, and what only generosity explains.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_06_007', difficulty: 'standard',
          question: 'Social responsibility is a firm\'s voluntary obligation to act in ways that.',
          hint: 'Revisit c11_bs_cbse_06_004 (Social Responsibility towards Different Interest Groups) and.',
          misconception: 'Students equate "legal responsibility" with "social responsibility" because both involve "doing the right thing." They.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why "legal responsibility is a subset of social responsibility" using the NCERT\'s four-category classification (economic, legal.', answer: 'Social responsibility comprises four categories: economic, legal, ethical, and',
                  options: ['Social responsibility comprises four categories: economic, legal, ethical, and', 'They are the same', 'Social responsibility is only charity', 'social responsibility is only discretionary/philanthropic'],
                  hint: 'Revisit c11_bs_cbse_06_004 (Social Responsibility towards Different Interest Groups) and focus.',
                  misconception: 'Students equate "legal responsibility" with "social responsibility" because both involve "doing the right thing." They think if a company.' },
                { id: 'b', prompt: 'Compare and contrast the consequences a firm faces for violating (i) legal responsibility vs.', answer: 'Legal violation invites state-enforced penalties (fines, imprisonment, license',
                  options: ['Legal violation invites state-enforced penalties (fines, imprisonment, license', 'both cause loss of money'],
                  hint: 'Revisit c11_bs_cbse_06_004 (Social Responsibility towards Different Interest Groups) and focus.',
                  misconception: 'Students equate "legal responsibility" with "social responsibility" because both involve "doing the right thing." They think if a company.' }
          ],
            remediations: { 'students-equate-legal-responsibility-with': { steps: ['If a student conflates the two, use the "Floor vs.', 'Ceiling" analogy: Draw a building.', 'Legal responsibility is the floor (minimum, mandatory, enforced by state).', 'Social responsibility is the ceiling (aspirational, voluntary, enforced by conscience/stakeholders).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_06_008', difficulty: 'standard',
          question: 'Corporate Social Responsibility (CSR) under the Companies Act 2013 is.',
          hint: 'Revisit c11_bs_cbse_06_001 for the concept of social obligation and c11_bs_cbse_06_007.',
          misconception: 'Students often believe CSR is simply "corporate charity" that any company can do voluntarily, and that spending.',
          parts: [
                { id: 'a', prompt: 'A company had net profits of ₹40 crore, ₹60 crore, and ₹80 crore in the three preceding financial years.', answer: 'Step 1: Check applicability',
                  options: ['Step 1: Check applicability', 'corporate charity'],
                  hint: 'Revisit c11_bs_cbse_06_001 for the concept of social obligation and c11_bs_cbse_06_007 for the.',
                  misconception: 'Students often believe CSR is simply "corporate charity" that any company can do voluntarily, and that spending on employee welfare (like.' }
          ],
            remediations: { 'csr-is-simply-corporate-charity': { steps: ['If a student exhibits this misconception, do the following: (1) Show the exact text of Section 135(1) and Rule 3 of the.', '(2) Display Schedule VII and Rule 4 side-by-side; ask the student to classify 5 sample expenditures (e.g., "staff gym,".', '(3) Have them calculate the 2% spend for a company that *just* crosses the net profit threshold (₹5.1 crore).', '(4) Assign a mini-case: "Company X spent ₹2 crore on a staff sports complex and claimed CSR.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_06_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe CSR is simply "corporate charity" that any company can do voluntarily, and that spending.',
          parts: [
                { id: 'a', prompt: 'A company spends its entire 2% CSR budget on "skill development for youth" (a Schedule VII item) but conducts the training only in the city where its.', answer: 'The spending qualifies technically',
                  options: ['The spending qualifies technically', 'corporate charity'],
                  hint: 'Revisit c11_bs_cbse_06_001 for the concept of social obligation and c11_bs_cbse_06_007 for the.',
                  misconception: 'Students often believe CSR is simply "corporate charity" that any company can do voluntarily, and that spending on employee welfare (like.' }
          ],
            remediations: { 'csr-is-simply-corporate-charity': { steps: ['If a student exhibits this misconception, do the following: (1) Show the exact text of Section 135(1) and Rule 3 of the.', '(2) Display Schedule VII and Rule 4 side-by-side; ask the student to classify 5 sample expenditures (e.g., "staff gym,".', '(3) Have them calculate the 2% spend for a company that *just* crosses the net profit threshold (₹5.1 crore).', '(4) Assign a mini-case: "Company X spent ₹2 crore on a staff sports complex and claimed CSR.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_06_009', difficulty: 'standard',
          question: 'Unfair trade practices refer to deceptive, fraudulent, or unethical business.',
          hint: 'If stuck, revisit c11_bs_cbse_06_007 "Social Responsibility vs Legal Responsibility" and.',
          misconception: 'Students often believe that "unfair trade practice" only applies to large corporations or branded products, and that.',
          parts: [
                { id: 'a', prompt: 'A popular fairness cream brand claims "Visible fairness in 7 days" with before/after photos.', answer: 'Correct answer: (1) Unfair trade practice: Misleading advertisement',
                  options: ['Correct answer: (1) Unfair trade practice: Misleading advertisement', 'unfair trade practice', 'they are poor', 'it\'s not organised'],
                  hint: 'If stuck, revisit c11_bs_cbse_06_007 "Social Responsibility vs Legal Responsibility" and create.',
                  misconception: 'Students often believe that "unfair trade practice" only applies to large corporations or branded products, and that small traders, street.' }
          ],
            remediations: { 'unfair-trade-practice-only-applies': { steps: ['If a student holds this misconception, conduct a "Neighbourhood Audit" exercise: Ask them to observe 5 small businesses.', 'Then map each observation to the specific consumer right violated and the relevant unfair trade practice category.', 'Debrief by asking: "Does the vendor\'s poverty justify denying the consumer\'s right to safety or fair measure?" This.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_06_010', difficulty: 'standard',
          question: 'Role of Business in Environmental Protection refers to the proactive.',
          hint: 'Revisit c11_bs_cbse_06_001 (Social Responsibility: Concept and Meaning) and.',
          misconception: 'Students often believe "environmental protection by business" means only end-of-pipe solutions like installing effluent.',
          parts: [
                { id: 'a', prompt: 'State the seven specific steps that business enterprises should take for environmental protection as per NCERT.', answer: 'The seven steps are: (i) Top management commitment to create work culture for',
                  options: ['The seven steps are: (i) Top management commitment to create work culture for', 'environmental protection by business'],
                  hint: 'Revisit c11_bs_cbse_06_001 (Social Responsibility: Concept and Meaning) and c11_bs_cbse_06_007.',
                  misconception: 'Students often believe "environmental protection by business" means only end-of-pipe solutions like installing effluent treatment plants.' },
                { id: 'b', prompt: 'A chemical manufacturing company dumps untreated waste into a nearby river, causing water pollution.', answer: 'The CEO\'s position fails on all five grounds: (i) Health hazards',
                  options: ['The CEO\'s position fails on all five grounds: (i) Health hazards', 'environmental protection by business'],
                  hint: 'Revisit c11_bs_cbse_06_001 (Social Responsibility: Concept and Meaning) and c11_bs_cbse_06_007.',
                  misconception: 'Students often believe "environmental protection by business" means only end-of-pipe solutions like installing effluent treatment plants.' }
          ],
            remediations: { 'environmental-protection-by-business-means': { steps: ['If the student equates environmental protection with end-of-pipe treatment only: (1) Ask them to re-read step (iii).', '(2) Give a concrete comparison: "Factory A installs a ₹1 crore ETP to treat dye wastewater.', 'Factory B spends ₹50 lakh to switch to low-salt dyes that need 60% less water and generate 70% less effluent.', 'Which aligns better with step (iii)?" (3) Have them list three process changes (not treatment additions) for a paper.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
