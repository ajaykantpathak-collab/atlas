import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch17_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch17_p2: SimDef = {
    id: 'v3_c11_ps_ch17_p2',
    title: 'Local Governments · Part 2/2',
    subtitle: 'Discover what changed in 1992 — not the panchayat, but its permanence.',
    classLevel: 11, subject: 'political_science', topic: 'Local Governments · Part 2/2',
    chapters: ['c11_ps_ch17'],
    nodeIds: ['c11_ps_cbse_17_007', 'c11_ps_cbse_17_008', 'c11_ps_cbse_17_009', 'c11_ps_cbse_17_010', 'c11_ps_cbse_17_011', 'c11_ps_cbse_17_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a district planner distinguishing agency from tier of government', intro: 'Same village council, new status — before 1992 a state could dissolve it at will; after, the Constitution itself guaranteed the chair.', goal: 'Explain the 73rd/74th Amendments\' constitutionalisation of local government.' },
    discovery: {
        question: 'The 73rd and 74th Amendments of 1992 created Panchayati Raj — true?',
        options: ['No — statutory panchayats existed since the 1950s; the amendments made them a constitutional entitlement states could no longer suspend or starve', 'Yes — before 1992 there were no panchayats', 'Yes — the amendments invented local government', 'No — panchayats began in 1947'],
        answer: 'No — statutory panchayats existed since the 1950s; the amendments made them a constitutional entitlement states could no longer suspend or starve',
        hook: 'The real change: Bihar went without panchayat elections for years pre-1992; after the amendments, elections, a state election commission and finance commission became mandatory.',
    },
    teaching: [
        { title: 'Types of urban local bodies: Municipal Corporation, Council, Nagar Panchayat', text: 'Under Article 243Q of the Constitution (inserted by the 74th Amendment Act, 1992), every state must constitute three types of Urban Local Bodies (ULBs) based on the size and character of the urban.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_17_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compare a dissolvable pre-1992 body with a constitutionally protected one, then argue why \'states administer better by scale\' misses the point.',
        labels: ['Types of urban local', 'Reservation for women, SCs', 'State Election Commission', 'Devolution of powers', 'Panchayati Raj in Scheduled', 'Challenges to local self-government'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_17_007', title: 'Types of urban local bodies: Municipal Corporation, Council, Nagar Panchayat',
          caseStudy: { intro: 'Imagine you are comparing three settlements in your state: a metropolis like Mumbai (population 1.2 crore), a mid-sized city like Mysuru (population ~10 lakh).',
            decisions: [{ prompt: '**REMEMBER**: Name the constitutional article that mandates the three types of Urban Local Bodies and list the three types with their.', options: [
                { text: 'Article 243Q mandates: (1) Municipal Corporation (Mahanagar Palika), (2) Municipal', outcome: 'Article 243Q mandates: (1) Municipal Corporation (Mahanagar Palika), (2) Municipal Council (Nagar.' },
                { text: 'Municipal Committee', outcome: 'Not quite — Students often believe **Nagar Panchayat is a rural body** because "Panchayat" is in the name,.', reveals: 'nagar-panchayat-is-a-rural' },
                { text: 'Panchayat', outcome: 'Not quite — Students often believe **Nagar Panchayat is a rural body** because "Panchayat" is in the name,.', reveals: 'nagar-panchayat-is-a-rural' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_17_008', title: 'Reservation for women, SCs and STs in local bodies',
          caseStudy: { intro: 'Imagine you are a voter in a Gram Panchayat with 15 wards where the Sarpanch seat is reserved for an SC woman this election cycle.',
            decisions: [{ prompt: 'A Gram Panchayat has 17 wards. The SC population is 22% and ST population is 8% as per the latest Census.', options: [
                { text: 'SC: 4 wards (22% of 17 = 3.74, rounded to nearest whole number = 4)', outcome: 'SC: 4 wards (22% of 17 = 3.74, rounded to nearest whole number = 4).' },
                { text: 'one-third reservation for women', outcome: 'Not quite — Students believe "one-third reservation for women" means 33% of GENERAL category seats only.', reveals: 'one-third-reservation-for-women' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_17_010', title: 'Devolution of powers and resources to local governments',
          caseStudy: { intro: 'Imagine your Gram Panchayat wants to build a village health center but discovers it has no funds, no doctor, and no power to decide the location — the Block.',
            decisions: [{ prompt: 'What are the three specific constitutional provisions that form the legal basis for devolution of powers to Panchayats and Municipalities?', options: [
                { text: 'The three core provisions are: (1) Article 243G (Panchayats) and Article 243W', outcome: 'The three core provisions are: (1) Article 243G (Panchayats) and Article 243W (Municipalities).' },
                { text: 'the 73rd/74th Amendments automatically transferred powers to local bodies', outcome: 'Not quite — Students believe the 73rd/74th Amendments automatically transferred powers to local bodies.', reveals: 'the-73rd-74th-amendments-automatically' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_17_012', title: 'Challenges to local self-government: Funds, functions, functionaries',
          caseStudy: { intro: 'Imagine you are a newly elected Sarpanch in a Gram Panchayat in Maharashtra. Villagers demand a functional primary health sub-centre and all-weather roads.',
            decisions: [{ prompt: 'A student states: "The 73rd Amendment gave Panchayats all 29 subjects in the Eleventh Schedule, so they have full functional autonomy.".', options: [
                { text: '**Error:** The Eleventh Schedule (Article 243-G) lists 29 subjects **on which the State', outcome: '**Error:** The Eleventh Schedule (Article 243-G) lists 29 subjects **on which the State Legislature.' },
                { text: 'The 73rd/74th Amendments *gave* powers to local bodies', outcome: 'Not quite — Students believe **"The 73rd/74th Amendments *gave* powers to local bodies"** — treating the.', reveals: 'the-73rd-74th-amendments-gave' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_17_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a panchayat-visit debrief, a student says: \'The 73rd Amendment created Panchayati Raj in 1992, and since states pass the laws, the state government can dissolve a panchayat any time — they\'re really just state agencies.\'',
            decisions: [{ prompt: 'What did the amendments actually change?', options: [
                { text: 'Separate existence from entitlement: three-tier panchayats existed in most states since the 1950s (post-Balwant Rai Mehta) — but as creatures of state law they could be superseded for decades; Bihar held no panchayat election from 1978 to 2001. The 73rd/74th Amendments constitutionalised them as a third tier: fixed five-year term (Art. 243E), a State Election Commission, a Finance Commission — permanence and resource rights, not invention.', outcome: 'He sees the real transformation: the amendments didn\'t create local bodies — they made their existence, elections and finances constitutionally guaranteed.' },
                { text: 'Keep \'created in 1992\' — before the amendments there were no panchayats.', outcome: 'Statutory panchayats predated 1992 by decades; what was missing was constitutional protection — the amendments supplied durability, not the blueprint.', reveals: 'amendments-created-panchayats' },
                { text: 'Keep \'state agency\' — state law created them, so the state controls their life.', outcome: 'Post-1992 they\'re a constitutional tier: Article 243E\'s fixed term and independent state election machinery specifically block arbitrary dissolution.', reveals: 'panchayats-are-state-agencies' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_17_012', title: 'You made it',
          caseStudy: { intro: 'Local government isn\'t an efficiency scheme — it\'s the third tier of democracy, and the amendments made it unfireable.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_17_007', difficulty: 'standard',
          question: 'Under Article 243Q of the Constitution (inserted by the 74th Amendment Act.',
          hint: 'Revisit node c11_ps_cbse_17_006 (74th Amendment) and Article 243Q text; also review.',
          misconception: 'Students often believe **Nagar Panchayat is a rural body** because "Panchayat" is in the name, or that **Municipal.',
          parts: [
                { id: 'a', prompt: '**APPLY**: The Governor of State X issues a notification classifying urban areas as: (a) Population ≥ 10 lakh + density ≥ 4,000/km² → Corporation; (b).', answer: 'Settlement A → Municipal Council (meets population & density for Council',
                  options: ['Settlement A → Municipal Council (meets population & density for Council', 'Panchayat'],
                  hint: 'Revisit node c11_ps_cbse_17_006 (74th Amendment) and Article 243Q text; also review.',
                  misconception: 'Students often believe **Nagar Panchayat is a rural body** because "Panchayat" is in the name, or that **Municipal Corporation is a higher.' },
                { id: 'b', prompt: '**ANALYZE**: Compare the three ULB types on: (i) Typical administrative head (designation), (ii) Executive head (appointed vs.', answer: '| Feature | Municipal Corporation | Municipal Council | Nagar Panchayat |',
                  options: ['| Feature | Municipal Corporation | Municipal Council | Nagar Panchayat |', 'Panchayat'],
                  hint: 'Revisit node c11_ps_cbse_17_006 (74th Amendment) and Article 243Q text; also review.',
                  misconception: 'Students often believe **Nagar Panchayat is a rural body** because "Panchayat" is in the name, or that **Municipal Corporation is a higher.' }
          ],
            remediations: { 'nagar-panchayat-is-a-rural': { steps: ['Re-read Article 243Q text: "There shall be constituted...', '(b) a Municipal Council...', '(c) a Municipal Corporation..." – note the *parallel* structure.', 'Check your state\'s Municipal Act (e.g., UP Municipal Corporations Act, 1959; Maharashtra Municipal Corporations Act.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_17_008', difficulty: 'standard',
          question: 'Reservation in local bodies is a constitutional mandate under Articles 243D.',
          hint: 'Revisit Article 243D clauses (1)-(4) in the 73rd Amendment text and Article 243T in the.',
          misconception: 'Students believe "one-third reservation for women" means 33% of GENERAL category seats only, ignoring that Article.',
          parts: [
                { id: 'a', prompt: 'A Gram Panchayat has 17 wards. The SC population is 22% and ST population is 8% as per the latest Census.', answer: 'SC: 4 wards (22% of 17 = 3.74, rounded to nearest whole number = 4)',
                  options: ['SC: 4 wards (22% of 17 = 3.74, rounded to nearest whole number = 4)', 'one-third reservation for women'],
                  hint: 'Revisit Article 243D clauses (1)-(4) in the 73rd Amendment text and Article 243T in the 74th.',
                  misconception: 'Students believe "one-third reservation for women" means 33% of GENERAL category seats only, ignoring that Article 243D(3) mandates.' },
                { id: 'b', prompt: 'Why does the Constitution mandate that women\'s reservation (not less than one-third) applies to the TOTAL number of seats including those already reserved for.', answer: 'Because SC/ST women face intersectional discrimination',
                  options: ['Because SC/ST women face intersectional discrimination', 'to keep calculation simple', 'one-third reservation for women', 'of reservation as arithmetic rather than justice'],
                  hint: 'Revisit Article 243D clauses (1)-(4) in the 73rd Amendment text and Article 243T in the 74th.',
                  misconception: 'Students believe "one-third reservation for women" means 33% of GENERAL category seats only, ignoring that Article 243D(3) mandates.' },
                { id: 'c', prompt: 'In a Municipal Corporation with 60 wards, 12 wards are reserved for SCs and 3 for STs.', answer: 'Total seats = 60',
                  options: ['Total seats = 60', 'invalid because SC/ST wards are separate', 'one-third reservation for women'],
                  hint: 'Revisit Article 243D clauses (1)-(4) in the 73rd Amendment text and Article 243T in the 74th.',
                  misconception: 'Students believe "one-third reservation for women" means 33% of GENERAL category seats only, ignoring that Article 243D(3) mandates.' },
                { id: 'd', prompt: 'Compare the reservation formula for Chairpersons (Adhyakshas/Mayors) under Articles 243D(4) and 243T(4) with the formula for member seats.', answer: 'Member seats: proportional to population for SC/ST',
                  options: ['Member seats: proportional to population for SC/ST', 'same formula', 'one-third reservation for women'],
                  hint: 'Revisit Article 243D clauses (1)-(4) in the 73rd Amendment text and Article 243T in the 74th.',
                  misconception: 'Students believe "one-third reservation for women" means 33% of GENERAL category seats only, ignoring that Article 243D(3) mandates.' }
          ],
            remediations: { 'one-third-reservation-for-women': { steps: ['Re-read Article 243D(3) and 243T(3) text: "not less than one-third of the total number of seats reserved under clause.', 'Work a numerical example: 30 seats, 30% SC (9 seats), 10% ST (3 seats). Calculate women\'s quota on 30, not 18.', 'Contrast with Article 243D(4): "offices of Chairpersons... reserved for SC/ST in proportion to their population in the.', 'Check your State\'s Panchayati Raj Act for the actual rotation formula and notification timeline.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_17_009', difficulty: 'standard',
          question: 'The State Election Commission (SEC) is a constitutional body under Article 243K.',
          hint: 'Review Articles 243K, 243I, 243ZA, 243Y in the Constitution and the Class 10 node.',
          misconception: 'Students often think the Election Commission of India (ECI) conducts panchayat and municipal elections, and that the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The State Election Commission (SEC) is a constitutional body under Article 243K (for',
                  options: ['The State Election Commission (SEC) is a constitutional body under Article 243K (for', 'Local government refers to the governance structures at the village, town, and city', 'The evolution of local government in India traces the historical trajectory from Lord', 'The 73rd Constitutional Amendment Act, 1992 (effective 1993) inserted Part IX (Articles'],
                  hint: 'Review Articles 243K, 243I, 243ZA, 243Y in the Constitution and the Class 10 node.',
                  misconception: 'Students often think the Election Commission of India (ECI) conducts panchayat and municipal elections, and that the Union Finance.' }
          ],
            remediations: { 'the-election-commission-of-india': { steps: ['If the student holds this misconception, have them create a two-column table: Column A for national bodies (ECI, Union.', 'Then ask them to read a news clipping about a panchayat election delay and identify which body is responsible.', 'Finally, have them trace the flow of funds from state taxes to a gram panchayat using the SFC recommendation route.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_17_010', difficulty: 'standard',
          question: 'Devolution of powers and resources to local governments refers to the.',
          hint: 'Revisit Article 243G/243W text and the Eleventh/Twelfth Schedules — identify which.',
          misconception: 'Students believe the 73rd/74th Amendments automatically transferred powers to local bodies.',
          parts: [
                { id: 'a', prompt: 'What are the three specific constitutional provisions that form the legal basis for devolution of powers to Panchayats and Municipalities?', answer: 'The three core provisions are: (1) Article 243G (Panchayats) and Article 243W',
                  options: ['The three core provisions are: (1) Article 243G (Panchayats) and Article 243W', 'the 73rd/74th Amendments automatically transferred powers to local bodies'],
                  hint: 'Revisit Article 243G/243W text and the Eleventh/Twelfth Schedules — identify which subjects are.',
                  misconception: 'Students believe the 73rd/74th Amendments automatically transferred powers to local bodies.' },
                { id: 'b', prompt: 'Compare the devolution framework for Panchayats (Article 243G + Eleventh Schedule) with Municipalities (Article 243W + Twelfth Schedule).', answer: 'Two structural differences: (1) The Twelfth Schedule has 18 subjects vs',
                  options: ['Two structural differences: (1) The Twelfth Schedule has 18 subjects vs', 'the 73rd/74th Amendments automatically transferred powers to local bodies'],
                  hint: 'Revisit Article 243G/243W text and the Eleventh/Twelfth Schedules — identify which subjects are.',
                  misconception: 'Students believe the 73rd/74th Amendments automatically transferred powers to local bodies.' }
          ],
            remediations: { 'the-73rd-74th-amendments-automatically': { steps: ['Re-read Articles 243G and 243W — note the phrase "may, by law, endow" and list the three things States must devolve.', 'Check your State\'s Panchayati Raj Act — find the section listing devolved subjects and compare with Eleventh Schedule.', 'Ask your teacher for the latest State Finance Commission report — note the % of State revenue devolved and the share.', 'Trace one scheme (e.g., MGNREGS) — who decides the work, who pays wages, who appoints the mate?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_17_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the 73rd/74th Amendments automatically transferred powers to local bodies.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of State Finance Commissions (SFCs) in ensuring fiscal devolution.', answer: 'SFCs have limited effectiveness: (1) Predictability',
                  options: ['SFCs have limited effectiveness: (1) Predictability', 'SFCs exist in all States', 'the 73rd/74th Amendments automatically transferred powers to local bodies'],
                  hint: 'Revisit Article 243G/243W text and the Eleventh/Twelfth Schedules — identify which subjects are.',
                  misconception: 'Students believe the 73rd/74th Amendments automatically transferred powers to local bodies.' },
                { id: 'b', prompt: 'Draft a one-paragraph "Activity Mapping" resolution for a Gram Panchayat taking over "Minor Irrigation" (Eleventh Schedule Item 11), specifying which.', answer: 'A strong answer distinguishes: Panchayat',
                  options: ['A strong answer distinguishes: Panchayat', 'the 73rd/74th Amendments automatically transferred powers to local bodies'],
                  hint: 'Revisit Article 243G/243W text and the Eleventh/Twelfth Schedules — identify which subjects are.',
                  misconception: 'Students believe the 73rd/74th Amendments automatically transferred powers to local bodies.' }
          ],
            remediations: { 'the-73rd-74th-amendments-automatically': { steps: ['Re-read Articles 243G and 243W — note the phrase "may, by law, endow" and list the three things States must devolve.', 'Check your State\'s Panchayati Raj Act — find the section listing devolved subjects and compare with Eleventh Schedule.', 'Ask your teacher for the latest State Finance Commission report — note the % of State revenue devolved and the share.', 'Trace one scheme (e.g., MGNREGS) — who decides the work, who pays wages, who appoints the mate?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_17_011', difficulty: 'standard',
          question: 'The Panchayats (Extension to Scheduled Areas) Act, 1996 (PESA) is a central.',
          hint: 'Review the 73rd Amendment (node c11_ps_cbse_17_003) and Gram Sabha (node.',
          misconception: 'Students often believe PESA *replaces* the 73rd Amendment in Scheduled Areas, creating a parallel system.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Panchayats (Extension to Scheduled Areas) Act, 1996 (PESA) is a central legislation',
                  options: ['The Panchayats (Extension to Scheduled Areas) Act, 1996 (PESA) is a central legislation', 'Local government refers to the governance structures at the village, town, and city', 'The evolution of local government in India traces the historical trajectory from Lord', 'The 73rd Constitutional Amendment Act, 1992 (effective 1993) inserted Part IX (Articles'],
                  hint: 'Review the 73rd Amendment (node c11_ps_cbse_17_003) and Gram Sabha (node c11_ps_cbse_17_005).',
                  misconception: 'Students often believe PESA *replaces* the 73rd Amendment in Scheduled Areas, creating a parallel system.' }
          ],
            remediations: { 'pesa-replaces-the-73rd-amendment': { steps: ['If the student holds these misconceptions, do this 3-step remediation: (1) Read Article 243M(4)(b) and Article 243ZC.', 'with such exceptions and modifications" vs.', '(2) Create a two-column table: Column A = 73rd Amendment provision (e.g., Article 243G: powers of Panchayats); Column.', 'See that the structure remains, but powers shift.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_17_012', difficulty: 'standard',
          question: 'The "Three Fs" — Funds, Functions, and Functionaries — constitute the core.',
          hint: 'Revisit c11_ps_cbse_17_003 (73rd Amendment) and c11_ps_cbse_17_006 (74th Amendment).',
          misconception: 'Students believe **"The 73rd/74th Amendments *gave* powers to local bodies"** — treating the Amendments.',
          parts: [
                { id: 'a', prompt: 'Why does the "parallel bodies" problem (e.g., state-level Water Supply Boards, Health Societies, Education Missions) persist even after the 73rd/74th.', answer: '**Correct reasoning:** Parallel bodies persist',
                  options: ['**Correct reasoning:** Parallel bodies persist', 'lack of political will', 'The 73rd/74th Amendments *gave* powers to local bodies'],
                  hint: 'Revisit c11_ps_cbse_17_003 (73rd Amendment) and c11_ps_cbse_17_006 (74th Amendment) — focus on the.',
                  misconception: 'Students believe **"The 73rd/74th Amendments *gave* powers to local bodies"** — treating the Amendments as self-executing transfers.' },
                { id: 'b', prompt: 'A Gram Panchayat in Karnataka receives ₹15 lakh under the 15th Finance Commission grant (untied) and ₹40 lakh under MGNREGS (tied, wage-only).', answer: '**(a)** MGNREGS is a centrally sponsored scheme with **tied funds**',
                  options: ['**(a)** MGNREGS is a centrally sponsored scheme with **tied funds**', 'BDO is corrupt', 'Sarpanch is wrong', 'The 73rd/74th Amendments *gave* powers to local bodies'],
                  hint: 'Revisit c11_ps_cbse_17_003 (73rd Amendment) and c11_ps_cbse_17_006 (74th Amendment) — focus on the.',
                  misconception: 'Students believe **"The 73rd/74th Amendments *gave* powers to local bodies"** — treating the Amendments as self-executing transfers.' }
          ],
            remediations: { 'the-73rd-74th-amendments-gave': { steps: ['** Re-read Article 243-G and 243-W verbatim — highlight "may by law endow." **', '** Take your State\'s Panchayati Raj Act (e.g., Karnataka Panchayat Raj Act, 1993) and list which of the 29 subjects are.', '** Trace one devolved function (e.g., "rural sanitation") — ask: Who pays? Who appoints the sweeper? Who monitors?', '** Read the latest State Finance Commission report\'s "Devolution Gap" table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
