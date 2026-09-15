import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch13_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch13_p2: SimDef = {
    id: 'v3_c11_ps_ch13_p2',
    title: 'Executive · Part 2/2',
    subtitle: 'Meet the executive that outlasts every minister.',
    classLevel: 11, subject: 'political_science', topic: 'Executive · Part 2/2',
    chapters: ['c11_ps_ch13'],
    nodeIds: ['c11_ps_cbse_13_007', 'c11_ps_cbse_13_008', 'c11_ps_cbse_13_009', 'c11_ps_cbse_13_010', 'c11_ps_cbse_13_011', 'c11_ps_cbse_13_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a tracer following a law from cabinet to classroom', intro: 'The minister signs the policy; a thousand permanent officers make it real — both are \'the executive.\'', goal: 'Distinguish political and permanent executive and compare parliamentary with presidential design.' },
    discovery: {
        question: 'Who actually implements the Right to Education Act in a district — the Education Minister?',
        options: ['The permanent executive — District Education Officers, block officers, inspectors; the bureaucracy is an integral tier of the executive, not its servant', 'The Education Minister alone', 'The Lok Sabha\'s education committee', 'The President\'s secretariat'],
        answer: 'The permanent executive — District Education Officers, block officers, inspectors; the bureaucracy is an integral tier of the executive, not its servant',
        hook: 'And parliamentary doesn\'t mean \'no separation\' — ministers are MPs (fused personnel) but the functions stay distinct; presidential systems do the reverse.',
    },
    teaching: [
        { title: 'Appointment of the Prime Minister and coalition politics', text: 'The appointment of the Prime Minister in India follows Article 75(1) of the Constitution, where the President appoints the leader of the party or coalition commanding a majority in the Lok Sabha.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_13_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map political versus permanent executive on one Act\'s journey to a classroom, then test whether fixed-term presidentialism beats India\'s coalition instability.',
        labels: ['Appointment of the Prime', 'Collective responsibility to', 'Cabinet and Council', 'The Vice President: Election,', 'Governor of a State', 'Bureaucracy: Role, neutrality,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_13_007', title: 'Appointment of the Prime Minister and coalition politics',
          caseStudy: { intro: 'Imagine you\'re watching the 2024 Lok Sabha election results: no single party crosses the 272-mark, but two major alliances claim they can form government.',
            decisions: [{ prompt: 'According to Article 75(1) of the Constitution, who appoints the Prime Minister and on what basis?', options: [
                { text: 'The President appoints the Prime Minister', outcome: 'The President appoints the Prime Minister. The appointee must be the leader of the party.' },
                { text: 'the people directly elect the PM', outcome: 'Not quite — Students often believe the President can freely choose any MP as Prime Minister based on personal.', reveals: 'the-president-can-freely-choose' },
                { text: 'the President chooses anyone', outcome: 'Not quite — Students often believe the President can freely choose any MP as Prime Minister based on personal.', reveals: 'the-president-can-freely-choose' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_13_008', title: 'Collective responsibility to the Lok Sabha',
          caseStudy: { intro: 'Imagine you are watching a news debate where the Opposition has moved a no-confidence motion against the government.',
            decisions: [{ prompt: 'What does Article 75(3) of the Indian Constitution state about the Council of Ministers?', options: [
                { text: 'Article 75(3) states: "The Council of Ministers shall be collectively responsible to the', outcome: 'Article 75(3) states: "The Council of Ministers shall be collectively responsible to the House.' },
                { text: 'responsible to the President or Rajya Sabha', outcome: 'Not quite — Students often think collective responsibility means all ministers must agree on every policy.', reveals: 'collective-responsibility-means-all-ministers' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_13_009', title: 'Cabinet and Council of Ministers: Inner vs outer cabinet',
          caseStudy: { intro: 'Imagine you\'re watching a news debate where the anchor says "The Cabinet cleared the Bill today" but the reporter adds "The real decision was taken in the PM\'s.',
            decisions: [{ prompt: 'What is the constitutional basis for the Council of Ministers, and how does it differ from the constitutional status of the Cabinet?', options: [
                { text: 'The Council of Ministers is explicitly established under Article 75(1) ("There shall be a', outcome: 'The Council of Ministers is explicitly established under Article 75(1) ("There shall be a Council.' },
                { text: '), while the word', outcome: 'Not quite — Students often believe the "Cabinet" and "Council of Ministers" are synonyms, or that the "Inner.', reveals: 'the-cabinet-and-council-of' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often believe the "Cabinet" and "Council of Ministers" are synonyms, or that the "Inner.', reveals: 'the-cabinet-and-council-of' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_13_010', title: 'The Vice President: Election, role, and functions',
          caseStudy: { intro: 'Imagine you\'re watching Rajya Sabha TV and see the Vice President presiding over a heated debate on a bill - they\'re not just a ceremonial figure but the.',
            decisions: [{ prompt: 'Which constitutional article specifies the election of the Vice President by an electoral college consisting of members of both Houses.', options: [
                { text: 'Article 66', outcome: 'Article 66. A wrong answer (e.g., Article 54 or 55) reveals confusion between Presidential and Vice.' },
                { text: 'just a spare tire', outcome: 'Not quite — Students think the Vice President is "just a spare tire" for the President with no real work.', reveals: 'the-vice-president-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_13_011', title: 'Governor of a State: Role and relationship with the Centre',
          caseStudy: { intro: 'Imagine you\'re watching a news report where a state Governor refuses to sign a bill passed by the state assembly, sending it to the President instead — the.',
            decisions: [{ prompt: 'Under which Article is the Governor appointed, and who appoints them?', options: [
                { text: 'Article 155: The Governor is appointed by the President of India', outcome: 'Article 155: The Governor is appointed by the President of India.' },
                { text: 'elected by state legislature', outcome: 'Not quite — Students think the Governor is merely a "rubber stamp" like the President, or conversely,.', reveals: 'the-governor-is-merely-a' },
                { text: 'appointed by PM', outcome: 'Not quite — Students think the Governor is merely a "rubber stamp" like the President, or conversely,.', reveals: 'the-governor-is-merely-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_13_012', title: 'Bureaucracy: Role, neutrality, and accountability',
          caseStudy: { intro: 'Imagine you\'re a District Collector in a flood-hit district. The political executive (Minister) announces a relief package, but you must decide which villages.',
            decisions: [{ prompt: 'Article 310 of the Indian Constitution establishes which fundamental principle regarding civil servants\' tenure?', options: [
                { text: 'Article 310 establishes the "pleasure doctrine"', outcome: 'Article 310 establishes the "pleasure doctrine" — civil servants hold office during the pleasure.' },
                { text: 'fixed tenure', outcome: 'Not quite — Students believe "bureaucracy is accountable only to the political executive (Minister)" and that.', reveals: 'bureaucracy-is-accountable-only-to' },
                { text: 'lifetime appointment', outcome: 'Not quite — Students believe "bureaucracy is accountable only to the political executive (Minister)" and that.', reveals: 'bureaucracy-is-accountable-only-to' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Tracking how the Right to Education Act reaches a village school, a student says \'the Education Minister implements it\' — and describes India\'s system as \'parliamentary, so no separation of powers exists.\'',
            decisions: [{ prompt: 'What does the executive actually comprise, and what does \'parliamentary\' mean?', options: [
                { text: 'Unpack the dual structure: the executive is political (PM/Council of Ministers) PLUS permanent (civil servants) — the Minister decides what; the District Education Officer and inspectors execute how, daily. And parliamentary doesn\'t mean no separation: it fuses PERSONNEL (ministers are MPs) while functions stay distinct — ministers pilot bills legislatively and run ministries executively.', outcome: 'He sees the machine whole: implementation runs through the permanent executive, and accountability to the Lok Sabha is the system\'s defining feature — not the absence of separated functions.' },
                { text: 'Keep the Minister-only view — the bureaucracy serves the executive but isn\'t part of it.', outcome: 'The permanent executive is integral to the executive branch: officers on the ground are how \'the executive implements laws\' actually happens.', reveals: 'executive-is-only-ministers' },
                { text: 'Accept \'no separation\' — ministers sit in Parliament, so powers are fused.', outcome: 'Fusion is of personnel, not function: Indian ministers both legislate and administer — the functions remain distinguishable even in the same hands.', reveals: 'parliamentary-means-no-separation' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_13_012', title: 'You made it',
          caseStudy: { intro: 'Ministers answer to the Lok Sabha collectively — yet the same majority that sustains them is the leash that holds them.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_13_007', difficulty: 'standard',
          question: 'The appointment of the Prime Minister in India follows Article 75(1) of the.',
          hint: 'Review Article 75(1) and the distinction between the President\'s formal appointment power.',
          misconception: 'Students often believe the President can freely choose any MP as Prime Minister based on personal judgment, or that the.',
          parts: [
                { id: 'a', prompt: 'According to Article 75(1) of the Constitution, who appoints the Prime Minister and on what basis?', answer: 'The President appoints the Prime Minister',
                  options: ['The President appoints the Prime Minister', 'the people directly elect the PM', 'the President chooses anyone'],
                  hint: 'Review Article 75(1) and the distinction between the President\'s formal appointment power and the.',
                  misconception: 'Students often believe the President can freely choose any MP as Prime Minister based on personal judgment, or that the single largest.' },
                { id: 'b', prompt: 'In the 1996 general election, the BJP emerged as the single largest party with 161 seats but failed to prove majority. The President then invited H.D.', answer: 'Yes, the President followed convention',
                  options: ['Yes, the President followed convention', 'President should have given BJP more time', 'President acted politically'],
                  hint: 'Review Article 75(1) and the distinction between the President\'s formal appointment power and the.',
                  misconception: 'Students often believe the President can freely choose any MP as Prime Minister based on personal judgment, or that the single largest.' }
          ],
            remediations: { 'the-president-can-freely-choose': { steps: ['If the student holds this misconception, have them: (1) Read Article 75(1) text: "The Prime Minister shall be appointed.', '(3) Identify at which step the President exercised choice vs.', 'followed constitutional compulsion.', '(4) Compare with 2014/2019 where clear majority removed presidential discretion entirely.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_13_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the President can freely choose any MP as Prime Minister based on personal judgment, or that the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "Coalition governments weaken the Prime Minister\'s position because the PM becomes a \'chairman of the board\' rather than a leader." Use.', answer: 'The argument is partially valid but oversimplified',
                  options: ['The argument is partially valid but oversimplified', 'inherently weak'],
                  hint: 'Review Article 75(1) and the distinction between the President\'s formal appointment power and the.',
                  misconception: 'Students often believe the President can freely choose any MP as Prime Minister based on personal judgment, or that the single largest.' }
          ],
            remediations: { 'the-president-can-freely-choose': { steps: ['If the student holds this misconception, have them: (1) Read Article 75(1) text: "The Prime Minister shall be appointed.', '(3) Identify at which step the President exercised choice vs.', 'followed constitutional compulsion.', '(4) Compare with 2014/2019 where clear majority removed presidential discretion entirely.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_13_008', difficulty: 'standard',
          question: 'Collective responsibility to the Lok Sabha is the constitutional principle.',
          hint: 'Review Article 75(3) and the distinction between parliamentary and presidential.',
          misconception: 'Students often think collective responsibility means all ministers must agree on every policy publicly, and that.',
          parts: [
                { id: 'a', prompt: 'In a coalition government, if one coalition partner withdraws support and the government loses a vote of confidence in the Lok Sabha, what happens to the.', answer: 'The entire Council of Ministers, including the Prime Minister, must resign',
                  options: ['The entire Council of Ministers, including the Prime Minister, must resign', 'collective'],
                  hint: 'Review Article 75(3) and the distinction between parliamentary and presidential executives.',
                  misconception: 'Students often think collective responsibility means all ministers must agree on every policy publicly, and that a minister who disagrees.' }
          ],
            remediations: { 'collective-responsibility-means-all-ministers': { steps: ['To correct this, use the 1999 Vajpayee government resignation after losing a confidence motion by one vote: show that.', 'Then, have students read Article 75(3) and discuss the difference between Cabinet solidarity (convention) and.', 'Finally, ask them to write a one-paragraph explanation distinguishing the two.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_13_009', difficulty: 'standard',
          question: 'The Council of Ministers is the collective body of all ministers (Cabinet.',
          hint: 'Revisit Article 75(1) and (3) in the Constitution; review c11_ps_cbse_13_006 (PM and CoM.',
          misconception: 'Students often believe the "Cabinet" and "Council of Ministers" are synonyms, or that the "Inner Cabinet" is.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Council of Ministers is the collective body of all ministers (Cabinet Ministers,',
                  options: ['The Council of Ministers is the collective body of all ministers (Cabinet Ministers,', 'The executive is the branch of government constitutionally mandated to implement,', 'A parliamentary executive system is one where the executive (Prime Minister and Council', 'The political executive consists of elected representatives (Prime Minister, Council of'],
                  hint: 'Revisit Article 75(1) and (3) in the Constitution; review c11_ps_cbse_13_006 (PM and CoM as real.',
                  misconception: 'Students often believe the "Cabinet" and "Council of Ministers" are synonyms, or that the "Inner Cabinet" is a constitutional body like the.' }
          ],
            remediations: { 'the-cabinet-and-council-of': { steps: ['Re-read Article 75(1) and (3) — note "Council of Ministers" appears, not "Cabinet."', 'Read the 44th Amendment\'s insertion in Article 352 — see "Cabinet" defined for the first time, only for emergency.', 'List 3-4 real ministers from the current government — classify each as Cabinet Minister / MoS (Independent Charge).', 'Find a news report on a "Kitchen Cabinet" meeting (e.g., pre-2019 surgical strike decisions) — note the attendees were.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_13_010', difficulty: 'standard',
          question: 'The Vice President of India is the second-highest constitutional office.',
          hint: 'Review Article 74 (Council of Ministers aids President) and Article 75 (collective.',
          misconception: 'Students think the Vice President is "just a spare tire" for the President with no real work, confusing the Indian.',
          parts: [
                { id: 'a', prompt: 'Which constitutional article specifies the election of the Vice President by an electoral college consisting of members of both Houses of Parliament?', answer: 'Article 66',
                  options: ['Article 66', 'just a spare tire'],
                  hint: 'Review Article 74 (Council of Ministers aids President) and Article 75 (collective responsibility.',
                  misconception: 'Students think the Vice President is "just a spare tire" for the President with no real work, confusing the Indian office with the US Vice.' },
                { id: 'b', prompt: 'A vacancy arises in the President\'s office due to resignation. The Vice President assumes office as Acting President.', answer: 'Six months',
                  options: ['Six months', 'until the next general election', 'five years', 'just a spare tire'],
                  hint: 'Review Article 74 (Council of Ministers aids President) and Article 75 (collective responsibility.',
                  misconception: 'Students think the Vice President is "just a spare tire" for the President with no real work, confusing the Indian office with the US Vice.' }
          ],
            remediations: { 'the-vice-president-is-just': { steps: ['Read Article 64 and 89 - note "ex-officio Chairman" and "shall preside".', 'Watch 15 minutes of Rajya Sabha proceedings (Sansad TV) - observe the Vice President managing debates, allowing.', 'Compare with US Vice President\'s Senate role (Article I, Section 3) - only votes to break ties.', 'Write two sentences: "In India, the Vice President is integral to daily legislative functioning.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_13_011', difficulty: 'standard',
          question: 'The Governor is the constitutional head of a state in India, appointed by the.',
          hint: 'Revisit Article 163 wording and the S.R. Bommai (1994) case summary — focus on the.',
          misconception: 'Students think the Governor is merely a "rubber stamp" like the President, or conversely, an all-powerful "Centre\'s.',
          parts: [
                { id: 'a', prompt: 'Under which Article is the Governor appointed, and who appoints them?', answer: 'Article 155: The Governor is appointed by the President of India',
                  options: ['Article 155: The Governor is appointed by the President of India', 'elected by state legislature', 'appointed by PM', 'rubber stamp'],
                  hint: 'Revisit Article 163 wording and the S.R. Bommai (1994) case summary — focus on the distinction.',
                  misconception: 'Students think the Governor is merely a "rubber stamp" like the President, or conversely, an all-powerful "Centre\'s agent" who can dismiss.' },
                { id: 'b', prompt: 'Explain why the Governor is described as having a "dual role" — as the state\'s constitutional head and as the Centre\'s agent.', answer: 'As constitutional head: Article 163',
                  options: ['As constitutional head: Article 163', 'just a rubber stamp', 'just Centre\'s spy', 'rubber stamp'],
                  hint: 'Revisit Article 163 wording and the S.R. Bommai (1994) case summary — focus on the distinction.',
                  misconception: 'Students think the Governor is merely a "rubber stamp" like the President, or conversely, an all-powerful "Centre\'s agent" who can dismiss.' },
                { id: 'c', prompt: 'Compare the discretionary powers of the Governor (Article 163) with those of the President (Article 74).', answer: 'Differences: (1) Governor\'s discretion is wider',
                  options: ['Differences: (1) Governor\'s discretion is wider', 'both have same discretion', 'Governor has no discretion', 'rubber stamp'],
                  hint: 'Revisit Article 163 wording and the S.R. Bommai (1994) case summary — focus on the distinction.',
                  misconception: 'Students think the Governor is merely a "rubber stamp" like the President, or conversely, an all-powerful "Centre\'s agent" who can dismiss.' }
          ],
            remediations: { 'the-governor-is-merely-a': { steps: ['Re-read Article 163(1) and 163(2) — note the phrase "except in so far as he is...', 'Study S.R. Bommai case summary — identify the 5 guidelines for Article 356.', 'Compare with President\'s position (Article 74) using a Venn diagram.', 'Analyze 2 recent news cases (e.g., Maharashtra 2019, Puducherry 2021) applying the "aid and advice" vs "discretion".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_13_012', difficulty: 'standard',
          question: 'Bureaucracy is the permanent executive branch of government comprising civil.',
          hint: 'Revisit c11_ps_cbse_13_003 "Political executive vs permanent executive" and identify: (1).',
          misconception: 'Students believe "bureaucracy is accountable only to the political executive (Minister)" and that "neutrality means.',
          parts: [
                { id: 'a', prompt: 'Article 310 of the Indian Constitution establishes which fundamental principle regarding civil servants\' tenure?', answer: 'Article 310 establishes the "pleasure doctrine"',
                  options: ['Article 310 establishes the "pleasure doctrine"', 'fixed tenure', 'lifetime appointment', 'spoils system'],
                  hint: 'Revisit c11_ps_cbse_13_003 "Political executive vs permanent executive" and identify: (1) Who makes.',
                  misconception: 'Students believe "bureaucracy is accountable only to the political executive (Minister)" and that "neutrality means doing whatever the.' },
                { id: 'b', prompt: 'A Minister directs a Secretary to bypass tender procedures for a ₹500 crore infrastructure contract citing "urgency." The Secretary refuses, citing GFR.', answer: 'The Secretary invokes financial accountability under GFR and constitutional',
                  options: ['The Secretary invokes financial accountability under GFR and constitutional', 'Secretary must always obey Minister', 'bureaucracy is accountable only to the political executive (Minister)', 'neutrality means doing whatever the Minister says'],
                  hint: 'Revisit c11_ps_cbse_13_003 "Political executive vs permanent executive" and identify: (1) Who makes.',
                  misconception: 'Students believe "bureaucracy is accountable only to the political executive (Minister)" and that "neutrality means doing whatever the.' }
          ],
            remediations: { 'bureaucracy-is-accountable-only-to': { steps: ['Re-read Article 311 (dismissal/removal/reduction in rank safeguards) and Article 312 (All India Services).', 'Trace a specific case — e.g., the 2018 "Coal Scam" where civil servants were prosecuted despite Ministerial approval.', 'Create a flowchart: Minister\'s order → Secretary\'s file noting → CAG audit objection → PAC hearing → CVC reference →.', 'Identify at which stage "neutrality" protected the civil servant and at which "accountability" caught the violation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
