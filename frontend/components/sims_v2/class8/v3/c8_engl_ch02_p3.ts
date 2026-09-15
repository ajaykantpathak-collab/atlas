import type { SimDef } from '../../engine/types';

/** v3 generated — c8_engl_ch02_p3 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_engl_ch02_p3: SimDef = {
    id: 'v3_c8_engl_ch02_p3',
    title: 'A Tale of Valour: Major Somnath Sharma and the Battle of Badgam · Part 3/3',
    subtitle: 'The forty-eight hours that decided Kashmir',
    classLevel: 8, subject: 'engl', topic: 'A Tale of Valour: Major Somnath Sharma and the Battle of Badgam · Part 3/3',
    chapters: ['c8_engl_ch02'],
    nodeIds: ['c8_engl_ch2_5', 'c8_engl_ch2_6', 'c8_engl_ch2_7', 'c8_engl_ch2_8', 'c8_engl_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a young officer at Srinagar airfield, 1947', intro: 'Invaders are burning Baramulla and marching on your runway — the only way reinforcements can arrive. Understand the accession, the airlift and the battle that followed, before the valley is cut off.', goal: 'Understand the 1947 tribal invasion of Kashmir, the Instrument of Accession, and how Operation Gulmarg and the Battle of Badgam flowed from the defence of Srinagar airport.' },
    discovery: {
        question: 'October 1947: tribal invaders are 20 km from Srinagar and the airport is the valley\'s only lifeline. Why did Indian troops land there on October 27 — and only then?',
        options: ['Maharaja Hari Singh signed the Instrument of Accession on October 26 — Indian troops could only legally enter after Kashmir joined India', 'India had planned to capture Kashmir for months', 'The United Nations ordered the landing', 'The troops were already stationed in Srinagar'],
        answer: 'Maharaja Hari Singh signed the Instrument of Accession on October 26 — Indian troops could only legally enter after Kashmir joined India',
        hook: 'Operation Gulmarg wasn\'t a pre-planned grab — it was an emergency rescue. Invaders reached Baramulla first, the Maharaja acceded in panic, and only then did Indian soldiers fly in to defend the airport. Sequence changes everything.',
    },
    teaching: [
        { title: 'Param Vir Chakra: India\'s Highest Gallantry Award', text: 'The Param Vir Chakra is India\'s highest military decoration, awarded for the most conspicuous bravery or daring or pre-eminent act of valour or self-sacrifice in the presence of the enemy, whether.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_engl_ch2_5', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Rebuild the timeline of October 1947: invaders reach Baramulla, the Maharaja signs accession, troops land at Srinagar. Then stand at Badgam on November 3 and see why Major Somnath Sharma\'s stand mattered.',
        labels: ['Param Vir Chakra: India\'s', 'Theme: Sacrifice, Patriotism,', 'Kumaon Regiment: Major Somnath', 'Literary Device: First-Person Narrative', 'Vocabulary in Context: Etched,'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_engl_ch2_5', title: 'Param Vir Chakra: India\'s Highest Gallantry Award',
          caseStudy: { intro: 'Think about the last time you saw someone receive a prize for doing something truly brave—maybe a classmate who helped stop a bully or a neighbour who rescued.',
            decisions: [{ prompt: 'What is the Param Vir Chakra?', options: [
                { text: 'The Param Vir Chakra is India\'s highest military decoration awarded for the most', outcome: 'The Param Vir Chakra is India\'s highest military decoration awarded for the most conspicuous.' },
                { text: 'It is a award for good students', outcome: 'Not quite — Students often believe the Param Vir Chakra is awarded for any act of bravery in military service.', reveals: 'the-param-vir-chakra-is' },
                { text: 'bravery', outcome: 'Not quite — Students often believe the Param Vir Chakra is awarded for any act of bravery in military service.', reveals: 'the-param-vir-chakra-is' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch2_6', title: 'Theme: Sacrifice, Patriotism, and Duty',
          caseStudy: { intro: 'Imagine you see a friend about to fall from a height and you push them back, risking your own injury—what motivates you to act?',
            decisions: [{ prompt: '**REMEMBER:** What is the definition of “theme” in a literary text?', options: [
                { text: 'The theme is the central idea or underlying message that the author explores through the', outcome: 'The theme is the central idea or underlying message that the author explores through the story.' },
                { text: 'the theme is the setting of the story', outcome: 'Not quite — Students often think the theme of the chapter is simply “bravery in battle” and overlook how.', reveals: 'the-theme-of-the-chapter' },
                { text: 'bravery in battle', outcome: 'Not quite — Students often think the theme of the chapter is simply “bravery in battle” and overlook how.', reveals: 'the-theme-of-the-chapter' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch2_8', title: 'Literary Device: First-Person Narrative and Patriotic Tone',
          caseStudy: { intro: 'Imagine reading a letter from a friend who says, "I felt so proud when I helped clean our school garden." How does that make you feel compared to just hearing.',
            decisions: [{ prompt: 'What pronouns identify a text as using first-person narrative?', options: [
                { text: 'First-person narrative uses pronouns like I, me, my, we, us, our', outcome: 'First-person narrative uses pronouns like I, me, my, we, us, our.' },
                { text: 'he/she/they', outcome: 'Not quite — Students think that any text containing "I" automatically has patriotic tone if it mentions India.', reveals: 'any-text-containing-i-automatically' },
                { text: 'I went to Delhi', outcome: 'Not quite — Students think that any text containing "I" automatically has patriotic tone if it mentions India.', reveals: 'any-text-containing-i-automatically' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch2_9', title: 'Vocabulary in Context: Etched, Beacon, Valour, Infiltrators, Annex',
          caseStudy: { intro: 'Imagine you\'re reading a cricket match report and see the word " Yorker" in: "The bowler delivered a perfect Yorker that knocked over the stumps." You don\'t.',
            decisions: [{ prompt: 'What is the very first thing you should do when you come across an unfamiliar word while reading a passage?', options: [
                { text: 'The first step is to read the sentence containing the word carefully to look for context', outcome: 'The first step is to read the sentence containing the word carefully to look for context clues.' },
                { text: 'valour, which means courage', outcome: 'Not quite — Students often believe context clues only work when an explicit definition or synonym appears right.', reveals: 'context-clues-only-work-when' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch2_5', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend summarises a chapter on 1947: \'India launched Operation Gulmarg to grab Kashmir, sent troops in first, and the Maharaja signed papers later to make it legal.\' Another student frowns at the sequence.',
            decisions: [{ prompt: 'What does the correct order of events show?', options: [
                { text: 'The invasion came first — tribesmen reached Baramulla by 24 October; the Maharaja signed the Instrument of Accession on 26 October; only then did Indian troops land at Srinagar airport on 27 October. Gulmarg began as an emergency defence of the valley\'s only air lifeline, not a land grab.', outcome: 'This keeps the sequence straight and shows why accession had to precede deployment — Indian entry was legally impossible before it.' },
                { text: 'The friend\'s version works — the paperwork is just a formality that could follow the troops.', outcome: 'Reversing accession and troop landing turns a defensive response into an invasion; the legal accession is what made the deployment possible at all.', reveals: 'troops-before-accession' },
                { text: 'The Maharaja invited Indian troops weeks earlier as part of a pre-planned offensive to take the whole region.', outcome: 'He had actually delayed choosing either country, hoping to stay independent; only the tribal invasion forced his hand — nothing about it was pre-planned expansion.', reveals: 'pre-planned-offensive' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch2_9', title: 'You made it',
          caseStudy: { intro: 'History turns on sequence: invasion → accession → airlift. The Battle of Badgam wasn\'t aggression — it was a desperate defence of the only runway keeping Kashmir connected to India.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_engl_ch2_5', difficulty: 'standard',
          question: 'The Param Vir Chakra is India\'s highest military decoration, awarded for the.',
          hint: 'If stuck, review Class 7\'s unit on Bravehearts (c7_engl_ch05_002 and c7_engl_ch05_004).',
          misconception: 'Students often believe the Param Vir Chakra is awarded for any act of bravery in military service, such as rigorous.',
          parts: [
                { id: 'a', prompt: 'What is the Param Vir Chakra?', answer: 'The Param Vir Chakra is India\'s highest military decoration awarded for the most',
                  options: ['The Param Vir Chakra is India\'s highest military decoration awarded for the most', 'It is a award for good students', 'bravery'],
                  hint: 'If stuck, review Class 7\'s unit on Bravehearts (c7_engl_ch05_002 and c7_engl_ch05_004) to revisit.',
                  misconception: 'Students often believe the Param Vir Chakra is awarded for any act of bravery in military service, such as rigorous training completion.' },
                { id: 'b', prompt: 'Explain in your own words why the Param Vir Chakra is considered India\'s highest gallantry award.', answer: 'It is the highest',
                  options: ['It is the highest', 'bravery'],
                  hint: 'If stuck, review Class 7\'s unit on Bravehearts (c7_engl_ch05_002 and c7_engl_ch05_004) to revisit.',
                  misconception: 'Students often believe the Param Vir Chakra is awarded for any act of bravery in military service, such as rigorous training completion.' }
          ],
            remediations: { 'the-param-vir-chakra-is': { steps: ['To fix this, first ask the student to reread the award\'s definition from the chapter: "in the presence of the enemy.".', 'Guide them to sort these into "qualifies for PVC" and "does not qualify," emphasizing that only actions involving.', 'Finally, reinforce with the chapter example: Major Somnath Sharma\'s award came from fighting infiltrators, not from his.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch2_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Param Vir Chakra is awarded for any act of bravery in military service, such as rigorous.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Param Vir Chakra loses its meaning if awarded during peacetime." Defend your position using criteria from the award\'s definition.', answer: 'The statement is valid',
                  options: ['The statement is valid', 'It should be awarded in peacetime too to encourage peacekeeping', 'bravery'],
                  hint: 'If stuck, review Class 7\'s unit on Bravehearts (c7_engl_ch05_002 and c7_engl_ch05_004) to revisit.',
                  misconception: 'Students often believe the Param Vir Chakra is awarded for any act of bravery in military service, such as rigorous training completion.' }
          ],
            remediations: { 'the-param-vir-chakra-is': { steps: ['To fix this, first ask the student to reread the award\'s definition from the chapter: "in the presence of the enemy.".', 'Guide them to sort these into "qualifies for PVC" and "does not qualify," emphasizing that only actions involving.', 'Finally, reinforce with the chapter example: Major Somnath Sharma\'s award came from fighting infiltrators, not from his.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch2_6', difficulty: 'standard',
          question: 'Theme: Sacrifice, Patriotism, and Duty refers to the central idea that.',
          hint: 'If stuck, review how to separate theme from moral or lesson using the approach from.',
          misconception: 'Students often think the theme of the chapter is simply “bravery in battle” and overlook how sacrifice, patriotism, and.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** In your own words, explain how sacrifice is shown when Major Sharma refuses to leave his post.', answer: 'Sacrifice is shown',
                  options: ['Sacrifice is shown', 'bravery in battle'],
                  hint: 'If stuck, review how to separate theme from moral or lesson using the approach from.',
                  misconception: 'Students often think the theme of the chapter is simply “bravery in battle” and overlook how sacrifice, patriotism, and duty are distinct.' }
          ],
            remediations: { 'the-theme-of-the-chapter': { steps: ['First, ask the student to list three specific things Major Sharma gave up (e.g., safety, chance to retreat, personal.', 'Second, have them identify which of those actions shows love for the country (patriotism) and which shows his.', 'Third, guide them to write a sentence linking each action to the theme: “By giving up his safety, Sharma showed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch2_7', difficulty: 'standard',
          question: 'The Kumaon Regiment is a historic infantry unit of the Indian Army, renowned.',
          hint: 'If stuck, review the character analysis of Major Somnath Sharma (c8_engl_ch2_2) to recall.',
          misconception: 'Students often treat the mention of the Kumaon Regiment as merely a factual detail akin to noting someone\'s address.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Kumaon Regiment is a historic infantry unit of the Indian Army, renowned for its',
                  options: ['The Kumaon Regiment is a historic infantry unit of the Indian Army, renowned for its', 'The historical context of the Kashmir Conflict and Operation Gulmarg (1947) refers to the', 'Comprehension of historical narratives involves analyzing textual evidence to explain', 'Critical thinking in this context means analyzing the concepts of valour and sacrifice by'],
                  hint: 'If stuck, review the character analysis of Major Somnath Sharma (c8_engl_ch2_2) to recall explicit.',
                  misconception: 'Students often treat the mention of the Kumaon Regiment as merely a factual detail akin to noting someone\'s address, failing to recognize.' }
          ],
            remediations: { 'students-often-treat-the-mention': { steps: ['To correct this, first present two versions: (1) "Major Somnath Sharma defended the post" and (2) "Major Somnath.', 'Next, guide the student to find in the text where the regiment\'s history or values are explicitly linked to a soldier\'s.', 'Finally, have them practice adding a motivational detail to a simple action sentence: instead of "He held his.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch2_8', difficulty: 'standard',
          question: 'First-person narrative is a storytelling perspective where the narrator uses.',
          hint: 'If stuck, review how to spot I/my/we/our in sentences and what words signal patriotism.',
          misconception: 'Students think that any text containing "I" automatically has patriotic tone if it mentions India or soldiers, ignoring.',
          parts: [
                { id: 'a', prompt: 'What pronouns identify a text as using first-person narrative?', answer: 'First-person narrative uses pronouns like I, me, my, we, us, our',
                  options: ['First-person narrative uses pronouns like I, me, my, we, us, our', 'he/she/they', 'I went to Delhi', 'I saw the Red Fort'],
                  hint: 'If stuck, review how to spot I/my/we/our in sentences and what words signal patriotism (e.g.',
                  misconception: 'Students think that any text containing "I" automatically has patriotic tone if it mentions India or soldiers, ignoring that patriotic tone.' },
                { id: 'b', prompt: 'Read this line: "As I guarded the runway, I thought of my family sleeping safely because I was stopping the enemy." Identify two first-person words and one.', answer: 'First-person words: I (appears twice), my',
                  options: ['First-person words: I (appears twice), my', 'runway', 'family', 'I went to Delhi'],
                  hint: 'If stuck, review how to spot I/my/we/our in sentences and what words signal patriotism (e.g.',
                  misconception: 'Students think that any text containing "I" automatically has patriotic tone if it mentions India or soldiers, ignoring that patriotic tone.' }
          ],
            remediations: { 'any-text-containing-i-automatically': { steps: ['First, highlight all I/my/we/our words in the text.', 'Second, separately highlight words/phrases showing patriotism (e.g., sacrifice, motherland, honour, brave for India).', 'Third, check if those patriotic words are tied to the narrator\'s actions/feelings (e.g., "I felt proud to defend our.', 'If patriotic words describe others or settings without narrator connection (e.g., "The soldiers were brave;.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch2_9', difficulty: 'standard',
          question: 'Vocabulary in context is the strategy of using surrounding words, sentences,.',
          hint: 'If stuck, review the four types of context clues (definition, example, synonym, antonym).',
          misconception: 'Students often believe context clues only work when an explicit definition or synonym appears right next to the word.',
          parts: [
                { id: 'a', prompt: 'In the sentence "Major Somnath Sharma\'s valour inspired his men to hold their position despite heavy enemy fire," use context clues to determine what "valour".', answer: 'Valour means great courage or bravery in danger',
                  options: ['Valour means great courage or bravery in danger', 'valour, which means courage'],
                  hint: 'If stuck, review the four types of context clues (definition, example, synonym, antonym) practiced.',
                  misconception: 'Students often believe context clues only work when an explicit definition or synonym appears right next to the word (e.g., "valour, which.' }
          ],
            remediations: { 'context-clues-only-work-when': { steps: ['To address this, explicitly teach students to ask: "What is the word DOING in this sentence?', 'What action, result, or description is connected to it?" Use the sentence "The soldiers\' valour turned the tide.', '2) Ask what it\'s doing: It\'s describing soldiers\' actions that had an effect (turned the tide).', '3) Connect to context: Turning the tide of battle requires exceptional bravery.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
