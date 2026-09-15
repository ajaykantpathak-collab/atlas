import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch07_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch07_p2: SimDef = {
    id: 'v3_c12_ps_ch07_p2',
    title: 'Security in the Contemporary World · Part 2/2',
    subtitle: 'Tanks at the border, rebels in the forest — one old idea of \'threat\'',
    classLevel: 12, subject: 'political_science', topic: 'Security in the Contemporary World · Part 2/2',
    chapters: ['c12_ps_ch07'],
    nodeIds: ['c12_ps_cbse_07_007', 'c12_ps_cbse_07_008', 'c12_ps_cbse_07_009', 'c12_ps_cbse_07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'National security analyst', intro: 'Kargil and Naxalism look nothing alike — yet one framework treats both as the same species of danger.', goal: 'Distinguish external from internal threats in the traditional, state-centric security framework and identify its limits.' },
    discovery: {
        question: 'A foreign intelligence agency crashes India\'s banking system with ransomware, and Maoist fighters hold \'liberated zones\' in Chhattisgarh. Traditional security counts only one of these as its kind of threat — which, and why?',
        options: ['The Maoist insurgency — traditional security covers armed challenges to the state\'s monopoly on force, while cyberattacks fall outside its kinetic paradigm', 'The cyberattack — any foreign attack is an external threat', 'Both — anything dangerous is a traditional threat', 'Neither — traditional security only covers declared wars'],
        answer: 'The Maoist insurgency — traditional security covers armed challenges to the state\'s monopoly on force, while cyberattacks fall outside its kinetic paradigm',
        hook: 'Students stretch \'internal threat\' to mean any domestic problem — protests, corruption, communal riots. Traditional security counts only organised armed violence challenging the state\'s monopoly on force or its territory; farmer protests were dissent, not insurgency.',
    },
    teaching: [
        { title: 'Health Pandemics, Poverty and Food Security as Security Issues', text: 'Health pandemics, poverty, and food security are non-traditional security threats that endanger the survival and well-being of individuals and communities by creating widespread vulnerability.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_07_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sort real crises — Kargil, Naxalism, Galwan, a bank hack — into external and internal traditional threats, and test where the military-first framework stops working.',
        labels: ['Health Pandemics, Poverty', 'Cooperative Security: Collective Action', 'India\'s Security Concerns: Pakistan,', 'Balancing State Security with'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_07_008', title: 'Cooperative Security: Collective Action and International Cooperation',
          caseStudy: { intro: 'Imagine a scenario where a new virus emerges in one country and spreads globally within weeks — no single nation can contain it alone.',
            decisions: [{ prompt: 'What is the fundamental difference between \'collective security\' and \'cooperative security\' in international relations theory?', options: [
                { text: 'Collective security is a specific institutional mechanism (e.g., UN Charter Chapter VII)', outcome: 'Collective security is a specific institutional mechanism (e.g., UN Charter Chapter VII) where.' },
                { text: 'they are the same', outcome: 'Not quite — Students often believe cooperative security is synonymous with **collective security** (e.g., "UN.', reveals: 'cooperative-security-is-synonymous-with' },
                { text: 'collective security is broader', outcome: 'Not quite — Students often believe cooperative security is synonymous with **collective security** (e.g., "UN.', reveals: 'cooperative-security-is-synonymous-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_07_009', title: 'India\'s Security Concerns: Pakistan, China and Internal Threats',
          caseStudy: { intro: 'Imagine you\'re reading a news headline: "Indian Army foils infiltration bid on LoC; 3 terrorists neutralised" alongside "China builds new village in Arunachal.',
            decisions: [{ prompt: 'What is the primary territorial dispute between India and Pakistan, and which UN resolution called for a plebiscite in the region?', options: [
                { text: 'The primary dispute is over the erstwhile princely state of Jammu & Kashmir', outcome: 'The primary dispute is over the erstwhile princely state of Jammu & Kashmir.' },
                { text: 'Sir Creek', outcome: 'Not quite — Students often think "India\'s security policy is purely reactive/military" — they cite surgical.', reveals: 'india-s-security-policy-is' },
                { text: 'Siachen', outcome: 'Not quite — Students often think "India\'s security policy is purely reactive/military" — they cite surgical.', reveals: 'india-s-security-policy-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A columnist calls the 1998 nuclear tests a failure \'because Kargil happened the very next year — so much for deterrence.\'',
            decisions: [{ prompt: 'What does deterrence theory actually say about Kargil?', options: [
                { text: 'Deterrence caps the ceiling, not the floor — the stability-instability paradox says nuclear cover permits limited conflict below the threshold, and India\'s refusal to cross the LoC is the threshold visibly working: limited aims stayed limited because escalation\'s price was mutual destruction.', outcome: 'The chapter\'s subtlety: nuclear weapons don\'t prevent war — they prevent the war from becoming unlimited; Kargil staying conventional is deterrence operating, not failing.' },
                { text: 'The columnist is right — if deterrence held, no conflict would have occurred at all.', outcome: 'That expects deterrence to freeze all hostility, when its promise is narrower — making the full-scale option irrational; the paradox predicts exactly the kind of limited incursion Kargil was.', reveals: 'deterrence-means-no-conflict' },
                { text: 'India should have crossed the LoC — restraint proved the weapons worthless.', outcome: 'Crossing would have signalled existential aims and risked the red lines deterrence is built around — restraint was the strategy\'s rational output, not evidence against it.', reveals: 'restraint-equals-weakness' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_07_010', title: 'You made it',
          caseStudy: { intro: 'You can now define security the way a general does — state, sovereignty, armed force — and see exactly which 21st-century dangers slip through that frame.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_07_007', difficulty: 'standard',
          question: 'Health pandemics, poverty, and food security are non-traditional security.',
          hint: 'Revisit c12_ps_cbse_07_005 and the UNDP 1994 report\'s distinction between \'freedom from.',
          misconception: 'Students often believe that health pandemics, poverty, and food security are merely \'development issues\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Health pandemics, poverty, and food security are non-traditional security threats that',
                  options: ['Health pandemics, poverty, and food security are non-traditional security threats that', 'Traditional notions of security refer to the conventional state-centric understanding', 'Deterrence is a security strategy where a state prevents an adversary from taking an', 'Non-traditional security threats refer to challenges to survival and well-being that'],
                  hint: 'Revisit c12_ps_cbse_07_005 and the UNDP 1994 report\'s distinction between \'freedom from fear\'.',
                  misconception: 'Students often believe that health pandemics, poverty, and food security are merely \'development issues\' or \'humanitarian concerns\', not.' }
          ],
            remediations: { 'health-pandemics': { steps: ['If the student cannot articulate why these are security issues, have them: (1) Re-read the UNDP 1994 Human Development.', 'inter-state wars using WHO/FAO data; (4) Re-attempt Diagnostic Question 2 with this evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_07_008', difficulty: 'standard',
          question: 'Cooperative security is a strategy where states voluntarily work together.',
          hint: 'If unable to distinguish, re-read c12_ps_cbse_07_001 (Traditional Notions) and.',
          misconception: 'Students often believe cooperative security is synonymous with **collective security** (e.g., "UN sends troops.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of \'confidence-building measures\' (CBMs) to the India-Pakistan context.', answer: 'Two key CBMs: (1) 1988 Agreement on Non-Attack on Nuclear Installations',
                  options: ['Two key CBMs: (1) 1988 Agreement on Non-Attack on Nuclear Installations', 'UN sends troops automatically', 'cooperative security failed in Syria', 'cooperative security is synonymous with **collective security** (e'],
                  hint: 'If unable to distinguish, re-read c12_ps_cbse_07_001 (Traditional Notions) and c12_ps_cbse_07_003.',
                  misconception: 'Students often believe cooperative security is synonymous with **collective security** (e.g., "UN sends troops automatically") or that.' }
          ],
            remediations: { 'cooperative-security-is-synonymous-with': { steps: ['If the student conflates cooperative and collective security: 1.', 'Revisit **c11_ps_cbse_09_011** (UN and collective security) — note the UN Charter Chapter VII mechanism.', 'Compare with **c12_ps_cbse_07_008** examples: NPT (voluntary, verified), Paris Agreement (pledge-based), India-Pakistan.', 'Complete a table: | Mechanism | Type | Binding?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_07_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe cooperative security is synonymous with **collective security** (e.g., "UN sends troops.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Cooperative security requires states to surrender sovereignty." Use the distinction between \'pooling sovereignty\' and \'surrendering.', answer: 'The claim is false',
                  options: ['The claim is false', 'UN sends troops automatically', 'cooperative security failed in Syria', 'cooperative security is synonymous with **collective security** (e'],
                  hint: 'If unable to distinguish, re-read c12_ps_cbse_07_001 (Traditional Notions) and c12_ps_cbse_07_003.',
                  misconception: 'Students often believe cooperative security is synonymous with **collective security** (e.g., "UN sends troops automatically") or that.' },
                { id: 'b', prompt: 'Design a cooperative security framework to address the threat of cyberattacks on critical infrastructure (power grids, financial systems).', answer: 'the core principle, (',
                  options: ['the core principle, (', 'UN sends troops automatically', 'cooperative security failed in Syria', 'cooperative security is synonymous with **collective security** (e'],
                  hint: 'If unable to distinguish, re-read c12_ps_cbse_07_001 (Traditional Notions) and c12_ps_cbse_07_003.',
                  misconception: 'Students often believe cooperative security is synonymous with **collective security** (e.g., "UN sends troops automatically") or that.' }
          ],
            remediations: { 'cooperative-security-is-synonymous-with': { steps: ['If the student conflates cooperative and collective security: 1.', 'Revisit **c11_ps_cbse_09_011** (UN and collective security) — note the UN Charter Chapter VII mechanism.', 'Compare with **c12_ps_cbse_07_008** examples: NPT (voluntary, verified), Paris Agreement (pledge-based), India-Pakistan.', 'Complete a table: | Mechanism | Type | Binding?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_07_009', difficulty: 'standard',
          question: 'India\'s security concerns encompass three interconnected dimensions: (1) the.',
          hint: 'Revisit c12_ps_cbse_07_001 (Traditional Notions) for security definitions.',
          misconception: 'Students often think "India\'s security policy is purely reactive/military" — they cite surgical strikes but miss the.',
          parts: [
                { id: 'a', prompt: 'What is the primary territorial dispute between India and Pakistan, and which UN resolution called for a plebiscite in the region?', answer: 'The primary dispute is over the erstwhile princely state of Jammu & Kashmir',
                  options: ['The primary dispute is over the erstwhile princely state of Jammu & Kashmir', 'Sir Creek', 'Siachen', 'India\'s security policy is purely reactive/military'],
                  hint: 'Revisit c12_ps_cbse_07_001 (Traditional Notions) for security definitions, c12_ps_cbse_07_002 for.',
                  misconception: 'Students often think "India\'s security policy is purely reactive/military" — they cite surgical strikes but miss the simultaneous.' },
                { id: 'b', prompt: 'Analyse the 2020-2021 Galwan Valley clash in terms of: (a) the shift in LAC management protocols, (b) the role of infrastructure asymmetry, and (c) India\'s.', answer: 'the shift in LAC management protocols, (',
                  options: ['the shift in LAC management protocols, (', 'just another border skirmish', 'India\'s security policy is purely reactive/military'],
                  hint: 'Revisit c12_ps_cbse_07_001 (Traditional Notions) for security definitions, c12_ps_cbse_07_002 for.',
                  misconception: 'Students often think "India\'s security policy is purely reactive/military" — they cite surgical strikes but miss the simultaneous.' },
                { id: 'c', prompt: 'Compare the root causes and State responses to insurgency in Nagaland (NSCN-IM) versus Left-Wing Extremism in Chhattisgarh.', answer: 'Nagaland: ethnic identity, historical sovereignty claim → political negotiation',
                  options: ['Nagaland: ethnic identity, historical sovereignty claim → political negotiation', 'terrorism', 'India\'s security policy is purely reactive/military'],
                  hint: 'Revisit c12_ps_cbse_07_001 (Traditional Notions) for security definitions, c12_ps_cbse_07_002 for.',
                  misconception: 'Students often think "India\'s security policy is purely reactive/military" — they cite surgical strikes but miss the simultaneous.' }
          ],
            remediations: { 'india-s-security-policy-is': { steps: ['Revisit c12_ps_cbse_07_002 (Deterrence/Nuclear Deterrence) to grasp the strategic logic behind India\'s NFU and.', 'Map the LAC and LoC on a physical map — locate Galwan, Pangong Tso, Depsang, Siachen, Sir Creek, Kargil.', 'Read MHA Annual Report 2023 Chapter on "Internal Security" — note the decline in LWE incidents (2010: 2258 → 2022: 500).', 'Re-diagnostic: Explain why India rejected "Cold Start" doctrine officially but developed "Proactive Operations" — what.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_07_010', difficulty: 'standard',
          question: 'Balancing state security with human security refers to the policy challenge.',
          hint: 'Revisit c12_ps_cbse_07_005 (Human Security node) and create a two-column table: Column.',
          misconception: 'Students often think \'balancing\' means a 50-50 split of budget or attention between defence and welfare.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Balancing state security with human security refers to the policy challenge of',
                  options: ['Balancing state security with human security refers to the policy challenge of', 'Traditional notions of security refer to the conventional state-centric understanding', 'Deterrence is a security strategy where a state prevents an adversary from taking an', 'Non-traditional security threats refer to challenges to survival and well-being that'],
                  hint: 'Revisit c12_ps_cbse_07_005 (Human Security node) and create a two-column table: Column A = State.',
                  misconception: 'Students often think \'balancing\' means a 50-50 split of budget or attention between defence and welfare.' }
          ],
            remediations: { 'balancing-means-a-50-50': { steps: ['If the student cannot distinguish the referent object (state vs.', 'individual) or the seven dimensions of human security, have them re-read c12_ps_cbse_07_005 (Human Security: Concept.', 'Then ask them to classify 10 news headlines (e.g., \'Army buys new howitzers\', \'Mid-day meal scheme expanded\', \'Internet.', 'Debrief by mapping each to the specific UNDP component.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
