import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hist_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hist_ch01_p2: SimDef = {
    id: 'v3_c10_hist_ch01_p2',
    title: 'Rise of Nationalism in Europe · Part 2/2',
    subtitle: 'Follow one idea as it remade a whole continent\'s map',
    classLevel: 10, subject: 'history', topic: 'Rise of Nationalism in Europe · Part 2/2',
    chapters: ['c10_hist_ch01'],
    nodeIds: ['c10_hist_cbse_01_007', 'c10_hist_cbse_01_008', 'c10_hist_cbse_01_009', 'c10_hist_cbse_01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a correspondent tracing revolutions across 19th-century Europe', intro: 'In 1789 Paris crowds stormed a fortress and invented a new political word: citizen. Within decades, students in secret societies, artists painting allegories, and revolutionaries like Mazzini and Garibaldi were all chasing the same idea.', goal: 'Explain how the French Revolution birthed nationalism, how it spread through Europe, and how culture and revolution together unified Germany and Italy.' },
    discovery: {
        question: 'Before 1789, a Frenchman\'s loyalty belonged to his king and his region. After the Revolution, he was a \'citoyen\' of \'la patrie\' — saluting a tricolour and singing the Marseillaise. What did the Revolution actually invent?',
        options: ['The idea of the nation: a community of equal citizens bound by shared rights and symbols, not by obedience to a monarch', 'The world\'s first written constitution anywhere in history', 'Voting rights for every adult including women and the poor', 'The French language itself as a tool of unity'],
        answer: 'The idea of the nation: a community of equal citizens bound by shared rights and symbols, not by obedience to a monarch',
        hook: 'Kings ruled subjects; nations are made of citizens. France didn\'t just change rulers in 1789 — it changed what people felt they belonged to.',
    },
    teaching: [
        { title: 'Nationalism and the Unification of Germany (Role of Bismarck)', text: 'The unification of Germany (1866-1871) was the process by which the numerous independent German states, previously loosely associated in the German Confederation, were unified into the German Empire.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hist_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Watch Europe redraw itself: track how one revolution\'s ideas of nation and citizenship spread, collide with empires, and forge Germany and Italy out of dozens of fragments.',
        labels: ['Nationalism and the Unification', 'Visualising the Nation: Allegories', 'Nationalism and Imperialism', 'Causes and Consequences'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_hist_cbse_01_007', title: 'Nationalism and the Unification of Germany (Role of Bismarck)',
          caseStudy: { intro: 'Imagine you are standing before the Victory Column (Siegessäule) in Berlin — a monument built from captured cannon barrels of the three unification wars.',
            decisions: [{ prompt: 'In which year was the German Empire officially proclaimed, and where did the proclamation ceremony take place?', options: [
                { text: 'The German Empire was proclaimed on 18 January 1871 in the Hall of Mirrors at the Palace', outcome: 'The German Empire was proclaimed on 18 January 1871 in the Hall of Mirrors at the Palace.' },
                { text: 'Berlin, 1870', outcome: 'Not quite — Students believe Bismarck *planned* all three wars in advance as a master blueprint (the "master.', reveals: 'bismarck-planned-all-three-wars' },
                { text: 'Frankfurt, 1848', outcome: 'Not quite — Students believe Bismarck *planned* all three wars in advance as a master blueprint (the "master.', reveals: 'bismarck-planned-all-three-wars' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_01_008', title: 'Visualising the Nation: Allegories (Marianne, Germania)',
          caseStudy: { intro: 'Think of the image of Bharat Mata — a mother figure draped in a saffron sari, holding the national flag, standing on a map of India — that you see in school.',
            decisions: [{ prompt: 'Name the two most iconic visual attributes of Marianne that distinguish her as the allegory of the French Republic, and the two key.', options: [
                { text: 'Marianne: red Phrygian cap (bonnet rouge) symbolizing liberty from slavery, and the', outcome: 'Marianne: red Phrygian cap (bonnet rouge) symbolizing liberty from slavery, and the tricolour.' },
                { text: 'Goddess of Liberty', outcome: 'Not quite — Students frequently confuse Marianne with the generic "Goddess of Liberty" (e.g., the Statue.', reveals: 'students-frequently-confuse-marianne-with' },
                { text: 'symbols', outcome: 'Not quite — Students frequently confuse Marianne with the generic "Goddess of Liberty" (e.g., the Statue.', reveals: 'students-frequently-confuse-marianne-with' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_01_009', title: 'Nationalism and Imperialism: The Balkans Crisis',
          caseStudy: { intro: 'Imagine you are standing at the Latin Bridge in Sarajevo — the very spot where a 19-year-old Serbian nationalist, Gavrilo Princip, fired the shots that started.',
            decisions: [{ prompt: 'What was the immediate trigger for the Congress of Berlin in 1878, and which treaty did it revise?', options: [
                { text: 'The immediate trigger was the Russo-Turkish War (1877–78)', outcome: 'The immediate trigger was the Russo-Turkish War (1877–78), which ended with the Treaty of San.' },
                { text: 'Eastern Question', outcome: 'Not quite — Students believe the Balkans Crisis was "just ethnic hatreds" — ancient tribal conflicts that.', reveals: 'the-balkans-crisis-was-just' },
                { text: 'just ethnic hatreds', outcome: 'Not quite — Students believe the Balkans Crisis was "just ethnic hatreds" — ancient tribal conflicts that.', reveals: 'the-balkans-crisis-was-just' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_01_010', title: 'Causes and Consequences of Nationalist Tensions in the Balkans',
          caseStudy: { intro: 'Imagine you are visiting the Stari Most bridge in Mostar, Bosnia — a 16th-century Ottoman bridge destroyed in the 1990s wars and rebuilt as a symbol.',
            decisions: [{ prompt: 'Name the 1878 international conference that revised the Treaty of San Stefano and recognized the independence of Serbia, Montenegro, and.', options: [
                { text: 'The Congress of Berlin (1878)', outcome: 'The Congress of Berlin (1878). A wrong answer (e.g., Congress of Vienna 1815 or Treaty.' },
                { text: 'Balkan nationalism', outcome: 'Not quite — Students often think "Balkan nationalism" was a single unified movement.', reveals: 'balkan-nationalism-was-a-single' },
                { text: '"Balkan nationalism" was a single unified movement', outcome: 'Not quite — Students often think "Balkan nationalism" was a single unified movement.', reveals: 'balkan-nationalism-was-a-single' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a history debate, a student argues: \'A nation is just a group of people who share the same ancestors and language — nothing more.\' His opponent counters with what changed in France in 1789.',
            decisions: [{ prompt: 'What did the French Revolution add to the meaning of \'nation\'?', options: [
                { text: 'It turned subjects into citizens — the nation became a community of people bound by equal laws and shared sovereignty, where authority flows from the people themselves rather than from a king or a common bloodline. After 1789, belonging to France meant holding rights and a say in sovereignty, not merely sharing origins.', outcome: 'This is the modern meaning the Revolution created: the Declaration of the Rights of Man placed sovereignty in the nation, so the people — not the monarch — became the source of legitimate rule.' },
                { text: 'The first student is right — nations have always meant shared descent and language, and 1789 changed nothing about that.', outcome: 'That was the older meaning; the Revolution redefined the nation politically — as citizens under common laws and sovereignty — which is exactly why multi-language states can still be nations.', reveals: 'nation-equals-bloodline' },
                { text: '1789 only changed who ruled France — \'nation\' stayed a cultural word with no political meaning.', outcome: 'The Revolution fused the two: the nation became the very source of political authority, so the word carried a new legal and political force.', reveals: 'nation-has-no-politics' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_01_010', title: 'You made it',
          caseStudy: { intro: 'A flag, an anthem, uniform laws — nationalism was manufactured as deliberately as any machine. Europe spent a century living with the consequences.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hist_cbse_01_007', difficulty: 'standard',
          question: 'The unification of Germany (1866-1871) was the process by which the numerous.',
          hint: 'Revisit c10_hist_cbse_01_004 (Liberal Nationalism vs Conservatism) — specifically the.',
          misconception: 'Students believe Bismarck *planned* all three wars in advance as a master blueprint (the "master plan" myth).',
          parts: [
                { id: 'a', prompt: 'A historian argues: "The Zollverein made German unification inevitable; Bismarck merely harvested what economics had sown." Using evidence from 1834-1866.', answer: 'The Zollverein (1834) created economic unity excluding Austria, giving Prussia',
                  options: ['The Zollverein (1834) created economic unity excluding Austria, giving Prussia', 'master plan'],
                  hint: 'Revisit c10_hist_cbse_01_004 (Liberal Nationalism vs Conservatism) — specifically the Frankfurt.',
                  misconception: 'Students believe Bismarck *planned* all three wars in advance as a master blueprint (the "master plan" myth).' },
                { id: 'b', prompt: 'Compare the unification strategies of Cavour (Italy) and Bismarck (Germany).', answer: 'Similarities: Both used great-power diplomacy (Cavour with France at Plombières',
                  options: ['Similarities: Both used great-power diplomacy (Cavour with France at Plombières', 'master plan'],
                  hint: 'Revisit c10_hist_cbse_01_004 (Liberal Nationalism vs Conservatism) — specifically the Frankfurt.',
                  misconception: 'Students believe Bismarck *planned* all three wars in advance as a master blueprint (the "master plan" myth).' }
          ],
            remediations: { 'bismarck-planned-all-three-wars': { steps: ['Re-read the "Bismarck\'s Realpolitik" section in NCERT Class 10 (Chapter 1, pp.', 'Create a cause-effect flowchart for *each* war separately — start with the immediate trigger (not a pre-existing plan).', 'Compare with Cavour (c10_hist_cbse_01_006) — note Cavour *did* have a clearer long-term design (Plombières 1858), while.', 'Practice a 3-mark board question: "Explain how Bismarck isolated Austria before 1866" — answer must name the 1865.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Bismarck *planned* all three wars in advance as a master blueprint (the "master plan" myth).',
          parts: [
                { id: 'a', prompt: 'Construct a timeline-map annotation for a Class 10 student showing the territorial changes after each of the three unification wars (1864, 1866, 1870-71).', answer: 'A good answer shows: (1) 1864 Danish War',
                  options: ['A good answer shows: (1) 1864 Danish War', 'master plan'],
                  hint: 'Revisit c10_hist_cbse_01_004 (Liberal Nationalism vs Conservatism) — specifically the Frankfurt.',
                  misconception: 'Students believe Bismarck *planned* all three wars in advance as a master blueprint (the "master plan" myth).' }
          ],
            remediations: { 'bismarck-planned-all-three-wars': { steps: ['Re-read the "Bismarck\'s Realpolitik" section in NCERT Class 10 (Chapter 1, pp.', 'Create a cause-effect flowchart for *each* war separately — start with the immediate trigger (not a pre-existing plan).', 'Compare with Cavour (c10_hist_cbse_01_006) — note Cavour *did* have a clearer long-term design (Plombières 1858), while.', 'Practice a 3-mark board question: "Explain how Bismarck isolated Austria before 1866" — answer must name the 1865.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_01_008', difficulty: 'standard',
          question: 'Allegories of the nation are symbolic female figures — Marianne for France and.',
          hint: 'Revisit c10_hist_cbse_01_001 (French Revolution and the Idea of the Nation).',
          misconception: 'Students frequently confuse Marianne with the generic "Goddess of Liberty" (e.g., the Statue of Liberty), attributing.',
          parts: [
                { id: 'a', prompt: 'Why did 19th-century artists consistently choose a *female* figure to represent the nation, rather than a male warrior or king?', answer: 'The female figure represented the nation as "motherland"',
                  options: ['The female figure represented the nation as "motherland"', 'tradition', 'beauty', 'Goddess of Liberty'],
                  hint: 'Revisit c10_hist_cbse_01_001 (French Revolution and the Idea of the Nation) — specifically the.',
                  misconception: 'Students frequently confuse Marianne with the generic "Goddess of Liberty" (e.g., the Statue of Liberty), attributing the torch and tablet.' },
                { id: 'b', prompt: 'Compare the political message conveyed by Delacroix\'s "Liberty Leading the People" (1830) — where a bare-breasted Marianne leads fighters over a barricade.', answer: 'Delacroix\'s Marianne is revolutionary, chaotic, and participatory',
                  options: ['Delacroix\'s Marianne is revolutionary, chaotic, and participatory', 'Goddess of Liberty', 'symbols'],
                  hint: 'Revisit c10_hist_cbse_01_001 (French Revolution and the Idea of the Nation) — specifically the.',
                  misconception: 'Students frequently confuse Marianne with the generic "Goddess of Liberty" (e.g., the Statue of Liberty), attributing the torch and tablet.' }
          ],
            remediations: { 'students-frequently-confuse-marianne-with': { steps: ['Show the student two side-by-side images — Veit\'s 1848 Germania (Frankfurt Parliament) and a post-1871 imperial.', 'Ask them to list three visual differences (flag, crown, posture, background).', 'Connect each difference to a political shift: 1848 = popular sovereignty, liberal unity, hope; 1871 = Prussian.', 'Have them write a 3-sentence explanation: "The same allegory was redesigned because ______." This forces the student.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_01_009', difficulty: 'standard',
          question: 'The Balkans Crisis (1870s–1914) refers to the series of nationalist uprisings.',
          hint: 'If stuck, revisit the Congress of Berlin (1878) in node 007 — specifically Bismarck\'s.',
          misconception: 'Students believe the Balkans Crisis was "just ethnic hatreds" — ancient tribal conflicts that inevitably exploded.',
          parts: [
                { id: 'a', prompt: 'What was the immediate trigger for the Congress of Berlin in 1878, and which treaty did it revise?', answer: 'The immediate trigger was the Russo-Turkish War (1877–78)',
                  options: ['The immediate trigger was the Russo-Turkish War (1877–78)', 'Eastern Question', 'just ethnic hatreds', 'the Treaty of Versailles or the Crimean War'],
                  hint: 'If stuck, revisit the Congress of Berlin (1878) in node 007 — specifically Bismarck\'s role.',
                  misconception: 'Students believe the Balkans Crisis was "just ethnic hatreds" — ancient tribal conflicts that inevitably exploded.' },
                { id: 'b', prompt: 'A historian argues: "The Balkan Wars (1912–13) were a rehearsal for World War I." Using two specific pieces of evidence, evaluate this claim.', answer: 'Evidence supporting the claim: (1) The Balkan League (Serbia, Bulgaria, Greece,',
                  options: ['Evidence supporting the claim: (1) The Balkan League (Serbia, Bulgaria, Greece,', 'just ethnic hatreds'],
                  hint: 'If stuck, revisit the Congress of Berlin (1878) in node 007 — specifically Bismarck\'s role.',
                  misconception: 'Students believe the Balkans Crisis was "just ethnic hatreds" — ancient tribal conflicts that inevitably exploded.' }
          ],
            remediations: { 'the-balkans-crisis-was-just': { steps: ['Have the student map the ethnic-religious distribution of the Balkans in 1875 using a historical atlas — note the.', 'Compare the 1878 Treaty of Berlin\'s Article 23 (Austrian occupation of Bosnia) with the 1908 annexation decree.', 'Read a primary source: the 1912 Balkan League treaty (secret clauses partitioning Macedonia) — show it was a calculated.', 'Write a 100-word paragraph explaining why "ancient hatreds" is a historically inaccurate explanation for 1914.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_01_010', difficulty: 'standard',
          question: 'The Balkan Crisis (1870s–1914) refers to the series of nationalist uprisings.',
          hint: 'Revisit Node c10_hist_cbse_01_006 (Italian Unification) and c10_hist_cbse_01_007 (German.',
          misconception: 'Students often think "Balkan nationalism" was a single unified movement.',
          parts: [
                { id: 'a', prompt: 'Name the 1878 international conference that revised the Treaty of San Stefano and recognized the independence of Serbia, Montenegro, and Romania while placing.', answer: 'The Congress of Berlin (1878)',
                  options: ['The Congress of Berlin (1878)', 'Balkan nationalism', '"Balkan nationalism" was a single unified movement'],
                  hint: 'Revisit Node c10_hist_cbse_01_006 (Italian Unification) and c10_hist_cbse_01_007 (German.',
                  misconception: 'Students often think "Balkan nationalism" was a single unified movement.' }
          ],
            remediations: { 'balkan-nationalism-was-a-single': { steps: ['Draw a map of the Balkans (1878–1914) and color-code: Ottoman territories lost, new independent states (Serbia.', 'Create a 3-column table: Event | Primary Driver (Nationalism/Ottoman Decline/Great Power Rivalry) | Outcome.', 'Read the NCERT textbox "The Balkan Problem" (Chapter 1) and highlight every mention of "Austria," "Russia," "Serbia,".', 'Explain aloud: "Why did Austria fear Serbian expansion? Why did Russia support Serbia?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
