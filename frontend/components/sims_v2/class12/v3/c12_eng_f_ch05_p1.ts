import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch05_p1: SimDef = {
    id: 'v3_c12_eng_f_ch05_p1',
    title: 'Indigo · Part 1/3',
    subtitle: 'The court case Gandhi lost on purpose — and won a movement',
    classLevel: 12, subject: 'eng_f', topic: 'Indigo · Part 1/3',
    chapters: ['c12_eng_f_ch05'],
    nodeIds: ['c12_eng_f_cbse_05_001', 'c12_eng_f_cbse_05_002', 'c12_eng_f_cbse_05_003', 'c12_eng_f_cbse_05_004', 'c12_eng_f_cbse_05_005', 'c12_eng_f_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Historical biographer', intro: 'A sharecropper walked to Lucknow to fetch a lawyer. What came back was a method that would free a nation.', goal: 'Understand the Champaran satyagraha\'s economic roots and Gandhi\'s discovery that fearlessness precedes law.' },
    discovery: {
        question: 'Gandhi arrives in Champaran, disobeys a court order, pleads guilty — and the case collapses. Students call him \'a brilliant courtroom strategist.\' What did he actually discover?',
        options: ['Courts were useless for fear-stricken peasants — the real relief was freedom from fear, won by mass civil disobedience outside the courtroom', 'Exactly — he won on a legal technicality', 'The judge was bribed', 'The peasants hired better lawyers'],
        answer: 'Courts were useless for fear-stricken peasants — the real relief was freedom from fear, won by mass civil disobedience outside the courtroom',
        hook: 'Champaran began as humanitarian relief — peasants forced to grow indigo on 3/20 of their land, then charged compensation when synthetic dye made it worthless — and became political only under repression. It was a satyagraha template, not a lawsuit.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a pre-reading strategy that equips students with the historical, biographical, and conceptual framework necessary to comprehend the chapter "Indigo".', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Reconstruct the first satyagraha: decode the tinkathia trap and the synthetic-indigo squeeze, weigh the professor who dared shelter Gandhi, then watch fearlessness — not litigation — bend an empire.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are visiting a museum exhibit on India\'s freedom struggle and see a display titled "Champaran 1917: The First Satyagraha." You would first read the.',
            decisions: [{ prompt: 'Who was Louis Fischer, and why is his authorship significant for the credibility of the chapter "Indigo"?', options: [
                { text: 'Louis Fischer (1896–1970) was an American journalist who wrote for *The New York Times*', outcome: 'Louis Fischer (1896–1970) was an American journalist who wrote for *The New York Times* and *The.' },
                { text: 'He was Gandhi\'s secretary', outcome: 'Not quite — **Misconception:** "The chapter \'Indigo\' is primarily about the *crop* indigo — its cultivation.', reveals: 'misconception-the-chapter-indigo-is' },
                { text: 'He was an Indian freedom fighter', outcome: 'Not quite — **Misconception:** "The chapter \'Indigo\' is primarily about the *crop* indigo — its cultivation.', reveals: 'misconception-the-chapter-indigo-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re describing a movie to a friend who missed it — you wouldn\'t just list random scenes; you\'d give the setup, the conflict, the turning points, the.',
            decisions: [{ prompt: 'What is the narrative frame that opens "Indigo," and in which year does the main narrative (the flashback) begin?', options: [
                { text: 'The narrative opens with Fischer visiting Gandhi in 1942 at Sevagram, where Gandhi says', outcome: 'The narrative opens with Fischer visiting Gandhi in 1942 at Sevagram, where Gandhi says he will.' },
                { text: 'how does the author begin the narrative?', outcome: 'Not quite — Students treat "plot" and "narrative structure" as synonyms and write a simple story summary for.', reveals: 'students-treat-plot-and-narrative' },
                { text: 'sequence of events', outcome: 'Not quite — Students treat "plot" and "narrative structure" as synonyms and write a simple story summary for.', reveals: 'students-treat-plot-and-narrative' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are a lawyer preparing a case: your "client" is Gandhi, and the "evidence" is the text of "Indigo." You don\'t just list adjectives — you prove each.',
            decisions: [{ prompt: 'Identify the specific action Gandhi takes immediately after being served the official notice to quit Champaran, and state what this action.', options: [
                { text: 'Gandhi signs the receipt for the notice but writes on it that he will disobey the order', outcome: 'Gandhi signs the receipt for the notice but writes on it that he will disobey the order.' },
                { text: 'he tore up the notice', outcome: 'Not quite — Students often treat Gandhi as a "saintly figure" and list generic virtues (honest, brave, kind).', reveals: 'students-often-treat-gandhi-as' },
                { text: 'he left immediately', outcome: 'Not quite — Students often treat Gandhi as a "saintly figure" and list generic virtues (honest, brave, kind).', reveals: 'students-often-treat-gandhi-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re watching a cricket match: the captain (Gandhi) gets the spotlight, but the match turns because a tail-ender blocks an over, a fielder takes.',
            decisions: [{ prompt: 'List four supporting characters from "Indigo" and state one specific action each takes in the narrative.', options: [
                { text: 'Correct answer: (1) Rajkumar Shukla', outcome: 'Correct answer: (1) Rajkumar Shukla — follows Gandhi to Lucknow, Cawnpore, Ahmedabad, Calcutta, and.' },
                { text: 'Indigo', outcome: 'Not quite — Students believe supporting characters in "Indigo" are merely "helpers" or "obstacles" to Gandhi\'s.', reveals: 'supporting-characters-in-indigo-are' },
                { text: 'helpers', outcome: 'Not quite — Students believe supporting characters in "Indigo" are merely "helpers" or "obstacles" to Gandhi\'s.', reveals: 'supporting-characters-in-indigo-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re asked in a board exam: "How does the Champaran episode reveal Gandhi\'s idea of true freedom?" Don\'t start by summarising the plot.',
            decisions: [{ prompt: 'What is the primary theme of "Indigo" as reflected in Gandhi\'s actions and the chapter\'s concluding message?', options: [
                { text: 'The primary theme is that true justice for the oppressed comes through moral courage and', outcome: 'The primary theme is that true justice for the oppressed comes through moral courage and.' },
                { text: 'Gandhi helped peasants get money back from British landlords', outcome: 'Not quite — Students consistently confuse the **primary theme** with the **plot resolution**.', reveals: 'students-consistently-confuse-the-primary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Interning in a village, you\'re asked by sharecroppers to draft and file their entire grievance for them — \'you\'re educated, you handle it\'.',
            decisions: [{ prompt: 'What would the Champaran lesson say?', options: [
                { text: 'Coach them to organise and represent themselves — Gandhi\'s real win at Champaran was curing the peasants\' fear and dependency, not merely the refund he negotiated.', outcome: 'Doing it for them leaves the helplessness intact; self-reliance was the point of the satyagraha, not the settlement.' },
                { text: 'File it yourself — they need results, and you write better petitions.', outcome: 'That wins a case but not freedom; they remain dependent on the next educated outsider.', reveals: 'dependency-not-empowerment' },
                { text: 'Tell them to wait until a strong leader comes along.', outcome: 'Champaran began because ordinary people acted — waiting for saviours is the very fear the episode broke.', reveals: 'waiting-for-savior' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue why Champaran mattered more than a courtroom win — it manufactured courage. Fischer\'s biography reads like a field manual for moral resistance.',
            decisions: [{ prompt: 'What comes next? Indigo · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Indigo · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_05_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a pre-reading strategy that equips.',
          hint: 'If stuck on colonial context: Review Class 10 History *Nationalism in India*.',
          misconception: '**Misconception:** "The chapter \'Indigo\' is primarily about the *crop* indigo — its cultivation, chemistry, or trade.',
          parts: [
                { id: 'a', prompt: 'The text highlights four expressions: "urge the departure", "harbour a man like me", "conflict of duties", "seek a prop".', answer: 'Example for "harbour a man like me": Gandhi notes it was "extraordinary',
                  options: ['Example for "harbour a man like me": Gandhi notes it was "extraordinary', 'give shelter'],
                  hint: 'If stuck on colonial context: Review Class 10 History *Nationalism in India* (Non-Cooperation.',
                  misconception: '**Misconception:** "The chapter \'Indigo\' is primarily about the *crop* indigo — its cultivation, chemistry, or trade — and Gandhi\'s role.' }
          ],
            remediations: { 'misconception-the-chapter-indigo-is': { steps: ['If the student holds the above misconception: 1.', '**Re-read the "About the Unit" box** (end of NCERT chapter) — it names the theme and sub-theme explicitly.', '**Revisit Class 10 node `c10_engl_cbse_02_005` (Mandela\'s Twin Obligations)** and `c10_engl_cbse_02_006` (Meaning.', '**Do a 5-minute "Theme Hunt":** Scan the pre-reading text and underline every reference to *people* (peasants, lawyers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_05_002', difficulty: 'standard',
          question: 'Plot and narrative structure refers to the sequence of events in a story (plot).',
          hint: 'If stuck on time-shifts, re-read the first two paragraphs and the last paragraph of the.',
          misconception: 'Students treat "plot" and "narrative structure" as synonyms and write a simple story summary for both.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and narrative structure refers to the sequence of events in a story (plot) and the',
                  options: ['Plot and narrative structure refers to the sequence of events in a story (plot) and the', '"Before You Read: Context and Background" is a pre-reading strategy that equips students', 'Setting refers to the time, place, and physical environment in', 'Character analysis of the protagonist involves examining the central character\'s traits,'],
                  hint: 'If stuck on time-shifts, re-read the first two paragraphs and the last paragraph of the chapter.',
                  misconception: 'Students treat "plot" and "narrative structure" as synonyms and write a simple story summary for both.' }
          ],
            remediations: { 'students-treat-plot-and-narrative': { steps: ['If a student conflates plot and structure: (1) Have them draw two parallel timelines — top line: story events.', '(2) Ask: "Where does the text jump in time?" — mark the frame and any analepses.', '(3) Give a 3-sentence template: "The plot begins with ___.', 'The narrative structure opens with ___.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_05_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and physical environment in which.',
          hint: 'If stuck, review the "Think as you read" questions in the NCERT text after each section.',
          misconception: 'Students often treat setting as a static list of places ("Gandhi went to X, then Y") and atmosphere as a single label.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting refers to the time, place, and physical environment in',
                  options: ['Setting refers to the time, place, and physical environment in', '"Before You Read: Context and Background" is a pre-reading strategy that equips students', 'Plot and narrative structure refers to the sequence of events in a story (plot) and the', 'Character analysis of the protagonist involves examining the central character\'s traits,'],
                  hint: 'If stuck, review the "Think as you read" questions in the NCERT text after each section — they.',
                  misconception: 'Students often treat setting as a static list of places ("Gandhi went to X, then Y") and atmosphere as a single label ("the mood.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If a student cannot trace the atmosphere shift, have them: (1) Re-read the three "Think as you read" question sets.', '(2) Create a two-column chart: Location | Dominant Emotion + Sensory Evidence.', '(3) Practice explaining aloud: "How does the courthouse scene feel different from the village school scene?" Use the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_05_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the central.',
          hint: 'If unable to move from "Gandhi is good" to "Gandhi uses X action to achieve Y strategic.',
          misconception: 'Students often treat Gandhi as a "saintly figure" and list generic virtues (honest, brave, kind) without linking each.',
          parts: [
                { id: 'a', prompt: 'ANALYZE: Compare Gandhi\'s negotiation strategy with the planters\' representative (demanding 50%, accepting 25%) with a conventional lawyer\'s approach.', answer: 'A conventional lawyer would maximize monetary compensation (aim for 100% refund)',
                  options: ['A conventional lawyer would maximize monetary compensation (aim for 100% refund)', 'low settlement'],
                  hint: 'If unable to move from "Gandhi is good" to "Gandhi uses X action to achieve Y strategic effect,".',
                  misconception: 'Students often treat Gandhi as a "saintly figure" and list generic virtues (honest, brave, kind) without linking each trait to a specific.' }
          ],
            remediations: { 'students-often-treat-gandhi-as': { steps: ['Re-read the chapter with a highlighter, marking ONLY Gandhi\'s actions (not descriptions).', 'For each highlighted action, write: "Action: [what he did] | Trait revealed: [one word] | Strategic purpose: [what.', 'Group actions into three clusters: fact-finding, confrontation, constructive work.', 'Re-attempt Diagnostic Question 3 (PEEL paragraph) using this table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_05_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining how secondary.',
          hint: 'If stuck on "narrative function," revisit the concept of "catalyst," "foil," and.',
          misconception: 'Students believe supporting characters in "Indigo" are merely "helpers" or "obstacles" to Gandhi\'s story, and that.',
          parts: [
                { id: 'a', prompt: 'List four supporting characters from "Indigo" and state one specific action each takes in the narrative.', answer: 'Correct answer: (1) Rajkumar Shukla',
                  options: ['Correct answer: (1) Rajkumar Shukla', 'Indigo', 'helpers', 'obstacles'],
                  hint: 'If stuck on "narrative function," revisit the concept of "catalyst," "foil," and "thematic.',
                  misconception: 'Students believe supporting characters in "Indigo" are merely "helpers" or "obstacles" to Gandhi\'s story, and that analysing them means.' },
                { id: 'b', prompt: 'Explain in your own words why Rajkumar Shukla is described as "resolute" and how his resoluteness functions in the narrative structure of "Indigo."', answer: 'Correct answer: Shukla is "resolute"',
                  options: ['Correct answer: Shukla is "resolute"', 'he was stubborn', 'he wanted help', 'Indigo'],
                  hint: 'If stuck on "narrative function," revisit the concept of "catalyst," "foil," and "thematic.',
                  misconception: 'Students believe supporting characters in "Indigo" are merely "helpers" or "obstacles" to Gandhi\'s story, and that analysing them means.' },
                { id: 'c', prompt: 'Apply the "foil" concept to analyse how the Muzzafarpur lawyers\' initial behaviour (charging high fees) contrasts with their later transformation (offering.', answer: 'Correct answer: Initially, the lawyers act as a foil',
                  options: ['Correct answer: Initially, the lawyers act as a foil', 'lawyers changed their mind', 'Indigo', 'helpers'],
                  hint: 'If stuck on "narrative function," revisit the concept of "catalyst," "foil," and "thematic.',
                  misconception: 'Students believe supporting characters in "Indigo" are merely "helpers" or "obstacles" to Gandhi\'s story, and that analysing them means.' }
          ],
            remediations: { 'supporting-characters-in-indigo-are': { steps: ['If the student cannot move beyond listing actions to analysing narrative function, follow this remediation: (1) Re-read.', '(2) Create a two-column table: Column A = Character, Column B = "What does this character REVEAL about Gandhi / the.', '(3) Practice with a simpler text first: use Class 9 "The Lost Child" (fairchild man, snake-charmer, balloon-seller).', '(4) Return to "Indigo" and write one PEEL paragraph per character: Point (function), Evidence (quote/action).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_05_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe supporting characters in "Indigo" are merely "helpers" or "obstacles" to Gandhi\'s story, and that.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The British officials in \'Indigo\' (commissioner, magistrate, Lieutenant-Governor) are not villains but functionaries whose procedural.', answer: 'Correct answer: The claim is largely valid',
                  options: ['Correct answer: The claim is largely valid', 'they were evil British officers', 'lawful', 'Indigo'],
                  hint: 'If stuck on "narrative function," revisit the concept of "catalyst," "foil," and "thematic.',
                  misconception: 'Students believe supporting characters in "Indigo" are merely "helpers" or "obstacles" to Gandhi\'s story, and that analysing them means.' }
          ],
            remediations: { 'supporting-characters-in-indigo-are': { steps: ['If the student cannot move beyond listing actions to analysing narrative function, follow this remediation: (1) Re-read.', '(2) Create a two-column table: Column A = Character, Column B = "What does this character REVEAL about Gandhi / the.', '(3) Practice with a simpler text first: use Class 9 "The Lost Child" (fairchild man, snake-charmer, balloon-seller).', '(4) Return to "Indigo" and write one PEEL paragraph per character: Point (function), Evidence (quote/action).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_05_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea — the core.',
          hint: 'If stuck, re-read Gandhi\'s court statement ("conflict of duties...',
          misconception: 'Students consistently confuse the **primary theme** with the **plot resolution**.',
          parts: [
                { id: 'a', prompt: 'Why does Gandhi refuse Charles Freer Andrews\' offer to stay and help in Champaran, and what does this reveal about the chapter\'s central message?', answer: 'Gandhi refuses Andrews\' help',
                  options: ['Gandhi refuses Andrews\' help', 'Gandhi was proud', 'Andrews was English'],
                  hint: 'If stuck, re-read Gandhi\'s court statement ("conflict of duties...',
                  misconception: 'Students consistently confuse the **primary theme** with the **plot resolution**.' },
                { id: 'b', prompt: 'Apply the concept of "conflict of duties" (from Gandhi\'s court statement) to explain why he chose to disobey the order to leave Champaran.', answer: 'Gandhi frames his disobedience as a "conflict of duties": duty to respect lawful',
                  options: ['Gandhi frames his disobedience as a "conflict of duties": duty to respect lawful', 'Gandhi broke the law'],
                  hint: 'If stuck, re-read Gandhi\'s court statement ("conflict of duties...',
                  misconception: 'Students consistently confuse the **primary theme** with the **plot resolution**.' },
                { id: 'c', prompt: 'Analyze how the spontaneous demonstration of peasants around the Motihari courthouse functions as a turning point in the narrative\'s thematic development.', answer: 'The courthouse scene marks the shift from **fear to fearlessness**',
                  options: ['The courthouse scene marks the shift from **fear to fearlessness**', 'peasants supporting Gandhi'],
                  hint: 'If stuck, re-read Gandhi\'s court statement ("conflict of duties...',
                  misconception: 'Students consistently confuse the **primary theme** with the **plot resolution**.' }
          ],
            remediations: { 'students-consistently-confuse-the-primary': { steps: ['Re-read the last three pages of the chapter (from "The official inquiry assembled..." to end) with a highlighter — mark.', '*material outcomes* (refund, land).', 'Complete this sentence stem 5 times with different textual evidence: "The chapter shows true freedom is _____ because.', 'Re-attempt Diagnostic Question 5 — if you still argue the refund % is the main point, revisit node.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
