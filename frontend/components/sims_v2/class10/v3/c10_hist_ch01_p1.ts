import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hist_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hist_ch01_p1: SimDef = {
    id: 'v3_c10_hist_ch01_p1',
    title: 'Rise of Nationalism in Europe · Part 1/2',
    subtitle: 'Follow one idea as it remade a whole continent\'s map',
    classLevel: 10, subject: 'history', topic: 'Rise of Nationalism in Europe · Part 1/2',
    chapters: ['c10_hist_ch01'],
    nodeIds: ['c10_hist_cbse_01_001', 'c10_hist_cbse_01_002', 'c10_hist_cbse_01_003', 'c10_hist_cbse_01_004', 'c10_hist_cbse_01_005', 'c10_hist_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a correspondent tracing revolutions across 19th-century Europe', intro: 'In 1789 Paris crowds stormed a fortress and invented a new political word: citizen. Within decades, students in secret societies, artists painting allegories, and revolutionaries like Mazzini and Garibaldi were all chasing the same idea.', goal: 'Explain how the French Revolution birthed nationalism, how it spread through Europe, and how culture and revolution together unified Germany and Italy.' },
    discovery: {
        question: 'Before 1789, a Frenchman\'s loyalty belonged to his king and his region. After the Revolution, he was a \'citoyen\' of \'la patrie\' — saluting a tricolour and singing the Marseillaise. What did the Revolution actually invent?',
        options: ['The idea of the nation: a community of equal citizens bound by shared rights and symbols, not by obedience to a monarch', 'The world\'s first written constitution anywhere in history', 'Voting rights for every adult including women and the poor', 'The French language itself as a tool of unity'],
        answer: 'The idea of the nation: a community of equal citizens bound by shared rights and symbols, not by obedience to a monarch',
        hook: 'Kings ruled subjects; nations are made of citizens. France didn\'t just change rulers in 1789 — it changed what people felt they belonged to.',
    },
    teaching: [
        { title: 'The French Revolution and the Idea of the Nation', text: 'The French Revolution (1789–1799) was a period of radical political and societal transformation in France that abolished the absolute monarchy, established a republic, and introduced the modern idea.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hist_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Watch Europe redraw itself: track how one revolution\'s ideas of nation and citizenship spread, collide with empires, and forge Germany and Italy out of dozens of fragments.',
        labels: ['The French Revolution', 'The Making of Nationalism', 'Liberal Nationalism vs Conservatism', 'The Revolutionaries: Secret Societies', 'Nationalism and the Unification'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_hist_cbse_01_001', title: 'The French Revolution and the Idea of the Nation',
          caseStudy: { intro: 'Imagine you are visiting the India Gate in Delhi or the Gateway of India in Mumbai – monuments built to commemorate soldiers of a \'nation\'.',
            decisions: [{ prompt: 'In which year did the French Revolution begin, and what event is considered its symbolic start?', options: [
                { text: 'The French Revolution began in 1789', outcome: 'The French Revolution began in 1789; its symbolic start is the Storming of the Bastille on July 14.' },
                { text: 'the French Revolution immediately created a stable, inclusive nation-state', outcome: 'Not quite — Students often think the French Revolution immediately created a stable, inclusive nation-state.', reveals: 'the-french-revolution-immediately-created' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_01_002', title: 'The Making of Nationalism in Europe: The Aristocracy and the Napoleonic Code',
          caseStudy: { intro: 'Imagine you are visiting the Rashtrapati Bhavan in Delhi and notice the blend of Mughal and British architectural styles — a physical reminder of how new.',
            decisions: [{ prompt: 'What was the primary legal document introduced by Napoleon in 1804 that standardized civil laws across France and its conquered territories?', options: [
                { text: 'The Napoleonic Code (Civil Code of 1804)', outcome: 'The Napoleonic Code (Civil Code of 1804). A wrong answer like "Declaration of the Rights of Man".' },
                { text: 'Declaration of the Rights of Man', outcome: 'Not quite — Students often believe the Napoleonic Code was welcomed everywhere as a \'liberation\' because.', reveals: 'the-napoleonic-code-was-welcomed' },
                { text: 'the Napoleonic Code was welcomed everywhere as a \'liberation\'', outcome: 'Not quite — Students often believe the Napoleonic Code was welcomed everywhere as a \'liberation\' because.', reveals: 'the-napoleonic-code-was-welcomed' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_01_003', title: 'The Making of Nationalism: The New Middle Class and Liberalism',
          caseStudy: { intro: 'Imagine you visit a historic court building in Mumbai — the High Court, built in 1878.',
            decisions: [{ prompt: 'Name the specific economic policy advocated by the European middle class to promote national unity in the German states before 1848.', options: [
                { text: 'The Zollverein (customs union) initiated by Prussia in 1834', outcome: 'The Zollverein (customs union) initiated by Prussia in 1834, which abolished tariff barriers among.' },
                { text: 'free trade with Britain', outcome: 'Not quite — Students think "middle class" means only factory owners/industrialists.', reveals: 'middle-class-means-only-factory' },
                { text: 'industrial protectionism', outcome: 'Not quite — Students think "middle class" means only factory owners/industrialists.', reveals: 'middle-class-means-only-factory' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_01_004', title: 'Liberal Nationalism vs Conservatism: Ideological Conflict',
          caseStudy: { intro: 'Imagine you are at India Gate in Delhi — a monument built by the British Empire to honour soldiers who died for a colonial power.',
            decisions: [{ prompt: 'What was the primary political goal of the Congress of Vienna (1815) regarding the map of Europe?', options: [
                { text: 'The Congress of Vienna aimed to restore the pre-Napoleonic monarchies and redraw', outcome: 'The Congress of Vienna aimed to restore the pre-Napoleonic monarchies and redraw boundaries.' },
                { text: 'to create nation-states based on ethnicity', outcome: 'Not quite — Students often think **"liberal nationalism" and "conservatism" were just two political parties.', reveals: 'liberal-nationalism-and-conservatism-were' },
                { text: 'liberal nationalism', outcome: 'Not quite — Students often think **"liberal nationalism" and "conservatism" were just two political parties.', reveals: 'liberal-nationalism-and-conservatism-were' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_01_005', title: 'The Revolutionaries: Secret Societies and the Carbonari',
          caseStudy: { intro: 'Imagine you are a student in 1820s Naples — you hear whispers of a secret group meeting in cellars, members recognising each other by a special handshake.',
            decisions: [{ prompt: 'In which Italian state did the Carbonari first emerge as a significant secret society, and during which decade did they lead their major.', options: [
                { text: 'The Carbonari first emerged as a significant force in the Kingdom of the Two Sicilies', outcome: 'The Carbonari first emerged as a significant force in the Kingdom of the Two Sicilies (Naples) and.' },
                { text: 'Piedmont in the 1830s', outcome: 'Not quite — Students believe the Carbonari were a single, centrally controlled organisation with a clear.', reveals: 'the-carbonari-were-a-single' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a history debate, a student argues: \'A nation is just a group of people who share the same ancestors and language — nothing more.\' His opponent counters with what changed in France in 1789.',
            decisions: [{ prompt: 'What did the French Revolution add to the meaning of \'nation\'?', options: [
                { text: 'It turned subjects into citizens — the nation became a community of people bound by equal laws and shared sovereignty, where authority flows from the people themselves rather than from a king or a common bloodline. After 1789, belonging to France meant holding rights and a say in sovereignty, not merely sharing origins.', outcome: 'This is the modern meaning the Revolution created: the Declaration of the Rights of Man placed sovereignty in the nation, so the people — not the monarch — became the source of legitimate rule.' },
                { text: 'The first student is right — nations have always meant shared descent and language, and 1789 changed nothing about that.', outcome: 'That was the older meaning; the Revolution redefined the nation politically — as citizens under common laws and sovereignty — which is exactly why multi-language states can still be nations.', reveals: 'nation-equals-bloodline' },
                { text: '1789 only changed who ruled France — \'nation\' stayed a cultural word with no political meaning.', outcome: 'The Revolution fused the two: the nation became the very source of political authority, so the word carried a new legal and political force.', reveals: 'nation-has-no-politics' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'A flag, an anthem, uniform laws — nationalism was manufactured as deliberately as any machine. Europe spent a century living with the consequences.',
            decisions: [{ prompt: 'What comes next? Rise of Nationalism in Europe · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Rise of Nationalism in Europe · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hist_cbse_01_001', difficulty: 'standard',
          question: 'The French Revolution (1789–1799) was a period of radical political and.',
          hint: 'If stuck, review the Three Estates system and the financial crisis of Louis XVI; contrast.',
          misconception: 'Students often think the French Revolution immediately created a stable, inclusive nation-state.',
          parts: [
                { id: 'a', prompt: 'In which year did the French Revolution begin, and what event is considered its symbolic start?', answer: 'The French Revolution began in 1789',
                  options: ['The French Revolution began in 1789', 'the French Revolution immediately created a stable, inclusive nation-state'],
                  hint: 'If stuck, review the Three Estates system and the financial crisis of Louis XVI; contrast with.',
                  misconception: 'Students often think the French Revolution immediately created a stable, inclusive nation-state.' },
                { id: 'b', prompt: 'Compare the French Revolution\'s idea of the nation with the earlier concept of a kingdom. What changed in the relationship between the people and the state?', answer: 'In a kingdom, subjects owed vertical allegiance to the monarch',
                  options: ['In a kingdom, subjects owed vertical allegiance to the monarch', 'only lists events (e', 'the French Revolution immediately created a stable, inclusive nation-state'],
                  hint: 'If stuck, review the Three Estates system and the financial crisis of Louis XVI; contrast with.',
                  misconception: 'Students often think the French Revolution immediately created a stable, inclusive nation-state.' }
          ],
            remediations: { 'the-french-revolution-immediately-created': { steps: ['Re-read the Declaration of the Rights of Man and Citizen (1789) and identify who is included (\'Men are born and remain.', 'Compare with the 1791 Constitution\'s distinction between active and passive citizens.', 'Examine Olympe de Gouges\' Declaration of the Rights of Woman (1791) to see the exclusion.', 'Note that slavery was abolished in 1794 but reinstated by Napoleon in 1802.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the French Revolution immediately created a stable, inclusive nation-state.',
          parts: [
                { id: 'a', prompt: 'Assess the claim: \'The French Revolution created the modern nation-state but excluded women and slaves from full citizenship.\' Provide evidence.', answer: 'The claim is accurate',
                  options: ['The claim is accurate', 'the French Revolution immediately created a stable, inclusive nation-state'],
                  hint: 'If stuck, review the Three Estates system and the financial crisis of Louis XVI; contrast with.',
                  misconception: 'Students often think the French Revolution immediately created a stable, inclusive nation-state.' },
                { id: 'b', prompt: 'Construct a timeline of 5 key events from 1789–1799 that show the evolution of the idea of the nation in France. Justify your selection.', answer: 'A strong answer selects events like: Estates-General (May 1789) – nation claims',
                  options: ['A strong answer selects events like: Estates-General (May 1789) – nation claims', 'the French Revolution immediately created a stable, inclusive nation-state'],
                  hint: 'If stuck, review the Three Estates system and the financial crisis of Louis XVI; contrast with.',
                  misconception: 'Students often think the French Revolution immediately created a stable, inclusive nation-state.' }
          ],
            remediations: { 'the-french-revolution-immediately-created': { steps: ['Re-read the Declaration of the Rights of Man and Citizen (1789) and identify who is included (\'Men are born and remain.', 'Compare with the 1791 Constitution\'s distinction between active and passive citizens.', 'Examine Olympe de Gouges\' Declaration of the Rights of Woman (1791) to see the exclusion.', 'Note that slavery was abolished in 1794 but reinstated by Napoleon in 1802.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_01_002', difficulty: 'standard',
          question: 'The Aristocracy and the Napoleonic Code refers to the social structure.',
          hint: 'If stuck, revisit the \'Outcomes of the French Revolution\' summary table.',
          misconception: 'Students often believe the Napoleonic Code was welcomed everywhere as a \'liberation\' because it ended feudalism.',
          parts: [
                { id: 'a', prompt: 'What was the primary legal document introduced by Napoleon in 1804 that standardized civil laws across France and its conquered territories?', answer: 'The Napoleonic Code (Civil Code of 1804)',
                  options: ['The Napoleonic Code (Civil Code of 1804)', 'Declaration of the Rights of Man', 'the Napoleonic Code was welcomed everywhere as a \'liberation\''],
                  hint: 'If stuck, revisit the \'Outcomes of the French Revolution\' summary table in c10_hist_cbse_01_001 and.',
                  misconception: 'Students often believe the Napoleonic Code was welcomed everywhere as a \'liberation\' because it ended feudalism.' },
                { id: 'b', prompt: 'Compare the impact of the Napoleonic Code on the aristocracy in the Rhineland (annexed to France) versus the Kingdom of Westphalia (a satellite state ruled.', answer: 'Rhineland aristocracy lost more',
                  options: ['Rhineland aristocracy lost more', 'the Napoleonic Code was welcomed everywhere as a \'liberation\''],
                  hint: 'If stuck, revisit the \'Outcomes of the French Revolution\' summary table in c10_hist_cbse_01_001 and.',
                  misconception: 'Students often believe the Napoleonic Code was welcomed everywhere as a \'liberation\' because it ended feudalism.' }
          ],
            remediations: { 'the-napoleonic-code-was-welcomed': { steps: ['Re-read the \'Peasant Resistance\' subsection in NCERT (Chapter 1, Box 1.2) and list three specific grievances against.', 'On a blank map of 1810 Europe, shade areas where the Code was imposed directly (annexed) vs.', 'Write a 50-word paragraph: "The Code was a double-edged sword for nationalism because..." using the words \'equality\'.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_01_003', difficulty: 'standard',
          question: 'The new middle class in 19th-century Europe consisted of educated professionals.',
          hint: 'Revisit the "Declaration of the Rights of Man and Citizen" (1789) and the "Congress.',
          misconception: 'Students think "middle class" means only factory owners/industrialists.',
          parts: [
                { id: 'a', prompt: 'Name the specific economic policy advocated by the European middle class to promote national unity in the German states before 1848.', answer: 'The Zollverein (customs union) initiated by Prussia in 1834',
                  options: ['The Zollverein (customs union) initiated by Prussia in 1834', 'free trade with Britain', 'industrial protectionism', 'middle class'],
                  hint: 'Revisit the "Declaration of the Rights of Man and Citizen" (1789) and the "Congress of Vienna".',
                  misconception: 'Students think "middle class" means only factory owners/industrialists.' }
          ],
            remediations: { 'middle-class-means-only-factory': { steps: ['Re-read node 002 (aristocracy) to recall who the middle class opposed.', 'Make a 3-column table: Social Group | Economic Base | Political Demand — fill for aristocracy, middle class.', 'Use the Zollverein map (textbook p. 8) to trace how tariff removal connected German states — this was a middle-class.', 'Explain aloud why a lawyer in Cologne wanted a constitution but not a republic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_01_004', difficulty: 'standard',
          question: 'Liberal Nationalism vs Conservatism refers to the ideological clash.',
          hint: 'Revisit the **Declaration of the Rights of Man (1789)** and the **Congress of Vienna.',
          misconception: 'Students often think **"liberal nationalism" and "conservatism" were just two political parties debating.',
          parts: [
                { id: 'a', prompt: 'What was the primary political goal of the Congress of Vienna (1815) regarding the map of Europe?', answer: 'The Congress of Vienna aimed to restore the pre-Napoleonic monarchies and redraw',
                  options: ['The Congress of Vienna aimed to restore the pre-Napoleonic monarchies and redraw', 'to create nation-states based on ethnicity', 'liberal nationalism', 'conservatism'],
                  hint: 'Revisit the **Declaration of the Rights of Man (1789)** and the **Congress of Vienna (1815)**.',
                  misconception: 'Students often think **"liberal nationalism" and "conservatism" were just two political parties debating in parliaments.** In reality.' },
                { id: 'b', prompt: 'Compare the social bases of liberal nationalism and conservatism in 1820s Europe. Why did each ideology attract its specific supporters?', answer: 'Liberal nationalism drew support from the **urban middle class** (bourgeoisie),',
                  options: ['Liberal nationalism drew support from the **urban middle class** (bourgeoisie),', 'rich vs poor', 'liberal nationalism', 'conservatism'],
                  hint: 'Revisit the **Declaration of the Rights of Man (1789)** and the **Congress of Vienna (1815)**.',
                  misconception: 'Students often think **"liberal nationalism" and "conservatism" were just two political parties debating in parliaments.** In reality.' }
          ],
            remediations: { 'liberal-nationalism-and-conservatism-were': { steps: ['Re-read the **Carlsbad Decrees** (1819) and **Metternich\'s Memoirs** — ask: *What specific actions did the state take.', 'Compare with **Indian context**: Rowlatt Act (1919) — how did the British state suppress nationalist dissent?', 'Create a two-column table: **"Legal Tools of Conservative States (1815–1848)"** vs **"Illegal Tools of Liberal.', 'Explain aloud: *Why did conservatives control the law, and how did that shape liberal tactics?*'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_01_005', difficulty: 'standard',
          question: 'The Revolutionaries were committed nationalist activists (1815–1848) who formed.',
          hint: 'Revisit c10_hist_cbse_01_004 (Liberal Nationalism vs Conservatism) — focus on the.',
          misconception: 'Students believe the Carbonari were a single, centrally controlled organisation with a clear programme like a modern.',
          parts: [
                { id: 'a', prompt: 'A historian argues: "The Carbonari failed because they lacked a clear social base and a unified ideology — they were merely a coalition of discontented.', answer: 'The claim is partially valid but incomplete',
                  options: ['The claim is partially valid but incomplete', 'no ideology'],
                  hint: 'Revisit c10_hist_cbse_01_004 (Liberal Nationalism vs Conservatism) — focus on the "Metternich.',
                  misconception: 'Students believe the Carbonari were a single, centrally controlled organisation with a clear programme like a modern political party.' }
          ],
            remediations: { 'the-carbonari-were-a-single': { steps: ['Show a map of Italian states (1815) — highlight how the Carbonari operated *across* fragmented borders (Naples.', 'Compare two Carbonari documents: the 1820 Neapolitan constitution (monarchical) vs.', 'Read a police report from Metternich\'s archives describing the Carbonari as "a hydra with many heads" — this primary.', 'Contrast with Young Italy\'s *single* statute, *single* journal (Giovine Italia), *single* leader (Mazzini) — the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_01_006', difficulty: 'standard',
          question: 'The Unification of Italy (1852–1871) was a political and military process.',
          hint: 'Revisit c10_hist_cbse_01_005 — focus on the failure of the Roman Republic (1849) where.',
          misconception: 'Students believe Garibaldi handed over his conquests to Victor Emmanuel II purely out of patriotic selflessness.',
          parts: [
                { id: 'a', prompt: 'Why did Cavour provoke Austria into declaring war on Piedmont-Sardinia in 1859 instead of attacking Austria directly?', answer: 'Cavour needed France as an ally',
                  options: ['Cavour needed France as an ally', 'Piedmont was too weak', 'Cavour wanted to avoid war'],
                  hint: 'Revisit c10_hist_cbse_01_005 — focus on the failure of the Roman Republic (1849) where Garibaldi.',
                  misconception: 'Students believe Garibaldi handed over his conquests to Victor Emmanuel II purely out of patriotic selflessness.' }
          ],
            remediations: { 'garibaldi-handed-over-his-conquests': { steps: ['Re-read the Teano meeting (26 October 1860) from the NCERT box "Garibaldi and the Red Shirts."', 'Draw a map showing Garibaldi\'s northward march, the Sardinian army\'s southward move through the Papal States, and their.', 'Compare with the 1848–49 Roman Republic failure (c10_hist_cbse_01_005) — Garibaldi learned that without great-power.', 'Write a 50-word answer: "Garibaldi handed over conquests because Cavour\'s army blocked his march on Rome; French.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
