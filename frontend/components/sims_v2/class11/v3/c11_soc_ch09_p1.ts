import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch09_p1: SimDef = {
    id: 'v3_c11_soc_ch09_p1',
    title: 'Introducing Western Sociologists · Part 1/2',
    subtitle: 'See three revolutions as one engine with three parts.',
    classLevel: 11, subject: 'sociology', topic: 'Introducing Western Sociologists · Part 1/2',
    chapters: ['c11_soc_ch09'],
    nodeIds: ['c11_soc_cbse_09_001', 'c11_soc_cbse_09_002', 'c11_soc_cbse_09_003', 'c11_soc_cbse_09_004', 'c11_soc_cbse_09_005', 'c11_soc_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a historian of ideas assembling sociology\'s engine', intro: 'Reason as method, the sovereign individual as subject, industrial pathology as object — three gifts, one discipline.', goal: 'Explain sociology\'s birth through the method–subject–object triad and state demand for knowledge.' },
    discovery: {
        question: 'Sociology was born because Enlightenment, then Revolution, then Industry happened in sequence — a tidy timeline?',
        options: ['It\'s a triad, not a timeline — Enlightenment gave the method, the French Revolution the subject, the Industrial Revolution the object', 'Yes — history happened first, sociology after', 'Yes — Europe changed faster, so sociology started there', 'No — it was invented by one founder'],
        answer: 'It\'s a triad, not a timeline — Enlightenment gave the method, the French Revolution the subject, the Industrial Revolution the object',
        hook: 'Marx\'s exile wasn\'t biography trivia — the British Museum Reading Room\'s factory reports and Hansard debates are the empirical spine of Capital.',
    },
    teaching: [
        { title: 'The Enlightenment, French Revolution and Industrial Revolution as the Context for Sociological Thought', text: 'The Enlightenment (late 17th–18th century), French Revolution (1789), and Industrial Revolution (late 18th–early 19th century) constitute the three foundational historical processes that transformed.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_09_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Match each revolution to its epistemic gift, then argue whether the Manifesto is a pamphlet for history or a text for sociology.',
        labels: ['The Enlightenment, French Revolution', 'Karl Marx: Biography', 'Marx\'s Mode of Production,', 'Marx\'s Concept of Alienation', 'Emile Durkheim: Biography', 'Durkheim\'s Social Facts'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_09_001', title: 'The Enlightenment, French Revolution and Industrial Revolution as the Context for Sociological Thought',
          caseStudy: { intro: 'Imagine you wake up in a village in 1750 France: your life is governed by the church calendar, your labour belongs to the seigneur, and you\'ve never travelled.',
            decisions: [{ prompt: 'Name the three revolutions identified in the NCERT text as creating the context for sociology\'s emergence, and state the century in which.', options: [
                { text: 'The three revolutions are: (1) The Enlightenment (or scientific revolution), (2) The', outcome: 'The three revolutions are: (1) The Enlightenment (or scientific revolution), (2) The French.' },
                { text: 'the American Revolution or Russian Revolution, or saying 18th century', outcome: 'Not quite — Students treat the three revolutions as a chronological LIST rather than a CONCEPTUAL TRIAD where.', reveals: 'students-treat-the-three-revolutions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_09_002', title: 'Karl Marx: Biography and Intellectual Formation',
          caseStudy: { intro: 'Imagine a 26-year-old journalist in 1844 Paris, sitting in a café with a German textile manufacturer\'s son, arguing late into the night about why French.',
            decisions: [{ prompt: 'Identify the three distinct intellectual traditions that Marx synthesized, and name one key figure from each tradition who directly.', options: [
                { text: 'The three traditions are: (1) German classical philosophy', outcome: 'The three traditions are: (1) German classical philosophy — G.W.F.' },
                { text: 'Hegel and Engels', outcome: 'Not quite — Students routinely treat Marx\'s biography as a timeline of events (birth, thesis, marriage, exile.', reveals: 'students-routinely-treat-marx-s' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_09_003', title: 'Marx\'s Mode of Production, Class Struggle and Base-Superstructure Model',
          caseStudy: { intro: 'Imagine you are watching a news report about gig economy workers (delivery partners, ride-share drivers) protesting for better pay and algorithmic.',
            decisions: [{ prompt: 'Define \'Mode of Production\' in Marx\'s theory and name the two core components that constitute it.', options: [
                { text: 'Correct answer: Mode of Production is a historically specific system of material', outcome: 'Correct answer: Mode of Production is a historically specific system of material production.' },
                { text: 'factories and workers', outcome: 'Not quite — Students often equate Marx\'s \'class\' with income brackets or lifestyle categories (e.g., \'middle.', reveals: 'students-often-equate-marx-s' },
                { text: 'Doctors and factory workers can\'t be same class', outcome: 'Not quite — Students often equate Marx\'s \'class\' with income brackets or lifestyle categories (e.g., \'middle.', reveals: 'students-often-equate-marx-s' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_09_004', title: 'Marx\'s Concept of Alienation Under Capitalism',
          caseStudy: { intro: 'Imagine a young worker in a smartphone assembly plant in Tamil Nadu who spends 12 hours a day placing tiny screws into devices she will never afford, following.',
            decisions: [{ prompt: 'State the four dimensions of alienation identified by Marx in capitalist society.', options: [
                { text: 'The four dimensions are: (1) alienation from the product of labour, (2) alienation from', outcome: 'The four dimensions are: (1) alienation from the product of labour, (2) alienation from the labour.' },
                { text: 'feeling unhappy', outcome: 'Not quite — Students often equate alienation with "feeling unhappy at work" or "psychological dissatisfaction,".', reveals: 'students-often-equate-alienation-with' },
                { text: 'exploitation', outcome: 'Not quite — Students often equate alienation with "feeling unhappy at work" or "psychological dissatisfaction,".', reveals: 'students-often-equate-alienation-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_09_005', title: 'Emile Durkheim: Biography and the Establishment of Sociology as an Academic Discipline',
          caseStudy: { intro: 'Imagine you are a university administrator in 1910 deciding whether to create a new department called "Sociology." What would you need to convince your.',
            decisions: [{ prompt: 'State the exact year Durkheim was appointed to the first Chair of Sociology at the University of Paris and the name of the journal.', options: [
                { text: 'Correct answer: Durkheim was appointed to the Chair of Education (later renamed Education', outcome: 'Correct answer: Durkheim was appointed to the Chair of Education (later renamed Education and.' },
                { text: 'invented', outcome: 'Not quite — Students often believe Durkheim "invented" sociology single-handedly in France, ignoring that (a).', reveals: 'durkheim-invented-sociology-single-handedly' },
                { text: 'social science', outcome: 'Not quite — Students often believe Durkheim "invented" sociology single-handedly in France, ignoring that (a).', reveals: 'durkheim-invented-sociology-single-handedly' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing sociology\'s origin story, a student lists: \'First Enlightenment, then French Revolution, then Industrial Revolution — then sociology was born.\' On Marx he recites dates: \'exiled to London in 1849, poor, died 1883.\'',
            decisions: [{ prompt: 'What analytical structure does the history actually have?', options: [
                { text: 'Read the triad by function, not sequence: Enlightenment supplied the METHOD (reason and empiricism), the French Revolution the SUBJECT (sovereign individual and nation-state), the Industrial Revolution the OBJECT (industrial society\'s pathologies) — together they made a science of society necessary. And Marx\'s biography is intellectual genesis: the British Museum gave him Factory Reports and Hansard — the empirical base of Capital — and his poverty grounded the theory of immiseration.', outcome: 'The story becomes analysis: three simultaneous conditions of possibility, and a life whose circumstances supplied the theory\'s data and stakes.' },
                { text: 'Keep the timeline — history is sequence, and sociology came after.', outcome: 'Chronology lists events; the triad explains WHY sociology had to exist — each revolution filled an epistemic gap the discipline was built to answer.', reveals: 'origins-as-chronology' },
                { text: 'Keep the biographical facts as colour — his life is backdrop, his books are the theory.', outcome: 'The conditions produced the concepts: London\'s archives supplied the data and lived immiseration the framework — chronology isn\'t intellectual genesis.', reveals: 'biography-is-just-timeline' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'The modern state needed to govern health, crime and \'development\' — and that demand for new knowledge is where sociology came from.',
            decisions: [{ prompt: 'What comes next? Introducing Western Sociologists · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Introducing Western Sociologists · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_09_001', difficulty: 'standard',
          question: 'The Enlightenment (late 17th–18th century), French Revolution (1789), and.',
          hint: 'Revisit c10_hist_cbse_01_001 (French Revolution\'s nation-state) and c10_hist_cbse_04_002.',
          misconception: 'Students treat the three revolutions as a chronological LIST rather than a CONCEPTUAL TRIAD where each solves.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Enlightenment (late 17th–18th century), French Revolution (1789), and Industrial',
                  options: ['The Enlightenment (late 17th–18th century), French Revolution (1789), and Industrial', 'Karl Marx\'s intellectual formation refers to the specific historical, philosophical, and', 'Marx\'s Mode of Production is a historically specific system of material production', 'Marx\'s concept of alienation under capitalism refers to the structural process by'],
                  hint: 'Revisit c10_hist_cbse_01_001 (French Revolution\'s nation-state) and c10_hist_cbse_04_002 (factory.',
                  misconception: 'Students treat the three revolutions as a chronological LIST rather than a CONCEPTUAL TRIAD where each solves a specific epistemic gap.' }
          ],
            remediations: { 'students-treat-the-three-revolutions': { steps: ['Draw a three-circle Venn diagram labelled METHOD, SUBJECT, OBJECT.', 'Place each revolution in its primary circle (Enlightenment→Method, French Revolution→Subject, Industrial.', 'In the overlaps, write: Method+Subject = "secular citizen"; Subject+Object = "urban worker-citizen"; Method+Object.', 'Have student orally explain each overlap using NCERT phrases ("secular, scientific and humanistic", "sovereign.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_09_002', difficulty: 'standard',
          question: 'Karl Marx\'s intellectual formation refers to the specific historical.',
          hint: 'Revisit c11_soc_cbse_09_001 and complete Activity 1: list three specific changes each.',
          misconception: 'Students routinely treat Marx\'s biography as a timeline of events (birth, thesis, marriage, exile, death) rather than.',
          parts: [
                { id: 'a', prompt: 'Identify the three distinct intellectual traditions that Marx synthesized, and name one key figure from each tradition who directly influenced him.', answer: 'The three traditions are: (1) German classical philosophy',
                  options: ['The three traditions are: (1) German classical philosophy', 'Hegel and Engels'],
                  hint: 'Revisit c11_soc_cbse_09_001 and complete Activity 1: list three specific changes each revolution.',
                  misconception: 'Students routinely treat Marx\'s biography as a timeline of events (birth, thesis, marriage, exile, death) rather than as the *conditions.' },
                { id: 'b', prompt: 'Marx\'s doctoral thesis (1841) analysed the difference between Democritean and Epicurean philosophy of nature.', answer: 'The thesis defends Epicurus\'s "clinamen" (atomic swerve) as a principle of',
                  options: ['The thesis defends Epicurus\'s "clinamen" (atomic swerve) as a principle of', 'early Marxism', 'materialist philosopher'],
                  hint: 'Revisit c11_soc_cbse_09_001 and complete Activity 1: list three specific changes each revolution.',
                  misconception: 'Students routinely treat Marx\'s biography as a timeline of events (birth, thesis, marriage, exile, death) rather than as the *conditions.' },
                { id: 'c', prompt: 'Compare the intellectual formation of Marx and Durkheim (c11_soc_cbse_09_005) on three dimensions: (a) disciplinary training, (b) relationship to the.', answer: 'disciplinary training, (',
                  options: ['disciplinary training, (', 'both studied society', 'both were German'],
                  hint: 'Revisit c11_soc_cbse_09_001 and complete Activity 1: list three specific changes each revolution.',
                  misconception: 'Students routinely treat Marx\'s biography as a timeline of events (birth, thesis, marriage, exile, death) rather than as the *conditions.' }
          ],
            remediations: { 'students-routinely-treat-marx-s': { steps: ['If the student cannot link biography to theory, do this 3-step remediation: (1) Give them a two-column table: Column.', 'Have them fill Column B using the textbook.', '(2) Ask: "Which concept would be *impossible* without this event?" (e.g., no Factory Reports → no empirical basis for.', '(3) Assign a 150-word micro-essay: "Marx\'s theory is the theoretical expression of his material conditions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students routinely treat Marx\'s biography as a timeline of events (birth, thesis, marriage, exile, death) rather than.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Communist Manifesto (1848) is best understood as a political pamphlet, not a sociological text, and therefore belongs to history, not.', answer: 'The claim is partially true but sociologically reductive',
                  options: ['The claim is partially true but sociologically reductive', 'it\'s propaganda', 'it\'s pure science'],
                  hint: 'Revisit c11_soc_cbse_09_001 and complete Activity 1: list three specific changes each revolution.',
                  misconception: 'Students routinely treat Marx\'s biography as a timeline of events (birth, thesis, marriage, exile, death) rather than as the *conditions.' }
          ],
            remediations: { 'students-routinely-treat-marx-s': { steps: ['If the student cannot link biography to theory, do this 3-step remediation: (1) Give them a two-column table: Column.', 'Have them fill Column B using the textbook.', '(2) Ask: "Which concept would be *impossible* without this event?" (e.g., no Factory Reports → no empirical basis for.', '(3) Assign a 150-word micro-essay: "Marx\'s theory is the theoretical expression of his material conditions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_09_003', difficulty: 'standard',
          question: 'Marx\'s Mode of Production is a historically specific system of material.',
          hint: 'Revisit c11_soc_cbse_09_001 (Industrial Revolution section) and identify: what changed.',
          misconception: 'Students often equate Marx\'s \'class\' with income brackets or lifestyle categories (e.g., \'middle class\' = salaried.',
          parts: [
                { id: 'a', prompt: 'Define \'Mode of Production\' in Marx\'s theory and name the two core components that constitute it.', answer: 'Correct answer: Mode of Production is a historically specific system of material',
                  options: ['Correct answer: Mode of Production is a historically specific system of material', 'factories and workers', 'Doctors and factory workers can\'t be same class'],
                  hint: 'Revisit c11_soc_cbse_09_001 (Industrial Revolution section) and identify: what changed in *how*.',
                  misconception: 'Students often equate Marx\'s \'class\' with income brackets or lifestyle categories (e.g., \'middle class\' = salaried professionals).' }
          ],
            remediations: { 'students-often-equate-marx-s': { steps: ['Ask the student to list what the software engineer *owns* that generates income without working (answer: nothing — they.', 'Ask what happens if they stop working (answer: income stops — they must sell labour-power to survive).', 'Contrast with a capitalist who owns shares in the tech company — income flows from ownership regardless of work.', 'Re-read NCERT p.70: "people who occupy the same position in the social production process will eventually form.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_09_004', difficulty: 'standard',
          question: 'Marx\'s concept of alienation under capitalism refers to the structural process.',
          hint: 'Revisit node c11_soc_cbse_09_003 on mode of production and class struggle, focusing.',
          misconception: 'Students often equate alienation with "feeling unhappy at work" or "psychological dissatisfaction," treating it as.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Marx\'s concept of alienation under capitalism refers to the structural process by',
                  options: ['Marx\'s concept of alienation under capitalism refers to the structural process by', 'The Enlightenment (late 17th–18th century), French Revolution (1789), and Industrial', 'Karl Marx\'s intellectual formation refers to the specific historical, philosophical, and', 'Marx\'s Mode of Production is a historically specific system of material production'],
                  hint: 'Revisit node c11_soc_cbse_09_003 on mode of production and class struggle, focusing on the.',
                  misconception: 'Students often equate alienation with "feeling unhappy at work" or "psychological dissatisfaction," treating it as an individual emotional.' }
          ],
            remediations: { 'students-often-equate-alienation-with': { steps: ['Ask the student to re-read the NCERT paragraph listing the four levels of alienation (page 69).', 'Have them create a two-column table: left column = "Everyday meaning of alienation," right column = "Marx\'s structural.', 'For each of the four dimensions, give a concrete Indian workplace example (e.g., brick-kiln worker, IT employee, street.', 'Emphasise: "Alienation is not a feeling; it is a set of social relations.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_09_005', difficulty: 'standard',
          question: 'Emile Durkheim (1858–1917) was a French sociologist who formally established.',
          hint: 'Revisit c11_soc_cbse_09_001 and identify the three "intellectual consequences" of the.',
          misconception: 'Students often believe Durkheim "invented" sociology single-handedly in France, ignoring that (a) Comte coined the term.',
          parts: [
                { id: 'a', prompt: 'A Class 11 student claims: "Durkheim\'s concept of social facts is just a fancy term for \'culture\' or \'norms\'." Using Durkheim\'s two defining criteria.', answer: 'Correct answer steps: 1',
                  options: ['Correct answer steps: 1', 'invented', 'social science', 'pedagogy'],
                  hint: 'Revisit c11_soc_cbse_09_001 and identify the three "intellectual consequences" of the three.',
                  misconception: 'Students often believe Durkheim "invented" sociology single-handedly in France, ignoring that (a) Comte coined the term and Spencer.' },
                { id: 'b', prompt: 'Compare Durkheim\'s and Marx\'s views on the division of labour as presented in the NCERT text.', answer: 'Correct answer: - Agreement: Both see the division of labour as increasing',
                  options: ['Correct answer: - Agreement: Both see the division of labour as increasing', 'Durkheim = solidarity, Marx = conflict', 'invented', 'social science'],
                  hint: 'Revisit c11_soc_cbse_09_001 and identify the three "intellectual consequences" of the three.',
                  misconception: 'Students often believe Durkheim "invented" sociology single-handedly in France, ignoring that (a) Comte coined the term and Spencer.' }
          ],
            remediations: { 'durkheim-invented-sociology-single-handedly': { steps: ['Ask the student to list three things that existed *before* Durkheim that he built upon (e.g., Comte\'s positivism.', 'Have them read the 1895 *Rules* preface where Durkheim acknowledges predecessors and defines his *specific*.', 'Map a timeline: 1838 (Comte coins \'sociology\') → 1876 (Durkheim enters ENS) → 1887 (Bordeaux lectureship in \'social.', 'Require the student to rewrite the claim as: "Durkheim *institutionalised* sociology as a university science in France.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_09_006', difficulty: 'standard',
          question: 'Social facts are patterns of behaviour, beliefs, and institutions that exist.',
          hint: 'Revisit c11_soc_cbse_09_005 (Durkheim\'s biography) and c11_soc_cbse_09_001 (three.',
          misconception: 'Students frequently equate \'social fact\' with \'social norm\' or \'custom\', treating them as interchangeable.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Social facts are patterns of behaviour, beliefs, and institutions that exist externally',
                  options: ['Social facts are patterns of behaviour, beliefs, and institutions that exist externally', 'The Enlightenment (late 17th–18th century), French Revolution (1789), and Industrial', 'Karl Marx\'s intellectual formation refers to the specific historical, philosophical, and', 'Marx\'s Mode of Production is a historically specific system of material production'],
                  hint: 'Revisit c11_soc_cbse_09_005 (Durkheim\'s biography) and c11_soc_cbse_09_001 (three revolutions).',
                  misconception: 'Students frequently equate \'social fact\' with \'social norm\' or \'custom\', treating them as interchangeable.' }
          ],
            remediations: { 'students-frequently-equate-social-fact': { steps: ['If a student conflates social facts with norms, do this 3-step remediation: (1) **Concrete contrast**: Write two.', 'Ask: Which exists if everyone stops believing the norm?', '(The rate persists; the norm vanishes.) (2) **Constraint test**: Ask: \'Can you choose to ignore the homicide rate?\'.', '(3) **Re-read Durkheim**: Assign *Rules of Sociological Method*, pp.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
