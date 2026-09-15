import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch07_p1: SimDef = {
    id: 'v3_c12_soc_ch07_p1',
    title: 'Suggestions for Project Work · Part 1/2',
    subtitle: 'You can\'t learn to swim from a manual',
    classLevel: 12, subject: 'sociology', topic: 'Suggestions for Project Work · Part 1/2',
    chapters: ['c12_soc_ch07'],
    nodeIds: ['c12_soc_cbse_07_001', 'c12_soc_cbse_07_002', 'c12_soc_cbse_07_003', 'c12_soc_cbse_07_004', 'c12_soc_cbse_07_005', 'c12_soc_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Student researcher', intro: 'The gap between the textbook and the neighbourhood is where sociology actually happens.', goal: 'Explain the rationale for project work and how research questions determine method selection.' },
    discovery: {
        question: 'You\'ve read a full chapter on how households divide labour by gender — now you\'re told to actually investigate three real households. Why does the textbook insist the fieldwork matters more than the findings?',
        options: ['Because doing research teaches what reading can\'t — formulating a question, picking a fitting method, and surviving non-response, access problems and ethical mess', 'Because your findings might get published', 'Because fieldwork is cheaper than teaching theory', 'Because surveys always beat textbooks'],
        answer: 'Because doing research teaches what reading can\'t — formulating a question, picking a fitting method, and surviving non-response, access problems and ethical mess',
        hook: 'Project work isn\'t \'collect data and count it\' — a polished questionnaire you can\'t justify is data collection, not research. The question chooses the method: meanings need interviews, behaviours need observation, patterns need surveys.',
    },
    teaching: [
        { title: 'The Rationale for Project Work in Sociology: Learning Beyond the Textbook', text: 'Project work in sociology is a pedagogical approach where students systematically investigate a social phenomenon using appropriate research methods to move beyond textbook knowledge and experience.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Take one broad topic, sharpen it into a researchable question, and defend a single method against the two criteria that actually decide it — technical fit and practical feasibility.',
        labels: ['The Rationale for Project', 'Types of Sociological Projects', 'Formulating a Research Question', 'Selecting a Sample', 'Designing Tools of Data', 'Conducting Fieldwork: Rapport Building,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_07_001', title: 'The Rationale for Project Work in Sociology: Learning Beyond the Textbook',
          caseStudy: { intro: 'Imagine you have read about "gender division of labour in households" in your textbook. You know the definitions and theories.',
            decisions: [{ prompt: 'What is the fundamental difference between "reading about research" and "doing research" as highlighted in the NCERT rationale for project.', options: [
                { text: 'Reading about research provides second-hand knowledge of findings and methods; doing', outcome: 'Reading about research provides second-hand knowledge of findings and methods; doing research gives.' },
                { text: 'one is theory, the other is practical', outcome: 'Not quite — Students believe project work means "collecting data" — they equate research with distributing.', reveals: 'project-work-means-collecting-data' },
                { text: 'collecting data', outcome: 'Not quite — Students believe project work means "collecting data" — they equate research with distributing.', reveals: 'project-work-means-collecting-data' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_07_002', title: 'Types of Sociological Projects: Survey, Observation, Interview and Case Study',
          caseStudy: { intro: 'Imagine you want to study how students in your school feel about the new cafeteria menu.',
            decisions: [{ prompt: 'What is the defining characteristic of the survey method that distinguishes it from the interview method?', options: [
                { text: 'The survey method uses a fixed set of standardized questions administered to a relatively', outcome: 'The survey method uses a fixed set of standardized questions administered to a relatively large.' },
                { text: 'surveys are always written and interviews are always oral', outcome: 'Not quite — Students often believe that the survey method is "more scientific" or "better" than observation.', reveals: 'the-survey-method-is-more' },
                { text: 'more scientific', outcome: 'Not quite — Students often believe that the survey method is "more scientific" or "better" than observation.', reveals: 'the-survey-method-is-more' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_07_003', title: 'Formulating a Research Question and Hypothesis for Project Work',
          caseStudy: { intro: 'Imagine you are standing at a busy Delhi Metro station during rush hour, noticing that women commuters seem to board the women-only coach faster than men board.',
            decisions: [{ prompt: 'Define \'research question\' and \'hypothesis\' in the context of a Class 12 sociology project. How are they different from a broad topic?', options: [
                { text: 'A research question is a specific, focused, and empirically answerable query derived from', outcome: 'A research question is a specific, focused, and empirically answerable query derived from a broad.' },
                { text: 'I will study public transport', outcome: 'Not quite — Students often believe a research question is just a rephrased topic (e.g., "My topic is public.', reveals: 'a-research-question-is-just' },
                { text: 'Public transport is good for society', outcome: 'Not quite — Students often believe a research question is just a rephrased topic (e.g., "My topic is public.', reveals: 'a-research-question-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_07_004', title: 'Selecting a Sample and the Method of Sampling for Fieldwork',
          caseStudy: { intro: 'Imagine you want to study "How do daily-wage construction workers in your city perceive the new labour codes?" You cannot interview every worker — that\'s your.',
            decisions: [{ prompt: 'A student defines the \'population\' for a study on "middle-class women\'s attitudes towards remote work" as "all women in India." What is the.', options: [
                { text: 'The population must be specific to the research question: "middle-class women" (not all', outcome: 'The population must be specific to the research question: "middle-class women" (not all women) and.' },
                { text: 'larger sample size always means better research', outcome: 'Not quite — Students often believe "larger sample size always means better research." They write: "I will.', reveals: 'larger-sample-size-always-means' },
                { text: 'I will survey 500 people instead of 100 to make my project more scientific', outcome: 'Not quite — Students often believe "larger sample size always means better research." They write: "I will.', reveals: 'larger-sample-size-always-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_07_005', title: 'Designing Tools of Data Collection: Questionnaire, Interview Schedule and Observation Guide',
          caseStudy: { intro: 'Imagine you want to study how Class 12 students in your school use Instagram Reels for academic help versus entertainment.',
            decisions: [{ prompt: 'What is the fundamental difference between a questionnaire and an interview schedule in terms of administration and researcher presence?', options: [
                { text: 'A questionnaire is self-administered by the respondent (written or online) without the', outcome: 'A questionnaire is self-administered by the respondent (written or online) without the researcher.' },
                { text: 'both are the same', outcome: 'Not quite — Students think "designing a tool" means writing questions they find interesting, not.', reveals: 'designing-a-tool-means-writing' },
                { text: 'questionnaire is always longer', outcome: 'Not quite — Students think "designing a tool" means writing questions they find interesting, not.', reveals: 'designing-a-tool-means-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_07_006', title: 'Conducting Fieldwork: Rapport Building, Ethics and the Insider-Outsider Problem',
          caseStudy: { intro: 'Imagine you are a Class 12 student planning to study "Changing gender roles in domestic work in middle-class households in your neighbourhood." You have your.',
            decisions: [{ prompt: 'Define \'rapport\' in the context of sociological fieldwork and explain why it is considered a prerequisite for valid qualitative data rather.', options: [
                { text: 'Rapport is a relationship of mutual trust, respect, and understanding established between', outcome: 'Rapport is a relationship of mutual trust, respect, and understanding established between the.' },
                { text: 'rapport is just being polite', outcome: 'Not quite — Students believe that \'being ethical\' means simply getting a consent form signed, and that.', reveals: 'being-ethical-means-simply-getting' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student\'s project proposal wants to study the unwritten seating rules of the school canteen — who sits where and why — using a 200-person questionnaire: \'big sample, scientifically solid.\'',
            decisions: [{ prompt: 'Is the survey the right method for this question?', options: [
                { text: 'No — the phenomenon is implicit norms people may not even notice they follow; observation records actual behaviour without relying on respondents\' self-report; a questionnaire asks them to articulate rules that are unwritten precisely because they\'re never spoken.', outcome: 'The chapter\'s matching logic: method follows the nature of the phenomenon, not the size of the sample — implicit practice calls for watching, not asking.' },
                { text: 'Yes — more respondents always means better data, whatever the topic.', outcome: 'Breadth doesn\'t fix blindness — 200 answers about rules respondents can\'t perceive are 200 guesses; the strength of a survey is standardised opinions, and this question has none to standardise.', reveals: 'bigger-sample-always-wins' },
                { text: 'Use interviews instead — deep conversation will surface the unwritten rules.', outcome: 'Interviews still depend on respondents verbalising what they may never have consciously registered — the method-fit issue is awareness, not depth; watching behaviour bypasses the reporting problem entirely.', reveals: 'asking-reveals-implicit' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now explain why \'surveys reach more people\' is not an argument — the right method is the one your question demands and your field allows.',
            decisions: [{ prompt: 'What comes next? Suggestions for Project Work · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Suggestions for Project Work · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_07_001', difficulty: 'standard',
          question: 'Project work in sociology is a pedagogical approach where students.',
          hint: 'Revisit c11_soc_cbse_05_005 (Quantitative vs Qualitative Research Methods) and.',
          misconception: 'Students believe project work means "collecting data" — they equate research with distributing questionnaires.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Project work in sociology is a pedagogical approach where students systematically',
                  options: ['Project work in sociology is a pedagogical approach where students systematically', 'A sociological project type refers to the specific research method chosen to', 'A research question is a clear, focused, and answerable query that narrows a broad topic', 'Sampling in sociological fieldwork is the systematic process of selecting a subset'],
                  hint: 'Revisit c11_soc_cbse_05_005 (Quantitative vs Qualitative Research Methods) and c11_soc_cbse_05_002.',
                  misconception: 'Students believe project work means "collecting data" — they equate research with distributing questionnaires or counting responses.' }
          ],
            remediations: { 'project-work-means-collecting-data': { steps: ['If a student cannot distinguish "topic" from "research question" or justify method choice beyond "it\'s easier," do this.', 'Return to Class 11 Chapter 5 nodes (c11_soc_cbse_05_001 to c11_soc_cbse_05_003) — re-read the distinction between.', 'Take the NCERT\'s "happiness in schools" example and force the student to write THREE different research questions from.', 'Have them defend each match using "technical fit" and "practical feasibility." 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe project work means "collecting data" — they equate research with distributing questionnaires.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Project work in Class 12 sociology is just a simplified version of real research, so its findings have no sociological value." Use the.', answer: 'The claim is partially true but misses the pedagogical point',
                  options: ['The claim is partially true but misses the pedagogical point', 'collecting data'],
                  hint: 'Revisit c11_soc_cbse_05_005 (Quantitative vs Qualitative Research Methods) and c11_soc_cbse_05_002.',
                  misconception: 'Students believe project work means "collecting data" — they equate research with distributing questionnaires or counting responses.' },
                { id: 'b', prompt: 'Design a micro-project idea (not from the NCERT list) that a Class 12 student could realistically complete in 3-4 weeks.', answer: 'the broad topic, (',
                  options: ['the broad topic, (', 'collecting data'],
                  hint: 'Revisit c11_soc_cbse_05_005 (Quantitative vs Qualitative Research Methods) and c11_soc_cbse_05_002.',
                  misconception: 'Students believe project work means "collecting data" — they equate research with distributing questionnaires or counting responses.' }
          ],
            remediations: { 'project-work-means-collecting-data': { steps: ['If a student cannot distinguish "topic" from "research question" or justify method choice beyond "it\'s easier," do this.', 'Return to Class 11 Chapter 5 nodes (c11_soc_cbse_05_001 to c11_soc_cbse_05_003) — re-read the distinction between.', 'Take the NCERT\'s "happiness in schools" example and force the student to write THREE different research questions from.', 'Have them defend each match using "technical fit" and "practical feasibility." 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_07_002', difficulty: 'standard',
          question: 'A sociological project type refers to the specific research method chosen.',
          hint: 'If stuck, re-read Class 11 Sociology nodes c11_soc_cbse_05_005 to c11_soc_cbse_05_009 and.',
          misconception: 'Students often believe that the survey method is "more scientific" or "better" than observation or interview because.',
          parts: [
                { id: 'a', prompt: 'You have two weeks, a budget of ₹500, and access to one nearby village.', answer: 'Method: Interview (in-depth, flexible, small sample)',
                  options: ['Method: Interview (in-depth, flexible, small sample)', 'more scientific', 'better'],
                  hint: 'If stuck, re-read Class 11 Sociology nodes c11_soc_cbse_05_005 to c11_soc_cbse_05_009 and Class 11.',
                  misconception: 'Students often believe that the survey method is "more scientific" or "better" than observation or interview because it uses numbers and.' },
                { id: 'b', prompt: 'Compare the case study method and the survey method on the dimensions of generalizability and depth of understanding.', answer: 'Case study provides high depth (rich contextual detail, process tracing) but low',
                  options: ['Case study provides high depth (rich contextual detail, process tracing) but low', 'scientific rigor', 'more scientific', 'better'],
                  hint: 'If stuck, re-read Class 11 Sociology nodes c11_soc_cbse_05_005 to c11_soc_cbse_05_009 and Class 11.',
                  misconception: 'Students often believe that the survey method is "more scientific" or "better" than observation or interview because it uses numbers and.' }
          ],
            remediations: { 'the-survey-method-is-more': { steps: ['Revisit the NCERT table on page 126 that maps research topics to suitable methods.', 'For each of the four methods, write one research question that ONLY that method can answer well (e.g., observation →.', 'Take a past board exam case-based question (e.g., CBSE 2023 Sample Paper Q12) and identify which method the researcher.', 'Discuss your answers with a peer or teacher to verify the logic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_07_003', difficulty: 'standard',
          question: 'A research question is a clear, focused, and answerable query that narrows.',
          hint: 'Revisit c11_soc_cbse_05_005 (Quantitative vs Qualitative Methods) and c11_psy_cbse_02_004.',
          misconception: 'Students often believe a research question is just a rephrased topic (e.g., "My topic is public transport, so.',
          parts: [
                { id: 'a', prompt: 'A student wants to study "Changing aspirations of school children." They write the research question: "Do children\'s aspirations change as they grow older?".', answer: 'The research question is too vague',
                  options: ['The research question is too vague', 'with hypothesis', 'My topic is public transport, so my question is \'What is public transport?\'', 'I think public transport is important'],
                  hint: 'Revisit c11_soc_cbse_05_005 (Quantitative vs Qualitative Methods) and c11_psy_cbse_02_004.',
                  misconception: 'Students often believe a research question is just a rephrased topic (e.g., "My topic is public transport, so my question is \'What.' },
                { id: 'b', prompt: 'Compare the following two research questions for the theme "Use of public space": A) "How do people use the park in my neighbourhood?" B) "How do elderly women.', answer: 'Question B is more productive',
                  options: ['Question B is more productive', 'My topic is public transport, so my question is \'What is public transport?\'', 'I think public transport is important', 'a research question is just a rephrased topic (e'],
                  hint: 'Revisit c11_soc_cbse_05_005 (Quantitative vs Qualitative Methods) and c11_psy_cbse_02_004.',
                  misconception: 'Students often believe a research question is just a rephrased topic (e.g., "My topic is public transport, so my question is \'What.' }
          ],
            remediations: { 'a-research-question-is-just': { steps: ['If a student cannot distinguish topic from question, give them three broad themes (e.g., "Public Transport," "Domestic.', 'Then have them identify the independent/dependent variables in the good question.', 'Next, ask them to convert the good question into a hypothesis using the template: "If [independent variable].'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_07_004', difficulty: 'standard',
          question: 'Sampling in sociological fieldwork is the systematic process of selecting.',
          hint: 'If stuck on sampling method choice, revisit c11_soc_cbse_05_008 (Class 11 Sampling.',
          misconception: 'Students often believe "larger sample size always means better research." They write: "I will survey 500 people instead.',
          parts: [
                { id: 'a', prompt: 'Compare stratified random sampling and cluster sampling for a study on "caste-based occupational segregation in a district with 500 villages." Identify one key.', answer: 'Stratified random sampling: Advantage',
                  options: ['Stratified random sampling: Advantage', 'larger sample size always means better research', 'I will survey 500 people instead of 100 to make my project more scientific', '"larger sample size always means better research'],
                  hint: 'If stuck on sampling method choice, revisit c11_soc_cbse_05_008 (Class 11 Sampling Theory) and the.',
                  misconception: 'Students often believe "larger sample size always means better research." They write: "I will survey 500 people instead of 100 to make.' }
          ],
            remediations: { 'larger-sample-size-always-means': { steps: ['If a student insists "bigger sample = better," do this: 1) Give them two datasets: Dataset A — 200 respondents via.', '2) Ask: "Which dataset would the Election Commission trust?', 'Why?" 3) Guide them to see that Dataset A has zero generalisability despite larger n, while Dataset B, though smaller.', '4) Assign re-diagnostic: "Redo Diagnostic Question 5 for your own project topic."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_07_005', difficulty: 'standard',
          question: 'Designing tools of data collection refers to the systematic process of creating.',
          hint: 'If unable to link questions to variables, revisit c12_soc_cbse_07_003 and practice.',
          misconception: 'Students think "designing a tool" means writing questions they find interesting, not operationalising variables from.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Designing tools of data collection refers to the systematic process of creating',
                  options: ['Designing tools of data collection refers to the systematic process of creating', 'Project work in sociology is a pedagogical approach where students systematically', 'A sociological project type refers to the specific research method chosen to', 'A research question is a clear, focused, and answerable query that narrows a broad topic'],
                  hint: 'If unable to link questions to variables, revisit c12_soc_cbse_07_003 and practice: Hypothesis →.',
                  misconception: 'Students think "designing a tool" means writing questions they find interesting, not operationalising variables from the research.' }
          ],
            remediations: { 'designing-a-tool-means-writing': { steps: ['Revisit node c12_soc_cbse_07_003 (Formulating Research Question and Hypothesis) — identify the independent and.', 'For each variable, write 2-3 indicators (observable/measurable manifestations).', 'Convert each indicator into a question/item with response format.', 'Pilot test with 3 peers, note confusion, revise.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_07_006', difficulty: 'standard',
          question: 'Conducting fieldwork in sociology involves the systematic immersion of the.',
          hint: 'If stuck, revisit **c11_soc_cbse_05_006** (Participant Observation) — specifically the.',
          misconception: 'Students believe that \'being ethical\' means simply getting a consent form signed, and that \'rapport\' means being.',
          parts: [
                { id: 'a', prompt: 'You are conducting fieldwork on "Experiences of migrant construction workers in a labour camp." The contractor (gatekeeper) allows you entry only if you share.', answer: 'Step 1: Refuse the condition',
                  options: ['Step 1: Refuse the condition', 'agree to share data to get access'],
                  hint: 'If stuck, revisit **c11_soc_cbse_05_006** (Participant Observation) — specifically the sections.',
                  misconception: 'Students believe that \'being ethical\' means simply getting a consent form signed, and that \'rapport\' means being friendly.' }
          ],
            remediations: { 'being-ethical-means-simply-getting': { steps: ['If a student cannot distinguish procedural consent from process consent, or treats rapport as friendliness: 1.', 'Revisit **c11_soc_cbse_05_003** (Insider and Outsider Perspectives) and **c11_soc_cbse_05_006** (Participant.', 'Read the NCERT Class 11 box on "Ethical Issues in Social Research" (Chapter 5) and the APA/ASA ethical guidelines.', 'Complete this re-diagnostic: "A researcher studying domestic workers gets consent from the employer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
