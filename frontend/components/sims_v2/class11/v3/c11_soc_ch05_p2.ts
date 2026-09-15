import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch05_p2: SimDef = {
    id: 'v3_c11_soc_ch05_p2',
    title: 'Doing Sociology: Research Methods · Part 2/2',
    subtitle: 'Learn that confessing your lens is more objective than denying it.',
    classLevel: 11, subject: 'sociology', topic: 'Doing Sociology: Research Methods · Part 2/2',
    chapters: ['c11_soc_ch05'],
    nodeIds: ['c11_soc_cbse_05_007', 'c11_soc_cbse_05_008', 'c11_soc_cbse_05_009', 'c11_soc_cbse_05_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a fieldworker auditing their own blind spots', intro: 'Where you stand decides what you see — sociology\'s answer isn\'t pretending to float, it\'s reporting the ground underfoot.', goal: 'Distinguish method from methodology and apply reflexivity as a rigour practice.' },
    discovery: {
        question: 'Complete objectivity is impossible in sociology — so all research is just the researcher\'s opinion?',
        options: ['No — objectivity is an ongoing process of documenting methods and practising self-reflexivity; impossible-to-perfect isn\'t permission to stop', 'Yes — abandon the pretence', 'Yes — every study is equal', 'No — sociologists must become machines'],
        answer: 'No — objectivity is an ongoing process of documenting methods and practising self-reflexivity; impossible-to-perfect isn\'t permission to stop',
        hook: 'Subjectivity isn\'t bias you can suppress — it\'s your caste, class and gender shaping what you notice; naming it is the method, not the failure.',
    },
    teaching: [
        { title: 'Malinowski and the Institutionalisation of Fieldwork in Anthropology', text: 'Bronislaw Malinowski (1884–1942) was a Polish-British anthropologist who transformed social anthropology by establishing intensive, long-term participant observation — or \'fieldwork\' — as the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Separate method from methodology, then grade a study by whether it disclosed its lens rather than whether it claimed to have none.',
        labels: ['Malinowski and the Institutionalisation', 'Survey Research Method', 'Interview as a Research', 'Village Studies in Indian'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_05_007', title: 'Malinowski and the Institutionalisation of Fieldwork in Anthropology',
          caseStudy: { intro: 'Imagine you are a sociologist in 1910 wanting to study a tribal community in the Andaman Islands.',
            decisions: [{ prompt: 'What specific historical circumstance forced Malinowski to conduct his fieldwork in the Trobriand Islands rather than return to Europe.', options: [
                { text: 'Malinowski was a Polish national visiting British-controlled Australia when WWI began', outcome: 'Malinowski was a Polish national visiting British-controlled Australia when WWI began; Poland had.' },
                { text: 'Malinowski \'invented\' participant observation ex nihilo', outcome: 'Not quite — Students often believe Malinowski \'invented\' participant observation ex nihilo.', reveals: 'malinowski-invented-participant-observation-ex' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_05_008', title: 'Survey Research Method and Sampling Theory (Stratification, Randomisation, Error)',
          caseStudy: { intro: 'Imagine you want to know whether students in your school prefer online or offline classes, but you cannot ask all 2,000 students.',
            decisions: [{ prompt: 'Define \'stratification\' in the statistical sense used in sampling theory, and explain how it differs from the sociological concept.', options: [
                { text: 'Statistical stratification is the subdivision of a population into distinct,', outcome: 'Statistical stratification is the subdivision of a population into distinct, non-overlapping.' },
                { text: 'random sampling', outcome: 'Not quite — Students believe that "random sampling" means "haphazard or arbitrary selection" — e.g., walking.', reveals: 'random-sampling-means-haphazard-or' },
                { text: 'haphazard or arbitrary selection', outcome: 'Not quite — Students believe that "random sampling" means "haphazard or arbitrary selection" — e.g., walking.', reveals: 'random-sampling-means-haphazard-or' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_05_009', title: 'Interview as a Research Method and Non-Sampling Errors',
          caseStudy: { intro: 'Imagine you want to understand why students in your school choose Humanities over Science streams — a survey with fixed options would miss the nuanced family.',
            decisions: [{ prompt: 'Define "non-sampling error" and give one example that is NOT related to sample selection.', options: [
                { text: 'Non-sampling error refers to systematic distortions in research findings arising from', outcome: 'Non-sampling error refers to systematic distortions in research findings arising from flaws.' },
                { text: 'error due to small sample size', outcome: 'Not quite — Students conflate "interview flexibility" with "lack of rigour," believing semi-structured.', reveals: 'students-conflate-interview-flexibility-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_05_010', title: 'Village Studies in Indian Sociology and the Use of Triangulation',
          caseStudy: { intro: 'Imagine you are a sociologist in 1955 India, tasked with understanding how caste, land ownership, and kinship interact in a typical village — but you only have.',
            decisions: [{ prompt: 'What is the primary methodological reason village studies became central to Indian sociology in the 1950s, distinct from the study.', options: [
                { text: 'Villages were "bounded communities" small enough for a single researcher to study', outcome: 'Villages were "bounded communities" small enough for a single researcher to study holistically.' },
                { text: 'villages were easier to access than cities', outcome: 'Not quite — Students often think triangulation simply means "using three methods" or "getting the same answer.', reveals: 'triangulation-simply-means-using-three' },
                { text: 'bounded community', outcome: 'Not quite — Students often think triangulation simply means "using three methods" or "getting the same answer.', reveals: 'triangulation-simply-means-using-three' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Peer-reviewing a fieldwork proposal, a student writes \'methodology: participant observation\' and promises \'total objectivity — I\'ll switch off my opinions and stay neutral like a physicist.\'',
            decisions: [{ prompt: 'What should the review correct?', options: [
                { text: 'Split method from methodology, and objectivity from neutrality: participant observation is the METHOD; the methodology is the ethnographic logic — long-term immersion, learning the language — that justifies it. And subjectivity isn\'t a bias you suppress: your social location (caste, class, gender) shapes which questions you ask and how you read silence — the discipline\'s answer is reflexivity, making your standpoint visible, not pretending it away.', outcome: 'The proposal strengthens: method is the technique, methodology is its justification — and rigour comes from declared positionality, not performed neutrality.' },
                { text: 'Accept \'methodology: participant observation\' — they\'re the same thing.', outcome: 'One names the tool, the other the theory of knowledge behind it: a survey and ethnography can share methods but not methodology.', reveals: 'method-equals-methodology' },
                { text: 'Praise the neutrality pledge — suppressing personal views IS objectivity.', outcome: 'You can\'t switch off socialisation: a male researcher may code \'cooking\' as \'task\' not \'care\' — reflexivity exposes the frame; denial hides it.', reveals: 'objectivity-is-suppressing-views' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_05_010', title: 'You made it',
          caseStudy: { intro: 'The honest researcher doesn\'t claim to be neutral — they show you where they stood, so you can judge what they saw.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_05_007', difficulty: 'standard',
          question: 'Bronislaw Malinowski (1884–1942) was a Polish-British anthropologist who.',
          hint: 'Revisit c11_soc_cbse_05_006\'s section on \'what the sociologist actually does during.',
          misconception: 'Students often believe Malinowski \'invented\' participant observation ex nihilo.',
          parts: [
                { id: 'a', prompt: 'A sociology student plans to study a migrant worker community in Mumbai for six weeks, using Hindi and Marathi (which they speak fluently), living in a rented.', answer: 'Alignments: (1) vernacular language use without interpreters',
                  options: ['Alignments: (1) vernacular language use without interpreters', 'Malinowski \'invented\' participant observation ex nihilo'],
                  hint: 'Revisit c11_soc_cbse_05_006\'s section on \'what the sociologist actually does during fieldwork\'.',
                  misconception: 'Students often believe Malinowski \'invented\' participant observation ex nihilo.' },
                { id: 'b', prompt: 'Compare Malinowski\'s \'genealogical method\' (constructing detailed family trees to map kinship systems) with the census operation he conducted at the start.', answer: 'The census provided a *synchronic structural snapshot*: demographic composition,',
                  options: ['The census provided a *synchronic structural snapshot*: demographic composition,', 'Malinowski \'invented\' participant observation ex nihilo'],
                  hint: 'Revisit c11_soc_cbse_05_006\'s section on \'what the sociologist actually does during fieldwork\'.',
                  misconception: 'Students often believe Malinowski \'invented\' participant observation ex nihilo.' }
          ],
            remediations: { 'malinowski-invented-participant-observation-ex': { steps: ['If a student conflates Malinowski with \'first fieldworker\', assign this 3-step corrective: (1) Read the 1898 Torres.', '(2) Compare Boas\'s 1901 \'Instructions for Fieldwork\' with Malinowski\'s 1922 *Argonauts* appendix on method — identify.', '(3) Write a 150-word paragraph explaining why LSE\'s position in the British imperial university system (not.', 'Debrief by discussing how disciplinary histories are written by institutional winners.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_05_008', difficulty: 'standard',
          question: 'Survey research is a macro-level quantitative method that studies a carefully.',
          hint: 'Revisit Class 10 Mathematics Chapter 15 (Probability) — specifically the definition.',
          misconception: 'Students believe that "random sampling" means "haphazard or arbitrary selection" — e.g., walking into a classroom and.',
          parts: [
                { id: 'a', prompt: 'Define \'stratification\' in the statistical sense used in sampling theory, and explain how it differs from the sociological concept of stratification studied.', answer: 'Statistical stratification is the subdivision of a population into distinct,',
                  options: ['Statistical stratification is the subdivision of a population into distinct,', 'random sampling', 'haphazard or arbitrary selection', 'random'],
                  hint: 'Revisit Class 10 Mathematics Chapter 15 (Probability) — specifically the definition of theoretical.',
                  misconception: 'Students believe that "random sampling" means "haphazard or arbitrary selection" — e.g., walking into a classroom and picking whoever.' },
                { id: 'b', prompt: 'A researcher wants to study voting behaviour in a state with 60% rural and 40% urban population.', answer: 'No, this is a disproportionate stratified sample',
                  options: ['No, this is a disproportionate stratified sample', 'random sampling', 'haphazard or arbitrary selection', 'random'],
                  hint: 'Revisit Class 10 Mathematics Chapter 15 (Probability) — specifically the definition of theoretical.',
                  misconception: 'Students believe that "random sampling" means "haphazard or arbitrary selection" — e.g., walking into a classroom and picking whoever.' },
                { id: 'c', prompt: 'You are designing a survey to study the relationship between family size and academic performance among Class 11 students in a city with 50 schools.', answer: 'Stage 1: Stratify the 50 schools by type (government/private/aided) and size',
                  options: ['Stage 1: Stratify the 50 schools by type (government/private/aided) and size', 'random sampling', 'haphazard or arbitrary selection', 'random'],
                  hint: 'Revisit Class 10 Mathematics Chapter 15 (Probability) — specifically the definition of theoretical.',
                  misconception: 'Students believe that "random sampling" means "haphazard or arbitrary selection" — e.g., walking into a classroom and picking whoever.' }
          ],
            remediations: { 'random-sampling-means-haphazard-or': { steps: ['Have the student physically enact randomisation — write 30 student names on chits, fold identically, place in a box.', 'Show a biased sample (e.g., only front-row students) and a random sample from the same class; compare their average.', 'Use a random number table (NCERT Appendix) to select 5 villages from a list of 20 — practice until the mechanical.', 'Assign a reading of the Literary Digest 1936 US election poll disaster (2.4 million responses, predicted Landon over.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_05_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "random sampling" means "haphazard or arbitrary selection" — e.g., walking into a classroom and.',
          parts: [
                { id: 'a', prompt: 'Critique this survey claim: "A television channel conducted an online poll asking viewers whether they support a new law.', answer: 'Flaw 1: Self-selection bias (non-probability sampling)',
                  options: ['Flaw 1: Self-selection bias (non-probability sampling)', 'small sample size', 'random sampling', 'haphazard or arbitrary selection'],
                  hint: 'Revisit Class 10 Mathematics Chapter 15 (Probability) — specifically the definition of theoretical.',
                  misconception: 'Students believe that "random sampling" means "haphazard or arbitrary selection" — e.g., walking into a classroom and picking whoever.' }
          ],
            remediations: { 'random-sampling-means-haphazard-or': { steps: ['Have the student physically enact randomisation — write 30 student names on chits, fold identically, place in a box.', 'Show a biased sample (e.g., only front-row students) and a random sample from the same class; compare their average.', 'Use a random number table (NCERT Appendix) to select 5 villages from a list of 20 — practice until the mechanical.', 'Assign a reading of the Literary Digest 1936 US election poll disaster (2.4 million responses, predicted Landon over.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_05_009', difficulty: 'standard',
          question: 'An interview is a guided conversation between researcher and respondent where.',
          hint: 'Revisit c11_soc_cbse_05_005 (Quantitative vs Qualitative) and c11_soc_cbse_05_008 (Survey.',
          misconception: 'Students conflate "interview flexibility" with "lack of rigour," believing semi-structured interviews are just casual.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An interview is a guided conversation between researcher and respondent where questions',
                  options: ['An interview is a guided conversation between researcher and respondent where questions', 'The scientific method in sociology refers to the systematic, documented, and reflexive', 'Objectivity in social research refers to the ideal of producing knowledge that is', 'Insider perspective refers to understanding social phenomena from the subjective'],
                  hint: 'Revisit c11_soc_cbse_05_005 (Quantitative vs Qualitative) and c11_soc_cbse_05_008 (Survey Method).',
                  misconception: 'Students conflate "interview flexibility" with "lack of rigour," believing semi-structured interviews are just casual conversations without.' }
          ],
            remediations: { 'students-conflate-interview-flexibility-with': { steps: ['Have the student compare three interview transcripts of the same respondent answering identical questions posed by (a).', 'Give them a flawed questionnaire with double-barrelled, leading, and jargon-heavy questions; ask them to rewrite each.', 'Assign a mini-fieldwork: conduct two 15-minute interviews on "mobile phone usage" — one structured, one semi-structured.', 'Discuss how NCERT\'s "Street Corner Society" example shows Whyte\'s Italian-American identity shaped what gang members.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_05_010', difficulty: 'standard',
          question: 'Village studies in Indian sociology refer to the systematic ethnographic.',
          hint: 'Revisit c11_soc_cbse_05_006 (Participant Observation) and c11_soc_cbse_05_008 (Survey.',
          misconception: 'Students often think triangulation simply means "using three methods" or "getting the same answer from different.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Village studies in Indian sociology refer to the systematic ethnographic investigation of',
                  options: ['Village studies in Indian sociology refer to the systematic ethnographic investigation of', 'The scientific method in sociology refers to the systematic, documented, and reflexive', 'Objectivity in social research refers to the ideal of producing knowledge that is', 'Insider perspective refers to understanding social phenomena from the subjective'],
                  hint: 'Revisit c11_soc_cbse_05_006 (Participant Observation) and c11_soc_cbse_05_008 (Survey Method).',
                  misconception: 'Students often think triangulation simply means "using three methods" or "getting the same answer from different methods." They miss that.' }
          ],
            remediations: { 'triangulation-simply-means-using-three': { steps: ['If a student reduces triangulation to "using multiple methods," do this: (1) Give them two contradictory findings from.', '(2) Ask: "If both are true, what does that tell us about family change?" (3) Guide them to see that triangulation.', '(4) Have them re-write their definition of triangulation to include "analytic integration of partial perspectives."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
