import type { SimDef } from '../../engine/types';

/** v3 generated — c12_leg_ch01 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_leg_ch01: SimDef = {
    id: 'v3_c12_leg_ch01',
    title: 'Judiciary',
    subtitle: 'This node covers the **structure, hierarchy, legal officers (AG/SG/Advocate General), and.',
    classLevel: 12, subject: 'leg', topic: 'Judiciary',
    chapters: ['c12_leg_ch01'],
    nodeIds: ['c12_leg_cbse_01_001', 'c12_leg_cbse_01_002', 'c12_leg_cbse_01_003', 'c12_leg_cbse_01_004', 'c12_leg_cbse_01_005', 'c12_leg_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start by asking: "If a dispute arises between the Centre and a State over river water sharing, which court.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'How many High Courts exist in India as of 2024, and which constitutional article provides for the establishment of a High Court for each State (or group.',
        options: ['There are 25 High Courts in India (as of 2024)', '28 High Courts', 'coordinate jurisdiction'],
        answer: 'There are 25 High Courts in India (as of 2024)',
        hook: '**Misconception:** "High Courts are subordinate to the Supreme Court *only* in appeals." **Reality:** High Courts are.',
    },
    teaching: [
        { title: 'Judiciary — Key Concepts and Institutions', text: 'The Indian Judiciary is a single, integrated, and independent system of courts established by the Constitution, comprising the Supreme Court (apex), High Courts (state-level), and Subordinate Courts.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_leg_cbse_01_001', title: 'Judiciary — Key Concepts and Institutions',
          caseStudy: { intro: 'Start by asking: "If a dispute arises between the Centre and a State over river water sharing, which court hears it *first* and *why*?" (Answer: Supreme Court.',
            decisions: [{ prompt: 'How many High Courts exist in India as of 2024, and which constitutional article provides for the establishment of a High Court for each.', options: [
                { text: 'There are 25 High Courts in India (as of 2024)', outcome: 'There are 25 High Courts in India (as of 2024). Article 214 of the Constitution mandates a High.' },
                { text: '28 High Courts', outcome: 'Not quite — **Misconception:** "High Courts are subordinate to the Supreme Court *only* in appeals.".', reveals: 'misconception-high-courts-are-subordinate' },
                { text: 'coordinate jurisdiction', outcome: 'Not quite — **Misconception:** "High Courts are subordinate to the Supreme Court *only* in appeals.".', reveals: 'misconception-high-courts-are-subordinate' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_01_002', title: 'Judiciary — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with this scenario: "A farmer in Punjab has a water-sharing dispute with Haryana. A citizen in Kerala is illegally detained.',
            decisions: [{ prompt: 'What is the constitutional basis for the Supreme Court\'s original jurisdiction in disputes between the Government of India and one or more.', options: [
                { text: 'Article 131 of the Constitution grants the Supreme Court exclusive original jurisdiction', outcome: 'Article 131 of the Constitution grants the Supreme Court exclusive original jurisdiction.' },
                { text: 'distinguish', outcome: 'Not quite — Students believe **Article 32 (Supreme Court writ jurisdiction) and Article 226 (High Court writ.', reveals: 'article-32-supreme-court-writ' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_01_003', title: 'Judiciary — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with a real situation: "A factory leaks toxic gas near a residential colony.',
            decisions: [{ prompt: 'What is the binding value of the Supreme Court\'s advisory opinion under Article 143, as clarified in *In re Kerala Education Bill* (1958).', options: [
                { text: 'Correct: In *Kerala Education Bill*, the Court held its advisory opinion is **not', outcome: 'Correct: In *Kerala Education Bill*, the Court held its advisory opinion is **not binding** (not.' },
                { text: 'always binding', outcome: 'Not quite — Students believe **every Supreme Court judgment is a "landmark case"**.', reveals: 'every-supreme-court-judgment-is' },
                { text: 'never binding', outcome: 'Not quite — Students believe **every Supreme Court judgment is a "landmark case"**.', reveals: 'every-supreme-court-judgment-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_01_004', title: 'Judiciary — Processes and Procedures',
          caseStudy: { intro: 'Start with a real scenario: "Your neighbor\'s factory releases toxic smoke — you want to stop it *fast*.',
            decisions: [{ prompt: 'What is the pecuniary jurisdiction of a District Munsiff Court in a civil suit for recovery of money, and who determines it?', options: [
                { text: 'The pecuniary jurisdiction of a District Munsiff Court is notified by the respective', outcome: 'The pecuniary jurisdiction of a District Munsiff Court is notified by the respective State.' },
                { text: 'file PIL against potholes', outcome: 'Not quite — Students think **PIL can be filed for *any* public issue** — e.g., "file PIL against potholes." But.', reveals: 'pil-can-be-filed-for' },
                { text: '**PIL can be filed for *any* public issue**', outcome: 'Not quite — Students think **PIL can be filed for *any* public issue** — e.g., "file PIL against potholes." But.', reveals: 'pil-can-be-filed-for' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_01_005', title: 'Judiciary — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'Imagine you\'re a lawyer arguing before the Supreme Court: your client\'s fundamental right to livelihood (Article 21) is violated by a municipal demolition.',
            decisions: [{ prompt: 'State the constitutional provisions for the original jurisdiction of the Supreme Court under Article 131 and Article 32.', options: [
                { text: 'Article 131 grants original jurisdiction in disputes between the Government of India and', outcome: 'Article 131 grants original jurisdiction in disputes between the Government of India and one.' },
                { text: 'legal right', outcome: 'Not quite — Students often believe "judicial review" means the Supreme Court can review *any* government.', reveals: 'judicial-review-means-the-supreme' },
                { text: 'judicial review', outcome: 'Not quite — Students often believe "judicial review" means the Supreme Court can review *any* government.', reveals: 'judicial-review-means-the-supreme' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_01_006', title: 'Judiciary — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a real scenario: "In 2015, the Supreme Court struck down the National Judicial Appointments Commission (NJAC) Act — a law passed by Parliament.',
            decisions: [{ prompt: 'What are the two grounds on which a Supreme Court or High Court judge can be removed, and what is the required parliamentary majority for.', options: [
                { text: 'Grounds: "proven misbehaviour" and "incapacity" (Art', outcome: 'Grounds: "proven misbehaviour" and "incapacity" (Art. 124(4)).' },
                { text: 'simple majority', outcome: 'Not quite — Students often believe "Judicial Review = Judicial Activism = Judicial Overreach." They treat these.', reveals: 'judicial-review-judicial-activism-judicial' },
                { text: 'corruption/negligence', outcome: 'Not quite — Students often believe "Judicial Review = Judicial Activism = Judicial Overreach." They treat these.', reveals: 'judicial-review-judicial-activism-judicial' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_01_006', title: 'Judiciary — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a real scenario: "In 2015, the Supreme Court struck down the National Judicial Appointments Commission (NJAC) Act — a law passed by Parliament.',
            decisions: [{ prompt: 'What are the two grounds on which a Supreme Court or High Court judge can be removed, and what is the required parliamentary majority for.', options: [
                { text: 'Grounds: "proven misbehaviour" and "incapacity" (Art', outcome: 'Grounds: "proven misbehaviour" and "incapacity" (Art. 124(4)).' },
                { text: 'simple majority', outcome: 'Not quite — Students often believe "Judicial Review = Judicial Activism = Judicial Overreach." They treat these.', reveals: 'judicial-review-judicial-activism-judicial' },
                { text: 'corruption/negligence', outcome: 'Not quite — Students often believe "Judicial Review = Judicial Activism = Judicial Overreach." They treat these.', reveals: 'judicial-review-judicial-activism-judicial' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_leg_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'Judiciary', spots: [
            { id: 's1', label: 'Judiciary Key Concepts and Institutions', prompt: 'Which idea is this? — The Indian Judiciary is a single, integrated, and independent system of courts.', answer: 'Judiciary Key Concepts and Institutions', options: ['Judiciary Key Concepts and Institutions', 'Judiciary Constitutional and Legal Provisions', 'Judiciary Landmark Cases and Illustrations', 'Judiciary Processes and Procedures'] },
            { id: 's2', label: 'Judiciary Constitutional and Legal Provisions', prompt: 'Which idea is this? — The Indian Judiciary is an integrated, hierarchical system of courts established by the.', answer: 'Judiciary Constitutional and Legal Provisions', options: ['Judiciary Constitutional and Legal Provisions', 'Judiciary Key Concepts and Institutions', 'Judiciary Landmark Cases and Illustrations', 'Judiciary Processes and Procedures'] },
            { id: 's3', label: 'Judiciary Landmark Cases and Illustrations', prompt: 'Which idea is this? — Landmark cases in Indian judiciary are binding precedents set by the Supreme Court.', answer: 'Judiciary Landmark Cases and Illustrations', options: ['Judiciary Landmark Cases and Illustrations', 'Judiciary Key Concepts and Institutions', 'Judiciary Constitutional and Legal Provisions', 'Judiciary Processes and Procedures'] },
            { id: 's4', label: 'Judiciary Processes and Procedures', prompt: 'Which idea is this? — Judiciary — Processes and Procedures refers to the operational mechanisms through which.', answer: 'Judiciary Processes and Procedures', options: ['Judiciary Processes and Procedures', 'Judiciary Key Concepts and Institutions', 'Judiciary Constitutional and Legal Provisions', 'Judiciary Landmark Cases and Illustrations'] },
            { id: 's5', label: 'Judiciary Exam-Oriented Questions and Answers', prompt: 'Which idea is this? — The Indian judiciary is an integrated, hierarchical system of courts headed by the.', answer: 'Judiciary Exam-Oriented Questions and Answers', options: ['Judiciary Exam-Oriented Questions and Answers', 'Judiciary Key Concepts and Institutions', 'Judiciary Constitutional and Legal Provisions', 'Judiciary Landmark Cases and Illustrations'] },
            { id: 's6', label: 'Judiciary Critical Analysis and Application', prompt: 'Which idea is this? — The Indian Judiciary is an integrated, hierarchical system of courts headed by the.', answer: 'Judiciary Critical Analysis and Application', options: ['Judiciary Critical Analysis and Application', 'Judiciary Key Concepts and Institutions', 'Judiciary Constitutional and Legal Provisions', 'Judiciary Landmark Cases and Illustrations'] }
          ] } },
        { type: 'case', nodeId: 'c12_leg_cbse_01_006', title: 'You made it',
          caseStudy: { intro: 'You finished Judiciary — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_leg_cbse_01_001', difficulty: 'standard',
          question: 'The Indian Judiciary is a single, integrated, and independent system of courts.',
          hint: 'If confused about "integrated judiciary," revisit Class 11 Political Science Chapter.',
          misconception: '**Misconception:** "High Courts are subordinate to the Supreme Court *only* in appeals." **Reality:** High Courts are.',
          parts: [
                { id: 'a', prompt: 'How many High Courts exist in India as of 2024, and which constitutional article provides for the establishment of a High Court for each State (or group.', answer: 'There are 25 High Courts in India (as of 2024)',
                  options: ['There are 25 High Courts in India (as of 2024)', '28 High Courts', 'coordinate jurisdiction'],
                  hint: 'If confused about "integrated judiciary," revisit Class 11 Political Science Chapter \'Federalism\'.',
                  misconception: '**Misconception:** "High Courts are subordinate to the Supreme Court *only* in appeals." **Reality:** High Courts are *constitutionally*.' },
                { id: 'b', prompt: 'Compare the "Adversarial" and "Inquisitorial" models on: (a) Role of the Judge, (b) Role of Lawyers, (c) Truth-finding mechanism.', answer: '**Adversarial (India):** Judge = neutral umpire',
                  options: ['**Adversarial (India):** Judge = neutral umpire', 'coordinate jurisdiction'],
                  hint: 'If confused about "integrated judiciary," revisit Class 11 Political Science Chapter \'Federalism\'.',
                  misconception: '**Misconception:** "High Courts are subordinate to the Supreme Court *only* in appeals." **Reality:** High Courts are *constitutionally*.' }
          ],
            remediations: { 'misconception-high-courts-are-subordinate': { steps: ['**Re-read NCERT Section A.I.i & A.I.ii** focusing on the phrases "single integrated system" and "hierarchy of lower.', '**Create a 3-column table**: Feature | Supreme Court | High Court | Subordinate Court.', 'Fill: Constitutional Article, Composition, Retirement Age, Appointing Authority, Binding Precedent?', '**Watch a 5-min video** on "Integrated Judiciary vs Dual Court System (US)" to visualize the federalism link.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "High Courts are subordinate to the Supreme Court *only* in appeals." **Reality:** High Courts are.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "The Attorney General of India (AGI) is the *only* constitutional law officer; the Solicitor General (SG) and Advocate General (State).', answer: 'The statement is **partially incorrect**',
                  options: ['The statement is **partially incorrect**', 'coordinate jurisdiction'],
                  hint: 'If confused about "integrated judiciary," revisit Class 11 Political Science Chapter \'Federalism\'.',
                  misconception: '**Misconception:** "High Courts are subordinate to the Supreme Court *only* in appeals." **Reality:** High Courts are *constitutionally*.' },
                { id: 'b', prompt: 'Design a "Judiciary Flowchart" for a new Class 11 student showing: (1) The 3-tier court hierarchy with *current* judge strengths (SC: 34, HC: variable.', answer: '**Expected Output:** A flowchart with boxes: **Supreme Court (Art',
                  options: ['**Expected Output:** A flowchart with boxes: **Supreme Court (Art', 'coordinate jurisdiction'],
                  hint: 'If confused about "integrated judiciary," revisit Class 11 Political Science Chapter \'Federalism\'.',
                  misconception: '**Misconception:** "High Courts are subordinate to the Supreme Court *only* in appeals." **Reality:** High Courts are *constitutionally*.' }
          ],
            remediations: { 'misconception-high-courts-are-subordinate': { steps: ['**Re-read NCERT Section A.I.i & A.I.ii** focusing on the phrases "single integrated system" and "hierarchy of lower.', '**Create a 3-column table**: Feature | Supreme Court | High Court | Subordinate Court.', 'Fill: Constitutional Article, Composition, Retirement Age, Appointing Authority, Binding Precedent?', '**Watch a 5-min video** on "Integrated Judiciary vs Dual Court System (US)" to visualize the federalism link.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_01_002', difficulty: 'standard',
          question: 'The Indian Judiciary is an integrated, hierarchical system of courts.',
          hint: 'If stuck on "why collegium?", revisit *Second Judges Case (1993)* — the pivot where.',
          misconception: 'Students believe **Article 32 (Supreme Court writ jurisdiction) and Article 226 (High Court writ jurisdiction) are.',
          parts: [
                { id: 'a', prompt: 'Compare the grounds and procedure for removal of a Supreme Court judge vs. a District Judge. Why is the former so stringent?', answer: 'Supreme Court/High Court judges: removed only by impeachment (Art',
                  options: ['Supreme Court/High Court judges: removed only by impeachment (Art', 'distinguish'],
                  hint: 'If stuck on "why collegium?", revisit *Second Judges Case (1993)* — the pivot where "consultation".',
                  misconception: 'Students believe **Article 32 (Supreme Court writ jurisdiction) and Article 226 (High Court writ jurisdiction) are identical**.' }
          ],
            remediations: { 'article-32-supreme-court-writ': { steps: ['Re-read NCERT pages 6–10 (jurisdictions) and 16–20 (appointments/removal).', 'Create a 2-column table: "Article 32" vs "Article 226" with rows: Source, Nature (Right/Power), Scope (FR only /.', 'Solve 3 scenario-based MCQs: "X\'s fundamental right violated in Tamil Nadu — where can X file writ?" (Ans: Madras.', 'Watch 10-min video on *L. Chandra Kumar* (tribunals vs HCs) to fix tribunal hierarchy confusion.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_01_003', difficulty: 'standard',
          question: 'Landmark cases in Indian judiciary are binding precedents set by the Supreme.',
          hint: 'If stuck on identifying the "new principle" in a case, revisit the *Kesavananda Bharati*.',
          misconception: 'Students believe **every Supreme Court judgment is a "landmark case"**.',
          parts: [
                { id: 'a', prompt: 'Explain why *Hussainara Khatoon v. State of Bihar* (1979) is considered the "first PIL" in India, even though the writ petition was filed under Article 32 for.', answer: 'Correct: It pioneered **relaxed locus standi**',
                  options: ['Correct: It pioneered **relaxed locus standi**', 'it was about prison conditions', 'landmark case', '**every Supreme Court judgment is a "landmark case"**'],
                  hint: 'If stuck on identifying the "new principle" in a case, revisit the *Kesavananda Bharati* summary.',
                  misconception: 'Students believe **every Supreme Court judgment is a "landmark case"**.' },
                { id: 'b', prompt: 'A state government passes a law nationalizing all private hospitals. Doctors challenge it under Article 19(1)(g) (freedom of profession).', answer: 'Correct: **Yes, judicial review is available.** *Minerva Mills* struck down Art',
                  options: ['Correct: **Yes, judicial review is available.** *Minerva Mills* struck down Art', 'landmark case', '**every Supreme Court judgment is a "landmark case"**'],
                  hint: 'If stuck on identifying the "new principle" in a case, revisit the *Kesavananda Bharati* summary.',
                  misconception: 'Students believe **every Supreme Court judgment is a "landmark case"**.' },
                { id: 'c', prompt: 'Compare the *Rylands v. Fletcher* (Strict Liability) and *M.C. Mehta v.', answer: 'Correct: (a) Strict liability requires **escape** from defendant\'s land',
                  options: ['Correct: (a) Strict liability requires **escape** from defendant\'s land', 'landmark case', '**every Supreme Court judgment is a "landmark case"**'],
                  hint: 'If stuck on identifying the "new principle" in a case, revisit the *Kesavananda Bharati* summary.',
                  misconception: 'Students believe **every Supreme Court judgment is a "landmark case"**.' }
          ],
            remediations: { 'every-supreme-court-judgment-is': { steps: ['Re-read the *Hussainara Khatoon* and *Maneka Gandhi* summaries in the NCERT Supplementary Reading Material (pp.', '27-30) — highlight the **new right created** (speedy trial, fair procedure).', 'Make a 2-column table: "Old Rule" vs "New Principle Established" for each of the 12 textbook cases.', 'Re-attempt Diagnostic Q3 and Q4 — if still wrong, revisit c12_leg_cbse_01_002 (Constitutional Provisions) for Art.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_01_004', difficulty: 'standard',
          question: 'Judiciary — Processes and Procedures refers to the operational mechanisms.',
          hint: 'If stuck, revisit c12_leg_cbse_01_001 (court hierarchy) and c12_leg_cbse_01_002 (Art.',
          misconception: 'Students think **PIL can be filed for *any* public issue** — e.g., "file PIL against potholes." But SC guidelines.',
          parts: [
                { id: 'a', prompt: 'Explain why a writ petition under Article 226 can be filed in a High Court for enforcement of fundamental rights *and* "for any other purpose," while Article.', answer: 'Article 226\'s wider scope ("for any other purpose") lets High Courts review',
                  options: ['Article 226\'s wider scope ("for any other purpose") lets High Courts review', 'both are same', 'file PIL against potholes', '**PIL can be filed for *any* public issue**'],
                  hint: 'If stuck, revisit c12_leg_cbse_01_001 (court hierarchy) and c12_leg_cbse_01_002 (Art.',
                  misconception: 'Students think **PIL can be filed for *any* public issue** — e.g., "file PIL against potholes." But SC guidelines *exclude*.' },
                { id: 'b', prompt: 'A dispute arises between the Government of India and the State of Karnataka over sharing of Cauvery river water.', answer: 'The Supreme Court has original jurisdiction under Article 131',
                  options: ['The Supreme Court has original jurisdiction under Article 131', 'High Court under Art', 'any citizen can file', 'file PIL against potholes'],
                  hint: 'If stuck, revisit c12_leg_cbse_01_001 (court hierarchy) and c12_leg_cbse_01_002 (Art.',
                  misconception: 'Students think **PIL can be filed for *any* public issue** — e.g., "file PIL against potholes." But SC guidelines *exclude*.' },
                { id: 'c', prompt: 'Compare the *binding effect* of an arbitral award vs. a Lok Adalat award vs. a court judgment. Which has precedential value? Which can be appealed?', answer: 'Court judgment: binding, precedential (stare decisis), appealable',
                  options: ['Court judgment: binding, precedential (stare decisis), appealable', 'all have precedential value', 'file PIL against potholes', '**PIL can be filed for *any* public issue**'],
                  hint: 'If stuck, revisit c12_leg_cbse_01_001 (court hierarchy) and c12_leg_cbse_01_002 (Art.',
                  misconception: 'Students think **PIL can be filed for *any* public issue** — e.g., "file PIL against potholes." But SC guidelines *exclude*.' }
          ],
            remediations: { 'pil-can-be-filed-for': { steps: ['If student confuses PIL scope: (1) Give them the *exact SC guideline list* (10 admissible / 11 non-admissible.', 'This builds category-recognition muscle memory.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_01_005', difficulty: 'standard',
          question: 'The Indian judiciary is an integrated, hierarchical system of courts headed.',
          hint: 'If stuck on Basic Structure evolution, revisit c12_leg_cbse_01_003 (Landmark Cases) for.',
          misconception: 'Students often believe "judicial review" means the Supreme Court can review *any* government decision.',
          parts: [
                { id: 'a', prompt: 'A factory storing hazardous chemicals leaks toxic gas, killing 3 people and injuring 50 in a nearby residential colony.', answer: 'Absolute liability (M.C',
                  options: ['Absolute liability (M.C', 'judicial review', '"judicial review" means the Supreme Court can review *any* government decision'],
                  hint: 'If stuck on Basic Structure evolution, revisit c12_leg_cbse_01_003 (Landmark Cases) for the.',
                  misconception: 'Students often believe "judicial review" means the Supreme Court can review *any* government decision.' }
          ],
            remediations: { 'judicial-review-means-the-supreme': { steps: ['If the student conflates judicial review scopes: (1) Re-read NCERT Unit 1, Section E.2 ("Scope of Judicial Review.', '(2) Create a table: Column 1 = Scope head; Column 2 = Constitutional basis; Column 3 = Landmark case.', '(3) Practice classifying 5 scenarios (e.g., "State law on agriculture challenged as beyond State List" → Legislative.', '(4) Re-attempt Diagnostic Q4 and Q5.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_01_006', difficulty: 'standard',
          question: 'The Indian Judiciary is an integrated, hierarchical system of courts headed.',
          hint: 'If stuck on *why* collegium exists, revisit the "independence of judiciary" rationale.',
          misconception: 'Students often believe "Judicial Review = Judicial Activism = Judicial Overreach." They treat these as synonyms.',
          parts: [
                { id: 'a', prompt: 'What are the two grounds on which a Supreme Court or High Court judge can be removed, and what is the required parliamentary majority for the removal motion?', answer: 'Grounds: "proven misbehaviour" and "incapacity" (Art',
                  options: ['Grounds: "proven misbehaviour" and "incapacity" (Art', 'simple majority', 'corruption/negligence', 'Judicial Review = Judicial Activism = Judicial Overreach'],
                  hint: 'If stuck on *why* collegium exists, revisit the "independence of judiciary" rationale.',
                  misconception: 'Students often believe "Judicial Review = Judicial Activism = Judicial Overreach." They treat these as synonyms.' },
                { id: 'b', prompt: 'Explain why the Supreme Court in the *Second Judges Case (1993)* shifted primacy in judicial appointments from the Executive to the Chief Justice of India, and.', answer: 'The 1993 ruling held that "consultation" in Art',
                  options: ['The 1993 ruling held that "consultation" in Art', 'CJI has absolute power', 'Executive still has final say', 'Judicial Review = Judicial Activism = Judicial Overreach'],
                  hint: 'If stuck on *why* collegium exists, revisit the "independence of judiciary" rationale.',
                  misconception: 'Students often believe "Judicial Review = Judicial Activism = Judicial Overreach." They treat these as synonyms.' },
                { id: 'c', prompt: 'A constitutional amendment removes the power of High Courts to issue writs under Article 226 for "service matters" (e.g., government employee disputes).', answer: 'Invalid',
                  options: ['Invalid', 'valid because Parliament can amend any law', 'Judicial Review = Judicial Activism = Judicial Overreach', '"Judicial Review = Judicial Activism = Judicial Overreach'],
                  hint: 'If stuck on *why* collegium exists, revisit the "independence of judiciary" rationale.',
                  misconception: 'Students often believe "Judicial Review = Judicial Activism = Judicial Overreach." They treat these as synonyms.' }
          ],
            remediations: { 'judicial-review-judicial-activism-judicial': { steps: ['Revisit **c11_leg_cbse_03_006** (Separation of Powers — Critical Analysis) to relearn the *theoretical basis* of checks.', 'Re-read **c12_leg_cbse_01_002** (Judiciary — Constitutional Provisions) for the *exact Articles* (124, 217, 32, 226.', 'Create a **timeline flowchart** of Three Judges Cases (1981 → 1993 → 1998) + NJAC (2015) + Collegium Memorandum.', 'Re-diagnostic: Answer DIAGNOSTIC_QUESTION_2 and DIAGNOSTIC_QUESTION_3 *without notes*.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
