import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch07_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch07_p2: SimDef = {
    id: 'v3_c11_geo_ch07_p2',
    title: 'Landforms and their Evolution · Part 2/2',
    subtitle: 'Watch a river carve V-valleys and slowly erase its own waterfalls.',
    classLevel: 11, subject: 'geography', topic: 'Landforms and their Evolution · Part 2/2',
    chapters: ['c11_geo_ch07'],
    nodeIds: ['c11_geo_cbse_07_007', 'c11_geo_cbse_07_008', 'c11_geo_cbse_07_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a fluvial geomorphologist reading a monsoon river', intro: 'The Yamuna runs brown with sediment — that colour is the river filing its own valley down.', goal: 'Identify the four fluvial erosion mechanisms and explain V-valley and waterfall evolution.' },
    discovery: {
        question: 'Jog Falls thunders off a hard basalt lip — so a waterfall must be a permanent fixture where the rock is tough?',
        options: ['No — the plunge pool undercuts the lip, the cap rock collapses, and the falls migrate upstream until the river\'s profile smooths out', 'Yes — hard rock anchors a waterfall forever', 'Yes — only earthquakes can move one', 'No — waterfalls evaporate before they can migrate'],
        answer: 'No — the plunge pool undercuts the lip, the cap rock collapses, and the falls migrate upstream until the river\'s profile smooths out',
        hook: 'A waterfall is a nick point being erased in slow motion — every falls you photograph is a scar mid-healing.',
    },
    teaching: [
        { title: 'Coastal Landforms: Sea Cliffs, Caves, Stacks, Beaches, Bars', text: 'Coastal landforms are morphological features shaped by the dynamic interaction of marine processes (waves, tides, currents) with the lithology and structure of the coastline; erosional landforms (sea.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read V-shaped contours on a topo map to find valley depth and flow direction, then separate corrasion, corrosion and attrition.',
        labels: ['Coastal Landforms: Sea Cliffs,', 'Aeolian Landforms: Sand Dunes,', 'Landform Evolution: Davis\'s Cycle'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_07_007', title: 'Coastal Landforms: Sea Cliffs, Caves, Stacks, Beaches, Bars',
          caseStudy: { intro: 'Stand on Marina Beach in Chennai at dawn and watch waves approach at an oblique angle, pushing sand southward along the shore — this visible longshore drift.',
            decisions: [{ prompt: 'Define a sea cliff and state the two primary wave erosion processes responsible for its vertical profile.', options: [
                { text: 'A sea cliff is a steep, near-vertical rock face formed where wave erosion undercuts the', outcome: 'A sea cliff is a steep, near-vertical rock face formed where wave erosion undercuts the base of.' },
                { text: 'waves crash and break rocks', outcome: 'Not quite — Students believe **beaches are permanent, static features** — "the sand is just there." In reality.', reveals: 'beaches-are-permanent' },
                { text: 'the sand is just there', outcome: 'Not quite — Students believe **beaches are permanent, static features** — "the sand is just there." In reality.', reveals: 'beaches-are-permanent' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_07_008', title: 'Aeolian Landforms: Sand Dunes, Loess Plains, Mushroom Rocks',
          caseStudy: { intro: 'Imagine standing on a sand dune near Sam, Jaisalmer at sunrise: you feel sand grains stinging your ankles (saltation) and see ripples aligned perpendicular.',
            decisions: [{ prompt: 'Define "barchan dune" and state the three necessary conditions for its formation.', options: [
                { text: 'A barchan dune is a crescent-shaped sand dune with horns pointing downwind, formed by', outcome: 'A barchan dune is a crescent-shaped sand dune with horns pointing downwind, formed.' },
                { text: 'formed by bidirectional wind', outcome: 'Not quite — Students often think all sand dunes are purely depositional features, ignoring that dune shape.', reveals: 'all-sand-dunes-are-purely' },
                { text: 'requires abundant sand', outcome: 'Not quite — Students often think all sand dunes are purely depositional features, ignoring that dune shape.', reveals: 'all-sand-dunes-are-purely' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_07_009', title: 'Landform Evolution: Davis\'s Cycle of Erosion',
          caseStudy: { intro: 'Stand on the banks of the Chambal River near Kota and observe its deep, narrow gorge with near-vertical walls—that is a Youth stage valley.',
            decisions: [{ prompt: 'Define "base level" in Davis\'s cycle and distinguish between ultimate base level and local base level with one Indian example each.', options: [
                { text: 'Base level is the lowest level to', outcome: 'Base level is the lowest level to which a river can erode its channel.' },
                { text: 'river bed', outcome: 'Not quite — Students believe Davis\'s cycle is a rigid, universal timeline where every river must pass through.', reveals: 'davis-s-cycle-is-a' },
                { text: 'water level', outcome: 'Not quite — Students believe Davis\'s cycle is a rigid, universal timeline where every river must pass through.', reveals: 'davis-s-cycle-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_07_007', title: 'A real-world call',
          caseStudy: { intro: 'Natural hazards — floods, earthquakes — become disasters mainly where poverty forced people into dangerous places. The hazard is natural; the vulnerability is built.',
            decisions: [{ prompt: 'Is a \'natural\' disaster ever really natural?', options: [
                { text: 'The hazard is natural — the disaster is political', outcome: 'The framing disaster-research actually uses — nature provides the event; human choices provide the casualties.' },
                { text: 'Both are natural — people have always lived in risky places', outcome: 'Historically true; but \'always lived there\' often meant \'had nowhere else to go\'.' },
                { text: 'Doesn\'t matter — prepare either way', outcome: 'The pragmatist answer; but preparation designed for the wrong cause protects the wrong things.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a monsoon trek near a Deccan waterfall, a friend announces: \'This falls exists because a fault dropped the land here, and it\'ll be at this exact spot forever.\' Later she writes in her field diary: \'Attrition is how the river erodes its bed; corrasion and corrosion are the same thing.\'',
            decisions: [{ prompt: 'Which parts of her river science need fixing?', options: [
                { text: 'Fix all three: most peninsular waterfalls (Jog, Dudhsagar) form by differential erosion — a hard basalt cap over softer rock — and they retreat upstream cm per year, not stay fixed. Corrasion is mechanical grinding by the sediment load; corrosion is chemical solution of soluble rock — different processes. Attrition rounds the river\'s own pebbles; it doesn\'t erode bedrock directly.', outcome: 'Her diary now separates the four erosion mechanisms properly — hydraulic action, abrasion/corrasion, attrition, solution — and the waterfall becomes a moving feature, not a monument.' },
                { text: 'Let the fault story stand — a vertical drop needs a cliff, and cliffs need faulting.', outcome: 'Most Indian falls come from differential erosion of layered rock, not fault scarps — and the retreat upstream proves the drop is being actively excavated.', reveals: 'waterfalls-need-faults' },
                { text: 'Correct only the waterfall — corrasion and corrosion are close enough to treat as one process.', outcome: 'The names differ by a letter but the mechanisms differ in kind: grinding with sediment tools vs dissolving minerals chemically — boards test exactly this distinction.', reveals: 'corrasion-corrosion-synonyms' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_07_009', title: 'You made it',
          caseStudy: { intro: 'Rivers erode four ways at once — water that plucks, sediment that grinds, pebbles that round each other, and chemistry that quietly dissolves.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_07_007', difficulty: 'standard',
          question: 'Coastal landforms are morphological features shaped by the dynamic interaction.',
          hint: 'Revisit Class 9 Chapter 1 "Erosion and Deposition by Sea Waves and Wind" (c9_geo_ch1_9).',
          misconception: 'Students believe **beaches are permanent, static features** — "the sand is just there." In reality, every beach is.',
          parts: [
                { id: 'a', prompt: 'On an outline map of India, a student marks a series of linear sand ridges parallel to the coast, separated by lagoons, along the Kerala coast.', answer: 'The landform is a **barrier beach / bar** (specifically the *kayals* of Kerala)',
                  options: ['The landform is a **barrier beach / bar** (specifically the *kayals* of Kerala)', 'the sand is just there', '**beaches are permanent, static features**'],
                  hint: 'Revisit Class 9 Chapter 1 "Erosion and Deposition by Sea Waves and Wind" (c9_geo_ch1_9) — focus.',
                  misconception: 'Students believe **beaches are permanent, static features** — "the sand is just there." In reality, every beach is a **dynamic sediment.' }
          ],
            remediations: { 'beaches-are-permanent': { steps: ['**Visualise the sediment pathway:** Draw a cross-section of a beach at Chandipur showing low-tide terrace, berm, dune.', '**Map the longshore drift cell:** On an outline map of Odisha coast, mark river mouths (Mahanadi, Devi), direction.', '**Watch a time-lapse video** of beach profile change over a tidal cycle (YouTube: "Chandipur beach tide time lapse").', '**Re-read NCERT Class 11 Fig.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_07_008', difficulty: 'standard',
          question: 'Aeolian landforms are erosional and depositional features shaped by wind action.',
          hint: 'Review Class 9 \'Erosion and Deposition by Sea Waves and Wind: Landforms\' (c9_geo_ch1_9).',
          misconception: 'Students often think all sand dunes are purely depositional features, ignoring that dune shape is sculpted.',
          parts: [
                { id: 'a', prompt: 'Explain why mushroom rocks (pedestal rocks) develop a narrow base and broad top, and why abrasion is most effective within 1–2 metres of the ground.', answer: 'Mushroom rocks form',
                  options: ['Mushroom rocks form', 'wind erodes the top more', 'chemical weathering causes the shape', 'fine sand'],
                  hint: 'Review Class 9 \'Erosion and Deposition by Sea Waves and Wind: Landforms\' (c9_geo_ch1_9) and Class 7.',
                  misconception: 'Students often think all sand dunes are purely depositional features, ignoring that dune shape is sculpted by simultaneous erosion on the.' }
          ],
            remediations: { 'all-sand-dunes-are-purely': { steps: ['Draw a cross-section of a barchan dune showing wind flow lines — accelerate over windward slope, separate at brink.', 'Compare grain size charts: sand (0.06–2 mm) vs. silt (0.002–0.06 mm). Feel the difference: sand gritty, silt floury.', 'Sketch a mushroom rock with two rock layers (hard cap, soft base).', 'Use Google Earth to view barchan fields in the Thar (e.g., near Sam, 26.6°N 70.6°E) and trace dune migration over.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_07_009', difficulty: 'standard',
          question: 'Davis\'s Cycle of Erosion (Geographical Cycle) is a theoretical model explaining.',
          hint: 'If stuck, revisit c11_geo_cbse_07_001 (erosion mechanisms) and c11_geo_cbse_07_002/003.',
          misconception: 'Students believe Davis\'s cycle is a rigid, universal timeline where every river must pass through Youth → Maturity →.',
          parts: [
                { id: 'a', prompt: 'Define "base level" in Davis\'s cycle and distinguish between ultimate base level and local base level with one Indian example each.', answer: 'Base level is the lowest level to',
                  options: ['Base level is the lowest level to', 'river bed', 'water level', 'peneplain'],
                  hint: 'If stuck, revisit c11_geo_cbse_07_001 (erosion mechanisms) and c11_geo_cbse_07_002/003 (Youth vs.',
                  misconception: 'Students believe Davis\'s cycle is a rigid, universal timeline where every river must pass through Youth → Maturity → Old Age in that order.' },
                { id: 'b', prompt: 'Explain why a river in the Youth stage has a V-shaped valley with waterfalls and rapids, while a river in the Old Age stage develops a wide floodplain with.', answer: 'In Youth, vertical erosion (downcutting) dominates',
                  options: ['In Youth, vertical erosion (downcutting) dominates', 'fast water', 'peneplain'],
                  hint: 'If stuck, revisit c11_geo_cbse_07_001 (erosion mechanisms) and c11_geo_cbse_07_002/003 (Youth vs.',
                  misconception: 'Students believe Davis\'s cycle is a rigid, universal timeline where every river must pass through Youth → Maturity → Old Age in that order.' },
                { id: 'c', prompt: 'A topographic map shows a river with the following features: (a) valley cross-profile is asymmetric with steep slopes, (b) drainage density is very high, (c).', answer: 'Youth stage',
                  options: ['Youth stage', 'peneplain'],
                  hint: 'If stuck, revisit c11_geo_cbse_07_001 (erosion mechanisms) and c11_geo_cbse_07_002/003 (Youth vs.',
                  misconception: 'Students believe Davis\'s cycle is a rigid, universal timeline where every river must pass through Youth → Maturity → Old Age in that order.' },
                { id: 'd', prompt: 'Compare the Narmada River (flowing through a rift valley with entrenched meanders at Bhedaghat) and the Damodar River (flowing through the Chotanagpur plateau.', answer: 'The Narmada shows stronger rejuvenation evidence',
                  options: ['The Narmada shows stronger rejuvenation evidence', 'peneplain'],
                  hint: 'If stuck, revisit c11_geo_cbse_07_001 (erosion mechanisms) and c11_geo_cbse_07_002/003 (Youth vs.',
                  misconception: 'Students believe Davis\'s cycle is a rigid, universal timeline where every river must pass through Youth → Maturity → Old Age in that order.' }
          ],
            remediations: { 'davis-s-cycle-is-a': { steps: ['Take a printed topographic map (1:50,000) of a local river (e.g., Yamuna near Delhi, or a tributary).', 'Trace the long profile by contour crossing—plot elevation every 1 cm on graph paper.', 'Identify knickpoints (sudden steepening) and measure gradient in three reaches (upper, middle, lower).', 'At each reach, measure valley width (between contour lines at same elevation on either side) and channel width (from.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_07_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Davis\'s cycle is a rigid, universal timeline where every river must pass through Youth → Maturity →.',
          parts: [
                { id: 'a', prompt: 'Design a field investigation plan for a Class 11 geography project to determine the Davisian stage of a local stream near your school.', answer: 'three measurable field parameters, (',
                  options: ['three measurable field parameters, (', 'peneplain'],
                  hint: 'If stuck, revisit c11_geo_cbse_07_001 (erosion mechanisms) and c11_geo_cbse_07_002/003 (Youth vs.',
                  misconception: 'Students believe Davis\'s cycle is a rigid, universal timeline where every river must pass through Youth → Maturity → Old Age in that order.' }
          ],
            remediations: { 'davis-s-cycle-is-a': { steps: ['Take a printed topographic map (1:50,000) of a local river (e.g., Yamuna near Delhi, or a tributary).', 'Trace the long profile by contour crossing—plot elevation every 1 cm on graph paper.', 'Identify knickpoints (sudden steepening) and measure gradient in three reaches (upper, middle, lower).', 'At each reach, measure valley width (between contour lines at same elevation on either side) and channel width (from.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
