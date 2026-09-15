import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch07_p1: SimDef = {
    id: 'v3_c12_ps_ch07_p1',
    title: 'Security in the Contemporary World · Part 1/2',
    subtitle: 'Tanks at the border, rebels in the forest — one old idea of \'threat\'',
    classLevel: 12, subject: 'political_science', topic: 'Security in the Contemporary World · Part 1/2',
    chapters: ['c12_ps_ch07'],
    nodeIds: ['c12_ps_cbse_07_001', 'c12_ps_cbse_07_002', 'c12_ps_cbse_07_003', 'c12_ps_cbse_07_004', 'c12_ps_cbse_07_005', 'c12_ps_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'National security analyst', intro: 'Kargil and Naxalism look nothing alike — yet one framework treats both as the same species of danger.', goal: 'Distinguish external from internal threats in the traditional, state-centric security framework and identify its limits.' },
    discovery: {
        question: 'A foreign intelligence agency crashes India\'s banking system with ransomware, and Maoist fighters hold \'liberated zones\' in Chhattisgarh. Traditional security counts only one of these as its kind of threat — which, and why?',
        options: ['The Maoist insurgency — traditional security covers armed challenges to the state\'s monopoly on force, while cyberattacks fall outside its kinetic paradigm', 'The cyberattack — any foreign attack is an external threat', 'Both — anything dangerous is a traditional threat', 'Neither — traditional security only covers declared wars'],
        answer: 'The Maoist insurgency — traditional security covers armed challenges to the state\'s monopoly on force, while cyberattacks fall outside its kinetic paradigm',
        hook: 'Students stretch \'internal threat\' to mean any domestic problem — protests, corruption, communal riots. Traditional security counts only organised armed violence challenging the state\'s monopoly on force or its territory; farmer protests were dissent, not insurgency.',
    },
    teaching: [
        { title: 'Traditional Notions of Security: Internal and External Threats', text: 'Traditional notions of security refer to the conventional state-centric understanding that defines security primarily in terms of protecting the sovereignty, territorial integrity, and political.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_07_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sort real crises — Kargil, Naxalism, Galwan, a bank hack — into external and internal traditional threats, and test where the military-first framework stops working.',
        labels: ['Traditional Notions of Security', 'Deterrence, Nuclear Deterrence', 'Non-Traditional Security Threats', 'Terrorism as a Security', 'Human Security: Concept, Components', 'Environmental Security: Climate Change,'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_07_001', title: 'Traditional Notions of Security: Internal and External Threats',
          caseStudy: { intro: 'Begin with a relatable scenario: "Imagine you\'re reading news about Indian troops deployed at the Line of Actual Control facing Chinese PLA soldiers — that\'s.',
            decisions: [{ prompt: 'Define traditional security and name its two main categories of threats with one example each from the Indian context.', options: [
                { text: 'Traditional security is a state-centric framework that defines security in terms of', outcome: 'Traditional security is a state-centric framework that defines security in terms of military.' },
                { text: 'internal threat', outcome: 'Not quite — Students often think "internal threat" in traditional security means any serious domestic problem.', reveals: 'internal-threat-in-traditional-security' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_07_002', title: 'Deterrence, Nuclear Deterrence and the Logic of Mutual Destruction',
          caseStudy: { intro: 'Imagine you are advising the Prime Minister in 1998, just after India\'s Pokhran-II tests. Pakistan responds with its own tests weeks later.',
            decisions: [{ prompt: 'What are the three essential components of a credible nuclear deterrent according to classical deterrence theory?', options: [
                { text: 'The three components are: (1) Capability', outcome: 'The three components are: (1) Capability — possession of nuclear weapons and delivery systems that.' },
                { text: 'having nuclear bombs', outcome: 'Not quite — Students often believe "Mutually Assured Destruction" means both sides are literally assured.', reveals: 'mutually-assured-destruction-means-both' },
                { text: 'Mutually Assured Destruction', outcome: 'Not quite — Students often believe "Mutually Assured Destruction" means both sides are literally assured.', reveals: 'mutually-assured-destruction-means-both' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_07_003', title: 'Non-Traditional Security Threats: A Changing Security Paradigm',
          caseStudy: { intro: 'Imagine a Class 12 student, Priya, reading news about the 2024 heatwave in Delhi that killed dozens, disrupted exams, and overwhelmed hospitals.',
            decisions: [{ prompt: 'Define \'non-traditional security threats\' and give two examples from the Indian context.', options: [
                { text: 'Correct answer: Non-traditional security threats are challenges to survival and', outcome: 'Correct answer: Non-traditional security threats are challenges to survival and well-being from.' },
                { text: 'Pakistan\'s nuclear missiles', outcome: 'Not quite — Students often think \'non-traditional security\' is just a new label for \'non-military problems\' and.', reveals: 'non-traditional-security-is-just' },
                { text: 'army built hospitals during COVID, so military handles health security', outcome: 'Not quite — Students often think \'non-traditional security\' is just a new label for \'non-military problems\' and.', reveals: 'non-traditional-security-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_07_004', title: 'Terrorism as a Security Threat: Global and Indian Dimensions',
          caseStudy: { intro: 'Begin with the 2008 Mumbai attacks (26/11) — a relatable event where Pakistani non-state actors targeted civilians in India\'s financial capital, illustrating.',
            decisions: [{ prompt: 'What is the defining characteristic that distinguishes terrorism from conventional warfare according to the NCERT framework?', options: [
                { text: 'The defining characteristic is the deliberate targeting of civilians or non-combatants to', outcome: 'The defining characteristic is the deliberate targeting of civilians or non-combatants to create.' },
                { text: 'terrorism uses smaller weapons', outcome: 'Not quite — Students often conflate \'terrorism\' with \'insurgency\' or \'freedom struggle\', arguing that "one.', reveals: 'students-often-conflate-terrorism-with' },
                { text: 'terrorism is only by non-state actors', outcome: 'Not quite — Students often conflate \'terrorism\' with \'insurgency\' or \'freedom struggle\', arguing that "one.', reveals: 'students-often-conflate-terrorism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_07_005', title: 'Human Security: Concept, Components and the UNDP Report',
          caseStudy: { intro: 'Imagine a student reading about farmer suicides in Vidarbha due to drought and debt, while the national budget allocates heavily to missile systems.',
            decisions: [{ prompt: 'What are the two main pillars of human security as defined in the UNDP 1994 Human Development Report?', options: [
                { text: 'The two pillars are "freedom from fear" (protection from violence, conflict, human rights', outcome: 'The two pillars are "freedom from fear" (protection from violence, conflict, human rights abuses).' },
                { text: 'military security and economic security', outcome: 'Not quite — Students often equate human security exclusively with "soft" issues like humanitarian aid.', reveals: 'students-often-equate-human-security' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_07_006', title: 'Environmental Security: Climate Change, Resource Scarcity and Conflict',
          caseStudy: { intro: 'Imagine a farmer in Punjab whose groundwater has dropped 20 meters in a decade, while upstream dams reduce river flow.',
            decisions: [{ prompt: 'Define "environmental security" and name the 1994 UNDP report that first popularized the human security framework including its.', options: [
                { text: 'Environmental security is the protection from threats arising from environmental', outcome: 'Environmental security is the protection from threats arising from environmental degradation and.' },
                { text: 'environmental security means protecting forests only', outcome: 'Not quite — Students often think "environmental security = protecting nature" or "climate change causes wars.', reveals: 'environmental-security-protecting-nature-or' },
                { text: 'environmental security = protecting nature', outcome: 'Not quite — Students often think "environmental security = protecting nature" or "climate change causes wars.', reveals: 'environmental-security-protecting-nature-or' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A columnist calls the 1998 nuclear tests a failure \'because Kargil happened the very next year — so much for deterrence.\'',
            decisions: [{ prompt: 'What does deterrence theory actually say about Kargil?', options: [
                { text: 'Deterrence caps the ceiling, not the floor — the stability-instability paradox says nuclear cover permits limited conflict below the threshold, and India\'s refusal to cross the LoC is the threshold visibly working: limited aims stayed limited because escalation\'s price was mutual destruction.', outcome: 'The chapter\'s subtlety: nuclear weapons don\'t prevent war — they prevent the war from becoming unlimited; Kargil staying conventional is deterrence operating, not failing.' },
                { text: 'The columnist is right — if deterrence held, no conflict would have occurred at all.', outcome: 'That expects deterrence to freeze all hostility, when its promise is narrower — making the full-scale option irrational; the paradox predicts exactly the kind of limited incursion Kargil was.', reveals: 'deterrence-means-no-conflict' },
                { text: 'India should have crossed the LoC — restraint proved the weapons worthless.', outcome: 'Crossing would have signalled existential aims and risked the red lines deterrence is built around — restraint was the strategy\'s rational output, not evidence against it.', reveals: 'restraint-equals-weakness' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now define security the way a general does — state, sovereignty, armed force — and see exactly which 21st-century dangers slip through that frame.',
            decisions: [{ prompt: 'What comes next? Security in the Contemporary World · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Security in the Contemporary World · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_07_001', difficulty: 'standard',
          question: 'Traditional notions of security refer to the conventional state-centric.',
          hint: 'Revisit Class 11 Political Science Chapter 16 (Federalism) node c11_ps_cbse_16_001.',
          misconception: 'Students often think "internal threat" in traditional security means any serious domestic problem — poverty.',
          parts: [
                { id: 'a', prompt: 'Explain why the traditional security framework prioritizes military capabilities over diplomatic, economic, or developmental capacities of the state.', answer: 'Traditional security prioritizes military capabilities',
                  options: ['Traditional security prioritizes military capabilities', 'because the military is the strongest institution', 'internal threat'],
                  hint: 'Revisit Class 11 Political Science Chapter 16 (Federalism) node c11_ps_cbse_16_001 on state.',
                  misconception: 'Students often think "internal threat" in traditional security means any serious domestic problem — poverty, corruption, communal riots,.' },
                { id: 'b', prompt: 'India experiences a massive ransomware attack on its banking infrastructure traced to a foreign intelligence agency.', answer: 'Traditional security would likely NOT classify this as an external threat',
                  options: ['Traditional security would likely NOT classify this as an external threat', 'yes, because a foreign state is involved', 'internal threat'],
                  hint: 'Revisit Class 11 Political Science Chapter 16 (Federalism) node c11_ps_cbse_16_001 on state.',
                  misconception: 'Students often think "internal threat" in traditional security means any serious domestic problem — poverty, corruption, communal riots,.' }
          ],
            remediations: { 'internal-threat-in-traditional-security': { steps: ['If the student conflates internal threats with general domestic instability: 1.', 'Re-read NCERT Class 12 Contemporary World Politics Chapter 7, first section ("Traditional Notions of Security").', 'Create a two-column table: Column A — "Traditional Internal Threats" (list: Naxalism, Khalistan insurgency, Northeast.', 'Identify the defining feature of Column A: **armed groups seeking to secede or overthrow the state by force**.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "internal threat" in traditional security means any serious domestic problem — poverty.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Traditional security is obsolete because 21st-century threats like climate change, pandemics, and cyber warfare cannot be deterred.', answer: 'The claim is partially correct but overstated',
                  options: ['The claim is partially correct but overstated', 'completely obsolete', 'fully adequate', 'internal threat'],
                  hint: 'Revisit Class 11 Political Science Chapter 16 (Federalism) node c11_ps_cbse_16_001 on state.',
                  misconception: 'Students often think "internal threat" in traditional security means any serious domestic problem — poverty, corruption, communal riots,.' }
          ],
            remediations: { 'internal-threat-in-traditional-security': { steps: ['If the student conflates internal threats with general domestic instability: 1.', 'Re-read NCERT Class 12 Contemporary World Politics Chapter 7, first section ("Traditional Notions of Security").', 'Create a two-column table: Column A — "Traditional Internal Threats" (list: Naxalism, Khalistan insurgency, Northeast.', 'Identify the defining feature of Column A: **armed groups seeking to secede or overthrow the state by force**.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_07_002', difficulty: 'standard',
          question: 'Deterrence is a security strategy where a state prevents an adversary from.',
          hint: 'If stuck, revisit the distinction between "deterrence by punishment" (threatening.',
          misconception: 'Students often believe "Mutually Assured Destruction" means both sides are literally assured of total destruction.',
          parts: [
                { id: 'a', prompt: 'What are the three essential components of a credible nuclear deterrent according to classical deterrence theory?', answer: 'The three components are: (1) Capability',
                  options: ['The three components are: (1) Capability', 'having nuclear bombs', 'Mutually Assured Destruction', 'only "having nuclear bombs'],
                  hint: 'If stuck, revisit the distinction between "deterrence by punishment" (threatening retaliation) and.',
                  misconception: 'Students often believe "Mutually Assured Destruction" means both sides are literally assured of total destruction in every scenario, and.' },
                { id: 'b', prompt: 'Compare and contrast the Cold War US-Soviet MAD relationship with the India-Pakistan nuclear dyad.', answer: 'Two key differences: (1) Geography and warning time',
                  options: ['Two key differences: (1) Geography and warning time', 'both have nuclear weapons so it\'s the same', 'Mutually Assured Destruction'],
                  hint: 'If stuck, revisit the distinction between "deterrence by punishment" (threatening retaliation) and.',
                  misconception: 'Students often believe "Mutually Assured Destruction" means both sides are literally assured of total destruction in every scenario, and.' }
          ],
            remediations: { 'mutually-assured-destruction-means-both': { steps: ['If the student cannot distinguish between deterrence (preventing action by threat of punishment) and defense.', '(2) Draw a 2x2 matrix: rows = "Attacker strikes first / Defender strikes first", columns = "Counterforce (military).', 'Identify which cell represents MAD (Attacker strikes first -> Countervalue retaliation).', '(3) Watch the 15-minute documentary clip "The Dead Hand" (Perimeter system) to grasp automated second-strike.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_07_003', difficulty: 'standard',
          question: 'Non-traditional security threats refer to challenges to survival and well-being.',
          hint: 'Revisit c12_ps_cbse_07_001 (traditional security) and c11_ps_cbse_09_010 (human vs state.',
          misconception: 'Students often think \'non-traditional security\' is just a new label for \'non-military problems\' and that the state\'s.',
          parts: [
                { id: 'a', prompt: 'Define \'non-traditional security threats\' and give two examples from the Indian context.', answer: 'Correct answer: Non-traditional security threats are challenges to survival and',
                  options: ['Correct answer: Non-traditional security threats are challenges to survival and', 'Pakistan\'s nuclear missiles', 'army built hospitals during COVID, so military handles health security', 'lists only military threats (e'],
                  hint: 'Revisit c12_ps_cbse_07_001 (traditional security) and c11_ps_cbse_09_010 (human vs state security).',
                  misconception: 'Students often think \'non-traditional security\' is just a new label for \'non-military problems\' and that the state\'s military can still.' },
                { id: 'b', prompt: 'Compare the response logic for a traditional security threat (e.g., cross-border terrorism) and a non-traditional threat (e.g., a pandemic).', answer: 'Correct answer: Traditional: primary actor = military/state',
                  options: ['Correct answer: Traditional: primary actor = military/state', 'both use military', 'both aim to protect the state', 'army built hospitals during COVID, so military handles health security'],
                  hint: 'Revisit c12_ps_cbse_07_001 (traditional security) and c11_ps_cbse_09_010 (human vs state security).',
                  misconception: 'Students often think \'non-traditional security\' is just a new label for \'non-military problems\' and that the state\'s military can still.' }
          ],
            remediations: { 'non-traditional-security-is-just': { steps: ['If the student cannot distinguish the referent object (state vs human) or keeps listing military responses: (1) Re-read.', '(2) Watch the 10-min video "UNDP 1994 Human Development Report explained" (search YouTube).', '(3) Re-attempt Diagnostic Questions 2 and 4, writing the answer in the table format.', '(4) If still stuck, discuss with a peer: "Why can\'t a tank stop a heatwave?" — force the conceptual shift.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_07_004', difficulty: 'standard',
          question: 'Terrorism is a non-traditional security threat involving the systematic use.',
          hint: 'If stuck, review the "deterrence failure" argument in c11_ps_cbse_09_007 and the threat.',
          misconception: 'Students often conflate \'terrorism\' with \'insurgency\' or \'freedom struggle\', arguing that "one man\'s terrorist.',
          parts: [
                { id: 'a', prompt: 'In the context of India\'s security challenges, which of the following is an example of cross-border terrorism and which is domestic insurgency?', answer: 'Lashkar-e-Taiba attack on Pathankot airbase (',
                  options: ['Lashkar-e-Taiba attack on Pathankot airbase (', 'terrorism'],
                  hint: 'If stuck, review the "deterrence failure" argument in c11_ps_cbse_09_007 and the threat taxonomy.',
                  misconception: 'Students often conflate \'terrorism\' with \'insurgency\' or \'freedom struggle\', arguing that "one man\'s terrorist is another man\'s freedom.' }
          ],
            remediations: { 'students-often-conflate-terrorism-with': { steps: ['Revisit c12_ps_cbse_07_003 (Non-Traditional Security Threats) to review the taxonomy of non-traditional threats.', 'Then use the "target selection" test: take five Indian security incidents (26/11, Pulwama, Dantewada Naxal ambush, 1993.', 'Check classifications against NCERT definitions.', 'If confusion persists, review c11_ps_cbse_09_007 (Deterrence theory) to understand why deterrence fails against.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_07_005', difficulty: 'standard',
          question: 'Human security is a people-centred paradigm that shifts the referent object.',
          hint: 'Revisit c11_ps_cbse_09_010 (Human security vs state security) and c12_ps_cbse_07_001.',
          misconception: 'Students often equate human security exclusively with "soft" issues like humanitarian aid or development, ignoring the.',
          parts: [
                { id: 'a', prompt: 'A country faces a severe epidemic but its government prioritizes buying fighter jets over vaccines.', answer: 'The neglected components are health security (directly) and economic security',
                  options: ['The neglected components are health security (directly) and economic security', 'epidemics are not security threats'],
                  hint: 'Revisit c11_ps_cbse_09_010 (Human security vs state security) and c12_ps_cbse_07_001 (Traditional.',
                  misconception: 'Students often equate human security exclusively with "soft" issues like humanitarian aid or development, ignoring the "freedom from fear".' }
          ],
            remediations: { 'students-often-equate-human-security': { steps: ['If a student holds this misconception, have them re-read the UNDP 1994 definition: "Human security means safety from.', 'This exercise clarifies that both violence and deprivation are integral to human security.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_07_006', difficulty: 'standard',
          question: 'Environmental security refers to the protection of individuals, communities.',
          hint: 'Revisit c12_ps_cbse_07_003 (Non-Traditional Security Threats) and c12_ps_cbse_07_005.',
          misconception: 'Students often think "environmental security = protecting nature" or "climate change causes wars directly." The first.',
          parts: [
                { id: 'a', prompt: 'Define "environmental security" and name the 1994 UNDP report that first popularized the human security framework including its environmental dimension.', answer: 'Environmental security is the protection from threats arising from environmental',
                  options: ['Environmental security is the protection from threats arising from environmental', 'environmental security means protecting forests only', 'environmental security = protecting nature', 'climate change causes wars directly'],
                  hint: 'Revisit c12_ps_cbse_07_003 (Non-Traditional Security Threats) and c12_ps_cbse_07_005 (Human.',
                  misconception: 'Students often think "environmental security = protecting nature" or "climate change causes wars directly." The first confuses.' },
                { id: 'b', prompt: 'Explain why climate change is called a "threat multiplier" rather than a direct cause of war. Use the Syrian civil war (2011–present) as an illustration.', answer: 'Climate change is a threat multiplier',
                  options: ['Climate change is a threat multiplier', 'drought caused the Syrian war', 'environmental security = protecting nature', 'climate change causes wars directly'],
                  hint: 'Revisit c12_ps_cbse_07_003 (Non-Traditional Security Threats) and c12_ps_cbse_07_005 (Human.',
                  misconception: 'Students often think "environmental security = protecting nature" or "climate change causes wars directly." The first confuses.' }
          ],
            remediations: { 'environmental-security-protecting-nature-or': { steps: ['If the student cannot distinguish threat multiplier from direct cause, or conflates conservation with security: 1.', 'Re-read c12_ps_cbse_07_003 (Non-Traditional Security Threats) — focus on the "widening vs.', 'deepening" security debate.', 'Watch the 10-min video "Climate Change & Conflict: The Threat Multiplier" (IPCC/UNEP).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
