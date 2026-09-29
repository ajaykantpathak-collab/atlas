import type { SimDef } from '../../engine/types';

/** v3 generated — c12_leg_ch02 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_leg_ch02: SimDef = {
    id: 'v3_c12_leg_ch02',
    title: 'Alternative Dispute Resolution in India (ADR)',
    subtitle: 'This node covers the conceptual framework, statutory basis, and comparative features.',
    classLevel: 12, subject: 'leg', topic: 'Alternative Dispute Resolution in India (ADR)',
    chapters: ['c12_leg_ch02'],
    nodeIds: ['c12_leg_cbse_02_001', 'c12_leg_cbse_02_002', 'c12_leg_cbse_02_003', 'c12_leg_cbse_02_004', 'c12_leg_cbse_02_005', 'c12_leg_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a real scenario: "A startup founder and a vendor have a payment dispute of ₹5 lakh.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Explain the difference between the role of a Mediator and a Conciliator in the ADR process. Why does this distinction matter for the parties?',
        options: ['A Mediator facilitates negotiation but does not propose solutions', 'they are the same', 'ADR is only for small/low-value disputes'],
        answer: 'A Mediator facilitates negotiation but does not propose solutions',
        hook: 'Students believe that "ADR is only for small/low-value disputes" because Lok Adalat and Ombudsman are marketed for.',
    },
    teaching: [
        { title: 'Alternative Dispute Resolution in India (ADR) — Key Concepts and Institutions', text: 'Alternative Dispute Resolution (ADR) refers to a set of structured, non-adversarial mechanisms — Arbitration, Mediation, Conciliation, Lok Adalat, and Ombudsman institutions — that provide legally.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_leg_cbse_02_001', title: 'Alternative Dispute Resolution in India (ADR) — Key Concepts and Institutions',
          caseStudy: { intro: 'Start with a real scenario: "A startup founder and a vendor have a payment dispute of ₹5 lakh.',
            decisions: [{ prompt: 'Define \'Arbitration Agreement\' under the Arbitration and Conciliation Act, 1996. Is it mandatory for it to be in writing?', options: [
                { text: 'An Arbitration Agreement is an agreement by parties to submit present or future disputes', outcome: 'An Arbitration Agreement is an agreement by parties to submit present or future disputes.' },
                { text: 'oral agreement is enough', outcome: 'Not quite — Students believe that "ADR is only for small/low-value disputes" because Lok Adalat and Ombudsman.', reveals: 'adr-is-only-for-small' },
                { text: 'ADR is only for small/low-value disputes', outcome: 'Not quite — Students believe that "ADR is only for small/low-value disputes" because Lok Adalat and Ombudsman.', reveals: 'adr-is-only-for-small' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_02_002', title: 'Alternative Dispute Resolution in India (ADR) — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with a relatable scenario: "Your family has a property dispute with a relative — going to court means 10 years, lakhs in fees, and a fractured.',
            decisions: [{ prompt: 'What is the constitutional basis for Alternative Dispute Resolution in India, and which specific Articles mandate the State to promote.', options: [
                { text: 'The constitutional basis for ADR lies primarily in Article 39A (Directive Principle:', outcome: 'The constitutional basis for ADR lies primarily in Article 39A (Directive Principle: State shall.' },
                { text: 'ADR = informal, non-binding, optional friendly chat', outcome: 'Not quite — Students believe "ADR = informal, non-binding, optional friendly chat." This is dangerously wrong.', reveals: 'adr-informal' },
                { text: '"ADR = informal, non-binding, optional friendly chat', outcome: 'Not quite — Students believe "ADR = informal, non-binding, optional friendly chat." This is dangerously wrong.', reveals: 'adr-informal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_02_003', title: 'Alternative Dispute Resolution in India (ADR) — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with a real scenario: "A startup founder in Bengaluru has a payment dispute with a US-based client — the contract says \'arbitration in Singapore under.',
            decisions: [{ prompt: 'What is the key statutory provision that empowers courts to refer pending cases to ADR mechanisms like arbitration, mediation, or Lok.', options: [
                { text: 'Section 89 of the Code of Civil Procedure, 1908 (inserted by the 2002 Amendment) empowers', outcome: 'Section 89 of the Code of Civil Procedure, 1908 (inserted by the 2002 Amendment) empowers courts.' },
                { text: 'Arbitration Act, 1996', outcome: 'Not quite — Students believe "ADR = informal, non-binding, less serious than court." In reality: (1) Arbitral.', reveals: 'adr-informal' },
                { text: 'Legal Services Authorities Act', outcome: 'Not quite — Students believe "ADR = informal, non-binding, less serious than court." In reality: (1) Arbitral.', reveals: 'adr-informal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_02_004', title: 'Alternative Dispute Resolution in India (ADR) — Processes and Procedures',
          caseStudy: { intro: 'Start with a relatable scenario: "You ordered a laptop online, it arrived damaged, and the seller refuses a refund.',
            decisions: [{ prompt: 'What is the key procedural difference between arbitration and mediation regarding the third party\'s decision-making power?', options: [
                { text: 'In arbitration, the arbitrator renders a binding decision (arbitral award) after hearing', outcome: 'In arbitration, the arbitrator renders a binding decision (arbitral award) after hearing both.' },
                { text: 'both make binding decisions', outcome: 'Not quite — Students often believe "ADR is only for small, simple disputes" and that "arbitration awards cannot.', reveals: 'adr-is-only-for-small' },
                { text: 'ADR is only for small, simple disputes', outcome: 'Not quite — Students often believe "ADR is only for small, simple disputes" and that "arbitration awards cannot.', reveals: 'adr-is-only-for-small' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_02_005', title: 'Alternative Dispute Resolution in India (ADR) — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'Start with a real-world scenario: "A startup founder in Bengaluru has a payment dispute with a client in Mumbai. The contract has an arbitration clause.',
            decisions: [{ prompt: 'What is the statutory basis for court-referred mediation in India, and under what condition can a court refer a pending civil suit.', options: [
                { text: 'The statutory basis is **Section 89 of the Code of Civil Procedure, 1908 (inserted by the', outcome: 'The statutory basis is **Section 89 of the Code of Civil Procedure, 1908 (inserted by the 2002.' },
                { text: 'any case can be referred anytime', outcome: 'Not quite — **Students believe "ADR award = court judgment" for all ADR types.** **Reality**: Only **arbitral.', reveals: 'students-believe-adr-award-court' },
                { text: 'ADR award = court judgment', outcome: 'Not quite — **Students believe "ADR award = court judgment" for all ADR types.** **Reality**: Only **arbitral.', reveals: 'students-believe-adr-award-court' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_02_006', title: 'Alternative Dispute Resolution in India (ADR) — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a real scenario: "A startup founder in Bengaluru has a payment dispute with a US-based client — the contract says \'arbitration in Singapore under.',
            decisions: [{ prompt: 'What is the key legal distinction between an arbitral award under the Arbitration and Conciliation Act, 1996, and a settlement agreement.', options: [
                { text: 'An arbitral award is directly enforceable as a court decree under Section 36 of the', outcome: 'An arbitral award is directly enforceable as a court decree under Section 36 of the Arbitration and.' },
                { text: 'both are equally binding', outcome: 'Not quite — Students often believe that "Lok Adalat awards can be appealed in High Court like regular court.', reveals: 'lok-adalat-awards-can-be' },
                { text: 'Lok Adalat awards can be appealed in High Court like regular court judgments', outcome: 'Not quite — Students often believe that "Lok Adalat awards can be appealed in High Court like regular court.', reveals: 'lok-adalat-awards-can-be' }
            ] }] } },
        { type: 'build', nodeId: 'c12_leg_cbse_02_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Note the 2015 Amendment proviso to Section 2(2) —.', 'Recall the BALCO principle — Part I of the Arbitration Act.', 'However, the governing law is Indian law, not the.', 'Conclusion — The Indian company cannot get Section 9 relief.', 'Identify the seat of arbitration — the clause says "seat.'], answer: 'Identify the seat of arbitration — the clause says "seat. Recall the BALCO principle — Part I of the Arbitration Act. Note the 2015 Amendment proviso to Section 2(2) —. However, the governing law is Indian law, not the. Conclusion — The Indian company cannot get Section 9 relief.' } },
        { type: 'case', nodeId: 'c12_leg_cbse_02_006', title: 'You made it',
          caseStudy: { intro: 'You finished Alternative Dispute Resolution in India (ADR) — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_leg_cbse_02_001', difficulty: 'standard',
          question: 'Alternative Dispute Resolution (ADR) refers to a set of structured.',
          hint: 'Review Class 11 Judiciary node c11_leg_cbse_11_001 (Structure, Hierarchy of Courts) and.',
          misconception: 'Students believe that "ADR is only for small/low-value disputes" because Lok Adalat and Ombudsman are marketed for.',
          parts: [
                { id: 'a', prompt: 'Explain the difference between the role of a Mediator and a Conciliator in the ADR process. Why does this distinction matter for the parties?', answer: 'A Mediator facilitates negotiation but does not propose solutions',
                  options: ['A Mediator facilitates negotiation but does not propose solutions', 'they are the same', 'ADR is only for small/low-value disputes'],
                  hint: 'Review Class 11 Judiciary node c11_leg_cbse_11_001 (Structure, Hierarchy of Courts) and.',
                  misconception: 'Students believe that "ADR is only for small/low-value disputes" because Lok Adalat and Ombudsman are marketed for consumer/small claims.' },
                { id: 'b', prompt: 'Compare Lok Adalat and Permanent Lok Adalat on: (a) stage of dispute they address, (b) nature of award, (c) jurisdiction over public utility services.', answer: 'stage of dispute they address, (',
                  options: ['stage of dispute they address, (', 'both are same', 'ADR is only for small/low-value disputes'],
                  hint: 'Review Class 11 Judiciary node c11_leg_cbse_11_001 (Structure, Hierarchy of Courts) and.',
                  misconception: 'Students believe that "ADR is only for small/low-value disputes" because Lok Adalat and Ombudsman are marketed for consumer/small claims.' }
          ],
            remediations: { 'adr-is-only-for-small': { steps: ['If the student holds this misconception: (1) Show the BALCO case facts — a ₹2000+ crore dispute resolved via.', '(2) Map dispute value/complexity to ADR mode on a spectrum: Lok Adalat (low value, simple, compoundable) → Mediation.', '(3) Assign a re-diagnostic: "A dispute between two Indian pharma companies over patent licensing royalty (₹50 crore).', 'Why not Lok Adalat?" — expect answer: Institutional Arbitration with technical arbitrator, Indian seat.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "ADR is only for small/low-value disputes" because Lok Adalat and Ombudsman are marketed for.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Banking Ombudsman Scheme provides a complete substitute for consumer courts in banking disputes." Support your evaluation with two.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'ADR is only for small/low-value disputes'],
                  hint: 'Review Class 11 Judiciary node c11_leg_cbse_11_001 (Structure, Hierarchy of Courts) and.',
                  misconception: 'Students believe that "ADR is only for small/low-value disputes" because Lok Adalat and Ombudsman are marketed for consumer/small claims.' },
                { id: 'b', prompt: 'Design a dispute resolution clause for a joint venture agreement between two Indian tech startups that: (a) preserves their business relationship, (b) ensures.', answer: 'A strong answer: "Mediation-Arbitration (Med-Arb) clause: Step 1',
                  options: ['A strong answer: "Mediation-Arbitration (Med-Arb) clause: Step 1', 'ADR is only for small/low-value disputes'],
                  hint: 'Review Class 11 Judiciary node c11_leg_cbse_11_001 (Structure, Hierarchy of Courts) and.',
                  misconception: 'Students believe that "ADR is only for small/low-value disputes" because Lok Adalat and Ombudsman are marketed for consumer/small claims.' }
          ],
            remediations: { 'adr-is-only-for-small': { steps: ['If the student holds this misconception: (1) Show the BALCO case facts — a ₹2000+ crore dispute resolved via.', '(2) Map dispute value/complexity to ADR mode on a spectrum: Lok Adalat (low value, simple, compoundable) → Mediation.', '(3) Assign a re-diagnostic: "A dispute between two Indian pharma companies over patent licensing royalty (₹50 crore).', 'Why not Lok Adalat?" — expect answer: Institutional Arbitration with technical arbitrator, Indian seat.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_02_002', difficulty: 'standard',
          question: 'Alternative Dispute Resolution (ADR) refers to legally recognized.',
          hint: 'If stuck, review: (1) Class 11 Judiciary node c11_leg_cbse_11_002 for court hierarchy and.',
          misconception: 'Students believe "ADR = informal, non-binding, optional friendly chat." This is dangerously wrong.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Alternative Dispute Resolution (ADR) refers to legally recognized non-adversarial',
                  options: ['Alternative Dispute Resolution (ADR) refers to legally recognized non-adversarial', 'Alternative Dispute Resolution (ADR) refers to a set of structured, non-adversarial', 'Alternative Dispute Resolution (ADR) in India refers to legally recognised', 'Alternative Dispute Resolution (ADR) refers to a range of non-adversarial processes'],
                  hint: 'If stuck, review: (1) Class 11 Judiciary node c11_leg_cbse_11_002 for court hierarchy and Article.',
                  misconception: 'Students believe "ADR = informal, non-binding, optional friendly chat." This is dangerously wrong.' }
          ],
            remediations: { 'adr-informal': { steps: ['If the student holds this misconception: (1) Have them read Section 35-36 of the Arbitration Act and Section 21 of the.', 'Can an arbitral award be challenged?', 'Under what sections?" (3) Ask them to write one sentence distinguishing "non-binding process" (mediation *before*.', 'This forces the process/outcome distinction.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_02_003', difficulty: 'standard',
          question: 'Alternative Dispute Resolution (ADR) in India refers to legally recognised.',
          hint: 'If stuck, review c11_leg_cbse_11_001 (court hierarchy) and c11_leg_cbse_04_003 (Article.',
          misconception: 'Students believe "ADR = informal, non-binding, less serious than court." In reality: (1) Arbitral awards are.',
          parts: [
                { id: 'a', prompt: 'Explain why the Supreme Court in BALCO v. Kaiser (2012) held that Part I of the Arbitration and Conciliation Act, 1996 does not apply to foreign-seated.', answer: 'BALCO held that Part I applies only to arbitrations with their "seat" in India',
                  options: ['BALCO held that Part I applies only to arbitrations with their "seat" in India', 'governing law of contract', 'procedural law of arbitration', 'ADR = informal, non-binding, less serious than court'],
                  hint: 'If stuck, review c11_leg_cbse_11_001 (court hierarchy) and c11_leg_cbse_04_003 (Article 21/39A.',
                  misconception: 'Students believe "ADR = informal, non-binding, less serious than court." In reality: (1) Arbitral awards are enforceable as court decrees.' },
                { id: 'b', prompt: 'A husband and wife have a matrimonial dispute. They want a process where a neutral third party helps them communicate and reach their own agreement, but the.', answer: 'Mediation fits best',
                  options: ['Mediation fits best', 'conciliation', 'Lok Adalat', 'ADR = informal, non-binding, less serious than court'],
                  hint: 'If stuck, review c11_leg_cbse_11_001 (court hierarchy) and c11_leg_cbse_04_003 (Article 21/39A.',
                  misconception: 'Students believe "ADR = informal, non-binding, less serious than court." In reality: (1) Arbitral awards are enforceable as court decrees.' }
          ],
            remediations: { 'adr-informal': { steps: ['If the student holds the "ADR is informal/non-binding" misconception: (1) Have them read Section 36 (Arbitration Act).'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_02_004', difficulty: 'standard',
          question: 'Alternative Dispute Resolution (ADR) refers to a range of non-adversarial.',
          hint: 'If confused about arbitrator vs. mediator powers, review the "Process of Arbitration".',
          misconception: 'Students often believe "ADR is only for small, simple disputes" and that "arbitration awards cannot be challenged.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Alternative Dispute Resolution (ADR) refers to a range of non-adversarial processes',
                  options: ['Alternative Dispute Resolution (ADR) refers to a range of non-adversarial processes', 'Alternative Dispute Resolution (ADR) refers to a set of structured, non-adversarial', 'Alternative Dispute Resolution (ADR) refers to legally recognized non-adversarial', 'Alternative Dispute Resolution (ADR) in India refers to legally recognised'],
                  hint: 'If confused about arbitrator vs. mediator powers, review the "Process of Arbitration" (Steps 1-6).',
                  misconception: 'Students often believe "ADR is only for small, simple disputes" and that "arbitration awards cannot be challenged." In reality, high-stakes.' }
          ],
            remediations: { 'adr-is-only-for-small': { steps: ['Revisit c12_leg_cbse_02_002 (Legal Provisions) to re-study Section 34 grounds for setting aside awards and Section 89.', 'Create a comparison table: Arbitration vs.', 'Lok Adalat — columns: Third Party Role, Binding Nature, Appeal/Challenge, Typical Use Case.', 'Practice one BALCO-style seat/venue analysis problem.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_02_005', difficulty: 'standard',
          question: 'Alternative Dispute Resolution (ADR) refers to legally recognized mechanisms.',
          hint: 'If confused about whether an arbitration agreement is valid, review "Free Consent".',
          misconception: '**Students believe "ADR award = court judgment" for all ADR types.** **Reality**: Only **arbitral awards** (Section 36).',
          parts: [
                { id: 'a', prompt: 'Explain the difference between \'seat\' and \'venue\' in international commercial arbitration, and why this distinction matters for Indian courts\' jurisdiction.', answer: '**Seat** = the legal place of arbitration (determines curial law, supervisory',
                  options: ['**Seat** = the legal place of arbitration (determines curial law, supervisory', 'seat and venue are the same', 'ADR award = court judgment', '"ADR award = court judgment" for all ADR types'],
                  hint: 'If confused about whether an arbitration agreement is valid, review "Free Consent" (coercion, undue.',
                  misconception: '**Students believe "ADR award = court judgment" for all ADR types.** **Reality**: Only **arbitral awards** (Section 36) and **Lok Adalat.' },
                { id: 'b', prompt: 'A and B enter into a contract with an arbitration clause. A dispute arises. A files a civil suit in court.', answer: '**No.** Section 8 requires a **valid arbitration agreement**',
                  options: ['**No.** Section 8 requires a **valid arbitration agreement**', 'yes, refer anyway', 'ADR award = court judgment', '"ADR award = court judgment" for all ADR types'],
                  hint: 'If confused about whether an arbitration agreement is valid, review "Free Consent" (coercion, undue.',
                  misconception: '**Students believe "ADR award = court judgment" for all ADR types.** **Reality**: Only **arbitral awards** (Section 36) and **Lok Adalat.' }
          ],
            remediations: { 'students-believe-adr-award-court': { steps: ['**Revisit c12_leg_cbse_02_001 (Key Concepts)** — re-read the comparison table of ADR types (binding nature.', '**Create a 4-column cheat sheet**: ADR Type | Statute | Outcome Name | Enforceability Mechanism (Decree?', '**Practice 3 past-year board questions** on "enforceability of mediation settlement" and "Lok Adalat award vs arbitral.', '**Self-test**: Explain aloud to a peer why a conciliation agreement under Section 73 is "same status as arbitral award".'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_02_006', difficulty: 'standard',
          question: 'Alternative Dispute Resolution (ADR) refers to a set of non-adversarial.',
          hint: 'If stuck, revisit the distinction between \'seat\' and \'venue\' in arbitration (BALCO.',
          misconception: 'Students often believe that "Lok Adalat awards can be appealed in High Court like regular court judgments." This.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Alternative Dispute Resolution (ADR) refers to a set of non-adversarial, legally',
                  options: ['Alternative Dispute Resolution (ADR) refers to a set of non-adversarial, legally', 'Alternative Dispute Resolution (ADR) refers to a set of structured, non-adversarial', 'Alternative Dispute Resolution (ADR) refers to legally recognized non-adversarial', 'Alternative Dispute Resolution (ADR) in India refers to legally recognised'],
                  hint: 'If stuck, revisit the distinction between \'seat\' and \'venue\' in arbitration (BALCO judgment) and.',
                  misconception: 'Students often believe that "Lok Adalat awards can be appealed in High Court like regular court judgments." This is false — Section 21.' }
          ],
            remediations: { 'lok-adalat-awards-can-be': { steps: ['If the student holds this misconception: (1) Ask them to read Section 21 of the Legal Services Authorities Act, 1987.', '(2) Contrast with Section 37 of the Arbitration Act (appealable orders) and Section 96 CPC (appeal from decree).', '(3) Give a practice question: "A party is unhappy with a Lok Adalat award in a motor accident claim.', 'What remedies exist?" — Guide them to identify: only writ petition under Article 226 on narrow grounds, not appeal.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
