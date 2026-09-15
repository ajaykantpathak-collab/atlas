import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch12_p1: SimDef = {
    id: 'v3_c12_hist_ch12_p1',
    title: 'Framing the Constitution · Part 1/2',
    subtitle: 'The Assembly that couldn\'t wait for everyone\'s consent',
    classLevel: 12, subject: 'history', topic: 'Framing the Constitution · Part 1/2',
    chapters: ['c12_hist_ch12'],
    nodeIds: ['c12_hist_cbse_12_001', 'c12_hist_cbse_12_002', 'c12_hist_cbse_12_003', 'c12_hist_cbse_12_004', 'c12_hist_cbse_12_005', 'c12_hist_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Constitutional historian', intro: 'India\'s founders met in December 1946 with the League boycotting and Partition looming — and wrote a republic anyway.', goal: 'Analyse the Constituent Assembly\'s composition, the Objectives Resolution, and the separate-electorate debate.' },
    discovery: {
        question: 'December 1946: an Assembly elected by a thin franchise, boycotted by the League, meeting under a Viceroy — claims to speak for all Indians. Where did its authority actually come from?',
        options: ['Moral capital of the nationalist movement, not the ballot — its claim to embody the people\'s will rested on the struggle\'s legitimacy, contested from day one', 'The elections were free', 'The British approved it', 'Congress won 82%'],
        answer: 'Moral capital of the nationalist movement, not the ballot — its claim to embody the people\'s will rested on the struggle\'s legitimacy, contested from day one',
        hook: 'Nehru omitted \'democratic\' deliberately — \'republic\' contains it, he said, and the Resolution carried democracy\'s content including economic democracy. And Ranga redefined \'minority\' on the spot: the real minorities were the masses — poor, tribal, powerless — not just the religious blocs.',
    },
    teaching: [
        { title: 'The Constituent Assembly: Formation, Composition and the Objectives Resolution', text: 'The Constituent Assembly (1946–1949) was the body tasked with framing India\'s Constitution, formed through indirect elections by provincial legislatures (not universal franchise), dominated by the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_12_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sit in the Assembly\'s first session: weigh the legitimacy deficit, decode why \'democratic\' went unwritten, and watch the minority debate split between separate electorates and integrated citizenship.',
        labels: ['The Constituent Assembly: Formation,', 'The Making of', 'The Objectives Resolution: Nehru\'s', 'Debates on the Form', 'Federalism in the Constitution', 'Fundamental Rights: Debates'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_12_001', title: 'The Constituent Assembly: Formation, Composition and the Objectives Resolution',
          caseStudy: { intro: 'Imagine you are a student in 1946 reading newspaper reports of the Constituent Assembly\'s first session — headlines scream "Congress Packs Assembly," "League.',
            decisions: [{ prompt: 'In which month and year did the Constituent Assembly hold its first session, and under what plan was it constituted?', options: [
                { text: 'The Constituent Assembly held its first session on 9 December 1946, constituted under the', outcome: 'The Constituent Assembly held its first session on 9 December 1946, constituted under the Cabinet.' },
                { text: 'August 1947', outcome: 'Not quite — Students believe the Constituent Assembly was *directly elected by universal adult franchise* and.', reveals: 'the-constituent-assembly-was-directly' },
                { text: 'direct election', outcome: 'Not quite — Students believe the Constituent Assembly was *directly elected by universal adult franchise* and.', reveals: 'the-constituent-assembly-was-directly' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_12_002', title: 'The Making of the Constitution: Drafting Committee and Dr B.R. Ambedkar\'s Role',
          caseStudy: { intro: 'Imagine you are handed a 300-page legal document drafted by a committee of seven people over two years, and told: "This will govern 350 million people." Where.',
            decisions: [{ prompt: 'Name the seven members of the Drafting Committee and identify who served as its Chairman, Constitutional Advisor, and Chief Draughtsman.', options: [
                { text: 'The Drafting Committee members were: Dr', outcome: 'The Drafting Committee members were: Dr. B.R. Ambedkar (Chairman), K.M.' },
                { text: 'Nehru or Patel as members —', outcome: 'Not quite — Students believe **Dr. Ambedkar single-handedly "wrote" the Constitution** — imagining him drafting.', reveals: 'dr' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_12_003', title: 'The Objectives Resolution: Nehru\'s Draft and the Vision of the Constitution',
          caseStudy: { intro: 'Imagine you are a member of the Constituent Assembly in December 1946, surrounded by the trauma of Partition and the euphoria of impending freedom.',
            decisions: [{ prompt: 'On what date did Jawaharlal Nehru move the Objectives Resolution in the Constituent Assembly, and what were the three key ideals.', options: [
                { text: 'The Objectives Resolution was moved on 13 December 1946', outcome: 'The Objectives Resolution was moved on 13 December 1946. It proclaimed India as an Independent.' },
                { text: 'secularism', outcome: 'Not quite — Students often think the Objectives Resolution *is* the Preamble, or that it included the words.', reveals: 'the-objectives-resolution-is-the' },
                { text: 'Socialist', outcome: 'Not quite — Students often think the Objectives Resolution *is* the Preamble, or that it included the words.', reveals: 'the-objectives-resolution-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_12_004', title: 'Debates on the Form of Government: Parliamentary vs Presidential System',
          caseStudy: { intro: 'Imagine you are a member of the Constituent Assembly in 1947, surrounded by Partition violence and princely-state uncertainty.',
            decisions: [{ prompt: 'Which member of the Constituent Assembly moved the Objectives Resolution on 13 December 1946, and what key phrase did he use to describe.', options: [
                { text: 'Jawaharlal Nehru moved the Objectives Resolution', outcome: 'Jawaharlal Nehru moved the Objectives Resolution. He stated: “We are not going just to copy….' },
                { text: 'copied the British model', outcome: 'Not quite — Students often believe the Constituent Assembly **never seriously debated the presidential system**.', reveals: 'the-constituent-assembly-never-seriously' },
                { text: 'Ambedkar or Patel', outcome: 'Not quite — Students often believe the Constituent Assembly **never seriously debated the presidential system**.', reveals: 'the-constituent-assembly-never-seriously' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_12_005', title: 'Federalism in the Constitution: Centre-State Relations and the Union List Debate',
          caseStudy: { intro: 'Imagine you are a Constituent Assembly member in August 1947 — Partition riots are raging, millions of refugees are pouring in, and 565 princely states haven\'t.',
            decisions: [{ prompt: 'In the Constituent Assembly, which committee was chaired by Sardar Vallabhbhai Patel and dealt with provincial constitutions?', options: [
                { text: 'The Provincial Constitution Committee was chaired by Sardar Vallabhbhai Patel', outcome: 'The Provincial Constitution Committee was chaired by Sardar Vallabhbhai Patel.' },
                { text: 'Indian federalism is quasi-federal', outcome: 'Not quite — Students think "Indian federalism is quasi-federal because the Constitution says so" — they.', reveals: 'indian-federalism-is-quasi-federal' },
                { text: '"Indian federalism is quasi-federal', outcome: 'Not quite — Students think "Indian federalism is quasi-federal because the Constitution says so" — they.', reveals: 'indian-federalism-is-quasi-federal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_12_006', title: 'Fundamental Rights: Debates on Property, Free Speech and Preventive Detention',
          caseStudy: { intro: 'Imagine you are a Constituent Assembly member in 1947: the Partition violence has just ended, millions are displaced, and the new government must abolish.',
            decisions: [{ prompt: 'Which two Articles in the original Constitution (1950) jointly guaranteed the right to property, and which Article permitted the state.', options: [
                { text: 'Articles 19(1)(f) and 31(1) guaranteed the right to acquire, hold, and dispose of property', outcome: 'Articles 19(1)(f) and 31(1) guaranteed the right to acquire, hold, and dispose of property; Article.' },
                { text: 'reasonable restrictions', outcome: 'Not quite — Students believe the Constituent Assembly *unanimously* supported strong Fundamental Rights and.', reveals: 'the-constituent-assembly-unanimously-supported' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A school exhibition poster declares \'Ambedkar wrote our Constitution single-handedly\' — and a classmate counters \'he was just the chairman, he wrote nothing.\'',
            decisions: [{ prompt: 'What does the Drafting Committee\'s record actually support?', options: [
                { text: 'Split the difference precisely — Ambedkar piloted the draft through clause-by-clause debates and shaped its core, but the Committee had six other members, B.N. Rau built the blueprint before it met, and the Assembly adopted thousands of amendments; it\'s a collective text he steered.', outcome: 'The chapter\'s verdict: \'Ambedkar\'s Constitution\' is half-true — he\'s first among equals, not sole author, and \'just chairman\' erases the hand that stitched committee reports into legal articles.' },
                { text: 'Keep the poster — chairman of the drafting body effectively means sole author.', outcome: 'That erases Munshi, Aiyar, the Ayyangars and Rau\'s prior blueprint — and the Assembly\'s 2,000-plus amendments; sole authorship is a myth the records don\'t bear.', reveals: 'chairman-equals-author' },
                { text: 'Side with the classmate — a committee product means no individual mattered.', outcome: 'Collective doesn\'t mean anonymous: Ambedkar\'s fingerprints are on Article 17\'s absolutism and the strong-Centre stance alike; the process was collective but the steering was his.', reveals: 'committee-equals-faceless' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read the Objectives Resolution as a founding argument — and hear Partition\'s pressure inside every clause.',
            decisions: [{ prompt: 'What comes next? Framing the Constitution · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Framing the Constitution · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_12_001', difficulty: 'standard',
          question: 'The Constituent Assembly (1946–1949) was the body tasked with framing India\'s.',
          hint: 'Revisit Class 10 node c10_hist_cbse_02_007 (Civil Disobedience Movement and 1935 Act) for.',
          misconception: 'Students believe the Constituent Assembly was *directly elected by universal adult franchise* and therefore fully.',
          parts: [
                { id: 'a', prompt: 'Nehru\'s Objectives Resolution (13 Dec 1946) proclaimed India an "Independent Sovereign Republic" but omitted the word "democratic." Using Nehru\'s own.', answer: 'Nehru argued "republic" inherently contains "democratic"',
                  options: ['Nehru argued "republic" inherently contains "democratic"', 'A wrong answer claiming Nehru avoided', 'to appease socialists or British misses his own words: he wanted to avoid', 'the people'],
                  hint: 'Revisit Class 10 node c10_hist_cbse_02_007 (Civil Disobedience Movement and 1935 Act) for franchise.',
                  misconception: 'Students believe the Constituent Assembly was *directly elected by universal adult franchise* and therefore fully representative of "the.' }
          ],
            remediations: { 'the-constituent-assembly-was-directly': { steps: ['If the student holds the universal-franchise misconception: (1) Revisit Class 10 node c10_hist_cbse_02_007 (Civil.', '(2) Compare the 1946 provincial election electorate (tax-paying, property, education qualifications) with post-1950.', '(3) Re-read Source 2 (Lahiri) and Source 6 (Ranga) — ask: "If the Assembly was directly elected by all adults, why.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Constituent Assembly was *directly elected by universal adult franchise* and therefore fully.',
          parts: [
                { id: 'a', prompt: 'Construct a timeline (9 Dec 1946 – 26 Jan 1950) marking: (a) Constituent Assembly\'s first session, (b) Objectives Resolution, (c) Independence/Partition, (d).', answer: 'Timeline: (a) 9 Dec 1946',
                  options: ['Timeline: (a) 9 Dec 1946', 'the people'],
                  hint: 'Revisit Class 10 node c10_hist_cbse_02_007 (Civil Disobedience Movement and 1935 Act) for franchise.',
                  misconception: 'Students believe the Constituent Assembly was *directly elected by universal adult franchise* and therefore fully representative of "the.' }
          ],
            remediations: { 'the-constituent-assembly-was-directly': { steps: ['If the student holds the universal-franchise misconception: (1) Revisit Class 10 node c10_hist_cbse_02_007 (Civil.', '(2) Compare the 1946 provincial election electorate (tax-paying, property, education qualifications) with post-1950.', '(3) Re-read Source 2 (Lahiri) and Source 6 (Ranga) — ask: "If the Assembly was directly elected by all adults, why.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_12_002', difficulty: 'standard',
          question: 'The Drafting Committee, constituted on 29 August 1947 under the chairmanship.',
          hint: 'If stuck, revisit **c12_hist_cbse_12_001** — specifically the "Important Committees".',
          misconception: 'Students believe **Dr. Ambedkar single-handedly "wrote" the Constitution** — imagining him drafting articles alone in.',
          parts: [
                { id: 'a', prompt: 'Name the seven members of the Drafting Committee and identify who served as its Chairman, Constitutional Advisor, and Chief Draughtsman.', answer: 'The Drafting Committee members were: Dr',
                  options: ['The Drafting Committee members were: Dr', 'Nehru or Patel as members —'],
                  hint: 'If stuck, revisit **c12_hist_cbse_12_001** — specifically the "Important Committees" table and the.',
                  misconception: 'Students believe **Dr. Ambedkar single-handedly "wrote" the Constitution** — imagining him drafting articles alone in a room.' }
          ],
            remediations: { 'dr': { steps: ['If the student holds the "sole author" misconception: **Step 1** — Revisit **c12_hist_cbse_12_001** (Constituent.', '**Step 2** — Read **CAD Vol.', 'VII, 4 Nov 1948** (Ambedkar\'s speech introducing the Draft Constitution) where he *explicitly credits* Rau, Mukherjee.', '**Step 3** — Do a **source-comparison exercise**: take Article 14 (Equality) and trace its wording from the *Advisory.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_12_003', difficulty: 'standard',
          question: 'The Objectives Resolution, moved by Jawaharlal Nehru on 13 December 1946 in the.',
          hint: 'Revisit c12_hist_cbse_12_001 (Assembly formation) and c6_history_ch12_051 (Class 6.',
          misconception: 'Students often think the Objectives Resolution *is* the Preamble, or that it included the words "Socialist" and.',
          parts: [
                { id: 'a', prompt: 'On what date did Jawaharlal Nehru move the Objectives Resolution in the Constituent Assembly, and what were the three key ideals it proclaimed for the future.', answer: 'The Objectives Resolution was moved on 13 December 1946',
                  options: ['The Objectives Resolution was moved on 13 December 1946', 'secularism', 'Socialist', 'Secular'],
                  hint: 'Revisit c12_hist_cbse_12_001 (Assembly formation) and c6_history_ch12_051 (Class 6 Constitution.',
                  misconception: 'Students often think the Objectives Resolution *is* the Preamble, or that it included the words "Socialist" and "Secular" from the start.' },
                { id: 'b', prompt: 'In his speech, Nehru referred to the American, French, and Russian revolutions.', answer: 'From the American Revolution: a Constitution can endure and build a great nation',
                  options: ['From the American Revolution: a Constitution can endure and build a great nation', 'Nehru wanted to copy the Russian model', 'Socialist', 'Secular'],
                  hint: 'Revisit c12_hist_cbse_12_001 (Assembly formation) and c6_history_ch12_051 (Class 6 Constitution.',
                  misconception: 'Students often think the Objectives Resolution *is* the Preamble, or that it included the words "Socialist" and "Secular" from the start.' }
          ],
            remediations: { 'the-objectives-resolution-is-the': { steps: ['If the student conflates the Resolution with the Preamble, have them create a two-column table: Column A — exact.', 'Use the NCERT text (Source 1) and the Preamble text.', 'Then ask: "Which phrases appear in both?', 'Which are new in the Preamble?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_12_004', difficulty: 'standard',
          question: 'The debate on the form of government in the Constituent Assembly (1946–1949).',
          hint: 'If stuck, revisit the 1935 Act’s provincial autonomy provisions (Class 10 History.',
          misconception: 'Students often believe the Constituent Assembly **never seriously debated the presidential system** and simply “copied.',
          parts: [
                { id: 'a', prompt: 'Which member of the Constituent Assembly moved the Objectives Resolution on 13 December 1946, and what key phrase did he use to describe the form of democracy.', answer: 'Jawaharlal Nehru moved the Objectives Resolution',
                  options: ['Jawaharlal Nehru moved the Objectives Resolution', 'copied the British model', 'Ambedkar or Patel'],
                  hint: 'If stuck, revisit the 1935 Act’s provincial autonomy provisions (Class 10 History: Nationalism.',
                  misconception: 'Students often believe the Constituent Assembly **never seriously debated the presidential system** and simply “copied the British model.”.' }
          ],
            remediations: { 'the-constituent-assembly-never-seriously': { steps: ['If the student holds the “no real debate / blind copying” misconception: 1.', 'Re-read **Source 1** (Nehru’s Objectives Resolution speech) in the NCERT text — highlight “We are not going just.', 'Shah’s presidential amendment** in the Constituent Assembly Debates (CAD Vol.', 'VII, Nov 1948) — summarize his three main arguments.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_12_005', difficulty: 'standard',
          question: 'Federalism in the Indian Constitution refers to the constitutional division.',
          hint: 'Revisit Class 8 node c8_hist_ch4_2 (1935 Act provincial autonomy) and Class 10 node.',
          misconception: 'Students think "Indian federalism is quasi-federal because the Constitution says so" — they memorise K.C.',
          parts: [
                { id: 'a', prompt: 'In the Constituent Assembly, which committee was chaired by Sardar Vallabhbhai Patel and dealt with provincial constitutions?', answer: 'The Provincial Constitution Committee was chaired by Sardar Vallabhbhai Patel',
                  options: ['The Provincial Constitution Committee was chaired by Sardar Vallabhbhai Patel', 'Indian federalism is quasi-federal', '"Indian federalism is quasi-federal'],
                  hint: 'Revisit Class 8 node c8_hist_ch4_2 (1935 Act provincial autonomy) and Class 10 node.',
                  misconception: 'Students think "Indian federalism is quasi-federal because the Constitution says so" — they memorise K.C.' },
                { id: 'b', prompt: 'Why did K. Santhanam argue that overburdening the Centre with powers would weaken rather than strengthen it?', answer: 'Santhanam argued that an overburdened Centre cannot function effectively',
                  options: ['Santhanam argued that an overburdened Centre cannot function effectively', 'he wanted states to be weak', 'he opposed federalism', 'analyse'],
                  hint: 'Revisit Class 8 node c8_hist_ch4_2 (1935 Act provincial autonomy) and Class 10 node.',
                  misconception: 'Students think "Indian federalism is quasi-federal because the Constitution says so" — they memorise K.C.' }
          ],
            remediations: { 'indian-federalism-is-quasi-federal': { steps: ['If the student cannot explain *why* the Centre got residual powers (unlike the 1935 Act), have them: 1) Re-read Source.', 'Ramaswamy Mudaliar\'s speech) and Source 10 (Nehru\'s letter) in the NCERT text.', '2) Compare the 1935 Act\'s Federal List (Class 8 node c8_hist_ch4_2 context) with the Constitution\'s Union List using.', '3) Write a 100-word answer: "The shift from Governor-General\'s residuary power to Centre\'s residuary power was driven.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_12_006', difficulty: 'standard',
          question: 'This node examines the intense Constituent Assembly debates (1946–1949).',
          hint: 'If stuck, revisit the Objectives Resolution (c12_hist_cbse_12_003) and the "Tumultuous.',
          misconception: 'Students believe the Constituent Assembly *unanimously* supported strong Fundamental Rights and that "reasonable.',
          parts: [
                { id: 'a', prompt: 'Compare the property-rights debate with the free-speech debate: in both, the Assembly chose "qualified rights." But the *nature* of the qualification differed.', answer: 'Property: qualification was *substantive*',
                  options: ['Property: qualification was *substantive*', 'same — reasonable restrictions', 'reasonable restrictions'],
                  hint: 'If stuck, revisit the Objectives Resolution (c12_hist_cbse_12_003) and the "Tumultuous Time".',
                  misconception: 'Students believe the Constituent Assembly *unanimously* supported strong Fundamental Rights and that "reasonable restrictions" were a minor.' }
          ],
            remediations: { 'the-constituent-assembly-unanimously-supported': { steps: ['If the student conflates the *original* constitutional text with *later amendments* or *judicial rulings*: Step 1.', 'Step 2 — Create a three-column table: Right | Pro-restriction argument (with speaker) | Anti-restriction argument (with.', 'Step 3 — Watch the 15-minute NPTEL lecture "Fundamental Rights in the Constituent Assembly" (IIT Madras, History.', 'Step 4 — Re-attempt Diagnostic Questions 2 and 4, explicitly citing *speaker names* and *dates* (e.g., "T.T.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
