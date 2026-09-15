import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch03_p1: SimDef = {
    id: 'v3_c11_eng_h_ch03_p1',
    title: 'Discovering Tut: the Saga Continues · Part 1/3',
    subtitle: 'Read a 3,300-year-old cold case where the first detectives damaged the body.',
    classLevel: 11, subject: 'eng_h', topic: 'Discovering Tut: the Saga Continues · Part 1/3',
    chapters: ['c11_eng_h_ch03'],
    nodeIds: ['c11_eng_h_cbse_03_001', 'c11_eng_h_cbse_03_002', 'c11_eng_h_cbse_03_003', 'c11_eng_h_cbse_03_004', 'c11_eng_h_cbse_03_005', 'c11_eng_h_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a forensic reader working a pharaoh\'s cold case', intro: 'A mummy cemented in gold by ritual resins, a scan three millennia late — reconstruct what each era did to the evidence.', goal: 'Distinguish narrative order from chronology and evaluate how earlier interventions shaped the forensic record.' },
    discovery: {
        question: 'The article opens on the 2005 CT scan, jumps back to Carter\'s 1922 dig, then further back to Akhenaten\'s reign. Why scramble the timeline?',
        options: ['The flashbacks are rising action — they build the mystery of Tut\'s death that the scan must solve', 'Chronology doesn\'t matter in non-fiction', 'The scan is dull, so history is added for colour', 'The author couldn\'t decide where to begin'],
        answer: 'The flashbacks are rising action — they build the mystery of Tut\'s death that the scan must solve',
        hook: 'This is a cold case, not a chronicle — every jump backward is a clue the 2005 scan was called in to read.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'Before You Read: Context and Background provides essential historical, cultural, and scientific information about King Tutankhamun, the discovery of his tomb, and modern forensic techniques (like.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_03_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reorder the article\'s events into narrative order versus historical order, then assess what Carter\'s chiselling did to the evidence modern forensics inherited.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are a detective arriving at a 3,300-year-old crime scene where the evidence was badly handled by the first investigators in 1922.',
            decisions: [{ prompt: 'Who was Howard Carter and what is his connection to King Tutankhamun?', options: [
                { text: 'Howard Carter was the British archaeologist who discovered Tutankhamun\'s nearly intact', outcome: 'Howard Carter was the British archaeologist who discovered Tutankhamun\'s nearly intact tomb in the.' },
                { text: 'Carter was a pharaoh', outcome: 'Not quite — Students often think "context" means just memorizing dates and names (e.g., Tut died in 1323 BCE.', reveals: 'context-means-just-memorizing-dates' },
                { text: 'Carter built the tomb', outcome: 'Not quite — Students often think "context" means just memorizing dates and names (e.g., Tut died in 1323 BCE.', reveals: 'context-means-just-memorizing-dates' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine standing in the Valley of the Kings at 6 p.m. on a January evening: the wind whips "ghostly dust devils," dark clouds scud across the sky, and the.',
            decisions: [{ prompt: 'Identify the specific time and date mentioned in the opening paragraph of the text, and name the two primary physical locations where the.', options: [
                { text: 'The text states: "It was 6 p.m', outcome: 'The text states: "It was 6 p.m. on 5 January 2005." The two primary locations are the rock-cut tomb.' },
                { text: 'Valley of the Kings', outcome: 'Not quite — Students often confuse *setting* (the where/when) with *atmosphere* (the mood), treating them.', reveals: 'students-often-confuse-setting-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re a detective meeting a 3,300-year-old "witness" who cannot speak — only his bones, burial goods, and the stories of those who found him can.',
            decisions: [{ prompt: 'What is the primary textual evidence the author uses to establish King Tut\'s historical identity and lineage in the passage?', options: [
                { text: 'The author establishes Tut\'s identity through: (1) his parentage', outcome: 'The author establishes Tut\'s identity through: (1) his parentage — "Amenhotep III — Tut\'s father.' },
                { text: 'Amenhotep III — Tut\'s father or grandfather', outcome: 'Not quite — Students treat King Tut as a *fictional character* with personality traits (brave, curious, tragic).', reveals: 'students-treat-king-tut-as' },
                { text: 'His son Amenhotep IV succeeded him', outcome: 'Not quite — Students treat King Tut as a *fictional character* with personality traits (brave, curious, tragic).', reveals: 'students-treat-king-tut-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are a forensic investigator reviewing a case file.',
            decisions: [{ prompt: 'List the names of at least five supporting characters (individuals or groups) mentioned in the text "Discovering Tut: the Saga Continues,".', options: [
                { text: 'Modern: Howard Carter (archaeologist), Zahi Hawass (Secretary General, Supreme Council of', outcome: 'Modern: Howard Carter (archaeologist), Zahi Hawass (Secretary General, Supreme Council.' },
                { text: 'supporting characters', outcome: 'Not quite — Students often think "supporting characters" in non-fiction are only the living people (Carter.', reveals: 'supporting-characters-in-non-fiction' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are a detective standing in the Valley of the Kings: the wind howls, the CT scanner hums, and a 3,300-year-old pharaoh lies before you.',
            decisions: [{ prompt: 'State the primary theme of "Discovering Tut: the Saga Continues" in one sentence using the formula: "The text explores [abstract concept].', options: [
                { text: '**Correct answer:** The text explores the evolving relationship between scientific', outcome: '**Correct answer:** The text explores the evolving relationship between scientific investigation.' },
                { text: 'The theme is King Tut\'s death', outcome: 'Not quite — Students often believe the primary theme is **"The mystery of Tutankhamun\'s death"** because the.', reveals: 'the-primary-theme-is-the' },
                { text: 'The theme is mummies', outcome: 'Not quite — Students often believe the primary theme is **"The mystery of Tutankhamun\'s death"** because the.', reveals: 'the-primary-theme-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your archaeology-club poster on King Tut lists: \'1323 BCE — died; 1922 — tomb found; 2005 — CT scan.\' A teammate says the three dates are just facts to memorise, and asks why the 2005 team couldn\'t simply \'look at the body properly this time\'.',
            decisions: [{ prompt: 'How do the three events actually connect?', options: [
                { text: 'As a causal chain: Carter\'s 1922 excavation chiselled and dismembered the mummy to free it from hardened resins — creating the very damage the 2005 CT scan had to work around; and the 1323 BCE context (Akhenaten\'s religious upheaval) explains Tut\'s name change and the dynasty\'s collapse. The scan exists because the earlier handling destroyed what direct inspection could have answered.', outcome: 'Context is relational: each phase caused the next phase\'s problems — the article is about how evolving technology re-reads a mishandled past.' },
                { text: 'The teammate is right — dates are a list; the 2005 team just needed better eyes than Carter\'s crew.', outcome: 'The scan wasn\'t about better eyesight — 1,700 cross-sectional images were needed precisely because the body had been cut apart and reassembled in 1922.', reveals: 'context-as-memorised-dates' },
                { text: 'Carter\'s team was careful and professional; the damage story is exaggerated.', outcome: 'The text documents the dismemberment plainly; romanticising the discovery hides why forensic scanning became necessary eighty years later.', reveals: 'carter-did-no-damage' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Tut\'s body reached the scanner already broken — by the resins that buried him and the rescue that dismembered him.',
            decisions: [{ prompt: 'What comes next? Discovering Tut: the Saga Continues · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Discovering Tut: the Saga Continues · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_03_001', difficulty: 'standard',
          question: 'Before You Read: Context and Background provides essential historical.',
          hint: 'Review the Class 6-8 History chapters on "Early Civilizations" (Mesopotamia/Egypt) and.',
          misconception: 'Students often think "context" means just memorizing dates and names (e.g., Tut died in 1323 BCE, Carter found tomb.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Before You Read: Context and Background provides essential historical, cultural, and',
                  options: ['Before You Read: Context and Background provides essential historical, cultural, and', 'Plot is the sequence of events that make up a story, while narrative structure refers to', 'Setting refers to the time, place, and physical environment in', 'Character analysis of a protagonist in non-fiction narrative involves examining how the'],
                  hint: 'Review the Class 6-8 History chapters on "Early Civilizations" (Mesopotamia/Egypt) and the Class 10.',
                  misconception: 'Students often think "context" means just memorizing dates and names (e.g., Tut died in 1323 BCE, Carter found tomb in 1922).' }
          ],
            remediations: { 'context-means-just-memorizing-dates': { steps: ['If a student cannot explain the causal links, use a "Three-Card Timeline" activity: write each phase (Burial.', 'Ask the student to arrange them and draw arrows showing how each phase *caused* problems or opportunities for the next.', 'Verbally prompt: "Because Carter chiselled the mummy in 1922, what problem did the 2005 team face?" "Because Akhenaten.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "context" means just memorizing dates and names (e.g., Tut died in 1323 BCE, Carter found tomb.',
          parts: [
                { id: 'a', prompt: 'The article ends with the image of Orion (Osiris) watching over the tomb.', answer: 'Yes, it is appropriate',
                  options: ['Yes, it is appropriate', 'no, science and myth shouldn\'t mix', 'eerie detail', 'context'],
                  hint: 'Review the Class 6-8 History chapters on "Early Civilizations" (Mesopotamia/Egypt) and the Class 10.',
                  misconception: 'Students often think "context" means just memorizing dates and names (e.g., Tut died in 1323 BCE, Carter found tomb in 1922).' },
                { id: 'b', prompt: 'Create a 3-entry timeline for a museum exhibit label that captures the three key phases of Tutankhamun\'s "afterlife": 1323 BCE, 1922, 2005.', answer: '1323 BCE: Royal burial with funerary treasures in Valley of the Kings',
                  options: ['1323 BCE: Royal burial with funerary treasures in Valley of the Kings', 'context', '"context" means just memorizing dates and names (e'],
                  hint: 'Review the Class 6-8 History chapters on "Early Civilizations" (Mesopotamia/Egypt) and the Class 10.',
                  misconception: 'Students often think "context" means just memorizing dates and names (e.g., Tut died in 1323 BCE, Carter found tomb in 1922).' }
          ],
            remediations: { 'context-means-just-memorizing-dates': { steps: ['If a student cannot explain the causal links, use a "Three-Card Timeline" activity: write each phase (Burial.', 'Ask the student to arrange them and draw arrows showing how each phase *caused* problems or opportunities for the next.', 'Verbally prompt: "Because Carter chiselled the mummy in 1922, what problem did the 2005 team face?" "Because Akhenaten.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_03_002', difficulty: 'standard',
          question: 'Plot is the sequence of events that make up a story, while narrative structure.',
          hint: 'Review the plot diagram (Freytag\'s Pyramid) and practice labeling the stages in.',
          misconception: 'Students often treat the historical flashbacks (Akhenaten, Tut\'s restoration) as mere "background information" separate.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot is the sequence of events that make up a story, while narrative structure refers to',
                  options: ['Plot is the sequence of events that make up a story, while narrative structure refers to', 'Before You Read: Context and Background provides essential historical, cultural, and', 'Setting refers to the time, place, and physical environment in', 'Character analysis of a protagonist in non-fiction narrative involves examining how the'],
                  hint: 'Review the plot diagram (Freytag\'s Pyramid) and practice labeling the stages in a familiar Class 10.',
                  misconception: 'Students often treat the historical flashbacks (Akhenaten, Tut\'s restoration) as mere "background information" separate from the main plot.' }
          ],
            remediations: { 'students-often-treat-the-historical': { steps: ['Have the student create a two-column table: left column = events in text order, right column = same events.', 'Ask them to draw arrows connecting each flashback to the modern investigation question it answers (e.g., Akhenaten\'s.', 'Practice writing one analytical sentence per flashback using the stem: "The flashback to _____ serves the investigation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_03_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and physical environment in which.',
          hint: 'If stuck, review "Sensory Imagery and Suspense Building" (c7_engl_ch04_008) and practice.',
          misconception: 'Students often confuse *setting* (the where/when) with *atmosphere* (the mood), treating them as interchangeable.',
          parts: [
                { id: 'a', prompt: 'Identify the specific time and date mentioned in the opening paragraph of the text, and name the two primary physical locations where the narrative action.', answer: 'The text states: "It was 6 p.m',
                  options: ['The text states: "It was 6 p.m', 'Valley of the Kings'],
                  hint: 'If stuck, review "Sensory Imagery and Suspense Building" (c7_engl_ch04_008) and practice the.',
                  misconception: 'Students often confuse *setting* (the where/when) with *atmosphere* (the mood), treating them as interchangeable.' }
          ],
            remediations: { 'students-often-confuse-setting-the': { steps: ['Have the student reread only the first paragraph and underline every sensory detail (wind, dust devils, clouds, sky.', 'Ask: "What single mood do these details *together* create?', 'Find the word in the text that names it." (Answer: "eerie" appears later but is prepared here).', 'Give a two-column table: Column A = Sensory Detail, Column B = Mood Contribution.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_03_004', difficulty: 'standard',
          question: 'Character analysis of a protagonist in non-fiction narrative involves examining.',
          hint: 'If stuck, review c11_eng_h_cbse_03_002 (Plot and Narrative Structure) to map the two.',
          misconception: 'Students treat King Tut as a *fictional character* with personality traits (brave, curious, tragic) rather than.',
          parts: [
                { id: 'a', prompt: 'What is the primary textual evidence the author uses to establish King Tut\'s historical identity and lineage in the passage?', answer: 'The author establishes Tut\'s identity through: (1) his parentage',
                  options: ['The author establishes Tut\'s identity through: (1) his parentage', 'Amenhotep III — Tut\'s father or grandfather', 'His son Amenhotep IV succeeded him', 'about nine years'],
                  hint: 'If stuck, review c11_eng_h_cbse_03_002 (Plot and Narrative Structure) to map the two timelines.',
                  misconception: 'Students treat King Tut as a *fictional character* with personality traits (brave, curious, tragic) rather than a *historical figure.' },
                { id: 'b', prompt: 'Apply the concept of "forensic reconstruction" (mentioned in the opening paragraph) to explain how the CT scan data transforms Tut from a historical figure.', answer: 'Step 1: Identify the term "forensic reconstruction" in para 1',
                  options: ['Step 1: Identify the term "forensic reconstruction" in para 1', 'CT scan shows he was young'],
                  hint: 'If stuck, review c11_eng_h_cbse_03_002 (Plot and Narrative Structure) to map the two timelines.',
                  misconception: 'Students treat King Tut as a *fictional character* with personality traits (brave, curious, tragic) rather than a *historical figure.' }
          ],
            remediations: { 'students-treat-king-tut-as': { steps: ['Have the student re-read the opening paragraph and list: *What does the text say Tut DID vs.', 'what OTHERS did TO/ABOUT him?* (He died, was buried, changed name, ruled 9 years — 4 actions.', 'Others: discovered, scanned, chiselled, X-rayed, carried, joked about curse — 6+ actions).', 'Create a two-column table: "Direct Evidence from Tut\'s Time" (garlands, gold, name change, 9-year reign) vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_03_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters in a non-fiction narrative involves.',
          hint: 'Re-read the text with a highlighter: mark every proper noun referring to a person.',
          misconception: 'Students often think "supporting characters" in non-fiction are only the living people (Carter, Hawass).',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Zahi Hawass "didn\'t sleep last night" before the CT scan, and analyze what this reveals about his character and the author\'s.', answer: 'Hawass was anxious',
                  options: ['Hawass was anxious', 'fear of the curse', 'supporting characters'],
                  hint: 'Re-read the text with a highlighter: mark every proper noun referring to a person.',
                  misconception: 'Students often think "supporting characters" in non-fiction are only the living people (Carter, Hawass).' },
                { id: 'b', prompt: 'Compare the narrative functions of Ray Johnson (historian) and Zahi Hawass (archaeologist/administrator).', answer: 'Johnson provides the dynastic backstory: he characterizes Akhenaten\'s reign as a',
                  options: ['Johnson provides the dynastic backstory: he characterizes Akhenaten\'s reign as a', 'supporting characters'],
                  hint: 'Re-read the text with a highlighter: mark every proper noun referring to a person.',
                  misconception: 'Students often think "supporting characters" in non-fiction are only the living people (Carter, Hawass).' }
          ],
            remediations: { 'supporting-characters-in-non-fiction': { steps: ['If the student lists only modern figures: Ask, "Who are the people from Tut\'s family tree discussed in the text?', 'How does the author characterize Akhenaten through Ray Johnson\'s words?" Guide them to see that Johnson\'s "wacky" and.', 'If the student writes biography: Model the difference.', '"Biography: Carter discovered the tomb in 1922.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_03_006', difficulty: 'standard',
          question: 'The primary theme of a literary text is the central, unifying idea or insight.',
          hint: 'If stuck, re-read the "Understanding the text" Q1(iv) and Q2(iv) in the NCERT — they.',
          misconception: 'Students often believe the primary theme is **"The mystery of Tutankhamun\'s death"** because the chapter discusses.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "forensic reconstruction" (defined in the text as using CT data to recreate the boyish pharaoh) to a new context: If a 500-year-old Indian.', answer: '**Correct answer (steps with textual justification):** 1',
                  options: ['**Correct answer (steps with textual justification):** 1', 'The mystery of Tutankhamun\'s death'],
                  hint: 'If stuck, re-read the "Understanding the text" Q1(iv) and Q2(iv) in the NCERT — they explicitly ask.',
                  misconception: 'Students often believe the primary theme is **"The mystery of Tutankhamun\'s death"** because the chapter discusses murder theories,.' },
                { id: 'b', prompt: 'Analyze the symbolic function of the final image: "Just above the entrance to Tut\'s tomb stood Orion — the constellation that the ancient Egyptians knew as the.', answer: '**Correct answer:** The Orion/Osiris image resolves the tension by reframing the',
                  options: ['**Correct answer:** The Orion/Osiris image resolves the tension by reframing the', 'just a pretty ending', 'atmosphere', 'it shows the curse is real'],
                  hint: 'If stuck, re-read the "Understanding the text" Q1(iv) and Q2(iv) in the NCERT — they explicitly ask.',
                  misconception: 'Students often believe the primary theme is **"The mystery of Tutankhamun\'s death"** because the chapter discusses murder theories,.' }
          ],
            remediations: { 'the-primary-theme-is-the': { steps: ['If a student cannot distinguish subject from theme: 1.', '**Isolate the verbs**: List every action done *to* the mummy (discovered, ransacked, chiselled, X-rayed, scanned.', '**Categorize the agents**: Who acts?', '(Carter/thieves → anatomy professor → Hawass/radiologists).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
