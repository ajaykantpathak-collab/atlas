import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch11_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch11_p2: SimDef = {
    id: 'v3_c12_soc_ch11_p2',
    title: 'Change and Development in Rural Society · Part 2/2',
    subtitle: 'Two tax systems, one hierarchy',
    classLevel: 12, subject: 'sociology', topic: 'Change and Development in Rural Society · Part 2/2',
    chapters: ['c12_soc_ch11'],
    nodeIds: ['c12_soc_cbse_11_007', 'c12_soc_cbse_11_008', 'c12_soc_cbse_11_009', 'c12_soc_cbse_11_010', 'c12_soc_cbse_11_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Agrarian historian', intro: 'In 1890, who paid the tax told you who owned the village — and usually which caste they were born into.', goal: 'Distinguish zamindari from raiyatwari systems and explain the caste-class structure of colonial agrarian society.' },
    discovery: {
        question: 'In one Bengal village a zamindar skimmed rent from fifty families to pay the British; in a Madras village the ryot paid the taxman directly — and still went hungry to the moneylender. Two systems, same result. What was the machine underneath?',
        options: ['Colonial revenue design — both froze a hierarchy where dominant castes held land and landless labour was hereditary; the intermediary changed, the extraction didn\'t', 'The zamindari system was uniquely cruel', 'Raiyatwari made every cultivator an owner', 'The difference was only paperwork'],
        answer: 'Colonial revenue design — both froze a hierarchy where dominant castes held land and landless labour was hereditary; the intermediary changed, the extraction didn\'t',
        hook: 'Raiyatwari didn\'t abolish landlords — registered ryots sublet, and moneylenders turned debt into land. And a tenant is not a labourer: one held cultivation rights, however shaky; the other owned only their labour.',
    },
    teaching: [
        { title: 'Migration from Rural Areas: Seasonal, Circular and the Rural-Urban Linkage', text: 'Migration from rural areas refers to the movement of people from villages to other locations (often urban or more prosperous rural regions) for work, characterized by distinct patterns: **seasonal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_11_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace the paddy from field to collector under zamindari and raiyatwari — counting who keeps what at each stage and where caste enters the arithmetic.',
        labels: ['Migration from Rural Areas', 'Globalisation and Indian Agriculture', 'The Farmers\' Suicides: Indebtedness,', 'Rural Development Programmes: NREGA/MGNREGA,', 'The Transformation of'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_11_007', title: 'Migration from Rural Areas: Seasonal, Circular and the Rural-Urban Linkage',
          caseStudy: { intro: 'Imagine you see a group of workers at a construction site near your city — they speak a different dialect, live in temporary huts, and vanish after a few.',
            decisions: [{ prompt: 'Define \'circular migration\' in the context of rural India and give one example from the NCERT text.', options: [
                { text: 'Circular migration is the repeated, temporary movement of workers between their home', outcome: 'Circular migration is the repeated, temporary movement of workers between their home village and.' },
                { text: 'permanent shift to city', outcome: 'Not quite — Students often equate \'rural-to-urban migration\' with **permanent settlement in cities** (like the.', reveals: 'students-often-equate-rural-to' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_11_008', title: 'Globalisation and Indian Agriculture: WTO, Subsidies and the Farm Crisis',
          caseStudy: { intro: 'Imagine a farmer in Punjab who once grew wheat and paddy using government-supplied seeds and fertiliser at subsidised rates, selling to the FCI at MSP.',
            decisions: [{ prompt: 'What are the three pillars of the WTO Agreement on Agriculture (AoA) that directly affect Indian farmers\' livelihoods?', options: [
                { text: 'The three pillars are: (1) Market Access (tariffication and reduction of import', outcome: 'The three pillars are: (1) Market Access (tariffication and reduction of import barriers), (2).' },
                { text: 'free trade', outcome: 'Not quite — Students often think "globalisation" means only "imports of cheap food hurt farmers." The deeper.', reveals: 'globalisation-means-only-imports-of' },
                { text: 'imports', outcome: 'Not quite — Students often think "globalisation" means only "imports of cheap food hurt farmers." The deeper.', reveals: 'globalisation-means-only-imports-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_11_009', title: 'The Farmers\' Suicides: Indebtedness, Crop Failure and the Agrarian Crisis',
          caseStudy: { intro: 'Imagine a small farmer in Vidarbha who borrowed ₹3 lakh for Bt cotton seeds and pesticides on the advice of a company agent, but untimely rain and pest attack.',
            decisions: [{ prompt: 'According to NCERT, which four states accounted for 8,900 farmer suicides between 2001 and 2006?', options: [
                { text: 'Andhra Pradesh, Karnataka, Kerala, and Maharashtra', outcome: 'Andhra Pradesh, Karnataka, Kerala, and Maharashtra. A wrong answer listing Punjab, Haryana,.' },
                { text: 'Farmers commit suicide', outcome: 'Not quite — Students often think farmers\' suicides are caused solely by crop failure or personal debt.', reveals: 'farmers-suicides-are-caused-solely' },
                { text: 'choosing', outcome: 'Not quite — Students often think farmers\' suicides are caused solely by crop failure or personal debt.', reveals: 'farmers-suicides-are-caused-solely' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_11_010', title: 'Rural Development Programmes: NREGA/MGNREGA, PMGSY and the PDS',
          caseStudy: { intro: 'Imagine a village in interior Odisha where most households are landless labourers: during the lean season they have no work, the nearest paved road is 15.',
            decisions: [{ prompt: 'What is the legal basis of MGNREGA, and how does it differ from earlier wage-employment programmes like JRY or EAS in terms.', options: [
                { text: 'MGNREGA derives from the Mahatma Gandhi National Rural Employment Guarantee Act, 2005,', outcome: 'MGNREGA derives from the Mahatma Gandhi National Rural Employment Guarantee Act, 2005, which.' },
                { text: 'scheme', outcome: 'Not quite — Students often conflate MGNREGA, PMGSY, and PDS as "welfare schemes" without distinguishing their.', reveals: 'students-often-conflate-mgnrega' },
                { text: 'rights-based approach', outcome: 'Not quite — Students often conflate MGNREGA, PMGSY, and PDS as "welfare schemes" without distinguishing their.', reveals: 'students-often-conflate-mgnrega' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A paralegal intern in a 1960s-set case file finds a landlord legally kept 170 surplus acres — benami transfers to relatives, \'personal cultivation\' claims, paper partitions — and concludes \'land reform simply never happened.\'',
            decisions: [{ prompt: 'What does the implementation-gap analysis say?', options: [
                { text: 'The law happened, the loopholes absorbed it — ceilings counted paper families not effective control, so benami deeds, khudkasht evictions and fictitious splits let dominant-caste landowners keep command; zamindari abolition worked better precisely because it cut one recorded legal layer instead of restructuring village power.', outcome: 'The chapter\'s lesson: reform-on-paper versus power-on-ground — evasion was systematic and socially sanctioned where the dominant caste ran the local administration meant to implement it.' },
                { text: 'She\'s right — if the land stayed put, there was no reform at all.', outcome: 'That erases zamindari abolition, which did remove an entire intermediary class — the verdict isn\'t \'nothing happened\' but that each pillar met a different wall of legal fiction and local power.', reveals: 'no-redistribution-no-reform' },
                { text: 'The fault was just poor drafting — tighter wording alone would have delivered the land.', outcome: 'Drafting was only half the constraint — identifying oral tenancies and concealed surplus needed bureaucratic penetration and political will that dominant-caste-controlled administration wouldn\'t supply; better text doesn\'t move power.', reveals: 'wording-was-the-whole-gap' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_11_011', title: 'You made it',
          caseStudy: { intro: 'You can now see why land control and caste power fused under colonialism — the inequality land reform later had to dig out.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_11_007', difficulty: 'standard',
          question: 'Migration from rural areas refers to the movement of people from villages.',
          hint: 'Revisit the distinction between **peasants (subsistence producers)** and **farmers.',
          misconception: 'Students often equate \'rural-to-urban migration\' with **permanent settlement in cities** (like the classic Lewis.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Migration from rural areas refers to the movement of people from villages to other',
                  options: ['Migration from rural areas refers to the movement of people from villages to other', 'The colonial agrarian structure in India was a three-tier hierarchy of land rights and', 'Land reforms after independence refer to the series of legislative measures (1950s–1970s)', 'The Green Revolution in India (1960s-1970s) was a state-led agricultural modernisation'],
                  hint: 'Revisit the distinction between **peasants (subsistence producers)** and **farmers (market-oriented.',
                  misconception: 'Students often equate \'rural-to-urban migration\' with **permanent settlement in cities** (like the classic Lewis model), ignoring that the.' }
          ],
            remediations: { 'students-often-equate-rural-to': { steps: ['If a student conflates circular with permanent migration: (1) Have them re-read NCERT Section 4.5 ("Circulation.', '(2) Map a **migration circuit** on paper: Village → Punjab (Nov–Apr) → Village (May–Oct) → Brick kiln (Dec–Mar) →.', 'Label each leg with crop/activity.', '(3) Ask: "If migration were permanent, why would the village still have women, elderly, and children doing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_11_008', difficulty: 'standard',
          question: 'Globalisation and Indian Agriculture refers to the process of integrating.',
          hint: 'If stuck, revisit c12_soc_cbse_11_003 (Green Revolution technology) and.',
          misconception: 'Students often think "globalisation" means only "imports of cheap food hurt farmers." The deeper error is missing that.',
          parts: [
                { id: 'a', prompt: 'What are the three pillars of the WTO Agreement on Agriculture (AoA) that directly affect Indian farmers\' livelihoods?', answer: 'The three pillars are: (1) Market Access (tariffication and reduction of import',
                  options: ['The three pillars are: (1) Market Access (tariffication and reduction of import', 'free trade', 'imports', 'globalisation'],
                  hint: 'If stuck, revisit c12_soc_cbse_11_003 (Green Revolution technology) and c12_soc_cbse_11_004 (social.',
                  misconception: 'Students often think "globalisation" means only "imports of cheap food hurt farmers." The deeper error is missing that globalisation *also*.' },
                { id: 'b', prompt: 'Explain why the shift from payment in kind (grain) to cash wages for agricultural labourers, noted in the Green Revolution areas, intensified under.', answer: 'The shift to cash wages accelerated',
                  options: ['The shift to cash wages accelerated', 'modernisation', 'patronage to exploitation', 'globalisation'],
                  hint: 'If stuck, revisit c12_soc_cbse_11_003 (Green Revolution technology) and c12_soc_cbse_11_004 (social.',
                  misconception: 'Students often think "globalisation" means only "imports of cheap food hurt farmers." The deeper error is missing that globalisation *also*.' }
          ],
            remediations: { 'globalisation-means-only-imports-of': { steps: ['If the student cannot link WTO subsidy boxes to domestic input costs, or conflates contract farming with traditional.', '(2) Create a two-column table: "Pre-1991 State-Led Regime" vs "Post-WTO Corporate-Led Regime" for *seeds, credit.', '(3) Watch a 10-min documentary clip on Vidarbha suicides (e.g., "Nero\'s Guests") and map each farmer\'s story to the.', '(4) Re-attempt Diagnostic Questions 3 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_11_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "globalisation" means only "imports of cheap food hurt farmers." The deeper error is missing that.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The farm crisis and farmer suicides in Vidarbha and Telangana are primarily caused by the withdrawal of agricultural subsidies.', answer: 'The statement is partially accurate but reductionist',
                  options: ['The statement is partially accurate but reductionist', 'farmer ignorance', 'globalisation', 'imports of cheap food hurt farmers'],
                  hint: 'If stuck, revisit c12_soc_cbse_11_003 (Green Revolution technology) and c12_soc_cbse_11_004 (social.',
                  misconception: 'Students often think "globalisation" means only "imports of cheap food hurt farmers." The deeper error is missing that globalisation *also*.' }
          ],
            remediations: { 'globalisation-means-only-imports-of': { steps: ['If the student cannot link WTO subsidy boxes to domestic input costs, or conflates contract farming with traditional.', '(2) Create a two-column table: "Pre-1991 State-Led Regime" vs "Post-WTO Corporate-Led Regime" for *seeds, credit.', '(3) Watch a 10-min documentary clip on Vidarbha suicides (e.g., "Nero\'s Guests") and map each farmer\'s story to the.', '(4) Re-attempt Diagnostic Questions 3 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_11_009', difficulty: 'standard',
          question: 'Farmers\' suicides in India refer to the tragic phenomenon where cultivators.',
          hint: 'Revisit c12_soc_cbse_11_008 (Globalisation and Indian Agriculture) to see how WTO and.',
          misconception: 'Students often think farmers\' suicides are caused solely by crop failure or personal debt mismanagement.',
          parts: [
                { id: 'a', prompt: 'According to NCERT, which four states accounted for 8,900 farmer suicides between 2001 and 2006?', answer: 'Andhra Pradesh, Karnataka, Kerala, and Maharashtra',
                  options: ['Andhra Pradesh, Karnataka, Kerala, and Maharashtra', 'Farmers commit suicide', 'choosing'],
                  hint: 'Revisit c12_soc_cbse_11_008 (Globalisation and Indian Agriculture) to see how WTO and.',
                  misconception: 'Students often think farmers\' suicides are caused solely by crop failure or personal debt mismanagement.' }
          ],
            remediations: { 'farmers-suicides-are-caused-solely': { steps: ['If the student holds this misconception, have them trace a cotton farmer\'s season in Vidarbha: (1) Company agent.', '(2) Farmer borrows from moneylender at 36% because bank credit is inaccessible/untimely.', '(3) Pest attack occurs; agent sells more pesticide.', '(4) Crop fails; trader offers ₹4,200/quintal (below MSP).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_11_010', difficulty: 'standard',
          question: 'Rural Development Programmes are state-led interventions designed to address.',
          hint: 'Revisit the "Circulation of Labour" section (c12_soc_cbse_11_007) and the "Agrarian.',
          misconception: 'Students often conflate MGNREGA, PMGSY, and PDS as "welfare schemes" without distinguishing their *legal nature* (Act.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rural Development Programmes are state-led interventions designed to address structural',
                  options: ['Rural Development Programmes are state-led interventions designed to address structural', 'The colonial agrarian structure in India was a three-tier hierarchy of land rights and', 'Land reforms after independence refer to the series of legislative measures (1950s–1970s)', 'The Green Revolution in India (1960s-1970s) was a state-led agricultural modernisation'],
                  hint: 'Revisit the "Circulation of Labour" section (c12_soc_cbse_11_007) and the "Agrarian Structure".',
                  misconception: 'Students often conflate MGNREGA, PMGSY, and PDS as "welfare schemes" without distinguishing their *legal nature* (Act vs Scheme vs Act).' }
          ],
            remediations: { 'students-often-conflate-mgnrega': { steps: ['If a student confuses the three programmes, do NOT re-read the whole chapter.', 'Instead: (1) Make a three-column table: Programme | Legal Basis | Core Entitlement | Implementing Agency | Targeting.', '(2) Fill it using only the NCERT boxes on each programme.', '(3) Write one sentence per programme linking it to a deprivation studied earlier (e.g., "MGNREGA addresses.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_11_011', difficulty: 'standard',
          question: 'The transformation of the rural caste system from jajmani to wage labour refers.',
          hint: 'If stuck, revisit c11_soc_cbse_10_010 (Srinivas on dominant caste) and the NCERT Box 4.1.',
          misconception: 'Students often believe the jajmani system was a static, purely exploitative \'feudal\' arrangement that was simply.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The transformation of the rural caste system from jajmani to wage labour refers to the',
                  options: ['The transformation of the rural caste system from jajmani to wage labour refers to the', 'The colonial agrarian structure in India was a three-tier hierarchy of land rights and', 'Land reforms after independence refer to the series of legislative measures (1950s–1970s)', 'The Green Revolution in India (1960s-1970s) was a state-led agricultural modernisation'],
                  hint: 'If stuck, revisit c11_soc_cbse_10_010 (Srinivas on dominant caste) and the NCERT Box 4.1.',
                  misconception: 'Students often believe the jajmani system was a static, purely exploitative \'feudal\' arrangement that was simply replaced by modern wage.' }
          ],
            remediations: { 'the-jajmani-system-was-a': { steps: ['If a student holds this misconception, guide them through a three-step correction: (1) Re-read the NCERT passage.', '(2) Compare the village studies of Srinivas (Rampura, 1950s) and Breman (South Gujarat, 1970s) using the worked example.', '(3) Re-attempt Diagnostic Question 3 with the prompt: "Write one paragraph from the landlord\'s perspective explaining.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
