import type { SimDef } from '../../engine/types';

/** v3 generated — c6_civics_ch10_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_civics_ch10_p2: SimDef = {
    id: 'v3_c6_civics_ch10_p2',
    title: 'Fundamental Rights and Duties · Part 2/2',
    subtitle: 'Who gave you your rights — and who is allowed to take them?',
    classLevel: 6, subject: 'civics', topic: 'Fundamental Rights and Duties · Part 2/2',
    chapters: ['c6_civics_ch10'],
    nodeIds: ['c6_civics_ch10_007', 'c6_civics_ch10_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a junior judge reviewing a school\'s unfair rulebook', intro: 'A new rulebook has landed: some children may speak, others may not. Your job is to test each rule — not against the law, but against what every human deserves.', goal: 'Tell the difference between a privilege someone grants and a right you were born with.' },
    discovery: {
        question: 'A new school rule says only children wearing a red badge may speak in class. No law forbids it — the principal simply decided. Can a rule be \'official\' and still be wrong?',
        options: ['Yes — the right to speak and be treated equally belongs to everyone simply for being human', 'No — whatever the principal decides is automatically fair', 'Yes, but only because red is an unlucky colour', 'No — rights exist only when a rulebook grants them'],
        answer: 'Yes — the right to speak and be treated equally belongs to everyone simply for being human',
        hook: 'Rights aren\'t prizes a government hands out — they\'re the rules of being human. A law that breaks them isn\'t strong law; it\'s a bully with paperwork.',
    },
    teaching: [
        { title: 'Rights and Duties: Two Sides of Citizenship', text: 'Fundamental rights and duties are a pair of responsibilities and benefits that exist together, where every freedom you enjoy is balanced by a specific task you must perform to keep the community.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_civics_ch10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Put a suspicious new rulebook on trial — test each rule against human rights and strike down the ones that fail the fairness test.',
        labels: ['Rights and Duties: Two', 'How Rights Are Protected'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_civics_ch10_007', title: 'Rights and Duties: Two Sides of Citizenship',
          caseStudy: { intro: 'Imagine you are at a school playground. You have the right to play with the swings, but does that mean you can stay on them forever while others wait?',
            decisions: [{ prompt: 'What does it mean to say rights and duties are "two sides of the same coin"?', options: [
                { text: 'It means they are inseparable parts of a whole', outcome: 'It means they are inseparable parts of a whole; you get a benefit (right) only when you accept.' },
                { text: 'Rights', outcome: 'Not quite — Students often think "Rights" are what I get and "Duties" are what I am forced to do by the.', reveals: 'rights-are-what-i-get' },
                { text: 'Duties', outcome: 'Not quite — Students often think "Rights" are what I get and "Duties" are what I am forced to do by the.', reveals: 'rights-are-what-i-get' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch10_008', title: 'How Rights Are Protected: Courts and Remedies',
          caseStudy: { intro: 'Imagine you are playing a game where the rules are written down, but someone keeps pushing you out of bounds and saying "the rules don\'t matter." How would you.',
            decisions: [{ prompt: 'What is the "heart and soul" of the Indian Constitution, and why is it given this name?', options: [
                { text: 'The Right to Constitutional Remedies is called the heart and soul', outcome: 'The Right to Constitutional Remedies is called the heart and soul.' },
                { text: 'Fundamental Rights', outcome: 'Not quite — Students often think that "Fundamental Rights" are just moral guidelines that people should be nice.', reveals: 'fundamental-rights-are-just-moral' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A parent tells a child, \'I give you the right to go to school — so behave and I won\'t take it back.\' Down the street, a shopkeeper refuses to sell milk to a family because of their religion, saying, \'My shop, my rules.\'',
            decisions: [{ prompt: 'What is wrong with both statements?', options: [
                { text: 'Rights are not gifts — the child\'s schooling is a right she holds simply by being a person, so a parent cannot \'grant\' or withdraw it. And the shopkeeper breaks the right to equality: refusing a customer on grounds of religion is discrimination, and owning the shop does not exempt him from it.', outcome: 'Rights are inherent — they belong to everyone equally and no private person may hand them out or take them away; that is what separates a right from a favour.' },
                { text: 'The parent is right — rights are permissions given by whoever is in charge, at home or in a shop.', outcome: 'A permission can be granted and withdrawn by the granter; a right belongs to the person herself, which is why it cannot be gifted or revoked.', reveals: 'rights-are-gifts' },
                { text: 'The shopkeeper is within his rights — private property owners may choose customers however they like.', outcome: 'Running a shop does not suspend equality — refusing service purely on religion is exactly the discrimination the right against discrimination forbids.', reveals: 'property-beats-equality' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch10_008', title: 'You made it',
          caseStudy: { intro: 'Rights don\'t come from governments — governments are judged by them. That\'s why even an official rule can still be wrong.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_civics_ch10_007', difficulty: 'standard',
          question: 'Fundamental rights and duties are a pair of responsibilities and benefits that.',
          hint: 'Review the "Family and Community" chapter on how individuals contribute to the home.',
          misconception: 'Students often think "Rights" are what I get and "Duties" are what I am forced to do by the government.',
          parts: [
                { id: 'a', prompt: 'What does it mean to say rights and duties are "two sides of the same coin"?', answer: 'It means they are inseparable parts of a whole',
                  options: ['It means they are inseparable parts of a whole', 'Rights', 'Duties', 'rights are free gifts or duties are punishments, missing the idea of balance'],
                  hint: 'Review the "Family and Community" chapter on how individuals contribute to the home.',
                  misconception: 'Students often think "Rights" are what I get and "Duties" are what I am forced to do by the government.' },
                { id: 'b', prompt: 'If you have the right to a clean park, what is your corresponding duty?', answer: 'Your duty is to not litter and to pick up your own trash',
                  options: ['Your duty is to not litter and to pick up your own trash', 'Rights', 'Duties'],
                  hint: 'Review the "Family and Community" chapter on how individuals contribute to the home.',
                  misconception: 'Students often think "Rights" are what I get and "Duties" are what I am forced to do by the government.' },
                { id: 'c', prompt: 'Why does a right to education come with a duty to study?', answer: 'Education requires resources provided by others',
                  options: ['Education requires resources provided by others', 'Rights', 'Duties'],
                  hint: 'Review the "Family and Community" chapter on how individuals contribute to the home.',
                  misconception: 'Students often think "Rights" are what I get and "Duties" are what I am forced to do by the government.' }
          ],
            remediations: { 'rights-are-what-i-get': { steps: ['Ask the student: "If you take a toy from a friend, what happens if they take one from you?" 2.', 'Explain that the \'right\' to play with toys depends on the \'duty\' to share.', 'Ask them to apply this to a clean classroom: "If you want a clean desk, what is your duty?" 4.', 'Emphasize that duties are not \'bossy rules\' but \'maintenance steps\' for our shared life.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Rights" are what I get and "Duties" are what I am forced to do by the government.',
          parts: [
                { id: 'a', prompt: 'Is it fair to claim a right without performing the duty that supports it? Why?', answer: 'No, because rights are maintained by the actions of all citizens',
                  options: ['No, because rights are maintained by the actions of all citizens', 'Rights', 'Duties'],
                  hint: 'Review the "Family and Community" chapter on how individuals contribute to the home.',
                  misconception: 'Students often think "Rights" are what I get and "Duties" are what I am forced to do by the government.' }
          ],
            remediations: { 'rights-are-what-i-get': { steps: ['Ask the student: "If you take a toy from a friend, what happens if they take one from you?" 2.', 'Explain that the \'right\' to play with toys depends on the \'duty\' to share.', 'Ask them to apply this to a clean classroom: "If you want a clean desk, what is your duty?" 4.', 'Emphasize that duties are not \'bossy rules\' but \'maintenance steps\' for our shared life.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch10_008', difficulty: 'standard',
          question: 'The Right to Constitutional Remedies is a Fundamental Right that allows.',
          hint: 'Review the list of Fundamental Rights in the previous chapter.',
          misconception: 'Students often think that "Fundamental Rights" are just moral guidelines that people should be nice enough to follow.',
          parts: [
                { id: 'a', prompt: 'What is the "heart and soul" of the Indian Constitution, and why is it given this name?', answer: 'The Right to Constitutional Remedies is called the heart and soul',
                  options: ['The Right to Constitutional Remedies is called the heart and soul', 'Fundamental Rights'],
                  hint: 'Review the list of Fundamental Rights in the previous chapter.',
                  misconception: 'Students often think that "Fundamental Rights" are just moral guidelines that people should be nice enough to follow.' },
                { id: 'b', prompt: 'If a shopkeeper refuses to sell you something only because of your caste, which part of the legal system can you use to protect your right?', answer: 'You can approach the court',
                  options: ['You can approach the court', 'Fundamental Rights', 'they must personally fight the shopkeeper or accept the discrimination'],
                  hint: 'Review the list of Fundamental Rights in the previous chapter.',
                  misconception: 'Students often think that "Fundamental Rights" are just moral guidelines that people should be nice enough to follow.' },
                { id: 'c', prompt: 'How does the existence of courts change the way we look at Fundamental Rights compared to a "promise" made by a friend?', answer: 'A promise from a friend is voluntary, but a Fundamental Right is legally binding',
                  options: ['A promise from a friend is voluntary, but a Fundamental Right is legally binding', 'Fundamental Rights'],
                  hint: 'Review the list of Fundamental Rights in the previous chapter.',
                  misconception: 'Students often think that "Fundamental Rights" are just moral guidelines that people should be nice enough to follow.' }
          ],
            remediations: { 'fundamental-rights-are-just-moral': { steps: ['Explain that "Enforceable by Law" means there is a specific person or building (the court) whose job is to force people.', 'Use the "Playground Referee" analogy to show that the court acts like a neutral party that makes the final decision.', 'Ask the student: "If the rules were just suggestions, why would we bother writing them down in a big book called the.', 'Reiterate that the court has the power to punish those who break these specific constitutional rules.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
