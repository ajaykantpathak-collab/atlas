import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch02_p1: SimDef = {
    id: 'v3_c11_ps_ch02_p1',
    title: 'Freedom · Part 1/2',
    subtitle: 'Learn why a free person needs rules, not just an empty field.',
    classLevel: 11, subject: 'political_science', topic: 'Freedom · Part 1/2',
    chapters: ['c11_ps_ch02'],
    nodeIds: ['c11_ps_cbse_02_001', 'c11_ps_cbse_02_002', 'c11_ps_cbse_02_003', 'c11_ps_cbse_02_004', 'c11_ps_cbse_02_005', 'c11_ps_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a citizen measuring freedom by its protected core', intro: 'Absolute absence of constraint sounds like freedom — until you ask whose constraint disappears first, and whose arrives next.', goal: 'Distinguish negative and positive liberty and license from freedom.' },
    discovery: {
        question: '\'Freedom means doing whatever I want, whenever I want, with no one stopping me.\' Is that the textbook\'s freedom?',
        options: ['No — that\'s license; freedom is a protected minimum area of non-interference that itself requires rules to defend', 'Yes — any constraint is unfreedom', 'Yes — laws and freedom can\'t coexist', 'No — freedom only means free speech'],
        answer: 'No — that\'s license; freedom is a protected minimum area of non-interference that itself requires rules to defend',
        hook: 'Aung San Suu Kyi\'s \'freedom from fear\' is positive liberty — an internal condition the mere absence of state interference can\'t supply; caste and poverty constrain without a policeman in sight.',
    },
    teaching: [
        { title: 'The Ideal of Freedom: Why freedom is valued', text: 'Freedom, as an ideal, is the condition that allows individuals to be in control of their own lives and destinies, enabling them to make autonomous choices and develop their potential.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Place \'freedom from fear\' on the negative/positive liberty map, then judge whether a state that simply stops interfering produces free people.',
        labels: ['The Ideal of Freedom', 'Negative Liberty: Freedom from', 'Positive Liberty: Freedom as', 'Negative vs Positive Liberty', 'Constraints on freedom: Coercion,', 'Harm Principle: J.S. Mill'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_02_001', title: 'The Ideal of Freedom: Why freedom is valued',
          caseStudy: { intro: 'Imagine a Class 11 student, Priya, who wants to pursue a career in music, but her parents insist she prepare for a government job because it is "secure." Priya.',
            decisions: [{ prompt: 'According to the NCERT text, what are the two dimensions of freedom discussed in the chapter "Freedom"?', options: [
                { text: 'The two dimensions are **Negative Liberty** (freedom as the absence of external', outcome: 'The two dimensions are **Negative Liberty** (freedom as the absence of external.' },
                { text: 'Political and Economic freedom', outcome: 'Not quite — **Misconception:** "Freedom means I can do whatever I want, whenever I want, without anyone.', reveals: 'misconception-freedom-means-i-can' },
                { text: 'Freedom of Expression', outcome: 'Not quite — **Misconception:** "Freedom means I can do whatever I want, whenever I want, without anyone.', reveals: 'misconception-freedom-means-i-can' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_02_002', title: 'Negative Liberty: Freedom from external constraints (Isaiah Berlin)',
          caseStudy: { intro: 'Imagine a Class 11 student, Rohan, who wants to wear a turban to school as an expression of his faith, but the school uniform policy prohibits headgear.',
            decisions: [{ prompt: 'According to Isaiah Berlin\'s concept of negative liberty, what constitutes the core criterion for an individual to be considered \'free\'.', options: [
                { text: 'The core criterion is the absence of external constraints or interference by other agents', outcome: 'The core criterion is the absence of external constraints or interference by other agents.' },
                { text: 'freedom to achieve one\'s potential', outcome: 'Not quite — Students often equate \'negative liberty\' with \'total absence of all rules\' (anarchy) or confuse.', reveals: 'students-often-equate-negative-liberty' },
                { text: 'freedom from internal fears', outcome: 'Not quite — Students often equate \'negative liberty\' with \'total absence of all rules\' (anarchy) or confuse.', reveals: 'students-often-equate-negative-liberty' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_02_003', title: 'Positive Liberty: Freedom as self-mastery and autonomy',
          caseStudy: { intro: 'Imagine a Class 11 student, Priya, who wants to become a scientist but lacks access to a good laboratory, quality textbooks, and mentorship.',
            decisions: [{ prompt: 'Define positive liberty in one sentence using the "freedom to" formulation.', options: [
                { text: 'Positive liberty is the freedom to act as an autonomous agent, to govern oneself, and to', outcome: 'Positive liberty is the freedom to act as an autonomous agent, to govern oneself, and to have the.' },
                { text: 'absence of restrictions', outcome: 'Not quite — Students often believe positive liberty means the state should provide everything people want.', reveals: 'positive-liberty-means-the-state' },
                { text: 'state giving people whatever they want', outcome: 'Not quite — Students often believe positive liberty means the state should provide everything people want.', reveals: 'positive-liberty-means-the-state' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_02_004', title: 'Negative vs Positive Liberty: Key differences and debate',
          caseStudy: { intro: 'Imagine a student who wants to become a musician but their parents force them to study engineering.',
            decisions: [{ prompt: 'Define negative liberty and positive liberty in one sentence each, using the phrases "freedom from" and "freedom to" respectively.', options: [
                { text: 'Negative liberty is "freedom from" external interference, defining a minimum area of', outcome: 'Negative liberty is "freedom from" external interference, defining a minimum area.' },
                { text: 'absence of constraints', outcome: 'Not quite — Students think **negative liberty means "no rules at all" (anarchy)** and **positive liberty means.', reveals: 'negative-liberty-means-no-rules' },
                { text: 'no rules at all', outcome: 'Not quite — Students think **negative liberty means "no rules at all" (anarchy)** and **positive liberty means.', reveals: 'negative-liberty-means-no-rules' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_02_005', title: 'Constraints on freedom: Coercion, ignorance, and social pressure',
          caseStudy: { intro: 'Imagine a Class 11 student, Priya, who wants to become a professional footballer.',
            decisions: [{ prompt: 'List the three types of constraints on freedom discussed in this chapter and give a one‑sentence example of each from everyday Indian life.', options: [
                { text: 'Correct answer: (1) Coercion – e.g., a state law banning a book', outcome: 'Correct answer: (1) Coercion – e.g., a state law banning a book; (2) Ignorance – e.g., a villager.' },
                { text: 'only state laws or physical force count as “real” constraints on freedom', outcome: 'Not quite — Students often believe that only state laws or physical force count as “real” constraints.', reveals: 'only-state-laws-or-physical' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_02_006', title: 'Harm Principle: J.S. Mill on the limits of state interference',
          caseStudy: { intro: 'Imagine a Class 11 student, Arjun, who wants to dye his hair bright blue before the board exams.',
            decisions: [{ prompt: 'State Mill\'s Harm Principle in one sentence, explicitly mentioning the distinction between self-regarding and other-regarding actions.', options: [
                { text: 'Mill\'s Harm Principle holds that the only legitimate reason for society or the state to', outcome: 'Mill\'s Harm Principle holds that the only legitimate reason for society or the state to interfere.' },
                { text: 'serious harm', outcome: 'Not quite — Students often believe the Harm Principle means "you can do whatever you want as long as you don\'t.', reveals: 'the-harm-principle-means-you' },
                { text: 'you can do whatever you want as long as you don\'t physically hit someone', outcome: 'Not quite — Students often believe the Harm Principle means "you can do whatever you want as long as you don\'t.', reveals: 'the-harm-principle-means-you' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_02_001', title: 'A real-world call',
          caseStudy: { intro: 'A government wants sweeping powers to fight a security threat — surveillance, faster trials, fewer checks. Supporters say safety demands it; critics say safety that costs liberty isn\'t safety.',
            decisions: [{ prompt: 'How much freedom should safety cost?', options: [
                { text: 'Some — rights without security are theoretical', outcome: 'True — but \'temporary\' powers have a habit of becoming permanent; every democracy that\'s lost them started this way.' },
                { text: 'None — rights are the point of the country', outcome: 'The principled position; absolute versions of it have struggled when the threat is real and immediate.' },
                { text: 'Only with a sunset — powers that expire and must be re-argued', outcome: 'The constitutional answer — emergency powers that auto-expire force each generation to re-justify them.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a debate on free speech, a student argues: \'Freedom means zero constraints — Article 19 gives me speech with no limits, so \'reasonable restrictions\' are unconstitutional in spirit.\'',
            decisions: [{ prompt: 'How do negative and positive liberty answer him?', options: [
                { text: 'Clarify what liberty is: freedom isn\'t license — no one in society enjoys total absence of constraints, and laws against harm are the precondition for everyone\'s freedom. Negative liberty protects a minimum area of non-interference, but that area is defined BY legal boundaries like Article 19(2) restrictions; positive liberty adds the enabling conditions (education, security) that make freedom usable, not just unobstructed.', outcome: 'He reframes: 19(2) isn\'t a betrayal of 19(1) but the mechanism that draws the protected zone\'s edge — and real freedom needs capacity, not just absence of interference.' },
                { text: 'Support him — any restriction on speech is a violation of freedom, full stop.', outcome: 'That collapses liberty into license: the classic \'fire in a crowded theatre\' shows why the minimum area is bounded by harm to others\' equal freedom.', reveals: 'freedom-is-license' },
                { text: 'Split the difference — negative liberty is the real freedom; positive liberty is a welfare add-on.', outcome: 'Without enabling conditions the protected zone is empty: a right to speak means little to someone denied education or safety — both dimensions constitute freedom.', reveals: 'positive-liberty-is-optional' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Remove every law and the strong constrain the weak — a free society needs rules precisely so that interference has a border.',
            decisions: [{ prompt: 'What comes next? Freedom · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Freedom · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_001', difficulty: 'standard',
          question: 'Freedom, as an ideal, is the condition that allows individuals to be in control.',
          hint: 'Revisit Class 9 Civics Ch 2 \'Constitutional Design\' (Fundamental Rights) and Class 10.',
          misconception: '**Misconception:** "Freedom means I can do whatever I want, whenever I want, without anyone stopping me." (Equating.',
          parts: [
                { id: 'a', prompt: 'According to the NCERT text, what are the two dimensions of freedom discussed in the chapter "Freedom"?', answer: 'The two dimensions are **Negative Liberty** (freedom as the absence of external',
                  options: ['The two dimensions are **Negative Liberty** (freedom as the absence of external', 'Political and Economic freedom', 'Freedom of Expression'],
                  hint: 'Revisit Class 9 Civics Ch 2 \'Constitutional Design\' (Fundamental Rights) and Class 10 Civics Ch 5.',
                  misconception: '**Misconception:** "Freedom means I can do whatever I want, whenever I want, without anyone stopping me." (Equating Freedom with.' }
          ],
            remediations: { 'misconception-freedom-means-i-can': { steps: ['20, Para 1:** "No individual living in society can hope to enjoy total absence of any kind of constraints." 2.', '**Concrete Activity:** List 5 constraints you follow daily (uniform, traffic signals, submission deadlines, library.', 'For each, ask: "Does this constraint *destroy* my freedom, or *enable* a larger freedom?" (e.g., Traffic signals.', '**Key Distinction:** Memorise the NCERT phrase: **"Socially necessary constraints" vs "Unjust restrictions."** The.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Freedom means I can do whatever I want, whenever I want, without anyone stopping me." (Equating.',
          parts: [
                { id: 'a', prompt: 'Aung San Suu Kyi defines real freedom as **"freedom from fear."** Evaluate this claim: Does "freedom from fear" belong to Negative Liberty (absence of external.', answer: 'It bridges **both**',
                  options: ['It bridges **both**', 'Freedom of Expression'],
                  hint: 'Revisit Class 9 Civics Ch 2 \'Constitutional Design\' (Fundamental Rights) and Class 10 Civics Ch 5.',
                  misconception: '**Misconception:** "Freedom means I can do whatever I want, whenever I want, without anyone stopping me." (Equating Freedom with.' },
                { id: 'b', prompt: '**Create:** Draft a 100-word preamble for a "Student Charter of Freedom" for your school.', answer: '**Criteria for a good answer:** 1',
                  options: ['**Criteria for a good answer:** 1', 'Freedom of Expression'],
                  hint: 'Revisit Class 9 Civics Ch 2 \'Constitutional Design\' (Fundamental Rights) and Class 10 Civics Ch 5.',
                  misconception: '**Misconception:** "Freedom means I can do whatever I want, whenever I want, without anyone stopping me." (Equating Freedom with.' }
          ],
            remediations: { 'misconception-freedom-means-i-can': { steps: ['20, Para 1:** "No individual living in society can hope to enjoy total absence of any kind of constraints." 2.', '**Concrete Activity:** List 5 constraints you follow daily (uniform, traffic signals, submission deadlines, library.', 'For each, ask: "Does this constraint *destroy* my freedom, or *enable* a larger freedom?" (e.g., Traffic signals.', '**Key Distinction:** Memorise the NCERT phrase: **"Socially necessary constraints" vs "Unjust restrictions."** The.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_002', difficulty: 'standard',
          question: 'Negative liberty, as articulated by Isaiah Berlin, refers to the absence.',
          hint: 'Revisit Mill\'s Harm Principle (node c11_ps_cbse_02_006 preview) and the NCERT \'Let\'s.',
          misconception: 'Students often equate \'negative liberty\' with \'total absence of all rules\' (anarchy) or confuse it with \'freedom to.',
          parts: [
                { id: 'a', prompt: 'A state passes a law banning all religious symbols in public schools to promote secular equality.', answer: 'Yes, it violates negative liberty',
                  options: ['Yes, it violates negative liberty', 'it\'s justified because equality is more important', 'it\'s never justified'],
                  hint: 'Revisit Mill\'s Harm Principle (node c11_ps_cbse_02_006 preview) and the NCERT \'Let\'s Think: Dress.',
                  misconception: 'Students often equate \'negative liberty\' with \'total absence of all rules\' (anarchy) or confuse it with \'freedom to do whatever I want\'.' }
          ],
            remediations: { 'students-often-equate-negative-liberty': { steps: ['If the student conflates negative liberty with license or anarchy: 1) Have them read Article 19(1) and 19(2) of the.', '2) Ask: "Does 19(2) destroy 19(1) or define its boundary?" 3) Use the NCERT\'s traffic signal analogy: the state.', '4) Assign a 100-word write-up: "Why a right without a remedy (or boundary) is not a right."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_003', difficulty: 'standard',
          question: 'Positive liberty is the freedom to be one\'s own master, involving the capacity.',
          hint: 'Review the "minimum area of non-interference" concept in c11_ps_cbse_02_002 and the.',
          misconception: 'Students often believe positive liberty means the state should provide everything people want, confusing "enabling.',
          parts: [
                { id: 'a', prompt: 'A state provides free higher education to all citizens but bans student unions and political activity on campuses.', answer: 'The policy partially promotes positive liberty by providing material resources',
                  options: ['The policy partially promotes positive liberty by providing material resources', 'it promotes positive liberty', 'it undermines positive liberty completely', 'enabling conditions for autonomy'],
                  hint: 'Review the "minimum area of non-interference" concept in c11_ps_cbse_02_002 and the distinction.',
                  misconception: 'Students often believe positive liberty means the state should provide everything people want, confusing "enabling conditions for autonomy".' }
          ],
            remediations: { 'positive-liberty-means-the-state': { steps: ['If a student holds this misconception, use the Mid-Day Meal Scheme as a case study: Step 1 – Identify the scheme\'s goal.', 'Step 2 – Ask: Does it force children to eat?', 'Step 3 – Ask: Does it enable them to study better?', 'Step 4 – Conclude: It creates conditions for autonomy (learning) without dictating choices, illustrating positive.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_004', difficulty: 'standard',
          question: 'Negative liberty is the absence of external constraints or interference that.',
          hint: 'Re-read NCERT Section 2.5 (pages 26-28) focusing on the phrases "minimum area.',
          misconception: 'Students think **negative liberty means "no rules at all" (anarchy)** and **positive liberty means "the state provides.',
          parts: [
                { id: 'a', prompt: 'Compare how negative liberty and positive liberty theorists would view the state\'s role in providing *free public higher education*.', answer: 'Negative liberty (e.g., Mill, Berlin): The state should not *prevent* private',
                  options: ['Negative liberty (e.g., Mill, Berlin): The state should not *prevent* private', 'both support free education', 'no rules at all', 'the state provides everything for free'],
                  hint: 'Re-read NCERT Section 2.5 (pages 26-28) focusing on the phrases "minimum area of non-interference".',
                  misconception: 'Students think **negative liberty means "no rules at all" (anarchy)** and **positive liberty means "the state provides everything for free".' }
          ],
            remediations: { 'negative-liberty-means-no-rules': { steps: ['If stuck on the misconception, do this 3-step exercise using the NCERT "Mao suit" and "Sania Mirza fatwa" examples.', '**Classify**: For each, identify if the constraint comes from state (Mao suit), religious authority (fatwa),.', '**Map to Liberty**: Mao suit = state destroys negative liberty (no choice) *and* perverts positive liberty (forced.', 'Fatwa = non-state actor violating negative liberty.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_005', difficulty: 'standard',
          question: 'Constraints on freedom refer to limitations that prevent individuals from.',
          hint: 'Revisit c11_ps_cbse_02_002 (Negative Liberty) and the distinction between “freedom from”.',
          misconception: 'Students often believe that only state laws or physical force count as “real” constraints on freedom.',
          parts: [
                { id: 'a', prompt: 'List the three types of constraints on freedom discussed in this chapter and give a one‑sentence example of each from everyday Indian life.', answer: 'Correct answer: (1) Coercion – e.g., a state law banning a book',
                  options: ['Correct answer: (1) Coercion – e.g., a state law banning a book', 'only state laws or physical force count as “real” constraints on freedom'],
                  hint: 'Revisit c11_ps_cbse_02_002 (Negative Liberty) and the distinction between “freedom from” and.',
                  misconception: 'Students often believe that only state laws or physical force count as “real” constraints on freedom.' },
                { id: 'b', prompt: 'Explain why ignorance is considered a constraint on freedom even though no one is physically forcing the person to act or not act.', answer: 'Correct answer: Freedom requires the capacity to make informed choices',
                  options: ['Correct answer: Freedom requires the capacity to make informed choices', 'ignorance is not a constraint', 'only state laws or physical force count as “real” constraints on freedom'],
                  hint: 'Revisit c11_ps_cbse_02_002 (Negative Liberty) and the distinction between “freedom from” and.',
                  misconception: 'Students often believe that only state laws or physical force count as “real” constraints on freedom.' },
                { id: 'c', prompt: 'Compare coercion and social pressure: which is more difficult to challenge in a democratic society, and why?', answer: 'Correct answer: Social pressure is often harder to challenge',
                  options: ['Correct answer: Social pressure is often harder to challenge', 'coercion is worse', 'only state laws or physical force count as “real” constraints on freedom'],
                  hint: 'Revisit c11_ps_cbse_02_002 (Negative Liberty) and the distinction between “freedom from” and.',
                  misconception: 'Students often believe that only state laws or physical force count as “real” constraints on freedom.' }
          ],
            remediations: { 'only-state-laws-or-physical': { steps: ['Re‑read the NCERT passage on “Sources of Constraints” (pages 21‑22) and highlight the three categories.', 'Watch a 5‑minute clip from the documentary *India Untouched* (caste‑based social pressure) and note where no law.', 'Write two parallel columns: “Legal coercion” vs.', '“Social pressure” for the same issue (e.g., inter‑caste marriage) to see how both operate.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_006', difficulty: 'standard',
          question: 'The Harm Principle, articulated by J.S. Mill in *On Liberty* (1859), states.',
          hint: 'Revisit the "Negative Liberty" node (c11_ps_cbse_02_002) and the "Constraints on Freedom".',
          misconception: 'Students often believe the Harm Principle means "you can do whatever you want as long as you don\'t physically hit.',
          parts: [
                { id: 'a', prompt: 'Explain why Mill argues that playing loud music in an apartment building should attract only social disapproval (e.g., neighbours refusing to greet the person).', answer: 'Mill classifies loud music as an other-regarding action causing *minor* harm',
                  options: ['Mill classifies loud music as an other-regarding action causing *minor* harm', 'loud music causes no harm', 'you can do whatever you want as long as you don\'t physically hit someone'],
                  hint: 'Revisit the "Negative Liberty" node (c11_ps_cbse_02_002) and the "Constraints on Freedom" node.',
                  misconception: 'Students often believe the Harm Principle means "you can do whatever you want as long as you don\'t physically hit someone." They miss two.' }
          ],
            remediations: { 'the-harm-principle-means-you': { steps: ['If a student conflates "harm" with "physical violence only" or thinks the Harm Principle protects against all social.', '25) — have them classify each case (Mao suits, Sania Mirza fatwa, cricket whites, school uniform) as self-regarding.', '(2) Walk through Mill\'s own example of the corn dealer: "If he says corn dealers starve the poor in a newspaper, it\'s.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
