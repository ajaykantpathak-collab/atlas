import type { SimDef } from '../../engine/types';

/** v3 generated — c10_geo_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_geo_ch04_p2: SimDef = {
    id: 'v3_c10_geo_ch04_p2',
    title: 'Agriculture · Part 2/2',
    subtitle: 'Run the sector that feeds a billion on a fifth of the economy',
    classLevel: 10, subject: 'geography', topic: 'Agriculture · Part 2/2',
    chapters: ['c10_geo_ch04'],
    nodeIds: ['c10_geo_cbse_04_007', 'c10_geo_cbse_04_008', 'c10_geo_cbse_04_009', 'c10_geo_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an agricultural planner', intro: 'Nearly half of India\'s workers still farm, yet farming earns less than a fifth of the national income. Somewhere between the field and the GDP figure lies the real story of Indian agriculture.', goal: 'Weigh agriculture\'s true economic roles — employment, food security, raw materials, exports — and understand farming types, cropping seasons and reform debates.' },
    discovery: {
        question: 'Agriculture employs about 43% of India\'s workers but produces only around 18% of the country\'s GVA. If farming is so \'unproductive,\' why can\'t India simply shift those workers into factories and services?',
        options: ['Agriculture also feeds the nation, supplies raw material to industries and earns export income — and manufacturing can\'t absorb that many workers quickly', 'It actually can — economists just refuse to admit it', 'Farm workers refuse all other jobs by tradition alone', 'The 18% figure is a data error; farms produce most of GDP'],
        answer: 'Agriculture also feeds the nation, supplies raw material to industries and earns export income — and manufacturing can\'t absorb that many workers quickly',
        hook: 'A sector can shrink in GDP share while its importance grows — your breakfast, your cotton shirt and India\'s rice exports all start in a field.',
    },
    teaching: [
        { title: 'Technological and Institutional Reforms in Indian Agriculture', text: 'Technological reforms in Indian agriculture refer to the adoption of modern inputs and techniques such as High Yielding Variety (HYV) seeds, chemical fertilizers, pesticides, mechanization (tractors.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_geo_cbse_04_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow one grain of wheat through India\'s farm economy: choose between subsistence and commercial farming logic, match crops to soils and seasons, and judge which reforms actually help the farmer.',
        labels: ['Technological and Institutional Reforms', 'Green Revolution and Its', 'Food Security: Public Distribution', 'Contribution of Agriculture'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_geo_cbse_04_007', title: 'Technological and Institutional Reforms in Indian Agriculture',
          caseStudy: { intro: 'Imagine a small farmer in your district who owns 1.5 hectares of land split into three scattered plots.',
            decisions: [{ prompt: 'Define \'consolidation of holdings\' as an institutional reform. Why was it considered necessary in the Indian context?', options: [
                { text: 'Consolidation of holdings is the process of combining a farmer\'s scattered, fragmented', outcome: 'Consolidation of holdings is the process of combining a farmer\'s scattered, fragmented plots.' },
                { text: 'redistributing land from rich to poor', outcome: 'Not quite — Students often think "Green Revolution = Technological Reforms" and treat the two terms.', reveals: 'green-revolution-technological-reforms-and' },
                { text: 'Green Revolution = Technological Reforms', outcome: 'Not quite — Students often think "Green Revolution = Technological Reforms" and treat the two terms.', reveals: 'green-revolution-technological-reforms-and' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_04_008', title: 'Green Revolution and Its Impact on Indian Agriculture',
          scaffold: { problem: 'A farmer in Ludhiana (Punjab) has 4 hectares. In 1965, he grew traditional wheat (yield 1,200 kg/ha) using rainfed farming.',
            steps: [
            { text: 'Calculate 1965 total production = 4 ha × 1,200 kg/ha = 4,800 kg.' },
            { text: 'Calculate 1985 total production = 4 ha × 4,000 kg/ha = 16,000 kg.' },
            { text: 'Additional production = 16,000 – 4,800 = 11,200 kg (11.2 metric tonnes).' },
            { text: 'Identify three enabling factors: (a) HYV seed (dwarf, fertilizer-responsive), (b) Assured irrigation (tubewell).' },
            { text: 'Verify: 11,200 kg extra on same land = 233% yield increase — consistent with Punjab\'s actual yield jump from ~1,200.', faded: true, blankAnswer: 'Additional wheat produced = 11,200 kg (11.2 tonnes).' }
            ] } },
        { type: 'case', nodeId: 'c10_geo_cbse_04_009', title: 'Food Security: Public Distribution System (PDS) and Buffer Stock',
          caseStudy: { intro: 'Imagine you see a Fair Price Shop (ration shop) in your neighbourhood with a board displaying "Wheat: ₹2/kg, Rice: ₹3/kg" — this is the visible endpoint of.',
            decisions: [{ prompt: 'What is the Minimum Support Price (MSP) and which agency announces it for wheat and rice in India?', options: [
                { text: 'MSP is the pre-announced price at', outcome: 'MSP is the pre-announced price at which the government (through FCI/state agencies) procures.' },
                { text: 'MSP is the price at PDS shops', outcome: 'Not quite — Students often think **"Buffer Stock = PDS Stock"** — i.e., all grain in FCI godowns is meant only.', reveals: 'buffer-stock-pds-stock-i' },
                { text: 'FCI announces MSP', outcome: 'Not quite — Students often think **"Buffer Stock = PDS Stock"** — i.e., all grain in FCI godowns is meant only.', reveals: 'buffer-stock-pds-stock-i' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_04_010', title: 'Contribution of Agriculture to National Economy and Employment',
          scaffold: { problem: 'The Economic Survey reports: Agriculture GVA = ₹20.4 lakh crore, Total GVA = ₹113.5 lakh crore; Agricultural workers = 23.2 crore, Total.',
            steps: [
            { text: 'Identify the given data — Agriculture GVA (₹20.4L cr), Total GVA (₹113.5L cr), Agri workers (23.2 cr), Total workers.' },
            { text: 'Calculate Agriculture\'s GVA share = (20.4 / 113.5) × 100 = **17.97% ≈ 18%**.' },
            { text: 'Calculate Agriculture\'s workforce share = (23.2 / 54.8) × 100 = **42.33% ≈ 42%**.' },
            { text: 'Compute non-agriculture values by subtraction: Non-agri GVA = 113.5 - 20.4 = ₹93.1L cr; Non-agri workers = 54.8 - 23.2.' },
            { text: 'Calculate labour productivity: Agri = 20.4L cr / 23.2 cr = **₹0.879 lakh/worker**; Non-agri = 93.1L cr / 31.6.' },
            { text: 'Ratio = 2.946 / 0.879 = **3.35**. Interpretation: A non-agriculture worker produces 3.35 times more value than.', faded: true, blankAnswer: '(a) 18%, (b) 42%, (c) ₹0.88 lakh/worker, (d) ₹2.95.' }
            ] } },
        { type: 'case', nodeId: 'c10_geo_cbse_04_007', title: 'A real-world call',
          caseStudy: { intro: 'Chemical fertilisers and pesticides tripled India\'s harvest — and are now linked to soil decline and farmer debt. A farmer choosing organic feeds fewer people but farms sustainably.',
            decisions: [{ prompt: 'Can a farmer afford to farm the \'right\' way?', options: [
                { text: 'Go organic — soil is the real capital', outcome: 'Right for the long term; the farmer eating this year faces yields that drop before they recover.' },
                { text: 'Keep chemicals — yields first, fix soil later', outcome: 'The survival argument; \'later\' has been postponed for fifty years and the soil keeps score.' },
                { text: 'Transition with support — don\'t ask farmers to pay for the change alone', outcome: 'The policy answer — subsidies for the transition period; the question is whether policy arrives before the soil runs out.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A teenager reads two headlines on the same day: \'Country records highest-ever foodgrain harvest\' and \'Farmers in several districts protest rising debt.\' She asks her family how both can be true at once.',
            decisions: [{ prompt: 'What explains record production alongside farmer distress?', options: [
                { text: 'Output and income are different things — a record harvest can still leave farmers behind if input costs (seed, fertiliser, diesel, borewell water) rise faster than crop prices, if small holdings keep earnings thin, or if water-intensive cropping quietly eats the groundwater that future farming depends on. Indian agriculture can be a victim of its own success.', outcome: 'The chapter\'s point exactly: production statistics measure grain, not the grower\'s prosperity — distress and bumper harvests can genuinely coexist.' },
                { text: 'They cannot both be true — a record harvest means every farmer earned more, so the protests must be exaggerated.', outcome: 'Higher national output says nothing about per-farmer income; most farmers work tiny plots, and costs can outrun prices even in a bumper year.', reveals: 'output-equals-income' },
                { text: 'The protests must be about something else entirely — agriculture that produces record food cannot have problems.', outcome: 'Rising debt, groundwater depletion and volatile prices are precisely the problems that record production can mask rather than solve.', reveals: 'record-harvest-no-problems' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_04_010', title: 'You made it',
          caseStudy: { intro: 'Two in five Indians work the land to feed all of us. Agriculture\'s share of GDP fell — its responsibility never did.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_geo_cbse_04_007', difficulty: 'standard',
          question: 'Technological reforms in Indian agriculture refer to the adoption of modern.',
          hint: 'Revisit "Challenges in Indian Farming and Sustainable Solutions" (c6_geography_ch04_025).',
          misconception: 'Students often think "Green Revolution = Technological Reforms" and treat the two terms as synonyms.',
          parts: [
                { id: 'a', prompt: 'Explain why the mere availability of HYV seeds (a technological reform) did not automatically benefit small and marginal farmers in the 1960s without.', answer: 'HYV seeds are input-responsive',
                  options: ['HYV seeds are input-responsive', 'seeds need water', 'Green Revolution = Technological Reforms', '"Green Revolution = Technological Reforms" and treat the two terms as synonyms'],
                  hint: 'Revisit "Challenges in Indian Farming and Sustainable Solutions" (c6_geography_ch04_025) and.',
                  misconception: 'Students often think "Green Revolution = Technological Reforms" and treat the two terms as synonyms.' },
                { id: 'b', prompt: 'A farmer in Punjab has 4 hectares of land. He wants to adopt drip irrigation (technological reform) and avail a loan under the Kisan Credit Card scheme.', answer: 'Step 1: Total KCC loan limit = ₹1.6 lakh',
                  options: ['Step 1: Total KCC loan limit = ₹1.6 lakh', 'Green Revolution = Technological Reforms', '"Green Revolution = Technological Reforms" and treat the two terms as synonyms'],
                  hint: 'Revisit "Challenges in Indian Farming and Sustainable Solutions" (c6_geography_ch04_025) and.',
                  misconception: 'Students often think "Green Revolution = Technological Reforms" and treat the two terms as synonyms.' }
          ],
            remediations: { 'green-revolution-technological-reforms-and': { steps: ['Create a two-column table on paper. Left column: "Technological Reforms" — list *all* you recall (HYV, fertilizers.', 'For each item, write *one sentence* on the specific problem it solves (e.g., "Soil Health Card → solves indiscriminate.', 'Use the NCERT textbook (Chapter 4, pages 38-40) to verify and add two missing items per column.', 'Practice a 3-marker: "Distinguish between technological and institutional reforms with two examples each."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Green Revolution = Technological Reforms" and treat the two terms as synonyms.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Pradhan Mantri Fasal Bima Yojana (PMFBY) has successfully eliminated the risk of crop failure for Indian farmers." Use two.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'it gives money so risk is gone', 'Green Revolution = Technological Reforms', '"Green Revolution = Technological Reforms" and treat the two terms as synonyms'],
                  hint: 'Revisit "Challenges in Indian Farming and Sustainable Solutions" (c6_geography_ch04_025) and.',
                  misconception: 'Students often think "Green Revolution = Technological Reforms" and treat the two terms as synonyms.' },
                { id: 'b', prompt: 'Design a mini-reform package for a tribal district where farmers practice shifting cultivation (jhum) on hill slopes, have no land titles, and depend.', answer: 'Good answer example: (1) Technological: **Terrace farming with soil conservation',
                  options: ['Good answer example: (1) Technological: **Terrace farming with soil conservation', 'Green Revolution = Technological Reforms', '"Green Revolution = Technological Reforms" and treat the two terms as synonyms'],
                  hint: 'Revisit "Challenges in Indian Farming and Sustainable Solutions" (c6_geography_ch04_025) and.',
                  misconception: 'Students often think "Green Revolution = Technological Reforms" and treat the two terms as synonyms.' }
          ],
            remediations: { 'green-revolution-technological-reforms-and': { steps: ['Create a two-column table on paper. Left column: "Technological Reforms" — list *all* you recall (HYV, fertilizers.', 'For each item, write *one sentence* on the specific problem it solves (e.g., "Soil Health Card → solves indiscriminate.', 'Use the NCERT textbook (Chapter 4, pages 38-40) to verify and add two missing items per column.', 'Practice a 3-marker: "Distinguish between technological and institutional reforms with two examples each."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_04_008', difficulty: 'standard',
          question: 'The Green Revolution refers to the transformative period in Indian agriculture.',
          hint: 'If stuck, revisit c6_geography_ch04_024 (Modern Farming: Irrigation, Fertilizers.',
          misconception: 'Students often believe the Green Revolution was "only about seeds" — that HYV seeds alone caused the production jump.',
          parts: [
                { id: 'a', prompt: 'Using the data below, calculate the percentage increase in wheat yield (kg/ha) in Punjab from 1965-66 to 1990-91, and explain what this implies about the Green.', answer: 'Step 1: Identify initial yield = 1,200 kg/ha (1965-66)',
                  options: ['Step 1: Identify initial yield = 1,200 kg/ha (1965-66)', 'percentage of original', 'percentage increase', 'only about seeds'],
                  hint: 'If stuck, revisit c6_geography_ch04_024 (Modern Farming: Irrigation, Fertilizers, Machinery) and.',
                  misconception: 'Students often believe the Green Revolution was "only about seeds" — that HYV seeds alone caused the production jump.' },
                { id: 'b', prompt: 'Compare the impact of the Green Revolution on (a) a large landowner in Punjab with 20 hectares and (b) a landless agricultural laborer in the same village.', answer: 'a large landowner in Punjab with 20 hectares and (',
                  options: ['a large landowner in Punjab with 20 hectares and (', 'both benefited equally', 'only about seeds', 'HYV seeds increased yield everywhere'],
                  hint: 'If stuck, revisit c6_geography_ch04_024 (Modern Farming: Irrigation, Fertilizers, Machinery) and.',
                  misconception: 'Students often believe the Green Revolution was "only about seeds" — that HYV seeds alone caused the production jump.' }
          ],
            remediations: { 'the-green-revolution-was-only': { steps: ['Show a side-by-side diagram: Traditional variety (tall, lodges with fertilizer) vs.', 'Use a simple experiment analogy: "HYV seed is like a high-performance engine — it needs premium fuel (fertilizer) and.', 'Map overlay: Plot HYV adoption % vs. irrigation % across Indian states — students visually see the correlation (Punjab.', 'Assign a 3-mark board-style question: "Explain why HYV seeds alone could not raise yields in rainfed regions." Forces.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_04_009', difficulty: 'standard',
          question: 'Food security in India is ensured through a dual mechanism: the **Buffer.',
          hint: 'Revisit "Green Revolution and Its Impact" (c10_geo_cbse_04_008) to understand *why*.',
          misconception: 'Students often think **"Buffer Stock = PDS Stock"** — i.e., all grain in FCI godowns is meant only for PDS.',
          parts: [
                { id: 'a', prompt: 'What is the Minimum Support Price (MSP) and which agency announces it for wheat and rice in India?', answer: 'MSP is the pre-announced price at',
                  options: ['MSP is the pre-announced price at', 'MSP is the price at PDS shops', 'FCI announces MSP', 'Buffer Stock = PDS Stock'],
                  hint: 'Revisit "Green Revolution and Its Impact" (c10_geo_cbse_04_008) to understand *why* surplus.',
                  misconception: 'Students often think **"Buffer Stock = PDS Stock"** — i.e., all grain in FCI godowns is meant only for PDS distribution.' },
                { id: 'b', prompt: 'Why does the government maintain a buffer stock of foodgrains instead of distributing all procured grain immediately through PDS?', answer: 'Buffer stock serves three purposes: (1) **Price stabilization**',
                  options: ['Buffer stock serves three purposes: (1) **Price stabilization**', 'to export and earn foreign exchange', 'to feed only the poor', 'Buffer Stock = PDS Stock'],
                  hint: 'Revisit "Green Revolution and Its Impact" (c10_geo_cbse_04_008) to understand *why* surplus.',
                  misconception: 'Students often think **"Buffer Stock = PDS Stock"** — i.e., all grain in FCI godowns is meant only for PDS distribution.' },
                { id: 'c', prompt: 'A farmer in Ludhiana sells 100 quintals of wheat to FCI at MSP ₹2,275/quintal.', answer: '**Step 1:** MSP paid to farmer = ₹2,275/quintal',
                  options: ['**Step 1:** MSP paid to farmer = ₹2,275/quintal', 'food subsidy', 'Buffer Stock = PDS Stock', 'why does government sell grain to private traders when poor are hungry?'],
                  hint: 'Revisit "Green Revolution and Its Impact" (c10_geo_cbse_04_008) to understand *why* surplus.',
                  misconception: 'Students often think **"Buffer Stock = PDS Stock"** — i.e., all grain in FCI godowns is meant only for PDS distribution.' }
          ],
            remediations: { 'buffer-stock-pds-stock-i': { steps: ['** Draw a **three-circle Venn diagram** on paper: Circle A = "Operational Stock (for PDS)", Circle B = "Strategic.', '** Take a real FCI stock report (e.g., April 2023: Wheat 180 lt, Rice 300 lt).', '** Trace one quintal of surplus wheat: FCI godown → OMSS tender → flour mill → open market atta at ₹28/kg vs PDS ₹2/kg.', '** Write one sentence: *"Buffer stock is a management tool with multiple outlets; PDS is only one outlet."*'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_04_010', difficulty: 'standard',
          question: 'Contribution of agriculture to the national economy refers to the sector\'s.',
          hint: 'If stuck, revisit **Class 10 Economics Chapter 2: Sectors of the Indian Economy**.',
          misconception: 'Students believe **"declining GDP share means agriculture is becoming unimportant for the economy."** They write.',
          parts: [
                { id: 'a', prompt: 'Explain why agriculture\'s share in GDP has declined steadily from over 50% at Independence to ~18% today, while its share in employment has fallen much more.', answer: 'Correct answer: GDP share fell',
                  options: ['Correct answer: GDP share fell', 'agriculture became less important', 'declining GDP share means agriculture is becoming unimportant for the economy', '**"declining GDP share means agriculture is becoming unimportant for the economy'],
                  hint: 'If stuck, revisit **Class 10 Economics Chapter 2: Sectors of the Indian Economy** (specifically the.',
                  misconception: 'Students believe **"declining GDP share means agriculture is becoming unimportant for the economy."** They write answers like "Agriculture.' },
                { id: 'b', prompt: 'Using the data below, calculate the **approximate ratio of labour productivity (output per worker) in non-agriculture sectors to agriculture** and interpret.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'declining GDP share means agriculture is becoming unimportant for the economy', '**"declining GDP share means agriculture is becoming unimportant for the economy'],
                  hint: 'If stuck, revisit **Class 10 Economics Chapter 2: Sectors of the Indian Economy** (specifically the.',
                  misconception: 'Students believe **"declining GDP share means agriculture is becoming unimportant for the economy."** They write answers like "Agriculture.' },
                { id: 'c', prompt: 'Compare the role of **food grains (rice, wheat)** versus **high-value crops (fruits, vegetables, spices, cotton)** in driving agriculture\'s GDP contribution.', answer: 'Correct analysis: Food grains (rice/wheat) dominate *area* and *employment*',
                  options: ['Correct analysis: Food grains (rice/wheat) dominate *area* and *employment*', 'high-value crops create more jobs', 'declining GDP share means agriculture is becoming unimportant for the economy', '**"declining GDP share means agriculture is becoming unimportant for the economy'],
                  hint: 'If stuck, revisit **Class 10 Economics Chapter 2: Sectors of the Indian Economy** (specifically the.',
                  misconception: 'Students believe **"declining GDP share means agriculture is becoming unimportant for the economy."** They write answers like "Agriculture.' }
          ],
            remediations: { 'declining-gdp-share-means-agriculture': { steps: ['**Data anchor:** Make the student write the latest GDP share (18%) and workforce share (42%) on a sticky note.', '**Concept map:** Draw three boxes: **GDP Share (Value)** → **Employment Share (People)** → **Productivity Gap.', 'Arrow from Gap to "Low Rural Income → Poverty → Policy Challenge".', '**Case linkage:** Re-read the *Green Revolution* node (c10_geo_cbse_04_008) and *Food Security* node.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
