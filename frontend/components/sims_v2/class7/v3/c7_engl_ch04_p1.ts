import type { SimDef } from '../../engine/types';

/** v3 generated — c7_engl_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_engl_ch04_p1: SimDef = {
    id: 'v3_c7_engl_ch04_p1',
    title: 'Travel and Adventure: The Tunnel · Part 1/3',
    subtitle: 'This node covers the descriptive elements and symbolic significance of the jungle, the.',
    classLevel: 7, subject: 'engl', topic: 'Travel and Adventure: The Tunnel · Part 1/3',
    chapters: ['c7_engl_ch04'],
    nodeIds: ['c7_engl_ch04_001', 'c7_engl_ch04_002', 'c7_engl_ch04_003', 'c7_engl_ch04_004', 'c7_engl_ch04_005', 'c7_engl_ch04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine walking down a quiet railway track cutting through a thick forest in the hills of Uttarakhand as the.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A character steps off a sunlit railway embankment into the mouth of a brick tunnel — and in one step the birdcalls fade to hollow echoes and the heat drops away. What did the author just do to the mood?',
        options: ['Flipped it — the contrast between bright living jungle and dark silent tunnel turns open warmth into tense suspense', 'Nothing — a tunnel is just a shorter road', 'Made it cheerful — shade is always relaxing', 'Confused it — good authors avoid strong contrasts'],
        answer: 'Flipped it — the contrast between bright living jungle and dark silent tunnel turns open warmth into tense suspense',
        hook: 'Setting is an experience built from senses, not a label on a map. Here three elements do the work — the wild jungle, the human-made railway slicing through it, and a tunnel that swallows light and sound like a quiet antagonist.',
    },
    teaching: [
        { title: 'Story Setting: The Jungle, Railway and the Tunnel', text: 'The setting of a story encompasses the physical landscape, time period, and social environment—specifically, the contrasting trio of the wild jungle, the man-made railway, and the dark tunnel—which.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_engl_ch04_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Walk the three settings in order — jungle, railway, tunnel — and collect one sight, one sound, and one feeling from each to show how the mood darkens with every step.',
        labels: ['Story Setting: The Jungle,', 'Character Analysis: Suraj', 'Plot: Suraj\'s Adventure at', 'Theme: Adventure and Exploration', 'Atmosphere: Heat, Silence', 'The Tunnel as'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_engl_ch04_001', title: 'Story Setting: The Jungle, Railway and the Tunnel',
          caseStudy: { intro: 'Imagine walking down a quiet railway track cutting through a thick forest in the hills of Uttarakhand as the afternoon heat beats down.',
            decisions: [{ prompt: 'What are the three primary physical elements that make up the setting in the story "The Tunnel"?', options: [
                { text: 'The three primary physical elements are the dense jungle, the railway line, and the dark', outcome: 'The three primary physical elements are the dense jungle, the railway line, and the dark tunnel.' },
                { text: 'setting', outcome: 'Not quite — Students often believe that the "setting" is merely a background list of where a story happens.', reveals: 'the-setting-is-merely-a' },
                { text: 'characters or plot events', outcome: 'Not quite — Students often believe that the "setting" is merely a background list of where a story happens.', reveals: 'the-setting-is-merely-a' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch04_002', title: 'Character Analysis: Suraj and His Love for Trains',
          caseStudy: { intro: 'Have you ever stood by a railway track and felt the earth shake before a massive express train roars past?',
            decisions: [{ prompt: 'What is Suraj\'s primary hobby or fascination introduced at the beginning of the story "The Tunnel"?', options: [
                { text: 'Suraj is fascinated by trains and loves watching them pass through the lonely railway', outcome: 'Suraj is fascinated by trains and loves watching them pass through the lonely railway cutting near.' },
                { text: 'he collects stamps or likes catching butterflies', outcome: 'Not quite — Students often confuse a character\'s physical actions with their underlying motivations, assuming.', reveals: 'students-often-confuse-a-character' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch04_003', title: 'Plot: Suraj\'s Adventure at the Tunnel',
          caseStudy: { intro: 'Imagine you are walking down a lonely railway track in the scorching Indian sun, approaching a dark, gaping tunnel that swallows all light—what would you feel.',
            decisions: [{ prompt: 'What is the very first stage of a story\'s plot structure called, where the setting and main character are introduced?', options: [
                { text: 'exposition', outcome: 'The correct answer is exposition. A student who answers "climax" or "resolution" confuses the.' },
                { text: 'climax', outcome: 'Not quite — Students often believe that "plot" is simply a random summary of everything that happens in a story.', reveals: 'plot-is-simply-a-random' },
                { text: 'resolution', outcome: 'Not quite — Students often believe that "plot" is simply a random summary of everything that happens in a story.', reveals: 'plot-is-simply-a-random' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch04_004', title: 'Theme: Adventure and Exploration of the Unknown',
          caseStudy: { intro: 'Have you ever walked down a dimly lit street or entered an empty, locked room at your grandparents\' house, feeling both terrified and intensely curious about.',
            decisions: [{ prompt: 'What is the primary literary definition of "exploration of the unknown" in an adventure narrative?', options: [
                { text: 'The exploration of the unknown refers to a character venturing into unfamiliar,', outcome: 'The exploration of the unknown refers to a character venturing into unfamiliar, mysterious.' },
                { text: 'adventure and exploration of the unknown', outcome: 'Not quite — Students often confuse "adventure and exploration of the unknown" with mere physical movement.', reveals: 'students-often-confuse-adventure-and' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch04_005', title: 'Atmosphere: Heat, Silence and Anticipation in the Jungle',
          caseStudy: { intro: 'Imagine walking home under the scorching Delhi afternoon sun where not a single leaf stirs and even the birds have stopped chirping, making you feel that.',
            decisions: [{ prompt: 'What sensory detail is most commonly used by authors to show that the jungle is waiting in breathless anticipation?', options: [
                { text: 'Complete silence or a sudden lack of animal sounds', outcome: 'Complete silence or a sudden lack of animal sounds. If a student answers with "loud noises,".' },
                { text: 'filler', outcome: 'Not quite — Students often believe that descriptions of weather, like heat or silence, are just "filler".', reveals: 'descriptions-of-weather' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing an adventure scene for the school magazine, a student sets her hero in a thick jungle. Her editor asks which element is the true \'frontier\' — the wild jungle, the open railway track, or the dark tunnel mouth ahead.',
            decisions: [{ prompt: 'Which element should carry the sense of stepping into the unknown?', options: [
                { text: 'The tunnel — the jungle is wild but sunlit and knowable, the track is a thin man-made line through it, and the tunnel is where the human path disappears into darkness: a brick-lined doorway into what cannot be seen. That juxtaposition — civilization\'s line ending at an unlit hole in the hill — is what turns the walk into an adventure\'s frontier.', outcome: 'The chapter\'s atmosphere is built exactly this way: isolation and heat in the jungle, then the tunnel mouth concentrating all the uncertainty into one dark opening.' },
                { text: 'The jungle is the real frontier — wildness always beats anything man-made for danger.', outcome: 'The jungle frames the scene but the tunnel is the threshold — the story places the unknown specifically inside the dark passage, not in the visible wild around it.', reveals: 'wilderness-is-frontier' },
                { text: 'The railway track is the frontier — it is the boundary line itself.', outcome: 'The track leads to the frontier but is not it — the open line is known and lit; the tunnel\'s hidden interior is where anticipation actually lives.', reveals: 'the-path-is-frontier' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch04_006', title: 'The bigger picture',
          caseStudy: { intro: 'A great setting does not sit behind the story — it presses on the characters. Civilization and wilderness meet at the tunnel mouth, and the tunnel wins the mood.',
            decisions: [{ prompt: 'What comes next? Travel and Adventure: The Tunnel · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Travel and Adventure: The Tunnel · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_engl_ch04_001', difficulty: 'standard',
          question: 'The setting of a story encompasses the physical landscape, time period, and.',
          hint: 'Review c6_english_u4_031 to practice identifying where a scene takes place before.',
          misconception: 'Students often believe that the "setting" is merely a background list of where a story happens (like naming a state.',
          parts: [
                { id: 'a', prompt: 'A character steps off the bright railway embankment into the shadowed entrance of the tunnel.', answer: 'Steps to answer: (1) Identify the transition from light to dark and hot to cool',
                  options: ['Steps to answer: (1) Identify the transition from light to dark and hot to cool', 'setting'],
                  hint: 'Review c6_english_u4_031 to practice identifying where a scene takes place before analyzing its.',
                  misconception: 'Students often believe that the "setting" is merely a background list of where a story happens (like naming a state or a forest) rather.' }
          ],
            remediations: { 'the-setting-is-merely-a': { steps: ['To fix this, guide the student step-by-step through the text: (1) Ask them to close their eyes and imagine standing.', '(2) Ask them what happens to the sound and temperature the exact second they step into the tunnel.', '(3) Explain that setting is an experience made of sights, sounds, and feelings, not just a map location.', '(4) Have them rewrite one sentence connecting a physical detail of the tunnel to a feeling of mystery or suspense.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch04_002', difficulty: 'standard',
          question: 'From \'English chapter c7_engl_ch04\': the skill or concept this node teaches.',
          hint: 'Review how to link a character\'s physical action to an inner feeling using simple.',
          misconception: 'Students often confuse a character\'s physical actions with their underlying motivations, assuming that because Suraj.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'From \'English chapter c7_engl_ch04\': the skill or concept this node teaches, applied to',
                  options: ['From \'English chapter c7_engl_ch04\': the skill or concept this node teaches, applied to', 'The setting of a story encompasses the physical landscape, time period, and social', 'Plot is the sequence of events and actions that make up a story, structured around a', 'The theme of adventure and exploration of the unknown in literature explores a'],
                  hint: 'Review how to link a character\'s physical action to an inner feeling using simple "because".',
                  misconception: 'Students often confuse a character\'s physical actions with their underlying motivations, assuming that because Suraj simply stands near the.' }
          ],
            remediations: { 'students-often-confuse-a-character': { steps: ['If a student struggles to analyze Suraj\'s motivation, guide them step-by-step using these prompts: (1) Ask the student.', '(2) Ask them what Suraj feels when he hears the whistle.', '(3) Explain that actions driven by strong feelings in hard conditions show passion, not accidental presence.', 'Have them rewrite their character sentence starting with: "Suraj is motivated by..."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch04_003', difficulty: 'standard',
          question: 'Plot is the sequence of events and actions that make up a story, structured.',
          hint: 'Review the basic plot pyramid (Beginning, Middle, Climax, End) before attempting.',
          misconception: 'Students often believe that "plot" is simply a random summary of everything that happens in a story in the exact order.',
          parts: [
                { id: 'a', prompt: 'What is the very first stage of a story\'s plot structure called, where the setting and main character are introduced?', answer: 'exposition',
                  options: ['exposition', 'climax', 'resolution'],
                  hint: 'Review the basic plot pyramid (Beginning, Middle, Climax, End) before attempting to analyze.',
                  misconception: 'Students often believe that "plot" is simply a random summary of everything that happens in a story in the exact order it is told, without.' }
          ],
            remediations: { 'plot-is-simply-a-random': { steps: ['When a student struggles to map the plot, take them back to the text and ask them to find the exact moment their heart.', 'Draw a simple mountain diagram on paper and help them label the bottom-left as the start (Suraj walking), the peak.', 'Ask: "What changed inside Suraj between the bottom of the mountain and the peak?"'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch04_004', difficulty: 'standard',
          question: 'The theme of adventure and exploration of the unknown in literature explores.',
          hint: 'Review Class 6 concepts on character courage and setting description before analyzing.',
          misconception: 'Students often confuse "adventure and exploration of the unknown" with mere physical movement or travel, such.',
          parts: [
                { id: 'a', prompt: 'What is the primary literary definition of "exploration of the unknown" in an adventure narrative?', answer: 'The exploration of the unknown refers to a character venturing into unfamiliar,',
                  options: ['The exploration of the unknown refers to a character venturing into unfamiliar,', 'adventure and exploration of the unknown'],
                  hint: 'Review Class 6 concepts on character courage and setting description before analyzing abstract.',
                  misconception: 'Students often confuse "adventure and exploration of the unknown" with mere physical movement or travel, such as walking from one village.' },
                { id: 'b', prompt: 'Apply the theme of adventure to a new context: Imagine a young girl in a village who decides to explore an overgrown, forgotten path behind her school.', answer: '(1) Identify the unfamiliar element (the overgrown path)',
                  options: ['(1) Identify the unfamiliar element (the overgrown path)', 'adventure and exploration of the unknown'],
                  hint: 'Review Class 6 concepts on character courage and setting description before analyzing abstract.',
                  misconception: 'Students often confuse "adventure and exploration of the unknown" with mere physical movement or travel, such as walking from one village.' }
          ],
            remediations: { 'students-often-confuse-adventure-and': { steps: ['If a student struggles with this, guide them by asking: "Is the character just walking down a normal paved road, or are.', 'Explain that adventure requires stepping beyond the familiar into the mysterious.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "adventure and exploration of the unknown" with mere physical movement or travel, such.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "An adventure story only needs a dangerous setting; the character\'s internal feelings of fear and curiosity do not matter." Is this.', answer: 'The statement is invalid',
                  options: ['The statement is invalid', 'adventure and exploration of the unknown'],
                  hint: 'Review Class 6 concepts on character courage and setting description before analyzing abstract.',
                  misconception: 'Students often confuse "adventure and exploration of the unknown" with mere physical movement or travel, such as walking from one village.' }
          ],
            remediations: { 'students-often-confuse-adventure-and': { steps: ['If a student struggles with this, guide them by asking: "Is the character just walking down a normal paved road, or are.', 'Explain that adventure requires stepping beyond the familiar into the mysterious.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch04_005', difficulty: 'standard',
          question: 'The atmospheric creation of intense heat, profound silence, and heavy.',
          hint: 'Review c7_engl_ch04_001 to understand the basic elements of the jungle and railway.',
          misconception: 'Students often believe that descriptions of weather, like heat or silence, are just "filler" information meant.',
          parts: [
                { id: 'a', prompt: 'What sensory detail is most commonly used by authors to show that the jungle is waiting in breathless anticipation?', answer: 'Complete silence or a sudden lack of animal sounds',
                  options: ['Complete silence or a sudden lack of animal sounds', 'filler'],
                  hint: 'Review c7_engl_ch04_001 to understand the basic elements of the jungle and railway setting before.',
                  misconception: 'Students often believe that descriptions of weather, like heat or silence, are just "filler" information meant to describe the scenery.' },
                { id: 'b', prompt: 'Read this sentence: "The afternoon sun baked the railway tracks, and not a single monkey chattered in the trees." What mood does this sentence create?', answer: 'An oppressive, tense, and expectant mood',
                  options: ['An oppressive, tense, and expectant mood', 'a relaxing holiday mood', 'filler'],
                  hint: 'Review c7_engl_ch04_001 to understand the basic elements of the jungle and railway setting before.',
                  misconception: 'Students often believe that descriptions of weather, like heat or silence, are just "filler" information meant to describe the scenery.' },
                { id: 'c', prompt: 'In a jungle scene, why would an author describe the air as "thick and shimmering with heat" right before a train approaches?', answer: 'Identify the physical description (heat, shimmering air)',
                  options: ['Identify the physical description (heat, shimmering air)', 'filler'],
                  hint: 'Review c7_engl_ch04_001 to understand the basic elements of the jungle and railway setting before.',
                  misconception: 'Students often believe that descriptions of weather, like heat or silence, are just "filler" information meant to describe the scenery.' }
          ],
            remediations: { 'descriptions-of-weather': { steps: ['Direct the student to reread the sentence and underline every word related to temperature, sound, or movement.', 'Ask them: "If you were standing in this exact spot with zero wind and absolute quiet, would you feel relaxed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch04_006', difficulty: 'standard',
          question: 'In literary analysis, a symbol is an object, person, or situation that.',
          hint: 'Review c7_engl_ch04_005 to practice identifying how an author builds atmosphere before.',
          misconception: 'Students often treat setting descriptions (like a dark tunnel, a ruined fort, or a dense jungle) as literal background.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In literary analysis, a symbol is an object, person, or situation that represents a',
                  options: ['In literary analysis, a symbol is an object, person, or situation that represents a', 'The setting of a story encompasses the physical landscape, time period, and social', 'From \'English chapter c7_engl_ch04\': the skill or concept this node teaches, applied to', 'Plot is the sequence of events and actions that make up a story, structured around a'],
                  hint: 'Review c7_engl_ch04_005 to practice identifying how an author builds atmosphere before attempting.',
                  misconception: 'Students often treat setting descriptions (like a dark tunnel, a ruined fort, or a dense jungle) as literal background scenery rather than.' }
          ],
            remediations: { 'students-often-treat-setting-descriptions': { steps: ['To fix this, guide the student to ask: "If this dark place was a feeling inside the character\'s mind, what feeling.', 'Show them that in literature, physical geography always mirrors emotional geography.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
