import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch09_p1: SimDef = {
    id: 'v3_c11_bs_ch09_p1',
    title: 'MSME and Business Entrepreneurship · Part 1/2',
    subtitle: 'Two thresholds stand between an enterprise and its benefits — clear both, at the stricter rung.',
    classLevel: 11, subject: 'business_studies', topic: 'MSME and Business Entrepreneurship · Part 1/2',
    chapters: ['c11_bs_ch09'],
    nodeIds: ['c11_bs_cbse_09_001', 'c11_bs_cbse_09_002', 'c11_bs_cbse_09_003', 'c11_bs_cbse_09_004', 'c11_bs_cbse_09_005', 'c11_bs_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a registration clerk deciding which MSME certificate to issue', intro: 'Five applications, five pairs of numbers. Each applicant argues for the category with better benefits — your table decides, not their preference.', goal: 'Apply the MSMED investment-plus-turnover criteria to classify enterprises as Micro, Small, or Medium.' },
    discovery: {
        question: 'A service unit invests ₹8 crore in equipment and turns over ₹45 crore a year. Investment says Small; a careless reading of turnover says... also Small — but a student cries \'Micro, the turnover is under ₹50 crore!\' What rule settles it?',
        options: ['Both criteria must be met simultaneously, and the lower category wins — ₹8 crore blows past Micro\'s ₹1 crore investment cap regardless of turnover', 'Turnover alone decides; investment is only checked for manufacturers', 'The higher of the two categories always applies', 'Average the two criteria and round down'],
        answer: 'Both criteria must be met simultaneously, and the lower category wins — ₹8 crore blows past Micro\'s ₹1 crore investment cap regardless of turnover',
        hook: 'MSME status is a dual lock — investment AND turnover — and the stricter of your two numbers owns you.',
    },
    teaching: [
        { title: 'MSME: Meaning and Classification (Micro, Small, Medium)', text: 'Micro, Small and Medium Enterprises (MSME) are business entities classified under the Micro, Small and Medium Enterprises Development (MSMED) Act, 2006 based on a composite criterion of investment.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify five enterprises — from a ₹0.8-crore furniture workshop to a ₹40-crore auto-parts maker — as Micro, Small, or Medium using both thresholds, and explain what benefits ride on getting the label right.',
        labels: ['MSME: Meaning and Classification', 'Role of MSME', 'Problems Faced by MSMEs', 'Government Schemes and Incentives', 'Entrepreneurship: Concept, Characteristics', 'Entrepreneur vs Manager: Distinction'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_09_001', title: 'MSME: Meaning and Classification (Micro, Small, Medium)',
          caseStudy: { intro: 'Imagine you want to start a small furniture manufacturing unit in your hometown with an initial investment of ₹80 lakhs in machinery and expect a first-year.',
            decisions: [{ prompt: 'State the exact investment in plant and machinery and turnover limits for a Micro Enterprise under the MSMED Act 2006.', options: [
                { text: 'Micro Enterprise: Investment in plant and machinery/equipment ≤ ₹1 crore AND Turnover ≤', outcome: 'Micro Enterprise: Investment in plant and machinery/equipment ≤ ₹1 crore AND Turnover ≤ ₹5 crore.' },
                { text: 'investment shows capacity', outcome: 'Not quite — Students believe that if an enterprise\'s investment qualifies for a higher category (e.g., Medium).', reveals: 'if-an-enterprise-s-investment' },
                { text: 'if an enterprise\'s investment qualifies for a higher category (e', outcome: 'Not quite — Students believe that if an enterprise\'s investment qualifies for a higher category (e.g., Medium).', reveals: 'if-an-enterprise-s-investment' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_09_002', title: 'Role of MSME in Economic Development of India',
          caseStudy: { intro: 'Imagine you are visiting a small town in Tamil Nadu where a cluster of powerloom units employs hundreds of families, using locally sourced cotton and.',
            decisions: [{ prompt: 'State the approximate percentage contribution of MSMEs to India\'s GDP and exports as per the NCERT textbook.', options: [
                { text: 'MSMEs contribute approximately 29.7% of GDP and 49.66% of exports', outcome: 'MSMEs contribute approximately 29.7% of GDP and 49.66% of exports.' },
                { text: '50% of GDP', outcome: 'Not quite — Students often think MSMEs are merely "small versions of large industries" and assume their role.', reveals: 'msmes-are-merely-small-versions' },
                { text: 'small versions of large industries', outcome: 'Not quite — Students often think MSMEs are merely "small versions of large industries" and assume their role.', reveals: 'msmes-are-merely-small-versions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_09_003', title: 'Problems Faced by MSMEs in India',
          caseStudy: { intro: 'Imagine a small furniture manufacturer in Jodhpur who employs 15 artisans and uses locally sourced sheesham wood.',
            decisions: [{ prompt: 'A micro enterprise in the handloom sector has an investment in plant and machinery of ₹80 lakh and an annual turnover of ₹4 crore.', options: [
                { text: 'FALSE', outcome: 'FALSE. Under the revised classification (2020), a micro enterprise has investment ≤ ₹1 crore AND.' },
                { text: 'bullet points', outcome: 'Not quite — Students believe the seven problems are independent "bullet points" to memorise for exams.', reveals: 'the-seven-problems-are-independent' },
                { text: 'the seven problems are independent "bullet points" to memorise for exams', outcome: 'Not quite — Students believe the seven problems are independent "bullet points" to memorise for exams.', reveals: 'the-seven-problems-are-independent' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_09_004', title: 'Government Schemes and Incentives for MSMEs',
          caseStudy: { intro: 'Imagine a young entrepreneur in Tier-2 city has a viable business idea for manufacturing eco-friendly packaging but owns no land for collateral and has.',
            decisions: [{ prompt: 'Name the scheme that provides collateral-free credit guarantee cover to Micro and Small Enterprises for loans up to ₹5 crore, and state the.', options: [
                { text: 'The Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) provides', outcome: 'The Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) provides collateral-free.' },
                { text: 'MUDRA or PMEGP', outcome: 'Not quite — Students treat all government schemes as "subsidy schemes" giving free money.', reveals: 'students-treat-all-government-schemes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_09_005', title: 'Entrepreneurship: Concept, Characteristics and Functions',
          caseStudy: { intro: 'Imagine you notice that your neighbourhood has many elderly residents who struggle to buy fresh vegetables daily.',
            decisions: [{ prompt: 'Define entrepreneurship in one sentence using the three key terms: entrepreneur, entrepreneurship, and enterprise.', options: [
                { text: 'Entrepreneurship is the process (verb) undertaken by an entrepreneur (subject/person) to', outcome: 'Entrepreneurship is the process (verb) undertaken by an entrepreneur (subject/person) to create.' },
                { text: 'starting a business', outcome: 'Not quite — Students often equate **risk-taking in entrepreneurship** with **gambling or reckless behaviour**.', reveals: 'students-often-equate-risk-taking' },
                { text: 'An entrepreneur puts all money into a lottery-like startup', outcome: 'Not quite — Students often equate **risk-taking in entrepreneurship** with **gambling or reckless behaviour**.', reveals: 'students-often-equate-risk-taking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_09_006', title: 'Entrepreneur vs Manager: Distinction',
          caseStudy: { intro: 'Imagine your uncle starts a small bakery: he invests his savings, creates new recipes, and loses money if it fails.',
            decisions: [{ prompt: 'Define the term \'entrepreneur\' as per the CBSE Class 11 Business Studies textbook.', options: [
                { text: 'An entrepreneur is the person who conceives a business idea, mobilizes resources,', outcome: 'An entrepreneur is the person who conceives a business idea, mobilizes resources, establishes the.' },
                { text: 'entrepreneur', outcome: 'Not quite — Students often believe that "entrepreneur" and "manager" are hierarchical levels — that a manager.', reveals: 'entrepreneur-and-manager-are-hierarchical' },
                { text: 'manager', outcome: 'Not quite — Students often believe that "entrepreneur" and "manager" are hierarchical levels — that a manager.', reveals: 'entrepreneur-and-manager-are-hierarchical' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your uncle wants MSME benefits for his unit: investment in machinery ₹12 crore, annual turnover ₹8 crore. He insists it\'s \'Small\' because turnover fits the Small band, while his accountant claims \'Micro\' because... turnover is low. You must settle it before the Udyam registration.',
            decisions: [{ prompt: 'What is the correct classification?', options: [
                { text: 'Medium — the Act uses a dual threshold where BOTH limits must be met at each level: Micro fails (investment >₹1 cr), Small fails (investment >₹10 cr), Medium passes (≤₹50 cr investment AND ≤₹250 cr turnover). The first category where both criteria clear wins.', outcome: 'Neither \'turnover decides\' nor \'higher capacity decides\' — run the checks in ascending order and take the first band where both conditions pass.' },
                { text: 'Small — ₹8 crore turnover sits inside the Small band, and turnover reflects real activity better than sunk investment.', outcome: 'The dual test is a gate, not a preference: ₹12 cr investment breaks Small\'s ₹10 cr investment ceiling, so the unit can\'t be Small whatever its turnover.', reveals: 'turnover-alone-decides' },
                { text: 'Micro — smaller turnover should pull the classification down to the lowest qualifying label.', outcome: 'There\'s no \'pulling down\' to a band whose limits are breached; Micro needs investment ≤₹1 cr, which ₹12 cr fails outright.', reveals: 'lower-category-wins' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You mastered the composite test: two numbers, two limits, and the more restrictive verdict always prevails.',
            decisions: [{ prompt: 'What comes next? MSME and Business Entrepreneurship · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — MSME and Business Entrepreneurship · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_09_001', difficulty: 'standard',
          question: 'Micro, Small and Medium Enterprises (MSME) are business entities classified.',
          hint: 'Revise Class 6 Maths "Large Numbers: Lakhs and Crores" (c6_math_ch01_005) and practice.',
          misconception: 'Students believe that if an enterprise\'s investment qualifies for a higher category (e.g., Medium) but turnover.',
          parts: [
                { id: 'a', prompt: 'A service enterprise has investment in equipment of ₹8 crore and annual turnover of ₹45 crore.', answer: 'This is a Small Enterprise',
                  options: ['This is a Small Enterprise', 'Micro because turnover is low', 'Medium because investment is high', 'investment shows capacity'],
                  hint: 'Revise Class 6 Maths "Large Numbers: Lakhs and Crores" (c6_math_ch01_005) and practice converting.',
                  misconception: 'Students believe that if an enterprise\'s investment qualifies for a higher category (e.g., Medium) but turnover qualifies for a lower.' },
                { id: 'b', prompt: 'A manufacturing unit has investment in plant and machinery of ₹12 crore and annual turnover of ₹8 crore. Determine its MSME category.', answer: 'Step 1: Check investment ₹12 crore against thresholds',
                  options: ['Step 1: Check investment ₹12 crore against thresholds', 'investment shows capacity', 'if an enterprise\'s investment qualifies for a higher category (e'],
                  hint: 'Revise Class 6 Maths "Large Numbers: Lakhs and Crores" (c6_math_ch01_005) and practice converting.',
                  misconception: 'Students believe that if an enterprise\'s investment qualifies for a higher category (e.g., Medium) but turnover qualifies for a lower.' }
          ],
            remediations: { 'if-an-enterprise-s-investment': { steps: ['Draw a 3×2 table on paper: Rows = Micro, Small, Medium; Columns = Investment Limit, Turnover Limit.', 'For the problematic case (I=₹12cr, T=₹8cr), test each row sequentially: "Does Row 1 (Micro) pass BOTH columns?', 'Emphasise: "The classification is the FIRST row from top where BOTH cells are green."', 'Practice 5 varied cases (both criteria same category, investment higher, turnover higher, borderline values) until the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_09_002', difficulty: 'standard',
          question: 'Micro, Small and Medium Enterprises (MSMEs) are defined under the MSMED Act.',
          hint: 'If stuck, revisit the classification table in node c11_bs_cbse_09_001 and practice.',
          misconception: 'Students often think MSMEs are merely "small versions of large industries" and assume their role is only quantitative.',
          parts: [
                { id: 'a', prompt: 'State the approximate percentage contribution of MSMEs to India\'s GDP and exports as per the NCERT textbook.', answer: 'MSMEs contribute approximately 29.7% of GDP and 49.66% of exports',
                  options: ['MSMEs contribute approximately 29.7% of GDP and 49.66% of exports', '50% of GDP', 'small versions of large industries', 'their role is only quantitative (more units, more jobs)'],
                  hint: 'If stuck, revisit the classification table in node c11_bs_cbse_09_001 and practice classifying.',
                  misconception: 'Students often think MSMEs are merely "small versions of large industries" and assume their role is only quantitative (more units, more.' },
                { id: 'b', prompt: 'A micro enterprise in Uttar Pradesh invests ₹80 lakh in plant and machinery and achieves a turnover of ₹4 crore.', answer: 'Classification: Micro Enterprise (investment ≤ ₹1 crore, turnover ≤ ₹5 crore)',
                  options: ['Classification: Micro Enterprise (investment ≤ ₹1 crore, turnover ≤ ₹5 crore)', 'small versions of large industries', 'their role is only quantitative (more units, more jobs)'],
                  hint: 'If stuck, revisit the classification table in node c11_bs_cbse_09_001 and practice classifying.',
                  misconception: 'Students often think MSMEs are merely "small versions of large industries" and assume their role is only quantitative (more units, more.' },
                { id: 'c', prompt: 'Compare the role of MSMEs in "balanced regional development" with the role of large industries.', answer: 'MSMEs can be widely spread without locational constraints',
                  options: ['MSMEs can be widely spread without locational constraints', 'small versions of large industries', 'their role is only quantitative (more units, more jobs)'],
                  hint: 'If stuck, revisit the classification table in node c11_bs_cbse_09_001 and practice classifying.',
                  misconception: 'Students often think MSMEs are merely "small versions of large industries" and assume their role is only quantitative (more units, more.' }
          ],
            remediations: { 'msmes-are-merely-small-versions': { steps: ['If a student exhibits this misconception, guide them through a comparative table: Column A = Large Industry (e.g.', 'For each row (Capital per worker, Location flexibility, Raw material source, Technology complexity, Decision speed).', 'Then ask: "Which column allows industrialisation in a remote village with no railway line?" This concrete comparison.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think MSMEs are merely "small versions of large industries" and assume their role is only quantitative.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The low cost of production enjoyed by MSMEs is their competitive strength." Consider both the advantages and potential limitations.', answer: 'The statement is valid',
                  options: ['The statement is valid', 'small versions of large industries', 'their role is only quantitative (more units, more jobs)'],
                  hint: 'If stuck, revisit the classification table in node c11_bs_cbse_09_001 and practice classifying.',
                  misconception: 'Students often think MSMEs are merely "small versions of large industries" and assume their role is only quantitative (more units, more.' }
          ],
            remediations: { 'msmes-are-merely-small-versions': { steps: ['If a student exhibits this misconception, guide them through a comparative table: Column A = Large Industry (e.g.', 'For each row (Capital per worker, Location flexibility, Raw material source, Technology complexity, Decision speed).', 'Then ask: "Which column allows industrialisation in a remote village with no railway line?" This concrete comparison.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_09_003', difficulty: 'standard',
          question: 'Problems Faced by MSMEs in India refer to the structural, operational, and.',
          hint: 'Revisit c11_bs_cbse_09_001 classification table (investment/turnover limits) and.',
          misconception: 'Students believe the seven problems are independent "bullet points" to memorise for exams.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Problems Faced by MSMEs in India refer to the structural, operational, and environmental',
                  options: ['Problems Faced by MSMEs in India refer to the structural, operational, and environmental', 'Micro, Small and Medium Enterprises (MSME) are business entities classified under the', 'Micro, Small and Medium Enterprises (MSMEs) are defined under the MSMED Act, 2006 based', 'Government Schemes and Incentives for MSMEs refer to the structured policy interventions,'],
                  hint: 'Revisit c11_bs_cbse_09_001 classification table (investment/turnover limits) and c11_bs_cbse_09_002.',
                  misconception: 'Students believe the seven problems are independent "bullet points" to memorise for exams.' }
          ],
            remediations: { 'the-seven-problems-are-independent': { steps: ['Give them a blank cause-effect diagram with 7 nodes.', 'Ask them to place "Bank rejects loan" and "Owner has no time for marketing" on the diagram.', 'Guide them to draw arrows: Loan rejection → no working capital → cannot pay wood supplier advance → supplier.', 'Have them complete the loop: No marketing → no direct buyers → depend on middlemen → 90-day payment cycles → cash.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_09_004', difficulty: 'standard',
          question: 'Government Schemes and Incentives for MSMEs refer to the structured policy.',
          hint: 'Revisit c11_bs_cbse_09_001 (classification table) and c11_bs_cbse_09_003 (problem list.',
          misconception: 'Students treat all government schemes as "subsidy schemes" giving free money.',
          parts: [
                { id: 'a', prompt: 'An existing micro enterprise manufacturing auto components has an outstanding MUDRA Kishore loan of ₹3 lakh. It now needs ₹40 lakh to upgrade machinery.', answer: 'The bank should use CGTMSE guarantee for the new ₹40 lakh term loan',
                  options: ['The bank should use CGTMSE guarantee for the new ₹40 lakh term loan', 'loan products'],
                  hint: 'Revisit c11_bs_cbse_09_001 (classification table) and c11_bs_cbse_09_003 (problem list: finance.',
                  misconception: 'Students treat all government schemes as "subsidy schemes" giving free money.' }
          ],
            remediations: { 'students-treat-all-government-schemes': { steps: ['Draw a 2×2 matrix on paper: rows = Problem (Finance/Marketing/Technology/Skill), columns = Instrument.', 'Place each scheme in the correct cell (e.g., PMEGP → Finance/Subsidy; CGTMSE → Finance/Guarantee; MUDRA → Finance/Loan.', 'For each cell, write *one* eligibility trigger (e.g., PMEGP: new unit + project cost limit; CGTMSE: new credit facility.', 'Practice 3 case-studies where you must pick the *instrument* first, then the *scheme*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_09_005', difficulty: 'standard',
          question: 'Entrepreneurship is the systematic, lawful, and purposeful process.',
          hint: 'Revisit c8_eco_ch1_6 (Entrepreneurship: Organising Factors of Production) and.',
          misconception: 'Students often equate **risk-taking in entrepreneurship** with **gambling or reckless behaviour**.',
          parts: [
                { id: 'a', prompt: 'Rahul quits his ₹50,000/month job to start a cloud kitchen. He researches the market, negotiates with suppliers, creates a unique menu, and invests ₹10 lakh.', answer: 'his market research and menu creation, and (',
                  options: ['his market research and menu creation, and (', 'organisation of production', 'systematic activity', 'An entrepreneur puts all money into a lottery-like startup'],
                  hint: 'Revisit c8_eco_ch1_6 (Entrepreneurship: Organising Factors of Production) and c9_eco_ch1_7 (Factors.',
                  misconception: 'Students often equate **risk-taking in entrepreneurship** with **gambling or reckless behaviour**.' },
                { id: 'b', prompt: 'Compare the **organisation of production** function in a micro enterprise (e.g., a home-based pickle maker) versus a medium enterprise (e.g., a 50-employee.', answer: 'In the micro enterprise, the entrepreneur personally performs most functions',
                  options: ['In the micro enterprise, the entrepreneur personally performs most functions', 'both do the same thing', 'An entrepreneur puts all money into a lottery-like startup'],
                  hint: 'Revisit c8_eco_ch1_6 (Entrepreneurship: Organising Factors of Production) and c9_eco_ch1_7 (Factors.',
                  misconception: 'Students often equate **risk-taking in entrepreneurship** with **gambling or reckless behaviour**.' }
          ],
            remediations: { 'students-often-equate-risk-taking': { steps: ['**Re-read the NCERT paragraph on risk-taking** (page 204-205) and highlight phrases: "calculated risk," "convert 50 per.', '**Contrast with gambling**: Write two columns — Gambling (outcome pure chance, no control, no value creation) vs.', 'Entrepreneurial Risk (outcome influenced by effort/skill, value created, personal stake).', '**Apply to a mini-case**: "Priya invests ₹50,000 in a franchise after studying the brand\'s track record, location.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_09_006', difficulty: 'standard',
          question: 'An entrepreneur is the owner-creator of an enterprise who bears uncertainty.',
          hint: 'Review the five characteristics of entrepreneurship (systematic activity, lawful purpose.',
          misconception: 'Students often believe that "entrepreneur" and "manager" are hierarchical levels — that a manager gets promoted.',
          parts: [
                { id: 'a', prompt: 'Rahul starts a food delivery app, invests ₹50 lakh, and hires Priya as Operations Manager at ₹80,000/month.', answer: 'Rahul bears the entire loss of ₹40 lakh',
                  options: ['Rahul bears the entire loss of ₹40 lakh', 'entrepreneur', 'manager'],
                  hint: 'Review the five characteristics of entrepreneurship (systematic activity, lawful purpose.',
                  misconception: 'Students often believe that "entrepreneur" and "manager" are hierarchical levels — that a manager gets promoted to become an entrepreneur.' }
          ],
            remediations: { 'entrepreneur-and-manager-are-hierarchical': { steps: ['Ask the student to list the contractual differences between an employment agreement and a business ownership agreement.', 'Have them identify who loses personal assets if the business fails in three scenarios: (a) sole proprietorship, (b).', 'Use a Venn diagram to separate "functions performed by owner-manager" into entrepreneurial functions (bearing.', 'Emphasize that role is defined by legal-economic relationship to the enterprise, not by title or tasks.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
