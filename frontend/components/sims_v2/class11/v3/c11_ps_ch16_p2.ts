import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch16_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch16_p2: SimDef = {
    id: 'v3_c11_ps_ch16_p2',
    title: 'Federalism · Part 2/2',
    subtitle: 'Read federalism that bends in emergencies without breaking.',
    classLevel: 11, subject: 'political_science', topic: 'Federalism · Part 2/2',
    chapters: ['c11_ps_ch16'],
    nodeIds: ['c11_ps_cbse_16_007', 'c11_ps_cbse_16_008', 'c11_ps_cbse_16_009', 'c11_ps_cbse_16_010', 'c11_ps_cbse_16_011', 'c11_ps_cbse_16_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a federal analyst weighing shared lists and emergency clauses', intro: 'A unitary system can have strong local bodies and a federal one can go unitary in crisis — labels lie; check where the power is anchored.', goal: 'Characterise Indian federalism\'s asymmetry and evaluate emergency conversion.' },
    discovery: {
        question: 'President\'s Rule, national emergency, financial emergency — do these convert India into a unitary state for good?',
        options: ['Temporarily and reversibly — the Union gains power during the emergency, but safeguards and expiry return the federal structure', 'Yes — emergencies make India unitary permanently', 'Yes — Article 356 is the rule, not the exception', 'No — emergencies don\'t change anything'],
        answer: 'Temporarily and reversibly — the Union gains power during the emergency, but safeguards and expiry return the federal structure',
        hook: 'And the Concurrent List isn\'t \'shared administration\' — it\'s shared legislative competence; both may legislate, Union law prevails on clash, which is cooperation, not encroachment.',
    },
    teaching: [
        { title: 'Residuary powers and the role of the Union (Article 248)', text: 'Article 248 of the Constitution of India vests **residuary legislative powers** exclusively in Parliament (the Union Legislature).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_16_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'List India\'s asymmetric features — residuary powers, State reorganisation, emergency control — then defend the Concurrent List as cooperative design.',
        labels: ['Residuary powers and', 'Asymmetrical federalism: Special provisions', 'Relations between Centre', 'Finance Commission and devolution', 'Inter-State Council and dispute', 'Emergency provisions and'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_16_007', title: 'Residuary powers and the role of the Union (Article 248)',
          caseStudy: { intro: 'Imagine you are reading a news report about the Union government introducing a bill to regulate **artificial intelligence algorithms** used in hiring —.',
            decisions: [{ prompt: 'What is the exact constitutional provision that grants residuary legislative powers to the Union Parliament in India?', options: [
                { text: '**Correct Answer:** Article 248 vests residuary legislative powers in Parliament', outcome: '**Correct Answer:** Article 248 vests residuary legislative powers in Parliament.' },
                { text: 'residuary powers', outcome: 'Not quite — **Students often believe that "residuary powers" mean the Union can legislate on *any* subject.', reveals: 'students-often-believe-that-residuary' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_16_008', title: 'Asymmetrical federalism: Special provisions for certain states (Article 370, 371)',
          caseStudy: { intro: 'Imagine you are a student from Nagaland reading a news report about the demand for "Greater Nagalim" and the Centre\'s response citing Article 371A.',
            decisions: [{ prompt: 'Which constitutional article originally provided special autonomous status to Jammu & Kashmir, and what was the specific constitutional.', options: [
                { text: 'Article 370 provided special status to J&K', outcome: 'Article 370 provided special status to J&K. Its abrogation was effected through Presidential Order.' },
                { text: 'similar temporary provisions', outcome: 'Not quite — Students often believe Article 370 and Article 371 are "similar temporary provisions" — they.', reveals: 'article-370-and-article-371' },
                { text: 'temporary, transitional, special', outcome: 'Not quite — Students often believe Article 370 and Article 371 are "similar temporary provisions" — they.', reveals: 'article-370-and-article-371' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_16_010', title: 'Finance Commission and devolution of revenues',
          caseStudy: { intro: 'Imagine your state government wants to build a new highway and upgrade district hospitals but discovers its own tax revenue covers only 40% of its expenditure.',
            decisions: [{ prompt: 'What is the constitutional article that establishes the Finance Commission, and what is the mandatory periodicity of its constitution?', options: [
                { text: 'Article 280 establishes the Finance Commission', outcome: 'Article 280 establishes the Finance Commission; the President must constitute it every five years.' },
                { text: 'annually', outcome: 'Not quite — Students believe the Finance Commission *collects* taxes and *distributes* cash to States like.', reveals: 'the-finance-commission-collects-taxes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_16_011', title: 'Inter-State Council and dispute resolution mechanisms',
          caseStudy: { intro: 'Imagine you\'re reading a news report about Karnataka and Tamil Nadu arguing over Cauvery river water again — farmers protesting, dams being opened or closed.',
            decisions: [{ prompt: 'Under which constitutional article is the Inter-State Council established, and what is the primary condition for its creation by the.', options: [
                { text: 'The Inter-State Council is established under Article 263', outcome: 'The Inter-State Council is established under Article 263. The President can create it only if.' },
                { text: 'Council', outcome: 'Not quite — Students often believe the Inter-State Council is a judicial body like the Supreme Court that gives.', reveals: 'the-inter-state-council-is' },
                { text: 'inquiry and advice', outcome: 'Not quite — Students often believe the Inter-State Council is a judicial body like the Supreme Court that gives.', reveals: 'the-inter-state-council-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_16_012', title: 'Emergency provisions and the tilt towards the Centre',
          caseStudy: { intro: 'Imagine you\'re reading a news report about a State government being dismissed and President\'s Rule imposed because the ruling party lost its majority after.',
            decisions: [{ prompt: 'Which constitutional articles correspond to the three types of emergencies in India, and what is the maximum initial duration for which.', options: [
                { text: 'Article 352 (National Emergency), Article 356 (State Emergency/President\'s Rule), Article', outcome: 'Article 352 (National Emergency), Article 356 (State Emergency/President\'s Rule), Article 360.' },
                { text: 'Emergency = suspension of all fundamental rights', outcome: 'Not quite — Students believe "Emergency = suspension of all fundamental rights." In reality, Article 352 only.', reveals: 'emergency-suspension-of-all-fundamental' },
                { text: '"Emergency = suspension of all fundamental rights', outcome: 'Not quite — Students believe "Emergency = suspension of all fundamental rights." In reality, Article 352 only.', reveals: 'emergency-suspension-of-all-fundamental' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_16_007', title: 'A real-world call',
          caseStudy: { intro: 'Regional parties give voice to local identities — and can fragment national policy into a hundred vetoes. Unity needs a centre; identity needs a voice.',
            decisions: [{ prompt: 'Is federalism strength or friction?', options: [
                { text: 'Strength — a nation that can hold its differences is stronger than one that hides them', outcome: 'The pluralist answer; the friction is the price of not forcing sameness.' },
                { text: 'Friction — a hundred vetoes can stall what everyone needs', outcome: 'The efficiency answer; true in the short term, and the short term is where political careers are measured.' },
                { text: 'Both — the friction IS the system checking itself', outcome: 'The constitutional-design answer — federalism wasn\'t designed to be fast; it was designed to be hard to capture.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_16_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a federalism debate, a student argues: \'Federal means full state autonomy; unitary means no local government at all. The Concurrent List means Centre and states jointly administer subjects like GST.\'',
            decisions: [{ prompt: 'What does India\'s federal design actually look like?', options: [
                { text: 'Correct all three: Indian federalism is asymmetric — Union gets residuary powers (Art. 248), emergency override of the State List (Art. 250) and state reorganisation (Art. 3); unitary systems can still have strong local governments by statute (UK, France). And the Concurrent List is shared LEGISLATIVE competence, not joint administration — the GST Council is a constitutional body under Article 279A, not merged administration.', outcome: 'The debate reframes: India is a \'Union of States\' — federal structure, unitary bias — and concurrency splits lawmaking, not administration.' },
                { text: 'Keep the binary — federal equals autonomy, unitary equals no local tiers.', outcome: 'Both ends are wrong: federations divide sovereignty constitutionally, and unitary states routinely run empowered local bodies the centre could dissolve.', reveals: 'federal-unitary-false-binary' },
                { text: 'Accept shared administration — concurrent means both governments run it together.', outcome: 'Concurrency is about who can LEGISLATE: both may make laws (Union prevailing on conflict); administration follows the law\'s design, not the list.', reveals: 'concurrent-is-joint-administration' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_16_012', title: 'You made it',
          caseStudy: { intro: 'A federation that can flex in crisis and spring back after is asymmetrical by design — the unitary moment has an off switch.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_16_007', difficulty: 'standard',
          question: 'Article 248 of the Constitution of India vests **residuary legislative powers**.',
          hint: 'If stuck, revisit **c11_ps_cbse_16_006** and practice classifying 10 subjects into the.',
          misconception: '**Students often believe that "residuary powers" mean the Union can legislate on *any* subject it wants, overriding.',
          parts: [
                { id: 'a', prompt: 'What is the exact constitutional provision that grants residuary legislative powers to the Union Parliament in India?', answer: '**Correct Answer:** Article 248 vests residuary legislative powers in Parliament',
                  options: ['**Correct Answer:** Article 248 vests residuary legislative powers in Parliament', 'residuary powers'],
                  hint: 'If stuck, revisit **c11_ps_cbse_16_006** and practice classifying 10 subjects into the three lists.',
                  misconception: '**Students often believe that "residuary powers" mean the Union can legislate on *any* subject it wants, overriding State Lists.**.' },
                { id: 'b', prompt: 'A new technology — **quantum computing for military encryption** — emerges in 2025. The subject is not mentioned in any of the three lists.', answer: '**Correct Answer & Reasoning:** Step 1: Identify the subject',
                  options: ['**Correct Answer & Reasoning:** Step 1: Identify the subject', 'residuary powers'],
                  hint: 'If stuck, revisit **c11_ps_cbse_16_006** and practice classifying 10 subjects into the three lists.',
                  misconception: '**Students often believe that "residuary powers" mean the Union can legislate on *any* subject it wants, overriding State Lists.**.' },
                { id: 'c', prompt: 'Compare the residuary power arrangement in India (Article 248) with that in the United States (10th Amendment).', answer: '**Correct Answer:** - **India (Article 248)**: Residuary powers → **Union**',
                  options: ['**Correct Answer:** - **India (Article 248)**: Residuary powers → **Union**', 'residuary powers'],
                  hint: 'If stuck, revisit **c11_ps_cbse_16_006** and practice classifying 10 subjects into the three lists.',
                  misconception: '**Students often believe that "residuary powers" mean the Union can legislate on *any* subject it wants, overriding State Lists.**.' }
          ],
            remediations: { 'students-often-believe-that-residuary': { steps: ['If the student holds this misconception: 1.', '**Re-read Article 248 text**: "Parliament has exclusive power to make any law with respect to any matter not enumerated.', '**Map a concrete example**: Take "regulation of cryptocurrency" (not in any list) → Union can legislate via Article 248.', 'Take "regulation of agricultural marketing" (State List, Entry 28) → Union *cannot* use Article 248; it must use.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_16_008', difficulty: 'standard',
          question: 'Asymmetrical federalism in India refers to a constitutional arrangement where.',
          hint: 'If stuck, revisit c11_ps_cbse_16_004 (coming together vs holding together) and.',
          misconception: 'Students often believe Article 370 and Article 371 are "similar temporary provisions" — they conflate Article 370\'s.',
          parts: [
                { id: 'a', prompt: 'Which constitutional article originally provided special autonomous status to Jammu & Kashmir, and what was the specific constitutional mechanism that allowed.', answer: 'Article 370 provided special status to J&K',
                  options: ['Article 370 provided special status to J&K', 'similar temporary provisions', 'temporary, transitional, special'],
                  hint: 'If stuck, revisit c11_ps_cbse_16_004 (coming together vs holding together) and c11_ps_cbse_16_006.',
                  misconception: 'Students often believe Article 370 and Article 371 are "similar temporary provisions" — they conflate Article 370\'s explicit "temporary.' },
                { id: 'b', prompt: 'A legislative assembly of a state under Article 371A passes a law modifying customary inheritance practices.', answer: 'The High Court would likely uphold the Governor\'s refusal',
                  options: ['The High Court would likely uphold the Governor\'s refusal', 'similar temporary provisions', 'temporary, transitional, special'],
                  hint: 'If stuck, revisit c11_ps_cbse_16_004 (coming together vs holding together) and c11_ps_cbse_16_006.',
                  misconception: 'Students often believe Article 370 and Article 371 are "similar temporary provisions" — they conflate Article 370\'s explicit "temporary.' }
          ],
            remediations: { 'article-370-and-article-371': { steps: ['Have the student create a three-column table: Column A = Article 370 (origin: Instrument of Accession, temporary label.', 'Use the actual constitutional text (bare act) to highlight phrases "temporary" (Art 370 marginal note) vs.', 'Assign a 150-word answer: "Why is it constitutionally incorrect to call Article 371 provisions \'temporary\'?" This.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_16_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Article 370 and Article 371 are "similar temporary provisions" — they conflate Article 370\'s.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "Asymmetrical federalism under Articles 371A-J violates the basic structure doctrine\'s \'federal character\' because it creates unequal.', answer: 'The argument fails',
                  options: ['The argument fails', 'symmetrical federalism', 'similar temporary provisions', 'temporary, transitional, special'],
                  hint: 'If stuck, revisit c11_ps_cbse_16_004 (coming together vs holding together) and c11_ps_cbse_16_006.',
                  misconception: 'Students often believe Article 370 and Article 371 are "similar temporary provisions" — they conflate Article 370\'s explicit "temporary.' }
          ],
            remediations: { 'article-370-and-article-371': { steps: ['Have the student create a three-column table: Column A = Article 370 (origin: Instrument of Accession, temporary label.', 'Use the actual constitutional text (bare act) to highlight phrases "temporary" (Art 370 marginal note) vs.', 'Assign a 150-word answer: "Why is it constitutionally incorrect to call Article 371 provisions \'temporary\'?" This.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_16_009', difficulty: 'standard',
          question: 'Centre-State administrative relations (Articles 256–263) define how the Union.',
          hint: 'Revisit c11_ps_cbse_16_006 (Union/State/Concurrent Lists) and practice classifying 20.',
          misconception: 'Students believe the Union *always* controls State administration through All-India Services and directions (Articles.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Centre-State administrative relations (Articles 256–263) define how the Union executive',
                  options: ['Centre-State administrative relations (Articles 256–263) define how the Union executive', 'Federalism is a system of government in', 'A federal system of government is one in', 'Federalism is a system of government where sovereignty is constitutionally divided'],
                  hint: 'Revisit c11_ps_cbse_16_006 (Union/State/Concurrent Lists) and practice classifying 20 subjects.',
                  misconception: 'Students believe the Union *always* controls State administration through All-India Services and directions (Articles 256–257), ignoring.' }
          ],
            remediations: { 'the-union-always-controls-state': { steps: ['Re-read Articles 256, 257, 312, 280, 275, 279A side-by-side in the bare Constitution.', 'Trace a real All-India Service officer’s career — recruited by UPSC, trained at LBSNAA, posted to State cadre, promoted.', 'Compare 14th vs 15th Finance Commission reports — note how horizontal formula changed and why States protested.', 'Watch a GST Council meeting video (YouTube: “GST Council 50th meeting”) to see States negotiating rates — this is *not*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_16_010', difficulty: 'standard',
          question: 'The Finance Commission is a constitutional body established under Article 280.',
          hint: 'Revisit node c11_ps_cbse_16_006 (Union/State/Concurrent Lists) and identify which list.',
          misconception: 'Students believe the Finance Commission *collects* taxes and *distributes* cash to States like a central treasury.',
          parts: [
                { id: 'a', prompt: 'What is the constitutional article that establishes the Finance Commission, and what is the mandatory periodicity of its constitution?', answer: 'Article 280 establishes the Finance Commission',
                  options: ['Article 280 establishes the Finance Commission', 'annually'],
                  hint: 'Revisit node c11_ps_cbse_16_006 (Union/State/Concurrent Lists) and identify which list contains.',
                  misconception: 'Students believe the Finance Commission *collects* taxes and *distributes* cash to States like a central treasury.' }
          ],
            remediations: { 'the-finance-commission-collects-taxes': { steps: ['If the student holds this misconception: Step 1 — Show the Union Budget\'s "Devolution to States" line item (Annex 7).', 'Step 2 — Contrast with Centrally Sponsored Schemes (CSS) where Centre *does* allocate from its pocket — use.', 'Step 3 — Have the student read Article 270 (taxes levied and distributed between Union and States) and Article 275.', 'Step 4 — Practice writing: "The Finance Commission recommends the *share*; the Constitution *effects* the transfer."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_16_011', difficulty: 'standard',
          question: 'The Inter-State Council is a constitutional body established under Article 263.',
          hint: 'If stuck, revisit c11_ps_cbse_16_006 (Union/State/Concurrent Lists) and.',
          misconception: 'Students often believe the Inter-State Council is a judicial body like the Supreme Court that gives binding decisions.',
          parts: [
                { id: 'a', prompt: 'Under which constitutional article is the Inter-State Council established, and what is the primary condition for its creation by the President?', answer: 'The Inter-State Council is established under Article 263',
                  options: ['The Inter-State Council is established under Article 263', 'Council', 'inquiry and advice'],
                  hint: 'If stuck, revisit c11_ps_cbse_16_006 (Union/State/Concurrent Lists) and c10_civ_cbse_02_005 (Class.',
                  misconception: 'Students often believe the Inter-State Council is a judicial body like the Supreme Court that gives binding decisions on inter-state.' }
          ],
            remediations: { 'the-inter-state-council-is': { steps: ['If the student holds this misconception, have them read Article 263 text: "If at any time it appears to the President.', 'Ask: "Which body\'s order made Karnataka release water?" Answer: Tribunal/Court, not Council.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_16_012', difficulty: 'standard',
          question: 'Emergency provisions (Articles 352, 356, 360) are constitutional mechanisms.',
          hint: 'Revisit c11_ps_cbse_16_006 (Distribution of Powers) and c11_ps_cbse_16_009.',
          misconception: 'Students believe "Emergency = suspension of all fundamental rights." In reality, Article 352 only auto-suspends Article.',
          parts: [
                { id: 'a', prompt: 'A State government loses its majority after 15 MLAs defect to the opposition.', answer: 'No, this is unconstitutional',
                  options: ['No, this is unconstitutional', 'yes, the Governor has discretion', 'failure of constitutional machinery', 'Emergency = suspension of all fundamental rights'],
                  hint: 'Revisit c11_ps_cbse_16_006 (Distribution of Powers) and c11_ps_cbse_16_009 (Administrative.',
                  misconception: 'Students believe "Emergency = suspension of all fundamental rights." In reality, Article 352 only auto-suspends Article 19 freedoms.' },
                { id: 'b', prompt: 'Compare the parliamentary approval requirements for the three emergencies: Why does Article 352 require a special majority (2/3rd of members present and voting.', answer: 'Article 352 (National Emergency) requires special majority in both Houses',
                  options: ['Article 352 (National Emergency) requires special majority in both Houses', 'Emergency = suspension of all fundamental rights', '"Emergency = suspension of all fundamental rights'],
                  hint: 'Revisit c11_ps_cbse_16_006 (Distribution of Powers) and c11_ps_cbse_16_009 (Administrative.',
                  misconception: 'Students believe "Emergency = suspension of all fundamental rights." In reality, Article 352 only auto-suspends Article 19 freedoms.' }
          ],
            remediations: { 'emergency-suspension-of-all-fundamental': { steps: ['Re-read Article 352, 356, 360 text in the Constitution (bare act).', 'Create a three-column table: Emergency Type | Trigger | Effect on Fundamental Rights | Effect on Federal Distribution |.', 'Memorize: "Article 352 = rights suspension + legislative centralization; Article 356 = executive takeover of ONE State.', 'Watch the 10-minute explainer "Emergency Provisions: Articles 352, 356, 360" by PRS Legislative Research to visualize.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
