import type { SimDef } from '../../engine/types';

/** v3 generated — c7_engl_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_engl_ch04_p2: SimDef = {
    id: 'v3_c7_engl_ch04_p2',
    title: 'Travel and Adventure: The Tunnel · Part 2/3',
    subtitle: 'This node covers analyzing and applying four specific vocabulary words from Chapter 4.',
    classLevel: 7, subject: 'engl', topic: 'Travel and Adventure: The Tunnel · Part 2/3',
    chapters: ['c7_engl_ch04'],
    nodeIds: ['c7_engl_ch04_007', 'c7_engl_ch04_008', 'c7_engl_ch04_009', 'c7_engl_ch04_010', 'c7_engl_ch04_011', 'c7_engl_ch04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Have you ever tried to guess what a new word means in a comic book or story just by looking at the pictures.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A character steps off a sunlit railway embankment into the mouth of a brick tunnel — and in one step the birdcalls fade to hollow echoes and the heat drops away. What did the author just do to the mood?',
        options: ['Flipped it — the contrast between bright living jungle and dark silent tunnel turns open warmth into tense suspense', 'Nothing — a tunnel is just a shorter road', 'Made it cheerful — shade is always relaxing', 'Confused it — good authors avoid strong contrasts'],
        answer: 'Flipped it — the contrast between bright living jungle and dark silent tunnel turns open warmth into tense suspense',
        hook: 'Setting is an experience built from senses, not a label on a map. Here three elements do the work — the wild jungle, the human-made railway slicing through it, and a tunnel that swallows light and sound like a quiet antagonist.',
    },
    teaching: [
        { title: 'Vocabulary in Context: shimmered, embankment, scrub-covered, instinctively', text: 'From \'English chapter c7_engl_ch04\': the skill or concept this node teaches, applied to the actual text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_engl_ch04_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Walk the three settings in order — jungle, railway, tunnel — and collect one sight, one sound, and one feeling from each to show how the mood darkens with every step.',
        labels: ['Vocabulary in Context: shimmered,', 'Literary Devices: Sensory Imagery', 'Comprehension: What Suraj Discovers', 'Critical Thinking: Courage', 'Poem: Stanza-by-Stanza Summary', 'Poem: Identifying and Analyzing'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_engl_ch04_007', title: 'Vocabulary in Context: shimmered, embankment, scrub-covered, instinctively',
          caseStudy: { intro: 'Have you ever tried to guess what a new word means in a comic book or story just by looking at the pictures and the sentences around it, even without.',
            decisions: [{ prompt: 'What does the word *shimmered* mean when used to describe hot air rising above railway tracks in an adventure story?', options: [
                { text: '*Shimmered* means to shine with a soft, flickering, or wavering light, often caused by', outcome: '*Shimmered* means to shine with a soft, flickering, or wavering light, often caused by heat haze.' },
                { text: 'covered', outcome: 'Not quite — Students often confuse *scrub-covered* with manicured garden lawns or dense rainforests because.', reveals: 'students-often-confuse-scrub-covered' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch04_008', title: 'Literary Devices: Sensory Imagery and Suspense Building',
          caseStudy: { intro: 'Have you ever walked down a dark, narrow corridor or a dimly lit street at night, where every tiny creak of a door or rustle of leaves made your heart beat.',
            decisions: [{ prompt: 'Which of the following sentences from an adventure story uses auditory imagery to build tension?', options: [
                { text: 'B', outcome: 'The correct answer is B. Sentence B focuses specifically on sound ("clicked shut", "sharp, echoing.' },
                { text: 'suspense building', outcome: 'Not quite — Students often believe that "suspense building" just means using scary-sounding words (like.', reveals: 'suspense-building-just-means-using' },
                { text: 'monster', outcome: 'Not quite — Students often believe that "suspense building" just means using scary-sounding words (like.', reveals: 'suspense-building-just-means-using' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch04_010', title: 'Critical Thinking: Courage and Curiosity in Adventure',
          caseStudy: { intro: 'Have you ever felt a shiver of fear before trying something completely new, like riding a bicycle down a steep hill for the first time, yet felt.',
            decisions: [{ prompt: 'What is the primary difference between physical recklessness and true literary courage in an adventure story?', options: [
                { text: 'True literary courage involves awareness of danger combined with a purposeful, curious', outcome: 'True literary courage involves awareness of danger combined with a purposeful, curious drive.' },
                { text: 'courage', outcome: 'Not quite — Students often believe that "courage" in stories means a character never feels scared or hesitant.', reveals: 'courage-in-stories-means-a' },
                { text: '"courage" in stories means a character never feels scared or hesitant', outcome: 'Not quite — Students often believe that "courage" in stories means a character never feels scared or hesitant.', reveals: 'courage-in-stories-means-a' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch04_011', title: 'Poem: Stanza-by-Stanza Summary and Main Ideas',
          caseStudy: { intro: 'Imagine you are reading a long adventure storybook, but instead of paragraphs, it is broken into chunks of poetry called stanzas, just like milestones on.',
            decisions: [{ prompt: 'What is a stanza in a poem?', options: [
                { text: 'A stanza is a grouped set of lines in a poem, separated by an empty line, similar to a', outcome: 'A stanza is a grouped set of lines in a poem, separated by an empty line, similar to a paragraph.' },
                { text: 'title of the poem', outcome: 'Not quite — Students often believe that summarizing a poem stanza by stanza means rewriting every single line.', reveals: 'summarizing-a-poem-stanza-by' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch04_012', title: 'Poem: Identifying and Analyzing Rhyming Words',
          caseStudy: { intro: 'Imagine you are listening to your favorite song on the radio; why do the lyrics feel so catchy and easy to remember?',
            decisions: [{ prompt: 'What term describes a pair of successive lines of poetry, usually of the same length, that rhyme with each other?', options: [
                { text: 'a couplet', outcome: 'The correct answer is a couplet. A wrong answer—such as stanza or refrain—reveals that the student.' },
                { text: 'through', outcome: 'Not quite — Students often think that words that look alike in spelling (like "rough" and "cough", or "through".', reveals: 'words-that-look-alike-in' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing an adventure scene for the school magazine, a student sets her hero in a thick jungle. Her editor asks which element is the true \'frontier\' — the wild jungle, the open railway track, or the dark tunnel mouth ahead.',
            decisions: [{ prompt: 'Which element should carry the sense of stepping into the unknown?', options: [
                { text: 'The tunnel — the jungle is wild but sunlit and knowable, the track is a thin man-made line through it, and the tunnel is where the human path disappears into darkness: a brick-lined doorway into what cannot be seen. That juxtaposition — civilization\'s line ending at an unlit hole in the hill — is what turns the walk into an adventure\'s frontier.', outcome: 'The chapter\'s atmosphere is built exactly this way: isolation and heat in the jungle, then the tunnel mouth concentrating all the uncertainty into one dark opening.' },
                { text: 'The jungle is the real frontier — wildness always beats anything man-made for danger.', outcome: 'The jungle frames the scene but the tunnel is the threshold — the story places the unknown specifically inside the dark passage, not in the visible wild around it.', reveals: 'wilderness-is-frontier' },
                { text: 'The railway track is the frontier — it is the boundary line itself.', outcome: 'The track leads to the frontier but is not it — the open line is known and lit; the tunnel\'s hidden interior is where anticipation actually lives.', reveals: 'the-path-is-frontier' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch04_012', title: 'The bigger picture',
          caseStudy: { intro: 'A great setting does not sit behind the story — it presses on the characters. Civilization and wilderness meet at the tunnel mouth, and the tunnel wins the mood.',
            decisions: [{ prompt: 'What comes next? Travel and Adventure: The Tunnel · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Travel and Adventure: The Tunnel · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_engl_ch04_007', difficulty: 'standard',
          question: 'From \'English chapter c7_engl_ch04\': the skill or concept this node teaches.',
          hint: 'Review c6_english_u4_037 to practice basic context-clue extraction techniques before.',
          misconception: 'Students often confuse *scrub-covered* with manicured garden lawns or dense rainforests because they focus only on the.',
          parts: [
                { id: 'a', prompt: 'Read this sentence: "The goat scrambled up the steep, scrub-covered hill." Based on the context, what does *scrub-covered* tell you about the hill\'s vegetation?', answer: 'Identify the target compound adjective (*scrub-covered*)',
                  options: ['Identify the target compound adjective (*scrub-covered*)', 'covered'],
                  hint: 'Review c6_english_u4_037 to practice basic context-clue extraction techniques before tackling.',
                  misconception: 'Students often confuse *scrub-covered* with manicured garden lawns or dense rainforests because they focus only on the word "covered".' },
                { id: 'b', prompt: 'Analyze how the word *instinctively* functions in this sentence: "When the loud train whistle blew, Suraj *instinctively* stepped back from the edge." What.', answer: 'Isolate the target adverb (*instinctively*)',
                  options: ['Isolate the target adverb (*instinctively*)', 'covered', 'the character planned a deliberate, slow maneuver'],
                  hint: 'Review c6_english_u4_037 to practice basic context-clue extraction techniques before tackling.',
                  misconception: 'Students often confuse *scrub-covered* with manicured garden lawns or dense rainforests because they focus only on the word "covered".' }
          ],
            remediations: { 'students-often-confuse-scrub-covered': { steps: ['Break down the compound word into its root parts ("scrub" + "covered").', 'Remind the student of the setting of "The Tunnel"—hot, dry Indian jungle foothills with sparse bushes.', 'Contrast "scrub" (wild, thorny, dry bushes) with manicured grass.', 'Have the student rewrite a sentence substituting "scrub-covered" with "thorny bush-filled" to anchor the meaning.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch04_008', difficulty: 'standard',
          question: 'Sensory imagery uses descriptive language targeting the five senses (sight.',
          hint: 'Review c6_english_u4_035 to practice identifying basic sound words and visual.',
          misconception: 'Students often believe that "suspense building" just means using scary-sounding words (like "monster," "ghost,".',
          parts: [
                { id: 'a', prompt: 'Which of the following sentences from an adventure story uses auditory imagery to build tension? A) The old iron gate was painted a bright, shiny red.', answer: 'The heavy wooden door clicked shut with a sharp, echoing snap',
                  options: ['The heavy wooden door clicked shut with a sharp, echoing snap', 'suspense building', 'monster', 'danger'],
                  hint: 'Review c6_english_u4_035 to practice identifying basic sound words and visual descriptions before.',
                  misconception: 'Students often believe that "suspense building" just means using scary-sounding words (like "monster," "ghost," or "danger") rather than.' },
                { id: 'b', prompt: 'Read this sentence: "As Suraj stepped into the dark tunnel, the damp air clung to his skin like a cold, wet blanket." Which two senses are primarily engaged.', answer: 'Touch and Temperature/Feeling (Tactil',
                  options: ['Touch and Temperature/Feeling (Tactil', 'cold, wet blanket', 'suspense building', 'monster'],
                  hint: 'Review c6_english_u4_035 to practice identifying basic sound words and visual descriptions before.',
                  misconception: 'Students often believe that "suspense building" just means using scary-sounding words (like "monster," "ghost," or "danger") rather than.' },
                { id: 'c', prompt: 'Examine this passage: "The jungle fell completely silent. Not a single leaf fluttered.', answer: 'The sudden absence of familiar sounds (silenc',
                  options: ['The sudden absence of familiar sounds (silenc', 'suspense building', 'monster', 'danger'],
                  hint: 'Review c6_english_u4_035 to practice identifying basic sound words and visual descriptions before.',
                  misconception: 'Students often believe that "suspense building" just means using scary-sounding words (like "monster," "ghost," or "danger") rather than.' }
          ],
            remediations: { 'suspense-building-just-means-using': { steps: ['If a student struggles to distinguish between telling emotions and building suspense through imagery, use this.', 'Say: "Stop telling me the character is scared.', 'Show me what their skin feels, what their ears hear, and what shadows their eyes catch." 2.', 'Show them a comparison: "Compare \'The room was scary\' with \'A cold draft brushed the back of Suraj\'s neck, and a slow.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch04_009', difficulty: 'standard',
          question: 'Comprehension of what Suraj discovers at the tunnel involves analyzing the.',
          hint: 'Review c7_engl_ch04_002 on character analysis and c7_engl_ch04_003 on plot sequence.',
          misconception: 'Students often believe that Suraj\'s discovery is only about seeing the physical train, ignoring the emotional and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comprehension of what Suraj discovers at the tunnel involves analyzing the literal events',
                  options: ['Comprehension of what Suraj discovers at the tunnel involves analyzing the literal events', 'The setting of a story encompasses the physical landscape, time period, and social', 'From \'English chapter c7_engl_ch04\': the skill or concept this node teaches, applied to', 'Plot is the sequence of events and actions that make up a story, structured around a'],
                  hint: 'Review c7_engl_ch04_002 on character analysis and c7_engl_ch04_003 on plot sequence to reconnect.',
                  misconception: 'Students often believe that Suraj\'s discovery is only about seeing the physical train, ignoring the emotional and psychological shift.' }
          ],
            remediations: { 'suraj-s-discovery-is-only': { steps: ['To fix this misconception, guide the student to look at two specific moments: Suraj before entering the tunnel and.', 'Ask: "How does Suraj feel in his chest before the train roars past?', 'How does he feel after?" Help them see that the physical sight of the train is just the vehicle for his inner discovery.', 'Have them rewrite their answer using the PEEL structure (Point, Evidence, Explanation, Link).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch04_010', difficulty: 'standard',
          question: 'From \'English chapter c7_engl_ch04\': the skill or concept this node teaches.',
          hint: 'Review c7_engl_ch04_004 to reconnect with how authors build themes of exploration and.',
          misconception: 'Students often believe that "courage" in stories means a character never feels scared or hesitant.',
          parts: [
                { id: 'a', prompt: 'Analyze the role of curiosity in driving Suraj\'s adventure. If he felt only fear and no curiosity, how would the outcome of his journey change?', answer: '(1) Identify Suraj\'s core motivation (desire to see what lies inside the tunnel)',
                  options: ['(1) Identify Suraj\'s core motivation (desire to see what lies inside the tunnel)', 'courage', '"courage" in stories means a character never feels scared or hesitant'],
                  hint: 'Review c7_engl_ch04_004 to reconnect with how authors build themes of exploration and unknown.',
                  misconception: 'Students often believe that "courage" in stories means a character never feels scared or hesitant.' },
                { id: 'b', prompt: 'Read this scenario: A character hears a strange sound inside a dark cave, feels terrified, but decides to step inside anyway.', answer: '(1) Examine the character\'s emotional state (terrified)',
                  options: ['(1) Examine the character\'s emotional state (terrified)', 'foolishness', 'courage', '"courage" in stories means a character never feels scared or hesitant'],
                  hint: 'Review c7_engl_ch04_004 to reconnect with how authors build themes of exploration and unknown.',
                  misconception: 'Students often believe that "courage" in stories means a character never feels scared or hesitant.' }
          ],
            remediations: { 'courage-in-stories-means-a': { steps: ['Guide the student by asking: "If a superhero is never in danger and never feels afraid, is it brave of them to save the.', 'Read a specific line where the character hesitates or feels the heat and silence of the jungle, and ask what that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch04_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "courage" in stories means a character never feels scared or hesitant.',
          parts: [
                { id: 'a', prompt: 'Can a character display true courage without an object of curiosity to draw them forward? Defend your position using literary reasoning.', answer: '(1) Define courage in adventure contexts (facing hardship or danger)',
                  options: ['(1) Define courage in adventure contexts (facing hardship or danger)', 'courage', '"courage" in stories means a character never feels scared or hesitant'],
                  hint: 'Review c7_engl_ch04_004 to reconnect with how authors build themes of exploration and unknown.',
                  misconception: 'Students often believe that "courage" in stories means a character never feels scared or hesitant.' },
                { id: 'b', prompt: 'Write a short paragraph analyzing how a fictional character\'s internal conflict between fear and curiosity shapes their growth during an exploration.', answer: 'A strong response must describe a specific internal struggle, show how curiosity',
                  options: ['A strong response must describe a specific internal struggle, show how curiosity', 'courage', '"courage" in stories means a character never feels scared or hesitant'],
                  hint: 'Review c7_engl_ch04_004 to reconnect with how authors build themes of exploration and unknown.',
                  misconception: 'Students often believe that "courage" in stories means a character never feels scared or hesitant.' }
          ],
            remediations: { 'courage-in-stories-means-a': { steps: ['Guide the student by asking: "If a superhero is never in danger and never feels afraid, is it brave of them to save the.', 'Read a specific line where the character hesitates or feels the heat and silence of the jungle, and ask what that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch04_011', difficulty: 'standard',
          question: 'A stanza-by-stanza summary is a systematic breakdown of a poem\'s narrative and.',
          hint: 'Review c6_english_u1_005 to practice identifying basic poetic imagery and structure.',
          misconception: 'Students often believe that summarizing a poem stanza by stanza means rewriting every single line in simpler words (a.',
          parts: [
                { id: 'a', prompt: 'Read these two lines from a poem about a train journey: "The iron tracks stretch far and wide / Through dusty plains and countryside." If you are writing.', answer: 'Identify the subject (iron tracks, plains)',
                  options: ['Identify the subject (iron tracks, plains)', 'The train is going very fast to Mumbai'],
                  hint: 'Review c6_english_u1_005 to practice identifying basic poetic imagery and structure before.',
                  misconception: 'Students often believe that summarizing a poem stanza by stanza means rewriting every single line in simpler words (a line-by-line.' }
          ],
            remediations: { 'summarizing-a-poem-stanza-by': { steps: ['If a student writes a long line-by-line translation instead of a summary, stop them and ask: "If you had to tell your.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch04_012', difficulty: 'standard',
          question: 'Identifying and analyzing rhyming words involves recognizing matching.',
          hint: 'Review basic rhyming word identification by practicing simple word pairs like cat/bat and.',
          misconception: 'Students often think that words that look alike in spelling (like "rough" and "cough", or "through" and "bough") will.',
          parts: [
                { id: 'a', prompt: 'What term describes a pair of successive lines of poetry, usually of the same length, that rhyme with each other?', answer: 'a couplet',
                  options: ['a couplet', 'through'],
                  hint: 'Review basic rhyming word identification by practicing simple word pairs like cat/bat and.',
                  misconception: 'Students often think that words that look alike in spelling (like "rough" and "cough", or "through" and "bough") will always rhyme.' },
                { id: 'b', prompt: 'Read these lines: "The engine rushes down the track, / With iron wheels and heavy sack." Which words form the rhyming pair?', answer: 'The rhyming pair is "track" and "sack."',
                  options: ['The rhyming pair is "track" and "sack."', 'A wrong answer choosing', 'wheels', 'through'],
                  hint: 'Review basic rhyming word identification by practicing simple word pairs like cat/bat and.',
                  misconception: 'Students often think that words that look alike in spelling (like "rough" and "cough", or "through" and "bough") will always rhyme.' },
                { id: 'c', prompt: 'A stanza has four lines ending with the words: night (A), bright (A), day (B), way (B). What is the rhyme scheme of this stanza?', answer: 'The correct rhyme scheme is AABB',
                  options: ['The correct rhyme scheme is AABB', 'through'],
                  hint: 'Review basic rhyming word identification by practicing simple word pairs like cat/bat and.',
                  misconception: 'Students often think that words that look alike in spelling (like "rough" and "cough", or "through" and "bough") will always rhyme.' }
          ],
            remediations: { 'words-that-look-alike-in': { steps: ['To fix this, guide the student to cover the spelling of the words with their hand and read them aloud exclusively.', 'Ask: "Do your ears hear the exact same sound at the end, or does one sound different?" Practice listening to spoken.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
