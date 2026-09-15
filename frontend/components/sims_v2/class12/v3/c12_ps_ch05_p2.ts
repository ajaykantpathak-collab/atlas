import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch05_p2: SimDef = {
    id: 'v3_c12_ps_ch05_p2',
    title: 'Contemporary South Asia · Part 2/2',
    subtitle: 'Eight neighbours, one Partition, and the deals that refuse to die',
    classLevel: 12, subject: 'political_science', topic: 'Contemporary South Asia · Part 2/2',
    chapters: ['c12_ps_ch05'],
    nodeIds: ['c12_ps_cbse_05_007', 'c12_ps_cbse_05_008', 'c12_ps_cbse_05_009', 'c12_ps_cbse_05_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Regional security analyst', intro: 'A family that inherited one house and argues over every room boundary — that\'s South Asia after 1947.', goal: 'Explain how Partition structured South Asian conflict and why asymmetric distrust defeats regional cooperation.' },
    discovery: {
        question: 'The Indus Waters Treaty has survived three India-Pakistan wars, yet SAARC — created to cooperate on everything — can barely hold a summit. Why does the narrow deal outlast the grand one?',
        options: ['The water treaty decouples a survival resource from politics with binding technical rules and a neutral broker, while SAARC\'s consensus rule lets any bilateral feud veto everything', 'SAARC members simply lack political will', 'The water treaty works because India and Pakistan are friends on water', 'SAARC failed because South Asia shares nothing in common'],
        answer: 'The water treaty decouples a survival resource from politics with binding technical rules and a neutral broker, while SAARC\'s consensus rule lets any bilateral feud veto everything',
        hook: 'Don\'t blame \'ancient religious hatreds\' — South Asia\'s conflicts are post-Partition state-building failures: a hastily drawn border, majoritarian nation-building and a giant neighbour whose defensive moves read as threats to everyone smaller.',
    },
    teaching: [
        { title: 'Nuclearization of India and Pakistan and the 1998 Tests', text: 'Nuclearization of India and Pakistan refers to the process by which both countries developed, tested, and operationalized nuclear weapons capabilities, culminating in India\'s 1974 Peaceful Nuclear.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_05_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map South Asia\'s fault lines from Partition onward — Kashmir, water, nuclear rivalry — and test why cooperation keeps failing where the security dilemma runs deepest.',
        labels: ['Nuclearization of India', 'Democracies in South Asia', 'India\'s Role and Relations', 'Conflicts over Water, Borders'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_05_007', title: 'Nuclearization of India and Pakistan and the 1998 Tests',
          caseStudy: { intro: 'Imagine you\'re reading a news headline: "India tests Agni-V missile with 5000 km range — China and Pakistan in range." A Class 12 student asks: "But we already.',
            decisions: [{ prompt: 'What was the official designation of India\'s 1974 nuclear test at Pokhran, and how did the Indian government characterize.', options: [
                { text: 'India\'s 1974 test was officially designated a "Peaceful Nuclear Explosion" (PNE),', outcome: 'India\'s 1974 test was officially designated a "Peaceful Nuclear Explosion" (PNE), characterized.' },
                { text: 'weapon test', outcome: 'Not quite — Students believe "India became a nuclear power in 1998" — treating 1998 as the *start*.', reveals: 'india-became-a-nuclear-power' },
                { text: 'hydrogen bomb test', outcome: 'Not quite — Students believe "India became a nuclear power in 1998" — treating 1998 as the *start*.', reveals: 'india-became-a-nuclear-power' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_05_009', title: 'India\'s Role and Relations with Its South Asian Neighbours',
          caseStudy: { intro: 'Imagine you are reading a news headline: "India sends humanitarian aid to flood-hit Bangladesh while tensions simmer at the LoC with Pakistan." Start.',
            decisions: [{ prompt: 'Name the seven countries that constitute India\'s "South Asian neighbourhood" in the official foreign policy sense, and state the guiding.', options: [
                { text: 'The seven countries are Pakistan, Bangladesh, Nepal, Sri Lanka, Bhutan, Maldives, and', outcome: 'The seven countries are Pakistan, Bangladesh, Nepal, Sri Lanka, Bhutan, Maldives, and Afghanistan.' },
                { text: 'Panchsheel', outcome: 'Not quite — Students often believe "Neighbourhood First" means India gives unilateral concessions to neighbours.', reveals: 'neighbourhood-first-means-india-gives' },
                { text: 'Neighbourhood First', outcome: 'Not quite — Students often believe "Neighbourhood First" means India gives unilateral concessions to neighbours.', reveals: 'neighbourhood-first-means-india-gives' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_05_010', title: 'Conflicts over Water, Borders and Migration in South Asia',
          caseStudy: { intro: 'Imagine you are a farmer in Punjab watching the Sutlej river dry up upstream because of a dam project in a neighbouring state, while your cousin in Rajshahi.',
            decisions: [{ prompt: 'Name the treaty that governs sharing of the Indus river system waters between India and Pakistan, specify the year it was signed, and.', options: [
                { text: 'The Indus Waters Treaty (IWT) was signed in 1960 and brokered by the World Bank', outcome: 'The Indus Waters Treaty (IWT) was signed in 1960 and brokered by the World Bank.' },
                { text: 'the Simla Agreement 1972 or the Ganges Treaty 1996', outcome: 'Not quite — Students often believe: "Water disputes in South Asia are purely technical problems that engineers.', reveals: 'water-disputes-in-south-asia' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student presenting \'three Kashmir wars\' folds 1971 into the same Kashmir storyline as 1947-48 and 1965 — \'same neighbours, same cause, bigger scale.\'',
            decisions: [{ prompt: 'What\'s wrong with that framing?', options: [
                { text: '1971\'s cause was the East Pakistan crisis — the liberation movement, ten million refugees crossing into India and Pakistan\'s pre-emptive strikes; its outcome was Bangladesh and 93,000 POWs — a humanitarian-geopolitical rupture the Kashmir file doesn\'t explain.', outcome: 'The chapter separates causation: the first two wars were Kashmir-centred; 1971 redrew the map for a different reason — grouping them hides the event\'s actual logic.' },
                { text: 'The framing holds — every India-Pakistan war is ultimately about Kashmir.', outcome: 'The evidence says otherwise — East Pakistan\'s crisis, the refugee influx and Bangladesh\'s creation belong to a different causal chain; Kashmir was where the two earlier wars lived, not this one.', reveals: 'all-wars-are-kashmir' },
                { text: 'Half right — 1971 started over Kashmir and escalated into East Pakistan.', outcome: 'Sequence is the error — the war grew out of the eastern crisis and refugee emergency, not a western-front escalation; reversing cause and consequence scrambles the whole analysis.', reveals: 'sequence-reversed' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_05_010', title: 'You made it',
          caseStudy: { intro: 'You can now explain why shared rivers and shared history haven\'t produced a South Asian EU — and why institutional design, not goodwill, decides which deals survive.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_05_007', difficulty: 'standard',
          question: 'Nuclearization of India and Pakistan refers to the process by which both.',
          hint: 'Revisit c11_ps_cbse_09_007 for deterrence basics and c12_ps_cbse_05_002 for the conflict.',
          misconception: 'Students believe "India became a nuclear power in 1998" — treating 1998 as the *start* of nuclearization.',
          parts: [
                { id: 'a', prompt: 'Why did India conduct the 1998 Pokhran-II tests despite facing certain international sanctions, and how did the government justify the timing vis-à-vis the.', answer: 'India tested in 1998',
                  options: ['India tested in 1998', 'domestic politics', 'Hindutva ideology', 'India became a nuclear power in 1998'],
                  hint: 'Revisit c11_ps_cbse_09_007 for deterrence basics and c12_ps_cbse_05_002 for the conflict history.',
                  misconception: 'Students believe "India became a nuclear power in 1998" — treating 1998 as the *start* of nuclearization.' }
          ],
            remediations: { 'india-became-a-nuclear-power': { steps: ['If the student conflates 1974 and 1998: Step 1 — Revisit c11_ps_cbse_09_007 (deterrence theory) to understand that.', 'Step 2 — Create a two-column timeline: Technical Milestones (1974 PNE, 1989 Agni-I test, 1998 Shakti) vs Political.', 'Step 3 — Answer this re-diagnostic: "Why did India label the 1974 test \'peaceful\' if it had weapon design?" (Answer:.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_05_008', difficulty: 'standard',
          question: 'This node examines the trajectories of democracy in Pakistan and Bangladesh.',
          hint: 'Revisit c11_ps_cbse_13_002 (parliamentary vs presidential) and c11_ps_cbse_15_006.',
          misconception: '**Misconception**: "Pakistan is a \'military state\' because of Islam; Bangladesh is \'more democratic\' because it\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This node examines the trajectories of democracy in Pakistan and Bangladesh, focusing on',
                  options: ['This node examines the trajectories of democracy in Pakistan and Bangladesh, focusing on', 'South Asia as a region refers to the geopolitical and cultural space comprising eight', 'The India-Pakistan conflicts refer to a series of military confrontations and diplomatic', 'The Bangladesh War of 1971 was a liberation conflict in'],
                  hint: 'Revisit c11_ps_cbse_13_002 (parliamentary vs presidential) and c11_ps_cbse_15_006 (judicial review).',
                  misconception: '**Misconception**: "Pakistan is a \'military state\' because of Islam; Bangladesh is \'more democratic\' because it\'s secular." **Reality**.' }
          ],
            remediations: { 'misconception-pakistan-is-a-military': { steps: ['If student conflates religion with military rule causation: (1) Revisit **c11_ps_cbse_07_003** (civic vs ethnic.', '(2) Analyze **Fauji Foundation annual reports** (open source) vs **Bangladesh Army Welfare Trust** — compare economic.', '(3) Re-read NCERT \'Contemporary South Asia\' pp.', '68-72 on \'Military and Democracy in Pakistan\' and \'Democracy in Bangladesh\' — highlight sentences on \'institutional.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_05_009', difficulty: 'standard',
          question: 'India\'s role and relations with its South Asian neighbours refers to the set.',
          hint: 'If unclear on the Gujral Doctrine, revisit the "India\'s Security Strategy" section.',
          misconception: 'Students often believe "Neighbourhood First" means India gives unilateral concessions to neighbours who then take them.',
          parts: [
                { id: 'a', prompt: 'Explain why the Indus Waters Treaty (1960) is often cited as a rare success of India-Pakistan cooperation despite multiple wars, and identify the third-party.', answer: 'The treaty succeeded',
                  options: ['The treaty succeeded', 'Neighbourhood First'],
                  hint: 'If unclear on the Gujral Doctrine, revisit the "India\'s Security Strategy" section in NCERT (page.',
                  misconception: 'Students often believe "Neighbourhood First" means India gives unilateral concessions to neighbours who then take them for granted.' },
                { id: 'b', prompt: 'Compare the drivers of India\'s relations with Bangladesh and Sri Lanka.', answer: 'India-Bangladesh relations began with India\'s military intervention leading to',
                  options: ['India-Bangladesh relations began with India\'s military intervention leading to', 'small neighbours with ethnic minorities', 'Neighbourhood First'],
                  hint: 'If unclear on the Gujral Doctrine, revisit the "India\'s Security Strategy" section in NCERT (page.',
                  misconception: 'Students often believe "Neighbourhood First" means India gives unilateral concessions to neighbours who then take them for granted.' }
          ],
            remediations: { 'neighbourhood-first-means-india-gives': { steps: ['If the student cannot distinguish between the Gujral Doctrine and Panchsheel, or cannot name three SAARC agreements.', '(2) Create a 2x4 matrix: rows = Pakistan, Bangladesh, Nepal, Sri Lanka; columns = the four components.', 'Fill each cell with one concrete example (e.g., Pakistan: military = LoC ceasefire 2021; institutional = Indus.', '(3) Re-attempt Diagnostic Question 3 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_05_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "Neighbourhood First" means India gives unilateral concessions to neighbours who then take them.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "SAARC has failed because it excludes contentious bilateral issues from its agenda." Use the SAARC Charter and at least two summit.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'totally useless', 'Neighbourhood First'],
                  hint: 'If unclear on the Gujral Doctrine, revisit the "India\'s Security Strategy" section in NCERT (page.',
                  misconception: 'Students often believe "Neighbourhood First" means India gives unilateral concessions to neighbours who then take them for granted.' },
                { id: 'b', prompt: 'Draft a three-point "Neighbourhood First 2.0" policy brief for the Indian Prime Minister that addresses: (a) the China factor in South Asia, (b).', answer: 'the China factor in South Asia, (',
                  options: ['the China factor in South Asia, (', 'Neighbourhood First'],
                  hint: 'If unclear on the Gujral Doctrine, revisit the "India\'s Security Strategy" section in NCERT (page.',
                  misconception: 'Students often believe "Neighbourhood First" means India gives unilateral concessions to neighbours who then take them for granted.' }
          ],
            remediations: { 'neighbourhood-first-means-india-gives': { steps: ['If the student cannot distinguish between the Gujral Doctrine and Panchsheel, or cannot name three SAARC agreements.', '(2) Create a 2x4 matrix: rows = Pakistan, Bangladesh, Nepal, Sri Lanka; columns = the four components.', 'Fill each cell with one concrete example (e.g., Pakistan: military = LoC ceasefire 2021; institutional = Indus.', '(3) Re-attempt Diagnostic Question 3 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_05_010', difficulty: 'standard',
          question: 'Conflicts over water, borders, and migration in South Asia refer to persistent.',
          hint: 'Revisit c11_ps_cbse_09_002 (human security), c11_ps_cbse_16_005 (Indian federalism), and.',
          misconception: 'Students often believe: "Water disputes in South Asia are purely technical problems that engineers can solve.',
          parts: [
                { id: 'a', prompt: 'Name the treaty that governs sharing of the Indus river system waters between India and Pakistan, specify the year it was signed, and identify which.', answer: 'The Indus Waters Treaty (IWT) was signed in 1960 and brokered by the World Bank',
                  options: ['The Indus Waters Treaty (IWT) was signed in 1960 and brokered by the World Bank', 'the Simla Agreement 1972 or the Ganges Treaty 1996'],
                  hint: 'Revisit c11_ps_cbse_09_002 (human security), c11_ps_cbse_16_005 (Indian federalism), and.',
                  misconception: 'Students often believe: "Water disputes in South Asia are purely technical problems that engineers can solve if politicians stop.' },
                { id: 'b', prompt: 'Explain why the Teesta water-sharing agreement between India and Bangladesh has remained unsigned since 2011 despite a draft being ready, and identify which.', answer: 'The Teesta agreement remains unsigned',
                  options: ['The Teesta agreement remains unsigned', 'Bangladesh\'s intransigence', 'India\'s big-brother attitude'],
                  hint: 'Revisit c11_ps_cbse_09_002 (human security), c11_ps_cbse_16_005 (Indian federalism), and.',
                  misconception: 'Students often believe: "Water disputes in South Asia are purely technical problems that engineers can solve if politicians stop.' }
          ],
            remediations: { 'water-disputes-in-south-asia': { steps: ['If the student holds the above misconception: Step 1 — Re-read the IWT text (Annexures C, D, E) to see how.', 'Step 2 — Study the 2011 Teesta draft agreement (available in MEA archives) and the West Bengal CM\'s 2011 letter to.', 'Step 3 — Map the Kalapani dispute using Survey of India maps (1816, 1879, 1947) and the 2019 Indian political map.', 'Step 4 — Re-attempt Diagnostic Question 3 and 4 with these primary sources.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
