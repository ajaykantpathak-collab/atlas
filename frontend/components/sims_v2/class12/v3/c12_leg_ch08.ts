import type { SimDef } from '../../engine/types';

/** v3 generated — c12_leg_ch08 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_leg_ch08: SimDef = {
    id: 'v3_c12_leg_ch08',
    title: 'Forms of Legal Entities',
    subtitle: 'This node covers the conceptual framework, salient features, advantages/disadvantages.',
    classLevel: 12, subject: 'leg', topic: 'Forms of Legal Entities',
    chapters: ['c12_leg_ch08'],
    nodeIds: ['c12_leg_cbse_08_001', 'c12_leg_cbse_08_002', 'c12_leg_cbse_08_003', 'c12_leg_cbse_08_004', 'c12_leg_cbse_08_005', 'c12_leg_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Imagine you and two friends want to start a cloud kitchen in Bengaluru — you have ₹5 lakh pooled, but need.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'What is the minimum number of members required to form a private limited company and a public limited company under the Companies Act, 2013?',
        options: ['Private limited company: minimum 2 members', '1 for private, 5 for public', 'registration'],
        answer: 'Private limited company: minimum 2 members',
        hook: 'Students believe that registering a partnership firm under the Indian Partnership Act, 1932 gives it a separate legal.',
    },
    teaching: [
        { title: 'Forms of Legal Entities — Key Concepts and Institutions', text: 'A legal entity is an organization recognized by law as having rights and obligations distinct from its members, capable of owning property, entering contracts, suing, and being sued in its own name.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_leg_cbse_08_001', title: 'Forms of Legal Entities — Key Concepts and Institutions',
          caseStudy: { intro: 'Imagine you and two friends want to start a cloud kitchen in Bengaluru — you have ₹5 lakh pooled, but need ₹20 lakh for equipment and want to limit personal.',
            decisions: [{ prompt: 'What is the minimum number of members required to form a private limited company and a public limited company under the Companies Act, 2013?', options: [
                { text: 'Private limited company: minimum 2 members', outcome: 'Private limited company: minimum 2 members. Public limited company: minimum 7 members.' },
                { text: '1 for private, 5 for public', outcome: 'Not quite — Students believe that registering a partnership firm under the Indian Partnership Act, 1932 gives.', reveals: 'registering-a-partnership-firm-under' },
                { text: 'registration', outcome: 'Not quite — Students believe that registering a partnership firm under the Indian Partnership Act, 1932 gives.', reveals: 'registering-a-partnership-firm-under' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_08_002', title: 'Forms of Legal Entities — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with a real question: "Your cousin wants to start a bakery.',
            decisions: [{ prompt: 'Which Article of the Constitution of India guarantees the fundamental right to practice any profession, or to carry on any occupation.', options: [
                { text: 'Article 19(1)(g)', outcome: 'Article 19(1)(g). A wrong answer (e.g., Article 21 or Article 301) reveals the student confuses the.' },
                { text: 'registration under the Companies Act', outcome: 'Not quite — Students believe "registration under the Companies Act" is required for ALL business entities.', reveals: 'registration-under-the-companies-act' },
                { text: '"registration under the Companies Act" is required for ALL business entities', outcome: 'Not quite — Students believe "registration under the Companies Act" is required for ALL business entities.', reveals: 'registration-under-the-companies-act' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_08_003', title: 'Forms of Legal Entities — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Imagine you and two friends want to start a cloud kitchen in Delhi. You have ₹5 lakh pooled in, but need ₹20 lakh for equipment and marketing.',
            decisions: [{ prompt: 'What is the minimum and maximum number of members allowed in a Private Limited Company under the Companies Act, 2013?', options: [
                { text: 'A Private Limited Company requires a minimum of 2 members and a maximum of 200 members', outcome: 'A Private Limited Company requires a minimum of 2 members and a maximum of 200 members (excluding.' },
                { text: '1 member', outcome: 'Not quite — **"Registration makes a Partnership a separate legal entity."** Students often believe that.', reveals: 'registration-makes-a-partnership-a' },
                { text: 'unlimited', outcome: 'Not quite — **"Registration makes a Partnership a separate legal entity."** Students often believe that.', reveals: 'registration-makes-a-partnership-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_08_004', title: 'Forms of Legal Entities — Processes and Procedures',
          caseStudy: { intro: 'A student\'s uncle wants to expand his single-shop garment business into a chain across three cities.',
            decisions: [{ prompt: 'Define "separate legal entity" in the context of business organisations and name the THREE forms from the NCERT chapter that possess this.', options: [
                { text: 'Correct: A separate legal entity means the organisation is distinct from its owners in', outcome: 'Correct: A separate legal entity means the organisation is distinct from its owners in the eyes.' },
                { text: 'registration', outcome: 'Not quite — Students believe: "If a partnership is registered, it becomes a separate legal entity like.', reveals: 'if-a-partnership-is-registered' },
                { text: 'separate legal entity', outcome: 'Not quite — Students believe: "If a partnership is registered, it becomes a separate legal entity like.', reveals: 'if-a-partnership-is-registered' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_08_005', title: 'Forms of Legal Entities — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'Start with a relatable scenario: "Your cousin wants to start a cloud kitchen with two friends — they have ₹5 lakh capital, want limited liability, and plan.',
            decisions: [{ prompt: 'List the six forms of legal entities recognized in India under the Companies Act, 2013 and the LLP Act, 2008.', options: [
                { text: 'The six forms are: (1) Sole Proprietorship, (2) Partnership, (3) Limited Liability', outcome: 'The six forms are: (1) Sole Proprietorship, (2) Partnership, (3) Limited Liability Partnership.' },
                { text: 'Joint Stock Company', outcome: 'Not quite — Students believe **"Private Limited Company requires minimum paid-up capital of ₹1 lakh"** — this.', reveals: 'private-limited-company-requires-minimum' },
                { text: 'Private Limited Company requires minimum paid-up capital of ₹1 lakh', outcome: 'Not quite — Students believe **"Private Limited Company requires minimum paid-up capital of ₹1 lakh"** — this.', reveals: 'private-limited-company-requires-minimum' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_08_006', title: 'Forms of Legal Entities — Critical Analysis and Application',
          caseStudy: { intro: 'You are advising your cousin who wants to launch a cloud-kitchen brand selling regional Indian sweets nationwide.',
            decisions: [{ prompt: 'Define \'separate legal entity\' in the context of business organisations and state which two forms among the six NCERT forms do NOT possess.', options: [
                { text: 'A separate legal entity means the organisation is distinct from its owners in the eyes of', outcome: 'A separate legal entity means the organisation is distinct from its owners in the eyes of law —.' },
                { text: 'LLP is just a partnership with limited liability', outcome: 'Not quite — Students believe "LLP is just a partnership with limited liability" — they miss that LLP is a body.', reveals: 'llp-is-just-a-partnership' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_08_002', title: 'Forms of Legal Entities — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with a real question: "Your cousin wants to start a bakery.',
            decisions: [{ prompt: 'Which Article of the Constitution of India guarantees the fundamental right to practice any profession, or to carry on any occupation.', options: [
                { text: 'Article 19(1)(g)', outcome: 'Article 19(1)(g). A wrong answer (e.g., Article 21 or Article 301) reveals the student confuses the.' },
                { text: 'registration under the Companies Act', outcome: 'Not quite — Students believe "registration under the Companies Act" is required for ALL business entities.', reveals: 'registration-under-the-companies-act' },
                { text: '"registration under the Companies Act" is required for ALL business entities', outcome: 'Not quite — Students believe "registration under the Companies Act" is required for ALL business entities.', reveals: 'registration-under-the-companies-act' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_leg_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'Forms of Legal Entities', spots: [
            { id: 's1', label: 'Forms of Legal Entities Key Concepts and Institutions', prompt: 'Which idea is this? — A legal entity is an organization recognized by law as having rights and obligations.', answer: 'Forms of Legal Entities Key Concepts and Institutions', options: ['Forms of Legal Entities Key Concepts and Institutions', 'Forms of Legal Entities Constitutional and Legal Provisions', 'Forms of Legal Entities Landmark Cases and Illustrations', 'Forms of Legal Entities Processes and Procedures'] },
            { id: 's2', label: 'Forms of Legal Entities Constitutional and Legal Provisions', prompt: 'Which idea is this? — Forms of Legal Entities refer to the legally recognized organizational structures (sole.', answer: 'Forms of Legal Entities Constitutional and Legal Provisions', options: ['Forms of Legal Entities Constitutional and Legal Provisions', 'Forms of Legal Entities Key Concepts and Institutions', 'Forms of Legal Entities Landmark Cases and Illustrations', 'Forms of Legal Entities Processes and Procedures'] },
            { id: 's3', label: 'Forms of Legal Entities Landmark Cases and Illustrations', prompt: 'Which idea is this? — Forms of Legal Entities refer to the legally recognized organizational structures through.', answer: 'Forms of Legal Entities Landmark Cases and Illustrations', options: ['Forms of Legal Entities Landmark Cases and Illustrations', 'Forms of Legal Entities Key Concepts and Institutions', 'Forms of Legal Entities Constitutional and Legal Provisions', 'Forms of Legal Entities Processes and Procedures'] },
            { id: 's4', label: 'Forms of Legal Entities Processes and Procedures', prompt: 'Which idea is this? — Forms of Legal Entities refer to the legally recognised structures (sole proprietorship.', answer: 'Forms of Legal Entities Processes and Procedures', options: ['Forms of Legal Entities Processes and Procedures', 'Forms of Legal Entities Key Concepts and Institutions', 'Forms of Legal Entities Constitutional and Legal Provisions', 'Forms of Legal Entities Landmark Cases and Illustrations'] },
            { id: 's5', label: 'Forms of Legal Entities Exam-Oriented Questions and Answers', prompt: 'Which idea is this? — Forms of Legal Entities refer to the legally recognized structures (Sole Proprietorship.', answer: 'Forms of Legal Entities Exam-Oriented Questions and Answers', options: ['Forms of Legal Entities Exam-Oriented Questions and Answers', 'Forms of Legal Entities Key Concepts and Institutions', 'Forms of Legal Entities Constitutional and Legal Provisions', 'Forms of Legal Entities Landmark Cases and Illustrations'] },
            { id: 's6', label: 'Forms of Legal Entities Critical Analysis and Application', prompt: 'Which idea is this? — A legal entity is an organization recognized by law as having distinct legal rights and.', answer: 'Forms of Legal Entities Critical Analysis and Application', options: ['Forms of Legal Entities Critical Analysis and Application', 'Forms of Legal Entities Key Concepts and Institutions', 'Forms of Legal Entities Constitutional and Legal Provisions', 'Forms of Legal Entities Landmark Cases and Illustrations'] }
          ] } },
        { type: 'case', nodeId: 'c12_leg_cbse_08_006', title: 'You made it',
          caseStudy: { intro: 'You finished Forms of Legal Entities — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_leg_cbse_08_001', difficulty: 'standard',
          question: 'A legal entity is an organization recognized by law as having rights and.',
          hint: 'Revisit Class 11 Jurisprudence node c11_leg_cbse_06_001 (Concept of Legal Personality).',
          misconception: 'Students believe that registering a partnership firm under the Indian Partnership Act, 1932 gives it a separate legal.',
          parts: [
                { id: 'a', prompt: 'What is the minimum number of members required to form a private limited company and a public limited company under the Companies Act, 2013?', answer: 'Private limited company: minimum 2 members',
                  options: ['Private limited company: minimum 2 members', '1 for private, 5 for public', 'registration', 'incorporation'],
                  hint: 'Revisit Class 11 Jurisprudence node c11_leg_cbse_06_001 (Concept of Legal Personality) and identify.',
                  misconception: 'Students believe that registering a partnership firm under the Indian Partnership Act, 1932 gives it a separate legal entity status like.' },
                { id: 'b', prompt: 'Explain why a sole proprietorship does not have "perpetual succession" while a private limited company does, using the concept of separate legal entity.', answer: 'A sole proprietorship has no separate legal existence from its owner',
                  options: ['A sole proprietorship has no separate legal existence from its owner', 'sole proprietorship can continue through a will', 'registration', 'incorporation'],
                  hint: 'Revisit Class 11 Jurisprudence node c11_leg_cbse_06_001 (Concept of Legal Personality) and identify.',
                  misconception: 'Students believe that registering a partnership firm under the Indian Partnership Act, 1932 gives it a separate legal entity status like.' },
                { id: 'c', prompt: 'A group of 15 freelance graphic designers want to collaborate on large projects, share profits equally, but avoid joint liability for each other\'s negligence.', answer: 'Limited Liability Partnership (LLP) is most suitable',
                  options: ['Limited Liability Partnership (LLP) is most suitable', 'private limited company', 'registration', 'incorporation'],
                  hint: 'Revisit Class 11 Jurisprudence node c11_leg_cbse_06_001 (Concept of Legal Personality) and identify.',
                  misconception: 'Students believe that registering a partnership firm under the Indian Partnership Act, 1932 gives it a separate legal entity status like.' }
          ],
            remediations: { 'registering-a-partnership-firm-under': { steps: ['If the student holds this misconception: (1) Have them read Section 4 of the Indian Partnership Act, 1932 ("Partnership.', '(2) Contrast with Section 3(1) of LLP Act, 2008 ("An LLP is a body corporate formed and incorporated under this Act...', 'a legal entity separate from its partners").', '(3) Ask them to answer: "If a registered partnership firm takes a loan and defaults, can the bank recover only from.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that registering a partnership firm under the Indian Partnership Act, 1932 gives it a separate legal.',
          parts: [
                { id: 'a', prompt: '"An OPC is just a sole proprietorship with a fancy name and limited liability." Evaluate this statement with reference to legal status, compliance, and.', answer: 'The statement is false',
                  options: ['The statement is false', 'registration', 'incorporation'],
                  hint: 'Revisit Class 11 Jurisprudence node c11_leg_cbse_06_001 (Concept of Legal Personality) and identify.',
                  misconception: 'Students believe that registering a partnership firm under the Indian Partnership Act, 1932 gives it a separate legal entity status like.' },
                { id: 'b', prompt: 'Design a decision flowchart (text-based) that a first-time entrepreneur in India can use to select the appropriate legal entity.', answer: 'Sample flowchart logic: 1',
                  options: ['Sample flowchart logic: 1', 'registration', 'incorporation'],
                  hint: 'Revisit Class 11 Jurisprudence node c11_leg_cbse_06_001 (Concept of Legal Personality) and identify.',
                  misconception: 'Students believe that registering a partnership firm under the Indian Partnership Act, 1932 gives it a separate legal entity status like.' }
          ],
            remediations: { 'registering-a-partnership-firm-under': { steps: ['If the student holds this misconception: (1) Have them read Section 4 of the Indian Partnership Act, 1932 ("Partnership.', '(2) Contrast with Section 3(1) of LLP Act, 2008 ("An LLP is a body corporate formed and incorporated under this Act...', 'a legal entity separate from its partners").', '(3) Ask them to answer: "If a registered partnership firm takes a loan and defaults, can the bank recover only from.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_08_002', difficulty: 'standard',
          question: 'Forms of Legal Entities refer to the legally recognized organizational.',
          hint: 'If stuck, revisit c11_leg_cbse_04_002 (Salient Features — Constitutional Provisions) for.',
          misconception: 'Students believe "registration under the Companies Act" is required for ALL business entities.',
          parts: [
                { id: 'a', prompt: 'Which Article of the Constitution of India guarantees the fundamental right to practice any profession, or to carry on any occupation, trade or business.', answer: 'Article 19(1)(g)',
                  options: ['Article 19(1)(g)', 'registration under the Companies Act', '"registration under the Companies Act" is required for ALL business entities'],
                  hint: 'If stuck, revisit c11_leg_cbse_04_002 (Salient Features — Constitutional Provisions) for Article 19.',
                  misconception: 'Students believe "registration under the Companies Act" is required for ALL business entities.' },
                { id: 'b', prompt: 'Explain in your own words why a sole proprietorship and a one person company (OPC) are fundamentally different even though both have a single owner.', answer: 'A sole proprietorship has no separate legal entity',
                  options: ['A sole proprietorship has no separate legal entity', 'single owner', 'registration under the Companies Act', '"registration under the Companies Act" is required for ALL business entities'],
                  hint: 'If stuck, revisit c11_leg_cbse_04_002 (Salient Features — Constitutional Provisions) for Article 19.',
                  misconception: 'Students believe "registration under the Companies Act" is required for ALL business entities.' },
                { id: 'c', prompt: 'A group of 15 artisans wants to form a legal entity to sell handicrafts collectively.', answer: 'Limited Liability Partnership (LLP)',
                  options: ['Limited Liability Partnership (LLP)', 'registration under the Companies Act', '"registration under the Companies Act" is required for ALL business entities'],
                  hint: 'If stuck, revisit c11_leg_cbse_04_002 (Salient Features — Constitutional Provisions) for Article 19.',
                  misconception: 'Students believe "registration under the Companies Act" is required for ALL business entities.' },
                { id: 'd', prompt: 'Compare the constitutional position of a public limited company and a private limited company regarding "invitation to public to subscribe to shares." Which.', answer: 'The distinction is statutory, not directly constitutional',
                  options: ['The distinction is statutory, not directly constitutional', 'Article 19', 'Article 301', 'registration under the Companies Act'],
                  hint: 'If stuck, revisit c11_leg_cbse_04_002 (Salient Features — Constitutional Provisions) for Article 19.',
                  misconception: 'Students believe "registration under the Companies Act" is required for ALL business entities.' }
          ],
            remediations: { 'registration-under-the-companies-act': { steps: ['Ask the student to list the governing statute for each of the six entities (Partnership Act 1932, LLP Act 2008.', 'Have them read the "Registration" section of each Act — Partnership Act Sec. 58-59 (optional), LLP Act Sec.', 'Create a two-column table: Entity | Registration Mandatory? (Yes/No) with statutory section references.', 'Re-attempt Diagnostic Q3 with this table open.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_08_003', difficulty: 'standard',
          question: 'Forms of Legal Entities refer to the legally recognized organizational.',
          hint: 'If confused about legal personality, revisit Salomon v. Salomon (c11_leg_cbse_06_003) and.',
          misconception: '**"Registration makes a Partnership a separate legal entity."** Students often believe that registering a partnership.',
          parts: [
                { id: 'a', prompt: 'Explain why a Partnership firm does NOT have a separate legal entity, but an LLP does — even though both are formed by agreement between partners.', answer: 'A Partnership firm is not a legal person distinct from its partners',
                  options: ['A Partnership firm is not a legal person distinct from its partners', 'both are created by agreement, so both are separate entities', 'Registration makes a Partnership a separate legal entity', 'registration'],
                  hint: 'If confused about legal personality, revisit Salomon v. Salomon (c11_leg_cbse_06_003) and the.',
                  misconception: '**"Registration makes a Partnership a separate legal entity."** Students often believe that registering a partnership firm under the Indian.' },
                { id: 'b', prompt: 'A group of 50 artisans in a village want to form a legal entity to sell their handicrafts online.', answer: 'A **Private Limited Company** is most suitable',
                  options: ['A **Private Limited Company** is most suitable', 'Registration makes a Partnership a separate legal entity', 'registration'],
                  hint: 'If confused about legal personality, revisit Salomon v. Salomon (c11_leg_cbse_06_003) and the.',
                  misconception: '**"Registration makes a Partnership a separate legal entity."** Students often believe that registering a partnership firm under the Indian.' },
                { id: 'c', prompt: 'Compare the liability of a partner in a Partnership firm vs. a partner in an LLP when another partner commits a fraud in the course of business without their.', answer: 'In a **Partnership**, partners are **jointly and severally liable**',
                  options: ['In a **Partnership**, partners are **jointly and severally liable**', 'both have limited liability', 'LLP partners are also jointly liable', 'Registration makes a Partnership a separate legal entity'],
                  hint: 'If confused about legal personality, revisit Salomon v. Salomon (c11_leg_cbse_06_003) and the.',
                  misconception: '**"Registration makes a Partnership a separate legal entity."** Students often believe that registering a partnership firm under the Indian.' }
          ],
            remediations: { 'registration-makes-a-partnership-a': { steps: ['If a student holds this misconception: 1.', '**Show the statutory text**: Read Section 4 of the Indian Partnership Act, 1932 — "Partnership is the relation between.', '**Contrast with LLP Act, 2008, Section 3**: "An LLP is a body corporate formed and incorporated under this Act...', 'having perpetual succession." Highlight the words "body corporate" and "perpetual succession" — absent in the 1932 Act.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_08_004', difficulty: 'standard',
          question: 'Forms of Legal Entities refer to the legally recognised structures (sole.',
          hint: 'Revisit "Separate Legal Entity" in c12_leg_cbse_08_001 and "Liability Comparison Table".',
          misconception: 'Students believe: "If a partnership is registered, it becomes a separate legal entity like a company." This is FALSE.',
          parts: [
                { id: 'a', prompt: 'A partnership firm is NOT a separate legal entity. Explain what this means for (a) liability of partners and (b) continuity of the firm if a partner dies.', answer: 'Correct: (a) Partners have unlimited, joint and several liability',
                  options: ['Correct: (a) Partners have unlimited, joint and several liability', 'registration', 'This is FALSE', 'sounds like'],
                  hint: 'Revisit "Separate Legal Entity" in c12_leg_cbse_08_001 and "Liability Comparison Table".',
                  misconception: 'Students believe: "If a partnership is registered, it becomes a separate legal entity like a company." This is FALSE.' },
                { id: 'b', prompt: 'Scenario: Four friends want to start a tech consultancy. They need: (i) limited liability, (ii) ability to raise venture capital later, (iii) no mandatory.', answer: 'Correct: **LLP** is optimal',
                  options: ['Correct: **LLP** is optimal', 'Private Ltd Company', 'This is FALSE', 'sounds like'],
                  hint: 'Revisit "Separate Legal Entity" in c12_leg_cbse_08_001 and "Liability Comparison Table".',
                  misconception: 'Students believe: "If a partnership is registered, it becomes a separate legal entity like a company." This is FALSE.' }
          ],
            remediations: { 'if-a-partnership-is-registered': { steps: ['Re-read NCERT Table "Comparative Evaluation" (p.110) — focus on rows "Separate entity", "Liability", "Continuity".', 'Create a 2x3 matrix: Entity vs. (Separate Entity? Yes/No, Liability Type, Perpetual Succession? Yes/No).', 'Do Worked Example 3 again, but this time explicitly cite the statutory section for each feature (e.g., "LLP Act s.26.', 'Attempt Competency Question 2 without notes. If stuck, revisit c12_leg_cbse_08_001 (Key Concepts) for definitions and.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_08_005', difficulty: 'standard',
          question: 'Forms of Legal Entities refer to the legally recognized structures (Sole.',
          hint: 'Revisit c12_leg_cbse_08_003 (Landmark Cases) — specifically Salomon v Salomon (1897) and.',
          misconception: 'Students believe **"Private Limited Company requires minimum paid-up capital of ₹1 lakh"** — this was true pre-2015 but.',
          parts: [
                { id: 'a', prompt: 'Explain why a Partnership firm does NOT have a separate legal entity, but an LLP does — even though both are formed by partners.', answer: 'A partnership firm is merely a collective name for the partners',
                  options: ['A partnership firm is merely a collective name for the partners', 'both have separate entity', 'Private Limited Company requires minimum paid-up capital of ₹1 lakh'],
                  hint: 'Revisit c12_leg_cbse_08_003 (Landmark Cases) — specifically Salomon v Salomon (1897) and the NCERT.',
                  misconception: 'Students believe **"Private Limited Company requires minimum paid-up capital of ₹1 lakh"** — this was true pre-2015 but the Companies.' },
                { id: 'b', prompt: 'A group of 50 artisans wants to form a legal entity to export handicrafts.', answer: 'Private Limited Company',
                  options: ['Private Limited Company', 'Private Limited Company requires minimum paid-up capital of ₹1 lakh'],
                  hint: 'Revisit c12_leg_cbse_08_003 (Landmark Cases) — specifically Salomon v Salomon (1897) and the NCERT.',
                  misconception: 'Students believe **"Private Limited Company requires minimum paid-up capital of ₹1 lakh"** — this was true pre-2015 but the Companies.' },
                { id: 'c', prompt: 'Compare the liability of a Sole Proprietor, a Partner in a Partnership firm, and a Shareholder in a Private Limited Company when the business incurs a debt.', answer: 'Sole Proprietor: Unlimited liability',
                  options: ['Sole Proprietor: Unlimited liability', 'partner\'s liability is limited to their capital contribution', 'Private Limited Company requires minimum paid-up capital of ₹1 lakh'],
                  hint: 'Revisit c12_leg_cbse_08_003 (Landmark Cases) — specifically Salomon v Salomon (1897) and the NCERT.',
                  misconception: 'Students believe **"Private Limited Company requires minimum paid-up capital of ₹1 lakh"** — this was true pre-2015 but the Companies.' }
          ],
            remediations: { 'private-limited-company-requires-minimum': { steps: ['Ask the student to open the NCERT Chapter 4B (page 106) and locate the "Capital" row for Private Limited Company.', 'Show the MCA notification dated 29.05.2015 removing minimum capital.', 'Give a 2-minute drill: "Write the current minimum paid-up capital for Pvt Ltd, Public Ltd, OPC, LLP." 4.', 'Re-test with Diagnostic Q4 (liability comparison) to ensure the capital misconception didn\'t mask a liability.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_08_006', difficulty: 'standard',
          question: 'A legal entity is an organization recognized by law as having distinct legal.',
          hint: 'If stuck, review the "Salient features" table in c12_leg_cbse_08_001 — specifically the.',
          misconception: 'Students believe "LLP is just a partnership with limited liability" — they miss that LLP is a body corporate with.',
          parts: [
                { id: 'a', prompt: 'A group of 100 weavers wants to form a collective to sell handloom products globally.', answer: 'A Private Limited Company is optimal: (1) Allows up to 200 members',
                  options: ['A Private Limited Company is optimal: (1) Allows up to 200 members', 'LLP is just a partnership with limited liability'],
                  hint: 'If stuck, review the "Salient features" table in c12_leg_cbse_08_001 — specifically the "No.',
                  misconception: 'Students believe "LLP is just a partnership with limited liability" — they miss that LLP is a body corporate with separate legal entity.' },
                { id: 'b', prompt: 'Compare the continuity of existence (perpetual succession) across Sole Proprietorship, Partnership, LLP, and Private Limited Company.', answer: 'Sole Proprietorship: ends on owner\'s death/incapacity',
                  options: ['Sole Proprietorship: ends on owner\'s death/incapacity', 'LLP is just a partnership with limited liability'],
                  hint: 'If stuck, review the "Salient features" table in c12_leg_cbse_08_001 — specifically the "No.',
                  misconception: 'Students believe "LLP is just a partnership with limited liability" — they miss that LLP is a body corporate with separate legal entity.' }
          ],
            remediations: { 'llp-is-just-a-partnership': { steps: ['Revisit c12_leg_cbse_08_001 (Key Concepts) — re-read the "Salient features" tables for each entity, focusing on the.', 'Create a 6x7 comparison matrix (6 entities x 7 parameters) from memory.', 'For each cell where you wrote "same as partnership" or "like company", verify against NCERT text.', 'Re-attempt Diagnostic Questions 2, 4, and 5 — these test the exact distinctions blurred by this misconception.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
