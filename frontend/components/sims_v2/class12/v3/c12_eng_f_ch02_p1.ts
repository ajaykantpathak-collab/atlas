import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch02_p1: SimDef = {
    id: 'v3_c12_eng_f_ch02_p1',
    title: 'Lost Spring · Part 1/3',
    subtitle: 'Two cages, one stolen spring — poverty engineered, not accidental',
    classLevel: 12, subject: 'eng_f', topic: 'Lost Spring · Part 1/3',
    chapters: ['c12_eng_f_ch02'],
    nodeIds: ['c12_eng_f_cbse_02_001', 'c12_eng_f_cbse_02_002', 'c12_eng_f_cbse_02_003', 'c12_eng_f_cbse_02_004', 'c12_eng_f_cbse_02_005', 'c12_eng_f_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Investigative journalist', intro: 'A boy who should be in school wipes tables at a tea stall. This chapter asks why millions like him never get spring.', goal: 'Read Lost Spring as literary journalism exposing structural poverty, migration and caste-driven child labour.' },
    discovery: {
        question: 'Saheb calls ragpicking \'gold\' — a rupee glinting in a garbage heap. The elders call it survival. Is the author romanticising child labour?',
        options: ['No — the child\'s wonder beside the elder\'s trap exposes how poverty commodifies innocence itself', 'Yes — it shows children are happy working', 'Neither — it\'s just a description', 'The gold line is a metaphor for actual treasure'],
        answer: 'No — the child\'s wonder beside the elder\'s trap exposes how poverty commodifies innocence itself',
        hook: 'Lost Spring is journalism, not fiction — two different cages: stateless 1971 migrants in Seemapuri and caste-bound bangle families in Firozabad. Pity is the wrong lens; the text anatomises a system — middlemen, police, \'karam\' — that keeps law on paper and children at furnaces.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a pre-reading strategy that equips students with the historical, social, economic, and authorial information necessary to access a text\'s deeper meanings.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Investigate two stolen childhoods like a reporter: separate migrant statelessness from caste entrapment, weigh the laws that exist against the nexus that ignores them, and decode what the title\'s \'spring\' really lost.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you see a young boy serving tea at a roadside stall near your school — he should be in Class 6, but he\'s wiping tables.',
            decisions: [{ prompt: 'Who is the author of *Lost Spring*, and what is her professional background that shapes this text?', options: [
                { text: 'Anees Jung, born in Rourkela (1944), raised in Hyderabad, educated in India and the USA', outcome: 'Anees Jung, born in Rourkela (1944), raised in Hyderabad, educated in India and the USA; she is.' },
                { text: 'a novelist', outcome: 'Not quite — Students often think *Lost Spring* is "just a story about poor children" and focus only.', reveals: 'lost-spring-is-just-a' },
                { text: 'a social worker', outcome: 'Not quite — Students often think *Lost Spring* is "just a story about poor children" and focus only.', reveals: 'lost-spring-is-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a documentary that follows two children in different cities but cuts between them to show how their stories mirror each other.',
            decisions: [{ prompt: 'What are the two main narrative threads in "Lost Spring" and where does each take place?', options: [
                { text: 'The two threads are Saheb\'s story (a ragpicker in Seemapuri, Delhi) and Mukesh\'s story (a', outcome: 'The two threads are Saheb\'s story (a ragpicker in Seemapuri, Delhi) and Mukesh\'s story (a.' },
                { text: 'three threads or placing both in the same city', outcome: 'Not quite — Students treat "Lost Spring" as a conventional short story with a single protagonist, linear plot.', reveals: 'students-treat-lost-spring-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are a journalist visiting Seemapuri and Firozabad today — what would you see, smell, hear, and feel?',
            decisions: [{ prompt: 'What are the two primary physical settings described in "Lost Spring," and what major industry or activity defines each?', options: [
                { text: 'The two primary settings are Seemapuri (a slum on Delhi\'s periphery) defined by', outcome: 'The two primary settings are Seemapuri (a slum on Delhi\'s periphery) defined by rag-picking, and.' },
                { text: 'only one setting or misidentifying the industry', outcome: 'Not quite — Students often treat setting as a static backdrop (e.g., "Seemapuri is a slum") rather than.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re a journalist interviewing Saheb at the tea stall and Mukesh in the dark hutment — what would their answers reveal about their inner worlds?',
            decisions: [{ prompt: 'What are the two protagonists\' names in "Lost Spring," and which story does each belong to?', options: [
                { text: 'The two protagonists are Saheb (from "Sometimes I find a Rupee in the garbage") and', outcome: 'The two protagonists are Saheb (from "Sometimes I find a Rupee in the garbage") and Mukesh (from "I.' },
                { text: 'only one protagonist or confusing their stories', outcome: 'Not quite — Students treat Saheb and Mukesh as interchangeable "poor children" and write identical character.', reveals: 'students-treat-saheb-and-mukesh' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are a journalist interviewing people in Seemapuri and Firozabad.',
            decisions: [{ prompt: 'Name three supporting characters from the Seemapuri section and three from the Firozabad section of "Lost Spring".', options: [
                { text: 'Seemapuri: the barefoot boy who says "My mother did not bring them down from the shelf",', outcome: 'Seemapuri: the barefoot boy who says "My mother did not bring them down from the shelf", the boy.' },
                { text: 'only protagonists or characters from other chapters', outcome: 'Not quite — Students often treat supporting characters as "background decoration" and write answers like "The.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you see a child your age picking through a garbage heap at 7 AM while you wait for your school bus.',
            decisions: [{ prompt: 'What is the ONE sentence in the NCERT "About the Unit" box that explicitly states the primary theme of "Lost Spring"?', options: [
                { text: '"The plight of street children forced into labour early in life and denied the', outcome: '"The plight of street children forced into labour early in life and denied the opportunity.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students confuse THEME with TOPIC or MORAL. They write "The theme is child labour" or "The theme.', reveals: 'students-confuse-theme-with-topic' },
                { text: 'child labour is bad', outcome: 'Not quite — Students confuse THEME with TOPIC or MORAL. They write "The theme is child labour" or "The theme.', reveals: 'students-confuse-theme-with-topic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'An NGO volunteer finds children feeding glass furnaces in a bangle-making town. The elders say, \'this is our ancestral craft — it\'s tradition.\'',
            decisions: [{ prompt: 'How should she respond?', options: [
                { text: 'Treat it as a structural trap, not a tradition: the work is hazardous child labour sustained by middlemen, debt and dead ends — so push schooling, enforcement and viable alternatives together.', outcome: 'Like Mukesh\'s Firozabad in \'Lost Spring\', \'tradition\' is how exploitation dresses itself up; a rescued child with no alternative goes straight back to the furnace.' },
                { text: 'Respect it — it\'s their culture, and outsiders shouldn\'t interfere.', outcome: 'That confuses inherited compulsion with chosen culture; the children themselves dream of garages and schools.', reveals: 'culture-excuse-for-exploitation' },
                { text: 'Just pull the children out this week — job done.', outcome: 'Rescue without alternatives returns them to the same economic trap; the system, not just the child, has to change.', reveals: 'rescue-without-alternative' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a lyrical reportage as structural evidence, not just a sad story. That pivot — from feeling to analysis — is what separates a full-marks answer from a plot summary.',
            decisions: [{ prompt: 'What comes next? Lost Spring · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Lost Spring · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_02_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a pre-reading strategy that equips.',
          hint: 'If stuck, revisit c11_eng_h_cbse_01_001 (Class 11 Hornbill Chapter 1 Before You Read) and.',
          misconception: 'Students often think *Lost Spring* is "just a story about poor children" and focus only on emotional pity.',
          parts: [
                { id: 'a', prompt: 'Explain why the 1971 Bangladesh Liberation War is critical background for understanding Saheb\'s community in Seemapuri.', answer: 'The 1971 war caused mass displacement',
                  options: ['The 1971 war caused mass displacement', 'they came for jobs', 'they are from Bihar', 'we would rather live here than in the fields that gave us no grain'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_001 (Class 11 Hornbill Chapter 1 Before You Read) and practise.',
                  misconception: 'Students often think *Lost Spring* is "just a story about poor children" and focus only on emotional pity.' },
                { id: 'b', prompt: 'Apply the concept of "hazardous industry" under the Child Labour (Prohibition and Regulation) Act to Mukesh\'s work in Firozabad\'s glass furnaces.', answer: 'Yes, it is illegal',
                  options: ['Yes, it is illegal', 'just a story about poor children', 'web of poverty'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_001 (Class 11 Hornbill Chapter 1 Before You Read) and practise.',
                  misconception: 'Students often think *Lost Spring* is "just a story about poor children" and focus only on emotional pity.' },
                { id: 'c', prompt: 'Analyse the metaphor "Seemapuri, a place on the periphery of Delhi yet miles away from it, metaphorically." What two distances does it measure?', answer: 'Physical distance: Seemapuri is geographically on Delhi\'s outskirts',
                  options: ['Physical distance: Seemapuri is geographically on Delhi\'s outskirts', 'wilderness', 'metaphorically', 'just a story about poor children'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_001 (Class 11 Hornbill Chapter 1 Before You Read) and practise.',
                  misconception: 'Students often think *Lost Spring* is "just a story about poor children" and focus only on emotional pity.' }
          ],
            remediations: { 'lost-spring-is-just-a': { steps: ['If a student cannot distinguish the two poverty traps or misses the journalistic genre: 1) Re-read the "About the.', '2) Create a two-column table: Seemapuri (Cause: 1971 migration, Work: ragpicking, Trap: statelessness) vs.', 'Firozabad (Cause: caste lineage, Work: bangle furnaces, Trap: middlemen-police nexus).', '3) Watch a 5-min documentary clip on Firozabad child labour (e.g., National Commission for Protection of Child Rights.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think *Lost Spring* is "just a story about poor children" and focus only on emotional pity.',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s choice to juxtapose Saheb\'s "garbage is gold" (wonder) with the elders\' "garbage is survival." Does this romanticise child labour.', answer: 'It exposes tragedy through irony',
                  options: ['It exposes tragedy through irony', 'it shows children are resilient/happy', 'carefree look', 'just a story about poor children'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_001 (Class 11 Hornbill Chapter 1 Before You Read) and practise.',
                  misconception: 'Students often think *Lost Spring* is "just a story about poor children" and focus only on emotional pity.' }
          ],
            remediations: { 'lost-spring-is-just-a': { steps: ['If a student cannot distinguish the two poverty traps or misses the journalistic genre: 1) Re-read the "About the.', '2) Create a two-column table: Seemapuri (Cause: 1971 migration, Work: ragpicking, Trap: statelessness) vs.', 'Firozabad (Cause: caste lineage, Work: bangle furnaces, Trap: middlemen-police nexus).', '3) Watch a 5-min documentary clip on Firozabad child labour (e.g., National Commission for Protection of Child Rights.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_02_002', difficulty: 'standard',
          question: 'Plot and Narrative Structure in "Lost Spring" refers to the author Anees Jung\'s.',
          hint: 'If stuck, revisit "Plot and Narrative Structure" from any Class 11 Hornbill/Woven Words.',
          misconception: 'Students treat "Lost Spring" as a conventional short story with a single protagonist, linear plot (exposition → climax.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and Narrative Structure in "Lost Spring" refers to the author Anees Jung\'s',
                  options: ['Plot and Narrative Structure in "Lost Spring" refers to the author Anees Jung\'s', '"Before You Read: Context and Background" is a pre-reading strategy that equips students', 'Setting refers to the time, place, and social environment in', 'Character analysis of the protagonist examines the central character\'s traits,'],
                  hint: 'If stuck, revisit "Plot and Narrative Structure" from any Class 11 Hornbill/Woven Words chapter.',
                  misconception: 'Students treat "Lost Spring" as a conventional short story with a single protagonist, linear plot (exposition → climax → resolution), and.' }
          ],
            remediations: { 'students-treat-lost-spring-as': { steps: ['Have the student create a two-column timeline: left column = Saheb\'s narrative beats (garbage → tea-stall), right.', 'Ask: "Where does the author appear in each column?" Mark every "I see/ask/wonder".', 'Ask: "Which beats are *observed* vs.', '*told* (e.g., the Udipi anecdote)?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_02_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a narrative.',
          hint: 'If stuck, revisit Class 8 "Atmosphere: Heat, Silence and Anticipation in the Jungle".',
          misconception: 'Students often treat setting as a static backdrop (e.g., "Seemapuri is a slum") rather than an active force that shapes.',
          parts: [
                { id: 'a', prompt: 'What are the two primary physical settings described in "Lost Spring," and what major industry or activity defines each?', answer: 'The two primary settings are Seemapuri (a slum on Delhi\'s periphery) defined by',
                  options: ['The two primary settings are Seemapuri (a slum on Delhi\'s periphery) defined by', 'only one setting or misidentifying the industry'],
                  hint: 'If stuck, revisit Class 8 "Atmosphere: Heat, Silence and Anticipation in the Jungle".',
                  misconception: 'Students often treat setting as a static backdrop (e.g., "Seemapuri is a slum") rather than an active force that shapes character and.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If a student cannot distinguish setting from atmosphere or link sensory details to thematic effect: 1) Have them reread.', '2) Ask them to complete a two-column table: "Detail from text" → "Feeling it creates in me." 3) Then guide them.', '4) Re-administer Diagnostic Question 4 as a check.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_02_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist examines the central character\'s traits.',
          hint: 'If unable to find textual evidence, return to c12_eng_f_cbse_02_002 (Plot) and annotate.',
          misconception: 'Students treat Saheb and Mukesh as interchangeable "poor children" and write identical character sketches for both.',
          parts: [
                { id: 'a', prompt: 'The text says: "The steel canister seems heavier than the plastic bag he would carry so lightly over his shoulder." Apply the concept of symbolism to explain.', answer: 'The plastic bag represents Saheb\'s freedom and ownership',
                  options: ['The plastic bag represents Saheb\'s freedom and ownership', 'describes only the physical weight difference misses the symbolic layer'],
                  hint: 'If unable to find textual evidence, return to c12_eng_f_cbse_02_002 (Plot) and annotate every.',
                  misconception: 'Students treat Saheb and Mukesh as interchangeable "poor children" and write identical character sketches for both.' },
                { id: 'b', prompt: 'Compare how Saheb and Mukesh each respond to their circumstances.', answer: 'Saheb internalizes helplessness',
                  options: ['Saheb internalizes helplessness', 'poor children'],
                  hint: 'If unable to find textual evidence, return to c12_eng_f_cbse_02_002 (Plot) and annotate every.',
                  misconception: 'Students treat Saheb and Mukesh as interchangeable "poor children" and write identical character sketches for both.' }
          ],
            remediations: { 'students-treat-saheb-and-mukesh': { steps: ['Re-read the two stories separately, highlighting every verb associated with Saheb (scrounging, mutters, running.', 'Create a two-column table: Saheb\'s verbs show passivity/reactivity; Mukesh\'s show volition.', 'Re-attempt Diagnostic Question 4 using only verb evidence.', 'If still stuck, revisit node c12_eng_f_cbse_02_002 (Plot and Narrative Structure) to map each boy\'s narrative arc.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_02_005', difficulty: 'standard',
          question: 'Supporting characters in "Lost Spring" are the secondary figures who surround.',
          hint: 'Review c12_eng_f_cbse_02_004 for protagonist profiles and c12_eng_f_cbse_02_001 for the.',
          misconception: 'Students often treat supporting characters as "background decoration" and write answers like "The grandmother shows.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in "Lost Spring" are the secondary figures who surround the',
                  options: ['Supporting characters in "Lost Spring" are the secondary figures who surround the', '"Before You Read: Context and Background" is a pre-reading strategy that equips students', 'Plot and Narrative Structure in "Lost Spring" refers to the author Anees Jung\'s', 'Setting refers to the time, place, and social environment in'],
                  hint: 'Review c12_eng_f_cbse_02_004 for protagonist profiles and c12_eng_f_cbse_02_001 for the migration.',
                  misconception: 'Students often treat supporting characters as "background decoration" and write answers like "The grandmother shows poverty is bad" or "The.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['If a student cannot move beyond plot-summary: 1.', 'Give them a two-column table: Column A = Supporting Character, Column B = Systemic Force They Represent (Caste.', 'Ask them to fill Column B for 5 characters using one textual quote per character.', 'Then have them write one PEEL paragraph: "The grandmother represents internalized caste oppression.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_02_006', difficulty: 'standard',
          question: 'The primary theme of "Lost Spring" is the systemic theft of childhood — how.',
          hint: 'If unable to synthesize theme across two narratives, return to c12_eng_f_cbse_02_002 and.',
          misconception: 'Students confuse THEME with TOPIC or MORAL. They write "The theme is child labour" or "The theme is we should help poor.',
          parts: [
                { id: 'a', prompt: 'What is the ONE sentence in the NCERT "About the Unit" box that explicitly states the primary theme of "Lost Spring"?', answer: '"The plight of street children forced into labour early in life and denied the',
                  options: ['"The plight of street children forced into labour early in life and denied the', 'A wrong answer (e.g', 'child labour is bad'],
                  hint: 'If unable to synthesize theme across two narratives, return to c12_eng_f_cbse_02_002 and create.',
                  misconception: 'Students confuse THEME with TOPIC or MORAL. They write "The theme is child labour" or "The theme is we should help poor children." The.' },
                { id: 'b', prompt: 'The author writes: "Promises like mine abound in every corner of his bleak world." Whose promises? What do these promises reveal about the primary theme?', answer: 'The narrator\'s (Anees Jung\'s) half-joking promise to start a school for Saheb',
                  options: ['The narrator\'s (Anees Jung\'s) half-joking promise to start a school for Saheb', 'it shows the author is kind', 'abound'],
                  hint: 'If unable to synthesize theme across two narratives, return to c12_eng_f_cbse_02_002 and create.',
                  misconception: 'Students confuse THEME with TOPIC or MORAL. They write "The theme is child labour" or "The theme is we should help poor children." The.' }
          ],
            remediations: { 'students-confuse-theme-with-topic': { steps: ['If the student cannot distinguish topic from theme: (1) Give them the NCERT "About the Unit" theme sentence.', '(2) Ask: "What three forces does this sentence name?', '(forced into labour, denied schooling, street children)." (3) Have them find ONE quote for Saheb and ONE for Mukesh.', '(4) Re-attempt Diagnostic Question 6.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
