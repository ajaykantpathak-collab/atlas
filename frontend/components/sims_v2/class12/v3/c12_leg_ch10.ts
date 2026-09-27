import type { SimDef } from '../../engine/types';

/** v3 generated — c12_leg_ch10 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_leg_ch10: SimDef = {
    id: 'v3_c12_leg_ch10',
    title: 'Human Rights in India',
    subtitle: 'This node covers the meaning, historical evolution, and international framework of human.',
    classLevel: 12, subject: 'leg', topic: 'Human Rights in India',
    chapters: ['c12_leg_ch10'],
    nodeIds: ['c12_leg_cbse_10_001', 'c12_leg_cbse_10_002', 'c12_leg_cbse_10_003', 'c12_leg_cbse_10_004', 'c12_leg_cbse_10_005', 'c12_leg_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a relatable scenario: "You\'re travelling abroad and get detained unfairly — what rights protect.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A foreign tourist in India is denied entry to a public park based on nationality. Which rights are violated — human rights, fundamental rights, or both?',
        options: ['Both', 'only human rights', 'human rights = fundamental rights'],
        answer: 'Both',
        hook: 'Students think "human rights = fundamental rights" because both use similar language (e.g., "right to life").',
    },
    teaching: [
        { title: 'Human Rights in India — Key Concepts and Institutions', text: 'Human rights are universal, inalienable entitlements inherent to all human beings by virtue of their humanity, regardless of nationality, race, gender, or status, encompassing civil, political.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_leg_cbse_10_001', title: 'Human Rights in India — Key Concepts and Institutions',
          caseStudy: { intro: 'Start with a relatable scenario: "You\'re travelling abroad and get detained unfairly — what rights protect you?" This hooks students into the *universality*.',
            decisions: [{ prompt: 'What is the core difference between human rights and fundamental rights in terms of their scope and enforceability?', options: [
                { text: 'Human rights are universal (apply to all humans globally) and derive from international', outcome: 'Human rights are universal (apply to all humans globally) and derive from international law (UDHR.' },
                { text: 'human rights = fundamental rights', outcome: 'Not quite — Students think "human rights = fundamental rights" because both use similar language (e.g., "right.', reveals: 'human-rights-fundamental-rights-because' },
                { text: 'right to life', outcome: 'Not quite — Students think "human rights = fundamental rights" because both use similar language (e.g., "right.', reveals: 'human-rights-fundamental-rights-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_10_002', title: 'Human Rights in India — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with a real scenario: "A daily wage worker is detained by police for 3 days without being produced before a magistrate.',
            decisions: [{ prompt: 'What is the constitutional basis for the establishment of the National Human Rights Commission (NHRC)?', options: [
                { text: 'The NHRC is established under the Protection of Human Rights Act, 1993 (a statutory', outcome: 'The NHRC is established under the Protection of Human Rights Act, 1993 (a statutory body), not.' },
                { text: 'Article 338', outcome: 'Not quite — Students often believe the NHRC is a *court* that can *punish* guilty officials or *order*.', reveals: 'the-nhrc-is-a-court' },
                { text: 'Part III of Constitution', outcome: 'Not quite — Students often believe the NHRC is a *court* that can *punish* guilty officials or *order*.', reveals: 'the-nhrc-is-a-court' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_10_004', title: 'Human Rights in India — Processes and Procedures',
          caseStudy: { intro: 'Start with a real headline: "14-year-old domestic worker rescued in Delhi after neighbour\'s call to 1098." Ask: "Who actually investigates and orders.',
            decisions: [{ prompt: 'What is the statutory time limit for filing a complaint with the National Human Rights Commission (NHRC) after the alleged human rights.', options: [
                { text: 'The complaint must be filed within **one year** from the date on', outcome: 'The complaint must be filed within **one year** from the date on which the act constituting the.' },
                { text: 'no time limit', outcome: 'Not quite — Students believe **"Any human rights violation can be taken to NHRC"** and **"NHRC\'s order.', reveals: 'any-human-rights-violation-can' },
                { text: 'three years', outcome: 'Not quite — Students believe **"Any human rights violation can be taken to NHRC"** and **"NHRC\'s order.', reveals: 'any-human-rights-violation-can' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_10_005', title: 'Human Rights in India — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'Start with a real headline: "Supreme Court takes suo motu cognisance of mid-day meal disruption during COVID." Ask: "Which Article did the Court invoke?',
            decisions: [{ prompt: 'Define \'Human Rights\' as per the NCERT Class 12 Legal Studies textbook.', options: [
                { text: 'Human Rights are basic rights inherent to all human beings by virtue of their humanity,', outcome: 'Human Rights are basic rights inherent to all human beings by virtue of their humanity, universal.' },
                { text: 'Fundamental Rights are universal', outcome: 'Not quite — Students think **NHRC can punish the guilty**. It cannot. NHRC has *civil court powers* (summon.', reveals: 'nhrc-can-punish-the-guilty' },
                { text: 'Human Rights are granted by the Constitution', outcome: 'Not quite — Students think **NHRC can punish the guilty**. It cannot. NHRC has *civil court powers* (summon.', reveals: 'nhrc-can-punish-the-guilty' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_10_004', title: 'Human Rights in India — Processes and Procedures',
          caseStudy: { intro: 'Start with a real headline: "14-year-old domestic worker rescued in Delhi after neighbour\'s call to 1098." Ask: "Who actually investigates and orders.',
            decisions: [{ prompt: 'What is the statutory time limit for filing a complaint with the National Human Rights Commission (NHRC) after the alleged human rights.', options: [
                { text: 'The complaint must be filed within **one year** from the date on', outcome: 'The complaint must be filed within **one year** from the date on which the act constituting the.' },
                { text: 'no time limit', outcome: 'Not quite — Students believe **"Any human rights violation can be taken to NHRC"** and **"NHRC\'s order.', reveals: 'any-human-rights-violation-can' },
                { text: 'three years', outcome: 'Not quite — Students believe **"Any human rights violation can be taken to NHRC"** and **"NHRC\'s order.', reveals: 'any-human-rights-violation-can' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_leg_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'Human Rights in India', spots: [
            { id: 's1', label: 'Human Rights in India Key Concepts and Institutions', prompt: 'Which idea is this? — Human rights are universal, inalienable entitlements inherent to all human beings.', answer: 'Human Rights in India Key Concepts and Institutions', options: ['Human Rights in India Key Concepts and Institutions', 'Human Rights in India Constitutional and Legal Provisions', 'Human Rights in India Landmark Cases and Illustrations', 'Human Rights in India Processes and Procedures'] },
            { id: 's2', label: 'Human Rights in India Constitutional and Legal Provisions', prompt: 'Which idea is this? — Human Rights in India are constitutionally guaranteed entitlements derived from Part III.', answer: 'Human Rights in India Constitutional and Legal Provisions', options: ['Human Rights in India Constitutional and Legal Provisions', 'Human Rights in India Key Concepts and Institutions', 'Human Rights in India Landmark Cases and Illustrations', 'Human Rights in India Processes and Procedures'] },
            { id: 's3', label: 'Human Rights in India Landmark Cases and Illustrations', prompt: 'Which idea is this? — A landmark case in Indian human rights jurisprudence is a Supreme Court or High Court.', answer: 'Human Rights in India Landmark Cases and Illustrations', options: ['Human Rights in India Landmark Cases and Illustrations', 'Human Rights in India Key Concepts and Institutions', 'Human Rights in India Constitutional and Legal Provisions', 'Human Rights in India Processes and Procedures'] },
            { id: 's4', label: 'Human Rights in India Processes and Procedures', prompt: 'Which idea is this? — Processes and Procedures in Human Rights refer to the institutional mechanisms.', answer: 'Human Rights in India Processes and Procedures', options: ['Human Rights in India Processes and Procedures', 'Human Rights in India Key Concepts and Institutions', 'Human Rights in India Constitutional and Legal Provisions', 'Human Rights in India Landmark Cases and Illustrations'] },
            { id: 's5', label: 'Human Rights in India Exam-Oriented Questions and Answers', prompt: 'Which idea is this? — Human Rights in India are the basic, universal, and inalienable entitlements guaranteed.', answer: 'Human Rights in India Exam-Oriented Questions and Answers', options: ['Human Rights in India Exam-Oriented Questions and Answers', 'Human Rights in India Key Concepts and Institutions', 'Human Rights in India Constitutional and Legal Provisions', 'Human Rights in India Landmark Cases and Illustrations'] },
            { id: 's6', label: 'Human Rights in India Critical Analysis and Application', prompt: 'Which idea is this? — Critical analysis and application of human rights in India involves evaluating the gap.', answer: 'Human Rights in India Critical Analysis and Application', options: ['Human Rights in India Critical Analysis and Application', 'Human Rights in India Key Concepts and Institutions', 'Human Rights in India Constitutional and Legal Provisions', 'Human Rights in India Landmark Cases and Illustrations'] }
          ] } },
        { type: 'case', nodeId: 'c12_leg_cbse_10_006', title: 'You made it',
          caseStudy: { intro: 'You finished Human Rights in India — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_leg_cbse_10_001', difficulty: 'standard',
          question: 'Human rights are universal, inalienable entitlements inherent to all human.',
          hint: 'If confused about which rights are fundamental vs. directive, review the "Fundamental.',
          misconception: 'Students think "human rights = fundamental rights" because both use similar language (e.g., "right to life").',
          parts: [
                { id: 'a', prompt: 'A foreign tourist in India is denied entry to a public park based on nationality. Which rights are violated — human rights, fundamental rights, or both?', answer: 'Both',
                  options: ['Both', 'only human rights', 'human rights = fundamental rights', 'right to life'],
                  hint: 'If confused about which rights are fundamental vs. directive, review the "Fundamental Rights.',
                  misconception: 'Students think "human rights = fundamental rights" because both use similar language (e.g., "right to life").' },
                { id: 'b', prompt: 'Compare the enforceability of Directive Principles (Part IV) vs.', answer: 'Fundamental Rights are justiciable (enforceable in courts)',
                  options: ['Fundamental Rights are justiciable (enforceable in courts)', 'never enforceable', 'human rights = fundamental rights', 'right to life'],
                  hint: 'If confused about which rights are fundamental vs. directive, review the "Fundamental Rights.',
                  misconception: 'Students think "human rights = fundamental rights" because both use similar language (e.g., "right to life").' }
          ],
            remediations: { 'human-rights-fundamental-rights-because': { steps: ['Re-read the "Difference between Fundamental Rights and Human Rights" table in NCERT (p.', '129-130) — focus on the three columns: Meaning, Scope, Enforceability.', 'Create a two-column table: Left = Human Right (UDHR article), Right = Corresponding Fundamental Right (Indian.', 'Fill 5 rows (e.g., UDHR Art.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "human rights = fundamental rights" because both use similar language (e.g., "right to life").',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "The Universal Declaration of Human Rights (UDHR) is legally binding on all UN member states, including India."', answer: 'The statement is false',
                  options: ['The statement is false', 'binding', 'human rights = fundamental rights', 'right to life'],
                  hint: 'If confused about which rights are fundamental vs. directive, review the "Fundamental Rights.',
                  misconception: 'Students think "human rights = fundamental rights" because both use similar language (e.g., "right to life").' }
          ],
            remediations: { 'human-rights-fundamental-rights-because': { steps: ['Re-read the "Difference between Fundamental Rights and Human Rights" table in NCERT (p.', '129-130) — focus on the three columns: Meaning, Scope, Enforceability.', 'Create a two-column table: Left = Human Right (UDHR article), Right = Corresponding Fundamental Right (Indian.', 'Fill 5 rows (e.g., UDHR Art.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_10_002', difficulty: 'standard',
          question: 'Human Rights in India are constitutionally guaranteed entitlements derived from.',
          hint: 'If confused about which rights are enforceable vs aspirational, revisit the "Directive.',
          misconception: 'Students often believe the NHRC is a *court* that can *punish* guilty officials or *order* compensation directly.',
          parts: [
                { id: 'a', prompt: 'Explain why the NHRC\'s recommendations are not binding on the government, and identify the specific provision in the Protection of Human Rights Act, 1993 that.', answer: 'The NHRC is a recommendatory body',
                  options: ['The NHRC is a recommendatory body', 'NHRC orders are binding like court judgments', 'Can NHRC punish a police officer?'],
                  hint: 'If confused about which rights are enforceable vs aspirational, revisit the "Directive Principles.',
                  misconception: 'Students often believe the NHRC is a *court* that can *punish* guilty officials or *order* compensation directly.' },
                { id: 'b', prompt: 'A 14-year-old child is rescued from a factory where they were forced to work 14 hours daily. The child\'s parents are daily wage earners earning ₹8,000/month.', answer: 'The child qualifies under: (c) "a woman or a child" [Section 12(c)]',
                  options: ['The child qualifies under: (c) "a woman or a child" [Section 12(c)]', 'Can NHRC punish a police officer?'],
                  hint: 'If confused about which rights are enforceable vs aspirational, revisit the "Directive Principles.',
                  misconception: 'Students often believe the NHRC is a *court* that can *punish* guilty officials or *order* compensation directly.' }
          ],
            remediations: { 'the-nhrc-is-a-court': { steps: ['If the student conflates NHRC\'s inquiry powers with judicial powers: (1) Re-read Section 13 (Powers) vs Section 18.', '(2) Create a two-column table: "Power *During* Inquiry" (summon, documents, affidavits, jail visits) vs "Power *After*.', '(3) Practice the Board-style question: "Distinguish between the NHRC and a Criminal Court in terms of (a) power.', 'If still stuck, revisit Node **c12_leg_cbse_10_001** (Key Concepts) for the definition of "quasi-judicial body".'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_10_003', difficulty: 'standard',
          question: 'A landmark case in Indian human rights jurisprudence is a Supreme Court or High.',
          hint: 'If stuck on identifying the ratio decidendi, review the "Judgment" and "Rationale".',
          misconception: 'Students often treat *all* Supreme Court cases mentioned in the textbook as "landmark" with equal weight.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the Supreme Court in *Maneka Gandhi v.', answer: 'The Court ruled that Articles 14, 19, and 21 form a "Golden Triangle"',
                  options: ['The Court ruled that Articles 14, 19, and 21 form a "Golden Triangle"', 'Article 21 includes due process'],
                  hint: 'If stuck on identifying the ratio decidendi, review the "Judgment" and "Rationale" sections.',
                  misconception: 'Students often treat *all* Supreme Court cases mentioned in the textbook as "landmark" with equal weight.' }
          ],
            remediations: { 'students-often-treat-all-supreme': { steps: ['Make a two-column table — Column A: "Human Rights Principle Established" (e.g., speedy trial, procedural fairness.', 'For each case in NCERT Chapter 10, fill Column B only if it created a *new human rights principle*.', 'Re-attempt Diagnostic Questions 1, 4, and 6 using only the filtered list.', 'If still stuck, revisit **c12_leg_cbse_10_001** (Key Concepts) for the definition of "human rights" vs.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_10_004', difficulty: 'standard',
          question: 'Processes and Procedures in Human Rights refer to the institutional mechanisms.',
          hint: 'If stuck on "why can\'t NHRC punish?", revisit c11_leg_cbse_05_004 (Administrative Law.',
          misconception: 'Students believe **"Any human rights violation can be taken to NHRC"** and **"NHRC\'s order is binding like a court.',
          parts: [
                { id: 'a', prompt: 'What is the statutory time limit for filing a complaint with the National Human Rights Commission (NHRC) after the alleged human rights violation occurs?', answer: 'The complaint must be filed within **one year** from the date on',
                  options: ['The complaint must be filed within **one year** from the date on', 'no time limit', 'three years', 'Any human rights violation can be taken to NHRC'],
                  hint: 'If stuck on "why can\'t NHRC punish?", revisit c11_leg_cbse_05_004 (Administrative Law — Processes.',
                  misconception: 'Students believe **"Any human rights violation can be taken to NHRC"** and **"NHRC\'s order is binding like a court judgment"**.' },
                { id: 'b', prompt: 'A student writes: "The NHRC can punish a police officer who tortured a detainee by sending him to jail for two years." Explain why this statement is legally.', answer: 'The NHRC **cannot punish or send anyone to jail**',
                  options: ['The NHRC **cannot punish or send anyone to jail**', 'quasi-judicial powers of inquiry', 'judicial powers of punishment', 'Any human rights violation can be taken to NHRC'],
                  hint: 'If stuck on "why can\'t NHRC punish?", revisit c11_leg_cbse_05_004 (Administrative Law — Processes.',
                  misconception: 'Students believe **"Any human rights violation can be taken to NHRC"** and **"NHRC\'s order is binding like a court judgment"**.' }
          ],
            remediations: { 'any-human-rights-violation-can': { steps: ['If a student exhibits the above misconception: 1.', '**Show the statutory text**: Read aloud Section 12 (PHRA, 1993) — "public servant" is the *sine qua non* for NHRC.', 'Ask: "Is a husband a public servant?', 'Is a private factory owner?" 2.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_10_005', difficulty: 'standard',
          question: 'Human Rights in India are the basic, universal, and inalienable entitlements.',
          hint: 'If stuck on enforcement hierarchy: Revisit c12_leg_cbse_10_004 (complaint mechanisms) and.',
          misconception: 'Students think **NHRC can punish the guilty**. It cannot. NHRC has *civil court powers* (summon, evidence, documents).',
          parts: [
                { id: 'a', prompt: 'Explain why Article 21 (\'procedure established by law\') was interpreted to include \'due process of law\' (fair, just, reasonable procedure) in *Maneka Gandhi v.', answer: 'The Court held that a law depriving personal liberty must satisfy Arts',
                  options: ['The Court held that a law depriving personal liberty must satisfy Arts', 'Article 21 alone is enough', 'due process was in the original Constitution', 'quasi-judicial powers'],
                  hint: 'If stuck on enforcement hierarchy: Revisit c12_leg_cbse_10_004 (complaint mechanisms) and.',
                  misconception: 'Students think **NHRC can punish the guilty**. It cannot. NHRC has *civil court powers* (summon, evidence, documents) but *only recommends*.' },
                { id: 'b', prompt: 'A 14-year-old child is employed in a hazardous factory. The employer claims the child\'s parents consented.', answer: 'Violations: Art',
                  options: ['Violations: Art', 'quasi-judicial powers', 'judicial powers', '**NHRC can punish the guilty**'],
                  hint: 'If stuck on enforcement hierarchy: Revisit c12_leg_cbse_10_004 (complaint mechanisms) and.',
                  misconception: 'Students think **NHRC can punish the guilty**. It cannot. NHRC has *civil court powers* (summon, evidence, documents) but *only recommends*.' },
                { id: 'c', prompt: 'Compare the complaint mechanisms of NHRC and NCW. On what grounds can NHRC reject a complaint that NCW might entertain, and vice versa?', answer: 'NHRC (Sec',
                  options: ['NHRC (Sec', 'both have identical grounds', 'quasi-judicial powers', 'judicial powers'],
                  hint: 'If stuck on enforcement hierarchy: Revisit c12_leg_cbse_10_004 (complaint mechanisms) and.',
                  misconception: 'Students think **NHRC can punish the guilty**. It cannot. NHRC has *civil court powers* (summon, evidence, documents) but *only recommends*.' }
          ],
            remediations: { 'nhrc-can-punish-the-guilty': { steps: ['Re-read the \'Powers of the Commission\' section in c12_leg_cbse_10_004 (Processes and Procedures) — note the phrase.', 'Create a two-column table: NHRC Powers (Civil Court) vs.', 'NHRC Limitations (No binding order, no punishment).', 'Solve Diagnostic Question 6 again, explicitly stating "NHRC recommends; High Court orders".'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_10_006', difficulty: 'standard',
          question: 'Critical analysis and application of human rights in India involves evaluating.',
          hint: 'If stuck on "why NHRC can\'t punish" — review **Art. 50 (Separation of Judiciary from.',
          misconception: 'Students believe: **"If a right is in the Constitution (Art. 14, 19, 21), it is *automatically enforced* — the Court.',
          parts: [
                { id: 'a', prompt: 'Explain why the NHRC *cannot* directly punish a police officer for custodial torture — even after finding guilt — and name the *exact* constitutional provision.', answer: 'The NHRC (under Protection of Human Rights Act, 1993, Sec',
                  options: ['The NHRC (under Protection of Human Rights Act, 1993, Sec', 'NHRC can order suspension', 'powers of commissions'],
                  hint: 'If stuck on "why NHRC can\'t punish" — review **Art. 50 (Separation of Judiciary from Executive)**.',
                  misconception: 'Students believe: **"If a right is in the Constitution (Art. 14, 19, 21), it is *automatically enforced* — the Court just needs to.' },
                { id: 'b', prompt: 'Compare the *effectiveness* of PIL (Public Interest Litigation) vs.', answer: '| Criterion | PIL (Supreme Court/High Court) | NHRC Complaint |',
                  options: ['| Criterion | PIL (Supreme Court/High Court) | NHRC Complaint |', 'NHRC is stronger'],
                  hint: 'If stuck on "why NHRC can\'t punish" — review **Art. 50 (Separation of Judiciary from Executive)**.',
                  misconception: 'Students believe: **"If a right is in the Constitution (Art. 14, 19, 21), it is *automatically enforced* — the Court just needs to.' }
          ],
            remediations: { 'if-a-right-is-in': { steps: ['If student cannot distinguish *justiciability* from *enforceability*: 1.', '**Revisit Node c12_leg_cbse_10_002** (Constitutional Provisions) — re-read Art.', '136 (SLP) — make a *table*: Forum | Who can file | Time | Cost | Enforceability | Appeal.', '**Revisit Node c12_leg_cbse_10_004** (Processes) — study NHRC/NCPCR complaint flowcharts — note *where* the chain.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
