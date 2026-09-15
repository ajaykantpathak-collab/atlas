import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch02_p1: SimDef = {
    id: 'v3_c11_bs_ch02_p1',
    title: 'Forms of Business Organisation · Part 1/2',
    subtitle: 'One owner, one legal identity, all the profit — and all the risk.',
    classLevel: 11, subject: 'business_studies', topic: 'Forms of Business Organisation · Part 1/2',
    chapters: ['c11_bs_ch02'],
    nodeIds: ['c11_bs_cbse_02_001', 'c11_bs_cbse_02_002', 'c11_bs_cbse_02_003', 'c11_bs_cbse_02_004', 'c11_bs_cbse_02_005', 'c11_bs_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a business advisor counselling first-time entrepreneurs', intro: 'Three clients want the simplest possible launch. Your job: match their capital, risk appetite, and need for control to the right legal form.', goal: 'Identify features, merits, and limitations of sole proprietorship and judge when it suits a business.' },
    discovery: {
        question: 'Rahul\'s sole proprietorship grocery fails with ₹3 lakh of unpaid debt after all shop assets are sold. The bank moves to seize his personal car. Can it?',
        options: ['Yes — a sole proprietor has unlimited liability; business and owner are legally the same, so personal assets back every business debt', 'No — liability is limited to whatever was invested in the shop', 'Only if the court declares Rahul a fraud', 'Only half the car\'s value, under small-business protection rules'],
        answer: 'Yes — a sole proprietor has unlimited liability; business and owner are legally the same, so personal assets back every business debt',
        hook: 'The form\'s biggest merit and its biggest danger are the same fact — no legal wall exists between you and your business.',
    },
    teaching: [
        { title: 'Sole Proprietorship: Features and Limitations', text: 'Sole proprietorship is a form of business organisation in which a single individual owns, manages, controls, and bears all risks of the enterprise while exclusively receiving all profits, with.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Advise three would-be founders — a home baker, a kirana owner, a craft seller — on whether sole proprietorship fits, weighing total control and easy setup against unlimited liability and the business dying with its owner.',
        labels: ['Sole Proprietorship: Features', 'Joint Hindu Family Business', 'Partnership: Meaning, Features', 'Types of Partners: Active,', 'Partnership Deed: Contents', 'Registration of Partnership Firm'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_02_001', title: 'Sole Proprietorship: Features and Limitations',
          caseStudy: { intro: 'Imagine you want to start a home-based bakery selling custom cakes — you have ₹50,000 savings, baking skills, and want full control over recipes and pricing.',
            decisions: [{ prompt: 'State the legal status of a sole proprietorship firm and its owner in the eyes of law.', options: [
                { text: 'In the eyes of law, a sole proprietorship firm and its owner are one and the same', outcome: 'In the eyes of law, a sole proprietorship firm and its owner are one and the same — there is.' },
                { text: 'the firm is a separate legal entity', outcome: 'Not quite — Students believe "unlimited liability" means the business has unlimited debts.', reveals: 'unlimited-liability-means-the-business' },
                { text: 'unlimited liability', outcome: 'Not quite — Students believe "unlimited liability" means the business has unlimited debts.', reveals: 'unlimited-liability-means-the-business' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_02_002', title: 'Joint Hindu Family Business: Features and Karta\'s Position',
          caseStudy: { intro: 'Imagine your grandfather started a textile business in Surat using ancestral property.',
            decisions: [{ prompt: 'State the legal statute governing Joint Hindu Family Business and the maximum number of generations that can hold coparcenary rights.', options: [
                { text: 'The Joint Hindu Family Business is governed by the Hindu Succession Act, 1956 (as amended', outcome: 'The Joint Hindu Family Business is governed by the Hindu Succession Act, 1956 (as amended in 2005).' },
                { text: 'Karta is like a Managing Partner in a Partnership firm', outcome: 'Not quite — Students often believe that "Karta is like a Managing Partner in a Partnership firm" because both.', reveals: 'karta-is-like-a-managing' },
                { text: '"Karta is like a Managing Partner in a Partnership firm"', outcome: 'Not quite — Students often believe that "Karta is like a Managing Partner in a Partnership firm" because both.', reveals: 'karta-is-like-a-managing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_02_003', title: 'Partnership: Meaning, Features and Types',
          caseStudy: { intro: 'Imagine two friends, Priya and Rohan, want to start a bakery together.',
            decisions: [{ prompt: 'State the legal definition of partnership as per Section 4 of the Indian Partnership Act, 1932.', options: [
                { text: 'Partnership is the relation between persons who have agreed to share the profits of a', outcome: 'Partnership is the relation between persons who have agreed to share the profits of a business.' },
                { text: 'an agreement to share losses', outcome: 'Not quite — Students often believe "registration creates a partnership." They think an unregistered firm is not.', reveals: 'registration-creates-a-partnership' },
                { text: 'a registered firm', outcome: 'Not quite — Students often believe "registration creates a partnership." They think an unregistered firm is not.', reveals: 'registration-creates-a-partnership' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_02_004', title: 'Types of Partners: Active, Sleeping, Secret and Nominal Partners',
          caseStudy: { intro: 'Imagine your cousin Ravi wants to start a café. He has ₹10 lakh savings but no time to manage it. His friend Priya has hospitality experience but only ₹2 lakh.',
            decisions: [{ prompt: 'Name the four criteria used in Table 2.1 of NCERT to classify the six types of partners, and state the liability status common to all six.', options: [
                { text: 'The four criteria are: (1) Capital contribution, (2) Participation in management, (3)', outcome: 'The four criteria are: (1) Capital contribution, (2) Participation in management, (3) Share.' },
                { text: 'don\'t really participate', outcome: 'Not quite — Students believe Nominal Partners and Partners by Holding Out have LIMITED liability because they.', reveals: 'nominal-partners-and-partners-by' },
                { text: 'didn\'t sign anything', outcome: 'Not quite — Students believe Nominal Partners and Partners by Holding Out have LIMITED liability because they.', reveals: 'nominal-partners-and-partners-by' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_02_005', title: 'Partnership Deed: Contents and Importance',
          caseStudy: { intro: 'Imagine you and two friends decide to start a cloud kitchen in Bengaluru with ₹15 lakh pooled capital.',
            decisions: [{ prompt: 'What is the minimum number of clauses a Partnership Deed must contain to be legally valid under the Indian Partnership Act, 1932?', options: [
                { text: 'There is no statutory minimum number of clauses', outcome: 'There is no statutory minimum number of clauses; a partnership can be formed orally or by conduct.' },
                { text: '12 clauses are mandatory', outcome: 'Not quite — Students believe a Partnership Deed is merely a "formality" or "list of rules" and that the Indian.', reveals: 'a-partnership-deed-is-merely' },
                { text: 'formality', outcome: 'Not quite — Students believe a Partnership Deed is merely a "formality" or "list of rules" and that the Indian.', reveals: 'a-partnership-deed-is-merely' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_02_006', title: 'Registration of Partnership Firm: Procedure and Effects of Non-Registration',
          caseStudy: { intro: 'Imagine two friends, Rohan and Priya, start a graphic design partnership firm "Creative Minds" in Delhi.',
            decisions: [{ prompt: 'What is the legal consequence if a partner of an unregistered firm tries to file a suit against the firm for dissolution of partnership?', options: [
                { text: 'The partner cannot file the suit', outcome: 'The partner cannot file the suit. Under Section 69(1) of the Indian Partnership Act, 1932,.' },
                { text: 'the suit can be filed but may be dismissed later', outcome: 'Not quite — Students believe that "optional registration" means registration is unimportant or merely.', reveals: 'optional-registration-means-registration-is' },
                { text: 'optional registration', outcome: 'Not quite — Students believe that "optional registration" means registration is unimportant or merely.', reveals: 'optional-registration-means-registration-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your friend\'s home bakery — a sole proprietorship — took a ₹6 lakh loan for ovens but the business is failing; bakery assets are worth only ₹2 lakh. The friend says: \'Worst case, they take the ovens and the shop — my family\'s flat and savings are safe because the loan belongs to the firm, which has unlimited liability.\'',
            decisions: [{ prompt: 'Is the family\'s personal property really safe?', options: [
                { text: 'No — unlimited liability attaches to the proprietor, not the firm: since business and owner are one legal entity, creditors can claim her personal assets (flat, car, savings) for the ₹4 lakh shortfall. That\'s the real price of total control and easy formation.', outcome: 'The phrase \'unlimited liability of the proprietor\' means exactly that — personal wealth stands behind business debts.' },
                { text: 'Yes — \'unlimited liability of the firm\' means the firm\'s own assets absorb any debt, however large; personal property is untouchable.', outcome: 'There\'s no separate firm to absorb anything — law sees no distinction between the bakery and its owner, so the shortfall reaches her personal assets.', reveals: 'liability-belongs-to-firm' },
                { text: 'Partly — personal assets are at risk only if she signed a personal guarantee; otherwise the firm\'s name shields her.', outcome: 'No guarantee is needed: in sole proprietorship there is no legal shield at all, guarantee or not — owner and business are the same person.', reveals: 'guarantee-needed-for-personal-claim' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now price the trade-off: every rupee of autonomy in a sole proprietorship is paid for in personal risk.',
            decisions: [{ prompt: 'What comes next? Forms of Business Organisation · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Forms of Business Organisation · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_001', difficulty: 'standard',
          question: 'Sole proprietorship is a form of business organisation in which a single.',
          hint: 'Revisit c8_eco_ch1_6 (Entrepreneurship: Organising Factors of Production) — focus on the.',
          misconception: 'Students believe "unlimited liability" means the business has unlimited debts.',
          parts: [
                { id: 'a', prompt: 'Rahul runs a sole proprietorship grocery store. He takes a loan of ₹5 lakh for expansion but the business fails. The business assets are worth ₹2 lakh.', answer: 'Yes, Rahul\'s personal car can be seized',
                  options: ['Yes, Rahul\'s personal car can be seized', 'No, only business assets can be taken', 'unlimited liability', '"unlimited liability" means the business has unlimited debts'],
                  hint: 'Revisit c8_eco_ch1_6 (Entrepreneurship: Organising Factors of Production) — focus on the.',
                  misconception: 'Students believe "unlimited liability" means the business has unlimited debts.' },
                { id: 'b', prompt: 'Priya wants to start a freelance graphic design business from home with ₹20,000 capital.', answer: 'Sole proprietorship is suitable',
                  options: ['Sole proprietorship is suitable', 'unlimited liability', '"unlimited liability" means the business has unlimited debts'],
                  hint: 'Revisit c8_eco_ch1_6 (Entrepreneurship: Organising Factors of Production) — focus on the.',
                  misconception: 'Students believe "unlimited liability" means the business has unlimited debts.' },
                { id: 'c', prompt: 'Compare the "control" feature of sole proprietorship with that of a partnership firm. How does the difference affect decision-making speed and quality in each?', answer: 'In sole proprietorship, control is absolute',
                  options: ['In sole proprietorship, control is absolute', 'unlimited liability', '"unlimited liability" means the business has unlimited debts'],
                  hint: 'Revisit c8_eco_ch1_6 (Entrepreneurship: Organising Factors of Production) — focus on the.',
                  misconception: 'Students believe "unlimited liability" means the business has unlimited debts.' }
          ],
            remediations: { 'unlimited-liability-means-the-business': { steps: ['Ask the student to read the NCERT line: "the owner is personally responsible for payment of debts...', 'Have them underline "owner" and "personal possessions" — emphasise the subject is the *person*, not the firm.', 'Give a mini-case: "Mohan\'s sole proprietorship owes ₹10 lakh; business assets = ₹4 lakh.', 'Make them answer in one sentence using the phrase "unlimited liability of the proprietor." Repeat until phrasing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_002', difficulty: 'standard',
          question: 'Joint Hindu Family Business is a distinct form of business organisation unique.',
          hint: 'Revisit c11_bs_cbse_02_001 "Sole Proprietorship: Features and Limitations" - specifically.',
          misconception: 'Students often believe that "Karta is like a Managing Partner in a Partnership firm" because both manage the business.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Joint Hindu Family Business is a distinct form of business organisation unique to India,',
                  options: ['Joint Hindu Family Business is a distinct form of business organisation unique to India,', 'Sole proprietorship is a form of business organisation in', 'Partnership is a form of business organisation defined under the Indian Partnership Act,', 'A partnership firm may have partners with varying degrees of participation, capital'],
                  hint: 'Revisit c11_bs_cbse_02_001 "Sole Proprietorship: Features and Limitations" - specifically the.',
                  misconception: 'Students often believe that "Karta is like a Managing Partner in a Partnership firm" because both manage the business.' }
          ],
            remediations: { 'karta-is-like-a-managing': { steps: ['Ask them to list 3 ways Karta becomes Karta (birth, seniority, no agreement) vs Managing Partner (agreement, consent.', 'Show a case where Karta takes a loan for family marriage (personal purpose) - firm is bound because Karta\'s implied.', 'Contrast removal: Karta continues until death/partition; Managing Partner can be ousted by majority.', 'Have them write a table: "Karta vs Managing Partner" on 5 parameters: Source of authority, Liability, Removal.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_003', difficulty: 'standard',
          question: 'Partnership is a form of business organisation defined under the Indian.',
          hint: 'Revisit c11_bs_cbse_02_001 (Sole Proprietorship) — specifically the "Limited resources".',
          misconception: 'Students often believe "registration creates a partnership." They think an unregistered firm is not a partnership.',
          parts: [
                { id: 'a', prompt: 'Two classmates, Aisha and Vikram, agree to buy and sell used textbooks online. They split profits equally but have no written agreement.', answer: 'Yes, Aisha is liable for the full debt',
                  options: ['Yes, Aisha is liable for the full debt', 'Aisha isn\'t liable', 'registration creates a partnership', 'legal existence'],
                  hint: 'Revisit c11_bs_cbse_02_001 (Sole Proprietorship) — specifically the "Limited resources" and.',
                  misconception: 'Students often believe "registration creates a partnership." They think an unregistered firm is not a partnership.' },
                { id: 'b', prompt: 'A partnership firm has three partners: Meena (active), Karim (sleeping), and Leila (nominal). The firm takes a loan of ₹10 lakh from a bank. The firm defaults.', answer: 'The bank can demand the full ₹6 lakh from Leila alone',
                  options: ['The bank can demand the full ₹6 lakh from Leila alone', 'Leila pays only her profit-sharing ratio', 'Leila pays nothing', 'registration creates a partnership'],
                  hint: 'Revisit c11_bs_cbse_02_001 (Sole Proprietorship) — specifically the "Limited resources" and.',
                  misconception: 'Students often believe "registration creates a partnership." They think an unregistered firm is not a partnership.' },
                { id: 'c', prompt: 'Compare "Partnership at Will" and "Particular Partnership" on the basis of: (a) duration, (b) mode of dissolution, (c) suitability for a construction project.', answer: '| Basis | Partnership at Will | Particular Partnership |',
                  options: ['| Basis | Partnership at Will | Particular Partnership |', 'particular partnership ends only by notice', 'which type for a 2-year software project?', 'particular partnership'],
                  hint: 'Revisit c11_bs_cbse_02_001 (Sole Proprietorship) — specifically the "Limited resources" and.',
                  misconception: 'Students often believe "registration creates a partnership." They think an unregistered firm is not a partnership.' }
          ],
            remediations: { 'registration-creates-a-partnership': { steps: ['Show the exact Section 4 definition — highlight "relation between persons... agreed to share profits."', 'Contrast "formation" (agreement) vs. "registration" (entry in Register of Firms).', 'Use a concrete example: "Ravi and Sita start a café with a handshake deal. They are partners from Day 1.', 'Assign a 2-minute write: "List 3 disabilities of an unregistered firm." This separates the concept from the procedural.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "registration creates a partnership." They think an unregistered firm is not a partnership.',
          parts: [
                { id: 'a', prompt: '"Limited Partnership is superior to General Partnership because it protects all partners with limited liability." Evaluate this statement.', answer: 'The statement is false',
                  options: ['The statement is false', 'limited partnership protects everyone', 'limited', 'registration creates a partnership'],
                  hint: 'Revisit c11_bs_cbse_02_001 (Sole Proprietorship) — specifically the "Limited resources" and.',
                  misconception: 'Students often believe "registration creates a partnership." They think an unregistered firm is not a partnership.' }
          ],
            remediations: { 'registration-creates-a-partnership': { steps: ['Show the exact Section 4 definition — highlight "relation between persons... agreed to share profits."', 'Contrast "formation" (agreement) vs. "registration" (entry in Register of Firms).', 'Use a concrete example: "Ravi and Sita start a café with a handshake deal. They are partners from Day 1.', 'Assign a 2-minute write: "List 3 disabilities of an unregistered firm." This separates the concept from the procedural.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_004', difficulty: 'standard',
          question: 'A partnership firm may have partners with varying degrees of participation.',
          hint: 'Revisit c11_bs_cbse_02_003 section on \'Liability of Partners\' — specifically the phrases.',
          misconception: 'Students believe Nominal Partners and Partners by Holding Out have LIMITED liability because they "don\'t really.',
          parts: [
                { id: 'a', prompt: 'Scenario: Arjun invests ₹5 lakh in a garment export firm but never visits the office or attends meetings. He receives quarterly profit statements.', answer: 'Step 1: Identify Arjun\'s partner type',
                  options: ['Step 1: Identify Arjun\'s partner type', 'not liable because didn\'t sign', 'don\'t really participate', 'didn\'t sign anything'],
                  hint: 'Revisit c11_bs_cbse_02_003 section on \'Liability of Partners\' — specifically the phrases \'jointly.',
                  misconception: 'Students believe Nominal Partners and Partners by Holding Out have LIMITED liability because they "don\'t really participate" or "didn\'t.' },
                { id: 'b', prompt: 'Compare Partner by Estoppel and Partner by Holding Out. Construct a scenario where the SAME person could be classified as EITHER depending on a single.', answer: 'Partner by Estoppel: Person\'s OWN conduct (words/actions) creates impression of',
                  options: ['Partner by Estoppel: Person\'s OWN conduct (words/actions) creates impression of', 'don\'t really participate', 'didn\'t sign anything'],
                  hint: 'Revisit c11_bs_cbse_02_003 section on \'Liability of Partners\' — specifically the phrases \'jointly.',
                  misconception: 'Students believe Nominal Partners and Partners by Holding Out have LIMITED liability because they "don\'t really participate" or "didn\'t.' }
          ],
            remediations: { 'nominal-partners-and-partners-by': { steps: ['Draw a 4-column table on paper: Partner Type | Capital | Management | Profit/Loss | Liability to Third Parties.', 'Fill Active Partner row from memory.', 'For each remaining type, ask: "Does this person give money? Do they work? Do they get profit?', 'Realise the last column is IDENTICAL for all six: "Unlimited, joint and several."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_005', difficulty: 'standard',
          question: 'A Partnership Deed is a written legal document that specifies the terms and.',
          hint: 'Revisit Section 13 of the Indian Partnership Act, 1932 (default provisions) and map each.',
          misconception: 'Students believe a Partnership Deed is merely a "formality" or "list of rules" and that the Indian Partnership Act.',
          parts: [
                { id: 'a', prompt: 'What is the minimum number of clauses a Partnership Deed must contain to be legally valid under the Indian Partnership Act, 1932?', answer: 'There is no statutory minimum number of clauses',
                  options: ['There is no statutory minimum number of clauses', '12 clauses are mandatory', 'formality', 'list of rules'],
                  hint: 'Revisit Section 13 of the Indian Partnership Act, 1932 (default provisions) and map each default.',
                  misconception: 'Students believe a Partnership Deed is merely a "formality" or "list of rules" and that the Indian Partnership Act, 1932 applies only when.' },
                { id: 'b', prompt: 'Two partners, A and B, start a firm without a written deed. A contributes ₹10 lakh capital; B contributes ₹2 lakh but works full-time.', answer: 'B is legally correct',
                  options: ['B is legally correct', 'formality', 'list of rules', 'optional registration'],
                  hint: 'Revisit Section 13 of the Indian Partnership Act, 1932 (default provisions) and map each default.',
                  misconception: 'Students believe a Partnership Deed is merely a "formality" or "list of rules" and that the Indian Partnership Act, 1932 applies only when.' }
          ],
            remediations: { 'a-partnership-deed-is-merely': { steps: ['Show the student Section 13 of the Indian Partnership Act, 1932 (default rules: equal profits, no interest.', 'Create a 3-partner scenario where defaults hurt all partners (e.g., unequal capital/effort, partner advances ₹5 lakh.', 'Ask: "Which default rule would you change?"', 'Map each desired change to a specific deed clause.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_02_006', difficulty: 'standard',
          question: 'Registration of a partnership firm is the process of entering the firm\'s name.',
          hint: 'If stuck, revisit c11_bs_cbse_02_005 (Partnership Deed) to review the deed\'s contents.',
          misconception: 'Students believe that "optional registration" means registration is unimportant or merely procedural.',
          parts: [
                { id: 'a', prompt: 'What is the legal consequence if a partner of an unregistered firm tries to file a suit against the firm for dissolution of partnership?', answer: 'The partner cannot file the suit',
                  options: ['The partner cannot file the suit', 'the suit can be filed but may be dismissed later', 'optional registration', '"optional registration" means registration is unimportant or merely procedural'],
                  hint: 'If stuck, revisit c11_bs_cbse_02_005 (Partnership Deed) to review the deed\'s contents - these.',
                  misconception: 'Students believe that "optional registration" means registration is unimportant or merely procedural.' },
                { id: 'b', prompt: 'A partnership firm "A&B Associates" is unregistered. A third party, Mr. Sharma, supplies goods worth ₹5,00,000 to the firm but the firm fails to pay.', answer: 'No, the firm cannot file a suit against Mr',
                  options: ['No, the firm cannot file a suit against Mr', 'yes, because Mr', '"optional registration" means registration is unimportant or merely procedural'],
                  hint: 'If stuck, revisit c11_bs_cbse_02_005 (Partnership Deed) to review the deed\'s contents - these.',
                  misconception: 'Students believe that "optional registration" means registration is unimportant or merely procedural.' },
                { id: 'c', prompt: '"Greenfield Partners" applies for registration. The application is signed by only 3 of the 5 partners. The Registrar registers the firm.', answer: 'The registration is invalid',
                  options: ['The registration is invalid', 'registration is valid but defective', 'optional registration', '"optional registration" means registration is unimportant or merely procedural'],
                  hint: 'If stuck, revisit c11_bs_cbse_02_005 (Partnership Deed) to review the deed\'s contents - these.',
                  misconception: 'Students believe that "optional registration" means registration is unimportant or merely procedural.' }
          ],
            remediations: { 'optional-registration-means-registration-is': { steps: ['If the student exhibits this misconception: (1) Draw a two-column table: "Who CAN sue whom" vs "Who CANNOT sue whom".', '(2) Populate with the three Section 69 bars: Partner→Firm (No), Firm→Third Party (No), Firm→Partner (No).', '(3) Add the reverse: Third Party→Firm (YES), Partner→Third Party (YES - in personal capacity).', '(4) Ask: "If a client owes ₹10 lakh to your unregistered firm, can you recover it legally?" This concrete asymmetry.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
