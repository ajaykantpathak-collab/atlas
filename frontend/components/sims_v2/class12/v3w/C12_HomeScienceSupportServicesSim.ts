import type { SimDef } from '../../engine/types';
import C12_HomeScienceSupportServicesSim from '../../../simulations/c6_12/C12_HomeScienceSupportServicesSim';

/** v3 wrapped master — C12_HomeScienceSupportServicesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_homesciencesupportservicessim: SimDef = {
    id: 'v3w_c12_homesciencesupportservicessim',
    title: 'Death and Dying: Kubler-Ross Stages and Bereavement Process',
    subtitle: 'This node covers Kübler-Ross\'s five stages of dying, the dual-process model of.',
    classLevel: 12, subject: 'science', topic: 'Death and Dying: Kubler-Ross Stages and Bereavement Process',
    chapters: [],
    nodeIds: ['c12_hs_cbse_07_012', 'c12_hs_cbse_03_011', 'c12_hs_cbse_08_010', 'c12_hs_cbse_11_009', 'c12_hs_cbse_11_011', 'c12_hs_cbse_05_007', 'c12_hs_cbse_03_005', 'c12_hs_cbse_03_008', 'c12_hs_cbse_03_010', 'c12_hs_cbse_11_002', 'c12_hs_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a 17-year-old student whose grandmother has been diagnosed with terminal cancer.', goal: 'Master Death and Dying: Kubler-Ross Stages and Bereavement Process.' },
    discovery: {
        question: 'A 45-year-old man whose wife died two months ago alternates between: (a) looking at her photos and crying intensely, and (b) focusing on repairing the house.',
        options: ['(a) is loss-oriented coping (confronting grief directly), (b) is', 'stages of grief', 'he should only grieve'],
        answer: '(a) is loss-oriented coping (confronting grief directly), (b) is',
        hook: 'Students believe Kübler-Ross\'s stages apply identically to both the dying person AND the bereaved family members.',
    },
    teaching: [
        { title: 'Death and dying in human development refers.', text: 'Death and dying in human development refers to the final stage of the lifespan where individuals confront mortality, encompassing the psychological process of dying (Kübler-Ross\'s five stages:.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_hs_cbse_07_012', title: 'Death and dying in human development.',
          scaffold: { problem: 'Mrs. Sharma, 78, was diagnosed with stage IV lung cancer three weeks ago.',
            steps: [
            { text: 'Identify each reported behavior and its timeline: Week 1 — "X-ray was someone else\'s" (denial); Week 2 — "shouted at.' },
            { text: 'Note that acceptance is not yet observed; the sequence so far follows the classic order but compression into three.' },
            { text: 'Explain non-linearity: Mrs. Sharma may cycle back to anger tomorrow (e.g., if pain increases), or skip acceptance.' },
            { text: 'Identify clinical implication: The family should not pressure her toward acceptance; silent presence and pain.' },
            { text: 'Verify with Kübler-Ross\'s own caveat: She wrote stages are "defense mechanisms" that can appear in any order,.', faded: true, blankAnswer: 'Denial → Anger → Bargaining → Depression observed;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_03_011', title: 'Children with Special Needs (CWSN).',
          scaffold: { problem: 'A 6-year-old child diagnosed with Autism Spectrum Disorder (ASD) Level 2 (requiring substantial support) is enrolled in a mainstream Class.',
            steps: [
            { text: 'Identify the child\'s profile under RPWD Act 2016 — ASD falls under "Autism Spectrum Disorder" (Schedule, Category 21).' },
            { text: 'Map barriers across three domains using the social model: Physical — noisy classroom (35 children), no quiet space;.' },
            { text: 'Apply UDL principles (Multiple Means of Engagement, Representation, Action/Expression) to design accommodations: Week 1.' },
            { text: 'Week 2-3 — Fade adult prompting, expand PECS to requesting/commenting, introduce social stories for transitions,.' },
            { text: 'Week 4 — Conduct IEP meeting with parents, special educator (itinerant), teacher; document accommodations in IEP;.', faded: true, blankAnswer: 'A documented 4-week transition plan with 12+ specific.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_08_010', title: 'Fashion forecasting is the systematic.',
          scaffold: { problem: 'A domestic ethnic wear brand wants to launch a "Monsoon Wedding 2026" capsule collection.',
            steps: [
            { text: '**Macro Environment Scan** — Analyse PESTLE factors (Political: wedding season policy on gatherings; Economic:.' },
            { text: '**Trend Signal Collection** — Gather signals from: (a) Lakmé Fashion Week/India Fashion Week resort collections, (b).' },
            { text: '**Signal Clustering & Theme Development** — Group signals into 3–4 directional themes (e.g., "Lightweight Grandeur,".' },
            { text: '**Colour & Material Translation** — For lead theme "Lightweight Grandeur": Develop 6-shade palette (e.g., Misty Teal,.' },
            { text: '**Forecast Presentation & Handoff** — Create visual forecast board: mood images, colour chips, fabric swatches,.', faded: true, blankAnswer: '5-step workflow with Indian data sources per step as above.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_11_009', title: 'Housing selection involves evaluating a.',
          scaffold: { problem: 'A family of four is evaluating two housing sites. Site X: 120 m² plot, north-south orientation, municipal water/sewage, clear title, ₹85.',
            steps: [
            { text: 'List the criteria and their weights as decimals (Orientation 0.25, Services 0.20, Legal 0.25, Cost 0.15, Plot size.' },
            { text: 'Multiply each site\'s score by the criterion weight.' },
            { text: 'Compare weighted totals. Site X (4.40) > Site Y (2.50).' },
            { text: 'Interpret: Despite higher cost, Site X wins on orientation, services, and legal safety — critical for long-term.' },
            { text: 'Verify that weights sum to 1.00 (0.25+0.20+0.25+0.15+0.15 = 1.00) and scores are within 1–5.', faded: true, blankAnswer: 'Site X (weighted score 4.40) is recommended over Site Y.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_11_011', title: 'Hospitality Management is the.',
          scaffold: { problem: 'A 120-room hotel operates at 85% occupancy on a Friday night. The Front Office Supervisor receives 15 early-arrival requests (guests.',
            steps: [
            { text: 'Calculate total rooms occupied tonight: 120 × 0.85 = 102 rooms occupied.' },
            { text: 'Determine rooms vacating by morning: Assume all 102 check out by 12 PM (standard), but early arrivals need rooms by 9.' },
            { text: 'Calculate housekeeping capacity before 9 AM: Night shift (if any) or early morning shift.' },
            { text: 'Compare demand (15 early-arrival rooms) with supply (20 rooms potentially available + cleaning capacity).' },
            { text: 'Critical assumption: The 20 available rooms are already cleaned or can be prioritized.', faded: true, blankAnswer: 'Yes, housekeeping can guarantee 15 rooms ready by 9 AM,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_05_007', title: 'Money management is the systematic.',
          scaffold: { problem: 'The Sharma family (parents + two school-going children) has the following monthly inflows: Father\'s salary ₹65,000, Mother\'s tuition income.',
            steps: [
            { text: 'Identify all cash inflows — father\'s salary ₹65,000 + mother\'s tuition ₹12,000 + grandmother\'s pension ₹8,000 =.' },
            { text: 'Identify non-cash tangible inflows — free company flat ₹22,000 + terrace vegetables ₹2,500 + grandmother\'s childcare.' },
            { text: 'Identify intangible satisfaction — father\'s joy from books ₹1,500 worth.' },
            { text: 'Verify no double-counting — grandmother\'s pension is money income to family; her childcare is separate real income.' },
            { text: 'State totals — Total money income = ₹85,000/month. Total real income = ₹31,500/month.', faded: true, blankAnswer: 'Money income = ₹85,000; Real income = ₹31,500; Psychic.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_03_011', title: 'Identify each idea',
          dissect: { specimen: 'Death and Dying: Kubler-Ross Stages and Bereavement Process', spots: [
            { id: 's1', label: 'Death and dying in human', prompt: 'Which idea is this? — Death and dying in human development refers to the final stage of the lifespan where.', answer: 'Death and dying in human', options: ['Death and dying in human', 'Children with Special Needs CWSN', 'Fashion forecasting is the systematic', 'Housing selection involves evaluating a'] },
            { id: 's2', label: 'Children with Special Needs CWSN', prompt: 'Which idea is this? — Children with Special Needs (CWSN) refers to children who have a disability or a.', answer: 'Children with Special Needs CWSN', options: ['Children with Special Needs CWSN', 'Death and dying in human', 'Fashion forecasting is the systematic', 'Housing selection involves evaluating a'] },
            { id: 's3', label: 'Fashion forecasting is the systematic', prompt: 'Which idea is this? — Fashion forecasting is the systematic process of predicting upcoming trends in colours,.', answer: 'Fashion forecasting is the systematic', options: ['Fashion forecasting is the systematic', 'Death and dying in human', 'Children with Special Needs CWSN', 'Housing selection involves evaluating a'] },
            { id: 's4', label: 'Housing selection involves evaluating a', prompt: 'Which idea is this? — Housing selection involves evaluating a residential property based on site.', answer: 'Housing selection involves evaluating a', options: ['Housing selection involves evaluating a', 'Death and dying in human', 'Children with Special Needs CWSN', 'Fashion forecasting is the systematic'] },
            { id: 's5', label: 'Hospitality Management is the professional', prompt: 'Which idea is this? — Hospitality Management is the professional practice of overseeing the operational.', answer: 'Hospitality Management is the professional', options: ['Hospitality Management is the professional', 'Death and dying in human', 'Children with Special Needs CWSN', 'Fashion forecasting is the systematic'] },
            { id: 's6', label: 'Money management is the systematic', prompt: 'Which idea is this? — Money management is the systematic process of planning, organizing, controlling, and.', answer: 'Money management is the systematic', options: ['Money management is the systematic', 'Death and dying in human', 'Children with Special Needs CWSN', 'Fashion forecasting is the systematic'] }
          ] } }
    ],
    explore: { component: C12_HomeScienceSupportServicesSim, prompt: 'Explore the interactive — Death and Dying: Kubler-Ross Stages and Bereavement Process' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_07_012', difficulty: 'standard',
          question: 'Death and dying in human development refers to the final stage of the lifespan.',
          hint: 'Revisit c12_hs_cbse_07_011 (Late Adulthood) for Erikson\'s stage and family role changes,.',
          misconception: 'Students believe Kübler-Ross\'s stages apply identically to both the dying person AND the bereaved family members.',
          parts: [
                { id: 'a', prompt: 'A terminally ill patient says, "The test results must be wrong — I feel perfectly fine, so there\'s no way I have only months to live." Which Kübler-Ross stage.', answer: 'Denial',
                  options: ['Correct answer: Denial', 'bargaining'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Kübler-Ross\'s stages apply identically to both the dying person AND the bereaved family members.' },
                { id: 'b', prompt: 'Explain why Kübler-Ross\'s stages should not be treated as a fixed linear sequence that every dying person passes through in order.', answer: 'Kübler-Ross herself emphasized that stages are not linear',
                  options: ['Correct answer: Kübler-Ross herself emphasized that stages are not linear', 'everyone goes through all five stages in order'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Kübler-Ross\'s stages apply identically to both the dying person AND the bereaved family members.' },
                { id: 'c', prompt: 'A 45-year-old man whose wife died two months ago alternates between: (a) looking at her photos and crying intensely, and (b) focusing on repairing the house.', answer: '(a) is loss-oriented coping (confronting grief directly), (b) is',
                  options: ['Correct answer: (a) is loss-oriented coping (confronting grief directly), (b) is', 'stages of grief', 'he should only grieve'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Kübler-Ross\'s stages apply identically to both the dying person AND the bereaved family members.' }
          ],
            remediations: { 'k-bler-ross-s-stages': { steps: ['Have the student create a two-column table: left column "Dying Person (Kübler-Ross)" with 5 stages, right column.', 'Give three mini-cases — one dying patient, two bereaved relatives — and ask student to label which model applies to.', 'Student explains in own words: "Kübler-Ross describes how a person faces THEIR OWN death; dual-process describes how.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_03_011', difficulty: 'standard',
          question: 'Children with Special Needs (CWSN) refers to children who have a disability or.',
          hint: 'If stuck, revisit c12_hs_cbse_03_002 (Stages of Human Development) and.',
          misconception: 'Students often believe "inclusion = admission" — that enrolling a child with disability in a regular school constitutes.',
          parts: [
                { id: 'a', prompt: 'A REMEMBER level question: List the three models of disability (medical, social, and bio-psycho-social) and state the core belief of each in one sentence.', answer: 'Medical model',
                  options: ['Correct answer: Medical model', 'fixing the person', 'removing barriers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "inclusion = admission" — that enrolling a child with disability in a regular school constitutes inclusion.' }
          ],
            remediations: { 'inclusion-admission-that-enrolling-a': { steps: ['If a student cannot distinguish integration from inclusion or defaults to child-deficit explanations: Step 1 — Have.', 'Step 3 — Give a case study of a child with cerebral palsy; have them list 3 barriers in each domain (physical,.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_03_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "inclusion = admission" — that enrolling a child with disability in a regular school constitutes.',
          parts: [
                { id: 'a', prompt: 'A CREATE level question: Design a one-page "Inclusion Readiness Checklist" for a mainstream primary school teacher to self-assess their classroom\'s inclusivity.', answer: 'A strong answer includes: Physical',
                  options: ['A strong answer includes: Physical', 'inclusion = admission'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "inclusion = admission" — that enrolling a child with disability in a regular school constitutes inclusion.' }
          ],
            remediations: { 'inclusion-admission-that-enrolling-a': { steps: ['If a student cannot distinguish integration from inclusion or defaults to child-deficit explanations: Step 1 — Have.', 'Step 3 — Give a case study of a child with cerebral palsy; have them list 3 barriers in each domain (physical,.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_08_010', difficulty: 'standard',
          question: 'Fashion forecasting is the systematic process of predicting upcoming trends in.',
          hint: 'If unable to stage a trend, revisit c12_hs_cbse_08_009 and practice with 10 real Indian.',
          misconception: 'Students equate fashion forecasting with "following influencers" or "copying runway looks." They believe forecasting is.',
          parts: [
                { id: 'a', prompt: 'Compare the fashion adoption curve (trickle-down, trickle-up, trickle-across) with the technology adoption lifecycle (innovators, early adopters, early.', answer: '**Mapping**: Trickle-down = designer labels adopt banana fibre denim first',
                  options: ['**Mapping**: Trickle-down = designer labels adopt banana fibre denim first', 'Indian context application', 'forecasters look at Instagram to see what\'s trending'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate fashion forecasting with "following influencers" or "copying runway looks." They believe forecasting is about *identifying*.' }
          ],
            remediations: { 'students-equate-fashion-forecasting-with': { steps: ['Revisit **c12_hs_cbse_08_009 (Fashion Cycle)** — map 5 Indian trends (e.g., chikankari revival, neon ethnic wear,.', 'Study **Pantone Fashion Color Trend Report** (any recent season) — note how they justify each colour with *cultural.', 'Practice: Take a newspaper\'s "Year in Review" cultural section — extract 3 non-fashion signals (e.g., "rise in solo.', 'Re-attempt Diagnostic Question 6 with this structured approach.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_08_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate fashion forecasting with "following influencers" or "copying runway looks." They believe forecasting is.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Social media (Instagram, Pinterest) has made professional trend forecasting agencies obsolete because real-time data is freely.', answer: '**Critique**: The statement is false',
                  options: ['**Critique**: The statement is false', 'data quality issues', 'forecasters look at Instagram to see what\'s trending'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate fashion forecasting with "following influencers" or "copying runway looks." They believe forecasting is about *identifying*.' },
                { id: 'b', prompt: 'Create a mini trend forecast for "Men\'s Festive Wear 2026" in India.', answer: '**Expected answer criteria**: (a) Macro theme: "Tech-Tradition Fusion"',
                  options: ['**Expected answer criteria**: (a) Macro theme: "Tech-Tradition Fusion"', 'forecasters look at Instagram to see what\'s trending'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate fashion forecasting with "following influencers" or "copying runway looks." They believe forecasting is about *identifying*.' },
                { id: 'c', prompt: 'Compare the fashion adoption curve (trickle-down, trickle-up, trickle-across) with the technology adoption lifecycle (innovators, early adopters, early.', answer: '**Mapping**: Trickle-down = designer labels adopt banana fibre denim first',
                  options: ['**Mapping**: Trickle-down = designer labels adopt banana fibre denim first', 'Indian context application', 'forecasters look at Instagram to see what\'s trending'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate fashion forecasting with "following influencers" or "copying runway looks." They believe forecasting is about *identifying*.' }
          ],
            remediations: { 'students-equate-fashion-forecasting-with': { steps: ['Revisit **c12_hs_cbse_08_009 (Fashion Cycle)** — map 5 Indian trends (e.g., chikankari revival, neon ethnic wear,.', 'Study **Pantone Fashion Color Trend Report** (any recent season) — note how they justify each colour with *cultural.', 'Practice: Take a newspaper\'s "Year in Review" cultural section — extract 3 non-fashion signals (e.g., "rise in solo.', 'Re-attempt Diagnostic Question 6 with this structured approach.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_11_009', difficulty: 'standard',
          question: 'Housing selection involves evaluating a residential property based on site.',
          hint: 'If unable to zone a plan, revisit c11_hs_cbse_07_010 and practice colour-coding.',
          misconception: 'Students often believe "space planning = furniture arrangement".',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the orientation of a house matters for natural lighting and ventilation in the Indian context.', answer: 'In India, the sun traverses the southern sky',
                  options: ['Correct answer: In India, the sun traverses the southern sky', 'orientation doesn\'t matter', 'space planning = furniture arrangement'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "space planning = furniture arrangement".' },
                { id: 'b', prompt: 'Compare two house plans for a family of four: Plan A has a long central corridor connecting all rooms; Plan B uses a central living area as the circulation hub.', answer: 'Plan B is superior',
                  options: ['Correct answer: Plan B is superior', 'corridors provide privacy', 'space planning = furniture arrangement'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "space planning = furniture arrangement".' }
          ],
            remediations: { 'space-planning-furniture-arrangement': { steps: ['Revisit c11_hs_cbse_07_010 (Space Management: Principles of Space Planning for Homes) — re-read the definitions of.', 'Take a simple floor plan (e.g., your own home) and colour-code the four zones (social, private, service, transition).', 'Trace daily movement paths (wake up → bathroom → kitchen → dining → work) with a red pen; identify bottlenecks or zone.', 'Re-attempt Diagnostic Question 3 and 4, this time explicitly naming the principle violated in each step.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_11_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "space planning = furniture arrangement".',
          parts: [
                { id: 'a', prompt: 'A builder advertises a flat with "100% space utilisation — no wasted corridors!" The floor plan shows the main door opening directly into the master bedroom,.', answer: 'The claim is misleading',
                  options: ['Correct answer: The claim is misleading', 'saving space', 'space planning = furniture arrangement', '"space planning = furniture arrangement"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "space planning = furniture arrangement".' },
                { id: 'b', prompt: 'Design a space plan for a 45 m² studio apartment for a young professional who works from home, cooks daily, and entertains occasionally.', answer: 'Expected answer: Zone 1 (Sleeping/Private)',
                  options: ['Expected answer: Zone 1 (Sleeping/Private)', 'space planning = furniture arrangement', '"space planning = furniture arrangement"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "space planning = furniture arrangement".' },
                { id: 'c', prompt: 'Compare two house plans for a family of four: Plan A has a long central corridor connecting all rooms; Plan B uses a central living area as the circulation hub.', answer: 'Plan B is superior',
                  options: ['Correct answer: Plan B is superior', 'corridors provide privacy', 'space planning = furniture arrangement', '"space planning = furniture arrangement"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "space planning = furniture arrangement".' }
          ],
            remediations: { 'space-planning-furniture-arrangement': { steps: ['Revisit c11_hs_cbse_07_010 (Space Management: Principles of Space Planning for Homes) — re-read the definitions of.', 'Take a simple floor plan (e.g., your own home) and colour-code the four zones (social, private, service, transition).', 'Trace daily movement paths (wake up → bathroom → kitchen → dining → work) with a red pen; identify bottlenecks or zone.', 'Re-attempt Diagnostic Question 3 and 4, this time explicitly naming the principle violated in each step.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_11_011', difficulty: 'standard',
          question: 'Hospitality Management is the professional practice of overseeing the.',
          hint: 'Revisit c12_hs_cbse_11_003 (Management Process) and write out the.',
          misconception: 'Students often think “Housekeeping only cleans rooms” and “Front Office only checks people in.” In reality,.',
          parts: [
                { id: 'a', prompt: 'List the four stages of the guest cycle in correct sequential order.', answer: 'Correct sequence: 1) Pre-arrival, 2) Arrival, 3) Occupancy, 4) Departure',
                  options: ['Correct sequence: 1) Pre-arrival, 2) Arrival, 3) Occupancy, 4) Departure', 'Housekeeping only cleans rooms', 'housekeeping provides food to customers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “Housekeeping only cleans rooms” and “Front Office only checks people in.” In reality, housekeeping maintains public.' },
                { id: 'b', prompt: 'A guest calls the front desk at 2 AM requesting a room change due to a noisy air conditioner.', answer: 'Bellboys (uniformed services under front office) move luggage',
                  options: ['Bellboys (uniformed services under front office) move luggage', 'housekeeping moves luggage', 'front office does everything'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “Housekeeping only cleans rooms” and “Front Office only checks people in.” In reality, housekeeping maintains public.' },
                { id: 'c', prompt: 'Compare the organisational hierarchy of the front office (Fig. 17.3) and housekeeping (Fig. 17.6).', answer: 'Front office: Front Office Supervisor (shift-level) coordinates 24/7',
                  options: ['Front office: Front Office Supervisor (shift-level) coordinates 24/7', 'Front Office Manager', 'Executive Housekeeper'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “Housekeeping only cleans rooms” and “Front Office only checks people in.” In reality, housekeeping maintains public.' }
          ],
            remediations: { 'housekeeping-only-cleans-rooms-and': { steps: ['If a student cannot distinguish departmental functions, have them create a 3-column table: Department | Primary.', 'Then give them 5 mini-scenarios (e.g., “Guest finds hair on pillow,” “Guest needs taxi at 4 AM,” “Guest wants to book a.', 'After they complete this, ask them to explain why the control desk must be 24-hour — if they hesitate, re-read the.', 'This concrete mapping + scenario practice replaces vague memorisation with operational clarity.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_05_007', difficulty: 'standard',
          question: 'Money management is the systematic process of planning, organizing,.',
          hint: 'If stuck on income classification, revisit c11_hs_cbse_10_003 and practice with 10 real.',
          misconception: 'Students believe "budgeting means cutting expenses" and "real income is only what you grow yourself." The first error.',
          parts: [
                { id: 'a', prompt: 'Construct a monthly budget for a family with money income ₹80,000 and real income ₹25,000 (free housing ₹20,000 + home-grown food ₹5,000).', answer: 'Total income = ₹80,000 + ₹25,000 = ₹1,05,000',
                  options: ['Total income = ₹80,000 + ₹25,000 = ₹1,05,000', 'budgeting means cutting expenses', 'real income is only what you grow yourself'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "budgeting means cutting expenses" and "real income is only what you grow yourself." The first error leads to budgets that.' }
          ],
            remediations: { 'budgeting-means-cutting-expenses-and': { steps: ['Revisit c11_hs_cbse_10_003 (Family Income: Money Income, Real Income and Psychic Income) — list 10 income sources from.', 'Revisit c11_hs_cbse_10_006 (Steps in Making a Family Budget and Advantages of Budgeting) — re-read the 5-step process.', 'Take a sample monthly income of ₹60,000 and build a budget using the priority-ranking method from Diagnostic Question 6.', 'Re-diagnostic: Ask a peer to give you a new family scenario (income, composition, goals) and build a budget in 15.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "budgeting means cutting expenses" and "real income is only what you grow yourself." The first error.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "A budget that shows zero surplus (income = expenditure) is a perfect budget." Defend or critique using three arguments from money.', answer: 'Critique: A zero-surplus budget is fragile, not perfect',
                  options: ['Critique: A zero-surplus budget is fragile, not perfect', 'balancing', 'optimising', 'budgeting means cutting expenses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "budgeting means cutting expenses" and "real income is only what you grow yourself." The first error leads to budgets that.' },
                { id: 'b', prompt: 'Design a budgeting template (table format) for a family with irregular income (e.g., freelancer father, seasonal agricultural mother) that incorporates: (a).', answer: 'Template columns: Month | Projected Income (3-month avg) | Actual Income |',
                  options: ['Template columns: Month | Projected Income (3-month avg) | Actual Income |', 'budgeting means cutting expenses', 'real income is only what you grow yourself'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "budgeting means cutting expenses" and "real income is only what you grow yourself." The first error leads to budgets that.' }
          ],
            remediations: { 'budgeting-means-cutting-expenses-and': { steps: ['Revisit c11_hs_cbse_10_003 (Family Income: Money Income, Real Income and Psychic Income) — list 10 income sources from.', 'Revisit c11_hs_cbse_10_006 (Steps in Making a Family Budget and Advantages of Budgeting) — re-read the 5-step process.', 'Take a sample monthly income of ₹60,000 and build a budget using the priority-ranking method from Diagnostic Question 6.', 'Re-diagnostic: Ask a peer to give you a new family scenario (income, composition, goals) and build a budget in 15.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
