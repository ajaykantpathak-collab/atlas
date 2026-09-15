import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch07_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch07_p2: SimDef = {
    id: 'v3_c12_geo_ch07_p2',
    title: 'Tertiary and Quaternary Activities · Part 2/2',
    subtitle: 'You can\'t warehouse a haircut — the economics of the invisible',
    classLevel: 12, subject: 'geography', topic: 'Tertiary and Quaternary Activities · Part 2/2',
    chapters: ['c12_geo_ch07'],
    nodeIds: ['c12_geo_cbse_07_007', 'c12_geo_cbse_07_008', 'c12_geo_cbse_07_009', 'c12_geo_cbse_07_010', 'c12_geo_cbse_07_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Service-sector analyst', intro: 'No smokestacks, no harvests — yet this sector carries more than half of India\'s economy. Learn to see the invisible.', goal: 'Define tertiary activities, classify trade/transport/communication/services, and explain their rise with development.' },
    discovery: {
        question: 'A shampoo bottle can sit in a warehouse for months. A haircut can\'t. What makes services behave so differently from goods?',
        options: ['Simultaneity — a service is produced and consumed in the same instant; intangibility alone doesn\'t explain why it can\'t be stored', 'Services are just intangible', 'Barbers refuse to stock', 'Goods are heavier'],
        answer: 'Simultaneity — a service is produced and consumed in the same instant; intangibility alone doesn\'t explain why it can\'t be stored',
        hook: '\'Tertiary\' isn\'t just IT parks and banks — street vendors, rickshaw pullers and ASHA workers are ~80% of India\'s services workforce. And its geography is flipped: a steel plant chases ore and coal, while a software park chases skill and connectivity — footloose, not bolted to a mine.',
    },
    teaching: [
        { title: 'Quaternary Activities: Knowledge Economy and Information Services', text: 'Quaternary activities are knowledge-based economic activities that involve the creation, processing, and dissemination of information and expertise — including research and development, information.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_07_007', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Deconstruct a city morning into its sector anatomy — metro, messaging, markets, mentoring — then test why a sector can deliver 54% of GDP yet only a third of the jobs.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_07_007', title: 'Quaternary Activities: Knowledge Economy and Information Services',
          caseStudy: { intro: 'Start with a student\'s daily experience: ordering food via app, attending online class, using UPI payment — all powered by invisible knowledge workers.',
            decisions: [{ prompt: 'Define quaternary activities and name two ways they differ from tertiary activities in terms of input and output.', options: [
                { text: 'Quaternary activities are knowledge-intensive services (R&D, IT, consultancy) where the', outcome: 'Quaternary activities are knowledge-intensive services (R&D, IT, consultancy) where the primary.' },
                { text: 'services', outcome: 'Not quite — Students equate "quaternary" with "IT/software only" and treat all computer-based work.', reveals: 'students-equate-quaternary-with-it' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_07_008', title: 'Digital Divide: Concept and Global Patterns',
          scaffold: { problem: 'A geography student wants to compare the digital divide between two Indian states — Kerala (high human development) and Bihar (low human.',
            steps: [
            { text: 'Calculate Kerala gender gap = 85% - 72% = 13 percentage points.' },
            { text: 'Calculate Bihar gender gap = 43% - 21% = 22 percentage points.' },
            { text: 'Calculate Kerala average penetration = (72% + 85%) / 2 = 78.5%.' },
            { text: 'Calculate Bihar average penetration = (21% + 43%) / 2 = 32%.' },
            { text: 'Calculate overall state gap = 78.5% - 32% = 46.5 percentage points.' },
            { text: 'Interpret: Bihar\'s gender gap (22pp) > Kerala\'s (13pp), showing gender inequality compounds regional backwardness.', faded: true, blankAnswer: 'Kerala gender gap = 13pp; Bihar gender gap = 22pp; Overall.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_07_009', title: 'Quinary Activities: Concept and Examples',
          caseStudy: { intro: 'Observe the decision-making hierarchy in your school: the principal (quinary) sets vision and policy, while teachers (tertiary) and IT staff (quaternary).',
            decisions: [{ prompt: 'Define quinary activities and state how they differ from quaternary activities in terms of decision-making authority.', options: [
                { text: 'Quinary activities involve top-level decision-making, policy formulation, and strategic', outcome: 'Quinary activities involve top-level decision-making, policy formulation, and strategic.' },
                { text: 'high skill', outcome: 'Not quite — Students conflate "high salary/high skill" with quinary: they classify senior software architects.', reveals: 'students-conflate-high-salary-high' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_07_010', title: 'People Engaged in Quaternary and Quinary Activities',
          caseStudy: { intro: 'Begin by observing a local IT park or university campus: notice the concentration of software engineers, researchers, and consultants.',
            decisions: [{ prompt: 'What are the typical educational qualifications and skill sets of workers engaged in quaternary activities?', options: [
                { text: 'Quaternary workers typically hold advanced degrees (master\'s, PhD) in specialized fields', outcome: 'Quaternary workers typically hold advanced degrees (master\'s, PhD) in specialized fields like.' },
                { text: 'only basic computer skills', outcome: 'Not quite — Students often think "quaternary activities = only IT/software jobs" and "quinary activities = only.', reveals: 'quaternary-activities-only-it-software' },
                { text: 'quaternary activities = only IT/software jobs', outcome: 'Not quite — Students often think "quaternary activities = only IT/software jobs" and "quinary activities = only.', reveals: 'quaternary-activities-only-it-software' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_07_011', title: 'Comparison of Tertiary, Quaternary and Quinary Activities',
          caseStudy: { intro: 'Observe a hospital in your city: nurses and paramedics deliver direct patient care (tertiary), the medical researcher developing a new treatment protocol works.',
            decisions: [{ prompt: 'Name the three categories of service-sector activities in ascending order of knowledge intensity and decision-making authority, and give.', options: [
                { text: 'Correct answer: Tertiary (e.g., retail salesperson), Quaternary (e.g., software', outcome: 'Correct answer: Tertiary (e.g., retail salesperson), Quaternary (e.g., software architect), Quinary.' },
                { text: 'truck driver', outcome: 'Not quite — Students often think "tertiary = low skill, quaternary = high skill, quinary = highest skill" and.', reveals: 'tertiary-low-skill' },
                { text: 'tertiary = low skill, quaternary = high skill, quinary = highest skill', outcome: 'Not quite — Students often think "tertiary = low skill, quaternary = high skill, quinary = highest skill" and.', reveals: 'tertiary-low-skill' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your college incubation cell is helping a farmer collective export Alphonso mangoes to the Gulf. A junior\'s plan books the cheapest surface freight and lists the route as \'port to port\', with no mention of cold storage, customs, or ripening at the destination.',
            decisions: [{ prompt: 'What does the tertiary-activities framework flag in this plan?', options: [
                { text: 'That trade is door-to-door spatial transfer, not port-to-port — perishable mangoes need reefer trucks, phytosanitary certification, cold-chain continuity and ripening chambers as auxiliary services, so the \'cheapest\' leg can be the most expensive failure.', outcome: 'The chapter treats transport, banking, insurance and customs as the enabling services that make exchange real; for a 3–4 week shelf-life fruit, transferability — not distance — decides whether the trade exists at all.' },
                { text: 'Approve it — trade just means buying cheap here and selling dear there; the rest is logistics detail.', outcome: 'That reduces trade to arbitrage and deletes exactly what makes it tertiary: the value is added by services bridging space, and without them the mangoes arrive as pulp, not product.', reveals: 'trade-equals-arbitrage' },
                { text: 'Switch the plan to domestic mandis only — exports are what \'trade\' really means, but they\'re too complex for a small collective.', outcome: 'Both the premise and retreat are wrong: domestic wholesale and retail are trade too — employing far more people than foreign trade — and perishability can be engineered with a cold chain, not avoided by staying local.', reveals: 'only-exports-are-trade' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_07_011', title: 'You made it',
          caseStudy: { intro: 'You can now sort any activity by intangibility and simultaneity — and explain why service-led growth can still be jobless in the formal count.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_007', difficulty: 'standard',
          question: 'Quaternary activities are knowledge-based economic activities that involve the.',
          hint: 'If classification fails, revisit c12_geo_cbse_07_006\'s criteria table and.',
          misconception: 'Students equate "quaternary" with "IT/software only" and treat all computer-based work as quaternary.',
          parts: [
                { id: 'a', prompt: 'Why do quaternary activities cluster in specific urban regions like Bengaluru, Hyderabad, and Pune despite being theoretically footloose?', answer: 'Clustering occurs due to: (1) knowledge spillovers from proximity to',
                  options: ['Clustering occurs due to: (1) knowledge spillovers from proximity to', 'cheap labor', 'English language'],
                  hint: 'If classification fails, revisit c12_geo_cbse_07_006\'s criteria table and c11_geo_cbse_17_004\'s.',
                  misconception: 'Students equate "quaternary" with "IT/software only" and treat all computer-based work as quaternary.' }
          ],
            remediations: { 'students-equate-quaternary-with-it': { steps: ['Revisit node c12_geo_cbse_07_006 (quaternary concept) and create a two-column table: Tertiary vs Quaternary with.', 'Take 5 local service examples (Zomato delivery, TCS research lab, hospital, patent attorney, call center) and classify.', 'Re-attempt Diagnostic Q1 and Q2. If still stuck, map India\'s STPI locations and overlay with engineering college.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_008', difficulty: 'standard',
          question: 'The digital divide refers to the unequal access to, use of, and benefits from.',
          hint: 'If stuck, revisit c12_geo_cbse_07_001 (Tertiary Activities) for sector definitions and.',
          misconception: 'Students equate "digital divide" solely with "lack of computers/internet lines" (infrastructure access).',
          parts: [
                { id: 'a', prompt: 'Define the term "digital divide" in one sentence and name the three distinct dimensions along which it is measured globally.', answer: 'Correct answer: The digital divide is the gap between individuals, households,',
                  options: ['Correct answer: The digital divide is the gap between individuals, households,', 'access to computers'],
                  hint: 'If stuck, revisit c12_geo_cbse_07_001 (Tertiary Activities) for sector definitions and.',
                  misconception: 'Students equate "digital divide" solely with "lack of computers/internet lines" (infrastructure access).' },
                { id: 'b', prompt: 'Why does the digital divide persist even in countries with near-universal mobile phone penetration (e.g., India has >1.1 billion mobile subscriptions but only.', answer: 'Correct answer: Mobile subscription ≠ internet access',
                  options: ['Correct answer: Mobile subscription ≠ internet access', 'poverty'],
                  hint: 'If stuck, revisit c12_geo_cbse_07_001 (Tertiary Activities) for sector definitions and.',
                  misconception: 'Students equate "digital divide" solely with "lack of computers/internet lines" (infrastructure access).' }
          ],
            remediations: { 'students-equate-digital-divide-solely': { steps: ['Revisit c11_geo_cbse_21_007 (Communication Services) to recall ICT modes and India\'s telecom evolution.', 'Study ITU "Measuring Digital Development" 2023 factsheet — focus on Table 1 (internet use by region) and Figure 5.', 'Plot a simple scatter: state-level NSDP per capita (x-axis) vs rural internet % (y-axis) using NFHS-5 data — observe.', 'Re-attempt Diagnostic Q2 and Q4 with this data-driven lens.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_009', difficulty: 'standard',
          question: 'Quinary activities are the highest-level decision-making services involving.',
          hint: 'If stuck, revisit c12_geo_cbse_07_006 and create a two-column table: "Produces.',
          misconception: 'Students conflate "high salary/high skill" with quinary: they classify senior software architects, specialized.',
          parts: [
                { id: 'a', prompt: 'Why do quinary activities concentrate in national capitals like New Delhi rather than being evenly distributed across India?', answer: 'Quinary activities cluster in capitals',
                  options: ['Quinary activities cluster in capitals', 'better infrastructure', 'higher salaries'],
                  hint: 'If stuck, revisit c12_geo_cbse_07_006 and create a two-column table: "Produces knowledge/analysis".',
                  misconception: 'Students conflate "high salary/high skill" with quinary: they classify senior software architects, specialized surgeons, or investment.' },
                { id: 'b', prompt: 'Compare the spatial distribution of quinary activities in India vs. the USA.', answer: 'India\'s quinary activities are hyper-concentrated in Delhi-NCR',
                  options: ['India\'s quinary activities are hyper-concentrated in Delhi-NCR', 'population size', 'historical accident'],
                  hint: 'If stuck, revisit c12_geo_cbse_07_006 and create a two-column table: "Produces knowledge/analysis".',
                  misconception: 'Students conflate "high salary/high skill" with quinary: they classify senior software architects, specialized surgeons, or investment.' }
          ],
            remediations: { 'students-conflate-high-salary-high': { steps: ['Revisit c12_geo_cbse_07_006 (Quaternary Activities: Concept and Characteristics) — list 5 quaternary roles and their.', 'Revisit c12_geo_cbse_07_011 (Comparison of Tertiary, Quaternary and Quinary Act) — complete the comparison table.', 'Take a newspaper front page; highlight every person named — classify each as tertiary/quaternary/quinary based.', 'Re-attempt Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_010', difficulty: 'standard',
          question: 'Quaternary activities involve highly skilled professionals engaged.',
          hint: 'Revisit node c12_geo_cbse_07_006 for quaternary characteristics and c12_geo_cbse_07_009.',
          misconception: 'Students often think "quaternary activities = only IT/software jobs" and "quinary activities = only politicians".',
          parts: [
                { id: 'a', prompt: 'Given a map showing the percentage of workforce in quaternary activities across Indian states, identify the top three states and explain the geographical.', answer: 'Top states: Karnataka, Maharashtra, Telangana',
                  options: ['Top states: Karnataka, Maharashtra, Telangana', 'high literacy', 'quaternary activities = only IT/software jobs', 'quinary activities = only politicians'],
                  hint: 'Revisit node c12_geo_cbse_07_006 for quaternary characteristics and c12_geo_cbse_07_009 for quinary.',
                  misconception: 'Students often think "quaternary activities = only IT/software jobs" and "quinary activities = only politicians".' }
          ],
            remediations: { 'quaternary-activities-only-it-software': { steps: ['If the student holds this misconception, have them: (1) List 10 professions from the NCERT textbook\'s examples.', '(2) Read the definition of quinary activities in node c12_geo_cbse_07_009 and identify three non-political roles.', '(3) Re-attempt Diagnostic Question 1 and 2.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_011', difficulty: 'standard',
          question: 'Tertiary, quaternary, and quinary activities represent the progressive.',
          hint: 'If unclear on the tertiary/quaternary boundary, revisit c12_geo_cbse_07_006 (knowledge.',
          misconception: 'Students often think "tertiary = low skill, quaternary = high skill, quinary = highest skill" and treat it as a simple.',
          parts: [
                { id: 'a', prompt: 'Name the three categories of service-sector activities in ascending order of knowledge intensity and decision-making authority, and give one typical occupation.', answer: 'Correct answer: Tertiary (e.g., retail salesperson), Quaternary (e.g., software',
                  options: ['Correct answer: Tertiary (e.g., retail salesperson), Quaternary (e.g., software', 'truck driver', 'tertiary = low skill, quaternary = high skill, quinary = highest skill'],
                  hint: 'If unclear on the tertiary/quaternary boundary, revisit c12_geo_cbse_07_006 (knowledge economy.',
                  misconception: 'Students often think "tertiary = low skill, quaternary = high skill, quinary = highest skill" and treat it as a simple skill ladder.' },
                { id: 'b', prompt: 'Given the following workforce distribution for a hypothetical developed economy: Primary 3%, Secondary 22%, Tertiary 55%, Quaternary 17%, Quinary 3%.', answer: 'Step 1: Combined service share = 55% + 17% + 3% = 75%',
                  options: ['Step 1: Combined service share = 55% + 17% + 3% = 75%', 'tertiary = low skill, quaternary = high skill, quinary = highest skill'],
                  hint: 'If unclear on the tertiary/quaternary boundary, revisit c12_geo_cbse_07_006 (knowledge economy.',
                  misconception: 'Students often think "tertiary = low skill, quaternary = high skill, quinary = highest skill" and treat it as a simple skill ladder.' }
          ],
            remediations: { 'tertiary-low-skill': { steps: ['Revisit c12_geo_cbse_07_001 (tertiary definition) and c12_geo_cbse_07_006 (quaternary concept) to rebuild the.', 'Create a 2x2 matrix with axes "Standardisation of output" (low to high) and "Decision reversibility" (reversible.', 'Verify placement with teacher — quaternary = low standardisation + reversible decisions; quinary = low standardisation.', 'Re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "tertiary = low skill, quaternary = high skill, quinary = highest skill" and treat it as a simple.',
          parts: [
                { id: 'a', prompt: 'Design a three-tier urban policy framework for a state government aiming to promote quaternary and quinary activity growth in its tier-2 cities (e.g., Indore.', answer: 'Expected answer: Tier 1 (Tertiary foundation)',
                  options: ['Expected answer: Tier 1 (Tertiary foundation)', 'tertiary = low skill, quaternary = high skill, quinary = highest skill'],
                  hint: 'If unclear on the tertiary/quaternary boundary, revisit c12_geo_cbse_07_006 (knowledge economy.',
                  misconception: 'Students often think "tertiary = low skill, quaternary = high skill, quinary = highest skill" and treat it as a simple skill ladder.' }
          ],
            remediations: { 'tertiary-low-skill': { steps: ['Revisit c12_geo_cbse_07_001 (tertiary definition) and c12_geo_cbse_07_006 (quaternary concept) to rebuild the.', 'Create a 2x2 matrix with axes "Standardisation of output" (low to high) and "Decision reversibility" (reversible.', 'Verify placement with teacher — quaternary = low standardisation + reversible decisions; quinary = low standardisation.', 'Re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
