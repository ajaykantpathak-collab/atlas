import type { SimDef } from '../../engine/types';

/** v3 generated — c11_leg_ch09 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_leg_ch09: SimDef = {
    id: 'v3_c11_leg_ch09',
    title: 'Law Reforms',
    subtitle: 'This node covers the concept, need, and institutional history of law reform in India.',
    classLevel: 11, subject: 'leg', topic: 'Law Reforms',
    chapters: ['c11_leg_ch09'],
    nodeIds: ['c11_leg_cbse_09_001', 'c11_leg_cbse_09_002', 'c11_leg_cbse_09_003', 'c11_leg_cbse_09_004', 'c11_leg_cbse_09_005', 'c11_leg_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start with this scenario: "In 2000, India passed the IT Act to govern e-commerce — but by 2015, the Supreme.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Evaluate the statement: "The Consumer Protection Act 2019 is a better example of law reform than the Muslim Women (Protection of Rights on Marriage) Act 2019.',
        options: ['Critique: Both are valid reform pathways', 'only Law Commission route is legitimate', 'law reform only happens when Parliament passes a new Act'],
        answer: 'Critique: Both are valid reform pathways',
        hook: 'Students believe law reform only happens when Parliament passes a new Act.',
    },
    teaching: [
        { title: 'Law Reforms — Key Concepts and Institutions', text: 'Law reform is the systematic process of reviewing, modifying, repealing, or enacting laws to align the legal framework with changing social values, economic conditions, technological advancements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_leg_cbse_09_001', title: 'Law Reforms — Key Concepts and Institutions',
          caseStudy: { intro: 'Start with this scenario: "In 2000, India passed the IT Act to govern e-commerce — but by 2015, the Supreme Court struck down Section 66A for violating free.',
            decisions: [{ prompt: 'What is the primary constitutional basis that empowers the Law Commission of India to recommend law reforms, and how does it differ from.', options: [
                { text: 'The Law Commission of India is an executive body constituted by a government resolution', outcome: 'The Law Commission of India is an executive body constituted by a government resolution (not.' },
                { text: 'law reform only happens when Parliament passes a new Act', outcome: 'Not quite — Students believe law reform only happens when Parliament passes a new Act.', reveals: 'law-reform-only-happens-when' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_09_002', title: 'Law Reforms — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with this scenario: "A 14-year-old girl in 2024 faces cyberbullying on Instagram — her morphed photos are circulated.',
            decisions: [{ prompt: 'What is the constitutional basis for the Law Commission of India\'s existence, and how does it differ from a statutory body like the.', options: [
                { text: 'The Law Commission of India is **not** a constitutional body', outcome: 'The Law Commission of India is **not** a constitutional body — it is an **executive body**.' },
                { text: 'Article 39A creates the Law Commission', outcome: 'Not quite — Students often believe **law reform = only Parliament passing new Acts**.', reveals: 'law-reform-only-parliament-passing' },
                { text: '**law reform = only Parliament passing new Acts**', outcome: 'Not quite — Students often believe **law reform = only Parliament passing new Acts**.', reveals: 'law-reform-only-parliament-passing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_09_004', title: 'Law Reforms — Processes and Procedures',
          caseStudy: { intro: 'Start by asking: "Why did the Supreme Court strike down Section 66A of the IT Act in 2015, and what happened next?" This connects to the Shreya Singhal case.',
            decisions: [{ prompt: 'What is the primary statutory mechanism for initiating systematic law reform in post-independence India, and who constitutes it?', options: [
                { text: 'The primary mechanism is the Law Commission of India, constituted by a executive', outcome: 'The primary mechanism is the Law Commission of India, constituted by a executive resolution of the.' },
                { text: 'Parliamentary Standing Committee', outcome: 'Not quite — Students believe law reform is synonymous with "Parliament passing a new Act." They overlook the.', reveals: 'law-reform-is-synonymous-with' },
                { text: 'National Human Rights Commission', outcome: 'Not quite — Students believe law reform is synonymous with "Parliament passing a new Act." They overlook the.', reveals: 'law-reform-is-synonymous-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_09_005', title: 'Law Reforms — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'Start with this: "You\'re a 17-year-old who just got a notification that your favorite gaming app sold your data to advertisers.',
            decisions: [{ prompt: 'What is the primary constitutional basis for the establishment of Law Commissions in India, and which was the first Law Commission.', options: [
                { text: 'The primary constitutional basis is **Article 39A** (Directive Principles of State', outcome: 'The primary constitutional basis is **Article 39A** (Directive Principles of State Policy), which.' },
                { text: '**law reform = passing a new Act**', outcome: 'Not quite — Students believe **law reform = passing a new Act**. They miss that *reform* includes: (a).', reveals: 'law-reform-passing-a-new' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_09_006', title: 'Law Reforms — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a real-world scenario: A woman files an FIR for workplace harassment but faces delays and victim-blaming at the police station.',
            decisions: [{ prompt: 'What is the primary purpose of law reform in a democratic society like India?', options: [
                { text: 'The primary purpose of law reform is to adapt existing laws to changing social, economic,', outcome: 'The primary purpose of law reform is to adapt existing laws to changing social, economic.' },
                { text: 'to make more laws', outcome: 'Not quite — Students often believe that law reform simply means passing a new Act or amendment, and that once.', reveals: 'law-reform-simply-means-passing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_09_004', title: 'Law Reforms — Processes and Procedures',
          caseStudy: { intro: 'Start by asking: "Why did the Supreme Court strike down Section 66A of the IT Act in 2015, and what happened next?" This connects to the Shreya Singhal case.',
            decisions: [{ prompt: 'What is the primary statutory mechanism for initiating systematic law reform in post-independence India, and who constitutes it?', options: [
                { text: 'The primary mechanism is the Law Commission of India, constituted by a executive', outcome: 'The primary mechanism is the Law Commission of India, constituted by a executive resolution of the.' },
                { text: 'Parliamentary Standing Committee', outcome: 'Not quite — Students believe law reform is synonymous with "Parliament passing a new Act." They overlook the.', reveals: 'law-reform-is-synonymous-with' },
                { text: 'National Human Rights Commission', outcome: 'Not quite — Students believe law reform is synonymous with "Parliament passing a new Act." They overlook the.', reveals: 'law-reform-is-synonymous-with' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_leg_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'Law Reforms', spots: [
            { id: 's1', label: 'Law Reforms Key Concepts and Institutions', prompt: 'Which idea is this? — Law reform is the systematic process of reviewing, modifying, repealing, or enacting laws.', answer: 'Law Reforms Key Concepts and Institutions', options: ['Law Reforms Key Concepts and Institutions', 'Law Reforms Constitutional and Legal Provisions', 'Law Reforms Landmark Cases and Illustrations', 'Law Reforms Processes and Procedures'] },
            { id: 's2', label: 'Law Reforms Constitutional and Legal Provisions', prompt: 'Which idea is this? — Law reform is the systematic process of reviewing, revising, updating, or repealing.', answer: 'Law Reforms Constitutional and Legal Provisions', options: ['Law Reforms Constitutional and Legal Provisions', 'Law Reforms Key Concepts and Institutions', 'Law Reforms Landmark Cases and Illustrations', 'Law Reforms Processes and Procedures'] },
            { id: 's3', label: 'Law Reforms Landmark Cases and Illustrations', prompt: 'Which idea is this? — Law reforms refer to the systematic process of reviewing, updating, amending,.', answer: 'Law Reforms Landmark Cases and Illustrations', options: ['Law Reforms Landmark Cases and Illustrations', 'Law Reforms Key Concepts and Institutions', 'Law Reforms Constitutional and Legal Provisions', 'Law Reforms Processes and Procedures'] },
            { id: 's4', label: 'Law Reforms Processes and Procedures', prompt: 'Which idea is this? — Law reform is the systematic process of reviewing, updating, and improving existing laws.', answer: 'Law Reforms Processes and Procedures', options: ['Law Reforms Processes and Procedures', 'Law Reforms Key Concepts and Institutions', 'Law Reforms Constitutional and Legal Provisions', 'Law Reforms Landmark Cases and Illustrations'] },
            { id: 's5', label: 'Law Reforms Exam-Oriented Questions and Answers', prompt: 'Which idea is this? — Law reform is the systematic process of reviewing, amending, repealing, or enacting laws.', answer: 'Law Reforms Exam-Oriented Questions and Answers', options: ['Law Reforms Exam-Oriented Questions and Answers', 'Law Reforms Key Concepts and Institutions', 'Law Reforms Constitutional and Legal Provisions', 'Law Reforms Landmark Cases and Illustrations'] },
            { id: 's6', label: 'Law Reforms Critical Analysis and Application', prompt: 'Which idea is this? — Law reform is the process of reviewing, amending, or replacing existing laws to align.', answer: 'Law Reforms Critical Analysis and Application', options: ['Law Reforms Critical Analysis and Application', 'Law Reforms Key Concepts and Institutions', 'Law Reforms Constitutional and Legal Provisions', 'Law Reforms Landmark Cases and Illustrations'] }
          ] } },
        { type: 'case', nodeId: 'c11_leg_cbse_09_006', title: 'You made it',
          caseStudy: { intro: 'You finished Law Reforms — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_leg_cbse_09_001', difficulty: 'standard',
          question: 'Law reform is the systematic process of reviewing, modifying, repealing,.',
          hint: 'Review "Judicial Review" in Separation of Powers chapter (Unit 1, Chapter 3) and.',
          misconception: 'Students believe law reform only happens when Parliament passes a new Act.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Law reform is the systematic process of reviewing, modifying, repealing, or enacting laws',
                  options: ['Law reform is the systematic process of reviewing, modifying, repealing, or enacting laws', 'Law reform is the systematic process of reviewing, revising, updating, or repealing', 'Law reforms refer to the systematic process of reviewing, updating, amending, or', 'Law reform is the systematic process of reviewing, updating, and improving existing laws'],
                  hint: 'Review "Judicial Review" in Separation of Powers chapter (Unit 1, Chapter 3) and "Fundamental.',
                  misconception: 'Students believe law reform only happens when Parliament passes a new Act.' }
          ],
            remediations: { 'law-reform-only-happens-when': { steps: ['If a student says "Law reform = new Act by Parliament": 1.', 'Show the Section 66A timeline: IT Act 2000 (legislative) → Shreya Singhal 2015 (judicial deletion) → no new Act passed.', 'Ask: "Did reform happen?" 2.', 'Give Law Commission 264th Report (2017) → CPA 2019 (enacted 2020).'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe law reform only happens when Parliament passes a new Act.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Consumer Protection Act 2019 is a better example of law reform than the Muslim Women (Protection of Rights on Marriage) Act 2019.', answer: 'Critique: Both are valid reform pathways',
                  options: ['Critique: Both are valid reform pathways', 'only Law Commission route is legitimate', 'law reform only happens when Parliament passes a new Act'],
                  hint: 'Review "Judicial Review" in Separation of Powers chapter (Unit 1, Chapter 3) and "Fundamental.',
                  misconception: 'Students believe law reform only happens when Parliament passes a new Act.' },
                { id: 'b', prompt: 'Design a law reform proposal for a hypothetical gap: "Gig workers (delivery, ride-hail) lack social security coverage under existing labour laws." Specify: (a).', answer: 'which Law Commission report or committee would initiate it, (',
                  options: ['which Law Commission report or committee would initiate it, (', 'law reform only happens when Parliament passes a new Act'],
                  hint: 'Review "Judicial Review" in Separation of Powers chapter (Unit 1, Chapter 3) and "Fundamental.',
                  misconception: 'Students believe law reform only happens when Parliament passes a new Act.' }
          ],
            remediations: { 'law-reform-only-happens-when': { steps: ['If a student says "Law reform = new Act by Parliament": 1.', 'Show the Section 66A timeline: IT Act 2000 (legislative) → Shreya Singhal 2015 (judicial deletion) → no new Act passed.', 'Ask: "Did reform happen?" 2.', 'Give Law Commission 264th Report (2017) → CPA 2019 (enacted 2020).'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_09_002', difficulty: 'standard',
          question: 'Law reform is the systematic process of reviewing, revising, updating,.',
          hint: 'If stuck, review **c11_leg_cbse_03_002 (Basic Features of Constitution)** — focus.',
          misconception: 'Students often believe **law reform = only Parliament passing new Acts**.',
          parts: [
                { id: 'a', prompt: 'What is the constitutional basis for the Law Commission of India\'s existence, and how does it differ from a statutory body like the National Human Rights.', answer: 'The Law Commission of India is **not** a constitutional body',
                  options: ['The Law Commission of India is **not** a constitutional body', 'Article 39A creates the Law Commission', '**law reform = only Parliament passing new Acts**'],
                  hint: 'If stuck, review **c11_leg_cbse_03_002 (Basic Features of Constitution)** — focus on **Part III.',
                  misconception: 'Students often believe **law reform = only Parliament passing new Acts**.' },
                { id: 'b', prompt: 'Explain why the Right to Information Act, 2005 is considered a "law reform" rather than a "new law" in the strict sense, linking it to pre-existing.', answer: 'The RTI Act, 2005 is a **law reform**',
                  options: ['The RTI Act, 2005 is a **law reform**', 'It created a new fundamental right', '**law reform = only Parliament passing new Acts**'],
                  hint: 'If stuck, review **c11_leg_cbse_03_002 (Basic Features of Constitution)** — focus on **Part III.',
                  misconception: 'Students often believe **law reform = only Parliament passing new Acts**.' },
                { id: 'c', prompt: 'A Bill to amend the Indian Penal Code to criminalize "deepfake pornography" is introduced in Lok Sabha.', answer: '(1) **Introduction in Lok Sabha** (Article',
                  options: ['(1) **Introduction in Lok Sabha** (Article', '**law reform = only Parliament passing new Acts**'],
                  hint: 'If stuck, review **c11_leg_cbse_03_002 (Basic Features of Constitution)** — focus on **Part III.',
                  misconception: 'Students often believe **law reform = only Parliament passing new Acts**.' },
                { id: 'd', prompt: 'Compare the **law reform role of the Supreme Court** under **Article 32** (writ jurisdiction) vs. **Article 136** (special leave to appeal) vs.', answer: '- **Article 32**: Direct access for **fundamental rights enforcement**',
                  options: ['- **Article 32**: Direct access for **fundamental rights enforcement**', 'both are appeals', '**law reform = only Parliament passing new Acts**'],
                  hint: 'If stuck, review **c11_leg_cbse_03_002 (Basic Features of Constitution)** — focus on **Part III.',
                  misconception: 'Students often believe **law reform = only Parliament passing new Acts**.' }
          ],
            remediations: { 'law-reform-only-parliament-passing': { steps: ['If a student says "only Parliament reforms laws", do this: 1.', 'Show the **Vishakha → POSH timeline** (1997 guidelines → 2013 Act) — ask: "Was there *no law* against sexual harassment.', 'Map **Article 141** ("law declared by SC binding on all courts") → explain how **judicial precedent *is* law** until.', 'Contrast **delegated legislation** (e.g., IT Rules, 2021 under Section 87 IT Act) — made by Executive, not Parliament.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_09_003', difficulty: 'standard',
          question: 'Law reforms refer to the systematic process of reviewing, updating, amending.',
          hint: 'If stuck, revisit the concept of “judicial review” and “fundamental rights” from.',
          misconception: 'Students often believe law reform in India means only Parliament passing new Acts, overlooking that judicial.',
          parts: [
                { id: 'a', prompt: 'A new app allows users to anonymously post unverified rumors about celebrities.', answer: 'Step 1: Identify the conflict—celebrities’ right to reputation (Article 21) vs',
                  options: ['Step 1: Identify the conflict—celebrities’ right to reputation (Article 21) vs', 'yes, because celebrities’ rights are more important'],
                  hint: 'If stuck, revisit the concept of “judicial review” and “fundamental rights” from.',
                  misconception: 'Students often believe law reform in India means only Parliament passing new Acts, overlooking that judicial interpretations (e.g.' }
          ],
            remediations: { 'law-reform-in-india-means': { steps: ['To fix this, guide the student to compare two timelines: First, list the events for the right to privacy—2017.', 'Then, contrast with RTI Act—2002–2004 MKSS protests → 2005 RTI Act (legislative reform) → 2005–2006 CIC guidelines.', 'Ask: “In which case did the reform start with the judiciary?', 'With administration?” Emphasize that reform is a cycle: societal need → judicial interpretation (if rights violated) →.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_09_004', difficulty: 'standard',
          question: 'Law reform is the systematic process of reviewing, updating, and improving.',
          hint: 'If confused about legislative hierarchy, review c11_pol_cbse_03_004 (Legislature) and.',
          misconception: 'Students believe law reform is synonymous with "Parliament passing a new Act." They overlook the *pre-legislative*.',
          parts: [
                { id: 'a', prompt: 'What is the primary statutory mechanism for initiating systematic law reform in post-independence India, and who constitutes it?', answer: 'The primary mechanism is the Law Commission of India, constituted by a executive',
                  options: ['The primary mechanism is the Law Commission of India, constituted by a executive', 'Parliamentary Standing Committee', 'National Human Rights Commission', 'Parliament passing a new Act'],
                  hint: 'If confused about legislative hierarchy, review c11_pol_cbse_03_004 (Legislature) and.',
                  misconception: 'Students believe law reform is synonymous with "Parliament passing a new Act." They overlook the *pre-legislative* architecture: Law.' },
                { id: 'b', prompt: 'The Supreme Court in *Shreya Singhal v. Union of India* (2015) struck down Section 66A IT Act.', answer: '(1) Court declares 66A unconstitutional (void ab initio)',
                  options: ['(1) Court declares 66A unconstitutional (void ab initio)', 'Parliament passing a new Act', 'law reform is synonymous with "Parliament passing a new Act'],
                  hint: 'If confused about legislative hierarchy, review c11_pol_cbse_03_004 (Legislature) and.',
                  misconception: 'Students believe law reform is synonymous with "Parliament passing a new Act." They overlook the *pre-legislative* architecture: Law.' }
          ],
            remediations: { 'law-reform-is-synonymous-with': { steps: ['If a student equates law reform with Parliamentary passage only: (1) Assign them to trace *one* recent reform (e.g.', '(2) Ask them to identify *which* stage added the "product liability" clause (Standing Committee, 2019) vs "e-commerce.', '(3) Have them compare the 2015 draft Bill (lapsed) with 2019 Act — noting 17 substantive changes from Standing.', '(4) Conclude: "Parliament is the *gate*, not the *garden*.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_09_005', difficulty: 'standard',
          question: 'Law reform is the systematic process of reviewing, amending, repealing,.',
          hint: 'If stuck, review **c11_leg_cbse_03_004 (Sources of Law)** for the distinction between.',
          misconception: 'Students believe **law reform = passing a new Act**. They miss that *reform* includes: (a) **judicial.',
          parts: [
                { id: 'a', prompt: 'A student argues: "The Consumer Protection Act, 2019 is just an amendment — it didn\'t change the fundamental structure of consumer courts." Apply the concept.', answer: '**Steps to evaluate:** 1',
                  options: ['**Steps to evaluate:** 1', 'consumer courts still exist', '**law reform = passing a new Act**'],
                  hint: 'If stuck, review **c11_leg_cbse_03_004 (Sources of Law)** for the distinction between legislation.',
                  misconception: 'Students believe **law reform = passing a new Act**. They miss that *reform* includes: (a) **judicial reinterpretation** (e.g., *Navtej.' }
          ],
            remediations: { 'law-reform-passing-a-new': { steps: ['**Diagnose**: Ask the student to list *three types of law reform* without using the word "Act." If they stall, they\'re.', '**Remediate**: Show a **Venn diagram**: Circle A = Legislative (Acts, amendments, repeals); Circle B = Judicial.', 'Overlap = *sustained reform* (e.g., POSH Act: Vishakha guidelines [B] → Act [A] → Rules/Committees [C]).', '**Apply**: Give a mini-case: "The Supreme Court in *Common Cause v.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_09_006', difficulty: 'standard',
          question: 'Law reform is the process of reviewing, amending, or replacing existing laws.',
          hint: 'Review how the judiciary can initiate reform via guidelines (e.g., Vishakha) when.',
          misconception: 'Students often believe that law reform simply means passing a new Act or amendment, and that once a law is made, the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Law reform is the process of reviewing, amending, or replacing existing laws to align',
                  options: ['Law reform is the process of reviewing, amending, or replacing existing laws to align', 'Law reform is the systematic process of reviewing, modifying, repealing, or enacting laws', 'Law reform is the systematic process of reviewing, revising, updating, or repealing', 'Law reforms refer to the systematic process of reviewing, updating, amending, or'],
                  hint: 'Review how the judiciary can initiate reform via guidelines (e.g., Vishakha) when legislation.',
                  misconception: 'Students often believe that law reform simply means passing a new Act or amendment, and that once a law is made, the problem is solved.' }
          ],
            remediations: { 'law-reform-simply-means-passing': { steps: ['To fix this, guide the student to analyze a real reform’s implementation: Take the POSH Act—ask, “What happens if.', 'Emphasize that a law’s success depends on its enforcement structure, not just its passage—using case studies where.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
