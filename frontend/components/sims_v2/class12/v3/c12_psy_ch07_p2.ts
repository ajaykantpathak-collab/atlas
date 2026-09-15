import type { SimDef } from '../../engine/types';

/** v3 generated — c12_psy_ch07_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_psy_ch07_p2: SimDef = {
    id: 'v3_c12_psy_ch07_p2',
    title: 'Social Influence and Group Processes · Part 2/2',
    subtitle: 'Same stadium, same scream — still not a group',
    classLevel: 12, subject: 'psychology', topic: 'Social Influence and Group Processes · Part 2/2',
    chapters: ['c12_psy_ch07'],
    nodeIds: ['c12_psy_cbse_07_007', 'c12_psy_cbse_07_008', 'c12_psy_cbse_07_009', 'c12_psy_cbse_07_010', 'c12_psy_cbse_07_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Group psychologist', intro: 'A project team where one member\'s silence stalls everyone is a group; a concert audience isn\'t. The difference is structure.', goal: 'Apply the five criteria of a group — and distinguish it from crowd, team and audience.' },
    discovery: {
        question: 'Thousands scream for the same band at a concert — and if your neighbour leaves, nothing changes for you. Why isn\'t that a group?',
        options: ['No interdependence or roles — a crowd shares a moment, not a fate; a group needs mutual dependence, roles, norms and a felt \'we\'', 'Too many people', 'They came alone', 'Noise isn\'t shared'],
        answer: 'No interdependence or roles — a crowd shares a moment, not a fate; a group needs mutual dependence, roles, norms and a felt \'we\'',
        hook: '\'All teams are groups, but not all groups are teams\' — a family is a group without complementary skills or mutual accountability; a project where the leader does everything is a group failing to be a team. Structure and interdependence, not proximity, make the group.',
    },
    teaching: [
        { title: 'Types of Groups: Primary and Secondary, Formal and Informal, Ingroup and Outgroup', text: 'Groups are organised systems of two or more interacting and interdependent individuals with common motives, defined role relationships, and shared norms; they are classified into primary/secondary.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_psy_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort real collections by the five criteria: label a metro queue, a student council, spectators and a cricket XI — then design the minimal-group experiment that creates bias from nothing.',
        labels: ['Types of Groups: Primary', 'Ingroup and Outgroup: Tajfel\'s', 'Social Facilitation: Influence', 'Social Loafing: Causes, Latane\'s', 'Group Polarisation: Strengthening'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_psy_cbse_07_007', title: 'Types of Groups: Primary and Secondary, Formal and Informal, Ingroup and Outgroup',
          caseStudy: { intro: 'Imagine you are the captain of your school cricket team (formal, secondary, ingroup for you) playing against a rival school (outgroup).',
            decisions: [{ prompt: 'A student says: "My family is a primary group because we live together, and my classroom is a secondary group because we study together.".', options: [
                { text: 'The reasoning is partially correct but incomplete', outcome: 'The reasoning is partially correct but incomplete. Family is primary because it is pre-existing.' },
                { text: 'primary group = small group', outcome: 'Not quite — Students believe "primary group = small group" and "secondary group = large group".', reveals: 'primary-group-small-group-and' },
                { text: 'secondary group = large group', outcome: 'Not quite — Students believe "primary group = small group" and "secondary group = large group".', reveals: 'primary-group-small-group-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_07_008', title: 'Ingroup and Outgroup: Tajfel\'s Minimal Group Paradigm Experiments',
          caseStudy: { intro: 'Imagine you are randomly assigned to "Red House" or "Blue House" on your first day of Class 12 — you have never met your housemates, there are no prizes,.',
            decisions: [{ prompt: 'In Tajfel\'s Minimal Group Paradigm, what was the basis for assigning British schoolboys to the "Kandinsky group" or "Klee group"?', options: [
                { text: 'The boys were grouped based on their stated preference for paintings by Vassily Kandinsky', outcome: 'The boys were grouped based on their stated preference for paintings by Vassily Kandinsky or Paul.' },
                { text: 'based on their existing friendships', outcome: 'Not quite — Students often believe Tajfel\'s Minimal Group Paradigm shows that *prejudice requires no reason.', reveals: 'tajfel-s-minimal-group-paradigm' },
                { text: 'based on academic ability', outcome: 'Not quite — Students often believe Tajfel\'s Minimal Group Paradigm shows that *prejudice requires no reason.', reveals: 'tajfel-s-minimal-group-paradigm' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_07_009', title: 'Social Facilitation: Influence of Others\' Presence on Individual Performance',
          caseStudy: { intro: 'Imagine you are practicing a dance routine alone in your room versus performing it on stage in front of an audience. Why does your performance change?',
            decisions: [{ prompt: 'Define social facilitation and state the two key factors that determine whether performance improves or declines.', options: [
                { text: 'Social facilitation is the change in individual performance due to the presence of others', outcome: 'Social facilitation is the change in individual performance due to the presence of others.' },
                { text: 'people always perform better when others are watching', outcome: 'Not quite — Students often believe social facilitation means "people always perform better when others are.', reveals: 'social-facilitation-means-people-always' },
                { text: 'social facilitation means "people always perform better when others are watching', outcome: 'Not quite — Students often believe social facilitation means "people always perform better when others are.', reveals: 'social-facilitation-means-people-always' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_07_010', title: 'Social Loafing: Causes, Latane\'s Experiments and Reduction Strategies',
          caseStudy: { intro: 'Imagine you are assigned a group project for your Class 12 board practical. Four students are supposed to research, write, and present.',
            decisions: [{ prompt: 'Define social loafing in one sentence using the exact NCERT phrasing for "collective task" and "outputs are pooled."', options: [
                { text: 'Correct: "Social loafing is a reduction in individual effort when working on a collective', outcome: 'Correct: "Social loafing is a reduction in individual effort when working on a collective task.' },
                { text: 'A wrong answer that says', outcome: 'Not quite — Students equate social loafing with "laziness" or "free riding" as a personality trait.', reveals: 'students-equate-social-loafing-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_07_011', title: 'Group Polarisation: Strengthening of Group\'s Initial Position through Discussion',
          caseStudy: { intro: 'Imagine your class WhatsApp group discussing whether the school should cancel the upcoming exam. Initially, most students are mildly in favour.',
            decisions: [{ prompt: 'Define group polarisation in one sentence and state whether it always leads to riskier decisions.', options: [
                { text: 'Group polarisation is the strengthening of a group\'s initial position through discussion,', outcome: 'Group polarisation is the strengthening of a group\'s initial position through discussion, making.' },
                { text: 'risky shift', outcome: 'Not quite — Students often confuse group polarisation with groupthink because both involve groups making.', reveals: 'students-often-confuse-group-polarisation' },
                { text: 'because both involve groups making extreme/poor decisions', outcome: 'Not quite — Students often confuse group polarisation with groupthink because both involve groups making.', reveals: 'students-often-confuse-group-polarisation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Same coding club, two new members: Asha joins because \'nobody messes with the club\'s members,\' while Dev joins because \'the seniors here can teach me real projects.\'',
            decisions: [{ prompt: 'Which distinct group-joining motives are operating?', options: [
                { text: 'Security for Asha — the group buffers threat — and knowledge/information for Dev — the group grants access he\'d lack alone; same membership, different needs, which is why one group can recruit on several motives at once.', outcome: 'The chapter\'s six-need framework: identical joining behaviour can be powered by different needs, so reading motives from the group instead of the member mislabels both.' },
                { text: 'Both joined for goal achievement — the club helps both get what they want.', outcome: 'That flattens two distinct needs into one — protection from threat and access to knowledge are separate motives in the framework; \'wanting something\' is too loose to do the analysis.', reveals: 'all-motives-are-goals' },
                { text: 'Both joined for status — club membership elevates them socially.', outcome: 'Neither described prestige — Asha described safety, Dev described learning; status is external recognition, and assuming every join is about looking good misses the six-way map.', reveals: 'every-join-is-status' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_07_011', title: 'You made it',
          caseStudy: { intro: 'You can now tell a gathering from a group — and see that \'we\' is built from interdependence, not headcount.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_07_007', difficulty: 'standard',
          question: 'Groups are organised systems of two or more interacting and interdependent.',
          hint: 'Revisit c12_psy_cbse_07_001 "Nature of Groups" — focus on the four defining.',
          misconception: 'Students believe "primary group = small group" and "secondary group = large group".',
          parts: [
                { id: 'a', prompt: 'A student says: "My family is a primary group because we live together, and my classroom is a secondary group because we study together." Is this reasoning.', answer: 'The reasoning is partially correct but incomplete',
                  options: ['The reasoning is partially correct but incomplete', 'primary group = small group', 'secondary group = large group', '"primary group = small group" and "secondary group = large group"'],
                  hint: 'Revisit c12_psy_cbse_07_001 "Nature of Groups" — focus on the four defining characteristics and the.',
                  misconception: 'Students believe "primary group = small group" and "secondary group = large group".' },
                { id: 'b', prompt: '"All formal groups are secondary groups, and all informal groups are primary groups." Evaluate this statement with one supporting example and one.', answer: 'The statement is false',
                  options: ['The statement is false', 'primary group = small group', 'secondary group = large group', '"primary group = small group" and "secondary group = large group"'],
                  hint: 'Revisit c12_psy_cbse_07_001 "Nature of Groups" — focus on the four defining characteristics and the.',
                  misconception: 'Students believe "primary group = small group" and "secondary group = large group".' }
          ],
            remediations: { 'primary-group-small-group-and': { steps: ['Have student list 10 groups they belong to (family, class, WhatsApp group, sports team, tuition, religious community.', 'For each, answer three binary questions: (a) Were you born/ascribed into it or did you choose it?', 'Map answers to: (a) Primary if ascribed, Secondary if chosen; (b) Formal if written rules, Informal if emergent; (c).', 'Identify groups where size misled them (e.g., small tuition = secondary; large family reunion = primary).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "primary group = small group" and "secondary group = large group".',
          parts: [
                { id: 'a', prompt: 'Critique the NCERT claim: "In the primary group, boundaries are less permeable, i.e.', answer: 'The claim reflects traditional sociology but needs qualification',
                  options: ['The claim reflects traditional sociology but needs qualification', 'changing schools', 'primary group = small group', 'secondary group = large group'],
                  hint: 'Revisit c12_psy_cbse_07_001 "Nature of Groups" — focus on the four defining characteristics and the.',
                  misconception: 'Students believe "primary group = small group" and "secondary group = large group".' },
                { id: 'b', prompt: 'Design a 2x2 matrix study to test whether "formal vs informal structure" and "primary vs secondary intimacy" independently affect social loafing.', answer: 'the four group types, (',
                  options: ['the four group types, (', 'primary group = small group', 'secondary group = large group', '"primary group = small group" and "secondary group = large group"'],
                  hint: 'Revisit c12_psy_cbse_07_001 "Nature of Groups" — focus on the four defining characteristics and the.',
                  misconception: 'Students believe "primary group = small group" and "secondary group = large group".' }
          ],
            remediations: { 'primary-group-small-group-and': { steps: ['Have student list 10 groups they belong to (family, class, WhatsApp group, sports team, tuition, religious community.', 'For each, answer three binary questions: (a) Were you born/ascribed into it or did you choose it?', 'Map answers to: (a) Primary if ascribed, Secondary if chosen; (b) Formal if written rules, Informal if emergent; (c).', 'Identify groups where size misled them (e.g., small tuition = secondary; large family reunion = primary).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_07_008', difficulty: 'standard',
          question: 'Ingroup refers to the social group to which an individual psychologically.',
          hint: 'Revisit c12_psy_cbse_07_001 (Nature of Groups) and c11_soc_cbse_02_002 (Social Groups).',
          misconception: 'Students often believe Tajfel\'s Minimal Group Paradigm shows that *prejudice requires no reason at all* — interpreting.',
          parts: [
                { id: 'a', prompt: 'A student says: "Tajfel\'s experiment proves that prejudice comes from competition over resources." Explain why this statement is incorrect using the specific.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'minimal', 'zero psychological process', 'People discriminate for no reason'],
                  hint: 'Revisit c12_psy_cbse_07_001 (Nature of Groups) and c11_soc_cbse_02_002 (Social Groups) to clarify.',
                  misconception: 'Students often believe Tajfel\'s Minimal Group Paradigm shows that *prejudice requires no reason at all* — interpreting "minimal" as "zero.' },
                { id: 'b', prompt: 'In the sample distribution matrix shown in NCERT Box 7.2, an ingroup member can receive points 7–19 while an outgroup member receives 1–25.', answer: '(Ingroup: 13, Outgroup: 13) indicates *fairness/equality* strategy',
                  options: ['(Ingroup: 13, Outgroup: 13) indicates *fairness/equality* strategy', 'minimal', 'zero psychological process', 'People discriminate for no reason'],
                  hint: 'Revisit c12_psy_cbse_07_001 (Nature of Groups) and c11_soc_cbse_02_002 (Social Groups) to clarify.',
                  misconception: 'Students often believe Tajfel\'s Minimal Group Paradigm shows that *prejudice requires no reason at all* — interpreting "minimal" as "zero.' }
          ],
            remediations: { 'tajfel-s-minimal-group-paradigm': { steps: ['If a student holds the "no reason" misconception: (1) Have them re-read Box 7.2 and identify the *psychological step*.', '(3) Assign a 150-word explanation of how Social Identity Theory (Tajfel & Turner, 1979) explains the *motivation*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_07_009', difficulty: 'standard',
          question: 'Social facilitation refers to the phenomenon where the presence of others (as.',
          hint: 'If stuck, revisit Class 11 Psychology Chapter 8 (Motivation and Emotion) on the.',
          misconception: 'Students often believe social facilitation means "people always perform better when others are watching." They confuse.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the presence of others leads to better performance on a well-practiced piano piece but worse performance on a new, difficult.', answer: 'The presence of others increases physiological arousal',
                  options: ['The presence of others increases physiological arousal', 'nervousness', 'people always perform better when others are watching', 'social facilitation means "people always perform better when others are watching'],
                  hint: 'If stuck, revisit Class 11 Psychology Chapter 8 (Motivation and Emotion) on the relationship.',
                  misconception: 'Students often believe social facilitation means "people always perform better when others are watching." They confuse it with social.' },
                { id: 'b', prompt: 'A student is learning to solve a Rubik\'s cube. She can solve it in 5 minutes when alone.', answer: 'The student is a novice',
                  options: ['The student is a novice', 'people always perform better when others are watching', 'predicts the expert would also slow down ignores the task-complexity interaction', 'social facilitation means "people always perform better when others are watching'],
                  hint: 'If stuck, revisit Class 11 Psychology Chapter 8 (Motivation and Emotion) on the relationship.',
                  misconception: 'Students often believe social facilitation means "people always perform better when others are watching." They confuse it with social.' },
                { id: 'c', prompt: 'Compare and contrast social facilitation and social loafing on the following dimensions: (a) nature of task (individual vs.', answer: 'nature of task (individual vs',
                  options: ['nature of task (individual vs', 'people always perform better when others are watching', 'confuses the two (e', 'social facilitation means "people always perform better when others are watching'],
                  hint: 'If stuck, revisit Class 11 Psychology Chapter 8 (Motivation and Emotion) on the relationship.',
                  misconception: 'Students often believe social facilitation means "people always perform better when others are watching." They confuse it with social.' }
          ],
            remediations: { 'social-facilitation-means-people-always': { steps: ['If a student holds this misconception, first revisit Zajonc\'s drive theory: arousal strengthens dominant response.', 'Then use a concrete example: typing a familiar sentence (simple) vs.', 'typing a new language script (complex) in front of class.', 'Have them predict and then test (or simulate) the outcome.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_07_010', difficulty: 'standard',
          question: 'Social loafing is the phenomenon where individuals exert less effort when.',
          hint: 'If confused about "collective task," revisit c12_psy_cbse_07_001 (group definition) and.',
          misconception: 'Students equate social loafing with "laziness" or "free riding" as a personality trait.',
          parts: [
                { id: 'a', prompt: 'In Latane\'s experiment, participants clapped/cheered alone, in pairs, in groups of four, and in groups of six.', answer: 'The student has reversed the finding',
                  options: ['The student has reversed the finding', 'group performance', 'individual contribution'],
                  hint: 'If confused about "collective task," revisit c12_psy_cbse_07_001 (group definition) and.',
                  misconception: 'Students equate social loafing with "laziness" or "free riding" as a personality trait.' }
          ],
            remediations: { 'students-equate-social-loafing-with': { steps: ['Re-read the NCERT paragraph "Why does social loafing occur?" and list the five causes verbatim.', 'For each cause, write one real-life classroom example where that specific cause operates (e.g., diffusion.', 'Take the diagnostic question 3 again — if you still pick wrong causes, re-watch a 5-min video on "Latane social loafing.', 'Explain the difference between social loafing and social facilitation to a peer using the 2x3 table from Diagnostic 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_07_011', difficulty: 'standard',
          question: 'Group polarisation is the tendency for group discussion to strengthen the.',
          hint: 'Revisit c12_psy_cbse_07_005 (Group Structure) for cohesiveness/norms and.',
          misconception: 'Students often confuse group polarisation with groupthink because both involve groups making extreme/poor decisions.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast group polarisation and groupthink on: (a) role of cohesiveness, (b) quality of decision outcome, (c) presence of dissent.', answer: 'role of cohesiveness, (',
                  options: ['role of cohesiveness, (', 'both suppress dissent', 'because both involve groups making extreme/poor decisions'],
                  hint: 'Revisit c12_psy_cbse_07_005 (Group Structure) for cohesiveness/norms and c12_psy_cbse_07_008.',
                  misconception: 'Students often confuse group polarisation with groupthink because both involve groups making extreme/poor decisions.' }
          ],
            remediations: { 'students-often-confuse-group-polarisation': { steps: ['Re-read the NCERT paragraph "Why does group polarisation occur?" and list the three bullet points as separate.', 'Create a two-column table: left column = groupthink features (from Box 7.1), right column = group polarisation features.', 'For each mechanism, generate a one-sentence example from your own life (e.g., "When my cricket team discussed the.', 'Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
