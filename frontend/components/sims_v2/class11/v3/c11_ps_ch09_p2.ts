import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch09_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch09_p2: SimDef = {
    id: 'v3_c11_ps_ch09_p2',
    title: 'Peace · Part 2/2',
    subtitle: 'Tell the silence of peace from the silence of suppression.',
    classLevel: 11, subject: 'political_science', topic: 'Peace · Part 2/2',
    chapters: ['c11_ps_ch09'],
    nodeIds: ['c11_ps_cbse_09_007', 'c11_ps_cbse_09_008', 'c11_ps_cbse_09_009', 'c11_ps_cbse_09_010', 'c11_ps_cbse_09_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a peace researcher reading past the crime statistics', intro: 'No riots reported — yet the river dispute festers and the prisoners wait. Something important is missing from the headline.', goal: 'Distinguish negative from positive peace and identify structural violence beneath calm.' },
    discovery: {
        question: 'A state reports zero riots and zero homicides for a decade — has it achieved peace?',
        options: ['Only negative peace — the absence of violence; structural injustice like unresolved water disputes can keep positive peace unmet', 'Yes — no violence means peace', 'Yes — law and order is peace', 'Only if the police agree'],
        answer: 'Only negative peace — the absence of violence; structural injustice like unresolved water disputes can keep positive peace unmet',
        hook: '\'Negative\' isn\'t a moral grade — a ceasefire is negative peace and still essential; it just can\'t finish the job alone.',
    },
    teaching: [
        { title: 'Deterrence theory and the logic of nuclear weapons', text: 'Deterrence theory is a strategic doctrine positing that the possession of credible nuclear weapons and the demonstrated willingness to use them in retaliation prevents adversaries from initiating.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_09_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Diagnose a calm Punjab as negative or positive peace, then name the structural blocks that keep ceasefires from becoming justice.',
        labels: ['Deterrence theory and', 'Disarmament and arms control', 'Peace-building and post-conflict reconciliation', 'Human security vs state', 'UN and collective security'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_09_007', title: 'Deterrence theory and the logic of nuclear weapons',
          caseStudy: { intro: 'Imagine you\'re reading a news report about India\'s Agni-V missile test and Pakistan\'s response about "full spectrum deterrence" - both countries claim their.',
            decisions: [{ prompt: 'Define "Mutually Assured Destruction (MAD)" and state the two necessary conditions for it to function as a stable strategic equilibrium.', options: [
                { text: 'MAD is a strategic condition where two nuclear-armed adversaries each possess secure', outcome: 'MAD is a strategic condition where two nuclear-armed adversaries each possess secure second-strike.' },
                { text: 'MAD means both sides have lots of nukes', outcome: 'Not quite — Students often believe "deterrence works because leaders are rational" - treating rationality as.', reveals: 'deterrence-works-because-leaders-are' },
                { text: 'deterrence works', outcome: 'Not quite — Students often believe "deterrence works because leaders are rational" - treating rationality as.', reveals: 'deterrence-works-because-leaders-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_09_008', title: 'Disarmament and arms control: International efforts',
          caseStudy: { intro: 'Imagine you read a news headline: "North Korea conducts another missile test; UN Security Council condemns violation of resolutions." A Class 11 student might.',
            decisions: [{ prompt: 'What is the fundamental difference between disarmament and arms control in terms of their ultimate objective regarding weapon systems?', options: [
                { text: 'Disarmament aims at the reduction and eventual elimination of specific weapon categories', outcome: 'Disarmament aims at the reduction and eventual elimination of specific weapon categories or all.' },
                { text: 'they mean the same thing', outcome: 'Not quite — Students often believe that "arms control" and "disarmament" are synonyms, or that the NPT only.', reveals: 'arms-control-and-disarmament-are' },
                { text: 'arms control is just a step towards disarmament', outcome: 'Not quite — Students often believe that "arms control" and "disarmament" are synonyms, or that the NPT only.', reveals: 'arms-control-and-disarmament-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_09_009', title: 'Peace-building and post-conflict reconciliation',
          caseStudy: { intro: 'Imagine you are reading a news report about a region emerging from decades of insurgency — former combatants are surrendering weapons, victims are testifying.',
            decisions: [{ prompt: 'Define peace-building and distinguish it from peacekeeping and peacemaking using the UN\'s Brahimi Report framework.', options: [
                { text: 'Peace-building addresses root causes and builds sustainable peace through long-term', outcome: 'Peace-building addresses root causes and builds sustainable peace through long-term structural.' },
                { text: 'UN work', outcome: 'Not quite — Students believe peace-building = economic development packages (roads, schools, jobs) distributed.', reveals: 'peace-building-economic-development-packages' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_09_011', title: 'UN and collective security: Achievements and limitations',
          caseStudy: { intro: 'Imagine you see a news report: "UN Security Council fails to pass resolution on Syria due to Russian veto — civilians continue to suffer." Ask: Why does one.',
            decisions: [{ prompt: 'What are the two key articles in the UN Charter that authorize the Security Council to take enforcement action under collective security?', options: [
                { text: 'Article 39 (determination of threat to peace) and Article 42 (authorization of military', outcome: 'Article 39 (determination of threat to peace) and Article 42 (authorization of military.' },
                { text: 'collective security', outcome: 'Not quite — Students think "collective security" means the UN has its own standing army that fights wars.', reveals: 'collective-security-means-the-un' },
                { text: '"collective security" means the UN has its own standing army that fights wars', outcome: 'Not quite — Students think "collective security" means the UN has its own standing army that fights wars.', reveals: 'collective-security-means-the-un' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A peace-studies poster declares: \'Punjab after 1993 proves peace returned — no riots for decades.\' A teammate counters: \'Ceasefires are worthless — they\'re only negative peace, so they\'re not real peace at all.\'',
            decisions: [{ prompt: 'How does the negative/positive peace distinction resolve this?', options: [
                { text: 'Use Galtung\'s technical senses: the Punjab lull is negative peace — absence of direct violence — while unresolved river-water disputes, prisoners and stagnation keep structural violence alive, so \'calm\' isn\'t positive peace. But negative isn\'t \'bad\': a ceasefire is a necessary first step that must be DEEPENED into justice and institutions — absence of pathology first, presence of health next.', outcome: 'The poster gets honest: no-violence is the floor, not the building — and ceasefires are prerequisites to build on, not failures to dismiss.' },
                { text: 'Accept the calm-is-peace reading — no visible violence means peace achieved.', outcome: 'That\'s law-and-order mistaken for peace: positive peace requires the structures — justice, equity, participation — whose absence lets violence incubate silently.', reveals: 'calm-equals-positive-peace' },
                { text: 'Accept the ceasefire dismissal — negative peace isn\'t real peace.', outcome: '\'Negative\' is a technical term (absence of violence), not a value judgment: ceasefires are the prerequisite that positive peace builds upon.', reveals: 'negative-peace-is-worthless' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_09_011', title: 'You made it',
          caseStudy: { intro: 'Quiet streets can sit over loud grievances — positive peace is the presence of justice, not merely the absence of sirens.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_09_007', difficulty: 'standard',
          question: 'Deterrence theory is a strategic doctrine positing that the possession.',
          hint: 'Review just war theory\'s proportionality principle (c11_ps_cbse_09_005) and satyagraha\'s.',
          misconception: 'Students often believe "deterrence works because leaders are rational" - treating rationality as a guarantee of peace.',
          parts: [
                { id: 'a', prompt: 'Explain why "credibility" is the central paradox of deterrence theory, using the distinction between deterrence by punishment and deterrence by denial.', answer: 'Credibility is paradoxical',
                  options: ['Credibility is paradoxical', 'credibility just means having enough bombs', 'deterrence works', 'No First Use means India won\'t use nukes first'],
                  hint: 'Review just war theory\'s proportionality principle (c11_ps_cbse_09_005) and satyagraha\'s rejection.',
                  misconception: 'Students often believe "deterrence works because leaders are rational" - treating rationality as a guarantee of peace.' }
          ],
            remediations: { 'deterrence-works-because-leaders-are': { steps: ['Re-read Schelling\'s "The Strategy of Conflict" Chapter 2 (The Art of Commitment) - focus on how *limiting one\'s own.', 'Map the 1962 Cuban Missile Crisis using the "commitment trap" framework: how did Kennedy\'s public blockade commitment.', 'Apply to India-Pakistan: list 3 specific Pakistani actions (Nasr development, battlefield delegation, "full spectrum".', 'Write a 150-word answer to: "Does making threats more credible make war more or less likely?" using the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "deterrence works because leaders are rational" - treating rationality as a guarantee of peace.',
          parts: [
                { id: 'a', prompt: 'Design a "credible minimum deterrence" force structure for a hypothetical middle-power state facing two nuclear-armed adversaries with asymmetric capabilities.', answer: 'A strong answer would propose: (1) **Delivery systems**: Prioritize survivable',
                  options: ['A strong answer would propose: (1) **Delivery systems**: Prioritize survivable', 'deterrence works', 'No First Use means India won\'t use nukes first'],
                  hint: 'Review just war theory\'s proportionality principle (c11_ps_cbse_09_005) and satyagraha\'s rejection.',
                  misconception: 'Students often believe "deterrence works because leaders are rational" - treating rationality as a guarantee of peace.' }
          ],
            remediations: { 'deterrence-works-because-leaders-are': { steps: ['Re-read Schelling\'s "The Strategy of Conflict" Chapter 2 (The Art of Commitment) - focus on how *limiting one\'s own.', 'Map the 1962 Cuban Missile Crisis using the "commitment trap" framework: how did Kennedy\'s public blockade commitment.', 'Apply to India-Pakistan: list 3 specific Pakistani actions (Nasr development, battlefield delegation, "full spectrum".', 'Write a 150-word answer to: "Does making threats more credible make war more or less likely?" using the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_09_008', difficulty: 'standard',
          question: 'Disarmament refers to the reduction or elimination of a state\'s weaponry and.',
          hint: 'Revisit the distinction between "deterrence by punishment" and "deterrence by denial" and.',
          misconception: 'Students often believe that "arms control" and "disarmament" are synonyms, or that the NPT only prevents proliferation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Disarmament refers to the reduction or elimination of a state\'s weaponry and military',
                  options: ['Disarmament refers to the reduction or elimination of a state\'s weaponry and military', 'Peace is a multidimensional concept: **negative peace** refers to the absence of direct,', 'Negative peace refers to the mere absence of direct, organized violence (war, armed', 'Structural violence refers to systematic, institutionalized patterns of harm embedded in'],
                  hint: 'Revisit the distinction between "deterrence by punishment" and "deterrence by denial" and the.',
                  misconception: 'Students often believe that "arms control" and "disarmament" are synonyms, or that the NPT only prevents proliferation without any.' }
          ],
            remediations: { 'arms-control-and-disarmament-are': { steps: ['If a student conflates the two concepts, have them create a two-column table: left column "Disarmament", right column.', 'In each, list: Goal, Example Treaty, Verification Approach, Current Status.', 'Use the NPT (disarmament pillar vs non-proliferation pillar) and CWC (elimination with verification) as anchor examples.', 'Then ask: "If a treaty bans an entire category of weapons and mandates destruction of stockpiles with on-site.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_09_009', difficulty: 'standard',
          question: 'Peace-building is a comprehensive, long-term process of addressing the root.',
          hint: 'Revisit Node 003 and map the violence triangle onto a specific Indian conflict (e.g.',
          misconception: 'Students believe peace-building = economic development packages (roads, schools, jobs) distributed after conflict ends.',
          parts: [
                { id: 'a', prompt: 'Compare South Africa\'s TRC (1995-2002) and Rwanda\'s Gacaca courts (2001-2012) on three dimensions: scale of participation, relationship to formal law, and.', answer: 'South Africa: national-level, 21,000 victims heard, amnesty-for-truth model,',
                  options: ['South Africa: national-level, 21,000 victims heard, amnesty-for-truth model,', 'African TRCs'],
                  hint: 'Revisit Node 003 and map the violence triangle onto a specific Indian conflict (e.g., Kashmir.',
                  misconception: 'Students believe peace-building = economic development packages (roads, schools, jobs) distributed after conflict ends, ignoring that.' }
          ],
            remediations: { 'peace-building-economic-development-packages': { steps: ['Re-read Node 003 (Structural Violence) — identify 3 structural inequalities in a conflict zone you know.', 'Watch 15-min clip from "The Act of Killing" or "Long Night\'s Journey into Day" — note what victims say they need beyond.', 'Compare two Indian ceasefire agreements (e.g., Punjab 1992 vs.', 'Rewrite your definition of peace-building to include all three pillars: security, justice, structural transformation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_09_010', difficulty: 'standard',
          question: 'Human security is a paradigm that shifts the referent object of security from.',
          hint: 'Revisit the definition of sovereignty and the state\'s monopoly on legitimate violence.',
          misconception: 'Students often think human security *replaces* state security, leading them to argue that armies are irrelevant.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Human security is a paradigm that shifts the referent object of security from the state',
                  options: ['Human security is a paradigm that shifts the referent object of security from the state', 'Peace is a multidimensional concept: **negative peace** refers to the absence of direct,', 'Negative peace refers to the mere absence of direct, organized violence (war, armed', 'Structural violence refers to systematic, institutionalized patterns of harm embedded in'],
                  hint: 'Revisit the definition of sovereignty and the state\'s monopoly on legitimate violence (Weber) from.',
                  misconception: 'Students often think human security *replaces* state security, leading them to argue that armies are irrelevant.' }
          ],
            remediations: { 'human-security-replaces-state-security': { steps: ['Re-read the 1994 UNDP definition: "Human security means safety from chronic threats such as hunger, disease, and.', 'protection from sudden and hurtful disruptions." 2.', 'Create a two-column table: Column A = State Security (threat, referent, means), Column B = Human Security (threat.', 'Fill using the seven dimensions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_09_011', difficulty: 'standard',
          question: 'Collective security is a system where states agree that an attack on one is.',
          hint: 'Re-read UN Charter Articles 33-38 (Chapter VI) vs Articles 39-51 (Chapter VII); identify.',
          misconception: 'Students think "collective security" means the UN has its own standing army that fights wars.',
          parts: [
                { id: 'a', prompt: 'In 1990-91, Iraq invaded Kuwait. The Security Council passed Resolution 678 authorizing "all necessary means." Apply the collective security framework: Why did.', answer: 'P5 consensus existed: USSR (soon Russia) cooperated with US',
                  options: ['P5 consensus existed: USSR (soon Russia) cooperated with US', 'UN army defeated Iraq', 'collective security', '"collective security" means the UN has its own standing army that fights wars'],
                  hint: 'Re-read UN Charter Articles 33-38 (Chapter VI) vs Articles 39-51 (Chapter VII); identify which.',
                  misconception: 'Students think "collective security" means the UN has its own standing army that fights wars.' }
          ],
            remediations: { 'collective-security-means-the-un': { steps: ['Read UN Charter Articles 42-47 — note "armed forces... to be made available by Members" (Art 43) and "Military Staff.', 'Compare Korea (US-led UN Command), Gulf War (US-led coalition), Libya (NATO) — identify pattern: UN authorizes, states.', 'Watch 3-min clip "UN Peacekeeping vs Peace Enforcement" (UN official channel) — note blue helmets (Chapter VI consent).', 'Write one paragraph: "Why Article 43 failed and what replaced it."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
