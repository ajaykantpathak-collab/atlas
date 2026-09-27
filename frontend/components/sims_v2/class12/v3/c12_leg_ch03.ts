import type { SimDef } from '../../engine/types';

/** v3 generated — c12_leg_ch03 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_leg_ch03: SimDef = {
    id: 'v3_c12_leg_ch03',
    title: 'Law of Contract',
    subtitle: 'This node covers: formation of contract (offer, acceptance, consideration, capacity, free.',
    classLevel: 12, subject: 'leg', topic: 'Law of Contract',
    chapters: ['c12_leg_ch03'],
    nodeIds: ['c12_leg_cbse_03_001', 'c12_leg_cbse_03_002', 'c12_leg_cbse_03_003', 'c12_leg_cbse_03_004', 'c12_leg_cbse_03_005', 'c12_leg_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a relatable scenario: "You book a cab on an app — the driver accepts, you ride, you pay.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'What is the legal definition of a \'contract\' under the Indian Contract Act, 1872?',
        options: ['A contract is an agreement enforceable by law (Section 2(h), ICA)', 'a written document signed by two parties', 'Consideration must be adequate (fair market value) for a contract to be valid'],
        answer: 'A contract is an agreement enforceable by law (Section 2(h), ICA)',
        hook: '**"Consideration must be adequate (fair market value) for a contract to be valid."** Students often think if A sells.',
    },
    teaching: [
        { title: 'Law of Contract — Key Concepts and Institutions', text: 'A contract is an agreement enforceable by law, formed when a valid offer is accepted with free consent, lawful consideration, lawful object, by parties competent to contract, and not expressly.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_leg_cbse_03_001', title: 'Law of Contract — Key Concepts and Institutions',
          caseStudy: { intro: 'Start with a relatable scenario: "You book a cab on an app — the driver accepts, you ride, you pay. Was that a contract? Yes.',
            decisions: [{ prompt: 'What is the legal definition of a \'contract\' under the Indian Contract Act, 1872?', options: [
                { text: 'A contract is an agreement enforceable by law (Section 2(h), ICA)', outcome: 'A contract is an agreement enforceable by law (Section 2(h), ICA).' },
                { text: 'a written document signed by two parties', outcome: 'Not quite — **"Consideration must be adequate (fair market value) for a contract to be valid."** Students often.', reveals: 'consideration-must-be-adequate-fair' },
                { text: 'Consideration must be adequate (fair market value) for a contract to be valid', outcome: 'Not quite — **"Consideration must be adequate (fair market value) for a contract to be valid."** Students often.', reveals: 'consideration-must-be-adequate-fair' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_03_003', title: 'Law of Contract — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Imagine you run a small online bakery. A customer messages you on Instagram: "I\'ll buy 50 cupcakes for ₹5,000 if you deliver tomorrow." You reply "Done." Next.',
            decisions: [{ prompt: 'State the *ratio decidendi* (binding legal principle) of *Carlill v. Carbolic Smoke Ball Co.* (1893) regarding general offers.', options: [
                { text: '**Correct Answer:** An advertisement offering a reward to the world at large constitutes', outcome: '**Correct Answer:** An advertisement offering a reward to the world at large constitutes a valid.' },
                { text: 'advertisements are never offers', outcome: 'Not quite — **"All agreements are contracts if they have offer, acceptance, and consideration."** Students.', reveals: 'all-agreements-are-contracts-if' },
                { text: 'acceptance must be communicated', outcome: 'Not quite — **"All agreements are contracts if they have offer, acceptance, and consideration."** Students.', reveals: 'all-agreements-are-contracts-if' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_03_004', title: 'Law of Contract — Processes and Procedures',
          caseStudy: { intro: 'Imagine you order a custom cake online, pay ₹3,000, and the baker delivers a different flavour.',
            decisions: [{ prompt: 'State the exact legal distinction between a "void agreement" and a "voidable contract" under the Indian Contract Act, 1872, citing the.', options: [
                { text: 'A **void agreement** (Section 2(g)) is an agreement not enforceable by law from the very', outcome: 'A **void agreement** (Section 2(g)) is an agreement not enforceable by law from the very beginning.' },
                { text: 'both can be cancelled', outcome: 'Not quite — **"Void agreement" and "voidable contract" are used interchangeably.** Students write: "The.', reveals: 'void-agreement-and-voidable-contract' },
                { text: 'distinguish', outcome: 'Not quite — **"Void agreement" and "voidable contract" are used interchangeably.** Students write: "The.', reveals: 'void-agreement-and-voidable-contract' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_03_005', title: 'Law of Contract — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'You\'re buying a used phone online. The seller says "₹10,000, no returns." You click "Buy Now." Is this a contract?',
            decisions: [{ prompt: 'State the six essential elements of a valid contract under Section 10 of the Indian Contract Act, 1872.', options: [
                { text: 'The six elements are: (1) Offer and acceptance, (2) Intention to create legal relations,', outcome: 'The six elements are: (1) Offer and acceptance, (2) Intention to create legal relations, (3) Lawful.' },
                { text: 'intention to create legal relations', outcome: 'Not quite — Students think "breach of contract = contract becomes void." Wrong.', reveals: 'breach-of-contract-contract-becomes' },
                { text: 'writing', outcome: 'Not quite — Students think "breach of contract = contract becomes void." Wrong.', reveals: 'breach-of-contract-contract-becomes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_03_006', title: 'Law of Contract — Critical Analysis and Application',
          caseStudy: { intro: 'Imagine you order a custom-made lehenga for your sister\'s wedding, pay ₹50,000 advance, but the tailor delivers a completely different design two days before.',
            decisions: [{ prompt: 'State the exact legal distinction between a \'void agreement\' and a \'voidable contract\' under the Indian Contract Act, 1872, citing the.', options: [
                { text: 'A void agreement (Section 2(g)) is void ab initio', outcome: 'A void agreement (Section 2(g)) is void ab initio — never legally enforceable — while a voidable.' },
                { text: 'both can be cancelled', outcome: 'Not quite — Students often believe that **any breach of contract entitles the innocent party to claim all.', reveals: 'any-breach-of-contract-entitles' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_03_006', title: 'Law of Contract — Critical Analysis and Application',
          caseStudy: { intro: 'Imagine you order a custom-made lehenga for your sister\'s wedding, pay ₹50,000 advance, but the tailor delivers a completely different design two days before.',
            decisions: [{ prompt: 'State the exact legal distinction between a \'void agreement\' and a \'voidable contract\' under the Indian Contract Act, 1872, citing the.', options: [
                { text: 'A void agreement (Section 2(g)) is void ab initio', outcome: 'A void agreement (Section 2(g)) is void ab initio — never legally enforceable — while a voidable.' },
                { text: 'both can be cancelled', outcome: 'Not quite — Students often believe that **any breach of contract entitles the innocent party to claim all.', reveals: 'any-breach-of-contract-entitles' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_leg_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'Law of Contract', spots: [
            { id: 's1', label: 'Law of Contract Key Concepts and Institutions', prompt: 'Which idea is this? — A contract is an agreement enforceable by law, formed when a valid offer is accepted with.', answer: 'Law of Contract Key Concepts and Institutions', options: ['Law of Contract Key Concepts and Institutions', 'Law of Contract Constitutional and Legal Provisions', 'Law of Contract Landmark Cases and Illustrations', 'Law of Contract Processes and Procedures'] },
            { id: 's2', label: 'Law of Contract Constitutional and Legal Provisions', prompt: 'Which idea is this? — Constitutional and Legal Provisions governing the Law of Contract refer to the framework.', answer: 'Law of Contract Constitutional and Legal Provisions', options: ['Law of Contract Constitutional and Legal Provisions', 'Law of Contract Key Concepts and Institutions', 'Law of Contract Landmark Cases and Illustrations', 'Law of Contract Processes and Procedures'] },
            { id: 's3', label: 'Law of Contract Landmark Cases and Illustrations', prompt: 'Which idea is this? — Landmark cases in the Law of Contract are authoritative judicial decisions (primarily.', answer: 'Law of Contract Landmark Cases and Illustrations', options: ['Law of Contract Landmark Cases and Illustrations', 'Law of Contract Key Concepts and Institutions', 'Law of Contract Constitutional and Legal Provisions', 'Law of Contract Processes and Procedures'] },
            { id: 's4', label: 'Law of Contract Processes and Procedures', prompt: 'Which idea is this? — A contract is an agreement enforceable by law, formed when a valid offer is accepted with.', answer: 'Law of Contract Processes and Procedures', options: ['Law of Contract Processes and Procedures', 'Law of Contract Key Concepts and Institutions', 'Law of Contract Constitutional and Legal Provisions', 'Law of Contract Landmark Cases and Illustrations'] },
            { id: 's5', label: 'Law of Contract Exam-Oriented Questions and Answers', prompt: 'Which idea is this? — A contract is an agreement enforceable by law under Section 2(h) of the Indian Contract.', answer: 'Law of Contract Exam-Oriented Questions and Answers', options: ['Law of Contract Exam-Oriented Questions and Answers', 'Law of Contract Key Concepts and Institutions', 'Law of Contract Constitutional and Legal Provisions', 'Law of Contract Landmark Cases and Illustrations'] },
            { id: 's6', label: 'Law of Contract Critical Analysis and Application', prompt: 'Which idea is this? — A contract is an agreement enforceable by law, formed when a valid offer is accepted with.', answer: 'Law of Contract Critical Analysis and Application', options: ['Law of Contract Critical Analysis and Application', 'Law of Contract Key Concepts and Institutions', 'Law of Contract Constitutional and Legal Provisions', 'Law of Contract Landmark Cases and Illustrations'] }
          ] } },
        { type: 'case', nodeId: 'c12_leg_cbse_03_006', title: 'You made it',
          caseStudy: { intro: 'You finished Law of Contract — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_leg_cbse_03_001', difficulty: 'standard',
          question: 'A contract is an agreement enforceable by law, formed when a valid offer.',
          hint: 'If stuck, revisit Class 11 node c11_leg_cbse_08_001 (Sources of Laws) to recall how.',
          misconception: '**"Consideration must be adequate (fair market value) for a contract to be valid."** Students often think if A sells.',
          parts: [
                { id: 'a', prompt: 'What is the legal definition of a \'contract\' under the Indian Contract Act, 1872?', answer: 'A contract is an agreement enforceable by law (Section 2(h), ICA)',
                  options: ['A contract is an agreement enforceable by law (Section 2(h), ICA)', 'a written document signed by two parties', 'Consideration must be adequate (fair market value) for a contract to be valid', 'inadequate consideration'],
                  hint: 'If stuck, revisit Class 11 node c11_leg_cbse_08_001 (Sources of Laws) to recall how statutory.',
                  misconception: '**"Consideration must be adequate (fair market value) for a contract to be valid."** Students often think if A sells a car worth ₹5 lakh.' },
                { id: 'b', prompt: 'Explain why the agreement in *Balfour v. Balfour* (1919) was not a contract, even though there was offer, acceptance, and consideration.', answer: 'The court held there was no *intention to create legal relations*',
                  options: ['The court held there was no *intention to create legal relations*', 'because it was not in writing', 'because consideration was inadequate', 'intention to create legal relations'],
                  hint: 'If stuck, revisit Class 11 node c11_leg_cbse_08_001 (Sources of Laws) to recall how statutory.',
                  misconception: '**"Consideration must be adequate (fair market value) for a contract to be valid."** Students often think if A sells a car worth ₹5 lakh.' },
                { id: 'c', prompt: 'A (major) offers to sell his car to B (minor, age 17) for ₹50,000. B accepts and pays ₹50,000. A delivers the car.', answer: 'No, A is not correct',
                  options: ['No, A is not correct', 'contract is void so either party can cancel', 'Consideration must be adequate (fair market value) for a contract to be valid', 'inadequate consideration'],
                  hint: 'If stuck, revisit Class 11 node c11_leg_cbse_08_001 (Sources of Laws) to recall how statutory.',
                  misconception: '**"Consideration must be adequate (fair market value) for a contract to be valid."** Students often think if A sells a car worth ₹5 lakh.' }
          ],
            remediations: { 'consideration-must-be-adequate-fair': { steps: ['If the student holds the "adequate consideration" misconception: 1.', '**Re-read Section 25 ICA** (in textbook or bare act) — highlight "consideration need not be adequate." 2.', '**Work through Illustration 2** in NCERT (A promises son ₹1,000 out of love, registered — valid despite no "market".', '**Contrast with "real consideration"** — do Exercise Q1 (Ramesh/Suresh bike) step-by-step: identify consideration.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_03_002', difficulty: 'standard',
          question: 'Constitutional and Legal Provisions governing the Law of Contract refer to the.',
          hint: 'If stuck on "how can a private contract violate Article 14 (which binds State)?", review.',
          misconception: '**"The Indian Contract Act, 1872 is the \'Bible\' of contracts — if it says a contract is valid, courts cannot.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Constitutional and Legal Provisions governing the Law of Contract refer to the framework',
                  options: ['Constitutional and Legal Provisions governing the Law of Contract refer to the framework', 'A contract is an agreement enforceable by law, formed when a valid offer is accepted with', 'Landmark cases in the Law of Contract are authoritative judicial decisions (primarily', 'A contract is an agreement enforceable by law, formed when a valid offer is accepted with'],
                  hint: 'If stuck on "how can a private contract violate Article 14 (which binds State)?", review.',
                  misconception: '**"The Indian Contract Act, 1872 is the \'Bible\' of contracts — if it says a contract is valid, courts cannot interfere."** Students.' }
          ],
            remediations: { 'the-indian-contract-act': { steps: ['**Revisit c11_leg_cbse_03_002 (Separation of Powers – Constitutional Provisions)**: Re-learn how judicial review allows.', '**Re-read c12_leg_cbse_03_001 (Key Concepts)**: Focus on the definition of "public policy" in Section 23 ICA — now.', '**Do this re-diagnostic**: "A hospital makes patients sign: \'We are not liable for negligence.\' Is this enforceable?', 'Cite Article 21 + Section 23 ICA." If you cannot explain why it\'s void (right to health = Article 21; exemption from.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**"The Indian Contract Act, 1872 is the \'Bible\' of contracts — if it says a contract is valid, courts cannot.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Since the Indian Contract Act, 1872 is a pre-Constitution statute, it cannot be challenged for violating Fundamental Rights.', answer: '**The statement is constitutionally illiterate.** Step 1: Article 13(1)',
                  options: ['**The statement is constitutionally illiterate.** Step 1: Article 13(1)', 'updating'],
                  hint: 'If stuck on "how can a private contract violate Article 14 (which binds State)?", review.',
                  misconception: '**"The Indian Contract Act, 1872 is the \'Bible\' of contracts — if it says a contract is valid, courts cannot interfere."** Students.' }
          ],
            remediations: { 'the-indian-contract-act': { steps: ['**Revisit c11_leg_cbse_03_002 (Separation of Powers – Constitutional Provisions)**: Re-learn how judicial review allows.', '**Re-read c12_leg_cbse_03_001 (Key Concepts)**: Focus on the definition of "public policy" in Section 23 ICA — now.', '**Do this re-diagnostic**: "A hospital makes patients sign: \'We are not liable for negligence.\' Is this enforceable?', 'Cite Article 21 + Section 23 ICA." If you cannot explain why it\'s void (right to health = Article 21; exemption from.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_03_003', difficulty: 'standard',
          question: 'Landmark cases in the Law of Contract are authoritative judicial decisions.',
          hint: 'If stuck on case principles, return to **`c12_leg_cbse_03_001` (Key Concepts)** and map.',
          misconception: '**"All agreements are contracts if they have offer, acceptance, and consideration."** Students mechanically tick these.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Landmark cases in the Law of Contract are authoritative judicial decisions (primarily',
                  options: ['Landmark cases in the Law of Contract are authoritative judicial decisions (primarily', 'A contract is an agreement enforceable by law, formed when a valid offer is accepted with', 'Constitutional and Legal Provisions governing the Law of Contract refer to the framework', 'A contract is an agreement enforceable by law, formed when a valid offer is accepted with'],
                  hint: 'If stuck on case principles, return to **`c12_leg_cbse_03_001` (Key Concepts)** and map each case.',
                  misconception: '**"All agreements are contracts if they have offer, acceptance, and consideration."** Students mechanically tick these three boxes but.' }
          ],
            remediations: { 'all-agreements-are-contracts-if': { steps: ['**Revisit `c12_leg_cbse_03_001` (Key Concepts):** Re-read Sec 2(h), 10, 2(a), 2(b), 2(d) definitions.', 'Make a 6-column table: Element | Section | Landmark Case | Principle | Exception | Modern Application (e.g.', '**Re-do Diagnostic Q3 & Q4:** Write the *Instantaneous vs Postal Rule* flowchart.', 'Write the *Consideration Flowchart*: "At whose desire?'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_03_004', difficulty: 'standard',
          question: 'A contract is an agreement enforceable by law, formed when a valid offer.',
          hint: 'If stuck on formation, revisit **c12_leg_cbse_03_001 (Key Concepts)** — specifically the.',
          misconception: '**"Void agreement" and "voidable contract" are used interchangeably.** Students write: "The contract is void because.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast "contingent contract" (Section 31) and "wagering agreement" (Section 30) on: (a) enforceability, (b) role of the uncertain event, (c).', answer: '| Basis | Contingent Contract (Sec 31) | Wagering Agreement (Sec 30) |',
                  options: ['| Basis | Contingent Contract (Sec 31) | Wagering Agreement (Sec 30) |', 'both are void', 'both depend on future event', 'distinguish'],
                  hint: 'If stuck on formation, revisit **c12_leg_cbse_03_001 (Key Concepts)** — specifically the.',
                  misconception: '**"Void agreement" and "voidable contract" are used interchangeably.** Students write: "The contract is void because consent was obtained.' }
          ],
            remediations: { 'void-agreement-and-voidable-contract': { steps: ['**Re-read Sections 2(g), 2(h), 2(i), 2(j), 10, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31** of the Indian.', '**Make a 4-column table**: Column 1 = Category (Void/Voidable/Illegal/Unenforceable); Column 2 = Section; Column 3.', 'Fill from memory, then check against bare Act.', '**Solve 3 fact patterns** from c12_leg_cbse_03_005 (Exam-Oriented Questions) where you must classify the agreement and.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_03_005', difficulty: 'standard',
          question: 'A contract is an agreement enforceable by law under Section 2(h) of the Indian.',
          hint: 'If confused between void and voidable, revisit the comparison table in NCERT Chapter 3(A).',
          misconception: 'Students think "breach of contract = contract becomes void." Wrong.',
          parts: [
                { id: 'a', prompt: 'Explain why an agreement to sell a car for ₹1 is a valid contract, but an agreement to sell a car for "natural love and affection" without writing and.', answer: 'Consideration need not be adequate but must be real (Section 25, Explanation 2)',
                  options: ['Consideration need not be adequate but must be real (Section 25, Explanation 2)', 'inadequate consideration makes contract void', 'breach of contract = contract becomes void', 'discharge by breach'],
                  hint: 'If confused between void and voidable, revisit the comparison table in NCERT Chapter 3(A) page 57.',
                  misconception: 'Students think "breach of contract = contract becomes void." Wrong.' },
                { id: 'b', prompt: 'A minor, aged 17, buys a laptop on credit for ₹50,000, pays ₹10,000, then refuses to pay the balance. The seller sues. Decide the case with legal reasoning.', answer: 'Minor\'s agreement is void ab initio (Mohori Bibee v',
                  options: ['Minor\'s agreement is void ab initio (Mohori Bibee v', 'minor is liable for necessaries', 'breach of contract = contract becomes void', 'discharge by breach'],
                  hint: 'If confused between void and voidable, revisit the comparison table in NCERT Chapter 3(A) page 57.',
                  misconception: 'Students think "breach of contract = contract becomes void." Wrong.' }
          ],
            remediations: { 'breach-of-contract-contract-becomes': { steps: ['Re-read Section 39 (anticipatory breach) vs Section 73 (actual breach) in NCERT Chapter 3(A).', 'Draw a timeline: Contract formed → Performance due → Breach occurs → Remedies available.', 'Practice: "X contracts to sell 50 bags cement to Y.', 'Y accepts 40, sues for 10.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_03_006', difficulty: 'standard',
          question: 'A contract is an agreement enforceable by law, formed when a valid offer.',
          hint: 'If stuck, review the "Formation of Contract" and "Capacity to Contract" sections.',
          misconception: 'Students often believe that **any breach of contract entitles the innocent party to claim all losses they suffered**.',
          parts: [
                { id: 'a', prompt: 'State the exact legal distinction between a \'void agreement\' and a \'voidable contract\' under the Indian Contract Act, 1872, citing the relevant sections.', answer: 'A void agreement (Section 2(g)) is void ab initio',
                  options: ['A void agreement (Section 2(g)) is void ab initio', 'both can be cancelled'],
                  hint: 'If stuck, review the "Formation of Contract" and "Capacity to Contract" sections.',
                  misconception: 'Students often believe that **any breach of contract entitles the innocent party to claim all losses they suffered** — e.g., if a supplier.' },
                { id: 'b', prompt: 'A contracts to supply 1,000 kg of onions to B at ₹20/kg by 15th November.', answer: 'The contract is NOT discharged',
                  options: ['The contract is NOT discharged', 'yes, it\'s frustrated'],
                  hint: 'If stuck, review the "Formation of Contract" and "Capacity to Contract" sections.',
                  misconception: 'Students often believe that **any breach of contract entitles the innocent party to claim all losses they suffered** — e.g., if a supplier.' },
                { id: 'c', prompt: 'Compare the measure of damages under Section 73 (general damages) and Section 74 (liquidated damages) when a contract stipulates a penalty of ₹1 lakh for.', answer: 'The injured party recovers only ₹20,000 (actual loss), not ₹1 lakh',
                  options: ['The injured party recovers only ₹20,000 (actual loss), not ₹1 lakh', '₹1 lakh because it\'s in the contract'],
                  hint: 'If stuck, review the "Formation of Contract" and "Capacity to Contract" sections.',
                  misconception: 'Students often believe that **any breach of contract entitles the innocent party to claim all losses they suffered** — e.g., if a supplier.' }
          ],
            remediations: { 'any-breach-of-contract-entitles': { steps: ['Revisit **c12_leg_cbse_03_001** (Key Concepts) to relearn the definition of "consideration" and "free consent" — the.', 'Re-read **c12_leg_cbse_03_003** (Landmark Cases) for *Hadley v.', 'Baxendale*, *Mohori Bibee*, and *Satyabrata Ghose* — create a 2-column table: Case | Principle | Application.', 'Practice **c12_leg_cbse_03_005** (Exam Questions) Q3 and Q4 — they test Section 56 and Section 73/74 respectively.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
