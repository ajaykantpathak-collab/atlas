import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch15_p1: SimDef = {
    id: 'v3_c12_ps_ch15_p1',
    title: 'Recent Developments in Indian Politics · Part 1/2',
    subtitle: 'When the largest party chose the opposition benches',
    classLevel: 12, subject: 'political_science', topic: 'Recent Developments in Indian Politics · Part 1/2',
    chapters: ['c12_ps_ch15'],
    nodeIds: ['c12_ps_cbse_15_001', 'c12_ps_cbse_15_002', 'c12_ps_cbse_15_003', 'c12_ps_cbse_15_004', 'c12_ps_cbse_15_005', 'c12_ps_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Coalition politics analyst', intro: 'One election flipped the logic of Indian power: from one party absorbing everyone, to everyone assembling against one party.', goal: 'Explain the 1989 turning point and the structural features of India\'s coalition era.' },
    discovery: {
        question: 'In 1989, Congress stayed the single largest party with 197 seats — and voluntarily sat in the opposition benches while its enemies\' enemies teamed up to rule. Why hand over power?',
        options: ['It couldn\'t reach a majority and had no willing allies — so a National Front minority government ran the country on outside support from the BJP and the Left simultaneously', 'The President refused to invite Congress', 'Congress had legally lost the right to form government', 'It planned to merge with the Janata Dal'],
        answer: 'It couldn\'t reach a majority and had no willing allies — so a National Front minority government ran the country on outside support from the BJP and the Left simultaneously',
        hook: 'The \'Congress system\' didn\'t end because Congress vanished — it remained the largest party for years. What ended was its monopoly on aggregating interests: regional and ideological parties became power centres, making coalitions the new normal.',
    },
    teaching: [
        { title: 'End of the Congress System and the Rise of Coalition Politics', text: 'The "Congress system" refers to the period (1947–1989) when the Indian National Congress functioned as a dominant, catch-all party accommodating diverse social groups and interests, effectively.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_15_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reconstruct the 1989 verdict and its strange bedfellows — a right-wing and a left-wing bloc propping up the same government — and test whether coalition politics weakened or deepened Indian democracy.',
        labels: ['End of the Congress', 'Rise of the BJP', 'Mandal Commission and OBC', 'Babri Masjid Demolition (1992)', 'Economic Liberalisation of 1991', 'Coalition Governments: United Front,'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_15_001', title: 'End of the Congress System and the Rise of Coalition Politics',
          caseStudy: { intro: 'Imagine you are reading a 2024 newspaper headline: "BJP wins 240 seats, falls short of majority, relies on NDA allies to form government." Ask: "How is this.',
            decisions: [{ prompt: 'In which year did the Congress party lose its majority in the Lok Sabha for the first time, marking the end of the "Congress system".', options: [
                { text: '1989', outcome: '1989. The Congress won 197 seats (down from 415 in 1984) and lost its parliamentary majority.' },
                { text: '**"the Congress system ended', outcome: 'Not quite — Students often think **"the Congress system ended because the Congress party disintegrated.', reveals: 'the-congress-system-ended-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_15_002', title: 'Rise of the BJP and the Politics of Hindutva',
          caseStudy: { intro: 'Imagine you are reading a newspaper headline from 2019: "Supreme Court verdict on Ayodhya paves way for Ram Temple." To understand why this is a landmark.',
            decisions: [{ prompt: 'What is the ideological concept of \'Hindutva\' as defined by V.D. Savarkar, and how does it differ from the religious practice of Hinduism?', options: [
                { text: 'Hindutva, as defined by Savarkar, is a political ideology that equates Indian nationhood', outcome: 'Hindutva, as defined by Savarkar, is a political ideology that equates Indian nationhood with.' },
                { text: 'the BJP has always been a Hindutva party', outcome: 'Not quite — Students often think the BJP has always been a Hindutva party since its formation in 1980.', reveals: 'the-bjp-has-always-been' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_15_003', title: 'Mandal Commission and OBC Reservations: The 1990 Mandate',
          caseStudy: { intro: 'Imagine you are reading a 1990 newspaper headline: "V.P. Singh Implements Mandal Report, Students Protest Across North India." Start by asking: Why did a 1980.',
            decisions: [{ prompt: 'What was the official name of the commission chaired by B.P. Mandal, and in which year was it appointed?', options: [
                { text: 'The Second Backward Classes Commission, appointed in 1978 by the Janata Party government', outcome: 'The Second Backward Classes Commission, appointed in 1978 by the Janata Party government under.' },
                { text: 'First Backward Classes Commission', outcome: 'Not quite — Students often believe the Mandal Commission *created* OBC reservations in 1990.', reveals: 'the-mandal-commission-created-obc' },
                { text: 'appointed in 1990', outcome: 'Not quite — Students often believe the Mandal Commission *created* OBC reservations in 1990.', reveals: 'the-mandal-commission-created-obc' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_15_004', title: 'Babri Masjid Demolition (1992) and Communal Politics',
          caseStudy: { intro: 'Imagine you are watching a news report about the 2019 Supreme Court verdict on Ayodhya — the anchors call it "historic," "closure," and "a test of Indian.',
            decisions: [{ prompt: 'What was the immediate legal trigger in 1986 that transformed the Ayodhya dispute from a dormant title suit into a mass mobilisation issue?', options: [
                { text: 'The Faizabad (now Ayodhya) district court ordered the unlocking of the Babri Masjid', outcome: 'The Faizabad (now Ayodhya) district court ordered the unlocking of the Babri Masjid structure.' },
                { text: 'the 1992 demolition', outcome: 'Not quite — Students often believe the Babri Masjid demolition was "just a religious event" or "inevitable due.', reveals: 'the-babri-masjid-demolition-was' },
                { text: 'the 1949 idol placement', outcome: 'Not quite — Students often believe the Babri Masjid demolition was "just a religious event" or "inevitable due.', reveals: 'the-babri-masjid-demolition-was' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_15_005', title: 'Economic Liberalisation of 1991 and Its Political Consequences',
          caseStudy: { intro: 'Imagine you\'re reading a 1991 newspaper headline: "India airlifts 47 tonnes of gold to Bank of England to avoid default." That crisis — a balance of payments.',
            decisions: [{ prompt: 'What were the three immediate triggers that compelled the Narasimha Rao government to launch the New Economic Policy in July 1991?', options: [
                { text: 'The three triggers were: (1) a severe balance of payments crisis with forex reserves down', outcome: 'The three triggers were: (1) a severe balance of payments crisis with forex reserves down to ~$1.2.' },
                { text: 'pressure from the World Bank alone', outcome: 'Not quite — Students believe the 1991 reforms were "imposed by the IMF/World Bank" and that Indian politicians.', reveals: 'the-1991-reforms-were-imposed' },
                { text: 'imposed by the IMF/World Bank', outcome: 'Not quite — Students believe the 1991 reforms were "imposed by the IMF/World Bank" and that Indian politicians.', reveals: 'the-1991-reforms-were-imposed' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_15_006', title: 'Coalition Governments: United Front, NDA and UPA Experiments',
          caseStudy: { intro: 'Imagine you are watching a news debate where three regional party leaders — from Tamil Nadu, Bihar, and West Bengal — negotiate cabinet berths with a national.',
            decisions: [{ prompt: 'Name the three prime ministers who headed United Front governments between 1996 and 1998, and state which party each belonged to.', options: [
                { text: 'H.D', outcome: 'H.D. Deve Gowda (Janata Dal, June 1996 – April 1997) and I.K. Gujral (Janata Dal, April 1997.' },
                { text: 'coalition governments are inherently short-lived and policy-paralyzed', outcome: 'Not quite — Students often believe coalition governments are inherently short-lived and policy-paralyzed.', reveals: 'coalition-governments-are-inherently-short' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_15_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a politics seminar, a student says \'Hindutva is just another word for the Hindu religion — BJP\'s ideology is basically faith.\'',
            decisions: [{ prompt: 'What does the distinction between Hindutva and Hinduism say?', options: [
                { text: 'They\'re different kinds of thing — Hinduism is a diverse religious tradition; Savarkar\'s Hindutva is a political doctrine defining nationhood by whether India is both fatherland and holy land to you — collapsing them hides the exclusivist nationalist claim inside a familiar word.', outcome: 'The chapter\'s precision: one is a faith with many practices, the other a test of national belonging — the slide between them is the politics, not a synonym.' },
                { text: 'He\'s right — Hindutva is simply Hindu religious identity expressed politically.', outcome: 'Savarkar\'s definition is a criterion of nationhood, not worship — \'holy land\' filters who counts as fully Indian; a religion describes practices, an ideology adjudicates belonging.', reveals: 'ideology-equals-religion' },
                { text: 'The difference is only about violence — Hindutva is just Hinduism made militant.', outcome: 'The distinction is definitional, not behavioural — Hindutva is cultural nationalism with a belonging test even in its mildest form; reducing it to militancy misses the exclusion the concept itself encodes.', reveals: 'difference-is-only-militancy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_15_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now explain why 1989, not 1977 or 2014, marks the true end of one-party dominance — power-sharing replaced dominance for the next quarter-century.',
            decisions: [{ prompt: 'What comes next? Recent Developments in Indian Politics · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Recent Developments in Indian Politics · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_15_001', difficulty: 'standard',
          question: 'The "Congress system" refers to the period (1947–1989) when the Indian National.',
          hint: 'If stuck, revisit **c11_ps_cbse_12_004** (FPTP mechanics) and **c11_ps_cbse_12_006** (Why.',
          misconception: 'Students often think **"the Congress system ended because the Congress party disintegrated or disappeared."**.',
          parts: [
                { id: 'a', prompt: 'In which year did the Congress party lose its majority in the Lok Sabha for the first time, marking the end of the "Congress system" as defined by political.', answer: '1989',
                  options: ['1989', '**"the Congress system ended'],
                  hint: 'If stuck, revisit **c11_ps_cbse_12_004** (FPTP mechanics) and **c11_ps_cbse_12_006** (Why India.',
                  misconception: 'Students often think **"the Congress system ended because the Congress party disintegrated or disappeared."** In reality, Congress remained.' }
          ],
            remediations: { 'the-congress-system-ended-because': { steps: ['If the student holds this misconception: 1.', 'Revisit **c11_ps_cbse_12_006** (Why India chose FPTP) to see how FPTP exaggerates seat shares for the largest party.', 'Study the 1989 seat-vote table in NCERT (p.', '140): Congress 40% votes → 197 seats; Janata Dal 17% votes → 143 seats.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_15_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **"the Congress system ended because the Congress party disintegrated or disappeared."**.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The end of the Congress system weakened Indian democracy because coalition governments are inherently unstable and ineffective." Use.', answer: 'The statement is **refutable**',
                  options: ['The statement is **refutable**', 'accommodation within one party', '**"the Congress system ended'],
                  hint: 'If stuck, revisit **c11_ps_cbse_12_004** (FPTP mechanics) and **c11_ps_cbse_12_006** (Why India.',
                  misconception: 'Students often think **"the Congress system ended because the Congress party disintegrated or disappeared."** In reality, Congress remained.' }
          ],
            remediations: { 'the-congress-system-ended-because': { steps: ['If the student holds this misconception: 1.', 'Revisit **c11_ps_cbse_12_006** (Why India chose FPTP) to see how FPTP exaggerates seat shares for the largest party.', 'Study the 1989 seat-vote table in NCERT (p.', '140): Congress 40% votes → 197 seats; Janata Dal 17% votes → 143 seats.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_15_002', difficulty: 'standard',
          question: 'The Bharatiya Janata Party (BJP) is a major national political party in India.',
          hint: 'Review Class 11 Political Science Chapter 8 (Secularism) and Class 11 Political Science.',
          misconception: 'Students often think the BJP has always been a Hindutva party since its formation in 1980.',
          parts: [
                { id: 'a', prompt: 'Why did the BJP criticise the Congress government\'s passage of the Muslim Women (Protection of Rights on Divorce) Act, 1986, after the Shah Bano Supreme Court.', answer: 'The BJP criticised the Act as \'appeasement\' of the minority community',
                  options: ['The BJP criticised the Act as \'appeasement\' of the minority community', 'the BJP has always been a Hindutva party'],
                  hint: 'Review Class 11 Political Science Chapter 8 (Secularism) and Class 11 Political Science Chapter 12.',
                  misconception: 'Students often think the BJP has always been a Hindutva party since its formation in 1980.' },
                { id: 'b', prompt: 'In the 1984 Lok Sabha elections, the BJP won only 2 seats. By 1996, it emerged as the single largest party with 161 seats.', answer: 'The two key developments were: (1) The Shah Bano case (1985-86)',
                  options: ['The two key developments were: (1) The Shah Bano case (1985-86)', 'the BJP has always been a Hindutva party'],
                  hint: 'Review Class 11 Political Science Chapter 8 (Secularism) and Class 11 Political Science Chapter 12.',
                  misconception: 'Students often think the BJP has always been a Hindutva party since its formation in 1980.' }
          ],
            remediations: { 'the-bjp-has-always-been': { steps: ['If the student holds this misconception, have them: (1) Read the BJP\'s 1980 founding resolution (available in party.', '(2) Create a timeline: 1980 formation → 1984 elections (2 seats) → 1986 Shah Bano/Ayodhya unlocking → 1989 Palampur.', '(3) Re-attempt Diagnostic Question 3 to see if they can now identify the causal link between ideological shift and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_15_003', difficulty: 'standard',
          question: 'The Mandal Commission (Second Backward Classes Commission, 1978) recommended.',
          hint: 'Revisit c11_ps_cbse_11_003 (Right to Equality, Articles 14-18) and c11_ps_cbse_03_006.',
          misconception: 'Students often believe the Mandal Commission *created* OBC reservations in 1990.',
          parts: [
                { id: 'a', prompt: 'Compare the political responses to the Mandal implementation (1990) and the Shah Bano case (1985).', answer: 'Shah Bano (1985) triggered Congress\'s legislative override',
                  options: ['Shah Bano (1985) triggered Congress\'s legislative override', 'Mandal Commission', 'Mandal Report', 'Mandal Implementation'],
                  hint: 'Revisit c11_ps_cbse_11_003 (Right to Equality, Articles 14-18) and c11_ps_cbse_03_006 (Affirmative.',
                  misconception: 'Students often believe the Mandal Commission *created* OBC reservations in 1990.' }
          ],
            remediations: { 'the-mandal-commission-created-obc': { steps: ['If the student conflates the Kaka Kalelkar (1953) and Mandal (1978) Commissions, revisit c11_ps_cbse_03_006.', 'For Indira Sawhney confusion, re-read the NCERT box on p.', '146-147 and the Class 11 judiciary node c11_ps_cbse_15_006 (judicial review).', 'Then re-attempt Diagnostic Questions 1 and 3, focusing on the timeline: 1953 → 1978 → 1980 → 1990 → 1992.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_15_004', difficulty: 'standard',
          question: 'The Babri Masjid demolition (December 6, 1992) refers to the destruction of.',
          hint: 'If stuck, re-read c11_ps_cbse_08_004 (Indian secularism) and c11_ps_cbse_08_010.',
          misconception: 'Students often believe the Babri Masjid demolition was "just a religious event" or "inevitable due to ancient hatreds.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Babri Masjid demolition (December 6, 1992) refers to the destruction of a',
                  options: ['The Babri Masjid demolition (December 6, 1992) refers to the destruction of a', 'The "Congress system" refers to the period (1947–1989) when the Indian National Congress', 'The Bharatiya Janata Party (BJP) is a major national political party in India founded in', 'The Mandal Commission (Second Backward Classes Commission, 1978) recommended 27%'],
                  hint: 'If stuck, re-read c11_ps_cbse_08_004 (Indian secularism) and c11_ps_cbse_08_010 (communalism.',
                  misconception: 'Students often believe the Babri Masjid demolition was "just a religious event" or "inevitable due to ancient hatreds." In reality, it was.' }
          ],
            remediations: { 'the-babri-masjid-demolition-was': { steps: ['If the student cannot distinguish between the legal, political, and communal dimensions: (1) Revisit c11_ps_cbse_08_004.', '(3) Read the 2019 verdict\'s paragraphs 786-790 (on rule of law) and 800-805 (on remedy).', '(4) Re-attempt Diagnostic Questions 3 and 5 with this sequence in mind.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_15_005', difficulty: 'standard',
          question: 'Economic Liberalisation of 1991 refers to the structural adjustment programme.',
          hint: 'If stuck on *why reforms survived*, revisit c12_ps_cbse_15_001 (Congress system.',
          misconception: 'Students believe the 1991 reforms were "imposed by the IMF/World Bank" and that Indian politicians had no agency.',
          parts: [
                { id: 'a', prompt: 'Compare the political consequences of the 1991 reforms on (a) Centre-State relations and (b) the role of regional parties in national coalitions.', answer: 'Centre-State relations and (',
                  options: ['Centre-State relations and (', 'reforms weakened regional parties', 'imposed by the IMF/World Bank'],
                  hint: 'If stuck on *why reforms survived*, revisit c12_ps_cbse_15_001 (Congress system as internal.',
                  misconception: 'Students believe the 1991 reforms were "imposed by the IMF/World Bank" and that Indian politicians had no agency.' }
          ],
            remediations: { 'the-1991-reforms-were-imposed': { steps: ['If the student conflates "IMF imposition" with "Indian agency": (1) Revisit c11_ps_cbse_13_005 (discretionary powers.', '(2) Read the 1991 Budget Speech (July 24, 1991) — Singh explicitly frames reforms as "our own conviction," not external.', '(3) Compare with 1966 devaluation (Indira Gandhi, *also* IMF-linked) — there, reforms were *reversed* within 2 years.', 'The difference: *domestic ownership* of the reform narrative.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_15_006', difficulty: 'standard',
          question: 'A coalition government in India is a Council of Ministers formed by multiple.',
          hint: 'If unclear on the 1989 turning point or hung Parliament mechanics, immediately re-read.',
          misconception: 'Students often believe coalition governments are inherently short-lived and policy-paralyzed.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A coalition government in India is a Council of Ministers formed by multiple political',
                  options: ['A coalition government in India is a Council of Ministers formed by multiple political', 'The "Congress system" refers to the period (1947–1989) when the Indian National Congress', 'The Bharatiya Janata Party (BJP) is a major national political party in India founded in', 'The Mandal Commission (Second Backward Classes Commission, 1978) recommended 27%'],
                  hint: 'If unclear on the 1989 turning point or hung Parliament mechanics, immediately re-read node.',
                  misconception: 'Students often believe coalition governments are inherently short-lived and policy-paralyzed.' }
          ],
            remediations: { 'coalition-governments-are-inherently-short': { steps: ['If the student conflates United Front/NDA/UPA timelines or cannot explain "outside support" vs.', '"joining government": (1) Revisit node c12_ps_cbse_15_001 (End of Congress System) to re-establish the 1989 turning.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
