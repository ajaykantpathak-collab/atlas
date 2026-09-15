import type { SimDef } from '../../engine/types';

/** v3 generated — c7_civ_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_civ_ch02_p1: SimDef = {
    id: 'v3_c7_civ_ch02_p1',
    title: 'The Constitution of India: An Introduction · Part 1/2',
    subtitle: 'Covers the basic definition and fundamental need for a constitution as the supreme legal.',
    classLevel: 7, subject: 'civics', topic: 'The Constitution of India: An Introduction · Part 1/2',
    chapters: ['c7_civ_ch02'],
    nodeIds: ['c7_civ_ch02_001', 'c7_civ_ch02_002', 'c7_civ_ch02_003', 'c7_civ_ch02_004', 'c7_civ_ch02_005', 'c7_civ_ch02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine a school sports day where different classes argue over the rules of a relay race, or whether football.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Parliament passes a law that clashes head-on with the Constitution — say, banning a freedom the Constitution guarantees. In this collision, which document wins, and who calls it?',
        options: ['The Constitution wins — it is the supreme law, and the courts strike down any ordinary law that violates it', 'Parliament wins — the newest law always overrules older documents', 'Nobody wins — both laws apply at the same time', 'The Prime Minister decides which one counts'],
        answer: 'The Constitution wins — it is the supreme law, and the courts strike down any ordinary law that violates it',
        hook: 'The Constitution is not a history book frozen in 1950 — it is the living rulebook that even the rulers must obey. Ordinary laws change with a simple vote; the Constitution demands a much harder special process, so nobody can rewrite the game mid-play.',
    },
    teaching: [
        { title: 'What is a Constitution: Definition and Need', text: 'A Constitution is the supreme foundational law of a country that sets out the fundamental principles, structure, powers, and procedures of its government, and defines the fundamental rights and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_civ_ch02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Draft a mini-constitution for your school — write one clause that stops any single council member from holding absolute power, then test it against a misuse scenario.',
        labels: ['What is a Constitution', 'Why Countries Need', 'Making of the Indian', 'Constituent Assembly: Members', 'Influence of Freedom Struggle', 'Influence of Civilisational Heritage'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_civ_ch02_004', title: 'Constituent Assembly: Members and Process of Drafting',
          caseStudy: { intro: 'Imagine working on a massive class project where every student in the school has different ideas about the rules, and you need to create a single code.',
            decisions: [{ prompt: 'Who was appointed as the Chairman of the Drafting Committee of the Constituent Assembly?', options: [
                { text: 'Dr', outcome: 'Dr. B.R. Ambedkar was appointed as the Chairman of the Drafting Committee.' },
                { text: 'a single person drafted it overnight', outcome: 'Not quite — Students often think that Mahatma Gandhi wrote the Constitution of India because he was the leader.', reveals: 'mahatma-gandhi-wrote-the-constitution' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A newly elected school council wins 80% of the seats. Their first announcement: \'We now have the right to ban the school newspaper that criticised us, and to remove all opposing voices from debates.\'',
            decisions: [{ prompt: 'Does a landslide victory really grant that power?', options: [
                { text: 'No — a constitution limits what any government may do, however big its majority. Rights like free expression and the existence of opposition sit above ordinary majority decisions, so the council can pass rules but cannot silence criticism. A constitution exists precisely to bind the winners — without it, every election would hand one group unlimited power.', outcome: 'Winning big grants the power to govern, not the power to abolish the rules of the game — constitutional limits are what keep a majority democratic.' },
                { text: 'Yes — whoever wins the most seats may make any rule, since the majority\'s choice is final.', outcome: 'Majority rule operates inside constitutional limits — dissolving criticism and opposition would break the very framework that made the election legitimate.', reveals: 'majority-means-unlimited' },
                { text: 'The council can ban the paper only if it wins 100% of the seats — any lower and the limits apply.', outcome: 'No percentage unlocks unlimited power — constitutional protections hold at 51%, 80% or 100%, because they guard the system itself.', reveals: 'full-sweep-unlocks-power' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch02_006', title: 'The bigger picture',
          caseStudy: { intro: 'At the top of the legal pyramid sits one document everyone — citizen and minister alike — must answer to. That is what supreme really means.',
            decisions: [{ prompt: 'What comes next? The Constitution of India: An Introduction · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Constitution of India: An Introduction · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_civ_ch02_001', difficulty: 'standard',
          question: 'A Constitution is the supreme foundational law of a country that sets out the.',
          hint: 'Review c6_civics_ch11_009 to understand why societies establish governments before.',
          misconception: 'Students often think that the Constitution is just a static history book written in 1950 that has no active role today.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Constitution is the supreme foundational law of a country that sets out the fundamental',
                  options: ['A Constitution is the supreme foundational law of a country that sets out the fundamental', 'A constitution serves essential functions for a nation by laying down core rules that', 'The making of the Indian Constitution was carried out by the Constituent Assembly—a', 'The Constituent Assembly was a sovereign body of representatives elected and nominated to'],
                  hint: 'Review c6_civics_ch11_009 to understand why societies establish governments before studying how.',
                  misconception: 'Students often think that the Constitution is just a static history book written in 1950 that has no active role today, or they confuse.' }
          ],
            remediations: { 'the-constitution-is-just-a': { steps: ['Remind the student of the hierarchy of laws by drawing a pyramid with the Constitution at the top, ordinary laws in the.', 'Explain that just as the referee of a cricket match cannot change the rule that a six-run hit requires clearing the.', 'Use the example of judicial review: show how courts check laws against the Constitution to prove it is an active.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch02_002', difficulty: 'standard',
          question: 'A constitution serves essential functions for a nation by laying down core.',
          hint: 'Review node c7_civ_ch02_001 on the definition of a constitution before attempting.',
          misconception: 'Students often think that a constitution only lists citizens\' rights, completely overlooking its primary structural.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A constitution serves essential functions for a nation by laying down core rules that',
                  options: ['A constitution serves essential functions for a nation by laying down core rules that', 'A Constitution is the supreme foundational law of a country that sets out the fundamental', 'The making of the Indian Constitution was carried out by the Constituent Assembly—a', 'The Constituent Assembly was a sovereign body of representatives elected and nominated to'],
                  hint: 'Review node c7_civ_ch02_001 on the definition of a constitution before attempting functional.',
                  misconception: 'Students often think that a constitution only lists citizens\' rights, completely overlooking its primary structural function of defining.' }
          ],
            remediations: { 'a-constitution-only-lists-citizens': { steps: ['Remind students of a game with rules: rules don\'t just tell players what they can do (rights), they also tell the.', 'Show them that the Indian Constitution creates Parliament, gives it law-making power, but also restricts it via.', 'Have them trace how Article 13 stops Parliament from making laws that take away basic rights.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch02_003', difficulty: 'standard',
          question: 'The making of the Indian Constitution was carried out by the Constituent.',
          hint: 'Review c7_civ_ch02_002 to reinforce how fundamental rules protect citizens before.',
          misconception: 'Students often confuse the Constituent Assembly with the modern Parliament (Lok Sabha and Rajya Sabha), believing that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The making of the Indian Constitution was carried out by the Constituent Assembly—a',
                  options: ['The making of the Indian Constitution was carried out by the Constituent Assembly—a', 'A Constitution is the supreme foundational law of a country that sets out the fundamental', 'A constitution serves essential functions for a nation by laying down core rules that', 'The Constituent Assembly was a sovereign body of representatives elected and nominated to'],
                  hint: 'Review c7_civ_ch02_002 to reinforce how fundamental rules protect citizens before studying who.',
                  misconception: 'Students often confuse the Constituent Assembly with the modern Parliament (Lok Sabha and Rajya Sabha), believing that the same members who.' }
          ],
            remediations: { 'students-often-confuse-the-constituent': { steps: ['To fix this misconception, draw a clear timeline on the board showing two distinct phases: Phase 1 (1946-1950) where.', 'Explain that carpenters build a house (Constituent Assembly) before a family moves in and rearranges the furniture.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch02_004', difficulty: 'standard',
          question: 'The Constituent Assembly was a sovereign body of representatives elected and.',
          hint: 'Review c7_civ_ch02_003 to reinforce the basic origin and purpose of the Constituent.',
          misconception: 'Students often think that Mahatma Gandhi wrote the Constitution of India because he was the leader of the freedom.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Constituent Assembly was a sovereign body of representatives elected and nominated to',
                  options: ['The Constituent Assembly was a sovereign body of representatives elected and nominated to', 'A Constitution is the supreme foundational law of a country that sets out the fundamental', 'A constitution serves essential functions for a nation by laying down core rules that', 'The making of the Indian Constitution was carried out by the Constituent Assembly—a'],
                  hint: 'Review c7_civ_ch02_003 to reinforce the basic origin and purpose of the Constituent Assembly before.',
                  misconception: 'Students often think that Mahatma Gandhi wrote the Constitution of India because he was the leader of the freedom movement, or they believe.' }
          ],
            remediations: { 'mahatma-gandhi-wrote-the-constitution': { steps: ['Review the composition of the Constituent Assembly using a structural chart showing committees and key figures like Dr.', 'Emphasize that while freedom fighters won independence, specialized legal committees and elected representatives did.', 'Ask students to trace the timeline from December 1946 to November 1949 to show the time and collaborative effort.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch02_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that Mahatma Gandhi wrote the Constitution of India because he was the leader of the freedom.',
          parts: [
                { id: 'a', prompt: 'Assess whether having members with conflicting viewpoints in the Constituent Assembly slowed down the process or strengthened the final Constitution.', answer: 'Conflicting viewpoints strengthened the Constitution',
                  options: ['Conflicting viewpoints strengthened the Constitution', 'quick rule-making is always better than inclusive, debated consensus', 'a single person drafted it overnight'],
                  hint: 'Review c7_civ_ch02_003 to reinforce the basic origin and purpose of the Constituent Assembly before.',
                  misconception: 'Students often think that Mahatma Gandhi wrote the Constitution of India because he was the leader of the freedom movement, or they believe.' }
          ],
            remediations: { 'mahatma-gandhi-wrote-the-constitution': { steps: ['Review the composition of the Constituent Assembly using a structural chart showing committees and key figures like Dr.', 'Emphasize that while freedom fighters won independence, specialized legal committees and elected representatives did.', 'Ask students to trace the timeline from December 1946 to November 1949 to show the time and collaborative effort.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch02_005', difficulty: 'standard',
          question: 'The Indian freedom struggle was a mass movement against British colonial rule.',
          hint: 'Review the basic history of the Indian National Congress resolutions and why leaders like.',
          misconception: 'Students often think that the fundamental rights and democratic institutions in the Indian Constitution were simply.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Indian freedom struggle was a mass movement against British colonial rule that shaped',
                  options: ['The Indian freedom struggle was a mass movement against British colonial rule that shaped', 'A Constitution is the supreme foundational law of a country that sets out the fundamental', 'A constitution serves essential functions for a nation by laying down core rules that', 'The making of the Indian Constitution was carried out by the Constituent Assembly—a'],
                  hint: 'Review the basic history of the Indian National Congress resolutions and why leaders like Gandhi.',
                  misconception: 'Students often think that the fundamental rights and democratic institutions in the Indian Constitution were simply handed over or gifted.' }
          ],
            remediations: { 'the-fundamental-rights-and-democratic': { steps: ['To fix this misconception, review the history of nationalist demands such as the 1928 Motilal Nehru Report and the 1931.', 'Point out that Indians demanded free speech, equality, and adult franchise while facing imprisonment by the British.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch02_006', difficulty: 'standard',
          question: 'The influence of civilisational heritage on the Indian Constitution refers.',
          hint: 'Review Class 6 Civics Chapter on Unity in Diversity (*c6_civics_ch14_032*) to recall how.',
          misconception: 'Students often believe that the Indian Constitution was entirely invented from scratch by Western-educated lawyers.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The influence of civilisational heritage on the Indian Constitution refers to how ancient',
                  options: ['The influence of civilisational heritage on the Indian Constitution refers to how ancient', 'A Constitution is the supreme foundational law of a country that sets out the fundamental', 'A constitution serves essential functions for a nation by laying down core rules that', 'The making of the Indian Constitution was carried out by the Constituent Assembly—a'],
                  hint: 'Review Class 6 Civics Chapter on Unity in Diversity (*c6_civics_ch14_032*) to recall how Indian.',
                  misconception: 'Students often believe that the Indian Constitution was entirely invented from scratch by Western-educated lawyers in 1949, completely.' }
          ],
            remediations: { 'the-indian-constitution-was-entirely': { steps: ['To fix this, guide the student to examine specific articles of the Constitution alongside ancient Indian texts and.', 'First, show how the Preamble\'s emphasis on \'Fraternity\' mirrors the civilisational ideal of treating society as.', 'Second, read excerpts from Constituent Assembly debates where members explicitly referenced ancient traditions.', 'Third, connect this back to Class 6 diversity studies to prove that pluralism is an ancient Indian trait, not a modern.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
