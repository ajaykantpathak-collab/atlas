import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch02_p3: SimDef = {
    id: 'v3_c12_eng_f_ch02_p3',
    title: 'Lost Spring · Part 3/3',
    subtitle: 'Two cages, one stolen spring — poverty engineered, not accidental',
    classLevel: 12, subject: 'eng_f', topic: 'Lost Spring · Part 3/3',
    chapters: ['c12_eng_f_ch02'],
    nodeIds: ['c12_eng_f_cbse_02_013', 'c12_eng_f_cbse_02_014', 'c12_eng_f_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Investigative journalist', intro: 'A boy who should be in school wipes tables at a tea stall. This chapter asks why millions like him never get spring.', goal: 'Read Lost Spring as literary journalism exposing structural poverty, migration and caste-driven child labour.' },
    discovery: {
        question: 'Saheb calls ragpicking \'gold\' — a rupee glinting in a garbage heap. The elders call it survival. Is the author romanticising child labour?',
        options: ['No — the child\'s wonder beside the elder\'s trap exposes how poverty commodifies innocence itself', 'Yes — it shows children are happy working', 'Neither — it\'s just a description', 'The gold line is a metaphor for actual treasure'],
        answer: 'No — the child\'s wonder beside the elder\'s trap exposes how poverty commodifies innocence itself',
        hook: 'Lost Spring is journalism, not fiction — two different cages: stateless 1971 migrants in Seemapuri and caste-bound bangle families in Firozabad. Pity is the wrong lens; the text anatomises a system — middlemen, police, \'karam\' — that keeps law on paper and children at furnaces.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the ability to examine a text deeply by questioning underlying assumptions, evaluating evidence, synthesizing multiple perspectives, and drawing.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Investigate two stolen childhoods like a reporter: separate migrant statelessness from caste entrapment, weigh the laws that exist against the nexus that ignores them, and decode what the title\'s \'spring\' really lost.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are a journalist visiting Seemapuri or Firozabad today — what would you ask the children that Anees Jung didn\'t?',
            decisions: [{ prompt: 'Define \'critical interpretation\' in the context of studying a non-fiction narrative like "Lost Spring".', options: [
                { text: 'Critical interpretation involves analyzing the author\'s choices (selection of details,', outcome: 'Critical interpretation involves analyzing the author\'s choices (selection of details, narrative.' },
                { text: 'The author should have helped Saheb instead of writing about him', outcome: 'Not quite — Students often think critical analysis means criticizing the author or finding faults.', reveals: 'critical-analysis-means-criticizing-the' },
                { text: 'critical analysis means criticizing the author or finding faults', outcome: 'Not quite — Students often think critical analysis means criticizing the author or finding faults.', reveals: 'critical-analysis-means-criticizing-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a university admission interview and the panel asks: "You\'ve read about children in Firozabad\'s glass furnaces.',
            decisions: [{ prompt: 'Define "vicious circle of middlemen" as described in "Lost Spring" and name the three stakeholder groups that sustain it.', options: [
                { text: 'The vicious circle refers to the self-perpetuating exploitation where sahukars', outcome: 'The vicious circle refers to the self-perpetuating exploitation where sahukars (moneylenders).' },
                { text: 'poverty', outcome: 'Not quite — Students treat discussion as "sharing opinions" rather than "evidence-based collaborative.', reveals: 'students-treat-discussion-as-sharing' },
                { text: 'illiteracy', outcome: 'Not quite — Students treat discussion as "sharing opinions" rather than "evidence-based collaborative.', reveals: 'students-treat-discussion-as-sharing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'An NGO volunteer finds children feeding glass furnaces in a bangle-making town. The elders say, \'this is our ancestral craft — it\'s tradition.\'',
            decisions: [{ prompt: 'How should she respond?', options: [
                { text: 'Treat it as a structural trap, not a tradition: the work is hazardous child labour sustained by middlemen, debt and dead ends — so push schooling, enforcement and viable alternatives together.', outcome: 'Like Mukesh\'s Firozabad in \'Lost Spring\', \'tradition\' is how exploitation dresses itself up; a rescued child with no alternative goes straight back to the furnace.' },
                { text: 'Respect it — it\'s their culture, and outsiders shouldn\'t interfere.', outcome: 'That confuses inherited compulsion with chosen culture; the children themselves dream of garages and schools.', reveals: 'culture-excuse-for-exploitation' },
                { text: 'Just pull the children out this week — job done.', outcome: 'Rescue without alternatives returns them to the same economic trap; the system, not just the child, has to change.', reveals: 'rescue-without-alternative' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a lyrical reportage as structural evidence, not just a sad story. That pivot — from feeling to analysis — is what separates a full-marks answer from a plot summary.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_02_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the ability to examine a text.',
          hint: 'If stuck, return to c12_eng_f_cbse_02_009 (Irony and Symbolism) and re-analyze the steel.',
          misconception: 'Students often think critical analysis means criticizing the author or finding faults.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical Thinking: Analysis and Interpretation is the ability to examine a text deeply by',
                  options: ['Critical Thinking: Analysis and Interpretation is the ability to examine a text deeply by', '"Before You Read: Context and Background" is a pre-reading strategy that equips students', 'Plot and Narrative Structure in "Lost Spring" refers to the author Anees Jung\'s', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, return to c12_eng_f_cbse_02_009 (Irony and Symbolism) and re-analyze the steel canister.',
                  misconception: 'Students often think critical analysis means criticizing the author or finding faults.' }
          ],
            remediations: { 'critical-analysis-means-criticizing-the': { steps: ['Re-read the two endings (Saheb with the steel canister, Mukesh staring at the ground) and annotate: what changed for.', 'List every binary opposition in the text (barefoot/shoes, garbage/gold, tradition/law, dream/reality).', 'For each, ask: who benefits from this opposition?', 'Write one paragraph explaining how the author uses these oppositions to argue that poverty is designed, not accidental.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_02_014', difficulty: 'standard',
          question: 'Writing Skills based on "Lost Spring" refers to the ability to compose.',
          hint: 'If format recall fails: revise Class 11 Writing Skills nodes (c11_eng_h_cbse_01_014.',
          misconception: 'Students treat "Writing Skills based on the chapter" as **summary writing**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Writing Skills based on "Lost Spring" refers to the ability to compose structured,',
                  options: ['Writing Skills based on "Lost Spring" refers to the ability to compose structured,', '"Before You Read: Context and Background" is a pre-reading strategy that equips students', 'Plot and Narrative Structure in "Lost Spring" refers to the author Anees Jung\'s', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If format recall fails: revise Class 11 Writing Skills nodes (c11_eng_h_cbse_01_014, 02_014) using.',
                  misconception: 'Students treat "Writing Skills based on the chapter" as **summary writing**.' }
          ],
            remediations: { 'students-treat-writing-skills-based': { steps: ['**Diagnose:** Ask student to highlight every textual reference in their draft.', 'If <3 specific details (names, places, quotes, statistics from text), they are summarising.', '**Remediate:** Give a 2-column table: Column A = Chapter Evidence (e.g., "800 rupees + meals at tea stall", "bangles.', '**Re-write:** Student converts each row into one PEEL paragraph.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_02_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, re-read the "Talking about the text" section (NCERT p.19-20) and complete the.',
          misconception: 'Students treat discussion as "sharing opinions" rather than "evidence-based collaborative analysis." They say "I feel.',
          parts: [
                { id: 'a', prompt: 'Define "vicious circle of middlemen" as described in "Lost Spring" and name the three stakeholder groups that sustain it.', answer: 'The vicious circle refers to the self-perpetuating exploitation where sahukars',
                  options: ['The vicious circle refers to the self-perpetuating exploitation where sahukars', 'poverty', 'illiteracy', 'sharing opinions'],
                  hint: 'If stuck, re-read the "Talking about the text" section (NCERT p.19-20) and complete the.',
                  misconception: 'Students treat discussion as "sharing opinions" rather than "evidence-based collaborative analysis." They say "I feel bad for Mukesh".' }
          ],
            remediations: { 'students-treat-discussion-as-sharing': { steps: ['If a student cannot move beyond emotional responses: (1) Assign a "Text-to-System" mapping exercise: Create a 3-column.', '(2) Practice "Devil\'s Advocate" drills: Argue *against* Mukesh\'s dream using only text evidence (e.g., "garage is far,".', '(3) Revisit node c12_eng_f_cbse_02_007 (Secondary Themes) to re-learn the caste/poverty/state apathy triad, then.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_02_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat discussion as "sharing opinions" rather than "evidence-based collaborative analysis." They say "I feel.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Child labour can be eliminated in Firozabad simply by strictly enforcing the Child Labour Act." Defend or critique using textual.', answer: '**Critique**',
                  options: ['**Critique**', 'strict enforcement will work', 'sharing opinions', 'evidence-based collaborative analysis'],
                  hint: 'If stuck, re-read the "Talking about the text" section (NCERT p.19-20) and complete the.',
                  misconception: 'Students treat discussion as "sharing opinions" rather than "evidence-based collaborative analysis." They say "I feel bad for Mukesh".' }
          ],
            remediations: { 'students-treat-discussion-as-sharing': { steps: ['If a student cannot move beyond emotional responses: (1) Assign a "Text-to-System" mapping exercise: Create a 3-column.', '(2) Practice "Devil\'s Advocate" drills: Argue *against* Mukesh\'s dream using only text evidence (e.g., "garage is far,".', '(3) Revisit node c12_eng_f_cbse_02_007 (Secondary Themes) to re-learn the caste/poverty/state apathy triad, then.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
