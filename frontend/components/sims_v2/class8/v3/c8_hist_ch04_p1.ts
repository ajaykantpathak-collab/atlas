import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hist_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hist_ch04_p1: SimDef = {
    id: 'v3_c8_hist_ch04_p1',
    title: 'India\'s Long Road to Independence · Part 1/2',
    subtitle: 'The hundred years of revolt before 1857',
    classLevel: 8, subject: 'history', topic: 'India\'s Long Road to Independence · Part 1/2',
    chapters: ['c8_hist_ch04'],
    nodeIds: ['c8_hist_ch4_1', 'c8_hist_ch4_10', 'c8_hist_ch4_11', 'c8_hist_ch4_2', 'c8_hist_ch4_3', 'c8_hist_ch4_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a chronicler of forgotten uprisings', intro: 'British reports called them \'turbulent\' and \'bandits.\' Dig into what the Sanyasis, Paikas and Santhals were actually fighting for — and why colonial records can\'t be taken at face value.', goal: 'Understand the pre-1857 resistance movements — Sanyasi, Paika, Vellore, Kol, Santhal — their local economic and cultural causes, and why their isolation kept them from succeeding.' },
    discovery: {
        question: 'In 1817, a temple priest near Puri led armed farmer-soldiers against the East India Company — forty years before 1857. What pushed a priest to rebellion?',
        options: ['The Company seized the Paiks\' rent-free lands and grabbed the salt monopoly — destroying the livelihood of Odisha\'s hereditary militia-farmers', 'He was just a bandit causing trouble', 'He wanted the British throne for himself', 'It was a misunderstanding over parade uniforms'],
        answer: 'The Company seized the Paiks\' rent-free lands and grabbed the salt monopoly — destroying the livelihood of Odisha\'s hereditary militia-farmers',
        hook: 'Not every uprising was a \'sepoy mutiny.\' Most pre-1857 revolts were peasants and tribals — Sanyasis after the Bengal famine, Kols and Santhals losing their land — fighting economic strangling, not greased cartridges.',
    },
    teaching: [
        { title: 'Early Resistance to British Rule: Pre-1857 Uprisings', text: 'Early Resistance to British Rule refers to the series of localized, diverse uprisings across India between 1757 (Battle of Plassey) and 1857 (Revolt of 1857) where peasants, tribals, deposed rulers.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hist_ch4_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map a hundred years of resistance: Sanyasi raiders in famine-hit Bengal, sepoys at Vellore, Paikas in Odisha, Kols in Chotanagpur, Santhals in 1855. For each, find the specific grievance — and why none could link up with the others.',
        labels: ['Early Resistance to British', 'Quit India Movement (1942)', 'Partition and Independence (1947)', 'Revolt of 1857: Causes,', 'Birth of the Indian', 'Moderates vs Extremists'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_hist_ch4_1', title: 'Early Resistance to British Rule: Pre-1857 Uprisings',
          caseStudy: { intro: 'Imagine visiting the Jagannath Temple in Puri and seeing a statue of Jayi Rajguru, a priest who led the Paika Rebellion in 1817 — long before 1857.',
            decisions: [{ prompt: 'Name any two pre-1857 uprisings against British rule and the region where each occurred.', options: [
                { text: 'Correct examples: Sanyasi Rebellion (Bengal/Bihar, 1770s), Paika Rebellion (Odisha,', outcome: 'Correct examples: Sanyasi Rebellion (Bengal/Bihar, 1770s), Paika Rebellion (Odisha, 1817), Vellore.' },
                { text: 'Sepoy Mutiny of 1857', outcome: 'Not quite — Students believe all pre-1857 uprisings were "sepoy mutinies" driven by religious offense (like the.', reveals: 'all-pre-1857-uprisings-were' },
                { text: 'Non-Cooperation Movement', outcome: 'Not quite — Students believe all pre-1857 uprisings were "sepoy mutinies" driven by religious offense (like the.', reveals: 'all-pre-1857-uprisings-were' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch4_10', title: 'Quit India Movement (1942): \'Do or Die\'',
          caseStudy: { intro: 'Imagine you\'re standing at Mumbai\'s August Kranti Maidan where Gandhi gave the "Do or Die" speech — what would make ordinary students, workers, and peasants.',
            decisions: [{ prompt: 'In which month and year was the Quit India Movement launched, and what was the immediate trigger that led Gandhi to give the "Do or Die".', options: [
                { text: 'The Quit India Movement was launched in August 1942 after the failure of the Cripps', outcome: 'The Quit India Movement was launched in August 1942 after the failure of the Cripps Mission.' },
                { text: 'after Jallianwala Bagh', outcome: 'Not quite — Students think the Quit India Movement was "just another Gandhi movement like Non-Cooperation.', reveals: 'the-quit-india-movement-was' },
                { text: 'just another Gandhi movement like Non-Cooperation or Salt March', outcome: 'Not quite — Students think the Quit India Movement was "just another Gandhi movement like Non-Cooperation.', reveals: 'the-quit-india-movement-was' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch4_11', title: 'Partition and Independence (1947)',
          caseStudy: { intro: 'Imagine standing at Wagah border today during the evening retreat ceremony — the flags lowering, the gates closing, the crowds cheering on both sides.',
            decisions: [{ prompt: 'What was the exact date on which the Indian Independence Act received royal assent in the British Parliament, and what two dominions did.', options: [
                { text: 'The Indian Independence Act received royal assent on July 18, 1947, creating the', outcome: 'The Indian Independence Act received royal assent on July 18, 1947, creating the dominions of India.' },
                { text: 'August 15, 1947', outcome: 'Not quite — Students believe Partition was decided in 1940 with the Lahore Resolution ("Pakistan Resolution").', reveals: 'partition-was-decided-in-1940' },
                { text: 'India and East Pakistan', outcome: 'Not quite — Students believe Partition was decided in 1940 with the Lahore Resolution ("Pakistan Resolution").', reveals: 'partition-was-decided-in-1940' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch4_2', title: 'Revolt of 1857: Causes, Events, and Consequences',
          caseStudy: { intro: 'Imagine you are visiting the Red Fort in Delhi and see the spot where Bahadur Shah Zafar was tried, or you pass a statue of Rani Lakshmibai in your city.',
            decisions: [{ prompt: 'In which month and year did the 1857 Revolt begin at Meerut, and what was the immediate trigger for the sepoys\' refusal to use the new.', options: [
                { text: 'The revolt began in May 1857 at Meerut', outcome: 'The revolt began in May 1857 at Meerut. The immediate trigger was the introduction of the new.' },
                { text: 'sepoy mutiny', outcome: 'Not quite — Students often believe the 1857 Revolt was solely a "sepoy mutiny" caused only by the greased.', reveals: 'the-1857-revolt-was-solely' },
                { text: 'it started in 1858 or was triggered only by pay cuts', outcome: 'Not quite — Students often believe the 1857 Revolt was solely a "sepoy mutiny" caused only by the greased.', reveals: 'the-1857-revolt-was-solely' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch4_3', title: 'Birth of the Indian National Congress (1885)',
          caseStudy: { intro: 'Imagine you are visiting the Gokuldas Tejpal Sanskrit College in Mumbai today — a modest building where 72 men in dhotis and sherwanis sat on the floor.',
            decisions: [{ prompt: 'In which city and venue was the first session of the Indian National Congress held in December 1885?', options: [
                { text: 'The first session was held at Gokuldas Tejpal Sanskrit College in Bombay (now Mumbai)', outcome: 'The first session was held at Gokuldas Tejpal Sanskrit College in Bombay (now Mumbai).' },
                { text: 'Calcutta', outcome: 'Not quite — Students believe the INC was *only* a British "safety valve" created by A.O.', reveals: 'the-inc-was-only-a' },
                { text: 'safety valve', outcome: 'Not quite — Students believe the INC was *only* a British "safety valve" created by A.O.', reveals: 'the-inc-was-only-a' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch4_4', title: 'Moderates vs Extremists in the Congress',
          caseStudy: { intro: 'Imagine you and your friends want to change a school rule — some want to write a polite letter to the principal (Moderates), while others want to organize.',
            decisions: [{ prompt: 'Who were the three main leaders of the Extremist faction, popularly known as Lal-Bal-Pal?', options: [
                { text: 'Lala Lajpat Rai (Punjab), Bal Gangadhar Tilak (Maharashtra), and Bipin Chandra Pal', outcome: 'Lala Lajpat Rai (Punjab), Bal Gangadhar Tilak (Maharashtra), and Bipin Chandra Pal (Bengal).' },
                { text: 'Gokhale or Naoroji', outcome: 'Not quite — Students think the Moderates were \'pro-British\' and Extremists were \'anti-British\' from the start.', reveals: 'the-moderates-were-pro-british' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch4_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A museum caption reads: \'Before 1857, India slept — the only sparks were a few sepoy mutinies over religious insults.\' A student who has read about the Sanyasi, Paika, Kol and Santhal risings challenges the caption.',
            decisions: [{ prompt: 'What does the record actually show about early resistance?', options: [
                { text: 'The caption is wrong on both counts: dozens of uprisings flared between 1757 and 1857, and most were peasant and tribal movements driven by land revenue, lost customary rights and exploitation — led by local chiefs and figures like Jayi Rajguru, not soldiers. They failed mainly because each stayed local, restoring its own grievances rather than joining a shared cause.', outcome: 'This corrects the \'sepoys only\' picture and gives the structural reason the risings were crushed one at a time.' },
                { text: 'The caption is fair — the countryside stayed quiet because only sepoys had grievances worth fighting over.', outcome: 'The archive says otherwise: famines, resumed jagirs, doubled taxes and moneylender seizure pushed peasants and tribals into repeated armed revolts decades before 1857.', reveals: 'villages-stayed-quiet' },
                { text: 'The uprisings were real but failed simply because Indians lacked muskets and drill — weapons were the whole story.', outcome: 'Technology mattered, but the deeper cause was fragmentation: isolated risings defending local privileges could be suppressed piecemeal regardless of weaponry.', reveals: 'weapons-were-everything' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch4_4', title: 'The bigger picture',
          caseStudy: { intro: '1857 wasn\'t the beginning — it was the boiling point. A century of local revolts, each crushed alone, shows both how deep the anger ran and why scattered resistance kept failing.',
            decisions: [{ prompt: 'What comes next? India\'s Long Road to Independence · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — India\'s Long Road to Independence · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hist_ch4_1', difficulty: 'standard',
          question: 'Early Resistance to British Rule refers to the series of localized, diverse.',
          hint: 'Revisit c6_history_ch10_041 (Expansion of British Rule in India) — focus on the sections.',
          misconception: 'Students believe all pre-1857 uprisings were "sepoy mutinies" driven by religious offense (like the greased cartridge).',
          parts: [
                { id: 'a', prompt: 'The Sanyasi Rebellion (1770s) is often described as a bandit uprising. Why is this a misconception? Explain using the economic context of Bengal after 1765.', answer: 'The Sanyasis were not mere bandits',
                  options: ['The Sanyasis were not mere bandits', 'sepoy mutinies'],
                  hint: 'Revisit c6_history_ch10_041 (Expansion of British Rule in India) — focus on the sections "Land.',
                  misconception: 'Students believe all pre-1857 uprisings were "sepoy mutinies" driven by religious offense (like the greased cartridge).' },
                { id: 'b', prompt: 'Compare the Vellore Mutiny (1806) and the Paika Rebellion (1817) on three dimensions: (a) immediate trigger, (b) social base, (c) British response.', answer: 'immediate trigger, (',
                  options: ['immediate trigger, (', 'Indians vs British', 'sepoy mutinies'],
                  hint: 'Revisit c6_history_ch10_041 (Expansion of British Rule in India) — focus on the sections "Land.',
                  misconception: 'Students believe all pre-1857 uprisings were "sepoy mutinies" driven by religious offense (like the greased cartridge).' }
          ],
            remediations: { 'all-pre-1857-uprisings-were': { steps: ['Create a 3-column table: Uprising | Social Base (Peasant/Tribal/Sepoy/Ruler) | Primary Grievance (Land Tax / Cultural.', 'Plot each uprising on an outline map of India.', 'Colour-code by social base.', 'Ask: "Which column has the most entries?" This visual comparison breaks the "all sepoy mutiny" myth by showing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch4_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe all pre-1857 uprisings were "sepoy mutinies" driven by religious offense (like the greased cartridge).',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Pre-1857 uprisings failed because they lacked modern weapons and organization." Support your judgment with evidence from at least two.', answer: 'The claim is partially true but incomplete',
                  options: ['The claim is partially true but incomplete', 'backwardness', 'sepoy mutinies'],
                  hint: 'Revisit c6_history_ch10_041 (Expansion of British Rule in India) — focus on the sections "Land.',
                  misconception: 'Students believe all pre-1857 uprisings were "sepoy mutinies" driven by religious offense (like the greased cartridge).' }
          ],
            remediations: { 'all-pre-1857-uprisings-were': { steps: ['Create a 3-column table: Uprising | Social Base (Peasant/Tribal/Sepoy/Ruler) | Primary Grievance (Land Tax / Cultural.', 'Plot each uprising on an outline map of India.', 'Colour-code by social base.', 'Ask: "Which column has the most entries?" This visual comparison breaks the "all sepoy mutiny" myth by showing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch4_10', difficulty: 'standard',
          question: 'The Quit India Movement (August 1942) was a mass civil disobedience campaign.',
          hint: 'Revisit c8_hist_ch4_9 (Civil Disobedience) and compare: Gandhi negotiated the.',
          misconception: 'Students think the Quit India Movement was "just another Gandhi movement like Non-Cooperation or Salt March" — they.',
          parts: [
                { id: 'a', prompt: 'Compare the British response to the Non-Cooperation Movement (1920-22) and the Quit India Movement (1942).', answer: 'In 1920-22, the British used legal repression (arrests, bans)',
                  options: ['In 1920-22, the British used legal repression (arrests, bans)', 'British were always brutal', 'just another Gandhi movement like Non-Cooperation or Salt March'],
                  hint: 'Revisit c8_hist_ch4_9 (Civil Disobedience) and compare: Gandhi negotiated the Gandhi-Irwin Pact.',
                  misconception: 'Students think the Quit India Movement was "just another Gandhi movement like Non-Cooperation or Salt March" — they miss that it was.' }
          ],
            remediations: { 'the-quit-india-movement-was': { steps: ['Show a 1942 map of India marking parallel governments (Ballia, Satara, Tamluk, Talcher) — ask "Who ran these if Gandhi.', 'Compare two British documents: 1922 "Non-Cooperation is a nuisance" vs 1942 "Quit India threatens our war effort — use.', 'Read Jayaprakash Narayan\'s prison diary excerpt describing how socialist leaders escaped jail to lead underground.', 'Have student write one paragraph: "Why 1942 was the point of no return for British rule" using all three sources.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch4_11', difficulty: 'standard',
          question: 'Partition and Independence (1947) refers to the British Parliament\'s Indian.',
          hint: 'Revisit c8_hist_ch4_5 (Partition of Bengal 1905) to see how "administrative convenience".',
          misconception: 'Students believe Partition was decided in 1940 with the Lahore Resolution ("Pakistan Resolution") and simply.',
          parts: [
                { id: 'a', prompt: 'What was the exact date on which the Indian Independence Act received royal assent in the British Parliament, and what two dominions did it create?', answer: 'The Indian Independence Act received royal assent on July 18, 1947, creating the',
                  options: ['The Indian Independence Act received royal assent on July 18, 1947, creating the', 'August 15, 1947', 'India and East Pakistan', 'Pakistan Resolution'],
                  hint: 'Revisit c8_hist_ch4_5 (Partition of Bengal 1905) to see how "administrative convenience" became.',
                  misconception: 'Students believe Partition was decided in 1940 with the Lahore Resolution ("Pakistan Resolution") and simply implemented in 1947.' },
                { id: 'b', prompt: 'Analyze the sequence: Direct Action Day (16 August 1946) → Interim Government formation (September 1946) → Mountbatten\'s arrival (March 1947) → 3 June Plan →.', answer: 'The turning point was Mountbatten\'s announcement on 3 June 1947',
                  options: ['The turning point was Mountbatten\'s announcement on 3 June 1947', 'Direct Action Day', 'Pakistan Resolution'],
                  hint: 'Revisit c8_hist_ch4_5 (Partition of Bengal 1905) to see how "administrative convenience" became.',
                  misconception: 'Students believe Partition was decided in 1940 with the Lahore Resolution ("Pakistan Resolution") and simply implemented in 1947.' }
          ],
            remediations: { 'partition-was-decided-in-1940': { steps: ['Re-read the 1940 Lahore Resolution text — note it says "states" (plural) and "autonomous and sovereign," not "Pakistan."', 'Compare the Cabinet Mission Plan\'s three-tier federation with the 3 June Plan\'s two dominions — identify where the.', 'Watch a 5-minute clip of the Radcliffe Commission proceedings (available on NCERT\'s digital archive) to see how.', 'Map the 1941 Muslim percentages for Punjab districts — observe how many districts had 51–55% Muslim populations, making.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch4_2', difficulty: 'standard',
          question: 'The Revolt of 1857 was a major, widespread uprising against British East India.',
          hint: 'Review c6_history_ch10_041 (Expansion of British Rule in India) focusing on Doctrine.',
          misconception: 'Students often believe the 1857 Revolt was solely a "sepoy mutiny" caused only by the greased cartridges, ignoring the.',
          parts: [
                { id: 'a', prompt: 'In which month and year did the 1857 Revolt begin at Meerut, and what was the immediate trigger for the sepoys\' refusal to use the new cartridges?', answer: 'The revolt began in May 1857 at Meerut',
                  options: ['The revolt began in May 1857 at Meerut', 'sepoy mutiny', 'it started in 1858 or was triggered only by pay cuts'],
                  hint: 'Review c6_history_ch10_041 (Expansion of British Rule in India) focusing on Doctrine of Lapse and.',
                  misconception: 'Students often believe the 1857 Revolt was solely a "sepoy mutiny" caused only by the greased cartridges, ignoring the deep-seated.' }
          ],
            remediations: { 'the-1857-revolt-was-solely': { steps: ['If the student holds this misconception, have them create a five-column cause chart (Political, Economic, Social.', 'Then, map the revolt\'s spread and mark the social composition at each center (e.g., Awadh: taluqdars + peasants.', 'Finally, compare the 1857 leaders\' proclamations (which appeal to all Indians) with earlier revolt documents to see the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch4_3', difficulty: 'standard',
          question: 'The Indian National Congress (INC) was founded on 28 December 1885 at Gokuldas.',
          hint: 'If stuck, review c6_history_ch10_043 (Crown Rule changes) and c6_history_ch11_045 (early.',
          misconception: 'Students believe the INC was *only* a British "safety valve" created by A.O.',
          parts: [
                { id: 'a', prompt: 'Read this excerpt from Hume\'s 1883 letter to graduates of Calcutta University: *"If only fifty men, good and true, can be found to join as founders, the thing.', answer: 'Evidence for British-guided: "fifty men',
                  options: ['Evidence for British-guided: "fifty men', 'safety valve'],
                  hint: 'If stuck, review c6_history_ch10_043 (Crown Rule changes) and c6_history_ch11_045 (early.',
                  misconception: 'Students believe the INC was *only* a British "safety valve" created by A.O.' }
          ],
            remediations: { 'the-inc-was-only-a': { steps: ['Re-read the 1885 delegate list (available in NCERT Class 8 textbook, page 124) and highlight how many were lawyers.', 'Compare Hume\'s 1883 circular (calling for "loyal cooperation") with the 1885 resolutions (demanding elected councils.', 'Watch the 5-minute clip "Birth of INC" on DIKSHA portal (search code: HIS8_CH4_3) which shows the Gokuldas Tejpal.', 'Write a 50-word answer: "Why did Indians need a British \'front man\' in 1885 but not in 1905?"'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch4_4', difficulty: 'standard',
          question: 'The Moderates vs Extremists debate (1885–1907) refers to the ideological split.',
          hint: 'Revisit c8_hist_ch4_3 (Birth of the Indian National Congress) and the \'Methods.',
          misconception: 'Students think the Moderates were \'pro-British\' and Extremists were \'anti-British\' from the start.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Moderates vs Extremists debate (1885–1907) refers to the ideological split within the',
                  options: ['The Moderates vs Extremists debate (1885–1907) refers to the ideological split within the', 'Early Resistance to British Rule refers to the series of localized, diverse uprisings', 'The Quit India Movement (August 1942) was a mass civil disobedience campaign launched by', 'Partition and Independence (1947) refers to the British Parliament\'s Indian Independence'],
                  hint: 'Revisit c8_hist_ch4_3 (Birth of the Indian National Congress) and the \'Methods of Moderates\'.',
                  misconception: 'Students think the Moderates were \'pro-British\' and Extremists were \'anti-British\' from the start.' }
          ],
            remediations: { 'the-moderates-were-pro-british': { steps: ['Show a 1906 Congress resolution (Calcutta) where Moderates *accepted* Swaraj as goal — prove they weren\'t.', 'Read Tilak\'s 1907 speech at Surat — he demands *control* over Congress machinery, not revolution.', 'Use a Venn diagram: center = \'Swaraj\', left = \'petitions/councils\', right = \'boycott/mass mobilization\'.', 'Ask: "If both wanted Swaraj, why did they split?" — force the student to articulate the tactical disagreement.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
