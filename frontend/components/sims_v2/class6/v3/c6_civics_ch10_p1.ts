import type { SimDef } from '../../engine/types';

/** v3 generated — c6_civics_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_civics_ch10_p1: SimDef = {
    id: 'v3_c6_civics_ch10_p1',
    title: 'Fundamental Rights and Duties · Part 1/2',
    subtitle: 'Who gave you your rights — and who is allowed to take them?',
    classLevel: 6, subject: 'civics', topic: 'Fundamental Rights and Duties · Part 1/2',
    chapters: ['c6_civics_ch10'],
    nodeIds: ['c6_civics_ch10_001', 'c6_civics_ch10_002', 'c6_civics_ch10_003', 'c6_civics_ch10_004', 'c6_civics_ch10_005', 'c6_civics_ch10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a junior judge reviewing a school\'s unfair rulebook', intro: 'A new rulebook has landed: some children may speak, others may not. Your job is to test each rule — not against the law, but against what every human deserves.', goal: 'Tell the difference between a privilege someone grants and a right you were born with.' },
    discovery: {
        question: 'A new school rule says only children wearing a red badge may speak in class. No law forbids it — the principal simply decided. Can a rule be \'official\' and still be wrong?',
        options: ['Yes — the right to speak and be treated equally belongs to everyone simply for being human', 'No — whatever the principal decides is automatically fair', 'Yes, but only because red is an unlucky colour', 'No — rights exist only when a rulebook grants them'],
        answer: 'Yes — the right to speak and be treated equally belongs to everyone simply for being human',
        hook: 'Rights aren\'t prizes a government hands out — they\'re the rules of being human. A law that breaks them isn\'t strong law; it\'s a bully with paperwork.',
    },
    teaching: [
        { title: 'What Are Human Rights?', text: 'Human rights are the essential freedoms and protections that every person possesses simply by being human, regardless of their nationality, status, or background.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_civics_ch10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Put a suspicious new rulebook on trial — test each rule against human rights and strike down the ones that fail the fairness test.',
        labels: ['What Are Human Rights?', 'Fundamental Rights in', 'Right to Equality: Meaning', 'Right to Freedom: Speech,', 'Right against Exploitation: Ending', 'Fundamental Duties of Citizens'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_civics_ch10_001', title: 'What Are Human Rights?',
          caseStudy: { intro: 'Imagine you are playing a game where the rules are not written on a paper, but are understood by everyone just because they are playing.',
            decisions: [{ prompt: 'What does it mean to say that human rights are "inherent"?', options: [
                { text: 'It means these rights exist naturally from birth and are not given by any government', outcome: 'It means these rights exist naturally from birth and are not given by any government.' },
                { text: 'Human Rights', outcome: 'Not quite — Students often confuse "Human Rights" with "Government Privileges." They assume that because.', reveals: 'students-often-confuse-human-rights' },
                { text: 'Government Privileges', outcome: 'Not quite — Students often confuse "Human Rights" with "Government Privileges." They assume that because.', reveals: 'students-often-confuse-human-rights' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch10_002', title: 'Fundamental Rights in the Indian Constitution',
          caseStudy: { intro: 'Imagine you are at school and the teacher tells you that only students wearing blue shoes can sit on the chairs, while everyone else must sit on the floor.',
            decisions: [{ prompt: 'What is the primary purpose of having Fundamental Rights in our Constitution?', options: [
                { text: 'They are meant to guarantee basic freedom and equality to all citizens and protect them', outcome: 'They are meant to guarantee basic freedom and equality to all citizens and protect them from unfair.' },
                { text: 'they are rules to tell us what to do', outcome: 'Not quite — Students often think Fundamental Rights are absolute, meaning they can do "anything they want.".', reveals: 'fundamental-rights-are-absolute' },
                { text: 'anything they want', outcome: 'Not quite — Students often think Fundamental Rights are absolute, meaning they can do "anything they want.".', reveals: 'fundamental-rights-are-absolute' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch10_003', title: 'Right to Equality: Meaning and Application',
          caseStudy: { intro: 'Have you ever wondered why the rules in a game of cricket apply to everyone on the field, no matter who they are?',
            decisions: [{ prompt: 'What are the five grounds upon which the Right to Equality prohibits discrimination?', options: [
                { text: 'The five grounds are religion, race, caste, sex, and place of birth', outcome: 'The five grounds are religion, race, caste, sex, and place of birth.' },
                { text: 'discrimination', outcome: 'Not quite — Students often confuse "equality" with "sameness" in every aspect of life, such as thinking.', reveals: 'students-often-confuse-equality-with' },
                { text: 'equality', outcome: 'Not quite — Students often confuse "equality" with "sameness" in every aspect of life, such as thinking.', reveals: 'students-often-confuse-equality-with' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch10_004', title: 'Right to Freedom: Speech, Expression, and More',
          caseStudy: { intro: 'Have you ever wanted to tell your teacher that a school rule seems unfair or suggest a new idea for the playground?',
            decisions: [{ prompt: 'What does the Right to Freedom of Speech and Expression allow a citizen to do?', options: [
                { text: 'It allows citizens to express their opinions, beliefs, and ideas without fear of', outcome: 'It allows citizens to express their opinions, beliefs, and ideas without fear of punishment.' },
                { text: 'Freedom of Speech', outcome: 'Not quite — Students often think "Freedom of Speech" means they can say anything, anytime, to anyone, even.', reveals: 'freedom-of-speech-means-they' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch10_005', title: 'Right against Exploitation: Ending Injustice',
          caseStudy: { intro: 'Have you ever seen someone being forced to do work they didn\'t want to do, or heard about people being tricked into dangerous jobs?',
            decisions: [{ prompt: 'What are the two main forms of exploitation prohibited by this right as discussed in the text?', options: [
                { text: 'The two forms are human trafficking (buying/selling/transporting people) and forced', outcome: 'The two forms are human trafficking (buying/selling/transporting people) and forced labour (forcing.' },
                { text: 'exploitation', outcome: 'Not quite — Students often confuse "forced labour" with "chores at home." They think that if a parent asks them.', reveals: 'students-often-confuse-forced-labour' },
                { text: 'forced labour', outcome: 'Not quite — Students often confuse "forced labour" with "chores at home." They think that if a parent asks them.', reveals: 'students-often-confuse-forced-labour' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch10_006', title: 'Fundamental Duties of Citizens',
          caseStudy: { intro: 'Think about your home: you have the right to be fed and cared for by your parents, but don\'t you also have a duty to help with chores or respect your elders?',
            decisions: [{ prompt: 'What are the Fundamental Duties, and where can we find them?', options: [
                { text: 'Fundamental Duties are the responsibilities that citizens of India must perform to show', outcome: 'Fundamental Duties are the responsibilities that citizens of India must perform to show respect for.' },
                { text: 'duties', outcome: 'Not quite — Students often believe that if they do not perform a duty, they will immediately be arrested.', reveals: 'if-they-do-not-perform' },
                { text: 'rules of school', outcome: 'Not quite — Students often believe that if they do not perform a duty, they will immediately be arrested.', reveals: 'if-they-do-not-perform' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A parent tells a child, \'I give you the right to go to school — so behave and I won\'t take it back.\' Down the street, a shopkeeper refuses to sell milk to a family because of their religion, saying, \'My shop, my rules.\'',
            decisions: [{ prompt: 'What is wrong with both statements?', options: [
                { text: 'Rights are not gifts — the child\'s schooling is a right she holds simply by being a person, so a parent cannot \'grant\' or withdraw it. And the shopkeeper breaks the right to equality: refusing a customer on grounds of religion is discrimination, and owning the shop does not exempt him from it.', outcome: 'Rights are inherent — they belong to everyone equally and no private person may hand them out or take them away; that is what separates a right from a favour.' },
                { text: 'The parent is right — rights are permissions given by whoever is in charge, at home or in a shop.', outcome: 'A permission can be granted and withdrawn by the granter; a right belongs to the person herself, which is why it cannot be gifted or revoked.', reveals: 'rights-are-gifts' },
                { text: 'The shopkeeper is within his rights — private property owners may choose customers however they like.', outcome: 'Running a shop does not suspend equality — refusing service purely on religion is exactly the discrimination the right against discrimination forbids.', reveals: 'property-beats-equality' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch10_006', title: 'The bigger picture',
          caseStudy: { intro: 'Rights don\'t come from governments — governments are judged by them. That\'s why even an official rule can still be wrong.',
            decisions: [{ prompt: 'What comes next? Fundamental Rights and Duties · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Fundamental Rights and Duties · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_civics_ch10_001', difficulty: 'standard',
          question: 'Human rights are the essential freedoms and protections that every person.',
          hint: 'Review the roles and responsibilities section in Chapter 9 to see how we care for each.',
          misconception: 'Students often confuse "Human Rights" with "Government Privileges." They assume that because a government provides.',
          parts: [
                { id: 'a', prompt: 'Which of these is a human right: the right to own a luxury car or the right to education? Why?', answer: 'The right to education is a human right',
                  options: ['The right to education is a human right', 'Human Rights', 'Government Privileges', 'created'],
                  hint: 'Review the roles and responsibilities section in Chapter 9 to see how we care for each other.',
                  misconception: 'Students often confuse "Human Rights" with "Government Privileges." They assume that because a government provides schools or laws, the.' }
          ],
            remediations: { 'students-often-confuse-human-rights': { steps: ['Ask the student: "If a government were to disappear tomorrow, would you still be a human?" When they say "Yes," ask.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch10_002', difficulty: 'standard',
          question: 'Fundamental Rights are a set of basic guarantees provided by the Indian.',
          hint: 'Review the basic idea of "Governance" and why we need rules for a fair society.',
          misconception: 'Students often think Fundamental Rights are absolute, meaning they can do "anything they want." They fail to understand.',
          parts: [
                { id: 'a', prompt: 'If a person is denied entry to a park because of their religion, which Fundamental Right is being violated?', answer: 'The Right to Equality',
                  options: ['The Right to Equality', 'prohibition of discrimination', 'anything they want', 'Fundamental Rights are absolute, meaning they can do "anything they want'],
                  hint: 'Review the basic idea of "Governance" and why we need rules for a fair society.',
                  misconception: 'Students often think Fundamental Rights are absolute, meaning they can do "anything they want." They fail to understand that these rights.' },
                { id: 'b', prompt: 'Why are Fundamental Rights called "enforceable by law" compared to other rules in school or home?', answer: 'They are enforceable',
                  options: ['They are enforceable', 'anything they want', 'Fundamental Rights are absolute, meaning they can do "anything they want'],
                  hint: 'Review the basic idea of "Governance" and why we need rules for a fair society.',
                  misconception: 'Students often think Fundamental Rights are absolute, meaning they can do "anything they want." They fail to understand that these rights.' }
          ],
            remediations: { 'fundamental-rights-are-absolute': { steps: ['Explain that a right is a two-way street: your right to move freely ends where another person\'s right to safety begins.', 'Ask the student: "If you have the right to play music, do you have the right to play it at 3 AM at maximum volume?" 3.', 'Help them identify that the law balances rights so that everyone can enjoy them equally.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch10_003', difficulty: 'standard',
          question: 'Right to Equality is a Fundamental Right ensuring that all citizens are treated.',
          hint: 'Review the concept of "Rule of Law" to understand why laws must be universal.',
          misconception: 'Students often confuse "equality" with "sameness" in every aspect of life, such as thinking everyone must have the.',
          parts: [
                { id: 'a', prompt: 'What are the five grounds upon which the Right to Equality prohibits discrimination?', answer: 'The five grounds are religion, race, caste, sex, and place of birth',
                  options: ['The five grounds are religion, race, caste, sex, and place of birth', 'discrimination', 'equality', 'sameness'],
                  hint: 'Review the concept of "Rule of Law" to understand why laws must be universal.',
                  misconception: 'Students often confuse "equality" with "sameness" in every aspect of life, such as thinking everyone must have the exact same amount.' },
                { id: 'b', prompt: 'If a school denies a student admission specifically because of their caste, why is this a violation of the Right to Equality?', answer: 'It violates the right',
                  options: ['It violates the right', 'equality', 'sameness'],
                  hint: 'Review the concept of "Rule of Law" to understand why laws must be universal.',
                  misconception: 'Students often confuse "equality" with "sameness" in every aspect of life, such as thinking everyone must have the exact same amount.' },
                { id: 'c', prompt: 'A movie theater manager decides to charge people different ticket prices based on their religion. Is this allowed under the Right to Equality?', answer: 'No, it is not allowed',
                  options: ['No, it is not allowed', 'fairness', 'business choice', 'equality'],
                  hint: 'Review the concept of "Rule of Law" to understand why laws must be universal.',
                  misconception: 'Students often confuse "equality" with "sameness" in every aspect of life, such as thinking everyone must have the exact same amount.' }
          ],
            remediations: { 'students-often-confuse-equality-with': { steps: ['If a student struggles, ask them to imagine a school race.', 'Explain that equality means everyone starts at the same line (equal rules), but it doesn\'t mean everyone must finish.', 'Use this analogy to separate "equal treatment by the law" from "everyone is the same person."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch10_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "equality" with "sameness" in every aspect of life, such as thinking everyone must have the.',
          parts: [
                { id: 'a', prompt: 'Should a judge be allowed to give a lighter punishment to a wealthy person than to a poor person for the same crime? Why or why not?', answer: 'No, because the Right to Equality dictates that no one is above or below the law',
                  options: ['No, because the Right to Equality dictates that no one is above or below the law', 'human value', 'equality', 'sameness'],
                  hint: 'Review the concept of "Rule of Law" to understand why laws must be universal.',
                  misconception: 'Students often confuse "equality" with "sameness" in every aspect of life, such as thinking everyone must have the exact same amount.' },
                { id: 'b', prompt: 'Create a scenario where a person is being discriminated against based on "place of birth." How would you use the Right to Equality to defend them?', answer: 'A good answer would involve someone being denied a job',
                  options: ['A good answer would involve someone being denied a job', 'equality', 'sameness'],
                  hint: 'Review the concept of "Rule of Law" to understand why laws must be universal.',
                  misconception: 'Students often confuse "equality" with "sameness" in every aspect of life, such as thinking everyone must have the exact same amount.' }
          ],
            remediations: { 'students-often-confuse-equality-with': { steps: ['If a student struggles, ask them to imagine a school race.', 'Explain that equality means everyone starts at the same line (equal rules), but it doesn\'t mean everyone must finish.', 'Use this analogy to separate "equal treatment by the law" from "everyone is the same person."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch10_004', difficulty: 'standard',
          question: 'The Right to Freedom of Speech and Expression is a fundamental right that.',
          hint: 'Review the basic definition of "Fundamental Rights" in Chapter 10.',
          misconception: 'Students often think "Freedom of Speech" means they can say anything, anytime, to anyone, even if it is meant to hurt.',
          parts: [
                { id: 'a', prompt: 'What does the Right to Freedom of Speech and Expression allow a citizen to do?', answer: 'It allows citizens to express their opinions, beliefs, and ideas without fear of',
                  options: ['It allows citizens to express their opinions, beliefs, and ideas without fear of', 'Freedom of Speech'],
                  hint: 'Review the basic definition of "Fundamental Rights" in Chapter 10.',
                  misconception: 'Students often think "Freedom of Speech" means they can say anything, anytime, to anyone, even if it is meant to hurt or insult others.' }
          ],
            remediations: { 'freedom-of-speech-means-they': { steps: ['First, ask the student to imagine a situation where someone shouts something hurtful at a friend.', 'Ask them if that "freedom" makes the friendship better or worse.', 'Then, explain that rights allow us to express *opinions*—not to cause harm.', 'Remind them that the purpose of the right is to improve democracy, which requires kindness and debate, not abuse.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch10_005', difficulty: 'standard',
          question: 'The Right against Exploitation is a constitutional guarantee that protects.',
          hint: 'Review the concept of "Fundamental Rights" in the previous chapter nodes.',
          misconception: 'Students often confuse "forced labour" with "chores at home." They think that if a parent asks them to clean their.',
          parts: [
                { id: 'a', prompt: 'Why does the law specifically protect people from being forced to work without payment?', answer: 'The law protects them',
                  options: ['The law protects them', 'bad habit', 'forced labour', 'chores at home'],
                  hint: 'Review the concept of "Fundamental Rights" in the previous chapter nodes.',
                  misconception: 'Students often confuse "forced labour" with "chores at home." They think that if a parent asks them to clean their room, they are being.' },
                { id: 'b', prompt: 'A shopkeeper tells a boy he must work 12 hours a day without any money because he owes a small debt to the shopkeeper\'s friend.', answer: 'No, this is not allowed',
                  options: ['No, this is not allowed', 'forced labour', 'chores at home', 'exploited'],
                  hint: 'Review the concept of "Fundamental Rights" in the previous chapter nodes.',
                  misconception: 'Students often confuse "forced labour" with "chores at home." They think that if a parent asks them to clean their room, they are being.' },
                { id: 'c', prompt: 'How does the Right against Exploitation differ from the idea of just "being a helper" in a family?', answer: 'Helping in a family is based on love, care, and voluntary cooperation',
                  options: ['Helping in a family is based on love, care, and voluntary cooperation', 'forced labour', 'chores at home', 'exploited'],
                  hint: 'Review the concept of "Fundamental Rights" in the previous chapter nodes.',
                  misconception: 'Students often confuse "forced labour" with "chores at home." They think that if a parent asks them to clean their room, they are being.' }
          ],
            remediations: { 'students-often-confuse-forced-labour': { steps: ['First, ask the student to define "cooperation" in the context of the family unit (using Chapter 9 references).', 'Second, ask them to identify if they are free to leave their house if they don\'t want to do a chore.', 'Third, contrast this with "forced labour," where the person is trapped and not paid.', 'Emphasize that rights relate to illegal coercion by others, not shared household responsibilities.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch10_006', difficulty: 'standard',
          question: 'Fundamental Duties are the moral and legal responsibilities that every citizen.',
          hint: 'Review the "Roles and Responsibilities" section in Chapter 9 to see how duties work in.',
          misconception: 'Students often believe that if they do not perform a duty, they will immediately be arrested or punished like breaking.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Fundamental Duties are the moral and legal responsibilities that every citizen must',
                  options: ['Fundamental Duties are the moral and legal responsibilities that every citizen must', 'Human rights are the essential freedoms and protections that every person possesses', 'Fundamental Rights are a set of basic guarantees provided by the Indian Constitution to', 'Right to Equality is a Fundamental Right ensuring that all citizens are treated equally'],
                  hint: 'Review the "Roles and Responsibilities" section in Chapter 9 to see how duties work in a family.',
                  misconception: 'Students often believe that if they do not perform a duty, they will immediately be arrested or punished like breaking a traffic law.' }
          ],
            remediations: { 'if-they-do-not-perform': { steps: ['First, explain that Fundamental Duties are like the "unwritten code of conduct" in a family.', 'Second, ask them to list chores they do at home that aren\'t "laws" but help the family function.', 'Third, draw a parallel: "Just as you don\'t help your parents because you are afraid of jail, but because you love them.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
