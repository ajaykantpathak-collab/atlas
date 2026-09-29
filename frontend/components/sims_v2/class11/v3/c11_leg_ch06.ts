import type { SimDef } from '../../engine/types';

/** v3 generated — c11_leg_ch06 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_leg_ch06: SimDef = {
    id: 'v3_c11_leg_ch06',
    title: 'Jurisprudence, Nature and Meaning of Law',
    subtitle: 'This node covers the meaning of jurisprudence, the five schools of law (Natural.',
    classLevel: 11, subject: 'leg', topic: 'Jurisprudence, Nature and Meaning of Law',
    chapters: ['c11_leg_ch06'],
    nodeIds: ['c11_leg_cbse_06_001', 'c11_leg_cbse_06_002', 'c11_leg_cbse_06_003', 'c11_leg_cbse_06_004', 'c11_leg_cbse_06_005', 'c11_leg_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start by asking: "If Parliament passes a law saying \'All red-haired people must pay double tax,\' is it.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Define \'Jurisprudence\' and explain how it differs from \'Law\' in terms of scope and inquiry.',
        options: ['Jurisprudence is the philosophical study of law', 'Jurisprudence is just another word for law', 'biology'],
        answer: 'Jurisprudence is the philosophical study of law',
        hook: 'Students treat "Natural Law" and "Natural Justice" as synonyms. They are not.',
    },
    teaching: [
        { title: 'Jurisprudence, Nature and Meaning of Law — Key Concepts and Institutions', text: 'Jurisprudence is the theoretical and philosophical study of law that examines the nature, origin, purpose, and validity of legal rules, while the "Nature and Meaning of Law" refers to the inquiry.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_leg_cbse_06_001', title: 'Jurisprudence, Nature and Meaning of Law — Key Concepts and Institutions',
          caseStudy: { intro: 'Start by asking: "If Parliament passes a law saying \'All red-haired people must pay double tax,\' is it a valid law?',
            decisions: [{ prompt: 'Define \'Jurisprudence\' and explain how it differs from \'Law\' in terms of scope and inquiry.', options: [
                { text: 'Jurisprudence is the philosophical study of law', outcome: 'Jurisprudence is the philosophical study of law — it asks *what law is*, *where it comes from*, and.' },
                { text: 'Jurisprudence is just another word for law', outcome: 'Not quite — Students treat "Natural Law" and "Natural Justice" as synonyms. They are not.', reveals: 'students-treat-natural-law-and' },
                { text: 'biology', outcome: 'Not quite — Students treat "Natural Law" and "Natural Justice" as synonyms. They are not.', reveals: 'students-treat-natural-law-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_06_002', title: 'Jurisprudence, Nature and Meaning of Law — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with a real-world scenario: "A student is denied admission to a government-funded university without a hearing.',
            decisions: [{ prompt: 'What are the four categories of authorities included in the definition of "State" under Article 12 of the Constitution of India?', options: [
                { text: 'The four categories are: (1) Government and Parliament of India (Union Executive and', outcome: 'The four categories are: (1) Government and Parliament of India (Union Executive and Legislature).' },
                { text: 'local authorities', outcome: 'Not quite — Students often believe "State under Article 12 = Government only" and therefore assume private.', reveals: 'state-under-article-12-government' },
                { text: 'other authorities', outcome: 'Not quite — Students often believe "State under Article 12 = Government only" and therefore assume private.', reveals: 'state-under-article-12-government' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_06_003', title: 'Jurisprudence, Nature and Meaning of Law — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with this scenario: "You\'re a judge in 4300 AD. Five explorers trapped in a cave eat one of their own to survive.',
            decisions: [{ prompt: 'Which school of jurisprudence asserts that "an unjust law is not a true law" (lex iniusta non est lex) and considers morality as.', options: [
                { text: 'Natural Law School', outcome: 'Natural Law School. A wrong answer (e.g., Analytical School) reveals the student confuses "law.' },
                { text: 'law as command', outcome: 'Not quite — Students think "schools of jurisprudence" are just historical trivia — "Natural Law = old.', reveals: 'schools-of-jurisprudence-are-just' },
                { text: 'law as morality', outcome: 'Not quite — Students think "schools of jurisprudence" are just historical trivia — "Natural Law = old.', reveals: 'schools-of-jurisprudence-are-just' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_06_004', title: 'Jurisprudence, Nature and Meaning of Law — Processes and Procedures',
          caseStudy: { intro: 'Start with a real scenario: "A student\'s Instagram account is hacked and morphed photos are posted. She wants legal action.',
            decisions: [{ prompt: 'What is the constitutional distinction between a \'Bill\' and an \'Act\' in the Indian legislative process, and at which specific stage does.', options: [
                { text: 'A Bill is a draft statute', outcome: 'A Bill is a draft statute; it becomes an Act only after passage by both Houses of Parliament (or.' },
                { text: 'Procedure is just technical rules', outcome: 'Not quite — Students believe **"Procedure is just technical rules — substance (the real law) matters more."**.', reveals: 'procedure-is-just-technical-rules' },
                { text: 'procedure established by law', outcome: 'Not quite — Students believe **"Procedure is just technical rules — substance (the real law) matters more."**.', reveals: 'procedure-is-just-technical-rules' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_06_006', title: 'Jurisprudence, Nature and Meaning of Law — Critical Analysis and Application',
          caseStudy: { intro: 'Start with this scenario: "A 17-year-old climate activist is arrested for blocking a highway during a protest.',
            decisions: [{ prompt: 'In the Speluncean Explorers case, Chief Justice Truepenny upholds the conviction but recommends executive clemency.', options: [
                { text: 'Analytical School (Positivism)', outcome: 'Analytical School (Positivism). Defining feature: Strict separation of law and morality — law.' },
                { text: 'recommending mercy', outcome: 'Not quite — Students memorize school definitions as static "beliefs" (e.g., "Natural Law = morality, Analytical.', reveals: 'students-memorize-school-definitions-as' },
                { text: 'basing legal validity on morality', outcome: 'Not quite — Students memorize school definitions as static "beliefs" (e.g., "Natural Law = morality, Analytical.', reveals: 'students-memorize-school-definitions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_06_006', title: 'Jurisprudence, Nature and Meaning of Law — Critical Analysis and Application',
          caseStudy: { intro: 'Start with this scenario: "A 17-year-old climate activist is arrested for blocking a highway during a protest.',
            decisions: [{ prompt: 'In the Speluncean Explorers case, Chief Justice Truepenny upholds the conviction but recommends executive clemency.', options: [
                { text: 'Analytical School (Positivism)', outcome: 'Analytical School (Positivism). Defining feature: Strict separation of law and morality — law.' },
                { text: 'recommending mercy', outcome: 'Not quite — Students memorize school definitions as static "beliefs" (e.g., "Natural Law = morality, Analytical.', reveals: 'students-memorize-school-definitions-as' },
                { text: 'basing legal validity on morality', outcome: 'Not quite — Students memorize school definitions as static "beliefs" (e.g., "Natural Law = morality, Analytical.', reveals: 'students-memorize-school-definitions-as' }
            ] }] } },
        { type: 'build', nodeId: 'c11_leg_cbse_06_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Identify the core conflict — a procedurally valid statute.', 'Apply Sociological School (Pound): Law must balance social.', 'Apply Analytical School (Austin/Hart): Law = Command.', 'Synthesize — The Indian Supreme Court would likely strike.', 'Apply Natural Law School (Aquinas/Finnis): Lex injusta non.'], answer: 'Identify the core conflict — a procedurally valid statute. Apply Analytical School (Austin/Hart): Law = Command. Apply Natural Law School (Aquinas/Finnis): Lex injusta non. Apply Sociological School (Pound): Law must balance social. Synthesize — The Indian Supreme Court would likely strike.' } },
        { type: 'case', nodeId: 'c11_leg_cbse_06_006', title: 'You made it',
          caseStudy: { intro: 'You finished Jurisprudence, Nature and Meaning of Law — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_leg_cbse_06_001', difficulty: 'standard',
          question: 'Jurisprudence is the theoretical and philosophical study of law that examines.',
          hint: 'Review Chapter 1 (Concept of State) for \'Sovereignty\' definition and Chapter 3.',
          misconception: 'Students treat "Natural Law" and "Natural Justice" as synonyms. They are not.',
          parts: [
                { id: 'a', prompt: 'Define \'Jurisprudence\' and explain how it differs from \'Law\' in terms of scope and inquiry.', answer: 'Jurisprudence is the philosophical study of law',
                  options: ['Jurisprudence is the philosophical study of law', 'Jurisprudence is just another word for law', 'biology'],
                  hint: 'Review Chapter 1 (Concept of State) for \'Sovereignty\' definition and Chapter 3 (Separation.',
                  misconception: 'Students treat "Natural Law" and "Natural Justice" as synonyms. They are not.' },
                { id: 'b', prompt: 'A student argues: "The Analytical School and Natural School both agree that an unjust law is still a law that must be obeyed." Is this correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'natural'],
                  hint: 'Review Chapter 1 (Concept of State) for \'Sovereignty\' definition and Chapter 3 (Separation.',
                  misconception: 'Students treat "Natural Law" and "Natural Justice" as synonyms. They are not.' },
                { id: 'c', prompt: 'In the *Speluncean Explorers* case, Justice Foster acquits the survivors using Natural Law reasoning.', answer: 'Step 1: Identify the "Volksgeist" of Newgarth',
                  options: ['Step 1: Identify the "Volksgeist" of Newgarth', 'natural'],
                  hint: 'Review Chapter 1 (Concept of State) for \'Sovereignty\' definition and Chapter 3 (Separation.',
                  misconception: 'Students treat "Natural Law" and "Natural Justice" as synonyms. They are not.' },
                { id: 'd', prompt: 'Compare the Sociological School (Pound) and Realist School (Llewellyn) on: (a) What is the *primary source* of law? (b) What is the *role of the judge*?', answer: 'What is the *primary source* of law?',
                  options: ['What is the *primary source* of law?', 'both care about society', 'natural'],
                  hint: 'Review Chapter 1 (Concept of State) for \'Sovereignty\' definition and Chapter 3 (Separation.',
                  misconception: 'Students treat "Natural Law" and "Natural Justice" as synonyms. They are not.' }
          ],
            remediations: { 'students-treat-natural-law-and': { steps: ['Make a two-column table: Left = "Natural Law (School)", Right = "Natural Justice (Doctrine)".', 'Fill rows: Origin (Morality/Divine Reason vs.', 'Common Law/Constitution), Focus (Substantive validity vs.', 'Procedural fairness), Key Maxim (Lex injusta non est lex vs.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "Natural Law" and "Natural Justice" as synonyms. They are not.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "The Indian Constitution\'s Article 21 (\'procedure established by law\') originally followed the Analytical School (positivism), but *Maneka Gandhi v.', answer: 'Critique: The shift is real but nuanced',
                  options: ['Critique: The shift is real but nuanced', 'India adopted US due process', 'natural'],
                  hint: 'Review Chapter 1 (Concept of State) for \'Sovereignty\' definition and Chapter 3 (Separation.',
                  misconception: 'Students treat "Natural Law" and "Natural Justice" as synonyms. They are not.' }
          ],
            remediations: { 'students-treat-natural-law-and': { steps: ['Make a two-column table: Left = "Natural Law (School)", Right = "Natural Justice (Doctrine)".', 'Fill rows: Origin (Morality/Divine Reason vs.', 'Common Law/Constitution), Focus (Substantive validity vs.', 'Procedural fairness), Key Maxim (Lex injusta non est lex vs.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_06_002', difficulty: 'standard',
          question: '"State" under Article 12 of the Constitution of India includes the Government.',
          hint: 'If stuck, review: "Vertical vs. horizontal application of fundamental rights" and "Why.',
          misconception: 'Students often believe "State under Article 12 = Government only" and therefore assume private bodies (even.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the judiciary (Supreme Court, High Courts, lower courts) is not explicitly included in the definition of "State" under Article.', answer: 'The judiciary is excluded',
                  options: ['The judiciary is excluded', 'judiciary is part of State', 'judiciary can violate fundamental rights', 'State under Article 12 = Government only'],
                  hint: 'If stuck, review: "Vertical vs. horizontal application of fundamental rights" and "Why do we need.',
                  misconception: 'Students often believe "State under Article 12 = Government only" and therefore assume private bodies (even government-controlled ones).' },
                { id: 'b', prompt: 'A private engineering college receives 90% of its funding from the State Government, its governing body is appointed by the government, and it performs.', answer: 'Step 1: Identify the test',
                  options: ['Step 1: Identify the test', 'private status', 'no statute', 'State under Article 12 = Government only'],
                  hint: 'If stuck, review: "Vertical vs. horizontal application of fundamental rights" and "Why do we need.',
                  misconception: 'Students often believe "State under Article 12 = Government only" and therefore assume private bodies (even government-controlled ones).' },
                { id: 'c', prompt: 'Compare and contrast the scope of "State" under Article 12 with the scope of "State" under Article 36 (Directive Principles).', answer: 'Article 12 defines "State" broadly for enforceable fundamental rights (Part III)',
                  options: ['Article 12 defines "State" broadly for enforceable fundamental rights (Part III)', 'identical scope', 'no relation', 'State under Article 12 = Government only'],
                  hint: 'If stuck, review: "Vertical vs. horizontal application of fundamental rights" and "Why do we need.',
                  misconception: 'Students often believe "State under Article 12 = Government only" and therefore assume private bodies (even government-controlled ones).' }
          ],
            remediations: { 'state-under-article-12-government': { steps: ['If the student holds this misconception: (1) Give them the *Ajay Hasia* six-factor test as a checklist; (2) Ask them.', 'Why/why not?" (4) Debrief: highlight that (a) and (c) were held "State" (*DMRC v.', 'Union of India* — though BCCI later reformed), while (b) is not — because *degree of control* matters, not mere.', 'This concrete comparison fixes the "government vs.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_06_003', difficulty: 'standard',
          question: 'Jurisprudence is the theoretical study of law that examines the nature.',
          hint: 'If stuck, re-read c11_leg_cbse_06_001 (Key Concepts) for definitions of law, justice.',
          misconception: 'Students think "schools of jurisprudence" are just historical trivia — "Natural Law = old, Positivism = modern." They.',
          parts: [
                { id: 'a', prompt: 'Which school of jurisprudence asserts that "an unjust law is not a true law" (lex iniusta non est lex) and considers morality as a necessary condition for.', answer: 'Natural Law School',
                  options: ['Natural Law School', 'law as command', 'law as morality', 'schools of jurisprudence'],
                  hint: 'If stuck, re-read c11_leg_cbse_06_001 (Key Concepts) for definitions of law, justice, sovereignty.',
                  misconception: 'Students think "schools of jurisprudence" are just historical trivia — "Natural Law = old, Positivism = modern." They miss that *every.' },
                { id: 'b', prompt: 'A judge says: "The statute says \'no vehicles in the park.\' An ambulance enters to save a child.', answer: 'Sociological School (Roscoe Pound\'s "social engineering"',
                  options: ['Sociological School (Roscoe Pound\'s "social engineering"', 'Natural Law', 'schools of jurisprudence', 'Natural Law = old, Positivism = modern'],
                  hint: 'If stuck, re-read c11_leg_cbse_06_001 (Key Concepts) for definitions of law, justice, sovereignty.',
                  misconception: 'Students think "schools of jurisprudence" are just historical trivia — "Natural Law = old, Positivism = modern." They miss that *every.' }
          ],
            remediations: { 'schools-of-jurisprudence-are-just': { steps: ['Give the student a 2x2 matrix: Rows = Schools (Natural, Analytical, Historical, Sociological, Realist); Columns = Core.', 'Have them fill it using the textbook diagram (p.76-77).', 'Then re-read the five Speluncean opinions and match each to a row.', 'Finally, ask: "If you were Justice Tatting, which column would you struggle with most?" — this forces them to see the.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_06_004', difficulty: 'standard',
          question: 'Processes and Procedures in Jurisprudence refer to the formal.',
          hint: 'If stuck, review **c11_leg_cbse_06_002 (Constitutional Framework)** — specifically.',
          misconception: 'Students believe **"Procedure is just technical rules — substance (the real law) matters more."** This is wrong because.',
          parts: [
                { id: 'a', prompt: 'What is the constitutional distinction between a \'Bill\' and an \'Act\' in the Indian legislative process, and at which specific stage does the President\'s assent.', answer: 'A Bill is a draft statute',
                  options: ['A Bill is a draft statute', 'Procedure is just technical rules', 'procedure established by law', '**"Procedure is just technical rules'],
                  hint: 'If stuck, review **c11_leg_cbse_06_002 (Constitutional Framework)** — specifically Articles 79-111.',
                  misconception: 'Students believe **"Procedure is just technical rules — substance (the real law) matters more."** This is wrong because in jurisprudence.' },
                { id: 'b', prompt: 'Explain why the Supreme Court struck down Section 66A of the IT Act, 2000 in *Shreya Singhal v.', answer: 'The Court struck it down',
                  options: ['The Court struck it down', 'free speech', 'Procedure is just technical rules', 'procedure established by law'],
                  hint: 'If stuck, review **c11_leg_cbse_06_002 (Constitutional Framework)** — specifically Articles 79-111.',
                  misconception: 'Students believe **"Procedure is just technical rules — substance (the real law) matters more."** This is wrong because in jurisprudence.' },
                { id: 'c', prompt: 'Compare the legislative process for an **Ordinary Bill** vs a **Money Bill** in India.', answer: '**Ordinary Bill**: Can originate in either House',
                  options: ['**Ordinary Bill**: Can originate in either House', 'Procedure is just technical rules', 'procedure established by law', '**"Procedure is just technical rules'],
                  hint: 'If stuck, review **c11_leg_cbse_06_002 (Constitutional Framework)** — specifically Articles 79-111.',
                  misconception: 'Students believe **"Procedure is just technical rules — substance (the real law) matters more."** This is wrong because in jurisprudence.' }
          ],
            remediations: { 'procedure-is-just-technical-rules': { steps: ['**Re-read the *Maneka Gandhi* principle**: "Procedure must be fair, just, reasonable" — not just exist.', '**Map Art 21 → Natural Justice (Audi Alteram Partem) → Delegated Legislation safeguards (laying before Parliament) →.', '**Practice**: Take any recent law (e.g., Digital Personal Data Protection Act, 2023) and trace: Bill type →.', '**Memorize the *three procedural checkpoints* for any law**: (a) Legislative competence (Schedule VII), (b) Procedural.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_06_005', difficulty: 'standard',
          question: 'This node provides a structured framework for answering CBSE Class 11 Legal.',
          hint: 'If stuck, immediately review the **"Schools of Law" Diagram (Page 77 of NCERT)** and the.',
          misconception: '**The "Opinion = School" Fallacy:** Students memorize the *verdicts* (Guilty/Innocent) of the 5 Speluncean Judges but.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This node provides a structured framework for answering CBSE Class 11 Legal Studies board',
                  options: ['This node provides a structured framework for answering CBSE Class 11 Legal Studies board', 'Jurisprudence is the theoretical and philosophical study of law that examines the nature,', '"State" under Article 12 of the Constitution of India includes the Government and', 'Jurisprudence is the theoretical study of law that examines the nature, purpose, and'],
                  hint: 'If stuck, immediately review the **"Schools of Law" Diagram (Page 77 of NCERT)** and the **"Verdict.',
                  misconception: '**The "Opinion = School" Fallacy:** Students memorize the *verdicts* (Guilty/Innocent) of the 5 Speluncean Judges but fail to rigorously.' }
          ],
            remediations: { 'the-opinion-school-fallacy-students': { steps: ['**Create a "Judge-to-School" Mapping Table** (Mental or Paper): List Truepenny, Foster, Tatting, Keen, Handy in Column.', 'Column C: *One Key Quote* per judge (e.g., Keen: "Judges are not to apply their conceptions of morality").', '**Drill the "Separation Thesis"**: Practice distinguishing *Legal Validity* (Positivism: Source-based) vs.', '*Moral Validity* (Natural Law: Content-based) using 3 hypothetical wicked statutes (e.g., "Law requiring reporting.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_06_006', difficulty: 'standard',
          question: 'Jurisprudence is the philosophical and theoretical study of law that examines.',
          hint: 'Review the "Analytical School" section in c11_leg_cbse_06_001 — specifically Austin\'s.',
          misconception: 'Students memorize school definitions as static "beliefs" (e.g., "Natural Law = morality, Analytical = commands") but.',
          parts: [
                { id: 'a', prompt: 'In the Speluncean Explorers case, Chief Justice Truepenny upholds the conviction but recommends executive clemency.', answer: 'Analytical School (Positivism)',
                  options: ['Analytical School (Positivism)', 'recommending mercy', 'basing legal validity on morality', 'Natural Justice'],
                  hint: 'Review the "Analytical School" section in c11_leg_cbse_06_001 — specifically Austin\'s "command.',
                  misconception: 'Students memorize school definitions as static "beliefs" (e.g., "Natural Law = morality, Analytical = commands") but fail to see that each.' },
                { id: 'b', prompt: 'Apply Justice Keen\'s positivist reasoning to a NEW fact pattern: Parliament passes a law requiring all citizens to report neighbors\' "anti-national speech".', answer: 'Keen would convict',
                  options: ['Keen would convict', 'Keen would acquit', 'Natural Justice', 'Natural Law School'],
                  hint: 'Review the "Analytical School" section in c11_leg_cbse_06_001 — specifically Austin\'s "command.',
                  misconception: 'Students memorize school definitions as static "beliefs" (e.g., "Natural Law = morality, Analytical = commands") but fail to see that each.' }
          ],
            remediations: { 'students-memorize-school-definitions-as': { steps: ['Re-read the Speluncean Explorers opinions side-by-side, highlighting ONLY the reasoning connectors ("therefore,".', 'For each judge, complete this sentence: "This judge thinks the law gets its authority from ______." 3.', 'Map each blank to a school: sovereign command = Analytical; nature/morality = Natural; social custom = Historical.', 'Practice with a new fact pattern (e.g., the hijab ban) until you can generate three distinct reasonings in 5 minutes.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
