import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch01_p2: SimDef = {
    id: 'v3_c12_hist_ch01_p2',
    title: 'Bricks, Beads and Bones (The Harappan Civilisation) · Part 2/2',
    subtitle: 'He held the seals — and still missed the civilisation',
    classLevel: 12, subject: 'history', topic: 'Bricks, Beads and Bones (The Harappan Civilisation) · Part 2/2',
    chapters: ['c12_hist_ch01'],
    nodeIds: ['c12_hist_cbse_01_007', 'c12_hist_cbse_01_008', 'c12_hist_cbse_01_009', 'c12_hist_cbse_01_010', 'c12_hist_cbse_01_011', 'c12_hist_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Archaeology-historiography analyst', intro: 'A civilisation was found, lost, found again — each discovery owed as much to the digging method as to the dig.', goal: 'Trace the discovery of the Harappan civilisation through Cunningham, Marshall and Wheeler\'s competing methods.' },
    discovery: {
        question: 'Cunningham found Harappan seals in the 1870s — and misdated them by millennia. Marshall announced a new civilisation in 1924. What did the first man get wrong?',
        options: ['He forced the finds into his own frame — hunting Buddhist-pilgrim-era sites, he couldn\'t imagine a civilisation 2,000 years older than his timeline', 'He was careless', 'The seals were fakes', 'No tools existed'],
        answer: 'He forced the finds into his own frame — hunting Buddhist-pilgrim-era sites, he couldn\'t imagine a civilisation 2,000 years older than his timeline',
        hook: 'Method writes history: Marshall\'s horizontal digging mixed centuries into single layers; Wheeler\'s stratigraphic boxes restored the timeline. And Partition \'losing\' Harappa spurred India to find Kalibangan, Lothal, Dholavira, Rakhigarhi — the setback built the discipline.',
    },
    teaching: [
        { title: 'Granaries and Warehouses: Evidence of Surplus Production', text: 'Granaries and warehouses in the Harappan Civilisation were large, purpose-built public structures — primarily located on the Citadel at sites like Mohenjodaro and Harappa — designed to store surplus.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Dig like an archaeologist: trace Cunningham to Marshall to Wheeler, weigh what horizontal excavation destroys, and judge whether Partition was a loss or a catalyst.',
        labels: ['Granaries and Warehouses: Evidence', 'Harappan Crafts: Bead-Making, Shell', 'Seals and Sealings: Script,', 'Agriculture and Animal Domestication', 'Burial Practices: Cemetery R37,', 'Decline of the Harappan'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_01_007', title: 'Granaries and Warehouses: Evidence of Surplus Production',
          caseStudy: { intro: 'Imagine you are standing at a modern Food Corporation of India (FCI) godown in Punjab — towering silos, loading bays, weighbridges, security.',
            decisions: [{ prompt: 'Identify the specific Harappan site where the "warehouse" — a massive structure with surviving lower brick portions and decayed wooden.', options: [
                { text: 'The warehouse was excavated at **Mohenjodaro** on the Citadel', outcome: 'The warehouse was excavated at **Mohenjodaro** on the Citadel; Ernest Mackay described it.' },
                { text: 'Harappa', outcome: 'Not quite — Students **equate "granary" with "state taxation"** and assume a **king/bureaucracy collected grain.', reveals: 'students-equate-granary-with-state' },
                { text: 'Great Bath', outcome: 'Not quite — Students **equate "granary" with "state taxation"** and assume a **king/bureaucracy collected grain.', reveals: 'students-equate-granary-with-state' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_01_008', title: 'Harappan Crafts: Bead-Making, Shell Working and Specialised Quarters',
          caseStudy: { intro: 'Imagine you find a tiny red carnelian bead at a museum — perfectly drilled, etched with a design, dated 2500 BCE.',
            decisions: [{ prompt: 'Name two Harappan settlements that were specialized centres for shell working and state their geographical location.', options: [
                { text: 'Nageshwar and Balakot, both located near the coast in Gujarat (Nageshwar) and Pakistan', outcome: 'Nageshwar and Balakot, both located near the coast in Gujarat (Nageshwar) and Pakistan (Balakot).' },
                { text: 'specialized centres', outcome: 'Not quite — Students think “specialized centres” like Chanhudaro produced ONLY crafts and had no agriculture.', reveals: 'specialized-centres-like-chanhudaro-produced' },
                { text: 'Mohenjodaro or Harappa', outcome: 'Not quite — Students think “specialized centres” like Chanhudaro produced ONLY crafts and had no agriculture.', reveals: 'specialized-centres-like-chanhudaro-produced' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_01_009', title: 'Seals and Sealings: Script, Motifs and Trade Administration',
          caseStudy: { intro: 'Imagine you are a merchant in Dholavira sending a consignment of carnelian beads to a partner in Ur (Mesopotamia) around 2300 BCE.',
            decisions: [{ prompt: 'What is the primary material used for making Harappan seals, and what is the approximate range of distinct signs in the Harappan script?', options: [
                { text: 'Harappan seals were primarily made of steatite (a soft soapstone), and the script', outcome: 'Harappan seals were primarily made of steatite (a soft soapstone), and the script comprises 375–400.' },
                { text: 'terracotta', outcome: 'Not quite — Students often think the "unicorn" motif on Harappan seals is a mythical creature like the later.', reveals: 'the-unicorn-motif-on-harappan' },
                { text: 'alphabetical script of 26 letters', outcome: 'Not quite — Students often think the "unicorn" motif on Harappan seals is a mythical creature like the later.', reveals: 'the-unicorn-motif-on-harappan' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_01_010', title: 'Agriculture and Animal Domestication in the Harappan Economy',
          caseStudy: { intro: 'Imagine you are at the National Museum in Delhi looking at a display of charred wheat grains and a terracotta plough model from Banawali.',
            decisions: [{ prompt: 'Name the five major crops archaeo-botanists have identified from charred grains at Mature Harappan sites, and specify which crop.', options: [
                { text: 'The five major crops are wheat, barley, lentil, chickpea, and sesame', outcome: 'The five major crops are wheat, barley, lentil, chickpea, and sesame.' },
                { text: 'Indus Valley', outcome: 'Not quite — Students often believe Harappan agriculture was "primitive" because they used stone blades and.', reveals: 'harappan-agriculture-was-primitive-because' },
                { text: 'primitive', outcome: 'Not quite — Students often believe Harappan agriculture was "primitive" because they used stone blades and.', reveals: 'harappan-agriculture-was-primitive-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_01_011', title: 'Burial Practices: Cemetery R37, Extended Inhumation and Grave Goods',
          caseStudy: { intro: 'Imagine you\'re an archaeologist standing at Cemetery R37 in Harappa — 50+ graves laid out before you, each body stretched straight on its back, head usually.',
            decisions: [{ prompt: 'What is the specific name and location of the Harappan cemetery where the largest number of Mature Harappan burials have been excavated.', options: [
                { text: 'Cemetery R37 at Harappa (Punjab, Pakistan); predominant posture is extended inhumation', outcome: 'Cemetery R37 at Harappa (Punjab, Pakistan); predominant posture is extended inhumation — body laid.' },
                { text: 'Mohenjodaro', outcome: 'Not quite — Students often confuse Mature Harappan burials (Cemetery R37: extended inhumation, modest goods).', reveals: 'students-often-confuse-mature-harappan' },
                { text: 'fractional burial', outcome: 'Not quite — Students often confuse Mature Harappan burials (Cemetery R37: extended inhumation, modest goods).', reveals: 'students-often-confuse-mature-harappan' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_01_012', title: 'Decline of the Harappan Civilisation: Climate, Rivers and De-urbanisation',
          caseStudy: { intro: 'Imagine you are standing at the ruins of Dholavira in Gujarat — once a bustling city with massive reservoirs, now silent under the desert sun.',
            decisions: [{ prompt: 'What is the approximate time range of the Late Harappan phase, and which two major changes in material culture define its beginning?', options: [
                { text: 'The Late Harappan phase spans c', outcome: 'The Late Harappan phase spans c. 1900–1300 BCE. It is defined by the disappearance of distinctive.' },
                { text: 'end of cities', outcome: 'Not quite — Students believe the Harappan Civilisation "ended" abruptly around 1500 BCE due to an Aryan.', reveals: 'the-harappan-civilisation-ended-abruptly' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A teammate\'s exhibition model labels the Harappans \'the Sarasvati civilisation — the Indus barely mattered\', citing that two-thirds of the settlements sat on the Ghaggar-Hakra.',
            decisions: [{ prompt: 'What does the site map actually justify claiming?', options: [
                { text: 'Highest density, not exclusivity — the Sarasvati basin hosted the thickest settlement belt, but Mohenjodaro stood on the Indus, Dholavira and Lothal worked the Gujarat coast, and Shortughai sat by the Oxus lapis mines; the civilisation was multi-riverine and maritime.', outcome: 'The chapter\'s caution is exactly this: two-thirds concentration is a distribution fact, not a single-river thesis — trade reach ran from the Indus delta to Afghanistan.' },
                { text: 'Agree — two-thirds is a majority, so \'Sarasvati civilisation\' is accurate shorthand.', outcome: 'That conflates density with identity: the remaining third includes the biggest urban sites and the whole coastal-Central Asian trade network — a name that erases them misdescribes the civilisation\'s economic geography.', reveals: 'density-equals-identity' },
                { text: 'Correct it the other way — call it the Indus civilisation only, since Mohenjodaro is on the Indus.', outcome: 'That repeats the same error on the opposite bank: no single river owns a settlement system that spread across the Indus, Sarasvati, Luni and the coast — \'Indus civilisation\' survives as shorthand, not as geography.', reveals: 'swap-one-river-for-another' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_01_012', title: 'You made it',
          caseStudy: { intro: 'You can now argue that archaeology\'s real artefacts include its methods — and that how you dig decides what the past can say.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_01_007', difficulty: 'standard',
          question: 'Granaries and warehouses in the Harappan Civilisation were large, purpose-built.',
          hint: 'If stuck on "how do we know it\'s a warehouse without labels?", revisit.',
          misconception: 'Students **equate "granary" with "state taxation"** and assume a **king/bureaucracy collected grain as revenue**.',
          parts: [
                { id: 'a', prompt: 'Identify the specific Harappan site where the "warehouse" — a massive structure with surviving lower brick portions and decayed wooden upper parts — was.', answer: 'The warehouse was excavated at **Mohenjodaro** on the Citadel',
                  options: ['The warehouse was excavated at **Mohenjodaro** on the Citadel', 'Harappa', 'Great Bath'],
                  hint: 'If stuck on "how do we know it\'s a warehouse without labels?", revisit **c6_history_ch04_005 (Great.',
                  misconception: 'Students **equate "granary" with "state taxation"** and assume a **king/bureaucracy collected grain as revenue**.' },
                { id: 'b', prompt: 'Explain why archaeologists infer that the upper portions of the Mohenjodaro warehouse were made of wood, even though no wood survives.', answer: 'The inference rests on **negative evidence**: only the lower brick courses',
                  options: ['The inference rests on **negative evidence**: only the lower brick courses', 'wood was found'],
                  hint: 'If stuck on "how do we know it\'s a warehouse without labels?", revisit **c6_history_ch04_005 (Great.',
                  misconception: 'Students **equate "granary" with "state taxation"** and assume a **king/bureaucracy collected grain as revenue**.' },
                { id: 'c', prompt: 'At Harappa, archaeologists found a series of **brick platforms** with air ducts beneath them, initially labelled "granaries." At Mohenjodaro, a **single large.', answer: 'The Harappa platforms (c',
                  options: ['The Harappa platforms (c', 'both stored grain'],
                  hint: 'If stuck on "how do we know it\'s a warehouse without labels?", revisit **c6_history_ch04_005 (Great.',
                  misconception: 'Students **equate "granary" with "state taxation"** and assume a **king/bureaucracy collected grain as revenue**.' },
                { id: 'd', prompt: 'The NCERT text states: "It has been calculated that if one labourer moved roughly a cubic metre of earth daily, just to put the foundations in place it would.', answer: '4,000,000 person-days ÷ 120 days = **~33,333 workers** simultaneously',
                  options: ['4,000,000 person-days ÷ 120 days = **~33,333 workers** simultaneously', '33,000 people lived there'],
                  hint: 'If stuck on "how do we know it\'s a warehouse without labels?", revisit **c6_history_ch04_005 (Great.',
                  misconception: 'Students **equate "granary" with "state taxation"** and assume a **king/bureaucracy collected grain as revenue**.' }
          ],
            remediations: { 'students-equate-granary-with-state': { steps: ['If the student holds the "king-taxation" misconception: **Step 1** — Re-read NCERT pp.', '16–17 ("Ancient Authority") and Source 3 (Wheeler vs.', 'Dales on "invasion") to see how *interpretations change with evidence*.', '**Step 2** — Compare with **c12_hist_cbse_01_010 (Agriculture)**: note charred grains are found in *domestic* contexts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students **equate "granary" with "state taxation"** and assume a **king/bureaucracy collected grain as revenue**.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "The existence of granaries proves the Harappan Civilisation had a powerful king who collected taxes in grain." Use **three distinct.', answer: 'The statement commits the **"palace = king" fallacy**',
                  options: ['The statement commits the **"palace = king" fallacy**', 'we haven\'t found the palace yet'],
                  hint: 'If stuck on "how do we know it\'s a warehouse without labels?", revisit **c6_history_ch04_005 (Great.',
                  misconception: 'Students **equate "granary" with "state taxation"** and assume a **king/bureaucracy collected grain as revenue**.' }
          ],
            remediations: { 'students-equate-granary-with-state': { steps: ['If the student holds the "king-taxation" misconception: **Step 1** — Re-read NCERT pp.', '16–17 ("Ancient Authority") and Source 3 (Wheeler vs.', 'Dales on "invasion") to see how *interpretations change with evidence*.', '**Step 2** — Compare with **c12_hist_cbse_01_010 (Agriculture)**: note charred grains are found in *domestic* contexts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_01_008', difficulty: 'standard',
          question: 'Harappan craft production refers to the specialized, organized manufacturing.',
          hint: 'Revisit Class 9 node c9_hist_ch2_8 “Harappan Civilisation: Trade, Crafts and Decline” and.',
          misconception: 'Students think “specialized centres” like Chanhudaro produced ONLY crafts and had no agriculture or domestic life.',
          parts: [
                { id: 'a', prompt: 'Explain why archaeologists consider waste material (e.g., stone chips, shell fragments) a key indicator of craft production rather than finished objects.', answer: 'Waste accumulates at the production site',
                  options: ['Waste accumulates at the production site', 'finished beads are found there', 'specialized centres'],
                  hint: 'Revisit Class 9 node c9_hist_ch2_8 “Harappan Civilisation: Trade, Crafts and Decline” and Class 6.',
                  misconception: 'Students think “specialized centres” like Chanhudaro produced ONLY crafts and had no agriculture or domestic life.' }
          ],
            remediations: { 'specialized-centres-like-chanhudaro-produced': { steps: ['Re-read NCERT Section 5 (pp.', '12) focusing on “Identifying centres of production” and “Materials from the subcontinent and beyond.” 2.', 'Map exercise: On Map 1, mark Chanhudaro, Nageshwar, Balakot, Shortughai, Lothal, Khetri — draw arrows for carnelian.', 'Watch 5-min video “Harappan bead drilling experiment” (YouTube: Harappa.com).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_01_009', difficulty: 'standard',
          question: 'Harappan seals (c. 2600–1900 BCE) are small, square/rectangular artefacts made.',
          hint: 'Revisit c6_history_ch04_004 (Harappan trade basics) and c11_hist_cbse_01_009.',
          misconception: 'Students often think the "unicorn" motif on Harappan seals is a mythical creature like the later Indian *ekashringa*.',
          parts: [
                { id: 'a', prompt: 'A sealing from Ropar shows impressions of three different seals on a single lump of clay. What does this indicate about Harappan trade administration?', answer: 'It indicates that multiple parties (e.g., sender, receiver, customs official)',
                  options: ['It indicates that multiple parties (e.g., sender, receiver, customs official)', 'the seal was pressed three times by mistake', 'unicorn'],
                  hint: 'Revisit c6_history_ch04_004 (Harappan trade basics) and c11_hist_cbse_01_009 (Mesopotamian trade.',
                  misconception: 'Students often think the "unicorn" motif on Harappan seals is a mythical creature like the later Indian *ekashringa* or a religious symbol.' }
          ],
            remediations: { 'the-unicorn-motif-on-harappan': { steps: ['Re-read NCERT §7.1–7.3 (pp.', '15–16) focusing on the sealing description and weight denominations.', 'Watch the 5-min video "Harappan Seals: Trade & Administration" (harappa.com) to see sealings on reconstructed bags.', 'Compare the bull on the seal (Fig.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_01_010', difficulty: 'standard',
          question: 'Agriculture and animal domestication in the Harappan economy refers to the.',
          hint: 'If stuck on crop/animal lists, revisit **c9_hist_ch2_6** (Mehrgarh) for the *origin*.',
          misconception: 'Students often believe Harappan agriculture was "primitive" because they used stone blades and wooden ploughs, and that.',
          parts: [
                { id: 'a', prompt: 'Name the five major crops archaeo-botanists have identified from charred grains at Mature Harappan sites, and specify which crop is geographically restricted.', answer: 'The five major crops are wheat, barley, lentil, chickpea, and sesame',
                  options: ['The five major crops are wheat, barley, lentil, chickpea, and sesame', 'Indus Valley', 'primitive', 'rice as a major crop or missing millets'],
                  hint: 'If stuck on crop/animal lists, revisit **c9_hist_ch2_6** (Mehrgarh) for the *origin* of each.',
                  misconception: 'Students often believe Harappan agriculture was "primitive" because they used stone blades and wooden ploughs, and that rice was a major.' },
                { id: 'b', prompt: 'A student claims: "Harappans depended entirely on canal irrigation like Mesopotamia." Using evidence from Shortughai, Dholavira, and Mohenjodaro, evaluate this.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'canal irrigation', 'primitive'],
                  hint: 'If stuck on crop/animal lists, revisit **c9_hist_ch2_6** (Mehrgarh) for the *origin* of each.',
                  misconception: 'Students often believe Harappan agriculture was "primitive" because they used stone blades and wooden ploughs, and that rice was a major.' },
                { id: 'c', prompt: 'Compare the Harappan saddle quern (Fig. 1.6) and the "curry stone" described by Mackay.', answer: 'The saddle quern (rolling stone on convex base) was for bulk grain grinding',
                  options: ['The saddle quern (rolling stone on convex base) was for bulk grain grinding', 'grinding stones', 'primitive'],
                  hint: 'If stuck on crop/animal lists, revisit **c9_hist_ch2_6** (Mehrgarh) for the *origin* of each.',
                  misconception: 'Students often believe Harappan agriculture was "primitive" because they used stone blades and wooden ploughs, and that rice was a major.' }
          ],
            remediations: { 'harappan-agriculture-was-primitive-because': { steps: ['Revisit **c9_hist_ch2_6** (Mehrgarh: Early Agricultural Settlement) to see the *pre-Harappan* domestication sequence.', '2–4 on archaeo-botany/zoology methods — practice identifying charred grain vs.', 'modern grain in a lab photo.', 'Draw a table: Site | Crop Evidence | Animal Evidence | Irrigation Feature.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_01_011', difficulty: 'standard',
          question: 'Harappan burial practices refer to the mortuary customs of the Mature Harappan.',
          hint: 'If confused about burial types, revisit NCERT Figure 1.30 and the Cemetery H mention.',
          misconception: 'Students often confuse Mature Harappan burials (Cemetery R37: extended inhumation, modest goods) with Late Harappan.',
          parts: [
                { id: 'a', prompt: 'At Cemetery R37, an ornament consisting of three shell rings, a jasper bead, and hundreds of micro beads was found near the skull of a male skeleton.', answer: 'The micro beads (steatite) require highly specialized drilling technology',
                  options: ['The micro beads (steatite) require highly specialized drilling technology', 'beauty', 'status', 'they represent the same practice'],
                  hint: 'If confused about burial types, revisit NCERT Figure 1.30 and the Cemetery H mention on p.',
                  misconception: 'Students often confuse Mature Harappan burials (Cemetery R37: extended inhumation, modest goods) with Late Harappan Cemetery H (fractional.' }
          ],
            remediations: { 'students-often-confuse-mature-harappan': { steps: ['Re-read NCERT Section 4.1 (pp. 9–10) and Figure 1.30 caption — note every grave good type and the "we are not sure".', 'Review c12_hist_cbse_01_008 (craft production) to map each grave good material to its production centre (shell → coast.', 'Contrast with Late Harappan Cemetery H (NCERT p. 17, Map 4) — note fractional burial, different pottery.', 'Attempt Diagnostic Question 4 again — this time *quantify* the comparison mentally: if 10 brick-lined and 40 simple.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_01_012', difficulty: 'standard',
          question: 'The decline of the Harappan Civilisation (c. 1900–1300 BCE) refers to the.',
          hint: 'If stuck, revisit the "Great Bath and Citadel" (c12_hist_cbse_01_005) and "Granaries".',
          misconception: 'Students believe the Harappan Civilisation "ended" abruptly around 1500 BCE due to an Aryan invasion that destroyed.',
          parts: [
                { id: 'a', prompt: 'What is the approximate time range of the Late Harappan phase, and which two major changes in material culture define its beginning?', answer: 'The Late Harappan phase spans c',
                  options: ['The Late Harappan phase spans c', 'end of cities'],
                  hint: 'If stuck, revisit the "Great Bath and Citadel" (c12_hist_cbse_01_005) and "Granaries".',
                  misconception: 'Students believe the Harappan Civilisation "ended" abruptly around 1500 BCE due to an Aryan invasion that destroyed cities and killed the.' }
          ],
            remediations: { 'the-harappan-civilisation-ended-abruptly': { steps: ['If the student holds the invasion misconception: Step 1 — Re-read Dales\' 1964 critique (Source 3 in NCERT) and identify.', 'Step 2 — Study the Rakhigarhi archaeogenetics summary in the textbook (page 18) and explain why "steppe pastoralist.', 'Step 3 — Complete a timeline exercise: place Mature Harappan end (1900 BCE), Late Harappan phases, and earliest Vedic.', '1500 BCE) on a line — notice the 400-year gap.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
