import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_v_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_v_ch06_p1: SimDef = {
    id: 'v3_c12_eng_v_ch06_p1',
    title: 'Memories of Childhood · Part 1/3',
    subtitle: 'A pair of scissors and a string-held packet — oppression\'s small tools',
    classLevel: 12, subject: 'eng_v', topic: 'Memories of Childhood · Part 1/3',
    chapters: ['c12_eng_v_ch06'],
    nodeIds: ['c12_eng_v_cbse_06_001', 'c12_eng_v_cbse_06_002', 'c12_eng_v_cbse_06_003', 'c12_eng_v_cbse_06_004', 'c12_eng_v_cbse_06_005', 'c12_eng_v_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Memoir analyst', intro: 'A Dakota girl hides under a bed to save her hair; a Tamil girl watches an elder carry food like it\'s radioactive. Two systems, one chapter.', goal: 'Read both childhood narratives as systemic oppression — forced assimilation and caste — working through children.' },
    discovery: {
        question: 'Two childhoods, two systems: Zitkala-Sa\'s braids cut off at a boarding school; a Dalit elder carrying a vadai packet by its string so no one is \'polluted.\' What links these memories?',
        options: ['Both are systems working on children — state-enforced assimilation in one, everyday untouchability in the other; small scenes revealing whole machines', 'Nothing — different countries', 'Both are just sad anecdotes', 'Only racism links them'],
        answer: 'Both are systems working on children — state-enforced assimilation in one, everyday untouchability in the other; small scenes revealing whole machines',
        hook: 'The haircut was cultural annihilation, not hygiene — among her people only mourners and captured cowards were shingled. And the packet carried by its string was pollution theory performed in public. Each scene is evidence, not anecdote; read the system inside the memory.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'The "Before You Read: Context and Background" section for "Memories of Childhood" provides the essential historical, cultural, and biographical framework for the two autobiographical narratives.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_v_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Cross two worlds of enforced shame: decode the Carlisle school\'s bells and scissors beside a Tamil village\'s rules of touch — and weigh Judewin\'s submission against Annan\'s counsel to study and fight.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are handed a diary entry from a child who was forced to cut their hair, change their name, and stop speaking their language at school.',
            decisions: [{ prompt: 'What are the two marginalized communities represented in "Memories of Childhood," and who are the authors representing them?', options: [
                { text: 'The two communities are Native Americans (represented by Zitkala-Sa, born Gertrude', outcome: 'The two communities are Native Americans (represented by Zitkala-Sa, born Gertrude Simmons Bonnin.' },
                { text: 'context', outcome: 'Not quite — Students often think "context" means just memorizing author names, dates, and definitions.', reveals: 'context-means-just-memorizing-author' },
                { text: '"context" means just memorizing author names, dates, and definitions', outcome: 'Not quite — Students often think "context" means just memorizing author names, dates, and definitions.', reveals: 'context-means-just-memorizing-author' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching two different movies about childhood injustice — one set in a 19th-century American boarding school, another in a Tamil Nadu village.',
            decisions: [{ prompt: 'What is the narrative point of view used in both episodes of "Memories of Childhood," and how does it affect the reader\'s experience of the.', options: [
                { text: 'Both episodes use first-person retrospective narration', outcome: 'Both episodes use first-person retrospective narration — the adult narrator looking back.' },
                { text: 'third-person omniscient', outcome: 'Not quite — Students often treat the two narratives as **separate stories** to be summarized individually.', reveals: 'students-often-treat-the-two' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine walking into a room where you don\'t know the language, the customs, or even how to use a chair — that is the immediate sensory shock Zitkala-Sa.',
            decisions: [{ prompt: 'Identify three sensory details from Zitkala-Sa\'s description of the dining hall that establish the physical setting of the Carlisle Indian.', options: [
                { text: 'Correct answer: The "bitter-cold" snow-covered ground (tactile/visual), the "large bell"', outcome: 'Correct answer: The "bitter-cold" snow-covered ground (tactile/visual), the "large bell" with "loud.' },
                { text: 'bells and shoes', outcome: 'Not quite — Students often treat setting as a static backdrop (time/place labels) and atmosphere as a single.', reveals: 'students-often-treat-setting-as' },
                { text: 'Indian girls in stiff shoes', outcome: 'Not quite — Students often treat setting as a static backdrop (time/place labels) and atmosphere as a single.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are a journalist interviewing a survivor of a residential school or a Dalit child in 1990s Tamil Nadu — what questions would you ask to understand.',
            decisions: [{ prompt: 'Identify the pen names of the two protagonists in "Memories of Childhood" and the marginalised communities they belong to.', options: [
                { text: 'The protagonists are Zitkala-Sa (Gertrude Simmons Bonnin), a Native American (Yankton', outcome: 'The protagonists are Zitkala-Sa (Gertrude Simmons Bonnin), a Native American (Yankton Dakota).' },
                { text: 'Before You Read', outcome: 'Not quite — Students often treat the two protagonists as "victims who suffer similarly" and write a generic.', reveals: 'students-often-treat-the-two' },
                { text: 'the authors\' birth names only, or confusing the communities', outcome: 'Not quite — Students often treat the two protagonists as "victims who suffer similarly" and write a generic.', reveals: 'students-often-treat-the-two' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine a friend who always says "just let it go" when you face unfairness, versus a sibling who says "fight back by excelling." In "Memories of Childhood,".',
            decisions: [{ prompt: 'Name two supporting characters from "The Cutting of My Long Hair" and two from "We Too are Human Beings."', options: [
                { text: 'Correct: From Part I', outcome: 'Correct: From Part I — Judewin, the paleface woman, the man at the end of the hall, the three young.' },
                { text: 'elder from the street', outcome: 'Not quite — Students often treat supporting characters as mere "background" and fail to analyze their symbolic.', reveals: 'students-often-treat-supporting-characters' },
                { text: 'Zitkala-Sa or Bama', outcome: 'Not quite — Students often treat supporting characters as mere "background" and fail to analyze their symbolic.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are sitting in a classroom where a teacher unfairly punishes only the students from one neighbourhood.',
            decisions: [{ prompt: 'What is the central, unifying theme that connects Zitkala-Sa\'s experience at the Carlisle Indian School and Bama\'s experience in her Tamil.', options: [
                { text: 'The central unifying theme is the systemic dehumanisation of marginalised communities', outcome: 'The central unifying theme is the systemic dehumanisation of marginalised communities (Native.' },
                { text: 'hair cutting', outcome: 'Not quite — Students often treat the two accounts as separate "stories about discrimination" and write two.', reveals: 'students-often-treat-the-two' },
                { text: 'caste discrimination', outcome: 'Not quite — Students often treat the two accounts as separate "stories about discrimination" and write two.', reveals: 'students-often-treat-the-two' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At your coaching institute, a girl from a marginalised community is quietly served tea last and made to sit apart \'as per tradition.\' She\'s furious and ready to drop out; others say either fight publicly or swallow it.',
            decisions: [{ prompt: 'Which path does \'Memories of Childhood\' validate?', options: [
                { text: 'Annan\'s answer to Bama: the humiliation is real and rage is justified, but the durable reply is to study, excel, and make yourself impossible to keep out — Bama tops her class and the same village comes to her.', outcome: 'Both episodes pair violation with response: Zitkala-Sa loses her hair to forced assimilation; Bama converts the vadai-packet humiliation into academic climb, because education is the one door the hierarchy can\'t hold shut.' },
                { text: 'Make a scene right there — public protest is the only language such insults understand.', outcome: 'The chapter distinguishes anger from strategy: Bama\'s fury is validated but channelled; Annan explicitly warns that indignation without education changes nothing about who gets served last.', reveals: 'outrage-equals-resistance' },
                { text: 'Advise her to endure quietly — making waves will only make the exclusion worse.', outcome: 'That\'s the reading the paired structure refutes: neither woman resigns — one resists bodily and is overpowered, the other resists through achievement; the chapter never treats silent endurance as dignity.', reveals: 'endurance-equals-dignity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a childhood memory as forensic evidence of oppression — and tell the difference between resistance that submits and resistance that studies.',
            decisions: [{ prompt: 'What comes next? Memories of Childhood · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Memories of Childhood · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_06_001', difficulty: 'standard',
          question: 'The "Before You Read: Context and Background" section for "Memories.',
          hint: 'If stuck, review Class 11 Hornbill Chapter 1 "Before You Read" (c11_eng_h_cbse_01_001).',
          misconception: 'Students often think "context" means just memorizing author names, dates, and definitions.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Zitkala-Sa\'s hair cutting was a traumatic cultural violation, not just a change of hairstyle.', answer: 'Among Zitkala-Sa\'s people, long hair was a sign of bravery and honor',
                  options: ['Among Zitkala-Sa\'s people, long hair was a sign of bravery and honor', 'context', '"context" means just memorizing author names, dates, and definitions'],
                  hint: 'If stuck, review Class 11 Hornbill Chapter 1 "Before You Read" (c11_eng_h_cbse_01_001) for the.',
                  misconception: 'Students often think "context" means just memorizing author names, dates, and definitions.' }
          ],
            remediations: { 'context-means-just-memorizing-author': { steps: ['If a student cannot connect context to text, have them re-read the "Before You Read" section and list three specific.', 'Then, for each fact, write one sentence linking it to a later event in the story (e.g., "Fact: Carlisle aimed to \'kill.', 'Use the worked examples in this node as models.', 'Next, attempt Diagnostic Questions 3 and 4 again, focusing on the "why" behind each textual detail.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "context" means just memorizing author names, dates, and definitions.',
          parts: [
                { id: 'a', prompt: 'Which author\'s childhood memory more effectively exposes the mechanism of systemic oppression: Zitkala-Sa\'s first day at Carlisle or Bama\'s observation of the.', answer: 'Both are effective but in different ways',
                  options: ['Both are effective but in different ways', 'context', '"context" means just memorizing author names, dates, and definitions'],
                  hint: 'If stuck, review Class 11 Hornbill Chapter 1 "Before You Read" (c11_eng_h_cbse_01_001) for the.',
                  misconception: 'Students often think "context" means just memorizing author names, dates, and definitions.' },
                { id: 'b', prompt: 'Write a 4-line poem from the perspective of either Zitkala-Sa or Bama as a child, capturing the moment they realized their identity was being attacked.', answer: 'Example (Zitkala-Sa): "Cold scissors bite my braids— / each snap a severed root',
                  options: ['Example (Zitkala-Sa): "Cold scissors bite my braids— / each snap a severed root', 'context', '"context" means just memorizing author names, dates, and definitions'],
                  hint: 'If stuck, review Class 11 Hornbill Chapter 1 "Before You Read" (c11_eng_h_cbse_01_001) for the.',
                  misconception: 'Students often think "context" means just memorizing author names, dates, and definitions.' }
          ],
            remediations: { 'context-means-just-memorizing-author': { steps: ['If a student cannot connect context to text, have them re-read the "Before You Read" section and list three specific.', 'Then, for each fact, write one sentence linking it to a later event in the story (e.g., "Fact: Carlisle aimed to \'kill.', 'Use the worked examples in this node as models.', 'Next, attempt Diagnostic Questions 3 and 4 again, focusing on the "why" behind each textual detail.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_06_002', difficulty: 'standard',
          question: 'Plot and Narrative Structure refers to the sequence of events in a story and.',
          hint: 'If stuck, revisit c11_eng_h_cbse_01_002 (Class 11 Hornbill Chapter 1 Plot and Narrative.',
          misconception: 'Students often treat the two narratives as **separate stories** to be summarized individually, missing that the.',
          parts: [
                { id: 'a', prompt: 'What is the narrative point of view used in both episodes of "Memories of Childhood," and how does it affect the reader\'s experience of the events?', answer: 'Both episodes use first-person retrospective narration',
                  options: ['Both episodes use first-person retrospective narration', 'third-person omniscient'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_002 (Class 11 Hornbill Chapter 1 Plot and Narrative Structure).',
                  misconception: 'Students often treat the two narratives as **separate stories** to be summarized individually, missing that the chapter\'s structure is.' }
          ],
            remediations: { 'students-often-treat-the-two': { steps: ['Have the student create a **two-column table** — left column: Zitkala-Sa\'s plot points (arrival, breakfast, warning.', 'Ask them to draw arrows connecting **structurally parallel moments** (e.g., "warning from Judewin" ↔ "Annan\'s.', 'Assign a **micro-writing task**: "In 3 sentences, explain how the \'first day at school\' (Zitkala-Sa) and \'daily walk.', 'Re-diagnose using Diagnostic Question 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_06_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a narrative.',
          hint: 'If stuck, return to Class 11 Hornbill/Snapshots/Woven Words setting/atmosphere nodes.',
          misconception: 'Students often treat setting as a static backdrop (time/place labels) and atmosphere as a single adjective (sad, happy.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting refers to the time, place, and social environment in',
                  options: ['Setting refers to the time, place, and social environment in', 'The "Before You Read: Context and Background" section for "Memories of Childhood"', 'Plot and Narrative Structure refers to the sequence of events in a story and the', 'Character analysis of the protagonist involves examining the central character\'s'],
                  hint: 'If stuck, return to Class 11 Hornbill/Snapshots/Woven Words setting/atmosphere nodes.',
                  misconception: 'Students often treat setting as a static backdrop (time/place labels) and atmosphere as a single adjective (sad, happy, scary).' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If a student cannot move beyond labeling, have them: (1) Photocopy one page from each narrative; (2) Use three.', 'Re-diagnose using Diagnostic Question 4 with a fresh excerpt.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_06_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the central.',
          hint: 'If stuck, return to c12_eng_v_cbse_06_002 (Plot) and make a timeline of *only the.',
          misconception: 'Students often treat the two protagonists as "victims who suffer similarly" and write a generic "both faced.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Zitkala-Sa hides under the bed when she learns her hair will be cut, and why Bama initially laughs at the elder carrying the.', answer: 'Zitkala-Sa hides',
                  options: ['Zitkala-Sa hides', 'inferential'],
                  hint: 'If stuck, return to c12_eng_v_cbse_06_002 (Plot) and make a timeline of *only the narrator\'s.',
                  misconception: 'Students often treat the two protagonists as "victims who suffer similarly" and write a generic "both faced discrimination" paragraph.' }
          ],
            remediations: { 'students-often-treat-the-two': { steps: ['Re-read the "Before You Read" section (c12_eng_v_cbse_06_001) to re-ground in the distinct historical contexts.', 'Create a two-column table: Column A = Zitkala-Sa (incident, cultural code, immediate response, long-term outcome).', 'Fill using only textual evidence.', 'Practice writing *one* trait paragraph for each protagonist using the T-E-E-S framework (Trait → Evidence → Explanation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_06_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining the traits.',
          hint: 'If stuck, review the text focusing on dialogues and actions of non-narrator characters.',
          misconception: 'Students often treat supporting characters as mere "background" and fail to analyze their symbolic function.',
          parts: [
                { id: 'a', prompt: 'Name two supporting characters from "The Cutting of My Long Hair" and two from "We Too are Human Beings."', answer: 'Correct: From Part I',
                  options: ['Correct: From Part I', 'elder from the street', 'Zitkala-Sa or Bama'],
                  hint: 'If stuck, review the text focusing on dialogues and actions of non-narrator characters; then.',
                  misconception: 'Students often treat supporting characters as mere "background" and fail to analyze their symbolic function.' },
                { id: 'b', prompt: 'In "We Too are Human Beings," the elder carries the vadai packet by its string.', answer: 'The elder\'s refusal to touch the parcel',
                  options: ['The elder\'s refusal to touch the parcel', 'I wanted to shriek with laughter', 'elder from the street'],
                  hint: 'If stuck, review the text focusing on dialogues and actions of non-narrator characters; then.',
                  misconception: 'Students often treat supporting characters as mere "background" and fail to analyze their symbolic function.' },
                { id: 'c', prompt: 'Compare the roles of Judewin (in Zitkala-Sa\'s narrative) and Annan (in Bama\'s narrative).', answer: 'Judewin embodies submission ("We have to submit")',
                  options: ['Judewin embodies submission ("We have to submit")', 'advisors', 'elder from the street'],
                  hint: 'If stuck, review the text focusing on dialogues and actions of non-narrator characters; then.',
                  misconception: 'Students often treat supporting characters as mere "background" and fail to analyze their symbolic function.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['If the student struggles, first revisit node c12_eng_v_cbse_06_004 (Protagonist Analysis) to solidify understanding.', 'Then re-read both episodes with a two-column chart: Column 1 — Supporting character name + key action/dialogue; Column.', 'Practice with one character from each part (e.g., Judewin and Annan) before attempting the full set.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_06_006', difficulty: 'standard',
          question: 'The primary theme of *Memories of Childhood* is the systemic oppression.',
          hint: 'If stuck, return to the two-column table exercise in ON_FAILURE and ensure each concrete.',
          misconception: 'Students often treat the two accounts as separate "stories about discrimination" and write two mini-essays: one.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of *Memories of Childhood* is the systemic oppression of marginalised',
                  options: ['The primary theme of *Memories of Childhood* is the systemic oppression of marginalised', 'The "Before You Read: Context and Background" section for "Memories of Childhood"', 'Plot and Narrative Structure refers to the sequence of events in a story and the', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, return to the two-column table exercise in ON_FAILURE and ensure each concrete incident.',
                  misconception: 'Students often treat the two accounts as separate "stories about discrimination" and write two mini-essays: one on Native American boarding.' }
          ],
            remediations: { 'students-often-treat-the-two': { steps: ['Re-read the "Before You Read" section (node c12_eng_v_cbse_06_001) to recall the editorial framing that explicitly.', 'Create a two-column table: Column A = Zitkala-Sa\'s key incidents, Column B = Bama\'s parallel incidents.', 'For each row, write the *abstract concept* (e.g., "forced assimilation", "ritual pollution", "physical resistance".', 'From the abstract concepts, draft a one-sentence primary theme statement.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
