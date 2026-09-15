import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch01_p2: SimDef = {
    id: 'v3_c12_geo_ch01_p2',
    title: 'Human Geography · Part 2/2',
    subtitle: 'Taylor\'s traffic lights: run the green, obey the red',
    classLevel: 12, subject: 'geography', topic: 'Human Geography · Part 2/2',
    chapters: ['c12_geo_ch01'],
    nodeIds: ['c12_geo_cbse_01_007', 'c12_geo_cbse_01_008', 'c12_geo_cbse_01_009', 'c12_geo_cbse_01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Human geographer', intro: 'Every road you travel and every heatwave you flee is a two-way negotiation between people and planet. That\'s the discipline.', goal: 'Define human geography\'s scope and its three schools — determinism, possibilism, neo-determinism — through real-world evidence.' },
    discovery: {
        question: 'Punjab\'s Green Revolution pumped groundwater for rice until the water table crashed. Which school of geographic thought saw that \'collision\' coming?',
        options: ['Neo-determinism — Taylor\'s traffic lights: humans may run green lights of possibility but only by obeying the red lights of environmental limits', 'Possibilism — humans are free of nature', 'Determinism — nature decides everything', 'Behaviouralism — perception decides'],
        answer: 'Neo-determinism — Taylor\'s traffic lights: humans may run green lights of possibility but only by obeying the red lights of environmental limits',
        hook: 'Human geography runs both ways: \'naturalisation of humans\' (low-tech societies shaped by nature) and \'humanisation of nature\' (glass-domed Trondheim in polar dark). Determinism says only red lights exist, possibilism only green — neo-determinism is the driver who knows both are real.',
    },
    teaching: [
        { title: 'Major Fields and Sub-fields of Human Geography', text: 'Major fields of human geography are the broad thematic categories (Social, Cultural, Political, Population, Settlement, Economic, Urban, Historical, Medical, Gender) that organise the study.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map the field itself: split the naturalisers from the humanisers, weigh determinism against possibilism on real landscapes, and trace how the quantitative revolution triggered humanistic, radical and behavioural pushback.',
        labels: ['Major Fields and Sub-fields', 'Branches of Human Geography', 'Relation of Human Geography', 'Approaches to Human Geography'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_01_007', title: 'Major Fields and Sub-fields of Human Geography',
          caseStudy: { intro: 'Look at your own city or village: you see markets (economic), voting booths (political), hospitals (medical), distinct neighbourhoods (social/cultural), and.',
            decisions: [{ prompt: 'Name the major field of human geography that studies the spatial distribution of voting patterns and electoral behaviour, and identify its.', options: [
                { text: 'Correct answer: Political Geography', outcome: 'Correct answer: Political Geography — sub-field Electoral Geography; sister discipline: Psephology.' },
                { text: 'Social Geography with Sociology', outcome: 'Not quite — Students often confuse "fields of human geography" (Social, Cultural, Political, etc.) with.', reveals: 'students-often-confuse-fields-of' },
                { text: 'psephology', outcome: 'Not quite — Students often confuse "fields of human geography" (Social, Cultural, Political, etc.) with.', reveals: 'students-often-confuse-fields-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_01_008', title: 'Branches of Human Geography: Social, Cultural, Political, Economic',
          caseStudy: { intro: 'Look at your city or village: you see hospitals (social well-being), temples or festivals (cultural landscape), a municipal office or voting booth (political.',
            decisions: [{ prompt: 'Name the four major branches of Human Geography listed in NCERT Table 1.2 and the sister social science discipline each branch primarily.', options: [
                { text: 'The four branches are: (1) Social Geography', outcome: 'The four branches are: (1) Social Geography — Sociology, (2) Cultural Geography — Anthropology, (3).' },
                { text: 'Social Geography', outcome: 'Not quite — Students often think "Social Geography" and "Cultural Geography" are the same because both deal.', reveals: 'social-geography-and-cultural-geography' },
                { text: 'Cultural Geography', outcome: 'Not quite — Students often think "Social Geography" and "Cultural Geography" are the same because both deal.', reveals: 'social-geography-and-cultural-geography' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_01_009', title: 'Relation of Human Geography with Other Social Sciences',
          caseStudy: { intro: 'Observe a metropolitan city like Delhi: its land-use pattern shows wealthy neighbourhoods in South Delhi, dense slums along the Yamuna, industrial clusters.',
            decisions: [{ prompt: 'List any three sub-fields of human geography from NCERT Table 1.2 and name the sister discipline each interfaces with.', options: [
                { text: 'Correct answer: (1) Behavioural Geography → Psychology', outcome: 'Correct answer: (1) Behavioural Geography → Psychology; (2) Geography of Agriculture → Agricultural.' },
                { text: 'Urban Geography ↔ Sociology', outcome: 'Not quite — Students often believe the interdisciplinary relationship is **one-way**: human geography merely.', reveals: 'the-interdisciplinary-relationship-is-one' },
                { text: 'Medical Geography ↔ Economics', outcome: 'Not quite — Students often believe the interdisciplinary relationship is **one-way**: human geography merely.', reveals: 'the-interdisciplinary-relationship-is-one' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_01_010', title: 'Approaches to Human Geography: Areal Differentiation and Regional Analysis',
          caseStudy: { intro: 'Look at a map of India showing cropping patterns: you see wheat dominating Punjab-Haryana while rice dominates West Bengal and Kerala.',
            decisions: [{ prompt: 'What is the core focus of the areal differentiation approach in human geography according to NCERT Table 1.1?', options: [
                { text: 'The core focus of areal differentiation is "identifying the uniqueness of any region and', outcome: 'The core focus of areal differentiation is "identifying the uniqueness of any region and.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students conflate "regional geography" (the subject matter) with "regional analysis" (the.', reveals: 'students-conflate-regional-geography-the' },
                { text: 'studying regions as parts of a whole', outcome: 'Not quite — Students conflate "regional geography" (the subject matter) with "regional analysis" (the.', reveals: 'students-conflate-regional-geography-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On an internship with a district development cell, you\'re reviewing two proposals for a flood-prone river valley: one diverts 90% of the river for an industrial estate, the other tunnels a metro link under the floodplain but fits flood-gates and leaves minimum ecological flow.',
            decisions: [{ prompt: 'Which proposal does human geography\'s determinism-possibilism-neo-determinism debate support?', options: [
                { text: 'The flood-gated tunnel — it humanises nature through technology while still obeying the \'red signals\' neo-determinism demands; the 90% diversion is possibilism ignoring ecological limits, like hydropower projects that dry downstream springs.', outcome: 'The chapter\'s middle path is the point: technology lets humans modify nature, but Griffith Taylor\'s \'stop-and-go\' determinism says you stop when nature signals — downstream springs drying is exactly that signal.' },
                { text: 'The full diversion — technology exists precisely to free humans from nature\'s constraints, so bigger modification means bigger development.', outcome: 'That\'s pure possibilism without the brake; the chapter\'s own test case shows diverting nearly all of a river\'s flow is unsustainable humanisation that triggers the very \'red signal\' neo-determinism warns about.', reveals: 'technology-beats-nature' },
                { text: 'Reject both — any modification of a river valley violates the environment; leave it to nature.', outcome: 'That swings to naturalisation — humans dictated by nature; the chapter treats technology within ecological limits as legitimate, so refusing all modification throws away the neo-determinist option.', reveals: 'all-modification-is-violation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_01_010', title: 'You made it',
          caseStudy: { intro: 'You can now place any human-environment story on the nature–culture dial — and explain why the discipline fought over whose light was green.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_007', difficulty: 'standard',
          question: 'Major fields of human geography are the broad thematic categories (Social.',
          hint: 'If stuck, revisit c12_geo_cbse_01_001 (definition) and c11_geo_cbse_01_005 (Class 11.',
          misconception: 'Students often confuse "fields of human geography" (Social, Cultural, Political, etc.) with "schools of thought".',
          parts: [
                { id: 'a', prompt: 'Name the major field of human geography that studies the spatial distribution of voting patterns and electoral behaviour, and identify its sister discipline.', answer: 'Correct answer: Political Geography',
                  options: ['Correct answer: Political Geography', 'Social Geography with Sociology', 'psephology', 'fields of human geography'],
                  hint: 'If stuck, revisit c12_geo_cbse_01_001 (definition) and c11_geo_cbse_01_005 (Class 11 branches.',
                  misconception: 'Students often confuse "fields of human geography" (Social, Cultural, Political, etc.) with "schools of thought" (Determinism, Possibilism.' },
                { id: 'b', prompt: 'A student maps the locations of all primary health centres in a district and analyses their accessibility for rural populations.', answer: 'Correct answer: Major field: Medical Geography',
                  options: ['Correct answer: Major field: Medical Geography', 'Social Geography with Sociology', 'fields of human geography', 'schools of thought'],
                  hint: 'If stuck, revisit c12_geo_cbse_01_001 (definition) and c11_geo_cbse_01_005 (Class 11 branches.',
                  misconception: 'Students often confuse "fields of human geography" (Social, Cultural, Political, etc.) with "schools of thought" (Determinism, Possibilism.' }
          ],
            remediations: { 'students-often-confuse-fields-of': { steps: ['Revisit node c12_geo_cbse_01_001 (definition) to recall what human geography studies.', 'Revisit nodes c12_geo_cbse_01_004, 005, 006 (schools of thought) and explicitly list: "Schools of thought.', 'Fields = Social, Cultural, Political, etc." 3.', 'Draw a two-column table: left column "What we study (Fields)", right column "How we study (Schools)".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "fields of human geography" (Social, Cultural, Political, etc.) with "schools of thought".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Settlement Geography and Urban Geography are the same field because both study human habitations." Use NCERT Table 1.2 to justify your.', answer: 'Correct answer: False',
                  options: ['Correct answer: False', 'True, both study cities', 'fields of human geography', 'schools of thought'],
                  hint: 'If stuck, revisit c12_geo_cbse_01_001 (definition) and c11_geo_cbse_01_005 (Class 11 branches.',
                  misconception: 'Students often confuse "fields of human geography" (Social, Cultural, Political, etc.) with "schools of thought" (Determinism, Possibilism.' }
          ],
            remediations: { 'students-often-confuse-fields-of': { steps: ['Revisit node c12_geo_cbse_01_001 (definition) to recall what human geography studies.', 'Revisit nodes c12_geo_cbse_01_004, 005, 006 (schools of thought) and explicitly list: "Schools of thought.', 'Fields = Social, Cultural, Political, etc." 3.', 'Draw a two-column table: left column "What we study (Fields)", right column "How we study (Schools)".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_008', difficulty: 'standard',
          question: 'Human Geography is divided into four major branches: Social Geography (study.',
          hint: 'If stuck, revisit c12_geo_cbse_01_001 (Human Geography: Definition, Nature and Scope) and.',
          misconception: 'Students often think "Social Geography" and "Cultural Geography" are the same because both deal with people.',
          parts: [
                { id: 'a', prompt: 'Name the four major branches of Human Geography listed in NCERT Table 1.2 and the sister social science discipline each branch primarily interfaces with.', answer: 'The four branches are: (1) Social Geography',
                  options: ['The four branches are: (1) Social Geography', 'Social Geography', 'Cultural Geography', 'Political Geography'],
                  hint: 'If stuck, revisit c12_geo_cbse_01_001 (Human Geography: Definition, Nature and Scope) and.',
                  misconception: 'Students often think "Social Geography" and "Cultural Geography" are the same because both deal with people.' },
                { id: 'b', prompt: 'Given the following map description: "A map shows the 2019 Lok Sabha election results by constituency, with party-wise vote shares and turnout percentages.".', answer: 'Branch: Political Geography',
                  options: ['Branch: Political Geography', 'A wrong answer (e.g', 'Demography', 'Social Geography'],
                  hint: 'If stuck, revisit c12_geo_cbse_01_001 (Human Geography: Definition, Nature and Scope) and.',
                  misconception: 'Students often think "Social Geography" and "Cultural Geography" are the same because both deal with people.' }
          ],
            remediations: { 'social-geography-and-cultural-geography': { steps: ['Create a 2×4 table on paper with columns: Branch, Sister Discipline, Two Sub-fields, Indian Example.', 'Check against NCERT Table 1.2.', 'For each empty cell, read the relevant paragraph in the textbook (e.g., "Welfare or humanistic school..." for Social.', 'Take five news headlines from today\'s paper (e.g., "Farmer protests," "Temple dispute," "Election dates," "New.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_009', difficulty: 'standard',
          question: 'Human geography is an interdisciplinary field that systematically studies the.',
          hint: 'If stuck, revisit Class 11 node c11_geo_cbse_01_008 (Relation of Geography with Social.',
          misconception: 'Students often believe the interdisciplinary relationship is **one-way**: human geography merely "borrows" concepts.',
          parts: [
                { id: 'a', prompt: 'List any three sub-fields of human geography from NCERT Table 1.2 and name the sister discipline each interfaces with.', answer: 'Correct answer: (1) Behavioural Geography → Psychology',
                  options: ['Correct answer: (1) Behavioural Geography → Psychology', 'Urban Geography ↔ Sociology', 'Medical Geography ↔ Economics', 'borrows'],
                  hint: 'If stuck, revisit Class 11 node c11_geo_cbse_01_008 (Relation of Geography with Social Sciences).',
                  misconception: 'Students often believe the interdisciplinary relationship is **one-way**: human geography merely "borrows" concepts from sociology.' },
                { id: 'b', prompt: 'A researcher studies the 2024 Lok Sabha election results in Uttar Pradesh to analyse how caste composition of constituencies correlates with voting patterns.', answer: 'Correct answer: Step 1: Phenomenon = voting patterns → sub-field = **Electoral',
                  options: ['Correct answer: Step 1: Phenomenon = voting patterns → sub-field = **Electoral', 'Political Geography ↔ Political Science', 'borrows', 'Urban Geography interfaces with Urban Geography'],
                  hint: 'If stuck, revisit Class 11 node c11_geo_cbse_01_008 (Relation of Geography with Social Sciences).',
                  misconception: 'Students often believe the interdisciplinary relationship is **one-way**: human geography merely "borrows" concepts from sociology.' }
          ],
            remediations: { 'the-interdisciplinary-relationship-is-one': { steps: ['Re-read NCERT Table 1.2 *slowly*; create a two-column flashcard deck: Column A = Sub-field (12 items), Column.', 'For each pair, write *one sentence* on what the sister discipline contributes (e.g., "Demography provides population.', 'Revisit Class 11 node **c11_geo_cbse_01_008** (Relation of Geography with Social Sciences) to reinforce the *big.', 'Take a 5-question self-test matching sub-fields to disciplines; if score < 4/5, repeat Step 1-2 with focus on weak.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_010', difficulty: 'standard',
          question: 'Areal differentiation is the methodological approach in human geography that.',
          hint: 'If stuck, revisit c11_geo_cbse_01_003 and create a concrete example: systematic.',
          misconception: 'Students conflate "regional geography" (the subject matter) with "regional analysis" (the methodological approach), and.',
          parts: [
                { id: 'a', prompt: 'How does regional analysis differ from areal differentiation in its treatment of the relationship between a region and the larger geographical whole?', answer: 'Regional analysis views regions as interdependent parts of a whole Earth system',
                  options: ['Regional analysis views regions as interdependent parts of a whole Earth system', 'regional geography', 'regional analysis', 'comparing regions'],
                  hint: 'If stuck, revisit c11_geo_cbse_01_003 and create a concrete example: systematic = "studying rice.',
                  misconception: 'Students conflate "regional geography" (the subject matter) with "regional analysis" (the methodological approach), and similarly confuse.' },
                { id: 'b', prompt: 'A student argues: "Areal differentiation and regional analysis are just two names for the same thing — studying regions." Using the NCERT framework, explain.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'what makes Region A unlike Region B?', 'A wrong answer that focuses only on', 'regional geography'],
                  hint: 'If stuck, revisit c11_geo_cbse_01_003 and create a concrete example: systematic = "studying rice.',
                  misconception: 'Students conflate "regional geography" (the subject matter) with "regional analysis" (the methodological approach), and similarly confuse.' }
          ],
            remediations: { 'students-conflate-regional-geography-the': { steps: ['If the student cannot distinguish the two approaches: (1) Revisit c11_geo_cbse_01_003 (Approaches to Geography.', '(2) Create a 2-column table: Column A = "Areal Differentiation Questions" (e.g., "Why is Kerala\'s sex ratio unique?").', '(3) Take any Indian state (e.g., Odisha) and write one question of each type.', '(4) Re-attempt DIAGNOSTIC_QUESTION_3 and DIAGNOSTIC_QUESTION_6.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
