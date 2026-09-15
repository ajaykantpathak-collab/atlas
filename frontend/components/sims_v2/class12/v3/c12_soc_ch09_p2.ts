import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch09_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch09_p2: SimDef = {
    id: 'v3_c12_soc_ch09_p2',
    title: 'Cultural Change · Part 2/2',
    subtitle: 'New phone, old rules — which change actually counts?',
    classLevel: 12, subject: 'sociology', topic: 'Cultural Change · Part 2/2',
    chapters: ['c12_soc_ch09'],
    nodeIds: ['c12_soc_cbse_09_007', 'c12_soc_cbse_09_008', 'c12_soc_cbse_09_009', 'c12_soc_cbse_09_010', 'c12_soc_cbse_09_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Social change analyst', intro: 'Technology moves faster than values — sociology\'s job is telling the two apart.', goal: 'Distinguish modernisation from westernisation and analyse India\'s domain-specific, colonial-shaped path to modernity.' },
    discovery: {
        question: 'A Dalit officer clears the civil services on merit, works in a rule-bound bureaucracy — then marries within his sub-caste after a priest matches horoscopes. Modernised or not?',
        options: ['Partially — modernisation is domain-specific: the same person can run on achieved identity at work and ascribed identity at home', 'Fully — an elite job makes you modern', 'Not at all — arranged marriage cancels it', 'He\'s westernised, not modernised'],
        answer: 'Partially — modernisation is domain-specific: the same person can run on achieved identity at work and ascribed identity at home',
        hook: 'Jeans, English and a Christmas tree are westernisation — borrowed forms. Modernisation is deeper: rationality, universalism, the individual over the group. A household can have air-conditioning and dowry in the same room — forms without values.',
    },
    teaching: [
        { title: 'Westernisation and the New Values: Rationalism, Humanism and Individualism', text: 'Westernisation, as defined by M.N. Srinivas, refers to the changes in Indian society and culture resulting from over 150 years of British rule, encompassing technology, institutions, ideology, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort real lives — the tractor village, the IT professional, the khap WhatsApp group — into modernisation, westernisation and tradition armed with new tech.',
        labels: ['Westernisation and the New', 'The Impact of Colonial', 'Cultural Change Through Social', 'The Role of', 'Contemporary Cultural Change: Consumerism,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_09_007', title: 'Westernisation and the New Values: Rationalism, Humanism and Individualism',
          caseStudy: { intro: 'Begin with a familiar scenario: "You see a family living in a high-rise apartment with modular kitchen, smart TV, and western clothes — yet they consult.',
            decisions: [{ prompt: 'Define westernisation according to M.N. Srinivas, and list the three \'new values\' the NCERT identifies as its cognitive-normative core.', options: [
                { text: 'Correct answer: Westernisation is "the changes brought about in Indian society and', outcome: 'Correct answer: Westernisation is "the changes brought about in Indian society and culture as.' },
                { text: 'wearing western clothes', outcome: 'Not quite — Students consistently equate westernisation with *lifestyle markers* (clothes, food, English.', reveals: 'students-consistently-equate-westernisation-with' },
                { text: 'using technology', outcome: 'Not quite — Students consistently equate westernisation with *lifestyle markers* (clothes, food, English.', reveals: 'students-consistently-equate-westernisation-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_09_008', title: 'The Impact of Colonial Rule on Indian Culture: Orientalist and Anglicist Positions',
          caseStudy: { intro: 'Imagine you are Raja Ram Mohun Roy in 1818, witnessing a sati ritual. You oppose it, but the orthodox Dharma Sabha cites Manusmriti to defend it.',
            decisions: [{ prompt: 'Identify the two intellectual traditions that 19th-century Indian social reformers combined to challenge practices like sati and widow.', options: [
                { text: 'The two traditions are: (1) Indigenous textual traditions (Hindu shastras, Islamic', outcome: 'The two traditions are: (1) Indigenous textual traditions (Hindu shastras, Islamic Quran/Hadith.' },
                { text: 'Western education', outcome: 'Not quite — Students often think "Orientalist = conservative, Anglicist = progressive" and map reformers.', reveals: 'orientalist-conservative' },
                { text: 'tradition', outcome: 'Not quite — Students often think "Orientalist = conservative, Anglicist = progressive" and map reformers.', reveals: 'orientalist-conservative' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_09_010', title: 'The Role of the State in Cultural Change: Education, Law and Social Legislation',
          caseStudy: { intro: 'Imagine a 16-year-old girl in a rural village in 1950 — she is married, pulled out of school, and expected to manage a household.',
            decisions: [{ prompt: 'What is the constitutional basis for the Indian state\'s intervention in cultural practices like untouchability and child marriage?', options: [
                { text: 'The constitutional basis lies in Fundamental Rights (Articles 17, 21, 23, 24) and', outcome: 'The constitutional basis lies in Fundamental Rights (Articles 17, 21, 23, 24) and Directive.' },
                { text: 'laws passed by Parliament', outcome: 'Not quite — Students often believe that passing a law (e.g., banning dowry, child marriage, untouchability).', reveals: 'passing-a-law-e' },
                { text: 'passing a law (e', outcome: 'Not quite — Students often believe that passing a law (e.g., banning dowry, child marriage, untouchability).', reveals: 'passing-a-law-e' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A village community that prospered from a cooperative dairy adopts vegetarianism, Sanskritised rituals and new surnames, announcing \'we\'ve ended caste for ourselves — status achieved.\'',
            decisions: [{ prompt: 'What does Sanskritisation say about this claim?', options: [
                { text: 'It\'s positional mobility, not structural change — emulating the locally dominant caste\'s customs may raise this group\'s rank, but it operates inside the hierarchy it borrows from: the ladder stays, the group climbs a rung; \'ending caste\' would be abolishing the ranking itself.', outcome: 'The chapter\'s critique: Sanskritisation changes who occupies a position, never the system of positions — success within caste is not the end of caste.' },
                { text: 'The claim stands — adopting higher-caste ways makes you higher-caste, dissolving the boundary.', outcome: 'The emulation presumes the hierarchy it\'s climbing — the new practices are valued because they mark rank; the Kumud Pawade lesson is that the community\'s caste identity persists despite cultural adoption.', reveals: 'emulation-equals-equality' },
                { text: 'It only counts if the model is Brahmins — copying a dominant non-Brahmin caste isn\'t Sanskritisation.', outcome: 'The reference is the locally dominant caste, not Brahmins always — Srinivas\'s de-Sanskritisation covers lower groups adopting non-Sanskritic dominant-caste ways; the mechanism is dominance-following, not Brahmin-following.', reveals: 'only-brahmin-model-counts' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_09_011', title: 'You made it',
          caseStudy: { intro: 'You can now separate structural change from costume change — and explain why India modernised without becoming a copy of the West.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_007', difficulty: 'standard',
          question: 'Westernisation, as defined by M.N. Srinivas, refers to the changes in Indian.',
          hint: 'Revisit node 004 (Srinivas\'s definition) and node 001 (modernisation vs westernisation).',
          misconception: 'Students consistently equate westernisation with *lifestyle markers* (clothes, food, English language, technology) and.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the Renaissance humanism studied in Class 11 History (c11_hist_cbse_07_002) with the humanism that emerged as a \'new value\' in Indian.', answer: 'Correct comparison: Similarity',
                  options: ['Correct comparison: Similarity', 'modern thinking', 'Westernisation means wearing jeans and using smartphones', 'imitation of external forms'],
                  hint: 'Revisit node 004 (Srinivas\'s definition) and node 001 (modernisation vs westernisation).',
                  misconception: 'Students consistently equate westernisation with *lifestyle markers* (clothes, food, English language, technology) and treat rationalism.' }
          ],
            remediations: { 'students-consistently-equate-westernisation-with': { steps: ['If a student gives the lifestyle-only definition: (1) Ask them to re-read Srinivas\'s exact definition in NCERT para 2.', 'The technology serves the tradition — that is the paradox.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently equate westernisation with *lifestyle markers* (clothes, food, English language, technology) and.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Rationalism in westernisation simply means using scientific technology in daily life." Use the NCERT\'s distinction between \'scientific.', answer: 'Correct critique: The statement confuses instrumental rationality (using tools',
                  options: ['Correct critique: The statement confuses instrumental rationality (using tools', 'modern thinking', 'Westernisation means wearing jeans and using smartphones', 'imitation of external forms'],
                  hint: 'Revisit node 004 (Srinivas\'s definition) and node 001 (modernisation vs westernisation).',
                  misconception: 'Students consistently equate westernisation with *lifestyle markers* (clothes, food, English language, technology) and treat rationalism.' },
                { id: 'b', prompt: 'Construct a new, original example (not from NCERT) of a social practice that demonstrates westernisation of *form* without westernisation of *values*.', answer: 'Good answer example: A corporate law firm in Mumbai has open-plan offices, uses',
                  options: ['Good answer example: A corporate law firm in Mumbai has open-plan offices, uses', 'modern thinking', 'Westernisation means wearing jeans and using smartphones', 'imitation of external forms'],
                  hint: 'Revisit node 004 (Srinivas\'s definition) and node 001 (modernisation vs westernisation).',
                  misconception: 'Students consistently equate westernisation with *lifestyle markers* (clothes, food, English language, technology) and treat rationalism.' }
          ],
            remediations: { 'students-consistently-equate-westernisation-with': { steps: ['If a student gives the lifestyle-only definition: (1) Ask them to re-read Srinivas\'s exact definition in NCERT para 2.', 'The technology serves the tradition — that is the paradox.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_008', difficulty: 'standard',
          question: 'The Orientalist-Anglicist debate refers to the 19th-century colonial policy.',
          hint: 'Revisit c11_soc_cbse_10_002 (Colonial Context and the Specificity of Indian Modernity).',
          misconception: 'Students often think "Orientalist = conservative, Anglicist = progressive" and map reformers neatly: Roy = Anglicist.',
          parts: [
                { id: 'a', prompt: 'Explain why the Dharma Sabha petitioned the British against the abolition of sati, despite being orthodox Hindus who typically resisted colonial interference.', answer: 'The Dharma Sabha petitioned the British',
                  options: ['The Dharma Sabha petitioned the British', 'they wanted to preserve tradition', 'Orientalist = conservative, Anglicist = progressive'],
                  hint: 'Revisit c11_soc_cbse_10_002 (Colonial Context and the Specificity of Indian Modernity) and.',
                  misconception: 'Students often think "Orientalist = conservative, Anglicist = progressive" and map reformers neatly: Roy = Anglicist, Dayanand.' },
                { id: 'b', prompt: 'Sir Syed Ahmed Khan argued for the compatibility of Quranic revelation with modern science and promoted *ijtihad* (free enquiry).', answer: 'Sir Syed\'s approach is a distinct synthesis, not a simple blend',
                  options: ['Sir Syed\'s approach is a distinct synthesis, not a simple blend', 'Orientalist = conservative, Anglicist = progressive'],
                  hint: 'Revisit c11_soc_cbse_10_002 (Colonial Context and the Specificity of Indian Modernity) and.',
                  misconception: 'Students often think "Orientalist = conservative, Anglicist = progressive" and map reformers neatly: Roy = Anglicist, Dayanand.' }
          ],
            remediations: { 'orientalist-conservative': { steps: ['If a student maps reformers into binary camps, do this: (1) Give them Box 2.1 from NCERT and ask: "For each reformer.', '(3) Ask: "If Roy was purely Anglicist, why did he learn Sanskrit and Persian?', 'If Dayanand was purely Orientalist, why did he use printing presses and public debates?" (4) Re-diagnostic: "Explain.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_009', difficulty: 'standard',
          question: 'Social reform movements in 19th and early 20th century India were organised.',
          hint: 'Re-read the "Modern Context" section in NCERT Chapter 2 (pages 16-18) and create.',
          misconception: 'Students often conflate all 19th-century reform movements into a single "Renaissance" narrative, assuming they shared.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Social reform movements in 19th and early 20th century India were organised collective',
                  options: ['Social reform movements in 19th and early 20th century India were organised collective', 'Modernisation is a sociological process of cultural change where traditional, local, and', 'Sanskritisation is the process by which a lower caste, tribe, or other group adopts the', 'Critiques of Sanskritisation refer to the sociological arguments that challenge M.N'],
                  hint: 'Re-read the "Modern Context" section in NCERT Chapter 2 (pages 16-18) and create a mind-map linking.',
                  misconception: 'Students often conflate all 19th-century reform movements into a single "Renaissance" narrative, assuming they shared identical goals.' }
          ],
            remediations: { 'students-often-conflate-all-19th': { steps: ['Revisit **c12_soc_cbse_09_008** (Impact of Colonial Rule) to re-ground the colonial context — without it, movements.', 'Create a three-column table: columns = Movement, Social Base (caste/class/region), Core Textual Strategy, Primary.', 'Fill it using NCERT Box 2.1 and the Phule/Vidyasagar/Dayanand descriptions.', 'Re-attempt Diagnostic Question 4 (compare social bases) and Question 5 (evaluate westernisation claim) using the table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_010', difficulty: 'standard',
          question: 'The role of the state in cultural change refers to the deliberate use of state.',
          hint: 'If stuck, revisit c11_ps_cbse_11_003 (Fundamental Rights) and c12_soc_cbse_09_006.',
          misconception: 'Students often believe that passing a law (e.g., banning dowry, child marriage, untouchability) automatically changes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The role of the state in cultural change refers to the deliberate use of state power',
                  options: ['The role of the state in cultural change refers to the deliberate use of state power', 'Modernisation is a sociological process of cultural change where traditional, local, and', 'Sanskritisation is the process by which a lower caste, tribe, or other group adopts the', 'Critiques of Sanskritisation refer to the sociological arguments that challenge M.N'],
                  hint: 'If stuck, revisit c11_ps_cbse_11_003 (Fundamental Rights) and c12_soc_cbse_09_006 (Secularisation).',
                  misconception: 'Students often believe that passing a law (e.g., banning dowry, child marriage, untouchability) automatically changes cultural behaviour.' }
          ],
            remediations: { 'passing-a-law-e': { steps: ['If the student equates legislation with cultural transformation: (1) Have them compare NFHS-5 data on child marriage.', '(3) Revisit c12_soc_cbse_09_006 (Secularisation) and c11_soc_cbse_03_008 (State and Sovereignty) to distinguish state.', '(4) Re-diagnose with DIAGNOSTIC_QUESTION_5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_011', difficulty: 'standard',
          question: 'Contemporary cultural change in India refers to the transformation.',
          hint: 'Revisit c12_soc_cbse_09_004 (Westernisation) and Activity 2.5 in NCERT — list 3 examples.',
          misconception: 'Students often equate the new middle class\'s cultural change with \'westernisation\' — assuming that consuming global.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Contemporary cultural change in India refers to the transformation of lifestyles, values,',
                  options: ['Contemporary cultural change in India refers to the transformation of lifestyles, values,', 'Modernisation is a sociological process of cultural change where traditional, local, and', 'Sanskritisation is the process by which a lower caste, tribe, or other group adopts the', 'Critiques of Sanskritisation refer to the sociological arguments that challenge M.N'],
                  hint: 'Revisit c12_soc_cbse_09_004 (Westernisation) and Activity 2.5 in NCERT — list 3 examples from your.',
                  misconception: 'Students often equate the new middle class\'s cultural change with \'westernisation\' — assuming that consuming global brands, speaking.' }
          ],
            remediations: { 'students-often-equate-the-new': { steps: ['If a student cannot distinguish westernisation (adoption of external forms) from modernisation (internalisation.', '(2) Assign a 2-column table: Column A = \'Visible global forms adopted\' (jeans, English, iPhone); Column.', 'Fill with 5 real examples from their neighbourhood.', '(3) Ask: "Which column reflects westernisation?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
