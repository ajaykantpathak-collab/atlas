import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch01_p2: SimDef = {
    id: 'v3_c12_ps_ch01_p2',
    title: 'The Cold War Era · Part 2/2',
    subtitle: 'They blockaded a city — and chose airlift over war',
    classLevel: 12, subject: 'political_science', topic: 'The Cold War Era · Part 2/2',
    chapters: ['c12_ps_ch01'],
    nodeIds: ['c12_ps_cbse_01_007', 'c12_ps_cbse_01_008', 'c12_ps_cbse_01_009', 'c12_ps_cbse_01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Cold War historian', intro: 'Two allies beat Hitler together, then spent 44 years pointing missiles at each other. The wall didn\'t start as one.', goal: 'Explain the Cold War\'s origins — ideological blocs, the Iron Curtain, and conflict kept just short of war.' },
    discovery: {
        question: 'In 1948 the USSR sealed every road into West Berlin — and the Allies flew in food for a year instead of fighting. Why didn\'t blockade become war?',
        options: ['Brinkmanship — shooting down supply planes risked nuclear WWIII, so both sides calibrated conflict short of direct battle; that restraint IS the Cold War', 'Airlift was faster', 'Berlin didn\'t matter', 'UN banned it'],
        answer: 'Brinkmanship — shooting down supply planes risked nuclear WWIII, so both sides calibrated conflict short of direct battle; that restraint IS the Cold War',
        hook: '\'Natural enemies\' is too easy — they were wartime allies; the Cold War was made by post-war choices: imposed regimes in Poland, the atomic monopoly, mutual misread intentions. And the Iron Curtain was a metaphor for six years before it became a wall in 1961.',
    },
    teaching: [
        { title: 'The Korean War as a Proxy Conflict of the Cold War', text: 'The Korean War (1950–1953) was a military conflict between North Korea (Democratic People\'s Republic of Korea), supported by the Soviet Union and China, and South Korea (Republic of Korea), supported.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace the alliance\'s collapse: weigh two post-war visions of Europe, decode the Berlin airlift as calibrated confrontation, and test \'inevitable rivalry\' against the 1945–47 record.',
        labels: ['The Korean War as', 'Non-Aligned Movement (NAM): Origins,', 'The Domino Theory', 'Arenas of Cold War'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_01_007', title: 'The Korean War as a Proxy Conflict of the Cold War',
          caseStudy: { intro: 'Imagine two students arguing in a classroom, but each is quietly backed by a different teacher who supplies arguments and resources without stepping.',
            decisions: [{ prompt: 'What was the immediate trigger for the outbreak of the Korean War on 25 June 1950?', options: [
                { text: 'The immediate trigger was the invasion of South Korea by North Korean forces across the', outcome: 'The immediate trigger was the invasion of South Korea by North Korean forces across the 38th.' },
                { text: 'US invasion of North Korea', outcome: 'Not quite — Students often believe the Korean War ended with a peace treaty — it ended with an **armistice.', reveals: 'the-korean-war-ended-with' },
                { text: 'Chinese attack on US bases', outcome: 'Not quite — Students often believe the Korean War ended with a peace treaty — it ended with an **armistice.', reveals: 'the-korean-war-ended-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_01_008', title: 'Non-Aligned Movement (NAM): Origins, Principles and Criticism',
          caseStudy: { intro: 'Imagine you are India\'s Prime Minister in 1961: the world is split into two armed camps — NATO led by the US and Warsaw Pact led by the USSR.',
            decisions: [{ prompt: 'Name the five founding leaders of NAM and the year and venue of the first NAM Summit.', options: [
                { text: 'The five founding leaders were Jawaharlal Nehru (India), Gamal Abdel Nasser (Egypt),', outcome: 'The five founding leaders were Jawaharlal Nehru (India), Gamal Abdel Nasser (Egypt), Josip Broz.' },
                { text: 'non-aligned', outcome: 'Not quite — Students equate "non-alignment" with "neutrality" or "isolationism." They write: "Nehru kept India.', reveals: 'students-equate-non-alignment-with' },
                { text: 'not aligned with anything', outcome: 'Not quite — Students equate "non-alignment" with "neutrality" or "isolationism." They write: "Nehru kept India.', reveals: 'students-equate-non-alignment-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_01_009', title: 'The Domino Theory and Spread of Cold War to Asia and Africa',
          caseStudy: { intro: 'Imagine you are watching a documentary on the Vietnam War and hear a 1960s US official say, "If Vietnam falls, Thailand, Malaysia, and Indonesia will follow.".',
            decisions: [{ prompt: 'What was the core claim of the Domino Theory as stated by Eisenhower in 1954?', options: [
                { text: 'The core claim was that the fall of one Southeast Asian nation to communism would trigger', outcome: 'The core claim was that the fall of one Southeast Asian nation to communism would trigger.' },
                { text: 'it predicted nuclear war', outcome: 'Not quite — Students often believe the Domino Theory accurately predicted events because Vietnam, Laos, and.', reveals: 'the-domino-theory-accurately-predicted' },
                { text: 'it was about European security', outcome: 'Not quite — Students often believe the Domino Theory accurately predicted events because Vietnam, Laos, and.', reveals: 'the-domino-theory-accurately-predicted' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_01_010', title: 'Arenas of Cold War: Confrontation vs Avoidance of Direct War',
          caseStudy: { intro: 'Imagine you are watching a high-stakes chess match where the two grandmasters (USA & USSR) never touch each other\'s pieces directly — instead, they fund.',
            decisions: [{ prompt: 'Define "proxy war" in the Cold War context and name two specific proxy wars where the USA and USSR supported opposite sides without their.', options: [
                { text: 'A proxy war is a conflict where two major powers avoid direct combat by supporting', outcome: 'A proxy war is a conflict where two major powers avoid direct combat by supporting opposing third.' },
                { text: 'USA vs USSR fighting in Korea', outcome: 'Not quite — Students often think "Cold War = no war at all" because of the word "cold." They write: "The Cold.', reveals: 'cold-war-no-war-at' },
                { text: 'Cold War = no war at all', outcome: 'Not quite — Students often think "Cold War = no war at all" because of the word "cold." They write: "The Cold.', reveals: 'cold-war-no-war-at' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a Model UN on the early Cold War, a US delegate proposes \'rolling back\' communist governments inside Eastern Europe with direct intervention, citing Kennan\'s containment doctrine as the authority.',
            decisions: [{ prompt: 'Does containment authorise rollback?', options: [
                { text: 'No — Kennan\'s doctrine was \'firm and vigilant containment\' at the frontiers of Soviet pressure, applied where resistance could still matter — aid to Greece and Turkey, reconstruction via the Marshall Plan; intervening inside an established bloc is the later \'rollback\' idea, not containment.', outcome: 'The chapter\'s line between strategy and aggression: containment stopped expansion at its edges — it never promised to reverse what was already consolidated.' },
                { text: 'Yes — containment means opposing communism wherever it exists, by any means.', outcome: 'That\'s Dulles-era rollback dressed as Kennan — the original logic was that the USSR retreats before firm resistance at contested points, not that the US invades consolidated territory.', reveals: 'containment-equals-rollback' },
                { text: 'Yes — the Marshall Plan already intervened economically, so military rollback is the same policy.', outcome: 'The instruments differ in kind — the Plan was economic reconstruction to remove communism\'s appeal, not force inside the bloc; treating them as interchangeable erases the strategy\'s own division of labour.', reveals: 'aid-equals-intervention' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_01_010', title: 'You made it',
          caseStudy: { intro: 'You can now read the Cold War\'s origin as choices, not fate — a war fought everywhere except between the two capitals.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_01_007', difficulty: 'standard',
          question: 'The Korean War (1950–1953) was a military conflict between North Korea.',
          hint: 'If stuck, re-read the **Truman Doctrine speech excerpt (1947)** and the **NSC-68 report.',
          misconception: 'Students often believe the Korean War ended with a peace treaty — it ended with an **armistice agreement (27 July.',
          parts: [
                { id: 'a', prompt: 'Why was the United Nations able to authorize military intervention in Korea despite the Soviet Union being a permanent Security Council member with veto power?', answer: 'The USSR was boycotting the Security Council in protest over the refusal to seat',
                  options: ['The USSR was boycotting the Security Council in protest over the refusal to seat', 'USSR supported the resolution', 'UN General Assembly overrode the veto'],
                  hint: 'If stuck, re-read the **Truman Doctrine speech excerpt (1947)** and the **NSC-68 report (1950)**.',
                  misconception: 'Students often believe the Korean War ended with a peace treaty — it ended with an **armistice agreement (27 July 1953)** that created the.' },
                { id: 'b', prompt: 'Compare the Korean War and the Cuban Missile Crisis (1962) in terms of direct superpower confrontation risk.', answer: 'The Cuban Missile Crisis brought the world closer to nuclear war',
                  options: ['The Cuban Missile Crisis brought the world closer to nuclear war', 'Korea was closer'],
                  hint: 'If stuck, re-read the **Truman Doctrine speech excerpt (1947)** and the **NSC-68 report (1950)**.',
                  misconception: 'Students often believe the Korean War ended with a peace treaty — it ended with an **armistice agreement (27 July 1953)** that created the.' }
          ],
            remediations: { 'the-korean-war-ended-with': { steps: ['Revisit **c12_ps_cbse_01_001** (Cold War origins) to recall why direct US–USSR war was unthinkable (nuclear deterrence).', 'Review **c12_ps_cbse_01_002** (Containment Doctrine) to understand the US imperative to resist communist expansion.', 'Read the **Armistice Agreement text (1953)** — note it is signed by military commanders, not heads of state, and.', 'Re-diagnostic: Explain in three sentences why the Korean War is a "proxy war" and not a "world war."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Korean War ended with a peace treaty — it ended with an **armistice agreement (27 July.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Korean War was a success for the US policy of containment." Provide two arguments for and two against.', answer: '**For:** (1) Communism was contained south of the 38th parallel',
                  options: ['**For:** (1) Communism was contained south of the 38th parallel', 'success', 'failure'],
                  hint: 'If stuck, re-read the **Truman Doctrine speech excerpt (1947)** and the **NSC-68 report (1950)**.',
                  misconception: 'Students often believe the Korean War ended with a peace treaty — it ended with an **armistice agreement (27 July 1953)** that created the.' }
          ],
            remediations: { 'the-korean-war-ended-with': { steps: ['Revisit **c12_ps_cbse_01_001** (Cold War origins) to recall why direct US–USSR war was unthinkable (nuclear deterrence).', 'Review **c12_ps_cbse_01_002** (Containment Doctrine) to understand the US imperative to resist communist expansion.', 'Read the **Armistice Agreement text (1953)** — note it is signed by military commanders, not heads of state, and.', 'Re-diagnostic: Explain in three sentences why the Korean War is a "proxy war" and not a "world war."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_01_008', difficulty: 'standard',
          question: 'The Non-Aligned Movement (NAM) is a forum of states that are not formally.',
          hint: 'Revisit c12_ps_cbse_01_001 (Cold War origins) and c12_ps_cbse_01_003 (NATO vs Warsaw.',
          misconception: 'Students equate "non-alignment" with "neutrality" or "isolationism." They write: "Nehru kept India neutral and isolated.',
          parts: [
                { id: 'a', prompt: 'India signed the 1971 Treaty of Peace, Friendship and Cooperation with the Soviet Union. Critics argue this violated NAM\'s non-alignment principle.', answer: 'The 1971 treaty was a pragmatic exercise of strategic autonomy, not a betrayal',
                  options: ['The 1971 treaty was a pragmatic exercise of strategic autonomy, not a betrayal', 'alignment with USSR', 'non-aligned', 'not aligned with anything'],
                  hint: 'Revisit c12_ps_cbse_01_001 (Cold War origins) and c12_ps_cbse_01_003 (NATO vs Warsaw Pact).',
                  misconception: 'Students equate "non-alignment" with "neutrality" or "isolationism." They write: "Nehru kept India neutral and isolated from world.' },
                { id: 'b', prompt: 'Compare NAM\'s stance on nuclear disarmament with that of the Nuclear Non-Proliferation Treaty (NPT).', answer: 'NAM demanded universal, non-discriminatory nuclear disarmament',
                  options: ['NAM demanded universal, non-discriminatory nuclear disarmament', 'India wanted nuclear weapons', 'non-aligned', 'not aligned with anything'],
                  hint: 'Revisit c12_ps_cbse_01_001 (Cold War origins) and c12_ps_cbse_01_003 (NATO vs Warsaw Pact).',
                  misconception: 'Students equate "non-alignment" with "neutrality" or "isolationism." They write: "Nehru kept India neutral and isolated from world.' }
          ],
            remediations: { 'students-equate-non-alignment-with': { steps: ['Re-read Nehru\'s 1961 Belgrade speech (available in NCERT Class 12 Contemporary World Politics, Chapter 1 sidebar).', 'Create a two-column table: Column A = "Neutrality" (passive, legal status in war, e.g., Switzerland); Column.', 'Apply to three cases — Korea 1950, Suez 1956, Bangladesh 1971 — and write India\'s actual position in each.', 'Re-attempt Diagnostic Question 3. If still stuck, revisit c11_ps_cbse_02_002 (Negative Liberty) and c11_ps_cbse_02_003.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_01_009', difficulty: 'standard',
          question: 'The Domino Theory was a Cold War foreign policy concept articulated by.',
          hint: 'If stuck, revisit the Truman Doctrine speech (1947) and the Marshall Plan\'s purpose.',
          misconception: 'Students often believe the Domino Theory accurately predicted events because Vietnam, Laos, and Cambodia became.',
          parts: [
                { id: 'a', prompt: 'Compare the application of the Domino Theory in Asia (Vietnam) and Africa (Angola). What key difference existed in superpower involvement?', answer: 'In Vietnam, the US deployed its own troops directly for over a decade',
                  options: ['In Vietnam, the US deployed its own troops directly for over a decade', 'both were identical'],
                  hint: 'If stuck, revisit the Truman Doctrine speech (1947) and the Marshall Plan\'s purpose — then ask.',
                  misconception: 'Students often believe the Domino Theory accurately predicted events because Vietnam, Laos, and Cambodia became communist.' }
          ],
            remediations: { 'the-domino-theory-accurately-predicted': { steps: ['Re-read the 1954 Eisenhower press conference transcript (available online) to see the exact countries he named.', 'Map the predicted domino chain (Vietnam → Laos → Cambodia → Thailand → Malaya → Indonesia → Philippines) and mark which.', 'Compare with ASEAN\'s formation (1967) as a US-backed regional bulwark.', 'Re-attempt Diagnostic Question 5 with this evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_01_010', difficulty: 'standard',
          question: 'The "Arenas of the Cold War" refers to the specific geographical regions and.',
          hint: 'Revisit c12_ps_cbse_01_004 (Cuban Missile Crisis) to see MAD in action, and.',
          misconception: 'Students often think "Cold War = no war at all" because of the word "cold." They write: "The Cold War was peaceful.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The "Arenas of the Cold War" refers to the specific geographical regions and functional',
                  options: ['The "Arenas of the Cold War" refers to the specific geographical regions and functional', 'The Cold War (1947–1991) was a prolonged geopolitical, ideological, and strategic rivalry', 'The Containment Doctrine was the overarching US foreign policy strategy (articulated by', 'NATO (North Atlantic Treaty Organization) and the Warsaw Pact were the two opposing'],
                  hint: 'Revisit c12_ps_cbse_01_004 (Cuban Missile Crisis) to see MAD in action, and c12_ps_cbse_01_001.',
                  misconception: 'Students often think "Cold War = no war at all" because of the word "cold." They write: "The Cold War was peaceful because USA and USSR.' }
          ],
            remediations: { 'cold-war-no-war-at': { steps: ['If a student holds this misconception: (1) Have them list all conflicts 1945–1991 where both superpowers were involved.', '(2) Ask: "Did US and Soviet soldiers shoot at each other in any of these?" (Answer: No — Soviet pilots flew MiGs.', '(3) Show the "Long Peace" thesis (Gaddis): zero direct great-power wars 1945–1991, but 20+ proxy wars.', '(4) Re-diagnostic: "Explain why the Korean War is a \'hot\' war within a \'cold\' war."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
