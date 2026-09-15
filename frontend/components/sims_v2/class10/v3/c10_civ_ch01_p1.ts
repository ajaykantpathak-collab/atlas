import type { SimDef } from '../../engine/types';

/** v3 generated — c10_civ_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_civ_ch01_p1: SimDef = {
    id: 'v3_c10_civ_ch01_p1',
    title: 'Power Sharing · Part 1/2',
    subtitle: 'Compare two countries that answered \'who rules?\' very differently',
    classLevel: 10, subject: 'civics', topic: 'Power Sharing · Part 1/2',
    chapters: ['c10_civ_ch01'],
    nodeIds: ['c10_civ_cbse_01_001', 'c10_civ_cbse_01_002', 'c10_civ_cbse_01_003', 'c10_civ_cbse_01_004', 'c10_civ_cbse_01_005', 'c10_civ_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a constitutional designer for a divided nation', intro: 'One country speaks Dutch and French; another is Sinhalese and Tamil. Both had to answer the same question: can the majority simply take everything?', goal: 'Contrast accommodation with majoritarianism and explain why sharing power is prudential AND moral.' },
    discovery: {
        question: 'Belgium ran 541 days with NO elected government — yet salaries were paid, courts sat, schools stayed open. Sri Lanka had a rock-solid majority government — and slid into civil war. What did Belgium get right?',
        options: ['It divided power so no community could be steamrolled — regions and community governments kept everyone inside the system', 'It had richer citizens who didn\'t need a government', 'Its army kept order while politicians argued', 'It got lucky — 541 days was a fluke, not a design'],
        answer: 'It divided power so no community could be steamrolled — regions and community governments kept everyone inside the system',
        hook: 'Majority rule without accommodation is a slow-burning fuse. Belgium rewrote its constitution four times to share power; Sri Lanka let one community hoard it — and paid with a war.',
    },
    teaching: [
        { title: 'Power Sharing in Belgium: The Accommodation Model', text: 'The Belgian accommodation model is a consociational power-sharing arrangement where the Dutch-speaking (Flemish), French-speaking (Walloon), and German-speaking communities share political power.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_civ_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Take a city split 60-40 between two language groups and design a power-sharing deal — then stress-test it against what happened in Sri Lanka.',
        labels: ['Power Sharing in Belgium', 'Power Sharing in Sri', 'Why Power Sharing', 'Forms of Power Sharing'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_civ_cbse_01_001', title: 'Power Sharing in Belgium: The Accommodation Model',
          caseStudy: { intro: 'Imagine you live in a city where 60% speak Language A and 40% speak Language B.',
            decisions: [{ prompt: 'What is the key feature of the Belgian central government\'s composition that ensures power sharing between Dutch and French speakers?', options: [
                { text: 'The Belgian Constitution mandates equal number of Dutch-speaking and French-speaking', outcome: 'The Belgian Constitution mandates equal number of Dutch-speaking and French-speaking ministers.' },
                { text: 'majority community gets more ministers', outcome: 'Not quite — Students think Belgium is a "federation like India" — they write "Belgium has states like India".', reveals: 'belgium-is-a-federation-like' },
                { text: 'federation like India', outcome: 'Not quite — Students think Belgium is a "federation like India" — they write "Belgium has states like India".', reveals: 'belgium-is-a-federation-like' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_01_002', title: 'Power Sharing in Sri Lanka: Majoritarianism and Its Consequences',
          caseStudy: { intro: 'Imagine you are a Tamil student in 1970s Jaffna: your older sibling scored higher marks than a Sinhalese peer but was denied university admission because of.',
            decisions: [{ prompt: 'What was the immediate political consequence of the 1956 Official Language Act (Sinhala Only) in Sri Lanka?', options: [
                { text: 'The Act made Sinhala the sole official language, effectively excluding Tamils from public', outcome: 'The Act made Sinhala the sole official language, effectively excluding Tamils from public sector.' },
                { text: 'it unified the country', outcome: 'Not quite — Students often write: "Sri Lanka\'s problem was ethnic hatred, not majoritarianism — Tamils also.', reveals: 'students-often-write-sri-lanka' },
                { text: 'it gave Tamil equal status', outcome: 'Not quite — Students often write: "Sri Lanka\'s problem was ethnic hatred, not majoritarianism — Tamils also.', reveals: 'students-often-write-sri-lanka' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_01_003', title: 'Why Power Sharing is Desirable: Prudential and Moral Reasons',
          caseStudy: { intro: 'Imagine you are part of a class WhatsApp group where a major decision about the annual fest theme is being made.',
            decisions: [{ prompt: 'Define \'prudential reasons\' for power sharing in your own words, and give one example from the Belgium case study that illustrates.', options: [
                { text: 'Prudential reasons are practical, outcome-based justifications: power sharing reduces', outcome: 'Prudential reasons are practical, outcome-based justifications: power sharing reduces conflict.' },
                { text: 'prudential means moral/ethical', outcome: 'Not quite — Students often think prudential and moral reasons are interchangeable or that one \'leads to\' the.', reveals: 'prudential-and-moral-reasons-are' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_01_004', title: 'Forms of Power Sharing: Horizontal Distribution (Legislature, Executive, Judiciary)',
          caseStudy: { intro: 'Imagine you see a news headline: "Supreme Court strikes down a law passed by Parliament." A Class 10 student might wonder — how can the Court cancel what.',
            decisions: [{ prompt: 'Name the three organs of government in horizontal power sharing and cite one constitutional article range for each at the Union level.', options: [
                { text: 'Legislature (Parliament)', outcome: 'Legislature (Parliament) — Articles 79-122; Executive (President, PM, Council of Ministers).' },
                { text: 'Prime Minister makes laws', outcome: 'Not quite — Students believe the Prime Minister and Cabinet (Executive) "make laws" because they introduce most.', reveals: 'the-prime-minister-and-cabinet' },
                { text: 'make laws', outcome: 'Not quite — Students believe the Prime Minister and Cabinet (Executive) "make laws" because they introduce most.', reveals: 'the-prime-minister-and-cabinet' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_01_005', title: 'Forms of Power Sharing: Vertical Division (Union, State, Local Government)',
          caseStudy: { intro: 'Imagine you see a pothole on the road outside your house. You call the municipal corporation, but they say it\'s a state highway; the state PWD says it\'s.',
            decisions: [{ prompt: 'What are the three lists in the Seventh Schedule of the Indian Constitution that distribute legislative powers between the Union and the.', options: [
                { text: 'The three lists are: Union List (List I), State List (List II), and Concurrent List (List', outcome: 'The three lists are: Union List (List I), State List (List II), and Concurrent List (List III).' },
                { text: 'Local List', outcome: 'Not quite — Students often believe that "Local Government" is a third *federal* tier with its own exclusive.', reveals: 'local-government-is-a-third' },
                { text: 'Central List', outcome: 'Not quite — Students often believe that "Local Government" is a third *federal* tier with its own exclusive.', reveals: 'local-government-is-a-third' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_01_006', title: 'Forms of Power Sharing: Among Social Groups and Political Parties',
          caseStudy: { intro: 'Imagine you are watching a news debate about a state election where no single party gets a majority, and two regional parties form a coalition to govern.',
            decisions: [{ prompt: 'What is the constitutional mechanism that ensures representation of Scheduled Castes and Scheduled Tribes in the Lok Sabha and State.', options: [
                { text: 'The Constitution provides for reserved constituencies under Articles 330 (Lok Sabha) and', outcome: 'The Constitution provides for reserved constituencies under Articles 330 (Lok Sabha) and 332 (State.' },
                { text: 'separate electorates', outcome: 'Not quite — Students often think "power sharing among social groups" means separate electorates (where only SCs.', reveals: 'power-sharing-among-social-groups' },
                { text: 'nomination by the President', outcome: 'Not quite — Students often think "power sharing among social groups" means separate electorates (where only SCs.', reveals: 'power-sharing-among-social-groups' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_01_001', title: 'A real-world call',
          caseStudy: { intro: 'A state with a linguistic minority must decide how to run its schools and government offices. The majority says one language unifies; the minority says it erases them.',
            decisions: [{ prompt: 'What does power-sharing actually demand here?', options: [
                { text: 'One official language for efficiency', outcome: 'Administratively simple — but \'unity by uniformity\' is exactly what power-sharing exists to prevent.' },
                { text: 'Two languages with equal status', outcome: 'Costlier and slower, but the minority\'s dignity is protected — the whole point of sharing power.' },
                { text: 'Local language locally, majority language for state functions', outcome: 'A federal-style compromise — works only if \'local functions\' aren\'t quietly made second-class.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A new school has two large language groups among its students. The student council, dominated by the bigger group, proposes that all school announcements, the canteen menu vote and the annual-day language be decided by simple majority — meaning the larger group wins everything, every time.',
            decisions: [{ prompt: 'What would a fairer arrangement, modelled on how Belgium handled its language divide, look like?', options: [
                { text: 'Guarantee both groups seats in the council, require decisions affecting each community to have that community\'s consent, and let each group run its own cultural affairs — Belgium\'s mix of equal representation, community governments and coalition rule shows how a minority can be protected instead of permanently overruled.', outcome: 'Belgium stayed stable because no group could rule alone: Dutch and French speakers share power at the centre, run their own community governments, and Brussels has special arrangements. The same logic stops a permanent majority at school.' },
                { text: 'Simple majority is the fairest system possible — if most students agree, the minority should accept whatever is decided.', outcome: 'Permanent majority rule in a divided group means one community never wins anything — exactly the resentment that majoritarianism created in Sri Lanka and that Belgium designed its constitution to avoid.', reveals: 'majority-always-fair' },
                { text: 'The only fair fix is to split the school into two separate schools, one for each language group.', outcome: 'Separation is not the only answer — Belgium kept one country intact while giving each community autonomy and shared power at the centre.', reveals: 'only-separation-works' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Power sharing isn\'t weakness — it\'s the load-bearing wall of a diverse country. Belgium proves a state can pause its government without breaking; Sri Lanka proves the alternative.',
            decisions: [{ prompt: 'What comes next? Power Sharing · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Power Sharing · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_civ_cbse_01_001', difficulty: 'standard',
          question: 'The Belgian accommodation model is a consociational power-sharing arrangement.',
          hint: 'Revisit c9_civ_ch1_9 (Federalism and Decentralisation) and c6_civics_ch14_029 (Linguistic.',
          misconception: 'Students think Belgium is a "federation like India" — they write "Belgium has states like India" and miss that Belgium.',
          parts: [
                { id: 'a', prompt: 'A new law proposes making Dutch the sole language of instruction in all Brussels public schools.', answer: 'Education falls under Community Governments (cultural/educational matters)',
                  options: ['Education falls under Community Governments (cultural/educational matters)', 'federation like India', 'Belgium has states like India'],
                  hint: 'Revisit c9_civ_ch1_9 (Federalism and Decentralisation) and c6_civics_ch14_029 (Linguistic.',
                  misconception: 'Students think Belgium is a "federation like India" — they write "Belgium has states like India" and miss that Belgium has *two parallel.' }
          ],
            remediations: { 'belgium-is-a-federation-like': { steps: ['Draw a 2x2 table: Rows = Regions (Flanders, Wallonia, Brussels), Columns = Communities (Flemish, French, German).', 'Fill competences: Regions → economy, transport, environment; Communities → education, culture, language.', 'Note Brussels appears in *both* Flemish and French Community columns.', 'Read NCERT Class 10 Democratic Politics Ch.1 Box 1.2 "The Belgian Model" — it explicitly lists this matrix.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think Belgium is a "federation like India" — they write "Belgium has states like India" and miss that Belgium.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "The Belgian model is inefficient because every decision requires consensus between communities." Is this a valid criticism for a board exam answer?', answer: 'No — board exam answers must distinguish *efficiency* from *legitimacy*',
                  options: ['No — board exam answers must distinguish *efficiency* from *legitimacy*', 'federation like India', 'Belgium has states like India'],
                  hint: 'Revisit c9_civ_ch1_9 (Federalism and Decentralisation) and c6_civics_ch14_029 (Linguistic.',
                  misconception: 'Students think Belgium is a "federation like India" — they write "Belgium has states like India" and miss that Belgium has *two parallel.' }
          ],
            remediations: { 'belgium-is-a-federation-like': { steps: ['Draw a 2x2 table: Rows = Regions (Flanders, Wallonia, Brussels), Columns = Communities (Flemish, French, German).', 'Fill competences: Regions → economy, transport, environment; Communities → education, culture, language.', 'Note Brussels appears in *both* Flemish and French Community columns.', 'Read NCERT Class 10 Democratic Politics Ch.1 Box 1.2 "The Belgian Model" — it explicitly lists this matrix.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_01_002', difficulty: 'standard',
          question: 'Majoritarianism in Sri Lanka refers to the political doctrine where the.',
          hint: 'If stuck, revisit **c10_civ_cbse_01_001 (Belgium)** to see how community governments.',
          misconception: 'Students often write: "Sri Lanka\'s problem was ethnic hatred, not majoritarianism — Tamils also wanted separation.".',
          parts: [
                { id: 'a', prompt: 'A new law in a fictional country requires all government jobs to be filled only by candidates who pass a history exam focused exclusively on the majority.', answer: 'This mirrors Sri Lanka\'s university standardization (1971)',
                  options: ['This mirrors Sri Lanka\'s university standardization (1971)', 'it promotes national unity', 'it\'s fair affirmative action'],
                  hint: 'If stuck, revisit **c10_civ_cbse_01_001 (Belgium)** to see how community governments work, and.',
                  misconception: 'Students often write: "Sri Lanka\'s problem was ethnic hatred, not majoritarianism — Tamils also wanted separation." This confuses **outcome.' },
                { id: 'b', prompt: 'Compare the Belgian and Sri Lankan approaches to linguistic diversity.', answer: 'Belgium created **community governments** (elected by language communities',
                  options: ['Belgium created **community governments** (elected by language communities', 'Belgium is richer', 'Sri Lanka is smaller'],
                  hint: 'If stuck, revisit **c10_civ_cbse_01_001 (Belgium)** to see how community governments work, and.',
                  misconception: 'Students often write: "Sri Lanka\'s problem was ethnic hatred, not majoritarianism — Tamils also wanted separation." This confuses **outcome.' }
          ],
            remediations: { 'students-often-write-sri-lanka': { steps: ['If the student conflates cause and effect: (1) Have them construct a **timeline** (1948, 1956, 1958, 1971, 1972, 1977.', '(2) Use the **1957 Bandaranaike-Chelvanayakam Pact** as a "what if" — it offered regional councils; Sinhalese.', 'Ask: "Who had the power to share power?" (3) Contrast with **India\'s linguistic states (1956)** — same diversity.', 'This shifts focus from "ethnic hatred" to "institutional design."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_01_003', difficulty: 'standard',
          question: 'Prudential reasons for power sharing emphasize its practical benefits:.',
          hint: 'Revisit c9_civ_ch1_1 (Democracy definition) and c10_civ_cbse_01_001/c10_civ_cbse_01_002.',
          misconception: 'Students often think prudential and moral reasons are interchangeable or that one \'leads to\' the other.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Prudential reasons for power sharing emphasize its practical benefits: it reduces the',
                  options: ['Prudential reasons for power sharing emphasize its practical benefits: it reduces the', 'The Belgian accommodation model is a consociational power-sharing arrangement where the', 'Majoritarianism in Sri Lanka refers to the political doctrine where the Sinhalese', 'Horizontal distribution of power refers to the separation of powers among the three'],
                  hint: 'Revisit c9_civ_ch1_1 (Democracy definition) and c10_civ_cbse_01_001/c10_civ_cbse_01_002.',
                  misconception: 'Students often think prudential and moral reasons are interchangeable or that one \'leads to\' the other.' }
          ],
            remediations: { 'prudential-and-moral-reasons-are': { steps: ['Re-read the Belgium (c10_civ_cbse_01_001) and Sri Lanka (c10_civ_cbse_01_002) case studies.', 'Identify *one specific principle* violated or upheld in each (Belgium: equal partnership; Sri Lanka: majoritarian.', 'Create a two-column table: Column A = Prudential (keywords: stability, conflict prevention, practical outcome); Column.', 'Practice writing the distinction in 3 sentences max — this is the exact board exam answer format.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_01_004', difficulty: 'standard',
          question: 'Horizontal distribution of power refers to the separation of powers among the.',
          hint: 'Revisit c7_civ_ch03_002 (Three Organs) and c8_civ_ch2_12 (Separation of Powers) — focus.',
          misconception: 'Students believe the Prime Minister and Cabinet (Executive) "make laws" because they introduce most Bills and have.',
          parts: [
                { id: 'a', prompt: 'Name the three organs of government in horizontal power sharing and cite one constitutional article range for each at the Union level.', answer: 'Legislature (Parliament)',
                  options: ['Legislature (Parliament)', 'Prime Minister makes laws', 'make laws', 'the head of government legislates'],
                  hint: 'Revisit c7_civ_ch03_002 (Three Organs) and c8_civ_ch2_12 (Separation of Powers) — focus on the.',
                  misconception: 'Students believe the Prime Minister and Cabinet (Executive) "make laws" because they introduce most Bills and have majority support.' },
                { id: 'b', prompt: 'A new law passed by Parliament requires all social media platforms to remove "anti-national" content within 24 hours without a court order.', answer: 'Parliament (Legislature) made the law',
                  options: ['Parliament (Legislature) made the law', 'the Ministry made the law', 'make laws'],
                  hint: 'Revisit c7_civ_ch03_002 (Three Organs) and c8_civ_ch2_12 (Separation of Powers) — focus on the.',
                  misconception: 'Students believe the Prime Minister and Cabinet (Executive) "make laws" because they introduce most Bills and have majority support.' }
          ],
            remediations: { 'the-prime-minister-and-cabinet': { steps: ['Re-read Article 79 ("There shall be a Parliament...") and Article 75 ("Council of Ministers to aid and advise.', 'Watch a 5-minute Sansad TV clip of Question Hour — see Ministers *answering* to MPs, not commanding them.', 'Write one sentence each: "Only Parliament can ______" (make/amend/repeal laws); "Executive can only ______" (issue.', 'Practice a past board question: "Distinguish between the legislative and executive functions with examples."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_01_005', difficulty: 'standard',
          question: 'Vertical division of power refers to the constitutional distribution.',
          hint: 'If stuck, revisit Class 9 node c9_civ_ch1_9 (Federalism and Decentralisation) and Class 6.',
          misconception: 'Students often believe that "Local Government" is a third *federal* tier with its own exclusive list of subjects in the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vertical division of power refers to the constitutional distribution of legislative,',
                  options: ['Vertical division of power refers to the constitutional distribution of legislative,', 'The Belgian accommodation model is a consociational power-sharing arrangement where the', 'Majoritarianism in Sri Lanka refers to the political doctrine where the Sinhalese', 'Prudential reasons for power sharing emphasize its practical benefits: it reduces the'],
                  hint: 'If stuck, revisit Class 9 node c9_civ_ch1_9 (Federalism and Decentralisation) and Class 6 node.',
                  misconception: 'Students often believe that "Local Government" is a third *federal* tier with its own exclusive list of subjects in the Constitution.' }
          ],
            remediations: { 'local-government-is-a-third': { steps: ['Re-read Article 243G and 243W — note the phrase "subject to the provisions of this Constitution, the Legislature of.', 'Compare the Seventh Schedule (Union/State/Concurrent Lists) with the Eleventh/Twelfth Schedules — the latter are *only.', 'Analyze a State Panchayati Raj Act (e.g., Karnataka Panchayat Raj Act, 1993) to see how the State Legislature actually.', 'Practice a board-style question: "Distinguish between the constitutional status of State Governments and Local.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_01_006', difficulty: 'standard',
          question: 'Power sharing among social groups refers to constitutional and institutional.',
          hint: 'If stuck, revisit Article 330/332 (reserved seats), the Poona Pact 1932 (why joint.',
          misconception: 'Students often think "power sharing among social groups" means separate electorates (where only SCs vote for.',
          parts: [
                { id: 'a', prompt: 'Compare the Belgian \'community government\' model with India\'s \'reserved constituencies\' for social group power sharing.', answer: 'Belgium\'s community government (elected by one language community',
                  options: ['Belgium\'s community government (elected by one language community', 'both are the same', 'reserved constituencies give more autonomy', 'power sharing among social groups'],
                  hint: 'If stuck, revisit Article 330/332 (reserved seats), the Poona Pact 1932 (why joint electorate), and.',
                  misconception: 'Students often think "power sharing among social groups" means separate electorates (where only SCs vote for SC candidates), but India uses.' }
          ],
            remediations: { 'power-sharing-among-social-groups': { steps: ['Re-read the Poona Pact (1932) and Constituent Assembly debates on reserved vs separate electorates (link.', 'Create a two-column table: "Reserved Constituencies (India)" vs "Separate Electorates (Colonial/Communal Award)" — list.', 'Track a recent coalition government (e.g., Maharashtra 2019 or Bihar 2022) — note how ministerial berths were shared.', 'Contrast with Belgium\'s community government (c10_civ_cbse_01_001) — note it is elected by language community, not.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
