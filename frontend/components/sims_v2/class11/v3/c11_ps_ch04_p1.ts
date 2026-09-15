import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch04_p1: SimDef = {
    id: 'v3_c11_ps_ch04_p1',
    title: 'Social Justice · Part 1/2',
    subtitle: 'Ask whether a meal can be a right, not a favour.',
    classLevel: 11, subject: 'political_science', topic: 'Social Justice · Part 1/2',
    chapters: ['c11_ps_ch04'],
    nodeIds: ['c11_ps_cbse_04_001', 'c11_ps_cbse_04_002', 'c11_ps_cbse_04_003', 'c11_ps_cbse_04_004', 'c11_ps_cbse_04_005', 'c11_ps_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a judge of rules chosen without knowing your own address', intro: 'Design society\'s rules before you know which family you\'re born into — Rawls\' blindfold turns fairness into a thought experiment.', goal: 'Apply the three principles of justice and Rawls\' original position to concrete policy.' },
    discovery: {
        question: 'Free mid-day meals in government schools — charity or justice?',
        options: ['Justice — feeding a hungry child repairs a background inequality that rigged the classroom competition before it began', 'Charity — it goes beyond what anyone is owed', 'Charity — justice only covers courts', 'Neither — it\'s just a lunch scheme'],
        answer: 'Justice — feeding a hungry child repairs a background inequality that rigged the classroom competition before it began',
        hook: 'The three principles of justice interlock rather than compete — equal basic rights, proportional rewards, and special treatment for disadvantaged needs all apply in different domains.',
    },
    teaching: [
        { title: 'What is social justice: Distributive dimension of justice', text: 'Social justice is the principle that a just society must ensure fair distribution of social goods (resources, opportunities, rights) and burdens (duties, taxes, sacrifices) among all members.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Apply all three principles to one school — vote, prize and meal — then test Rawls\' veil against the \'real people know who they are\' objection.',
        labels: ['What is social justice', 'Justice as fairness: John', 'Rawls\' difference principle', 'Libertarian critique: Robert Nozick', 'Utilitarian approach to justice', 'Marxist critique of liberal'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_04_001', title: 'What is social justice: Distributive dimension of justice',
          caseStudy: { intro: 'Imagine two Class 11 students, Arjun and Priya, both applying for the same university scholarship.',
            decisions: [{ prompt: 'Define "distributive justice" in one sentence and name the three principles of justice discussed in the chapter that govern distribution.', options: [
                { text: 'Distributive justice concerns the fair allocation of social goods (income, opportunities,', outcome: 'Distributive justice concerns the fair allocation of social goods (income, opportunities, rights).' },
                { text: 'distributive justice means everyone gets the same', outcome: 'Not quite — Students often believe "social justice = reservations/quotas" and that the three principles are.', reveals: 'social-justice-reservations-quotas-and' },
                { text: 'social justice = reservations/quotas', outcome: 'Not quite — Students often believe "social justice = reservations/quotas" and that the three principles are.', reveals: 'social-justice-reservations-quotas-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_04_002', title: 'Justice as fairness: John Rawls and the original position',
          caseStudy: { intro: 'Imagine you and your friends are designing the rules for a new board game, but you don\'t know which character you\'ll play—whether you\'ll start with extra.',
            decisions: [{ prompt: 'Define the "original position" and "veil of ignorance" in Rawls\' theory. What specific knowledge is excluded behind the veil?', options: [
                { text: 'The original position is a hypothetical choice situation where free and equal persons', outcome: 'The original position is a hypothetical choice situation where free and equal persons select.' },
                { text: 'not knowing if you\'re rich or poor', outcome: 'Not quite — Students think the veil of ignorance requires *total* ignorance—including knowledge of general.', reveals: 'the-veil-of-ignorance-requires' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_04_003', title: 'Rawls\' difference principle and the veil of ignorance',
          caseStudy: { intro: 'Imagine you and your classmates must design the rules for dividing a pizza before anyone knows which slice they will get — some slices have extra cheese, some.',
            decisions: [{ prompt: 'State the two principles of justice Rawls derives from the original position, in their correct lexical order.', options: [
                { text: '**Correct answer:** (1) Each person has an equal right to the most extensive scheme of', outcome: '**Correct answer:** (1) Each person has an equal right to the most extensive scheme of equal basic.' },
                { text: 'imagine they are poor', outcome: 'Not quite — Students often believe the **veil of ignorance requires people to "imagine they are poor"**.', reveals: 'the-veil-of-ignorance-requires' },
                { text: 'feel empathy for the disadvantaged', outcome: 'Not quite — Students often believe the **veil of ignorance requires people to "imagine they are poor"**.', reveals: 'the-veil-of-ignorance-requires' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_04_004', title: 'Libertarian critique: Robert Nozick and entitlement theory',
          caseStudy: { intro: 'Imagine a street vendor in Mumbai who builds a successful food cart business through long hours and reinvestment, while a neighbour prefers leisure and earns.',
            decisions: [{ prompt: 'State the three principles of justice in holdings according to Nozick\'s entitlement theory.', options: [
                { text: 'The three principles are: (1) Justice in acquisition – how unowned resources become', outcome: 'The three principles are: (1) Justice in acquisition – how unowned resources become legitimately.' },
                { text: 'equality, need, merit', outcome: 'Not quite — Students often think Nozick\'s theory means "no government at all" or "survival of the fittest.".', reveals: 'nozick-s-theory-means-no' },
                { text: 'no government at all', outcome: 'Not quite — Students often think Nozick\'s theory means "no government at all" or "survival of the fittest.".', reveals: 'nozick-s-theory-means-no' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_04_005', title: 'Utilitarian approach to justice: Maximising welfare',
          caseStudy: { intro: 'Imagine the Delhi government must decide whether to spend ₹500 crore on a new super-specialty hospital serving 50,000 critical patients annually or.',
            decisions: [{ prompt: 'State the "Greatest Happiness Principle" as formulated by Jeremy Bentham and identify the two key variables it seeks to maximise.', options: [
                { text: 'Correct answer: "The Greatest Happiness Principle holds that actions are right in', outcome: 'Correct answer: "The Greatest Happiness Principle holds that actions are right in proportion.' },
                { text: 'A wrong answer that omits', outcome: 'Not quite — Students often confuse utilitarianism with "majoritarianism" or "democratic decision-making,".', reveals: 'students-often-confuse-utilitarianism-with' },
                { text: 'majoritarianism', outcome: 'Not quite — Students often confuse utilitarianism with "majoritarianism" or "democratic decision-making,".', reveals: 'students-often-confuse-utilitarianism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_04_006', title: 'Marxist critique of liberal justice and exploitation',
          caseStudy: { intro: 'Imagine a factory worker, Ramesh, and the factory owner, Mr. Kapoor.',
            decisions: [{ prompt: 'Define "exploitation" in the specific Marxist sense (surplus value) and distinguish it from the everyday meaning of "unfair treatment".', options: [
                { text: '**Correct Answer:** In Marxism, exploitation is a technical, structural concept: it is', outcome: '**Correct Answer:** In Marxism, exploitation is a technical, structural concept: it is the.' },
                { text: 'paying very low wages', outcome: 'Not quite — **Misconception:** "Marx wants the state to distribute everything equally (equal wages for all) and.', reveals: 'misconception-marx-wants-the-state' },
                { text: 'bad working conditions', outcome: 'Not quite — **Misconception:** "Marx wants the state to distribute everything equally (equal wages for all) and.', reveals: 'misconception-marx-wants-the-state' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class designs \'rules for a just school\'. One group insists social justice means \'pick ONE principle — either treat all identically, or reward merit, or help the disadvantaged — mixing them is inconsistent.\' Another says justice is \'basically reservations.\'',
            decisions: [{ prompt: 'How do the principles of justice actually fit together?', options: [
                { text: 'Show they interlock by domain: equal treatment for basic rights (vote, legal protection), proportionality for rewards of effort and skill, special provision where background disadvantage distorts competition — a just society layers all three rather than choosing one. Rawls explains the deep structure: choose rules behind a veil of ignorance — knowing general facts of psychology and economics but not your own position — so principles can\'t be rigged for the designer.', outcome: 'The school charter gains coherence: rights equal, rewards proportional, opportunity subsidised — and the veil tests whether the rules would be chosen by someone who didn\'t know which student they\'d be.' },
                { text: 'Agree consistency demands one principle — mixing is arbitrariness.', outcome: 'The principles govern different domains, not rival answers: identical voting rights plus proportional grades plus remedial support is coherent, not contradictory.', reveals: 'one-principle-only' },
                { text: 'Accept \'justice = reservations\' — special provision is the whole idea.', outcome: 'That amputates the framework: reservations are one instrument in one domain — equal treatment and proportionality remain the other two legs.', reveals: 'justice-equals-reservations' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Behind the veil you don\'t know if you\'re the feeder or the fed — that\'s precisely what makes the chosen rule just rather than convenient.',
            decisions: [{ prompt: 'What comes next? Social Justice · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Social Justice · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_04_001', difficulty: 'standard',
          question: 'Social justice is the principle that a just society must ensure fair.',
          hint: 'Revisit Class 10 Chapter 3 (Gender, Religion, Caste) nodes on caste inequalities.',
          misconception: 'Students often believe "social justice = reservations/quotas" and that the three principles are mutually exclusive.',
          parts: [
                { id: 'a', prompt: 'Explain why treating everyone identically (formal equality) can produce unjust outcomes, using the example of a scholarship awarded solely on exam marks.', answer: 'Identical treatment ignores unequal starting conditions',
                  options: ['Identical treatment ignores unequal starting conditions', 'marks are objective', 'social justice = reservations/quotas'],
                  hint: 'Revisit Class 10 Chapter 3 (Gender, Religion, Caste) nodes on caste inequalities.',
                  misconception: 'Students often believe "social justice = reservations/quotas" and that the three principles are mutually exclusive choices.' },
                { id: 'b', prompt: 'A state government proposes two policies: (A) 50% reservation in government jobs for women; (B) free coaching centres for women aspirants in rural areas.', answer: 'Policy A (reservation) aligns with **special needs**',
                  options: ['Policy A (reservation) aligns with **special needs**', 'special treatment', 'social justice = reservations/quotas'],
                  hint: 'Revisit Class 10 Chapter 3 (Gender, Religion, Caste) nodes on caste inequalities.',
                  misconception: 'Students often believe "social justice = reservations/quotas" and that the three principles are mutually exclusive choices.' },
                { id: 'c', prompt: 'Compare how a libertarian (Nozick) and a social democrat (Rawls) would evaluate a progressive tax funding free healthcare for the poor.', answer: 'A libertarian prioritises **entitlement/property rights**',
                  options: ['A libertarian prioritises **entitlement/property rights**', 'helping the poor', 'social justice = reservations/quotas'],
                  hint: 'Revisit Class 10 Chapter 3 (Gender, Religion, Caste) nodes on caste inequalities.',
                  misconception: 'Students often believe "social justice = reservations/quotas" and that the three principles are mutually exclusive choices.' }
          ],
            remediations: { 'social-justice-reservations-quotas-and': { steps: ['List three domains — voting rights, government jobs, university admissions.', 'Ask which principle applies to each. Voting = equal treatment (one person, one vote).', 'Show NCERT text (p. 55-57) where all three are presented as *complementary*, not contradictory.', 'Use the "LET\'S THINK" box (p. 57) — discuss Suresh (visual impairment) vs Geeta (limp): both get extra time, but the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "social justice = reservations/quotas" and that the three principles are mutually exclusive.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Providing free mid-day meals in government schools is charity, not justice." Use the three principles of justice to support your.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'charity', 'social justice = reservations/quotas'],
                  hint: 'Revisit Class 10 Chapter 3 (Gender, Religion, Caste) nodes on caste inequalities.',
                  misconception: 'Students often believe "social justice = reservations/quotas" and that the three principles are mutually exclusive choices.' },
                { id: 'b', prompt: 'Design a just admission policy for a premier public university that balances merit, diversity, and historical disadvantage.', answer: 'A just policy could include: (1) **Merit-based seats (50%)**',
                  options: ['A just policy could include: (1) **Merit-based seats (50%)**', 'social justice = reservations/quotas'],
                  hint: 'Revisit Class 10 Chapter 3 (Gender, Religion, Caste) nodes on caste inequalities.',
                  misconception: 'Students often believe "social justice = reservations/quotas" and that the three principles are mutually exclusive choices.' }
          ],
            remediations: { 'social-justice-reservations-quotas-and': { steps: ['List three domains — voting rights, government jobs, university admissions.', 'Ask which principle applies to each. Voting = equal treatment (one person, one vote).', 'Show NCERT text (p. 55-57) where all three are presented as *complementary*, not contradictory.', 'Use the "LET\'S THINK" box (p. 57) — discuss Suresh (visual impairment) vs Geeta (limp): both get extra time, but the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_04_002', difficulty: 'standard',
          question: 'John Rawls\' "justice as fairness" is a contractarian theory of distributive.',
          hint: 'Revisit c11_ps_cbse_04_001: "What is social justice: Distributive dimension" — focus.',
          misconception: 'Students think the veil of ignorance requires *total* ignorance—including knowledge of general facts about human.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'John Rawls\' "justice as fairness" is a contractarian theory of distributive justice',
                  options: ['John Rawls\' "justice as fairness" is a contractarian theory of distributive justice', 'Social justice is the principle that a just society must ensure fair distribution of', 'Rawls\' **difference principle** states that social and economic inequalities are', 'Robert Nozick\'s entitlement theory of justice holds that a distribution of goods is just'],
                  hint: 'Revisit c11_ps_cbse_04_001: "What is social justice: Distributive dimension" — focus on the.',
                  misconception: 'Students think the veil of ignorance requires *total* ignorance—including knowledge of general facts about human psychology, economics, and.' }
          ],
            remediations: { 'the-veil-of-ignorance-requires': { steps: ['Re-read NCERT §4.3 (pages 60-61) focusing on the phrase "we do not know what kind of family we would be born in...', 'List what is excluded (particular facts) vs. included (general facts).', 'Practice explaining to a peer: "The veil hides *who I am*, not *how the world works*."', 'Apply to a concrete case: "Behind the veil, I know markets create inequality (general economics), but I don\'t know.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_04_003', difficulty: 'standard',
          question: 'Rawls\' **difference principle** states that social and economic inequalities.',
          hint: 'Revisit c11_ps_cbse_04_002 "Justice as fairness: John Rawls and the original position".',
          misconception: 'Students often believe the **veil of ignorance requires people to "imagine they are poor"** or "feel empathy for the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rawls\' **difference principle** states that social and economic inequalities are',
                  options: ['Rawls\' **difference principle** states that social and economic inequalities are', 'Social justice is the principle that a just society must ensure fair distribution of', 'John Rawls\' "justice as fairness" is a contractarian theory of distributive justice', 'Robert Nozick\'s entitlement theory of justice holds that a distribution of goods is just'],
                  hint: 'Revisit c11_ps_cbse_04_002 "Justice as fairness: John Rawls and the original position" — focus.',
                  misconception: 'Students often believe the **veil of ignorance requires people to "imagine they are poor"** or "feel empathy for the disadvantaged." This.' }
          ],
            remediations: { 'the-veil-of-ignorance-requires': { steps: ['Re-read the NCERT paragraph: "Rawls therefore argues that rational thinking, not morality, could lead us to be fair...".', 'Draw a 2x2 table: rows = your possible positions (privileged / worst-off); columns = principles (utilitarian.', 'Ask: "If I have *no idea* which row I\'ll land in, and the worst-off column under utilitarianism could be starvation.', 'Realise the choice is **risk-avoidance**, not empathy.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_04_004', difficulty: 'standard',
          question: 'Robert Nozick\'s entitlement theory of justice holds that a distribution.',
          hint: 'If stuck, review the "veil of ignorance" and "difference principle".',
          misconception: 'Students often think Nozick\'s theory means "no government at all" or "survival of the fittest." In reality, Nozick.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Robert Nozick\'s entitlement theory of justice holds that a distribution of goods is just',
                  options: ['Robert Nozick\'s entitlement theory of justice holds that a distribution of goods is just', 'Social justice is the principle that a just society must ensure fair distribution of', 'John Rawls\' "justice as fairness" is a contractarian theory of distributive justice', 'Rawls\' **difference principle** states that social and economic inequalities are'],
                  hint: 'If stuck, review the "veil of ignorance" and "difference principle" in c11_ps_cbse_04_003, focusing.',
                  misconception: 'Students often think Nozick\'s theory means "no government at all" or "survival of the fittest." In reality, Nozick argues for a minimal.' }
          ],
            remediations: { 'nozick-s-theory-means-no': { steps: ['If a student holds this misconception, have them re-read Nozick\'s "Anarchy, State, and Utopia" Chapter 7 (or a summary).', 'Then work through a concrete Indian case: the 2006 Forest Rights Act recognizes historical injustice to Adivasis – ask.', 'Emphasize that Nozick\'s minimal state still has police, courts, and a rectification mechanism.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_04_005', difficulty: 'standard',
          question: 'The utilitarian approach to justice holds that a just society is one that.',
          hint: 'If stuck, revisit the "three principles of justice" in NCERT Section 4.1 (equal.',
          misconception: 'Students often confuse utilitarianism with "majoritarianism" or "democratic decision-making," thinking that because.',
          parts: [
                { id: 'a', prompt: 'Explain why classical utilitarianism treats the distribution of welfare as instrumentally valuable only, and give a concrete example where this leads to.', answer: 'Correct answer: "Utilitarianism cares only about the sum total of utility',
                  options: ['Correct answer: "Utilitarianism cares only about the sum total of utility', 'majoritarianism', 'democratic decision-making', 'whatever the majority wants'],
                  hint: 'If stuck, revisit the "three principles of justice" in NCERT Section 4.1 (equal treatment.',
                  misconception: 'Students often confuse utilitarianism with "majoritarianism" or "democratic decision-making," thinking that because utilitarianism counts.' },
                { id: 'b', prompt: 'The Union Budget allocates ₹10,000 crore for rural employment guarantee (MGNREGA) and ₹2,000 crore for a high-speed rail corridor.', answer: 'Correct answer: "The utilitarian verdict favours the high-speed rail corridor',
                  options: ['Correct answer: "The utilitarian verdict favours the high-speed rail corridor', 'A wrong answer that chooses MGNREGA because', 'majoritarianism', 'democratic decision-making'],
                  hint: 'If stuck, revisit the "three principles of justice" in NCERT Section 4.1 (equal treatment.',
                  misconception: 'Students often confuse utilitarianism with "majoritarianism" or "democratic decision-making," thinking that because utilitarianism counts.' }
          ],
            remediations: { 'students-often-confuse-utilitarianism-with': { steps: ['Re-read the distinction between "sum-ranking" (utilitarian) and "headcount" (majoritarian) in the worked example 1.', 'Construct a 3-person numerical example where Person A gets 100 utils, B gets 10, C gets 10 (total 120) vs.', 'Now add diminishing marginal utility: assume utility = log(income). Recalculate with incomes 1000, 100, 100 vs.', 'Explicitly note that the flip depends on an empirical assumption about the utility function, not on a principle.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_04_006', difficulty: 'standard',
          question: 'The Marxist critique of liberal justice argues that liberal theories (like.',
          hint: 'If stuck on "Why does Marx reject rights?", revisit **c11_ps_cbse_04_001 (Principle.',
          misconception: '**Misconception:** "Marx wants the state to distribute everything equally (equal wages for all) and abolish all.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Marxist critique of liberal justice argues that liberal theories (like those of Rawls',
                  options: ['The Marxist critique of liberal justice argues that liberal theories (like those of Rawls', 'Social justice is the principle that a just society must ensure fair distribution of', 'John Rawls\' "justice as fairness" is a contractarian theory of distributive justice', 'Rawls\' **difference principle** states that social and economic inequalities are'],
                  hint: 'If stuck on "Why does Marx reject rights?", revisit **c11_ps_cbse_04_001 (Principle: Equal.',
                  misconception: '**Misconception:** "Marx wants the state to distribute everything equally (equal wages for all) and abolish all individual freedom/rights.".' }
          ],
            remediations: { 'misconception-marx-wants-the-state': { steps: ['**Re-read the "Critique of the Gotha Programme" (Part I):** Focus on Marx\'s distinction between the "lower phase".', 'Write a 3-sentence summary of why "equal right" is still a "bourgeois limitation." 2.', '**Analyze a Pay Slip:** Take a hypothetical payslip (Gross: ₹50,000; Deductions: ₹5,000; Net: ₹45,000).', 'Map it to Marx: Gross = Value created by labour (necessary + surplus).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
