import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch01_p1: SimDef = {
    id: 'v3_c12_hist_ch01_p1',
    title: 'Bricks, Beads and Bones (The Harappan Civilisation) · Part 1/2',
    subtitle: 'He held the seals — and still missed the civilisation',
    classLevel: 12, subject: 'history', topic: 'Bricks, Beads and Bones (The Harappan Civilisation) · Part 1/2',
    chapters: ['c12_hist_ch01'],
    nodeIds: ['c12_hist_cbse_01_001', 'c12_hist_cbse_01_002', 'c12_hist_cbse_01_003', 'c12_hist_cbse_01_004', 'c12_hist_cbse_01_005', 'c12_hist_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Archaeology-historiography analyst', intro: 'A civilisation was found, lost, found again — each discovery owed as much to the digging method as to the dig.', goal: 'Trace the discovery of the Harappan civilisation through Cunningham, Marshall and Wheeler\'s competing methods.' },
    discovery: {
        question: 'Cunningham found Harappan seals in the 1870s — and misdated them by millennia. Marshall announced a new civilisation in 1924. What did the first man get wrong?',
        options: ['He forced the finds into his own frame — hunting Buddhist-pilgrim-era sites, he couldn\'t imagine a civilisation 2,000 years older than his timeline', 'He was careless', 'The seals were fakes', 'No tools existed'],
        answer: 'He forced the finds into his own frame — hunting Buddhist-pilgrim-era sites, he couldn\'t imagine a civilisation 2,000 years older than his timeline',
        hook: 'Method writes history: Marshall\'s horizontal digging mixed centuries into single layers; Wheeler\'s stratigraphic boxes restored the timeline. And Partition \'losing\' Harappa spurred India to find Kalibangan, Lothal, Dholavira, Rakhigarhi — the setback built the discipline.',
    },
    teaching: [
        { title: 'Discovery of the Harappan Civilisation: Cunningham, Marshall and Wheeler', text: 'The discovery of the Harappan Civilisation refers to the historical process (mid-19th to mid-20th century) through which archaeologists identified, excavated, and interpreted the remains of the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Dig like an archaeologist: trace Cunningham to Marshall to Wheeler, weigh what horizontal excavation destroys, and judge whether Partition was a loss or a catalyst.',
        labels: ['Discovery of the Harappan', 'Geographical Extent: Mature Harappan', 'Harappan Town Planning: Grid', 'Drainage System: Covered Drains,', 'The Citadel and', 'Great Bath of Mohenjodaro'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_01_001', title: 'Discovery of the Harappan Civilisation: Cunningham, Marshall and Wheeler',
          caseStudy: { intro: 'Imagine you are visiting the National Museum in Delhi and see a Harappan seal displayed with a label saying "c. 2500 BCE".',
            decisions: [{ prompt: 'Who was the first Director-General of the Archaeological Survey of India (ASI) and what was his primary archaeological interest that caused.', options: [
                { text: 'Alexander Cunningham was the first Director-General of the ASI (appointed 1861)', outcome: 'Alexander Cunningham was the first Director-General of the ASI (appointed 1861).' },
                { text: 'discovered', outcome: 'Not quite — Students often believe that the Harappan Civilisation was "discovered" in a single moment by John.', reveals: 'the-harappan-civilisation-was-discovered' },
                { text: 'John Marshall or Mortimer Wheeler', outcome: 'Not quite — Students often believe that the Harappan Civilisation was "discovered" in a single moment by John.', reveals: 'the-harappan-civilisation-was-discovered' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_01_002', title: 'Geographical Extent: Mature Harappan Sites and the Indus-Sarasvati Region',
          caseStudy: { intro: 'Imagine you are standing at the Rakhigarhi mound in Hisar, Haryana — the largest Harappan city at 550 hectares — and you look north toward the dry bed of the.',
            decisions: [{ prompt: 'On Map 1 in the NCERT textbook, which of the following sites is NOT located in the Sarasvati (Ghaggar-Hakra) basin: Rakhigarhi, Banawali.', options: [
                { text: 'Correct answer: Mohenjodaro', outcome: 'Correct answer: Mohenjodaro. It lies on the right bank of the Indus River in Sindh, Pakistan, well.' },
                { text: 'Indus Valley Civilisation', outcome: 'Not quite — Students often believe the "Indus Valley Civilisation" was centred *only* on the Indus River.', reveals: 'the-indus-valley-civilisation-was' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_01_003', title: 'Harappan Town Planning: Grid Pattern, Streets and Fortification',
          caseStudy: { intro: 'Imagine walking through Chandigarh’s Sector 17 — straight roads, uniform blocks, designated zones.',
            decisions: [{ prompt: 'What is the standardized ratio of length : breadth : height for Harappan bricks, and at how many major sites has this ratio been confirmed?', options: [
                { text: 'The ratio is 4:2:1 (length:breadth:height)', outcome: 'The ratio is 4:2:1 (length:breadth:height). This ratio has been confirmed at *all* major Harappan.' },
                { text: 'varied by site', outcome: 'Not quite — Students equate “grid pattern” with *perfect* right angles everywhere and *straight* streets — but.', reveals: 'students-equate-grid-pattern-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_01_004', title: 'Drainage System: Covered Drains, Soak Pits and Urban Sanitation',
          caseStudy: { intro: 'Imagine you are a municipal engineer visiting the excavated streets of Mohenjodaro today — you notice that every house had a bathroom with a brick-paved floor.',
            decisions: [{ prompt: 'What is the typical cross-section shape of a main street drain at Mohenjodaro, and what material was used for its removable cover?', options: [
                { text: 'Main drains were U-shaped or rectangular channels built with bricks set in gypsum/lime', outcome: 'Main drains were U-shaped or rectangular channels built with bricks set in gypsum/lime mortar.' },
                { text: 'open ditches', outcome: 'Not quite — Students often think "covered drains" means *sealed* drains like modern PVC pipes.', reveals: 'covered-drains-means-sealed-drains' },
                { text: 'stone slabs fixed with mortar', outcome: 'Not quite — Students often think "covered drains" means *sealed* drains like modern PVC pipes.', reveals: 'covered-drains-means-sealed-drains' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_01_005', title: 'The Citadel and the Lower Town: Mohenjodaro\'s Urban Layout',
          caseStudy: { intro: 'Imagine standing at the edge of Mohenjodaro\'s Citadel mound today — the wind blows dust across baked-brick walls that once separated a tank the size of.',
            decisions: [{ prompt: 'What are the two main sectors of Mohenjodaro\'s settlement layout, and which is higher and smaller?', options: [
                { text: 'The two sectors are the Citadel (smaller, higher, western) and the Lower Town (larger,', outcome: 'The two sectors are the Citadel (smaller, higher, western) and the Lower Town (larger, lower.' },
                { text: 'fortress for kings', outcome: 'Not quite — Students often think the Citadel was a "fortress for kings" and the Lower Town a "slum for.', reveals: 'the-citadel-was-a-fortress' },
                { text: 'slum for commoners', outcome: 'Not quite — Students often think the Citadel was a "fortress for kings" and the Lower Town a "slum for.', reveals: 'the-citadel-was-a-fortress' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_01_006', title: 'Great Bath of Mohenjodaro: Structure and Ritual Significance',
          caseStudy: { intro: 'Imagine you are visiting a centuries-old stepwell like Rani ki Vav in Gujarat or a temple tank in Tamil Nadu — you notice the precise stonework, the steps.',
            decisions: [{ prompt: 'What are the two specific materials used to make the Great Bath watertight, as reported in the NCERT text?', options: [
                { text: 'Bricks set on edge and gypsum mortar', outcome: 'Bricks set on edge and gypsum mortar. A wrong answer (e.g., "bitumen" or "lime mortar") reveals the.' },
                { text: 'bitumen', outcome: 'Not quite — Students often believe the Great Bath\'s ritual function is a *proven fact* because textbooks label.', reveals: 'the-great-bath-s-ritual' },
                { text: 'lime mortar', outcome: 'Not quite — Students often believe the Great Bath\'s ritual function is a *proven fact* because textbooks label.', reveals: 'the-great-bath-s-ritual' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A teammate\'s exhibition model labels the Harappans \'the Sarasvati civilisation — the Indus barely mattered\', citing that two-thirds of the settlements sat on the Ghaggar-Hakra.',
            decisions: [{ prompt: 'What does the site map actually justify claiming?', options: [
                { text: 'Highest density, not exclusivity — the Sarasvati basin hosted the thickest settlement belt, but Mohenjodaro stood on the Indus, Dholavira and Lothal worked the Gujarat coast, and Shortughai sat by the Oxus lapis mines; the civilisation was multi-riverine and maritime.', outcome: 'The chapter\'s caution is exactly this: two-thirds concentration is a distribution fact, not a single-river thesis — trade reach ran from the Indus delta to Afghanistan.' },
                { text: 'Agree — two-thirds is a majority, so \'Sarasvati civilisation\' is accurate shorthand.', outcome: 'That conflates density with identity: the remaining third includes the biggest urban sites and the whole coastal-Central Asian trade network — a name that erases them misdescribes the civilisation\'s economic geography.', reveals: 'density-equals-identity' },
                { text: 'Correct it the other way — call it the Indus civilisation only, since Mohenjodaro is on the Indus.', outcome: 'That repeats the same error on the opposite bank: no single river owns a settlement system that spread across the Indus, Sarasvati, Luni and the coast — \'Indus civilisation\' survives as shorthand, not as geography.', reveals: 'swap-one-river-for-another' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue that archaeology\'s real artefacts include its methods — and that how you dig decides what the past can say.',
            decisions: [{ prompt: 'What comes next? Bricks, Beads and Bones (The Harappan Civilisation) · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Bricks, Beads and Bones (The Harappan Civilisation) · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_01_001', difficulty: 'standard',
          question: 'The discovery of the Harappan Civilisation refers to the historical process.',
          hint: 'If unclear why Cunningham missed the Harappan Civilisation, revisit the concept of "Early.',
          misconception: 'Students often believe that the Harappan Civilisation was "discovered" in a single moment by John Marshall in 1924.',
          parts: [
                { id: 'a', prompt: 'Who was the first Director-General of the Archaeological Survey of India (ASI) and what was his primary archaeological interest that caused him to overlook the.', answer: 'Alexander Cunningham was the first Director-General of the ASI (appointed 1861)',
                  options: ['Alexander Cunningham was the first Director-General of the ASI (appointed 1861)', 'discovered', 'John Marshall or Mortimer Wheeler'],
                  hint: 'If unclear why Cunningham missed the Harappan Civilisation, revisit the concept of "Early Historic.',
                  misconception: 'Students often believe that the Harappan Civilisation was "discovered" in a single moment by John Marshall in 1924.' }
          ],
            remediations: { 'the-harappan-civilisation-was-discovered': { steps: ['If the student confuses the sequence or contributions of Cunningham, Marshall, and Wheeler: (1) Re-read the.', '19–21) and create a three-column table: Archaeologist | Year/Role | Key Method/Insight | Limitation.', '(2) Watch the 10-minute video "Harappan Archaeology: From Cunningham to Wheeler" (available on NCERT\'s official YouTube.', '(3) Re-attempt Diagnostic Questions 1–4, writing a one-sentence justification for each answer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the Harappan Civilisation was "discovered" in a single moment by John Marshall in 1924.',
          parts: [
                { id: 'a', prompt: 'Construct a timeline of methodological shifts in Harappan archaeology from 1875 to 2013, annotating each entry with the archaeologist\'s name, their key.', answer: 'A strong timeline would include: 1',
                  options: ['A strong timeline would include: 1', 'discovered'],
                  hint: 'If unclear why Cunningham missed the Harappan Civilisation, revisit the concept of "Early Historic.',
                  misconception: 'Students often believe that the Harappan Civilisation was "discovered" in a single moment by John Marshall in 1924.' }
          ],
            remediations: { 'the-harappan-civilisation-was-discovered': { steps: ['If the student confuses the sequence or contributions of Cunningham, Marshall, and Wheeler: (1) Re-read the.', '19–21) and create a three-column table: Archaeologist | Year/Role | Key Method/Insight | Limitation.', '(2) Watch the 10-minute video "Harappan Archaeology: From Cunningham to Wheeler" (available on NCERT\'s official YouTube.', '(3) Re-attempt Diagnostic Questions 1–4, writing a one-sentence justification for each answer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_01_002', difficulty: 'standard',
          question: 'The Mature Harappan phase (2600–1900 BCE) represents the urban zenith of the.',
          hint: 'If unable to visualise the river systems, review Class 9 Geography Chapter 2 (Drainage).',
          misconception: 'Students often believe the "Indus Valley Civilisation" was centred *only* on the Indus River, ignoring that the.',
          parts: [
                { id: 'a', prompt: 'On Map 1 in the NCERT textbook, which of the following sites is NOT located in the Sarasvati (Ghaggar-Hakra) basin: Rakhigarhi, Banawali, Kalibangan,.', answer: 'Correct answer: Mohenjodaro',
                  options: ['Correct answer: Mohenjodaro', 'Indus Valley Civilisation'],
                  hint: 'If unable to visualise the river systems, review Class 9 Geography Chapter 2 (Drainage).',
                  misconception: 'Students often believe the "Indus Valley Civilisation" was centred *only* on the Indus River, ignoring that the Sarasvati (Ghaggar-Hakra).' }
          ],
            remediations: { 'the-indus-valley-civilisation-was': { steps: ['If the student cannot distinguish the two river basins or misplaces major sites: (1) Revisit **c6_history_ch04_002**.', '(2) Print a blank outline map of the subcontinent; draw the Indus with five tributaries and the Sarasvati.', '(3) Plot the five major cities in red, ten secondary sites in blue, and label rivers.', '(4) Re-attempt Diagnostic Questions 1 and 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_01_003', difficulty: 'standard',
          question: 'Harappan town planning refers to the systematic urban design of Mature Harappan.',
          hint: 'If stuck on “why grid?”, revisit c6_history_ch04_003’s discussion.',
          misconception: 'Students equate “grid pattern” with *perfect* right angles everywhere and *straight* streets — but NCERT says.',
          parts: [
                { id: 'a', prompt: 'What is the standardized ratio of length : breadth : height for Harappan bricks, and at how many major sites has this ratio been confirmed?', answer: 'The ratio is 4:2:1 (length:breadth:height)',
                  options: ['The ratio is 4:2:1 (length:breadth:height)', 'varied by site'],
                  hint: 'If stuck on “why grid?”, revisit c6_history_ch04_003’s discussion of streets-with-drains-first;.',
                  misconception: 'Students equate “grid pattern” with *perfect* right angles everywhere and *straight* streets — but NCERT says “approximate grid” (Fig 1.7.' }
          ],
            remediations: { 'students-equate-grid-pattern-with': { steps: ['5–8 (sections 3, 3.1, 3.2) with Fig 1.7 open; trace streets with a ruler — note where grid bends.', 'Revisit c6_history_ch04_003 (Class 6 town planning) and c8_hist_ch5_2 (Dholavira’s reservoirs/walls) — compare Citadel.', 'Do a 5-minute sketch: draw Mohenjodaro’s Citadel + Lower Town from memory, label 3 features proving *public* not.', 'Re-attempt Diagnostic Q3 and Q4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_01_004', difficulty: 'standard',
          question: 'The Harappan drainage system refers to the sophisticated, city-wide network.',
          hint: 'If unclear on gradient/flow direction, revisit the Mohenjodaro plan (Fig.',
          misconception: 'Students often think "covered drains" means *sealed* drains like modern PVC pipes.',
          parts: [
                { id: 'a', prompt: 'At Lothal, houses were built of mud bricks but drains were made of burnt bricks. What does this material contrast reveal about Harappan priorities?', answer: 'It shows drainage was considered critical infrastructure warranting durable,',
                  options: ['It shows drainage was considered critical infrastructure warranting durable,', 'burnt bricks were cheaper', 'mud bricks dissolve in water', 'covered drains'],
                  hint: 'If unclear on gradient/flow direction, revisit the Mohenjodaro plan (Fig.',
                  misconception: 'Students often think "covered drains" means *sealed* drains like modern PVC pipes.' }
          ],
            remediations: { 'covered-drains-means-sealed-drains': { steps: ['If the student confuses "covered" with "sealed": 1.', 'Re-read Mackay\'s Source 2 in NCERT (p.7) — highlight "covered with loose bricks that could be removed for cleaning".', 'Visit node c12_hist_cbse_01_003 (Harappan Town Planning) and trace the sequence: streets+drains laid FIRST → houses.', 'Draw a cross-section: house floor → wall outlet → sump → street drain → loose cover.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_01_005', difficulty: 'standard',
          question: 'The Citadel and Lower Town represent the dual-sector urban layout.',
          hint: 'Revisit c6_history_ch04_003 (Harappan Cities: Town Planning and Architecture) for the.',
          misconception: 'Students often think the Citadel was a "fortress for kings" and the Lower Town a "slum for commoners" — a colonial-era.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Citadel and Lower Town represent the dual-sector urban layout of Mohenjodaro (c',
                  options: ['The Citadel and Lower Town represent the dual-sector urban layout of Mohenjodaro (c', 'The discovery of the Harappan Civilisation refers to the historical process (mid-19th to', 'The Mature Harappan phase (2600–1900 BCE) represents the urban zenith of the Harappan', 'Harappan town planning refers to the systematic urban design of Mature Harappan cities (c'],
                  hint: 'Revisit c6_history_ch04_003 (Harappan Cities: Town Planning and Architecture) for the foundational.',
                  misconception: 'Students often think the Citadel was a "fortress for kings" and the Lower Town a "slum for commoners" — a colonial-era interpretation.' }
          ],
            remediations: { 'the-citadel-was-a-fortress': { steps: ['If the student holds the "fortress vs.', 'slum" misconception: (1) Re-read NCERT pp.', '5–7, noting the absence of "palace" finds and the description of Lower Town houses as "large" with "two storeys." (2).', '1.9 (isometric house) — identify courtyard, bathroom, well, staircase.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_01_006', difficulty: 'standard',
          question: 'The Great Bath of Mohenjodaro is a large, watertight rectangular tank (12m × 7m.',
          hint: 'If stuck on the inference gap, revisit **c9_hist_ch1_5** (Archaeological Sources) and the.',
          misconception: 'Students often believe the Great Bath\'s ritual function is a *proven fact* because textbooks label it "Great Bath" and.',
          parts: [
                { id: 'a', prompt: 'What are the two specific materials used to make the Great Bath watertight, as reported in the NCERT text?', answer: 'Bricks set on edge and gypsum mortar',
                  options: ['Bricks set on edge and gypsum mortar', 'bitumen', 'lime mortar', 'Great Bath'],
                  hint: 'If stuck on the inference gap, revisit **c9_hist_ch1_5** (Archaeological Sources) and the "Source.',
                  misconception: 'Students often believe the Great Bath\'s ritual function is a *proven fact* because textbooks label it "Great Bath" and mention "ritual.' },
                { id: 'b', prompt: 'Compare the Great Bath’s water supply system (well + inlet) with the "bathroom block" located across the lane (eight rooms with drains).', answer: 'The Great Bath has a single large well in an adjacent room',
                  options: ['The Great Bath has a single large well in an adjacent room', 'public baths', 'Great Bath', 'ritual bath'],
                  hint: 'If stuck on the inference gap, revisit **c9_hist_ch1_5** (Archaeological Sources) and the "Source.',
                  misconception: 'Students often believe the Great Bath\'s ritual function is a *proven fact* because textbooks label it "Great Bath" and mention "ritual.' }
          ],
            remediations: { 'the-great-bath-s-ritual': { steps: ['Re-read the NCERT paragraphs on the Great Bath (pp.', '7–8) and the "Problems of Interpretation" section (p.', '23) where the ritual assumption is explicitly questioned.', 'Revisit node **c6_history_ch04_005** (Class 6 Great Bath) and list *only* the physical features described there vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
