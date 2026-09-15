import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch08_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch08_p2: SimDef = {
    id: 'v3_c12_ps_ch08_p2',
    title: 'Challenges of Nation Building · Part 2/2',
    subtitle: 'A line drawn in weeks, a wound measured in generations',
    classLevel: 12, subject: 'political_science', topic: 'Challenges of Nation Building · Part 2/2',
    chapters: ['c12_ps_ch08'],
    nodeIds: ['c12_ps_cbse_08_007', 'c12_ps_cbse_08_008', 'c12_ps_cbse_08_009', 'c12_ps_cbse_08_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Partition historian', intro: 'Freedom at midnight came with a footnote nobody read: the map arrived after the flags did.', goal: 'Analyse the political choices behind Partition, the Radcliffe Award\'s structural flaws, and the secular constitutional response.' },
    discovery: {
        question: 'On 15 August 1947, millions in Punjab and Bengal literally did not know which country they were waking up in. How did a border get drawn over 14 million people without them knowing?',
        options: ['A British lawyer who had never visited India drew district-level lines by religious majority in weeks, and the award was published after independence', 'The boundary followed ancient provincial borders everyone knew', 'People chose their country by referendum district by district', 'The line was agreed by Congress and the League years earlier'],
        answer: 'A British lawyer who had never visited India drew district-level lines by religious majority in weeks, and the award was published after independence',
        hook: 'Partition wasn\'t ancient hatred finally boiling over — decades of Hindu-Muslim cooperation preceded it. It was built in the 1940s: a failed federal compromise, a hasty British exit, and a mechanical map exercise that split villages and canal systems.',
    },
    teaching: [
        { title: 'Linguistic Reorganisation of States (1956) and Its Impact', text: 'Linguistic reorganisation of states refers to the process of redrawing internal boundaries of Indian states along linguistic lines, formalised through the States Reorganisation Act, 1956, based.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_08_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace the chain from the 1940 Lahore Resolution through the collapsed Cabinet Mission Plan to the Radcliffe Line — and test whether Partition actually solved the communal problem it claimed to fix.',
        labels: ['Linguistic Reorganisation of States', 'The Planning Commission', 'First General Elections', 'Refugees, Rehabilitation and'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_08_007', title: 'Linguistic Reorganisation of States (1956) and Its Impact',
          caseStudy: { intro: 'Imagine you are a student in 1952 Madras Presidency: your textbooks, court proceedings, and government notices are in a language you barely understand, while.',
            decisions: [{ prompt: 'What was the immediate trigger that forced the Central government to announce the formation of a separate Andhra state in December 1952?', options: [
                { text: 'Potti Sriramulu\'s 56-day fast unto death (19 October – 15 December 1952) and the', outcome: 'Potti Sriramulu\'s 56-day fast unto death (19 October – 15 December 1952) and the subsequent violent.' },
                { text: 'the SRC report', outcome: 'Not quite — Students often believe the States Reorganisation Act, 1956 created *all* current Indian states.', reveals: 'the-states-reorganisation-act' },
                { text: 'Nehru\'s voluntary decision', outcome: 'Not quite — Students often believe the States Reorganisation Act, 1956 created *all* current Indian states.', reveals: 'the-states-reorganisation-act' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_08_008', title: 'The Planning Commission and the Strategy of Planned Development',
          caseStudy: { intro: 'Imagine you are a policy advisor in 1950: India has just adopted a Constitution promising economic justice (Articles 38, 39), but there is no mechanism.',
            decisions: [{ prompt: 'What was the constitutional basis for establishing the Planning Commission in 1950, and which specific Directive Principles did it aim.', options: [
                { text: 'The Planning Commission was established by a Cabinet Resolution (not a constitutional', outcome: 'The Planning Commission was established by a Cabinet Resolution (not a constitutional amendment).' },
                { text: 'Article 280 (Finance Commission)', outcome: 'Not quite — Students often think the Planning Commission was a constitutional body like the Election Commission.', reveals: 'the-planning-commission-was-a' },
                { text: 'Article 263 (Inter-State Council)', outcome: 'Not quite — Students often think the Planning Commission was a constitutional body like the Election Commission.', reveals: 'the-planning-commission-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_08_010', title: 'Refugees, Rehabilitation and the Human Cost of Partition',
          caseStudy: { intro: 'Imagine you open your grandmother\'s steel trunk and find a yellowed property deed for a house in Lahore, a school certificate from Rawalpindi, and a ration.',
            decisions: [{ prompt: 'What was the estimated number of people forced to migrate across the new India-Pakistan border during Partition (1947–1948), and what was.', options: [
                { text: 'Approximately 80 lakh (8 million) people migrated', outcome: 'Approximately 80 lakh (8 million) people migrated; 5–10 lakh (500,000–1,000,000) killed.' },
                { text: '10 lakh migrated, 1 lakh died', outcome: 'Not quite — Students often believe "rehabilitation was just about giving land to refugees" and miss the.', reveals: 'rehabilitation-was-just-about-giving' },
                { text: 'rehabilitation was just about giving land to refugees', outcome: 'Not quite — Students often believe "rehabilitation was just about giving land to refugees" and miss the.', reveals: 'rehabilitation-was-just-about-giving' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a mock constituent assembly, a student declares the 565 princely states \'automatically became India\'s on 15 August 1947 — the British left, so the map was settled.\'',
            decisions: [{ prompt: 'What did the lapse of paramountcy actually do?', options: [
                { text: 'It freed every state legally — rulers could accede to India, Pakistan, or stay independent, which is why Patel ran a staged integration: Instrument of Accession for three subjects, popular will as the legitimising test, merger agreements after; \'automatic\' skips both the legal vacuum and the diplomacy that filled it.', outcome: 'The chapter\'s core: independence Day created a sovereignty question, not an answer — the union was negotiated into existence, with force only where consent failed.' },
                { text: 'He\'s right — Partition decided everything; the states just followed their provinces.', outcome: 'Partition\'s religious-majority logic applied to British provinces, not princely states — paramountcy\'s lapse made each ruler a separate legal question, which is exactly why Hyderabad and Junagadh needed more than a signature.', reveals: 'accession-was-automatic' },
                { text: 'The Instrument of Accession merged them fully — one signature made them Indian states.', outcome: 'The IoA surrendered only defence, external affairs and communications — it was stage one of a sequence (accession → standstill → merger → constitutional integration), not the whole event.', reveals: 'ioa-equals-merger' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_08_010', title: 'You made it',
          caseStudy: { intro: 'You can now argue why Partition solved nothing it promised — it left more Muslims in India than in West Pakistan and created two minority problems — and why India answered it with a secular constitution.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_08_007', difficulty: 'standard',
          question: 'Linguistic reorganisation of states refers to the process of redrawing internal.',
          hint: 'Revisit Article 3 (Parliament\'s power to form new states/alter boundaries) and the.',
          misconception: 'Students often believe the States Reorganisation Act, 1956 created *all* current Indian states on linguistic lines.',
          parts: [
                { id: 'a', prompt: 'What was the immediate trigger that forced the Central government to announce the formation of a separate Andhra state in December 1952?', answer: 'Potti Sriramulu\'s 56-day fast unto death (19 October – 15 December 1952) and the',
                  options: ['Potti Sriramulu\'s 56-day fast unto death (19 October – 15 December 1952) and the', 'the SRC report', 'Nehru\'s voluntary decision', 'Which state was NOT formed in 1956?'],
                  hint: 'Revisit Article 3 (Parliament\'s power to form new states/alter boundaries) and the distinction.',
                  misconception: 'Students often believe the States Reorganisation Act, 1956 created *all* current Indian states on linguistic lines.' },
                { id: 'b', prompt: 'Compare the basis of state formation in 1956 (States Reorganisation Act) with the basis for creating Chhattisgarh, Uttarakhand, and Jharkhand in 2000.', answer: '1956: *linguistic homogeneity* was the primary criterion (SRC recommendation)',
                  options: ['1956: *linguistic homogeneity* was the primary criterion (SRC recommendation)', 'Which state was NOT formed in 1956?', 'Was language the only basis?'],
                  hint: 'Revisit Article 3 (Parliament\'s power to form new states/alter boundaries) and the distinction.',
                  misconception: 'Students often believe the States Reorganisation Act, 1956 created *all* current Indian states on linguistic lines.' }
          ],
            remediations: { 'the-states-reorganisation-act': { steps: ['Re-read the "Fast Forward" box in NCERT (page 23) listing post-1956 state formations with years and bases.', 'Create a timeline: 1956 (linguistic) → 1960 (bilingual Bombay split) → 1966 (Punjab reorganisation) → 1972/1987.', 'For each, note the *primary demand* (language, culture, development, identity).', 'Practice MCQs from CBSE sample papers asking "Match the state with its year/basis of formation."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the States Reorganisation Act, 1956 created *all* current Indian states on linguistic lines.',
          parts: [
                { id: 'a', prompt: '"Linguistic reorganisation strengthened Indian unity rather than weakening it." Evaluate this claim using evidence from the NCERT text and at least two.', answer: 'The claim is *valid*',
                  options: ['The claim is *valid*', 'it caused fragmentation', 'Which state was NOT formed in 1956?', 'Was language the only basis?'],
                  hint: 'Revisit Article 3 (Parliament\'s power to form new states/alter boundaries) and the distinction.',
                  misconception: 'Students often believe the States Reorganisation Act, 1956 created *all* current Indian states on linguistic lines.' },
                { id: 'b', prompt: 'Draft a one-paragraph recommendation for a hypothetical States Reorganisation Commission in 2025 addressing a demand for a new state based on *economic.', answer: 'A strong answer will: (1) Acknowledge language is no longer the *sole* criterion',
                  options: ['A strong answer will: (1) Acknowledge language is no longer the *sole* criterion', 'Which state was NOT formed in 1956?', 'Was language the only basis?'],
                  hint: 'Revisit Article 3 (Parliament\'s power to form new states/alter boundaries) and the distinction.',
                  misconception: 'Students often believe the States Reorganisation Act, 1956 created *all* current Indian states on linguistic lines.' }
          ],
            remediations: { 'the-states-reorganisation-act': { steps: ['Re-read the "Fast Forward" box in NCERT (page 23) listing post-1956 state formations with years and bases.', 'Create a timeline: 1956 (linguistic) → 1960 (bilingual Bombay split) → 1966 (Punjab reorganisation) → 1972/1987.', 'For each, note the *primary demand* (language, culture, development, identity).', 'Practice MCQs from CBSE sample papers asking "Match the state with its year/basis of formation."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_08_008', difficulty: 'standard',
          question: 'The Planning Commission (established 1950) was an extra-constitutional body.',
          hint: 'Revisit c11_ps_cbse_04_008 (Directive Principles) and c11_ps_cbse_11_011 (Relationship.',
          misconception: 'Students often think the Planning Commission was a constitutional body like the Election Commission or Finance.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Planning Commission (established 1950) was an extra-constitutional body chaired by',
                  options: ['The Planning Commission (established 1950) was an extra-constitutional body chaired by', 'The Partition of India (1947) refers to the division of British India into two', 'The integration of princely states refers to the political and diplomatic process', 'The accession of Hyderabad and Junagadh refers to the process by'],
                  hint: 'Revisit c11_ps_cbse_04_008 (Directive Principles) and c11_ps_cbse_11_011 (Relationship between.',
                  misconception: 'Students often think the Planning Commission was a constitutional body like the Election Commission or Finance Commission.' }
          ],
            remediations: { 'the-planning-commission-was-a': { steps: ['If the misconception persists: (1) Re-read the Cabinet Resolution of 15 March 1950 (available on PIB archives) — note.', '(2) Compare with Article 280 (Finance Commission) which uses "shall be constituted" — mandatory constitutional language.', '(3) Complete a table: Constitutional Body (EC, FC, UPSC) vs.', 'Executive Body (Planning Commission, NITI Aayog, UGC) — identify appointment process, removal, and accountability for.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_08_009', difficulty: 'standard',
          question: 'The First General Elections of 1951-52 were the inaugural nationwide elections.',
          hint: 'Revisit c11_ps_cbse_12_003 (Universal Adult Franchise) and c11_ps_cbse_12_008 (Election.',
          misconception: 'Students often believe the first elections were a smooth, uncontested Congress victory because of Nehru\'s popularity.',
          parts: [
                { id: 'a', prompt: 'Why did the Election Commission introduce party symbols for the 1951-52 elections, and how did this innovation address a specific challenge of the Indian.', answer: 'Party symbols were introduced',
                  options: ['Party symbols were introduced', 'to help political parties campaign', 'to reduce ballot paper size'],
                  hint: 'Revisit c11_ps_cbse_12_003 (Universal Adult Franchise) and c11_ps_cbse_12_008 (Election Commission).',
                  misconception: 'Students often believe the first elections were a smooth, uncontested Congress victory because of Nehru\'s popularity, overlooking the.' }
          ],
            remediations: { 'the-first-elections-were-a': { steps: ['If the student holds the above misconception: (1) Re-read the NCERT section on "The First General Elections" (Chapter.', '(2) Watch the 10-minute documentary "India\'s First Election" (available on YouTube/PIB) showing ballot boxes.', '(3) Compare the 1951-52 election data (turnout, parties, seats) with the 2019 election in a table to see continuity and.', '(4) Re-attempt Diagnostic Questions 3 and 5 with this evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_08_010', difficulty: 'standard',
          question: 'The Partition of India (1947) triggered one of history\'s largest forced.',
          hint: 'Revisit c11_ps_cbse_06_005 (Marshall\'s citizenship) and c11_ps_cbse_08_004 (Indian.',
          misconception: 'Students often believe "rehabilitation was just about giving land to refugees" and miss the constitutional crisis: the.',
          parts: [
                { id: 'a', prompt: 'What was the estimated number of people forced to migrate across the new India-Pakistan border during Partition (1947–1948), and what was the estimated death.', answer: 'Approximately 80 lakh (8 million) people migrated',
                  options: ['Approximately 80 lakh (8 million) people migrated', '10 lakh migrated, 1 lakh died', 'rehabilitation was just about giving land to refugees', 'the state favored Hindus'],
                  hint: 'Revisit c11_ps_cbse_06_005 (Marshall\'s citizenship) and c11_ps_cbse_08_004 (Indian secularism).',
                  misconception: 'Students often believe "rehabilitation was just about giving land to refugees" and miss the constitutional crisis: the same state that.' },
                { id: 'b', prompt: 'Why did the Partition of Punjab and Bengal cause deeper trauma than the division of other provinces?', answer: 'Punjab and Bengal had no clear Muslim/non-Muslim majority at the province level',
                  options: ['Punjab and Bengal had no clear Muslim/non-Muslim majority at the province level', 'religious violence', 'minority problem', 'rehabilitation was just about giving land to refugees'],
                  hint: 'Revisit c11_ps_cbse_06_005 (Marshall\'s citizenship) and c11_ps_cbse_08_004 (Indian secularism).',
                  misconception: 'Students often believe "rehabilitation was just about giving land to refugees" and miss the constitutional crisis: the same state that.' },
                { id: 'c', prompt: 'A Hindu family from Sialkot (West Punjab) arrives in Delhi in September 1947 with no assets.', answer: 'The principle is "compensatory justice"',
                  options: ['The principle is "compensatory justice"', 'this violates Article 14', 'rehabilitation was just about giving land to refugees', 'the state favored Hindus'],
                  hint: 'Revisit c11_ps_cbse_06_005 (Marshall\'s citizenship) and c11_ps_cbse_08_004 (Indian secularism).',
                  misconception: 'Students often believe "rehabilitation was just about giving land to refugees" and miss the constitutional crisis: the same state that.' }
          ],
            remediations: { 'rehabilitation-was-just-about-giving': { steps: ['If the student conflates refugee rehabilitation with minority appeasement: Step 1 — Re-read Nehru\'s 15 Oct 1947 letter.', 'Step 2 — Map the distinction: Refugee = person displaced by Partition (any religion); Minority = religious group.', 'Step 3 — Analyze the 1950 Delhi property ordinance: it protected Muslim evacuee property from forced occupation while.', 'Step 4 — Re-attempt Diagnostic Question 3 with this framework.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
