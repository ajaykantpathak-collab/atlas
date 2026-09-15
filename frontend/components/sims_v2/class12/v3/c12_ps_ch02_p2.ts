import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch02_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch02_p2: SimDef = {
    id: 'v3_c12_ps_ch02_p2',
    title: 'The End of Bipolarity · Part 2/2',
    subtitle: 'The constitution promised rights — Article 6 promised the party',
    classLevel: 12, subject: 'political_science', topic: 'The End of Bipolarity · Part 2/2',
    chapters: ['c12_ps_ch02'],
    nodeIds: ['c12_ps_cbse_02_007', 'c12_ps_cbse_02_008', 'c12_ps_cbse_02_009', 'c12_ps_cbse_02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Systems analyst', intro: 'One party, one plan, five-year targets for every factory — a system that built a superpower and then stalled.', goal: 'Explain the Soviet system — single-party rule plus central planning — and why it rose fast and stagnated.' },
    discovery: {
        question: 'The Soviet constitution guaranteed universal suffrage and civil liberties — and the country ran as a one-party state anyway. How did both hold at once?',
        options: ['Article 6 made the CPSU the constitutional \'leading force\' — elections offered one candidate, real power ran through the party hierarchy, not the elected soviets', 'The constitution was ignored', 'People didn\'t vote', 'Rights came later'],
        answer: 'Article 6 made the CPSU the constitutional \'leading force\' — elections offered one candidate, real power ran through the party hierarchy, not the elected soviets',
        hook: 'India\'s Five-Year Plans weren\'t the Soviet model — Gosplan set binding targets for every enterprise and owned all industry; India\'s Planning Commission set indicative targets while markets and private ownership lived on. Inspiration isn\'t replication — and the Soviet system\'s early industrial miracle coexisted with the stagnation that later forced reform.',
    },
    teaching: [
        { title: 'End of the Socialist Bloc in Eastern Europe (1989 Revolutions)', text: 'The End of the Socialist Bloc in Eastern Europe (1989 Revolutions) refers to the rapid, largely peaceful collapse of Soviet-backed communist regimes across six Eastern European countries — Poland.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Dissect a system that planned everything: separate comprehensive central planning from India\'s indicative version, compare the nomenklatura with the civil service, and weigh industrial triumph against consumer shortage.',
        labels: ['End of the Socialist', 'The Violent Breakup', 'The New World Order', 'India\'s Response to'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_02_007', title: 'End of the Socialist Bloc in Eastern Europe (1989 Revolutions)',
          caseStudy: { intro: 'Imagine you are watching the news in November 1989: East Germans are dancing on the Berlin Wall, Czechoslovaks are jingling keys in Wenceslas Square, and.',
            decisions: [{ prompt: 'Name the six Warsaw Pact countries where communist regimes collapsed in 1989, and identify which one experienced a violent overthrow of its.', options: [
                { text: 'Poland, Hungary, East Germany, Czechoslovakia, Bulgaria, Romania', outcome: 'Poland, Hungary, East Germany, Czechoslovakia, Bulgaria, Romania.' },
                { text: '1989 revolutions were a single coordinated uprising directed from Moscow', outcome: 'Not quite — Students often believe "1989 revolutions were a single coordinated uprising directed from Moscow".', reveals: '1989-revolutions-were-a-single' },
                { text: 'all 1989 transitions were peaceful like Czechoslovakia', outcome: 'Not quite — Students often believe "1989 revolutions were a single coordinated uprising directed from Moscow".', reveals: '1989-revolutions-were-a-single' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_02_008', title: 'The Violent Breakup of Yugoslavia and Ethnic Conflict',
          caseStudy: { intro: 'Imagine you see a news report about ethnic tensions in Manipur or Kashmir — identities hardening, political leaders using "us vs them" rhetoric, violence.',
            decisions: [{ prompt: 'What was the name of the federal unit that Slobodan Milošević stripped of its autonomy in 1989, triggering the first major constitutional.', options: [
                { text: 'Kosovo (an autonomous province within Serbia)', outcome: 'Kosovo (an autonomous province within Serbia). A wrong answer (e.g., "Croatia" or "Bosnia") reveals.' },
                { text: 'Croatia', outcome: 'Not quite — Students often believe Yugoslavia\'s breakup was caused by "ancient ethnic hatreds" (primordialism).', reveals: 'yugoslavia-s-breakup-was-caused' },
                { text: 'Bosnia', outcome: 'Not quite — Students often believe Yugoslavia\'s breakup was caused by "ancient ethnic hatreds" (primordialism).', reveals: 'yugoslavia-s-breakup-was-caused' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_02_009', title: 'The New World Order and Unipolarity after 1991',
          caseStudy: { intro: 'Imagine reading a 2024 news headline: "EU imposes new digital regulations forcing US tech giants to change global practices" or "ASEAN mediates Myanmar crisis.',
            decisions: [{ prompt: 'What does "unipolarity" mean in the context of the post-1991 international system, and which event marked its definitive onset?', options: [
                { text: 'Unipolarity means a single state (the United States) possesses preponderant military,', outcome: 'Unipolarity means a single state (the United States) possesses preponderant military, economic, and.' },
                { text: 'unipolarity means US controls all countries', outcome: 'Not quite — Students often equate "unipolarity" with "US hegemony" and assume the US can dictate outcomes.', reveals: 'students-often-equate-unipolarity-with' },
                { text: 'it began in 1945', outcome: 'Not quite — Students often equate "unipolarity" with "US hegemony" and assume the US can dictate outcomes.', reveals: 'students-often-equate-unipolarity-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_02_010', title: 'India\'s Response to the Disintegration of the Soviet Union',
          caseStudy: { intro: 'Imagine you are an Indian diplomat in 1991: your biggest arms supplier, UN veto partner, and ideological counterweight to the US has just vanished overnight.',
            decisions: [{ prompt: 'In which year did India sign the Treaty of Friendship and Cooperation with the Russian Federation, replacing the 1971 Indo-Soviet Treaty?', options: [
                { text: '1993', outcome: '1993. A wrong answer (e.g., 1991 or 1995) reveals confusion between the Soviet collapse (Dec 1991).' },
                { text: 'socialist orientation', outcome: 'Not quite — Students think India "switched sides" from the Soviet bloc to the US bloc after 1991.', reveals: 'india-switched-sides-from-the' },
                { text: 'switched sides', outcome: 'Not quite — Students think India "switched sides" from the Soviet bloc to the US bloc after 1991.', reveals: 'india-switched-sides-from-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A debate speaker calls glasnost \'Gorbachev\'s sentimental free-speech reform\' and perestroika \'an unrelated economic cleanup,\' missing why they were sequenced.',
            decisions: [{ prompt: 'How did the two reforms actually interact?', options: [
                { text: 'Glasnost was the battering ram — openness was meant to expose bureaucratic failure and build public pressure so perestroika\'s restructuring could break party resistance; instead, freed information also armed nationalist movements, and the loop dissolved the system it was meant to save.', outcome: 'The chapter\'s causal chain: political opening was the instrument of economic reform — the same free flow that weakened the centre empowered the peripheries, which is why reform became collapse.' },
                { text: 'The speaker is right — they were independent tracks, one political, one economic.', outcome: 'Sequencing is the point — glasnost came first precisely to clear the path for perestroika; reading them as parallel projects misses the strategic dependency and the feedback loop that followed.', reveals: 'reforms-were-parallel' },
                { text: 'Glasnost caused the collapse, so perestroika was the innocent half.', outcome: 'Neither was separable — restructuring without price reform produced shortages, and openness exposed both failures; the two reforms failed together, each amplifying the other\'s damage.', reveals: 'one-reform-did-it' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_02_010', title: 'You made it',
          caseStudy: { intro: 'You can now read the Soviet system as two pillars — party monopoly and command economy — that mobilised fast and innovated poorly.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_02_007', difficulty: 'standard',
          question: 'The End of the Socialist Bloc in Eastern Europe (1989 Revolutions) refers.',
          hint: 'If stuck, re-read the Brezhnev Doctrine (1968 Prague Spring context) and Gorbachev\'s 1988.',
          misconception: 'Students often believe "1989 revolutions were a single coordinated uprising directed from Moscow" or "all 1989.',
          parts: [
                { id: 'a', prompt: 'Name the six Warsaw Pact countries where communist regimes collapsed in 1989, and identify which one experienced a violent overthrow of its leader.', answer: 'Poland, Hungary, East Germany, Czechoslovakia, Bulgaria, Romania',
                  options: ['Poland, Hungary, East Germany, Czechoslovakia, Bulgaria, Romania', '1989 revolutions were a single coordinated uprising directed from Moscow', 'all 1989 transitions were peaceful like Czechoslovakia'],
                  hint: 'If stuck, re-read the Brezhnev Doctrine (1968 Prague Spring context) and Gorbachev\'s 1988.',
                  misconception: 'Students often believe "1989 revolutions were a single coordinated uprising directed from Moscow" or "all 1989 transitions were peaceful.' },
                { id: 'b', prompt: 'Explain the difference between the Brezhnev Doctrine (1968) and the Sinatra Doctrine (1988), and why the latter made the 1989 revolutions possible.', answer: 'Brezhnev Doctrine: "limited sovereignty"',
                  options: ['Brezhnev Doctrine: "limited sovereignty"', 'supported', '1989 revolutions were a single coordinated uprising directed from Moscow', 'all 1989 transitions were peaceful like Czechoslovakia'],
                  hint: 'If stuck, re-read the Brezhnev Doctrine (1968 Prague Spring context) and Gorbachev\'s 1988.',
                  misconception: 'Students often believe "1989 revolutions were a single coordinated uprising directed from Moscow" or "all 1989 transitions were peaceful.' },
                { id: 'c', prompt: 'Compare the Czechoslovak "Velvet Revolution" (Nov 17-Dec 29, 1989) and the Romanian Revolution (Dec 16-25, 1989) on three dimensions: (a) role of civil society.', answer: 'role of civil society vs',
                  options: ['role of civil society vs', 'peaceful', 'clean breaks', 'stolen revolution'],
                  hint: 'If stuck, re-read the Brezhnev Doctrine (1968 Prague Spring context) and Gorbachev\'s 1988.',
                  misconception: 'Students often believe "1989 revolutions were a single coordinated uprising directed from Moscow" or "all 1989 transitions were peaceful.' }
          ],
            remediations: { '1989-revolutions-were-a-single': { steps: ['If the student conflates the six cases or misattributes agency to Gorbachev: (1) Revisit node c12_ps_cbse_02_002.', '(3) Re-diagnostic: "Explain why Hungary\'s border opening was a necessary but not sufficient condition for the Berlin.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "1989 revolutions were a single coordinated uprising directed from Moscow" or "all 1989.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "The 1989 revolutions succeeded because Gorbachev deliberately engineered the collapse of the Eastern Bloc to save the Soviet Union.".', answer: 'Refute',
                  options: ['Refute', 'engineered collapse', '1989 revolutions were a single coordinated uprising directed from Moscow', 'all 1989 transitions were peaceful like Czechoslovakia'],
                  hint: 'If stuck, re-read the Brezhnev Doctrine (1968 Prague Spring context) and Gorbachev\'s 1988.',
                  misconception: 'Students often believe "1989 revolutions were a single coordinated uprising directed from Moscow" or "all 1989 transitions were peaceful.' }
          ],
            remediations: { '1989-revolutions-were-a-single': { steps: ['If the student conflates the six cases or misattributes agency to Gorbachev: (1) Revisit node c12_ps_cbse_02_002.', '(3) Re-diagnostic: "Explain why Hungary\'s border opening was a necessary but not sufficient condition for the Berlin.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_02_008', difficulty: 'standard',
          question: 'The violent breakup of Yugoslavia refers to the series of interconnected ethnic.',
          hint: 'If stuck, re-read NCERT Class 12 Chapter 1 section "The Violent Breakup of Yugoslavia".',
          misconception: 'Students often believe Yugoslavia\'s breakup was caused by "ancient ethnic hatreds" (primordialism) — that Serbs.',
          parts: [
                { id: 'a', prompt: 'What was the name of the federal unit that Slobodan Milošević stripped of its autonomy in 1989, triggering the first major constitutional crisis in Yugoslavia?', answer: 'Kosovo (an autonomous province within Serbia)',
                  options: ['Kosovo (an autonomous province within Serbia)', 'Croatia', 'Bosnia', 'ancient ethnic hatreds'],
                  hint: 'If stuck, re-read NCERT Class 12 Chapter 1 section "The Violent Breakup of Yugoslavia" and Class 11.',
                  misconception: 'Students often believe Yugoslavia\'s breakup was caused by "ancient ethnic hatreds" (primordialism) — that Serbs, Croats, and Bosniaks.' },
                { id: 'b', prompt: 'Compare the international community\'s recognition of Slovenia/Croatia (Jan 1992) with its refusal to recognize Republika Srpska (Bosnian Serb entity).', answer: 'The principle of *uti possidetis juris*',
                  options: ['The principle of *uti possidetis juris*', 'the West was biased against Serbs', 'ancient ethnic hatreds', 'nothing can be done'],
                  hint: 'If stuck, re-read NCERT Class 12 Chapter 1 section "The Violent Breakup of Yugoslavia" and Class 11.',
                  misconception: 'Students often believe Yugoslavia\'s breakup was caused by "ancient ethnic hatreds" (primordialism) — that Serbs, Croats, and Bosniaks.' }
          ],
            remediations: { 'yugoslavia-s-breakup-was-caused': { steps: ['Revisit **c11_ps_cbse_07_003** (civic vs ethnic nationalism) — map the shift from Tito\'s civic "Yugoslavism".', 'Review **c12_ps_cbse_02_004** (Causes of USSR Disintegration) — compare Gorbachev\'s refusal to use force with.', 'Re-diagnostic: "Explain why the 1990 multi-party elections in each republic produced nationalist victories — was.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_02_009', difficulty: 'standard',
          question: 'The "New World Order and Unipolarity after 1991" refers to the post-Cold War.',
          hint: 'Revisit c12_ps_cbse_02_004 (Causes of USSR disintegration) and c12_ps_cbse_02_006.',
          misconception: 'Students often equate "unipolarity" with "US hegemony" and assume the US can dictate outcomes globally.',
          parts: [
                { id: 'a', prompt: 'Explain why the European Union is considered an "alternative centre of power" despite not having a unified military or a single foreign policy.', answer: 'The EU is an alternative centre',
                  options: ['The EU is an alternative centre', 'no EU army'],
                  hint: 'Revisit c12_ps_cbse_02_004 (Causes of USSR disintegration) and c12_ps_cbse_02_006 (Consequences for.',
                  misconception: 'Students often equate "unipolarity" with "US hegemony" and assume the US can dictate outcomes globally.' }
          ],
            remediations: { 'students-often-equate-unipolarity-with': { steps: ['Re-read the distinction between *polarity* (systemic structure) and *hegemony* (behavioural dominance).', 'Create a 2x2 matrix: Rows = US, EU, ASEAN, China; Columns = Military Power, Economic Power, Institutional Power.', 'Identify which column(s) show non-US actors matching or exceeding the US.', 'Answer: "Does the US always get its way in this domain?" If no, that domain proves the alternative centre constrains.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_02_010', difficulty: 'standard',
          question: 'India\'s response to the disintegration of the Soviet Union (1991) refers to the.',
          hint: 'If unclear on the 1971 treaty\'s content, revisit Class 11 History node.',
          misconception: 'Students think India "switched sides" from the Soviet bloc to the US bloc after 1991.',
          parts: [
                { id: 'a', prompt: 'In which year did India sign the Treaty of Friendship and Cooperation with the Russian Federation, replacing the 1971 Indo-Soviet Treaty?', answer: '1993',
                  options: ['1993', 'socialist orientation', 'switched sides', 'India "switched sides" from the Soviet bloc to the US bloc after 1991'],
                  hint: 'If unclear on the 1971 treaty\'s content, revisit Class 11 History node c11_hist_cbse_12_055 (Wars.',
                  misconception: 'Students think India "switched sides" from the Soviet bloc to the US bloc after 1991.' },
                { id: 'b', prompt: 'Why did India continue to rely on Russian defense equipment after 1991 despite the availability of Western alternatives?', answer: 'Three interlocking reasons: (1) Compatibility',
                  options: ['Three interlocking reasons: (1) Compatibility', 'switched sides', 'India "switched sides" from the Soviet bloc to the US bloc after 1991'],
                  hint: 'If unclear on the 1971 treaty\'s content, revisit Class 11 History node c11_hist_cbse_12_055 (Wars.',
                  misconception: 'Students think India "switched sides" from the Soviet bloc to the US bloc after 1991.' },
                { id: 'c', prompt: 'How did the simultaneous occurrence of the 1991 Balance of Payments crisis and the Soviet disintegration influence India\'s "Look East" policy?', answer: 'The dual crisis forced India to seek new markets, capital, and technology',
                  options: ['The dual crisis forced India to seek new markets, capital, and technology', 'Look East', 'switched sides', 'India "switched sides" from the Soviet bloc to the US bloc after 1991'],
                  hint: 'If unclear on the 1971 treaty\'s content, revisit Class 11 History node c11_hist_cbse_12_055 (Wars.',
                  misconception: 'Students think India "switched sides" from the Soviet bloc to the US bloc after 1991.' },
                { id: 'd', prompt: 'Compare India\'s engagement with Central Asian republics (1992-1995) with its engagement with Russia in the same period.', answer: 'With Russia: high-level summits, defense treaties, nuclear cooperation',
                  options: ['With Russia: high-level summits, defense treaties, nuclear cooperation', 'equal engagement', 'switched sides', 'India "switched sides" from the Soviet bloc to the US bloc after 1991'],
                  hint: 'If unclear on the 1971 treaty\'s content, revisit Class 11 History node c11_hist_cbse_12_055 (Wars.',
                  misconception: 'Students think India "switched sides" from the Soviet bloc to the US bloc after 1991.' }
          ],
            remediations: { 'india-switched-sides-from-the': { steps: ['If the student still believes India "abandoned Russia for the US," assign this 3-step remediation: (1) Re-read the 1993.', '(2) Create a timeline 1991-2020 with three columns: Russia-India, US-India, Multilateral (RIC/BRICS/SCO) — plot 15 key.', '(3) Re-attempt Diagnostic Question 5 with the timeline as evidence.', 'If still stuck, revisit c12_ps_cbse_02_006 (Consequences of Soviet Disintegration) to grasp the structural constraints.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
