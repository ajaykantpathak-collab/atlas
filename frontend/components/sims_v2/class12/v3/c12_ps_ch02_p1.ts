import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch02_p1: SimDef = {
    id: 'v3_c12_ps_ch02_p1',
    title: 'The End of Bipolarity · Part 1/2',
    subtitle: 'The constitution promised rights — Article 6 promised the party',
    classLevel: 12, subject: 'political_science', topic: 'The End of Bipolarity · Part 1/2',
    chapters: ['c12_ps_ch02'],
    nodeIds: ['c12_ps_cbse_02_001', 'c12_ps_cbse_02_002', 'c12_ps_cbse_02_003', 'c12_ps_cbse_02_004', 'c12_ps_cbse_02_005', 'c12_ps_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Systems analyst', intro: 'One party, one plan, five-year targets for every factory — a system that built a superpower and then stalled.', goal: 'Explain the Soviet system — single-party rule plus central planning — and why it rose fast and stagnated.' },
    discovery: {
        question: 'The Soviet constitution guaranteed universal suffrage and civil liberties — and the country ran as a one-party state anyway. How did both hold at once?',
        options: ['Article 6 made the CPSU the constitutional \'leading force\' — elections offered one candidate, real power ran through the party hierarchy, not the elected soviets', 'The constitution was ignored', 'People didn\'t vote', 'Rights came later'],
        answer: 'Article 6 made the CPSU the constitutional \'leading force\' — elections offered one candidate, real power ran through the party hierarchy, not the elected soviets',
        hook: 'India\'s Five-Year Plans weren\'t the Soviet model — Gosplan set binding targets for every enterprise and owned all industry; India\'s Planning Commission set indicative targets while markets and private ownership lived on. Inspiration isn\'t replication — and the Soviet system\'s early industrial miracle coexisted with the stagnation that later forced reform.',
    },
    teaching: [
        { title: 'The Soviet System: Planned Economy and Single-Party State', text: 'The Soviet System refers to the political and economic structure of the Union of Soviet Socialist Republics (USSR) from 1922 to 1991, characterized by a **single-party state** dominated by the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Dissect a system that planned everything: separate comprehensive central planning from India\'s indicative version, compare the nomenklatura with the civil service, and weigh industrial triumph against consumer shortage.',
        labels: ['The Soviet System: Planned', 'Gorbachev\'s Reforms: Glasnost', 'Fall of the Berlin', 'Causes of the Disintegration', 'Shock Therapy in Post-Communist', 'Consequences of Soviet Disintegration'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_02_001', title: 'The Soviet System: Planned Economy and Single-Party State',
          caseStudy: { intro: 'Imagine you are reading a news article comparing India’s mixed economy with the “old Soviet model” — the article mentions “five-year plans,” “state-owned.',
            decisions: [{ prompt: '**REMEMBER:** Name the two defining institutional features of the Soviet System as described in the NCERT textbook for Class 12.', options: [
                { text: '**Correct answer:** (1) A **single-party state** ruled by the Communist Party of the', outcome: '**Correct answer:** (1) A **single-party state** ruled by the Communist Party of the Soviet Union.' },
                { text: 'democracy and free market', outcome: 'Not quite — **Misconception:** “The Soviet Union had no constitution and no elections — it was pure.', reveals: 'misconception-the-soviet-union-had' },
                { text: 'multi-party elections', outcome: 'Not quite — **Misconception:** “The Soviet Union had no constitution and no elections — it was pure.', reveals: 'misconception-the-soviet-union-had' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_02_002', title: 'Gorbachev\'s Reforms: Glasnost and Perestroika',
          caseStudy: { intro: 'Imagine you are reading a 1988 newspaper headline: "Soviet Citizens Openly Criticize Government for First Time in Decades." Ask: What made this possible?',
            decisions: [{ prompt: 'What were the two main pillars of Gorbachev\'s reform agenda, and what does each term literally mean in Russian?', options: [
                { text: 'The two pillars were Glasnost (meaning "openness" or "transparency") and Perestroika', outcome: 'The two pillars were Glasnost (meaning "openness" or "transparency") and Perestroika (meaning.' },
                { text: 'Demokratizatsiya', outcome: 'Not quite — Students often think Glasnost and Perestroika were a single policy called "Gorbachev\'s reforms" and.', reveals: 'glasnost-and-perestroika-were-a' },
                { text: 'Gorbachev\'s reforms', outcome: 'Not quite — Students often think Glasnost and Perestroika were a single policy called "Gorbachev\'s reforms" and.', reveals: 'glasnost-and-perestroika-were-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_02_003', title: 'Fall of the Berlin Wall and German Unification (1990)',
          caseStudy: { intro: 'Imagine you\'re watching a 1989 news clip: East Berliners climbing the Wall with hammers while border guards watch passively.',
            decisions: [{ prompt: 'What was the immediate trigger for the opening of the Berlin Wall on November 9, 1989?', options: [
                { text: 'Günter Schabowski, an East German Politburo member, mistakenly announced at a live press', outcome: 'Günter Schabowski, an East German Politburo member, mistakenly announced at a live press conference.' },
                { text: 'a popular vote', outcome: 'Not quite — Students often think the Berlin Wall fell because "the Soviet Union collapsed" — reversing.', reveals: 'the-berlin-wall-fell-because' },
                { text: 'the Soviet Union collapsed', outcome: 'Not quite — Students often think the Berlin Wall fell because "the Soviet Union collapsed" — reversing.', reveals: 'the-berlin-wall-fell-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_02_004', title: 'Causes of the Disintegration of the USSR',
          caseStudy: { intro: 'Begin with a relatable scenario: "Imagine India suddenly splitting into 20+ independent countries — that\'s what happened to the USSR in 1991.',
            decisions: [{ prompt: 'Name the three Baltic republics that were the first to declare independence from the USSR in 1990–1991, and state the year the USSR was.', options: [
                { text: 'The three Baltic republics were Estonia, Latvia, and Lithuania (declared independence in', outcome: 'The three Baltic republics were Estonia, Latvia, and Lithuania (declared independence.' },
                { text: 'Ukraine or Belarus as the first, or giving 1989 as the dissolution year', outcome: 'Not quite — Students often believe **the USSR collapsed solely because Gorbachev\'s reforms failed** or **solely.', reveals: 'the-ussr-collapsed-solely-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_02_005', title: 'Shock Therapy in Post-Communist Transition States',
          caseStudy: { intro: 'Imagine you are a policy advisor in Moscow, January 1992: the Soviet Union has dissolved, hyperinflation looms, state factories are idle, and the ruble.',
            decisions: [{ prompt: 'Define "shock therapy" in the context of post-communist transition and name the international institutions most associated with its design.', options: [
                { text: 'Shock therapy is a rapid, simultaneous transition package', outcome: 'Shock therapy is a rapid, simultaneous transition package — price liberalization, mass.' },
                { text: 'gradual reform like China', outcome: 'Not quite — Students equate "shock therapy" with "privatization only" and assume it was a single policy applied.', reveals: 'students-equate-shock-therapy-with' },
                { text: 'only privatization', outcome: 'Not quite — Students equate "shock therapy" with "privatization only" and assume it was a single policy applied.', reveals: 'students-equate-shock-therapy-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_02_006', title: 'Consequences of Soviet Disintegration for World Politics',
          caseStudy: { intro: 'Imagine reading a 1992 newspaper headline: "Superpower No More: USSR Splits into 15 Nations." A Class 12 student might ask: "Did the world become safer or more.',
            decisions: [{ prompt: 'What was the immediate structural change in the international system following the dissolution of the USSR in December 1991?', options: [
                { text: 'The international system shifted from bipolarity (US-USSR rivalry) to unipolarity with', outcome: 'The international system shifted from bipolarity (US-USSR rivalry) to unipolarity with the United.' },
                { text: 'multipolarity emerged immediately', outcome: 'Not quite — Students believe "Soviet disintegration = immediate democracy and prosperity for all 15 republics.".', reveals: 'soviet-disintegration-immediate-democracy-and' },
                { text: 'Soviet disintegration = immediate democracy and prosperity for all 15 republics', outcome: 'Not quite — Students believe "Soviet disintegration = immediate democracy and prosperity for all 15 republics.".', reveals: 'soviet-disintegration-immediate-democracy-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A debate speaker calls glasnost \'Gorbachev\'s sentimental free-speech reform\' and perestroika \'an unrelated economic cleanup,\' missing why they were sequenced.',
            decisions: [{ prompt: 'How did the two reforms actually interact?', options: [
                { text: 'Glasnost was the battering ram — openness was meant to expose bureaucratic failure and build public pressure so perestroika\'s restructuring could break party resistance; instead, freed information also armed nationalist movements, and the loop dissolved the system it was meant to save.', outcome: 'The chapter\'s causal chain: political opening was the instrument of economic reform — the same free flow that weakened the centre empowered the peripheries, which is why reform became collapse.' },
                { text: 'The speaker is right — they were independent tracks, one political, one economic.', outcome: 'Sequencing is the point — glasnost came first precisely to clear the path for perestroika; reading them as parallel projects misses the strategic dependency and the feedback loop that followed.', reveals: 'reforms-were-parallel' },
                { text: 'Glasnost caused the collapse, so perestroika was the innocent half.', outcome: 'Neither was separable — restructuring without price reform produced shortages, and openness exposed both failures; the two reforms failed together, each amplifying the other\'s damage.', reveals: 'one-reform-did-it' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read the Soviet system as two pillars — party monopoly and command economy — that mobilised fast and innovated poorly.',
            decisions: [{ prompt: 'What comes next? The End of Bipolarity · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The End of Bipolarity · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_02_001', difficulty: 'standard',
          question: 'The Soviet System refers to the political and economic structure of the Union.',
          hint: 'If stuck, revisit **c11_hist_cbse_09_003** (Marx’s base-superstructure) and.',
          misconception: '**Misconception:** “The Soviet Union had no constitution and no elections — it was pure dictatorship from day one.”.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Soviet System refers to the political and economic structure of the Union of Soviet',
                  options: ['The Soviet System refers to the political and economic structure of the Union of Soviet', 'Glasnost (openness) and Perestroika (restructuring) were twin reform policies introduced', 'The fall of the Berlin Wall on November 9, 1989, was the pivotal event symbolizing the', 'The disintegration of the USSR (1991) refers to the dissolution of the Union of Soviet'],
                  hint: 'If stuck, revisit **c11_hist_cbse_09_003** (Marx’s base-superstructure) and **c11_ps_cbse_01_001**.',
                  misconception: '**Misconception:** “The Soviet Union had no constitution and no elections — it was pure dictatorship from day one.” **Why it’s wrong:** The.' }
          ],
            remediations: { 'misconception-the-soviet-union-had': { steps: ['**Re-read** the NCERT Class 12 *Contemporary World Politics* Chapter 1 (“The End of Bipolarity”), Section **“The Soviet.', 'Focus on the **bulleted list of features** and the **“Why did the Soviet system become stagnant?”** box.', '**Watch** the 10-min video “How the Soviet Union Worked” (CaspianReport or similar) — pause at **nomenklatura**.', '**Re-attempt** Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** “The Soviet Union had no constitution and no elections — it was pure dictatorship from day one.”.',
          parts: [
                { id: 'a', prompt: '**EVALUATE:** “The Soviet planned economy was a complete failure because it could not produce consumer goods.” Assess this claim using **three specific pieces.', answer: '**Correct answer:** The claim is **overstated**',
                  options: ['**Correct answer:** The claim is **overstated**', 'it was a total disaster', 'no constitution/elections'],
                  hint: 'If stuck, revisit **c11_hist_cbse_09_003** (Marx’s base-superstructure) and **c11_ps_cbse_01_001**.',
                  misconception: '**Misconception:** “The Soviet Union had no constitution and no elections — it was pure dictatorship from day one.” **Why it’s wrong:** The.' },
                { id: 'b', prompt: '**CREATE:** Draft a **tweet (≤ 280 characters)** that a Soviet citizen in 1980 might have written (samizdat style) to criticize the *gap between constitutional.', answer: '**Expected answer (criteria):** A good tweet will: - Mention **Article 6 (CPSU',
                  options: ['**Expected answer (criteria):** A good tweet will: - Mention **Article 6 (CPSU', 'no constitution/elections'],
                  hint: 'If stuck, revisit **c11_hist_cbse_09_003** (Marx’s base-superstructure) and **c11_ps_cbse_01_001**.',
                  misconception: '**Misconception:** “The Soviet Union had no constitution and no elections — it was pure dictatorship from day one.” **Why it’s wrong:** The.' }
          ],
            remediations: { 'misconception-the-soviet-union-had': { steps: ['**Re-read** the NCERT Class 12 *Contemporary World Politics* Chapter 1 (“The End of Bipolarity”), Section **“The Soviet.', 'Focus on the **bulleted list of features** and the **“Why did the Soviet system become stagnant?”** box.', '**Watch** the 10-min video “How the Soviet Union Worked” (CaspianReport or similar) — pause at **nomenklatura**.', '**Re-attempt** Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_02_002', difficulty: 'standard',
          question: 'Glasnost (openness) and Perestroika (restructuring) were twin reform policies.',
          hint: 'If stuck, revisit c12_ps_cbse_02_001 (The Soviet System) and focus on the "stagnation".',
          misconception: 'Students often think Glasnost and Perestroika were a single policy called "Gorbachev\'s reforms" and that both were.',
          parts: [
                { id: 'a', prompt: 'Compare the impact of Glasnost on the Communist Party\'s monopoly on information with its impact on nationalist movements in the Baltic republics and Ukraine.', answer: 'Glasnost ended the party\'s information monopoly by allowing critical journalism,',
                  options: ['Glasnost ended the party\'s information monopoly by allowing critical journalism,', 'Gorbachev\'s reforms', 'Gorbachev wanted to turn the USSR into a Western democracy'],
                  hint: 'If stuck, revisit c12_ps_cbse_02_001 (The Soviet System) and focus on the "stagnation" period.',
                  misconception: 'Students often think Glasnost and Perestroika were a single policy called "Gorbachev\'s reforms" and that both were primarily about.' }
          ],
            remediations: { 'glasnost-and-perestroika-were-a': { steps: ['If the student conflates the two reforms or misattributes democratic intent, have them: (1) Re-read the 1987 speech.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_02_003', difficulty: 'standard',
          question: 'The fall of the Berlin Wall on November 9, 1989, was the pivotal event.',
          hint: 'Revisit c12_ps_cbse_02_002, specifically the section on "Sinatra Doctrine" and.',
          misconception: 'Students often think the Berlin Wall fell because "the Soviet Union collapsed" — reversing causality.',
          parts: [
                { id: 'a', prompt: 'Compare the German reunification process (1990) with the breakup of Yugoslavia (1991–1995) on three dimensions: role of external powers, constitutional.', answer: 'German reunification: external powers (Four Powers) *facilitated* via treaty',
                  options: ['German reunification: external powers (Four Powers) *facilitated* via treaty', 'both were peaceful', 'both used referendums', 'the Soviet Union collapsed'],
                  hint: 'Revisit c12_ps_cbse_02_002, specifically the section on "Sinatra Doctrine" and Gorbachev\'s 1988.',
                  misconception: 'Students often think the Berlin Wall fell because "the Soviet Union collapsed" — reversing causality.' }
          ],
            remediations: { 'the-berlin-wall-fell-because': { steps: ['Re-watch the 10-minute clip of Schabowski\'s press conference (available on YouTube) to internalize the contingency.', 'Create a timeline with 8 entries: Gorbachev\'s 1988 UN speech (Sinatra Doctrine) → Hungarian border opening (May 1989) →.', 'For each entry, write one sentence on whether it was a *domestic* (GDR), *Soviet*, *West German*, or *Four Power*.', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_02_004', difficulty: 'standard',
          question: 'The disintegration of the USSR (1991) refers to the dissolution of the Union.',
          hint: 'If stuck, revisit c12_ps_cbse_02_001 for the Soviet system\'s structural flaws and.',
          misconception: 'Students often believe **the USSR collapsed solely because Gorbachev\'s reforms failed** or **solely because the US won.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The disintegration of the USSR (1991) refers to the dissolution of the Union of Soviet',
                  options: ['The disintegration of the USSR (1991) refers to the dissolution of the Union of Soviet', 'The Soviet System refers to the political and economic structure of the Union of Soviet', 'Glasnost (openness) and Perestroika (restructuring) were twin reform policies introduced', 'The fall of the Berlin Wall on November 9, 1989, was the pivotal event symbolizing the'],
                  hint: 'If stuck, revisit c12_ps_cbse_02_001 for the Soviet system\'s structural flaws and.',
                  misconception: 'Students often believe **the USSR collapsed solely because Gorbachev\'s reforms failed** or **solely because the US won the Cold War**.' }
          ],
            remediations: { 'the-ussr-collapsed-solely-because': { steps: ['If the student holds the monocausal misconception, follow these steps: 1.', 'Re-read the \'Soviet System\' node (c12_ps_cbse_02_001) to list three structural economic weaknesses (e.g., lack.', 'Re-read the \'Gorbachev\'s Reforms\' node (c12_ps_cbse_02_002) to identify which reform (Glasnost/Perestroika) addressed.', 'Use a two-column table: "Pre-existing Condition" vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_02_005', difficulty: 'standard',
          question: 'Shock Therapy refers to the rapid, comprehensive transition strategy from.',
          hint: 'If stuck on "why not gradual like China?", revisit c12_ps_cbse_02_004: the USSR\'s.',
          misconception: 'Students equate "shock therapy" with "privatization only" and assume it was a single policy applied identically.',
          parts: [
                { id: 'a', prompt: 'Define "shock therapy" in the context of post-communist transition and name the international institutions most associated with its design and financing.', answer: 'Shock therapy is a rapid, simultaneous transition package',
                  options: ['Shock therapy is a rapid, simultaneous transition package', 'gradual reform like China', 'only privatization'],
                  hint: 'If stuck on "why not gradual like China?", revisit c12_ps_cbse_02_004: the USSR\'s disintegration.',
                  misconception: 'Students equate "shock therapy" with "privatization only" and assume it was a single policy applied identically everywhere.' },
                { id: 'b', prompt: 'Compare the political consequences of shock therapy in Poland (1990s) and Russia (1990s) on democratic consolidation.', answer: 'Russia: output collapse >50%, hyperinflation wiped savings, oligarchs captured',
                  options: ['Russia: output collapse >50%, hyperinflation wiped savings, oligarchs captured', 'both consolidated democracy'],
                  hint: 'If stuck on "why not gradual like China?", revisit c12_ps_cbse_02_004: the USSR\'s disintegration.',
                  misconception: 'Students equate "shock therapy" with "privatization only" and assume it was a single policy applied identically everywhere.' }
          ],
            remediations: { 'students-equate-shock-therapy-with': { steps: ['If the student conflates shock therapy with mere privatization or thinks it was uniform: Step 1) Re-read.', 'Step 2) Create a two-column table: "Poland 1990" vs.', '"Russia 1992" — list five policy components for each (price freeing, privatization method, fiscal policy, trade policy.', 'Step 3) Identify which components were *identical* (IMF stabilization) and which *diverged* (privatization method.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_02_006', difficulty: 'standard',
          question: 'The consequences of Soviet disintegration refer to the multidimensional.',
          hint: 'Revisit the definition of bipolarity in Class 11 Political Theory (c11_ps_cbse_07_001).',
          misconception: 'Students believe "Soviet disintegration = immediate democracy and prosperity for all 15 republics." In reality, by 2000.',
          parts: [
                { id: 'a', prompt: 'Analyze how the end of Soviet military aid and ideological support affected revolutionary movements and proxy conflicts in the Global South (e.g., Angola.', answer: 'Soviet withdrawal ended material support for Marxist-Leninist governments and',
                  options: ['Soviet withdrawal ended material support for Marxist-Leninist governments and', 'peace broke out', 'Soviet disintegration = immediate democracy and prosperity for all 15 republics', 'managed democracy'],
                  hint: 'Revisit the definition of bipolarity in Class 11 Political Theory (c11_ps_cbse_07_001) and the Cold.',
                  misconception: 'Students believe "Soviet disintegration = immediate democracy and prosperity for all 15 republics." In reality, by 2000 only the three.' },
                { id: 'b', prompt: 'Compare the economic transition outcomes in Poland (shock therapy from 1990) and Russia (shock therapy from 1992) by 2000.', answer: 'Poland\'s GDP surpassed 1989 levels by 1996 with moderate inequality rise',
                  options: ['Poland\'s GDP surpassed 1989 levels by 1996 with moderate inequality rise', 'Soviet disintegration = immediate democracy and prosperity for all 15 republics', 'managed democracy', '"Soviet disintegration = immediate democracy and prosperity for all 15 republics'],
                  hint: 'Revisit the definition of bipolarity in Class 11 Political Theory (c11_ps_cbse_07_001) and the Cold.',
                  misconception: 'Students believe "Soviet disintegration = immediate democracy and prosperity for all 15 republics." In reality, by 2000 only the three.' }
          ],
            remediations: { 'soviet-disintegration-immediate-democracy-and': { steps: ['If student holds the "instant democracy" misconception: Step 1 — Compare Freedom House scores 1991 vs 2000 for all 15.', 'Step 2 — Read the 1993 Russian constitutional crisis (Yeltsin shells parliament) as case study of democratic.', 'Step 3 — Analyze why Baltics succeeded: pre-1940 statehood memory, strong civil society, EU conditionality.', 'Step 4 — Re-attempt Diagnostic Question 4 with this evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
