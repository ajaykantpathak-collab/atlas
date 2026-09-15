import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch07_p1: SimDef = {
    id: 'v3_c11_ps_ch07_p1',
    title: 'Nationalism · Part 1/2',
    subtitle: 'Learn why \'imagined\' communities are real — and nations needn\'t be uniform.',
    classLevel: 11, subject: 'political_science', topic: 'Nationalism · Part 1/2',
    chapters: ['c11_ps_ch07'],
    nodeIds: ['c11_ps_cbse_07_001', 'c11_ps_cbse_07_002', 'c11_ps_cbse_07_003', 'c11_ps_cbse_07_004', 'c11_ps_cbse_07_005', 'c11_ps_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a theorist separating the nation from the state', intro: 'You\'ve never met a hundred million fellow citizens, yet you share a nation with them — that act of imagination is the community.', goal: 'Distinguish nation from state and evaluate value-based versus culture-based nationalism.' },
    discovery: {
        question: 'Benedict Anderson called the nation an \'imagined community\' — so nations are fake?',
        options: ['No — \'imagined\' means built through shared identification by people who\'ll never meet; constructed isn\'t fictional', 'Yes — imagination is fantasy', 'Yes — only shared blood makes a real nation', 'No — India is the exception that\'s real'],
        answer: 'No — \'imagined\' means built through shared identification by people who\'ll never meet; constructed isn\'t fictional',
        hook: 'And a nation isn\'t a state — India\'s nationhood doesn\'t need one language or one religion; the democratic claim is that political values, not cultural sameness, bind it.',
    },
    teaching: [
        { title: 'What is a nation: Shared identity and imagined community', text: 'A nation is an imagined political community constituted by shared beliefs, a sense of continuing historical identity, identification with a specific territory, and shared political ideals (such.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_07_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Test \'the Indian nation was born on 15 August 1947\' against continuing historical identity, then assess whether shared political ideals can hold a multi-ethnic nation.',
        labels: ['What is a nation', 'Nationalism: The ideology that', 'Civic nationalism vs ethnic', 'Rise of nationalism', 'Benedict Anderson: Imagined communities', 'National self-determination: Wilson'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_07_001', title: 'What is a nation: Shared identity and imagined community',
          caseStudy: { intro: 'Begin with a relatable scenario: "When India plays Pakistan in cricket, millions of Indians who have never met each other cheer as one.',
            decisions: [{ prompt: 'Define "nation" as an "imagined community" in one precise sentence. What does "imagined" mean in this specific political science context?', options: [
                { text: 'A nation is an imagined community', outcome: 'A nation is an imagined community because its members will never know most fellow members, yet they.' },
                { text: 'imagined means fake', outcome: 'Not quite — Students equate "imagined community" with "fake community" and believe Benedict Anderson meant.', reveals: 'students-equate-imagined-community-with' },
                { text: 'nation is based on common blood', outcome: 'Not quite — Students equate "imagined community" with "fake community" and believe Benedict Anderson meant.', reveals: 'students-equate-imagined-community-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_07_002', title: 'Nationalism: The ideology that the nation should be the basis of the state',
          caseStudy: { intro: 'Imagine you are watching the Republic Day parade: military contingents, cultural tableaux from states, the Prime Minister addressing the nation.',
            decisions: [{ prompt: 'Define nationalism in one precise sentence that distinguishes it from patriotism or cultural pride, using the core ideological claim about.', options: [
                { text: 'Nationalism is the ideology that the nation—a community defined by shared beliefs,', outcome: 'Nationalism is the ideology that the nation—a community defined by shared beliefs, history.' },
                { text: 'nationalism is love for one\'s country', outcome: 'Not quite — Students conflate "nation" (cultural/ethnic community) with "state" (political/legal entity) and.', reveals: 'students-conflate-nation-cultural-ethnic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_07_003', title: 'Civic nationalism vs ethnic nationalism',
          caseStudy: { intro: 'Imagine a heated classroom debate: one student argues that "true Indians" must speak Hindi and follow Hindu traditions, while another insists that anyone who.',
            decisions: [{ prompt: 'Define civic nationalism and ethnic nationalism in one sentence each, highlighting the core basis of membership for each.', options: [
                { text: 'Civic nationalism bases national membership on shared political values (democracy,', outcome: 'Civic nationalism bases national membership on shared political values (democracy, constitutional.' },
                { text: 'colour-blind', outcome: 'Not quite — Students often believe that civic nationalism requires abandoning one\'s culture, language,.', reveals: 'civic-nationalism-requires-abandoning-one' },
                { text: 'civic nationalism is about common language', outcome: 'Not quite — Students often believe that civic nationalism requires abandoning one\'s culture, language,.', reveals: 'civic-nationalism-requires-abandoning-one' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_07_004', title: 'Rise of nationalism in Europe: French Revolution and aftermath',
          caseStudy: { intro: 'Imagine you\'re watching the Republic Day parade: the flag, the anthem, the marching contingents—all symbols that make you feel \'Indian\'.',
            decisions: [{ prompt: 'What specific phrase in the 1789 Declaration of the Rights of Man and of the Citizen legally enshrined the principle that sovereignty.', options: [
                { text: 'Article 3: "The principle of all sovereignty resides essentially in the nation', outcome: 'Article 3: "The principle of all sovereignty resides essentially in the nation.' },
                { text: 'A wrong answer (e.g., citing', outcome: 'Not quite — Students often think nationalism in Europe began *because* of shared language/culture (ethnic.', reveals: 'nationalism-in-europe-began-because' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_07_005', title: 'Benedict Anderson: Imagined communities and print capitalism',
          caseStudy: { intro: 'Imagine you are scrolling through a Hindi or Marathi news app on your phone right now.',
            decisions: [{ prompt: 'According to Benedict Anderson, what are the three key characteristics that define a nation as an "imagined community"?', options: [
                { text: 'A nation is imagined as **limited** (finite, bounded boundaries), **sovereign**', outcome: 'A nation is imagined as **limited** (finite, bounded boundaries), **sovereign** (conceived in.' },
                { text: 'common language, religion, or race', outcome: 'Not quite — Students often think "Print Capitalism" just means "the printing press spread nationalist ideas.".', reveals: 'print-capitalism-just-means-the' },
                { text: 'Print Capitalism', outcome: 'Not quite — Students often think "Print Capitalism" just means "the printing press spread nationalist ideas.".', reveals: 'print-capitalism-just-means-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_07_006', title: 'National self-determination: Wilson and the post-WWI settlement',
          caseStudy: { intro: 'Imagine you see a news report about a region demanding a separate country because its people speak a different language and have a distinct history—like the.',
            decisions: [{ prompt: 'What was the core idea of "national self-determination" as articulated in Woodrow Wilson\'s Fourteenth Point (1918), and which major empires.', options: [
                { text: 'Wilson\'s Fourteenth Point declared that "a general association of nations must be formed"', outcome: 'Wilson\'s Fourteenth Point declared that "a general association of nations must be formed".' },
                { text: 'national self-determination', outcome: 'Not quite — Students often believe that "national self-determination" automatically means *every* cultural.', reveals: 'national-self-determination-automatically-means' },
                { text: 'the British or French empires as dismantled—', outcome: 'Not quite — Students often believe that "national self-determination" automatically means *every* cultural.', reveals: 'national-self-determination-automatically-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_07_001', title: 'A real-world call',
          caseStudy: { intro: 'A talented student-athlete can pursue professional sport — a short, uncertain career with a narrow peak — or a safer academic path that closes the sporting door.',
            decisions: [{ prompt: 'How should a young person weigh a dream against odds?', options: [
                { text: 'Take the shot — peak windows don\'t reopen', outcome: 'The dream argument — true, and honest only if there\'s a plan for the 99% who don\'t make it.' },
                { text: 'Take the safer path — the dream can be a hobby', outcome: 'The prudent argument; a sport pursued as a hobby is not the same as one pursued as a life.' },
                { text: 'Both for a defined window — set a real deadline', outcome: 'The bounded-bet answer — pursue the dream seriously until a chosen date, with a real fallback built, not imagined.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a Model UN briefing, a delegate argues: \'India isn\'t a real nation — too many languages and religions. Nations need one culture; Israel or Pakistan are real nations. And calling a nation an \'imagined community\' admits it\'s fake.\'',
            decisions: [{ prompt: 'What do nation and nationalism actually mean?', options: [
                { text: 'Correct both moves: \'imagined\' means socially constructed through shared symbols, memory and political ideals — not fictional; no member knows all others yet all feel they belong. Nations needn\'t be culturally homogeneous — India and Canada are the textbook\'s own examples of nations without a common language. And nation (community) ≠ state (institution): nationalism is the claim they SHOULD align, while civic nationalism redefines the nation politically so multiple cultures share one state.', outcome: 'The briefing reframes: India\'s diversity doesn\'t disqualify it — civic, not ethnic, nationhood is what lets many communities share one polity.' },
                { text: 'Concede — one language, one religion, one nation is the natural model.', outcome: 'That\'s the ethnic-only view the theory rejects: nations cohere around shared ideals and belonging, not shared descent — homogeneity is one route, not a requirement.', reveals: 'nation-needs-one-culture' },
                { text: 'Accept \'imagined = fake\' — if it\'s constructed, it\'s not real.', outcome: 'Constructed isn\'t fictitious: money and borders are also constructed yet organize real life — the point is that nations are made through shared narratives, not discovered in blood.', reveals: 'imagined-means-fake' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Nationalism says nation and state should align; democracy replies that the alignment can be forged from constitutional commitment, not ancestry.',
            decisions: [{ prompt: 'What comes next? Nationalism · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Nationalism · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_07_001', difficulty: 'standard',
          question: 'A nation is an imagined political community constituted by shared beliefs,.',
          hint: 'If stuck on "imagined = fake", revisit c10_hist_cbse_02_008 (symbols creating real.',
          misconception: 'Students equate "imagined community" with "fake community" and believe Benedict Anderson meant nations are illusions.',
          parts: [
                { id: 'a', prompt: 'Define "nation" as an "imagined community" in one precise sentence. What does "imagined" mean in this specific political science context?', answer: 'A nation is an imagined community',
                  options: ['A nation is an imagined community', 'imagined means fake', 'nation is based on common blood', 'true nations'],
                  hint: 'If stuck on "imagined = fake", revisit c10_hist_cbse_02_008 (symbols creating real solidarity among.',
                  misconception: 'Students equate "imagined community" with "fake community" and believe Benedict Anderson meant nations are illusions.' },
                { id: 'b', prompt: 'The NCERT states: "Neither descent, nor language, nor religion or ethnicity can claim to be a common factor in nationalisms all over the world." Using Canada.', answer: 'Canada has English and French speakers',
                  options: ['Canada has English and French speakers', 'India\'s nationhood comes from Hinduism', 'Canada is not a real nation', 'true nations'],
                  hint: 'If stuck on "imagined = fake", revisit c10_hist_cbse_02_008 (symbols creating real solidarity among.',
                  misconception: 'Students equate "imagined community" with "fake community" and believe Benedict Anderson meant nations are illusions.' }
          ],
            remediations: { 'students-equate-imagined-community-with': { steps: ['Show the Republic Day parade video — ask: "Do these soldiers know each other? Then why do they die for \'India\'?"', 'Contrast with a family reunion — "Here you know everyone. Nation is the opposite: solidarity among strangers."', 'Use India\'s 22 languages/major religions as proof that cultural homogeneity is absent.', 'Read Preamble aloud — "We, the people of India..." — highlight: the *political act of constituting ourselves* creates.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "imagined community" with "fake community" and believe Benedict Anderson meant nations are illusions.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Indian nation was born on August 15, 1947." Use the concept of "continuing historical identity" to justify your answer.', answer: 'The statement is partially true but incomplete',
                  options: ['The statement is partially true but incomplete', 'India became a nation only after Independence', 'true nations'],
                  hint: 'If stuck on "imagined = fake", revisit c10_hist_cbse_02_008 (symbols creating real solidarity among.',
                  misconception: 'Students equate "imagined community" with "fake community" and believe Benedict Anderson meant nations are illusions.' }
          ],
            remediations: { 'students-equate-imagined-community-with': { steps: ['Show the Republic Day parade video — ask: "Do these soldiers know each other? Then why do they die for \'India\'?"', 'Contrast with a family reunion — "Here you know everyone. Nation is the opposite: solidarity among strangers."', 'Use India\'s 22 languages/major religions as proof that cultural homogeneity is absent.', 'Read Preamble aloud — "We, the people of India..." — highlight: the *political act of constituting ourselves* creates.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_07_002', difficulty: 'standard',
          question: 'Nationalism is a political ideology asserting that the nation—a community bound.',
          hint: 'Revisit c11_ps_cbse_07_001, specifically the "Shared Beliefs" and "Common Political.',
          misconception: 'Students conflate "nation" (cultural/ethnic community) with "state" (political/legal entity) and assume nationalism.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Nationalism is a political ideology asserting that the nation—a community bound by shared',
                  options: ['Nationalism is a political ideology asserting that the nation—a community bound by shared', 'A nation is an imagined political community constituted by shared beliefs, a sense of', 'Civic nationalism defines the nation as a political community bound by shared commitment', 'The French Revolution (1789) inaugurated modern European nationalism by transferring'],
                  hint: 'Revisit c11_ps_cbse_07_001, specifically the "Shared Beliefs" and "Common Political Identity".',
                  misconception: 'Students conflate "nation" (cultural/ethnic community) with "state" (political/legal entity) and assume nationalism *necessarily* means.' }
          ],
            remediations: { 'students-conflate-nation-cultural-ethnic': { steps: ['Re-read NCERT §7.2 "Nations and Nationalism," focusing on the four pillars—highlight each pillar in a different color.', 'Create a two-column table: "Cultural Markers" (language, religion, descent) vs.', 'Write a 3-sentence explanation of why the NCERT says "democracies need to emphasise loyalty to a set of values.', 'Discuss with a peer: "If India adopted \'one culture-one state,\' how many states would result?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_07_003', difficulty: 'standard',
          question: 'Civic nationalism defines the nation as a political community bound by shared.',
          hint: 'Re-read NCERT Chapter 7 Section 7.2 "Nations and Nationalism" focusing on the paragraph.',
          misconception: 'Students often believe that civic nationalism requires abandoning one\'s culture, language, or religion — that.',
          parts: [
                { id: 'a', prompt: 'Compare the Basque nationalist movement (described in the NCERT box) and the Indian nationalist movement led by the Congress.', answer: 'Similarities: Both claim a distinct historical identity (Basque autonomy',
                  options: ['Similarities: Both claim a distinct historical identity (Basque autonomy', 'ethnic', 'colour-blind'],
                  hint: 'Re-read NCERT Chapter 7 Section 7.2 "Nations and Nationalism" focusing on the paragraph "Common.',
                  misconception: 'Students often believe that civic nationalism requires abandoning one\'s culture, language, or religion — that it demands a "colour-blind".' }
          ],
            remediations: { 'civic-nationalism-requires-abandoning-one': { steps: ['If a student holds this misconception, take them through Article 29(1) ("Any section of citizens having a distinct.', 'shall have the right to establish and administer educational institutions of their choice").', 'Ask: "Do these articles protect culture or erase it?" Then contrast with the Sri Lankan Sinhala Only Act (1956) —.', 'Show that the ethnic model *caused* the cultural suppression civic nationalism seeks to prevent.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_07_004', difficulty: 'standard',
          question: 'The French Revolution (1789) inaugurated modern European nationalism.',
          hint: 'Revisit c11_ps_cbse_07_001 (definition of nation) and c10_hist_cbse_01_001 (French.',
          misconception: 'Students often think nationalism in Europe began *because* of shared language/culture (ethnic nationalism).',
          parts: [
                { id: 'a', prompt: 'What specific phrase in the 1789 Declaration of the Rights of Man and of the Citizen legally enshrined the principle that sovereignty resides in the nation?', answer: 'Article 3: "The principle of all sovereignty resides essentially in the nation',
                  options: ['Article 3: "The principle of all sovereignty resides essentially in the nation', 'A wrong answer (e.g., citing'],
                  hint: 'Revisit c11_ps_cbse_07_001 (definition of nation) and c10_hist_cbse_01_001 (French Revolution.',
                  misconception: 'Students often think nationalism in Europe began *because* of shared language/culture (ethnic nationalism).' }
          ],
            remediations: { 'nationalism-in-europe-began-because': { steps: ['Re-read Article 3 of the 1789 Declaration (sovereignty in the nation).', 'Compare the 1791 Constitution\'s *active/passive citizen* distinction with the 1793 Jacobin universal male suffrage—note.', 'Map the Confederation of the Rhine (1806) vs.', 'Holy Roman Empire (1806 dissolution) to see how French *administrative* acts created the territorial template for later.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_07_005', difficulty: 'standard',
          question: 'Benedict Anderson\'s theory of "imagined communities" argues that a nation is.',
          hint: 'Revisit c11_ps_cbse_07_001 ("What is a nation") to grasp the "imagined community".',
          misconception: 'Students often think "Print Capitalism" just means "the printing press spread nationalist ideas." **Specific Error:**.',
          parts: [
                { id: 'a', prompt: 'According to Benedict Anderson, what are the three key characteristics that define a nation as an "imagined community"?', answer: 'A nation is imagined as **limited** (finite, bounded boundaries), **sovereign**',
                  options: ['A nation is imagined as **limited** (finite, bounded boundaries), **sovereign**', 'common language, religion, or race', 'Print Capitalism', 'the printing press spread nationalist ideas'],
                  hint: 'Revisit c11_ps_cbse_07_001 ("What is a nation") to grasp the "imagined community" definition, and.',
                  misconception: 'Students often think "Print Capitalism" just means "the printing press spread nationalist ideas." **Specific Error:** They confuse the.' },
                { id: 'b', prompt: 'Apply Anderson\'s concept of "print capitalism" to explain why the *Bengal Gazette* (1780) or *Kesari* (1881) were more significant for Indian nationalism than.', answer: 'Manuscripts/Persian chronicles served narrow elites in a cosmopolitan language',
                  options: ['Manuscripts/Persian chronicles served narrow elites in a cosmopolitan language', 'spreading ideas', 'communication', 'print capitalism'],
                  hint: 'Revisit c11_ps_cbse_07_001 ("What is a nation") to grasp the "imagined community" definition, and.',
                  misconception: 'Students often think "Print Capitalism" just means "the printing press spread nationalist ideas." **Specific Error:** They confuse the.' },
                { id: 'c', prompt: 'Analyze how Anderson\'s "print capitalism" explains the *difference* between European dynastic realms (e.g., Austro-Hungarian Empire) and modern nation-states.', answer: 'Dynastic realms used **Latin** (sacred, universal, static) administered by a',
                  options: ['Dynastic realms used **Latin** (sacred, universal, static) administered by a', 'industrialization', 'French Revolution', 'Print Capitalism'],
                  hint: 'Revisit c11_ps_cbse_07_001 ("What is a nation") to grasp the "imagined community" definition, and.',
                  misconception: 'Students often think "Print Capitalism" just means "the printing press spread nationalist ideas." **Specific Error:** They confuse the.' }
          ],
            remediations: { 'print-capitalism-just-means-the': { steps: ['Re-read NCERT Section 7.2 ("A nation is to a great extent an \'imagined\' community") and the "Shared Beliefs".', 'Review Class 10 History nodes **c10_hist_cbse_05_002** (Gutenberg), **05_003** (Print Revolution), **05_009** (Print &.', 'Focus on the *material* changes: shift from manuscript to print, Latin to vernacular, elite to mass, patronage.', 'Do the "Simultaneity Exercise": Pick today\'s newspaper (print or app).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_07_006', difficulty: 'standard',
          question: 'National self-determination is the principle that a distinct nation—a group.',
          hint: 'Revisit c11_ps_cbse_07_001 (What is a nation) and c11_ps_cbse_07_003 (Civic vs ethnic.',
          misconception: 'Students often believe that "national self-determination" automatically means *every* cultural group has a right to its.',
          parts: [
                { id: 'a', prompt: 'Why did the attempt to implement the "one culture–one state" model after WWI lead to massive population transfers and minority crises, despite the League.', answer: 'Ethnic groups were thoroughly intermingled across Central/Eastern Europe',
                  options: ['Ethnic groups were thoroughly intermingled across Central/Eastern Europe', 'solved', 'national self-determination'],
                  hint: 'Revisit c11_ps_cbse_07_001 (What is a nation) and c11_ps_cbse_07_003 (Civic vs ethnic nationalism).',
                  misconception: 'Students often believe that "national self-determination" automatically means *every* cultural group has a right to its own independent.' },
                { id: 'b', prompt: 'Compare the *external* self-determination claimed by Basque nationalists (separate state) with the *internal* self-determination implemented in India\'s.', answer: 'Basque demand = external: secession from Spain to form a sovereign state',
                  options: ['Basque demand = external: secession from Spain to form a sovereign state', 'national self-determination'],
                  hint: 'Revisit c11_ps_cbse_07_001 (What is a nation) and c11_ps_cbse_07_003 (Civic vs ethnic nationalism).',
                  misconception: 'Students often believe that "national self-determination" automatically means *every* cultural group has a right to its own independent.' }
          ],
            remediations: { 'national-self-determination-automatically-means': { steps: ['Re-read NCERT §7.3, focusing on the paragraph beginning "Humanity paid a heavy price..." and the concluding paragraph.', 'Create a two-column table: "1919 Model (External)" vs.', '"Post-1945 Model (Internal)" listing *goal, mechanism, example, outcome*.', 'Watch a 5-min video on the Treaty of Versailles minority treaties (search "League of Nations minority treaties.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
