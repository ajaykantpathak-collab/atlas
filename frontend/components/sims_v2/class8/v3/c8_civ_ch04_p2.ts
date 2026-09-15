import type { SimDef } from '../../engine/types';

/** v3 generated — c8_civ_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_civ_ch04_p2: SimDef = {
    id: 'v3_c8_civ_ch04_p2',
    title: 'Citizenship: Rights and Duties · Part 2/2',
    subtitle: 'Find out who really belongs — and why',
    classLevel: 8, subject: 'civics', topic: 'Citizenship: Rights and Duties · Part 2/2',
    chapters: ['c8_civ_ch04'],
    nodeIds: ['c8_civ_ch4_4', 'c8_civ_ch4_5', 'c8_civ_ch4_6', 'c8_civ_ch4_7', 'c8_civ_ch4_8', 'c8_civ_ch4_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a citizenship verification officer', intro: 'Everyone in the stadium is cheering for India, but only some of them can elect its government. Your job: figure out where the legal line between resident and citizen is drawn.', goal: 'Understand citizenship as legal membership of a state — how it differs from residency, how it is acquired, and how Articles 5–11 of the Constitution frame it.' },
    discovery: {
        question: 'A foreign business owner has lived in India for five years, pays taxes and owns property — but still can\'t vote in Indian elections. Why not?',
        options: ['Citizenship is a legal membership with political rights — paying taxes or owning property doesn\'t create it', 'The election office probably lost his paperwork', 'He just hasn\'t queued up long enough', 'Anyone who pays taxes automatically becomes a citizen'],
        answer: 'Citizenship is a legal membership with political rights — paying taxes or owning property doesn\'t create it',
        hook: 'Living somewhere and belonging to it legally are two different things. A resident gets a guest pass; a citizen gets a vote. India\'s Constitution (Articles 5–11) draws that line and lets Parliament write the rules.',
    },
    teaching: [
        { title: 'Rights: Freedoms Guaranteed by the Constitution', text: 'Rights are legal, social, and moral freedoms guaranteed to individuals by the Constitution of India, specifically under Part III (Articles 12-35), protecting citizens from state overreach and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_civ_ch4_4', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort the crowd at an international cricket match: tourists, foreign residents, diplomats\' children born in Delhi, naturalised citizens. Who can vote, who can hold office, who gets an Indian passport — and why?',
        labels: ['Rights: Freedoms Guaranteed by', 'Fundamental Rights: Equality, Freedom,', 'Right to Equality: Treating', 'Right to Freedom', 'Duties: Responsibilities of Citizens', 'Fundamental Duties: Constitutional Obligations'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_civ_ch4_7', title: 'Right to Freedom of Speech and Expression',
          caseStudy: { intro: 'Imagine you see a student writing a critical letter to the school newspaper about the canteen food quality, and the principal threatens to suspend them.',
            decisions: [{ prompt: 'Which Article of the Indian Constitution specifically guarantees the Right to Freedom of Speech and Expression to all citizens?', options: [
                { text: 'Article 19(1)(a) guarantees the Right to Freedom of Speech and Expression', outcome: 'Article 19(1)(a) guarantees the Right to Freedom of Speech and Expression.' },
                { text: 'Freedom of Speech and Expression', outcome: 'Not quite — Students often believe that "Freedom of Speech and Expression" means a citizen can say or publish.', reveals: 'freedom-of-speech-and-expression' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch4_4', title: 'Use it in the wild',
          caseStudy: { intro: 'A foreign businessman who has lived in Pune for six years, pays all local taxes and employs fifty people demands a voter ID: \'I pay my share and live here — that makes me a citizen.\'',
            decisions: [{ prompt: 'Does residence plus taxes make him an Indian citizen?', options: [
                { text: 'No — citizenship is a legal membership defined by the Constitution and law (birth, descent, naturalisation), carrying political rights like voting and office. He is a resident with civil protections, and paying taxes does not purchase political membership.', outcome: 'This separates legal membership from mere presence and contribution — the exact distinction Articles 5-11 and citizenship law draw.' },
                { text: 'Yes — anyone who lives in a country long enough and pays taxes has earned the vote automatically.', outcome: 'Residency and tax-paying are obligations of anyone present, not membership; without naturalisation he remains a foreign national however long he stays.', reveals: 'taxes-buy-citizenship' },
                { text: 'Yes, but only if he also owns property — property plus residence together complete the requirements.', outcome: 'Neither taxes nor property figure in the constitutional routes to citizenship; adding a property clause invents a rule that does not exist.', reveals: 'property-completes-it' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch4_9', title: 'You made it',
          caseStudy: { intro: 'Citizenship is a legal bond of rights and duties, not just an address. It can come by birth, descent or naturalisation — and it\'s what turns a resident into a member who can vote and be voted for.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_civ_ch4_4', difficulty: 'standard',
          question: 'Rights are legal, social, and moral freedoms guaranteed to individuals by the.',
          hint: 'Review c7_civ_ch02_008 (Fundamental Rights: Meaning and Categories) to reinforce how.',
          misconception: 'Students often believe that rights are granted by the government of the day as a gift or reward for good behavior.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rights are legal, social, and moral freedoms guaranteed to individuals by the',
                  options: ['Rights are legal, social, and moral freedoms guaranteed to individuals by the', 'A citizen is a legal member of a sovereign country who enjoys full civil and political', 'Discrimination is the unfair or prejudicial treatment of individuals or groups based on', 'Inclusion is the democratic principle and practice of ensuring that every member of'],
                  hint: 'Review c7_civ_ch02_008 (Fundamental Rights: Meaning and Categories) to reinforce how rights protect.',
                  misconception: 'Students often believe that rights are granted by the government of the day as a gift or reward for good behavior, rather than being.' }
          ],
            remediations: { 'rights-are-granted-by-the': { steps: ['Remind the student that the government itself is created by the Constitution and is bound by it.', 'Use the analogy of a school principal: the principal creates school rules, but even the principal must follow the.', 'Emphasize that Fundamental Rights are designed precisely to protect citizens *from* government abuse, not to.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch4_5', difficulty: 'standard',
          question: 'Fundamental Rights in the Indian Constitution (Articles 12-35) are the basic.',
          hint: 'Review c7_civ_ch02_008 to reinforce the five core categories of Fundamental Rights before.',
          misconception: 'Students often believe that Fundamental Rights protect them *only* from private individuals or bullies, failing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Fundamental Rights in the Indian Constitution (Articles 12-35) are the basic civil and',
                  options: ['Fundamental Rights in the Indian Constitution (Articles 12-35) are the basic civil and', 'A citizen is a legal member of a sovereign country who enjoys full civil and political', 'Discrimination is the unfair or prejudicial treatment of individuals or groups based on', 'Inclusion is the democratic principle and practice of ensuring that every member of'],
                  hint: 'Review c7_civ_ch02_008 to reinforce the five core categories of Fundamental Rights before.',
                  misconception: 'Students often believe that Fundamental Rights protect them *only* from private individuals or bullies, failing to realize that Fundamental.' }
          ],
            remediations: { 'fundamental-rights-protect-them-only': { steps: ['Review Article 12 of the Constitution, which defines what constitutes "the State" (including government departments.', 'Use a clear example: if a private school expels a student unfairly, it is a contract or administrative dispute, but.', 'Emphasize that Fundamental Rights act as a check specifically on government power.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch4_6', difficulty: 'standard',
          question: 'The Right to Equality, guaranteed under Articles 14 to 18 of the Indian.',
          hint: 'Review c7_civ_ch02_008 (Fundamental Rights: Meaning and Categories) to reinforce how.',
          misconception: 'Students often believe that the Right to Equality means treating every single person in the exact same way.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Right to Equality, guaranteed under Articles 14 to 18 of the Indian Constitution,',
                  options: ['The Right to Equality, guaranteed under Articles 14 to 18 of the Indian Constitution,', 'A citizen is a legal member of a sovereign country who enjoys full civil and political', 'Discrimination is the unfair or prejudicial treatment of individuals or groups based on', 'Inclusion is the democratic principle and practice of ensuring that every member of'],
                  hint: 'Review c7_civ_ch02_008 (Fundamental Rights: Meaning and Categories) to reinforce how rights are.',
                  misconception: 'Students often believe that the Right to Equality means treating every single person in the exact same way mathematically, failing.' }
          ],
            remediations: { 'the-right-to-equality-means': { steps: ['To fix this misconception, use the analogy of a running race where runners start at different points due to past.', 'Remind the student of Article 15(4) and Article 16(4) which permit the state to make special provisions for the.', 'Explain that true equality is about leveling the playing field, not ignoring existing inequalities.', 'Show how substantive equality ensures that everyone has an equal *chance* to cross the finish line.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch4_7', difficulty: 'standard',
          question: 'The Right to Freedom of Speech and Expression is a Fundamental Right guaranteed.',
          hint: 'Review c6_civics_ch10_004 and Article 19 of the Indian Constitution to understand the.',
          misconception: 'Students often believe that "Freedom of Speech and Expression" means a citizen can say or publish absolutely anything.',
          parts: [
                { id: 'a', prompt: 'Which Article of the Indian Constitution specifically guarantees the Right to Freedom of Speech and Expression to all citizens?', answer: 'Article 19(1)(a) guarantees the Right to Freedom of Speech and Expression',
                  options: ['Article 19(1)(a) guarantees the Right to Freedom of Speech and Expression', 'Freedom of Speech and Expression'],
                  hint: 'Review c6_civics_ch10_004 and Article 19 of the Indian Constitution to understand the distinction.',
                  misconception: 'Students often believe that "Freedom of Speech and Expression" means a citizen can say or publish absolutely anything about anyone at any.' },
                { id: 'b', prompt: 'A student argues that because India has freedom of speech, anyone should be allowed to shout false warnings of a fire in a crowded auditorium as a joke.', answer: 'The reasoning is incorrect',
                  options: ['The reasoning is incorrect', 'Freedom of Speech and Expression'],
                  hint: 'Review c6_civics_ch10_004 and Article 19 of the Indian Constitution to understand the distinction.',
                  misconception: 'Students often believe that "Freedom of Speech and Expression" means a citizen can say or publish absolutely anything about anyone at any.' },
                { id: 'c', prompt: 'A local government bans a peaceful street play that satirizes a new sanitation tax policy, claiming it makes the administration look bad.', answer: 'Yes, the ban violates Article 19(1)(a)',
                  options: ['Yes, the ban violates Article 19(1)(a)', 'Freedom of Speech and Expression'],
                  hint: 'Review c6_civics_ch10_004 and Article 19 of the Indian Constitution to understand the distinction.',
                  misconception: 'Students often believe that "Freedom of Speech and Expression" means a citizen can say or publish absolutely anything about anyone at any.' }
          ],
            remediations: { 'freedom-of-speech-and-expression': { steps: ['Remediate this by examining the exact wording of Article 19(2) of the Indian Constitution.', 'Show students that freedom of speech is followed by explicit exceptions such as defamation, contempt of court, public.', 'Use the real-world example of libel laws: explain that while you can criticize a mayor\'s policy, you cannot invent.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch4_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "Freedom of Speech and Expression" means a citizen can say or publish absolutely anything.',
          parts: [
                { id: 'a', prompt: 'Assess whether a social media platform should be held legally liable when users post unverified rumors that incite communal riots.', answer: 'Blocking such content does not violate freedom of speech',
                  options: ['Blocking such content does not violate freedom of speech', 'Freedom of Speech and Expression'],
                  hint: 'Review c6_civics_ch10_004 and Article 19 of the Indian Constitution to understand the distinction.',
                  misconception: 'Students often believe that "Freedom of Speech and Expression" means a citizen can say or publish absolutely anything about anyone at any.' }
          ],
            remediations: { 'freedom-of-speech-and-expression': { steps: ['Remediate this by examining the exact wording of Article 19(2) of the Indian Constitution.', 'Show students that freedom of speech is followed by explicit exceptions such as defamation, contempt of court, public.', 'Use the real-world example of libel laws: explain that while you can criticize a mayor\'s policy, you cannot invent.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch4_8', difficulty: 'standard',
          question: 'Duties are moral and legal responsibilities that citizens owe to their nation.',
          hint: 'Review c6_civics_ch10_007 on how rights and duties are two sides of the same coin.',
          misconception: 'Students often believe that because Fundamental Duties are not legally punishable by courts for non-performance (unlike.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Duties are moral and legal responsibilities that citizens owe to their nation and society',
                  options: ['Duties are moral and legal responsibilities that citizens owe to their nation and society', 'A citizen is a legal member of a sovereign country who enjoys full civil and political', 'Discrimination is the unfair or prejudicial treatment of individuals or groups based on', 'Inclusion is the democratic principle and practice of ensuring that every member of'],
                  hint: 'Review c6_civics_ch10_007 on how rights and duties are two sides of the same coin.',
                  misconception: 'Students often believe that because Fundamental Duties are not legally punishable by courts for non-performance (unlike Fundamental Rights.' }
          ],
            remediations: { 'because-fundamental-duties-are-not': { steps: ['To fix this, look at a real-world example: traffic rules or public cleanliness.', 'Explain that while a police officer might not arrest you for littering a park, if every citizen decides to litter.', 'Show students that constitutional duties are the social glue that prevents a democracy from descending into chaos.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch4_9', difficulty: 'standard',
          question: 'Fundamental Duties are moral and civic obligations outlined in Article 51A.',
          hint: 'Review c8_civ_ch4_8 to reinforce the basic meaning of civic duties and how they contrast.',
          misconception: 'Students often believe that because Fundamental Duties are listed in the Constitution, police can arrest anyone.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Fundamental Duties are moral and civic obligations outlined in Article 51A of the Indian',
                  options: ['Fundamental Duties are moral and civic obligations outlined in Article 51A of the Indian', 'A citizen is a legal member of a sovereign country who enjoys full civil and political', 'Discrimination is the unfair or prejudicial treatment of individuals or groups based on', 'Inclusion is the democratic principle and practice of ensuring that every member of'],
                  hint: 'Review c8_civ_ch4_8 to reinforce the basic meaning of civic duties and how they contrast with.',
                  misconception: 'Students often believe that because Fundamental Duties are listed in the Constitution, police can arrest anyone immediately for failing.' }
          ],
            remediations: { 'because-fundamental-duties-are-listed': { steps: ['To fix this, guide the student to examine the difference between Part III (Fundamental Rights) and Part IV-A.', 'Explain that while Article 32 allows citizens to approach courts directly to protect their rights, Article 51A sets out.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
