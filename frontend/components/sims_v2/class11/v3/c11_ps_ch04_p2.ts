import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch04_p2: SimDef = {
    id: 'v3_c11_ps_ch04_p2',
    title: 'Social Justice · Part 2/2',
    subtitle: 'Ask whether a meal can be a right, not a favour.',
    classLevel: 11, subject: 'political_science', topic: 'Social Justice · Part 2/2',
    chapters: ['c11_ps_ch04'],
    nodeIds: ['c11_ps_cbse_04_007', 'c11_ps_cbse_04_008', 'c11_ps_cbse_04_009', 'c11_ps_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a judge of rules chosen without knowing your own address', intro: 'Design society\'s rules before you know which family you\'re born into — Rawls\' blindfold turns fairness into a thought experiment.', goal: 'Apply the three principles of justice and Rawls\' original position to concrete policy.' },
    discovery: {
        question: 'Free mid-day meals in government schools — charity or justice?',
        options: ['Justice — feeding a hungry child repairs a background inequality that rigged the classroom competition before it began', 'Charity — it goes beyond what anyone is owed', 'Charity — justice only covers courts', 'Neither — it\'s just a lunch scheme'],
        answer: 'Justice — feeding a hungry child repairs a background inequality that rigged the classroom competition before it began',
        hook: 'The three principles of justice interlock rather than compete — equal basic rights, proportional rewards, and special treatment for disadvantaged needs all apply in different domains.',
    },
    teaching: [
        { title: 'Distributive justice vs retributive justice', text: 'Distributive justice concerns the fair allocation of society\'s benefits (resources, opportunities, wealth) and burdens (taxes, duties) among individuals, guided by principles like equality, need,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Apply all three principles to one school — vote, prize and meal — then test Rawls\' veil against the \'real people know who they are\' objection.',
        labels: ['Distributive justice vs retributive', 'Social justice and', 'Amartya Sen: Capabilities approach', 'Social justice for marginalised'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_04_007', title: 'Distributive justice vs retributive justice',
          caseStudy: { intro: 'Imagine a news headline: "Government announces 10% quota for economically weaker sections in jobs" and another: "Supreme Court upholds death penalty for.',
            decisions: [{ prompt: 'Define distributive justice and retributive justice in one sentence each, using the terms "allocation" and "punishment" respectively.', options: [
                { text: 'Distributive justice is the fair allocation of society\'s benefits and burdens among its', outcome: 'Distributive justice is the fair allocation of society\'s benefits and burdens among its members.' },
                { text: 'revenge', outcome: 'Not quite — Students often think "retributive justice = revenge" and "distributive justice = equal shares for.', reveals: 'retributive-justice-revenge-and-distributive' },
                { text: 'retributive justice = revenge', outcome: 'Not quite — Students often think "retributive justice = revenge" and "distributive justice = equal shares for.', reveals: 'retributive-justice-revenge-and-distributive' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_04_008', title: 'Social justice and the Indian Constitution: Directive Principles',
          caseStudy: { intro: 'Imagine you read a news report about a state government launching a free dialysis scheme for kidney patients funded by a new tax on luxury hospitals.',
            decisions: [{ prompt: 'Which constitutional article explicitly declares that Directive Principles are not enforceable by any court, yet are fundamental in the.', options: [
                { text: 'Article 37', outcome: 'Article 37. A wrong answer (e.g., Article 36 or Article 38) reveals that the student confuses the.' },
                { text: 'non-justiciable', outcome: 'Not quite — Students often believe that because Directive Principles are "non-justiciable" (Article 37), they.', reveals: 'because-directive-principles-are-non' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_04_009', title: 'Amartya Sen: Capabilities approach to justice',
          caseStudy: { intro: 'Imagine a government scheme giving every household ₹500/month food subsidy.',
            decisions: [{ prompt: 'Define "capability" in Sen\'s framework and give one example distinguishing it from "functioning."', options: [
                { text: 'Capability is the *set of feasible functionings* a person can achieve', outcome: 'Capability is the *set of feasible functionings* a person can achieve — their real freedom.' },
                { text: 'capability means skill', outcome: 'Not quite — Students conflate "capabilities" with "skills" or "human capital" (e.g., "education gives you.', reveals: 'students-conflate-capabilities-with-skills' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_04_010', title: 'Social justice for marginalised groups: SC/ST/OBC and minorities',
          caseStudy: { intro: 'Imagine you are reading a newspaper headline: "Supreme Court upholds 27% OBC quota in NEET-PG admissions." You wonder why some groups get reserved seats while.',
            decisions: [{ prompt: 'Which constitutional article empowers the President to specify the castes deemed to be Scheduled Castes in a state?', options: [
                { text: 'Article 341(1) authorises the President to notify the list of Scheduled Castes for each', outcome: 'Article 341(1) authorises the President to notify the list of Scheduled Castes for each state after.' },
                { text: 'reservation is an exception to the right to equality (Article 14/15/16)', outcome: 'Not quite — Students often believe that "reservation is an exception to the right to equality (Article.', reveals: 'reservation-is-an-exception-to' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class designs \'rules for a just school\'. One group insists social justice means \'pick ONE principle — either treat all identically, or reward merit, or help the disadvantaged — mixing them is inconsistent.\' Another says justice is \'basically reservations.\'',
            decisions: [{ prompt: 'How do the principles of justice actually fit together?', options: [
                { text: 'Show they interlock by domain: equal treatment for basic rights (vote, legal protection), proportionality for rewards of effort and skill, special provision where background disadvantage distorts competition — a just society layers all three rather than choosing one. Rawls explains the deep structure: choose rules behind a veil of ignorance — knowing general facts of psychology and economics but not your own position — so principles can\'t be rigged for the designer.', outcome: 'The school charter gains coherence: rights equal, rewards proportional, opportunity subsidised — and the veil tests whether the rules would be chosen by someone who didn\'t know which student they\'d be.' },
                { text: 'Agree consistency demands one principle — mixing is arbitrariness.', outcome: 'The principles govern different domains, not rival answers: identical voting rights plus proportional grades plus remedial support is coherent, not contradictory.', reveals: 'one-principle-only' },
                { text: 'Accept \'justice = reservations\' — special provision is the whole idea.', outcome: 'That amputates the framework: reservations are one instrument in one domain — equal treatment and proportionality remain the other two legs.', reveals: 'justice-equals-reservations' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_04_010', title: 'You made it',
          caseStudy: { intro: 'Behind the veil you don\'t know if you\'re the feeder or the fed — that\'s precisely what makes the chosen rule just rather than convenient.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_04_007', difficulty: 'standard',
          question: 'Distributive justice concerns the fair allocation of society\'s benefits.',
          hint: 'If stuck, revisit NCERT Class 11 Chapter 4 Section 4.1 (pages 54-57) for the three.',
          misconception: 'Students often think "retributive justice = revenge" and "distributive justice = equal shares for everyone.".',
          parts: [
                { id: 'a', prompt: 'Why is it incorrect to say "reservations for SC/ST in government jobs are a form of retributive justice for past discrimination"?', answer: 'Reservations are a distributive justice measure',
                  options: ['Reservations are a distributive justice measure', 'retributive', 'retributive justice = revenge', 'distributive justice = equal shares for everyone'],
                  hint: 'If stuck, revisit NCERT Class 11 Chapter 4 Section 4.1 (pages 54-57) for the three principles, and.',
                  misconception: 'Students often think "retributive justice = revenge" and "distributive justice = equal shares for everyone." In reality, retributive.' },
                { id: 'b', prompt: 'A state government introduces a scheme: free dialysis for all kidney patients funded by a 2% surcharge on luxury cars.', answer: 'This is distributive justice',
                  options: ['This is distributive justice', 'pay for their luxury', 'retributive justice = revenge', 'distributive justice = equal shares for everyone'],
                  hint: 'If stuck, revisit NCERT Class 11 Chapter 4 Section 4.1 (pages 54-57) for the three principles, and.',
                  misconception: 'Students often think "retributive justice = revenge" and "distributive justice = equal shares for everyone." In reality, retributive.' },
                { id: 'c', prompt: 'Compare the constitutional basis of (a) Article 15(4) enabling reservations for socially/educationally backward classes and (b) Section 302 IPC prescribing.', answer: 'Article 15(4) embodies distributive justice: it authorizes special provisions to',
                  options: ['Article 15(4) embodies distributive justice: it authorizes special provisions to', 'helping victims', 'retributive justice = revenge', 'distributive justice = equal shares for everyone'],
                  hint: 'If stuck, revisit NCERT Class 11 Chapter 4 Section 4.1 (pages 54-57) for the three principles, and.',
                  misconception: 'Students often think "retributive justice = revenge" and "distributive justice = equal shares for everyone." In reality, retributive.' }
          ],
            remediations: { 'retributive-justice-revenge-and-distributive': { steps: ['Re-read the NCERT Section 4.1 "What is Justice?" (pages 54-57) focusing on the three principles: equal treatment.', 'Write two columns — "State Gives/Allocates" (distributive) vs.', 'For each, name the principle (need, merit, equality, proportionality, desert).', 'Discuss with teacher why "punishing the rich via wealth tax" is a category error — it\'s distributive burden-sharing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "retributive justice = revenge" and "distributive justice = equal shares for everyone.".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A society that focuses only on retributive justice (strict punishment) but ignores distributive justice (fair shares) will eventually.', answer: 'The statement is valid',
                  options: ['The statement is valid', 'punishment alone deters crime', 'retributive justice = revenge', 'distributive justice = equal shares for everyone'],
                  hint: 'If stuck, revisit NCERT Class 11 Chapter 4 Section 4.1 (pages 54-57) for the three principles, and.',
                  misconception: 'Students often think "retributive justice = revenge" and "distributive justice = equal shares for everyone." In reality, retributive.' }
          ],
            remediations: { 'retributive-justice-revenge-and-distributive': { steps: ['Re-read the NCERT Section 4.1 "What is Justice?" (pages 54-57) focusing on the three principles: equal treatment.', 'Write two columns — "State Gives/Allocates" (distributive) vs.', 'For each, name the principle (need, merit, equality, proportionality, desert).', 'Discuss with teacher why "punishing the rich via wealth tax" is a category error — it\'s distributive burden-sharing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_04_008', difficulty: 'standard',
          question: 'Directive Principles of State Policy (DPSP) are non-justiciable guidelines.',
          hint: 'Revisit Class 7 Civics node c7_civ_ch02_009 (Directive Principles of State Policy) and.',
          misconception: 'Students often believe that because Directive Principles are "non-justiciable" (Article 37), they are legally.',
          parts: [
                { id: 'a', prompt: 'Which constitutional article explicitly declares that Directive Principles are not enforceable by any court, yet are fundamental in the governance of the.', answer: 'Article 37',
                  options: ['Article 37', 'non-justiciable'],
                  hint: 'Revisit Class 7 Civics node c7_civ_ch02_009 (Directive Principles of State Policy) and Class 11.',
                  misconception: 'Students often believe that because Directive Principles are "non-justiciable" (Article 37), they are legally irrelevant—mere moral advice.' },
                { id: 'b', prompt: 'Why did the Constituent Assembly make Directive Principles non-justiciable while keeping Fundamental Rights justiciable?', answer: 'The Assembly recognised that socio-economic directives (e.g., living wage, free',
                  options: ['The Assembly recognised that socio-economic directives (e.g., living wage, free', 'DPSP were less important', 'non-justiciable'],
                  hint: 'Revisit Class 7 Civics node c7_civ_ch02_009 (Directive Principles of State Policy) and Class 11.',
                  misconception: 'Students often believe that because Directive Principles are "non-justiciable" (Article 37), they are legally irrelevant—mere moral advice.' }
          ],
            remediations: { 'because-directive-principles-are-non': { steps: ['Have the student read Article 37 verbatim and underline "fundamental in the governance" and "duty of the State".', 'Compare Article 37 with Article 32 (remedies for Fundamental Rights) to see the *different* enforcement mechanisms, not.', 'State of Andhra Pradesh* (1993): the Court held that the right to education (originally Article 45, a DPSP) flows from.', 'Assign a mini-case: "A government stops mid-day meals citing budget cuts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_04_009', difficulty: 'standard',
          question: 'Amartya Sen\'s Capabilities Approach defines justice as the expansion.',
          hint: 'Revisit c11_ps_cbse_04_003: Rawls assumes parties in original position are "normal, fully.',
          misconception: 'Students conflate "capabilities" with "skills" or "human capital" (e.g., "education gives you capabilities").',
          parts: [
                { id: 'a', prompt: 'Define "capability" in Sen\'s framework and give one example distinguishing it from "functioning."', answer: 'Capability is the *set of feasible functionings* a person can achieve',
                  options: ['Capability is the *set of feasible functionings* a person can achieve', 'capability means skill'],
                  hint: 'Revisit c11_ps_cbse_04_003: Rawls assumes parties in original position are "normal, fully.',
                  misconception: 'Students conflate "capabilities" with "skills" or "human capital" (e.g., "education gives you capabilities").' },
                { id: 'b', prompt: 'A state government replaces the Public Distribution System (PDS) with Direct Benefit Transfer (DBT) of cash for food.', answer: 'elderly women in tribal areas with no bank access, (',
                  options: ['elderly women in tribal areas with no bank access, (', 'cash gives choice'],
                  hint: 'Revisit c11_ps_cbse_04_003: Rawls assumes parties in original position are "normal, fully.',
                  misconception: 'Students conflate "capabilities" with "skills" or "human capital" (e.g., "education gives you capabilities").' },
                { id: 'c', prompt: 'Compare Sen\'s critique of utilitarianism with his critique of Rawls.', answer: 'Utilitarianism excludes *distribution* and *agency*',
                  options: ['Utilitarianism excludes *distribution* and *agency*', 'both ignore equality'],
                  hint: 'Revisit c11_ps_cbse_04_003: Rawls assumes parties in original position are "normal, fully.',
                  misconception: 'Students conflate "capabilities" with "skills" or "human capital" (e.g., "education gives you capabilities").' }
          ],
            remediations: { 'students-conflate-capabilities-with-skills': { steps: ['Re-read Sen\'s "Equality of What?" (1979) distinction: **Resources → (Conversion Factors) → Capabilities → (Choice) →.', 'Map this chain to the PDS vs.', 'DBT example in Diagnostic Q3: identify the conversion factor breaking the link at each arrow for the tribal woman.', 'Contrast with Nussbaum\'s *Central Capabilities List* (fixed, universal) — ask: "Would Sen endorse this list for all.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_04_010', difficulty: 'standard',
          question: 'Social justice for marginalised groups in India refers to the constitutional.',
          hint: 'Revisit c11_ps_cbse_04_008 (Social justice and the Indian Constitution) and the bare text.',
          misconception: 'Students often believe that "reservation is an exception to the right to equality (Article 14/15/16)" and therefore.',
          parts: [
                { id: 'a', prompt: 'Compare the Mandal Commission\'s criteria for identifying OBCs with the Sachar Committee\'s approach for Muslims.', answer: 'Mandal used eleven social, educational, and economic indicators centred on caste',
                  options: ['Mandal used eleven social, educational, and economic indicators centred on caste', 'both use religion', 'reservation is an exception to the right to equality (Article 14/15/16)'],
                  hint: 'Revisit c11_ps_cbse_04_008 (Social justice and the Indian Constitution) and the bare text.',
                  misconception: 'Students often believe that "reservation is an exception to the right to equality (Article 14/15/16)" and therefore must be minimally.' }
          ],
            remediations: { 'reservation-is-an-exception-to': { steps: ['Re-read Articles 14, 15, 16 side-by-side in the bare Constitution text.', 'Highlight every clause starting with "Nothing in this article shall prevent the State from making…" – these are not.', 'Watch the 10-minute summary of the Indra Sawhney judgment (available on Indian Kanoon/YouTube) focusing on Justice.', 'Write two sentences distinguishing "formal equality" (same treatment) from "substantive equality" (equitable outcomes).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
