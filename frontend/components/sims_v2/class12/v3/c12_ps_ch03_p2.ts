import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch03_p2: SimDef = {
    id: 'v3_c12_ps_ch03_p2',
    title: 'US Hegemony in World Politics · Part 2/2',
    subtitle: 'The superpower that asked permission first',
    classLevel: 12, subject: 'political_science', topic: 'US Hegemony in World Politics · Part 2/2',
    chapters: ['c12_ps_ch03'],
    nodeIds: ['c12_ps_cbse_03_007', 'c12_ps_cbse_03_008', 'c12_ps_cbse_03_009', 'c12_ps_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Geopolitical analyst', intro: 'The first televised war showed missiles hitting targets live — and a hegemon that still wanted the UN\'s signature.', goal: 'Analyse the First Gulf War — UN legitimation, coalition-building and the display of unipolar military dominance.' },
    discovery: {
        question: 'In 1991 a hegemon had unmatched force — yet still queued at the UN for Resolution 678 before striking Iraq. Why bother?',
        options: ['Legitimacy multiplies power — UN cover built a 34-nation coalition including Arab states and showed hegemony as rule-shaping, not just force', 'The UN legally required it — force without a mandate is void', 'US forces were overstretched — allies supplied the missing troops', 'Coalitions are cheap — partners pay for the privilege of joining'],
        answer: 'Legitimacy multiplies power — UN cover built a 34-nation coalition including Arab states and showed hegemony as rule-shaping, not just force',
        hook: 'Don\'t merge 1991 with 2003 — the first had a UN mandate and broad Arab participation; the second ran on a thin \'coalition of the willing\' against allied protest. And it wasn\'t just oil: the US restored Kuwait\'s sovereignty and left — collective security, not seizure, was the public logic.',
    },
    teaching: [
        { title: 'Hegemony as Soft Power: Cultural and Ideological Influence', text: 'Hegemony as soft power refers to the ability of a dominant state (hegemon) to shape the preferences, values, and aspirations of other states and societies through cultural attraction, ideological.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read the unipolar moment: connect precision weapons and live TV war to a revolution in military affairs, then weigh what UN authorization bought that unilateral force couldn\'t.',
        labels: ['Hegemony as Soft Power', 'Constraints on US Hegemony', 'Unipolarity, Bandwagoning and Anti-Hegemonic', 'India\'s Relationship with US'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_03_007', title: 'Hegemony as Soft Power: Cultural and Ideological Influence',
          caseStudy: { intro: 'Imagine you\'re scrolling through Instagram and see a reel of teenagers in Tokyo, Mumbai, and São Paulo all doing the same dance challenge to an American pop.',
            decisions: [{ prompt: 'Define "soft power" as conceptualized by Joseph Nye and identify its three primary sources according to his framework.', options: [
                { text: 'Correct answer: Soft power is the ability to affect others through attraction and', outcome: 'Correct answer: Soft power is the ability to affect others through attraction and persuasion rather.' },
                { text: 'soft power means cultural exports only', outcome: 'Not quite — Students often think "soft power = cultural imperialism" or "soft power = propaganda." The precise.', reveals: 'soft-power-cultural-imperialism-or' },
                { text: 'soft power is propaganda', outcome: 'Not quite — Students often think "soft power = cultural imperialism" or "soft power = propaganda." The precise.', reveals: 'soft-power-cultural-imperialism-or' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_03_008', title: 'Constraints on US Hegemony: Public Opinion, Institutions and NATO',
          caseStudy: { intro: 'Imagine you\'re watching a news debate about whether the US should intervene militarily in a foreign crisis.',
            decisions: [{ prompt: 'What are the three specific constraints on US hegemony discussed in this node, and which one operates primarily through the requirement.', options: [
                { text: 'The three constraints are: (1) domestic public opinion, (2) US institutional checks', outcome: 'The three constraints are: (1) domestic public opinion, (2) US institutional checks (Congress.' },
                { text: 'UN Security Council', outcome: 'Not quite — Students often think "constraints on hegemony" means the US is weak or declining.', reveals: 'constraints-on-hegemony-means-the' },
                { text: 'economic interdependence', outcome: 'Not quite — Students often think "constraints on hegemony" means the US is weak or declining.', reveals: 'constraints-on-hegemony-means-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_03_009', title: 'Unipolarity, Bandwagoning and Anti-Hegemonic Strategies',
          caseStudy: { intro: 'Imagine you are a foreign policy advisor to a mid-sized country in 1995, just after the Soviet collapse. The US is the only superpower.',
            decisions: [{ prompt: 'Define unipolarity in the context of the post-Cold War international system and name the single state that exemplifies it.', options: [
                { text: 'Unipolarity is a system where one state holds a preponderance of power capabilities', outcome: 'Unipolarity is a system where one state holds a preponderance of power capabilities (military.' },
                { text: 'unipolarity means the US controls everything', outcome: 'Not quite — Students often think bandwagoning and balancing are mutually exclusive permanent choices.', reveals: 'bandwagoning-and-balancing-are-mutually' },
                { text: 'bandwagoning and balancing are mutually exclusive permanent choices', outcome: 'Not quite — Students often think bandwagoning and balancing are mutually exclusive permanent choices.', reveals: 'bandwagoning-and-balancing-are-mutually' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_03_010', title: 'India\'s Relationship with US Hegemony after the Cold War',
          caseStudy: { intro: 'Imagine you are reading a news headline: "India, US sign BECA agreement for geospatial intelligence sharing" — this is a concrete manifestation of.',
            decisions: [{ prompt: 'What is the term used in the NCERT textbook to describe India\'s strategy of engaging with the US on specific issues (like trade.', options: [
                { text: 'The term is "strategic autonomy" (sometimes phrased as "multi-alignment" or "issue-based', outcome: 'The term is "strategic autonomy" (sometimes phrased as "multi-alignment" or "issue-based.' },
                { text: 'bandwagoning', outcome: 'Not quite — Students often believe India has "abandoned non-alignment" and become a "US ally" because of the.', reveals: 'india-has-abandoned-non-alignment' },
                { text: 'balancing', outcome: 'Not quite — Students often believe India has "abandoned non-alignment" and become a "US ally" because of the.', reveals: 'india-has-abandoned-non-alignment' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A quiz-bowl team is asked why the US answered 9/11 with a \'war\' instead of treating al-Qaeda as criminals to be arrested and tried.',
            decisions: [{ prompt: 'What did the war framing unlock?', options: [
                { text: 'Laws of armed conflict — the AUMF let the President use \'all necessary force,\' suspects could be held as enemy combatants without trial, force could cross borders without the host\'s consent, and NATO\'s Article 5 was invoked for the first time; a criminal frame would have boxed all of that in.', outcome: 'The chapter\'s analysis: \'war\' was a legal-strategic choice, not a metaphor — it expanded executive power and re-targeted hegemony from states to networks.' },
                { text: 'Nothing functional — \'war on terror\' was just rhetoric for the public.', outcome: 'The label carried powers — detention without trial, cross-border operations, collective-defence invocation; rhetoric doesn\'t authorise force, the war frame did.', reveals: 'war-was-just-words' },
                { text: 'A UN mandate forced the war framing — the US had no choice in the matter.', outcome: 'The legal engine was domestic — the AUMF, not a UN resolution; UN endorsement of self-defence trailed the military action, marking the shift to coalitions the US assembled itself.', reveals: 'un-chose-the-frame' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_03_010', title: 'You made it',
          caseStudy: { intro: 'You can now see 1991 as hegemony exercised through institutions — and the sharp contrast when that legitimacy was skipped in 2003.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_03_007', difficulty: 'standard',
          question: 'Hegemony as soft power refers to the ability of a dominant state (hegemon).',
          hint: 'Revisit c12_ps_cbse_03_005 (hard power) and c12_ps_cbse_03_006 (structural power).',
          misconception: 'Students often think "soft power = cultural imperialism" or "soft power = propaganda." The precise error: they assume.',
          parts: [
                { id: 'a', prompt: 'Explain why the global popularity of Hollywood films, McDonald\'s, and blue jeans constitutes soft power for the United States, but the mere presence of.', answer: 'Correct answer: Hollywood, McDonald\'s, and blue jeans represent soft power',
                  options: ['Correct answer: Hollywood, McDonald\'s, and blue jeans represent soft power', 'both are American influence so both are soft power', 'soft power = cultural imperialism', 'soft power = propaganda'],
                  hint: 'Revisit c12_ps_cbse_03_005 (hard power) and c12_ps_cbse_03_006 (structural power) — create.',
                  misconception: 'Students often think "soft power = cultural imperialism" or "soft power = propaganda." The precise error: they assume US cultural dominance.' },
                { id: 'b', prompt: 'A country adopts US-style judicial review and constitutional rights protections after studying American constitutional law in its universities.', answer: 'Correct answer: This exemplifies the "political values" pillar',
                  options: ['Correct answer: This exemplifies the "political values" pillar', 'culture', 'foreign policy', 'soft power = cultural imperialism'],
                  hint: 'Revisit c12_ps_cbse_03_005 (hard power) and c12_ps_cbse_03_006 (structural power) — create.',
                  misconception: 'Students often think "soft power = cultural imperialism" or "soft power = propaganda." The precise error: they assume US cultural dominance.' },
                { id: 'c', prompt: 'Compare and contrast how "structural power" (Node c12_ps_cbse_03_006) and "soft power" (this node) enable the US to shape global outcomes.', answer: 'Correct answer: Structural power operates through *institutional rules*',
                  options: ['Correct answer: Structural power operates through *institutional rules*', 'you must follow these rules', 'you want to be like us', 'both are about US dominance'],
                  hint: 'Revisit c12_ps_cbse_03_005 (hard power) and c12_ps_cbse_03_006 (structural power) — create.',
                  misconception: 'Students often think "soft power = cultural imperialism" or "soft power = propaganda." The precise error: they assume US cultural dominance.' }
          ],
            remediations: { 'soft-power-cultural-imperialism-or': { steps: ['If the student conflates soft power with propaganda/cultural imperialism: Step 1 — Revisit Node c11_ps_cbse_01_001.', 'Step 2 — Read Nye\'s original 1990 article "Soft Power" (Foreign Policy) focusing on the "attraction vs.', 'Step 3 — Analyze a counter-example: Why did the US-funded Radio Free Europe have limited impact in the USSR compared.', 'Step 4 — Re-attempt Diagnostic Question 2 with this lens.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "soft power = cultural imperialism" or "soft power = propaganda." The precise error: they assume.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "US soft power has declined irreversibly in the 21st century due to the Iraq War, Guantanamo, and the rise of non-Western cultural.', answer: 'Correct evaluation: The claim is partially valid but overstated',
                  options: ['Correct evaluation: The claim is partially valid but overstated', 'soft power = cultural imperialism', 'soft power = propaganda', '"soft power = cultural imperialism" or "soft power = propaganda'],
                  hint: 'Revisit c12_ps_cbse_03_005 (hard power) and c12_ps_cbse_03_006 (structural power) — create.',
                  misconception: 'Students often think "soft power = cultural imperialism" or "soft power = propaganda." The precise error: they assume US cultural dominance.' }
          ],
            remediations: { 'soft-power-cultural-imperialism-or': { steps: ['If the student conflates soft power with propaganda/cultural imperialism: Step 1 — Revisit Node c11_ps_cbse_01_001.', 'Step 2 — Read Nye\'s original 1990 article "Soft Power" (Foreign Policy) focusing on the "attraction vs.', 'Step 3 — Analyze a counter-example: Why did the US-funded Radio Free Europe have limited impact in the USSR compared.', 'Step 4 — Re-attempt Diagnostic Question 2 with this lens.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_03_008', difficulty: 'standard',
          question: 'Constraints on US hegemony refer to the internal and external limitations that.',
          hint: 'Revisit c11_ps_cbse_13_001 (executive branch) and c11_ps_cbse_13_002 (presidential.',
          misconception: 'Students often think "constraints on hegemony" means the US is weak or declining.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Constraints on US hegemony refer to the internal and external limitations that restrict',
                  options: ['Constraints on US hegemony refer to the internal and external limitations that restrict', 'The First Gulf War (1991) was a US-led coalition military operation (Operation Desert', 'The 9/11 attacks were a series of four coordinated terrorist attacks by the Islamist', 'The US invasion of Afghanistan (Operation Enduring Freedom, October 2001) was a military'],
                  hint: 'Revisit c11_ps_cbse_13_001 (executive branch) and c11_ps_cbse_13_002 (presidential.',
                  misconception: 'Students often think "constraints on hegemony" means the US is weak or declining.' }
          ],
            remediations: { 'constraints-on-hegemony-means-the': { steps: ['Re-read c12_ps_cbse_03_005 (hard power) to confirm US military dominance remains unmatched.', 'Compare 1991 Gulf War (broad coalition, UN mandate, congressional authorization, public support) vs.', 'Complete diagnostic question 5 again, this time explicitly listing how each constraint operated differently in the two.', 'Re-attempt diagnostic question 6 with the 1991/2003 comparison as framework.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_03_009', difficulty: 'standard',
          question: 'Unipolarity refers to an international system where a single state (the United.',
          hint: 'Revisit the distinction between polarity (distribution of capabilities) and hegemony.',
          misconception: 'Students often think bandwagoning and balancing are mutually exclusive permanent choices.',
          parts: [
                { id: 'a', prompt: 'Explain why a weaker state might choose bandwagoning over balancing against a unipolar hegemon, using the concepts of threat perception and opportunity costs.', answer: 'Bandwagoning occurs when the hegemon is perceived as benign or when the costs of',
                  options: ['Bandwagoning occurs when the hegemon is perceived as benign or when the costs of', 'states bandwagon', 'bandwagoning and balancing are mutually exclusive permanent choices'],
                  hint: 'Revisit the distinction between polarity (distribution of capabilities) and hegemony (exercise.',
                  misconception: 'Students often think bandwagoning and balancing are mutually exclusive permanent choices.' }
          ],
            remediations: { 'bandwagoning-and-balancing-are-mutually': { steps: ['If a student conflates bandwagoning with balancing, have them re-read the balance-of-threat vs balance-of-power.', 'Then assign a 2x2 matrix exercise: list four countries (Japan, China, EU, India) and map their security and economic.', 'This visualizes mixed strategies.', 'Re-diagnose with Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_03_010', difficulty: 'standard',
          question: 'India\'s relationship with US hegemony after the Cold War refers to the evolving.',
          hint: 'Revisit node c12_ps_cbse_03_009 and the NCERT box on "Strategies of Hegemony" — focus.',
          misconception: 'Students often believe India has "abandoned non-alignment" and become a "US ally" because of the growing defence ties.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'India\'s relationship with US hegemony after the Cold War refers to the evolving',
                  options: ['India\'s relationship with US hegemony after the Cold War refers to the evolving', 'The First Gulf War (1991) was a US-led coalition military operation (Operation Desert', 'The 9/11 attacks were a series of four coordinated terrorist attacks by the Islamist', 'The US invasion of Afghanistan (Operation Enduring Freedom, October 2001) was a military'],
                  hint: 'Revisit node c12_ps_cbse_03_009 and the NCERT box on "Strategies of Hegemony" — focus on the.',
                  misconception: 'Students often believe India has "abandoned non-alignment" and become a "US ally" because of the growing defence ties and Quad membership.' }
          ],
            remediations: { 'india-has-abandoned-non-alignment': { steps: ['If a student holds this misconception, assign a three-step remediation: (1) Re-read the NCERT sections on "Constraints.', '(2) Create a two-column table: Column A = "Actions that look like alignment" (e.g., COMCASA, Quad), Column B = "Actions.', '(3) Write a 100-word paragraph explaining why "issue-based convergence" is not "alliance" using the definition.', 'Re-test with Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
