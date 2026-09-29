import type { SimDef } from '../../engine/types';
import C12_PsychologyMeaningStressNatureSim from '../../../simulations/c6_12/C12_PsychologyMeaningStressNatureSim';

/** v3 wrapped master — C12_PsychologyMeaningStressNatureSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_psychologymeaningstressnaturesim: SimDef = {
    id: 'v3w_c12_psychologymeaningstressnaturesim',
    title: 'Depressive and Bipolar Disorders: Symptoms, Risk Factors and Suicide Prevention',
    subtitle: 'Covers: symptom criteria for Major Depressive Disorder, Persistent Depressive Disorder,.',
    classLevel: 12, subject: 'psychology', topic: 'Depressive and Bipolar Disorders: Symptoms, Risk Factors and Suicide Prevention',
    chapters: [],
    nodeIds: ['c12_psy_cbse_04_008', 'c12_psy_cbse_03_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a Class 12 student, Rohan, who has stopped attending tuition, sleeps 14 hours daily, says "nothing.', goal: 'Master Depressive and Bipolar Disorders: Symptoms, Risk Factors and Suicide Prevention.' },
    discovery: {
        question: 'Critique the school\'s proposed suicide prevention policy: "We will hold an assembly showing a graphic film about suicide consequences to scare students away.',
        options: ['The policy is **harmful and contraindicated**', 'awareness', 'prevention'],
        answer: 'The policy is **harmful and contraindicated**',
        hook: '**"Bipolar disorder is just frequent mood swings throughout the day."** Students conflate **emotional lability** (rapid.',
    },
    teaching: [
        { title: 'Depressive Disorders are characterized by.', text: 'Depressive Disorders are characterized by persistent depressed mood or loss of interest/pleasure (anhedonia) accompanied by cognitive, somatic, and behavioral symptoms (e.g., weight/sleep changes,.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_psy_cbse_04_008', title: 'Depressive Disorders are characterized.',
          scaffold: { problem: 'A 16-year-old student, Priya, has shown the following for 3 weeks: persistent sadness, loss of interest in badminton (her favorite sport),.',
            steps: [
            { text: 'Identify the two core symptom criteria — depressed mood and/or anhedonia (loss of interest/pleasure).' },
            { text: 'Count additional symptoms from the 7 somatic/cognitive criteria: (1) insomnia, (2) significant weight loss (>5% body.' },
            { text: 'Check duration — symptoms present for **3 weeks** (≥2 weeks required).' },
            { text: 'Check functional impairment — difficulty concentrating in class, stopped sports → **significant impairment in.' },
            { text: 'Rule out exclusion criteria — no history of mania/hypomania (bipolar excluded), not attributable to substance/medical.' },
            { text: 'Synthesize — Core symptom(s) present + ≥5 total symptoms (2 core + 4 additional) + ≥2 weeks + impairment + no exclusion.', faded: true, blankAnswer: 'Yes, Priya meets DSM-5 criteria for Major Depressive.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_03_001', title: 'Stress is a dynamic, transactional.',
          scaffold: { problem: 'Meera (Class 12) and Rohan (Class 12) both learn their school\'s annual fest is in two weeks and they are in charge of decorations.',
            steps: [
            { text: 'Identify the common external event — the fest decoration responsibility announced two weeks prior.' },
            { text: 'Analyse Meera\'s primary appraisal — she sees the event as a *challenge* (positive, opportunity to grow) because she.' },
            { text: 'Analyse Meera\'s secondary appraisal — she evaluates her resources (art skills, organizational ability, team) as.' },
            { text: 'Determine Meera\'s strain — the combination of challenge appraisal and high perceived coping yields *eustress*:.' },
            { text: 'Analyse Rohan\'s primary appraisal — he sees the event as a *threat* (negative, potential for harm/judgment) because he.' },
            { text: 'Analyse Rohan\'s secondary appraisal — he evaluates his resources (creativity, confidence) as *insufficient*, leading to.' },
            { text: 'Determine Rohan\'s strain — threat appraisal + low perceived coping yields *distress*: anxiety, avoidance,.' },
            { text: 'Conclude that the *same stressor* produced opposite strain types because of divergent appraisals, illustrating the.', faded: true, blankAnswer: 'Stressor: Fest decoration responsibility. Meera:.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_psy_cbse_03_001', title: 'Identify each idea',
          dissect: { specimen: 'Depressive and Bipolar Disorders: Symptoms, Risk Factors and Suicide Prevention', spots: [
            { id: 's1', label: 'Depressive Disorders are characterized by', prompt: 'Which idea is this? — Depressive Disorders are characterized by persistent depressed mood or loss of.', answer: 'Depressive Disorders are characterized by', options: ['Depressive Disorders are characterized by', 'Stress is a dynamic transactional'] },
            { id: 's2', label: 'Stress is a dynamic transactional', prompt: 'Which idea is this? — Stress is a dynamic, transactional process in which an individual perceives and appraises.', answer: 'Stress is a dynamic transactional', options: ['Stress is a dynamic transactional', 'Depressive Disorders are characterized by'] }
          ] } }
    ],
    explore: { component: C12_PsychologyMeaningStressNatureSim, prompt: 'Explore the interactive — Depressive and Bipolar Disorders: Symptoms, Risk Factors and Suicide Prevention' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_008', difficulty: 'standard',
          question: 'Depressive Disorders are characterized by persistent depressed mood or loss of.',
          hint: 'If stuck, revisit **c12_psy_cbse_04_004 Diathesis-Stress Model** and practice applying it.',
          misconception: '**"Bipolar disorder is just frequent mood swings throughout the day."** Students conflate **emotional lability** (rapid.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Major Depressive Disorder requires the person to feel sad for at least two weeks." Is this statement fully accurate?', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'depression'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"Bipolar disorder is just frequent mood swings throughout the day."** Students conflate **emotional lability** (rapid shifts in reaction.' }
          ],
            remediations: { 'bipolar-disorder-is-just-frequent': { steps: ['**Revisit Node c12_psy_cbse_04_001 (Four Ds)**: Re-apply deviance/distress/dysfunction/danger to distinguish daily mood.', '**Review Node c12_psy_cbse_04_004 (Diathesis-Stress)**: Map bipolar\'s genetic loading + circadian vulnerability to.', '**Complete a diagnostic exercise**: Given 5 vignettes (normal sadness, MDD, Bipolar I, Bipolar II, cyclothymia),.', '**Re-diagnostic**: Explain why a 3-hour "high" after exam success ≠ hypomania (insufficient duration, no syndromal.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**"Bipolar disorder is just frequent mood swings throughout the day."** Students conflate **emotional lability** (rapid.',
          parts: [
                { id: 'a', prompt: 'Critique the school\'s proposed suicide prevention policy: "We will hold an assembly showing a graphic film about suicide consequences to scare students away.', answer: 'The policy is **harmful and contraindicated**',
                  options: ['The policy is **harmful and contraindicated**', 'awareness', 'prevention'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"Bipolar disorder is just frequent mood swings throughout the day."** Students conflate **emotional lability** (rapid shifts in reaction.' }
          ],
            remediations: { 'bipolar-disorder-is-just-frequent': { steps: ['**Revisit Node c12_psy_cbse_04_001 (Four Ds)**: Re-apply deviance/distress/dysfunction/danger to distinguish daily mood.', '**Review Node c12_psy_cbse_04_004 (Diathesis-Stress)**: Map bipolar\'s genetic loading + circadian vulnerability to.', '**Complete a diagnostic exercise**: Given 5 vignettes (normal sadness, MDD, Bipolar I, Bipolar II, cyclothymia),.', '**Re-diagnostic**: Explain why a 3-hour "high" after exam success ≠ hypomania (insufficient duration, no syndromal.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_03_001', difficulty: 'standard',
          question: 'Stress is a dynamic, transactional process in which an individual perceives and.',
          hint: 'Revisit the "transactional model" paragraph on NCERT page 53 and practice writing.',
          misconception: 'Students consistently write: "Stress is caused by exams / parents / traffic" (i.e., stress = stressor).',
          parts: [
                { id: 'a', prompt: 'A student says: "Eustress is good stress and distress is bad stress, so we should try to eliminate all distress and only have eustress." Using the concept of.', answer: 'The statement is flawed',
                  options: ['Correct answer: The statement is flawed', 'good/bad', 'Stressors are the stress we feel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently write: "Stress is caused by exams / parents / traffic" (i.e., stress = stressor).' },
                { id: 'b', prompt: 'Rahul, a 17-year-old, hears a loud explosion nearby (stressor). His heart pounds, breathing quickens, and he freezes momentarily (strain).', answer: 'Correct analysis: The explosion is the external stressor',
                  options: ['Correct analysis: The explosion is the external stressor', 'the explosion caused the stress', 'the stress ended when he knew it was safe'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently write: "Stress is caused by exams / parents / traffic" (i.e., stress = stressor).' }
          ],
            remediations: { 'students-consistently-write-stress-is': { steps: ['Have the student re-read the NCERT paragraph starting "Stress is not a factor that resides in the individual or the.', 'Ask them to draw Figure 3.1 from memory — Stressors → [Appraisal Process] → Strain — and label the appraisal box with.', 'Give them three micro-scenarios (e.g., "Phone battery at 5%," "Friend cancels plan," "Teacher praises you") and ask:.', 'Debrief by highlighting that the *event* didn\'t change — only the appraisal did.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently write: "Stress is caused by exams / parents / traffic" (i.e., stress = stressor).',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Stress resides in the individual (personality) or the environment (events), so measuring either one tells us the stress level." Use.', answer: 'Correct critique: The statement is false',
                  options: ['Correct critique: The statement is false', 'personality traits', 'event severity', 'Stressors are the stress we feel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently write: "Stress is caused by exams / parents / traffic" (i.e., stress = stressor).' }
          ],
            remediations: { 'students-consistently-write-stress-is': { steps: ['Have the student re-read the NCERT paragraph starting "Stress is not a factor that resides in the individual or the.', 'Ask them to draw Figure 3.1 from memory — Stressors → [Appraisal Process] → Strain — and label the appraisal box with.', 'Give them three micro-scenarios (e.g., "Phone battery at 5%," "Friend cancels plan," "Teacher praises you") and ask:.', 'Debrief by highlighting that the *event* didn\'t change — only the appraisal did.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
