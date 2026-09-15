import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch01_p1: SimDef = {
    id: 'v3_c11_soc_ch01_p1',
    title: 'Sociology and Society · Part 1/2',
    subtitle: 'Trade empathy for structure — and see biography meet history.',
    classLevel: 11, subject: 'sociology', topic: 'Sociology and Society · Part 1/2',
    chapters: ['c11_soc_ch01'],
    nodeIds: ['c11_soc_cbse_01_001', 'c11_soc_cbse_01_002', 'c11_soc_cbse_01_003', 'c11_soc_cbse_01_004', 'c11_soc_cbse_01_005', 'c11_soc_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sociologist mapping the invisible wiring under everyday life', intro: 'The news reader sees a person without a house; the sociological imagination sees the markets and policies that built the homelessness.', goal: 'Define the sociological imagination and the individual–society dialectic.' },
    discovery: {
        question: 'The \'sociological imagination\' means feeling what a homeless person feels — empathy, upgraded?',
        options: ['No — Mills meant structural mapping: tracing how housing policy, land markets and migration produce the homelessness, not feeling it', 'Yes — imagination is empathy', 'Yes — anyone who reads the news has it', 'No — it\'s just Berger being poetic about spying'],
        answer: 'No — Mills meant structural mapping: tracing how housing policy, land markets and migration produce the homelessness, not feeling it',
        hook: 'And \'dialectical\' isn\'t a fight between individual and society — each constitutes the other; society exists through people, people become social through it.',
    },
    teaching: [
        { title: 'Individual and Society: The Dialectic Relationship', text: 'The dialectical relationship between individual and society refers to the ongoing, dynamic interplay where social structures (institutions, norms, culture, economic systems) shape individual choices.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Apply the imagination to a housing scheme: does gifting houses close a public issue, or leave the structure that produces it untouched?',
        labels: ['Individual and Society', 'Sociological Imagination: Connecting Personal', 'Sociology as a Systematic', 'Sociological Knowledge Versus Common', 'The Enlightenment, Industrial Revolution', 'Capitalism and Colonialism: Global'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_01_001', title: 'Individual and Society: The Dialectic Relationship',
          caseStudy: { intro: 'Start with the relatable scenario: "You\'re choosing subjects for Class 11. Your parents want Science for a \'secure future,\' but you love History.',
            decisions: [{ prompt: 'Define the \'dialectical relationship\' between individual and society in your own words, using the example of subject choice in Class 11.', options: [
                { text: 'The dialectical relationship means society shapes the individual (e.g., job market', outcome: 'The dialectical relationship means society shapes the individual (e.g., job market trends, parental.' },
                { text: 'individual vs society', outcome: 'Not quite — Students often think \'dialectical\' means \'conflict\' or \'argument\' — they write "individual.', reveals: 'dialectical-means-conflict-or-argument' },
                { text: 'The dialectic means society forces you to conform but you can rebel', outcome: 'Not quite — Students often think \'dialectical\' means \'conflict\' or \'argument\' — they write "individual.', reveals: 'dialectical-means-conflict-or-argument' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_01_002', title: 'Sociological Imagination: Connecting Personal Troubles to Public Issues (C. Wright Mills)',
          caseStudy: { intro: 'Imagine a Class 11 student, Rohan, who fails his Economics exam. His parents say "he didn\'t study hard enough" (personal trouble).',
            decisions: [{ prompt: 'Define "sociological imagination" in C. Wright Mills\' own words, specifying the two key elements it enables us to grasp.', options: [
                { text: 'Correct answer: "The sociological imagination enables us to grasp history and biography', outcome: 'Correct answer: "The sociological imagination enables us to grasp history and biography and the.' },
                { text: 'A wrong answer that only mentions', outcome: 'Not quite — Students consistently confuse "sociological imagination" with "empathy" or "putting yourself.', reveals: 'students-consistently-confuse-sociological-imagi' },
                { text: 'seeing things from others\' perspective', outcome: 'Not quite — Students consistently confuse "sociological imagination" with "empathy" or "putting yourself.', reveals: 'students-consistently-confuse-sociological-imagi' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_01_003', title: 'Sociology as a Systematic and Scientific Study of Human Society',
          caseStudy: { intro: 'Imagine you are asked why sociology is called a "science" when it studies people who have feelings, choices, and free will—unlike atoms or cells.',
            decisions: [{ prompt: 'State the precise definition of sociology as a systematic and scientific study according to the NCERT textbook, including the three key.', options: [
                { text: 'Sociology is the study of human social life, groups, and societies that follows', outcome: 'Sociology is the study of human social life, groups, and societies that follows scientific canons.' },
                { text: 'study of society', outcome: 'Not quite — Students often believe that "sociology is a science" means it must use only quantitative methods.', reveals: 'sociology-is-a-science-means' },
                { text: 'sociology is a science', outcome: 'Not quite — Students often believe that "sociology is a science" means it must use only quantitative methods.', reveals: 'sociology-is-a-science-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_01_004', title: 'Sociological Knowledge Versus Common Sense Knowledge',
          caseStudy: { intro: 'Imagine your uncle says, "Poor people are poor because they don\'t work hard enough." This sounds like "common sense" to many.',
            decisions: [{ prompt: 'Define common sense knowledge in one sentence as used in the sociological context.', options: [
                { text: 'Common sense knowledge refers to unreflective, culturally shared beliefs that rely on', outcome: 'Common sense knowledge refers to unreflective, culturally shared beliefs that rely on naturalistic.' },
                { text: 'common sense is just practical wisdom', outcome: 'Not quite — Students often think common sense is just "wrong" and sociology is "right." Actually, common sense.', reveals: 'common-sense-is-just-wrong' },
                { text: 'useful', outcome: 'Not quite — Students often think common sense is just "wrong" and sociology is "right." Actually, common sense.', reveals: 'common-sense-is-just-wrong' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_01_005', title: 'The Enlightenment, Industrial Revolution and French Revolution as Contexts for Sociology\'s Emergence',
          caseStudy: { intro: 'Imagine you are a student in 1820 Manchester, watching children your age work 14-hour shifts in cotton mills while the factory owner\'s children attend private.',
            decisions: [{ prompt: 'What were the two core intellectual commitments of the Enlightenment that directly influenced early sociology\'s ambition to be a science.', options: [
                { text: 'The Enlightenment emphasized (1) reason and individualism as the basis for understanding', outcome: 'The Enlightenment emphasized (1) reason and individualism as the basis for understanding human.' },
                { text: 'Enlightenment was about democracy', outcome: 'Not quite — Students often treat the three revolutions as a mere chronological list ("first Enlightenment, then.', reveals: 'students-often-treat-the-three' },
                { text: 'Enlightenment rejected science', outcome: 'Not quite — Students often treat the three revolutions as a mere chronological list ("first Enlightenment, then.', reveals: 'students-often-treat-the-three' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_01_006', title: 'Capitalism and Colonialism: Global Forces Shaping the Discipline',
          caseStudy: { intro: 'Imagine you are a tea plantation worker in Assam in 1880, descended from Santhal ancestors forcibly recruited from Chotanagpur.',
            decisions: [{ prompt: 'Define capitalism and colonialism as described in the NCERT textbook, and state the precise relationship between them in the context of the.', options: [
                { text: 'Capitalism is a system of economic enterprise based on market exchange where capital', outcome: 'Capitalism is a system of economic enterprise based on market exchange where capital (money.' },
                { text: 'colonialism was just political rule', outcome: 'Not quite — Students often think "industrialisation" is a single uniform process that happened to all countries.', reveals: 'industrialisation-is-a-single-uniform' },
                { text: 'capitalism and colonialism were separate', outcome: 'Not quite — Students often think "industrialisation" is a single uniform process that happened to all countries.', reveals: 'industrialisation-is-a-single-uniform' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a sociology-methods workshop, a student explains the dialectic as \'individual vs society — a battle where one side wins\', and defines sociological imagination as \'empathy: imagining how a homeless person feels.\'',
            decisions: [{ prompt: 'What did Mills and the dialectic actually mean?', options: [
                { text: 'Redefine both terms technically: dialectical means mutual constitution — society exists only through individuals, and individuals become social only through society; even rebellion is socially shaped (its language, tactics, idea of justice). And the sociological imagination is structural mapping — linking personal troubles to public issues: homelessness connects to housing policy, land markets and migration, not just to feeling someone\'s pain.', outcome: 'He stops picturing a war and starts tracing a loop — and treats imagination as an analytical tool that connects biography to structure.' },
                { text: 'Keep the battle reading — dialectic means opposing forces clashing.', outcome: 'Dialectic here is mutual making, not combat: conformity reproduces society and resistance is itself socially formed — neither side can \'win\' its way out.', reveals: 'dialectic-is-conflict' },
                { text: 'Keep the empathy definition — imagining another\'s experience is the point.', outcome: 'Empathy feels; the sociological imagination ANALYSES — Mills\' tool maps private troubles onto institutional and historical structures.', reveals: 'imagination-is-empathy' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'The sociologist is a spy among the familiar — the everyday street looks different once you see the structures standing behind it.',
            decisions: [{ prompt: 'What comes next? Sociology and Society · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Sociology and Society · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_001', difficulty: 'standard',
          question: 'The dialectical relationship between individual and society refers to the.',
          hint: 'If stuck, revisit Class 10 Civics Chapter 3 (Gender, Religion, Caste) and Class 10.',
          misconception: 'Students often think \'dialectical\' means \'conflict\' or \'argument\' — they write "individual vs society" as a battle.',
          parts: [
                { id: 'a', prompt: 'A student says: "Unemployment is a personal trouble because the person didn\'t study hard enough." Using C.', answer: 'Common sense sees unemployment as individual failure (laziness, bad choices)',
                  options: ['Common sense sees unemployment as individual failure (laziness, bad choices)', 'individual vs society', 'The dialectic means society forces you to conform but you can rebel'],
                  hint: 'If stuck, revisit Class 10 Civics Chapter 3 (Gender, Religion, Caste) and Class 10 History Chapter.',
                  misconception: 'Students often think \'dialectical\' means \'conflict\' or \'argument\' — they write "individual vs society" as a battle where one wins.' },
                { id: 'b', prompt: 'Apply the concept of \'relevant society\' to this situation: A Dalit student in a metropolitan city applies for a corporate job.', answer: 'Three relevant societies: (1) Corporate professional society',
                  options: ['Three relevant societies: (1) Corporate professional society', 'individual vs society', 'The dialectic means society forces you to conform but you can rebel'],
                  hint: 'If stuck, revisit Class 10 Civics Chapter 3 (Gender, Religion, Caste) and Class 10 History Chapter.',
                  misconception: 'Students often think \'dialectical\' means \'conflict\' or \'argument\' — they write "individual vs society" as a battle where one wins.' }
          ],
            remediations: { 'dialectical-means-conflict-or-argument': { steps: ['Ask the student to draw two circles overlapping — label one \'Individual\', one \'Society\'.', 'In the overlap, write: "Language, norms, institutions, memory, identity."', 'Ask: "Can you have language without other people? Can you have society without individuals?"', 'Show the Kargil compensation case — trace how the policy (society) interacted with patrilineal family (society).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think \'dialectical\' means \'conflict\' or \'argument\' — they write "individual vs society" as a battle.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The sociological imagination is just a fancy term for \'thinking about society.\' Anyone who reads the news has it." Defend your.', answer: 'The statement is false',
                  options: ['The statement is false', 'individual vs society', 'The dialectic means society forces you to conform but you can rebel'],
                  hint: 'If stuck, revisit Class 10 Civics Chapter 3 (Gender, Religion, Caste) and Class 10 History Chapter.',
                  misconception: 'Students often think \'dialectical\' means \'conflict\' or \'argument\' — they write "individual vs society" as a battle where one wins.' }
          ],
            remediations: { 'dialectical-means-conflict-or-argument': { steps: ['Ask the student to draw two circles overlapping — label one \'Individual\', one \'Society\'.', 'In the overlap, write: "Language, norms, institutions, memory, identity."', 'Ask: "Can you have language without other people? Can you have society without individuals?"', 'Show the Kargil compensation case — trace how the policy (society) interacted with patrilineal family (society).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_002', difficulty: 'standard',
          question: 'The sociological imagination is the analytical capacity to perceive the.',
          hint: 'If stuck, revisit the "Individual and Society: The Dialectic Relationship" node.',
          misconception: 'Students consistently confuse "sociological imagination" with "empathy" or "putting yourself in someone else\'s shoes.".',
          parts: [
                { id: 'a', prompt: 'A Class 12 girl in a rural Bihar school wants to study Computer Science but is pressured to take Home Science.', answer: 'Correct answer: Personal trouble = her individual subject choice conflict',
                  options: ['Correct answer: Personal trouble = her individual subject choice conflict', 'society\'s mindset', 'parental pressure', 'sociological imagination'],
                  hint: 'If stuck, revisit the "Individual and Society: The Dialectic Relationship" node.',
                  misconception: 'Students consistently confuse "sociological imagination" with "empathy" or "putting yourself in someone else\'s shoes." They think Mills.' }
          ],
            remediations: { 'students-consistently-confuse-sociological-imagi': { steps: ['If a student equates sociological imagination with empathy: (1) Give them two explanations of farmer suicide — one.', '(2) Ask: "Which explanation helps design a *policy*?" (3) Have them practice the "Mills Mapping Template": Personal.', 'Repeat with 3 distinct cases until they stop using feeling-words and start naming institutions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_003', difficulty: 'standard',
          question: 'Sociology is the systematic and scientific study of human society, social.',
          hint: 'If stuck, revisit the "job market and subject choice" example from Node 001 and the C.',
          misconception: 'Students often believe that "sociology is a science" means it must use only quantitative methods (surveys, statistics).',
          parts: [
                { id: 'a', prompt: 'State the precise definition of sociology as a systematic and scientific study according to the NCERT textbook, including the three key criteria that.', answer: 'Sociology is the study of human social life, groups, and societies that follows',
                  options: ['Sociology is the study of human social life, groups, and societies that follows', 'study of society', 'sociology is a science', 'unscientific'],
                  hint: 'If stuck, revisit the "job market and subject choice" example from Node 001 and the C.',
                  misconception: 'Students often believe that "sociology is a science" means it must use only quantitative methods (surveys, statistics) and that qualitative.' },
                { id: 'b', prompt: 'A student claims: "Sociology is just common sense made complicated.', answer: 'Step 1: Identify the common sense claim—"joint families are breaking down',
                  options: ['Step 1: Identify the common sense claim—"joint families are breaking down', 'reasons for breakdown', 'sociology is a science', 'unscientific'],
                  hint: 'If stuck, revisit the "job market and subject choice" example from Node 001 and the C.',
                  misconception: 'Students often believe that "sociology is a science" means it must use only quantitative methods (surveys, statistics) and that qualitative.' }
          ],
            remediations: { 'sociology-is-a-science-means': { steps: ['If the student holds this misconception, do NOT simply define "qualitative research." Instead: (1) Give them two 1-page.', 'How could another researcher check their work?" (3) Guide them to identify: sampling logic, recording procedures.', '(4) Conclude: "Science is the *discipline* of the method, not the *type* of data."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_004', difficulty: 'standard',
          question: 'Sociological knowledge is a systematically derived understanding of social.',
          hint: 'Revisit the definition of sociology as a scientific discipline and the concept.',
          misconception: 'Students often think common sense is just "wrong" and sociology is "right." Actually, common sense is unreflective.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sociological knowledge is a systematically derived understanding of social phenomena',
                  options: ['Sociological knowledge is a systematically derived understanding of social phenomena', 'The dialectical relationship between individual and society refers to the ongoing,', 'The sociological imagination is the analytical capacity to perceive the intricate linkage', 'Sociology is the systematic and scientific study of human society, social relationships,'],
                  hint: 'Revisit the definition of sociology as a scientific discipline and the concept of empirical.',
                  misconception: 'Students often think common sense is just "wrong" and sociology is "right." Actually, common sense is unreflective practical knowledge.' }
          ],
            remediations: { 'common-sense-is-just-wrong': { steps: ['Ask them to list three things "everyone knows" about a topic (e.g., marriage).', 'Show how sociological studies have complicated each (e.g., "marriage is universal" → Nayar kinship; "love marriage.', 'Emphasize that sociology doesn\'t discard common sense but subjects it to empirical test — the *method* is the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_005', difficulty: 'standard',
          question: 'The Enlightenment (late 17th–18th century European intellectual movement.',
          hint: 'Revisit c11_soc_cbse_01_002 (Sociological Imagination) and practice converting three.',
          misconception: 'Students often treat the three revolutions as a mere chronological list ("first Enlightenment, then Industrial.',
          parts: [
                { id: 'a', prompt: 'A student argues: "The Industrial Revolution happened in England, so why does NCERT say Indian sociology must study European origins?', answer: 'Step 1: Capitalism in the West entailed worldwide expansion',
                  options: ['Step 1: Capitalism in the West entailed worldwide expansion', 'Auguste Comte founded sociology'],
                  hint: 'Revisit c11_soc_cbse_01_002 (Sociological Imagination) and practice converting three personal.',
                  misconception: 'Students often treat the three revolutions as a mere chronological list ("first Enlightenment, then Industrial Revolution, then French.' }
          ],
            remediations: { 'students-often-treat-the-three': { steps: ['If a student cannot explain the *interconnections* between the three revolutions, do this 4-step remediation: (1) Draw.', '(2) On each edge, write one specific causal link from the NCERT text (e.g., Enlightenment→Industrial: "scientific.', '(3) Ask the student to pick *one* early sociologist (Comte, Marx, Spencer) and trace how *all three* vertices shaped.', '(4) Have them rewrite the "chronological list" paragraph as a "causal triangle" paragraph using the edges they drew.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_01_006', difficulty: 'standard',
          question: 'Capitalism is an economic system based on private ownership of the means.',
          hint: 'Revisit C. Wright Mills\' distinction between "troubles" and "issues" (node 002) and the.',
          misconception: 'Students often think "industrialisation" is a single uniform process that happened to all countries similarly.',
          parts: [
                { id: 'a', prompt: 'A student argues: "The indentured labour system (girmitiya) was just a labour contract; slavery was abolished, so these workers were free." Using the NCERT\'s.', answer: 'The claim is sociologically inadequate',
                  options: ['The claim is sociologically inadequate', 'industrialisation'],
                  hint: 'Revisit C. Wright Mills\' distinction between "troubles" and "issues" (node 002) and the textbook\'s.',
                  misconception: 'Students often think "industrialisation" is a single uniform process that happened to all countries similarly.' }
          ],
            remediations: { 'industrialisation-is-a-single-uniform': { steps: ['**Confront the data**: Show the 1810/1910 urbanisation statistics for Britain alongside India\'s census data (1901.', 'Ask: "If industrialisation automatically causes urbanisation, why did India\'s urban share barely rise during peak.', '**Trace the commodity chain**: Map cotton: Indian raw cotton → Lancashire mills → Manchester cloth → Indian markets →.', 'Have the student draw this flow chart.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
