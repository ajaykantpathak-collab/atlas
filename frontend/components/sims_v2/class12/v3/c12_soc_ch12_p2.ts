import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch12_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch12_p2: SimDef = {
    id: 'v3_c12_soc_ch12_p2',
    title: 'Change and Development in Industrial Society · Part 2/2',
    subtitle: 'The machine didn\'t just make cloth — it remade the worker',
    classLevel: 12, subject: 'sociology', topic: 'Change and Development in Industrial Society · Part 2/2',
    chapters: ['c12_soc_ch12'],
    nodeIds: ['c12_soc_cbse_12_007', 'c12_soc_cbse_12_008', 'c12_soc_cbse_12_009', 'c12_soc_cbse_12_010', 'c12_soc_cbse_12_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Labour sociologist', intro: 'The saree and the polyester shirt carry different histories: one of a maker, one of a pair of hands.', goal: 'Analyse the handicraft-to-factory shift as social change and identify India\'s distinct informal-sector trajectory.' },
    discovery: {
        question: 'A Bengal weaver picks the pattern, sets the pace, owns the loom and the cloth. A Tirupur machinist stitches one seam, shift-timed, for a wage, and never sees the finished shirt. Same industry — what actually changed?',
        options: ['Control over the labour process itself — the artisan owns tools and product; the worker sells labour-power and answers to the machine\'s pace', 'Nothing but the technology', 'Only the wages', 'The factory worker is more skilled'],
        answer: 'Control over the labour process itself — the artisan owns tools and product; the worker sells labour-power and answers to the machine\'s pace',
        hook: 'India never replayed the European script — colonial rule destroyed handicrafts without building factories to absorb the artisans, and nine in ten Indian workers still labour informally. Bidi rollers at home are industrial workers who never see a factory.',
    },
    teaching: [
        { title: 'Industrial Labour in India: Migrant Labour, Bonded Labour and Child Labour', text: 'Industrial labour in India encompasses three distinct but often overlapping vulnerable categories: **migrant labour** (workers who move across regions/states for temporary or seasonal employment.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_12_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Contrast the handloom with the assembly line across control, product and hierarchy — then map why India\'s version runs on contract labour and home-based piece rates.',
        labels: ['Industrial Labour in India', 'The Impact of Globalisation', 'The Service Sector', 'Women in the Industrial', 'Industrialisation and Urbanisation'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_12_008', title: 'The Impact of Globalisation on Industrial Labour: Liberalisation, FDI and Outsourcing',
          caseStudy: { intro: 'Imagine a 28-year-old engineer at a Gurugram auto-components firm: she works 12-hour shifts, gets no overtime pay because she is a "fixed-term contract".',
            decisions: [{ prompt: 'Define "disinvestment" in the context of India\'s post-1991 liberalisation and state one documented consequence for workers in a privatised.', options: [
                { text: 'Disinvestment is the government selling its equity stake in public sector enterprises to', outcome: 'Disinvestment is the government selling its equity stake in public sector enterprises to private.' },
                { text: 'disinvestment means closing factories', outcome: 'Not quite — Students equate "globalisation" with "more jobs" or "modernisation" and miss that NCERT frames.', reveals: 'students-equate-globalisation-with-more' },
                { text: 'workers got better pay', outcome: 'Not quite — Students equate "globalisation" with "more jobs" or "modernisation" and miss that NCERT frames.', reveals: 'students-equate-globalisation-with-more' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_12_010', title: 'Women in the Industrial Workforce: Discrimination, Wage Gap and the Double Burden',
          caseStudy: { intro: 'Imagine a young woman in Tamil Nadu who works 10 hours in a fish-processing plant, then returns home to cook, clean, and care for children while her brother.',
            decisions: [{ prompt: 'Define the term \'double burden\' as it applies to women in the industrial workforce, and give one example from the NCERT text.', options: [
                { text: 'The double burden refers to women\'s simultaneous responsibility for paid employment and', outcome: 'The double burden refers to women\'s simultaneous responsibility for paid employment and unpaid.' },
                { text: 'the gender wage gap exists only', outcome: 'Not quite — Students often think the gender wage gap exists only because women choose lower-paying jobs or work.', reveals: 'the-gender-wage-gap-exists' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_12_011', title: 'Industrialisation and Urbanisation: The Growth of Industrial Towns and Slums',
          caseStudy: { intro: 'Imagine you are standing in Girangaon (Mumbai) in 1980: the air hums with 60 textile mills, and chawls house generations of mill workers who built the city.',
            decisions: [{ prompt: 'Define \'circular migration\' in the context of Indian industrial towns and explain how it differs from permanent rural-urban migration.', options: [
                { text: 'Circular migration is a pattern where migrant workers move seasonally or periodically', outcome: 'Circular migration is a pattern where migrant workers move seasonally or periodically between their.' },
                { text: 'circular migration means daily commuting from suburb to factory', outcome: 'Not quite — **Misconception:** "Slums exist because poor people migrate to cities and build illegal huts; if.', reveals: 'misconception-slums-exist-because-poor' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A debate-team member argues \'industrialisation levelled society — nobody asks your caste on a metro or a factory floor, so equality followed the machine.\'',
            decisions: [{ prompt: 'What do the classical sociologists add to that claim?', options: [
                { text: 'Half the picture — public anonymity did weaken ritual markers in shared spaces, but the factory also built a detailed division of labour and new class lines; Marx\'s alienation names the worker cut off from product, process and peers — equality in the queue, inequality on the payslip.', outcome: 'The chapter\'s balance: industrial society trades caste visibility for economic stratification — \'nobody asks your caste\' is real, and so is the income gap that grew alongside it.' },
                { text: 'He\'s right — machines replaced birth with merit, so hierarchy ended.', outcome: 'Merit arrived inside a new hierarchy — bourgeoisie and proletariat replaced estates; anonymous work relations didn\'t dissolve rank, they rebuilt it on capital.', reveals: 'machines-ended-hierarchy' },
                { text: 'The opposite — industrialisation only deepened every old hierarchy unchanged.', outcome: 'The shift was real too — Durkheim\'s move from mechanical to organic solidarity and anonymous public spaces did change how people relate; \'nothing changed\' misses the urbanisation and solidarity shift as much as the equality claim misses the class structure.', reveals: 'industry-changed-nothing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_12_011', title: 'You made it',
          caseStudy: { intro: 'You can now explain industrialisation as a rewiring of social relations, not just machines — and why liberalisation grew jobs while shrinking job security.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_12_007', difficulty: 'standard',
          question: 'Industrial labour in India encompasses three distinct but often overlapping.',
          hint: 'Revisit Class 11 Sociology Chapter 3 (Work and Economic Institutions) for formal/informal.',
          misconception: '**“Migrant labour, bonded labour, and child labour are just different names for the same exploited workers.”** Students.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** A contractor gives a ₹10,000 advance to a Dalit family in Bihar to work at a brick kiln in Punjab.', answer: '**Correct answer:** Migrant labour involves spatial movement for work',
                  options: ['**Correct answer:** Migrant labour involves spatial movement for work', 'just migrant labour with debt'],
                  hint: 'Revisit Class 11 Sociology Chapter 3 (Work and Economic Institutions) for formal/informal.',
                  misconception: '**“Migrant labour, bonded labour, and child labour are just different names for the same exploited workers.”** Students often conflate the.' }
          ],
            remediations: { 'migrant-labour': { steps: ['**Re-visit definitions:** Use the NCERT table (p.', '68–69) to create a **compare-contrast chart** with columns: *Recruitment mechanism, Coercion type, Legal provision.', '**Re-do diagnostic Q2 & Q3** with fresh cases: (a) A construction worker in Delhi who borrowed ₹5,000 from a *thekedar*.', '(b) A 13-year-old helping in father’s auto-repair shop — legal?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_12_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**“Migrant labour, bonded labour, and child labour are just different names for the same exploited workers.”** Students.',
          parts: [
                { id: 'a', prompt: '**EVALUATE:** “The Inter-State Migrant Workmen Act, 1979 has failed because it treats migration as a regulatory issue, not a rights issue.” Critique this.', answer: '**Correct answer:** The statement is **largely valid**',
                  options: ['**Correct answer:** The statement is **largely valid**', 'the Act is good but not implemented'],
                  hint: 'Revisit Class 11 Sociology Chapter 3 (Work and Economic Institutions) for formal/informal.',
                  misconception: '**“Migrant labour, bonded labour, and child labour are just different names for the same exploited workers.”** Students often conflate the.' }
          ],
            remediations: { 'migrant-labour': { steps: ['**Re-visit definitions:** Use the NCERT table (p.', '68–69) to create a **compare-contrast chart** with columns: *Recruitment mechanism, Coercion type, Legal provision.', '**Re-do diagnostic Q2 & Q3** with fresh cases: (a) A construction worker in Delhi who borrowed ₹5,000 from a *thekedar*.', '(b) A 13-year-old helping in father’s auto-repair shop — legal?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_12_008', difficulty: 'standard',
          question: 'The impact of globalisation on industrial labour refers to the structural.',
          hint: 'Revisit c12_soc_cbse_12_005 (Informalisation of the Workforce) — specifically the.',
          misconception: 'Students equate "globalisation" with "more jobs" or "modernisation" and miss that NCERT frames it as *restructuring.',
          parts: [
                { id: 'a', prompt: 'A software engineer in Bengaluru works 11-hour days, stays overnight ("night out") twice a week during deadlines, and logs "flexi-time" hours that exceed.', answer: '(1) Time-zone difference: conference calls align with U.S',
                  options: ['(1) Time-zone difference: conference calls align with U.S', 'passion for coding', 'high salaries'],
                  hint: 'Revisit c12_soc_cbse_12_005 (Informalisation of the Workforce) — specifically the definition.',
                  misconception: 'Students equate "globalisation" with "more jobs" or "modernisation" and miss that NCERT frames it as *restructuring of labour relations*.' },
                { id: 'b', prompt: 'Compare the labour process of a Maruti assembly-line worker (p.66) and a home-based bidi roller (p.68) on: (a) control over work pace, (b) ownership.', answer: 'control over work pace, (',
                  options: ['control over work pace, (', 'same informal work'],
                  hint: 'Revisit c12_soc_cbse_12_005 (Informalisation of the Workforce) — specifically the definition.',
                  misconception: 'Students equate "globalisation" with "more jobs" or "modernisation" and miss that NCERT frames it as *restructuring of labour relations*.' }
          ],
            remediations: { 'students-equate-globalisation-with-more': { steps: ['Re-read NCERT pp.61-64 (employment status chart, organised/unorganised distinction, Modern Foods case).', 'Create a two-column table: "Pre-liberalisation (1980s)" vs "Post-liberalisation (2000s)" for: job security, union.', 'Watch the 15-min documentary clip "Maruti Workers\' Struggle 2012" (YouTube) and map each demand to a row in your table.', 'Re-attempt Diagnostic Q3 and Q5 — if you still attribute long hours to "choice," revisit Braverman\'s deskilling thesis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_12_009', difficulty: 'standard',
          question: 'The service sector (tertiary sector) in India\'s new economy refers to the.',
          hint: 'If stuck on sectoral shares or informalisation logic, revisit **c12_soc_cbse_12_005**.',
          misconception: 'Students equate \'service sector growth\' with \'middle-class expansion\' and assume IT/BPO jobs are uniformly secure.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The service sector (tertiary sector) in India\'s new economy refers to the structural',
                  options: ['The service sector (tertiary sector) in India\'s new economy refers to the structural', 'Industrialisation as a process of social change refers to the structural transformation', 'The Industrial Revolution in Europe (late 18th to 19th century) was a transformative', 'Industrialisation in India refers to the historical process of establishing factory-based'],
                  hint: 'If stuck on sectoral shares or informalisation logic, revisit **c12_soc_cbse_12_005**.',
                  misconception: 'Students equate \'service sector growth\' with \'middle-class expansion\' and assume IT/BPO jobs are uniformly secure, skilled, and.' }
          ],
            remediations: { 'students-equate-service-sector-growth': { steps: ['Re-read NCERT Section 5.2 (\'The Specificity of Indian Industrialisation\') and Table 5.1 (sectoral employment shares).', 'Revisit sibling node **c12_soc_cbse_12_005** (Informalisation of Workforce) to see how \'organised sector\' definition.', 'Re-do Diagnostic Question 4 as a written paragraph — force yourself to use the phrase \'caste-reproducing in substance\'.', 'Ask your teacher: \'Show me a BPO employment contract vs a public sector bank clerk\'s appointment letter — compare.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_12_010', difficulty: 'standard',
          question: 'Women in the industrial workforce face systemic discrimination manifested.',
          hint: 'Review c10_civ_cbse_03_001 and c11_soc_cbse_04_010 — focus on the distinction between sex.',
          misconception: 'Students often think the gender wage gap exists only because women choose lower-paying jobs or work fewer hours.',
          parts: [
                { id: 'a', prompt: 'A bidi roller in Nipani earns ₹50 per 1000 bidis rolled. She works 8 hours a day and rolls 500 bidis per hour. Calculate her daily earnings.', answer: 'Daily bidis = 500 × 8 = 4000',
                  options: ['Daily bidis = 500 × 8 = 4000', 'the gender wage gap exists only'],
                  hint: 'Review c10_civ_cbse_03_001 and c11_soc_cbse_04_010 — focus on the distinction between sex.',
                  misconception: 'Students often think the gender wage gap exists only because women choose lower-paying jobs or work fewer hours.' },
                { id: 'b', prompt: 'Compare the discrimination faced by women in the organised sector (e.g., IT professionals) and unorganised sector (e.g., bidi rollers).', answer: 'Similarities: (1) Both face gendered occupational segregation',
                  options: ['Similarities: (1) Both face gendered occupational segregation', 'the gender wage gap exists only'],
                  hint: 'Review c10_civ_cbse_03_001 and c11_soc_cbse_04_010 — focus on the distinction between sex.',
                  misconception: 'Students often think the gender wage gap exists only because women choose lower-paying jobs or work fewer hours.' }
          ],
            remediations: { 'the-gender-wage-gap-exists': { steps: ['Revisit c10_civ_cbse_03_001 (Sexual Division of Labour) to understand how society assigns tasks by gender.', 'Re-read NCERT Box 5.1 \'Time Slavery in IT Sector\' and the bidi industry section, noting every phrase that shows.', 'Create a two-column table: \'Individual Choice Argument\' vs \'Structural Constraint Evidence\' using text quotes.', 'Re-attempt Diagnostic Question 5 with this table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_12_011', difficulty: 'standard',
          question: 'Industrialisation-driven urbanisation refers to the process where the.',
          hint: 'Revisit Node 005 (Informalisation of Workforce) — specifically the link between *contract.',
          misconception: '**Misconception:** "Slums exist because poor people migrate to cities and build illegal huts; if we stop migration.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of \'informalisation of housing\' to analyse the following scenario: A construction worker in Gurugram lives in a *jhuggi* (shanty) on the.', answer: '**Step 1: Tenure Insecurity**',
                  options: ['**Step 1: Tenure Insecurity**', 'he might be evicted'],
                  hint: 'Revisit Node 005 (Informalisation of Workforce) — specifically the link between *contract labour*.',
                  misconception: '**Misconception:** "Slums exist because poor people migrate to cities and build illegal huts; if we stop migration or give them free.' },
                { id: 'b', prompt: 'Compare the housing trajectory of the Bombay textile mill worker (1940s–1980s) with that of a contemporary IT-sector migrant in Bengaluru (2000s–present).', answer: '**Mill Worker (Paternalism):** Mills (e.g., Century, Bombay Dyeing) built chawls',
                  options: ['**Mill Worker (Paternalism):** Mills (e.g., Century, Bombay Dyeing) built chawls', 'both live in crowded conditions'],
                  hint: 'Revisit Node 005 (Informalisation of Workforce) — specifically the link between *contract labour*.',
                  misconception: '**Misconception:** "Slums exist because poor people migrate to cities and build illegal huts; if we stop migration or give them free.' }
          ],
            remediations: { 'misconception-slums-exist-because-poor': { steps: ['If the student holds this misconception: **Step 1** — Show the *Wage-Rent Ratio* calculation: In 2023, a construction.', 'Cheapest formal rental (1-room, 15km away) = ₹6,000 + ₹2,000 commute = ₹8,000 (80% of income).', 'Slum rent (walking distance) = ₹2,000.', 'Ask: "Which is rational?" **Step 2** — Map Gurugram\'s Sector 15 (formal) vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
