import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch01_p1: SimDef = {
    id: 'v3_c12_ps_ch01_p1',
    title: 'The Cold War Era · Part 1/2',
    subtitle: 'They blockaded a city — and chose airlift over war',
    classLevel: 12, subject: 'political_science', topic: 'The Cold War Era · Part 1/2',
    chapters: ['c12_ps_ch01'],
    nodeIds: ['c12_ps_cbse_01_001', 'c12_ps_cbse_01_002', 'c12_ps_cbse_01_003', 'c12_ps_cbse_01_004', 'c12_ps_cbse_01_005', 'c12_ps_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Cold War historian', intro: 'Two allies beat Hitler together, then spent 44 years pointing missiles at each other. The wall didn\'t start as one.', goal: 'Explain the Cold War\'s origins — ideological blocs, the Iron Curtain, and conflict kept just short of war.' },
    discovery: {
        question: 'In 1948 the USSR sealed every road into West Berlin — and the Allies flew in food for a year instead of fighting. Why didn\'t blockade become war?',
        options: ['Brinkmanship — shooting down supply planes risked nuclear WWIII, so both sides calibrated conflict short of direct battle; that restraint IS the Cold War', 'Airlift was faster', 'Berlin didn\'t matter', 'UN banned it'],
        answer: 'Brinkmanship — shooting down supply planes risked nuclear WWIII, so both sides calibrated conflict short of direct battle; that restraint IS the Cold War',
        hook: '\'Natural enemies\' is too easy — they were wartime allies; the Cold War was made by post-war choices: imposed regimes in Poland, the atomic monopoly, mutual misread intentions. And the Iron Curtain was a metaphor for six years before it became a wall in 1961.',
    },
    teaching: [
        { title: 'Cold War: Origins, the Two Superpowers and the Iron Curtain', text: 'The Cold War (1947–1991) was a prolonged geopolitical, ideological, and strategic rivalry between the United States (leading the capitalist Western bloc) and the Soviet Union (leading the communist.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace the alliance\'s collapse: weigh two post-war visions of Europe, decode the Berlin airlift as calibrated confrontation, and test \'inevitable rivalry\' against the 1945–47 record.',
        labels: ['Cold War: Origins,', 'Containment Doctrine, Truman Doctrine', 'NATO vs Warsaw Pact', 'The Cuban Missile Crisis', 'Détente, Arms Control', 'Division of Germany, Berlin'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_01_001', title: 'Cold War: Origins, the Two Superpowers and the Iron Curtain',
          caseStudy: { intro: 'Begin with a 2-minute video clip of the Berlin Wall falling in 1989 — a moment students may have seen in documentaries.',
            decisions: [{ prompt: 'What were the two opposing ideological systems that defined the Cold War, and which superpower led each bloc?', options: [
                { text: 'The two systems were liberal democratic capitalism (led by the USA) and Marxist-Leninist', outcome: 'The two systems were liberal democratic capitalism (led by the USA) and Marxist-Leninist communism.' },
                { text: 'democracy vs', outcome: 'Not quite — Students often think the "Iron Curtain" was a single continuous wall from the Baltic to the.', reveals: 'the-iron-curtain-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_01_002', title: 'Containment Doctrine, Truman Doctrine and Marshall Plan',
          caseStudy: { intro: 'Imagine you are reading a 1947 newspaper headline: "Truman Asks Congress for $400 Million to Save Greece and Turkey." Ask: Why would the US intervene in two.',
            decisions: [{ prompt: 'What was the core strategic idea of George Kennan\'s "Long Telegram" (1946) that became the Containment Doctrine?', options: [
                { text: 'The core idea was that the Soviet Union was inherently expansionist due to', outcome: 'The core idea was that the Soviet Union was inherently expansionist due to Marxist-Leninist.' },
                { text: 'containment meant rolling back communism wherever it existed', outcome: 'Not quite — Students often conflate the **Truman Doctrine** and **Marshall Plan** as "the same thing: US giving.', reveals: 'students-often-conflate-the-truman' },
                { text: 'rollback', outcome: 'Not quite — Students often conflate the **Truman Doctrine** and **Marshall Plan** as "the same thing: US giving.', reveals: 'students-often-conflate-the-truman' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_01_003', title: 'NATO vs Warsaw Pact: Military Alliances of the Two Blocs',
          caseStudy: { intro: 'Imagine you see a news report today about NATO expansion eastward and Russian objections — this is a direct legacy of the Cold War alliance system.',
            decisions: [{ prompt: 'Name the year of formation and the number of founding members for both NATO and the Warsaw Pact.', options: [
                { text: 'NATO was formed in 1949 with 12 founding members (Belgium, Canada, Denmark, France,', outcome: 'NATO was formed in 1949 with 12 founding members (Belgium, Canada, Denmark, France, Iceland, Italy.' },
                { text: 'mirror images', outcome: 'Not quite — Students often believe NATO and the Warsaw Pact were symmetrical "mirror images" — equal.', reveals: 'nato-and-the-warsaw-pact' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_01_004', title: 'The Cuban Missile Crisis of 1962 and Brinkmanship',
          caseStudy: { intro: 'Imagine you are a student in 1962 watching TV as President Kennedy announces a naval blockade of Cuba because Soviet nuclear missiles can reach your city.',
            decisions: [{ prompt: 'What was the immediate trigger for the Cuban Missile Crisis in October 1962?', options: [
                { text: 'The immediate trigger was the discovery by a US U-2 spy plane on October 14, 1962, of', outcome: 'The immediate trigger was the discovery by a US U-2 spy plane on October 14, 1962, of Soviet SS-4.' },
                { text: 'Bay of Pigs invasion', outcome: 'Not quite — **Misconception:** "The crisis ended because Khrushchev \'blinked\' and Kennedy \'won\' — proving.', reveals: 'misconception-the-crisis-ended-because' },
                { text: 'Berlin Wall construction', outcome: 'Not quite — **Misconception:** "The crisis ended because Khrushchev \'blinked\' and Kennedy \'won\' — proving.', reveals: 'misconception-the-crisis-ended-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_01_005', title: 'Détente, Arms Control and the SALT Treaties',
          caseStudy: { intro: 'Imagine two rival neighbours who both keep buying bigger guns — they spend all their income on weapons, live in constant fear of a shootout, and neither can.',
            decisions: [{ prompt: 'What does the acronym SALT stand for, and which two superpowers were the primary negotiators in the SALT process?', options: [
                { text: 'SALT stands for Strategic Arms Limitation Talks', outcome: 'SALT stands for Strategic Arms Limitation Talks; the negotiators were the United States and the.' },
                { text: 'Strategic Arms Limitation Treaty', outcome: 'Not quite — Students often confuse "détente" with "end of the Cold War" — they think SALT treaties ended the.', reveals: 'students-often-confuse-d-tente' },
                { text: 'détente', outcome: 'Not quite — Students often confuse "détente" with "end of the Cold War" — they think SALT treaties ended the.', reveals: 'students-often-confuse-d-tente' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a Model UN on the early Cold War, a US delegate proposes \'rolling back\' communist governments inside Eastern Europe with direct intervention, citing Kennan\'s containment doctrine as the authority.',
            decisions: [{ prompt: 'Does containment authorise rollback?', options: [
                { text: 'No — Kennan\'s doctrine was \'firm and vigilant containment\' at the frontiers of Soviet pressure, applied where resistance could still matter — aid to Greece and Turkey, reconstruction via the Marshall Plan; intervening inside an established bloc is the later \'rollback\' idea, not containment.', outcome: 'The chapter\'s line between strategy and aggression: containment stopped expansion at its edges — it never promised to reverse what was already consolidated.' },
                { text: 'Yes — containment means opposing communism wherever it exists, by any means.', outcome: 'That\'s Dulles-era rollback dressed as Kennan — the original logic was that the USSR retreats before firm resistance at contested points, not that the US invades consolidated territory.', reveals: 'containment-equals-rollback' },
                { text: 'Yes — the Marshall Plan already intervened economically, so military rollback is the same policy.', outcome: 'The instruments differ in kind — the Plan was economic reconstruction to remove communism\'s appeal, not force inside the bloc; treating them as interchangeable erases the strategy\'s own division of labour.', reveals: 'aid-equals-intervention' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read the Cold War\'s origin as choices, not fate — a war fought everywhere except between the two capitals.',
            decisions: [{ prompt: 'What comes next? The Cold War Era · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Cold War Era · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_01_001', difficulty: 'standard',
          question: 'The Cold War (1947–1991) was a prolonged geopolitical, ideological, and.',
          hint: 'Review the Yalta and Potsdam Conference outcomes (Class 12 History Chapter 1) and the.',
          misconception: 'Students often think the "Iron Curtain" was a single continuous wall from the Baltic to the Adriatic from 1946 onward.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Cold War (1947–1991) was a prolonged geopolitical, ideological, and strategic rivalry',
                  options: ['The Cold War (1947–1991) was a prolonged geopolitical, ideological, and strategic rivalry', 'The Containment Doctrine was the overarching US foreign policy strategy (articulated by', 'NATO (North Atlantic Treaty Organization) and the Warsaw Pact were the two opposing', 'The Cuban Missile Crisis (October 16–28, 1962) was a 13-day confrontation between the'],
                  hint: 'Review the Yalta and Potsdam Conference outcomes (Class 12 History Chapter 1) and the concept.',
                  misconception: 'Students often think the "Iron Curtain" was a single continuous wall from the Baltic to the Adriatic from 1946 onward.' }
          ],
            remediations: { 'the-iron-curtain-was-a': { steps: ['If the student holds the "single wall from 1946" view: (1) Show a timeline map of border fortifications: 1946.', '(2) Assign a primary-source comparison: Churchill\'s Fulton speech (1946) vs.', 'a 1950 East German police report on border crossings.', '(3) Re-diagnose with: "In what year did the term \'Iron Curtain\' become a physical barrier for a citizen in Leipzig?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the "Iron Curtain" was a single continuous wall from the Baltic to the Adriatic from 1946 onward.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Cold War began because the USA and USSR were natural enemies." Use evidence from 1945–1947.', answer: 'The claim is reductionist',
                  options: ['The claim is reductionist', 'Iron Curtain'],
                  hint: 'Review the Yalta and Potsdam Conference outcomes (Class 12 History Chapter 1) and the concept.',
                  misconception: 'Students often think the "Iron Curtain" was a single continuous wall from the Baltic to the Adriatic from 1946 onward.' }
          ],
            remediations: { 'the-iron-curtain-was-a': { steps: ['If the student holds the "single wall from 1946" view: (1) Show a timeline map of border fortifications: 1946.', '(2) Assign a primary-source comparison: Churchill\'s Fulton speech (1946) vs.', 'a 1950 East German police report on border crossings.', '(3) Re-diagnose with: "In what year did the term \'Iron Curtain\' become a physical barrier for a citizen in Leipzig?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_01_002', difficulty: 'standard',
          question: 'The Containment Doctrine was the overarching US foreign policy strategy.',
          hint: 'Revisit c12_ps_cbse_01_001: focus on the 1945-47 timeline — Soviet actions in Poland.',
          misconception: 'Students often conflate the **Truman Doctrine** and **Marshall Plan** as "the same thing: US giving money to stop.',
          parts: [
                { id: 'a', prompt: 'What was the core strategic idea of George Kennan\'s "Long Telegram" (1946) that became the Containment Doctrine?', answer: 'The core idea was that the Soviet Union was inherently expansionist due to',
                  options: ['The core idea was that the Soviet Union was inherently expansionist due to', 'containment meant rolling back communism wherever it existed', 'rollback'],
                  hint: 'Revisit c12_ps_cbse_01_001: focus on the 1945-47 timeline — Soviet actions in Poland, Romania.',
                  misconception: 'Students often conflate the **Truman Doctrine** and **Marshall Plan** as "the same thing: US giving money to stop communism." They miss.' },
                { id: 'b', prompt: 'Why did the Truman Doctrine specifically target Greece and Turkey in 1947, rather than, say, Poland or Czechoslovakia?', answer: 'Greece and Turkey were the only Eastern Mediterranean countries not yet under',
                  options: ['Greece and Turkey were the only Eastern Mediterranean countries not yet under', 'because they were the most industrialized'],
                  hint: 'Revisit c12_ps_cbse_01_001: focus on the 1945-47 timeline — Soviet actions in Poland, Romania.',
                  misconception: 'Students often conflate the **Truman Doctrine** and **Marshall Plan** as "the same thing: US giving money to stop communism." They miss.' }
          ],
            remediations: { 'students-often-conflate-the-truman': { steps: ['Re-read the "Long Telegram" excerpt (NCERT Class 12, Ch.1) and identify the three adjectives Kennan uses to describe.', 'Create a two-column table: Column A = Truman Doctrine features (bilateral, military/political, emergency.', 'Watch the 5-min clip "Marshall Plan & Soviet Reaction" (BBC Cold War series) to visualize the OEEC meeting and the.', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_01_003', difficulty: 'standard',
          question: 'NATO (North Atlantic Treaty Organization) and the Warsaw Pact were the two.',
          hint: 'Revisit Containment Doctrine (c12_ps_cbse_01_002) and Deterrence Theory.',
          misconception: 'Students often believe NATO and the Warsaw Pact were symmetrical "mirror images" — equal in structure, voluntary.',
          parts: [
                { id: 'a', prompt: 'Explain why the Soviet Union created the Warsaw Pact in 1955, specifically linking it to the Paris Agreements of 1954.', answer: 'The Paris Agreements (1954) ended the occupation of West Germany and allowed its',
                  options: ['The Paris Agreements (1954) ended the occupation of West Germany and allowed its', 'to match NATO', 'mirror images'],
                  hint: 'Revisit Containment Doctrine (c12_ps_cbse_01_002) and Deterrence Theory (c11_ps_cbse_09_007).',
                  misconception: 'Students often believe NATO and the Warsaw Pact were symmetrical "mirror images" — equal in structure, voluntary membership, and purpose.' },
                { id: 'b', prompt: 'Compare the role of the Supreme Allied Commander Europe (SACEUR) in NATO with the role of the Commander-in-Chief of the Warsaw Pact\'s Unified Armed Forces.', answer: 'SACEUR has always been a US general but operates under consensus-based political',
                  options: ['SACEUR has always been a US general but operates under consensus-based political', 'mirror images'],
                  hint: 'Revisit Containment Doctrine (c12_ps_cbse_01_002) and Deterrence Theory (c11_ps_cbse_09_007).',
                  misconception: 'Students often believe NATO and the Warsaw Pact were symmetrical "mirror images" — equal in structure, voluntary membership, and purpose.' }
          ],
            remediations: { 'nato-and-the-warsaw-pact': { steps: ['If the student cannot distinguish the alliances\' nature, have them: (1) Create a two-column table.', '"Imposed/Hierarchical" and place 5 features of each alliance in the correct column using the NCERT text on Soviet.', '(2) Re-read the timeline in node c12_ps_cbse_01_002 (Containment Doctrine) to see how NATO emerged from the Truman.', '(3) Watch a 5-minute clip of the 1956 Hungarian Revolution and 1968 Prague Spring invasions — identify which alliance\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_01_004', difficulty: 'standard',
          question: 'The Cuban Missile Crisis (October 16–28, 1962) was a 13-day confrontation.',
          hint: 'If stuck on *why Khrushchev chose Cuba*, revisit the **missile gap** data: USSR had ~20.',
          misconception: '**Misconception:** "The crisis ended because Khrushchev \'blinked\' and Kennedy \'won\' — proving US superiority.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Cuban Missile Crisis (October 16–28, 1962) was a 13-day confrontation between the',
                  options: ['The Cuban Missile Crisis (October 16–28, 1962) was a 13-day confrontation between the', 'The Cold War (1947–1991) was a prolonged geopolitical, ideological, and strategic rivalry', 'The Containment Doctrine was the overarching US foreign policy strategy (articulated by', 'NATO (North Atlantic Treaty Organization) and the Warsaw Pact were the two opposing'],
                  hint: 'If stuck on *why Khrushchev chose Cuba*, revisit the **missile gap** data: USSR had ~20 ICBMs vs.',
                  misconception: '**Misconception:** "The crisis ended because Khrushchev \'blinked\' and Kennedy \'won\' — proving US superiority." **Reality:** The crisis.' }
          ],
            remediations: { 'misconception-the-crisis-ended-because': { steps: ['Revisit **c12_ps_cbse_01_002** (Containment Doctrine) to re-learn US missile deployments in Turkey/Italy (1961) — the.', 'Re-read the **EXCOMM debate summary** (NCERT box on "The Cuban Missile Crisis"): list the *three* options (air strike.', 'Watch the 14-minute clip from *Thirteen Days* (2000) showing the **Robert Kennedy–Dobrynin meeting** — note the exact.', 'Re-diagnostic: Answer Diagnostic Question 4 *without notes*, explicitly naming the Turkey missile concession and why.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_01_005', difficulty: 'standard',
          question: 'Détente refers to the deliberate easing of Cold War tensions between the United.',
          hint: 'Revisit c11_ps_cbse_09_007 (Deterrence theory) — focus on the distinction between.',
          misconception: 'Students often confuse "détente" with "end of the Cold War" — they think SALT treaties ended the nuclear rivalry.',
          parts: [
                { id: 'a', prompt: 'What does the acronym SALT stand for, and which two superpowers were the primary negotiators in the SALT process?', answer: 'SALT stands for Strategic Arms Limitation Talks',
                  options: ['SALT stands for Strategic Arms Limitation Talks', 'Strategic Arms Limitation Treaty', 'détente', 'end of the Cold War'],
                  hint: 'Revisit c11_ps_cbse_09_007 (Deterrence theory) — focus on the distinction between "first-strike.',
                  misconception: 'Students often confuse "détente" with "end of the Cold War" — they think SALT treaties ended the nuclear rivalry.' },
                { id: 'b', prompt: 'Compare the outcomes of SALT I (1972) and SALT II (1979). Why was SALT I ratified and implemented while SALT II was signed but never ratified by the US Senate?', answer: 'SALT I (Interim Agreement + ABM Treaty) was ratified',
                  options: ['SALT I (Interim Agreement + ABM Treaty) was ratified', 'US domestic politics', 'Soviet cheating', 'détente'],
                  hint: 'Revisit c11_ps_cbse_09_007 (Deterrence theory) — focus on the distinction between "first-strike.',
                  misconception: 'Students often confuse "détente" with "end of the Cold War" — they think SALT treaties ended the nuclear rivalry.' }
          ],
            remediations: { 'students-often-confuse-d-tente': { steps: ['If the student conflates détente with the end of the Cold War: (1) Revisit c12_ps_cbse_01_004 (Cuban Missile Crisis).', '(2) Create a timeline: 1962 Crisis → 1963 Hotline → 1968 NPT → 1972 SALT I → 1979 SALT II → 1979 Afghanistan → 1983 SDI.', 'Mark where warhead curves bend (they don\'t bend down until START I, 1991).', '(3) Re-diagnostic: "Name one way the arms race *intensified* during détente." Expected: MIRV deployment, cruise.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_01_006', difficulty: 'standard',
          question: 'The division of Germany (1949–1990) refers to the political split of the.',
          hint: 'If stuck, review the Berlin Blockade (1948–49) in c12_ps_cbse_01_001 and the integration.',
          misconception: 'Students often believe the Berlin Wall was built by the Allied powers (US/UK/France/USSR) jointly to divide Berlin,.',
          parts: [
                { id: 'a', prompt: 'Why did the German Democratic Republic (East Germany) build the Berlin Wall in 1961?', answer: 'The GDR built the Wall to halt the massive emigration of skilled workers and',
                  options: ['The GDR built the Wall to halt the massive emigration of skilled workers and', 'to keep Western spies out', 'on Soviet orders to divide Europe'],
                  hint: 'If stuck, review the Berlin Blockade (1948–49) in c12_ps_cbse_01_001 and the integration of West.',
                  misconception: 'Students often believe the Berlin Wall was built by the Allied powers (US/UK/France/USSR) jointly to divide Berlin, or that it surrounded.' }
          ],
            remediations: { 'the-berlin-wall-was-built': { steps: ['If the student holds this misconception: (1) Show a map of the four occupation zones and the location of West Berlin.', '(2) Have them read the GDR\'s 13 August 1961 decree "On the Protection of the State Border" (available in translation).', '(3) Ask: "Which government issued this order?" (4) Re-attempt Diagnostic Question 2.', 'If still incorrect, revisit c12_ps_cbse_01_001 (Cold War origins) to clarify the distinction between Soviet policy and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
