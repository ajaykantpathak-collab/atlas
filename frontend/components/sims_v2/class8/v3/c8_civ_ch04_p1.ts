import type { SimDef } from '../../engine/types';

/** v3 generated — c8_civ_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_civ_ch04_p1: SimDef = {
    id: 'v3_c8_civ_ch04_p1',
    title: 'Citizenship: Rights and Duties · Part 1/2',
    subtitle: 'Find out who really belongs — and why',
    classLevel: 8, subject: 'civics', topic: 'Citizenship: Rights and Duties · Part 1/2',
    chapters: ['c8_civ_ch04'],
    nodeIds: ['c8_civ_ch4_1', 'c8_civ_ch4_10', 'c8_civ_ch4_11', 'c8_civ_ch4_12', 'c8_civ_ch4_2', 'c8_civ_ch4_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a citizenship verification officer', intro: 'Everyone in the stadium is cheering for India, but only some of them can elect its government. Your job: figure out where the legal line between resident and citizen is drawn.', goal: 'Understand citizenship as legal membership of a state — how it differs from residency, how it is acquired, and how Articles 5–11 of the Constitution frame it.' },
    discovery: {
        question: 'A foreign business owner has lived in India for five years, pays taxes and owns property — but still can\'t vote in Indian elections. Why not?',
        options: ['Citizenship is a legal membership with political rights — paying taxes or owning property doesn\'t create it', 'The election office probably lost his paperwork', 'He just hasn\'t queued up long enough', 'Anyone who pays taxes automatically becomes a citizen'],
        answer: 'Citizenship is a legal membership with political rights — paying taxes or owning property doesn\'t create it',
        hook: 'Living somewhere and belonging to it legally are two different things. A resident gets a guest pass; a citizen gets a vote. India\'s Constitution (Articles 5–11) draws that line and lets Parliament write the rules.',
    },
    teaching: [
        { title: 'Citizen: Definition and Legal Membership in a Country', text: 'A citizen is a legal member of a sovereign country who enjoys full civil and political rights and owes allegiance to the state.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_civ_ch4_1', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort the crowd at an international cricket match: tourists, foreign residents, diplomats\' children born in Delhi, naturalised citizens. Who can vote, who can hold office, who gets an Indian passport — and why?',
        labels: ['Citizen: Definition and Legal', 'Discrimination: Unfair Treatment Based', 'Inclusion: Ensuring No One', 'Active Citizenship: Participation', 'Citizenship Act of 1955', 'Citizenship (Amendment) Act'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_civ_ch4_1', title: 'Citizen: Definition and Legal Membership in a Country',
          caseStudy: { intro: 'Imagine traveling to an international cricket match in Mumbai where spectators from different countries are cheering in the stands; while tourists can visit.',
            decisions: [{ prompt: 'What is the primary legal distinction between an Indian citizen and a foreign tourist visiting India?', options: [
                { text: 'An Indian citizen enjoys full political and civil rights, including the right to vote in', outcome: 'An Indian citizen enjoys full political and civil rights, including the right to vote in elections.' },
                { text: 'nationality', outcome: 'Not quite — Students often confuse "nationality" and "citizenship" as completely interchangeable terms,.', reveals: 'students-often-confuse-nationality-and' },
                { text: 'citizenship', outcome: 'Not quite — Students often confuse "nationality" and "citizenship" as completely interchangeable terms,.', reveals: 'students-often-confuse-nationality-and' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch4_11', title: 'Inclusion: Ensuring No One Is Left Out',
          caseStudy: { intro: 'Imagine walking into a school playground where a high brick wall blocks children in wheelchairs from joining the cricket game, while students who can run play.',
            decisions: [{ prompt: 'What is the primary difference between formal equality and inclusion?', options: [
                { text: 'Formal equality means treating everyone the exact same way under the law, whereas', outcome: 'Formal equality means treating everyone the exact same way under the law, whereas inclusion.' },
                { text: 'inclusion', outcome: 'Not quite — Students often believe that "inclusion" simply means allowing marginalized people to enter a room.', reveals: 'inclusion-simply-means-allowing-marginalized' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch4_2', title: 'Citizenship Act of 1955: Rules for Gaining Citizenship',
          caseStudy: { intro: 'Imagine a Class 8 student whose parents were born in Mumbai, but who was born while her father was temporarily working on a project in Germany.',
            decisions: [{ prompt: 'What are the five statutory ways to acquire citizenship under the Citizenship Act of 1955?', options: [
                { text: 'The five ways are Birth, Descent, Registration, Naturalization, and Incorporation of', outcome: 'The five ways are Birth, Descent, Registration, Naturalization, and Incorporation of Territory.' },
                { text: 'being born in India', outcome: 'Not quite — Students often assume that anyone physically born within the geographical boundaries of India.', reveals: 'anyone-physically-born-within-the' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch4_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A foreign businessman who has lived in Pune for six years, pays all local taxes and employs fifty people demands a voter ID: \'I pay my share and live here — that makes me a citizen.\'',
            decisions: [{ prompt: 'Does residence plus taxes make him an Indian citizen?', options: [
                { text: 'No — citizenship is a legal membership defined by the Constitution and law (birth, descent, naturalisation), carrying political rights like voting and office. He is a resident with civil protections, and paying taxes does not purchase political membership.', outcome: 'This separates legal membership from mere presence and contribution — the exact distinction Articles 5-11 and citizenship law draw.' },
                { text: 'Yes — anyone who lives in a country long enough and pays taxes has earned the vote automatically.', outcome: 'Residency and tax-paying are obligations of anyone present, not membership; without naturalisation he remains a foreign national however long he stays.', reveals: 'taxes-buy-citizenship' },
                { text: 'Yes, but only if he also owns property — property plus residence together complete the requirements.', outcome: 'Neither taxes nor property figure in the constitutional routes to citizenship; adding a property clause invents a rule that does not exist.', reveals: 'property-completes-it' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch4_3', title: 'The bigger picture',
          caseStudy: { intro: 'Citizenship is a legal bond of rights and duties, not just an address. It can come by birth, descent or naturalisation — and it\'s what turns a resident into a member who can vote and be voted for.',
            decisions: [{ prompt: 'What comes next? Citizenship: Rights and Duties · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Citizenship: Rights and Duties · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_civ_ch4_1', difficulty: 'standard',
          question: 'A citizen is a legal member of a sovereign country who enjoys full civil and.',
          hint: 'Review c7_civ_ch03_010 on rights and responsibilities of citizens to reconnect with the.',
          misconception: 'Students often confuse "nationality" and "citizenship" as completely interchangeable terms, or believe that anyone who.',
          parts: [
                { id: 'a', prompt: 'Why is citizenship considered a \'legal membership\' rather than just living in a particular geographical territory?', answer: 'Citizenship is a legal membership',
                  options: ['Citizenship is a legal membership', 'nationality', 'citizenship', 'residency and citizenship are legally identical terms'],
                  hint: 'Review c7_civ_ch03_010 on rights and responsibilities of citizens to reconnect with the idea.',
                  misconception: 'Students often confuse "nationality" and "citizenship" as completely interchangeable terms, or believe that anyone who pays taxes or owns.' },
                { id: 'b', prompt: 'A person born in New Delhi to foreign diplomats temporarily posted in India claims they are automatically an Indian citizen by birth.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'nationality', 'citizenship'],
                  hint: 'Review c7_civ_ch03_010 on rights and responsibilities of citizens to reconnect with the idea.',
                  misconception: 'Students often confuse "nationality" and "citizenship" as completely interchangeable terms, or believe that anyone who pays taxes or owns.' }
          ],
            remediations: { 'students-often-confuse-nationality-and': { steps: ['To fix this misconception, compare a resident to a club member: owning a guest pass (residency/taxpaying) allows you.', 'Point out that economic contribution is separate from political membership defined by constitutional law.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch4_10', difficulty: 'standard',
          question: 'Discrimination is the unfair or prejudicial treatment of individuals or groups.',
          hint: 'Review the concept of the Right to Equality in c8_civ_ch4_6 and how constitutional.',
          misconception: 'Students often think that discrimination only occurs through explicit physical violence or verbal abuse, failing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Discrimination is the unfair or prejudicial treatment of individuals or groups based on',
                  options: ['Discrimination is the unfair or prejudicial treatment of individuals or groups based on', 'A citizen is a legal member of a sovereign country who enjoys full civil and political', 'Inclusion is the democratic principle and practice of ensuring that every member of', 'Active citizenship refers to the ongoing, meaningful participation of individuals in'],
                  hint: 'Review the concept of the Right to Equality in c8_civ_ch4_6 and how constitutional articles protect.',
                  misconception: 'Students often think that discrimination only occurs through explicit physical violence or verbal abuse, failing to recognize subtle.' }
          ],
            remediations: { 'discrimination-only-occurs-through-explicit': { steps: ['To fix this misconception, examine everyday scenarios like hiring practices or neighborhood renting patterns where.', 'Ask the student to identify who is disadvantaged and why, emphasizing that unfair exclusion from opportunities and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch4_11', difficulty: 'standard',
          question: 'Inclusion is the democratic principle and practice of ensuring that every.',
          hint: 'Review c8_civ_ch4_10 (Discrimination: Unfair Treatment Based on Identity) to understand.',
          misconception: 'Students often believe that "inclusion" simply means allowing marginalized people to enter a room or a school, assuming.',
          parts: [
                { id: 'a', prompt: 'Analyze how social discrimination acts as a barrier to political inclusion in a democratic society.', answer: 'Social discrimination creates economic dependence, social isolation, and loss of',
                  options: ['Social discrimination creates economic dependence, social isolation, and loss of', 'inclusion'],
                  hint: 'Review c8_civ_ch4_10 (Discrimination: Unfair Treatment Based on Identity) to understand how social.',
                  misconception: 'Students often believe that "inclusion" simply means allowing marginalized people to enter a room or a school, assuming that physical.' }
          ],
            remediations: { 'inclusion-simply-means-allowing-marginalized': { steps: ['To fix this misconception, use the analogy of a school cafeteria: inviting a student who speaks a different language.', 'True inclusion requires teachers to actively facilitate conversation, ensure menu options respect dietary diversity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch4_11', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "inclusion" simply means allowing marginalized people to enter a room or a school, assuming.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "Providing free mid-day meals in government schools is unnecessary because education should only focus on academics." Is this critique.', answer: 'The critique is invalid',
                  options: ['The critique is invalid', 'inclusion'],
                  hint: 'Review c8_civ_ch4_10 (Discrimination: Unfair Treatment Based on Identity) to understand how social.',
                  misconception: 'Students often believe that "inclusion" simply means allowing marginalized people to enter a room or a school, assuming that physical.' }
          ],
            remediations: { 'inclusion-simply-means-allowing-marginalized': { steps: ['To fix this misconception, use the analogy of a school cafeteria: inviting a student who speaks a different language.', 'True inclusion requires teachers to actively facilitate conversation, ensure menu options respect dietary diversity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch4_12', difficulty: 'standard',
          question: 'Active citizenship refers to the ongoing, meaningful participation.',
          hint: 'Review c8_civ_ch4_8 and c6_civics_ch12_018 to understand what responsibilities citizens.',
          misconception: 'Students often think that active citizenship means engaging in aggressive political protests, strikes, or confronting.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Active citizenship refers to the ongoing, meaningful participation of individuals in',
                  options: ['Active citizenship refers to the ongoing, meaningful participation of individuals in', 'A citizen is a legal member of a sovereign country who enjoys full civil and political', 'Discrimination is the unfair or prejudicial treatment of individuals or groups based on', 'Inclusion is the democratic principle and practice of ensuring that every member of'],
                  hint: 'Review c8_civ_ch4_8 and c6_civics_ch12_018 to understand what responsibilities citizens hold and.',
                  misconception: 'Students often think that active citizenship means engaging in aggressive political protests, strikes, or confronting government officials.' }
          ],
            remediations: { 'active-citizenship-means-engaging-in': { steps: ['To fix this misconception, guide the student through two contrasting scenarios: Scenario A where a group blocks traffic.', 'Explain that while both express dissatisfaction, Scenario B represents constructive active citizenship because.', 'Emphasize that active citizenship is about building solutions, not just breaking deadlocks.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch4_2', difficulty: 'standard',
          question: 'The Citizenship Act of 1955 is the principal Indian parliamentary legislation.',
          hint: 'Review c8_civ_ch4_1 to reinforce the distinction between a resident and a legal citizen.',
          misconception: 'Students often assume that anyone physically born within the geographical boundaries of India automatically becomes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Citizenship Act of 1955 is the principal Indian parliamentary legislation that',
                  options: ['The Citizenship Act of 1955 is the principal Indian parliamentary legislation that', 'A citizen is a legal member of a sovereign country who enjoys full civil and political', 'Discrimination is the unfair or prejudicial treatment of individuals or groups based on', 'Inclusion is the democratic principle and practice of ensuring that every member of'],
                  hint: 'Review c8_civ_ch4_1 to reinforce the distinction between a resident and a legal citizen before.',
                  misconception: 'Students often assume that anyone physically born within the geographical boundaries of India automatically becomes an Indian citizen for.' }
          ],
            remediations: { 'anyone-physically-born-within-the': { steps: ['To correct this, guide the student to examine Section 3 of the Citizenship Act step by step.', 'First, ask them to check *where* the person was born (inside India).', 'Second, ask them to look at the *date* of birth and the *legal status* of the parents (e.g., whether one parent was.', 'Explain that Parliament tightened these rules so that birth alone is no longer an unconditional blanket guarantee.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch4_3', difficulty: 'standard',
          question: 'The Citizenship (Amendment) Act (CAA) of 2019 is a specific legislative.',
          hint: 'Review node c8_civ_ch4_2 to master the standard methods of acquiring citizenship.',
          misconception: 'Students often mistakenly believe that the Citizenship (Amendment) Act of 2019 takes away the existing Indian.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Citizenship (Amendment) Act (CAA) of 2019 is a specific legislative enactment by the',
                  options: ['The Citizenship (Amendment) Act (CAA) of 2019 is a specific legislative enactment by the', 'A citizen is a legal member of a sovereign country who enjoys full civil and political', 'Discrimination is the unfair or prejudicial treatment of individuals or groups based on', 'Inclusion is the democratic principle and practice of ensuring that every member of'],
                  hint: 'Review node c8_civ_ch4_2 to master the standard methods of acquiring citizenship by naturalization.',
                  misconception: 'Students often mistakenly believe that the Citizenship (Amendment) Act of 2019 takes away the existing Indian citizenship of current Indian.' }
          ],
            remediations: { 'students-often-mistakenly-believe-that': { steps: ['To fix this misconception, review the exact text and scope of the Citizenship Act and its amendments.', 'Explain that parliamentary citizenship laws in India deal exclusively with how *foreigners* acquire citizenship.', 'Use a flowchart showing that the CAA only adds pathways for specific incoming groups rather than subtracting rights.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
