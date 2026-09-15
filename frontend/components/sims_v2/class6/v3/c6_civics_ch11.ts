import type { SimDef } from '../../engine/types';

/** v3 generated — c6_civics_ch11 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_civics_ch11: SimDef = {
    id: 'v3_c6_civics_ch11',
    title: 'The Government and the People',
    subtitle: 'If the PM can\'t fix your school tap, who is the government?',
    classLevel: 6, subject: 'civics', topic: 'The Government and the People',
    chapters: ['c6_civics_ch11'],
    nodeIds: ['c6_civics_ch11_009', 'c6_civics_ch11_010', 'c6_civics_ch11_011', 'c6_civics_ch11_012', 'c6_civics_ch11_013', 'c6_civics_ch11_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'town manager for a day', intro: 'The taps run, the buses move, the school gate opens — someone is running all of it. Today that someone is you, and the government turns out to be everywhere.', goal: 'See government as a system of services, not a single leader.' },
    discovery: {
        question: 'Ask a class \'Who is the government?\' and most shout \'the Prime Minister!\' But the PM can\'t personally fix your school tap, run the hospital and patrol the roads. So who — or what — is the government really?',
        options: ['A whole system — schools, hospitals, police, road departments — that makes rules and keeps services running', 'The PM and President alone — everyone else just works for them', 'Only the police, because they\'re the ones who enforce rules', 'The richest citizens, because they pay for the services'],
        answer: 'A whole system — schools, hospitals, police, road departments — that makes rules and keeps services running',
        hook: 'The government is less like a single captain and more like the referee plus the entire stadium crew — a system, not a face on TV.',
    },
    teaching: [
        { title: 'What is Government and Why We Need It', text: 'A government is the organized group of people and the system of rules that manages a community or country.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_civics_ch11_009', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Spend one day as the invisible manager of your town — keep water, roads, schools and safety running — and count how many \'governments\' are really at work.',
        labels: ['What is Government', 'Types of Government: Democracy,', 'Democracy: Government of', 'How Elections Work', 'Levels of Government: National,', 'Citizen Participation in Government'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_civics_ch11_009', title: 'What is Government and Why We Need It',
          caseStudy: { intro: 'Think about your school playground: what happens if there are no rules for a game like cricket or kabaddi?',
            decisions: [{ prompt: 'What are the three main things a government does for its citizens?', options: [
                { text: 'The government makes laws, enforces those laws, and provides public services', outcome: 'The government makes laws, enforces those laws, and provides public services.' },
                { text: 'protecting the country', outcome: 'Not quite — Students often believe "Government" refers only to the Prime Minister or the President.', reveals: 'government-refers-only-to-the' },
                { text: 'making laws', outcome: 'Not quite — Students often believe "Government" refers only to the Prime Minister or the President.', reveals: 'government-refers-only-to-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch11_010', title: 'Types of Government: Democracy, Monarchy, Dictatorship',
          caseStudy: { intro: 'Think about how your classroom runs: do you all vote to pick a class leader, does the teacher always choose one person based on their family, or does one.',
            decisions: [{ prompt: 'Who holds the power in a democracy?', options: [
                { text: 'The people hold the power and use it to elect representatives', outcome: 'The people hold the power and use it to elect representatives.' },
                { text: 'government', outcome: 'Not quite — Students often think "government" only refers to the people in the capital city.', reveals: 'government-only-refers-to-the' },
                { text: 'power resides only with the leader, failing to recognize the role of the voter', outcome: 'Not quite — Students often think "government" only refers to the people in the capital city.', reveals: 'government-only-refers-to-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch11_011', title: 'Democracy: Government of the People, by the People, for the People',
          caseStudy: { intro: 'Imagine your entire school had to decide on the color of the new uniform.',
            decisions: [{ prompt: 'What does the term \'democracy\' mean, and which two Greek words does it come from?', options: [
                { text: 'Democracy means \'people\'s power\' or \'rule by the people.\' It comes from the Greek words', outcome: 'Democracy means \'people\'s power\' or \'rule by the people.\' It comes from the Greek words \'demos\'.' },
                { text: 'democracy is ONLY about the day they vote in an election', outcome: 'Not quite — Students often think democracy is ONLY about the day they vote in an election.', reveals: 'democracy-is-only-about-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch11_012', title: 'How Elections Work in India',
          caseStudy: { intro: 'Think about how your class picks a monitor: you all have a say, but you can’t all be the monitor at once.',
            decisions: [{ prompt: 'Who is responsible for conducting fair elections in India?', options: [
                { text: 'The Election Commission', outcome: 'The Election Commission. A wrong answer suggests the student confuses the Election Commission with.' },
                { text: 'executive', outcome: 'Not quite — Students often think the current government decides who wins elections.', reveals: 'the-current-government-decides-who' },
                { text: 'Election Commission', outcome: 'Not quite — Students often think the current government decides who wins elections.', reveals: 'the-current-government-decides-who' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch11_013', title: 'Levels of Government: National, State, Local',
          caseStudy: { intro: 'Think about how you fix a problem at home: if your bedroom light stops working, you change the bulb; if the whole house loses power, you call the electric.',
            decisions: [{ prompt: 'What are the three levels of government in India?', options: [
                { text: 'The three levels are the local, state, and national (or central/union) governments', outcome: 'The three levels are the local, state, and national (or central/union) governments.' },
                { text: 'only one', outcome: 'Not quite — Students often think the Central Government controls everything, including neighborhood issues.', reveals: 'the-central-government-controls-everything' },
                { text: 'the Central Government controls everything, including neighborhood issues', outcome: 'Not quite — Students often think the Central Government controls everything, including neighborhood issues.', reveals: 'the-central-government-controls-everything' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch11_014', title: 'Citizen Participation in Government',
          caseStudy: { intro: 'Have you ever felt that a rule at your school, like the playground schedule, was unfair?',
            decisions: [{ prompt: 'Name two ways a citizen can participate in a democracy besides voting during an election.', options: [
                { text: 'Citizens can attend public meetings or write letters to their representatives', outcome: 'Citizens can attend public meetings or write letters to their representatives.' },
                { text: 'joining a political party', outcome: 'Not quite — Students often believe that "participation" means they must be experts or politicians to be heard.', reveals: 'participation-means-they-must-be' },
                { text: 'participation', outcome: 'Not quite — Students often believe that "participation" means they must be experts or politicians to be heard.', reveals: 'participation-means-they-must-be' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch11_009', title: 'Use it in the wild',
          caseStudy: { intro: 'At a family dinner, an uncle grumbles: \'Why must I pay tax for the city bus and the government school? I use neither — tax should be optional for people who don\'t use the service.\'',
            decisions: [{ prompt: 'Why do governments in a democracy get to collect taxes even from people who object?', options: [
                { text: 'Because shared services can only exist if everyone contributes — no one person could fund a road network, a water supply or schools alone, and the system works only if paying in does not depend on personally using each service. In a democracy the law obliges everyone precisely because the government that makes it was chosen by the people themselves.', outcome: 'Government\'s coercive power is legitimate here because it funds public goods and is answerable to voters — taxes are the membership fee of a shared system, not a shop bill.' },
                { text: 'The uncle is right — taxes are like purchases, so people should pay only for the services they personally use.', outcome: 'Public services are not private purchases — clean water, roads and schools exist only because everyone funds the common pool whether or not they use each part.', reveals: 'tax-is-a-purchase' },
                { text: 'He has a point that taxes are unfair — but at least the services would survive if only willing people paid.', outcome: 'Voluntary payment collapses public services — too few would pay, and prices for the rest would soar; that is why the law makes contribution universal.', reveals: 'voluntary-tax-works' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch11_014', title: 'You made it',
          caseStudy: { intro: 'One person never ran a country. The government is the whole crew behind the scenes — and you met it today in every tap, road and classroom.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_civics_ch11_009', difficulty: 'standard',
          question: 'A government is the organized group of people and the system of rules that.',
          hint: 'Review the school rules chapter or discuss the "rules of a game" activity.',
          misconception: 'Students often believe "Government" refers only to the Prime Minister or the President.',
          parts: [
                { id: 'a', prompt: 'What are the three main things a government does for its citizens?', answer: 'The government makes laws, enforces those laws, and provides public services',
                  options: ['The government makes laws, enforces those laws, and provides public services', 'protecting the country', 'making laws', 'Government'],
                  hint: 'Review the school rules chapter or discuss the "rules of a game" activity.',
                  misconception: 'Students often believe "Government" refers only to the Prime Minister or the President.' }
          ],
            remediations: { 'government-refers-only-to-the': { steps: ['Ask the student to name three people they saw on their way to school: a traffic police officer, a school teacher, and.', 'Explain that all three represent the government in different ways because they are providing public safety, education.', 'Reiterate that the government is the whole machine, not just the "boss."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch11_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "Government" refers only to the Prime Minister or the President.',
          parts: [
                { id: 'a', prompt: '"Government is only needed to punish people who do bad things." Do you agree with this statement? Why or why not?', answer: 'I disagree',
                  options: ['I disagree', 'police force', 'service provider', 'Government'],
                  hint: 'Review the school rules chapter or discuss the "rules of a game" activity.',
                  misconception: 'Students often believe "Government" refers only to the Prime Minister or the President.' }
          ],
            remediations: { 'government-refers-only-to-the': { steps: ['Ask the student to name three people they saw on their way to school: a traffic police officer, a school teacher, and.', 'Explain that all three represent the government in different ways because they are providing public safety, education.', 'Reiterate that the government is the whole machine, not just the "boss."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch11_010', difficulty: 'standard',
          question: 'A government is the system or group of people responsible for making and.',
          hint: 'Review the "Governance" section of the textbook to understand why we need a system.',
          misconception: 'Students often think "government" only refers to the people in the capital city.',
          parts: [
                { id: 'a', prompt: 'Who holds the power in a democracy?', answer: 'The people hold the power and use it to elect representatives',
                  options: ['The people hold the power and use it to elect representatives', 'government', 'power resides only with the leader, failing to recognize the role of the voter', '"government" only refers to the people in the capital city'],
                  hint: 'Review the "Governance" section of the textbook to understand why we need a system of rules.',
                  misconception: 'Students often think "government" only refers to the people in the capital city.' },
                { id: 'b', prompt: 'If a person forces their way into power and refuses to listen to the citizens, what type of government is this?', answer: 'This is a dictatorship',
                  options: ['This is a dictatorship', 'forceful control', 'elected authority', 'government'],
                  hint: 'Review the "Governance" section of the textbook to understand why we need a system of rules.',
                  misconception: 'Students often think "government" only refers to the people in the capital city.' },
                { id: 'c', prompt: 'Compare a democracy and a monarchy: what is the main difference in how the leader changes?', answer: 'In a democracy, the leader changes through elections',
                  options: ['In a democracy, the leader changes through elections', 'public choice', 'birthright', 'government'],
                  hint: 'Review the "Governance" section of the textbook to understand why we need a system of rules.',
                  misconception: 'Students often think "government" only refers to the people in the capital city.' }
          ],
            remediations: { 'government-only-refers-to-the': { steps: ['Ask the student: "Does the leader have to ask the people for permission to stay in power?" 2.', 'Explain that if the answer is "Yes," it is a democracy.', 'If "No," ask: "Did they get the job because of their parents?" 4.', 'If "Yes," it is a monarchy; if "No" and they use force, it is a dictatorship.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch11_011', difficulty: 'standard',
          question: 'Democracy is a system of government where the power to rule resides with the.',
          hint: 'Review the \'Introduction\' section of the NCERT text regarding why society needs rules.',
          misconception: 'Students often think democracy is ONLY about the day they vote in an election.',
          parts: [
                { id: 'a', prompt: 'Why is India called a \'representative democracy\' instead of a place where every citizen votes on every single law directly?', answer: 'India is a representative democracy',
                  options: ['India is a representative democracy', 'democracy is ONLY about the day they vote in an election'],
                  hint: 'Review the \'Introduction\' section of the NCERT text regarding why society needs rules.',
                  misconception: 'Students often think democracy is ONLY about the day they vote in an election.' }
          ],
            remediations: { 'democracy-is-only-about-the': { steps: ['First, ask the student to define \'representative\' as someone who carries a message for someone else.', 'Second, explain that if a messenger stops listening to the person who sent them, they are no longer a good.', 'Third, use the school monitor analogy to show that the monitor\'s job is to talk to teachers *on behalf of* the class.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch11_012', difficulty: 'standard',
          question: 'Elections are the official process by which citizens in a democracy cast their.',
          hint: 'Review the definition of "Representative Democracy" and why we cannot all govern.',
          misconception: 'Students often think the current government decides who wins elections.',
          parts: [
                { id: 'a', prompt: 'Who is responsible for conducting fair elections in India?', answer: 'The Election Commission',
                  options: ['The Election Commission', 'executive', 'Election Commission', 'the current government decides who wins elections'],
                  hint: 'Review the definition of "Representative Democracy" and why we cannot all govern ourselves.',
                  misconception: 'Students often think the current government decides who wins elections.' }
          ],
            remediations: { 'the-current-government-decides-who': { steps: ['Ask the student: "Who is the referee in a football game?" 2.', 'Explain that if the player who is currently winning also gets to be the referee, the game wouldn\'t be fair.', 'Connect this to the Election Commission, explaining that they are the neutral referees who don\'t belong to any.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch11_013', difficulty: 'standard',
          question: 'The government in India operates at three distinct levels—local, state, and.',
          hint: 'Review the chapter\'s introduction on "Governance" and why we need rules to keep society.',
          misconception: 'Students often think the Central Government controls everything, including neighborhood issues.',
          parts: [
                { id: 'a', prompt: 'Why does a country like India need three different levels of government instead of just one?', answer: 'India is too vast and diverse for one group to manage every local detail',
                  options: ['India is too vast and diverse for one group to manage every local detail', 'the Central Government controls everything, including neighborhood issues'],
                  hint: 'Review the chapter\'s introduction on "Governance" and why we need rules to keep society functioning.',
                  misconception: 'Students often think the Central Government controls everything, including neighborhood issues.' },
                { id: 'b', prompt: 'If a new national highway is being built connecting Delhi to Mumbai, which level of government is likely responsible?', answer: 'The national (central) government',
                  options: ['The national (central) government', 'the Central Government controls everything, including neighborhood issues'],
                  hint: 'Review the chapter\'s introduction on "Governance" and why we need rules to keep society functioning.',
                  misconception: 'Students often think the Central Government controls everything, including neighborhood issues.' }
          ],
            remediations: { 'the-central-government-controls-everything': { steps: ['Ask the student to draw a "Circle of Influence" diagram.', 'Place the student in the center.', 'The smallest circle is their home/school (local), the next is their city/state (state), and the largest is India.', 'Ask them to place "broken street light" in the smallest circle and "national currency" in the largest to visualize the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch11_014', difficulty: 'standard',
          question: 'Citizen participation is the process where people actively engage in the.',
          hint: 'Review the definition of "Representative Democracy" and why we need representatives.',
          misconception: 'Students often believe that "participation" means they must be experts or politicians to be heard.',
          parts: [
                { id: 'a', prompt: 'Name two ways a citizen can participate in a democracy besides voting during an election.', answer: 'Citizens can attend public meetings or write letters to their representatives',
                  options: ['Citizens can attend public meetings or write letters to their representatives', 'joining a political party', 'participation', 'governing'],
                  hint: 'Review the definition of "Representative Democracy" and why we need representatives.',
                  misconception: 'Students often believe that "participation" means they must be experts or politicians to be heard.' },
                { id: 'b', prompt: 'If your neighborhood park is being neglected, how can you and your neighbors use the concept of citizen participation to fix it?', answer: 'First, identify the exact problem',
                  options: ['First, identify the exact problem', 'participation', 'governing', 'participating'],
                  hint: 'Review the definition of "Representative Democracy" and why we need representatives.',
                  misconception: 'Students often believe that "participation" means they must be experts or politicians to be heard.' }
          ],
            remediations: { 'participation-means-they-must-be': { steps: ['First, clarify that democracy is a system of "rule by the people," not "rule by the experts." Second, show them.', 'Third, ask them to write a "practice letter" to a fictional representative about a school issue to build their.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
