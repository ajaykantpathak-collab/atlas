import type { SimDef } from '../../engine/types';
import C6_HistoryCivicsHistoryMeaningDefinitionSim from '../../../simulations/c6_12/C6_HistoryCivicsHistoryMeaningDefinitionSim';

/** v3 wrapped master — C6_HistoryCivicsHistoryMeaningDefinitionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_historycivicshistorymeaningdefinitionsim: SimDef = {
    id: 'v3w_c6_historycivicshistorymeaningdefinitionsim',
    title: 'History Meaning Definition',
    subtitle: 'This node covers the fundamental definition and the inherent nature of human rights.',
    classLevel: 6, subject: 'history', topic: 'What Are Human Rights?',
    chapters: [],
    nodeIds: ['c6_civics_ch10_006', 'c6_civics_ch10_002', 'c6_civics_ch10_003', 'c6_civics_ch11_011', 'c6_history_ch06_016', 'c6_civics_ch10_004', 'c6_civics_ch10_007', 'c6_history_ch06_015', 'c6_history_ch06_019', 'c6_civics_ch11_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine you are playing a game where the rules are not written on a paper, but are understood by everyone.', goal: 'Master History Meaning Definition.' },
    discovery: {
        question: 'Which of these is a human right: the right to own a luxury car or the right to education? Why?',
        options: ['The right to education is a human right', 'Human Rights', 'Government Privileges'],
        answer: 'The right to education is a human right',
        hook: 'Students often confuse "Human Rights" with "Government Privileges." They assume that because a government provides.',
    },
    teaching: [
        { title: 'Human rights are the essential freedoms and.', text: 'Human rights are the essential freedoms and protections that every person possesses simply by being human, regardless of their nationality, status, or background.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_civics_ch10_001', title: 'Human rights are the essential freedoms.',
          caseStudy: { intro: 'Imagine you are playing a game where the rules are not written on a paper, but are understood by everyone just because they are playing.',
            decisions: [{ prompt: 'What does it mean to say that human rights are "inherent"?', options: [
                { text: 'It means these rights exist naturally from birth and are not given by any government', outcome: 'It means these rights exist naturally from birth and are not given by any government.' },
                { text: 'Human Rights', outcome: 'Not quite — Students often confuse "Human Rights" with "Government Privileges." They assume that because a.', reveals: 'students-often-confuse-human-rights' },
                { text: 'Government Privileges', outcome: 'Not quite — Students often confuse "Human Rights" with "Government Privileges." They assume that because a.', reveals: 'students-often-confuse-human-rights' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch10_002', title: 'Fundamental Rights are a set of basic.',
          caseStudy: { intro: 'Imagine you are at school and the teacher tells you that only students wearing blue shoes can sit on the chairs, while everyone else must sit on the floor.',
            decisions: [{ prompt: 'What is the primary purpose of having Fundamental Rights in our Constitution?', options: [
                { text: 'They are meant to guarantee basic freedom and equality to all citizens and protect them', outcome: 'They are meant to guarantee basic freedom and equality to all citizens and protect them from unfair.' },
                { text: 'they are rules to tell us what to do', outcome: 'Not quite — Students often think Fundamental Rights are absolute, meaning they can do "anything they want.".', reveals: 'fundamental-rights-are-absolute' },
                { text: 'anything they want', outcome: 'Not quite — Students often think Fundamental Rights are absolute, meaning they can do "anything they want.".', reveals: 'fundamental-rights-are-absolute' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_civics_ch10_003', title: 'Right to Equality is a Fundamental.',
          scaffold: { problem: 'A landlord refuses to rent a house to a family because they are from a specific region (place of birth). Is this legal?',
            steps: [
            { text: 'Identify the reason for refusal (place of birth).' },
            { text: 'Refer to the Right to Equality definition (no discrimination based on place of birth).' },
            { text: 'Compare the landlord\'s action to the rule.' },
            { text: 'Conclude if the action is illegal based on the principle.', faded: true, blankAnswer: 'No, it is not legal because it violates the Right to.' }
            ] } },
        { type: 'case', nodeId: 'c6_civics_ch11_011', title: 'Democracy is a system of government.',
          caseStudy: { intro: 'Imagine your entire school had to decide on the color of the new uniform.',
            decisions: [{ prompt: 'What does the term \'democracy\' mean, and which two Greek words does it come from?', options: [
                { text: 'Democracy means \'people\'s power\' or \'rule by the people.\' It comes from the Greek words', outcome: 'Democracy means \'people\'s power\' or \'rule by the people.\' It comes from the Greek words \'demos\'.' },
                { text: 'democracy is ONLY about the day they vote in an election', outcome: 'Not quite — Students often think democracy is ONLY about the day they vote in an election.', reveals: 'democracy-is-only-about-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_civics_ch15_038', title: 'Being a critical media consumer means.',
          scaffold: { problem: 'You see a post on social media saying "The government is changing the school syllabus tomorrow." How do you verify this?',
            steps: [
            { text: 'Search for the information on the official website of the Ministry of Education.' },
            { text: 'Check if major, trusted newspapers are reporting the same news.' },
            { text: 'Look for an official document or circular number mentioned in the post.' },
            { text: 'Compare the dates to ensure the news is current and not from years ago.', faded: true, blankAnswer: 'If no official website or major newspaper confirms it, the.' }
            ] } },
        { type: 'case', nodeId: 'c6_history_ch06_016', title: 'The Bhakti Movement was a religious and.',
          caseStudy: { intro: 'Have you ever felt that trying to talk to someone through a messenger or by following 10 different rules is much harder than just walking up to them and.',
            decisions: [{ prompt: 'What is the main meaning of the word "Bhakti"?', options: [
                { text: 'Bhakti means "devotion" or an intense, loving surrender to God', outcome: 'Bhakti means "devotion" or an intense, loving surrender to God.' },
                { text: 'Bhakti', outcome: 'Not quite — Students often think "Bhakti" is just a new type of ritual. They struggle to understand that it is.', reveals: 'bhakti-is-just-a-new' },
                { text: '"Bhakti" is just a new type of ritual', outcome: 'Not quite — Students often think "Bhakti" is just a new type of ritual. They struggle to understand that it is.', reveals: 'bhakti-is-just-a-new' }
            ] }] } }
    ],
    explore: { component: C6_HistoryCivicsHistoryMeaningDefinitionSim, prompt: 'Explore the interactive — History Meaning Definition' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_civics_ch10_001', difficulty: 'standard',
          question: 'Human rights are the essential freedoms and protections that every person.',
          hint: 'Review the roles and responsibilities section in Chapter 9 to see how we care for each.',
          misconception: 'Students often confuse "Human Rights" with "Government Privileges." They assume that because a government provides.',
          parts: [
                { id: 'a', prompt: 'Which of these is a human right: the right to own a luxury car or the right to education? Why?', answer: 'The right to education is a human right',
                  options: ['The right to education is a human right', 'Human Rights', 'Government Privileges'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "Human Rights" with "Government Privileges." They assume that because a government provides schools or laws, the.' }
          ],
            remediations: { 'students-often-confuse-human-rights': { steps: ['Ask the student: "If a government were to disappear tomorrow, would you still be a human?" When they say "Yes," ask,.'] } } },
        { type: 'subpart', nodeId: 'c6_civics_ch10_002', difficulty: 'standard',
          question: 'Fundamental Rights are a set of basic guarantees provided by the Indian.',
          hint: 'Review the basic idea of "Governance" and why we need rules for a fair society.',
          misconception: 'Students often think Fundamental Rights are absolute, meaning they can do "anything they want." They fail to understand.',
          parts: [
                { id: 'a', prompt: 'If a person is denied entry to a park because of their religion, which Fundamental Right is being violated?', answer: 'The Right to Equality',
                  options: ['The Right to Equality', 'prohibition of discrimination', 'anything they want'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Fundamental Rights are absolute, meaning they can do "anything they want." They fail to understand that these rights.' },
                { id: 'b', prompt: 'Why are Fundamental Rights called "enforceable by law" compared to other rules in school or home?', answer: 'They are enforceable',
                  options: ['They are enforceable', 'anything they want', 'Fundamental Rights are absolute, meaning they can do "anything they want'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Fundamental Rights are absolute, meaning they can do "anything they want." They fail to understand that these rights.' }
          ],
            remediations: { 'fundamental-rights-are-absolute': { steps: ['Explain that a right is a two-way street: your right to move freely ends where another person\'s right to safety begins.', 'Ask the student: "If you have the right to play music, do you have the right to play it at 3 AM at maximum volume?" 3.', 'Help them identify that the law balances rights so that everyone can enjoy them equally.'] } } },
        { type: 'subpart', nodeId: 'c6_civics_ch10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Fundamental Rights are absolute, meaning they can do "anything they want." They fail to understand.',
          parts: [
                { id: 'a', prompt: 'Why are Fundamental Rights called "enforceable by law" compared to other rules in school or home?', answer: 'They are enforceable',
                  options: ['They are enforceable', 'anything they want', 'Fundamental Rights are absolute, meaning they can do "anything they want'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Fundamental Rights are absolute, meaning they can do "anything they want." They fail to understand that these rights.' }
          ],
            remediations: { 'fundamental-rights-are-absolute': { steps: ['Explain that a right is a two-way street: your right to move freely ends where another person\'s right to safety begins.', 'Ask the student: "If you have the right to play music, do you have the right to play it at 3 AM at maximum volume?" 3.', 'Help them identify that the law balances rights so that everyone can enjoy them equally.'] } } },
        { type: 'subpart', nodeId: 'c6_civics_ch10_003', difficulty: 'standard',
          question: 'Right to Equality is a Fundamental Right ensuring that all citizens are treated.',
          hint: 'Review the concept of "Rule of Law" to understand why laws must be universal.',
          misconception: 'Students often confuse "equality" with "sameness" in every aspect of life, such as thinking everyone must have the.',
          parts: [
                { id: 'a', prompt: 'What are the five grounds upon which the Right to Equality prohibits discrimination?', answer: 'The five grounds are religion, race, caste, sex, and place of birth',
                  options: ['The five grounds are religion, race, caste, sex, and place of birth', 'discrimination', 'equality'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "equality" with "sameness" in every aspect of life, such as thinking everyone must have the exact same amount of.' },
                { id: 'b', prompt: 'If a school denies a student admission specifically because of their caste, why is this a violation of the Right to Equality?', answer: 'It violates the right',
                  options: ['It violates the right', 'equality', 'sameness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "equality" with "sameness" in every aspect of life, such as thinking everyone must have the exact same amount of.' },
                { id: 'c', prompt: 'A movie theater manager decides to charge people different ticket prices based on their religion. Is this allowed under the Right to Equality?', answer: 'No, it is not allowed',
                  options: ['No, it is not allowed', 'fairness', 'business choice'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "equality" with "sameness" in every aspect of life, such as thinking everyone must have the exact same amount of.' }
          ],
            remediations: { 'students-often-confuse-equality-with': { steps: ['If a student struggles, ask them to imagine a school race.', 'Explain that equality means everyone starts at the same line (equal rules), but it doesn\'t mean everyone must finish at.', 'Use this analogy to separate "equal treatment by the law" from "everyone is the same person."'] } } },
        { type: 'subpart', nodeId: 'c6_civics_ch10_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "equality" with "sameness" in every aspect of life, such as thinking everyone must have the.',
          parts: [
                { id: 'a', prompt: 'Should a judge be allowed to give a lighter punishment to a wealthy person than to a poor person for the same crime? Why or why not?', answer: 'No, because the Right to Equality dictates that no one is above or below the law',
                  options: ['No, because the Right to Equality dictates that no one is above or below the law', 'human value', 'equality', 'sameness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "equality" with "sameness" in every aspect of life, such as thinking everyone must have the exact same amount of.' },
                { id: 'b', prompt: 'Create a scenario where a person is being discriminated against based on "place of birth." How would you use the Right to Equality to defend them?', answer: 'A good answer would involve someone being denied a job',
                  options: ['A good answer would involve someone being denied a job', 'equality', 'sameness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "equality" with "sameness" in every aspect of life, such as thinking everyone must have the exact same amount of.' }
          ],
            remediations: { 'students-often-confuse-equality-with': { steps: ['If a student struggles, ask them to imagine a school race.', 'Explain that equality means everyone starts at the same line (equal rules), but it doesn\'t mean everyone must finish at.', 'Use this analogy to separate "equal treatment by the law" from "everyone is the same person."'] } } },
        { type: 'subpart', nodeId: 'c6_civics_ch11_011', difficulty: 'standard',
          question: 'Democracy is a system of government where the power to rule resides with the.',
          hint: 'Review the \'Introduction\' section of the NCERT text regarding why society needs rules.',
          misconception: 'Students often think democracy is ONLY about the day they vote in an election.',
          parts: [
                { id: 'a', prompt: 'Why is India called a \'representative democracy\' instead of a place where every citizen votes on every single law directly?', answer: 'India is a representative democracy',
                  options: ['India is a representative democracy', 'democracy is ONLY about the day they vote in an election'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think democracy is ONLY about the day they vote in an election.' }
          ],
            remediations: { 'democracy-is-only-about-the': { steps: ['First, ask the student to define \'representative\' as someone who carries a message for someone else.', 'Second, explain that if a messenger stops listening to the person who sent them, they are no longer a good.', 'Third, use the school monitor analogy to show that the monitor\'s job is to talk to teachers *on behalf of* the class.'] } } },
        { type: 'subpart', nodeId: 'c6_civics_ch11_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think democracy is ONLY about the day they vote in an election.',
          parts: [
                { id: 'a', prompt: 'Is it democratic for an elected representative to ignore the needs of the people who voted for them? Justify your answer.', answer: 'No, it is not truly democratic',
                  options: ['No, it is not truly democratic', 'democracy is ONLY about the day they vote in an election'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think democracy is ONLY about the day they vote in an election.' }
          ],
            remediations: { 'democracy-is-only-about-the': { steps: ['First, ask the student to define \'representative\' as someone who carries a message for someone else.', 'Second, explain that if a messenger stops listening to the person who sent them, they are no longer a good.', 'Third, use the school monitor analogy to show that the monitor\'s job is to talk to teachers *on behalf of* the class.'] } } },
        { type: 'subpart', nodeId: 'c6_civics_ch15_038', difficulty: 'standard',
          question: 'Being a critical media consumer means that instead of believing everything we.',
          hint: 'Review the section in the textbook on "Three Organs of Government" to understand who.',
          misconception: 'Students often assume that if a piece of information has a photo or a video attached, it must be 100% true.',
          parts: [
                { id: 'a', prompt: 'What is the first step you should take when you see a shocking piece of news online?', answer: 'The first step is to identify who created or reported the information',
                  options: ['The first step is to identify who created or reported the information', 'immediately sharing it with friends', 'if a piece of information has a photo or a video attached, it must be 100% true'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that if a piece of information has a photo or a video attached, it must be 100% true.' }
          ],
            remediations: { 'if-a-piece-of-information': { steps: ['Ask the student to find two photos of the same event from different news websites.', 'Have them compare what the photos show and what the captions say.', 'Point out how the same event can look different depending on who is reporting it, helping them realize that visual.'] } } },
        { type: 'subpart', nodeId: 'c6_civics_ch15_038', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that if a piece of information has a photo or a video attached, it must be 100% true.',
          parts: [
                { id: 'a', prompt: 'Is a news report more reliable if it cites multiple sources or if it uses anonymous sources? Why?', answer: 'Multiple sources are more reliable',
                  options: ['Multiple sources are more reliable', 'if a piece of information has a photo or a video attached, it must be 100% true'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that if a piece of information has a photo or a video attached, it must be 100% true.' },
                { id: 'b', prompt: 'Create a list of three questions you would ask if a friend sent you a message saying, "My local park is being sold to build a shopping mall."', answer: 'The student should ask: 1) Who told you this?',
                  options: ['The student should ask: 1) Who told you this?', 'if a piece of information has a photo or a video attached, it must be 100% true'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that if a piece of information has a photo or a video attached, it must be 100% true.' }
          ],
            remediations: { 'if-a-piece-of-information': { steps: ['Ask the student to find two photos of the same event from different news websites.', 'Have them compare what the photos show and what the captions say.', 'Point out how the same event can look different depending on who is reporting it, helping them realize that visual.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch06_016', difficulty: 'standard',
          question: 'The Bhakti Movement was a religious and social shift in India where people.',
          hint: 'Review the concept of social hierarchy in early Indian society.',
          misconception: 'Students often think "Bhakti" is just a new type of ritual. They struggle to understand that it is actually the.',
          parts: [
                { id: 'a', prompt: 'What is the main meaning of the word "Bhakti"?', answer: 'Bhakti means "devotion" or an intense, loving surrender to God',
                  options: ['Bhakti means "devotion" or an intense, loving surrender to God', 'Bhakti', '"Bhakti" is just a new type of ritual'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Bhakti" is just a new type of ritual. They struggle to understand that it is actually the *removal* of rituals.' },
                { id: 'b', prompt: 'How does the Bhakti movement change the role of the "priest" in society?', answer: 'It reduces the priest\'s authority',
                  options: ['It reduces the priest\'s authority', 'Bhakti', 'the movement was about fighting people rather than changing ideas'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Bhakti" is just a new type of ritual. They struggle to understand that it is actually the *removal* of rituals.' }
          ],
            remediations: { 'bhakti-is-just-a-new': { steps: ['First, ask the student to describe a rule they follow at home and why they follow it (e.g., "I wash my hands before.', 'Then, ask them what happens if they eat with love and joy versus eating while just following the rule.', 'Explain that Bhakti is like the "love" part—it is the feeling behind the act that matters more than the act itself.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch06_016', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Bhakti" is just a new type of ritual. They struggle to understand that it is actually the.',
          parts: [
                { id: 'a', prompt: 'Is the Bhakti movement more about what you do (rituals) or how you feel (love)? Defend your answer.', answer: 'It is about how you feel',
                  options: ['It is about how you feel', 'external show', 'internal faith', 'Bhakti'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Bhakti" is just a new type of ritual. They struggle to understand that it is actually the *removal* of rituals.' },
                { id: 'b', prompt: 'How does the Bhakti movement change the role of the "priest" in society?', answer: 'It reduces the priest\'s authority',
                  options: ['It reduces the priest\'s authority', 'Bhakti', 'the movement was about fighting people rather than changing ideas', '"Bhakti" is just a new type of ritual'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Bhakti" is just a new type of ritual. They struggle to understand that it is actually the *removal* of rituals.' }
          ],
            remediations: { 'bhakti-is-just-a-new': { steps: ['First, ask the student to describe a rule they follow at home and why they follow it (e.g., "I wash my hands before.', 'Then, ask them what happens if they eat with love and joy versus eating while just following the rule.', 'Explain that Bhakti is like the "love" part—it is the feeling behind the act that matters more than the act itself.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
