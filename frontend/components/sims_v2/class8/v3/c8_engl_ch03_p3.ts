import type { SimDef } from '../../engine/types';

/** v3 generated — c8_engl_ch03_p3 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_engl_ch03_p3: SimDef = {
    id: 'v3_c8_engl_ch03_p3',
    title: 'The Case of the Fifth Word · Part 3/3',
    subtitle: 'The detective who notices what adults miss',
    classLevel: 8, subject: 'engl', topic: 'The Case of the Fifth Word · Part 3/3',
    chapters: ['c8_engl_ch03'],
    nodeIds: ['c8_engl_ch3_5', 'c8_engl_ch3_6', 'c8_engl_ch3_7', 'c8_engl_ch3_8', 'c8_engl_ch3_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a junior detective shadowing Encyclopedia Brown', intro: 'Grown-ups run the police station, but a kid keeps solving their cases. Your job: figure out what he sees that they don\'t — and why being young is actually his edge.', goal: 'Analyze Encyclopedia Brown\'s character — how his observation-first, assumption-free approach to clues drives the mystery and the theme that truth requires verification.' },
    discovery: {
        question: 'Tim Nolan swears he was at the jewellery store at 3:00 PM — but the store clock stopped at 2:45. Why does that crack his alibi?',
        options: ['Encyclopedia Brown checks alibis against physical evidence — the stopped clock proves Tim\'s timing was a lie', 'Clocks are always slow in jewellery stores', '3:00 and 2:45 are basically the same time', 'He got lucky guessing'],
        answer: 'Encyclopedia Brown checks alibis against physical evidence — the stopped clock proves Tim\'s timing was a lie',
        hook: 'Adults accept what witnesses say; a kid detective tests it. Encyclopedia Brown\'s real superpower isn\'t luck or book knowledge — it\'s refusing to assume, and noticing the tiny detail everyone else waved past.',
    },
    teaching: [
        { title: 'Character Analysis: Chief Brown and His Reliance on Encyclopedia', text: 'Character analysis of Chief Brown focuses on identifying his personality traits, motivations, and relationship dynamics—specifically his habitual reliance on his son Encyclopedia to solve baffling.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_engl_ch3_5', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build a character case file on Encyclopedia Brown: collect the moments where he spots what adults miss, compare how he and Chief Brown treat the same clue, and prove his \'skill\' is observation, not luck.',
        labels: ['Character Analysis: Chief Brown', 'Theme: Observation and Logical', 'Literary Device: Foreshadowing', 'Vocabulary in Context: Nickname,', 'Comprehension: How Encyclopedia Solved'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_engl_ch3_5', title: 'Character Analysis: Chief Brown and His Reliance on Encyclopedia',
          caseStudy: { intro: 'Think about a time when a parent or teacher asked you for help with something they usually handle themselves—like a tech issue or a tricky recipe.',
            decisions: [{ prompt: 'What is Chief Brown’s profession, and whom does he consistently consult when he cannot crack a case?', options: [
                { text: 'Chief Brown is the police chief of Idaville, and he consistently consults his son,', outcome: 'Chief Brown is the police chief of Idaville, and he consistently consults his son, Encyclopedia.' },
                { text: 'he consults his partner or a forensic expert', outcome: 'Not quite — Students often mistake Chief Brown’s reliance on Encyclopedia for incompetence, reasoning that.', reveals: 'students-often-mistake-chief-brown' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch3_6', title: 'Theme: Observation and Logical Reasoning in Solving Mysteries',
          caseStudy: { intro: 'Think about when you lost your sports kit bag last week. You retracing your steps, checking where you last had it, asking friends if they saw it, and noticing.',
            decisions: [{ prompt: 'What is the central theme of "The Case of the Fifth Word" as discussed in this node?', options: [
                { text: 'The central theme is that observation and logical reasoning are essential for solving', outcome: 'The central theme is that observation and logical reasoning are essential for solving mysteries.' },
                { text: 'the theme is about friendship', outcome: 'Not quite — Students often think the theme is simply "being a good detective" or "paying attention," reducing.', reveals: 'the-theme-is-simply-being' },
                { text: 'being a good detective', outcome: 'Not quite — Students often think the theme is simply "being a good detective" or "paying attention," reducing.', reveals: 'the-theme-is-simply-being' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch3_7', title: 'Literary Device: Foreshadowing and Clue-Planting in Detective Fiction',
          caseStudy: { intro: 'Imagine you are watching a cricket match and the commentator says, "The bowler has been practicing a special delivery all week in the nets." You instantly know.',
            decisions: [{ prompt: 'What is the definition of foreshadowing in the context of a detective story?', options: [
                { text: 'Foreshadowing in a detective story is when the author gives hints or clues early in the', outcome: 'Foreshadowing in a detective story is when the author gives hints or clues early in the narrative.' },
                { text: 'predicting the future', outcome: 'Not quite — Students often confuse foreshadowing with "spoilers" or think any early detail is foreshadowing.', reveals: 'students-often-confuse-foreshadowing-with' },
                { text: 'a flashforward', outcome: 'Not quite — Students often confuse foreshadowing with "spoilers" or think any early detail is foreshadowing.', reveals: 'students-often-confuse-foreshadowing-with' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch3_8', title: 'Vocabulary in Context: Nickname, Matter-of-Fact, Anagrams',
          caseStudy: { intro: 'Think about how your friends might call you by a special name at school—maybe "Champ" if you\'re good at sports, or "Professor" if you love books.',
            decisions: [{ prompt: 'What is a nickname in the context of literary analysis?', options: [
                { text: 'A nickname is an alternative name given to a character that reveals something about their', outcome: 'A nickname is an alternative name given to a character that reveals something about their.' },
                { text: 'A nickname is just another name people call you', outcome: 'Not quite — Students often believe that anagrams in stories are merely fun word puzzles with no deeper literary.', reveals: 'anagrams-in-stories-are-merely' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch3_5', title: 'Use it in the wild',
          caseStudy: { intro: 'In a book-club discussion, a classmate says Encyclopedia Brown cracks cases because \'he\'s just the smartest person in town — smarter than every adult.\' A teammate wants to argue the real reason is something else entirely.',
            decisions: [{ prompt: 'What actually makes the boy detective effective?', options: [
                { text: 'His childlike perspective — he questions the assumptions adults take for granted and spots the small, mundane details they dismiss, like a stopped clock contradicting a suspect\'s alibi. His repeatable method is observation, not luck or superior book knowledge.', outcome: 'This links trait to theme correctly: his age gives him fresh eyes, which is precisely what lets him see what experience-blinded adults miss.' },
                { text: 'The first classmate is right — reading that many books simply makes him smarter than the grown-ups, including the police chief.', outcome: 'The stories show him beating adults at noticing, not knowing; his edge is a viewpoint free of adult assumptions, not a bigger memory.', reveals: 'smartest-kid-wins' },
                { text: 'It is mostly luck — he happens to glance at the right detail at the right moment in each case.', outcome: 'Luck is not repeatable, but his method is: he deliberately checks statements against physical evidence every single time.', reveals: 'detective-by-luck' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch3_9', title: 'You made it',
          caseStudy: { intro: 'The boy detective wins because he assumes nothing. Where adults trust procedure and appearances, he trusts a stopped clock — small overlooked details are where truth hides.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_engl_ch3_5', difficulty: 'standard',
          question: 'Character analysis of Chief Brown focuses on identifying his personality.',
          hint: 'Review the PEEL paragraph structure (Point, Evidence, Explanation, Link) practiced.',
          misconception: 'Students often mistake Chief Brown’s reliance on Encyclopedia for incompetence, reasoning that a police chief should.',
          parts: [
                { id: 'a', prompt: 'In your own words, explain why Chief Brown relies on Encyclopedia instead of solving every case entirely on his own.', answer: 'Chief Brown relies on Encyclopedia',
                  options: ['Chief Brown relies on Encyclopedia', 'incompetent'],
                  hint: 'Review the PEEL paragraph structure (Point, Evidence, Explanation, Link) practiced in Class 7.',
                  misconception: 'Students often mistake Chief Brown’s reliance on Encyclopedia for incompetence, reasoning that a police chief should solve crimes unaided.' }
          ],
            remediations: { 'students-often-mistake-chief-brown': { steps: ['If a student insists Chief Brown is weak, use a two-column T-chart.', 'Label the left column "Chief Brown’s Actions" and the right "What It Shows." Together, list: (1) He brings cases home →.', '(2) He presents the facts clearly → He respects the process.', '(3) He arrests the culprit based on the solution → He acts decisively.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch3_6', difficulty: 'standard',
          question: 'The theme of observation and logical reasoning in solving mysteries refers.',
          hint: 'If stuck, review the process of theme identification from Class 7: look for recurring.',
          misconception: 'Students often think the theme is simply "being a good detective" or "paying attention," reducing observation and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The theme of observation and logical reasoning in solving mysteries refers to the central',
                  options: ['The theme of observation and logical reasoning in solving mysteries refers to the central', 'Character analysis involves examining a fictional character\'s traits, motivations, and', 'Evidence consists of verifiable, explicit facts, clues, or direct quotes provided', 'An anagram is a word play technique where the letters of a word or phrase are rearranged'],
                  hint: 'If stuck, review the process of theme identification from Class 7: look for recurring ideas, check.',
                  misconception: 'Students often think the theme is simply "being a good detective" or "paying attention," reducing observation and logical reasoning.' }
          ],
            remediations: { 'the-theme-is-simply-being': { steps: ['To fix this, guide the student to reread a key scene (e.g., the library alibi contradiction) and ask: "What exactly did.', 'What known fact did he use?', 'How did he connect them to reach a conclusion?" Then have them fill a three-column chart: Observation (what was seen).', 'This forces separation of observation from reasoning and shows how both are needed to build thematic meaning—moving.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch3_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the theme is simply "being a good detective" or "paying attention," reducing observation and.',
          parts: [
                { id: 'a', prompt: 'Some readers think the mystery’s solution is too obvious after it’s revealed.', answer: 'The solution is fair',
                  options: ['The solution is fair', 'being a good detective', 'paying attention'],
                  hint: 'If stuck, review the process of theme identification from Class 7: look for recurring ideas, check.',
                  misconception: 'Students often think the theme is simply "being a good detective" or "paying attention," reducing observation and logical reasoning.' }
          ],
            remediations: { 'the-theme-is-simply-being': { steps: ['To fix this, guide the student to reread a key scene (e.g., the library alibi contradiction) and ask: "What exactly did.', 'What known fact did he use?', 'How did he connect them to reach a conclusion?" Then have them fill a three-column chart: Observation (what was seen).', 'This forces separation of observation from reasoning and shows how both are needed to build thematic meaning—moving.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch3_7', difficulty: 'standard',
          question: 'Foreshadowing in detective fiction is the author\'s technique of planting subtle.',
          hint: 'Review c8_engl_ch3_4 (Detective Genre conventions) and re-read the story\'s first two.',
          misconception: 'Students often confuse foreshadowing with "spoilers" or think any early detail is foreshadowing.',
          parts: [
                { id: 'a', prompt: 'In "The Case of the Fifth Word," the story opens with Encyclopedia Brown sitting at the dining table while his father, Chief Brown, discusses a baffling case.', answer: 'The dining table opening establishes the routine dynamic',
                  options: ['The dining table opening establishes the routine dynamic', 'setting the scene', 'introducing characters', 'spoilers'],
                  hint: 'Review c8_engl_ch3_4 (Detective Genre conventions) and re-read the story\'s first two pages with.',
                  misconception: 'Students often confuse foreshadowing with "spoilers" or think any early detail is foreshadowing.' },
                { id: 'b', prompt: 'Read this short excerpt from a mystery story: *"Mrs. Sharma placed the teacup on the saucer with a distinct click, the only sound in the quiet kitchen.', answer: 'The planted clue is "she stirred twice" despite never using sugar',
                  options: ['The planted clue is "she stirred twice" despite never using sugar', 'it shows she is nervous', 'it\'s just a habit', 'spoilers'],
                  hint: 'Review c8_engl_ch3_4 (Detective Genre conventions) and re-read the story\'s first two pages with.',
                  misconception: 'Students often confuse foreshadowing with "spoilers" or think any early detail is foreshadowing.' },
                { id: 'c', prompt: 'Compare the function of the "fifth word" clue in the story\'s title with the clue of the "missing receipt" in the Tim Nolan jewellery robbery subplot.', answer: 'The "fifth word" clue in the title is a structural foreshadowing device',
                  options: ['The "fifth word" clue in the title is a structural foreshadowing device', 'spoilers', 'any early detail is foreshadowing'],
                  hint: 'Review c8_engl_ch3_4 (Detective Genre conventions) and re-read the story\'s first two pages with.',
                  misconception: 'Students often confuse foreshadowing with "spoilers" or think any early detail is foreshadowing.' }
          ],
            remediations: { 'students-often-confuse-foreshadowing-with': { steps: ['If a student cannot distinguish clue from atmosphere, give them two highlighters: one for "details that help solve the.', 'Then ask: "If you removed each highlighted detail, would the solution still make sense?" If yes, it\'s not a structural.', 'Practice this with three different mystery openings until they consistently identify the 2-3 genuine clues per opening.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch3_8', difficulty: 'standard',
          question: 'Vocabulary in context involves understanding how words like nicknames.',
          hint: 'If students struggle to see why an author chose a specific word like a nickname.',
          misconception: 'Students often believe that anagrams in stories are merely fun word puzzles with no deeper literary purpose, thinking.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in context involves understanding how words like nicknames (alternative names',
                  options: ['Vocabulary in context involves understanding how words like nicknames (alternative names', 'Character analysis involves examining a fictional character\'s traits, motivations, and', 'Evidence consists of verifiable, explicit facts, clues, or direct quotes provided', 'An anagram is a word play technique where the letters of a word or phrase are rearranged'],
                  hint: 'If students struggle to see why an author chose a specific word like a nickname or anagram, they.',
                  misconception: 'Students often believe that anagrams in stories are merely fun word puzzles with no deeper literary purpose, thinking the author includes.' }
          ],
            remediations: { 'anagrams-in-stories-are-merely': { steps: ['To fix this misconception, first have students reread a specific anagram clue from the text (e.g., the scrambled word.', 'Then, guide them through three steps: 1) Identify the literal scrambled letters given, 2) Rearrange them to find the.', 'Emphasize that the author planted this anagram *specifically* to test observation skills—if it were just for fun.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch3_9', difficulty: 'standard',
          question: 'Comprehension of a detective narrative\'s resolution involves identifying the.',
          hint: 'If stuck, review `c8_engl_ch3_4` to understand how detectives isolate clues from ordinary.',
          misconception: 'Students often assume that solving a literary mystery relies on guessing hidden information or assuming facts outside.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comprehension of a detective narrative\'s resolution involves identifying the key clue',
                  options: ['Comprehension of a detective narrative\'s resolution involves identifying the key clue', 'Character analysis involves examining a fictional character\'s traits, motivations, and', 'Evidence consists of verifiable, explicit facts, clues, or direct quotes provided', 'An anagram is a word play technique where the letters of a word or phrase are rearranged'],
                  hint: 'If stuck, review `c8_engl_ch3_4` to understand how detectives isolate clues from ordinary.',
                  misconception: 'Students often assume that solving a literary mystery relies on guessing hidden information or assuming facts outside the text, rather than.' }
          ],
            remediations: { 'solving-a-literary-mystery-relies': { steps: ['To correct this misconception: 1.', 'Direct the student back to the specific passage containing the suspect\'s direct speech.', 'Have the student underline every noun, verb, and detail in that speech (e.g., "dry paper," "heavy rain," "fifth word").', 'Ask the guiding question: "Which two words or facts in this sentence cannot exist together in real life?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
