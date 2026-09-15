import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch14_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch14_p1',
    title: 'eerk dkfy;k · Part 1/3',
    subtitle: 'The flag was born in a struggle — then the nation stopped looking',
    classLevel: 12, subject: 'hin_ar', topic: 'eerk dkfy;k · Part 1/3',
    chapters: ['c12_hin_ar_ch14'],
    nodeIds: ['c12_hin_ar_cbse_14_001', 'c12_hin_ar_cbse_14_002', 'c12_hin_ar_cbse_14_003', 'c12_hin_ar_cbse_14_004', 'c12_hin_ar_cbse_14_005', 'c12_hin_ar_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Political-essay reader', intro: 'A scholar-activist watches the tricolor fade on a government school roof and reads a whole nation\'s fatigue in it.', goal: 'Read Jhande ki Phool/flag essay as a diagnosis of national morality — symbol versus substance.' },
    discovery: {
        question: 'A poet paints the tricolor with reverence — years later it\'s a torn rag on a rusted pole, used for mundane purposes. Why does the author call the flag a \'living being\'?',
        options: ['Because it has a life-cycle — born in the freedom struggle, aged by neglect; its physical condition is the nation\'s moral condition', 'Flags wear out naturally', 'Poetic exaggeration', 'It moves in wind'],
        answer: 'Because it has a life-cycle — born in the freedom struggle, aged by neglect; its physical condition is the nation\'s moral condition',
        hook: 'The state guards the flag\'s display rules; the author asks whether it still embodies justice — ritualistic patriotism versus ethical substance. For him no science, politics or religion outranks humanity; the flag is a moral contract, not a protocol object.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a preparatory section that introduces the author\'s life, the historical-literary milieu of the story "f\'kjh\\"k ds Qwy" (The Wings of the Flag), and key.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_14_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read the flag as the nation\'s pulse: trace its arc from tryst-with-destiny to faded neglect, weigh reverence against ritual, and ask what a torn tricolor diagnoses.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you walk past a government school and see the tricolor faded, torn at the edges, fluttering loosely on a rusted pole — you feel a pang but aren\'t sure.',
            decisions: [{ prompt: 'Who is the author of "f\'kjh\\"k ds Qwy" and what is his most notable literary award?', options: [
                { text: 'The author is Gatikhj Izlkn F}osnh (born 1907, Churu, Rajasthan)', outcome: 'The author is Gatikhj Izlkn F}osnh (born 1907, Churu, Rajasthan).' },
                { text: 'Premchand or confusing the award with Jnanpith', outcome: 'Not quite — Students treat "Before You Read" as optional background trivia — they memorize the author\'s birth.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are asked in the board exam: "How does the structure of \'फखरुद्दीन की खाट\' help the author convey his satire?" A struggling student might simply.',
            decisions: [{ prompt: 'What is the primary narrative perspective used in "फखरुद्दीन की खाट", and what is the immediate effect of this choice on the reader\'s.', options: [
                { text: 'The story uses a first-person narrative perspective ("मैं")', outcome: 'The story uses a first-person narrative perspective ("मैं"). This limits the reader\'s knowledge.' },
                { text: 'third-person omniscient', outcome: 'Not quite — Students often confuse "plot summary" with "narrative structure analysis".', reveals: 'students-often-confuse-plot-summary' },
                { text: 'plot summary', outcome: 'Not quite — Students often confuse "plot summary" with "narrative structure analysis".', reveals: 'students-often-confuse-plot-summary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you\'re sitting in your grandmother\'s village courtyard at dusk: the smell of cow-dung cakes burning, the sound of a distant temple bell, the shadows.',
            decisions: [{ prompt: 'What is the primary physical location where most of the story "फकीर धुनी" takes place?', options: [
                { text: 'The story primarily takes place in a village, centered around the fakir\'s hut and his', outcome: 'The story primarily takes place in a village, centered around the fakir\'s hut and his dhuni (sacred.' },
                { text: 'a city', outcome: 'Not quite — Students treat setting as a static list of "where and when" (village, past) and atmosphere as.', reveals: 'students-treat-setting-as-a' },
                { text: 'a temple', outcome: 'Not quite — Students treat setting as a static list of "where and when" (village, past) and atmosphere as.', reveals: 'students-treat-setting-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you meet the author of this essay at a literary festival.',
            decisions: [{ prompt: 'What is the primary role of the narrator-protagonist in "फख़्हक़ के क़याम"? Answer in one sentence.', options: [
                { text: 'The narrator-protagonist serves as a reflective consciousness that uses the pen as a', outcome: 'The narrator-protagonist serves as a reflective consciousness that uses the pen as a metaphor.' },
                { text: 'He is a pen collector', outcome: 'Not quite — Students often treat the pen as the protagonist because the title focuses on it.', reveals: 'students-often-treat-the-pen' },
                { text: 'He tells a story about a pen', outcome: 'Not quite — Students often treat the pen as the protagonist because the title focuses on it.', reveals: 'students-often-treat-the-pen' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re watching a street play where one actor wears a crown made of cardboard but everyone bows — that\'s the fool\'s paradise.',
            decisions: [{ prompt: 'Name the painter\'s internal conflict as revealed in the text and state the specific line that shows his unwillingness to flatter the fool.', options: [
                { text: 'The painter (चित्रकार) is torn between artistic integrity (वुक्लृद ;क्सह) and survival', outcome: 'The painter (चित्रकार) is torn between artistic integrity (वुक्लृद ;क्सह) and survival.' },
                { text: 'fear of king', outcome: 'Not quite — Students treat supporting characters as "minor" and write one-line descriptions (e.g., "painter.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re standing in a flood-prone village in Bihar after the waters recede — what\'s the first green thing you see pushing through the mud?',
            decisions: [{ prompt: 'What is the literal meaning of \'voèkwr\' (व्यतिक्र) as used by Dwivedi ji in the context of f\'kjh"k grass, and how does he redefine.', options: [
                { text: 'Literal meaning: \'voèkwr\' means \'perversion\' or \'deviation from norm\' (from vi + atikram)', outcome: 'Literal meaning: \'voèkwr\' means \'perversion\' or \'deviation from norm\' (from vi + atikram).' },
                { text: 'voèkwr means struggle', outcome: 'Not quite — Students treat "f\'kjh"k" as merely a *symbol of strength* (like "oak tree" in English poetry) and.', reveals: 'students-treat-f-kjh-k' },
                { text: 'resilience', outcome: 'Not quite — Students treat "f\'kjh"k" as merely a *symbol of strength* (like "oak tree" in English poetry) and.', reveals: 'students-treat-f-kjh-k' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your college\'s broken hostel bench gets a fresh coat of paint for inspection day — splinters and all — and the warden declares the issue \'resolved.\' The repair request you filed months ago is still \'under process.\'',
            decisions: [{ prompt: 'What does \'फखरुद्दीन की खाट\' see in the painted bench?', options: [
                { text: 'The cot painted by the bureaucrat — surface performance standing in for repair; the story\'s unresolved ending, where the cot never reaches the museum, performs the same deferral your \'under process\' request is trapped in.', outcome: 'The chapter reads the paint as the critique: cosmetic attention is how the system answers demand without meeting it — the structure denies resolution because the institution does.' },
                { text: 'Accept it — at least something visible was done; half a fix beats none.', outcome: 'The story\'s whole satire depends on refusing that bargain: paint over rot is precisely the bureaucrat\'s move — it photographs as action while the object stays broken underneath.', reveals: 'cosmetic-counts-as-fix' },
                { text: 'Treat it as proof the system works — the request clearly reached someone who acted.', outcome: 'Action timed to inspection isn\'t the request being processed; the story distinguishes performance-for-audience from accountability — the file stays open because the gesture closed the matter.', reveals: 'inspection-response-equals-resolution' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a national symbol as a moral diagnostic — and tell display-patriotism from the justice the cloth was meant to carry.',
            decisions: [{ prompt: 'What comes next? eerk dkfy;k · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — eerk dkfy;k · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a preparatory section that.',
          hint: 'If stuck, revisit c11_hin_ar_cbse_14_001 and practice the "3-Column Pre-Read Table".',
          misconception: 'Students treat "Before You Read" as optional background trivia — they memorize the author\'s birth year and award name.',
          parts: [
                { id: 'a', prompt: 'Who is the author of "f\'kjh\\"k ds Qwy" and what is his most notable literary award?', answer: 'The author is Gatikhj Izlkn F}osnh (born 1907, Churu, Rajasthan)',
                  options: ['The author is Gatikhj Izlkn F}osnh (born 1907, Churu, Rajasthan)', 'Premchand or confusing the award with Jnanpith'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_14_001 and practice the "3-Column Pre-Read Table": Column 1.',
                  misconception: 'Students treat "Before You Read" as optional background trivia — they memorize the author\'s birth year and award name but miss the.' },
                { id: 'b', prompt: 'In your own words, explain why the author calls the flag a "voèkwr" (living being) rather than a mere symbol. Use one detail from the introductory passage.', answer: 'The author calls the flag a voèkwr',
                  options: ['The author calls the flag a voèkwr', 'voèkwr'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_14_001 and practice the "3-Column Pre-Read Table": Column 1.',
                  misconception: 'Students treat "Before You Read" as optional background trivia — they memorize the author\'s birth year and award name but miss the.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['Re-read the author bio in the textbook and list *three* life-events that shaped his flag-view (e.g., village.', 'Draw a two-column table: "State\'s Flag" (protocol, material, occasions) vs.', '"Author\'s Flag" (breathing, suffering, moral witness).', 'Write one paragraph explaining how the author\'s *scholar-activist* identity bridges these columns.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_002', difficulty: 'standard',
          question: 'Plot and narrative structure refers to the organized sequence of events (plot).',
          hint: 'Review "frame narrative" and "flashback" in Class 11 node c11_hin_ar_cbse_01_002 with the.',
          misconception: 'Students often confuse "plot summary" with "narrative structure analysis".',
          parts: [
                { id: 'a', prompt: 'What is the primary narrative perspective used in "फखरुद्दीन की खाट", and what is the immediate effect of this choice on the reader\'s access to events?', answer: 'The story uses a first-person narrative perspective ("मैं")',
                  options: ['The story uses a first-person narrative perspective ("मैं")', 'third-person omniscient', 'plot summary', 'narrative structure analysis'],
                  hint: 'Review "frame narrative" and "flashback" in Class 11 node c11_hin_ar_cbse_01_002 with the "नमक का.',
                  misconception: 'Students often confuse "plot summary" with "narrative structure analysis".' },
                { id: 'b', prompt: 'The story opens with the narrator describing the cot in the present, then shifts to the poet\'s memory of the bureaucrat painting the cot.', answer: 'The shift is a flashback',
                  options: ['The shift is a flashback', 'plot summary', 'narrative structure analysis'],
                  hint: 'Review "frame narrative" and "flashback" in Class 11 node c11_hin_ar_cbse_01_002 with the "नमक का.',
                  misconception: 'Students often confuse "plot summary" with "narrative structure analysis".' }
          ],
            remediations: { 'students-often-confuse-plot-summary': { steps: ['Give them a 5-event strip from the story (e.g., 1. Cot made, 2. Bureaucrat paints, 3. Poet sees it, 4.', 'Ask them to arrange in story-time (chronological) and then in text-order (narrated).', 'Have them label each shift (flashback, frame, digression).', 'Re-attempt Diagnostic Question 3. If still stuck, revisit Class 11 node c11_hin_ar_cbse_01_002 (Plot and Narrative.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "plot summary" with "narrative structure analysis".',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the story\'s ending: the narrator\'s final rhetorical question ("गाड़ी ज्यों की त्यों धरी रह गई") after the cot\'s anti-climactic.', answer: 'The open-ended closure strengthens the satire',
                  options: ['The open-ended closure strengthens the satire', 'plot summary', 'narrative structure analysis'],
                  hint: 'Review "frame narrative" and "flashback" in Class 11 node c11_hin_ar_cbse_01_002 with the "नमक का.',
                  misconception: 'Students often confuse "plot summary" with "narrative structure analysis".' },
                { id: 'b', prompt: 'Create a one-paragraph alternate ending for "फखरुद्दीन की खाट" that retains the first-person frame but changes the narrative structure to a linear.', answer: 'Alternate ending (linear): "Fakhruddin bought the cot in 1940',
                  options: ['Alternate ending (linear): "Fakhruddin bought the cot in 1940', 'plot summary', 'narrative structure analysis'],
                  hint: 'Review "frame narrative" and "flashback" in Class 11 node c11_hin_ar_cbse_01_002 with the "नमक का.',
                  misconception: 'Students often confuse "plot summary" with "narrative structure analysis".' }
          ],
            remediations: { 'students-often-confuse-plot-summary': { steps: ['Give them a 5-event strip from the story (e.g., 1. Cot made, 2. Bureaucrat paints, 3. Poet sees it, 4.', 'Ask them to arrange in story-time (chronological) and then in text-order (narrated).', 'Have them label each shift (flashback, frame, digression).', 'Re-attempt Diagnostic Question 3. If still stuck, revisit Class 11 node c11_hin_ar_cbse_01_002 (Plot and Narrative.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and physical environment in which a story.',
          hint: 'If stuck, revisit c11_hin_ar_cbse_14_003 (Class 11 Setting and Atmosphere) and practice.',
          misconception: 'Students treat setting as a static list of "where and when" (village, past) and atmosphere as a single adjective.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the description of the dhuni (sacred fire) in the opening paragraphs establishes the story\'s atmosphere.', answer: 'The dhuni is described as a perpetual, unchanging fire around',
                  options: ['The dhuni is described as a perpetual, unchanging fire around', 'it shows the fakir is religious'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_14_003 (Class 11 Setting and Atmosphere) and practice the.',
                  misconception: 'Students treat setting as a static list of "where and when" (village, past) and atmosphere as a single adjective ("mystical").' }
          ],
            remediations: { 'students-treat-setting-as-a': { steps: ['Have them re-read the first two pages of the story with a highlighter — mark *only* sensory words (smell, sound, sight.', 'Group the highlights by element: fire-related, nature-related, body-related.', 'For each group, ask: "What feeling does *this cluster* create?', 'Write one 4-sentence paragraph linking one cluster to atmosphere using the PEEL structure.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the central figure\'s.',
          hint: 'If stuck, re-read the "Before You Read" (node 001) for author context, then list 10 "I".',
          misconception: 'Students often treat the pen as the protagonist because the title focuses on it.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist involves examining the central figure\'s personality',
                  options: ['Character analysis of the protagonist involves examining the central figure\'s personality', '"Before You Read: Context and Background" is a preparatory section that introduces the', 'Plot and narrative structure refers to the organized sequence of events (plot) and the', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'If stuck, re-read the "Before You Read" (node 001) for author context, then list 10 "I" statements.',
                  misconception: 'Students often treat the pen as the protagonist because the title focuses on it.' }
          ],
            remediations: { 'students-often-treat-the-pen': { steps: ['Ask them to highlight every sentence with "मैं" (I) in the text.', 'Have them list what the "I" does, thinks, feels, remembers.', 'Show how each "I" statement builds a portrait of a specific intellectual personality.', 'Assign a rewrite: "Write a character sketch of the person holding the pen, using only evidence from the \'I\'.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_005', difficulty: 'standard',
          question: 'Supporting characters are secondary figures in a narrative who interact with.',
          hint: 'Review "Character Analysis: Supporting Characters" from Class 11 Chapter 1.',
          misconception: 'Students treat supporting characters as "minor" and write one-line descriptions (e.g., "painter paints portrait").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters are secondary figures in a narrative who interact with the',
                  options: ['Supporting characters are secondary figures in a narrative who interact with the', '"Before You Read: Context and Background" is a preparatory section that introduces the', 'Plot and narrative structure refers to the organized sequence of events (plot) and the', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'Review "Character Analysis: Supporting Characters" from Class 11 Chapter 1 (c11_hin_ar_cbse_01_005).',
                  misconception: 'Students treat supporting characters as "minor" and write one-line descriptions (e.g., "painter paints portrait").' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['Re-read the text marking every speech/action by painter, king, queen, courtiers, people.', 'For each, complete: "This character ______ (verb) which ______ (effect on fool\'s paradise)." 3.', 'Group the verbs: flatter, reward, categorize, pretend, endure.', 'Write one PEEL paragraph per group showing how that verb *sustains the central irony*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_006', difficulty: 'standard',
          question: 'The primary theme of "f\'kjh"k ds Qwy" is the enduring resilience.',
          hint: 'If stuck: Revisit c12_hin_ar_cbse_14_002 (narrative structure) to map the essay\'s three.',
          misconception: 'Students treat "f\'kjh"k" as merely a *symbol of strength* (like "oak tree" in English poetry) and write: "The grass.',
          parts: [
                { id: 'a', prompt: 'Analyze how Dwivedi ji uses the first-person narrative shift ("eSa lksprk gw¡", "eSa f\'kjh"k osQ iwQyksa dks ns[kdj dgrk gw¡") to transform a botanical.', answer: 'Shift 1: "eSa lksprk gw¡ fd iqjkus dh ;g vfèkdkj&fyIlk D;ksa ugha le; jgrs"',
                  options: ['Shift 1: "eSa lksprk gw¡ fd iqjkus dh ;g vfèkdkj&fyIlk D;ksa ugha le; jgrs"', 'resilience', 'heroism'],
                  hint: 'If stuck: Revisit c12_hin_ar_cbse_14_002 (narrative structure) to map the essay\'s three movements.',
                  misconception: 'Students treat "f\'kjh"k" as merely a *symbol of strength* (like "oak tree" in English poetry) and write: "The grass represents strong.' }
          ],
            remediations: { 'students-treat-f-kjh-k': { steps: ['Re-read the opening paragraph ("tgk¡ cSB osQ ;g ys[k fy[k jgk gw¡...") aloud — notice the physical posture: "nk,¡&ck,¡".', 'List 5 adjectives Dwivedi ji uses for f\'kjh"k — N/A mean "strong/heroic."', 'Rewrite your theme statement replacing "strength" with "endurance against erasure."', 'Re-attempt Diagnostic Q2 with this corrected lens.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
