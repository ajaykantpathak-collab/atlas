import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch01_p1: SimDef = {
    id: 'v3_c11_ps_ch01_p1',
    title: 'Political Theory: An Introduction · Part 1/2',
    subtitle: 'Find the politics in your dining table, not just in Delhi.',
    classLevel: 11, subject: 'political_science', topic: 'Political Theory: An Introduction · Part 1/2',
    chapters: ['c11_ps_ch01'],
    nodeIds: ['c11_ps_cbse_01_001', 'c11_ps_cbse_01_002', 'c11_ps_cbse_01_003', 'c11_ps_cbse_01_004', 'c11_ps_cbse_01_005', 'c11_ps_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an analyst spotting collective decisions in disguise', intro: 'If politics were only elections and speeches, most of the decisions that shape your day would have no name — they do.', goal: 'Define politics as authoritative collective choice and distinguish analysis from abuse.' },
    discovery: {
        question: 'A family dividing chores, a class picking a picnic spot, residents fixing maintenance fees — is any of this \'politics\'?',
        options: ['All of it — collective decision-making under scarcity with binding outcomes is politics, wherever it happens', 'None — politics happens only in Parliament', 'Only the maintenance fee — money makes it political', 'None — politics means elections'],
        answer: 'All of it — collective decision-making under scarcity with binding outcomes is politics, wherever it happens',
        hook: 'Even universal agreement wouldn\'t abolish politics — resources stay scarce and someone must still authoritatively allocate them.',
    },
    teaching: [
        { title: 'What is Politics: Collective decision-making and resource allocation', text: 'Politics is the process of collective decision-making and resource allocation through which a society negotiates diverse interests, resolves conflicts, and establishes binding rules via authoritative.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Test whether defining politics as \'everyday negotiation\' drains the concept, and separate the analytic sense from the \'dirty politics\' slur.',
        labels: ['What is Politics: Collective', 'Politics as the art', 'Political Theory: Systematic reflection', 'Why do we need', 'Normative vs Descriptive approaches', 'Great traditions in political'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_01_001', title: 'What is Politics: Collective decision-making and resource allocation',
          caseStudy: { intro: 'Imagine your residential society\'s WhatsApp group debating whether to install a new gym or repair the leaking water tank — funds cover only one.',
            decisions: [{ prompt: 'Define politics in one sentence using the terms "collective decision-making" and "resource allocation."', options: [
                { text: 'Politics is the process through', outcome: 'Politics is the process through which a community makes collective decisions about the allocation.' },
                { text: 'what politicians do', outcome: 'Not quite — Students believe "politics = what politicians do (corruption, speeches, elections)" and therefore.', reveals: 'politics-what-politicians-do-corruption' },
                { text: 'election campaigns', outcome: 'Not quite — Students believe "politics = what politicians do (corruption, speeches, elections)" and therefore.', reveals: 'politics-what-politicians-do-corruption' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_01_002', title: 'Politics as the art of government vs politics in everyday life',
          caseStudy: { intro: 'Imagine you are part of your housing society\'s WhatsApp group where residents are fiercely debating whether to install a new gym or repair the leaking water.',
            decisions: [{ prompt: 'Define "politics as the art of government" in one sentence and give one example from the Indian context.', options: [
                { text: 'Politics as the art of government is the activity of governing a political unit through', outcome: 'Politics as the art of government is the activity of governing a political unit through formal.' },
                { text: 'politics is when parties fight elections', outcome: 'Not quite — Students equate "politics in everyday life" with "office politics" or "dirty.', reveals: 'students-equate-politics-in-everyday' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_01_003', title: 'Political Theory: Systematic reflection on political ideas and practices',
          caseStudy: { intro: 'Imagine you are scrolling through social media and see a heated debate about whether a new government policy on reservations in private sector jobs is "fair.".',
            decisions: [{ prompt: 'Define Political Theory in one sentence, distinguishing it from "political commentary" or "political ideology."', options: [
                { text: 'Political Theory is the systematic, reasoned analysis of fundamental political concepts', outcome: 'Political Theory is the systematic, reasoned analysis of fundamental political concepts (like.' },
                { text: 'it\'s what politicians think', outcome: 'Not quite — Students often think Political Theory is just "learning what famous dead philosophers like Plato.', reveals: 'political-theory-is-just-learning' },
                { text: 'learning what famous dead philosophers like Plato or Marx said', outcome: 'Not quite — Students often think Political Theory is just "learning what famous dead philosophers like Plato.', reveals: 'political-theory-is-just-learning' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_01_004', title: 'Why do we need Political Theory: Clarity, evaluation, and guidance',
          caseStudy: { intro: 'Imagine you see a heated social media debate about whether the government should regulate "fake news" on WhatsApp.',
            decisions: [{ prompt: 'According to the NCERT textbook, what are the three main reasons why we should study political theory?', options: [
                { text: 'The three main reasons are: (1) **Clarity**', outcome: 'The three main reasons are: (1) **Clarity** — to precisely understand the meaning of political.' },
                { text: 'to memorize thinkers\' names', outcome: 'Not quite — Students often believe **"Political theory is just reading dead philosophers\' opinions — it has.', reveals: 'political-theory-is-just-reading' },
                { text: 'to learn how to win elections', outcome: 'Not quite — Students often believe **"Political theory is just reading dead philosophers\' opinions — it has.', reveals: 'political-theory-is-just-reading' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_01_005', title: 'Normative vs Descriptive approaches to political theory',
          caseStudy: { intro: 'Imagine reading two news analyses about India\'s reservation policy: one argues "Reservations are just because they correct historical caste injustice".',
            decisions: [{ prompt: 'Identify whether each statement is normative (N) or descriptive (D): (a) "India\'s voter turnout in 2024 was 65.79%." (b) "Democracy.', options: [
                { text: '(a) D — verifiable statistic', outcome: '(a) D — verifiable statistic; (b) N — "requires" and "legitimate" express a value judgment about.' },
                { text: 'normative = subjective/biased, descriptive = objective/scientific', outcome: 'Not quite — Students think "normative = subjective/biased, descriptive = objective/scientific" and therefore.', reveals: 'normative-subjective-biased' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_01_006', title: 'Great traditions in political theory: Plato, Aristotle, Kautilya',
          caseStudy: { intro: 'Imagine you are watching a news debate about whether a leader should be chosen for wisdom or popularity. This dilemma—expertise vs.',
            decisions: [{ prompt: 'Name the seminal text associated with each thinker: Plato, Aristotle, Kautilya.', options: [
                { text: 'Plato – *The Republic*', outcome: 'Plato – *The Republic*; Aristotle – *Politics*; Kautilya – *Arthashastra*.' },
                { text: 'ends justify means', outcome: 'Not quite — Students often think Kautilya advocates pure ruthlessness ("ends justify means") because of the.', reveals: 'kautilya-advocates-pure-ruthlessness-ends' },
                { text: 'idealistic', outcome: 'Not quite — Students often think Kautilya advocates pure ruthlessness ("ends justify means") because of the.', reveals: 'kautilya-advocates-pure-ruthlessness-ends' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a youth-parliament orientation, a student says: \'I don\'t do politics — that\'s Parliament stuff, elections and corruption. Dividing chores in my family or our RWA fixing fees is just life.\'',
            decisions: [{ prompt: 'Is he actually outside politics?', options: [
                { text: 'Show the analytical definition: politics is collective decision-making over scarce resources with binding outcomes — so chore-division, picnic votes and RWA fee-setting ARE political acts. The state-centric view (legislatures, executives) is one arena; the society-centric view covers family, school and workplace — none of it inherently \'dirty\'; that label applies only when negotiation turns to manipulation.', outcome: 'He recognises he\'s been doing politics all along: wherever interests conflict and binding decisions are negotiated, politics is present.' },
                { text: 'Agree — politics is what politicians do; calling family life \'politics\' is an insult to families.', outcome: 'That confines the concept to one arena and a moral judgement: the term describes a structure of decision-making, not a verdict on it.', reveals: 'politics-is-only-parliament' },
                { text: 'Split the difference — everyday \'politics\' means manipulation, real politics means government.', outcome: 'Both halves are wrong: the everyday usage is analytical (negotiation under scarcity), and government is only politics\' most formal arena.', reveals: 'everyday-politics-is-manipulation' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Politics isn\'t what politicians do badly — it\'s what humans do whenever a shared decision must bind everyone.',
            decisions: [{ prompt: 'What comes next? Political Theory: An Introduction · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Political Theory: An Introduction · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_01_001', difficulty: 'standard',
          question: 'Politics is the process of collective decision-making and resource allocation.',
          hint: 'If stuck, revisit Class 6 Civics Ch 11 "What is Government and Why We Need It" (node.',
          misconception: 'Students believe "politics = what politicians do (corruption, speeches, elections)" and therefore think politics.',
          parts: [
                { id: 'a', prompt: 'Define politics in one sentence using the terms "collective decision-making" and "resource allocation."', answer: 'Politics is the process through',
                  options: ['Politics is the process through', 'what politicians do', 'election campaigns', 'politics = what politicians do (corruption, speeches, elections)'],
                  hint: 'If stuck, revisit Class 6 Civics Ch 11 "What is Government and Why We Need It" (node.',
                  misconception: 'Students believe "politics = what politicians do (corruption, speeches, elections)" and therefore think politics is optional, dirty, and.' },
                { id: 'b', prompt: 'Your school cancels the annual sports day to fund a new library.', answer: 'The three elements are: (1) conflicting interests (students vs',
                  options: ['The three elements are: (1) conflicting interests (students vs', 'protest', 'principal\'s authority', 'politics = what politicians do (corruption, speeches, elections)'],
                  hint: 'If stuck, revisit Class 6 Civics Ch 11 "What is Government and Why We Need It" (node.',
                  misconception: 'Students believe "politics = what politicians do (corruption, speeches, elections)" and therefore think politics is optional, dirty, and.' },
                { id: 'c', prompt: 'A housing society has ₹50 lakh surplus. Residents want: (A) a swimming pool, (B) solar panels, (C) a community hall. The Managing Committee can fund only two.', answer: 'It is political because diverse preferences clash over scarce funds, requiring a',
                  options: ['It is political because diverse preferences clash over scarce funds, requiring a', 'majority vote without discussion', 'committee decides arbitrarily', 'politics = what politicians do (corruption, speeches, elections)'],
                  hint: 'If stuck, revisit Class 6 Civics Ch 11 "What is Government and Why We Need It" (node.',
                  misconception: 'Students believe "politics = what politicians do (corruption, speeches, elections)" and therefore think politics is optional, dirty, and.' }
          ],
            remediations: { 'politics-what-politicians-do-corruption': { steps: ['Ask the student to write down three decisions they participated in this week where a group had to choose one option.', 'For each, identify the scarce resource (time, money, seats), the conflicting preferences, and the rule used to decide.', 'Have them read NCERT p.3–4 ("Politics arises from the fact that we have different visions...") and underline every.', 'Discuss why "staying away from politics" is impossible — even refusing to vote is a political act that lets others.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "politics = what politicians do (corruption, speeches, elections)" and therefore think politics.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "If everyone agreed on everything, politics would disappear." Use the concepts of scarcity, diversity of values, and the need for.', answer: 'The statement is false',
                  options: ['The statement is false', 'politics = what politicians do (corruption, speeches, elections)', 'politics is optional, dirty, and confined to Parliament'],
                  hint: 'If stuck, revisit Class 6 Civics Ch 11 "What is Government and Why We Need It" (node.',
                  misconception: 'Students believe "politics = what politicians do (corruption, speeches, elections)" and therefore think politics is optional, dirty, and.' }
          ],
            remediations: { 'politics-what-politicians-do-corruption': { steps: ['Ask the student to write down three decisions they participated in this week where a group had to choose one option.', 'For each, identify the scarce resource (time, money, seats), the conflicting preferences, and the rule used to decide.', 'Have them read NCERT p.3–4 ("Politics arises from the fact that we have different visions...") and underline every.', 'Discuss why "staying away from politics" is impossible — even refusing to vote is a political act that lets others.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_01_002', difficulty: 'standard',
          question: 'Politics as the art of government refers to the traditional, state-centric view.',
          hint: 'Revisit c11_ps_cbse_01_001 and the "Let\'s Do It" activity on NCERT p.4: "Analyse a day\'s.',
          misconception: 'Students equate "politics in everyday life" with "office politics" or "dirty politics"—manipulation, backstabbing,.',
          parts: [
                { id: 'a', prompt: 'A Resident Welfare Association (RWA) in Delhi bans food delivery riders from using the main elevator after 8 PM, citing noise complaints.', answer: 'Collective decision: RWA rule restricting elevator access',
                  options: ['Collective decision: RWA rule restricting elevator access', 'administration', 'dispute'],
                  hint: 'Revisit c11_ps_cbse_01_001 and the "Let\'s Do It" activity on NCERT p.4: "Analyse a day\'s events.',
                  misconception: 'Students equate "politics in everyday life" with "office politics" or "dirty politics"—manipulation, backstabbing, or selfish maneuvering.' }
          ],
            remediations: { 'students-equate-politics-in-everyday': { steps: ['Ask the student to describe a recent group decision in their friend circle (e.g., choosing a movie, splitting a bill).', 'Have them identify: Who proposed options? Who objected? How was the final choice made? Who was unhappy?', 'Map these to the four elements: scarce resource (time/money), conflicting claims, decision mechanism, power asymmetry.', 'Contrast with a clear "dirty politics" example (e.g., a friend secretly cancels another\'s booking to force their.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_01_003', difficulty: 'standard',
          question: 'Political Theory is the systematic and rational examination of fundamental.',
          hint: 'If stuck, revisit c11_ps_cbse_01_001 ("What is Politics") and practice identifying the.',
          misconception: 'Students often think Political Theory is just "learning what famous dead philosophers like Plato or Marx said" — i.e.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the role of "reason" in Political Theory versus its role in Mathematics, based on the NCERT\'s reference to Socrates and the statement.', answer: 'In Mathematics, reason operates on fixed, abstract axioms to derive necessary,',
                  options: ['In Mathematics, reason operates on fixed, abstract axioms to derive necessary,', 'both use logic so they are the same', 'learning what famous dead philosophers like Plato or Marx said'],
                  hint: 'If stuck, revisit c11_ps_cbse_01_001 ("What is Politics") and practice identifying the "political".',
                  misconception: 'Students often think Political Theory is just "learning what famous dead philosophers like Plato or Marx said" — i.e., a history of ideas.' }
          ],
            remediations: { 'political-theory-is-just-learning': { steps: ['Take a current news issue (e.g., "Should hate speech be banned?").', 'Identify the conflicting principles (free speech vs. dignity/equality).', 'Find one thinker\'s argument for each side (e.g., Mill for free speech, Waldron for dignity).', 'Use their reasoning to structure *your own* analysis of the specific law — not just summarize them.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_01_004', difficulty: 'standard',
          question: 'Political theory is the systematic study of political concepts (freedom.',
          hint: 'Revisit node c11_ps_cbse_01_003 (Political Theory: Systematic reflection on politics) and.',
          misconception: 'Students often believe **"Political theory is just reading dead philosophers\' opinions — it has no practical use for.',
          parts: [
                { id: 'a', prompt: 'According to the NCERT textbook, what are the three main reasons why we should study political theory?', answer: 'The three main reasons are: (1) **Clarity**',
                  options: ['The three main reasons are: (1) **Clarity**', 'to memorize thinkers\' names', 'to learn how to win elections'],
                  hint: 'Revisit node c11_ps_cbse_01_003 (Political Theory: Systematic reflection on politics) and re-read.',
                  misconception: 'Students often believe **"Political theory is just reading dead philosophers\' opinions — it has no practical use for solving real problems.' }
          ],
            remediations: { 'political-theory-is-just-reading': { steps: ['** Pick a current policy problem (e.g., **Delhi\'s odd-even vehicle rule** for pollution). **', '** Show how *without* theory, debate reduces to "it works/doesn\'t work" based on anecdotes. **', '** Demonstrate **clarity**: define "public health" vs. "individual liberty" vs.', '** Demonstrate **evaluation**: assess the rule against proportionality (is there a less restrictive alternative like.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_01_005', difficulty: 'standard',
          question: 'Normative political theory prescribes how political institutions, actors, and.',
          hint: 'Revisit NCERT pages 6-7 (multiple definitions of equality/freedom) and 10-11 (layered.',
          misconception: 'Students think "normative = subjective/biased, descriptive = objective/scientific" and therefore descriptive.',
          parts: [
                { id: 'a', prompt: 'Identify whether each statement is normative (N) or descriptive (D): (a) "India\'s voter turnout in 2024 was 65.79%." (b) "Democracy requires compulsory voting.', answer: '"India\'s voter turnout in 2024 was 65.79%." (',
                  options: ['"India\'s voter turnout in 2024 was 65.79%." (', 'normative = subjective/biased, descriptive = objective/scientific'],
                  hint: 'Revisit NCERT pages 6-7 (multiple definitions of equality/freedom) and 10-11 (layered meanings.',
                  misconception: 'Students think "normative = subjective/biased, descriptive = objective/scientific" and therefore descriptive is superior.' },
                { id: 'b', prompt: 'A student says: "Political theory should be purely descriptive — like physics — because normative statements are just opinions and cannot be proven true.', answer: 'The NCERT shows equality has "many layers of meaning"',
                  options: ['The NCERT shows equality has "many layers of meaning"', 'water = H2O', 'normative = subjective/biased, descriptive = objective/scientific'],
                  hint: 'Revisit NCERT pages 6-7 (multiple definitions of equality/freedom) and 10-11 (layered meanings.',
                  misconception: 'Students think "normative = subjective/biased, descriptive = objective/scientific" and therefore descriptive is superior.' },
                { id: 'c', prompt: 'Analyze this argument: "The Constitution guarantees equality before law (Article 14). But NFHS-5 data shows 30% of Dalit women receive no antenatal care vs.', answer: 'Premise 1 (Article 14): D (legal fact)',
                  options: ['Premise 1 (Article 14): D (legal fact)', 'into a seemingly descriptive conclusion'],
                  hint: 'Revisit NCERT pages 6-7 (multiple definitions of equality/freedom) and 10-11 (layered meanings.',
                  misconception: 'Students think "normative = subjective/biased, descriptive = objective/scientific" and therefore descriptive is superior.' }
          ],
            remediations: { 'normative-subjective-biased': { steps: ['Take a live controversy (e.g., "Should hate speech be criminalized?").', 'Have student list 3 descriptive claims needed (e.g., "Does criminalization reduce hate crimes?', 'Show how the *same* descriptive finding (e.g., "Germany\'s hate speech laws correlate with lower extremist violence").', 'Assign reading: NCERT pages 6-7 (political theory examines arguments by different thinkers) and 10-11 (equality\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_01_006', difficulty: 'standard',
          question: 'Great traditions in political theory refer to the foundational intellectual.',
          hint: 'Revisit c11_ps_cbse_01_005: Practice classifying statements like "Democracy is the best.',
          misconception: 'Students often think Kautilya advocates pure ruthlessness ("ends justify means") because of the *danda* (coercion).',
          parts: [
                { id: 'a', prompt: 'Name the seminal text associated with each thinker: Plato, Aristotle, Kautilya.', answer: 'Plato – *The Republic*',
                  options: ['Plato – *The Republic*', 'ends justify means', 'idealistic', 'scientific'],
                  hint: 'Revisit c11_ps_cbse_01_005: Practice classifying statements like "Democracy is the best form.',
                  misconception: 'Students often think Kautilya advocates pure ruthlessness ("ends justify means") because of the *danda* (coercion) emphasis, while Plato.' },
                { id: 'b', prompt: 'A modern constitutional court cites "rule of law" to strike down an executive order.', answer: 'Aristotle',
                  options: ['Aristotle', 'ends justify means', 'idealistic', 'scientific'],
                  hint: 'Revisit c11_ps_cbse_01_005: Practice classifying statements like "Democracy is the best form.',
                  misconception: 'Students often think Kautilya advocates pure ruthlessness ("ends justify means") because of the *danda* (coercion) emphasis, while Plato.' }
          ],
            remediations: { 'kautilya-advocates-pure-ruthlessness-ends': { steps: ['Re-read the NCERT paragraph mentioning Kautilya alongside Plato/Aristotle (Chapter 1, p.5).', 'Note the phrase "ideas and principles debated almost since the time of Kautilya, Aristotle..." — this places them.', 'Watch a 10-minute summary of *Arthashastra* Book 1 (e.g., "Kautilya\'s Saptanga Theory" by a university channel).', 'Create a three-column table: Thinker | Core Question | Method | Key Concept.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
