import type { SimDef } from '../../engine/types';

/** v3 generated — c6_history_ch12 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_history_ch12: SimDef = {
    id: 'v3_c6_history_ch12',
    title: 'India After Independence',
    subtitle: 'This node covers the historical origin and the creation process of the Indian.',
    classLevel: 6, subject: 'history', topic: 'India After Independence',
    chapters: ['c6_history_ch12'],
    nodeIds: ['c6_history_ch12_051', 'c6_history_ch12_052', 'c6_history_ch12_053', 'c6_history_ch12_054', 'c6_history_ch12_055', 'c6_history_ch12_056'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you are starting a new sports club with fifty friends, but you have no rules—everyone would argue.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Fifty friends start a club with no rules and argue about everything. In 1947, India was that club — with hundreds of millions of members. What stopped the chaos?',
        options: ['The Constituent Assembly wrote a Constitution — a rulebook for government and the rights of every citizen', 'One leader wrote all the rules alone in a single night', 'The old British laws were kept forever unchanged', 'Each region made its own private rules with no agreement'],
        answer: 'The Constituent Assembly wrote a Constitution — a rulebook for government and the rights of every citizen',
        hook: 'The Constitution was not written by one person. Nearly 299 members from every region debated together — Dr B R Ambedkar led the Drafting Committee, but the Assembly spoke for the whole nation.',
    },
    teaching: [
        { title: 'The Making of the Constitution', text: 'The Constitution is the fundamental rulebook of a country that defines how the government works and guarantees the basic rights of its citizens.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_history_ch12_051', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sit in the Constituent Assembly — argue for rules that protect every citizen — and help the Drafting Committee turn hundreds of voices into one rulebook for India.',
        labels: ['The Making of', 'Integration of Princely States', 'Economic Planning and Development', 'The Era of Nehru', 'Wars and Challenges', 'India Today: Achievements'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c6_history_ch12_051', title: 'The Making of the Constitution',
          caseStudy: { intro: 'Imagine you are starting a new sports club with fifty friends, but you have no rules—everyone would argue about how to play or who gets to lead.',
            decisions: [{ prompt: 'Who was the chairman of the Drafting Committee responsible for preparing the Constitution?', options: [
                { text: 'The chairman was Dr', outcome: 'The chairman was Dr. B.R. Ambedkar. A wrong answer here suggests the student has not memorized the.' },
                { text: 'the Constitution was written by a single person, like Dr', outcome: 'Not quite — Students often think the Constitution was written by a single person, like Dr. B.R.', reveals: 'the-constitution-was-written-by' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch12_052', title: 'Integration of Princely States',
          caseStudy: { intro: 'Imagine you are building a large puzzle, but 500 of the pieces are acting like they are independent little puzzles of their own.',
            decisions: [{ prompt: 'What were the three specific choices offered to the rulers of the princely states at the time of independence?', options: [
                { text: 'The rulers could choose to join India, join Pakistan, or remain independent', outcome: 'The rulers could choose to join India, join Pakistan, or remain independent.' },
                { text: 'all princely states were forced into India by military power alone', outcome: 'Not quite — Students often think all princely states were forced into India by military power alone.', reveals: 'all-princely-states-were-forced' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch12_053', title: 'Economic Planning and Development',
          caseStudy: { intro: 'Imagine you are planning a long family vacation: you need a budget, a list of places to visit, and a timeline to ensure you don\'t run out of money or time.',
            decisions: [{ prompt: 'What was the main purpose of establishing the Planning Commission in 1950?', options: [
                { text: 'The Planning Commission was established to create structured Five-Year Plans to solve', outcome: 'The Planning Commission was established to create structured Five-Year Plans to solve India\'s.' },
                { text: 'Economic Planning', outcome: 'Not quite — Students often think "Economic Planning" means the government controlled every single person\'s job.', reveals: 'economic-planning-means-the-government' },
                { text: 'the commission was for making laws rather than economic strategy', outcome: 'Not quite — Students often think "Economic Planning" means the government controlled every single person\'s job.', reveals: 'economic-planning-means-the-government' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch12_054', title: 'The Era of Nehru',
          caseStudy: { intro: 'Imagine you are asked to build a new house for a large family that has just moved in; how would you decide on the rules for everyone to live together.',
            decisions: [{ prompt: 'Who was the first Prime Minister of India, and how long did he serve?', options: [
                { text: 'Jawaharlal Nehru was the first Prime Minister, serving from 1947 to 1964', outcome: 'Jawaharlal Nehru was the first Prime Minister, serving from 1947 to 1964.' },
                { text: 'mixed economy', outcome: 'Not quite — Students often confuse "mixed economy" with "having no money" or "only government control." They.', reveals: 'students-often-confuse-mixed-economy' },
                { text: 'having no money', outcome: 'Not quite — Students often confuse "mixed economy" with "having no money" or "only government control." They.', reveals: 'students-often-confuse-mixed-economy' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch12_055', title: 'Wars and Challenges',
          caseStudy: { intro: 'If your school had to suddenly build a new fence and hire security because of problems with neighbors, how would that change your daily plans?',
            decisions: [{ prompt: 'Which country did India fight its first war with in 1947-48?', options: [
                { text: 'India fought its first war with Pakistan over the region of Kashmir', outcome: 'India fought its first war with Pakistan over the region of Kashmir.' },
                { text: 'all conflicts after 1947 were against the same enemy (Pakistan)', outcome: 'Not quite — Students often assume that all conflicts after 1947 were against the same enemy (Pakistan).', reveals: 'all-conflicts-after-1947-were' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch12_051', title: 'Use it in the wild',
          caseStudy: { intro: 'A student asks a fair question: \'The British ruled us for two centuries — why didn\'t they just leave us a ready-made constitution instead of us spending years writing one?\'',
            decisions: [{ prompt: 'Why did independent India have to write its own Constitution?', options: [
                { text: 'Because a constitution is a nation\'s own rulebook — it had to express what Indians chose for themselves: equality, rights, self-government. So an elected Constituent Assembly debated and drafted it, with members from different regions and communities; a document written by departing colonisers could never carry that legitimacy, and an assembly missing women or whole regions would have produced a rulebook that didn\'t speak for everyone.', outcome: 'The years of debate were the point — a constitution is legitimate because the people\'s representatives argued it into existence, not because it arrived quickly.' },
                { text: 'A ready-made constitution would have been better — any complete rulebook works, and writing one wasted years.', outcome: 'Rules imposed by a departing power carry no consent — the Constituent Assembly\'s long debates are what made the document belong to Indians.', reveals: 'any-rulebook-works' },
                { text: 'India wrote one only because other nations did — the content hardly mattered as long as a document existed.', outcome: 'It was not imitation — the Assembly chose specific rights and structures for India\'s own needs, which is why the drafting took years of real argument.', reveals: 'constitution-is-formality' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch12_056', title: 'You made it',
          caseStudy: { intro: 'A country this diverse runs on agreed rules, not on one voice. The Constitution is the debate of a whole nation, written down.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_history_ch12_051', difficulty: 'standard',
          question: 'The Constitution is the fundamental rulebook of a country that defines how the.',
          hint: 'Review the timeline of the end of British rule in India.',
          misconception: 'Students often think the Constitution was written by a single person, like Dr. B.R. Ambedkar, acting alone.',
          parts: [
                { id: 'a', prompt: 'Who was the chairman of the Drafting Committee responsible for preparing the Constitution?', answer: 'The chairman was Dr',
                  options: ['The chairman was Dr', 'the Constitution was written by a single person, like Dr'],
                  hint: 'Review the timeline of the end of British rule in India.',
                  misconception: 'Students often think the Constitution was written by a single person, like Dr. B.R. Ambedkar, acting alone.' },
                { id: 'b', prompt: 'If you were part of the Constituent Assembly, why would it be important to have members from different regions and religions?', answer: 'Identify the goal of unity',
                  options: ['Identify the goal of unity', 'the Constitution was written by a single person, like Dr'],
                  hint: 'Review the timeline of the end of British rule in India.',
                  misconception: 'Students often think the Constitution was written by a single person, like Dr. B.R. Ambedkar, acting alone.' },
                { id: 'c', prompt: 'How did the number of members in the Constituent Assembly change from 1946 to the final drafting period?', answer: 'The number dropped from 389 to 299 due to the partition of India',
                  options: ['The number dropped from 389 to 299 due to the partition of India', 'the Constitution was written by a single person, like Dr'],
                  hint: 'Review the timeline of the end of British rule in India.',
                  misconception: 'Students often think the Constitution was written by a single person, like Dr. B.R. Ambedkar, acting alone.' }
          ],
            remediations: { 'the-constitution-was-written-by': { steps: ['If the student thinks one person wrote the Constitution, ask them: "If only one person wrote the rules, would everyone.', 'Ambedkar led the drafting, but he did it for the whole Assembly."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch12_051', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Constitution was written by a single person, like Dr. B.R. Ambedkar, acting alone.',
          parts: [
                { id: 'a', prompt: 'Imagine you are writing a "Constitution" for your classroom. What are the first three things you would include to ensure everyone is treated fairly?', answer: 'A good answer includes: 1',
                  options: ['A good answer includes: 1', 'the Constitution was written by a single person, like Dr'],
                  hint: 'Review the timeline of the end of British rule in India.',
                  misconception: 'Students often think the Constitution was written by a single person, like Dr. B.R. Ambedkar, acting alone.' }
          ],
            remediations: { 'the-constitution-was-written-by': { steps: ['If the student thinks one person wrote the Constitution, ask them: "If only one person wrote the rules, would everyone.', 'Ambedkar led the drafting, but he did it for the whole Assembly."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch12_052', difficulty: 'standard',
          question: 'The integration of princely states was the political process of bringing over.',
          hint: 'Review the definition of \'British India\' vs \'Princely States\' in the chapter introduction.',
          misconception: 'Students often think all princely states were forced into India by military power alone.',
          parts: [
                { id: 'a', prompt: 'What were the three specific choices offered to the rulers of the princely states at the time of independence?', answer: 'The rulers could choose to join India, join Pakistan, or remain independent',
                  options: ['The rulers could choose to join India, join Pakistan, or remain independent', 'all princely states were forced into India by military power alone'],
                  hint: 'Review the definition of \'British India\' vs \'Princely States\' in the chapter introduction.',
                  misconception: 'Students often think all princely states were forced into India by military power alone.' },
                { id: 'b', prompt: 'Why is Sardar Vallabhbhai Patel often referred to as the \'Iron Man\' in the context of this specific historical event?', answer: 'He is called this',
                  options: ['He is called this', 'all princely states were forced into India by military power alone'],
                  hint: 'Review the definition of \'British India\' vs \'Princely States\' in the chapter introduction.',
                  misconception: 'Students often think all princely states were forced into India by military power alone.' }
          ],
            remediations: { 'all-princely-states-were-forced': { steps: ['First, explain that 500+ states could not have been conquered by force at once.', 'Show them a map of India and point out that most states were small and scattered; ask them how the government would.', 'Then, introduce the term \'Instrument of Accession\' to show that joining was a formal, written agreement, not just.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch12_053', difficulty: 'standard',
          question: 'Economic planning is the process where the government creates a structured.',
          hint: 'Review the challenges India faced in 1947, specifically food shortages.',
          misconception: 'Students often think "Economic Planning" means the government controlled every single person\'s job or personal.',
          parts: [
                { id: 'a', prompt: 'Why did the government decide that the state (the government) should play a major role in the economy?', answer: 'The government took a major role',
                  options: ['The government took a major role', 'Economic Planning'],
                  hint: 'Review the challenges India faced in 1947, specifically food shortages.',
                  misconception: 'Students often think "Economic Planning" means the government controlled every single person\'s job or personal spending.' },
                { id: 'b', prompt: 'If you were in charge of the First Five-Year Plan, why would you prioritize agriculture over building large factories?', answer: 'You would prioritize agriculture',
                  options: ['You would prioritize agriculture', 'Economic Planning'],
                  hint: 'Review the challenges India faced in 1947, specifically food shortages.',
                  misconception: 'Students often think "Economic Planning" means the government controlled every single person\'s job or personal spending.' }
          ],
            remediations: { 'economic-planning-means-the-government': { steps: ['Review the concept of "National Priorities." Ask the student: "If a house has a leaky roof and no kitchen, which do you.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch12_054', difficulty: 'standard',
          question: 'The Nehru Era refers to the period from 1947 to 1964 when Jawaharlal Nehru.',
          hint: 'Review the transition from British rule to self-rule.',
          misconception: 'Students often confuse "mixed economy" with "having no money" or "only government control." They mistakenly believe.',
          parts: [
                { id: 'a', prompt: 'Who was the first Prime Minister of India, and how long did he serve?', answer: 'Jawaharlal Nehru was the first Prime Minister, serving from 1947 to 1964',
                  options: ['Jawaharlal Nehru was the first Prime Minister, serving from 1947 to 1964', 'mixed economy', 'having no money', 'only government control'],
                  hint: 'Review the transition from British rule to self-rule.',
                  misconception: 'Students often confuse "mixed economy" with "having no money" or "only government control." They mistakenly believe that because Nehru was.' },
                { id: 'b', prompt: 'If a village has both a government-run post office and privately owned shops, which economic system is it following?', answer: 'It is following a mixed economy',
                  options: ['It is following a mixed economy', 'mixed economy', 'having no money', 'only government control'],
                  hint: 'Review the transition from British rule to self-rule.',
                  misconception: 'Students often confuse "mixed economy" with "having no money" or "only government control." They mistakenly believe that because Nehru was.' }
          ],
            remediations: { 'students-often-confuse-mixed-economy': { steps: ['Explain to the student that a "mixed" economy is like a school sports team where the coach (the government) sets the.', 'Use the example of how a government railway exists alongside a private grocery store to show that both work together.', 'Ask them to name one thing in their town that is government-owned and one that is private.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch12_055', difficulty: 'standard',
          question: '"Wars and Challenges" refers to the series of major international military.',
          hint: 'Review the map of the Indian Subcontinent and the events of the 1947 partition.',
          misconception: 'Students often assume that all conflicts after 1947 were against the same enemy (Pakistan).',
          parts: [
                { id: 'a', prompt: 'Which country did India fight its first war with in 1947-48?', answer: 'India fought its first war with Pakistan over the region of Kashmir',
                  options: ['India fought its first war with Pakistan over the region of Kashmir', 'all conflicts after 1947 were against the same enemy (Pakistan)'],
                  hint: 'Review the map of the Indian Subcontinent and the events of the 1947 partition.',
                  misconception: 'Students often assume that all conflicts after 1947 were against the same enemy (Pakistan).' },
                { id: 'b', prompt: 'If a country experiences a "stalemate" in a war, what does that mean for the outcome?', answer: 'A stalemate means neither side won a clear victory',
                  options: ['A stalemate means neither side won a clear victory', 'all conflicts after 1947 were against the same enemy (Pakistan)', 'every war must have a clear winner and loser'],
                  hint: 'Review the map of the Indian Subcontinent and the events of the 1947 partition.',
                  misconception: 'Students often assume that all conflicts after 1947 were against the same enemy (Pakistan).' }
          ],
            remediations: { 'all-conflicts-after-1947-were': { steps: ['Review the map of India and its neighbors.', 'Create a timeline on a piece of paper.', 'Label "1947-48: Pakistan," "1962: China," and "1965: Pakistan." Notice that the enemies are different, which required.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch12_056', difficulty: 'standard',
          question: 'India today is a democratic nation that has evolved from its ancient roots into.',
          hint: 'Review the definitions of the Indian Subcontinent provided in the first half of the.',
          misconception: 'Students often think that the name \'India\' was the original name of the land, whereas it is actually a name derived.',
          parts: [
                { id: 'a', prompt: 'Why do we call India a "democracy" today?', answer: 'We call it a democracy',
                  options: ['We call it a democracy', 'democracy', 'monarchy', 'ancient empire'],
                  hint: 'Review the definitions of the Indian Subcontinent provided in the first half of the chapter.',
                  misconception: 'Students often think that the name \'India\' was the original name of the land, whereas it is actually a name derived from the river \'Sindhu\'.' }
          ],
            remediations: { 'the-name-india-was-the': { steps: ['Review the chapter section on how foreign travelers named the land based on the Sindhu river.', 'Point out the difference between \'Bhārata\' (inward name) and \'India\' (outward name).', 'Ask them to map the evolution: Sindhu -> Hindu -> Indoi -> India.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
