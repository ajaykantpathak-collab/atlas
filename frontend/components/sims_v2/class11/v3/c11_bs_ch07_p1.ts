import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch07_p1: SimDef = {
    id: 'v3_c11_bs_ch07_p1',
    title: 'Formation of a Company · Part 1/2',
    subtitle: 'Before a company exists, someone builds its case — and signs in their own name.',
    classLevel: 11, subject: 'business_studies', topic: 'Formation of a Company · Part 1/2',
    chapters: ['c11_bs_ch07'],
    nodeIds: ['c11_bs_cbse_07_001', 'c11_bs_cbse_07_002', 'c11_bs_cbse_07_003', 'c11_bs_cbse_07_004', 'c11_bs_cbse_07_005', 'c11_bs_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a company secretary guiding a first-time promoter', intro: 'Your client wants to skip to the registration desk. Every step before it — feasibility, name, signatories, documents — exists to prevent exactly the failure he\'s courting.', goal: 'Sequence the steps of company promotion and explain the promoter\'s legal position, including liability for pre-incorporation contracts.' },
    discovery: {
        question: 'Avtar invents a carburettor that cuts petrol use 40% and rushes to get his company name approved — skipping feasibility studies. The name is granted; the company collapses when the rare metal it needs turns out unimportable. Which skipped step sank him?',
        options: ['Technical feasibility — promoters must prove the idea can actually be built and resourced before any paperwork begins', 'Capital subscription — he filed before selling shares', 'Commencement certificate — he started business too early', 'Statutory declaration — a form was missing'],
        answer: 'Technical feasibility — promoters must prove the idea can actually be built and resourced before any paperwork begins',
        hook: 'Promotion is investigation first, paperwork second — the registrar\'s stamp can\'t rescue an idea that was never buildable.',
    },
    teaching: [
        { title: 'Promotion of a Company: Meaning and Stages', text: 'Promotion of a company is the first stage in company formation where a person or group conceives a business opportunity, analyses its technical, financial, and economic feasibility, assembles.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk a company from idea to incorporation: run technical, financial, and economic feasibility, get the name approved, fix Memorandum signatories, appoint professionals — and explain why Avtar personally pays for contracts signed before the company legally exists.',
        labels: ['Promotion of a Company', 'Promoters: Functions, Position', 'Incorporation of a Company', 'Documents for Incorporation: Memorandum', 'Documents for Incorporation: Articles', 'Effect of Incorporation: Certificate'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_07_001', title: 'Promotion of a Company: Meaning and Stages',
          caseStudy: { intro: 'Imagine Avtar, the automobile engineer from your textbook, who invented a carburettor reducing petrol consumption by 40%.',
            decisions: [{ prompt: 'Define "promotion of a company" as per the Companies Act, 2013 framework. State the exact stage it occupies in the formation process.', options: [
                { text: 'Promotion is the first stage of company formation involving conceiving a business', outcome: 'Promotion is the first stage of company formation involving conceiving a business opportunity.' },
                { text: 'promotion means advertising the company', outcome: 'Not quite — Students conflate "promoter" with "entrepreneur" or "founder-director." They assume: (1) The person.', reveals: 'students-conflate-promoter-with-entrepreneur' },
                { text: 'promotion starts after incorporation', outcome: 'Not quite — Students conflate "promoter" with "entrepreneur" or "founder-director." They assume: (1) The person.', reveals: 'students-conflate-promoter-with-entrepreneur' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_07_002', title: 'Promoters: Functions, Position and Types',
          caseStudy: { intro: 'Imagine you have a brilliant idea for a startup – say, a mobile app that connects local farmers directly with consumers.',
            decisions: [{ prompt: 'According to Section 69 of the Companies Act, 2013, which of the following persons is NOT considered a promoter?', options: [
                { text: 'Correct answer: (c) A lawyer acting in professional capacity', outcome: 'Correct answer: (c) A lawyer acting in professional capacity. The Act explicitly excludes.' },
                { text: 'preliminary contracts', outcome: 'Not quite — Students often think that a promoter becomes a director automatically after incorporation, or that.', reveals: 'a-promoter-becomes-a-director' },
                { text: 'provisional contracts', outcome: 'Not quite — Students often think that a promoter becomes a director automatically after incorporation, or that.', reveals: 'a-promoter-becomes-a-director' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_07_003', title: 'Incorporation of a Company: Procedure and Documents Required',
          caseStudy: { intro: 'Imagine Avtar from our textbook has completed promotion—he has his carburettor design, feasibility studies done, name "EcoMile Carburetors Ltd." approved, and.',
            decisions: [{ prompt: 'List the eight documents that must accompany the application for incorporation of a public company under the Companies Act, 2013, and state.', options: [
                { text: 'The eight documents are: (1) Memorandum of Association (min', outcome: 'The eight documents are: (1) Memorandum of Association (min. 7 signatories for public company), (2).' },
                { text: 'prospectus', outcome: 'Not quite — Students consistently confuse three distinct concepts: (1) They treat "Certificate.', reveals: 'students-consistently-confuse-three-distinct' },
                { text: 'Certificate of Incorporation', outcome: 'Not quite — Students consistently confuse three distinct concepts: (1) They treat "Certificate.', reveals: 'students-consistently-confuse-three-distinct' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_07_005', title: 'Documents for Incorporation: Articles of Association (AoA)',
          caseStudy: { intro: 'Imagine you and three friends decide to start a private limited company to manufacture eco-friendly packaging.',
            decisions: [{ prompt: 'State the precise legal definition of \'Articles of Association\' as per Section 2(5) of the Companies Act, 2013, and identify the two.', options: [
                { text: 'Correct Answer: As per Section 2(5) of the Companies Act, 2013, \'articles\' means the', outcome: 'Correct Answer: As per Section 2(5) of the Companies Act, 2013, \'articles\' means the articles.' },
                { text: 'AoA is subordinate only to the Act, or that it defines the company\'s objects', outcome: 'Not quite — Students commonly believe that the Articles of Association is merely a "subsidiary document".', reveals: 'students-commonly-believe-that-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_07_006', title: 'Effect of Incorporation: Certificate of Incorporation',
          caseStudy: { intro: 'Imagine you and your friends have completed all paperwork for your startup "GreenTech Innovations Pvt Ltd" and submitted it to the ROC.',
            decisions: [{ prompt: 'What is the legal significance of the date printed on the Certificate of Incorporation?', options: [
                { text: 'The date on the Certificate of Incorporation is the legal "date of birth" of the company', outcome: 'The date on the Certificate of Incorporation is the legal "date of birth" of the company.' },
                { text: 'the date the certificate is physically received', outcome: 'Not quite — Students often believe that the Certificate of Incorporation and the Certificate of Commencement.', reveals: 'the-certificate-of-incorporation-and' },
                { text: 'the date of application', outcome: 'Not quite — Students often believe that the Certificate of Incorporation and the Certificate of Commencement.', reveals: 'the-certificate-of-incorporation-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Three seniors plan to register \'CampusKart Pvt Ltd\' to deliver stationery to hostels. Before incorporation, one of them signs a ₹60,000 contract with a supplier \'on behalf of the company\', and they hire a CA to draft the MoA for a fee. Later they argue: \'The CA is a promoter since he helped form it, and the supplier contract automatically binds the company once it\'s registered.\'',
            decisions: [{ prompt: 'What does company law actually say?', options: [
                { text: 'The CA is not a promoter — professionals acting in their professional capacity are excluded by Section 69. And the pre-incorporation contract binds the signing promoter personally; the company can\'t ratify it because it didn\'t legally exist when the contract was made — a fresh contract is needed after incorporation.', outcome: 'Promotion is a defined legal phase: promoters carry fiduciary duty and personal liability until the company is born; helpers-for-fee are not promoters.' },
                { text: 'Both claims hold — anyone who helps form a company is a promoter, and contracts made for it get ratified at incorporation.', outcome: 'Section 69 expressly excludes professionals acting for a fee, and ratification is impossible — you can\'t adopt a contract on behalf of an entity that didn\'t exist.', reveals: 'helpers-are-promoters' },
                { text: 'The senior who signed is personally liable forever AND the company also owes the supplier — double liability.', outcome: 'The promoter is personally liable, but the company isn\'t bound at all until it makes a new contract post-incorporation — liability isn\'t duplicated.', reveals: 'double-liability-on-precontracts' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now see promotion as a legal phase with a strict sequence — and the promoter as a fiduciary who gambles his own liability until incorporation.',
            decisions: [{ prompt: 'What comes next? Formation of a Company · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Formation of a Company · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_07_001', difficulty: 'standard',
          question: 'Promotion of a company is the first stage in company formation where a person.',
          hint: 'Revisit c9_eco_ch1_7 (Entrepreneurship: Organising Factors of Production) and.',
          misconception: 'Students conflate "promoter" with "entrepreneur" or "founder-director." They assume: (1) The person who has the.',
          parts: [
                { id: 'a', prompt: 'A Chartered Accountant, Ms. Rao, helps Avtar prepare financial projections, draft the MoA, and file incorporation documents. She charges professional fees.', answer: 'No, Ms',
                  options: ['No, Ms', 'helps form the company'],
                  hint: 'Revisit c9_eco_ch1_7 (Entrepreneurship: Organising Factors of Production) and c10_eco_cbse_03_003.',
                  misconception: 'Students conflate "promoter" with "entrepreneur" or "founder-director." They assume: (1) The person who has the business idea automatically.' },
                { id: 'b', prompt: 'Compare the legal position of a promoter with that of a director and an entrepreneur using three distinct criteria: (a) existence of company, (b) fiduciary.', answer: '| Criterion | Promoter | Director | Entrepreneur |',
                  options: ['| Criterion | Promoter | Director | Entrepreneur |', 'promoter becomes director automatically'],
                  hint: 'Revisit c9_eco_ch1_7 (Entrepreneurship: Organising Factors of Production) and c10_eco_cbse_03_003.',
                  misconception: 'Students conflate "promoter" with "entrepreneur" or "founder-director." They assume: (1) The person who has the business idea automatically.' }
          ],
            remediations: { 'students-conflate-promoter-with-entrepreneur': { steps: ['Ask the student to read Section 69 of Companies Act, 2013 verbatim and highlight the three limbs (a), (b), (c) and the.', 'Create a three-column table: Promoter / Director / Professional. For each, answer: "When does the role begin?', 'Give two mini-cases: (i) A person named in prospectus but not a shareholder; (ii) A lawyer drafting incorporation docs.', 'Have the student write the exact NCERT line: "A company cannot ratify a preliminary contract" and explain why.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_07_002', difficulty: 'standard',
          question: 'A promoter is a person who conceives a business idea, takes the initiative.',
          hint: 'Revisit the concept of \'Promotion\' in c11_bs_cbse_07_001 and the role of entrepreneurship.',
          misconception: 'Students often think that a promoter becomes a director automatically after incorporation, or that the promoter is the.',
          parts: [
                { id: 'a', prompt: 'According to Section 69 of the Companies Act, 2013, which of the following persons is NOT considered a promoter?', answer: 'Correct answer: (c) A lawyer acting in professional capacity',
                  options: ['Correct answer: (c) A lawyer acting in professional capacity', 'preliminary contracts', 'provisional contracts'],
                  hint: 'Revisit the concept of \'Promotion\' in c11_bs_cbse_07_001 and the role of entrepreneurship.',
                  misconception: 'Students often think that a promoter becomes a director automatically after incorporation, or that the promoter is the owner of the.' },
                { id: 'b', prompt: '"Promoters are neither agents nor trustees of the company." Explain why this statement is true, and state the legal relationship that actually exists between.', answer: 'Correct answer: Promoters are not agents',
                  options: ['Correct answer: Promoters are not agents', 'preliminary contracts', 'provisional contracts'],
                  hint: 'Revisit the concept of \'Promotion\' in c11_bs_cbse_07_001 and the role of entrepreneurship.',
                  misconception: 'Students often think that a promoter becomes a director automatically after incorporation, or that the promoter is the owner of the.' },
                { id: 'c', prompt: 'Ravi conceives an idea for a solar panel manufacturing unit. He conducts a technical feasibility study and finds the required raw material is unavailable.', answer: 'Correct answer: Ravi performed the function of conducting feasibility studies',
                  options: ['Correct answer: Ravi performed the function of conducting feasibility studies', 'preliminary contracts', 'provisional contracts'],
                  hint: 'Revisit the concept of \'Promotion\' in c11_bs_cbse_07_001 and the role of entrepreneurship.',
                  misconception: 'Students often think that a promoter becomes a director automatically after incorporation, or that the promoter is the owner of the.' },
                { id: 'd', prompt: 'Compare the position of a promoter with that of a director of an already incorporated company.', answer: 'Correct answer: Similarities: Both owe fiduciary duties',
                  options: ['Correct answer: Similarities: Both owe fiduciary duties', 'preliminary contracts', 'provisional contracts'],
                  hint: 'Revisit the concept of \'Promotion\' in c11_bs_cbse_07_001 and the role of entrepreneurship.',
                  misconception: 'Students often think that a promoter becomes a director automatically after incorporation, or that the promoter is the owner of the.' }
          ],
            remediations: { 'a-promoter-becomes-a-director': { steps: ['If a student holds this misconception, guide them through a timeline: (1) Pre-incorporation: promoter acts, personally.', '(2) Incorporation: company born, separate entity.', '(3) Post-incorporation: directors manage.', 'Ask: "Who owns the company?" -> Shareholders.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that a promoter becomes a director automatically after incorporation, or that the promoter is the.',
          parts: [
                { id: 'a', prompt: '"A promoter should be allowed to make secret profits as a reward for taking the risk of forming a company." Critically evaluate this statement with reference.', answer: 'Correct answer: The statement is incorrect',
                  options: ['Correct answer: The statement is incorrect', 'preliminary contracts', 'provisional contracts'],
                  hint: 'Revisit the concept of \'Promotion\' in c11_bs_cbse_07_001 and the role of entrepreneurship.',
                  misconception: 'Students often think that a promoter becomes a director automatically after incorporation, or that the promoter is the owner of the.' }
          ],
            remediations: { 'a-promoter-becomes-a-director': { steps: ['If a student holds this misconception, guide them through a timeline: (1) Pre-incorporation: promoter acts, personally.', '(2) Incorporation: company born, separate entity.', '(3) Post-incorporation: directors manage.', 'Ask: "Who owns the company?" -> Shareholders.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_07_003', difficulty: 'standard',
          question: 'Incorporation of a company is the legal process by which promoters submit.',
          hint: 'Revisit c11_bs_cbse_07_001 (Promotion stages) and c11_bs_cbse_07_002 (Promoter functions.',
          misconception: 'Students consistently confuse three distinct concepts: (1) They treat "Certificate of Incorporation" as authorising.',
          parts: [
                { id: 'a', prompt: 'List the eight documents that must accompany the application for incorporation of a public company under the Companies Act, 2013, and state the minimum number.', answer: 'The eight documents are: (1) Memorandum of Association (min',
                  options: ['The eight documents are: (1) Memorandum of Association (min', 'prospectus', 'Certificate of Incorporation', 'Certificate of Commencement of Business'],
                  hint: 'Revisit c11_bs_cbse_07_001 (Promotion stages) and c11_bs_cbse_07_002 (Promoter functions and legal.',
                  misconception: 'Students consistently confuse three distinct concepts: (1) They treat "Certificate of Incorporation" as authorising *immediate business.' },
                { id: 'b', prompt: 'Compare and contrast preliminary contracts and provisional contracts on three bases: (a) timing of execution, (b) legal bindingness on the company, (c).', answer: 'timing of execution, (',
                  options: ['timing of execution, (', 'pre-incorporation', 'post-incorporation/pre-commencement', 'pre-business'],
                  hint: 'Revisit c11_bs_cbse_07_001 (Promotion stages) and c11_bs_cbse_07_002 (Promoter functions and legal.',
                  misconception: 'Students consistently confuse three distinct concepts: (1) They treat "Certificate of Incorporation" as authorising *immediate business.' }
          ],
            remediations: { 'students-consistently-confuse-three-distinct': { steps: ['Draw a two-column timeline—left column "Promotion Stage" (node 001-002), right column "Incorporation Stage" (this.', 'For the "conclusive evidence" misconception, re-read the two NCERT illustrations (backdated certificate on 6th Jan.', 'Create a flashcard: "Preliminary contract → Promoter liable, Company NOT bound, Cannot ratify → Novation only."', 'Practice writing the 8-document list from memory *in statutory sequence* (name approval → MoA → AoA → Consent →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_07_004', difficulty: 'standard',
          question: 'The Memorandum of Association (MoA) is the charter document of a company that.',
          hint: 'If stuck, revisit the "Documents Required to be Submitted" section in c11_bs_cbse_07_003.',
          misconception: 'Students often believe that the MoA can be altered as easily as the Articles of Association (by special resolution.',
          parts: [
                { id: 'a', prompt: '"GreenEnergy Ltd." is a public company with an Objects Clause stating: "To manufacture and sell solar panels." The Board of Directors, without altering the.', answer: 'Step 1: Identify the main object from the Objects Clause',
                  options: ['Step 1: Identify the main object from the Objects Clause', 'essential or incidental'],
                  hint: 'If stuck, revisit the "Documents Required to be Submitted" section in c11_bs_cbse_07_003 and the.',
                  misconception: 'Students often believe that the MoA can be altered as easily as the Articles of Association (by special resolution only) and that acts.' },
                { id: 'b', prompt: 'Compare the MoA requirements for a public company versus a private company with respect to: (a) minimum number of signatories, (b) wording of the Name Clause.', answer: '| Aspect | Public Company | Private Company |',
                  options: ['| Aspect | Public Company | Private Company |', 'Private Limited'],
                  hint: 'If stuck, revisit the "Documents Required to be Submitted" section in c11_bs_cbse_07_003 and the.',
                  misconception: 'Students often believe that the MoA can be altered as easily as the Articles of Association (by special resolution only) and that acts.' }
          ],
            remediations: { 'the-moa-can-be-altered': { steps: ['If the student exhibits the above misconceptions: (1) Have them re-read the Objects Clause and ultra vires doctrine.', '(2) Use the analogy of a municipal corporation\'s charter: a city cannot start a banking business even if all citizens.', '(3) Give a mini-exercise: "Company X\'s MoA authorises ₹1 cr capital.', 'It issues ₹60 lakh shares.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_07_005', difficulty: 'standard',
          question: 'The Articles of Association (AoA) is a legal document that contains the rules.',
          hint: 'Revisit the MoA clauses (Name, Registered Office, Objects, Liability, Capital.',
          misconception: 'Students commonly believe that the Articles of Association is merely a "subsidiary document" of lesser importance than.',
          parts: [
                { id: 'a', prompt: 'A public company limited by shares adopts Table F of Schedule I as its Articles of Association without any modifications.', answer: 'Correct Answer: The alteration is invalid',
                  options: ['Correct Answer: The alteration is invalid', 'valid because special resolution was passed'],
                  hint: 'Revisit the MoA clauses (Name, Registered Office, Objects, Liability, Capital, Subscription) and.',
                  misconception: 'Students commonly believe that the Articles of Association is merely a "subsidiary document" of lesser importance than the MoA, and.' },
                { id: 'b', prompt: 'XYZ Private Limited\'s Articles of Association state: "The Board of Directors may refuse to register any transfer of shares without assigning any reason.".', answer: 'Correct Answer: The shareholder will succeed',
                  options: ['Correct Answer: The shareholder will succeed', 'articles bind as a contract'],
                  hint: 'Revisit the MoA clauses (Name, Registered Office, Objects, Liability, Capital, Subscription) and.',
                  misconception: 'Students commonly believe that the Articles of Association is merely a "subsidiary document" of lesser importance than the MoA, and.' }
          ],
            remediations: { 'students-commonly-believe-that-the': { steps: ['If the student exhibits this misconception, take these steps: (1) Show the exact text of Section 10, Companies Act.', '(3) Use the "contract" analogy: Ask the student, "If you sign a contract with your business partner, can you change its.', '(4) Give a 5-minute writing exercise: "List 3 provisions from Table F that would be legally binding on a director even.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_07_006', difficulty: 'standard',
          question: 'The Certificate of Incorporation is a legal document issued by the Registrar.',
          hint: 'Review the "Incorporation of a Company: Procedure and Document" node (c11_bs_cbse_07_003).',
          misconception: 'Students often believe that the Certificate of Incorporation and the Certificate of Commencement of Business are the.',
          parts: [
                { id: 'a', prompt: 'If a promoter forges the signatures of two subscribers on the Memorandum of Association, and the ROC issues a Certificate of Incorporation without detecting.', answer: 'No, the company\'s existence cannot be challenged',
                  options: ['No, the company\'s existence cannot be challenged', 'yes, because forgery voids the registration'],
                  hint: 'Review the "Incorporation of a Company: Procedure and Document" node (c11_bs_cbse_07_003) focusing.',
                  misconception: 'Students often believe that the Certificate of Incorporation and the Certificate of Commencement of Business are the same document or serve.' },
                { id: 'b', prompt: 'A public company receives its Certificate of Incorporation on 1st April. The directors sign a lease agreement for office premises on 5th April.', answer: 'Yes, the lease agreement is binding',
                  options: ['Yes, the lease agreement is binding', 'no, because business cannot commence without the commencement certificate'],
                  hint: 'Review the "Incorporation of a Company: Procedure and Document" node (c11_bs_cbse_07_003) focusing.',
                  misconception: 'Students often believe that the Certificate of Incorporation and the Certificate of Commencement of Business are the same document or serve.' }
          ],
            remediations: { 'the-certificate-of-incorporation-and': { steps: ['If the student confuses Incorporation with Commencement: Draw a two-column timeline.', 'Column A: "Certificate of Incorporation" -> Date X -> Effects: Legal person, perpetual succession, can contract, sue.', 'Column B: "Certificate of Commencement" -> Date Y (within 180 days for public co.) -> Effects: Can borrow, start.', 'Emphasize: Private companies don\'t need Column B.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
