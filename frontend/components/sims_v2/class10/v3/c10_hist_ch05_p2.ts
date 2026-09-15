import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hist_ch05_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hist_ch05_p2: SimDef = {
    id: 'v3_c10_hist_ch05_p2',
    title: 'Print Culture and the Modern World · Part 2/2',
    subtitle: 'Watch a carved block of wood set the modern world arguing',
    classLevel: 10, subject: 'history', topic: 'Print Culture and the Modern World · Part 2/2',
    chapters: ['c10_hist_ch05'],
    nodeIds: ['c10_hist_cbse_05_007', 'c10_hist_cbse_05_008', 'c10_hist_cbse_05_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a printer\'s apprentice watching ideas go viral — on paper', intro: 'In a workshop in China, a carver cuts characters backwards into wood. A thousand years later, presses in India churn out newspapers the British wish would disappear. Same invention, new world.', goal: 'Trace print\'s journey from East Asia to Europe to India, and explain how print culture fuelled religion, reform and nationalism.' },
    discovery: {
        question: 'The world\'s oldest dated printed book — the Diamond Sutra, 868 CE — was made in China by carving text into wooden blocks, centuries before Gutenberg. If printing was this old, why did it take so long to change the world?',
        options: ['Woodblock printing was slow and craft-bound; only cheap paper, movable type and mass literacy turned print into a revolution', 'China kept the technique a total state secret until 1900', 'Ancient people simply had nothing worth printing', 'Woodblocks could only print pictures, never words'],
        answer: 'Woodblock printing was slow and craft-bound; only cheap paper, movable type and mass literacy turned print into a revolution',
        hook: 'Carving a block for every page was art, not industry. The explosion came when type could be rearranged and reused — suddenly ideas travelled faster than the people who had them.',
    },
    teaching: [
        { title: 'Newspapers and Journals in India: Shaping Public Opinion', text: 'Newspapers and journals in colonial India (1780s–1947) were periodical publications in English and Indian languages that created a shared public sphere, enabling the circulation of nationalist ideas.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hist_cbse_05_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow print from carved Chinese blocks to Gutenberg\'s press to colonial India — where newspapers argued, reformers fought, and a scared Raj tried to censor it all.',
        labels: ['Newspapers and Journals', 'Print Culture and Censorship', 'Print and the Nationalist'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_hist_cbse_05_008', title: 'Print Culture and Censorship in Colonial India (Vernacular Press Act)',
          caseStudy: { intro: 'Imagine you are a student in 1870s Bengal reading a newspaper like *Amrita Bazar Patrika* that boldly criticizes the British famine policy — suddenly the.',
            decisions: [{ prompt: 'In which year was the Vernacular Press Act passed, and who was the Viceroy of India at that time?', options: [
                { text: 'The Vernacular Press Act was passed in 1878 during the viceroyalty of Lord Lytton', outcome: 'The Vernacular Press Act was passed in 1878 during the viceroyalty of Lord Lytton.' },
                { text: 'prior censorship', outcome: 'Not quite — Students often believe the Vernacular Press Act was the *first* law controlling the press in India.', reveals: 'the-vernacular-press-act-was' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_05_009', title: 'Print and the Nationalist Movement in India',
          caseStudy: { intro: 'Imagine you find a brittle, yellowed copy of *Kesari* from 1908 in your grandfather\'s trunk — the Marathi headlines still sharp, urging readers to boycott.',
            decisions: [{ prompt: 'Name the newspaper founded by Bal Gangadhar Tilak in 1881, its language, and the British law under which he was prosecuted for sedition.', options: [
                { text: 'Correct answer: *Kesari* (Marathi) and *Mahratta* (English), founded 1881', outcome: 'Correct answer: *Kesari* (Marathi) and *Mahratta* (English), founded 1881; Tilak was prosecuted.' },
                { text: 'Gandhi wrote in *Young India*, so it was for the educated', outcome: 'Not quite — Students believe the nationalist press was primarily an **English-language elite project** (e.g.', reveals: 'the-nationalist-press-was-primarily' },
                { text: '*The Hindu* or *Amrita Bazar Patrika*', outcome: 'Not quite — Students believe the nationalist press was primarily an **English-language elite project** (e.g.', reveals: 'the-nationalist-press-was-primarily' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_05_007', title: 'A real-world call',
          caseStudy: { intro: 'Print culture spread ideas — and propaganda. The same press that carried reform movements carried hate pamphlets. Every technology of free speech is also a technology of its abuse.',
            decisions: [{ prompt: 'Is a freer press always better?', options: [
                { text: 'Yes — the answer to bad speech is more speech', outcome: 'The liberal tradition\'s answer; it assumes good ideas win, which history only sometimes confirms.' },
                { text: 'Yes, but platforms shape what wins', outcome: 'The structural answer — \'free\' doesn\'t mean flat; the press\'s owners and algorithms decide which speech travels.' },
                { text: 'Freedom without literacy is a weapon, not a right', outcome: 'The education answer — print\'s danger was never print; it was readers who couldn\'t tell pamphlet from paper.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Clearing out the school library, a student says printed books were always just \'slow internet\' — they never changed anything that speeches couldn\'t. The librarian asks him to think about what print made possible for the first time.',
            decisions: [{ prompt: 'What did print actually change that speeches never could?', options: [
                { text: 'Scale and permanence — one speech reaches whoever stands in the crowd and vanishes, but one printed text reaches thousands of strangers identically, survives to be reread, debated and answered. That is how ideas built movements: cheap printed matter created reading publics, spread reform and criticism, and let arguments travel far beyond the speaker\'s voice.', outcome: 'From woodblock editions meant for free distribution to the pamphlet wars of later centuries, print turned private thought into a public force — the effect speeches could never sustain alone.' },
                { text: 'The student is right — print is just speech on paper and changed nothing fundamental.', outcome: 'Print multiplied an idea a thousandfold and froze it in checkable form — creating shared debates and publics that no sequence of speeches could produce.', reveals: 'print-is-just-speech' },
                { text: 'Print mattered only for religion — printing sacred texts for merit — and played no role in political or social change.', outcome: 'Early printing did serve devotion, like the Diamond Sutra distributed freely for merit, but print quickly escaped the temple — pamphlets, books and newspapers reshaped politics and society.', reveals: 'print-was-only-religious' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_05_009', title: 'You made it',
          caseStudy: { intro: 'Print didn\'t just copy books faster — it created publics, arguments and revolutions. Every protest pamphlet and newspaper you see is Gutenberg\'s echo.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hist_cbse_05_007', difficulty: 'standard',
          question: 'Newspapers and journals in colonial India (1780s–1947) were periodical.',
          hint: 'Revisit c10_hist_cbse_05_006 (Print in India: The East India Company and Mission) and.',
          misconception: 'Students often believe newspapers in colonial India were read only by a tiny English-educated elite and had negligible.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Newspapers and journals in colonial India (1780s–1947) were periodical publications in',
                  options: ['Newspapers and journals in colonial India (1780s–1947) were periodical publications in', 'Woodblock printing is a technique for reproducing text, images, or patterns by carving a', 'The invention of the movable-type printing press by Johannes Gutenberg in Mainz, Germany', 'The Print Revolution refers to the profound societal transformation in Europe (c'],
                  hint: 'Revisit c10_hist_cbse_05_006 (Print in India: The East India Company and Mission) and create.',
                  misconception: 'Students often believe newspapers in colonial India were read only by a tiny English-educated elite and had negligible mass impact.' }
          ],
            remediations: { 'newspapers-in-colonial-india-were': { steps: ['Show the student a 1901 census literacy map of India alongside circulation figures of *Kesari* (12,000) and.', 'Play a 2-minute audio recreation of a village reading circle (available in NCERT\'s audio resources).', 'Have them compare a *Kesari* editorial on the 1897 plague with a British official report — identify the emotional.', 'Assign a 100-word reflection: "How did oral circulation amplify the press\'s political reach?"'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_05_008', difficulty: 'standard',
          question: 'The Vernacular Press Act (1878) was a repressive law enacted by Viceroy Lord.',
          hint: 'Revisit c10_hist_cbse_05_007 (Newspapers and Journals in India) and the Class 8 node.',
          misconception: 'Students often believe the Vernacular Press Act was the *first* law controlling the press in India, overlooking the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Vernacular Press Act (1878) was a repressive law enacted by Viceroy Lord Lytton to',
                  options: ['The Vernacular Press Act (1878) was a repressive law enacted by Viceroy Lord Lytton to', 'Woodblock printing is a technique for reproducing text, images, or patterns by carving a', 'The invention of the movable-type printing press by Johannes Gutenberg in Mainz, Germany', 'The Print Revolution refers to the profound societal transformation in Europe (c'],
                  hint: 'Revisit c10_hist_cbse_05_007 (Newspapers and Journals in India) and the Class 8 node on British.',
                  misconception: 'Students often believe the Vernacular Press Act was the *first* law controlling the press in India, overlooking the 1857 Gagging Act and.' }
          ],
            remediations: { 'the-vernacular-press-act-was': { steps: ['Create a three-column table comparing the 1823 Licensing Regulations, 1857 Gagging Act, and 1878 Vernacular Press Act.', 'Read the *Amrita Bazar Patrika*\'s 1878 editorial "The Vernacular Press Act — A Blow at Liberty" (available in NCERT.', 'Practice writing a 3-mark answer: "State two provisions of the Vernacular Press Act that made it more repressive than.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_05_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Vernacular Press Act was the *first* law controlling the press in India, overlooking the.',
          parts: [
                { id: 'a', prompt: '" The Vernacular Press Act strengthened Indian nationalism rather than weakening it." Evaluate this statement with two pieces of evidence.', answer: 'The statement is largely correct',
                  options: ['The statement is largely correct', 'prior censorship'],
                  hint: 'Revisit c10_hist_cbse_05_007 (Newspapers and Journals in India) and the Class 8 node on British.',
                  misconception: 'Students often believe the Vernacular Press Act was the *first* law controlling the press in India, overlooking the 1857 Gagging Act and.' },
                { id: 'b', prompt: 'Draft a petition that a group of vernacular newspaper editors might have submitted to the Viceroy in 1879, demanding repeal of the Act.', answer: 'A strong petition would cite: (1) Discriminatory application',
                  options: ['A strong petition would cite: (1) Discriminatory application', 'prior censorship'],
                  hint: 'Revisit c10_hist_cbse_05_007 (Newspapers and Journals in India) and the Class 8 node on British.',
                  misconception: 'Students often believe the Vernacular Press Act was the *first* law controlling the press in India, overlooking the 1857 Gagging Act and.' }
          ],
            remediations: { 'the-vernacular-press-act-was': { steps: ['Create a three-column table comparing the 1823 Licensing Regulations, 1857 Gagging Act, and 1878 Vernacular Press Act.', 'Read the *Amrita Bazar Patrika*\'s 1878 editorial "The Vernacular Press Act — A Blow at Liberty" (available in NCERT.', 'Practice writing a 3-mark answer: "State two provisions of the Vernacular Press Act that made it more repressive than.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_05_009', difficulty: 'standard',
          question: 'Print and the Nationalist Movement in India refers to the period from the late.',
          hint: 'Revisit the Swadeshi Movement (c8_hist_ch4_5) and the Vernacular Press Act.',
          misconception: 'Students believe the nationalist press was primarily an **English-language elite project** (e.g., "Gandhi wrote.',
          parts: [
                { id: 'a', prompt: 'Name the newspaper founded by Bal Gangadhar Tilak in 1881, its language, and the British law under which he was prosecuted for sedition in 1897 and 1908.', answer: 'Correct answer: *Kesari* (Marathi) and *Mahratta* (English), founded 1881',
                  options: ['Correct answer: *Kesari* (Marathi) and *Mahratta* (English), founded 1881', 'Gandhi wrote in *Young India*, so it was for the educated', '*The Hindu* or *Amrita Bazar Patrika*', 'the nationalist press was primarily an **English-language elite project** (e'],
                  hint: 'Revisit the Swadeshi Movement (c8_hist_ch4_5) and the Vernacular Press Act (c10_hist_cbse_05_008).',
                  misconception: 'Students believe the nationalist press was primarily an **English-language elite project** (e.g., "Gandhi wrote in *Young India*, so it was.' },
                { id: 'b', prompt: 'A 1921 issue of *Young India* (Gandhi\'s weekly) carries the headline: "Spin and Weave: The Duty of Every Indian." The article urges readers to burn foreign.', answer: 'Correct answer: (a) Swadeshi/Boycott as constructive programme',
                  options: ['Correct answer: (a) Swadeshi/Boycott as constructive programme', 'the audience was all Indians', 'Gandhi wrote in *Young India*, so it was for the educated', 'the nationalist press was primarily an **English-language elite project** (e'],
                  hint: 'Revisit the Swadeshi Movement (c8_hist_ch4_5) and the Vernacular Press Act (c10_hist_cbse_05_008).',
                  misconception: 'Students believe the nationalist press was primarily an **English-language elite project** (e.g., "Gandhi wrote in *Young India*, so it was.' }
          ],
            remediations: { 'the-nationalist-press-was-primarily': { steps: ['If the student holds this misconception, do **not** simply re-read the textbook.', '**Map exercise**: Plot the circulation zones of *Kesari* (Maharashtra), *Swadesamitran* (Tamil Nadu), *Zamindar*.', 'Note how each paper\'s language matches the linguistic region — proving vernacular papers *created* regional nationalist.', '**Source comparison**: Place side-by-side a 1920 *Young India* editorial (English, abstract, addressed to "the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
