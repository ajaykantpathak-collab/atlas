import type { SimDef } from '../../engine/types';
import C12_PsyPsychologicalDisordersCBSESim from '../../../simulations/c6_12_new/C12_PsyPsychologicalDisordersCBSESim';

/** v3 wrapped master — C12_PsyPsychologicalDisordersCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_psypsychologicaldisorderscbsesim: SimDef = {
    id: 'v3w_c12_psypsychologicaldisorderscbsesim',
    title: 'Psy Psychological Disorders CBSE',
    subtitle: 'This node covers the Four Ds, the two definitional approaches (social-norms deviation and.',
    classLevel: 12, subject: 'science', topic: 'Concepts of Abnormality: The Four Ds and Approaches to Defining Abnormal Behaviour',
    chapters: [],
    nodeIds: ['c12_psy_cbse_04_001', 'c12_psy_cbse_04_002', 'c12_psy_cbse_04_003', 'c12_psy_cbse_04_004', 'c12_psy_cbse_04_005', 'c12_psy_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine two students before the board exams: **Riya** feels “butterflies in the stomach,” studies intensely.', goal: 'Master Psy Psychological Disorders CBSE.' },
    discovery: {
        question: '**REMEMBER**: State the Four Ds of abnormality and give a one-sentence description of each.',
        options: ['**Correct answer**: 1', 'deviance', 'distress'],
        answer: '**Correct answer**: 1',
        hook: '**“Any behaviour that is statistically rare or socially unusual is abnormal.”** Students frequently equate *deviance*.',
    },
    teaching: [
        { title: 'Abnormal behaviour is characterised by the.', text: 'Abnormal behaviour is characterised by the **Four Ds** — **deviance** (behaviour that violates societal norms), **distress** (unpleasant emotional experience for the individual or others),.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_psy_cbse_04_001', title: 'Abnormal behaviour is characterised by.',
          caseStudy: { intro: 'Imagine two students before the board exams: **Riya** feels “butterflies in the stomach,” studies intensely for two nights, and scores well; **Arjun** cannot.',
            decisions: [{ prompt: '**REMEMBER**: State the Four Ds of abnormality and give a one-sentence description of each.', options: [
                { text: '**Correct answer**: 1', outcome: '**Correct answer**: 1. **Deviance** — behaviour that differs markedly from societal/cultural norms.' },
                { text: 'deviance', outcome: 'Not quite — **“Any behaviour that is statistically rare or socially unusual is abnormal.”** Students frequently.', reveals: 'any-behaviour-that-is-statistically' },
                { text: 'distress', outcome: 'Not quite — **“Any behaviour that is statistically rare or socially unusual is abnormal.”** Students frequently.', reveals: 'any-behaviour-that-is-statistically' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_04_002', title: 'Historical Background and.',
          scaffold: { problem: 'A Class 12 student reads a case: "Riya, 22, hears voices commenting on her actions, believes neighbours are spying via satellite, has.',
            steps: [
            { text: 'Identify the core symptoms — auditory hallucinations (voices), delusions of persecution/control, social withdrawal,.' },
            { text: 'Apply the 14th-century supernatural lens — cause = demonic possession or divine punishment; treatment = exorcism,.' },
            { text: 'Apply the 19th-century biological (humoral) lens — cause = imbalance of black bile (melancholia) or phlegm; treatment =.' },
            { text: 'Apply the 2024 bio-psycho-social lens — cause = genetic vulnerability + dopamine dysregulation + psychosocial stress.' },
            { text: 'Compare — all three see the *same behaviour* but causal model dictates radically different interventions; modern model.', faded: true, blankAnswer: '14th-century priest: supernatural cause (possession) →.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_04_003', title: 'Factors underlying abnormal behaviour.',
          scaffold: { problem: 'A 22-year-old student, Meera, experiences sudden episodes of intense fear with palpitations, trembling, and a sense of impending doom.',
            steps: [
            { text: 'Identify the disorder — recurrent unexpected panic attacks + avoidance = Panic Disorder (with agoraphobic avoidance).' },
            { text: 'Biological model — Mother\'s history suggests genetic vulnerability; panic attacks linked to **noradrenergic.' },
            { text: 'Psychological (behavioural) model — The library (neutral setting) became a **conditioned stimulus (CS)** through.' },
            { text: 'Psychological (cognitive) model — Meera likely holds **catastrophic misinterpretations** of bodily sensations ("My.' },
            { text: 'Socio-cultural model — Academic pressure (competitive exams), possible lack of social support if she isolates, and.', faded: true, blankAnswer: 'Biological: Genetic vulnerability + noradrenergic/GABA.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_04_004', title: 'The diathesis-stress model explains.',
          scaffold: { problem: 'Analyze the following case using the diathesis-stress model. Rohan, 16, has a maternal aunt with OCD.',
            steps: [
            { text: 'Identify biological predisposition (diathesis) — family history of OCD (aunt) indicates heritable vulnerability; OCD is.' },
            { text: 'Identify the vulnerability period — Rohan showed subclinical traits (excessive neatness) since Class 10, indicating the.' },
            { text: 'Identify pathogenic stressors — father\'s job loss (economic crisis, loss of security), daily parental conflict (high.' },
            { text: 'Explain timing — Cumulative stressors in Class 12 *exceeded the vulnerability threshold*; earlier, stressors were.' },
            { text: 'Verify model fit — Diathesis (genetic/neural) × Stressors (family + academic) → Disorder onset.', faded: true, blankAnswer: '(a) Diathesis = Genetic/neurobiological vulnerability to.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_04_005', title: 'Anxiety disorders are a group of.',
          scaffold: { problem: 'A 16-year-old student, Priya, experiences intense fear and physical symptoms (racing heart, sweating, trembling, shortness of breath).',
            steps: [
            { text: 'Identify the core fear theme — fear of negative evaluation in social performance/interaction situations (speaking in.' },
            { text: 'Check for Social Anxiety Disorder criteria: (A) Marked fear/anxiety about social situations where exposed to possible.' },
            { text: 'Map Priya\'s symptoms: (1) "Intense fear when speaking/eating in cafeteria" → Criterion A & C; (2) "Worries others will.' },
            { text: 'Rule out alternatives: No generalised worry → not GAD; No specific object fear → not Specific Phobia; No unexpected.' },
            { text: 'Confirm diagnosis: Social Anxiety Disorder (Social Phobia), performance and interaction type.', faded: true, blankAnswer: 'Social Anxiety Disorder (Social Phobia) — supported by fear.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_04_006', title: 'Obsessive-Compulsive Disorder (OCD) is.',
          scaffold: { problem: 'A 15-year-old student, Priya, reports: "I get thoughts that my parents will die if I don\'t tap my pencil 4 times on the desk before every.',
            steps: [
            { text: 'Identify obsessions — recurrent, intrusive thoughts (parents dying) that are unwanted and cause marked anxiety.' },
            { text: 'Identify compulsions — repetitive behaviour (tapping pencil 4 times) performed in response to obsession, governed by.' },
            { text: 'Check time/impairment criterion — consumes 2 hours/day (>1 hour threshold), causes functional impairment (late to.' },
            { text: 'Rule out other causes — not due to substance/medical condition; not better explained by GAD (worries not restricted to.' },
            { text: 'Specify insight level — "good or fair insight" (recognises beliefs are probably not true).' },
            { text: 'Conclusion — meets full DSM-5 criteria for OCD with good insight.', faded: true, blankAnswer: 'Yes, meets DSM-5 criteria for OCD (good insight specifier)..' }
            ] } }
    ],
    explore: { component: C12_PsyPsychologicalDisordersCBSESim, prompt: 'Explore the interactive — Psy Psychological Disorders CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_001', difficulty: 'standard',
          question: 'Abnormal behaviour is characterised by the **Four Ds** — **deviance**.',
          hint: 'Revisit Class 11 Psychology Chapter 8 (Motivation and Emotion) for emotion theories and.',
          misconception: '**“Any behaviour that is statistically rare or socially unusual is abnormal.”** Students frequently equate *deviance*.',
          parts: [
                { id: 'a', prompt: '**REMEMBER**: State the Four Ds of abnormality and give a one-sentence description of each.', answer: '**Correct answer**: 1',
                  options: ['**Correct answer**: 1', 'deviance', 'distress'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**“Any behaviour that is statistically rare or socially unusual is abnormal.”** Students frequently equate *deviance* with *abnormality*.' },
                { id: 'b', prompt: '**UNDERSTAND**: A traffic policeman stands at a busy intersection waving his arms wildly and blowing a whistle.', answer: '**Correct answer**: The social-norms approach judges abnormality by **contextual',
                  options: ['**Correct answer**: The social-norms approach judges abnormality by **contextual', 'both are abnormal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**“Any behaviour that is statistically rare or socially unusual is abnormal.”** Students frequently equate *deviance* with *abnormality*.' },
                { id: 'c', prompt: '**APPLY**: Consider **Meena**, a 16-year-old who refuses to speak in school for three months, communicates only by writing notes, but speaks normally at home.', answer: '**Correct answer with steps**: 1',
                  options: ['**Correct answer with steps**: 1', 'no danger, so not abnormal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**“Any behaviour that is statistically rare or socially unusual is abnormal.”** Students frequently equate *deviance* with *abnormality*.' }
          ],
            remediations: { 'any-behaviour-that-is-statistically': { steps: ['**Re-do Activity 4.1** (NCERT p.', '71): Interview three people about a “mentally ill” person they know; code their responses for the Four Ds — you will.', '**Create a 2×2 matrix**: Rows = Four Ds; Columns = “Present” / “Absent”.', 'Fill it for five cases: (i) traffic policeman, (ii) Meena (selective mutism), (iii) Rohan (high-functioning delusion),.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**“Any behaviour that is statistically rare or socially unusual is abnormal.”** Students frequently equate *deviance*.',
          parts: [
                { id: 'a', prompt: '**EVALUATE**: “The Four Ds are just a checklist; if a behaviour ticks three boxes, it’s a disorder.” Critique this statement using the NCERT’s caution that.', answer: '**Correct answer**: The statement is **reductionist and dangerous**',
                  options: ['**Correct answer**: The statement is **reductionist and dangerous**', 'explain why the Four Ds are insufficient'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**“Any behaviour that is statistically rare or socially unusual is abnormal.”** Students frequently equate *deviance* with *abnormality*.' }
          ],
            remediations: { 'any-behaviour-that-is-statistically': { steps: ['**Re-do Activity 4.1** (NCERT p.', '71): Interview three people about a “mentally ill” person they know; code their responses for the Four Ds — you will.', '**Create a 2×2 matrix**: Rows = Four Ds; Columns = “Present” / “Absent”.', 'Fill it for five cases: (i) traffic policeman, (ii) Meena (selective mutism), (iii) Rohan (high-functioning delusion),.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_002', difficulty: 'standard',
          question: 'Historical Background and Classification of Disorders refers to the evolution.',
          hint: 'If stuck on why classification is needed, revisit the "Four Ds" node.',
          misconception: 'Students often think DSM-5 and ICD-10 are "competing" systems where one is "better" or "more scientific." They write in.',
          parts: [
                { id: 'a', prompt: '**REMEMBER**: Name the three broad historical perspectives used to explain abnormal behaviour and give one key figure associated with each perspective.', answer: '(1) Supernatural perspective',
                  options: ['Correct answer: (1) Supernatural perspective', 'competing', 'better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think DSM-5 and ICD-10 are "competing" systems where one is "better" or "more scientific." They write in exams: "DSM-5 is.' }
          ],
            remediations: { 'dsm-5-and-icd-10': { steps: ['If the student confuses DSM-5/ICD-10 roles or misattributes historical perspectives: 1.', '71-73** (Historical Background) and **pp.', '73-74** (Classification) — highlight *only* the sentences with "APA", "WHO", "India", "official".', '**Make a 2-column table**: "Supernatural / Biological / Psychological" vs.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think DSM-5 and ICD-10 are "competing" systems where one is "better" or "more scientific." They write in.',
          parts: [
                { id: 'a', prompt: '**EVALUATE**: "Classification systems like DSM-5 and ICD-10 are harmful because they label people and create stigma." Defend or critique this statement using.', answer: 'Critique with textbook support: (1) Classification enables *communication* among',
                  options: ['Critique with textbook support: (1) Classification enables *communication* among', 'yes, labels stigmatize', 'competing', 'better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think DSM-5 and ICD-10 are "competing" systems where one is "better" or "more scientific." They write in exams: "DSM-5 is.' },
                { id: 'b', prompt: '**CREATE**: Design a one-page "Historical Timeline of Abnormal Psychology" for a Class 12 bulletin board.', answer: 'Expected timeline (sample milestones): 1',
                  options: ['Expected timeline (sample milestones): 1', 'competing', 'better', 'more scientific'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think DSM-5 and ICD-10 are "competing" systems where one is "better" or "more scientific." They write in exams: "DSM-5 is.' }
          ],
            remediations: { 'dsm-5-and-icd-10': { steps: ['If the student confuses DSM-5/ICD-10 roles or misattributes historical perspectives: 1.', '71-73** (Historical Background) and **pp.', '73-74** (Classification) — highlight *only* the sentences with "APA", "WHO", "India", "official".', '**Make a 2-column table**: "Supernatural / Biological / Psychological" vs.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_003', difficulty: 'standard',
          question: 'Factors underlying abnormal behaviour refer to the three primary explanatory.',
          hint: 'If stuck on neurotransmitter-disorder links, revisit **c11_psy_cbse_18_003** (Synapse).',
          misconception: '**"The biological model means mental disorders are purely genetic/biochemical and cannot be changed by therapy."**.',
          parts: [
                { id: 'a', prompt: 'Name the neurotransmitter associated with each of the following disorders according to the biological model: (a) Anxiety disorders, (b) Schizophrenia, (c).', answer: 'Anxiety disorders, (',
                  options: ['Anxiety disorders, (', 'low dopamine = Parkinson\'s', 'high dopamine = schizophrenia'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"The biological model means mental disorders are purely genetic/biochemical and cannot be changed by therapy."** Students equate.' }
          ],
            remediations: { 'the-biological-model-means-mental': { steps: ['Re-read the NCERT paragraph: "Although there is sound evidence to believe that genetic/biochemical factors are.', 'Watch a 5-min video on "neuroplasticity and CBT" (e.g., NIMH or Khan Academy).', 'Take a case from Worked Example 3 and write *two* treatment plans — one biological (SSRI), one psychological (CBT) —.', 'Re-attempt Diagnostic Question 5. If still stuck, revisit **c11_psy_cbse_18_003** (Synapse) and **c11_psy_cbse_05_004**.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**"The biological model means mental disorders are purely genetic/biochemical and cannot be changed by therapy."**.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Since schizophrenia has a strong genetic component, socio-cultural factors like family communication patterns or urban upbringing are.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'stress'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"The biological model means mental disorders are purely genetic/biochemical and cannot be changed by therapy."** Students equate.' }
          ],
            remediations: { 'the-biological-model-means-mental': { steps: ['Re-read the NCERT paragraph: "Although there is sound evidence to believe that genetic/biochemical factors are.', 'Watch a 5-min video on "neuroplasticity and CBT" (e.g., NIMH or Khan Academy).', 'Take a case from Worked Example 3 and write *two* treatment plans — one biological (SSRI), one psychological (CBT) —.', 'Re-attempt Diagnostic Question 5. If still stuck, revisit **c11_psy_cbse_18_003** (Synapse) and **c11_psy_cbse_05_004**.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_004', difficulty: 'standard',
          question: 'The diathesis-stress model explains psychological disorders as the result of an.',
          hint: 'If stuck, re-read NCERT Class 12 Chapter 4 section "Factors Underlying Abnormal.',
          misconception: '**Specific error:** Students equate "diathesis" with "genetic mutation" and believe the model means **"If you have the.',
          parts: [
                { id: 'a', prompt: 'Define the three components of the diathesis-stress model using NCERT terminology. What does "diathesis" specifically refer to in this model?', answer: '(1) **Diathesis**',
                  options: ['Correct answer: (1) **Diathesis**', 'the disorder', 'stress'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Specific error:** Students equate "diathesis" with "genetic mutation" and believe the model means **"If you have the bad gene, stress.' },
                { id: 'b', prompt: 'Explain in your own words why two individuals with the same biological diathesis for depression (e.g., serotonin transporter gene variant) might not both.', answer: 'The diathesis-stress model posits a **threshold**',
                  options: ['Correct answer: The diathesis-stress model posits a **threshold**', 'one has stronger willpower'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Specific error:** Students equate "diathesis" with "genetic mutation" and believe the model means **"If you have the bad gene, stress.' }
          ],
            remediations: { 'specific-error-students-equate-diathesis': { steps: ['**Step-by-step remediation:** 1.', '**Revisit Node c12_psy_cbse_04_003 (Factors Underlying Abnormal Behaviour)** — specifically the "Biological Factors".', 'no single gene is responsible").', 'Re-read the NCERT lines: *"Although there is sound evidence to believe that genetic/biochemical factors are involved...'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Specific error:** Students equate "diathesis" with "genetic mutation" and believe the model means **"If you have the.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "The diathesis-stress model implies that preventing all stressors would eliminate psychological disorders in vulnerable individuals.".', answer: '**Invalid implication.** The model does not claim stressors are',
                  options: ['Correct answer: **Invalid implication.** The model does not claim stressors are', 'pathogenic stressors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Specific error:** Students equate "diathesis" with "genetic mutation" and believe the model means **"If you have the bad gene, stress.' }
          ],
            remediations: { 'specific-error-students-equate-diathesis': { steps: ['**Step-by-step remediation:** 1.', '**Revisit Node c12_psy_cbse_04_003 (Factors Underlying Abnormal Behaviour)** — specifically the "Biological Factors".', 'no single gene is responsible").', 'Re-read the NCERT lines: *"Although there is sound evidence to believe that genetic/biochemical factors are involved...'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_005', difficulty: 'standard',
          question: 'Anxiety disorders are a group of psychological disorders characterised by.',
          hint: 'If unable to apply Four Ds, revisit c12_psy_cbse_04_001 Activity 4.1 and the "deviance,.',
          misconception: 'Students commonly believe that "Panic Disorder means having frequent panic attacks" and "Agoraphobia means fear of open.',
          parts: [
                { id: 'a', prompt: 'Explain why a panic attack that occurs ONLY when a person with snake phobia sees a snake is NOT diagnosed as Panic Disorder, but the SAME panic attack.', answer: 'Panic Disorder requires RECURRENT UNEXPECTED (uncued) panic attacks',
                  options: ['Panic Disorder requires RECURRENT UNEXPECTED (uncued) panic attacks', 'both are panic attacks so both are Panic Disorder'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students commonly believe that "Panic Disorder means having frequent panic attacks" and "Agoraphobia means fear of open spaces." BOTH are.' },
                { id: 'b', prompt: 'A 14-year-old refuses to attend school, cries excessively when separated from mother, complains of stomachaches before school, and says "Something bad will.', answer: 'Separation Anxiety Disorder',
                  options: ['Separation Anxiety Disorder', 'School Phobia', 'Social Anxiety'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students commonly believe that "Panic Disorder means having frequent panic attacks" and "Agoraphobia means fear of open spaces." BOTH are.' }
          ],
            remediations: { 'students-commonly-believe-that-panic': { steps: ['Revisit c12_psy_cbse_04_001 (Four Ds) to re-anchor the distinction between normal anxiety (proportionate, transient,.', 'Create a comparison table with columns: Disorder | Core Fear Theme | Key Symptoms | Duration | Cued vs Uncued Panic |.', 'Practice 3 case-based differential diagnosis questions (e.g., "A person has panic attacks only in elevators — which.', 'Re-attempt Diagnostic Questions 2 and 5 above. If still incorrect, review c12_psy_cbse_04_004 (Diathesis-Stress) to.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students commonly believe that "Panic Disorder means having frequent panic attacks" and "Agoraphobia means fear of open.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Agoraphobia is just a fear of open spaces." Use DSM-5 criteria to explain why this definition is incomplete and misleading, and.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'fear of open spaces'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students commonly believe that "Panic Disorder means having frequent panic attacks" and "Agoraphobia means fear of open spaces." BOTH are.' }
          ],
            remediations: { 'students-commonly-believe-that-panic': { steps: ['Revisit c12_psy_cbse_04_001 (Four Ds) to re-anchor the distinction between normal anxiety (proportionate, transient,.', 'Create a comparison table with columns: Disorder | Core Fear Theme | Key Symptoms | Duration | Cued vs Uncued Panic |.', 'Practice 3 case-based differential diagnosis questions (e.g., "A person has panic attacks only in elevators — which.', 'Re-attempt Diagnostic Questions 2 and 5 above. If still incorrect, review c12_psy_cbse_04_004 (Diathesis-Stress) to.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_006', difficulty: 'standard',
          question: 'Obsessive-Compulsive Disorder (OCD) is characterised by the presence of.',
          hint: 'If stuck, revisit c12_psy_cbse_04_001 (Four Ds) and c12_psy_cbse_04_002 (classification).',
          misconception: 'Students frequently confuse OCD with Obsessive-Compulsive Personality Disorder (OCPD) and believe "being OCD" means.',
          parts: [
                { id: 'a', prompt: 'A student writes: "OCD is when you like things clean and organised." Identify the two fundamental errors in this statement based on DSM-5 criteria.', answer: '(1) OCD compulsions are not preferences',
                  options: ['Correct answer: (1) OCD compulsions are not preferences', 'Four Ds', 'being OCD'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse OCD with Obsessive-Compulsive Personality Disorder (OCPD) and believe "being OCD" means being perfectionistic,.' },
                { id: 'b', prompt: 'Explain why a person with contamination obsessions who washes hands for 3 hours daily meets OCD criteria, while a surgeon who scrubs for 10 minutes before each.', answer: 'The surgeon\'s handwashing is context-appropriate, goal-directed',
                  options: ['Correct answer: The surgeon\'s handwashing is context-appropriate, goal-directed', 'being OCD', '"being OCD" means being perfectionistic, neat, or organised'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse OCD with Obsessive-Compulsive Personality Disorder (OCPD) and believe "being OCD" means being perfectionistic,.' },
                { id: 'c', prompt: 'Compare the role of avoidance in OCD vs. PTSD. A student claims: "In both disorders, avoidance reduces anxiety, so the mechanism is identical." Analyse this.', answer: 'The claim is partially correct but incomplete',
                  options: ['Correct answer: The claim is partially correct but incomplete', 'being OCD', '"being OCD" means being perfectionistic, neat, or organised'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse OCD with Obsessive-Compulsive Personality Disorder (OCPD) and believe "being OCD" means being perfectionistic,.' }
          ],
            remediations: { 'students-frequently-confuse-ocd-with': { steps: ['Have the student write down the exact DSM-5 definition of "obsession" (intrusive, unwanted, distressing) and.', 'Contrast with OCPD criteria (perfectionism, rigidity, control) using a two-column table.', 'Give 3 mini-vignettes — one OCD, one OCPD, one "just organised" — and ask the student to classify each using the.', 'Re-test with Diagnostic Question 1 and 2. If error persists, revisit c12_psy_cbse_04_001 (Four Ds —.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently confuse OCD with Obsessive-Compulsive Personality Disorder (OCPD) and believe "being OCD" means.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement for a board exam answer: "Hoarding Disorder is just a severe form of OCD because both involve difficulty discarding items." Defend or.', answer: 'Refute',
                  options: ['Correct answer: Refute', 'being OCD', '"being OCD" means being perfectionistic, neat, or organised'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse OCD with Obsessive-Compulsive Personality Disorder (OCPD) and believe "being OCD" means being perfectionistic,.' },
                { id: 'b', prompt: 'Create a brief case vignette (4-5 sentences) of a 17-year-old student that clearly illustrates PTSD (not ASD, not Adjustment Disorder) following a natural.', answer: 'Good answer example: "Three months after surviving a building collapse during an',
                  options: ['Good answer example: "Three months after surviving a building collapse during an', 'being OCD', '"being OCD" means being perfectionistic, neat, or organised'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse OCD with Obsessive-Compulsive Personality Disorder (OCPD) and believe "being OCD" means being perfectionistic,.' }
          ],
            remediations: { 'students-frequently-confuse-ocd-with': { steps: ['Have the student write down the exact DSM-5 definition of "obsession" (intrusive, unwanted, distressing) and.', 'Contrast with OCPD criteria (perfectionism, rigidity, control) using a two-column table.', 'Give 3 mini-vignettes — one OCD, one OCPD, one "just organised" — and ask the student to classify each using the.', 'Re-test with Diagnostic Question 1 and 2. If error persists, revisit c12_psy_cbse_04_001 (Four Ds —.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
