import type { SimDef } from '../../engine/types';

/** v3 generated — c8_civ_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_civ_ch01_p1: SimDef = {
    id: 'v3_c8_civ_ch01_p1',
    title: 'Universal Franchise and India\'s Electoral System · Part 1/2',
    subtitle: 'Discover the one place where every Indian is perfectly equal',
    classLevel: 8, subject: 'civics', topic: 'Universal Franchise and India\'s Electoral System · Part 1/2',
    chapters: ['c8_civ_ch01'],
    nodeIds: ['c8_civ_ch1_1', 'c8_civ_ch1_10', 'c8_civ_ch1_11', 'c8_civ_ch1_2', 'c8_civ_ch1_3', 'c8_civ_ch1_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a first-time voter', intro: 'You\'ll turn 18 and join the world\'s largest electorate. Before that, learn why your single vote — equal to a billionaire\'s — was one of the most radical promises any nation ever made.', goal: 'Explain universal adult franchise, its constitutional guarantee in India, and how the Election Commission conducts free and fair elections.' },
    discovery: {
        question: 'In a Delhi voting queue stand a billionaire CEO and a daily-wage worker. At the booth, their votes count exactly the same — one each. Many countries once gave extra votes to the rich or educated. What radical promise did India make under Article 326?',
        options: ['Universal adult franchise — every adult citizen votes, every vote weighs equal, regardless of wealth, caste, gender or education', 'Only taxpayers may vote in national elections', 'Graduates get two votes; everyone else gets one', 'Voting rights are decided by each state separately'],
        answer: 'Universal adult franchise — every adult citizen votes, every vote weighs equal, regardless of wealth, caste, gender or education',
        hook: 'Most democracies took centuries to let everyone vote — India\'s Constitution granted it to all adults from day one, in 1950, when half the world still restricted it.',
    },
    teaching: [
        { title: 'Universal Adult Franchise: Definition and Meaning', text: 'Universal Adult Franchise is the foundational democratic principle that every adult citizen—regardless of caste, religion, gender, education, or wealth—has the right to vote and that every vote.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_civ_ch1_1', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run an election where everyone counts: trace how India adopted universal franchise when richer nations hesitated, and see how the Election Commission keeps every single vote equal.',
        labels: ['Universal Adult Franchise: Definition', 'Free and Fair Elections', 'Scale of Indian Elections', 'Right to Vote: Every', 'Constitutional Basis: Article 326', 'Minimum Voting Age: Lowered'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_civ_ch1_1', title: 'Universal Adult Franchise: Definition and Meaning',
          caseStudy: { intro: 'Imagine two citizens standing in a voting queue outside a school polling booth in Delhi: a wealthy corporate executive and a daily-wage earner.',
            decisions: [{ prompt: 'What does the term \'Universal Adult Franchise\' mean in the context of Indian democracy?', options: [
                { text: 'Universal Adult Franchise means that every adult citizen of India, meeting the age', outcome: 'Universal Adult Franchise means that every adult citizen of India, meeting the age requirement, has.' },
                { text: 'a citizen\'s vote value increases if they are a government official or taxpayer', outcome: 'Not quite — Students often confuse Universal Adult Franchise with the idea that anyone of any age can vote,.', reveals: 'students-often-confuse-universal-adult' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch1_2', title: 'Right to Vote: Every Adult Citizen Gets One Vote',
          caseStudy: { intro: 'Imagine two citizens standing in a voting queue outside a school polling booth in your neighborhood: a wealthy factory owner and a daily-wage earner.',
            decisions: [{ prompt: 'What fundamental democratic principle ensures that every adult citizen has one vote, and that every vote carries equal weight during.', options: [
                { text: 'The principle is universal adult suffrage (or political equality)', outcome: 'The principle is universal adult suffrage (or political equality).' },
                { text: 'majority rule', outcome: 'Not quite — Students often think that the weight of a person\'s vote depends on their social standing, education.', reveals: 'the-weight-of-a-person' },
                { text: 'universal franchise', outcome: 'Not quite — Students often think that the weight of a person\'s vote depends on their social standing, education.', reveals: 'the-weight-of-a-person' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch1_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A housing society holds elections for its committee. The chairman proposes: \'Members who pay higher maintenance fees get three votes; ordinary members get one. Also, tenants who don\'t own flats may not vote.\'',
            decisions: [{ prompt: 'Does this fit the democratic principle of universal adult franchise?', options: [
                { text: 'No — franchise means one person, one vote of equal value for every adult citizen, with no weighting by wealth and no exclusion by property status; fees buy services, not extra political power.', outcome: 'This recognises that the equal value of each vote is the heart of the principle — letting money multiply votes recreates the old restricted-franchise systems democracy abolished.' },
                { text: 'It is fair — those who pay more have more at stake, so heavier votes reflect their bigger contribution.', outcome: 'That argument was exactly what property-based franchise used to justify; democracy counts heads, not wallets, because political equality cannot be purchased.', reveals: 'money-multiplies-votes' },
                { text: 'Only the tenant ban is wrong — excluding non-owners breaks the rule, but weighted votes for payers are acceptable.', outcome: 'Both clauses fail the same test: \'universal\' bars exclusions and \'one vote of equal value\' bars weighting; fixing only one still leaves unequal votes.', reveals: 'halfway-franchise' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch1_4', title: 'The bigger picture',
          caseStudy: { intro: 'One person, one vote, one value — three words that quietly ended millennia of \'some people matter more.\' The queue outside the booth is the most equal place in India.',
            decisions: [{ prompt: 'What comes next? Universal Franchise and India\'s Electoral System · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Universal Franchise and India\'s Electoral System · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_civ_ch1_1', difficulty: 'standard',
          question: 'Universal Adult Franchise is the foundational democratic principle that every.',
          hint: 'Review the basic definition of democracy from Class 6 and 7 civics, focusing on how.',
          misconception: 'Students often confuse Universal Adult Franchise with the idea that anyone of any age can vote, or they believe that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Universal Adult Franchise is the foundational democratic principle that every adult',
                  options: ['Universal Adult Franchise is the foundational democratic principle that every adult', 'Free and fair elections form the bedrock of India\'s democratic process, ensuring that', 'The scale of Indian elections refers to the massive logistical, administrative, and', 'The right to vote is a fundamental democratic principle ensuring that every adult'],
                  hint: 'Review the basic definition of democracy from Class 6 and 7 civics, focusing on how citizens.',
                  misconception: 'Students often confuse Universal Adult Franchise with the idea that anyone of any age can vote, or they believe that a citizen\'s vote value.' }
          ],
            remediations: { 'students-often-confuse-universal-adult': { steps: ['To fix this, review the exact wording of Article 326 of the Indian Constitution.', 'Use a concrete example: explain that a billionaire casting a vote in Mumbai has exactly one vote, and a street vendor.', 'Emphasize that the system counts heads, not wealth or status.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch1_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse Universal Adult Franchise with the idea that anyone of any age can vote, or they believe that.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument that educational qualifications should be required for citizens to exercise their right to vote.', answer: 'Requiring educational qualifications contradicts Universal Adult Franchise',
                  options: ['Requiring educational qualifications contradicts Universal Adult Franchise', 'a citizen\'s vote value increases if they are a government official or taxpayer'],
                  hint: 'Review the basic definition of democracy from Class 6 and 7 civics, focusing on how citizens.',
                  misconception: 'Students often confuse Universal Adult Franchise with the idea that anyone of any age can vote, or they believe that a citizen\'s vote value.' }
          ],
            remediations: { 'students-often-confuse-universal-adult': { steps: ['To fix this, review the exact wording of Article 326 of the Indian Constitution.', 'Use a concrete example: explain that a billionaire casting a vote in Mumbai has exactly one vote, and a street vendor.', 'Emphasize that the system counts heads, not wealth or status.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch1_10', difficulty: 'standard',
          question: 'Free and fair elections form the bedrock of India\'s democratic process.',
          hint: 'If stuck, review node c8_civ_ch1_7 to understand the constitutional powers of the.',
          misconception: 'Students often think that once election dates are announced, the ruling government has the authority to inaugurate new.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Free and fair elections form the bedrock of India\'s democratic process, ensuring that',
                  options: ['Free and fair elections form the bedrock of India\'s democratic process, ensuring that', 'Universal Adult Franchise is the foundational democratic principle that every adult', 'The scale of Indian elections refers to the massive logistical, administrative, and', 'The right to vote is a fundamental democratic principle ensuring that every adult'],
                  hint: 'If stuck, review node c8_civ_ch1_7 to understand the constitutional powers of the Election.',
                  misconception: 'Students often think that once election dates are announced, the ruling government has the authority to inaugurate new public projects and.' }
          ],
            remediations: { 'once-election-dates-are-announced': { steps: ['To fix this misconception, examine a real news scenario where the Election Commission issues a notice to a government.', 'Explain step-by-step that: (1) The Council of Ministers remains in office for daily governance but cannot use public.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch1_11', difficulty: 'standard',
          question: 'The scale of Indian elections refers to the massive logistical, administrative.',
          hint: 'Review node c8_civ_ch1_7 to understand the powers and responsibilities of the Election.',
          misconception: 'Students often think that the Central Government directly organizes and manages the polling booths, security, and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The scale of Indian elections refers to the massive logistical, administrative, and',
                  options: ['The scale of Indian elections refers to the massive logistical, administrative, and', 'Universal Adult Franchise is the foundational democratic principle that every adult', 'Free and fair elections form the bedrock of India\'s democratic process, ensuring that', 'The right to vote is a fundamental democratic principle ensuring that every adult'],
                  hint: 'Review node c8_civ_ch1_7 to understand the powers and responsibilities of the Election Commission.',
                  misconception: 'Students often think that the Central Government directly organizes and manages the polling booths, security, and counting staff for the.' }
          ],
            remediations: { 'the-central-government-directly-organizes': { steps: ['To fix this misconception, examine a real news report or textbook diagram showing how state government employees (like.', 'Emphasize that Article 324 gives superintendence and control of elections to an independent commission, keeping.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch1_2', difficulty: 'standard',
          question: 'The right to vote is a fundamental democratic principle ensuring that every.',
          hint: 'Review the concepts of equality before the law and basic human rights from Class 6 Civics.',
          misconception: 'Students often think that the weight of a person\'s vote depends on their social standing, education level, or economic.',
          parts: [
                { id: 'a', prompt: 'What fundamental democratic principle ensures that every adult citizen has one vote, and that every vote carries equal weight during an election?', answer: 'The principle is universal adult suffrage (or political equality)',
                  options: ['The principle is universal adult suffrage (or political equality)', 'majority rule', 'universal franchise'],
                  hint: 'Review the concepts of equality before the law and basic human rights from Class 6 Civics.',
                  misconception: 'Students often think that the weight of a person\'s vote depends on their social standing, education level, or economic contribution.' }
          ],
            remediations: { 'the-weight-of-a-person': { steps: ['To correct this, review the core definition of political equality using a simple classroom voting example: if every.', 'Explain that in India\'s democracy, citizenship alone—not wealth, education, or social status—is the sole qualification.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch1_3', difficulty: 'standard',
          question: 'Article 326 of the Indian Constitution provides the legal and constitutional.',
          hint: 'Review the difference between ordinary laws passed by Parliament and fundamental.',
          misconception: 'Students often think that the right to vote is a regular legal privilege granted or taken away at will by the party.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Article 326 of the Indian Constitution provides the legal and constitutional basis for',
                  options: ['Article 326 of the Indian Constitution provides the legal and constitutional basis for', 'Universal Adult Franchise is the foundational democratic principle that every adult', 'Free and fair elections form the bedrock of India\'s democratic process, ensuring that', 'The scale of Indian elections refers to the massive logistical, administrative, and'],
                  hint: 'Review the difference between ordinary laws passed by Parliament and fundamental constitutional.',
                  misconception: 'Students often think that the right to vote is a regular legal privilege granted or taken away at will by the party currently in power.' }
          ],
            remediations: { 'the-right-to-vote-is': { steps: ['To fix this, review the difference between ordinary laws and constitutional law.', 'Show students that while Parliament can change tax laws or traffic rules with a simple majority, changing fundamental.', 'Emphasize that Article 326 acts as a shield protecting citizens from arbitrary disenfranchisement by any government.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch1_4', difficulty: 'standard',
          question: 'The lowering of the minimum voting age from 21 to 18 years in 1988 was a major.',
          hint: 'Review c8_civ_ch1_3 on Article 326 and how voting rules are established in the.',
          misconception: 'Students often think that the voting age was 18 right from the adoption of the Constitution in 1950, or they confuse.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The lowering of the minimum voting age from 21 to 18 years in 1988 was a major',
                  options: ['The lowering of the minimum voting age from 21 to 18 years in 1988 was a major', 'Universal Adult Franchise is the foundational democratic principle that every adult', 'Free and fair elections form the bedrock of India\'s democratic process, ensuring that', 'The scale of Indian elections refers to the massive logistical, administrative, and'],
                  hint: 'Review c8_civ_ch1_3 on Article 326 and how voting rules are established in the Constitution.',
                  misconception: 'Students often think that the voting age was 18 right from the adoption of the Constitution in 1950, or they confuse the voting age with.' }
          ],
            remediations: { 'the-voting-age-was-18': { steps: ['Review the original text of Article 326 alongside the 61st Constitutional Amendment Act of 1988.', 'Emphasize that the Constitution originally specified 21 years of age, and Parliament specifically passed an amendment.', 'Contrast this voting age requirement with candidate age requirements to clarify the difference between voting and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
