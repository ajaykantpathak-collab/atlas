import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch07_p1: SimDef = {
    id: 'v3_c11_soc_ch07_p1',
    title: 'Social Change and Social Order in Rural and Urban Contexts · Part 1/2',
    subtitle: 'Learn the difference between a fad and a restructuring.',
    classLevel: 11, subject: 'sociology', topic: 'Social Change and Social Order in Rural and Urban Contexts · Part 1/2',
    chapters: ['c11_soc_ch07'],
    nodeIds: ['c11_soc_cbse_07_001', 'c11_soc_cbse_07_002', 'c11_soc_cbse_07_003', 'c11_soc_cbse_07_004', 'c11_soc_cbse_07_005', 'c11_soc_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a change-tracker separating surface churn from deep shifts', intro: 'A new app is noise; a new institution is change — the test is whether the underlying structure had to move.', goal: 'Distinguish structural from surface change and classify by pace and nature together.' },
    discovery: {
        question: 'Smartphones, new slang, a viral fashion — is that \'social change\'?',
        options: ['Not yet — social change means structural transformation at scale; gadgets only count once they reorganise family, work or polity', 'Yes — any visible difference is social change', 'Yes — slang is society changing', 'Not yet — only revolutions count'],
        answer: 'Not yet — social change means structural transformation at scale; gadgets only count once they reorganise family, work or polity',
        hook: 'And \'revolutionary\' doesn\'t mean \'structural\' alone — the Green Revolution was both fast AND structural, while slow English-education reform quietly built universities and a civil service.',
    },
    teaching: [
        { title: 'Social Change: Definition, Scope and the Historical Pace of Change', text: 'Social change refers to significant alterations in the underlying structure of society—including its institutions, norms, values, and social relationships—that are both intensive (transforming.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_07_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Classify the Green Revolution and the Bengal Renaissance by pace AND depth together, then check whether sociology arose only because Europe \'changed faster.\'',
        labels: ['Social Change: Definition, Scope', 'Types of Social Change', 'Five Sources of Social', 'Social Order: Concept', 'Socialisation and Social Stratification', 'Domination, Authority and Legitimation'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_07_002', title: 'Types of Social Change: Evolutionary vs Revolutionary, Structural vs Ideational',
          caseStudy: { intro: 'Imagine you are watching a time-lapse video of your city over 100 years: buildings rise slowly, transport shifts from bullock carts to metro, joint families.',
            decisions: [{ prompt: 'Define \'evolutionary change\' and \'revolutionary change\' in the context of social change, giving one example of each from Indian history.', options: [
                { text: 'Evolutionary change: Slow, gradual, cumulative transformation over long periods (e.g.,', outcome: 'Evolutionary change: Slow, gradual, cumulative transformation over long periods (e.g., transition.' },
                { text: 'revolutionary change is always structural', outcome: 'Not quite — Students often believe **"revolutionary change is always structural" and "evolutionary change.', reveals: 'revolutionary-change-is-always-structural' },
                { text: 'evolutionary change is always ideational', outcome: 'Not quite — Students often believe **"revolutionary change is always structural" and "evolutionary change.', reveals: 'revolutionary-change-is-always-structural' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_07_003', title: 'Five Sources of Social Change: Environmental, Technological, Economic, Political, Cultural',
          caseStudy: { intro: 'Begin by asking: "Why did the introduction of the smartphone change not just how we talk, but how we date, bank, protest, and even sleep?" Guide students.',
            decisions: [{ prompt: 'List the five sources of social change identified in the NCERT textbook and give one original example (not from the text) for each.', options: [
                { text: 'The five sources are: Environmental (e.g., the 2018 Kerala floods altering housing', outcome: 'The five sources are: Environmental (e.g., the 2018 Kerala floods altering housing patterns and.' },
                { text: 'industrialization', outcome: 'Not quite — Students treat the five sources as mutually exclusive buckets and classify a phenomenon under only.', reveals: 'students-treat-the-five-sources' },
                { text: 'urbanization', outcome: 'Not quite — Students treat the five sources as mutually exclusive buckets and classify a phenomenon under only.', reveals: 'students-treat-the-five-sources' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_07_004', title: 'Social Order: Concept and Its Relationship with Social Change',
          caseStudy: { intro: 'Imagine you are sitting in a Mumbai local train during peak hour: thousands of strangers coexist without chaos because everyone follows unwritten rules.',
            decisions: [{ prompt: 'Define \'social order\' in one sentence and name the two broad mechanisms through which every society maintains it, as per the NCERT textbook.', options: [
                { text: 'Social order is the tendency within established social systems to resist and regulate', outcome: 'Social order is the tendency within established social systems to resist and regulate change.' },
                { text: 'says \'social order means no change\' confuses stability with stagnation', outcome: 'Not quite — Students often think **\'social order = absence of conflict\' or \'social order means everyone.', reveals: 'social-order-absence-of-conflict' },
                { text: '**\'social order = absence of conflict\' or \'social order means everyone agrees\'**', outcome: 'Not quite — Students often think **\'social order = absence of conflict\' or \'social order means everyone.', reveals: 'social-order-absence-of-conflict' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_07_005', title: 'Socialisation and Social Stratification as Mechanisms of Social Order',
          caseStudy: { intro: 'Imagine you\'re in a classroom where everyone raises their hand before speaking — no teacher forced you today, you just *do* it.',
            decisions: [{ prompt: 'Define socialisation and social stratification as mechanisms of social order in one sentence each, using the precise sociological.', options: [
                { text: 'Socialisation is the process of internalising norms and values through', outcome: 'Socialisation is the process of internalising norms and values through which individuals.' },
                { text: 'learning manners', outcome: 'Not quite — Students conflate "socialisation" with "socialising" (hanging out with friends) and.', reveals: 'students-conflate-socialisation-with-socialising' },
                { text: 'rich vs poor', outcome: 'Not quite — Students conflate "socialisation" with "socialising" (hanging out with friends) and.', reveals: 'students-conflate-socialisation-with-socialising' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_07_006', title: 'Domination, Authority and Legitimation (Weber): Law and the State\'s Monopoly on Violence',
          caseStudy: { intro: 'Imagine you are stopped at a red traffic light at 2 a.m. on an empty road — no police, no cameras, no other cars.',
            decisions: [{ prompt: 'Define \'authority\' in Weber\'s sense and give one example of a person who holds authority *only* because of their official position, not.', options: [
                { text: 'Authority is legitimate power', outcome: 'Authority is legitimate power — power considered justified and proper by those subject to.' },
                { text: 'authority is just power', outcome: 'Not quite — Students often equate "authority" with "anyone in charge" or "people we obey," ignoring Weber\'s.', reveals: 'students-often-equate-authority-with' },
                { text: 'a king has authority', outcome: 'Not quite — Students often equate "authority" with "anyone in charge" or "people we obey," ignoring Weber\'s.', reveals: 'students-often-equate-authority-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a change-and-development seminar, a student calls smartphones \'social change, obviously\' and claims \'revolutionary change is always structural while slow change is always just ideas — and rapid change is how history always worked.\'',
            decisions: [{ prompt: 'How does sociology classify and delimit change?', options: [
                { text: 'Apply the two axes separately: pace (evolutionary vs revolutionary) and nature (structural vs ideational) are independent — the Green Revolution was revolutionary AND structural; the Bengal Renaissance was slow AND ideational. And \'change\' requires structural transformation at scale — smartphones count only when you name the restructured institution; for 99.9% of human history, structural change was negligible — rapid change is a recent anomaly.', outcome: 'He stops grading by speed and novelty: a change earns the name by reconfiguring institutions for large populations — pace and nature stay distinct axes.' },
                { text: 'Keep \'smartphones = social change\' — visible transformation is change.', outcome: 'Visibility isn\'t structurality: unless an underlying institution reorganised (family, labour, citizenship), it\'s surface modification, not social change.', reveals: 'visible-change-is-social-change' },
                { text: 'Keep the pace-equals-nature pairing — fast breaks structure, slow shifts values.', outcome: 'The axes cross freely: slow English education built universities and civil services (structural), while rapid feminist ideas can precede any institutional shift (ideational).', reveals: 'pace-equals-nature' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Change becomes social change when it moves the furniture of institutions — not when it merely changes the wallpaper.',
            decisions: [{ prompt: 'What comes next? Social Change and Social Order in Rural and Urban Contexts · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Social Change and Social Order in Rural and Urban Contexts · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_001', difficulty: 'standard',
          question: 'Social change refers to significant alterations in the underlying structure.',
          hint: 'Revisit the \'Clock of Human History\' box on textbook page 21–22 and Class 10 History.',
          misconception: 'Students equate \'social change\' with any visible alteration in daily life—new gadgets, fashion, slang, or a single.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Social change refers to significant alterations in the underlying structure of',
                  options: ['Social change refers to significant alterations in the underlying structure of', 'Social change can be classified by its **pace** into *evolutionary change* (slow,', 'The five sources of social change are the broad categorical causes that initiate', 'Social order refers to the stable, predictable patterns of social relations, norms, and'],
                  hint: 'Revisit the \'Clock of Human History\' box on textbook page 21–22 and Class 10 History Chapter 4.',
                  misconception: 'Students equate \'social change\' with any visible alteration in daily life—new gadgets, fashion, slang, or a single law—because these are.' }
          ],
            remediations: { 'students-equate-social-change-with': { steps: ['Have the student draw a 24-hour clock on paper.', 'Using the textbook\'s figures (500,000 years total; agriculture 12,000 BP; civilisation 6,000 BP; modern acceleration.', 'Ask: \'In which segment did the *structure* of daily life—how people produce food, relate to authority, organise.', 'Give three cards: \'Smartphone launched\', \'Child labour banned\', \'New dance trend\'.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_002', difficulty: 'standard',
          question: 'Social change can be classified by its **pace** into *evolutionary change*.',
          hint: 'Revisit c11_soc_cbse_07_001: "Social change refers to changes that are significant — that.',
          misconception: 'Students often believe **"revolutionary change is always structural" and "evolutionary change is always ideational."**.',
          parts: [
                { id: 'a', prompt: 'A student says: "The introduction of GST (Goods and Services Tax) in 2017 is an ideational change because it changed people\'s ideas about taxation." Is this.', answer: 'Incorrect',
                  options: ['Incorrect', 'revolutionary change is always structural', 'evolutionary change is always ideational'],
                  hint: 'Revisit c11_soc_cbse_07_001: "Social change refers to changes that are significant — that.',
                  misconception: 'Students often believe **"revolutionary change is always structural" and "evolutionary change is always ideational."** This is false.' },
                { id: 'b', prompt: 'The NCERT text states: "Changes in values and beliefs can also lead to social change" and gives the example of changing ideas about childhood.', answer: 'The Bhakti Movement began as **ideational change**',
                  options: ['The Bhakti Movement began as **ideational change**', 'revolutionary change is always structural', 'evolutionary change is always ideational'],
                  hint: 'Revisit c11_soc_cbse_07_001: "Social change refers to changes that are significant — that.',
                  misconception: 'Students often believe **"revolutionary change is always structural" and "evolutionary change is always ideational."** This is false.' }
          ],
            remediations: { 'revolutionary-change-is-always-structural': { steps: ['If the student conflates pace and nature: (1) Draw a 2x2 matrix on paper.', 'Label axes: **Pace (Evolutionary ↔ Revolutionary)** and **Nature (Structural ↔ Ideational)**.', 'Write one example each: GST (2017), Bhakti Movement, Green Revolution, 1857 Revolt.', '(3) Ask: "For GST — was it fast or slow?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe **"revolutionary change is always structural" and "evolutionary change is always ideational."**.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Green Revolution (1960s-70s) was a revolutionary change in Indian agriculture." Consider both **pace** (speed of adoption) and.', answer: 'The claim is **partially correct but incomplete**',
                  options: ['The claim is **partially correct but incomplete**', 'revolutionary change is always structural', 'evolutionary change is always ideational'],
                  hint: 'Revisit c11_soc_cbse_07_001: "Social change refers to changes that are significant — that.',
                  misconception: 'Students often believe **"revolutionary change is always structural" and "evolutionary change is always ideational."** This is false.' }
          ],
            remediations: { 'revolutionary-change-is-always-structural': { steps: ['If the student conflates pace and nature: (1) Draw a 2x2 matrix on paper.', 'Label axes: **Pace (Evolutionary ↔ Revolutionary)** and **Nature (Structural ↔ Ideational)**.', 'Write one example each: GST (2017), Bhakti Movement, Green Revolution, 1857 Revolt.', '(3) Ask: "For GST — was it fast or slow?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_003', difficulty: 'standard',
          question: 'The five sources of social change are the broad categorical causes that.',
          hint: 'Revisit Chapter 1 \'Social Structure, Stratification and Social Processes\' – specifically.',
          misconception: 'Students treat the five sources as mutually exclusive buckets and classify a phenomenon under only one source.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The five sources of social change are the broad categorical causes that initiate',
                  options: ['The five sources of social change are the broad categorical causes that initiate', 'Social change refers to significant alterations in the underlying structure of', 'Social change can be classified by its **pace** into *evolutionary change* (slow,', 'Social order refers to the stable, predictable patterns of social relations, norms, and'],
                  hint: 'Revisit Chapter 1 \'Social Structure, Stratification and Social Processes\' – specifically the.',
                  misconception: 'Students treat the five sources as mutually exclusive buckets and classify a phenomenon under only one source.' }
          ],
            remediations: { 'students-treat-the-five-sources': { steps: ['Take a single well-known change (e.g., demonetization 2016).', 'Force-map it onto a 5-column table: Environmental, Technological, Economic, Political, Cultural.', 'For each column, write ONE specific mechanism (not just a label).', 'Identify which source was the *trigger* (political announcement), which *amplified* (technological: digital payments).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_004', difficulty: 'standard',
          question: 'Social order refers to the stable, predictable patterns of social relations.',
          hint: 'Revisit c11_soc_cbse_07_001 (definition of social change) and c11_soc_cbse_07_003 (five.',
          misconception: 'Students often think **\'social order = absence of conflict\' or \'social order means everyone agrees\'**.',
          parts: [
                { id: 'a', prompt: 'A village panchayat dominated by a landowning caste introduces a new rule: \'No tenant farmer may sell produce directly to the city market; all sales must.', answer: 'which mechanism of social order this represents, (',
                  options: ['which mechanism of social order this represents, (', '**\'social order = absence of conflict\' or \'social order means everyone agrees\'**'],
                  hint: 'Revisit c11_soc_cbse_07_001 (definition of social change) and c11_soc_cbse_07_003 (five sources).',
                  misconception: 'Students often think **\'social order = absence of conflict\' or \'social order means everyone agrees\'**.' }
          ],
            remediations: { 'social-order-absence-of-conflict': { steps: ['** Ask them to list three conflicts/dissent they see daily (traffic arguments, RWAs vs. vendors, student protests). **', '** Ask: \'Does the existence of these mean society has *no* social order?\' Guide them to see that order is the *system.', '** Re-read the textbook lines: \'Being united as Indians does not prevent us from disagreeing...', '** Use the \'forced cooperation\' example from Chapter 1 (women not claiming rights in natal family) to show compliance ≠.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_005', difficulty: 'standard',
          question: 'Socialisation is the lifelong process through which individuals internalise.',
          hint: 'Revisit c11_soc_cbse_07_004\'s Activity 4 (lunch/parents/game rules thought experiment).',
          misconception: 'Students conflate "socialisation" with "socialising" (hanging out with friends) and "stratification" with "inequality".',
          parts: [
                { id: 'a', prompt: 'Define socialisation and social stratification as mechanisms of social order in one sentence each, using the precise sociological terminology from the NCERT.', answer: 'Socialisation is the process of internalising norms and values through',
                  options: ['Socialisation is the process of internalising norms and values through', 'learning manners', 'rich vs poor'],
                  hint: 'Revisit c11_soc_cbse_07_004\'s Activity 4 (lunch/parents/game rules thought experiment) and the.',
                  misconception: 'Students conflate "socialisation" with "socialising" (hanging out with friends) and "stratification" with "inequality" (just a description.' },
                { id: 'b', prompt: 'The NCERT states: "Socialisation cannot turn people into programmed robots — it cannot produce complete and permanent consent for all norms at all times.".', answer: 'Because socialisation is never total',
                  options: ['Because socialisation is never total', 'socialisation fails so we need police'],
                  hint: 'Revisit c11_soc_cbse_07_004\'s Activity 4 (lunch/parents/game rules thought experiment) and the.',
                  misconception: 'Students conflate "socialisation" with "socialising" (hanging out with friends) and "stratification" with "inequality" (just a description.' }
          ],
            remediations: { 'students-conflate-socialisation-with-socialising': { steps: ['Ask student to write two sentences — one starting "Socialisation creates order by...", another "Stratification creates.', 'Give a micro-scenario (teacher asks student to stand up; student stands). Ask: "Which mechanism? Why not the other?"', 'Contrast with "Student stands because teacher controls grades" — identify stratification.', 'Have student re-read NCERT paragraphs on "spontaneous consent" and "dominant groups resist change" — highlight verbs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_006', difficulty: 'standard',
          question: 'Domination is a stable, settled power relationship where a social entity.',
          hint: 'Revisit c11_soc_cbse_07_005 "Socialisation and Social Stratification as Mechanisms.',
          misconception: 'Students often equate "authority" with "anyone in charge" or "people we obey," ignoring Weber\'s core requirement.',
          parts: [
                { id: 'a', prompt: 'Define \'authority\' in Weber\'s sense and give one example of a person who holds authority *only* because of their official position, not personal charisma.', answer: 'Authority is legitimate power',
                  options: ['Authority is legitimate power', 'authority is just power', 'a king has authority', 'A teacher has authority'],
                  hint: 'Revisit c11_soc_cbse_07_005 "Socialisation and Social Stratification as Mechanisms of Social Order".',
                  misconception: 'Students often equate "authority" with "anyone in charge" or "people we obey," ignoring Weber\'s core requirement: **legitimacy as perceived.' },
                { id: 'b', prompt: 'During a protest, demonstrators block a highway. Police use batons to clear the road.', answer: 'The modern state claims a monopoly on the *legitimate* use of violence',
                  options: ['The modern state claims a monopoly on the *legitimate* use of violence', 'police violence is illegal', 'A teacher has authority'],
                  hint: 'Revisit c11_soc_cbse_07_005 "Socialisation and Social Stratification as Mechanisms of Social Order".',
                  misconception: 'Students often equate "authority" with "anyone in charge" or "people we obey," ignoring Weber\'s core requirement: **legitimacy as perceived.' }
          ],
            remediations: { 'students-often-equate-authority-with': { steps: ['Ask the student to write two sentences: "I obey X because..." and "I believe X has the right to command me because...".', 'Highlight that (a) has both power *and* a shared belief in rightfulness (law, training, public mandate); (b) has only.', 'Re-read the NCERT definition: "Authority is defined by Max Weber as legitimate power — that is, power considered to.', 'Practice classifying 5 fresh examples (principal, parent, gang leader, elected MP, religious guru) using the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
