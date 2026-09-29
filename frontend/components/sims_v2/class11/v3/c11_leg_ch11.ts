import type { SimDef } from '../../engine/types';

/** v3 generated — c11_leg_ch11 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_leg_ch11: SimDef = {
    id: 'v3_c11_leg_ch11',
    title: 'Judiciary — Constitutional, Civil and Criminal Courts and Processes',
    subtitle: 'This node covers: the constitutional basis, structure, hierarchy, and jurisdiction of the.',
    classLevel: 11, subject: 'leg', topic: 'Judiciary — Constitutional, Civil and Criminal Courts and Processes',
    chapters: ['c11_leg_ch11'],
    nodeIds: ['c11_leg_cbse_11_001', 'c11_leg_cbse_11_002', 'c11_leg_cbse_11_003', 'c11_leg_cbse_11_004', 'c11_leg_cbse_11_005', 'c11_leg_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start with this real-world scenario: "Your neighbour builds a wall blocking your driveway.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'What are the three types of jurisdiction exercised by the Supreme Court of India under the Constitution, and which Article corresponds to each?',
        options: ['The three jurisdictions are: (1) **Original jurisdiction**', 'writ jurisdiction', 'writ jurisdiction" as a separate type'],
        answer: 'The three jurisdictions are: (1) **Original jurisdiction**',
        hook: '**Misconception**: "The Supreme Court and High Courts have the *same* writ jurisdiction because both issue habeas.',
    },
    teaching: [
        { title: 'Judiciary — Constitutional, Civil and Criminal Courts and Processes — Key Concepts and Institutions', text: 'The Indian judiciary is a single, integrated, hierarchical system of courts established under the Constitution, with the Supreme Court at the apex, High Courts at the state level, and subordinate.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_leg_cbse_11_001', title: 'Judiciary — Constitutional, Civil and Criminal Courts and Processes — Key Concepts and Institutions',
          caseStudy: { intro: 'Start with this real-world scenario: "Your neighbour builds a wall blocking your driveway. You file a civil suit in the local Munsiff court.',
            decisions: [{ prompt: 'What are the three types of jurisdiction exercised by the Supreme Court of India under the Constitution, and which Article corresponds.', options: [
                { text: 'The three jurisdictions are: (1) **Original jurisdiction**', outcome: 'The three jurisdictions are: (1) **Original jurisdiction** — Article 131 (disputes between Centre.' },
                { text: 'writ jurisdiction', outcome: 'Not quite — **Misconception**: "The Supreme Court and High Courts have the *same* writ jurisdiction because.', reveals: 'misconception-the-supreme-court-and' },
                { text: 'writ jurisdiction" as a separate type', outcome: 'Not quite — **Misconception**: "The Supreme Court and High Courts have the *same* writ jurisdiction because.', reveals: 'misconception-the-supreme-court-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_11_002', title: 'Judiciary — Constitutional, Civil and Criminal Courts and Processes — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Imagine you witness a chain-snatching in your neighborhood. The police register an FIR (Section 154 CrPC) — but is it a cognizable offence?',
            decisions: [{ prompt: 'What is the constitutional basis for the Supreme Court\'s power to issue writs for enforcement of fundamental rights, and how does it differ.', options: [
                { text: 'The Supreme Court\'s writ jurisdiction derives from **Article 32** (a fundamental right', outcome: 'The Supreme Court\'s writ jurisdiction derives from **Article 32** (a fundamental right itself.' },
                { text: 'both are identical', outcome: 'Not quite — **Misconception**: "The Supreme Court and High Courts have *identical* writ powers under Articles.', reveals: 'misconception-the-supreme-court-and' },
                { text: 'High Court has wider scope', outcome: 'Not quite — **Misconception**: "The Supreme Court and High Courts have *identical* writ powers under Articles.', reveals: 'misconception-the-supreme-court-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_11_003', title: 'Judiciary — Constitutional, Civil and Criminal Courts and Processes — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with a real question: "Your neighbour builds a wall blocking your driveway. You file a civil suit. Which court hears it first?',
            decisions: [{ prompt: 'What are the three types of jurisdiction exercised by the Supreme Court of India under the Constitution, and which Articles confer them?', options: [
                { text: 'The Supreme Court exercises: (1) Original jurisdiction under Article 131 (disputes', outcome: 'The Supreme Court exercises: (1) Original jurisdiction under Article 131 (disputes between Centre.' },
                { text: 'advisory jurisdiction', outcome: 'Not quite — Students believe "appeal" and "writ petition" are interchangeable remedies.', reveals: 'appeal-and-writ-petition-are' },
                { text: 'appeal', outcome: 'Not quite — Students believe "appeal" and "writ petition" are interchangeable remedies.', reveals: 'appeal-and-writ-petition-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_11_004', title: 'Judiciary — Constitutional, Civil and Criminal Courts and Processes — Processes and Procedures',
          caseStudy: { intro: 'Start with a real scenario: "Your neighbour builds a wall blocking your driveway. You want to sue. Which court? What document do you file?',
            decisions: [{ prompt: 'What is the difference between \'res sub judice\' under Section 10 CPC and \'res judicata\' under Section 11 CPC in terms of the stage.', options: [
                { text: 'Res sub judice applies when a suit is *pending* in a competent court', outcome: 'Res sub judice applies when a suit is *pending* in a competent court — it bars a *subsequent* suit.' },
                { text: '\'cognizable offence = non-bailable offence\' and \'non-cognizable = bailable\'', outcome: 'Not quite — Students believe \'cognizable offence = non-bailable offence\' and \'non-cognizable = bailable\'.', reveals: 'cognizable-offence-non-bailable-offence' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_11_005', title: 'Judiciary — Constitutional, Civil and Criminal Courts and Processes — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'Start with this scenario: "Your neighbour\'s construction blocks sunlight to your house. You want to sue. Which court do you go to first? What if you lose?',
            decisions: [{ prompt: 'What are the three constitutional jurisdictions of the Supreme Court of India, and under which Articles are they conferred?', options: [
                { text: 'The three jurisdictions are: (1) Original Jurisdiction (Article 131)', outcome: 'The three jurisdictions are: (1) Original Jurisdiction (Article 131) — disputes between Centre and.' },
                { text: 'writ jurisdiction', outcome: 'Not quite — Students believe that "the Supreme Court is bound by its own decisions" because of *stare decisis*.', reveals: 'the-supreme-court-is-bound' },
                { text: 'the Supreme Court is bound by its own decisions', outcome: 'Not quite — Students believe that "the Supreme Court is bound by its own decisions" because of *stare decisis*.', reveals: 'the-supreme-court-is-bound' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_11_006', title: 'Judiciary — Constitutional, Civil and Criminal Courts and Processes — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a real scenario: "Your neighbor builds a wall blocking your driveway — you want it removed.',
            decisions: [{ prompt: 'What is the distinction between \'Res sub judice\' (Section 10 CPC) and \'Res judicata\' (Section 11 CPC) in terms of the stage of litigation.', options: [
                { text: 'Res sub judice applies when a suit is *pending* in a competent court', outcome: 'Res sub judice applies when a suit is *pending* in a competent court — it bars a *parallel* suit.' },
                { text: 'FIR is only for serious crimes', outcome: 'Not quite — Students believe "FIR is only for serious crimes" and "police can refuse FIR if they think it\'s.', reveals: 'fir-is-only-for-serious' },
                { text: 'police can refuse FIR if they think it\'s false', outcome: 'Not quite — Students believe "FIR is only for serious crimes" and "police can refuse FIR if they think it\'s.', reveals: 'fir-is-only-for-serious' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_11_006', title: 'Judiciary — Constitutional, Civil and Criminal Courts and Processes — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a real scenario: "Your neighbor builds a wall blocking your driveway — you want it removed.',
            decisions: [{ prompt: 'What is the distinction between \'Res sub judice\' (Section 10 CPC) and \'Res judicata\' (Section 11 CPC) in terms of the stage of litigation.', options: [
                { text: 'Res sub judice applies when a suit is *pending* in a competent court', outcome: 'Res sub judice applies when a suit is *pending* in a competent court — it bars a *parallel* suit.' },
                { text: 'FIR is only for serious crimes', outcome: 'Not quite — Students believe "FIR is only for serious crimes" and "police can refuse FIR if they think it\'s.', reveals: 'fir-is-only-for-serious' },
                { text: 'police can refuse FIR if they think it\'s false', outcome: 'Not quite — Students believe "FIR is only for serious crimes" and "police can refuse FIR if they think it\'s.', reveals: 'fir-is-only-for-serious' }
            ] }] } },
        { type: 'build', nodeId: 'c11_leg_cbse_11_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Recall Article 131 — Supreme Court has *exclusive original.', 'Identify the parties — two States (Karnataka and Tamil.', 'Since the tribunal is *already constituted* but has *not.', 'Check if any constitutional provision *excludes* this.', 'Conclusion — Karnataka *cannot* directly approach the.'], answer: 'Identify the parties — two States (Karnataka and Tamil. Recall Article 131 — Supreme Court has *exclusive original. Check if any constitutional provision *excludes* this. Since the tribunal is *already constituted* but has *not. Conclusion — Karnataka *cannot* directly approach the.' } },
        { type: 'case', nodeId: 'c11_leg_cbse_11_006', title: 'You made it',
          caseStudy: { intro: 'You finished Judiciary — Constitutional, Civil and Criminal Courts and Processes — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_leg_cbse_11_001', difficulty: 'standard',
          question: 'The Indian judiciary is a single, integrated, hierarchical system of courts.',
          hint: 'If stuck, review the "Concept of State and Article 12" section in Unit 2, Chapter 1.',
          misconception: '**Misconception**: "The Supreme Court and High Courts have the *same* writ jurisdiction because both issue habeas.',
          parts: [
                { id: 'a', prompt: 'What are the three types of jurisdiction exercised by the Supreme Court of India under the Constitution, and which Article corresponds to each?', answer: 'The three jurisdictions are: (1) **Original jurisdiction**',
                  options: ['The three jurisdictions are: (1) **Original jurisdiction**', 'writ jurisdiction', 'writ jurisdiction" as a separate type'],
                  hint: 'If stuck, review the "Concept of State and Article 12" section in Unit 2, Chapter 1 (Salient.',
                  misconception: '**Misconception**: "The Supreme Court and High Courts have the *same* writ jurisdiction because both issue habeas corpus, mandamus, etc.".' },
                { id: 'b', prompt: 'Explain why the Supreme Court\'s power under Article 141 ("law declared by Supreme Court binding on all courts") does not make it bound by its own previous.', answer: 'Article 141 binds *all courts* in India',
                  options: ['Article 141 binds *all courts* in India', 'Supreme Court is bound by its own decisions'],
                  hint: 'If stuck, review the "Concept of State and Article 12" section in Unit 2, Chapter 1 (Salient.',
                  misconception: '**Misconception**: "The Supreme Court and High Courts have the *same* writ jurisdiction because both issue habeas corpus, mandamus, etc.".' },
                { id: 'c', prompt: 'A civil suit for recovery of ₹15 lakh is filed in a Munsiff court. The defendant argues the court lacks pecuniary jurisdiction.', answer: 'No, the *res sub judice* application will **fail**',
                  options: ['No, the *res sub judice* application will **fail**', 'pending', 'pending in a court of competent jurisdiction'],
                  hint: 'If stuck, review the "Concept of State and Article 12" section in Unit 2, Chapter 1 (Salient.',
                  misconception: '**Misconception**: "The Supreme Court and High Courts have the *same* writ jurisdiction because both issue habeas corpus, mandamus, etc.".' },
                { id: 'd', prompt: 'Compare the writ jurisdiction of the Supreme Court (Article 32) and High Courts (Article 226) on three grounds: (a) purpose, (b) territorial reach, (c).', answer: 'purpose, (',
                  options: ['purpose, (', 'both have same purpose'],
                  hint: 'If stuck, review the "Concept of State and Article 12" section in Unit 2, Chapter 1 (Salient.',
                  misconception: '**Misconception**: "The Supreme Court and High Courts have the *same* writ jurisdiction because both issue habeas corpus, mandamus, etc.".' }
          ],
            remediations: { 'misconception-the-supreme-court-and': { steps: ['If the student holds this misconception: (1) **Make a two-column table** — left: "Article 32", right: "Article 226".', 'power)*, *Discretion*, *Scope of rights*, *Territorial reach*, *Appeal from dismissal*.', '(2) **Give three mini-scenarios** — one where *only* Art.', '32 works (e.g., direct FR violation by Centre), one where *only* Art.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception**: "The Supreme Court and High Courts have the *same* writ jurisdiction because both issue habeas.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "The doctrine of *autrefois acquit* and *autrefois convict* (Article 20(2), Section 300 CrPC) provides absolute protection against double jeopardy.', answer: '**No, the statement is inaccurate**',
                  options: ['**No, the statement is inaccurate**', 'same offence'],
                  hint: 'If stuck, review the "Concept of State and Article 12" section in Unit 2, Chapter 1 (Salient.',
                  misconception: '**Misconception**: "The Supreme Court and High Courts have the *same* writ jurisdiction because both issue habeas corpus, mandamus, etc.".' }
          ],
            remediations: { 'misconception-the-supreme-court-and': { steps: ['If the student holds this misconception: (1) **Make a two-column table** — left: "Article 32", right: "Article 226".', 'power)*, *Discretion*, *Scope of rights*, *Territorial reach*, *Appeal from dismissal*.', '(2) **Give three mini-scenarios** — one where *only* Art.', '32 works (e.g., direct FR violation by Centre), one where *only* Art.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_11_002', difficulty: 'standard',
          question: 'The Indian judiciary is a single, integrated, hierarchical system of courts.',
          hint: 'If confused about *why* the Supreme Court has both original and appellate jurisdiction.',
          misconception: '**Misconception**: "The Supreme Court and High Courts have *identical* writ powers under Articles 32 and 226." **Why.',
          parts: [
                { id: 'a', prompt: 'A person is arrested for an offence punishable with 5 years imprisonment. The police file a chargesheet after 60 days.', answer: 'Yes, bail **must** be granted',
                  options: ['Yes, bail **must** be granted', 'bail is discretionary', '90 days applies'],
                  hint: 'If confused about *why* the Supreme Court has both original and appellate jurisdiction, revisit.',
                  misconception: '**Misconception**: "The Supreme Court and High Courts have *identical* writ powers under Articles 32 and 226." **Why it\'s wrong**: Students.' },
                { id: 'b', prompt: 'In a civil suit, the plaintiff files a case in Court A for breach of contract.', answer: '**Section 10 CPC (Res sub judice)** applies',
                  options: ['**Section 10 CPC (Res sub judice)** applies', 'finally decided', 'second suit is dismissed immediately', 'Res judicata applies from the start'],
                  hint: 'If confused about *why* the Supreme Court has both original and appellate jurisdiction, revisit.',
                  misconception: '**Misconception**: "The Supreme Court and High Courts have *identical* writ powers under Articles 32 and 226." **Why it\'s wrong**: Students.' },
                { id: 'c', prompt: 'Compare the constitutional safeguards for judicial independence of Supreme Court judges vs. subordinate court judges.', answer: 'Supreme Court judges enjoy: (1) **Security of tenure**',
                  options: ['Supreme Court judges enjoy: (1) **Security of tenure**', 'same safeguards apply', 'subordinate judges have more protection'],
                  hint: 'If confused about *why* the Supreme Court has both original and appellate jurisdiction, revisit.',
                  misconception: '**Misconception**: "The Supreme Court and High Courts have *identical* writ powers under Articles 32 and 226." **Why it\'s wrong**: Students.' }
          ],
            remediations: { 'misconception-the-supreme-court-and': { steps: ['**Re-read Articles 32 and 226 side-by-side** in the Constitution bare text — highlight "shall have the power" (Art.', '**Create a comparison table**: | Feature | Art.', '226 (HC) | — include: Nature of remedy, Discretion, Scope, Territorial reach, Appeal route.', '**Solve 3 past board questions** on writ jurisdiction (e.g., 2020: "Distinguish between Art.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_11_003', difficulty: 'standard',
          question: 'The Indian judiciary is an integrated, hierarchical system of courts.',
          hint: 'Review "Independence of Judiciary" in c11_leg_cbse_11_002 — focus on Article 50.',
          misconception: 'Students believe "appeal" and "writ petition" are interchangeable remedies.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Indian judiciary is an integrated, hierarchical system of courts established under',
                  options: ['The Indian judiciary is an integrated, hierarchical system of courts established under', 'The Indian judiciary is a single, integrated, hierarchical system of courts established', 'The Indian judiciary is a single, integrated, hierarchical system of courts established', 'Processes and Procedures refers to the structured legal mechanisms governing how civil'],
                  hint: 'Review "Independence of Judiciary" in c11_leg_cbse_11_002 — focus on Article 50 (separation.',
                  misconception: 'Students believe "appeal" and "writ petition" are interchangeable remedies.' }
          ],
            remediations: { 'appeal-and-writ-petition-are': { steps: ['Draw a two-column table: "Appeal" vs.', '"Writ Petition" — list: Source (statute vs.', 'Constitution), Scope (merits vs.', 'jurisdiction/rights), Right vs.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_11_004', difficulty: 'standard',
          question: 'Processes and Procedures refers to the structured legal mechanisms governing.',
          hint: 'If stuck, review: (a) Chapter 3 (Separation of Powers) for why police investigate but.',
          misconception: 'Students believe \'cognizable offence = non-bailable offence\' and \'non-cognizable = bailable\'. This is false.',
          parts: [
                { id: 'a', prompt: 'What is the difference between \'res sub judice\' under Section 10 CPC and \'res judicata\' under Section 11 CPC in terms of the stage of litigation they apply to?', answer: 'Res sub judice applies when a suit is *pending* in a competent court',
                  options: ['Res sub judice applies when a suit is *pending* in a competent court', '\'cognizable offence = non-bailable offence\' and \'non-cognizable = bailable\''],
                  hint: 'If stuck, review: (a) Chapter 3 (Separation of Powers) for why police investigate but magistrate.',
                  misconception: 'Students believe \'cognizable offence = non-bailable offence\' and \'non-cognizable = bailable\'. This is false.' },
                { id: 'b', prompt: 'A person is arrested for an offence punishable with 3 years imprisonment and fine. The offence is listed as bailable in the First Schedule of CrPC.', answer: 'No, the police action is illegal',
                  options: ['No, the police action is illegal', '\'cognizable offence = non-bailable offence\' and \'non-cognizable = bailable\''],
                  hint: 'If stuck, review: (a) Chapter 3 (Separation of Powers) for why police investigate but magistrate.',
                  misconception: 'Students believe \'cognizable offence = non-bailable offence\' and \'non-cognizable = bailable\'. This is false.' }
          ],
            remediations: { 'cognizable-offence-non-bailable-offence': { steps: ['Draw a 2x2 matrix: Rows = Cognizable / Non-cognizable; Columns = Bailable / Non-bailable.', 'Fill with 2 real offences per cell (e.g., Cognizable+Bailable: Simple hurt; Cognizable+Non-bailable: Theft.', 'For each cell, state: \'Police can arrest without warrant?', 'Yes/No\' and \'Bail is a right?'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_11_005', difficulty: 'standard',
          question: 'The Indian judiciary is an integrated, hierarchical system of courts.',
          hint: 'If stuck, review c11_leg_cbse_11_004 (Salient Features of Constitution) — focus on Part.',
          misconception: 'Students believe that "the Supreme Court is bound by its own decisions" because of *stare decisis*.',
          parts: [
                { id: 'a', prompt: 'What are the three constitutional jurisdictions of the Supreme Court of India, and under which Articles are they conferred?', answer: 'The three jurisdictions are: (1) Original Jurisdiction (Article 131)',
                  options: ['The three jurisdictions are: (1) Original Jurisdiction (Article 131)', 'writ jurisdiction', 'the Supreme Court is bound by its own decisions', 'writ jurisdiction" as a separate head'],
                  hint: 'If stuck, review c11_leg_cbse_11_004 (Salient Features of Constitution) — focus on Part III.',
                  misconception: 'Students believe that "the Supreme Court is bound by its own decisions" because of *stare decisis*.' },
                { id: 'b', prompt: 'Explain why a High Court can refuse to issue a writ under Article 226, but the Supreme Court *cannot* refuse under Article 32.', answer: 'Article 32 is itself a Fundamental Right ("right to constitutional remedies")',
                  options: ['Article 32 is itself a Fundamental Right ("right to constitutional remedies")', 'both are discretionary', 'The Supreme Court *shall* have power', 'High Courts *may* issue writs'],
                  hint: 'If stuck, review c11_leg_cbse_11_004 (Salient Features of Constitution) — focus on Part III.',
                  misconception: 'Students believe that "the Supreme Court is bound by its own decisions" because of *stare decisis*.' },
                { id: 'c', prompt: 'A Sessions Judge convicts an accused of murder and sentences him to life imprisonment. The accused appeals to the High Court, which affirms.', answer: 'No, there is no appeal *as of right* in criminal cases after High Court affirms',
                  options: ['No, there is no appeal *as of right* in criminal cases after High Court affirms', 'yes, under Article 134', 'the Supreme Court is bound by its own decisions', '"the Supreme Court is bound by its own decisions"'],
                  hint: 'If stuck, review c11_leg_cbse_11_004 (Salient Features of Constitution) — focus on Part III.',
                  misconception: 'Students believe that "the Supreme Court is bound by its own decisions" because of *stare decisis*.' }
          ],
            remediations: { 'the-supreme-court-is-bound': { steps: ['If the student holds this misconception: (1) Show them Article 141 text: "The law declared by the Supreme Court shall.', '(2) Cite *Bengal Immunity Co.', 'State of Bihar* (1955): Supreme Court held it is not bound by its own decisions.', '(3) Explain the *bench strength* rule: only a bench of *equal or larger strength* can reconsider a precedent; a smaller.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_11_006', difficulty: 'standard',
          question: 'The Indian judiciary is a unified, hierarchical system of courts established.',
          hint: 'If stuck, review the \'Hierarchy of Courts\' diagram in the NCERT textbook (Unit 4, Chapter.',
          misconception: 'Students believe "FIR is only for serious crimes" and "police can refuse FIR if they think it\'s false." In reality.',
          parts: [
                { id: 'a', prompt: 'What is the distinction between \'Res sub judice\' (Section 10 CPC) and \'Res judicata\' (Section 11 CPC) in terms of the stage of litigation and the bar they.', answer: 'Res sub judice applies when a suit is *pending* in a competent court',
                  options: ['Res sub judice applies when a suit is *pending* in a competent court', 'FIR is only for serious crimes', 'police can refuse FIR if they think it\'s false'],
                  hint: 'If stuck, review the \'Hierarchy of Courts\' diagram in the NCERT textbook (Unit 4, Chapter 1) and.',
                  misconception: 'Students believe "FIR is only for serious crimes" and "police can refuse FIR if they think it\'s false." In reality, Section 154 CrPC.' },
                { id: 'b', prompt: 'A person is arrested for an offence punishable with 3 years imprisonment.', answer: 'The officer is *incorrect*',
                  options: ['The officer is *incorrect*', 'non-bailable means no bail ever', 'FIR is only for serious crimes', 'police can refuse FIR if they think it\'s false'],
                  hint: 'If stuck, review the \'Hierarchy of Courts\' diagram in the NCERT textbook (Unit 4, Chapter 1) and.',
                  misconception: 'Students believe "FIR is only for serious crimes" and "police can refuse FIR if they think it\'s false." In reality, Section 154 CrPC.' },
                { id: 'c', prompt: 'Compare the writ jurisdiction of the Supreme Court (Article 32) and High Courts (Article 226) on three grounds: (a) purpose, (b) territorial reach, (c).', answer: 'purpose, (',
                  options: ['purpose, (', 'FIR is only for serious crimes', 'police can refuse FIR if they think it\'s false'],
                  hint: 'If stuck, review the \'Hierarchy of Courts\' diagram in the NCERT textbook (Unit 4, Chapter 1) and.',
                  misconception: 'Students believe "FIR is only for serious crimes" and "police can refuse FIR if they think it\'s false." In reality, Section 154 CrPC.' }
          ],
            remediations: { 'fir-is-only-for-serious': { steps: ['If a student confuses FIR rules: (1) Have them read Section 154(1)-(3) CrPC verbatim — highlight "shall record".', '(2) Role-play: "You\'re at a police station reporting phone theft (cognizable).', 'The SHO says \'write an application first, we\'ll check.\' What do you do?" Guide them to: "Insist on FIR registration.', 'This contrast cures the "all crimes need FIR" overcorrection.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
