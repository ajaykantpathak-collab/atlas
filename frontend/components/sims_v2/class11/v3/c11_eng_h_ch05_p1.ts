import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch05_p1: SimDef = {
    id: 'v3_c11_eng_h_ch05_p1',
    title: 'The Ailing Planet: the Green Movement\'s Role · Part 1/3',
    subtitle: 'Tell the Green Movement from the Green Revolution — then read an essay built like a closing argument.',
    classLevel: 11, subject: 'eng_h', topic: 'The Ailing Planet: the Green Movement\'s Role · Part 1/3',
    chapters: ['c11_eng_h_ch05'],
    nodeIds: ['c11_eng_h_cbse_05_001', 'c11_eng_h_cbse_05_002', 'c11_eng_h_cbse_05_003', 'c11_eng_h_cbse_05_004', 'c11_eng_h_cbse_05_005', 'c11_eng_h_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a jury member hearing the planet\'s case', intro: 'The patient says \'I feel fine\'; the blood tests show organ failure. Palkhivala is the doctor-lawyer presenting the chart.', goal: 'Situate the Green Movement historically and analyse the essay\'s argumentative structure.' },
    discovery: {
        question: 'A student writes: \'The Green Movement increased wheat yields in Punjab.\' What went wrong?',
        options: ['They merged two different things — the Green Movement is the post-1972 environmental conscience; the Green Revolution was the 1960s farm technology', 'Nothing — the movement directly raised yields', 'The yields rose but only in Kerala, not Punjab', 'The Green Movement was a farming subsidy scheme'],
        answer: 'They merged two different things — the Green Movement is the post-1972 environmental conscience; the Green Revolution was the 1960s farm technology',
        hook: 'Two \'greens,\' opposite directions — one fed the world quickly, the other asked what that feeding cost the planet.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a pre-reading pedagogical section that activates prior knowledge, introduces the historical and cultural context of the Green Movement (1972 onward), and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_05_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read Palkhivala\'s essay as a legal brief — thesis, evidence, authorities, verdict — and spot where he borrows Thatcher\'s \'life tenancy\' and Brown\'s \'borrowed from our children.\'',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are a doctor examining a patient who says, "I feel fine," but their blood tests show organ failure.',
            decisions: [{ prompt: 'What was the primary outcome of the 1972 United Nations Conference on the Human Environment in Stockholm that gave birth to the modern.', options: [
                { text: 'The Stockholm Conference produced the Stockholm Declaration (26 principles) and an Action', outcome: 'The Stockholm Conference produced the Stockholm Declaration (26 principles) and an Action Plan.' },
                { text: 'It banned CFCs', outcome: 'Not quite — Students conflate the "Green Movement" (a socio-political movement from 1972 onward) with the.', reveals: 'students-conflate-the-green-movement' },
                { text: 'It created the IPCC', outcome: 'Not quite — Students conflate the "Green Movement" (a socio-political movement from 1972 onward) with the.', reveals: 'students-conflate-the-green-movement' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a movie that suddenly cuts to a "what-if" version of history where the Marathas won at Panipat — that\'s exactly what "The Adventure".',
            decisions: [{ prompt: 'What is the narrative function of the frame story (Gaitonde telling Rajendra about his experience) in "The Adventure"?', options: [
                { text: 'The frame story provides a realistic anchor for the fantastical alternate-history', outcome: 'The frame story provides a realistic anchor for the fantastical alternate-history episode.' },
                { text: 'introduction/conclusion', outcome: 'Not quite — Students consistently misread the two worlds as "time travel to the past" rather than "parallel.', reveals: 'students-consistently-misread-the-two' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you step onto a train at Pune station expecting to reach familiar Mumbai, but the station signs read "Victoria Terminus" and the Union Jack flies.',
            decisions: [{ prompt: 'Identify the very first setting introduced in "The Adventure" and state the temporal clue that tells the reader the journey is happening.', options: [
                { text: 'The opening setting is the Jijamata Express speeding along the Pune-Bombay route', outcome: 'The opening setting is the Jijamata Express speeding along the Pune-Bombay route; the temporal clue.' },
                { text: 'Victoria Terminus', outcome: 'Not quite — Students often treat setting as a static list of places ("train, station, library") and atmosphere.', reveals: 'students-often-treat-setting-as' },
                { text: 'Battle of Panipat', outcome: 'Not quite — Students often treat setting as a static list of places ("train, station, library") and atmosphere.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are a detective trying to understand why Professor Gaitonde, a rational historian, ends up occupying an empty presidential chair at a public.',
            decisions: [{ prompt: 'What is the profession of Professor Gaitonde, and how does it influence his approach to the strange world he finds himself in?', options: [
                { text: 'Professor Gaitonde is a historian', outcome: 'Professor Gaitonde is a historian. His professional training makes him seek empirical evidence.' },
                { text: 'he is a scientist', outcome: 'Not quite — Students often confuse Professor Gaitonde with Rajendra Deshpande, treating Rajendra as the.', reveals: 'students-often-confuse-professor-gaitonde' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re watching a cricket match where a single dropped catch changes the entire tournament outcome — that\'s the "what if" question Professor Gaitonde.',
            decisions: [{ prompt: 'What is the precise primary theme of "The Adventure" expressed as a complete thematic statement (not a single word or phrase)?', options: [
                { text: 'The primary theme: "Historical reality is not a single fixed timeline but a branching', outcome: 'The primary theme: "Historical reality is not a single fixed timeline but a branching multiverse.' },
                { text: 'A wrong answer like', outcome: 'Not quite — Students conflate "alternate history" (genre) with the primary theme, writing "The theme.', reveals: 'students-conflate-alternate-history-genre' },
                { text: 'science meets history', outcome: 'Not quite — Students conflate "alternate history" (genre) with the primary theme, writing "The theme.', reveals: 'students-conflate-alternate-history-genre' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing an editorial for the school paper on \'the ailing planet\', a student drafts: \'The Green Movement that began in the 1960s fed millions by introducing high-yield wheat and fertilisers in Punjab — proof that the planet is healing.\'',
            decisions: [{ prompt: 'What confusion needs fixing before this goes to print?', options: [
                { text: 'Green Revolution ≠ Green Movement: the Revolution was a 1960s agricultural technology drive (HYV seeds, fertilisers) for food yield; the Movement began with the 1972 Stockholm Conference and champions sustainable development — and Palkhivala\'s article actually critiques the Revolution\'s ecological costs (chemical runoff, falling water tables). The draft praises the very thing the article warns about.', outcome: 'The two \'greens\' are nearly opposite in spirit: one maximises yield, the other asks whether present growth steals from future generations.' },
                { text: 'No fix needed — both are environmental efforts, so the example supports the editorial.', outcome: 'They\'re separable by date, method and goal; conflating them inverts the article\'s argument that yield-obsessed growth is part of the ailment.', reveals: 'green-movement-equals-revolution' },
                { text: 'The Movement is just about planting trees and saving tigers — keep the focus on wildlife.', outcome: 'Stockholm reframed ecology as planetary stewardship and intergenerational equity — a survival logic for economies, not a wildlife charity.', reveals: 'green-means-tigers-and-trees' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'A constitutional lawyer argued the planet\'s case like a court brief — and the verdict he wants is a duty, not a donation.',
            decisions: [{ prompt: 'What comes next? The Ailing Planet: the Green Movement\'s Role · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Ailing Planet: the Green Movement\'s Role · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_05_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a pre-reading pedagogical section.',
          hint: 'Review Class 10 Geography Chapter 4, specifically the subsection "Negative Consequences.',
          misconception: 'Students conflate the "Green Movement" (a socio-political movement from 1972 onward) with the "Green Revolution" (1960s.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the Green Movement shifted from "conservation of nature" to "sustainable development" by the 1980s, using the Brundtland Report.', answer: 'The shift occurred',
                  options: ['The shift occurred', 'planting trees', 'recycling'],
                  hint: 'Review Class 10 Geography Chapter 4, specifically the subsection "Negative Consequences of the.',
                  misconception: 'Students conflate the "Green Movement" (a socio-political movement from 1972 onward) with the "Green Revolution" (1960s agricultural.' }
          ],
            remediations: { 'students-conflate-the-green-movement': { steps: ['Show a 2-column table: "Green Revolution" (Norman Borlaug, HYV seeds, fertilizers, Punjab, 1960s, food security) vs.', '"Green Movement" (Stockholm 1972, Chipko 1973, UNEP, sustainable development, planetary health).', 'Ask: "Which one does Palkhivala support?" Guide to text evidence: he warns against "fertilizer-induced salinity" —.', 'Assign a 3-minute writing: "One sentence distinguishing the two using the words \'yield\' and \'sustainability\'." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_05_002', difficulty: 'standard',
          question: 'Plot and narrative structure refers to the organized sequence of events in.',
          hint: 'If stuck, review "The Midnight Visitor" (c10_engl_cbse_12_008) — map its exposition.',
          misconception: 'Students consistently misread the two worlds as "time travel to the past" rather than "parallel present." They think.',
          parts: [
                { id: 'a', prompt: 'Map the five-stage plot structure (exposition, rising action, climax, falling action, resolution) onto Gaitonde\'s alternate-history episode (from train arrival.', answer: 'Exposition: Train arrives at Sarhad/VT, Gaitonde discovers East India House',
                  options: ['Exposition: Train arrives at Sarhad/VT, Gaitonde discovers East India House', 'finding the Bakhar'],
                  hint: 'If stuck, review "The Midnight Visitor" (c10_engl_cbse_12_008) — map its exposition (Ausable\'s.',
                  misconception: 'Students consistently misread the two worlds as "time travel to the past" rather than "parallel present." They think Gaitonde visited.' }
          ],
            remediations: { 'students-consistently-misread-the-two': { steps: ['Have the student locate and read aloud the exact lines where Rajendra says "You neither travelled to the past nor the.', 'Draw a timeline: mark 1761 (Panipat) as bifurcation point, then two parallel arrows forward to "present day" — one.', 'Ask: "In which world does Gaitonde take the Jijamata Express?" (Alternate).', '"In which world does he talk to Rajendra?" (Our World).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_05_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social-historical context in which.',
          hint: 'If confused about which details belong to which timeline, re-read the train journey.',
          misconception: 'Students often treat setting as a static list of places ("train, station, library") and atmosphere as a single.',
          parts: [
                { id: 'a', prompt: 'Identify the very first setting introduced in "The Adventure" and state the temporal clue that tells the reader the journey is happening in the present day.', answer: 'The opening setting is the Jijamata Express speeding along the Pune-Bombay route',
                  options: ['The opening setting is the Jijamata Express speeding along the Pune-Bombay route', 'Victoria Terminus', 'Battle of Panipat'],
                  hint: 'If confused about which details belong to which timeline, re-read the train journey (paragraphs.',
                  misconception: 'Students often treat setting as a static list of places ("train, station, library") and atmosphere as a single adjective ("tense").' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student draw a two-column table: Column A = each physical setting in chronological order; Column B = three.', 'Ask them to highlight which column-B words change dramatically between library and maidan.', 'Guide them to write one PEEL paragraph linking that change to the theme "history is contingent." 4.', 'Verify they use textual phrases ("magnificent hall," "shower of tomatoes") as Evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_05_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the central.',
          hint: 'If stuck, review the "Character Analysis: The Grandmother (Krishtakka)" (c9_engl_ch1_2).',
          misconception: 'Students often confuse Professor Gaitonde with Rajendra Deshpande, treating Rajendra as the protagonist because.',
          parts: [
                { id: 'a', prompt: 'What is the profession of Professor Gaitonde, and how does it influence his approach to the strange world he finds himself in?', answer: 'Professor Gaitonde is a historian',
                  options: ['Professor Gaitonde is a historian', 'he is a scientist'],
                  hint: 'If stuck, review the "Character Analysis: The Grandmother (Krishtakka)" (c9_engl_ch1_2) for a model.',
                  misconception: 'Students often confuse Professor Gaitonde with Rajendra Deshpande, treating Rajendra as the protagonist because he explains the scientific.' }
          ],
            remediations: { 'students-often-confuse-professor-gaitonde': { steps: ['Re-read the final conversation (pages 50-52) where Rajendra explicitly distinguishes between time travel and world.', 'Create a two-column table: "Time Travel Expectations" vs.', '"Textual Evidence for World Transition".', 'Identify three moments where Gaitonde\'s actions (e.g., checking the library catalogue, noting the Union Jack.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_05_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining the traits.',
          hint: 'Review the protagonist analysis (c11_eng_h_cbse_05_004) and the plot summary.',
          misconception: 'Students often confuse supporting characters with background characters (like the Anglo-Indian ticket checker).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of supporting characters involves examining the traits, roles, and',
                  options: ['Character analysis of supporting characters involves examining the traits, roles, and', '"Before You Read: Context and Background" is a pre-reading pedagogical section that', 'Plot and narrative structure refers to the organized sequence of events in a story and', 'Setting refers to the time, place, and social-historical context in'],
                  hint: 'Review the protagonist analysis (c11_eng_h_cbse_05_004) and the plot summary.',
                  misconception: 'Students often confuse supporting characters with background characters (like the Anglo-Indian ticket checker) or historical figures.' }
          ],
            remediations: { 'students-often-confuse-supporting-characters': { steps: ['If a student cannot distinguish supporting characters, guide them to list every named character who directly speaks.', 'Then, for each, ask: "Does this character help Gaitonde understand his situation or move the plot forward?" Use.', 'This visual separation clarifies roles.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_05_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'Review c11_eng_h_cbse_05_002 (Plot) focusing on the dual-timeline structure — draw.',
          misconception: 'Students conflate "alternate history" (genre) with the primary theme, writing "The theme is alternate history" or "The.',
          parts: [
                { id: 'a', prompt: 'Analyze how the torn Bakhar page functions as both narrative evidence and thematic proof — what does its physical existence in Worldline A prove about the.', answer: 'The torn page is a macroscopic object that crossed the worldline boundary during',
                  options: ['The torn page is a macroscopic object that crossed the worldline boundary during', 'plot device', 'all alternatives are viable but the observer can experience only one at a time'],
                  hint: 'Review c11_eng_h_cbse_05_002 (Plot) focusing on the dual-timeline structure — draw a two-column.',
                  misconception: 'Students conflate "alternate history" (genre) with the primary theme, writing "The theme is alternate history" or "The theme is what.' }
          ],
            remediations: { 'students-conflate-alternate-history-genre': { steps: ['Have the student reread Rajendra\'s explanation (pages 50-51) and highlight every sentence where he defines "reality,".', 'Ask: "If the torn page is real, how many other objects from Worldline B exist in Worldline A?" — forcing confrontation.', 'Map the story\'s three-tiered explanation: Catastrophe Theory (classical bifurcation) → Quantum Theory (many worlds) →.', 'Require rewriting the thematic statement using only nouns from Rajendra\'s dialogue: "bifurcation," "world-picture,".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_05_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate "alternate history" (genre) with the primary theme, writing "The theme is alternate history" or "The.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The story\'s primary theme is weakened by its reliance on pseudoscientific extrapolation of quantum mechanics to macroscopic history.".', answer: 'Refute',
                  options: ['Refute', 'pseudoscience'],
                  hint: 'Review c11_eng_h_cbse_05_002 (Plot) focusing on the dual-timeline structure — draw a two-column.',
                  misconception: 'Students conflate "alternate history" (genre) with the primary theme, writing "The theme is alternate history" or "The theme is what.' }
          ],
            remediations: { 'students-conflate-alternate-history-genre': { steps: ['Have the student reread Rajendra\'s explanation (pages 50-51) and highlight every sentence where he defines "reality,".', 'Ask: "If the torn page is real, how many other objects from Worldline B exist in Worldline A?" — forcing confrontation.', 'Map the story\'s three-tiered explanation: Catastrophe Theory (classical bifurcation) → Quantum Theory (many worlds) →.', 'Require rewriting the thematic statement using only nouns from Rajendra\'s dialogue: "bifurcation," "world-picture,".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
