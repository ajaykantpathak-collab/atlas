import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch01_p2: SimDef = {
    id: 'v3_c11_ps_ch01_p2',
    title: 'Political Theory: An Introduction · Part 2/2',
    subtitle: 'Find the politics in your dining table, not just in Delhi.',
    classLevel: 11, subject: 'political_science', topic: 'Political Theory: An Introduction · Part 2/2',
    chapters: ['c11_ps_ch01'],
    nodeIds: ['c11_ps_cbse_01_007', 'c11_ps_cbse_01_008', 'c11_ps_cbse_01_009', 'c11_ps_cbse_01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an analyst spotting collective decisions in disguise', intro: 'If politics were only elections and speeches, most of the decisions that shape your day would have no name — they do.', goal: 'Define politics as authoritative collective choice and distinguish analysis from abuse.' },
    discovery: {
        question: 'A family dividing chores, a class picking a picnic spot, residents fixing maintenance fees — is any of this \'politics\'?',
        options: ['All of it — collective decision-making under scarcity with binding outcomes is politics, wherever it happens', 'None — politics happens only in Parliament', 'Only the maintenance fee — money makes it political', 'None — politics means elections'],
        answer: 'All of it — collective decision-making under scarcity with binding outcomes is politics, wherever it happens',
        hook: 'Even universal agreement wouldn\'t abolish politics — resources stay scarce and someone must still authoritatively allocate them.',
    },
    teaching: [
        { title: 'Debate: Should political theory be relevant to real-world problems?', text: 'The debate on the relevance of political theory to real-world problems concerns whether systematic reflection on political concepts (freedom, equality, justice) should directly inform and guide.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Test whether defining politics as \'everyday negotiation\' drains the concept, and separate the analytic sense from the \'dirty politics\' slur.',
        labels: ['Debate: Should political theory', 'Indian traditions of political', 'Political theory and', 'Criticisms of political theory'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_01_007', title: 'Debate: Should political theory be relevant to real-world problems?',
          caseStudy: { intro: 'Imagine a student council debating whether to reserve leadership positions for students from economically weaker sections.',
            decisions: [{ prompt: 'According to the NCERT textbook, what is the primary objective of political theory as stated in the introductory chapter?', options: [
                { text: 'The primary objective is to train citizens to think rationally about political questions', outcome: 'The primary objective is to train citizens to think rationally about political questions and assess.' },
                { text: 'to predict election results', outcome: 'Not quite — Students often think "relevance to real-world problems" means political theory must offer.', reveals: 'relevance-to-real-world-problems' },
                { text: 'to train politicians', outcome: 'Not quite — Students often think "relevance to real-world problems" means political theory must offer.', reveals: 'relevance-to-real-world-problems' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_01_008', title: 'Indian traditions of political thinking: Dharma, Rajdharma, Sabha',
          caseStudy: { intro: 'Imagine you are watching a news debate about whether the Prime Minister should have unrestricted power during a national emergency.',
            decisions: [{ prompt: 'What is the primary distinction between *dharma* and *rajdharma* in classical Indian political thought?', options: [
                { text: 'Dharma is the universal cosmic-moral order governing all beings, while rajdharma is the', outcome: 'Dharma is the universal cosmic-moral order governing all beings, while rajdharma is the specific.' },
                { text: 'rajdharma is the king\'s personal religion', outcome: 'Not quite — Students often conflate *dharma* with "religion" or "caste duty" (varnashrama dharma) and miss its.', reveals: 'students-often-conflate-dharma-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_01_010', title: 'Criticisms of political theory: Eurocentrism and abstraction',
          caseStudy: { intro: 'Imagine you are preparing for a debate on "Is Political Theory Relevant for India?" and you notice that every thinker cited in your textbook—Plato, Hobbes.',
            decisions: [{ prompt: 'What is the core claim of the Eurocentrism criticism against mainstream political theory?', options: [
                { text: 'The core claim is that mainstream political theory treats the European historical', outcome: 'The core claim is that mainstream political theory treats the European historical experience and.' },
                { text: 'Eurocentrism means European theory is factually incorrect', outcome: 'Not quite — Students often think the Eurocentrism critique means "European political theory is wrong/biased and.', reveals: 'the-eurocentrism-critique-means-european' },
                { text: 'European political theory is wrong/biased and should be discarded', outcome: 'Not quite — Students often think the Eurocentrism critique means "European political theory is wrong/biased and.', reveals: 'the-eurocentrism-critique-means-european' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a youth-parliament orientation, a student says: \'I don\'t do politics — that\'s Parliament stuff, elections and corruption. Dividing chores in my family or our RWA fixing fees is just life.\'',
            decisions: [{ prompt: 'Is he actually outside politics?', options: [
                { text: 'Show the analytical definition: politics is collective decision-making over scarce resources with binding outcomes — so chore-division, picnic votes and RWA fee-setting ARE political acts. The state-centric view (legislatures, executives) is one arena; the society-centric view covers family, school and workplace — none of it inherently \'dirty\'; that label applies only when negotiation turns to manipulation.', outcome: 'He recognises he\'s been doing politics all along: wherever interests conflict and binding decisions are negotiated, politics is present.' },
                { text: 'Agree — politics is what politicians do; calling family life \'politics\' is an insult to families.', outcome: 'That confines the concept to one arena and a moral judgement: the term describes a structure of decision-making, not a verdict on it.', reveals: 'politics-is-only-parliament' },
                { text: 'Split the difference — everyday \'politics\' means manipulation, real politics means government.', outcome: 'Both halves are wrong: the everyday usage is analytical (negotiation under scarcity), and government is only politics\' most formal arena.', reveals: 'everyday-politics-is-manipulation' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_01_010', title: 'You made it',
          caseStudy: { intro: 'Politics isn\'t what politicians do badly — it\'s what humans do whenever a shared decision must bind everyone.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_01_007', difficulty: 'standard',
          question: 'The debate on the relevance of political theory to real-world problems concerns.',
          hint: 'Revisit node 005 (Normative vs Descriptive) and the textbook\'s Socrates example (Section.',
          misconception: 'Students often think "relevance to real-world problems" means political theory must offer **ready-made policy.',
          parts: [
                { id: 'a', prompt: 'The textbook states: "Political theory examines questions of this kind and systematically thinks about the values that inform political life — values such.', answer: 'Concepts (freedom, equality) are the standards by',
                  options: ['Concepts (freedom, equality) are the standards by', 'equality *is* voting rights', 'relevance to real-world problems', 'Theory says: implement 27% OBC quota'],
                  hint: 'Revisit node 005 (Normative vs Descriptive) and the textbook\'s Socrates example (Section 1.3).',
                  misconception: 'Students often think "relevance to real-world problems" means political theory must offer **ready-made policy solutions** (e.g., "Theory.' }
          ],
            remediations: { 'relevance-to-real-world-problems': { steps: ['Re-read Section 1.3 ("Putting Political Theory to Practice") focusing on the **queue/jumping queue** and **poor.', 'Identify: In each, what is the *abstract principle* (equal opportunity?', 'fairness?) and what is the *contextual application* (special counters?', 'Write two sentences: "The principle is ____.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "relevance to real-world problems" means political theory must offer **ready-made policy.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim using the textbook: "Political theory is irrelevant for solving India\'s water crisis because the crisis is technical (hydrology.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'relevance to real-world problems', 'Theory says: implement 27% OBC quota'],
                  hint: 'Revisit node 005 (Normative vs Descriptive) and the textbook\'s Socrates example (Section 1.3).',
                  misconception: 'Students often think "relevance to real-world problems" means political theory must offer **ready-made policy solutions** (e.g., "Theory.' },
                { id: 'b', prompt: 'Create a 100-word argument *against* the relevance of political theory to real-world problems, using the textbook\'s own distinction between "mathematics" (one.', answer: '**Anti-relevance argument**: "Unlike mathematics where a triangle has one fixed',
                  options: ['**Anti-relevance argument**: "Unlike mathematics where a triangle has one fixed', 'relevance to real-world problems', 'Theory says: implement 27% OBC quota'],
                  hint: 'Revisit node 005 (Normative vs Descriptive) and the textbook\'s Socrates example (Section 1.3).',
                  misconception: 'Students often think "relevance to real-world problems" means political theory must offer **ready-made policy solutions** (e.g., "Theory.' }
          ],
            remediations: { 'relevance-to-real-world-problems': { steps: ['Re-read Section 1.3 ("Putting Political Theory to Practice") focusing on the **queue/jumping queue** and **poor.', 'Identify: In each, what is the *abstract principle* (equal opportunity?', 'fairness?) and what is the *contextual application* (special counters?', 'Write two sentences: "The principle is ____.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_01_008', difficulty: 'standard',
          question: 'Dharma in Indian political thought refers to the cosmic and moral order that.',
          hint: 'Revisit c11_ps_cbse_01_003 (Political Theory: Systematic reflection) and c9_hist_ch3_2.',
          misconception: 'Students often conflate *dharma* with "religion" or "caste duty" (varnashrama dharma) and miss its political meaning.',
          parts: [
                { id: 'a', prompt: 'Compare Kautilya\'s Arthashastra view of rajdharma (king\'s happiness lies in subjects\' happiness) with the Mahabharata\'s view (king as guardian of dharma).', answer: 'Both share the principle that royal power is fiduciary',
                  options: ['Both share the principle that royal power is fiduciary', 'Kautilya is amoral, Mahabharata is moral', 'science of punishment'],
                  hint: 'Revisit c11_ps_cbse_01_003 (Political Theory: Systematic reflection) and c9_hist_ch3_2 (Political.',
                  misconception: 'Students often conflate *dharma* with "religion" or "caste duty" (varnashrama dharma) and miss its political meaning as *constitutional.' }
          ],
            remediations: { 'students-often-conflate-dharma-with': { steps: ['If a student cannot distinguish dharma-as-cosmic-order from dharma-as-caste-duty, assign a close reading of the.', 'For sabha/samiti, use the Rigvedic hymn (10.191) "Sam gacchadhvam sam vadadhvam" (move together, speak together) and.', 'Have them create a two-column table: "What the king could do alone" vs "What required sabha approval" using.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_01_009', difficulty: 'standard',
          question: 'Political theory\'s engagement with diversity and pluralism refers to its.',
          hint: 'Revisit c11_ps_cbse_01_005 (normative vs descriptive) and c10_civ_cbse_01_003 (prudential.',
          misconception: 'Students equate "pluralism" with "relativism" (all cultural practices equally valid) or "separatism" (groups isolating.',
          parts: [
                { id: 'a', prompt: 'Compare the "accommodation model" (Belgium, Class 10) and the "integration model" (France-style laïcité) as responses to diversity.', answer: 'Belgium\'s accommodation model (c10_civ_cbse_01_001) recognizes groups',
                  options: ['Belgium\'s accommodation model (c10_civ_cbse_01_001) recognizes groups', 'integration', 'India is secular'],
                  hint: 'Revisit c11_ps_cbse_01_005 (normative vs descriptive) and c10_civ_cbse_01_003 (prudential vs moral.',
                  misconception: 'Students equate "pluralism" with "relativism" (all cultural practices equally valid) or "separatism" (groups isolating themselves).' }
          ],
            remediations: { 'students-equate-pluralism-with-relativism': { steps: ['Re-read NCERT pages 10-12 on equality\'s layers—queue, disability, poverty.', 'Map each layer to a constitutional provision: queue→Article 14 (formal), disability→Article 15(3)/16(4) (special.', 'Read the Constituent Assembly debate on Article 29-30 (K.M. Munshi vs.', 'Write one paragraph distinguishing "pluralism as constitutional design" from "pluralism as cultural relativism" using.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_01_010', difficulty: 'standard',
          question: 'Eurocentrism in political theory refers to the dominance of European/Western.',
          hint: 'Revisit node c11_ps_cbse_01_006 (Great Traditions) to recall the Western canon, and node.',
          misconception: 'Students often think the Eurocentrism critique means "European political theory is wrong/biased and should.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Eurocentrism in political theory refers to the dominance of European/Western thinkers,',
                  options: ['Eurocentrism in political theory refers to the dominance of European/Western thinkers,', 'Politics is the process of collective decision-making and resource allocation through', 'Politics as the art of government refers to the traditional, state-centric view of', 'Political Theory is the systematic and rational examination of fundamental political'],
                  hint: 'Revisit node c11_ps_cbse_01_006 (Great Traditions) to recall the Western canon, and node.',
                  misconception: 'Students often think the Eurocentrism critique means "European political theory is wrong/biased and should be discarded," and the.' }
          ],
            remediations: { 'the-eurocentrism-critique-means-european': { steps: ['Re-read the textbook\'s "Let\'s Debate" box on relevance (node c11_ps_cbse_01_007) and the section on Indian traditions.', 'Take one concept—e.g., "State." Write its standard Western definition (Weber: monopoly on violence).', 'Find an Indian counter-perspective (Kautilya\'s *Saptanga* theory where state = seven interdependent elements;.', 'Apply both to a news report on a farmer protest. Ask: Which definition explains the state\'s response (police force vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
