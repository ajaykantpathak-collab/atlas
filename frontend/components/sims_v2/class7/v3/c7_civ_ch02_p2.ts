import type { SimDef } from '../../engine/types';

/** v3 generated — c7_civ_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_civ_ch02_p2: SimDef = {
    id: 'v3_c7_civ_ch02_p2',
    title: 'The Constitution of India: An Introduction · Part 2/2',
    subtitle: 'Covers the foundational architectural features of the Indian Constitution as established.',
    classLevel: 7, subject: 'civics', topic: 'The Constitution of India: An Introduction · Part 2/2',
    chapters: ['c7_civ_ch02'],
    nodeIds: ['c7_civ_ch02_007', 'c7_civ_ch02_008', 'c7_civ_ch02_009', 'c7_civ_ch02_010', 'c7_civ_ch02_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are watching a news debate where people are arguing about whether a state government can change.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Parliament passes a law that clashes head-on with the Constitution — say, banning a freedom the Constitution guarantees. In this collision, which document wins, and who calls it?',
        options: ['The Constitution wins — it is the supreme law, and the courts strike down any ordinary law that violates it', 'Parliament wins — the newest law always overrules older documents', 'Nobody wins — both laws apply at the same time', 'The Prime Minister decides which one counts'],
        answer: 'The Constitution wins — it is the supreme law, and the courts strike down any ordinary law that violates it',
        hook: 'The Constitution is not a history book frozen in 1950 — it is the living rulebook that even the rulers must obey. Ordinary laws change with a simple vote; the Constitution demands a much harder special process, so nobody can rewrite the game mid-play.',
    },
    teaching: [
        { title: 'Key Features of the Constitution of India', text: 'The key features of the Constitution of India refer to its fundamental design elements—such as federalism, parliamentary form of government, separation of powers, fundamental rights, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_civ_ch02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Draft a mini-constitution for your school — write one clause that stops any single council member from holding absolute power, then test it against a misuse scenario.',
        labels: ['Key Features of', 'Fundamental Rights: Meaning', 'Directive Principles of State', 'Preamble to the Constitution', 'Relevance of the Constitution'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_civ_ch02_007', title: 'Key Features of the Constitution of India',
          caseStudy: { intro: 'Imagine you are watching a news debate where people are arguing about whether a state government can change a national education policy on its own, or why the.',
            decisions: [{ prompt: 'What is the term used to describe a system of government where power is divided between a central government and regional (state).', options: [
                { text: 'federalism (or a federal system)', outcome: 'The correct answer is federalism (or a federal system). A student who answers "unitary system".' },
                { text: 'unitary system', outcome: 'Not quite — Students often think that "federalism" means the central government can abolish state governments.', reveals: 'federalism-means-the-central-government' },
                { text: 'monarchy', outcome: 'Not quite — Students often think that "federalism" means the central government can abolish state governments.', reveals: 'federalism-means-the-central-government' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch02_009', title: 'Directive Principles of State Policy',
          caseStudy: { intro: 'Imagine walking through your town and noticing that while some people have access to good schools and hospitals, others struggle to find daily work or proper.',
            decisions: [{ prompt: 'What part of the Indian Constitution contains the Directive Principles of State Policy, and which articles do they cover?', options: [
                { text: 'The Directive Principles of State Policy are contained in Part IV of the Indian', outcome: 'The Directive Principles of State Policy are contained in Part IV of the Indian Constitution.' },
                { text: 'non-justiciable', outcome: 'Not quite — Students often think that because Directive Principles are "non-justiciable," the government can.', reveals: 'because-directive-principles-are-non' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch02_010', title: 'Preamble to the Constitution: Values and Ideals',
          caseStudy: { intro: 'Imagine you are reading the opening page of a thick, important book of rules for a school club, and the very first paragraph tells you what the club stands.',
            decisions: [{ prompt: 'What are the five key descriptive terms used in the Preamble to define the nature of the Indian State?', options: [
                { text: 'Sovereign, Socialist, Secular, Democratic, and Republic', outcome: 'The correct answer is Sovereign, Socialist, Secular, Democratic, and Republic.' },
                { text: 'Fundamental Rights', outcome: 'Not quite — Students often think the Preamble is a legally enforceable set of commands like Fundamental Rights.', reveals: 'the-preamble-is-a-legally' },
                { text: 'Justice, Liberty, Equality, Fraternity', outcome: 'Not quite — Students often think the Preamble is a legally enforceable set of commands like Fundamental Rights.', reveals: 'the-preamble-is-a-legally' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch02_011', title: 'Relevance of the Constitution Today',
          caseStudy: { intro: 'Imagine reading a rulebook given to your school eighty years ago, yet finding it still successfully guides how your digital club, playground rules, and student.',
            decisions: [{ prompt: 'What term is commonly used to describe the Constitution of India because it can be amended and interpreted to fit changing times?', options: [
                { text: 'a "living document" (or dynamic Constitution)', outcome: 'The correct answer is a "living document" (or dynamic Constitution).' },
                { text: 'static', outcome: 'Not quite — Students often think that the Constitution is a fixed historical relic that cannot change or apply.', reveals: 'the-constitution-is-a-fixed' },
                { text: 'permanent book', outcome: 'Not quite — Students often think that the Constitution is a fixed historical relic that cannot change or apply.', reveals: 'the-constitution-is-a-fixed' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A newly elected school council wins 80% of the seats. Their first announcement: \'We now have the right to ban the school newspaper that criticised us, and to remove all opposing voices from debates.\'',
            decisions: [{ prompt: 'Does a landslide victory really grant that power?', options: [
                { text: 'No — a constitution limits what any government may do, however big its majority. Rights like free expression and the existence of opposition sit above ordinary majority decisions, so the council can pass rules but cannot silence criticism. A constitution exists precisely to bind the winners — without it, every election would hand one group unlimited power.', outcome: 'Winning big grants the power to govern, not the power to abolish the rules of the game — constitutional limits are what keep a majority democratic.' },
                { text: 'Yes — whoever wins the most seats may make any rule, since the majority\'s choice is final.', outcome: 'Majority rule operates inside constitutional limits — dissolving criticism and opposition would break the very framework that made the election legitimate.', reveals: 'majority-means-unlimited' },
                { text: 'The council can ban the paper only if it wins 100% of the seats — any lower and the limits apply.', outcome: 'No percentage unlocks unlimited power — constitutional protections hold at 51%, 80% or 100%, because they guard the system itself.', reveals: 'full-sweep-unlocks-power' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch02_011', title: 'You made it',
          caseStudy: { intro: 'At the top of the legal pyramid sits one document everyone — citizen and minister alike — must answer to. That is what supreme really means.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_civ_ch02_007', difficulty: 'standard',
          question: 'The key features of the Constitution of India refer to its fundamental design.',
          hint: 'Review the basic definitions of legislature, executive, and judiciary, along with the.',
          misconception: 'Students often think that "federalism" means the central government can abolish state governments whenever it wants.',
          parts: [
                { id: 'a', prompt: 'What is the term used to describe a system of government where power is divided between a central government and regional (state) governments?', answer: 'federalism (or a federal system)',
                  options: ['federalism (or a federal system)', 'unitary system', 'monarchy', 'federalism'],
                  hint: 'Review the basic definitions of legislature, executive, and judiciary, along with the concept.',
                  misconception: 'Students often think that "federalism" means the central government can abolish state governments whenever it wants, treating states merely.' },
                { id: 'b', prompt: 'Analyze the relationship between the Legislature and the Executive in India\'s parliamentary system. How does this differ from a presidential system?', answer: 'In India\'s parliamentary system, the executive (Ministers) is drawn from and is',
                  options: ['In India\'s parliamentary system, the executive (Ministers) is drawn from and is', 'federalism'],
                  hint: 'Review the basic definitions of legislature, executive, and judiciary, along with the concept.',
                  misconception: 'Students often think that "federalism" means the central government can abolish state governments whenever it wants, treating states merely.' }
          ],
            remediations: { 'federalism-means-the-central-government': { steps: ['To fix this misconception, review the three legislative lists in the Constitution (Union, State, and Concurrent Lists).', 'Show students that state governments make laws for their own regions independently, proving that power.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "federalism" means the central government can abolish state governments whenever it wants.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Secularism in the Indian Constitution means that the government promotes one official state religion." Is this statement accurate?', answer: 'The statement is false',
                  options: ['The statement is false', 'federalism'],
                  hint: 'Review the basic definitions of legislature, executive, and judiciary, along with the concept.',
                  misconception: 'Students often think that "federalism" means the central government can abolish state governments whenever it wants, treating states merely.' }
          ],
            remediations: { 'federalism-means-the-central-government': { steps: ['To fix this misconception, review the three legislative lists in the Constitution (Union, State, and Concurrent Lists).', 'Show students that state governments make laws for their own regions independently, proving that power.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch02_008', difficulty: 'standard',
          question: 'Fundamental Rights are the basic human rights enshrined in Part III of the.',
          hint: 'Review node c7_civ_ch02_007 to reinforce how the Constitution protects citizen interests.',
          misconception: 'Students often believe that Fundamental Rights can be claimed against private individuals or private companies in the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Fundamental Rights are the basic human rights enshrined in Part III of the Indian',
                  options: ['Fundamental Rights are the basic human rights enshrined in Part III of the Indian', 'A Constitution is the supreme foundational law of a country that sets out the fundamental', 'A constitution serves essential functions for a nation by laying down core rules that', 'The making of the Indian Constitution was carried out by the Constituent Assembly—a'],
                  hint: 'Review node c7_civ_ch02_007 to reinforce how the Constitution protects citizen interests against.',
                  misconception: 'Students often believe that Fundamental Rights can be claimed against private individuals or private companies in the same way they are.' }
          ],
            remediations: { 'fundamental-rights-can-be-claimed': { steps: ['To fix this, guide the student to examine who holds the duty when a right is violated.', 'Explain that Fundamental Rights are primarily claims *against the State* (government bodies, police, public.', 'Use the example of police harassment versus a dispute between two neighbors: police action violates a constitutional.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch02_009', difficulty: 'standard',
          question: 'Directive Principles of State Policy (DPSP) are guidelines and principles.',
          hint: 'Review c7_civ_ch02_008 to recall how Fundamental Rights protect citizens legally before.',
          misconception: 'Students often think that because Directive Principles are "non-justiciable," the government can completely ignore them.',
          parts: [
                { id: 'a', prompt: 'What part of the Indian Constitution contains the Directive Principles of State Policy, and which articles do they cover?', answer: 'The Directive Principles of State Policy are contained in Part IV of the Indian',
                  options: ['The Directive Principles of State Policy are contained in Part IV of the Indian', 'non-justiciable'],
                  hint: 'Review c7_civ_ch02_008 to recall how Fundamental Rights protect citizens legally before exploring.',
                  misconception: 'Students often think that because Directive Principles are "non-justiciable," the government can completely ignore them without any.' },
                { id: 'b', prompt: 'Why are Directive Principles of State Policy described as "non-justiciable"?', answer: 'They are non-justiciable',
                  options: ['They are non-justiciable', 'non-justiciable'],
                  hint: 'Review c7_civ_ch02_008 to recall how Fundamental Rights protect citizens legally before exploring.',
                  misconception: 'Students often think that because Directive Principles are "non-justiciable," the government can completely ignore them without any.' },
                { id: 'c', prompt: 'A state government decides to launch a free nutritional meal program for all school children to improve public health.', answer: 'The government is acting upon the Directive Principles of State Policy',
                  options: ['The government is acting upon the Directive Principles of State Policy', 'non-justiciable'],
                  hint: 'Review c7_civ_ch02_008 to recall how Fundamental Rights protect citizens legally before exploring.',
                  misconception: 'Students often think that because Directive Principles are "non-justiciable," the government can completely ignore them without any.' }
          ],
            remediations: { 'because-directive-principles-are-non': { steps: ['To fix this misconception, remind the student that legal enforceability (courts) is only one way to ensure.', 'Explain that while courts cannot force the government to implement a DPSP overnight, voters exercise democratic control.', 'Point out real-world schemes like rural employment guarantees (MGNREGA) to show that governments do adopt DPSPs into.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch02_010', difficulty: 'standard',
          question: 'The Preamble to the Indian Constitution is an introductory statement that.',
          hint: 'Review democratic ideals and fundamental rights from Grade 6 civics to see how.',
          misconception: 'Students often think the Preamble is a legally enforceable set of commands like Fundamental Rights, believing they can.',
          parts: [
                { id: 'a', prompt: 'What are the five key descriptive terms used in the Preamble to define the nature of the Indian State?', answer: 'Sovereign, Socialist, Secular, Democratic, and Republic',
                  options: ['Sovereign, Socialist, Secular, Democratic, and Republic', 'Fundamental Rights', 'Justice, Liberty, Equality, Fraternity', 'My Preamble rights were violated'],
                  hint: 'Review democratic ideals and fundamental rights from Grade 6 civics to see how foundational values.',
                  misconception: 'Students often think the Preamble is a legally enforceable set of commands like Fundamental Rights, believing they can directly file.' },
                { id: 'b', prompt: 'Why is India described as a "Republic" rather than a monarchy in the Preamble?', answer: 'India is a Republic',
                  options: ['India is a Republic', 'My Preamble rights were violated'],
                  hint: 'Review democratic ideals and fundamental rights from Grade 6 civics to see how foundational values.',
                  misconception: 'Students often think the Preamble is a legally enforceable set of commands like Fundamental Rights, believing they can directly file.' },
                { id: 'c', prompt: 'A local sports club in your neighborhood denies membership to children from certain communities.', answer: 'Equality and Fraternity',
                  options: ['Equality and Fraternity', 'Sovereignty', 'My Preamble rights were violated'],
                  hint: 'Review democratic ideals and fundamental rights from Grade 6 civics to see how foundational values.',
                  misconception: 'Students often think the Preamble is a legally enforceable set of commands like Fundamental Rights, believing they can directly file.' }
          ],
            remediations: { 'the-preamble-is-a-legally': { steps: ['To fix this, explain that the Preamble is like the "title track" or "mission statement" of a movie or organization—it.', 'Show students that while courts look at the Preamble to understand the spirit of the law, actual legal complaints must.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch02_011', difficulty: 'standard',
          question: 'The relevance of the Constitution today refers to how a foundational legal.',
          hint: 'Review node c7_civ_ch02_010 to re-familiarize yourself with the core values and ideals.',
          misconception: 'Students often think that the Constitution is a fixed historical relic that cannot change or apply to modern inventions.',
          parts: [
                { id: 'a', prompt: 'What term is commonly used to describe the Constitution of India because it can be amended and interpreted to fit changing times?', answer: 'a "living document" (or dynamic Constitution)',
                  options: ['a "living document" (or dynamic Constitution)', 'static', 'permanent book'],
                  hint: 'Review node c7_civ_ch02_010 to re-familiarize yourself with the core values and ideals of the.',
                  misconception: 'Students often think that the Constitution is a fixed historical relic that cannot change or apply to modern inventions like smartphones.' },
                { id: 'b', prompt: 'A group of citizens files a Public Interest Litigation (PIL) in the Supreme Court demanding that the government provide clean drinking water to all urban.', answer: 'the judicial mechanism of Public Interest Litigation (PIL) and the expansive',
                  options: ['the judicial mechanism of Public Interest Litigation (PIL) and the expansive', 'citizens cannot approach courts for social needs'],
                  hint: 'Review node c7_civ_ch02_010 to re-familiarize yourself with the core values and ideals of the.',
                  misconception: 'Students often think that the Constitution is a fixed historical relic that cannot change or apply to modern inventions like smartphones.' },
                { id: 'c', prompt: 'Analyze the relationship between the Preamble\'s ideals (Justice, Liberty, Equality, Fraternity) and modern laws passed by Parliament to protect consumer rights.', answer: 'The Preamble serves as the moral compass and guiding light for lawmakers',
                  options: ['The Preamble serves as the moral compass and guiding light for lawmakers', 'just an introductory paragraph with no practical power'],
                  hint: 'Review node c7_civ_ch02_010 to re-familiarize yourself with the core values and ideals of the.',
                  misconception: 'Students often think that the Constitution is a fixed historical relic that cannot change or apply to modern inventions like smartphones.' }
          ],
            remediations: { 'the-constitution-is-a-fixed': { steps: ['To fix this, guide the student through a real example: look at Article 21 (Right to Life and Personal Liberty).', 'Explain how the Supreme Court interpreted "life" not just as physical existence, but as a life with dignity, which.', 'Show that the words remain the same, but their application grows with time through judicial interpretation and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
