import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch14_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch14_p2: SimDef = {
    id: 'v3_c11_ps_ch14_p2',
    title: 'Legislature · Part 2/2',
    subtitle: 'See the legislature\'s real job: not passing laws but holding power.',
    classLevel: 11, subject: 'political_science', topic: 'Legislature · Part 2/2',
    chapters: ['c11_ps_ch14'],
    nodeIds: ['c11_ps_cbse_14_007', 'c11_ps_cbse_14_008', 'c11_ps_cbse_14_009', 'c11_ps_cbse_14_010', 'c11_ps_cbse_14_011', 'c11_ps_cbse_14_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an MP choosing between whip and question hour', intro: 'A government with a brute majority still must face Question Hour every morning — accountability survives even when votes don\'t.', goal: 'Evaluate legislative oversight tools and the Rajya Sabha\'s federal role.' },
    discovery: {
        question: 'The executive commands a majority inside the legislature — so parliamentary oversight is basically a myth?',
        options: ['No — Question Hour, no-confidence motions, committees and sole control of Money Bills give the House real teeth', 'Yes — the majority makes scrutiny theatre', 'Yes — the Cabinet decides everything', 'No — only because of the Opposition'],
        answer: 'No — Question Hour, no-confidence motions, committees and sole control of Money Bills give the House real teeth',
        hook: 'The Rajya Sabha isn\'t a weaker Lok Sabha — it matches it on amendments, ordinary bills and impeachment; only money and confidence tilt to the lower House.',
    },
    teaching: [
        { title: 'Money bills and the special role of the Lok Sabha (Article 110)', text: 'A Money Bill is a legislative proposal that exclusively deals with matters listed in Article 110 of the Indian Constitution, such as taxation, government borrowing, expenditure from the Consolidated.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_14_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track how a passed law can still be repealed under pressure (the farm laws), then defend whether an indirectly elected upper House is \'undemocratic obstruction.\'',
        labels: ['Money bills and', 'Parliamentary control over', 'Parliamentary committees: Standing', 'Privileges of parliament', 'Anti-defection law and', 'State legislatures: Vidhan Sabha'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_14_007', title: 'Money bills and the special role of the Lok Sabha (Article 110)',
          caseStudy: { intro: 'Imagine you hear news about the Union Budget being passed quickly while other bills get stuck in Rajya Sabha.',
            decisions: [{ prompt: 'What are the specific matters listed in Article 110 that qualify a bill as a Money Bill? List at least four.', options: [
                { text: 'Article 110 lists: (1) imposition, abolition, remission, alteration or regulation of any', outcome: 'Article 110 lists: (1) imposition, abolition, remission, alteration or regulation of any tax; (2).' },
                { text: 'salaries of judges', outcome: 'Not quite — Students often think that any bill related to money (e.g., a bill setting salaries of government.', reveals: 'any-bill-related-to-money' },
                { text: 'any bill related to money (e', outcome: 'Not quite — Students often think that any bill related to money (e.g., a bill setting salaries of government.', reveals: 'any-bill-related-to-money' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_14_008', title: 'Parliamentary control over the executive: Questions, motions, committees',
          caseStudy: { intro: 'Imagine you read a newspaper headline: "Opposition moves Adjournment Motion over railway safety after a major accident." Start by asking: Which house can move.',
            decisions: [{ prompt: 'What is the minimum number of members required to support an Adjournment Motion in the Lok Sabha for it to be admitted?', options: [
                { text: '50 members', outcome: '50 members. A wrong answer (e.g., "1/10th of total strength" or "no minimum") reveals confusion.' },
                { text: '1/10th of total strength', outcome: 'Not quite — Students often believe a No-Confidence Motion can be moved against an *individual minister*.', reveals: 'a-no-confidence-motion-can' },
                { text: 'no minimum', outcome: 'Not quite — Students often believe a No-Confidence Motion can be moved against an *individual minister*.', reveals: 'a-no-confidence-motion-can' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_14_010', title: 'Privileges of parliament and parliamentary immunity',
          caseStudy: { intro: 'Imagine you watch a heated Lok Sabha debate where an MP makes serious allegations against a corporate house.',
            decisions: [{ prompt: 'State the exact constitutional articles that govern parliamentary privileges for (a) Parliament and (b) State Legislatures, and name the.', options: [
                { text: '(a) Article 105 for Parliament', outcome: '(a) Article 105 for Parliament; (b) Article 194 for State Legislatures.' },
                { text: 'MPs are above the law', outcome: 'Not quite — Students often believe parliamentary privilege means "MPs are above the law" or "MPs cannot.', reveals: 'parliamentary-privilege-means-mps-are' },
                { text: 'MPs cannot be arrested for any crime', outcome: 'Not quite — Students often believe parliamentary privilege means "MPs are above the law" or "MPs cannot.', reveals: 'parliamentary-privilege-means-mps-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_14_012', title: 'State legislatures: Vidhan Sabha and Vidhan Parishad',
          caseStudy: { intro: 'Imagine you\'re reading a news report about Maharashtra passing a controversial bill where the Legislative Council delayed it for months while the Assembly had.',
            decisions: [{ prompt: 'Which constitutional article empowers Parliament to create or abolish a Legislative Council in a state, and what majority is required.', options: [
                { text: 'Article 169 empowers Parliament to create/abolish Legislative Councils', outcome: 'Article 169 empowers Parliament to create/abolish Legislative Councils.' },
                { text: 'just like Rajya Sabha but at state level', outcome: 'Not quite — Students often think Vidhan Parishad is "just like Rajya Sabha but at state level" and assume.', reveals: 'vidhan-parishad-is-just-like' },
                { text: 'it has equal powers with Vidhan Sabha on all bills', outcome: 'Not quite — Students often think Vidhan Parishad is "just like Rajya Sabha but at state level" and assume.', reveals: 'vidhan-parishad-is-just-like' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A civics quiz team claims: \'The legislature just rubber-stamps what Cabinet drafts — its only job is passing laws. And the Rajya Sabha is a weaker advisory house since the Lok Sabha controls money and confidence.\'',
            decisions: [{ prompt: 'What do the legislature\'s powers and bicameralism really look like?', options: [
                { text: 'Widen the job description: the legislature doesn\'t only enact — it rejects, amends, scrutinises the executive, authorises expenditure (Money Bills are Lok Sabha-only under Article 110) and deliberates national issues; repeal of the 2020 farm laws showed responsiveness beyond passage. And the Rajya Sabha isn\'t advisory: it equals the Lok Sabha in constitutional amendments, ordinary legislation and impeachment — its federal role makes it indispensable, not subordinate.', outcome: 'The team rewrites its answer: legitimacy flows through scrutiny and finance control, and the second chamber is a coequal partner in most of what matters.' },
                { text: 'Keep the rubber-stamp view — whoever drafts most bills is the real legislator.', outcome: 'Proposal isn\'t power: the authority to amend, reject and hold the purse strings is what turns drafting into law — and legitimises it democratically.', reveals: 'legislature-just-passes-laws' },
                { text: 'Accept \'weaker house\' — Lok Sabha\'s money and confidence edge means Rajya Sabha advises.', outcome: 'Selective dominance isn\'t general subordination: on amendments, ordinary bills and impeachment the houses are equals — the federal chamber can\'t be bypassed there.', reveals: 'rajya-sabha-is-advisory' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_14_012', title: 'You made it',
          caseStudy: { intro: 'The executive proposes, but the legislature\'s power to reject, amend, interrogate and defund is what makes proposing meaningful.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_14_007', difficulty: 'standard',
          question: 'A Money Bill is a legislative proposal that exclusively deals with matters.',
          hint: 'If stuck, review Article 110 text and the comparison table of bill types from.',
          misconception: 'Students often think that any bill related to money (e.g., a bill setting salaries of government employees) is a Money.',
          parts: [
                { id: 'a', prompt: 'Why does the Constitution require that a Money Bill can only be introduced in the Lok Sabha and not in the Rajya Sabha?', answer: 'The Lok Sabha is directly elected by the people and represents the popular will',
                  options: ['The Lok Sabha is directly elected by the people and represents the popular will', 'because Rajya Sabha is weaker', 'any bill related to money (e'],
                  hint: 'If stuck, review Article 110 text and the comparison table of bill types from c11_ps_cbse_14_006.',
                  misconception: 'Students often think that any bill related to money (e.g., a bill setting salaries of government employees) is a Money Bill.' },
                { id: 'b', prompt: 'A bill proposes to impose a new tax on digital services and also creates a new regulatory authority for digital services with its own fund.', answer: 'The certification is likely incorrect',
                  options: ['The certification is likely incorrect', 'yes, because it has a tax', 'any bill related to money (e'],
                  hint: 'If stuck, review Article 110 text and the comparison table of bill types from c11_ps_cbse_14_006.',
                  misconception: 'Students often think that any bill related to money (e.g., a bill setting salaries of government employees) is a Money Bill.' },
                { id: 'c', prompt: 'Compare the powers of Rajya Sabha in passing a Money Bill versus an Ordinary Bill. What constitutional principle explains this difference?', answer: 'For a Money Bill, Rajya Sabha can only recommend amendments within 14 days',
                  options: ['For a Money Bill, Rajya Sabha can only recommend amendments within 14 days', 'Rajya Sabha has no role in Money Bills', 'any bill related to money (e'],
                  hint: 'If stuck, review Article 110 text and the comparison table of bill types from c11_ps_cbse_14_006.',
                  misconception: 'Students often think that any bill related to money (e.g., a bill setting salaries of government employees) is a Money Bill.' }
          ],
            remediations: { 'any-bill-related-to-money': { steps: ['If a student cannot distinguish Money Bills from Financial Bills, have them create a two-column table: left column.', 'Then practice classifying 5 real bills from recent Parliament sessions using the table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_14_008', difficulty: 'standard',
          question: 'Parliamentary control over the executive refers to the constitutional.',
          hint: 'If stuck, revisit Class 9 \'Parliamentary vs Presidential Democracy\' (c9_civ_ch1_6) and.',
          misconception: 'Students often believe a No-Confidence Motion can be moved against an *individual minister*.',
          parts: [
                { id: 'a', prompt: 'What is the minimum number of members required to support an Adjournment Motion in the Lok Sabha for it to be admitted?', answer: '50 members',
                  options: ['50 members', '1/10th of total strength', 'no minimum', 'a No-Confidence Motion can be moved against an *individual minister*'],
                  hint: 'If stuck, revisit Class 9 \'Parliamentary vs Presidential Democracy\' (c9_civ_ch1_6) and Class 11.',
                  misconception: 'Students often believe a No-Confidence Motion can be moved against an *individual minister*.' },
                { id: 'b', prompt: 'Why does the Constitution mandate that the Council of Ministers is collectively responsible to the Lok Sabha (Article 75(3)), and how do Questions Hour and.', answer: 'Collective responsibility means the ministry stands or falls together',
                  options: ['Collective responsibility means the ministry stands or falls together', 'a No-Confidence Motion can be moved against an *individual minister*'],
                  hint: 'If stuck, revisit Class 9 \'Parliamentary vs Presidential Democracy\' (c9_civ_ch1_6) and Class 11.',
                  misconception: 'Students often believe a No-Confidence Motion can be moved against an *individual minister*.' },
                { id: 'c', prompt: 'A minister makes a statement in the Lok Sabha claiming a new scheme has reached 100% of target beneficiaries. An MP suspects the data is inflated.', answer: 'The MP should use a Starred Question (for oral answer)',
                  options: ['The MP should use a Starred Question (for oral answer)', 'Zero Hour', 'Adjournment Motion', 'a No-Confidence Motion can be moved against an *individual minister*'],
                  hint: 'If stuck, revisit Class 9 \'Parliamentary vs Presidential Democracy\' (c9_civ_ch1_6) and Class 11.',
                  misconception: 'Students often believe a No-Confidence Motion can be moved against an *individual minister*.' },
                { id: 'd', prompt: 'Compare the Public Accounts Committee (PAC) and the Estimates Committee in terms of: (a) composition (who can be members), (b) primary function, and (c).', answer: 'composition (who can be members), (',
                  options: ['composition (who can be members), (', 'a No-Confidence Motion can be moved against an *individual minister*'],
                  hint: 'If stuck, revisit Class 9 \'Parliamentary vs Presidential Democracy\' (c9_civ_ch1_6) and Class 11.',
                  misconception: 'Students often believe a No-Confidence Motion can be moved against an *individual minister*.' }
          ],
            remediations: { 'a-no-confidence-motion-can': { steps: ['Re-read Article 75(3) – "Council of Ministers shall be collectively responsible to the House of the People."', 'List the three motions that test confidence: No-Confidence (whole ministry), Censure (individual minister/policy).', 'Use a concrete example: The 1999 Vajpayee government fell due to a No-Confidence Motion (one vote).', 'Practice writing the exact wording: "That this House expresses its want of confidence in the Council of Ministers."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_14_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe a No-Confidence Motion can be moved against an *individual minister*.',
          parts: [
                { id: 'a', prompt: '"Parliamentary committees are more effective than floor debates in ensuring executive accountability." Evaluate this statement with two arguments for and two.', answer: 'For: (1) Committees work away from party whips, allowing consensus-based reports',
                  options: ['For: (1) Committees work away from party whips, allowing consensus-based reports', 'a No-Confidence Motion can be moved against an *individual minister*'],
                  hint: 'If stuck, revisit Class 9 \'Parliamentary vs Presidential Democracy\' (c9_civ_ch1_6) and Class 11.',
                  misconception: 'Students often believe a No-Confidence Motion can be moved against an *individual minister*.' }
          ],
            remediations: { 'a-no-confidence-motion-can': { steps: ['Re-read Article 75(3) – "Council of Ministers shall be collectively responsible to the House of the People."', 'List the three motions that test confidence: No-Confidence (whole ministry), Censure (individual minister/policy).', 'Use a concrete example: The 1999 Vajpayee government fell due to a No-Confidence Motion (one vote).', 'Practice writing the exact wording: "That this House expresses its want of confidence in the Council of Ministers."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_14_009', difficulty: 'standard',
          question: 'Parliamentary committees are specialised bodies of Members of Parliament.',
          hint: 'Revisit c11_ps_cbse_14_008 "Parliamentary control over the executive" — specifically the.',
          misconception: 'Students often believe "Standing Committees are only financial committees (PAC, Estimates, Public Undertakings)" and.',
          parts: [
                { id: 'a', prompt: 'Why does the Constitution not explicitly list Parliamentary Committees, leaving their creation to the Rules of Procedure of each House?', answer: 'The Constitution establishes the *framework* of legislative oversight but leaves',
                  options: ['The Constitution establishes the *framework* of legislative oversight but leaves', 'committees are not constitutional bodies'],
                  hint: 'Revisit c11_ps_cbse_14_008 "Parliamentary control over the executive" — specifically the.',
                  misconception: 'Students often believe "Standing Committees are only financial committees (PAC, Estimates, Public Undertakings)" and that "Ad Hoc.' },
                { id: 'b', prompt: 'A Bill on cryptocurrency regulation is introduced in Lok Sabha. The Speaker refers it to a Joint Committee of both Houses.', answer: 'It is an Ad Hoc committee',
                  options: ['It is an Ad Hoc committee', '(permanence)'],
                  hint: 'Revisit c11_ps_cbse_14_008 "Parliamentary control over the executive" — specifically the.',
                  misconception: 'Students often believe "Standing Committees are only financial committees (PAC, Estimates, Public Undertakings)" and that "Ad Hoc.' },
                { id: 'c', prompt: 'Compare the Public Accounts Committee (PAC) and a Select Committee on a Bill in terms of: (a) tenure, (b) source of referral, (c) nature of output, and (d).', answer: 'tenure, (',
                  options: ['tenure, (', 'financial committees'],
                  hint: 'Revisit c11_ps_cbse_14_008 "Parliamentary control over the executive" — specifically the.',
                  misconception: 'Students often believe "Standing Committees are only financial committees (PAC, Estimates, Public Undertakings)" and that "Ad Hoc.' }
          ],
            remediations: { 'standing-committees-are-only-financial': { steps: ['List all 6 categories of Standing Committees from the Lok Sabha website (Financial, DRSCs, Housekeeping, Inquiry.', 'Pick one DRSC (e.g., Committee on Home Affairs) and trace its last three reports — note they cover bills, budget.', 'Compare with a recent Ad Hoc JPC (e.g., Personal Data Protection Bill, 2019) — note its fixed timeline, specific.', 'Write a 100-word note: "Standing = institutional memory; Ad Hoc = targeted intervention."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_14_010', difficulty: 'standard',
          question: 'Parliamentary privileges are special rights, immunities, and exemptions enjoyed.',
          hint: 'Revisit Article 105 in the Constitution bare act; watch the 10-minute "Parliamentary.',
          misconception: 'Students often believe parliamentary privilege means "MPs are above the law" or "MPs cannot be arrested for any crime.".',
          parts: [
                { id: 'a', prompt: 'State the exact constitutional articles that govern parliamentary privileges for (a) Parliament and (b) State Legislatures, and name the specific clause that.', answer: 'Parliament and (',
                  options: ['Parliament and (', 'MPs are above the law', 'MPs cannot be arrested for any crime'],
                  hint: 'Revisit Article 105 in the Constitution bare act; watch the 10-minute "Parliamentary Privileges.',
                  misconception: 'Students often believe parliamentary privilege means "MPs are above the law" or "MPs cannot be arrested for any crime." The precise error.' },
                { id: 'b', prompt: 'An MP makes a speech in Lok Sabha accusing a private businessman of tax evasion and money laundering, naming him directly.', answer: 'Immunity under Article 105(2) applies fully',
                  options: ['Immunity under Article 105(2) applies fully', 'immunity doesn\'t apply if speech is malicious', 'court can examine malice', 'MPs are above the law'],
                  hint: 'Revisit Article 105 in the Constitution bare act; watch the 10-minute "Parliamentary Privileges.',
                  misconception: 'Students often believe parliamentary privilege means "MPs are above the law" or "MPs cannot be arrested for any crime." The precise error.' }
          ],
            remediations: { 'parliamentary-privilege-means-mps-are': { steps: ['Re-read Article 105(1), (2), (3) and Article 194 side-by-side in the Constitution bare text.', 'Create a two-column table: "Individual Privileges" (speech immunity, civil arrest exemption, jury exemption) vs.', 'Watch the 15-minute Sansad TV explainer "Parliamentary Privileges: Myth vs Reality" (available on YouTube).', 'Write a 100-word answer to: "Can an MP be arrested for murder during a Parliament session?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_14_011', difficulty: 'standard',
          question: 'The Anti-defection law, enshrined in the Tenth Schedule of the Indian.',
          hint: 'If stuck, revisit the Class 9 node c9_civ_ch2_9 (Anti-Defection Law: Purpose and.',
          misconception: 'Students often think the Anti-defection law applies to all votes in the legislature, including presidential elections.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Anti-defection law, enshrined in the Tenth Schedule of the Indian Constitution (added',
                  options: ['The Anti-defection law, enshrined in the Tenth Schedule of the Indian Constitution (added', 'A legislature is the law-making organ of government that derives its legitimacy from', 'Bicameralism is a constitutional design where the legislature consists of two separate', 'The Lok Sabha (House of the People) is the directly elected lower house of India\'s'],
                  hint: 'If stuck, revisit the Class 9 node c9_civ_ch2_9 (Anti-Defection Law: Purpose and Provisions) and.',
                  misconception: 'Students often think the Anti-defection law applies to all votes in the legislature, including presidential elections or constitutional.' }
          ],
            remediations: { 'the-anti-defection-law-applies': { steps: ['If a student confuses the scope of the whip, ask them to read Article 55 (presidential election) and the Tenth Schedule.', 'Then, have them analyze the 2012 Presidential election cross-voting incident: no disqualification petitions were filed.', 'For the split/merger confusion, create a table: pre-2003 (split allowed at 1/3, merger at 2/3) vs.', 'post-2003 (only merger at 2/3).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_14_012', difficulty: 'standard',
          question: 'State Legislatures in India are the law-making bodies at the state level.',
          hint: 'If stuck, revisit Article 168 (Constitution of Legislatures in States) and Article 169.',
          misconception: 'Students often think Vidhan Parishad is "just like Rajya Sabha but at state level" and assume it has equal powers with.',
          parts: [
                { id: 'a', prompt: 'Which constitutional article empowers Parliament to create or abolish a Legislative Council in a state, and what majority is required in the state Legislative.', answer: 'Article 169 empowers Parliament to create/abolish Legislative Councils',
                  options: ['Article 169 empowers Parliament to create/abolish Legislative Councils', 'just like Rajya Sabha but at state level', 'it has equal powers with Vidhan Sabha on all bills'],
                  hint: 'If stuck, revisit Article 168 (Constitution of Legislatures in States) and Article 169.',
                  misconception: 'Students often think Vidhan Parishad is "just like Rajya Sabha but at state level" and assume it has equal powers with Vidhan Sabha on all.' },
                { id: 'b', prompt: 'Why does the Constitution make the Vidhan Sabha supreme over the Vidhan Parishad in matters of Money Bills and confidence motions, unlike the near-equality.', answer: 'The Vidhan Sabha is directly elected by the people on universal adult franchise,',
                  options: ['The Vidhan Sabha is directly elected by the people on universal adult franchise,', 'Parishad is weaker', 'just like Rajya Sabha but at state level', 'it has equal powers with Vidhan Sabha on all bills'],
                  hint: 'If stuck, revisit Article 168 (Constitution of Legislatures in States) and Article 169.',
                  misconception: 'Students often think Vidhan Parishad is "just like Rajya Sabha but at state level" and assume it has equal powers with Vidhan Sabha on all.' },
                { id: 'c', prompt: 'A state Legislative Assembly passes a resolution by special majority requesting creation of a Legislative Council. The ruling party at the Centre opposes this.', answer: 'Parliament is NOT constitutionally bound to enact the law',
                  options: ['Parliament is NOT constitutionally bound to enact the law', 'just like Rajya Sabha but at state level', 'it has equal powers with Vidhan Sabha on all bills'],
                  hint: 'If stuck, revisit Article 168 (Constitution of Legislatures in States) and Article 169.',
                  misconception: 'Students often think Vidhan Parishad is "just like Rajya Sabha but at state level" and assume it has equal powers with Vidhan Sabha on all.' },
                { id: 'd', prompt: 'Compare the composition of Vidhan Parishad with Rajya Sabha. Identify two similarities and two differences in their election methods, and explain how these.', answer: 'Similarities: Both use indirect election (proportional representation by single',
                  options: ['Similarities: Both use indirect election (proportional representation by single', 'just like Rajya Sabha but at state level', 'it has equal powers with Vidhan Sabha on all bills'],
                  hint: 'If stuck, revisit Article 168 (Constitution of Legislatures in States) and Article 169.',
                  misconception: 'Students often think Vidhan Parishad is "just like Rajya Sabha but at state level" and assume it has equal powers with Vidhan Sabha on all.' }
          ],
            remediations: { 'vidhan-parishad-is-just-like': { steps: ['Re-read Article 197 (Special procedure for Bills other than Money Bills in bicameral states) - note the "delay".', 'Create a comparison table: Lok Sabha vs Rajya Sabha (joint sitting, equal on ordinary bills) vs.', 'Trace a hypothetical Bill: Assembly passes -> Council rejects -> Assembly passes again after 3 months -> Bill deemed.', 'Contrast with Money Bill: Assembly passes -> Council can only recommend -> Assembly accepts/rejects -> Bill deemed.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
