import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch09_p1: SimDef = {
    id: 'v3_c12_soc_ch09_p1',
    title: 'Cultural Change · Part 1/2',
    subtitle: 'New phone, old rules — which change actually counts?',
    classLevel: 12, subject: 'sociology', topic: 'Cultural Change · Part 1/2',
    chapters: ['c12_soc_ch09'],
    nodeIds: ['c12_soc_cbse_09_001', 'c12_soc_cbse_09_002', 'c12_soc_cbse_09_003', 'c12_soc_cbse_09_004', 'c12_soc_cbse_09_005', 'c12_soc_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Social change analyst', intro: 'Technology moves faster than values — sociology\'s job is telling the two apart.', goal: 'Distinguish modernisation from westernisation and analyse India\'s domain-specific, colonial-shaped path to modernity.' },
    discovery: {
        question: 'A Dalit officer clears the civil services on merit, works in a rule-bound bureaucracy — then marries within his sub-caste after a priest matches horoscopes. Modernised or not?',
        options: ['Partially — modernisation is domain-specific: the same person can run on achieved identity at work and ascribed identity at home', 'Fully — an elite job makes you modern', 'Not at all — arranged marriage cancels it', 'He\'s westernised, not modernised'],
        answer: 'Partially — modernisation is domain-specific: the same person can run on achieved identity at work and ascribed identity at home',
        hook: 'Jeans, English and a Christmas tree are westernisation — borrowed forms. Modernisation is deeper: rationality, universalism, the individual over the group. A household can have air-conditioning and dowry in the same room — forms without values.',
    },
    teaching: [
        { title: 'Modernisation as a Process of Cultural Change: Definition and Features', text: 'Modernisation is a sociological process of cultural change where traditional, local, and parochial orientations are replaced by universal commitments, scientific rationality, individualism.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort real lives — the tractor village, the IT professional, the khap WhatsApp group — into modernisation, westernisation and tradition armed with new tech.',
        labels: ['Modernisation as a Process', 'Sanskritisation: M.N. Srinivas\'s Concept', 'Critiques of Sanskritisation: Conservative,', 'Westernisation: Srinivas\'s Concept', 'The Relationship Between Sanskritisation', 'Secularisation: Definition, the Decline'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_09_001', title: 'Modernisation as a Process of Cultural Change: Definition and Features',
          caseStudy: { intro: 'Imagine a young woman from a traditional weaving family in Varanasi who gets a B.Tech degree, works in a Bangalore IT firm, chooses her own partner via.',
            decisions: [{ prompt: 'Define modernisation in sociological terms using any three features from Rudolph and Rudolph\'s conceptualisation.', options: [
                { text: 'Modernisation is the process where local/parochial ties give way to universal commitments', outcome: 'Modernisation is the process where local/parochial ties give way to universal commitments.' },
                { text: 'wearing jeans, using smartphones, speaking English', outcome: 'Not quite — Students equate modernisation with "becoming like the West" — wearing Western clothes, speaking.', reveals: 'students-equate-modernisation-with-becoming' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_09_002', title: 'Sanskritisation: M.N. Srinivas\'s Concept and Its Mechanisms',
          caseStudy: { intro: 'Imagine a village in Karnataka where a community traditionally engaged in toddy tapping decides to stop consuming alcohol, adopt vegetarianism, wear the sacred.',
            decisions: [{ prompt: 'Define Sanskritisation in M.N. Srinivas\'s own words, specifying the reference group and the typical direction of cultural emulation.', options: [
                { text: 'Sanskritisation is the process by', outcome: 'Sanskritisation is the process by which a low caste or tribe takes over the customs, rituals.' },
                { text: 'any lower group copies any higher group', outcome: 'Not quite — Students often think Sanskritisation is simply "lower castes copying Brahmins" and that it leads.', reveals: 'sanskritisation-is-simply-lower-castes' },
                { text: 'lower castes copying Brahmins', outcome: 'Not quite — Students often think Sanskritisation is simply "lower castes copying Brahmins" and that it leads.', reveals: 'sanskritisation-is-simply-lower-castes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_09_003', title: 'Critiques of Sanskritisation: Conservative, Pernicious and Overemphasis on Caste',
          caseStudy: { intro: 'Imagine a Dalit family in a village that stops eating meat, adopts vegetarianism, wears the sacred thread, and builds a temple — yet is still barred from the.',
            decisions: [{ prompt: 'State the textbook\'s first critique of Sanskritisation regarding social mobility in one sentence.', options: [
                { text: 'Correct answer: Sanskritisation leads to no structural change but only positional change', outcome: 'Correct answer: Sanskritisation leads to no structural change but only positional change of some.' },
                { text: 'Sanskritisation allows lower castes to become upper castes', outcome: 'Not quite — Students often believe that **critiques of Sanskritisation mean the process itself does not happen.', reveals: 'critiques-of-sanskritisation-mean-the' },
                { text: 'Sanskritisation is criticised, so it is not a real process', outcome: 'Not quite — Students often believe that **critiques of Sanskritisation mean the process itself does not happen.', reveals: 'critiques-of-sanskritisation-mean-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_09_004', title: 'Westernisation: Srinivas\'s Concept and Its Different Forms',
          caseStudy: { intro: 'Imagine a family in urban India where the grandfather wears a dhoti-kurta, reads Sanskrit texts, and performs daily puja, while his grandson wears jeans.',
            decisions: [{ prompt: 'State M.N. Srinivas\'s exact definition of westernisation as given in the NCERT textbook.', options: [
                { text: 'Srinivas defines westernisation as "the changes brought about in Indian society and', outcome: 'Srinivas defines westernisation as "the changes brought about in Indian society and culture as.' },
                { text: 'A wrong answer that only mentions', outcome: 'Not quite — Students commonly equate westernisation with modernisation, assuming that wearing Western clothes.', reveals: 'students-commonly-equate-westernisation-with' },
                { text: 'A student who writes', outcome: 'Not quite — Students commonly equate westernisation with modernisation, assuming that wearing Western clothes.', reveals: 'students-commonly-equate-westernisation-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_09_006', title: 'Secularisation: Definition, the Decline of Religion and Its Relevance in India',
          caseStudy: { intro: 'Begin by asking: "If India is becoming more modern — with smartphones, metros, and multinational companies — why do we see *more* religious TV channels, bigger.',
            decisions: [{ prompt: 'According to the classical secularisation thesis discussed in the textbook, what is the expected relationship between modernisation and.', options: [
                { text: 'The classical thesis assumes that as societies modernise (industrialise, urbanise, adopt', outcome: 'The classical thesis assumes that as societies modernise (industrialise, urbanise, adopt scientific.' },
                { text: 'modernisation strengthens religion', outcome: 'Not quite — Students consistently confuse **secularisation** (a sociological process of religion losing.', reveals: 'students-consistently-confuse-secularisation-a' },
                { text: 'secularisation means the state bans religion', outcome: 'Not quite — Students consistently confuse **secularisation** (a sociological process of religion losing.', reveals: 'students-consistently-confuse-secularisation-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A village community that prospered from a cooperative dairy adopts vegetarianism, Sanskritised rituals and new surnames, announcing \'we\'ve ended caste for ourselves — status achieved.\'',
            decisions: [{ prompt: 'What does Sanskritisation say about this claim?', options: [
                { text: 'It\'s positional mobility, not structural change — emulating the locally dominant caste\'s customs may raise this group\'s rank, but it operates inside the hierarchy it borrows from: the ladder stays, the group climbs a rung; \'ending caste\' would be abolishing the ranking itself.', outcome: 'The chapter\'s critique: Sanskritisation changes who occupies a position, never the system of positions — success within caste is not the end of caste.' },
                { text: 'The claim stands — adopting higher-caste ways makes you higher-caste, dissolving the boundary.', outcome: 'The emulation presumes the hierarchy it\'s climbing — the new practices are valued because they mark rank; the Kumud Pawade lesson is that the community\'s caste identity persists despite cultural adoption.', reveals: 'emulation-equals-equality' },
                { text: 'It only counts if the model is Brahmins — copying a dominant non-Brahmin caste isn\'t Sanskritisation.', outcome: 'The reference is the locally dominant caste, not Brahmins always — Srinivas\'s de-Sanskritisation covers lower groups adopting non-Sanskritic dominant-caste ways; the mechanism is dominance-following, not Brahmin-following.', reveals: 'only-brahmin-model-counts' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now separate structural change from costume change — and explain why India modernised without becoming a copy of the West.',
            decisions: [{ prompt: 'What comes next? Cultural Change · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Cultural Change · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_001', difficulty: 'standard',
          question: 'Modernisation is a sociological process of cultural change where traditional.',
          hint: 'Revisit Class 11 Chapter 4 (Culture) nodes c11_soc_cbse_04_001 and c11_soc_cbse_04_002.',
          misconception: 'Students equate modernisation with "becoming like the West" — wearing Western clothes, speaking English, eating pizza.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "achieved vs. ascribed identity" to analyse this situation: A Dalit student clears UPSC, becomes an IAS officer, but his marriage is still.', answer: 'Partial modernisation',
                  options: ['Partial modernisation', 'fully modernised', 'not modernised because arranged marriage'],
                  hint: 'Revisit Class 11 Chapter 4 (Culture) nodes c11_soc_cbse_04_001 and c11_soc_cbse_04_002 for culture.',
                  misconception: 'Students equate modernisation with "becoming like the West" — wearing Western clothes, speaking English, eating pizza, celebrating.' },
                { id: 'b', prompt: 'Compare and contrast modernisation and westernisation using the example of a middle-class family in Delhi that: (a) uses a washing machine, (b) celebrates.', answer: 'uses a washing machine, (',
                  options: ['uses a washing machine, (', 'A wrong answer classifying all four as'],
                  hint: 'Revisit Class 11 Chapter 4 (Culture) nodes c11_soc_cbse_04_001 and c11_soc_cbse_04_002 for culture.',
                  misconception: 'Students equate modernisation with "becoming like the West" — wearing Western clothes, speaking English, eating pizza, celebrating.' }
          ],
            remediations: { 'students-equate-modernisation-with-becoming': { steps: ['If the student conflates modernisation with westernisation: Step 1 — Have them re-read Rudolph & Rudolph\'s 7 features.', 'Step 2 — Give two columns: "Modernisation (values/structure)" vs "Westernisation (forms/culture)".', 'Step 3 — Practice classifying 10 practices (e.g., love marriage, jeans, RTI filing, Diwali LED lights, women in combat.', 'Step 4 — Ask: "Can a society be modernised but not westernised?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_002', difficulty: 'standard',
          question: 'Sanskritisation is the process by which a lower caste, tribe, or other group.',
          hint: 'If stuck, revisit Class 11 Sociology Chapter 3 (Social Institutions) node.',
          misconception: 'Students often think Sanskritisation is simply "lower castes copying Brahmins" and that it leads to *caste mobility*.',
          parts: [
                { id: 'a', prompt: 'Define Sanskritisation in M.N. Srinivas\'s own words, specifying the reference group and the typical direction of cultural emulation.', answer: 'Sanskritisation is the process by',
                  options: ['Sanskritisation is the process by', 'any lower group copies any higher group', 'lower castes copying Brahmins'],
                  hint: 'If stuck, revisit Class 11 Sociology Chapter 3 (Social Institutions) node c11_soc_cbse_03_003.',
                  misconception: 'Students often think Sanskritisation is simply "lower castes copying Brahmins" and that it leads to *caste mobility* (the caste itself.' },
                { id: 'b', prompt: 'In a region where a non-Sanskritic dominant caste (e.g., Lingayats in parts of Karnataka) sets the cultural tone, lower groups adopt Lingayat practices instead.', answer: 'Srinivas calls this **de-Sanskritisation**',
                  options: ['Srinivas calls this **de-Sanskritisation**', 'lower castes copying Brahmins'],
                  hint: 'If stuck, revisit Class 11 Sociology Chapter 3 (Social Institutions) node c11_soc_cbse_03_003.',
                  misconception: 'Students often think Sanskritisation is simply "lower castes copying Brahmins" and that it leads to *caste mobility* (the caste itself.' },
                { id: 'c', prompt: 'Compare the mechanisms of Sanskritisation and Westernisation in terms of (a) the reference group, (b) the domain of change, and (c) the structural outcome.', answer: 'the reference group, (',
                  options: ['the reference group, (', 'modernisation', 'lower castes copying Brahmins'],
                  hint: 'If stuck, revisit Class 11 Sociology Chapter 3 (Social Institutions) node c11_soc_cbse_03_003.',
                  misconception: 'Students often think Sanskritisation is simply "lower castes copying Brahmins" and that it leads to *caste mobility* (the caste itself.' }
          ],
            remediations: { 'sanskritisation-is-simply-lower-castes': { steps: ['Re-read the NCERT definition (p.', '20) and underline "twice-born (dwija) caste" and "customs, ritual, beliefs, ideology and style of life".', 'Watch the 5-min video "M.N.', 'Srinivas on Sanskritisation" (NCERT official) to hear the distinction between positional and structural change.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Sanskritisation is simply "lower castes copying Brahmins" and that it leads to *caste mobility*.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the statement: "Sanskritisation empowers lower castes by allowing them to rise in the hierarchy." Use the Kumud Pawade example and the.', answer: 'The statement is partially true but sociologically misleading',
                  options: ['The statement is partially true but sociologically misleading', 'empowerment', 'lower castes copying Brahmins'],
                  hint: 'If stuck, revisit Class 11 Sociology Chapter 3 (Social Institutions) node c11_soc_cbse_03_003.',
                  misconception: 'Students often think Sanskritisation is simply "lower castes copying Brahmins" and that it leads to *caste mobility* (the caste itself.' }
          ],
            remediations: { 'sanskritisation-is-simply-lower-castes': { steps: ['Re-read the NCERT definition (p.', '20) and underline "twice-born (dwija) caste" and "customs, ritual, beliefs, ideology and style of life".', 'Watch the 5-min video "M.N.', 'Srinivas on Sanskritisation" (NCERT official) to hear the distinction between positional and structural change.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_003', difficulty: 'standard',
          question: 'Critiques of Sanskritisation refer to the sociological arguments that challenge.',
          hint: 'Revisit the definition and the Kumud Pawade case study in node c12_soc_cbse_09_002; focus.',
          misconception: 'Students often believe that **critiques of Sanskritisation mean the process itself does not happen or is "false."**.',
          parts: [
                { id: 'a', prompt: 'A dominant OBC community in a region abandons its traditional bride-price system and adopts dowry after Sanskritising.', answer: 'Correct answer: The fourth critique states Sanskritisation leads to adoption of',
                  options: ['Correct answer: The fourth critique states Sanskritisation leads to adoption of', 'dowry is bad', 'Sanskritisation is criticised, so it is not a real process'],
                  hint: 'Revisit the definition and the Kumud Pawade case study in node c12_soc_cbse_09_002; focus on the.',
                  misconception: 'Students often believe that **critiques of Sanskritisation mean the process itself does not happen or is "false."** They write.' }
          ],
            remediations: { 'critiques-of-sanskritisation-mean-the': { steps: ['If a student conflates critique with denial: (1) Ask them to reread the Kumud Pawade excerpt (NCERT p.21) — does her.', '(2) Have them list three real-world examples of Sanskritisation they observe (e.g., meat-eating communities turning.', '(3) Then map each critique to those examples: "Does this example show positional change?', 'Does it involve adopting dowry?" This concretises the critiques as analytical lenses, not debunking tools.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_004', difficulty: 'standard',
          question: 'Westernisation, as conceptualised by M.N. Srinivas, refers to the changes.',
          hint: 'If stuck, revisit Class 11 Sociology Chapter 4 (Culture and Socialisation), specifically.',
          misconception: 'Students commonly equate westernisation with modernisation, assuming that wearing Western clothes, using technology,.',
          parts: [
                { id: 'a', prompt: 'A family in Delhi lives in a bungalow with Western furniture, uses smartphones, eats pizza on weekends, and sends children to an English-medium school.', answer: 'The family exhibits the second form of westernisation',
                  options: ['The family exhibits the second form of westernisation', 'A student who writes'],
                  hint: 'If stuck, revisit Class 11 Sociology Chapter 4 (Culture and Socialisation), specifically the nodes.',
                  misconception: 'Students commonly equate westernisation with modernisation, assuming that wearing Western clothes, using technology, or speaking English.' }
          ],
            remediations: { 'students-commonly-equate-westernisation-with': { steps: ['If the student conflates westernisation with modernisation, do this 3-step remediation: (1) Have them re-read the NCERT.', '(2) Ask them to create a 2x2 matrix: Rows = Westernised (Yes/No), Columns = Modern Values (Yes/No); fill each cell with.', '(3) Give a fresh case: "A village installs solar panels (Western tech) but uses them to power a caste-based water.', 'This forces the distinction between material adoption and value internalisation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_005', difficulty: 'standard',
          question: 'The relationship between Sanskritisation and Westernisation refers to the.',
          hint: 'Revisit c12_soc_cbse_09_002 and c12_soc_cbse_09_004 definitions; create flashcards with.',
          misconception: 'Students treat Sanskritisation and Westernisation as mutually exclusive, linear stages: first a group Sanskritises.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The relationship between Sanskritisation and Westernisation refers to the complex, often',
                  options: ['The relationship between Sanskritisation and Westernisation refers to the complex, often', 'Modernisation is a sociological process of cultural change where traditional, local, and', 'Sanskritisation is the process by which a lower caste, tribe, or other group adopts the', 'Critiques of Sanskritisation refer to the sociological arguments that challenge M.N'],
                  hint: 'Revisit c12_soc_cbse_09_002 and c12_soc_cbse_09_004 definitions; create flashcards with Srinivas\'s.',
                  misconception: 'Students treat Sanskritisation and Westernisation as mutually exclusive, linear stages: first a group Sanskritises, then it Westernises.' }
          ],
            remediations: { 'students-treat-sanskritisation-and-westernisatio': { steps: ['If the student cannot distinguish domain-specific coexistence from linear progression: (1) Re-read c12_soc_cbse_09_002.', '(2) Create a 2x2 matrix: rows = domains (ritual, dress, language, gender, technology), columns = generations; fill with.', '(3) Re-attempt Diagnostic Question 3.', 'If still stuck, revisit c11_soc_cbse_04_008 (Cultural Change mechanisms) for the \'evolutionary vs revolutionary\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_006', difficulty: 'standard',
          question: 'Secularisation is the sociological process through which religion loses its.',
          hint: 'Revisit c11_soc_cbse_03_005 (Religion as a Social Institution) to recall the.',
          misconception: 'Students consistently confuse **secularisation** (a sociological process of religion losing authority over.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secularisation is the sociological process through',
                  options: ['Secularisation is the sociological process through', 'Modernisation is a sociological process of cultural change where traditional, local, and', 'Sanskritisation is the process by which a lower caste, tribe, or other group adopts the', 'Critiques of Sanskritisation refer to the sociological arguments that challenge M.N'],
                  hint: 'Revisit c11_soc_cbse_03_005 (Religion as a Social Institution) to recall the sacred/profane.',
                  misconception: 'Students consistently confuse **secularisation** (a sociological process of religion losing authority over non-religious spheres) with.' }
          ],
            remediations: { 'students-consistently-confuse-secularisation-a': { steps: ['If a student conflates the two concepts: (1) Have them create a two-column table: Column A = "Secularism (Political.', '(2) Assign the Activity 2.6 from the textbook (matrimonial column analysis) — this forces them to see caste.', '(3) Re-diagnostic: Ask them to explain why a lavish wedding with 50 cars is an example of *secularisation of ritual*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
