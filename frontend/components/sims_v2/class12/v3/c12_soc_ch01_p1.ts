import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch01_p1: SimDef = {
    id: 'v3_c12_soc_ch01_p1',
    title: 'Introducing Indian Society · Part 1/2',
    subtitle: 'The science of what you think you already know',
    classLevel: 12, subject: 'sociology', topic: 'Introducing Indian Society · Part 1/2',
    chapters: ['c12_soc_ch01'],
    nodeIds: ['c12_soc_cbse_01_001', 'c12_soc_cbse_01_002', 'c12_soc_cbse_01_003', 'c12_soc_cbse_01_004', 'c12_soc_cbse_01_005', 'c12_soc_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Sociological investigator', intro: 'The hardest thing to study is the world you grew up inside — because it trained you not to notice it.', goal: 'Explain why common sense is inadequate for studying society and apply self-reflexivity and the sociological imagination.' },
    discovery: {
        question: 'You live inside Indian society every day — so what could a subject called \'sociology of India\' possibly teach you that you don\'t already know?',
        options: ['That your everyday knowledge is \'partial\' twice over — incomplete and tilted to your own group\'s viewpoint — and sociology\'s first job is unlearning it', 'Nothing — common sense is enough', 'Only facts about villages and castes you haven\'t visited', 'Statistics you could look up anyway'],
        answer: 'That your everyday knowledge is \'partial\' twice over — incomplete and tilted to your own group\'s viewpoint — and sociology\'s first job is unlearning it',
        hook: 'Unlearning doesn\'t mean common sense is false — it means it\'s a view from somewhere. \'Caste doesn\'t matter in cities\' is true from an upper-caste city address; sociology studies why both that claim and a Dalit student\'s opposite experience get produced.',
    },
    teaching: [
        { title: 'The Significance of a Sociology of India: Why Study Indian Society', text: 'The significance of a sociology of India lies in its systematic, scientific study of Indian society that moves beyond common sense by requiring \'unlearning\' of partial, group-biased knowledge.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Locate yourself on the social map, take one personal worry — like not getting a college seat — and trace it upward into structural machinery: seats, coaching economies, reservations, regional gaps.',
        labels: ['The Significance of', 'Colonialism and the Making', 'Nationalism and the Idea', 'Sociology\'s Engagement with Indian', 'The Intellectual Context', 'The Problem of'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_01_002', title: 'Colonialism and the Making of Indian Society: The Colonial Impact',
          caseStudy: { intro: 'Imagine you are looking at a 1901 Census report that suddenly classifies your community as a "criminal tribe" — a label that did not exist before British rule.',
            decisions: [{ prompt: 'What was the primary purpose of the British decennial census in India from a sociological perspective?', options: [
                { text: 'The British census aimed to classify and enumerate the Indian population into fixed,', outcome: 'The British census aimed to classify and enumerate the Indian population into fixed, hierarchical.' },
                { text: 'to know the total population', outcome: 'Not quite — Students often think colonialism simply "added" modern institutions (courts, schools, railways).', reveals: 'colonialism-simply-added-modern-institutions' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_01_003', title: 'Nationalism and the Idea of India: Imagining the Nation',
          caseStudy: { intro: 'Imagine you are at a Republic Day parade: you see contingents from every state, hear multiple languages, see diverse religious symbols, yet everyone salutes.',
            decisions: [{ prompt: 'Define "imagined community" in Benedict Anderson\'s sense and give one example of how print capitalism helped imagine the Indian nation.', options: [
                { text: 'An imagined community is a nation whose members never know most of their fellow members,', outcome: 'An imagined community is a nation whose members never know most of their fellow members, yet hold.' },
                { text: 'fake community', outcome: 'Not quite — Students often conflate "nationalism" with "patriotism" and assume Indian nationalism is.', reveals: 'students-often-conflate-nationalism-with' },
                { text: 'imagined', outcome: 'Not quite — Students often conflate "nationalism" with "patriotism" and assume Indian nationalism is.', reveals: 'students-often-conflate-nationalism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_01_004', title: 'Sociology\'s Engagement with Indian Society: The Colonial and Post-Colonial Context',
          caseStudy: { intro: 'Imagine you are a British district officer in 1881 conducting the first all-India census — you need to classify millions of people into neat categories.',
            decisions: [{ prompt: 'What was the primary purpose of the British decennial census (starting 1881) in India, and how did it unintentionally become a sociological.', options: [
                { text: 'The census was primarily an administrative tool for governance', outcome: 'The census was primarily an administrative tool for governance — revenue collection, law and order.' },
                { text: 'the census was done to help sociologists', outcome: 'Not quite — Students believe Indian sociology simply "applied Western theories to India" — a passive transfer.', reveals: 'indian-sociology-simply-applied-western' },
                { text: 'applied Western theories to India', outcome: 'Not quite — Students believe Indian sociology simply "applied Western theories to India" — a passive transfer.', reveals: 'indian-sociology-simply-applied-western' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_01_005', title: 'The Intellectual Context of Indian Sociology: Indology, Orientalism and Social Anthropology',
          caseStudy: { intro: 'Imagine you are reading a 19th-century British official\'s report describing Indian villages as "unchanging, self-sufficient republics" — a phrase that still.',
            decisions: [{ prompt: 'What is the fundamental epistemological difference between Indology and Social Anthropology in their approach to studying Indian society?', options: [
                { text: 'Indology relies on textual analysis of classical scriptures (Vedas, Smritis,', outcome: 'Indology relies on textual analysis of classical scriptures (Vedas, Smritis, Dharmashastras).' },
                { text: 'both study Indian culture', outcome: 'Not quite — Students often treat Indology, Orientalism, and Social Anthropology as three "schools of thought".', reveals: 'students-often-treat-indology' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_01_006', title: 'The Problem of the \'Village\' as a Unit of Study in Indian Sociology',
          caseStudy: { intro: 'Imagine you are a sociologist visiting a village in Tamil Nadu to study "caste relations." You start by mapping the village boundaries, but soon realise that.',
            decisions: [{ prompt: 'What is the "village republic" thesis, and which colonial administrator-scholar is most associated with its formulation in the early 19th.', options: [
                { text: 'The "village republic" thesis portrays the Indian village as a self-governing,', outcome: 'The "village republic" thesis portrays the Indian village as a self-governing, economically.' },
                { text: 'little republics having nearly everything they want within themselves', outcome: 'Not quite — Students often think the "problem of the village" means "villages are not important" or "we.', reveals: 'the-problem-of-the-village' },
                { text: 'problem of the village', outcome: 'Not quite — Students often think the "problem of the village" means "villages are not important" or "we.', reveals: 'the-problem-of-the-village' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A field-research intern studying a denotified tribe writes that the community\'s stigma \'comes from their own nomadic culture — an old prejudice with no history.\'',
            decisions: [{ prompt: 'What does the colonial analysis show instead?', options: [
                { text: 'The state manufactured the category — the 1871 Act branded whole nomadic communities \'criminal by birth,\' confined and surveilled them until the label produced its own evidence; denotification repealed the law, but the stigma, police bias and missing documents outlived it.', outcome: 'The chapter\'s argument: colonialism didn\'t just label society — it built categories (census jatis, criminal tribes, zamindars) that still structure present life.' },
                { text: 'The intern is right — stigma attaches to the lifestyle, so time alone erases it.', outcome: 'That reads a state-made category as cultural fact — the stigma was legislated into being and survived denotification; \'no history\' is exactly the amnesia the analysis exists to correct.', reveals: 'stigma-is-cultural' },
                { text: 'Partially — the law mattered then, but today\'s stigma is purely economic backwardness.', outcome: 'The poverty and the stigma share the same root — exclusion from land, documents and credit was created by the label; treating present disadvantage as independent severs the colonial thread the chapter traces.', reveals: 'present-detached-from-past' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now turn a private trouble into a public issue — the single move that makes sociology a method, not a pile of facts.',
            decisions: [{ prompt: 'What comes next? Introducing Indian Society · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Introducing Indian Society · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_001', difficulty: 'standard',
          question: 'The significance of a sociology of India lies in its systematic, scientific.',
          hint: 'Revisit c11_soc_cbse_01_002 (Sociological Imagination) and practice converting three.',
          misconception: 'Students often think \'unlearning common sense\' means \'common sense is false and sociology gives the true facts\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The significance of a sociology of India lies in its systematic, scientific study of',
                  options: ['The significance of a sociology of India lies in its systematic, scientific study of', 'Colonialism in India refers to the British imperial rule (1757–1947) that restructured', 'Nationalism in the Indian context refers to the ideological and political process through', 'Sociology\'s engagement with Indian society refers to the historical and intellectual'],
                  hint: 'Revisit c11_soc_cbse_01_002 (Sociological Imagination) and practice converting three personal.',
                  misconception: 'Students often think \'unlearning common sense\' means \'common sense is false and sociology gives the true facts\'.' }
          ],
            remediations: { 'unlearning-common-sense-means-common': { steps: ['Ask the student to write three \'common sense\' statements about Indian society they believe are true.', 'For each, identify the social group whose viewpoint it represents (e.g., \'caste doesn\'t matter\' — urban upper-caste.', 'Find a counter-perspective from a different group (e.g., a Dalit student\'s experience of discrimination in the same.', 'Explain that sociology does not decide which is \'true\' but studies the conditions producing both views.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_002', difficulty: 'standard',
          question: 'Colonialism in India refers to the British imperial rule (1757–1947) that.',
          hint: 'If stuck, revisit c11_soc_cbse_03_001 (Social Institutions) and c11_soc_cbse_06_002.',
          misconception: 'Students often think colonialism simply "added" modern institutions (courts, schools, railways) to an unchanged.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Colonialism in India refers to the British imperial rule (1757–1947) that restructured',
                  options: ['Colonialism in India refers to the British imperial rule (1757–1947) that restructured', 'The significance of a sociology of India lies in its systematic, scientific study of', 'Nationalism in the Indian context refers to the ideological and political process through', 'Sociology\'s engagement with Indian society refers to the historical and intellectual'],
                  hint: 'If stuck, revisit c11_soc_cbse_03_001 (Social Institutions) and c11_soc_cbse_06_002 (Social.',
                  misconception: 'Students often think colonialism simply "added" modern institutions (courts, schools, railways) to an unchanged traditional society.' }
          ],
            remediations: { 'colonialism-simply-added-modern-institutions': { steps: ['If a student cannot distinguish between "colonial impact" and "colonial policy", do this: 1) Give them two 1901 census.', '3) Ask them to write one paragraph explaining how the *category* "Scheduled Tribe" is a colonial-production, not.', 'Re-diagnose with DIAGNOSTIC_QUESTION_3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_003', difficulty: 'standard',
          question: 'Nationalism in the Indian context refers to the ideological and political.',
          hint: 'Revisit c11_ps_cbse_07_001 and c11_ps_cbse_07_003 to clarify the definition of nation and.',
          misconception: 'Students often conflate "nationalism" with "patriotism" and assume Indian nationalism is a monolithic, unchanging.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Nationalism in the Indian context refers to the ideological and political process through',
                  options: ['Nationalism in the Indian context refers to the ideological and political process through', 'The significance of a sociology of India lies in its systematic, scientific study of', 'Colonialism in India refers to the British imperial rule (1757–1947) that restructured', 'Sociology\'s engagement with Indian society refers to the historical and intellectual'],
                  hint: 'Revisit c11_ps_cbse_07_001 and c11_ps_cbse_07_003 to clarify the definition of nation and the.',
                  misconception: 'Students often conflate "nationalism" with "patriotism" and assume Indian nationalism is a monolithic, unchanging ideology.' }
          ],
            remediations: { 'students-often-conflate-nationalism-with': { steps: ['Revisit Class 11 Political Science node c11_ps_cbse_07_003 (Civic nationalism vs ethnic nationalism) and.', 'Create a two-column table: "European Nationalism" vs "Indian Nationalism" on bases: territory, culture, religion.', 'Re-read NCERT Class 12 Sociology Chapter 1 section on "Nationalism and the Idea of India" focusing on Tagore, Gandhi.', 'Write a 150-word answer to: "Is Indian nationalism civic or ethnic?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_004', difficulty: 'standard',
          question: 'Sociology\'s engagement with Indian society refers to the historical and.',
          hint: 'Revisit c11_soc_cbse_01_007 (Growth of Sociology in India: Colonial Context) and.',
          misconception: 'Students believe Indian sociology simply "applied Western theories to India" — a passive transfer.',
          parts: [
                { id: 'a', prompt: 'What was the primary purpose of the British decennial census (starting 1881) in India, and how did it unintentionally become a sociological tool?', answer: 'The census was primarily an administrative tool for governance',
                  options: ['The census was primarily an administrative tool for governance', 'the census was done to help sociologists', 'applied Western theories to India', 'Indian sociology simply "applied Western theories to India"'],
                  hint: 'Revisit c11_soc_cbse_01_007 (Growth of Sociology in India: Colonial Context) and.',
                  misconception: 'Students believe Indian sociology simply "applied Western theories to India" — a passive transfer.' },
                { id: 'b', prompt: 'Compare how D.P. Mukerji and A.R. Desai each used Marxism to study Indian society.', answer: 'Mukerji used Marxism dialectically',
                  options: ['Mukerji used Marxism dialectically', 'applied Western theories to India', 'Indian sociology simply "applied Western theories to India"'],
                  hint: 'Revisit c11_soc_cbse_01_007 (Growth of Sociology in India: Colonial Context) and.',
                  misconception: 'Students believe Indian sociology simply "applied Western theories to India" — a passive transfer.' }
          ],
            remediations: { 'indian-sociology-simply-applied-western': { steps: ['If the student holds this misconception: (1) Assign the 1901 Census Report excerpt (Risley on caste) and ask: "What.', '(3) Have them write a 200-word reflection: "How did the British act of counting create the \'caste system\' as.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Indian sociology simply "applied Western theories to India" — a passive transfer.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "The village studies of the 1950s-60s (Srinivas, Dube, Beteille) were purely academic exercises with no policy relevance." Use.', answer: 'The statement is false',
                  options: ['The statement is false', 'applied Western theories to India', 'Indian sociology simply "applied Western theories to India"'],
                  hint: 'Revisit c11_soc_cbse_01_007 (Growth of Sociology in India: Colonial Context) and.',
                  misconception: 'Students believe Indian sociology simply "applied Western theories to India" — a passive transfer.' }
          ],
            remediations: { 'indian-sociology-simply-applied-western': { steps: ['If the student holds this misconception: (1) Assign the 1901 Census Report excerpt (Risley on caste) and ask: "What.', '(3) Have them write a 200-word reflection: "How did the British act of counting create the \'caste system\' as.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_005', difficulty: 'standard',
          question: 'The intellectual context of Indian sociology refers to the three major.',
          hint: 'Revisit c11_soc_cbse_01_009 (Sociology and Social Anthropology: Convergence and.',
          misconception: 'Students often treat Indology, Orientalism, and Social Anthropology as three "schools of thought" that Indian.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental epistemological difference between Indology and Social Anthropology in their approach to studying Indian society?', answer: 'Indology relies on textual analysis of classical scriptures (Vedas, Smritis,',
                  options: ['Indology relies on textual analysis of classical scriptures (Vedas, Smritis,', 'both study Indian culture'],
                  hint: 'Revisit c11_soc_cbse_01_009 (Sociology and Social Anthropology: Convergence and Distinction) and.',
                  misconception: 'Students often treat Indology, Orientalism, and Social Anthropology as three "schools of thought" that Indian sociologists simply "belonged.' }
          ],
            remediations: { 'students-often-treat-indology': { steps: ['If the student cannot distinguish the three traditions\' epistemologies, do this 3-step remediation: (1) Create.', '/ How do people actually live?), Column C = "Typical Output" (Civilizational essence / Administrative category.', 'Fill it using only NCERT Chapter 1 and Class 11 Sociology Chapter 10 (nodes c11_soc_cbse_10_001 to c11_soc_cbse_10_011).', '(2) Take Ghurye\'s six features of caste (c11_soc_cbse_10_005) and Srinivas\'s dominant caste (c11_soc_cbse_10_010) — for.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_006', difficulty: 'standard',
          question: 'The "problem of the village" refers to the epistemological and methodological.',
          hint: 'If stuck, revisit c11_soc_cbse_05_010 (Village Studies in Indian Sociology) and the.',
          misconception: 'Students often think the "problem of the village" means "villages are not important" or "we shouldn\'t study villages.".',
          parts: [
                { id: 'a', prompt: 'What is the "village republic" thesis, and which colonial administrator-scholar is most associated with its formulation in the early 19th century?', answer: 'The "village republic" thesis portrays the Indian village as a self-governing,',
                  options: ['The "village republic" thesis portrays the Indian village as a self-governing,', 'little republics having nearly everything they want within themselves', 'problem of the village', 'villages are not important'],
                  hint: 'If stuck, revisit c11_soc_cbse_05_010 (Village Studies in Indian Sociology) and the section.',
                  misconception: 'Students often think the "problem of the village" means "villages are not important" or "we shouldn\'t study villages." The actual problem.' },
                { id: 'b', prompt: 'Explain why M.N. Srinivas chose the village (Rampura) as his unit of study in the 1950s, and identify one limitation he himself later acknowledged about this.', answer: 'Srinivas chose the village',
                  options: ['Srinivas chose the village', 'Srinivas believed villages were isolated', 'problem of the village', 'villages are not important'],
                  hint: 'If stuck, revisit c11_soc_cbse_05_010 (Village Studies in Indian Sociology) and the section.',
                  misconception: 'Students often think the "problem of the village" means "villages are not important" or "we shouldn\'t study villages." The actual problem.' }
          ],
            remediations: { 'the-problem-of-the-village': { steps: ['Re-read the distinction between "unit of observation" (where you do fieldwork) and "unit of analysis" (what explains.', 'Revisit c11_soc_cbse_05_010 (Village Studies in Indian Sociology) to see how triangulation was used to go beyond.', 'Write a one-paragraph comparison: "How would a study of \'water scarcity\' differ if the unit of analysis is the village.', 'the river basin/caste irrigation network?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
