import type { SimDef } from '../../engine/types';

/** v3 generated — c11_leg_ch02 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_leg_ch02: SimDef = {
    id: 'v3_c11_leg_ch02',
    title: 'Forms and Organs of Government',
    subtitle: 'This node covers: forms of government (monarchy, aristocracy, dictatorship, democracy.',
    classLevel: 11, subject: 'leg', topic: 'Forms and Organs of Government',
    chapters: ['c11_leg_ch02'],
    nodeIds: ['c11_leg_cbse_02_001', 'c11_leg_cbse_02_002', 'c11_leg_cbse_02_003', 'c11_leg_cbse_02_004', 'c11_leg_cbse_02_005', 'c11_leg_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start with this question: "If India\'s Parliament passes a law banning single-use plastics, who actually.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'What is the ratio decidendi of *Kesavananda Bharati v. State of Kerala* (1973) regarding Parliament\'s amending power under Article 368?',
        options: ['The ratio decidendi is that Parliament cannot amend the "basic structure" of the', 'Parliament can amend anything', 'important judgments'],
        answer: 'The ratio decidendi is that Parliament cannot amend the "basic structure" of the',
        hook: 'Students think landmark cases are "important judgments" merely because they are famous or old.',
    },
    teaching: [
        { title: 'Forms and Organs of Government — Key Concepts and Institutions', text: 'Government is the institutional machinery through which the will of the State is formulated, expressed, and realised, comprising three distinct organs — Legislature (law-making), Executive.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_leg_cbse_02_001', title: 'Forms and Organs of Government — Key Concepts and Institutions',
          caseStudy: { intro: 'Start with this question: "If India\'s Parliament passes a law banning single-use plastics, who actually writes the draft, who ensures factories stop making.',
            decisions: [{ prompt: 'Define \'Government\' as per Black\'s Law Dictionary and state the three essential functions it performs in any State.', options: [
                { text: 'Government is "the structure of principles and rules determining how a state or', outcome: 'Government is "the structure of principles and rules determining how a state or organization.' },
                { text: 'Government is the State', outcome: 'Not quite — **Misconception**: "Parliamentary and Presidential systems are just about who is Head of State.', reveals: 'misconception-parliamentary-and-presidential-sys' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_02_002', title: 'Forms and Organs of Government — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with a relatable scenario: "Your school has a Student Council (Government) elected by students (Population) operating within the school campus.',
            decisions: [{ prompt: 'Define \'State\' in the legal-political sense and list its four essential elements.', options: [
                { text: 'A State is a politically organised community permanently occupying a definite territory,', outcome: 'A State is a politically organised community permanently occupying a definite territory, possessing.' },
                { text: 'only \'Government\' or confusing State with Nation', outcome: 'Not quite — Students confuse **\'Form of Government\'** (Monarchy, Democracy, Dictatorship — *who holds sovereign.', reveals: 'students-confuse-form-of-government' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_02_003', title: 'Forms and Organs of Government — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with a real question: "Can Parliament amend the Constitution to remove judicial review?" This mirrors the *Kesavananda Bharati* crisis.',
            decisions: [{ prompt: 'What is the ratio decidendi of *Kesavananda Bharati v. State of Kerala* (1973) regarding Parliament\'s amending power under Article 368?', options: [
                { text: 'The ratio decidendi is that Parliament cannot amend the "basic structure" of the', outcome: 'The ratio decidendi is that Parliament cannot amend the "basic structure" of the Constitution.' },
                { text: 'Parliament can amend anything', outcome: 'Not quite — Students think landmark cases are "important judgments" merely because they are famous or old.', reveals: 'landmark-cases-are-important-judgments' },
                { text: 'important judgments', outcome: 'Not quite — Students think landmark cases are "important judgments" merely because they are famous or old.', reveals: 'landmark-cases-are-important-judgments' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_02_004', title: 'Forms and Organs of Government — Processes and Procedures',
          caseStudy: { intro: 'Imagine you are a Legislative Assistant drafting a Bill to ban single-use plastics. Where do you start?',
            decisions: [{ prompt: '**REMEMBER**: List the *exact* three categories of Bills defined in the Constitution (Articles 107–110) and state the *sole* House where.', options: [
                { text: 'The three categories are: (1) Ordinary Bills (Art', outcome: 'The three categories are: (1) Ordinary Bills (Art. 107), (2) Money Bills (Art.' },
                { text: 'Rajya Sabha', outcome: 'Not quite — **Misconception**: "The President\'s assent to a Bill (Art. 111) is a mere formality; the President.', reveals: 'misconception-the-president-s-assent' },
                { text: 'either House', outcome: 'Not quite — **Misconception**: "The President\'s assent to a Bill (Art. 111) is a mere formality; the President.', reveals: 'misconception-the-president-s-assent' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_02_005', title: 'Forms and Organs of Government — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'Imagine you\'re in the exam hall and see: "Explain the difference between Presidential and Parliamentary form of government with reference to India and USA.',
            decisions: [{ prompt: 'What is the full form of IRAC in legal answer writing, and what does each letter stand for?', options: [
                { text: 'IRAC stands for Issue, Rule, Application, Conclusion', outcome: 'IRAC stands for Issue, Rule, Application, Conclusion. A wrong answer (e.g., "Introduction.' },
                { text: 'Introduction, Reasoning, Analysis, Conclusion', outcome: 'Not quite — Students believe that "writing more points = more marks." In Legal Studies, a 4-mark "Distinguish".', reveals: 'writing-more-points-more-marks' },
                { text: 'writing more points = more marks', outcome: 'Not quite — Students believe that "writing more points = more marks." In Legal Studies, a 4-mark "Distinguish".', reveals: 'writing-more-points-more-marks' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_02_005', title: 'Forms and Organs of Government — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'Imagine you\'re in the exam hall and see: "Explain the difference between Presidential and Parliamentary form of government with reference to India and USA.',
            decisions: [{ prompt: 'What is the full form of IRAC in legal answer writing, and what does each letter stand for?', options: [
                { text: 'IRAC stands for Issue, Rule, Application, Conclusion', outcome: 'IRAC stands for Issue, Rule, Application, Conclusion. A wrong answer (e.g., "Introduction.' },
                { text: 'Introduction, Reasoning, Analysis, Conclusion', outcome: 'Not quite — Students believe that "writing more points = more marks." In Legal Studies, a 4-mark "Distinguish".', reveals: 'writing-more-points-more-marks' },
                { text: 'writing more points = more marks', outcome: 'Not quite — Students believe that "writing more points = more marks." In Legal Studies, a 4-mark "Distinguish".', reveals: 'writing-more-points-more-marks' }
            ] }] } },
        { type: 'build', nodeId: 'c11_leg_cbse_02_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Identify the *territorial structure* — Two levels (Centre.', 'Identify the *legislature composition* — Two houses (Lower.', 'Identify the *executive-legislature relationship*.', 'Identify the *form* — power originates from people (elected.', 'Synthesise: Neporia = **Democratic Republic, Parliamentary.'], answer: 'Identify the *form* — power originates from people (elected. Identify the *executive-legislature relationship*. Identify the *territorial structure* — Two levels (Centre. Identify the *legislature composition* — Two houses (Lower. Synthesise: Neporia = **Democratic Republic, Parliamentary.' } },
        { type: 'case', nodeId: 'c11_leg_cbse_02_006', title: 'You made it',
          caseStudy: { intro: 'You finished Forms and Organs of Government — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_leg_cbse_02_001', difficulty: 'standard',
          question: 'Government is the institutional machinery through which the will of the State.',
          hint: 'Revisit Chapter 1, Section III "What is Government?" and the State vs.',
          misconception: '**Misconception**: "Parliamentary and Presidential systems are just about who is Head of State (President vs.',
          parts: [
                { id: 'a', prompt: 'Define \'Government\' as per Black\'s Law Dictionary and state the three essential functions it performs in any State.', answer: 'Government is "the structure of principles and rules determining how a state or',
                  options: ['Government is "the structure of principles and rules determining how a state or', 'Government is the State'],
                  hint: 'Revisit Chapter 1, Section III "What is Government?" and the State vs.',
                  misconception: '**Misconception**: "Parliamentary and Presidential systems are just about who is Head of State (President vs.' }
          ],
            remediations: { 'misconception-parliamentary-and-presidential-sys': { steps: ['**Re-teach the accountability test**: "How can the legislature remove the executive?" → Parliamentary: No-confidence.', 'Presidential: Impeachment (supermajority, legal/quasi-judicial).', '**Use a 2x2 matrix**: Rows = Form (Monarchy/Democracy); Columns = Structure (Parliamentary/Presidential).', 'Fill: UK (Monarchy + Parliamentary), India (Republic + Parliamentary), USA (Republic + Presidential), Saudi Arabia.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_02_002', difficulty: 'standard',
          question: '**State**: A politically organised community of persons permanently occupying.',
          hint: 'Review c11_leg_cbse_02_001: \'State vs Government\' comparison table and the 4 elements.',
          misconception: 'Students confuse **\'Form of Government\'** (Monarchy, Democracy, Dictatorship — *who holds sovereign power*) with.',
          parts: [
                { id: 'a', prompt: 'A Bill is passed by Lok Sabha but rejected by Rajya Sabha. The President summons a joint sitting under Article 108.', answer: 'Which organ initiates this process?',
                  options: ['Which organ initiates this process?', 'joint sitting applies to all Bills'],
                  hint: 'Review c11_leg_cbse_02_001: \'State vs Government\' comparison table and the 4 elements of State.',
                  misconception: 'Students confuse **\'Form of Government\'** (Monarchy, Democracy, Dictatorship — *who holds sovereign power*) with **\'System of Government\'**.' }
          ],
            remediations: { 'students-confuse-form-of-government': { steps: ['Draw a **3-axis classification grid** on board: X-axis = Form (Monarchy ↔ Democracy), Y-axis = System (Parliamentary ↔.', 'Plot 5 countries (India, USA, UK, France, China) as coordinates.', 'For each country, cite *one constitutional feature* per axis (e.g., India: X=Adult Suffrage Art 326, Y=Art 75(3).', 'Ask student to classify a 6th country (e.g., Japan, Germany, South Africa) using the grid.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_02_003', difficulty: 'standard',
          question: 'Landmark cases are judicial decisions that establish a significant legal.',
          hint: 'If stuck, review c11_leg_cbse_02_002\'s "Article 12 and State Action" and "Fundamental.',
          misconception: 'Students think landmark cases are "important judgments" merely because they are famous or old.',
          parts: [
                { id: 'a', prompt: 'What is the ratio decidendi of *Kesavananda Bharati v. State of Kerala* (1973) regarding Parliament\'s amending power under Article 368?', answer: 'The ratio decidendi is that Parliament cannot amend the "basic structure" of the',
                  options: ['The ratio decidendi is that Parliament cannot amend the "basic structure" of the', 'Parliament can amend anything', 'important judgments', 'cited often'],
                  hint: 'If stuck, review c11_leg_cbse_02_002\'s "Article 12 and State Action" and "Fundamental Rights".',
                  misconception: 'Students think landmark cases are "important judgments" merely because they are famous or old.' },
                { id: 'b', prompt: 'In *Maneka Gandhi v. Union of India* (1978), the Supreme Court held that "procedure established by law" under Article 21 must be "fair, just, and reasonable.".', answer: 'In *A.K',
                  options: ['In *A.K', 'it just added a hearing requirement', 'important judgments', 'cited often'],
                  hint: 'If stuck, review c11_leg_cbse_02_002\'s "Article 12 and State Action" and "Fundamental Rights".',
                  misconception: 'Students think landmark cases are "important judgments" merely because they are famous or old.' },
                { id: 'c', prompt: 'Compare the judicial approach in *Indira Gandhi v. Raj Narain* (1975) and *Minerva Mills v. Union of India* (1980) on the amendability of fundamental rights.', answer: '*Indira Gandhi* (Art',
                  options: ['*Indira Gandhi* (Art', 'pro-rights', 'important judgments', 'cited often'],
                  hint: 'If stuck, review c11_leg_cbse_02_002\'s "Article 12 and State Action" and "Fundamental Rights".',
                  misconception: 'Students think landmark cases are "important judgments" merely because they are famous or old.' }
          ],
            remediations: { 'landmark-cases-are-important-judgments': { steps: ['Ask student to distinguish *obiter dicta* from *ratio decidendi* in *Kesavananda* — use the 7-judge vs 13-judge split.', 'Give a 2-column table: Column A = pre-*Maneka* Art.', '21 ("procedure established by law" = any law); Column B = post-*Maneka* ("fair, just, reasonable").', 'Have them map each landmark case to a specific basic structure pillar (e.g., *Minerva Mills* → judicial review.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think landmark cases are "important judgments" merely because they are famous or old.',
          parts: [
                { id: 'a', prompt: 'Critique the argument: "Since *Shreya Singhal v. Union of India* (2015) struck down Section 66A IT Act for vagueness, all vaguely worded criminal provisions.', answer: 'The argument overgeneralizes',
                  options: ['The argument overgeneralizes', 'important judgments', 'cited often', 'constitutionally transformative'],
                  hint: 'If stuck, review c11_leg_cbse_02_002\'s "Article 12 and State Action" and "Fundamental Rights".',
                  misconception: 'Students think landmark cases are "important judgments" merely because they are famous or old.' },
                { id: 'b', prompt: 'Design a hypothetical landmark case where the Supreme Court must decide if the President\'s ordinance-making power (Art.', answer: 'Issue: Can an ordinance enact a Money Bill (Art',
                  options: ['Issue: Can an ordinance enact a Money Bill (Art', 'important judgments', 'cited often', 'constitutionally transformative'],
                  hint: 'If stuck, review c11_leg_cbse_02_002\'s "Article 12 and State Action" and "Fundamental Rights".',
                  misconception: 'Students think landmark cases are "important judgments" merely because they are famous or old.' }
          ],
            remediations: { 'landmark-cases-are-important-judgments': { steps: ['Ask student to distinguish *obiter dicta* from *ratio decidendi* in *Kesavananda* — use the 7-judge vs 13-judge split.', 'Give a 2-column table: Column A = pre-*Maneka* Art.', '21 ("procedure established by law" = any law); Column B = post-*Maneka* ("fair, just, reasonable").', 'Have them map each landmark case to a specific basic structure pillar (e.g., *Minerva Mills* → judicial review.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_02_004', difficulty: 'standard',
          question: 'Processes and Procedures of Government refer to the constitutionally mandated.',
          hint: 'If stuck on *why* Rajya Sabha has no power over Money Bills, review **c11_leg_cbse_02_001.',
          misconception: '**Misconception**: "The President\'s assent to a Bill (Art. 111) is a mere formality; the President *must* sign." **Why.',
          parts: [
                { id: 'a', prompt: '**REMEMBER**: List the *exact* three categories of Bills defined in the Constitution (Articles 107–110) and state the *sole* House where a Money Bill *must*.', answer: 'The three categories are: (1) Ordinary Bills (Art',
                  options: ['The three categories are: (1) Ordinary Bills (Art', 'Rajya Sabha', 'either House', 'originates only in Lok Sabha'],
                  hint: 'If stuck on *why* Rajya Sabha has no power over Money Bills, review **c11_leg_cbse_02_001.',
                  misconception: '**Misconception**: "The President\'s assent to a Bill (Art. 111) is a mere formality; the President *must* sign." **Why it\'s wrong**: The.' },
                { id: 'b', prompt: '**APPLY**: A Bill imposing a new "Green Tax" on plastic packaging is introduced in the Rajya Sabha. The Bill passes Rajya Sabha but is rejected by Lok Sabha.', answer: '**(a) Invalid introduction.** A "Green Tax" Bill is a **Money Bill** (Art',
                  options: ['**(a) Invalid introduction.** A "Green Tax" Bill is a **Money Bill** (Art', 'parallel legislative track'],
                  hint: 'If stuck on *why* Rajya Sabha has no power over Money Bills, review **c11_leg_cbse_02_001.',
                  misconception: '**Misconception**: "The President\'s assent to a Bill (Art. 111) is a mere formality; the President *must* sign." **Why it\'s wrong**: The.' },
                { id: 'c', prompt: '**ANALYZE**: Compare the **writ jurisdiction of the Supreme Court (Art. 32)** and **High Courts (Art.', answer: '| Parameter | Supreme Court (Art',
                  options: ['| Parameter | Supreme Court (Art', 'any other purpose', 'shall have power', 'may issue'],
                  hint: 'If stuck on *why* Rajya Sabha has no power over Money Bills, review **c11_leg_cbse_02_001.',
                  misconception: '**Misconception**: "The President\'s assent to a Bill (Art. 111) is a mere formality; the President *must* sign." **Why it\'s wrong**: The.' }
          ],
            remediations: { 'misconception-the-president-s-assent': { steps: ['111 proviso** with a highlighter: "President may return the Bill...', 'with a message requesting reconsideration." Note: *No time limit* prescribed.', '**Contrast** with US pocket veto (10 days, Congress adjourned) using a 2-column table.', '**Memorize the exception**: Money Bills (Art.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_02_005', difficulty: 'standard',
          question: 'Exam-oriented questions in Legal Studies are structured assessment items that.',
          hint: 'If stuck on structuring answers, review the "Exercises" sections in NCERT Chapter 2 (pp.',
          misconception: 'Students believe that "writing more points = more marks." In Legal Studies, a 4-mark "Distinguish" question needs.',
          parts: [
                { id: 'a', prompt: 'What is the full form of IRAC in legal answer writing, and what does each letter stand for?', answer: 'IRAC stands for Issue, Rule, Application, Conclusion',
                  options: ['IRAC stands for Issue, Rule, Application, Conclusion', 'Introduction, Reasoning, Analysis, Conclusion', 'writing more points = more marks', 'Distinguish'],
                  hint: 'If stuck on structuring answers, review the "Exercises" sections in NCERT Chapter 2 (pp.',
                  misconception: 'Students believe that "writing more points = more marks." In Legal Studies, a 4-mark "Distinguish" question needs exactly 4 *contrasted*.' },
                { id: 'b', prompt: 'Apply the IRAC framework to this 4-mark question: "Can Montesquieu\'s strict separation of powers be applied in India?', answer: 'Issue: Whether India follows strict separation of powers',
                  options: ['Issue: Whether India follows strict separation of powers', 'writing more points = more marks', 'Distinguish', '"writing more points = more marks'],
                  hint: 'If stuck on structuring answers, review the "Exercises" sections in NCERT Chapter 2 (pp.',
                  misconception: 'Students believe that "writing more points = more marks." In Legal Studies, a 4-mark "Distinguish" question needs exactly 4 *contrasted*.' }
          ],
            remediations: { 'writing-more-points-more-marks': { steps: ['If a student writes descriptive paragraphs for "Distinguish" questions: (1) Make them rewrite the same answer as.', '(2) Highlight the command word and ask: "Where is the *comparison*?" (3) Give a model answer with explicit "X does.', '(4) Practice 5 past-year "Distinguish" questions with timed table-format responses.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_02_006', difficulty: 'standard',
          question: '**Forms of Government** classify how state power is sourced, structured, and.',
          hint: 'If stuck, review **Article 74 (Council of Ministers to aid and advise President)** and.',
          misconception: '**Misconception:** "In a Parliamentary system, there is NO separation of powers because the Executive is part of the.',
          parts: [
                { id: 'a', prompt: 'Explain why the Indian President\'s ordinance-making power (Article 123) is considered a legislative function of the executive, and what constitutional.', answer: '**Answer:** The President promulgates ordinances on Cabinet advice (Art',
                  options: ['**Answer:** The President promulgates ordinances on Cabinet advice (Art', 'President acts alone'],
                  hint: 'If stuck, review **Article 74 (Council of Ministers to aid and advise President)** and **Article.',
                  misconception: '**Misconception:** "In a Parliamentary system, there is NO separation of powers because the Executive is part of the Legislature." **Why.' },
                { id: 'b', prompt: 'A new Indian state "Vindhya" is created with a population of 50 lakh. Its Legislative Assembly has 60 members.', answer: '**Answer:** - **Minimum:** 40 members (Art',
                  options: ['**Answer:** - **Minimum:** 40 members (Art', 'max 20'],
                  hint: 'If stuck, review **Article 74 (Council of Ministers to aid and advise President)** and **Article.',
                  misconception: '**Misconception:** "In a Parliamentary system, there is NO separation of powers because the Executive is part of the Legislature." **Why.' },
                { id: 'c', prompt: 'Compare the judicial function of the Indian Executive (President\'s pardon power, Art.', answer: '**Answer:** | Aspect | Executive (Art',
                  options: ['**Answer:** | Aspect | Executive (Art', 'judicial functions'],
                  hint: 'If stuck, review **Article 74 (Council of Ministers to aid and advise President)** and **Article.',
                  misconception: '**Misconception:** "In a Parliamentary system, there is NO separation of powers because the Executive is part of the Legislature." **Why.' }
          ],
            remediations: { 'misconception-in-a-parliamentary-system': { steps: ['** Draw a 3-circle Venn diagram: "Personnel," "Functions," "Checks." Place "PM + Ministers" in Personnel overlap.', '** Ask: "Can the PM vote on a bill? Yes. Can the PM *be* a judge? No. Can the PM *ignore* a Supreme Court order?', '** Have student re-read Art. 50, 75(3), 123(2), 141 — label each as "Personnel," "Function," or "Check." **', '** Practice 200-word answer: "India adopts a *modified* separation of powers: personnel fusion (Parliamentary) with.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
