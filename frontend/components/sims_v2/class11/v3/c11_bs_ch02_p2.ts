import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch02_p2: SimDef = {
    id: 'v3_c11_bs_ch02_p2',
    title: 'Forms of Business Organisation · Part 2/2',
    subtitle: 'One owner, one legal identity, all the profit — and all the risk.',
    classLevel: 11, subject: 'business_studies', topic: 'Forms of Business Organisation · Part 2/2',
    chapters: ['c11_bs_ch02'],
    nodeIds: ['c11_bs_cbse_02_007', 'c11_bs_cbse_02_008', 'c11_bs_cbse_02_009', 'c11_bs_cbse_02_010', 'c11_bs_cbse_02_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a business advisor counselling first-time entrepreneurs', intro: 'Three clients want the simplest possible launch. Your job: match their capital, risk appetite, and need for control to the right legal form.', goal: 'Identify features, merits, and limitations of sole proprietorship and judge when it suits a business.' },
    discovery: {
        question: 'Rahul\'s sole proprietorship grocery fails with ₹3 lakh of unpaid debt after all shop assets are sold. The bank moves to seize his personal car. Can it?',
        options: ['Yes — a sole proprietor has unlimited liability; business and owner are legally the same, so personal assets back every business debt', 'No — liability is limited to whatever was invested in the shop', 'Only if the court declares Rahul a fraud', 'Only half the car\'s value, under small-business protection rules'],
        answer: 'Yes — a sole proprietor has unlimited liability; business and owner are legally the same, so personal assets back every business debt',
        hook: 'The form\'s biggest merit and its biggest danger are the same fact — no legal wall exists between you and your business.',
    },
    teaching: [
        { title: 'Cooperative Society: Features and Types', text: 'A cooperative society is a voluntary association of persons who join together to protect their common economic interests through a democratically controlled enterprise, where membership is open.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Advise three would-be founders — a home baker, a kirana owner, a craft seller — on whether sole proprietorship fits, weighing total control and easy setup against unlimited liability and the business dying with its owner.',
        labels: ['Cooperative Society: Features', 'Joint Stock Company: Features', 'Types of Companies: Private,', 'Choice of Form', 'Distinction between Forms'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_02_007', title: 'Cooperative Society: Features and Types',
          caseStudy: { intro: 'Imagine you and your neighbours in a housing colony are tired of paying high maintenance charges to a private builder who ignores your complaints.',
            decisions: [{ prompt: 'State the principle that governs voting rights in a cooperative society and explain how it differs from voting in a joint stock company.', options: [
                { text: 'The principle is \'one member, one vote\' regardless of capital contribution', outcome: 'The principle is \'one member, one vote\' regardless of capital contribution.' },
                { text: 'voting based on capital contribution', outcome: 'Not quite — Students often believe "Cooperative Society = Consumer Cooperative Society" because they see.', reveals: 'cooperative-society-consumer-cooperative-society' },
                { text: 'Cooperative Society = Consumer Cooperative Society', outcome: 'Not quite — Students often believe "Cooperative Society = Consumer Cooperative Society" because they see.', reveals: 'cooperative-society-consumer-cooperative-society' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_02_009', title: 'Types of Companies: Private, Public and One Person Company',
          caseStudy: { intro: 'Imagine you and four friends want to start a tech startup in Bangalore.',
            decisions: [{ prompt: 'State the minimum and maximum number of members allowed in a Private Company and a Public Company as per the Companies Act, 2013.', options: [
                { text: 'Private Company: Minimum 2, Maximum 200 members (excluding present/past employees)', outcome: 'Private Company: Minimum 2, Maximum 200 members (excluding present/past employees).' },
                { text: 'Private Company with one member', outcome: 'Not quite — Students often think **One Person Company (OPC) is just a "Private Company with one member"** and.', reveals: 'one-person-company-opc-is' },
                { text: 'max 50 for private or min 2 for public', outcome: 'Not quite — Students often think **One Person Company (OPC) is just a "Private Company with one member"** and.', reveals: 'one-person-company-opc-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_02_010', title: 'Choice of Form of Business Organisation: Factors Affecting',
          caseStudy: { intro: 'Imagine Neha from the textbook case: she started as a sole proprietor selling painted pottery from home, but now wants to expand nationwide.',
            decisions: [{ prompt: 'List the seven factors that determine the choice of form of business organisation as per NCERT Class 11.', options: [
                { text: 'The seven factors are: (i) Cost and ease in setting up the organisation, (ii) Liability,', outcome: 'The seven factors are: (i) Cost and ease in setting up the organisation, (ii) Liability, (iii).' },
                { text: 'tax benefits', outcome: 'Not quite — Students believe there is a single "best" form of organisation for a given business type (e.g.', reveals: 'there-is-a-single-best' },
                { text: 'government subsidies', outcome: 'Not quite — Students believe there is a single "best" form of organisation for a given business type (e.g.', reveals: 'there-is-a-single-best' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_02_011', title: 'Distinction between Forms of Business Organisation: Comparison',
          caseStudy: { intro: 'Imagine Neha from the chapter opening: her pottery business has grown from a home-based sole proprietorship to three retail branches, and she now needs ₹50.',
            decisions: [{ prompt: 'List the five major forms of business organisation covered in the NCERT Class 11 chapter for which a comparative distinction is required.', options: [
                { text: 'The five forms are: (1) Sole Proprietorship, (2) Joint Hindu Family Business, (3)', outcome: 'The five forms are: (1) Sole Proprietorship, (2) Joint Hindu Family Business, (3) Partnership, (4).' },
                { text: 'Multinational Corporation', outcome: 'Not quite — Students often believe **"Partnership has limited liability because losses are shared among.', reveals: 'partnership-has-limited-liability-because' },
                { text: 'Partnership has limited liability', outcome: 'Not quite — Students often believe **"Partnership has limited liability because losses are shared among.', reveals: 'partnership-has-limited-liability-because' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your friend\'s home bakery — a sole proprietorship — took a ₹6 lakh loan for ovens but the business is failing; bakery assets are worth only ₹2 lakh. The friend says: \'Worst case, they take the ovens and the shop — my family\'s flat and savings are safe because the loan belongs to the firm, which has unlimited liability.\'',
            decisions: [{ prompt: 'Is the family\'s personal property really safe?', options: [
                { text: 'No — unlimited liability attaches to the proprietor, not the firm: since business and owner are one legal entity, creditors can claim her personal assets (flat, car, savings) for the ₹4 lakh shortfall. That\'s the real price of total control and easy formation.', outcome: 'The phrase \'unlimited liability of the proprietor\' means exactly that — personal wealth stands behind business debts.' },
                { text: 'Yes — \'unlimited liability of the firm\' means the firm\'s own assets absorb any debt, however large; personal property is untouchable.', outcome: 'There\'s no separate firm to absorb anything — law sees no distinction between the bakery and its owner, so the shortfall reaches her personal assets.', reveals: 'liability-belongs-to-firm' },
                { text: 'Partly — personal assets are at risk only if she signed a personal guarantee; otherwise the firm\'s name shields her.', outcome: 'No guarantee is needed: in sole proprietorship there is no legal shield at all, guarantee or not — owner and business are the same person.', reveals: 'guarantee-needed-for-personal-claim' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_02_011', title: 'You made it',
          caseStudy: { intro: 'You can now price the trade-off: every rupee of autonomy in a sole proprietorship is paid for in personal risk.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_007', difficulty: 'standard',
          question: 'A cooperative society is a voluntary association of persons who join together.',
          hint: 'Revisit the liability comparison table in c11_bs_cbse_02_001 (sole proprietorship) and.',
          misconception: 'Students often believe "Cooperative Society = Consumer Cooperative Society" because they see consumer stores (like.',
          parts: [
                { id: 'a', prompt: 'State the principle that governs voting rights in a cooperative society and explain how it differs from voting in a joint stock company.', answer: 'The principle is \'one member, one vote\' regardless of capital contribution',
                  options: ['The principle is \'one member, one vote\' regardless of capital contribution', 'voting based on capital contribution', 'Cooperative Society = Consumer Cooperative Society'],
                  hint: 'Revisit the liability comparison table in c11_bs_cbse_02_001 (sole proprietorship) and.',
                  misconception: 'Students often believe "Cooperative Society = Consumer Cooperative Society" because they see consumer stores (like Kendriya Bhandar) most.' },
                { id: 'b', prompt: 'A group of 50 small farmers in a village pool their land to cultivate jointly, share modern equipment, and sell the harvest collectively.', answer: 'This is a Farmer\'s Cooperative Society',
                  options: ['This is a Farmer\'s Cooperative Society', 'marketing cooperative', 'Cooperative Society = Consumer Cooperative Society'],
                  hint: 'Revisit the liability comparison table in c11_bs_cbse_02_001 (sole proprietorship) and.',
                  misconception: 'Students often believe "Cooperative Society = Consumer Cooperative Society" because they see consumer stores (like Kendriya Bhandar) most.' },
                { id: 'c', prompt: 'Rohan wants to start a cooperative society to provide low-interest loans to salaried employees in his city.', answer: 'Type: Credit Cooperative Society',
                  options: ['Type: Credit Cooperative Society', 'consumer cooperative', 'service motive', 'Cooperative Society = Consumer Cooperative Society'],
                  hint: 'Revisit the liability comparison table in c11_bs_cbse_02_001 (sole proprietorship) and.',
                  misconception: 'Students often believe "Cooperative Society = Consumer Cooperative Society" because they see consumer stores (like Kendriya Bhandar) most.' },
                { id: 'd', prompt: 'Compare and contrast a Producer\'s Cooperative Society and a Marketing Cooperative Society on the basis of: (a) member composition, (b) primary activity, (c).', answer: '| Basis | Producer\'s Cooperative | Marketing Cooperative |',
                  options: ['| Basis | Producer\'s Cooperative | Marketing Cooperative |', 'Cooperative Society = Consumer Cooperative Society'],
                  hint: 'Revisit the liability comparison table in c11_bs_cbse_02_001 (sole proprietorship) and.',
                  misconception: 'Students often believe "Cooperative Society = Consumer Cooperative Society" because they see consumer stores (like Kendriya Bhandar) most.' }
          ],
            remediations: { 'cooperative-society-consumer-cooperative-society': { steps: ['Ask the student to list the six types from memory.', 'For each type, have them complete this sentence: "The members are ________ who want to ________." (e.g., "The members.', 'Give them 5 mini-scenarios (one per type) and ask them to match scenario to type using the sentence frame.', 'Finally, ask them to explain why Amul is NOT a consumer cooperative — this forces them to articulate the member-purpose.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_008', difficulty: 'standard',
          question: 'A Joint Stock Company is an artificial legal person created by law, having.',
          hint: 'Revisit c11_bs_cbse_02_001 (Sole Proprietorship liability) and c11_bs_cbse_02_003.',
          misconception: 'Students believe "Limited Liability means shareholders lose ONLY their invested money and can never be asked to pay.',
          parts: [
                { id: 'a', prompt: 'Explain why the \'veil of incorporation\' (separate legal entity) is considered both a shield and a sword for shareholders, using the Salomon v. Salomon & Co.', answer: 'The veil acts as a shield',
                  options: ['The veil acts as a shield', 'shareholders are protected from everything'],
                  hint: 'Revisit c11_bs_cbse_02_001 (Sole Proprietorship liability) and c11_bs_cbse_02_003 (Partnership.',
                  misconception: 'Students believe "Limited Liability means shareholders lose ONLY their invested money and can never be asked to pay more." This is wrong.' },
                { id: 'b', prompt: 'Compare the \'transferability of shares\' feature in a Public Company vs. Private Company vs. Partnership.', answer: 'Public Company: Freely transferable on stock exchanges',
                  options: ['Public Company: Freely transferable on stock exchanges', 'private company shares cannot be transferred'],
                  hint: 'Revisit c11_bs_cbse_02_001 (Sole Proprietorship liability) and c11_bs_cbse_02_003 (Partnership.',
                  misconception: 'Students believe "Limited Liability means shareholders lose ONLY their invested money and can never be asked to pay more." This is wrong.' }
          ],
            remediations: { 'limited-liability-means-shareholders-lose': { steps: ['Ask the student to read the NCERT example on page 45 (Akshay, 2,000 shares, ₹7 paid, ₹3 unpaid).', 'Have them calculate liability for three cases: (a) fully paid shares, (b) partly paid shares, (c) shares with premium.', 'Show a 2020 CBSE question where a shareholder was held liable for unpaid calls after winding up.', 'Clarify: "Limited liability = limited to unpaid share capital, not limited to invested amount."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_009', difficulty: 'standard',
          question: 'A company is an artificial legal person created under the Companies Act, 2013.',
          hint: 'Revisit c11_bs_cbse_02_008, specifically the "Features" and "Merits" subsections.',
          misconception: 'Students often think **One Person Company (OPC) is just a "Private Company with one member"** and apply Private Company.',
          parts: [
                { id: 'a', prompt: 'Rohan wants to start a consulting firm as a One Person Company (OPC). He has no nominee.', answer: 'No, the friend is incorrect',
                  options: ['No, the friend is incorrect', 'Private Company with one member'],
                  hint: 'Revisit c11_bs_cbse_02_008, specifically the "Features" and "Merits" subsections.',
                  misconception: 'Students often think **One Person Company (OPC) is just a "Private Company with one member"** and apply Private Company rules (e.g.' }
          ],
            remediations: { 'one-person-company-opc-is': { steps: ['**Clarify the legal hierarchy:** Draw a three-branch tree on board: Companies Act 2013 → (a) Private Company, (b).', 'Emphasize they are **mutually exclusive categories** defined by Section 2(68), 2(71), 2(62) respectively.', '**Create a 3-column comparison table** with rows: Minimum Members, Maximum Members, Minimum Directors, Public.', 'Fill it together using the Act sections.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **One Person Company (OPC) is just a "Private Company with one member"** and apply Private Company.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "A Private Company is always better than a Public Company for a startup because it has fewer compliances." Provide a balanced judgment.', answer: 'The statement is **overgeneralized**',
                  options: ['The statement is **overgeneralized**', 'Private Company with one member'],
                  hint: 'Revisit c11_bs_cbse_02_008, specifically the "Features" and "Merits" subsections.',
                  misconception: 'Students often think **One Person Company (OPC) is just a "Private Company with one member"** and apply Private Company rules (e.g.' },
                { id: 'b', prompt: 'Create a realistic business scenario (2-3 sentences) where an entrepreneur would choose **One Person Company** over Sole Proprietorship and Private Company.', answer: '**Scenario:** "Priya, a freelance AI consultant, earns ₹50 lakh/year',
                  options: ['**Scenario:** "Priya, a freelance AI consultant, earns ₹50 lakh/year', 'Private Company with one member'],
                  hint: 'Revisit c11_bs_cbse_02_008, specifically the "Features" and "Merits" subsections.',
                  misconception: 'Students often think **One Person Company (OPC) is just a "Private Company with one member"** and apply Private Company rules (e.g.' }
          ],
            remediations: { 'one-person-company-opc-is': { steps: ['**Clarify the legal hierarchy:** Draw a three-branch tree on board: Companies Act 2013 → (a) Private Company, (b).', 'Emphasize they are **mutually exclusive categories** defined by Section 2(68), 2(71), 2(62) respectively.', '**Create a 3-column comparison table** with rows: Minimum Members, Maximum Members, Minimum Directors, Public.', 'Fill it together using the Act sections.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_010', difficulty: 'standard',
          question: 'The choice of form of business organisation is the systematic evaluation.',
          hint: 'If stuck, revisit the comparative Table 2.5 in NCERT and create a one-page summary matrix.',
          misconception: 'Students believe there is a single "best" form of organisation for a given business type (e.g., "manufacturing always.',
          parts: [
                { id: 'a', prompt: 'A partnership firm with 5 partners wants to expand operations requiring ₹50 lakh additional capital.', answer: 'They should convert to a private limited company',
                  options: ['They should convert to a private limited company', 'form of organisation for a given business type (e.g', 'there is a single "best" form of organisation for a given business type (e'],
                  hint: 'If stuck, revisit the comparative Table 2.5 in NCERT and create a one-page summary matrix with five.',
                  misconception: 'Students believe there is a single "best" form of organisation for a given business type (e.g., "manufacturing always needs a company").' }
          ],
            remediations: { 'there-is-a-single-best': { steps: ['Have the student re-read the NCERT opening case (Neha\'s pottery business) and identify which factors favour sole.', 'Create a timeline showing how factor weights shift at three stages: startup (₹2,500 profit), growth (3 city branches).', 'Practice "factor trade-off" questions: "If Neha values control over capital, what form?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_011', difficulty: 'standard',
          question: 'Distinction between Forms of Business Organisation refers to the systematic.',
          hint: 'Revisit the "Features" and "Limitations" subsections of nodes 001 (Sole Proprietorship).',
          misconception: 'Students often believe **"Partnership has limited liability because losses are shared among partners."** This is.',
          parts: [
                { id: 'a', prompt: 'Explain why "liability" is considered the most critical basis for distinguishing between forms of business organisation from an investor\'s perspective.', answer: 'Liability determines the maximum financial risk an owner bears',
                  options: ['Liability determines the maximum financial risk an owner bears', 'liability is about who manages the business', 'Partnership has limited liability', 'Private Company can invite public subscription'],
                  hint: 'Revisit the "Features" and "Limitations" subsections of nodes 001 (Sole Proprietorship), 003.',
                  misconception: 'Students often believe **"Partnership has limited liability because losses are shared among partners."** This is a fundamental confusion.' },
                { id: 'b', prompt: 'Rahul wants to start a business with his two friends. They have ₹10 lakh combined savings, want to avoid complex legal formalities, but insist that their.', answer: 'They should choose a **Private Limited Company**',
                  options: ['They should choose a **Private Limited Company**', 'personal assets at risk', 'Partnership has limited liability', 'Private Company can invite public subscription'],
                  hint: 'Revisit the "Features" and "Limitations" subsections of nodes 001 (Sole Proprietorship), 003.',
                  misconception: 'Students often believe **"Partnership has limited liability because losses are shared among partners."** This is a fundamental confusion.' },
                { id: 'c', prompt: 'Compare Partnership and Joint Stock Company on the bases of (a) Continuity of Existence and (b) Transferability of Ownership.', answer: 'Continuity of Existence and (',
                  options: ['Continuity of Existence and (', 'Private Company shares are freely transferable', 'Partnership has limited liability', 'Private Company can invite public subscription'],
                  hint: 'Revisit the "Features" and "Limitations" subsections of nodes 001 (Sole Proprietorship), 003.',
                  misconception: 'Students often believe **"Partnership has limited liability because losses are shared among partners."** This is a fundamental confusion.' }
          ],
            remediations: { 'partnership-has-limited-liability-because': { steps: ['**For Liability Misconception**: Draw a two-column table: "Internal Loss Sharing" (Partner A 60%, Partner B 40%).', 'Use a numerical example: Firm debt ₹10 lakh, assets ₹2 lakh.', 'Creditor demands ₹8 lakh from Partner A (rich).', 'A pays ₹8 lakh, then sues B for ₹3.2 lakh (40%).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
