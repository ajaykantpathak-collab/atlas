import type { SimDef } from '../../engine/types';

/** v3 generated — c12_leg_ch13 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_leg_ch13: SimDef = {
    id: 'v3_c12_leg_ch13',
    title: 'Legal Profession in India',
    subtitle: 'Covers: history of legal profession, Advocates Act 1961 key provisions, categories.',
    classLevel: 12, subject: 'leg', topic: 'Legal Profession in India',
    chapters: ['c12_leg_ch13'],
    nodeIds: ['c12_leg_cbse_13_001', 'c12_leg_cbse_13_002', 'c12_leg_cbse_13_003', 'c12_leg_cbse_13_004', 'c12_leg_cbse_13_005', 'c12_leg_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'You\'re a Class 12 student dreaming of arguing in the Supreme Court one day — but where do you even start?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Compare and contrast the roles, eligibility, and restrictions of a Senior Advocate versus an Advocate-on-Record (AOR) in the Supreme Court of India.',
        options: ['Senior Advocate: designated by SC/HC based on ability/standing', 'both can file in SC', 'LLB degree = lawyer'],
        answer: 'Senior Advocate: designated by SC/HC based on ability/standing',
        hook: 'Students believe "LLB degree = lawyer." They see "LLB" on a visiting card and assume the person can argue in court.',
    },
    teaching: [
        { title: 'Legal Profession in India — Key Concepts and Institutions', text: 'The legal profession in India is a regulated occupation governed by the Advocates Act, 1961, where only enrolled advocates — who hold an LLB degree, are 21+ years old, are Indian citizens, and have.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_leg_cbse_13_001', title: 'Legal Profession in India — Key Concepts and Institutions',
          caseStudy: { intro: 'You\'re a Class 12 student dreaming of arguing in the Supreme Court one day — but where do you even start?',
            decisions: [{ prompt: 'What is the minimum educational qualification required for enrollment as an advocate under the Advocates Act, 1961?', options: [
                { text: 'An LLB degree from a recognized Indian university (or a foreign degree recognized by BCI)', outcome: 'An LLB degree from a recognized Indian university (or a foreign degree recognized by BCI).' },
                { text: 'BA LLB', outcome: 'Not quite — Students believe "LLB degree = lawyer." They see "LLB" on a visiting card and assume the person can.', reveals: 'llb-degree-lawyer' },
                { text: 'LLB degree = lawyer', outcome: 'Not quite — Students believe "LLB degree = lawyer." They see "LLB" on a visiting card and assume the person can.', reveals: 'llb-degree-lawyer' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_13_002', title: 'Legal Profession in India — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start by asking: "You have just finished your 5-year integrated law degree — can you walk into the Supreme Court and argue a case tomorrow?" Most students will.',
            decisions: [{ prompt: 'What is the single category of legal practitioners recognised under the Advocates Act, 1961, and what were the old categories it replaced?', options: [
                { text: 'The Advocates Act, 1961 recognises only one category: "Advocate." It abolished and', outcome: 'The Advocates Act, 1961 recognises only one category: "Advocate." It abolished and consolidated the.' },
                { text: 'Senior Advocate', outcome: 'Not quite — Students often believe that "Advocate-on-Record (AOR)" is a higher rank than "Senior Advocate".', reveals: 'advocate-on-record-aor-is' },
                { text: 'Advocate-on-Record', outcome: 'Not quite — Students often believe that "Advocate-on-Record (AOR)" is a higher rank than "Senior Advocate".', reveals: 'advocate-on-record-aor-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_13_003', title: 'Legal Profession in India — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start by asking: "Why did a lawyer in 1950s Madras need a different licence to argue in Bombay High Court, but today an advocate from Kerala can walk into the.',
            decisions: [{ prompt: 'What was the single category of legal practitioners created by the Advocates Act, 1961, replacing all previous titles like vakil.', options: [
                { text: 'The Advocates Act, 1961 created a single category called "Advocate."', outcome: 'The Advocates Act, 1961 created a single category called "Advocate." A wrong answer (e.g., "Senior.' },
                { text: 'Advocate', outcome: 'Not quite — Students believe "Senior Advocate" and "Advocate-on-Record" are hierarchical steps — i.e., you.', reveals: 'senior-advocate-and-advocate-on' },
                { text: 'Senior Advocate', outcome: 'Not quite — Students believe "Senior Advocate" and "Advocate-on-Record" are hierarchical steps — i.e., you.', reveals: 'senior-advocate-and-advocate-on' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_13_004', title: 'Legal Profession in India — Processes and Procedures',
          caseStudy: { intro: 'Start with this scenario: "Arjun just finished his 5-year B.A. LL.B. from a National Law University.',
            decisions: [{ prompt: 'What single category of legal practitioners was created by the Advocates Act, 1961, replacing all previous categories like vakils.', options: [
                { text: 'The Advocates Act, 1961 created a single unified category called "advocate" (Section 2(a))', outcome: 'The Advocates Act, 1961 created a single unified category called "advocate" (Section 2(a)).' },
                { text: 'senior advocate', outcome: 'Not quite — Students believe "Senior Advocate" is a seniority-based promotion like a job promotion — that after.', reveals: 'senior-advocate-is-a-seniority' },
                { text: 'barrister', outcome: 'Not quite — Students believe "Senior Advocate" is a seniority-based promotion like a job promotion — that after.', reveals: 'senior-advocate-is-a-seniority' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_13_005', title: 'Legal Profession in India — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'You\'re a Class 12 student who just watched a courtroom drama where a lawyer dramatically says "I object!" and the judge sustains it.',
            decisions: [{ prompt: 'What is the single category of legal practitioners recognized under the Advocates Act, 1961, and what are the three eligibility criteria.', options: [
                { text: 'The single category is "Advocate." Eligibility: (1) Citizen of India, (2) At least 21', outcome: 'The single category is "Advocate." Eligibility: (1) Citizen of India, (2) At least 21 years old.' },
                { text: 'barrister', outcome: 'Not quite — Students often believe the *Bar Council of India* directly enrolls advocates and handles *all*.', reveals: 'the-bar-council-of-india' },
                { text: 'pleader', outcome: 'Not quite — Students often believe the *Bar Council of India* directly enrolls advocates and handles *all*.', reveals: 'the-bar-council-of-india' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_13_006', title: 'Legal Profession in India — Critical Analysis and Application',
          caseStudy: { intro: 'Start by asking: "You\'ve finished your 5-year B.A. LL.B. — what exactly stands between you and arguing a case in the Supreme Court?" Most students think the.',
            decisions: [{ prompt: 'What single category of legal practitioners was created by the Advocates Act, 1961 by consolidating vakils, barristers, pleaders, and.', options: [
                { text: 'The Advocates Act, 1961 created the unified category of "advocates." A wrong answer', outcome: 'The Advocates Act, 1961 created the unified category of "advocates." A wrong answer (e.g.' },
                { text: 'advocates', outcome: 'Not quite — Students believe that "Senior Advocate" is a promotion based on years of practice (like a senior.', reveals: 'senior-advocate-is-a-promotion' },
                { text: 'lawyers', outcome: 'Not quite — Students believe that "Senior Advocate" is a promotion based on years of practice (like a senior.', reveals: 'senior-advocate-is-a-promotion' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_13_003', title: 'Legal Profession in India — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start by asking: "Why did a lawyer in 1950s Madras need a different licence to argue in Bombay High Court, but today an advocate from Kerala can walk into the.',
            decisions: [{ prompt: 'What was the single category of legal practitioners created by the Advocates Act, 1961, replacing all previous titles like vakil.', options: [
                { text: 'The Advocates Act, 1961 created a single category called "Advocate."', outcome: 'The Advocates Act, 1961 created a single category called "Advocate." A wrong answer (e.g., "Senior.' },
                { text: 'Advocate', outcome: 'Not quite — Students believe "Senior Advocate" and "Advocate-on-Record" are hierarchical steps — i.e., you.', reveals: 'senior-advocate-and-advocate-on' },
                { text: 'Senior Advocate', outcome: 'Not quite — Students believe "Senior Advocate" and "Advocate-on-Record" are hierarchical steps — i.e., you.', reveals: 'senior-advocate-and-advocate-on' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_leg_cbse_13_002', title: 'Identify each idea',
          dissect: { specimen: 'Legal Profession in India', spots: [
            { id: 's1', label: 'Legal Profession in India Key Concepts and Institutions', prompt: 'Which idea is this? — The legal profession in India is a regulated occupation governed by the Advocates Act.', answer: 'Legal Profession in India Key Concepts and Institutions', options: ['Legal Profession in India Key Concepts and Institutions', 'Legal Profession in India Landmark Cases and Illustrations', 'Legal Profession in India Processes and Procedures', 'Legal Profession in India Critical Analysis and Application'] },
            { id: 's2', label: 'Legal Profession in India Landmark Cases and Illustrations', prompt: 'Which idea is this? — The Legal Profession in India is a unified, regulated body of legal practitioners.', answer: 'Legal Profession in India Landmark Cases and Illustrations', options: ['Legal Profession in India Landmark Cases and Illustrations', 'Legal Profession in India Key Concepts and Institutions', 'Legal Profession in India Processes and Procedures', 'Legal Profession in India Critical Analysis and Application'] },
            { id: 's3', label: 'Legal Profession in India Processes and Procedures', prompt: 'Which idea is this? — The legal profession in India is a regulated occupation governed by the Advocates Act.', answer: 'Legal Profession in India Processes and Procedures', options: ['Legal Profession in India Processes and Procedures', 'Legal Profession in India Key Concepts and Institutions', 'Legal Profession in India Landmark Cases and Illustrations', 'Legal Profession in India Critical Analysis and Application'] },
            { id: 's4', label: 'Legal Profession in India Critical Analysis and Application', prompt: 'Which idea is this? — The legal profession in India is a unified, regulated vocation governed by the Advocates.', answer: 'Legal Profession in India Critical Analysis and Application', options: ['Legal Profession in India Critical Analysis and Application', 'Legal Profession in India Key Concepts and Institutions', 'Legal Profession in India Landmark Cases and Illustrations', 'Legal Profession in India Processes and Procedures'] }
          ] } },
        { type: 'case', nodeId: 'c12_leg_cbse_13_006', title: 'You made it',
          caseStudy: { intro: 'You finished Legal Profession in India — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_leg_cbse_13_001', difficulty: 'standard',
          question: 'The legal profession in India is a regulated occupation governed by the.',
          hint: 'Review "officers of court" concept from Jurisprudence (c11_leg_cbse_06_001) and court.',
          misconception: 'Students believe "LLB degree = lawyer." They see "LLB" on a visiting card and assume the person can argue in court.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the roles, eligibility, and restrictions of a Senior Advocate versus an Advocate-on-Record (AOR) in the Supreme Court of India.', answer: 'Senior Advocate: designated by SC/HC based on ability/standing',
                  options: ['Senior Advocate: designated by SC/HC based on ability/standing', 'both can file in SC', 'LLB degree = lawyer', 'the person can argue in court'],
                  hint: 'Review "officers of court" concept from Jurisprudence (c11_leg_cbse_06_001) and court hierarchy.',
                  misconception: 'Students believe "LLB degree = lawyer." They see "LLB" on a visiting card and assume the person can argue in court.' }
          ],
            remediations: { 'llb-degree-lawyer': { steps: ['Have the student list the 3 legal requirements to practice (LLB, AIBE, State Bar enrollment) and identify which is the.', 'Show the BCI\'s "Certificate of Practice" specimen and AIBE notification side-by-side with an LLB degree certificate.', 'Assign a mini-research: "Find 3 consequences of practicing without Certificate of Practice" (contempt, invalid.', 'Re-test with Diagnostic Q3 scenario after 2 days.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_13_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "LLB degree = lawyer." They see "LLB" on a visiting card and assume the person can argue in court.',
          parts: [
                { id: 'a', prompt: '"Advertising by lawyers in India should be fully liberalized like in the USA to improve access to justice." Evaluate this statement considering the Bar Council.', answer: 'The statement oversimplifies a nuanced balance',
                  options: ['The statement oversimplifies a nuanced balance', 'ban all ads', 'allow all ads', 'LLB degree = lawyer'],
                  hint: 'Review "officers of court" concept from Jurisprudence (c11_leg_cbse_06_001) and court hierarchy.',
                  misconception: 'Students believe "LLB degree = lawyer." They see "LLB" on a visiting card and assume the person can argue in court.' }
          ],
            remediations: { 'llb-degree-lawyer': { steps: ['Have the student list the 3 legal requirements to practice (LLB, AIBE, State Bar enrollment) and identify which is the.', 'Show the BCI\'s "Certificate of Practice" specimen and AIBE notification side-by-side with an LLB degree certificate.', 'Assign a mini-research: "Find 3 consequences of practicing without Certificate of Practice" (contempt, invalid.', 'Re-test with Diagnostic Q3 scenario after 2 days.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_13_002', difficulty: 'standard',
          question: 'The legal profession in India is a regulated occupation governed by the.',
          hint: 'If stuck, review the hierarchy of courts (Supreme Court → High Courts →.',
          misconception: 'Students often believe that "Advocate-on-Record (AOR)" is a higher rank than "Senior Advocate" because AORs can file.',
          parts: [
                { id: 'a', prompt: 'Explain why a law graduate cannot start practicing in court immediately after obtaining an LL.B. degree, even if they have passed all university exams.', answer: 'An LL.B',
                  options: ['An LL.B', 'Advocate-on-Record (AOR)', 'Senior Advocate'],
                  hint: 'If stuck, review the hierarchy of courts (Supreme Court → High Courts → District/Subordinate.',
                  misconception: 'Students often believe that "Advocate-on-Record (AOR)" is a higher rank than "Senior Advocate" because AORs can file cases in the Supreme.' },
                { id: 'b', prompt: 'A foreign national with a law degree from a UK university wants to practice law in India. Under what conditions can they be enrolled as an advocate?', answer: 'A foreign national can be enrolled only on a *reciprocal basis*',
                  options: ['A foreign national can be enrolled only on a *reciprocal basis*', 'they can practice if they pass AIBE', 'Advocate-on-Record (AOR)', 'Senior Advocate'],
                  hint: 'If stuck, review the hierarchy of courts (Supreme Court → High Courts → District/Subordinate.',
                  misconception: 'Students often believe that "Advocate-on-Record (AOR)" is a higher rank than "Senior Advocate" because AORs can file cases in the Supreme.' },
                { id: 'c', prompt: 'Compare the roles of the Bar Council of India (BCI) and a State Bar Council.', answer: 'The Bar Council of India *recognises universities* whose law degrees qualify for',
                  options: ['The Bar Council of India *recognises universities* whose law degrees qualify for', 'Advocate-on-Record (AOR)', 'Senior Advocate'],
                  hint: 'If stuck, review the hierarchy of courts (Supreme Court → High Courts → District/Subordinate.',
                  misconception: 'Students often believe that "Advocate-on-Record (AOR)" is a higher rank than "Senior Advocate" because AORs can file cases in the Supreme.' }
          ],
            remediations: { 'advocate-on-record-aor-is': { steps: ['If the student confuses AOR with Senior Advocate: (1) Draw a two-column table: Column A — "Senior Advocate: Designated.', '(3) Re-test with a scenario: "Mr.', 'Can he file a writ petition in the SC without an AOR?" (Answer: No — he needs an AOR to file, but he argues it).'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_13_003', difficulty: 'standard',
          question: 'The Legal Profession in India is a unified, regulated body of legal.',
          hint: 'If stuck on "Why one category?", review c12_leg_cbse_13_001 (Key Concepts) section.',
          misconception: 'Students believe "Senior Advocate" and "Advocate-on-Record" are hierarchical steps — i.e., you become a Senior Advocate.',
          parts: [
                { id: 'a', prompt: 'What was the single category of legal practitioners created by the Advocates Act, 1961, replacing all previous titles like vakil, barrister, pleader, and.', answer: 'The Advocates Act, 1961 created a single category called "Advocate."',
                  options: ['The Advocates Act, 1961 created a single category called "Advocate."', 'Advocate', 'Senior Advocate', 'Advocate-on-Record'],
                  hint: 'If stuck on "Why one category?", review c12_leg_cbse_13_001 (Key Concepts) section on "The.',
                  misconception: 'Students believe "Senior Advocate" and "Advocate-on-Record" are hierarchical steps — i.e., you become a Senior Advocate *first*, then.' },
                { id: 'b', prompt: 'Explain in your own words why the distinction between "Senior Advocate" and "Advocate-on-Record" is not merely about seniority but about fundamentally.', answer: 'A Senior Advocate is *designated by the Supreme Court or High Court* based on',
                  options: ['A Senior Advocate is *designated by the Supreme Court or High Court* based on', 'Senior Advocate', 'Advocate-on-Record', 'senior'],
                  hint: 'If stuck on "Why one category?", review c12_leg_cbse_13_001 (Key Concepts) section on "The.',
                  misconception: 'Students believe "Senior Advocate" and "Advocate-on-Record" are hierarchical steps — i.e., you become a Senior Advocate *first*, then.' },
                { id: 'c', prompt: 'Compare the advertising restrictions on advocates in India (Bar Council of India Rules) with those in the USA (Model Rules of Professional Conduct).', answer: 'India: Near-total ban (Rule 36), only 5 facts allowed on website (name, contact,',
                  options: ['India: Near-total ban (Rule 36), only 5 facts allowed on website (name, contact,', 'Senior Advocate', 'Advocate-on-Record', 'senior'],
                  hint: 'If stuck on "Why one category?", review c12_leg_cbse_13_001 (Key Concepts) section on "The.',
                  misconception: 'Students believe "Senior Advocate" and "Advocate-on-Record" are hierarchical steps — i.e., you become a Senior Advocate *first*, then.' }
          ],
            remediations: { 'senior-advocate-and-advocate-on': { steps: ['If the student conflates Senior Advocate and AOR: (1) Draw a 2-column table: Column A = "Source: Court designation (Sec.', 'Column B = "Source: SC exam after training", "Basis: Procedural competence", "Privilege: *Only* one who can file.', '(2) Ask: "Can a Senior Advocate of the Bombay High Court file an SLP in the Supreme Court?" (Answer: No, only an AOR.', '(4) Re-test with Diagnostic Question 3.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_13_004', difficulty: 'standard',
          question: 'The legal profession in India is a regulated occupation governed by the.',
          hint: 'Review the distinction between State Bar Council enrolment (administrative) and BCI\'s.',
          misconception: 'Students believe "Senior Advocate" is a seniority-based promotion like a job promotion — that after 10-15 years.',
          parts: [
                { id: 'a', prompt: 'Meera, an advocate enrolled with the Delhi Bar Council, wants to advertise her services on Instagram with client testimonials and case results.', answer: 'Meera\'s claim fails',
                  options: ['Meera\'s claim fails', 'Senior Advocate'],
                  hint: 'Review the distinction between State Bar Council enrolment (administrative) and BCI\'s AIBE.',
                  misconception: 'Students believe "Senior Advocate" is a seniority-based promotion like a job promotion — that after 10-15 years of practice, you.' }
          ],
            remediations: { 'senior-advocate-is-a-seniority': { steps: ['If the student holds this misconception: (1) Show the exact text of Section 16, Advocates Act — "if in its opinion...', 'the advocate is deserving of such distinction." (2) Contrast with the medical profession: a doctor with 20 years.', '(3) Assign a mini-research: find 3 recent Supreme Court Senior Advocate designations and identify the "special.', '(4) Re-test with a scenario: "Advocate X has 25 years practice but only handles routine bail matters.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_13_005', difficulty: 'standard',
          question: 'The legal profession in India is a unified, regulated system governed by the.',
          hint: 'If confused about advocate categories, revisit c12_leg_cbse_13_001 Section A.1 "Classes.',
          misconception: 'Students often believe the *Bar Council of India* directly enrolls advocates and handles *all* disciplinary cases.',
          parts: [
                { id: 'a', prompt: 'A law graduate from a BCI-recognized university enrolls with the Delhi Bar Council in 2024. She clears the All India Bar Examination in 2025.', answer: 'Yes, she can practice in the Madras High Court immediately',
                  options: ['Yes, she can practice in the Madras High Court immediately', 'she needs permission from Madras Bar Council', 'All India', 'BCI cancels advocate\'s license for misconduct'],
                  hint: 'If confused about advocate categories, revisit c12_leg_cbse_13_001 Section A.1 "Classes.',
                  misconception: 'Students often believe the *Bar Council of India* directly enrolls advocates and handles *all* disciplinary cases.' }
          ],
            remediations: { 'the-bar-council-of-india': { steps: ['Re-read c12_leg_cbse_13_001 (Key Concepts) Section A.2 "Bar Council of India" and A.3 "State Bar Councils" — make.', '*Body Responsible* (Enrollment, Discipline-first instance, Discipline-appeal, Legal Education Standards, Welfare Funds).', 'Watch a 10-min video on "Advocate-on-Record vs Senior Advocate" (search "AOR exam Supreme Court").', 'Solve this: "Advocate X (enrolled 2020, Karnataka) commits misconduct in 2024.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_13_006', difficulty: 'standard',
          question: 'The legal profession in India is a unified, regulated vocation governed by the.',
          hint: 'If stuck on the advertising debate, revisit c11_leg_cbse_04_006 (Constitutional critical.',
          misconception: 'Students believe that "Senior Advocate" is a promotion based on years of practice (like a senior associate in a law.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The legal profession in India is a unified, regulated vocation governed by the Advocates',
                  options: ['The legal profession in India is a unified, regulated vocation governed by the Advocates', 'The legal profession in India is a regulated occupation governed by the Advocates Act,', 'The legal profession in India is a regulated occupation governed by the Advocates Act,', 'The Legal Profession in India is a unified, regulated body of legal practitioners'],
                  hint: 'If stuck on the advertising debate, revisit c11_leg_cbse_04_006 (Constitutional critical analysis).',
                  misconception: 'Students believe that "Senior Advocate" is a promotion based on years of practice (like a senior associate in a law firm).' }
          ],
            remediations: { 'senior-advocate-is-a-promotion': { steps: ['Re-read Section 16 of the Advocates Act, 1961 and the Supreme Court\'s 2018 guidelines for Senior Advocate designation.', 'Create a comparison table: "Senior Advocate vs.', 'Ordinary Advocate" with columns: Designation Authority, Eligibility Criteria, Privileges, Restrictions.', 'Watch a 10-minute video of a Senior Advocate designation ceremony (available on Supreme Court YouTube channel).'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
