import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch06_p1: SimDef = {
    id: 'v3_c11_bs_ch06_p1',
    title: 'Social Responsibilities of Business and Business Ethics · Part 1/2',
    subtitle: 'Where the law\'s boundary ends, a business\'s real test begins.',
    classLevel: 11, subject: 'business_studies', topic: 'Social Responsibilities of Business and Business Ethics · Part 1/2',
    chapters: ['c11_bs_ch06'],
    nodeIds: ['c11_bs_cbse_06_001', 'c11_bs_cbse_06_002', 'c11_bs_cbse_06_003', 'c11_bs_cbse_06_004', 'c11_bs_cbse_06_005', 'c11_bs_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an ethics officer drafting a factory\'s responsibility charter', intro: 'Management wants to claim credit for everything the factory does. Your charter must separate compliance from conscience from charity.', goal: 'Define social responsibility, distinguish it from legal compliance, and classify actions as legal, ethical, or discretionary.' },
    discovery: {
        question: 'Factory A treats its waste only because a new law forces it to. Factory B installs the same expensive equipment voluntarily after neighbours complain — no law requires it. Which factory is exercising social responsibility?',
        options: ['Only B — social responsibility begins where the law ends; compelled compliance is merely legal responsibility', 'Only A — it followed the law, which defines responsibility', 'Both — pollution control is always socially responsible', 'Neither — only charity donations count'],
        answer: 'Only B — social responsibility begins where the law ends; compelled compliance is merely legal responsibility',
        hook: 'The voluntariness is the whole concept — an act you were forced into carries no ethical credit.',
    },
    teaching: [
        { title: 'Social Responsibility: Concept and Meaning', text: 'Social responsibility of business refers to its obligation to take decisions and perform actions that are desirable in terms of the objectives and values of society, going beyond mere legal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort a company\'s actions — paying minimum wage, voluntarily over-treating effluent, funding a village school — into legal, ethical, and discretionary responsibilities, and argue whether a business owes anything beyond compliance.',
        labels: ['Social Responsibility: Concept', 'Arguments for Social Responsibility', 'Arguments Against Social Responsibility', 'Social Responsibility towards Different', 'Business Ethics: Concept', 'Importance of Business Ethics'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_06_001', title: 'Social Responsibility: Concept and Meaning',
          caseStudy: { intro: 'Imagine you see two factories in your city: Factory A dumps untreated chemical waste into the river because no law explicitly bans that specific chemical yet.',
            decisions: [{ prompt: 'Define social responsibility of business as per the NCERT Class 11 textbook. How does it differ from legal responsibility in one key aspect?', options: [
                { text: 'Social responsibility is the obligation of business to take decisions and actions', outcome: 'Social responsibility is the obligation of business to take decisions and actions desirable for.' },
                { text: 'voluntary element', outcome: 'Not quite — Students equate "social responsibility" exclusively with "charity/philanthropy" (donating money.', reveals: 'students-equate-social-responsibility-exclusivel' },
                { text: 'law and social duty are identical', outcome: 'Not quite — Students equate "social responsibility" exclusively with "charity/philanthropy" (donating money.', reveals: 'students-equate-social-responsibility-exclusivel' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_06_002', title: 'Arguments for Social Responsibility',
          caseStudy: { intro: 'Imagine you are the CEO of a large chemical manufacturing company in Gujarat. Your factory emits pollutants but stays within legal limits.',
            decisions: [{ prompt: 'State the argument for social responsibility that suggests businesses should voluntarily assume social responsibilities to prevent the.', options: [
                { text: '**Correct Answer:** Avoidance of government regulation (Argument iii)', outcome: '**Correct Answer:** Avoidance of government regulation (Argument iii).' },
                { text: 'Legal responsibility', outcome: 'Not quite — Students often believe **"Arguments for social responsibility are just moral preaching—businesses.', reveals: 'arguments-for-social-responsibility-are' },
                { text: 'Compliance with law', outcome: 'Not quite — Students often believe **"Arguments for social responsibility are just moral preaching—businesses.', reveals: 'arguments-for-social-responsibility-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_06_003', title: 'Arguments Against Social Responsibility',
          caseStudy: { intro: 'Imagine a CEO announcing that her company will spend 5% of profits building schools in rural villages instead of expanding the factory.',
            decisions: [{ prompt: 'State the four major arguments against social responsibility as listed in the NCERT textbook for Class 11 Business Studies Chapter 6.', options: [
                { text: 'The four arguments are: (1) Violation of profit maximisation objective, (2) Burden on', outcome: 'The four arguments are: (1) Violation of profit maximisation objective, (2) Burden on consumers.' },
                { text: 'reasons why business *should not* be ethical', outcome: 'Not quite — Students often treat the four arguments against social responsibility as "reasons why business.', reveals: 'students-often-treat-the-four' },
                { text: 'arguments made by critics *claiming* social responsibility is counterproductive', outcome: 'Not quite — Students often treat the four arguments against social responsibility as "reasons why business.', reveals: 'students-often-treat-the-four' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_06_004', title: 'Social Responsibility towards Different Interest Groups',
          caseStudy: { intro: 'Imagine you\'re Mani, the newspaper reporter from the NCERT opening story, investigating a truck manufacturing company.',
            decisions: [{ prompt: 'A REMEMBER level question: List the four interest groups towards which a business enterprise has social responsibility according to NCERT.', options: [
                { text: 'The four interest groups are: (1) Shareholders/owners', outcome: 'The four interest groups are: (1) Shareholders/owners — fair return on investment and safety.' },
                { text: 'employees and workers', outcome: 'Not quite — Students commonly believe that "responsibility towards shareholders" means maximising short-term.', reveals: 'students-commonly-believe-that-responsibility' },
                { text: 'be ethical', outcome: 'Not quite — Students commonly believe that "responsibility towards shareholders" means maximising short-term.', reveals: 'students-commonly-believe-that-responsibility' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_06_005', title: 'Business Ethics: Concept and Elements',
          caseStudy: { intro: 'Imagine you are the CEO of a mid-sized Indian textile company.',
            decisions: [{ prompt: 'Define business ethics in one sentence as per the NCERT Class 11 textbook, and state how it differs from legal responsibility.', options: [
                { text: 'Business ethics refers to the socially determined moral principles', outcome: 'Business ethics refers to the socially determined moral principles which should govern business.' },
                { text: 'voluntary', outcome: 'Not quite — Students often think "Business Ethics = Corporate Social Responsibility (CSR)" or "Business Ethics.', reveals: 'business-ethics-corporate-social-responsibility' },
                { text: 'beyond compliance', outcome: 'Not quite — Students often think "Business Ethics = Corporate Social Responsibility (CSR)" or "Business Ethics.', reveals: 'business-ethics-corporate-social-responsibility' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_06_006', title: 'Importance of Business Ethics in Modern Business',
          caseStudy: { intro: 'Imagine you are comparing two Indian startups: Startup A cuts corners on safety testing to launch a product faster, while Startup B delays launch to ensure.',
            decisions: [{ prompt: 'State the NCERT definition of \'Business Ethics\' and list the five elements of business ethics as per the textbook.', options: [
                { text: 'Correct Answer: Business ethics refers to the socially determined moral principles', outcome: 'Correct Answer: Business ethics refers to the socially determined moral principles which should.' },
                { text: 'following the law', outcome: 'Not quite — Students believe "Business Ethics = Corporate Social Responsibility (CSR) = Charity/Donations.".', reveals: 'business-ethics-corporate-social-responsibility' },
                { text: 'Business Ethics = Corporate Social Responsibility (CSR) = Charity/Donations', outcome: 'Not quite — Students believe "Business Ethics = Corporate Social Responsibility (CSR) = Charity/Donations.".', reveals: 'business-ethics-corporate-social-responsibility' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your friend\'s tiffin service legally uses single-use plastic boxes (the law doesn\'t ban them yet). She also pays her two delivery staff slightly below the legal minimum wage during a \'trial month\', and plans a big Diwali donation to a temple as \'her social responsibility for the year\'.',
            decisions: [{ prompt: 'Sort her actions into legal, ethical and discretionary responsibility.', options: [
                { text: 'Below-minimum wages is illegal — not responsibility at all. Switching from plastic to reusable dabbas before the law forces it would be genuine social responsibility: voluntary, beyond compliance, with short-term cost. The temple donation is discretionary philanthropy — nice, but it doesn\'t offset legal or ethical failures.', outcome: 'Social responsibility starts where law ends; it isn\'t charity sprinkled over violations — fair wages are an obligation, not generosity.' },
                { text: 'The donation makes her socially responsible — giving back to society is exactly what the term means.', outcome: 'Charity is only the discretionary tip of responsibility; paying legal wages and not polluting are obligations that no donation can substitute for.', reveals: 'csr-equals-charity' },
                { text: 'The trial-month wage cut is fine — she\'s a small business and social responsibility applies only to large corporates.', outcome: 'Minimum wage is legal responsibility, binding on every employer regardless of size; smallness exempts no one from law or ethics.', reveals: 'responsibility-only-for-big-firms' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You learned the taxonomy of obligation: what law demands, what society expects, and what only generosity explains.',
            decisions: [{ prompt: 'What comes next? Social Responsibilities of Business and Business Ethics · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Social Responsibilities of Business and Business Ethics · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_06_001', difficulty: 'standard',
          question: 'Social responsibility of business refers to its obligation to take decisions.',
          hint: 'Revisit Class 11 Business Studies Chapter 1 "Nature and Purpose of Business".',
          misconception: 'Students equate "social responsibility" exclusively with "charity/philanthropy" (donating money, building schools).',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the statements: (A) "Social responsibility is broader than legal responsibility." (B) "All legal responsibilities are social.', answer: 'Both statements are true',
                  options: ['Both statements are true', 'legal responsibility is broader', 'they are separate circles'],
                  hint: 'Revisit Class 11 Business Studies Chapter 1 "Nature and Purpose of Business" — specifically the.',
                  misconception: 'Students equate "social responsibility" exclusively with "charity/philanthropy" (donating money, building schools).' }
          ],
            remediations: { 'students-equate-social-responsibility-exclusivel': { steps: ['Draw a 2x2 matrix on paper. Rows: "Required by Law?" (Yes/No). Columns: "Expected by Society?" (Yes/No).', 'Place these actions in cells: (a) Paying minimum wage, (b) Dumping toxic waste illegally, (c) Donating to PM CARES.', 'Label the quadrants: Legal Only, Legal+Ethical, Discretionary, Unethical/Illegal.', 'Explain that Social Responsibility = entire right column (Society expects it).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_06_002', difficulty: 'standard',
          question: 'Arguments for social responsibility are the logical justifications explaining.',
          hint: 'Revisit Node 001 (Social Responsibility: Concept and Meaning), specifically the.',
          misconception: 'Students often believe **"Arguments for social responsibility are just moral preaching—businesses only care about.',
          parts: [
                { id: 'a', prompt: 'State the argument for social responsibility that suggests businesses should voluntarily assume social responsibilities to prevent the government from imposing.', answer: '**Correct Answer:** Avoidance of government regulation (Argument iii)',
                  options: ['**Correct Answer:** Avoidance of government regulation (Argument iii)', 'Legal responsibility', 'Compliance with law'],
                  hint: 'Revisit Node 001 (Social Responsibility: Concept and Meaning), specifically the distinction: "Legal.',
                  misconception: 'Students often believe **"Arguments for social responsibility are just moral preaching—businesses only care about profit."** They treat the.' },
                { id: 'b', prompt: 'A textile company in Tirupur voluntarily sets up a zero-liquid-discharge water treatment plant costing ₹15 crore, though the law only requires primary.', answer: '**Correct Answer:** Avoidance of government regulation (Argument iii)',
                  options: ['**Correct Answer:** Avoidance of government regulation (Argument iii)', 'Long-term interest of the firm', 'Better environment for doing business'],
                  hint: 'Revisit Node 001 (Social Responsibility: Concept and Meaning), specifically the distinction: "Legal.',
                  misconception: 'Students often believe **"Arguments for social responsibility are just moral preaching—businesses only care about profit."** They treat the.' }
          ],
            remediations: { 'arguments-for-social-responsibility-are': { steps: ['** Ask the student to pick **one argument** they find weakest. **', '** Give a **specific Indian business example** (e.g., ITC\'s e-Choupal for Argument vi, Mahindra\'s water conservation.', '** Use the **"Mechanism Mapping" template**: - Argument Name → Business Resource/Action → Social Problem Addressed →.', '** Have them **re-write** their mini-case (Diagnostic Q6) using this template for all three arguments. **'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_06_003', difficulty: 'standard',
          question: 'Arguments against social responsibility are the rationales asserting that.',
          hint: 'Revisit c11_bs_cbse_06_001 for the definition of social responsibility and.',
          misconception: 'Students often treat the four arguments against social responsibility as "reasons why business *should not* be ethical".',
          parts: [
                { id: 'a', prompt: 'A chemical company installs expensive effluent treatment plants to reduce river pollution. It then increases product prices by 12% to recover the cost.', answer: 'This illustrates the \'Burden on consumers\' argument',
                  options: ['This illustrates the \'Burden on consumers\' argument', 'reasons why business *should not* be ethical', 'arguments made by critics *claiming* social responsibility is counterproductive', 'Businesses don\'t do CSR'],
                  hint: 'Revisit c11_bs_cbse_06_001 for the definition of social responsibility and c11_bs_cbse_06_002 for.',
                  misconception: 'Students often treat the four arguments against social responsibility as "reasons why business *should not* be ethical" rather than.' }
          ],
            remediations: { 'students-often-treat-the-four': { steps: ['Create a two-column table: Column A = "Argument Against SR (Critics\' Claim)", Column B = "Reality Force (Why Business.', 'Place each of the four arguments in Column A.', 'In Column B, match the NCERT \'Reality of Social Responsibility\' forces (e.g., \'Threat of public regulation\' counters.', 'Have the student explain aloud: "Critics say X, but in reality Y forces business to do Z." This separates the *debate*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_06_004', difficulty: 'standard',
          question: 'Social responsibility towards different interest groups refers to the specific.',
          hint: 'Revisit c11_bs_cbse_06_001 (Concept of Social Responsibility) and focus on the phrase.',
          misconception: 'Students commonly believe that "responsibility towards shareholders" means maximising short-term profits at all costs.',
          parts: [
                { id: 'a', prompt: 'A REMEMBER level question: List the four interest groups towards which a business enterprise has social responsibility according to NCERT Class 11 Business.', answer: 'The four interest groups are: (1) Shareholders/owners',
                  options: ['The four interest groups are: (1) Shareholders/owners', 'employees and workers', 'be ethical', 'A concrete wrong answer'],
                  hint: 'Revisit c11_bs_cbse_06_001 (Concept of Social Responsibility) and focus on the phrase "element.',
                  misconception: 'Students commonly believe that "responsibility towards shareholders" means maximising short-term profits at all costs, and that this.' },
                { id: 'b', prompt: 'An APPLY level question: A pharmaceutical company prices a life-saving drug at 500% above production cost, making it unaffordable for low-income patients.', answer: 'Upheld: Responsibility to shareholders (fair return, profit maximisation)',
                  options: ['Upheld: Responsibility to shareholders (fair return, profit maximisation)', 'A wrong answer that only identifies', 'A concrete wrong answer'],
                  hint: 'Revisit c11_bs_cbse_06_001 (Concept of Social Responsibility) and focus on the phrase "element.',
                  misconception: 'Students commonly believe that "responsibility towards shareholders" means maximising short-term profits at all costs, and that this.' }
          ],
            remediations: { 'students-commonly-believe-that-responsibility': { steps: ['If a student exhibits this misconception, do NOT simply re-read the section.', 'Instead: (1) Have them re-read Section 6.5(i) and 6.5(ii) side-by-side, highlighting "safety of investment" and "win.', 'social interest and business interest are not contradictory.', 'Instead, these are complementary." (4) Assign a 3-minute writing: "Explain in your own words how fair wages protect.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_06_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students commonly believe that "responsibility towards shareholders" means maximising short-term profits at all costs.',
          parts: [
                { id: 'a', prompt: 'An EVALUATE level question: "A business that focuses exclusively on shareholder returns while meeting minimum legal requirements for workers, consumers, and.', answer: 'The statement is false',
                  options: ['The statement is false', 'A concrete wrong answer'],
                  hint: 'Revisit c11_bs_cbse_06_001 (Concept of Social Responsibility) and focus on the phrase "element.',
                  misconception: 'Students commonly believe that "responsibility towards shareholders" means maximising short-term profits at all costs, and that this.' },
                { id: 'b', prompt: 'A CREATE level question: Design a "Social Responsibility Scorecard" for a mid-sized textile manufacturing company in Tamil Nadu.', answer: 'Sample scorecard: Shareholders',
                  options: ['Sample scorecard: Shareholders', 'A concrete wrong answer'],
                  hint: 'Revisit c11_bs_cbse_06_001 (Concept of Social Responsibility) and focus on the phrase "element.',
                  misconception: 'Students commonly believe that "responsibility towards shareholders" means maximising short-term profits at all costs, and that this.' }
          ],
            remediations: { 'students-commonly-believe-that-responsibility': { steps: ['If a student exhibits this misconception, do NOT simply re-read the section.', 'Instead: (1) Have them re-read Section 6.5(i) and 6.5(ii) side-by-side, highlighting "safety of investment" and "win.', 'social interest and business interest are not contradictory.', 'Instead, these are complementary." (4) Assign a 3-minute writing: "Explain in your own words how fair wages protect.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_06_005', difficulty: 'standard',
          question: 'Business ethics refers to the socially determined moral principles and.',
          hint: 'Revisit the "Concept of Social Responsibility" (c11_bs_cbse_06_001) and the comparison.',
          misconception: 'Students often think "Business Ethics = Corporate Social Responsibility (CSR)" or "Business Ethics = Obeying the Law.".',
          parts: [
                { id: 'a', prompt: 'Define business ethics in one sentence as per the NCERT Class 11 textbook, and state how it differs from legal responsibility.', answer: 'Business ethics refers to the socially determined moral principles',
                  options: ['Business ethics refers to the socially determined moral principles', 'voluntary', 'beyond compliance', 'Business Ethics = Corporate Social Responsibility (CSR)'],
                  hint: 'Revisit the "Concept of Social Responsibility" (c11_bs_cbse_06_001) and the comparison table.',
                  misconception: 'Students often think "Business Ethics = Corporate Social Responsibility (CSR)" or "Business Ethics = Obeying the Law." They conflate the.' },
                { id: 'b', prompt: 'A company follows all environmental laws but its factory emissions cause respiratory issues in the nearby village.', answer: 'The argument is flawed',
                  options: ['The argument is flawed', 'Business Ethics = Corporate Social Responsibility (CSR)', 'Business Ethics = Obeying the Law'],
                  hint: 'Revisit the "Concept of Social Responsibility" (c11_bs_cbse_06_001) and the comparison table.',
                  misconception: 'Students often think "Business Ethics = Corporate Social Responsibility (CSR)" or "Business Ethics = Obeying the Law." They conflate the.' }
          ],
            remediations: { 'business-ethics-corporate-social-responsibility': { steps: ['Draw a three-circle Venn diagram: "Legal Responsibility" (inner circle), "Ethical Responsibility" (middle circle.', 'Place "paying minimum wage" in Legal, "paying living wage voluntarily" in Ethical, "funding a village school".', 'Ask: "Which circle do the five elements (code, compliance, measurement) belong to?" They belong to Ethical – they are.', 'Have the student re-write the definition of business ethics using only the textbook\'s phrasing: "socially determined.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_06_006', difficulty: 'standard',
          question: 'Importance of Business Ethics in Modern Business refers to the critical role.',
          hint: 'Revisit node c11_bs_cbse_06_005 (Business Ethics: Concept and Elements) and create.',
          misconception: 'Students believe "Business Ethics = Corporate Social Responsibility (CSR) = Charity/Donations." They think an unethical.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Importance of Business Ethics in Modern Business refers to the critical role that morally',
                  options: ['Importance of Business Ethics in Modern Business refers to the critical role that morally', 'Social responsibility of business refers to its obligation to take decisions and perform', 'Arguments for social responsibility are the logical justifications explaining why', 'Arguments against social responsibility are the rationales asserting that business'],
                  hint: 'Revisit node c11_bs_cbse_06_005 (Business Ethics: Concept and Elements) and create a one-page mind.',
                  misconception: 'Students believe "Business Ethics = Corporate Social Responsibility (CSR) = Charity/Donations." They think an unethical company (e.g., tax.' }
          ],
            remediations: { 'business-ethics-corporate-social-responsibility': { steps: ['Ask the student to read Section 6.4 (Kinds of Social Responsibility) and highlight the distinction between (c) Ethical.', 'Give a concrete case: "Company X pays minimum wage but donates ₹1 cr to PM CARES.', 'Map the case to the textbook: Ethical responsibility = "fair treatment to workers" (6.7.1 example); Discretionary.', 'Have the student write one sentence defining the boundary: "Ethics governs *how* you make money; Philanthropy governs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
