import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch17_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch17_p1: SimDef = {
    id: 'v3_c11_ps_ch17_p1',
    title: 'Local Governments · Part 1/2',
    subtitle: 'Discover what changed in 1992 — not the panchayat, but its permanence.',
    classLevel: 11, subject: 'political_science', topic: 'Local Governments · Part 1/2',
    chapters: ['c11_ps_ch17'],
    nodeIds: ['c11_ps_cbse_17_001', 'c11_ps_cbse_17_002', 'c11_ps_cbse_17_003', 'c11_ps_cbse_17_004', 'c11_ps_cbse_17_005', 'c11_ps_cbse_17_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a district planner distinguishing agency from tier of government', intro: 'Same village council, new status — before 1992 a state could dissolve it at will; after, the Constitution itself guaranteed the chair.', goal: 'Explain the 73rd/74th Amendments\' constitutionalisation of local government.' },
    discovery: {
        question: 'The 73rd and 74th Amendments of 1992 created Panchayati Raj — true?',
        options: ['No — statutory panchayats existed since the 1950s; the amendments made them a constitutional entitlement states could no longer suspend or starve', 'Yes — before 1992 there were no panchayats', 'Yes — the amendments invented local government', 'No — panchayats began in 1947'],
        answer: 'No — statutory panchayats existed since the 1950s; the amendments made them a constitutional entitlement states could no longer suspend or starve',
        hook: 'The real change: Bihar went without panchayat elections for years pre-1992; after the amendments, elections, a state election commission and finance commission became mandatory.',
    },
    teaching: [
        { title: 'Why local governments: Grassroots democracy and responsiveness', text: 'Local government refers to the governance structures at the village, town, and city levels that are constitutionally mandated to manage local affairs through directly elected representatives.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_17_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compare a dissolvable pre-1992 body with a constitutionally protected one, then argue why \'states administer better by scale\' misses the point.',
        labels: ['Why local governments: Grassroots', 'Evolution of local government', '73rd Constitutional Amendment: Panchayati', 'Three-tier Panchayati Raj: Gram', 'Gram Sabha: Composition', '74th Constitutional Amendment: Urban'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_17_002', title: 'Evolution of local government in India: From Lord Ripon to 73rd/74th Amendments',
          caseStudy: { intro: 'Imagine you are a citizen in 1880s Madras trying to get a street lamp fixed—the British collector decides if your neighborhood deserves it.',
            decisions: [{ prompt: 'What was the specific innovation introduced by Lord Ripon\'s Resolution of 1882 regarding the composition of municipal bodies in British.', options: [
                { text: 'Lord Ripon\'s 1882 Resolution mandated that municipal bodies should have a majority of', outcome: 'Lord Ripon\'s 1882 Resolution mandated that municipal bodies should have a majority of elected.' },
                { text: 'it introduced universal adult franchise', outcome: 'Not quite — Students often believe the 73rd/74th Amendments "created" Panchayati Raj in India, ignoring that.', reveals: 'the-73rd-74th-amendments-created' },
                { text: 'it created village panchayats', outcome: 'Not quite — Students often believe the 73rd/74th Amendments "created" Panchayati Raj in India, ignoring that.', reveals: 'the-73rd-74th-amendments-created' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_17_003', title: '73rd Constitutional Amendment: Panchayati Raj institutions',
          caseStudy: { intro: 'Imagine reading a news report about a Gram Panchayat in Rajasthan that was dissolved by the state government just before its term ended, leaving the village.',
            decisions: [{ prompt: 'What is the constitutional article number that mandates the establishment of a three-tier Panchayati Raj structure in every state (with.', options: [
                { text: 'Article 243B mandates a three-tier structure (village, intermediate, district) in every', outcome: 'Article 243B mandates a three-tier structure (village, intermediate, district) in every state.' },
                { text: 'created', outcome: 'Not quite — Students often believe the 73rd Amendment "created" Panchayats in India.', reveals: 'the-73rd-amendment-created-panchayats' },
                { text: 'the 73rd Amendment "created" Panchayats in India', outcome: 'Not quite — Students often believe the 73rd Amendment "created" Panchayats in India.', reveals: 'the-73rd-amendment-created-panchayats' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_17_005', title: 'Gram Sabha: Composition and functions as the foundation of PRIs',
          caseStudy: { intro: 'Imagine you are a resident of Rampur village and see a notice on the Panchayat office wall announcing a Gram Sabha meeting this Sunday to discuss the MGNREGA.',
            decisions: [{ prompt: 'What is the constitutional article that defines the Gram Sabha, and who constitutes its membership according to this article?', options: [
                { text: 'Article 243(b) defines Gram Sabha as a body consisting of persons registered in the', outcome: 'Article 243(b) defines Gram Sabha as a body consisting of persons registered in the electoral rolls.' },
                { text: 'meeting', outcome: 'Not quite — Students often believe the Gram Sabha is just a "meeting" called by the Sarpanch, and that the.', reveals: 'the-gram-sabha-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_17_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a panchayat-visit debrief, a student says: \'The 73rd Amendment created Panchayati Raj in 1992, and since states pass the laws, the state government can dissolve a panchayat any time — they\'re really just state agencies.\'',
            decisions: [{ prompt: 'What did the amendments actually change?', options: [
                { text: 'Separate existence from entitlement: three-tier panchayats existed in most states since the 1950s (post-Balwant Rai Mehta) — but as creatures of state law they could be superseded for decades; Bihar held no panchayat election from 1978 to 2001. The 73rd/74th Amendments constitutionalised them as a third tier: fixed five-year term (Art. 243E), a State Election Commission, a Finance Commission — permanence and resource rights, not invention.', outcome: 'He sees the real transformation: the amendments didn\'t create local bodies — they made their existence, elections and finances constitutionally guaranteed.' },
                { text: 'Keep \'created in 1992\' — before the amendments there were no panchayats.', outcome: 'Statutory panchayats predated 1992 by decades; what was missing was constitutional protection — the amendments supplied durability, not the blueprint.', reveals: 'amendments-created-panchayats' },
                { text: 'Keep \'state agency\' — state law created them, so the state controls their life.', outcome: 'Post-1992 they\'re a constitutional tier: Article 243E\'s fixed term and independent state election machinery specifically block arbitrary dissolution.', reveals: 'panchayats-are-state-agencies' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_17_006', title: 'The bigger picture',
          caseStudy: { intro: 'Local government isn\'t an efficiency scheme — it\'s the third tier of democracy, and the amendments made it unfireable.',
            decisions: [{ prompt: 'What comes next? Local Governments · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Local Governments · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_17_001', difficulty: 'standard',
          question: 'Local government refers to the governance structures at the village, town, and.',
          hint: 'Revisit Class 10 Federalism chapter (c10_civ_cbse_02_004, c10_civ_cbse_02_008) focusing.',
          misconception: 'Students often think local governments are merely administrative agencies of the State government (like district.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Local government refers to the governance structures at the village, town, and city',
                  options: ['Local government refers to the governance structures at the village, town, and city', 'The evolution of local government in India traces the historical trajectory from Lord', 'The 73rd Constitutional Amendment Act, 1992 (effective 1993) inserted Part IX (Articles', 'The Three-tier Panchayati Raj system is a constitutionally mandated (Article 243B, 73rd'],
                  hint: 'Revisit Class 10 Federalism chapter (c10_civ_cbse_02_004, c10_civ_cbse_02_008) focusing on the.',
                  misconception: 'Students often think local governments are merely administrative agencies of the State government (like district administration) because.' }
          ],
            remediations: { 'local-governments-are-merely-administrative': { steps: ['If the student holds this misconception, have them read Article 243E (duration of Panchayats) and Article 243K (State.', 'Then ask: "Can the State government dissolve a Panchayat before five years?', 'Who conducts the next election?" This forces them to see the constitutional safeguards that differentiate local.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_17_002', difficulty: 'standard',
          question: 'The evolution of local government in India traces the historical trajectory.',
          hint: 'If stuck, revisit Class 10 Federalism chapter (c10_civ_cbse_02_004, c10_civ_cbse_02_005).',
          misconception: 'Students often believe the 73rd/74th Amendments "created" Panchayati Raj in India, ignoring that most states had.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The evolution of local government in India traces the historical trajectory from Lord',
                  options: ['The evolution of local government in India traces the historical trajectory from Lord', 'Local government refers to the governance structures at the village, town, and city', 'The 73rd Constitutional Amendment Act, 1992 (effective 1993) inserted Part IX (Articles', 'The Three-tier Panchayati Raj system is a constitutionally mandated (Article 243B, 73rd'],
                  hint: 'If stuck, revisit Class 10 Federalism chapter (c10_civ_cbse_02_004, c10_civ_cbse_02_005).',
                  misconception: 'Students often believe the 73rd/74th Amendments "created" Panchayati Raj in India, ignoring that most states had statutory three-tier.' }
          ],
            remediations: { 'the-73rd-74th-amendments-created': { steps: ['If a student holds this misconception, have them: (1) Read the Bihar Panchayati Raj Act, 1993 (pre-amendment) and note.', '(2) Compare with Article 243E post-amendment: "every Panchayat shall continue for five years...', 'elections shall be completed before expiry." (3) Map the timeline: 1959 (Rajasthan first three-tier) → 1992 (73rd.', 'This concrete comparison shows the shift from statutory grace to constitutional right.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_17_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the 73rd/74th Amendments "created" Panchayati Raj in India, ignoring that most states had.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The 73rd and 74th Amendments merely codified existing state-level Panchayati Raj laws; they did not fundamentally alter the.', answer: 'The claim is false',
                  options: ['The claim is false', 'created'],
                  hint: 'If stuck, revisit Class 10 Federalism chapter (c10_civ_cbse_02_004, c10_civ_cbse_02_005).',
                  misconception: 'Students often believe the 73rd/74th Amendments "created" Panchayati Raj in India, ignoring that most states had statutory three-tier.' }
          ],
            remediations: { 'the-73rd-74th-amendments-created': { steps: ['If a student holds this misconception, have them: (1) Read the Bihar Panchayati Raj Act, 1993 (pre-amendment) and note.', '(2) Compare with Article 243E post-amendment: "every Panchayat shall continue for five years...', 'elections shall be completed before expiry." (3) Map the timeline: 1959 (Rajasthan first three-tier) → 1992 (73rd.', 'This concrete comparison shows the shift from statutory grace to constitutional right.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_17_003', difficulty: 'standard',
          question: 'The 73rd Constitutional Amendment Act, 1992 (effective 1993) inserted Part.',
          hint: 'Revisit the difference between Article 40 (Directive Principle, non-justiciable) and Part.',
          misconception: 'Students often believe the 73rd Amendment "created" Panchayats in India.',
          parts: [
                { id: 'a', prompt: 'A state government passes a law postponing Panchayat elections by two years citing "financial constraints." Using the 73rd Amendment, explain whether this.', answer: 'Not permissible',
                  options: ['Not permissible', 'state government\'s administrative powers', 'created', 'the 73rd Amendment "created" Panchayats in India'],
                  hint: 'Revisit the difference between Article 40 (Directive Principle, non-justiciable) and Part.',
                  misconception: 'Students often believe the 73rd Amendment "created" Panchayats in India.' }
          ],
            remediations: { 'the-73rd-amendment-created-panchayats': { steps: ['If the student conflates "creation" with "constitutionalisation," have them compare two timelines: (1) Pre-1993: State.', '(2) Post-1993: Constitution Part IX (mandatory framework, amendable only by Parliament + half states, fixed five-year.', 'Use the Rajasthan 1995 dissolution case (where the state government tried to supersede Panchayats but was stopped.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_17_004', difficulty: 'standard',
          question: 'The Three-tier Panchayati Raj system is a constitutionally mandated (Article.',
          hint: 'Revisit Article 243B (three-tier mandate), Article 243C (composition), Article 243E.',
          misconception: 'Students often think the three tiers operate in a strict hierarchical command chain where Zilla Parishad gives orders.',
          parts: [
                { id: 'a', prompt: 'A Gram Panchayat wants to build a community hall but the land belongs to the Forest Department.', answer: 'The Gram Panchayat should approach the Panchayat Samiti (block level)',
                  options: ['The Gram Panchayat should approach the Panchayat Samiti (block level)', 'go directly to Zilla Parishad', 'contact the MLA'],
                  hint: 'Revisit Article 243B (three-tier mandate), Article 243C (composition), Article 243E (duration), and.',
                  misconception: 'Students often think the three tiers operate in a strict hierarchical command chain where Zilla Parishad gives orders to Panchayat Samiti.' }
          ],
            remediations: { 'the-three-tiers-operate-in': { steps: ['Re-read Article 243B and the Eleventh Schedule (Article 243G) to list functions tier-wise.', 'Create a three-column table (Village, Block, District) and map 5-6 functions from the Eleventh Schedule to each tier.', 'Watch a 10-minute video of a Gram Panchayat meeting (e.g., from the Ministry of Panchayati Raj\'s YouTube channel).', 'Explain to a peer why the Sarpanch does not take orders from the Block Development Officer (BDO) — the BDO is a State.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_17_005', difficulty: 'standard',
          question: 'The Gram Sabha is the constitutionally mandated general body of all registered.',
          hint: 'Revisit Article 243(b) definition of Gram Sabha and Article 243A (powers/functions).',
          misconception: 'Students often believe the Gram Sabha is just a "meeting" called by the Sarpanch, and that the Sarpanch *is* the Gram.',
          parts: [
                { id: 'a', prompt: 'Why did the Constitution makers choose to make Gram Sabha a permanent, indissoluble body while the Gram Panchayat has a fixed five-year term and can.', answer: 'The Gram Sabha represents the sovereign will of the people at the grassroots',
                  options: ['The Gram Sabha represents the sovereign will of the people at the grassroots', 'dissolved', 'meeting'],
                  hint: 'Revisit Article 243(b) definition of Gram Sabha and Article 243A (powers/functions) in the 73rd.',
                  misconception: 'Students often believe the Gram Sabha is just a "meeting" called by the Sarpanch, and that the Sarpanch *is* the Gram Sabha.' },
                { id: 'b', prompt: 'In a village with 1,200 registered voters, the Gram Sabha meeting for MGNREGA social audit is attended by 85 people.', answer: 'No, it is not correct',
                  options: ['No, it is not correct', 'meeting'],
                  hint: 'Revisit Article 243(b) definition of Gram Sabha and Article 243A (powers/functions) in the 73rd.',
                  misconception: 'Students often believe the Gram Sabha is just a "meeting" called by the Sarpanch, and that the Sarpanch *is* the Gram Sabha.' },
                { id: 'c', prompt: 'Compare the functional relationship between Gram Sabha and Gram Panchayat with that between Lok Sabha and Council of Ministers at the Union level.', answer: 'Similarities: (1) Both Gram Sabha/Lok Sabha are the popular sovereign bodies',
                  options: ['Similarities: (1) Both Gram Sabha/Lok Sabha are the popular sovereign bodies', 'meeting'],
                  hint: 'Revisit Article 243(b) definition of Gram Sabha and Article 243A (powers/functions) in the 73rd.',
                  misconception: 'Students often believe the Gram Sabha is just a "meeting" called by the Sarpanch, and that the Sarpanch *is* the Gram Sabha.' }
          ],
            remediations: { 'the-gram-sabha-is-just': { steps: ['If a student holds this misconception, have them: (1) Read Article 243(b) and 243A side-by-side — highlight "body.', 'The Sarpanch refuses to call a meeting for social audit.', 'What does the Act say you must do?" (Answer: Section 3 of most State Panchayat Acts mandates Secretary to convene.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_17_006', difficulty: 'standard',
          question: 'The 74th Constitutional Amendment Act, 1992 (effective 1993) inserted Part IXA.',
          hint: 'Revisit c11_ps_cbse_17_003 focusing on: (1) three-tier vs. single-tier (urban) structure.',
          misconception: 'Students often believe the 74th Amendment *automatically* created municipalities with all 18 functions, reserved seats.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The 74th Constitutional Amendment Act, 1992 (effective 1993) inserted Part IXA (Articles',
                  options: ['The 74th Constitutional Amendment Act, 1992 (effective 1993) inserted Part IXA (Articles', 'Local government refers to the governance structures at the village, town, and city', 'The evolution of local government in India traces the historical trajectory from Lord', 'The 73rd Constitutional Amendment Act, 1992 (effective 1993) inserted Part IX (Articles'],
                  hint: 'Revisit c11_ps_cbse_17_003 focusing on: (1) three-tier vs. single-tier (urban) structure, (2) Gram.',
                  misconception: 'Students often believe the 74th Amendment *automatically* created municipalities with all 18 functions, reserved seats, and independent.' }
          ],
            remediations: { 'the-74th-amendment-automatically-created': { steps: ['Read Article 243W and the Twelfth Schedule side-by-side; note the word "may" in 243W versus the list in the Schedule.', 'Check your state\'s Municipal Act (e.g., Uttar Pradesh Municipal Corporation Act, 1959 as amended post-1994) to see.', 'Verify whether your city has a Ward Committee (if population >3 lakh) and whether it meets monthly.', 'Find the latest State Finance Commission report for your state—was it constituted on time?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
