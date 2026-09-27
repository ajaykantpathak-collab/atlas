import type { SimDef } from '../../engine/types';

/** v3 generated — c11_leg_ch13 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_leg_ch13: SimDef = {
    id: 'v3_c11_leg_ch13',
    title: 'Child Rights',
    subtitle: 'This node covers the conceptual foundation of child rights, key categories (education.',
    classLevel: 11, subject: 'leg', topic: 'Child Rights',
    chapters: ['c11_leg_ch13'],
    nodeIds: ['c11_leg_cbse_13_001', 'c11_leg_cbse_13_002', 'c11_leg_cbse_13_003', 'c11_leg_cbse_13_004', 'c11_leg_cbse_13_005', 'c11_leg_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start by asking: "If a 15-year-old is forced to work in a textile factory instead of attending school, which.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A 16-year-old is apprehended for a heinous offence (punishment >7 years). The Juvenile Justice Board (JJB) must decide whether to try them as an adult.',
        options: ['Step 1: JJB conducts a *preliminary assessment* (not trial) within 3 months: (i)', 'automatic transfer at 16', 'criminal'],
        answer: 'Step 1: JJB conducts a *preliminary assessment* (not trial) within 3 months: (i)',
        hook: 'Students often believe that the **Juvenile Justice (Care and Protection of Children) Act, 2015 applies ONLY.',
    },
    teaching: [
        { title: 'Child Rights — Key Concepts and Institutions', text: 'Child rights are the fundamental entitlements and protections guaranteed to every individual below the age of 18 years, ensuring their survival, development, participation, and protection from harm.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_leg_cbse_13_001', title: 'Child Rights — Key Concepts and Institutions',
          caseStudy: { intro: 'Start by asking: "If a 15-year-old is forced to work in a textile factory instead of attending school, which of their rights are being violated?" This connects.',
            decisions: [{ prompt: 'What is the age limit defined for a \'child\' under the United Nations Convention on the Rights of the Child (UNCRC), 1989, as referenced.', options: [
                { text: 'A child is any human being below the age of eighteen years, unless under the law', outcome: 'A child is any human being below the age of eighteen years, unless under the law applicable to the.' },
                { text: 'below 16 years', outcome: 'Not quite — Students often believe that child rights are only applicable to vulnerable or orphaned children.', reveals: 'child-rights-are-only-applicable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_13_002', title: 'Child Rights — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with a real headline: "14-year-old rescued from zari factory in Delhi, worked 14 hours/day for ₹200/week." Ask: "If you were the lawyer for this child.',
            decisions: [{ prompt: 'What is the constitutional definition of a \'child\' in India for the purpose of Fundamental Rights, and which Article explicitly prohibits.', options: [
                { text: 'The Constitution does not define \'child\' in a single Article', outcome: 'The Constitution does not define \'child\' in a single Article; the age of majority is 18 under the.' },
                { text: 'criminal', outcome: 'Not quite — Students often believe that the **Juvenile Justice (Care and Protection of Children) Act, 2015.', reveals: 'the-juvenile-justice-care-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_13_003', title: 'Child Rights — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with a real headline: "14-year-old rescued from zari factory in Delhi — employer says \'parents agreed\', police file FIR under CLPRA." Ask: *Can the.',
            decisions: [{ prompt: 'Name the Supreme Court case that held Article 24 (prohibition of child labour) is non-derogable even with parental consent, and state the.', options: [
                { text: '*M.C', outcome: '*M.C. Mehta v. State of Tamil Nadu (1996) 6 SCC 756* — the case concerned children employed.' },
                { text: 'compulsory service for public purposes', outcome: 'Not quite — **Misconception:** "Landmark cases are just \'important judgments\' — if I know the case name and.', reveals: 'misconception-landmark-cases-are-just' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_13_004', title: 'Child Rights — Processes and Procedures',
          caseStudy: { intro: 'Start with a real headline: "14-year-old found working in a Delhi bakery at 2 AM — police rescue him, but the bakery owner says \'he\'s my nephew\'." Ask: *Who.',
            decisions: [{ prompt: 'What is the statutory time limit for producing a child before the Child Welfare Committee (CWC) after rescue, and which section of the.', options: [
                { text: 'The child must be produced before the CWC **within 24 hours** of rescue, as mandated by', outcome: 'The child must be produced before the CWC **within 24 hours** of rescue, as mandated by **Section.' },
                { text: '48 hours', outcome: 'Not quite — Students often believe **"CWC and JJB are the same body with different names"** or that **"any.', reveals: 'cwc-and-jjb-are-the' },
                { text: '7 days', outcome: 'Not quite — Students often believe **"CWC and JJB are the same body with different names"** or that **"any.', reveals: 'cwc-and-jjb-are-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_13_005', title: 'Child Rights — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'A 17-year-old is apprehended for a violent robbery — the police treat him like an adult, handcuff him, and file an FIR under IPC. Is this legal?',
            decisions: [{ prompt: 'Define "child" under the UNCRC 1989 and the Juvenile Justice (Care and Protection of Children) Act, 2015.', options: [
                { text: 'Under UNCRC Article 1, a child is every human being below 18 years unless majority is', outcome: 'Under UNCRC Article 1, a child is every human being below 18 years unless majority is attained.' },
                { text: 'child is below 14', outcome: 'Not quite — Students believe that "juvenile justice" means "lenient punishment" or "no punishment." The exact.', reveals: 'juvenile-justice-means-lenient-punishment' },
                { text: 'child is below 16', outcome: 'Not quite — Students believe that "juvenile justice" means "lenient punishment" or "no punishment." The exact.', reveals: 'juvenile-justice-means-lenient-punishment' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_13_006', title: 'Child Rights — Critical Analysis and Application',
          caseStudy: { intro: 'Start with this real-world puzzle: "A 15-year-old works in her aunt\'s home-based beedi-rolling unit after school.',
            decisions: [{ prompt: 'State the exact age thresholds for: (a) prohibition of employment in factories/mines/hazardous occupations under Article 24; (b) free and.', options: [
                { text: '(a) Under 14 years (Article 24)', outcome: '(a) Under 14 years (Article 24); (b) 6 to 14 years (Article 21A); (c) Below 18 years (JJ Act 2015.' },
                { text: 'critical analysis', outcome: 'Not quite — Students believe "critical analysis" means listing *both sides* of an argument (e.g., "CLPRA.', reveals: 'critical-analysis-means-listing-both' },
                { text: '18 for Art 24 or 14 for POCSO', outcome: 'Not quite — Students believe "critical analysis" means listing *both sides* of an argument (e.g., "CLPRA.', reveals: 'critical-analysis-means-listing-both' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_13_006', title: 'Child Rights — Critical Analysis and Application',
          caseStudy: { intro: 'Start with this real-world puzzle: "A 15-year-old works in her aunt\'s home-based beedi-rolling unit after school.',
            decisions: [{ prompt: 'State the exact age thresholds for: (a) prohibition of employment in factories/mines/hazardous occupations under Article 24; (b) free and.', options: [
                { text: '(a) Under 14 years (Article 24)', outcome: '(a) Under 14 years (Article 24); (b) 6 to 14 years (Article 21A); (c) Below 18 years (JJ Act 2015.' },
                { text: 'critical analysis', outcome: 'Not quite — Students believe "critical analysis" means listing *both sides* of an argument (e.g., "CLPRA.', reveals: 'critical-analysis-means-listing-both' },
                { text: '18 for Art 24 or 14 for POCSO', outcome: 'Not quite — Students believe "critical analysis" means listing *both sides* of an argument (e.g., "CLPRA.', reveals: 'critical-analysis-means-listing-both' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_leg_cbse_13_002', title: 'Identify each idea',
          dissect: { specimen: 'Child Rights', spots: [
            { id: 's1', label: 'Child Rights Key Concepts and Institutions', prompt: 'Which idea is this? — Child rights are the fundamental entitlements and protections guaranteed to every.', answer: 'Child Rights Key Concepts and Institutions', options: ['Child Rights Key Concepts and Institutions', 'Child Rights Constitutional and Legal Provisions', 'Child Rights Landmark Cases and Illustrations', 'Child Rights Processes and Procedures'] },
            { id: 's2', label: 'Child Rights Constitutional and Legal Provisions', prompt: 'Which idea is this? — Child Rights are the legally enforceable entitlements guaranteed to every person below.', answer: 'Child Rights Constitutional and Legal Provisions', options: ['Child Rights Constitutional and Legal Provisions', 'Child Rights Key Concepts and Institutions', 'Child Rights Landmark Cases and Illustrations', 'Child Rights Processes and Procedures'] },
            { id: 's3', label: 'Child Rights Landmark Cases and Illustrations', prompt: 'Which idea is this? — Landmark cases in child rights are binding judicial precedents where the Supreme Court.', answer: 'Child Rights Landmark Cases and Illustrations', options: ['Child Rights Landmark Cases and Illustrations', 'Child Rights Key Concepts and Institutions', 'Child Rights Constitutional and Legal Provisions', 'Child Rights Processes and Procedures'] },
            { id: 's4', label: 'Child Rights Processes and Procedures', prompt: 'Which idea is this? — Child Rights — Processes and Procedures refers to the institutional mechanisms, statutory.', answer: 'Child Rights Processes and Procedures', options: ['Child Rights Processes and Procedures', 'Child Rights Key Concepts and Institutions', 'Child Rights Constitutional and Legal Provisions', 'Child Rights Landmark Cases and Illustrations'] },
            { id: 's5', label: 'Child Rights Exam-Oriented Questions and Answers', prompt: 'Which idea is this? — Child Rights are the fundamental entitlements guaranteed to every person below 18 years.', answer: 'Child Rights Exam-Oriented Questions and Answers', options: ['Child Rights Exam-Oriented Questions and Answers', 'Child Rights Key Concepts and Institutions', 'Child Rights Constitutional and Legal Provisions', 'Child Rights Landmark Cases and Illustrations'] },
            { id: 's6', label: 'Child Rights Critical Analysis and Application', prompt: 'Which idea is this? — Critical Analysis and Application of Child Rights refers to the competency of evaluating.', answer: 'Child Rights Critical Analysis and Application', options: ['Child Rights Critical Analysis and Application', 'Child Rights Key Concepts and Institutions', 'Child Rights Constitutional and Legal Provisions', 'Child Rights Landmark Cases and Illustrations'] }
          ] } },
        { type: 'case', nodeId: 'c11_leg_cbse_13_006', title: 'You made it',
          caseStudy: { intro: 'You finished Child Rights — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_leg_cbse_13_001', difficulty: 'standard',
          question: 'Child rights are the fundamental entitlements and protections guaranteed.',
          hint: 'If stuck, review the expansion of Article 21 through cases like Mohini Jain (education).',
          misconception: 'Students often believe that child rights are only applicable to vulnerable or orphaned children, such as those.',
          parts: [
                { id: 'a', prompt: 'What is the age limit defined for a \'child\' under the United Nations Convention on the Rights of the Child (UNCRC), 1989, as referenced in Indian legal context?', answer: 'A child is any human being below the age of eighteen years, unless under the law',
                  options: ['A child is any human being below the age of eighteen years, unless under the law', 'below 16 years'],
                  hint: 'If stuck, review the expansion of Article 21 through cases like Mohini Jain (education), Paschim.',
                  misconception: 'Students often believe that child rights are only applicable to vulnerable or orphaned children, such as those in shelter homes or street.' }
          ],
            remediations: { 'child-rights-are-only-applicable': { steps: ['To address this, ask the student: "Does a child in a private school who is scolded and isolated for low marks have any.', 'Then contrast welfare (targeted aid for poor children) with rights (universal entitlements)—using the example that even.', 'Reinforce that rights are not charity but legal entitlements, irrespective of socioeconomic status, using NCERT’s.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_13_002', difficulty: 'standard',
          question: 'Child Rights are the legally enforceable entitlements guaranteed to every.',
          hint: 'Review the "Fundamental Rights vs. Directive Principles" distinction.',
          misconception: 'Students often believe that the **Juvenile Justice (Care and Protection of Children) Act, 2015 applies ONLY.',
          parts: [
                { id: 'a', prompt: 'What is the constitutional definition of a \'child\' in India for the purpose of Fundamental Rights, and which Article explicitly prohibits employment.', answer: 'The Constitution does not define \'child\' in a single Article',
                  options: ['The Constitution does not define \'child\' in a single Article', 'criminal'],
                  hint: 'Review the "Fundamental Rights vs. Directive Principles" distinction in c11_leg_cbse_02_001 and the.',
                  misconception: 'Students often believe that the **Juvenile Justice (Care and Protection of Children) Act, 2015 applies ONLY to "criminal" children (CCL)**.' },
                { id: 'b', prompt: 'A 16-year-old is apprehended for a heinous offence (punishment >7 years). The Juvenile Justice Board (JJB) must decide whether to try them as an adult.', answer: 'Step 1: JJB conducts a *preliminary assessment* (not trial) within 3 months: (i)',
                  options: ['Step 1: JJB conducts a *preliminary assessment* (not trial) within 3 months: (i)', 'automatic transfer at 16', 'criminal'],
                  hint: 'Review the "Fundamental Rights vs. Directive Principles" distinction in c11_leg_cbse_02_001 and the.',
                  misconception: 'Students often believe that the **Juvenile Justice (Care and Protection of Children) Act, 2015 applies ONLY to "criminal" children (CCL)**.' }
          ],
            remediations: { 'the-juvenile-justice-care-and': { steps: ['Draw a **two-column table** on the board: Left column = "Child in Conflict with Law (CCL)", Right column = "Child.', 'Populate rows: *Initiating Authority* (Police/FIR vs.', 'Any person/CWC suo motu), *Forum* (JJB vs.', 'CWC), *Core Question* (Did child commit offence?'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_13_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the **Juvenile Justice (Care and Protection of Children) Act, 2015 applies ONLY.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "The POCSO Act, 2012, by mandating mandatory reporting (Section 19) and reversing the burden of proof (Section 29), violates the.', answer: 'The statement is *legally unsound*',
                  options: ['The statement is *legally unsound*', 'criminal'],
                  hint: 'Review the "Fundamental Rights vs. Directive Principles" distinction in c11_leg_cbse_02_001 and the.',
                  misconception: 'Students often believe that the **Juvenile Justice (Care and Protection of Children) Act, 2015 applies ONLY to "criminal" children (CCL)**.' }
          ],
            remediations: { 'the-juvenile-justice-care-and': { steps: ['Draw a **two-column table** on the board: Left column = "Child in Conflict with Law (CCL)", Right column = "Child.', 'Populate rows: *Initiating Authority* (Police/FIR vs.', 'Any person/CWC suo motu), *Forum* (JJB vs.', 'CWC), *Core Question* (Did child commit offence?'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_13_003', difficulty: 'standard',
          question: 'Landmark cases in child rights are binding judicial precedents where the.',
          hint: 'If stuck, review **c11_leg_cbse_13_002** — specifically the table mapping each.',
          misconception: '**Misconception:** "Landmark cases are just \'important judgments\' — if I know the case name and year, I\'ve mastered the.',
          parts: [
                { id: 'a', prompt: 'Name the Supreme Court case that held Article 24 (prohibition of child labour) is non-derogable even with parental consent, and state the specific industry.', answer: '*M.C',
                  options: ['*M.C', 'compulsory service for public purposes'],
                  hint: 'If stuck, review **c11_leg_cbse_13_002** — specifically the table mapping each constitutional.',
                  misconception: '**Misconception:** "Landmark cases are just \'important judgments\' — if I know the case name and year, I\'ve mastered the topic." **Why it\'s.' },
                { id: 'b', prompt: 'In *Unni Krishnan v. State of Andhra Pradesh (1993)*, the Supreme Court read the right to education into Article 21.', answer: 'Because Directive Principles (Article 45) were **non-justiciable**',
                  options: ['Because Directive Principles (Article 45) were **non-justiciable**', 'Article 45 was deleted', 'Article 21 is broader'],
                  hint: 'If stuck, review **c11_leg_cbse_13_002** — specifically the table mapping each constitutional.',
                  misconception: '**Misconception:** "Landmark cases are just \'important judgments\' — if I know the case name and year, I\'ve mastered the topic." **Why it\'s.' }
          ],
            remediations: { 'misconception-landmark-cases-are-just': { steps: ['** Give the student the *bare text* of *Sheela Barse (1986) SCC 187* — only paragraphs 12-18 (the Court\'s directions).', '** Convert each underlined sentence into a **"State Obligation" format**: "The State shall [action] within [timeframe].', '** Ask: "Which Fundamental Article does each obligation flow from?" — force the Article 21/39(e)/39(f) linkage. **', '** Give a *new* fact pattern (e.g., "Juvenile home has no teacher, children idle all day").'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_13_004', difficulty: 'standard',
          question: 'Child Rights — Processes and Procedures refers to the institutional mechanisms.',
          hint: 'If stuck, review **c11_leg_cbse_13_001** — specifically the definitions of CNCP/CCL, the.',
          misconception: 'Students often believe **"CWC and JJB are the same body with different names"** or that **"any magistrate can handle.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Child Rights — Processes and Procedures refers to the institutional mechanisms, statutory',
                  options: ['Child Rights — Processes and Procedures refers to the institutional mechanisms, statutory', 'Child rights are the fundamental entitlements and protections guaranteed to every', 'Child Rights are the legally enforceable entitlements guaranteed to every person below', 'Landmark cases in child rights are binding judicial precedents where the Supreme Court or'],
                  hint: 'If stuck, review **c11_leg_cbse_13_001** — specifically the definitions of CNCP/CCL, the.',
                  misconception: 'Students often believe **"CWC and JJB are the same body with different names"** or that **"any magistrate can handle child cases."** This.' }
          ],
            remediations: { 'cwc-and-jjb-are-the': { steps: ['**Visual Mapping:** Draw two parallel flowcharts on the board — **CNCP Track** (Rescue → Police/SJPU → CWC [24 hrs] →.', 'Use colour-coded sticky notes for *authority*, *timeline*, and *order type*.', '**Role-Play:** Assign students as Police Officer, CWC Chairperson, JJB Principal Magistrate, DCPU Officer, Childline.', 'Give a scenario (e.g., "child found in factory") — each must state their *exact statutory duty* and *deadline* before.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_13_005', difficulty: 'standard',
          question: 'Child Rights are the fundamental entitlements guaranteed to every person below.',
          hint: 'If stuck, review the "Child Rights — Key Concepts and Institutions" node.',
          misconception: 'Students believe that "juvenile justice" means "lenient punishment" or "no punishment." The exact error: they conflate.',
          parts: [
                { id: 'a', prompt: 'Analyze: Under POCSO Act 2012, a 17-year-old boy and a 17-year-old girl engage in consensual sexual intercourse. The girl\'s parents file a complaint.', answer: 'Yes, the boy can be prosecuted',
                  options: ['Yes, the boy can be prosecuted', 'consent is defence', 'Romeo-Juliet exception applies', 'juvenile justice'],
                  hint: 'If stuck, review the "Child Rights — Key Concepts and Institutions" node (c11_leg_cbse_13_001) for.',
                  misconception: 'Students believe that "juvenile justice" means "lenient punishment" or "no punishment." The exact error: they conflate *inquiry* (JJB.' }
          ],
            remediations: { 'juvenile-justice-means-lenient-punishment': { steps: ['If the student holds this misconception: (1) Make them read Section 15 (preliminary assessment) and Section 19.', '(3) Ask: "If the law was truly lenient, why would Section 15 exist?" — force them to see the *conditional* nature.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_13_006', difficulty: 'standard',
          question: 'Critical Analysis and Application of Child Rights refers to the competency.',
          hint: 'If stuck, revisit c11_leg_cbse_13_002 for Constitutional/statutory mapping and.',
          misconception: 'Students believe "critical analysis" means listing *both sides* of an argument (e.g., "CLPRA exception helps poor.',
          parts: [
                { id: 'a', prompt: 'State the exact age thresholds for: (a) prohibition of employment in factories/mines/hazardous occupations under Article 24; (b) free and compulsory education.', answer: '(a) Under 14 years (Article 24)',
                  options: ['(a) Under 14 years (Article 24)', 'critical analysis', '18 for Art 24 or 14 for POCSO', '"critical analysis" means listing *both sides* of an argument (e'],
                  hint: 'If stuck, revisit c11_leg_cbse_13_002 for Constitutional/statutory mapping and c11_leg_cbse_13_003.',
                  misconception: 'Students believe "critical analysis" means listing *both sides* of an argument (e.g., "CLPRA exception helps poor families vs.' },
                { id: 'b', prompt: 'Compare the "best interests of the child" standard in: (a) UNCRC Article 3; (b) JJ Act 2015 Section 2(9) and 14; (c) Guardians and Wards Act 1890 Section 17.', answer: 'UNCRC Article 3; (',
                  options: ['UNCRC Article 3; (', 'critical analysis', '"critical analysis" means listing *both sides* of an argument (e'],
                  hint: 'If stuck, revisit c11_leg_cbse_13_002 for Constitutional/statutory mapping and c11_leg_cbse_13_003.',
                  misconception: 'Students believe "critical analysis" means listing *both sides* of an argument (e.g., "CLPRA exception helps poor families vs.' }
          ],
            remediations: { 'critical-analysis-means-listing-both': { steps: ['If a student writes a "both sides" answer: (1) Ask: "Which provision is *justiciable* (Art 21A) and which.', '(2) Give a mini-case: "13-year-old in home-based zari work, 10 hrs/day.', 'CLPRA Sec 3(2) exception applies.', 'Does Art 24 protect her?" — makes them apply the *hazardous process* test (zari is notified hazardous).'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
