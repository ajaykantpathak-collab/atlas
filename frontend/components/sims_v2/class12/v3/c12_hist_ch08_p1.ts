import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch08_p1: SimDef = {
    id: 'v3_c12_hist_ch08_p1',
    title: 'Peasants, Zamindars and the State (Mughal Era) · Part 1/2',
    subtitle: 'A census before census — written to prove Akbar\'s order',
    classLevel: 12, subject: 'history', topic: 'Peasants, Zamindars and the State (Mughal Era) · Part 1/2',
    chapters: ['c12_hist_ch08'],
    nodeIds: ['c12_hist_cbse_08_001', 'c12_hist_cbse_08_002', 'c12_hist_cbse_08_003', 'c12_hist_cbse_08_004', 'c12_hist_cbse_08_005', 'c12_hist_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Mughal source critic', intro: 'An empire without printing presses built a 1,000-page administrative mirror — and believed its own reflection.', goal: 'Evaluate the Ain-i-Akbari as administrative record and ideological project — its data, structure and \'view from the top.\'' },
    discovery: {
        question: 'Abu\'l Fazl\'s Ain-i-Akbari records every province\'s revenue, crops, zamindar castes and troops in tables — unlike any medieval chronicle. What made it a new kind of history?',
        options: ['A spreadsheet of sovereignty — it made society and economy administrable objects, not war-narrative; a paper empire mirroring the real one', 'It had more pages', 'Akbar ordered it', 'Persian was precise'],
        answer: 'A spreadsheet of sovereignty — it made society and economy administrable objects, not war-narrative; a paper empire mirroring the real one',
        hook: 'It\'s a \'view from the top\' — rebellion appears predestined to fail, and the numbers skew toward the imperial core (Bengal\'s columns are thin). Trust it as scale, not census — and cross-check the heartland\'s detail against regional records.',
    },
    teaching: [
        { title: 'The Ain-i-Akbari of Abu\'l Fazl: Structure and Purpose of the Text', text: 'The Ain-i-Akbari (1598) is the third volume of the Akbar Nama, authored by Abu\'l Fazl under Emperor Akbar\'s commission, structured as a five-book (daftar) administrative manual and statistical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_08_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read an empire as its administrators saw it: decode the five books, weigh the Ain\'s quantitative power against its courtly bias, and learn where its tables go silent.',
        labels: ['The Ain-i-Akbari of Abu\'l', 'Agricultural Production in Mughal', 'The Village Community: Headman', 'Pahari, Khud-Kasht and Pahi-Kasht', 'Zamindars: Rights, Military Power', 'The Zamindar\'s Military Retainers'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_08_001', title: 'The Ain-i-Akbari of Abu\'l Fazl: Structure and Purpose of the Text',
          caseStudy: { intro: 'Imagine the Government of India conducting the Census today — enumerators visit every household, collect data on occupation, income, assets, and compile.',
            decisions: [{ prompt: 'In what regnal year of Akbar was the Ain-i-Akbari completed, and how many revisions did the manuscript undergo before finalization?', options: [
                { text: 'The Ain-i-Akbari was completed in the forty-second regnal year of Akbar (1598 CE) after', outcome: 'The Ain-i-Akbari was completed in the forty-second regnal year of Akbar (1598 CE) after five.' },
                { text: 'first regnal year', outcome: 'Not quite — Students commonly believe the Ain-i-Akbari is a single, uniform revenue record covering all.', reveals: 'students-commonly-believe-the-ain' },
                { text: 'no revisions', outcome: 'Not quite — Students commonly believe the Ain-i-Akbari is a single, uniform revenue record covering all.', reveals: 'students-commonly-believe-the-ain' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_08_002', title: 'Agricultural Production in Mughal India: Crops, Seasons and Surplus',
          caseStudy: { intro: 'Imagine you are standing in a village near Agra in late September: the monsoon has just retreated, and fields are a patchwork of ripening rice (kharif) while.',
            decisions: [{ prompt: 'Name the two major seasonal crop cycles in Mughal India and the primary staple associated with each.', options: [
                { text: 'The two cycles are kharif (autumn, sown with monsoon rains, staple: rice/millets) and', outcome: 'The two cycles are kharif (autumn, sown with monsoon rains, staple: rice/millets) and rabi (spring.' },
                { text: 'three seasons or confusing the staple', outcome: 'Not quite — Students often think Mughal agriculture was purely subsistence-oriented and that cash crops were.', reveals: 'mughal-agriculture-was-purely-subsistence' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_08_003', title: 'The Village Community: Headman (Muqaddam), Patwari and Collective Responsibility',
          caseStudy: { intro: 'Imagine you are visiting a present-day gram panchayat office in rural India and see the sarpanch and secretary reviewing land records — this mirrors the Mughal.',
            decisions: [{ prompt: 'What were the three constituents of the Mughal village community as described in the Ain-i-Akbari, and what was the specific title of the.', options: [
                { text: 'The three constituents were: (1) the cultivators (peasants), (2) the panchayat (assembly', outcome: 'The three constituents were: (1) the cultivators (peasants), (2) the panchayat (assembly.' },
                { text: 'the zamindar as a constituent or calling the headman \'patwari\'', outcome: 'Not quite — Students often conflate the muqaddam (village headman) with the zamindar, thinking both are.', reveals: 'students-often-conflate-the-muqaddam' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_08_004', title: 'Pahari, Khud-Kasht and Pahi-Kasht: Types of Peasant Cultivators',
          caseStudy: { intro: 'Imagine you are a revenue official in Akbar\'s court visiting a village in the Punjab.',
            decisions: [{ prompt: 'What are the two main categories of peasants mentioned in seventeenth-century Mughal sources such as the Ain-i-Akbari?', options: [
                { text: 'The two main categories are khud-kashta (resident cultivators) and pahi-kashta', outcome: 'The two main categories are khud-kashta (resident cultivators) and pahi-kashta (non-resident.' },
                { text: 'zamindars', outcome: 'Not quite — Students often confuse pahi-kashta with landless labourers (majur) or think "Pahari" is a third.', reveals: 'students-often-confuse-pahi-kashta' },
                { text: 'Pahari', outcome: 'Not quite — Students often confuse pahi-kashta with landless labourers (majur) or think "Pahari" is a third.', reveals: 'students-often-confuse-pahi-kashta' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_08_005', title: 'Zamindars: Rights, Military Power and the Extraction of Surplus',
          caseStudy: { intro: 'Imagine visiting a seventeenth-century village fair (haat) in the Punjab plains: you see a fortified haveli on a mound, its owner lending seed to peasants.',
            decisions: [{ prompt: 'What were milkiyat lands, and how did they differ from the lands over which zamindars collected revenue for the state?', options: [
                { text: 'Milkiyat lands were the zamindar\'s personal, heritable property cultivated for his', outcome: 'Milkiyat lands were the zamindar\'s personal, heritable property cultivated for his private use with.' },
                { text: 'zamindars owned all land in their territory', outcome: 'Not quite — Students often write "zamindars were the owners of all land in their zamindari" — confusing.', reveals: 'students-often-write-zamindars-were' },
                { text: 'zamindars were the owners of all land in their zamindari', outcome: 'Not quite — Students often write "zamindars were the owners of all land in their zamindari" — confusing.', reveals: 'students-often-write-zamindars-were' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_08_006', title: 'The Zamindar\'s Military Retainers and the Fortified Stronghold (Qila)',
          caseStudy: { intro: 'Imagine visiting a ruined hill fort in Rajasthan or Bengal — crumbling walls, a gateway for elephants, stables for horses.',
            decisions: [{ prompt: 'What specific military resources did the Ain-i Akbari record as being under the combined command of zamindars in Mughal India?', options: [
                { text: 'The Ain-i Akbari records: 384,558 cavalry, 4,277,057 infantry, 1,863 elephants, 4,260', outcome: 'The Ain-i Akbari records: 384,558 cavalry, 4,277,057 infantry, 1,863 elephants, 4,260 cannons, and.' },
                { text: 'only cavalry and infantry', outcome: 'Not quite — Students think zamindar forts (qilachas) and retainers were inherently rebellious — "private armies.', reveals: 'zamindar-forts-qilachas-and-retainers' },
                { text: 'mansabdari troops', outcome: 'Not quite — Students think zamindar forts (qilachas) and retainers were inherently rebellious — "private armies.', reveals: 'zamindar-forts-qilachas-and-retainers' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a farm-stay internship, the host family debates next season\'s sowing: all food grains for the house, versus keeping a plot under cotton because the revenue demand arrives in cash and grain won\'t pay it.',
            decisions: [{ prompt: 'What does the Mughal agrarian chapter say about their dilemma?', options: [
                { text: 'Split the holding as Mughal peasants did — the state\'s push for jins-i-kamil cash crops like cotton and sugarcane existed precisely because revenue was assessed in cash; subsistence and commercial plots on one field was the normal answer, not a modern invention.', outcome: 'The chapter\'s dual-purpose peasant holding: the same seasonal logic fed the family and filled the treasury, so \'food or cash crop\' is a false either-or — the field carried both.' },
                { text: 'Advise all food grains — a peasant household\'s first duty is feeding itself; cash crops are the state\'s problem.', outcome: 'The revenue demand was the household\'s problem too — Mughal assessment pushed peasants toward cash crops whether or not they liked it; ignoring the cash need meant defaulting on the very claim that kept the land theirs.', reveals: 'subsistence-before-state' },
                { text: 'Advise all cash crop — higher prices mean better income for the family.', outcome: 'Jins-i-kamil meant high revenue, not necessarily high peasant gain — cash cropping served the fiscal system; a full-cash field left the family buying its own food at the market\'s mercy.', reveals: 'cash-crop-equals-profit' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now use a gazetteer critically — as both an instrument of rule and an argument that the rule was order itself.',
            decisions: [{ prompt: 'What comes next? Peasants, Zamindars and the State (Mughal Era) · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Peasants, Zamindars and the State (Mughal Era) · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_001', difficulty: 'standard',
          question: 'The Ain-i-Akbari (1598) is the third volume of the Akbar Nama, authored.',
          hint: 'If stuck on "why the Ain matters," revisit Class 6\'s "Mughal Administration".',
          misconception: 'Students commonly believe the Ain-i-Akbari is a single, uniform revenue record covering all of India with equal detail.',
          parts: [
                { id: 'a', prompt: 'Why does the NCERT describe the Ain-i-Akbari as presenting "a view from the top," and what specific ideological purpose did this serve in Abu\'l Fazl\'s.', answer: 'The Ain presents a "view from the top"',
                  options: ['The Ain presents a "view from the top"', 'view from the top', 'predestined to fail', 'it was written by a courtier'],
                  hint: 'If stuck on "why the Ain matters," revisit Class 6\'s "Mughal Administration" (c6_history_ch09_035).',
                  misconception: 'Students commonly believe the Ain-i-Akbari is a single, uniform revenue record covering all of India with equal detail — like a modern.' },
                { id: 'b', prompt: 'A historian finds that the Ain\'s mulk-abadi provides detailed caste breakdowns of zamindars for Agra and Delhi subas but omits this data for Bengal and Orissa.', answer: 'First, data collection was not uniform across provinces',
                  options: ['First, data collection was not uniform across provinces', 'the Ain is incomplete'],
                  hint: 'If stuck on "why the Ain matters," revisit Class 6\'s "Mughal Administration" (c6_history_ch09_035).',
                  misconception: 'Students commonly believe the Ain-i-Akbari is a single, uniform revenue record covering all of India with equal detail — like a modern.' }
          ],
            remediations: { 'students-commonly-believe-the-ain': { steps: ['If the student cannot distinguish the Ain\'s five daftars or misidentifies its purpose: Step 1 — Revisit c9_hist_ch1_4.', 'Step 2 — Use the NCERT\'s Source 9 (Abu\'l Fazl\'s own account of his research method) to create a flowchart: imperial.', 'Step 3 — Compare the Ain\'s table structure (eight columns per sarkar) with a modern district statistical handbook.', 'Step 4 — Re-attempt Diagnostic Questions 2 and 4, focusing on "view from the top" vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_002', difficulty: 'standard',
          question: 'Agricultural production in Mughal India (c. 1556–1707) was organized around two.',
          hint: 'Review the "Irrigation and technology" and "Abundance of crops" subsections in NCERT.',
          misconception: 'Students often think Mughal agriculture was purely subsistence-oriented and that cash crops were a British colonial.',
          parts: [
                { id: 'a', prompt: 'Explain why the Mughal state encouraged cultivation of jins-i-kamil crops such as cotton and sugarcane, and how this affected the peasant’s cropping pattern.', answer: 'Jins-i-kamil crops fetched higher revenue (cash) for the state',
                  options: ['Jins-i-kamil crops fetched higher revenue (cash) for the state', 'peasants only grew food grains'],
                  hint: 'Review the "Irrigation and technology" and "Abundance of crops" subsections in NCERT Theme 8 (pp.',
                  misconception: 'Students often think Mughal agriculture was purely subsistence-oriented and that cash crops were a British colonial introduction.' }
          ],
            remediations: { 'mughal-agriculture-was-purely-subsistence': { steps: ['Re-read the "Abundance of Crops" section (NCERT pp.', '199–200) and make a two-column table: Food Grains vs.', 'Cash Crops, noting season (kharif/rabi) for each.', 'Watch a 5-minute video on the Persian wheel (search "arghatta Mughal irrigation") to visualize the technology.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_003', difficulty: 'standard',
          question: 'The village community in Mughal India (c. 1550–1700) was a collective social.',
          hint: 'If stuck, revisit c7_hist_ch07_007 (Delhi Sultanate village officials) and.',
          misconception: 'Students often conflate the muqaddam (village headman) with the zamindar, thinking both are "landlords" who own village.',
          parts: [
                { id: 'a', prompt: 'A village panchayat in 1650 Punjab receives a petition from lower-caste cultivators complaining that the zamindar\'s officials are demanding begar (unpaid.', answer: 'Desertion was effective',
                  options: ['Desertion was effective', 'peasants had no power', 'desertion was rare', 'drastic form of resistance'],
                  hint: 'If stuck, revisit c7_hist_ch07_007 (Delhi Sultanate village officials) and c12_hist_cbse_08_001.',
                  misconception: 'Students often conflate the muqaddam (village headman) with the zamindar, thinking both are "landlords" who own village land.' },
                { id: 'b', prompt: 'Compare the functions of the Mughal village panchayat (as described in Section 2.2) with those of a present-day Gram Panchayat under the 73rd Amendment.', answer: 'Similarities: (1) Both manage local welfare (water, roads, dispute resolution)',
                  options: ['Similarities: (1) Both manage local welfare (water, roads, dispute resolution)', 'same function, different era'],
                  hint: 'If stuck, revisit c7_hist_ch07_007 (Delhi Sultanate village officials) and c12_hist_cbse_08_001.',
                  misconception: 'Students often conflate the muqaddam (village headman) with the zamindar, thinking both are "landlords" who own village land.' }
          ],
            remediations: { 'students-often-conflate-the-muqaddam': { steps: ['If the student confuses muqaddam with zamindar: (1) Re-read NCERT Section 2.2 ("Panchayats and headmen") and Section 5.', 'If the "little republic" misconception persists: re-read Section 2.4 and list three specific inequalities the NCERT.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often conflate the muqaddam (village headman) with the zamindar, thinking both are "landlords" who own village.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the British officials\' description of the Mughal village as a "little republic" (Section 2.4).', answer: 'The "little republic" label obscures more than it reveals',
                  options: ['The "little republic" label obscures more than it reveals', 'little republic', 'this was not a sign of rural egalitarianism'],
                  hint: 'If stuck, revisit c7_hist_ch07_007 (Delhi Sultanate village officials) and c12_hist_cbse_08_001.',
                  misconception: 'Students often conflate the muqaddam (village headman) with the zamindar, thinking both are "landlords" who own village land.' }
          ],
            remediations: { 'students-often-conflate-the-muqaddam': { steps: ['If the student confuses muqaddam with zamindar: (1) Re-read NCERT Section 2.2 ("Panchayats and headmen") and Section 5.', 'If the "little republic" misconception persists: re-read Section 2.4 and list three specific inequalities the NCERT.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_004', difficulty: 'standard',
          question: 'Khud-kashta and pahi-kashta were the two primary categories of peasant.',
          hint: 'If stuck, revisit the Ain-i-Akbari\'s description of peasant types in NCERT Theme 8.',
          misconception: 'Students often confuse pahi-kashta with landless labourers (majur) or think "Pahari" is a third peasant category.',
          parts: [
                { id: 'a', prompt: 'What are the two main categories of peasants mentioned in seventeenth-century Mughal sources such as the Ain-i-Akbari?', answer: 'The two main categories are khud-kashta (resident cultivators) and pahi-kashta',
                  options: ['The two main categories are khud-kashta (resident cultivators) and pahi-kashta', 'zamindars', 'Pahari', 'zamindars" or "ryots" as the two categories'],
                  hint: 'If stuck, revisit the Ain-i-Akbari\'s description of peasant types in NCERT Theme 8, Section 1.2.',
                  misconception: 'Students often confuse pahi-kashta with landless labourers (majur) or think "Pahari" is a third peasant category in Mughal records.' },
                { id: 'b', prompt: 'A village in the Delhi-Agra region has 200 cultivating households. The patwari\'s register shows 150 households as khud-kashta and 50 as pahi-kashta.', answer: 'The proportion of pahi-kashta cultivators would likely increase',
                  options: ['The proportion of pahi-kashta cultivators would likely increase', 'Pahari', '"Pahari" is a third peasant category in Mughal records'],
                  hint: 'If stuck, revisit the Ain-i-Akbari\'s description of peasant types in NCERT Theme 8, Section 1.2.',
                  misconception: 'Students often confuse pahi-kashta with landless labourers (majur) or think "Pahari" is a third peasant category in Mughal records.' }
          ],
            remediations: { 'students-often-confuse-pahi-kashta': { steps: ['If the student cannot distinguish the two categories, have them re-read NCERT section 1.2 ("Peasants and their lands").', 'Then ask them to label each of these scenarios: (1) A Jat peasant farming his ancestral land in his village; (2).', 'This concrete mapping to the text corrects the confusion.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_005', difficulty: 'standard',
          question: 'Zamindars in Mughal India (c. 1556–1707) were landed proprietors who held.',
          hint: 'If unclear on jama vs. hasil or the amil\'s duties, re-read node c12_hist_cbse_08_007.',
          misconception: 'Students often write "zamindars were the owners of all land in their zamindari" — confusing revenue-collection rights.',
          parts: [
                { id: 'a', prompt: 'Why did the Mughal state confirm zamindari rights through an imperial sanad rather than allowing conquest alone to legitimise a zamindar\'s authority?', answer: 'The state needed to control military resources and revenue flows',
                  options: ['The state needed to control military resources and revenue flows', 'the state respected traditional rights', 'zamindars were the owners of all land in their zamindari'],
                  hint: 'If unclear on jama vs. hasil or the amil\'s duties, re-read node c12_hist_cbse_08_007 (Land Revenue.',
                  misconception: 'Students often write "zamindars were the owners of all land in their zamindari" — confusing revenue-collection rights (nankar/malikana).' },
                { id: 'b', prompt: 'Compare the zamindar\'s role in surplus extraction with that of the jagirdar (node 008).', answer: 'Similarities: both acted as intermediaries between state and peasantry',
                  options: ['Similarities: both acted as intermediaries between state and peasantry', 'dual intermediary', 'zamindars were the owners of all land in their zamindari'],
                  hint: 'If unclear on jama vs. hasil or the amil\'s duties, re-read node c12_hist_cbse_08_007 (Land Revenue.',
                  misconception: 'Students often write "zamindars were the owners of all land in their zamindari" — confusing revenue-collection rights (nankar/malikana).' }
          ],
            remediations: { 'students-often-write-zamindars-were': { steps: ['Re-read the NCERT paragraphs on "The Zamindars" (pp.', '211–213) focusing on the distinction between milkiyat and revenue-collection lands.', 'Then revisit node c12_hist_cbse_08_003 (Village Community) to see how the muqaddam/patwari recorded peasant holdings.', 'Finally, re-attempt Diagnostic Question 1 and 4, writing a one-paragraph explanation of the property-rights distinction.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_006', difficulty: 'standard',
          question: 'The Zamindar\'s Military Retainers and the Fortified Stronghold (Qila) refers.',
          hint: 'If stuck, revisit the "parallel army" box in NCERT Theme 8 (p.',
          misconception: 'Students think zamindar forts (qilachas) and retainers were inherently rebellious — "private armies defying the.',
          parts: [
                { id: 'a', prompt: 'Why did the Mughal state tolerate zamindars maintaining forts (qilachas) and large armed contingents when these could challenge imperial authority?', answer: 'The state tolerated zamindar military power',
                  options: ['The state tolerated zamindar military power', 'the state was too weak to stop them', 'private armies defying the emperor'],
                  hint: 'If stuck, revisit the "parallel army" box in NCERT Theme 8 (p.',
                  misconception: 'Students think zamindar forts (qilachas) and retainers were inherently rebellious — "private armies defying the emperor." In reality, the.' }
          ],
            remediations: { 'zamindar-forts-qilachas-and-retainers': { steps: ['Re-read NCERT Theme 8, Section 5 ("The Zamindars"), focusing on the "parallel army" box and the sanad/colonisation.', 'Revisit node c12_hist_cbse_08_005 (Zamindars: Rights, Military Power) to recall the revenue-military link.', 'Compare the Ain\'s zamindar troop table (mulk-abadi columns 7–8) with the mansabdari system (node 08_008).', 'Re-attempt Diagnostic Questions 2 and 4 — they test the core symbiotic logic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
