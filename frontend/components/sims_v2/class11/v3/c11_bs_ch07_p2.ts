import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch07_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch07_p2: SimDef = {
    id: 'v3_c11_bs_ch07_p2',
    title: 'Formation of a Company · Part 2/2',
    subtitle: 'Before a company exists, someone builds its case — and signs in their own name.',
    classLevel: 11, subject: 'business_studies', topic: 'Formation of a Company · Part 2/2',
    chapters: ['c11_bs_ch07'],
    nodeIds: ['c11_bs_cbse_07_007', 'c11_bs_cbse_07_008', 'c11_bs_cbse_07_009', 'c11_bs_cbse_07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a company secretary guiding a first-time promoter', intro: 'Your client wants to skip to the registration desk. Every step before it — feasibility, name, signatories, documents — exists to prevent exactly the failure he\'s courting.', goal: 'Sequence the steps of company promotion and explain the promoter\'s legal position, including liability for pre-incorporation contracts.' },
    discovery: {
        question: 'Avtar invents a carburettor that cuts petrol use 40% and rushes to get his company name approved — skipping feasibility studies. The name is granted; the company collapses when the rare metal it needs turns out unimportable. Which skipped step sank him?',
        options: ['Technical feasibility — promoters must prove the idea can actually be built and resourced before any paperwork begins', 'Capital subscription — he filed before selling shares', 'Commencement certificate — he started business too early', 'Statutory declaration — a form was missing'],
        answer: 'Technical feasibility — promoters must prove the idea can actually be built and resourced before any paperwork begins',
        hook: 'Promotion is investigation first, paperwork second — the registrar\'s stamp can\'t rescue an idea that was never buildable.',
    },
    teaching: [
        { title: 'Capital Subscription: Prospectus and Minimum Subscription', text: 'Capital subscription is the third stage in the formation of a public company where it raises funds from the public by issuing securities (shares/debentures) through a prospectus, subject to SEBI.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk a company from idea to incorporation: run technical, financial, and economic feasibility, get the name approved, fix Memorandum signatories, appoint professionals — and explain why Avtar personally pays for contracts signed before the company legally exists.',
        labels: ['Capital Subscription: Prospectus', 'Commencement of Business: Certificate', 'Position of Promoters: Legal', 'Distinction between MoA'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_07_007', title: 'Capital Subscription: Prospectus and Minimum Subscription',
          caseStudy: { intro: 'Imagine you and your friends have incorporated a public company "GreenEnergy Ltd." to manufacture solar panels.',
            decisions: [{ prompt: 'What is the minimum subscription requirement for a public issue as per SEBI guidelines, and what happens if it is not achieved?', options: [
                { text: 'The minimum subscription is 90% of the issue size', outcome: 'The minimum subscription is 90% of the issue size. If applications are received for less than 90%.' },
                { text: 'minimum subscription achieved = automatic allotment', outcome: 'Not quite — Students often believe that "minimum subscription achieved = automatic allotment" and forget the.', reveals: 'minimum-subscription-achieved-automatic-allotmen' },
                { text: '50% or saying the company can proceed with allotment', outcome: 'Not quite — Students often believe that "minimum subscription achieved = automatic allotment" and forget the.', reveals: 'minimum-subscription-achieved-automatic-allotmen' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_07_008', title: 'Commencement of Business: Certificate of Commencement',
          caseStudy: { intro: 'Imagine Avtar\'s carburettor company from the chapter has just received its Certificate of Incorporation on January 15th.',
            decisions: [{ prompt: 'A public company was incorporated on March 1, 2024. By what date must it obtain the Certificate of Commencement of Business to comply with.', options: [
                { text: 'The deadline is August 28, 2024 (180 days from March 1)', outcome: 'The deadline is August 28, 2024 (180 days from March 1). A wrong answer (e.g., "within 1 year".' },
                { text: 'within 1 year', outcome: 'Not quite — Students believe the Certificate of Commencement of Business is only for public companies because.', reveals: 'the-certificate-of-commencement-of' },
                { text: 'no deadline', outcome: 'Not quite — Students believe the Certificate of Commencement of Business is only for public companies because.', reveals: 'the-certificate-of-commencement-of' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_07_009', title: 'Position of Promoters: Legal Relationship with the Company',
          caseStudy: { intro: 'Imagine you and two friends decide to start a company selling eco-friendly packaging.',
            decisions: [{ prompt: 'Define the term \'fiduciary position\' in the context of a promoter\'s relationship with the company they promote.', options: [
                { text: 'A fiduciary position means the promoter stands in a relationship of trust and confidence', outcome: 'A fiduciary position means the promoter stands in a relationship of trust and confidence with the.' },
                { text: 'promoter is an agent of the company', outcome: 'Not quite — Students believe that because promoters "create" the company, they automatically become its first.', reveals: 'because-promoters-create-the-company' },
                { text: 'create', outcome: 'Not quite — Students believe that because promoters "create" the company, they automatically become its first.', reveals: 'because-promoters-create-the-company' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_07_010', title: 'Distinction between MoA and AoA',
          caseStudy: { intro: 'Imagine you\'re drafting the constitution for a new cricket league.',
            decisions: [{ prompt: 'State the statutory definition of "Memorandum of Association" and "Articles of Association" as per the Companies Act 2013, citing the exact.', options: [
                { text: '**Correct Answer:** Section 2(56): "memorandum means the memorandum of association of a', outcome: '**Correct Answer:** Section 2(56): "memorandum means the memorandum of association of a company.' },
                { text: 'Section 2(5)', outcome: 'Not quite — **Misconception:** "Acts ultra vires the Articles of Association are also void and cannot.', reveals: 'misconception-acts-ultra-vires-the' },
                { text: '**What a wrong answer reveals:** If the student omits', outcome: 'Not quite — **Misconception:** "Acts ultra vires the Articles of Association are also void and cannot.', reveals: 'misconception-acts-ultra-vires-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Three seniors plan to register \'CampusKart Pvt Ltd\' to deliver stationery to hostels. Before incorporation, one of them signs a ₹60,000 contract with a supplier \'on behalf of the company\', and they hire a CA to draft the MoA for a fee. Later they argue: \'The CA is a promoter since he helped form it, and the supplier contract automatically binds the company once it\'s registered.\'',
            decisions: [{ prompt: 'What does company law actually say?', options: [
                { text: 'The CA is not a promoter — professionals acting in their professional capacity are excluded by Section 69. And the pre-incorporation contract binds the signing promoter personally; the company can\'t ratify it because it didn\'t legally exist when the contract was made — a fresh contract is needed after incorporation.', outcome: 'Promotion is a defined legal phase: promoters carry fiduciary duty and personal liability until the company is born; helpers-for-fee are not promoters.' },
                { text: 'Both claims hold — anyone who helps form a company is a promoter, and contracts made for it get ratified at incorporation.', outcome: 'Section 69 expressly excludes professionals acting for a fee, and ratification is impossible — you can\'t adopt a contract on behalf of an entity that didn\'t exist.', reveals: 'helpers-are-promoters' },
                { text: 'The senior who signed is personally liable forever AND the company also owes the supplier — double liability.', outcome: 'The promoter is personally liable, but the company isn\'t bound at all until it makes a new contract post-incorporation — liability isn\'t duplicated.', reveals: 'double-liability-on-precontracts' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_07_010', title: 'You made it',
          caseStudy: { intro: 'You now see promotion as a legal phase with a strict sequence — and the promoter as a fiduciary who gambles his own liability until incorporation.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_07_007', difficulty: 'standard',
          question: 'Capital subscription is the third stage in the formation of a public company.',
          hint: 'Revisit the "Incorporation of a Company" node (c11_bs_cbse_07_003) to confirm the legal.',
          misconception: 'Students often believe that "minimum subscription achieved = automatic allotment" and forget the stock exchange listing.',
          parts: [
                { id: 'a', prompt: 'What is the minimum subscription requirement for a public issue as per SEBI guidelines, and what happens if it is not achieved?', answer: 'The minimum subscription is 90% of the issue size',
                  options: ['The minimum subscription is 90% of the issue size', 'minimum subscription achieved = automatic allotment', '50% or saying the company can proceed with allotment'],
                  hint: 'Revisit the "Incorporation of a Company" node (c11_bs_cbse_07_003) to confirm the legal status.',
                  misconception: 'Students often believe that "minimum subscription achieved = automatic allotment" and forget the stock exchange listing condition.' },
                { id: 'b', prompt: 'A public company files a prospectus and receives applications for 85% of the issue size.', answer: 'The 90% minimum subscription rule is a statutory protection for investors',
                  options: ['The 90% minimum subscription rule is a statutory protection for investors', 'the company can allot proportionately', 'minimum subscription achieved = automatic allotment'],
                  hint: 'Revisit the "Incorporation of a Company" node (c11_bs_cbse_07_003) to confirm the legal status.',
                  misconception: 'Students often believe that "minimum subscription achieved = automatic allotment" and forget the stock exchange listing condition.' },
                { id: 'c', prompt: '"GreenTech Ltd." issues a prospectus for 10 lakh equity shares of ₹10 each at par. Applications are received for 9.2 lakh shares.', answer: 'Issue size = 10,00,000 shares × ₹10 = ₹1,00,00,000',
                  options: ['Issue size = 10,00,000 shares × ₹10 = ₹1,00,00,000', 'minimum subscription achieved = automatic allotment'],
                  hint: 'Revisit the "Incorporation of a Company" node (c11_bs_cbse_07_003) to confirm the legal status.',
                  misconception: 'Students often believe that "minimum subscription achieved = automatic allotment" and forget the stock exchange listing condition.' }
          ],
            remediations: { 'minimum-subscription-achieved-automatic-allotmen': { steps: ['If a student conflates minimum subscription with listing approval, draw a two-column table: "Condition" vs "Consequence.', 'Row 1: Minimum subscription < 90% → no allotment, full refund.', 'Row 2: Listing permission not obtained in 10 weeks → allotment void, full refund.', 'Emphasise that both are independent "gatekeepers".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "minimum subscription achieved = automatic allotment" and forget the stock exchange listing.',
          parts: [
                { id: 'a', prompt: 'A company receives applications for 95% of its issue size but fails to obtain stock exchange listing permission within 10 weeks of closure of the subscription.', answer: 'The argument is invalid',
                  options: ['The argument is invalid', 'minimum subscription achieved = automatic allotment'],
                  hint: 'Revisit the "Incorporation of a Company" node (c11_bs_cbse_07_003) to confirm the legal status.',
                  misconception: 'Students often believe that "minimum subscription achieved = automatic allotment" and forget the stock exchange listing condition.' },
                { id: 'b', prompt: 'Design a compliance checklist for the Board of Directors of a newly incorporated public company planning a ₹200 crore IPO.', answer: 'A good checklist includes: (1) SEBI approval under ICDR Regulations',
                  options: ['A good checklist includes: (1) SEBI approval under ICDR Regulations', 'minimum subscription achieved = automatic allotment'],
                  hint: 'Revisit the "Incorporation of a Company" node (c11_bs_cbse_07_003) to confirm the legal status.',
                  misconception: 'Students often believe that "minimum subscription achieved = automatic allotment" and forget the stock exchange listing condition.' }
          ],
            remediations: { 'minimum-subscription-achieved-automatic-allotmen': { steps: ['If a student conflates minimum subscription with listing approval, draw a two-column table: "Condition" vs "Consequence.', 'Row 1: Minimum subscription < 90% → no allotment, full refund.', 'Row 2: Listing permission not obtained in 10 weeks → allotment void, full refund.', 'Emphasise that both are independent "gatekeepers".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_07_008', difficulty: 'standard',
          question: 'The Certificate of Commencement of Business is a legal document issued by the.',
          hint: 'If stuck, revisit c11_bs_cbse_07_006 (Effect of Incorporation) for the legal personality.',
          misconception: 'Students believe the Certificate of Commencement of Business is only for public companies because the chapter focuses.',
          parts: [
                { id: 'a', prompt: 'A public company was incorporated on March 1, 2024. By what date must it obtain the Certificate of Commencement of Business to comply with the Companies Act.', answer: 'The deadline is August 28, 2024 (180 days from March 1)',
                  options: ['The deadline is August 28, 2024 (180 days from March 1)', 'within 1 year', 'no deadline'],
                  hint: 'If stuck, revisit c11_bs_cbse_07_006 (Effect of Incorporation) for the legal personality concept.',
                  misconception: 'Students believe the Certificate of Commencement of Business is only for public companies because the chapter focuses on public company.' },
                { id: 'b', prompt: 'Compare the legal position of a contract signed by a company: (a) after Certificate of Incorporation but before Certificate of Commencement, (b) after.', answer: 'after Certificate of Incorporation but before Certificate of Commencement, (',
                  options: ['after Certificate of Incorporation but before Certificate of Commencement, (', 'both are void', 'both are valid'],
                  hint: 'If stuck, revisit c11_bs_cbse_07_006 (Effect of Incorporation) for the legal personality concept.',
                  misconception: 'Students believe the Certificate of Commencement of Business is only for public companies because the chapter focuses on public company.' }
          ],
            remediations: { 'the-certificate-of-commencement-of': { steps: ['If a student answers "No, private companies don\'t need it," do NOT just say "read the textbook." Instead: (1) Ask them.', '(3) Assign a 2-mark question: "State any two conditions a private company must fulfill to obtain Certificate.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_07_009', difficulty: 'standard',
          question: 'A promoter occupies a fiduciary position with the company they promote, meaning.',
          hint: 'Revisit c11_bs_cbse_07_003 (Incorporation) and c11_bs_cbse_07_006 (Effect.',
          misconception: 'Students believe that because promoters "create" the company, they automatically become its first agents or directors.',
          parts: [
                { id: 'a', prompt: 'Explain why a promoter is neither an agent nor a trustee of the company they promote.', answer: 'A promoter is not an agent',
                  options: ['A promoter is not an agent', 'promoter is an agent', 'create'],
                  hint: 'Revisit c11_bs_cbse_07_003 (Incorporation) and c11_bs_cbse_07_006 (Effect of Incorporation).',
                  misconception: 'Students believe that because promoters "create" the company, they automatically become its first agents or directors, and that preliminary.' },
                { id: 'b', prompt: 'Compare and contrast preliminary contracts (pre-incorporation contracts) and provisional contracts (post-incorporation but pre-commencement contracts) in terms.', answer: 'Preliminary contracts are not binding on the company (no ratification possible),',
                  options: ['Preliminary contracts are not binding on the company (no ratification possible),', 'both are binding after incorporation', 'create'],
                  hint: 'Revisit c11_bs_cbse_07_003 (Incorporation) and c11_bs_cbse_07_006 (Effect of Incorporation).',
                  misconception: 'Students believe that because promoters "create" the company, they automatically become its first agents or directors, and that preliminary.' }
          ],
            remediations: { 'because-promoters-create-the-company': { steps: ['Ask the student to draw a timeline: "Promoter acts → Company incorporated → Company commences business."', 'At each stage, ask "Does the company exist? Can it have an agent? Can it ratify?"', 'Show that at the preliminary contract stage, the company is a legal nullity—no legal personality means no capacity.', 'Contrast with provisional contracts where the company exists but cannot yet commence business.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_07_010', difficulty: 'standard',
          question: 'The Memorandum of Association (MoA) is the supreme constitutional charter of.',
          hint: 'If stuck, revisit c11_bs_cbse_07_004 (MoA clauses - especially Objects Clause) and.',
          misconception: '**Misconception:** "Acts ultra vires the Articles of Association are also void and cannot be ratified, just like acts.',
          parts: [
                { id: 'a', prompt: 'A public company limited by shares adopts Table F of Schedule I as its Articles of Association without filing a separate AoA document. Is this legally valid?', answer: '**Correct Answer:** Yes, it is legally valid',
                  options: ['**Correct Answer:** Yes, it is legally valid', 'both can be adopted by reference', 'neither can be adopted by reference'],
                  hint: 'If stuck, revisit c11_bs_cbse_07_004 (MoA clauses - especially Objects Clause) and.',
                  misconception: '**Misconception:** "Acts ultra vires the Articles of Association are also void and cannot be ratified, just like acts ultra vires the.' }
          ],
            remediations: { 'misconception-acts-ultra-vires-the': { steps: ['**Targeted Remediation Steps:** 1.', '**Draw the "Three Circles" diagram:** Outer circle = Companies Act 2013.', 'Middle circle = MoA (objects, capacity).', 'Inner circle = AoA (internal rules).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
