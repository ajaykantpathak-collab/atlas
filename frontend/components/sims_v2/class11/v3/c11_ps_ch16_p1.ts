import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch16_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch16_p1: SimDef = {
    id: 'v3_c11_ps_ch16_p1',
    title: 'Federalism · Part 1/2',
    subtitle: 'Read federalism that bends in emergencies without breaking.',
    classLevel: 11, subject: 'political_science', topic: 'Federalism · Part 1/2',
    chapters: ['c11_ps_ch16'],
    nodeIds: ['c11_ps_cbse_16_001', 'c11_ps_cbse_16_002', 'c11_ps_cbse_16_003', 'c11_ps_cbse_16_004', 'c11_ps_cbse_16_005', 'c11_ps_cbse_16_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a federal analyst weighing shared lists and emergency clauses', intro: 'A unitary system can have strong local bodies and a federal one can go unitary in crisis — labels lie; check where the power is anchored.', goal: 'Characterise Indian federalism\'s asymmetry and evaluate emergency conversion.' },
    discovery: {
        question: 'President\'s Rule, national emergency, financial emergency — do these convert India into a unitary state for good?',
        options: ['Temporarily and reversibly — the Union gains power during the emergency, but safeguards and expiry return the federal structure', 'Yes — emergencies make India unitary permanently', 'Yes — Article 356 is the rule, not the exception', 'No — emergencies don\'t change anything'],
        answer: 'Temporarily and reversibly — the Union gains power during the emergency, but safeguards and expiry return the federal structure',
        hook: 'And the Concurrent List isn\'t \'shared administration\' — it\'s shared legislative competence; both may legislate, Union law prevails on clash, which is cooperation, not encroachment.',
    },
    teaching: [
        { title: 'What is federalism: Division of powers between central and regional units', text: 'Federalism is a system of government in which constitutional authority is divided between a central (Union) government and regional (State) governments, each operating directly on citizens within its.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_16_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'List India\'s asymmetric features — residuary powers, State reorganisation, emergency control — then defend the Concurrent List as cooperative design.',
        labels: ['What is federalism: Division', 'Federal vs unitary systems', 'Features of federalism: Written', 'Coming together vs holding', 'Indian federalism: Quasi-federal', 'Union List, State List,'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_16_001', title: 'What is federalism: Division of powers between central and regional units',
          caseStudy: { intro: 'Imagine you are a citizen in Tamil Nadu trying to get a new school built.',
            decisions: [{ prompt: 'What is the constitutional article that distributes legislative powers between the Union and the States in India, and what are the three.', options: [
                { text: 'Article 246 read with the Seventh Schedule creates three lists: Union List (List I),', outcome: 'Article 246 read with the Seventh Schedule creates three lists: Union List (List I), State List.' },
                { text: 'federalism = State autonomy in all matters', outcome: 'Not quite — Students think "federalism = State autonomy in all matters" and "Unitary = Centre controls.', reveals: 'federalism-state-autonomy-in-all' },
                { text: 'Unitary = Centre controls everything', outcome: 'Not quite — Students think "federalism = State autonomy in all matters" and "Unitary = Centre controls.', reveals: 'federalism-state-autonomy-in-all' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_16_002', title: 'Federal vs unitary systems of government',
          caseStudy: { intro: 'Imagine you are reading a news report about a state government refusing to implement a central law on agriculture, claiming it violates the state\'s.',
            decisions: [{ prompt: 'What is the constitutional basis for the division of legislative powers between the Union and the States in India, and which article.', options: [
                { text: 'The division of legislative powers is based on the Seventh Schedule of the Constitution', outcome: 'The division of legislative powers is based on the Seventh Schedule of the Constitution, which.' },
                { text: 'federal', outcome: 'Not quite — Students often think "federal" means "complete autonomy for states" and "unitary" means "no local.', reveals: 'federal-means-complete-autonomy-for' },
                { text: 'complete autonomy for states', outcome: 'Not quite — Students often think "federal" means "complete autonomy for states" and "unitary" means "no local.', reveals: 'federal-means-complete-autonomy-for' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_16_003', title: 'Features of federalism: Written constitution, bicameralism, independent judiciary',
          caseStudy: { intro: 'Imagine you\'re reading a news report: "Tamil Nadu passes resolution against NEET, Centre says exam is mandatory." You wonder: who decides?',
            decisions: [{ prompt: 'What is the specific constitutional provision that establishes the Supreme Court\'s original jurisdiction in disputes between the Government.', options: [
                { text: 'Article 131 of the Constitution of India', outcome: 'Article 131 of the Constitution of India. A wrong answer (e.g., Article 32, Article 136, or Article.' },
                { text: 'bicameralism = two houses', outcome: 'Not quite — Students think "bicameralism = two houses" and equate Rajya Sabha with UK\'s House of Lords —.', reveals: 'bicameralism-two-houses-and-equate' },
                { text: 'written constitution', outcome: 'Not quite — Students think "bicameralism = two houses" and equate Rajya Sabha with UK\'s House of Lords —.', reveals: 'bicameralism-two-houses-and-equate' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_16_004', title: 'Coming together vs holding together federations',
          caseStudy: { intro: 'Imagine you\'re reading a news report about Catalonia\'s independence movement in Spain and another about California\'s resistance to federal environmental.',
            decisions: [{ prompt: 'Define "coming together federation" and "holding together federation" in one sentence each, and name one canonical example of each type.', options: [
                { text: 'Coming together federation: Independent sovereign states voluntarily pool sovereignty to', outcome: 'Coming together federation: Independent sovereign states voluntarily pool sovereignty to form.' },
                { text: 'coming together', outcome: 'Not quite — Students often believe **India is a "coming together" federation because it has states with elected.', reveals: 'india-is-a-coming-together' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_16_005', title: 'Indian federalism: Quasi-federal or cooperative federalism',
          caseStudy: { intro: 'Imagine you\'re reading a news headline: "Tamil Nadu passes resolution against NEET; Centre says no exemption." A Class 10 student sees "Centre vs State.',
            decisions: [{ prompt: 'Which political scientist described the Indian Constitution as "quasi-federal — a unitary state with subsidiary federal features rather.', options: [
                { text: '**K.C', outcome: '**K.C. Wheare** (in *Federal Government*, 1946). A wrong answer (e.g., "Granville Austin" or "B.R.' },
                { text: 'Granville Austin', outcome: 'Not quite — Students believe **"quasi-federal" and "cooperative federalism" are mutually exclusive labels**.', reveals: 'quasi-federal-and-cooperative-federalism' },
                { text: 'quasi-federal', outcome: 'Not quite — Students believe **"quasi-federal" and "cooperative federalism" are mutually exclusive labels**.', reveals: 'quasi-federal-and-cooperative-federalism' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_16_001', title: 'A real-world call',
          caseStudy: { intro: 'Regional parties give voice to local identities — and can fragment national policy into a hundred vetoes. Unity needs a centre; identity needs a voice.',
            decisions: [{ prompt: 'Is federalism strength or friction?', options: [
                { text: 'Strength — a nation that can hold its differences is stronger than one that hides them', outcome: 'The pluralist answer; the friction is the price of not forcing sameness.' },
                { text: 'Friction — a hundred vetoes can stall what everyone needs', outcome: 'The efficiency answer; true in the short term, and the short term is where political careers are measured.' },
                { text: 'Both — the friction IS the system checking itself', outcome: 'The constitutional-design answer — federalism wasn\'t designed to be fast; it was designed to be hard to capture.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_16_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a federalism debate, a student argues: \'Federal means full state autonomy; unitary means no local government at all. The Concurrent List means Centre and states jointly administer subjects like GST.\'',
            decisions: [{ prompt: 'What does India\'s federal design actually look like?', options: [
                { text: 'Correct all three: Indian federalism is asymmetric — Union gets residuary powers (Art. 248), emergency override of the State List (Art. 250) and state reorganisation (Art. 3); unitary systems can still have strong local governments by statute (UK, France). And the Concurrent List is shared LEGISLATIVE competence, not joint administration — the GST Council is a constitutional body under Article 279A, not merged administration.', outcome: 'The debate reframes: India is a \'Union of States\' — federal structure, unitary bias — and concurrency splits lawmaking, not administration.' },
                { text: 'Keep the binary — federal equals autonomy, unitary equals no local tiers.', outcome: 'Both ends are wrong: federations divide sovereignty constitutionally, and unitary states routinely run empowered local bodies the centre could dissolve.', reveals: 'federal-unitary-false-binary' },
                { text: 'Accept shared administration — concurrent means both governments run it together.', outcome: 'Concurrency is about who can LEGISLATE: both may make laws (Union prevailing on conflict); administration follows the law\'s design, not the list.', reveals: 'concurrent-is-joint-administration' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_16_006', title: 'The bigger picture',
          caseStudy: { intro: 'A federation that can flex in crisis and spring back after is asymmetrical by design — the unitary moment has an off switch.',
            decisions: [{ prompt: 'What comes next? Federalism · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Federalism · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_16_001', difficulty: 'standard',
          question: 'Federalism is a system of government in which constitutional authority.',
          hint: 'If stuck, revisit Class 10 Civics Chapter 2 "Federalism" — specifically the table.',
          misconception: 'Students think "federalism = State autonomy in all matters" and "Unitary = Centre controls everything." They miss that.',
          parts: [
                { id: 'a', prompt: 'Why is India classified as a "holding together" federation rather than a "coming together" federation?', answer: 'India is a "holding together" federation',
                  options: ['India is a "holding together" federation', 'India has a strong Centre', 'federalism = State autonomy in all matters', 'Unitary = Centre controls everything'],
                  hint: 'If stuck, revisit Class 10 Civics Chapter 2 "Federalism" — specifically the table comparing.',
                  misconception: 'Students think "federalism = State autonomy in all matters" and "Unitary = Centre controls everything." They miss that **Indian federalism.' },
                { id: 'b', prompt: 'A State legislature passes a law on "public health and sanitation" (State List Entry 6).', answer: 'The Union law prevails under Article 254(1)',
                  options: ['The Union law prevails under Article 254(1)', 'State law prevails', 'federalism = State autonomy in all matters', 'Unitary = Centre controls everything'],
                  hint: 'If stuck, revisit Class 10 Civics Chapter 2 "Federalism" — specifically the table comparing.',
                  misconception: 'Students think "federalism = State autonomy in all matters" and "Unitary = Centre controls everything." They miss that **Indian federalism.' }
          ],
            remediations: { 'federalism-state-autonomy-in-all': { steps: ['Have the student read Article 246 and the Seventh Schedule *text* (not summary).', 'Give a 3-column table—Union, State, Concurrent—and 15 subjects (e.g., "police", "banking", "forests", "marriage".', 'Discuss *why* "police" is State but "CBI" is Union (Delhi Special Police Establishment Act).', 'Show Article 250 (Parliament can legislate on State List during Emergency) and Article 3 (Union can alter State.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_16_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "federalism = State autonomy in all matters" and "Unitary = Centre controls everything." They miss that.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "The Concurrent List undermines federalism because it allows the Union to encroach on State subjects." Use the concepts of cooperative.', answer: 'The argument is partially valid but incomplete',
                  options: ['The argument is partially valid but incomplete', 'federalism = State autonomy in all matters', 'Unitary = Centre controls everything', 'shared administration'],
                  hint: 'If stuck, revisit Class 10 Civics Chapter 2 "Federalism" — specifically the table comparing.',
                  misconception: 'Students think "federalism = State autonomy in all matters" and "Unitary = Centre controls everything." They miss that **Indian federalism.' }
          ],
            remediations: { 'federalism-state-autonomy-in-all': { steps: ['Have the student read Article 246 and the Seventh Schedule *text* (not summary).', 'Give a 3-column table—Union, State, Concurrent—and 15 subjects (e.g., "police", "banking", "forests", "marriage".', 'Discuss *why* "police" is State but "CBI" is Union (Delhi Special Police Establishment Act).', 'Show Article 250 (Parliament can legislate on State List during Emergency) and Article 3 (Union can alter State.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_16_002', difficulty: 'standard',
          question: 'A federal system of government is one in which sovereignty is constitutionally.',
          hint: 'If stuck, revisit Class 10 Civics Chapter 2 nodes c10_civ_cbse_02_001 and.',
          misconception: 'Students often think "federal" means "complete autonomy for states" and "unitary" means "no local government at all.".',
          parts: [
                { id: 'a', prompt: 'A state government enacts a law on a subject in the Concurrent List (e.g., forest conservation).', answer: 'The Union law prevails under Article 254(1)',
                  options: ['The Union law prevails under Article 254(1)', 'federal', 'complete autonomy for states', 'unitary'],
                  hint: 'If stuck, revisit Class 10 Civics Chapter 2 nodes c10_civ_cbse_02_001 and c10_civ_cbse_02_002.',
                  misconception: 'Students often think "federal" means "complete autonomy for states" and "unitary" means "no local government at all." In reality, federal.' }
          ],
            remediations: { 'federal-means-complete-autonomy-for': { steps: ['If a student confuses federal/unitary with centralization/decentralization, have them: (1) List the 5 federal criteria.', '(2) Test India against each using specific articles.', '(3) Test UK against each (no written constitution, no division, parliamentary sovereignty, flexible constitution,.', '(4) Conclude that UK is unitary despite having devolved governments (Scotland, Wales) because those derive power from.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_16_003', difficulty: 'standard',
          question: 'Federalism is a system of government where sovereignty is constitutionally.',
          hint: 'Revisit c11_ps_cbse_16_001 (division of powers) and c8_civ_ch3_9 (judicial review).',
          misconception: 'Students think "bicameralism = two houses" and equate Rajya Sabha with UK\'s House of Lords — a revising chamber.',
          parts: [
                { id: 'a', prompt: 'What is the specific constitutional provision that establishes the Supreme Court\'s original jurisdiction in disputes between the Government of India and one.', answer: 'Article 131 of the Constitution of India',
                  options: ['Article 131 of the Constitution of India', 'bicameralism = two houses', 'written constitution', 'rigid constitution'],
                  hint: 'Revisit c11_ps_cbse_16_001 (division of powers) and c8_civ_ch3_9 (judicial review) — these are the.',
                  misconception: 'Students think "bicameralism = two houses" and equate Rajya Sabha with UK\'s House of Lords — a revising chamber of elders/experts.' },
                { id: 'b', prompt: 'A bill to shift "public health and sanitation" from State List to Concurrent List is introduced in Lok Sabha.', answer: 'Rajya Sabha represents states (Article 80)',
                  options: ['Rajya Sabha represents states (Article 80)', 'Rajya Sabha can only delay money bills', 'Lok Sabha\'s will prevails', 'bicameralism = two houses'],
                  hint: 'Revisit c11_ps_cbse_16_001 (division of powers) and c8_civ_ch3_9 (judicial review) — these are the.',
                  misconception: 'Students think "bicameralism = two houses" and equate Rajya Sabha with UK\'s House of Lords — a revising chamber of elders/experts.' }
          ],
            remediations: { 'bicameralism-two-houses-and-equate': { steps: ['Re-read Article 80 (composition of Rajya Sabha) and Article 131 (original jurisdiction).', 'Compare Article 368(2) proviso (state ratification) with ordinary amendment.', 'Watch 10-min video "How Rajya Sabha protects states" (PRS Legislative Research).', 'Do a mini-case: "If Centre wants to create new All-India Service, which house must approve?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_16_004', difficulty: 'standard',
          question: 'Coming together federations are formed when independent sovereign states.',
          hint: 'If stuck, revisit c11_ps_cbse_16_003\'s feature list and c11_ps_cbse_16_002\'s.',
          misconception: 'Students often believe **India is a "coming together" federation because it has states with elected governments and.',
          parts: [
                { id: 'a', prompt: 'Country X was a unitary kingdom for 300 years. In 1990, facing separatist movements in three regions, it adopted a federal constitution creating three states.', answer: 'Country X is a holding together federation',
                  options: ['Country X is a holding together federation', 'coming together'],
                  hint: 'If stuck, revisit c11_ps_cbse_16_003\'s feature list and c11_ps_cbse_16_002\'s federal/unitary.',
                  misconception: 'Students often believe **India is a "coming together" federation because it has states with elected governments and a written.' }
          ],
            remediations: { 'india-is-a-coming-together': { steps: ['Re-read the definition of federalism in c11_ps_cbse_16_001 — note it describes *structure*, not *origin*.', 'Compare the US Constitution\'s Preamble ("We the People of the United States...', 'Trace Article 1 of the Indian Constitution ("India, that is Bharat, shall be a Union of States") and Article 3.', 'Re-attempt Diagnostic Question 3 with this lens: the centre *creates* units in holding together systems, so it retains.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_16_005', difficulty: 'standard',
          question: 'Indian federalism is a **holding-together federation** with a strong unitary.',
          hint: 'If stuck, re-read **c11_ps_cbse_16_004 (Coming together vs holding together.',
          misconception: 'Students believe **"quasi-federal" and "cooperative federalism" are mutually exclusive labels** — that India must.',
          parts: [
                { id: 'a', prompt: 'Which political scientist described the Indian Constitution as "quasi-federal — a unitary state with subsidiary federal features rather than a federal state.', answer: '**K.C',
                  options: ['**K.C', 'Granville Austin', 'quasi-federal', 'cooperative federalism'],
                  hint: 'If stuck, re-read **c11_ps_cbse_16_004 (Coming together vs holding together federations)** and.',
                  misconception: 'Students believe **"quasi-federal" and "cooperative federalism" are mutually exclusive labels** — that India must be *either* one *or* the.' },
                { id: 'b', prompt: 'A State government wants to legislate on a subject in the **State List** (e.g., public health).', answer: '**Quasi-federal lens:** Sees Article 249 as a **centralising override**',
                  options: ['**Quasi-federal lens:** Sees Article 249 as a **centralising override**', 'quasi-federal', 'cooperative federalism'],
                  hint: 'If stuck, re-read **c11_ps_cbse_16_004 (Coming together vs holding together federations)** and.',
                  misconception: 'Students believe **"quasi-federal" and "cooperative federalism" are mutually exclusive labels** — that India must be *either* one *or* the.' }
          ],
            remediations: { 'quasi-federal-and-cooperative-federalism': { steps: ['If a student insists "India is cooperative federal, not quasi-federal," do this 3-step remediation: 1.', '**Read Article 356 text** (President\'s Rule) and **Article 249** (Parliament legislating on State List).', 'Ask: "Does the *text* give the Centre power to override States without their consent?', '**Read the GST Council voting rule** (Art.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_16_006', difficulty: 'standard',
          question: 'The Constitution of India, under Article 246 and the Seventh Schedule.',
          hint: 'If stuck, re-read **Article 246** and the **Seventh Schedule** in the Constitution bare.',
          misconception: 'Students believe the **State List is absolutely exclusive** — that the Union Parliament *can never* legislate on State.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Constitution of India, under Article 246 and the Seventh Schedule, distributes',
                  options: ['The Constitution of India, under Article 246 and the Seventh Schedule, distributes', 'Federalism is a system of government in', 'A federal system of government is one in', 'Federalism is a system of government where sovereignty is constitutionally divided'],
                  hint: 'If stuck, re-read **Article 246** and the **Seventh Schedule** in the Constitution bare act.',
                  misconception: 'Students believe the **State List is absolutely exclusive** — that the Union Parliament *can never* legislate on State List subjects (e.g.' }
          ],
            remediations: { 'the-state-list-is-absolutely': { steps: ['Open the **bare text of Article 246** and the **Seventh Schedule** (Lists I, II, III).', 'Create a **three-column table** with 5 examples each from a textbook (e.g., Defence, Banking, Atomic Energy | Police.', 'Read **Article 254(1) and (2)** aloud: "If any provision of a law made by the Legislature of a State is repugnant.', 'the law made by Parliament...'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
