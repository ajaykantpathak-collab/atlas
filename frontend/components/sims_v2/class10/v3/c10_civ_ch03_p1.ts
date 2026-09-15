import type { SimDef } from '../../engine/types';

/** v3 generated — c10_civ_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_civ_ch03_p1: SimDef = {
    id: 'v3_c10_civ_ch03_p1',
    title: 'Gender, Religion and Caste · Part 1/2',
    subtitle: 'Expose the unpaid second shift hiding inside \'normal\' family life',
    classLevel: 10, subject: 'civics', topic: 'Gender, Religion and Caste · Part 1/2',
    chapters: ['c10_civ_ch03'],
    nodeIds: ['c10_civ_cbse_03_001', 'c10_civ_cbse_03_002', 'c10_civ_cbse_03_003', 'c10_civ_cbse_03_004', 'c10_civ_cbse_03_005', 'c10_civ_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a social researcher measuring work that never appears in GDP', intro: 'A mother nurses patients all day, then cooks dinner while everyone watches TV — and calls it duty. Your job is to make the invisible work visible.', goal: 'Define sexual division of labour and the public-private divide, and connect them to women\'s political participation.' },
    discovery: {
        question: 'Riya and Rahul are both software engineers working nine hours a day. At home, Riya does 100% of the cooking, cleaning and childcare — and the family praises her for \'managing so well.\' What\'s actually going on?',
        options: ['Sexual division of labour — her paid job is visible, her second unpaid shift at home is treated as natural', 'Nothing — she simply enjoys housework more than Rahul', 'A fair split — equal office hours means equal total work', 'A private family choice that no concept can describe'],
        answer: 'Sexual division of labour — her paid job is visible, her second unpaid shift at home is treated as natural',
        hook: 'The trick is calling it \'natural.\' Once housework is labelled a woman\'s duty, her double burden stops looking like inequality — and starts looking like praise.',
    },
    teaching: [
        { title: 'Gender and Politics: Sexual Division of Labour', text: 'Sexual division of labour refers to a system in which work is divided between men and women based on gender stereotypes, assigning domestic and care work (cooking, cleaning, childcare) primarily.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_civ_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Audit one day in a household: log every task, tag who does it and whether it\'s paid — then expose where the \'public\' world ends and the invisible \'private\' workload begins.',
        labels: ['Gender and Politics: Sexual', 'Public/Private Division: Women\'s Role', 'Women\'s Political Representation', 'Religion, Communalism and Politics', 'Caste and Politics: How', 'Politics in Caste: How'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_civ_cbse_03_001', title: 'Gender and Politics: Sexual Division of Labour',
          caseStudy: { intro: 'Imagine a Class 10 student, Priya, noticing her mother works full-time as a nurse but still cooks dinner for the family every night while her father watches.',
            decisions: [{ prompt: 'Define \'sexual division of labour\' in one sentence and give one example from an Indian household.', options: [
                { text: 'Correct answer: Sexual division of labour is a system where work is assigned based on', outcome: 'Correct answer: Sexual division of labour is a system where work is assigned based on gender, e.g.' },
                { text: 'women are naturally better at cooking', outcome: 'Not quite — Students think sexual division of labour means "women do housework, men do office work" as.', reveals: 'sexual-division-of-labour-means' },
                { text: 'women do housework, men do office work', outcome: 'Not quite — Students think sexual division of labour means "women do housework, men do office work" as.', reveals: 'sexual-division-of-labour-means' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_03_002', title: 'Public/Private Division: Women\'s Role and Feminist Movements',
          caseStudy: { intro: 'Imagine a Class 10 student, Priya, notices her mother manages all household chores and childcare while her father works outside.',
            decisions: [{ prompt: 'Define the term "public-private division" in the context of gender and politics.', options: [
                { text: 'The public-private division is the allocation of men to the public sphere (politics,', outcome: 'The public-private division is the allocation of men to the public sphere (politics, market, paid.' },
                { text: 'equal rights', outcome: 'Not quite — Students often think feminist movements only want women to enter the public sphere (jobs, politics).', reveals: 'feminist-movements-only-want-women' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_03_003', title: 'Women\'s Political Representation and the Need for Reservation',
          caseStudy: { intro: 'Imagine you are reading a newspaper headline: "Women\'s Reservation Bill Passed: 33% Seats Reserved in Lok Sabha." You wonder: "But we already have voting.',
            decisions: [{ prompt: 'What are the two Constitutional Amendments that mandated reservation of one-third seats for women in Panchayats and Municipalities, and.', options: [
                { text: 'The 73rd Constitutional Amendment Act (1992) inserted Article 243D for Panchayats, and', outcome: 'The 73rd Constitutional Amendment Act (1992) inserted Article 243D for Panchayats, and the 74th.' },
                { text: 'currently 33% seats are reserved in Parliament', outcome: 'Not quite — **Misconception**: "The Women\'s Reservation Bill (106th Amendment) has already given women 33%.', reveals: 'misconception-the-women-s-reservation' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_03_004', title: 'Religion, Communalism and Politics: Secularism in India',
          caseStudy: { intro: 'Imagine you see a news clip where a candidate says, “Vote for me because I will protect our religion.” Ask: Is this appeal allowed in a secular democracy?',
            decisions: [{ prompt: 'What is the exact constitutional status of the word “secular” in the Indian Preamble, and which amendment inserted it?', options: [
                { text: 'The word “secular” was added to the Preamble by the 42nd Constitutional Amendment Act,', outcome: 'The word “secular” was added to the Preamble by the 42nd Constitutional Amendment Act, 1976.' },
                { text: 'it was in the original 1950 Constitution', outcome: 'Not quite — Students often think Indian secularism means the State must stay completely out of religion (like.', reveals: 'indian-secularism-means-the-state' },
                { text: 'it was added by the 44th Amendment', outcome: 'Not quite — Students often think Indian secularism means the State must stay completely out of religion (like.', reveals: 'indian-secularism-means-the-state' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_03_005', title: 'Caste and Politics: How Caste Influences Political Choices',
          caseStudy: { intro: 'Imagine you are watching a news debate before the Uttar Pradesh assembly elections: analysts keep saying "the Yadav vote will go to Party A, the Jatav vote.',
            decisions: [{ prompt: 'What is meant by the term "vote bank" in the context of caste and Indian elections?', options: [
                { text: 'A "vote bank" refers to a cohesive group of voters from a particular caste or community', outcome: 'A "vote bank" refers to a cohesive group of voters from a particular caste or community who tend.' },
                { text: 'a bank where votes are deposited', outcome: 'Not quite — Students often think "caste influences politics" means every voter blindly votes for their caste.', reveals: 'caste-influences-politics-means-every' },
                { text: 'a list of registered voters', outcome: 'Not quite — Students often think "caste influences politics" means every voter blindly votes for their caste.', reveals: 'caste-influences-politics-means-every' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_03_006', title: 'Politics in Caste: How Politics Influences Caste Identities',
          caseStudy: { intro: 'Imagine you are watching a news debate before the Uttar Pradesh elections: a political leader announces a new "Mahadalit" sub-category within Scheduled Castes.',
            decisions: [{ prompt: 'What is the key difference between "caste influencing politics" and "politics influencing caste"? Give one example of each.', options: [
                { text: '"Caste influencing politics" means pre-existing caste groups pressure parties for', outcome: '"Caste influencing politics" means pre-existing caste groups pressure parties for tickets/policies.' },
                { text: 'politics influencing caste', outcome: 'Not quite — Students think "politics influencing caste" only means politicians exploiting caste for votes.', reveals: 'politics-influencing-caste-only-means' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_03_001', title: 'A real-world call',
          caseStudy: { intro: 'A political party can win an election by appealing to one religion\'s voters, or take the harder road of building a coalition across communities. The first path is faster. The second is harder.',
            decisions: [{ prompt: 'Is winning by division ever justified if the party then governs well?', options: [
                { text: 'Yes — good governance redeems a divisive campaign', outcome: 'This judges ends over means — but the campaign\'s damage to social trust doesn\'t vanish when the government performs.' },
                { text: 'No — the method poisons the outcome', outcome: 'This holds that democracy\'s rules matter as much as results — a government built on division carries that division into power.' },
                { text: 'It depends on how deep the division goes', outcome: 'The realist\'s answer — but \'acceptable\' division is a line everyone draws differently, and moving it is how democracies erode.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Both parents in a household work the same nine-hour day at their offices. Every evening the mother also cooks, cleans, and helps the children with homework while the father rests. Relatives praise her as a \'superwoman\' who \'manages it all so well.\'',
            decisions: [{ prompt: 'What is this arrangement really showing, beyond one person\'s efficiency?', options: [
                { text: 'It is the sexual division of labour — paid work is shared but unpaid housework and childcare fall entirely on her, a \'double burden\' of invisible work that is praised instead of shared. Equal office hours do not mean equal total work.', outcome: 'Calling it a division of labour names the pattern: society assigns domestic work to women as a duty, and that unpaid load — invisible in income statistics — limits their time and opportunities.' },
                { text: 'It is just efficient household management — she does the home tasks because she is naturally better at them, so everyone benefits.', outcome: 'Skill at cooking and cleaning is learned, not born — treating it as natural hides the unpaid hours she contributes and makes the unfair load look like talent.', reveals: 'housework-is-natural' },
                { text: 'Since she is praised and appreciated, no inequality exists — recognition makes the arrangement fair.', outcome: 'Praise does not reduce her hours or return her time; \'superwoman\' compliments often mask the double burden rather than fix it.', reveals: 'praise-equals-equality' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Politics doesn\'t stop at the doorstep. The public-private divide decides whose work counts as work — and feminism\'s demand is simple: count all of it, share all of it.',
            decisions: [{ prompt: 'What comes next? Gender, Religion and Caste · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Gender, Religion and Caste · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_civ_cbse_03_001', difficulty: 'standard',
          question: 'Sexual division of labour refers to a system in which work is divided between.',
          hint: 'Revisit c8_civ_ch4_10 (Discrimination) and c6_civics_ch14_033 (Challenges of Diversity).',
          misconception: 'Students think sexual division of labour means "women do housework, men do office work" as a neutral description.',
          parts: [
                { id: 'a', prompt: 'Why is sexual division of labour considered a *political* problem and not just a family matter? Explain using the concept of \'public vs. private sphere\'.', answer: 'Correct answer: It is political',
                  options: ['Correct answer: It is political', 'it\'s a personal choice', 'women do housework, men do office work', 'Indian culture values women\'s role in the home'],
                  hint: 'Revisit c8_civ_ch4_10 (Discrimination) and c6_civics_ch14_033 (Challenges of Diversity) to see how.',
                  misconception: 'Students think sexual division of labour means "women do housework, men do office work" as a neutral description of *what happens*.' }
          ],
            remediations: { 'sexual-division-of-labour-means': { steps: ['Show the student Time Use Survey 2019 data (NSSO) — women spend 4.5 hrs/day on unpaid work, men 1.5 hrs.', 'Ask: "If this were natural, why do Scandinavian men do 3 hrs/day?"', 'Read NCERT Class 10 Ch.4 box "The Sexual Division of Labour" — highlight the phrase "not biological but social."', 'Rewrite the misconception as: "Society *assigns* domestic work to women — this is a political choice, not nature."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think sexual division of labour means "women do housework, men do office work" as a neutral description.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "If women want political power, they should just negotiate with their families to share housework." Is this a sufficient solution? Why or why not?', answer: 'Correct answer: No',
                  options: ['Correct answer: No', 'yes, families can change', 'women do housework, men do office work', 'Indian culture values women\'s role in the home'],
                  hint: 'Revisit c8_civ_ch4_10 (Discrimination) and c6_civics_ch14_033 (Challenges of Diversity) to see how.',
                  misconception: 'Students think sexual division of labour means "women do housework, men do office work" as a neutral description of *what happens*.' },
                { id: 'b', prompt: 'Create: Design a one-page poster for a school campaign that makes sexual division of labour *visible* to Class 10 students using two contrasting images and.', answer: 'Expected answer: Poster shows split image',
                  options: ['Expected answer: Poster shows split image', 'women do housework, men do office work', 'Indian culture values women\'s role in the home'],
                  hint: 'Revisit c8_civ_ch4_10 (Discrimination) and c6_civics_ch14_033 (Challenges of Diversity) to see how.',
                  misconception: 'Students think sexual division of labour means "women do housework, men do office work" as a neutral description of *what happens*.' }
          ],
            remediations: { 'sexual-division-of-labour-means': { steps: ['Show the student Time Use Survey 2019 data (NSSO) — women spend 4.5 hrs/day on unpaid work, men 1.5 hrs.', 'Ask: "If this were natural, why do Scandinavian men do 3 hrs/day?"', 'Read NCERT Class 10 Ch.4 box "The Sexual Division of Labour" — highlight the phrase "not biological but social."', 'Rewrite the misconception as: "Society *assigns* domestic work to women — this is a political choice, not nature."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_03_002', difficulty: 'standard',
          question: 'The public-private division refers to the societal separation of roles where.',
          hint: 'Revisit c10_civ_cbse_03_001 and list five examples of sexual division of labour in your.',
          misconception: 'Students often think feminist movements only want women to enter the public sphere (jobs, politics) and ignore the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The public-private division refers to the societal separation of roles where the public',
                  options: ['The public-private division refers to the societal separation of roles where the public', 'Sexual division of labour refers to a system in', 'Women\'s political representation refers to the presence and participation of women in', 'Indian secularism means the State has no official religion, treats all religions equally'],
                  hint: 'Revisit c10_civ_cbse_03_001 and list five examples of sexual division of labour in your own.',
                  misconception: 'Students often think feminist movements only want women to enter the public sphere (jobs, politics) and ignore the private sphere.' }
          ],
            remediations: { 'feminist-movements-only-want-women': { steps: ['Re-read the NCERT section on "Feminist Movements" and list each movement\'s demand — note how many target the private.', 'Write two columns: "Public Sphere Demands" and "Private Sphere Demands" and fill them using the textbook.', 'Discuss with a peer: "If only public sphere demands are met, what happens to women\'s double burden?" This forces.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_03_003', difficulty: 'standard',
          question: 'Women\'s political representation refers to the presence and participation.',
          hint: 'Revisit c8_civ_ch1_1 (Universal Adult Franchise) and c9_civ_ch1_11 (Women\'s.',
          misconception: '**Misconception**: "The Women\'s Reservation Bill (106th Amendment) has already given women 33% seats in Parliament.',
          parts: [
                { id: 'a', prompt: 'India has had Universal Adult Franchise since 1950 (Article 326). Yet, women\'s representation in Lok Sabha has never exceeded 15%.', answer: 'Universal Adult Franchise guarantees the *right to vote* (formal equality), but',
                  options: ['Universal Adult Franchise guarantees the *right to vote* (formal equality), but', 'illiteracy', 'lack of interest', 'currently 33% seats are reserved in Parliament'],
                  hint: 'Revisit c8_civ_ch1_1 (Universal Adult Franchise) and c9_civ_ch1_11 (Women\'s Representation.',
                  misconception: '**Misconception**: "The Women\'s Reservation Bill (106th Amendment) has already given women 33% seats in Parliament *right now*.".' },
                { id: 'b', prompt: 'A Gram Panchayat has 15 wards. The state law provides 50% reservation for women (exceeding the constitutional minimum of 33%).', answer: 'Step 1: Total seats = 15',
                  options: ['Step 1: Total seats = 15', '8 women seats + 3 SC seats = 11 reserved seats', 'currently 33% seats are reserved in Parliament'],
                  hint: 'Revisit c8_civ_ch1_1 (Universal Adult Franchise) and c9_civ_ch1_11 (Women\'s Representation.',
                  misconception: '**Misconception**: "The Women\'s Reservation Bill (106th Amendment) has already given women 33% seats in Parliament *right now*.".' }
          ],
            remediations: { 'misconception-the-women-s-reservation': { steps: ['Show the exact text of the 106th Amendment (Section 3: "shall come into force on such date as the Central Government.', 'Contrast with the 73rd/74th Amendments which had *immediate* effect (no census/delimitation precondition for local.', 'Use a timeline graphic: 1993 (Local reservation → immediate) vs.', 'Practice writing: "The 106th Amendment *provides for* future reservation; it does not *currently reserve* seats."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_03_004', difficulty: 'standard',
          question: 'Indian secularism means the State has no official religion, treats all.',
          hint: 'Review Class 7 nodes c7_civ_ch02_008 (Fundamental Rights) and c7_civ_ch02_010 (Preamble).',
          misconception: 'Students often think Indian secularism means the State must stay completely out of religion (like the U.S.',
          parts: [
                { id: 'a', prompt: 'A political party’s manifesto promises to “enact a law based on the religious scriptures of the majority community.” Using Articles 14, 15, and 25, analyse.', answer: 'The promise violates Articles 14 (equality before law) and 15 (prohibition of',
                  options: ['The promise violates Articles 14 (equality before law) and 15 (prohibition of', 'it is allowed because Article 25 protects religious freedom'],
                  hint: 'Review Class 7 nodes c7_civ_ch02_008 (Fundamental Rights) and c7_civ_ch02_010 (Preamble) and Class.',
                  misconception: 'Students often think Indian secularism means the State must stay completely out of religion (like the U.S. “wall of separation”).' },
                { id: 'b', prompt: 'Compare the communalism of the 1980s (e.g., the Shah Bano case aftermath) with the communalism seen in contemporary social media campaigns.', answer: 'Similarities: (1) Both use religious identity as the primary political cleavage',
                  options: ['Similarities: (1) Both use religious identity as the primary political cleavage', 'both caused riots', 'only lists surface events (e'],
                  hint: 'Review Class 7 nodes c7_civ_ch02_008 (Fundamental Rights) and c7_civ_ch02_010 (Preamble) and Class.',
                  misconception: 'Students often think Indian secularism means the State must stay completely out of religion (like the U.S. “wall of separation”).' }
          ],
            remediations: { 'indian-secularism-means-the-state': { steps: ['Re-read Articles 25–28 in the Constitution (c7_civ_ch02_008) and note the phrases “subject to public order, morality.', 'Compare two short case studies: (a) the 1955 Hindu Marriage Act (state reform of Hindu law) and (b) the 1985 Shah Bano.', 'Write a two-sentence distinction: “Western secularism = separation; Indian secularism = principled distance with.', 'Discuss with a peer: “If the State never touched religion, could it have abolished untouchability (Article 17)?”'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_03_005', difficulty: 'standard',
          question: 'Caste influences political choices in India when voters, parties, and.',
          hint: 'Revisit c8_civ_ch1_5 (Electoral System: How Elections Are Conducted in India) and.',
          misconception: 'Students often think "caste influences politics" means every voter blindly votes for their caste candidate.',
          parts: [
                { id: 'a', prompt: 'Why do political parties in India often give election tickets to candidates based on the caste composition of a constituency?', answer: 'Parties distribute tickets to match the dominant caste in a constituency',
                  options: ['Parties distribute tickets to match the dominant caste in a constituency', 'parties do it to promote social justice', 'the Constitution requires caste-based ticket distribution', 'caste influences politics'],
                  hint: 'Revisit c8_civ_ch1_5 (Electoral System: How Elections Are Conducted in India) and c8_civ_ch1_1.',
                  misconception: 'Students often think "caste influences politics" means every voter blindly votes for their caste candidate.' },
                { id: 'b', prompt: 'In a hypothetical constituency, 40% of voters belong to Caste X, 35% to Caste Y, and 25% to other groups.', answer: 'Party A wins with 40% of the vote',
                  options: ['Party A wins with 40% of the vote', 'Party B wins because 35% is a majority', 'no one wins because no caste has 50%', 'caste influences politics'],
                  hint: 'Revisit c8_civ_ch1_5 (Electoral System: How Elections Are Conducted in India) and c8_civ_ch1_1.',
                  misconception: 'Students often think "caste influences politics" means every voter blindly votes for their caste candidate.' }
          ],
            remediations: { 'caste-influences-politics-means-every': { steps: ['If the student holds this misconception, have them compare two neighbouring constituencies in the same state (e.g.', 'Then ask them to list three non-caste factors that could explain the variation (candidate popularity, local issues.', 'This data-driven exercise replaces the monolithic "caste determines vote" mental model with a multi-factor analytical.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_03_006', difficulty: 'standard',
          question: 'Politics in Caste refers to the process by which political parties, electoral.',
          hint: 'If stuck, revisit c8_civ_ch1_1 (Universal Adult Franchise) and c9_civ_ch1_1 (Democracy.',
          misconception: 'Students think "politics influencing caste" only means politicians exploiting caste for votes (negative).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Politics in Caste refers to the process by which political parties, electoral',
                  options: ['Politics in Caste refers to the process by which political parties, electoral', 'Sexual division of labour refers to a system in', 'The public-private division refers to the societal separation of roles where the public', 'Women\'s political representation refers to the presence and participation of women in'],
                  hint: 'If stuck, revisit c8_civ_ch1_1 (Universal Adult Franchise) and c9_civ_ch1_1 (Democracy: Definition.',
                  misconception: 'Students think "politics influencing caste" only means politicians exploiting caste for votes (negative).' }
          ],
            remediations: { 'politics-influencing-caste-only-means': { steps: ['Re-read the Mandal Commission case study in NCERT (Chapter 4) — note how a government report became a political.', 'Watch a 5-min clip of Kanshi Ram\'s speeches (YouTube) to see how he built "Bahujan" as a political category.', 'Write two columns: "Caste categories that existed before 1947" vs "Categories created by post-independence politics.', 'Discuss with a peer: which categories were made by the state, which by parties?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
