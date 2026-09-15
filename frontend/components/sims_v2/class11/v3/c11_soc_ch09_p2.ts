import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch09_p2: SimDef = {
    id: 'v3_c11_soc_ch09_p2',
    title: 'Introducing Western Sociologists · Part 2/2',
    subtitle: 'See three revolutions as one engine with three parts.',
    classLevel: 11, subject: 'sociology', topic: 'Introducing Western Sociologists · Part 2/2',
    chapters: ['c11_soc_ch09'],
    nodeIds: ['c11_soc_cbse_09_007', 'c11_soc_cbse_09_008', 'c11_soc_cbse_09_009', 'c11_soc_cbse_09_010', 'c11_soc_cbse_09_011', 'c11_soc_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a historian of ideas assembling sociology\'s engine', intro: 'Reason as method, the sovereign individual as subject, industrial pathology as object — three gifts, one discipline.', goal: 'Explain sociology\'s birth through the method–subject–object triad and state demand for knowledge.' },
    discovery: {
        question: 'Sociology was born because Enlightenment, then Revolution, then Industry happened in sequence — a tidy timeline?',
        options: ['It\'s a triad, not a timeline — Enlightenment gave the method, the French Revolution the subject, the Industrial Revolution the object', 'Yes — history happened first, sociology after', 'Yes — Europe changed faster, so sociology started there', 'No — it was invented by one founder'],
        answer: 'It\'s a triad, not a timeline — Enlightenment gave the method, the French Revolution the subject, the Industrial Revolution the object',
        hook: 'Marx\'s exile wasn\'t biography trivia — the British Museum Reading Room\'s factory reports and Hansard debates are the empirical spine of Capital.',
    },
    teaching: [
        { title: 'Durkheim\'s Mechanical vs Organic Solidarity and the Division of Labour', text: 'Mechanical solidarity is a form of social cohesion found in traditional, small-scale societies where individuals share similar values, beliefs, and activities, creating collective consciousness that.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_09_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Match each revolution to its epistemic gift, then argue whether the Manifesto is a pamphlet for history or a text for sociology.',
        labels: ['Durkheim\'s Mechanical vs Organic', 'Max Weber: Biography', 'Weber\'s Ideal Type as', 'Weber\'s Three Types', 'Bureaucracy as the Embodiment', 'Comparing Marx, Durkheim'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_09_007', title: 'Durkheim\'s Mechanical vs Organic Solidarity and the Division of Labour',
          caseStudy: { intro: 'Imagine you are visiting two communities: a remote tribal village in Odisha where everyone farms, hunts, and participates in the same rituals, and.',
            decisions: [{ prompt: 'Define mechanical solidarity and organic solidarity in one sentence each, using Durkheim\'s precise terminology for the *basis of cohesion*.', options: [
                { text: 'Mechanical solidarity: social cohesion founded on the *similarity* of individual', outcome: 'Mechanical solidarity: social cohesion founded on the *similarity* of individual consciousnesses.' },
                { text: 'mechanical solidarity is in villages and organic in cities', outcome: 'Not quite — Students routinely conflate **mechanical solidarity with "traditional/rural/primitive" and organic.', reveals: 'students-routinely-conflate-mechanical-solidarit' },
                { text: 'mechanical solidarity has no division of labour', outcome: 'Not quite — Students routinely conflate **mechanical solidarity with "traditional/rural/primitive" and organic.', reveals: 'students-routinely-conflate-mechanical-solidarit' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_09_008', title: 'Max Weber: Biography and the Interpretive Sociology of Social Action',
          caseStudy: { intro: 'Imagine you see a classmate angrily throw a book across the room.',
            decisions: [{ prompt: 'Define "social action" according to Max Weber and state the single criterion that distinguishes it from mere reactive behavior.', options: [
                { text: 'Social action is behavior to', outcome: 'Social action is behavior to which the acting individual attaches a subjective meaning, and which.' },
                { text: 'any interaction between people', outcome: 'Not quite — Students often think "value neutrality" means the sociologist must have *no values* or study only.', reveals: 'value-neutrality-means-the-sociologist' },
                { text: 'value neutrality', outcome: 'Not quite — Students often think "value neutrality" means the sociologist must have *no values* or study only.', reveals: 'value-neutrality-means-the-sociologist' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_09_009', title: 'Weber\'s Ideal Type as a Methodological Tool and Value Neutrality in Social Science',
          caseStudy: { intro: 'Imagine you are a journalist asked to describe a *khap panchayat* to a national audience.',
            decisions: [{ prompt: 'Define \'ideal type\' in Weber\'s methodology and state its primary function in sociological analysis.', options: [
                { text: 'An ideal type is a logically constructed analytical model that accentuates the most', outcome: 'An ideal type is a logically constructed analytical model that accentuates the most significant.' },
                { text: 'an average case', outcome: 'Not quite — Students often think **"ideal type" means "the best or most perfect form"** of something (e.g.', reveals: 'ideal-type-means-the-best' },
                { text: 'a moral ideal', outcome: 'Not quite — Students often think **"ideal type" means "the best or most perfect form"** of something (e.g.', reveals: 'ideal-type-means-the-best' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_09_010', title: 'Weber\'s Three Types of Legitimate Authority: Traditional, Charismatic, Rational-Legal',
          caseStudy: { intro: 'Begin by asking: "Why do you obey a traffic police officer\'s signal to stop, but would not obey a random stranger wearing the same uniform?" This surfaces the.',
            decisions: [{ prompt: 'State the three types of legitimate authority identified by Max Weber and the primary source of legitimacy for each type.', options: [
                { text: 'The three types are: (1) Traditional authority', outcome: 'The three types are: (1) Traditional authority — legitimacy derives from belief in the sanctity.' },
                { text: 'charismatic authority rests on rules', outcome: 'Not quite — Students conflate "charismatic authority" with "being popular/likable" or "having a magnetic.', reveals: 'students-conflate-charismatic-authority-with' },
                { text: 'swaps the sources (e', outcome: 'Not quite — Students conflate "charismatic authority" with "being popular/likable" or "having a magnetic.', reveals: 'students-conflate-charismatic-authority-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_09_011', title: 'Bureaucracy as the Embodiment of Rational-Legal Authority',
          caseStudy: { intro: 'Imagine you visit a government office to get a caste certificate: you take a token, wait for your number, submit documents to a clerk who checks them against.',
            decisions: [{ prompt: 'State the five defining features of bureaucracy as identified by Max Weber, using the exact terminology from the NCERT text.', options: [
                { text: 'The five features are: (i) Functioning of Officials', outcome: 'The five features are: (i) Functioning of Officials — fixed official jurisdiction governed.' },
                { text: 'hierarchy, rules, impersonality', outcome: 'Not quite — Students conflate "bureaucracy" with "government office" and assume any hierarchical, rule-based.', reveals: 'students-conflate-bureaucracy-with-government' },
                { text: 'reliance on written documents', outcome: 'Not quite — Students conflate "bureaucracy" with "government office" and assume any hierarchical, rule-based.', reveals: 'students-conflate-bureaucracy-with-government' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_09_012', title: 'Comparing Marx, Durkheim and Weber: Three Foundational Perspectives',
          caseStudy: { intro: 'Imagine you are a sociologist hired to advise a government committee studying why workers in a gig-economy platform (like food delivery) feel exhausted yet.',
            decisions: [{ prompt: 'State the one core concept that each thinker uses to explain social order: Marx, Durkheim, and Weber.', options: [
                { text: 'Marx: mode of production (economic base determining superstructure)', outcome: 'Marx: mode of production (economic base determining superstructure).' },
                { text: 'Marx uses social facts', outcome: 'Not quite — Students often treat the three thinkers as offering "different opinions on the same topic" like.', reveals: 'students-often-treat-the-three' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing sociology\'s origin story, a student lists: \'First Enlightenment, then French Revolution, then Industrial Revolution — then sociology was born.\' On Marx he recites dates: \'exiled to London in 1849, poor, died 1883.\'',
            decisions: [{ prompt: 'What analytical structure does the history actually have?', options: [
                { text: 'Read the triad by function, not sequence: Enlightenment supplied the METHOD (reason and empiricism), the French Revolution the SUBJECT (sovereign individual and nation-state), the Industrial Revolution the OBJECT (industrial society\'s pathologies) — together they made a science of society necessary. And Marx\'s biography is intellectual genesis: the British Museum gave him Factory Reports and Hansard — the empirical base of Capital — and his poverty grounded the theory of immiseration.', outcome: 'The story becomes analysis: three simultaneous conditions of possibility, and a life whose circumstances supplied the theory\'s data and stakes.' },
                { text: 'Keep the timeline — history is sequence, and sociology came after.', outcome: 'Chronology lists events; the triad explains WHY sociology had to exist — each revolution filled an epistemic gap the discipline was built to answer.', reveals: 'origins-as-chronology' },
                { text: 'Keep the biographical facts as colour — his life is backdrop, his books are the theory.', outcome: 'The conditions produced the concepts: London\'s archives supplied the data and lived immiseration the framework — chronology isn\'t intellectual genesis.', reveals: 'biography-is-just-timeline' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_09_012', title: 'You made it',
          caseStudy: { intro: 'The modern state needed to govern health, crime and \'development\' — and that demand for new knowledge is where sociology came from.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_09_007', difficulty: 'standard',
          question: 'Mechanical solidarity is a form of social cohesion found in traditional.',
          hint: 'Revisit c11_soc_cbse_09_006: practice identifying social facts in everyday scenarios.',
          misconception: 'Students routinely conflate **mechanical solidarity with "traditional/rural/primitive" and organic solidarity with.',
          parts: [
                { id: 'a', prompt: 'Define mechanical solidarity and organic solidarity in one sentence each, using Durkheim\'s precise terminology for the *basis of cohesion* in each type.', answer: 'Mechanical solidarity: social cohesion founded on the *similarity* of individual',
                  options: ['Mechanical solidarity: social cohesion founded on the *similarity* of individual', 'mechanical solidarity is in villages and organic in cities', 'mechanical solidarity has no division of labour'],
                  hint: 'Revisit c11_soc_cbse_09_006: practice identifying social facts in everyday scenarios (e.g., "Is.',
                  misconception: 'Students routinely conflate **mechanical solidarity with "traditional/rural/primitive" and organic solidarity with.' },
                { id: 'b', prompt: 'Consider a contemporary Indian metropolitan housing society (gated community) with 500 flats.', answer: 'Predominant solidarity: **organic**, with *residual mechanical elements*',
                  options: ['Predominant solidarity: **organic**, with *residual mechanical elements*', 'mechanical because they live together and have rules'],
                  hint: 'Revisit c11_soc_cbse_09_006: practice identifying social facts in everyday scenarios (e.g., "Is.',
                  misconception: 'Students routinely conflate **mechanical solidarity with "traditional/rural/primitive" and organic solidarity with.' }
          ],
            remediations: { 'students-routinely-conflate-mechanical-solidarit': { steps: ['Give the student two 100-word vignettes — one of a caste-panchayat-dominated village in Rajasthan, one of a co-working.', 'Have them identify *which criteria conflict* in each vignette (e.g., the village has repressive law *but*.', 'Require them to write a 150-word judgment: "Community X is *predominantly* mechanical/organic because criteria A and.', 'Only then reintroduce the terms "traditional/modern" as *empirical correlates*, not *definitional criteria*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_09_008', difficulty: 'standard',
          question: 'Max Weber\'s interpretive sociology (Verstehende Soziologie) is the systematic.',
          hint: 'Revisit the definition of "social action" in the NCERT glossary and Activity 3 in the.',
          misconception: 'Students often think "value neutrality" means the sociologist must have *no values* or study only "value-free" topics.',
          parts: [
                { id: 'a', prompt: 'Define "social action" according to Max Weber and state the single criterion that distinguishes it from mere reactive behavior.', answer: 'Social action is behavior to',
                  options: ['Social action is behavior to', 'any interaction between people', 'value neutrality', 'value-free'],
                  hint: 'Revisit the definition of "social action" in the NCERT glossary and Activity 3 in the textbook.',
                  misconception: 'Students often think "value neutrality" means the sociologist must have *no values* or study only "value-free" topics.' },
                { id: 'b', prompt: 'A student says: "Weber\'s \'empathetic understanding\' means the sociologist should feel sympathy for the people they study." Explain why this is incorrect and.', answer: 'Weber explicitly contrasts empathy (Einfühlung) with sympathy (Sympathie)',
                  options: ['Weber explicitly contrasts empathy (Einfühlung) with sympathy (Sympathie)', 'empathy', 'value neutrality', 'value-free'],
                  hint: 'Revisit the definition of "social action" in the NCERT glossary and Activity 3 in the textbook.',
                  misconception: 'Students often think "value neutrality" means the sociologist must have *no values* or study only "value-free" topics.' },
                { id: 'c', prompt: 'Classify the following action into Weber\'s four types of social action with justification: "A devout Hindu woman fasts every Tuesday for Lord Hanuman.', answer: 'This is **value-rational action (wertrational)**',
                  options: ['This is **value-rational action (wertrational)**', 'value neutrality', 'value-free'],
                  hint: 'Revisit the definition of "social action" in the NCERT glossary and Activity 3 in the textbook.',
                  misconception: 'Students often think "value neutrality" means the sociologist must have *no values* or study only "value-free" topics.' },
                { id: 'd', prompt: 'Compare Weber\'s concept of "value neutrality" with Durkheim\'s treatment of "social facts" in terms of the researcher\'s stance toward the object of study.', answer: 'Weber requires the researcher to *bracket* personal values to faithfully record',
                  options: ['Weber requires the researcher to *bracket* personal values to faithfully record', 'both want objectivity', 'value neutrality', 'value-free'],
                  hint: 'Revisit the definition of "social action" in the NCERT glossary and Activity 3 in the textbook.',
                  misconception: 'Students often think "value neutrality" means the sociologist must have *no values* or study only "value-free" topics.' }
          ],
            remediations: { 'value-neutrality-means-the-sociologist': { steps: ['If a student conflates value neutrality with value absence: (1) Ask them to write a one-paragraph Verstehen account.', '(2) Have them swap paragraphs with a peer who highlights any judgment words.', '(3) Discuss: "Did you describe the actor\'s *stated* motive or your *own* opinion?" (4) Re-read Weber: "The sociologist.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_09_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "value neutrality" means the sociologist must have *no values* or study only "value-free" topics.',
          parts: [
                { id: 'a', prompt: 'Construct a novel real-life scenario involving a social action that *simultaneously* exhibits characteristics of *two* of Weber\'s ideal types.', answer: 'Scenario: A young entrepreneur starts an eco-friendly business *both*',
                  options: ['Scenario: A young entrepreneur starts an eco-friendly business *both*', 'value neutrality', 'value-free'],
                  hint: 'Revisit the definition of "social action" in the NCERT glossary and Activity 3 in the textbook.',
                  misconception: 'Students often think "value neutrality" means the sociologist must have *no values* or study only "value-free" topics.' }
          ],
            remediations: { 'value-neutrality-means-the-sociologist': { steps: ['If a student conflates value neutrality with value absence: (1) Ask them to write a one-paragraph Verstehen account.', '(2) Have them swap paragraphs with a peer who highlights any judgment words.', '(3) Discuss: "Did you describe the actor\'s *stated* motive or your *own* opinion?" (4) Re-read Weber: "The sociologist.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_09_009', difficulty: 'standard',
          question: 'Weber\'s **ideal type** is a heuristic methodological tool — a logically.',
          hint: 'Revisit c11_soc_cbse_09_008, specifically the section "Max Weber and Interpretive.',
          misconception: 'Students often think **"ideal type" means "the best or most perfect form"** of something (e.g., "ideal bureaucracy.',
          parts: [
                { id: 'a', prompt: 'Construct a mini ideal type for "a traditional Indian joint family" by selecting and purifying **four** defining characteristics.', answer: 'Example characteristics: (1) **Common property**',
                  options: ['Example characteristics: (1) **Common property**', 'ideal type', 'the best or most perfect form', 'ideal bureaucracy = efficient, corruption-free bureaucracy'],
                  hint: 'Revisit c11_soc_cbse_09_008, specifically the section "Max Weber and Interpretive Sociology".',
                  misconception: 'Students often think **"ideal type" means "the best or most perfect form"** of something (e.g., "ideal bureaucracy = efficient.' }
          ],
            remediations: { 'ideal-type-means-the-best': { steps: ['**Etymology clarification**: Write *Idealtypus* on board; break into *Idee* (concept) + *Typus* (model).', 'Contrast with *ideale* (moral ideal).', '**Counter-example**: Present a real bureaucracy (e.g., local RTO office) and ask students to list its features.', 'Then build the ideal type together — show how the ideal type *omits* corruption, delays, and nepotism not because they.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_09_010', difficulty: 'standard',
          question: 'Weber\'s three types of legitimate authority are ideal-typical categories.',
          hint: 'Revisit c11_soc_cbse_09_009: re-read the section "Ideal Type as a Methodological Tool".',
          misconception: 'Students conflate "charismatic authority" with "being popular/likable" or "having a magnetic personality" in the.',
          parts: [
                { id: 'a', prompt: 'State the three types of legitimate authority identified by Max Weber and the primary source of legitimacy for each type.', answer: 'The three types are: (1) Traditional authority',
                  options: ['The three types are: (1) Traditional authority', 'charismatic authority rests on rules', 'swaps the sources (e'],
                  hint: 'Revisit c11_soc_cbse_09_009: re-read the section "Ideal Type as a Methodological Tool" and the.',
                  misconception: 'Students conflate "charismatic authority" with "being popular/likable" or "having a magnetic personality" in the everyday sense.' }
          ],
            remediations: { 'students-conflate-charismatic-authority-with': { steps: ['Ask the student to define "charisma" in everyday language vs. Weber\'s term. Write both on board.', 'Present Weber\'s original German *Charisma* = "Gnadengabe" (gift of grace) — a theological concept secularised.', 'Give two cases: (a) A YouTuber with 10M subscribers whom fans "love"; (b) A medieval saint claiming direct divine.', 'Establish the criterion: charismatic authority exists only where the leader\'s command carries *normative obligation*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_09_011', difficulty: 'standard',
          question: 'Bureaucracy, in Weber\'s formulation, is the institutional embodiment.',
          hint: 'Revisit c11_soc_cbse_09_010 for the three authority types and c11_soc_cbse_09_009 for.',
          misconception: 'Students conflate "bureaucracy" with "government office" and assume any hierarchical, rule-based organisation.',
          parts: [
                { id: 'a', prompt: 'State the five defining features of bureaucracy as identified by Max Weber, using the exact terminology from the NCERT text.', answer: 'The five features are: (i) Functioning of Officials',
                  options: ['The five features are: (i) Functioning of Officials', 'hierarchy, rules, impersonality', 'reliance on written documents', 'conduct in office'],
                  hint: 'Revisit c11_soc_cbse_09_010 for the three authority types and c11_soc_cbse_09_009 for ideal type.',
                  misconception: 'Students conflate "bureaucracy" with "government office" and assume any hierarchical, rule-based organisation is bureaucratic in Weber\'s.' },
                { id: 'b', prompt: 'Explain in your own words why Weber describes bureaucracy as the "embodiment" of rational-legal authority, rather than merely an example of it.', answer: 'Weber calls bureaucracy the *embodiment*',
                  options: ['Weber calls bureaucracy the *embodiment*', 'bureaucracy follows rational-legal authority', 'example', 'embodiment'],
                  hint: 'Revisit c11_soc_cbse_09_010 for the three authority types and c11_soc_cbse_09_009 for ideal type.',
                  misconception: 'Students conflate "bureaucracy" with "government office" and assume any hierarchical, rule-based organisation is bureaucratic in Weber\'s.' },
                { id: 'c', prompt: 'A private school principal admits students based on personal interviews and "gut feeling" about the family\'s values, ignoring the published admission criteria.', answer: 'Present features: (ii) Hierarchical Ordering',
                  options: ['Present features: (ii) Hierarchical Ordering', 'partially bureaucratic', 'mostly bureaucratic'],
                  hint: 'Revisit c11_soc_cbse_09_010 for the three authority types and c11_soc_cbse_09_009 for ideal type.',
                  misconception: 'Students conflate "bureaucracy" with "government office" and assume any hierarchical, rule-based organisation is bureaucratic in Weber\'s.' }
          ],
            remediations: { 'students-conflate-bureaucracy-with-government': { steps: ['Have the student re-read the NCERT paragraph "Bureaucratic authority is characterised by these features" (p.', 'Give three one-sentence organisational descriptions — a temple trust, a startup, a government department — and ask the.', 'For every ✗, ask: "Which authority type fills this gap?" forcing the student to name traditional/charismatic elements.', 'Assign a 150-word board-style answer: "Explain why a khap panchayat is not a bureaucracy despite having rules and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_09_012', difficulty: 'standard',
          question: 'Comparing Marx, Durkheim, and Weber involves systematically analyzing their.',
          hint: 'If stuck, return to the specific thinker\'s node (c11_soc_cbse_09_003 for Marx.',
          misconception: 'Students often treat the three thinkers as offering "different opinions on the same topic" like panelists on a talk.',
          parts: [
                { id: 'a', prompt: 'State the one core concept that each thinker uses to explain social order: Marx, Durkheim, and Weber.', answer: 'Marx: mode of production (economic base determining superstructure)',
                  options: ['Marx: mode of production (economic base determining superstructure)', 'Marx uses social facts'],
                  hint: 'If stuck, return to the specific thinker\'s node (c11_soc_cbse_09_003 for Marx, c11_soc_cbse_09_006.',
                  misconception: 'Students often treat the three thinkers as offering "different opinions on the same topic" like panelists on a talk show, leading them.' },
                { id: 'b', prompt: 'A new city metro system is built. Using each thinker\'s framework, write one sentence describing what the metro represents for (a) Marx, (b) Durkheim, (c) Weber.', answer: 'Marx, (',
                  options: ['Marx, (', 'it helps people travel', 'gives identical descriptions (e'],
                  hint: 'If stuck, return to the specific thinker\'s node (c11_soc_cbse_09_003 for Marx, c11_soc_cbse_09_006.',
                  misconception: 'Students often treat the three thinkers as offering "different opinions on the same topic" like panelists on a talk show, leading them.' }
          ],
            remediations: { 'students-often-treat-the-three': { steps: ['Have the student create three flashcards, each with the thinker\'s name, their *unique* unit of analysis (class, social.', 'Give a single newspaper headline (e.g., "Gig Workers Protest Algorithm Changes") and require the student to write three.', 'If the student smuggles in another thinker\'s term (e.g., uses "class" in Durkheim sentence), stop and ask "Which.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
