import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch11_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch11_p2: SimDef = {
    id: 'v3_c12_ps_ch11_p2',
    title: 'India\'s External Relations · Part 2/2',
    subtitle: 'Friendly to both camps, married to neither',
    classLevel: 12, subject: 'political_science', topic: 'India\'s External Relations · Part 2/2',
    chapters: ['c12_ps_ch11'],
    nodeIds: ['c12_ps_cbse_11_007', 'c12_ps_cbse_11_008', 'c12_ps_cbse_11_009', 'c12_ps_cbse_11_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Foreign policy analyst', intro: 'A newborn, resource-poor nation told two superpowers it would pick its own positions — and then did.', goal: 'Analyse the objectives, instruments and limits of Nehru\'s non-aligned foreign policy, 1946–1964.' },
    discovery: {
        question: 'In 1956 India slammed Britain and France over Suez — then went quiet when Soviet tanks rolled into Hungary weeks later. If non-alignment meant neutrality, what explains that?',
        options: ['Non-alignment was never neutrality — it meant judging each issue independently rather than voting with a bloc, and India\'s choices reflected that', 'India was secretly pro-Soviet all along', 'Nehru simply didn\'t know about Hungary', 'India stayed neutral but the West complained louder'],
        answer: 'Non-alignment was never neutrality — it meant judging each issue independently rather than voting with a bloc, and India\'s choices reflected that',
        hook: 'Students equate non-alignment with sitting out. Nehru\'s India took sides constantly — just never a bloc\'s side — and collected steel plants from the USSR and food aid from the US while refusing both alliances.',
    },
    teaching: [
        { title: 'The Bangladesh Liberation War of 1971 and India\'s Role', text: 'The Bangladesh Liberation War of 1971 was a decisive armed conflict triggered by the Pakistani military\'s crackdown (Operation Searchlight) on the Bengali nationalist movement in East Pakistan.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_11_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Test non-alignment against its hardest cases — Bandung, Panchsheel, Suez, Hungary, and finally the 1962 war with the country India had just signed \'peaceful coexistence\' with.',
        labels: ['The Bangladesh Liberation War', 'India\'s Relations with Its', 'Shifts in India\'s Foreign', 'India\'s Policy towards'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_11_007', title: 'The Bangladesh Liberation War of 1971 and India\'s Role',
          caseStudy: { intro: 'Imagine you are a district magistrate in West Bengal in May 1971: thousands of traumatized refugees arrive daily with stories of targeted killings of Bengali.',
            decisions: [{ prompt: 'What was the immediate trigger for the 1971 Bangladesh Liberation War, and which Pakistani military operation marked its violent onset?', options: [
                { text: 'The immediate trigger was the Pakistani junta\'s refusal to transfer power to the Awami', outcome: 'The immediate trigger was the Pakistani junta\'s refusal to transfer power to the Awami League.' },
                { text: 'India invaded East Pakistan', outcome: 'Not quite — Students often believe: "India won the 1971 war solely because of the Indo-Soviet Treaty and Soviet.', reveals: 'india-won-the-1971-war' },
                { text: 'Sheikh Mujib declared independence unilaterally', outcome: 'Not quite — Students often believe: "India won the 1971 war solely because of the Indo-Soviet Treaty and Soviet.', reveals: 'india-won-the-1971-war' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_11_008', title: 'India\'s Relations with Its Neighbours and SAARC',
          caseStudy: { intro: 'Imagine you see a news headline: "SAARC Summit Cancelled for 5th Consecutive Year as India-Pakistan Tensions Persist." Begin by asking: Why does a regional.',
            decisions: [{ prompt: 'Which constitutional provision forms the philosophical basis for India\'s neighbourhood policy, and what are its four specific directives?', options: [
                { text: 'Article 51 of the Constitution (Directive Principles of State Policy) directs the State', outcome: 'Article 51 of the Constitution (Directive Principles of State Policy) directs the State to: (a).' },
                { text: 'South Asian EU', outcome: 'Not quite — Students often think SAARC is a "South Asian EU" with supranational powers, and that India\'s.', reveals: 'saarc-is-a-south-asian' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_11_009', title: 'Shifts in India\'s Foreign Policy after the Cold War',
          caseStudy: { intro: 'Imagine you\'re reading a 2024 newspaper: India buys discounted Russian oil despite US pressure, joins the Quad with US/Japan/Australia to balance China, and.',
            decisions: [{ prompt: 'What was the immediate geopolitical trigger that forced India to abandon its reflexive pro-Soviet tilt and seek closer ties with the United.', options: [
                { text: 'The dissolution of the Soviet Union in December 1991 ended bipolarity, removed India\'s', outcome: 'The dissolution of the Soviet Union in December 1991 ended bipolarity, removed India\'s primary.' },
                { text: 'the 1998 nuclear tests', outcome: 'Not quite — Students equate "post-Cold War shift" with "abandoning non-alignment for a US alliance." They.', reveals: 'students-equate-post-cold-war' },
                { text: 'the Kargil war', outcome: 'Not quite — Students equate "post-Cold War shift" with "abandoning non-alignment for a US alliance." They.', reveals: 'students-equate-post-cold-war' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_11_010', title: 'India\'s Policy towards the Global South and Decolonisation',
          caseStudy: { intro: 'Imagine you are watching a news report about the G20 Summit in New Delhi (2023) where India invited the African Union as a permanent member — a modern echo.',
            decisions: [{ prompt: 'What was the primary objective of the Asian Relations Conference convened by India in March 1947, five months before formal independence?', options: [
                { text: 'The Asian Relations Conference (March 1947) aimed to forge unity among Asian nations', outcome: 'The Asian Relations Conference (March 1947) aimed to forge unity among Asian nations against.' },
                { text: 'to join the UN', outcome: 'Not quite — Students often believe "Global South policy" and "Non-Aligned Movement" are synonymous — they write.', reveals: 'global-south-policy-and-non' },
                { text: 'to seek military aid', outcome: 'Not quite — Students often believe "Global South policy" and "Non-Aligned Movement" are synonymous — they write.', reveals: 'global-south-policy-and-non' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A foreign-affairs columnist dismisses Nehru\'s non-alignment as \'Swiss-style fence-sitting — refusing to judge anyone to stay out of trouble.\'',
            decisions: [{ prompt: 'What does non-alignment actually look like in practice?', options: [
                { text: 'Independent judgment per issue — condemning the Suez invasion as neo-colonial while staying measured on Hungary wasn\'t fence-sitting but case-by-case evaluation; neutrality withdraws equally from all disputes, non-alignment engages on India\'s own terms.', outcome: 'The chapter\'s distinction: not joining blocs isn\'t refusing to judge — it\'s keeping the right to judge each issue on its merits rather than inheriting a camp\'s verdict.' },
                { text: 'The columnist is right — staying out of both blocs is neutrality by another name.', outcome: 'Neutrality is withdrawal; non-alignment was loud engagement — Bandung, Belgrade, Suez protests — the difference is between refusing the question and reserving the right to answer it independently.', reveals: 'nonalignment-is-neutrality' },
                { text: 'Non-alignment meant balancing — condemn both sides equally to stay credible.', outcome: 'That reads it as a fairness quota, not a strategy — India condemned Suez and was restrained on Hungary because the cases differed on their merits and stakes; equal-opposite condemnation is a posture, not a policy.', reveals: 'equal-balance-is-the-rule' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_11_010', title: 'You made it',
          caseStudy: { intro: 'You can now defend non-alignment as a strategy of independent judgment, not fence-sitting — and weigh honestly what it cost in 1962.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_11_007', difficulty: 'standard',
          question: 'The Bangladesh Liberation War of 1971 was a decisive armed conflict triggered.',
          hint: 'Revisit c12_ps_cbse_11_004 (Tashkent Agreement) and c11_ps_cbse_09_005 (Just war theory).',
          misconception: 'Students often believe: "India won the 1971 war solely because of the Indo-Soviet Treaty and Soviet veto at the UN.".',
          parts: [
                { id: 'a', prompt: 'Why did India sign the 20-year Treaty of Peace, Friendship and Cooperation with the Soviet Union in August 1971, and how did it relate to the principle.', answer: 'India signed the treaty to counter the emerging US-Pakistan-China strategic axis',
                  options: ['India signed the treaty to counter the emerging US-Pakistan-China strategic axis', 'India abandoned non-alignment'],
                  hint: 'Revisit c12_ps_cbse_11_004 (Tashkent Agreement) and c11_ps_cbse_09_005 (Just war theory).',
                  misconception: 'Students often believe: "India won the 1971 war solely because of the Indo-Soviet Treaty and Soviet veto at the UN." This is wrong because.' }
          ],
            remediations: { 'india-won-the-1971-war': { steps: ['If the student holds the above misconception: Step 1 — Re-read the timeline in NCERT (pp.', '65-67): note Indira Gandhi\'s world tour (Oct-Nov 1971) *preceded* the treaty\'s operational activation.', 'Step 2 — Watch the 20-min documentary "1971: India\'s Finest Hour" (Govt of India archives) focusing on Manekshaw\'s.', 'Step 3 — Compare UNSC Resolution 303 (Dec 1971) vetoed by USSR with Resolution 211 (1965) — see that in 1965 USSR *did.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_11_008', difficulty: 'standard',
          question: 'India\'s neighbourhood policy refers to the set of principles and strategies.',
          hint: 'Revisit c12_ps_cbse_11_001 (Nehru\'s objectives) and c12_ps_cbse_11_003/004.',
          misconception: 'Students often think SAARC is a "South Asian EU" with supranational powers, and that India\'s refusal to attend summits.',
          parts: [
                { id: 'a', prompt: 'Explain why the Gujral Doctrine (1996) was a significant departure from Nehru\'s non-alignment in managing neighbourhood relations, despite both emphasising.', answer: 'Nehru\'s non-alignment was a global Cold War strategy avoiding military blocs',
                  options: ['Nehru\'s non-alignment was a global Cold War strategy avoiding military blocs', 'South Asian EU'],
                  hint: 'Revisit c12_ps_cbse_11_001 (Nehru\'s objectives) and c12_ps_cbse_11_003/004 (China/Pakistan wars).',
                  misconception: 'Students often think SAARC is a "South Asian EU" with supranational powers, and that India\'s refusal to attend summits is the sole cause.' },
                { id: 'b', prompt: 'A student argues: "SAARC has failed because India dominates it; if India steps back, SAARC will succeed." Using the unanimity principle and two bilateral.', answer: 'The claim oversimplifies',
                  options: ['The claim oversimplifies', 'South Asian EU'],
                  hint: 'Revisit c12_ps_cbse_11_001 (Nehru\'s objectives) and c12_ps_cbse_11_003/004 (China/Pakistan wars).',
                  misconception: 'Students often think SAARC is a "South Asian EU" with supranational powers, and that India\'s refusal to attend summits is the sole cause.' }
          ],
            remediations: { 'saarc-is-a-south-asian': { steps: ['If the student holds this misconception: (1) Re-read the SAARC Charter Preamble and Article III (Principles) — note.', '(2) Compare with ASEAN Charter (consensus minus X formula) and EU (qualified majority voting).', '(3) Complete a table: List 5 SAARC agreements stalled by Pakistan, 2 stalled by India, 2 by others.', '(4) Re-attempt Diagnostic Question 3 with this evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_11_009', difficulty: 'standard',
          question: 'The shift in India\'s foreign policy after the Cold War refers to the strategic.',
          hint: 'If stuck, re-read the Nehru letter in c12_ps_cbse_11_005 ("avoid entanglement in power.',
          misconception: 'Students equate "post-Cold War shift" with "abandoning non-alignment for a US alliance." They write: "India gave.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The shift in India\'s foreign policy after the Cold War refers to the strategic',
                  options: ['The shift in India\'s foreign policy after the Cold War refers to the strategic', 'Nehru\'s foreign policy (1946–1964) was a strategic framework built on three core', 'The Non-Aligned Movement (NAM) is a forum of states that are not formally aligned with or', 'India-China relations in the Nehru era (1949–1962) were defined by the Panchsheel'],
                  hint: 'If stuck, re-read the Nehru letter in c12_ps_cbse_11_005 ("avoid entanglement in power politics").',
                  misconception: 'Students equate "post-Cold War shift" with "abandoning non-alignment for a US alliance." They write: "India gave up non-alignment and.' }
          ],
            remediations: { 'students-equate-post-cold-war': { steps: ['Revisit **c12_ps_cbse_11_005** (Cold War non-alignment) to recall the *original* logic: "avoid military blocs." 2.', 'Revisit **c12_ps_cbse_11_006** (Nuclear Policy) to see the *continuity*: 1974 PNE → 1998 weaponisation → 2008 NSG.', 'Read MEA\'s 2023 "India\'s Foreign Policy: The Multi-Alignment Era" white paper.', 'Re-diagnostic: "Explain how India\'s 2023 G20 presidency (Global South voice, African Union entry, New Delhi.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_11_010', difficulty: 'standard',
          question: 'India\'s Policy towards the Global South and Decolonisation refers to the.',
          hint: 'Revisit the distinction between "non-alignment" (strategic autonomy in bipolar world) and.',
          misconception: 'Students often believe "Global South policy" and "Non-Aligned Movement" are synonymous — they write "NAM was India\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'India\'s Policy towards the Global South and Decolonisation refers to the foreign policy',
                  options: ['India\'s Policy towards the Global South and Decolonisation refers to the foreign policy', 'Nehru\'s foreign policy (1946–1964) was a strategic framework built on three core', 'The Non-Aligned Movement (NAM) is a forum of states that are not formally aligned with or', 'India-China relations in the Nehru era (1949–1962) were defined by the Panchsheel'],
                  hint: 'Revisit the distinction between "non-alignment" (strategic autonomy in bipolar world) and "Global.',
                  misconception: 'Students often believe "Global South policy" and "Non-Aligned Movement" are synonymous — they write "NAM was India\'s policy towards the.' }
          ],
            remediations: { 'global-south-policy-and-non': { steps: ['If the student conflates NAM with the broader Global South policy: Step 1 — Re-read the NCERT paragraphs on "Afro-Asian.', '57–58) and note the *chronological sequence*: 1947 Asian Relations Conference → 1949 Indonesia Conference → 1955.', 'Step 2 — Create a timeline with two columns: "Event" and "Was NAM involved?', 'Step 3 — Re-attempt Diagnostic Question 3, explicitly separating Bandung\'s *declaration* from NAM\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
