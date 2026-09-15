import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch15_p1: SimDef = {
    id: 'v3_c12_hin_a_ch15_p1',
    title: 'eerk dkfy;k · Part 1/3',
    subtitle: 'The survey line was straight; the damage wasn\'t',
    classLevel: 12, subject: 'hin_a', topic: 'eerk dkfy;k · Part 1/3',
    chapters: ['c12_hin_a_ch15'],
    nodeIds: ['c12_hin_a_cbse_15_001', 'c12_hin_a_cbse_15_002', 'c12_hin_a_cbse_15_003', 'c12_hin_a_cbse_15_004', 'c12_hin_a_cbse_15_005', 'c12_hin_a_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Displacement-narrative reader', intro: 'A dam was drawn on a map; a hundred villages learned they lived inside a line.', goal: 'Read Tedhi Lakeer through development-induced displacement and Renu\'s reportage-fiction method.' },
    discovery: {
        question: 'A surveyor draws a straight red line for a dam across tribal land — on the earth it becomes a crooked scar. Why did Renu name the story \'The Crooked Line\'?',
        options: ['The line is morally crooked — promises run straight, reality bends: the survey ignores contours, villages and consent; development\'s path is crooked because it refuses the land\'s truth', 'The terrain was hilly', 'Surveyors make mistakes', 'A meandering river'],
        answer: 'The line is morally crooked — promises run straight, reality bends: the survey ignores contours, villages and consent; development\'s path is crooked because it refuses the land\'s truth',
        hook: 'This is reportage-fiction about a real wound — the Koel-Karo project threatening 120+ villages. Renu captures the pre-movement moment: resistance raw and leaderless, dismissed as backwardness before it could become an Andolan. The deepest irony — the democratic state itself ran the displacement.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a preparatory section that provides essential information about the author (Phanishwar Nath Renu), the historical-social milieu of the story "टेढ़ी लकीर".', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_15_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the Chotanagpur hills before the dam: weigh whose \'development\' submerges whom, compare raw tribal refusal with organised protest, and decode the crooked line\'s triple meaning.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are about to watch a movie set in a remote tribal village where a massive dam is being built. You would want to know: Who made this film?',
            decisions: [{ prompt: 'Who is the author of the story "टेढ़ी लकीर" and what is his most famous novel that established him as a pioneer of the "Anchalik".', options: [
                { text: 'The author is Phanishwar Nath Renu (1929–2005)', outcome: 'The author is Phanishwar Nath Renu (1929–2005). His most famous novel is *Maila Anchal* (1954).' },
                { text: 'social realism', outcome: 'Not quite — Students treat the "Before You Read" section as optional background reading — skimming the author.', reveals: 'students-treat-the-before-you' },
                { text: 'regional realism', outcome: 'Not quite — Students treat the "Before You Read" section as optional background reading — skimming the author.', reveals: 'students-treat-the-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you see two photographs of your ancestral village: one taken fifty years ago showing green fields and a flowing river, and another taken today showing.',
            decisions: [{ prompt: 'What is the name of the village where the story "tgk¡ dksbZ okilh ugha" is set?', options: [
                { text: 'The village is called Veerpur (ve>j xk¡o)', outcome: 'The village is called Veerpur (ve>j xk¡o). A wrong answer (e.g., naming a different village from.' },
                { text: 'a different village from another story', outcome: 'Not quite — Students often treat the story as a simple chronological report: "First the village was nice, then.', reveals: 'students-often-treat-the-story' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are a journalist visiting Uokhao village today — what would you see, smell, hear, and feel? That sensory immersion is exactly what Renu achieves.',
            decisions: [{ prompt: 'What are the three key elements of \'setting\' in a narrative, and which specific element is most emphasized in the opening description.', options: [
                { text: 'The three key elements are time (historical period), place (physical geography), and', outcome: 'The three key elements are time (historical period), place (physical geography), and social.' },
                { text: 'social environment', outcome: 'Not quite — Students often treat setting as a static "background" and atmosphere as a single adjective ("sad,".', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are visiting a remote village for the first time and you see people living without basic healthcare, yet they possess a deep connection to nature.',
            decisions: [{ prompt: 'What is the primary role of the first-person narrator in \'जहाँ कोई दवाखाना नहीं\'? State in one sentence.', options: [
                { text: 'The narrator serves as a sensitive outsider who witnesses and documents the ecological', outcome: 'The narrator serves as a sensitive outsider who witnesses and documents the ecological and cultural.' },
                { text: 'every thought is autobiographical fact', outcome: 'Not quite — Students often confuse the narrator with the author (Fuezy OekZ) and assume every thought.', reveals: 'students-often-confuse-the-narrator' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are watching a documentary about a dam project in the Himalayas.',
            decisions: [{ prompt: 'Identify three supporting characters in "वहाँ कोई नहीं" and state one key trait for each.', options: [
                { text: 'Correct answer: The old woman (बुढ़िया)', outcome: 'Correct answer: The old woman (बुढ़िया) — wise, keeper of oral history; the contractor (ठेकेदार).' },
                { text: 'flashbacks', outcome: 'Not quite — Students often treat supporting characters as "minor" and therefore less important for exams.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you see a news headline: *"Coal mine expansion displaces 500 tribal families in Jharkhand."* You feel uneasy — but can you explain *why* this isn\'t.',
            decisions: [{ prompt: 'What is the primary theme of *tgk¡ dksbZ okilh ugha* in one precise sentence? (Do not list events — state the central idea.)', options: [
                { text: '**Correct answer:** The primary theme is the irreversible destruction of tribal identity,', outcome: '**Correct answer:** The primary theme is the irreversible destruction of tribal identity, ecology.' },
                { text: 'The story is about coal mining in Santhal Parganas', outcome: 'Not quite — **Misconception:** "The primary theme is \'industrialization is bad\' or \'tribals are exploited.\'".', reveals: 'misconception-the-primary-theme-is' },
                { text: 'It shows tribals losing their land', outcome: 'Not quite — **Misconception:** "The primary theme is \'industrialization is bad\' or \'tribals are exploited.\'".', reveals: 'misconception-the-primary-theme-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing a piece on your hometown\'s transformation — the river now a drain, fields under a factory — your editor wants it chronological: \'village past, then highway, then industry, then today.\'',
            decisions: [{ prompt: 'What structure does Renu\'s \'जहाँ कोई वापसी नहीं\' use instead, and why?', options: [
                { text: 'Open in the damaged present, then break into flashes of the lost past with your own commentary between them — the fragmented telling enacts the severed bond between people and land, making the reader live the loss rather than read a progress report.', outcome: 'The chapter\'s point: a linear telling makes change look like neutral sequence; the non-linear juxtaposition of what is against what was is where the critique lives.' },
                { text: 'Go chronological — \'village → factory\' order keeps the article clear and fair to both sides.', outcome: 'Chronology launders the verdict into inevitability; the story opens with the polluted present precisely so the reader enters with the damage already done — \'fair\' sequencing is how loss gets normalised.', reveals: 'chronology-is-neutral' },
                { text: 'Skip the past entirely and report only today\'s conditions — nostalgia is bias.', outcome: 'Without the remembered village the present has no baseline; the story\'s commentary works because the reader holds both timeframes at once — past-only is romance, present-only is bookkeeping.', reveals: 'past-is-bias' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a dam story as an invoice for the city\'s electricity — paid in forests, rivers and a people\'s memory.',
            decisions: [{ prompt: 'What comes next? eerk dkfy;k · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — eerk dkfy;k · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a preparatory section that.',
          hint: 'If stuck on the "development irony," revisit Class 11 Economics node on "Critical.',
          misconception: 'Students treat the "Before You Read" section as optional background reading — skimming the author bio and skipping the.',
          parts: [
                { id: 'a', prompt: 'Who is the author of the story "टेढ़ी लकीर" and what is his most famous novel that established him as a pioneer of the "Anchalik" (regional) novel in Hindi?', answer: 'The author is Phanishwar Nath Renu (1929–2005)',
                  options: ['The author is Phanishwar Nath Renu (1929–2005)', 'social realism', 'regional realism', 'Premchand or identifying *Godaan* as Renu\'s work'],
                  hint: 'If stuck on the "development irony," revisit Class 11 Economics node on "Critical Appraisal.',
                  misconception: 'Students treat the "Before You Read" section as optional background reading — skimming the author bio and skipping the historical context.' }
          ],
            remediations: { 'students-treat-the-before-you': { steps: ['**Immediate remediation:** Re-read the NCERT "Before You Read" page (pp.', '108-109) *aloud* — hearing the terms "कोयल-कारो परियोजना," "पाँचवीं अनुसूची," "आदिवासी विस्थापन" anchors them.', '**Targeted research (15 mins):** Search "Koel Karo project tribal resistance 1970s" — watch one 5-min video (e.g., from.', '**Re-diagnostic:** Answer Diagnostic Question 3 again *in writing*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_002', difficulty: 'standard',
          question: 'Plot refers to the sequence of events in a story, while narrative structure.',
          hint: 'Review the difference between linear and non-linear narrative structures using the Class.',
          misconception: 'Students often treat the story as a simple chronological report: "First the village was nice, then a factory came, then.',
          parts: [
                { id: 'a', prompt: 'What is the name of the village where the story "tgk¡ dksbZ okilh ugha" is set?', answer: 'The village is called Veerpur (ve>j xk¡o)',
                  options: ['The village is called Veerpur (ve>j xk¡o)', 'a different village from another story'],
                  hint: 'Review the difference between linear and non-linear narrative structures using the Class 11 node.',
                  misconception: 'Students often treat the story as a simple chronological report: "First the village was nice, then a factory came, then it got polluted.".' },
                { id: 'b', prompt: 'In your own words, explain how the narrative moves between past and present in the story. Does it follow a straight timeline?', answer: 'The narrative does not follow a straight timeline',
                  options: ['The narrative does not follow a straight timeline', 'it goes from past to present in order'],
                  hint: 'Review the difference between linear and non-linear narrative structures using the Class 11 node.',
                  misconception: 'Students often treat the story as a simple chronological report: "First the village was nice, then a factory came, then it got polluted.".' }
          ],
            remediations: { 'students-often-treat-the-story': { steps: ['Have the student draw two timelines: one with events in *historical order* (village life → land acquisition → factory →.', 'Ask: "Why did the author put the factory\'s arrival *after* the description of the polluted river?" 3.', 'Guide them to see that the structure makes the reader feel the *result* before the *cause*, creating a sense.', 'Re-attempt Diagnostic Question 4 with this visual aid.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the story as a simple chronological report: "First the village was nice, then a factory came, then.',
          parts: [
                { id: 'a', prompt: 'Is the reflective narrative structure effective in conveying the author\'s message about development? Justify your answer with two specific structural choices.', answer: 'Yes, it is effective',
                  options: ['Yes, it is effective', 'yes, it\'s good'],
                  hint: 'Review the difference between linear and non-linear narrative structures using the Class 11 node.',
                  misconception: 'Students often treat the story as a simple chronological report: "First the village was nice, then a factory came, then it got polluted.".' }
          ],
            remediations: { 'students-often-treat-the-story': { steps: ['Have the student draw two timelines: one with events in *historical order* (village life → land acquisition → factory →.', 'Ask: "Why did the author put the factory\'s arrival *after* the description of the polluted river?" 3.', 'Guide them to see that the structure makes the reader feel the *result* before the *cause*, creating a sense.', 'Re-attempt Diagnostic Question 4 with this visual aid.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a story.',
          hint: 'If stuck, revisit **c11_hin_ar_cbse_15_003** (Class 11 Setting & Atmosphere) and practice.',
          misconception: 'Students often treat setting as a static "background" and atmosphere as a single adjective ("sad," "tense").',
          parts: [
                { id: 'a', prompt: 'Analyze how the use of local dialect words (e.g., "ve>j", "isM+", "ewd lR;kxzg") contributes to the authenticity of the setting and the emotional texture.', answer: 'Dialect words ground the setting in **lived specificity**',
                  options: ['Dialect words ground the setting in **lived specificity**', 'it makes it realistic'],
                  hint: 'If stuck, revisit **c11_hin_ar_cbse_15_003** (Class 11 Setting & Atmosphere) and practice the.',
                  misconception: 'Students often treat setting as a static "background" and atmosphere as a single adjective ("sad," "tense").' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student re-read the first three paragraphs of the story with a highlighter: **yellow** for physical details.', 'Ask them to draw a two-column map: Column A = "What the text *says* exists" (dispensary, road, hospital); Column.', 'Have them write one sentence connecting each pair: "The dispensary exists (A) but has no doctor (B) → creates.', 'Re-attempt Diagnostic Question 3 using this map.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the central.',
          hint: 'Review Class 11 node c11_hin_ar_cbse_01_004 for the step-by-step method of protagonist.',
          misconception: 'Students often confuse the narrator with the author (Fuezy OekZ) and assume every thought is autobiographical fact.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist involves examining the central character\'s traits,',
                  options: ['Character analysis of the protagonist involves examining the central character\'s traits,', '"Before You Read: Context and Background" is a preparatory section that provides', 'Plot refers to the sequence of events in a story, while narrative structure is the', 'Setting refers to the time, place, and social environment in'],
                  hint: 'Review Class 11 node c11_hin_ar_cbse_01_004 for the step-by-step method of protagonist analysis.',
                  misconception: 'Students often confuse the narrator with the author (Fuezy OekZ) and assume every thought is autobiographical fact.' }
          ],
            remediations: { 'students-often-confuse-the-narrator': { steps: ['If a student makes this error, guide them to: 1) Re-read the opening paragraph where the narrator sets up his purpose.', '2) Identify three moments where the narrator explicitly contrasts city and village values.', '3) Rewrite one paragraph replacing \'pity\' words with \'admiration/critique\' words.', '4) Re-attempt Diagnostic Question 2 with the new lens.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining the roles.',
          hint: 'If stuck, review the "Character Analysis: Protagonist" node (c12_hin_a_cbse_15_004) and.',
          misconception: 'Students often treat supporting characters as "minor" and therefore less important for exams.',
          parts: [
                { id: 'a', prompt: 'Identify three supporting characters in "वहाँ कोई नहीं" and state one key trait for each.', answer: 'Correct answer: The old woman (बुढ़िया)',
                  options: ['Correct answer: The old woman (बुढ़िया)', 'flashbacks'],
                  hint: 'If stuck, review the "Character Analysis: Protagonist" node (c12_hin_a_cbse_15_004) and the Class.',
                  misconception: 'Students often treat supporting characters as "minor" and therefore less important for exams.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['Re-read the story marking every scene where a non-Vej character speaks or acts.', 'For each, write one sentence: "This character represents ______ because ______."', 'Pick two characters and write a PEEL paragraph each (Point, Evidence, Explanation, Link to theme).', 'Compare your paragraphs with the model answers in the textbook\'s "अभ्यास" section.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea — the.',
          hint: 'If stuck, return to **c12_hin_a_cbse_15_003 (Setting)** and **c12_hin_a_cbse_15_004.',
          misconception: '**Misconception:** "The primary theme is \'industrialization is bad\' or \'tribals are exploited.\'" **Why this is wrong.',
          parts: [
                { id: 'a', prompt: 'The story never has a character say "Industrialization is evil." How, then, does Renu convey his critical message?', answer: '**Correct answer:** Renu uses **implied contrast** (showing, not telling)',
                  options: ['**Correct answer:** Renu uses **implied contrast** (showing, not telling)', 'The author describes the mine badly', 'supported'],
                  hint: 'If stuck, return to **c12_hin_a_cbse_15_003 (Setting)** and **c12_hin_a_cbse_15_004 (Protagonist)**.',
                  misconception: '**Misconception:** "The primary theme is \'industrialization is bad\' or \'tribals are exploited.\'" **Why this is wrong and why students make.' },
                { id: 'b', prompt: 'Analyze how the **setting** (*uokxk¡o* — its *ipkl*, *xk¡o*, *vke*, *isM+*) functions as a **carrier of the primary theme**, not just a backdrop.', answer: '**Correct answer:** The setting *is* the theme made physical',
                  options: ['**Correct answer:** The setting *is* the theme made physical', 'The setting shows the village is beautiful and then it gets dirty', 'supported'],
                  hint: 'If stuck, return to **c12_hin_a_cbse_15_003 (Setting)** and **c12_hin_a_cbse_15_004 (Protagonist)**.',
                  misconception: '**Misconception:** "The primary theme is \'industrialization is bad\' or \'tribals are exploited.\'" **Why this is wrong and why students make.' }
          ],
            remediations: { 'misconception-the-primary-theme-is': { steps: ['**Remediation path (3 steps):** 1.', '**Revisit node c12_hin_a_cbse_15_003 (Setting and Atmosphere):** Re-read the *uokxk¡o* description.', 'List 5 Santhal-specific terms for landscape (*ipkl, xk¡o, vke, isM+, ve>j*) and 5 industrial terms that replace them.', 'This rebuilds the **vocabulary of the theme**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
