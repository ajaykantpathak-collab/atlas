import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch12_p1: SimDef = {
    id: 'v3_c12_soc_ch12_p1',
    title: 'Change and Development in Industrial Society · Part 1/2',
    subtitle: 'The machine didn\'t just make cloth — it remade the worker',
    classLevel: 12, subject: 'sociology', topic: 'Change and Development in Industrial Society · Part 1/2',
    chapters: ['c12_soc_ch12'],
    nodeIds: ['c12_soc_cbse_12_001', 'c12_soc_cbse_12_002', 'c12_soc_cbse_12_003', 'c12_soc_cbse_12_004', 'c12_soc_cbse_12_005', 'c12_soc_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Labour sociologist', intro: 'The saree and the polyester shirt carry different histories: one of a maker, one of a pair of hands.', goal: 'Analyse the handicraft-to-factory shift as social change and identify India\'s distinct informal-sector trajectory.' },
    discovery: {
        question: 'A Bengal weaver picks the pattern, sets the pace, owns the loom and the cloth. A Tirupur machinist stitches one seam, shift-timed, for a wage, and never sees the finished shirt. Same industry — what actually changed?',
        options: ['Control over the labour process itself — the artisan owns tools and product; the worker sells labour-power and answers to the machine\'s pace', 'Nothing but the technology', 'Only the wages', 'The factory worker is more skilled'],
        answer: 'Control over the labour process itself — the artisan owns tools and product; the worker sells labour-power and answers to the machine\'s pace',
        hook: 'India never replayed the European script — colonial rule destroyed handicrafts without building factories to absorb the artisans, and nine in ten Indian workers still labour informally. Bidi rollers at home are industrial workers who never see a factory.',
    },
    teaching: [
        { title: 'Industrialisation as a Process of Social Change: From Handicraft to Factory', text: 'Industrialisation as a process of social change refers to the structural transformation of production from decentralized, skill-based handicraft systems (where artisans control tools, raw materials.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_12_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Contrast the handloom with the assembly line across control, product and hierarchy — then map why India\'s version runs on contract labour and home-based piece rates.',
        labels: ['Industrialisation as a Process', 'The Industrial Revolution', 'Industrialisation in India', 'The Growth of', 'The Informalisation of', 'Trade Unions in India'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_12_001', title: 'Industrialisation as a Process of Social Change: From Handicraft to Factory',
          caseStudy: { intro: 'Imagine you are holding a handloom cotton saree woven in a village in Bengal and a mass-produced polyester shirt from a factory in Tirupur.',
            decisions: [{ prompt: 'What is the fundamental difference between a handicraft artisan and a factory worker in terms of control over the labor process?', options: [
                { text: 'A handicraft artisan owns/controls tools, decides the sequence and pace of work, and', outcome: 'A handicraft artisan owns/controls tools, decides the sequence and pace of work, and bears.' },
                { text: 'both use tools to make things', outcome: 'Not quite — Students often equate "industrialisation" with "factory buildings and machines" and assume the.', reveals: 'students-often-equate-industrialisation-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_12_002', title: 'The Industrial Revolution in Europe and Its Social Consequences',
          caseStudy: { intro: 'Start by asking: "Imagine you are a peasant in 18th century England working on a lord\'s land.',
            decisions: [{ prompt: 'What is the primary social change associated with the Industrial Revolution in Europe according to classical sociologists like Marx.', options: [
                { text: 'The primary social change is the shift from feudal, agrarian societies with face-to-face', outcome: 'The primary social change is the shift from feudal, agrarian societies with face-to-face.' },
                { text: 'focuses only on technological inventions (e', outcome: 'Not quite — Students often think the Industrial Revolution was only about machines and factories, and that its.', reveals: 'the-industrial-revolution-was-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_12_004', title: 'The Growth of the Working Class: Composition, Wages and Working Conditions',
          caseStudy: { intro: 'Imagine a 14-year-old girl rolling bidis in a forested village in Madhya Pradesh and a 35-year-old male technician on the Maruti assembly line in Gurugram.',
            decisions: [{ prompt: 'According to the NCERT, what percentage of India\'s workforce was employed in the primary sector (agriculture and mining) in 2018–19, and.', options: [
                { text: 'In 2018–19, 42.5% of India\'s workforce was employed in agriculture and mining (primary', outcome: 'In 2018–19, 42.5% of India\'s workforce was employed in agriculture and mining (primary sector).' },
                { text: 'majority in services', outcome: 'Not quite — Students often treat "working class" as synonymous with "factory workers" or "poor people,".', reveals: 'students-often-treat-working-class' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_12_005', title: 'The Informalisation of the Workforce: Contract Labour, Casualisation and the Unorganised Sector',
          caseStudy: { intro: 'Imagine you order food via a delivery app — the rider arrives on a motorcycle, no uniform, no ID card visible, paid per delivery, no provident fund, no paid.',
            decisions: [{ prompt: 'According to the NCERT text, what percentage of India\'s workforce was employed in the unorganised/informal sector, and what is the minimum.', options: [
                { text: 'Over 90% of India\'s workforce is in the unorganised/informal sector', outcome: 'Over 90% of India\'s workforce is in the unorganised/informal sector.' },
                { text: '50% informal', outcome: 'Not quite — Students equate "informal sector" with "small scale" or "traditional" work (e.g., pottery, weaving).', reveals: 'students-equate-informal-sector-with' },
                { text: '20 employee threshold', outcome: 'Not quite — Students equate "informal sector" with "small scale" or "traditional" work (e.g., pottery, weaving).', reveals: 'students-equate-informal-sector-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_12_006', title: 'Trade Unions in India: Formation, Functions and the AITUC, INTUC, CITU',
          caseStudy: { intro: 'Imagine you are a textile worker in Mumbai\'s Girangaon in 1982 — you earn ₹300/month, work 12-hour shifts with no safety gear, and your contractor can fire you.',
            decisions: [{ prompt: 'Name the three major national trade union federations in India mentioned in the Class 12 NCERT curriculum and state the year each was.', options: [
                { text: 'AITUC (All India Trade Union Congress)', outcome: 'AITUC (All India Trade Union Congress) — 1920; INTUC (Indian National Trade Union Congress) — 1947.' },
                { text: 'union density', outcome: 'Not quite — Students conflate "trade union" with "political party front" and assume all unions are externally.', reveals: 'students-conflate-trade-union-with' },
                { text: 'union presence', outcome: 'Not quite — Students conflate "trade union" with "political party front" and assume all unions are externally.', reveals: 'students-conflate-trade-union-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A debate-team member argues \'industrialisation levelled society — nobody asks your caste on a metro or a factory floor, so equality followed the machine.\'',
            decisions: [{ prompt: 'What do the classical sociologists add to that claim?', options: [
                { text: 'Half the picture — public anonymity did weaken ritual markers in shared spaces, but the factory also built a detailed division of labour and new class lines; Marx\'s alienation names the worker cut off from product, process and peers — equality in the queue, inequality on the payslip.', outcome: 'The chapter\'s balance: industrial society trades caste visibility for economic stratification — \'nobody asks your caste\' is real, and so is the income gap that grew alongside it.' },
                { text: 'He\'s right — machines replaced birth with merit, so hierarchy ended.', outcome: 'Merit arrived inside a new hierarchy — bourgeoisie and proletariat replaced estates; anonymous work relations didn\'t dissolve rank, they rebuilt it on capital.', reveals: 'machines-ended-hierarchy' },
                { text: 'The opposite — industrialisation only deepened every old hierarchy unchanged.', outcome: 'The shift was real too — Durkheim\'s move from mechanical to organic solidarity and anonymous public spaces did change how people relate; \'nothing changed\' misses the urbanisation and solidarity shift as much as the equality claim misses the class structure.', reveals: 'industry-changed-nothing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now explain industrialisation as a rewiring of social relations, not just machines — and why liberalisation grew jobs while shrinking job security.',
            decisions: [{ prompt: 'What comes next? Change and Development in Industrial Society · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Change and Development in Industrial Society · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_12_001', difficulty: 'standard',
          question: 'Industrialisation as a process of social change refers to the structural.',
          hint: 'Revisit c11_soc_cbse_09_003 (Marx\'s mode of production) and c10_hist_cbse_04_005.',
          misconception: 'Students often equate "industrialisation" with "factory buildings and machines" and assume the handicraft-to-factory.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Industrialisation as a process of social change refers to the structural transformation',
                  options: ['Industrialisation as a process of social change refers to the structural transformation', 'The Industrial Revolution in Europe (late 18th to 19th century) was a transformative', 'Industrialisation in India refers to the historical process of establishing factory-based', 'The growth of the working class refers to the historical and sociological process through'],
                  hint: 'Revisit c11_soc_cbse_09_003 (Marx\'s mode of production) and c10_hist_cbse_04_005 (colonial.',
                  misconception: 'Students often equate "industrialisation" with "factory buildings and machines" and assume the handicraft-to-factory transition was.' }
          ],
            remediations: { 'students-often-equate-industrialisation-with': { steps: ['If the student holds this misconception: Step 1 — Have them re-read NCERT sections 5.2 ("Specificity of Indian.', 'Step 2 — Ask them to draw a Venn diagram: Circle A = European industrialisation features (from Class 10 history).', 'Step 3 — Give a mini-case: "A powerloom in Bhiwandi employs 6 workers on contract, no benefits.', 'Is this \'industrialisation\'?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate "industrialisation" with "factory buildings and machines" and assume the handicraft-to-factory.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Liberalisation since the 1990s has expanded secure employment in India\'s organised sector." Use NCERT data on employment trends (regular.', answer: 'The claim is false',
                  options: ['The claim is false', 'IT sector growth'],
                  hint: 'Revisit c11_soc_cbse_09_003 (Marx\'s mode of production) and c10_hist_cbse_04_005 (colonial.',
                  misconception: 'Students often equate "industrialisation" with "factory buildings and machines" and assume the handicraft-to-factory transition was.' }
          ],
            remediations: { 'students-often-equate-industrialisation-with': { steps: ['If the student holds this misconception: Step 1 — Have them re-read NCERT sections 5.2 ("Specificity of Indian.', 'Step 2 — Ask them to draw a Venn diagram: Circle A = European industrialisation features (from Class 10 history).', 'Step 3 — Give a mini-case: "A powerloom in Bhiwandi employs 6 workers on contract, no benefits.', 'Is this \'industrialisation\'?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_12_002', difficulty: 'standard',
          question: 'The Industrial Revolution in Europe (late 18th to 19th century) was.',
          hint: 'If stuck, revisit c11_hist_cbse_06_001 (feudal three orders), c11_soc_cbse_09_003 (Marx\'s.',
          misconception: 'Students often think the Industrial Revolution was only about machines and factories, and that its social consequences.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Industrial Revolution in Europe (late 18th to 19th century) was a transformative',
                  options: ['The Industrial Revolution in Europe (late 18th to 19th century) was a transformative', 'Industrialisation as a process of social change refers to the structural transformation', 'Industrialisation in India refers to the historical process of establishing factory-based', 'The growth of the working class refers to the historical and sociological process through'],
                  hint: 'If stuck, revisit c11_hist_cbse_06_001 (feudal three orders), c11_soc_cbse_09_003 (Marx\'s mode.',
                  misconception: 'Students often think the Industrial Revolution was only about machines and factories, and that its social consequences (like alienation.' }
          ],
            remediations: { 'the-industrial-revolution-was-only': { steps: ['If a student conflates technological change with social change, have them re-read NCERT section 5.1 and create.', 'Then ask them to link each technology to a specific social consequence (e.g., steam engine -> factory system ->.', 'Next, have them explain Marx\'s alienation using a concrete example (e.g., a weaver vs.', 'Finally, assign a comparative exercise: contrast the experience of a handloom weaver in 18th century England with.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_12_003', difficulty: 'standard',
          question: 'Industrialisation in India refers to the historical process of establishing.',
          hint: 'If stuck, revisit c12_soc_cbse_12_001 (industrialisation as social change) and.',
          misconception: 'Students often think the factory system in India simply replicated the British model with Indian workers.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Industrialisation in India refers to the historical process of establishing factory-based',
                  options: ['Industrialisation in India refers to the historical process of establishing factory-based', 'Industrialisation as a process of social change refers to the structural transformation', 'The Industrial Revolution in Europe (late 18th to 19th century) was a transformative', 'The growth of the working class refers to the historical and sociological process through'],
                  hint: 'If stuck, revisit c12_soc_cbse_12_001 (industrialisation as social change) and c11_soc_cbse_01_006.',
                  misconception: 'Students often think the factory system in India simply replicated the British model with Indian workers.' }
          ],
            remediations: { 'the-factory-system-in-india': { steps: ['If the student conflates Indian and European industrialisation: (1) Re-read NCERT Section 5.2 \'The Specificity.', '(2) Create a two-column table: \'European Factory\' vs \'Indian Textile Mill\' with rows: Recruitment, Labour Control.', '(3) Use the Ramcharan quote and the Maruti case to write a 150-word answer: \'Explain how machine-paced work in India.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_12_004', difficulty: 'standard',
          question: 'The growth of the working class refers to the historical and sociological.',
          hint: 'If unclear on how the factory system produced a distinct working class, re-read.',
          misconception: 'Students often treat "working class" as synonymous with "factory workers" or "poor people," ignoring that the NCERT.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The growth of the working class refers to the historical and sociological process through',
                  options: ['The growth of the working class refers to the historical and sociological process through', 'Industrialisation as a process of social change refers to the structural transformation', 'The Industrial Revolution in Europe (late 18th to 19th century) was a transformative', 'Industrialisation in India refers to the historical process of establishing factory-based'],
                  hint: 'If unclear on how the factory system produced a distinct working class, re-read c12_soc_cbse_12_003.',
                  misconception: 'Students often treat "working class" as synonymous with "factory workers" or "poor people," ignoring that the NCERT defines it by relation.' }
          ],
            remediations: { 'students-often-treat-working-class': { steps: ['Re-read NCERT 5.2 (table on employment status) and 5.3–5.7, highlighting every mention of caste, gender, contractor.', 'Make a two-column table: "Organised Sector Worker" vs.', '"Informal/Home-based Worker" with rows for recruitment, wage form, hours, safety, union access.', 'Write one paragraph explaining how the same person (e.g., a Dalit woman) could be in either column depending.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_12_005', difficulty: 'standard',
          question: 'Informalisation of the workforce refers to the structural shift where.',
          hint: 'Revisit c11_soc_cbse_03_007 "Work and Economic Institutions: Formal and Informal.',
          misconception: 'Students equate "informal sector" with "small scale" or "traditional" work (e.g., pottery, weaving) and assume formal.',
          parts: [
                { id: 'a', prompt: 'According to the NCERT text, what percentage of India\'s workforce was employed in the unorganised/informal sector, and what is the minimum employee threshold.', answer: 'Over 90% of India\'s workforce is in the unorganised/informal sector',
                  options: ['Over 90% of India\'s workforce is in the unorganised/informal sector', '50% informal', '20 employee threshold'],
                  hint: 'Revisit c11_soc_cbse_03_007 "Work and Economic Institutions: Formal and Informal Economies" — focus.',
                  misconception: 'Students equate "informal sector" with "small scale" or "traditional" work (e.g., pottery, weaving) and assume formal sector jobs are.' }
          ],
            remediations: { 'students-equate-informal-sector-with': { steps: ['If the student holds the "traditional vs modern" misconception: Step 1 — Re-read Section 5.2 "Globalisation.', 'Step 2 — Trace the Maruti value chain: permanent workers → outsourced services → ancillary units → home-based parts.', 'Ask: "At which link does the employment contract disappear?" Step 3 — Compare the 1982 textile striker (fighting for.', 'Write one paragraph: "Informalisation is not about firm size but about *risk-shifting* from capital to labour." Step 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_12_006', difficulty: 'standard',
          question: 'Trade unions in India are formal organisations of workers formed to protect and.',
          hint: 'Revisit c12_soc_cbse_12_005\'s chart "Distribution of workers in India by employment.',
          misconception: 'Students conflate "trade union" with "political party front" and assume all unions are externally controlled.',
          parts: [
                { id: 'a', prompt: 'Name the three major national trade union federations in India mentioned in the Class 12 NCERT curriculum and state the year each was founded.', answer: 'AITUC (All India Trade Union Congress)',
                  options: ['AITUC (All India Trade Union Congress)', 'union density', 'union presence', 'BMS or HMS instead of CITU, or swapping founding years'],
                  hint: 'Revisit c12_soc_cbse_12_005\'s chart "Distribution of workers in India by employment status.',
                  misconception: 'Students conflate "trade union" with "political party front" and assume all unions are externally controlled.' },
                { id: 'b', prompt: 'The NCERT text states: "Very few people in India have access to secure jobs with benefits.', answer: 'Secure jobs with benefits (pension, grievance redressal, legal protection) are',
                  options: ['Secure jobs with benefits (pension, grievance redressal, legal protection) are', 'it is more difficult for trade unions to organise in smaller firms', 'anti-union laws', 'union density'],
                  hint: 'Revisit c12_soc_cbse_12_005\'s chart "Distribution of workers in India by employment status.',
                  misconception: 'Students conflate "trade union" with "political party front" and assume all unions are externally controlled.' }
          ],
            remediations: { 'students-conflate-trade-union-with': { steps: ['Re-read NCERT Section 5.7 "Strikes and unions" and the Bombay Textile Strike case.', 'Revisit c12_soc_cbse_12_005 (Informalisation) — list the four mechanisms (outsourcing, contract labour, badli system.', 'Create a comparison table: AITUC/INTUC/CITU — columns: founding year, parent party, key leader, one major strike.', 'Re-attempt Diagnostic Question 3 (contract worker fragmentation) — write a 150-word answer using the terms "principal.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
