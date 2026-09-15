import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch11_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch11_p1',
    title: 'Q.kh\'oj ukFk js.kq · Part 1/3',
    subtitle: 'The blind man saw the truth; the sighted chose the well',
    classLevel: 12, subject: 'hin_ar', topic: 'Q.kh\'oj ukFk js.kq · Part 1/3',
    chapters: ['c12_hin_ar_ch11'],
    nodeIds: ['c12_hin_ar_cbse_11_001', 'c12_hin_ar_cbse_11_002', 'c12_hin_ar_cbse_11_003', 'c12_hin_ar_cbse_11_004', 'c12_hin_ar_cbse_11_005', 'c12_hin_ar_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Psychoanalytic fiction reader', intro: 'A beggar who cannot see meets a society that refuses to. The story asks whose blindness is real.', goal: 'Read Bazar Darshan through psychoanalytic realism — blindness as epistemological and political condition.' },
    discovery: {
        question: 'A blind beggar is cheated because he can\'t see — but the story insists the real blindness belongs to everyone else. Blindness as what, then?',
        options: ['Wilful ignorance — the \'familiar well\' of habit and prejudice; society sees numbers and utility, never faces', 'Poor eyesight only', 'Fate\'s cruelty', 'A medical condition'],
        answer: 'Wilful ignorance — the \'familiar well\' of habit and prejudice; society sees numbers and utility, never faces',
        hook: 'This is the psychoanalytic turn in Hindi fiction — after Premchand\'s social realism came Jainendra\'s probe of the unconscious, where blindness is imposed by power and kept by utilitarian logic. The beggar isn\'t a pitiable character; he\'s the site where ideology does its violence.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'The "Before You Read: Context and Background" section prepares students to engage with the chapter "cktkj n\'kZu" by tSusanz dekj by providing essential biographical, historical, and thematic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Look past the beggar\'s eyes: decode the \'familiar well\' that traps the sighted, test utilitarian arguments against lived faces, and separate spiritual darkness from manufactured blindness.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you walk into a room and immediately feel tension — perhaps the lights are dim, people speak in whispers, and furniture is arranged stiffly.',
            decisions: [{ prompt: 'What are the three components of setting in a narrative, and which component is most dominant in establishing the initial atmosphere.', options: [
                { text: 'The three components are time (temporal), place (physical), and social environment', outcome: 'The three components are time (temporal), place (physical), and social environment.' },
                { text: 'setting = where and when', outcome: 'Not quite — Students often think "setting = where and when" and "atmosphere = mood", treating them as separate.', reveals: 'setting-where-and-when-and' },
                { text: 'atmosphere = mood', outcome: 'Not quite — Students often think "setting = where and when" and "atmosphere = mood", treating them as separate.', reveals: 'setting-where-and-when-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re watching a play where the main actor (कहानी) stands alone on stage — but every time they speak, someone from the wings shouts a line that.',
            decisions: [{ prompt: 'Name the three major supporting characters in "कहानी का पूर्ण" and state one distinct narrative function each serves in relation to the.', options: [
                { text: 'Correct answer: (1) फेका', outcome: 'Correct answer: (1) फेका — embodies practical labor and material reality, forcing कहानी to confront.' },
                { text: 'फेका एक स्त्री है', outcome: 'Not quite — Students treat supporting characters as "less important versions of the protagonist" — listing.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you catch someone stealing your lunch — but then realize they\'ve also stolen your trust, your peace of mind, and your willingness to share.',
            decisions: [{ prompt: 'What is the literal meaning of the phrase "चोर का चोर" as used in the story\'s concluding section, and which character speaks it?', options: [
                { text: 'The phrase "चोर का चोर" literally means "thief of the thief" and is spoken by the', outcome: 'The phrase "चोर का चोर" literally means "thief of the thief" and is spoken by the narrator (the.' },
                { text: 'it means the police catch the thief', outcome: 'Not quite — Students treat "चोरी" in this story only as the peasant woman\'s act of taking ghee.', reveals: 'students-treat-in-this-story' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate pays a \'career guru\' who diagnoses his low marks as a family curse and prescribes an absurd regime — copying his ancestors\' names 500 times. He complied for a month, then quietly stopped going. He\'s still failing.',
            decisions: [{ prompt: 'What does Nirala\'s \'खुजली उखाड़ जासा\' read in this episode?', options: [
                { text: 'The story ends where it began — the patient flees still itching; walking away from a bogus authority returns you to the problem untouched. The satire is that individual escape doesn\'t cure a systemic absurdity — question the prescription, don\'t just flee the clinic.', outcome: 'The circular structure — opening and closing on the itch — exists to show the quest was futile; his problem survives the guru because it was never the itch being treated.' },
                { text: 'At least he escaped before worse harm — quietly quitting was the smart move.', outcome: 'Escape isn\'t the story\'s victory — the patient who runs is still scratching on the last page; leaving the fraud unexamined leaves both the itch and the marketplace of absurd cures intact.', reveals: 'escape-equals-solution' },
                { text: 'The guru\'s method was sound in principle — he just needed to persist longer for results.', outcome: 'That\'s the blind faith in authority the story skewers: the diagnosis was theatrical nonsense from the start, and more obedience only deepens the farce.', reveals: 'persist-with-absurdity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read blindness as a social instrument — and catch the moment a story stops being about a beggar and starts being about us.',
            decisions: [{ prompt: 'What comes next? Q.kh\'oj ukFk js.kq · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Q.kh\'oj ukFk js.kq · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_001', difficulty: 'standard',
          question: 'The "Before You Read: Context and Background" section prepares students.',
          hint: 'If stuck on "psychoanalytic story" definition: Re-read c11_hin_ar_cbse_11_002 (Plot.',
          misconception: '**Misconception:** "Before You Read is just author bio + difficult word meanings — I can skip it and understand the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The "Before You Read: Context and Background" section prepares students to engage with',
                  options: ['The "Before You Read: Context and Background" section prepares students to engage with', 'Plot and narrative structure refers to the organized sequence of events and the framework', 'Setting refers to the time, place, and social environment in', 'The protagonist in "करुणा का नायक" is the first-person narrator (the author himself) who'],
                  hint: 'If stuck on "psychoanalytic story" definition: Re-read c11_hin_ar_cbse_11_002 (Plot of R;kxi=k) and.',
                  misconception: '**Misconception:** "Before You Read is just author bio + difficult word meanings — I can skip it and understand the story directly." **Why.' }
          ],
            remediations: { 'misconception-before-you-read-is': { steps: ['If a student cannot articulate the three mastery criteria: 1.', '**Revisit** c11_hin_ar_cbse_11_001 (Class 11 Chapter 11 Before You Read) — compare how *that* pre-reading framed.', '**Re-do** Diagnostic Questions 2 & 4 orally with a peer — force verbalization of "ipsZ¯”kx ikoj" and "vuhfr\'kkL=k".', '**Re-diagnostic:** Write a 50-word definition of "ck”kkj" *as used by tSusanz dekj* (not dictionary meaning).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Before You Read is just author bio + difficult word meanings — I can skip it and understand the.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The pre-reading section over-intellectualizes a simple story about a blind beggar.', answer: '**Correct answer:** Refute',
                  options: ['**Correct answer:** Refute', 'background info'],
                  hint: 'If stuck on "psychoanalytic story" definition: Re-read c11_hin_ar_cbse_11_002 (Plot of R;kxi=k) and.',
                  misconception: '**Misconception:** "Before You Read is just author bio + difficult word meanings — I can skip it and understand the story directly." **Why.' }
          ],
            remediations: { 'misconception-before-you-read-is': { steps: ['If a student cannot articulate the three mastery criteria: 1.', '**Revisit** c11_hin_ar_cbse_11_001 (Class 11 Chapter 11 Before You Read) — compare how *that* pre-reading framed.', '**Re-do** Diagnostic Questions 2 & 4 orally with a peer — force verbalization of "ipsZ¯”kx ikoj" and "vuhfr\'kkL=k".', '**Re-diagnostic:** Write a 50-word definition of "ck”kkj" *as used by tSusanz dekj* (not dictionary meaning).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_002', difficulty: 'standard',
          question: 'Plot and narrative structure refers to the organized sequence of events and the.',
          hint: 'If stuck, review c11_hin_ar_cbse_11_002 (Plot and Narrative Structure) and practice.',
          misconception: 'Students often treat "plot" as a mere summary of "what happens" and "narrative structure" as synonymous with "sequence.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and narrative structure refers to the organized sequence of events and the framework',
                  options: ['Plot and narrative structure refers to the organized sequence of events and the framework', 'The "Before You Read: Context and Background" section prepares students to engage with', 'Setting refers to the time, place, and social environment in', 'The protagonist in "करुणा का नायक" is the first-person narrator (the author himself) who'],
                  hint: 'If stuck, review c11_hin_ar_cbse_11_002 (Plot and Narrative Structure) and practice mapping.',
                  misconception: 'Students often treat "plot" as a mere summary of "what happens" and "narrative structure" as synonymous with "sequence of events." They.' }
          ],
            remediations: { 'students-often-treat-plot-as': { steps: ['Re-read the story solely to mark structural signposts: underline the opening itch description, circle the diagnosis.', 'Revisit c11_hin_ar_cbse_11_002 (Plot and Narrative Structure) and draw Freytag\'s pyramid for a familiar story (e.g.', 'Write a 5-sentence structural summary (not plot summary) using terms: exposition, inciting incident, rising action.', 'Compare with a peer: does your summary explain *how* the structure serves satire?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a narrative.',
          hint: 'If stuck on separating setting from atmosphere, revisit c11_hin_ar_cbse_11_003 worked.',
          misconception: 'Students often think "setting = where and when" and "atmosphere = mood", treating them as separate labels to identify.',
          parts: [
                { id: 'a', prompt: 'Analyze how the contrast between the village setting (with its caste rules) and the river setting (where Hkxr th bathes freely) structures the story\'s.', answer: 'Contrast 1: The well is public, monitored, rule-bound ("ck”kkj dk tknw"',
                  options: ['Contrast 1: The well is public, monitored, rule-bound ("ck”kkj dk tknw"', 'setting = where and when', 'atmosphere = mood'],
                  hint: 'If stuck on separating setting from atmosphere, revisit c11_hin_ar_cbse_11_003 worked examples.',
                  misconception: 'Students often think "setting = where and when" and "atmosphere = mood", treating them as separate labels to identify.' }
          ],
            remediations: { 'setting-where-and-when-and': { steps: ['If a student cannot distinguish setting from atmosphere or see their interaction: 1) Have them draw a map of the.', '2) Ask: "If the well had no thorns and a wide path, how would the opening scene\'s atmosphere change?" 3) Re-read the.', '4) Complete diagnostic question 4 again with the map as reference.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_004', difficulty: 'standard',
          question: 'The protagonist in "करुणा का नायक" is the first-person narrator (the author.',
          hint: 'Review c11_hin_ar_cbse_11_004 for first-person narrative analysis and practice PEEL on.',
          misconception: 'Students often identify the flower-selling woman as the protagonist because she articulates the story\'s "truth" about.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the narrator initially refuses to give money to the beggar woman.', answer: 'The narrator refuses',
                  options: ['The narrator refuses', 'he was heartless'],
                  hint: 'Review c11_hin_ar_cbse_11_004 for first-person narrative analysis and practice PEEL on a single.',
                  misconception: 'Students often identify the flower-selling woman as the protagonist because she articulates the story\'s "truth" about compassion.' }
          ],
            remediations: { 'students-often-identify-the-flower': { steps: ['If student misidentifies protagonist: (1) Ask: "Count every \'मैं\' in the first paragraph – who speaks?" (2) Have them.', '(3) Re-read the final paragraph: whose walking away concludes the story?', '(4) Re-attempt Diagnostic Q1 with these textual anchors.', 'If confusion persists, review Class 11 node c11_hin_ar_cbse_11_004 for first-person narrative identification.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_005', difficulty: 'standard',
          question: 'Supporting characters (सहायक पात्र) are secondary figures in a narrative who.',
          hint: 'If stuck on "function vs. description", revisit the फेका-कहानी dialogue (p.78-79) and.',
          misconception: 'Students treat supporting characters as "less important versions of the protagonist" — listing their traits (age.',
          parts: [
                { id: 'a', prompt: 'Name the three major supporting characters in "कहानी का पूर्ण" and state one distinct narrative function each serves in relation to the protagonist कहानी.', answer: 'Correct answer: (1) फेका',
                  options: ['Correct answer: (1) फेका', 'फेका एक स्त्री है'],
                  hint: 'If stuck on "function vs. description", revisit the फेका-कहानी dialogue (p.78-79) and ask: "If फेका.',
                  misconception: 'Students treat supporting characters as "less important versions of the protagonist" — listing their traits (age, gender, occupation).' },
                { id: 'b', prompt: 'Apply the "foil" concept to analyze how हखर ठ\'s "ईसक" (love/past) and इस्क\'s "इप्सट" (innocent questioning) function as opposing mirrors to कहानी\'s "अंत".', answer: '**Step 1 (Point):** हखर ठ and इस्क serve as dual foils',
                  options: ['**Step 1 (Point):** हखर ठ and इस्क serve as dual foils', 'similar because both talk to कहानी', 'analyze'],
                  hint: 'If stuck on "function vs. description", revisit the फेका-कहानी dialogue (p.78-79) and ask: "If फेका.',
                  misconception: 'Students treat supporting characters as "less important versions of the protagonist" — listing their traits (age, gender, occupation).' },
                { id: 'c', prompt: 'Compare the narrative function of the minor character "विप्र" (the priest who appears briefly on page 83) with that of फेका.', answer: 'Correct answer: फेका represents the *material/embodied* response',
                  options: ['Correct answer: फेका represents the *material/embodied* response', 'both try to help कहानी'],
                  hint: 'If stuck on "function vs. description", revisit the फेका-कहानी dialogue (p.78-79) and ask: "If फेका.',
                  misconception: 'Students treat supporting characters as "less important versions of the protagonist" — listing their traits (age, gender, occupation).' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['If the student cannot distinguish description from function: 1.', 'Give them a 2-column table: Column A = "What the character *is/does*" (description), Column B = "What the character.', 'Have them re-read the फेका-कहानी dialogue (p.78-79) and fill 3 rows: e.g., A: "फेका लकड़ी काटती है" → B: "श्रम की.', 'Assign a micro-task: "Rewrite your previous answer replacing every trait-sentence with a function-sentence using the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_006', difficulty: 'standard',
          question: 'The primary theme of "cktkj n\'kZu" is the exploration of theft (चोरी) as.',
          hint: 'If stuck, revisit c11_hin_ar_cbse_11_006 (Theme: Primary Theme and Message for "नमक का.',
          misconception: 'Students treat "चोरी" in this story only as the peasant woman\'s act of taking ghee.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of "cktkj n\'kZu" is the exploration of theft (चोरी) as a universal',
                  options: ['The primary theme of "cktkj n\'kZu" is the exploration of theft (चोरी) as a universal', 'The "Before You Read: Context and Background" section prepares students to engage with', 'Plot and narrative structure refers to the organized sequence of events and the framework', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_11_006 (Theme: Primary Theme and Message for "नमक का दरोगा") and.',
                  misconception: 'Students treat "चोरी" in this story only as the peasant woman\'s act of taking ghee.' }
          ],
            remediations: { 'students-treat-in-this-story': { steps: ['If a student cannot move beyond the ghee-theft anecdote: (1) Have them re-read only the woman\'s monologue starting.', '(2) Ask them to list every abstract noun she associates with theft: तनाव, बैचैनी, नींद, चैन, आत्मा, विश्वास.', '(3) Have them match each to a character in the story.', '(4) Re-attempt Diagnostic Q2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
