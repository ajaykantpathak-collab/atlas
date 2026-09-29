import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch11_p1: SimDef = {
    id: 'v3_c12_soc_ch11_p1',
    title: 'Change and Development in Rural Society · Part 1/2',
    subtitle: 'Two tax systems, one hierarchy',
    classLevel: 12, subject: 'sociology', topic: 'Change and Development in Rural Society · Part 1/2',
    chapters: ['c12_soc_ch11'],
    nodeIds: ['c12_soc_cbse_11_001', 'c12_soc_cbse_11_002', 'c12_soc_cbse_11_003', 'c12_soc_cbse_11_004', 'c12_soc_cbse_11_005', 'c12_soc_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Agrarian historian', intro: 'In 1890, who paid the tax told you who owned the village — and usually which caste they were born into.', goal: 'Distinguish zamindari from raiyatwari systems and explain the caste-class structure of colonial agrarian society.' },
    discovery: {
        question: 'In one Bengal village a zamindar skimmed rent from fifty families to pay the British; in a Madras village the ryot paid the taxman directly — and still went hungry to the moneylender. Two systems, same result. What was the machine underneath?',
        options: ['Colonial revenue design — both froze a hierarchy where dominant castes held land and landless labour was hereditary; the intermediary changed, the extraction didn\'t', 'The zamindari system was uniquely cruel', 'Raiyatwari made every cultivator an owner', 'The difference was only paperwork'],
        answer: 'Colonial revenue design — both froze a hierarchy where dominant castes held land and landless labour was hereditary; the intermediary changed, the extraction didn\'t',
        hook: 'Raiyatwari didn\'t abolish landlords — registered ryots sublet, and moneylenders turned debt into land. And a tenant is not a labourer: one held cultivation rights, however shaky; the other owned only their labour.',
    },
    teaching: [
        { title: 'Agrarian Structure in Colonial India: Landlord, Tenant and the Landless Labourer', text: 'The colonial agrarian structure in India was a three-tier hierarchy of land rights and labour relations: zamindars/landlords (who held superior property rights and collected revenue).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_11_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace the paddy from field to collector under zamindari and raiyatwari — counting who keeps what at each stage and where caste enters the arithmetic.',
        labels: ['Agrarian Structure in Colonial', 'Land Reforms After Independence', 'The Green Revolution: HYV', 'The Social Consequences', 'The White Revolution (Operation', 'The Changing Nature'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_11_001', title: 'Agrarian Structure in Colonial India: Landlord, Tenant and the Landless Labourer',
          caseStudy: { intro: 'Imagine a village in 1890 Bengal: a zamindar lives in a mansion, collects rent from 50 tenant families, and pays a fixed sum to the British collector.',
            decisions: [{ prompt: 'Name the three main classes in the colonial Indian agrarian structure and state one defining feature of each.', options: [
                { text: 'Correct answer: (1) Landlords/zamindars', outcome: 'Correct answer: (1) Landlords/zamindars — held superior property rights, collected rent/revenue.' },
                { text: 'farmers, workers, zamindars', outcome: 'Not quite — Students often think "zamindar" and "landlord" are synonyms and that the raiyatwari system gave.', reveals: 'zamindar-and-landlord-are-synonyms' },
                { text: 'zamindar', outcome: 'Not quite — Students often think "zamindar" and "landlord" are synonyms and that the raiyatwari system gave.', reveals: 'zamindar-and-landlord-are-synonyms' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_11_002', title: 'Land Reforms After Independence: Abolition of Zamindari, Tenancy Reform and Ceiling',
          caseStudy: { intro: 'Imagine you are a district collector in 1955 Bihar reviewing a village where a zamindar family holds 500 acres while 200 Dalit families own zero land.',
            decisions: [{ prompt: 'Name the three major categories of land reform laws enacted in India between the 1950s and 1970s, and state the primary objective of each.', options: [
                { text: 'Correct answer: (1) Zamindari Abolition Acts', outcome: 'Correct answer: (1) Zamindari Abolition Acts — remove intermediary zamindars and establish direct.' },
                { text: 'gave land to tillers', outcome: 'Not quite — Students often believe "land reforms failed everywhere" or "zamindari abolition gave land to the.', reveals: 'land-reforms-failed-everywhere-or' },
                { text: 'land reforms failed everywhere', outcome: 'Not quite — Students often believe "land reforms failed everywhere" or "zamindari abolition gave land to the.', reveals: 'land-reforms-failed-everywhere-or' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_11_003', title: 'The Green Revolution: HYV Seeds, Irrigation and the Wheat-Rice Revolution',
          caseStudy: { intro: 'Imagine you are standing in a Punjab wheat field in 1975: the stalks are short, stiff, and heavy with grain — nothing like the tall, traditional varieties your.',
            decisions: [{ prompt: '**REMEMBER:** List the four components of the Green Revolution technological package as defined in the NCERT, and name the two staple crops.', options: [
                { text: '**Correct answer:** The four components are: (1) High-Yielding Variety (HYV) / hybrid', outcome: '**Correct answer:** The four components are: (1) High-Yielding Variety (HYV) / hybrid seeds, (2).' },
                { text: 'HYV seeds', outcome: 'Not quite — **Misconception:** "The Green Revolution was simply the introduction of high-yielding seeds.', reveals: 'misconception-the-green-revolution-was' },
                { text: 'tractors/mechanisation', outcome: 'Not quite — **Misconception:** "The Green Revolution was simply the introduction of high-yielding seeds.', reveals: 'misconception-the-green-revolution-was' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_11_004', title: 'The Social Consequences of the Green Revolution: Class, Region and the New Rich Farmer',
          caseStudy: { intro: 'Imagine a village in Punjab in 1975 where a Jat Sikh farmer buys a tractor and HYV wheat seeds, while his Dalit neighbour who once worked as a sharecropper.',
            decisions: [{ prompt: 'What is the term used by M.N. Srinivas for the numerically dominant, economically and politically powerful landowning caste in a region?', options: [
                { text: 'The term is "dominant caste"', outcome: 'The term is "dominant caste". A wrong answer (e.g., "upper caste" or "landlord caste") reveals the.' },
                { text: 'upper caste', outcome: 'Not quite — Students often think the Green Revolution "modernised" agriculture uniformly and that inequality.', reveals: 'the-green-revolution-modernised-agriculture' },
                { text: 'landlord caste', outcome: 'Not quite — Students often think the Green Revolution "modernised" agriculture uniformly and that inequality.', reveals: 'the-green-revolution-modernised-agriculture' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_11_005', title: 'The White Revolution (Operation Flood) and Dairy Cooperatives in India',
          caseStudy: { intro: 'Imagine a landless Dalit woman in 1970s Gujarat who owns one buffalo but sells milk to a local trader at ₹2/litre while he sells it in the city for ₹6.',
            decisions: [{ prompt: 'What was the primary institutional innovation of the Anand-pattern dairy cooperative that distinguished it from government-run dairy.', options: [
                { text: 'The Anand-pattern made milk producers (farmers) the owners and governors of the', outcome: 'The Anand-pattern made milk producers (farmers) the owners and governors of the cooperative through.' },
                { text: 'it used pasteurization technology', outcome: 'Not quite — Students think Operation Flood was "just a government scheme that gave free cows to poor farmers.".', reveals: 'operation-flood-was-just-a' },
                { text: 'it gave subsidies to farmers', outcome: 'Not quite — Students think Operation Flood was "just a government scheme that gave free cows to poor farmers.".', reveals: 'operation-flood-was-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A paralegal intern in a 1960s-set case file finds a landlord legally kept 170 surplus acres — benami transfers to relatives, \'personal cultivation\' claims, paper partitions — and concludes \'land reform simply never happened.\'',
            decisions: [{ prompt: 'What does the implementation-gap analysis say?', options: [
                { text: 'The law happened, the loopholes absorbed it — ceilings counted paper families not effective control, so benami deeds, khudkasht evictions and fictitious splits let dominant-caste landowners keep command; zamindari abolition worked better precisely because it cut one recorded legal layer instead of restructuring village power.', outcome: 'The chapter\'s lesson: reform-on-paper versus power-on-ground — evasion was systematic and socially sanctioned where the dominant caste ran the local administration meant to implement it.' },
                { text: 'She\'s right — if the land stayed put, there was no reform at all.', outcome: 'That erases zamindari abolition, which did remove an entire intermediary class — the verdict isn\'t \'nothing happened\' but that each pillar met a different wall of legal fiction and local power.', reveals: 'no-redistribution-no-reform' },
                { text: 'The fault was just poor drafting — tighter wording alone would have delivered the land.', outcome: 'Drafting was only half the constraint — identifying oral tenancies and concealed surplus needed bureaucratic penetration and political will that dominant-caste-controlled administration wouldn\'t supply; better text doesn\'t move power.', reveals: 'wording-was-the-whole-gap' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now see why land control and caste power fused under colonialism — the inequality land reform later had to dig out.',
            decisions: [{ prompt: 'What comes next? Change and Development in Rural Society · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Change and Development in Rural Society · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_11_001', difficulty: 'standard',
          question: 'The colonial agrarian structure in India was a three-tier hierarchy of land.',
          hint: 'If stuck, revisit Class 8 History chapter "British Economic Exploitation" (node.',
          misconception: 'Students often think "zamindar" and "landlord" are synonyms and that the raiyatwari system gave land ownership to all.',
          parts: [
                { id: 'a', prompt: 'Name the three main classes in the colonial Indian agrarian structure and state one defining feature of each.', answer: 'Correct answer: (1) Landlords/zamindars',
                  options: ['Correct answer: (1) Landlords/zamindars', 'farmers, workers, zamindars', 'zamindar', 'landlord'],
                  hint: 'If stuck, revisit Class 8 History chapter "British Economic Exploitation" (node c8_hist_ch3_8) and.',
                  misconception: 'Students often think "zamindar" and "landlord" are synonyms and that the raiyatwari system gave land ownership to all cultivators.' },
                { id: 'b', prompt: 'Explain in your own words the fundamental difference between the zamindari and raiyatwari systems of land revenue collection.', answer: 'Correct answer: In zamindari, the state dealt with zamindars as intermediaries',
                  options: ['Correct answer: In zamindari, the state dealt with zamindars as intermediaries', 'zamindari had landlords, raiyatwari had no landlords', 'zamindar', 'landlord'],
                  hint: 'If stuck, revisit Class 8 History chapter "British Economic Exploitation" (node c8_hist_ch3_8) and.',
                  misconception: 'Students often think "zamindar" and "landlord" are synonyms and that the raiyatwari system gave land ownership to all cultivators.' },
                { id: 'c', prompt: 'A cultivator in a zamindari village in Bihar produces 1,200 kg of paddy. The zamindar demands 60% as rent.', answer: '(1) Total produce = 1,200 kg',
                  options: ['(1) Total produce = 1,200 kg', 'zamindar', 'landlord', 'tenants and landless labourers are the same group'],
                  hint: 'If stuck, revisit Class 8 History chapter "British Economic Exploitation" (node c8_hist_ch3_8) and.',
                  misconception: 'Students often think "zamindar" and "landlord" are synonyms and that the raiyatwari system gave land ownership to all cultivators.' }
          ],
            remediations: { 'zamindar-and-landlord-are-synonyms': { steps: ['Re-read NCERT pages 44-46 focusing on the two revenue systems.', 'Make a two-column table: "Zamindari" vs "Raiyatwari" with rows: Revenue payer, Property rights, Cultivator\'s status.', 'Watch a 10-minute video on "British Land Revenue Systems in India" (search for "zamindari raiyatwari mahalwari").', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_11_002', difficulty: 'standard',
          question: 'Land reforms after independence refer to the series of legislative measures.',
          hint: 'Revisit c12_soc_cbse_11_001 Section 4.1 (Agrarian Structure: Caste and Class in Rural.',
          misconception: 'Students often believe "land reforms failed everywhere" or "zamindari abolition gave land to the landless." The precise.',
          parts: [
                { id: 'a', prompt: 'Name the three major categories of land reform laws enacted in India between the 1950s and 1970s, and state the primary objective of each in one sentence.', answer: 'Correct answer: (1) Zamindari Abolition Acts',
                  options: ['Correct answer: (1) Zamindari Abolition Acts', 'gave land to tillers', 'land reforms failed everywhere', 'zamindari abolition gave land to the landless'],
                  hint: 'Revisit c12_soc_cbse_11_001 Section 4.1 (Agrarian Structure: Caste and Class in Rural India) and.',
                  misconception: 'Students often believe "land reforms failed everywhere" or "zamindari abolition gave land to the landless." The precise error: conflating.' },
                { id: 'b', prompt: 'A large landowner in 1960s Uttar Pradesh holds 200 acres of irrigated land. The state ceiling limit is 30 acres for a family of five.', answer: 'Correct answer: (1) Benami transfers',
                  options: ['Correct answer: (1) Benami transfers', 'bribery', 'court cases', 'land reforms failed everywhere'],
                  hint: 'Revisit c12_soc_cbse_11_001 Section 4.1 (Agrarian Structure: Caste and Class in Rural India) and.',
                  misconception: 'Students often believe "land reforms failed everywhere" or "zamindari abolition gave land to the landless." The precise error: conflating.' }
          ],
            remediations: { 'land-reforms-failed-everywhere-or': { steps: ['If the student conflates zamindari abolition with land-to-tiller redistribution: Step 1 — Re-read NCERT para "The first.', 'strengthen the position of the actual landholders and cultivators at the local level" and identify the phrase "actual.', 'Step 2 — Map the three-tier colonial structure (State → Zamindar → Tenant → Sub-tenant/Labourer) and trace which layer.', 'Step 3 — Attempt Diagnostic Question 1 again, explicitly distinguishing "removing a layer" vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_11_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "land reforms failed everywhere" or "zamindari abolition gave land to the landless." The precise.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Land ceiling laws failed because the ceiling limits were set too high." Use evidence from the NCERT text on regional variation.', answer: 'Correct answer: The statement is partially true but incomplete',
                  options: ['Correct answer: The statement is partially true but incomplete', 'high limits', 'land reforms failed everywhere', 'zamindari abolition gave land to the landless'],
                  hint: 'Revisit c12_soc_cbse_11_001 Section 4.1 (Agrarian Structure: Caste and Class in Rural India) and.',
                  misconception: 'Students often believe "land reforms failed everywhere" or "zamindari abolition gave land to the landless." The precise error: conflating.' }
          ],
            remediations: { 'land-reforms-failed-everywhere-or': { steps: ['If the student conflates zamindari abolition with land-to-tiller redistribution: Step 1 — Re-read NCERT para "The first.', 'strengthen the position of the actual landholders and cultivators at the local level" and identify the phrase "actual.', 'Step 2 — Map the three-tier colonial structure (State → Zamindar → Tenant → Sub-tenant/Labourer) and trace which layer.', 'Step 3 — Attempt Diagnostic Question 1 again, explicitly distinguishing "removing a layer" vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_11_003', difficulty: 'standard',
          question: 'The Green Revolution in India (1960s-1970s) was a state-led agricultural.',
          hint: 'If stuck, re-read the "Impact of Land Reforms" section in c12_soc_cbse_11_002 — focus.',
          misconception: '**Misconception:** "The Green Revolution was simply the introduction of high-yielding seeds; irrigation, fertiliser.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** A student says: "The Green Revolution failed because it only helped rich farmers in Punjab; the government should have given HYV seeds to every.', answer: '**Correct answer:** HYV seeds are **water-sensitive**',
                  options: ['**Correct answer:** HYV seeds are **water-sensitive**', '**What a wrong answer reveals:** If the student focuses only on', 'lack of credit', 'sufficient water was necessary for the new seeds and methods of cultivation'],
                  hint: 'If stuck, re-read the "Impact of Land Reforms" section in c12_soc_cbse_11_002 — focus on the.',
                  misconception: '**Misconception:** "The Green Revolution was simply the introduction of high-yielding seeds; irrigation, fertiliser, and pesticide were.' }
          ],
            remediations: { 'misconception-the-green-revolution-was': { steps: ['**Revisit node c12_soc_cbse_11_001 (Agrarian Structure)** to recall the pre-GR land distribution: dominant castes owned.', '**Draw a 2×2 matrix** on paper: Rows = Land size (Large / Small), Columns = Irrigation (Assured / Rain-fed).', 'Fill each cell with: "Can adopt full GR package?', '**Re-diagnostic:** Ask the student to explain why the "Small + Rain-fed" cell is a **double exclusion** (no capital for.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_11_004', difficulty: 'standard',
          question: 'The Social Consequences of the Green Revolution refer to the structural.',
          hint: 'If stuck, revisit c12_soc_cbse_11_001 (colonial agrarian structure) and.',
          misconception: 'Students often think the Green Revolution "modernised" agriculture uniformly and that inequality was a temporary.',
          parts: [
                { id: 'a', prompt: 'What is the term used by M.N. Srinivas for the numerically dominant, economically and politically powerful landowning caste in a region?', answer: 'The term is "dominant caste"',
                  options: ['The term is "dominant caste"', 'upper caste', 'landlord caste', 'modernised'],
                  hint: 'If stuck, revisit c12_soc_cbse_11_001 (colonial agrarian structure) and c11_soc_cbse_07_008 (rural.',
                  misconception: 'Students often think the Green Revolution "modernised" agriculture uniformly and that inequality was a temporary side-effect.' }
          ],
            remediations: { 'the-green-revolution-modernised-agriculture': { steps: ['If a student holds this misconception: Step 1 — Revisit node c12_soc_cbse_11_003 to recall the input package (HYV.', 'Step 2 — Use the NCERT Box 4.1 (productivity-agrarian structure link) to see why high-productivity regions had *more*.', 'Step 3 — Work through Diagnostic Question 3 again with real data: Punjab 1970–80, real wages for labourers fell 15%.', 'Step 4 — Write a one-paragraph counter-argument: "Why did the same technology that raised yields also raise the number.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_11_005', difficulty: 'standard',
          question: 'The White Revolution (Operation Flood) was a national dairy development.',
          hint: 'Revisit c11_soc_cbse_03_007 (Work and Economic Institutions) focusing on the distinction.',
          misconception: 'Students think Operation Flood was "just a government scheme that gave free cows to poor farmers." In reality, it was.',
          parts: [
                { id: 'a', prompt: 'What was the primary institutional innovation of the Anand-pattern dairy cooperative that distinguished it from government-run dairy schemes?', answer: 'The Anand-pattern made milk producers (farmers) the owners and governors of the',
                  options: ['The Anand-pattern made milk producers (farmers) the owners and governors of the', 'it used pasteurization technology', 'it gave subsidies to farmers', 'just a government scheme that gave free cows to poor farmers'],
                  hint: 'Revisit c11_soc_cbse_03_007 (Work and Economic Institutions) focusing on the distinction between.',
                  misconception: 'Students think Operation Flood was "just a government scheme that gave free cows to poor farmers." In reality, it was a market-linking.' },
                { id: 'b', prompt: 'Explain why Operation Flood was implemented in phases (Phase I: 1970-80, Phase II: 1981-85, Phase III: 1985-96) rather than as a single nationwide rollout.', answer: 'Phasing allowed learning from early regions (Gujarat, Maharashtra) to refine the',
                  options: ['Phasing allowed learning from early regions (Gujarat, Maharashtra) to refine the', 'due to budget constraints', 'just a government scheme that gave free cows to poor farmers'],
                  hint: 'Revisit c11_soc_cbse_03_007 (Work and Economic Institutions) focusing on the distinction between.',
                  misconception: 'Students think Operation Flood was "just a government scheme that gave free cows to poor farmers." In reality, it was a market-linking.' },
                { id: 'c', prompt: 'A village in eastern Uttar Pradesh has 200 households: 40 landless Dalit families (1 buffalo each), 100 OBC small farmers (2 buffaloes each), 50 upper-caste.', answer: 'Upper-caste medium farmers would likely dominate',
                  options: ['Upper-caste medium farmers would likely dominate', 'just a government scheme that gave free cows to poor farmers'],
                  hint: 'Revisit c11_soc_cbse_03_007 (Work and Economic Institutions) focusing on the distinction between.',
                  misconception: 'Students think Operation Flood was "just a government scheme that gave free cows to poor farmers." In reality, it was a market-linking.' },
                { id: 'd', prompt: 'Compare the Green Revolution and White Revolution on: (a) primary resource required, (b) scale of farmer benefited, (c) impact on women\'s labour, (d) regional.', answer: 'primary resource required, (',
                  options: ['primary resource required, (', 'both benefited small farmers equally', 'just a government scheme that gave free cows to poor farmers'],
                  hint: 'Revisit c11_soc_cbse_03_007 (Work and Economic Institutions) focusing on the distinction between.',
                  misconception: 'Students think Operation Flood was "just a government scheme that gave free cows to poor farmers." In reality, it was a market-linking.' }
          ],
            remediations: { 'operation-flood-was-just-a': { steps: ['If the student holds this misconception: (1) Show the Amul share certificate (₹10 face value) — ask "Who paid this?".', '(3) Contrast with a government scheme like "free milch animal distribution" — list 3 differences in ownership, risk.', '(4) Re-diagnose with Question 3 (Uttar Pradesh village) to test if they now see cooperatives as member-owned.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_11_006', difficulty: 'standard',
          question: 'Capitalist farming in rural India refers to the transformation of agriculture.',
          hint: 'If stuck, re-read the NCERT paragraphs on \'Transformation in Rural Society after.',
          misconception: 'Students often conflate \'capitalist farming\' with \'any use of modern technology or market sales\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Capitalist farming in rural India refers to the transformation of agriculture into a',
                  options: ['Capitalist farming in rural India refers to the transformation of agriculture into a', 'The colonial agrarian structure in India was a three-tier hierarchy of land rights and', 'Land reforms after independence refer to the series of legislative measures (1950s–1970s)', 'The Green Revolution in India (1960s-1970s) was a state-led agricultural modernisation'],
                  hint: 'If stuck, re-read the NCERT paragraphs on \'Transformation in Rural Society after Independence\'.',
                  misconception: 'Students often conflate \'capitalist farming\' with \'any use of modern technology or market sales\'.' }
          ],
            remediations: { 'students-often-conflate-capitalist-farming': { steps: ['If a student equates capitalist farming with mechanisation/market sales: (1) Ask them to read Jan Breman’s quote in the.', '(2) Give a mini-case: Farmer A owns 10 acres, works with family, hires a combine harvester for 3 days.', 'Farmer B owns 50 acres, lives in the city, employs 10 permanent workers and 50 seasonal migrants.', 'Ask: Which is a capitalist farmer?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
