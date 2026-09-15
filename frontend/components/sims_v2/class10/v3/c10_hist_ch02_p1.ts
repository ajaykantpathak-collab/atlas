import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hist_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hist_ch02_p1: SimDef = {
    id: 'v3_c10_hist_ch02_p1',
    title: 'Nationalism in India · Part 1/2',
    subtitle: 'March from loyalty to mass rebellion in thirty turbulent years',
    classLevel: 10, subject: 'history', topic: 'Nationalism in India · Part 1/2',
    chapters: ['c10_hist_ch02'],
    nodeIds: ['c10_hist_cbse_02_001', 'c10_hist_cbse_02_002', 'c10_hist_cbse_02_003', 'c10_hist_cbse_02_004', 'c10_hist_cbse_02_005', 'c10_hist_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a young Indian deciding whether to join the freedom struggle', intro: 'You grew up hearing that loyalty to the Empire would earn India its due. Then came wartime taxes, the Rowlatt Act, and the sound of firing at Jallianwala Bagh — and a thin man with a staff asking you to march for salt.', goal: 'Connect wartime hardship to the rise of Gandhian mass movements and explain how each phase — Non-Cooperation, Civil Disobedience, Quit India — widened the struggle.' },
    discovery: {
        question: 'In 1919 a crowd gathered at Jallianwala Bagh. What turned a protest into a turning point?',
        options: ['The massacre showed colonial rule\'s true face to all of India', 'The crowd voted for independence that day', 'British apologised and left Punjab', 'It was the first protest in India'],
        answer: 'The massacre showed colonial rule\'s true face to all of India',
        hook: 'Some events do not start movements — they reveal them. Scrub the timeline and watch nationalism become mass politics.',
    },
    teaching: [
        { title: 'First World War and the Indian Nationalist Response', text: 'The First World War (1914–1918) was a global conflict between the Allied Powers (including Britain) and the Central Powers that drew India in as a British colony, triggering massive recruitment.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hist_cbse_02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Scrub to 80% through the era — what came before what?',
        labels: ['First World War', 'The Idea of Satyagraha', 'The Rowlatt Act', 'Non-Cooperation Movement: In Towns', 'Non-Cooperation Movement: Plantations', 'Towards Civil Disobedience'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_hist_cbse_02_001', title: 'First World War and the Indian Nationalist Response',
          caseStudy: { intro: 'Imagine you are a student in 1919 Amritsar: your father returned from Mesopotamia wounded, grain prices have doubled, and the village headman reads aloud the.',
            decisions: [{ prompt: 'In which year did the First World War begin, and which British Viceroy declared India\'s participation without consulting Indian leaders?', options: [
                { text: 'The First World War began in 1914', outcome: 'The First World War began in 1914; Viceroy Lord Hardinge declared India\'s entry.' },
                { text: 'the First World War automatically united all Indians against the British', outcome: 'Not quite — Students believe the First World War automatically united all Indians against the British.', reveals: 'the-first-world-war-automatically' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_02_002', title: 'The Idea of Satyagraha: Gandhi\'s Method of Non-Violent Resistance',
          caseStudy: { intro: 'Imagine you\'re standing at Sabarmati Ashram in 1917 — a young lawyer returns from South Africa with a strange new word: *Satyagraha*.',
            decisions: [{ prompt: 'What is the literal meaning of the term \'Satyagraha\' and who coined it?', options: [
                { text: 'Satyagraha = *Satya* (Truth) + *Agraha* (Firm Insistence/holding fast), coined by Mahatma', outcome: 'Satyagraha = *Satya* (Truth) + *Agraha* (Firm Insistence/holding fast), coined by Mahatma Gandhi.' },
                { text: 'passive resistance', outcome: 'Not quite — Students think Satyagraha = "peaceful protest" or "hunger strike." The exact error: they equate the.', reveals: 'satyagraha-peaceful-protest-or-hunger' },
                { text: 'non-cooperation', outcome: 'Not quite — Students think Satyagraha = "peaceful protest" or "hunger strike." The exact error: they equate the.', reveals: 'satyagraha-peaceful-protest-or-hunger' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_02_003', title: 'The Rowlatt Act and the Jallianwala Bagh Massacre',
          caseStudy: { intro: 'Imagine you are visiting the Jallianwala Bagh memorial in Amritsar today — you see the bullet marks on the walls and the well where people jumped to escape.',
            decisions: [{ prompt: 'What was the main provision of the Rowlatt Act (1919) that angered Indians the most?', options: [
                { text: 'The Rowlatt Act allowed the British government to imprison any person suspected of', outcome: 'The Rowlatt Act allowed the British government to imprison any person suspected of revolutionary.' },
                { text: 'it increased taxes', outcome: 'Not quite — Students often think the Jallianwala Bagh Massacre happened *because* of the Non-Cooperation.', reveals: 'the-jallianwala-bagh-massacre-happened' },
                { text: 'it banned the Congress', outcome: 'Not quite — Students often think the Jallianwala Bagh Massacre happened *because* of the Non-Cooperation.', reveals: 'the-jallianwala-bagh-massacre-happened' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_02_004', title: 'Non-Cooperation Movement: In Towns and Countryside',
          caseStudy: { intro: 'Imagine you\'re visiting your grandmother\'s village in Uttar Pradesh and she shows you an old land record from the 1920s — she tells you how her grandfather.',
            decisions: [{ prompt: 'In which Congress session was the Non-Cooperation Movement formally launched, and in which session was it ratified?', options: [
                { text: 'The Non-Cooperation Movement was launched at the Calcutta Session (September 1920) and', outcome: 'The Non-Cooperation Movement was launched at the Calcutta Session (September 1920) and ratified.' },
                { text: 'uniformly non-violent', outcome: 'Not quite — Students believe the Non-Cooperation Movement was "uniformly non-violent" and "led entirely.', reveals: 'the-non-cooperation-movement-was' },
                { text: 'led entirely by Gandhi', outcome: 'Not quite — Students believe the Non-Cooperation Movement was "uniformly non-violent" and "led entirely.', reveals: 'the-non-cooperation-movement-was' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_02_005', title: 'Non-Cooperation Movement: Plantations and Its Withdrawal',
          caseStudy: { intro: 'Imagine you are a tea plantation worker in Assam in 1921 — you have never been allowed to visit your home village in Bihar because the British law says you.',
            decisions: [{ prompt: 'In which region did plantation workers participate in the Non-Cooperation Movement by leaving tea gardens and marching toward their home.', options: [
                { text: 'The plantation workers were in Assam (tea gardens), and they were bound by the Inland', outcome: 'The plantation workers were in Assam (tea gardens), and they were bound by the Inland Emigration.' },
                { text: 'Bengal jute mills', outcome: 'Not quite — Students believe plantation workers joined the Non-Cooperation Movement because Gandhi explicitly.', reveals: 'plantation-workers-joined-the-non' },
                { text: 'Rowlatt Act', outcome: 'Not quite — Students believe plantation workers joined the Non-Cooperation Movement because Gandhi explicitly.', reveals: 'plantation-workers-joined-the-non' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_02_006', title: 'Towards Civil Disobedience: The Salt March (Dandi March)',
          caseStudy: { intro: 'Imagine you are standing on the banks of the Sabarmati River in Ahmedabad today; you might see a simple stone marking the spot where 78 volunteers began a walk.',
            decisions: [{ prompt: 'What was the specific date on which Mahatma Gandhi formally broke the Salt Law by picking up a lump of natural salt at Dandi, and what was.', options: [
                { text: 'Gandhi broke the Salt Law on **6 April 1930** at Dandi by picking up naturally evaporated', outcome: 'Gandhi broke the Salt Law on **6 April 1930** at Dandi by picking up naturally evaporated sea salt.' },
                { text: 'high tax', outcome: 'Not quite — **Students believe the Salt March was *primarily* a protest against the *high price of salt* or the.', reveals: 'students-believe-the-salt-march' },
                { text: 'monopoly', outcome: 'Not quite — **Students believe the Salt March was *primarily* a protest against the *high price of salt* or the.', reveals: 'students-believe-the-salt-march' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_02_001', title: 'A real-world call',
          caseStudy: { intro: 'During the freedom movement, some Indians chose non-violent resistance; others believed the empire only understood force. Both loved the same country.',
            decisions: [{ prompt: 'Was violence ever the right answer to colonialism?', options: [
                { text: 'Non-violence won — anything else would\'ve lost legitimacy', outcome: 'Gandhi\'s bet: moral force made the empire\'s violence visible. It worked — but slowly, and many died waiting.' },
                { text: 'Force was justified against a violent empire', outcome: 'The revolutionary argument — occupation is itself violence; refusing to answer it can read as acceptance.' },
                { text: 'The question is wrong — the movement needed both', outcome: 'Historians note the non-violent mainstream and revolutionary fringe each made the other\'s position stronger.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a family discussion on the freedom struggle, an elder claims: \'India sent soldiers and money to help Britain in the First World War, and Britain rewarded that loyalty fairly — nationalism after 1918 was ungratefulness.\'',
            decisions: [{ prompt: 'What does the record of 1914–18 actually show?', options: [
                { text: 'The war deepened colonial extraction, not partnership — over a million Indian soldiers, huge war loans and massive food exports drained the country while taxes and prices rose at home, and the influenza of 1918 killed millions. Indians gave so much precisely because they were promised a say in return; when self-rule did not follow, the sacrifice itself became fuel for nationalism.', outcome: 'The war years turned contribution into a claim: leaders argued India had bled for the Empire and earned the promised reforms — and the gap between sacrifice and reward is what swelled the movement.' },
                { text: 'The elder is right — wartime help created goodwill, and the postwar nationalist surge had nothing to do with the war.', outcome: 'The surge was inseparable from the war — the economic hardship and the broken expectation of self-government after such sacrifice are precisely what historians link to the post-1918 mass movement.', reveals: 'war-earned-fair-reward' },
                { text: 'India actually refused to help in the war, which is why Britain cracked down afterwards.', outcome: 'India contributed enormously — soldiers, loans and food — the grievance was that this help was extracted under colonial rule and repaid with too little reform.', reveals: 'india-refused-war-help' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'From Khilafat to Non-Cooperation to Civil Disobedience — a nation learning to say no, together.',
            decisions: [{ prompt: 'What comes next? Nationalism in India · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Nationalism in India · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hist_cbse_02_001', difficulty: 'standard',
          question: 'The First World War (1914–1918) was a global conflict between the Allied Powers.',
          hint: 'Revisit Class 8 node c8_hist_ch4_4 (Moderates vs Extremists) and c8_hist_ch4_5 (Partition.',
          misconception: 'Students believe the First World War automatically united all Indians against the British.',
          parts: [
                { id: 'a', prompt: 'In which year did the First World War begin, and which British Viceroy declared India\'s participation without consulting Indian leaders?', answer: 'The First World War began in 1914',
                  options: ['The First World War began in 1914', 'the First World War automatically united all Indians against the British'],
                  hint: 'Revisit Class 8 node c8_hist_ch4_4 (Moderates vs Extremists) and c8_hist_ch4_5 (Partition.',
                  misconception: 'Students believe the First World War automatically united all Indians against the British.' },
                { id: 'b', prompt: 'Why did the Indian National Congress and the Muslim League sign the Lucknow Pact in 1916, and what specific concession did the League gain?', answer: 'The Lucknow Pact (1916) reunited Moderates and Extremists in Congress and forged',
                  options: ['The Lucknow Pact (1916) reunited Moderates and Extremists in Congress and forged', 'they demanded complete independence', 'Gandhi mediated', 'the First World War automatically united all Indians against the British'],
                  hint: 'Revisit Class 8 node c8_hist_ch4_4 (Moderates vs Extremists) and c8_hist_ch4_5 (Partition.',
                  misconception: 'Students believe the First World War automatically united all Indians against the British.' }
          ],
            remediations: { 'the-first-world-war-automatically': { steps: ['Re-read the NCERT paragraph on "The First World War and the Nationalist Response" (Class 10, Ch. 2, pp. 28–30).', 'Create a two-column table: "Loyalist Actions (1914–16)" vs "Nationalist Demands (1916–19)" using specific examples: war.', 'Watch the 5-minute CBSE Heritage India video "India and WWI" (available on DIKSHA) to visualise the scale of Indian.', 'Explain aloud to a peer why Tilak supported the war but later started Home Rule — this verbalisation cures the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_02_002', difficulty: 'standard',
          question: 'Satyagraha (from Sanskrit *Satya* meaning Truth and *Agraha* meaning Firm.',
          hint: 'If stuck on "why self-suffering works," revisit c7_hist_ch02_005 (Ashoka\'s Kalinga.',
          misconception: 'Students think Satyagraha = "peaceful protest" or "hunger strike." The exact error: they equate the *tactics* (fasting.',
          parts: [
                { id: 'a', prompt: 'In the Champaran Satyagraha (1917), Gandhi refused to leave the district despite a magistrate\'s order.', answer: 'This illustrates **civil disobedience as obedience to a higher moral law**',
                  options: ['This illustrates **civil disobedience as obedience to a higher moral law**', 'he helped farmers', 'peaceful protest', 'hunger strike'],
                  hint: 'If stuck on "why self-suffering works," revisit c7_hist_ch02_005 (Ashoka\'s Kalinga remorse) — the.',
                  misconception: 'Students think Satyagraha = "peaceful protest" or "hunger strike." The exact error: they equate the *tactics* (fasting, marches.' },
                { id: 'b', prompt: 'Compare the Ahmedabad Mill Strike (1918) and Kheda Satyagraha (1918) on: (a) the opponent, (b) the demand, and (c) the method of pressure.', answer: 'Ahmedabad: Opponent = Indian mill owners',
                  options: ['Ahmedabad: Opponent = Indian mill owners', 'peasant movements', 'peaceful protest', 'hunger strike'],
                  hint: 'If stuck on "why self-suffering works," revisit c7_hist_ch02_005 (Ashoka\'s Kalinga remorse) — the.',
                  misconception: 'Students think Satyagraha = "peaceful protest" or "hunger strike." The exact error: they equate the *tactics* (fasting, marches.' }
          ],
            remediations: { 'satyagraha-peaceful-protest-or-hunger': { steps: ['Re-read Gandhi\'s 1917 Champaran report (available in *Collected Works*, Vol.', 'Create a 3-column table: Principle | Champaran Example | Kheda Example | Ahmedabad Example.', 'Write a 50-word definition of Satyagraha *without* using the words "peaceful," "protest," or "non-violence" — force.', 'Attempt Diagnostic Question 2 again — if you still miss the "weapon of the strong" distinction, watch the 10-minute.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think Satyagraha = "peaceful protest" or "hunger strike." The exact error: they equate the *tactics* (fasting.',
          parts: [
                { id: 'a', prompt: 'Construct a 4-step \'Satyagraha Protocol\' that a local leader in 1917 Champaran would follow before launching a campaign, based on Gandhi\'s actual sequence.', answer: 'Step 1: **Investigation**',
                  options: ['Step 1: **Investigation**', 'peaceful protest', 'hunger strike', 'Satyagraha = "peaceful protest" or "hunger strike'],
                  hint: 'If stuck on "why self-suffering works," revisit c7_hist_ch02_005 (Ashoka\'s Kalinga remorse) — the.',
                  misconception: 'Students think Satyagraha = "peaceful protest" or "hunger strike." The exact error: they equate the *tactics* (fasting, marches.' }
          ],
            remediations: { 'satyagraha-peaceful-protest-or-hunger': { steps: ['Re-read Gandhi\'s 1917 Champaran report (available in *Collected Works*, Vol.', 'Create a 3-column table: Principle | Champaran Example | Kheda Example | Ahmedabad Example.', 'Write a 50-word definition of Satyagraha *without* using the words "peaceful," "protest," or "non-violence" — force.', 'Attempt Diagnostic Question 2 again — if you still miss the "weapon of the strong" distinction, watch the 10-minute.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_02_003', difficulty: 'standard',
          question: 'The Rowlatt Act (1919) was a repressive legislation passed by the British.',
          hint: 'If stuck, review the Rowlatt Act provisions from the previous node (c10_hist_cbse_02_001).',
          misconception: 'Students often think the Jallianwala Bagh Massacre happened *because* of the Non-Cooperation Movement, reversing the.',
          parts: [
                { id: 'a', prompt: 'Why did Gandhi call for a nationwide hartal (strike) on 6 April 1919 against the Rowlatt Act?', answer: 'Gandhi called for a hartal',
                  options: ['Gandhi called for a hartal', 'because the British killed people at Jallianwala Bagh'],
                  hint: 'If stuck, review the Rowlatt Act provisions from the previous node (c10_hist_cbse_02_001) and the.',
                  misconception: 'Students often think the Jallianwala Bagh Massacre happened *because* of the Non-Cooperation Movement, reversing the causality.' }
          ],
            remediations: { 'the-jallianwala-bagh-massacre-happened': { steps: ['If the student confuses the sequence, have them create a three-column table: Date | Event | Who did what.', 'Fill it with: March 1919 (Rowlatt Act passed by British), 6 April 1919 (Hartal by Indians), 13 April 1919 (Massacre.', 'Then ask: "Which event came first?', 'Which was the British action?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_02_004', difficulty: 'standard',
          question: 'The Non-Cooperation Movement (1920-1922) was Gandhi\'s first nationwide mass.',
          hint: 'If stuck, revisit c10_hist_cbse_02_003 (Rowlatt Act/Jallianwala Bagh/Khilafat) and.',
          misconception: 'Students believe the Non-Cooperation Movement was "uniformly non-violent" and "led entirely by Gandhi" everywhere.',
          parts: [
                { id: 'a', prompt: 'A student reads that "tribal peasants in the Gudem Hills of Andhra Pradesh attacked police stations and attempted to kill British officials during the.', answer: 'The conclusion is historically inaccurate',
                  options: ['The conclusion is historically inaccurate', 'Gandhi = non-violence', 'uniformly non-violent', 'led entirely by Gandhi'],
                  hint: 'If stuck, revisit c10_hist_cbse_02_003 (Rowlatt Act/Jallianwala Bagh/Khilafat) and.',
                  misconception: 'Students believe the Non-Cooperation Movement was "uniformly non-violent" and "led entirely by Gandhi" everywhere.' },
                { id: 'b', prompt: 'Compare the role of students and lawyers in the urban Non-Cooperation Movement with the role of plantation workers in Assam.', answer: 'Urban students and lawyers (e.g., C.R',
                  options: ['Urban students and lawyers (e.g., C.R', 'both participated', 'uniformly non-violent', 'led entirely by Gandhi'],
                  hint: 'If stuck, revisit c10_hist_cbse_02_003 (Rowlatt Act/Jallianwala Bagh/Khilafat) and.',
                  misconception: 'Students believe the Non-Cooperation Movement was "uniformly non-violent" and "led entirely by Gandhi" everywhere.' }
          ],
            remediations: { 'the-non-cooperation-movement-was': { steps: ['Re-read the NCERT textbox "Differing Strands within the Movement" (Chapter 3, pages 54-56) — highlight three verbs.', 'Create a three-column table: Region | Local Leader | Form of Protest | Gandhi\'s Stance.', 'Watch the 5-minute clip "Non-Cooperation in the Countryside" (NCERT official YouTube) — pause at each region and note.', 'Write a 50-word answer: "Why did Gandhi\'s non-violence not bind every participant?" — use the words "material.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_02_005', difficulty: 'standard',
          question: 'The Non-Cooperation Movement\'s plantation phase (1921-22) refers to the.',
          hint: 'If stuck, revisit c10_hist_cbse_02_002 (Satyagraha principles) and c10_hist_cbse_02_004.',
          misconception: 'Students believe plantation workers joined the Non-Cooperation Movement because Gandhi explicitly called them.',
          parts: [
                { id: 'a', prompt: 'A railway strike and steamer strike occurred just as thousands of plantation workers were leaving Assam.', answer: 'The strikes stranded workers mid-journey with no transport, food, or shelter',
                  options: ['The strikes stranded workers mid-journey with no transport, food, or shelter', 'strikes helped workers by stopping British transport', 'Gandhi asked plantation workers to strike', 'nationalist actions (strikes) automatically help all participants'],
                  hint: 'If stuck, revisit c10_hist_cbse_02_002 (Satyagraha principles) and c10_hist_cbse_02_004 (NCM.',
                  misconception: 'Students believe plantation workers joined the Non-Cooperation Movement because Gandhi explicitly called them to strike, and that Gandhi.' }
          ],
            remediations: { 'plantation-workers-joined-the-non': { steps: ['Re-read the Assam plantation workers\' section in NCERT — highlight phrases "they believed Gandhi Mahatma had come.', 'Create a two-column table: Column A — "What Congress meant by Swaraj"; Column B — "What plantation workers understood.', 'Watch a 5-minute video on Chauri Chaura (search "Chauri Chaura 1922 Gandhi withdrawal") and note Gandhi\'s exact words.', 'Write a 50-word answer: "Why did Gandhi withdraw a successful movement?" — forces articulation of voluntary moral.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_02_006', difficulty: 'standard',
          question: 'The Salt March (Dandi March), launched on 12 March 1930, was a 24-day.',
          hint: 'If stuck, revisit **c10_hist_cbse_02_005** (Non-Cooperation withdrawal) and.',
          misconception: '**Students believe the Salt March was *primarily* a protest against the *high price of salt* or the *salt tax rate*."**.',
          parts: [
                { id: 'a', prompt: 'Gandhi\'s 11 Demands (January 1930) included the abolition of the salt tax, reduction of land revenue, and release of political prisoners.', answer: 'Gandhi chose the salt tax',
                  options: ['Gandhi chose the salt tax', 'salt tax was the easiest to break', 'Gandhi liked salt', 'high tax'],
                  hint: 'If stuck, revisit **c10_hist_cbse_02_005** (Non-Cooperation withdrawal) and.',
                  misconception: '**Students believe the Salt March was *primarily* a protest against the *high price of salt* or the *salt tax rate*."** **Reality**: The.' }
          ],
            remediations: { 'students-believe-the-salt-march': { steps: ['**Re-read NCERT Ch.3, para on \'The Salt March and the Civil Disobedience Movement\'**: Highlight every phrase containing.', '**Map Exercise**: On an outline map of India, mark (a) Sabarmati, (b) Dandi, (c) Vedaranyam (Rajagopalachari), (d).', 'Draw arrows showing *simultaneous* salt law violations.', 'This visualises that the march was a *signal* for coordinated national action, not an isolated event.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
