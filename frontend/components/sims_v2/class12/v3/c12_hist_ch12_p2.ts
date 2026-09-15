import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch12_p2: SimDef = {
    id: 'v3_c12_hist_ch12_p2',
    title: 'Framing the Constitution · Part 2/2',
    subtitle: 'The Assembly that couldn\'t wait for everyone\'s consent',
    classLevel: 12, subject: 'history', topic: 'Framing the Constitution · Part 2/2',
    chapters: ['c12_hist_ch12'],
    nodeIds: ['c12_hist_cbse_12_007', 'c12_hist_cbse_12_008', 'c12_hist_cbse_12_009', 'c12_hist_cbse_12_010', 'c12_hist_cbse_12_011', 'c12_hist_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Constitutional historian', intro: 'India\'s founders met in December 1946 with the League boycotting and Partition looming — and wrote a republic anyway.', goal: 'Analyse the Constituent Assembly\'s composition, the Objectives Resolution, and the separate-electorate debate.' },
    discovery: {
        question: 'December 1946: an Assembly elected by a thin franchise, boycotted by the League, meeting under a Viceroy — claims to speak for all Indians. Where did its authority actually come from?',
        options: ['Moral capital of the nationalist movement, not the ballot — its claim to embody the people\'s will rested on the struggle\'s legitimacy, contested from day one', 'The elections were free', 'The British approved it', 'Congress won 82%'],
        answer: 'Moral capital of the nationalist movement, not the ballot — its claim to embody the people\'s will rested on the struggle\'s legitimacy, contested from day one',
        hook: 'Nehru omitted \'democratic\' deliberately — \'republic\' contains it, he said, and the Resolution carried democracy\'s content including economic democracy. And Ranga redefined \'minority\' on the spot: the real minorities were the masses — poor, tribal, powerless — not just the religious blocs.',
    },
    teaching: [
        { title: 'Directive Principles of State Policy: The Debate Between Rights and Duties', text: 'The Directive Principles of State Policy (DPSP), enshrined in Part IV (Articles 36–51) of the Indian Constitution, are non-justiciable guidelines directing the State to promote social, economic, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_12_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sit in the Assembly\'s first session: weigh the legitimacy deficit, decode why \'democratic\' went unwritten, and watch the minority debate split between separate electorates and integrated citizenship.',
        labels: ['Directive Principles of State', 'The Debate on Language', 'Minority Rights and Reservations', 'The Debate on', 'The Preamble: Sovereign, Socialist,', 'The Constitution\'s Sources: Government'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_12_007', title: 'Directive Principles of State Policy: The Debate Between Rights and Duties',
          caseStudy: { intro: 'Imagine you are a member of the Constituent Assembly in November 1948.',
            decisions: [{ prompt: 'In which part of the Indian Constitution are the Directive Principles of State Policy enshrined, and what is their justiciability status?', options: [
                { text: 'The Directive Principles of State Policy are enshrined in Part IV (Articles 36–51) of the', outcome: 'The Directive Principles of State Policy are enshrined in Part IV (Articles 36–51) of the Indian.' },
                { text: 'shall not be enforceable by any court', outcome: 'Not quite — Students often believe Directive Principles were "added later" or are "less important" than.', reveals: 'directive-principles-were-added-later' },
                { text: 'Part III', outcome: 'Not quite — Students often believe Directive Principles were "added later" or are "less important" than.', reveals: 'directive-principles-were-added-later' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_12_008', title: 'The Debate on Language: Hindi, English and the Eighth Schedule Compromise',
          caseStudy: { intro: 'Imagine holding a ₹200 banknote — you see Hindi and English on the front, and 15 other languages on the reverse.',
            decisions: [{ prompt: 'What was the exact compromise formula proposed by the Language Committee of the Constituent Assembly in 1949 regarding the official.', options: [
                { text: 'The Language Committee recommended: (1) Hindi in Devanagari script shall be the official', outcome: 'The Language Committee recommended: (1) Hindi in Devanagari script shall be the official language.' },
                { text: 'Hindi was made the national language', outcome: 'Not quite — Students commonly believe the Constitution declared Hindi the **“national language”.', reveals: 'students-commonly-believe-the-constitution' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_12_009', title: 'Minority Rights and Reservations: The Debate on Separate Electorates',
          caseStudy: { intro: 'Imagine you are a member of the Constituent Assembly in August 1947. The Partition riots have just killed hundreds of thousands.',
            decisions: [{ prompt: 'What was the fundamental difference between the system of separate electorates and the system of reserved seats that the Constituent.', options: [
                { text: '**Correct answer:** In separate electorates, only members of a specific community (e.g.,', outcome: '**Correct answer:** In separate electorates, only members of a specific community (e.g., Muslims).' },
                { text: 'both are the same', outcome: 'Not quite — Students often believe: **"The Constituent Assembly rejected separate electorates for Muslims but.', reveals: 'the-constituent-assembly-rejected-separate' },
                { text: 'reserved seats mean only SCs vote for SCs', outcome: 'Not quite — Students often believe: **"The Constituent Assembly rejected separate electorates for Muslims but.', reveals: 'the-constituent-assembly-rejected-separate' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_12_010', title: 'The Debate on the Right to Property: Zamindari Abolition and Constitutional Limits',
          caseStudy: { intro: 'Imagine you are a tenant farmer in 1950s Bihar: your family has tilled the same plot for generations, but the zamindar demands enhanced rent and threatens.',
            decisions: [{ prompt: 'What was the original constitutional status of the Right to Property in the Constitution of India as adopted on 26 January 1950?', options: [
                { text: 'The Right to Property was originally a Fundamental Right under Article 19(1)(f) (right to', outcome: 'The Right to Property was originally a Fundamental Right under Article 19(1)(f) (right to acquire.' },
                { text: 'it was a Directive Principle', outcome: 'Not quite — Students often believe the Right to Property was *always* a weak right in India because "India.', reveals: 'the-right-to-property-was' },
                { text: 'it was never a fundamental right', outcome: 'Not quite — Students often believe the Right to Property was *always* a weak right in India because "India.', reveals: 'the-right-to-property-was' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_12_011', title: 'The Preamble: Sovereign, Socialist, Secular, Democratic Republic and Its Adoption',
          caseStudy: { intro: 'Imagine you are standing in front of the Parliament building in New Delhi and see the Preamble inscribed on the wall.',
            decisions: [{ prompt: 'What was the exact date on which the Constituent Assembly adopted the Preamble (and the Constitution), and which two words were added to.', options: [
                { text: 'The Constituent Assembly adopted the Constitution (including the Preamble) on 26 November', outcome: 'The Constituent Assembly adopted the Constitution (including the Preamble) on 26 November 1949.' },
                { text: 'Federal', outcome: 'Not quite — Students often believe the words "Socialist" and "Secular" were in the original 1949 Preamble, and.', reveals: 'the-words-socialist-and-secular' },
                { text: 'Socialist', outcome: 'Not quite — Students often believe the words "Socialist" and "Secular" were in the original 1949 Preamble, and.', reveals: 'the-words-socialist-and-secular' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_12_012', title: 'The Constitution\'s Sources: Government of India Act 1935, Irish and US Models',
          caseStudy: { intro: 'Imagine you are reading the Preamble of the Indian Constitution and notice the phrase "We, the people of India" — similar to the US Constitution\'s "We the.',
            decisions: [{ prompt: 'Which of the following provisions of the Indian Constitution was directly borrowed from the Government of India Act 1935?', options: [
                { text: 'Correct answer: C) Federal structure with Union, State, and Concurrent Lists', outcome: 'Correct answer: C) Federal structure with Union, State, and Concurrent Lists.' },
                { text: 'carbon copy', outcome: 'Not quite — Students often believe the Indian Constitution is a "carbon copy" of the Government of India Act.', reveals: 'the-indian-constitution-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A school exhibition poster declares \'Ambedkar wrote our Constitution single-handedly\' — and a classmate counters \'he was just the chairman, he wrote nothing.\'',
            decisions: [{ prompt: 'What does the Drafting Committee\'s record actually support?', options: [
                { text: 'Split the difference precisely — Ambedkar piloted the draft through clause-by-clause debates and shaped its core, but the Committee had six other members, B.N. Rau built the blueprint before it met, and the Assembly adopted thousands of amendments; it\'s a collective text he steered.', outcome: 'The chapter\'s verdict: \'Ambedkar\'s Constitution\' is half-true — he\'s first among equals, not sole author, and \'just chairman\' erases the hand that stitched committee reports into legal articles.' },
                { text: 'Keep the poster — chairman of the drafting body effectively means sole author.', outcome: 'That erases Munshi, Aiyar, the Ayyangars and Rau\'s prior blueprint — and the Assembly\'s 2,000-plus amendments; sole authorship is a myth the records don\'t bear.', reveals: 'chairman-equals-author' },
                { text: 'Side with the classmate — a committee product means no individual mattered.', outcome: 'Collective doesn\'t mean anonymous: Ambedkar\'s fingerprints are on Article 17\'s absolutism and the strong-Centre stance alike; the process was collective but the steering was his.', reveals: 'committee-equals-faceless' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_12_012', title: 'You made it',
          caseStudy: { intro: 'You can now read the Objectives Resolution as a founding argument — and hear Partition\'s pressure inside every clause.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_12_007', difficulty: 'standard',
          question: 'The Directive Principles of State Policy (DPSP), enshrined in Part IV (Articles.',
          hint: 'Revisit c12_hist_cbse_12_003 (Objectives Resolution) for the "economic justice" mandate.',
          misconception: 'Students often believe Directive Principles were "added later" or are "less important" than Fundamental Rights because.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Directive Principles of State Policy (DPSP), enshrined in Part IV (Articles 36–51) of',
                  options: ['The Directive Principles of State Policy (DPSP), enshrined in Part IV (Articles 36–51) of', 'The Constituent Assembly (1946–1949) was the body tasked with framing India\'s', 'The Drafting Committee, constituted on 29 August 1947 under the chairmanship of Dr', 'The Objectives Resolution, moved by Jawaharlal Nehru on 13 December 1946 in the'],
                  hint: 'Revisit c12_hist_cbse_12_003 (Objectives Resolution) for the "economic justice" mandate, and.',
                  misconception: 'Students often believe Directive Principles were "added later" or are "less important" than Fundamental Rights because they are.' }
          ],
            remediations: { 'directive-principles-were-added-later': { steps: ['If the student conflates justiciability with importance: (1) Re-read Article 37 and the CAD Vol.', 'VII debate (Nov 8–16, 1948) on "instruments of instructions." (2) Create a two-column table: FR (negative, justiciable.', '(3) Re-attempt Diagnostic Q2 and Q5, explicitly using the phrase "fundamental in the governance of the country" from.', '(4) Watch the 10-minute segment on DPSP in the "Constituent Assembly Debates" digital archive.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_12_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Directive Principles were "added later" or are "less important" than Fundamental Rights because.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The non-justiciability of Directive Principles was a betrayal of the Objectives Resolution\'s promise of economic justice." Use.', answer: 'The statement is partially valid but historically incomplete',
                  options: ['The statement is partially valid but historically incomplete', 'added later', 'less important'],
                  hint: 'Revisit c12_hist_cbse_12_003 (Objectives Resolution) for the "economic justice" mandate, and.',
                  misconception: 'Students often believe Directive Principles were "added later" or are "less important" than Fundamental Rights because they are.' },
                { id: 'b', prompt: 'Draft a 150-word speech for a Constituent Assembly member (choose: Ambedkar, Nehru, or a socialist dissenter like K.T.', answer: 'Sample (Ambedkar): "Sir, I move that these Principles be non-justiciable',
                  options: ['Sample (Ambedkar): "Sir, I move that these Principles be non-justiciable', 'added later', 'less important'],
                  hint: 'Revisit c12_hist_cbse_12_003 (Objectives Resolution) for the "economic justice" mandate, and.',
                  misconception: 'Students often believe Directive Principles were "added later" or are "less important" than Fundamental Rights because they are.' }
          ],
            remediations: { 'directive-principles-were-added-later': { steps: ['If the student conflates justiciability with importance: (1) Re-read Article 37 and the CAD Vol.', 'VII debate (Nov 8–16, 1948) on "instruments of instructions." (2) Create a two-column table: FR (negative, justiciable.', '(3) Re-attempt Diagnostic Q2 and Q5, explicitly using the phrase "fundamental in the governance of the country" from.', '(4) Watch the 10-minute segment on DPSP in the "Constituent Assembly Debates" digital archive.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_12_008', difficulty: 'standard',
          question: 'The Language Debate in the Constituent Assembly (1946–1949) was a prolonged and.',
          hint: 'Revisit c12_hist_cbse_12_001 (Constituent Assembly formation) and c12_hist_cbse_12_003.',
          misconception: 'Students commonly believe the Constitution declared Hindi the **“national language” (राष्ट्रभाषा)**.',
          parts: [
                { id: 'a', prompt: 'Why did Mahatma Gandhi insist on Hindustani (a blend of Hindi and Urdu) rather than Sanskritised Hindi as the national language, and how did Partition alter.', answer: 'Gandhi saw Hindustani as a composite, spoken language of the masses that bridged',
                  options: ['Gandhi saw Hindustani as a composite, spoken language of the masses that bridged', 'Gandhi wanted Hindi'],
                  hint: 'Revisit c12_hist_cbse_12_001 (Constituent Assembly formation) and c12_hist_cbse_12_003 (Objectives.',
                  misconception: 'Students commonly believe the Constitution declared Hindi the **“national language” (राष्ट्रभाषा)**.' },
                { id: 'b', prompt: 'A member from Madras tells the Assembly in 1949: “We accepted Hindustani on Gandhi’s call, started schools, braved resistance.', answer: 'The speaker (G',
                  options: ['The speaker (G', 'difficulty in learning Hindi'],
                  hint: 'Revisit c12_hist_cbse_12_001 (Constituent Assembly formation) and c12_hist_cbse_12_003 (Objectives.',
                  misconception: 'Students commonly believe the Constitution declared Hindi the **“national language” (राष्ट्रभाषा)**.' },
                { id: 'c', prompt: 'Compare R.V. Dhulekar’s 1949 demand (“Hindi must be the *national* language, not merely official”) with the Language Committee’s compromise.', answer: '(1) Article 343’s 15-year English continuation clause (extendable by Parliament)',
                  options: ['(1) Article 343’s 15-year English continuation clause (extendable by Parliament)', 'English continued for 15 years'],
                  hint: 'Revisit c12_hist_cbse_12_001 (Constituent Assembly formation) and c12_hist_cbse_12_003 (Objectives.',
                  misconception: 'Students commonly believe the Constitution declared Hindi the **“national language” (राष्ट्रभाषा)**.' }
          ],
            remediations: { 'students-commonly-believe-the-constitution': { steps: ['Re-read the Language Committee report summary in NCERT (pp.', '337–338) and underline every occurrence of “official language” vs “national language”.', 'Map the 14 original Eighth Schedule languages on a political map of India; ask: “Which major linguistic region had *no*.', 'Compare Dhulekar’s speech (NCERT p.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_12_009', difficulty: 'standard',
          question: 'The debate on separate electorates and minority rights in the Constituent.',
          hint: 'Revisit the **Poona Pact (1932)** — specifically why Gandhi fasted unto death against.',
          misconception: 'Students often believe: **"The Constituent Assembly rejected separate electorates for Muslims but gave reservations.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The debate on separate electorates and minority rights in the Constituent Assembly',
                  options: ['The debate on separate electorates and minority rights in the Constituent Assembly', 'The Constituent Assembly (1946–1949) was the body tasked with framing India\'s', 'The Drafting Committee, constituted on 29 August 1947 under the chairmanship of Dr', 'The Objectives Resolution, moved by Jawaharlal Nehru on 13 December 1946 in the'],
                  hint: 'Revisit the **Poona Pact (1932)** — specifically why Gandhi fasted unto death against separate.',
                  misconception: 'Students often believe: **"The Constituent Assembly rejected separate electorates for Muslims but gave reservations to SCs/STs — this.' }
          ],
            remediations: { 'the-constituent-assembly-rejected-separate': { steps: ['Re-read **Source 3 (Pocker Bahadur)** and **Source 4 (Patel/Pant)** in the NCERT text — identify the *exact words* each.', 'Create a two-column table: **"Separate Electorates"** vs **"Reserved Seats"** — fill in: Who votes?', 'What is the assumed relationship between community and nation?', 'Watch the 10-minute segment on "Minority Rights" from the *Samvidhaan* TV series (Rajya Sabha TV) — note how Ambedkar.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_12_010', difficulty: 'standard',
          question: 'The Debate on the Right to Property (1947–1951) refers to the intense.',
          hint: 'Revisit c8_hist_ch3_8 (British Economic Exploitation: Revenue Collection and Trade) for.',
          misconception: 'Students often believe the Right to Property was *always* a weak right in India because "India is socialist".',
          parts: [
                { id: 'a', prompt: 'Why did the provisional Parliament pass the First Amendment (1951) within 15 months of the Constitution coming into force?', answer: 'The First Amendment was passed',
                  options: ['The First Amendment was passed', 'Nehru wanted socialism', 'compensation', 'India is socialist'],
                  hint: 'Revisit c8_hist_ch3_8 (British Economic Exploitation: Revenue Collection and Trade) for zamindari.',
                  misconception: 'Students often believe the Right to Property was *always* a weak right in India because "India is socialist".' },
                { id: 'b', prompt: 'A student argues: "The Ninth Schedule was a clever trick — it placed land reform laws beyond judicial review entirely, so courts could never examine them.".', answer: 'The statement is partially inaccurate',
                  options: ['The statement is partially inaccurate', 'India is socialist', 'Was property a fundamental right in 1950?', 'No, because Directive Principles mandated land reform'],
                  hint: 'Revisit c8_hist_ch3_8 (British Economic Exploitation: Revenue Collection and Trade) for zamindari.',
                  misconception: 'Students often believe the Right to Property was *always* a weak right in India because "India is socialist".' }
          ],
            remediations: { 'the-right-to-property-was': { steps: ['If the student conflates the 1950 position with the post-1978 position: (1) Re-read CAD Vol.', 'II, 27 Aug 1947 (Ranga speech) and Vol.', 'V (Patel on separate electorates/property) — note the *original* Art.', '300A (1978) side-by-side — highlight "compensation" vs "authority of law".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_12_011', difficulty: 'standard',
          question: 'The Preamble to the Constitution of India is the introductory statement that.',
          hint: 'Revisit Node c12_hist_cbse_12_003 (Objectives Resolution) and map each of its clauses.',
          misconception: 'Students often believe the words "Socialist" and "Secular" were in the original 1949 Preamble, and that "Secular" means.',
          parts: [
                { id: 'a', prompt: 'In the Objectives Resolution (1946), Nehru deliberately omitted the word "Democratic" while including "Republic".', answer: 'Nehru argued that "republic" inherently contains democracy',
                  options: ['Nehru argued that "republic" inherently contains democracy', 'Nehru forgot', 'Nehru opposed democracy', 'Socialist'],
                  hint: 'Revisit Node c12_hist_cbse_12_003 (Objectives Resolution) and map each of its clauses to the.',
                  misconception: 'Students often believe the words "Socialist" and "Secular" were in the original 1949 Preamble, and that "Secular" means the Indian state.' },
                { id: 'b', prompt: 'A student claims: "The Preamble\'s phrase \'Sovereign Socialist Secular Democratic Republic\' means India is a socialist state in the Marxist sense." Using.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'Socialist', 'Secular'],
                  hint: 'Revisit Node c12_hist_cbse_12_003 (Objectives Resolution) and map each of its clauses to the.',
                  misconception: 'Students often believe the words "Socialist" and "Secular" were in the original 1949 Preamble, and that "Secular" means the Indian state.' },
                { id: 'c', prompt: 'Compare the Indian Preamble\'s "Secular" (added 1976) with the French *laïcité* model.', answer: 'Differences: (1) French *laïcité* mandates strict separation',
                  options: ['Differences: (1) French *laïcité* mandates strict separation', 'both are identical', 'judicious distance', 'Socialist'],
                  hint: 'Revisit Node c12_hist_cbse_12_003 (Objectives Resolution) and map each of its clauses to the.',
                  misconception: 'Students often believe the words "Socialist" and "Secular" were in the original 1949 Preamble, and that "Secular" means the Indian state.' }
          ],
            remediations: { 'the-words-socialist-and-secular': { steps: ['If the student confuses the 1949 vs 1976 Preamble text: Step 1 — Re-read the Objectives Resolution (Node.', 'Step 2 — Study the 42nd Amendment context (Emergency, Indira Gandhi\'s "Garibi Hatao") using NCERT Class 12 *Politics.', 'Step 3 — Compare Articles 25–28 with the US First Amendment using a two-column table.', 'Step 4 — Re-attempt Diagnostic Questions 1 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_12_012', difficulty: 'standard',
          question: 'The Indian Constitution\'s sources refer to the historical and international.',
          hint: 'Revisit the Government of India Act 1935\'s three-list federal scheme and the Objectives.',
          misconception: 'Students often believe the Indian Constitution is a "carbon copy" of the Government of India Act 1935 with minor.',
          parts: [
                { id: 'a', prompt: 'Which of the following provisions of the Indian Constitution was directly borrowed from the Government of India Act 1935?', answer: 'Correct answer: C) Federal structure with Union, State, and Concurrent Lists',
                  options: ['Correct answer: C) Federal structure with Union, State, and Concurrent Lists', 'carbon copy'],
                  hint: 'Revisit the Government of India Act 1935\'s three-list federal scheme and the Objectives.',
                  misconception: 'Students often believe the Indian Constitution is a "carbon copy" of the Government of India Act 1935 with minor additions from the US and.' }
          ],
            remediations: { 'the-indian-constitution-is-a': { steps: ['If the student holds the "carbon copy" misconception: (1) Revisit c12_hist_cbse_12_005 (Federalism) to compare the 1935.', '(2) Revisit c12_hist_cbse_12_006 (Fundamental Rights) and c12_hist_cbse_12_007 (Directive Principles) to see how these.', '(3) Create a three-column table: "1935 Act provision", "Constitutional provision", "Change/Adaptation".', '(4) Re-attempt Diagnostic Question 4 to test the corrected understanding.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
