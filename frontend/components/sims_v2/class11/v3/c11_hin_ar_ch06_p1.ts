import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch06_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch06_p1',
    title: 'le; gh og jax · Part 1/3',
    subtitle: 'Watch a tuition room become the whole education system in miniature.',
    classLevel: 11, subject: 'hin_ar', topic: 'le; gh og jax · Part 1/3',
    chapters: ['c11_hin_ar_ch06'],
    nodeIds: ['c11_hin_ar_cbse_06_001', 'c11_hin_ar_cbse_06_002', 'c11_hin_ar_cbse_06_003', 'c11_hin_ar_cbse_06_004', 'c11_hin_ar_cbse_06_005', 'c11_hin_ar_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a spectator trapped in one room with the exam machine', intro: 'A mother sweeping, a teacher collecting fees, a student drowning — and a one-act play that won\'t open a window.', goal: 'Analyse the one-act form\'s unity and compression as a critique of tuition culture.' },
    discovery: {
        question: 'Usha Priyamvada\'s one-act play ends with जटुह deciding to start a movement — no tidy solution. Is that a weak ending?',
        options: ['No — the open end refuses a false fix; the claustrophobic single room was always the trapped system itself', 'Yes — a play must resolve its conflict', 'Yes — starting a movement solves nothing for the boy', 'No — but only because sequels were planned'],
        answer: 'No — the open end refuses a false fix; the claustrophobic single room was always the trapped system itself',
        hook: 'One room, one act, no exits — the form itself is the argument: students and parents have nowhere to step out to.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" prepares students to engage with the one-act play *jtuh* by Usha Priyamvada by establishing the author\'s literary significance, the Nayi Kahani movement\'s.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Mark the entrances and exits as French scenes, place the climax where the tuition teacher confronts the principal, and defend the unresolved close.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are about to watch a play set in a middle-class Indian home where a mother and father argue about their son\'s private tuition fees — a scene you.',
            decisions: [{ prompt: 'Who is the author of the play *jtuh* and which literary movement is she associated with?', options: [
                { text: 'The author is Usha Priyamvada (eUuw HkaMkjh), a prominent writer of the Nayi Kahani (New', outcome: 'The author is Usha Priyamvada (eUuw HkaMkjh), a prominent writer of the Nayi Kahani (New Story).' },
                { text: 'context and background', outcome: 'Not quite — Students often think "context and background" means memorizing the author\'s birth/death dates and.', reveals: 'context-and-background-means-memorizing' },
                { text: 'Premchand or associating her with Chhayavad', outcome: 'Not quite — Students often think "context and background" means memorizing the author\'s birth/death dates and.', reveals: 'context-and-background-means-memorizing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are watching a play where a tuition teacher and a student argue about homework, and suddenly the student\'s mother enters, shifting the focus.',
            decisions: [{ prompt: 'What is the definition of \'exposition\' in the context of a one-act play? Provide an example from the opening of "जटुह".', options: [
                { text: 'Exposition is the part of the plot that introduces the setting, characters, and initial', outcome: 'Exposition is the part of the plot that introduces the setting, characters, and initial conflict.' },
                { text: 'the mother\'s entry is the exposition', outcome: 'Not quite — Students often think the \'plot\' is just a summary of events, and they list scenes in order without.', reveals: 'the-plot-is-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine walking into a government school staff room where a teacher has just been told her student received 72 cane strikes — the air feels heavy, the.',
            decisions: [{ prompt: 'Identify the three primary physical settings in "Jatuh" where major confrontations about corporal punishment occur.', options: [
                { text: 'The three primary physical settings are: (1) Jatuh\'s hostel room where she discusses', outcome: 'The three primary physical settings are: (1) Jatuh\'s hostel room where she discusses Vfer\'s.' },
                { text: 'school', outcome: 'Not quite — Students treat setting as "where the story happens" — a static container — rather than an active.', reveals: 'students-treat-setting-as-where' },
                { text: 'hostel', outcome: 'Not quite — Students treat setting as "where the story happens" — a static container — rather than an active.', reveals: 'students-treat-setting-as-where' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are a director casting a play: the lead actor is important, but the supporting actors make the story believable.',
            decisions: [{ prompt: 'Name the four main supporting characters in "जतुथ" and state one defining trait for each based on the text.', options: [
                { text: 'The four main supporting characters are: यथ्यक (जतुथ\'s wife) – pragmatic and anxious', outcome: 'The four main supporting characters are: यथ्यक (जतुथ\'s wife) – pragmatic and anxious about.' },
                { text: 'only two characters or giving generic traits like "kind', outcome: 'Not quite — Students treat supporting characters as "minor" and only list their traits (e.g., "यथ्यक.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are a student who has just watched a play where a teacher refuses to hit a child despite pressure from the principal and parents.',
            decisions: [{ prompt: 'What is the definition of \'primary theme\' in a literary work?', options: [
                { text: 'The primary theme is the central idea or message that the author explores throughout the', outcome: 'The primary theme is the central idea or message that the author explores throughout the text.' },
                { text: 'the summary of the story', outcome: 'Not quite — Students often think the primary theme is simply "corporal punishment is bad." This is a topic, not.', reveals: 'the-primary-theme-is-simply' },
                { text: 'corporal punishment is bad', outcome: 'Not quite — Students often think the primary theme is simply "corporal punishment is bad." This is a topic, not.', reveals: 'the-primary-theme-is-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your drama club is rehearsing Usha Priyamvada\'s one-act play about a family fighting over a son\'s tuition fees. The student director plans to \'break it into three scenes for variety\' and end with an uplifting speech where the parents renounce tuition.',
            decisions: [{ prompt: 'Why do both changes betray the play\'s design?', options: [
                { text: 'Hold the form: it\'s a one-act play — a single continuous act where every entrance and exit (French scenes) turns the same screw tighter. Splitting it into \'scenes\' breaks the compression that mirrors the student\'s inescapable pressure. And the happy ending kills the point: the Nayi Kahani one-acter refuses easy solutions, forcing the audience to sit with a system that commodifies childhood.', outcome: 'The production keeps its claustrophobia: one unbroken space, one unbroken pressure — discomfort is the playwright\'s method, not a flaw to fix.' },
                { text: 'Allow the scene breaks — entrances and exits are just like act divisions anyway.', outcome: 'French scenes are character shifts inside one continuous act, not act breaks; treating them as divisions imports a multi-act logic the form deliberately refuses.', reveals: 'french-scenes-are-acts' },
                { text: 'Keep the uplifting finale — audiences prefer resolution, and it gives the play a message.', outcome: 'The resolution would lie: the play\'s power is making the tuition trap felt without an exit — solving it on stage lets the audience off the hook.', reveals: 'happy-ending-improves-it' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'The play compresses everything a novel would spread out — that\'s why the pressure on one student\'s homework feels inescapable.',
            decisions: [{ prompt: 'What comes next? le; gh og jax · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — le; gh og jax · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" prepares students to engage with the.',
          hint: 'If stuck, review the Class 10 chapter on "Hindi Sahitya ka Itihas" focusing on the Nayi.',
          misconception: 'Students often think "context and background" means memorizing the author\'s birth/death dates and a list of works.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" prepares students to engage with the one-act',
                  options: ['"Before You Read: Context and Background" prepares students to engage with the one-act', 'Plot and Narrative Structure refers to the sequence of events (plot) and the framework', 'Setting refers to the time, place, and social environment in', 'Character analysis of the protagonist involves systematically examining the central'],
                  hint: 'If stuck, review the Class 10 chapter on "Hindi Sahitya ka Itihas" focusing on the Nayi Kahani.',
                  misconception: 'Students often think "context and background" means memorizing the author\'s birth/death dates and a list of works.' }
          ],
            remediations: { 'context-and-background-means-memorizing': { steps: ['If a student reduces context to biography, guide them through this 3-step remediation: 1.', '**Map the movement**: Have them list 3 Nayi Kahani stories they know (e.g., *Usne Kaha Tha*, *Parinde*) and identify.', '**Connect to material history**: Show a 1960s college fee receipt (or recreated image) and a coaching ad from the same.', '**Form-function link**: Give them a 2-page excerpt from a full-length play and the opening of *jtuh*; ask "What can.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "context and background" means memorizing the author\'s birth/death dates and a list of works.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of using a one-act play form to critique the education system.', answer: 'The one-act form *strengthens* the critique',
                  options: ['The one-act form *strengthens* the critique', 'it\'s too short to show everything', 'context and background'],
                  hint: 'If stuck, review the Class 10 chapter on "Hindi Sahitya ka Itihas" focusing on the Nayi Kahani.',
                  misconception: 'Students often think "context and background" means memorizing the author\'s birth/death dates and a list of works.' },
                { id: 'b', prompt: 'Create a brief (4–5 line) imaginary stage direction for a modern adaptation of *jtuh* set in a present-day coaching hub (e.g., Kota).', answer: '**Stage Direction**: "A cramped Kota hostel room, 2 AM',
                  options: ['**Stage Direction**: "A cramped Kota hostel room, 2 AM', 'context and background'],
                  hint: 'If stuck, review the Class 10 chapter on "Hindi Sahitya ka Itihas" focusing on the Nayi Kahani.',
                  misconception: 'Students often think "context and background" means memorizing the author\'s birth/death dates and a list of works.' }
          ],
            remediations: { 'context-and-background-means-memorizing': { steps: ['If a student reduces context to biography, guide them through this 3-step remediation: 1.', '**Map the movement**: Have them list 3 Nayi Kahani stories they know (e.g., *Usne Kaha Tha*, *Parinde*) and identify.', '**Connect to material history**: Show a 1960s college fee receipt (or recreated image) and a coaching ad from the same.', '**Form-function link**: Give them a 2-page excerpt from a full-length play and the opening of *jtuh*; ask "What can.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_002', difficulty: 'standard',
          question: 'Plot and Narrative Structure refers to the sequence of events (plot) and the.',
          hint: 'If stuck, review the plot diagram (Freytag\'s Pyramid) and practice mapping a simple story.',
          misconception: 'Students often think the \'plot\' is just a summary of events, and they list scenes in order without identifying the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and Narrative Structure refers to the sequence of events (plot) and the framework',
                  options: ['Plot and Narrative Structure refers to the sequence of events (plot) and the framework', '"Before You Read: Context and Background" prepares students to engage with the one-act', 'Setting refers to the time, place, and social environment in', 'Character analysis of the protagonist involves systematically examining the central'],
                  hint: 'If stuck, review the plot diagram (Freytag\'s Pyramid) and practice mapping a simple story (e.g.,.',
                  misconception: 'Students often think the \'plot\' is just a summary of events, and they list scenes in order without identifying the structural function.' }
          ],
            remediations: { 'the-plot-is-just-a': { steps: ['If a student cannot distinguish plot events from structural stages, have them create a two-column table: Column.', 'Use color-coding: highlight each French scene entrance in the text.', 'Then ask: "What changes after this entrance?" This forces them to see causality, not just sequence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a narrative.',
          hint: 'Review c11_hin_ar_cbse_06_002 (Plot) to map each major confrontation to its physical.',
          misconception: 'Students treat setting as "where the story happens" — a static container — rather than an active maker of meaning.',
          parts: [
                { id: 'a', prompt: 'Explain how the description of the Principal\'s office ("बड़ी कुर्सी पर बैठे", "फाइलों के ढेर") creates an atmosphere that supports the theme of bureaucratic.', answer: 'The "large chair" elevates the Principal physically above visitors, symbolizing',
                  options: ['The "large chair" elevates the Principal physically above visitors, symbolizing', 'strictness', 'mood words'],
                  hint: 'Review c11_hin_ar_cbse_06_002 (Plot) to map each major confrontation to its physical location; then.',
                  misconception: 'Students treat setting as "where the story happens" — a static container — rather than an active maker of meaning.' },
                { id: 'b', prompt: 'Compare the atmosphere of the staff-room discussion (Jatuh-Yhyk) with the public meeting (ehfVax).', answer: 'The staff room is claustrophobic, smoky, intimate',
                  options: ['The staff room is claustrophobic, smoky, intimate', 'arguments', 'mood words'],
                  hint: 'Review c11_hin_ar_cbse_06_002 (Plot) to map each major confrontation to its physical location; then.',
                  misconception: 'Students treat setting as "where the story happens" — a static container — rather than an active maker of meaning.' }
          ],
            remediations: { 'students-treat-setting-as-where': { steps: ['Have the student re-read only the stage directions (text in parentheses) for three scenes: Jatuh\'s room opening.', 'Ask: "What objects are named?', 'What sounds exist?" Then: "If you removed this detail, how would the scene feel different?" This forces attention.', 'Finally, map each detail to a power dynamic: height = authority, smoke = confusion, night = unresolved injustice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves systematically examining the.',
          hint: 'Review "narrative point of view" in c11_hin_ar_cbse_06_002 - specifically the difference.',
          misconception: 'Students consistently confuse Jatuh\'s *professional ethics* with *personal affection* for Vfer.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist involves systematically examining the central',
                  options: ['Character analysis of the protagonist involves systematically examining the central', '"Before You Read: Context and Background" prepares students to engage with the one-act', 'Plot and Narrative Structure refers to the sequence of events (plot) and the framework', 'Setting refers to the time, place, and social environment in'],
                  hint: 'Review "narrative point of view" in c11_hin_ar_cbse_06_002 - specifically the difference between.',
                  misconception: 'Students consistently confuse Jatuh\'s *professional ethics* with *personal affection* for Vfer.' }
          ],
            remediations: { 'students-consistently-confuse-jatuh-s': { steps: ['Have the student list every interaction between Jatuh and Vfer in a two-column table: Column A = Action/Dialogue.', 'Show the Principal scene where Jatuh says "eSFl esa ges\'kk lsaV&ijlsaV uacj ysrk jgk gSA bl lky Hkh mlus iwjk isij Bhd.', 'Ask: "If she favored him personally, would she demand the same rights for *all* students in the public hearing?"', 'Rewrite one board answer paragraph replacing "Vfer" with "any student" to test if the argument holds.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining the traits.',
          hint: 'Review the "Character List and Key Dialogues" table created during protagonist analysis.',
          misconception: 'Students treat supporting characters as "minor" and only list their traits (e.g., "यथ्यक is caring") without analyzing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of supporting characters involves examining the traits, motivations,',
                  options: ['Character analysis of supporting characters involves examining the traits, motivations,', '"Before You Read: Context and Background" prepares students to engage with the one-act', 'Plot and Narrative Structure refers to the sequence of events (plot) and the framework', 'Setting refers to the time, place, and social environment in'],
                  hint: 'Review the "Character List and Key Dialogues" table created during protagonist analysis (node 004).',
                  misconception: 'Students treat supporting characters as "minor" and only list their traits (e.g., "यथ्यक is caring") without analyzing their structural.' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['Have the student re-read only the dialogues of one supporting character (e.g., यथ्यक) and highlight every word related.', 'Ask: "If this character were removed, what would जतुथ lose?" 3.', 'Guide them to write one paragraph connecting that character\'s pressure to जतुथ\'s final decision.', 'Repeat for two more characters, then compare their pressures in a table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_006', difficulty: 'standard',
          question: 'Primary theme is the central idea or underlying message that the author conveys.',
          hint: 'If stuck, review the protagonist\'s three major confrontations (with principal, with.',
          misconception: 'Students often think the primary theme is simply "corporal punishment is bad." This is a topic, not a theme.',
          parts: [
                { id: 'a', prompt: 'In "जतू", the principal says: "बच्चे दे”क्‍सज नहीं, गक्सफक्रक्ज हैं" (Children are not delicate, they are tough).', answer: 'The principal believes that physical punishment is necessary and harmless',
                  options: ['The principal believes that physical punishment is necessary and harmless', 'the principal cares for children', 'corporal punishment is bad', 'the primary theme is simply "corporal punishment is bad'],
                  hint: 'If stuck, review the protagonist\'s three major confrontations (with principal, with parent, with.',
                  misconception: 'Students often think the primary theme is simply "corporal punishment is bad." This is a topic, not a theme.' }
          ],
            remediations: { 'the-primary-theme-is-simply': { steps: ['If a student gives a topic instead of a theme statement, guide them: (1) Identify the topic (corporal punishment).', '(2) Ask: "What does the play say about this topic?" (3) Formulate a sentence with a verb showing the author\'s.', '(4) Test it against the text: does the play support this?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
