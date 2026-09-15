import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch01_p2: SimDef = {
    id: 'v3_c11_soc_ch01_p2',
    title: 'Sociology and Society · Part 2/2',
    subtitle: 'Trade empathy for structure — and see biography meet history.',
    classLevel: 11, subject: 'sociology', topic: 'Sociology and Society · Part 2/2',
    chapters: ['c11_soc_ch01'],
    nodeIds: ['c11_soc_cbse_01_007', 'c11_soc_cbse_01_008', 'c11_soc_cbse_01_009', 'c11_soc_cbse_01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sociologist mapping the invisible wiring under everyday life', intro: 'The news reader sees a person without a house; the sociological imagination sees the markets and policies that built the homelessness.', goal: 'Define the sociological imagination and the individual–society dialectic.' },
    discovery: {
        question: 'The \'sociological imagination\' means feeling what a homeless person feels — empathy, upgraded?',
        options: ['No — Mills meant structural mapping: tracing how housing policy, land markets and migration produce the homelessness, not feeling it', 'Yes — imagination is empathy', 'Yes — anyone who reads the news has it', 'No — it\'s just Berger being poetic about spying'],
        answer: 'No — Mills meant structural mapping: tracing how housing policy, land markets and migration produce the homelessness, not feeling it',
        hook: 'And \'dialectical\' isn\'t a fight between individual and society — each constitutes the other; society exists through people, people become social through it.',
    },
    teaching: [
        { title: 'The Growth of Sociology in India: The Colonial Context', text: 'The growth of sociology in India refers to the historical process through which sociology emerged as an academic discipline in India during the colonial period, shaped by the dual influence.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Apply the imagination to a housing scheme: does gifting houses close a public issue, or leave the structure that produces it untouched?',
        labels: ['The Growth of Sociology', 'Scope of Sociology: Its', 'Sociology and Social Anthropology', 'Feminist Interventions and'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_01_007', title: 'The Growth of Sociology in India: The Colonial Context',
          caseStudy: { intro: 'Imagine you are a British district collector in 1880s Bengal trying to implement a new land revenue system.',
            decisions: [{ prompt: 'What was the primary administrative reason that motivated British colonial officials to conduct systematic studies of Indian society in the.', options: [
                { text: 'The British needed detailed knowledge of Indian social structures (caste, kinship,', outcome: 'The British needed detailed knowledge of Indian social structures (caste, kinship, customary law.' },
                { text: 'to promote social reform', outcome: 'Not quite — Students often believe Indian sociology simply "copied" western sociology and applied it to India.', reveals: 'indian-sociology-simply-copied-western' },
                { text: 'pure academic curiosity', outcome: 'Not quite — Students often believe Indian sociology simply "copied" western sociology and applied it to India.', reveals: 'indian-sociology-simply-copied-western' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_01_008', title: 'Scope of Sociology: Its Relationship with Economics, Political Science, History and Psychology',
          caseStudy: { intro: 'Imagine you are standing in a busy Delhi metro station during rush hour: people from different states, languages, and economic backgrounds are packed together.',
            decisions: [{ prompt: 'What is the primary focus of classical economics according to the NCERT text, and how does it differ from the sociological approach.', options: [
                { text: 'Classical economics focuses on the inter-relations of pure economic variables such as', outcome: 'Classical economics focuses on the inter-relations of pure economic variables such as price.' },
                { text: 'economics studies money while sociology studies society', outcome: 'Not quite — Students often think "interdisciplinary relationship" means each discipline studies a *separate*.', reveals: 'interdisciplinary-relationship-means-each-discip' },
                { text: 'interdisciplinary relationship', outcome: 'Not quite — Students often think "interdisciplinary relationship" means each discipline studies a *separate*.', reveals: 'interdisciplinary-relationship-means-each-discip' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_01_009', title: 'Sociology and Social Anthropology: Convergence and Distinction',
          caseStudy: { intro: 'Imagine you are at a university department where one professor calls herself a sociologist and another an anthropologist.',
            decisions: [{ prompt: 'According to standard Western textbook definitions (e.g., Giddens), what is the primary distinction between the subject matter of sociology.', options: [
                { text: 'Correct answer: Sociology is defined as "the study of human groups and societies, giving', outcome: 'Correct answer: Sociology is defined as "the study of human groups and societies, giving particular.' },
                { text: 'while social anthropology is defined as', outcome: 'Not quite — Students often believe that "sociology = urban/modern/quantitative" and "anthropology.', reveals: 'sociology-urban-modern-quantitative-and' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often believe that "sociology = urban/modern/quantitative" and "anthropology.', reveals: 'sociology-urban-modern-quantitative-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_01_010', title: 'Feminist Interventions and the Question of Gender in Sociology',
          caseStudy: { intro: 'Imagine you are observing your own household: your mother works full-time but still cooks dinner every night, while your father relaxes after work.',
            decisions: [{ prompt: 'What is the core epistemological difference between feminist sociology and classical sociological traditions (functionalism, Marxism.', options: [
                { text: 'Classical traditions either ignored gender (functionalism saw family as harmonious unit),', outcome: 'Classical traditions either ignored gender (functionalism saw family as harmonious unit), subsumed.' },
                { text: 'feminist sociology just adds women to existing theories', outcome: 'Not quite — Students often equate "feminist sociology" with "studying women\'s problems" or "advocating for.', reveals: 'students-often-equate-feminist-sociology' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a sociology-methods workshop, a student explains the dialectic as \'individual vs society — a battle where one side wins\', and defines sociological imagination as \'empathy: imagining how a homeless person feels.\'',
            decisions: [{ prompt: 'What did Mills and the dialectic actually mean?', options: [
                { text: 'Redefine both terms technically: dialectical means mutual constitution — society exists only through individuals, and individuals become social only through society; even rebellion is socially shaped (its language, tactics, idea of justice). And the sociological imagination is structural mapping — linking personal troubles to public issues: homelessness connects to housing policy, land markets and migration, not just to feeling someone\'s pain.', outcome: 'He stops picturing a war and starts tracing a loop — and treats imagination as an analytical tool that connects biography to structure.' },
                { text: 'Keep the battle reading — dialectic means opposing forces clashing.', outcome: 'Dialectic here is mutual making, not combat: conformity reproduces society and resistance is itself socially formed — neither side can \'win\' its way out.', reveals: 'dialectic-is-conflict' },
                { text: 'Keep the empathy definition — imagining another\'s experience is the point.', outcome: 'Empathy feels; the sociological imagination ANALYSES — Mills\' tool maps private troubles onto institutional and historical structures.', reveals: 'imagination-is-empathy' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_01_010', title: 'You made it',
          caseStudy: { intro: 'The sociologist is a spy among the familiar — the everyday street looks different once you see the structures standing behind it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_007', difficulty: 'standard',
          question: 'The growth of sociology in India refers to the historical process through which.',
          hint: 'Revisit c11_soc_cbse_01_006 (Capitalism and Colonialism) and c11_soc_cbse_01_009.',
          misconception: 'Students often believe Indian sociology simply "copied" western sociology and applied it to India.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the western distinction between sociology (study of modern, industrialised societies) and social anthropology (study of simple.', answer: 'In India, "the other"',
                  options: ['In India, "the other"', 'copied', 'Indian sociology simply "copied" western sociology and applied it to India'],
                  hint: 'Revisit c11_soc_cbse_01_006 (Capitalism and Colonialism) and c11_soc_cbse_01_009 (Sociology and.',
                  misconception: 'Students often believe Indian sociology simply "copied" western sociology and applied it to India.' },
                { id: 'b', prompt: 'Compare the colonial portrayal of the Indian village as "unchanging" and "the infancy of society" with M.N.', answer: 'The colonial view froze Indian society in an evolutionary past to justify rule',
                  options: ['The colonial view froze Indian society in an evolutionary past to justify rule', 'copied', 'Indian sociology simply "copied" western sociology and applied it to India'],
                  hint: 'Revisit c11_soc_cbse_01_006 (Capitalism and Colonialism) and c11_soc_cbse_01_009 (Sociology and.',
                  misconception: 'Students often believe Indian sociology simply "copied" western sociology and applied it to India.' }
          ],
            remediations: { 'indian-sociology-simply-copied-western': { steps: ['If the student holds this misconception, do this 3-step remediation: (1) Give them Ghurye\'s 1932 "Caste and Race.', '(2) Assign Srinivas\'s "Social Change in Modern India" (1966) introduction where he explains why the village study.', '(3) Ask the student to rewrite their misconception as: "Indian sociologists strategically appropriated western methods.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Indian sociology simply "copied" western sociology and applied it to India.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Indian sociology\'s convergence of sociology and social anthropology was a necessary adaptation to India\'s social reality, not merely.', answer: 'The claim is valid',
                  options: ['The claim is valid', 'just a compromise', 'copied', 'Indian sociology simply "copied" western sociology and applied it to India'],
                  hint: 'Revisit c11_soc_cbse_01_006 (Capitalism and Colonialism) and c11_soc_cbse_01_009 (Sociology and.',
                  misconception: 'Students often believe Indian sociology simply "copied" western sociology and applied it to India.' }
          ],
            remediations: { 'indian-sociology-simply-copied-western': { steps: ['If the student holds this misconception, do this 3-step remediation: (1) Give them Ghurye\'s 1932 "Caste and Race.', '(2) Assign Srinivas\'s "Social Change in Modern India" (1966) introduction where he explains why the village study.', '(3) Ask the student to rewrite their misconception as: "Indian sociologists strategically appropriated western methods.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_008', difficulty: 'standard',
          question: 'Sociology is the systematic study of human social life, groups, and societies.',
          hint: 'Revisit c11_soc_cbse_01_003 (sociology as scientific study) and c11_soc_cbse_01_004.',
          misconception: 'Students often think "interdisciplinary relationship" means each discipline studies a *separate* slice of society.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sociology is the systematic study of human social life, groups, and societies that',
                  options: ['Sociology is the systematic study of human social life, groups, and societies that', 'The dialectical relationship between individual and society refers to the ongoing,', 'The sociological imagination is the analytical capacity to perceive the intricate linkage', 'Sociology is the systematic and scientific study of human society, social relationships,'],
                  hint: 'Revisit c11_soc_cbse_01_003 (sociology as scientific study) and c11_soc_cbse_01_004 (sociology vs.',
                  misconception: 'Students often think "interdisciplinary relationship" means each discipline studies a *separate* slice of society (economics → market.' }
          ],
            remediations: { 'interdisciplinary-relationship-means-each-discip': { steps: ['Ask the student to pick one Indian news headline from the past week (e.g., "Farmers\' Protest Enters 100th Day" or "New.', 'Have them write three one-sentence summaries: how an economist, a political scientist, and a sociologist would *each*.', 'Compare the three sentences side-by-side and highlight words that appear in more than one (e.g., "power", "class".', 'Explicitly state: "Sociology\'s job is to explain *why those words appear in all three* — because the same social.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_009', difficulty: 'standard',
          question: 'Sociology is the systematic study of modern, complex, industrialised societies.',
          hint: 'If the Western definitions feel arbitrary, re-read the section "The Intellectual Ideas.',
          misconception: 'Students often believe that "sociology = urban/modern/quantitative" and "anthropology = rural/tribal/qualitative" is.',
          parts: [
                { id: 'a', prompt: 'Compare the Western and Indian trajectories of sociology and social anthropology using the following axes: (a) subject matter, (b) typical method, (c).', answer: 'Correct answer: | Axis | Western Trajectory | Indian Trajectory |',
                  options: ['Correct answer: | Axis | Western Trajectory | Indian Trajectory |', 'Department of Sociology and Social Anthropology', 'India followed the Western model initially but later merged', 'native'],
                  hint: 'If the Western definitions feel arbitrary, re-read the section "The Intellectual Ideas That Went.',
                  misconception: 'Students often believe that "sociology = urban/modern/quantitative" and "anthropology = rural/tribal/qualitative" is a *theoretical* truth.' }
          ],
            remediations: { 'sociology-urban-modern-quantitative-and': { steps: ['Re-read the two Giddens definitions in the text and underline the keywords: "industrialised world" vs.', '"simple societies of non-western...', 'Read the Srinivas quote ("myriad \'others\'...', 'encountered literally next door") and write a one-sentence paraphrase: "In India, cultural difference is not.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_010', difficulty: 'standard',
          question: 'Feminist interventions in sociology refer to theoretical and methodological.',
          hint: 'Revisit c11_soc_cbse_01_002 (Sociological Imagination) and practice converting three.',
          misconception: 'Students often equate "feminist sociology" with "studying women\'s problems" or "advocating for women\'s rights." They.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast how a functionalist sociologist (e.g., Parsons) and a feminist sociologist (e.g., Ann Oakley) would explain the sexual division of labour.', answer: 'Parsons: Instrumental (male) vs',
                  options: ['Parsons: Instrumental (male) vs', 'both agree division exists but disagree on origin'],
                  hint: 'Revisit c11_soc_cbse_01_002 (Sociological Imagination) and practice converting three personal.',
                  misconception: 'Students often equate "feminist sociology" with "studying women\'s problems" or "advocating for women\'s rights." They think adding a chapter.' }
          ],
            remediations: { 'students-often-equate-feminist-sociology': { steps: ['Have the student re-read the glossary definition of "Feminist Theories" in the NCERT textbook (p.', '22) and identify three verbs: *emphasises, explain, overcome*.', 'Ask them to take a classical concept they know (e.g., "socialization" from Chapter 3) and rewrite its definition from.', 'Give them two 100-word passages — one functionalist analysis of family, one feminist — and ask them to highlight every.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
