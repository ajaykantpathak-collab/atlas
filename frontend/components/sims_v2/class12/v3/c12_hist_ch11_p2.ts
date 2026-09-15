import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch11_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch11_p2: SimDef = {
    id: 'v3_c12_hist_ch11_p2',
    title: 'Mahatma Gandhi and the Nationalist Movement · Part 2/2',
    subtitle: 'Satyagraha was invented in South Africa — India was the second lab',
    classLevel: 12, subject: 'history', topic: 'Mahatma Gandhi and the Nationalist Movement · Part 2/2',
    chapters: ['c12_hist_ch11'],
    nodeIds: ['c12_hist_cbse_11_007', 'c12_hist_cbse_11_008', 'c12_hist_cbse_11_009', 'c12_hist_cbse_11_010', 'c12_hist_cbse_11_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Movement historian', intro: 'Before the Dandi march, there was a Durban farm and a Johannesburg theatre where the method was built.', goal: 'Trace satyagraha\'s South African origins and its first Indian pilots at Champaran, Ahmedabad and Kheda.' },
    discovery: {
        question: 'Thrown off a train at Pietermaritzburg, a young lawyer could have written petitions and gone home. Instead he built a farm, a newspaper and a method. What was Phoenix really for?',
        options: ['A laboratory of the life satyagraha demands — manual labour, self-reliance and inter-communal living trained the people who would later court arrest', 'A spiritual retreat', 'Cheap housing', 'A printing press'],
        answer: 'A laboratory of the life satyagraha demands — manual labour, self-reliance and inter-communal living trained the people who would later court arrest',
        hook: 'Satyagraha wasn\'t born at Sabarmati — it was forged in South Africa 1906–1914, then piloted in India at Champaran, Ahmedabad and Kheda within eighteen months of his BHU speech. The common structure: law itself as the instrument of oppression, so law-breaking becomes the moral act.',
    },
    teaching: [
        { title: 'The Congress Ministries (1937-39): Provincial Elections and the Ministries\' Work', text: 'The Congress Ministries (1937–39) refers to the period when the Indian National Congress formed provincial governments in eight out of eleven British Indian provinces following the 1937 elections.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_11_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace a method\'s making: follow the oath at Empire Theatre to the indentured miners\' march to the first Indian satyagrahas, and weigh why legalised exploitation invites non-violent defiance.',
        labels: ['The Congress Ministries (1937-39)', 'Gandhi\'s Constructive Programme: Khadi,', 'The Poona Pact (1932)', 'The Partition of India', 'Gandhi\'s Assassination (1948): Nathuram'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_11_007', title: 'The Congress Ministries (1937-39): Provincial Elections and the Ministries\' Work',
          caseStudy: { intro: 'Imagine you are a voter in 1937 Madras Presidency — you\'ve never voted before because the franchise was extremely limited.',
            decisions: [{ prompt: 'In which year were the provincial elections held under the Government of India Act 1935, and how many provinces did the Congress win.', options: [
                { text: 'The elections were held in 1937, and the Congress won a clear majority in five provinces', outcome: 'The elections were held in 1937, and the Congress won a clear majority in five provinces (Madras.' },
                { text: '1935 elections', outcome: 'Not quite — Students often believe the Congress ministries (1937–39) were "fully autonomous governments" that.', reveals: 'the-congress-ministries-1937-39' },
                { text: 'all eleven provinces', outcome: 'Not quite — Students often believe the Congress ministries (1937–39) were "fully autonomous governments" that.', reveals: 'the-congress-ministries-1937-39' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_11_008', title: 'Gandhi\'s Constructive Programme: Khadi, Harijan, Village Reconstruction and Basic Education',
          caseStudy: { intro: 'Imagine you visit a village in Gujarat today and see a khadi bhandar, a school where children learn weaving alongside reading, and a community sanitation drive.',
            decisions: [{ prompt: 'In which year did Gandhi explicitly announce his focus on the Constructive Programme (khadi, Harijan, village reconstruction) after his.', options: [
                { text: '1924', outcome: '1924. After his release in February 1924, Gandhi "chose to devote his attention to the promotion.' },
                { text: 'social work', outcome: 'Not quite — Students often believe the Constructive Programme was merely "social work" Gandhi did *between*.', reveals: 'the-constructive-programme-was-merely' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_11_010', title: 'The Partition of India (1947): Direct Action Day, Mountbatten and the Boundary Commission',
          caseStudy: { intro: 'Imagine you are standing at the Wagah-Attari border today, watching the evening flag-lowering ceremony — a daily ritual that exists because of a line drawn.',
            decisions: [{ prompt: 'On what date did the Muslim League observe Direct Action Day, and in which city did the worst violence initially break out?', options: [
                { text: 'Direct Action Day was observed on 16 August 1946', outcome: 'Direct Action Day was observed on 16 August 1946; the worst violence initially broke out.' },
                { text: 'divide and rule', outcome: 'Not quite — Students believe Partition was decided solely by the British "divide and rule" policy and that the.', reveals: 'partition-was-decided-solely-by' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_11_011', title: 'Gandhi\'s Assassination (1948): Nathuram Godse and the Legacy of the Mahatma',
          caseStudy: { intro: 'Imagine you are standing at Raj Ghat in Delhi on 30 January — the Martyrs\' Day silence siren sounds.',
            decisions: [{ prompt: 'On what date and at what location was Mahatma Gandhi assassinated, and who was the assassin?', options: [
                { text: 'Mahatma Gandhi was assassinated on 30 January 1948 at Birla House (now Gandhi Smriti) in', outcome: 'Mahatma Gandhi was assassinated on 30 January 1948 at Birla House (now Gandhi Smriti) in New Delhi.' },
                { text: 'a Muslim fanatic', outcome: 'Not quite — Students often believe Gandhi was killed simply because he was "pro-Muslim" or "anti-Hindu,".', reveals: 'gandhi-was-killed-simply-because' },
                { text: 'pro-Muslim', outcome: 'Not quite — Students often believe Gandhi was killed simply because he was "pro-Muslim" or "anti-Hindu,".', reveals: 'gandhi-was-killed-simply-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Researching a 1919 hartal for a paper, you find a police fortnightly report saying \'the peasantry is harvesting, students are in exams — meetings excite little or no interest.\' Your partner wants to cite it as proof the hartal failed.',
            decisions: [{ prompt: 'What should a historian ask of that report first?', options: [
                { text: 'Whose interest does it serve, and when was it written — colonial police reports minimised unrest as a matter of job description and were filed before full information arrived; the same source class dismissed Punjab\'s tension right up to Jallianwala Bagh.', outcome: 'The chapter\'s source-criticism lesson: an interested narrative isn\'t a neutral fact — the report documents what the administration wished were true, which is itself evidence of what it feared.' },
                { text: 'Cite it — a government report is a primary source, so it\'s hard evidence the hartal failed.', outcome: 'Primary doesn\'t mean neutral: the report is primary evidence of the Home Department\'s posture, not of crowd size — using it to prove absence of unrest reads the author\'s wish as the event.', reveals: 'primary-equals-impartial' },
                { text: 'Discard it — a biased source can teach nothing.', outcome: 'The opposite error: the report\'s very need to downplay the hartal is evidence the administration felt the pressure — bias tells you what the state feared, which is historical data too.', reveals: 'biased-equals-useless' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_11_011', title: 'You made it',
          caseStudy: { intro: 'You can now see satyagraha as a technology built over decades — tested on farms and strikes before it ever met the British Raj.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_007', difficulty: 'standard',
          question: 'The Congress Ministries (1937–39) refers to the period when the Indian National.',
          hint: 'If confused about the 1935 Act\'s federal structure, revisit the "Government of India Act.',
          misconception: 'Students often believe the Congress ministries (1937–39) were "fully autonomous governments" that could freely.',
          parts: [
                { id: 'a', prompt: 'Why did the Congress, which had boycotted legislatures during the Non-Cooperation and Civil Disobedience Movements, decide to contest the 1937 elections and.', answer: 'The Congress decided to contest elections to demonstrate its mass support, gain',
                  options: ['The Congress decided to contest elections to demonstrate its mass support, gain', 'British forced them', 'fully autonomous governments'],
                  hint: 'If confused about the 1935 Act\'s federal structure, revisit the "Government of India Act 1935".',
                  misconception: 'Students often believe the Congress ministries (1937–39) were "fully autonomous governments" that could freely implement the nationalist.' },
                { id: 'b', prompt: 'A student claims: "The Congress ministries (1937–39) had full control over provincial administration and could implement any policy they wanted." Using.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'minority interests', 'fully autonomous governments'],
                  hint: 'If confused about the 1935 Act\'s federal structure, revisit the "Government of India Act 1935".',
                  misconception: 'Students often believe the Congress ministries (1937–39) were "fully autonomous governments" that could freely implement the nationalist.' }
          ],
            remediations: { 'the-congress-ministries-1937-39': { steps: ['If the student cannot distinguish between the 1935 Act\'s promises and its actual constraints: (1) Re-read the.', '(2) Create a two-column table: "Powers of Congress Ministry" vs.', '"Powers of Governor/Viceroy" using the Act\'s provisions.', '(3) Re-attempt Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Congress ministries (1937–39) were "fully autonomous governments" that could freely.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "The resignation of Congress ministries in October 1939 was a strategic blunder that handed political initiative to the Muslim League.".', answer: 'The argument has partial validity but oversimplifies',
                  options: ['The argument has partial validity but oversimplifies', 'fully autonomous governments'],
                  hint: 'If confused about the 1935 Act\'s federal structure, revisit the "Government of India Act 1935".',
                  misconception: 'Students often believe the Congress ministries (1937–39) were "fully autonomous governments" that could freely implement the nationalist.' }
          ],
            remediations: { 'the-congress-ministries-1937-39': { steps: ['If the student cannot distinguish between the 1935 Act\'s promises and its actual constraints: (1) Re-read the.', '(2) Create a two-column table: "Powers of Congress Ministry" vs.', '"Powers of Governor/Viceroy" using the Act\'s provisions.', '(3) Re-attempt Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_008', difficulty: 'standard',
          question: 'Gandhi\'s Constructive Programme (1920s-1940s) was a comprehensive social reform.',
          hint: 'Revisit the Chauri Chaura incident in node c12_hist_cbse_11_003 and Gandhi\'s own.',
          misconception: 'Students often believe the Constructive Programme was merely "social work" Gandhi did *between* political movements.',
          parts: [
                { id: 'a', prompt: 'In which year did Gandhi explicitly announce his focus on the Constructive Programme (khadi, Harijan, village reconstruction) after his release from prison?', answer: '1924',
                  options: ['1924', 'social work'],
                  hint: 'Revisit the Chauri Chaura incident in node c12_hist_cbse_11_003 and Gandhi\'s own explanation.',
                  misconception: 'Students often believe the Constructive Programme was merely "social work" Gandhi did *between* political movements (e.g., after.' },
                { id: 'b', prompt: 'During the 1930 Dandi March, Gandhi told upper-caste villagers at Wasna: "If you are out for Swaraj you must serve untouchables.', answer: 'Gandhi argued that Swaraj meant self-rule at every level',
                  options: ['Gandhi argued that Swaraj meant self-rule at every level', 'charity', 'reform', 'social work'],
                  hint: 'Revisit the Chauri Chaura incident in node c12_hist_cbse_11_003 and Gandhi\'s own explanation.',
                  misconception: 'Students often believe the Constructive Programme was merely "social work" Gandhi did *between* political movements (e.g., after.' },
                { id: 'c', prompt: 'Compare the Constructive Programme\'s approach to village reconstruction with the British colonial model of rural development.', answer: 'Difference 1: Autonomy',
                  options: ['Difference 1: Autonomy', 'Gandhi wanted villages to be clean', 'British built railways', 'social work'],
                  hint: 'Revisit the Chauri Chaura incident in node c12_hist_cbse_11_003 and Gandhi\'s own explanation.',
                  misconception: 'Students often believe the Constructive Programme was merely "social work" Gandhi did *between* political movements (e.g., after.' }
          ],
            remediations: { 'the-constructive-programme-was-merely': { steps: ['If the student conflates Constructive Programme with "social work break," have them re-read Gandhi\'s 5 April 1930 Dandi.', '"positive" (construction).', 'If they confuse Harijan work with Poona Pact, direct them to node c12_hist_cbse_11_009 and trace the 1932 timeline.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_009', difficulty: 'standard',
          question: 'The Poona Pact (1932) was an agreement between Mahatma Gandhi and Dr. B.R.',
          hint: 'If unclear on separate vs joint electorates, revisit the Class 10 Political Science.',
          misconception: 'Students commonly believe the Poona Pact simply "gave Dalits reserved seats" and that this was what Ambedkar wanted all.',
          parts: [
                { id: 'a', prompt: 'Why did Gandhi oppose separate electorates for the Depressed Classes, and how did his argument differ from Ambedkar\'s justification for demanding them?', answer: 'Gandhi opposed separate electorates',
                  options: ['Gandhi opposed separate electorates', 'not wanting to divide Hindus', 'wanting more seats'],
                  hint: 'If unclear on separate vs joint electorates, revisit the Class 10 Political Science chapter.',
                  misconception: 'Students commonly believe the Poona Pact simply "gave Dalits reserved seats" and that this was what Ambedkar wanted all along.' },
                { id: 'b', prompt: 'The Communal Award (August 1932) granted 71 reserved seats to Depressed Classes under separate electorates.', answer: 'Under separate electorates: Only Depressed Class voters vote for Depressed Class',
                  options: ['Under separate electorates: Only Depressed Class voters vote for Depressed Class', 'both systems let Dalits choose their own representatives'],
                  hint: 'If unclear on separate vs joint electorates, revisit the Class 10 Political Science chapter.',
                  misconception: 'Students commonly believe the Poona Pact simply "gave Dalits reserved seats" and that this was what Ambedkar wanted all along.' },
                { id: 'c', prompt: 'Compare the immediate political outcome of the Poona Pact for Dalit representation in the 1937 provincial elections with its long-term consequence for the.', answer: 'In 1937, the primary panel system often failed',
                  options: ['In 1937, the primary panel system often failed', 'the system worked the same way'],
                  hint: 'If unclear on separate vs joint electorates, revisit the Class 10 Political Science chapter.',
                  misconception: 'Students commonly believe the Poona Pact simply "gave Dalits reserved seats" and that this was what Ambedkar wanted all along.' }
          ],
            remediations: { 'students-commonly-believe-the-poona': { steps: ['If the student conflates separate electorates with reserved seats, or cannot explain the primary panel mechanism: (1).', '(2) Draw a two-column comparison table: "Separate Electorates (Communal Award)" vs "Joint Electorates + Reserved Seats.', '(3) Re-read Source 5 and Source 6 in NCERT (pp.', '300-301) — highlight Gandhi\'s phrase "perpetuate the stigma" and Ambedkar\'s phrase "organised tyranny." (4) Redo.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_010', difficulty: 'standard',
          question: 'The Partition of India (1947) refers to the division of British India into two.',
          hint: 'Revisit c12_hist_cbse_11_007 (Congress Ministries 1937-39) and the 1946 election data.',
          misconception: 'Students believe Partition was decided solely by the British "divide and rule" policy and that the Radcliffe Line was.',
          parts: [
                { id: 'a', prompt: 'On what date did the Muslim League observe Direct Action Day, and in which city did the worst violence initially break out?', answer: 'Direct Action Day was observed on 16 August 1946',
                  options: ['Direct Action Day was observed on 16 August 1946', 'divide and rule'],
                  hint: 'Revisit c12_hist_cbse_11_007 (Congress Ministries 1937-39) and the 1946 election data in NCERT Fig.',
                  misconception: 'Students believe Partition was decided solely by the British "divide and rule" policy and that the Radcliffe Line was drawn arbitrarily.' },
                { id: 'b', prompt: 'Why did the Cabinet Mission Plan (1946) fail to prevent Partition, despite proposing a united India with a loose federal structure?', answer: 'The Cabinet Mission Plan failed',
                  options: ['The Cabinet Mission Plan failed', 'British didn\'t want unity', 'divide and rule'],
                  hint: 'Revisit c12_hist_cbse_11_007 (Congress Ministries 1937-39) and the 1946 election data in NCERT Fig.',
                  misconception: 'Students believe Partition was decided solely by the British "divide and rule" policy and that the Radcliffe Line was drawn arbitrarily.' },
                { id: 'c', prompt: 'Analyze this excerpt from Mountbatten\'s 3 June 1947 broadcast: "I am sure that all parties will agree that the most urgent task is to find a way.', answer: 'Mountbatten\'s insistence on speed (transfer by 15 Aug 1947, announced 3 June',
                  options: ['Mountbatten\'s insistence on speed (transfer by 15 Aug 1947, announced 3 June', 'divide and rule'],
                  hint: 'Revisit c12_hist_cbse_11_007 (Congress Ministries 1937-39) and the 1946 election data in NCERT Fig.',
                  misconception: 'Students believe Partition was decided solely by the British "divide and rule" policy and that the Radcliffe Line was drawn arbitrarily.' },
                { id: 'd', prompt: 'Compare the Congress and Muslim League positions on the Cabinet Mission Plan\'s "Grouping" clause (Sections B and C for Muslim-majority provinces).', answer: 'Congress viewed grouping as voluntary',
                  options: ['Congress viewed grouping as voluntary', 'divide and rule'],
                  hint: 'Revisit c12_hist_cbse_11_007 (Congress Ministries 1937-39) and the 1946 election data in NCERT Fig.',
                  misconception: 'Students believe Partition was decided solely by the British "divide and rule" policy and that the Radcliffe Line was drawn arbitrarily.' }
          ],
            remediations: { 'partition-was-decided-solely-by': { steps: ['If the student holds the "British conspiracy only" view: Step 1 — Revisit c12_hist_cbse_11_007 (Congress Ministries.', 'Step 2 — Analyze the 1946 election data (source: NCERT Fig.', '11.13 context): Congress 91% of General seats, League 87% of Muslim seats — ask "Could any British Viceroy ignore this.', 'Step 4 — Re-attempt Diagnostic Question 4 to test if the student can now articulate the Congress-League constitutional.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_011', difficulty: 'standard',
          question: 'Gandhi\'s assassination refers to the killing of Mohandas Karamchand Gandhi.',
          hint: 'Revisit the "Direct Action Day" and "Partition violence" sections in c12_hist_cbse_11_010.',
          misconception: 'Students often believe Gandhi was killed simply because he was "pro-Muslim" or "anti-Hindu," ignoring that Godse and.',
          parts: [
                { id: 'a', prompt: 'Using the NCERT description of Gandhi\'s final fast (13–18 January 1948) and the 20 January bomb attempt, explain how the Indian state\'s response to the.', answer: 'Despite the 20 January bomb explosion at Birla House (which missed Gandhi), the',
                  options: ['Despite the 20 January bomb explosion at Birla House (which missed Gandhi), the', 'He who seeks protection from the police loses the right to non-violence', 'security was lax', 'pro-Muslim'],
                  hint: 'Revisit the "Direct Action Day" and "Partition violence" sections in c12_hist_cbse_11_010 and the.',
                  misconception: 'Students often believe Gandhi was killed simply because he was "pro-Muslim" or "anti-Hindu," ignoring that Godse and his co-conspirators.' },
                { id: 'b', prompt: 'Compare the portrayal of Gandhi\'s assassination in (a) the Time magazine report cited in NCERT (comparing it to Lincoln\'s murder) and (b) the popular print.', answer: 'Time framed the assassination as a global tragedy of bigotry',
                  options: ['Time framed the assassination as a global tragedy of bigotry', 'pro-Muslim', 'anti-Hindu'],
                  hint: 'Revisit the "Direct Action Day" and "Partition violence" sections in c12_hist_cbse_11_010 and the.',
                  misconception: 'Students often believe Gandhi was killed simply because he was "pro-Muslim" or "anti-Hindu," ignoring that Godse and his co-conspirators.' }
          ],
            remediations: { 'gandhi-was-killed-simply-because': { steps: ['If a student holds this misconception: (1) Re-read Godse\'s court statement (excerpts in NCERT or supplementary).', '(3) Watch the 10-minute clip from Richard Attenborough\'s *Gandhi* (1982) showing the fast and assassination — note the.', '(4) Re-attempt Diagnostic Question 2 with this evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
