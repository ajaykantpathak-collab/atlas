import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch07_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch07_p2: SimDef = {
    id: 'v3_c11_soc_ch07_p2',
    title: 'Social Change and Social Order in Rural and Urban Contexts · Part 2/2',
    subtitle: 'Learn the difference between a fad and a restructuring.',
    classLevel: 11, subject: 'sociology', topic: 'Social Change and Social Order in Rural and Urban Contexts · Part 2/2',
    chapters: ['c11_soc_ch07'],
    nodeIds: ['c11_soc_cbse_07_007', 'c11_soc_cbse_07_008', 'c11_soc_cbse_07_009', 'c11_soc_cbse_07_010', 'c11_soc_cbse_07_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a change-tracker separating surface churn from deep shifts', intro: 'A new app is noise; a new institution is change — the test is whether the underlying structure had to move.', goal: 'Distinguish structural from surface change and classify by pace and nature together.' },
    discovery: {
        question: 'Smartphones, new slang, a viral fashion — is that \'social change\'?',
        options: ['Not yet — social change means structural transformation at scale; gadgets only count once they reorganise family, work or polity', 'Yes — any visible difference is social change', 'Yes — slang is society changing', 'Not yet — only revolutions count'],
        answer: 'Not yet — social change means structural transformation at scale; gadgets only count once they reorganise family, work or polity',
        hook: 'And \'revolutionary\' doesn\'t mean \'structural\' alone — the Green Revolution was both fast AND structural, while slow English-education reform quietly built universities and a civil service.',
    },
    teaching: [
        { title: 'Contestation, Crime and Violence as Challenges to Social Order', text: 'Contestation refers to broad forms of insistent disagreement with established norms, ranging from cultural dissent (counter-cultures) to political competition (elections) and protest against laws.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_07_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Classify the Green Revolution and the Bengal Renaissance by pace AND depth together, then check whether sociology arose only because Europe \'changed faster.\'',
        labels: ['Contestation, Crime and Violence', 'Rural Society: Features, Agrarian', 'MGNREGA and State-Led Rural', 'Urban Society: Emergence, Anonymity,', 'Urbanisation Trends and Social'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_07_007', title: 'Contestation, Crime and Violence as Challenges to Social Order',
          caseStudy: { intro: 'Imagine you\'re watching a news report: farmers protesting farm laws block highways (contestation), a journalist is arrested under UAPA for reporting on the.',
            decisions: [{ prompt: 'Define \'contestation\' as used in sociology and give one example each of cultural contestation and political contestation from contemporary.', options: [
                { text: 'Contestation is broad, insistent disagreement with prevailing social norms, not limited', outcome: 'Contestation is broad, insistent disagreement with prevailing social norms, not limited.' },
                { text: 'contestation means fighting', outcome: 'Not quite — Students conflate \'crime\' and \'violence\' as synonyms, and assume all contestation is illegal.', reveals: 'students-conflate-crime-and-violence' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_07_009', title: 'MGNREGA and State-Led Rural Development Programmes',
          caseStudy: { intro: 'Imagine a landless Dalit household in a Bihar village where the dominant caste landlord traditionally sets wages below the statutory minimum because.',
            decisions: [{ prompt: 'State the core legal entitlement that MGNREGA provides to a rural household, and name the level of government primarily responsible for its.', options: [
                { text: 'MGNREGA guarantees 100 days of wage employment per financial year to every rural', outcome: 'MGNREGA guarantees 100 days of wage employment per financial year to every rural household willing.' },
                { text: '200 days', outcome: 'Not quite — Students often think MGNREGA is just a \'cash transfer\' or \'free money\' scheme, ignoring that it.', reveals: 'mgnrega-is-just-a-cash' },
                { text: 'implemented by the District Collector alone', outcome: 'Not quite — Students often think MGNREGA is just a \'cash transfer\' or \'free money\' scheme, ignoring that it.', reveals: 'mgnrega-is-just-a-cash' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_07_010', title: 'Urban Society: Emergence, Anonymity, Housing, Slums and Gated Communities',
          caseStudy: { intro: 'Imagine standing at a busy metro station in Delhi at 8 AM: you see a domestic worker from a nearby slum cluster, a software engineer from a gated community.',
            decisions: [{ prompt: 'Define \'gated community\' in sociological terms and list two features that distinguish it from a regular residential colony.', options: [
                { text: 'A gated community is an affluent urban neighbourhood physically sealed off by walls,', outcome: 'A gated community is an affluent urban neighbourhood physically sealed off by walls, fences, and.' },
                { text: 'security guards', outcome: 'Not quite — Students conflate \'slums\' with \'poverty\' and \'gated communities\' with \'security\', treating them.', reveals: 'students-conflate-slums-with-poverty' },
                { text: 'high walls', outcome: 'Not quite — Students conflate \'slums\' with \'poverty\' and \'gated communities\' with \'security\', treating them.', reveals: 'students-conflate-slums-with-poverty' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_07_011', title: 'Urbanisation Trends and Social Change in Rural vs Urban Contexts',
          caseStudy: { intro: 'Imagine you are standing at a busy Metro station in Delhi at 8 AM – thousands of people from different castes, religions, and regions packed together.',
            decisions: [{ prompt: 'According to the 2011 Census, what percentage of India\'s population lived in urban areas, and how does this compare to the 1901 figure?', options: [
                { text: 'The 2011 Census recorded 37.7% urban population, up from slightly less than 11% in 1901', outcome: 'The 2011 Census recorded 37.7% urban population, up from slightly less than 11% in 1901.' },
                { text: 'urbanisation just means more people moving to cities', outcome: 'Not quite — Students often think "urbanisation just means more people moving to cities" and treat it as.', reveals: 'urbanisation-just-means-more-people' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a change-and-development seminar, a student calls smartphones \'social change, obviously\' and claims \'revolutionary change is always structural while slow change is always just ideas — and rapid change is how history always worked.\'',
            decisions: [{ prompt: 'How does sociology classify and delimit change?', options: [
                { text: 'Apply the two axes separately: pace (evolutionary vs revolutionary) and nature (structural vs ideational) are independent — the Green Revolution was revolutionary AND structural; the Bengal Renaissance was slow AND ideational. And \'change\' requires structural transformation at scale — smartphones count only when you name the restructured institution; for 99.9% of human history, structural change was negligible — rapid change is a recent anomaly.', outcome: 'He stops grading by speed and novelty: a change earns the name by reconfiguring institutions for large populations — pace and nature stay distinct axes.' },
                { text: 'Keep \'smartphones = social change\' — visible transformation is change.', outcome: 'Visibility isn\'t structurality: unless an underlying institution reorganised (family, labour, citizenship), it\'s surface modification, not social change.', reveals: 'visible-change-is-social-change' },
                { text: 'Keep the pace-equals-nature pairing — fast breaks structure, slow shifts values.', outcome: 'The axes cross freely: slow English education built universities and civil services (structural), while rapid feminist ideas can precede any institutional shift (ideational).', reveals: 'pace-equals-nature' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_07_011', title: 'You made it',
          caseStudy: { intro: 'Change becomes social change when it moves the furniture of institutions — not when it merely changes the wallpaper.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_007', difficulty: 'standard',
          question: 'Contestation refers to broad forms of insistent disagreement with established.',
          hint: 'Revisit c11_soc_cbse_07_006 (Domination, Authority and Legitimation) — specifically the.',
          misconception: 'Students conflate \'crime\' and \'violence\' as synonyms, and assume all contestation is illegal.',
          parts: [
                { id: 'a', prompt: 'Compare how \'gated communities\' in Indian cities and \'dominant caste\' control in villages both maintain social order through exclusion.', answer: 'Gated communities use *formal authority* (private security, resident welfare',
                  options: ['Gated communities use *formal authority* (private security, resident welfare', 'same thing'],
                  hint: 'Revisit c11_soc_cbse_07_006 (Domination, Authority and Legitimation) — specifically the distinction.',
                  misconception: 'Students conflate \'crime\' and \'violence\' as synonyms, and assume all contestation is illegal.' }
          ],
            remediations: { 'students-conflate-crime-and-violence': { steps: ['Ask student to define \'crime\' and \'violence\' in their own words.', 'Present the Gandhi Salt March case — "Was it a crime? Was it violence?', 'Introduce Weber\'s definition: "State = monopoly on *legitimate* violence." Ask: "When police arrest a protestor,.', 'Map a 2x2 matrix: Legal/Illegal vs. Violent/Non-violent. Place: Gandhi\'s march (Illegal, Non-violent), Police.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_008', difficulty: 'standard',
          question: 'Rural society in India is characterized by small, settled agricultural.',
          hint: 'Revisit Chapter 1 (Social Structure, Stratification and Social Processes) and Class 10.',
          misconception: 'Students often believe that \'dominant caste\' means the caste with the highest ritual status (Brahmins) in a village,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rural society in India is characterized by small, settled agricultural communities where',
                  options: ['Rural society in India is characterized by small, settled agricultural communities where', 'Social change refers to significant alterations in the underlying structure of', 'Social change can be classified by its **pace** into *evolutionary change* (slow,', 'The five sources of social change are the broad categorical causes that initiate'],
                  hint: 'Revisit Chapter 1 (Social Structure, Stratification and Social Processes) and Class 10 Civics.',
                  misconception: 'Students often believe that \'dominant caste\' means the caste with the highest ritual status (Brahmins) in a village, or that land reforms.' }
          ],
            remediations: { 'dominant-caste-means-the-caste': { steps: ['If a student holds this misconception, first ask them to list the castes they think are dominant in three different.', 'Then provide census/landholding data showing the actual dominant castes are intermediate.', 'Next, walk through the legal text of a typical Zamindari Abolition Act: highlight the definition of \'tenant\'.', 'Finally, have them read M.N.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_009', difficulty: 'standard',
          question: 'MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act, 2005) is.',
          hint: 'Revisit the section "Social Order and Social Change in Rural Areas" in the textbook.',
          misconception: 'Students often think MGNREGA is just a \'cash transfer\' or \'free money\' scheme, ignoring that it is a *work-guarantee*.',
          parts: [
                { id: 'a', prompt: 'State the core legal entitlement that MGNREGA provides to a rural household, and name the level of government primarily responsible for its implementation.', answer: 'MGNREGA guarantees 100 days of wage employment per financial year to every rural',
                  options: ['MGNREGA guarantees 100 days of wage employment per financial year to every rural', '200 days', 'implemented by the District Collector alone', 'MGNREGA gives free cash to the poor'],
                  hint: 'Revisit the section "Social Order and Social Change in Rural Areas" in the textbook (pages 38-40).',
                  misconception: 'Students often think MGNREGA is just a \'cash transfer\' or \'free money\' scheme, ignoring that it is a *work-guarantee* programme requiring.' },
                { id: 'b', prompt: 'In a village where the dominant caste controls the only irrigation source, landless labourers previously accepted 150/day (below the state minimum of 250).', answer: 'The landlord must now offer at least 250/day to attract workers',
                  options: ['The landlord must now offer at least 250/day to attract workers', 'landlords will ignore MGNREGA', 'MGNREGA gives free cash to the poor'],
                  hint: 'Revisit the section "Social Order and Social Change in Rural Areas" in the textbook (pages 38-40).',
                  misconception: 'Students often think MGNREGA is just a \'cash transfer\' or \'free money\' scheme, ignoring that it is a *work-guarantee* programme requiring.' }
          ],
            remediations: { 'mgnrega-is-just-a-cash': { steps: ['If a student conflates MGNREGA with cash transfers, ask them to list the *conditions* for receiving wages: (1).', 'Then contrast with a cash transfer (e.g., PM-KISAN) where no labour is required.', 'Use a concrete village scenario: "If a landlord\'s son registers, will he get wages without working?" This reveals the.', 'Finally, have them read the NCERT Activity 5 prompt and answer each sub-question using the textbook\'s framework.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_010', difficulty: 'standard',
          question: 'Urban society refers to a form of social organisation characterised by high.',
          hint: 'Revisit c11_soc_cbse_07_004 Section "Social Order" — focus on the distinction between.',
          misconception: 'Students conflate \'slums\' with \'poverty\' and \'gated communities\' with \'security\', treating them as natural outcomes.',
          parts: [
                { id: 'a', prompt: 'A municipal corporation proposes to redevelop a centrally located slum by offering residents high-rise apartments on 20% of the land and selling the remaining.', answer: 'Step 1: Identify the gentrification mechanism',
                  options: ['Step 1: Identify the gentrification mechanism', 'better housing quality'],
                  hint: 'Revisit c11_soc_cbse_07_004 Section "Social Order" — focus on the distinction between \'spontaneous.',
                  misconception: 'Students conflate \'slums\' with \'poverty\' and \'gated communities\' with \'security\', treating them as natural outcomes of income differences.' }
          ],
            remediations: { 'students-conflate-slums-with-poverty': { steps: ['Take a local example — identify a slum and a gated community within 2 km of each other in your city.', 'Trace the *water supply*: compare hours of supply, pressure, and cost per litre in both.', 'Trace the *waste removal*: who collects garbage, where does it go, who pays?', 'Trace the *police response time* for a reported theft in each.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate \'slums\' with \'poverty\' and \'gated communities\' with \'security\', treating them as natural outcomes.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Mumbai\'s suburban local trains are the only truly democratic space in the city because everyone — rich and poor — travels together." Use.', answer: 'The claim is partially valid but sociologically incomplete',
                  options: ['The claim is partially valid but sociologically incomplete', 'fully democratic'],
                  hint: 'Revisit c11_soc_cbse_07_004 Section "Social Order" — focus on the distinction between \'spontaneous.',
                  misconception: 'Students conflate \'slums\' with \'poverty\' and \'gated communities\' with \'security\', treating them as natural outcomes of income differences.' }
          ],
            remediations: { 'students-conflate-slums-with-poverty': { steps: ['Take a local example — identify a slum and a gated community within 2 km of each other in your city.', 'Trace the *water supply*: compare hours of supply, pressure, and cost per litre in both.', 'Trace the *waste removal*: who collects garbage, where does it go, who pays?', 'Trace the *police response time* for a reported theft in each.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_011', difficulty: 'standard',
          question: 'Urbanisation is the demographic and social process through which an increasing.',
          hint: 'Revisit c11_soc_cbse_07_008 (Rural Society) and c11_soc_cbse_07_010 (Urban Society).',
          misconception: 'Students often think "urbanisation just means more people moving to cities" and treat it as a simple population shift.',
          parts: [
                { id: 'a', prompt: 'A village in Punjab has 8,000 residents spread over 20 sq km, with 65% of workers in agriculture.', answer: 'First settlement: Village (density = 400/sq km, low',
                  options: ['First settlement: Village (density = 400/sq km, low', 'urbanisation just means more people moving to cities'],
                  hint: 'Revisit c11_soc_cbse_07_008 (Rural Society) and c11_soc_cbse_07_010 (Urban Society) to refresh the.',
                  misconception: 'Students often think "urbanisation just means more people moving to cities" and treat it as a simple population shift.' }
          ],
            remediations: { 'urbanisation-just-means-more-people': { steps: ['If the student conflates urbanisation with mere population growth: (1) Have them re-read the textbook\'s definition.', 'lives in urban rather than rural areas" – emphasise PROPORTION, not absolute numbers.', '(2) Ask them to list three social relations that change when density crosses a threshold (e.g., waste disposal requires.', 'city comparison table in the textbook (pp.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
