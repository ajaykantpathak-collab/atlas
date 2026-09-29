import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch03_p1: SimDef = {
    id: 'v3_c11_eng_w_ch03_p1',
    title: 'The Rocking-horse Winner (Short Story) · Part 1/3',
    subtitle: 'Follow a whisper through a house to a fatal Derby win.',
    classLevel: 11, subject: 'eng_w', topic: 'The Rocking-horse Winner (Short Story) · Part 1/3',
    chapters: ['c11_eng_w_ch03'],
    nodeIds: ['c11_eng_w_cbse_03_001', 'c11_eng_w_cbse_03_002', 'c11_eng_w_cbse_03_003', 'c11_eng_w_cbse_03_004', 'c11_eng_w_cbse_03_005', 'c11_eng_w_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader inside a house that keeps asking for money', intro: 'A boy rides a rocking-horse furiously and names winners; the family calls it luck. Count what the luck is fed.', goal: 'Identify the structural climax and evaluate how the ending serves the critique of materialism.' },
    discovery: {
        question: 'Paul wins eighty thousand pounds on the Derby — and dies immediately after. Why would Lawrence deny the story its happy ending?',
        options: ['To make the acquisition of money literally fatal — the whisper\'s promise that luck brings more money becomes a deadly irony', 'Because the author disliked tidy resolutions', 'To punish the uncle for betting on a child', 'Because Paul\'s gift was the real ending all along'],
        answer: 'To make the acquisition of money literally fatal — the whisper\'s promise that luck brings more money becomes a deadly irony',
        hook: 'The climax isn\'t the race result — it\'s the frenzied ride the night before, where Paul forces the \'knowing\' out of a wooden horse.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'The Rocking-horse Winner\' (Woven Words, ch. 3) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_03_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the whispering house as the story\'s engine, place the true climax on the last ride, and test whether the opening counts as in medias res.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'The Rocking-horse Winner\', then the period, then the literary context — background turns a text from a puzzle into a story you can.',
            decisions: [{ prompt: 'Who is the author of "The Rocking-horse Winner," and what two contrasting social backgrounds did his parents come from?', options: [
                { text: 'The author is D.H', outcome: 'The author is D.H. Lawrence. His father was a coal miner (working class) and his mother was.' },
                { text: 'poor/rich', outcome: 'Not quite — Students treat the "Before You Read" section as optional trivia — memorising Lawrence’s birth/death.', reveals: 'students-treat-the-before-you' },
                { text: 'About the Author', outcome: 'Not quite — Students treat the "Before You Read" section as optional trivia — memorising Lawrence’s birth/death.', reveals: 'students-treat-the-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'The Rocking-horse Winner\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the primary auditory image that establishes the atmosphere of the house in the opening paragraphs of "The Rocking-horse Winner"?', options: [
                { text: 'The primary auditory image is the house whispering the phrase "There must be more money!"', outcome: 'The primary auditory image is the house whispering the phrase "There must be more money!".' },
                { text: 'the sound of the rocking-horse', outcome: 'Not quite — Students often treat setting and atmosphere as interchangeable synonyms, writing "the setting.', reveals: 'students-often-treat-setting-and' },
                { text: 'the children playing', outcome: 'Not quite — Students often treat setting and atmosphere as interchangeable synonyms, writing "the setting.', reveals: 'students-often-treat-setting-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'The Rocking-horse Winner\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What is the central irony of Paul\'s statement "I am lucky!" at the end of the story?', options: [
                { text: 'The central irony is that Paul declares himself "lucky" moments before dying—he has won', outcome: 'The central irony is that Paul declares himself "lucky" moments before dying—he has won 80,000.' },
                { text: 'He is lucky because he won money', outcome: 'Not quite — Students often treat Paul\'s "luck" as a supernatural gift (clairvoyance) rather than.', reveals: 'students-often-treat-paul-s' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'The Rocking-horse Winner\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'Identify the four named adult supporting characters in "The Rocking-horse Winner" and state each one\'s primary relationship to Paul.', options: [
                { text: 'The four named adult supporting characters are: Hester (Paul\'s mother), Father (Paul\'s', outcome: 'The four named adult supporting characters are: Hester (Paul\'s mother), Father (Paul\'s father).' },
                { text: 'adults', outcome: 'Not quite — Students often treat supporting characters as "background information" rather than active thematic.', reveals: 'students-often-treat-supporting-characters' },
                { text: 'the sisters as "adults" or omitting Bassett', outcome: 'Not quite — Students often treat supporting characters as "background information" rather than active thematic.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'The Rocking-horse Winner\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the primary theme of "The Rocking-horse Winner" as distinct from its plot?', options: [
                { text: 'The story explores how the conflation of luck with love and the insatiable pursuit of', outcome: 'The story explores how the conflation of luck with love and the insatiable pursuit of material.' },
                { text: 'The theme is a boy betting on horses', outcome: 'Not quite — Students often believe the primary theme is "Gambling is bad" or "Greed destroys families." This.', reveals: 'the-primary-theme-is-gambling' },
                { text: 'Gambling is bad', outcome: 'Not quite — Students often believe the primary theme is "Gambling is bad" or "Greed destroys families." This.', reveals: 'the-primary-theme-is-gambling' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your book club debates \'The Rocking-horse Winner\': a boy rides his toy horse furiously to divine race winners, trying to stop the house whispering \'There must be more money.\' A member calls it \'a ghost story about a haunted house — spooky but shallow\'.',
            decisions: [{ prompt: 'What is the whispering house really about?', options: [
                { text: 'Post-WWI money anxiety wearing a ghost story\'s mask: Lawrence\'s genteel-poor family — \'luck\' and \'filthy lucre\' as household religion — turns domestic economics into haunting. The whispers are the metaphor for a society eating itself alive over status and cash; the boy\'s gift is doomed because feeding the craving only raises its voice.', outcome: 'Context is the lens: Lawrence\'s own mining-village class tension and post-war wealth panic turn a spooky detail into social diagnosis.' },
                { text: 'It IS a ghost story — the whispering is supernatural, end of analysis.', outcome: 'The haunting is a vehicle: treating the whispers as literal ghosts misses that they articulate the mother\'s hunger for money and the family myth of \'luck\'.', reveals: 'whispers-are-just-ghosts' },
                { text: 'It\'s a moral lesson for kids — don\'t gamble on horses.', outcome: 'The betting is symptom, not subject: the critique is of a household economy built on loveless consumption that literally consumes the child.', reveals: 'story-is-anti-gambling' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'The house kept whispering \'there must be more money\' — the story ends by showing exactly what more money costs.',
            decisions: [{ prompt: 'What comes next? The Rocking-horse Winner (Short Story) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Rocking-horse Winner (Short Story) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_03_001', difficulty: 'standard',
          question: '\'The Rocking-horse Winner\' (Woven Words, ch. 3) — the context and background.',
          hint: 'Review the "Context and Background" approach used for Mandela’s inauguration speech.',
          misconception: 'Students treat the "Before You Read" section as optional trivia — memorising Lawrence’s birth/death dates — instead.',
          parts: [
                { id: 'a', prompt: 'Who is the author of "The Rocking-horse Winner," and what two contrasting social backgrounds did his parents come from?', answer: 'The author is D.H',
                  options: ['The author is D.H', 'poor/rich', 'About the Author', 'a different author or vague "poor/rich'],
                  hint: 'Review the "Context and Background" approach used for Mandela’s inauguration speech.',
                  misconception: 'Students treat the "Before You Read" section as optional trivia — memorising Lawrence’s birth/death dates — instead of using the.' }
          ],
            remediations: { 'students-treat-the-before-you': { steps: ['Re-read the "About the Author" box and underline the two phrases describing Lawrence’s parents.', 'Write one sentence linking each phrase to a specific detail in the story’s first two paragraphs (e.g., "father had good.', 'Take the six glossary words, group them into "decay" (turned to dust), "frantic motion" (careered), "psychological.', 'Predict: which group dominates the story’s climax?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_03_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'The Rocking-horse Winner\' — what happens, in what.',
          hint: 'If stuck, review the difference between *chronological summary* and *structural analysis*.',
          misconception: 'Students often identify the climax as the moment Paul wins the Derby (Malabar comes in first) because it is the peak.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "in media res" to the opening of the story. Does "The Rocking-horse Winner" begin in media res? Justify with textual evidence.', answer: 'No, it does not begin in media res',
                  options: ['No, it does not begin in media res', 'the whisper is already happening'],
                  hint: 'If stuck, review the difference between *chronological summary* and *structural analysis* using.',
                  misconception: 'Students often identify the climax as the moment Paul wins the Derby (Malabar comes in first) because it is the peak of external action.' }
          ],
            remediations: { 'students-often-identify-the-climax': { steps: ['Draw the Freytag pyramid on paper and place each major scene (whisper introduction, first ride, Daffodil win, birthday.', 'Ask: "At which point does Paul\'s struggle reach its highest intensity *before* the outcome is known?" 3.', 'Compare the night ride (he could fail, he is dying) with the race result (already determined by his ride).', 'Re-read the uncle\'s final line: "he\'s best gone out of a life where he rides his rocking-horse to find a winner" — this.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_03_003', difficulty: 'standard',
          question: 'The setting of \'The Rocking-horse Winner\' — the place, time and atmosphere the.',
          hint: 'Review the definition of personification and practice identifying it in the nursery scene.',
          misconception: 'Students often treat setting and atmosphere as interchangeable synonyms, writing "the setting is scary" instead.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'The Rocking-horse Winner\'',
                  options: ['The setting of \'The Rocking-horse Winner\'', '\'The Rocking-horse Winner\' (Woven Words, ch', 'The plot/narrative arc of \'The Rocking-horse Winner\'', 'Character analysis in \'The Rocking-horse Winner\''],
                  hint: 'Review the definition of personification and practice identifying it in the nursery scene (toys.',
                  misconception: 'Students often treat setting and atmosphere as interchangeable synonyms, writing "the setting is scary" instead of distinguishing the.' }
          ],
            remediations: { 'students-often-treat-setting-and': { steps: ['Have the student draw a two-column table: left column "Setting Details" (quotes about house, garden, servants, income).', 'Ask them to draw arrows connecting each setting detail to the atmospheric effect it produces.', 'Require them to write one sentence explaining why the whisper *must* come from the house, not the mother.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_03_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat setting and atmosphere as interchangeable synonyms, writing "the setting is scary" instead.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of Lawrence\'s choice to make the house itself a speaking character rather than having the parents voice the money anxiety directly.', answer: 'It is highly effective because: (1) It externalizes the family\'s repression',
                  options: ['It is highly effective because: (1) It externalizes the family\'s repression', 'just a metaphor'],
                  hint: 'Review the definition of personification and practice identifying it in the nursery scene (toys.',
                  misconception: 'Students often treat setting and atmosphere as interchangeable synonyms, writing "the setting is scary" instead of distinguishing the.' }
          ],
            remediations: { 'students-often-treat-setting-and': { steps: ['Have the student draw a two-column table: left column "Setting Details" (quotes about house, garden, servants, income).', 'Ask them to draw arrows connecting each setting detail to the atmospheric effect it produces.', 'Require them to write one sentence explaining why the whisper *must* come from the house, not the mother.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_03_004', difficulty: 'standard',
          question: 'Character analysis in \'The Rocking-horse Winner\' — the central figure(s), their.',
          hint: 'If stuck, review c11_eng_w_cbse_03_002 (Plot) to re-sequence Paul\'s three major rides.',
          misconception: 'Students often treat Paul\'s "luck" as a supernatural gift (clairvoyance) rather than a psychological projection.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Paul begins riding the rocking-horse frenziedly. What does he believe the horse can do for him?', answer: 'Paul rides to reach a mental state where he "knows" the winner—he believes the',
                  options: ['Paul rides to reach a mental state where he "knows" the winner—he believes the', 'He likes riding', 'He wants to win money for himself'],
                  hint: 'If stuck, review c11_eng_w_cbse_03_002 (Plot) to re-sequence Paul\'s three major rides: the nursery.',
                  misconception: 'Students often treat Paul\'s "luck" as a supernatural gift (clairvoyance) rather than a psychological projection.' }
          ],
            remediations: { 'students-often-treat-paul-s': { steps: ['If a student insists Paul has magical powers, do this: (1) Have them re-read the Bassett dialogue: "Master Paul would.', 'he was always keen on knowing if I\'d made or if I\'d lost." (2) Ask: "Where does Paul get the horse names?', 'From Bassett\'s \'yarns.\'" (3) Show the pattern: he "knows" only after intense physical exertion (oxygen deprivation.', '(4) Assign a 3-sentence rewrite: "Paul\'s \'luck\' is actually ______, triggered by ______, which reveals ______ about his.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_03_005', difficulty: 'standard',
          question: 'Supporting characters in \'The Rocking-horse Winner\' — the secondary figures who.',
          hint: 'Review c11_eng_w_cbse_03_004\'s worked example on Paul\'s "blue eyes" as symbolic.',
          misconception: 'Students often treat supporting characters as "background information" rather than active thematic agents.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in \'The Rocking-horse Winner\'',
                  options: ['Supporting characters in \'The Rocking-horse Winner\'', '\'The Rocking-horse Winner\' (Woven Words, ch', 'The plot/narrative arc of \'The Rocking-horse Winner\'', 'The setting of \'The Rocking-horse Winner\''],
                  hint: 'Review c11_eng_w_cbse_03_004\'s worked example on Paul\'s "blue eyes" as symbolic marker—apply same.',
                  misconception: 'Students often treat supporting characters as "background information" rather than active thematic agents.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['If a student reduces characters to single traits: (1) Have them re-read the three scenes where Oscar interacts with.', '(2) Ask: "If Oscar truly cared, what would he have done differently when Paul said \'I couldn\'t possibly go before the.', '(4) Have the student write one paragraph arguing: "Bassett and Oscar are the same character in different uniforms"—this.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_03_006', difficulty: 'standard',
          question: 'The primary theme of \'The Rocking-horse Winner\' — the central idea the whole.',
          hint: 'If stuck, review **c11_eng_w_cbse_03_002 (Plot)** to map the cause-effect chain, and.',
          misconception: 'Students often believe the primary theme is "Gambling is bad" or "Greed destroys families." This is a **Theme vs.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the house\'s whisper — "There must be more money!" — intensifies *after* Paul gives his mother the 5,000 pounds, rather than.', answer: 'The whisper intensifies',
                  options: ['The whisper intensifies', 'Because she spent it all on furnishings', 'Gambling is bad', 'Greed destroys families'],
                  hint: 'If stuck, review **c11_eng_w_cbse_03_002 (Plot)** to map the cause-effect chain, and.',
                  misconception: 'Students often believe the primary theme is "Gambling is bad" or "Greed destroys families." This is a **Theme vs.' },
                { id: 'b', prompt: 'Apply the concept of "thematic tracking" to the rocking horse itself.', answer: '1) Nursery toy: "shining modern rocking-horse"',
                  options: ['1) Nursery toy: "shining modern rocking-horse"', 'Gambling is bad', 'Greed destroys families', 'the primary theme is "Gambling is bad" or "Greed destroys families'],
                  hint: 'If stuck, review **c11_eng_w_cbse_03_002 (Plot)** to map the cause-effect chain, and.',
                  misconception: 'Students often believe the primary theme is "Gambling is bad" or "Greed destroys families." This is a **Theme vs.' }
          ],
            remediations: { 'the-primary-theme-is-gambling': { steps: ['Ask the student: "If you removed all horse-racing from the story but kept the mother\'s anxiety, the house whispering.', 'Have them complete this sentence frame: "The story uses [plot element] to show that [abstract human truth]." 3.', 'Give them three theme statements (one correct, two topic-level) and ask them to identify which passes the "Universal.', 'Re-teach using the "Onion Model": Plot (outer) -> Topics (middle) -> Theme (core).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
