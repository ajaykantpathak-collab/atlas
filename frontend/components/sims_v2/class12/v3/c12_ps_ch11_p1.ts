import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch11_p1: SimDef = {
    id: 'v3_c12_ps_ch11_p1',
    title: 'India\'s External Relations · Part 1/2',
    subtitle: 'Friendly to both camps, married to neither',
    classLevel: 12, subject: 'political_science', topic: 'India\'s External Relations · Part 1/2',
    chapters: ['c12_ps_ch11'],
    nodeIds: ['c12_ps_cbse_11_001', 'c12_ps_cbse_11_002', 'c12_ps_cbse_11_003', 'c12_ps_cbse_11_004', 'c12_ps_cbse_11_005', 'c12_ps_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Foreign policy analyst', intro: 'A newborn, resource-poor nation told two superpowers it would pick its own positions — and then did.', goal: 'Analyse the objectives, instruments and limits of Nehru\'s non-aligned foreign policy, 1946–1964.' },
    discovery: {
        question: 'In 1956 India slammed Britain and France over Suez — then went quiet when Soviet tanks rolled into Hungary weeks later. If non-alignment meant neutrality, what explains that?',
        options: ['Non-alignment was never neutrality — it meant judging each issue independently rather than voting with a bloc, and India\'s choices reflected that', 'India was secretly pro-Soviet all along', 'Nehru simply didn\'t know about Hungary', 'India stayed neutral but the West complained louder'],
        answer: 'Non-alignment was never neutrality — it meant judging each issue independently rather than voting with a bloc, and India\'s choices reflected that',
        hook: 'Students equate non-alignment with sitting out. Nehru\'s India took sides constantly — just never a bloc\'s side — and collected steel plants from the USSR and food aid from the US while refusing both alliances.',
    },
    teaching: [
        { title: 'Nehru\'s Foreign Policy and the Principles of Non-Alignment', text: 'Nehru\'s foreign policy (1946–1964) was a strategic framework built on three core objectives — preserving hard‑earned sovereignty, protecting territorial integrity, and promoting rapid economic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_11_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Test non-alignment against its hardest cases — Bandung, Panchsheel, Suez, Hungary, and finally the 1962 war with the country India had just signed \'peaceful coexistence\' with.',
        labels: ['Nehru\'s Foreign Policy', 'Non-Aligned Movement (NAM): India\'s', 'India-China Relations: Panchsheel, Border', 'India-Pakistan Wars of 1965', 'India and the Cold', 'India\'s Nuclear Policy: Peaceful'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_11_001', title: 'Nehru\'s Foreign Policy and the Principles of Non-Alignment',
          caseStudy: { intro: 'Imagine India today debating whether to join a US‑led security grouping or maintain strategic autonomy — this mirrors Nehru\'s 1947 dilemma when the Cold War.',
            decisions: [{ prompt: 'What were the three major objectives of Nehru\'s foreign policy as stated in the NCERT text? (Recall only)', options: [
                { text: 'The three objectives were: (1) preserve hard‑earned sovereignty, (2) protect territorial', outcome: 'The three objectives were: (1) preserve hard‑earned sovereignty, (2) protect territorial integrity.' },
                { text: 'spread democracy', outcome: 'Not quite — Students often equate **non‑alignment with neutrality or isolationism** — believing India "stayed.', reveals: 'students-often-equate-non-alignment' },
                { text: 'join the US bloc', outcome: 'Not quite — Students often equate **non‑alignment with neutrality or isolationism** — believing India "stayed.', reveals: 'students-often-equate-non-alignment' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_11_002', title: 'Non-Aligned Movement (NAM): India\'s Role and the Bandung Conference',
          caseStudy: { intro: 'Imagine you see a news headline: "NAM Summit Addresses Climate Justice for Global South." Ask: why does a movement born in the 1950s still matter?',
            decisions: [{ prompt: 'What were the two military alliance systems that divided the world during the early Cold War, and which one did Pakistan join?', options: [
                { text: 'The two alliances were the US-led NATO (1949) and the Soviet-led Warsaw Pact (1955)', outcome: 'The two alliances were the US-led NATO (1949) and the Soviet-led Warsaw Pact (1955).' },
                { text: 'India joined NATO', outcome: 'Not quite — Students often believe non-alignment meant India was "neutral" or "isolated" from world affairs.', reveals: 'non-alignment-meant-india-was' },
                { text: 'Pakistan joined Warsaw Pact', outcome: 'Not quite — Students often believe non-alignment meant India was "neutral" or "isolated" from world affairs.', reveals: 'non-alignment-meant-india-was' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_11_003', title: 'India-China Relations: Panchsheel, Border Dispute and the 1962 War',
          caseStudy: { intro: 'Imagine you are a Class 12 student reading a news headline: "India and China agree to disengage at Patrolling Point 15 in Ladakh." You wonder: why do these two.',
            decisions: [{ prompt: 'What are the five principles of Panchsheel, and in which year was the agreement signed between India and China?', options: [
                { text: 'The five principles are: (1) Mutual respect for each other’s territorial integrity and', outcome: 'The five principles are: (1) Mutual respect for each other’s territorial integrity and sovereignty.' },
                { text: 'non-alignment', outcome: 'Not quite — Students often believe the 1962 war was fought *only* over the McMahon Line in the east.', reveals: 'the-1962-war-was-fought' },
                { text: 'China wanted Arunachal for territory', outcome: 'Not quite — Students often believe the 1962 war was fought *only* over the McMahon Line in the east.', reveals: 'the-1962-war-was-fought' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_11_004', title: 'India-Pakistan Wars of 1965 and 1971 and the Tashkent Agreement',
          caseStudy: { intro: 'Imagine you are watching a news debate about the current India-Pakistan ceasefire along the Line of Control.',
            decisions: [{ prompt: 'In which year was the Tashkent Agreement signed, who were the two signatories, and which country brokered it?', options: [
                { text: 'The Tashkent Agreement was signed on 10 January 1966 by Indian Prime Minister Lal Bahadur', outcome: 'The Tashkent Agreement was signed on 10 January 1966 by Indian Prime Minister Lal Bahadur Shastri.' },
                { text: 'settled', outcome: 'Not quite — Students often believe the Tashkent Agreement "settled" the Kashmir dispute by restoring the.', reveals: 'the-tashkent-agreement-settled-the' },
                { text: 'settlement', outcome: 'Not quite — Students often believe the Tashkent Agreement "settled" the Kashmir dispute by restoring the.', reveals: 'the-tashkent-agreement-settled-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_11_005', title: 'India and the Cold War: Relations with the US and the USSR',
          caseStudy: { intro: 'Imagine you are a Class 12 student watching a news clip about the 2023 G20 Summit where India hosts both the US President and the Russian Foreign Minister.',
            decisions: [{ prompt: 'What were the two military blocs India refused to join during the Cold War, and which superpower led each bloc?', options: [
                { text: 'India refused to join the US-led NATO (North Atlantic Treaty Organisation) and the', outcome: 'India refused to join the US-led NATO (North Atlantic Treaty Organisation) and the USSR-led Warsaw.' },
                { text: 'SEATO/CENTO instead of Warsaw Pact, or saying India joined one bloc', outcome: 'Not quite — Students equate non-alignment with *neutrality* or *equidistance* — believing India stayed exactly.', reveals: 'students-equate-non-alignment-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_11_006', title: 'India\'s Nuclear Policy: Peaceful Uses and the Nuclear Debate',
          caseStudy: { intro: 'Imagine you are reading a news headline: "India tests Agni-V missile with 5,000 km range — China and Pakistan in range." A Class 12 student might wonder: *If.',
            decisions: [{ prompt: 'What were the three major objectives of Nehru\'s foreign policy, and how did the nuclear programme initiated under Homi Bhabha in the late.', options: [
                { text: 'The three objectives were: preserving sovereignty, protecting territorial integrity, and', outcome: 'The three objectives were: preserving sovereignty, protecting territorial integrity, and promoting.' },
                { text: 'Nehru wanted nuclear weapons from the start', outcome: 'Not quite — Students often believe **India\'s 1974 test was a "nuclear weapon test" and that India has been.', reveals: 'india-s-1974-test-was' },
                { text: 'nuclear weapon test', outcome: 'Not quite — Students often believe **India\'s 1974 test was a "nuclear weapon test" and that India has been.', reveals: 'india-s-1974-test-was' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A foreign-affairs columnist dismisses Nehru\'s non-alignment as \'Swiss-style fence-sitting — refusing to judge anyone to stay out of trouble.\'',
            decisions: [{ prompt: 'What does non-alignment actually look like in practice?', options: [
                { text: 'Independent judgment per issue — condemning the Suez invasion as neo-colonial while staying measured on Hungary wasn\'t fence-sitting but case-by-case evaluation; neutrality withdraws equally from all disputes, non-alignment engages on India\'s own terms.', outcome: 'The chapter\'s distinction: not joining blocs isn\'t refusing to judge — it\'s keeping the right to judge each issue on its merits rather than inheriting a camp\'s verdict.' },
                { text: 'The columnist is right — staying out of both blocs is neutrality by another name.', outcome: 'Neutrality is withdrawal; non-alignment was loud engagement — Bandung, Belgrade, Suez protests — the difference is between refusing the question and reserving the right to answer it independently.', reveals: 'nonalignment-is-neutrality' },
                { text: 'Non-alignment meant balancing — condemn both sides equally to stay credible.', outcome: 'That reads it as a fairness quota, not a strategy — India condemned Suez and was restrained on Hungary because the cases differed on their merits and stakes; equal-opposite condemnation is a posture, not a policy.', reveals: 'equal-balance-is-the-rule' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now defend non-alignment as a strategy of independent judgment, not fence-sitting — and weigh honestly what it cost in 1962.',
            decisions: [{ prompt: 'What comes next? India\'s External Relations · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — India\'s External Relations · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_11_001', difficulty: 'standard',
          question: 'Nehru\'s foreign policy (1946–1964) was a strategic framework built on three.',
          hint: 'Revisit Class 11 Political Science Chapter 9 "Peace" (c11_ps_cbse_09_001) for.',
          misconception: 'Students often equate **non‑alignment with neutrality or isolationism** — believing India "stayed out of everything.".',
          parts: [
                { id: 'a', prompt: 'Why did Nehru choose non‑alignment instead of joining either the US‑led or Soviet‑led bloc during the Cold War?', answer: 'Nehru avoided blocs',
                  options: ['Nehru avoided blocs', 'neutrality', 'isolationism', 'stayed out of everything'],
                  hint: 'Revisit Class 11 Political Science Chapter 9 "Peace" (c11_ps_cbse_09_001) for negative/positive.',
                  misconception: 'Students often equate **non‑alignment with neutrality or isolationism** — believing India "stayed out of everything." In reality.' },
                { id: 'b', prompt: 'A newly independent country in 1955 faces pressure to sign a mutual defence treaty with a superpower.', answer: 'Advice: Refuse the military alliance',
                  options: ['Advice: Refuse the military alliance', 'join the treaty for security', 'stayed out of everything', 'no comment'],
                  hint: 'Revisit Class 11 Political Science Chapter 9 "Peace" (c11_ps_cbse_09_001) for negative/positive.',
                  misconception: 'Students often equate **non‑alignment with neutrality or isolationism** — believing India "stayed out of everything." In reality.' },
                { id: 'c', prompt: 'Compare the 1955 Bandung Conference and the 1961 Belgrade Summit. How did each advance the non‑aligned project, and what was India\'s specific role in both?', answer: 'Bandung (1955) was the *political* birth of Afro‑Asian solidarity',
                  options: ['Bandung (1955) was the *political* birth of Afro‑Asian solidarity', 'stayed out of everything', 'no comment', 'Non‑alignment meant India did not take sides in any conflict'],
                  hint: 'Revisit Class 11 Political Science Chapter 9 "Peace" (c11_ps_cbse_09_001) for negative/positive.',
                  misconception: 'Students often equate **non‑alignment with neutrality or isolationism** — believing India "stayed out of everything." In reality.' }
          ],
            remediations: { 'students-often-equate-non-alignment': { steps: ['If a student holds the neutrality misconception: (1) Re‑read NCERT para "Distance from two camps" (Chapter 4) and.', '(3) Re‑attempt Diagnostic Question 2, explicitly using the phrase "independent judgment" instead of "neutrality." (4).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate **non‑alignment with neutrality or isolationism** — believing India "stayed out of everything.".',
          parts: [
                { id: 'a', prompt: 'Draft a 21st‑century "Panchsheel" for a fictional group of five newly independent island states facing climate change, cyber threats, and great‑power rivalry.', answer: 'Sample principles: (1) Mutual respect for sovereignty and maritime boundaries',
                  options: ['Sample principles: (1) Mutual respect for sovereignty and maritime boundaries', 'stayed out of everything', 'no comment', 'Non‑alignment meant India did not take sides in any conflict'],
                  hint: 'Revisit Class 11 Political Science Chapter 9 "Peace" (c11_ps_cbse_09_001) for negative/positive.',
                  misconception: 'Students often equate **non‑alignment with neutrality or isolationism** — believing India "stayed out of everything." In reality.' }
          ],
            remediations: { 'students-often-equate-non-alignment': { steps: ['If a student holds the neutrality misconception: (1) Re‑read NCERT para "Distance from two camps" (Chapter 4) and.', '(3) Re‑attempt Diagnostic Question 2, explicitly using the phrase "independent judgment" instead of "neutrality." (4).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_11_002', difficulty: 'standard',
          question: 'The Non-Aligned Movement (NAM) is a forum of states that are not formally.',
          hint: 'If stuck, review the map of Cold War alliances in NCERT Class 12 *Contemporary World.',
          misconception: 'Students often believe non-alignment meant India was "neutral" or "isolated" from world affairs.',
          parts: [
                { id: 'a', prompt: 'In 1956, India led international protests against the British-French-Israeli invasion of Egypt (Suez Crisis) but did not publicly condemn the Soviet invasion.', answer: 'Non-alignment required evaluating each case on its merits',
                  options: ['Non-alignment required evaluating each case on its merits', 'neutral', 'isolated', 'non-alignment meant India was "neutral" or "isolated" from world affairs'],
                  hint: 'If stuck, review the map of Cold War alliances in NCERT Class 12 *Contemporary World Politics*.',
                  misconception: 'Students often believe non-alignment meant India was "neutral" or "isolated" from world affairs.' },
                { id: 'b', prompt: 'Compare the 1947 Asian Relations Conference (convened by India before independence) and the 1955 Bandung Conference.', answer: 'The 1947 conference was aspirational',
                  options: ['The 1947 conference was aspirational', 'neutral', 'isolated', 'non-alignment meant India was "neutral" or "isolated" from world affairs'],
                  hint: 'If stuck, review the map of Cold War alliances in NCERT Class 12 *Contemporary World Politics*.',
                  misconception: 'Students often believe non-alignment meant India was "neutral" or "isolated" from world affairs.' }
          ],
            remediations: { 'non-alignment-meant-india-was': { steps: ['Re-read Nehru\'s 1947 letter to K.P.S.', 'Menon (in NCERT) where he explicitly says "We must be friendly to both and yet not join either." 2.', 'Create a two-column table: "Neutrality" vs.', '"Non-Alignment" with three rows (attitude toward conflicts, treaty-making, economic aid).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_11_003', difficulty: 'standard',
          question: 'India-China relations in the Nehru era (1949–1962) were defined by the.',
          hint: 'Revisit c12_ps_cbse_11_001’s "Three major objectives of Nehru’s foreign policy" and.',
          misconception: 'Students often believe the 1962 war was fought *only* over the McMahon Line in the east (Arunachal).',
          parts: [
                { id: 'a', prompt: 'Analyse how the 1962 war transformed India’s domestic politics in three specific ways: (a) executive accountability, (b) party system, (c) federal.', answer: 'executive accountability, (',
                  options: ['executive accountability, (', 'China wanted Arunachal for territory', 'China wanted Aksai Chin for connectivity', 'the 1962 war was fought *only* over the McMahon Line in the east (Arunachal)'],
                  hint: 'Revisit c12_ps_cbse_11_001’s "Three major objectives of Nehru’s foreign policy" and "Distance from.',
                  misconception: 'Students often believe the 1962 war was fought *only* over the McMahon Line in the east (Arunachal).' }
          ],
            remediations: { 'the-1962-war-was-fought': { steps: ['If the student cannot distinguish the two sectors’ strategic logic: Step 1 — Re-read the NCERT map caption (p.60) and.', 'Step 2 — Draw a simple sketch: mark Xinjiang, Aksai Chin, Tibet, Ladakh, NEFA.', 'Step 3 — Trace the Xinjiang–Aksai Chin–Tibet highway; ask "Why is this road vital for China?" Step 4 — Compare with the.', 'Step 5 — Re-attempt Diagnostic Q3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_11_004', difficulty: 'standard',
          question: 'The India-Pakistan wars of 1965 and 1971 were two major military conflicts.',
          hint: 'If stuck, revisit the Partition node (c6_history_ch11_050) for the Kashmir origin and the.',
          misconception: 'Students often believe the Tashkent Agreement "settled" the Kashmir dispute by restoring the pre-war ceasefire line.',
          parts: [
                { id: 'a', prompt: 'Compare the 1965 and 1971 wars on three dimensions: (a) immediate trigger, (b) role of great powers, (c) territorial outcome.', answer: 'immediate trigger, (',
                  options: ['immediate trigger, (', 'settled', 'settlement'],
                  hint: 'If stuck, revisit the Partition node (c6_history_ch11_050) for the Kashmir origin and the Nehru\'s.',
                  misconception: 'Students often believe the Tashkent Agreement "settled" the Kashmir dispute by restoring the pre-war ceasefire line.' }
          ],
            remediations: { 'the-tashkent-agreement-settled-the': { steps: ['If the student holds this misconception, do: (1) Give them the **actual Tashkent Agreement text** (3 clauses) and the.', '(2) Ask them to highlight every mention of "Kashmir," "plebiscite," "dispute," or "final settlement" — they will find.', '(3) Have them write a 50-word explanation: "Tashkent restored the military status quo; Shimla converted the ceasefire.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_11_005', difficulty: 'standard',
          question: 'India\'s Cold War diplomacy refers to the strategic balancing act (1947–1991).',
          hint: 'If confused about "tilt" vs "alignment", revisit c12_ps_cbse_11_001 (Nehru\'s objectives).',
          misconception: 'Students equate non-alignment with *neutrality* or *equidistance* — believing India stayed exactly midway between.',
          parts: [
                { id: 'a', prompt: 'Why did the United States resent India\'s policy of non-alignment in the 1950s, even though India was a democracy?', answer: 'The US expected democracies to naturally align with the "free world" bloc',
                  options: ['The US expected democracies to naturally align with the "free world" bloc', 'US hated India', 'India was communist'],
                  hint: 'If confused about "tilt" vs "alignment", revisit c12_ps_cbse_11_001 (Nehru\'s objectives) and.',
                  misconception: 'Students equate non-alignment with *neutrality* or *equidistance* — believing India stayed exactly midway between US and USSR.' },
                { id: 'b', prompt: 'Compare the US and Soviet responses to the 1971 Bangladesh crisis. What does this comparison reveal about the utility of the Indo-Soviet Treaty for India?', answer: 'The US backed Pakistan (sent Seventh Fleet, encouraged China to mobilise)',
                  options: ['The US backed Pakistan (sent Seventh Fleet, encouraged China to mobilise)', 'USSR saved India out of friendship'],
                  hint: 'If confused about "tilt" vs "alignment", revisit c12_ps_cbse_11_001 (Nehru\'s objectives) and.',
                  misconception: 'Students equate non-alignment with *neutrality* or *equidistance* — believing India stayed exactly midway between US and USSR.' }
          ],
            remediations: { 'students-equate-non-alignment-with': { steps: ['Re-read Nehru\'s 1947 letter to K.P.S.', 'Menon (NCERT p.58): "We must be friendly to both and yet not join either." 2.', 'Make a two-column table: Column A = Instances India leaned US (PL-480, 1962 China war aid request, Green Revolution.', 'Ask: "If India was neutral, why are the columns unequal?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_11_006', difficulty: 'standard',
          question: 'India\'s Nuclear Policy refers to the evolving framework guiding India\'s.',
          hint: 'If stuck, revisit **c12_ps_cbse_11_001** (Nehru\'s objectives) and **c11_ps_cbse_09_007**.',
          misconception: 'Students often believe **India\'s 1974 test was a "nuclear weapon test" and that India has been a declared nuclear.',
          parts: [
                { id: 'a', prompt: 'Why did India refuse to sign the Nuclear Non-Proliferation Treaty (NPT) of 1968, and how does this refusal reflect the principle of "non-alignment" in the.', answer: 'India refused to sign the NPT',
                  options: ['India refused to sign the NPT', 'India refused because it wanted to build bombs secretly', 'peaceful nuclear explosion', 'nuclear weapon test'],
                  hint: 'If stuck, revisit **c12_ps_cbse_11_001** (Nehru\'s objectives) and **c11_ps_cbse_09_007**.',
                  misconception: 'Students often believe **India\'s 1974 test was a "nuclear weapon test" and that India has been a declared nuclear weapon state since.' }
          ],
            remediations: { 'india-s-1974-test-was': { steps: ['If the student holds this misconception: 1.', '68-69** — note the exact phrasing: "When India conducted its first nuclear test, it was termed as peaceful explosion...', 'committed to the policy of using nuclear power only for peaceful purposes." 2.', '**Compare with 1998 Fast Forward box (p.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
