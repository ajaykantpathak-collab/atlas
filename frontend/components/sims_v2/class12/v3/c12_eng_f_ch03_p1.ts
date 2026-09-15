import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch03_p1: SimDef = {
    id: 'v3_c12_eng_f_ch03_p1',
    title: 'Deep Water · Part 1/3',
    subtitle: 'A Supreme Court Justice\'s oldest opponent was nine feet of water',
    classLevel: 12, subject: 'eng_f', topic: 'Deep Water · Part 1/3',
    chapters: ['c12_eng_f_ch03'],
    nodeIds: ['c12_eng_f_cbse_03_001', 'c12_eng_f_cbse_03_002', 'c12_eng_f_cbse_03_003', 'c12_eng_f_cbse_03_004', 'c12_eng_f_cbse_03_005', 'c12_eng_f_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Narrative analyst', intro: 'Before he defended liberties on the Supreme Court, William Douglas had to win his freedom from a swimming pool.', goal: 'Read Deep Water as an autobiographical study of fear\'s origin, grip and methodical conquest.' },
    discovery: {
        question: 'The \'safe\' YMCA pool — shallow end, lifeguards nearby — is where Douglas nearly drowned, while the \'treacherous\' Yakima river never touched him. Why does that irony power the whole story?',
        options: ['Perceived safety dropped his guard — the controlled space becoming the trauma site makes the violation, and the fear it seeded, far sharper', 'Pools are more dangerous than rivers', 'He couldn\'t swim at all', 'The river was actually safe'],
        answer: 'Perceived safety dropped his guard — the controlled space becoming the trauma site makes the violation, and the fear it seeded, far sharper',
        hook: 'This isn\'t a swimming story — it\'s an autopsy of fear by a man who later sat 36 years on the US Supreme Court. Two events matter separately: the beach planted the aversion, the pool crystallised it. And the fear wasn\'t irrational — it was proportionate to nearly dying twice.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'The "Before You Read: Context and Background" section provides essential preliminary information about the author (William O.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace fear\'s full anatomy: separate the beach origin from the pool trauma, watch terror \'hold him firmly in its grip\', then follow the belt-and-pulley drills that dismantled it piece by piece.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_03_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are about to watch a movie based on a true story — you\'d want to know who the real person is, where it happened, and why it matters.',
            decisions: [{ prompt: 'Who is William O. Douglas, and what significant position did he hold in the US government?', options: [
                { text: 'William O', outcome: 'William O. Douglas (1898–1980) was an American jurist who served as an Associate Justice of the.' },
                { text: 'he was a swimming instructor', outcome: 'Not quite — Students often treat "Before You Read" as optional background trivia — skipping the author\'s.', reveals: 'students-often-treat-before-you' },
                { text: 'he wrote fiction novels', outcome: 'Not quite — Students often treat "Before You Read" as optional background trivia — skipping the author\'s.', reveals: 'students-often-treat-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_03_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a movie that starts with the hero drowning, then flashes back to show how he got there, then jumps forward to his training montage, and.',
            decisions: [{ prompt: 'Identify the inciting incident in "Deep Water" and explain why the California beach memory (father laughing as waves knock down 3-year-old.', options: [
                { text: 'The inciting incident is the big boy throwing Douglas into the deep end of the YMCA pool', outcome: 'The inciting incident is the big boy throwing Douglas into the deep end of the YMCA pool ("He.' },
                { text: 'the inciting incident is Douglas deciding to learn to swim', outcome: 'Not quite — Students believe "plot structure" means only listing events in order (first this happened, then.', reveals: 'plot-structure-means-only-listing' },
                { text: 'plot structure', outcome: 'Not quite — Students believe "plot structure" means only listing events in order (first this happened, then.', reveals: 'plot-structure-means-only-listing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_03_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re watching a movie where the hero nearly drowns — but the camera keeps cutting to the lifeguard who freezes, the bully who laughs, the coach who.',
            decisions: [{ prompt: 'List the four most significant supporting characters in "Deep Water" and state one specific action each takes that directly affects Douglas.', options: [
                { text: 'The four most significant supporting characters are: (1) The big bruiser boy', outcome: 'The four most significant supporting characters are: (1) The big bruiser boy — tosses Douglas into.' },
                { text: 'the YMCA pool', outcome: 'Not quite — Students treat supporting characters as *passive background* — e.g., "The instructor taught him.', reveals: 'students-treat-supporting-characters-as' },
                { text: 'the YMCA pool" as a character or omitting the instructor', outcome: 'Not quite — Students treat supporting characters as *passive background* — e.g., "The instructor taught him.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_03_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re standing at the edge of a pool, heart pounding, remembering a time you almost drowned — that visceral memory is exactly where Douglas begins.',
            decisions: [{ prompt: 'State the primary theme of "Deep Water" in one sentence, using the exact phrasing the chapter\'s final paragraph implies.', options: [
                { text: 'Correct answer: The primary theme is that fear itself', outcome: 'Correct answer: The primary theme is that fear itself — not the dangerous situation — is the true.' },
                { text: 'The theme is learning to swim', outcome: 'Not quite — Students often think the primary theme is "determination" or "perseverance" because Douglas.', reveals: 'the-primary-theme-is-determination' },
                { text: 'The theme is courage', outcome: 'Not quite — Students often think the primary theme is "determination" or "perseverance" because Douglas.', reveals: 'the-primary-theme-is-determination' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A college trek includes river wading, and a student who nearly drowned as a child wants to quit the whole trip rather than face the water.',
            decisions: [{ prompt: 'Following \'Deep Water\', what actually works?', options: [
                { text: 'Douglas\'s route — shrink the fear systematically: a trained instructor, shallow starts, staged practice, and honest testing until terror gives way to mastery.', outcome: 'Fear of fear itself is the real enemy; patient, deliberate exposure beat it for Douglas and generalises to any paralysing dread.' },
                { text: 'Throw him in the deep end — one plunge and the fear is gone.', outcome: 'A forced plunge is what created Douglas\'s phobia in the first place; trauma doesn\'t cure trauma.', reveals: 'brute-force-exposure' },
                { text: 'Avoidance is fine — simply never go near water again.', outcome: 'Douglas shows avoidance rules your life from the shadows; the fear wins every decision you don\'t make.', reveals: 'avoidance-cures-fear' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now read a near-drowning as a case study in will — where the victory isn\'t courage but systematic practice. That reframe is what elevates a board answer.',
            decisions: [{ prompt: 'What comes next? Deep Water · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Deep Water · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_03_001', difficulty: 'standard',
          question: 'The "Before You Read: Context and Background" section provides essential.',
          hint: 'If unsure about autobiographical analysis, review Class 11 Hornbill Chapter 1 node.',
          misconception: 'Students often treat "Before You Read" as optional background trivia — skipping the author\'s Supreme Court tenure, the.',
          parts: [
                { id: 'a', prompt: 'Who is William O. Douglas, and what significant position did he hold in the US government?', answer: 'William O',
                  options: ['William O', 'he was a swimming instructor', 'he wrote fiction novels'],
                  hint: 'If unsure about autobiographical analysis, review Class 11 Hornbill Chapter 1 node.',
                  misconception: 'Students often treat "Before You Read" as optional background trivia — skipping the author\'s Supreme Court tenure, the memoir source,.' }
          ],
            remediations: { 'students-often-treat-before-you': { steps: ['If the student cannot articulate the author\'s identity, the two traumas, or the safe-vs-treacherous setting contrast.', '(2) Draw a two-column table: "Beach (age 3-4)" vs.', '"Pool (age 10-11)" — fill in sensory details (waves vs.', 'tiles, father\'s laughter vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_03_002', difficulty: 'standard',
          question: 'Plot and narrative structure in "Deep Water" refers to the organization.',
          hint: 'If confused about narrative vs chronological order: Revisit c11_eng_w_cbse_02_002 (Woven.',
          misconception: 'Students believe "plot structure" means only listing events in order (first this happened, then that).',
          parts: [
                { id: 'a', prompt: 'Compare the narrative structure of the YMCA drowning sequence (paragraphs 7-18 in the text) with the Lake Wentworth swim (paragraph 24).', answer: 'The drowning sequence uses: short sentences ("I was frightened',
                  options: ['The drowning sequence uses: short sentences ("I was frightened', 'the second part is just happier', 'plot structure', 'climax'],
                  hint: 'If confused about narrative vs chronological order: Revisit c11_eng_w_cbse_02_002 (Woven Words.',
                  misconception: 'Students believe "plot structure" means only listing events in order (first this happened, then that).' }
          ],
            remediations: { 'plot-structure-means-only-listing': { steps: ['Have the student draw a timeline of CHRONOLOGICAL events (beach age 3 → YMCA age 10 → years of avoidance → instructor.', 'Have them draw a second timeline of NARRATIVE ORDER (beach flashback → YMCA incident → rescue → years compressed →.', 'Ask: "Why does Douglas show the beach memory RIGHT BEFORE the YMCA throw?" Guide to: "To prove the fear was already.', 'Re-attempt Diagnostic Question 1 and 4 with this dual-timeline visual.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "plot structure" means only listing events in order (first this happened, then that).',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of Douglas\'s frame structure: the essay opens with the adult Douglas reflecting on the meaning of his conquest ("The experience had.', answer: 'The frame ENHANCES authenticity by establishing the narrative as retrospective',
                  options: ['The frame ENHANCES authenticity by establishing the narrative as retrospective', 'it makes it feel fake', 'autobiography = no analysis', 'plot structure'],
                  hint: 'If confused about narrative vs chronological order: Revisit c11_eng_w_cbse_02_002 (Woven Words.',
                  misconception: 'Students believe "plot structure" means only listing events in order (first this happened, then that).' }
          ],
            remediations: { 'plot-structure-means-only-listing': { steps: ['Have the student draw a timeline of CHRONOLOGICAL events (beach age 3 → YMCA age 10 → years of avoidance → instructor.', 'Have them draw a second timeline of NARRATIVE ORDER (beach flashback → YMCA incident → rescue → years compressed →.', 'Ask: "Why does Douglas show the beach memory RIGHT BEFORE the YMCA throw?" Guide to: "To prove the fear was already.', 'Re-attempt Diagnostic Question 1 and 4 with this dual-timeline visual.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_03_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and physical environment in which.',
          hint: 'If unable to separate physical detail from psychological projection, practice with.',
          misconception: 'Students treat setting as a static "where" and atmosphere as a list of mood adjectives (scary, peaceful).',
          parts: [
                { id: 'a', prompt: 'Analyze how the atmosphere of the "Cascades lakes" phase (fishing trips) differs from the YMCA pool atmosphere despite both involving water.', answer: 'The YMCA pool atmosphere is acute, immediate, visceral panic *in the moment* of',
                  options: ['The YMCA pool atmosphere is acute, immediate, visceral panic *in the moment* of', 'both are fear'],
                  hint: 'If unable to separate physical detail from psychological projection, practice with a simple.',
                  misconception: 'Students treat setting as a static "where" and atmosphere as a list of mood adjectives (scary, peaceful).' }
          ],
            remediations: { 'students-treat-setting-as-a': { steps: ['If a student cannot distinguish setting from atmosphere or track atmospheric shifts: (1) Have them reread only the YMCA.', '(2) Ask them to read the same passage aloud twice — first in a calm voice, then in a panicked voice — to hear how.', '(3) Have them complete a two-column table: "Physical Detail" vs.', '"Psychological Effect" for 5 details.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_03_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist examines the central figure\'s personality.',
          hint: 'Review "first-person narrative perspective" from c9_engl_ch1_007 (Grandmother\'s literacy.',
          misconception: 'Students treat Douglas as a passive victim who "got over it" rather than an active agent who ENGINEERED his recovery.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist examines the central figure\'s personality traits,',
                  options: ['Character analysis of the protagonist examines the central figure\'s personality traits,', 'The "Before You Read: Context and Background" section provides essential preliminary', 'Plot and narrative structure in "Deep Water" refers to the organization of events in', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'Review "first-person narrative perspective" from c9_engl_ch1_007 (Grandmother\'s literacy journey).',
                  misconception: 'Students treat Douglas as a passive victim who "got over it" rather than an active agent who ENGINEERED his recovery.' }
          ],
            remediations: { 'students-treat-douglas-as-a': { steps: ['Have the student create a three-column timeline: Phase | Age | Key Actions | Internal State (use text quotes).', 'Ask: "What specific step did the instructor teach FIRST?', 'Why that order?" (Answer: belt support → face under/exhale → kicking → integration — physiological before.', 'Assign: Rewrite the "bruiser boy" paragraph (Diagnostic 6) but from the INSTRUCTOR\'s perspective.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_03_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters examines how secondary figures in.',
          hint: 'Revisit c11_eng_h_cbse_01_005 (Character Analysis: Supporting Characters) for the.',
          misconception: 'Students treat supporting characters as *passive background* — e.g., "The instructor taught him to swim" (flat summary).',
          parts: [
                { id: 'a', prompt: 'List the four most significant supporting characters in "Deep Water" and state one specific action each takes that directly affects Douglas.', answer: 'The four most significant supporting characters are: (1) The big bruiser boy',
                  options: ['The four most significant supporting characters are: (1) The big bruiser boy', 'the YMCA pool', 'the YMCA pool" as a character or omitting the instructor'],
                  hint: 'Revisit c11_eng_h_cbse_01_005 (Character Analysis: Supporting Characters) for the.',
                  misconception: 'Students treat supporting characters as *passive background* — e.g., "The instructor taught him to swim" (flat summary) instead of "The.' },
                { id: 'b', prompt: 'Explain in your own words how the swimming instructor\'s method reflects the theme "fear is conquered through systematic, incremental effort." Use two textual.', answer: 'The instructor breaks swimming into isolated components',
                  options: ['The instructor breaks swimming into isolated components', 'he taught him to swim'],
                  hint: 'Revisit c11_eng_h_cbse_01_005 (Character Analysis: Supporting Characters) for the.',
                  misconception: 'Students treat supporting characters as *passive background* — e.g., "The instructor taught him to swim" (flat summary) instead of "The.' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['If a student cannot move beyond plot-summary: (1) Give them a two-column table: Column A = "Character Action/Dialogue".', '(2) Have them fill it for the bruiser, instructor, mother, father using *only* text evidence.', '(3) Then ask: "If you removed this character, what specific stage of Douglas\'s fear/conquest would collapse?" (4).', 'This forces the shift from *who did what* to *what they represent in the architecture of fear*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_03_006', difficulty: 'standard',
          question: 'The primary theme of "Deep Water" is the conquest of fear through deliberate.',
          hint: 'If stuck, return to c12_eng_f_cbse_03_002 and map the three acts on a timeline: label.',
          misconception: 'Students often think the primary theme is "determination" or "perseverance" because Douglas practices for months.',
          parts: [
                { id: 'a', prompt: 'State the primary theme of "Deep Water" in one sentence, using the exact phrasing the chapter\'s final paragraph implies.', answer: 'Correct answer: The primary theme is that fear itself',
                  options: ['Correct answer: The primary theme is that fear itself', 'The theme is learning to swim', 'The theme is courage', 'determination'],
                  hint: 'If stuck, return to c12_eng_f_cbse_03_002 and map the three acts on a timeline: label each act with.',
                  misconception: 'Students often think the primary theme is "determination" or "perseverance" because Douglas practices for months.' },
                { id: 'b', prompt: 'Explain in your own words why Douglas includes the childhood beach incident (California, age 3-4) before the YMCA pool incident.', answer: 'Correct answer: The beach incident establishes that Douglas\'s fear of water is',
                  options: ['Correct answer: The beach incident establishes that Douglas\'s fear of water is', 'It gives background', 'determination', 'perseverance'],
                  hint: 'If stuck, return to c12_eng_f_cbse_03_002 and map the three acts on a timeline: label each act with.',
                  misconception: 'Students often think the primary theme is "determination" or "perseverance" because Douglas practices for months.' },
                { id: 'c', prompt: 'Analyze how the final three verification swims (pool alone, Lake Wentworth, Warm Lake) escalate in psychological difficulty.', answer: 'Correct answer: The pool alone tests residual terror in a known environment',
                  options: ['Correct answer: The pool alone tests residual terror in a known environment', 'determination', 'perseverance'],
                  hint: 'If stuck, return to c12_eng_f_cbse_03_002 and map the three acts on a timeline: label each act with.',
                  misconception: 'Students often think the primary theme is "determination" or "perseverance" because Douglas practices for months.' }
          ],
            remediations: { 'the-primary-theme-is-determination': { steps: ['If the student confuses plot with theme: (1) Have them reread the final two paragraphs only.', '(2) Ask: "What does Douglas say the experience *meant*?" (3) Have them list three things the essay is NOT about (e.g.', '(4) Then ask: "What single psychological truth remains?" Guide them to "fear itself is the enemy." Re-diagnostic: Ask.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
