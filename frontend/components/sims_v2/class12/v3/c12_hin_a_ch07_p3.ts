import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch07_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch07_p3: SimDef = {
    id: 'v3_c12_hin_a_ch07_p3',
    title: 'iafMr panzèkj \'kekZ xqysjh · Part 3/3',
    subtitle: 'A walking song where hunger means two hungers',
    classLevel: 12, subject: 'hin_a', topic: 'iafMr panzèkj \'kekZ xqysjh · Part 3/3',
    chapters: ['c12_hin_a_ch07'],
    nodeIds: ['c12_hin_a_cbse_07_013', 'c12_hin_a_cbse_07_014', 'c12_hin_a_cbse_07_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Varkari-tradition reader', intro: 'On the road to Pandharpur, a saint-poet handed the poorest pilgrims a song — and a subtle verdict on orthodoxy.', goal: 'Read Eknath\'s Abhang through the Varkari tradition — folk form carrying devotion and social critique.' },
    discovery: {
        question: 'A pilgrim woman sings to Vitthal of hunger and thirst on the road to Pandharpur — why does an Abhang carry both at once?',
        options: ['Two levels of longing — literal bodily need on the long walk, and spiritual thirst a caste-bound orthodoxy denies; the song is devotion and quiet critique together', 'Pilgrims just get hungry', 'Folk songs need simple themes', 'Fasting is the ritual'],
        answer: 'Two levels of longing — literal bodily need on the long walk, and spiritual thirst a caste-bound orthodoxy denies; the song is devotion and quiet critique together',
        hook: 'Eknath was a Brahmin who wrote for the marginalised — the Abhang\'s plain Marathi, folk rhythm and a woman\'s voice are the reform, not simplification. This is poetry made to be walked and sung, not recited from a throne.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves systematically examining a text\'s language, structure, and context to uncover deeper meanings, evaluate the author\'s choices, and form.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_07_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'March with the Varkaris: learn what makes an Abhang an Abhang, read hunger as both road and spirit, and hear how a saint smuggled equality into a song.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re asked to explain why this poem uses a rural dialect instead of standard Hindi — what effect does it create?',
            decisions: [{ prompt: 'What is the primary function of the folk dialect (nksgk&pkSikbZ) in efyd eqgEen tk;lh\'s poem "ckjgeklk"?', options: [
                { text: 'The folk dialect authenticates the rural woman\'s voice, grounds the poem in a specific', outcome: 'The folk dialect authenticates the rural woman\'s voice, grounds the poem in a specific cultural.' },
                { text: 'decorative', outcome: 'Not quite — Students often treat dialect words as "difficult vocabulary" to be translated into standard Hindi.', reveals: 'students-often-treat-dialect-words' },
                { text: 'merely stylistic', outcome: 'Not quite — Students often treat dialect words as "difficult vocabulary" to be translated into standard Hindi.', reveals: 'students-often-treat-dialect-words' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you are Kanjakali, standing barefoot in the courtyard as the first monsoon drops hit the dust — what would you write in your diary that night?',
            decisions: [{ prompt: 'What are the four mandatory components of a diary entry format in CBSE Class 12 Hindi?', options: [
                { text: 'The four mandatory components are: (1) Date and day, (2) Time (optional but recommended),', outcome: 'The four mandatory components are: (1) Date and day, (2) Time (optional but recommended), (3).' },
                { text: 'subject line', outcome: 'Not quite — Students often write a **summary of the poem** when asked for a creative response (diary entry.', reveals: 'students-often-write-a-summary' },
                { text: 'address', outcome: 'Not quite — Students often write a **summary of the poem** when asked for a creative response (diary entry.', reveals: 'students-often-write-a-summary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a college interview where the panel asks: "This folk poem uses a woman\'s monsoon vigil to explore waiting — what does \'waiting\' mean in our.',
            decisions: [{ prompt: 'What is the primary thematic thread that connects all three stanzas of "ckjgeklk" and how does the progression from stanza 1 to stanza 3.', options: [
                { text: 'The primary thread is *viraha* (separation-longing) experienced through the monsoon night', outcome: 'The primary thread is *viraha* (separation-longing) experienced through the monsoon night.' },
                { text: 'sadness', outcome: 'Not quite — Students treat "discussion points" as *opinion-sharing* ("I feel the poem is sad") rather than.', reveals: 'students-treat-discussion-points-as' },
                { text: 'waiting to speak', outcome: 'Not quite — Students treat "discussion points" as *opinion-sharing* ("I feel the poem is sad") rather than.', reveals: 'students-treat-discussion-points-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_013', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re editing a folk-style music video of a woman waiting through the night for someone who doesn\'t come. A teammate wants to cut the repeated shots — lamp, doorway, her face — because \'repetition is dead screen time.\'',
            decisions: [{ prompt: 'What does Mahadevi Verma\'s \'बारहमासा\'-style waiting poem say?', options: [
                { text: 'Keep the repeats — in the poem each stanza\'s return to lamp, night and call is the waiting itself; repetition isn\'t filler, it\'s the heartbeat, and each recurrence shifts from active seeking to inward endurance as the night deepens.', outcome: 'The chapter\'s point: in folk narrative the structure IS the emotion — time passing is the plot, and only the repeated images let the viewer feel its weight.' },
                { text: 'Cut them — montage it once and move on; viewers understand waiting from a single shot.', outcome: 'One shot conveys \'she waited\' as information; the poem\'s layered returns make the waiting an experience — the difference between being told a night passed and watching it refuse to pass.', reveals: 'repetition-is-filler' },
                { text: 'Keep one repeat at the end for rhythm but tighten the middle.', outcome: 'The poem needs the middle repetitions most — that\'s where \'the day passed, the night didn\'t\' stretches external time into her subjective endurance; trimming there trims the tension\'s source.', reveals: 'repeat-only-at-end' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a pilgrimage song as social reform in folk metre — Bhakti that walks, sings and quietly levels.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves systematically examining.',
          hint: 'If stuck, revisit c12_hin_a_cbse_07_008 (Imagery and Metaphor) and c12_hin_a_cbse_07_009.',
          misconception: 'Students often treat dialect words as "difficult vocabulary" to be translated into standard Hindi, missing that the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking in literary analysis involves systematically examining a text\'s',
                  options: ['Critical thinking in literary analysis involves systematically examining a text\'s', '"Before You Read: Context and Background" is a preparatory step where students gather', 'Plot and narrative structure in a narrative poem refers to the sequence of events,', 'Setting and Atmosphere in poetry refers to the time, place, and sensory environment'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_07_008 (Imagery and Metaphor) and c12_hin_a_cbse_07_009 (Irony and.',
                  misconception: 'Students often treat dialect words as "difficult vocabulary" to be translated into standard Hindi, missing that the dialect *is* the poem\'s.' }
          ],
            remediations: { 'students-often-treat-dialect-words': { steps: ['Have the student read the poem aloud in the dialect, noting which words "feel" different from their standard Hindi.', 'Ask them to rewrite one stanza in standard Hindi and compare emotional impact — they\'ll hear the loss of intimacy.', 'Direct them to c12_hin_a_cbse_07_008 (Imagery and Metaphor) and c12_hin_a_cbse_07_009 (Irony and Symbolism) to see how.', 'Re-diagnose with Question 2 to check if they now grasp temporal-emotional progression.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter refer to the ability to compose structured.',
          hint: 'If stuck, re‑read the poem aloud focusing on sensory words; then list 5 images with.',
          misconception: 'Students often write a **summary of the poem** when asked for a creative response (diary entry, dialogue, etc.).',
          parts: [
                { id: 'a', prompt: 'Why must a diary entry based on Kanjakali be written in first person rather than third person?', answer: 'First person captures the protagonist’s subjective emotions',
                  options: ['First person captures the protagonist’s subjective emotions', 'third person is more formal'],
                  hint: 'If stuck, re‑read the poem aloud focusing on sensory words; then list 5 images with stanza numbers.',
                  misconception: 'Students often write a **summary of the poem** when asked for a creative response (diary entry, dialogue, etc.).' },
                { id: 'b', prompt: 'Write a four‑line dialogue between Kanjakali and the peacock (मोर) using imagery from the poem’s first and third stanzas.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'बरसात की बूँदें मेरे आँगन में गाती हैं, मोर नाचो ना!', 'तेरी पायल की झंकार सुनी, तब ही तो नाचूँ मैं रे!', 'बादल गरजे, दिल डोले, सखी बनी घटा आज।'],
                  hint: 'If stuck, re‑read the poem aloud focusing on sensory words; then list 5 images with stanza numbers.',
                  misconception: 'Students often write a **summary of the poem** when asked for a creative response (diary entry, dialogue, etc.).' }
          ],
            remediations: { 'students-often-write-a-summary': { steps: ['**Revisit format templates**: Use node c12_hin_a_cbse_07_013 (Critical Thinking) to review the exact structure of each.', '**Evidence hunting**: Go back to nodes c12_hin_a_cbse_07_003 (Setting) and 07_008 (Imagery) and list 5 concrete.', '**Guided draft**: Fill a PEEL template for one format (e.g., diary entry) with teacher scaffolding, then write.', '**Re‑diagnose**: Attempt Diagnostic Question 3 again; if still struggling, practice dialogue writing with a simpler.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'Revisit c12_hin_a_cbse_07_010 (Vocabulary) for dialect mastery and c12_hin_a_cbse_07_008.',
          misconception: 'Students treat "discussion points" as *opinion-sharing* ("I feel the poem is sad") rather than *evidence-based literary.',
          parts: [
                { id: 'a', prompt: 'A classmate claims: "The dialect words in \'ckjgeklk\' (like \'nsol\', \'fufl\', \'nwHkj\') are just decorative — the poem would mean the same in standard Hindi." How.', answer: 'The dialect *is* the meaning',
                  options: ['The dialect *is* the meaning', 'waiting to speak', 'group discussion'],
                  hint: 'Revisit c12_hin_a_cbse_07_010 (Vocabulary) for dialect mastery and c12_hin_a_cbse_07_008.',
                  misconception: 'Students treat "discussion points" as *opinion-sharing* ("I feel the poem is sad") rather than *evidence-based literary conversation*.' },
                { id: 'b', prompt: 'Design a 90-second discussion opening for a peer group that uses the image \'iQkxqu iou >dksjs cgk\' (stanza 4) to explore gendered waiting.', answer: 'Sample opening: "The line \'iQkxqu iou >dksjs cgk\'',
                  options: ['Sample opening: "The line \'iQkxqu iou >dksjs cgk\'', 'waiting to speak', 'group discussion'],
                  hint: 'Revisit c12_hin_a_cbse_07_010 (Vocabulary) for dialect mastery and c12_hin_a_cbse_07_008.',
                  misconception: 'Students treat "discussion points" as *opinion-sharing* ("I feel the poem is sad") rather than *evidence-based literary conversation*.' }
          ],
            remediations: { 'students-treat-discussion-points-as': { steps: ['Have the student re-read stanza 2 aloud, marking every verb showing the woman\'s *action* (not feeling) — e.g., \'tkMs+\'.', 'Ask: "What does she *do* while waiting?" — forcing textual grounding.', 'Practice a 60-second response to: "Stanza 2 shows waiting as *labor* — agree/disagree with one verb as evidence." 4.', 'Record and replay — student self-corrects for textual anchors.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "discussion points" as *opinion-sharing* ("I feel the poem is sad") rather than *evidence-based literary.',
          parts: [
                { id: 'a', prompt: 'Critique this interpretation: "Tulsidas wrote \'ckjgeklk\' to protest patriarchal norms because the woman speaks boldly to her absent husband." Defend or refute.', answer: 'Refute',
                  options: ['Refute', 'waiting to speak', 'group discussion'],
                  hint: 'Revisit c12_hin_a_cbse_07_010 (Vocabulary) for dialect mastery and c12_hin_a_cbse_07_008.',
                  misconception: 'Students treat "discussion points" as *opinion-sharing* ("I feel the poem is sad") rather than *evidence-based literary conversation*.' }
          ],
            remediations: { 'students-treat-discussion-points-as': { steps: ['Have the student re-read stanza 2 aloud, marking every verb showing the woman\'s *action* (not feeling) — e.g., \'tkMs+\'.', 'Ask: "What does she *do* while waiting?" — forcing textual grounding.', 'Practice a 60-second response to: "Stanza 2 shows waiting as *labor* — agree/disagree with one verb as evidence." 4.', 'Record and replay — student self-corrects for textual anchors.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
