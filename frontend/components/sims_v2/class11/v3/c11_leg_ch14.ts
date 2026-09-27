import type { SimDef } from '../../engine/types';

/** v3 generated — c11_leg_ch14 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_leg_ch14: SimDef = {
    id: 'v3_c11_leg_ch14',
    title: 'Adoption',
    subtitle: 'This node covers the concept of adoption, the Hindu Adoption and Maintenance Act, 1956.',
    classLevel: 11, subject: 'leg', topic: 'Adoption',
    chapters: ['c11_leg_ch14'],
    nodeIds: ['c11_leg_cbse_14_001', 'c11_leg_cbse_14_002', 'c11_leg_cbse_14_003', 'c11_leg_cbse_14_004', 'c11_leg_cbse_14_005', 'c11_leg_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Imagine a child named Aryan, born to Hindu parents, who is adopted by a childless Sikh couple.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A Hindu father appoints his brother as guardian of his minor daughter via a registered will. The mother is alive and objects.',
        options: ['The mother has the superior right', 'the will overrides the mother', 'after him'],
        answer: 'The mother has the superior right',
        hook: 'Students often believe that "guardianship under the Guardians and Wards Act, 1890 is equivalent to adoption for.',
    },
    teaching: [
        { title: 'Adoption — Key Concepts and Institutions', text: 'Adoption is the legal process by which a person assumes the parenting of another, usually a child, from that person\'s biological or legal parents, and permanently transfers all rights and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_leg_cbse_14_001', title: 'Adoption — Key Concepts and Institutions',
          caseStudy: { intro: 'Imagine a child named Aryan, born to Hindu parents, who is adopted by a childless Sikh couple.',
            decisions: [{ prompt: 'What is the fundamental legal difference between adoption and guardianship under Indian law?', options: [
                { text: 'Adoption permanently severs the child\'s legal ties with biological parents and creates', outcome: 'Adoption permanently severs the child\'s legal ties with biological parents and creates new filial.' },
                { text: 'both are the same', outcome: 'Not quite — Students often believe that "guardianship under the Guardians and Wards Act, 1890 is equivalent.', reveals: 'guardianship-under-the-guardians-and' },
                { text: 'guardianship is permanent', outcome: 'Not quite — Students often believe that "guardianship under the Guardians and Wards Act, 1890 is equivalent.', reveals: 'guardianship-under-the-guardians-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_14_002', title: 'Adoption — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with this scenario: "A Muslim couple wants to adopt a child but is told there is no adoption law for Muslims in India — only guardianship.',
            decisions: [{ prompt: 'What is the fundamental legal difference between adoption under the Hindu Adoption and Maintenance Act, 1956 and guardianship under the.', options: [
                { text: 'Adoption creates a permanent, irrevocable parent-child relationship with full inheritance', outcome: 'Adoption creates a permanent, irrevocable parent-child relationship with full inheritance rights.' },
                { text: 'both are the same', outcome: 'Not quite — Students believe the Juvenile Justice Act, 2015 only applies to "juvenile delinquents" (children.', reveals: 'the-juvenile-justice-act' },
                { text: 'juvenile delinquents', outcome: 'Not quite — Students believe the Juvenile Justice Act, 2015 only applies to "juvenile delinquents" (children.', reveals: 'the-juvenile-justice-act' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_14_003', title: 'Adoption — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with this scenario: "A Hindu couple adopts a 10-year-old boy through a private deed without court involvement.',
            decisions: [{ prompt: 'Under HAMA 1956, what are the four mandatory conditions for a valid adoption, and which Section governs the actual giving-and-taking.', options: [
                { text: 'The four conditions: (1) adoptive parent has capacity (Sections 7/8), (2) child is', outcome: 'The four conditions: (1) adoptive parent has capacity (Sections 7/8), (2) child is adoptable.' },
                { text: 'registration is enough', outcome: 'Not quite — Students believe "registration of adoption deed = valid adoption." This is wrong because **Section.', reveals: 'registration-of-adoption-deed-valid' },
                { text: 'consent of biological parents is the only requirement', outcome: 'Not quite — Students believe "registration of adoption deed = valid adoption." This is wrong because **Section.', reveals: 'registration-of-adoption-deed-valid' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_14_004', title: 'Adoption — Processes and Procedures',
          caseStudy: { intro: 'Imagine a childless couple, the Sharmas, want to adopt a 3-year-old girl from a Specialised Adoption Agency (SAA) in Delhi. Where do they even start?',
            decisions: [{ prompt: 'Define "adoption" as per Section 2(aa) of the Juvenile Justice (Care and Protection of Children) Act, 2015.', options: [
                { text: 'Under Section 2(aa) of the JJ Act, 2015, adoption means "the process through', outcome: 'Under Section 2(aa) of the JJ Act, 2015, adoption means "the process through which the adopted.' },
                { text: 'referred', outcome: 'Not quite — Students often believe that once a child is "referred" to Prospective Adoptive Parents (PAPs) via.', reveals: 'once-a-child-is-referred' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_14_005', title: 'Adoption — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'A Class 11 student preparing for board exams often stares at a problem like: *"A 25-year-old Hindu male adopts a 20-year-old female.',
            decisions: [{ prompt: 'State the four essential statutory conditions for a valid adoption under the Hindu Adoption and Maintenance Act, 1956, as enumerated.', options: [
                { text: 'The four conditions under Section 6 HAMA are: (i) the person adopting has the capacity', outcome: 'The four conditions under Section 6 HAMA are: (i) the person adopting has the capacity and right.' },
                { text: 'registration', outcome: 'Not quite — Students believe **"adoption = guardianship + inheritance"** and that a registered deed alone makes.', reveals: 'adoption-guardianship-inheritance-and-that' },
                { text: 'court order', outcome: 'Not quite — Students believe **"adoption = guardianship + inheritance"** and that a registered deed alone makes.', reveals: 'adoption-guardianship-inheritance-and-that' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_14_006', title: 'Adoption — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a real-world dilemma: "A Hindu couple adopts a 14-year-old married boy without performing Datta Homam.',
            decisions: [{ prompt: 'State the four essential conditions for a valid adoption under Section 6 of the Hindu Adoption and Maintenance Act, 1956.', options: [
                { text: 'The four conditions under Section 6 HAMA are: (i) The person adopting has the capacity', outcome: 'The four conditions under Section 6 HAMA are: (i) The person adopting has the capacity and right.' },
                { text: 'consent of parents', outcome: 'Not quite — Students believe that a **registered adoption deed** is conclusive proof of valid adoption.', reveals: 'a-registered-adoption-deed-is' },
                { text: 'registration', outcome: 'Not quite — Students believe that a **registered adoption deed** is conclusive proof of valid adoption.', reveals: 'a-registered-adoption-deed-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_14_004', title: 'Adoption — Processes and Procedures',
          caseStudy: { intro: 'Imagine a childless couple, the Sharmas, want to adopt a 3-year-old girl from a Specialised Adoption Agency (SAA) in Delhi. Where do they even start?',
            decisions: [{ prompt: 'Define "adoption" as per Section 2(aa) of the Juvenile Justice (Care and Protection of Children) Act, 2015.', options: [
                { text: 'Under Section 2(aa) of the JJ Act, 2015, adoption means "the process through', outcome: 'Under Section 2(aa) of the JJ Act, 2015, adoption means "the process through which the adopted.' },
                { text: 'referred', outcome: 'Not quite — Students often believe that once a child is "referred" to Prospective Adoptive Parents (PAPs) via.', reveals: 'once-a-child-is-referred' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_leg_cbse_14_002', title: 'Identify each idea',
          dissect: { specimen: 'Adoption', spots: [
            { id: 's1', label: 'Adoption Key Concepts and Institutions', prompt: 'Which idea is this? — Adoption is the legal process by which a person assumes the parenting of another, usually.', answer: 'Adoption Key Concepts and Institutions', options: ['Adoption Key Concepts and Institutions', 'Adoption Constitutional and Legal Provisions', 'Adoption Landmark Cases and Illustrations', 'Adoption Processes and Procedures'] },
            { id: 's2', label: 'Adoption Constitutional and Legal Provisions', prompt: 'Which idea is this? — Adoption is a legal process that permanently establishes a parent-child relationship.', answer: 'Adoption Constitutional and Legal Provisions', options: ['Adoption Constitutional and Legal Provisions', 'Adoption Key Concepts and Institutions', 'Adoption Landmark Cases and Illustrations', 'Adoption Processes and Procedures'] },
            { id: 's3', label: 'Adoption Landmark Cases and Illustrations', prompt: 'Which idea is this? — Adoption is a legal process under the Hindu Adoptions and Maintenance Act, 1956 (HAMA).', answer: 'Adoption Landmark Cases and Illustrations', options: ['Adoption Landmark Cases and Illustrations', 'Adoption Key Concepts and Institutions', 'Adoption Constitutional and Legal Provisions', 'Adoption Processes and Procedures'] },
            { id: 's4', label: 'Adoption Processes and Procedures', prompt: 'Which idea is this? — Adoption is a legal process that permanently transfers all parental rights and.', answer: 'Adoption Processes and Procedures', options: ['Adoption Processes and Procedures', 'Adoption Key Concepts and Institutions', 'Adoption Constitutional and Legal Provisions', 'Adoption Landmark Cases and Illustrations'] },
            { id: 's5', label: 'Adoption Exam-Oriented Questions and Answers', prompt: 'Which idea is this? — Adoption is a statutory legal process under the Hindu Adoption and Maintenance Act, 1956.', answer: 'Adoption Exam-Oriented Questions and Answers', options: ['Adoption Exam-Oriented Questions and Answers', 'Adoption Key Concepts and Institutions', 'Adoption Constitutional and Legal Provisions', 'Adoption Landmark Cases and Illustrations'] },
            { id: 's6', label: 'Adoption Critical Analysis and Application', prompt: 'Which idea is this? — Adoption is the legal process by which a person assumes the parenting of another, usually.', answer: 'Adoption Critical Analysis and Application', options: ['Adoption Critical Analysis and Application', 'Adoption Key Concepts and Institutions', 'Adoption Constitutional and Legal Provisions', 'Adoption Landmark Cases and Illustrations'] }
          ] } },
        { type: 'case', nodeId: 'c11_leg_cbse_14_006', title: 'You made it',
          caseStudy: { intro: 'You finished Adoption — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_leg_cbse_14_001', difficulty: 'standard',
          question: 'Adoption is the legal process by which a person assumes the parenting.',
          hint: 'Review the "Nature of Family Laws in India" section in Chapter 1 (Marriage and Divorce).',
          misconception: 'Students often believe that "guardianship under the Guardians and Wards Act, 1890 is equivalent to adoption for.',
          parts: [
                { id: 'a', prompt: 'A Hindu father appoints his brother as guardian of his minor daughter via a registered will. The mother is alive and objects.', answer: 'The mother has the superior right',
                  options: ['The mother has the superior right', 'the will overrides the mother', 'after him'],
                  hint: 'Review the "Nature of Family Laws in India" section in Chapter 1 (Marriage and Divorce).',
                  misconception: 'Students often believe that "guardianship under the Guardians and Wards Act, 1890 is equivalent to adoption for non-Hindus." This is wrong.' }
          ],
            remediations: { 'guardianship-under-the-guardians-and': { steps: ['Ask the student to list three legal consequences of adoption (e.g., new birth certificate, inheritance rights.', 'Ask them to list three limitations of guardianship (e.g., revocable, no inheritance, biological ties intact).', 'Have them compare the two lists side-by-side to see the structural difference.', 'Then re-read Section 11 of HAMA 1956 and Section 7 of GWA 1890 to anchor the distinction in statutory text.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_14_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "guardianship under the Guardians and Wards Act, 1890 is equivalent to adoption for.',
          parts: [
                { id: 'a', prompt: '"Adoption under the Hindu Adoption and Maintenance Act, 1956 is a sacramental act, not a secular contract." Evaluate this statement in light of the Act\'s.', answer: 'The statement is **partially outdated**',
                  options: ['The statement is **partially outdated**', 'it is still purely sacramental'],
                  hint: 'Review the "Nature of Family Laws in India" section in Chapter 1 (Marriage and Divorce).',
                  misconception: 'Students often believe that "guardianship under the Guardians and Wards Act, 1890 is equivalent to adoption for non-Hindus." This is wrong.' }
          ],
            remediations: { 'guardianship-under-the-guardians-and': { steps: ['Ask the student to list three legal consequences of adoption (e.g., new birth certificate, inheritance rights.', 'Ask them to list three limitations of guardianship (e.g., revocable, no inheritance, biological ties intact).', 'Have them compare the two lists side-by-side to see the structural difference.', 'Then re-read Section 11 of HAMA 1956 and Section 7 of GWA 1890 to anchor the distinction in statutory text.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_14_002', difficulty: 'standard',
          question: 'Adoption is a legal process that permanently establishes a parent-child.',
          hint: 'Review the concept of "personal laws" vs "secular laws" in Family Justice System (Unit 5.',
          misconception: 'Students believe the Juvenile Justice Act, 2015 only applies to "juvenile delinquents" (children in conflict with law).',
          parts: [
                { id: 'a', prompt: 'A Hindu male aged 28 wants to adopt a 10-year-old girl. His wife is alive and consents. The girl\'s biological parents are unknown.', answer: 'Under HAMA 1956: (1) Adopter must be Hindu, of sound mind, not a minor (Sec 7)',
                  options: ['Under HAMA 1956: (1) Adopter must be Hindu, of sound mind, not a minor (Sec 7)', 'juvenile delinquents'],
                  hint: 'Review the concept of "personal laws" vs "secular laws" in Family Justice System (Unit 5, Chapter.',
                  misconception: 'Students believe the Juvenile Justice Act, 2015 only applies to "juvenile delinquents" (children in conflict with law) and not to adoption.' }
          ],
            remediations: { 'the-juvenile-justice-act': { steps: ['Show the student the Table of Contents of JJ Act 2015 — highlight Chapter VIII "Adoption" separate from Chapter.', 'Give a fact scenario: "Abandoned infant found at railway station → CWC declares legally free for adoption → Muslim.', 'Ask student to trace the legal path — they will see it has nothing to do with delinquency.', 'Reinforce: "JJ Act = two parallel tracks. Adoption is for CARE AND PROTECTION, not punishment."'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_14_003', difficulty: 'standard',
          question: 'Adoption is a legal process under the Hindu Adoptions and Maintenance Act, 1956.',
          hint: 'Review HAMA Sections 7, 8, 10, 11, 12 and the definition of "ceremony" in *Kamla v.',
          misconception: 'Students believe "registration of adoption deed = valid adoption." This is wrong because **Section 11 HAMA mandates.',
          parts: [
                { id: 'a', prompt: 'A Hindu widow adopts a son without her deceased husband\'s prior consent and without court permission. Is the adoption valid?', answer: 'Invalid',
                  options: ['Invalid', 'valid because she\'s a widow', 'who can adopt', 'how adoption must be done'],
                  hint: 'Review HAMA Sections 7, 8, 10, 11, 12 and the definition of "ceremony" in *Kamla v.',
                  misconception: 'Students believe "registration of adoption deed = valid adoption." This is wrong because **Section 11 HAMA mandates actual.' }
          ],
            remediations: { 'registration-of-adoption-deed-valid': { steps: ['If a student insists "registration is enough," do this: 1) Show them Section 11(i) text: "actual giving and taking".', '3) Give a mini-case: "A signs registered deed giving son to B.', 'Does child inherit from B?" Answer: No — no ceremony = no adoption = no inheritance.', '4) Drill: "Ceremony = constitutive; Registration = evidentiary.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_14_004', difficulty: 'standard',
          question: 'Adoption is a legal process that permanently transfers all parental rights and.',
          hint: 'If stuck, review the "Key Concepts and Institutions" node (c11_leg_cbse_14_001) for.',
          misconception: 'Students often believe that once a child is "referred" to Prospective Adoptive Parents (PAPs) via CARINGS, the adoption.',
          parts: [
                { id: 'a', prompt: 'Define "adoption" as per Section 2(aa) of the Juvenile Justice (Care and Protection of Children) Act, 2015.', answer: 'Under Section 2(aa) of the JJ Act, 2015, adoption means "the process through',
                  options: ['Under Section 2(aa) of the JJ Act, 2015, adoption means "the process through', 'referred'],
                  hint: 'If stuck, review the "Key Concepts and Institutions" node (c11_leg_cbse_14_001) for definitions.',
                  misconception: 'Students often believe that once a child is "referred" to Prospective Adoptive Parents (PAPs) via CARINGS, the adoption is almost complete.' },
                { id: 'b', prompt: 'A Muslim couple in Mumbai wishes to adopt a Hindu child abandoned at birth. Can they adopt under HAMA, 1956?', answer: 'No, they cannot adopt under HAMA, 1956',
                  options: ['No, they cannot adopt under HAMA, 1956', 'referred'],
                  hint: 'If stuck, review the "Key Concepts and Institutions" node (c11_leg_cbse_14_001) for definitions.',
                  misconception: 'Students often believe that once a child is "referred" to Prospective Adoptive Parents (PAPs) via CARINGS, the adoption is almost complete.' },
                { id: 'c', prompt: 'A Single male, aged 45, wants to adopt a girl child aged 2 years under the JJ Act, 2015. He is financially stable and has a clean police record.', answer: 'No, he is *not* eligible',
                  options: ['No, he is *not* eligible', 'referred'],
                  hint: 'If stuck, review the "Key Concepts and Institutions" node (c11_leg_cbse_14_001) for definitions.',
                  misconception: 'Students often believe that once a child is "referred" to Prospective Adoptive Parents (PAPs) via CARINGS, the adoption is almost complete.' }
          ],
            remediations: { 'once-a-child-is-referred': { steps: ['**Re-teach the CARINGS Pipeline:** Draw the 7-stage flowchart on the board: Registration → HSR (30 days) → Referral →.', 'Emphasize *timelines* and *decision points* at each stage.', '"Order":** Use a T-chart: Left column = "Referral/Matching" (Administrative, CARA/SAA, reversible, based.', 'Right column = "Adoption Order" (Judicial, DM/Court, irreversible, based on welfare evidence).'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_14_005', difficulty: 'standard',
          question: 'Adoption is a statutory legal process under the Hindu Adoption and Maintenance.',
          hint: 'Review the **Section 9 consent-holder hierarchy** and **Section 11 age-gap table** from.',
          misconception: 'Students believe **"adoption = guardianship + inheritance"** and that a registered deed alone makes adoption valid.',
          parts: [
                { id: 'a', prompt: 'A Hindu widow, with her husband\'s prior written consent, adopts a 10-year-old boy. The boy\'s biological father is alive but has not consented.', answer: '**Invalid.** Step 1: Capacity to adopt',
                  options: ['**Invalid.** Step 1: Capacity to adopt', 'adoption = guardianship + inheritance'],
                  hint: 'Review the **Section 9 consent-holder hierarchy** and **Section 11 age-gap table** from.',
                  misconception: 'Students believe **"adoption = guardianship + inheritance"** and that a registered deed alone makes adoption valid.' }
          ],
            remediations: { 'adoption-guardianship-inheritance-and-that': { steps: ['If a student cannot distinguish adoption from guardianship or misses consent-holder rules: **Step 1** — Make.', '**Step 2** — Give 3 mini-scenarios (e.g., "Father alive, mother gives child"; "21-year gap for male child"; "No datta.', 'Why?" **Step 3** — Drill Section 9 consent-holder hierarchy with a flowchart: Father → (if dead/unfit) Mother → (if.', '**Step 4** — Assign: "Write a 100-word legal opinion on why *datta homam* is the \'spark\' that creates adoption, not the.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_14_006', difficulty: 'standard',
          question: 'Adoption is the legal process by which a person assumes the parenting.',
          hint: 'If stuck on statutory sections, review Node 002 (Legal Provisions) Table 1: "HAMA.',
          misconception: 'Students believe that a **registered adoption deed** is conclusive proof of valid adoption.',
          parts: [
                { id: 'a', prompt: 'Explain why a Muslim couple cannot adopt a child under the Hindu Adoption and Maintenance Act, 1956, and what legal alternative is available to them under the.', answer: 'HAMA 1956 applies only to Hindus (Section 2: Buddhists, Jains, Sikhs included',
                  options: ['HAMA 1956 applies only to Hindus (Section 2: Buddhists, Jains, Sikhs included', 'Muslims can adopt under HAMA if they want', 'GWA creates adoption', 'a **registered adoption deed** is conclusive proof of valid adoption'],
                  hint: 'If stuck on statutory sections, review Node 002 (Legal Provisions) Table 1: "HAMA Sections 6-12.',
                  misconception: 'Students believe that a **registered adoption deed** is conclusive proof of valid adoption.' },
                { id: 'b', prompt: 'A Hindu widow adopts a 16-year-old unmarried girl without her deceased husband\'s consent (he died 5 years ago).', answer: '**Step 1:** Governing law = HAMA 1956 (both parties Hindu)',
                  options: ['**Step 1:** Governing law = HAMA 1956 (both parties Hindu)', 'a **registered adoption deed** is conclusive proof of valid adoption'],
                  hint: 'If stuck on statutory sections, review Node 002 (Legal Provisions) Table 1: "HAMA Sections 6-12.',
                  misconception: 'Students believe that a **registered adoption deed** is conclusive proof of valid adoption.' }
          ],
            remediations: { 'a-registered-adoption-deed-is': { steps: ['If a student insists "registration makes adoption valid," do this 3-step remediation: (1) **Show the text:** Read.', 'unless disproved." Highlight "presumed" ≠ "conclusive." (2) **Contrast with Sale Deed:** In property sale, registration.', 'In adoption, ceremony (Datta Homam) *completes* transfer; registration is only *evidence*.', '(3) **Give a counter-example:** "If I register a deed adopting a 20-year-old married man (violates Sec 10), is he.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
