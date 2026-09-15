import type { SimDef } from '../../engine/types';
import C12_PsyTherapeuticApproachesCBSESim from '../../../simulations/c6_12_new/C12_PsyTherapeuticApproachesCBSESim';

/** v3 wrapped master — C12_PsyTherapeuticApproachesCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_psytherapeuticapproachescbsesim: SimDef = {
    id: 'v3w_c12_psytherapeuticapproachescbsesim',
    title: 'Psy Therapeutic Approaches CBSE',
    subtitle: 'This node covers the six-parameter classification framework for the three major.',
    classLevel: 12, subject: 'science', topic: 'Classification of Psychotherapies: Psychodynamic, Behavioural and Existential Parameters',
    chapters: [],
    nodeIds: ['c12_psy_cbse_05_003', 'c12_psy_cbse_05_004', 'c12_psy_cbse_05_008', 'c12_psy_cbse_05_010', 'c12_psy_cbse_05_001', 'c12_psy_cbse_05_002', 'c12_psy_cbse_05_009', 'c12_psy_cbse_05_006', 'c12_psy_cbse_05_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a Class 12 student, Rohan, who experiences intense anxiety before exams.', goal: 'Master Psy Therapeutic Approaches CBSE.' },
    discovery: {
        question: 'A client seeks therapy for social anxiety. The therapist focuses on "faulty conditioning patterns" and "maladaptive thought patterns" acquired through.',
        options: ['This therapist follows behavioural therapy', 'faulty learning of behaviours and cognitions', 'intrapsychic conflicts from childhood'],
        answer: 'This therapist follows behavioural therapy',
        hook: 'Students treat the three classifications as merely "different techniques for the same problems" rather than.',
    },
    teaching: [
        { title: 'Classification of psychotherapies is the.', text: 'Classification of psychotherapies is the systematic categorisation of therapeutic approaches based on six core parameters: (1) the presumed cause of psychological problems, (2) the origin of that.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
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
        { type: 'scaffold', nodeId: 'c12_psy_cbse_05_004', title: 'Behaviour therapy is a therapeutic.',
          scaffold: { problem: 'A 16-year-old, Priya, pulls her hair (trichotillomania) while studying for board exams.',
            steps: [
            { text: 'Define target behaviour operationally — "pulling out hair strands from scalp/eyebrows, counted per 30-min study.' },
            { text: 'Identify antecedents — visual cue (split ends in mirror), tactile cue (running fingers through hair), internal cue.' },
            { text: 'Identify maintaining consequences — immediate sensory relief (negative reinforcement: tension reduction), tactile.' },
            { text: 'Design antecedent operation — remove mirror from study area (abolishing operation for visual cue); wear a soft headband.' },
            { text: 'Design consequent operation — differential reinforcement of other behaviour (DRO): if Priya completes a 30-min session.', faded: true, blankAnswer: 'Target: hair-pulling frequency per 30-min session..' }
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
        { type: 'scaffold', nodeId: 'c12_psy_cbse_05_002', title: 'Therapeutic alliance is the.',
          scaffold: { problem: 'A 17-year-old student, Rohan, refuses to speak in his first therapy session for social anxiety.',
            steps: [
            { text: 'Address contractual nature — clarify voluntary partnership, limited duration, confidentiality to reduce fear of.' },
            { text: 'Demonstrate empathy — reflect Rohan\'s fear of being judged weak, showing the therapist feels his perspective.' },
            { text: 'Communicate unconditional positive regard — explicitly state that nothing Rohan shares will reduce the therapist\'s.' },
            { text: 'Integrate into a single coherent opening statement that sounds natural, not like a checklist.' },
            { text: 'Verify the statement covers all three components without jargon.', faded: true, blankAnswer: '"Rohan, this is completely voluntary — we work together.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_psy_cbse_05_004', title: 'Identify each idea',
          dissect: { specimen: 'Psy Therapeutic Approaches CBSE', spots: [
            { id: 's1', label: 'Classification of psychotherapies is the', prompt: 'Which idea is this? — Classification of psychotherapies is the systematic categorisation of therapeutic.', answer: 'Classification of psychotherapies is the', options: ['Classification of psychotherapies is the', 'Behaviour therapy is a therapeutic', 'Humanistic-existential therapy is a non-directive', 'Gestalt Therapy developed by Fritz'] },
            { id: 's2', label: 'Behaviour therapy is a therapeutic', prompt: 'Which idea is this? — Behaviour therapy is a therapeutic approach based on learning theory principles that.', answer: 'Behaviour therapy is a therapeutic', options: ['Behaviour therapy is a therapeutic', 'Classification of psychotherapies is the', 'Humanistic-existential therapy is a non-directive', 'Gestalt Therapy developed by Fritz'] },
            { id: 's3', label: 'Humanistic-existential therapy is a non-directive', prompt: 'Which idea is this? — Humanistic-existential therapy is a non-directive, growth-oriented approach that views.', answer: 'Humanistic-existential therapy is a non-directive', options: ['Humanistic-existential therapy is a non-directive', 'Classification of psychotherapies is the', 'Behaviour therapy is a therapeutic', 'Gestalt Therapy developed by Fritz'] },
            { id: 's4', label: 'Gestalt Therapy developed by Fritz', prompt: 'Which idea is this? — Gestalt Therapy, developed by Fritz and Laura Perls, is a humanistic-existential approach.', answer: 'Gestalt Therapy developed by Fritz', options: ['Gestalt Therapy developed by Fritz', 'Classification of psychotherapies is the', 'Behaviour therapy is a therapeutic', 'Humanistic-existential therapy is a non-directive'] },
            { id: 's5', label: 'Psychotherapy is a voluntary confidential', prompt: 'Which idea is this? — Psychotherapy is a voluntary, confidential interpersonal relationship between a.', answer: 'Psychotherapy is a voluntary confidential', options: ['Psychotherapy is a voluntary confidential', 'Classification of psychotherapies is the', 'Behaviour therapy is a therapeutic', 'Humanistic-existential therapy is a non-directive'] },
            { id: 's6', label: 'Therapeutic alliance is the collaborative', prompt: 'Which idea is this? — Therapeutic alliance is the collaborative, trusting, and confidential partnership between.', answer: 'Therapeutic alliance is the collaborative', options: ['Therapeutic alliance is the collaborative', 'Classification of psychotherapies is the', 'Behaviour therapy is a therapeutic', 'Humanistic-existential therapy is a non-directive'] }
          ] } }
    ],
    explore: { component: C12_PsyTherapeuticApproachesCBSESim, prompt: 'Explore the interactive — Psy Therapeutic Approaches CBSE' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_004', difficulty: 'standard',
          question: 'Behaviour therapy is a therapeutic approach based on learning theory principles.',
          hint: 'Revisit Class 11 Psychology nodes c11_psy_cbse_05_004 (Operant Conditioning) and.',
          misconception: 'Students often believe "antecedent operation" and "consequent operation" refer only to what happens *before* and.',
          parts: [
                { id: 'a', prompt: 'Design a token economy for a 14-year-old who refuses to do homework.', answer: 'target behaviour, (',
                  options: ['target behaviour, (', 'antecedent operation', 'consequent operation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "antecedent operation" and "consequent operation" refer only to what happens *before* and *after* the behaviour in a.' }
          ],
            remediations: { 'antecedent-operation-and-consequent-operation': { steps: ['If a student misclassifies operations, follow these steps: (1) Present a clear 2x2 table: rows = antecedent/consequent,.', '(2) Give 5 mini-scenarios (e.g., "teacher puts up \'quiet\' sign before class", "parent takes away toy after hitting").', '(4) Re-assess with a fresh case: "A student wears noise-cancelling headphones to study better.', 'Is this antecedent or consequent?"'] } } },
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
                  options: ['Psychotherapy is a voluntary, confidential interpersonal relationship between a', 'Classification of psychotherapies is the systematic categorisation of therapeutic', 'Behaviour therapy is a therapeutic approach based on learning theory principles that', 'Humanistic-existential therapy is a non-directive, growth-oriented approach that views'],
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
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_002', difficulty: 'standard',
          question: 'Therapeutic alliance is the collaborative, trusting, and confidential.',
          hint: 'Revisit c12_psy_cbse_05_001 "Nature and Process of Psychotherapy" and identify which.',
          misconception: 'Students often believe that "unconditional positive regard" means the therapist must approve of or agree with the.',
          parts: [
                { id: 'a', prompt: 'A client tells their therapist: "I stole money from my parents last week." The therapist responds: "I understand you\'re going through a tough time, but.', answer: 'Unconditional positive regard (UPR) is violated',
                  options: ['Unconditional positive regard (UPR) is violated', 'empathy is violated', 'unconditional positive regard'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "unconditional positive regard" means the therapist must approve of or agree with the client\'s harmful.' },
                { id: 'b', prompt: 'Design a brief "therapy contract" for a 16-year-old client with social anxiety.', answer: 'Contract elements: (1) Voluntary partnership',
                  options: ['Contract elements: (1) Voluntary partnership', 'unconditional positive regard'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "unconditional positive regard" means the therapist must approve of or agree with the client\'s harmful.' }
          ],
            remediations: { 'unconditional-positive-regard-means-the': { steps: ['If a student confuses UPR with approval of harmful behaviours: (1) Have them re-read the NCERT line: "therapist.', 'not judging the client and will continue to show the same positive feelings...', 'even if the client is rude or confides all the \'wrong\' things." (2) Ask: "Does \'not judging the person\' mean \'agreeing.', 'I still care about you and we\'ll work on this." Therapist approving: "Hitting is fine." (4) Assign a 2-minute write:.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "unconditional positive regard" means the therapist must approve of or agree with the.',
          parts: [
                { id: 'a', prompt: 'Create a 3-minute role-play script between a therapist and a client that demonstrates ALL three components of therapeutic alliance (contractual nature,.', answer: 'Sample script: Therapist: "Welcome',
                  options: ['Sample script: Therapist: "Welcome', 'unconditional positive regard'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "unconditional positive regard" means the therapist must approve of or agree with the client\'s harmful.' }
          ],
            remediations: { 'unconditional-positive-regard-means-the': { steps: ['If a student confuses UPR with approval of harmful behaviours: (1) Have them re-read the NCERT line: "therapist.', 'not judging the client and will continue to show the same positive feelings...', 'even if the client is rude or confides all the \'wrong\' things." (2) Ask: "Does \'not judging the person\' mean \'agreeing.', 'I still care about you and we\'ll work on this." Therapist approving: "Hitting is fine." (4) Assign a 2-minute write:.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
