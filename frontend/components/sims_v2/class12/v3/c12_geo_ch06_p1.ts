import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch06_p1: SimDef = {
    id: 'v3_c12_geo_ch06_p1',
    title: 'Secondary Activities · Part 1/2',
    subtitle: 'A tailor stitching imported cloth isn\'t \'industry\' — here\'s why',
    classLevel: 12, subject: 'geography', topic: 'Secondary Activities · Part 1/2',
    chapters: ['c12_geo_ch06'],
    nodeIds: ['c12_geo_cbse_06_001', 'c12_geo_cbse_06_002', 'c12_geo_cbse_06_003', 'c12_geo_cbse_06_004', 'c12_geo_cbse_06_005', 'c12_geo_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Industrial geographer', intro: 'Everything in your classroom was once raw. The transformation that made it — that\'s the secondary sector\'s whole story.', goal: 'Define secondary activities through value addition and link industrial location to raw materials, power and markets.' },
    discovery: {
        question: 'Cotton grown, cotton woven, shirts sold, bales trucked — which of these four is the secondary activity?',
        options: ['The weaving — it transforms a raw material into a manufactured good; growing is primary, selling and trucking are tertiary', 'The growing — it comes first', 'The selling — it\'s the final stage', 'All four together'],
        answer: 'The weaving — it transforms a raw material into a manufactured good; growing is primary, selling and trucking are tertiary',
        hook: 'Secondary isn\'t just \'big factories with chimneys\' — pottery, handlooms and food processing count too. And the real definition is economic: value addition, where the output outvalues the inputs — crude oil\'s parts are worth far more apart than together.',
    },
    teaching: [
        { title: 'Secondary Activities: Definition and Importance', text: 'Secondary activities involve the processing of raw materials obtained from the primary sector (agriculture, mining, forestry, fishing) into finished or semi-finished goods through manufacturing.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow a raw material\'s climb up the value ladder: turn sugarcane into sugar stage by stage, locate an aluminium smelter by its ore and power needs, and weigh manufacturing\'s jobs-versus-pollution ledger.',
        labels: ['Secondary Activities: Definition', 'Manufacturing: Processing of Raw', 'Household Industries (Cottage Industries)', 'Small-Scale Industries: Features', 'Large-Scale Industries: Characteristics', 'Factors Affecting Industrial Location'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_06_001', title: 'Secondary Activities: Definition and Importance',
          scaffold: { problem: 'Classify each activity as Primary (P), Secondary (S), or Tertiary (T): (i) Mining limestone, (ii) Making cement from limestone, (iii).',
            steps: [
            { text: 'Identify the nature of each activity — extraction, transformation, transport, professional service, construction.' },
            { text: 'Recall definitions: Primary = extraction of natural resources; Secondary = processing/manufacturing/construction.' },
            { text: 'Apply to (i): Limestone is extracted from earth → Primary.' },
            { text: 'Apply to (ii): Limestone chemically transformed into cement in a factory → Secondary (manufacturing).' },
            { text: 'Apply to (iii): Movement of goods → Tertiary (transport service).' },
            { text: 'Apply to (iv): Intellectual/professional service → Tertiary.' },
            { text: 'Apply to (v): Construction is a secondary activity (creates fixed asset) → Secondary.', faded: true, blankAnswer: '(i) P, (ii) S, (iii) T, (iv) T, (v) S.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_06_002', title: 'Manufacturing: Processing of Raw Materials and Value Addition',
          scaffold: { problem: 'A mini steel plant in Raipur uses 1,200 tonnes/day of iron ore (65% Fe) and 400 tonnes/day of coal to produce 600 tonnes/day of crude steel.',
            steps: [
            { text: 'Calculate Fe input = 1,200 × 0.65 = 780 tonnes Fe/day. Fe in steel = 600 × 0.992 = 595.2 tonnes Fe/day (since 0.8% C).' },
            { text: 'Total input weight = 1,200 (ore) + 400 (coal) = 1,600 tonnes. Total output weight = 600 (steel) + 300 (slag).' },
            { text: 'Daily input cost = (1,200 × 5,000) + (400 × 8,000) = ₹60 lakh + ₹32 lakh = ₹92 lakh.' },
            { text: 'Value added per day = ₹330 lakh – ₹92 lakh = ₹238 lakh. Value added per tonne steel = ₹238 lakh / 600 = ₹39,667/t.' },
            { text: 'Interpret: High weight loss (62.5%) pulls plant to raw material (iron ore/coal) — Raipur is on Chotanagpur plateau.', faded: true, blankAnswer: '(a) Fe recovery = 76.3%. (b) Weight loss ratio = 62.5%. (c).' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_06_003', title: 'Household Industries (Cottage Industries): Characteristics',
          caseStudy: { intro: 'Observe a weaver in Varanasi working on a handloom at home: the whole family participates, yarn is sourced locally, tools are simple, and the finished saree.',
            decisions: [{ prompt: 'Define household industry and state two features that distinguish it from a small-scale industry.', options: [
                { text: 'A household industry is a manufacturing unit run by family members at home using simple', outcome: 'A household industry is a manufacturing unit run by family members at home using simple tools and.' },
                { text: 'both use hired labour', outcome: 'Not quite — Students often equate "household industry" with "any small business run from home" (e.g.,.', reveals: 'students-often-equate-household-industry' },
                { text: 'both require factory premises', outcome: 'Not quite — Students often equate "household industry" with "any small business run from home" (e.g.,.', reveals: 'students-often-equate-household-industry' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_06_006', title: 'Factors Affecting Industrial Location: Raw Materials, Power, Labour',
          scaffold: { problem: 'A sugar mill in Uttar Pradesh processes 5000 tonnes of sugarcane daily (sucrose content 12%).',
            steps: [
            { text: 'Identify localized raw material = sugarcane (perishable, bulky).' },
            { text: 'Calculate weight-loss ratio: WLR = (5000 − 525) / 5000 = 0.895. Sugar output = 5000 × 10.5% = 525 tonnes.' },
            { text: 'Bagasse = 5000 × 30% = 1500 tonnes (used as boiler fuel — reduces power cost).' },
            { text: 'Sugarcane perishability: sucrose inversion starts 24 hrs post-harvest; transport cost ₹3/tonne-km.' },
            { text: 'Verify with real data: UP has 120+ mills in cane belt (Meerut, Muzaffarnagar, Bijnor) — all within 15–25 km radius.', faded: true, blankAnswer: '(a) WLR = 0.895; (b) 525 tonnes sugar/day; (c) 1500 tonnes.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend\'s agri-startup is pitching two units to investors: a sugar mill and a beverage-bottling plant. To save on \'factory costs\', the deck puts both units side-by-side at a single industrial park near the city market.',
            decisions: [{ prompt: 'What does the geography of manufacturing say about that site plan?', options: [
                { text: 'Split them — the sugar mill belongs in the cane fields because cane loses sucrose within a day or two of cutting and sheds weight as it\'s crushed; the bottling plant belongs near the market because adding water makes the product heavier, so value-to-weight pulls it marketward.', outcome: 'Perishability and weight-loss push raw-material-oriented location; weight-gain pushes market-oriented location — the same industrial park can\'t be right for both ends of that logic.' },
                { text: 'Approve it — co-locating shares power and labour, and raw materials can always be trucked in.', outcome: 'Trucking cane loses sucrose to enzymatic inversion on the way — the value literally evaporates in transit; the chapter\'s 24–48 hour crushing window is why mills sit inside cane belts, not beside markets.', reveals: 'location-is-just-rent' },
                { text: 'Object that neither counts as real manufacturing anyway — both are just processing, not factory production.', outcome: 'That\'s the scale misconception: manufacturing is any transformation of raw material into a more valuable product — a village oil ghani and a pulping plant qualify; the objection discards the framework instead of using it.', reveals: 'manufacturing-needs-machines' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read any product as a value-adding chain — and predict where its factory will stand by asking what it needs most: ore, power, or buyers.',
            decisions: [{ prompt: 'What comes next? Secondary Activities · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Secondary Activities · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_06_001', difficulty: 'standard',
          question: 'Secondary activities involve the processing of raw materials obtained from the.',
          hint: 'If unable to distinguish sectors, revisit Class 10 Economics chapter \'Sectors of the.',
          misconception: 'Students often equate \'secondary activities\' only with large factories (chimneys, assembly lines) and exclude.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary activities involve the processing of raw materials obtained from the primary',
                  options: ['Secondary activities involve the processing of raw materials obtained from the primary', 'Manufacturing is the process of transforming raw materials extracted from the primary', 'Household industries (cottage industries) are the smallest manufacturing units where', 'Small-scale industries (SSIs) are industrial units with investment in plant and machinery'],
                  hint: 'If unable to distinguish sectors, revisit Class 10 Economics chapter \'Sectors of the Indian.',
                  misconception: 'Students often equate \'secondary activities\' only with large factories (chimneys, assembly lines) and exclude small-scale household.' }
          ],
            remediations: { 'students-often-equate-secondary-activities': { steps: ['Revisit Class 10 node c10_geo_cbse_06_001 (Manufacturing: Importance and Industrial Location Factors) — focus on the.', 'Create a three-column table: Primary / Secondary / Tertiary. List 5 local examples for each from your district (e.g.', 'For each secondary example, trace the raw material to its primary source and the final product to its tertiary seller.', 'Re-attempt Diagnostic Question 1 and 2. If confusion persists, watch the NCERT Class 12 Geography lecture on \'Secondary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_06_002', difficulty: 'standard',
          question: 'Manufacturing is the process of transforming raw materials extracted from the.',
          hint: 'If stuck, revisit c10_geo_cbse_06_001 (Manufacturing: Importance and Industrial Location.',
          misconception: 'Students think "manufacturing = factory production" and equate it only with large-scale, machine-driven assembly lines.',
          parts: [
                { id: 'a', prompt: 'Define \'value addition\' in manufacturing and give one example each of a weight-losing industry and a weight-gaining industry.', answer: 'Value addition is the increase in economic value of a product at each stage of',
                  options: ['Value addition is the increase in economic value of a product at each stage of', 'textile is weight-losing', 'manufacturing = factory production'],
                  hint: 'If stuck, revisit c10_geo_cbse_06_001 (Manufacturing: Importance and Industrial Location Factors).',
                  misconception: 'Students think "manufacturing = factory production" and equate it only with large-scale, machine-driven assembly lines.' },
                { id: 'b', prompt: 'A bauxite mine in Odisha produces 10 lakh tonnes/year of ore (Al₂O₃ content 45%). The alumina refinery extracts alumina (Al₂O₃) with 90% recovery.', answer: 'Step 1: Al₂O₃ in ore = 10,00,000 × 0.45 = 4,50,000 tonnes',
                  options: ['Step 1: Al₂O₃ in ore = 10,00,000 × 0.45 = 4,50,000 tonnes', 'manufacturing = factory production'],
                  hint: 'If stuck, revisit c10_geo_cbse_06_001 (Manufacturing: Importance and Industrial Location Factors).',
                  misconception: 'Students think "manufacturing = factory production" and equate it only with large-scale, machine-driven assembly lines.' }
          ],
            remediations: { 'manufacturing-factory-production-and-equate': { steps: ['If the student cannot distinguish manufacturing from services or primary activities: (1) Revisit c12_geo_cbse_06_001.', 'no — wheat → flour is manufacturing), a vegetable vendor (tertiary — no transformation), a brick kiln (manufacturing.', '(3) Draw a 3-column table: Activity | Input | Output | Value Added?', 'Complete for 10 local activities.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "manufacturing = factory production" and equate it only with large-scale, machine-driven assembly lines.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India\'s manufacturing share in GDP has stagnated at 15–17% because we export raw materials (iron ore, cotton) instead of processed.', answer: 'The statement is partially correct but oversimplified',
                  options: ['The statement is partially correct but oversimplified', 'colonial legacy', 'policy neglect', 'manufacturing = factory production'],
                  hint: 'If stuck, revisit c10_geo_cbse_06_001 (Manufacturing: Importance and Industrial Location Factors).',
                  misconception: 'Students think "manufacturing = factory production" and equate it only with large-scale, machine-driven assembly lines.' }
          ],
            remediations: { 'manufacturing-factory-production-and-equate': { steps: ['If the student cannot distinguish manufacturing from services or primary activities: (1) Revisit c12_geo_cbse_06_001.', 'no — wheat → flour is manufacturing), a vegetable vendor (tertiary — no transformation), a brick kiln (manufacturing.', '(3) Draw a 3-column table: Activity | Input | Output | Value Added?', 'Complete for 10 local activities.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_06_003', difficulty: 'standard',
          question: 'Household industries (cottage industries) are the smallest manufacturing units.',
          hint: 'If stuck, review the "Manufacturing: Processing of Raw Materials" node.',
          misconception: 'Students often equate "household industry" with "any small business run from home" (e.g., a home-based tuition centre.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Household industries (cottage industries) are the smallest manufacturing units where',
                  options: ['Household industries (cottage industries) are the smallest manufacturing units where', 'Secondary activities involve the processing of raw materials obtained from the primary', 'Manufacturing is the process of transforming raw materials extracted from the primary', 'Small-scale industries (SSIs) are industrial units with investment in plant and machinery'],
                  hint: 'If stuck, review the "Manufacturing: Processing of Raw Materials" node (c12_geo_cbse_06_002) and.',
                  misconception: 'Students often equate "household industry" with "any small business run from home" (e.g., a home-based tuition centre or a freelance.' }
          ],
            remediations: { 'students-often-equate-household-industry': { steps: ['Revisit the definition in node c12_geo_cbse_06_002 (Manufacturing) and note the phrase "processing of raw materials".', 'Make a two-column table: Column A = manufacturing examples (pottery, weaving, oil pressing), Column B = service.', 'Use the MSME classification chart (investment + employment) from the Ministry website to see where household industries.', 'Re-attempt Diagnostic Question 3 after 24 hours.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_06_004', difficulty: 'standard',
          question: 'Small-scale industries (SSIs) are industrial units with investment in plant and.',
          hint: 'If confused, re-read c11_geo_cbse_20_007 and c12_geo_cbse_06_003 side-by-side; make.',
          misconception: 'Students equate "small-scale industry" with "cottage/household industry" and write "family labour, no power.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Small-scale industries (SSIs) are industrial units with investment in plant and machinery',
                  options: ['Small-scale industries (SSIs) are industrial units with investment in plant and machinery', 'Secondary activities involve the processing of raw materials obtained from the primary', 'Manufacturing is the process of transforming raw materials extracted from the primary', 'Household industries (cottage industries) are the smallest manufacturing units where'],
                  hint: 'If confused, re-read c11_geo_cbse_20_007 and c12_geo_cbse_06_003 side-by-side; make.',
                  misconception: 'Students equate "small-scale industry" with "cottage/household industry" and write "family labour, no power, home-based" as features.' }
          ],
            remediations: { 'students-equate-small-scale-industry': { steps: ['Revisit c11_geo_cbse_20_007 (Class 11 SSI features) and make a 3-column table: Household vs Small-Scale vs Large-Scale.', 'Watch 10-min video "Moradabad Brass Cluster" (YouTube: NCERT official) — note power tools, hired workers, export.', 'Re-attempt Diagnostic Q1 and Q2.', 'If investment limit still wrong, write ₹1 crore on 5 flashcards with "MSMED 2006" and place on study wall.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_06_005', difficulty: 'standard',
          question: 'Large-scale industries are manufacturing units that employ a large workforce.',
          hint: 'If stuck, review the comparison table in c12_geo_cbse_06_004 and the Weberian factors.',
          misconception: 'Students often equate "large-scale industry" **only with heavy industries** (iron & steel, cement) and forget that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Large-scale industries are manufacturing units that employ a large workforce (typically',
                  options: ['Large-scale industries are manufacturing units that employ a large workforce (typically', 'Secondary activities involve the processing of raw materials obtained from the primary', 'Manufacturing is the process of transforming raw materials extracted from the primary', 'Household industries (cottage industries) are the smallest manufacturing units where'],
                  hint: 'If stuck, review the comparison table in c12_geo_cbse_06_004 and the Weberian factors.',
                  misconception: 'Students often equate "large-scale industry" **only with heavy industries** (iron & steel, cement) and forget that **automobile.' }
          ],
            remediations: { 'students-often-equate-large-scale': { steps: ['Revisit **c12_geo_cbse_06_004** (Small-Scale Industries) to sharpen the contrast table: capital, labour, technology.', 'Open the latest **MSMED Act notification** (or PIB release) and note the current investment limits for.', 'On a map of India, mark **five large-scale industrial clusters** (Jamshedpur, Bhilai, Gurugram, Pune, Chennai) and.', 'Re-attempt Diagnostic Questions 3 and 4 after 24 hours.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_06_006', difficulty: 'standard',
          question: 'Industrial location factors are the geographical, economic, and infrastructural.',
          hint: 'Revisit c10_geo_cbse_06_007 — focus on the material index formula and the three vertices.',
          misconception: 'Students believe "industries always locate near raw materials" — they apply the weight-losing principle universally.',
          parts: [
                { id: 'a', prompt: 'Why did the aluminium industry shift from coal-field locations (e.g., Renukoot) to hydroelectric sites (e.g., Korba, Mettur) despite bauxite being the raw.', answer: 'Aluminium smelting requires 13,000–15,000 kWh per tonne (power intensity ~40% of',
                  options: ['Aluminium smelting requires 13,000–15,000 kWh per tonne (power intensity ~40% of', 'aluminium near bauxite', 'industries always locate near raw materials'],
                  hint: 'Revisit c10_geo_cbse_06_007 — focus on the material index formula and the three vertices of Weber\'s.',
                  misconception: 'Students believe "industries always locate near raw materials" — they apply the weight-losing principle universally.' },
                { id: 'b', prompt: 'A cotton textile mill requires 1.5 tonnes of raw cotton (grown in Maharashtra), 500 kWh electricity, and 200 labour-days per 1000 metres of cloth.', answer: 'Raw cotton needed = 1.5 tonnes = 1500 kg',
                  options: ['Raw cotton needed = 1.5 tonnes = 1500 kg', 'industries always locate near raw materials'],
                  hint: 'Revisit c10_geo_cbse_06_007 — focus on the material index formula and the three vertices of Weber\'s.',
                  misconception: 'Students believe "industries always locate near raw materials" — they apply the weight-losing principle universally.' }
          ],
            remediations: { 'industries-always-locate-near-raw': { steps: ['Revisit c10_geo_cbse_06_007 (Industrial Location Factors) — re-read Weber\'s triangular model and weight-loss ratio.', 'Create a table classifying 10 Indian industries (from c11_geo_cbse_20_002–004) by dominant factor using weight-loss.', 'For each, calculate locational coefficient = (localized input weight / total input weight) × 100.', 'Plot on India map — observe clustering patterns.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
