import type { SimDef } from '../../engine/types';
import C9_HistoryCivicsDeclineHarappanCivilisationSim from '../../../simulations/c6_12/C9_HistoryCivicsDeclineHarappanCivilisationSim';

/** v3 wrapped master — C9_HistoryCivicsDeclineHarappanCivilisationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_historycivicsdeclineharappancivilisationsim: SimDef = {
    id: 'v3w_c9_historycivicsdeclineharappancivilisationsim',
    title: 'Mehrgarh: Early Agricultural Settlement',
    subtitle: 'This node covers the archaeological phases of Mehrgarh (Periods I–III), the evidence for.',
    classLevel: 9, subject: 'history', topic: 'Mehrgarh: Early Agricultural Settlement',
    chapters: [],
    nodeIds: ['c9_hist_ch2_6', 'c9_hist_ch2_7', 'c9_hist_ch2_8', 'c9_hist_ch2_10', 'c9_hist_ch2_5', 'c9_hist_ch2_9', 'c9_hist_ch2_11'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you are visiting a museum and see a display of tiny, charred wheat grains and a clay figurine from a.', goal: 'Master Mehrgarh: Early Agricultural Settlement.' },
    discovery: {
        question: 'A newly excavated Harappan site shows a citadel mound but no grid streets in the lower town — instead, lanes curve organically.',
        options: ['It does not fit the mature Harappan model', 'local variation', 'all identical clones'],
        answer: 'It does not fit the mature Harappan model',
        hook: 'Students believe Harappan cities were "all identical clones" — that every city had a Great Bath, a granary, and the.',
    },
    teaching: [
        { title: 'Mehrgarh is a Neolithic archaeological site.', text: 'Mehrgarh is a Neolithic archaeological site located in the Kachi Plain of Balochistan, Pakistan, dating from approximately 7000 BCE to 2500 BCE.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_hist_ch2_6', title: 'Mehrgarh is a Neolithic archaeological.',
          scaffold: { problem: 'Using the archaeological evidence from Mehrgarh Periods I and II, explain how the site demonstrates the "Neolithic Revolution" as a process.',
            steps: [
            { text: 'Identify the time span of Period I (c. 7000–5500 BCE) and Period II (c. 5500–4800 BCE) – a 2,000-year window.' },
            { text: 'List Period I evidence: aceramic (no pottery), circular huts, wild game hunting dominant, but *domesticated* wheat,.' },
            { text: 'List Period II evidence: introduction of handmade pottery, rectangular mud-brick houses, increased reliance on.' },
            { text: 'Analyze the trajectory: Domestication begins *before* pottery and settled architecture; the "package" of Neolithic.' },
            { text: 'Conclude that the revolution is a long, indigenous process of experimentation, not a sudden import or single invention.', faded: true, blankAnswer: 'Mehrgarh shows the Neolithic Revolution as a 2,000-year.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_hist_ch2_7', title: 'The Harappan (Sindhu-Sarasvati).',
          scaffold: { problem: 'Explain how the Harappan drainage system demonstrates both technical sophistication and social organization, using evidence from at least.',
            steps: [
            { text: 'Identify the components — covered drains along streets, vertical inspection shafts at intervals, household connections.' },
            { text: 'Note material adaptation — baked brick at Mohenjo-daro (alluvial plain), dressed stone at Dholavira (rocky terrain),.' },
            { text: 'Analyze household connections — almost every house in lower towns had a bathroom/chute linked to main drain, implying.' },
            { text: 'Infer social organization — such a system requires municipal planning (layout before construction), maintenance crews.' },
            { text: 'Conclude significance — it is the world\'s first *city-wide* sanitation system, surpassing contemporary Mesopotamia.', faded: true, blankAnswer: 'The Harappan drainage system combined uniform technical.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_hist_ch2_8', title: 'The Harappan Civilisation (c. 2600–1900.',
          scaffold: { problem: 'Using archaeological evidence, explain how Harappan long-distance trade functioned without coins, writing readable today, or a known.',
            steps: [
            { text: 'Identify the *trade goods* — carnelian beads (Gujarat), lapis lazuli (Afghanistan), copper (Oman/Rajasthan), shell.' },
            { text: 'Identify the *transport mechanisms* — bullock carts (terracotta models at Harappa), river boats (depicted on seals,.' },
            { text: 'Analyze the *standardization tools* — chert cubical weights (1:2:4:8:16… then decimal) found at *every* site from.' },
            { text: 'Examine the *credit/trust devices* — stamp seals (unicorn motif) with Indus script, used to seal clay tags on goods;.' },
            { text: 'Synthesize — trade operated through *merchant networks* (likely kinship-based) using standardized weights as "contract.', faded: true, blankAnswer: 'Harappan trade relied on a decentralized merchant network.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_hist_ch2_10', title: 'Egyptian Civilisation (c. 3100–30 BCE).',
          scaffold: { problem: 'Using the "predictable flood → centralised state" model, explain why Old Kingdom Egypt developed divine kingship and pyramid building while.',
            steps: [
            { text: 'Identify the geographic variable — Nile floods predictably (July–October); Indus floods unpredictably.' },
            { text: 'Link to agricultural surplus reliability — Egypt could plan multi-year grain storage and taxation; Harappan surplus was.' },
            { text: 'Connect surplus to state capacity — Pharaoh claimed all land (the "Two Lands"), taxed harvests, and commanded labour;.' },
            { text: 'Trace to monumental architecture — Pyramids required centralised quarrying, transport, feeding, housing of thousands;.' },
            { text: 'Evaluate ideological outcome — Egyptian pyramid texts explicitly deify the king; Harappan seals show no royal portraits.', faded: true, blankAnswer: 'The Nile\'s predictable flood enabled reliable surplus,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_hist_ch2_5', title: 'The Neolithic Period (c. 7000–3000 BCE.',
          scaffold: { problem: 'Explain why the Neolithic transition occurred at different times in the northwest (Mehrgarh, c. 7000 BCE) and the Deccan (Piklihal, c.',
            steps: [
            { text: 'Identify the domesticates at each site — Mehrgarh has wheat, barley, cattle, sheep, goat (Southwest Asian complex);.' },
            { text: 'Map the wild progenitors — wild wheat/barley grow naturally in the Fertile Crescent foothills near Mehrgarh; wild.' },
            { text: 'Analyze climate history — the northwest received winter rain from Mediterranean systems, favoring winter cereals; the.' },
            { text: 'Trace diffusion vs. independent domestication — Southwest Asian crops/animals spread eastward via the Iranian plateau.' },
            { text: 'Synthesize — the 4500-year gap reflects two independent domestication centers with different ecological triggers, not a.', faded: true, blankAnswer: 'The Neolithic was not a single event but multiple.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_hist_ch2_9', title: 'Mesopotamian Civilisation (c. 3500–500.',
          scaffold: { problem: 'Explain why cuneiform writing developed in Mesopotamia but not in the Harappan Civilisation, using environmental and institutional evidence.',
            steps: [
            { text: 'Identify the key environmental difference—Mesopotamia\'s resource scarcity (no metal, stone, timber) vs.' },
            { text: 'Link scarcity to trade dependence—Mesopotamian cities *had* to import raw materials, requiring complex record-keeping.' },
            { text: 'Connect trade to temple bureaucracy—temples managed import/export, creating institutional demand for standardized.' },
            { text: 'Contrast with Harappa—resource-rich, less trade-dependent, no evidence of temple-redistributive economy; urban needs.' },
            { text: 'Conclude—writing emerges where *institutional complexity* (temple-state) meets *exchange complexity* (long-distance.', faded: true, blankAnswer: 'Cuneiform arose from the intersection of Mesopotamia\'s.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_hist_ch2_7', title: 'Identify each idea',
          dissect: { specimen: 'Mehrgarh: Early Agricultural Settlement', spots: [
            { id: 's1', label: 'Mehrgarh is a Neolithic archaeological', prompt: 'Which idea is this? — Mehrgarh is a Neolithic archaeological site located in the Kachi Plain of Balochistan,.', answer: 'Mehrgarh is a Neolithic archaeological', options: ['Mehrgarh is a Neolithic archaeological', 'The Harappan Sindhu-Sarasvati Civilisations urban', 'The Harappan Civilisation c 26001900', 'Egyptian Civilisation c 310030 BCE'] },
            { id: 's2', label: 'The Harappan Sindhu-Sarasvati Civilisations urban', prompt: 'Which idea is this? — The Harappan (Sindhu-Sarasvati) Civilisation\'s urban planning (c.', answer: 'The Harappan Sindhu-Sarasvati Civilisations urban', options: ['The Harappan Sindhu-Sarasvati Civilisations urban', 'Mehrgarh is a Neolithic archaeological', 'The Harappan Civilisation c 26001900', 'Egyptian Civilisation c 310030 BCE'] },
            { id: 's3', label: 'The Harappan Civilisation c 26001900', prompt: 'Which idea is this? — The Harappan Civilisation (c. 2600–1900 BCE), flourishing in the Indus-Ghaggar-Hakra.', answer: 'The Harappan Civilisation c 26001900', options: ['The Harappan Civilisation c 26001900', 'Mehrgarh is a Neolithic archaeological', 'The Harappan Sindhu-Sarasvati Civilisations urban', 'Egyptian Civilisation c 310030 BCE'] },
            { id: 's4', label: 'Egyptian Civilisation c 310030 BCE', prompt: 'Which idea is this? — Egyptian Civilisation (c. 3100–30 BCE) was a Bronze Age civilisation centred along the.', answer: 'Egyptian Civilisation c 310030 BCE', options: ['Egyptian Civilisation c 310030 BCE', 'Mehrgarh is a Neolithic archaeological', 'The Harappan Sindhu-Sarasvati Civilisations urban', 'The Harappan Civilisation c 26001900'] },
            { id: 's5', label: 'The Neolithic Period c 70003000', prompt: 'Which idea is this? — The Neolithic Period (c. 7000–3000 BCE in the Indian subcontinent) marks the transition.', answer: 'The Neolithic Period c 70003000', options: ['The Neolithic Period c 70003000', 'Mehrgarh is a Neolithic archaeological', 'The Harappan Sindhu-Sarasvati Civilisations urban', 'The Harappan Civilisation c 26001900'] },
            { id: 's6', label: 'Mesopotamian Civilisation c 3500500 BCE', prompt: 'Which idea is this? — Mesopotamian Civilisation (c. 3500–500 BCE) emerged in the fertile river valleys of the.', answer: 'Mesopotamian Civilisation c 3500500 BCE', options: ['Mesopotamian Civilisation c 3500500 BCE', 'Mehrgarh is a Neolithic archaeological', 'The Harappan Sindhu-Sarasvati Civilisations urban', 'The Harappan Civilisation c 26001900'] }
          ] } }
    ],
    explore: { component: C9_HistoryCivicsDeclineHarappanCivilisationSim, prompt: 'Explore the interactive — Mehrgarh: Early Agricultural Settlement' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hist_ch2_6', difficulty: 'standard',
          question: 'Mehrgarh is a Neolithic archaeological site located in the Kachi Plain of.',
          hint: 'Revisit the Neolithic Period node (c9_hist_ch2_5) and review the definitions of.',
          misconception: 'Students often think Mehrgarh is simply "an early village" that happened to exist before the Harappans, missing that it.',
          parts: [
                { id: 'a', prompt: 'What is the approximate time range of the Mehrgarh settlement, and in which modern-day country is it located?', answer: 'Mehrgarh dates from c',
                  options: ['Mehrgarh dates from c', 'an early village'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Mehrgarh is simply "an early village" that happened to exist before the Harappans, missing that it represents a.' }
          ],
            remediations: { 'mehrgarh-is-simply-an-early': { steps: ['If the student holds this misconception, have them: (1) Draw a map locating Mehrgarh, the Bolan Pass, and major.', '(2) Construct a stratigraphic column of Mehrgarh\'s 7 periods using textbook images, labeling the *first appearance* of.', '(3) Write a one-paragraph argument: "Mehrgarh is the nursery of the Harappan Civilisation" using three specific.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_7', difficulty: 'standard',
          question: 'The Harappan (Sindhu-Sarasvati) Civilisation\'s urban planning (c.',
          hint: 'Revisit Class 6 "Harappan Cities: Town Planning and Architecture" (c6_history_ch04_003).',
          misconception: 'Students believe Harappan cities were "all identical clones" — that every city had a Great Bath, a granary, and the.',
          parts: [
                { id: 'a', prompt: 'A newly excavated Harappan site shows a citadel mound but no grid streets in the lower town — instead, lanes curve organically.', answer: 'It does not fit the mature Harappan model',
                  options: ['It does not fit the mature Harappan model', 'local variation', 'all identical clones'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Harappan cities were "all identical clones" — that every city had a Great Bath, a granary, and the exact same layout.' },
                { id: 'b', prompt: 'Compare the drainage systems of Mohenjo-daro and Dholavira. What does the difference in construction material (baked brick vs.', answer: 'Mohenjo-daro used baked bricks',
                  options: ['Mohenjo-daro used baked bricks', 'one used brick, one stone', 'all identical clones'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Harappan cities were "all identical clones" — that every city had a Great Bath, a granary, and the exact same layout.' }
          ],
            remediations: { 'harappan-cities-were-all-identical': { steps: ['Create a comparison table of five major sites (Mohenjo-daro, Harappa, Dholavira, Lothal, Kalibangan) with columns:.', 'Fill using Class 6 knowledge + this node.', 'Highlight which features appear in ALL sites (grid, drainage, brick ratio, citadel/lower town) vs.', 'Write a 3-sentence conclusion: "Uniformity is in the *system*, not the *structures*." This directly replaces the.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Harappan cities were "all identical clones" — that every city had a Great Bath, a granary, and the.',
          parts: [
                { id: 'a', prompt: 'Some historians argue the "citadel" was a religious center, others a administrative elite residence.', answer: 'Administrative elite residence is better supported',
                  options: ['Administrative elite residence is better supported', 'religious center', 'all identical clones'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Harappan cities were "all identical clones" — that every city had a Great Bath, a granary, and the exact same layout.' },
                { id: 'b', prompt: 'Design a 5-point checklist an archaeologist would use to confirm a newly discovered site belongs to the *mature* Harappan urban phase (not early or late).', answer: '1) Citadel on raised western mound with fortification wall',
                  options: ['1) Citadel on raised western mound with fortification wall', 'all identical clones'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Harappan cities were "all identical clones" — that every city had a Great Bath, a granary, and the exact same layout.' },
                { id: 'c', prompt: 'Compare the drainage systems of Mohenjo-daro and Dholavira. What does the difference in construction material (baked brick vs.', answer: 'Mohenjo-daro used baked bricks',
                  options: ['Mohenjo-daro used baked bricks', 'one used brick, one stone', 'all identical clones'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Harappan cities were "all identical clones" — that every city had a Great Bath, a granary, and the exact same layout.' }
          ],
            remediations: { 'harappan-cities-were-all-identical': { steps: ['Create a comparison table of five major sites (Mohenjo-daro, Harappa, Dholavira, Lothal, Kalibangan) with columns:.', 'Fill using Class 6 knowledge + this node.', 'Highlight which features appear in ALL sites (grid, drainage, brick ratio, citadel/lower town) vs.', 'Write a 3-sentence conclusion: "Uniformity is in the *system*, not the *structures*." This directly replaces the.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_8', difficulty: 'standard',
          question: 'The Harappan Civilisation (c. 2600–1900 BCE), flourishing in the.',
          hint: 'If stuck, re-read c9_hist_ch2_7 on "Citadel vs Lower Town" economic functions and.',
          misconception: 'Students believe the Harappan civilisation "vanished suddenly" around 1900 BCE due to an Aryan invasion that destroyed.',
          parts: [
                { id: 'a', prompt: 'Name two raw materials the Harappans imported from outside the Indus valley and their most likely source regions.', answer: 'Correct: Copper from the Khetri mines (Rajasthan) or Oman',
                  options: ['Correct: Copper from the Khetri mines (Rajasthan) or Oman', 'iron from Mesopotamia', 'vanished suddenly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Harappan civilisation "vanished suddenly" around 1900 BCE due to an Aryan invasion that destroyed cities and killed.' }
          ],
            remediations: { 'the-harappan-civilisation-vanished-suddenly': { steps: ['Re-visit c9_hist_ch2_7: list the *urban* traits (writing, weights, citadels, drains) that define the Mature Harappan.', 'Late Harappan sites; observe the *eastward/southward shift* (not abandonment).', 'Read the "Cemetery H" culture description (NCERT Class 12 Themes in Indian History, Ch.1) to see which Harappan traits.', 'Write a 3-sentence summary: "The city ended; the people and their farming/craft traditions continued."'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Harappan civilisation "vanished suddenly" around 1900 BCE due to an Aryan invasion that destroyed.',
          parts: [
                { id: 'a', prompt: 'Recent studies of oxygen isotopes in gypsum from Lake Kotla Dahar (Haryana) show an abrupt monsoon weakening c. 2100 BCE.', answer: 'Correct: No—correlation is not causation',
                  options: ['Correct: No—correlation is not causation', 'yes, drought killed the civilisation', 'vanished suddenly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Harappan civilisation "vanished suddenly" around 1900 BCE due to an Aryan invasion that destroyed cities and killed.' },
                { id: 'b', prompt: 'Construct a three-phase timeline (Early Decline, Late Urban, Post-Urban) for the Harappan decline (1900–1300 BCE) with one diagnostic archaeological marker for.', answer: 'Good answer: Phase 1 (1900–1800 BCE): Early Decline',
                  options: ['Good answer: Phase 1 (1900–1800 BCE): Early Decline', 'vanished suddenly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Harappan civilisation "vanished suddenly" around 1900 BCE due to an Aryan invasion that destroyed cities and killed.' }
          ],
            remediations: { 'the-harappan-civilisation-vanished-suddenly': { steps: ['Re-visit c9_hist_ch2_7: list the *urban* traits (writing, weights, citadels, drains) that define the Mature Harappan.', 'Late Harappan sites; observe the *eastward/southward shift* (not abandonment).', 'Read the "Cemetery H" culture description (NCERT Class 12 Themes in Indian History, Ch.1) to see which Harappan traits.', 'Write a 3-sentence summary: "The city ended; the people and their farming/craft traditions continued."'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_10', difficulty: 'standard',
          question: 'Egyptian Civilisation (c. 3100–30 BCE) was a Bronze Age civilisation centred.',
          hint: 'Revisit c9_hist_ch2_9 (Mesopotamian ziggurats vs. Egyptian pyramids) and.',
          misconception: 'Students believe pyramids were built by foreign slaves (often conflating with the biblical Exodus narrative) and that.',
          parts: [
                { id: 'a', prompt: 'Name the river that sustained Egyptian civilisation and state the approximate time period of the Old Kingdom pyramid-building phase.', answer: 'The Nile River sustained Egyptian civilisation',
                  options: ['The Nile River sustained Egyptian civilisation', 'Tigris'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe pyramids were built by foreign slaves (often conflating with the biblical Exodus narrative) and that pyramid construction.' },
                { id: 'b', prompt: 'A student claims: "The pyramids were built by Hebrew slaves, as shown in the Bible." Using archaeological evidence from the workers\' village at Deir el-Medina.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'Friends of Khufu'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe pyramids were built by foreign slaves (often conflating with the biblical Exodus narrative) and that pyramid construction.' }
          ],
            remediations: { 'pyramids-were-built-by-foreign': { steps: ['Show students the "Diary of Merer" (Wadi al-Jarf papyri, c. 2560 BCE) — a real inspector\'s log detailing limestone.', 'Compare with the biblical Exodus timeline (c. 13th century BCE) — 1,300 years *after* the Great Pyramid.', 'Analyse workers\' tomb inscriptions at Giza (e.g., "Overseer of the Craftsmen") showing skilled Egyptian labour.', 'Have students rewrite the "slave narrative" as a corrected evidence-based paragraph for board-style answer writing.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_5', difficulty: 'standard',
          question: 'The Neolithic Period (c. 7000–3000 BCE in the Indian subcontinent) marks the.',
          hint: 'If stuck, revisit c9_hist_ch2_4 and focus on: (1) microliths as composite tools for.',
          misconception: 'Students believe the Neolithic Revolution was a single event where "humans invented farming" and immediately settled.',
          parts: [
                { id: 'a', prompt: 'Name the two key archaeological sites in the Indian subcontinent that provide the earliest evidence of Neolithic agriculture and settlement, and state the.', answer: 'Mehrgarh (Balochistan, c',
                  options: ['Mehrgarh (Balochistan, c', 'humans invented farming'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Neolithic Revolution was a single event where "humans invented farming" and immediately settled into villages,.' }
          ],
            remediations: { 'the-neolithic-revolution-was-a': { steps: ['Revisit c9_hist_ch2_4 (Mesolithic) to recall how hunter-gatherers already managed wild cereals and used microliths for.', 'On a map of the subcontinent, plot Mehrgarh, Lahuradewa, Burzahom, Piklihal, and Chirand; note rainfall, altitude, and.', 'For each site, write one sentence: "At [site], people grew [crop] because [ecological reason]." This builds the mosaic.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_9', difficulty: 'standard',
          question: 'Mesopotamian Civilisation (c. 3500–500 BCE) emerged in the fertile river.',
          hint: 'Revisit the Harappan town planning node (c6_history_ch04_003) and the "Second.',
          misconception: 'Students believe Mesopotamian writing *evolved gradually from pictures to letters* like an alphabet, and that Harappan.',
          parts: [
                { id: 'a', prompt: 'Name the script invented in Mesopotamia, the material it was written on, and the approximate period when it first appeared.', answer: 'Cuneiform script, written on clay tablets, first appearing c',
                  options: ['Cuneiform script, written on clay tablets, first appearing c', 'hieroglyphics on papyrus', 'Brahmi script on stone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Mesopotamian writing *evolved gradually from pictures to letters* like an alphabet, and that Harappan script is.' }
          ],
            remediations: { 'mesopotamian-writing-evolved-gradually-from': { steps: ['Show side-by-side images of a Uruk IV pictographic tablet and a Harappan seal—ask students to identify *three visual.', 'Use the "token-to-tablet" sequence (Schmandt-Besserat) to demonstrate cuneiform\'s *administrative* origin, not.', 'Map the *absence* of Harappan bilingual texts vs. Mesopotamian multilingual corpora (Sumerian/Akkadian) to explain.', 'Assign a 100-word comparison: "Why cuneiform\'s logo-syllabic nature suited Mesopotamian bureaucracy better than an.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
