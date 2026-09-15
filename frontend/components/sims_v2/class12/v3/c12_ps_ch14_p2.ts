import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch14_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch14_p2: SimDef = {
    id: 'v3_c12_ps_ch14_p2',
    title: 'Regional Aspirations · Part 2/2',
    subtitle: 'Demanding your region\'s share is how India stays one',
    classLevel: 12, subject: 'political_science', topic: 'Regional Aspirations · Part 2/2',
    chapters: ['c12_ps_ch14'],
    nodeIds: ['c12_ps_cbse_14_007', 'c12_ps_cbse_14_008', 'c12_ps_cbse_14_009', 'c12_ps_cbse_14_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Federalism analyst', intro: 'A leader demanding his state\'s water isn\'t being anti-national — he\'s using the exact channel the system was designed to offer.', goal: 'Distinguish autonomy, statehood and secessionist demands, and evaluate India\'s accommodation-first approach to regional aspirations.' },
    discovery: {
        question: 'Europe built nations by hammering diversity into one language and culture; India let parties win elections by demanding \'our water, our jobs, our language\'. Why would a democracy encourage that?',
        options: ['Because regional identity is how Indian democracy negotiates unity — channelling aspirations into elections and accords flexes the federation instead of breaking it', 'Because India failed to build a real nation', 'Because regional parties are too weak to matter', 'Because the Constitution forbids suppressing any demand'],
        answer: 'Because regional identity is how Indian democracy negotiates unity — channelling aspirations into elections and accords flexes the federation instead of breaking it',
        hook: 'Regional aspiration is not secessionism — most movements want autonomy or statehood inside India, and the typical response is a negotiated accord (Mizoram 1986, Punjab 1985), with force the exception that usually backfires.',
    },
    teaching: [
        { title: 'Regionalism, National Unity and the Indian Federal Framework', text: 'Regionalism in the Indian context refers to the political assertion of distinct regional identities — linguistic, cultural, ethnic, or economic — within the framework of the Indian Union, seeking.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_14_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map India\'s regional demands — autonomy, statehood, secession — to the constitutional tools built to absorb them, and weigh why Mizoram got an accord while Nagaland still waits.',
        labels: ['Regionalism, National Unity', 'Accommodation of Regional Demands', 'The Telangana Movement', 'Balancing Regional Identity with'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_14_007', title: 'Regionalism, National Unity and the Indian Federal Framework',
          caseStudy: { intro: 'Imagine you see a news headline: “Students in Ladakh demand Union Territory status” or “Bodo groups sign peace accord for Bodoland Territorial Region.” These.',
            decisions: [{ prompt: 'Which constitutional article originally granted special autonomous status to Jammu & Kashmir, and what was the legal instrument used.', options: [
                { text: 'Article 370 granted special status', outcome: 'Article 370 granted special status; it was abrogated through the Jammu & Kashmir Reorganisation.' },
                { text: 'Article 371', outcome: 'Not quite — Students often believe **“regionalism = separatism = anti-national”** and that the Indian.', reveals: 'regionalism-separatism-anti-national-and' },
                { text: 'by a simple majority', outcome: 'Not quite — Students often believe **“regionalism = separatism = anti-national”** and that the Indian.', reveals: 'regionalism-separatism-anti-national-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_14_008', title: 'Accommodation of Regional Demands: State Reorganisation and Autonomy',
          caseStudy: { intro: 'Imagine you are a policy advisor in 2000 when Chhattisgarh, Uttarakhand, and Jharkhand were created — not on linguistic lines like 1956, but on developmental.',
            decisions: [{ prompt: 'What is the constitutional basis for Parliament\'s power to create new states or alter boundaries of existing states, and does it require.', options: [
                { text: 'Article 3 empowers Parliament to form new states, alter boundaries, or change names by a', outcome: 'Article 3 empowers Parliament to form new states, alter boundaries, or change names by a simple.' },
                { text: 'state consent is required', outcome: 'Not quite — Students often believe "state reorganisation = linguistic reorganisation" and that Article 370 was.', reveals: 'state-reorganisation-linguistic-reorganisation-a' },
                { text: 'special majority needed', outcome: 'Not quite — Students often believe "state reorganisation = linguistic reorganisation" and that Article 370 was.', reveals: 'state-reorganisation-linguistic-reorganisation-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_14_009', title: 'The Telangana Movement and the Formation of New States',
          caseStudy: { intro: 'Imagine you are a student in Hyderabad in 2011 seeing massive protests, hunger strikes, and bandhs demanding a separate state — yet the same region had merged.',
            decisions: [{ prompt: 'What was the primary basis of the 1956 merger of Telangana region with Andhra State to form Andhra Pradesh, and which commission.', options: [
                { text: 'The merger was based on linguistic unity (Telugu-speaking population) and recommended by', outcome: 'The merger was based on linguistic unity (Telugu-speaking population) and recommended by the States.' },
                { text: 'administrative convenience', outcome: 'Not quite — Students often think Telangana was created solely because of K.', reveals: 'telangana-was-created-solely-because' },
                { text: 'popular referendum', outcome: 'Not quite — Students often think Telangana was created solely because of K.', reveals: 'telangana-was-created-solely-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_14_010', title: 'Balancing Regional Identity with National Integration',
          caseStudy: { intro: 'Imagine you\'re reading a news report about a new demand for a separate state (e.g., "Bundelkhand state") or greater autonomy for a region.',
            decisions: [{ prompt: 'What are the four key lessons that the NCERT chapter draws from India\'s experience with regional aspirations since the 1980s?', options: [
                { text: 'The four lessons are: (1) Regional aspirations are a normal part of democratic politics,', outcome: 'The four lessons are: (1) Regional aspirations are a normal part of democratic politics, not.' },
                { text: 'strong Centre', outcome: 'Not quite — Students often think "regionalism = separatism = anti-national" and that the Constitution\'s special.', reveals: 'regionalism-separatism-anti-national-and' },
                { text: 'uniform laws', outcome: 'Not quite — Students often think "regionalism = separatism = anti-national" and that the Constitution\'s special.', reveals: 'regionalism-separatism-anti-national-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'An essay argues \'regional movements like the Dravidian one are centrifugal — they weaken national unity and should be constitutionally discouraged.\'',
            decisions: [{ prompt: 'What does the Dravidian movement\'s trajectory show instead?', options: [
                { text: 'The opposite — a protest movement channelled into elections, won Tamil Nadu in 1967 through the ballot, and later sat in national coalitions; federal democracy absorbed regional aspiration rather than being threatened by it — the system worked by accommodation, not suppression.', outcome: 'The chapter\'s civic principle: regional identity became a governing party inside the union — democratic expression of regional demands strengthened integration rather than dissolving it.' },
                { text: 'The essay is right — anti-Hindi agitation was secessionist energy that luckily faded.', outcome: 'The movement didn\'t fade — it converted into electoral power and coalition partnership; what changed was the register, from street to assembly, not the aspiration itself.', reveals: 'regional-equals-secessionist' },
                { text: 'Only half-right — DMK won, but regional parties never mattered at the centre.', outcome: 'Dravidian parties joined national ruling coalitions from the 1990s onward — regional players became load-bearing in Delhi, which is accommodation operating at full national scale.', reveals: 'regions-stay-regional' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_14_010', title: 'You made it',
          caseStudy: { intro: 'You can now argue that regionalism is a feature of Indian democracy, not a bug — and that even after Article 370, asymmetric federalism remains the architecture.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_14_007', difficulty: 'standard',
          question: 'Regionalism in the Indian context refers to the political assertion of distinct.',
          hint: 'Revisit c11_ps_cbse_16_008 (Asymmetrical federalism) and c11_ps_cbse_16_005 (Holding.',
          misconception: 'Students often believe **“regionalism = separatism = anti-national”** and that the Indian Constitution is rigidly.',
          parts: [
                { id: 'a', prompt: 'Which constitutional article originally granted special autonomous status to Jammu & Kashmir, and what was the legal instrument used to abrogate it in August.', answer: 'Article 370 granted special status',
                  options: ['Article 370 granted special status', 'Article 371', 'by a simple majority', 'regionalism = separatism = anti-national'],
                  hint: 'Revisit c11_ps_cbse_16_008 (Asymmetrical federalism) and c11_ps_cbse_16_005 (Holding together.',
                  misconception: 'Students often believe **“regionalism = separatism = anti-national”** and that the Indian Constitution is rigidly centralised.' },
                { id: 'b', prompt: 'A new statehood demand arises in a backward region of an existing state (e.g., Vidarbha in Maharashtra).', answer: 'Steps: (1) Initiate dialogue with stakeholders (not treat as law-and-order)',
                  options: ['Steps: (1) Initiate dialogue with stakeholders (not treat as law-and-order)', 'send paramilitary forces', 'amend the Constitution immediately', 'regionalism = separatism = anti-national'],
                  hint: 'Revisit c11_ps_cbse_16_008 (Asymmetrical federalism) and c11_ps_cbse_16_005 (Holding together.',
                  misconception: 'Students often believe **“regionalism = separatism = anti-national”** and that the Indian Constitution is rigidly centralised.' },
                { id: 'c', prompt: 'Compare the outcomes of the Mizo Accord (1986) and the Punjab Accord (1985).', answer: 'The Mizo Accord granted full statehood with special protections (Article 371G),',
                  options: ['The Mizo Accord granted full statehood with special protections (Article 371G),', 'Pakistan’s role', 'regionalism = separatism = anti-national'],
                  hint: 'Revisit c11_ps_cbse_16_008 (Asymmetrical federalism) and c11_ps_cbse_16_005 (Holding together.',
                  misconception: 'Students often believe **“regionalism = separatism = anti-national”** and that the Indian Constitution is rigidly centralised.' }
          ],
            remediations: { 'regionalism-separatism-anti-national-and': { steps: ['If a student equates regionalism with separatism, have them: (1) Re-read the “Indian approach” paragraph in the.', '114) and list the three reasons democracy *accommodates* regional aspirations.', '(2) Compare the fate of movements that took up arms (Nagaland, Kashmir) vs.', 'those that used electoral politics (Tamil Nadu, Mizoram after 1986).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_14_008', difficulty: 'standard',
          question: 'Accommodation of regional demands refers to the Indian state\'s constitutional.',
          hint: 'If stuck, immediately revisit c11_ps_cbse_16_008 (Asymmetrical federalism) — make.',
          misconception: 'Students often believe "state reorganisation = linguistic reorganisation" and that Article 370 was the *only*.',
          parts: [
                { id: 'a', prompt: 'The Mizoram Accord (1986) granted statehood and special powers under Article 371E, while the Punjab Accord (1985) promised Chandigarh\'s transfer and river.', answer: 'Mizoram\'s secessionist insurgency (MNF) required a constitutional \'exit option\'',
                  options: ['Mizoram\'s secessionist insurgency (MNF) required a constitutional \'exit option\'', 'state reorganisation = linguistic reorganisation'],
                  hint: 'If stuck, immediately revisit c11_ps_cbse_16_008 (Asymmetrical federalism) — make a one-page chart.',
                  misconception: 'Students often believe "state reorganisation = linguistic reorganisation" and that Article 370 was the *only* asymmetrical federal.' }
          ],
            remediations: { 'state-reorganisation-linguistic-reorganisation-a': { steps: ['Revisit c11_ps_cbse_16_008 (Asymmetrical federalism) — list all Article 371 variants and Sixth Schedule provisions.', 'Re-read NCERT \'Accommodation and National Integration\' section (pp.', 'Take a blank map of India; mark states created in 1956, 1966, 2000, 2014, 2019 with *different colours* and write the.', 'Re-attempt Diagnostic Q2 and Q4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_14_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "state reorganisation = linguistic reorganisation" and that Article 370 was the *only*.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The abrogation of Article 370 (2019) and bifurcation of J&K into two Union Territories represents a departure from India\'s historical.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'complete centralisation', 'no change', 'state reorganisation = linguistic reorganisation'],
                  hint: 'If stuck, immediately revisit c11_ps_cbse_16_008 (Asymmetrical federalism) — make a one-page chart.',
                  misconception: 'Students often believe "state reorganisation = linguistic reorganisation" and that Article 370 was the *only* asymmetrical federal.' }
          ],
            remediations: { 'state-reorganisation-linguistic-reorganisation-a': { steps: ['Revisit c11_ps_cbse_16_008 (Asymmetrical federalism) — list all Article 371 variants and Sixth Schedule provisions.', 'Re-read NCERT \'Accommodation and National Integration\' section (pp.', 'Take a blank map of India; mark states created in 1956, 1966, 2000, 2014, 2019 with *different colours* and write the.', 'Re-attempt Diagnostic Q2 and Q4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_14_009', difficulty: 'standard',
          question: 'The Telangana Movement refers to the prolonged political struggle (1969–2014).',
          hint: 'Revisit c11_ps_cbse_16_006 (Article 3, Union/State Lists) and c12_ps_cbse_14_008.',
          misconception: 'Students often think Telangana was created solely because of K.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Telangana Movement refers to the prolonged political struggle (1969–2014) for a',
                  options: ['The Telangana Movement refers to the prolonged political struggle (1969–2014) for a', 'Regional aspirations in Indian politics refer to the collective demands by people of a', 'The Dravidian movement in Tamil Nadu is a regional political movement that originated as', 'The Punjab Crisis (1980s-1990s) refers to a period of violent conflict in Punjab driven'],
                  hint: 'Revisit c11_ps_cbse_16_006 (Article 3, Union/State Lists) and c12_ps_cbse_14_008 (chronology.',
                  misconception: 'Students often think Telangana was created solely because of K.' }
          ],
            remediations: { 'telangana-was-created-solely-because': { steps: ['If stuck on the constitutional process: re-read Article 3 in the Constitution (c11_ps_cbse_10_003 covers amendment.', 'If confused about the movement\'s phases: create a timeline — 1956 (merger), 1969 (first agitation), 2001 (TRS launch).', 'Revisit c12_ps_cbse_14_008 (Accommodation of Regional Demands) for the general framework of state reorganisation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_14_010', difficulty: 'standard',
          question: 'Balancing regional identity with national integration refers to the.',
          hint: 'Revisit c11_ps_cbse_16_008 (Asymmetrical federalism: Special provisions for certain.',
          misconception: 'Students often think "regionalism = separatism = anti-national" and that the Constitution\'s special provisions (Article.',
          parts: [
                { id: 'a', prompt: 'A new movement demands a separate state of "Vidarbha" citing backwardness and neglect by the Maharashtra government.', answer: 'No, it does not inherently threaten national integration',
                  options: ['No, it does not inherently threaten national integration', 'any new state demand weakens India', 'regionalism = separatism = anti-national'],
                  hint: 'Revisit c11_ps_cbse_16_008 (Asymmetrical federalism: Special provisions for certain states) and.',
                  misconception: 'Students often think "regionalism = separatism = anti-national" and that the Constitution\'s special provisions (Article 370, Sixth.' }
          ],
            remediations: { 'regionalism-separatism-anti-national-and': { steps: ['If a student conflates regionalism with separatism: Step 1 — Re-read the "Region and the Nation" section (NCERT.', 'Nagaland (NSCN: armed separatism).', 'Step 3 — Complete a T-chart: "Democratic regionalism" (language, culture, statehood demands via elections) vs.', '"Separatism" (armed struggle, rejection of Constitution).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
