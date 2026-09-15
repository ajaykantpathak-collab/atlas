import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch07_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch07_p2: SimDef = {
    id: 'v3_c11_ps_ch07_p2',
    title: 'Nationalism · Part 2/2',
    subtitle: 'Learn why \'imagined\' communities are real — and nations needn\'t be uniform.',
    classLevel: 11, subject: 'political_science', topic: 'Nationalism · Part 2/2',
    chapters: ['c11_ps_ch07'],
    nodeIds: ['c11_ps_cbse_07_007', 'c11_ps_cbse_07_008', 'c11_ps_cbse_07_009', 'c11_ps_cbse_07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a theorist separating the nation from the state', intro: 'You\'ve never met a hundred million fellow citizens, yet you share a nation with them — that act of imagination is the community.', goal: 'Distinguish nation from state and evaluate value-based versus culture-based nationalism.' },
    discovery: {
        question: 'Benedict Anderson called the nation an \'imagined community\' — so nations are fake?',
        options: ['No — \'imagined\' means built through shared identification by people who\'ll never meet; constructed isn\'t fictional', 'Yes — imagination is fantasy', 'Yes — only shared blood makes a real nation', 'No — India is the exception that\'s real'],
        answer: 'No — \'imagined\' means built through shared identification by people who\'ll never meet; constructed isn\'t fictional',
        hook: 'And a nation isn\'t a state — India\'s nationhood doesn\'t need one language or one religion; the democratic claim is that political values, not cultural sameness, bind it.',
    },
    teaching: [
        { title: 'Nationalism in the anti-colonial struggle: India and beyond', text: 'Anti-colonial nationalism refers to the political ideology and mass mobilization where colonized peoples assert their collective right to self-determination and sovereign statehood against imperial.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_07_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Test \'the Indian nation was born on 15 August 1947\' against continuing historical identity, then assess whether shared political ideals can hold a multi-ethnic nation.',
        labels: ['Nationalism in the anti-colonial', 'Criticisms of nationalism: Tagore', 'Nationalism and pluralism: Accommodating', 'Patriotism vs nationalism: Distinctions'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_07_007', title: 'Nationalism in the anti-colonial struggle: India and beyond',
          caseStudy: { intro: 'Imagine you\'re watching the Republic Day parade: diverse regiments, languages, dances—all marching as "India." Now ask: how did this incredibly diverse.',
            decisions: [{ prompt: 'According to the NCERT textbook, which of the following is NOT presented as a common factor uniting all nations worldwide: common descent.', options: [
                { text: 'Correct answer: Common political ideals is NOT listed as a universal common factor', outcome: 'Correct answer: Common political ideals is NOT listed as a universal common factor; the textbook.' },
                { text: 'common descent', outcome: 'Not quite — Students often equate "anti-colonial nationalism" with "the Indian National Congress" or "Gandhi\'s.', reveals: 'students-often-equate-anti-colonial' },
                { text: 'imagined communities', outcome: 'Not quite — Students often equate "anti-colonial nationalism" with "the Indian National Congress" or "Gandhi\'s.', reveals: 'students-often-equate-anti-colonial' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_07_008', title: 'Criticisms of nationalism: Tagore and the dangers of chauvinism',
          caseStudy: { intro: 'Imagine a Class 11 student watching a heated social-media debate where one side equates questioning a government policy with "anti-nationalism," while the.',
            decisions: [{ prompt: 'What is the core distinction Tagore draws between \'patriotism\' and \'chauvinism\' in his critique of nationalism?', options: [
                { text: 'Tagore views patriotism as a love for one\'s country that is compatible with, and', outcome: 'Tagore views patriotism as a love for one\'s country that is compatible with, and subordinate to,.' },
                { text: 'anti-national', outcome: 'Not quite — Students often believe Tagore was "anti-national" or opposed India\'s independence movement because.', reveals: 'tagore-was-anti-national-or' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_07_007', title: 'A real-world call',
          caseStudy: { intro: 'A talented student-athlete can pursue professional sport — a short, uncertain career with a narrow peak — or a safer academic path that closes the sporting door.',
            decisions: [{ prompt: 'How should a young person weigh a dream against odds?', options: [
                { text: 'Take the shot — peak windows don\'t reopen', outcome: 'The dream argument — true, and honest only if there\'s a plan for the 99% who don\'t make it.' },
                { text: 'Take the safer path — the dream can be a hobby', outcome: 'The prudent argument; a sport pursued as a hobby is not the same as one pursued as a life.' },
                { text: 'Both for a defined window — set a real deadline', outcome: 'The bounded-bet answer — pursue the dream seriously until a chosen date, with a real fallback built, not imagined.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a Model UN briefing, a delegate argues: \'India isn\'t a real nation — too many languages and religions. Nations need one culture; Israel or Pakistan are real nations. And calling a nation an \'imagined community\' admits it\'s fake.\'',
            decisions: [{ prompt: 'What do nation and nationalism actually mean?', options: [
                { text: 'Correct both moves: \'imagined\' means socially constructed through shared symbols, memory and political ideals — not fictional; no member knows all others yet all feel they belong. Nations needn\'t be culturally homogeneous — India and Canada are the textbook\'s own examples of nations without a common language. And nation (community) ≠ state (institution): nationalism is the claim they SHOULD align, while civic nationalism redefines the nation politically so multiple cultures share one state.', outcome: 'The briefing reframes: India\'s diversity doesn\'t disqualify it — civic, not ethnic, nationhood is what lets many communities share one polity.' },
                { text: 'Concede — one language, one religion, one nation is the natural model.', outcome: 'That\'s the ethnic-only view the theory rejects: nations cohere around shared ideals and belonging, not shared descent — homogeneity is one route, not a requirement.', reveals: 'nation-needs-one-culture' },
                { text: 'Accept \'imagined = fake\' — if it\'s constructed, it\'s not real.', outcome: 'Constructed isn\'t fictitious: money and borders are also constructed yet organize real life — the point is that nations are made through shared narratives, not discovered in blood.', reveals: 'imagined-means-fake' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_07_010', title: 'You made it',
          caseStudy: { intro: 'Nationalism says nation and state should align; democracy replies that the alignment can be forged from constitutional commitment, not ancestry.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_07_007', difficulty: 'standard',
          question: 'Anti-colonial nationalism refers to the political ideology and mass.',
          hint: 'If stuck, revisit c11_ps_cbse_07_003 (civic vs ethnic nationalism) and c11_ps_cbse_07_005.',
          misconception: 'Students often equate "anti-colonial nationalism" with "the Indian National Congress" or "Gandhi\'s movements" as.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Anti-colonial nationalism refers to the political ideology and mass mobilization where',
                  options: ['Anti-colonial nationalism refers to the political ideology and mass mobilization where', 'A nation is an imagined political community constituted by shared beliefs, a sense of', 'Nationalism is a political ideology asserting that the nation—a community bound by shared', 'Civic nationalism defines the nation as a political community bound by shared commitment'],
                  hint: 'If stuck, revisit c11_ps_cbse_07_003 (civic vs ethnic nationalism) and c11_ps_cbse_07_005.',
                  misconception: 'Students often equate "anti-colonial nationalism" with "the Indian National Congress" or "Gandhi\'s movements" as a single unified.' }
          ],
            remediations: { 'students-often-equate-anti-colonial': { steps: ['Re-read NCERT pp.100-101 "Shared Beliefs" and "Common Political Identity" — list the four elements (belief, history.', 'Create a two-column table: "Congress Civic Nationalism" (Karachi Resolution 1931, Objectives Resolution 1946).', 'Read Tagore\'s "Nationalism in India" (1917) excerpt — highlight every instance where he contrasts "nation" with.', 'Answer: "Why did the Cabinet Mission Plan (1946) fail? Connect to the textbook\'s claim that \'it proved almost.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_07_008', difficulty: 'standard',
          question: 'Tagore\'s critique of nationalism identifies the danger when national identity.',
          hint: 'If stuck, re-read the "Shared Political Ideals" and "Common Political Identity".',
          misconception: 'Students often believe Tagore was "anti-national" or opposed India\'s independence movement because he criticized.',
          parts: [
                { id: 'a', prompt: 'What is the core distinction Tagore draws between \'patriotism\' and \'chauvinism\' in his critique of nationalism?', answer: 'Tagore views patriotism as a love for one\'s country that is compatible with, and',
                  options: ['Tagore views patriotism as a love for one\'s country that is compatible with, and', 'anti-national'],
                  hint: 'If stuck, re-read the "Shared Political Ideals" and "Common Political Identity" subsections in the.',
                  misconception: 'Students often believe Tagore was "anti-national" or opposed India\'s independence movement because he criticized nationalist rhetoric.' },
                { id: 'b', prompt: 'Why does Tagore describe the nation as a "mechanical organization" rather than an organic community, and what political consequence does he fear from this.', answer: 'Tagore calls the nation a "mechanical organization"',
                  options: ['Tagore calls the nation a "mechanical organization"', 'anti-national'],
                  hint: 'If stuck, re-read the "Shared Political Ideals" and "Common Political Identity" subsections in the.',
                  misconception: 'Students often believe Tagore was "anti-national" or opposed India\'s independence movement because he criticized nationalist rhetoric.' }
          ],
            remediations: { 'tagore-was-anti-national-or': { steps: ['If a student holds this misconception, assign a close reading of Tagore\'s 1917 lecture "Nationalism in India" alongside.', 'Andrews (1919) renouncing the knighthood.', 'Ask the student to list every instance where Tagore (a) affirms India\'s right to self-rule and (b) warns against.', 'Then have them write a one-paragraph synthesis: "Tagore wanted India free *so that* it could offer the world.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_07_009', difficulty: 'standard',
          question: 'Pluralism in the context of nationalism refers to the political principle that.',
          hint: 'If stuck, revisit c11_ps_cbse_07_003 (civic vs ethnic nationalism table) and Class 10.',
          misconception: 'Students often think \'pluralism\' means \'any cultural practice must be tolerated, even if it violates individual rights.',
          parts: [
                { id: 'a', prompt: 'Explain why the \'one culture-one state\' model, which was used to redraw boundaries after World War I, failed to create stable homogeneous nation-states.', answer: 'The model failed',
                  options: ['The model failed', 'it succeeded because Germany and Italy unified'],
                  hint: 'If stuck, revisit c11_ps_cbse_07_003 (civic vs ethnic nationalism table) and Class 10 Federalism.',
                  misconception: 'Students often think \'pluralism\' means \'any cultural practice must be tolerated, even if it violates individual rights (e.g., gender.' }
          ],
            remediations: { 'pluralism-means-any-cultural-practice': { steps: ['Re-read the textbook\'s distinction: "It would be dangerous if intolerant and homogenising forms of identity and.', 'Review Article 30(1) text: "right to establish and administer" — note \'administer\' does not mean \'immune from all law\'.', 'Study the *St. Stephen\'s College vs University of Delhi* (1992) case summary: the Court upheld minority character but.', 'Write a two-sentence distinction: "Group rights protect identity; they do not licence rights violations within the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_07_010', difficulty: 'standard',
          question: 'Patriotism is a defensive, inclusive attachment to one\'s political community.',
          hint: 'Revisit c11_ps_cbse_07_003 (civic vs ethnic nationalism) and c11_ps_cbse_07_008 (Tagore\'s.',
          misconception: 'Students believe \'patriotism = good, nationalism = bad\' is a settled moral binary, and that Tagore\'s critique means.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Patriotism is a defensive, inclusive attachment to one\'s political community grounded in',
                  options: ['Patriotism is a defensive, inclusive attachment to one\'s political community grounded in', 'A nation is an imagined political community constituted by shared beliefs, a sense of', 'Nationalism is a political ideology asserting that the nation—a community bound by shared', 'Civic nationalism defines the nation as a political community bound by shared commitment'],
                  hint: 'Revisit c11_ps_cbse_07_003 (civic vs ethnic nationalism) and c11_ps_cbse_07_008 (Tagore\'s critique).',
                  misconception: 'Students believe \'patriotism = good, nationalism = bad\' is a settled moral binary, and that Tagore\'s critique means he opposed the freedom.' }
          ],
            remediations: { 'patriotism-good': { steps: ['Re-read Tagore\'s 1917 essay \'Nationalism in India\' (excerpt in NCERT) — identify three specific fears he expresses.', 'Compare the Preamble\'s \'fraternity assuring the dignity of the individual\' with the Hindu Mahasabha\'s 1930s definition.', 'Apply this to a current debate (e.g., sedition law, UCC, farm laws) — ask: *Does the state\'s argument appeal.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
