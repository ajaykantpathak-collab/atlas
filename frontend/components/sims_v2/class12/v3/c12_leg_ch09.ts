import type { SimDef } from '../../engine/types';

/** v3 generated — c12_leg_ch09 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_leg_ch09: SimDef = {
    id: 'v3_c12_leg_ch09',
    title: 'Criminal Laws in India',
    subtitle: 'This node covers the conceptual foundations of criminal law: definition of crime.',
    classLevel: 12, subject: 'leg', topic: 'Criminal Laws in India',
    chapters: ['c12_leg_ch09'],
    nodeIds: ['c12_leg_cbse_09_001', 'c12_leg_cbse_09_002', 'c12_leg_cbse_09_003', 'c12_leg_cbse_09_004', 'c12_leg_cbse_09_005', 'c12_leg_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a real scenario: "A person picks up a stranger\'s phone thinking it\'s theirs — is this theft?" Use.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'State the Latin maxim that encapsulates the relationship between actus reus and mens rea, and translate it literally.',
        options: ['The maxim is *actus non facit reum nisi mens sit rea*', 'an act does not make a person guilty unless the mind is also guilty', 'motive is an essential element of crime'],
        answer: 'The maxim is *actus non facit reum nisi mens sit rea*',
        hook: 'Students believe **"motive is an essential element of crime"** and that "good motive (e.g., stealing to feed family).',
    },
    teaching: [
        { title: 'Criminal Laws in India — Key Concepts and Institutions', text: 'Crime is an unlawful act prohibited by law and punishable by the State, constituted by the coexistence of **actus reus** (a voluntary act or illegal omission) and **mens rea** (a guilty mind.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_leg_cbse_09_001', title: 'Criminal Laws in India — Key Concepts and Institutions',
          caseStudy: { intro: 'Start with a real scenario: "A person picks up a stranger\'s phone thinking it\'s theirs — is this theft?" Use this to surface the student\'s intuition about.',
            decisions: [{ prompt: 'State the Latin maxim that encapsulates the relationship between actus reus and mens rea, and translate it literally.', options: [
                { text: 'The maxim is *actus non facit reum nisi mens sit rea*', outcome: 'The maxim is *actus non facit reum nisi mens sit rea* — "an act does not make a person guilty.' },
                { text: 'an act does not make a person guilty unless the mind is also guilty', outcome: 'Not quite — Students believe **"motive is an essential element of crime"** and that "good motive (e.g.', reveals: 'motive-is-an-essential-element' },
                { text: 'motive is an essential element of crime', outcome: 'Not quite — Students believe **"motive is an essential element of crime"** and that "good motive (e.g.', reveals: 'motive-is-an-essential-element' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_09_002', title: 'Criminal Laws in India — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Imagine you read a news headline: *"Teen arrested for planning a robbery but caught before reaching the bank."* Ask yourself: **Has a crime been committed?',
            decisions: [{ prompt: 'What is the Latin maxim that captures the principle that an act does not make a person guilty unless the mind is also blameworthy?', options: [
                { text: 'The maxim is **"actus non facit reum nisi mens sit rea"**', outcome: 'The maxim is **"actus non facit reum nisi mens sit rea"** — meaning "an act does not make a person.' },
                { text: 'actus non facit reum nisi mens sit rea', outcome: 'Not quite — **Misconception:** *"Motive and intention are the same in criminal law — if you had a good reason.', reveals: 'misconception-motive-and-intention-are' },
                { text: 'an act does not make a person guilty unless the mind is guilty', outcome: 'Not quite — **Misconception:** *"Motive and intention are the same in criminal law — if you had a good reason.', reveals: 'misconception-motive-and-intention-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_09_003', title: 'Criminal Laws in India — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with a real scenario: "A man finds a lost wallet with ₹50,000. He keeps it. Is this a crime?" Guide students to break it down: (1) What was the *act*?',
            decisions: [{ prompt: 'Define actus reus and mens rea in one sentence each, and state the Latin maxim that encapsulates their relationship.', options: [
                { text: 'Actus reus is a voluntary act or illegal omission prohibited by law', outcome: 'Actus reus is a voluntary act or illegal omission prohibited by law; mens rea is the guilty.' },
                { text: 'the crime itself', outcome: 'Not quite — Students believe **"motive is an essential element of crime"** because in movies/TV, detectives.', reveals: 'motive-is-an-essential-element' },
                { text: 'motive', outcome: 'Not quite — Students believe **"motive is an essential element of crime"** because in movies/TV, detectives.', reveals: 'motive-is-an-essential-element' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_09_004', title: 'Criminal Laws in India — Processes and Procedures',
          caseStudy: { intro: 'Start with a real newspaper headline: "Accused confesses to murder in WhatsApp voice note — can this be used in court?" Ask the student: "Is a WhatsApp voice.',
            decisions: [{ prompt: 'Define \'actus reus\' and \'mens rea\' and state the Latin maxim that encapsulates their relationship.', options: [
                { text: 'Actus reus is the prohibited act or illegal omission (physical element)', outcome: 'Actus reus is the prohibited act or illegal omission (physical element); mens rea is the guilty.' },
                { text: 'mens rea is always required', outcome: 'Not quite — Students believe that **"preparation is never punishable"** and **"attempt requires the last.', reveals: 'preparation-is-never-punishable-and' },
                { text: 'preparation is never punishable', outcome: 'Not quite — Students believe that **"preparation is never punishable"** and **"attempt requires the last.', reveals: 'preparation-is-never-punishable-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_09_005', title: 'Criminal Laws in India — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'You\'re in the exam hall. A 5-mark question reads: "A confesses to a fellow prisoner X while in police custody. The police constable overhears it.',
            decisions: [{ prompt: 'Define "mens rea" and "actus reus" in the context of a criminal offence under the IPC.', options: [
                { text: 'Mens rea = guilty mind/intention', outcome: 'Mens rea = guilty mind/intention; actus reus = guilty act/illegal omission.' },
                { text: 'an act does not make a person guilty unless the mind is also guilty', outcome: 'Not quite — Students think "confession = admission" and use them interchangeably. They are NOT the same.', reveals: 'confession-admission-and-use-them' },
                { text: 'mens rea is motive', outcome: 'Not quite — Students think "confession = admission" and use them interchangeably. They are NOT the same.', reveals: 'confession-admission-and-use-them' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_09_006', title: 'Criminal Laws in India — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a real newspaper headline: "Teenager stabs friend over PUBG dispute — claims he only wanted to scare him." Ask the student: "Is this murder, attempt.',
            decisions: [{ prompt: 'State the Latin maxim that encapsulates the principle of concurrence of actus reus and mens rea, and translate its meaning.', options: [
                { text: 'The maxim is **"actus non facit reum nisi mens sit rea"**', outcome: 'The maxim is **"actus non facit reum nisi mens sit rea"** — "An act does not make a person guilty.' },
                { text: 'actus non facit reum nisi mens sit rea', outcome: 'Not quite — **Misconception:** "If the accused confesses to the police (even informally), it is strong evidence.', reveals: 'misconception-if-the-accused-confesses' },
                { text: 'An act does not make a person guilty unless the mind is also guilty', outcome: 'Not quite — **Misconception:** "If the accused confesses to the police (even informally), it is strong evidence.', reveals: 'misconception-if-the-accused-confesses' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_09_006', title: 'Criminal Laws in India — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a real newspaper headline: "Teenager stabs friend over PUBG dispute — claims he only wanted to scare him." Ask the student: "Is this murder, attempt.',
            decisions: [{ prompt: 'State the Latin maxim that encapsulates the principle of concurrence of actus reus and mens rea, and translate its meaning.', options: [
                { text: 'The maxim is **"actus non facit reum nisi mens sit rea"**', outcome: 'The maxim is **"actus non facit reum nisi mens sit rea"** — "An act does not make a person guilty.' },
                { text: 'actus non facit reum nisi mens sit rea', outcome: 'Not quite — **Misconception:** "If the accused confesses to the police (even informally), it is strong evidence.', reveals: 'misconception-if-the-accused-confesses' },
                { text: 'An act does not make a person guilty unless the mind is also guilty', outcome: 'Not quite — **Misconception:** "If the accused confesses to the police (even informally), it is strong evidence.', reveals: 'misconception-if-the-accused-confesses' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_leg_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'Criminal Laws in India', spots: [
            { id: 's1', label: 'Criminal Laws in India Key Concepts and Institutions', prompt: 'Which idea is this? — Crime is an unlawful act prohibited by law and punishable by the State, constituted.', answer: 'Criminal Laws in India Key Concepts and Institutions', options: ['Criminal Laws in India Key Concepts and Institutions', 'Criminal Laws in India Constitutional and Legal Provisions', 'Criminal Laws in India Landmark Cases and Illustrations', 'Criminal Laws in India Processes and Procedures'] },
            { id: 's2', label: 'Criminal Laws in India Constitutional and Legal Provisions', prompt: 'Which idea is this? — Criminal law is the body of statutes (primarily the Indian Penal Code, 1860, Criminal.', answer: 'Criminal Laws in India Constitutional and Legal Provisions', options: ['Criminal Laws in India Constitutional and Legal Provisions', 'Criminal Laws in India Key Concepts and Institutions', 'Criminal Laws in India Landmark Cases and Illustrations', 'Criminal Laws in India Processes and Procedures'] },
            { id: 's3', label: 'Criminal Laws in India Landmark Cases and Illustrations', prompt: 'Which idea is this? — A crime in Indian law requires two fundamental elements: **actus reus** (a voluntary act.', answer: 'Criminal Laws in India Landmark Cases and Illustrations', options: ['Criminal Laws in India Landmark Cases and Illustrations', 'Criminal Laws in India Key Concepts and Institutions', 'Criminal Laws in India Constitutional and Legal Provisions', 'Criminal Laws in India Processes and Procedures'] },
            { id: 's4', label: 'Criminal Laws in India Processes and Procedures', prompt: 'Which idea is this? — Criminal law in India is a tripartite framework comprising the Indian Penal Code (IPC).', answer: 'Criminal Laws in India Processes and Procedures', options: ['Criminal Laws in India Processes and Procedures', 'Criminal Laws in India Key Concepts and Institutions', 'Criminal Laws in India Constitutional and Legal Provisions', 'Criminal Laws in India Landmark Cases and Illustrations'] },
            { id: 's5', label: 'Criminal Laws in India Exam-Oriented Questions and Answers', prompt: 'Which idea is this? — This node provides exam-oriented practice questions and model answers for Criminal Laws.', answer: 'Criminal Laws in India Exam-Oriented Questions and Answers', options: ['Criminal Laws in India Exam-Oriented Questions and Answers', 'Criminal Laws in India Key Concepts and Institutions', 'Criminal Laws in India Constitutional and Legal Provisions', 'Criminal Laws in India Landmark Cases and Illustrations'] },
            { id: 's6', label: 'Criminal Laws in India Critical Analysis and Application', prompt: 'Which idea is this? — Criminal law in India is the body of statutes (primarily the Indian Penal Code, 1860.', answer: 'Criminal Laws in India Critical Analysis and Application', options: ['Criminal Laws in India Critical Analysis and Application', 'Criminal Laws in India Key Concepts and Institutions', 'Criminal Laws in India Constitutional and Legal Provisions', 'Criminal Laws in India Landmark Cases and Illustrations'] }
          ] } },
        { type: 'case', nodeId: 'c12_leg_cbse_09_006', title: 'You made it',
          caseStudy: { intro: 'You finished Criminal Laws in India — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_leg_cbse_09_001', difficulty: 'standard',
          question: 'Crime is an unlawful act prohibited by law and punishable by the State.',
          hint: 'If stuck on actus reus/mens rea distinction, revisit the *Donoghue v.',
          misconception: 'Students believe **"motive is an essential element of crime"** and that "good motive (e.g., stealing to feed family).',
          parts: [
                { id: 'a', prompt: 'State the Latin maxim that encapsulates the relationship between actus reus and mens rea, and translate it literally.', answer: 'The maxim is *actus non facit reum nisi mens sit rea*',
                  options: ['The maxim is *actus non facit reum nisi mens sit rea*', 'an act does not make a person guilty unless the mind is also guilty', 'motive is an essential element of crime', 'good motive (e.g., stealing to feed family) negates criminal liability'],
                  hint: 'If stuck on actus reus/mens rea distinction, revisit the *Donoghue v.',
                  misconception: 'Students believe **"motive is an essential element of crime"** and that "good motive (e.g., stealing to feed family) negates criminal.' },
                { id: 'b', prompt: 'A doctor administers a painkiller to a terminally ill patient, knowing it may hasten death but intending only to relieve pain. The patient dies.', answer: 'Actus reus: YES — a voluntary act (administering drug) causing death',
                  options: ['Actus reus: YES — a voluntary act (administering drug) causing death', 'mens rea exists because death was foreseen', 'motive is an essential element of crime', 'good motive (e.g., stealing to feed family) negates criminal liability'],
                  hint: 'If stuck on actus reus/mens rea distinction, revisit the *Donoghue v.',
                  misconception: 'Students believe **"motive is an essential element of crime"** and that "good motive (e.g., stealing to feed family) negates criminal.' },
                { id: 'c', prompt: 'Riya buys a knife and writes a diary entry: "I will kill Anjali tomorrow." She keeps the knife in her bag but is arrested before meeting Anjali.', answer: 'Riya is at the **preparation stage**',
                  options: ['Riya is at the **preparation stage**', 'attempt', 'motive is an essential element of crime', 'good motive (e.g., stealing to feed family) negates criminal liability'],
                  hint: 'If stuck on actus reus/mens rea distinction, revisit the *Donoghue v.',
                  misconception: 'Students believe **"motive is an essential element of crime"** and that "good motive (e.g., stealing to feed family) negates criminal.' }
          ],
            remediations: { 'motive-is-an-essential-element': { steps: ['Re-read the *Nathuni Yadav* extract in the NCERT text (page 116) — highlight the Court\'s words: "Motive...', 'need not necessarily be proportionally grave to do grave crimes." 2.', 'Create a two-column table: Column A = Intention (definition, role in liability, example), Column B = Motive.', 'Solve this: "X steals medicine to save dying child.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"motive is an essential element of crime"** and that "good motive (e.g., stealing to feed family).',
          parts: [
                { id: 'a', prompt: '"In dowry death cases under Section 304-B IPC, the prosecution must prove beyond reasonable doubt that the woman was subjected to cruelty for dowry demand soon.', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'prosecution must prove beyond reasonable doubt throughout', 'motive is an essential element of crime', 'good motive (e.g., stealing to feed family) negates criminal liability'],
                  hint: 'If stuck on actus reus/mens rea distinction, revisit the *Donoghue v.',
                  misconception: 'Students believe **"motive is an essential element of crime"** and that "good motive (e.g., stealing to feed family) negates criminal.' }
          ],
            remediations: { 'motive-is-an-essential-element': { steps: ['Re-read the *Nathuni Yadav* extract in the NCERT text (page 116) — highlight the Court\'s words: "Motive...', 'need not necessarily be proportionally grave to do grave crimes." 2.', 'Create a two-column table: Column A = Intention (definition, role in liability, example), Column B = Motive.', 'Solve this: "X steals medicine to save dying child.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_09_002', difficulty: 'standard',
          question: 'Criminal law is the body of statutes (primarily the Indian Penal Code, 1860.',
          hint: 'If stuck on *actus reus* vs. *mens rea*, review **Class 11: Classification of Laws.',
          misconception: '**Misconception:** *"Motive and intention are the same in criminal law — if you had a good reason (motive), you lack.',
          parts: [
                { id: 'a', prompt: 'What is the Latin maxim that captures the principle that an act does not make a person guilty unless the mind is also blameworthy?', answer: 'The maxim is **"actus non facit reum nisi mens sit rea"**',
                  options: ['The maxim is **"actus non facit reum nisi mens sit rea"**', 'actus non facit reum nisi mens sit rea', 'an act does not make a person guilty unless the mind is guilty', 'ignorantia juris non excusat'],
                  hint: 'If stuck on *actus reus* vs. *mens rea*, review **Class 11: Classification of Laws.',
                  misconception: '**Misconception:** *"Motive and intention are the same in criminal law — if you had a good reason (motive), you lack criminal intention."*.' }
          ],
            remediations: { 'misconception-motive-and-intention-are': { steps: ['**Revisit the distinction**: Write two columns — "Intention (Mens Rea)" and "Motive" — and list 3 differences using.', '**Drill the stages**: Take 5 news snippets (e.g., "man buys poison," "woman points gun," "boy throws stone but misses").', '**Re-diagnose**: Attempt Diagnostic Questions 2, 3, and 4 again — if you still confuse omission duty.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_09_003', difficulty: 'standard',
          question: 'A crime in Indian law requires two fundamental elements: **actus reus** (a.',
          hint: 'If stuck, review the "Classification of Laws — Landmark Cases and Illustrations".',
          misconception: 'Students believe **"motive is an essential element of crime"** because in movies/TV, detectives always hunt for "the.',
          parts: [
                { id: 'a', prompt: 'Define actus reus and mens rea in one sentence each, and state the Latin maxim that encapsulates their relationship.', answer: 'Actus reus is a voluntary act or illegal omission prohibited by law',
                  options: ['Actus reus is a voluntary act or illegal omission prohibited by law', 'the crime itself', 'motive', 'motive is an essential element of crime'],
                  hint: 'If stuck, review the "Classification of Laws — Landmark Cases and Illustrations".',
                  misconception: 'Students believe **"motive is an essential element of crime"** because in movies/TV, detectives always hunt for "the motive." In reality.' },
                { id: 'b', prompt: 'A lifeguard on duty sees a child drowning but deliberately does nothing because he dislikes the child\'s parents. The child dies.', answer: 'Yes, actus reus exists for the lifeguard',
                  options: ['Yes, actus reus exists for the lifeguard', 'both are guilty', 'neither is guilty', 'motive is an essential element of crime'],
                  hint: 'If stuck, review the "Classification of Laws — Landmark Cases and Illustrations".',
                  misconception: 'Students believe **"motive is an essential element of crime"** because in movies/TV, detectives always hunt for "the motive." In reality.' },
                { id: 'c', prompt: 'Mayer Hans George (a German national) was caught at Bombay airport with 34 kg of gold, violating a RBI notification issued 4 days earlier.', answer: 'The Court held that mens rea can be excluded by *express statutory language* or',
                  options: ['The Court held that mens rea can be excluded by *express statutory language* or', 'he knew gold was illegal everywhere', 'ignorance of law is no excuse', 'motive is an essential element of crime'],
                  hint: 'If stuck, review the "Classification of Laws — Landmark Cases and Illustrations".',
                  misconception: 'Students believe **"motive is an essential element of crime"** because in movies/TV, detectives always hunt for "the motive." In reality.' },
                { id: 'd', prompt: 'Compare and contrast: (a) Preparation to commit dacoity (Section 399 IPC) vs. (b) Preparation to commit theft. Why is (a) punishable but (b) not?', answer: 'Preparation for dacoity is punishable under Section 399 IPC',
                  options: ['Preparation for dacoity is punishable under Section 399 IPC', 'both are punishable', 'neither is punishable', 'motive is an essential element of crime'],
                  hint: 'If stuck, review the "Classification of Laws — Landmark Cases and Illustrations".',
                  misconception: 'Students believe **"motive is an essential element of crime"** because in movies/TV, detectives always hunt for "the motive." In reality.' }
          ],
            remediations: { 'motive-is-an-essential-element': { steps: ['Ask the student to define "intention" and "motive" in their own words.', 'Give the "stealing bread for starving child" scenario.', 'Ask: "Is there actus reus? Is there mens rea? Does the motive change the answer?"', 'Show Section 81 IPC (act done in good faith to prevent greater harm) — this is a *defence*, not absence of mens rea.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_09_004', difficulty: 'standard',
          question: 'Criminal law in India is a tripartite framework comprising the Indian Penal.',
          hint: 'If stuck, revisit Class 11 Judiciary node c11_leg_cbse_11_004 (Processes and Procedures).',
          misconception: 'Students believe that **"preparation is never punishable"** and **"attempt requires the last proximate act"**.',
          parts: [
                { id: 'a', prompt: 'Define \'actus reus\' and \'mens rea\' and state the Latin maxim that encapsulates their relationship. Why is mens rea not required for all offences under the IPC?', answer: 'Actus reus is the prohibited act or illegal omission (physical element)',
                  options: ['Actus reus is the prohibited act or illegal omission (physical element)', 'mens rea is always required', 'preparation is never punishable', 'attempt requires the last proximate act'],
                  hint: 'If stuck, revisit Class 11 Judiciary node c11_leg_cbse_11_004 (Processes and Procedures) for FIR.',
                  misconception: 'Students believe that **"preparation is never punishable"** and **"attempt requires the last proximate act"**.' },
                { id: 'b', prompt: 'A person buys poison, mixes it in food, and places it on the victim\'s table. The victim does not eat it. At which stage of crime is the accused?', answer: 'This is **attempt**, not mere preparation',
                  options: ['This is **attempt**, not mere preparation', 'preparation', 'preparation is never punishable', 'attempt requires the last proximate act'],
                  hint: 'If stuck, revisit Class 11 Judiciary node c11_leg_cbse_11_004 (Processes and Procedures) for FIR.',
                  misconception: 'Students believe that **"preparation is never punishable"** and **"attempt requires the last proximate act"**.' },
                { id: 'c', prompt: 'Compare \'admission\' (S. 17) and \'confession\' (S. 24–30) under the Evidence Act. Can a confession made to a police officer be proved?', answer: 'Admission (S',
                  options: ['Admission (S', 'confession to police is admissible if voluntary', 'preparation is never punishable', 'attempt requires the last proximate act'],
                  hint: 'If stuck, revisit Class 11 Judiciary node c11_leg_cbse_11_004 (Processes and Procedures) for FIR.',
                  misconception: 'Students believe that **"preparation is never punishable"** and **"attempt requires the last proximate act"**.' }
          ],
            remediations: { 'preparation-is-never-punishable-and': { steps: ['Re-read the "Stages of Crime" section in the NCERT textbook (Chapter 4C, pp.', '116–117) and make a 4-column table: Stage | Punishable?', '| IPC Sections | Key Test (e.g., proximity rule, locus poenitentiae).', 'For dying declarations, create a checklist from K.R.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_09_005', difficulty: 'standard',
          question: 'This node provides exam-oriented practice questions and model answers for.',
          hint: 'If stuck, revisit *State of Maharashtra v. Mayer Hans George* (mens rea exclusion) and.',
          misconception: 'Students think "confession = admission" and use them interchangeably. They are NOT the same.',
          parts: [
                { id: 'a', prompt: 'Define "mens rea" and "actus reus" in the context of a criminal offence under the IPC.', answer: 'Mens rea = guilty mind/intention',
                  options: ['Mens rea = guilty mind/intention', 'an act does not make a person guilty unless the mind is also guilty', 'mens rea is motive', 'confession = admission'],
                  hint: 'If stuck, revisit *State of Maharashtra v. Mayer Hans George* (mens rea exclusion) and *Nathuni.',
                  misconception: 'Students think "confession = admission" and use them interchangeably. They are NOT the same.' },
                { id: 'b', prompt: 'A woman, driven by extreme poverty, steals bread to feed her starving child. She is caught.', answer: 'Yes, she is guilty',
                  options: ['Yes, she is guilty', 'no theft because motive was good', 'confession = admission', '"confession = admission" and use them interchangeably'],
                  hint: 'If stuck, revisit *State of Maharashtra v. Mayer Hans George* (mens rea exclusion) and *Nathuni.',
                  misconception: 'Students think "confession = admission" and use them interchangeably. They are NOT the same.' },
                { id: 'c', prompt: 'Compare and contrast "preparation" and "attempt" as stages of crime.', answer: 'Preparation = arranging means (e.g., buying poison)',
                  options: ['Preparation = arranging means (e.g., buying poison)', 'confession = admission', '"confession = admission" and use them interchangeably'],
                  hint: 'If stuck, revisit *State of Maharashtra v. Mayer Hans George* (mens rea exclusion) and *Nathuni.',
                  misconception: 'Students think "confession = admission" and use them interchangeably. They are NOT the same.' }
          ],
            remediations: { 'confession-admission-and-use-them': { steps: ['If confused between admission/confession: 1.', 'Make a 2-column table: Criminal vs Civil, Accused vs Any Party, Inculpatory vs Neutral, Sec 30 applicability.', 'UP* (confession to self) and *Harishankar v.', 'State* (admission in civil suit).'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_09_006', difficulty: 'standard',
          question: 'Criminal law in India is the body of statutes (primarily the Indian Penal Code.',
          hint: 'Review the *Mayer Hans George* case (AIR 1965 SC 722) in c12_leg_cbse_09_003 — it is the.',
          misconception: '**Misconception:** "If the accused confesses to the police (even informally), it is strong evidence of guilt." **Why.',
          parts: [
                { id: 'a', prompt: 'State the Latin maxim that encapsulates the principle of concurrence of actus reus and mens rea, and translate its meaning.', answer: 'The maxim is **"actus non facit reum nisi mens sit rea"**',
                  options: ['The maxim is **"actus non facit reum nisi mens sit rea"**', 'actus non facit reum nisi mens sit rea', 'An act does not make a person guilty unless the mind is also guilty', 'ignorantia juris non excusat'],
                  hint: 'Review the *Mayer Hans George* case (AIR 1965 SC 722) in c12_leg_cbse_09_003 — it is the.',
                  misconception: '**Misconception:** "If the accused confesses to the police (even informally), it is strong evidence of guilt." **Why it\'s wrong:** Under.' }
          ],
            remediations: { 'misconception-if-the-accused-confesses': { steps: ['If the student confesses the police-confession misconception: (1) Hand them **Section 25, 26, 27 of the Evidence Act**.', '(2) Ask them to highlight the *exact words* that make a police confession inadmissible ("no confession made to a police.', '(3) Give a 3-scenario drill: (a) A confesses to SHO in lock-up → inadmissible; (b) A confesses to friend in lock-up →.', '(4) Re-test with Diagnostic Question 6 after 24 hours.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
