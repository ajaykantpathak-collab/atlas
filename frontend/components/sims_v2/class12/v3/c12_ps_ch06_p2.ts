import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch06_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch06_p2: SimDef = {
    id: 'v3_c12_ps_ch06_p2',
    title: 'International Organisations · Part 2/2',
    subtitle: 'Why sovereign states build clubs they then complain about',
    classLevel: 12, subject: 'political_science', topic: 'International Organisations · Part 2/2',
    chapters: ['c12_ps_ch06'],
    nodeIds: ['c12_ps_cbse_06_007', 'c12_ps_cbse_06_008', 'c12_ps_cbse_06_009', 'c12_ps_cbse_06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Multilateral institutions analyst', intro: 'A virus ignores borders; a finance minister cannot. Something has to bridge that gap — and it isn\'t a world government.', goal: 'Explain why states create international organisations and how design choices solve collective-action problems without enforcement power.' },
    discovery: {
        question: 'The UN has no army, can\'t tax anyone, and runs on a budget a mid-sized government would call pocket change — so why do even superpowers keep funding it and showing up?',
        options: ['Standing rules, monitoring and permanent forums make cooperation cheaper and more predictable than renegotiating every crisis alone', 'Because the UN can legally compel any state to obey', 'Tradition — states attend out of habit, not interest', 'Small states fund it; big states merely tolerate it'],
        answer: 'Standing rules, monitoring and permanent forums make cooperation cheaper and more predictable than renegotiating every crisis alone',
        hook: 'The UN is not a world government — it cannot draft soldiers, levy taxes or legislate, and its resolutions bind only because member states agreed to accept them. It\'s a cooperation machine built by sovereign states, not a sovereign over them.',
    },
    teaching: [
        { title: 'The IMF and World Bank: Structure, Function and Criticism', text: 'The International Monetary Fund (IMF) and the World Bank are the two principal Bretton Woods institutions established in 1944 to manage the post-war international monetary system and promote global.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_06_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Diagnose the collective-action problems — free-riding, uncoordinated bans, unfunded public goods — that no state can fix alone, and match each to what an international organisation actually does.',
        labels: ['The IMF and World', 'The WTO and Global', 'The International Court', 'India\'s Role in'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_06_007', title: 'The IMF and World Bank: Structure, Function and Criticism',
          caseStudy: { intro: 'Imagine a developing country like Sri Lanka in 2022: foreign reserves exhausted, unable to import fuel or medicine, sovereign default looming.',
            decisions: [{ prompt: 'What is the primary difference between the lending window of the IMF and that of the World Bank in terms of time horizon and purpose?', options: [
                { text: 'Correct answer: The IMF provides short-to-medium-term financing (typically 1–5 years) to', outcome: 'Correct answer: The IMF provides short-to-medium-term financing (typically 1–5 years) to address.' },
                { text: 'UN agencies', outcome: 'Not quite — Students often think the IMF and World Bank are "UN agencies" in the same way as WHO or UNESCO.', reveals: 'the-imf-and-world-bank' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_06_008', title: 'The WTO and Global Trade Regime after 1995',
          caseStudy: { intro: 'Imagine you read a news headline: "India loses WTO dispute on solar panel domestic content requirements." Start by asking: *Why does a global body tell India.',
            decisions: [{ prompt: 'What is the key institutional difference between GATT (1947) and the WTO (1995) regarding legal status and dispute settlement?', options: [
                { text: 'GATT was a provisional multilateral treaty with no institutional foundation and a weak', outcome: 'GATT was a provisional multilateral treaty with no institutional foundation and a weak dispute.' },
                { text: 'GATT had a stronger dispute system', outcome: 'Not quite — Students often think **the WTO is a \'world government\' that makes laws for all countries**.', reveals: 'the-wto-is-a-world' },
                { text: '**the WTO is a \'world government\' that makes laws for all countries**', outcome: 'Not quite — Students often think **the WTO is a \'world government\' that makes laws for all countries**.', reveals: 'the-wto-is-a-world' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_06_009', title: 'The International Court of Justice and International Law',
          caseStudy: { intro: 'Imagine two neighbouring countries, India and Pakistan, disagree on the maritime boundary in the Sir Creek area.',
            decisions: [{ prompt: 'What is the composition of the International Court of Justice and how are judges elected?', options: [
                { text: 'The ICJ consists of 15 judges elected for nine-year terms by an absolute majority in both', outcome: 'The ICJ consists of 15 judges elected for nine-year terms by an absolute majority in both the.' },
                { text: 'appointed by the Secretary-General', outcome: 'Not quite — Students often confuse the ICJ (UN\'s principal judicial organ, inter-state disputes only) with the.', reveals: 'students-often-confuse-the-icj' },
                { text: 'elected only by the GA', outcome: 'Not quite — Students often confuse the ICJ (UN\'s principal judicial organ, inter-state disputes only) with the.', reveals: 'students-often-confuse-the-icj' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_06_010', title: 'India\'s Role in the UN and Reform of International Institutions',
          caseStudy: { intro: 'Start with a relatable scenario: "You see a news headline: \'India loses UNSC vote again — China blocks reform.\' Ask: Why does India want a permanent seat?',
            decisions: [{ prompt: 'Which of the following correctly lists the four G4 nations jointly advocating for permanent UN Security Council membership?', options: [
                { text: 'Correct answer: India, Brazil, Germany, Japan', outcome: 'Correct answer: India, Brazil, Germany, Japan. A wrong answer (e.g., including South Africa.' },
                { text: 'Uniting for Consensus', outcome: 'Not quite — Students often think India\'s UNSC bid is \'blocked only by China\' — writing \'China uses veto to stop.', reveals: 'india-s-unsc-bid-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A newsroom junior writes \'UN demands ceasefire, 140-10\' — then the Security Council session ends in a single P5 veto and nothing binds. \'But the vote passed overwhelmingly?\'',
            decisions: [{ prompt: 'What did the two outcomes actually differ on?', options: [
                { text: 'Legal force — the General Assembly\'s vote is universal but recommendatory, moral pressure without obligation; the Security Council alone can bind members under the Charter, and the veto is the design feature that lets one great power stop it — world opinion outvoted, enforcement outvoted it back.', outcome: 'The chapter\'s architecture: universality lives in the GA, power lives in the SC — the Charter deliberately traded sovereign equality for great-power consensus on security.' },
                { text: 'Nothing — both are UN resolutions, so the GA majority should override the veto.', outcome: 'No override exists — the GA\'s authority is deliberative, the SC\'s is binding under Chapter VII; 140 votes of opinion can\'t compel what one veto of enforcement blocks.', reveals: 'majority-beats-veto' },
                { text: 'The veto was illegitimate — fairness should govern the Council like the Assembly.', outcome: 'The veto wasn\'t a bug but the price of the great powers joining — the Charter chose enforceable peace over fair voting, which is exactly why the SC\'s one-country block stands.', reveals: 'veto-is-unfairness' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_06_010', title: 'You made it',
          caseStudy: { intro: 'You can now explain why globalisation increases the need for international organisations instead of shrinking it — and why the Paris climate deal chose voluntary pledges over unenforceable targets.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_06_007', difficulty: 'standard',
          question: 'The International Monetary Fund (IMF) and the World Bank are the two principal.',
          hint: 'Review the distinction between UN technical agencies (one state one vote) and Bretton.',
          misconception: 'Students often think the IMF and World Bank are "UN agencies" in the same way as WHO or UNESCO — subject to General.',
          parts: [
                { id: 'a', prompt: 'A country experiencing a sudden capital flight and currency collapse approaches the IMF.', answer: 'Correct answer: Instrument = Stand-By Arrangement (SBA), the IMF\'s workhorse',
                  options: ['Correct answer: Instrument = Stand-By Arrangement (SBA), the IMF\'s workhorse', 'Structural Adjustment Facility', 'UN agencies'],
                  hint: 'Review the distinction between UN technical agencies (one state one vote) and Bretton Woods.',
                  misconception: 'Students often think the IMF and World Bank are "UN agencies" in the same way as WHO or UNESCO — subject to General Assembly control.' }
          ],
            remediations: { 'the-imf-and-world-bank': { steps: ['If the student conflates IMF/World Bank roles or misses the voting-power critique: (1) Revisit node c12_ps_cbse_06_005.', '(2) Review Class 10 History node c10_hist_cbse_03_005 (Bretton Woods Institutions) for the 1944 origin story.', '(3) Create a two-column table: IMF vs World Bank on — Purpose, Lending Horizon, Conditionality Type, Voting Share.', '(4) Re-attempt Diagnostic Questions 1 and 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the IMF and World Bank are "UN agencies" in the same way as WHO or UNESCO — subject to General.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "IMF conditionality during the 1997 Asian Financial Crisis deepened the recession and violated national sovereignty." Use evidence from.', answer: 'Correct evaluation: Partially valid',
                  options: ['Correct evaluation: Partially valid', 'UN agencies'],
                  hint: 'Review the distinction between UN technical agencies (one state one vote) and Bretton Woods.',
                  misconception: 'Students often think the IMF and World Bank are "UN agencies" in the same way as WHO or UNESCO — subject to General Assembly control.' }
          ],
            remediations: { 'the-imf-and-world-bank': { steps: ['If the student conflates IMF/World Bank roles or misses the voting-power critique: (1) Revisit node c12_ps_cbse_06_005.', '(2) Review Class 10 History node c10_hist_cbse_03_005 (Bretton Woods Institutions) for the 1944 origin story.', '(3) Create a two-column table: IMF vs World Bank on — Purpose, Lending Horizon, Conditionality Type, Voting Share.', '(4) Re-attempt Diagnostic Questions 1 and 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_06_008', difficulty: 'standard',
          question: 'The World Trade Organization (WTO) is an intergovernmental organisation.',
          hint: 'Revisit c12_ps_cbse_06_001 (Need for International Organisations) for the logic.',
          misconception: 'Students often think **the WTO is a \'world government\' that makes laws for all countries**.',
          parts: [
                { id: 'a', prompt: 'India imposes a higher internal tax on imported solar panels than on domestically produced ones to promote its National Solar Mission.', answer: 'This violates the **National Treatment principle (Article III of GATT 1994)**',
                  options: ['This violates the **National Treatment principle (Article III of GATT 1994)**', '**the WTO is a \'world government\' that makes laws for all countries**'],
                  hint: 'Revisit c12_ps_cbse_06_001 (Need for International Organisations) for the logic of multilateralism.',
                  misconception: 'Students often think **the WTO is a \'world government\' that makes laws for all countries**.' }
          ],
            remediations: { 'the-wto-is-a-world': { steps: ['If the student holds the \'world government\' misconception: (1) Show the WTO Agreement\'s Preamble: "Recognizing that.', '(2) Compare with the UN Security Council (Chapter VII) which *can* impose binding decisions — contrast with WTO\'s.', '(3) Re-do Diagnostic Question 5, forcing the student to identify *which specific WTO provision* India opposed and *how*.', '(4) Assign a 150-word write-up: "Why the WTO cannot force a country to change its laws — the role of consensus and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_06_009', difficulty: 'standard',
          question: 'The International Court of Justice (ICJ) is the principal judicial organ of the.',
          hint: 'Revisit c11_ps_cbse_15_004 (Supreme Court jurisdictions) and c12_ps_cbse_06_002 (UN.',
          misconception: 'Students often confuse the ICJ (UN\'s principal judicial organ, inter-state disputes only) with the International.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The International Court of Justice (ICJ) is the principal judicial organ of the United',
                  options: ['The International Court of Justice (ICJ) is the principal judicial organ of the United', 'International organisations are formal institutions created by states through treaties to', 'The UN System is the institutional framework of the United Nations comprising six', 'The UN Security Council (UNSC) is the principal organ of the United Nations charged with'],
                  hint: 'Revisit c11_ps_cbse_15_004 (Supreme Court jurisdictions) and c12_ps_cbse_06_002 (UN organs).',
                  misconception: 'Students often confuse the ICJ (UN\'s principal judicial organ, inter-state disputes only) with the International Criminal Court (ICC).' }
          ],
            remediations: { 'students-often-confuse-the-icj': { steps: ['If the student conflates ICJ and ICC, have them create a two-column table: "ICJ" vs "ICC" with rows for: Established.', 'Use the ICJ Statute (Article 34: only states) and Rome Statute (Article 25: individuals) as primary sources.', 'Re-test with Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_06_010', difficulty: 'standard',
          question: 'India\'s role in the United Nations encompasses its historical contributions.',
          hint: 'If stuck on \'why reform hasn\'t happened\', revisit UN Charter Article 108 amendment.',
          misconception: 'Students often think India\'s UNSC bid is \'blocked only by China\' — writing \'China uses veto to stop India\' in board.',
          parts: [
                { id: 'a', prompt: 'Which of the following correctly lists the four G4 nations jointly advocating for permanent UN Security Council membership?', answer: 'Correct answer: India, Brazil, Germany, Japan',
                  options: ['Correct answer: India, Brazil, Germany, Japan', 'Uniting for Consensus'],
                  hint: 'If stuck on \'why reform hasn\'t happened\', revisit UN Charter Article 108 amendment procedure and.',
                  misconception: 'Students often think India\'s UNSC bid is \'blocked only by China\' — writing \'China uses veto to stop India\' in board answers.' }
          ],
            remediations: { 'india-s-unsc-bid-is': { steps: ['Revisit c12_ps_cbse_06_003 (UNSC veto power) and c12_ps_cbse_06_004 (UNSC reform and India\'s claim) — map the IGN.', 'Create a 2-column table: \'G4 Proposal\' vs \'UfC Proposal\' vs \'African Group (Ezulwini) Proposal\' — fill in: permanent.', 'Read MEA\'s 2023 statement on UNSC reform (mea.gov.in) — highlight the phrase \'text-based negotiations\' — this.', 'Re-attempt Diagnostic Q4 — if still confusing UfC with \'anti-reform\', watch PRS Legislative Research 15-min explainer.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
