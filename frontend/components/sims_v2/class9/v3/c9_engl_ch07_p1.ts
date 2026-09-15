import type { SimDef } from '../../engine/types';

/** v3 generated — c9_engl_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_engl_ch07_p1: SimDef = {
    id: 'v3_c9_engl_ch07_p1',
    title: 'Carrier of Words · Part 1/2',
    subtitle: 'The postman the desert couldn\'t stop',
    classLevel: 9, subject: 'engl', topic: 'Carrier of Words · Part 1/2',
    chapters: ['c9_engl_ch07'],
    nodeIds: ['c9_engl_ch7_1', 'c9_engl_ch7_10', 'c9_engl_ch7_2', 'c9_engl_ch7_3', 'c9_engl_ch7_4', 'c9_engl_ch7_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a chronicler of everyday heroes', intro: 'No roads, no buses, sandstorms on schedule — and the mail still arrives. Learn to summarise Khetaram\'s route by picking only the details that carry the story.', goal: 'Summarise \'Carrier of Words\' — protagonist, Thar setting, the challenge of desert mail delivery and its resolution — with selected facts, causal sentences and zero opinion.' },
    discovery: {
        question: 'By noon the Thar sand is so hot it would melt cycle tyres — so Khetaram walks the last five kilometres with a wet cloth on his head. What\'s he carrying that\'s worth it?',
        options: ['Letters, money orders and pension forms — for villages no road reaches, his leather bag is the only link to the outside world', 'Just junk mail', 'Newspapers for tourists', 'Nothing — he just likes walking'],
        answer: 'Letters, money orders and pension forms — for villages no road reaches, his leather bag is the only link to the outside world',
        hook: 'A summary is a map, not a photograph — \'Khetaram is very brave and I feel sad\' fails because feelings and morals aren\'t facts. The exam wants the route: 5 a.m. start, bicycle till noon, then five kilometres on foot to Dhani Maliyon.',
    },
    teaching: [
        { title: 'Text Summary: Khetaram, the Gramin Dak Sewak', text: 'A text summary is a concise, objective restatement of a story\'s main events, central characters, setting, and resolution written in the student\'s own words, preserving the original sequence and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_engl_ch7_1', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compress Khetaram\'s daily odyssey into 100-150 words: who he is (Gramin Dak Sewak), where he works (Thar villages), what he battles (sandstorms, 50°C heat), why it matters (pensions, letters, government schemes) — no opinions allowed.',
        labels: ['Text Summary: Khetaram,', 'Discussion: Communication Infrastructure', 'Character Study: Khetaram\'s Dedication', 'Theme: Service and Duty', 'Theme: Connectivity in Remote', 'Setting: The Thar Desert'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_engl_ch7_1', title: 'Text Summary: Khetaram, the Gramin Dak Sewak',
          caseStudy: { intro: 'Imagine you have just two minutes to tell a younger sibling the entire story of a film you watched — you would name the hero, the place, the big problem, the.',
            decisions: [{ prompt: 'What is the primary purpose of a text summary in an English examination?', options: [
                { text: 'The primary purpose is to demonstrate that the student has comprehended the core narrative', outcome: 'The primary purpose is to demonstrate that the student has comprehended the core narrative — main.' },
                { text: 'to give your opinion on the story', outcome: 'Not quite — Students believe a summary must include *every* event in the story in minute detail, leading.', reveals: 'a-summary-must-include-every' },
                { text: 'to copy important lines', outcome: 'Not quite — Students believe a summary must include *every* event in the story in minute detail, leading.', reveals: 'a-summary-must-include-every' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch7_10', title: 'Discussion: Communication Infrastructure in India',
          caseStudy: { intro: 'Imagine you live in a village where the nearest post office is 20 km away across sand dunes, and your family waits months for a pension letter—how would that.',
            decisions: [{ prompt: 'What are the three main components of communication infrastructure in India as discussed in the chapter, and which one does Khetaram.', options: [
                { text: 'The three components are physical infrastructure (post offices, roads, towers), digital', outcome: 'The three components are physical infrastructure (post offices, roads, towers), digital.' },
                { text: 'post offices and internet', outcome: 'Not quite — Students equate "communication infrastructure" solely with internet and mobile towers, treating the.', reveals: 'students-equate-communication-infrastructure-sol' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch7_2', title: 'Character Study: Khetaram\'s Dedication in the Thar Desert',
          caseStudy: { intro: 'Imagine you are a detective trying to understand a real-life hero who delivers letters across scorching sand dunes where temperatures hit 50°C.',
            decisions: [{ prompt: 'What is the primary purpose of a character study in literature?', options: [
                { text: 'A character study analyzes a character\'s traits, motivations, and development using', outcome: 'A character study analyzes a character\'s traits, motivations, and development using textual.' },
                { text: 'to summarize what the character does', outcome: 'Not quite — Students treat Khetaram as a "flat symbol of duty" rather than a rounded human shaped by specific.', reveals: 'students-treat-khetaram-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch7_3', title: 'Theme: Service and Duty in Extreme Conditions',
          caseStudy: { intro: 'Imagine you see a delivery person cycling through a flooded street during monsoon to deliver a medicine parcel — you\'d likely think "that\'s just their job.".',
            decisions: [{ prompt: 'What is the difference between a \'topic\' (like \'postal service\') and a \'theme\' (like \'service and duty in extreme conditions\') in literary.', options: [
                { text: 'A topic is the subject (what the text is about)', outcome: 'A topic is the subject (what the text is about); a theme is the author\'s insight or message about.' },
                { text: 'they are the same', outcome: 'Not quite — Students think "theme = moral lesson" (e.g., "we should be dutiful like Khetaram").', reveals: 'theme-moral-lesson-e' },
                { text: 'theme = moral lesson', outcome: 'Not quite — Students think "theme = moral lesson" (e.g., "we should be dutiful like Khetaram").', reveals: 'theme-moral-lesson-e' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch7_4', title: 'Theme: Connectivity in Remote and Rural India',
          caseStudy: { intro: 'Imagine you live in a village where the nearest town is 50 km away across sand dunes, and your only link to your son working in the city is a letter carried.',
            decisions: [{ prompt: 'Define the theme \'connectivity in remote and rural India\' as it applies to the chapter "Carrier of Words" in one sentence.', options: [
                { text: 'Correct answer: The theme refers to how the postal service, embodied by Khetaram,', outcome: 'Correct answer: The theme refers to how the postal service, embodied by Khetaram, physically and.' },
                { text: 'letters being delivered', outcome: 'Not quite — Students often think "connectivity" in this chapter means only the physical transport of letters.', reveals: 'connectivity-in-this-chapter-means' },
                { text: 'connectivity', outcome: 'Not quite — Students often think "connectivity" in this chapter means only the physical transport of letters.', reveals: 'connectivity-in-this-chapter-means' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch7_5', title: 'Setting: The Thar Desert and Its Challenges',
          caseStudy: { intro: 'Imagine standing in the Thar Desert at noon in June. The sand beneath your feet is hot enough to burn through shoes.',
            decisions: [{ prompt: 'Name three geographic features of the Thar Desert that make it a challenging environment for the story\'s characters.', options: [
                { text: 'Three features: (1) Extreme temperatures', outcome: 'Three features: (1) Extreme temperatures — up to 50C in summer, near-freezing in winter, creating.' },
                { text: 'it is hot', outcome: 'Not quite — Students treat the setting as mere backdrop — "where the story happens." The exact error: they.', reveals: 'students-treat-the-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch7_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Summarising \'Khetaram, the Gramin Dak Sewak,\' a student writes: \'Khetaram is a very brave man walking in the hot desert. I feel sad for him in the sandstorms. The story teaches us to work hard.\'',
            decisions: [{ prompt: 'What rules of summary does this break?', options: [
                { text: 'Two at once: \'I feel sad\' is a personal reaction and \'teaches us to work hard\' is a moral — both interpretation, not plot. A summary reports objectively: a Gramin Dak Sewak crossing the Thar by bicycle and on foot through 50°C heat so isolated villages get letters, pensions and government notices.', outcome: 'This swaps evaluation for evidence — the factual who-where-what of the route and its stakes, which is all a summary is permitted to carry.' },
                { text: 'None — feelings and morals show the student understood the story deeply, which examiners reward.', outcome: 'Emotional response is a different question type entirely; inside a summary it is ruled out, and \'work hard\' replaces the story\'s actual content.', reveals: 'feelings-count' },
                { text: 'The only fix needed is naming every village on Khetaram\'s route, since thoroughness makes a summary complete.', outcome: 'A travelogue of every stop violates conciseness; a summary selects representative detail — it is a map, not a photograph.', reveals: 'list-all-villages' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch7_5', title: 'The bigger picture',
          caseStudy: { intro: 'One man, one leather bag, an entire desert — the Gramin Dak Sewak keeps cut-off villages connected to the world. And a summary of it needs cause-and-effect sentences, not \'he walked a lot.\'',
            decisions: [{ prompt: 'What comes next? Carrier of Words · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Carrier of Words · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_engl_ch7_1', difficulty: 'standard',
          question: 'A text summary is a concise, objective restatement of a story\'s main events.',
          hint: 'Review plot sequencing using the story map from "The Cherry Tree" (c8_engl_ch4_4).',
          misconception: 'Students believe a summary must include *every* event in the story in minute detail, leading to summaries that exceed.',
          parts: [
                { id: 'a', prompt: 'Compare these two summaries of the same story event. Which is better for a board exam and why? Summary A: "Khetaram delivered letters in the desert.', answer: 'Summary B is better',
                  options: ['Summary B is better', 'using your own words', 'changing every word', 'Khetaram rode a two-wheeled vehicle'],
                  hint: 'Review plot sequencing using the story map from "The Cherry Tree" (c8_engl_ch4_4) — identify.',
                  misconception: 'Students believe a summary must include *every* event in the story in minute detail, leading to summaries that exceed word limits and read.' }
          ],
            remediations: { 'a-summary-must-include-every': { steps: ['Give the student a familiar 100-word story (e.g., "The Thirsty Crow") and ask them to tell it in exactly three.', 'Together, highlight the three sentences\' components: (a) protagonist + problem, (b) key action + turning point, (c).', 'Provide a graphic organiser with four boxes: "Who & Where," "Problem," "Main Actions (3 only)," "Outcome." 4.', 'Have them fill it for "Khetaram" using the text, then write the summary *only* from the organiser.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch7_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe a summary must include *every* event in the story in minute detail, leading to summaries that exceed.',
          parts: [
                { id: 'a', prompt: 'A classmate argues: "Since the story is called \'Khetaram, the Gramin Dak Sewak,\' a good summary should start with his job title and then list every village.', answer: 'The claim is partially correct but flawed',
                  options: ['The claim is partially correct but flawed', 'using your own words', 'changing every word', 'Khetaram rode a two-wheeled vehicle'],
                  hint: 'Review plot sequencing using the story map from "The Cherry Tree" (c8_engl_ch4_4) — identify.',
                  misconception: 'Students believe a summary must include *every* event in the story in minute detail, leading to summaries that exceed word limits and read.' },
                { id: 'b', prompt: 'Create a 40-word "blurb" (back-cover description) for "Khetaram, the Gramin Dak Sewak" that would make a Class 9 student want to read it, using only facts from.', answer: 'In the blistering Thar Desert, one man on a bicycle carries more than letters',
                  options: ['In the blistering Thar Desert, one man on a bicycle carries more than letters', 'using your own words', 'changing every word', 'Khetaram rode a two-wheeled vehicle'],
                  hint: 'Review plot sequencing using the story map from "The Cherry Tree" (c8_engl_ch4_4) — identify.',
                  misconception: 'Students believe a summary must include *every* event in the story in minute detail, leading to summaries that exceed word limits and read.' }
          ],
            remediations: { 'a-summary-must-include-every': { steps: ['Give the student a familiar 100-word story (e.g., "The Thirsty Crow") and ask them to tell it in exactly three.', 'Together, highlight the three sentences\' components: (a) protagonist + problem, (b) key action + turning point, (c).', 'Provide a graphic organiser with four boxes: "Who & Where," "Problem," "Main Actions (3 only)," "Outcome." 4.', 'Have them fill it for "Khetaram" using the text, then write the summary *only* from the organiser.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch7_10', difficulty: 'standard',
          question: 'Communication infrastructure refers to the physical and organizational.',
          hint: 'If stuck, review c9_engl_ch7_8 (Real-Life Context: Gramin Dak Sewaks and Rural Post.',
          misconception: 'Students equate "communication infrastructure" solely with internet and mobile towers, treating the postal network and.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "last-mile connectivity" to a new scenario: A tribal village in Odisha has 4G coverage on paper but villagers cannot access online.', answer: 'Physical: No electricity to charge phones → Solution: Solar charging stations',
                  options: ['Physical: No electricity to charge phones → Solution: Solar charging stations', 'no internet', 'illiteracy'],
                  hint: 'If stuck, review c9_engl_ch7_8 (Real-Life Context: Gramin Dak Sewaks and Rural Post Offices) for.',
                  misconception: 'Students equate "communication infrastructure" solely with internet and mobile towers, treating the postal network and human carriers.' }
          ],
            remediations: { 'students-equate-communication-infrastructure-sol': { steps: ['Ask the student to list five things Khetaram carries that cannot be sent via WhatsApp (e.g., cash, medicine, registered.', 'Have them mark a map of India showing Thar Desert, Ladakh, Northeast tribal belts—ask "does 4G reach every hamlet here.', 'Show the India Post 2023 annual report statistic: 1.5 lakh post offices, 90% in rural areas, handling 150 crore.', 'Co-write a definition of infrastructure as "physical + digital + human layers" and have the student apply it to their.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch7_2', difficulty: 'standard',
          question: 'A character study is a detailed analysis of a literary figure\'s personality.',
          hint: 'Review c6_english_u4_032 (Suraj\'s character) – practice the "choice-consequence" table.',
          misconception: 'Students treat Khetaram as a "flat symbol of duty" rather than a rounded human shaped by specific desert hardships.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A character study is a detailed analysis of a literary figure\'s personality traits,',
                  options: ['A character study is a detailed analysis of a literary figure\'s personality traits,', 'A text summary is a concise, objective restatement of a story\'s main events, central', 'Communication infrastructure refers to the physical and organizational systems—such as', 'A theme is the central idea or underlying message about life, society, or human nature'],
                  hint: 'Review c6_english_u4_032 (Suraj\'s character) – practice the "choice-consequence" table with.',
                  misconception: 'Students treat Khetaram as a "flat symbol of duty" rather than a rounded human shaped by specific desert hardships.' }
          ],
            remediations: { 'students-treat-khetaram-as-a': { steps: ['Have the student list 5 specific *choices* Khetaram makes in one day (e.g., wakes at 4 AM, ties rope, takes shaded.', 'For each choice, ask: "What would happen if he *didn\'t* do this?" – linking action to consequence for villagers.', 'Have them rewrite the trait statement as: "Khetaram\'s dedication is shown when he [choice], because without.', 'Practice with Suraj from "The Tunnel" (c6_english_u4_032) first – a familiar character – then transfer to Khetaram.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch7_3', difficulty: 'standard',
          question: 'A theme is the central idea or underlying message about life, society, or human.',
          hint: 'Review c9_engl_ch7_2 Character Study — re-create the "Choice vs.',
          misconception: 'Students think "theme = moral lesson" (e.g., "we should be dutiful like Khetaram"). This is a Class 6-8 carryover.',
          parts: [
                { id: 'a', prompt: 'What is the difference between a \'topic\' (like \'postal service\') and a \'theme\' (like \'service and duty in extreme conditions\') in literary analysis?', answer: 'A topic is the subject (what the text is about)',
                  options: ['A topic is the subject (what the text is about)', 'they are the same', 'theme = moral lesson', 'we should be dutiful like Khetaram'],
                  hint: 'Review c9_engl_ch7_2 Character Study — re-create the "Choice vs. Hardship" T-chart from that node.',
                  misconception: 'Students think "theme = moral lesson" (e.g., "we should be dutiful like Khetaram"). This is a Class 6-8 carryover.' },
                { id: 'b', prompt: 'In the text, Khetaram continues his round during a sandstorm. A student writes: "The theme is that Khetaram is brave." Why is this an incomplete theme.', answer: '"Bravery" is a character trait, not a theme',
                  options: ['"Bravery" is a character trait, not a theme', 'theme = moral lesson', 'we should be dutiful like Khetaram', '"theme = moral lesson" (e'],
                  hint: 'Review c9_engl_ch7_2 Character Study — re-create the "Choice vs. Hardship" T-chart from that node.',
                  misconception: 'Students think "theme = moral lesson" (e.g., "we should be dutiful like Khetaram"). This is a Class 6-8 carryover.' },
                { id: 'c', prompt: 'Apply the \'pattern of choices\' method: Find two separate incidents in the chapter where Khetaram chooses duty over personal safety/comfort.', answer: 'Incident 1: Walking barefoot on burning sand to deliver a pension letter',
                  options: ['Incident 1: Walking barefoot on burning sand to deliver a pension letter', 'theme = moral lesson', 'we should be dutiful like Khetaram', '"theme = moral lesson" (e'],
                  hint: 'Review c9_engl_ch7_2 Character Study — re-create the "Choice vs. Hardship" T-chart from that node.',
                  misconception: 'Students think "theme = moral lesson" (e.g., "we should be dutiful like Khetaram"). This is a Class 6-8 carryover.' }
          ],
            remediations: { 'theme-moral-lesson-e': { steps: ['Have the student re-read only the sandstorm paragraph (para 4 in most editions) and list: (a) what the desert does, (b).', 'Ask: "If this were a movie, what would the camera focus on to show \'duty\' without words?" 3.', 'Co-construct a theme statement using the frame: "In [text], [author] suggests that [universal human truth] because.', 'Practice converting three "Khetaram is..." sentences into one "The text shows that..." statement.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch7_4', difficulty: 'standard',
          question: 'Connectivity in remote and rural India refers to the physical, social, and.',
          hint: 'If stuck, review the "Theme: Service and Duty" node (c9_engl_ch7_3) to recall how.',
          misconception: 'Students often think "connectivity" in this chapter means only the physical transport of letters.',
          parts: [
                { id: 'a', prompt: 'In the chapter, Khetaram carries not just letters but also medicines, money orders, and pension forms.', answer: 'Correct answer (example for money orders): The money order connects the village',
                  options: ['Correct answer (example for money orders): The money order connects the village', 'dimensions of connectivity', 'connectivity', '"connectivity" in this chapter means only the physical transport of letters'],
                  hint: 'If stuck, review the "Theme: Service and Duty" node (c9_engl_ch7_3) to recall how Khetaram\'s.',
                  misconception: 'Students often think "connectivity" in this chapter means only the physical transport of letters.' }
          ],
            remediations: { 'connectivity-in-this-chapter-means': { steps: ['If a student reduces connectivity to mail delivery: (1) Ask them to list every distinct item Khetaram carries in one.', '(2) Have them circle which needs are emotional vs.', '(3) Guide them to rewrite the theme statement using all three categories.', '(4) Finally, ask: "If Khetaram delivered only letters but no medicines or pensions, would the village survive?" This.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch7_5', difficulty: 'standard',
          question: 'The setting of the Thar Desert in the Class 9 English chapter refers to the.',
          hint: 'Revisit c9_engl_ch7_1 (Story Summary) for the plot context, and c9_geo_ch1_11 (Geography.',
          misconception: 'Students treat the setting as mere backdrop — "where the story happens." The exact error: they describe the desert\'s.',
          parts: [
                { id: 'a', prompt: 'Name three geographic features of the Thar Desert that make it a challenging environment for the story\'s characters.', answer: 'Three features: (1) Extreme temperatures',
                  options: ['Three features: (1) Extreme temperatures', 'it is hot'],
                  hint: 'Revisit c9_engl_ch7_1 (Story Summary) for the plot context, and c9_geo_ch1_11 (Geography: Thar.',
                  misconception: 'Students treat the setting as mere backdrop — "where the story happens." The exact error: they describe the desert\'s features without.' },
                { id: 'b', prompt: 'Explain how the Thar Desert setting functions as more than a backdrop. Give one example of how the setting drives a character\'s decision.', answer: 'The setting is an active force that shapes character decisions',
                  options: ['The setting is an active force that shapes character decisions', 'the desert is where the story happens'],
                  hint: 'Revisit c9_engl_ch7_1 (Story Summary) for the plot context, and c9_geo_ch1_11 (Geography: Thar.',
                  misconception: 'Students treat the setting as mere backdrop — "where the story happens." The exact error: they describe the desert\'s features without.' }
          ],
            remediations: { 'students-treat-the-setting-as': { steps: ['Give the student a map of the Thar Desert showing temperature, rainfall, and terrain.', 'Ask: "If you lived here, what would your daily routine look like?', 'Connect their answers to the story: "Now look at what the characters do — do their decisions match the environment\'s.', 'Create a table: Environmental feature | Challenge it creates | Character\'s response.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
