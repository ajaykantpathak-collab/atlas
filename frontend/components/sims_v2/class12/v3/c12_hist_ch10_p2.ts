import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch10_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch10_p2: SimDef = {
    id: 'v3_c12_hist_ch10_p2',
    title: 'Rebels and the Raj (1857 Revolt) · Part 2/2',
    subtitle: 'The cartridge was the proof; the grievance was older',
    classLevel: 12, subject: 'history', topic: 'Rebels and the Raj (1857 Revolt) · Part 2/2',
    chapters: ['c12_hist_ch10'],
    nodeIds: ['c12_hist_cbse_10_007', 'c12_hist_cbse_10_008', 'c12_hist_cbse_10_009', 'c12_hist_cbse_10_010', 'c12_hist_cbse_10_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Rebellion historian', intro: '85 sepoys shackled at dawn; by nightfall the army was marching on Delhi. The fuse had been laid for years.', goal: 'Analyse the 1857 outbreak — rumour\'s power, the cantonment pattern, and leadership thrust onto reluctant thrones.' },
    discovery: {
        question: 'A rumour about greased cartridges survived every British denial and detonated an empire\'s army. Why did one cartridge carry so much?',
        options: ['It confirmed a decade of lived suspicion — annexations, missionary schools, \'reform\' had already convinced people their world was under attack; the cartridge was the tangible proof', 'Sepoys were superstitious', 'Officers were rude', 'It was a foreign plot'],
        answer: 'It confirmed a decade of lived suspicion — annexations, missionary schools, \'reform\' had already convinced people their world was under attack; the cartridge was the tangible proof',
        hook: '1857 ran on networks — regimental lines, chapati chains, fakirs\' prophecies — and the pattern repeated: seize the bell of arms, cut the telegraph, march to the nearest throne. Leaders didn\'t plan it; sepoys thrust legitimacy onto Bahadur Shah, Nana Sahib and the Rani.',
    },
    teaching: [
        { title: 'British Repression: The Relief of Delhi, Lucknow and the Counter-Offensive', text: 'British repression of the 1857 revolt refers to the coordinated military, legal, and psychological campaign launched by the East India Company from June 1857 to March 1858 to reconquer Delhi.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_10_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the uprising\'s machinery: trace the rumour through three networks, map the cantonment-by-cantonment pattern, and weigh whether the proclamations promised revolution or restoration.',
        labels: ['British Repression: The Relief', 'The Revolt in', 'The Role of Rumours', 'Why the Revolt Failed', 'The Aftermath: Queen\'s Proclamation'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_10_007', title: 'British Repression: The Relief of Delhi, Lucknow and the Counter-Offensive',
          caseStudy: { intro: 'Imagine standing on the Delhi Ridge in July 1857: a small British force, decimated by cholera and heat, besieging a city held by thousands of rebels who.',
            decisions: [{ prompt: 'Which specific legal measures did the British enact in May–June 1857 to facilitate repression, and what was their effect on ordinary.', options: [
                { text: 'The British passed a series of Acts in May–June 1857 placing North India under martial', outcome: 'The British passed a series of Acts in May–June 1857 placing North India under martial law and.' },
                { text: 'they used existing Indian Penal Code', outcome: 'Not quite — Students often think British repression was purely military — "they had better guns and won.".', reveals: 'british-repression-was-purely-military' },
                { text: 'they had better guns and won', outcome: 'Not quite — Students often think British repression was purely military — "they had better guns and won.".', reveals: 'british-repression-was-purely-military' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_10_008', title: 'The Revolt in the Countryside: Attack on Telegraph, Revenue Records and Symbols of Power',
          caseStudy: { intro: 'Imagine standing in a village in western Uttar Pradesh in June 1857: the telegraph wire that once hummed with British orders lies cut, the patwari\'s revenue.',
            decisions: [{ prompt: 'What were the three main categories of British "symbols of power" attacked by rebels in the countryside, as described in the NCERT chapter?', options: [
                { text: 'The three main categories were: (1) communication infrastructure', outcome: 'The three main categories were: (1) communication infrastructure — telegraph lines and offices; (2).' },
                { text: 'only military targets', outcome: 'Not quite — Students often believe the countryside revolt was a spontaneous, leaderless "peasant jacquerie".', reveals: 'the-countryside-revolt-was-a' },
                { text: 'only religious sites', outcome: 'Not quite — Students often believe the countryside revolt was a spontaneous, leaderless "peasant jacquerie".', reveals: 'the-countryside-revolt-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_10_009', title: 'The Role of Rumours: Cartridges, Bone Grease and the Prophecy of 100 Years',
          caseStudy: { intro: 'Imagine you hear a WhatsApp forward today claiming a new government policy will secretly contaminate your food with something religiously forbidden — would you.',
            decisions: [{ prompt: 'What was the specific incident at Dum Dum in January 1857 that the NCERT identifies as the traceable origin of the greased-cartridge rumour?', options: [
                { text: 'A "low-caste" khalasi (magazine worker) asked a Brahmin sepoy for water from his lota', outcome: 'A "low-caste" khalasi (magazine worker) asked a Brahmin sepoy for water from his lota; the sepoy.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students think the greased-cartridge rumour was *the cause* of the 1857 revolt.', reveals: 'the-greased-cartridge-rumour-was' },
                { text: 'the greased-cartridge rumour was *the cause* of the 1857 revolt', outcome: 'Not quite — Students think the greased-cartridge rumour was *the cause* of the 1857 revolt.', reveals: 'the-greased-cartridge-rumour-was' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_10_010', title: 'Why the Revolt Failed: Lack of Unity, Modern Communication and British Resources',
          caseStudy: { intro: 'Imagine you are standing at the Red Fort in Delhi today. The same walls that saw Bahadur Shah Zafar reluctantly accept the sepoys\' plea in May 1857 also.',
            decisions: [{ prompt: 'In which month and year did the British finally recapture Delhi after the 1857 Revolt began?', options: [
                { text: 'The British recaptured Delhi in late September 1857, nearly five months after the mutiny', outcome: 'The British recaptured Delhi in late September 1857, nearly five months after the mutiny began.' },
                { text: 'June 1857', outcome: 'Not quite — Students often believe the 1857 Revolt failed primarily because of "lack of unity" in a vague.', reveals: 'the-1857-revolt-failed-primarily' },
                { text: 'lack of unity', outcome: 'Not quite — Students often believe the 1857 Revolt failed primarily because of "lack of unity" in a vague.', reveals: 'the-1857-revolt-failed-primarily' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_10_011', title: 'The Aftermath: Queen\'s Proclamation (1858), End of Company Rule and the New Raj',
          caseStudy: { intro: 'Imagine standing at the Red Fort in Delhi on November 1, 1858, as a town crier reads the Queen\'s Proclamation in Hindi and Urdu — the same fort where Bahadur.',
            decisions: [{ prompt: 'What was the immediate constitutional change brought about by the Government of India Act (1858) regarding the governance of India?', options: [
                { text: 'The Government of India Act (1858) abolished the East India Company and transferred its', outcome: 'The Government of India Act (1858) abolished the East India Company and transferred its powers.' },
                { text: 'the Company retained trade monopoly', outcome: 'Not quite — Students often believe the Queen\'s Proclamation (1858) immediately granted Indians significant.', reveals: 'the-queen-s-proclamation-1858' },
                { text: 'the Viceroy was elected', outcome: 'Not quite — Students often believe the Queen\'s Proclamation (1858) immediately granted Indians significant.', reveals: 'the-queen-s-proclamation-1858' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'After identical flash protests erupt at a dozen colleges in one week — same signal, same slogans, same sequence — a dean insists \'it was clearly all spontaneous imitation, so there\'s no organiser to talk to.\'',
            decisions: [{ prompt: 'What does the 1857 spread tell you about \'spontaneous\' identical patterns?', options: [
                { text: 'The pattern is the coordination — cantonments repeated signal → arms → treasury → proclamations because regiments wrote to each other, emissaries moved, and nightly panchayats decided; identical steps across distance are a network\'s fingerprint, not proof of no one talking.', outcome: 'The chapter\'s evidence: sepoy letters and panchayats are documented — \'spontaneous\' is how coordination looks from outside when the channels are informal.' },
                { text: 'Agree — if there\'s no single mastermind, it was spontaneous.', outcome: '1857 had no mastermind either — Bahadur Shah and Nana Sahib were pushed into leadership by the sepoys; distributed coordination through networks still leaves a structure to read.', reveals: 'no-leader-equals-no-plan' },
                { text: 'Conclude the opposite — an identical pattern must mean a single central command.', outcome: 'That over-corrects: the revolt\'s channels were lateral — regiment to regiment, panchayat to panchayat — coordination without a commander; \'one pattern\' doesn\'t require \'one hand.\'', reveals: 'pattern-equals-command' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_10_011', title: 'You made it',
          caseStudy: { intro: 'You can now read 1857 as structure, not spark — grievance, network and symbol converging into rebellion.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_007', difficulty: 'standard',
          question: 'British repression of the 1857 revolt refers to the coordinated military.',
          hint: 'If unsure about revolt geography or leadership, revisit c12_hist_cbse_10_002 (Spread.',
          misconception: 'Students often think British repression was purely military — "they had better guns and won." In reality, the British.',
          parts: [
                { id: 'a', prompt: 'Why did the British choose a two-pronged attack on Delhi (from Punjab and Calcutta) rather than a single advance, and what does this reveal about their.', answer: 'The Punjab was largely peaceful and provided a secure base with Sikh and Punjabi',
                  options: ['The Punjab was largely peaceful and provided a secure base with Sikh and Punjabi', 'they attacked from all sides', 'they had better guns and won', 'British repression was purely military'],
                  hint: 'If unsure about revolt geography or leadership, revisit c12_hist_cbse_10_002 (Spread of Revolt) and.',
                  misconception: 'Students often think British repression was purely military — "they had better guns and won." In reality, the British *almost lost Delhi*.' }
          ],
            remediations: { 'british-repression-was-purely-military': { steps: ['If the student conflates military events with political strategy: (1) Re-read NCERT pages 275–276 (Section 4.', '(2) Re-read pages 279–282 (Section 5.3–5.5) and list three visual sources showing terror *performed for British.', '(3) Re-attempt Diagnostic Questions 4 and 5, which specifically test the non-military dimensions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_008', difficulty: 'standard',
          question: 'The Revolt in the Countryside refers to the widespread popular uprising.',
          hint: 'If stuck, revisit c8_hist_ch3_8 (British revenue systems) and c12_hist_cbse_10_006 (Awadh.',
          misconception: 'Students often believe the countryside revolt was a spontaneous, leaderless "peasant jacquerie" driven only by economic.',
          parts: [
                { id: 'a', prompt: 'What were the three main categories of British "symbols of power" attacked by rebels in the countryside, as described in the NCERT chapter?', answer: 'The three main categories were: (1) communication infrastructure',
                  options: ['The three main categories were: (1) communication infrastructure', 'only military targets', 'only religious sites', 'peasant jacquerie'],
                  hint: 'If stuck, revisit c8_hist_ch3_8 (British revenue systems) and c12_hist_cbse_10_006 (Awadh.',
                  misconception: 'Students often believe the countryside revolt was a spontaneous, leaderless "peasant jacquerie" driven only by economic distress.' },
                { id: 'b', prompt: 'Compare Shah Mal\'s mobilisation in Barout (pargana Barout, UP) with Maulvi Ahmadullah Shah\'s movement in Awadh.', answer: 'Similarities: (1) Both used existing kinship/religious networks',
                  options: ['Similarities: (1) Both used existing kinship/religious networks', 'local leaders', 'peasant jacquerie'],
                  hint: 'If stuck, revisit c8_hist_ch3_8 (British revenue systems) and c12_hist_cbse_10_006 (Awadh.',
                  misconception: 'Students often believe the countryside revolt was a spontaneous, leaderless "peasant jacquerie" driven only by economic distress.' },
                { id: 'c', prompt: 'Analyze the Azamgarh Proclamation (Source 5) as a historical source.', answer: 'The sectional structure reveals a deliberate attempt to construct a cross-class,',
                  options: ['The sectional structure reveals a deliberate attempt to construct a cross-class,', 'just a list of complaints', 'peasant jacquerie'],
                  hint: 'If stuck, revisit c8_hist_ch3_8 (British revenue systems) and c12_hist_cbse_10_006 (Awadh.',
                  misconception: 'Students often believe the countryside revolt was a spontaneous, leaderless "peasant jacquerie" driven only by economic distress.' }
          ],
            remediations: { 'the-countryside-revolt-was-a': { steps: ['If the student holds the "spontaneous peasant jacquerie" misconception: (1) Re-read the Shah Mal case study (NCERT pp.', '263–64) and list his organisational actions: night mobilisation across 84 villages, intelligence network, "hall.', '(2) Compare with the Azamgarh Proclamation\'s five sections — identify which social group each addresses and what.', '(3) Re-do Diagnostic Question 3 focusing on leadership methods.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_009', difficulty: 'standard',
          question: 'The "Role of Rumours" refers to the critical function that unverified.',
          hint: 'If unable to list policies, revisit c12_hist_cbse_10_006 (Annexation of Awadh) and.',
          misconception: 'Students think the greased-cartridge rumour was *the cause* of the 1857 revolt.',
          parts: [
                { id: 'a', prompt: 'Why did the rumour that the British had mixed bone dust of cows and pigs into market flour (atta) spread so rapidly in cantonments and towns despite British.', answer: 'The rumour resonated',
                  options: ['The rumour resonated', 'people were ignorant/superstitious', 'circulate only when they resonate with deeper fears', 'the greased-cartridge rumour was *the cause* of the 1857 revolt'],
                  hint: 'If unable to list policies, revisit c12_hist_cbse_10_006 (Annexation of Awadh) and c8_hist_ch4_2.',
                  misconception: 'Students think the greased-cartridge rumour was *the cause* of the 1857 revolt.' },
                { id: 'b', prompt: 'Compare the chapati circulation (described in NCERT pp. 264–65) with the sepoy emissaries carrying letters between cantonments (e.g., 7th Awadh Irregular.', answer: 'Chapati circulation was a *horizontal, opaque, village-level* network',
                  options: ['Chapati circulation was a *horizontal, opaque, village-level* network', 'both spread the same message', 'the greased-cartridge rumour was *the cause* of the 1857 revolt'],
                  hint: 'If unable to list policies, revisit c12_hist_cbse_10_006 (Annexation of Awadh) and c8_hist_ch4_2.',
                  misconception: 'Students think the greased-cartridge rumour was *the cause* of the 1857 revolt.' }
          ],
            remediations: { 'the-greased-cartridge-rumour-was': { steps: ['If the student cannot distinguish trigger from structural cause: (1) Re-read NCERT pp.', '265–66 "Why did people believe in the rumours?" — underline every British policy mentioned (Bentinck\'s reforms.', '(2) Create a two-column table: Column A = "British Policy 1820s–1856", Column B = "Fear it Generated".', '(3) Re-attempt Diagnostic Question 6 using the table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_010', difficulty: 'standard',
          question: 'The failure of the 1857 Revolt refers to the inability of the Indian rebel.',
          hint: 'If unclear on the narrative, revisit c12_hist_cbse_10_001 (Meerut), c12_hist_cbse_10_002.',
          misconception: 'Students often believe the 1857 Revolt failed primarily because of "lack of unity" in a vague, moral sense — e.g.',
          parts: [
                { id: 'a', prompt: 'A student argues: "The rebels lost because they lacked modern weapons like the Enfield rifle." Using evidence from the NCERT chapter, explain why this.', answer: 'The Enfield rifle was indeed a British advantage, but the NCERT text emphasizes',
                  options: ['The Enfield rifle was indeed a British advantage, but the NCERT text emphasizes', 'lack of unity', 'Hindus and Muslims didn\'t cooperate', 'princes betrayed the cause'],
                  hint: 'If unclear on the narrative, revisit c12_hist_cbse_10_001 (Meerut), c12_hist_cbse_10_002 (Spread).',
                  misconception: 'Students often believe the 1857 Revolt failed primarily because of "lack of unity" in a vague, moral sense — e.g., "Hindus and Muslims.' }
          ],
            remediations: { 'the-1857-revolt-failed-primarily': { steps: ['If the student conflates "lack of unity" with communal division or betrayal: 1.', 'Re-read NCERT pages 271–272 (Section 3.1 "The vision of unity") and 277–278 (Section 4 "Repression") to identify THREE.', 'Create a two-column table: "Rebel Capabilities" vs.', '"British Capabilities" for command, communication, logistics, finance, diplomacy.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the 1857 Revolt failed primarily because of "lack of unity" in a vague, moral sense — e.g.',
          parts: [
                { id: 'a', prompt: 'Historian Eric Stokes argues the 1857 Revolt was "a traditionalist movement that failed because it looked backward to a vanished world." Evaluate this.', answer: 'Stokes\' interpretation is PARTIALLY valid but incomplete',
                  options: ['Stokes\' interpretation is PARTIALLY valid but incomplete', 'lack of unity', 'Hindus and Muslims didn\'t cooperate', 'princes betrayed the cause'],
                  hint: 'If unclear on the narrative, revisit c12_hist_cbse_10_001 (Meerut), c12_hist_cbse_10_002 (Spread).',
                  misconception: 'Students often believe the 1857 Revolt failed primarily because of "lack of unity" in a vague, moral sense — e.g., "Hindus and Muslims.' }
          ],
            remediations: { 'the-1857-revolt-failed-primarily': { steps: ['If the student conflates "lack of unity" with communal division or betrayal: 1.', 'Re-read NCERT pages 271–272 (Section 3.1 "The vision of unity") and 277–278 (Section 4 "Repression") to identify THREE.', 'Create a two-column table: "Rebel Capabilities" vs.', '"British Capabilities" for command, communication, logistics, finance, diplomacy.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_011', difficulty: 'standard',
          question: 'The Queen\'s Proclamation of 1858, issued by Queen Victoria on November 1, 1858.',
          hint: 'If unclear on the revolt\'s course or British victory factors, revisit.',
          misconception: 'Students often believe the Queen\'s Proclamation (1858) immediately granted Indians significant political rights.',
          parts: [
                { id: 'a', prompt: 'Why did the Queen\'s Proclamation explicitly promise "respect for the rights, dignity, and honour of native princes" and guarantee the sanctity of treaties with.', answer: 'The promise aimed to secure the loyalty of princely states',
                  options: ['The promise aimed to secure the loyalty of princely states', 'because the British genuinely respected Indian sovereignty', 'Magna Carta'],
                  hint: 'If unclear on the revolt\'s course or British victory factors, revisit c12_hist_cbse_10_001 (Meerut.',
                  misconception: 'Students often believe the Queen\'s Proclamation (1858) immediately granted Indians significant political rights, equality in government.' },
                { id: 'b', prompt: 'A historian argues: "The Queen\'s Proclamation\'s promise of \'equal admission to offices under the Crown\' without distinction of race or creed was a genuine step.', answer: 'The claim is largely false in practice',
                  options: ['The claim is largely false in practice', 'Magna Carta'],
                  hint: 'If unclear on the revolt\'s course or British victory factors, revisit c12_hist_cbse_10_001 (Meerut.',
                  misconception: 'Students often believe the Queen\'s Proclamation (1858) immediately granted Indians significant political rights, equality in government.' }
          ],
            remediations: { 'the-queen-s-proclamation-1858': { steps: ['If the student conflates the Proclamation\'s promises with actual practice: (1) Re-read the Government of India Act 1858.', '(2) Compare the 1858 Proclamation with the 1861 Indian Councils Act — note the absence of elected Indian members.', '(3) Analyze the 1859 Peel Commission Report recommendations on army composition — see how "martial race" theory.', '(4) Re-attempt Diagnostic Question 3 and 5 with this evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
