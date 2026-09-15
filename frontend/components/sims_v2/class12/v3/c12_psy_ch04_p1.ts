import type { SimDef } from '../../engine/types';

/** v3 generated — c12_psy_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_psy_ch04_p1: SimDef = {
    id: 'v3_c12_psy_ch04_p1',
    title: 'Psychological Disorders · Part 1/2',
    subtitle: 'Same arm-waving — one is a job, one is a symptom',
    classLevel: 12, subject: 'psychology', topic: 'Psychological Disorders · Part 1/2',
    chapters: ['c12_psy_ch04'],
    nodeIds: ['c12_psy_cbse_04_001', 'c12_psy_cbse_04_002', 'c12_psy_cbse_04_003', 'c12_psy_cbse_04_004', 'c12_psy_cbse_04_005', 'c12_psy_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Clinical frame-builder', intro: 'Two students before exams — one studies hard, one can\'t open a book. The line between them has four letters.', goal: 'Apply the Four Ds and the social-norms versus maladaptive lenses to judge abnormal behaviour.' },
    discovery: {
        question: 'A traffic policeman waves his arms wildly at an intersection; a pedestrian does the same on a quiet sidewalk. Same motion — why is only one maybe abnormal?',
        options: ['Context — deviance is judged against the role and the norm; the policeman\'s waving is prescribed by his job, the pedestrian\'s violates the unstated rule of calm public movement', 'Uniforms exempt', 'Both abnormal', 'Neither is'],
        answer: 'Context — deviance is judged against the role and the norm; the policeman\'s waving is prescribed by his job, the pedestrian\'s violates the unstated rule of calm public movement',
        hook: 'The Four Ds aren\'t a checklist demanding all four — deviance, distress and dysfunction together usually suffice without danger. And \'weird = abnormal\' fails: a ritual or a job can license behaviour that looks deviant but functions perfectly — the maladaptive lens asks whether it blocks a life.',
    },
    teaching: [
        { title: 'Concepts of Abnormality: The Four Ds and Approaches to Defining Abnormal Behaviour', text: 'Abnormal behaviour is characterised by the **Four Ds** — **deviance** (behaviour that violates societal norms), **distress** (unpleasant emotional experience for the individual or others).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_psy_cbse_04_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Judge a case like a clinician: run Meena\'s school-silence through each D, weigh deviance against maladaptiveness, and catch where context turns \'strange\' into \'sanctioned.\'',
        labels: ['Concepts of Abnormality', 'Historical Background and Classification', 'Factors Underlying Abnormal Behaviour', 'Diathesis-Stress Model: Biological Predisposition', 'Anxiety Disorders: Generalised Anxiety,', 'Obsessive-Compulsive and Trauma-Related Disorders'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_psy_cbse_04_001', title: 'Concepts of Abnormality: The Four Ds and Approaches to Defining Abnormal Behaviour',
          caseStudy: { intro: 'Imagine two students before the board exams: **Riya** feels “butterflies in the stomach,” studies intensely for two nights, and scores well; **Arjun** cannot.',
            decisions: [{ prompt: '**REMEMBER**: State the Four Ds of abnormality and give a one-sentence description of each.', options: [
                { text: '**Correct answer**: 1', outcome: '**Correct answer**: 1. **Deviance** — behaviour that differs markedly from societal/cultural norms.' },
                { text: 'deviance', outcome: 'Not quite — **“Any behaviour that is statistically rare or socially unusual is abnormal.”** Students frequently.', reveals: 'any-behaviour-that-is-statistically' },
                { text: 'distress', outcome: 'Not quite — **“Any behaviour that is statistically rare or socially unusual is abnormal.”** Students frequently.', reveals: 'any-behaviour-that-is-statistically' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_04_002', title: 'Historical Background and Classification of Disorders: DSM-5 and ICD-10',
          caseStudy: { intro: 'Imagine a person in ancient Greece hearing voices versus a person today hearing voices — both might be called "abnormal" but the explanation and treatment.',
            decisions: [{ prompt: '**REMEMBER**: Name the three broad historical perspectives used to explain abnormal behaviour and give one key figure associated with each.', options: [
                { text: 'Correct answer: (1) Supernatural perspective', outcome: 'Correct answer: (1) Supernatural perspective — associated with shamans/ojhas or medieval.' },
                { text: 'competing', outcome: 'Not quite — Students often think DSM-5 and ICD-10 are "competing" systems where one is "better" or "more.', reveals: 'dsm-5-and-icd-10' },
                { text: 'better', outcome: 'Not quite — Students often think DSM-5 and ICD-10 are "competing" systems where one is "better" or "more.', reveals: 'dsm-5-and-icd-10' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_04_003', title: 'Factors Underlying Abnormal Behaviour: Biological, Psychological and Socio-Cultural Models',
          caseStudy: { intro: 'Imagine your friend Rahul has stopped attending college, hears voices criticising him, and believes his neighbours are spying on him.',
            decisions: [{ prompt: 'Name the neurotransmitter associated with each of the following disorders according to the biological model: (a) Anxiety disorders, (b).', options: [
                { text: '(a) Anxiety disorders', outcome: '(a) Anxiety disorders — low activity of GABA (gamma-aminobutyric acid); (b) Schizophrenia — excess.' },
                { text: 'low dopamine = Parkinson\'s', outcome: 'Not quite — **"The biological model means mental disorders are purely genetic/biochemical and cannot be changed.', reveals: 'the-biological-model-means-mental' },
                { text: 'high dopamine = schizophrenia', outcome: 'Not quite — **"The biological model means mental disorders are purely genetic/biochemical and cannot be changed.', reveals: 'the-biological-model-means-mental' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_04_004', title: 'Diathesis-Stress Model: Biological Predisposition and Pathogenic Stressors',
          caseStudy: { intro: 'Imagine two Class 12 students, Arjun and Priya, both facing the same intense board exam stress. Arjun develops a panic disorder; Priya feels anxious but copes.',
            decisions: [{ prompt: 'Define the three components of the diathesis-stress model using NCERT terminology.', options: [
                { text: 'Correct answer: (1) **Diathesis**', outcome: 'Correct answer: (1) **Diathesis** — a biological aberration (e.g., genetic, neurochemical.' },
                { text: 'the disorder', outcome: 'Not quite — **Specific error:** Students equate "diathesis" with "genetic mutation" and believe the model means.', reveals: 'specific-error-students-equate-diathesis' },
                { text: 'stress', outcome: 'Not quite — **Specific error:** Students equate "diathesis" with "genetic mutation" and believe the model means.', reveals: 'specific-error-students-equate-diathesis' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_04_005', title: 'Anxiety Disorders: Generalised Anxiety, Panic Disorder, Phobias and Separation Anxiety',
          caseStudy: { intro: 'Imagine a Class 12 student, Rohan, who feels his heart race before every exam — that\'s normal anxiety.',
            decisions: [{ prompt: 'A student says: "I have Generalised Anxiety Disorder because I worry about my board exams, my future career, and my parents\' health all the.', options: [
                { text: 'The two missing criteria are: (1) Duration', outcome: 'The two missing criteria are: (1) Duration — GAD requires excessive anxiety/worry occurring more.' },
                { text: 'symptoms like sweating or palpitations', outcome: 'Not quite — Students commonly believe that "Panic Disorder means having frequent panic attacks" and.', reveals: 'students-commonly-believe-that-panic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_04_006', title: 'Obsessive-Compulsive and Trauma-Related Disorders: OCD and PTSD',
          caseStudy: { intro: 'Imagine a Class 12 student who checks the door lock exactly 7 times before sleeping, feels intense anxiety if interrupted, and knows it\'s excessive but cannot.',
            decisions: [{ prompt: 'A student writes: "OCD is when you like things clean and organised." Identify the two fundamental errors in this statement based on DSM-5.', options: [
                { text: 'Correct answer: (1) OCD compulsions are not preferences', outcome: 'Correct answer: (1) OCD compulsions are not preferences — they are repetitive behaviours performed.' },
                { text: 'Four Ds', outcome: 'Not quite — Students frequently confuse OCD with Obsessive-Compulsive Personality Disorder (OCPD) and believe.', reveals: 'students-frequently-confuse-ocd-with' },
                { text: 'being OCD', outcome: 'Not quite — Students frequently confuse OCD with Obsessive-Compulsive Personality Disorder (OCPD) and believe.', reveals: 'students-frequently-confuse-ocd-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Watching a documentary on medieval \'possession\' cases — convulsions, voices — a viewer scoffs \'they were just ignorant; today we know it\'s schizophrenia and we treat it right.\'',
            decisions: [{ prompt: 'What do the historical models add to that reaction?', options: [
                { text: 'Each era\'s model has internal logic — supernatural explains the same symptoms as spirit-work needing exorcism, biological explains it as bodily dysregulation needing antipsychotics; the treatment follows the assumed cause, so \'ignorance\' misses that a different causal model was operating, not absent thinking.', outcome: 'The chapter\'s point: explanation and treatment travel as a pair — symptoms stay constant while the model decides whether you reach for prayer or a prescription.' },
                { text: 'He\'s right — only the biological model counts as real explanation.', outcome: 'Presentism aside, that misses what classification and models do — each perspective was a coherent causal system directing practice; understanding them is how you see why the same behaviour got exorcised then and medicated now.', reveals: 'past-models-were-noise' },
                { text: 'DSM-5 is the real difference — earlier eras lacked categories, not explanations.', outcome: 'That confuses classification with causation — DSM and ICD organize how we label disorders; the supernatural/biological/psychological models are the competing answers to why they occur.', reveals: 'labels-are-explanations' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now define abnormality as a cluster judged by culture and function — not by how unusual it looks.',
            decisions: [{ prompt: 'What comes next? Psychological Disorders · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Psychological Disorders · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_001', difficulty: 'standard',
          question: 'Abnormal behaviour is characterised by the **Four Ds** — **deviance**.',
          hint: 'Revisit Class 11 Psychology Chapter 8 (Motivation and Emotion) for emotion theories and.',
          misconception: '**“Any behaviour that is statistically rare or socially unusual is abnormal.”** Students frequently equate *deviance*.',
          parts: [
                { id: 'a', prompt: '**REMEMBER**: State the Four Ds of abnormality and give a one-sentence description of each.', answer: '**Correct answer**: 1',
                  options: ['**Correct answer**: 1', 'deviance', 'distress', 'dysfunction'],
                  hint: 'Revisit Class 11 Psychology Chapter 8 (Motivation and Emotion) for emotion theories and coping, and.',
                  misconception: '**“Any behaviour that is statistically rare or socially unusual is abnormal.”** Students frequently equate *deviance* with *abnormality*.' },
                { id: 'b', prompt: '**UNDERSTAND**: A traffic policeman stands at a busy intersection waving his arms wildly and blowing a whistle.', answer: '**Correct answer**: The social-norms approach judges abnormality by **contextual',
                  options: ['**Correct answer**: The social-norms approach judges abnormality by **contextual', 'both are abnormal'],
                  hint: 'Revisit Class 11 Psychology Chapter 8 (Motivation and Emotion) for emotion theories and coping, and.',
                  misconception: '**“Any behaviour that is statistically rare or socially unusual is abnormal.”** Students frequently equate *deviance* with *abnormality*.' },
                { id: 'c', prompt: '**APPLY**: Consider **Meena**, a 16-year-old who refuses to speak in school for three months, communicates only by writing notes, but speaks normally at home.', answer: '**Correct answer with steps**: 1',
                  options: ['**Correct answer with steps**: 1', 'no danger, so not abnormal'],
                  hint: 'Revisit Class 11 Psychology Chapter 8 (Motivation and Emotion) for emotion theories and coping, and.',
                  misconception: '**“Any behaviour that is statistically rare or socially unusual is abnormal.”** Students frequently equate *deviance* with *abnormality*.' },
                { id: 'd', prompt: '**ANALYZE**: Compare the **social-norms approach** and the **maladaptive approach** on the following dimensions: (a) cultural relativity, (b) risk.', answer: '**Correct answer**: | Dimension | Social-Norms Approach | Maladaptive Approach |',
                  options: ['**Correct answer**: | Dimension | Social-Norms Approach | Maladaptive Approach |', 'self-actualisation', 'well-being'],
                  hint: 'Revisit Class 11 Psychology Chapter 8 (Motivation and Emotion) for emotion theories and coping, and.',
                  misconception: '**“Any behaviour that is statistically rare or socially unusual is abnormal.”** Students frequently equate *deviance* with *abnormality*.' }
          ],
            remediations: { 'any-behaviour-that-is-statistically': { steps: ['**Re-do Activity 4.1** (NCERT p.', '71): Interview three people about a “mentally ill” person they know; code their responses for the Four Ds — you will.', '**Create a 2×2 matrix**: Rows = Four Ds; Columns = “Present” / “Absent”.', 'Fill it for five cases: (i) traffic policeman, (ii) Meena (selective mutism), (iii) Rohan (high-functioning delusion).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**“Any behaviour that is statistically rare or socially unusual is abnormal.”** Students frequently equate *deviance*.',
          parts: [
                { id: 'a', prompt: '**EVALUATE**: “The Four Ds are just a checklist; if a behaviour ticks three boxes, it’s a disorder.” Critique this statement using the NCERT’s caution that.', answer: '**Correct answer**: The statement is **reductionist and dangerous**',
                  options: ['**Correct answer**: The statement is **reductionist and dangerous**', 'explain why the Four Ds are insufficient'],
                  hint: 'Revisit Class 11 Psychology Chapter 8 (Motivation and Emotion) for emotion theories and coping, and.',
                  misconception: '**“Any behaviour that is statistically rare or socially unusual is abnormal.”** Students frequently equate *deviance* with *abnormality*.' }
          ],
            remediations: { 'any-behaviour-that-is-statistically': { steps: ['**Re-do Activity 4.1** (NCERT p.', '71): Interview three people about a “mentally ill” person they know; code their responses for the Four Ds — you will.', '**Create a 2×2 matrix**: Rows = Four Ds; Columns = “Present” / “Absent”.', 'Fill it for five cases: (i) traffic policeman, (ii) Meena (selective mutism), (iii) Rohan (high-functioning delusion).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_002', difficulty: 'standard',
          question: 'Historical Background and Classification of Disorders refers to the evolution.',
          hint: 'If stuck on why classification is needed, revisit the "Four Ds" node.',
          misconception: 'Students often think DSM-5 and ICD-10 are "competing" systems where one is "better" or "more scientific." They write.',
          parts: [
                { id: 'a', prompt: '**REMEMBER**: Name the three broad historical perspectives used to explain abnormal behaviour and give one key figure associated with each perspective.', answer: 'Correct answer: (1) Supernatural perspective',
                  options: ['Correct answer: (1) Supernatural perspective', 'competing', 'better', 'more scientific'],
                  hint: 'If stuck on why classification is needed, revisit the "Four Ds" node (c12_psy_cbse_04_001) and ask.',
                  misconception: 'Students often think DSM-5 and ICD-10 are "competing" systems where one is "better" or "more scientific." They write in exams: "DSM-5.' }
          ],
            remediations: { 'dsm-5-and-icd-10': { steps: ['If the student confuses DSM-5/ICD-10 roles or misattributes historical perspectives: 1.', '71-73** (Historical Background) and **pp.', '73-74** (Classification) — highlight *only* the sentences with "APA", "WHO", "India", "official".', '**Make a 2-column table**: "Supernatural / Biological / Psychological" vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_003', difficulty: 'standard',
          question: 'Factors underlying abnormal behaviour refer to the three primary explanatory.',
          hint: 'If stuck on neurotransmitter-disorder links, revisit **c11_psy_cbse_18_003** (Synapse).',
          misconception: '**"The biological model means mental disorders are purely genetic/biochemical and cannot be changed by therapy."**.',
          parts: [
                { id: 'a', prompt: 'Name the neurotransmitter associated with each of the following disorders according to the biological model: (a) Anxiety disorders, (b) Schizophrenia, (c).', answer: 'Anxiety disorders, (',
                  options: ['Anxiety disorders, (', 'low dopamine = Parkinson\'s', 'high dopamine = schizophrenia'],
                  hint: 'If stuck on neurotransmitter-disorder links, revisit **c11_psy_cbse_18_003** (Synapse) and make.',
                  misconception: '**"The biological model means mental disorders are purely genetic/biochemical and cannot be changed by therapy."** Students equate.' }
          ],
            remediations: { 'the-biological-model-means-mental': { steps: ['Re-read the NCERT paragraph: "Although there is sound evidence to believe that genetic/biochemical factors are.', 'Watch a 5-min video on "neuroplasticity and CBT" (e.g., NIMH or Khan Academy).', 'Take a case from Worked Example 3 and write *two* treatment plans — one biological (SSRI), one psychological (CBT).', 'Re-attempt Diagnostic Question 5. If still stuck, revisit **c11_psy_cbse_18_003** (Synapse) and **c11_psy_cbse_05_004**.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_004', difficulty: 'standard',
          question: 'The diathesis-stress model explains psychological disorders as the result of.',
          hint: 'If stuck, re-read NCERT Class 12 Chapter 4 section "Factors Underlying Abnormal.',
          misconception: '**Specific error:** Students equate "diathesis" with "genetic mutation" and believe the model means **"If you have the.',
          parts: [
                { id: 'a', prompt: 'Define the three components of the diathesis-stress model using NCERT terminology. What does "diathesis" specifically refer to in this model?', answer: 'Correct answer: (1) **Diathesis**',
                  options: ['Correct answer: (1) **Diathesis**', 'the disorder', 'stress'],
                  hint: 'If stuck, re-read NCERT Class 12 Chapter 4 section "Factors Underlying Abnormal Behaviour".',
                  misconception: '**Specific error:** Students equate "diathesis" with "genetic mutation" and believe the model means **"If you have the bad gene, stress.' },
                { id: 'b', prompt: 'Explain in your own words why two individuals with the same biological diathesis for depression (e.g., serotonin transporter gene variant) might not both.', answer: 'Correct answer: The diathesis-stress model posits a **threshold**',
                  options: ['Correct answer: The diathesis-stress model posits a **threshold**', 'one has stronger willpower'],
                  hint: 'If stuck, re-read NCERT Class 12 Chapter 4 section "Factors Underlying Abnormal Behaviour".',
                  misconception: '**Specific error:** Students equate "diathesis" with "genetic mutation" and believe the model means **"If you have the bad gene, stress.' }
          ],
            remediations: { 'specific-error-students-equate-diathesis': { steps: ['**Step-by-step remediation:** 1.', '**Revisit Node c12_psy_cbse_04_003 (Factors Underlying Abnormal Behaviour)** — specifically the "Biological Factors".', 'no single gene is responsible").', 'Re-read the NCERT lines: *"Although there is sound evidence to believe that genetic/biochemical factors are involved...'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_005', difficulty: 'standard',
          question: 'Anxiety disorders are a group of psychological disorders characterised.',
          hint: 'If unable to apply Four Ds, revisit c12_psy_cbse_04_001 Activity 4.1 and the "deviance.',
          misconception: 'Students commonly believe that "Panic Disorder means having frequent panic attacks" and "Agoraphobia means fear of open.',
          parts: [
                { id: 'a', prompt: 'A student says: "I have Generalised Anxiety Disorder because I worry about my board exams, my future career, and my parents\' health all the time." Based.', answer: 'The two missing criteria are: (1) Duration',
                  options: ['The two missing criteria are: (1) Duration', 'symptoms like sweating or palpitations'],
                  hint: 'If unable to apply Four Ds, revisit c12_psy_cbse_04_001 Activity 4.1 and the "deviance, distress.',
                  misconception: 'Students commonly believe that "Panic Disorder means having frequent panic attacks" and "Agoraphobia means fear of open spaces." BOTH are.' },
                { id: 'b', prompt: 'Explain why a panic attack that occurs ONLY when a person with snake phobia sees a snake is NOT diagnosed as Panic Disorder, but the SAME panic attack.', answer: 'Panic Disorder requires RECURRENT UNEXPECTED (uncued) panic attacks',
                  options: ['Panic Disorder requires RECURRENT UNEXPECTED (uncued) panic attacks', 'both are panic attacks so both are Panic Disorder'],
                  hint: 'If unable to apply Four Ds, revisit c12_psy_cbse_04_001 Activity 4.1 and the "deviance, distress.',
                  misconception: 'Students commonly believe that "Panic Disorder means having frequent panic attacks" and "Agoraphobia means fear of open spaces." BOTH are.' },
                { id: 'c', prompt: 'A 14-year-old refuses to attend school, cries excessively when separated from mother, complains of stomachaches before school, and says "Something bad will.', answer: 'Separation Anxiety Disorder',
                  options: ['Separation Anxiety Disorder', 'School Phobia', 'Social Anxiety'],
                  hint: 'If unable to apply Four Ds, revisit c12_psy_cbse_04_001 Activity 4.1 and the "deviance, distress.',
                  misconception: 'Students commonly believe that "Panic Disorder means having frequent panic attacks" and "Agoraphobia means fear of open spaces." BOTH are.' }
          ],
            remediations: { 'students-commonly-believe-that-panic': { steps: ['Revisit c12_psy_cbse_04_001 (Four Ds) to re-anchor the distinction between normal anxiety (proportionate, transient.', 'Create a comparison table with columns: Disorder | Core Fear Theme | Key Symptoms | Duration | Cued vs Uncued Panic |.', 'Practice 3 case-based differential diagnosis questions (e.g., "A person has panic attacks only in elevators — which.', 'Re-attempt Diagnostic Questions 2 and 5 above. If still incorrect, review c12_psy_cbse_04_004 (Diathesis-Stress).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_006', difficulty: 'standard',
          question: 'Obsessive-Compulsive Disorder (OCD) is characterised by the presence.',
          hint: 'If stuck, revisit c12_psy_cbse_04_001 (Four Ds) and c12_psy_cbse_04_002 (classification).',
          misconception: 'Students frequently confuse OCD with Obsessive-Compulsive Personality Disorder (OCPD) and believe "being OCD" means.',
          parts: [
                { id: 'a', prompt: 'A student writes: "OCD is when you like things clean and organised." Identify the two fundamental errors in this statement based on DSM-5 criteria.', answer: 'Correct answer: (1) OCD compulsions are not preferences',
                  options: ['Correct answer: (1) OCD compulsions are not preferences', 'Four Ds', 'being OCD', '"being OCD" means being perfectionistic, neat, or organised'],
                  hint: 'If stuck, revisit c12_psy_cbse_04_001 (Four Ds) and c12_psy_cbse_04_002 (classification) — practice.',
                  misconception: 'Students frequently confuse OCD with Obsessive-Compulsive Personality Disorder (OCPD) and believe "being OCD" means being perfectionistic.' },
                { id: 'b', prompt: 'Explain why a person with contamination obsessions who washes hands for 3 hours daily meets OCD criteria, while a surgeon who scrubs for 10 minutes before each.', answer: 'Correct answer: The surgeon\'s handwashing is context-appropriate, goal-directed',
                  options: ['Correct answer: The surgeon\'s handwashing is context-appropriate, goal-directed', 'being OCD', '"being OCD" means being perfectionistic, neat, or organised'],
                  hint: 'If stuck, revisit c12_psy_cbse_04_001 (Four Ds) and c12_psy_cbse_04_002 (classification) — practice.',
                  misconception: 'Students frequently confuse OCD with Obsessive-Compulsive Personality Disorder (OCPD) and believe "being OCD" means being perfectionistic.' },
                { id: 'c', prompt: 'Compare the role of avoidance in OCD vs. PTSD. A student claims: "In both disorders, avoidance reduces anxiety, so the mechanism is identical." Analyse this.', answer: 'Correct answer: The claim is partially correct but incomplete',
                  options: ['Correct answer: The claim is partially correct but incomplete', 'being OCD', '"being OCD" means being perfectionistic, neat, or organised'],
                  hint: 'If stuck, revisit c12_psy_cbse_04_001 (Four Ds) and c12_psy_cbse_04_002 (classification) — practice.',
                  misconception: 'Students frequently confuse OCD with Obsessive-Compulsive Personality Disorder (OCPD) and believe "being OCD" means being perfectionistic.' }
          ],
            remediations: { 'students-frequently-confuse-ocd-with': { steps: ['Have the student write down the exact DSM-5 definition of "obsession" (intrusive, unwanted, distressing) and.', 'Contrast with OCPD criteria (perfectionism, rigidity, control) using a two-column table.', 'Give 3 mini-vignettes — one OCD, one OCPD, one "just organised" — and ask the student to classify each using the.', 'Re-test with Diagnostic Question 1 and 2. If error persists, revisit c12_psy_cbse_04_001 (Four.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
