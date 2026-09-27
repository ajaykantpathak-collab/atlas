import type { SimDef } from '../../engine/types';

/** v3 generated — c12_psy_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_psy_ch05_p2: SimDef = {
    id: 'v3_c12_psy_ch05_p2',
    title: 'Therapeutic Approaches · Part 2/2',
    subtitle: 'It sounded like empathy — it was sympathy',
    classLevel: 12, subject: 'psychology', topic: 'Therapeutic Approaches · Part 2/2',
    chapters: ['c12_psy_ch05'],
    nodeIds: ['c12_psy_cbse_05_007', 'c12_psy_cbse_05_008', 'c12_psy_cbse_05_009', 'c12_psy_cbse_05_010', 'c12_psy_cbse_05_011', 'c12_psy_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Alliance architect', intro: 'A friend says \'don\'t worry.\' A therapist asks you to notice the catastrophic thought. The frame is the difference.', goal: 'Define psychotherapy\'s structure — goals, characteristics, and the alliance\'s contract, duration and empathy.' },
    discovery: {
        question: '\'I understand exactly — I failed my boards too.\' A therapist says this with warmth, and it\'s still the wrong response. What\'s missing?',
        options: ['Empathy — feeling like the client, not for them; sharing your own story is sympathy, which pulls the focus off the client\'s experience', 'Nothing — warmth plus shared experience is textbook empathy', 'More concrete advice — the client needs solutions, not stories', 'A diagnosis first — feelings cannot be addressed before labels'],
        answer: 'Empathy — feeling like the client, not for them; sharing your own story is sympathy, which pulls the focus off the client\'s experience',
        hook: 'Therapy isn\'t \'paid friendship\' — the frame does the healing: a contract with goals, a limited duration, confidentiality with teeth, and regard that doesn\'t depend on the client pleasing you. \'Any caring teacher with a book\' misses that training under supervision is a requirement, not a bonus.',
    },
    teaching: [
        { title: 'Cognitive Behaviour Therapy (CBT): Bio-Psychosocial Approach and Applications', text: 'Cognitive Behaviour Therapy (CBT) is a structured, time-limited, evidence-based psychotherapy that integrates cognitive therapy (identifying and restructuring maladaptive thoughts and core schemas).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_psy_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build the therapeutic alliance from a first session: map \'12 weekly sessions\' and \'confidential unless harm\' onto their components, and separate empathy from the sympathy that sounds identical.',
        labels: ['Cognitive Behaviour Therapy (CBT)', 'Humanistic-Existential Therapy: Self-Actualisation', 'Logotherapy (Frankl) and Client-Centred', 'Gestalt Therapy (Perls)', 'Alternative Therapies: Yoga, Meditation,', 'Rehabilitation of the Mentally'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_psy_cbse_05_007', title: 'Cognitive Behaviour Therapy (CBT): Bio-Psychosocial Approach and Applications',
          caseStudy: { intro: 'Imagine a Class 12 student, Rohan, who freezes during board exam mock tests — heart racing, thoughts like "I\'ll fail, my future is ruined," leading.',
            decisions: [{ prompt: 'What are the three domains addressed by CBT\'s bio-psychosocial approach, and name one technique used for each domain?', options: [
                { text: 'The three domains are: (1) Biological', outcome: 'The three domains are: (1) Biological — addressed via relaxation procedures (e.g., progressive.' },
                { text: 'thoughts and behaviours', outcome: 'Not quite — Students often equate CBT with "positive thinking" or "replacing negative thoughts with positive.', reveals: 'students-often-equate-cbt-with' },
                { text: 'cognitive + behavioural', outcome: 'Not quite — Students often equate CBT with "positive thinking" or "replacing negative thoughts with positive.', reveals: 'students-often-equate-cbt-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_05_008', title: 'Humanistic-Existential Therapy: Self-Actualisation and the Role of Meaning',
          caseStudy: { intro: 'Imagine a 17-year-old student, Arjun, who scores 95% in exams but feels empty, saying, “I’m just performing a script my parents wrote.',
            decisions: [{ prompt: 'Define self-actualisation as described in the humanistic-existential framework.', options: [
                { text: 'Self-actualisation is an innate, ongoing process of becoming more complex, balanced, and', outcome: 'Self-actualisation is an innate, ongoing process of becoming more complex, balanced, and integrated.' },
                { text: 'non-judgmental', outcome: 'Not quite — Students often conflate “unconditional positive regard” with “agreeing with everything the client.', reveals: 'students-often-conflate-unconditional-positive' },
                { text: 'no evaluation at all', outcome: 'Not quite — Students often conflate “unconditional positive regard” with “agreeing with everything the client.', reveals: 'students-often-conflate-unconditional-positive' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_05_009', title: 'Logotherapy (Frankl) and Client-Centred Therapy (Rogers): Principles and Techniques',
          caseStudy: { intro: 'Imagine a 17-year-old student who survived a natural disaster but now feels life is pointless and withdraws from friends.',
            decisions: [{ prompt: 'Define "existential anxiety" in Frankl\'s Logotherapy and state its origin.', options: [
                { text: 'Existential anxiety (noogenic neurosis) is a neurotic anxiety of spiritual origin arising', outcome: 'Existential anxiety (noogenic neurosis) is a neurotic anxiety of spiritual origin arising when.' },
                { text: 'Logotherapy is just about finding meaning', outcome: 'Not quite — Students often write that "Logotherapy is just about finding meaning" and "Client-Centred Therapy.', reveals: 'students-often-write-that-logotherapy' },
                { text: 'Client-Centred Therapy is just about being nice', outcome: 'Not quite — Students often write that "Logotherapy is just about finding meaning" and "Client-Centred Therapy.', reveals: 'students-often-write-that-logotherapy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_05_010', title: 'Gestalt Therapy (Perls) and Factors Contributing to Healing in Psychotherapy',
          caseStudy: { intro: 'Imagine a student named Arjun who constantly says "I\'m fine" while clenching his fists and avoiding eye contact when asked about his parents\' divorce.',
            decisions: [{ prompt: 'What is the primary goal of Gestalt Therapy according to Fritz Perls, and what does the German word "gestalt" signify in this context?', options: [
                { text: 'The primary goal is to increase the client\'s self-awareness and self-acceptance by', outcome: 'The primary goal is to increase the client\'s self-awareness and self-acceptance by integrating.' },
                { text: 'goal is behaviour modification', outcome: 'Not quite — Students confuse Gestalt\'s "acting out fantasies/conflicts" with Psychodrama (Moreno) or simple.', reveals: 'students-confuse-gestalt-s-acting' },
                { text: 'gestalt means \'form\' without the integration aspect', outcome: 'Not quite — Students confuse Gestalt\'s "acting out fantasies/conflicts" with Psychodrama (Moreno) or simple.', reveals: 'students-confuse-gestalt-s-acting' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_05_011', title: 'Alternative Therapies: Yoga, Meditation, Sudarshan Kriya Yoga and Vipasana',
          caseStudy: { intro: 'Imagine a Class 12 student, Rohan, who feels overwhelmed before board exams — his heart races, thoughts spiral, and he cannot focus.',
            decisions: [{ prompt: 'Name the four alternative therapies explicitly discussed in the NCERT Class 12 Psychology textbook under the heading "Alternative.', options: [
                { text: 'The four therapies are: (1) Yoga', outcome: 'The four therapies are: (1) Yoga — combination of asanas (body postures) and pranayama (breathing.' },
                { text: 'Meditation = emptying the mind', outcome: 'Not quite — Students often believe "Yoga = just physical exercise/stretching" and "Meditation = emptying the.', reveals: 'yoga-just-physical-exercise-stretching' },
                { text: 'acupuncture or Reiki', outcome: 'Not quite — Students often believe "Yoga = just physical exercise/stretching" and "Meditation = emptying the.', reveals: 'yoga-just-physical-exercise-stretching' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_05_012', title: 'Rehabilitation of the Mentally Ill: Occupational, Social Skills and Vocational Training',
          caseStudy: { intro: 'Imagine a 24-year-old diagnosed with schizophrenia whose hallucinations are controlled by medication, yet he sits silently all day, cannot hold a conversation.',
            decisions: [{ prompt: 'What is the primary goal of rehabilitation for the mentally ill, and how does it differ from the goal of acute symptom-focused treatment.', options: [
                { text: 'The primary goal of rehabilitation is to empower the patient to become a productive,', outcome: 'The primary goal of rehabilitation is to empower the patient to become a productive.' },
                { text: 'curing the illness', outcome: 'Not quite — Students often believe rehabilitation is "just keeping patients busy with crafts" or "vocational.', reveals: 'rehabilitation-is-just-keeping-patients' },
                { text: 'making symptoms disappear', outcome: 'Not quite — Students often believe rehabilitation is "just keeping patients busy with crafts" or "vocational.', reveals: 'rehabilitation-is-just-keeping-patients' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a peer-counselling workshop, a trainee responds to \'I cheated on the exam\' with \'I understand, but honestly that was wrong of you.\' The facilitator flags a violated core condition.',
            decisions: [{ prompt: 'Which one, and why does it matter?', options: [
                { text: 'Unconditional positive regard — acceptance can\'t be contingent on what the client discloses; adding \'that was wrong\' prices the warmth, and a client who senses conditions stops disclosing — which starves the alliance the therapy runs on.', outcome: 'The chapter distinguishes empathy (feeling with) from UPR (accepting regardless) — the trainee empathized fine and violated the acceptance pillar in the same sentence.' },
                { text: 'Empathy — \'I understand\' was insincere, so the real breach was failed perspective-taking.', outcome: 'The understanding itself wasn\'t the problem — the judgment that followed was; empathy is about entering the client\'s frame, UPR is about not making acceptance conditional on what\'s found there.', reveals: 'empathy-means-approval' },
                { text: 'The contract — correcting the client breaks the voluntary partnership terms.', outcome: 'The contract governs the relationship\'s frame — voluntary, time-limited, confidential — not whether the therapist may judge; the breach is acceptance made conditional, not a clause of the agreement.', reveals: 'contract-covers-morals' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_05_012', title: 'You made it',
          caseStudy: { intro: 'You can now see the therapeutic relationship as engineered — boundaries, contract and empathy doing the work friendship can\'t.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_007', difficulty: 'standard',
          question: 'Cognitive Behaviour Therapy (CBT) is a structured, time-limited, evidence-based.',
          hint: 'If stuck, revisit c12_psy_cbse_05_004 (Behavioural Analysis) for antecedent/maintaining.',
          misconception: 'Students often equate CBT with "positive thinking" or "replacing negative thoughts with positive ones." This.',
          parts: [
                { id: 'a', prompt: 'What are the three domains addressed by CBT\'s bio-psychosocial approach, and name one technique used for each domain?', answer: 'The three domains are: (1) Biological',
                  options: ['The three domains are: (1) Biological', 'thoughts and behaviours', 'cognitive + behavioural'],
                  hint: 'If stuck, revisit c12_psy_cbse_05_004 (Behavioural Analysis) for antecedent/maintaining factors.',
                  misconception: 'Students often equate CBT with "positive thinking" or "replacing negative thoughts with positive ones." This is incorrect.' },
                { id: 'b', prompt: 'A client with social anxiety avoids speaking in class. The CBT therapist constructs an anxiety hierarchy: (1) imagining speaking (20/100 anxiety), (2) speaking.', answer: 'Technique: Systematic Desensitisation (Wolpe)',
                  options: ['Technique: Systematic Desensitisation (Wolpe)', 'flooding', 'exposure therapy'],
                  hint: 'If stuck, revisit c12_psy_cbse_05_004 (Behavioural Analysis) for antecedent/maintaining factors.',
                  misconception: 'Students often equate CBT with "positive thinking" or "replacing negative thoughts with positive ones." This is incorrect.' },
                { id: 'c', prompt: 'Compare Beck\'s cognitive therapy and Ellis\'s RET on: (a) origin of psychological distress, (b) role of the therapist, (c) therapeutic process.', answer: 'origin of psychological distress, (',
                  options: ['origin of psychological distress, (', 'the same', 'both just challenge thoughts'],
                  hint: 'If stuck, revisit c12_psy_cbse_05_004 (Behavioural Analysis) for antecedent/maintaining factors.',
                  misconception: 'Students often equate CBT with "positive thinking" or "replacing negative thoughts with positive ones." This is incorrect.' }
          ],
            remediations: { 'students-often-equate-cbt-with': { steps: ['If a student writes "CBT = positive thinking," do this 3-step remediation: (1) Show a thought record from a real CBT.', '(2) Contrast with "Positive Thinking" version: "She loves me and will reply soon!" — ask: "Which is more believable?', 'Which reduces anxiety long-term?" (3) Assign: Complete a 3-column thought record (Situation | Automatic Thought |.', 'Review together — check for realistic, not positive, alternatives.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_008', difficulty: 'standard',
          question: 'Humanistic-existential therapy is a non-directive, growth-oriented approach.',
          hint: 'If stuck, revisit c11_psy_cbse_01_009 (Humanistic Psychology: Maslow and Rogers.',
          misconception: 'Students often conflate “unconditional positive regard” with “agreeing with everything the client says” or “being.',
          parts: [
                { id: 'a', prompt: 'A client says, “I feel like I’m living someone else’s life. I’m anxious all the time but I don’t know why.” Using humanistic-existential concepts, explain the.', answer: 'The anxiety is existential',
                  options: ['The anxiety is existential', 'irrational thoughts', 'childhood trauma', 'non-judgmental'],
                  hint: 'If stuck, revisit c11_psy_cbse_01_009 (Humanistic Psychology: Maslow and Rogers.',
                  misconception: 'Students often conflate “unconditional positive regard” with “agreeing with everything the client says” or “being nice.” They write: “The.' },
                { id: 'b', prompt: 'Compare and contrast the therapeutic relationship in psychodynamic therapy vs.', answer: 'therapist’s assumed expertise, (',
                  options: ['therapist’s assumed expertise, (', 'non-directive', 'uses transference', 'non-judgmental'],
                  hint: 'If stuck, revisit c11_psy_cbse_01_009 (Humanistic Psychology: Maslow and Rogers.',
                  misconception: 'Students often conflate “unconditional positive regard” with “agreeing with everything the client says” or “being nice.” They write: “The.' }
          ],
            remediations: { 'students-often-conflate-unconditional-positive': { steps: ['If a student shows this misconception: (1) Have them re-read the NCERT lines: “The therapist conveys by her/his words.', 'What does it mean for the *relationship*?” (3) Role-play: Student plays therapist; you play a client who admits.', 'Student must respond with UPR *without* saying “Cheating is fine.” Debrief: UPR = “I see you, I accept you as a person.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often conflate “unconditional positive regard” with “agreeing with everything the client says” or “being.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: “Humanistic-existential therapy is only suitable for high-functioning, verbally articulate clients with mild distress.” Use evidence.', answer: 'The statement is a common misconception',
                  options: ['The statement is a common misconception', 'non-judgmental', 'no evaluation at all'],
                  hint: 'If stuck, revisit c11_psy_cbse_01_009 (Humanistic Psychology: Maslow and Rogers.',
                  misconception: 'Students often conflate “unconditional positive regard” with “agreeing with everything the client says” or “being nice.” They write: “The.' },
                { id: 'b', prompt: 'Design a 5-minute role-play scenario for a classroom demonstration that illustrates the *difference* between a behavioural therapist’s response and.', answer: 'Client: “I can’t stop procrastinating',
                  options: ['Client: “I can’t stop procrastinating', 'non-judgmental', 'no evaluation at all'],
                  hint: 'If stuck, revisit c11_psy_cbse_01_009 (Humanistic Psychology: Maslow and Rogers.',
                  misconception: 'Students often conflate “unconditional positive regard” with “agreeing with everything the client says” or “being nice.” They write: “The.' }
          ],
            remediations: { 'students-often-conflate-unconditional-positive': { steps: ['If a student shows this misconception: (1) Have them re-read the NCERT lines: “The therapist conveys by her/his words.', 'What does it mean for the *relationship*?” (3) Role-play: Student plays therapist; you play a client who admits.', 'Student must respond with UPR *without* saying “Cheating is fine.” Debrief: UPR = “I see you, I accept you as a person.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_009', difficulty: 'standard',
          question: 'Logotherapy (Viktor Frankl) is an existential therapy that helps clients.',
          hint: 'If stuck, revisit c11_psy_cbse_01_009 (Rogers\' self-theory) and c12_psy_cbse_05_008.',
          misconception: 'Students often write that "Logotherapy is just about finding meaning" and "Client-Centred Therapy is just about being.',
          parts: [
                { id: 'a', prompt: 'A client says, "I\'m terrified of having a panic attack in the exam hall." The therapist replies, "So you\'re really scared that panic will strike right when you.', answer: 'Therapy: Client-Centred Therapy',
                  options: ['Therapy: Client-Centred Therapy', 'or *paradoxical intention*', 'A wrong answer that labels the Rogerian response as', 'reassurance'],
                  hint: 'If stuck, revisit c11_psy_cbse_01_009 (Rogers\' self-theory) and c12_psy_cbse_05_008.',
                  misconception: 'Students often write that "Logotherapy is just about finding meaning" and "Client-Centred Therapy is just about being nice." In board.' },
                { id: 'b', prompt: 'Compare the therapeutic relationship in Logotherapy and Client-Centred Therapy on: (a) therapist self-disclosure, (b) stance on transference, (c) directiveness.', answer: 'therapist self-disclosure, (',
                  options: ['therapist self-disclosure, (', 'Logotherapy is just about finding meaning', 'Client-Centred Therapy is just about being nice'],
                  hint: 'If stuck, revisit c11_psy_cbse_01_009 (Rogers\' self-theory) and c12_psy_cbse_05_008.',
                  misconception: 'Students often write that "Logotherapy is just about finding meaning" and "Client-Centred Therapy is just about being nice." In board.' }
          ],
            remediations: { 'students-often-write-that-logotherapy': { steps: ['If a student cannot distinguish the two therapies, have them: (1) Re-read NCERT pages 98–99 and create a two-column.', '(2) Watch a 5-min video clip of each therapy (Frankl\'s "Man\'s Search for Meaning" lecture; Rogers\' "Gloria" session).', '(3) Re-attempt Diagnostic Questions 3 and 4.', '(4) If confusion persists, revisit c11_psy_cbse_01_009 (Humanistic Psychology: Maslow and Rogers) for Rogers\' core.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_010', difficulty: 'standard',
          question: 'Gestalt Therapy, developed by Fritz and Laura Perls, is.',
          hint: 'Revisit c12_psy_cbse_05_003 (Classification) and c12_psy_cbse_05_009 (Client-Centred.',
          misconception: 'Students confuse Gestalt\'s "acting out fantasies/conflicts" with Psychodrama (Moreno) or simple role-play.',
          parts: [
                { id: 'a', prompt: 'A client in Gestalt Therapy says, "I feel angry at my boss but I can\'t show it." The therapist asks the client to imagine the boss sitting in an empty chair.', answer: 'This illustrates the "Empty Chair" technique targeting *unfinished business*',
                  options: ['This illustrates the "Empty Chair" technique targeting *unfinished business*', 'it\'s just venting', 'acting out fantasies/conflicts'],
                  hint: 'Revisit c12_psy_cbse_05_003 (Classification) and c12_psy_cbse_05_009 (Client-Centred Therapy).',
                  misconception: 'Students confuse Gestalt\'s "acting out fantasies/conflicts" with Psychodrama (Moreno) or simple role-play.' }
          ],
            remediations: { 'students-confuse-gestalt-s-acting': { steps: ['If the student conflates Gestalt with role-play/skill-training: Step 1 — Re-read NCERT lines: "encouraging the client.', 'Step 2 — Contrast with c12_psy_cbse_05_005 (Behavioural Techniques: Modelling): there, client *observes and imitates*.', 'Step 3 — Do a micro-diagnostic: Given a transcript "Therapist: \'Be your anger.', 'Speak from it.\'", identify the therapy (Gestalt) and why it\'s NOT modelling.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_011', difficulty: 'standard',
          question: 'Alternative therapies are non-conventional treatment approaches used alongside.',
          hint: 'Revisit c12_psy_cbse_05_003 (classification of psychotherapies) and c12_psy_cbse_05_007.',
          misconception: 'Students often believe "Yoga = just physical exercise/stretching" and "Meditation = emptying the mind." NCERT defines.',
          parts: [
                { id: 'a', prompt: 'Name the four alternative therapies explicitly discussed in the NCERT Class 12 Psychology textbook under the heading "Alternative Therapies" and state the.', answer: 'The four therapies are: (1) Yoga',
                  options: ['The four therapies are: (1) Yoga', 'Meditation = emptying the mind', 'acupuncture or Reiki', '"Yoga = just physical exercise/stretching" and "Meditation = emptying the mind'],
                  hint: 'Revisit c12_psy_cbse_05_003 (classification of psychotherapies) and c12_psy_cbse_05_007 (CBT.',
                  misconception: 'Students often believe "Yoga = just physical exercise/stretching" and "Meditation = emptying the mind." NCERT defines Yoga as "either.' },
                { id: 'b', prompt: 'Explain in your own words why Vipassana is described as "mindfulness-based meditation" and how its mechanism differs from concentrative meditation as defined.', answer: 'Vipassana is called mindfulness-based',
                  options: ['Vipassana is called mindfulness-based', 'both focus on breath', 'Yoga = just physical exercise/stretching', 'Meditation = emptying the mind'],
                  hint: 'Revisit c12_psy_cbse_05_003 (classification of psychotherapies) and c12_psy_cbse_05_007 (CBT.',
                  misconception: 'Students often believe "Yoga = just physical exercise/stretching" and "Meditation = emptying the mind." NCERT defines Yoga as "either.' }
          ],
            remediations: { 'yoga-just-physical-exercise-stretching': { steps: ['If the student holds the above misconception: (1) Have them re-read the NCERT paragraph on Yoga and Meditation aloud.', '(3) Assign a 5-minute practice: 2 min diaphragmatic breathing (pranayama) + 3 min breath-counting meditation.', 'Immediately after, ask: "What did you do with your breath?', 'What did you do with your attention?" — forcing recognition that both are active processes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_05_012', difficulty: 'standard',
          question: 'Rehabilitation of the mentally ill is a structured, multi-component process.',
          hint: 'If stuck, revisit **c12_psy_cbse_05_005** (Behavioural Techniques) for token.',
          misconception: 'Students often believe rehabilitation is "just keeping patients busy with crafts" or "vocational training for the.',
          parts: [
                { id: 'a', prompt: 'A patient with schizophrenia has reduced hallucinations on antipsychotics but shows severe avolition (lack of motivation), poor eye contact, and cannot plan.', answer: 'This uses operant conditioning',
                  options: ['This uses operant conditioning', 'negative reinforcement', 'just keeping patients busy with crafts', 'vocational training for the disabled'],
                  hint: 'If stuck, revisit **c12_psy_cbse_05_005** (Behavioural Techniques) for token.',
                  misconception: 'Students often believe rehabilitation is "just keeping patients busy with crafts" or "vocational training for the disabled." They miss that.' }
          ],
            remediations: { 'rehabilitation-is-just-keeping-patients': { steps: ['If the student confuses rehabilitation components or their sequence: (1) Revisit **c12_psy_cbse_05_005** (Behavioural.', '(2) Revisit **c12_psy_cbse_05_007** (CBT) to contrast cognitive restructuring vs.', 'cognitive retraining using the 3-dimension table in Diagnostic 4.', '(3) Draw the rehabilitation flowchart: *Symptom Stabilisation → Occupational Therapy (work habit) → Social Skills.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
