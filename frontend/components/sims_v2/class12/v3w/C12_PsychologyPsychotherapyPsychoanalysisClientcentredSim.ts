import type { SimDef } from '../../engine/types';
import C12_PsychologyPsychotherapyPsychoanalysisClientcentredSim from '../../../simulations/c6_12/C12_PsychologyPsychotherapyPsychoanalysisClientcentredSim';

/** v3 wrapped master — C12_PsychologyPsychotherapyPsychoanalysisClientcentredSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_psychologypsychotherapypsychoanalysisclientcentredsim: SimDef = {
    id: 'v3w_c12_psychologypsychotherapypsychoanalysisclientcentredsim',
    title: 'Gestalt Therapy (Perls) and Factors Contributing to Healing in Psychotherapy',
    subtitle: 'This node covers Gestalt Therapy (Perls) — its goals, key concepts (awareness, contact.',
    classLevel: 12, subject: 'psychology', topic: 'Gestalt Therapy (Perls) and Factors Contributing to Healing in Psychotherapy',
    chapters: [],
    nodeIds: ['c12_psy_cbse_05_010', 'c12_psy_cbse_05_001', 'c12_psy_cbse_05_003', 'c12_psy_cbse_05_006', 'c12_psy_cbse_05_008', 'c12_psy_cbse_05_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a student named Arjun who constantly says "I\'m fine" while clenching his fists and avoiding eye.', goal: 'Master Gestalt Therapy (Perls) and Factors Contributing to Healing in Psychotherapy.' },
    discovery: {
        question: 'A client in Gestalt Therapy says, "I feel angry at my boss but I can\'t show it." The therapist asks the client to imagine the boss sitting in an empty chair.',
        options: ['This illustrates the "Empty Chair" technique targeting *unfinished business*', 'it\'s just venting', 'acting out fantasies/conflicts'],
        answer: 'This illustrates the "Empty Chair" technique targeting *unfinished business*',
        hook: 'Students confuse Gestalt\'s "acting out fantasies/conflicts" with Psychodrama (Moreno) or simple role-play.',
    },
    teaching: [
        { title: 'Gestalt Therapy, developed by Fritz and.', text: 'Gestalt Therapy, developed by Fritz and Laura Perls, is a humanistic-existential approach that aims to increase an individual\'s self-awareness and self-acceptance by helping them recognize blocked.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_psy_cbse_05_010', title: 'Gestalt Therapy, developed by Fritz and.',
          scaffold: { problem: 'A 16-year-old, Rohan, is referred for school refusal. He says, "I don\'t know why I can\'t go.',
            steps: [
            { text: 'Session 1 — "Stay with the sensation" targets *body awareness* and *figure-ground formation* (chest tightness becomes.' },
            { text: 'Session 3 — Empty Chair with "The Part That Doesn\'t Want to Go" externalizes an *introject* (internalized parental.' },
            { text: 'Session 5 — Rohan\'s insight "scared of being judged like Dad judged me" shows *integration*: the disowned fear is now.' },
            { text: 'Map to NCERT\'s four healing factors: Technique (experiments), Alliance (warmth/empathy throughout), Catharsis (Session.' },
            { text: 'Verify — This is NOT CBT (no thought record), NOT Psychoanalysis (no free association/dream analysis), NOT.', faded: true, blankAnswer: 'Session 1: Figure-ground awareness + Catharsis/Alliance..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_05_001', title: 'Psychotherapy is a voluntary,.',
          scaffold: { problem: 'A 17-year-old student, Priya, experiences intense anxiety before board exams: sleeplessness, catastrophic thoughts ("I\'ll fail, my life is.',
            steps: [
            { text: 'Identify the core question — distinguish psychotherapy from informal helping using NCERT characteristics.' },
            { text: 'Recall Characteristic (i): Systematic application of theoretical principles.' },
            { text: 'Recall Characteristic (ii): Training under expert supervision.' },
            { text: 'Recall Therapeutic Alliance components: Contractual (goals, duration, confidentiality) + Limited duration.' },
            { text: 'Recall Relationship properties: Empathy (perspective-taking), Unconditional positive regard (non-judgmental),.' },
            { text: 'Synthesize into 5-point comparison table.', faded: true, blankAnswer: '| Criterion | School Counsellor (Psychotherapy) | Wise.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_05_003', title: 'Classification of psychotherapies is.',
          scaffold: { problem: 'A 30-year-old client presents with chronic procrastination and guilt.',
            steps: [
            { text: 'Identify the presumed cause (parameter 1) — therapist locates problem in "unconscious defence" against criticism, i.e.,.' },
            { text: 'Identify the origin of cause (parameter 2) — therapist traces it to "childhood" parental criticism, i.e., unfulfilled.' },
            { text: 'Identify the method (parameter 3) — therapist uses interpretation of unconscious meaning ("your procrastination.' },
            { text: 'Identify the relationship (parameter 4) — therapist interprets for the client ("therapist understands conflicts better.' },
            { text: 'Identify the chief benefit (parameter 5) — goal is "emotional insight" (understanding + accepting + changing emotions.' },
            { text: 'Note duration implication (parameter 6) — classical analysis takes years; modern versions 10-15 sessions.', faded: true, blankAnswer: 'Psychodynamic therapy. Parameter 1: intrapsychic conflicts.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_05_006', title: 'Cognitive therapy is a structured,.',
          scaffold: { problem: 'A 17-year-old student, Priya, receives a 78% on her Chemistry pre-board exam. She thinks: "I\'m stupid. I\'ll never get into a good college.',
            steps: [
            { text: 'Identify the Activating Event (A) — the objective situation that occurred. Here: "Received 78% on Chemistry pre-board."' },
            { text: 'Identify the Belief (B) — the irrational interpretation containing demands/awfulising. Here: "I *must* score 90%+.' },
            { text: 'Identify the Consequence (C) — emotional and behavioural outcome caused by B.' },
            { text: 'Formulate Disputing Questions (D) — target the irrationality types.' },
            { text: 'Verify the analysis — check that B contains "must/should" demands and awfulising, and that C follows from B, not A.', faded: true, blankAnswer: 'A = 78% on Chemistry pre-board. B = "I must score 90%+; 78%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_05_008', title: 'Humanistic-existential therapy is a.',
          scaffold: { problem: 'A 22-year-old college student, Priya, comes to therapy saying, “I’m doing everything right — good grades, internships, volunteering — but I.',
            steps: [
            { text: 'Identify the presenting distress not as a symptom (anxiety, depression) but as an existential crisis — Priya describes.' },
            { text: 'Recognise the blocked self-actualisation: Priya’s innate growth tendency has been diverted by strong “conditions of.' },
            { text: 'Note the absence of the three core conditions in her history: her parents’ regard was *conditional* (“We love you *if*.' },
            { text: 'Formulate the therapeutic goal: not symptom removal but restoring the *organismic valuing process* — helping Priya.' },
            { text: 'Plan Session 1: Establish the therapeutic alliance by offering unconditional positive regard (e.g., “You’ve carried a.' },
            { text: 'Plan Session 2: Invite exploration of the “robot” metaphor — “What does the robot feel inside when it’s performing.' },
            { text: 'Plan Session 3: Introduce the concept of *choice* (existential responsibility): “If you weren’t living for your.' },
            { text: 'Monitor for the emergence of the *actualising tendency*: increased spontaneity, willingness to express dislikes,.', faded: true, blankAnswer: 'Core issue = existential alienation and incongruence due to.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_05_009', title: 'Logotherapy (Viktor Frankl) is an.',
          scaffold: { problem: 'A 19-year-old college student says, "I feel empty — like nothing matters.',
            steps: [
            { text: 'Identify the presenting problem — pervasive emptiness, lack of purpose despite functional daily life.' },
            { text: 'Map to Logotherapy theory — this is "existential vacuum" (frustrated will to meaning), not clinical depression per se.' },
            { text: 'Select the most appropriate initial technique — Socratic dialogue (meaning-centred questioning) to activate the "will.' },
            { text: 'Formulate the therapist statement — a question that shifts focus from "how do I feel?" to "what is life asking of me?"' },
            { text: 'Verify — the statement is open-ended, meaning-focused, non-pathologising, and invites responsibility.', faded: true, blankAnswer: 'Core issue: Existential vacuum. Technique: Socratic.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_psy_cbse_05_001', title: 'Identify each idea',
          dissect: { specimen: 'Gestalt Therapy (Perls) and Factors Contributing to Healing in Psychotherapy', spots: [
            { id: 's1', label: 'Gestalt Therapy developed by Fritz', prompt: 'Which idea is this? — Gestalt Therapy, developed by Fritz and Laura Perls, is a humanistic-existential approach.', answer: 'Gestalt Therapy developed by Fritz', options: ['Gestalt Therapy developed by Fritz', 'Psychotherapy is a voluntary confidential', 'Classification of psychotherapies is the', 'Cognitive therapy is a structured'] },
            { id: 's2', label: 'Psychotherapy is a voluntary confidential', prompt: 'Which idea is this? — Psychotherapy is a voluntary, confidential interpersonal relationship between a.', answer: 'Psychotherapy is a voluntary confidential', options: ['Psychotherapy is a voluntary confidential', 'Gestalt Therapy developed by Fritz', 'Classification of psychotherapies is the', 'Cognitive therapy is a structured'] },
            { id: 's3', label: 'Classification of psychotherapies is the', prompt: 'Which idea is this? — Classification of psychotherapies is the systematic categorisation of therapeutic.', answer: 'Classification of psychotherapies is the', options: ['Classification of psychotherapies is the', 'Gestalt Therapy developed by Fritz', 'Psychotherapy is a voluntary confidential', 'Cognitive therapy is a structured'] },
            { id: 's4', label: 'Cognitive therapy is a structured', prompt: 'Which idea is this? — Cognitive therapy is a structured, short-term psychotherapy that identifies and modifies.', answer: 'Cognitive therapy is a structured', options: ['Cognitive therapy is a structured', 'Gestalt Therapy developed by Fritz', 'Psychotherapy is a voluntary confidential', 'Classification of psychotherapies is the'] },
            { id: 's5', label: 'Humanistic-existential therapy is a non-directive', prompt: 'Which idea is this? — Humanistic-existential therapy is a non-directive, growth-oriented approach that views.', answer: 'Humanistic-existential therapy is a non-directive', options: ['Humanistic-existential therapy is a non-directive', 'Gestalt Therapy developed by Fritz', 'Psychotherapy is a voluntary confidential', 'Classification of psychotherapies is the'] },
            { id: 's6', label: 'Logotherapy Viktor Frankl is an', prompt: 'Which idea is this? — Logotherapy (Viktor Frankl) is an existential therapy that helps clients discover meaning.', answer: 'Logotherapy Viktor Frankl is an', options: ['Logotherapy Viktor Frankl is an', 'Gestalt Therapy developed by Fritz', 'Psychotherapy is a voluntary confidential', 'Classification of psychotherapies is the'] }
          ] } }
    ],
    explore: { component: C12_PsychologyPsychotherapyPsychoanalysisClientcentredSim, prompt: 'Explore the interactive — Gestalt Therapy (Perls) and Factors Contributing to Healing in Psychotherapy' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_010', difficulty: 'standard',
          question: 'Gestalt Therapy, developed by Fritz and Laura Perls, is a.',
          hint: 'Revisit c12_psy_cbse_05_003 (Classification) and c12_psy_cbse_05_009 (Client-Centred.',
          misconception: 'Students confuse Gestalt\'s "acting out fantasies/conflicts" with Psychodrama (Moreno) or simple role-play.',
          parts: [
                { id: 'a', prompt: 'A client in Gestalt Therapy says, "I feel angry at my boss but I can\'t show it." The therapist asks the client to imagine the boss sitting in an empty chair.', answer: 'This illustrates the "Empty Chair" technique targeting *unfinished business*',
                  options: ['This illustrates the "Empty Chair" technique targeting *unfinished business*', 'it\'s just venting', 'acting out fantasies/conflicts'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse Gestalt\'s "acting out fantasies/conflicts" with Psychodrama (Moreno) or simple role-play.' }
          ],
            remediations: { 'students-confuse-gestalt-s-acting': { steps: ['If the student conflates Gestalt with role-play/skill-training: Step 1 — Re-read NCERT lines: "encouraging the client.', 'Step 2 — Contrast with c12_psy_cbse_05_005 (Behavioural Techniques: Modelling): there, client *observes and imitates* a.', 'Step 3 — Do a micro-diagnostic: Given a transcript "Therapist: \'Be your anger.', 'Speak from it.\'", identify the therapy (Gestalt) and why it\'s NOT modelling.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse Gestalt\'s "acting out fantasies/conflicts" with Psychodrama (Moreno) or simple role-play.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Gestalt Therapy is just role-play and emotional dramatisation; it lacks scientific rigour compared to CBT." Use the NCERT\'s.', answer: 'The statement is reductionist',
                  options: ['The statement is reductionist', 'acting out fantasies/conflicts'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse Gestalt\'s "acting out fantasies/conflicts" with Psychodrama (Moreno) or simple role-play.' }
          ],
            remediations: { 'students-confuse-gestalt-s-acting': { steps: ['If the student conflates Gestalt with role-play/skill-training: Step 1 — Re-read NCERT lines: "encouraging the client.', 'Step 2 — Contrast with c12_psy_cbse_05_005 (Behavioural Techniques: Modelling): there, client *observes and imitates* a.', 'Step 3 — Do a micro-diagnostic: Given a transcript "Therapist: \'Be your anger.', 'Speak from it.\'", identify the therapy (Gestalt) and why it\'s NOT modelling.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_001', difficulty: 'standard',
          question: 'Psychotherapy is a voluntary, confidential interpersonal relationship between a.',
          hint: 'If stuck, revisit Class 11 Chapter 1 (Psychology as a Discipline) for scientific nature.',
          misconception: 'Students believe "empathy = sympathy" and "therapeutic relationship = close friendship." They write: "Therapist feels.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Psychotherapy is a voluntary, confidential interpersonal relationship between a',
                  options: ['Psychotherapy is a voluntary, confidential interpersonal relationship between a', 'Gestalt Therapy, developed by Fritz and Laura Perls, is a humanistic-existential approach', 'Classification of psychotherapies is the systematic categorisation of therapeutic', 'Cognitive therapy is a structured, short-term psychotherapy that identifies and modifies'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "empathy = sympathy" and "therapeutic relationship = close friendship." They write: "Therapist feels sorry for client".' }
          ],
            remediations: { 'empathy-sympathy-and-therapeutic-relationship': { steps: ['Re-read NCERT pp. 90–93 focusing on the "Therapeutic Relationship" subsection.', 'Create a 3-column comparison: Term | NCERT Definition | Everyday Misuse (e.g., Empathy | "Putting oneself in other\'s.', 'Watch a 5-min therapy demo clip (e.g., Carl Rogers\' Gloria session) and pause every 30 seconds to label: "Is this.', 'Re-attempt Diagnostic Questions 2 and 4. If still stuck, revisit Class 11 node c11_psy_cbse_08_010 (Managing Negative.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "empathy = sympathy" and "therapeutic relationship = close friendship." They write: "Therapist feels.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Since psychotherapy is just talking, any caring teacher or parent can do it effectively if they read a few psychology books." Use.', answer: 'The statement is false',
                  options: ['The statement is false', 'books provide enough knowledge', 'empathy = sympathy', 'therapeutic relationship = close friendship'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "empathy = sympathy" and "therapeutic relationship = close friendship." They write: "Therapist feels sorry for client".' }
          ],
            remediations: { 'empathy-sympathy-and-therapeutic-relationship': { steps: ['Re-read NCERT pp. 90–93 focusing on the "Therapeutic Relationship" subsection.', 'Create a 3-column comparison: Term | NCERT Definition | Everyday Misuse (e.g., Empathy | "Putting oneself in other\'s.', 'Watch a 5-min therapy demo clip (e.g., Carl Rogers\' Gloria session) and pause every 30 seconds to label: "Is this.', 'Re-attempt Diagnostic Questions 2 and 4. If still stuck, revisit Class 11 node c11_psy_cbse_08_010 (Managing Negative.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_003', difficulty: 'standard',
          question: 'Classification of psychotherapies is the systematic categorisation of.',
          hint: 'If unable to link Class 11 theories to Class 12 therapy parameters, re-read.',
          misconception: 'Students treat the three classifications as merely "different techniques for the same problems" rather than.',
          parts: [
                { id: 'a', prompt: 'A client seeks therapy for social anxiety. The therapist focuses on "faulty conditioning patterns" and "maladaptive thought patterns" acquired through.', answer: 'This therapist follows behavioural therapy',
                  options: ['This therapist follows behavioural therapy', 'faulty learning of behaviours and cognitions', 'intrapsychic conflicts from childhood'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the three classifications as merely "different techniques for the same problems" rather than fundamentally different.' }
          ],
            remediations: { 'students-treat-the-three-classifications': { steps: ['Re-read the NCERT "Type of Therapies" section (pages 91-93) focusing ONLY on the six-parameter table.', 'Create a 3×6 grid (3 therapies × 6 parameters) on paper. Fill each cell in your own words without copying.', 'For each parameter, write ONE sentence explaining why psychodynamic and behavioural answers are mutually exclusive.', 'Re-attempt Diagnostic Questions 2 and 4. If still stuck, revisit c11_psy_cbse_01_008 (psychoanalysis),.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_006', difficulty: 'standard',
          question: 'Cognitive therapy is a structured, short-term psychotherapy that identifies and.',
          hint: 'If stuck, revisit **c11_psy_cbse_07_006 (Heuristics and Biases)** — map each cognitive.',
          misconception: '**Misconception:** "Ellis and Beck are the same — both just challenge negative thoughts." **Why it\'s wrong:** Students.',
          parts: [
                { id: 'a', prompt: 'State the full form of ABC in Ellis\' Rational Emotive Therapy and briefly explain what each letter represents in the sequence of emotional disturbance.', answer: 'ABC stands for **Antecedent (Activating event)',
                  options: ['ABC stands for **Antecedent (Activating event)', 'A = Anxiety, B = Behaviour, C = Consequence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Ellis and Beck are the same — both just challenge negative thoughts." **Why it\'s wrong:** Students conflate *cognitive.' },
                { id: 'b', prompt: 'A student thinks: "If I don\'t score 95% in Board exams, I am a complete failure and my life is ruined." Identify **two** irrational belief characteristics (per.', answer: 'Two irrational characteristics: 1',
                  options: ['Two irrational characteristics: 1', 'negative thinking', 'low confidence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Ellis and Beck are the same — both just challenge negative thoughts." **Why it\'s wrong:** Students conflate *cognitive.' },
                { id: 'c', prompt: '**Case:** Rahul, 17, is not selected for the school football team. He thinks: "The coach hates me. I\'ll never make any team.', answer: 'the **negative automatic thought (NAT)**, (',
                  options: ['the **negative automatic thought (NAT)**, (', 'Core schema: The coach hates me'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Ellis and Beck are the same — both just challenge negative thoughts." **Why it\'s wrong:** Students conflate *cognitive.' }
          ],
            remediations: { 'misconception-ellis-and-beck-are': { steps: ['If the student cannot distinguish Ellis vs.', '**Revisit node c12_psy_cbse_05_003 (Classification of Psychotherapies)** — review the parameter "Chief method of.', '**Create a 2-column table** with 5 rows: (a) Therapist role, (b) Core concept (ABC vs.', 'Schema/NAT), (c) Key technique (Disputation vs.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Ellis and Beck are the same — both just challenge negative thoughts." **Why it\'s wrong:** Students.',
          parts: [
                { id: 'a', prompt: '**Evaluate:** "Cognitive therapy is just \'positive thinking\' — telling depressed clients to think happy thoughts." Defend or refute this statement using.', answer: '**Refute.** Cognitive restructuring is **not** positive thinking',
                  options: ['**Refute.** Cognitive restructuring is **not** positive thinking', 'Yes, it makes you think positively'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Ellis and Beck are the same — both just challenge negative thoughts." **Why it\'s wrong:** Students conflate *cognitive.' }
          ],
            remediations: { 'misconception-ellis-and-beck-are': { steps: ['If the student cannot distinguish Ellis vs.', '**Revisit node c12_psy_cbse_05_003 (Classification of Psychotherapies)** — review the parameter "Chief method of.', '**Create a 2-column table** with 5 rows: (a) Therapist role, (b) Core concept (ABC vs.', 'Schema/NAT), (c) Key technique (Disputation vs.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_008', difficulty: 'standard',
          question: 'Humanistic-existential therapy is a non-directive, growth-oriented approach.',
          hint: 'If stuck, revisit c11_psy_cbse_01_009 (Humanistic Psychology: Maslow and Rogers on.',
          misconception: 'Students often conflate “unconditional positive regard” with “agreeing with everything the client says” or “being.',
          parts: [
                { id: 'a', prompt: 'A client says, “I feel like I’m living someone else’s life. I’m anxious all the time but I don’t know why.” Using humanistic-existential concepts, explain the.', answer: 'The anxiety is existential',
                  options: ['The anxiety is existential', 'irrational thoughts', 'childhood trauma'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate “unconditional positive regard” with “agreeing with everything the client says” or “being nice.” They write: “The.' },
                { id: 'b', prompt: 'Compare and contrast the therapeutic relationship in psychodynamic therapy vs.', answer: 'therapist’s assumed expertise, (',
                  options: ['therapist’s assumed expertise, (', 'non-directive', 'uses transference'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate “unconditional positive regard” with “agreeing with everything the client says” or “being nice.” They write: “The.' }
          ],
            remediations: { 'students-often-conflate-unconditional-positive': { steps: ['If a student shows this misconception: (1) Have them re-read the NCERT lines: “The therapist conveys by her/his words.', 'What does it mean for the *relationship*?” (3) Role-play: Student plays therapist; you play a client who admits to.', 'Student must respond with UPR *without* saying “Cheating is fine.” Debrief: UPR = “I see you, I accept you as a person.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often conflate “unconditional positive regard” with “agreeing with everything the client says” or “being.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: “Humanistic-existential therapy is only suitable for high-functioning, verbally articulate clients with mild distress.” Use evidence.', answer: 'The statement is a common misconception',
                  options: ['The statement is a common misconception', 'non-judgmental', 'no evaluation at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate “unconditional positive regard” with “agreeing with everything the client says” or “being nice.” They write: “The.' },
                { id: 'b', prompt: 'Design a 5-minute role-play scenario for a classroom demonstration that illustrates the *difference* between a behavioural therapist’s response and a.', answer: 'Client: “I can’t stop procrastinating',
                  options: ['Client: “I can’t stop procrastinating', 'non-judgmental', 'no evaluation at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate “unconditional positive regard” with “agreeing with everything the client says” or “being nice.” They write: “The.' },
                { id: 'c', prompt: 'Compare and contrast the therapeutic relationship in psychodynamic therapy vs.', answer: 'therapist’s assumed expertise, (',
                  options: ['therapist’s assumed expertise, (', 'non-directive', 'uses transference', 'non-judgmental'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate “unconditional positive regard” with “agreeing with everything the client says” or “being nice.” They write: “The.' }
          ],
            remediations: { 'students-often-conflate-unconditional-positive': { steps: ['If a student shows this misconception: (1) Have them re-read the NCERT lines: “The therapist conveys by her/his words.', 'What does it mean for the *relationship*?” (3) Role-play: Student plays therapist; you play a client who admits to.', 'Student must respond with UPR *without* saying “Cheating is fine.” Debrief: UPR = “I see you, I accept you as a person.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_009', difficulty: 'standard',
          question: 'Logotherapy (Viktor Frankl) is an existential therapy that helps clients.',
          hint: 'If stuck, revisit c11_psy_cbse_01_009 (Rogers\' self-theory) and c12_psy_cbse_05_008.',
          misconception: 'Students often write that "Logotherapy is just about finding meaning" and "Client-Centred Therapy is just about being.',
          parts: [
                { id: 'a', prompt: 'A client says, "I\'m terrified of having a panic attack in the exam hall." The therapist replies, "So you\'re really scared that panic will strike right when you.', answer: 'Therapy: Client-Centred Therapy',
                  options: ['Therapy: Client-Centred Therapy', 'or *paradoxical intention*', 'A wrong answer that labels the Rogerian response as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write that "Logotherapy is just about finding meaning" and "Client-Centred Therapy is just about being nice." In board.' },
                { id: 'b', prompt: 'Compare the therapeutic relationship in Logotherapy and Client-Centred Therapy on: (a) therapist self-disclosure, (b) stance on transference, (c) directiveness.', answer: 'therapist self-disclosure, (',
                  options: ['therapist self-disclosure, (', 'Logotherapy is just about finding meaning', 'Client-Centred Therapy is just about being nice'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write that "Logotherapy is just about finding meaning" and "Client-Centred Therapy is just about being nice." In board.' }
          ],
            remediations: { 'students-often-write-that-logotherapy': { steps: ['If a student cannot distinguish the two therapies, have them: (1) Re-read NCERT pages 98–99 and create a two-column.', '(2) Watch a 5-min video clip of each therapy (Frankl\'s "Man\'s Search for Meaning" lecture; Rogers\' "Gloria" session).', '(3) Re-attempt Diagnostic Questions 3 and 4.', '(4) If confusion persists, revisit c11_psy_cbse_01_009 (Humanistic Psychology: Maslow and Rogers) for Rogers\' core.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write that "Logotherapy is just about finding meaning" and "Client-Centred Therapy is just about being.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Logotherapy and Client-Centred Therapy are essentially the same because both value the client\'s subjective experience and aim for.', answer: 'The statement is partially true but fundamentally flawed',
                  options: ['The statement is partially true but fundamentally flawed', 'Logotherapy is just about finding meaning', 'Client-Centred Therapy is just about being nice'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write that "Logotherapy is just about finding meaning" and "Client-Centred Therapy is just about being nice." In board.' },
                { id: 'b', prompt: 'Design a 3-session intervention plan for a 16-year-old who feels "life has no purpose after failing boards." Session 1: Logotherapy technique.', answer: 'Session 1 (Logotherapy',
                  options: ['Session 1 (Logotherapy', 'Logotherapy is just about finding meaning', 'Client-Centred Therapy is just about being nice'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write that "Logotherapy is just about finding meaning" and "Client-Centred Therapy is just about being nice." In board.' },
                { id: 'c', prompt: 'Compare the therapeutic relationship in Logotherapy and Client-Centred Therapy on: (a) therapist self-disclosure, (b) stance on transference, (c) directiveness.', answer: 'therapist self-disclosure, (',
                  options: ['therapist self-disclosure, (', 'Logotherapy is just about finding meaning', 'Client-Centred Therapy is just about being nice'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write that "Logotherapy is just about finding meaning" and "Client-Centred Therapy is just about being nice." In board.' }
          ],
            remediations: { 'students-often-write-that-logotherapy': { steps: ['If a student cannot distinguish the two therapies, have them: (1) Re-read NCERT pages 98–99 and create a two-column.', '(2) Watch a 5-min video clip of each therapy (Frankl\'s "Man\'s Search for Meaning" lecture; Rogers\' "Gloria" session).', '(3) Re-attempt Diagnostic Questions 3 and 4.', '(4) If confusion persists, revisit c11_psy_cbse_01_009 (Humanistic Psychology: Maslow and Rogers) for Rogers\' core.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
