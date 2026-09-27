import type { SimDef } from '../../engine/types';

/** v3 generated — c11_leg_ch05 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_leg_ch05: SimDef = {
    id: 'v3_c11_leg_ch05',
    title: 'Administrative Law',
    subtitle: 'This node covers the definition, scope, classification of administrative actions, the.',
    classLevel: 11, subject: 'leg', topic: 'Administrative Law',
    chapters: ['c11_leg_ch05'],
    nodeIds: ['c11_leg_cbse_05_001', 'c11_leg_cbse_05_002', 'c11_leg_cbse_05_003', 'c11_leg_cbse_05_004', 'c11_leg_cbse_05_005', 'c11_leg_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start with a relatable scenario: "Your school principal suddenly bans all students from using the library.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'The University Grants Commission (UGC) issues a regulation mandating that all universities must reserve 10% seats for single girl children.',
        options: ['This is **Administrative Legislative Action (Delegated Legislation)**', 'Quasi-Judicial', 'Administrative Law = Delegated Legislation'],
        answer: 'This is **Administrative Legislative Action (Delegated Legislation)**',
        hook: 'Students believe **"Administrative Law = Delegated Legislation."** They see the volume of rules/regulations/bye-laws.',
    },
    teaching: [
        { title: 'Administrative Law — Key Concepts and Institutions', text: 'Administrative Law is the body of legal principles that governs the creation, operation, and control of administrative agencies (the executive branch), ensuring their actions are legal, reasonable.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_leg_cbse_05_001', title: 'Administrative Law — Key Concepts and Institutions',
          caseStudy: { intro: 'Start with a relatable scenario: "Your school principal suddenly bans all students from using the library during lunch break without any written rule.',
            decisions: [{ prompt: 'Define Administrative Law and state its primary objective in a democratic welfare state.', options: [
                { text: 'Administrative Law is the branch of public law that regulates the organization, powers,', outcome: 'Administrative Law is the branch of public law that regulates the organization, powers, and duties.' },
                { text: 'It is the law made by the administration', outcome: 'Not quite — Students believe **"Administrative Law = Delegated Legislation."** They see the volume.', reveals: 'administrative-law-delegated-legislation' },
                { text: 'Administrative Law = Delegated Legislation', outcome: 'Not quite — Students believe **"Administrative Law = Delegated Legislation."** They see the volume.', reveals: 'administrative-law-delegated-legislation' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_05_002', title: 'Administrative Law — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with a real scenario: "Your neighbour\'s building plan is approved by the Municipal Corporation, but yours — identical — is rejected without reason.',
            decisions: [{ prompt: 'Define \'State\' under Article 12 of the Constitution of India and explain whether a private university receiving 90% government funding and.', options: [
                { text: 'Under Article 12, \'State\' includes: (1) Government and Parliament of India', outcome: 'Under Article 12, \'State\' includes: (1) Government and Parliament of India; (2) Government and.' },
                { text: '**\'Administrative Law = Delegated Legislation only\'**', outcome: 'Not quite — Students believe **\'Administrative Law = Delegated Legislation only\'**.', reveals: 'administrative-law-delegated-legislation-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_05_003', title: 'Administrative Law — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with a real scenario: "Your college principal cancels the student council election results two days after declaring them, citing \'administrative.',
            decisions: [{ prompt: 'State the two Latin maxims that form the foundation of Principles of Natural Justice and their literal English translations.', options: [
                { text: 'The two maxims are: (1) *Nemo judex in causa sua*', outcome: 'The two maxims are: (1) *Nemo judex in causa sua* — "No one should be a judge in their own cause".' },
                { text: 'Judicial Review of administrative action = Appeal on merits', outcome: 'Not quite — Students believe "Judicial Review of administrative action = Appeal on merits." They write.', reveals: 'judicial-review-of-administrative-action' },
                { text: 'The Court should re-evaluate the evidence and substitute its own decision', outcome: 'Not quite — Students believe "Judicial Review of administrative action = Appeal on merits." They write.', reveals: 'judicial-review-of-administrative-action' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_05_004', title: 'Administrative Law — Processes and Procedures',
          caseStudy: { intro: 'Start with this scenario: "A college principal cancels a student\'s admission without notice because the student criticized the college on social media.',
            decisions: [{ prompt: 'Define \'administrative action\' and distinguish it from \'quasi-judicial action\' using one key difference in the nature of the function.', options: [
                { text: 'Administrative action is the residue of governmental functions after legislative and', outcome: 'Administrative action is the residue of governmental functions after legislative and quasi-judicial.' },
                { text: 'both involve discretion', outcome: 'Not quite — Students believe "post-decisional hearing" is a general substitute for pre-decisional hearing.', reveals: 'post-decisional-hearing-is-a' },
                { text: 'post-decisional hearing', outcome: 'Not quite — Students believe "post-decisional hearing" is a general substitute for pre-decisional hearing.', reveals: 'post-decisional-hearing-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_05_005', title: 'Administrative Law — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'You sit in the exam hall and see a question: *"Explain the concept of \'Delegated Legislation\' and its judicial control with reference to decided cases."* Don\'t.',
            decisions: [{ prompt: 'Define \'Administrative Law\' and state the primary distinction between Administrative Law and Constitutional Law as per the CBSE Class 11.', options: [
                { text: 'Administrative Law deals with the organization, powers, and duties of administrative', outcome: 'Administrative Law deals with the organization, powers, and duties of administrative authorities.' },
                { text: 'Administrative Law is part of Constitutional Law', outcome: 'Not quite — **"Judicial Review of Administrative Action = Appeal on Merits."** Students consistently confuse.', reveals: 'judicial-review-of-administrative-action' },
                { text: 'Rules of the Game', outcome: 'Not quite — **"Judicial Review of Administrative Action = Appeal on Merits."** Students consistently confuse.', reveals: 'judicial-review-of-administrative-action' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_05_006', title: 'Administrative Law — Critical Analysis and Application',
          caseStudy: { intro: 'Start with this scenario: "A university Vice-Chancellor cancels a student\'s admission 10 days after classes begin, citing a \'clerical error\' in the merit list.',
            decisions: [{ prompt: 'Define \'Delegated Legislation\' and state the *single most important constitutional safeguard* against its misuse in India, citing the.', options: [
                { text: 'Delegated Legislation is law-making by the Executive (or subordinate bodies) under', outcome: 'Delegated Legislation is law-making by the Executive (or subordinate bodies) under authority.' },
                { text: 'Judicial Review is the safeguard', outcome: 'Not quite — **Misconception**: "Judicial Review of administrative action means the Court re-decides the case.', reveals: 'misconception-judicial-review-of-administrative' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_05_003', title: 'Administrative Law — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with a real scenario: "Your college principal cancels the student council election results two days after declaring them, citing \'administrative.',
            decisions: [{ prompt: 'State the two Latin maxims that form the foundation of Principles of Natural Justice and their literal English translations.', options: [
                { text: 'The two maxims are: (1) *Nemo judex in causa sua*', outcome: 'The two maxims are: (1) *Nemo judex in causa sua* — "No one should be a judge in their own cause".' },
                { text: 'Judicial Review of administrative action = Appeal on merits', outcome: 'Not quite — Students believe "Judicial Review of administrative action = Appeal on merits." They write.', reveals: 'judicial-review-of-administrative-action' },
                { text: 'The Court should re-evaluate the evidence and substitute its own decision', outcome: 'Not quite — Students believe "Judicial Review of administrative action = Appeal on merits." They write.', reveals: 'judicial-review-of-administrative-action' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_leg_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'Administrative Law', spots: [
            { id: 's1', label: 'Administrative Law Key Concepts and Institutions', prompt: 'Which idea is this? — Administrative Law is the body of legal principles that governs the creation, operation.', answer: 'Administrative Law Key Concepts and Institutions', options: ['Administrative Law Key Concepts and Institutions', 'Administrative Law Constitutional and Legal Provisions', 'Administrative Law Landmark Cases and Illustrations', 'Administrative Law Processes and Procedures'] },
            { id: 's2', label: 'Administrative Law Constitutional and Legal Provisions', prompt: 'Which idea is this? — Administrative Law is the body of law that governs the creation, operation, and control.', answer: 'Administrative Law Constitutional and Legal Provisions', options: ['Administrative Law Constitutional and Legal Provisions', 'Administrative Law Key Concepts and Institutions', 'Administrative Law Landmark Cases and Illustrations', 'Administrative Law Processes and Procedures'] },
            { id: 's3', label: 'Administrative Law Landmark Cases and Illustrations', prompt: 'Which idea is this? — Administrative Law is the body of legal principles that governs the creation, operation.', answer: 'Administrative Law Landmark Cases and Illustrations', options: ['Administrative Law Landmark Cases and Illustrations', 'Administrative Law Key Concepts and Institutions', 'Administrative Law Constitutional and Legal Provisions', 'Administrative Law Processes and Procedures'] },
            { id: 's4', label: 'Administrative Law Processes and Procedures', prompt: 'Which idea is this? — Administrative law governs the processes, procedures, and principles that administrative.', answer: 'Administrative Law Processes and Procedures', options: ['Administrative Law Processes and Procedures', 'Administrative Law Key Concepts and Institutions', 'Administrative Law Constitutional and Legal Provisions', 'Administrative Law Landmark Cases and Illustrations'] },
            { id: 's5', label: 'Administrative Law Exam-Oriented Questions and Answers', prompt: 'Which idea is this? — This node provides a structured pedagogy for answering Board-level questions.', answer: 'Administrative Law Exam-Oriented Questions and Answers', options: ['Administrative Law Exam-Oriented Questions and Answers', 'Administrative Law Key Concepts and Institutions', 'Administrative Law Constitutional and Legal Provisions', 'Administrative Law Landmark Cases and Illustrations'] },
            { id: 's6', label: 'Administrative Law Critical Analysis and Application', prompt: 'Which idea is this? — Administrative Law is the body of law that governs the creation, operation, and control.', answer: 'Administrative Law Critical Analysis and Application', options: ['Administrative Law Critical Analysis and Application', 'Administrative Law Key Concepts and Institutions', 'Administrative Law Constitutional and Legal Provisions', 'Administrative Law Landmark Cases and Illustrations'] }
          ] } },
        { type: 'case', nodeId: 'c11_leg_cbse_05_006', title: 'You made it',
          caseStudy: { intro: 'You finished Administrative Law — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_leg_cbse_05_001', difficulty: 'standard',
          question: 'Administrative Law is the body of legal principles that governs the creation.',
          hint: 'If stuck on "Why do we need Administrative Law if we have Separation of Powers?", review.',
          misconception: 'Students believe **"Administrative Law = Delegated Legislation."** They see the volume of rules/regulations/bye-laws.',
          parts: [
                { id: 'a', prompt: 'The University Grants Commission (UGC) issues a regulation mandating that all universities must reserve 10% seats for single girl children.', answer: 'This is **Administrative Legislative Action (Delegated Legislation)**',
                  options: ['This is **Administrative Legislative Action (Delegated Legislation)**', 'Quasi-Judicial', 'Administrative Law = Delegated Legislation', '**"Administrative Law = Delegated Legislation'],
                  hint: 'If stuck on "Why do we need Administrative Law if we have Separation of Powers?", review.',
                  misconception: 'Students believe **"Administrative Law = Delegated Legislation."** They see the volume of rules/regulations/bye-laws and equate the.' }
          ],
            remediations: { 'administrative-law-delegated-legislation': { steps: ['**Visual Mapping:** Draw a 2x2 matrix: Rows = "Source of Power" (Statute vs.', 'Delegated); Columns = "Nature of Act" (General/Abstract vs.', 'Place "Delegated Legislation" in one cell.', 'Show Administrative Law as the *grid lines* (principles of legality, fairness, review) surrounding all cells.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"Administrative Law = Delegated Legislation."** They see the volume of rules/regulations/bye-laws.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Rule of Law under Dicey is incompatible with the modern Welfare State because the Welfare State requires broad discretionary powers.', answer: 'The statement is partially valid but outdated',
                  options: ['The statement is partially valid but outdated', 'Administrative Law = Delegated Legislation', '**"Administrative Law = Delegated Legislation'],
                  hint: 'If stuck on "Why do we need Administrative Law if we have Separation of Powers?", review.',
                  misconception: 'Students believe **"Administrative Law = Delegated Legislation."** They see the volume of rules/regulations/bye-laws and equate the.' },
                { id: 'b', prompt: 'Create a hypothetical scenario involving a Municipal Corporation where all FOUR types of administrative action (Legislative, Quasi-Judicial, Administrative.', answer: '**Scenario:** 1',
                  options: ['**Scenario:** 1', 'Administrative Law = Delegated Legislation', '**"Administrative Law = Delegated Legislation'],
                  hint: 'If stuck on "Why do we need Administrative Law if we have Separation of Powers?", review.',
                  misconception: 'Students believe **"Administrative Law = Delegated Legislation."** They see the volume of rules/regulations/bye-laws and equate the.' }
          ],
            remediations: { 'administrative-law-delegated-legislation': { steps: ['**Visual Mapping:** Draw a 2x2 matrix: Rows = "Source of Power" (Statute vs.', 'Delegated); Columns = "Nature of Act" (General/Abstract vs.', 'Place "Delegated Legislation" in one cell.', 'Show Administrative Law as the *grid lines* (principles of legality, fairness, review) surrounding all cells.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_05_002', difficulty: 'standard',
          question: 'Administrative Law is the body of law that governs the creation, operation, and.',
          hint: 'If stuck, review **c11_leg_cbse_02_001 (Salient Features of Constitution)**.',
          misconception: 'Students believe **\'Administrative Law = Delegated Legislation only\'**.',
          parts: [
                { id: 'a', prompt: 'Define \'State\' under Article 12 of the Constitution of India and explain whether a private university receiving 90% government funding and performing public.', answer: 'Under Article 12, \'State\' includes: (1) Government and Parliament of India',
                  options: ['Under Article 12, \'State\' includes: (1) Government and Parliament of India', '**\'Administrative Law = Delegated Legislation only\'**'],
                  hint: 'If stuck, review **c11_leg_cbse_02_001 (Salient Features of Constitution)** — specifically the.',
                  misconception: 'Students believe **\'Administrative Law = Delegated Legislation only\'**.' },
                { id: 'b', prompt: 'A Passport Officer impounds a passport under Section 10(3)(c) of the Passports Act, 1967 without giving the holder a hearing. The holder challenges this.', answer: 'The action is **quasi-judicial** (adjudicatory)',
                  options: ['The action is **quasi-judicial** (adjudicatory)', '**\'Administrative Law = Delegated Legislation only\'**'],
                  hint: 'If stuck, review **c11_leg_cbse_02_001 (Salient Features of Constitution)** — specifically the.',
                  misconception: 'Students believe **\'Administrative Law = Delegated Legislation only\'**.' },
                { id: 'c', prompt: 'The Central Government issues a notification under Section 3 of the Environment (Protection) Act, 1986 banning single-use plastics nationwide.', answer: 'This is **Administrative Legislative Action (Delegated Legislation)**',
                  options: ['This is **Administrative Legislative Action (Delegated Legislation)**', '**\'Administrative Law = Delegated Legislation only\'**'],
                  hint: 'If stuck, review **c11_leg_cbse_02_001 (Salient Features of Constitution)** — specifically the.',
                  misconception: 'Students believe **\'Administrative Law = Delegated Legislation only\'**.' },
                { id: 'd', prompt: 'Compare the British Droit Administratif system with the Indian system of administrative justice.', answer: '**Droit Administratif (France)**: Dual court system',
                  options: ['**Droit Administratif (France)**: Dual court system', '**\'Administrative Law = Delegated Legislation only\'**'],
                  hint: 'If stuck, review **c11_leg_cbse_02_001 (Salient Features of Constitution)** — specifically the.',
                  misconception: 'Students believe **\'Administrative Law = Delegated Legislation only\'**.' }
          ],
            remediations: { 'administrative-law-delegated-legislation-only': { steps: ['**Re-anchor**: Ask: "When a traffic cop fines you, which law controls *his* power?" → Motor Vehicles Act (parent.', '**Map the 4 actions**: Give 4 scenarios (rule notification, tribunal order, license denial, birth registration) — have.', '**Trace the remedy**: For each, ask "Which writ?', 'Which Article?" — link to Art.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_05_003', difficulty: 'standard',
          question: 'Administrative Law is the body of legal principles that governs the creation.',
          hint: 'Review "Types of Administrative Action" and "Principles of Natural Justice" from.',
          misconception: 'Students believe "Judicial Review of administrative action = Appeal on merits." They write in exams: "The Court should.',
          parts: [
                { id: 'a', prompt: 'State the two Latin maxims that form the foundation of Principles of Natural Justice and their literal English translations.', answer: 'The two maxims are: (1) *Nemo judex in causa sua*',
                  options: ['The two maxims are: (1) *Nemo judex in causa sua*', 'Judicial Review of administrative action = Appeal on merits', 'The Court should re-evaluate the evidence and substitute its own decision', '"Judicial Review of administrative action = Appeal on merits'],
                  hint: 'Review "Types of Administrative Action" and "Principles of Natural Justice" from.',
                  misconception: 'Students believe "Judicial Review of administrative action = Appeal on merits." They write in exams: "The Court should re-evaluate the.' },
                { id: 'b', prompt: 'A Municipal Corporation demolishes a street vendor\'s cart without notice, citing a "clean city drive" policy not published in the Gazette.', answer: 'Action: Administrative (executive) action affecting property rights',
                  options: ['Action: Administrative (executive) action affecting property rights', 'quasi-judicial', 'Judicial Review of administrative action = Appeal on merits', 'The Court should re-evaluate the evidence and substitute its own decision'],
                  hint: 'Review "Types of Administrative Action" and "Principles of Natural Justice" from.',
                  misconception: 'Students believe "Judicial Review of administrative action = Appeal on merits." They write in exams: "The Court should re-evaluate the.' }
          ],
            remediations: { 'judicial-review-of-administrative-action': { steps: ['**Clarify the distinction**: Use a 2-column table — "Appeal" (re-hearing on facts/law, substitute decision) vs.', '"Judicial Review" (review legality only, remit to authority).', '**Walk through *Wednesbury* facts**: Show how Lord Greene MR explicitly said "The court is not entitled to substitute.', '**Practice exercise**: Give 3 administrative orders — ask student to label each as "reviewable on merits?" (No).'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_05_004', difficulty: 'standard',
          question: 'Administrative law governs the processes, procedures, and principles that.',
          hint: 'Review the "Fundamental Principle of Administrative Law: Rule of Law" section.',
          misconception: 'Students believe "post-decisional hearing" is a general substitute for pre-decisional hearing.',
          parts: [
                { id: 'a', prompt: 'Explain why the principle of \'audi alteram partem\' is considered a facet of Article 21 of the Constitution, referencing the Maneka Gandhi judgment.', answer: 'In Maneka Gandhi v',
                  options: ['In Maneka Gandhi v', 'natural justice', 'post-decisional hearing', '"post-decisional hearing" is a general substitute for pre-decisional hearing'],
                  hint: 'Review the "Fundamental Principle of Administrative Law: Rule of Law" section.',
                  misconception: 'Students believe "post-decisional hearing" is a general substitute for pre-decisional hearing.' },
                { id: 'b', prompt: 'A University Vice-Chancellor issues an order rusticating a student for "indiscipline" without giving the student a chance to explain.', answer: 'The VC\'s action is **quasi-judicial** (adjudicating',
                  options: ['The VC\'s action is **quasi-judicial** (adjudicating', 'post-decisional hearing always works', 'post-decisional hearing', '"post-decisional hearing" is a general substitute for pre-decisional hearing'],
                  hint: 'Review the "Fundamental Principle of Administrative Law: Rule of Law" section.',
                  misconception: 'Students believe "post-decisional hearing" is a general substitute for pre-decisional hearing.' },
                { id: 'c', prompt: 'Compare the Droit administratif system (France) with the Indian common law system on: (a) forum for disputes between citizen and state, (b) role of ordinary.', answer: 'forum for disputes between citizen and state, (',
                  options: ['forum for disputes between citizen and state, (', 'India has administrative tribunals like France', 'post-decisional hearing', '"post-decisional hearing" is a general substitute for pre-decisional hearing'],
                  hint: 'Review the "Fundamental Principle of Administrative Law: Rule of Law" section.',
                  misconception: 'Students believe "post-decisional hearing" is a general substitute for pre-decisional hearing.' }
          ],
            remediations: { 'post-decisional-hearing-is-a': { steps: ['If a student confuses post-decisional hearing as a routine remedy: (1) Re-read the Maneka Gandhi three-part test from.', '(2) Apply it to two scenarios: (a) FSSAI banning a food product instantly — post-decisional hearing valid?', '(b) College cancelling degree after convocation — valid?', '(3) Have the student write the test in their own words: "Post-decisional hearing is allowed ONLY when ______, ______.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_05_005', difficulty: 'standard',
          question: 'This node provides a structured pedagogy for answering Board-level questions.',
          hint: 'If stuck on answer structure, review the **IRAC Method (Issue, Rule, Application.',
          misconception: '**"Judicial Review of Administrative Action = Appeal on Merits."** Students consistently confuse the *scope*.',
          parts: [
                { id: 'a', prompt: 'Explain why \'Delegated Legislation\' is described as a \'necessary evil\' in modern welfare states. Identify the two main types of judicial control over it.', answer: 'It is \'necessary\'',
                  options: ['It is \'necessary\'', 'Parliament is busy', 'Judicial Review of Administrative Action = Appeal on Merits'],
                  hint: 'If stuck on answer structure, review the **IRAC Method (Issue, Rule, Application, Conclusion)**.',
                  misconception: '**"Judicial Review of Administrative Action = Appeal on Merits."** Students consistently confuse the *scope* of Judicial Review (Art.' }
          ],
            remediations: { 'judicial-review-of-administrative-action': { steps: ['The "Litmus Test" Drill.** Give the student 5 scenarios (e.g., Passport impoundment, Tax assessment, University.', 'Visual Mapping.** Draw a flowchart: `Admin Decision -> Writ Petition (Art 226) -> Grounds.', 'Keyword Ban.** Prohibit words "Correct," "Right," "Fair," "Just" in Judicial Review answers.', 'Practice.** Assign 3 past Board "Distinguish: Judicial Review vs Appeal" questions.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_05_006', difficulty: 'standard',
          question: 'Administrative Law is the body of law that governs the creation, operation, and.',
          hint: 'If stuck on *standard of review*, revisit **Wednesbury Unreasonableness.',
          misconception: '**Misconception**: "Judicial Review of administrative action means the Court re-decides the case on its *merits* (was.',
          parts: [
                { id: 'a', prompt: 'Compare the **Droit Administratif** (French) system and the **Common Law** (Indian/UK) system on *two* specific points: (a) Forum for disputes between citizen.', answer: 'Forum for disputes between citizen and State',
                  options: ['Forum for disputes between citizen and State', 'India fully follows Droit'],
                  hint: 'If stuck on *standard of review*, revisit **Wednesbury Unreasonableness vs Proportionality** — the.',
                  misconception: '**Misconception**: "Judicial Review of administrative action means the Court re-decides the case on its *merits* (was it the *right*.' }
          ],
            remediations: { 'misconception-judicial-review-of-administrative': { steps: ['If a student conflates Judicial Review with Merits Appeal: **Step 1**: Give two one-paragraph scenarios — (A).', '**Step 3**: Explain the **\'Wednesbury Spectrum\'**: *Illegality* (easy to prove) → *Procedural Impropriety*.', '**Step 4**: Drill: "Write one sentence the Court *would* say in Judicial Review vs one it *would not* say." (Would.', 'This shifts focus from *outcome* to *process/legality*.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
