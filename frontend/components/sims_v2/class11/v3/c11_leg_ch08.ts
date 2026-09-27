import type { SimDef } from '../../engine/types';

/** v3 generated — c11_leg_ch08 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_leg_ch08: SimDef = {
    id: 'v3_c11_leg_ch08',
    title: 'Sources of Laws',
    subtitle: 'This node covers the three primary sources of law (custom, judicial precedent.',
    classLevel: 11, subject: 'leg', topic: 'Sources of Laws',
    chapters: ['c11_leg_ch08'],
    nodeIds: ['c11_leg_cbse_08_001', 'c11_leg_cbse_08_002', 'c11_leg_cbse_08_003', 'c11_leg_cbse_08_004', 'c11_leg_cbse_08_005', 'c11_leg_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start by asking: "When the Supreme Court banned diesel cars older than 10 years in Delhi (2015), where did.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'What are the three major sources of law identified in modern legal systems according to the NCERT textbook?',
        options: ['The three major sources are Custom, Judicial Precedent, and Legislation', 'Constitution, Parliament, Courts', 'judicial precedent means judges make law like legislators'],
        answer: 'The three major sources are Custom, Judicial Precedent, and Legislation',
        hook: 'Students believe "judicial precedent means judges make law like legislators." They confuse the declaratory theory.',
    },
    teaching: [
        { title: 'Sources of Laws — Key Concepts and Institutions', text: 'Sources of law are the origins from which binding rules of human conduct derive their validity and authority, primarily comprising customs, judicial precedents, and legislation in modern legal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_leg_cbse_08_001', title: 'Sources of Laws — Key Concepts and Institutions',
          caseStudy: { intro: 'Start by asking: "When the Supreme Court banned diesel cars older than 10 years in Delhi (2015), where did that \'law\' come from?',
            decisions: [{ prompt: 'What are the three major sources of law identified in modern legal systems according to the NCERT textbook?', options: [
                { text: 'The three major sources are Custom, Judicial Precedent, and Legislation', outcome: 'The three major sources are Custom, Judicial Precedent, and Legislation.' },
                { text: 'Constitution, Parliament, Courts', outcome: 'Not quite — Students believe "judicial precedent means judges make law like legislators." They confuse the.', reveals: 'judicial-precedent-means-judges-make' },
                { text: 'judicial precedent means judges make law like legislators', outcome: 'Not quite — Students believe "judicial precedent means judges make law like legislators." They confuse the.', reveals: 'judicial-precedent-means-judges-make' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_08_002', title: 'Sources of Laws — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with a real question: "If Parliament passes a law banning a centuries-old community marriage ritual, but the community claims it\'s their valid custom.',
            decisions: [{ prompt: 'What are the three main sources of law identified in modern legal systems, and which one is considered the most important in contemporary.', options: [
                { text: 'The three main sources are custom, judicial precedent, and legislation', outcome: 'The three main sources are custom, judicial precedent, and legislation.' },
                { text: 'custom is most important', outcome: 'Not quite — Students believe "custom is a source of law" means *any* long-standing practice becomes law.', reveals: 'custom-is-a-source-of' },
                { text: 'custom is a source of law', outcome: 'Not quite — Students believe "custom is a source of law" means *any* long-standing practice becomes law.', reveals: 'custom-is-a-source-of' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_08_006', title: 'Sources of Laws — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a real dilemma: "A Khap Panchayat in Haryana orders the expulsion of a couple who married within the same gotra, claiming it violates an ancient.',
            decisions: [{ prompt: 'State the five essential tests a custom must satisfy to be recognized as a valid source of law in India, as per the NCERT textbook.', options: [
                { text: 'The five tests are: (1) Antiquity', outcome: 'The five tests are: (1) Antiquity — practice since time immemorial (no fixed date like 1189.' },
                { text: 'only 3 tests or confusing with English law\'s 1189 cutoff', outcome: 'Not quite — Students believe the hierarchy of sources is rigid and static: Constitution > Legislation >.', reveals: 'the-hierarchy-of-sources-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_08_006', title: 'Sources of Laws — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a real dilemma: "A Khap Panchayat in Haryana orders the expulsion of a couple who married within the same gotra, claiming it violates an ancient.',
            decisions: [{ prompt: 'State the five essential tests a custom must satisfy to be recognized as a valid source of law in India, as per the NCERT textbook.', options: [
                { text: 'The five tests are: (1) Antiquity', outcome: 'The five tests are: (1) Antiquity — practice since time immemorial (no fixed date like 1189.' },
                { text: 'only 3 tests or confusing with English law\'s 1189 cutoff', outcome: 'Not quite — Students believe the hierarchy of sources is rigid and static: Constitution > Legislation >.', reveals: 'the-hierarchy-of-sources-is' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_leg_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'Sources of Laws', spots: [
            { id: 's1', label: 'Sources of Laws Key Concepts and Institutions', prompt: 'Which idea is this? — Sources of law are the origins from which binding rules of human conduct derive their.', answer: 'Sources of Laws Key Concepts and Institutions', options: ['Sources of Laws Key Concepts and Institutions', 'Sources of Laws Constitutional and Legal Provisions', 'Sources of Laws Landmark Cases and Illustrations', 'Sources of Laws Processes and Procedures'] },
            { id: 's2', label: 'Sources of Laws Constitutional and Legal Provisions', prompt: 'Which idea is this? — Sources of law are the origins from which binding rules of human conduct derive their.', answer: 'Sources of Laws Constitutional and Legal Provisions', options: ['Sources of Laws Constitutional and Legal Provisions', 'Sources of Laws Key Concepts and Institutions', 'Sources of Laws Landmark Cases and Illustrations', 'Sources of Laws Processes and Procedures'] },
            { id: 's3', label: 'Sources of Laws Landmark Cases and Illustrations', prompt: 'Which idea is this? — Sources of law are the origins or foundations from which legal rules derive their.', answer: 'Sources of Laws Landmark Cases and Illustrations', options: ['Sources of Laws Landmark Cases and Illustrations', 'Sources of Laws Key Concepts and Institutions', 'Sources of Laws Constitutional and Legal Provisions', 'Sources of Laws Processes and Procedures'] },
            { id: 's4', label: 'Sources of Laws Processes and Procedures', prompt: 'Which idea is this? — Sources of Law are the formal origins from which binding rules of human conduct derive.', answer: 'Sources of Laws Processes and Procedures', options: ['Sources of Laws Processes and Procedures', 'Sources of Laws Key Concepts and Institutions', 'Sources of Laws Constitutional and Legal Provisions', 'Sources of Laws Landmark Cases and Illustrations'] },
            { id: 's5', label: 'Sources of Laws Exam-Oriented Questions and Answers', prompt: 'Which idea is this? — Sources of laws refer to the origins or foundations from which legal rules derive their.', answer: 'Sources of Laws Exam-Oriented Questions and Answers', options: ['Sources of Laws Exam-Oriented Questions and Answers', 'Sources of Laws Key Concepts and Institutions', 'Sources of Laws Constitutional and Legal Provisions', 'Sources of Laws Landmark Cases and Illustrations'] },
            { id: 's6', label: 'Sources of Laws Critical Analysis and Application', prompt: 'Which idea is this? — Critical Analysis and Application of Sources of Law involves evaluating the interplay.', answer: 'Sources of Laws Critical Analysis and Application', options: ['Sources of Laws Critical Analysis and Application', 'Sources of Laws Key Concepts and Institutions', 'Sources of Laws Constitutional and Legal Provisions', 'Sources of Laws Landmark Cases and Illustrations'] }
          ] } },
        { type: 'case', nodeId: 'c11_leg_cbse_08_006', title: 'You made it',
          caseStudy: { intro: 'You finished Sources of Laws — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_leg_cbse_08_001', difficulty: 'standard',
          question: 'Sources of law are the origins from which binding rules of human conduct derive.',
          hint: 'Review Chapter 1 (Concept of State) and Chapter 2 (Forms and Organs of Government).',
          misconception: 'Students believe "judicial precedent means judges make law like legislators." They confuse the declaratory theory.',
          parts: [
                { id: 'a', prompt: 'What are the three major sources of law identified in modern legal systems according to the NCERT textbook?', answer: 'The three major sources are Custom, Judicial Precedent, and Legislation',
                  options: ['The three major sources are Custom, Judicial Precedent, and Legislation', 'Constitution, Parliament, Courts', 'judicial precedent means judges make law like legislators', 'do judges make law?'],
                  hint: 'Review Chapter 1 (Concept of State) and Chapter 2 (Forms and Organs of Government) — specifically.',
                  misconception: 'Students believe "judicial precedent means judges make law like legislators." They confuse the declaratory theory (judges find law) with.' },
                { id: 'b', prompt: 'Explain why a custom must satisfy the test of "reasonableness" to be recognized as law, using the Bombay High Court example from the textbook.', answer: 'A custom must conform to norms of justice and public utility',
                  options: ['A custom must conform to norms of justice and public utility', 'antiquity', 'judicial precedent means judges make law like legislators', 'do judges make law?'],
                  hint: 'Review Chapter 1 (Concept of State) and Chapter 2 (Forms and Organs of Government) — specifically.',
                  misconception: 'Students believe "judicial precedent means judges make law like legislators." They confuse the declaratory theory (judges find law) with.' },
                { id: 'c', prompt: 'Compare the hierarchy of judicial precedent in India with the UK before 2009.', answer: 'In India, the Supreme Court is separate from Parliament and the executive',
                  options: ['In India, the Supreme Court is separate from Parliament and the executive', 'both have Supreme Courts', 'judicial precedent means judges make law like legislators', 'do judges make law?'],
                  hint: 'Review Chapter 1 (Concept of State) and Chapter 2 (Forms and Organs of Government) — specifically.',
                  misconception: 'Students believe "judicial precedent means judges make law like legislators." They confuse the declaratory theory (judges find law) with.' }
          ],
            remediations: { 'judicial-precedent-means-judges-make': { steps: ['Ask the student to re-read the "Do Judges Make Law?" section (textbook pp.', '89-90) and identify the two views (Coke/Hale vs Dicey/Gray/Salmond).', 'Have them write a 3-sentence distinction: "Legislature enacts law prospectively; judges declare law retrospectively.', 'Give the Maneka Gandhi case: the Court *interpreted* "procedure established by law" to include "fair, just, reasonable".'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "judicial precedent means judges make law like legislators." They confuse the declaratory theory.',
          parts: [
                { id: 'a', prompt: '"Delegated legislation is a necessary evil." Evaluate this statement with reference to the reasons for its growth and the safeguards in the Indian system.', answer: 'It is "necessary"',
                  options: ['It is "necessary"', 'judicial precedent means judges make law like legislators', 'do judges make law?', 'yes, they make law'],
                  hint: 'Review Chapter 1 (Concept of State) and Chapter 2 (Forms and Organs of Government) — specifically.',
                  misconception: 'Students believe "judicial precedent means judges make law like legislators." They confuse the declaratory theory (judges find law) with.' }
          ],
            remediations: { 'judicial-precedent-means-judges-make': { steps: ['Ask the student to re-read the "Do Judges Make Law?" section (textbook pp.', '89-90) and identify the two views (Coke/Hale vs Dicey/Gray/Salmond).', 'Have them write a 3-sentence distinction: "Legislature enacts law prospectively; judges declare law retrospectively.', 'Give the Maneka Gandhi case: the Court *interpreted* "procedure established by law" to include "fair, just, reasonable".'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_08_002', difficulty: 'standard',
          question: 'Sources of law are the origins from which binding rules of human conduct derive.',
          hint: 'If stuck, review "Separation of Powers" (Chapter 3, Unit 1) — specifically, the.',
          misconception: 'Students believe "custom is a source of law" means *any* long-standing practice becomes law.',
          parts: [
                { id: 'a', prompt: 'What are the three main sources of law identified in modern legal systems, and which one is considered the most important in contemporary India?', answer: 'The three main sources are custom, judicial precedent, and legislation',
                  options: ['The three main sources are custom, judicial precedent, and legislation', 'custom is most important', 'custom is a source of law', '"custom is a source of law" means *any* long-standing practice becomes law'],
                  hint: 'If stuck, review "Separation of Powers" (Chapter 3, Unit 1) — specifically, the legislative.',
                  misconception: 'Students believe "custom is a source of law" means *any* long-standing practice becomes law.' },
                { id: 'b', prompt: 'Explain why a custom allowing child marriage would NOT be recognised as a valid source of law in India today, even if practiced continuously for centuries.', answer: 'Such a custom fails the tests of reasonableness, morality, and consistency with',
                  options: ['Such a custom fails the tests of reasonableness, morality, and consistency with', 'it\'s valid because it\'s ancient', 'custom is a source of law', '"custom is a source of law" means *any* long-standing practice becomes law'],
                  hint: 'If stuck, review "Separation of Powers" (Chapter 3, Unit 1) — specifically, the legislative.',
                  misconception: 'Students believe "custom is a source of law" means *any* long-standing practice becomes law.' },
                { id: 'c', prompt: 'A District Court in Kerala is deciding a case on maintenance under Section 125 CrPC.', answer: 'The Supreme Court\'s 2015 decision binds the District Court',
                  options: ['The Supreme Court\'s 2015 decision binds the District Court', 'the newer High Court decision', 'custom is a source of law', '"custom is a source of law" means *any* long-standing practice becomes law'],
                  hint: 'If stuck, review "Separation of Powers" (Chapter 3, Unit 1) — specifically, the legislative.',
                  misconception: 'Students believe "custom is a source of law" means *any* long-standing practice becomes law.' }
          ],
            remediations: { 'custom-is-a-source-of': { steps: ['Re-teach the five tests of valid custom using a checklist: "Is it ancient?', 'Not against statute?" — apply to child marriage (fails morality/statute), sati (fails morality/statute), Saptapadi.', 'Contrast "custom as source" (historical) vs "custom as *recognised* source" (modern, court-filtered).', 'Use the tree analogy: custom is soil — necessary but not sufficient; legislation is the trunk that shapes the tree.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_08_003', difficulty: 'standard',
          question: 'Sources of law are the origins or foundations from which legal rules derive.',
          hint: 'If stuck, review the hierarchy of courts (Supreme Court > High Courts > District Courts).',
          misconception: 'Students often believe that judicial precedent means courts can freely create new laws like Parliament, citing cases.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sources of law are the origins or foundations from',
                  options: ['Sources of law are the origins or foundations from', 'Sources of law are the origins from', 'Sources of law are the origins from', 'Sources of Law are the formal origins from'],
                  hint: 'If stuck, review the hierarchy of courts (Supreme Court > High Courts > District Courts) and the.',
                  misconception: 'Students often believe that judicial precedent means courts can freely create new laws like Parliament, citing cases like Maneka Gandhi.' }
          ],
            remediations: { 'judicial-precedent-means-courts-can': { steps: ['To fix this, walk through Maneka Gandhi step-by-step: (1) The passport impoundment was under statutory power; (2) The.', 'Emphasize: courts fill gaps in rights using constitutional text, not personal views.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_08_004', difficulty: 'standard',
          question: 'Sources of Law are the formal origins from which binding rules of human conduct.',
          hint: 'If stuck, review **c11_leg_cbse_08_001 (Key Concepts)** for definitions.',
          misconception: '**Misconception:** "The Supreme Court is bound by its own previous decisions (Horizontal Stare Decisis) just like High.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sources of Law are the formal origins from',
                  options: ['Sources of Law are the formal origins from', 'Sources of law are the origins from', 'Sources of law are the origins from', 'Sources of law are the origins or foundations from'],
                  hint: 'If stuck, review **c11_leg_cbse_08_001 (Key Concepts)** for definitions.',
                  misconception: '**Misconception:** "The Supreme Court is bound by its own previous decisions (Horizontal Stare Decisis) just like High Courts are bound.' }
          ],
            remediations: { 'misconception-the-supreme-court-is': { steps: ['** Draw the **Hierarchy Pyramid** on paper: Constitution (Top) -> Supreme Court (Larger Bench > Smaller Bench) -> High.', '** Color-code: **Red Arrows (Down) = Binding (Vertical Stare Decisis).', '** Drill the rule: "Article 141 binds *all courts* to SC law. SC binds *itself* only via Bench Strength (Larger >.', '** Practice with *In Re: Presidential Reference (1999)*: 9-judge bench binds all smaller benches.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_08_005', difficulty: 'standard',
          question: 'Sources of laws refer to the origins or foundations from which legal rules.',
          hint: 'Review the legislative process in Parliament (c11_leg_cbse_08_002) and the hierarchy.',
          misconception: 'Students often believe that if a custom is ancient and widely followed, it automatically becomes law and cannot.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sources of laws refer to the origins or foundations from',
                  options: ['Sources of laws refer to the origins or foundations from', 'Sources of law are the origins from', 'Sources of law are the origins from', 'Sources of law are the origins or foundations from'],
                  hint: 'Review the legislative process in Parliament (c11_leg_cbse_08_002) and the hierarchy of courts.',
                  misconception: 'Students often believe that if a custom is ancient and widely followed, it automatically becomes law and cannot be overridden.' }
          ],
            remediations: { 'if-a-custom-is-ancient': { steps: ['To fix this, guide the student to examine the essentials of a valid custom: ask, “Is this custom reasonable?', 'Does it violate public policy or a fundamental right?', 'Is it inconsistent with a valid law?” Use the example of sati—though ancient and widespread, it was abolished.', 'Emphasize that antiquity alone is insufficient; customs must align with justice and existing law to be recognized, and.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_08_006', difficulty: 'standard',
          question: 'Critical Analysis and Application of Sources of Law involves evaluating the.',
          hint: 'If stuck, review the *Vineeta Sharma v. Rakesh Sharma* (2020) case summary.',
          misconception: 'Students believe the hierarchy of sources is rigid and static: Constitution > Legislation > Precedent > Custom, like.',
          parts: [
                { id: 'a', prompt: 'State the five essential tests a custom must satisfy to be recognized as a valid source of law in India, as per the NCERT textbook.', answer: 'The five tests are: (1) Antiquity',
                  options: ['The five tests are: (1) Antiquity', 'only 3 tests or confusing with English law\'s 1189 cutoff'],
                  hint: 'If stuck, review the *Vineeta Sharma v. Rakesh Sharma* (2020) case summary in c11_leg_cbse_08_003.',
                  misconception: 'Students believe the hierarchy of sources is rigid and static: Constitution > Legislation > Precedent > Custom, like a fixed pyramid.' },
                { id: 'b', prompt: 'A State Legislature passes a law banning a specific tribal marriage ritual.', answer: 'Step 1: Identify sources',
                  options: ['Step 1: Identify sources', 'custom prevails because it\'s ancient', 'legislation always overrides custom'],
                  hint: 'If stuck, review the *Vineeta Sharma v. Rakesh Sharma* (2020) case summary in c11_leg_cbse_08_003.',
                  misconception: 'Students believe the hierarchy of sources is rigid and static: Constitution > Legislation > Precedent > Custom, like a fixed pyramid.' },
                { id: 'c', prompt: 'Compare the binding force of a Supreme Court judgment on: (a) a High Court within the same state, (b) a High Court of a different state, (c) a District Court.', answer: 'a High Court within the same state, (',
                  options: ['a High Court within the same state, (', 'High Court of another state is only persuasive'],
                  hint: 'If stuck, review the *Vineeta Sharma v. Rakesh Sharma* (2020) case summary in c11_leg_cbse_08_003.',
                  misconception: 'Students believe the hierarchy of sources is rigid and static: Constitution > Legislation > Precedent > Custom, like a fixed pyramid.' }
          ],
            remediations: { 'the-hierarchy-of-sources-is': { steps: ['If the student clings to the rigid pyramid: (1) Draw a 3-circle Venn diagram on board: Circle A = Custom, Circle.', 'Show overlaps: Custom ∩ Legislation = Saved Customs (HMA S.29); Legislation ∩ Constitution = Valid Statutes; Custom ∩.', 'The center (all three) = Custom validated by Statute under Constitution.', '(2) Give the *Madhu Kishwar* example: "The statute (HSA) had a \'savings clause\' (S.29) saying \'nothing in this Act.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
