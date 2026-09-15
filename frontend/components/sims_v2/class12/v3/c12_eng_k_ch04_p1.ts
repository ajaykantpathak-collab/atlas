import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch04_p1: SimDef = {
    id: 'v3_c12_eng_k_ch04_p1',
    title: 'Tomorrow (Short Story) · Part 1/3',
    subtitle: 'He digs every day and plants nothing — hope as a life sentence',
    classLevel: 12, subject: 'eng_k', topic: 'Tomorrow (Short Story) · Part 1/3',
    chapters: ['c12_eng_k_ch04'],
    nodeIds: ['c12_eng_k_cbse_04_001', 'c12_eng_k_cbse_04_002', 'c12_eng_k_cbse_04_003', 'c12_eng_k_cbse_04_004', 'c12_eng_k_cbse_04_005', 'c12_eng_k_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Conrad scholar', intro: 'A retired captain waits for tomorrow — the day his boy comes home. The boy is home. Tomorrow never arrives.', goal: 'Read Tomorrow through Conrad\'s maritime realism, layered narration and the psychology of self-protective delusion.' },
    discovery: {
        question: 'Captain Hagberd digs his garden daily, plants nothing, sews a sailcloth suit on land and advertises for a son who\'s already back — spending the cash and leaving. Why can\'t the barber\'s teasing \'cure\' him?',
        options: ['The delusion is functional — his madness is \'equilibrium based upon self-esteem,\' the very structure that keeps him capable; teasing threatens the architecture, not the symptom', 'The barber isn\'t funny enough', 'Madness can\'t be cured at all', 'Hagberd doesn\'t hear him'],
        answer: 'The delusion is functional — his madness is \'equilibrium based upon self-esteem,\' the very structure that keeps him capable; teasing threatens the architecture, not the symptom',
        hook: 'Conrad the master mariner builds the story in layers — tap-room gossip, Hagberd\'s own voice, the son\'s mercenary return — each stripping his self-mythology. The sailcloth suit and the unplanted spade aren\'t props; they\'re a man suspended between the sea he fled and the tomorrow he invented.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" provides the historical, biographical, and literary framework necessary to interpret a text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk Colebrook\'s coast like a psychologist: peel the story-within-a-story layers, weigh Bessie\'s complicity against Harry\'s brutal clarity, and answer the question — when does hope become a prison?',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you’re about to watch a film set on a 19th-century English coast — you’d want to know if the director was a sailor, because that changes how you see.',
            decisions: [{ prompt: 'Who was Joseph Conrad, and what specific biographical fact explains the authentic maritime details in "Tomorrow"?', options: [
                { text: 'Joseph Conrad (1857–1924) was a Polish-born British novelist who went to sea at 17,', outcome: 'Joseph Conrad (1857–1924) was a Polish-born British novelist who went to sea at 17, became a master.' },
                { text: 'He was an English poet', outcome: 'Not quite — Students often think "context" means memorizing Conrad’s birth/death dates and listing his famous.', reveals: 'context-means-memorizing-conrad-s' },
                { text: 'context', outcome: 'Not quite — Students often think "context" means memorizing Conrad’s birth/death dates and listing his famous.', reveals: 'context-means-memorizing-conrad-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are watching a film where the opening scene shows an old man digging his garden every day, muttering "tomorrow." You wonder: why tomorrow?',
            decisions: [{ prompt: 'What is the primary narrative frame used in "Tomorrow" to convey Captain Hagberd\'s backstory?', options: [
                { text: 'The primary narrative frame is the barber\'s monologue in the tap-room of the New Inn,', outcome: 'The primary narrative frame is the barber\'s monologue in the tap-room of the New Inn, where.' },
                { text: 'the story is told chronologically from Hagberd\'s perspective', outcome: 'Not quite — Students often confuse *chronological order* (what happened first in story-time) with *narrative.', reveals: 'students-often-confuse-chronological-order' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are standing on the sea-wall at Colebrook on a damp autumn evening: the rain drums on a sailcloth suit, a blind man roars for his daughter, and.',
            decisions: [{ prompt: 'What is the primary physical setting of the story "Tomorrow," and what two structures dominate the immediate scene?', options: [
                { text: 'The primary physical setting is the little seaport of Colebrook, specifically the two', outcome: 'The primary physical setting is the little seaport of Colebrook, specifically the two adjoining.' },
                { text: 'a ship at sea', outcome: 'Not quite — Students often think "setting" is just the geographical location (Colebrook) and "atmosphere".', reveals: 'setting-is-just-the-geographical' },
                { text: 'London', outcome: 'Not quite — Students often think "setting" is just the geographical location (Colebrook) and "atmosphere".', reveals: 'setting-is-just-the-geographical' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you meet a neighbor who insists a long-lost relative will arrive "tomorrow" — every single day for years. How would you understand their mind?',
            decisions: [{ prompt: 'What is the single word Captain Hagberd repeats most often when referring to his son\'s return, and what does it signify about his.', options: [
                { text: 'The word is "tomorrow." It signifies that Hagberd lives in a perpetual future that never', outcome: 'The word is "tomorrow." It signifies that Hagberd lives in a perpetual future that never becomes.' },
                { text: 'next month', outcome: 'Not quite — Students often treat Captain Hagberd as a flat comic figure — "the crazy old man in the sailcloth.', reveals: 'students-often-treat-captain-hagberd' },
                { text: ') shows the student has not noticed the textual shift from', outcome: 'Not quite — Students often treat Captain Hagberd as a flat comic figure — "the crazy old man in the sailcloth.', reveals: 'students-often-treat-captain-hagberd' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re watching a play where the main actor stands centre stage talking to an empty chair — the supporting characters are the ones who either play.',
            decisions: [{ prompt: 'Identify the four main supporting characters in "Tomorrow" and state each one\'s primary relationship to Captain Hagberd.', options: [
                { text: 'The four main supporting characters are: (1) Miss Bessie Carvil', outcome: 'The four main supporting characters are: (1) Miss Bessie Carvil — Hagberd\'s tenant and sole.' },
                { text: 'the stranger at the gate as a main character, or omitting Harry', outcome: 'Not quite — Students treat supporting characters as "minor" and write separate mini-biographies for each.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'ve been waiting for a friend who promised to meet you "tomorrow" — but tomorrow never comes, and you keep preparing anyway, neglecting today.',
            decisions: [{ prompt: 'What is the difference between a theme and a plot summary in a short story?', options: [
                { text: 'A plot summary recounts *what happens* (events in sequence), while a theme states the', outcome: 'A plot summary recounts *what happens* (events in sequence), while a theme states the *central.' },
                { text: 'Captain Hagberd waits for his son', outcome: 'Not quite — Students often think the primary theme is "a father\'s love for his son" because Hagberd\'s actions.', reveals: 'the-primary-theme-is-a' },
                { text: 'a father\'s love for his son', outcome: 'Not quite — Students often think the primary theme is "a father\'s love for his son" because Hagberd\'s actions.', reveals: 'the-primary-theme-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A founder has rehearsed her \'big launch tomorrow\' for two years. When a real customer finally shows up today, she turns them away — \'the real launch is coming.\'',
            decisions: [{ prompt: 'What\'s Conrad\'s \'Tomorrow\' diagnosis?', options: [
                { text: 'The fantasy of tomorrow has eaten the present — Hagberd rejects his actual returned son because the real thing can\'t compete with the rehearsed dream; take the imperfect today or lose it.', outcome: 'Living for an imagined tomorrow makes real arrivals look like impostors — the story\'s warning is to test hope against what\'s actually here.' },
                { text: 'Keep waiting — hope is always worth protecting from premature reality.', outcome: 'Hope without an expiry date curdles into self-deception; Hagberd\'s \'tomorrow\' is a prison, not a promise.', reveals: 'hope-without-evidence' },
                { text: 'Kill all hope — expectation is delusion by definition.', outcome: 'The story condemns fantasy substituted for life, not hope itself; acting on the real chance is hope working properly.', reveals: 'hope-is-delusion' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read madness as structure, not chaos — and see how Conrad layers narrators so the truth arrives sideways.',
            decisions: [{ prompt: 'What comes next? Tomorrow (Short Story) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Tomorrow (Short Story) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_04_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" provides the historical.',
          hint: 'If stuck, re-read the barber’s monologue (pp. 40–42) and underline every detail that.',
          misconception: 'Students often think "context" means memorizing Conrad’s birth/death dates and listing his famous works (*Heart.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "story within a story" to "Tomorrow": identify the three narrative layers and explain what each reveals about Hagberd that he would not.', answer: 'Layer 1: The barber’s tap-room gossip (pp',
                  options: ['Layer 1: The barber’s tap-room gossip (pp', 'context', 'lists only plot events misses the *revelatory function* of each layer'],
                  hint: 'If stuck, re-read the barber’s monologue (pp. 40–42) and underline every detail that matches.',
                  misconception: 'Students often think "context" means memorizing Conrad’s birth/death dates and listing his famous works (*Heart of Darkness*, *Lord Jim*).' },
                { id: 'b', prompt: 'Analyze the symbolism of the "No. 1 sailcloth suit" and the "spade" in relation to Hagberd’s identity.', answer: 'The sailcloth suit',
                  options: ['The sailcloth suit', 'clothes and a tool', 'context'],
                  hint: 'If stuck, re-read the barber’s monologue (pp. 40–42) and underline every detail that matches.',
                  misconception: 'Students often think "context" means memorizing Conrad’s birth/death dates and listing his famous works (*Heart of Darkness*, *Lord Jim*).' }
          ],
            remediations: { 'context-means-memorizing-conrad-s': { steps: ['If a student cannot connect biography to text: (1) Re-read the "Stop and Think" box on p.', '41: "What brought Captain Hagberd to Colebrook?" — trace each detail (wife’s death, letter, advertising) to Conrad’s.', '(3) Re-attempt Diagnostic Question 3 using the table.', 'This builds the *habit of mapping* context → text, which is the examinable skill.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "context" means memorizing Conrad’s birth/death dates and listing his famous works (*Heart.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Bessie Carvil is the only sane person in the story." Use textual evidence to support or refute.', answer: 'Refute',
                  options: ['Refute', 'patient', 'context', 'calls her "kind" or "patient" confuses empathy with sanity'],
                  hint: 'If stuck, re-read the barber’s monologue (pp. 40–42) and underline every detail that matches.',
                  misconception: 'Students often think "context" means memorizing Conrad’s birth/death dates and listing his famous works (*Heart of Darkness*, *Lord Jim*).' },
                { id: 'b', prompt: 'Create a one-paragraph "prologue" from the perspective of Hagberd’s wife (who died before the story opens) that explains *why* she was "impatient" and how her.', answer: 'A strong answer will: (1) adopt her voice',
                  options: ['A strong answer will: (1) adopt her voice', 'context'],
                  hint: 'If stuck, re-read the barber’s monologue (pp. 40–42) and underline every detail that matches.',
                  misconception: 'Students often think "context" means memorizing Conrad’s birth/death dates and listing his famous works (*Heart of Darkness*, *Lord Jim*).' }
          ],
            remediations: { 'context-means-memorizing-conrad-s': { steps: ['If a student cannot connect biography to text: (1) Re-read the "Stop and Think" box on p.', '41: "What brought Captain Hagberd to Colebrook?" — trace each detail (wife’s death, letter, advertising) to Conrad’s.', '(3) Re-attempt Diagnostic Question 3 using the table.', 'This builds the *habit of mapping* context → text, which is the examinable skill.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_04_002', difficulty: 'standard',
          question: 'Plot and narrative structure refers to the organization of events in a story.',
          hint: 'Review "story vs. discourse" distinction in c11_eng_h_cbse_01_002 and practice mapping.',
          misconception: 'Students often confuse *chronological order* (what happened first in story-time) with *narrative order* (what the text.',
          parts: [
                { id: 'a', prompt: 'Compare the structural role of Bessie Carvil in the main plot with the role of the barber in the frame narrative.', answer: 'The barber is an external, unreliable narrator who frames Hagberd as a joke',
                  options: ['The barber is an external, unreliable narrator who frames Hagberd as a joke', 'listeners', 'treats both as mere "listeners" misses how narrative position (outside vs'],
                  hint: 'Review "story vs. discourse" distinction in c11_eng_h_cbse_01_002 and practice mapping a familiar.',
                  misconception: 'Students often confuse *chronological order* (what happened first in story-time) with *narrative order* (what the text presents first).' }
          ],
            remediations: { 'students-often-confuse-chronological-order': { steps: ['Have the student create two parallel timelines: one labeled "Story Chronology" (events in Harry/Hagberd\'s lives), one.', 'Ask them to mark where each timeline reveals new information about Hagberd\'s madness.', 'Use the barber\'s monologue (pages 40-42) as a case study: identify which facts are given, which are withheld, and how.', 'Re-attempt Diagnostic Question 3 with the timelines side by side.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_04_003', difficulty: 'standard',
          question: 'Setting in literature refers to the time, place, and social environment.',
          hint: 'Review the "Setting and Atmosphere" node from Class 11 Hornbill (c11_eng_h_cbse_01_003).',
          misconception: 'Students often think "setting" is just the geographical location (Colebrook) and "atmosphere" is just the weather.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting in literature refers to the time, place, and social environment in',
                  options: ['Setting in literature refers to the time, place, and social environment in', '"Before You Read: Context and Background" provides the historical, biographical, and', 'Plot and narrative structure refers to the organization of events in a story, including', 'Character analysis of the protagonist involves examining the central character\'s traits,'],
                  hint: 'Review the "Setting and Atmosphere" node from Class 11 Hornbill (c11_eng_h_cbse_01_003) and.',
                  misconception: 'Students often think "setting" is just the geographical location (Colebrook) and "atmosphere" is just the weather (rain, sea).' }
          ],
            remediations: { 'setting-is-just-the-geographical': { steps: ['If a student conflates setting with mere location, have them re-read the first three paragraphs of the story and.', 'Then ask: "Which of these objects *does* something to the characters?" Guide them to see the fence enables the winks.', 'This concrete mapping from object to effect rebuilds the setting-atmosphere link.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_04_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the central.',
          hint: 'If stuck on identifying indirect characterization, review the barber\'s monologue (pages.',
          misconception: 'Students often treat Captain Hagberd as a flat comic figure — "the crazy old man in the sailcloth suit" — and miss that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist involves examining the central character\'s traits,',
                  options: ['Character analysis of the protagonist involves examining the central character\'s traits,', '"Before You Read: Context and Background" provides the historical, biographical, and', 'Plot and narrative structure refers to the organization of events in a story, including', 'Setting in literature refers to the time, place, and social environment in'],
                  hint: 'If stuck on identifying indirect characterization, review the barber\'s monologue (pages 40-42) and.',
                  misconception: 'Students often treat Captain Hagberd as a flat comic figure — "the crazy old man in the sailcloth suit" — and miss that his madness is.' }
          ],
            remediations: { 'students-often-treat-captain-hagberd': { steps: ['Re-read the barber\'s monologue (pages 40-42) and the narrator\'s description of Hagberd\'s daily routine (pages 43-45).', 'Create a two-column table: "Ritual" | "Psychological Function." 3.', 'For each ritual (digging, advertising, winking, wearing sailcloth), write what anxiety it soothes.', 'Re-attempt Diagnostic Question 4 using this table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_04_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters examines how secondary figures.',
          hint: 'Review "Character Analysis: Protagonist" (node 004) — specifically the section.',
          misconception: 'Students treat supporting characters as "minor" and write separate mini-biographies for each (Bessie: tragic daughter.',
          parts: [
                { id: 'a', prompt: 'Identify the four main supporting characters in "Tomorrow" and state each one\'s primary relationship to Captain Hagberd.', answer: 'The four main supporting characters are: (1) Miss Bessie Carvil',
                  options: ['The four main supporting characters are: (1) Miss Bessie Carvil', 'the stranger at the gate as a main character, or omitting Harry'],
                  hint: 'Review "Character Analysis: Protagonist" (node 004) — specifically the section on Hagberd\'s.',
                  misconception: 'Students treat supporting characters as "minor" and write separate mini-biographies for each (Bessie: tragic daughter; Carvil: cruel.' },
                { id: 'b', prompt: 'Explain in your own words why Bessie Carvil never contradicts Captain Hagberd\'s insistence that Harry will return "tomorrow," despite knowing it is a delusion.', answer: 'Bessie withholds contradiction',
                  options: ['Bessie withholds contradiction', 'she is kind', 'she loves him'],
                  hint: 'Review "Character Analysis: Protagonist" (node 004) — specifically the section on Hagberd\'s.',
                  misconception: 'Students treat supporting characters as "minor" and write separate mini-biographies for each (Bessie: tragic daughter; Carvil: cruel.' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['If the student writes isolated character sketches: (1) Have them reread pages 43-44 (Bessie\'s first reactions) and.', '(2) Ask: "What would happen to Hagberd\'s \'tomorrow\' if Bessie *did* contradict him?', 'If Carvil *weren\'t* blind?', 'If Harry *had* stayed?" (3) Have them rewrite one paragraph showing two supporting characters in a single scene (e.g.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_04_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea — the.',
          hint: 'Review the difference between "What happens?" (plot) and "What does it mean?" (theme).',
          misconception: 'Students often think the primary theme is "a father\'s love for his son" because Hagberd\'s actions *look* loving.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Captain Hagberd\'s repeated phrase "He\'s coming home tomorrow" represents the story\'s primary theme.', answer: 'The phrase encapsulates the theme',
                  options: ['The phrase encapsulates the theme', 'he thinks his son will return', 'a father\'s love for his son', 'the primary theme is "a father\'s love for his son"'],
                  hint: 'Review the difference between "What happens?" (plot) and "What does it mean?" (theme) using.',
                  misconception: 'Students often think the primary theme is "a father\'s love for his son" because Hagberd\'s actions *look* loving.' },
                { id: 'b', prompt: 'Apply the concept of "theme as universal truth" to a new context: If "Tomorrow" were set in a modern Indian city with a father waiting for a son who went.', answer: 'The core theme — obsessive hope blinding a parent to reality — remains identical',
                  options: ['The core theme — obsessive hope blinding a parent to reality — remains identical', 'the theme would be completely different', 'a father\'s love for his son', 'the primary theme is "a father\'s love for his son"'],
                  hint: 'Review the difference between "What happens?" (plot) and "What does it mean?" (theme) using.',
                  misconception: 'Students often think the primary theme is "a father\'s love for his son" because Hagberd\'s actions *look* loving.' },
                { id: 'c', prompt: 'Analyze how Conrad uses the contrast between Captain Hagberd and Bessie Carvil to deepen the primary theme. Provide two specific textual contrasts.', answer: 'Contrast 1: Hagberd lives in a fantasized future ("tomorrow")',
                  options: ['Contrast 1: Hagberd lives in a fantasized future ("tomorrow")', 'a father\'s love for his son', 'only lists character traits without linking to theme misses the analytical step', 'the primary theme is "a father\'s love for his son"'],
                  hint: 'Review the difference between "What happens?" (plot) and "What does it mean?" (theme) using.',
                  misconception: 'Students often think the primary theme is "a father\'s love for his son" because Hagberd\'s actions *look* loving.' }
          ],
            remediations: { 'the-primary-theme-is-a': { steps: ['If a student insists the theme is "parental love", guide them through this 3-step check: (1) List three things Hagberd.', '(2) For each, ask: "Does Harry want this?', 'Does Hagberd *ask* Harry?" (3) Note that Hagberd *throws a shovel at Harry* when he actually arrives.', 'The pattern reveals the theme is control, not love.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
