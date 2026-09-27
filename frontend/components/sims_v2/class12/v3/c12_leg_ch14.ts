import type { SimDef } from '../../engine/types';

/** v3 generated — c12_leg_ch14 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_leg_ch14: SimDef = {
    id: 'v3_c12_leg_ch14',
    title: 'Legal Services',
    subtitle: 'This node covers the **Key Concepts and Institutions** of Legal Services: constitutional.',
    classLevel: 12, subject: 'leg', topic: 'Legal Services',
    chapters: ['c12_leg_ch14'],
    nodeIds: ['c12_leg_cbse_14_001', 'c12_leg_cbse_14_002', 'c12_leg_cbse_14_003', 'c12_leg_cbse_14_004', 'c12_leg_cbse_14_005', 'c12_leg_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with this scenario: "A daily-wage construction worker in Delhi falls from scaffolding due to faulty.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A senior citizen (age 68) with an annual pension income of ₹1.5 lakh applies for free legal aid in a property dispute at the District Court in Delhi.',
        options: ['The rejection is **incorrect**', 'rejection is correct', 'such other higher amount as may be prescribed by the State Government'],
        answer: 'The rejection is **incorrect**',
        hook: '**Misconception**: "Legal Aid = Free Lawyer only." Students write in exams: "Legal aid means the government gives.',
    },
    teaching: [
        { title: 'Legal Services — Key Concepts and Institutions', text: 'Legal Services refers to the statutory framework in India — primarily governed by the Legal Services Authorities Act, 1987 — that provides free and competent legal aid to eligible marginalized.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_leg_cbse_14_001', title: 'Legal Services — Key Concepts and Institutions',
          caseStudy: { intro: 'Start with this scenario: "A daily-wage construction worker in Delhi falls from scaffolding due to faulty safety gear.',
            decisions: [{ prompt: 'List the eight categories of persons entitled to free legal services under Section 12 of the Legal Services Authorities Act, 1987.', options: [
                { text: 'The eight categories under Section 12 are: (a) Member of Scheduled Caste or Scheduled', outcome: 'The eight categories under Section 12 are: (a) Member of Scheduled Caste or Scheduled Tribe; (b).' },
                { text: 'industrial workman', outcome: 'Not quite — **Misconception**: "Legal Aid = Free Lawyer only." Students write in exams: "Legal aid means the.', reveals: 'misconception-legal-aid-free-lawyer' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_14_003', title: 'Legal Services — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with this scenario: "A daily wage worker in Jharkhand is denied minimum wages by a contractor.',
            decisions: [{ prompt: 'State the constitutional provision that mandates free legal aid and the year it was inserted.', options: [
                { text: 'Article 39A, inserted by the 42nd Amendment Act, 1976', outcome: 'Article 39A, inserted by the 42nd Amendment Act, 1976. Its placement in Part IV means it is not.' },
                { text: 'Legal Aid = Free Lawyer for Court Cases Only', outcome: 'Not quite — Students believe "Legal Aid = Free Lawyer for Court Cases Only".', reveals: 'legal-aid-free-lawyer-for' },
                { text: '"Legal Aid = Free Lawyer for Court Cases Only"', outcome: 'Not quite — Students believe "Legal Aid = Free Lawyer for Court Cases Only".', reveals: 'legal-aid-free-lawyer-for' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_14_004', title: 'Legal Services — Processes and Procedures',
          caseStudy: { intro: 'Start with this scenario: "Rani, a daily wage worker in Delhi, is denied wages by her contractor.',
            decisions: [{ prompt: 'What are the two income ceilings specified in Section 12(h) of the Legal Services Authorities Act, 1987 for eligibility for free legal aid.', options: [
                { text: 'Correct answer: ₹9,000 per annum for cases before courts other than the Supreme Court', outcome: 'Correct answer: ₹9,000 per annum for cases before courts other than the Supreme Court (State.' },
                { text: '₹12,000 for all courts', outcome: 'Not quite — Students consistently confuse the *Supreme Court Legal Aid Committee\'s* income criteria (₹18,000.', reveals: 'students-consistently-confuse-the-supreme' },
                { text: '₹50,000', outcome: 'Not quite — Students consistently confuse the *Supreme Court Legal Aid Committee\'s* income criteria (₹18,000.', reveals: 'students-consistently-confuse-the-supreme' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_14_005', title: 'Legal Services — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'Start with this scenario: "A daily-wage construction worker in Delhi falls from scaffolding due to faulty safety gear — he\'s injured, cannot work, and the.',
            decisions: [{ prompt: 'List the seven categories of persons entitled to free legal services under Section 12 of the Legal Services Authorities Act, 1987.', options: [
                { text: 'The seven categories under Section 12 are: (a) member of SC/ST, (b) victim of', outcome: 'The seven categories under Section 12 are: (a) member of SC/ST, (b) victim of trafficking/begar.' },
                { text: 'industrial workman', outcome: 'Not quite — Students believe legal aid is only "a free lawyer for criminal cases." In reality, the Act covers.', reveals: 'legal-aid-is-only-a' },
                { text: 'income threshold', outcome: 'Not quite — Students believe legal aid is only "a free lawyer for criminal cases." In reality, the Act covers.', reveals: 'legal-aid-is-only-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_14_006', title: 'Legal Services — Critical Analysis and Application',
          caseStudy: { intro: 'Start with this scenario: "A daily-wage construction worker in Delhi falls from scaffolding due to faulty safety gear.',
            decisions: [{ prompt: 'What is the constitutional provision that mandates the State to provide free legal aid to ensure equal opportunity for securing justice?', options: [
                { text: 'Article 39A of the Constitution of India, inserted by the 42nd Amendment Act, 1976,', outcome: 'Article 39A of the Constitution of India, inserted by the 42nd Amendment Act, 1976, mandates that.' },
                { text: 'Legal aid is only for criminal cases', outcome: 'Not quite — Students believe **"Legal aid is only for criminal cases"** because Section 304 CrPC (free lawyer.', reveals: 'legal-aid-is-only-for' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_14_005', title: 'Legal Services — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'Start with this scenario: "A daily-wage construction worker in Delhi falls from scaffolding due to faulty safety gear — he\'s injured, cannot work, and the.',
            decisions: [{ prompt: 'List the seven categories of persons entitled to free legal services under Section 12 of the Legal Services Authorities Act, 1987.', options: [
                { text: 'The seven categories under Section 12 are: (a) member of SC/ST, (b) victim of', outcome: 'The seven categories under Section 12 are: (a) member of SC/ST, (b) victim of trafficking/begar.' },
                { text: 'industrial workman', outcome: 'Not quite — Students believe legal aid is only "a free lawyer for criminal cases." In reality, the Act covers.', reveals: 'legal-aid-is-only-a' },
                { text: 'income threshold', outcome: 'Not quite — Students believe legal aid is only "a free lawyer for criminal cases." In reality, the Act covers.', reveals: 'legal-aid-is-only-a' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_leg_cbse_14_002', title: 'Identify each idea',
          dissect: { specimen: 'Legal Services', spots: [
            { id: 's1', label: 'Legal Services Key Concepts and Institutions', prompt: 'Which idea is this? — Legal Services refers to the statutory framework in India — primarily governed by the.', answer: 'Legal Services Key Concepts and Institutions', options: ['Legal Services Key Concepts and Institutions', 'Legal Services Constitutional and Legal Provisions', 'Legal Services Landmark Cases and Illustrations', 'Legal Services Processes and Procedures'] },
            { id: 's2', label: 'Legal Services Constitutional and Legal Provisions', prompt: 'Which idea is this? — Legal Services refers to the constitutional and statutory framework in India that.', answer: 'Legal Services Constitutional and Legal Provisions', options: ['Legal Services Constitutional and Legal Provisions', 'Legal Services Key Concepts and Institutions', 'Legal Services Landmark Cases and Illustrations', 'Legal Services Processes and Procedures'] },
            { id: 's3', label: 'Legal Services Landmark Cases and Illustrations', prompt: 'Which idea is this? — Legal Services refers to the institutional framework established under the Legal Services.', answer: 'Legal Services Landmark Cases and Illustrations', options: ['Legal Services Landmark Cases and Illustrations', 'Legal Services Key Concepts and Institutions', 'Legal Services Constitutional and Legal Provisions', 'Legal Services Processes and Procedures'] },
            { id: 's4', label: 'Legal Services Processes and Procedures', prompt: 'Which idea is this? — Legal Services refers to the statutory framework under the Legal Services Authorities.', answer: 'Legal Services Processes and Procedures', options: ['Legal Services Processes and Procedures', 'Legal Services Key Concepts and Institutions', 'Legal Services Constitutional and Legal Provisions', 'Legal Services Landmark Cases and Illustrations'] },
            { id: 's5', label: 'Legal Services Exam-Oriented Questions and Answers', prompt: 'Which idea is this? — Legal Services in India refer to the statutory framework under the Legal Services.', answer: 'Legal Services Exam-Oriented Questions and Answers', options: ['Legal Services Exam-Oriented Questions and Answers', 'Legal Services Key Concepts and Institutions', 'Legal Services Constitutional and Legal Provisions', 'Legal Services Landmark Cases and Illustrations'] },
            { id: 's6', label: 'Legal Services Critical Analysis and Application', prompt: 'Which idea is this? — Legal Services refers to the statutory framework under the Legal Services Authorities.', answer: 'Legal Services Critical Analysis and Application', options: ['Legal Services Critical Analysis and Application', 'Legal Services Key Concepts and Institutions', 'Legal Services Constitutional and Legal Provisions', 'Legal Services Landmark Cases and Illustrations'] }
          ] } },
        { type: 'case', nodeId: 'c12_leg_cbse_14_006', title: 'You made it',
          caseStudy: { intro: 'You finished Legal Services — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_leg_cbse_14_001', difficulty: 'standard',
          question: 'Legal Services refers to the statutory framework in India — primarily governed.',
          hint: 'If unclear on Art. 39A or court hierarchy, revisit Class 11 Political Science Chapter 4.',
          misconception: '**Misconception**: "Legal Aid = Free Lawyer only." Students write in exams: "Legal aid means the government gives.',
          parts: [
                { id: 'a', prompt: 'A senior citizen (age 68) with an annual pension income of ₹1.5 lakh applies for free legal aid in a property dispute at the District Court in Delhi.', answer: 'The rejection is **incorrect**',
                  options: ['The rejection is **incorrect**', 'rejection is correct', 'such other higher amount as may be prescribed by the State Government'],
                  hint: 'If unclear on Art. 39A or court hierarchy, revisit Class 11 Political Science Chapter 4 (Directive.',
                  misconception: '**Misconception**: "Legal Aid = Free Lawyer only." Students write in exams: "Legal aid means the government gives a free advocate to poor.' },
                { id: 'b', prompt: 'A dispute arises between a consumer and an electricity distribution company (a public utility service) over inflated bills.', answer: 'The **Permanent Lok Adalat has jurisdiction**',
                  options: ['The **Permanent Lok Adalat has jurisdiction**', 'PLA has no jurisdiction', 'award is appealable'],
                  hint: 'If unclear on Art. 39A or court hierarchy, revisit Class 11 Political Science Chapter 4 (Directive.',
                  misconception: '**Misconception**: "Legal Aid = Free Lawyer only." Students write in exams: "Legal aid means the government gives a free advocate to poor.' },
                { id: 'c', prompt: 'Compare the composition and functional mandate of NALSA (National Legal Services Authority) with that of a State Legal Services Authority (SLSA).', answer: '**NALSA**: Constituted under Sec',
                  options: ['**NALSA**: Constituted under Sec', 'CJI heads NALSA because it’s a national body'],
                  hint: 'If unclear on Art. 39A or court hierarchy, revisit Class 11 Political Science Chapter 4 (Directive.',
                  misconception: '**Misconception**: "Legal Aid = Free Lawyer only." Students write in exams: "Legal aid means the government gives a free advocate to poor.' }
          ],
            remediations: { 'misconception-legal-aid-free-lawyer': { steps: ['If the student cannot distinguish pre-litigation vs.', 'post-litigation services or misstates Section 12 categories: (1) **Re-read Section 12 of LSA Act 1987** (NCERT pg.', '200) — make a **table** mapping each category to a real-life vulnerability (e.g., "industrial workman" → power.', '(2) **Watch NALSA’s 10-min video** "Legal Services: Beyond the Courtroom" (YouTube: nalsa.gov.in) — note 3.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_14_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception**: "Legal Aid = Free Lawyer only." Students write in exams: "Legal aid means the government gives.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate: "The NALSA Regulations, 2010 mandate that panel lawyers must have 3+ years\' experience and cannot charge fees from aided persons.', answer: '**Yes, it structurally compromises competence.** The Regulations (Sec',
                  options: ['**Yes, it structurally compromises competence.** The Regulations (Sec', 'no compromise, lawyers have a duty'],
                  hint: 'If unclear on Art. 39A or court hierarchy, revisit Class 11 Political Science Chapter 4 (Directive.',
                  misconception: '**Misconception**: "Legal Aid = Free Lawyer only." Students write in exams: "Legal aid means the government gives a free advocate to poor.' }
          ],
            remediations: { 'misconception-legal-aid-free-lawyer': { steps: ['If the student cannot distinguish pre-litigation vs.', 'post-litigation services or misstates Section 12 categories: (1) **Re-read Section 12 of LSA Act 1987** (NCERT pg.', '200) — make a **table** mapping each category to a real-life vulnerability (e.g., "industrial workman" → power.', '(2) **Watch NALSA’s 10-min video** "Legal Services: Beyond the Courtroom" (YouTube: nalsa.gov.in) — note 3.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_14_002', difficulty: 'standard',
          question: 'Legal Services refers to the constitutional and statutory framework in India.',
          hint: 'If stuck, re-read NCERT Class 11 Chapter 4 (Salient Features of Constitution).',
          misconception: 'Students believe: **"Free legal aid is only for criminal cases and only for the very poor (below ₹9,000 income)."**.',
          parts: [
                { id: 'a', prompt: 'A 35-year-old male daily wage carpenter in Rajasthan earns ₹8,500/month. He is not SC/ST, not disabled, not a victim of trafficking or disaster.', answer: 'Yes, he is eligible',
                  options: ['Yes, he is eligible', 'yes, because he\'s poor'],
                  hint: 'If stuck, re-read NCERT Class 11 Chapter 4 (Salient Features of Constitution) — specifically Arts.',
                  misconception: 'Students believe: **"Free legal aid is only for criminal cases and only for the very poor (below ₹9,000 income)."** This is wrong because.' },
                { id: 'b', prompt: 'A woman in Delhi, aged 62, widow, annual income ₹1.2 lakh, faces eviction from her rented home by the landlord. She approaches DLSA for legal aid.', answer: 'She can challenge on: (1) **Gender-based eligibility**: Section 12(c)',
                  options: ['She can challenge on: (1) **Gender-based eligibility**: Section 12(c)', 'income ceiling is *universal*'],
                  hint: 'If stuck, re-read NCERT Class 11 Chapter 4 (Salient Features of Constitution) — specifically Arts.',
                  misconception: 'Students believe: **"Free legal aid is only for criminal cases and only for the very poor (below ₹9,000 income)."** This is wrong because.' },
                { id: 'c', prompt: 'Compare and contrast: (a) Lok Adalat under the original 1987 Act, and (b) Permanent Lok Adalat under the 2002 Amendment.', answer: '| Feature | Lok Adalat (1987 Act) | Permanent Lok Adalat (2002 Amendment) |',
                  options: ['| Feature | Lok Adalat (1987 Act) | Permanent Lok Adalat (2002 Amendment) |', 'both are same'],
                  hint: 'If stuck, re-read NCERT Class 11 Chapter 4 (Salient Features of Constitution) — specifically Arts.',
                  misconception: 'Students believe: **"Free legal aid is only for criminal cases and only for the very poor (below ₹9,000 income)."** This is wrong because.' }
          ],
            remediations: { 'free-legal-aid-is-only': { steps: ['If the student holds this misconception: Step 1 — Have them re-read **Section 12 of the Legal Services Authorities Act.', '199–200) and highlight *each category (a) to (h)* in different colors.', 'Step 2 — Give them **3 applicant cards**: (A) SC man, ₹50k income, civil case; (B) General woman, ₹2 lakh income.', 'Cite Section." Step 3 — Show **Delhi SLSA Rules notification** (available on nalsa.gov.in) for senior.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_14_003', difficulty: 'standard',
          question: 'Legal Services refers to the institutional framework established under the.',
          hint: 'If stuck, re-read the Hussainara Khatoon case summary in c11_leg_cbse_13_003 and the LSA.',
          misconception: 'Students believe "Legal Aid = Free Lawyer for Court Cases Only".',
          parts: [
                { id: 'a', prompt: 'State the constitutional provision that mandates free legal aid and the year it was inserted.', answer: 'Article 39A, inserted by the 42nd Amendment Act, 1976',
                  options: ['Article 39A, inserted by the 42nd Amendment Act, 1976', 'Legal Aid = Free Lawyer for Court Cases Only', '"Legal Aid = Free Lawyer for Court Cases Only"'],
                  hint: 'If stuck, re-read the Hussainara Khatoon case summary in c11_leg_cbse_13_003 and the LSA Act.',
                  misconception: 'Students believe "Legal Aid = Free Lawyer for Court Cases Only".' },
                { id: 'b', prompt: 'A 65-year-old widow in Delhi with an annual income of ₹1.5 lakh wants free legal aid for a property dispute in the District Court. She owns a small house.', answer: 'No, she does not automatically qualify',
                  options: ['No, she does not automatically qualify', 'Yes, because she is a woman/senior citizen', 'Legal Aid = Free Lawyer for Court Cases Only', '"Legal Aid = Free Lawyer for Court Cases Only"'],
                  hint: 'If stuck, re-read the Hussainara Khatoon case summary in c11_leg_cbse_13_003 and the LSA Act.',
                  misconception: 'Students believe "Legal Aid = Free Lawyer for Court Cases Only".' },
                { id: 'c', prompt: 'Compare the composition and appointment process of NALSA and a State Legal Services Authority (SLSA).', answer: 'NALSA: Patron-in-Chief = CJI',
                  options: ['NALSA: Patron-in-Chief = CJI', 'Government appoints both', 'Legal Aid = Free Lawyer for Court Cases Only', '"Legal Aid = Free Lawyer for Court Cases Only"'],
                  hint: 'If stuck, re-read the Hussainara Khatoon case summary in c11_leg_cbse_13_003 and the LSA Act.',
                  misconception: 'Students believe "Legal Aid = Free Lawyer for Court Cases Only".' }
          ],
            remediations: { 'legal-aid-free-lawyer-for': { steps: ['If a student holds the above misconception: (1) Ask them to read Section 12 and Section 2(1)(c) of the Act — highlight.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_14_004', difficulty: 'standard',
          question: 'Legal Services refers to the statutory framework under the Legal Services.',
          hint: 'If stuck on eligibility categories, revisit Class 11 Child Rights node.',
          misconception: 'Students consistently confuse the *Supreme Court Legal Aid Committee\'s* income criteria (₹18,000 for poor / ₹1,20,000.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the composition and appointment process of NALSA (National Legal Services Authority) vs SLSA (State Legal Services Authority) as per the.', answer: 'Correct answer: NALSA: Patron-in-Chief = Chief Justice of India',
                  options: ['Correct answer: NALSA: Patron-in-Chief = Chief Justice of India', 'Both headed by CJI', 'State Government appoints SLSA Chairman directly'],
                  hint: 'If stuck on eligibility categories, revisit Class 11 Child Rights node (c11_leg_cbse_13_004).',
                  misconception: 'Students consistently confuse the *Supreme Court Legal Aid Committee\'s* income criteria (₹18,000 for poor / ₹1,20,000 for middle income.' }
          ],
            remediations: { 'students-consistently-confuse-the-supreme': { steps: ['Create a two-column table: "Supreme Court Legal Aid Committee (Unit 1)" vs "Legal Services Authorities Act Section.', 'Memorize the mnemonic: "Act = 9/12 (low), Committee = 18/120 (high)".', 'Practice writing the distinction in 30 words: "Statutory aid (Act) has lower income ceilings (₹9k/₹12k) for wider court.', 'Re-attempt Diagnostic Q1 and Q3.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_14_005', difficulty: 'standard',
          question: 'Legal Services in India refer to the statutory framework under the Legal.',
          hint: 'If stuck on eligibility mapping, review the Section 12 text in c12_leg_cbse_14_002 and.',
          misconception: 'Students believe legal aid is only "a free lawyer for criminal cases." In reality, the Act covers civil, family.',
          parts: [
                { id: 'a', prompt: 'List the seven categories of persons entitled to free legal services under Section 12 of the Legal Services Authorities Act, 1987.', answer: 'The seven categories under Section 12 are: (a) member of SC/ST, (b) victim of',
                  options: ['The seven categories under Section 12 are: (a) member of SC/ST, (b) victim of', 'industrial workman', 'income threshold', 'poor people'],
                  hint: 'If stuck on eligibility mapping, review the Section 12 text in c12_leg_cbse_14_002 and the.',
                  misconception: 'Students believe legal aid is only "a free lawyer for criminal cases." In reality, the Act covers civil, family, consumer, and.' },
                { id: 'b', prompt: 'Explain the difference between a regular Lok Adalat and a Permanent Lok Adalat in terms of jurisdiction, stage of dispute, and binding nature of award.', answer: 'Regular Lok Adalat: settles any pending court case or pre-litigation dispute',
                  options: ['Regular Lok Adalat: settles any pending court case or pre-litigation dispute', 'both are same', 'Permanent Lok Adalat handles all disputes', 'a free lawyer for criminal cases'],
                  hint: 'If stuck on eligibility mapping, review the Section 12 text in c12_leg_cbse_14_002 and the.',
                  misconception: 'Students believe legal aid is only "a free lawyer for criminal cases." In reality, the Act covers civil, family, consumer, and.' },
                { id: 'c', prompt: 'Analyze why the 2002 Amendment introduced Permanent Lok Adalats specifically for "public utility services" rather than extending regular Lok Adalats.', answer: 'The 1987 Act\'s Lok Adalats were voluntary and required both parties\' consent',
                  options: ['The 1987 Act\'s Lok Adalats were voluntary and required both parties\' consent', 'a free lawyer for criminal cases', 'legal aid is only "a free lawyer for criminal cases'],
                  hint: 'If stuck on eligibility mapping, review the Section 12 text in c12_leg_cbse_14_002 and the.',
                  misconception: 'Students believe legal aid is only "a free lawyer for criminal cases." In reality, the Act covers civil, family, consumer, and.' }
          ],
            remediations: { 'legal-aid-is-only-a': { steps: ['Have the student re-read Section 12 of the Legal Services Authorities Act, 1987 (text in c12_leg_cbse_14_004) and.', 'Give them 5 fact scenarios (e.g., "widowed mother denied pension," "factory worker injured," "slum dweller\'s.', 'Show a 2-minute video of a Permanent Lok Adalat hearing (available on NALSA YouTube) to visualize the pre-litigation.', 'Assign the worked example in c12_leg_cbse_14_004 on drafting a legal aid application.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_14_006', difficulty: 'standard',
          question: 'Legal Services refers to the statutory framework under the Legal Services.',
          hint: 'If stuck, revisit **c11_leg_cbse_04_006** (Salient Features of Constitution — Critical.',
          misconception: 'Students believe **"Legal aid is only for criminal cases"** because Section 304 CrPC (free lawyer in sessions trials).',
          parts: [
                { id: 'a', prompt: 'Explain why the Legal Services Authorities Act, 1987 was enacted despite Article 39A already existing in the Constitution since 1976.', answer: 'Article 39A is a Directive Principle (Part IV), which is non-justiciable',
                  options: ['Article 39A is a Directive Principle (Part IV), which is non-justiciable', 'Article 39A wasn\'t strong enough', 'Legal aid is only for criminal cases'],
                  hint: 'If stuck, revisit **c11_leg_cbse_04_006** (Salient Features of Constitution — Critical Analysis).',
                  misconception: 'Students believe **"Legal aid is only for criminal cases"** because Section 304 CrPC (free lawyer in sessions trials) is taught prominently.' },
                { id: 'b', prompt: 'A 65-year-old widow in Mumbai (annual income ₹1.1 lakh) is denied maintenance by her son.', answer: 'The rejection is **incorrect**',
                  options: ['The rejection is **incorrect**', 'Legal aid is only for criminal cases'],
                  hint: 'If stuck, revisit **c11_leg_cbse_04_006** (Salient Features of Constitution — Critical Analysis).',
                  misconception: 'Students believe **"Legal aid is only for criminal cases"** because Section 304 CrPC (free lawyer in sessions trials) is taught prominently.' }
          ],
            remediations: { 'legal-aid-is-only-for': { steps: ['If a student makes the above error: 1.', '**Re-read Section 12 of LSA Act, 1987** — highlight categories (a) to (h) and circle that (h) is the *only*.', '**Solve 3 caselets**: (i) SC man earning ₹50,000 — eligible?', '(Yes, 12a); (ii) General category man earning ₹8,000 — eligible?'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
