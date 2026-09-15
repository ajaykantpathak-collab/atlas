import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch05_p1: SimDef = {
    id: 'v3_c11_soc_ch05_p1',
    title: 'Doing Sociology: Research Methods · Part 1/2',
    subtitle: 'Learn that confessing your lens is more objective than denying it.',
    classLevel: 11, subject: 'sociology', topic: 'Doing Sociology: Research Methods · Part 1/2',
    chapters: ['c11_soc_ch05'],
    nodeIds: ['c11_soc_cbse_05_001', 'c11_soc_cbse_05_002', 'c11_soc_cbse_05_003', 'c11_soc_cbse_05_004', 'c11_soc_cbse_05_005', 'c11_soc_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a fieldworker auditing their own blind spots', intro: 'Where you stand decides what you see — sociology\'s answer isn\'t pretending to float, it\'s reporting the ground underfoot.', goal: 'Distinguish method from methodology and apply reflexivity as a rigour practice.' },
    discovery: {
        question: 'Complete objectivity is impossible in sociology — so all research is just the researcher\'s opinion?',
        options: ['No — objectivity is an ongoing process of documenting methods and practising self-reflexivity; impossible-to-perfect isn\'t permission to stop', 'Yes — abandon the pretence', 'Yes — every study is equal', 'No — sociologists must become machines'],
        answer: 'No — objectivity is an ongoing process of documenting methods and practising self-reflexivity; impossible-to-perfect isn\'t permission to stop',
        hook: 'Subjectivity isn\'t bias you can suppress — it\'s your caste, class and gender shaping what you notice; naming it is the method, not the failure.',
    },
    teaching: [
        { title: 'Scientific Method as the Defining Feature of Sociology: Methodology Versus Method', text: 'The scientific method in sociology refers to the systematic, documented, and reflexive procedures through which sociological knowledge is produced, distinguishing it from common sense.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Separate method from methodology, then grade a study by whether it disclosed its lens rather than whether it claimed to have none.',
        labels: ['Scientific Method as', 'Objectivity and Subjectivity', 'Insider and Outsider Perspectives', 'Sociology as a Multi-Paradigmatic', 'Quantitative Versus Qualitative Research', 'Participant Observation as'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_05_003', title: 'Insider and Outsider Perspectives and Self-Reflexivity in Research',
          caseStudy: { intro: 'Imagine you want to study why students in your school prefer certain canteen foods.',
            decisions: [{ prompt: 'Define \'self-reflexivity\' in sociological research and state one practical technique a researcher uses to practice it.', options: [
                { text: 'Self-reflexivity is the researcher\'s continuous critical examination of their own', outcome: 'Self-reflexivity is the researcher\'s continuous critical examination of their own attitudes, social.' },
                { text: 'being honest', outcome: 'Not quite — Students often believe that **being an "insider" (e.g., studying your own village, school,.', reveals: 'being-an-insider-e' },
                { text: 'admitting bias at the start', outcome: 'Not quite — Students often believe that **being an "insider" (e.g., studying your own village, school,.', reveals: 'being-an-insider-e' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_05_004', title: 'Sociology as a Multi-Paradigmatic Science: Multiple Truths and Perspectives',
          caseStudy: { intro: 'Imagine you and your friend witness the same argument between a teacher and a student.',
            decisions: [{ prompt: 'Define "multi-paradigmatic science" in the context of sociology, and name any two paradigms that coexist within the discipline.', options: [
                { text: 'A multi-paradigmatic science is one where multiple, mutually incompatible theoretical', outcome: 'A multi-paradigmatic science is one where multiple, mutually incompatible theoretical frameworks.' },
                { text: 'multi-paradigmatic', outcome: 'Not quite — Students often think "multi-paradigmatic" means sociologists just pick whatever theory they like.', reveals: 'multi-paradigmatic-means-sociologists-just' },
                { text: 'anything goes', outcome: 'Not quite — Students often think "multi-paradigmatic" means sociologists just pick whatever theory they like.', reveals: 'multi-paradigmatic-means-sociologists-just' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Peer-reviewing a fieldwork proposal, a student writes \'methodology: participant observation\' and promises \'total objectivity — I\'ll switch off my opinions and stay neutral like a physicist.\'',
            decisions: [{ prompt: 'What should the review correct?', options: [
                { text: 'Split method from methodology, and objectivity from neutrality: participant observation is the METHOD; the methodology is the ethnographic logic — long-term immersion, learning the language — that justifies it. And subjectivity isn\'t a bias you suppress: your social location (caste, class, gender) shapes which questions you ask and how you read silence — the discipline\'s answer is reflexivity, making your standpoint visible, not pretending it away.', outcome: 'The proposal strengthens: method is the technique, methodology is its justification — and rigour comes from declared positionality, not performed neutrality.' },
                { text: 'Accept \'methodology: participant observation\' — they\'re the same thing.', outcome: 'One names the tool, the other the theory of knowledge behind it: a survey and ethnography can share methods but not methodology.', reveals: 'method-equals-methodology' },
                { text: 'Praise the neutrality pledge — suppressing personal views IS objectivity.', outcome: 'You can\'t switch off socialisation: a male researcher may code \'cooking\' as \'task\' not \'care\' — reflexivity exposes the frame; denial hides it.', reveals: 'objectivity-is-suppressing-views' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'The honest researcher doesn\'t claim to be neutral — they show you where they stood, so you can judge what they saw.',
            decisions: [{ prompt: 'What comes next? Doing Sociology: Research Methods · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Doing Sociology: Research Methods · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_05_001', difficulty: 'standard',
          question: 'The scientific method in sociology refers to the systematic, documented, and.',
          hint: 'Revisit Class 9 History Chapter 1 nodes c9_hist_ch1_1 (Social Science definition) and.',
          misconception: 'Students conflate "methodology" with "method" — they think methodology is just a fancy word for the research technique.',
          parts: [
                { id: 'a', prompt: 'A researcher wants to study "how middle-class families in Delhi experience the transition to nuclear family structures." Identify whether each of the following.', answer: 'Should the researcher adopt an insider (emi',
                  options: ['Should the researcher adopt an insider (emi', 'methodological issue', 'mixes these up (e'],
                  hint: 'Revisit Class 9 History Chapter 1 nodes c9_hist_ch1_1 (Social Science definition) and.',
                  misconception: 'Students conflate "methodology" with "method" — they think methodology is just a fancy word for the research technique used.' },
                { id: 'b', prompt: 'Compare how objectivity is challenged differently for a geologist studying rock formations versus a sociologist studying caste dynamics in a village.', answer: 'The geologist is external to the natural world studied',
                  options: ['The geologist is external to the natural world studied', 'both need to be unbiased'],
                  hint: 'Revisit Class 9 History Chapter 1 nodes c9_hist_ch1_1 (Social Science definition) and.',
                  misconception: 'Students conflate "methodology" with "method" — they think methodology is just a fancy word for the research technique used.' }
          ],
            remediations: { 'students-conflate-methodology-with-method': { steps: ['Ask the student to list three specific research techniques (methods) they know.', 'For each, ask: "What assumptions about social reality does this technique *assume*?', 'Explain: "The *method* is the technique; the *methodology* is the answer to the question you just gave — the.', 'Have them re-read NCERT pp. 83-84 ("Some Methodological Issues") and underline every sentence that discusses.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_05_002', difficulty: 'standard',
          question: 'Objectivity in social research refers to the ideal of producing knowledge that.',
          hint: 'Revisit the distinction between \'common sense knowledge\' and \'sociological knowledge\'.',
          misconception: 'Students often believe that \'subjectivity\' in sociology means the researcher deliberately lets personal opinions.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Objectivity in social research refers to the ideal of producing knowledge that is',
                  options: ['Objectivity in social research refers to the ideal of producing knowledge that is', 'The scientific method in sociology refers to the systematic, documented, and reflexive', 'Insider perspective refers to understanding social phenomena from the subjective', 'Sociology as a multi-paradigmatic science means that the discipline simultaneously hosts'],
                  hint: 'Revisit the distinction between \'common sense knowledge\' and \'sociological knowledge\' in Chapter 1.',
                  misconception: 'Students often believe that \'subjectivity\' in sociology means the researcher deliberately lets personal opinions replace facts, and that.' }
          ],
            remediations: { 'subjectivity-in-sociology-means-the': { steps: ['If a student holds this misconception, do NOT simply say \'read the definition again\'.', 'Instead, conduct this 3-step remediation: (1) Give them a 2-paragraph field note excerpt from a real study (e.g.,.', '(2) Ask them to rewrite the excerpt as if the researcher were a village insider — they will immediately see how the.', '(3) Have them write their own positionality statement for a topic they care about (e.g., \'school uniforms\') and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_05_003', difficulty: 'standard',
          question: 'Insider perspective refers to understanding social phenomena from the.',
          hint: 'Re-read the "Objectivity and Subjectivity" section in NCERT (pages 83-84), focusing.',
          misconception: 'Students often believe that **being an "insider" (e.g., studying your own village, school, or caste) automatically.',
          parts: [
                { id: 'a', prompt: 'Explain why the insider perspective is indispensable in sociology, and why relying exclusively on it risks producing unscientific knowledge.', answer: 'The insider perspective is indispensable',
                  options: ['The insider perspective is indispensable', 'more true', 'unbiased', 'insider'],
                  hint: 'Re-read the "Objectivity and Subjectivity" section in NCERT (pages 83-84), focusing on the example.',
                  misconception: 'Students often believe that **being an "insider" (e.g., studying your own village, school, or caste) automatically grants superior access.' }
          ],
            remediations: { 'being-an-insider-e': { steps: ['If a student holds this misconception, conduct a **mini-Activity 1** in class: 1.', 'Ask the student to write a 3-sentence description of "why students bunk classes" from their own perspective (insider).', 'Ask them to rewrite it from the **principal\'s perspective** (outsider-with-authority).', 'Ask them to rewrite it from a **parent\'s perspective** (outsider-with-anxiety).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_05_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **being an "insider" (e.g., studying your own village, school, or caste) automatically.',
          parts: [
                { id: 'a', prompt: '"Self-reflexivity solves the problem of bias in sociological research." Critically evaluate this statement using the NCERT text\'s discussion of unconscious.', answer: 'The statement is **overstated**',
                  options: ['The statement is **overstated**', 'bias-free', 'insider', 'outsider'],
                  hint: 'Re-read the "Objectivity and Subjectivity" section in NCERT (pages 83-84), focusing on the example.',
                  misconception: 'Students often believe that **being an "insider" (e.g., studying your own village, school, or caste) automatically grants superior access.' }
          ],
            remediations: { 'being-an-insider-e': { steps: ['If a student holds this misconception, conduct a **mini-Activity 1** in class: 1.', 'Ask the student to write a 3-sentence description of "why students bunk classes" from their own perspective (insider).', 'Ask them to rewrite it from the **principal\'s perspective** (outsider-with-authority).', 'Ask them to rewrite it from a **parent\'s perspective** (outsider-with-anxiety).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_05_004', difficulty: 'standard',
          question: 'Sociology as a multi-paradigmatic science means that the discipline.',
          hint: 'Revisit the "Objectivity and Subjectivity in Social Research" node (c11_soc_cbse_05_002).',
          misconception: 'Students often think "multi-paradigmatic" means sociologists just pick whatever theory they like, or that it implies.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast how a positivist (quantitative) paradigm and an interpretivist (qualitative) paradigm would approach the study of "religious rituals in.', answer: 'Positivist: assumes social reality is external and measurable',
                  options: ['Positivist: assumes social reality is external and measurable', 'multi-paradigmatic', 'anything goes'],
                  hint: 'Revisit the "Objectivity and Subjectivity in Social Research" node (c11_soc_cbse_05_002).',
                  misconception: 'Students often think "multi-paradigmatic" means sociologists just pick whatever theory they like, or that it implies "anything goes".' }
          ],
            remediations: { 'multi-paradigmatic-means-sociologists-just': { steps: ['Ask the student to re-read the NCERT passage on page 85: "Things look different from different vantage points...', 'sociology tries not to judge...', 'interested in what people think, and why they think what they think." 2.', 'Use the shopkeeper-customer analogy: have the student write two definitions of "fair price" — one from each perspective.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_05_005', difficulty: 'standard',
          question: 'Quantitative research methods involve systematic empirical investigation.',
          hint: 'Revisit c11_soc_cbse_05_004 (Multi-paradigmatic science) — if you cannot explain why.',
          misconception: 'Students believe quantitative research is \'hard science\' and qualitative is \'just talking to people\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Quantitative research methods involve systematic empirical investigation of social',
                  options: ['Quantitative research methods involve systematic empirical investigation of social', 'The scientific method in sociology refers to the systematic, documented, and reflexive', 'Objectivity in social research refers to the ideal of producing knowledge that is', 'Insider perspective refers to understanding social phenomena from the subjective'],
                  hint: 'Revisit c11_soc_cbse_05_004 (Multi-paradigmatic science) — if you cannot explain why conflicting.',
                  misconception: 'Students believe quantitative research is \'hard science\' and qualitative is \'just talking to people\'.' }
          ],
            remediations: { 'quantitative-research-is-hard-science': { steps: ['Ask the student to classify 5 research scenarios (e.g., Census, life history interview, opinion poll, ethnography of.', 'For each, demand: "What is the *data form*? What is the *analysis logic*? What *question* does it answer?"', 'Show the NCERT line: "It is futile to argue about superiority...', 'Assign a mini-task: Rewrite a quantitative research question as qualitative (and vice versa) for the same topic (e.g.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_05_006', difficulty: 'standard',
          question: 'Participant observation is a qualitative research method where the sociologist.',
          hint: 'Revisit c11_soc_cbse_05_002 (Objectivity and Subjectivity) and c11_soc_cbse_05_003.',
          misconception: 'Students often believe participant observation means the researcher \'becomes one of them\' completely and loses all.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Participant observation is a qualitative research method where the sociologist immerses',
                  options: ['Participant observation is a qualitative research method where the sociologist immerses', 'The scientific method in sociology refers to the systematic, documented, and reflexive', 'Objectivity in social research refers to the ideal of producing knowledge that is', 'Insider perspective refers to understanding social phenomena from the subjective'],
                  hint: 'Revisit c11_soc_cbse_05_002 (Objectivity and Subjectivity) and c11_soc_cbse_05_003.',
                  misconception: 'Students often believe participant observation means the researcher \'becomes one of them\' completely and loses all objectivity,.' }
          ],
            remediations: { 'participant-observation-means-the-researcher': { steps: ['If a student conflates participation with loss of objectivity: (1) Re-read the NCERT box on Malinowski — note.', 'Ask: \'Does a scientist stop being a scientist when using a microscope?', 'The immersion *is* the instrument.\' (2) Contrast with the \'armchair scholar\' (Frazer, Durkheim) who had *zero*.', '(3) Assign Activity 1 from NCERT (observing oneself from three perspectives) — this *is* reflexivity practice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
