import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch03_p1: SimDef = {
    id: 'v3_c12_ps_ch03_p1',
    title: 'US Hegemony in World Politics · Part 1/2',
    subtitle: 'The superpower that asked permission first',
    classLevel: 12, subject: 'political_science', topic: 'US Hegemony in World Politics · Part 1/2',
    chapters: ['c12_ps_ch03'],
    nodeIds: ['c12_ps_cbse_03_001', 'c12_ps_cbse_03_002', 'c12_ps_cbse_03_003', 'c12_ps_cbse_03_004', 'c12_ps_cbse_03_005', 'c12_ps_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Geopolitical analyst', intro: 'The first televised war showed missiles hitting targets live — and a hegemon that still wanted the UN\'s signature.', goal: 'Analyse the First Gulf War — UN legitimation, coalition-building and the display of unipolar military dominance.' },
    discovery: {
        question: 'In 1991 a hegemon had unmatched force — yet still queued at the UN for Resolution 678 before striking Iraq. Why bother?',
        options: ['Legitimacy multiplies power — UN cover built a 34-nation coalition including Arab states and showed hegemony as rule-shaping, not just force', 'The UN legally required it — force without a mandate is void', 'US forces were overstretched — allies supplied the missing troops', 'Coalitions are cheap — partners pay for the privilege of joining'],
        answer: 'Legitimacy multiplies power — UN cover built a 34-nation coalition including Arab states and showed hegemony as rule-shaping, not just force',
        hook: 'Don\'t merge 1991 with 2003 — the first had a UN mandate and broad Arab participation; the second ran on a thin \'coalition of the willing\' against allied protest. And it wasn\'t just oil: the US restored Kuwait\'s sovereignty and left — collective security, not seizure, was the public logic.',
    },
    teaching: [
        { title: 'The First Gulf War (1991) and Demonstration of US Dominance', text: 'The First Gulf War (1991) was a US-led coalition military operation (Operation Desert Storm) authorized by the UN Security Council to expel Iraqi forces from Kuwait, demonstrating the United States\'.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_03_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read the unipolar moment: connect precision weapons and live TV war to a revolution in military affairs, then weigh what UN authorization bought that unilateral force couldn\'t.',
        labels: ['The First Gulf War', '9/11 Attacks and', 'US Invasion of Afghanistan', 'US Invasion of Iraq', 'Hegemony as Hard Power', 'Hegemony as Structural Power'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_03_002', title: '9/11 Attacks and the Launch of the Global War on Terror',
          caseStudy: { intro: 'Imagine you\'re watching a live news feed on September 11, 2001 — planes hitting the Twin Towers, the Pentagon attacked, a field in Pennsylvania.',
            decisions: [{ prompt: 'What was the immediate legal basis under US domestic law for the Global War on Terror, passed by Congress on September 14, 2001?', options: [
                { text: 'The Authorization for Use of Military Force (AUMF), Public Law 107-40, granted the', outcome: 'The Authorization for Use of Military Force (AUMF), Public Law 107-40, granted the President.' },
                { text: 'Declaration of War', outcome: 'Not quite — Students often think the "War on Terror" was declared *against* a country (like Afghanistan.', reveals: 'the-war-on-terror-was' },
                { text: 'UN Security Council Resolution', outcome: 'Not quite — Students often think the "War on Terror" was declared *against* a country (like Afghanistan.', reveals: 'the-war-on-terror-was' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_03_003', title: 'US Invasion of Afghanistan and the Taliban Question',
          caseStudy: { intro: 'Imagine you\'re watching a news clip from August 2021: chaotic scenes at Kabul airport as the Taliban retake control after 20 years of US presence.',
            decisions: [{ prompt: 'What was the immediate legal justification the United States invoked under international law for the invasion of Afghanistan in October.', options: [
                { text: 'The US invoked Article 51 of the UN Charter (right to individual and collective', outcome: 'The US invoked Article 51 of the UN Charter (right to individual and collective self-defense) after.' },
                { text: 'UN Security Council resolution authorizing force', outcome: 'Not quite — Students often believe the US "lost militarily" in Afghanistan — that the Taliban defeated US/NATO.', reveals: 'the-us-lost-militarily-in' },
                { text: 'lost militarily', outcome: 'Not quite — Students often believe the US "lost militarily" in Afghanistan — that the Taliban defeated US/NATO.', reveals: 'the-us-lost-militarily-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_03_004', title: 'US Invasion of Iraq (2003) and Its Justifications',
          caseStudy: { intro: 'Imagine you are a UN weapons inspector in Baghdad in January 2003: you have found no WMDs after weeks of unrestricted access, yet the US President declares war.',
            decisions: [{ prompt: '**REMEMBER:** List the three primary public justifications the George W.', options: [
                { text: '**Correct answer:** (1) Iraq\'s possession and active development of Weapons of Mass', outcome: '**Correct answer:** (1) Iraq\'s possession and active development of Weapons of Mass Destruction.' },
                { text: 'settling scores with Saddam', outcome: 'Not quite — **Misconception:** "The US invaded Iraq *because* of 9/11 — Saddam Hussein was directly involved.', reveals: 'misconception-the-us-invaded-iraq' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_03_005', title: 'Hegemony as Hard Power: Military Dominance and Technology',
          caseStudy: { intro: 'Imagine you\'re watching a news clip of a US drone strike hitting a moving vehicle in a remote valley — no pilot on board, guided by satellites thousands.',
            decisions: [{ prompt: 'What is the single most cited quantitative indicator of US hard power dominance in the post-Cold War era, and what approximate multiple.', options: [
                { text: 'The indicator is annual military expenditure', outcome: 'The indicator is annual military expenditure; the US spends roughly 3× more than China (the #2.' },
                { text: 'number of aircraft carriers', outcome: 'Not quite — Students equate "hard power" with "number of tanks, nukes, or soldiers" and therefore claim "US.', reveals: 'students-equate-hard-power-with' },
                { text: 'nuclear warhead count', outcome: 'Not quite — Students equate "hard power" with "number of tanks, nukes, or soldiers" and therefore claim "US.', reveals: 'students-equate-hard-power-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_03_006', title: 'Hegemony as Structural Power: Rules and Institutions of Global Economy',
          caseStudy: { intro: 'Imagine you\'re playing a board game where one player wrote the rulebook, designed the board, and controls the bank — but insists the game is "fair" because.',
            decisions: [{ prompt: 'What are the three original Bretton Woods institutions established in 1944, and which one was added later to complete the global economic.', options: [
                { text: 'The three original Bretton Woods institutions are the International Monetary Fund (IMF),', outcome: 'The three original Bretton Woods institutions are the International Monetary Fund (IMF), the.' },
                { text: 'controls', outcome: 'Not quite — Students think structural power means the US "controls" the IMF/WTO like a puppet master directing.', reveals: 'structural-power-means-the-us' },
                { text: 'the UN or WTO as original', outcome: 'Not quite — Students think structural power means the US "controls" the IMF/WTO like a puppet master directing.', reveals: 'structural-power-means-the-us' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A quiz-bowl team is asked why the US answered 9/11 with a \'war\' instead of treating al-Qaeda as criminals to be arrested and tried.',
            decisions: [{ prompt: 'What did the war framing unlock?', options: [
                { text: 'Laws of armed conflict — the AUMF let the President use \'all necessary force,\' suspects could be held as enemy combatants without trial, force could cross borders without the host\'s consent, and NATO\'s Article 5 was invoked for the first time; a criminal frame would have boxed all of that in.', outcome: 'The chapter\'s analysis: \'war\' was a legal-strategic choice, not a metaphor — it expanded executive power and re-targeted hegemony from states to networks.' },
                { text: 'Nothing functional — \'war on terror\' was just rhetoric for the public.', outcome: 'The label carried powers — detention without trial, cross-border operations, collective-defence invocation; rhetoric doesn\'t authorise force, the war frame did.', reveals: 'war-was-just-words' },
                { text: 'A UN mandate forced the war framing — the US had no choice in the matter.', outcome: 'The legal engine was domestic — the AUMF, not a UN resolution; UN endorsement of self-defence trailed the military action, marking the shift to coalitions the US assembled itself.', reveals: 'un-chose-the-frame' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now see 1991 as hegemony exercised through institutions — and the sharp contrast when that legitimacy was skipped in 2003.',
            decisions: [{ prompt: 'What comes next? US Hegemony in World Politics · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — US Hegemony in World Politics · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_03_001', difficulty: 'standard',
          question: 'The First Gulf War (1991) was a US-led coalition military operation (Operation.',
          hint: 'Review UN Charter Articles 39, 42, 51 and the Class 11 node c11_ps_cbse_09_011 on.',
          misconception: 'Students often conflate the 1991 Gulf War with the 2003 Iraq War, assuming both were unilateral US invasions based.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The First Gulf War (1991) was a US-led coalition military operation (Operation Desert',
                  options: ['The First Gulf War (1991) was a US-led coalition military operation (Operation Desert', 'The 9/11 attacks were a series of four coordinated terrorist attacks by the Islamist', 'The US invasion of Afghanistan (Operation Enduring Freedom, October 2001) was a military', 'The 2003 US invasion of Iraq (Operation Iraqi Freedom) was a unilateral military'],
                  hint: 'Review UN Charter Articles 39, 42, 51 and the Class 11 node c11_ps_cbse_09_011 on UN collective.',
                  misconception: 'Students often conflate the 1991 Gulf War with the 2003 Iraq War, assuming both were unilateral US invasions based on false WMD claims.' }
          ],
            remediations: { 'students-often-conflate-the-1991': { steps: ['If the student conflates the two wars, have them create a two-column comparison table: (1) Trigger, (2) UN Resolutions.', 'Use the NCERT Class 12 text (Contemporary World Politics, Chapter 3) and the UN Security Council resolutions 660, 678.', 'Then ask them to identify which war the textbook cites as the "demonstration of US dominance" in the post-Cold War.', 'Re-diagnose with Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_03_002', difficulty: 'standard',
          question: 'The 9/11 attacks were a series of four coordinated terrorist attacks by the.',
          hint: 'Revisit c11_ps_cbse_09_005 (Just War Theory) and c11_ps_cbse_09_011 (UN Collective.',
          misconception: 'Students often think the "War on Terror" was declared *against* a country (like Afghanistan or Iraq) — they conflate.',
          parts: [
                { id: 'a', prompt: 'The Taliban regime in Afghanistan was not directly involved in planning 9/11. On what basis did the US justify military action against it?', answer: 'The US demanded the Taliban hand over al-Qaeda leaders and close terrorist camps',
                  options: ['The US demanded the Taliban hand over al-Qaeda leaders and close terrorist camps', 'Taliban attacked the US', 'War on Terror'],
                  hint: 'Revisit c11_ps_cbse_09_005 (Just War Theory) and c11_ps_cbse_09_011 (UN Collective Security).',
                  misconception: 'Students often think the "War on Terror" was declared *against* a country (like Afghanistan or Iraq) — they conflate the *target*.' }
          ],
            remediations: { 'the-war-on-terror-was': { steps: ['If the student conflates the War on Terror with the Afghanistan/Iraq wars: (1) Re-read the AUMF text (Public Law.', '(2) Compare with the 1991 Gulf War authorization (UNSCR 678) which explicitly targeted Iraq.', '(3) Watch the 2001 Bush address to Congress: "Our war on terror begins with al-Qaeda, but it does not end there." (4).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the "War on Terror" was declared *against* a country (like Afghanistan or Iraq) — they conflate.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Global War on Terror strengthened US hegemony by demonstrating its unmatched military reach and ability to set the global security.', answer: 'Partially true but incomplete',
                  options: ['Partially true but incomplete', 'War on Terror'],
                  hint: 'Revisit c11_ps_cbse_09_005 (Just War Theory) and c11_ps_cbse_09_011 (UN Collective Security).',
                  misconception: 'Students often think the "War on Terror" was declared *against* a country (like Afghanistan or Iraq) — they conflate the *target*.' }
          ],
            remediations: { 'the-war-on-terror-was': { steps: ['If the student conflates the War on Terror with the Afghanistan/Iraq wars: (1) Re-read the AUMF text (Public Law.', '(2) Compare with the 1991 Gulf War authorization (UNSCR 678) which explicitly targeted Iraq.', '(3) Watch the 2001 Bush address to Congress: "Our war on terror begins with al-Qaeda, but it does not end there." (4).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_03_003', difficulty: 'standard',
          question: 'The US invasion of Afghanistan (Operation Enduring Freedom, October 2001) was.',
          hint: 'If unclear on the link between 9/11 and Afghanistan, review c12_ps_cbse_03_002: the.',
          misconception: 'Students often believe the US "lost militarily" in Afghanistan — that the Taliban defeated US/NATO forces on the.',
          parts: [
                { id: 'a', prompt: 'What was the immediate legal justification the United States invoked under international law for the invasion of Afghanistan in October 2001?', answer: 'The US invoked Article 51 of the UN Charter (right to individual and collective',
                  options: ['The US invoked Article 51 of the UN Charter (right to individual and collective', 'UN Security Council resolution authorizing force', 'lost militarily'],
                  hint: 'If unclear on the link between 9/11 and Afghanistan, review c12_ps_cbse_03_002: the Taliban\'s.',
                  misconception: 'Students often believe the US "lost militarily" in Afghanistan — that the Taliban defeated US/NATO forces on the battlefield.' },
                { id: 'b', prompt: 'Why did the Bonn Agreement (December 2001) exclude the Taliban from Afghanistan\'s post-conflict political arrangement, and what long-term consequence did this.', answer: 'The Taliban were excluded',
                  options: ['The Taliban were excluded', 'Taliban were terrorists', 'lost militarily'],
                  hint: 'If unclear on the link between 9/11 and Afghanistan, review c12_ps_cbse_03_002: the Taliban\'s.',
                  misconception: 'Students often believe the US "lost militarily" in Afghanistan — that the Taliban defeated US/NATO forces on the battlefield.' },
                { id: 'c', prompt: 'Compare the US approach in Afghanistan (2001–2021) with the Soviet approach (1979–1989).', answer: 'Similarities: both installed a Kabul government lacking broad legitimacy',
                  options: ['Similarities: both installed a Kabul government lacking broad legitimacy', 'US succeeded where USSR failed', 'lost militarily'],
                  hint: 'If unclear on the link between 9/11 and Afghanistan, review c12_ps_cbse_03_002: the Taliban\'s.',
                  misconception: 'Students often believe the US "lost militarily" in Afghanistan — that the Taliban defeated US/NATO forces on the battlefield.' }
          ],
            remediations: { 'the-us-lost-militarily-in': { steps: ['If the student holds the "military defeat" misconception: (1) Revisit c12_ps_cbse_03_002 (9/11 and Global War.', '(2) Analyze the 2014 transition from combat to "Resolute Support" — if US was losing militarily, why shift to training?', '(3) Read SIGAR (Special Inspector General for Afghanistan Reconstruction) reports on ANSF collapse in 2021 — they cite.', 'Re-diagnostic: "Explain why the Afghan army collapsed in 11 days despite 20 years of US training."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_03_004', difficulty: 'standard',
          question: 'The 2003 US invasion of Iraq (Operation Iraqi Freedom) was a unilateral.',
          hint: 'If stuck on *legal authority*, revisit **UN Charter Articles 39, 42, 51** and.',
          misconception: '**Misconception:** "The US invaded Iraq *because* of 9/11 — Saddam Hussein was directly involved in the attacks.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The 2003 US invasion of Iraq (Operation Iraqi Freedom) was a unilateral military',
                  options: ['The 2003 US invasion of Iraq (Operation Iraqi Freedom) was a unilateral military', 'The First Gulf War (1991) was a US-led coalition military operation (Operation Desert', 'The 9/11 attacks were a series of four coordinated terrorist attacks by the Islamist', 'The US invasion of Afghanistan (Operation Enduring Freedom, October 2001) was a military'],
                  hint: 'If stuck on *legal authority*, revisit **UN Charter Articles 39, 42, 51** and **Resolution 678.',
                  misconception: '**Misconception:** "The US invaded Iraq *because* of 9/11 — Saddam Hussein was directly involved in the attacks." **Reality:** The 9/11.' }
          ],
            remediations: { 'misconception-the-us-invaded-iraq': { steps: ['** Re-read the **9/11 Commission Report Executive Summary** (specifically "No collaborative relationship" finding) and.', '** Watch the **2003 Colin Powell UN presentation** (15 min clip) and annotate: which claims were *intelligence.', '** Complete the **Diagnostic Question 3** again, this time explicitly citing the Caroline criteria definitions from.', '** Discuss with a peer: "If the US had found WMDs but *no* Al-Qaeda link, would the war have been legal under the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_03_005', difficulty: 'standard',
          question: 'Hegemony as Hard Power refers to the dimension of US dominance rooted.',
          hint: 'Re-read NCERT Ch.3 sections "The First Gulf War" and "9/11 and Global War on Terror".',
          misconception: 'Students equate "hard power" with "number of tanks, nukes, or soldiers" and therefore claim "US hard power is declining.',
          parts: [
                { id: 'a', prompt: 'What is the single most cited quantitative indicator of US hard power dominance in the post-Cold War era, and what approximate multiple does it hold over the.', answer: 'The indicator is annual military expenditure',
                  options: ['The indicator is annual military expenditure', 'number of aircraft carriers', 'nuclear warhead count'],
                  hint: 'Re-read NCERT Ch.3 sections "The First Gulf War" and "9/11 and Global War on Terror"; list the.',
                  misconception: 'Students equate "hard power" with "number of tanks, nukes, or soldiers" and therefore claim "US hard power is declining because China has.' },
                { id: 'b', prompt: 'Explain why the 1991 Gulf War is considered the "coming-out party" for the Revolution in Military Affairs (RMA), linking at least two specific technologies.', answer: 'The Gulf War showcased RMA',
                  options: ['The Gulf War showcased RMA', 'stealth fighters', 'smart bombs'],
                  hint: 'Re-read NCERT Ch.3 sections "The First Gulf War" and "9/11 and Global War on Terror"; list the.',
                  misconception: 'Students equate "hard power" with "number of tanks, nukes, or soldiers" and therefore claim "US hard power is declining because China has.' }
          ],
            remediations: { 'students-equate-hard-power-with': { steps: ['If a student cannot distinguish platform-count from systemic capability: (1) Revisit c12_ps_cbse_03_001 (Gulf War).', '(2) Draw a "kill chain" diagram for 1991 vs.', '2020s — observe how the chain compresses from hours to minutes.', '(3) Read the "Revolution in Military Affairs" box in NCERT (Ch.3) and identify the three pillars: sensors, shooters.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_03_006', difficulty: 'standard',
          question: 'Hegemony as structural power refers to the ability of a dominant state (the.',
          hint: 'Review c10_hist_cbse_03_005 (Bretton Woods) for the 1944 design, and c11_ps_cbse_14_001.',
          misconception: 'Students think structural power means the US "controls" the IMF/WTO like a puppet master directing every decision.',
          parts: [
                { id: 'a', prompt: 'Why does the US have de facto veto power in the IMF and World Bank, and how does this reflect structural power rather than just hard power?', answer: 'The US holds ~16.5% of IMF voting shares and ~15.5% in the World Bank',
                  options: ['The US holds ~16.5% of IMF voting shares and ~15.5% in the World Bank', 'US military pressure', 'controls'],
                  hint: 'Review c10_hist_cbse_03_005 (Bretton Woods) for the 1944 design, and c11_ps_cbse_14_001 for.',
                  misconception: 'Students think structural power means the US "controls" the IMF/WTO like a puppet master directing every decision.' }
          ],
            remediations: { 'structural-power-means-the-us': { steps: ['If the student conflates structural power with direct control: (1) Re-read the IMF Articles of Agreement, Article XII.', '(2) Compare with c12_ps_cbse_03_005 (Hard Power) — list 3 decisions where US military power failed but structural power.', '(3) Re-do Diagnostic Q3 focusing on *automaticity* of conditionality, not US phone calls.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
