/**
 * Class 6 Social Science — civics, economics, geography, history nodes
 * the c6_12 sims don't cover. Senior depth. Real nodeIds.
 */
import type { SimDef } from '../engine/types';
import { PreambleBuilder, TradeRouteMap } from './interactives_history';
import { BankingFlow, DiversityWeb, EconomyRoleSorter, InfrastructureBuilder, MarketMatch, TaxFlowDiagram } from './interactives_social';
import { RightsSorter, GovernmentLevels, BarterMatch, WeatherClimateSort, TimelineBuilder, NeighbourMap, MediaFilter } from './interactives';
import { ClimateZoneMapper } from './interactives_social';

export const c6CivRights: SimDef = {
    id: 'c6_civ_rights', title: 'Our Rights', subtitle: 'Fundamental rights & duties',
    classLevel: 6, subject: 'social', topic: 'Rights and Duties',
    chapters: ['Civics Ch10: Rights'],
    nodeIds: ['c6_civics_ch10_002','c6_civics_ch10_003','c6_civics_ch10_004','c6_civics_ch10_006','c6_civics_ch10_007'],
    emoji: '⚖️', theme: { bg: 'from-amber-100 to-yellow-200', accent: 'amber', scene: 'rights' },
    scenario: { role: "a young citizen", intro: "Every Indian has fundamental rights — equality, freedom, protection from exploitation — plus duties.", goal: "Understand your rights and duties." },
    discovery: {
        question: "Can a rich family and a poor family both send their kids to school? What right makes this possible?",
        options: ["Right to Equality", "Right to buy things", "No right needed"],
        answer: "Right to Equality",
        hook: "Right to Equality = everyone is equal before the law — rich or poor!",
    },
    teaching: [
        { title: 'What Are Human Rights?', text: 'Human rights are the essential freedoms and protections that every person possesses simply by being human, regardless of their nationality, status, or backgroun Imagine you are playing a game where the rules are not written on a paper, but', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Fundamental Rights in the Indian Const', text: 'Fundamental Rights are a set of basic guarantees provided by the Indian Constitution to every citizen to ensure dignity, equality, and freedom. These rights are Imagine you are at school and the teacher tells you that only students wearing', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Right to Equality: Meaning and Applica', text: 'Right to Equality is a Fundamental Right ensuring that all citizens are treated equally by the law, regardless of their background. It means no person is above  Have you ever wondered why the rules in a game of cricket apply to everyone on', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Right to Freedom: Speech, Expression,', text: 'The Right to Freedom of Speech and Expression is a fundamental right that allows citizens to share their thoughts, ideas, and opinions openly without fear of pu Have you ever wanted to tell your teacher that a school rule seems unfair or su', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Right against Exploitation: Ending Inj', text: 'The Right against Exploitation is a constitutional guarantee that protects vulnerable people from being mistreated or forced into unfair work by others. It spec Have you ever seen someone being forced to do work they didn\'t want to do, or h', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Fundamental Duties of Citizens', text: 'Fundamental Duties are the moral and legal responsibilities that every citizen must fulfill to protect the nation\'s values, unity, and progress. They act as a b Think about your home: you have the right to be fed and cared for by your paren', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Rights and Duties: Two Sides of Citize', text: 'Fundamental rights and duties are a pair of responsibilities and benefits that exist together, where every freedom you enjoy is balanced by a specific task you  Imagine you are at a school playground.', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'How Rights Are Protected: Courts and R', text: 'The Right to Constitutional Remedies is a Fundamental Right that allows citizens to go to court to protect their other rights if they are ignored or violated by Imagine you are playing a game where the rules are written down, but someone ke', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { component: RightsSorter, prompt: 'Match each right to a real-life example!' },
    challenges: [
        { type: 'sort', question: 'Match each right to its example:',
          sortItems: [
            { id: 's0', label: 'Speaking your mind', emoji: '📌', correctBin: 'b1' },
            { id: 's1', label: 'No child labour', emoji: '📌', correctBin: 'b2' },
            { id: 's2', label: 'Same treatment for all', emoji: '📌', correctBin: 'b0' }
          ],
          bins: [ { id: 'b0', label: 'Right to Equality', color: '#3b82f6' },
                  { id: 'b1', label: 'Right to Freedom', color: '#ef4444' },
                  { id: 'b2', label: 'Right against Exploitation', color: '#10b981' } ],
          hint: 'Equality = same treatment; Freedom = speech/choice; Exploitation = no forced work!',
          misconception: 'Each right protects a different freedom — equality (same), freedom (speech), exploitation (no forced work).',
          workedExample: ['Same treatment = equality.', 'Speak freely = freedom.', 'No child labour = exploitation.'] },
        { type: 'mcq', question: 'The Right to Equality means:', answer: 'everyone is equal before the law', options: ['everyone is equally rich', 'everyone is equal before the law', 'only adults have rights'],
          hint: 'Equal treatment under law!', misconception: 'Right to Equality = equal before law, not equal wealth.',
          workedExample: ['Equal before law.', 'No discrimination.', 'Equality.'] },
        { type: 'mcq', question: 'A fundamental duty of citizens is to:', answer: 'respect the constitution and protect the environment', options: ['pay taxes only', 'respect the constitution and protect the environment', 'ignore laws'],
          hint: 'Duties = responsibilities!', misconception: 'Duties include respecting the constitution, protecting the environment, following laws.',
          workedExample: ['Respect constitution.', 'Protect environment.', 'These are duties.'] },
        { type: 'subpart', question: 'Understand child rights:',
          parts: [
            { id: 'a', prompt: 'Children have the right to:', answer: 'education', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'Child labour violates:', answer: 'right against exploitation', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'subpart', question: 'Apply what you learned in Our Rights:', hint: 'Work through each part step by step.', misconception: 'Students often confuse Human Rights with Government Privileges. They assume that because a government prov', parts: [
            { id: 'a', prompt: 'What does it mean to say that human rights are inherent?', answer: 'It means these rights exist naturally from birth and are not', hint: 'Think: What Are Human Rights?', misconception: 'Students often confuse Human Rights with Government Privileges. They assume that because a government prov', workedExample: ['Ask the student: If a government were to disappear tomorrow,'] },
            { id: 'b', prompt: 'If a government decides to take away a person\'s right to express their opinion, have they successfully removed', answer: 'No, the right still exists as a human right, but the person', hint: 'Think: What Are Human Rights?', misconception: 'Students often confuse Human Rights with Government Privileges. They assume that because a government prov', workedExample: ['Ask the student: If a government were to disappear tomorrow,'] },
            { id: 'c', prompt: 'Which of these is a human right: the right to own a luxury car or the right to education? Why?', answer: 'The right to education is a human right because it is essent', hint: 'Think: What Are Human Rights?', misconception: 'Students often confuse Human Rights with Government Privileges. They assume that because a government prov', workedExample: ['Ask the student: If a government were to disappear tomorrow,'] },
            { id: 'd', prompt: 'Why did the concept of human rights develop over time instead of appearing all at once?', answer: 'It developed because people had to fight against historical', hint: 'Think: What Are Human Rights?', misconception: 'Students often confuse Human Rights with Government Privileges. They assume that because a government prov', workedExample: ['Ask the student: If a government were to disappear tomorrow,'] }
        ] },
    ],
    reflect: { prompts: ['Why do rights come with duties?', 'Which right matters most to you and why?'] },
    successLine: 'Rights understood! ⚖️', tryAgainLine: 'Rights protect; duties give back.',
};

export const c6CivGovernment: SimDef = {
    id: 'c6_civ_govt', title: 'How Government Works', subtitle: 'Democracy & levels',
    classLevel: 6, subject: 'social', topic: 'Government',
    chapters: ['Civics Ch11-12: Government & Grassroots'],
    nodeIds: ['c6_civics_ch11_009','c6_civics_ch11_010','c6_civics_ch11_011','c6_civics_ch11_012','c6_civics_ch11_013','c6_civics_ch11_014','c6_civics_ch12_015','c6_civics_ch12_018','c6_civics_ch12_019','c6_civics_ch12_020','c6_civics_ch12_022'],
    emoji: '🏛️', theme: { bg: 'from-blue-100 to-indigo-200', accent: 'blue', scene: 'government' },
    scenario: { role: "a young voter", intro: "India is a democracy — people elect leaders at village, state, and national levels.", goal: "Understand how government works." },
    discovery: {
        question: "Who chooses the leaders in a democracy?",
        options: ["The people — by voting", "The richest person", "A king"],
        answer: "The people — by voting",
        hook: "Democracy = rule by the people — we vote for our leaders!",
    },
    teaching: [
        { title: 'What is Government and Why We Need It', text: 'A government is the organized group of people and the system of rules that manages a community or country. Its primary job is to create laws, ensure they are fo Think about your school playground: what happens if there are no rules for a ga', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Types of Government: Democracy, Monarc', text: 'A government is the system or group of people responsible for making and enforcing laws to keep a society organized. Governments are categorized based on how th Think about how your classroom runs: do you all vote to pick a class leader, do', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Democracy: Government of the People, b', text: 'Democracy is a system of government where the power to rule resides with the people, who exercise it by electing representatives to make decisions on their beha Imagine your entire school had to decide on the color of the new uniform.', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'How Elections Work in India', text: 'Elections are the official process by which citizens in a democracy cast their votes to choose representatives to make decisions on their behalf. In India, this Think about how your class picks a monitor: you all have a say, but you cant a', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Levels of Government: National, State,', text: 'The government in India operates at three distinct levels—local, state, and national—to ensure that the vast and diverse needs of the country are managed effici Think about how you fix a problem at home: if your bedroom light stops working,', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Citizen Participation in Government', text: 'Citizen participation is the process where people actively engage in the functioning of a democracy beyond just casting a vote, by expressing their views, monit Have you ever felt that a rule at your school, like the playground schedule, wa', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'What is Grassroots Democracy?', text: 'Grassroots democracy is a system where governance happens at the local level, allowing ordinary citizens to directly participate in making decisions about their Imagine your school playground has a broken fence that makes it unsafe for stud', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Panchayati Raj: Village-Level Democrac', text: 'The Panchayati Raj is a three-tier system of local self-government in rural India designed to allow villagers to manage their own affairs. It empowers communiti Imagine your village street light is broken, or a primary school wall needs urg', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Municipalities: Urban Local Government', text: 'Municipalities are the urban local self-government institutions responsible for providing essential civic services and managing the daily affairs of towns and c Imagine walking down your street and seeing a broken streetlight, a pile of unc', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Functions of Local Government', text: 'The functions of local government are the specific tasks performed by elected village and urban councils to provide essential services and improve daily life fo Imagine you wake up and find the village hand pump is broken and the main road', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'State Government: Structure and Functi', text: 'The state government is the administrative authority that manages a state\'s affairs, operating between the national (central) government and local rural/urban b Imagine your school needs a new playground, but the local village council doesn', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'National Government: Parliament and Ex', text: 'The National Government is the highest authority in India, based in New Delhi, responsible for making laws and governing the entire country. It is structured in If your school decided to change the lunch menu for the entire year, could one', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Local Self-Government and Social Infra', text: 'Local self-government is a system where people in villages and towns manage their own daily needs, like schools and clinics, through elected councils like the G Think about your own school: who makes sure there is a working water tap, a cle', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Government Services in Daily Life', text: 'Government services are essential facilities and support systems provided or regulated by the government to ensure the safety, health, and daily well-being of c Think about your walk to school this morning: did you travel on a paved road? D', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { component: GovernmentLevels, prompt: 'Match each level of government to what it handles!' },
    challenges: [
        { type: 'sort', question: 'Match the government level to its job:',
          sortItems: [
            { id: 's0', label: 'Defense and foreign policy', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'State highways and health', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'Village roads and water', emoji: '📌', correctBin: 'b2' }
          ],
          bins: [ { id: 'b0', label: 'National', color: '#3b82f6' },
                  { id: 'b1', label: 'State', color: '#ef4444' },
                  { id: 'b2', label: 'Local', color: '#10b981' } ],
          hint: 'Big country / middle state / small village!', misconception: 'National = whole country; State = one state; Local = village/city.',
          workedExample: ['Defense = national.', 'State roads = state.', 'Village water = local.'] },
        { type: 'mcq', question: 'Democracy means government:', answer: 'of, by, and for the people', options: ['by one king', 'of, by, and for the people', 'by the military'],
          hint: 'Who rules?', misconception: 'Democracy = people\'s rule — of, by, for the people.',
          workedExample: ['Of the people.', 'By the people.', 'For the people.'] },
        { type: 'mcq', question: 'Panchayati Raj is:', answer: 'village-level self-government', options: ['national government', 'village-level self-government', 'a court'],
          hint: 'Grassroots = village level!', misconception: 'Panchayati Raj = village self-government — local people decide local issues.',
          workedExample: ['Panchayat = village council.', 'Self-government.', 'Grassroots.'] },
        { type: 'subpart', question: 'Understand elections:',
          parts: [
            { id: 'a', prompt: 'Who can vote in India?', answer: 'citizens 18 and older', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'The winner is decided by:', answer: 'majority of votes', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'subpart', question: 'Apply what you learned in How Government Works:', hint: 'Work through each part step by step.', misconception: 'Students often believe Government refers only to the Prime Minister or the President. They fail to see that', parts: [
            { id: 'a', prompt: 'What are the three main things a government does for its citizens?', answer: 'The government makes laws, enforces those laws, and provides', hint: 'Think: What is Government and Why We Need It', misconception: 'Students often believe Government refers only to the Prime Minister or the President. They fail to see that', workedExample: ['Ask the student to name three people they saw on their way t','Explain that all three represent the government in different','Reiterate that the government is the whole machine, not just'] },
            { id: 'b', prompt: 'If a village has no government, why would it be difficult for people to keep their businesses running?', answer: 'Without government, there would be no courts to settle dispu', hint: 'Think: What is Government and Why We Need It', misconception: 'Students often believe Government refers only to the Prime Minister or the President. They fail to see that', workedExample: ['Ask the student to name three people they saw on their way t','Explain that all three represent the government in different','Reiterate that the government is the whole machine, not just'] },
            { id: 'c', prompt: 'A new shopping mall is being built in your city. How does the government\'s role ensure the building is safe fo', answer: 'Steps: 1', hint: 'Think: What is Government and Why We Need It', misconception: 'Students often believe Government refers only to the Prime Minister or the President. They fail to see that', workedExample: ['Ask the student to name three people they saw on their way t','Explain that all three represent the government in different','Reiterate that the government is the whole machine, not just'] },
            { id: 'd', prompt: 'Compare a society with a government to a game of football without a referee. What is the most important simila', answer: 'Both require a set of rules and an authority to ensure those', hint: 'Think: What is Government and Why We Need It', misconception: 'Students often believe Government refers only to the Prime Minister or the President. They fail to see that', workedExample: ['Ask the student to name three people they saw on their way t','Explain that all three represent the government in different','Reiterate that the government is the whole machine, not just'] }
        ] },
    ],
    reflect: { prompts: ['Why are there three levels of government?', 'How does voting give power to ordinary people?'] },
    successLine: 'Democracy understood! 🏛️', tryAgainLine: 'People vote, leaders serve.',
};

export const c6EcoMoney: SimDef = {
    id: 'c6_eco_money', title: 'Money', subtitle: 'From barter to banks',
    classLevel: 6, subject: 'social', topic: 'Money and Banking',
    chapters: ['Economics Ch11: Money'],
    nodeIds: ['c6_economics_ch11_001','c6_economics_ch11_002','c6_economics_ch11_003','c6_economics_ch11_004'],
    emoji: '💰', theme: { bg: 'from-green-100 to-emerald-200', accent: 'green', scene: 'money' },
    scenario: { role: "a young economist", intro: "Before money, people traded goods directly — barter. Money solved the problem and made trade easy.", goal: "Understand why money exists." },
    discovery: {
        question: "A farmer wants shoes but the shoemaker wants rice, not wheat. Why can't they trade?",
        options: ["Double coincidence of wants fails", "Wheat is too cheap", "Shoes are too big"],
        answer: "Double coincidence of wants fails",
        hook: "Barter needs BOTH sides to want what the other has — money fixes this!",
    },
    teaching: [
        { title: 'The Barter System: How People Exchange', text: 'The barter system is an early method of trade where people exchanged goods or services directly for other goods or services without using money. It requires a  Imagine you have a basket of fresh mangoes but you really want a new cricket ba', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Problems with Barter: Double Coinciden', text: 'Double coincidence of wants is a situation in a barter system where two people must simultaneously desire exactly what the other person is offering to trade. If Imagine you have a basket of fresh mangoes and you really want a cricket bat.', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Emergence of Money: From Shells to', text: 'Commodity money refers to the earliest form of currency where items with their own natural value (like shells or salt) were used to trade for other goods. These Imagine you have a bag of rice but you really want a cricket bat; if the bat ow', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Functions of Money: Medium, Measure, S', text: 'Money is a universally accepted tool that functions as a medium of exchange, a measure of value, a store of wealth, and a standard for future payments, allowing Imagine you have a basket of mangoes, but you really want a geometry box.', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Evolution of Currency: From Coins to P', text: 'The evolution of currency refers to the historical shift in how societies pay for goods, moving from physical barter and heavy metal coins to portable paper not Imagine you are at a local market in India.', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Money in Daily Life: Earning, Saving,', text: 'Money in daily life refers to the cycle of earning (gaining income through work), spending (using money for goods and services), and saving (keeping money aside Think about the last time you bought a pencil or a snack; where did that money', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { component: BarterMatch, prompt: 'Build money value — how do coins and notes add up?' },
    challenges: [
        { type: 'mcq', question: 'The biggest problem with barter is:', answer: 'double coincidence of wants', options: ['goods are heavy', 'double coincidence of wants', 'no shops'],
          hint: 'Both sides must want the trade!', misconception: 'Barter needs both sides to want what the other has — money removes this need.',
          workedExample: ['You have wheat, want shoes.', 'Shoemaker must want wheat.', 'Hard to match — money fixes it.'] },
        { type: 'mcq', question: 'Money acts as a medium of exchange because:', answer: 'everyone accepts it for goods', options: ['it\'s made of gold', 'everyone accepts it for goods', 'it\'s pretty'],
          hint: 'Why does money work?', misconception: 'Money works because everyone accepts it — no need to match wants.',
          workedExample: ['Money is accepted by all.', 'No matching wants needed.', 'Medium of exchange.'] },
        { type: 'order', question: 'Order the evolution of money:', sortItems: [
            { id: 'o0', label: 'Digital money', emoji: '▶️', correctBin: 's3' },
            { id: 'o1', label: 'Paper notes', emoji: '▶️', correctBin: 's2' },
            { id: 'o2', label: 'Shells and goods', emoji: '▶️', correctBin: 's0' },
            { id: 'o3', label: 'Metal coins', emoji: '▶️', correctBin: 's1' }
          ],
          bins: [ { id: 's0', label: '1st', color: '#3b82f6' },
                  { id: 's1', label: '2nd', color: '#8b5cf6' },
                  { id: 's2', label: '3rd', color: '#f59e0b' },
                  { id: 's3', label: '4th', color: '#10b981' } ],
          hint: 'Oldest to newest!', misconception: 'Money evolved: goods → coins → notes → digital.',
          workedExample: ['Shells first.', 'Then coins.', 'Then paper.', 'Now digital.'] },
        { type: 'subpart', question: 'Understand banks:',
          parts: [
            { id: 'a', prompt: 'The extra money a bank pays on your savings is called:', answer: 'interest', hint: 'Banks pay it so you keep saving!', misconception: 'Banks pay INTEREST on savings and lend deposits to borrowers — that is how money keeps flowing.' },
          ],
          hint: 'Safe keeping + lending!', misconception: 'Banks safeguard money, lend to borrowers, pay interest to savers.' },
        { type: 'subpart', question: 'Apply what you learned in Money:', hint: 'Work through each part step by step.', misconception: 'Students often think barter means selling things for a cheaper price. They confuse the *method* of payment (', parts: [
            { id: 'a', prompt: 'What is the definition of the barter system?', answer: 'The barter system is a way of trading where goods and servic', hint: 'Think: The Barter System: How People Exchanged Befor', misconception: 'Students often think barter means selling things for a cheaper price. They confuse the *method* of payment (', workedExample: ['1','Ask the student: If you want to buy a pen, can you pay with ','Explain that the leaf has no value to the seller unless they'] },
            { id: 'b', prompt: 'Why is it often difficult to complete a trade using the barter system?', answer: 'It is difficult because you need a double coincidence of wa', hint: 'Think: The Barter System: How People Exchanged Befor', misconception: 'Students often think barter means selling things for a cheaper price. They confuse the *method* of payment (', workedExample: ['1','Ask the student: If you want to buy a pen, can you pay with ','Explain that the leaf has no value to the seller unless they'] },
            { id: 'c', prompt: 'If you are a farmer with wheat and you want a pair of shoes, what must happen for a successful barter?', answer: 'Steps: 1', hint: 'Think: The Barter System: How People Exchanged Befor', misconception: 'Students often think barter means selling things for a cheaper price. They confuse the *method* of payment (', workedExample: ['1','Ask the student: If you want to buy a pen, can you pay with ','Explain that the leaf has no value to the seller unless they'] },
            { id: 'd', prompt: 'How does the barter system differ from modern shopping?', answer: 'In modern shopping, money acts as a common medium that every', hint: 'Think: The Barter System: How People Exchanged Befor', misconception: 'Students often think barter means selling things for a cheaper price. They confuse the *method* of payment (', workedExample: ['1','Ask the student: If you want to buy a pen, can you pay with ','Explain that the leaf has no value to the seller unless they'] }
        ] },
    ],
    reflect: { prompts: ['Why was money invented?', 'How do banks help the economy flow?'] },
    successLine: 'Money mastered! 💰', tryAgainLine: 'Money solves the matching problem.',
};

export const c6GeoIndia: SimDef = {
    id: 'c6_geo_india', title: 'India\'s Geography', subtitle: 'Physical features',
    classLevel: 6, subject: 'social', topic: 'India Physical Geography',
    chapters: ['Geography Ch1: India'],
    nodeIds: ['c6_geography_ch01_001','c6_geography_ch01_002','c6_geography_ch01_003','c6_geography_ch01_004','c6_geography_ch01_005','c6_geography_ch01_006','c6_geography_ch01_007'],
    emoji: '🗺️', theme: { bg: 'from-lime-100 to-green-200', accent: 'lime', scene: 'india' },
    scenario: { role: "a map-explorer", intro: "India has mountains, plains, plateaus, deserts, and islands — a land of extremes.", goal: "Map India's physical features." },
    discovery: {
        question: "Why is northern India so fertile for farming while Rajasthan is a desert?",
        options: ["The Himalayas block rain + rivers feed the plains", "Rajasthan is cursed", "No reason"],
        answer: "The Himalayas block rain + rivers feed the plains",
        hook: "Mountains catch the rain and feed rivers — the plains below become fertile!",
    },
    teaching: [
        { title: 'What Makes India Geographically Divers', text: 'Geographical diversity refers to the existence of varied physical features, such as mountains, deserts, coastlines, and forests, within a single country\'s borde Have you ever wondered why your friends in the north wear heavy woolens in Dece', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Himalayan Region: Mountains and Va', text: 'The Himalayas are the world\'s tallest, youngest mountain range, forming a natural wall 2400 kilometres long across Indias northern border. They were created by Have you ever seen a rug bunch up when you push it against a wall? The Himalaya', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Northern Plains: Fertile River Bas', text: 'The Northern Plains are a vast, flat, and extremely fertile region of northern India, created over millions of years by rivers depositing layers of rich sedimen Have you ever wondered why so many people live in northern India and why the ve', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Peninsular Plateau: Ancient Landma', text: 'The Peninsular Plateau is a massive, triangular-shaped tableland in southern India composed of some of the oldest, hardest rocks on our planet. It acts as an an Have you ever noticed that while the mountains in the north look jagged and sha', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Coastal Plains: Eastern and Western Se', text: 'The coastal plains are narrow, flat stretches of land lying between the edge of the sea and the highlands of the interior. India possesses two such regions: the Have you ever visited a beach like Marina Beach in Chennai or Juhu Beach in Mum', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Islands of India: Andaman, Lakshadweep', text: 'An island is a piece of land that is smaller than a continent and is completely surrounded by water on all sides. Indias two major island groups are the Andama Have you ever seen a small sandcastle surrounded by water in a puddle after the', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Desert Region: Thar and Beyond', text: 'The Thar Desert, or the Great Indian Desert, is a hot, arid region primarily located in western Rajasthan characterized by sand dunes, sparse vegetation, and ex Have you ever noticed how your house stays cool on a very hot summer afternoon?', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { widget: 'tray', prompt: "Place each feature on India's map — north mountains, south plateau!" },
    challenges: [
        { type: 'sort', question: 'Match the feature to its location:',
          sortItems: [
            { id: 's0', label: 'Himalayas', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Deccan Plateau', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'Thar Desert', emoji: '📌', correctBin: 'b2' }
          ],
          bins: [ { id: 'b0', label: 'North', color: '#3b82f6' },
                  { id: 'b1', label: 'Central/South', color: '#ef4444' },
                  { id: 'b2', label: 'West', color: '#10b981' } ],
          hint: 'Mountains top, plateau middle, desert west!', misconception: 'Himalayas = north; Deccan = central/south; Thar = west (Rajasthan).',
          workedExample: ['Himalayas = north.', 'Deccan = central/south.', 'Thar = west.'] },
        { type: 'mcq', question: 'The Northern Plains are fertile because:', answer: 'rivers deposit rich soil', options: ['it never rains', 'rivers deposit rich soil', 'the soil is sandy'],
          hint: 'Rivers bring nutrients!', misconception: 'Rivers (Ganga, Brahmaputra) deposit alluvial soil — very fertile for farming.',
          workedExample: ['Rivers flow down.', 'Deposit rich soil.', 'Fertile plains.'] },
        { type: 'mcq', question: 'India\'s islands include:', answer: 'Andaman, Nicobar, Lakshadweep', options: ['Sri Lanka only', 'Andaman, Nicobar, Lakshadweep', 'Maldives'],
          hint: 'India\'s own islands!', misconception: 'India has Andaman & Nicobar (east) and Lakshadweep (west) islands.',
          workedExample: ['Andaman & Nicobar = east.', 'Lakshadweep = west.', 'India\'s islands.'] },
        { type: 'subpart', question: 'Understand the Himalayas:',
          parts: [
            { id: 'a', prompt: 'The mountain range that forms India\'s northern wall is the:', answer: 'himalayas', hint: 'The world\'s highest mountains!', misconception: 'The HIMALAYAS form India\'s northern wall — they block cold winds and feed the great rivers.' },
          ],
          hint: 'Mountains shape the climate!', misconception: 'Himalayas block cold northern winds and feed the great rivers.' },
        { type: 'subpart', question: 'Apply what you learned in India:', hint: 'Work through each part step by step.', misconception: 'Students often confuse geographical diversity with political diversity (like different states or languages', parts: [
            { id: 'a', prompt: 'Name two different types of geographical landscapes found in India mentioned in the text.', answer: 'The two landscapes are the snow-capped Himalayas and the Tha', hint: 'Think: What Makes India Geographically Diverse', misconception: 'Students often confuse geographical diversity with political diversity (like different states or languages', workedExample: ['Ask the student to draw a simple shape of India','Then, tell them to draw a line across the top for mountains ','Ask them to label these as Landforms. Explain that these are'] },
            { id: 'b', prompt: 'If you travel from the Thar Desert to the east of India, how does the environment change regarding rainfall?', answer: 'The environment changes from a dry desert with sparse vegeta', hint: 'Think: What Makes India Geographically Diverse', misconception: 'Students often confuse geographical diversity with political diversity (like different states or languages', workedExample: ['Ask the student to draw a simple shape of India','Then, tell them to draw a line across the top for mountains ','Ask them to label these as Landforms. Explain that these are'] },
            { id: 'c', prompt: 'Why can we say that India\'s geography is not random?', answer: 'It is not random because the variety of landscapes is direct', hint: 'Think: What Makes India Geographically Diverse', misconception: 'Students often confuse geographical diversity with political diversity (like different states or languages', workedExample: ['Ask the student to draw a simple shape of India','Then, tell them to draw a line across the top for mountains ','Ask them to label these as Landforms. Explain that these are'] },
            { id: 'd', prompt: 'Compare the northern part of India with the southern part based on their physical features.', answer: 'The north is characterized by high, snow-capped mountains (t', hint: 'Think: What Makes India Geographically Diverse', misconception: 'Students often confuse geographical diversity with political diversity (like different states or languages', workedExample: ['Ask the student to draw a simple shape of India','Then, tell them to draw a line across the top for mountains ','Ask them to label these as Landforms. Explain that these are'] }
        ] },
    ],
    reflect: { prompts: ['How do mountains shape a country\'s climate?', 'Why are river plains the best farmland?'] },
    successLine: 'Geography mapped! 🗺️', tryAgainLine: 'North mountains, fertile plains, southern plateau.',
};

export const c6GeoClimate: SimDef = {
    id: 'c6_geo_climate', title: 'Weather & Climate', subtitle: 'Monsoons and seasons',
    classLevel: 6, subject: 'social', topic: 'Climate',
    chapters: ['Geography Ch2-3: Weather & Climate'],
    nodeIds: ['c6_geography_ch03_015','c6_geography_ch03_016','c6_geography_ch03_017','c6_geography_ch03_018','c6_geography_ch03_019'],
    emoji: '🌦️', theme: { bg: 'from-sky-100 to-blue-200', accent: 'sky', scene: 'climate' },
    scenario: { role: "a weather-scientist", intro: "Weather changes daily; climate is the long-term pattern. India runs on the monsoon!", goal: "Understand weather, climate, and the monsoon." },
    discovery: {
        question: "Why does India get most of its rain in just a few months?",
        options: ["The monsoon winds bring ocean moisture", "It rains randomly", "Rivers overflow"],
        answer: "The monsoon winds bring ocean moisture",
        hook: "Monsoon winds carry ocean moisture — a seasonal deluge India depends on!",
    },
    teaching: [
        { title: 'What is Climate? Understanding Long-Te', text: 'Climate is the long-term pattern of weather conditions—such as temperature, humidity, and rainfall—for a specific region, typically calculated over a period of  Imagine you are packing for a trip to Srinagar in December versus Chennai in De', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Monsoons: India\'s Lifeline', text: 'The monsoon is a seasonal reversal of wind patterns that brings heavy, life-sustaining rainfall to India between June and September. It functions like a giant n Imagine you are standing on a beach on a hot summer afternoon; why does the bre', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Seasons of India: Winter, Summer, Mons', text: 'The climate of India is divided into four distinct seasons: Winter, Summer, Monsoon, and Post-Monsoon, which dictate the weather patterns and daily life of the  Have you ever noticed that your clothes change from sweaters in December to lig', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Climate and Agriculture: How Weather S', text: 'Climate and agriculture describe the relationship where specific weather conditions—such as temperature, rainfall, and sunlight—directly determine which crops c Have you ever wondered why your favorite bowl of rice comes from the wet, warm', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Climate Diversity: From Snow to Desert', text: 'Climate diversity refers to the variations in temperature, humidity, and rainfall patterns across different regions of India. It explains why one part of the co Have you ever wondered why you might need a heavy woolen sweater in Ladakh but', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { component: ClimateZoneMapper, prompt: 'Make it rain — control the heat and watch the water cycle!' },
    challenges: [
        { type: 'mcq', question: 'The difference between weather and climate is:', answer: 'weather is daily, climate is long-term', options: ['they\'re the same', 'weather is daily, climate is long-term', 'climate is daily'],
          hint: 'Daily vs long-term!', misconception: 'Weather = today; climate = long-term pattern over years.',
          workedExample: ['Weather = today\'s rain.', 'Climate = yearly pattern.', 'Different timescales.'] },
        { type: 'mcq', question: 'The monsoon brings rain to India mainly in:', answer: 'June to September', options: ['December', 'June to September', 'March'],
          hint: 'The rainy season!', misconception: 'Monsoon = June-September — the main rainy season for India.',
          workedExample: ['Monsoon winds arrive.', 'June-September.', 'Heavy rain.'] },
        { type: 'order', question: 'Order India\'s seasons:', sortItems: [
            { id: 'o0', label: 'Post-monsoon', emoji: '▶️', correctBin: 's3' },
            { id: 'o1', label: 'Monsoon', emoji: '▶️', correctBin: 's2' },
            { id: 'o2', label: 'Winter', emoji: '▶️', correctBin: 's0' },
            { id: 'o3', label: 'Summer', emoji: '▶️', correctBin: 's1' }
          ],
          bins: [ { id: 's0', label: '1st', color: '#3b82f6' },
                  { id: 's1', label: '2nd', color: '#8b5cf6' },
                  { id: 's2', label: '3rd', color: '#f59e0b' },
                  { id: 's3', label: '4th', color: '#10b981' } ],
          hint: 'Cold → hot → rain → after-rain!', misconception: 'Seasons cycle: winter, summer, monsoon, post-monsoon.',
          workedExample: ['Winter.', 'Summer.', 'Monsoon.', 'Post-monsoon.'] },
        { type: 'subpart', question: 'Understand the monsoon:',
          parts: [
            { id: 'a', prompt: 'Monsoon winds carry:', answer: 'ocean moisture', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'A weak monsoon causes:', answer: 'drought and poor harvest', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'subpart', question: 'Apply what you learned in Weather & Climate:', hint: 'Work through each part step by step.', misconception: 'Students often use the terms weather and climate interchangeably. They believe that because it is cold tod', parts: [
            { id: 'a', prompt: 'What is the minimum time period usually used to determine the climate of a place?', answer: 'The climate is typically determined over a period of 30 year', hint: 'Think: What is Climate? Understanding Long-Term Patt', misconception: 'Students often use the terms weather and climate interchangeably. They believe that because it is cold tod', workedExample: ['First, ask the student to track the weather for one week and','Then, ask them to find the average temperature for that week','Finally, explain that climate is just a much longer version '] },
            { id: 'b', prompt: 'If a city is located very close to the Equator, how would you describe its climate compared to a city near the', answer: 'The city near the Equator will have a warmer climate because', hint: 'Think: What is Climate? Understanding Long-Term Patt', misconception: 'Students often use the terms weather and climate interchangeably. They believe that because it is cold tod', workedExample: ['First, ask the student to track the weather for one week and','Then, ask them to find the average temperature for that week','Finally, explain that climate is just a much longer version '] },
            { id: 'c', prompt: 'Why does a place at a very high altitude, like a mountain peak, often have a cold climate even if it is locate', answer: 'As altitude increases, the air becomes thinner and cooler, c', hint: 'Think: What is Climate? Understanding Long-Term Patt', misconception: 'Students often use the terms weather and climate interchangeably. They believe that because it is cold tod', workedExample: ['First, ask the student to track the weather for one week and','Then, ask them to find the average temperature for that week','Finally, explain that climate is just a much longer version '] },
            { id: 'd', prompt: 'How does the distance from the sea influence the climate of a coastal city like Mumbai compared to a landlocke', answer: 'Coastal cities like Mumbai have a more moderate climate due', hint: 'Think: What is Climate? Understanding Long-Term Patt', misconception: 'Students often use the terms weather and climate interchangeably. They believe that because it is cold tod', workedExample: ['First, ask the student to track the weather for one week and','Then, ask them to find the average temperature for that week','Finally, explain that climate is just a much longer version '] }
        ] },
    ],
    reflect: { prompts: ['Why does India depend so much on the monsoon?', 'How is weather different from climate?'] },
    successLine: 'Climate understood! 🌦️', tryAgainLine: 'Weather is daily; climate is the pattern.',
};

export const c6HistHarappan: SimDef = {
    id: 'c6_hist_harappan', title: 'The Harappan Civilisation', subtitle: 'India\'s first cities',
    classLevel: 6, subject: 'social', topic: 'Harappan Civilisation',
    chapters: ['History Ch4: Early Cities'],
    nodeIds: ['c6_history_ch04_001','c6_history_ch04_003','c6_history_ch04_004','c6_history_ch04_005','c6_history_ch04_006'],
    emoji: '🏺', theme: { bg: 'from-orange-100 to-amber-200', accent: 'orange', scene: 'harappan' },
    scenario: { role: "an archaeologist", intro: "5000 years ago, the Harappan civilisation built planned cities with drains, baths, and granaries.", goal: "Explore India's first cities." },
    discovery: {
        question: "What makes Harappan cities special compared to other ancient towns?",
        options: ["Planned streets, drains, and the Great Bath", "They had cars", "They were small villages"],
        answer: "Planned streets, drains, and the Great Bath",
        hook: "Harappa had grid streets, covered drains, and a Great Bath — modern city planning 5000 years ago!",
    },
    teaching: [
        { title: 'Introduction to Early Cities in the Su', text: 'Early cities were large, organized settlements that emerged after humans transitioned from hunting and gathering to farming, allowing populations to grow and de Think about your home: why do you live in a house in a specific town instead of', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Harappan Civilisation: Discovery a', text: 'The Harappan Civilisation was one of the world\'s first major urban societies, flourishing in the Indus Valley between 2600 BCE and 1900 BCE. It was identified i If you were exploring a dusty site in Pakistan and found ancient bricks and cit', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Harappan Cities: Town Planning and Arc', text: 'Harappan town planning refers to the highly organized, systematic layout of ancient Indus cities characterized by a grid-like street pattern and the use of stan Imagine you are walking through a busy market in your town; are the lanes strai', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Harappan Life: Food, Crafts, Trade', text: 'The Harappan economy was a thriving system based on agriculture, animal husbandry, and skilled craftsmanship that allowed people to settle in large, organized c Think about the lunchbox you bring to school today—does it have grains, vegetab', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Great Bath and Public Buildings of', text: 'The Great Bath of Mohenjo-daro was a large, rectangular public tank constructed from baked bricks and waterproofed with bitumen, designed to hold water for comm Think about your school\'s swimming pool or a local community water tank; how is', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Decline of the Harappan Civilisati', text: 'The decline of the Harappan Civilisation refers to the period around 1900 BCE when these advanced early urban centers ceased to function as organized cities, le Have you ever seen a house left empty because the well dried up or the roof col', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { widget: 'tray', prompt: 'Build a Harappan city — grid streets, drains, bath!' },
    challenges: [
        { type: 'mcq', question: 'Harappan cities were remarkable for:', answer: 'planned streets and covered drains', options: ['tall towers', 'planned streets and covered drains', 'being on islands'],
          hint: 'City planning!', misconception: 'Harappans had grid streets, brick houses, covered drains — advanced urban planning.',
          workedExample: ['Grid streets.', 'Covered drains.', 'Brick houses.', 'Advanced planning.'] },
        { type: 'mcq', question: 'The Great Bath was found at:', answer: 'Mohenjo-daro', options: ['Delhi', 'Mohenjo-daro', 'Egypt'],
          hint: 'A famous Harappan city!', misconception: 'The Great Bath is at Mohenjo-daro — a major Harappan site.',
          workedExample: ['Great Bath = public pool.', 'Found at Mohenjo-daro.', 'Harappan city.'] },
        { type: 'sort', question: 'Sort Harappan achievements:',
          sortItems: [
            { id: 's0', label: 'Grid streets and drains', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Beads and pottery', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'Wheat and barley farming', emoji: '📌', correctBin: 'b2' }
          ],
          bins: [ { id: 'b0', label: 'Town planning', color: '#3b82f6' },
                  { id: 'b1', label: 'Crafts & trade', color: '#ef4444' },
                  { id: 'b2', label: 'Agriculture', color: '#10b981' } ],
          hint: 'Buildings / objects / food!', misconception: 'Harappans excelled at planning (streets/drains), crafts (beads/pottery), and farming (wheat/barley).',
          workedExample: ['Streets/drains = planning.', 'Beads/pottery = crafts.', 'Wheat/barley = farming.'] },
        { type: 'subpart', question: 'Understand the decline:',
          parts: [
            { id: 'a', prompt: 'The Harappan cities declined around:', answer: '1900 BCE', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'A possible cause was:', answer: 'floods or drying rivers', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'subpart', question: 'Apply what you learned in The Harappan Civilisation:', hint: 'Work through each part step by step.', misconception: 'Students often assume early humans decided to build cities overnight. They miss the gradual process where sm', parts: [
            { id: 'a', prompt: 'What was the primary way humans gathered food before they started farming?', answer: 'Early humans survived by hunting animals and gathering wild', hint: 'Think: Introduction to Early Cities in the Subcontin', misconception: 'Students often assume early humans decided to build cities overnight. They miss the gradual process where sm', workedExample: ['First, ask the student to draw a line representing 10,000 ye','Explain that the transition from a single hut to a city took','Use the analogy of a seed growing into a tree—it needs time,'] },
            { id: 'b', prompt: 'Why did farming help villages grow into cities?', answer: 'Farming produced more food than people needed to survive, cr', hint: 'Think: Introduction to Early Cities in the Subcontin', misconception: 'Students often assume early humans decided to build cities overnight. They miss the gradual process where sm', workedExample: ['First, ask the student to draw a line representing 10,000 ye','Explain that the transition from a single hut to a city took','Use the analogy of a seed growing into a tree—it needs time,'] },
            { id: 'c', prompt: 'If a group of people moves every season to find water and berries, would they be able to build a large city? W', answer: 'No, because cities require permanent buildings and large pop', hint: 'Think: Introduction to Early Cities in the Subcontin', misconception: 'Students often assume early humans decided to build cities overnight. They miss the gradual process where sm', workedExample: ['First, ask the student to draw a line representing 10,000 ye','Explain that the transition from a single hut to a city took','Use the analogy of a seed growing into a tree—it needs time,'] },
            { id: 'd', prompt: 'How does a city differ from a small, temporary camp in terms of how people spend their time?', answer: 'In a temporary camp, everyone\'s energy is spent finding food', hint: 'Think: Introduction to Early Cities in the Subcontin', misconception: 'Students often assume early humans decided to build cities overnight. They miss the gradual process where sm', workedExample: ['First, ask the student to draw a line representing 10,000 ye','Explain that the transition from a single hut to a city took','Use the analogy of a seed growing into a tree—it needs time,'] }
        ] },
    ],
    reflect: { prompts: ['Why is town planning a sign of an advanced civilization?', 'What can ruins tell us about ancient life?'] },
    successLine: 'Archaeology understood! 🏺', tryAgainLine: 'Planned cities = advanced civilization.',
};

export const c6HistEmpires: SimDef = {
    id: 'c6_hist_empires', title: 'Empires of India', subtitle: 'Mauryas to Mughals',
    classLevel: 6, subject: 'social', topic: 'Indian Empires',
    chapters: ['History Ch5-9: Empires'],
    nodeIds: ['c6_history_ch05_007','c6_history_ch05_008','c6_history_ch05_009','c6_history_ch05_010','c6_history_ch05_011','c6_history_ch05_012','c6_history_ch05_013','c6_history_ch05_014','c6_history_ch09_034','c6_history_ch09_035','c6_history_ch09_036','c6_history_ch09_037','c6_history_ch09_038'],
    emoji: '👑', theme: { bg: 'from-purple-100 to-violet-200', accent: 'purple', scene: 'empires' },
    scenario: { role: "a history-chronicler", intro: "India saw great empires — Mauryas under Ashoka, the golden Guptas, and the mighty Mughals.", goal: "Trace India's great empires." },
    discovery: {
        question: "Emperor Ashoka won a terrible war, then gave up war forever. Why?",
        options: ["The Kalinga war's horror changed him to peace", "He lost the war", "He was forced"],
        answer: "The Kalinga war's horror changed him to peace",
        hook: "Ashoka saw the Kalinga war's devastation — and turned to Buddhism and peace!",
    },
    teaching: [
        { title: 'The Rise of the Mauryan Empire', text: 'The Mauryan Empire was the first large-scale, unified political power in the Indian subcontinent, established around 321 BCE by Chandragupta Maurya. It transiti Have you ever wondered why we call India one country today instead of hundreds', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Ashoka: The Emperor Who Gave Up War', text: 'Ashoka was the third emperor of the Mauryan Empire who, after witnessing the immense death and suffering during his conquest of Kalinga, underwent a moral trans Have you ever played a game where winning felt so bad that you didn\'t want to p', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Ashoka\'s Edicts: Messages on Stone', text: 'Ashoka\'s edicts are formal, public messages carved onto stone rocks and pillars by Emperor Ashoka to communicate his policies, his regret over war, and his comm Imagine you are the leader of a massive school and want to make sure every sing', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Mauryan Administration', text: 'The Mauryan administration was a centralized system of government designed to manage a vast empire through a structured hierarchy of officials and departments,  If your school had to organize a massive event like an Annual Sports Day, could', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Spread of Buddhism Under Ashoka', text: 'The spread of Buddhism under Ashoka refers to the transformation of a small, local religious group into a major world religion through the royal support and adm Imagine you have a great idea for a community project, but only a few people kn', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'After the Mauryas: Post-Mauryan Kingdo', text: 'The Post-Mauryan period refers to the era following the decline of the Mauryan Empire (around 185 BCE), characterized by the rise of smaller, regional kingdoms  Imagine your school team, which was once the largest and strongest in the city,', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Gupta Empire: The Golden Age', text: 'The Gupta Empire was a powerful Indian dynasty founded by Chandragupta I in 320 CE that brought about a Golden Age of stability, growth, and cultural achievem Have you ever noticed how some school years feel like everything goes right—you', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Harshavardhana: The Last Great Ancient', text: 'Harshavardhana was a prominent 7th-century ruler who unified much of northern India under his administration, establishing his capital at Kanauj. He is remember Have you ever had to step up and take responsibility when things were going wro', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Babur and the Founding of the Mughal E', text: 'The Mughal Empire was a major ruling power in India established by Babur, a Central Asian ruler, after his victory over the Sultan of Delhi, Ibrahim Lodi, in th Imagine if your school principal changed, and the entire way the school was run', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Akbar: The Great Mughal', text: 'Akbar was the third Mughal emperor (reigned 1542–1605) who transformed the empire through centralized administration, military expansion, and a policy of inclus Imagine you are the captain of a sports team that you inherited when you were v', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Mughal Administration: How the Empire', text: 'The Mughal administrative system was a structured government hierarchy designed to manage a vast empire through a central authority and specialized ministers wh Imagine your school has a Principal, but they cannot manage the canteen, the bu', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Mughal Art and Architecture', text: 'Mughal architecture is a unique building style that combined Indian, Persian, and Central Asian traditions to create grand, symmetrical structures using red san Have you ever noticed how the gates of a park or a large government building lo', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Shah Jahan and Aurangzeb: The Peak and', text: 'Shah Jahans reign marked the height of Mughal architectural splendor and stability, while Aurangzebs rule represented a shift toward rigid orthodoxy and the e Imagine you are visiting a grand monument like the Red Fort—have you ever wonde', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Society and Economy Under the Mughals', text: 'Mughal society and economy refers to the organized way people lived, worked, and interacted during the period of the Mughal Empire in India, characterized by a  Think about your own school: there are teachers, administrators, and students,', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { widget: 'tray', prompt: 'Match each emperor to his empire and achievement!' },
    challenges: [
        { type: 'sort', question: 'Match the ruler to his empire:',
          sortItems: [
            { id: 's0', label: 'Ashoka', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Akbar', emoji: '📌', correctBin: 'b2' },
            { id: 's2', label: 'Chandragupta II', emoji: '📌', correctBin: 'b1' }
          ],
          bins: [ { id: 'b0', label: 'Mauryan', color: '#3b82f6' },
                  { id: 'b1', label: 'Gupta', color: '#ef4444' },
                  { id: 'b2', label: 'Mughal', color: '#10b981' } ],
          hint: 'Ashoka = Mauryan peace; Gupta = golden age; Akbar = Mughal!',
          misconception: 'Ashoka = Maurya; Chandragupta II = Gupta golden age; Akbar = Mughal.',
          workedExample: ['Ashoka → Mauryan.', 'Chandragupta II → Gupta.', 'Akbar → Mughal.'] },
        { type: 'order', question: 'Order the empires chronologically:', sortItems: [
            { id: 'o0', label: 'Mughal Empire', emoji: '▶️', correctBin: 's2' },
            { id: 'o1', label: 'Gupta Empire', emoji: '▶️', correctBin: 's1' },
            { id: 'o2', label: 'Mauryan Empire', emoji: '▶️', correctBin: 's0' }
          ],
          bins: [ { id: 's0', label: '1st', color: '#3b82f6' },
                  { id: 's1', label: '2nd', color: '#8b5cf6' },
                  { id: 's2', label: '3rd', color: '#f59e0b' } ],
          hint: 'Oldest first!', misconception: 'Mauryas (~322 BCE) → Guptas (~320 CE) → Mughals (1526 CE).',
          workedExample: ['Mauryas first.', 'Then Guptas.', 'Then Mughals.'] },
        { type: 'mcq', question: 'Ashoka is famous for:', answer: 'turning to peace after the Kalinga war', options: ['building the Taj Mahal', 'turning to peace after the Kalinga war', 'starting the Mughal empire'],
          hint: 'War → peace!', misconception: 'Ashoka embraced Buddhism and peace after the Kalinga war\'s horror.',
          workedExample: ['Kalinga war = bloody.', 'Ashoka turned to peace.', 'Spread Buddhism.'] },
        { type: 'subpart', question: 'Understand the Gupta golden age:',
          parts: [
            { id: 'a', prompt: 'The Gupta period is called a golden age because:', answer: 'science, art, and learning flourished', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'A famous Gupta-era contribution is:', answer: 'the concept of zero in math', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'subpart', question: 'Apply what you learned in Empires of India:', hint: 'Work through each part step by step.', misconception: 'Students often assume that the Mauryan Empire appeared suddenly in an empty, uninhabited land. This is incorre', parts: [
            { id: 'a', prompt: 'Who was the founder of the Mauryan Empire, and who served as his main advisor?', answer: 'Chandragupta Maurya founded the empire, and his advisor was', hint: 'Think: The Rise of the Mauryan Empire', misconception: 'Students often assume that the Mauryan Empire appeared suddenly in an empty, uninhabited land. This is incorre', workedExample: ['Direct the student to look at a map showing the scattered ma','Ask them: If these kingdoms already existed, what did Chandr'] },
            { id: 'b', prompt: 'In your own words, what was the biggest change in the Indian political landscape when the Mauryan Empire was e', answer: 'The change was the move from many small, separate mahajanapa', hint: 'Think: The Rise of the Mauryan Empire', misconception: 'Students often assume that the Mauryan Empire appeared suddenly in an empty, uninhabited land. This is incorre', workedExample: ['Direct the student to look at a map showing the scattered ma','Ask them: If these kingdoms already existed, what did Chandr'] },
            { id: 'c', prompt: 'If Chandragupta Maurya wanted to add a neighboring land to his empire without starting a war, what method coul', answer: 'He could use diplomacy, such as making treaties or alliances', hint: 'Think: The Rise of the Mauryan Empire', misconception: 'Students often assume that the Mauryan Empire appeared suddenly in an empty, uninhabited land. This is incorre', workedExample: ['Direct the student to look at a map showing the scattered ma','Ask them: If these kingdoms already existed, what did Chandr'] },
            { id: 'd', prompt: 'Why was the existence of mahajanapadas a challenge to creating a single, strong nation?', answer: 'Because mahajanapadas were independent kingdoms with their o', hint: 'Think: The Rise of the Mauryan Empire', misconception: 'Students often assume that the Mauryan Empire appeared suddenly in an empty, uninhabited land. This is incorre', workedExample: ['Direct the student to look at a map showing the scattered ma','Ask them: If these kingdoms already existed, what did Chandr'] }
        ] },
    ],
    reflect: { prompts: ['Why did Ashoka\'s change of heart matter for history?', 'What makes a period a "golden age"?'] },
    successLine: 'Empires understood! 👑', tryAgainLine: 'Mauryas → Guptas → Mughals.',
};

export const c6HistFreedom: SimDef = {
    id: 'c6_hist_freedom', title: 'Freedom Struggle', subtitle: 'British rule to independence',
    classLevel: 6, subject: 'social', topic: 'Freedom Movement',
    chapters: ['History Ch10-12: Modern India'],
    nodeIds: ['c6_history_ch10_039','c6_history_ch10_040','c6_history_ch10_041','c6_history_ch10_042','c6_history_ch10_043','c6_history_ch10_044','c6_history_ch11_045','c6_history_ch11_046','c6_history_ch11_047','c6_history_ch11_048','c6_history_ch11_049','c6_history_ch11_050'],
    emoji: '🇮🇳', theme: { bg: 'from-orange-100 to-green-200', accent: 'orange', scene: 'freedom' },
    scenario: { role: "a freedom-fighter's chronicler", intro: "India fought 200 years of British rule — through revolts, movements, and sacrifice — to win freedom in 1947.", goal: "Understand the freedom struggle." },
    discovery: {
        question: "How did Indians fight a mighty empire without matching its weapons?",
        options: ["Non-violent movements and mass unity", "With bigger armies", "They didn't resist"],
        answer: "Non-violent movements and mass unity",
        hook: "Gandhi led non-violent resistance — salt marches, boycotts — uniting millions against the empire!",
    },
    teaching: [
        { title: 'The Coming of the Europeans', text: 'The Coming of the Europeans refers to the period starting in 1498 when sea-faring nations from Europe, such as the Portuguese, Dutch, and English, began arriv Imagine you are at a crowded train station where new travelers arrive from diff', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The East India Company and the Battle', text: 'The Battle of Plassey (1757) was a pivotal event where the East India Company shifted from being a business group to a political power in India by defeating the Imagine you are playing a team game, and instead of winning by playing better,', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Expansion of British Rule in India', text: 'The expansion of British rule in India refers to the process by which the East India Company, starting from Bengal, brought diverse regions under its control th Imagine you are playing a game of territory capture on a large map where your g', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Revolt of 1857', text: 'The Revolt of 1857 was a major, widespread uprising by Indian soldiers (sepoys) and various sections of society against the control and policies of the British  Have you ever felt so frustrated by a rule that you decided to stand up against', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'British Rule After 1858: Crown Rule', text: 'Crown Rule (or the British Raj) was the period starting in 1858 when the British government took direct control of India, ending the rule of the East India Comp Imagine if your school was run by a private club that suddenly caused a huge ar', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Impact of British Rule on India', text: 'The British Raj refers to the period of direct rule by the British Crown over the Indian subcontinent, which fundamentally changed Indias economy by prioritizi Imagine your family makes beautiful handmade sweaters that are famous in the wh', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Birth of Indian Nationalism', text: 'The birth of Indian nationalism refers to the late 19th-century process where people across India began to see themselves as a single, united nation against Bri Imagine you are part of a team where everyone has different ideas, but you all', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Non-Cooperation Movement', text: 'The Non-Cooperation Movement was a nationwide peaceful protest launched by Mahatma Gandhi in 1920, urging Indians to stop supporting British institutions to wea Imagine your school authorities pass a rule you feel is unfair, but instead of', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Civil Disobedience Movement', text: 'The Civil Disobedience Movement was a non-violent protest started by Mahatma Gandhi in 1930 to challenge British rule by intentionally breaking unfair laws, beg Imagine you are playing a game where someone suddenly makes a rule that you hav', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Quit India Movement', text: 'The Quit India Movement was a historic civil disobedience campaign launched by Mahatma Gandhi on August 8, 1942, demanding an immediate end to British colonial  Have you ever felt so strongly about a rule that you were willing to take a hug', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Subhas Chandra Bose and the INA', text: 'Subhas Chandra Bose, known as Netaji, was a key leader in the Indian freedom struggle who advocated for armed resistance against British rule. He formed the Ind Imagine you are playing a game where your team decides to ask the referee to ch', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Independence and Partition', text: 'Independence and Partition refer to the events of August 1947, when India became a self-governing nation while simultaneously being divided into two separate co Imagine your school is about to become independent and manage itself, but two g', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { component: TradeRouteMap, prompt: 'Trace the freedom timeline — from revolt to independence!' },
    challenges: [
        { type: 'order', question: 'Order the freedom struggle events:', sortItems: [
            { id: 'o0', label: 'Independence 1947', emoji: '▶️', correctBin: 's4' },
            { id: 'o1', label: 'Civil Disobedience', emoji: '▶️', correctBin: 's2' },
            { id: 'o2', label: '1857 Revolt', emoji: '▶️', correctBin: 's0' },
            { id: 'o3', label: 'Quit India', emoji: '▶️', correctBin: 's3' },
            { id: 'o4', label: 'Non-Cooperation Movement', emoji: '▶️', correctBin: 's1' }
          ],
          bins: [ { id: 's0', label: '1st', color: '#3b82f6' },
                  { id: 's1', label: '2nd', color: '#8b5cf6' },
                  { id: 's2', label: '3rd', color: '#f59e0b' },
                  { id: 's3', label: '4th', color: '#10b981' },
                  { id: 's4', label: '5th', color: '#ec4899' } ],
          hint: 'Revolt → Gandhi\'s movements → freedom!', misconception: '1857 revolt → Non-Cooperation → Civil Disobedience → Quit India → 1947.',
          workedExample: ['1857 first.', 'Then Gandhi\'s movements.', 'Then 1947 independence.'] },
        { type: 'mcq', question: 'Gandhi\'s method of resistance was:', answer: 'non-violent civil disobedience', options: ['armed rebellion', 'non-violent civil disobedience', 'foreign invasion'],
          hint: 'Peaceful but powerful!', misconception: 'Gandhi used non-violence — boycotts, marches, civil disobedience.',
          workedExample: ['Non-violence.', 'Salt march, boycotts.', 'Mass peaceful resistance.'] },
        { type: 'mcq', question: 'India gained independence in:', answer: '1947', options: ['1857', '1947', '1757'],
          hint: 'Mid-20th century!', misconception: 'Independence came on 15 August 1947.',
          workedExample: ['200 years of rule.', 'Freedom on 15 Aug 1947.'] },
        { type: 'subpart', question: 'Understand the 1857 revolt:',
          parts: [
            { id: 'a', prompt: 'The 1857 revolt was:', answer: 'the first major uprising against British rule', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'After it, rule shifted to:', answer: 'the British Crown', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'subpart', question: 'Apply what you learned in Freedom Struggle:', hint: 'Work through each part step by step.', misconception: 'Students often think factory meant a modern building with machines. In the 17th century, a factory was jus', parts: [
            { id: 'a', prompt: 'Who was the first European explorer to reach India by sailing around the Cape of Good Hope?', answer: 'Vasco da Gama', hint: 'Think: The Coming of the Europeans', misconception: 'Students often think factory meant a modern building with machines. In the 17th century, a factory was jus', workedExample: ['First, clarify that factory comes from factor (a merchant)','Ask the student to look at a picture of a 17th-century port ','Explain: Think of it as a big secure garage for goods, not a'] },
            { id: 'b', prompt: 'Why did European powers set up factories or trading posts in coastal cities like Surat?', answer: 'They were established as central bases to manage operations', hint: 'Think: The Coming of the Europeans', misconception: 'Students often think factory meant a modern building with machines. In the 17th century, a factory was jus', workedExample: ['First, clarify that factory comes from factor (a merchant)','Ask the student to look at a picture of a 17th-century port ','Explain: Think of it as a big secure garage for goods, not a'] },
            { id: 'c', prompt: 'If the Portuguese arrived in 1498 and the East India Company was founded in 1600, which group arrived in India', answer: 'The Portuguese', hint: 'Think: The Coming of the Europeans', misconception: 'Students often think factory meant a modern building with machines. In the 17th century, a factory was jus', workedExample: ['First, clarify that factory comes from factor (a merchant)','Ask the student to look at a picture of a 17th-century port ','Explain: Think of it as a big secure garage for goods, not a'] },
            { id: 'd', prompt: 'How does the establishment of a base in Goa differ from simply visiting a port?', answer: 'A base implies a long-term, permanent presence with infrastr', hint: 'Think: The Coming of the Europeans', misconception: 'Students often think factory meant a modern building with machines. In the 17th century, a factory was jus', workedExample: ['First, clarify that factory comes from factor (a merchant)','Ask the student to look at a picture of a 17th-century port ','Explain: Think of it as a big secure garage for goods, not a'] }
        ] },
    ],
    reflect: { prompts: ['Why was non-violence such a powerful weapon?', 'What did the freedom struggle cost ordinary people?'] },
    successLine: 'History honored! 🇮🇳', tryAgainLine: 'Non-violence won freedom.',
};

export const c6HistMedieval: SimDef = {
    id: 'c6_hist_medieval', title: 'Medieval India', subtitle: 'Sultanate to regional kingdoms',
    classLevel: 6, subject: 'social', topic: 'Medieval History',
    chapters: ['History Ch6-8: Medieval'],
    nodeIds: ['c6_history_ch06_015','c6_history_ch06_016','c6_history_ch06_017','c6_history_ch06_018','c6_history_ch06_019','c6_history_ch06_020','c6_history_ch07_023','c6_history_ch07_024','c6_history_ch07_026','c6_history_ch08_027','c6_history_ch08_028','c6_history_ch08_029','c6_history_ch08_030','c6_history_ch08_032'],
    emoji: '🏰', theme: { bg: 'from-amber-100 to-orange-200', accent: 'amber', scene: 'medieval' },
    scenario: { role: "a medieval-chronicler", intro: "After the ancient empires came the medieval age — Delhi Sultanate, Bhakti saints, and regional kingdoms like the Marathas.", goal: "Trace medieval India's kingdoms." },
    discovery: {
        question: "The Bhakti movement taught that anyone could reach God through devotion. Why was that revolutionary?",
        options: ["It rejected caste and priest control", "It was expensive", "It needed temples"],
        answer: "It rejected caste and priest control",
        hook: "Bhakti said devotion matters more than birth — a radical idea that challenged the social order!",
    },
    teaching: [
        { title: 'Introduction to the Medieval Period', text: 'The medieval period in Indian history is a distinct era of transformation occurring roughly between 700 CE and 1700 CE, following the decline of ancient empires Think about how your school looks different now compared to when your grandpare', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Bhakti Movement: Devotion to God', text: 'The Bhakti Movement was a religious and social shift in India where people moved away from complex rituals and rigid rules to focus on personal, deep love and s Have you ever felt that trying to talk to someone through a messenger or by fol', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Sufi Movement: Mystical Islam', text: 'The Sufi movement was a mystical path within Islam that focused on finding a direct, personal connection with God through deep love, meditation, and a simple, h Think about a time you felt really close to someone special just by talking to', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Arrival of Islam in the Subcontinent', text: 'The arrival of Islam in the Indian subcontinent refers to the process by which Islamic culture, faith, and practices were introduced to the region through peace Have you ever wondered how people from different parts of the world first met a', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'New Kingdoms and Dynasties', text: 'The medieval period was an era of transition in Indian history (approx. 8th to 12th century) characterized by the rise of new regional powers like the Rajputs i Think about your school\'s house system; each house has its own leaders and colo', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Cultural Developments in the Medieval', text: 'Cultural developments in the medieval period refer to the growth of new literary styles, religious expressions, and monumental architecture that transformed Ind Have you ever noticed how the style of buildings in your city looks different f', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Founding of the Delhi Sultanate', text: 'The Delhi Sultanate was the first major Islamic empire established in northern India, beginning in 1206 CE when Qutbuddin Aibak declared himself the independent Have you ever seen a sports team get a new coach who changes how the whole game', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Rulers of the Delhi Sultanate', text: 'The Delhi Sultanate refers to the period between 1206 and 1526 CE when five successive dynasties ruled parts of India from their capital, Delhi. These dynasties Imagine you are building a tower made of five different colored blocks, where e', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Administration Under the Delhi Sultana', text: 'The administration of the Delhi Sultanate was a centralized system where the Sultan acted as the supreme authority in political, military, and judicial matters, Imagine you are the captain of a school cricket team; you make the final decisi', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Architecture of the Delhi Sultanate', text: 'The architecture of the Delhi Sultanate refers to the construction style developed in India between the 13th and 16th centuries, characterized by the blending o Imagine you are walking through a city and notice a building with a tall, circu', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Life Under the Delhi Sultanate', text: 'Life under the Delhi Sultanate was a period where an Islamic ruling class governed a society that remained predominantly Hindu, leading to a unique blend of cul Imagine you move to a new neighborhood where everyone has different traditions,', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Decline of the Delhi Sultanate', text: 'The decline of the Delhi Sultanate refers to the gradual weakening and eventual breakup of the central power in Delhi, caused by internal leadership struggles a Think of a large, old house that starts to crack because the family living insi', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Vijayanagara Empire', text: 'The Vijayanagara Empire was a powerful medieval Indian kingdom that controlled southern India between 1336 and 1646, with its capital city, Vijayanagara, servin Have you ever wondered how a massive team project in class starts with just two', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Bahmani and Deccan Sultanates', text: 'The Bahmani Kingdom was an independent state established in the Deccan in 1347, which later split into five regional powers known as the Deccan Sultanates (Bija Have you ever seen a large piece of clay split into several smaller, separate p', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Rajput Kingdoms', text: 'The Rajput kingdoms were a collection of independent warrior-led Hindu states that emerged in northern and western India between the 8th and 16th centuries, cha Think of the last time you saw a sports team wear a special uniform or follow a', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Maratha Kingdom', text: 'The Maratha Kingdom was a regional power founded in the 17th century by Shivaji in the western Deccan region, rising from a local chieftainship to an independen Imagine you are building a fort out of blocks in your backyard, but other child', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Sikh Kingdom', text: 'The Sikh Kingdom was a powerful regional state in Punjab established by Ranjit Singh, which grew from a collection of decentralized military bands called *misls Imagine if your school was divided into ten different sports teams, each playin', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Regional Kingdoms and Cultural Diversi', text: 'Regional kingdoms were independent political entities that flourished across different parts of India during the medieval period, each creating a unique local i Have you ever noticed that the temples in Southern India look very different fr', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { widget: 'tray', prompt: 'Match each kingdom/movement to its region or idea!' },
    challenges: [
        { type: 'sort', question: 'Match to the medieval period:',
          sortItems: [
            { id: 's0', label: 'Delhi Sultanate', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Bhakti movement', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'Maratha kingdom', emoji: '📌', correctBin: 'b0' },
            { id: 's3', label: 'Sufi mystics', emoji: '📌', correctBin: 'b1' }
          ],
          bins: [ { id: 'b0', label: 'Kingdoms', color: '#3b82f6' }, { id: 'b1', label: 'Movements', color: '#ef4444' } ],
          hint: 'Kingdoms = rulers; movements = ideas!', misconception: 'Sultanate/Maratha = kingdoms; Bhakti/Sufi = religious movements.',
          workedExample: ['Sultanate, Maratha = kingdoms.', 'Bhakti, Sufi = movements.'] },
        { type: 'mcq', question: 'The Bhakti movement emphasized:', answer: 'devotion to God open to all', options: ['only priests could worship', 'devotion to God open to all', 'war'],
          hint: 'Who could reach God?', misconception: 'Bhakti taught devotion open to all — rejecting caste barriers.',
          workedExample: ['Devotion for everyone.', 'No caste barrier.', 'Bhakti.'] },
        { type: 'mcq', question: 'The Delhi Sultanate ruled which region?', answer: 'northern India', options: ['southern India', 'northern India', 'all of India'],
          hint: 'Delhi is in the north!', misconception: 'The Delhi Sultanate ruled northern India; the south had Vijayanagara.',
          workedExample: ['Delhi = north.', 'Sultanate = northern India.'] },
        { type: 'subpart', question: 'The Marathas:',
          parts: [
            { id: 'a', prompt: 'Founded under:', answer: 'Shivaji', hint: 'A famous warrior-king!', misconception: 'Shivaji founded the Maratha kingdom.' },
            { id: 'b', prompt: 'They challenged:', answer: 'the Mughals', hint: 'A rival empire!', misconception: 'The Marathas challenged Mughal dominance.' },
          ],
          hint: 'Shivaji vs the Mughals!', misconception: 'Marathas under Shivaji resisted the Mughal empire.',
          workedExample: ['Shivaji founded.', 'Challenged Mughals.'] },
        { type: 'subpart', question: 'Apply what you learned in Medieval India:', hint: 'Work through each part step by step.', misconception: 'Students often believe that Medieval means the time before humans had technology or settled life. This is a', parts: [
            { id: 'a', prompt: 'What is the general timeframe used to define the medieval period in India?', answer: 'The medieval period is generally dated from about 700 CE to', hint: 'Think: Introduction to the Medieval Period', misconception: 'Students often believe that Medieval means the time before humans had technology or settled life. This is a', workedExample: ['1','Ask the student to look at a timeline and point out the Hara','the Mughal Empire (medieval)'] },
            { id: 'b', prompt: 'Why do historians call the medieval period a time of transformation?', answer: 'It is called a time of transformation because old empires co', hint: 'Think: Introduction to the Medieval Period', misconception: 'Students often believe that Medieval means the time before humans had technology or settled life. This is a', workedExample: ['1','Ask the student to look at a timeline and point out the Hara','the Mughal Empire (medieval)'] },
            { id: 'c', prompt: 'If you were a historian, how would you decide that a new period has begun in a region?', answer: 'Steps: 1', hint: 'Think: Introduction to the Medieval Period', misconception: 'Students often believe that Medieval means the time before humans had technology or settled life. This is a', workedExample: ['1','Ask the student to look at a timeline and point out the Hara','the Mughal Empire (medieval)'] },
            { id: 'd', prompt: 'Compare the concept of ancient vs medieval based on the idea of stability.', answer: 'Ancient periods are often marked by the rise and fall of mas', hint: 'Think: Introduction to the Medieval Period', misconception: 'Students often believe that Medieval means the time before humans had technology or settled life. This is a', workedExample: ['1','Ask the student to look at a timeline and point out the Hara','the Mughal Empire (medieval)'] }
        ] },
    ],
    reflect: { prompts: ['Why was Bhakti a social revolution?', 'How did regional kingdoms shape India?'] },
    successLine: 'Medieval history mastered! 🏰', tryAgainLine: 'Kingdoms ruled; movements inspired.',
};

export const c6CivBudget: SimDef = {
    id: 'c6_civ_budget', title: 'Government Budget', subtitle: 'Where money comes & goes',
    classLevel: 6, subject: 'social', topic: 'Government Budget',
    chapters: ['Civics Ch13: Budget'],
    nodeIds: [],
    emoji: '💼', theme: { bg: 'from-green-100 to-emerald-200', accent: 'green', scene: 'budget' },
    scenario: { role: "a budget-analyst", intro: "Governments plan spending through a budget — collecting taxes and spending on services.", goal: "Understand how a budget works." },
    discovery: {
        question: "The government builds roads, schools, and hospitals. Where does the money come from?",
        options: ["Taxes collected from people", "It prints money freely", "Foreign gifts"],
        answer: "Taxes collected from people",
        hook: "Taxes fund the government — income tax, GST, customs — that money pays for public services!",
    },
    teaching: [
        { title: 'What is a Budget and Why Governments N', text: 'A government budget is a written financial plan that shows how much money the government expects to receive (income) and how it intends to spend that money on p Think about your own pocket money or your familys monthly expenses: how do you', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Sources of Government Income: Taxes an', text: 'Government income refers to the money the state collects to pay for public services like roads, schools, and hospitals. Taxes are the primary way governments ga Imagine your school needs to buy new library books but doesn\'t have the money.', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Government Expenditure: Where the Mone', text: 'Government expenditure is the process by which the government spends the money it collects from taxes and other sources to provide public services and facilitie Imagine your family has a monthly income and needs to decide how much to spend', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Types of Budget: Surplus, Deficit, Bal', text: 'A government budget is a financial plan that shows the relationship between money earned (income) and money spent (expenditure). It is categorized as balanced,  Think about your monthly pocket money: if you spend exactly what you receive, y', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'How the Budget Is Made and Approved', text: 'The government budget is a formal plan that lists how the government expects to collect money through taxes and how it plans to spend that money on public servi Imagine your family is planning a big trip and needs to decide how much money t', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { component: TaxFlowDiagram, prompt: 'Balance the budget — income vs spending!' },
    challenges: [
        { type: 'mcq', question: 'The government\'s main source of income is:', answer: 'taxes', options: ['lottery', 'taxes', 'donations'],
          hint: 'What do citizens pay?', misconception: 'Taxes (income tax, GST, customs) are the government\'s main income.',
          workedExample: ['Taxes fund the government.', 'Income tax, GST, customs.'] },
        { type: 'mcq', question: 'A budget deficit means:', answer: 'spending exceeds income', options: ['income exceeds spending', 'spending exceeds income', 'no spending'],
          hint: 'Spending more than you earn!', misconception: 'Deficit = spending > income, so the government borrows.',
          workedExample: ['Spending > income.', 'Must borrow.', 'Deficit.'] },
        { type: 'sort', question: 'Sort income vs expenditure:',
          sortItems: [
            { id: 's0', label: 'Income tax', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Building roads', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'GST on goods', emoji: '📌', correctBin: 'b0' },
            { id: 's3', label: 'Paying salaries', emoji: '📌', correctBin: 'b1' }
          ],
          bins: [ { id: 'b0', label: 'Income', color: '#3b82f6' }, { id: 'b1', label: 'Expenditure', color: '#ef4444' } ],
          hint: 'Taxes bring money in; services spend it!', misconception: 'Taxes = income; roads/salaries = expenditure.',
          workedExample: ['Tax, GST = income.', 'Roads, salaries = spending.'] },
        { type: 'subpart', question: 'Understand the budget:',
          parts: [
            { id: 'a', prompt: 'A balanced budget has:', answer: 'income equal to spending', hint: 'Equal both sides!', misconception: 'Balanced = income = spending.' },
            { id: 'b', prompt: 'Who presents the budget?', answer: 'the finance minister', hint: 'A minister in Parliament!', misconception: 'The finance minister presents the budget to Parliament.' },
          ],
          hint: 'Income = spending = balanced!', misconception: 'Balanced budget = equal income and spending; finance minister presents it.',
          workedExample: ['Income = spending.', 'Finance minister presents.'] },
        { type: 'subpart', question: 'Apply what you learned in Government Budget:', hint: 'Work through each part step by step.', misconception: 'Students often think budget means saving money or not spending. In reality, a budget is a plan to *spend', parts: [
            { id: 'a', prompt: 'What are the two main components that make up a government budget?', answer: 'The two main components are expected income and planned expe', hint: 'Think: What is a Budget and Why Governments Need One', misconception: 'Students often think budget means saving money or not spending. In reality, a budget is a plan to *spend', workedExample: ['If a student is stuck, ask them: If your family wanted to go','Ask them to write down three things the government *must* pa'] },
            { id: 'b', prompt: 'Why do you think a government cannot just spend money whenever it wants without a budget?', answer: 'A budget is necessary to prioritize needs and ensure resourc', hint: 'Think: What is a Budget and Why Governments Need One', misconception: 'Students often think budget means saving money or not spending. In reality, a budget is a plan to *spend', workedExample: ['If a student is stuck, ask them: If your family wanted to go','Ask them to write down three things the government *must* pa'] },
            { id: 'c', prompt: 'The citizens would have beautiful places to play but would face safety issues at night. The student must analy', answer: '**Correct Answer:** Prioritizing parks over streetlights wou', hint: 'Think: What is a Budget and Why Governments Need One', misconception: 'Students often think budget means saving money or not spending. In reality, a budget is a plan to *spend', workedExample: ['If a student is stuck, ask them: If your family wanted to go','Ask them to write down three things the government *must* pa'] },
            { id: 'd', prompt: 'Compare a familys monthly budget to a governments yearly budget. What is one similarity?', answer: 'Both must balance what comes in with what goes out to avoid', hint: 'Think: What is a Budget and Why Governments Need One', misconception: 'Students often think budget means saving money or not spending. In reality, a budget is a plan to *spend', workedExample: ['If a student is stuck, ask them: If your family wanted to go','Ask them to write down three things the government *must* pa'] }
        ] },
    ],
    reflect: { prompts: ['Why does a government need a budget?', 'What happens if spending exceeds income?'] },
    successLine: 'Budget understood! 💼', tryAgainLine: 'Taxes in, services out.',
};

export const c6CivDiversity: SimDef = {
    id: 'c6_civ_diversity', title: 'Unity in Diversity', subtitle: 'India\'s many cultures',
    classLevel: 6, subject: 'social', topic: 'Diversity',
    chapters: ['Civics Ch14: Diversity'],
    nodeIds: ['c6_civics_ch14_033'],
    emoji: '🌈', theme: { bg: 'from-rose-100 to-pink-200', accent: 'rose', scene: 'diversity' },
    scenario: { role: "a unity-builder", intro: "India has hundreds of languages, many religions, and countless customs — yet stands as one nation.", goal: "Understand unity in diversity." },
    discovery: {
        question: "How can a country with 22 official languages and many religions stay united?",
        options: ["Shared values and mutual respect", "Everyone must be the same", "They can\'t"],
        answer: "Shared values and mutual respect",
        hook: "Unity doesn't need sameness — respect for differences holds India together!",
    },
    teaching: [
        { title: 'What is Diversity and Why It Matters', text: 'Diversity is the presence of a wide variety of differences among people, including their languages, religions, food, clothing, and traditions. It means that whi Start by looking at your lunch box and your classmates\' lunch boxes; do you not', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Linguistic Diversity: Languages of Ind', text: 'Linguistic diversity refers to the existence of a wide variety of languages and dialects within a specific region or society. In India, this means that people a Have you ever noticed that your friend might speak one language at home with th', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Religious Diversity: Many Faiths, One', text: 'Religious diversity refers to the presence of multiple different faiths and belief systems living together within the same society. It describes how India acts  Think about the last time you walked down a busy street in your town or city.', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Cultural Diversity: Food, Dress, Festi', text: 'Cultural diversity refers to the existence of a wide variety of customs, languages, foods, dresses, and festivals within a society, all coexisting under a share Imagine you are at a train station in India—what do you see? You might notice s', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Unity in Diversity: What Holds India T', text: 'Unity in Diversity is the concept that despite India\'s massive differences in language, food, clothing, and customs, the country remains one nation because th Think about your favourite meal—maybe your family makes a special dal or vegeta', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Challenges of Diversity: Inequality an', text: 'Inequality refers to the unfair distribution of resources and opportunities among people, while discrimination is the act of treating individuals or groups unfa Imagine you are at a school sports day and some students are given expensive sh', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Promoting Harmony and Respect for Dive', text: 'Promoting harmony and respect for diversity is the intentional practice of valuing different cultures, languages, and traditions while working together to creat Have you ever noticed how your friends bring different types of food in their l', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { component: DiversityWeb, prompt: 'Match each type of diversity to an example!' },
    challenges: [
        { type: 'sort', question: 'Match the diversity type:',
          sortItems: [
            { id: 's0', label: 'Hindi, Tamil, Bengali', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Hindu, Muslim, Sikh', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'Different foods and dress', emoji: '📌', correctBin: 'b2' }
          ],
          bins: [ { id: 'b0', label: 'Language', color: '#3b82f6' }, { id: 'b1', label: 'Religion', color: '#ef4444' }, { id: 'b2', label: 'Culture', color: '#10b981' } ],
          hint: 'Languages / faiths / customs!', misconception: 'Languages = Hindi/Tamil; religions = Hindu/Muslim; culture = food/dress.',
          workedExample: ['Languages spoken.', 'Faiths practised.', 'Cultural customs.'] },
        { type: 'mcq', question: '"Unity in diversity" means:', answer: 'one nation despite many differences', options: ['everyone is the same', 'one nation despite many differences', 'only one language'],
          hint: 'Different but united!', misconception: 'Unity in diversity = shared identity despite differences.',
          workedExample: ['Many differences.', 'One nation.', 'Unity in diversity.'] },
        { type: 'mcq', question: 'A challenge of diversity is:', answer: 'discrimination and inequality', options: ['too much unity', 'discrimination and inequality', 'too few languages'],
          hint: 'Differences can cause unfairness!', misconception: 'Diversity can lead to discrimination — respect and fairness counter it.',
          workedExample: ['Differences exist.', 'Can cause inequality.', 'Need respect.'] },
        { type: 'subpart', question: 'Understand India\'s diversity:',
          parts: [
            { id: 'a', prompt: 'How many languages does the Constitution recognize?', answer: '22', hint: 'A specific number!', misconception: 'The Constitution recognizes 22 official languages.' },
            { id: 'b', prompt: 'What unites Indians despite differences?', answer: 'shared values and identity', hint: 'Flag, anthem, constitution!', misconception: 'Shared values, symbols, and constitution unite Indians.' },
          ],
          hint: 'Many languages, one nation!', misconception: '22 official languages; shared identity unites.',
          workedExample: ['22 languages.', 'Shared identity unites.'] },
        { type: 'subpart', question: 'Apply what you learned in Unity in Diversity:', hint: 'Work through each part step by step.', misconception: 'Students often think diversity means division or that if people are different, they cannot get along. They', parts: [
            { id: 'a', prompt: 'What are two examples of diversity found in Indian society?', answer: 'Two examples are the different languages spoken (like Hindi,', hint: 'Think: What is Diversity and Why It Matters', misconception: 'Students often think diversity means division or that if people are different, they cannot get along. They', workedExample: ['First, ask the student to identify one thing they have in co','Then, explain that diversity is like a color palette; a pain','Finally, help them list three shared traits (like being Indi'] },
            { id: 'b', prompt: 'Explain in your own words what Unity in Diversity means.', answer: 'It means that even though Indians are very different from on', hint: 'Think: What is Diversity and Why It Matters', misconception: 'Students often think diversity means division or that if people are different, they cannot get along. They', workedExample: ['First, ask the student to identify one thing they have in co','Then, explain that diversity is like a color palette; a pain','Finally, help them list three shared traits (like being Indi'] },
            { id: 'c', prompt: 'If a new student joins your class from a different state, how can you show that you value diversity?', answer: 'Steps: 1', hint: 'Think: What is Diversity and Why It Matters', misconception: 'Students often think diversity means division or that if people are different, they cannot get along. They', workedExample: ['First, ask the student to identify one thing they have in co','Then, explain that diversity is like a color palette; a pain','Finally, help them list three shared traits (like being Indi'] },
            { id: 'd', prompt: 'Why might a historian find it difficult to write a single story about India?', answer: 'Because the bewildering variety of cultures, languages, an', hint: 'Think: What is Diversity and Why It Matters', misconception: 'Students often think diversity means division or that if people are different, they cannot get along. They', workedExample: ['First, ask the student to identify one thing they have in co','Then, explain that diversity is like a color palette; a pain','Finally, help them list three shared traits (like being Indi'] }
        ] },
    ],
    reflect: { prompts: ['Why is diversity a strength, not a weakness?', 'What holds a diverse nation together?'] },
    successLine: 'Diversity understood! 🌈', tryAgainLine: 'Different yet united.',
};

export const c6CivMedia: SimDef = {
    id: 'c6_civ_media', title: 'Media & Democracy', subtitle: 'Information and responsibility',
    classLevel: 6, subject: 'social', topic: 'Media',
    chapters: ['Civics Ch15: Media'],
    nodeIds: [],
    emoji: '📰', theme: { bg: 'from-slate-100 to-gray-200', accent: 'slate', scene: 'media' },
    scenario: { role: "a media-critic", intro: "Media informs the public — newspapers, TV, internet — but requires responsibility and critical thinking.", goal: "Understand media's role and ethics." },
    discovery: {
        question: "Why is a free press important in a democracy?",
        options: ["It holds power accountable and informs citizens", "For entertainment", "To sell ads"],
        answer: "It holds power accountable and informs citizens",
        hook: "Free media = watchdog of democracy — it questions power and keeps citizens informed!",
    },
    teaching: [
        { title: 'What is Media and Its Role in Democrac', text: 'Media refers to all the tools and channels—such as newspapers, television, radio, and the internet—that we use to share information with large groups of people. Have you ever wondered how you know about a new law passed in Delhi or a flood', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Types of Media: Print, Electronic, Dig', text: 'Media refers to the various channels or tools used to communicate information to a large number of people, categorized into print, electronic, and digital forma Think about how you learned about the weather this morning or the latest cricke', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Media Ethics and Responsibility', text: 'Media ethics are the set of moral rules that guide journalists to report the truth accurately, fairly, and independently. It acts as a code of conduct to ensure Have you ever seen two people tell the same story differently? Imagine a fight', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Being a Critical Media Consumer', text: 'Being a critical media consumer means that instead of believing everything we see on news or social media instantly, we investigate the source, the purpose, and Imagine you see a viral video on your phone claiming that Schools in your city', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { component: MediaFilter, prompt: 'Sort media into print, electronic, digital!' },
    challenges: [
        { type: 'sort', question: 'Sort the media types:',
          sortItems: [
            { id: 's0', label: 'Newspaper', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Television', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'Social media app', emoji: '📌', correctBin: 'b2' },
            { id: 's3', label: 'Radio', emoji: '📌', correctBin: 'b1' }
          ],
          bins: [ { id: 'b0', label: 'Print', color: '#3b82f6' }, { id: 'b1', label: 'Electronic', color: '#ef4444' }, { id: 'b2', label: 'Digital', color: '#10b981' } ],
          hint: 'Paper / broadcast / internet!', misconception: 'Print = paper; electronic = TV/radio; digital = internet/social.',
          workedExample: ['Newspaper = print.', 'TV, radio = electronic.', 'Social media = digital.'] },
        { type: 'mcq', question: 'Media is called the watchdog of democracy because it:', answer: 'holds the powerful accountable', options: ['entertains people', 'holds the powerful accountable', 'sells products'],
          hint: 'Who watches the leaders?', misconception: 'Media questions leaders and exposes wrongdoing — the watchdog role.',
          workedExample: ['Questions power.', 'Exposes wrongdoing.', 'Watchdog.'] },
        { type: 'mcq', question: 'Being a critical media consumer means:', answer: 'checking sources and spotting bias', options: ['believing everything', 'checking sources and spotting bias', 'avoiding all news'],
          hint: 'Don\'t just accept — verify!', misconception: 'Critical consumption = verify sources, spot bias, question claims.',
          workedExample: ['Check the source.', 'Spot bias.', 'Think critically.'] },
        { type: 'subpart', question: 'Media ethics:',
          parts: [
            { id: 'a', prompt: 'Good media is:', answer: 'accurate and fair', hint: 'Truth + balance!', misconception: 'Ethical media is accurate, fair, responsible — no fake news.' },
            { id: 'b', prompt: 'Fake news is dangerous because:', answer: 'it misleads the public', hint: 'Lies spread fast!', misconception: 'Fake news misleads — always verify before sharing.' },
          ],
          hint: 'Truth and responsibility!', misconception: 'Media must be accurate and fair; fake news misleads.',
          workedExample: ['Accurate + fair.', 'Fake news misleads.'] },
        { type: 'subpart', question: 'Apply what you learned in Media & Democracy:', hint: 'Work through each part step by step.', misconception: 'Students often think the media is just for entertainment (like movies or music) rather than a tool for democ', parts: [
            { id: 'a', prompt: 'Name three different forms of mass communication that are considered media.', answer: 'Newspapers, television, and the internet', hint: 'Think: What is Media and Its Role in Democracy', misconception: 'Students often think the media is just for entertainment (like movies or music) rather than a tool for democ', workedExample: ['Ask the student: If you were the class monitor, how would yo','Then, ask why it is important that they tell the truth rathe'] },
            { id: 'b', prompt: 'Why is the media often called the fourth pillar of democracy?', answer: 'It is called the fourth pillar because, like the legislature', hint: 'Think: What is Media and Its Role in Democracy', misconception: 'Students often think the media is just for entertainment (like movies or music) rather than a tool for democ', workedExample: ['Ask the student: If you were the class monitor, how would yo','Then, ask why it is important that they tell the truth rathe'] },
            { id: 'c', prompt: 'If a citizen never watched the news or read a newspaper, how would it affect their ability to vote?', answer: 'Steps: 1', hint: 'Think: What is Media and Its Role in Democracy', misconception: 'Students often think the media is just for entertainment (like movies or music) rather than a tool for democ', workedExample: ['Ask the student: If you were the class monitor, how would yo','Then, ask why it is important that they tell the truth rathe'] },
            { id: 'd', prompt: 'Compare the role of the judiciary with the role of the media in a democracy.', answer: 'The judiciary makes legal decisions and punishes those who b', hint: 'Think: What is Media and Its Role in Democracy', misconception: 'Students often think the media is just for entertainment (like movies or music) rather than a tool for democ', workedExample: ['Ask the student: If you were the class monitor, how would yo','Then, ask why it is important that they tell the truth rathe'] }
        ] },
    ],
    reflect: { prompts: ['Why does democracy need a free press?', 'How can you tell real news from fake?'] },
    successLine: 'Media understood! 📰', tryAgainLine: 'Verify before you believe.',
};

export const c6EcoInfra: SimDef = {
    id: 'c6_eco_infra', title: 'Infrastructure', subtitle: 'Roads, power, services',
    classLevel: 6, subject: 'social', topic: 'Infrastructure',
    chapters: ['Economics Ch7: Infrastructure'],
    nodeIds: ['c6_economics_ch07_001','c6_economics_ch07_002','c6_economics_ch07_003','c6_economics_ch07_004','c6_economics_ch07_005','c6_economics_ch07_006'],
    emoji: '🏗️', theme: { bg: 'from-orange-100 to-amber-200', accent: 'orange', scene: 'infrastructure' },
    scenario: { role: "a city-planner", intro: "Infrastructure is the backbone — roads, power, water, schools, hospitals — that makes a country work.", goal: "Understand infrastructure." },
    discovery: {
        question: "A village gets a new road connecting it to the city. How does that help its economy?",
        options: ["Farmers can sell goods, people reach jobs and hospitals", "It doesn\'t help", "Only cars benefit"],
        answer: "Farmers can sell goods, people reach jobs and hospitals",
        hook: "A road connects people to markets, jobs, schools — infrastructure grows the economy!",
    },
    teaching: [
        { title: 'What is Infrastructure and Why It Matt', text: 'Infrastructure refers to the essential physical structures and service systems—such as roads, power plants, and schools—that enable a society to function and ec Imagine you are trying to sell fresh strawberries from a farm in a remote villa', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Physical Infrastructure: Roads, Bridge', text: 'Physical infrastructure consists of the basic, tangible structures—such as roads, power grids, bridges, and water systems—that allow an economy to function and  Have you ever noticed how your morning glass of milk arrives at your house? Ima', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Social Infrastructure: Schools, Hospit', text: 'Social infrastructure refers to the essential public facilities, such as schools and hospitals, that support human development and improve the quality of life f Think about your school building—why do you go there every day? It is more than', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Transport Networks: Connecting People', text: 'Transport networks are the interconnected systems of roads, railways, waterways, and airways that act as the economy\'s arteries to move people and goods from on Think about how the milk in your morning tea reaches your home.', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Communication Networks: From Post to I', text: 'Communication networks are systems that allow the exchange of information across distances, connecting people, businesses, and government services. They are a v How did your grandparents send a message to a relative in another city before m', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Infrastructure and Economic Growth: Th', text: 'Infrastructure refers to the basic physical and organizational structures—such as roads, electricity, and water supply—that are necessary for a country to funct Imagine you live in a village where there is no road to reach the main market;', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { component: InfrastructureBuilder, prompt: 'Sort infrastructure into physical vs social!' },
    challenges: [
        { type: 'sort', question: 'Physical or social infrastructure?',
          sortItems: [
            { id: 's0', label: 'Roads and bridges', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Schools', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'Electricity grid', emoji: '📌', correctBin: 'b0' },
            { id: 's3', label: 'Hospitals', emoji: '📌', correctBin: 'b1' }
          ],
          bins: [ { id: 'b0', label: 'Physical', color: '#3b82f6' }, { id: 'b1', label: 'Social', color: '#ef4444' } ],
          hint: 'Structures vs services!', misconception: 'Physical = hard structures; social = services for people.',
          workedExample: ['Roads, power = physical.', 'Schools, hospitals = social.'] },
        { type: 'mcq', question: 'Infrastructure helps the economy by:', answer: 'enabling trade, jobs, and services', options: ['using up money', 'enabling trade, jobs, and services', 'slowing growth'],
          hint: 'It connects everything!', misconception: 'Infrastructure enables trade, jobs, and services — driving growth.',
          workedExample: ['Connects people.', 'Enables trade.', 'Drives growth.'] },
        { type: 'mcq', question: 'Which is social infrastructure?', answer: 'a hospital', options: ['a highway', 'a hospital', 'a power plant'],
          hint: 'A service for people!', misconception: 'Hospitals and schools are social infrastructure; roads and power are physical.',
          workedExample: ['Hospital = service.', 'Social infrastructure.'] },
        { type: 'subpart', question: 'Infrastructure impact:',
          parts: [
            { id: 'a', prompt: 'A new road mainly helps by:', answer: 'connecting people to markets and services', hint: 'Connection!', misconception: 'Roads connect people to markets, jobs, hospitals.' },
            { id: 'b', prompt: 'Poor infrastructure leads to:', answer: 'slower economic growth', hint: 'No connections = no growth!', misconception: 'Weak infrastructure slows trade and growth.' },
          ],
          hint: 'Connections grow economies!', misconception: 'Infrastructure enables trade and growth; its absence slows both.',
          workedExample: ['Connect = grow.', 'Disconnect = slow.'] },
        { type: 'subpart', question: 'Apply what you learned in Infrastructure:', hint: 'Work through each part step by step.', misconception: 'Students often confuse infrastructure with manufacturing machines. They might think that a loom in a texti', parts: [
            { id: 'a', prompt: 'List three examples of infrastructure from your daily life.', answer: 'Roads, schools, and electricity supply', hint: 'Think: What is Infrastructure and Why It Matters', misconception: 'Students often confuse infrastructure with manufacturing machines. They might think that a loom in a texti', workedExample: ['Ask the student: Does the loom provide power to the whole vi'] },
            { id: 'b', prompt: 'Why is infrastructure called the backbone of an economy?', answer: 'It is called the backbone because it provides the necessary', hint: 'Think: What is Infrastructure and Why It Matters', misconception: 'Students often confuse infrastructure with manufacturing machines. They might think that a loom in a texti', workedExample: ['Ask the student: Does the loom provide power to the whole vi'] },
            { id: 'c', prompt: 'If a city had no communication networks (like internet or phones), how would a local shopkeeper be affected?', answer: 'The shopkeeper could not order new stock from wholesalers, i', hint: 'Think: What is Infrastructure and Why It Matters', misconception: 'Students often confuse infrastructure with manufacturing machines. They might think that a loom in a texti', workedExample: ['Ask the student: Does the loom provide power to the whole vi'] },
            { id: 'd', prompt: 'Compare the impact of a road network on a farmer versus a factory worker.', answer: 'The farmer needs roads to transport perishable crops to the', hint: 'Think: What is Infrastructure and Why It Matters', misconception: 'Students often confuse infrastructure with manufacturing machines. They might think that a loom in a texti', workedExample: ['Ask the student: Does the loom provide power to the whole vi'] }
        ] },
    ],
    reflect: { prompts: ['Why is infrastructure called the "backbone" of an economy?', 'How do roads change a village\'s life?'] },
    successLine: 'Infrastructure understood! 🏗️', tryAgainLine: 'Physical = structures; social = services.',
};

export const c6EcoBanking: SimDef = {
    id: 'c6_eco_banking', title: 'Banking', subtitle: 'Save, borrow, grow',
    classLevel: 6, subject: 'social', topic: 'Banking',
    chapters: ['Economics Ch8: Banking'],
    nodeIds: ['c6_economics_ch08_001','c6_economics_ch08_002','c6_economics_ch08_003','c6_economics_ch08_006'],
    emoji: '🏦', theme: { bg: 'from-blue-100 to-indigo-200', accent: 'blue', scene: 'banking' },
    scenario: { role: "a young banker", intro: "Banks keep money safe, lend to borrowers, and pay interest to savers — keeping the economy moving.", goal: "Understand how banks work." },
    discovery: {
        question: "If you keep ₹1000 in a savings account, why does it grow to ₹1050 after a year?",
        options: ["The bank pays you interest", "It doubles magically", "It stays the same"],
        answer: "The bank pays you interest",
        hook: "Interest = the bank pays you for keeping money with it — your savings grow!",
    },
    teaching: [
        { title: 'What is a Bank? A Safe Place for Money', text: 'A bank is a financial institution that acts as a safe storage place for money, accepting deposits from people who have extra cash and lending that money to peop Think about a time you saved money in a piggy bank—where did you keep it? If yo', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Saving and Borrowing: Two Sides of Ban', text: 'Banks act as financial bridges by collecting money from people who have extra savings (savers) and lending that money to people who need it for specific purpose Imagine you have a piggy bank that is full, but your friend needs money to buy', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Understanding Interest: The Cost of Bo', text: 'Interest is the price paid for using someone else\'s money; it acts as a reward when you save money in a bank and a cost when you borrow money from one. It is ty Have you ever wondered why, if you put 1,000 rupees in a piggy bank for a year,', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Types of Bank Accounts: Savings, Curre', text: 'Bank accounts are specialized services provided by banks that allow individuals and businesses to store money safely, earn interest, or manage frequent payments Imagine you have a piggy bank, but instead of just holding coins, it could pay', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Banking Services: Cheques, ATMs, Onlin', text: 'Banking services are modern financial tools—like cheques, ATMs, and online banking—that allow people to manage, store, and transfer their money safely without a Have you ever wondered how your parents pay for expensive things without carryi', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Banks and the Economy: How Banks Keep', text: 'Banks are financial institutions that act as a bridge by collecting money from people who have extra savings and lending it to those who need capital for produc Have you ever wondered what happens to the money your parents put in a savings', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { component: BankingFlow, prompt: 'Grow your savings — deposit money and watch interest add up!' },
    challenges: [
        { type: 'math_input', question: 'Deposit ₹1000 at 5% interest. Interest after 1 year?', answer: '50',
          mathInput: { placeholder: '₹' },
          hint: '5% of 1000!', misconception: '5% of 1000 = 5/100 × 1000 = ₹50.',
          workedExample: ['5/100 × 1000.', '= ₹50.'] },
        { type: 'mcq', question: 'A bank pays interest to:', answer: 'savers who deposit money', options: ['borrowers', 'savers who deposit money', 'no one'],
          hint: 'Who earns interest?', misconception: 'Banks pay interest to savers; borrowers pay interest to the bank.',
          workedExample: ['Savers deposit.', 'Bank pays them interest.', 'Reward for saving.'] },
        { type: 'sort', question: 'Match the account to its use:',
          sortItems: [
            { id: 's0', label: 'Save money, earn interest', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Business transactions', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'Lock money for higher interest', emoji: '📌', correctBin: 'b2' }
          ],
          bins: [ { id: 'b0', label: 'Savings', color: '#3b82f6' }, { id: 'b1', label: 'Current', color: '#ef4444' }, { id: 'b2', label: 'Fixed Deposit', color: '#10b981' } ],
          hint: 'Save / business / locked!', misconception: 'Savings = save+earn; current = business; FD = locked for higher rate.',
          workedExample: ['Savings = save.', 'Current = business.', 'FD = locked.'] },
        { type: 'subpart', question: 'How banks help the economy:',
          parts: [
            { id: 'a', prompt: 'Banks lend money to:', answer: 'borrowers who need it', hint: 'People and businesses!', misconception: 'Banks lend savers\' money to borrowers — fueling business.' },
            { id: 'b', prompt: 'This keeps money:', answer: 'flowing in the economy', hint: 'Money moves!', misconception: 'Banks keep money circulating — deposits become loans.' },
          ],
          hint: 'Deposit → lend → grow!', misconception: 'Banks connect savers and borrowers, keeping money flowing.',
          workedExample: ['Savers deposit.', 'Banks lend.', 'Money flows.'] },
        { type: 'subpart', question: 'Apply what you learned in Banking:', hint: 'Work through each part step by step.', misconception: 'Students often think a bank is just a vault or a big safe that holds cash. They fail to understand the lend', parts: [
            { id: 'a', prompt: 'What are the two main functions of a bank? (Recall)', answer: 'The two main functions are accepting deposits from people wi', hint: 'Think: What is a Bank? A Safe Place for Money', misconception: 'Students often think a bank is just a vault or a big safe that holds cash. They fail to understand the lend', workedExample: ['Ask the student: If the bank just hid your money in a box, h'] },
            { id: 'b', prompt: 'Keeping money in a bank keeps it safe and prevents it from sitting idle, whereas money under a bed earns nothi', answer: '**Correct Answer:** Keeping money in a bank is better becaus', hint: 'Think: What is a Bank? A Safe Place for Money', misconception: 'Students often think a bank is just a vault or a big safe that holds cash. They fail to understand the lend', workedExample: ['Ask the student: If the bank just hid your money in a box, h'] },
            { id: 'c', prompt: 'If your neighbour needs money to open a small bakery, where can they go to get it, and what is that process ca', answer: 'They can go to a bank to request a loan', hint: 'Think: What is a Bank? A Safe Place for Money', misconception: 'Students often think a bank is just a vault or a big safe that holds cash. They fail to understand the lend', workedExample: ['Ask the student: If the bank just hid your money in a box, h'] },
            { id: 'd', prompt: 'How do banks help connect two different types of people in a town? (Analyze)', answer: 'Banks connect people with extra money (depositors) to peop', hint: 'Think: What is a Bank? A Safe Place for Money', misconception: 'Students often think a bank is just a vault or a big safe that holds cash. They fail to understand the lend', workedExample: ['Ask the student: If the bank just hid your money in a box, h'] }
        ] },
    ],
    reflect: { prompts: ['Why do banks pay interest on savings?', 'How does lending help the economy grow?'] },
    successLine: 'Banking mastered! 🏦', tryAgainLine: 'Save earns interest; borrow costs it.',
};

export const c6EcoMarket: SimDef = {
    id: 'c6_eco_market', title: 'Markets', subtitle: 'Buyers, sellers, prices',
    classLevel: 6, subject: 'social', topic: 'Markets',
    chapters: ['Economics Ch12: Markets'],
    nodeIds: ['c6_economics_ch12_001','c6_economics_ch12_002','c6_economics_ch12_003','c6_economics_ch12_005'],
    emoji: '🛒', theme: { bg: 'from-teal-100 to-cyan-200', accent: 'teal', scene: 'market' },
    scenario: { role: "a market-trader", intro: "Markets bring buyers and sellers together — from vegetable vendors to online shops — where prices are set.", goal: "Understand how markets work." },
    discovery: {
        question: "If many people want mangoes but few are available, what happens to the price?",
        options: ["Price rises — high demand, low supply", "Price falls", "Stays the same"],
        answer: "Price rises — high demand, low supply",
        hook: "Supply and demand! Scarce + wanted = expensive. Plenty + unwanted = cheap!",
    },
    teaching: [
        { title: 'What is a Market? Buyers, Sellers, and', text: 'A market is any environment, physical or digital, where buyers and sellers meet to exchange goods or services for a price. It acts as the central link that conn Have you ever wondered what happens when you buy a pencil from a shopkeeper? St', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Types of Markets: Local, National, and', text: 'Markets are categorized based on their geographical reach, where local markets serve immediate neighborhoods, national markets cover an entire country, and glob Think about the fresh vegetables your mother buys from the street vendor compar', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'How Prices Are Determined: Supply and', text: 'Supply is the total amount of a product that sellers are willing to offer at a specific price, while demand is the total amount that buyers are willing and able Have you ever wondered why the price of umbrellas goes up when the monsoon star', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Competition in Markets: Many Sellers,', text: 'Market competition is a situation where multiple sellers offer products to many buyers, which forces sellers to keep prices fair and quality high. A monopoly oc Have you ever wondered why there are so many different shops selling notebooks', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Consumer Awareness: Rights and Protect', text: 'Consumer awareness is the process of understanding your rights as a buyer and learning how to protect yourself from unfair market practices like overcharging, s Have you ever bought a packet of chips only to find it was already expired, or', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Markets in Daily Life: From Vegetable', text: 'Markets are the physical or virtual spaces where people buy and sell goods and services in exchange for money. They act as the meeting point between those who p Think about how you got your breakfast today; did you use milk from a local dai', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { component: MarketMatch, prompt: 'Match supply and demand to see how prices move!' },
    challenges: [
        { type: 'mcq', question: 'When demand is high and supply is low, price:', answer: 'rises', options: ['falls', 'rises', 'stays same'],
          hint: 'Scarce + wanted = expensive!', misconception: 'High demand + low supply = high price (scarcity drives price up).',
          workedExample: ['Many want it.', 'Few available.', 'Price rises.'] },
        { type: 'mcq', question: 'Competition among sellers usually leads to:', answer: 'fair prices and better quality', options: ['higher prices', 'fair prices and better quality', 'no goods'],
          hint: 'Sellers compete for buyers!', misconception: 'Competition keeps prices fair and improves quality — good for buyers.',
          workedExample: ['Many sellers.', 'Compete on price + quality.', 'Buyers benefit.'] },
        { type: 'sort', question: 'Sort the market types:',
          sortItems: [
            { id: 's0', label: 'Vegetable vendor', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'International trade', emoji: '📌', correctBin: 'b2' },
            { id: 's2', label: 'Nationwide chain store', emoji: '📌', correctBin: 'b1' }
          ],
          bins: [ { id: 'b0', label: 'Local', color: '#3b82f6' }, { id: 'b1', label: 'National', color: '#ef4444' }, { id: 'b2', label: 'Global', color: '#10b981' } ],
          hint: 'Small area / whole country / worldwide!', misconception: 'Local = neighborhood; national = across country; global = across borders.',
          workedExample: ['Vendor = local.', 'Chain = national.', 'Trade = global.'] },
        { type: 'subpart', question: 'Consumer rights:',
          parts: [
            { id: 'a', prompt: 'Consumers have the right to:', answer: 'fair price and quality', hint: 'Fair treatment!', misconception: 'Consumers can demand fair price, quality, and safety.' },
            { id: 'b', prompt: 'A market is a place for:', answer: 'buyers and sellers to exchange', hint: 'Exchange happens!', misconception: 'A market = where buyers and sellers exchange goods.' },
          ],
          hint: 'Know your rights!', misconception: 'Markets enable exchange; consumers have rights to fairness.',
          workedExample: ['Buyers + sellers.', 'Fair price + quality.'] },
        { type: 'subpart', question: 'Apply what you learned in Markets:', hint: 'Work through each part step by step.', misconception: 'Students often believe a market must be a physical place they can visit. They think if they cannot walk into a', parts: [
            { id: 'a', prompt: 'What are the three essential components that make a market?', answer: 'The three components are the buyer, the seller, and the exch', hint: 'Think: What is a Market? Buyers, Sellers, and Exchan', misconception: 'Students often believe a market must be a physical place they can visit. They think if they cannot walk into a', workedExample: ['First, ask the student to describe how they get a digital ga','Ask: Who made it? (Seller) and Who got it? (Buyer)','Point out that since money and products moved between them, '] },
            { id: 'b', prompt: 'Is a mobile app where you order groceries a market? Why or why not?', answer: 'Yes, it is a market because it functions as a mechanism wher', hint: 'Think: What is a Market? Buyers, Sellers, and Exchan', misconception: 'Students often believe a market must be a physical place they can visit. They think if they cannot walk into a', workedExample: ['First, ask the student to describe how they get a digital ga','Ask: Who made it? (Seller) and Who got it? (Buyer)','Point out that since money and products moved between them, '] },
            { id: 'c', prompt: 'If a farmer gives wheat to a neighbor in exchange for labor, is this a market transaction? Explain.', answer: 'Yes, it is a market transaction because there is an exchange', hint: 'Think: What is a Market? Buyers, Sellers, and Exchan', misconception: 'Students often believe a market must be a physical place they can visit. They think if they cannot walk into a', workedExample: ['First, ask the student to describe how they get a digital ga','Ask: Who made it? (Seller) and Who got it? (Buyer)','Point out that since money and products moved between them, '] },
            { id: 'd', prompt: 'How do the roles of the buyer and seller differ in a village vegetable market compared to a large online shopp', answer: 'The roles remain the same: the buyer seeks a product and the', hint: 'Think: What is a Market? Buyers, Sellers, and Exchan', misconception: 'Students often believe a market must be a physical place they can visit. They think if they cannot walk into a', workedExample: ['First, ask the student to describe how they get a digital ga','Ask: Who made it? (Seller) and Who got it? (Buyer)','Point out that since money and products moved between them, '] }
        ] },
    ],
    reflect: { prompts: ['How do supply and demand set prices?', 'Why does competition help consumers?'] },
    successLine: 'Markets mastered! 🛒', tryAgainLine: 'Scarce + wanted = expensive.',
};

export const c6GeoWeather: SimDef = {
    id: 'c6_geo_weather', title: 'Weather', subtitle: 'Temperature, rain, wind',
    classLevel: 6, subject: 'social', topic: 'Weather',
    chapters: ['Geography Ch2: Weather'],
    nodeIds: ['c6_geography_ch02_008','c6_geography_ch02_009','c6_geography_ch02_011','c6_geography_ch02_012'],
    emoji: '🌡️', theme: { bg: 'from-cyan-100 to-sky-200', accent: 'cyan', scene: 'weather' },
    scenario: { role: "a meteorologist", intro: "Weather is the day-to-day state of the air — temperature, rain, wind — and we measure it with instruments.", goal: "Understand weather and how we measure it." },
    discovery: {
        question: "Why do weather forecasters need to measure wind, rain, AND temperature — not just one?",
        options: ["Weather is all these together", "They only need temperature", "For fun"],
        answer: "Weather is all these together",
        hook: "Weather = temperature + rain + wind + humidity together — you need all the data!",
    },
    teaching: [
        { title: 'What is Weather and How It Differs Fro', text: 'Weather is the short-term state of the atmosphere at a specific time and place, while climate is the average pattern of weather conditions in a region observed  Imagine you are packing your school bag in the morning.', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Measuring Temperature: Thermometers an', text: 'A thermometer is a scientific instrument designed to measure the degree of hotness or coldness of the air, known as temperature. It operates on the physical pri Have you ever noticed how your mother checks if you have a fever by using a dev', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Rainfall: How We Measure Precipitation', text: 'Rainfall is a type of precipitation measured by an instrument called a rain gauge, which collects water in a funnel-topped cylinder to determine the depth of ra Have you ever noticed how the ground gets soaked during a monsoon shower in Ind', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Wind and Air Pressure: What Drives Wea', text: 'Wind is the movement of air across the Earth\'s surface, caused by differences in air pressure that force air to travel from high-pressure areas to low-pressure  Have you ever felt a sudden breeze when you open a window, or wondered why a fa', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Weather Instruments and How They Work', text: 'Weather instruments are specialized tools used by meteorologists to measure specific atmospheric conditions like heat, moisture, wind, and air pressure. These m Imagine you are planning a school picnic and you hear the weather reporter say', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Recording Weather: Keeping a Weather D', text: 'A weather diary is a personal, ongoing log used to record daily atmospheric observations, such as temperature, rainfall, wind, and cloud cover, to help identify Have you ever noticed that you need a sweater in the morning but feel hot by th', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Weather and Its Effect on Daily Life', text: 'Weather is the state of the atmosphere at a specific place and time, involving conditions like temperature, rainfall, and wind. It dictates our daily choices, s Think about the last time you decided what to wear to school—did you check if i', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { component: WeatherClimateSort, prompt: 'Make weather — control heat and watch rain form!' },
    challenges: [
        { type: 'sort', question: 'Match the instrument to what it measures:',
          sortItems: [
            { id: 's0', label: 'Thermometer', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Rain gauge', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'Anemometer', emoji: '📌', correctBin: 'b2' }
          ],
          bins: [ { id: 'b0', label: 'Temperature', color: '#3b82f6' }, { id: 'b1', label: 'Rainfall', color: '#ef4444' }, { id: 'b2', label: 'Wind', color: '#10b981' } ],
          hint: 'Heat / rain / wind!', misconception: 'Thermometer = heat; rain gauge = rainfall; anemometer = wind.',
          workedExample: ['Thermometer = temp.', 'Gauge = rain.', 'Anemometer = wind.'] },
        { type: 'mcq', question: 'Wind is caused by:', answer: 'air moving from high to low pressure', options: ['the sun only', 'air moving from high to low pressure', 'gravity'],
          hint: 'Air moves to equalize pressure!', misconception: 'Wind = air flowing from high-pressure to low-pressure areas.',
          workedExample: ['High pressure.', 'Low pressure.', 'Air moves between them.'] },
        { type: 'mcq', question: 'Weather is different from climate because weather:', answer: 'changes daily while climate is long-term', options: ['is permanent', 'changes daily while climate is long-term', 'is only about rain'],
          hint: 'Daily vs long-term!', misconception: 'Weather = daily conditions; climate = long-term pattern.',
          workedExample: ['Weather = today.', 'Climate = years.', 'Different timescales.'] },
        { type: 'subpart', question: 'Measuring weather:',
          parts: [
            { id: 'a', prompt: 'A thermometer measures:', answer: 'temperature', hint: 'Hot or cold!', misconception: 'A thermometer measures temperature (heat).' },
            { id: 'b', prompt: 'Why keep a weather diary?', answer: 'to record and spot weather patterns', hint: 'Track over time!', misconception: 'A weather diary records daily conditions to spot patterns.' },
          ],
          hint: 'Measure to understand!', misconception: 'Instruments measure weather; records reveal patterns.',
          workedExample: ['Thermometer = temp.', 'Diary = track patterns.'] },
        { type: 'subpart', question: 'Apply what you learned in Weather:', hint: 'Work through each part step by step.', misconception: 'Students often think climate is just what the weather is like without realizing the 30-year requirement. The', parts: [
            { id: 'a', prompt: 'What is the most important factor that distinguishes weather from climate?', answer: 'The factor is time', hint: 'Think: What is Weather and How It Differs From Clima', misconception: 'Students often think climate is just what the weather is like without realizing the 30-year requirement. The', workedExample: ['First, ask the student to define average. Second, explain th','Third, ask them to identify which one is better for predicti'] },
            { id: 'b', prompt: 'If a news reporter says, Today is very hot in Delhi, are they talking about weather or climate? Why?', answer: 'They are talking about weather because it refers to a specif', hint: 'Think: What is Weather and How It Differs From Clima', misconception: 'Students often think climate is just what the weather is like without realizing the 30-year requirement. The', workedExample: ['First, ask the student to define average. Second, explain th','Third, ask them to identify which one is better for predicti'] },
            { id: 'c', prompt: 'If someone says, Mumbai usually has a hot and humid climate, why is it incorrect to call this weather?', answer: 'It is incorrect because it describes a long-term pattern, no', hint: 'Think: What is Weather and How It Differs From Clima', misconception: 'Students often think climate is just what the weather is like without realizing the 30-year requirement. The', workedExample: ['First, ask the student to define average. Second, explain th','Third, ask them to identify which one is better for predicti'] },
            { id: 'd', prompt: 'Analyze this: Why can the weather change within a few hours, but the climate of a place remains mostly the sam', answer: 'Weather changes quickly because atmospheric conditions like', hint: 'Think: What is Weather and How It Differs From Clima', misconception: 'Students often think climate is just what the weather is like without realizing the 30-year requirement. The', workedExample: ['First, ask the student to define average. Second, explain th','Third, ask them to identify which one is better for predicti'] }
        ] },
    ],
    reflect: { prompts: ['Why do we measure weather every day?', 'How does air pressure create wind?'] },
    successLine: 'Weather understood! 🌡️', tryAgainLine: 'Weather = temp + rain + wind.',
};

export const c6GeoFarming: SimDef = {
    id: 'c6_geo_farming', title: 'Farming in India', subtitle: 'Crops & seasons',
    classLevel: 6, subject: 'social', topic: 'Agriculture',
    chapters: ['Geography Ch4: Farming'],
    nodeIds: ['c6_geography_ch04_020','c6_geography_ch04_021','c6_geography_ch04_023','c6_geography_ch04_025'],
    emoji: '🌾', theme: { bg: 'from-lime-100 to-green-200', accent: 'lime', scene: 'farming' },
    scenario: { role: "a young farmer", intro: "India feeds a billion people — through kharif and rabi seasons, wheat and rice, traditional and modern methods.", goal: "Understand Indian farming." },
    discovery: {
        question: "Why do farmers plant some crops in June and others in October?",
        options: ["Different crops need different seasons — kharif vs rabi", "Random choice", "To rest the soil"],
        answer: "Different crops need different seasons — kharif vs rabi",
        hook: "Kharif crops grow in monsoon (June); rabi crops grow in winter (Oct) — timing is everything!",
    },
    teaching: [
        { title: 'Early Beginnings of Farming in India', text: 'The beginning of farming in India refers to the period around 7000 BCE when early human societies in the northwest region transitioned from food-gathering to cu Think about your favorite meal—where do you think the rice or wheat on your pla', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Types of Farming: Subsistence vs Comme', text: 'Subsistence farming is an agricultural method where families grow food primarily to feed themselves, while commercial farming is a large-scale business activity Have you ever wondered why some farmers in your village have a small patch of l', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Major Crops of India: Wheat, Rice, Pul', text: 'Major crops in India are agricultural plants grown on a large scale to provide food for the population and raw materials for industry. These crops are categoriz Have you ever wondered why your lunch in Chennai might be rice-based while your', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Farming Seasons: Kharif and Rabi Expla', text: 'Farming seasons in India are distinct periods for growing crops, categorized into Kharif and Rabi based on when they are sown and their dependence on weather co Have you ever noticed why your favorite mangoes are available only in summer, o', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Modern Farming: Irrigation, Fertilizer', text: 'Modern farming is a scientifically advanced approach to agriculture that uses controlled irrigation, chemical fertilizers, high-yield seeds, and machines to ens Imagine you are a farmer whose entire crop depends on whether or not it rains t', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Challenges in Indian Farming and Susta', text: 'Indian farming faces significant hurdles today, including the depletion of groundwater, the loss of soil fertility due to chemicals, and the unpredictability of Have you ever wondered why your parents worry when the rains are late, even tho', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { component: TimelineBuilder, prompt: 'Farm the land — water your crops and watch them grow!' },
    challenges: [
        { type: 'sort', question: 'Kharif or Rabi crop?',
          sortItems: [
            { id: 's0', label: 'Rice (monsoon)', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Wheat (winter)', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'Cotton (monsoon)', emoji: '📌', correctBin: 'b0' }
          ],
          bins: [ { id: 'b0', label: 'Kharif', color: '#3b82f6' }, { id: 'b1', label: 'Rabi', color: '#ef4444' } ],
          hint: 'Monsoon = kharif; winter = rabi!', misconception: 'Kharif = monsoon crops (rice); rabi = winter crops (wheat).',
          workedExample: ['Rice, cotton = kharif.', 'Wheat = rabi.'] },
        { type: 'mcq', question: 'Subsistence farming means growing food:', answer: 'to feed your own family', options: ['to sell for profit', 'to feed your own family', 'for export'],
          hint: 'Family first!', misconception: 'Subsistence = grow for your family; commercial = grow to sell.',
          workedExample: ['Grow for family.', 'Not for sale.', 'Subsistence.'] },
        { type: 'mcq', question: 'Kharif crops are planted during:', answer: 'the monsoon season', options: ['winter', 'the monsoon season', 'summer only'],
          hint: 'When does rice get planted?', misconception: 'Kharif = monsoon crops planted around June.',
          workedExample: ['Monsoon = June.', 'Rice planted then.', 'Kharif.'] },
        { type: 'subpart', question: 'Modern farming:',
          parts: [
            { id: 'a', prompt: 'Irrigation provides:', answer: 'water to crops', hint: 'Water supply!', misconception: 'Irrigation supplies water to crops — vital where rain is scarce.' },
            { id: 'b', prompt: 'A challenge of modern farming is:', answer: 'overuse of water and chemicals', hint: 'Too much of a good thing!', misconception: 'Modern farming can overuse water/fertilizers — sustainability matters.' },
          ],
          hint: 'Water + chemicals need care!', misconception: 'Modern methods boost yield but risk overuse — balance is key.',
          workedExample: ['Irrigation = water.', 'Overuse = problem.'] },
        { type: 'subpart', question: 'Apply what you learned in Farming in India:', hint: 'Work through each part step by step.', misconception: 'Students often think agriculture appeared everywhere in India at the exact same time. They assume that because', parts: [
            { id: 'a', prompt: 'Around what year did agriculture begin in the northwest region of the Indian subcontinent?', answer: 'Agriculture began around 7000 BCE', hint: 'Think: Early Beginnings of Farming in India', misconception: 'Students often think agriculture appeared everywhere in India at the exact same time. They assume that because', workedExample: ['1','Ask the student to look at a timeline and point to 7000 BCE ','2'] },
            { id: 'b', prompt: 'Why did early farmers prefer to settle near rivers like the Indus, Sarasvatī, and Ganga?', answer: 'They settled there because the rivers provided fertile soil', hint: 'Think: Early Beginnings of Farming in India', misconception: 'Students often think agriculture appeared everywhere in India at the exact same time. They assume that because', workedExample: ['1','Ask the student to look at a timeline and point to 7000 BCE ','2'] },
            { id: 'c', prompt: 'If you were a farmer in the northwest region around 6000 BCE, what animals would you likely have kept?', answer: 'You would have kept cattle, sheep, and goats', hint: 'Think: Early Beginnings of Farming in India', misconception: 'Students often think agriculture appeared everywhere in India at the exact same time. They assume that because', workedExample: ['1','Ask the student to look at a timeline and point to 7000 BCE ','2'] },
            { id: 'd', prompt: 'How did the discovery of rice cultivation in the Ganga region differ from the early wheat farming in the north', answer: 'It happened later, around 5000 BCE, and occurred in a differ', hint: 'Think: Early Beginnings of Farming in India', misconception: 'Students often think agriculture appeared everywhere in India at the exact same time. They assume that because', workedExample: ['1','Ask the student to look at a timeline and point to 7000 BCE ','2'] }
        ] },
    ],
    reflect: { prompts: ['Why are there two crop seasons in India?', 'How does farming feed the whole country?'] },
    successLine: 'Farming understood! 🌾', tryAgainLine: 'Kharif = monsoon; rabi = winter.',
};

export const c6GeoNeighbours: SimDef = {
    id: 'c6_geo_neighbours', title: 'India\'s Neighbours', subtitle: 'Borders & relations',
    classLevel: 6, subject: 'social', topic: 'India\'s Neighbours',
    chapters: ['Geography Ch5: Neighbours'],
    nodeIds: ['c6_geography_ch05_026','c6_geography_ch05_028','c6_geography_ch05_029','c6_geography_ch05_031'],
    emoji: '🗺️', theme: { bg: 'from-teal-100 to-emerald-200', accent: 'teal', scene: 'neighbours' },
    scenario: { role: "a young diplomat", intro: "India shares borders with Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar — and seas with Sri Lanka and Maldives.", goal: "Map India's neighbours." },
    discovery: {
        question: "Why does India's location — between mountains and ocean — make it strategically important?",
        options: ["It controls key land and sea trade routes", "It\'s isolated", "No reason"],
        answer: "It controls key land and sea trade routes",
        hook: "India sits at the heart of South Asia — its location links land routes and ocean trade!",
    },
    teaching: [
        { title: 'Who Are India\'s Neighbours? A Map Over', text: 'Indias neighbours are the countries that share land borders with India, located in South Asia, along with island nations situated in the nearby Indian Ocean. T If you were to invite all your friends to a party, you would start by looking a', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Shared Borders: Pakistan, China, Nepal', text: 'Indias land borders are the imaginary lines marking the extent of our country\'s territory where it meets the land of neighboring nations. These borders stretch Imagine you are standing on a giant map of India; if you started walking from t', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Cultural Links With Neighbouring Count', text: 'Cultural links with neighbouring countries refer to the shared historical, religious, and traditional ties that connect India with its immediate neighbours, suc Have you ever visited a friend\'s house and realized you share the same favorite', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Trade and Economic Relations With Neig', text: 'Trade and economic relations refer to the exchange of goods, resources, and services between India and its neighbouring countries to support mutual economic dev Have you ever traded your extra pens for a friend\'s eraser during class? Nation', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'India\'s Maritime Neighbours: Sri Lanka', text: 'Indias maritime neighbours are sovereign island nations located in the Indian Ocean that share a sea border with India. Sri Lanka and the Maldives are our prim Imagine you are standing on the southern tip of India looking out at the vast I', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Geopolitical Significance of India\'s L', text: 'Indias geopolitical significance refers to the strategic advantage its location provides, allowing it to influence global trade and maritime movement due to it Imagine you are playing a board game where you hold the center square.', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { component: NeighbourMap, prompt: 'Place each neighbour on the map — north, east, west, island!' },
    challenges: [
        { type: 'sort', question: 'Land border or maritime neighbour?',
          sortItems: [
            { id: 's0', label: 'Pakistan', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Sri Lanka', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'China', emoji: '📌', correctBin: 'b0' },
            { id: 's3', label: 'Maldives', emoji: '📌', correctBin: 'b1' },
            { id: 's4', label: 'Nepal', emoji: '📌', correctBin: 'b0' }
          ],
          bins: [ { id: 'b0', label: 'Land border', color: '#3b82f6' }, { id: 'b1', label: 'Maritime', color: '#ef4444' } ],
          hint: 'Shares land / across the sea!', misconception: 'Pakistan, China, Nepal = land borders; Sri Lanka, Maldives = maritime.',
          workedExample: ['Land: Pakistan, China, Nepal.', 'Sea: Sri Lanka, Maldives.'] },
        { type: 'mcq', question: 'Which is NOT a land neighbour of India?', answer: 'Maldives', options: ['Nepal', 'Maldives', 'Bangladesh'],
          hint: 'One is an island nation!', misconception: 'Maldives is a maritime (sea) neighbour, not a land border.',
          workedExample: ['Nepal, Bangladesh = land.', 'Maldives = island.', 'Maritime.'] },
        { type: 'mcq', question: 'India\'s location is strategically important because it:', answer: 'links land routes and controls sea lanes', options: ['is isolated', 'links land routes and controls sea lanes', 'has no neighbours'],
          hint: 'Between mountains and ocean!', misconception: 'India links land routes and controls Indian Ocean sea lanes.',
          workedExample: ['Land routes north.', 'Sea lanes south.', 'Strategic position.'] },
        { type: 'subpart', question: 'India\'s neighbours:',
          parts: [
            { id: 'a', prompt: 'Which neighbour shares a land border AND strong cultural ties?', answer: 'Nepal', hint: 'Himalayan neighbour!', misconception: 'Nepal shares a land border and deep cultural/religious ties.' },
            { id: 'b', prompt: 'Trade with neighbours:', answer: 'boosts both economies', hint: 'Trade = mutual benefit!', misconception: 'Cross-border trade benefits both India and its neighbours.' },
          ],
          hint: 'Borders + culture + trade!', misconception: 'Neighbours share borders, culture, and trade.',
          workedExample: ['Nepal = land + culture.', 'Trade = mutual gain.'] },
        { type: 'subpart', question: 'Apply what you learned in India:', hint: 'Work through each part step by step.', misconception: 'Students often confuse the placement of the Seven Sisters states in the Northeast with the borders of Myanma', parts: [
            { id: 'a', prompt: 'Name the two countries that share a border with India to the North.', answer: 'The two countries are China and Nepal', hint: 'Think: Who Are India\'s Neighbours? A Map Overview', misconception: 'Students often confuse the placement of the Seven Sisters states in the Northeast with the borders of Myanma', workedExample: ['First, have the student trace the outline of India with thei','Then, ask them to place a dot for each neighbour, starting f','Say: Imagine you are drawing a circle around India; put a st'] },
            { id: 'b', prompt: 'Explain why Sri Lanka is described as an island neighbour rather than a land neighbour.', answer: 'Sri Lanka is an island neighbour because it is separated fro', hint: 'Think: Who Are India\'s Neighbours? A Map Overview', misconception: 'Students often confuse the placement of the Seven Sisters states in the Northeast with the borders of Myanma', workedExample: ['First, have the student trace the outline of India with thei','Then, ask them to place a dot for each neighbour, starting f','Say: Imagine you are drawing a circle around India; put a st'] },
            { id: 'c', prompt: 'You would encounter Pakistan. If a student says China or Bangladesh, they are confusing the cardinal direction', answer: '**Correct Answer:** If you are traveling from the westernmos', hint: 'Think: Who Are India\'s Neighbours? A Map Overview', misconception: 'Students often confuse the placement of the Seven Sisters states in the Northeast with the borders of Myanma', workedExample: ['First, have the student trace the outline of India with thei','Then, ask them to place a dot for each neighbour, starting f','Say: Imagine you are drawing a circle around India; put a st'] },
            { id: 'd', prompt: 'Compare the location of Bangladesh to that of Bhutan; how do their positions relative to India differ?', answer: 'Bangladesh is located to the northeast and shares a long bor', hint: 'Think: Who Are India\'s Neighbours? A Map Overview', misconception: 'Students often confuse the placement of the Seven Sisters states in the Northeast with the borders of Myanma', workedExample: ['First, have the student trace the outline of India with thei','Then, ask them to place a dot for each neighbour, starting f','Say: Imagine you are drawing a circle around India; put a st'] }
        ] },
    ],
    reflect: { prompts: ['How do shared borders shape relationships?', 'Why is India\'s location strategically vital?'] },
    successLine: 'Neighbours mapped! 🗺️', tryAgainLine: 'Land borders + maritime neighbours.',
};

export const c6HistPostIndep: SimDef = {
    id: 'c6_hist_postindep', title: 'Building the Nation', subtitle: 'After 1947',
    classLevel: 6, subject: 'social', topic: 'Post-Independence India',
    chapters: ['History Ch12: Post-Independence'],
    nodeIds: ['c6_history_ch12_051'],
    emoji: '🇮🇳', theme: { bg: 'from-orange-100 to-green-200', accent: 'orange', scene: 'postindep' },
    scenario: { role: "a nation-builder", intro: "After freedom in 1947, India faced huge tasks — writing a constitution, uniting princely states, and building a modern nation.", goal: "Understand how modern India was built." },
    discovery: {
        question: "After independence, India had 500+ separate princely states. How did it become ONE nation?",
        options: ["Leaders persuaded and integrated them into India", "They all stayed separate", "Another war"],
        answer: "Leaders persuaded and integrated them into India",
        hook: "Sardar Patel integrated 500+ princely states into one India — a political marvel!",
    },
    teaching: [
        { title: 'The Making of the Constitution', text: 'The Constitution is the fundamental rulebook of a country that defines how the government works and guarantees the basic rights of its citizens. The Indian Cons Imagine you are starting a new sports club with fifty friends, but you have no', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Integration of Princely States', text: 'The integration of princely states was the political process of bringing over 500 autonomous territories, previously ruled by local monarchs under British contr Imagine you are building a large puzzle, but 500 of the pieces are acting like', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Economic Planning and Development', text: 'Economic planning is the process where the government creates a structured strategy to manage national resources and solve major problems like poverty and food  Imagine you are planning a long family vacation: you need a budget, a list of p', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'The Era of Nehru', text: 'The Nehru Era refers to the period from 1947 to 1964 when Jawaharlal Nehru served as Indias first Prime Minister, establishing the foundations of the nation\'s  Imagine you are asked to build a new house for a large family that has just mov', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Wars and Challenges', text: 'Wars and Challenges refers to the series of major international military conflicts and national pressures India faced shortly after gaining independence in 19 If your school had to suddenly build a new fence and hire security because of p', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'India Today: Achievements and Challeng', text: 'India today is a democratic nation that has evolved from its ancient roots into a modern, technologically advancing society known for significant scientific mil Have you ever wondered how a country that was known as \'Jambudvīpa\' or \'Bhārata', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { component: PreambleBuilder, prompt: 'Match the leader to their role in building India!' },
    challenges: [
        { type: 'sort', question: 'Match the leader to their contribution:',
          sortItems: [
            { id: 's0', label: 'Dr. B.R. Ambedkar', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Sardar Patel', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'Jawaharlal Nehru', emoji: '📌', correctBin: 'b2' }
          ],
          bins: [ { id: 'b0', label: 'Wrote the Constitution', color: '#3b82f6' }, { id: 'b1', label: 'United the states', color: '#ef4444' }, { id: 'b2', label: 'First Prime Minister', color: '#10b981' } ],
          hint: 'Constitution / unification / PM!', misconception: 'Ambedkar = constitution; Patel = united states; Nehru = first PM.',
          workedExample: ['Ambedkar → constitution.', 'Patel → unification.', 'Nehru → first PM.'] },
        { type: 'mcq', question: 'India\'s Constitution was adopted in:', answer: '1950', options: ['1947', '1950', '1962'],
          hint: 'Three years after independence!', misconception: 'The Constitution was adopted on 26 January 1950 — Republic Day.',
          workedExample: ['Independence 1947.', 'Constitution 1950.', 'Republic Day.'] },
        { type: 'mcq', question: 'Sardar Patel is called the "Iron Man" because he:', answer: 'united 500+ princely states into India', options: ['built dams', 'united 500+ princely states into India', 'fought wars'],
          hint: 'One India from many states!', misconception: 'Patel integrated 500+ princely states — hence "Iron Man".',
          workedExample: ['500+ states.', 'Integrated into India.', 'Iron Man.'] },
        { type: 'subpart', question: 'Post-independence challenges:',
          parts: [
            { id: 'a', prompt: 'Five-Year Plans were for:', answer: 'planned economic development', hint: 'Building the economy!', misconception: 'Five-Year Plans guided industrial and economic growth.' },
            { id: 'b', prompt: 'Nehru promoted:', answer: 'science and non-alignment', hint: 'Modern + neutral!', misconception: 'Nehru built institutions and championed non-alignment.' },
          ],
          hint: 'Build economy + institutions!', misconception: 'Plans grew the economy; Nehru built institutions.',
          workedExample: ['Plans = economy.', 'Nehru = institutions.'] },
        { type: 'subpart', question: 'Apply what you learned in Building the Nation:', hint: 'Work through each part step by step.', misconception: 'Students often think the Constitution was written by a single person, like Dr. B.R. Ambedkar, acting alone. Th', parts: [
            { id: 'a', prompt: 'Who was the chairman of the Drafting Committee responsible for preparing the Constitution?', answer: 'The chairman was Dr', hint: 'Think: The Making of the Constitution', misconception: 'Students often think the Constitution was written by a single person, like Dr. B.R. Ambedkar, acting alone. Th', workedExample: ['If the student thinks one person wrote the Constitution, ask','Tell them: Dr','Ambedkar led the drafting, but he did it for the whole Assem'] },
            { id: 'b', prompt: 'Why did India need a Constitution immediately after becoming independent?', answer: 'India needed a Constitution to set up a stable government st', hint: 'Think: The Making of the Constitution', misconception: 'Students often think the Constitution was written by a single person, like Dr. B.R. Ambedkar, acting alone. Th', workedExample: ['If the student thinks one person wrote the Constitution, ask','Tell them: Dr','Ambedkar led the drafting, but he did it for the whole Assem'] },
            { id: 'c', prompt: 'If you were part of the Constituent Assembly, why would it be important to have members from different regions', answer: 'Steps: 1', hint: 'Think: The Making of the Constitution', misconception: 'Students often think the Constitution was written by a single person, like Dr. B.R. Ambedkar, acting alone. Th', workedExample: ['If the student thinks one person wrote the Constitution, ask','Tell them: Dr','Ambedkar led the drafting, but he did it for the whole Assem'] },
            { id: 'd', prompt: 'How did the number of members in the Constituent Assembly change from 1946 to the final drafting period?', answer: 'The number dropped from 389 to 299 due to the partition of I', hint: 'Think: The Making of the Constitution', misconception: 'Students often think the Constitution was written by a single person, like Dr. B.R. Ambedkar, acting alone. Th', workedExample: ['If the student thinks one person wrote the Constitution, ask','Tell them: Dr','Ambedkar led the drafting, but he did it for the whole Assem'] }
        ] },
    ],
    reflect: { prompts: ['Why was uniting 500+ states such a big achievement?', 'How did the Constitution shape modern India?'] },
    successLine: 'Nation-building understood! 🇮🇳', tryAgainLine: 'Constitution + unity = modern India.',
};

export const c6CivEconomy: SimDef = {
    id: 'c6_civ_economy', title: 'Economy & Work', subtitle: 'Activities, workers, government',
    classLevel: 6, subject: 'social', topic: 'Economic Activities',
    chapters: ['Civics Ch16: Economy'],
    nodeIds: [],
    emoji: '💼', theme: { bg: 'from-indigo-100 to-blue-200', accent: 'indigo', scene: 'economy' },
    scenario: { role: "a young economist", intro: "People work to earn a living — economic activities produce goods and services, and workers have rights.", goal: "Understand economic activities and workers' rights." },
    discovery: {
        question: "A farmer, a teacher, and a shopkeeper all work — what do they have in common?",
        options: ["They all do economic activities that produce value", "Nothing", "They all sell goods"],
        answer: "They all do economic activities that produce value",
        hook: "All work that produces goods or services is an economic activity — farming, teaching, selling!",
    },
    teaching: [
        { title: 'Understanding Economic Activities', text: 'Economic activities are actions performed by individuals to earn money or acquire goods and services of monetary value, such as working for a salary or selling  Think about your morning: did you see a shopkeeper opening their store or a par', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Rights of Workers and Consumers', text: 'Workers\' rights are basic protections that ensure people are treated fairly and safely in their jobs, while consumer rights protect buyers from being cheated or Imagine you are at a shop buying a packet of biscuits, but the shopkeeper sells', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Government\'s Role in the Economy', text: 'The governments role in the economy involves providing essential public services, setting rules to ensure fairness, and redistributing resources to reduce ineq Imagine walking to school on a clean, paved road, passing by a public hospital,', emoji: '💡', bgColor: 'from-emerald-400 to-teal-500' }
    ],
    explore: { component: EconomyRoleSorter, prompt: 'Sort jobs into primary, secondary, tertiary sectors!' },
    challenges: [
        { type: 'sort', question: 'Sort the work into its sector:',
          sortItems: [
            { id: 's0', label: 'Farming', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Factory worker', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'Teacher', emoji: '📌', correctBin: 'b2' },
            { id: 's3', label: 'Mining', emoji: '📌', correctBin: 'b0' }
          ],
          bins: [ { id: 'b0', label: 'Primary', color: '#3b82f6' }, { id: 'b1', label: 'Secondary', color: '#ef4444' }, { id: 'b2', label: 'Tertiary', color: '#10b981' } ],
          hint: 'Raw / make / serve!', misconception: 'Primary = raw materials (farm/mine); secondary = making goods (factory); tertiary = services (teacher).',
          workedExample: ['Farm, mine = primary.', 'Factory = secondary.', 'Teacher = tertiary.'] },
        { type: 'mcq', question: 'Workers have the right to:', answer: 'fair wages and safe conditions', options: ['work for free', 'fair wages and safe conditions', 'work any hours'],
          hint: 'Fair treatment!', misconception: 'Workers have rights to fair wages, safe conditions, and reasonable hours.',
          workedExample: ['Fair wages.', 'Safe conditions.', 'Worker rights.'] },
        { type: 'mcq', question: 'A teacher\'s job is in which sector?', answer: 'tertiary (services)', options: ['primary', 'tertiary (services)', 'secondary'],
          hint: 'Teaching is a service!', misconception: 'Services like teaching and banking are tertiary; farming is primary; factories are secondary.',
          workedExample: ['Teaching = service.', 'Service = tertiary.'] },
        { type: 'subpart', question: 'The government in the economy:',
          parts: [
            { id: 'a', prompt: 'The government protects workers by:', answer: 'making labour laws', hint: 'Rules for fairness!', misconception: 'Government makes labour laws protecting workers\' rights.' },
            { id: 'b', prompt: 'Consumers are protected by:', answer: 'consumer rights and fair trade rules', hint: 'Fair buying!', misconception: 'Consumers have rights to fair prices, quality, and safety.' },
          ],
          hint: 'Government sets the rules!', misconception: 'Government protects both workers (labour laws) and consumers (fair trade).',
          workedExample: ['Labour laws protect workers.', 'Consumer rights protect buyers.'] },
        { type: 'subpart', question: 'Apply what you learned in Economy & Work:', hint: 'Work through each part step by step.', misconception: 'Students often think that working hard or being busy automatically makes an activity economic. They might', parts: [
            { id: 'a', prompt: 'What is the primary difference between an economic activity and a non-economic activity?', answer: 'Economic activities are done for money or monetary value, wh', hint: 'Think: Understanding Economic Activities', misconception: 'Students often think that working hard or being busy automatically makes an activity economic. They might', workedExample: ['Ask the student: Who paid you money for this task? If the an','Use the example of a professional cleaner versus a family me'] },
            { id: 'b', prompt: 'If your neighbor spends their weekend painting your house for free because they are your friend, is this an ec', answer: 'No, it is a non-economic activity because it is performed ou', hint: 'Think: Understanding Economic Activities', misconception: 'Students often think that working hard or being busy automatically makes an activity economic. They might', workedExample: ['Ask the student: Who paid you money for this task? If the an','Use the example of a professional cleaner versus a family me'] },
            { id: 'c', prompt: 'A tailor stitches a school uniform and charges ₹200 for it. Identify the type of activity and explain the val', answer: 'This is an economic activity', hint: 'Think: Understanding Economic Activities', misconception: 'Students often think that working hard or being busy automatically makes an activity economic. They might', workedExample: ['Ask the student: Who paid you money for this task? If the an','Use the example of a professional cleaner versus a family me'] },
            { id: 'd', prompt: 'Compare a doctor treating a patient in a private clinic versus a doctor volunteering at a free health camp. Ho', answer: 'The first is an economic activity (earning a fee), while the', hint: 'Think: Understanding Economic Activities', misconception: 'Students often think that working hard or being busy automatically makes an activity economic. They might', workedExample: ['Ask the student: Who paid you money for this task? If the an','Use the example of a professional cleaner versus a family me'] }
        ] },
    ],
    reflect: { prompts: ['Why do we divide work into three sectors?', 'How do worker and consumer rights create fairness?'] },
    successLine: 'Economy understood! 💼', tryAgainLine: 'Primary = raw, secondary = make, tertiary = serve.',
};

export const c6SocialSims = [
    c6CivRights, c6CivGovernment, c6EcoMoney, c6GeoIndia, c6GeoClimate,
    c6HistHarappan, c6HistEmpires, c6HistFreedom,
    c6HistMedieval, c6CivBudget, c6CivDiversity, c6CivMedia,
    c6EcoInfra, c6EcoBanking, c6EcoMarket, c6GeoWeather, c6GeoFarming,
    c6GeoNeighbours, c6HistPostIndep, c6CivEconomy,
];
