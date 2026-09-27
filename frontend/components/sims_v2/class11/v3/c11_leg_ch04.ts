import type { SimDef } from '../../engine/types';

/** v3 generated — c11_leg_ch04 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_leg_ch04: SimDef = {
    id: 'v3_c11_leg_ch04',
    title: 'Salient Features of the Constitution of India',
    subtitle: 'This node covers the Salient Features of the Constitution of India (Chapter 4, Unit 2).',
    classLevel: 11, subject: 'leg', topic: 'Salient Features of the Constitution of India',
    chapters: ['c11_leg_ch04'],
    nodeIds: ['c11_leg_cbse_04_001', 'c11_leg_cbse_04_002', 'c11_leg_cbse_04_003', 'c11_leg_cbse_04_004', 'c11_leg_cbse_04_005', 'c11_leg_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start with a relatable scenario: "You post a video criticizing a government policy on social media.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'What is the precise legal definition of "State" under Article 12 of the Constitution of India, and why is it placed in Part III (Fundamental Rights) rather.',
        options: ['Article 12 defines "State" as: (i) Government and Parliament of India', 'State means only the central government', 'Federal in form, Unitary in spirit'],
        answer: 'Article 12 defines "State" as: (i) Government and Parliament of India',
        hook: 'Students often believe "Federal in form, Unitary in spirit" (K.C. Wheare) means India is *not truly federal*.',
    },
    teaching: [
        { title: 'Salient Features of the Constitution of India — Key Concepts and Institutions', text: 'The Constitution of India is the supreme written legal document that establishes the framework of the Indian State, defines the structure, powers, and functions of its three organs (Legislature.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_leg_cbse_04_001', title: 'Salient Features of the Constitution of India — Key Concepts and Institutions',
          caseStudy: { intro: 'Start with a relatable scenario: "You post a video criticizing a government policy on social media.',
            decisions: [{ prompt: 'What is the precise legal definition of "State" under Article 12 of the Constitution of India, and why is it placed in Part III.', options: [
                { text: 'Article 12 defines "State" as: (i) Government and Parliament of India', outcome: 'Article 12 defines "State" as: (i) Government and Parliament of India; (ii) Government and.' },
                { text: 'State means only the central government', outcome: 'Not quite — Students often believe "Federal in form, Unitary in spirit" (K.C.', reveals: 'federal-in-form' },
                { text: 'Federal in form, Unitary in spirit', outcome: 'Not quite — Students often believe "Federal in form, Unitary in spirit" (K.C.', reveals: 'federal-in-form' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_04_002', title: 'Salient Features of the Constitution of India — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start by asking: "If a government-run hospital denies you emergency treatment, can you sue it for violating your Right to Life under Article 21?" This hooks.',
            decisions: [{ prompt: 'What are the four categories of entities included in the definition of "State" under Article 12 of the Constitution of India?', options: [
                { text: 'The four categories are: (1) Government and Parliament of India (Union Executive and', outcome: 'The four categories are: (1) Government and Parliament of India (Union Executive and Legislature).' },
                { text: 'other authorities', outcome: 'Not quite — Students believe "State" under Article 12 means only elected governments (Parliament, State.', reveals: 'state-under-article-12-means' },
                { text: 'Government', outcome: 'Not quite — Students believe "State" under Article 12 means only elected governments (Parliament, State.', reveals: 'state-under-article-12-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_04_003', title: 'Salient Features of the Constitution of India — Landmark Cases and Illustrations',
          caseStudy: { intro: '**Start here:** "You know the Constitution says \'India is a Union of States\' (Article 1) and has \'Fundamental Rights\' (Part III).',
            decisions: [{ prompt: '**REMEMBER LEVEL:** List the three specific components of the \'Basic Structure Doctrine\' as enumerated in the *Kesavananda Bharati (1973)*.', options: [
                { text: '**Correct Answer:** Supremacy of the Constitution', outcome: '**Correct Answer:** Supremacy of the Constitution; Republican and Democratic form of Government.' },
                { text: 'Fundamental Rights', outcome: 'Not quite — **The "Case Name = Feature" Rote Memorization Trap:** Students memorize "*Kesavananda* = Basic.', reveals: 'the-case-name-feature-rote' },
                { text: 'Preamble', outcome: 'Not quite — **The "Case Name = Feature" Rote Memorization Trap:** Students memorize "*Kesavananda* = Basic.', reveals: 'the-case-name-feature-rote' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_04_004', title: 'Salient Features of the Constitution of India — Processes and Procedures',
          caseStudy: { intro: 'Start with a real-world trigger: "A news headline says \'President promulgates Ordinance on data protection.\' Ask: Can the President just make laws whenever.',
            decisions: [{ prompt: 'What is the maximum time period within which an Ordinance promulgated by the President under Article 123 must be approved by Parliament.', options: [
                { text: 'An Ordinance must be approved by Parliament within six weeks of its reassembly', outcome: 'An Ordinance must be approved by Parliament within six weeks of its reassembly.' },
                { text: 'six months', outcome: 'Not quite — Students believe the President is a "rubber stamp" with no real power, and conversely, that the.', reveals: 'the-president-is-a-rubber' },
                { text: 'no time limit', outcome: 'Not quite — Students believe the President is a "rubber stamp" with no real power, and conversely, that the.', reveals: 'the-president-is-a-rubber' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_04_005', title: 'Salient Features of the Constitution of India — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'Start with this scenario: "You\'re drafting a constitution for a new country with 28 states, 8 UTs, 22 official languages, and 1.4 billion people.',
            decisions: [{ prompt: 'List the three categories of legislative powers in the Seventh Schedule and state which level of government has exclusive authority over.', options: [
                { text: 'The three categories are Union List (99 subjects, exclusive to Centre), State List (61', outcome: 'The three categories are Union List (99 subjects, exclusive to Centre), State List (61 subjects.' },
                { text: 'Unitary in spirit', outcome: 'Not quite — Students conflate "Federal" with "Centre-State equality." They think: "India is Federal → States.', reveals: 'students-conflate-federal-with-centre' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_04_006', title: 'Salient Features of the Constitution of India — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a **real CBSE 2023 question**: *"‘The Indian Constitution is federal in form but unitary in spirit.’ Critically examine this statement with.',
            decisions: [{ prompt: 'Define "Basic Structure Doctrine" and name the *single* case that established it as a limitation on Parliament\'s amending power under.', options: [
                { text: '**Correct Answer**: The Basic Structure Doctrine holds that Parliament cannot amend the', outcome: '**Correct Answer**: The Basic Structure Doctrine holds that Parliament cannot amend the.' },
                { text: 'Parliament cannot amend Fundamental Rights', outcome: 'Not quite — **Students conflate "Critical Analysis" with "Listing Negatives".** They think: *"Critically.', reveals: 'students-conflate-critical-analysis-with' },
                { text: 'Parliament cannot amend Basic Structure', outcome: 'Not quite — **Students conflate "Critical Analysis" with "Listing Negatives".** They think: *"Critically.', reveals: 'students-conflate-critical-analysis-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_04_004', title: 'Salient Features of the Constitution of India — Processes and Procedures',
          caseStudy: { intro: 'Start with a real-world trigger: "A news headline says \'President promulgates Ordinance on data protection.\' Ask: Can the President just make laws whenever.',
            decisions: [{ prompt: 'What is the maximum time period within which an Ordinance promulgated by the President under Article 123 must be approved by Parliament.', options: [
                { text: 'An Ordinance must be approved by Parliament within six weeks of its reassembly', outcome: 'An Ordinance must be approved by Parliament within six weeks of its reassembly.' },
                { text: 'six months', outcome: 'Not quite — Students believe the President is a "rubber stamp" with no real power, and conversely, that the.', reveals: 'the-president-is-a-rubber' },
                { text: 'no time limit', outcome: 'Not quite — Students believe the President is a "rubber stamp" with no real power, and conversely, that the.', reveals: 'the-president-is-a-rubber' }
            ] }] } },
        { type: 'build', nodeId: 'c11_leg_cbse_04_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['List the *Ajay Hasia* factors: (a) Government share.', 'Apply facts: (a) 100% Govt ownership → financial control ✓.', 'Identify the legal question — Is Bharat Energy Ltd. "State".', 'Conclusion — All factors satisfied. Bharat Energy Ltd.', 'Constitutional consequence — Termination without hearing.'], answer: 'Identify the legal question — Is Bharat Energy Ltd. "State". List the *Ajay Hasia* factors: (a) Government share. Apply facts: (a) 100% Govt ownership → financial control ✓. Conclusion — All factors satisfied. Bharat Energy Ltd. Constitutional consequence — Termination without hearing.' } },
        { type: 'case', nodeId: 'c11_leg_cbse_04_006', title: 'You made it',
          caseStudy: { intro: 'You finished Salient Features of the Constitution of India — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_leg_cbse_04_001', difficulty: 'standard',
          question: 'The Constitution of India is the supreme written legal document that.',
          hint: 'Review Class 11 Political Science Chapter 1 ("Constitution: Why and How?") and Chapter 2.',
          misconception: 'Students often believe "Federal in form, Unitary in spirit" (K.C. Wheare) means India is *not truly federal*.',
          parts: [
                { id: 'a', prompt: 'What is the precise legal definition of "State" under Article 12 of the Constitution of India, and why is it placed in Part III (Fundamental Rights) rather.', answer: 'Article 12 defines "State" as: (i) Government and Parliament of India',
                  options: ['Article 12 defines "State" as: (i) Government and Parliament of India', 'State means only the central government', 'Federal in form, Unitary in spirit', '"Federal in form, Unitary in spirit" (K'],
                  hint: 'Review Class 11 Political Science Chapter 1 ("Constitution: Why and How?") and Chapter 2 ("Rights.',
                  misconception: 'Students often believe "Federal in form, Unitary in spirit" (K.C. Wheare) means India is *not truly federal*. This is wrong.' },
                { id: 'b', prompt: 'Explain why the Supreme Court in *Kesavananda Bharati* (1973) held that the Preamble is part of the Constitution and embodies its "Basic Structure," despite.', answer: '*Berubari* treated Preamble as a mere preface with no legal effect',
                  options: ['*Berubari* treated Preamble as a mere preface with no legal effect', 'We the People', 'Basic Structure', 'Preamble is just introductory'],
                  hint: 'Review Class 11 Political Science Chapter 1 ("Constitution: Why and How?") and Chapter 2 ("Rights.',
                  misconception: 'Students often believe "Federal in form, Unitary in spirit" (K.C. Wheare) means India is *not truly federal*. This is wrong.' },
                { id: 'c', prompt: 'A government-funded university denies admission to a student based on caste. The student files a writ petition under Article 32.', answer: 'Step 1: Identify the test',
                  options: ['Step 1: Identify the test', 'Autonomous body ≠ State', 'Federal in form, Unitary in spirit', '"Federal in form, Unitary in spirit" (K'],
                  hint: 'Review Class 11 Political Science Chapter 1 ("Constitution: Why and How?") and Chapter 2 ("Rights.',
                  misconception: 'Students often believe "Federal in form, Unitary in spirit" (K.C. Wheare) means India is *not truly federal*. This is wrong.' },
                { id: 'd', prompt: 'Compare the writ jurisdiction of the Supreme Court (Article 32) and High Courts (Article 226) on three dimensions: (a) Purpose, (b) Discretion to refuse, (c).', answer: 'Purpose, (',
                  options: ['Purpose, (', 'Both are same', 'Federal in form, Unitary in spirit', '"Federal in form, Unitary in spirit" (K'],
                  hint: 'Review Class 11 Political Science Chapter 1 ("Constitution: Why and How?") and Chapter 2 ("Rights.',
                  misconception: 'Students often believe "Federal in form, Unitary in spirit" (K.C. Wheare) means India is *not truly federal*. This is wrong.' }
          ],
            remediations: { 'federal-in-form': { steps: ['If the student conflates "federal" with "sovereign states," do this: (1) Draw a 2x2 matrix: Normal Times vs Emergency.', '(2) Fill normal times: State List = State legislature/executive; Union List = Centre; Concurrent = both.', '(3) Fill emergency: Art 352 → Parliament legislates on State List; Art 356 → President assumes State executive power.', '(4) Ask: "Does the State *cease to exist* during emergency?" No — it\'s suspended, not abolished.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "Federal in form, Unitary in spirit" (K.C. Wheare) means India is *not truly federal*.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate: "The distinction between Fundamental Rights (Part III) and Directive Principles (Part IV) is artificial because courts have read DPSPs.', answer: 'The distinction remains *doctrinally* valid but *functionally* eroded',
                  options: ['The distinction remains *doctrinally* valid but *functionally* eroded', 'DPSPs are now fully justiciable', 'Federal in form, Unitary in spirit', '"Federal in form, Unitary in spirit" (K'],
                  hint: 'Review Class 11 Political Science Chapter 1 ("Constitution: Why and How?") and Chapter 2 ("Rights.',
                  misconception: 'Students often believe "Federal in form, Unitary in spirit" (K.C. Wheare) means India is *not truly federal*. This is wrong.' },
                { id: 'b', prompt: 'Design a hypothetical constitutional amendment that would *violate* the Basic Structure doctrine per *Kesavananda Bharati* and *IR Coelho* (2007).', answer: 'Proposed Amendment: "Article 32 (Right to Constitutional Remedies) is deleted',
                  options: ['Proposed Amendment: "Article 32 (Right to Constitutional Remedies) is deleted', 'Federal in form, Unitary in spirit', '"Federal in form, Unitary in spirit" (K'],
                  hint: 'Review Class 11 Political Science Chapter 1 ("Constitution: Why and How?") and Chapter 2 ("Rights.',
                  misconception: 'Students often believe "Federal in form, Unitary in spirit" (K.C. Wheare) means India is *not truly federal*. This is wrong.' }
          ],
            remediations: { 'federal-in-form': { steps: ['If the student conflates "federal" with "sovereign states," do this: (1) Draw a 2x2 matrix: Normal Times vs Emergency.', '(2) Fill normal times: State List = State legislature/executive; Union List = Centre; Concurrent = both.', '(3) Fill emergency: Art 352 → Parliament legislates on State List; Art 356 → President assumes State executive power.', '(4) Ask: "Does the State *cease to exist* during emergency?" No — it\'s suspended, not abolished.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_04_002', difficulty: 'standard',
          question: 'Article 12 of the Constitution of India defines the term "State" for the.',
          hint: 'If stuck, review the "State vs Government" table in Chapter 1 (Concept of State) and the.',
          misconception: 'Students believe "State" under Article 12 means only elected governments (Parliament, State Legislatures) and that.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the judiciary is not explicitly included in Article 12\'s definition of "State," and what the practical consequence is for.', answer: 'The judiciary is excluded from Article 12 to protect judicial independence',
                  options: ['The judiciary is excluded from Article 12 to protect judicial independence', 'judiciary is never State', 'judiciary is always State', 'other authorities'],
                  hint: 'If stuck, review the "State vs Government" table in Chapter 1 (Concept of State) and the "Writ.',
                  misconception: 'Students believe "State" under Article 12 means only elected governments (Parliament, State Legislatures) and that private bodies can never.' },
                { id: 'b', prompt: 'A private university receives 90% of its funding from the State Government, its governing body is appointed by the Government, and it performs public functions.', answer: 'Yes, the student can file a writ petition',
                  options: ['Yes, the student can file a writ petition', 'private', 'other authorities'],
                  hint: 'If stuck, review the "State vs Government" table in Chapter 1 (Concept of State) and the "Writ.',
                  misconception: 'Students believe "State" under Article 12 means only elected governments (Parliament, State Legislatures) and that private bodies can never.' }
          ],
            remediations: { 'state-under-article-12-means': { steps: ['If the student confuses "Government" with "State" or treats Article 12 as a closed list: (1) Draw a Venn diagram.', '(2) Give three entities: (a) Municipal Corporation, (b) LIC, (c) Private unaided school.', 'Ask: "Which are \'State\' under Article 12?" Walk through each using the instrumentality test checklist.', 'Shetty* five-factor table as a memory aid — make them apply it to 5 new entities (e.g., IITs, Delhi Metro, RBI, AIIMS.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_04_003', difficulty: 'standard',
          question: 'Landmark Cases and Illustrations refer to the binding judicial precedents.',
          hint: 'If stuck on *which case maps to which feature*, return to **Node 1 (c11_leg_cbse_04_001).',
          misconception: '**The "Case Name = Feature" Rote Memorization Trap:** Students memorize "*Kesavananda* = Basic Structure" and "*Maneka.',
          parts: [
                { id: 'a', prompt: '**REMEMBER LEVEL:** List the three specific components of the \'Basic Structure Doctrine\' as enumerated in the *Kesavananda Bharati (1973)* judgment that are.', answer: '**Correct Answer:** Supremacy of the Constitution',
                  options: ['**Correct Answer:** Supremacy of the Constitution', 'Fundamental Rights', 'Preamble'],
                  hint: 'If stuck on *which case maps to which feature*, return to **Node 1 (c11_leg_cbse_04_001) Section.',
                  misconception: '**The "Case Name = Feature" Rote Memorization Trap:** Students memorize "*Kesavananda* = Basic Structure" and "*Maneka Gandhi* = Article.' }
          ],
            remediations: { 'the-case-name-feature-rote': { steps: ['Deconstruct the "Constitutional Crisis" — Don\'t start with the Case Name.** Ask: "What was the *Government action*.', 'Identify the *Specific Constitutional Text* in dispute (Art 368, Art 21, Art 12, Art 356).** **', 'Trace the *Precedent Chain*:** *A.K. Gopalan* (1950) -> *Maneka Gandhi* (1978) [Overruling]; *Shankari Prasad* (1951).', 'Extract the *Legal Formula/Test* created (e.g., "Fair, Just, Reasonable Procedure"; "Basic Structure = Identity.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_04_004', difficulty: 'standard',
          question: '"Salient Features of the Constitution of India — Processes and Procedures".',
          hint: 'Review the "Checks and Balances" table in Chapter 3 (Separation of Powers) — specifically.',
          misconception: 'Students believe the President is a "rubber stamp" with no real power, and conversely, that the President can "veto".',
          parts: [
                { id: 'a', prompt: 'What is the maximum time period within which an Ordinance promulgated by the President under Article 123 must be approved by Parliament after its reassembly?', answer: 'An Ordinance must be approved by Parliament within six weeks of its reassembly',
                  options: ['An Ordinance must be approved by Parliament within six weeks of its reassembly', 'six months', 'no time limit', 'rubber stamp'],
                  hint: 'Review the "Checks and Balances" table in Chapter 3 (Separation of Powers) — specifically how.',
                  misconception: 'Students believe the President is a "rubber stamp" with no real power, and conversely, that the President can "veto" laws like the.' },
                { id: 'b', prompt: 'A Bill is passed by both Houses of Parliament and sent to the President. The President withholds assent and returns it with a message for reconsideration.', answer: 'Under Article 111, the President *must* give assent',
                  options: ['Under Article 111, the President *must* give assent', 'rubber stamp'],
                  hint: 'Review the "Checks and Balances" table in Chapter 3 (Separation of Powers) — specifically how.',
                  misconception: 'Students believe the President is a "rubber stamp" with no real power, and conversely, that the President can "veto" laws like the.' },
                { id: 'c', prompt: 'Compare the writ jurisdiction of the Supreme Court under Article 32 and the High Courts under Article 226.', answer: 'Procedural: (1) Art',
                  options: ['Procedural: (1) Art', 'rubber stamp'],
                  hint: 'Review the "Checks and Balances" table in Chapter 3 (Separation of Powers) — specifically how.',
                  misconception: 'Students believe the President is a "rubber stamp" with no real power, and conversely, that the President can "veto" laws like the.' }
          ],
            remediations: { 'the-president-is-a-rubber': { steps: ['If the student holds this misconception: (1) Show Art.', '74(1) — "aid and advice of Council of Ministers" — and Art.', '75(3) — "collective responsibility to Lok Sabha." (2) Walk through the *Shamsher Singh v.', 'State of Punjab* (1974) judgment: "President is a formal head...'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_04_005', difficulty: 'standard',
          question: 'The Salient Features of the Constitution of India refer to the distinctive.',
          hint: 'If stuck on Basic Structure application: Revisit c11_leg_cbse_04_004 (Procedural node).',
          misconception: 'Students conflate "Federal" with "Centre-State equality." They think: "India is Federal → States have coordinate.',
          parts: [
                { id: 'a', prompt: 'A new law passed by Parliament amends Article 368 to state: "No constitutional amendment shall be challenged in any court on any ground." Using the Basic.', answer: 'Invalid',
                  options: ['Invalid', 'Valid because Parliament has constituent power under Art 368'],
                  hint: 'If stuck on Basic Structure application: Revisit c11_leg_cbse_04_004 (Procedural node) — it has the.',
                  misconception: 'Students conflate "Federal" with "Centre-State equality." They think: "India is Federal → States have coordinate sovereignty → Centre.' },
                { id: 'b', prompt: 'Compare the writ jurisdiction of the Supreme Court (Art 32) and High Courts (Art 226) on three parameters: (a) Purpose, (b) Territorial scope, (c) Discretion.', answer: 'Purpose, (',
                  options: ['Purpose, (', 'Both can refuse', 'SC has wider territorial scope but same purpose'],
                  hint: 'If stuck on Basic Structure application: Revisit c11_leg_cbse_04_004 (Procedural node) — it has the.',
                  misconception: 'Students conflate "Federal" with "Centre-State equality." They think: "India is Federal → States have coordinate sovereignty → Centre.' }
          ],
            remediations: { 'students-conflate-federal-with-centre': { steps: ['**Re-read Art 1 & 3**: "Union of States" + "Parliament can alter State boundaries" = States not indestructible.', '**Map 7th Schedule**: List 5 Union, 5 State, 5 Concurrent subjects — see Centre\'s dominance (Defence, Currency, Atomic.', '**Trace Emergency flow**: Art 352 (National) → Centre directs States; Art 356 (State) → Centre dismisses State govt.', '**Write one paragraph**: "Three unitary features that override federal form: [1] Single Citizenship (Art 5-11), [2].'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_04_006', difficulty: 'standard',
          question: 'Critical Analysis and Application of Salient Features of the Constitution.',
          hint: 'If stuck: **Re-do Node 004 (Amendment/Basic Structure/Emergency) and Node 005.',
          misconception: '**Students conflate "Critical Analysis" with "Listing Negatives".** They think: *"Critically analyse Federalism".',
          parts: [
                { id: 'a', prompt: 'Explain *in your own words* why the Directive Principles of State Policy (DPSP) were made **non-justiciable** (Article 37), yet the Supreme Court has.', answer: '**Correct Answer**: DPSPs are non-justiciable',
                  options: ['**Correct Answer**: DPSPs are non-justiciable', 'DPSPs are now justiciable'],
                  hint: 'If stuck: **Re-do Node 004 (Amendment/Basic Structure/Emergency) and Node 005 (Centre-State.',
                  misconception: '**Students conflate "Critical Analysis" with "Listing Negatives".** They think: *"Critically analyse Federalism" = "Write all problems.' },
                { id: 'b', prompt: '**APPLY**: A new law, the **"National Education Standards Act, 2025"**, is passed by Parliament under **Article 249** (Rajya Sabha resolution: 2/3 majority.', answer: '**Correct Answer with Steps**: 1',
                  options: ['**Correct Answer with Steps**: 1', 'Article 249 = Parliament can do anything'],
                  hint: 'If stuck: **Re-do Node 004 (Amendment/Basic Structure/Emergency) and Node 005 (Centre-State.',
                  misconception: '**Students conflate "Critical Analysis" with "Listing Negatives".** They think: *"Critically analyse Federalism" = "Write all problems.' },
                { id: 'c', prompt: '**ANALYZE**: Compare the **amendment procedures** for: (a) Changing the **Preamble** (e.g., adding "Socialist", "Secular" — 42nd Amendment) (b) Altering.', answer: '**Correct Answer**: - **(a) Preamble**: Special majority (Art 368)',
                  options: ['**Correct Answer**: - **(a) Preamble**: Special majority (Art 368)', 'Preamble cannot be amended', 'Article 3 requires State *consent*'],
                  hint: 'If stuck: **Re-do Node 004 (Amendment/Basic Structure/Emergency) and Node 005 (Centre-State.',
                  misconception: '**Students conflate "Critical Analysis" with "Listing Negatives".** They think: *"Critically analyse Federalism" = "Write all problems.' }
          ],
            remediations: { 'students-conflate-critical-analysis-with': { steps: ['**If student writes a "list of problems" answer**: 1.', '**Interrupt**: "You\'ve identified *symptoms*.', 'Now diagnose the *disease* and the *treatment*." 2.', '**Map the 4-box framework on board**: - **Textual Design** (What does Constitution *say*?'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
