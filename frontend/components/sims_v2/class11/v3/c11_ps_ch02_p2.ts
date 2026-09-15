import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch02_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch02_p2: SimDef = {
    id: 'v3_c11_ps_ch02_p2',
    title: 'Freedom · Part 2/2',
    subtitle: 'Learn why a free person needs rules, not just an empty field.',
    classLevel: 11, subject: 'political_science', topic: 'Freedom · Part 2/2',
    chapters: ['c11_ps_ch02'],
    nodeIds: ['c11_ps_cbse_02_007', 'c11_ps_cbse_02_008', 'c11_ps_cbse_02_009', 'c11_ps_cbse_02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a citizen measuring freedom by its protected core', intro: 'Absolute absence of constraint sounds like freedom — until you ask whose constraint disappears first, and whose arrives next.', goal: 'Distinguish negative and positive liberty and license from freedom.' },
    discovery: {
        question: '\'Freedom means doing whatever I want, whenever I want, with no one stopping me.\' Is that the textbook\'s freedom?',
        options: ['No — that\'s license; freedom is a protected minimum area of non-interference that itself requires rules to defend', 'Yes — any constraint is unfreedom', 'Yes — laws and freedom can\'t coexist', 'No — freedom only means free speech'],
        answer: 'No — that\'s license; freedom is a protected minimum area of non-interference that itself requires rules to defend',
        hook: 'Aung San Suu Kyi\'s \'freedom from fear\' is positive liberty — an internal condition the mere absence of state interference can\'t supply; caste and poverty constrain without a policeman in sight.',
    },
    teaching: [
        { title: 'Freedom of expression: Arguments for and against restrictions', text: 'Freedom of expression is the constitutional right under Article 19(1)(a) to articulate opinions, ideas, and information through any medium without state interference, subject only to "reasonable.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Place \'freedom from fear\' on the negative/positive liberty map, then judge whether a state that simply stops interfering produces free people.',
        labels: ['Freedom of expression: Arguments', 'Economic freedom and', 'National self-determination as', 'Balancing freedom with other'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_02_007', title: 'Freedom of expression: Arguments for and against restrictions',
          caseStudy: { intro: 'Imagine a Class 11 student posts a satirical meme criticizing a new state education policy on Instagram, and the school principal threatens disciplinary action.',
            decisions: [{ prompt: 'State the exact constitutional provision that guarantees freedom of speech and expression in India, and the clause that permits reasonable.', options: [
                { text: 'Article 19(1)(a) guarantees the right to freedom of speech and expression', outcome: 'Article 19(1)(a) guarantees the right to freedom of speech and expression.' },
                { text: 'reasonable restriction', outcome: 'Not quite — Students often believe "reasonable restriction" means the government can restrict speech for *any.', reveals: 'reasonable-restriction-means-the-government' },
                { text: 'reasonable', outcome: 'Not quite — Students often believe "reasonable restriction" means the government can restrict speech for *any.', reveals: 'reasonable-restriction-means-the-government' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_02_009', title: 'National self-determination as a form of collective freedom',
          caseStudy: { intro: 'Imagine you are a student in a school where the student council is elected by all students, but your cultural club (say, a language or regional club) wants.',
            decisions: [{ prompt: 'Define national self-determination in one sentence, and state which dimension of liberty (negative or positive) it primarily embodies.', options: [
                { text: 'National self-determination is the right of a nation to freely determine its political', outcome: 'National self-determination is the right of a nation to freely determine its political status and.' },
                { text: 'nation', outcome: 'Not quite — Students often confuse national self-determination with the right to unilateral secession, thinking.', reveals: 'students-often-confuse-national-self' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_02_010', title: 'Balancing freedom with other values like equality and security',
          caseStudy: { intro: 'Imagine your school introduces a mandatory uniform policy citing equality and discipline, but some students argue it violates their freedom of expression.',
            decisions: [{ prompt: 'What is the \'harm principle\' as articulated by J.S. Mill, and what distinction does it draw between self-regarding and other-regarding.', options: [
                { text: 'The harm principle states that the only justification for interfering with an', outcome: 'The harm principle states that the only justification for interfering with an individual\'s liberty.' },
                { text: 'state can interfere for the person\'s own good', outcome: 'Not quite — Students often think "balancing freedom with equality" means a zero-sum trade-off where more.', reveals: 'balancing-freedom-with-equality-means' },
                { text: 'balancing freedom with equality', outcome: 'Not quite — Students often think "balancing freedom with equality" means a zero-sum trade-off where more.', reveals: 'balancing-freedom-with-equality-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_02_007', title: 'A real-world call',
          caseStudy: { intro: 'A government wants sweeping powers to fight a security threat — surveillance, faster trials, fewer checks. Supporters say safety demands it; critics say safety that costs liberty isn\'t safety.',
            decisions: [{ prompt: 'How much freedom should safety cost?', options: [
                { text: 'Some — rights without security are theoretical', outcome: 'True — but \'temporary\' powers have a habit of becoming permanent; every democracy that\'s lost them started this way.' },
                { text: 'None — rights are the point of the country', outcome: 'The principled position; absolute versions of it have struggled when the threat is real and immediate.' },
                { text: 'Only with a sunset — powers that expire and must be re-argued', outcome: 'The constitutional answer — emergency powers that auto-expire force each generation to re-justify them.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a debate on free speech, a student argues: \'Freedom means zero constraints — Article 19 gives me speech with no limits, so \'reasonable restrictions\' are unconstitutional in spirit.\'',
            decisions: [{ prompt: 'How do negative and positive liberty answer him?', options: [
                { text: 'Clarify what liberty is: freedom isn\'t license — no one in society enjoys total absence of constraints, and laws against harm are the precondition for everyone\'s freedom. Negative liberty protects a minimum area of non-interference, but that area is defined BY legal boundaries like Article 19(2) restrictions; positive liberty adds the enabling conditions (education, security) that make freedom usable, not just unobstructed.', outcome: 'He reframes: 19(2) isn\'t a betrayal of 19(1) but the mechanism that draws the protected zone\'s edge — and real freedom needs capacity, not just absence of interference.' },
                { text: 'Support him — any restriction on speech is a violation of freedom, full stop.', outcome: 'That collapses liberty into license: the classic \'fire in a crowded theatre\' shows why the minimum area is bounded by harm to others\' equal freedom.', reveals: 'freedom-is-license' },
                { text: 'Split the difference — negative liberty is the real freedom; positive liberty is a welfare add-on.', outcome: 'Without enabling conditions the protected zone is empty: a right to speak means little to someone denied education or safety — both dimensions constitute freedom.', reveals: 'positive-liberty-is-optional' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_02_010', title: 'You made it',
          caseStudy: { intro: 'Remove every law and the strong constrain the weak — a free society needs rules precisely so that interference has a border.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_007', difficulty: 'standard',
          question: 'Freedom of expression is the constitutional right under Article 19(1)(a).',
          hint: 'Revisit node c11_ps_cbse_02_006 (Harm Principle) for the self-regarding/other-regarding.',
          misconception: 'Students often believe "reasonable restriction" means the government can restrict speech for *any reason it considers.',
          parts: [
                { id: 'a', prompt: 'State the exact constitutional provision that guarantees freedom of speech and expression in India, and the clause that permits reasonable restrictions.', answer: 'Article 19(1)(a) guarantees the right to freedom of speech and expression',
                  options: ['Article 19(1)(a) guarantees the right to freedom of speech and expression', 'reasonable restriction', 'reasonable', 'hurting religious sentiments'],
                  hint: 'Revisit node c11_ps_cbse_02_006 (Harm Principle) for the self-regarding/other-regarding distinction.',
                  misconception: 'Students often believe "reasonable restriction" means the government can restrict speech for *any reason it considers reasonable* (e.g.' }
          ],
            remediations: { 'reasonable-restriction-means-the-government': { steps: ['If a student exhibits this misconception, have them: (1) Write out Article 19(2) verbatim and highlight the *eight.', '(2) Take three recent news items where speech was restricted (e.g., comedian arrested for jokes, journalist charged for.', 'Is the harm *serious* and *direct*?" (3) Re-read Mill\'s distinction between *social disapproval* (for minor harm) and.', 'This forces the shift from moral intuition to constitutional analysis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "reasonable restriction" means the government can restrict speech for *any reason it considers.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "A law that requires all news channels to allocate equal airtime to government and opposition views is a reasonable.', answer: 'This is *not* a reasonable restriction',
                  options: ['This is *not* a reasonable restriction', 'reasonable restriction', 'reasonable', 'hurting religious sentiments'],
                  hint: 'Revisit node c11_ps_cbse_02_006 (Harm Principle) for the self-regarding/other-regarding distinction.',
                  misconception: 'Students often believe "reasonable restriction" means the government can restrict speech for *any reason it considers reasonable* (e.g.' }
          ],
            remediations: { 'reasonable-restriction-means-the-government': { steps: ['If a student exhibits this misconception, have them: (1) Write out Article 19(2) verbatim and highlight the *eight.', '(2) Take three recent news items where speech was restricted (e.g., comedian arrested for jokes, journalist charged for.', 'Is the harm *serious* and *direct*?" (3) Re-read Mill\'s distinction between *social disapproval* (for minor harm) and.', 'This forces the shift from moral intuition to constitutional analysis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_008', difficulty: 'standard',
          question: 'Economic freedom refers to the capacity of individuals to make autonomous.',
          hint: 'Revisit c11_ps_cbse_02_004 (Negative vs Positive Liberty) and the NCERT passage on p.',
          misconception: 'Students equate "economic freedom" solely with "free markets" or "deregulation," assuming any state intervention.',
          parts: [
                { id: 'a', prompt: 'Explain why J.S. Mill\'s harm principle creates a dilemma for regulating markets: if a factory pollutes a river harming downstream villagers, is this.', answer: 'Pollution is an "other-regarding" action',
                  options: ['Pollution is an "other-regarding" action', 'self-regarding'],
                  hint: 'Revisit c11_ps_cbse_02_004 (Negative vs Positive Liberty) and the NCERT passage on p.',
                  misconception: 'Students equate "economic freedom" solely with "free markets" or "deregulation," assuming any state intervention (minimum wage, price.' },
                { id: 'b', prompt: 'Compare the Marxist critique of "economic freedom under capitalism" with the welfare liberal view (e.g., T.H. Green, modern Indian Constitution).', answer: 'Marxist critique: The worker is "free" only to sell labour-power or starve',
                  options: ['Marxist critique: The worker is "free" only to sell labour-power or starve', 'both want state control'],
                  hint: 'Revisit c11_ps_cbse_02_004 (Negative vs Positive Liberty) and the NCERT passage on p.',
                  misconception: 'Students equate "economic freedom" solely with "free markets" or "deregulation," assuming any state intervention (minimum wage, price.' }
          ],
            remediations: { 'students-equate-economic-freedom-solely': { steps: ['Re-read NCERT pp. 26–28 on positive liberty ("The individual to develop his or her capability must get the benefit.', 'List three economic constraints a poor person faces that are *not* state coercion (e.g., hunger, lack of credit.', 'For each, ask: "Does removing *state* rules solve this? Or does it require *state action* (PDS, microfinance, labour.', 'Write two sentences distinguishing "freedom from state interference in economic choices" (negative) from "freedom.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_009', difficulty: 'standard',
          question: 'National self-determination is the principle that a nation—a group of people.',
          hint: 'Revisit positive liberty (c11_ps_cbse_02_003) and the distinction between self-regarding.',
          misconception: 'Students often confuse national self-determination with the right to unilateral secession, thinking that any group.',
          parts: [
                { id: 'a', prompt: 'Explain why national self-determination is considered a form of collective freedom rather than just the sum of individual freedoms.', answer: 'National self-determination is collective freedom',
                  options: ['National self-determination is collective freedom', 'nation'],
                  hint: 'Revisit positive liberty (c11_ps_cbse_02_003) and the distinction between self-regarding and.',
                  misconception: 'Students often confuse national self-determination with the right to unilateral secession, thinking that any group calling itself.' }
          ],
            remediations: { 'students-often-confuse-national-self': { steps: ['If the student holds this misconception, have them read the UN General Assembly Resolution 1514 (Declaration.', 'Then analyze Article 3 of the Indian Constitution and the S.R.', 'Bommai judgment (1994) to understand how a democratic constitution manages sub-national aspirations without allowing.', 'Finally, discuss the distinction between "internal" and "external" self-determination using the Quebec (Canada) and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_010', difficulty: 'standard',
          question: 'Balancing freedom with other values like equality and security refers to the.',
          hint: 'If stuck, revisit c11_ps_cbse_02_006 (Harm Principle) and c11_ps_cbse_02_004 (Negative.',
          misconception: 'Students often think "balancing freedom with equality" means a zero-sum trade-off where more equality always requires.',
          parts: [
                { id: 'a', prompt: 'What is the \'harm principle\' as articulated by J.S. Mill, and what distinction does it draw between self-regarding and other-regarding actions?', answer: 'The harm principle states that the only justification for interfering with an',
                  options: ['The harm principle states that the only justification for interfering with an', 'state can interfere for the person\'s own good', 'balancing freedom with equality', 'reservation reduces freedom of general category students'],
                  hint: 'If stuck, revisit c11_ps_cbse_02_006 (Harm Principle) and c11_ps_cbse_02_004 (Negative vs Positive.',
                  misconception: 'Students often think "balancing freedom with equality" means a zero-sum trade-off where more equality always requires less freedom (e.g.' }
          ],
            remediations: { 'balancing-freedom-with-equality-means': { steps: ['Re-read NCERT sections 2.3-2.5 on why constraints are needed and the harm principle.', 'List three examples where a constraint on one person\'s negative liberty (e.g., taxation, traffic rules.', 'For each, identify which fundamental right is constrained and which is enabled.', 'Write a 100-word paragraph explaining why the Constitution\'s "reasonable restrictions" are not a bug but a feature.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
