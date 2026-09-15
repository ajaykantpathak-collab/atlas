import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch02_p1: SimDef = {
    id: 'v3_c12_hist_ch02_p1',
    title: 'Kings, Farmers and Towns (Early States and Economies) · Part 1/2',
    subtitle: 'The mint clerk who gave Ashoka back his name',
    classLevel: 12, subject: 'history', topic: 'Kings, Farmers and Towns (Early States and Economies) · Part 1/2',
    chapters: ['c12_hist_ch02'],
    nodeIds: ['c12_hist_cbse_02_001', 'c12_hist_cbse_02_002', 'c12_hist_cbse_02_003', 'c12_hist_cbse_02_004', 'c12_hist_cbse_02_005', 'c12_hist_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Epigraphy analyst', intro: 'A forgotten script covered the pillars of an emperor no one could name — until coins betrayed its sounds.', goal: 'Follow Prinsep\'s decipherment of Brahmi and Kharoshthi — and what \'Piyadassi = Ashoka\' unlocked.' },
    discovery: {
        question: 'In 1838 a mint official cracked a dead script and revealed \'Piyadassi\' was Ashoka — pushing Indian history back a thousand years. What made decipherment possible?',
        options: ['Controlled comparison — bilingual Indo-Greek coins gave Kharoshthi\'s sounds; Brahmi he traced backwards from living descendants like Devanagari', 'Pure genius guesswork', 'A Rosetta stone in India', 'Pandits told him'],
        answer: 'Controlled comparison — bilingual Indo-Greek coins gave Kharoshthi\'s sounds; Brahmi he traced backwards from living descendants like Devanagari',
        hook: 'It wasn\'t a solitary eureka — decades of Asiatic Society work, Mackenzie\'s collections and pandits\' palaeography laid the ground. And the early scholars\' Sanskrit assumption was elite bias: the edicts were in everyday Prakrit, filtered wrongly through Brahmin informants.',
    },
    teaching: [
        { title: 'Prinsep and the Decipherment of Brahmi and Kharoshthi Scripts', text: 'The decipherment of Brahmi and Kharoshthi scripts by James Prinsep in 1838 was the breakthrough that unlocked early Indian epigraphy, revealing that the "Piyadassi" of inscriptions was the Buddhist.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Crack a dead script yourself: match Greek names to Kharoshthi signs on coins, work Brahmi backwards through its descendants, and weigh why \'Piyadassi\' being Ashoka changed everything.',
        labels: ['Prinsep and the Decipherment', 'The Mauryan Empire: Chandragupta,', 'Ashoka\'s Inscriptions: Rock Edicts,', 'The Arthashastra: Kautilya\'s Treatise', 'Early States: The Sixteen', 'Ganas or Sanghas: Oligarchies'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_02_001', title: 'Prinsep and the Decipherment of Brahmi and Kharoshthi Scripts',
          caseStudy: { intro: 'Imagine you find a stone pillar near your town with strange symbols nobody can read — like the Ashoka pillar at Sarnath or the rock edict at Girnar.',
            decisions: [{ prompt: 'Who was James Prinsep, and what was his official position when he deciphered Brahmi and Kharoshthi?', options: [
                { text: 'James Prinsep was an assay master (senior officer) at the East India Company\'s mint in', outcome: 'James Prinsep was an assay master (senior officer) at the East India Company\'s mint in Benares.' },
                { text: 'he was a historian', outcome: 'Not quite — Students think Brahmi and Kharoshthi were deciphered *simultaneously* by the *same method*.', reveals: 'brahmi-and-kharoshthi-were-deciphered' },
                { text: 'he worked for the Asiatic Society', outcome: 'Not quite — Students think Brahmi and Kharoshthi were deciphered *simultaneously* by the *same method*.', reveals: 'brahmi-and-kharoshthi-were-deciphered' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_02_003', title: 'Ashoka\'s Inscriptions: Rock Edicts, Pillar Edicts and Dhamma',
          caseStudy: { intro: 'Imagine you are standing at the Sanchi Stupa in Madhya Pradesh and see a polished sandstone pillar fragment with elegant Brahmi letters — this is a direct.',
            decisions: [{ prompt: 'Name the two scripts used for Ashokan inscriptions in the northwestern regions of the empire and the languages they represented.', options: [
                { text: 'The two scripts are Kharosthi (used for Prakrit) and Greek/Aramaic (used for Greek and', outcome: 'The two scripts are Kharosthi (used for Prakrit) and Greek/Aramaic (used for Greek and Aramaic.' },
                { text: 'Brahmi was used everywhere', outcome: 'Not quite — Students often believe Ashoka\'s Dhamma was identical to Buddhism and that he converted the entire.', reveals: 'ashoka-s-dhamma-was-identical' },
                { text: '"Brahmi was used everywhere"', outcome: 'Not quite — Students often believe Ashoka\'s Dhamma was identical to Buddhism and that he converted the entire.', reveals: 'ashoka-s-dhamma-was-identical' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_02_004', title: 'The Arthashastra: Kautilya\'s Treatise on Statecraft and Administration',
          caseStudy: { intro: 'Imagine you are a historian trying to reconstruct how the Mauryan empire actually functioned — you have Asoka\'s own words on stone pillars, a Greek.',
            decisions: [{ prompt: 'Who is traditionally identified as the author of the Arthashastra, and what position did he hold in the Mauryan court?', options: [
                { text: 'The Arthashastra is traditionally attributed to Kautilya (also called Chanakya or', outcome: 'The Arthashastra is traditionally attributed to Kautilya (also called Chanakya or Vishnugupta), who.' },
                { text: 'totalitarianism', outcome: 'Not quite — Students often believe the Arthashastra was written *by* Chanakya *for* Chandragupta in the 4th.', reveals: 'the-arthashastra-was-written-by' },
                { text: 'Asoka or Megasthenes as the author', outcome: 'Not quite — Students often believe the Arthashastra was written *by* Chanakya *for* Chandragupta in the 4th.', reveals: 'the-arthashastra-was-written-by' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_02_005', title: 'Early States: The Sixteen Mahajanapadas and the Rise of Magadha',
          caseStudy: { intro: 'Imagine standing at the ruins of Rajgir\'s cyclopean walls — how did a hill-fort become the heart of an empire?',
            decisions: [{ prompt: 'Name any four mahajanapadas from the Buddhist list and their respective capitals.', options: [
                { text: 'Correct: Magadha (Rajagaha/Pataliputra), Kosala (Shravasti), Vatsa (Kaushambi), Avanti', outcome: 'Correct: Magadha (Rajagaha/Pataliputra), Kosala (Shravasti), Vatsa (Kaushambi), Avanti (Ujjayini).' },
                { text: 'Mauryan provinces like Taxila or Ujjain as mahajanapada capitals', outcome: 'Not quite — Students often believe **all sixteen mahajanapadas were monarchies** and that **Magadha\'s rise was.', reveals: 'all-sixteen-mahajanapadas-were-monarchies' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_02_006', title: 'Ganas or Sanghas: Oligarchies and Non-Monarchical States',
          caseStudy: { intro: 'Imagine your school’s student council where decisions are made by elected representatives from each class rather than by a single head boy — that is a tiny.',
            decisions: [{ prompt: 'Name two gana/sangha polities mentioned in Buddhist texts and give the modern location of their capitals.', options: [
                { text: 'Correct answer: Vajji (Vrijji) confederacy with capital at Vaishali (modern Basarh,', outcome: 'Correct answer: Vajji (Vrijji) confederacy with capital at Vaishali (modern Basarh, Bihar) and the.' },
                { text: 'Magadha or Avanti', outcome: 'Not quite — Students frequently believe that “gana” and “sangha” are synonyms for “republic” in the modern.', reveals: 'students-frequently-believe-that-gana' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a history quiz final, your teammate answers: \'Ashoka converted to Buddhism after Kalinga, so he gave up war.\' The anchor awards the point — but you suspect it\'s wrong.',
            decisions: [{ prompt: 'What does the chapter actually record about Ashoka and Kalinga?', options: [
                { text: 'The Thirteenth Rock Edict records remorse for Kalinga\'s dead and deported, then replaces the drum of war with the drum of Dhamma — a policy pivot to conquest by righteousness, which is imperial strategy, not just private conversion; his own turn to Buddhism likely preceded the war.', outcome: 'The chapter\'s distinction: Dhamma was a secular moral code for holding a diverse empire — \'became Buddhist so gave up war\' confuses a public policy shift with a private religious event.' },
                { text: 'Let it stand — \'converted after Kalinga\' is close enough for a quiz.', outcome: 'It\'s the exam\'s favourite trap: the edicts say policy changed; the chronicles date his conversion earlier, and Dhamma-vijaya is about how an empire is ruled, not which faith the emperor joined.', reveals: 'conversion-explains-policy' },
                { text: 'Counter instead that Kalinga never happened — an empire that gave up war couldn\'t have fought one.', outcome: 'The edict itself is the evidence for the war\'s scale — Ashoka\'s own inscription describes the death and deportation; denying Kalinga erases the event that produced the pivot.', reveals: 'pacifism-erases-war' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now see decipherment as method, not magic — and catch the elite bias that almost hid Prakrit under Sanskrit.',
            decisions: [{ prompt: 'What comes next? Kings, Farmers and Towns (Early States and Economies) · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Kings, Farmers and Towns (Early States and Economies) · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_02_001', difficulty: 'standard',
          question: 'The decipherment of Brahmi and Kharoshthi scripts by James Prinsep in 1838 was.',
          hint: 'If stuck on "how scripts evolve", revisit c11_hist_cbse_01_002 (cuneiform to alphabet).',
          misconception: 'Students think Brahmi and Kharoshthi were deciphered *simultaneously* by the *same method*.',
          parts: [
                { id: 'a', prompt: 'Why did scholars initially assume Asokan inscriptions were in Sanskrit, and what does this reveal about early colonial epistemology?', answer: 'Scholars assumed Sanskrit',
                  options: ['Scholars assumed Sanskrit', 'elite bias', 'how do we know what Ashoka said?', 'Brahmi and Kharoshthi were deciphered *simultaneously* by the *same method*'],
                  hint: 'If stuck on "how scripts evolve", revisit c11_hist_cbse_01_002 (cuneiform to alphabet) — the.',
                  misconception: 'Students think Brahmi and Kharoshthi were deciphered *simultaneously* by the *same method*.' },
                { id: 'b', prompt: 'Compare the decipherment strategies for Brahmi and Kharoshthi. Why did Brahmi require "working backwards" while Kharoshthi used bilingual coins?', answer: 'Brahmi had no bilingual texts in the 1830s',
                  options: ['Brahmi had no bilingual texts in the 1830s', 'how do we know what Ashoka said?', 'Brahmi and Kharoshthi were deciphered *simultaneously* by the *same method*'],
                  hint: 'If stuck on "how scripts evolve", revisit c11_hist_cbse_01_002 (cuneiform to alphabet) — the.',
                  misconception: 'Students think Brahmi and Kharoshthi were deciphered *simultaneously* by the *same method*.' }
          ],
            remediations: { 'brahmi-and-kharoshthi-were-deciphered': { steps: ['Revisit c9_hist_ch1_5 (Archaeological Sources: Artefacts and Inscriptions) to refresh how inscriptions work as sources.', 'Then re-read the NCERT "Back to Basics" section (pp.', '46–47) focusing on the *two distinct decipherment stories* — make a two-column table: Brahmi (palaeographic regression.', 'Finally, attempt Diagnostic Question 4 again — if you can explain the *difference in evidence base*, you\'ve fixed the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think Brahmi and Kharoshthi were deciphered *simultaneously* by the *same method*.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Prinsep\'s decipherment was a solitary genius moment." Use evidence from the NCERT text about prior scholars and Indian pandits.', answer: 'The claim is false',
                  options: ['The claim is false', 'great man', 'how do we know what Ashoka said?', 'Brahmi and Kharoshthi were deciphered *simultaneously* by the *same method*'],
                  hint: 'If stuck on "how scripts evolve", revisit c11_hist_cbse_01_002 (cuneiform to alphabet) — the.',
                  misconception: 'Students think Brahmi and Kharoshthi were deciphered *simultaneously* by the *same method*.' }
          ],
            remediations: { 'brahmi-and-kharoshthi-were-deciphered': { steps: ['Revisit c9_hist_ch1_5 (Archaeological Sources: Artefacts and Inscriptions) to refresh how inscriptions work as sources.', 'Then re-read the NCERT "Back to Basics" section (pp.', '46–47) focusing on the *two distinct decipherment stories* — make a two-column table: Brahmi (palaeographic regression.', 'Finally, attempt Diagnostic Question 4 again — if you can explain the *difference in evidence base*, you\'ve fixed the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_02_002', difficulty: 'standard',
          question: 'The Mauryan Empire (c. 321–185 BCE) was the first large-scale imperial polity.',
          hint: 'If stuck, re-read the "First amongst the sixteen: Magadha" section in NCERT (Theme 2.',
          misconception: 'Students often conflate Chandragupta Maurya (founder of Mauryan Empire, c.',
          parts: [
                { id: 'a', prompt: 'Megasthenes\' Indika (preserved in fragments) describes a committee of six subcommittees managing the Mauryan military.', answer: 'Correct answer: (1) Arthashastra (Book 2, 10)',
                  options: ['Correct answer: (1) Arthashastra (Book 2, 10)', 'other Greek accounts', 'Buddhist texts'],
                  hint: 'If stuck, re-read the "First amongst the sixteen: Magadha" section in NCERT (Theme 2, Section 2.2).',
                  misconception: 'Students often conflate Chandragupta Maurya (founder of Mauryan Empire, c. 321 BCE) with Chandragupta I (founder of Gupta Empire, c.' }
          ],
            remediations: { 'students-often-conflate-chandragupta-maurya': { steps: ['Revisit node c12_hist_cbse_02_005 (Mahajanapadas) to reinforce Magadha\'s geographic advantages before imperial.', 'Use Map 2 (Ashokan inscriptions) and Map 3 (post-Mauryan kingdoms) side-by-side: mark the five provincial centres and.', 'Read Source 11 (Kalinga edict) and Source 4 (Prayaga Prashasti) together; list three differences in how Ashoka and.', 'Re-attempt Diagnostic Questions 2 and 4 after this exercise.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_02_003', difficulty: 'standard',
          question: 'Ashoka\'s inscriptions are a series of royal proclamations engraved on rocks and.',
          hint: 'If confused about edict types, revisit c7_hist_ch02_007 (Ashoka\'s Edicts and.',
          misconception: 'Students often believe Ashoka\'s Dhamma was identical to Buddhism and that he converted the entire empire to Buddhism.',
          parts: [
                { id: 'a', prompt: 'Compare the Dhamma propagated in the Rock Edicts with the Buddhist teachings in the Minor Rock Edicts. Are they identical?', answer: 'They are not identical',
                  options: ['They are not identical', 'Dhamma = Buddhism'],
                  hint: 'If confused about edict types, revisit c7_hist_ch02_007 (Ashoka\'s Edicts and Inscriptions) and make.',
                  misconception: 'Students often believe Ashoka\'s Dhamma was identical to Buddhism and that he converted the entire empire to Buddhism.' }
          ],
            remediations: { 'ashoka-s-dhamma-was-identical': { steps: ['32–35 (Sources 10, 11) and make a two-column table: "Dhamma in Major Rock Edicts" vs "Buddhism in Minor Rock Edicts".', 'Revisit c7_hist_ch02_006 (Ashoka\'s Dhamma: Principles and Spread) and c7_hist_ch02_007 (Ashoka\'s Edicts and.', 'Attempt Diagnostic Question 4 again, explicitly quoting edict numbers.', 'If still unclear, watch the 10-min video "Ashoka\'s Dhamma vs Buddhism" on the NCERT YouTube channel and note three.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_02_004', difficulty: 'standard',
          question: 'The Arthashastra is a Sanskrit treatise on statecraft, economic policy, and.',
          hint: 'If stuck, revisit the "Discuss" box on NCERT p. 34: "Read the excerpts from Megasthenes.',
          misconception: 'Students often believe the Arthashastra was written *by* Chanakya *for* Chandragupta in the 4th century BCE and.',
          parts: [
                { id: 'a', prompt: 'The Arthashastra describes a six-subcommittee system for military coordination. Megasthenes also mentions a similar six-fold committee.', answer: 'Historians are cautious',
                  options: ['Historians are cautious', 'totalitarianism'],
                  hint: 'If stuck, revisit the "Discuss" box on NCERT p. 34: "Read the excerpts from Megasthenes and the.',
                  misconception: 'Students often believe the Arthashastra was written *by* Chanakya *for* Chandragupta in the 4th century BCE and describes the Mauryan.' }
          ],
            remediations: { 'the-arthashastra-was-written-by': { steps: ['If the student holds the misconception above: (1) Re-read NCERT Theme 2, Section 3.1 ("Finding out about the Mauryas").', '34 comparing Megasthenes and Arthashastra.', '(2) Create a three-column table: *Arthashastra prescription* | *Asokan inscription evidence* | *Megasthenes\'.', '(3) Watch the 10-minute video "Arthashastra: Text vs History" by NCERT Official (YouTube).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_02_005', difficulty: 'standard',
          question: 'The Sixteen Mahajanapadas were the major territorial states (monarchies and.',
          hint: 'If stuck, re-read NCERT Class 9 Ch.3 "Janapadas and Mahajanapadas" (c9_hist_ch3_3) and.',
          misconception: 'Students often believe **all sixteen mahajanapadas were monarchies** and that **Magadha\'s rise was inevitable due.',
          parts: [
                { id: 'a', prompt: 'Compare the explanations for Magadha\'s rise given by early Buddhist/Jaina writers versus modern historians.', answer: 'Correct: Early texts (e.g., Mahavamsa) attribute power to individual rulers\'',
                  options: ['Correct: Early texts (e.g., Mahavamsa) attribute power to individual rulers\'', 'historical interpretation'],
                  hint: 'If stuck, re-read NCERT Class 9 Ch.3 "Janapadas and Mahajanapadas" (c9_hist_ch3_3) and Class 7 Ch.1.',
                  misconception: 'Students often believe **all sixteen mahajanapadas were monarchies** and that **Magadha\'s rise was inevitable due to its geography alone**.' }
          ],
            remediations: { 'all-sixteen-mahajanapadas-were-monarchies': { steps: ['Revisit **c9_hist_ch3_3** (Janapadas and Mahajanapadas) and **c7_hist_ch01_003** (Mahajanapadas: Sixteen Major.', 'Use NCERT Map 1 (p.30) to draw a freehand sketch locating all sixteen capitals — muscle memory for board map questions.', 'Create a two-column table: "Monarchies" vs.', '"Ganas/Sanghas" with three examples each from the texts.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_02_006', difficulty: 'standard',
          question: 'Ganas or Sanghas were non-monarchical, oligarchic polities of the 6th–4th.',
          hint: 'If stuck, revisit the map of mahajanapadas (NCERT Class 12 Theme 2, Map 1) and the Class.',
          misconception: 'Students frequently believe that “gana” and “sangha” are synonyms for “republic” in the modern sense — i.e., that all.',
          parts: [
                { id: 'a', prompt: 'Compare the resource base of the Vajji sangha (as described in the NCERT: “rajas probably controlled resources such as land collectively”) with that of Magadha.', answer: 'Magadha had the structural advantage',
                  options: ['Magadha had the structural advantage', 'Vajji was richer'],
                  hint: 'If stuck, revisit the map of mahajanapadas (NCERT Class 12 Theme 2, Map 1) and the Class 7 summary.',
                  misconception: 'Students frequently believe that “gana” and “sangha” are synonyms for “republic” in the modern sense — i.e., that all adult males voted.' }
          ],
            remediations: { 'students-frequently-believe-that-gana': { steps: ['Re-read NCERT Theme 2, Section 2.1 (pp.', '29–30) and highlight every sentence containing “gana,” “sangha,” “oligarchy,” “rajas,” “collectively.” 2.', 'Watch the 10-minute video “Gana-Sangha Polities” on the NCERT Official YouTube channel (search “Class 12 History Theme.', 'Re-attempt Diagnostic Questions 2 and 4 — if you still confuse oligarchy with democracy, make a flashcard: “Gana.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
