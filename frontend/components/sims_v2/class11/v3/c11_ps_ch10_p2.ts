import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch10_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch10_p2: SimDef = {
    id: 'v3_c11_ps_ch10_p2',
    title: 'Constitution: Why and How · Part 2/2',
    subtitle: 'Discover the document that binds even its own amenders.',
    classLevel: 11, subject: 'political_science', topic: 'Constitution: Why and How · Part 2/2',
    chapters: ['c11_ps_ch10'],
    nodeIds: ['c11_ps_cbse_10_007', 'c11_ps_cbse_10_008', 'c11_ps_cbse_10_009', 'c11_ps_cbse_10_010', 'c11_ps_cbse_10_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a constitutional lawyer asking who guards the guardrails', intro: 'Parliament passed a law; the Court struck it down; neither is sovereign — in India the document itself sits at the top.', goal: 'Explain constitutional supremacy, the Basic Structure doctrine, and constitutionalism\'s logic.' },
    discovery: {
        question: 'Parliament can amend the Constitution under Article 368 — so Parliament, not the Constitution, is truly supreme?',
        options: ['No — the Basic Structure doctrine (Kesavananda 1973) means even amendments face constitutional limits; the text outranks its editors', 'Yes — whoever amends is sovereign', 'Yes — the UK model applies here', 'No — because the President can veto amendments'],
        answer: 'No — the Basic Structure doctrine (Kesavananda 1973) means even amendments face constitutional limits; the text outranks its editors',
        hook: 'And the Court isn\'t above the Constitution either — constitutional supremacy means everyone, elected or appointed, answers to the document.',
    },
    teaching: [
        { title: 'Drafting Committee and the role of Dr. B.R. Ambedkar', text: 'The Drafting Committee, constituted on 29 August 1947, was the seven-member committee of the Constituent Assembly tasked with preparing the first draft of the Constitution of India. Dr. B.R.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Explain how unelected judges could strike down the NJAC Act without becoming supreme themselves, then argue whether virtuous leaders make constitutions unnecessary.',
        labels: ['Drafting Committee and', 'Sources of the Indian', 'Procedures of constitution-making: Deliberation', 'Constitution as a product', 'Institutional design: Separation'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_10_007', title: 'Drafting Committee and the role of Dr. B.R. Ambedkar',
          caseStudy: { intro: 'Imagine you are part of a team writing rules for a new housing society with 300 families of different religions, languages, and income levels.',
            decisions: [{ prompt: 'Who was the Chairman of the Drafting Committee of the Indian Constituent Assembly, and on what date was the committee constituted?', options: [
                { text: 'Dr', outcome: 'Dr. B.R. Ambedkar was the Chairman; the committee was constituted on 29 August 1947.' },
                { text: 'wrote the Constitution alone', outcome: 'Not quite — Students often believe Ambedkar "wrote the Constitution alone" or that the Drafting Committee had.', reveals: 'ambedkar-wrote-the-constitution-alone' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_10_008', title: 'Sources of the Indian Constitution: Borrowed features and their origins',
          caseStudy: { intro: 'Imagine you are designing a smartphone for a diverse market: you take the best camera from one company, the battery technology from another, and the operating.',
            decisions: [{ prompt: 'List any three features of the Indian Constitution borrowed from the British Constitution and their corresponding articles.', options: [
                { text: 'Parliamentary system of government (Articles 74, 75), Rule of Law (Article 14), and', outcome: 'Parliamentary system of government (Articles 74, 75), Rule of Law (Article 14), and Single.' },
                { text: 'borrowed features', outcome: 'Not quite — Students believe "borrowed features" means the Indian Constitution lacks originality—a.', reveals: 'borrowed-features-means-the-indian' },
                { text: 'cut-and-paste job', outcome: 'Not quite — Students believe "borrowed features" means the Indian Constitution lacks originality—a.', reveals: 'borrowed-features-means-the-indian' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_10_009', title: 'Procedures of constitution-making: Deliberation and consensus',
          caseStudy: { intro: 'Imagine your class must create a "Class Constitution" for a year-long project. If the teacher imposes rules, some students may feel unheard.',
            decisions: [{ prompt: 'What was the primary role of the Drafting Committee chaired by Dr. B.R. Ambedkar in the Constituent Assembly\'s procedure?', options: [
                { text: 'The Drafting Committee (formed on 29 August 1947) was tasked with preparing a draft', outcome: 'The Drafting Committee (formed on 29 August 1947) was tasked with preparing a draft constitution.' },
                { text: 'it wrote the Constitution alone', outcome: 'Not quite — Students often believe "consensus" means every member agreed on every word.', reveals: 'consensus-means-every-member-agreed' },
                { text: 'it only translated the Constitution', outcome: 'Not quite — Students often believe "consensus" means every member agreed on every word.', reveals: 'consensus-means-every-member-agreed' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_10_010', title: 'Constitution as a product of deliberation vs imposed document',
          caseStudy: { intro: 'Imagine your school is drafting a new student council constitution. Option A: The principal writes it alone and announces it.',
            decisions: [{ prompt: 'What is the defining procedural difference between a deliberative constitution and an imposed constitution in terms of authorship and.', options: [
                { text: 'A deliberative constitution is authored collectively by a representative body through', outcome: 'A deliberative constitution is authored collectively by a representative body through structured.' },
                { text: 'deliberative means it has a preamble', outcome: 'Not quite — Students often equate "deliberative constitution" with "democratically elected constitution".', reveals: 'students-often-equate-deliberative-constitution' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_10_011', title: 'Institutional design: Separation of powers and checks and balances',
          caseStudy: { intro: 'Imagine a school where the principal makes the rules, enforces them, and also decides punishments for breaking them. Would that be fair?',
            decisions: [{ prompt: 'What are the three organs of government in India as per the Constitution, and which article directs the separation of judiciary from.', options: [
                { text: 'The three organs are Legislature, Executive, and Judiciary', outcome: 'The three organs are Legislature, Executive, and Judiciary. Article 50 (a Directive Principle).' },
                { text: 'the President, Prime Minister, and Chief Justice as the three organs', outcome: 'Not quite — Students often think separation of powers means complete isolation of the three organs with.', reveals: 'separation-of-powers-means-complete' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Discussing the NJAC verdict in a polity club, a student objects: \'How can unelected judges strike down a law Parliament passed? That puts the Supreme Court above the Constitution — judicial supremacy.\'',
            decisions: [{ prompt: 'Who is actually supreme in India\'s system?', options: [
                { text: 'Locate supremacy correctly: the CONSTITUTION is supreme — Article 13 voids any law inconsistent with Fundamental Rights. The Court is the Constitution\'s guardian, not its master: striking down NJAC enforced Articles 124/217/50, not judicial will. India isn\'t parliamentary sovereignty either — Parliament legislates within constitutional limits, which is precisely why review exists.', outcome: 'The objection dissolves: the Court didn\'t override democracy — it enforced the document that defines what Parliament may do.' },
                { text: 'Back the objection — elected Parliament should outrank unelected judges.', outcome: 'That imports UK-style parliamentary sovereignty: in India the Constitution binds Parliament itself — judicial review is the enforcement mechanism, not a rival sovereign.', reveals: 'parliament-is-sovereign' },
                { text: 'Split it — the Court is supreme over the Constitution since it interprets it.', outcome: 'Interpretation serves the text: the Court\'s power exists because the Constitution grants it — the guardian can\'t be above what it guards.', reveals: 'court-above-constitution' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_10_011', title: 'You made it',
          caseStudy: { intro: 'A constitution isn\'t just a rights list — it\'s the machine that stops a well-meaning majority from easily unmaking them.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_10_007', difficulty: 'standard',
          question: 'The Drafting Committee, constituted on 29 August 1947, was the seven-member.',
          hint: 'Revisit c11_ps_cbse_10_005: focus on the resolution of 29 Aug 1947 that created the.',
          misconception: 'Students often believe Ambedkar "wrote the Constitution alone" or that the Drafting Committee had complete autonomy.',
          parts: [
                { id: 'a', prompt: 'Why was a separate Drafting Committee needed when the Constituent Assembly already had legal experts like Alladi Krishnaswami Ayyar and K.M. Munshi as members?', answer: 'The Assembly (389 members) was too large for clause-by-clause drafting',
                  options: ['The Assembly (389 members) was too large for clause-by-clause drafting', 'to reduce workload', 'wrote the Constitution alone'],
                  hint: 'Revisit c11_ps_cbse_10_005: focus on the resolution of 29 Aug 1947 that created the Drafting.',
                  misconception: 'Students often believe Ambedkar "wrote the Constitution alone" or that the Drafting Committee had complete autonomy.' },
                { id: 'b', prompt: 'Compare Ambedkar\'s role in drafting the Fundamental Rights chapter (Part III) with his role in the Directive Principles (Part IV).', answer: 'For Fundamental Rights, Ambedkar insisted on precise legal language and judicial',
                  options: ['For Fundamental Rights, Ambedkar insisted on precise legal language and judicial', 'he opposed Directive Principles', 'wrote the Constitution alone'],
                  hint: 'Revisit c11_ps_cbse_10_005: focus on the resolution of 29 Aug 1947 that created the Drafting.',
                  misconception: 'Students often believe Ambedkar "wrote the Constitution alone" or that the Drafting Committee had complete autonomy.' }
          ],
            remediations: { 'ambedkar-wrote-the-constitution-alone': { steps: ['Re-read the timeline – Constituent Assembly first sitting (9 Dec 1946) → Sub-committees report (Apr–Jul 1947) →.', 'Watch 5-min clip of Ambedkar\'s 25 Nov 1949 speech (CAD Vol XI) where he credits the Assembly, not himself.', 'Map one article (e.g., Art 17) from sub-committee recommendation → Drafting Committee wording → Assembly debate → final.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_10_008', difficulty: 'standard',
          question: 'The Indian Constitution adopts a selective borrowing approach, incorporating.',
          hint: 'Revisit c11_ps_cbse_10_007 (Drafting Committee and role of Dr. B.R.',
          misconception: 'Students believe "borrowed features" means the Indian Constitution lacks originality—a "cut-and-paste job." They quote.',
          parts: [
                { id: 'a', prompt: 'A new democracy wants to borrow India\'s model of Directive Principles (non-justiciable but morally binding guidelines for governance).', answer: 'The Indian innovation is Article 37',
                  options: ['The Indian innovation is Article 37', 'borrowed features', 'cut-and-paste job'],
                  hint: 'Revisit c11_ps_cbse_10_007 (Drafting Committee and role of Dr. B.R.',
                  misconception: 'Students believe "borrowed features" means the Indian Constitution lacks originality—a "cut-and-paste job." They quote Dr.' }
          ],
            remediations: { 'borrowed-features-means-the-indian': { steps: ['Read Dr. Ambedkar\'s full speech (CAD Vol. VII, 4 Nov 1948) where he explains borrowing as "removing failures and.', 'Create a three-column table: Column A - Borrowed Feature (e.g., Judicial Review), Column B - Source Country (USA).', 'For each row, write one sentence explaining the specific Indian problem the adaptation solved (e.g., "Procedure.', 'Debate with a peer: "If we copied the US Second Amendment exactly, how would it affect India\'s Arms Act and internal.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "borrowed features" means the Indian Constitution lacks originality—a "cut-and-paste job." They quote.',
          parts: [
                { id: 'a', prompt: 'Evaluate the criticism that India\'s emergency provisions (Articles 352, 356, 360) borrowed from the Weimar Constitution create a \'constitutional dictatorship\'.', answer: 'The Weimar Article 48 allowed presidential rule by decree without parliamentary',
                  options: ['The Weimar Article 48 allowed presidential rule by decree without parliamentary', 'borrowed features', 'cut-and-paste job'],
                  hint: 'Revisit c11_ps_cbse_10_007 (Drafting Committee and role of Dr. B.R.',
                  misconception: 'Students believe "borrowed features" means the Indian Constitution lacks originality—a "cut-and-paste job." They quote Dr.' }
          ],
            remediations: { 'borrowed-features-means-the-indian': { steps: ['Read Dr. Ambedkar\'s full speech (CAD Vol. VII, 4 Nov 1948) where he explains borrowing as "removing failures and.', 'Create a three-column table: Column A - Borrowed Feature (e.g., Judicial Review), Column B - Source Country (USA).', 'For each row, write one sentence explaining the specific Indian problem the adaptation solved (e.g., "Procedure.', 'Debate with a peer: "If we copied the US Second Amendment exactly, how would it affect India\'s Arms Act and internal.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_10_009', difficulty: 'standard',
          question: 'The procedures of constitution-making in India refer to the structured.',
          hint: 'Revisit c11_ps_cbse_10_005 (Constituent Assembly composition and working) and.',
          misconception: 'Students often believe "consensus" means every member agreed on every word.',
          parts: [
                { id: 'a', prompt: 'Why did the Constituent Assembly adopt a consensus-oriented approach instead of relying solely on majority voting for key constitutional decisions?', answer: 'Consensus was pursued',
                  options: ['Consensus was pursued', 'majority voting was not allowed', 'consensus was faster', 'consensus'],
                  hint: 'Revisit c11_ps_cbse_10_005 (Constituent Assembly composition and working) and c11_ps_cbse_10_006.',
                  misconception: 'Students often believe "consensus" means every member agreed on every word.' }
          ],
            remediations: { 'consensus-means-every-member-agreed': { steps: ['Re-read the Objectives Resolution (c11_ps_cbse_10_006) to see the shared philosophical baseline.', 'Examine CAD excerpts on two contentious issues — language (Munshi-Ayyangar formula) and emergency powers (H.V.', 'List three provisions decided by majority vote despite strong minority opposition.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_10_010', difficulty: 'standard',
          question: 'The Indian Constitution is a product of deliberation because it emerged from 2.',
          hint: 'Revisit c11_ps_cbse_10_009: focus on the Advisory Committee\'s sub-committees (Fundamental.',
          misconception: 'Students often equate "deliberative constitution" with "democratically elected constitution" — assuming universal adult.',
          parts: [
                { id: 'a', prompt: 'Why did the Indian Constituent Assembly adopt a committee system (Advisory Committee, Drafting Committee, etc.) instead of debating every clause in the full.', answer: 'The committee system enabled specialized scrutiny, manageable deliberation, and',
                  options: ['The committee system enabled specialized scrutiny, manageable deliberation, and', 'to save time only'],
                  hint: 'Revisit c11_ps_cbse_10_009: focus on the Advisory Committee\'s sub-committees (Fundamental Rights.',
                  misconception: 'Students often equate "deliberative constitution" with "democratically elected constitution" — assuming universal adult franchise.' }
          ],
            remediations: { 'students-often-equate-deliberative-constitution': { steps: ['If the student conflates electoral origin with deliberative quality: Step 1 — Show the Indian Assembly\'s electoral.', 'its deliberative practices (Sub-Committee on Fundamental Rights included non-members like K.T.', 'Shah; 7,635 amendments moved; 2,473 discussed).', 'Step 2 — Contrast with Egypt 2012: elected assembly but 22-hour final session, no minority input, passed 234-article.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_10_011', difficulty: 'standard',
          question: 'Separation of powers is the constitutional division of governmental authority.',
          hint: 'Review Class 7 Civics Chapter 3 (Three Organs of Government) and Class 8 Civics Chapter 2.',
          misconception: 'Students often think separation of powers means complete isolation of the three organs with no overlap.',
          parts: [
                { id: 'a', prompt: 'What are the three organs of government in India as per the Constitution, and which article directs the separation of judiciary from executive?', answer: 'The three organs are Legislature, Executive, and Judiciary',
                  options: ['The three organs are Legislature, Executive, and Judiciary', 'the President, Prime Minister, and Chief Justice as the three organs'],
                  hint: 'Review Class 7 Civics Chapter 3 (Three Organs of Government) and Class 8 Civics Chapter 2.',
                  misconception: 'Students often think separation of powers means complete isolation of the three organs with no overlap.' },
                { id: 'b', prompt: 'A bill passed by Parliament is sent to the President. The President returns it for reconsideration.', answer: 'Under Article 111, the President must give assent to the bill',
                  options: ['Under Article 111, the President must give assent to the bill', 'the President can still refuse assent'],
                  hint: 'Review Class 7 Civics Chapter 3 (Three Organs of Government) and Class 8 Civics Chapter 2.',
                  misconception: 'Students often think separation of powers means complete isolation of the three organs with no overlap.' }
          ],
            remediations: { 'separation-of-powers-means-complete': { steps: ['Use the school analogy: Principal (executive), Student Council (legislature), Disciplinary Committee (judiciary).', 'Show how in a parliamentary system, the principal is chosen by the council and must retain its confidence.', 'Then map to the Indian Constitution: Articles 74, 75 (executive responsible to legislature), Articles 121, 122, 211.', 'Have the student list specific overlaps (e.g., ministers are MPs) and checks (e.g., no-confidence motion, judicial.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
