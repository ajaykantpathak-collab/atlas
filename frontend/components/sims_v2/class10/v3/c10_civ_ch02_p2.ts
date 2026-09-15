import type { SimDef } from '../../engine/types';

/** v3 generated — c10_civ_ch02_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_civ_ch02_p2: SimDef = {
    id: 'v3_c10_civ_ch02_p2',
    title: 'Federalism · Part 2/2',
    subtitle: 'Referee the tug-of-war between the Centre and the states',
    classLevel: 10, subject: 'civics', topic: 'Federalism · Part 2/2',
    chapters: ['c10_civ_ch02'],
    nodeIds: ['c10_civ_cbse_02_007', 'c10_civ_cbse_02_008', 'c10_civ_cbse_02_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a constitutional advisor to the Supreme Court', intro: 'The Delhi Metro is run by the Centre; the school down the road by the state; your panchayat by the village. Who decided that — and who decides when they fight?', goal: 'Explain the three-list division of powers, residuary subjects, and why India\'s federalism is asymmetric but real.' },
    discovery: {
        question: 'India\'s Centre can redraw a state\'s borders without asking it (Article 3) and can take over a state in an emergency. A student concludes: \'India is secretly a unitary country.\' Is she right?',
        options: ['No — states have constitutionally guaranteed subjects the Centre can\'t touch, and courts referee the divide', 'Yes — if the Centre can override states, federalism is just decoration', 'Only during emergencies — otherwise India is fully federal', 'Half-right — India was federal until the 42nd Amendment ended it'],
        answer: 'No — states have constitutionally guaranteed subjects the Centre can\'t touch, and courts referee the divide',
        hook: 'Federalism isn\'t equal power — it\'s guaranteed power. India tilts toward the Centre, but the Seventh Schedule draws lines even Parliament can\'t casually cross.',
    },
    teaching: [
        { title: 'How is Federalism Practised: Centre-State Relations', text: 'Centre-State relations in Indian federalism refer to the constitutional framework governing the distribution of legislative, administrative, and financial powers between the Union (Centre) and the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_civ_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort real subjects into the Union, State and Concurrent Lists, then referee a Centre-versus-State clash and rule who wins — and why.',
        labels: ['How is Federalism Practised', 'Decentralisation in India: Local', 'Challenges to Indian Federalism'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_civ_cbse_02_007', title: 'How is Federalism Practised: Centre-State Relations',
          caseStudy: { intro: 'Imagine you read a news headline: "Centre directs States to implement new education policy; some States refuse citing State List subject." To analyse this.',
            decisions: [{ prompt: 'Which constitutional article establishes the Finance Commission and what is its primary function in Centre-State financial relations?', options: [
                { text: 'Article 280 establishes the Finance Commission', outcome: 'Article 280 establishes the Finance Commission. Its primary function is to recommend the.' },
                { text: 'Centre-State relations', outcome: 'Not quite — Students often believe that "Centre-State relations" means the Centre controls everything and.', reveals: 'centre-state-relations-means-the' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_02_008', title: 'Decentralisation in India: Local Government (Panchayati Raj and Municipalities)',
          caseStudy: { intro: 'Imagine you live in a village where the nearest government office is 30 km away — getting a ration card, reporting a broken handpump, or resolving a land.',
            decisions: [{ prompt: 'What are the two Constitutional Amendment Acts that granted constitutional status to local self-government institutions in India, and.', options: [
                { text: 'The 73rd Constitutional Amendment Act (1992) for Panchayats and the 74th Constitutional', outcome: 'The 73rd Constitutional Amendment Act (1992) for Panchayats and the 74th Constitutional Amendment.' },
                { text: '42nd Amendment', outcome: 'Not quite — Students often believe **the Mayor of a Municipal Corporation is the chief executive** (like.', reveals: 'the-mayor-of-a-municipal' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_02_009', title: 'Challenges to Indian Federalism: Regionalism and Centre-State Tensions',
          caseStudy: { intro: 'Imagine you see a news headline: "State Government Accuses Centre of Withholding GST Compensation" or "Protests Erupt Demanding Separate Statehood for.',
            decisions: [{ prompt: 'What is the constitutional provision that allows the Centre to impose President\'s Rule in a state, and under what two conditions can it.', options: [
                { text: 'Article 356 allows President\'s Rule when the President is satisfied that the state', outcome: 'Article 356 allows President\'s Rule when the President is satisfied that the state government.' },
                { text: 'Article 352', outcome: 'Not quite — Students often think "regionalism = separatism" and "Centre-State tension = federalism failure.".', reveals: 'regionalism-separatism-and-centre-state' },
                { text: 'when the Chief Minister loses majority', outcome: 'Not quite — Students often think "regionalism = separatism" and "Centre-State tension = federalism failure.".', reveals: 'regionalism-separatism-and-centre-state' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_02_007', title: 'A real-world call',
          caseStudy: { intro: 'A state government wants to build a highway its people need; the central government controls the funds and wants conditions attached. Both are elected; both claim to represent the people.',
            decisions: [{ prompt: 'When state and centre disagree, whose mandate wins?', options: [
                { text: 'The state\'s — they know their people\'s needs', outcome: 'Federalism\'s core logic — proximity to the problem; but national projects cross borders by definition.' },
                { text: 'The centre\'s — national interest outranks regional', outcome: 'The unity argument; taken too far it hollows out the states federalism was designed to protect.' },
                { text: 'Neither — negotiation IS the federal system working', outcome: 'The textbook answer that\'s also true — friction between levels isn\'t a bug; it\'s the check working.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'During a dengue outbreak, the state government orders hospitals and municipalities to follow its own health protocol. An uncle at home insists the Prime Minister can simply take over every hospital in the state because \'health is a national matter, and the Centre outranks states on everything.\'',
            decisions: [{ prompt: 'Is the uncle right that the Centre can run health services in any state at will?', options: [
                { text: 'No — public health and public order are State List subjects, so the state government holds the primary power to legislate and run hospitals. The Centre can coordinate, advise and assist, but it cannot routinely legislate or administer on State subjects as if they were its own.', outcome: 'Indian federalism divides legislative power into Union, State and Concurrent lists. The Centre is supreme in its list and has special levers, but State List subjects belong to the states in normal times.' },
                { text: 'Yes — in India the Centre can legislate on any subject whenever it likes, since the Union government is superior to the states.', outcome: 'The division of powers is real: Parliament cannot casually take over State List subjects except in defined situations like a national emergency or a Rajya Sabha resolution in the national interest.', reveals: 'centre-overrides-all' },
                { text: 'Neither level can act — health decisions must wait until both Centre and state pass identical laws.', outcome: 'Each level acts independently on its own list; there is no rule requiring identical laws before a state can run its hospitals.', reveals: 'both-must-agree-always' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_02_009', title: 'You made it',
          caseStudy: { intro: 'Two levels of government, one citizen, zero ambiguity — that\'s the federal bargain. When the lists collide, the Constitution and the courts settle it, not muscle.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_civ_cbse_02_007', difficulty: 'standard',
          question: 'Centre-State relations in Indian federalism refer to the constitutional.',
          hint: 'Revisit c10_civ_cbse_02_005 (Distribution of Powers) and Article 254 (repugnancy clause).',
          misconception: 'Students often believe that "Centre-State relations" means the Centre controls everything and States are mere agents.',
          parts: [
                { id: 'a', prompt: 'Which constitutional article establishes the Finance Commission and what is its primary function in Centre-State financial relations?', answer: 'Article 280 establishes the Finance Commission',
                  options: ['Article 280 establishes the Finance Commission', 'Centre-State relations'],
                  hint: 'Revisit c10_civ_cbse_02_005 (Distribution of Powers) and Article 254 (repugnancy clause).',
                  misconception: 'Students often believe that "Centre-State relations" means the Centre controls everything and States are mere agents.' },
                { id: 'b', prompt: 'A State government refuses to implement a Central law on "Prevention of Cruelty to Animals" (a Concurrent List subject), claiming it violates State autonomy.', answer: 'The Centre\'s directions are constitutionally valid',
                  options: ['The Centre\'s directions are constitutionally valid', 'State can refuse', 'Centre-State relations'],
                  hint: 'Revisit c10_civ_cbse_02_005 (Distribution of Powers) and Article 254 (repugnancy clause).',
                  misconception: 'Students often believe that "Centre-State relations" means the Centre controls everything and States are mere agents.' }
          ],
            remediations: { 'centre-state-relations-means-the': { steps: ['If the student holds this misconception, do this 3-step remediation: (1) Open the Constitution (or NCERT) to Part.', 'Highlight Articles 246 (legislative distribution), 256 (State obligation to Central law), 257 (Centre\'s directions.', 'Bommai vs Union of India (1994) summary: Supreme Court laid down that Article 356 is subject to judicial review.', '(3) Write a one-page comparison table: "Central Power" vs "State Autonomy" with article numbers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_02_008', difficulty: 'standard',
          question: 'Decentralisation in India refers to the constitutional devolution of powers.',
          hint: 'If stuck, revisit Class 6 node c6_civics_ch12_016 (Panchayati Raj) and c6_civics_ch12_017.',
          misconception: 'Students often believe **the Mayor of a Municipal Corporation is the chief executive** (like a Chief Minister), but the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Decentralisation in India refers to the constitutional devolution of powers, functions,',
                  options: ['Decentralisation in India refers to the constitutional devolution of powers, functions,', 'Federalism is a system of government in', 'A **unitary system** concentrates all sovereign power in a single central government', 'Coming Together Federations are formed when independent sovereign states voluntarily pool'],
                  hint: 'If stuck, revisit Class 6 node c6_civics_ch12_016 (Panchayati Raj) and c6_civics_ch12_017.',
                  misconception: 'Students often believe **the Mayor of a Municipal Corporation is the chief executive** (like a Chief Minister), but the **Municipal.' }
          ],
            remediations: { 'the-mayor-of-a-municipal': { steps: ['Re-read Article 243Q (Municipalities) and Article 243A (Gram Sabha) from the Constitution — highlight "Commissioner".', 'Watch a 5-minute video of a real Gram Sabha meeting (search "Gram Sabha meeting Maharashtra/Kerala") to see voters.', 'Draw a two-column table: **Political Head (elected)** vs **Administrative Head (appointed)** for each tier — Panchayat.', 'Practice one CBSE case-based question where you identify who sanctions a building plan (Commissioner) vs who sets.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe **the Mayor of a Municipal Corporation is the chief executive** (like a Chief Minister), but the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the **State Finance Commission (Article 243I/243Y)** in ensuring fiscal autonomy for local bodies.', answer: 'SFCs are constitutionally mandated to review local finances every five years and',
                  options: ['SFCs are constitutionally mandated to review local finances every five years and', 'guarantee'],
                  hint: 'If stuck, revisit Class 6 node c6_civics_ch12_016 (Panchayati Raj) and c6_civics_ch12_017.',
                  misconception: 'Students often believe **the Mayor of a Municipal Corporation is the chief executive** (like a Chief Minister), but the **Municipal.' },
                { id: 'b', prompt: 'Draft a one-paragraph proposal for a **Gram Sabha resolution** demanding that the Gram Panchayat utilise its powers under Article 243G (Eleventh Schedule).', answer: '**Expected answer criteria:** (1) Cites **Entry 17 (Education, including primary',
                  options: ['**Expected answer criteria:** (1) Cites **Entry 17 (Education, including primary', 'development works'],
                  hint: 'If stuck, revisit Class 6 node c6_civics_ch12_016 (Panchayati Raj) and c6_civics_ch12_017.',
                  misconception: 'Students often believe **the Mayor of a Municipal Corporation is the chief executive** (like a Chief Minister), but the **Municipal.' }
          ],
            remediations: { 'the-mayor-of-a-municipal': { steps: ['Re-read Article 243Q (Municipalities) and Article 243A (Gram Sabha) from the Constitution — highlight "Commissioner".', 'Watch a 5-minute video of a real Gram Sabha meeting (search "Gram Sabha meeting Maharashtra/Kerala") to see voters.', 'Draw a two-column table: **Political Head (elected)** vs **Administrative Head (appointed)** for each tier — Panchayat.', 'Practice one CBSE case-based question where you identify who sanctions a building plan (Commissioner) vs who sets.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_02_009', difficulty: 'standard',
          question: 'Regionalism in Indian federalism refers to the assertion of distinct cultural.',
          hint: 'If stuck, revisit c10_civ_cbse_02_005 (Distribution of Powers) for legislative conflicts.',
          misconception: 'Students often think "regionalism = separatism" and "Centre-State tension = federalism failure." In reality.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Regionalism in Indian federalism refers to the assertion of distinct cultural,',
                  options: ['Regionalism in Indian federalism refers to the assertion of distinct cultural,', 'Federalism is a system of government in', 'A **unitary system** concentrates all sovereign power in a single central government', 'Coming Together Federations are formed when independent sovereign states voluntarily pool'],
                  hint: 'If stuck, revisit c10_civ_cbse_02_005 (Distribution of Powers) for legislative conflicts, and.',
                  misconception: 'Students often think "regionalism = separatism" and "Centre-State tension = federalism failure." In reality, regionalism *created*.' }
          ],
            remediations: { 'regionalism-separatism-and-centre-state': { steps: ['Re-read the S.R. Bommai judgment summary (Class 9 Judiciary node) — it defines "constitutional breakdown" narrowly.', 'List 3 demands for new states (Telangana, Vidarbha, Bodoland) and classify each as "accommodated," "ongoing,".', 'Trace one GST Council decision (e.g., rate cut on electric vehicles) — note how States and Centre voted.', 'Write one paragraph: "Federalism in India works because tensions are resolved through ______, not because tensions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
