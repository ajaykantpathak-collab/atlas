import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch04_p2: SimDef = {
    id: 'v3_c12_ps_ch04_p2',
    title: 'Alternative Centres of Power · Part 2/2',
    subtitle: 'The trade deal designed to make war impossible',
    classLevel: 12, subject: 'political_science', topic: 'Alternative Centres of Power · Part 2/2',
    chapters: ['c12_ps_ch04'],
    nodeIds: ['c12_ps_cbse_04_007', 'c12_ps_cbse_04_008', 'c12_ps_cbse_04_009', 'c12_ps_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'European institutions analyst', intro: 'Twenty-seven countries now make binding laws together — because in 1950 someone decided to make war materially impossible instead of just forbidden.', goal: 'Sequence the EU\'s treaty-by-treaty evolution and distinguish supranational community method from intergovernmental pillars.' },
    discovery: {
        question: 'In 1950, France offered to hand control of its coal and steel — the very materials armies run on — to a shared authority with Germany, its enemy of three wars. Why would a victor volunteer to disarm itself?',
        options: ['Pooling war-critical resources made war \'materially impossible\' — neither side could re-arm secretly', 'France was too weak to refuse American pressure', 'It was purely a trade deal with no security motive', 'Germany demanded it as a condition of occupation ending'],
        answer: 'Pooling war-critical resources made war \'materially impossible\' — neither side could re-arm secretly',
        hook: 'Students assume the EU began with the Maastricht Treaty in 1992 — actually it was built stepwise from the 1951 coal-steel pool through the 1957 common market to a union that kept economics supranational but foreign policy intergovernmental.',
    },
    teaching: [
        { title: 'Japan as an Economic Power and Its Constitutional Constraints', text: 'Japan is a major economic power that emerged after World War II under a pacifist constitution (Article 9) which renounces war as a sovereign right and prohibits maintenance of land, sea, and air.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_04_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace each treaty from coal and steel to Maastricht, and decide at every step which slice of sovereignty states pooled — and why they refused to pool foreign policy the same way.',
        labels: ['Japan as an Economic', 'Russia in the Post-Soviet', 'Regionalism and the Multipolar', 'India\'s Relations with'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_04_007', title: 'Japan as an Economic Power and Its Constitutional Constraints',
          caseStudy: { intro: 'Imagine reading a news headline: "Japan approves record defense budget, citing regional threats." A Class 12 student might wonder: "Doesn\'t Japan have.',
            decisions: [{ prompt: 'What is the exact wording of Article 9 of the Japanese Constitution regarding the renunciation of war and maintenance of armed forces?', options: [
                { text: 'Article 9 states: "Aspiring sincerely to an international peace based on justice and', outcome: 'Article 9 states: "Aspiring sincerely to an international peace based on justice and order, the.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often believe Japan has **no military at all** because of Article 9, or that the.', reveals: 'japan-has-no-military-at' },
                { text: 'Article 9 was added in 1947', outcome: 'Not quite — Students often believe Japan has **no military at all** because of Article 9, or that the.', reveals: 'japan-has-no-military-at' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_04_008', title: 'Russia in the Post-Soviet Era: Economy and Foreign Policy',
          caseStudy: { intro: 'Imagine you are reading a 2024 newspaper headline: "Russia-India Annual Summit: Putin and Modi Discuss Energy, Defence, and a Multipolar World." You wonder.',
            decisions: [{ prompt: 'What was the "shock therapy" model implemented in Russia in the early 1990s, and who were its chief architects?', options: [
                { text: 'Shock therapy was a rapid transition programme involving simultaneous price', outcome: 'Shock therapy was a rapid transition programme involving simultaneous price liberalization, mass.' },
                { text: 'gradual reform like China', outcome: 'Not quite — Students often think Russia\'s post-Soviet trajectory was inevitable — "communism failed, so chaos.', reveals: 'russia-s-post-soviet-trajectory' },
                { text: 'big bang', outcome: 'Not quite — Students often think Russia\'s post-Soviet trajectory was inevitable — "communism failed, so chaos.', reveals: 'russia-s-post-soviet-trajectory' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_04_009', title: 'Regionalism and the Multipolar World Order',
          caseStudy: { intro: 'Imagine reading a news headline: "BRICS expands to include six new members; G7 calls it a \'fragmentation risk\'." This captures the tension between regional.',
            decisions: [{ prompt: 'What is the fundamental difference between the European Union\'s \'supranational\' model of regionalism and ASEAN\'s \'intergovernmental\' model?', options: [
                { text: 'Correct answer: The EU has supranational institutions (Commission, Court of Justice,', outcome: 'Correct answer: The EU has supranational institutions (Commission, Court of Justice, Parliament).' },
                { text: 'both are identical', outcome: 'Not quite — Students equate \'multipolarity\' with \'multilateralism\' and assume more power centres automatically.', reveals: 'students-equate-multipolarity-with-multilaterali' },
                { text: 'ASEAN has a common currency', outcome: 'Not quite — Students equate \'multipolarity\' with \'multilateralism\' and assume more power centres automatically.', reveals: 'students-equate-multipolarity-with-multilaterali' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_04_010', title: 'India\'s Relations with the EU, ASEAN, China and Russia',
          caseStudy: { intro: 'Imagine you are a foreign policy advisor briefing the Prime Minister before a quadrilateral summit week: Monday in Brussels (EU), Tuesday in Jakarta (ASEAN).',
            decisions: [{ prompt: 'Name the institutional dialogue mechanism that serves as the apex forum for India-EU strategic engagement, and state its frequency.', options: [
                { text: 'The India-EU Summit, held annually (though gaps occur), is the apex political dialogue', outcome: 'The India-EU Summit, held annually (though gaps occur), is the apex political dialogue mechanism.' },
                { text: 'Joint Commission', outcome: 'Not quite — Students often believe India\'s "Act East Policy" is merely a rebranding of "Look East Policy" with.', reveals: 'india-s-act-east-policy' },
                { text: 'Trade and Technology Council', outcome: 'Not quite — Students often believe India\'s "Act East Policy" is merely a rebranding of "Look East Policy" with.', reveals: 'india-s-act-east-policy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'An export intern asks who decides the tariff her firm\'s textiles face in the EU and who could negotiate it down — \'probably the European Parliament, since it\'s elected.\'',
            decisions: [{ prompt: 'How does EU competence actually map?', options: [
                { text: 'The Council sets the common external tariff on a Commission proposal, and the Commission negotiates the trade deal — Parliament only approves or rejects the final text; pooled sovereignty put economics under qualified-majority supranational rule while foreign policy still needs all members\' yes.', outcome: 'The chapter\'s institutional map: the EU acts like a state in trade and a club in war — knowing which competence governs your issue is the whole skill.' },
                { text: 'She\'s right — the directly elected Parliament legislates tariffs like a national parliament does.', outcome: 'Election doesn\'t equal competence — the Parliament\'s trade role is a veto on finished deals; proposing and negotiating sit with the Commission, and the tariff itself is the Council\'s call.', reveals: 'elected-equals-empowered' },
                { text: 'Each member state sets its own tariff — Germany and France can differ.', outcome: 'The single market exists precisely because members pooled commercial policy — a common external tariff is what makes the bloc negotiate with one weight; national tariffs would dissolve it.', reveals: 'states-keep-tariffs' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_04_010', title: 'You made it',
          caseStudy: { intro: 'You can now explain why Europe integrated economics by majority vote but kept war-and-peace decisions unanimous — and why that makes the EU a union of states, not a federal superstate.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_04_007', difficulty: 'standard',
          question: 'Japan is a major economic power that emerged after World War II under.',
          hint: 'Revisit c11_ps_cbse_10_001 (What is a constitution) and c12_ps_cbse_04_001 (EU.',
          misconception: 'Students often believe Japan has **no military at all** because of Article 9, or that the Self-Defense Forces are.',
          parts: [
                { id: 'a', prompt: 'A Japanese citizen argues that the Self-Defense Forces (SDF) are unconstitutional because Article 9 says "war potential will never be maintained." How would.', answer: 'The government interprets Article 9 as permitting the maintenance of forces for',
                  options: ['The government interprets Article 9 as permitting the maintenance of forces for', 'The SDF are unconstitutional and should be disbanded', 'Article 9 was amended to allow the SDF'],
                  hint: 'Revisit c11_ps_cbse_10_001 (What is a constitution) and c12_ps_cbse_04_001 (EU as civilian power).',
                  misconception: 'Students often believe Japan has **no military at all** because of Article 9, or that the Self-Defense Forces are unconstitutional and.' },
                { id: 'b', prompt: 'Compare the constitutional constraints on Japan\'s military role with those on Germany\'s military role under its Basic Law (Article 87a).', answer: 'Similarity: Both constitutions (Japan Article 9, Germany Article 87a) were',
                  options: ['Similarity: Both constitutions (Japan Article 9, Germany Article 87a) were', 'Both have no military', 'Germany\'s constitution bans all forces'],
                  hint: 'Revisit c11_ps_cbse_10_001 (What is a constitution) and c12_ps_cbse_04_001 (EU as civilian power).',
                  misconception: 'Students often believe Japan has **no military at all** because of Article 9, or that the Self-Defense Forces are unconstitutional and.' }
          ],
            remediations: { 'japan-has-no-military-at': { steps: ['If a student holds the above misconception, take these steps: (1) Show the exact text of Article 9 and the 1954 Cabinet.', '(2) Compare with the German Basic Law Article 87a to illustrate how different constitutional texts handle post-war.', '(3) Assign a mini-case study: "Sunakawa Case (1959) – Supreme Court of Japan" to see how the judiciary avoided ruling.', '(4) Re-diagnose with Question 3 above.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_04_008', difficulty: 'standard',
          question: 'Russia in the post-Soviet era refers to the Russian Federation\'s political.',
          hint: 'Revisit c11_ps_cbse_07_001 (What is a nation/state) and distinguish Westphalian.',
          misconception: 'Students often think Russia\'s post-Soviet trajectory was inevitable — "communism failed, so chaos followed.".',
          parts: [
                { id: 'a', prompt: 'What was the "shock therapy" model implemented in Russia in the early 1990s, and who were its chief architects?', answer: 'Shock therapy was a rapid transition programme involving simultaneous price',
                  options: ['Shock therapy was a rapid transition programme involving simultaneous price', 'gradual reform like China', 'big bang', 'crossing the river by feeling the stones'],
                  hint: 'Revisit c11_ps_cbse_07_001 (What is a nation/state) and distinguish Westphalian sovereignty from.',
                  misconception: 'Students often think Russia\'s post-Soviet trajectory was inevitable — "communism failed, so chaos followed." In reality, *policy choices*.' },
                { id: 'b', prompt: 'In 1999, Putin described the USSR\'s collapse as "the greatest geopolitical catastrophe of the 20th century." How did this worldview shape Russia\'s foreign.', answer: 'Putin initially sought partnership (2001: first to call Bush after 9/11',
                  options: ['Putin initially sought partnership (2001: first to call Bush after 9/11', 'Russia always opposed NATO', 'communism failed, so chaos followed', 'Russia\'s post-Soviet trajectory was inevitable'],
                  hint: 'Revisit c11_ps_cbse_07_001 (What is a nation/state) and distinguish Westphalian sovereignty from.',
                  misconception: 'Students often think Russia\'s post-Soviet trajectory was inevitable — "communism failed, so chaos followed." In reality, *policy choices*.' }
          ],
            remediations: { 'russia-s-post-soviet-trajectory': { steps: ['If the student conflates Russia\'s trajectory with historical inevitability: (1) Revisit the **shock therapy vs.', 'gradual reform** comparison using a two-column table (price liberalization timing, privatization method, state.', '(2) Read the 1998 IMF memo admitting "we underestimated institutional requirements" — connect to Class 11 Political.', '(3) Re-diagnostic: "Explain how the *loans-for-shares* scheme (1995) created oligarchs who then financed Yeltsin\'s 1996.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Russia\'s post-Soviet trajectory was inevitable — "communism failed, so chaos followed.".',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Russia\'s current great power status rests entirely on energy exports and nuclear weapons — it is a \'gas station with nukes\'."', answer: 'The claim is partially true but reductionist',
                  options: ['The claim is partially true but reductionist', 'communism failed, so chaos followed', 'Russia\'s post-Soviet trajectory was inevitable'],
                  hint: 'Revisit c11_ps_cbse_07_001 (What is a nation/state) and distinguish Westphalian sovereignty from.',
                  misconception: 'Students often think Russia\'s post-Soviet trajectory was inevitable — "communism failed, so chaos followed." In reality, *policy choices*.' }
          ],
            remediations: { 'russia-s-post-soviet-trajectory': { steps: ['If the student conflates Russia\'s trajectory with historical inevitability: (1) Revisit the **shock therapy vs.', 'gradual reform** comparison using a two-column table (price liberalization timing, privatization method, state.', '(2) Read the 1998 IMF memo admitting "we underestimated institutional requirements" — connect to Class 11 Political.', '(3) Re-diagnostic: "Explain how the *loans-for-shares* scheme (1995) created oligarchs who then financed Yeltsin\'s 1996.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_04_009', difficulty: 'standard',
          question: 'Regionalism refers to the process of cooperation and integration among states.',
          hint: 'Revisit the EU (c12_ps_cbse_04_001) and ASEAN (c12_ps_cbse_04_003) nodes to relearn the.',
          misconception: 'Students equate \'multipolarity\' with \'multilateralism\' and assume more power centres automatically mean more.',
          parts: [
                { id: 'a', prompt: 'APPLY: India joins the Shanghai Cooperation Organisation (SCO) in 2017 despite border tensions with China and Pakistan.', answer: 'Correct answer: Hedging means avoiding over-dependence on any single power bloc',
                  options: ['Correct answer: Hedging means avoiding over-dependence on any single power bloc', 'India is confused', 'SCO and Quad are contradictory'],
                  hint: 'Revisit the EU (c12_ps_cbse_04_001) and ASEAN (c12_ps_cbse_04_003) nodes to relearn the.',
                  misconception: 'Students equate \'multipolarity\' with \'multilateralism\' and assume more power centres automatically mean more cooperation.' }
          ],
            remediations: { 'students-equate-multipolarity-with-multilaterali': { steps: ['If the student conflates polarity with institutionalism: (1) Revisit c11_ps_cbse_09_001 (negative vs positive peace).', '(2) Use the "Concert of Europe" (1815) vs "League of Nations" (1920) analogy: both multipolar, but only the latter had.', '(3) Re-diagnostic: "Give one example where multipolarity led to war and one where it enabled a treaty.', 'Explain the institutional difference."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_04_010', difficulty: 'standard',
          question: 'India\'s relations with the EU, ASEAN, China, and Russia constitute.',
          hint: 'Revisit c12_ps_cbse_04_009 (Regionalism and Multipolar World Order) for the structural.',
          misconception: 'Students often believe India\'s "Act East Policy" is merely a rebranding of "Look East Policy" with no substantive.',
          parts: [
                { id: 'a', prompt: 'A crisis erupts at the LAC in Eastern Ladakh. India simultaneously deepens defense exercises with the Quad and continues importing S-400 systems from Russia.', answer: 'Non-alignment implied equidistance and avoidance of bloc politics',
                  options: ['Non-alignment implied equidistance and avoidance of bloc politics', 'Act East Policy', 'Look East Policy'],
                  hint: 'Revisit c12_ps_cbse_04_009 (Regionalism and Multipolar World Order) for the structural.',
                  misconception: 'Students often believe India\'s "Act East Policy" is merely a rebranding of "Look East Policy" with no substantive difference.' }
          ],
            remediations: { 'india-s-act-east-policy': { steps: ['If the student conflates Look East and Act East: (1) Revisit c12_ps_cbse_04_003 (ASEAN integration) to recall the.', '(2) Read MEA\'s 2014 "Act East Policy" statement and compare with 2003 "Look East" speech — list three new.', '(3) Map India\'s defense exports to ASEAN since 2014 (BrahMos to Philippines, Akash interest from Vietnam/Indonesia).', '(4) Re-attempt Diagnostic Question 2 with this lens.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
