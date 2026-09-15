import type { SimDef } from '../../engine/types';

/** v3 generated — c8_engl_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_engl_ch02_p2: SimDef = {
    id: 'v3_c8_engl_ch02_p2',
    title: 'A Tale of Valour: Major Somnath Sharma and the Battle of Badgam · Part 2/3',
    subtitle: 'The forty-eight hours that decided Kashmir',
    classLevel: 8, subject: 'engl', topic: 'A Tale of Valour: Major Somnath Sharma and the Battle of Badgam · Part 2/3',
    chapters: ['c8_engl_ch02'],
    nodeIds: ['c8_engl_ch2_15', 'c8_engl_ch2_16', 'c8_engl_ch2_17', 'c8_engl_ch2_2', 'c8_engl_ch2_3', 'c8_engl_ch2_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a young officer at Srinagar airfield, 1947', intro: 'Invaders are burning Baramulla and marching on your runway — the only way reinforcements can arrive. Understand the accession, the airlift and the battle that followed, before the valley is cut off.', goal: 'Understand the 1947 tribal invasion of Kashmir, the Instrument of Accession, and how Operation Gulmarg and the Battle of Badgam flowed from the defence of Srinagar airport.' },
    discovery: {
        question: 'October 1947: tribal invaders are 20 km from Srinagar and the airport is the valley\'s only lifeline. Why did Indian troops land there on October 27 — and only then?',
        options: ['Maharaja Hari Singh signed the Instrument of Accession on October 26 — Indian troops could only legally enter after Kashmir joined India', 'India had planned to capture Kashmir for months', 'The United Nations ordered the landing', 'The troops were already stationed in Srinagar'],
        answer: 'Maharaja Hari Singh signed the Instrument of Accession on October 26 — Indian troops could only legally enter after Kashmir joined India',
        hook: 'Operation Gulmarg wasn\'t a pre-planned grab — it was an emergency rescue. Invaders reached Baramulla first, the Maharaja acceded in panic, and only then did Indian soldiers fly in to defend the airport. Sequence changes everything.',
    },
    teaching: [
        { title: 'Poetic Devices: Imagery and Symbolism in War Poetry', text: 'Imagery in war poetry uses vivid sensory language (sight, sound, smell, touch, taste) to recreate the battlefield experience, while symbolism uses concrete objects (like a flag, a rifle, or a poppy).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_engl_ch2_15', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Rebuild the timeline of October 1947: invaders reach Baramulla, the Maharaja signs accession, troops land at Srinagar. Then stand at Badgam on November 3 and see why Major Somnath Sharma\'s stand mattered.',
        labels: ['Poetic Devices: Imagery', 'Poem: Tone of Patriotism', 'Writing: Comparing Prose', 'Character Analysis: Major Somnath', 'Setting: Battle of Badgam', 'Plot: The Defence'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_engl_ch2_17', title: 'Writing: Comparing Prose and Poem on the Same Theme of Valour',
          caseStudy: { intro: 'Think about when you watched a movie and read a book about the same historical event—like the Battle of Badgam.',
            decisions: [{ prompt: 'What is the first step when writing a comparison between a prose passage and a poem on the same theme?', options: [
                { text: 'The first step is to identify the central theme (valour) in both texts by reading each', outcome: 'The first step is to identify the central theme (valour) in both texts by reading each carefully.' },
                { text: 'start writing immediately', outcome: 'Not quite — Students often think comparing prose and poem means listing obvious similarities (both talk about.', reveals: 'comparing-prose-and-poem-means' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch2_2', title: 'Character Analysis: Major Somnath Sharma as a Brave Soldier',
          caseStudy: { intro: 'Imagine you are writing a speech for your school\'s Republic Day function about a real-life hero.',
            decisions: [{ prompt: 'What is the first step in analyzing a character\'s traits from a text?', options: [
                { text: 'The first step is to identify specific actions, speech, or thoughts of the character', outcome: 'The first step is to identify specific actions, speech, or thoughts of the character described.' },
                { text: 'List the character\'s age and birthplace first', outcome: 'Not quite — Students often think character analysis for a real historical figure is just listing biographical.', reveals: 'character-analysis-for-a-real' },
                { text: 'He was born in 1923, he joined the army, he died in battle', outcome: 'Not quite — Students often think character analysis for a real historical figure is just listing biographical.', reveals: 'character-analysis-for-a-real' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch2_3', title: 'Setting: Battle of Badgam in the Kashmir Valley',
          caseStudy: { intro: 'Imagine you\'re planning a cricket match in your school ground—would you choose a rocky, uneven pitch or a smooth, flat one?',
            decisions: [{ prompt: 'What is the primary geographical feature of Badgam that made it strategically important for defending Srinagar airport in November 1947?', options: [
                { text: 'Badgam\'s elevation—its position on rising ground approximately 6 km west of Srinagar', outcome: 'Badgam\'s elevation—its position on rising ground approximately 6 km west of Srinagar.' },
                { text: 'Badgam is near Srinagar', outcome: 'Not quite — Students often treat setting description in historical narratives as a static list of places (e.g.', reveals: 'students-often-treat-setting-description' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch2_4', title: 'Plot: The Defence of Srinagar Airport by 90 Soldiers',
          caseStudy: { intro: 'Imagine you are watching a war movie where 90 soldiers hold an airport against 500 attackers.',
            decisions: [{ prompt: 'What are the five standard stages of a plot diagram, in correct order?', options: [
                { text: 'The five stages are: 1) Exposition, 2) Rising Action, 3) Climax, 4) Falling Action, 5)', outcome: 'The five stages are: 1) Exposition, 2) Rising Action, 3) Climax, 4) Falling Action, 5) Resolution.' },
                { text: 'Introduction, Conflict, Ending', outcome: 'Not quite — Students often treat the battle as a single "fight scene" rather than a sequence of three distinct.', reveals: 'students-often-treat-the-battle' },
                { text: 'Introduction, Conflict, Ending" or missing Rising Action', outcome: 'Not quite — Students often treat the battle as a single "fight scene" rather than a sequence of three distinct.', reveals: 'students-often-treat-the-battle' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch2_15', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend summarises a chapter on 1947: \'India launched Operation Gulmarg to grab Kashmir, sent troops in first, and the Maharaja signed papers later to make it legal.\' Another student frowns at the sequence.',
            decisions: [{ prompt: 'What does the correct order of events show?', options: [
                { text: 'The invasion came first — tribesmen reached Baramulla by 24 October; the Maharaja signed the Instrument of Accession on 26 October; only then did Indian troops land at Srinagar airport on 27 October. Gulmarg began as an emergency defence of the valley\'s only air lifeline, not a land grab.', outcome: 'This keeps the sequence straight and shows why accession had to precede deployment — Indian entry was legally impossible before it.' },
                { text: 'The friend\'s version works — the paperwork is just a formality that could follow the troops.', outcome: 'Reversing accession and troop landing turns a defensive response into an invasion; the legal accession is what made the deployment possible at all.', reveals: 'troops-before-accession' },
                { text: 'The Maharaja invited Indian troops weeks earlier as part of a pre-planned offensive to take the whole region.', outcome: 'He had actually delayed choosing either country, hoping to stay independent; only the tribal invasion forced his hand — nothing about it was pre-planned expansion.', reveals: 'pre-planned-offensive' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch2_4', title: 'The bigger picture',
          caseStudy: { intro: 'History turns on sequence: invasion → accession → airlift. The Battle of Badgam wasn\'t aggression — it was a desperate defence of the only runway keeping Kashmir connected to India.',
            decisions: [{ prompt: 'What comes next? A Tale of Valour: Major Somnath Sharma and the Battle of Badgam · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Tale of Valour: Major Somnath Sharma and the Battle of Badgam · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_engl_ch2_15', difficulty: 'standard',
          question: 'Imagery in war poetry uses vivid sensory language (sight, sound, smell, touch.',
          hint: 'Review the \'Paper Boats\' (c6_english_u3_024) and \'Pushp ki Abhilasha\' (c7_engl_ch05_012).',
          misconception: 'Students treat imagery and symbolism as a "spot-the-device" checklist: they highlight "mud = imagery" and "flag.',
          parts: [
                { id: 'a', prompt: 'In the war poem for this chapter, the poet writes of "the orange glow of the first shell." Explain whether this is primarily imagery or symbolism, and justify.', answer: 'It is primarily **imagery** (visual and thermal)',
                  options: ['It is primarily **imagery** (visual and thermal)', 'orange is a colour of sacrifice'],
                  hint: 'Review the \'Paper Boats\' (c6_english_u3_024) and \'Pushp ki Abhilasha\' (c7_engl_ch05_012) analyses.',
                  misconception: 'Students treat imagery and symbolism as a "spot-the-device" checklist: they highlight "mud = imagery" and "flag = symbolism" but cannot.' }
          ],
            remediations: { 'students-treat-imagery-and-symbolism': { steps: ['Take the student to a single stanza.', 'What do you *see/hear/feel*?" List the sensory words—that is imagery.', 'Pick one object from that list (e.g., "the radio crackling").', 'Ask: "If this radio stops working, what is lost?" Guide them to: "Contact with command / hope / the link to home." That.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch2_16', difficulty: 'standard',
          question: 'The **tone** of a poem is the poet’s attitude toward the subject or audience.',
          hint: 'If stuck, ask the student to read two lines in an angry voice, then in a soft whisper.',
          misconception: 'Students frequently confuse **Tone** (the poet\'s attitude toward the subject) with **Mood** (the feeling created in the.',
          parts: [
                { id: 'a', prompt: 'In a poem honoring Major Somnath Sharma, Stanza 1 uses words like "raging fire" and "outnumbered stands," while Stanza 4 uses "immortal name" and "beacon.', answer: 'B Option B is correct',
                  options: ['B Option B is correct', 'beacon light', 'immortal'],
                  hint: 'If stuck, ask the student to read two lines in an angry voice, then in a soft whisper, and identify.',
                  misconception: 'Students frequently confuse **Tone** (the poet\'s attitude toward the subject) with **Mood** (the feeling created in the reader) or with.' }
          ],
            remediations: { 'students-frequently-confuse-tone-the': { steps: ['When a student confuses tone with subject or mood, follow this remediation sequence: 1.', 'Draw two columns on the board labeled **Speaker/Poet (Tone)** and **Reader (Mood)**.', 'Provide a simple scenario: *"A teacher speaks in a stern voice about homework."* Ask: What is the teacher\'s attitude?', 'How do you feel as a student?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch2_17', difficulty: 'standard',
          question: 'Writing a comparison between prose and poem on the same theme involves.',
          hint: 'If stuck, review how to analyze poetic devices (c8_engl_ch2_15) and prose.',
          misconception: 'Students often think comparing prose and poem means listing obvious similarities (both talk about soldiers) and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Writing a comparison between prose and poem on the same theme involves analyzing how two',
                  options: ['Writing a comparison between prose and poem on the same theme involves analyzing how two', 'The historical context of the Kashmir Conflict and Operation Gulmarg (1947) refers to the', 'Comprehension of historical narratives involves analyzing textual evidence to explain', 'Critical thinking in this context means analyzing the concepts of valour and sacrifice by'],
                  hint: 'If stuck, review how to analyze poetic devices (c8_engl_ch2_15) and prose character/setting.',
                  misconception: 'Students often think comparing prose and poem means listing obvious similarities (both talk about soldiers) and differences (one is prose.' }
          ],
            remediations: { 'comparing-prose-and-poem-means': { steps: ['First, have the student identify the theme (valour) in one text using a specific example (e.g., "In prose, Sharma\'s.', 'Then, ask: "How does this example show valour?" Guide them to explain the courage in his words.', 'Repeat for the poem (e.g., "The line \'beacon of hope\' shows valour by comparing soldiers to a guiding light").', 'Finally, have them state if both examples show valour similarly (both depict courage inspiring others) or differently.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch2_2', difficulty: 'standard',
          question: 'Character analysis of Major Somnath Sharma involves examining his traits (such.',
          hint: 'Work step by step.',
          misconception: 'Students often think character analysis for a real historical figure is just listing biographical facts (e.g., "He was.',
          parts: [
                { id: 'a', prompt: 'Given a new scenario: A soldier in a story continues to guard a bridge even after his commander orders retreat, knowing he might not survive.', answer: 'The trait is loyalty or courage',
                  options: ['The trait is loyalty or courage', 'The trait is kindness', 'He was born in 1923, he joined the army, he died in battle'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students often think character analysis for a real historical figure is just listing biographical facts (e.g., "He was born in 1923,.' }
          ],
            remediations: { 'character-analysis-for-a-real': { steps: ['To fix this, ask the student: "If I tell you Major Somnath Sharma was born in Himachal Pradesh, what does that tell you.', 'Now, if I tell you he stayed at his post when all others had fallen, what does that tell you?', 'So, focus on actions that show what kind of person he was, not just when or where he was born.', 'Then, practice with a simple example: \'Suraj kept exploring the tunnel despite fear\'—what trait does that show?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch2_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think character analysis for a real historical figure is just listing biographical facts (e.g., "He was.',
          parts: [
                { id: 'a', prompt: 'Some might argue that Major Somnath Sharma\'s decision to hold his position was foolish because it led to his death.', answer: 'The claim is unfounded',
                  options: ['The claim is unfounded', 'He was born in 1923, he joined the army, he died in battle'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students often think character analysis for a real historical figure is just listing biographical facts (e.g., "He was born in 1923,.' },
                { id: 'b', prompt: 'Create a short dialogue (2-3 lines) that Major Somnath Sharma might have said to his troops before the battle, showing his patriotic spirit and bravery.', answer: 'Example: "Men, we are the last line of defense for Srinagar',
                  options: ['Example: "Men, we are the last line of defense for Srinagar', 'He was born in 1923, he joined the army, he died in battle'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students often think character analysis for a real historical figure is just listing biographical facts (e.g., "He was born in 1923,.' }
          ],
            remediations: { 'character-analysis-for-a-real': { steps: ['To fix this, ask the student: "If I tell you Major Somnath Sharma was born in Himachal Pradesh, what does that tell you.', 'Now, if I tell you he stayed at his post when all others had fallen, what does that tell you?', 'So, focus on actions that show what kind of person he was, not just when or where he was born.', 'Then, practice with a simple example: \'Suraj kept exploring the tunnel despite fear\'—what trait does that show?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch2_3', difficulty: 'standard',
          question: 'Setting in a historical narrative like the Battle of Badgam encompasses the.',
          hint: 'Work step by step.',
          misconception: 'Students often treat setting description in historical narratives as a static list of places (e.g., "Badgam is near.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting in a historical narrative like the Battle of Badgam encompasses the specific',
                  options: ['Setting in a historical narrative like the Battle of Badgam encompasses the specific', 'The historical context of the Kashmir Conflict and Operation Gulmarg (1947) refers to the', 'Comprehension of historical narratives involves analyzing textual evidence to explain', 'Critical thinking in this context means analyzing the concepts of valour and sacrifice by'],
                  hint: 'Recall the definition.',
                  misconception: 'Students often treat setting description in historical narratives as a static list of places (e.g., "Badgam is near Srinagar airport,.' }
          ],
            remediations: { 'students-often-treat-setting-description': { steps: ['To fix this, guide the student to ask three sequential questions for every setting detail mentioned: (1) "What specific.', 'Use a concrete example: Take the setting detail "nullahs (dry riverbeds) crisscrossing the Badgam area." Ask: What.', '(Provided covered ditches.) How did this change what soldiers could do?', '(Allowed enemies to move unseen within 300m of positions.) What tactical decision did this force?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch2_4', difficulty: 'standard',
          question: 'Plot is the sequence of causally linked events that form the narrative.',
          hint: 'Review the plot diagram of "The Tunnel" (c6_english_u4_031) and practice mapping its.',
          misconception: 'Students often treat the battle as a single "fight scene" rather than a sequence of three distinct enemy assaults.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot is the sequence of causally linked events that form the narrative structure of a',
                  options: ['Plot is the sequence of causally linked events that form the narrative structure of a', 'The historical context of the Kashmir Conflict and Operation Gulmarg (1947) refers to the', 'Comprehension of historical narratives involves analyzing textual evidence to explain', 'Critical thinking in this context means analyzing the concepts of valour and sacrifice by'],
                  hint: 'Review the plot diagram of "The Tunnel" (c6_english_u4_031) and practice mapping its events to the.',
                  misconception: 'Students often treat the battle as a single "fight scene" rather than a sequence of three distinct enemy assaults separated by command.' }
          ],
            remediations: { 'students-often-treat-the-battle': { steps: ['If the student cannot distinguish the three assaults, have them create a two-column table: Column A = Time/Event (0930.', 'Then ask: "Which response required the highest leadership decision?" (The 1100 decision to stay and direct fire while.', 'This forces separation of events and links each to a character choice, revealing the plot\'s decision-driven structure.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
