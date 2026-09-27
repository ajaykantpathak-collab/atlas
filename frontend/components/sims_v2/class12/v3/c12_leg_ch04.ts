import type { SimDef } from '../../engine/types';

/** v3 generated — c12_leg_ch04 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_leg_ch04: SimDef = {
    id: 'v3_c12_leg_ch04',
    title: 'Law of Torts',
    subtitle: 'This node covers: meaning and definition of tort, sources of tort law (common law.',
    classLevel: 12, subject: 'leg', topic: 'Law of Torts',
    chapters: ['c12_leg_ch04'],
    nodeIds: ['c12_leg_cbse_04_001', 'c12_leg_cbse_04_002', 'c12_leg_cbse_04_003', 'c12_leg_cbse_04_004', 'c12_leg_cbse_04_005', 'c12_leg_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Imagine your neighbour\'s tree branch falls on your parked car during a storm — who pays?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A factory stores large quantities of chlorine gas for industrial use. A leak occurs due to an unforeseeable earthquake, harming nearby residents.',
        options: ['Under *strict liability* (Rylands v Fletcher), \'Act of God\' is a valid defence', 'both allow Act of God defence', 'tort = negligence only'],
        answer: 'Under *strict liability* (Rylands v Fletcher), \'Act of God\' is a valid defence',
        hook: 'Students often think "tort = negligence only" — they forget *intentional torts* (assault, battery, false imprisonment.',
    },
    teaching: [
        { title: 'Law of Torts — Key Concepts and Institutions', text: 'Law of Torts is a branch of civil law that addresses civil wrongs (other than breach of contract or breach of trust) causing harm or injury to another, for which the remedy is an action for.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_leg_cbse_04_001', title: 'Law of Torts — Key Concepts and Institutions',
          caseStudy: { intro: 'Imagine your neighbour\'s tree branch falls on your parked car during a storm — who pays?',
            decisions: [{ prompt: 'Define \'unliquidated damages\' and explain why they are the hallmark remedy in tort law but not in breach of contract.', options: [
                { text: 'Unliquidated damages are compensation amounts that cannot be predetermined by a fixed', outcome: 'Unliquidated damages are compensation amounts that cannot be predetermined by a fixed formula and.' },
                { text: 'unliquidated means unpaid', outcome: 'Not quite — Students often think "tort = negligence only" — they forget *intentional torts* (assault, battery.', reveals: 'tort-negligence-only-they-forget' },
                { text: 'tort = negligence only', outcome: 'Not quite — Students often think "tort = negligence only" — they forget *intentional torts* (assault, battery.', reveals: 'tort-negligence-only-they-forget' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_04_002', title: 'Law of Torts — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with a relatable scenario: "Your neighbor\'s construction vibrations crack your wall. You want compensation.',
            decisions: [{ prompt: 'A student claims: "Tort law in India is entirely judge-made Common Law because Parliament never passed a \'Law of Torts Act\'." Is this.', options: [
                { text: '**No.** While tort law originated in Common Law (judicial precedents), Parliament has', outcome: '**No.** While tort law originated in Common Law (judicial precedents), Parliament has enacted.' },
                { text: 'tort law is *only* Common Law, missing the statutory layer', outcome: 'Not quite — **"Tort law in India is purely Common Law because there\'s no \'Torts Act\'."** Students see "Common.', reveals: 'tort-law-in-india-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_04_003', title: 'Law of Torts — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with a real question: "If a factory leaks toxic gas and kills thousands, can the owners escape liability by saying \'we took all precautions\'?" This hooks.',
            decisions: [{ prompt: 'State the three fundamental elements of a tort as defined in the NCERT textbook.', options: [
                { text: 'The three fundamental elements are: (1) Wrongful act, (2) Damage, (3) Remedy', outcome: 'The three fundamental elements are: (1) Wrongful act, (2) Damage, (3) Remedy.' },
                { text: '\'mens rea\' or \'contract\'', outcome: 'Not quite — Students often believe \'strict liability\' and \'absolute liability\' are the same because both are.', reveals: 'strict-liability-and-absolute-liability' },
                { text: '\'strict liability\' and \'absolute liability\' are the same', outcome: 'Not quite — Students often believe \'strict liability\' and \'absolute liability\' are the same because both are.', reveals: 'strict-liability-and-absolute-liability' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_04_004', title: 'Law of Torts — Processes and Procedures',
          caseStudy: { intro: 'Start with a real scenario: "Your neighbour\'s construction vibrations crack your wall. You want ₹5 lakh compensation. Where do you file?',
            decisions: [{ prompt: 'What is the period of limitation for filing a suit for damages in tort (e.g., negligence, nuisance) under the Limitation Act, 1963, and.', options: [
                { text: 'The limitation period is **3 years** from the date when the cause of action accrues', outcome: 'The limitation period is **3 years** from the date when the cause of action accrues (i.e., when the.' },
                { text: '12 years', outcome: 'Not quite — Students believe **"filing the suit = starting the case"**, but the case only *proceeds* after.', reveals: 'filing-the-suit-starting-the' },
                { text: 'from date of knowledge only', outcome: 'Not quite — Students believe **"filing the suit = starting the case"**, but the case only *proceeds* after.', reveals: 'filing-the-suit-starting-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_04_005', title: 'Law of Torts — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'Start with a relatable scenario: *"Your neighbour\'s drone crashes into your balcony, destroying your laptop.',
            decisions: [{ prompt: 'Define \'unliquidated damages\' in the context of tort law and explain why they are the standard remedy in tort but not in breach of contract.', options: [
                { text: 'Unliquidated damages are compensation amounts not predetermined by a formula or contract,', outcome: 'Unliquidated damages are compensation amounts not predetermined by a formula or contract, but.' },
                { text: 'unliquidated means small damages', outcome: 'Not quite — **Misconception:** "Assault requires physical contact; battery is just a threat." **Reality:**.', reveals: 'misconception-assault-requires-physical-contact' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_04_003', title: 'Law of Torts — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with a real question: "If a factory leaks toxic gas and kills thousands, can the owners escape liability by saying \'we took all precautions\'?" This hooks.',
            decisions: [{ prompt: 'State the three fundamental elements of a tort as defined in the NCERT textbook.', options: [
                { text: 'The three fundamental elements are: (1) Wrongful act, (2) Damage, (3) Remedy', outcome: 'The three fundamental elements are: (1) Wrongful act, (2) Damage, (3) Remedy.' },
                { text: '\'mens rea\' or \'contract\'', outcome: 'Not quite — Students often believe \'strict liability\' and \'absolute liability\' are the same because both are.', reveals: 'strict-liability-and-absolute-liability' },
                { text: '\'strict liability\' and \'absolute liability\' are the same', outcome: 'Not quite — Students often believe \'strict liability\' and \'absolute liability\' are the same because both are.', reveals: 'strict-liability-and-absolute-liability' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_leg_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'Law of Torts', spots: [
            { id: 's1', label: 'Law of Torts Key Concepts and Institutions', prompt: 'Which idea is this? — Law of Torts is a branch of civil law that addresses civil wrongs (other than breach.', answer: 'Law of Torts Key Concepts and Institutions', options: ['Law of Torts Key Concepts and Institutions', 'Law of Torts Constitutional and Legal Provisions', 'Law of Torts Landmark Cases and Illustrations', 'Law of Torts Processes and Procedures'] },
            { id: 's2', label: 'Law of Torts Constitutional and Legal Provisions', prompt: 'Which idea is this? — Law of Torts — Constitutional and Legal Provisions refers to the framework identifying.', answer: 'Law of Torts Constitutional and Legal Provisions', options: ['Law of Torts Constitutional and Legal Provisions', 'Law of Torts Key Concepts and Institutions', 'Law of Torts Landmark Cases and Illustrations', 'Law of Torts Processes and Procedures'] },
            { id: 's3', label: 'Law of Torts Landmark Cases and Illustrations', prompt: 'Which idea is this? — Law of Torts is a branch of civil law that deals with civil wrongs (other than breach.', answer: 'Law of Torts Landmark Cases and Illustrations', options: ['Law of Torts Landmark Cases and Illustrations', 'Law of Torts Key Concepts and Institutions', 'Law of Torts Constitutional and Legal Provisions', 'Law of Torts Processes and Procedures'] },
            { id: 's4', label: 'Law of Torts Processes and Procedures', prompt: 'Which idea is this? — Law of Torts — Processes and Procedures refers to the step-by-step legal machinery.', answer: 'Law of Torts Processes and Procedures', options: ['Law of Torts Processes and Procedures', 'Law of Torts Key Concepts and Institutions', 'Law of Torts Constitutional and Legal Provisions', 'Law of Torts Landmark Cases and Illustrations'] },
            { id: 's5', label: 'Law of Torts Exam-Oriented Questions and Answers', prompt: 'Which idea is this? — The Law of Torts is a branch of civil law that provides remedies (primarily unliquidated.', answer: 'Law of Torts Exam-Oriented Questions and Answers', options: ['Law of Torts Exam-Oriented Questions and Answers', 'Law of Torts Key Concepts and Institutions', 'Law of Torts Constitutional and Legal Provisions', 'Law of Torts Landmark Cases and Illustrations'] },
            { id: 's6', label: 'Law of Torts Critical Analysis and Application', prompt: 'Which idea is this? — Law of Torts is a branch of civil law that addresses wrongful acts (intentional.', answer: 'Law of Torts Critical Analysis and Application', options: ['Law of Torts Critical Analysis and Application', 'Law of Torts Key Concepts and Institutions', 'Law of Torts Constitutional and Legal Provisions', 'Law of Torts Landmark Cases and Illustrations'] }
          ] } },
        { type: 'case', nodeId: 'c12_leg_cbse_04_006', title: 'You made it',
          caseStudy: { intro: 'You finished Law of Torts — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_leg_cbse_04_001', difficulty: 'standard',
          question: 'Law of Torts is a branch of civil law that addresses civil wrongs (other than.',
          hint: 'If confused about \'civil wrong\', revisit c11_leg_cbse_07_001 (Classification of Laws).',
          misconception: 'Students often think "tort = negligence only" — they forget *intentional torts* (assault, battery, false imprisonment.',
          parts: [
                { id: 'a', prompt: 'A factory stores large quantities of chlorine gas for industrial use. A leak occurs due to an unforeseeable earthquake, harming nearby residents.', answer: 'Under *strict liability* (Rylands v Fletcher), \'Act of God\' is a valid defence',
                  options: ['Under *strict liability* (Rylands v Fletcher), \'Act of God\' is a valid defence', 'both allow Act of God defence', 'tort = negligence only'],
                  hint: 'If confused about \'civil wrong\', revisit c11_leg_cbse_07_001 (Classification of Laws) — focus.',
                  misconception: 'Students often think "tort = negligence only" — they forget *intentional torts* (assault, battery, false imprisonment, trespass.' },
                { id: 'b', prompt: 'Ramesh publishes a blog post falsely accusing his colleague Suresh of embezzlement. Suresh sues for defamation.', answer: 'the type of tort, (',
                  options: ['the type of tort, (', 'slander because it\'s online', 'tort = negligence only'],
                  hint: 'If confused about \'civil wrong\', revisit c11_leg_cbse_07_001 (Classification of Laws) — focus.',
                  misconception: 'Students often think "tort = negligence only" — they forget *intentional torts* (assault, battery, false imprisonment, trespass.' },
                { id: 'c', prompt: 'Compare the \'duty of care\' in Donoghue v Stevenson (manufacturer to consumer) with the \'duty of care\' in a doctor-patient relationship.', answer: 'In Donoghue v Stevenson, Lord Atkin\'s \'neighbour principle\' established that a',
                  options: ['In Donoghue v Stevenson, Lord Atkin\'s \'neighbour principle\' established that a', 'doctor\'s duty is contractual only', 'tort = negligence only'],
                  hint: 'If confused about \'civil wrong\', revisit c11_leg_cbse_07_001 (Classification of Laws) — focus.',
                  misconception: 'Students often think "tort = negligence only" — they forget *intentional torts* (assault, battery, false imprisonment, trespass.' }
          ],
            remediations: { 'tort-negligence-only-they-forget': { steps: ['If a student misclassifies tort types: (1) Give a 3-column table: Intentional / Negligence / Strict-Absolute — with.', '(2) Assign 5 mini-facts (e.g., "A throws stone at B", "A\'s dog bites B", "A\'s chemical tank leaks") — ask to classify.', '(3) Revisit *Rylands v Fletcher* (escape + non-natural use) vs *M.C.', 'Mehta* (enterprise + hazardous activity + no escape needed).'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_04_002', difficulty: 'standard',
          question: 'Law of Torts — Constitutional and Legal Provisions refers to the framework.',
          hint: 'If stuck, review "Sources of Law of Torts" in c12_leg_cbse_04_001 and "Article 21 & 32".',
          misconception: '**"Tort law in India is purely Common Law because there\'s no \'Torts Act\'."** Students see "Common Law" in the textbook.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Law of Torts — Constitutional and Legal Provisions refers to the framework identifying',
                  options: ['Law of Torts — Constitutional and Legal Provisions refers to the framework identifying', 'Law of Torts is a branch of civil law that addresses civil wrongs (other than breach of', 'Law of Torts is a branch of civil law that deals with civil wrongs (other than breach of', 'Law of Torts — Processes and Procedures refers to the step-by-step legal machinery through'],
                  hint: 'If stuck, review "Sources of Law of Torts" in c12_leg_cbse_04_001 and "Article 21 & 32".',
                  misconception: '**"Tort law in India is purely Common Law because there\'s no \'Torts Act\'."** Students see "Common Law" in the textbook and equate it with.' }
          ],
            remediations: { 'tort-law-in-india-is': { steps: ['If the student holds this misconception: 1.', '**Re-visit c12_leg_cbse_04_001 (Key Concepts)** — review the "Sources of Law of Torts" section: explicitly list the.', '**Do a mapping exercise:** Take 5 scenarios (road accident, defective phone, river pollution, custodial death, medical.', 'For each, write: (a) Common Law route, (b) Applicable Statute, (c) Constitutional route (if State involved).'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_04_003', difficulty: 'standard',
          question: 'Law of Torts is a branch of civil law that deals with civil wrongs (other than.',
          hint: 'If stuck, revisit the \'B. Kinds of Wrongful Acts\' section in NCERT Chapter 3(B) (pp.',
          misconception: 'Students often believe \'strict liability\' and \'absolute liability\' are the same because both are \'no-fault\'.',
          parts: [
                { id: 'a', prompt: 'State the three fundamental elements of a tort as defined in the NCERT textbook.', answer: 'The three fundamental elements are: (1) Wrongful act, (2) Damage, (3) Remedy',
                  options: ['The three fundamental elements are: (1) Wrongful act, (2) Damage, (3) Remedy', '\'mens rea\' or \'contract\'', '\'strict liability\' and \'absolute liability\' are the same'],
                  hint: 'If stuck, revisit the \'B. Kinds of Wrongful Acts\' section in NCERT Chapter 3(B) (pp.',
                  misconception: 'Students often believe \'strict liability\' and \'absolute liability\' are the same because both are \'no-fault\'.' },
                { id: 'b', prompt: 'A chemical factory stores large quantities of toxic gas in a densely populated area.', answer: 'strict liability and (',
                  options: ['strict liability and (', 'strict liability has no exceptions', '\'strict liability\' and \'absolute liability\' are the same'],
                  hint: 'If stuck, revisit the \'B. Kinds of Wrongful Acts\' section in NCERT Chapter 3(B) (pp.',
                  misconception: 'Students often believe \'strict liability\' and \'absolute liability\' are the same because both are \'no-fault\'.' }
          ],
            remediations: { 'strict-liability-and-absolute-liability': { steps: ['Re-read the \'Differences Between Strict Liability and Absolute Liability\' table in NCERT (p.', 'Create a two-column flashcard: Column A = Rylands v Fletcher principles + 5 exceptions; Column B = M.C.', 'Practice writing the distinction in 80 words (board exam pattern) using keywords: \'enterprise vs person\', \'escape.', 'Re-attempt Diagnostic Q3 and Q6 — if still wrong, revisit c12_leg_cbse_04_001 (Key Concepts) for \'no-fault liability\'.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_04_004', difficulty: 'standard',
          question: 'Law of Torts — Processes and Procedures refers to the step-by-step legal.',
          hint: 'If stuck on jurisdiction/limitation: Review CPC Sections 9, 15-20 (jurisdiction) and.',
          misconception: 'Students believe **"filing the suit = starting the case"**, but the case only *proceeds* after **service of summons**.',
          parts: [
                { id: 'a', prompt: 'In a nuisance suit, the plaintiff fears the defendant will demolish the disputed structure before judgment.', answer: '**Order XXXIX Rule 1 & 2 CPC** (temporary injunction)',
                  options: ['**Order XXXIX Rule 1 & 2 CPC** (temporary injunction)', 'Section 9 CPC', 'Article 226', 'filing the suit = starting the case'],
                  hint: 'If stuck on jurisdiction/limitation: Review CPC Sections 9, 15-20 (jurisdiction) and Limitation Act.',
                  misconception: 'Students believe **"filing the suit = starting the case"**, but the case only *proceeds* after **service of summons** (Order V CPC).' }
          ],
            remediations: { 'filing-the-suit-starting-the': { steps: ['Revisit **c12_leg_cbse_04_001** (Key Concepts) to refresh tort categories — you can\'t choose procedure without knowing.', 'Re-read **Order V, VII, XXXIX, XXI CPC** bare act sections — make a one-page flowchart: *Filing → Service → Written.', 'Practice **drafting one plaint + one IA for interim injunction** for a hypothetical nuisance case (use NCERT.', 'Re-diagnostic: Take a fresh fact scenario (e.g., "medical negligence — 2 yr limitation?") and write the first 3.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"filing the suit = starting the case"**, but the case only *proceeds* after **service of summons**.',
          parts: [
                { id: 'a', prompt: 'A tort decree awards ₹10 lakh. The judgment debtor owns a car (₹8 lakh) and a bank FD (₹5 lakh). The decree holder files execution petition.', answer: 'Attach the **bank FD first**',
                  options: ['Attach the **bank FD first**', 'filing the suit = starting the case'],
                  hint: 'If stuck on jurisdiction/limitation: Review CPC Sections 9, 15-20 (jurisdiction) and Limitation Act.',
                  misconception: 'Students believe **"filing the suit = starting the case"**, but the case only *proceeds* after **service of summons** (Order V CPC).' }
          ],
            remediations: { 'filing-the-suit-starting-the': { steps: ['Revisit **c12_leg_cbse_04_001** (Key Concepts) to refresh tort categories — you can\'t choose procedure without knowing.', 'Re-read **Order V, VII, XXXIX, XXI CPC** bare act sections — make a one-page flowchart: *Filing → Service → Written.', 'Practice **drafting one plaint + one IA for interim injunction** for a hypothetical nuisance case (use NCERT.', 'Re-diagnostic: Take a fresh fact scenario (e.g., "medical negligence — 2 yr limitation?") and write the first 3.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_04_005', difficulty: 'standard',
          question: 'The Law of Torts is a branch of civil law that provides remedies (primarily.',
          hint: 'Revisit c12_leg_cbse_04_003 (Landmark Cases) — specifically the *Donoghue*, *Rylands*.',
          misconception: '**Misconception:** "Assault requires physical contact; battery is just a threat." **Reality:** It is the **exact.',
          parts: [
                { id: 'a', prompt: 'Apply the three-step *Donoghue v Stevenson* \'neighbour principle\' test to this fact pattern: A software company releases a health-app that miscalculates.', answer: '**Yes, duty exists.** Step 1 (Foreseeability): A reasonable software developer',
                  options: ['**Yes, duty exists.** Step 1 (Foreseeability): A reasonable software developer', 'no contract = no duty'],
                  hint: 'Revisit c12_leg_cbse_04_003 (Landmark Cases) — specifically the *Donoghue*, *Rylands*, and *M.C.',
                  misconception: '**Misconception:** "Assault requires physical contact; battery is just a threat." **Reality:** It is the **exact opposite**.' }
          ],
            remediations: { 'misconception-assault-requires-physical-contact': { steps: ['**Re-learn definitions physically:** Act out assault (raise hand, stop 1 inch from face) vs battery (tap shoulder).', 'Say aloud: "Assault = fear of touch; Battery = touch." 2.', '**Make a 2x2 table:** Rows = Assault/Battery; Columns = Contact Required?', '**Re-do Diagnostic Q2 & Q4** — they test this exact distinction in applied form.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_04_006', difficulty: 'standard',
          question: 'Law of Torts is a branch of civil law that addresses wrongful acts.',
          hint: 'If stuck on negligence analysis: Re-read Donoghue v. Stevenson facts and the \'neighbour.',
          misconception: 'Students often believe \'malice\' or \'evil motive\' is required for intentional torts like battery or defamation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Law of Torts is a branch of civil law that addresses wrongful acts (intentional,',
                  options: ['Law of Torts is a branch of civil law that addresses wrongful acts (intentional,', 'Law of Torts is a branch of civil law that addresses civil wrongs (other than breach of', 'Law of Torts — Constitutional and Legal Provisions refers to the framework identifying', 'Law of Torts is a branch of civil law that deals with civil wrongs (other than breach of'],
                  hint: 'If stuck on negligence analysis: Re-read Donoghue v. Stevenson facts and the \'neighbour principle\'.',
                  misconception: 'Students often believe \'malice\' or \'evil motive\' is required for intentional torts like battery or defamation.' }
          ],
            remediations: { 'malice-or-evil-motive-is': { steps: ['Revisit c12_leg_cbse_04_001 (Key Concepts) to clarify: tort = civil wrong, not crime; remedy = unliquidated damages.', 'Revisit c12_leg_cbse_04_003 (Landmark Cases) to re-study Donoghue v.', 'Stevenson (neighbour principle), Rylands v.', 'Fletcher (strict liability elements), M.C.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
