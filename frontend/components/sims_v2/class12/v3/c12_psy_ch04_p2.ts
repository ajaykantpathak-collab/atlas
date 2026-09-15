import type { SimDef } from '../../engine/types';

/** v3 generated — c12_psy_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_psy_ch04_p2: SimDef = {
    id: 'v3_c12_psy_ch04_p2',
    title: 'Psychological Disorders · Part 2/2',
    subtitle: 'Same arm-waving — one is a job, one is a symptom',
    classLevel: 12, subject: 'psychology', topic: 'Psychological Disorders · Part 2/2',
    chapters: ['c12_psy_ch04'],
    nodeIds: ['c12_psy_cbse_04_007', 'c12_psy_cbse_04_008', 'c12_psy_cbse_04_009', 'c12_psy_cbse_04_010', 'c12_psy_cbse_04_011', 'c12_psy_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Clinical frame-builder', intro: 'Two students before exams — one studies hard, one can\'t open a book. The line between them has four letters.', goal: 'Apply the Four Ds and the social-norms versus maladaptive lenses to judge abnormal behaviour.' },
    discovery: {
        question: 'A traffic policeman waves his arms wildly at an intersection; a pedestrian does the same on a quiet sidewalk. Same motion — why is only one maybe abnormal?',
        options: ['Context — deviance is judged against the role and the norm; the policeman\'s waving is prescribed by his job, the pedestrian\'s violates the unstated rule of calm public movement', 'Uniforms exempt', 'Both abnormal', 'Neither is'],
        answer: 'Context — deviance is judged against the role and the norm; the policeman\'s waving is prescribed by his job, the pedestrian\'s violates the unstated rule of calm public movement',
        hook: 'The Four Ds aren\'t a checklist demanding all four — deviance, distress and dysfunction together usually suffice without danger. And \'weird = abnormal\' fails: a ritual or a job can license behaviour that looks deviant but functions perfectly — the maladaptive lens asks whether it blocks a life.',
    },
    teaching: [
        { title: 'Somatic Symptom and Dissociative Disorders: Conversion, Amnesia and Identity Disorders', text: 'Somatic Symptom and Related Disorders involve prominent physical symptoms causing significant distress or impairment, accompanied by excessive thoughts, feelings, or behaviors related to the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_psy_cbse_04_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Judge a case like a clinician: run Meena\'s school-silence through each D, weigh deviance against maladaptiveness, and catch where context turns \'strange\' into \'sanctioned.\'',
        labels: ['Somatic Symptom and Dissociative', 'Depressive and Bipolar Disorders', 'Schizophrenia: Positive Symptoms (Delusions,', 'Neurodevelopmental Disorders: ADHD, Autism', 'Disruptive Behaviour and Eating', 'Substance-Related and Addictive Disorders'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_psy_cbse_04_007', title: 'Somatic Symptom and Dissociative Disorders: Conversion, Amnesia and Identity Disorders',
          caseStudy: { intro: 'Imagine a student who suddenly loses the ability to speak before board exams, but medical tests show no vocal cord damage.',
            decisions: [{ prompt: 'Define Conversion Disorder and state its two essential diagnostic features as per DSM-5.', options: [
                { text: 'Conversion Disorder (Functional Neurological Symptom Disorder) involves one or more', outcome: 'Conversion Disorder (Functional Neurological Symptom Disorder) involves one or more symptoms.' },
                { text: 'faking illness', outcome: 'Not quite — Students often believe that patients with somatic symptom or dissociative disorders are "faking".', reveals: 'patients-with-somatic-symptom-or' },
                { text: 'faking', outcome: 'Not quite — Students often believe that patients with somatic symptom or dissociative disorders are "faking".', reveals: 'patients-with-somatic-symptom-or' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_04_008', title: 'Depressive and Bipolar Disorders: Symptoms, Risk Factors and Suicide Prevention',
          caseStudy: { intro: 'Imagine a Class 12 student, Rohan, who has stopped attending tuition, sleeps 14 hours daily, says "nothing matters," and gave away his cricket kit.',
            decisions: [{ prompt: 'A student writes: "Major Depressive Disorder requires the person to feel sad for at least two weeks." Is this statement fully accurate?', options: [
                { text: 'The statement is incomplete', outcome: 'The statement is incomplete. MDD requires **either** depressed mood **or** loss.' },
                { text: 'depression', outcome: 'Not quite — **"Bipolar disorder is just frequent mood swings throughout the day."** Students conflate.', reveals: 'bipolar-disorder-is-just-frequent' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_04_010', title: 'Neurodevelopmental Disorders: ADHD, Autism Spectrum, Intellectual Disability and Learning Disorder',
          caseStudy: { intro: 'Imagine a 7-year-old child who cannot sit still in class, blurts out answers, struggles to make friends, avoids eye contact, and reads two grade levels below.',
            decisions: [{ prompt: 'A 6-year-old child shows persistent difficulty sustaining attention in tasks, often loses school materials, is easily distracted.', options: [
                { text: 'This matches the **Predominantly Inattentive Presentation** of ADHD (DSM-5)', outcome: 'This matches the **Predominantly Inattentive Presentation** of ADHD (DSM-5).' },
                { text: 'Combined Presentation', outcome: 'Not quite — **"ADHD is just bad parenting or lack of discipline — if parents were stricter, the child would.', reveals: 'adhd-is-just-bad-parenting' },
                { text: 'duration of 3 months', outcome: 'Not quite — **"ADHD is just bad parenting or lack of discipline — if parents were stricter, the child would.', reveals: 'adhd-is-just-bad-parenting' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_04_011', title: 'Disruptive Behaviour and Eating Disorders: ODD, Conduct Disorder, Anorexia and Bulimia',
          caseStudy: { intro: 'Imagine a Class 12 student, Rohan, notices his 14-year-old brother has become increasingly hostile — refusing every request, deliberately annoying parents.',
            decisions: [{ prompt: 'A 10-year-old child frequently argues with adults, actively defies rules, deliberately annoys peers, and blames others for his mistakes.', options: [
                { text: 'Oppositional Defiant Disorder (ODD)', outcome: 'Oppositional Defiant Disorder (ODD). The child shows the classic angry/irritable mood (argues.' },
                { text: 'Conduct Disorder', outcome: 'Not quite — Students frequently confuse **ODD and Conduct Disorder as a "mild vs.', reveals: 'students-frequently-confuse-odd-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_04_012', title: 'Substance-Related and Addictive Disorders: Alcohol, Cocaine and Opioid Abuse',
          caseStudy: { intro: 'Imagine a 19-year-old college student who started drinking socially but now needs 5-6 drinks to feel the same effect, misses classes due to hangovers, and gets.',
            decisions: [{ prompt: 'A 25-year-old male reports drinking 60g of pure alcohol daily for 3 years. He needs increasing amounts to feel intoxicated.', options: [
                { text: 'Tolerance (criterion 10) and Withdrawal (criterion 11)', outcome: 'Tolerance (criterion 10) and Withdrawal (criterion 11). A wrong answer like "craving" or "failure.' },
                { text: 'craving', outcome: 'Not quite — Students believe "addiction = physical dependence" and therefore think: (1) Cocaine isn\'t "truly.', reveals: 'addiction-physical-dependence-and-therefore' },
                { text: 'failure to fulfill role obligations', outcome: 'Not quite — Students believe "addiction = physical dependence" and therefore think: (1) Cocaine isn\'t "truly.', reveals: 'addiction-physical-dependence-and-therefore' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Watching a documentary on medieval \'possession\' cases — convulsions, voices — a viewer scoffs \'they were just ignorant; today we know it\'s schizophrenia and we treat it right.\'',
            decisions: [{ prompt: 'What do the historical models add to that reaction?', options: [
                { text: 'Each era\'s model has internal logic — supernatural explains the same symptoms as spirit-work needing exorcism, biological explains it as bodily dysregulation needing antipsychotics; the treatment follows the assumed cause, so \'ignorance\' misses that a different causal model was operating, not absent thinking.', outcome: 'The chapter\'s point: explanation and treatment travel as a pair — symptoms stay constant while the model decides whether you reach for prayer or a prescription.' },
                { text: 'He\'s right — only the biological model counts as real explanation.', outcome: 'Presentism aside, that misses what classification and models do — each perspective was a coherent causal system directing practice; understanding them is how you see why the same behaviour got exorcised then and medicated now.', reveals: 'past-models-were-noise' },
                { text: 'DSM-5 is the real difference — earlier eras lacked categories, not explanations.', outcome: 'That confuses classification with causation — DSM and ICD organize how we label disorders; the supernatural/biological/psychological models are the competing answers to why they occur.', reveals: 'labels-are-explanations' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_04_012', title: 'You made it',
          caseStudy: { intro: 'You can now define abnormality as a cluster judged by culture and function — not by how unusual it looks.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_007', difficulty: 'standard',
          question: 'Somatic Symptom and Related Disorders involve prominent physical symptoms.',
          hint: 'Revisit c12_psy_cbse_04_001 (Four Ds) and c12_psy_cbse_04_004 (diathesis-stress) with two.',
          misconception: 'Students often believe that patients with somatic symptom or dissociative disorders are "faking" or "making it up" for.',
          parts: [
                { id: 'a', prompt: 'A 16-year-old student complains of severe abdominal pain and nausea for three months. Multiple medical investigations are normal.', answer: 'Somatic Symptom Disorder is the correct diagnosis',
                  options: ['Somatic Symptom Disorder is the correct diagnosis', 'faking', 'making it up', 'Conversion Disorder = pretending to be blind'],
                  hint: 'Revisit c12_psy_cbse_04_001 (Four Ds) and c12_psy_cbse_04_004 (diathesis-stress) with two practice.',
                  misconception: 'Students often believe that patients with somatic symptom or dissociative disorders are "faking" or "making it up" for attention.' },
                { id: 'b', prompt: 'Compare and contrast Depersonalization/Derealization Disorder with Dissociative Identity Disorder on three dimensions: (a) continuity of identity, (b).', answer: 'continuity of identity, (',
                  options: ['continuity of identity, (', 'schizophrenia-like voices', 'faking', 'making it up'],
                  hint: 'Revisit c12_psy_cbse_04_001 (Four Ds) and c12_psy_cbse_04_004 (diathesis-stress) with two practice.',
                  misconception: 'Students often believe that patients with somatic symptom or dissociative disorders are "faking" or "making it up" for attention.' }
          ],
            remediations: { 'patients-with-somatic-symptom-or': { steps: ['If a student holds the "faking" misconception, first clarify the distinction between voluntary (malingering/factitious).', 'Have the student fill it using DSM-5 criteria.', 'Re-test with Diagnostic Question 1.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that patients with somatic symptom or dissociative disorders are "faking" or "making it up" for.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the statement: "Somatic Symptom Disorder and Conversion Disorder are essentially the same because both involve physical symptoms without.', answer: 'The statement is false',
                  options: ['The statement is false', 'faking', 'making it up', 'Conversion Disorder = pretending to be blind'],
                  hint: 'Revisit c12_psy_cbse_04_001 (Four Ds) and c12_psy_cbse_04_004 (diathesis-stress) with two practice.',
                  misconception: 'Students often believe that patients with somatic symptom or dissociative disorders are "faking" or "making it up" for attention.' }
          ],
            remediations: { 'patients-with-somatic-symptom-or': { steps: ['If a student holds the "faking" misconception, first clarify the distinction between voluntary (malingering/factitious).', 'Have the student fill it using DSM-5 criteria.', 'Re-test with Diagnostic Question 1.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_008', difficulty: 'standard',
          question: 'Depressive Disorders are characterized by persistent depressed mood or loss.',
          hint: 'If stuck, revisit **c12_psy_cbse_04_004 Diathesis-Stress Model** and practice applying.',
          misconception: '**"Bipolar disorder is just frequent mood swings throughout the day."** Students conflate **emotional lability** (rapid.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Major Depressive Disorder requires the person to feel sad for at least two weeks." Is this statement fully accurate?', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'depression'],
                  hint: 'If stuck, revisit **c12_psy_cbse_04_004 Diathesis-Stress Model** and practice applying it to a case.',
                  misconception: '**"Bipolar disorder is just frequent mood swings throughout the day."** Students conflate **emotional lability** (rapid shifts in reaction.' }
          ],
            remediations: { 'bipolar-disorder-is-just-frequent': { steps: ['**Revisit Node c12_psy_cbse_04_001 (Four Ds)**: Re-apply deviance/distress/dysfunction/danger to distinguish daily mood.', '**Review Node c12_psy_cbse_04_004 (Diathesis-Stress)**: Map bipolar\'s genetic loading + circadian vulnerability.', '**Complete a diagnostic exercise**: Given 5 vignettes (normal sadness, MDD, Bipolar I, Bipolar II, cyclothymia).', '**Re-diagnostic**: Explain why a 3-hour "high" after exam success ≠ hypomania (insufficient duration, no syndromal.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_009', difficulty: 'standard',
          question: 'Schizophrenia is a severe psychotic disorder characterised by a breakdown.',
          hint: 'If stuck on symptom classification, revisit c12_psy_cbse_04_001 (Four Ds) and.',
          misconception: '**Misconception:** "Negative symptoms are just the patient being lazy, unmotivated, or depressed — they\'re not \'real\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Schizophrenia is a severe psychotic disorder characterised by a breakdown in thought',
                  options: ['Schizophrenia is a severe psychotic disorder characterised by a breakdown in thought', 'Abnormal behaviour is characterised by the **Four Ds**', 'Historical Background and Classification of Disorders refers to the evolution of', 'Factors underlying abnormal behaviour refer to the three primary explanatory frameworks'],
                  hint: 'If stuck on symptom classification, revisit c12_psy_cbse_04_001 (Four Ds) and c11_bio_cbse_18_003.',
                  misconception: '**Misconception:** "Negative symptoms are just the patient being lazy, unmotivated, or depressed — they\'re not \'real\' schizophrenia.' }
          ],
            remediations: { 'misconception-negative-symptoms-are-just': { steps: ['If a student confuses positive/negative terminology or misclassifies symptoms: (1) Have them create a two-column table.', '(2) Give 10 symptom cards (e.g., "hearing voices," "flat face," "believes FBI follows him," "speaks in fragments,".', 'Student sorts each into column and labels subtype (e.g., "hearing voices → auditory hallucination → Positive").', '(3) Re-test with Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_010', difficulty: 'standard',
          question: 'Neurodevelopmental disorders are a group of conditions characterised.',
          hint: 'If unable to distinguish typical vs. atypical development, revisit c11_psy_cbse_03_005.',
          misconception: '**"ADHD is just bad parenting or lack of discipline — if parents were stricter, the child would behave."** Students.',
          parts: [
                { id: 'a', prompt: 'A 6-year-old child shows persistent difficulty sustaining attention in tasks, often loses school materials, is easily distracted by extraneous stimuli, and.', answer: 'This matches the **Predominantly Inattentive Presentation** of ADHD (DSM-5)',
                  options: ['This matches the **Predominantly Inattentive Presentation** of ADHD (DSM-5)', 'Combined Presentation', 'duration of 3 months'],
                  hint: 'If unable to distinguish typical vs. atypical development, revisit c11_psy_cbse_03_005 (Piaget\'s.',
                  misconception: '**"ADHD is just bad parenting or lack of discipline — if parents were stricter, the child would behave."** Students often confuse.' },
                { id: 'b', prompt: '"Autism Spectrum Disorder and Intellectual Disability both involve social difficulties.', answer: 'The reasoning is flawed',
                  options: ['The reasoning is flawed', 'social difficulty'],
                  hint: 'If unable to distinguish typical vs. atypical development, revisit c11_psy_cbse_03_005 (Piaget\'s.',
                  misconception: '**"ADHD is just bad parenting or lack of discipline — if parents were stricter, the child would behave."** Students often confuse.' },
                { id: 'c', prompt: 'A 9-year-old student reads accurately but extremely slowly, guesses words based on first letter, and shows poor comprehension despite average IQ and adequate.', answer: '**Specific Learning Disorder with impairment in reading (dyslexia) and writing',
                  options: ['**Specific Learning Disorder with impairment in reading (dyslexia) and writing', 'mild ID', 'slow learner'],
                  hint: 'If unable to distinguish typical vs. atypical development, revisit c11_psy_cbse_03_005 (Piaget\'s.',
                  misconception: '**"ADHD is just bad parenting or lack of discipline — if parents were stricter, the child would behave."** Students often confuse.' },
                { id: 'd', prompt: 'Compare the developmental trajectories of ADHD and ASD regarding: (a) age of onset visibility, (b) symptom stability vs.', answer: 'age of onset visibility, (',
                  options: ['age of onset visibility, (', 'age of diagnosis', 'age of symptom manifestation relative to demand'],
                  hint: 'If unable to distinguish typical vs. atypical development, revisit c11_psy_cbse_03_005 (Piaget\'s.',
                  misconception: '**"ADHD is just bad parenting or lack of discipline — if parents were stricter, the child would behave."** Students often confuse.' }
          ],
            remediations: { 'adhd-is-just-bad-parenting': { steps: ['**Revisit c11_psy_cbse_03_010 (Adolescence: Physical, Cognitive and Identity Changes)** — review typical developmental.', '**Revisit c12_psy_cbse_04_003 (Factors Underlying Abnormal Behaviour)** — study the biological model.', '**Practice differential diagnosis**: Take 3 case vignettes (one ADHD, one ASD, one ID) and list *only* the criteria.', '**Re-diagnostic**: Answer DIAGNOSTIC_QUESTION_2 and DIAGNOSTIC_QUESTION_3 again without notes — if you still conflate.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_011', difficulty: 'standard',
          question: 'Disruptive Behaviour Disorders (Oppositional Defiant Disorder and Conduct.',
          hint: 'Revisit c12_psy_cbse_04_001 (Four Ds) and c12_psy_cbse_04_002 (DSM-5/ICD-10 structure).',
          misconception: 'Students frequently confuse **ODD and Conduct Disorder as a "mild vs.',
          parts: [
                { id: 'a', prompt: 'A 10-year-old child frequently argues with adults, actively defies rules, deliberately annoys peers, and blames others for his mistakes.', answer: 'Oppositional Defiant Disorder (ODD)',
                  options: ['Oppositional Defiant Disorder (ODD)', 'Conduct Disorder'],
                  hint: 'Revisit c12_psy_cbse_04_001 (Four Ds) and c12_psy_cbse_04_002 (DSM-5/ICD-10 structure) — practice.',
                  misconception: 'Students frequently confuse **ODD and Conduct Disorder as a "mild vs.' },
                { id: 'b', prompt: 'Explain why a clinician would diagnose Anorexia Nervosa (Restricting Type) rather than Bulimia Nervosa for a 17-year-old female with BMI 15.8 who severely.', answer: 'Anorexia Nervosa (Restricting Type) is diagnosed because: (1) BMI 15.8 indicates',
                  options: ['Anorexia Nervosa (Restricting Type) is diagnosed because: (1) BMI 15.8 indicates', 'Bulimia'],
                  hint: 'Revisit c12_psy_cbse_04_001 (Four Ds) and c12_psy_cbse_04_002 (DSM-5/ICD-10 structure) — practice.',
                  misconception: 'Students frequently confuse **ODD and Conduct Disorder as a "mild vs.' },
                { id: 'c', prompt: 'Compare Anorexia Nervosa and Bulimia Nervosa on the following dimensions: (a) Typical weight status at presentation, (b) Presence/absence of binge-eating.', answer: 'Typical weight status at presentation, (',
                  options: ['Typical weight status at presentation, (', 'both have low weight', 'both have binge-eating'],
                  hint: 'Revisit c12_psy_cbse_04_001 (Four Ds) and c12_psy_cbse_04_002 (DSM-5/ICD-10 structure) — practice.',
                  misconception: 'Students frequently confuse **ODD and Conduct Disorder as a "mild vs.' }
          ],
            remediations: { 'students-frequently-confuse-odd-and': { steps: ['If a student conflates ODD/CD or Anorexia/Bulimia: Step 1 — Have them create a **two-column table** for each pair: left.', 'Use DSM-5 criterion letters (A1, A2, B, C...).', 'Step 2 — Give **3 mini-vignettes** per pair; student must *cite the specific criterion* that confirms one diagnosis and.', 'Step 3 — Ask: "If a child has ODD symptoms *plus* one act of theft, is it Conduct Disorder?" (Answer: No — CD requires.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_012', difficulty: 'standard',
          question: 'Substance-Related and Addictive Disorders involve a cluster of cognitive.',
          hint: 'If stuck on neurobiology, revisit c11_bio_cbse_18_003 (Synapse) and c11_psy_cbse_08_001.',
          misconception: 'Students believe "addiction = physical dependence" and therefore think: (1) Cocaine isn\'t "truly addictive" because.',
          parts: [
                { id: 'a', prompt: 'A 25-year-old male reports drinking 60g of pure alcohol daily for 3 years. He needs increasing amounts to feel intoxicated.', answer: 'Tolerance (criterion 10) and Withdrawal (criterion 11)',
                  options: ['Tolerance (criterion 10) and Withdrawal (criterion 11)', 'craving', 'failure to fulfill role obligations', 'addiction = physical dependence'],
                  hint: 'If stuck on neurobiology, revisit c11_bio_cbse_18_003 (Synapse) and c11_psy_cbse_08_001.',
                  misconception: 'Students believe "addiction = physical dependence" and therefore think: (1) Cocaine isn\'t "truly addictive" because it lacks.' },
                { id: 'b', prompt: 'Compare the *learning theory* explanations for why (a) alcohol-associated cues (clinking glasses, bar smell) trigger craving, and (b) opioid-associated cues.', answer: 'alcohol-associated cues (clinking glasses, bar smell) trigger craving, and (',
                  options: ['alcohol-associated cues (clinking glasses, bar smell) trigger craving, and (', 'craving', 'addiction = physical dependence', 'truly addictive'],
                  hint: 'If stuck on neurobiology, revisit c11_bio_cbse_18_003 (Synapse) and c11_psy_cbse_08_001.',
                  misconception: 'Students believe "addiction = physical dependence" and therefore think: (1) Cocaine isn\'t "truly addictive" because it lacks.' }
          ],
            remediations: { 'addiction-physical-dependence-and-therefore': { steps: ['Have the student list all 11 DSM-5 criteria for Substance Use Disorders from memory.', 'Give 3 vignettes — (a) chronic pain patient on stable morphine, (b) weekend cocaine binger, (c) daily heavy drinker.', 'For each, student checks off which criteria are met.', 'Student explains *why* (a) has 0-1 criteria (only tolerance/withdrawal — *not* a disorder), (b) has 6+ criteria.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
