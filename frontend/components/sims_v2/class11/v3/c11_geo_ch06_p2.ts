import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch06_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch06_p2: SimDef = {
    id: 'v3_c11_geo_ch06_p2',
    title: 'Geomorphic Processes · Part 2/2',
    subtitle: 'Classify Earth\'s reshaping forces by their energy source, not their mood.',
    classLevel: 11, subject: 'geography', topic: 'Geomorphic Processes · Part 2/2',
    chapters: ['c11_geo_ch06'],
    nodeIds: ['c11_geo_cbse_06_007', 'c11_geo_cbse_06_008', 'c11_geo_cbse_06_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a geomorphologist balancing two rival budgets', intro: 'The Aravallis slumped low and ancient beside the still-rising Himalaya — two energy budgets made that portrait.', goal: 'Distinguish endogenic from exogenic processes and epeirogenic from orogenic crustal movements.' },
    discovery: {
        question: 'Volcanoes flatten landscapes; rivers build deltas. So is \'endogenic = constructive, exogenic = destructive\' a reliable rule?',
        options: ['No — the split is by energy source: Earth\'s internal heat versus the Sun; each can build or destroy', 'Yes — internal forces always build, surface forces always wear down', 'Yes — exceptions are too rare to matter', 'No — because both are actually powered by gravity'],
        answer: 'No — the split is by energy source: Earth\'s internal heat versus the Sun; each can build or destroy',
        hook: 'The Himalaya rises ~5 mm a year endogenically while rivers shave 1-2 mm off it exogenically — same mountains, opposite engines.',
    },
    teaching: [
        { title: 'Biological Weathering: Role of Plants, Animals and Humans', text: 'Biological weathering is the disintegration and decomposition of rocks and minerals caused by the activities of living organisms, including plants (root penetration, organic acids), animals.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_06_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Net out uplift versus denudation over a thousand Himalayan years, then assign epeirogenic and orogenic signatures to India\'s three great regions.',
        labels: ['Biological Weathering: Role', 'Mass Movement: Landslides, Earthflow,', 'Erosion and Deposition: Agents'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_06_007', title: 'Biological Weathering: Role of Plants, Animals and Humans',
          caseStudy: { intro: 'Start by observing a cracked pavement or a wall where a plant is growing out of a crack – a common sight in Indian cities.',
            decisions: [{ prompt: 'What is the primary mechanism by which plant roots contribute to the physical disintegration of rocks?', options: [
                { text: 'Plant roots grow into cracks and joints in rocks, exerting pressure as they thicken (root', outcome: 'Plant roots grow into cracks and joints in rocks, exerting pressure as they thicken (root wedging).' },
                { text: 'roots secrete acids that dissolve the rock', outcome: 'Not quite — Students often think biological weathering is only about plant roots breaking rocks (physical).', reveals: 'biological-weathering-is-only-about' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_06_008', title: 'Mass Movement: Landslides, Earthflow, Mudflow, Creep',
          caseStudy: { intro: 'Imagine you see a news clip of a highway in Himachal Pradesh blocked by a sudden pile of boulders and mud after heavy rain.',
            decisions: [{ prompt: 'Define "creep" in the context of mass movement and state one visible field indicator of its occurrence.', options: [
                { text: 'Creep is the imperceptibly slow, continuous downslope movement of soil and regolith under', outcome: 'Creep is the imperceptibly slow, continuous downslope movement of soil and regolith under gravity.' },
                { text: 'fast movement of mud', outcome: 'Not quite — Students often treat "landslide" as a synonym for all mass movements, calling any downslope.', reveals: 'students-often-treat-landslide-as' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_06_009', title: 'Erosion and Deposition: Agents (Water, Wind, Ice) and Processes',
          scaffold: { problem: 'The Brahmaputra River at Guwahati has a monsoon discharge of 55,000 m³/s, channel width 8 km, slope 0.00008.',
            steps: [
            { text: 'Identify given values: Q = 55,000 m³/s, W = 8000 m, S = 0.00008, ρ = 1000 kg/m³, g = 9.8 m/s²' },
            { text: 'Apply stream power formula ω = ρgQS / W' },
            { text: 'Compute numerator: 1000 × 9.8 × 55,000 × 0.00008 = 43,120,000' },
            { text: 'Divide by width: 43,120,000 / 8000 = 5,390 W/m²' },
            { text: 'Compare with critical: 5,390 W/m² >> 150 W/m² → massive excess energy' },
            { text: 'Interpret: Brahmaputra\'s enormous discharge compensates for low slope, giving it extreme erosive power — explains its.', faded: true, blankAnswer: 'ω = 5,390 W/m²; far exceeds ω_c for 50 mm gravel (150.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is debating which force \'built\' India\'s landscape. A classmate declares: \'Simple — endogenic forces like volcanoes construct the land, exogenic forces like rivers only destroy it. So all building comes from inside the Earth.\'',
            decisions: [{ prompt: 'Where does this neat rule break down?', options: [
                { text: 'Correct the classification principle: endogenic vs exogenic is about ENERGY SOURCE (interior heat vs solar/gravity), not about building vs destroying. Volcanism is endogenic yet pyroclastic flows flatten landscapes; river and glacier deposition is exogenic yet builds deltas and moraines. The Himalayas (orogenic uplift) rise while the Indo-Gangetic basin subsides — both are diastrophism.', outcome: 'The debate matures: Earth\'s surface is built and worn by both engines — classify by where the energy comes from, not by whether relief rises or falls.' },
                { text: 'Accept the rule — internal = constructive, external = destructive is a tidy way to remember it.', outcome: 'Tidy but wrong: deposition by rivers builds deltas (exogenic construction) and eruptions destroy relief (endogenic destruction) — the rule fails both ways.', reveals: 'endogenic-constructive-exogenic-destructive' },
                { text: 'Argue instead that only mountain-building counts as diastrophism — plains and plateaus aren\'t deformed.', outcome: 'Diastrophism covers both: epeirogenic movement also subsides blocks into basins like the Indo-Gangetic Plain — vertical and horizontal deformation both qualify.', reveals: 'diastrophism-is-only-mountains' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_06_009', title: 'You made it',
          caseStudy: { intro: 'Ask not what a process does but where its fuel comes from — that single question classifies every sculptor of the surface.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_007', difficulty: 'standard',
          question: 'Biological weathering is the disintegration and decomposition of rocks and.',
          hint: 'If stuck, revisit the chemical weathering node (c11_geo_cbse_06_006) to review how acids.',
          misconception: 'Students often think biological weathering is only about plant roots breaking rocks (physical), ignoring the chemical.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Biological weathering is the disintegration and decomposition of rocks and minerals',
                  options: ['Biological weathering is the disintegration and decomposition of rocks and minerals', 'Geomorphic processes are the physical and chemical actions that modify Earth\'s surface,', 'Diastrophism encompasses all endogenic processes that deform the Earth\'s crust through', 'Volcanism is the process by'],
                  hint: 'If stuck, revisit the chemical weathering node (c11_geo_cbse_06_006) to review how acids dissolve.',
                  misconception: 'Students often think biological weathering is only about plant roots breaking rocks (physical), ignoring the chemical role of organic acids.' }
          ],
            remediations: { 'biological-weathering-is-only-about': { steps: ['If the student holds this misconception, conduct a lab demonstration: place limestone chips in two beakers – one with.', 'Observe faster dissolution in the acid beaker.', 'Then show images of lichen-covered rocks with pitted surfaces.', 'Finally, discuss how human activities (like acid mine drainage) mimic natural biological acid production.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_008', difficulty: 'standard',
          question: 'Mass movement is the downslope movement of rock, soil, and debris under the.',
          hint: 'If stuck, revisit c11_geo_cbse_06_004 (weathering overview) and c11_geo_cbse_06_001.',
          misconception: 'Students often treat "landslide" as a synonym for all mass movements, calling any downslope movement of mud.',
          parts: [
                { id: 'a', prompt: 'Explain why earthflows are more common in humid regions with thick clay-rich regolith, whereas landslides dominate in steep, jointed bedrock areas like the.', answer: 'Earthflows require fine-grained, water-saturated material that behaves viscously',
                  options: ['Earthflows require fine-grained, water-saturated material that behaves viscously', 'earthflows happen only in deserts'],
                  hint: 'If stuck, revisit c11_geo_cbse_06_004 (weathering overview) and c11_geo_cbse_06_001 (exogenic.',
                  misconception: 'Students often treat "landslide" as a synonym for all mass movements, calling any downslope movement of mud a landslide.' },
                { id: 'b', prompt: 'Compare the spatial distribution of "Very High Vulnerability" landslide zones in the Himalayas versus the Western Ghats using the controlling factors: geology.', answer: 'Himalayas: young, tectonically active, jointed sedimentary/metamorphic rocks',
                  options: ['Himalayas: young, tectonically active, jointed sedimentary/metamorphic rocks', 'only rainfall matters'],
                  hint: 'If stuck, revisit c11_geo_cbse_06_004 (weathering overview) and c11_geo_cbse_06_001 (exogenic.',
                  misconception: 'Students often treat "landslide" as a synonym for all mass movements, calling any downslope movement of mud a landslide.' }
          ],
            remediations: { 'students-often-treat-landslide-as': { steps: ['Show side-by-side video clips (15 sec each) of a Himalayan rockslide, a Nilgiri earthflow, a Western Ghats mudflow, and.', 'Have students fill a 4-column table: Speed, Water %, Material, Shape.', 'Use a simple shear box analogy: push a block (landslide), squeeze toothpaste (earthflow), pour slurry (mudflow), lean.', 'Re-attempt Diagnostic Q3 with the table as reference.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_009', difficulty: 'standard',
          question: 'Erosion is the detachment, entrainment, and transport of weathered rock.',
          hint: 'Revisit c11_geo_cbse_06_004 (weathering definition) and c9_geo_ch1_8/9 (Class 9.',
          misconception: 'Students believe "erosion only happens during floods/high energy events" and "deposition only happens in calm water.".',
          parts: [
                { id: 'a', prompt: 'A river channel has a width of 30 m, mean depth of 2.5 m, and slope of 0.001.', answer: 'Step 1: Hydraulic radius R = A/P = (30×2.5)/(30+2×2.5) = 75/35 = 2.14 m',
                  options: ['Step 1: Hydraulic radius R = A/P = (30×2.5)/(30+2×2.5) = 75/35 = 2.14 m', 'erosion only happens during floods/high energy events', 'deposition only happens in calm water'],
                  hint: 'Revisit c11_geo_cbse_06_004 (weathering definition) and c9_geo_ch1_8/9 (Class 9 river/wind.',
                  misconception: 'Students believe "erosion only happens during floods/high energy events" and "deposition only happens in calm water." In reality, erosion.' }
          ],
            remediations: { 'erosion-only-happens-during-floods': { steps: ['Take a transparent stream table (or gutter with sand) and run water at constant discharge.', 'Observe simultaneously: erosion at outer bank, deposition at inner bank, mid-channel bars forming and migrating.', 'Map velocity contours with floats — show high velocity (erosion) and low velocity (deposition) coexisting.', 'Relate to Hjulström curve — same flow velocity erodes sand on cut bank but deposits silt on point bar because critical.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "erosion only happens during floods/high energy events" and "deposition only happens in calm water.".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Wind is an ineffective agent of erosion compared to water because air density is 1/800th of water." Consider sediment transport modes.', answer: 'The statement is partially true but misleading',
                  options: ['The statement is partially true but misleading', 'erosion only happens during floods/high energy events', 'deposition only happens in calm water'],
                  hint: 'Revisit c11_geo_cbse_06_004 (weathering definition) and c9_geo_ch1_8/9 (Class 9 river/wind.',
                  misconception: 'Students believe "erosion only happens during floods/high energy events" and "deposition only happens in calm water." In reality, erosion.' }
          ],
            remediations: { 'erosion-only-happens-during-floods': { steps: ['Take a transparent stream table (or gutter with sand) and run water at constant discharge.', 'Observe simultaneously: erosion at outer bank, deposition at inner bank, mid-channel bars forming and migrating.', 'Map velocity contours with floats — show high velocity (erosion) and low velocity (deposition) coexisting.', 'Relate to Hjulström curve — same flow velocity erodes sand on cut bank but deposits silt on point bar because critical.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
