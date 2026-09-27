import type { SimDef } from '../../engine/types';

/** v3 generated — c11_leg_ch07 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_leg_ch07: SimDef = {
    id: 'v3_c11_leg_ch07',
    title: 'Classification of Laws',
    subtitle: 'This node covers the three-fold classification of laws as per the NCERT Class 11 Legal.',
    classLevel: 11, subject: 'leg', topic: 'Classification of Laws',
    chapters: ['c11_leg_ch07'],
    nodeIds: ['c11_leg_cbse_07_001', 'c11_leg_cbse_07_002', 'c11_leg_cbse_07_003', 'c11_leg_cbse_07_004', 'c11_leg_cbse_07_005', 'c11_leg_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start with a real-world scenario: "You’re a lawyer. A client walks in — her passport was seized without.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Define "Criminal Law" and "Civil Law" as per the NCERT classification based on subject matter. Give one example of each.',
        options: ['Criminal Law covers acts prohibited by law that affect society as a whole', 'Public Law = Constitutional Law', 'Private Law = Civil Law'],
        answer: 'Criminal Law covers acts prohibited by law that affect society as a whole',
        hook: 'Students often believe **"Public Law = Constitutional Law"** and **"Private Law = Civil Law"** as exact equivalences.',
    },
    teaching: [
        { title: 'Classification of Laws — Key Concepts and Institutions', text: 'Classification of Laws is the systematic categorization of legal rules into distinct branches based on subject matter (civil vs criminal), scope (substantive vs procedural), and jurisdiction.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_leg_cbse_07_001', title: 'Classification of Laws — Key Concepts and Institutions',
          caseStudy: { intro: 'Start with a real-world scenario: "You’re a lawyer. A client walks in — her passport was seized without hearing. Another client — his factory pollutes a river.',
            decisions: [{ prompt: 'Define "Criminal Law" and "Civil Law" as per the NCERT classification based on subject matter. Give one example of each.', options: [
                { text: 'Criminal Law covers acts prohibited by law that affect society as a whole', outcome: 'Criminal Law covers acts prohibited by law that affect society as a whole; action is initiated.' },
                { text: 'Public Law = Constitutional Law', outcome: 'Not quite — Students often believe **"Public Law = Constitutional Law"** and **"Private Law = Civil Law"**.', reveals: 'public-law-constitutional-law-and' },
                { text: 'Private Law = Civil Law', outcome: 'Not quite — Students often believe **"Public Law = Constitutional Law"** and **"Private Law = Civil Law"**.', reveals: 'public-law-constitutional-law-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_07_002', title: 'Classification of Laws — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Imagine you witness a car accident: the driver runs a red light and hits a pedestrian. Ask: "Which law applies? Who files the case?',
            decisions: [{ prompt: 'Define "Municipal Law" as used in the NCERT Classification of Laws chapter.', options: [
                { text: 'Municipal Law is the domestic/national law of a country (e.g., Indian Constitution, IPC,', outcome: 'Municipal Law is the domestic/national law of a country (e.g., Indian Constitution, IPC, CPC).' },
                { text: 'Municipal Law = city bylaws', outcome: 'Not quite — Students believe "Civil Law" and "Private Law" are synonyms, and "Criminal Law" and "Public Law".', reveals: 'civil-law-and-private-law' },
                { text: 'municipal', outcome: 'Not quite — Students believe "Civil Law" and "Private Law" are synonyms, and "Criminal Law" and "Public Law".', reveals: 'civil-law-and-private-law' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_07_003', title: 'Classification of Laws — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Imagine a Class 11 student, Arjun, whose phone is stolen in school. He asks: "Is this a civil case or criminal? Do I file an FIR or a suit?',
            decisions: [{ prompt: 'Define "Substantive Law" and "Procedural Law" as per the NCERT Classification of Laws chapter, and give one statutory example of each from.', options: [
                { text: 'Substantive Law defines rights, duties, and liabilities (e.g., Indian Penal Code, 1860', outcome: 'Substantive Law defines rights, duties, and liabilities (e.g., Indian Penal Code, 1860 defining.' },
                { text: 'Public Law = Laws made by Parliament', outcome: 'Not quite — Students believe "Public Law = Laws made by Parliament" and "Private Law = Laws made by private.', reveals: 'public-law-laws-made-by' },
                { text: 'Private Law = Laws made by private bodies', outcome: 'Not quite — Students believe "Public Law = Laws made by Parliament" and "Private Law = Laws made by private.', reveals: 'public-law-laws-made-by' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_07_004', title: 'Classification of Laws — Processes and Procedures',
          caseStudy: { intro: 'Start with a relatable scenario: "You bought a phone online, but it arrived damaged. You have a *right* to a refund (substantive law: Consumer Protection Act).',
            decisions: [{ prompt: 'Define substantive law and procedural law in your own words, giving one Indian example of each.', options: [
                { text: 'Substantive law defines rights/duties (e.g., IPC Section 300 defines murder as an offence)', outcome: 'Substantive law defines rights/duties (e.g., IPC Section 300 defines murder as an offence).' },
                { text: 'procedural law = court procedures only (CPC/CrPC)', outcome: 'Not quite — Students often think "procedural law = court procedures only (CPC/CrPC)" and miss that **every.', reveals: 'procedural-law-court-procedures-only' },
                { text: 'processes', outcome: 'Not quite — Students often think "procedural law = court procedures only (CPC/CrPC)" and miss that **every.', reveals: 'procedural-law-court-procedures-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_07_005', title: 'Classification of Laws — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'A student receives a legal problem: "Shefali\'s passport was refused by the Passport Department without any reason." Ask: "Which court does she approach?',
            decisions: [{ prompt: 'Define \'Substantive Law\' and \'Procedural Law\' and give one example of each from Indian legislation.', options: [
                { text: 'Substantive Law defines rights, duties, and liabilities (e.g., Indian Penal Code, 1860', outcome: 'Substantive Law defines rights, duties, and liabilities (e.g., Indian Penal Code, 1860 defines.' },
                { text: 'Municipal', outcome: 'Not quite — Students often believe **\'Municipal Law\' only means local city bylaws** (like municipal corporation.', reveals: 'municipal-law-only-means-local' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_07_006', title: 'Classification of Laws — Critical Analysis and Application',
          caseStudy: { intro: 'Imagine your cousin in Delhi gets into a property dispute with a builder, while your friend in Mumbai faces a cyberbullying case — both need legal help, but.',
            decisions: [{ prompt: 'What is the fundamental difference between civil law and criminal law in terms of who initiates the action and the nature of remedy?', options: [
                { text: 'In civil law, the aggrieved individual initiates the action and the remedy is typically', outcome: 'In civil law, the aggrieved individual initiates the action and the remedy is typically.' },
                { text: 'Public Law = Government cases, Private Law = Non-government cases', outcome: 'Not quite — Students believe "Public Law = Government cases, Private Law = Non-government cases" — but the real.', reveals: 'public-law-government-cases' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_07_001', title: 'Classification of Laws — Key Concepts and Institutions',
          caseStudy: { intro: 'Start with a real-world scenario: "You’re a lawyer. A client walks in — her passport was seized without hearing. Another client — his factory pollutes a river.',
            decisions: [{ prompt: 'Define "Criminal Law" and "Civil Law" as per the NCERT classification based on subject matter. Give one example of each.', options: [
                { text: 'Criminal Law covers acts prohibited by law that affect society as a whole', outcome: 'Criminal Law covers acts prohibited by law that affect society as a whole; action is initiated.' },
                { text: 'Public Law = Constitutional Law', outcome: 'Not quite — Students often believe **"Public Law = Constitutional Law"** and **"Private Law = Civil Law"**.', reveals: 'public-law-constitutional-law-and' },
                { text: 'Private Law = Civil Law', outcome: 'Not quite — Students often believe **"Public Law = Constitutional Law"** and **"Private Law = Civil Law"**.', reveals: 'public-law-constitutional-law-and' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_leg_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'Classification of Laws', spots: [
            { id: 's1', label: 'Classification of Laws Key Concepts and Institutions', prompt: 'Which idea is this? — Classification of Laws is the systematic categorization of legal rules into distinct.', answer: 'Classification of Laws Key Concepts and Institutions', options: ['Classification of Laws Key Concepts and Institutions', 'Classification of Laws Constitutional and Legal Provisions', 'Classification of Laws Landmark Cases and Illustrations', 'Classification of Laws Processes and Procedures'] },
            { id: 's2', label: 'Classification of Laws Constitutional and Legal Provisions', prompt: 'Which idea is this? — Classification of Laws is the systematic arrangement of legal rules into distinct.', answer: 'Classification of Laws Constitutional and Legal Provisions', options: ['Classification of Laws Constitutional and Legal Provisions', 'Classification of Laws Key Concepts and Institutions', 'Classification of Laws Landmark Cases and Illustrations', 'Classification of Laws Processes and Procedures'] },
            { id: 's3', label: 'Classification of Laws Landmark Cases and Illustrations', prompt: 'Which idea is this? — Classification of laws is the systematic grouping of legal rules into distinct.', answer: 'Classification of Laws Landmark Cases and Illustrations', options: ['Classification of Laws Landmark Cases and Illustrations', 'Classification of Laws Key Concepts and Institutions', 'Classification of Laws Constitutional and Legal Provisions', 'Classification of Laws Processes and Procedures'] },
            { id: 's4', label: 'Classification of Laws Processes and Procedures', prompt: 'Which idea is this? — Classification of laws based on processes and procedures distinguishes between.', answer: 'Classification of Laws Processes and Procedures', options: ['Classification of Laws Processes and Procedures', 'Classification of Laws Key Concepts and Institutions', 'Classification of Laws Constitutional and Legal Provisions', 'Classification of Laws Landmark Cases and Illustrations'] },
            { id: 's5', label: 'Classification of Laws Exam-Oriented Questions and Answers', prompt: 'Which idea is this? — Classification of Laws is the systematic arrangement of legal rules into distinct.', answer: 'Classification of Laws Exam-Oriented Questions and Answers', options: ['Classification of Laws Exam-Oriented Questions and Answers', 'Classification of Laws Key Concepts and Institutions', 'Classification of Laws Constitutional and Legal Provisions', 'Classification of Laws Landmark Cases and Illustrations'] },
            { id: 's6', label: 'Classification of Laws Critical Analysis and Application', prompt: 'Which idea is this? — Classification of Laws is the systematic categorization of legal rules based on subject.', answer: 'Classification of Laws Critical Analysis and Application', options: ['Classification of Laws Critical Analysis and Application', 'Classification of Laws Key Concepts and Institutions', 'Classification of Laws Constitutional and Legal Provisions', 'Classification of Laws Landmark Cases and Illustrations'] }
          ] } },
        { type: 'case', nodeId: 'c11_leg_cbse_07_006', title: 'You made it',
          caseStudy: { intro: 'You finished Classification of Laws — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_leg_cbse_07_001', difficulty: 'standard',
          question: 'Classification of Laws is the systematic categorization of legal rules into.',
          hint: 'If stuck, review the "State and Government" distinction in Chapter 1 (Unit 1) and the.',
          misconception: 'Students often believe **"Public Law = Constitutional Law"** and **"Private Law = Civil Law"** as exact equivalences.',
          parts: [
                { id: 'a', prompt: 'Define "Criminal Law" and "Civil Law" as per the NCERT classification based on subject matter. Give one example of each.', answer: 'Criminal Law covers acts prohibited by law that affect society as a whole',
                  options: ['Criminal Law covers acts prohibited by law that affect society as a whole', 'Public Law = Constitutional Law', 'Private Law = Civil Law', 'civil cases are filed by the State'],
                  hint: 'If stuck, review the "State and Government" distinction in Chapter 1 (Unit 1) and the "Fundamental.',
                  misconception: 'Students often believe **"Public Law = Constitutional Law"** and **"Private Law = Civil Law"** as exact equivalences. This is wrong.' },
                { id: 'b', prompt: 'Compare and contrast Public International Law and Private International Law on three dimensions: (a) parties involved, (b) source of obligation, (c).', answer: '| Dimension | Public International Law | Private International Law |',
                  options: ['| Dimension | Public International Law | Private International Law |', 'Public Law = Constitutional Law', 'Private Law = Civil Law', 'both bind States'],
                  hint: 'If stuck, review the "State and Government" distinction in Chapter 1 (Unit 1) and the "Fundamental.',
                  misconception: 'Students often believe **"Public Law = Constitutional Law"** and **"Private Law = Civil Law"** as exact equivalences. This is wrong.' }
          ],
            remediations: { 'public-law-constitutional-law-and': { steps: ['Draw the full classification tree on paper — Subject Matter → Scope → Jurisdiction (Municipal → Public/Private.', 'Take 5 real news headlines (e.g., "SC strikes down sedition law", "NRI couple divorces in Delhi", "India-Pakistan water.', 'For each, ask: "Who are the parties? What right is violated? What remedy is sought? Which court?"', 'Verify with the textbook’s classification chart (p. 80–81). Repeat until classification becomes automatic — like.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_07_002', difficulty: 'standard',
          question: 'Classification of Laws is the systematic arrangement of legal rules into.',
          hint: 'Review "Concept of State and Article 12" (Unit 1, Chapter 1) to clarify what "State".',
          misconception: 'Students believe "Civil Law" and "Private Law" are synonyms, and "Criminal Law" and "Public Law" are synonyms.',
          parts: [
                { id: 'a', prompt: 'Explain why "Criminal Law" is classified under "Public Municipal Law" while "Law of Torts" falls under "Private Municipal Law," even though both deal with.', answer: 'Criminal Law is Public',
                  options: ['Criminal Law is Public', 'both are public because courts are involved', 'Civil Law', 'Private Law'],
                  hint: 'Review "Concept of State and Article 12" (Unit 1, Chapter 1) to clarify what "State" means.',
                  misconception: 'Students believe "Civil Law" and "Private Law" are synonyms, and "Criminal Law" and "Public Law" are synonyms.' },
                { id: 'b', prompt: 'Scenario: A consumer files a complaint in the District Consumer Forum against an e-commerce company for delivering a defective phone.', answer: '(1) Subject Matter: **Civil Law**',
                  options: ['(1) Subject Matter: **Civil Law**', 'Criminal because cheating', 'Civil Law', 'Private Law'],
                  hint: 'Review "Concept of State and Article 12" (Unit 1, Chapter 1) to clarify what "State" means.',
                  misconception: 'Students believe "Civil Law" and "Private Law" are synonyms, and "Criminal Law" and "Public Law" are synonyms.' },
                { id: 'c', prompt: 'Compare "Public International Law" and "Private International Law" using the criteria: (a) Parties involved, (b) Source of obligation, (c) Example from NCERT.', answer: 'Parties involved, (',
                  options: ['Parties involved, (', 'Civil Law', 'Private Law', 'Criminal Law'],
                  hint: 'Review "Concept of State and Article 12" (Unit 1, Chapter 1) to clarify what "State" means.',
                  misconception: 'Students believe "Civil Law" and "Private Law" are synonyms, and "Criminal Law" and "Public Law" are synonyms.' }
          ],
            remediations: { 'civil-law-and-private-law': { steps: ['Draw a 2x2 matrix on paper: Rows = Subject Matter (Civil, Criminal); Columns = Jurisdiction (Public Municipal, Private.', 'Place IPC, CrPC, CPC, Constitution, Contract Act, Transfer of Property Act, Hindu Marriage Act, Law of Torts in the.', 'Realize Criminal Law fits *only* in Public Municipal; Civil Law spans *both* Public (writ petition) and Private.', 'Re-read NCERT page 81 "Municipal Law" diagram until the overlap is clear.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Civil Law" and "Private Law" are synonyms, and "Criminal Law" and "Public Law" are synonyms.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "The Code of Criminal Procedure (CrPC) is a Substantive Law because it defines the punishment for murder." Is it accurate?', answer: 'Inaccurate',
                  options: ['Inaccurate', 'Civil Law', 'Private Law', 'Criminal Law'],
                  hint: 'Review "Concept of State and Article 12" (Unit 1, Chapter 1) to clarify what "State" means.',
                  misconception: 'Students believe "Civil Law" and "Private Law" are synonyms, and "Criminal Law" and "Public Law" are synonyms.' },
                { id: 'b', prompt: 'Create a novel 3-column "Classification Decision Tree" for a junior student to identify the branch of law for any legal problem.', answer: '| Question to Ask | Answer Options | Classification Result | |---|---|---| | 1',
                  options: ['| Question to Ask | Answer Options | Classification Result | |---|---|---| | 1', 'Civil Law', 'Private Law', 'Criminal Law'],
                  hint: 'Review "Concept of State and Article 12" (Unit 1, Chapter 1) to clarify what "State" means.',
                  misconception: 'Students believe "Civil Law" and "Private Law" are synonyms, and "Criminal Law" and "Public Law" are synonyms.' }
          ],
            remediations: { 'civil-law-and-private-law': { steps: ['Draw a 2x2 matrix on paper: Rows = Subject Matter (Civil, Criminal); Columns = Jurisdiction (Public Municipal, Private.', 'Place IPC, CrPC, CPC, Constitution, Contract Act, Transfer of Property Act, Hindu Marriage Act, Law of Torts in the.', 'Realize Criminal Law fits *only* in Public Municipal; Civil Law spans *both* Public (writ petition) and Private.', 'Re-read NCERT page 81 "Municipal Law" diagram until the overlap is clear.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_07_003', difficulty: 'standard',
          question: 'Classification of laws is the systematic grouping of legal rules into distinct.',
          hint: 'Re-read NCERT Class 11 Legal Studies Chapter 7, Section I (Subject Matter), II (Scope).',
          misconception: 'Students believe "Public Law = Laws made by Parliament" and "Private Law = Laws made by private bodies." **Wrong.**.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since the Hindu Marriage Act, 1955 provides for divorce, it is a procedural law because it tells you how to get divorced." Explain why this.', answer: 'The Hindu Marriage Act, 1955 is a **substantive law**',
                  options: ['The Hindu Marriage Act, 1955 is a **substantive law**', 'Public Law = Laws made by Parliament', 'Private Law = Laws made by private bodies'],
                  hint: 'Re-read NCERT Class 11 Legal Studies Chapter 7, Section I (Subject Matter), II (Scope), III.',
                  misconception: 'Students believe "Public Law = Laws made by Parliament" and "Private Law = Laws made by private bodies." **Wrong.** Public Law governs.' },
                { id: 'b', prompt: 'Scenario: Priya (Indian citizen) enters into a contract with a US-based company for software services. The company fails to pay. Priya wants to sue.', answer: 'Subject Matter, (',
                  options: ['Subject Matter, (', 'Public Law = Laws made by Parliament', 'Private Law = Laws made by private bodies'],
                  hint: 'Re-read NCERT Class 11 Legal Studies Chapter 7, Section I (Subject Matter), II (Scope), III.',
                  misconception: 'Students believe "Public Law = Laws made by Parliament" and "Private Law = Laws made by private bodies." **Wrong.** Public Law governs.' }
          ],
            remediations: { 'public-law-laws-made-by': { steps: ['**Draw the 2x2 matrix**: X-axis = Subject Matter (Civil/Criminal), Y-axis = Scope (Substantive/Procedural).', 'Place IPC, CrPC, CPC, Contract Act, Hindu Marriage Act, Consumer Protection Act in the four quadrants.', '**Take 5 daily-life scenarios** (e.g., divorce, cheating, building collapse, passport denial, cross-border e-commerce.', '**Verbal drill**: "If I say \'Section 420 IPC\', you say \'Substantive Criminal Municipal Public Law\'.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_07_004', difficulty: 'standard',
          question: 'Classification of laws based on processes and procedures distinguishes between.',
          hint: 'Review the "Classification based on Scope of Law" section in Chapter 2 (Classification.',
          misconception: 'Students often think "procedural law = court procedures only (CPC/CrPC)" and miss that **every substantive statute has.',
          parts: [
                { id: 'a', prompt: 'Explain why the distinction between substantive and procedural law matters in a real legal dispute.', answer: 'The distinction matters',
                  options: ['The distinction matters', 'substantive law is more important', 'procedural law = court procedures only (CPC/CrPC)', 'processes'],
                  hint: 'Review the "Classification based on Scope of Law" section in Chapter 2 (Classification of Laws).',
                  misconception: 'Students often think "procedural law = court procedures only (CPC/CrPC)" and miss that **every substantive statute has its own procedural.' },
                { id: 'b', prompt: 'A new law is passed: "All citizens have the right to clean drinking water." The law does not specify how to complain, which authority to approach, or what.', answer: 'This is a substantive law (creates a right) without accompanying procedural law',
                  options: ['This is a substantive law (creates a right) without accompanying procedural law', 'procedural', 'complete', 'procedural law = court procedures only (CPC/CrPC)'],
                  hint: 'Review the "Classification based on Scope of Law" section in Chapter 2 (Classification of Laws).',
                  misconception: 'Students often think "procedural law = court procedures only (CPC/CrPC)" and miss that **every substantive statute has its own procedural.' }
          ],
            remediations: { 'procedural-law-court-procedures-only': { steps: ['Ask the student to pick any recent Indian law (e.g., Digital Personal Data Protection Act, 2023) and separate its.', 'Have them trace a real FIR-to-trial flowchart (CrPC) and label each step as procedural.', 'Contrast with a Money Bill journey in Parliament (Article 109-110) to distinguish legislative procedure from legal.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_07_005', difficulty: 'standard',
          question: 'Classification of Laws is the systematic arrangement of legal rules into.',
          hint: 'Review c11_leg_cbse_07_002 (Constitutional and Legal Framework) — specifically Article 12.',
          misconception: 'Students often believe **\'Municipal Law\' only means local city bylaws** (like municipal corporation rules on property.',
          parts: [
                { id: 'a', prompt: 'Explain why \'Criminal Law\' is classified under \'Public Municipal Law\' and not \'Private Municipal Law\', even though a specific individual is the victim.', answer: 'Criminal Law is Public Law',
                  options: ['Criminal Law is Public Law', 'Municipal'],
                  hint: 'Review c11_leg_cbse_07_002 (Constitutional and Legal Framework) — specifically Article 12 \'State\'.',
                  misconception: 'Students often believe **\'Municipal Law\' only means local city bylaws** (like municipal corporation rules on property tax or building.' },
                { id: 'b', prompt: 'A dispute arises between India and Pakistan over the interpretation of a bilateral treaty on water sharing.', answer: 'Branch: International Law',
                  options: ['Branch: International Law', 'Municipal'],
                  hint: 'Review c11_leg_cbse_07_002 (Constitutional and Legal Framework) — specifically Article 12 \'State\'.',
                  misconception: 'Students often believe **\'Municipal Law\' only means local city bylaws** (like municipal corporation rules on property tax or building.' },
                { id: 'c', prompt: 'Compare \'Public International Law\' and \'Private International Law\' on three dimensions: parties involved, source of obligation, and enforcement mechanism.', answer: 'Public International Law: Parties = States/International Organisations',
                  options: ['Public International Law: Parties = States/International Organisations', 'Municipal'],
                  hint: 'Review c11_leg_cbse_07_002 (Constitutional and Legal Framework) — specifically Article 12 \'State\'.',
                  misconception: 'Students often believe **\'Municipal Law\' only means local city bylaws** (like municipal corporation rules on property tax or building.' }
          ],
            remediations: { 'municipal-law-only-means-local': { steps: ['Write "Municipal Law = National/Domestic Law" on a flashcard.', 'Draw the Jurisdiction tree: Law → International (Public/Private) vs Municipal (Public/Private).', 'Place IPC, CPC, Constitution, Contract Act on the Municipal branches.', 'Re-read NCERT p.80-81: "Municipal laws are basically domestic or national laws." 5.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_07_006', difficulty: 'standard',
          question: 'Classification of Laws is the systematic categorization of legal rules based.',
          hint: 'If stuck, review the "State vs Government" distinction in c11_leg_cbse_07_001 and Article.',
          misconception: 'Students believe "Public Law = Government cases, Private Law = Non-government cases" — but the real distinction.',
          parts: [
                { id: 'a', prompt: 'A consumer files a complaint in the District Consumer Commission against a hospital for medical negligence.', answer: 'subject matter, (',
                  options: ['subject matter, (', 'Public Law = Government cases, Private Law = Non-government cases'],
                  hint: 'If stuck, review the "State vs Government" distinction in c11_leg_cbse_07_001 and Article 12.',
                  misconception: 'Students believe "Public Law = Government cases, Private Law = Non-government cases" — but the real distinction is: Public Law governs.' }
          ],
            remediations: { 'public-law-government-cases': { steps: ['Draw a 2x2 matrix — rows: Vertical (State-individual) vs Horizontal (individual-individual); columns: Subject matter.', 'Place examples in each cell: Tax dispute (Public-Civil), Murder (Public-Criminal), Breach of contract (Private-Civil).', 'Ask student to classify: "A municipal corporation sues a contractor for poor road work" — guide them to see it\'s.', 'Reinforce: "Public/Private depends on *legal relationship*, not *identity of parties*."'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
