import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch11_p1: SimDef = {
    id: 'v3_c12_hist_ch11_p1',
    title: 'Mahatma Gandhi and the Nationalist Movement · Part 1/2',
    subtitle: 'Satyagraha was invented in South Africa — India was the second lab',
    classLevel: 12, subject: 'history', topic: 'Mahatma Gandhi and the Nationalist Movement · Part 1/2',
    chapters: ['c12_hist_ch11'],
    nodeIds: ['c12_hist_cbse_11_001', 'c12_hist_cbse_11_002', 'c12_hist_cbse_11_003', 'c12_hist_cbse_11_004', 'c12_hist_cbse_11_005', 'c12_hist_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Movement historian', intro: 'Before the Dandi march, there was a Durban farm and a Johannesburg theatre where the method was built.', goal: 'Trace satyagraha\'s South African origins and its first Indian pilots at Champaran, Ahmedabad and Kheda.' },
    discovery: {
        question: 'Thrown off a train at Pietermaritzburg, a young lawyer could have written petitions and gone home. Instead he built a farm, a newspaper and a method. What was Phoenix really for?',
        options: ['A laboratory of the life satyagraha demands — manual labour, self-reliance and inter-communal living trained the people who would later court arrest', 'A spiritual retreat', 'Cheap housing', 'A printing press'],
        answer: 'A laboratory of the life satyagraha demands — manual labour, self-reliance and inter-communal living trained the people who would later court arrest',
        hook: 'Satyagraha wasn\'t born at Sabarmati — it was forged in South Africa 1906–1914, then piloted in India at Champaran, Ahmedabad and Kheda within eighteen months of his BHU speech. The common structure: law itself as the instrument of oppression, so law-breaking becomes the moral act.',
    },
    teaching: [
        { title: 'Gandhi\'s Early Career: South Africa, Satyagraha and the Phoenix Settlement', text: 'Gandhi\'s Early Career (1893–1915) refers to the two decades Mohandas Karamchand Gandhi spent in South Africa as a lawyer and community organizer, where he developed the philosophy and practice.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_11_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace a method\'s making: follow the oath at Empire Theatre to the indentured miners\' march to the first Indian satyagrahas, and weigh why legalised exploitation invites non-violent defiance.',
        labels: ['Gandhi\'s Early Career: South', 'The Rowlatt Satyagraha (1919)', 'The Non-Cooperation Movement (1920-22)', 'The Civil Disobedience Movement', 'The Gandhi-Irwin Pact (1931)', 'The Quit India Movement'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_11_001', title: 'Gandhi\'s Early Career: South Africa, Satyagraha and the Phoenix Settlement',
          caseStudy: { intro: 'Imagine you are a 24-year-old Gujarati lawyer stepping off a ship in Durban in 1893, clutching a first-class ticket but being thrown off the train.',
            decisions: [{ prompt: 'In which year did Gandhi take the famous oath at the Empire Theatre in Johannesburg that marked the formal birth of satyagraha as a mass.', options: [
                { text: '1906', outcome: '1906. A wrong answer (e.g., 1915, 1919, or 1930) reveals the student conflates the *origin*.' },
                { text: 'preparation', outcome: 'Not quite — Students believe satyagraha was Gandhi\'s *sudden invention* in 1919 (Rowlatt Act) or 1930 (Salt.', reveals: 'satyagraha-was-gandhi-s-sudden' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_11_002', title: 'The Rowlatt Satyagraha (1919): The Act, the Hartal and Jallianwala Bagh',
          caseStudy: { intro: 'Imagine you are standing at the Jallianwala Bagh memorial in Amritsar today — the bullet marks on the walls, the well where people jumped to escape firing.',
            decisions: [{ prompt: 'What was the specific date of the Jallianwala Bagh massacre, who gave the firing order, and what was the crowd gathered for?', options: [
                { text: 'The Jallianwala Bagh massacre occurred on 13 April 1919 (Baisakhi day)', outcome: 'The Jallianwala Bagh massacre occurred on 13 April 1919 (Baisakhi day).' },
                { text: 'Gandhi was leading the protest', outcome: 'Not quite — **Three specific errors:** (1) **Conflating the Rowlatt Act with the Defence of India Act (1915)**.', reveals: 'three-specific-errors-1-conflating' },
                { text: 'it was a planned satyagraha meeting', outcome: 'Not quite — **Three specific errors:** (1) **Conflating the Rowlatt Act with the Defence of India Act (1915)**.', reveals: 'three-specific-errors-1-conflating' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_11_003', title: 'The Non-Cooperation Movement (1920-22): Khilafat, Chauri Chaura and Withdrawal',
          caseStudy: { intro: 'Imagine you are visiting a local museum and see a display of a *charkha* (spinning wheel) alongside a photograph of a bonfire of foreign cloth.',
            decisions: [{ prompt: 'In which session of the Indian National Congress was the Non-Cooperation Movement formally launched, and what was the key resolution passed.', options: [
                { text: 'The Non-Cooperation Movement was launched at the **Nagpur Session (December 1920)**', outcome: 'The Non-Cooperation Movement was launched at the **Nagpur Session (December 1920)**.' },
                { text: 'supported', outcome: 'Not quite — **Students often believe the Non-Cooperation Movement was *only* about boycotting British goods and.', reveals: 'students-often-believe-the-non' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_11_004', title: 'The Civil Disobedience Movement: The Salt March (Dandi, 1930) and Its Significance',
          caseStudy: { intro: 'Imagine you are standing on the banks of the Sabarmati River in Ahmedabad today — the same spot where thousands gathered on 12 March 1930 to watch an old man.',
            decisions: [{ prompt: 'What was the exact date Mahatma Gandhi began the Dandi March from Sabarmati Ashram, and how many satyagrahis accompanied him initially?', options: [
                { text: 'Gandhi began the Dandi March on 12 March 1930 with 78 carefully selected satyagrahis from', outcome: 'Gandhi began the Dandi March on 12 March 1930 with 78 carefully selected satyagrahis from Sabarmati.' },
                { text: 'thousands of followers', outcome: 'Not quite — Students commonly believe the Salt March was a spontaneous outburst of popular anger against the.', reveals: 'students-commonly-believe-the-salt' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_11_005', title: 'The Gandhi-Irwin Pact (1931) and the Round Table Conferences',
          caseStudy: { intro: 'Imagine you are a journalist in 1931 watching Gandhi walk out of Viceroy\'s House after signing a pact that ends a mass movement but promises only "talks about.',
            decisions: [{ prompt: 'What were the three specific concessions the British government made in the Gandhi-Irwin Pact of March 1931?', options: [
                { text: 'The British agreed to: (1) release all political prisoners not convicted of violence, (2)', outcome: 'The British agreed to: (1) release all political prisoners not convicted of violence, (2) permit.' },
                { text: 'promise of dominion status', outcome: 'Not quite — Students often believe the Gandhi-Irwin Pact "granted" the right to make salt — it only permitted.', reveals: 'the-gandhi-irwin-pact-granted' },
                { text: 'repeal of salt tax', outcome: 'Not quite — Students often believe the Gandhi-Irwin Pact "granted" the right to make salt — it only permitted.', reveals: 'the-gandhi-irwin-pact-granted' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Researching a 1919 hartal for a paper, you find a police fortnightly report saying \'the peasantry is harvesting, students are in exams — meetings excite little or no interest.\' Your partner wants to cite it as proof the hartal failed.',
            decisions: [{ prompt: 'What should a historian ask of that report first?', options: [
                { text: 'Whose interest does it serve, and when was it written — colonial police reports minimised unrest as a matter of job description and were filed before full information arrived; the same source class dismissed Punjab\'s tension right up to Jallianwala Bagh.', outcome: 'The chapter\'s source-criticism lesson: an interested narrative isn\'t a neutral fact — the report documents what the administration wished were true, which is itself evidence of what it feared.' },
                { text: 'Cite it — a government report is a primary source, so it\'s hard evidence the hartal failed.', outcome: 'Primary doesn\'t mean neutral: the report is primary evidence of the Home Department\'s posture, not of crowd size — using it to prove absence of unrest reads the author\'s wish as the event.', reveals: 'primary-equals-impartial' },
                { text: 'Discard it — a biased source can teach nothing.', outcome: 'The opposite error: the report\'s very need to downplay the hartal is evidence the administration felt the pressure — bias tells you what the state feared, which is historical data too.', reveals: 'biased-equals-useless' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now see satyagraha as a technology built over decades — tested on farms and strikes before it ever met the British Raj.',
            decisions: [{ prompt: 'What comes next? Mahatma Gandhi and the Nationalist Movement · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Mahatma Gandhi and the Nationalist Movement · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_001', difficulty: 'standard',
          question: 'Gandhi\'s Early Career (1893–1915) refers to the two decades Mohandas Karamchand.',
          hint: 'Revisit c10_hist_cbse_02_002 for satyagraha\'s core meaning; then read NCERT pp.',
          misconception: 'Students believe satyagraha was Gandhi\'s *sudden invention* in 1919 (Rowlatt Act) or 1930 (Salt March), and that his.',
          parts: [
                { id: 'a', prompt: 'In which year did Gandhi take the famous oath at the Empire Theatre in Johannesburg that marked the formal birth of satyagraha as a mass technique?', answer: '1906',
                  options: ['1906', 'preparation'],
                  hint: 'Revisit c10_hist_cbse_02_002 for satyagraha\'s core meaning; then read NCERT pp.',
                  misconception: 'Students believe satyagraha was Gandhi\'s *sudden invention* in 1919 (Rowlatt Act) or 1930 (Salt March), and that his South African years.' },
                { id: 'b', prompt: 'A historian argues: "Gandhi\'s 1916 BHU speech was merely rhetorical; he had no organizational plan to reach peasants." Using evidence from Champaran (1917).', answer: 'The claim is false',
                  options: ['The claim is false', 'preparation'],
                  hint: 'Revisit c10_hist_cbse_02_002 for satyagraha\'s core meaning; then read NCERT pp.',
                  misconception: 'Students believe satyagraha was Gandhi\'s *sudden invention* in 1919 (Rowlatt Act) or 1930 (Salt March), and that his South African years.' }
          ],
            remediations: { 'satyagraha-was-gandhi-s-sudden': { steps: ['If the student conflates origin with application: (1) Re-read the NCERT section "A Leader Announces Himself" (pp.', '286–287) focusing on Chandran Devanesan\'s quote: "South Africa was the making of the Mahatma." (2) Create a two-column.', '(3) Re-attempt Diagnostic Question 1 and 5.', 'If still stuck, review Class 10 node c10_hist_cbse_02_002 for the *definition* of satyagraha, then return here for its.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe satyagraha was Gandhi\'s *sudden invention* in 1919 (Rowlatt Act) or 1930 (Salt March), and that his.',
          parts: [
                { id: 'a', prompt: 'Critique the view that Gandhi\'s South African satyagraha was "only for Indian merchants" and had no relevance for Indian peasants.', answer: 'The view is inaccurate',
                  options: ['The view is inaccurate', 'merchant-only', 'passenger', 'indentured'],
                  hint: 'Revisit c10_hist_cbse_02_002 for satyagraha\'s core meaning; then read NCERT pp.',
                  misconception: 'Students believe satyagraha was Gandhi\'s *sudden invention* in 1919 (Rowlatt Act) or 1930 (Salt March), and that his South African years.' }
          ],
            remediations: { 'satyagraha-was-gandhi-s-sudden': { steps: ['If the student conflates origin with application: (1) Re-read the NCERT section "A Leader Announces Himself" (pp.', '286–287) focusing on Chandran Devanesan\'s quote: "South Africa was the making of the Mahatma." (2) Create a two-column.', '(3) Re-attempt Diagnostic Question 1 and 5.', 'If still stuck, review Class 10 node c10_hist_cbse_02_002 for the *definition* of satyagraha, then return here for its.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_002', difficulty: 'standard',
          question: 'The Rowlatt Satyagraha (March–April 1919) was the first all-India mass protest.',
          hint: 'If unclear on the *difference* between early satyagrahas and Rowlatt Satyagraha, re-read.',
          misconception: '**Three specific errors:** (1) **Conflating the Rowlatt Act with the Defence of India Act (1915)** — Students think the.',
          parts: [
                { id: 'a', prompt: 'What was the specific date of the Jallianwala Bagh massacre, who gave the firing order, and what was the crowd gathered for?', answer: 'The Jallianwala Bagh massacre occurred on 13 April 1919 (Baisakhi day)',
                  options: ['The Jallianwala Bagh massacre occurred on 13 April 1919 (Baisakhi day)', 'Gandhi was leading the protest', 'it was a planned satyagraha meeting', 'the Rowlatt Act *was* the wartime law'],
                  hint: 'If unclear on the *difference* between early satyagrahas and Rowlatt Satyagraha, re-read NCERT.',
                  misconception: '**Three specific errors:** (1) **Conflating the Rowlatt Act with the Defence of India Act (1915)** — Students think the Rowlatt Act *was*.' },
                { id: 'b', prompt: 'A police fortnightly report from Bengal (March 1930, but similar tone existed in 1919) states: "The peasantry is engaged in harvesting...', answer: '(1) "Whose perspective does this report represent?"',
                  options: ['(1) "Whose perspective does this report represent?"', 'the hartal failed in Bengal', 'the Rowlatt Act *was* the wartime law'],
                  hint: 'If unclear on the *difference* between early satyagrahas and Rowlatt Satyagraha, re-read NCERT.',
                  misconception: '**Three specific errors:** (1) **Conflating the Rowlatt Act with the Defence of India Act (1915)** — Students think the Rowlatt Act *was*.' }
          ],
            remediations: { 'three-specific-errors-1-conflating': { steps: ['If the student holds any of the three misconceptions: **Step 1** – Re-read NCERT Class 12, Theme 11, pp.', '289–290 (the paragraph starting "During the Great War...', 'Rowlatt Act") and Class 10, Ch.', '2, node c10_hist_cbse_02_003 for the legislative distinction.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_003', difficulty: 'standard',
          question: 'The Non-Cooperation Movement (1920–22) was a nationwide mass campaign led.',
          hint: 'If stuck, re-read the “Making of the Mahatma” section in c12_hist_cbse_11_001 (South.',
          misconception: '**Students often believe the Non-Cooperation Movement was *only* about boycotting British goods and institutions, and.',
          parts: [
                { id: 'a', prompt: 'A student reads in a police report that “the Non-Cooperation Movement had little impact in Bengal because the peasantry was busy with the harvest.” Using the.', answer: 'The police report is **partially reliable but biased**',
                  options: ['The police report is **partially reliable but biased**', 'supported'],
                  hint: 'If stuck, re-read the “Making of the Mahatma” section in c12_hist_cbse_11_001 (South Africa years).',
                  misconception: '**Students often believe the Non-Cooperation Movement was *only* about boycotting British goods and institutions, and that the Khilafat.' }
          ],
            remediations: { 'students-often-believe-the-non': { steps: ['If a student holds the above misconceptions: 1.', '289–291** (sections 2.1–2.2) focusing on Gandhi’s own words: “Non-cooperation was negative enough to be peaceful but.', '**Compare Source 1 (Gandhi on charkha/khadi)** with the Khilafat box on p.', '290 — note how Gandhi frames Khilafat as a *national* issue.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_004', difficulty: 'standard',
          question: 'The Civil Disobedience Movement (1930-34) was a mass nationalist campaign.',
          hint: 'If unclear on the Non-Cooperation vs Civil Disobedience distinction, revisit.',
          misconception: 'Students commonly believe the Salt March was a spontaneous outburst of popular anger against the salt tax.',
          parts: [
                { id: 'a', prompt: 'Why did Gandhi specifically choose the salt tax as the target for civil disobedience instead of land revenue or forest laws, which also burdened peasants?', answer: 'Gandhi chose salt',
                  options: ['Gandhi chose salt', 'peasant grievances'],
                  hint: 'If unclear on the Non-Cooperation vs Civil Disobedience distinction, revisit c12_hist_cbse_11_003.',
                  misconception: 'Students commonly believe the Salt March was a spontaneous outburst of popular anger against the salt tax.' }
          ],
            remediations: { 'students-commonly-believe-the-salt': { steps: ['If the student holds the spontaneity misconception: (1) Re-read Gandhi\'s 5 April 1930 Dandi speech (Source 4) — note.', '(2) Compare with the police fortnightly reports (Source 8) showing British awareness weeks in advance.', '(3) Map the march route (Sabarmati → Aslali → Bareja → Navagam → Matwad → Dandi) and identify how each stop was chosen.', '(4) Complete the map-work project from NCERT (p.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_005', difficulty: 'standard',
          question: 'The Gandhi-Irwin Pact (March 1931) was a political agreement between Mahatma.',
          hint: 'Revisit c12_hist_cbse_11_004 (Salt March) and the Lahore Congress 1929 resolution — the.',
          misconception: 'Students often believe the Gandhi-Irwin Pact "granted" the right to make salt — it only permitted *coastal communities*.',
          parts: [
                { id: 'a', prompt: 'Why did radical nationalists like Subhas Chandra Bose and Jawaharlal Nehru criticise the Gandhi-Irwin Pact despite the release of prisoners?', answer: 'They criticised it',
                  options: ['They criticised it', 'Gandhi betrayed the movement', 'prisoners were not all released', 'granted'],
                  hint: 'Revisit c12_hist_cbse_11_004 (Salt March) and the Lahore Congress 1929 resolution — the gap between.',
                  misconception: 'Students often believe the Gandhi-Irwin Pact "granted" the right to make salt — it only permitted *coastal communities* to collect natural.' },
                { id: 'b', prompt: 'At the Second Round Table Conference, the Muslim League claimed to represent India\'s Muslims, the Princes claimed sovereignty over their territories, and.', answer: 'The Muslim League argued separate electorates were essential for Muslim minority',
                  options: ['The Muslim League argued separate electorates were essential for Muslim minority', 'British divide-and-rule', 'granted'],
                  hint: 'Revisit c12_hist_cbse_11_004 (Salt March) and the Lahore Congress 1929 resolution — the gap between.',
                  misconception: 'Students often believe the Gandhi-Irwin Pact "granted" the right to make salt — it only permitted *coastal communities* to collect natural.' }
          ],
            remediations: { 'the-gandhi-irwin-pact-granted': { steps: ['If the student confuses the Pact\'s terms or misattributes the RTC\'s failure: (1) Re-read Source 3 and Source 4 in NCERT.', '(2) Use the "Three Challenges" table (Muslim League, Princes, Ambedkar) from the worked example below to map each.', '(3) Re-attempt Diagnostic Question 3 and 4 with this framework.', '(4) If still stuck, revisit c12_hist_cbse_11_004 (Salt March) to see the leverage Gandhi *had* before the Pact.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_006', difficulty: 'standard',
          question: 'The Quit India Movement (August 1942 – September 1944) was the final mass civil.',
          hint: 'Revisit c12_hist_cbse_11_004 (Civil Disobedience) and c12_hist_cbse_11_007 (Congress.',
          misconception: 'Students often believe the Quit India Movement was a purely Gandhian non-violent satyagraha like the Salt March.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Quit India Movement (August 1942 – September 1944) was the final mass civil',
                  options: ['The Quit India Movement (August 1942 – September 1944) was the final mass civil', 'Gandhi\'s Early Career (1893–1915) refers to the two decades Mohandas Karamchand Gandhi', 'The Rowlatt Satyagraha (March–April 1919) was the first all-India mass protest organised', 'The Non-Cooperation Movement (1920–22) was a nationwide mass campaign led by Mahatma'],
                  hint: 'Revisit c12_hist_cbse_11_004 (Civil Disobedience) and c12_hist_cbse_11_007 (Congress Ministries).',
                  misconception: 'Students often believe the Quit India Movement was a purely Gandhian non-violent satyagraha like the Salt March.' }
          ],
            remediations: { 'the-quit-india-movement-was': { steps: ['Re-read the “Quit India” section in NCERT (pp.', '302–303) focusing on the shift from open protest to underground activity.', 'Watch a 10-minute documentary clip on the Satara prati sarkar (search “Satara parallel government 1943”).', 'Create a two-column table: “Gandhi’s Plan” vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
