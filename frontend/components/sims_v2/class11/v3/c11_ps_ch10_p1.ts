import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch10_p1: SimDef = {
    id: 'v3_c11_ps_ch10_p1',
    title: 'Constitution: Why and How · Part 1/2',
    subtitle: 'Discover the document that binds even its own amenders.',
    classLevel: 11, subject: 'political_science', topic: 'Constitution: Why and How · Part 1/2',
    chapters: ['c11_ps_ch10'],
    nodeIds: ['c11_ps_cbse_10_001', 'c11_ps_cbse_10_002', 'c11_ps_cbse_10_003', 'c11_ps_cbse_10_004', 'c11_ps_cbse_10_005', 'c11_ps_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a constitutional lawyer asking who guards the guardrails', intro: 'Parliament passed a law; the Court struck it down; neither is sovereign — in India the document itself sits at the top.', goal: 'Explain constitutional supremacy, the Basic Structure doctrine, and constitutionalism\'s logic.' },
    discovery: {
        question: 'Parliament can amend the Constitution under Article 368 — so Parliament, not the Constitution, is truly supreme?',
        options: ['No — the Basic Structure doctrine (Kesavananda 1973) means even amendments face constitutional limits; the text outranks its editors', 'Yes — whoever amends is sovereign', 'Yes — the UK model applies here', 'No — because the President can veto amendments'],
        answer: 'No — the Basic Structure doctrine (Kesavananda 1973) means even amendments face constitutional limits; the text outranks its editors',
        hook: 'And the Court isn\'t above the Constitution either — constitutional supremacy means everyone, elected or appointed, answers to the document.',
    },
    teaching: [
        { title: 'What is a constitution: The supreme law of the land', text: 'A constitution is the supreme law of the land that establishes the fundamental political framework of a state, defines the structure, powers, and functions of government organs (legislature.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Explain how unelected judges could strike down the NJAC Act without becoming supreme themselves, then argue whether virtuous leaders make constitutions unnecessary.',
        labels: ['What is a constitution', 'Why do we need', 'Constitution as a living', 'Functions of a constitution', 'The Constituent Assembly', 'Objectives Resolution: Nehru\'s statement'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_10_001', title: 'What is a constitution: The supreme law of the land',
          caseStudy: { intro: 'Imagine you read a news headline: "Supreme Court strikes down State law on reservations — violates constitutional ceiling of 50%." Ask yourself: How can.',
            decisions: [{ prompt: 'What does "supreme law of the land" mean in the Indian constitutional context, and which specific article establishes that laws violating.', options: [
                { text: '"Supreme law of the land" means the Constitution is the highest legal authority', outcome: '"Supreme law of the land" means the Constitution is the highest legal authority; all other laws.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often conflate **constitutional supremacy** with **judicial supremacy**, believing the.', reveals: 'students-often-conflate-constitutional-supremacy' },
                { text: 'interprets', outcome: 'Not quite — Students often conflate **constitutional supremacy** with **judicial supremacy**, believing the.', reveals: 'students-often-conflate-constitutional-supremacy' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_10_002', title: 'Why do we need a constitution: Functions and importance',
          caseStudy: { intro: 'Imagine you are playing a cricket match without any agreed-upon rules: no fixed number of players, no boundary lines, no way to decide who wins.',
            decisions: [{ prompt: 'What is the primary purpose of a constitution in a democratic country? (Answer in one sentence.)', options: [
                { text: 'The primary purpose of a constitution is to establish the fundamental framework of', outcome: 'The primary purpose of a constitution is to establish the fundamental framework of government.' },
                { text: 'to make laws', outcome: 'Not quite — Students often think a constitution is just a list of rights (like a \'bill of rights\') and overlook.', reveals: 'a-constitution-is-just-a' },
                { text: 'to elect the Prime Minister', outcome: 'Not quite — Students often think a constitution is just a list of rights (like a \'bill of rights\') and overlook.', reveals: 'a-constitution-is-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_10_003', title: 'Constitution as a living document: Adaptability and amendment',
          caseStudy: { intro: 'Imagine your school updates its rulebook every year: some changes need only the principal\'s approval (simple majority), others need 2/3 of teachers plus the.',
            decisions: [{ prompt: 'Under Article 368, which of the following amendments requires ratification by at least half of the state legislatures?', options: [
                { text: 'Correct answer: (b) Altering the distribution of legislative powers between Union and', outcome: 'Correct answer: (b) Altering the distribution of legislative powers between Union and States.' },
                { text: 'federal', outcome: 'Not quite — Students believe "Basic Structure" is a written list in the Constitution (like Fundamental Rights).', reveals: 'basic-structure-is-a-written' },
                { text: 'Basic Structure', outcome: 'Not quite — Students believe "Basic Structure" is a written list in the Constitution (like Fundamental Rights).', reveals: 'basic-structure-is-a-written' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_10_004', title: 'Functions of a constitution: Establishing rules, limiting government, expressing aspirations',
          caseStudy: { intro: 'Imagine your school introduces a new "Student Council Constitution" after years of arbitrary decisions by the principal.',
            decisions: [{ prompt: 'Which of the following Articles of the Indian Constitution is the clearest example of the "expressing aspirations" function rather than.', options: [
                { text: 'Correct answer: **c) Article 39**', outcome: 'Correct answer: **c) Article 39**. Article 39 is a Directive Principle – it expresses.' },
                { text: 'limiting government', outcome: 'Not quite — Students often think **"limiting government" means only Fundamental Rights (Part III)**.', reveals: 'limiting-government-means-only-fundamental' },
                { text: '**"limiting government" means only Fundamental Rights (Part III)**', outcome: 'Not quite — Students often think **"limiting government" means only Fundamental Rights (Part III)**.', reveals: 'limiting-government-means-only-fundamental' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_10_005', title: 'The Constituent Assembly of India: Composition and formation',
          caseStudy: { intro: 'Imagine you are designing a student council for your school where every class, club, and sports team must feel represented—how would you choose members so.',
            decisions: [{ prompt: 'What was the total strength of the Constituent Assembly as per the Cabinet Mission Plan, and how were seats allocated between British.', options: [
                { text: 'The Cabinet Mission Plan allocated 389 seats: 296 to British Indian provinces (11', outcome: 'The Cabinet Mission Plan allocated 389 seats: 296 to British Indian provinces (11 Governor\'s.' },
                { text: '300 members directly elected by people', outcome: 'Not quite — Students often believe the Constituent Assembly was "directly elected by the people of India".', reveals: 'the-constituent-assembly-was-directly' },
                { text: 'directly elected by the people of India', outcome: 'Not quite — Students often believe the Constituent Assembly was "directly elected by the people of India".', reveals: 'the-constituent-assembly-was-directly' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_10_006', title: 'Objectives Resolution: Nehru\'s statement of constitutional aims',
          caseStudy: { intro: 'Imagine you are part of a team writing a rulebook for a new cricket league.',
            decisions: [{ prompt: 'What was the exact date on which Jawaharlal Nehru moved the Objectives Resolution in the Constituent Assembly, and what was the immediate.', options: [
                { text: 'Nehru moved the Objectives Resolution on 13 December 1946', outcome: 'Nehru moved the Objectives Resolution on 13 December 1946; it was adopted unanimously on 22 January.' },
                { text: 'socialist, secular', outcome: 'Not quite — Students often believe the Objectives Resolution and the Preamble are the same document with.', reveals: 'the-objectives-resolution-and-the' },
                { text: 'sovereign independent republic', outcome: 'Not quite — Students often believe the Objectives Resolution and the Preamble are the same document with.', reveals: 'the-objectives-resolution-and-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Discussing the NJAC verdict in a polity club, a student objects: \'How can unelected judges strike down a law Parliament passed? That puts the Supreme Court above the Constitution — judicial supremacy.\'',
            decisions: [{ prompt: 'Who is actually supreme in India\'s system?', options: [
                { text: 'Locate supremacy correctly: the CONSTITUTION is supreme — Article 13 voids any law inconsistent with Fundamental Rights. The Court is the Constitution\'s guardian, not its master: striking down NJAC enforced Articles 124/217/50, not judicial will. India isn\'t parliamentary sovereignty either — Parliament legislates within constitutional limits, which is precisely why review exists.', outcome: 'The objection dissolves: the Court didn\'t override democracy — it enforced the document that defines what Parliament may do.' },
                { text: 'Back the objection — elected Parliament should outrank unelected judges.', outcome: 'That imports UK-style parliamentary sovereignty: in India the Constitution binds Parliament itself — judicial review is the enforcement mechanism, not a rival sovereign.', reveals: 'parliament-is-sovereign' },
                { text: 'Split it — the Court is supreme over the Constitution since it interprets it.', outcome: 'Interpretation serves the text: the Court\'s power exists because the Constitution grants it — the guardian can\'t be above what it guards.', reveals: 'court-above-constitution' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'A constitution isn\'t just a rights list — it\'s the machine that stops a well-meaning majority from easily unmaking them.',
            decisions: [{ prompt: 'What comes next? Constitution: Why and How · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Constitution: Why and How · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_10_001', difficulty: 'standard',
          question: 'A constitution is the supreme law of the land that establishes the fundamental.',
          hint: 'Revisit c7_civ_ch02_001 (What is a Constitution) and c8_civ_ch3_9 (Judicial Review).',
          misconception: 'Students often conflate **constitutional supremacy** with **judicial supremacy**, believing the Supreme Court stands.',
          parts: [
                { id: 'a', prompt: 'What does "supreme law of the land" mean in the Indian constitutional context, and which specific article establishes that laws violating Fundamental Rights.', answer: '"Supreme law of the land" means the Constitution is the highest legal authority',
                  options: ['"Supreme law of the land" means the Constitution is the highest legal authority', 'A wrong answer (e.g', 'interprets'],
                  hint: 'Revisit c7_civ_ch02_001 (What is a Constitution) and c8_civ_ch3_9 (Judicial Review) — focus on the.',
                  misconception: 'Students often conflate **constitutional supremacy** with **judicial supremacy**, believing the Supreme Court stands *above* the.' },
                { id: 'b', prompt: 'Why is the Indian Constitution described as "supreme law" rather than merely "the highest law passed by Parliament"?', answer: 'The Constitution is supreme',
                  options: ['The Constitution is supreme', 'because the Supreme Court says so', 'interprets'],
                  hint: 'Revisit c7_civ_ch02_001 (What is a Constitution) and c8_civ_ch3_9 (Judicial Review) — focus on the.',
                  misconception: 'Students often conflate **constitutional supremacy** with **judicial supremacy**, believing the Supreme Court stands *above* the.' },
                { id: 'c', prompt: 'Compare constitutional supremacy (India) with parliamentary sovereignty (UK) on three dimensions: (a) Can the legislature amend the constitution/basic law.', answer: 'with parliamentary sovereignty (UK) on three dimensions: (',
                  options: ['with parliamentary sovereignty (UK) on three dimensions: (', 'both allow judicial review of primary legislation', 'interprets'],
                  hint: 'Revisit c7_civ_ch02_001 (What is a Constitution) and c8_civ_ch3_9 (Judicial Review) — focus on the.',
                  misconception: 'Students often conflate **constitutional supremacy** with **judicial supremacy**, believing the Supreme Court stands *above* the.' }
          ],
            remediations: { 'students-often-conflate-constitutional-supremacy': { steps: ['Re-read Article 13(2) — note the phrase "any law made in contravention...', 'Trace the chain: People → Constituent Assembly → Constitution → Parliament/Executive/Judiciary.', 'Study the NJAC judgment summary — the Court did not claim power to appoint judges; it held the NJAC Act violated the.', 'Complete the flowchart: Constitution (supreme) → Article 13 (supremacy clause) → Judicial Review (enforcement.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often conflate **constitutional supremacy** with **judicial supremacy**, believing the Supreme Court stands.',
          parts: [
                { id: 'a', prompt: '"Since Parliament can amend the Constitution under Article 368, the Constitution is not truly supreme — Parliament is." Evaluate this statement with reference.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'Parliament can amend anything, so it is supreme', 'interprets'],
                  hint: 'Revisit c7_civ_ch02_001 (What is a Constitution) and c8_civ_ch3_9 (Judicial Review) — focus on the.',
                  misconception: 'Students often conflate **constitutional supremacy** with **judicial supremacy**, believing the Supreme Court stands *above* the.' }
          ],
            remediations: { 'students-often-conflate-constitutional-supremacy': { steps: ['Re-read Article 13(2) — note the phrase "any law made in contravention...', 'Trace the chain: People → Constituent Assembly → Constitution → Parliament/Executive/Judiciary.', 'Study the NJAC judgment summary — the Court did not claim power to appoint judges; it held the NJAC Act violated the.', 'Complete the flowchart: Constitution (supreme) → Article 13 (supremacy clause) → Judicial Review (enforcement.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_10_002', difficulty: 'standard',
          question: 'A constitution is the fundamental law of a country that establishes the.',
          hint: 'If stuck, revisit the definition of constitution (node 001) and the Class 9 concept.',
          misconception: 'Students often think a constitution is just a list of rights (like a \'bill of rights\') and overlook its structural.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A constitution is the fundamental law of a country that establishes the framework of',
                  options: ['A constitution is the fundamental law of a country that establishes the framework of', 'A constitution is the supreme law of the land that establishes the fundamental political', 'The Indian Constitution is a living document', 'A constitution performs three core functions: (1) **Establishing rules** – it creates the'],
                  hint: 'If stuck, revisit the definition of constitution (node 001) and the Class 9 concept.',
                  misconception: 'Students often think a constitution is just a list of rights (like a \'bill of rights\') and overlook its structural functions: creating.' }
          ],
            remediations: { 'a-constitution-is-just-a': { steps: ['To address this, have students create a two-column table: Column A: "Structural Functions" (e.g., establishes.', 'Column B: "Rights-Protecting Functions" (e.g., Article 19, Article 21, Article 32).', 'Then ask: "If we only had Column B but no Column A, could rights be protected?" Guide them to see that without.', 'Use the Indian example: the Constituent Assembly spent months debating institutional design (Chapter 10 nodes 005-011).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_10_003', difficulty: 'standard',
          question: 'The Indian Constitution is a living document because it possesses an in-built.',
          hint: 'Revisit Article 368 text and the proviso listing specific articles (54, 55, 73, 162, 241.',
          misconception: 'Students believe "Basic Structure" is a written list in the Constitution (like Fundamental Rights).',
          parts: [
                { id: 'a', prompt: 'A political party with a two-thirds majority in both Houses of Parliament wants to pass an amendment removing judicial review of constitutional amendments.', answer: 'Procedurally, they can pass the amendment with special majority (Article 368(2))',
                  options: ['Procedurally, they can pass the amendment with special majority (Article 368(2))', 'Basic Structure', 'special majority', 'absolute majority'],
                  hint: 'Revisit Article 368 text and the proviso listing specific articles (54, 55, 73, 162, 241, Chapter.',
                  misconception: 'Students believe "Basic Structure" is a written list in the Constitution (like Fundamental Rights).' }
          ],
            remediations: { 'basic-structure-is-a-written': { steps: ['Re-read Article 368 text (bare act) – highlight the three tiers: "majority of total membership and 2/3 present and.', 'Create a table mapping 5-6 amendment examples (e.g., 42nd, 44th, 73rd, 101st GST) to their required tier.', 'Read the Kesavananda Bharati summary (paragraph 1351 of judgment) where Sikri CJ lists "basic structure" features.', 'Practice identifying whether a given hypothetical amendment needs state ratification by checking if it touches Articles.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_10_004', difficulty: 'standard',
          question: 'A constitution performs three core functions: (1) **Establishing rules** –.',
          hint: 'If stuck, revisit **Article 368 (amendment procedure)** and **Article 13 (judicial.',
          misconception: 'Students often think **"limiting government" means only Fundamental Rights (Part III)**.',
          parts: [
                { id: 'a', prompt: 'Which of the following Articles of the Indian Constitution is the clearest example of the "expressing aspirations" function rather than "establishing rules".', answer: 'Correct answer: **c) Article 39**',
                  options: ['Correct answer: **c) Article 39**', 'limiting government', '**"limiting government" means only Fundamental Rights (Part III)**'],
                  hint: 'If stuck, revisit **Article 368 (amendment procedure)** and **Article 13 (judicial review)** – they.',
                  misconception: 'Students often think **"limiting government" means only Fundamental Rights (Part III)**.' },
                { id: 'b', prompt: 'Explain why the "limiting government" function requires BOTH substantive constraints (like Fundamental Rights) AND procedural constraints (like separation.', answer: 'Substantive constraints define *what* government cannot do (e.g., Article 21: no',
                  options: ['Substantive constraints define *what* government cannot do (e.g., Article 21: no', 'limiting government', '**"limiting government" means only Fundamental Rights (Part III)**'],
                  hint: 'If stuck, revisit **Article 368 (amendment procedure)** and **Article 13 (judicial review)** – they.',
                  misconception: 'Students often think **"limiting government" means only Fundamental Rights (Part III)**.' }
          ],
            remediations: { 'limiting-government-means-only-fundamental': { steps: ['**Re-read Article 13** (substantive limit) and **Article 246 + Seventh Schedule** (structural/federal limit).', '**Create a two-column table**: Column A = "Substantive Limits (Rights-based)" – list Articles 14, 15, 16, 19, 21, 25-30.', 'Column B = "Structural Limits (Power-distribution-based)" – list Articles 50, 246, 324, 148, 368, 356 (with safeguards).', '**Analyze a recent news item** (e.g., Centre-State dispute on GST, or Governor\'s role in state government formation).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_10_005', difficulty: 'standard',
          question: 'The Constituent Assembly of India was the specially constituted body of 389.',
          hint: 'If stuck, revisit the Cabinet Mission Plan\'s three-tier scheme (Sections A, B, C) and the.',
          misconception: 'Students often believe the Constituent Assembly was "directly elected by the people of India" or that "all members were.',
          parts: [
                { id: 'a', prompt: 'Apply the seat allocation formula to a hypothetical province with a population of 12 million in 1946, where Muslims constituted 30% and Sikhs 5%.', answer: 'Total seats = 12 (1 per million)',
                  options: ['Total seats = 12 (1 per million)', 'directly elected by the people of India', 'all members were Congress nominees'],
                  hint: 'If stuck, revisit the Cabinet Mission Plan\'s three-tier scheme (Sections A, B, C) and the 1946.',
                  misconception: 'Students often believe the Constituent Assembly was "directly elected by the people of India" or that "all members were Congress nominees.".' }
          ],
            remediations: { 'the-constituent-assembly-was-directly': { steps: ['Have the student trace the electoral chain—1935 Act franchise → 1946 provincial elections → MLAs elect Constituent.', 'Show the Cabinet Mission Plan\'s seat allocation table (NCERT Class 11, Ch 10, Box 10.2) and ask them to calculate seats.', 'Contrast with the first Lok Sabha (1952) elected on universal adult franchise (Article 326).', 'Discuss why the Assembly\'s legitimacy rests on *deliberative inclusiveness* (all major viewpoints heard) rather than.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_10_006', difficulty: 'standard',
          question: 'The Objectives Resolution, moved by Jawaharlal Nehru in the Constituent.',
          hint: 'Revisit c11_ps_cbse_10_005 (Constituent Assembly composition and role) and.',
          misconception: 'Students often believe the Objectives Resolution and the Preamble are the same document with different names.',
          parts: [
                { id: 'a', prompt: 'What was the exact date on which Jawaharlal Nehru moved the Objectives Resolution in the Constituent Assembly, and what was the immediate outcome of that.', answer: 'Nehru moved the Objectives Resolution on 13 December 1946',
                  options: ['Nehru moved the Objectives Resolution on 13 December 1946', 'socialist, secular', 'sovereign independent republic', 'sovereign democratic republic'],
                  hint: 'Revisit c11_ps_cbse_10_005 (Constituent Assembly composition and role) and c7_civ_ch02_010.',
                  misconception: 'Students often believe the Objectives Resolution and the Preamble are the same document with different names.' },
                { id: 'b', prompt: 'A student argues: "The Objectives Resolution was just a speech; it had no legal force because it wasn\'t a law." Using the Constituent Assembly\'s own procedure.', answer: 'The Resolution was adopted as a formal resolution of the Constituent Assembly',
                  options: ['The Resolution was adopted as a formal resolution of the Constituent Assembly', 'constitutive power', 'socialist, secular', 'sovereign independent republic'],
                  hint: 'Revisit c11_ps_cbse_10_005 (Constituent Assembly composition and role) and c7_civ_ch02_010.',
                  misconception: 'Students often believe the Objectives Resolution and the Preamble are the same document with different names.' }
          ],
            remediations: { 'the-objectives-resolution-and-the': { steps: ['I (available online) and read the 13 Dec 1946 session: note Nehru\'s opening words "This Resolution is something more.', 'Place the Resolution text and the final Preamble side-by-side; highlight every word that changed (e.g., "independent".', 'Write a 3-sentence explanation of *why* each change occurred (e.g., "independent" became redundant after the Indian.', 'Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
