import type { SimDef } from '../../engine/types';

/** v3 generated — c12_leg_ch07 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_leg_ch07: SimDef = {
    id: 'v3_c12_leg_ch07',
    title: 'Law and Sustainable Development',
    subtitle: 'This node covers: constitutional basis (Articles 21, 48A, 51A(g)), international origins.',
    classLevel: 12, subject: 'leg', topic: 'Law and Sustainable Development',
    chapters: ['c12_leg_ch07'],
    nodeIds: ['c12_leg_cbse_07_001', 'c12_leg_cbse_07_002', 'c12_leg_cbse_07_003', 'c12_leg_cbse_07_004', 'c12_leg_cbse_07_005', 'c12_leg_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with this question: "Your neighbourhood factory releases black smoke every evening.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Evaluate: "The Polluter Pays Principle is fully implemented in India through the Environment Protection Act, 1986 and the absolute liability doctrine." Support.',
        options: ['Judgment: *Partially true*', 'fully implemented', 'not implemented'],
        answer: 'Judgment: *Partially true*',
        hook: 'Students believe "Sustainable Development = Environmental Protection only" and cite only pollution cases.',
    },
    teaching: [
        { title: 'Law and Sustainable Development — Key Concepts and Institutions', text: 'Sustainable Development in law is a constitutional and statutory framework that mandates economic growth which meets present needs without compromising the ability of future generations to meet their.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_leg_cbse_07_001', title: 'Law and Sustainable Development — Key Concepts and Institutions',
          caseStudy: { intro: 'Start with this question: "Your neighbourhood factory releases black smoke every evening. Your grandmother develops asthma. Who do you blame?',
            decisions: [{ prompt: 'What is the constitutional source of the "right to clean environment" in India, and which case first recognized it as part of Article 21?', options: [
                { text: 'The right to clean environment is not explicitly in the Constitution but was read into', outcome: 'The right to clean environment is not explicitly in the Constitution but was read into Article 21.' },
                { text: 'Sustainable Development = Environmental Protection only', outcome: 'Not quite — Students believe "Sustainable Development = Environmental Protection only" and cite only pollution.', reveals: 'sustainable-development-environmental-protection' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_07_002', title: 'Law and Sustainable Development — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with this scenario: "A thermal power plant in Singrauli, Madhya Pradesh emits fly ash contaminating groundwater. Villagers suffer respiratory diseases.',
            decisions: [{ prompt: 'Which constitutional article was inserted by the 42nd Amendment Act, 1976 and explicitly directs the State to "protect and improve the.', options: [
                { text: 'Article 48A', outcome: 'Article 48A. A wrong answer (e.g., Article 21, Article 51A(g), Article 38) reveals the student.' },
                { text: 'Under which Part of the Constitution does this provision fall?', outcome: 'Not quite — Students believe Article 48A (Directive Principle) is non-justiciable and therefore "weaker" than.', reveals: 'article-48a-directive-principle-is' },
                { text: 'weaker', outcome: 'Not quite — Students believe Article 48A (Directive Principle) is non-justiciable and therefore "weaker" than.', reveals: 'article-48a-directive-principle-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_07_003', title: 'Law and Sustainable Development — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with this question: *"A chemical plant leaks toxic gas at midnight in a densely populated area — 2,000 die, 600,000 injured.',
            decisions: [{ prompt: 'In the *Oleum Gas Leak Case (M.C. Mehta v. Union of India, 1987)*, the Supreme Court held that an enterprise engaged in hazardous activity.', options: [
                { text: 'Correct answer: **(d) All of the above**', outcome: 'Correct answer: **(d) All of the above**. The Court explicitly ruled that *no exceptions* — not Act.' },
                { text: 'only \'Act of God\'', outcome: 'Not quite — **Students write**: *"Absolute Liability and Strict Liability are the same — both mean liability.', reveals: 'students-write-absolute-liability-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_07_004', title: 'Law and Sustainable Development — Processes and Procedures',
          caseStudy: { intro: 'Start with a real headline: *"Villagers in Raigarh stop a coal mine expansion because the Public Hearing was held 50km away from the affected village."* Ask.',
            decisions: [{ prompt: 'What is the statutory limitation period for filing an Application before the National Green Tribunal (NGT) challenging an Environmental.', options: [
                { text: 'The limitation period is **30 days** from the date of the EC order (or communication of', outcome: 'The limitation period is **30 days** from the date of the EC order (or communication of the.' },
                { text: '90 days straight', outcome: 'Not quite — **"PIL can be filed in *any* court for *any* environmental issue."** Students write: "We will file.', reveals: 'pil-can-be-filed-in' },
                { text: '1 year like writs', outcome: 'Not quite — **"PIL can be filed in *any* court for *any* environmental issue."** Students write: "We will file.', reveals: 'pil-can-be-filed-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_07_005', title: 'Law and Sustainable Development — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'Start with a real scenario: "A factory in your district discharges untreated chemical waste into a river. Villagers downstream get sick.',
            decisions: [{ prompt: 'Which constitutional article was interpreted by the Supreme Court to include the "right to a clean and healthy environment" as part of the.', options: [
                { text: 'Article 21', outcome: 'Article 21. A wrong answer (e.g., Article 48A or 51A(g)) reveals confusion between fundamental.' },
                { text: 'sustainable development', outcome: 'Not quite — Students believe "sustainable development" means stopping all industrial projects to protect.', reveals: 'sustainable-development-means-stopping-all' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_07_006', title: 'Law and Sustainable Development — Critical Analysis and Application',
          caseStudy: { intro: 'Start with this scenario: "A chemical factory wants to set up near a river that supplies drinking water to 50 villages.',
            decisions: [{ prompt: 'State the three constitutional provisions that form the core of India\'s environmental jurisprudence and explain how Article 21 has been.', options: [
                { text: 'The three provisions are Article 21 (Right to Life), Article 48A (Directive Principle:', outcome: 'The three provisions are Article 21 (Right to Life), Article 48A (Directive Principle: State shall.' },
                { text: 'sustainable development', outcome: 'Not quite — Students believe "sustainable development" is a *policy goal* (like Directive Principles) and *not.', reveals: 'sustainable-development-is-a-policy' },
                { text: 'lists only statutes (e', outcome: 'Not quite — Students believe "sustainable development" is a *policy goal* (like Directive Principles) and *not.', reveals: 'sustainable-development-is-a-policy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_07_005', title: 'Law and Sustainable Development — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'Start with a real scenario: "A factory in your district discharges untreated chemical waste into a river. Villagers downstream get sick.',
            decisions: [{ prompt: 'Which constitutional article was interpreted by the Supreme Court to include the "right to a clean and healthy environment" as part of the.', options: [
                { text: 'Article 21', outcome: 'Article 21. A wrong answer (e.g., Article 48A or 51A(g)) reveals confusion between fundamental.' },
                { text: 'sustainable development', outcome: 'Not quite — Students believe "sustainable development" means stopping all industrial projects to protect.', reveals: 'sustainable-development-means-stopping-all' }
            ] }] } },
        { type: 'build', nodeId: 'c12_leg_cbse_07_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Choose statutory remedy — File application before National.', 'Verify enforceability — NGT orders are executable as civil.', 'Identify the constitutional violation — Article 21 (right.', 'Activate institutional accountability — File complaint with.', 'Leverage PIL route — If villagers cannot approach courts.'], answer: 'Identify the constitutional violation — Article 21 (right. Choose statutory remedy — File application before National. Activate institutional accountability — File complaint with. Leverage PIL route — If villagers cannot approach courts. Verify enforceability — NGT orders are executable as civil.' } },
        { type: 'case', nodeId: 'c12_leg_cbse_07_006', title: 'You made it',
          caseStudy: { intro: 'You finished Law and Sustainable Development — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_leg_cbse_07_001', difficulty: 'standard',
          question: 'Sustainable Development in law is a constitutional and statutory framework that.',
          hint: 'If confused about Article 21 expansion, revisit Class 11 "Salient Features.',
          misconception: 'Students believe "Sustainable Development = Environmental Protection only" and cite only pollution cases.',
          parts: [
                { id: 'a', prompt: 'Explain why the Environment Protection Act, 1986 is called an "umbrella legislation" and which constitutional article empowered Parliament to enact it.', answer: 'EPA 1986 is an "umbrella legislation"',
                  options: ['EPA 1986 is an "umbrella legislation"', 'Sustainable Development = Environmental Protection only'],
                  hint: 'If confused about Article 21 expansion, revisit Class 11 "Salient Features of Constitution".',
                  misconception: 'Students believe "Sustainable Development = Environmental Protection only" and cite only pollution cases.' },
                { id: 'b', prompt: 'A chemical plant in Maharashtra stores 500 tonnes of hazardous waste.', answer: 'No, they cannot escape liability',
                  options: ['No, they cannot escape liability', 'Sustainable Development = Environmental Protection only'],
                  hint: 'If confused about Article 21 expansion, revisit Class 11 "Salient Features of Constitution".',
                  misconception: 'Students believe "Sustainable Development = Environmental Protection only" and cite only pollution cases.' }
          ],
            remediations: { 'sustainable-development-environmental-protection': { steps: ['Re-read the Brundtland definition (NCERT p.95) and list 3 economic, 3 social, 3 environmental goals from the 17 SDGs.', 'Make a two-column table: Strict Liability (Rylands) vs Absolute Liability (M.C.', 'Mehta) — 5 rows: Enterprise vs Person, Escape necessary?, Defences?, Compensation basis, Indian case.', 'Map each constitutional provision (Art 21, 48A, 51A(g), 38, 41, 43) to "Rights", "Directive Principles", or "Duties".'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Sustainable Development = Environmental Protection only" and cite only pollution cases.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "The Polluter Pays Principle is fully implemented in India through the Environment Protection Act, 1986 and the absolute liability doctrine." Support.', answer: 'Judgment: *Partially true*',
                  options: ['Judgment: *Partially true*', 'fully implemented', 'not implemented', 'Sustainable Development = Environmental Protection only'],
                  hint: 'If confused about Article 21 expansion, revisit Class 11 "Salient Features of Constitution".',
                  misconception: 'Students believe "Sustainable Development = Environmental Protection only" and cite only pollution cases.' }
          ],
            remediations: { 'sustainable-development-environmental-protection': { steps: ['Re-read the Brundtland definition (NCERT p.95) and list 3 economic, 3 social, 3 environmental goals from the 17 SDGs.', 'Make a two-column table: Strict Liability (Rylands) vs Absolute Liability (M.C.', 'Mehta) — 5 rows: Enterprise vs Person, Escape necessary?, Defences?, Compensation basis, Indian case.', 'Map each constitutional provision (Art 21, 48A, 51A(g), 38, 41, 43) to "Rights", "Directive Principles", or "Duties".'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_07_002', difficulty: 'standard',
          question: 'Law and Sustainable Development in the Indian constitutional framework refers.',
          hint: 'Review the distinction between Fundamental Rights and Directive Principles.',
          misconception: 'Students believe Article 48A (Directive Principle) is non-justiciable and therefore "weaker" than Article 21.',
          parts: [
                { id: 'a', prompt: 'Which constitutional article was inserted by the 42nd Amendment Act, 1976 and explicitly directs the State to "protect and improve the environment and.', answer: 'Article 48A',
                  options: ['Article 48A', 'Under which Part of the Constitution does this provision fall?', 'weaker'],
                  hint: 'Review the distinction between Fundamental Rights and Directive Principles in c11_leg_cbse_04_002.',
                  misconception: 'Students believe Article 48A (Directive Principle) is non-justiciable and therefore "weaker" than Article 21 (Fundamental Right).' },
                { id: 'b', prompt: 'Compare the composition and powers of the Central Pollution Control Board (CPCB) and State Pollution Control Boards (SPCBs).', answer: 'CPCB (constituted under Water Act 1974, Section 3): Chairman + 5 officials + 5',
                  options: ['CPCB (constituted under Water Act 1974, Section 3): Chairman + 5 officials + 5', 'weaker'],
                  hint: 'Review the distinction between Fundamental Rights and Directive Principles in c11_leg_cbse_04_002.',
                  misconception: 'Students believe Article 48A (Directive Principle) is non-justiciable and therefore "weaker" than Article 21 (Fundamental Right).' }
          ],
            remediations: { 'article-48a-directive-principle-is': { steps: ['Re-read the Vellore Citizens Welfare Forum judgment summary (identify how the Court linked Article 21, 48A, 51A(g)).', 'Create a three-column table: Constitutional Provision | Text | Judicial Interpretation (cite case).', 'Practice converting Directive Principle language into enforceable rights language — e.g., "State shall endeavour.', 'Attempt Diagnostic Questions 2 and 5 again with this framework.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_07_003', difficulty: 'standard',
          question: 'Landmark cases in Law and Sustainable Development are judicial decisions that.',
          hint: 'If stuck on *how a case became law*, revisit **c11_leg_cbse_11_003 (Hussainara Khatoon)**.',
          misconception: '**Students write**: *"Absolute Liability and Strict Liability are the same — both mean liability without fault."* **Why.',
          parts: [
                { id: 'a', prompt: 'In the *Oleum Gas Leak Case (M.C. Mehta v. Union of India, 1987)*, the Supreme Court held that an enterprise engaged in hazardous activity is *absolutely.', answer: 'Correct answer: **(d) All of the above**',
                  options: ['Correct answer: **(d) All of the above**', 'only \'Act of God\''],
                  hint: 'If stuck on *how a case became law*, revisit **c11_leg_cbse_11_003 (Hussainara Khatoon)** — trace.',
                  misconception: '**Students write**: *"Absolute Liability and Strict Liability are the same — both mean liability without fault."* **Why this is wrong**.' },
                { id: 'b', prompt: 'A new fertilizer factory is proposed near a residential area in a State. The State Government grants clearance citing employment generation.', answer: 'Correct answer: 1',
                  options: ['Correct answer: 1', 'pollution control laws', 'EIA notification'],
                  hint: 'If stuck on *how a case became law*, revisit **c11_leg_cbse_11_003 (Hussainara Khatoon)** — trace.',
                  misconception: '**Students write**: *"Absolute Liability and Strict Liability are the same — both mean liability without fault."* **Why this is wrong**.' }
          ],
            remediations: { 'students-write-absolute-liability-and': { steps: ['**Revisit the comparative table** in the NCERT text (Unit 4, Chapter 4A) — draw it from memory: 5 columns (Defence |.', '**Re-read the Oleum Gas Leak judgment extract** in the textbook — highlight the 3 sentences where CJI Bhagwati says.', 'absolute and non-delegable duty...', 'enterprise must be absolutely liable."* 3.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_07_004', difficulty: 'standard',
          question: 'Processes and Procedures in Law and Sustainable Development refer to the.',
          hint: 'If stuck on forum selection, review **Section 29 NGT Act, 2010** and the **Schedule.',
          misconception: '**"PIL can be filed in *any* court for *any* environmental issue."** Students write: "We will file a PIL in the.',
          parts: [
                { id: 'a', prompt: 'An NGO files a PIL in the Supreme Court under Article 32 against a State Government for failing to implement the Solid Waste Management Rules, 2016.', answer: 'The Court will **reject the objection**',
                  options: ['The Court will **reject the objection**', 'locus standi is mandatory', 'Processes and Procedures'],
                  hint: 'If stuck on forum selection, review **Section 29 NGT Act, 2010** and the **Schedule I list** —.',
                  misconception: '**"PIL can be filed in *any* court for *any* environmental issue."** Students write: "We will file a PIL in the District Court / NGT / High.' },
                { id: 'b', prompt: 'Compare the **standard of proof** required in: (a) A criminal prosecution under Section 15 EPA 1986 (pollution offence) vs (b) An Application before NGT for.', answer: 'A criminal prosecution under Section 15 EPA 1986 (pollution offenc',
                  options: ['A criminal prosecution under Section 15 EPA 1986 (pollution offenc', 'both need beyond reasonable doubt', 'distinguish'],
                  hint: 'If stuck on forum selection, review **Section 29 NGT Act, 2010** and the **Schedule I list** —.',
                  misconception: '**"PIL can be filed in *any* court for *any* environmental issue."** Students write: "We will file a PIL in the District Court / NGT / High.' }
          ],
            remediations: { 'pil-can-be-filed-in': { steps: ['** Re-read **c12_leg_cbse_07_002** (Constitutional Provisions) — specifically Articles 32, 226, 21, 48A, 51A(g) —.', '** Study **Section 16, 19, 20, 22, 29 of NGT Act, 2010** (bare act) — make a 2-column table: "Matters NGT *must* hear.', '** Solve the **Re-diagnostic**: "A builder violates Coastal Regulation Zone (CRZ) Notification 2019.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_07_005', difficulty: 'standard',
          question: 'Sustainable development in law is a constitutional and statutory framework that.',
          hint: 'Review c12_leg_cbse_07_002 (Constitutional and Legal Provisions) for the Article 21.',
          misconception: 'Students believe "sustainable development" means stopping all industrial projects to protect nature.',
          parts: [
                { id: 'a', prompt: 'Which constitutional article was interpreted by the Supreme Court to include the "right to a clean and healthy environment" as part of the right to life?', answer: 'Article 21',
                  options: ['Article 21', 'sustainable development'],
                  hint: 'Review c12_leg_cbse_07_002 (Constitutional and Legal Provisions) for the Article 21 expansion case.',
                  misconception: 'Students believe "sustainable development" means stopping all industrial projects to protect nature.' },
                { id: 'b', prompt: 'Compare the Stockholm Declaration (1972) and Rio Declaration (1992) on two points: (a) anthropocentric vs. ecocentric focus, and (b) legal nature (soft law vs.', answer: 'anthropocentric vs',
                  options: ['anthropocentric vs', 'sustainable development'],
                  hint: 'Review c12_leg_cbse_07_002 (Constitutional and Legal Provisions) for the Article 21 expansion case.',
                  misconception: 'Students believe "sustainable development" means stopping all industrial projects to protect nature.' }
          ],
            remediations: { 'sustainable-development-means-stopping-all': { steps: ['If a student holds the preservationist misconception: (1) Have them read the Vellore Citizens judgment paragraphs 10-15.', '(2) Assign a comparative table: "Project stopped" (Silent Valley, 1983) vs.', '"Project allowed with conditions" (Narmada, 2000; Sterlite, 2013) — identify the legal tests applied in each.', '(3) Re-diagnose with a scenario: "A solar park requires clearing 50 hectares of forest.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_07_006', difficulty: 'standard',
          question: 'Sustainable development is a legal and policy framework that mandates meeting.',
          hint: 'If stuck, review the *Vellore Citizens Welfare Forum v. Union of India* (1996) judgment.',
          misconception: 'Students believe "sustainable development" is a *policy goal* (like Directive Principles) and *not legally enforceable*.',
          parts: [
                { id: 'a', prompt: 'Explain the difference between the "precautionary principle" and the "polluter pays principle" in the context of Indian environmental law.', answer: 'The precautionary principle (from *Vellore Citizens* case) mandates that lack of',
                  options: ['The precautionary principle (from *Vellore Citizens* case) mandates that lack of', 'law declared by Supreme Court', 'sustainable development'],
                  hint: 'If stuck, review the *Vellore Citizens Welfare Forum v. Union of India* (1996) judgment.',
                  misconception: 'Students believe "sustainable development" is a *policy goal* (like Directive Principles) and *not legally enforceable* — they write.' }
          ],
            remediations: { 'sustainable-development-is-a-policy': { steps: ['If the student holds this misconception: Step 1 — Re-read *Vellore Citizens Welfare Forum v.', 'Union of India* (1996) 5 SCC 647, paras 10-15 where the Court explicitly says: "The Precautionary Principle and.', 'Step 3 — Practice one NGT case summary (*Yamuna Muktikaran* or *Goa Foundation*) identifying where the Tribunal applied.', 'Step 4 — Re-attempt Diagnostic Question 5 with this corrected framework.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
