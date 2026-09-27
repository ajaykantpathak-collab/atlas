import type { SimDef } from '../../engine/types';

/** v3 generated — c12_psy_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_psy_ch05_p1: SimDef = {
    id: 'v3_c12_psy_ch05_p1',
    title: 'Therapeutic Approaches · Part 1/2',
    subtitle: 'It sounded like empathy — it was sympathy',
    classLevel: 12, subject: 'psychology', topic: 'Therapeutic Approaches · Part 1/2',
    chapters: ['c12_psy_ch05'],
    nodeIds: ['c12_psy_cbse_05_001', 'c12_psy_cbse_05_002', 'c12_psy_cbse_05_003', 'c12_psy_cbse_05_004', 'c12_psy_cbse_05_005', 'c12_psy_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Alliance architect', intro: 'A friend says \'don\'t worry.\' A therapist asks you to notice the catastrophic thought. The frame is the difference.', goal: 'Define psychotherapy\'s structure — goals, characteristics, and the alliance\'s contract, duration and empathy.' },
    discovery: {
        question: '\'I understand exactly — I failed my boards too.\' A therapist says this with warmth, and it\'s still the wrong response. What\'s missing?',
        options: ['Empathy — feeling like the client, not for them; sharing your own story is sympathy, which pulls the focus off the client\'s experience', 'Nothing — warmth plus shared experience is textbook empathy', 'More concrete advice — the client needs solutions, not stories', 'A diagnosis first — feelings cannot be addressed before labels'],
        answer: 'Empathy — feeling like the client, not for them; sharing your own story is sympathy, which pulls the focus off the client\'s experience',
        hook: 'Therapy isn\'t \'paid friendship\' — the frame does the healing: a contract with goals, a limited duration, confidentiality with teeth, and regard that doesn\'t depend on the client pleasing you. \'Any caring teacher with a book\' misses that training under supervision is a requirement, not a bonus.',
    },
    teaching: [
        { title: 'Nature and Process of Psychotherapy: Goals, Characteristics and Therapeutic Relationship', text: 'Psychotherapy is a voluntary, confidential interpersonal relationship between a professionally trained therapist and a client seeking help for psychological distress, characterized by systematic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_psy_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build the therapeutic alliance from a first session: map \'12 weekly sessions\' and \'confidential unless harm\' onto their components, and separate empathy from the sympathy that sounds identical.',
        labels: ['Nature and Process', 'Therapeutic Alliance: Contractual Nature,', 'Classification of Psychotherapies: Psychodynamic,', 'Behaviour Therapy: Behavioural Analysis,', 'Behavioural Techniques: Aversive Conditioning,', 'Cognitive Therapy: Ellis\' Rational'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_psy_cbse_05_001', title: 'Nature and Process of Psychotherapy: Goals, Characteristics and Therapeutic Relationship',
          caseStudy: { intro: 'Imagine you\'re feeling overwhelmed before board exams — anxious, unable to sleep, snapping at family.',
            decisions: [{ prompt: 'List the four characteristics of psychotherapy as stated in the NCERT textbook. (REMEMBER level)', options: [
                { text: 'The four characteristics are: (i) systematic application of principles underlying', outcome: 'The four characteristics are: (i) systematic application of principles underlying different.' },
                { text: 'therapist gives advice', outcome: 'Not quite — Students believe "empathy = sympathy" and "therapeutic relationship = close friendship." They.', reveals: 'empathy-sympathy-and-therapeutic-relationship' },
                { text: 'client must be mentally ill', outcome: 'Not quite — Students believe "empathy = sympathy" and "therapeutic relationship = close friendship." They.', reveals: 'empathy-sympathy-and-therapeutic-relationship' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_05_002', title: 'Therapeutic Alliance: Contractual Nature, Empathy and Unconditional Positive Regard',
          caseStudy: { intro: 'Imagine you are a Class 12 student who has just confided in a trusted teacher about severe exam anxiety.',
            decisions: [{ prompt: 'Define therapeutic alliance and state its two major components as per NCERT Class 12 Psychology Chapter 5.', options: [
                { text: 'Therapeutic alliance is the special confidential interpersonal relationship between', outcome: 'Therapeutic alliance is the special confidential interpersonal relationship between client and.' },
                { text: 'limited duration', outcome: 'Not quite — Students often believe that "unconditional positive regard" means the therapist must approve of.', reveals: 'unconditional-positive-regard-means-the' },
                { text: 'unconditional positive regard', outcome: 'Not quite — Students often believe that "unconditional positive regard" means the therapist must approve of.', reveals: 'unconditional-positive-regard-means-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_05_003', title: 'Classification of Psychotherapies: Psychodynamic, Behavioural and Existential Parameters',
          caseStudy: { intro: 'Imagine a Class 12 student, Rohan, who experiences intense anxiety before exams.',
            decisions: [{ prompt: 'Name the three broad groups of psychotherapies classified in the NCERT textbook and state the chronological order in which they emerged.', options: [
                { text: 'The three broad groups are psychodynamic, behavioural, and existential', outcome: 'The three broad groups are psychodynamic, behavioural, and existential (humanistic-existential).' },
                { text: 'CBT as a separate broad group, or reversing the order', outcome: 'Not quite — Students treat the three classifications as merely "different techniques for the same problems".', reveals: 'students-treat-the-three-classifications' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_05_004', title: 'Behaviour Therapy: Behavioural Analysis, Antecedent and Consequent Operations',
          caseStudy: { intro: 'Imagine a Class 12 student, Rohan, who procrastinates on studying by scrolling social media until 2 AM, then feels anxious and sleeps poorly.',
            decisions: [{ prompt: 'Define "malfunctioning behaviour," "antecedent factors," and "maintaining factors" in behavioural analysis.', options: [
                { text: 'Malfunctioning behaviour: any overt or covert action causing distress to the client', outcome: 'Malfunctioning behaviour: any overt or covert action causing distress to the client (e.g., smoking.' },
                { text: 'anxiety relief', outcome: 'Not quite — Students often believe "antecedent operation" and "consequent operation" refer only to what happens.', reveals: 'antecedent-operation-and-consequent-operation' },
                { text: 'symptom', outcome: 'Not quite — Students often believe "antecedent operation" and "consequent operation" refer only to what happens.', reveals: 'antecedent-operation-and-consequent-operation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_05_005', title: 'Behavioural Techniques: Aversive Conditioning, Token Economy and Systematic Desensitisation (Wolpe)',
          caseStudy: { intro: 'Imagine a 16‑year‑old who cannot enter a classroom because of an intense fear of lizards (phobia), a 12‑year‑old with ADHD who rarely completes homework, and.',
            decisions: [{ prompt: '**REMEMBER**: State the principle of reciprocal inhibition and name the technique that directly applies it.', options: [
                { text: '**Answer**: Reciprocal inhibition states that two mutually opposing physiological states', outcome: '**Answer**: Reciprocal inhibition states that two mutually opposing physiological states (e.g.' },
                { text: 'aversive conditioning', outcome: 'Not quite — **Misconception**: "Aversive conditioning, token economy, and systematic desensitisation are just.', reveals: 'misconception-aversive-conditioning' },
                { text: 'token economy', outcome: 'Not quite — **Misconception**: "Aversive conditioning, token economy, and systematic desensitisation are just.', reveals: 'misconception-aversive-conditioning' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_05_006', title: 'Cognitive Therapy: Ellis\' Rational Emotive Therapy (ABC Analysis) and Beck\'s Cognitive Restructuring',
          caseStudy: { intro: 'Imagine your friend says, "I failed one test — I\'m a total failure and will never succeed in life." You notice they jump from one event to a global.',
            decisions: [{ prompt: 'State the full form of ABC in Ellis\' Rational Emotive Therapy and briefly explain what each letter represents in the sequence of emotional.', options: [
                { text: 'ABC stands for **Antecedent (Activating event)', outcome: 'ABC stands for **Antecedent (Activating event) — Belief — Consequence**.' },
                { text: 'A = Anxiety, B = Behaviour, C = Consequence', outcome: 'Not quite — **Misconception:** "Ellis and Beck are the same — both just challenge negative thoughts." **Why.', reveals: 'misconception-ellis-and-beck-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a peer-counselling workshop, a trainee responds to \'I cheated on the exam\' with \'I understand, but honestly that was wrong of you.\' The facilitator flags a violated core condition.',
            decisions: [{ prompt: 'Which one, and why does it matter?', options: [
                { text: 'Unconditional positive regard — acceptance can\'t be contingent on what the client discloses; adding \'that was wrong\' prices the warmth, and a client who senses conditions stops disclosing — which starves the alliance the therapy runs on.', outcome: 'The chapter distinguishes empathy (feeling with) from UPR (accepting regardless) — the trainee empathized fine and violated the acceptance pillar in the same sentence.' },
                { text: 'Empathy — \'I understand\' was insincere, so the real breach was failed perspective-taking.', outcome: 'The understanding itself wasn\'t the problem — the judgment that followed was; empathy is about entering the client\'s frame, UPR is about not making acceptance conditional on what\'s found there.', reveals: 'empathy-means-approval' },
                { text: 'The contract — correcting the client breaks the voluntary partnership terms.', outcome: 'The contract governs the relationship\'s frame — voluntary, time-limited, confidential — not whether the therapist may judge; the breach is acceptance made conditional, not a clause of the agreement.', reveals: 'contract-covers-morals' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now see the therapeutic relationship as engineered — boundaries, contract and empathy doing the work friendship can\'t.',
            decisions: [{ prompt: 'What comes next? Therapeutic Approaches · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Therapeutic Approaches · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_001', difficulty: 'standard',
          question: 'Psychotherapy is a voluntary, confidential interpersonal relationship between.',
          hint: 'If stuck, revisit Class 11 Chapter 1 (Psychology as a Discipline) for scientific nature.',
          misconception: 'Students believe "empathy = sympathy" and "therapeutic relationship = close friendship." They write: "Therapist feels.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Psychotherapy is a voluntary, confidential interpersonal relationship between a',
                  options: ['Psychotherapy is a voluntary, confidential interpersonal relationship between a', 'Therapeutic alliance is the collaborative, trusting, and confidential partnership between', 'Classification of psychotherapies is the systematic categorisation of therapeutic', 'Behaviour therapy is a therapeutic approach based on learning theory principles that'],
                  hint: 'If stuck, revisit Class 11 Chapter 1 (Psychology as a Discipline) for scientific nature.',
                  misconception: 'Students believe "empathy = sympathy" and "therapeutic relationship = close friendship." They write: "Therapist feels sorry for client".' }
          ],
            remediations: { 'empathy-sympathy-and-therapeutic-relationship': { steps: ['Re-read NCERT pp. 90–93 focusing on the "Therapeutic Relationship" subsection.', 'Create a 3-column comparison: Term | NCERT Definition | Everyday Misuse (e.g., Empathy | "Putting oneself in other\'s.', 'Watch a 5-min therapy demo clip (e.g., Carl Rogers\' Gloria session) and pause every 30 seconds to label: "Is this.', 'Re-attempt Diagnostic Questions 2 and 4. If still stuck, revisit Class 11 node c11_psy_cbse_08_010 (Managing Negative.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "empathy = sympathy" and "therapeutic relationship = close friendship." They write: "Therapist feels.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Since psychotherapy is just talking, any caring teacher or parent can do it effectively if they read a few psychology books." Use.', answer: 'The statement is false',
                  options: ['The statement is false', 'books provide enough knowledge', 'empathy = sympathy', 'therapeutic relationship = close friendship'],
                  hint: 'If stuck, revisit Class 11 Chapter 1 (Psychology as a Discipline) for scientific nature.',
                  misconception: 'Students believe "empathy = sympathy" and "therapeutic relationship = close friendship." They write: "Therapist feels sorry for client".' }
          ],
            remediations: { 'empathy-sympathy-and-therapeutic-relationship': { steps: ['Re-read NCERT pp. 90–93 focusing on the "Therapeutic Relationship" subsection.', 'Create a 3-column comparison: Term | NCERT Definition | Everyday Misuse (e.g., Empathy | "Putting oneself in other\'s.', 'Watch a 5-min therapy demo clip (e.g., Carl Rogers\' Gloria session) and pause every 30 seconds to label: "Is this.', 'Re-attempt Diagnostic Questions 2 and 4. If still stuck, revisit Class 11 node c11_psy_cbse_08_010 (Managing Negative.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_002', difficulty: 'standard',
          question: 'Therapeutic alliance is the collaborative, trusting, and confidential.',
          hint: 'Revisit c12_psy_cbse_05_001 "Nature and Process of Psychotherapy" and identify which.',
          misconception: 'Students often believe that "unconditional positive regard" means the therapist must approve of or agree with the.',
          parts: [
                { id: 'a', prompt: 'A client tells their therapist: "I stole money from my parents last week." The therapist responds: "I understand you\'re going through a tough time, but.', answer: 'Unconditional positive regard (UPR) is violated',
                  options: ['Unconditional positive regard (UPR) is violated', 'empathy is violated', 'unconditional positive regard'],
                  hint: 'Revisit c12_psy_cbse_05_001 "Nature and Process of Psychotherapy" and identify which goals depend.',
                  misconception: 'Students often believe that "unconditional positive regard" means the therapist must approve of or agree with the client\'s harmful.' },
                { id: 'b', prompt: 'Design a brief "therapy contract" for a 16-year-old client with social anxiety.', answer: 'Contract elements: (1) Voluntary partnership',
                  options: ['Contract elements: (1) Voluntary partnership', 'unconditional positive regard'],
                  hint: 'Revisit c12_psy_cbse_05_001 "Nature and Process of Psychotherapy" and identify which goals depend.',
                  misconception: 'Students often believe that "unconditional positive regard" means the therapist must approve of or agree with the client\'s harmful.' }
          ],
            remediations: { 'unconditional-positive-regard-means-the': { steps: ['If a student confuses UPR with approval of harmful behaviours: (1) Have them re-read the NCERT line: "therapist.', 'not judging the client and will continue to show the same positive feelings...', 'even if the client is rude or confides all the \'wrong\' things." (2) Ask: "Does \'not judging the person\' mean \'agreeing.', 'I still care about you and we\'ll work on this." Therapist approving: "Hitting is fine." (4) Assign a 2-minute write.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_003', difficulty: 'standard',
          question: 'Classification of psychotherapies is the systematic categorisation.',
          hint: 'If unable to link Class 11 theories to Class 12 therapy parameters, re-read.',
          misconception: 'Students treat the three classifications as merely "different techniques for the same problems" rather than.',
          parts: [
                { id: 'a', prompt: 'Name the three broad groups of psychotherapies classified in the NCERT textbook and state the chronological order in which they emerged historically.', answer: 'The three broad groups are psychodynamic, behavioural, and existential',
                  options: ['The three broad groups are psychodynamic, behavioural, and existential', 'CBT as a separate broad group, or reversing the order'],
                  hint: 'If unable to link Class 11 theories to Class 12 therapy parameters, re-read c11_psy_cbse_01_008.',
                  misconception: 'Students treat the three classifications as merely "different techniques for the same problems" rather than fundamentally different.' },
                { id: 'b', prompt: 'A client seeks therapy for social anxiety. The therapist focuses on "faulty conditioning patterns" and "maladaptive thought patterns" acquired through.', answer: 'This therapist follows behavioural therapy',
                  options: ['This therapist follows behavioural therapy', 'faulty learning of behaviours and cognitions', 'intrapsychic conflicts from childhood', 'faulty learning/conditioning'],
                  hint: 'If unable to link Class 11 theories to Class 12 therapy parameters, re-read c11_psy_cbse_01_008.',
                  misconception: 'Students treat the three classifications as merely "different techniques for the same problems" rather than fundamentally different.' }
          ],
            remediations: { 'students-treat-the-three-classifications': { steps: ['Re-read the NCERT "Type of Therapies" section (pages 91-93) focusing ONLY on the six-parameter table.', 'Create a 3×6 grid (3 therapies × 6 parameters) on paper. Fill each cell in your own words without copying.', 'For each parameter, write ONE sentence explaining why psychodynamic and behavioural answers are mutually exclusive.', 'Re-attempt Diagnostic Questions 2 and 4. If still stuck, revisit c11_psy_cbse_01_008 (psychoanalysis).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_004', difficulty: 'standard',
          question: 'Behaviour therapy is a therapeutic approach based on learning theory principles.',
          hint: 'Revisit Class 11 Psychology nodes c11_psy_cbse_05_004 (Operant Conditioning) and.',
          misconception: 'Students often believe "antecedent operation" and "consequent operation" refer only to what happens *before* and.',
          parts: [
                { id: 'a', prompt: 'Design a token economy for a 14-year-old who refuses to do homework.', answer: 'target behaviour, (',
                  options: ['target behaviour, (', 'antecedent operation', 'consequent operation'],
                  hint: 'Revisit Class 11 Psychology nodes c11_psy_cbse_05_004 (Operant Conditioning) and.',
                  misconception: 'Students often believe "antecedent operation" and "consequent operation" refer only to what happens *before* and *after* the behaviour in.' }
          ],
            remediations: { 'antecedent-operation-and-consequent-operation': { steps: ['If a student misclassifies operations, follow these steps: (1) Present a clear 2x2 table: rows = antecedent/consequent.', '(2) Give 5 mini-scenarios (e.g., "teacher puts up \'quiet\' sign before class", "parent takes away toy after hitting").', '(4) Re-assess with a fresh case: "A student wears noise-cancelling headphones to study better.', 'Is this antecedent or consequent?"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_005', difficulty: 'standard',
          question: 'Behavioural techniques are structured interventions based on learning.',
          hint: 'If stuck, re‑watch the Class 11 Pavlov and Skinner experiment videos, then re‑read NCERT.',
          misconception: '**Misconception**: "Aversive conditioning, token economy, and systematic desensitisation are just different names for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Behavioural techniques are structured interventions based on learning principles',
                  options: ['Behavioural techniques are structured interventions based on learning principles', 'Psychotherapy is a voluntary, confidential interpersonal relationship between a', 'Therapeutic alliance is the collaborative, trusting, and confidential partnership between', 'Classification of psychotherapies is the systematic categorisation of therapeutic'],
                  hint: 'If stuck, re‑watch the Class 11 Pavlov and Skinner experiment videos, then re‑read NCERT Class 11.',
                  misconception: '**Misconception**: "Aversive conditioning, token economy, and systematic desensitisation are just different names for reward/punishment.".' }
          ],
            remediations: { 'misconception-aversive-conditioning': { steps: ['If a student cannot differentiate the three techniques by learning paradigm: 1.', '**Re‑visit Class 11 nodes**: `c11_psy_cbse_05_002` (Classical Conditioning: Pavlov), `c11_psy_cbse_05_003` (Classical.', '**Create a 3‑column table**: Column A = Technique, Column B = Learning Paradigm (Classical/Operant), Column C = Key.', '**Re‑diagnostic**: Given a new case (e.g., nail‑biting, fear of dogs, refusal to take medication), ask the student.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_006', difficulty: 'standard',
          question: 'Cognitive therapy is a structured, short-term psychotherapy that identifies and.',
          hint: 'If stuck, revisit **c11_psy_cbse_07_006 (Heuristics and Biases)** — map each cognitive.',
          misconception: '**Misconception:** "Ellis and Beck are the same — both just challenge negative thoughts." **Why it\'s wrong:** Students.',
          parts: [
                { id: 'a', prompt: 'State the full form of ABC in Ellis\' Rational Emotive Therapy and briefly explain what each letter represents in the sequence of emotional disturbance.', answer: 'ABC stands for **Antecedent (Activating event)',
                  options: ['ABC stands for **Antecedent (Activating event)', 'A = Anxiety, B = Behaviour, C = Consequence'],
                  hint: 'If stuck, revisit **c11_psy_cbse_07_006 (Heuristics and Biases)** — map each cognitive distortion.',
                  misconception: '**Misconception:** "Ellis and Beck are the same — both just challenge negative thoughts." **Why it\'s wrong:** Students conflate *cognitive.' },
                { id: 'b', prompt: 'A student thinks: "If I don\'t score 95% in Board exams, I am a complete failure and my life is ruined." Identify **two** irrational belief characteristics (per.', answer: 'Two irrational characteristics: 1',
                  options: ['Two irrational characteristics: 1', 'negative thinking', 'low confidence'],
                  hint: 'If stuck, revisit **c11_psy_cbse_07_006 (Heuristics and Biases)** — map each cognitive distortion.',
                  misconception: '**Misconception:** "Ellis and Beck are the same — both just challenge negative thoughts." **Why it\'s wrong:** Students conflate *cognitive.' },
                { id: 'c', prompt: '**Case:** Rahul, 17, is not selected for the school football team. He thinks: "The coach hates me. I\'ll never make any team.', answer: 'the **negative automatic thought (NAT)**, (',
                  options: ['the **negative automatic thought (NAT)**, (', 'Core schema: The coach hates me'],
                  hint: 'If stuck, revisit **c11_psy_cbse_07_006 (Heuristics and Biases)** — map each cognitive distortion.',
                  misconception: '**Misconception:** "Ellis and Beck are the same — both just challenge negative thoughts." **Why it\'s wrong:** Students conflate *cognitive.' },
                { id: 'd', prompt: '**Compare:** How does the *therapist\'s role* differ in Ellis\' RET vs. Beck\'s Cognitive Therapy during the belief-modification phase?', answer: '| Aspect | Ellis (RET) | Beck (Cognitive Therapy) |',
                  options: ['| Aspect | Ellis (RET) | Beck (Cognitive Therapy) |', 'Both just ask questions'],
                  hint: 'If stuck, revisit **c11_psy_cbse_07_006 (Heuristics and Biases)** — map each cognitive distortion.',
                  misconception: '**Misconception:** "Ellis and Beck are the same — both just challenge negative thoughts." **Why it\'s wrong:** Students conflate *cognitive.' }
          ],
            remediations: { 'misconception-ellis-and-beck-are': { steps: ['If the student cannot distinguish Ellis vs.', '**Revisit node c12_psy_cbse_05_003 (Classification of Psychotherapies)** — review the parameter "Chief method.', '**Create a 2-column table** with 5 rows: (a) Therapist role, (b) Core concept (ABC vs.', 'Schema/NAT), (c) Key technique (Disputation vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
