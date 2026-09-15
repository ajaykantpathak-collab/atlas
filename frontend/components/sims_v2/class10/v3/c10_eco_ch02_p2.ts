import type { SimDef } from '../../engine/types';

/** v3 generated — c10_eco_ch02_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_eco_ch02_p2: SimDef = {
    id: 'v3_c10_eco_ch02_p2',
    title: 'Sectors of the Indian Economy · Part 2/2',
    subtitle: 'Sort the whole economy into three buckets — then find the imbalance',
    classLevel: 10, subject: 'economics', topic: 'Sectors of the Indian Economy · Part 2/2',
    chapters: ['c10_eco_ch02'],
    nodeIds: ['c10_eco_cbse_02_007', 'c10_eco_cbse_02_008', 'c10_eco_cbse_02_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an economist mapping India\'s production chain', intro: 'Your grandfather\'s village grows the wheat; a mill grinds it; a delivery app brings the pizza. Every rupee you spend lands in one of three sectors.', goal: 'Classify activities by nature of output and analyse why tertiary leads GDP while primary still leads employment.' },
    discovery: {
        question: 'A sugar mill buys sugarcane straight from farmers. Since it works on a primary-sector crop, the mill must be primary sector too — right?',
        options: ['Wrong — the mill transforms cane into sugar, so it\'s secondary; it\'s the output, not the input, that decides the sector', 'Right — anything using farm produce stays in the primary sector', 'It\'s tertiary — because the mill also sells the sugar', 'It splits — half primary for crushing, half secondary for packing'],
        answer: 'Wrong — the mill transforms cane into sugar, so it\'s secondary; it\'s the output, not the input, that decides the sector',
        hook: 'Don\'t classify a job by what goes in — classify it by what comes out. Nature\'s gift is primary, a transformed thing is secondary, a service is tertiary.',
    },
    teaching: [
        { title: 'MNREGA: National Rural Employment Guarantee Act 2005', text: 'The Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA), 2005 is a legally enforceable social security measure that guarantees **at least 100 days of wage employment in a financial.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_eco_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace one litre of milk from a cow in a village to a chilled packet in a city store — tag every stage primary, secondary or tertiary — then explain why services rule India\'s GDP but not its jobs.',
        labels: ['MNREGA: National Rural Employment', 'Disguised Unemployment in Agriculture', 'Sectoral Shift: From Primary'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_eco_cbse_02_007', title: 'MNREGA: National Rural Employment Guarantee Act 2005',
          caseStudy: { intro: 'Imagine a landless labourer family in a drought-prone village in Maharashtra.',
            decisions: [{ prompt: 'State the exact legal guarantee provided to a rural household under MGNREGA 2005 in terms of days of employment and the nature of work.', options: [
                { text: 'Correct answer: MGNREGA guarantees **at least 100 days of wage employment in a financial', outcome: 'Correct answer: MGNREGA guarantees **at least 100 days of wage employment in a financial year**.' },
                { text: '100 days of any work', outcome: 'Not quite — Students think **MGNREGA is an "employment scheme" like a job fair** where the government "gives.', reveals: 'mgnrega-is-an-employment-scheme' },
                { text: 'guaranteed employment for one member only', outcome: 'Not quite — Students think **MGNREGA is an "employment scheme" like a job fair** where the government "gives.', reveals: 'mgnrega-is-an-employment-scheme' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_02_008', title: 'Disguised Unemployment in Agriculture and the Service Sector',
          scaffold: { problem: 'In a village in Bihar, 40 households cultivate 80 hectares of paddy. Each household has 6 members, of which 4 work on the farm.',
            steps: [
            { text: 'Identify given data — 40 households, 80 hectares, 4 working members per household, optimal norm 3 workers/hectare.' },
            { text: 'Calculate total workers currently engaged = 40 households × 4 workers = 160 workers.' },
            { text: 'Calculate optimal workers required = 80 hectares × 3 workers/hectare = 240 workers.' },
            { text: 'Disguisedly unemployed = 160 – 120 = 40 workers. These 40 workers have MPL = 0 — removing them keeps output same.' },
            { text: 'Interpretation: 40 workers (25% of workforce) are surplus. They could move to construction or textile units in nearby.', faded: true, blankAnswer: '40 disguisedly unemployed workers; MPL of each surplus.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_02_009', title: 'Sectoral Shift: From Primary to Secondary to Tertiary Over Time',
          scaffold: { problem: 'In 1993-94, India\'s workforce was 375 million with primary sector employment share 64%, secondary 16%, tertiary 20%.',
            steps: [
            { text: 'Calculate 1993-94 workers per sector: Primary = 375 × 0.64 = 240 million; Secondary = 375 × 0.16 = 60 million; Tertiary.' },
            { text: 'Calculate 2017-18 workers per sector: Primary = 470 × 0.42 = 197.4 million; Secondary = 470 × 0.25 = 117.5 million.' },
            { text: 'Compute absolute change: Primary = 197.4 - 240 = -42.6 million (decline); Secondary = 117.5 - 60 = +57.5 million.' },
            { text: 'Compare absolute additions: Tertiary added 80.1 million, Secondary added 57.5 million, Primary lost 42.6 million.' },
            { text: 'Interpret: Despite primary sector\'s share falling, its absolute workforce declined only modestly because total.', faded: true, blankAnswer: 'Primary: -42.6 million; Secondary: +57.5 million; Tertiary.' }
            ] } },
        { type: 'case', nodeId: 'c10_eco_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school project, a student lists the jobs on her street: a grape farmer, a winery worker who turns grapes into wine, a trucker who delivers the wine, and a guide who shows tourists the vineyard. Her teammate marks them all \'agriculture\' because \'it all starts with grapes.\'',
            decisions: [{ prompt: 'How should the four jobs actually be sorted into sectors?', options: [
                { text: 'Sort by the nature of the output, not the ingredient: the grape farmer is primary (grows a natural product), the winery worker is secondary (manufactures wine from grapes), and both the trucker and the guide are tertiary (they provide transport and tourism services).', outcome: 'The chain also shows interdependence — each sector depends on the one before it, but classification follows what each job produces: raw material, manufactured good, or service.' },
                { text: 'The teammate is right — anything connected to farming counts as the primary sector, so all four jobs are primary.', outcome: 'That erases the distinction the classification is built on — making wine is manufacturing and driving tourists is a service, whatever the original crop.', reveals: 'all-farm-linked-is-primary' },
                { text: 'The trucker and guide belong in the secondary sector because they \'work on\' the wine industry like the winery does.', outcome: 'They produce no physical good — moving and presenting things are services, which places them in the tertiary sector.', reveals: 'services-are-secondary' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_02_009', title: 'You made it',
          caseStudy: { intro: 'Wheat to flour to a delivered pizza: one grain, three sectors. India\'s puzzle is that the sector earning the most isn\'t the one employing the most.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_eco_cbse_02_007', difficulty: 'standard',
          question: 'The Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA), 2005 is.',
          hint: 'If stuck, revisit **c10_eco_cbse_02_005 (Problems of Unemployment in the Three Sectors)**.',
          misconception: 'Students think **MGNREGA is an "employment scheme" like a job fair** where the government "gives jobs" to anyone who.',
          parts: [
                { id: 'a', prompt: 'A rural household in Rajasthan worked 45 days under MGNREGA in 2023-24 at the notified wage rate of ₹231/day.', answer: 'Step 1: Total wage due = 45 days × ₹231 = **₹10,395**',
                  options: ['Step 1: Total wage due = 45 days × ₹231 = **₹10,395**', 'employment scheme', 'gives jobs', 'MGNREGA provides jobs to unemployed youth'],
                  hint: 'If stuck, revisit **c10_eco_cbse_02_005 (Problems of Unemployment in the Three Sectors)**.',
                  misconception: 'Students think **MGNREGA is an "employment scheme" like a job fair** where the government "gives jobs" to anyone who asks.' }
          ],
            remediations: { 'mgnrega-is-an-employment-scheme': { steps: ['Re-read the **definition** above: underline "legally enforceable", "100 days per household", "unskilled manual work".', 'Draw a **flowchart**: Job Card → Written Application → 15-Day Deadline → Work Allotted / Unemployment Allowance →.', 'Solve Diagnostic Question 3 again, this time writing the **legal clause** (Section 3, Section 7) for each step.', 'Watch the 10-min video "MGNREGA: Right to Work" (official MoRD) to see the demand-registration process in a real Gram.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think **MGNREGA is an "employment scheme" like a job fair** where the government "gives jobs" to anyone who.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "MGNREGA is a fiscal burden with no long-term growth impact because it only creates temporary employment." Use evidence on asset.', answer: 'Correct evaluation: The statement is **false**',
                  options: ['Correct evaluation: The statement is **false**', 'employment scheme', 'gives jobs', 'MGNREGA provides jobs to unemployed youth'],
                  hint: 'If stuck, revisit **c10_eco_cbse_02_005 (Problems of Unemployment in the Three Sectors)**.',
                  misconception: 'Students think **MGNREGA is an "employment scheme" like a job fair** where the government "gives jobs" to anyone who asks.' },
                { id: 'b', prompt: 'Design a 5-work MGNREGA project plan for a Gram Panchayat with 200 job-card households, ensuring: (a) at least 33% women person-days, (b) 60:40 labour:material.', answer: 'Sample answer (criteria for full marks): 1',
                  options: ['Sample answer (criteria for full marks): 1', 'employment scheme', 'gives jobs', 'MGNREGA provides jobs to unemployed youth'],
                  hint: 'If stuck, revisit **c10_eco_cbse_02_005 (Problems of Unemployment in the Three Sectors)**.',
                  misconception: 'Students think **MGNREGA is an "employment scheme" like a job fair** where the government "gives jobs" to anyone who asks.' }
          ],
            remediations: { 'mgnrega-is-an-employment-scheme': { steps: ['Re-read the **definition** above: underline "legally enforceable", "100 days per household", "unskilled manual work".', 'Draw a **flowchart**: Job Card → Written Application → 15-Day Deadline → Work Allotted / Unemployment Allowance →.', 'Solve Diagnostic Question 3 again, this time writing the **legal clause** (Section 3, Section 7) for each step.', 'Watch the 10-min video "MGNREGA: Right to Work" (official MoRD) to see the demand-registration process in a real Gram.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_02_008', difficulty: 'standard',
          question: 'Disguised unemployment is a situation where more workers are engaged in.',
          hint: 'If stuck, revisit "Labour as a Factor of Production" (c8_eco_ch1_4) and practice MPL.',
          misconception: 'Students believe disguised unemployment means "workers have low productivity" or "workers are employed part-time".',
          parts: [
                { id: 'a', prompt: 'In a village, 50 families cultivate 100 hectares of land. Each family has 5 working members.', answer: 'Step 1: Total workers = 50 families × 5 workers = 250 workers',
                  options: ['Step 1: Total workers = 50 families × 5 workers = 250 workers', 'optimal workers per hectare', 'workers have low productivity', 'workers are employed part-time'],
                  hint: 'If stuck, revisit "Labour as a Factor of Production" (c8_eco_ch1_4) and practice MPL calculations.',
                  misconception: 'Students believe disguised unemployment means "workers have low productivity" or "workers are employed part-time" — they confuse it with.' }
          ],
            remediations: { 'disguised-unemployment-means-workers-have': { steps: ['Revisit Class 8 "Labour as a Factor of Production" (c8_eco_ch1_4) — focus on Marginal Product vs Average Product.', 'Use a numerical example: 3 workers produce 30 kg wheat; 4th worker added, output stays 30 kg.', 'Contrast with seasonal unemployment: a farm labourer jobless in off-season (open unemployment for 3 months) vs a family.', 'Practice CBSE 2023 sample paper Q12: "Explain disguised unemployment with an example from agriculture" — write answer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_02_009', difficulty: 'standard',
          question: 'Sectoral shift refers to the structural transformation of an economy where the.',
          hint: 'If stuck, revisit the "Comparison of Three Sectors" node (c10_eco_cbse_02_002) and.',
          misconception: 'Students believe that "sectoral shift means the primary sector becomes unimportant." They write: "As India develops.',
          parts: [
                { id: 'a', prompt: 'Given the data: In 1972-73, primary sector employment share = 74%, secondary = 11%, tertiary = 15%. In 2017-18, primary = 42%, secondary = 25%, tertiary = 33%.', answer: 'Step 1: Primary change = 42 - 74 = -32 percentage points (decline)',
                  options: ['Step 1: Primary change = 42 - 74 = -32 percentage points (decline)', 'classic', 'sectoral shift means the primary sector becomes unimportant', 'As India develops, agriculture\'s contribution becomes negligible'],
                  hint: 'If stuck, revisit the "Comparison of Three Sectors" node (c10_eco_cbse_02_002) and practice.',
                  misconception: 'Students believe that "sectoral shift means the primary sector becomes unimportant." They write: "As India develops, agriculture\'s.' },
                { id: 'b', prompt: 'Analyze the following statement: "India\'s sectoral shift in GDP followed the typical development pattern, but its employment shift did not." Use the concepts.', answer: 'Correct analysis: GDP shift followed the pattern (primary down, tertiary up)',
                  options: ['Correct analysis: GDP shift followed the pattern (primary down, tertiary up)', 'jobless growth', 'sectoral shift means the primary sector becomes unimportant', 'As India develops, agriculture\'s contribution becomes negligible'],
                  hint: 'If stuck, revisit the "Comparison of Three Sectors" node (c10_eco_cbse_02_002) and practice.',
                  misconception: 'Students believe that "sectoral shift means the primary sector becomes unimportant." They write: "As India develops, agriculture\'s.' }
          ],
            remediations: { 'sectoral-shift-means-the-primary': { steps: ['Revisit the GDP vs Employment share table (NCERT Table 2.2 and 2.3) and calculate absolute output growth for.', 'Draw a two-panel chart: left panel shows sectoral GDP shares (%), right panel shows sectoral employment shares (%) for.', 'Read the "Disguised Unemployment" node (c10_eco_cbse_02_008) again and write one paragraph explaining why surplus.', 'Attempt Diagnostic Question 3 again with the new understanding.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
