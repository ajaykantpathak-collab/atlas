import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hist_ch09 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hist_ch09: SimDef = {
    id: 'v3_c11_hist_ch09',
    title: 'Paths to Modernisation',
    subtitle: 'Covers the period from the First Opium War (1839) to the founding of the PRC (1949).',
    classLevel: 11, subject: 'history', topic: 'Paths to Modernisation',
    chapters: ['c11_hist_ch09'],
    nodeIds: ['c11_hist_cbse_09_001', 'c11_hist_cbse_09_002', 'c11_hist_cbse_09_003', 'c11_hist_cbse_09_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start by asking: "You know how in Class 8 we studied the Battle of Plassey (1757) and the East India Company.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'In what year was the Meiji Restoration proclaimed, and what immediate political change did it enact regarding the Shogunate and the Emperor?',
        options: ['The Meiji Restoration was proclaimed in 1868', 'peacefully', 'resisted change'],
        answer: 'The Meiji Restoration was proclaimed in 1868',
        hook: 'Students believe **Japan modernized "peacefully" by copying the West, while China failed because it "resisted.',
    },
    teaching: [
        { title: 'China\'s Response to Western Domination', text: 'China\'s Response to Western Domination (c. 1839–1949) refers to the century-long struggle of the Qing Dynasty and subsequent Republican/Communist regimes to reclaim national sovereignty, modernise.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hist_cbse_09_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        labels: ['China\'s Response to Western', 'The Meiji Restoration', 'Fukuzawa Yukichi and Japan\'s', 'Comparing China\'s and Japan\'s'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hist_cbse_09_002', title: 'The Meiji Restoration and Japan\'s Modernisation',
          caseStudy: { intro: 'Start by asking: "You\'ve studied how the British colonised India (Class 8/10) — now imagine a non-Western country that *avoided* colonisation and beat.',
            decisions: [{ prompt: 'In what year did Commodore Perry arrive in Japan with his \'Black Ships\', and what was the immediate political consequence for the Tokugawa.', options: [
                { text: '**Answer:** Commodore Perry arrived in 1853', outcome: '**Answer:** Commodore Perry arrived in 1853. The immediate consequence was the signing of the.' },
                { text: 'the Meiji Restoration was a popular uprising or a democratic revolution', outcome: 'Not quite — **Students believe the Meiji Restoration was a popular uprising or a democratic revolution.**.', reveals: 'students-believe-the-meiji-restoration' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_09_003', title: 'Fukuzawa Yukichi and Japan\'s Western Learning',
          caseStudy: { intro: 'Start by asking: "If you visited a relative\'s village in 1860 and saw them using smartphones while you still had a landline, how would you convince your family.',
            decisions: [{ prompt: 'In which year did Fukuzawa Yukichi travel to the USA as a translator for the first Japanese embassy, and what was the immediate outcome.', options: [
                { text: '1860; the journey provided material for his bestselling book *Conditions in the West*', outcome: '1860; the journey provided material for his bestselling book *Conditions in the West* (Seiyō Jijō).' },
                { text: 'Fukuzawa Yukichi was a government official who implemented Meiji reforms', outcome: 'Not quite — Students believe Fukuzawa Yukichi was a government official who implemented Meiji reforms.', reveals: 'fukuzawa-yukichi-was-a-government' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_09_004', title: 'Comparing China\'s and Japan\'s Paths to Modernity',
          caseStudy: { intro: 'Start by asking: "You\'ve seen photos of the 1964 Tokyo Olympics (bullet trains, modern city) and read about the Cultural Revolution in China (chaos, Red.',
            decisions: [{ prompt: 'In what year was the Meiji Restoration proclaimed, and what immediate political change did it enact regarding the Shogunate and the Emperor?', options: [
                { text: 'The Meiji Restoration was proclaimed in 1868', outcome: 'The Meiji Restoration was proclaimed in 1868; it forcibly removed the Tokugawa Shogun from power.' },
                { text: 'peacefully', outcome: 'Not quite — Students believe **Japan modernized "peacefully" by copying the West, while China failed because.', reveals: 'japan-modernized-peacefully-by-copying' },
                { text: 'resisted change', outcome: 'Not quite — Students believe **Japan modernized "peacefully" by copying the West, while China failed because.', reveals: 'japan-modernized-peacefully-by-copying' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_09_004', title: 'You made it',
          caseStudy: { intro: 'You finished Paths to Modernisation — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_09_001', difficulty: 'standard',
          question: 'China\'s Response to Western Domination (c. 1839–1949) refers to the.',
          hint: 'Revisit **Class 8 History Ch 3 (Colonialism)** – specifically the *Opium Trade triangle*.',
          misconception: '**Misconception:** "China was \'carved up like a melon\' (spheres of influence) because the Qing Dynasty was uniformly.',
          parts: [
                { id: 'a', prompt: 'Liang Qichao famously described India as "a country destroyed by a non-country (the East India Company)." Explain why this specific comparison was politically.', answer: 'The comparison was potent',
                  options: ['The comparison was potent', 'economic exploitation'],
                  hint: 'Revisit **Class 8 History Ch 3 (Colonialism)** – specifically the *Opium Trade triangle* and.',
                  misconception: '**Misconception:** "China was \'carved up like a melon\' (spheres of influence) because the Qing Dynasty was uniformly weak and refused all.' }
          ],
            remediations: { 'misconception-china-was-carved-up': { steps: ['If the student holds this misconception: 1.', '**Map Exercise:** Plot the **Self-Strengthening enterprises** (Jiangnan Arsenal, Fuzhou Dockyard, Tianjin Machine.', 'Note they are clustered in *coastal treaty ports*, not the interior.', '**Source Comparison:** Read **Li Hongzhang\'s memorial (1872)** requesting naval funds vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_09_002', difficulty: 'standard',
          question: 'The Meiji Restoration (1868) was a political revolution that ended the Tokugawa.',
          hint: 'If stuck on *why Japan succeeded where China failed*, revisit **c11_hist_cbse_09_001.',
          misconception: '**Students believe the Meiji Restoration was a popular uprising or a democratic revolution.** In reality, it was.',
          parts: [
                { id: 'a', prompt: 'In what year did Commodore Perry arrive in Japan with his \'Black Ships\', and what was the immediate political consequence for the Tokugawa Shogunate\'s.', answer: '**Answer:** Commodore Perry arrived in 1853',
                  options: ['**Answer:** Commodore Perry arrived in 1853', 'the Meiji Restoration was a popular uprising or a democratic revolution'],
                  hint: 'If stuck on *why Japan succeeded where China failed*, revisit **c11_hist_cbse_09_001 (China\'s.',
                  misconception: '**Students believe the Meiji Restoration was a popular uprising or a democratic revolution.** In reality, it was a *coup by samurai.' },
                { id: 'b', prompt: 'Explain the meaning of the Meiji slogan \'fukoku kyohei\' (富国強兵) and why the new government prioritised building a modern army *before* establishing a fully.', answer: '**Answer:** \'Fukoku kyohei\' means \'Rich Country, Strong Army\'',
                  options: ['**Answer:** \'Fukoku kyohei\' means \'Rich Country, Strong Army\'', 'the Meiji Restoration was a popular uprising or a democratic revolution'],
                  hint: 'If stuck on *why Japan succeeded where China failed*, revisit **c11_hist_cbse_09_001 (China\'s.',
                  misconception: '**Students believe the Meiji Restoration was a popular uprising or a democratic revolution.** In reality, it was a *coup by samurai.' }
          ],
            remediations: { 'students-believe-the-meiji-restoration': { steps: ['**Re-read the textbook section \'The Political System\' (pp.', '156–157)** — note the Shogun-Emperor-Daimyo-Samurai hierarchy *before* 1868.', '**Map the actors:** Draw a 3-column table: *Before 1868* (Shogun rules, Emperor rituals, Daimyo domains, Samurai.', '*After 1868* (Emperor \'rules\', Genro decide, Prefectures, Conscript army) vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_09_003', difficulty: 'standard',
          question: 'Fukuzawa Yukichi (1835–1901) was a leading Meiji-period intellectual, educator.',
          hint: 'If stuck, review c11_hist_cbse_09_002\'s section on "The Meiji Restoration" and the.',
          misconception: 'Students believe Fukuzawa Yukichi was a government official who implemented Meiji reforms.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Fukuzawa Yukichi (1835–1901) was a leading Meiji-period intellectual, educator, and',
                  options: ['Fukuzawa Yukichi (1835–1901) was a leading Meiji-period intellectual, educator, and', 'China\'s Response to Western Domination (c', 'The Meiji Restoration (1868) was a political revolution that ended the Tokugawa', 'Comparing China\'s and Japan\'s Paths to Modernity (c'],
                  hint: 'If stuck, review c11_hist_cbse_09_002\'s section on "The Meiji Restoration" and the "Modernising the.',
                  misconception: 'Students believe Fukuzawa Yukichi was a government official who implemented Meiji reforms.' }
          ],
            remediations: { 'fukuzawa-yukichi-was-a-government': { steps: ['Re-read the NCERT box on Fukuzawa (p. 162) and note every phrase showing his *non-governmental* role: "established.', 'Compare with the Meiji leaders in c11_hist_cbse_09_002 (Ito Hirobumi, Yamagata Aritomo) — list their government posts.', 'Write one paragraph explaining why a private intellectual founding a university (Keio) was *more* radical in 1870s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_09_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Fukuzawa Yukichi was a government official who implemented Meiji reforms.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Fukuzawa Yukichi\'s call to \'expel Asia\' (datsu-A) was a betrayal of Asian solidarity and justified Japanese imperialism." Use evidence.', answer: 'The claim is partially valid but ahistorical if taken as his *sole* intent',
                  options: ['The claim is partially valid but ahistorical if taken as his *sole* intent', 'Fukuzawa Yukichi was a government official who implemented Meiji reforms'],
                  hint: 'If stuck, review c11_hist_cbse_09_002\'s section on "The Meiji Restoration" and the "Modernising the.',
                  misconception: 'Students believe Fukuzawa Yukichi was a government official who implemented Meiji reforms.' },
                { id: 'b', prompt: 'Create a 5-entry annotated timeline showing the evolution of Fukuzawa\'s thought from his early Dutch studies (rangaku) to his later critique of Meiji.', answer: 'A strong answer shows progression: (1) 1854–59: Studies Dutch in Nagasaki',
                  options: ['A strong answer shows progression: (1) 1854–59: Studies Dutch in Nagasaki', 'Fukuzawa Yukichi was a government official who implemented Meiji reforms'],
                  hint: 'If stuck, review c11_hist_cbse_09_002\'s section on "The Meiji Restoration" and the "Modernising the.',
                  misconception: 'Students believe Fukuzawa Yukichi was a government official who implemented Meiji reforms.' }
          ],
            remediations: { 'fukuzawa-yukichi-was-a-government': { steps: ['Re-read the NCERT box on Fukuzawa (p. 162) and note every phrase showing his *non-governmental* role: "established.', 'Compare with the Meiji leaders in c11_hist_cbse_09_002 (Ito Hirobumi, Yamagata Aritomo) — list their government posts.', 'Write one paragraph explaining why a private intellectual founding a university (Keio) was *more* radical in 1870s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_09_004', difficulty: 'standard',
          question: 'Comparing China\'s and Japan\'s Paths to Modernity (c. 1839–1949) analyzes the.',
          hint: 'If stuck, re-read the \'Timeline\' on p. 170 of the NCERT textbook — it is the single best.',
          misconception: 'Students believe **Japan modernized "peacefully" by copying the West, while China failed because it "resisted.',
          parts: [
                { id: 'a', prompt: 'In what year was the Meiji Restoration proclaimed, and what immediate political change did it enact regarding the Shogunate and the Emperor?', answer: 'The Meiji Restoration was proclaimed in 1868',
                  options: ['The Meiji Restoration was proclaimed in 1868', 'peacefully', 'resisted change'],
                  hint: 'If stuck, re-read the \'Timeline\' on p. 170 of the NCERT textbook — it is the single best scaffold.',
                  misconception: 'Students believe **Japan modernized "peacefully" by copying the West, while China failed because it "resisted change."** This is factually.' },
                { id: 'b', prompt: 'Why did the Qing Dynasty\'s \'Self-Strengthening Movement\' (1860s–1890s) fail to prevent China\'s military defeats, whereas Japan\'s Meiji reforms succeeded.', answer: 'The Self-Strengthening Movement failed',
                  options: ['The Self-Strengthening Movement failed', 'corruption', 'conservatism', 'peacefully'],
                  hint: 'If stuck, re-read the \'Timeline\' on p. 170 of the NCERT textbook — it is the single best scaffold.',
                  misconception: 'Students believe **Japan modernized "peacefully" by copying the West, while China failed because it "resisted change."** This is factually.' }
          ],
            remediations: { 'japan-modernized-peacefully-by-copying': { steps: ['Re-read the \'Meiji Restoration\' section (c11_hist_cbse_09_002) focusing on *how* the Satsuma-Choshu alliance used the.', 'Re-read \'China\'s Response to Western Domination\' (c11_hist_cbse_09_001) and list *every* reform attempt.', 'Draw a two-column table: "Centralized State Exists?" (Japan: Yes after 1868; China: No until 1928 nominally, 1949.', 'Explain aloud: "Technology transfer requires a state that can tax, conscript, and suppress dissent.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
