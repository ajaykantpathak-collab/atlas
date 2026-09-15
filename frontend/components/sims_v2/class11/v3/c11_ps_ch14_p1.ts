import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch14_p1: SimDef = {
    id: 'v3_c11_ps_ch14_p1',
    title: 'Legislature · Part 1/2',
    subtitle: 'See the legislature\'s real job: not passing laws but holding power.',
    classLevel: 11, subject: 'political_science', topic: 'Legislature · Part 1/2',
    chapters: ['c11_ps_ch14'],
    nodeIds: ['c11_ps_cbse_14_001', 'c11_ps_cbse_14_002', 'c11_ps_cbse_14_003', 'c11_ps_cbse_14_004', 'c11_ps_cbse_14_005', 'c11_ps_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an MP choosing between whip and question hour', intro: 'A government with a brute majority still must face Question Hour every morning — accountability survives even when votes don\'t.', goal: 'Evaluate legislative oversight tools and the Rajya Sabha\'s federal role.' },
    discovery: {
        question: 'The executive commands a majority inside the legislature — so parliamentary oversight is basically a myth?',
        options: ['No — Question Hour, no-confidence motions, committees and sole control of Money Bills give the House real teeth', 'Yes — the majority makes scrutiny theatre', 'Yes — the Cabinet decides everything', 'No — only because of the Opposition'],
        answer: 'No — Question Hour, no-confidence motions, committees and sole control of Money Bills give the House real teeth',
        hook: 'The Rajya Sabha isn\'t a weaker Lok Sabha — it matches it on amendments, ordinary bills and impeachment; only money and confidence tilt to the lower House.',
    },
    teaching: [
        { title: 'Why do we need a legislature: Law-making and representation', text: 'A legislature is the law-making organ of government that derives its legitimacy from popular representation, tasked with enacting legislation, scrutinizing the executive, authorizing public.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_14_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track how a passed law can still be repealed under pressure (the farm laws), then defend whether an indirectly elected upper House is \'undemocratic obstruction.\'',
        labels: ['Why do we need', 'Bicameralism: Rationale for two', 'Lok Sabha: Composition, term,', 'Rajya Sabha: Composition, term,', 'Legislative procedure: How', 'Types of bills: Ordinary,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_14_001', title: 'Why do we need a legislature: Law-making and representation',
          caseStudy: { intro: 'Imagine your school decides to change the uniform policy without consulting any student representatives — just the principal announces it.',
            decisions: [{ prompt: 'What is the primary constitutional basis for the existence of Parliament in India, and which article defines its composition?', options: [
                { text: 'Article 79 establishes Parliament consisting of the President and two Houses (Lok Sabha', outcome: 'Article 79 establishes Parliament consisting of the President and two Houses (Lok Sabha and Rajya.' },
                { text: 'Article 326', outcome: 'Not quite — Students often think the legislature\'s only job is "making laws" and that the executive (Prime.', reveals: 'the-legislature-s-only-job' },
                { text: 'the Prime Minister creates Parliament', outcome: 'Not quite — Students often think the legislature\'s only job is "making laws" and that the executive (Prime.', reveals: 'the-legislature-s-only-job' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_14_002', title: 'Bicameralism: Rationale for two houses of legislature',
          caseStudy: { intro: 'Imagine you\'re watching a heated Lok Sabha debate where a controversial bill passes 280-50 in three hours — you wonder: "What stops a temporary majority from.',
            decisions: [{ prompt: 'What are the two houses of Parliament in India called, and which constitutional article establishes Parliament as consisting of the.', options: [
                { text: 'The two houses are Lok Sabha (House of the People) and Rajya Sabha (Council of States)', outcome: 'The two houses are Lok Sabha (House of the People) and Rajya Sabha (Council of States).' },
                { text: 'weaker version of Lok Sabha', outcome: 'Not quite — Students think Rajya Sabha is just a "weaker version of Lok Sabha" or a "house of elders" with only.', reveals: 'rajya-sabha-is-just-a' },
                { text: 'house of elders', outcome: 'Not quite — Students think Rajya Sabha is just a "weaker version of Lok Sabha" or a "house of elders" with only.', reveals: 'rajya-sabha-is-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_14_003', title: 'Lok Sabha: Composition, term, and functions',
          caseStudy: { intro: 'Imagine you\'re watching the 2024 general election results: 543 constituencies each elect one MP, forming the 18th Lok Sabha.',
            decisions: [{ prompt: 'What is the maximum sanctioned strength of the Lok Sabha as per Article 81, and how is this number distributed between states and union.', options: [
                { text: 'Maximum strength is 550: up to 530 members elected from states and up to 20 from union', outcome: 'Maximum strength is 550: up to 530 members elected from states and up to 20 from union territories.' },
                { text: 'includes nominated members', outcome: 'Not quite — Students often believe: (1) Lok Sabha members are partly nominated by the President (confusing with.', reveals: '1-lok-sabha-members-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_14_004', title: 'Rajya Sabha: Composition, term, and special powers',
          caseStudy: { intro: 'Imagine you\'re watching a news debate where a commentator claims "Rajya Sabha is just a parking lot for politicians who lose elections." Start by asking: "Is.',
            decisions: [{ prompt: 'What is the maximum strength of the Rajya Sabha as per Article 80, and how are its members constituted between elected and nominated.', options: [
                { text: 'The maximum strength is 250: 238 members elected by State Legislative Assemblies (and UTs', outcome: 'The maximum strength is 250: 238 members elected by State Legislative Assemblies (and UTs with.' },
                { text: '545 like Lok Sabha', outcome: 'Not quite — Students often think Rajya Sabha is "weaker" than Lok Sabha because it cannot reject Money Bills.', reveals: 'rajya-sabha-is-weaker-than' },
                { text: 'directly elected', outcome: 'Not quite — Students often think Rajya Sabha is "weaker" than Lok Sabha because it cannot reject Money Bills.', reveals: 'rajya-sabha-is-weaker-than' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_14_006', title: 'Types of bills: Ordinary, money, financial, constitutional amendment',
          caseStudy: { intro: 'Imagine you\'re reading a news headline: "Government introduces Bill to amend GST rates" - your first civic question should be: "What TYPE of bill is this?".',
            decisions: [{ prompt: 'A Bill proposes to establish a new All India Service for public health.', options: [
                { text: 'This is a Financial Bill under Article 117(1), NOT a Money Bill', outcome: 'This is a Financial Bill under Article 117(1), NOT a Money Bill.' },
                { text: 'exclusively', outcome: 'Not quite — Students believe "Financial Bill" and "Money Bill" are synonyms, or that any bill involving money.', reveals: 'financial-bill-and-money-bill' },
                { text: 'only financial matters', outcome: 'Not quite — Students believe "Financial Bill" and "Money Bill" are synonyms, or that any bill involving money.', reveals: 'financial-bill-and-money-bill' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A civics quiz team claims: \'The legislature just rubber-stamps what Cabinet drafts — its only job is passing laws. And the Rajya Sabha is a weaker advisory house since the Lok Sabha controls money and confidence.\'',
            decisions: [{ prompt: 'What do the legislature\'s powers and bicameralism really look like?', options: [
                { text: 'Widen the job description: the legislature doesn\'t only enact — it rejects, amends, scrutinises the executive, authorises expenditure (Money Bills are Lok Sabha-only under Article 110) and deliberates national issues; repeal of the 2020 farm laws showed responsiveness beyond passage. And the Rajya Sabha isn\'t advisory: it equals the Lok Sabha in constitutional amendments, ordinary legislation and impeachment — its federal role makes it indispensable, not subordinate.', outcome: 'The team rewrites its answer: legitimacy flows through scrutiny and finance control, and the second chamber is a coequal partner in most of what matters.' },
                { text: 'Keep the rubber-stamp view — whoever drafts most bills is the real legislator.', outcome: 'Proposal isn\'t power: the authority to amend, reject and hold the purse strings is what turns drafting into law — and legitimises it democratically.', reveals: 'legislature-just-passes-laws' },
                { text: 'Accept \'weaker house\' — Lok Sabha\'s money and confidence edge means Rajya Sabha advises.', outcome: 'Selective dominance isn\'t general subordination: on amendments, ordinary bills and impeachment the houses are equals — the federal chamber can\'t be bypassed there.', reveals: 'rajya-sabha-is-advisory' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'The executive proposes, but the legislature\'s power to reject, amend, interrogate and defund is what makes proposing meaningful.',
            decisions: [{ prompt: 'What comes next? Legislature · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Legislature · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_14_001', difficulty: 'standard',
          question: 'A legislature is the law-making organ of government that derives its legitimacy.',
          hint: 'Revisit Class 10 Power Sharing (c10_civ_cbse_01_004) for horizontal distribution, and.',
          misconception: 'Students often think the legislature\'s only job is "making laws" and that the executive (Prime Minister/Cabinet) is the.',
          parts: [
                { id: 'a', prompt: 'Compare the representation logic of Lok Sabha (direct election, population-based) and Rajya Sabha (indirect election, state-based equality with population.', answer: 'Lok Sabha embodies "one person, one vote, one value"',
                  options: ['Lok Sabha embodies "one person, one vote, one value"', 'both represent people directly', 'Rajya Sabha is just a revising chamber', 'making laws'],
                  hint: 'Revisit Class 10 Power Sharing (c10_civ_cbse_01_004) for horizontal distribution, and Class 9.',
                  misconception: 'Students often think the legislature\'s only job is "making laws" and that the executive (Prime Minister/Cabinet) is the real decision-maker.' }
          ],
            remediations: { 'the-legislature-s-only-job': { steps: ['Re-read Article 79 (Parliament composition) and Article 107 (legislative procedure) to anchor the institutional.', 'Watch a 10-minute clip of Lok Sabha Question Hour (available on Sansad TV YouTube) to see executive accountability.', 'Create a two-column table: "Executive proposes" vs "Legislature disposes" — list 5 powers (e.g., initiate bill / amend.', 'Explain aloud to a peer why a system where the executive both proposes and disposes would violate separation of powers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_14_002', difficulty: 'standard',
          question: 'Bicameralism is a constitutional design where the legislature consists of two.',
          hint: 'Revisit Class 10 Federalism (c10_civ_cbse_02_003, 02_004, 02_005) — specifically the.',
          misconception: 'Students think Rajya Sabha is just a "weaker version of Lok Sabha" or a "house of elders" with only advisory powers.',
          parts: [
                { id: 'a', prompt: 'Compare the composition of Lok Sabha (Article 81) and Rajya Sabha (Article 80).', answer: 'Lok Sabha: direct election on population basis (universal adult franchise)',
                  options: ['Lok Sabha: direct election on population basis (universal adult franchise)', 'elected representatives', 'weaker version of Lok Sabha', 'house of elders'],
                  hint: 'Revisit Class 10 Federalism (c10_civ_cbse_02_003, 02_004, 02_005) — specifically the distinction.',
                  misconception: 'Students think Rajya Sabha is just a "weaker version of Lok Sabha" or a "house of elders" with only advisory powers, because they see Lok.' }
          ],
            remediations: { 'rajya-sabha-is-just-a': { steps: ['Read Article 79 (Parliament composition) and Article 107 (legislative procedure for non-money bills) side-by-side.', 'List 5 powers where Rajya Sabha equals Lok Sabha (constitutional amendment, ordinary bills, impeachment, emergency.', 'Watch a 10-minute Rajya Sabha TV debate on a state-subject bill — observe how state-specific concerns are raised.', 'Write one sentence: "Rajya Sabha is not weaker; it is differently empowered for federal balance."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_14_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think Rajya Sabha is just a "weaker version of Lok Sabha" or a "house of elders" with only advisory powers.',
          parts: [
                { id: 'a', prompt: 'Draft a one-paragraph justification for a hypothetical new Indian state (population 5 million) demanding 5 Rajya Sabha seats instead of the current 1, citing.', answer: 'A strong answer cites Article 80\'s allocation principle (roughly proportional to',
                  options: ['A strong answer cites Article 80\'s allocation principle (roughly proportional to', 'weaker version of Lok Sabha', 'house of elders'],
                  hint: 'Revisit Class 10 Federalism (c10_civ_cbse_02_003, 02_004, 02_005) — specifically the distinction.',
                  misconception: 'Students think Rajya Sabha is just a "weaker version of Lok Sabha" or a "house of elders" with only advisory powers, because they see Lok.' }
          ],
            remediations: { 'rajya-sabha-is-just-a': { steps: ['Read Article 79 (Parliament composition) and Article 107 (legislative procedure for non-money bills) side-by-side.', 'List 5 powers where Rajya Sabha equals Lok Sabha (constitutional amendment, ordinary bills, impeachment, emergency.', 'Watch a 10-minute Rajya Sabha TV debate on a state-subject bill — observe how state-specific concerns are raised.', 'Write one sentence: "Rajya Sabha is not weaker; it is differently empowered for federal balance."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_14_003', difficulty: 'standard',
          question: 'The Lok Sabha (House of the People) is the directly elected lower house.',
          hint: 'Revisit Class 8 Civics Chapter 2 (Parliamentary System) and Class 9 Civics Chapter 2.',
          misconception: 'Students often believe: (1) Lok Sabha members are partly nominated by the President (confusing with Rajya Sabha\'s 12.',
          parts: [
                { id: 'a', prompt: 'Why does the Constitution provide for direct election of Lok Sabha members but indirect election for Rajya Sabha members?', answer: 'Direct election embodies popular sovereignty',
                  options: ['Direct election embodies popular sovereignty', 'direct election is cheaper/faster'],
                  hint: 'Revisit Class 8 Civics Chapter 2 (Parliamentary System) and Class 9 Civics Chapter 2 (Electoral.',
                  misconception: 'Students often believe: (1) Lok Sabha members are partly nominated by the President (confusing with Rajya Sabha\'s 12 nominated members.' },
                { id: 'b', prompt: 'A no-confidence motion against the Council of Ministers is admitted in the Lok Sabha. The government survives the vote.', answer: 'Yes, permissible',
                  options: ['Yes, permissible', 'no, can\'t move again', 'need one year gap'],
                  hint: 'Revisit Class 8 Civics Chapter 2 (Parliamentary System) and Class 9 Civics Chapter 2 (Electoral.',
                  misconception: 'Students often believe: (1) Lok Sabha members are partly nominated by the President (confusing with Rajya Sabha\'s 12 nominated members.' },
                { id: 'c', prompt: 'Compare the Lok Sabha\'s term under normal circumstances vs. during a Proclamation of Emergency under Article 352.', answer: 'Normal term: 5 years from first meeting (Article 83(2))',
                  options: ['Normal term: 5 years from first meeting (Article 83(2))', 'term becomes infinite', 'President extends by order'],
                  hint: 'Revisit Class 8 Civics Chapter 2 (Parliamentary System) and Class 9 Civics Chapter 2 (Electoral.',
                  misconception: 'Students often believe: (1) Lok Sabha members are partly nominated by the President (confusing with Rajya Sabha\'s 12 nominated members.' }
          ],
            remediations: { '1-lok-sabha-members-are': { steps: ['Read Article 81 text — highlight "chosen by direct election" and "not more than 530 from states, 20 from UTs".', 'Watch a 5-minute Sansad TV clip of a no-confidence motion debate — observe only Lok Sabha votes.', 'Compare Article 109 (money bill procedure) with Article 107 (ordinary bill) — note "shall not be introduced in Rajya.', 'Create a two-column table: "Lok Sabha exclusive powers" vs "Shared powers" — populate from Articles 75(3), 109, 108.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_14_004', difficulty: 'standard',
          question: 'The Rajya Sabha (Council of States) is the upper house of India\'s Parliament.',
          hint: 'If stuck, revisit c11_ps_cbse_14_002 (Bicameralism rationale) and c10_civ_cbse_02_005.',
          misconception: 'Students often think Rajya Sabha is "weaker" than Lok Sabha because it cannot reject Money Bills and its members are.',
          parts: [
                { id: 'a', prompt: 'Why does the Constitution make Rajya Sabha a permanent body not subject to dissolution, unlike Lok Sabha which has a fixed 5-year term?', answer: 'Rajya Sabha\'s permanence ensures continuous federal representation',
                  options: ['Rajya Sabha\'s permanence ensures continuous federal representation', 'to give politicians job security', 'weaker'],
                  hint: 'If stuck, revisit c11_ps_cbse_14_002 (Bicameralism rationale) and c10_civ_cbse_02_005 (Distribution.',
                  misconception: 'Students often think Rajya Sabha is "weaker" than Lok Sabha because it cannot reject Money Bills and its members are indirectly elected.' },
                { id: 'b', prompt: 'Compare Rajya Sabha\'s role in a Money Bill (Article 110) versus a Constitutional Amendment Bill (Article 368).', answer: 'In Money Bills, Rajya Sabha has only recommendatory power',
                  options: ['In Money Bills, Rajya Sabha has only recommendatory power', 'Rajya Sabha can reject Money Bills', 'Lok Sabha alone amends Constitution', 'weaker'],
                  hint: 'If stuck, revisit c11_ps_cbse_14_002 (Bicameralism rationale) and c10_civ_cbse_02_005 (Distribution.',
                  misconception: 'Students often think Rajya Sabha is "weaker" than Lok Sabha because it cannot reject Money Bills and its members are indirectly elected.' }
          ],
            remediations: { 'rajya-sabha-is-weaker-than': { steps: ['If a student holds this misconception, have them: (1) List all Articles where Rajya Sabha has equal or exclusive power.', '(2) Read Article 249 text: "If the Council of States has declared by resolution supported by not less than two-thirds.', '(4) Write one paragraph: "Rajya Sabha is not weaker; it is differently empowered for federal stability." Use the 2021.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_14_005', difficulty: 'standard',
          question: 'The legislative procedure is the constitutionally mandated multi-stage process.',
          hint: 'Revisit c11_ps_cbse_14_002 (bicameral rationale) and c11_ps_cbse_14_003/004.',
          misconception: 'Students commonly believe that once a Bill is passed by Lok Sabha, it is essentially law — Rajya Sabha is just.',
          parts: [
                { id: 'a', prompt: 'Why does the Constitution prescribe a different, truncated procedure for Money Bills (Article 109-110) where Rajya Sabha has only recommendatory powers and.', answer: 'Money Bills deal exclusively with taxation, borrowing, and expenditure from the',
                  options: ['Money Bills deal exclusively with taxation, borrowing, and expenditure from the', 'Rajya Sabha is weaker', 'to speed up laws'],
                  hint: 'Revisit c11_ps_cbse_14_002 (bicameral rationale) and c11_ps_cbse_14_003/004 (House-specific powers).',
                  misconception: 'Students commonly believe that once a Bill is passed by Lok Sabha, it is essentially law — Rajya Sabha is just a "rubber stamp" that can.' },
                { id: 'b', prompt: 'A Bill is passed by Lok Sabha but rejected by Rajya Sabha. The President summons a joint sitting under Article 108. The Bill passes at the joint sitting.', answer: 'No, the Bill cannot become law',
                  options: ['No, the Bill cannot become law', 'joint sitting makes it final', 'Parliament can override'],
                  hint: 'Revisit c11_ps_cbse_14_002 (bicameral rationale) and c11_ps_cbse_14_003/004 (House-specific powers).',
                  misconception: 'Students commonly believe that once a Bill is passed by Lok Sabha, it is essentially law — Rajya Sabha is just a "rubber stamp" that can.' }
          ],
            remediations: { 'students-commonly-believe-that-once': { steps: ['If a student holds this misconception, have them compare Article 107 (Ordinary Bill procedure: "passed by both Houses").', 'Lok Sabha may accept or reject").', 'Then analyze a real case: the Prevention of Corruption (Amendment) Bill, 2013 — passed by Lok Sabha, amended by Rajya.', 'Ask: "If Rajya Sabha were a rubber stamp, why would the Constitution give it amendment power for Ordinary Bills but.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_14_006', difficulty: 'standard',
          question: 'A Bill is a draft legislative proposal that becomes law after passage by both.',
          hint: 'Review c11_ps_cbse_14_005: focus on the Rajya Sabha\'s standard powers (equal voting.',
          misconception: 'Students believe "Financial Bill" and "Money Bill" are synonyms, or that any bill involving money is a Money Bill.',
          parts: [
                { id: 'a', prompt: 'A Bill proposes to establish a new All India Service for public health.', answer: 'This is a Financial Bill under Article 117(1), NOT a Money Bill',
                  options: ['This is a Financial Bill under Article 117(1), NOT a Money Bill', 'exclusively', 'only financial matters', 'includes financial matters'],
                  hint: 'Review c11_ps_cbse_14_005: focus on the Rajya Sabha\'s standard powers (equal voting, amendments.',
                  misconception: 'Students believe "Financial Bill" and "Money Bill" are synonyms, or that any bill involving money is a Money Bill.' },
                { id: 'b', prompt: 'A Bill to amend Article 54 (President\'s election) is passed by Lok Sabha with 300 votes in favour, 50 against (total strength 543).', answer: 'NO, the amendment is INVALID',
                  options: ['NO, the amendment is INVALID', 'half the states', 'Financial Bill', 'Money Bill'],
                  hint: 'Review c11_ps_cbse_14_005: focus on the Rajya Sabha\'s standard powers (equal voting, amendments.',
                  misconception: 'Students believe "Financial Bill" and "Money Bill" are synonyms, or that any bill involving money is a Money Bill.' },
                { id: 'c', prompt: 'Compare the President\'s assent options for: (a) Ordinary Bill, (b) Money Bill, (c) Constitutional Amendment Bill.', answer: 'Ordinary Bill, (',
                  options: ['Ordinary Bill, (', 'President has same powers for all', 'Financial Bill', 'Money Bill'],
                  hint: 'Review c11_ps_cbse_14_005: focus on the Rajya Sabha\'s standard powers (equal voting, amendments.',
                  misconception: 'Students believe "Financial Bill" and "Money Bill" are synonyms, or that any bill involving money is a Money Bill.' }
          ],
            remediations: { 'financial-bill-and-money-bill': { steps: ['Re-read Article 110 text - highlight the word "only" and the seven exhaustive matters.', 'Take the GST Bill example - it created GST (tax) but also GST Council (regulatory body).', 'Practice with 5 bill summaries: identify which Article 110 matter(s) each touches, then check if ANY non-110 matter.', 'Memorize the "exclusivity test" flowchart: Does it contain ONLY 110 matters? Yes → Money Bill.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
