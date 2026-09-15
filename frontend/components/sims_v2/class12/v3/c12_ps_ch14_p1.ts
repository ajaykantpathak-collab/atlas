import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch14_p1: SimDef = {
    id: 'v3_c12_ps_ch14_p1',
    title: 'Regional Aspirations · Part 1/2',
    subtitle: 'Demanding your region\'s share is how India stays one',
    classLevel: 12, subject: 'political_science', topic: 'Regional Aspirations · Part 1/2',
    chapters: ['c12_ps_ch14'],
    nodeIds: ['c12_ps_cbse_14_001', 'c12_ps_cbse_14_002', 'c12_ps_cbse_14_003', 'c12_ps_cbse_14_004', 'c12_ps_cbse_14_005', 'c12_ps_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Federalism analyst', intro: 'A leader demanding his state\'s water isn\'t being anti-national — he\'s using the exact channel the system was designed to offer.', goal: 'Distinguish autonomy, statehood and secessionist demands, and evaluate India\'s accommodation-first approach to regional aspirations.' },
    discovery: {
        question: 'Europe built nations by hammering diversity into one language and culture; India let parties win elections by demanding \'our water, our jobs, our language\'. Why would a democracy encourage that?',
        options: ['Because regional identity is how Indian democracy negotiates unity — channelling aspirations into elections and accords flexes the federation instead of breaking it', 'Because India failed to build a real nation', 'Because regional parties are too weak to matter', 'Because the Constitution forbids suppressing any demand'],
        answer: 'Because regional identity is how Indian democracy negotiates unity — channelling aspirations into elections and accords flexes the federation instead of breaking it',
        hook: 'Regional aspiration is not secessionism — most movements want autonomy or statehood inside India, and the typical response is a negotiated accord (Mizoram 1986, Punjab 1985), with force the exception that usually backfires.',
    },
    teaching: [
        { title: 'Roots of Regional Aspirations in Indian Politics', text: 'Regional aspirations in Indian politics refer to the collective demands by people of a specific geographic, linguistic, cultural, or ethnic region for greater autonomy, statehood, resource control.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_14_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map India\'s regional demands — autonomy, statehood, secession — to the constitutional tools built to absorb them, and weigh why Mizoram got an accord while Nagaland still waits.',
        labels: ['Roots of Regional Aspirations', 'Tamil Nadu and', 'The Punjab Crisis: Akali', 'Jammu and Kashmir: Article', 'The Assam Movement: Immigration,', 'Northeast India: Insurgency, Ethnic'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_14_001', title: 'Roots of Regional Aspirations in Indian Politics',
          caseStudy: { intro: 'Imagine you\'re watching a news debate where a leader from a border state demands "our water, our jobs, our language" while a national party spokesperson calls.',
            decisions: [{ prompt: 'What is the fundamental difference between the European model of nation-building and the Indian model regarding cultural diversity,.', options: [
                { text: 'The European model viewed cultural diversity as a threat to national unity and sought', outcome: 'The European model viewed cultural diversity as a threat to national unity and sought.' },
                { text: 'India also imposed one language', outcome: 'Not quite — **Students equate "regional aspiration" with "secessionism" and assume the Indian state\'s default.', reveals: 'students-equate-regional-aspiration-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_14_002', title: 'Tamil Nadu and the Dravidian Movement: DMK, AIADMK and Anti-Hindi Agitation',
          caseStudy: { intro: 'Imagine a Class 12 student reading a news headline: "Tamil Nadu CM writes to PM opposing Hindi imposition in NEP 2020." This contemporary echo of the 1965.',
            decisions: [{ prompt: 'What was the immediate trigger for the DMK\'s first major agitation in 1953-54 regarding the Kallakudi railway station?', options: [
                { text: 'The DMK demanded restoration of the original name "Kallakudi" after it was renamed', outcome: 'The DMK demanded restoration of the original name "Kallakudi" after it was renamed "Dalmiapuram".' },
                { text: 'protest against Hindi imposition', outcome: 'Not quite — Students often think the Dravidian movement was always a separatist movement seeking a separate.', reveals: 'the-dravidian-movement-was-always' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_14_003', title: 'The Punjab Crisis: Akali Dal, Anandpur Sahib Resolution and Khalistan',
          caseStudy: { intro: 'Imagine you see a news report about a protest in Punjab today where farmers demand legal guarantees for MSP — this is a contemporary echo of Punjab\'s long.',
            decisions: [{ prompt: 'What was the primary demand of the Anandpur Sahib Resolution (1973) regarding center-state relations?', options: [
                { text: 'The Anandpur Sahib Resolution demanded a redefinition of center-state relations to grant', outcome: 'The Anandpur Sahib Resolution demanded a redefinition of center-state relations to grant greater.' },
                { text: 'demanded a separate Khalistan', outcome: 'Not quite — Students often conflate the Anandpur Sahib Resolution (1973) with the later demand for Khalistan.', reveals: 'students-often-conflate-the-anandpur' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_14_004', title: 'Jammu and Kashmir: Article 370, Autonomy and Political Dynamics',
          caseStudy: { intro: 'Imagine you\'re reading a news report about the 2019 abrogation of Article 370 and the creation of two Union Territories.',
            decisions: [{ prompt: 'What were the three specific matters on which the Union Parliament could legislate for J&K under the original Article 370 without the state.', options: [
                { text: 'Defence, foreign affairs, and communications (including railways, posts, and telegraphs)', outcome: 'Defence, foreign affairs, and communications (including railways, posts, and telegraphs).' },
                { text: 'finance', outcome: 'Not quite — Students often believe Article 370 gave J&K "complete independence" or "sovereignty," confusing.', reveals: 'article-370-gave-j-k' },
                { text: 'all subjects in the Union List', outcome: 'Not quite — Students often believe Article 370 gave J&K "complete independence" or "sovereignty," confusing.', reveals: 'article-370-gave-j-k' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_14_005', title: 'The Assam Movement: Immigration, AASU and the Assam Accord',
          caseStudy: { intro: 'Imagine you are a student in Guwahati in 1979: your college\'s voter list suddenly includes thousands of names you\'ve never seen in your neighbourhood, and.',
            decisions: [{ prompt: 'What was the primary demographic fear that mobilised the Assamese public behind the AASU-led movement from 1979 onwards?', options: [
                { text: 'The fear that illegal immigrants (mostly Bengali Muslims from Bangladesh) would turn the', outcome: 'The fear that illegal immigrants (mostly Bengali Muslims from Bangladesh) would turn the indigenous.' },
                { text: 'fear of Hindu migration from West Bengal', outcome: 'Not quite — Students often believe the Assam Movement was *only* about Bengali Hindu vs.', reveals: 'the-assam-movement-was-only' },
                { text: 'minority anxiety', outcome: 'Not quite — Students often believe the Assam Movement was *only* about Bengali Hindu vs.', reveals: 'the-assam-movement-was-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_14_006', title: 'Northeast India: Insurgency, Ethnic Diversity and the State',
          caseStudy: { intro: 'Imagine a Class 12 student from Guwahati reading a news report about the Citizenship Amendment Act protests in 2019 — they see echoes of the 1979 Assam.',
            decisions: [{ prompt: 'Name the constitutional provision that allows tribal communities in Assam, Meghalaya, Tripura, and Mizoram to administer their own affairs.', options: [
                { text: 'The Sixth Schedule of the Constitution (Articles 244(2) and 275(1)) provides for', outcome: 'The Sixth Schedule of the Constitution (Articles 244(2) and 275(1)) provides for Autonomous.' },
                { text: 'Article 371', outcome: 'Not quite — **Misconception**: "All Northeast insurgencies are the same — they all want to leave India.".', reveals: 'misconception-all-northeast-insurgencies-are' },
                { text: 'Panchayati Raj', outcome: 'Not quite — **Misconception**: "All Northeast insurgencies are the same — they all want to leave India.".', reveals: 'misconception-all-northeast-insurgencies-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'An essay argues \'regional movements like the Dravidian one are centrifugal — they weaken national unity and should be constitutionally discouraged.\'',
            decisions: [{ prompt: 'What does the Dravidian movement\'s trajectory show instead?', options: [
                { text: 'The opposite — a protest movement channelled into elections, won Tamil Nadu in 1967 through the ballot, and later sat in national coalitions; federal democracy absorbed regional aspiration rather than being threatened by it — the system worked by accommodation, not suppression.', outcome: 'The chapter\'s civic principle: regional identity became a governing party inside the union — democratic expression of regional demands strengthened integration rather than dissolving it.' },
                { text: 'The essay is right — anti-Hindi agitation was secessionist energy that luckily faded.', outcome: 'The movement didn\'t fade — it converted into electoral power and coalition partnership; what changed was the register, from street to assembly, not the aspiration itself.', reveals: 'regional-equals-secessionist' },
                { text: 'Only half-right — DMK won, but regional parties never mattered at the centre.', outcome: 'Dravidian parties joined national ruling coalitions from the 1990s onward — regional players became load-bearing in Delhi, which is accommodation operating at full national scale.', reveals: 'regions-stay-regional' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue that regionalism is a feature of Indian democracy, not a bug — and that even after Article 370, asymmetric federalism remains the architecture.',
            decisions: [{ prompt: 'What comes next? Regional Aspirations · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Regional Aspirations · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_14_001', difficulty: 'standard',
          question: 'Regional aspirations in Indian politics refer to the collective demands.',
          hint: 'Revisit Class 11 c11_ps_cbse_16_008 "Asymmetrical federalism: Special provisions for.',
          misconception: '**Students equate "regional aspiration" with "secessionism" and assume the Indian state\'s default response is military.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Regional aspirations in Indian politics refer to the collective demands by people of a',
                  options: ['Regional aspirations in Indian politics refer to the collective demands by people of a', 'The Dravidian movement in Tamil Nadu is a regional political movement that originated as', 'The Punjab Crisis (1980s-1990s) refers to a period of violent conflict in Punjab driven', 'Jammu and Kashmir\'s special constitutional status under Article 370 (1950-2019) granted'],
                  hint: 'Revisit Class 11 c11_ps_cbse_16_008 "Asymmetrical federalism: Special provisions for certain.',
                  misconception: '**Students equate "regional aspiration" with "secessionism" and assume the Indian state\'s default response is military force.** In reality.' }
          ],
            remediations: { 'students-equate-regional-aspiration-with': { steps: ['If a student conflates regionalism with separatism: (1) Re-read NCERT pp.', '114-115 ("Indian approach...', 'democracy allows political expressions of regional aspirations and does not look upon them as anti-national").', '(2) Map each case study to its *demand type*: Tamil Nadu → cultural autonomy + anti-Hindi (not secession); Punjab →.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_14_002', difficulty: 'standard',
          question: 'The Dravidian movement in Tamil Nadu is a regional political movement that.',
          hint: 'If stuck, revisit Class 11 Political Science Chapter 16 (Federalism) on linguistic.',
          misconception: 'Students often think the Dravidian movement was always a separatist movement seeking a separate country.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Dravidian movement in Tamil Nadu is a regional political movement that originated as',
                  options: ['The Dravidian movement in Tamil Nadu is a regional political movement that originated as', 'Regional aspirations in Indian politics refer to the collective demands by people of a', 'The Punjab Crisis (1980s-1990s) refers to a period of violent conflict in Punjab driven', 'Jammu and Kashmir\'s special constitutional status under Article 370 (1950-2019) granted'],
                  hint: 'If stuck, revisit Class 11 Political Science Chapter 16 (Federalism) on linguistic reorganization.',
                  misconception: 'Students often think the Dravidian movement was always a separatist movement seeking a separate country.' }
          ],
            remediations: { 'the-dravidian-movement-was-always': { steps: ['If a student conflates the movement\'s early rhetoric with its later practice, have them: (1) read Annadurai\'s 1963.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_14_003', difficulty: 'standard',
          question: 'The Punjab Crisis (1980s-1990s) refers to a period of violent conflict.',
          hint: 'Revisit c11_ps_cbse_16_005 (Indian federalism) and c11_ps_cbse_16_008 (asymmetrical.',
          misconception: 'Students often conflate the Anandpur Sahib Resolution (1973) with the later demand for Khalistan (an independent Sikh.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Punjab Crisis (1980s-1990s) refers to a period of violent conflict in Punjab driven',
                  options: ['The Punjab Crisis (1980s-1990s) refers to a period of violent conflict in Punjab driven', 'Regional aspirations in Indian politics refer to the collective demands by people of a', 'The Dravidian movement in Tamil Nadu is a regional political movement that originated as', 'Jammu and Kashmir\'s special constitutional status under Article 370 (1950-2019) granted'],
                  hint: 'Revisit c11_ps_cbse_16_005 (Indian federalism) and c11_ps_cbse_16_008 (asymmetrical federalism).',
                  misconception: 'Students often conflate the Anandpur Sahib Resolution (1973) with the later demand for Khalistan (an independent Sikh state).' }
          ],
            remediations: { 'students-often-conflate-the-anandpur': { steps: ['If a student cannot distinguish the Anandpur Sahib Resolution\'s federal autonomy demands from the Khalistan separatist.', '"Khalistan demands" using specific textual evidence; (4) re-attempt Diagnostic Question 1 and 4 to test the distinction.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_14_004', difficulty: 'standard',
          question: 'Jammu and Kashmir\'s special constitutional status under Article 370 (1950-2019).',
          hint: 'Revisit Class 11 Political Science Chapter 16 (Federalism), specifically the distinction.',
          misconception: 'Students often believe Article 370 gave J&K "complete independence" or "sovereignty," confusing autonomy with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Jammu and Kashmir\'s special constitutional status under Article 370 (1950-2019) granted',
                  options: ['Jammu and Kashmir\'s special constitutional status under Article 370 (1950-2019) granted', 'Regional aspirations in Indian politics refer to the collective demands by people of a', 'The Dravidian movement in Tamil Nadu is a regional political movement that originated as', 'The Punjab Crisis (1980s-1990s) refers to a period of violent conflict in Punjab driven'],
                  hint: 'Revisit Class 11 Political Science Chapter 16 (Federalism), specifically the distinction between.',
                  misconception: 'Students often believe Article 370 gave J&K "complete independence" or "sovereignty," confusing autonomy with secession.' }
          ],
            remediations: { 'article-370-gave-j-k': { steps: ['If the student conflates autonomy with sovereignty, have them re-read the Instrument of Accession (1947) and the 1954.', 'Then compare Article 370\'s text with Article 1 (India as a Union of States).', 'Ask: "Could J&K unilaterally secede under Article 370?', 'Could the Union Parliament amend Article 370 without the state\'s concurrence before 2019?" This clarifies that autonomy.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_14_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Article 370 gave J&K "complete independence" or "sovereignty," confusing autonomy with.',
          parts: [
                { id: 'a', prompt: 'Create a timeline of five key turning points in J&K\'s political history (1947-2019) where a different decision by the Centre or State leadership could have.', answer: 'Key turning points: (1) 1947: Maharaja\'s accession terms vs',
                  options: ['Key turning points: (1) 1947: Maharaja\'s accession terms vs', 'complete independence', 'sovereignty'],
                  hint: 'Revisit Class 11 Political Science Chapter 16 (Federalism), specifically the distinction between.',
                  misconception: 'Students often believe Article 370 gave J&K "complete independence" or "sovereignty," confusing autonomy with secession.' }
          ],
            remediations: { 'article-370-gave-j-k': { steps: ['If the student conflates autonomy with sovereignty, have them re-read the Instrument of Accession (1947) and the 1954.', 'Then compare Article 370\'s text with Article 1 (India as a Union of States).', 'Ask: "Could J&K unilaterally secede under Article 370?', 'Could the Union Parliament amend Article 370 without the state\'s concurrence before 2019?" This clarifies that autonomy.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_14_005', difficulty: 'standard',
          question: 'The Assam Movement (1979–1985) was a mass democratic agitation led by the All.',
          hint: 'If stuck on the legal framework, re-read **c11_ps_cbse_06_007** (Acquiring citizenship).',
          misconception: 'Students often believe the Assam Movement was *only* about Bengali Hindu vs.',
          parts: [
                { id: 'a', prompt: 'The Assam Accord\'s Clause 6 promises "constitutional, legislative and administrative safeguards" for Assamese cultural, social, and linguistic identity.', answer: 'They conflate *official language status* (a pre-existing provision) with the',
                  options: ['They conflate *official language status* (a pre-existing provision) with the', 'the Assam Movement was *only* about Bengali Hindu vs'],
                  hint: 'If stuck on the legal framework, re-read **c11_ps_cbse_06_007** (Acquiring citizenship) and the.',
                  misconception: 'Students often believe the Assam Movement was *only* about Bengali Hindu vs.' },
                { id: 'b', prompt: 'Compare the Assam Movement\'s negotiation outcome (Assam Accord) with the Mizoram Accord (1986) and Punjab Accord (1985).', answer: 'The Mizoram Accord addressed a *secessionist* demand by granting statehood and',
                  options: ['The Mizoram Accord addressed a *secessionist* demand by granting statehood and', 'violence levels', 'the Assam Movement was *only* about Bengali Hindu vs'],
                  hint: 'If stuck on the legal framework, re-read **c11_ps_cbse_06_007** (Acquiring citizenship) and the.',
                  misconception: 'Students often believe the Assam Movement was *only* about Bengali Hindu vs.' }
          ],
            remediations: { 'the-assam-movement-was-only': { steps: ['Re-read the NCERT passage "The Assam Movement" (pp.', '129–130) and list every *specific* demand AASU made in 1979.', 'Watch the 10-minute documentary "Assam 1979–85: A Movement" (YouTube, official Parliament channel) to visualise the.', 'Revisit **c11_ps_cbse_06_006** (Citizenship: jus soli vs jus sanguinis) and **c11_ps_cbse_12_008** (Election.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_14_006', difficulty: 'standard',
          question: 'The Northeast India node examines how ethnic diversity, geographic isolation.',
          hint: 'Revisit c11_ps_cbse_16_008 (Asymmetrical Federalism) and c11_ps_cbse_17_011 (PESA & Sixth.',
          misconception: '**Misconception**: "All Northeast insurgencies are the same — they all want to leave India." **Reality**: The textbook.',
          parts: [
                { id: 'a', prompt: 'Name the constitutional provision that allows tribal communities in Assam, Meghalaya, Tripura, and Mizoram to administer their own affairs through Autonomous.', answer: 'The Sixth Schedule of the Constitution (Articles 244(2) and 275(1)) provides for',
                  options: ['The Sixth Schedule of the Constitution (Articles 244(2) and 275(1)) provides for', 'Article 371', 'Panchayati Raj'],
                  hint: 'Revisit c11_ps_cbse_16_008 (Asymmetrical Federalism) and c11_ps_cbse_17_011 (PESA & Sixth Schedule).',
                  misconception: '**Misconception**: "All Northeast insurgencies are the same — they all want to leave India." **Reality**: The textbook explicitly.' }
          ],
            remediations: { 'misconception-all-northeast-insurgencies-are': { steps: ['If a student cannot distinguish the three types of movements: 1.', 'Re-read the textbook section "The North-East" (pp.', '126–130) and create a **three-column table**: Column 1 = Movement (MNF, Naga, AASU, Bodo, Karbi); Column 2 = Core.', 'Watch the 15-min documentary "The Accord" (Mizoram) vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
