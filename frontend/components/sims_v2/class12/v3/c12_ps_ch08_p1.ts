import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch08_p1: SimDef = {
    id: 'v3_c12_ps_ch08_p1',
    title: 'Challenges of Nation Building · Part 1/2',
    subtitle: 'A line drawn in weeks, a wound measured in generations',
    classLevel: 12, subject: 'political_science', topic: 'Challenges of Nation Building · Part 1/2',
    chapters: ['c12_ps_ch08'],
    nodeIds: ['c12_ps_cbse_08_001', 'c12_ps_cbse_08_002', 'c12_ps_cbse_08_003', 'c12_ps_cbse_08_004', 'c12_ps_cbse_08_005', 'c12_ps_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Partition historian', intro: 'Freedom at midnight came with a footnote nobody read: the map arrived after the flags did.', goal: 'Analyse the political choices behind Partition, the Radcliffe Award\'s structural flaws, and the secular constitutional response.' },
    discovery: {
        question: 'On 15 August 1947, millions in Punjab and Bengal literally did not know which country they were waking up in. How did a border get drawn over 14 million people without them knowing?',
        options: ['A British lawyer who had never visited India drew district-level lines by religious majority in weeks, and the award was published after independence', 'The boundary followed ancient provincial borders everyone knew', 'People chose their country by referendum district by district', 'The line was agreed by Congress and the League years earlier'],
        answer: 'A British lawyer who had never visited India drew district-level lines by religious majority in weeks, and the award was published after independence',
        hook: 'Partition wasn\'t ancient hatred finally boiling over — decades of Hindu-Muslim cooperation preceded it. It was built in the 1940s: a failed federal compromise, a hasty British exit, and a mechanical map exercise that split villages and canal systems.',
    },
    teaching: [
        { title: 'Partition of India: Causes, Process and Its Consequences', text: 'The Partition of India (1947) refers to the division of British India into two independent dominions — India and Pakistan — based on the \'two-nation theory\' which claimed Hindus and Muslims.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_08_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace the chain from the 1940 Lahore Resolution through the collapsed Cabinet Mission Plan to the Radcliffe Line — and test whether Partition actually solved the communal problem it claimed to fix.',
        labels: ['Partition of India: Causes,', 'Integration of Princely States', 'Accession of Hyderabad, Junagadh', 'The Kashmir Question: Accession,', 'Making of the Indian', 'Nehru\'s Vision of Nation'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_08_002', title: 'Integration of Princely States and Sardar Patel\'s Role',
          caseStudy: { intro: 'Imagine you are a district collector in 1947 receiving a map where one-third of the territory is marked "Princely States" — each with its own ruler, laws.',
            decisions: [{ prompt: 'What was the legal status of princely states immediately after the Indian Independence Act, 1947 came into effect on 15 August 1947?', options: [
                { text: 'The Indian Independence Act, 1947 declared that British paramountcy over princely states', outcome: 'The Indian Independence Act, 1947 declared that British paramountcy over princely states would.' },
                { text: 'they automatically became part of India', outcome: 'Not quite — Students often believe Sardar Patel used *only* force or coercion to integrate princely states.', reveals: 'sardar-patel-used-only-force' },
                { text: 'they became part of Pakistan based on religion', outcome: 'Not quite — Students often believe Sardar Patel used *only* force or coercion to integrate princely states.', reveals: 'sardar-patel-used-only-force' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_08_003', title: 'Accession of Hyderabad, Junagadh and the Use of Force',
          caseStudy: { intro: 'Imagine you are reading a news report about a region within a country refusing to join the national union, with the local ruler suppressing a popular uprising.',
            decisions: [{ prompt: 'What was the **Standstill Agreement** signed between the Nizam of Hyderabad and the Government of India in November 1947, and what was its.', options: [
                { text: 'The Standstill Agreement was a temporary arrangement whereby the Government of India', outcome: 'The Standstill Agreement was a temporary arrangement whereby the Government of India agreed.' },
                { text: 'it was the Instrument of Accession', outcome: 'Not quite — **Misconception**: "Junagadh was integrated by force like Hyderabad." **Reality**: Junagadh\'s.', reveals: 'misconception-junagadh-was-integrated-by' },
                { text: 'it lasted indefinitely', outcome: 'Not quite — **Misconception**: "Junagadh was integrated by force like Hyderabad." **Reality**: Junagadh\'s.', reveals: 'misconception-junagadh-was-integrated-by' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_08_004', title: 'The Kashmir Question: Accession, Article 370 and Dispute',
          caseStudy: { intro: 'Imagine you are a journalist in 1947 Srinagar: the Maharaja hesitates, Pakistani tribals advance, and India airlifts troops only after a legal document.',
            decisions: [{ prompt: 'What was the immediate trigger that led Maharaja Hari Singh to sign the Instrument of Accession on 26 October 1947?', options: [
                { text: 'The immediate trigger was the invasion of Kashmir by Pakistani tribal militias (supported', outcome: 'The immediate trigger was the invasion of Kashmir by Pakistani tribal militias (supported by the.' },
                { text: 'the Maharaja voluntarily wanted to join India', outcome: 'Not quite — Students often believe Article 370 gave J&K a "separate constitution" and "dual citizenship" in the.', reveals: 'article-370-gave-j-k' },
                { text: 'pressure from Sheikh Abdullah', outcome: 'Not quite — Students often believe Article 370 gave J&K a "separate constitution" and "dual citizenship" in the.', reveals: 'article-370-gave-j-k' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_08_006', title: 'Nehru\'s Vision of Nation Building and Modern India',
          caseStudy: { intro: 'Imagine you are a 1950s voter in newly independent India: you speak Telugu, practice Islam, and work as a weaver.',
            decisions: [{ prompt: 'Which constitutional provision did Nehru cite most directly to justify that India would not become a "Hindu Pakistan" after Partition?', options: [
                { text: '**Answer:** Article 15 (prohibition of discrimination on grounds of religion, race,', outcome: '**Answer:** Article 15 (prohibition of discrimination on grounds of religion, race, caste, sex.' },
                { text: 'basic fact', outcome: 'Not quite — **Misconception:** "Nehru\'s secularism meant the state stays completely out of religion (Western.', reveals: 'misconception-nehru-s-secularism-meant' },
                { text: 'cannot go anywhere else', outcome: 'Not quite — **Misconception:** "Nehru\'s secularism meant the state stays completely out of religion (Western.', reveals: 'misconception-nehru-s-secularism-meant' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a mock constituent assembly, a student declares the 565 princely states \'automatically became India\'s on 15 August 1947 — the British left, so the map was settled.\'',
            decisions: [{ prompt: 'What did the lapse of paramountcy actually do?', options: [
                { text: 'It freed every state legally — rulers could accede to India, Pakistan, or stay independent, which is why Patel ran a staged integration: Instrument of Accession for three subjects, popular will as the legitimising test, merger agreements after; \'automatic\' skips both the legal vacuum and the diplomacy that filled it.', outcome: 'The chapter\'s core: independence Day created a sovereignty question, not an answer — the union was negotiated into existence, with force only where consent failed.' },
                { text: 'He\'s right — Partition decided everything; the states just followed their provinces.', outcome: 'Partition\'s religious-majority logic applied to British provinces, not princely states — paramountcy\'s lapse made each ruler a separate legal question, which is exactly why Hyderabad and Junagadh needed more than a signature.', reveals: 'accession-was-automatic' },
                { text: 'The Instrument of Accession merged them fully — one signature made them Indian states.', outcome: 'The IoA surrendered only defence, external affairs and communications — it was stage one of a sequence (accession → standstill → merger → constitutional integration), not the whole event.', reveals: 'ioa-equals-merger' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue why Partition solved nothing it promised — it left more Muslims in India than in West Pakistan and created two minority problems — and why India answered it with a secular constitution.',
            decisions: [{ prompt: 'What comes next? Challenges of Nation Building · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Challenges of Nation Building · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_08_001', difficulty: 'standard',
          question: 'The Partition of India (1947) refers to the division of British India into two.',
          hint: 'Revisit c11_ps_cbse_07_003 (civic vs ethnic nationalism) and c10_hist_cbse_04_011 (1947.',
          misconception: 'Students believe Partition was inevitable because \'Hindus and Muslims always hated each other\' — a primordialist view.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Partition of India (1947) refers to the division of British India into two',
                  options: ['The Partition of India (1947) refers to the division of British India into two', 'The integration of princely states refers to the political and diplomatic process', 'The accession of Hyderabad and Junagadh refers to the process by', 'The Kashmir Question refers to the complex political and constitutional issue surrounding'],
                  hint: 'Revisit c11_ps_cbse_07_003 (civic vs ethnic nationalism) and c10_hist_cbse_04_011 (1947 Partition.',
                  misconception: 'Students believe Partition was inevitable because \'Hindus and Muslims always hated each other\' — a primordialist view.' }
          ],
            remediations: { 'partition-was-inevitable-because-hindus': { steps: ['Re-read NCERT pages 6–13 (Dawn of Freedom to Consequences of Partition) focusing on the four difficulties of Partition.', 'Watch the 15-minute documentary clip "The Partition of India 1947" (BBC/Doordarshan archives) noting the timeline.', 'Re-attempt Diagnostic Questions 2 and 3 — these test the causal chain and structural flaws.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_08_002', difficulty: 'standard',
          question: 'The integration of princely states refers to the political and diplomatic.',
          hint: 'Revisit c6_history_ch12_052 (Integration of Princely States) and c11_ps_cbse_16_001 (What.',
          misconception: 'Students often believe Sardar Patel used *only* force or coercion to integrate princely states, citing Hyderabad and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The integration of princely states refers to the political and diplomatic process',
                  options: ['The integration of princely states refers to the political and diplomatic process', 'The Partition of India (1947) refers to the division of British India into two', 'The accession of Hyderabad and Junagadh refers to the process by', 'The Kashmir Question refers to the complex political and constitutional issue surrounding'],
                  hint: 'Revisit c6_history_ch12_052 (Integration of Princely States) and c11_ps_cbse_16_001 (What.',
                  misconception: 'Students often believe Sardar Patel used *only* force or coercion to integrate princely states, citing Hyderabad and Junagadh as proof.' }
          ],
            remediations: { 'sardar-patel-used-only-force': { steps: ['If the student conflates "integration" with "military action," assign this remediation: (1) Re-read the NCERT section.', '(2) Map the 565 states: colour-code those that signed IoA by Aug 15 (green), those needing plebiscite (Junagadh.', '(3) Watch the 10-minute clip from *Pradhanmantri* (Episode 2) showing V.P.', 'Menon\'s negotiations with rulers.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_08_003', difficulty: 'standard',
          question: 'The accession of Hyderabad and Junagadh refers to the process by which these.',
          hint: 'Revisit **c12_ps_cbse_08_002**, specifically the section "Government\'s approach" (three.',
          misconception: '**Misconception**: "Junagadh was integrated by force like Hyderabad." **Reality**: Junagadh\'s integration was.',
          parts: [
                { id: 'a', prompt: 'Why did the Government of India insist on a **plebiscite in Junagadh** but resort to **military action in Hyderabad**?', answer: 'In Junagadh, the **ruler (Nawab) acceded to Pakistan** against the wishes of the',
                  options: ['In Junagadh, the **ruler (Nawab) acceded to Pakistan** against the wishes of the', 'treats both as "force vs'],
                  hint: 'Revisit **c12_ps_cbse_08_002**, specifically the section "Government\'s approach" (three.',
                  misconception: '**Misconception**: "Junagadh was integrated by force like Hyderabad." **Reality**: Junagadh\'s integration was **peaceful and democratic**.' },
                { id: 'b', prompt: 'A student argues: "The Indian Army\'s entry into Hyderabad in September 1948 was an invasion of a sovereign state because the Nizam had not signed the.', answer: 'The claim is **invalid**',
                  options: ['The claim is **invalid**', 'invasion'],
                  hint: 'Revisit **c12_ps_cbse_08_002**, specifically the section "Government\'s approach" (three.',
                  misconception: '**Misconception**: "Junagadh was integrated by force like Hyderabad." **Reality**: Junagadh\'s integration was **peaceful and democratic**.' }
          ],
            remediations: { 'misconception-junagadh-was-integrated-by': { steps: ['If the student cannot distinguish the two accession modes: 1.', '**Re-read** the NCERT paragraphs on Junagadh ("The issue of Junagarh was resolved after a plebiscite...") and Hyderabad.', '**Create a two-column table**: Column A = Junagadh (Ruler\'s action, Population\'s reaction, India\'s response, Outcome).', 'Fill using only NCERT facts.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_08_004', difficulty: 'standard',
          question: 'The Kashmir Question refers to the complex political and constitutional issue.',
          hint: 'If stuck, revisit c12_ps_cbse_08_002 (Integration of Princely States) and focus on the.',
          misconception: 'Students often believe Article 370 gave J&K a "separate constitution" and "dual citizenship" in the same way a federal.',
          parts: [
                { id: 'a', prompt: 'Why did India accept a conditional accession for J&K (with reference to a plebiscite and internal autonomy) while integrating other princely states.', answer: 'India accepted conditionality because: (a) the accession occurred under military',
                  options: ['India accepted conditionality because: (a) the accession occurred under military', 'because J&K was larger', 'because of Article 370', 'separate constitution'],
                  hint: 'If stuck, revisit c12_ps_cbse_08_002 (Integration of Princely States) and focus on the distinction.',
                  misconception: 'Students often believe Article 370 gave J&K a "separate constitution" and "dual citizenship" in the same way a federal unit has in.' }
          ],
            remediations: { 'article-370-gave-j-k': { steps: ['Re-read the Instrument of Accession text (available in NCERT Class 12 *Politics in India since Independence*, Chapter.', 'Map the sequence of Presidential Orders (1950, 1952, 1954, 2019) on a timeline, noting which article of the Indian.', 'Re-attempt Diagnostic Question 3 with the *Sampat Prakash* (1969) and *Prem Nath Kaul* (1959) judgments in mind.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_08_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Article 370 gave J&K a "separate constitution" and "dual citizenship" in the same way a federal.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Shimla Agreement (1972) made the UN resolutions on Kashmir obsolete by converting the ceasefire line into the Line of Control and.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'UN resolutions are completely dead', 'separate constitution', 'dual citizenship'],
                  hint: 'If stuck, revisit c12_ps_cbse_08_002 (Integration of Princely States) and focus on the distinction.',
                  misconception: 'Students often believe Article 370 gave J&K a "separate constitution" and "dual citizenship" in the same way a federal unit has in.' }
          ],
            remediations: { 'article-370-gave-j-k': { steps: ['Re-read the Instrument of Accession text (available in NCERT Class 12 *Politics in India since Independence*, Chapter.', 'Map the sequence of Presidential Orders (1950, 1952, 1954, 2019) on a timeline, noting which article of the Indian.', 'Re-attempt Diagnostic Question 3 with the *Sampat Prakash* (1969) and *Prem Nath Kaul* (1959) judgments in mind.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_08_005', difficulty: 'standard',
          question: 'The Constituent Assembly of India (1946–1949) was the representative body.',
          hint: 'Revisit Class 11 node c11_ps_cbse_10_009 (deliberation and consensus) and Class 12 node.',
          misconception: 'Students often believe the Constituent Assembly debates were merely about \'borrowing\' features from other constitutions.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Constituent Assembly of India (1946–1949) was the representative body tasked with',
                  options: ['The Constituent Assembly of India (1946–1949) was the representative body tasked with', 'The Partition of India (1947) refers to the division of British India into two', 'The integration of princely states refers to the political and diplomatic process', 'The accession of Hyderabad and Junagadh refers to the process by'],
                  hint: 'Revisit Class 11 node c11_ps_cbse_10_009 (deliberation and consensus) and Class 12 node.',
                  misconception: 'Students often believe the Constituent Assembly debates were merely about \'borrowing\' features from other constitutions (e.g., UK, USA.' }
          ],
            remediations: { 'the-constituent-assembly-debates-were': { steps: ['If the student cannot link a specific debate to a nation-building challenge, have them: (1) Re-read c11_ps_cbse_10_005.', '(2) Map each challenge from this chapter (Partition trauma → strong Centre; Princely states → Instrument of Accession.', '(3) Re-attempt Diagnostic Question 4 with this mapping.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_08_006', difficulty: 'standard',
          question: 'Nehru\'s vision of nation-building was a comprehensive framework for.',
          hint: 'Revisit c11_ps_cbse_08_004 (Indian secularism) and c11_ps_cbse_11_008.',
          misconception: '**Misconception:** "Nehru\'s secularism meant the state stays completely out of religion (Western \'wall.',
          parts: [
                { id: 'a', prompt: 'Why did Nehru initially oppose linguistic reorganisation of states (1948–1952) but later accept it (1953–1956), despite fearing it would fragment national.', answer: '**Answer:** Nehru opposed it *immediately after Partition*',
                  options: ['**Answer:** Nehru opposed it *immediately after Partition*', 'flip-flop'],
                  hint: 'Revisit c11_ps_cbse_08_004 (Indian secularism) and c11_ps_cbse_11_008 (Cultural/Educational Rights.',
                  misconception: '**Misconception:** "Nehru\'s secularism meant the state stays completely out of religion (Western \'wall of separation\')." **Reality:** Nehru.' },
                { id: 'b', prompt: 'A citizen in 1955 Madhya Pradesh (a bilingual Hindi-Marathi state created by the SRC) petitions the President under Article 356 claiming the state government.', answer: '**Answer:** **Federal accommodation of diversity**',
                  options: ['**Answer:** **Federal accommodation of diversity**', 'secularism', 'democracy'],
                  hint: 'Revisit c11_ps_cbse_08_004 (Indian secularism) and c11_ps_cbse_11_008 (Cultural/Educational Rights.',
                  misconception: '**Misconception:** "Nehru\'s secularism meant the state stays completely out of religion (Western \'wall of separation\')." **Reality:** Nehru.' },
                { id: 'c', prompt: 'Compare Nehru\'s "temples of modern India" (Bhilai, Bokaro, IITs, BARC) with Gandhi\'s vision of village self-reliance (Gram Swaraj).', answer: '**Answer:** Nehru created the **Planning Commission (1950)**',
                  options: ['**Answer:** Nehru created the **Planning Commission (1950)**', 'Five-Year Plans', 'Parliament passed laws'],
                  hint: 'Revisit c11_ps_cbse_08_004 (Indian secularism) and c11_ps_cbse_11_008 (Cultural/Educational Rights.',
                  misconception: '**Misconception:** "Nehru\'s secularism meant the state stays completely out of religion (Western \'wall of separation\')." **Reality:** Nehru.' }
          ],
            remediations: { 'misconception-nehru-s-secularism-meant': { steps: ['If student holds the "wall of separation" misconception: 1.', '**Re-read** Nehru\'s 1954 speech opening the Hindu Code Bill debate: "We are not interfering with religion… we are.', '**Compare** Article 25(2)(b) ("State may make laws for social welfare and reform") with French 1905 Law of Separation.', '**Trace** the consequence: Hindu Code Bills passed (1955–56); Muslim personal law untouched until 1986 (Muslim Women.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
