import type { SimDef } from '../../engine/types';

/** v3 generated — c12_leg_ch05 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_leg_ch05: SimDef = {
    id: 'v3_c12_leg_ch05',
    title: 'Law of Property',
    subtitle: 'This node covers: (a) Meaning and classification of property.',
    classLevel: 12, subject: 'leg', topic: 'Law of Property',
    chapters: ['c12_leg_ch05'],
    nodeIds: ['c12_leg_cbse_05_001', 'c12_leg_cbse_05_002', 'c12_leg_cbse_05_003', 'c12_leg_cbse_05_004', 'c12_leg_cbse_05_005', 'c12_leg_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a real dilemma: "Your grandmother wants to gift her ancestral house to your cousin, but your uncle.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A enters into a contract to sell his agricultural land to B. The contract states: "B shall pay ₹20 lakhs.',
        options: ['The advance is *earnest money* (part payment), not a forfeiture clause (penalty)', 'Registration = Transfer of Title', 'transfer has to be made only by a registered instrument'],
        answer: 'The advance is *earnest money* (part payment), not a forfeiture clause (penalty)',
        hook: '**"Registration = Transfer of Title"** — Students believe that once a sale deed is registered, ownership.',
    },
    teaching: [
        { title: 'Law of Property — Key Concepts and Institutions', text: 'Property law governs the classification of assets (movable/immovable, tangible/intangible), the legal requirements for transferring ownership between living persons (sale, gift, lease, exchange.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_leg_cbse_05_001', title: 'Law of Property — Key Concepts and Institutions',
          caseStudy: { intro: 'Start with a real dilemma: "Your grandmother wants to gift her ancestral house to your cousin, but your uncle claims he already bought it verbally last year.',
            decisions: [{ prompt: 'Define "immovable property" as per Section 3 of the Transfer of Property Act, 1882 read with the General Clauses Act, 1897.', options: [
                { text: 'Immovable property includes land, benefits arising out of land, and things attached to', outcome: 'Immovable property includes land, benefits arising out of land, and things attached to the earth.' },
                { text: 'Registration = Transfer of Title', outcome: 'Not quite — **"Registration = Transfer of Title"** — Students believe that once a sale deed is registered.', reveals: 'registration-transfer-of-title-students' },
                { text: 'transfer has to be made only by a registered instrument', outcome: 'Not quite — **"Registration = Transfer of Title"** — Students believe that once a sale deed is registered.', reveals: 'registration-transfer-of-title-students' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_05_002', title: 'Law of Property — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with a real scenario: "Your aunt gifts you a flat in Delhi. She writes a letter saying \'It\'s yours.\' Is the flat legally yours?" Most students say yes.',
            decisions: [{ prompt: 'What is the exact constitutional provision that protects a person\'s property from arbitrary state action, and what does it require for.', options: [
                { text: 'Article 300A: "No person shall be deprived of his property save by authority of law."', outcome: 'Article 300A: "No person shall be deprived of his property save by authority of law." Valid.' },
                { text: 'signing a sale deed completes the transfer', outcome: 'Not quite — **"Registration is just a formality; the real transfer happens when parties sign the deed."**.', reveals: 'registration-is-just-a-formality' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_05_003', title: 'Law of Property — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with this: "You inherit a mango orchard. Your cousin claims a verbal promise from your father gave him the trees. The matter is in court.',
            decisions: [{ prompt: 'What is the legal effect of a transfer of immovable property made during the pendency of a suit concerning its title, under Section 52.', options: [
                { text: 'The transfer is not void but binds the transferee to the final decree in the pending suit', outcome: 'The transfer is not void but binds the transferee to the final decree in the pending suit — the.' },
                { text: 'the transfer is void/illegal', outcome: 'Not quite — Students believe **"registration = valid transfer"** for all property.', reveals: 'registration-valid-transfer-for-all' },
                { text: 'registration = valid transfer', outcome: 'Not quite — Students believe **"registration = valid transfer"** for all property.', reveals: 'registration-valid-transfer-for-all' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_05_004', title: 'Law of Property — Processes and Procedures',
          caseStudy: { intro: 'Start with this real scenario: "Your aunt wants to gift her Delhi flat to her niece.',
            decisions: [{ prompt: 'What is the minimum value of immovable property that mandates compulsory registration under the Registration Act, 1908?', options: [
                { text: 'Rs', outcome: 'Rs. 100. Under Section 17 of the Registration Act, 1908, any non-testamentary instrument purporting.' },
                { text: 'no minimum', outcome: 'Not quite — Students believe that an "agreement to sell" transfers ownership of immovable property.', reveals: 'an-agreement-to-sell-transfers' },
                { text: 'agreement to sell', outcome: 'Not quite — Students believe that an "agreement to sell" transfers ownership of immovable property.', reveals: 'an-agreement-to-sell-transfers' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_05_005', title: 'Law of Property — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'A student wants to gift their ancestral flat to a cousin but discovers a sibling has filed a partition suit over it.',
            decisions: [{ prompt: 'Define \'immovable property\' under Section 3 of the Transfer of Property Act, 1882, and explain why standing timber is excluded.', options: [
                { text: 'Immovable property includes land, benefits arising from land, and things attached to the', outcome: 'Immovable property includes land, benefits arising from land, and things attached to the earth.' },
                { text: 'trees are immovable', outcome: 'Not quite — Students think "registration = valid transfer" for all property.', reveals: 'registration-valid-transfer-for-all' },
                { text: 'registration = valid transfer', outcome: 'Not quite — Students think "registration = valid transfer" for all property.', reveals: 'registration-valid-transfer-for-all' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_05_006', title: 'Law of Property — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a real scenario: "Your father orally gifts you a plot of land worth ₹50,000. He later sells it to a neighbour via registered deed. You sue.',
            decisions: [{ prompt: 'Define \'immovable property\' under Section 3 of the Transfer of Property Act, 1882, and explain the exclusion of \'standing timber, growing.', options: [
                { text: 'Immovable property under Sec', outcome: 'Immovable property under Sec. 3 TPA excludes standing timber (e.g., teak trees grown for.' },
                { text: 'mango trees are standing timber', outcome: 'Not quite — Students believe **Doctrine of Lis Pendens (Sec. 52 TPA) makes a pendente lite transfer *void.', reveals: 'doctrine-of-lis-pendens-sec' },
                { text: '**Doctrine of Lis Pendens (Sec', outcome: 'Not quite — Students believe **Doctrine of Lis Pendens (Sec. 52 TPA) makes a pendente lite transfer *void.', reveals: 'doctrine-of-lis-pendens-sec' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_05_006', title: 'Law of Property — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a real scenario: "Your father orally gifts you a plot of land worth ₹50,000. He later sells it to a neighbour via registered deed. You sue.',
            decisions: [{ prompt: 'Define \'immovable property\' under Section 3 of the Transfer of Property Act, 1882, and explain the exclusion of \'standing timber, growing.', options: [
                { text: 'Immovable property under Sec', outcome: 'Immovable property under Sec. 3 TPA excludes standing timber (e.g., teak trees grown for.' },
                { text: 'mango trees are standing timber', outcome: 'Not quite — Students believe **Doctrine of Lis Pendens (Sec. 52 TPA) makes a pendente lite transfer *void.', reveals: 'doctrine-of-lis-pendens-sec' },
                { text: '**Doctrine of Lis Pendens (Sec', outcome: 'Not quite — Students believe **Doctrine of Lis Pendens (Sec. 52 TPA) makes a pendente lite transfer *void.', reveals: 'doctrine-of-lis-pendens-sec' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_leg_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'Law of Property', spots: [
            { id: 's1', label: 'Law of Property Key Concepts and Institutions', prompt: 'Which idea is this? — Property law governs the classification of assets (movable/immovable.', answer: 'Law of Property Key Concepts and Institutions', options: ['Law of Property Key Concepts and Institutions', 'Law of Property Constitutional and Legal Provisions', 'Law of Property Landmark Cases and Illustrations', 'Law of Property Processes and Procedures'] },
            { id: 's2', label: 'Law of Property Constitutional and Legal Provisions', prompt: 'Which idea is this? — The constitutional and legal provisions governing property in India consist of Article.', answer: 'Law of Property Constitutional and Legal Provisions', options: ['Law of Property Constitutional and Legal Provisions', 'Law of Property Key Concepts and Institutions', 'Law of Property Landmark Cases and Illustrations', 'Law of Property Processes and Procedures'] },
            { id: 's3', label: 'Law of Property Landmark Cases and Illustrations', prompt: 'Which idea is this? — Landmark cases in Property Law are judicial decisions that establish binding precedents.', answer: 'Law of Property Landmark Cases and Illustrations', options: ['Law of Property Landmark Cases and Illustrations', 'Law of Property Key Concepts and Institutions', 'Law of Property Constitutional and Legal Provisions', 'Law of Property Processes and Procedures'] },
            { id: 's4', label: 'Law of Property Processes and Procedures', prompt: 'Which idea is this? — The Law of Property — Processes and Procedures refers to the statutory framework under.', answer: 'Law of Property Processes and Procedures', options: ['Law of Property Processes and Procedures', 'Law of Property Key Concepts and Institutions', 'Law of Property Constitutional and Legal Provisions', 'Law of Property Landmark Cases and Illustrations'] },
            { id: 's5', label: 'Law of Property Exam-Oriented Questions and Answers', prompt: 'Which idea is this? — The Law of Property governs the creation, transfer, and extinction of rights over movable.', answer: 'Law of Property Exam-Oriented Questions and Answers', options: ['Law of Property Exam-Oriented Questions and Answers', 'Law of Property Key Concepts and Institutions', 'Law of Property Constitutional and Legal Provisions', 'Law of Property Landmark Cases and Illustrations'] },
            { id: 's6', label: 'Law of Property Critical Analysis and Application', prompt: 'Which idea is this? — The Law of Property governs the creation, transfer, and enforcement of rights over.', answer: 'Law of Property Critical Analysis and Application', options: ['Law of Property Critical Analysis and Application', 'Law of Property Key Concepts and Institutions', 'Law of Property Constitutional and Legal Provisions', 'Law of Property Landmark Cases and Illustrations'] }
          ] } },
        { type: 'case', nodeId: 'c12_leg_cbse_05_006', title: 'You made it',
          caseStudy: { intro: 'You finished Law of Property — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_leg_cbse_05_001', difficulty: 'standard',
          question: 'Property law governs the classification of assets (movable/immovable.',
          hint: 'If stuck on "essentials of valid transfer", revisit Law of Contract node.',
          misconception: '**"Registration = Transfer of Title"** — Students believe that once a sale deed is registered, ownership.',
          parts: [
                { id: 'a', prompt: 'A enters into a contract to sell his agricultural land to B. The contract states: "B shall pay ₹20 lakhs.', answer: 'The advance is *earnest money* (part payment), not a forfeiture clause (penalty)',
                  options: ['The advance is *earnest money* (part payment), not a forfeiture clause (penalty)', 'Registration = Transfer of Title', 'transfer has to be made only by a registered instrument', 'once a sale deed is registered, ownership *automatically* passes'],
                  hint: 'If stuck on "essentials of valid transfer", revisit Law of Contract node (c12_leg_cbse_03_001).',
                  misconception: '**"Registration = Transfer of Title"** — Students believe that once a sale deed is registered, ownership *automatically* passes.' }
          ],
            remediations: { 'registration-transfer-of-title-students': { steps: ['Re-read Section 54 TPA (Sale) and Section 17 Registration Act, 1908 side-by-side.', 'Highlight: "Sale is a transfer of ownership...', '"Documents *required to be registered*...', 'shall be admissible in evidence" (Registration Act).'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**"Registration = Transfer of Title"** — Students believe that once a sale deed is registered, ownership.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate: "The Doctrine of Lis Pendens (Section 52 TPA) renders a pendente lite transfer void ab initio." Support your answer with the Supreme.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'void ab initio', 'Registration = Transfer of Title', 'transfer has to be made only by a registered instrument'],
                  hint: 'If stuck on "essentials of valid transfer", revisit Law of Contract node (c12_leg_cbse_03_001).',
                  misconception: '**"Registration = Transfer of Title"** — Students believe that once a sale deed is registered, ownership *automatically* passes.' },
                { id: 'b', prompt: 'Draft a hypothetical fact pattern (150 words) where *both* the Doctrine of Election and the Doctrine of Lis Pendens apply simultaneously.', answer: '*Fact pattern:* A owns House X (worth ₹1 cr) and Land Y (worth ₹50 lakhs)',
                  options: ['*Fact pattern:* A owns House X (worth ₹1 cr) and Land Y (worth ₹50 lakhs)', 'Registration = Transfer of Title', 'transfer has to be made only by a registered instrument', 'once a sale deed is registered, ownership *automatically* passes'],
                  hint: 'If stuck on "essentials of valid transfer", revisit Law of Contract node (c12_leg_cbse_03_001).',
                  misconception: '**"Registration = Transfer of Title"** — Students believe that once a sale deed is registered, ownership *automatically* passes.' }
          ],
            remediations: { 'registration-transfer-of-title-students': { steps: ['Re-read Section 54 TPA (Sale) and Section 17 Registration Act, 1908 side-by-side.', 'Highlight: "Sale is a transfer of ownership...', '"Documents *required to be registered*...', 'shall be admissible in evidence" (Registration Act).'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_05_002', difficulty: 'standard',
          question: 'The constitutional and legal provisions governing property in India consist.',
          hint: 'If stuck on why registration is mandatory, revisit S.49 Registration Act ("unregistered.',
          misconception: '**"Registration is just a formality; the real transfer happens when parties sign the deed."** Students think signing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The constitutional and legal provisions governing property in India consist of Article',
                  options: ['The constitutional and legal provisions governing property in India consist of Article', 'Property law governs the classification of assets (movable/immovable,', 'Landmark cases in Property Law are judicial decisions that establish binding precedents,', 'The Law of Property'],
                  hint: 'If stuck on why registration is mandatory, revisit S.49 Registration Act ("unregistered document.',
                  misconception: '**"Registration is just a formality; the real transfer happens when parties sign the deed."** Students think signing a sale deed completes.' }
          ],
            remediations: { 'registration-is-just-a-formality': { steps: ['**Revisit c12_leg_cbse_05_001 (Key Concepts)** — re-read the "Essentials of a valid transfer" section: note the.', 'Registration is not last; it\'s the *transfer moment*.', '**Re-read S.49 Registration Act & S.54 TPA side-by-side** — highlight "inadmissible as evidence" (S.49) vs.', '"transfer only by registered instrument" (S.54).'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_05_003', difficulty: 'standard',
          question: 'Landmark cases in Property Law are judicial decisions that establish binding.',
          hint: 'If stuck on case analysis, revisit Class 11 node c11_leg_cbse_08_003 (Sources of Law.',
          misconception: 'Students believe **"registration = valid transfer"** for all property.',
          parts: [
                { id: 'a', prompt: 'Compare the *Doctrine of Election* (Section 35 TPA) and the *Doctrine of Lis Pendens* (Section 52 TPA) on the basis of: (a) triggering event, (b) effect.', answer: 'and the *Doctrine of Lis Pendens* (Section 52 TP',
                  options: ['and the *Doctrine of Lis Pendens* (Section 52 TP', 'registration = valid transfer', 'attestation', 'registration'],
                  hint: 'If stuck on case analysis, revisit Class 11 node c11_leg_cbse_08_003 (Sources of Law — Landmark.',
                  misconception: 'Students believe **"registration = valid transfer"** for all property.' }
          ],
            remediations: { 'registration-valid-transfer-for-all': { steps: ['If the student confuses Election with Lis Pendens: (1) Re-read Section 35 vs Section 52 TPA side-by-side.', '(2) Draw a 2x2 table: Trigger / Effect / Maxim / Illustrations.', 'Cooper* (Election) and *Dev Raj Dogra* (Lis Pendens) as paired exercises.', '(4) Ask: "Does this involve **one deed with conflicting rights** (Election) or **a court case freezing the property**.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_05_004', difficulty: 'standard',
          question: 'The Law of Property — Processes and Procedures refers to the statutory.',
          hint: 'Review c12_leg_cbse_03_001 (Law of Contract — Key Concepts) for contract essentials and.',
          misconception: 'Students believe that an "agreement to sell" transfers ownership of immovable property.',
          parts: [
                { id: 'a', prompt: 'A enters into an agreement to sell his agricultural land to B for Rs. 50 lakh. B pays Rs. 10 lakh as advance.', answer: 'No, B cannot succeed against C',
                  options: ['No, B cannot succeed against C', 'B wins because he paid advance', 'agreement to sell', 'an "agreement to sell" transfers ownership of immovable property'],
                  hint: 'Review c12_leg_cbse_03_001 (Law of Contract — Key Concepts) for contract essentials and.',
                  misconception: 'Students believe that an "agreement to sell" transfers ownership of immovable property.' },
                { id: 'b', prompt: 'Compare the formalities for a valid lease of immovable property for (a) 11 months and (b) 12 months. Why does the law distinguish?', answer: '11 months and (',
                  options: ['11 months and (', 'both need registration', 'agreement to sell', 'an "agreement to sell" transfers ownership of immovable property'],
                  hint: 'Review c12_leg_cbse_03_001 (Law of Contract — Key Concepts) for contract essentials and.',
                  misconception: 'Students believe that an "agreement to sell" transfers ownership of immovable property.' }
          ],
            remediations: { 'an-agreement-to-sell-transfers': { steps: ['If a student conflates agreement to sell with sale deed: (1) Make them read Section 54, TPA verbatim — "sale is.', 'for a price" vs "contract for sale does not create any interest." (2) Have them trace the 5-step transfer chain.', '(3) Give a re-diagnostic: "A pays full price, takes possession, but no sale deed.', 'Can original owner evict A?" — forces application of Section 53A (part performance) vs full transfer.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_05_005', difficulty: 'standard',
          question: 'The Law of Property governs the creation, transfer, and extinction of rights.',
          hint: 'If stuck on property classification, review Shantabai v. State of Bombay (AIR 1958.',
          misconception: 'Students think "registration = valid transfer" for all property.',
          parts: [
                { id: 'a', prompt: 'A sells his house to B via a registered sale deed but does not deliver possession. B later discovers A had mortgaged the house to a bank before the sale.', answer: 'No, lis pendens (Section 52, TPA) does not apply',
                  options: ['No, lis pendens (Section 52, TPA) does not apply', 'registration = valid transfer', '"registration = valid transfer" for all property'],
                  hint: 'If stuck on property classification, review Shantabai v. State of Bombay (AIR 1958 SC 532) and.',
                  misconception: 'Students think "registration = valid transfer" for all property.' },
                { id: 'b', prompt: 'X owns a mango orchard. In 2020, he exports mangoes. In 2021, due to losses, he starts selling mango wood locally.', answer: '2020: mangoes = movable (growing crop, severed from land)',
                  options: ['2020: mangoes = movable (growing crop, severed from land)', 'movable timber', 'registration = valid transfer', '"registration = valid transfer" for all property'],
                  hint: 'If stuck on property classification, review Shantabai v. State of Bombay (AIR 1958 SC 532) and.',
                  misconception: 'Students think "registration = valid transfer" for all property.' }
          ],
            remediations: { 'registration-valid-transfer-for-all': { steps: ['If a student confuses registration rules: Step 1 — Revisit c12_leg_cbse_05_001 (Key Concepts) for the movable/immovable.', 'Step 2 — Re-read Section 17, Registration Act, 1908 and Section 3, TPA on attestation.', 'Step 3 — Do a 3-column drill: Property Type | Value | Formality Required (e.g., Car | ₹50k | Delivery only; Flat | ₹50L.', 'Step 4 — Re-attempt Diagnostic Q3 and Q5.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_05_006', difficulty: 'standard',
          question: 'The Law of Property governs the creation, transfer, and enforcement of rights.',
          hint: 'If stuck on "whether a transfer is valid," review the **Transfer Formality Checklist**.',
          misconception: 'Students believe **Doctrine of Lis Pendens (Sec. 52 TPA) makes a pendente lite transfer *void ab initio***.',
          parts: [
                { id: 'a', prompt: 'Define \'immovable property\' under Section 3 of the Transfer of Property Act, 1882, and explain the exclusion of \'standing timber, growing crops, and grass\'.', answer: 'Immovable property under Sec',
                  options: ['Immovable property under Sec', 'mango trees are standing timber', '**Doctrine of Lis Pendens (Sec'],
                  hint: 'If stuck on "whether a transfer is valid," review the **Transfer Formality Checklist**: (1).',
                  misconception: 'Students believe **Doctrine of Lis Pendens (Sec. 52 TPA) makes a pendente lite transfer *void ab initio***.' },
                { id: 'b', prompt: 'X files a suit against Y for declaration of title over a flat in Mumbai. During the pendency of the suit, Y sells the flat to Z via a registered sale deed.', answer: 'The transfer is not void but Z is bound by the court\'s final decree under Sec',
                  options: ['The transfer is not void but Z is bound by the court\'s final decree under Sec', 'Sale is void', 'Z gets clean title as bona fide purchaser', '**Doctrine of Lis Pendens (Sec'],
                  hint: 'If stuck on "whether a transfer is valid," review the **Transfer Formality Checklist**: (1).',
                  misconception: 'Students believe **Doctrine of Lis Pendens (Sec. 52 TPA) makes a pendente lite transfer *void ab initio***.' },
                { id: 'c', prompt: 'Compare and contrast the mode of transfer for: (a) a gold necklace worth ₹80,000; (b) a residential plot worth ₹50 lakh; (c) a trademark license (intangible).', answer: 'a gold necklace worth ₹80,000',
                  options: ['a gold necklace worth ₹80,000', 'all require registration', '**Doctrine of Lis Pendens (Sec'],
                  hint: 'If stuck on "whether a transfer is valid," review the **Transfer Formality Checklist**: (1).',
                  misconception: 'Students believe **Doctrine of Lis Pendens (Sec. 52 TPA) makes a pendente lite transfer *void ab initio***.' }
          ],
            remediations: { 'doctrine-of-lis-pendens-sec': { steps: ['Gurmail Singh* (SC) — focus on para where Court distinguishes "void" vs.', 'Create a 2-column table: Column A = "Void Transfer" (examples: minor\'s transfer, fraudulent transfer); Column.', 'Write 3 lines explaining *why* the law prefers "bound by decree": it protects the *transferee\'s investment* (not wiped.', 'Re-attempt Diagnostic Q3 and Q6.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
