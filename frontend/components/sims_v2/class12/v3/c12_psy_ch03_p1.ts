import type { SimDef } from '../../engine/types';

/** v3 generated — c12_psy_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_psy_ch03_p1: SimDef = {
    id: 'v3_c12_psy_ch03_p1',
    title: 'Meeting Life Challenges · Part 1/2',
    subtitle: 'Same exam date — one dreads it, one plans for it',
    classLevel: 12, subject: 'psychology', topic: 'Meeting Life Challenges · Part 1/2',
    chapters: ['c12_psy_ch03'],
    nodeIds: ['c12_psy_cbse_03_001', 'c12_psy_cbse_03_002', 'c12_psy_cbse_03_003', 'c12_psy_cbse_03_004', 'c12_psy_cbse_03_005', 'c12_psy_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Stress appraiser', intro: 'Two students, one date sheet, two opposite reactions — stress lives in the appraisal, not the event.', goal: 'Define stress transactionally — stressor, appraisal, strain — and split eustress from distress.' },
    discovery: {
        question: 'Same board-exam date sheet: Priya\'s stomach knots in dread, Arjun opens a planner. If the event is identical, where does the stress actually live?',
        options: ['In the transaction — stress is the appraisal of demand against coping resources, not the event itself; same stressor, different strain', 'In the date sheet', 'In personalities only', 'In preparation'],
        answer: 'In the transaction — stress is the appraisal of demand against coping resources, not the event itself; same stressor, different strain',
        hook: '\'Eliminate distress, keep only eustress\' fails twice — stress isn\'t binary, and too little arousal leaves you listless; a threat and a challenge can be the same event appraised differently. And the stressor ending doesn\'t end the strain — appraisal and arousal stay linked.',
    },
    teaching: [
        { title: 'Nature of Stress: Eustress, Distress, Stressors and Strain', text: 'Stress is a dynamic, transactional process in which an individual perceives and appraises a demand (stressor) as exceeding their coping resources, resulting in a pattern of physiological, emotional.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_psy_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace one stressful event through the model: name stressor and strain, separate primary from secondary appraisal, and argue why \'it\'s all in your personality\' or \'all in the event\' both miss the transaction.',
        labels: ['Nature of Stress: Eustress,', 'Lazarus Cognitive Appraisal Theory', 'Types and Sources', 'Effects of Stress', 'General Adaptation Syndrome: Alarm,', 'Stress and the Immune'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_psy_cbse_03_001', title: 'Nature of Stress: Eustress, Distress, Stressors and Strain',
          caseStudy: { intro: 'Imagine you are a Class 12 student named Priya who has just received the date sheet for board exams.',
            decisions: [{ prompt: 'Define stress according to the NCERT textbook, and explain why the definition "stress is the non-specific response of the body to any.', options: [
                { text: 'Correct answer: Stress is "the pattern of responses an organism makes to stimulus event', outcome: 'Correct answer: Stress is "the pattern of responses an organism makes to stimulus event that.' },
                { text: 'exceeds coping ability', outcome: 'Not quite — Students consistently write: "Stress is caused by exams / parents / traffic" (i.e., stress.', reveals: 'students-consistently-write-stress-is' },
                { text: 'transactional', outcome: 'Not quite — Students consistently write: "Stress is caused by exams / parents / traffic" (i.e., stress.', reveals: 'students-consistently-write-stress-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_03_002', title: 'Lazarus Cognitive Appraisal Theory: Primary and Secondary Appraisal',
          caseStudy: { intro: 'Imagine two Class 12 students, Arya and Rohan, both facing the same board exam tomorrow.',
            decisions: [{ prompt: 'Define primary appraisal and secondary appraisal according to Lazarus. Give one example of each from a student’s life.', options: [
                { text: 'Primary appraisal is the initial evaluation of an event as irrelevant, benign-positive,', outcome: 'Primary appraisal is the initial evaluation of an event as irrelevant, benign-positive,.' },
                { text: 'The exam is a threat', outcome: 'Not quite — Students often believe that primary appraisal and secondary appraisal occur strictly sequentially.', reveals: 'primary-appraisal-and-secondary-appraisal' },
                { text: 'I have studied enough and can ask my teacher for help, so I can cope', outcome: 'Not quite — Students often believe that primary appraisal and secondary appraisal occur strictly sequentially.', reveals: 'primary-appraisal-and-secondary-appraisal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_03_003', title: 'Types and Sources of Stress: Physical, Psychological, Social, Life Events and Hassles',
          caseStudy: { intro: 'Imagine you are stuck in a Delhi traffic jam at 8:45 AM, honking non-stop, late for your board practical exam — your heart races, palms sweat, and you think.',
            decisions: [{ prompt: 'A student says, "The stress I feel before my NEET exam is purely psychological because it\'s all in my mind." Using NCERT classification,.', options: [
                { text: 'No, the statement is incorrect', outcome: 'No, the statement is incorrect because examination stress involves physical/environmental.' },
                { text: 'exams are psychological stress', outcome: 'Not quite — Students believe each stressful situation belongs to ONLY ONE stress type (e.g., "exams are.', reveals: 'each-stressful-situation-belongs-to' },
                { text: 'exams are life events', outcome: 'Not quite — Students believe each stressful situation belongs to ONLY ONE stress type (e.g., "exams are.', reveals: 'each-stressful-situation-belongs-to' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_03_005', title: 'General Adaptation Syndrome: Alarm, Resistance and Exhaustion Stages (Selye)',
          caseStudy: { intro: 'Imagine a Class 12 student, Priya, who has been preparing for NEET for 18 months. Initially, her heart races before every mock test (Alarm).',
            decisions: [{ prompt: 'A student writes: "In the Resistance stage of GAS, the body returns to normal functioning because it has adapted to the stressor." Is this.', options: [
                { text: 'The statement is **incorrect**', outcome: 'The statement is **incorrect**. In the Resistance stage, the body does NOT return to normal;.' },
                { text: 'back to normal', outcome: 'Not quite — **Misconception:** "The Resistance stage means the body has successfully adapted and the stress.', reveals: 'misconception-the-resistance-stage-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_03_006', title: 'Stress and the Immune System: Psychoneuroimmunology and Natural Killer Cells',
          caseStudy: { intro: 'Imagine two Class 12 students, Arjun and Priya, both preparing for NEET.',
            decisions: [{ prompt: 'What are the three main types of white blood cells (leucocytes) mentioned in the NCERT textbook that constitute the immune system\'s.', options: [
                { text: 'The three main types are T cells, B cells, and natural killer (NK) cells', outcome: 'The three main types are T cells, B cells, and natural killer (NK) cells.' },
                { text: 'NK cells produce antibodies', outcome: 'Not quite — Students believe "stress directly kills immune cells" like a toxin.', reveals: 'stress-directly-kills-immune-cells' },
                { text: 'NK cells are a type of T cell', outcome: 'Not quite — Students believe "stress directly kills immune cells" like a toxin.', reveals: 'stress-directly-kills-immune-cells' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Two interns get the same Friday deadline. One reads it as \'a challenge — I\'ve got the tools and the mentor on call\'; the other reads it as \'a threat — I\'m drowning and nobody will help.\' Same brief, opposite stress.',
            decisions: [{ prompt: 'What does Lazarus\'s appraisal theory say differs?', options: [
                { text: 'Both appraisals — the first appraised challenge (primary) plus sufficient coping resources (secondary), producing manageable eustress; the second appraised threat plus insufficient resources, producing distress; the event was identical — the interpretation is what differed.', outcome: 'The chapter\'s thesis: stress lives in the appraisal, not the event — which is why changing perceived resources changes the stress even when the deadline doesn\'t move.' },
                { text: 'Only their personalities differ — the deadline objectively is stressful.', outcome: 'That relocates stress into the person or the event, exactly what appraisal theory rules out — the model is transactional: the same event produces different stress through different evaluations of it.', reveals: 'stress-is-in-the-event' },
                { text: 'The second intern is simply realistic — recognizing a threat is accuracy, not appraisal.', outcome: 'Both are appraising — \'realistic\' is itself a judgment of harm and of resources; calling one reading objective hides the secondary appraisal that made it feel unmanageable.', reveals: 'my-appraisal-is-reality' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now locate stress where it actually lives — in the appraisal loop between a demand and your sense of coping.',
            decisions: [{ prompt: 'What comes next? Meeting Life Challenges · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Meeting Life Challenges · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_03_001', difficulty: 'standard',
          question: 'Stress is a dynamic, transactional process in which an individual perceives and.',
          hint: 'Revisit the "transactional model" paragraph on NCERT page 53 and practice writing.',
          misconception: 'Students consistently write: "Stress is caused by exams / parents / traffic" (i.e., stress = stressor).',
          parts: [
                { id: 'a', prompt: 'A student says: "Eustress is good stress and distress is bad stress, so we should try to eliminate all distress and only have eustress." Using the concept.', answer: 'Correct answer: The statement is flawed',
                  options: ['Correct answer: The statement is flawed', 'good/bad', 'Stressors are the stress we feel', 'Stressors are events'],
                  hint: 'Revisit the "transactional model" paragraph on NCERT page 53 and practice writing primary/secondary.',
                  misconception: 'Students consistently write: "Stress is caused by exams / parents / traffic" (i.e., stress = stressor).' },
                { id: 'b', prompt: 'Rahul, a 17-year-old, hears a loud explosion nearby (stressor). His heart pounds, breathing quickens, and he freezes momentarily (strain).', answer: 'Correct analysis: The explosion is the external stressor',
                  options: ['Correct analysis: The explosion is the external stressor', 'the explosion caused the stress', 'the stress ended when he knew it was safe', 'Stressors are the stress we feel'],
                  hint: 'Revisit the "transactional model" paragraph on NCERT page 53 and practice writing primary/secondary.',
                  misconception: 'Students consistently write: "Stress is caused by exams / parents / traffic" (i.e., stress = stressor).' }
          ],
            remediations: { 'students-consistently-write-stress-is': { steps: ['Have the student re-read the NCERT paragraph starting "Stress is not a factor that resides in the individual or the.', 'Ask them to draw Figure 3.1 from memory — Stressors → [Appraisal Process] → Strain — and label the appraisal box with.', 'Give them three micro-scenarios (e.g., "Phone battery at 5%," "Friend cancels plan," "Teacher praises you") and ask.', 'Debrief by highlighting that the *event* didn\'t change — only the appraisal did.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently write: "Stress is caused by exams / parents / traffic" (i.e., stress = stressor).',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Stress resides in the individual (personality) or the environment (events), so measuring either one tells us the stress level." Use.', answer: 'Correct critique: The statement is false',
                  options: ['Correct critique: The statement is false', 'personality traits', 'event severity', 'Stressors are the stress we feel'],
                  hint: 'Revisit the "transactional model" paragraph on NCERT page 53 and practice writing primary/secondary.',
                  misconception: 'Students consistently write: "Stress is caused by exams / parents / traffic" (i.e., stress = stressor).' }
          ],
            remediations: { 'students-consistently-write-stress-is': { steps: ['Have the student re-read the NCERT paragraph starting "Stress is not a factor that resides in the individual or the.', 'Ask them to draw Figure 3.1 from memory — Stressors → [Appraisal Process] → Strain — and label the appraisal box with.', 'Give them three micro-scenarios (e.g., "Phone battery at 5%," "Friend cancels plan," "Teacher praises you") and ask.', 'Debrief by highlighting that the *event* didn\'t change — only the appraisal did.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_03_002', difficulty: 'standard',
          question: 'Lazarus Cognitive Appraisal Theory proposes that stress arises from a two-stage.',
          hint: 'Revisit c12_psy_cbse_03_001 (Nature of Stress) and c11_psy_cbse_08_007 (Cognitive Bases.',
          misconception: 'Students often believe that primary appraisal and secondary appraisal occur strictly sequentially and only once.',
          parts: [
                { id: 'a', prompt: 'Priya is about to give a speech. She thinks, “Everyone will judge me — I’ll embarrass myself” (primary appraisal).', answer: 'Priya’s primary appraisal is *threat* (negative, future-oriented harm)',
                  options: ['Priya’s primary appraisal is *threat* (negative, future-oriented harm)', 'high distress because of threat'],
                  hint: 'Revisit c12_psy_cbse_03_001 (Nature of Stress) and c11_psy_cbse_08_007 (Cognitive Bases of Emotion).',
                  misconception: 'Students often believe that primary appraisal and secondary appraisal occur strictly sequentially and only once.' }
          ],
            remediations: { 'primary-appraisal-and-secondary-appraisal': { steps: ['If a student conflates primary/secondary appraisal or treats them as fixed: 1.', 'Have them re-read the NCERT paragraph on “These appraisals are very subjective…” (page 53-54).', 'Use a three-column table: Event | Primary Appraisal (Harm/Threat/Challenge) | Secondary Appraisal (Resources).', 'Fill it for a single event at three time points (Day 1, Day 3, Day 7).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_03_003', difficulty: 'standard',
          question: 'Stress types categorize the origin of demands that disrupt homeostasis.',
          hint: 'Revisit c12_psy_cbse_03_001\'s Figure 3.1 (Psychological Meaning of Stress) and.',
          misconception: 'Students believe each stressful situation belongs to ONLY ONE stress type (e.g., "exams are psychological stress") and.',
          parts: [
                { id: 'a', prompt: 'A student says, "The stress I feel before my NEET exam is purely psychological because it\'s all in my mind." Using NCERT classification, is this statement.', answer: 'No, the statement is incorrect',
                  options: ['No, the statement is incorrect', 'exams are psychological stress', 'exams are life events', 'each stressful situation belongs to ONLY ONE stress type (e'],
                  hint: 'Revisit c12_psy_cbse_03_001\'s Figure 3.1 (Psychological Meaning of Stress) and.',
                  misconception: 'Students believe each stressful situation belongs to ONLY ONE stress type (e.g., "exams are psychological stress") and ONLY ONE source.' },
                { id: 'b', prompt: 'Classify each of the following into the correct stress TYPE (physical/environmental, psychological, social) and SOURCE (life event, hassle, traumatic event).', answer: '(a) Type: Social (interpersonal/family rupture)',
                  options: ['(a) Type: Social (interpersonal/family rupture)', 'exams are psychological stress', 'exams are life events', 'each stressful situation belongs to ONLY ONE stress type (e'],
                  hint: 'Revisit c12_psy_cbse_03_001\'s Figure 3.1 (Psychological Meaning of Stress) and.',
                  misconception: 'Students believe each stressful situation belongs to ONLY ONE stress type (e.g., "exams are psychological stress") and ONLY ONE source.' },
                { id: 'c', prompt: 'Riya, a Class 12 student, experiences: (i) chronic asthma worsened by Delhi\'s air pollution, (ii) intrusive thoughts "I\'m not smart enough for JEE", (iii) her.', answer: '(i) Physical/environmental (pollution → bodily strain)',
                  options: ['(i) Physical/environmental (pollution → bodily strain)', 'exams are psychological stress', 'exams are life events', 'each stressful situation belongs to ONLY ONE stress type (e'],
                  hint: 'Revisit c12_psy_cbse_03_001\'s Figure 3.1 (Psychological Meaning of Stress) and.',
                  misconception: 'Students believe each stressful situation belongs to ONLY ONE stress type (e.g., "exams are psychological stress") and ONLY ONE source.' }
          ],
            remediations: { 'each-stressful-situation-belongs-to': { steps: ['Have the student pick ONE recent stressful experience (e.g., last week\'s mock test).', 'Draw a three-column table labeled Physical/Environmental, Psychological, Social.', 'List every demand they noticed under the correct column — prompt with "What did your body feel? What thoughts ran?', 'Then classify the overall situation as life event/hassle/traumatic using the definitions: discrete major change vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_03_004', difficulty: 'standard',
          question: 'Stress effects on psychological functioning refer to the four interconnected.',
          hint: 'Revisit c12_psy_cbse_03_002 and practice classifying 5 vignettes into primary appraisal.',
          misconception: 'Students often treat the four domains as independent "lists to memorise" rather than as simultaneous, interacting.',
          parts: [
                { id: 'a', prompt: 'A 17-year-old faces chronic parental conflict. Over six months, she develops: (a) frequent headaches and stomach aches, (b) difficulty concentrating in class.', answer: 'frequent headaches and stomach aches, (',
                  options: ['frequent headaches and stomach aches, (', 'simultaneous multi-system activation', 'explain the effects of stress'],
                  hint: 'Revisit c12_psy_cbse_03_002 and practice classifying 5 vignettes into primary appraisal.',
                  misconception: 'Students often treat the four domains as independent "lists to memorise" rather than as simultaneous, interacting systems.' },
                { id: 'b', prompt: 'Compare the physiological effects of ACUTE stress (e.g., sudden loud noise) vs.', answer: 'Acute stress: Sympathetic-adrenal-medullary (SAM) axis → rapid catecholamine',
                  options: ['Acute stress: Sympathetic-adrenal-medullary (SAM) axis → rapid catecholamine', 'chronic stress uses SAM axis', 'swaps the axes (e'],
                  hint: 'Revisit c12_psy_cbse_03_002 and practice classifying 5 vignettes into primary appraisal.',
                  misconception: 'Students often treat the four domains as independent "lists to memorise" rather than as simultaneous, interacting systems.' }
          ],
            remediations: { 'students-often-treat-the-four': { steps: ['Re-read the "Effects of Stress on Psychological Functioning and Health" section in NCERT (pp.', 'Take the Raj case study (p. 51) and label EVERY sentence with its domain(s) — note sentences that span two domains.', 'Write one 150-word paragraph explaining how chronic stress creates a "vicious cycle" across all four domains, using the.', 'Re-attempt Diagnostic Questions 3 and 4. If still stuck, revisit c12_psy_cbse_03_002 (Lazarus appraisal) to see how.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_03_005', difficulty: 'standard',
          question: 'General Adaptation Syndrome (GAS) is Hans Selye\'s three-stage physiological.',
          hint: 'If unable to draw HPA/SAM pathways from memory, revisit c11_bio_cbse_19_004 (adrenal.',
          misconception: '**Misconception:** "The Resistance stage means the body has successfully adapted and the stress is \'managed\' — so it\'s.',
          parts: [
                { id: 'a', prompt: 'A student writes: "In the Resistance stage of GAS, the body returns to normal functioning because it has adapted to the stressor." Is this statement correct?', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'back to normal'],
                  hint: 'If unable to draw HPA/SAM pathways from memory, revisit c11_bio_cbse_19_004 (adrenal.',
                  misconception: '**Misconception:** "The Resistance stage means the body has successfully adapted and the stress is \'managed\' — so it\'s a good/healthy.' },
                { id: 'b', prompt: 'Rahul has been caring for his bedridden father for 14 months. He reports: "I don\'t feel panicked anymore like I did in the first month.', answer: 'Rahul is in the **Resistance stage**',
                  options: ['Rahul is in the **Resistance stage**', 'Alarm stage because he\'s still stressed'],
                  hint: 'If unable to draw HPA/SAM pathways from memory, revisit c11_bio_cbse_19_004 (adrenal.',
                  misconception: '**Misconception:** "The Resistance stage means the body has successfully adapted and the stress is \'managed\' — so it\'s a good/healthy.' }
          ],
            remediations: { 'misconception-the-resistance-stage-means': { steps: ['**Revisit c12_psy_cbse_03_001 (Nature of Stress)** — re-read the "Stress is like electricity" analogy.', 'Identify where "Resistance" maps on the curve: *high voltage sustained*, not *voltage returning to safe level*.', '**Revisit c10_bio_cbse_02_010 (Adrenal Gland: Adrenaline and Fight-or-Flight)** — trace the HPA axis: hypothalamus →.', 'Label: "Alarm = SAM spike (seconds); Resistance = HPA sustained (days-weeks); Exhaustion = adrenal cortex hypertrophy.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_03_006', difficulty: 'standard',
          question: 'Psychoneuroimmunology (PNI) is the interdisciplinary field studying the.',
          hint: 'Revisit c12_psy_cbse_03_002 (Lazarus Cognitive Appraisal Theory) and practice classifying.',
          misconception: 'Students believe "stress directly kills immune cells" like a toxin.',
          parts: [
                { id: 'a', prompt: 'What are the three main types of white blood cells (leucocytes) mentioned in the NCERT textbook that constitute the immune system\'s cellular defence, and what.', answer: 'The three main types are T cells, B cells, and natural killer (NK) cells',
                  options: ['The three main types are T cells, B cells, and natural killer (NK) cells', 'NK cells produce antibodies', 'NK cells are a type of T cell', 'stress directly kills immune cells'],
                  hint: 'Revisit c12_psy_cbse_03_002 (Lazarus Cognitive Appraisal Theory) and practice classifying.',
                  misconception: 'Students believe "stress directly kills immune cells" like a toxin.' },
                { id: 'b', prompt: 'A student argues: "Stress cannot weaken the immune system because stress releases adrenaline, and adrenaline prepares the body for fight-or-flight, which.', answer: 'The student confuses acute fight-or-flight (sympathetic-adrenal-medullary axis,',
                  options: ['The student confuses acute fight-or-flight (sympathetic-adrenal-medullary axis,', 'stress directly kills immune cells', '"stress directly kills immune cells" like a toxin'],
                  hint: 'Revisit c12_psy_cbse_03_002 (Lazarus Cognitive Appraisal Theory) and practice classifying.',
                  misconception: 'Students believe "stress directly kills immune cells" like a toxin.' }
          ],
            remediations: { 'stress-directly-kills-immune-cells': { steps: ['Have them re-read the textbook lines: "Stress can affect natural killer cell cytotoxicity...', 'Use an analogy: NK cells are like security guards; stress doesn\'t fire them (reduce numbers), it handcuffs them.', 'Assign a 3-sentence rewrite: "Chronic stress elevates cortisol → cortisol binds glucocorticoid receptors on NK cells →.', 'Re-test with Diagnostic Question 3 — require the hormonal pathway and functional outcome, not cell depletion.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
