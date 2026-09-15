import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch07_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch07_p2: SimDef = {
    id: 'v3_c12_soc_ch07_p2',
    title: 'Suggestions for Project Work · Part 2/2',
    subtitle: 'You can\'t learn to swim from a manual',
    classLevel: 12, subject: 'sociology', topic: 'Suggestions for Project Work · Part 2/2',
    chapters: ['c12_soc_ch07'],
    nodeIds: ['c12_soc_cbse_07_007', 'c12_soc_cbse_07_008', 'c12_soc_cbse_07_009', 'c12_soc_cbse_07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Student researcher', intro: 'The gap between the textbook and the neighbourhood is where sociology actually happens.', goal: 'Explain the rationale for project work and how research questions determine method selection.' },
    discovery: {
        question: 'You\'ve read a full chapter on how households divide labour by gender — now you\'re told to actually investigate three real households. Why does the textbook insist the fieldwork matters more than the findings?',
        options: ['Because doing research teaches what reading can\'t — formulating a question, picking a fitting method, and surviving non-response, access problems and ethical mess', 'Because your findings might get published', 'Because fieldwork is cheaper than teaching theory', 'Because surveys always beat textbooks'],
        answer: 'Because doing research teaches what reading can\'t — formulating a question, picking a fitting method, and surviving non-response, access problems and ethical mess',
        hook: 'Project work isn\'t \'collect data and count it\' — a polished questionnaire you can\'t justify is data collection, not research. The question chooses the method: meanings need interviews, behaviours need observation, patterns need surveys.',
    },
    teaching: [
        { title: 'Analysing and Interpreting Data: Qualitative and Quantitative Methods', text: 'Qualitative data analysis in sociology involves systematic interpretation of non-numerical data (interview transcripts, field notes, documents) to identify patterns, themes, and meanings through.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Take one broad topic, sharpen it into a researchable question, and defend a single method against the two criteria that actually decide it — technical fit and practical feasibility.',
        labels: ['Analysing and Interpreting Data', 'Writing the Project Report', 'Ethical Considerations in Sociological', 'Suggested Themes for Project'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_07_007', title: 'Analysing and Interpreting Data: Qualitative and Quantitative Methods',
          caseStudy: { intro: 'Imagine you have just finished fieldwork for your project on "Public Transport in My City" — you have 50 completed survey questionnaires (quantitative) and 8.',
            decisions: [{ prompt: 'Define the core difference between qualitative and quantitative data analysis in sociological research, giving one example of a technique.', options: [
                { text: 'Correct answer: Qualitative analysis interprets non-numerical data (text, audio, visual)', outcome: 'Correct answer: Qualitative analysis interprets non-numerical data (text, audio, visual) to uncover.' },
                { text: 'qualitative is about words, quantitative is about numbers', outcome: 'Not quite — Students believe "analyzing data" means running SPSS/R for quantitative and highlighting quotes for.', reveals: 'analyzing-data-means-running-spss' },
                { text: 'analyzing data', outcome: 'Not quite — Students believe "analyzing data" means running SPSS/R for quantitative and highlighting quotes for.', reveals: 'analyzing-data-means-running-spss' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_07_008', title: 'Writing the Project Report: Structure, Citation and Presentation',
          caseStudy: { intro: 'Imagine you have spent weeks conducting interviews about "Changing Aspirations of School Children" (a suggested NCERT topic), transcribed 20 hours.',
            decisions: [{ prompt: 'What are the mandatory sections of a CBSE Class 12 sociology project report in the correct sequential order?', options: [
                { text: 'The mandatory sections in order are: Title Page, Declaration, Acknowledgements, Table of', outcome: 'The mandatory sections in order are: Title Page, Declaration, Acknowledgements, Table of Contents.' },
                { text: 'writing up what I did', outcome: 'Not quite — Students believe the project report is just "writing up what I did" — a chronological diary.', reveals: 'the-project-report-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_07_009', title: 'Ethical Considerations in Sociological Research: Consent, Confidentiality and Sensitivity',
          caseStudy: { intro: 'Imagine you want to study how Class 12 students in your school experience exam stress. You plan to distribute a questionnaire and conduct a few interviews.',
            decisions: [{ prompt: 'What are the three core ethical pillars in sociological research as per the Class 12 NCERT framework?', options: [
                { text: 'The three core ethical pillars are informed consent, confidentiality, and sensitivity', outcome: 'The three core ethical pillars are informed consent, confidentiality, and sensitivity.' },
                { text: 'objectivity, reliability, validity', outcome: 'Not quite — Students often believe that ethics only applies to "sensitive" topics (e.g., violence, sexuality).', reveals: 'ethics-only-applies-to-sensitive' },
                { text: 'sensitive', outcome: 'Not quite — Students often believe that ethics only applies to "sensitive" topics (e.g., violence, sexuality).', reveals: 'ethics-only-applies-to-sensitive' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student\'s project proposal wants to study the unwritten seating rules of the school canteen — who sits where and why — using a 200-person questionnaire: \'big sample, scientifically solid.\'',
            decisions: [{ prompt: 'Is the survey the right method for this question?', options: [
                { text: 'No — the phenomenon is implicit norms people may not even notice they follow; observation records actual behaviour without relying on respondents\' self-report; a questionnaire asks them to articulate rules that are unwritten precisely because they\'re never spoken.', outcome: 'The chapter\'s matching logic: method follows the nature of the phenomenon, not the size of the sample — implicit practice calls for watching, not asking.' },
                { text: 'Yes — more respondents always means better data, whatever the topic.', outcome: 'Breadth doesn\'t fix blindness — 200 answers about rules respondents can\'t perceive are 200 guesses; the strength of a survey is standardised opinions, and this question has none to standardise.', reveals: 'bigger-sample-always-wins' },
                { text: 'Use interviews instead — deep conversation will surface the unwritten rules.', outcome: 'Interviews still depend on respondents verbalising what they may never have consciously registered — the method-fit issue is awareness, not depth; watching behaviour bypasses the reporting problem entirely.', reveals: 'asking-reveals-implicit' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_07_010', title: 'You made it',
          caseStudy: { intro: 'You can now explain why \'surveys reach more people\' is not an argument — the right method is the one your question demands and your field allows.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_07_007', difficulty: 'standard',
          question: 'Qualitative data analysis in sociology involves systematic interpretation.',
          hint: 'Revisit **c11_soc_cbse_05_005** (Quantitative vs Qualitative Research Methods) to recall.',
          misconception: 'Students believe "analyzing data" means running SPSS/R for quantitative and highlighting quotes for qualitative.',
          parts: [
                { id: 'a', prompt: 'You have survey data from 60 students: "Mode of Transport to School" (Walk, Cycle, Bus, Auto, Car) and "Gender" (Boy, Girl).', answer: 'Correct answer: Chi-square test of independence',
                  options: ['Correct answer: Chi-square test of independence', 'analyzing data'],
                  hint: 'Revisit **c11_soc_cbse_05_005** (Quantitative vs Qualitative Research Methods) to recall how the.',
                  misconception: 'Students believe "analyzing data" means running SPSS/R for quantitative and highlighting quotes for qualitative.' }
          ],
            remediations: { 'analyzing-data-means-running-spss': { steps: ['If a student cannot distinguish analytical steps: (1) Revisit **c12_soc_cbse_07_005** (Designing Tools) — the *type.', '(2) Revisit **c11_soc_cbse_05_005** (Quantitative vs Qualitative Research Methods) — review the epistemological.', '(3) Do a micro-exercise: Take 3 interview paragraphs → do open coding on paper → group codes → name one theme.', 'Take 10 survey rows → make a 2×2 table by hand → calculate expected frequencies.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "analyzing data" means running SPSS/R for quantitative and highlighting quotes for qualitative.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "In a mixed-methods project, you should always collect quantitative and qualitative data simultaneously, analyze them separately, and only.', answer: 'Correct answer: Critique',
                  options: ['Correct answer: Critique', 'methodology fetish', 'analyzing data'],
                  hint: 'Revisit **c11_soc_cbse_05_005** (Quantitative vs Qualitative Research Methods) to recall how the.',
                  misconception: 'Students believe "analyzing data" means running SPSS/R for quantitative and highlighting quotes for qualitative.' }
          ],
            remediations: { 'analyzing-data-means-running-spss': { steps: ['If a student cannot distinguish analytical steps: (1) Revisit **c12_soc_cbse_07_005** (Designing Tools) — the *type.', '(2) Revisit **c11_soc_cbse_05_005** (Quantitative vs Qualitative Research Methods) — review the epistemological.', '(3) Do a micro-exercise: Take 3 interview paragraphs → do open coding on paper → group codes → name one theme.', 'Take 10 survey rows → make a 2×2 table by hand → calculate expected frequencies.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_07_008', difficulty: 'standard',
          question: 'Writing the project report is the final stage of sociological research where.',
          hint: 'If stuck on structure, revisit c12_soc_cbse_07_007 (Analysing and Interpreting Data).',
          misconception: 'Students believe the project report is just "writing up what I did" — a chronological diary of fieldwork activities.',
          parts: [
                { id: 'a', prompt: 'A student writes in their project report: "Many studies show that social media affects mental health (Smith, 2020; Gupta, 2019; Sharma, 2021)." They include.', answer: 'This is partially correct but incomplete for APA 7th edition',
                  options: ['This is partially correct but incomplete for APA 7th edition', 'include the names', 'writing up what I did'],
                  hint: 'If stuck on structure, revisit c12_soc_cbse_07_007 (Analysing and Interpreting Data) to ensure.',
                  misconception: 'Students believe the project report is just "writing up what I did" — a chronological diary of fieldwork activities.' }
          ],
            remediations: { 'the-project-report-is-just': { steps: ['If a student submits a diary-style report: (1) Have them highlight every paragraph that states a finding vs.', 'every paragraph that describes an action — they will see 90% are actions.', '(2) Give them a model report (from CBSE sample papers) and ask them to map each paragraph to a section function (e.g.', '(3) Assign a 300-word rewrite of just the Analysis section using three sociological concepts from Class 11/12 (e.g.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_07_009', difficulty: 'standard',
          question: 'Ethical considerations in sociological research refer to the moral principles.',
          hint: 'Revisit c11_soc_cbse_05_002 (Objectivity and Subjectivity) and c11_psy_cbse_02_011.',
          misconception: 'Students often believe that ethics only applies to "sensitive" topics (e.g., violence, sexuality) and that routine.',
          parts: [
                { id: 'a', prompt: 'Explain why "implied consent" (e.g., assuming a returned questionnaire means consent) is insufficient for sociological research involving human participants.', answer: 'Implied consent fails',
                  options: ['Implied consent fails', 'it saves time', 'sensitive', 'harmless'],
                  hint: 'Revisit c11_soc_cbse_05_002 (Objectivity and Subjectivity) and c11_psy_cbse_02_011 (Ethical Issues.',
                  misconception: 'Students often believe that ethics only applies to "sensitive" topics (e.g., violence, sexuality) and that routine surveys on "harmless".' },
                { id: 'b', prompt: 'Compare the ethical challenges of using a survey versus in-depth interviews when researching domestic violence among women in a low-income neighbourhood.', answer: 'In-depth interviews pose greater confidentiality risks',
                  options: ['In-depth interviews pose greater confidentiality risks', 'sensitive', 'harmless', 'ethics only applies to "sensitive" topics (e'],
                  hint: 'Revisit c11_soc_cbse_05_002 (Objectivity and Subjectivity) and c11_psy_cbse_02_011 (Ethical Issues.',
                  misconception: 'Students often believe that ethics only applies to "sensitive" topics (e.g., violence, sexuality) and that routine surveys on "harmless".' }
          ],
            remediations: { 'ethics-only-applies-to-sensitive': { steps: ['If a student holds this misconception: (1) Assign them to re-read the "Rapport Building, Ethics" section in sibling.', '(2) Have them draft a consent form for a "harmless" topic (e.g., "favourite TV shows") and identify three pieces.', '(3) Conduct a peer review where another student plays a participant who feels uncomfortable — the researcher must.', '(4) Re-diagnose with DIAGNOSTIC_QUESTION_2 to check if they now articulate why implied consent fails even for low-risk.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_07_010', difficulty: 'standard',
          question: 'This node covers the five core sociological themes suggested by NCERT for Class.',
          hint: 'Revisit c12_soc_cbse_07_003 (Formulating a Research Question) and c11_soc_cbse_05_005.',
          misconception: 'Students treat the five NCERT themes as fixed \'topics\' to be \'covered\' like textbook chapters — e.g., "I\'ll do.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This node covers the five core sociological themes suggested by NCERT for Class 12',
                  options: ['This node covers the five core sociological themes suggested by NCERT for Class 12', 'Project work in sociology is a pedagogical approach where students systematically', 'A sociological project type refers to the specific research method chosen to', 'A research question is a clear, focused, and answerable query that narrows a broad topic'],
                  hint: 'Revisit c12_soc_cbse_07_003 (Formulating a Research Question) and c11_soc_cbse_05_005 (Quantitative.',
                  misconception: 'Students treat the five NCERT themes as fixed \'topics\' to be \'covered\' like textbook chapters — e.g., "I\'ll do my project on Gender".' }
          ],
            remediations: { 'students-treat-the-five-ncert': { steps: ['Have the student pick ONE theme and write three *bad* titles (too broad, vague, unanswerable).', 'Together, convert each into a *good* question using the NCERT guiding questions for that theme (e.g., for Market: "What.', 'For each good question, list: (a) one observable behaviour, (b) one interviewable experience, (c) one archival trace.', 'Student selects the question with the most feasible (a)+(b)+(c) mix and drafts a 1-page plan.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
