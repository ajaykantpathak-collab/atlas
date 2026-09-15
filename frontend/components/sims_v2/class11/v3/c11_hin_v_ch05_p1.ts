import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch05_p1: SimDef = {
    id: 'v3_c11_hin_v_ch05_p1',
    title: 'jktLFkku dh jtr cw¡nas · Part 1/3',
    subtitle: 'Read Rajasthani folk tales as a people\'s archive of honour codes.',
    classLevel: 11, subject: 'hin_v', topic: 'jktLFkku dh jtr cw¡nas · Part 1/3',
    chapters: ['c11_hin_v_ch05'],
    nodeIds: ['c11_hin_v_cbse_05_001', 'c11_hin_v_cbse_05_002', 'c11_hin_v_cbse_05_003', 'c11_hin_v_cbse_05_004', 'c11_hin_v_cbse_05_005', 'c11_hin_v_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an archivist cross-checking ballads against records', intro: 'Desert kingdoms, bards, and sacrifices that look irrational — until you learn the code they\'re written in.', goal: 'Decode the cultural rules inside Rajasthani folk narratives and analyse their non-linear structure.' },
    discovery: {
        question: 'A Rajput tale has a widow choose jauhar and a steward bankrupt himself for his lord — madness, or a code you\'re missing?',
        options: ['A code — maru-maryada, jauhar and bhamashah are implicit rules that make \'irrational\' sacrifice read as honour', 'Madness — no rational person chooses death', 'A code — but only kings followed it', 'Madness — folk tales aren\'t bound by logic'],
        answer: 'A code — maru-maryada, jauhar and bhamashah are implicit rules that make \'irrational\' sacrifice read as honour',
        hook: 'Vishnu Prabhakar worked the Rajasthan State Archives for decades — these aren\'t fairy tales but itihaas, history as the people witnessed it.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a pre-reading strategy that equips students with the historical, cultural, and biographical knowledge necessary to access a text\'s deeper layers.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_05_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Match archival motifs (jauhar, sakha, bhamashah) to the folk narratives, then weigh why the story\'s trauma stays unresolved at the end.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are about to watch a period film set in medieval Rajasthan—would you understand the characters\' motivations better if you knew the codes of honour.',
            decisions: [{ prompt: 'Who is the author of "Rajasthan ki Jatir Kahaniyan" and what is his primary contribution to Hindi literature that makes him uniquely.', options: [
                { text: 'The author is Vishnu Prabhakar (1948–2016), a historian and litterateur renowned for his', outcome: 'The author is Vishnu Prabhakar (1948–2016), a historian and litterateur renowned for his extensive.' },
                { text: 'context', outcome: 'Not quite — Students believe "context" means memorizing the author\'s birth/death dates and a list of his other.', reveals: 'context-means-memorizing-the-author' },
                { text: 'Vishnu Prabhakar, born 1948, wrote many books on Rajasthan', outcome: 'Not quite — Students believe "context" means memorizing the author\'s birth/death dates and a list of his other.', reveals: 'context-means-memorizing-the-author' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are watching a movie and the scenes jump between past and present – you wonder why the director chose that order.',
            decisions: [{ prompt: 'Define \'exposition\' in the context of plot structure and state its primary function in a narrative.', options: [
                { text: 'Exposition is the opening section of a story that introduces the setting, characters, and', outcome: 'Exposition is the opening section of a story that introduces the setting, characters, and initial.' },
                { text: '\'plot\' is just a summary of events, ignoring the author\'s deliberate ordering (e', outcome: 'Not quite — Students often think \'plot\' is just a summary of events, ignoring the author\'s deliberate ordering.', reveals: 'plot-is-just-a-summary' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are visiting your ancestral village after ten years in a metro city.',
            decisions: [{ prompt: 'Define "setting" and "atmosphere" in the context of a prose narrative. How are they different from each other?', options: [
                { text: 'Setting is the concrete where, when, and social context of a story (e.g., a Kumaoni', outcome: 'Setting is the concrete where, when, and social context of a story (e.g., a Kumaoni village in the.' },
                { text: 'setting is the mood', outcome: 'Not quite — Students treat setting as a static "background" (like a painted stage set) and atmosphere as.', reveals: 'students-treat-setting-as-a' },
                { text: 'How does the setting create atmosphere?', outcome: 'Not quite — Students treat setting as a static "background" (like a painted stage set) and atmosphere as.', reveals: 'students-treat-setting-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you meet someone who survived losing both parents by age 13, migrated from a conflict zone (Naxalbari) to Delhi with three children, then moved.',
            decisions: [{ prompt: 'What is the primary difference between a character *sketch* and a character *analysis* in senior secondary literary study?', options: [
                { text: 'A sketch lists traits and events', outcome: 'A sketch lists traits and events; an analysis interprets *why* those traits matter by linking them.' },
                { text: 'sketch is shorter', outcome: 'Not quite — Students confuse "protagonist analysis" with "narrating the protagonist\'s life events in order.".', reveals: 'students-confuse-protagonist-analysis-with' },
                { text: 'protagonist analysis', outcome: 'Not quite — Students confuse "protagonist analysis" with "narrating the protagonist\'s life events in order.".', reveals: 'students-confuse-protagonist-analysis-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are traveling through Srinagar\'s old city and meet an elderly carpet weaver who tells you his grandfather wove shawls for Dogra kings—his story.',
            decisions: [{ prompt: 'Name any two supporting characters from the travel narratives in Chapter 5 and state one specific detail the text provides about each.', options: [
                { text: 'Correct answer: Examples include the Kashmiri Pandit neighbor who recalls shared', outcome: 'Correct answer: Examples include the Kashmiri Pandit neighbor who recalls shared festivals, and the.' },
                { text: 'a local man', outcome: 'Not quite — Students often treat supporting characters in travel narratives as "local color" or decorative.', reveals: 'students-often-treat-supporting-characters' },
                { text: 'people', outcome: 'Not quite — Students often treat supporting characters in travel narratives as "local color" or decorative.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are watching a news report about a street vendor\'s cart being overturned by municipal officers — you instantly sense the injustice of raw power.',
            decisions: [{ prompt: 'Define \'primary theme\' in prose fiction and distinguish it from \'subject\' or \'topic\' using a one-sentence example from any Class 10 text.', options: [
                { text: '**Correct Answer:** The primary theme is the central insight about the human condition', outcome: '**Correct Answer:** The primary theme is the central insight about the human condition (e.g.' },
                { text: 'The Letter', outcome: 'Not quite — **Students equate \'Theme\' with \'Moral of the Story\' (e.g., "Hard work pays off" or "Be honest").**.', reveals: 'students-equate-theme-with-moral' },
                { text: 'the agony of separation transcends time and logic', outcome: 'Not quite — **Students equate \'Theme\' with \'Moral of the Story\' (e.g., "Hard work pays off" or "Be honest").**.', reveals: 'students-equate-theme-with-moral' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your history club presents Vishnu Prabhakar\'s \'Rajasthan ki Jatir Kahaniyan\'. A member dismisses the folk narratives: \'Oral tales aren\'t real history — no dates, no documents, just bards embellishing. And the story jumps around in time, so it\'s badly organised.\'',
            decisions: [{ prompt: 'How do you defend both the form and the history?', options: [
                { text: 'Defend both: these narratives are \'itihaas\' — history as witnessed by the people — which is why Prabhakar, a historian-storyteller in the post-Independence recovery of subaltern histories, documented them; the Rajasthani-infused language carries cultural codes a document can\'t. And the non-linearity is design: time-shifts reveal the protagonist\'s trauma gradually — the climax is an internal realisation, not an external event.', outcome: 'The club reframes: oral tradition is an archive with its own grammar, and the scrambled chronology is how the story performs memory rather than reports it.' },
                { text: 'Concede — oral tales are entertainment; real history needs documents and dates.', outcome: 'That repeats the bias that erased subaltern experience: these tales preserve what archives ignored — the people\'s own witness.', reveals: 'oral-tales-arent-history' },
                { text: 'Rearrange the story chronologically for the presentation — linear order is clearer.', outcome: 'The non-linear order is the meaning: trauma surfaces in fragments; straightening it destroys the emotional architecture built by the flashbacks.', reveals: 'linearize-the-narrative' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'The archive and the bard tell the same past in different inks — folk narrative is history that refused to be filed away.',
            decisions: [{ prompt: 'What comes next? jktLFkku dh jtr cw¡nas · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — jktLFkku dh jtr cw¡nas · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a pre-reading strategy that equips.',
          hint: 'Review the Class 10 History chapter "Nationalism in India" (section on \'Folklore and.',
          misconception: 'Students believe "context" means memorizing the author\'s birth/death dates and a list of his other books.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" is a pre-reading strategy that equips students',
                  options: ['"Before You Read: Context and Background" is a pre-reading strategy that equips students', 'Plot and narrative structure refer to the sequence of events in a story and the framework', 'Setting refers to the time, place, and social environment in', 'Character analysis of the protagonist involves systematically examining the central'],
                  hint: 'Review the Class 10 History chapter "Nationalism in India" (section on \'Folklore and Nationalism\').',
                  misconception: 'Students believe "context" means memorizing the author\'s birth/death dates and a list of his other books.' }
          ],
            remediations: { 'context-means-memorizing-the-author': { steps: ['If a student cannot move beyond biographical trivia, do this 3-step remediation: 1) Give them two 50-word excerpts—one.', 'Ask them to list three differences in perspective, language, and values.', '2) Have them interview a grandparent about a family story passed down orally, then compare it to any written record.', '3) Return to the textbook\'s \'Before You Read\' section and co-construct a "Context-to-Text" bridge: for each contextual.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "context" means memorizing the author\'s birth/death dates and a list of his other books.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Reading the \'Context and Background\' section is optional; the stories speak for themselves." Defend your position with reference to the.', answer: 'The claim is false',
                  options: ['The claim is false', 'context', 'Vishnu Prabhakar, born 1948, wrote many books on Rajasthan'],
                  hint: 'Review the Class 10 History chapter "Nationalism in India" (section on \'Folklore and Nationalism\').',
                  misconception: 'Students believe "context" means memorizing the author\'s birth/death dates and a list of his other books.' },
                { id: 'b', prompt: 'Create a \'Context Map\' for this chapter: list four contextual elements (historical, geographical, linguistic, cultural) and for each, write one question you.', answer: 'A strong answer includes: 1',
                  options: ['A strong answer includes: 1', 'context', 'Vishnu Prabhakar, born 1948, wrote many books on Rajasthan'],
                  hint: 'Review the Class 10 History chapter "Nationalism in India" (section on \'Folklore and Nationalism\').',
                  misconception: 'Students believe "context" means memorizing the author\'s birth/death dates and a list of his other books.' }
          ],
            remediations: { 'context-means-memorizing-the-author': { steps: ['If a student cannot move beyond biographical trivia, do this 3-step remediation: 1) Give them two 50-word excerpts—one.', 'Ask them to list three differences in perspective, language, and values.', '2) Have them interview a grandparent about a family story passed down orally, then compare it to any written record.', '3) Return to the textbook\'s \'Before You Read\' section and co-construct a "Context-to-Text" bridge: for each contextual.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_002', difficulty: 'standard',
          question: 'Plot and narrative structure refer to the sequence of events in a story and the.',
          hint: 'Review the five-stage plot pyramid (Freytag\'s Pyramid) and practice labeling events in.',
          misconception: 'Students often think \'plot\' is just a summary of events, ignoring the author\'s deliberate ordering (e.g., flashbacks.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and narrative structure refer to the sequence of events in a story and the framework',
                  options: ['Plot and narrative structure refer to the sequence of events in a story and the framework', '"Before You Read: Context and Background" is a pre-reading strategy that equips students', 'Setting refers to the time, place, and social environment in', 'Character analysis of the protagonist involves systematically examining the central'],
                  hint: 'Review the five-stage plot pyramid (Freytag\'s Pyramid) and practice labeling events in a known.',
                  misconception: 'Students often think \'plot\' is just a summary of events, ignoring the author\'s deliberate ordering (e.g., flashbacks, parallel plots).' }
          ],
            remediations: { 'plot-is-just-a-summary': { steps: ['If a student cannot distinguish plot stages, have them: (1) List all major events in chronological order.', '(2) Map each to the plot pyramid.', '(3) Identify where the narrative order differs from chronological order.', '(4) Discuss why the author reordered them.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a narrative.',
          hint: 'If stuck, review "PEEL paragraph structure" (Point-Evidence-Explanation-Link) from Class.',
          misconception: 'Students treat setting as a static "background" (like a painted stage set) and atmosphere as a single adjective ("sad,".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting refers to the time, place, and social environment in',
                  options: ['Setting refers to the time, place, and social environment in', '"Before You Read: Context and Background" is a pre-reading strategy that equips students', 'Plot and narrative structure refer to the sequence of events in a story and the framework', 'Character analysis of the protagonist involves systematically examining the central'],
                  hint: 'If stuck, review "PEEL paragraph structure" (Point-Evidence-Explanation-Link) from Class 10 writing.',
                  misconception: 'Students treat setting as a static "background" (like a painted stage set) and atmosphere as a single adjective ("sad," "happy").' }
          ],
            remediations: { 'students-treat-setting-as-a': { steps: ['Have the student draw a "Setting Map" — three boxes for Village, Nainital, Haldwani.', 'For each box, write one "Atmosphere Word" (e.g., Village = "rooted," Nainital = "precarious," Haldwani = "exposed").', 'Ask: "What changed between boxes? How did the change in (a)-(d) *cause* the change in atmosphere word?"', 'Practice writing one PEEL paragraph for one transition using the sentence starter: "The move from ___ to ___ transforms.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves systematically examining the.',
          hint: 'If stuck, review "Plot and Narrative Structure" (node 002) and make a timeline of *only.',
          misconception: 'Students confuse "protagonist analysis" with "narrating the protagonist\'s life events in order." They write: "He was.',
          parts: [
                { id: 'a', prompt: 'What is the primary difference between a character *sketch* and a character *analysis* in senior secondary literary study?', answer: 'A sketch lists traits and events',
                  options: ['A sketch lists traits and events', 'sketch is shorter', 'protagonist analysis', 'narrating the protagonist\'s life events in order'],
                  hint: 'If stuck, review "Plot and Narrative Structure" (node 002) and make a timeline of *only the.',
                  misconception: 'Students confuse "protagonist analysis" with "narrating the protagonist\'s life events in order." They write: "He was born in a village.' },
                { id: 'b', prompt: 'In the protagonist\'s move from Naxalbari to Delhi with three children, the text says he was "विचलित" (disturbed) by his sister\'s circumstances.', answer: '"विचलित" implies moral/emotional agitation, not just physical displacement',
                  options: ['"विचलित" implies moral/emotional agitation, not just physical displacement', 'he was sad', 'protagonist analysis', 'narrating the protagonist\'s life events in order'],
                  hint: 'If stuck, review "Plot and Narrative Structure" (node 002) and make a timeline of *only the.',
                  misconception: 'Students confuse "protagonist analysis" with "narrating the protagonist\'s life events in order." They write: "He was born in a village.' },
                { id: 'c', prompt: 'Using the PEEL structure (Point, Evidence, Explanation, Link), write *one* analytical paragraph proving the protagonist\'s "resilience" is *active*.', answer: 'Point: The protagonist exercises agency in every crisis',
                  options: ['Point: The protagonist exercises agency in every crisis', 'protagonist analysis', 'narrating the protagonist\'s life events in order'],
                  hint: 'If stuck, review "Plot and Narrative Structure" (node 002) and make a timeline of *only the.',
                  misconception: 'Students confuse "protagonist analysis" with "narrating the protagonist\'s life events in order." They write: "He was born in a village.' },
                { id: 'd', prompt: 'Compare the protagonist\'s relationship with *place* (village, Naxalbari, Delhi, Mumbai) across the narrative.', answer: 'Village: roots/innocence (farmer\'s son)',
                  options: ['Village: roots/innocence (farmer\'s son)', 'protagonist analysis', 'narrating the protagonist\'s life events in order'],
                  hint: 'If stuck, review "Plot and Narrative Structure" (node 002) and make a timeline of *only the.',
                  misconception: 'Students confuse "protagonist analysis" with "narrating the protagonist\'s life events in order." They write: "He was born in a village.' }
          ],
            remediations: { 'students-confuse-protagonist-analysis-with': { steps: ['Ask the student to highlight every *verb* attached to the protagonist in the text (e.g., "छोड़ आए", "लिखा", "निकल.', 'Group verbs into: *survival actions* (eating, moving) vs.', '*agency actions* (protecting, writing, publishing).', 'Have them write one sentence per group starting with "The protagonist *chooses* to..." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_005', difficulty: 'standard',
          question: 'Supporting characters are secondary figures in a narrative who interact with.',
          hint: 'Review "reported speech vs. direct speech in travelogues" and "identifying speaker\'s.',
          misconception: 'Students often treat supporting characters in travel narratives as "local color" or decorative background, listing them.',
          parts: [
                { id: 'a', prompt: 'Name any two supporting characters from the travel narratives in Chapter 5 and state one specific detail the text provides about each (e.g., occupation.', answer: 'Correct answer: Examples include the Kashmiri Pandit neighbor who recalls shared',
                  options: ['Correct answer: Examples include the Kashmiri Pandit neighbor who recalls shared', 'a local man', 'people'],
                  hint: 'Review "reported speech vs. direct speech in travelogues" and "identifying speaker\'s social.',
                  misconception: 'Students often treat supporting characters in travel narratives as "local color" or decorative background, listing them like tourist.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['Have the student re-read one encounter (e.g., the Pandit neighbor) and underline every verb attributed to that.', 'Ask: "What claim about Kashmir does this person\'s testimony support?"', 'Model the shift: "Not \'he tells a story\' but \'he testifies that shared festivals existed before 1990.\'"', 'Practice converting three such encounters from summary to analytical claims using the template: "Character X\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_006', difficulty: 'standard',
          question: 'The primary theme is the central, unifying idea or insight about life and human.',
          hint: 'Review "Plot-to-Theme Ladder" exercise from Node 002: Take 3 plot points, write "This.',
          misconception: '**Students equate \'Theme\' with \'Moral of the Story\' (e.g., "Hard work pays off" or "Be honest").** They search for.',
          parts: [
                { id: 'a', prompt: 'Apply the \'Theme Tracking\' method: Select THREE sequential plot points from the story (e.g., Village debt → Migration to Delhi → Watchman job) and write ONE.', answer: '**Correct Answer (Sample Steps):** 1',
                  options: ['**Correct Answer (Sample Steps):** 1', '**Wrong Answer Reveals:** If'],
                  hint: 'Review "Plot-to-Theme Ladder" exercise from Node 002: Take 3 plot points, write "This shows.',
                  misconception: '**Students equate \'Theme\' with \'Moral of the Story\' (e.g., "Hard work pays off" or "Be honest").** They search for a prescriptive lesson.' },
                { id: 'b', prompt: 'Analyze the ending: Gopal continues as a watchman, silent and enduring. Does this ending reinforce a message of *hopeless resignation* or *quiet resistance*?', answer: '**Correct Answer:** It is **quiet resistance**',
                  options: ['**Correct Answer:** It is **quiet resistance**', 'He gives up / nothing changes'],
                  hint: 'Review "Plot-to-Theme Ladder" exercise from Node 002: Take 3 plot points, write "This shows.',
                  misconception: '**Students equate \'Theme\' with \'Moral of the Story\' (e.g., "Hard work pays off" or "Be honest").** They search for a prescriptive lesson.' }
          ],
            remediations: { 'students-equate-theme-with-moral': { steps: ['**Confront the Moral Trap:** Give the student two statements: A) "Never give up." B) "Systems of power survive.', 'Which one could be a poster on a wall?" The story *is* the evidence for B.', '**Re-read the Ending with a Lens:** Provide the final 3 paragraphs.', 'Ask: "Highlight every word showing Gopal\'s *choice* vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
