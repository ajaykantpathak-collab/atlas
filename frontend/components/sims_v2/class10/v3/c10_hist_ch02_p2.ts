import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hist_ch02_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hist_ch02_p2: SimDef = {
    id: 'v3_c10_hist_ch02_p2',
    title: 'Nationalism in India · Part 2/2',
    subtitle: 'March from loyalty to mass rebellion in thirty turbulent years',
    classLevel: 10, subject: 'history', topic: 'Nationalism in India · Part 2/2',
    chapters: ['c10_hist_ch02'],
    nodeIds: ['c10_hist_cbse_02_007', 'c10_hist_cbse_02_008', 'c10_hist_cbse_02_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a young Indian deciding whether to join the freedom struggle', intro: 'You grew up hearing that loyalty to the Empire would earn India its due. Then came wartime taxes, the Rowlatt Act, and the sound of firing at Jallianwala Bagh — and a thin man with a staff asking you to march for salt.', goal: 'Connect wartime hardship to the rise of Gandhian mass movements and explain how each phase — Non-Cooperation, Civil Disobedience, Quit India — widened the struggle.' },
    discovery: {
        question: 'In 1919 a crowd gathered at Jallianwala Bagh. What turned a protest into a turning point?',
        options: ['The massacre showed colonial rule\'s true face to all of India', 'The crowd voted for independence that day', 'British apologised and left Punjab', 'It was the first protest in India'],
        answer: 'The massacre showed colonial rule\'s true face to all of India',
        hook: 'Some events do not start movements — they reveal them. Scrub the timeline and watch nationalism become mass politics.',
    },
    teaching: [
        { title: 'Civil Disobedience Movement: Participation and Its Limits', text: 'The Civil Disobedience Movement (1930–1934) was a mass nationalist campaign led by Mahatma Gandhi against British colonial rule, initiated with the Salt March and characterized by deliberate.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hist_cbse_02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Scrub to 80% through the era — what came before what?',
        labels: ['Civil Disobedience Movement: Participation', 'The Sense of Collective', 'Limits of the Movement'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_hist_cbse_02_008', title: 'The Sense of Collective Belonging: Symbols and Imagery',
          caseStudy: { intro: 'Imagine you see a poster of Bharat Mata in a school textbook or a government office — a woman in a saffron sari holding a flag, standing on a map of India.',
            decisions: [{ prompt: 'Name the artist who painted the iconic image of \'Bharat Mata\' in 1905 and describe one key feature of that painting.', options: [
                { text: 'Abanindranath Tagore painted \'Bharat Mata\' in 1905', outcome: 'Abanindranath Tagore painted \'Bharat Mata\' in 1905. The painting depicts a four-armed ascetic woman.' },
                { text: 'Raja Ravi Varma or missing the four arms', outcome: 'Not quite — Students often think that national symbols like the flag or \'Bharat Mata\' were universally accepted.', reveals: 'national-symbols-like-the-flag' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_02_009', title: 'Limits of the Movement: Dalit and Muslim Participation',
          caseStudy: { intro: 'Imagine you are a student in 1930 watching the Salt March on the news — everyone seems united behind Gandhi.',
            decisions: [{ prompt: 'What was the primary demand of Dr. B.R. Ambedkar for Dalits at the Second Round Table Conference (1931) that brought him into conflict with.', options: [
                { text: 'Ambedkar demanded **separate electorates** for the Depressed Classes (Dalits) to ensure', outcome: 'Ambedkar demanded **separate electorates** for the Depressed Classes (Dalits) to ensure genuine.' },
                { text: 'reserved seats in joint electorates', outcome: 'Not quite — **Students believe "Gandhi opposed separate electorates for *all* minorities."** **Reality:**.', reveals: 'students-believe-gandhi-opposed-separate' },
                { text: 'temple entry', outcome: 'Not quite — **Students believe "Gandhi opposed separate electorates for *all* minorities."** **Reality:**.', reveals: 'students-believe-gandhi-opposed-separate' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_02_007', title: 'A real-world call',
          caseStudy: { intro: 'During the freedom movement, some Indians chose non-violent resistance; others believed the empire only understood force. Both loved the same country.',
            decisions: [{ prompt: 'Was violence ever the right answer to colonialism?', options: [
                { text: 'Non-violence won — anything else would\'ve lost legitimacy', outcome: 'Gandhi\'s bet: moral force made the empire\'s violence visible. It worked — but slowly, and many died waiting.' },
                { text: 'Force was justified against a violent empire', outcome: 'The revolutionary argument — occupation is itself violence; refusing to answer it can read as acceptance.' },
                { text: 'The question is wrong — the movement needed both', outcome: 'Historians note the non-violent mainstream and revolutionary fringe each made the other\'s position stronger.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a family discussion on the freedom struggle, an elder claims: \'India sent soldiers and money to help Britain in the First World War, and Britain rewarded that loyalty fairly — nationalism after 1918 was ungratefulness.\'',
            decisions: [{ prompt: 'What does the record of 1914–18 actually show?', options: [
                { text: 'The war deepened colonial extraction, not partnership — over a million Indian soldiers, huge war loans and massive food exports drained the country while taxes and prices rose at home, and the influenza of 1918 killed millions. Indians gave so much precisely because they were promised a say in return; when self-rule did not follow, the sacrifice itself became fuel for nationalism.', outcome: 'The war years turned contribution into a claim: leaders argued India had bled for the Empire and earned the promised reforms — and the gap between sacrifice and reward is what swelled the movement.' },
                { text: 'The elder is right — wartime help created goodwill, and the postwar nationalist surge had nothing to do with the war.', outcome: 'The surge was inseparable from the war — the economic hardship and the broken expectation of self-government after such sacrifice are precisely what historians link to the post-1918 mass movement.', reveals: 'war-earned-fair-reward' },
                { text: 'India actually refused to help in the war, which is why Britain cracked down afterwards.', outcome: 'India contributed enormously — soldiers, loans and food — the grievance was that this help was extracted under colonial rule and repaid with too little reform.', reveals: 'india-refused-war-help' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_02_009', title: 'You made it',
          caseStudy: { intro: 'From Khilafat to Non-Cooperation to Civil Disobedience — a nation learning to say no, together.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hist_cbse_02_007', difficulty: 'standard',
          question: 'The Civil Disobedience Movement (1930–1934) was a mass nationalist campaign led.',
          hint: 'If stuck, revisit the Great Depression’s impact on Indian farmers (c8_hist_ch3_8) and the.',
          misconception: 'Students often think the Civil Disobedience Movement saw uniform participation across all Indians because textbooks.',
          parts: [
                { id: 'a', prompt: 'Why did rich peasants like the Patidars of Gujarat and Jats of Uttar Pradesh initially join the Civil Disobedience Movement but later become reluctant.', answer: 'Rich peasants joined initially',
                  options: ['Rich peasants joined initially', 'they lost interest'],
                  hint: 'If stuck, revisit the Great Depression’s impact on Indian farmers (c8_hist_ch3_8) and the.',
                  misconception: 'Students often think the Civil Disobedience Movement saw uniform participation across all Indians because textbooks show large crowds.' }
          ],
            remediations: { 'the-civil-disobedience-movement-saw': { steps: ['If the student cannot differentiate participation by group, have them create a three-column table: Group | Reason for.', 'Fill it using the NCERT textbook’s "Participation" and "Limits" subsections.', 'Then ask them to write one paragraph explaining why the movement’s social base was narrower than the Non-Cooperation.', 'This forces comparative analysis and uses the textbook as evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Civil Disobedience Movement saw uniform participation across all Indians because textbooks.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Civil Disobedience Movement failed to become a truly mass movement because the Congress did not address the specific demands.', answer: 'The statement is largely valid',
                  options: ['The statement is largely valid', 'everyone joined'],
                  hint: 'If stuck, revisit the Great Depression’s impact on Indian farmers (c8_hist_ch3_8) and the.',
                  misconception: 'Students often think the Civil Disobedience Movement saw uniform participation across all Indians because textbooks show large crowds.' }
          ],
            remediations: { 'the-civil-disobedience-movement-saw': { steps: ['If the student cannot differentiate participation by group, have them create a three-column table: Group | Reason for.', 'Fill it using the NCERT textbook’s "Participation" and "Limits" subsections.', 'Then ask them to write one paragraph explaining why the movement’s social base was narrower than the Non-Cooperation.', 'This forces comparative analysis and uses the textbook as evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_02_008', difficulty: 'standard',
          question: 'The Sense of Collective Belonging refers to the process during the Indian.',
          hint: 'Revisit c10_hist_cbse_02_004 (Non-Cooperation Movement) to see how khadi and charkha.',
          misconception: 'Students often think that national symbols like the flag or \'Bharat Mata\' were universally accepted and had fixed.',
          parts: [
                { id: 'a', prompt: 'Name the artist who painted the iconic image of \'Bharat Mata\' in 1905 and describe one key feature of that painting.', answer: 'Abanindranath Tagore painted \'Bharat Mata\' in 1905',
                  options: ['Abanindranath Tagore painted \'Bharat Mata\' in 1905', 'Raja Ravi Varma or missing the four arms'],
                  hint: 'Revisit c10_hist_cbse_02_004 (Non-Cooperation Movement) to see how khadi and charkha became.',
                  misconception: 'Students often think that national symbols like the flag or \'Bharat Mata\' were universally accepted and had fixed meanings from the start.' }
          ],
            remediations: { 'national-symbols-like-the-flag': { steps: ['If the student holds this misconception, have them compare the 1906 Calcutta flag (eight lotuses, crescent, \'Vande.', 'Ask: "Why did the Congress change the flag in 1921 and again in 1931?', 'What does each change tell you about who was being included or excluded?" Use the NCERT textbook\'s images of the flags.', 'Then discuss how the 1921 flag added the charkha to represent economic self-reliance and the 1931 flag standardized.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_02_009', difficulty: 'standard',
          question: 'The "Limits of the Movement" refers to the inability of the Civil Disobedience.',
          hint: 'If stuck, revisit **c10_hist_cbse_02_004 (Non-Cooperation: Khilafat)** and.',
          misconception: '**Students believe "Gandhi opposed separate electorates for *all* minorities."** **Reality:** Gandhi *accepted*.',
          parts: [
                { id: 'a', prompt: 'A 1932 British Communal Award granted separate electorates to Dalits. Gandhi began a fast unto death against it. Ambedkar eventually signed the Poona Pact.', answer: 'Gandhi viewed Dalits as **part of the Hindu fold**',
                  options: ['Gandhi viewed Dalits as **part of the Hindu fold**', 'Gandhi was anti-Dalit', 'Muslims were more powerful', 'Gandhi opposed separate electorates for *all* minorities'],
                  hint: 'If stuck, revisit **c10_hist_cbse_02_004 (Non-Cooperation: Khilafat)** and **c10_hist_cbse_02_007.',
                  misconception: '**Students believe "Gandhi opposed separate electorates for *all* minorities."** **Reality:** Gandhi *accepted* separate electorates for.' }
          ],
            remediations: { 'students-believe-gandhi-opposed-separate': { steps: ['**Revisit c10_hist_cbse_02_004 (Non-Cooperation: Khilafat)** — note Muslim participation *then* vs.', '**Read the Poona Pact text (NCERT box)** — underline: "joint electorates," "reserved seats doubled," "primary election.', '**Compare two maps**: (a) 1937 Congress ministries (Hindu-majority provinces) vs.', '(b) Muslim League demand areas — visualize the geographic divide.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
