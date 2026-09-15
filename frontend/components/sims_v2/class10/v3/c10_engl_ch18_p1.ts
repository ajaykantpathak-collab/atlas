import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch18_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch18_p1: SimDef = {
    id: 'v3_c10_engl_ch18_p1',
    title: 'The Book That Saved the Earth · Part 1/2',
    subtitle: 'Repel a Martian invasion with nothing but nursery rhymes',
    classLevel: 10, subject: 'engl', topic: 'The Book That Saved the Earth · Part 1/2',
    chapters: ['c10_engl_ch18'],
    nodeIds: ['c10_engl_cbse_18_001', 'c10_engl_cbse_18_002', 'c10_engl_cbse_18_003', 'c10_engl_cbse_18_004', 'c10_engl_cbse_18_005', 'c10_engl_cbse_18_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a Martian fleet commander decoding Earth\'s secrets', intro: 'The year is 2040. Your fleet lands at a strange Earth building called a \'library\' — a warehouse of primitive \'books.\' Somewhere in those paper rectangles must be the secret of this planet\'s power.', goal: 'See how satire uses dramatic irony: the \'backward\' humans win because the \'advanced\' invaders cannot read without arrogance.' },
    discovery: {
        question: 'In 2040, Martian invaders land on Earth to conquer it — but flee in terror after \'decoding\' a book of nursery rhymes, convinced that Earthlings have explosive weapons and interstellar reach. How did a children\'s book defeat an invasion?',
        options: ['The Martians misread rhymes as military intelligence — \'Humpty Dumpty\' proved Earth\'s violent power', 'The rhymes contained a hidden code planted by Earth\'s scientists', 'The book emitted radiation that poisoned the Martian fleet', 'The Historian hypnotised the invaders through the museum display'],
        answer: 'The Martians misread rhymes as military intelligence — \'Humpty Dumpty\' proved Earth\'s violent power',
        hook: 'The Martians were defeated by their own arrogance: they \'translated\' Mother Goose into a weapons manual. A book only \'saves the Earth\' because the invaders couldn\'t imagine being wrong.',
    },
    teaching: [
        { title: 'Setting the Scene: The 25th Century Museum of Ancient History', text: 'The opening scene of a play that establishes the time (25th century), place (Museum of Ancient History), and narrative frame (a historian addressing an audience) to introduce the central event: how.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_18_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Command a Martian space fleet invading a library, assign \'experts\' to decode a mysterious Earth book — and watch your mighty armada retreat before Mother Goose.',
        labels: ['Setting the Scene', 'Think-Tank: The Arrogant', 'The Martian Invasion', 'The Misinterpretation of Books', 'Think-Tank\'s Fear: Rhymes as', 'The Book That Saved'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_18_001', title: 'Setting the Scene: The 25th Century Museum of Ancient History',
          caseStudy: { intro: 'Imagine you walk into a museum today and see an exhibit labeled "The Book That Saved Earth — 2040." You\'d wonder: what book? How could a book save a planet?',
            decisions: [{ prompt: 'What is the primary purpose of the Historian\'s opening monologue in the Museum of Ancient History scene?', options: [
                { text: 'The Historian\'s monologue establishes the time (25th century), place (Museum of Ancient', outcome: 'The Historian\'s monologue establishes the time (25th century), place (Museum of Ancient History).' },
                { text: 'It introduces Think-Tank', outcome: 'Not quite — Students often think the Museum scene is just a "background introduction" and skip analyzing its.', reveals: 'the-museum-scene-is-just' },
                { text: 'background introduction', outcome: 'Not quite — Students often think the Museum scene is just a "background introduction" and skip analyzing its.', reveals: 'the-museum-scene-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_18_002', title: 'Think-Tank: The Arrogant and Mighty Ruler of Mars',
          caseStudy: { intro: 'Imagine you are watching a historical drama where a king makes a disastrous decision because he refuses to listen to his advisors — Think-Tank is that king.',
            decisions: [{ prompt: 'In the play, what specific physical attribute of Think-Tank is repeatedly emphasized through stage directions and dialogue to symbolize his.', options: [
                { text: 'Think-Tank\'s large, egg-shaped head is repeatedly emphasized (e.g., "Great and Mighty', outcome: 'Think-Tank\'s large, egg-shaped head is repeatedly emphasized (e.g., "Great and Mighty Think-Tank,".' },
                { text: 'his robe', outcome: 'Not quite — Students often write: "Think-Tank is evil and wants to destroy Earth." This is incorrect.', reveals: 'students-often-write-think-tank' },
                { text: 'his voice', outcome: 'Not quite — Students often write: "Think-Tank is evil and wants to destroy Earth." This is incorrect.', reveals: 'students-often-write-think-tank' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_18_003', title: 'The Martian Invasion of Earth in 2040: The Plan',
          caseStudy: { intro: 'Imagine you are a Martian commander planning to invade Earth — what would you need to know first?',
            decisions: [{ prompt: 'What is the very first action Think-Tank takes to initiate the invasion of Earth in 2040?', options: [
                { text: 'Think-Tank orders his apprentice Noodle to establish contact with the manned space probe', outcome: 'Think-Tank orders his apprentice Noodle to establish contact with the manned space probe (crewed.' },
                { text: 'He reads a book', outcome: 'Not quite — Students often think Think-Tank\'s plan fails because Earthlings actively defend themselves using.', reveals: 'think-tank-s-plan-fails' },
                { text: 'He attacks Earth directly', outcome: 'Not quite — Students often think Think-Tank\'s plan fails because Earthlings actively defend themselves using.', reveals: 'think-tank-s-plan-fails' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_18_004', title: 'The Misinterpretation of Books: Mother Goose Rhymes as Weapons',
          caseStudy: { intro: 'Imagine you find an alien civilization holding a children\'s picture book, trembling because they think "The cow jumped over the moon" is a report on bovine.',
            decisions: [{ prompt: 'What object do the Martians initially mistake the book for, and what does Think-Tank command his crew to do with it?', options: [
                { text: 'The Martians initially mistake the book for a sandwich (or a communication device)', outcome: 'The Martians initially mistake the book for a sandwich (or a communication device).' },
                { text: 'they knew it was a book immediately', outcome: 'Not quite — Students often think the comedy comes *only* from the nursery rhymes being silly.', reveals: 'the-comedy-comes-only-from' },
                { text: 'Think-Tank thought \'silver bells\' were bombs', outcome: 'Not quite — Students often think the comedy comes *only* from the nursery rhymes being silly.', reveals: 'the-comedy-comes-only-from' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_18_005', title: 'Think-Tank\'s Fear: Rhymes as Earth\'s Secret Weapon',
          caseStudy: { intro: 'Imagine you\'re watching a horror movie where the villain trembles at a lullaby — that\'s the absurdity we\'re analyzing.',
            decisions: [{ prompt: 'What are the three Mother Goose nursery rhymes that Think-Tank\'s crew reads aloud, and what does Think-Tank believe each one represents.', options: [
                { text: 'The three rhymes are "Mistress Mary" (interpreted as agriculture/mineral wealth: "silver', outcome: 'The three rhymes are "Mistress Mary" (interpreted as agriculture/mineral wealth: "silver bells".' },
                { text: 'stupid', outcome: 'Not quite — Students often think Think-Tank is simply "stupid" or "foolish," missing that his misreading.', reveals: 'think-tank-is-simply-stupid' },
                { text: 'foolish', outcome: 'Not quite — Students often think Think-Tank is simply "stupid" or "foolish," missing that his misreading.', reveals: 'think-tank-is-simply-stupid' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_18_006', title: 'The Book That Saved the Earth: How Nursery Rhymes Prevented Invasion',
          caseStudy: { intro: 'Imagine you send a text message saying "I\'m dying of laughter" to a friend who doesn\'t know idioms — they might call an ambulance!',
            decisions: [{ prompt: 'What is the title of the book the Martians discover in the Earth library, and who is its traditional author?', options: [
                { text: 'The book is *Mother Goose*, a traditional collection of nursery rhymes attributed to the', outcome: 'The book is *Mother Goose*, a traditional collection of nursery rhymes attributed to the fictional.' },
                { text: 'Encyclopaedia Britannica', outcome: 'Not quite — Students often believe the Martians are scared *because* the book is old or dusty, or because they.', reveals: 'the-martians-are-scared-because' },
                { text: 'The Art of War', outcome: 'Not quite — Students often believe the Martians are scared *because* the book is old or dusty, or because they.', reveals: 'the-martians-are-scared-because' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_18_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate skims a poem for two minutes, then announces to the class that it\'s obviously a coded protest anthem — \'the poem mentions a river, and rivers always mean rebellion.\' He is completely confident and completely wrong.',
            decisions: [{ prompt: 'Which character from \'The Book That Saved the Earth\' is he imitating, and what is the lesson?', options: [
                { text: 'He is doing a Think-Tank — the Martian commander who confidently \'decoded\' a book of nursery rhymes as military secrets and surrendered to Earth over \'Humpty Dumpty.\' The play satirises exactly this: arrogant misreading, where supreme confidence replaces actual understanding, and the reader\'s ego, not the text, supplies the meaning.', outcome: 'The comedy works because Think-Tank never doubts himself — and the classmate\'s confident nonsense about rivers shows the same error the play skewers.' },
                { text: 'His confident reading is fine — a poem means whatever the reader first thinks it means, so he cannot be wrong.', outcome: 'Think-Tank is a warning against precisely this — his confident misreading of \'Mistress Mary\' as explosives nearly caused a war; interpretation has to answer to the text.', reveals: 'any-reading-is-valid' },
                { text: 'He is right that nursery rhymes and poems are too trivial to matter — only the Martians were foolish enough to take a book seriously.', outcome: 'The joke cuts the other way — the \'trivial\' book saved an entire planet; the play insists the written word is more powerful than invading fleets.', reveals: 'books-are-trivial' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_18_006', title: 'The bigger picture',
          caseStudy: { intro: 'The invasion failed not with a bang but with a nursery rhyme. Superior technology lost to a superior imagination — Earth\'s, and the playwright\'s.',
            decisions: [{ prompt: 'What comes next? The Book That Saved the Earth · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Book That Saved the Earth · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_18_001', difficulty: 'standard',
          question: 'The opening scene of a play that establishes the time (25th century), place.',
          hint: 'Review "dramatic irony" and "frame narrative" from Class 9 play notes (c9_engl_ch6_4) and.',
          misconception: 'Students often think the Museum scene is just a "background introduction" and skip analyzing its structural role.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The opening scene of a play that establishes the time (25th century), place (Museum of',
                  options: ['The opening scene of a play that establishes the time (25th century), place (Museum of', 'Think-Tank is the pompous, self-proclaimed "Mighty Ruler of Mars" in Claire Boiko\'s play', 'The Martian invasion plan in "The Book That Saved the Earth" refers to Think-Tank\'s', 'The misinterpretation of books refers to the comedic central conflict in the play where'],
                  hint: 'Review "dramatic irony" and "frame narrative" from Class 9 play notes (c9_engl_ch6_4) and the.',
                  misconception: 'Students often think the Museum scene is just a "background introduction" and skip analyzing its structural role.' }
          ],
            remediations: { 'the-museum-scene-is-just': { steps: ['Have the student draw a two-column timeline: left column "25th Century Museum (Frame)" with bullet points (Historian.', 'Ask: "Which column knows the ending?" (Left). "Which column is living the events?" (Right).', 'Explain: the play constantly cuts between these columns; the comedy lives in the gap.', 'Re-read the opening stage directions and monologue, highlighting every word that places us in the 25th century (e.g.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_18_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Museum scene is just a "background introduction" and skip analyzing its structural role.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of beginning the play with a museum exhibit label: "The Book That Saved the Earth." Does this title give away too much, or does.', answer: 'The title enhances the comedy',
                  options: ['The title enhances the comedy', 'spoils the story', 'background introduction'],
                  hint: 'Review "dramatic irony" and "frame narrative" from Class 9 play notes (c9_engl_ch6_4) and the.',
                  misconception: 'Students often think the Museum scene is just a "background introduction" and skip analyzing its structural role.' }
          ],
            remediations: { 'the-museum-scene-is-just': { steps: ['Have the student draw a two-column timeline: left column "25th Century Museum (Frame)" with bullet points (Historian.', 'Ask: "Which column knows the ending?" (Left). "Which column is living the events?" (Right).', 'Explain: the play constantly cuts between these columns; the comedy lives in the gap.', 'Re-read the opening stage directions and monologue, highlighting every word that places us in the 25th century (e.g.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_18_002', difficulty: 'standard',
          question: 'Think-Tank is the pompous, self-proclaimed "Mighty Ruler of Mars" in Claire.',
          hint: 'Review "dramatic irony" (Class 9 drama nodes) and "character traits from dialogue" (Class.',
          misconception: 'Students often write: "Think-Tank is evil and wants to destroy Earth." This is incorrect.',
          parts: [
                { id: 'a', prompt: 'Apply the STEAL framework to analyze Think-Tank\'s reaction when Noodle gently corrects him about the "sandwich" being a book.', answer: '**Step 1:** Identify the moment: Noodle suggests the object is a book',
                  options: ['**Step 1:** Identify the moment: Noodle suggests the object is a book', 'he thought it was a sandwich', 'analysis'],
                  hint: 'Review "dramatic irony" (Class 9 drama nodes) and "character traits from dialogue" (Class 6/8.',
                  misconception: 'Students often write: "Think-Tank is evil and wants to destroy Earth." This is incorrect.' }
          ],
            remediations: { 'students-often-write-think-tank': { steps: ['If a student insists Think-Tank is a traditional villain: 1.', 'Ask: "Does he ever shoot a weapon or give a cruel order?" (No — he only gives silly commands.) 2.', 'Show the stage direction: "Think-Tank: (trembling) ...', 'We must evacuate!" — highlight "trembling" as comedy, not menace.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_18_003', difficulty: 'standard',
          question: 'The Martian invasion plan in "The Book That Saved the Earth" refers.',
          hint: 'If stuck, review c9_engl_ch6_4 (Dramatic Structure) for play format and c8_engl_ch1_6.',
          misconception: 'Students often think Think-Tank\'s plan fails because Earthlings actively defend themselves using the nursery rhymes.',
          parts: [
                { id: 'a', prompt: 'Why does Think-Tank initially believe the books in the Earth library are "communication sandwiches"?', answer: 'Think-Tank sees the crew handling rectangular objects with "pages" and',
                  options: ['Think-Tank sees the crew handling rectangular objects with "pages" and', 'He knows they are books but pretends otherwise'],
                  hint: 'If stuck, review c9_engl_ch6_4 (Dramatic Structure) for play format and c8_engl_ch1_6 (Wit.',
                  misconception: 'Students often think Think-Tank\'s plan fails because Earthlings actively defend themselves using the nursery rhymes as actual weapons.' }
          ],
            remediations: { 'think-tank-s-plan-fails': { steps: ['If a student holds this misconception: (1) Re-read Scene 3 aloud together, highlighting that no Earth character speaks.', '(2) Create a two-column table: "What Think-Tank thinks the rhyme means" vs.', '"What the rhyme actually says" — e.g., "Mistress Mary\'s garden = biological weapons" vs.', '"silver bells and cockle shells = flowers." (3) Ask: "Who fires a shot?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_18_004', difficulty: 'standard',
          question: 'The misinterpretation of books refers to the comedic central conflict in the.',
          hint: 'If stuck, review "dramatic irony" from Class 9 drama node c9_engl_ch6_7 and re-read the.',
          misconception: 'Students often think the comedy comes *only* from the nursery rhymes being silly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The misinterpretation of books refers to the comedic central conflict in the play where',
                  options: ['The misinterpretation of books refers to the comedic central conflict in the play where', 'The opening scene of a play that establishes the time (25th century), place (Museum of', 'Think-Tank is the pompous, self-proclaimed "Mighty Ruler of Mars" in Claire Boiko\'s play', 'The Martian invasion plan in "The Book That Saved the Earth" refers to Think-Tank\'s'],
                  hint: 'If stuck, review "dramatic irony" from Class 9 drama node c9_engl_ch6_7 and re-read the three.',
                  misconception: 'Students often think the comedy comes *only* from the nursery rhymes being silly.' }
          ],
            remediations: { 'the-comedy-comes-only-from': { steps: ['Re-read the "Mistress Mary" scene aloud, pausing after each line of the rhyme to ask: "What does the rhyme *actually*.', 'What does Think-Tank *claim* it says?', 'Why does he choose that claim?" 2.', 'Create a two-column table: Column A = Nursery Rhyme Line (literal meaning), Column B = Think-Tank\'s Interpretation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_18_005', difficulty: 'standard',
          question: 'This topic examines how Think-Tank\'s misinterpretation of Mother Goose nursery.',
          hint: 'Review "dramatic irony" using a familiar film scene — e.g., in *Taare Zameen Par*, the.',
          misconception: 'Students often think Think-Tank is simply "stupid" or "foolish," missing that his misreading is driven by narcissism.',
          parts: [
                { id: 'a', prompt: 'Noodle suggests the rhymes might be "codes" — but Think-Tank insists they are "highly sophisticated." Apply the concept of confirmation bias to explain how.', answer: 'Step 1: Identify Think-Tank\'s prior belief',
                  options: ['Step 1: Identify Think-Tank\'s prior belief', 'stupidity', 'stupid', 'foolish'],
                  hint: 'Review "dramatic irony" using a familiar film scene — e.g., in *Taare Zameen Par*, the audience.',
                  misconception: 'Students often think Think-Tank is simply "stupid" or "foolish," missing that his misreading is driven by narcissism and confirmation bias.' },
                { id: 'b', prompt: 'Analyze how the stage directions and Think-Tank\'s dialogue create dramatic irony in the scene where "Hey Diddle Diddle" is read.', answer: 'The stage direction "[Think-Tank trembles]" paired with his command "Stop!',
                  options: ['The stage direction "[Think-Tank trembles]" paired with his command "Stop!', 'stupid', 'foolish'],
                  hint: 'Review "dramatic irony" using a familiar film scene — e.g., in *Taare Zameen Par*, the audience.',
                  misconception: 'Students often think Think-Tank is simply "stupid" or "foolish," missing that his misreading is driven by narcissism and confirmation bias.' }
          ],
            remediations: { 'think-tank-is-simply-stupid': { steps: ['If a student reduces Think-Tank to "stupid," do this 3-step remediation: (1) Ask: "If you believed you were the.', '(3) Assign a 50-word write-up: "Explain how Think-Tank\'s interpretation of \'silver bells\' as weapons protects his.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_18_006', difficulty: 'standard',
          question: 'This topic covers the climax and resolution of the play where the Martians, led.',
          hint: 'If stuck, re-watch/read Scene 1 (c10_engl_cbse_18_003) to recall the invasion stakes.',
          misconception: 'Students often believe the Martians are scared *because* the book is old or dusty, or because they cannot read English.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic covers the climax and resolution of the play where the Martians, led by',
                  options: ['This topic covers the climax and resolution of the play where the Martians, led by', 'The opening scene of a play that establishes the time (25th century), place (Museum of', 'Think-Tank is the pompous, self-proclaimed "Mighty Ruler of Mars" in Claire Boiko\'s play', 'The Martian invasion plan in "The Book That Saved the Earth" refers to Think-Tank\'s'],
                  hint: 'If stuck, re-watch/read Scene 1 (c10_engl_cbse_18_003) to recall the invasion stakes, then Scene 2.',
                  misconception: 'Students often believe the Martians are scared *because* the book is old or dusty, or because they cannot read English.' }
          ],
            remediations: { 'the-martians-are-scared-because': { steps: ['Re-read Scene 2 aloud, assigning roles (Think-Tank, Noodle, Oop, Omega).', 'Hearing the rhythm of the rhymes vs.', 'Think-Tank\'s pompous tone makes the disconnect audible.', 'Make a three-column table: Rhyme | Literal Meaning (Earth context) | Think-Tank\'s Interpretation (Martian context).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
