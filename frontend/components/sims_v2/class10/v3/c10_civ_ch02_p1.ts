import type { SimDef } from '../../engine/types';

/** v3 generated — c10_civ_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_civ_ch02_p1: SimDef = {
    id: 'v3_c10_civ_ch02_p1',
    title: 'Federalism · Part 1/2',
    subtitle: 'Referee the tug-of-war between the Centre and the states',
    classLevel: 10, subject: 'civics', topic: 'Federalism · Part 1/2',
    chapters: ['c10_civ_ch02'],
    nodeIds: ['c10_civ_cbse_02_001', 'c10_civ_cbse_02_002', 'c10_civ_cbse_02_003', 'c10_civ_cbse_02_004', 'c10_civ_cbse_02_005', 'c10_civ_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a constitutional advisor to the Supreme Court', intro: 'The Delhi Metro is run by the Centre; the school down the road by the state; your panchayat by the village. Who decided that — and who decides when they fight?', goal: 'Explain the three-list division of powers, residuary subjects, and why India\'s federalism is asymmetric but real.' },
    discovery: {
        question: 'India\'s Centre can redraw a state\'s borders without asking it (Article 3) and can take over a state in an emergency. A student concludes: \'India is secretly a unitary country.\' Is she right?',
        options: ['No — states have constitutionally guaranteed subjects the Centre can\'t touch, and courts referee the divide', 'Yes — if the Centre can override states, federalism is just decoration', 'Only during emergencies — otherwise India is fully federal', 'Half-right — India was federal until the 42nd Amendment ended it'],
        answer: 'No — states have constitutionally guaranteed subjects the Centre can\'t touch, and courts referee the divide',
        hook: 'Federalism isn\'t equal power — it\'s guaranteed power. India tilts toward the Centre, but the Seventh Schedule draws lines even Parliament can\'t casually cross.',
    },
    teaching: [
        { title: 'Federalism: Definition and Key Features', text: 'Federalism is a system of government in which power is constitutionally divided between a central authority and constituent political units (states/provinces), with both levels operating directly.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_civ_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort real subjects into the Union, State and Concurrent Lists, then referee a Centre-versus-State clash and rule who wins — and why.',
        labels: ['Federalism: Definition and Key', 'Unitary vs Federal System', 'Coming Together vs Holding', 'Federalism in India: Three-Tier', 'Distribution of Powers: Union', 'How is Federalism Practised'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_civ_cbse_02_001', title: 'Federalism: Definition and Key Features',
          caseStudy: { intro: 'Imagine you are a student in Delhi who sees the Delhi Metro (run by the Central Government) and your local MCD school (run by the Municipal Corporation).',
            decisions: [{ prompt: 'Define federalism in one sentence using the exact constitutional basis from the Indian Constitution.', options: [
                { text: 'Federalism is a system where the Constitution (Articles 1, 246, Seventh Schedule) divides', outcome: 'Federalism is a system where the Constitution (Articles 1, 246, Seventh Schedule) divides.' },
                { text: 'Central government gives powers to states', outcome: 'Not quite — Students often think "Federalism means the Centre and States have *equal* powers in all matters.".', reveals: 'federalism-means-the-centre-and' },
                { text: 'Federalism means the Centre and States have *equal* powers in all matters', outcome: 'Not quite — Students often think "Federalism means the Centre and States have *equal* powers in all matters.".', reveals: 'federalism-means-the-centre-and' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_02_002', title: 'Unitary vs Federal System: Key Differences',
          caseStudy: { intro: 'Imagine you are reading a news headline: "Centre issues directive to States on school curriculum; States protest, citing education as a State subject." Ask.',
            decisions: [{ prompt: 'Define a unitary system of government in one sentence and name one country that follows it.', options: [
                { text: 'A unitary system is one where all sovereign power resides in a single central government', outcome: 'A unitary system is one where all sovereign power resides in a single central government, which may.' },
                { text: 'states have independent powers', outcome: 'Not quite — Students often think "federalism means States have complete independence" and "unitary means.', reveals: 'federalism-means-states-have-complete' },
                { text: 'USA is unitary', outcome: 'Not quite — Students often think "federalism means States have complete independence" and "unitary means.', reveals: 'federalism-means-states-have-complete' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_02_003', title: 'Coming Together vs Holding Together Federations (Examples)',
          caseStudy: { intro: 'Imagine you are reading a news article about a diverse country like India debating whether to give more autonomy to its states.',
            decisions: [{ prompt: 'Define "Coming Together Federation" and name one country that follows this model.', options: [
                { text: 'A Coming Together Federation is formed when independent sovereign states voluntarily', outcome: 'A Coming Together Federation is formed when independent sovereign states voluntarily unite to form.' },
                { text: 'India is a coming together federation', outcome: 'Not quite — Students often believe India is a Coming Together Federation because it has many states with their.', reveals: 'india-is-a-coming-together' },
                { text: 'both types result in identical power distributions', outcome: 'Not quite — Students often believe India is a Coming Together Federation because it has many states with their.', reveals: 'india-is-a-coming-together' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_02_004', title: 'Federalism in India: Three-Tier System of Government',
          caseStudy: { intro: 'Imagine you are a resident of a village in Maharashtra. Your village has a Gram Panchayat that manages drinking water and street lights, the Maharashtra State.',
            decisions: [{ prompt: 'Which constitutional amendment acts formally established the third tier of government (Local Self-Government) as a constitutional.', options: [
                { text: 'The 73rd Constitutional Amendment Act (1992) for rural Panchayats and the 74th', outcome: 'The 73rd Constitutional Amendment Act (1992) for rural Panchayats and the 74th Constitutional.' },
                { text: '42nd Amendment', outcome: 'Not quite — Students often believe the three tiers (Union, State, Local) are coordinate and equal partners in.', reveals: 'the-three-tiers-union' },
                { text: 'original Constitution', outcome: 'Not quite — Students often believe the three tiers (Union, State, Local) are coordinate and equal partners in.', reveals: 'the-three-tiers-union' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_02_005', title: 'Distribution of Powers: Union List, State List and Concurrent List',
          caseStudy: { intro: 'Imagine you read a news headline: *"State Government passes law on \'cattle preservation\', Centre says it violates Central law on \'prevention of cruelty.',
            decisions: [{ prompt: '**REMEMBER LEVEL:** Name the three lists in the Seventh Schedule of the Indian Constitution and state the constitutional article that.', options: [
                { text: '**Correct Answer:** The three lists are: (1) Union List (List I), (2) State List (List', outcome: '**Correct Answer:** The three lists are: (1) Union List (List I), (2) State List (List II), and (3).' },
                { text: 'State List means the Centre has ZERO power on that subject', outcome: 'Not quite — **Specific Error:** Students believe that **"State List means the Centre has ZERO power on that.', reveals: 'specific-error-students-believe-that' },
                { text: '**"State List means the Centre has ZERO power on that subject', outcome: 'Not quite — **Specific Error:** Students believe that **"State List means the Centre has ZERO power on that.', reveals: 'specific-error-students-believe-that' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_02_006', title: 'How is Federalism Practised: Language Policy in India',
          caseStudy: { intro: 'Imagine a Class 10 student from Chennai (Tamil Nadu) who moves to Bhopal (Madhya Pradesh) for a science exhibition.',
            decisions: [{ prompt: 'What is the official language of the Union of India as per Article 343 of the Constitution?', options: [
                { text: 'The official language of the Union is Hindi in Devanagari script', outcome: 'The official language of the Union is Hindi in Devanagari script; English continues to be used for.' },
                { text: 'Hindi is the national language', outcome: 'Not quite — Students believe “Hindi is the national language of India.” The Constitution nowhere declares.', reveals: 'hindi-is-the-national-language' },
                { text: 'Hindi is the national language of India', outcome: 'Not quite — Students believe “Hindi is the national language of India.” The Constitution nowhere declares.', reveals: 'hindi-is-the-national-language' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_02_001', title: 'A real-world call',
          caseStudy: { intro: 'A state government wants to build a highway its people need; the central government controls the funds and wants conditions attached. Both are elected; both claim to represent the people.',
            decisions: [{ prompt: 'When state and centre disagree, whose mandate wins?', options: [
                { text: 'The state\'s — they know their people\'s needs', outcome: 'Federalism\'s core logic — proximity to the problem; but national projects cross borders by definition.' },
                { text: 'The centre\'s — national interest outranks regional', outcome: 'The unity argument; taken too far it hollows out the states federalism was designed to protect.' },
                { text: 'Neither — negotiation IS the federal system working', outcome: 'The textbook answer that\'s also true — friction between levels isn\'t a bug; it\'s the check working.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'During a dengue outbreak, the state government orders hospitals and municipalities to follow its own health protocol. An uncle at home insists the Prime Minister can simply take over every hospital in the state because \'health is a national matter, and the Centre outranks states on everything.\'',
            decisions: [{ prompt: 'Is the uncle right that the Centre can run health services in any state at will?', options: [
                { text: 'No — public health and public order are State List subjects, so the state government holds the primary power to legislate and run hospitals. The Centre can coordinate, advise and assist, but it cannot routinely legislate or administer on State subjects as if they were its own.', outcome: 'Indian federalism divides legislative power into Union, State and Concurrent lists. The Centre is supreme in its list and has special levers, but State List subjects belong to the states in normal times.' },
                { text: 'Yes — in India the Centre can legislate on any subject whenever it likes, since the Union government is superior to the states.', outcome: 'The division of powers is real: Parliament cannot casually take over State List subjects except in defined situations like a national emergency or a Rajya Sabha resolution in the national interest.', reveals: 'centre-overrides-all' },
                { text: 'Neither level can act — health decisions must wait until both Centre and state pass identical laws.', outcome: 'Each level acts independently on its own list; there is no rule requiring identical laws before a state can run its hospitals.', reveals: 'both-must-agree-always' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Two levels of government, one citizen, zero ambiguity — that\'s the federal bargain. When the lists collide, the Constitution and the courts settle it, not muscle.',
            decisions: [{ prompt: 'What comes next? Federalism · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Federalism · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_civ_cbse_02_001', difficulty: 'standard',
          question: 'Federalism is a system of government in which power is constitutionally divided.',
          hint: 'If stuck, revisit Class 9 Chapter 1 "Democracy" node c9_civ_ch1_9 ("Federalism and.',
          misconception: 'Students often think "Federalism means the Centre and States have *equal* powers in all matters." This is false.',
          parts: [
                { id: 'a', prompt: 'Scenario: The Parliament passes a law on "Public Health" (a State List subject) without a Rajya Sabha resolution under Article 249 or a national emergency.', answer: 'The law will be struck down as ultra vires',
                  options: ['The law will be struck down as ultra vires', 'Parliament is supreme, so law stands', 'Federalism means the Centre and States have *equal* powers in all matters', '"Federalism means the Centre and States have *equal* powers in all matters'],
                  hint: 'If stuck, revisit Class 9 Chapter 1 "Democracy" node c9_civ_ch1_9 ("Federalism and Decentralisation.',
                  misconception: 'Students often think "Federalism means the Centre and States have *equal* powers in all matters." This is false.' }
          ],
            remediations: { 'federalism-means-the-centre-and': { steps: ['Re-read Article 246 and the Seventh Schedule (Lists I, II, III) in the Constitution.', 'Make a three-column table: Union / State / Concurrent — list 5 subjects each.', 'For each, ask: "Who makes the final law if both legislate?" (Answer: Centre on Concurrent, exclusive on own lists).', 'Read Article 254 (Inconsistency between Centre and State laws).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Federalism means the Centre and States have *equal* powers in all matters." This is false.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India is a federal country with strong unitary features." Is this an accurate description of the *design* of Indian federalism?', answer: 'Yes, it accurately describes the *design* (not a flaw)',
                  options: ['Yes, it accurately describes the *design* (not a flaw)', 'India is not truly federal', 'Federalism means the Centre and States have *equal* powers in all matters', '"Federalism means the Centre and States have *equal* powers in all matters'],
                  hint: 'If stuck, revisit Class 9 Chapter 1 "Democracy" node c9_civ_ch1_9 ("Federalism and Decentralisation.',
                  misconception: 'Students often think "Federalism means the Centre and States have *equal* powers in all matters." This is false.' },
                { id: 'b', prompt: 'Create a new example of a "federal feature" not explicitly listed in the textbook but logically derived from the principle of constitutional division.', answer: 'Example: **Dual audit institutions**',
                  options: ['Example: **Dual audit institutions**', 'Federalism means the Centre and States have *equal* powers in all matters', '"Federalism means the Centre and States have *equal* powers in all matters'],
                  hint: 'If stuck, revisit Class 9 Chapter 1 "Democracy" node c9_civ_ch1_9 ("Federalism and Decentralisation.',
                  misconception: 'Students often think "Federalism means the Centre and States have *equal* powers in all matters." This is false.' }
          ],
            remediations: { 'federalism-means-the-centre-and': { steps: ['Re-read Article 246 and the Seventh Schedule (Lists I, II, III) in the Constitution.', 'Make a three-column table: Union / State / Concurrent — list 5 subjects each.', 'For each, ask: "Who makes the final law if both legislate?" (Answer: Centre on Concurrent, exclusive on own lists).', 'Read Article 254 (Inconsistency between Centre and State laws).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_02_002', difficulty: 'standard',
          question: 'A **unitary system** concentrates all sovereign power in a single central.',
          hint: 'Revisit Seventh Schedule (Union, State, Concurrent Lists) and Article 246 (distribution.',
          misconception: 'Students often think "federalism means States have complete independence" and "unitary means no local government.".',
          parts: [
                { id: 'a', prompt: 'Scenario: A State Government passes a law on a subject in the State List.', answer: 'The Central law prevails under Article 254(1)',
                  options: ['The Central law prevails under Article 254(1)', 'State law prevails', 'President decides', 'federalism means States have complete independence'],
                  hint: 'Revisit Seventh Schedule (Union, State, Concurrent Lists) and Article 246 (distribution.',
                  misconception: 'Students often think "federalism means States have complete independence" and "unitary means no local government." In reality, federal.' }
          ],
            remediations: { 'federalism-means-states-have-complete': { steps: ['Re-read Article 1 and Article 3 of the Indian Constitution — note "Union of States" and Parliament\'s unilateral power.', 'Create a two-column table: "Feature" vs "India\'s Position" with rows: Constitution (written/rigid), Judiciary.', 'For each row, write one sentence explaining whether it leans federal or unitary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_02_003', difficulty: 'standard',
          question: 'Coming Together Federations are formed when independent sovereign states.',
          hint: 'Review the definition of federalism (c10_civ_cbse_02_001) and the unitary vs federal.',
          misconception: 'Students often believe India is a Coming Together Federation because it has many states with their own governments,.',
          parts: [
                { id: 'a', prompt: 'Why does the central government tend to be stronger in a Holding Together Federation compared to a Coming Together Federation?', answer: 'In a Holding Together Federation, the centre is stronger',
                  options: ['In a Holding Together Federation, the centre is stronger', 'Because the constitution says so', 'All federations have strong centres', 'both types result in identical power distributions'],
                  hint: 'Review the definition of federalism (c10_civ_cbse_02_001) and the unitary vs federal comparison.',
                  misconception: 'Students often believe India is a Coming Together Federation because it has many states with their own governments, or they think both.' },
                { id: 'b', prompt: 'A new country, "Narmada," is formed when five independent kingdoms sign a treaty to create a federal union for mutual defence and trade, but each kingdom keeps.', answer: 'Narmada is a Coming Together Federation',
                  options: ['Narmada is a Coming Together Federation', 'both types result in identical power distributions'],
                  hint: 'Review the definition of federalism (c10_civ_cbse_02_001) and the unitary vs federal comparison.',
                  misconception: 'Students often believe India is a Coming Together Federation because it has many states with their own governments, or they think both.' }
          ],
            remediations: { 'india-is-a-coming-together': { steps: ['Show a timeline comparing the formation of the USA (1776-1789: 13 colonies → Articles of Confederation → Constitution).', 'Ask: "Which entity existed first: the Indian Union or the State of Tamil Nadu?" (Answer: The Union).', 'Read Article 1 of the Indian Constitution ("India, that is Bharat, shall be a Union of States") and Article 3.', 'Conclude: In India, the Union creates states; in the USA, states created the Union.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_02_004', difficulty: 'standard',
          question: 'India\'s three-tier system of government divides governance powers among the.',
          hint: 'If stuck, revisit Class 6 "Levels of Government" (c6_civics_ch11_013) and Class 9.',
          misconception: 'Students often believe the three tiers (Union, State, Local) are coordinate and equal partners in a federal structure.',
          parts: [
                { id: 'a', prompt: 'Which constitutional amendment acts formally established the third tier of government (Local Self-Government) as a constitutional requirement in India?', answer: 'The 73rd Constitutional Amendment Act (1992) for rural Panchayats and the 74th',
                  options: ['The 73rd Constitutional Amendment Act (1992) for rural Panchayats and the 74th', '42nd Amendment', 'original Constitution'],
                  hint: 'If stuck, revisit Class 6 "Levels of Government" (c6_civics_ch11_013) and Class 9 "Federalism and.',
                  misconception: 'Students often believe the three tiers (Union, State, Local) are coordinate and equal partners in a federal structure, like the three.' },
                { id: 'b', prompt: 'Why does the Constitution describe India as a "Union of States" (Article 1) rather than a "Federation of States"?', answer: '"Union of States" indicates that the Union is indestructible while States can be',
                  options: ['"Union of States" indicates that the Union is indestructible while States can be', 'it means the same as federation'],
                  hint: 'If stuck, revisit Class 6 "Levels of Government" (c6_civics_ch11_013) and Class 9 "Federalism and.',
                  misconception: 'Students often believe the three tiers (Union, State, Local) are coordinate and equal partners in a federal structure, like the three.' }
          ],
            remediations: { 'the-three-tiers-union': { steps: ['Re-read Article 1 (Union of States) and Articles 243B/243Q (local government creation by State law).', 'Make a two-column table: "Union/State Powers (Original Constitution, Seventh Schedule)" vs.', 'Use a concrete example: "Who can create a new district? State (Article 3). Who can create a new Gram Panchayat?', 'Practice writing: "Local government is a constitutionalised *sub-State* tier, not a federal unit."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_02_005', difficulty: 'standard',
          question: 'The distribution of legislative powers in India is defined by the Seventh.',
          hint: 'If stuck, revisit **c10_civ_cbse_02_001 (Federalism: Definition and Key Features)** for.',
          misconception: '**Specific Error:** Students believe that **"State List means the Centre has ZERO power on that subject."** They write.',
          parts: [
                { id: 'a', prompt: '**APPLY LEVEL:** The Parliament passes a law on **"Regulation of Mines and Mineral Development"** (Entry 54, Union List).', answer: '**Correct Answer with Reasoning:** 1',
                  options: ['**Correct Answer with Reasoning:** 1', 'State List means the Centre has ZERO power on that subject', '**"State List means the Centre has ZERO power on that subject'],
                  hint: 'If stuck, revisit **c10_civ_cbse_02_001 (Federalism: Definition and Key Features)** for the meaning.',
                  misconception: '**Specific Error:** Students believe that **"State List means the Centre has ZERO power on that subject."** They write in exams: *"Police.' }
          ],
            remediations: { 'specific-error-students-believe-that': { steps: ['**Targeted Remediation (3 Steps):** 1.', '**Read the Constitutional Text:** Open the Constitution (bare act) to **Article 246** and **Articles 249–254**.', 'Highlight the phrases: *"Notwithstanding anything in clause (3)..."* (Article 249) and *"Parliament has power to make.', 'for implementing any treaty..."* (Article 253).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_02_006', difficulty: 'standard',
          question: 'Language policy in India is the constitutional framework (Articles 343–351 and.',
          hint: 'Revisit the distribution of powers (c10_civ_cbse_02_005) and the Class 6 topic.',
          misconception: 'Students believe “Hindi is the national language of India.” The Constitution nowhere declares a national language;.',
          parts: [
                { id: 'a', prompt: 'What is the official language of the Union of India as per Article 343 of the Constitution?', answer: 'The official language of the Union is Hindi in Devanagari script',
                  options: ['The official language of the Union is Hindi in Devanagari script', 'Hindi is the national language', 'Hindi is the national language of India', '“Hindi is the national language of India'],
                  hint: 'Revisit the distribution of powers (c10_civ_cbse_02_005) and the Class 6 topic on linguistic.',
                  misconception: 'Students believe “Hindi is the national language of India.” The Constitution nowhere declares a national language; it only designates.' },
                { id: 'b', prompt: 'Compare the language policy at the Union level (Art. 343) and the State level (Art. 345).', answer: 'At the Union level, the Constitution specifies Hindi and English',
                  options: ['At the Union level, the Constitution specifies Hindi and English', 'Both levels have the same rule', 'Hindi is the national language of India', '“Hindi is the national language of India'],
                  hint: 'Revisit the distribution of powers (c10_civ_cbse_02_005) and the Class 6 topic on linguistic.',
                  misconception: 'Students believe “Hindi is the national language of India.” The Constitution nowhere declares a national language; it only designates.' }
          ],
            remediations: { 'hindi-is-the-national-language': { steps: ['Read Article 343(1) and Article 345 side-by-side — highlight “official language of the Union” vs.', 'On a map of India, mark the official language(s) of five States (e.g., Tamil Nadu – Tamil; Karnataka – Kannada; West.', 'Write one sentence: “India has no national language; it has official languages at two levels of government.”', 'Attempt Diagnostic Question 1 again.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
