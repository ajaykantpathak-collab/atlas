import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch05_p1: SimDef = {
    id: 'v3_c12_ps_ch05_p1',
    title: 'Contemporary South Asia · Part 1/2',
    subtitle: 'Eight neighbours, one Partition, and the deals that refuse to die',
    classLevel: 12, subject: 'political_science', topic: 'Contemporary South Asia · Part 1/2',
    chapters: ['c12_ps_ch05'],
    nodeIds: ['c12_ps_cbse_05_001', 'c12_ps_cbse_05_002', 'c12_ps_cbse_05_003', 'c12_ps_cbse_05_004', 'c12_ps_cbse_05_005', 'c12_ps_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Regional security analyst', intro: 'A family that inherited one house and argues over every room boundary — that\'s South Asia after 1947.', goal: 'Explain how Partition structured South Asian conflict and why asymmetric distrust defeats regional cooperation.' },
    discovery: {
        question: 'The Indus Waters Treaty has survived three India-Pakistan wars, yet SAARC — created to cooperate on everything — can barely hold a summit. Why does the narrow deal outlast the grand one?',
        options: ['The water treaty decouples a survival resource from politics with binding technical rules and a neutral broker, while SAARC\'s consensus rule lets any bilateral feud veto everything', 'SAARC members simply lack political will', 'The water treaty works because India and Pakistan are friends on water', 'SAARC failed because South Asia shares nothing in common'],
        answer: 'The water treaty decouples a survival resource from politics with binding technical rules and a neutral broker, while SAARC\'s consensus rule lets any bilateral feud veto everything',
        hook: 'Don\'t blame \'ancient religious hatreds\' — South Asia\'s conflicts are post-Partition state-building failures: a hastily drawn border, majoritarian nation-building and a giant neighbour whose defensive moves read as threats to everyone smaller.',
    },
    teaching: [
        { title: 'South Asia as a Region: Shared History and Conflicts', text: 'South Asia as a region refers to the geopolitical and cultural space comprising eight nations—India, Pakistan, Bangladesh, Nepal, Sri Lanka, Bhutan, Maldives, and Afghanistan—bound by shared.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_05_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map South Asia\'s fault lines from Partition onward — Kashmir, water, nuclear rivalry — and test why cooperation keeps failing where the security dilemma runs deepest.',
        labels: ['South Asia as', 'India-Pakistan Conflicts: Kashmir,', 'The Bangladesh War', 'Ethnic Conflict in Sri', 'Maoist Insurgency in Nepal', 'SAARC: Formation, Objectives'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_05_002', title: 'India-Pakistan Conflicts: Kashmir, the Wars of 1947, 1965 and 1971',
          caseStudy: { intro: 'Begin with a current news clip about a ceasefire violation on the Line of Control (LoC) in Kashmir.',
            decisions: [{ prompt: 'Which princely state\'s accession to India triggered the first India-Pakistan war in 1947, and what was the specific instrument used for.', options: [
                { text: 'The princely state was Jammu and Kashmir', outcome: 'The princely state was Jammu and Kashmir. Maharaja Hari Singh signed the Instrument of Accession.' },
                { text: 'India-Pakistan wars', outcome: 'Not quite — Students often believe the 1971 war was fought over Kashmir because all three wars are grouped.', reveals: 'the-1971-war-was-fought' },
                { text: 'distinguish the causes of the 1971 war from the earlier wars', outcome: 'Not quite — Students often believe the 1971 war was fought over Kashmir because all three wars are grouped.', reveals: 'the-1971-war-was-fought' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_05_003', title: 'The Bangladesh War of 1971 and Its Regional Impact',
          caseStudy: { intro: 'Imagine reading a 2024 news headline: "India and Bangladesh sign new water-sharing agreement on Kushiyara River." To understand why this matters, trace back.',
            decisions: [{ prompt: 'What was the immediate constitutional trigger for the 1971 crisis in Pakistan, and which party won the 1970 general elections with a clear.', options: [
                { text: 'The immediate trigger was President Yahya Khan\'s postponement of the National Assembly', outcome: 'The immediate trigger was President Yahya Khan\'s postponement of the National Assembly session.' },
                { text: 'Bhutto\'s PPP won', outcome: 'Not quite — Students often believe: "India won the 1971 war purely through military superiority." In reality.', reveals: 'india-won-the-1971-war' },
                { text: 'the crisis started with Indian invasion', outcome: 'Not quite — Students often believe: "India won the 1971 war purely through military superiority." In reality.', reveals: 'india-won-the-1971-war' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_05_004', title: 'Ethnic Conflict in Sri Lanka and the Tamil Question',
          caseStudy: { intro: 'Imagine a Class 12 student reading a news headline: "Sri Lanka\'s President promises \'13th Amendment implementation\' — again." Start by asking: "Why has.',
            decisions: [{ prompt: 'Identify the chronological order of these four pivotal events in Sri Lanka\'s ethnic conflict: (1) Sinhala Only Act, (2) Indo-Sri Lanka.', options: [
                { text: 'Correct order: 1948 Citizenship Act → 1956 Sinhala Only Act → 1976 Vaddukoddai Resolution', outcome: 'Correct order: 1948 Citizenship Act → 1956 Sinhala Only Act → 1976 Vaddukoddai Resolution → 1987.' },
                { text: 'the LTTE *caused* the ethnic conflict by starting violence in 1983', outcome: 'Not quite — Students often believe the LTTE *caused* the ethnic conflict by starting violence in 1983.', reveals: 'the-ltte-caused-the-ethnic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_05_006', title: 'SAARC: Formation, Objectives and Limitations of Regional Cooperation',
          caseStudy: { intro: 'Imagine you and seven neighbours share a backyard with a common water source, but two of you have a decades-old property dispute that sometimes turns violent.',
            decisions: [{ prompt: 'What year was SAARC established, where was its founding declaration signed, and how many founding members were there?', options: [
                { text: 'SAARC was established in 1985 with the signing of the Dhaka Declaration in Dhaka,', outcome: 'SAARC was established in 1985 with the signing of the Dhaka Declaration in Dhaka, Bangladesh, by 7.' },
                { text: 'Kathmandu', outcome: 'Not quite — Students think "SAARC is just a talk shop with no achievements." Reality: SAARC has created.', reveals: 'saarc-is-just-a-talk' },
                { text: '8 founding members', outcome: 'Not quite — Students think "SAARC is just a talk shop with no achievements." Reality: SAARC has created.', reveals: 'saarc-is-just-a-talk' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student presenting \'three Kashmir wars\' folds 1971 into the same Kashmir storyline as 1947-48 and 1965 — \'same neighbours, same cause, bigger scale.\'',
            decisions: [{ prompt: 'What\'s wrong with that framing?', options: [
                { text: '1971\'s cause was the East Pakistan crisis — the liberation movement, ten million refugees crossing into India and Pakistan\'s pre-emptive strikes; its outcome was Bangladesh and 93,000 POWs — a humanitarian-geopolitical rupture the Kashmir file doesn\'t explain.', outcome: 'The chapter separates causation: the first two wars were Kashmir-centred; 1971 redrew the map for a different reason — grouping them hides the event\'s actual logic.' },
                { text: 'The framing holds — every India-Pakistan war is ultimately about Kashmir.', outcome: 'The evidence says otherwise — East Pakistan\'s crisis, the refugee influx and Bangladesh\'s creation belong to a different causal chain; Kashmir was where the two earlier wars lived, not this one.', reveals: 'all-wars-are-kashmir' },
                { text: 'Half right — 1971 started over Kashmir and escalated into East Pakistan.', outcome: 'Sequence is the error — the war grew out of the eastern crisis and refugee emergency, not a western-front escalation; reversing cause and consequence scrambles the whole analysis.', reveals: 'sequence-reversed' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now explain why shared rivers and shared history haven\'t produced a South Asian EU — and why institutional design, not goodwill, decides which deals survive.',
            decisions: [{ prompt: 'What comes next? Contemporary South Asia · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Contemporary South Asia · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_05_001', difficulty: 'standard',
          question: 'South Asia as a region refers to the geopolitical and cultural space comprising.',
          hint: 'If unclear on why Partition still matters today, re-read **c10_hist_cbse_04_011** (focus.',
          misconception: '**Misconception**: "South Asia\'s conflicts are primarily religious (Hindu vs.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'South Asia as a region refers to the geopolitical and cultural space comprising eight',
                  options: ['South Asia as a region refers to the geopolitical and cultural space comprising eight', 'The India-Pakistan conflicts refer to a series of military confrontations and diplomatic', 'The Bangladesh War of 1971 was a liberation conflict in', 'Ethnic conflict in Sri Lanka refers to the protracted violent struggle (1983–2009)'],
                  hint: 'If unclear on why Partition still matters today, re-read **c10_hist_cbse_04_011** (focus.',
                  misconception: '**Misconception**: "South Asia\'s conflicts are primarily religious (Hindu vs.' }
          ],
            remediations: { 'misconception-south-asia-s-conflicts': { steps: ['If student persists in "ancient hatreds" narrative: 1.', 'Revisit **c10_hist_cbse_02_008** (Civil Disobedience Movement: Hindu-Muslim unity) and **c10_hist_cbse_04_011**.', 'Study **c11_ps_cbse_07_003** (Civic vs ethnic nationalism) to understand how **state choices** (not primordial.', 'Re-diagnostic: "Explain why the 1971 Bangladesh War—fought between two Muslim-majority wings of Pakistan—refutes the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_05_002', difficulty: 'standard',
          question: 'The India-Pakistan conflicts refer to a series of military confrontations and.',
          hint: 'If stuck, revisit the "Integration of Princely States" (c6_history_ch12_052) and the.',
          misconception: 'Students often believe the 1971 war was fought over Kashmir because all three wars are grouped as "India-Pakistan.',
          parts: [
                { id: 'a', prompt: 'Which princely state\'s accession to India triggered the first India-Pakistan war in 1947, and what was the specific instrument used for accession?', answer: 'The princely state was Jammu and Kashmir',
                  options: ['The princely state was Jammu and Kashmir', 'India-Pakistan wars', 'distinguish the causes of the 1971 war from the earlier wars', 'Junagadh or Hyderabad'],
                  hint: 'If stuck, revisit the "Integration of Princely States" (c6_history_ch12_052) and the "Two-Nation.',
                  misconception: 'Students often believe the 1971 war was fought over Kashmir because all three wars are grouped as "India-Pakistan wars." In reality, the.' },
                { id: 'b', prompt: 'Explain why the 1965 war did not result in a decisive territorial change despite heavy fighting, and identify the international agreement that ended it.', answer: 'The 1965 war ended in a military stalemate',
                  options: ['The 1965 war ended in a military stalemate', 'India-Pakistan wars', 'distinguish the causes of the 1971 war from the earlier wars'],
                  hint: 'If stuck, revisit the "Integration of Princely States" (c6_history_ch12_052) and the "Two-Nation.',
                  misconception: 'Students often believe the 1971 war was fought over Kashmir because all three wars are grouped as "India-Pakistan wars." In reality, the.' },
                { id: 'c', prompt: 'A student argues: "The 1971 war was just an extension of the Kashmir dispute." Using evidence from the war\'s causes and outcomes, evaluate this claim.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'India-Pakistan wars', 'distinguish the causes of the 1971 war from the earlier wars'],
                  hint: 'If stuck, revisit the "Integration of Princely States" (c6_history_ch12_052) and the "Two-Nation.',
                  misconception: 'Students often believe the 1971 war was fought over Kashmir because all three wars are grouped as "India-Pakistan wars." In reality, the.' }
          ],
            remediations: { 'the-1971-war-was-fought': { steps: ['If a student cannot distinguish the causes of the three wars, have them create a three-column table: War | Primary.', 'Use NCERT Class 12 "Contemporary World Politics" Chapter 3 (Contemporary South Asia) pages 45-52.', 'Then re-attempt Diagnostic Questions 2 and 3.', 'If confusion persists on UN roles, review UNSC Resolutions 47 (1948) and 211 (1965) from the textbook\'s appendix.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the 1971 war was fought over Kashmir because all three wars are grouped as "India-Pakistan.',
          parts: [
                { id: 'a', prompt: 'Assess the argument: "India\'s victory in 1971 established it as the undisputed regional hegemon in South Asia." Consider both military and diplomatic.', answer: 'The argument is partially valid but overstated',
                  options: ['The argument is partially valid but overstated', 'India-Pakistan wars', 'distinguish the causes of the 1971 war from the earlier wars'],
                  hint: 'If stuck, revisit the "Integration of Princely States" (c6_history_ch12_052) and the "Two-Nation.',
                  misconception: 'Students often believe the 1971 war was fought over Kashmir because all three wars are grouped as "India-Pakistan wars." In reality, the.' }
          ],
            remediations: { 'the-1971-war-was-fought': { steps: ['If a student cannot distinguish the causes of the three wars, have them create a three-column table: War | Primary.', 'Use NCERT Class 12 "Contemporary World Politics" Chapter 3 (Contemporary South Asia) pages 45-52.', 'Then re-attempt Diagnostic Questions 2 and 3.', 'If confusion persists on UN roles, review UNSC Resolutions 47 (1948) and 211 (1965) from the textbook\'s appendix.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_05_003', difficulty: 'standard',
          question: 'The Bangladesh War of 1971 was a liberation conflict in which East Pakistan.',
          hint: 'If stuck, revisit c12_ps_cbse_05_002 (1947/1965 wars context) and c11_ps_cbse_16_005.',
          misconception: 'Students often believe: "India won the 1971 war purely through military superiority." In reality, India\'s victory.',
          parts: [
                { id: 'a', prompt: 'Why did India sign the Indo-Soviet Treaty of Peace, Friendship and Cooperation in August 1971, months before the war? Explain the strategic logic.', answer: 'India signed the treaty to deter Chinese and US intervention on Pakistan\'s side',
                  options: ['India signed the treaty to deter Chinese and US intervention on Pakistan\'s side', 'India wanted Soviet arms', 'it was ideological', 'India won the 1971 war purely through military superiority'],
                  hint: 'If stuck, revisit c12_ps_cbse_05_002 (1947/1965 wars context) and c11_ps_cbse_16_005 (federalism.',
                  misconception: 'Students often believe: "India won the 1971 war purely through military superiority." In reality, India\'s victory resulted from.' },
                { id: 'b', prompt: 'A student argues: "India intervened in East Pakistan only because of the refugee burden; without 10 million refugees, India would have stayed out." Evaluate.', answer: 'The claim is partially true but incomplete',
                  options: ['The claim is partially true but incomplete', 'India won the 1971 war purely through military superiority'],
                  hint: 'If stuck, revisit c12_ps_cbse_05_002 (1947/1965 wars context) and c11_ps_cbse_16_005 (federalism.',
                  misconception: 'Students often believe: "India won the 1971 war purely through military superiority." In reality, India\'s victory resulted from.' },
                { id: 'c', prompt: 'Compare the 1971 war\'s outcome with the 1965 India-Pakistan war (covered in c12_ps_cbse_05_002) in terms of: (a) territorial changes, (b) strategic doctrine.', answer: 'territorial changes, (',
                  options: ['territorial changes, (', 'stalemates', 'India won the 1971 war purely through military superiority'],
                  hint: 'If stuck, revisit c12_ps_cbse_05_002 (1947/1965 wars context) and c11_ps_cbse_16_005 (federalism.',
                  misconception: 'Students often believe: "India won the 1971 war purely through military superiority." In reality, India\'s victory resulted from.' }
          ],
            remediations: { 'india-won-the-1971-war': { steps: ['If a student holds the "military-only" misconception: (1) Revisit c12_ps_cbse_05_002\'s section on 1965 war — compare.', '(2) Map India\'s 1971 diplomatic calendar: April (Mukti Bahini training starts), August (Indo-Soviet Treaty), Oct–Nov.', 'Ask: "Which step could India have skipped and still won?" (3) Read the Shimla Agreement text (Appendix, NCERT).', 'Ask: "Where does it say \'Kashmir solved\'?" (4) Re-diagnostic: "Explain why India returned 93,000 PoWs without a Kashmir.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_05_004', difficulty: 'standard',
          question: 'Ethnic conflict in Sri Lanka refers to the protracted violent struggle.',
          hint: 'Revisit c10_civ_cbse_01_002 and c10_civ_cbse_01_007; specifically the table comparing.',
          misconception: 'Students often believe the LTTE *caused* the ethnic conflict by starting violence in 1983.',
          parts: [
                { id: 'a', prompt: 'A Sri Lankan Tamil youth in 1977 joins the LTTE after the anti-Tamil pogrom.', answer: 'Non-violent politics failed',
                  options: ['Non-violent politics failed', 'the LTTE *caused* the ethnic conflict by starting violence in 1983'],
                  hint: 'Revisit c10_civ_cbse_01_002 and c10_civ_cbse_01_007; specifically the table comparing Belgium\'s.',
                  misconception: 'Students often believe the LTTE *caused* the ethnic conflict by starting violence in 1983.' }
          ],
            remediations: { 'the-ltte-caused-the-ethnic': { steps: ['If the student cannot trace the causal chain from majoritarian laws to militarization, assign: (1) Re-read Class 10.', 'Sri Lanka comparison table.', '(2) Create a timeline (1948–1983) with two columns: "State Action" and "Tamil Response" — fill using NCERT Class 12.', '(3) Re-attempt Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_05_005', difficulty: 'standard',
          question: 'The Maoist Insurgency in Nepal (1996–2006) was a decade-long armed conflict.',
          hint: 'Review c9_civ_ch1_4 (democracy principles) and c11_ps_cbse_10_003 (constitution as living.',
          misconception: 'Students often believe the Maoist insurgency ended solely because of the 2006 Comprehensive Peace Agreement.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Maoist Insurgency in Nepal (1996–2006) was a decade-long armed conflict launched by',
                  options: ['The Maoist Insurgency in Nepal (1996–2006) was a decade-long armed conflict launched by', 'South Asia as a region refers to the geopolitical and cultural space comprising eight', 'The India-Pakistan conflicts refer to a series of military confrontations and diplomatic', 'The Bangladesh War of 1971 was a liberation conflict in'],
                  hint: 'Review c9_civ_ch1_4 (democracy principles) and c11_ps_cbse_10_003 (constitution as living document).',
                  misconception: 'Students often believe the Maoist insurgency ended solely because of the 2006 Comprehensive Peace Agreement, overlooking the fact that the.' }
          ],
            remediations: { 'the-maoist-insurgency-ended-solely': { steps: ['Revisit the timeline: create a 1996–2008 flowchart with three parallel tracks — Maoist military actions, Parliamentary.', 'Read the 12-Point Understanding (Nov 2005) text (available in NCERT supplementary material) to see how SPA and Maoists.', 'Watch the 15-minute documentary "Nepal: From Monarchy to Republic" (Election Commission of Nepal) and note the role.', 'Re-attempt Diagnostic Question 2 and 5 after this review.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_05_006', difficulty: 'standard',
          question: 'SAARC (South Asian Association for Regional Cooperation) is.',
          hint: 'Revisit c12_ps_cbse_05_002 (India-Pakistan wars) and identify which specific disputes.',
          misconception: 'Students think "SAARC is just a talk shop with no achievements." Reality: SAARC has created tangible frameworks — South.',
          parts: [
                { id: 'a', prompt: 'A SAARC summit is scheduled. India proposes a regional motor vehicles agreement to ease cross-border transport.', answer: 'No agreement will be signed',
                  options: ['No agreement will be signed', 'SAARC is just a talk shop with no achievements', '"SAARC is just a talk shop with no achievements'],
                  hint: 'Revisit c12_ps_cbse_05_002 (India-Pakistan wars) and identify which specific disputes (Kashmir.',
                  misconception: 'Students think "SAARC is just a talk shop with no achievements." Reality: SAARC has created tangible frameworks — South Asian University.' }
          ],
            remediations: { 'saarc-is-just-a-talk': { steps: ['If the student believes SAARC has "zero achievements," have them: (1) Visit the SAARC Secretariat website.', '(2) Compare SAARC Food Bank\'s 2020 COVID-19 response (released 8,800 MT to members) with the theoretical "zero.', '(3) Re-read c12_ps_cbse_05_001\'s section on "shared history" — the very existence of a platform where all 8 leaders.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
