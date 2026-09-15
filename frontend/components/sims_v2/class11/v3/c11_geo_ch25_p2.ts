import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch25_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch25_p2: SimDef = {
    id: 'v3_c11_geo_ch25_p2',
    title: 'Introduction to Aerial Photographs · Part 2/2',
    subtitle: 'See why one aerial photo holds two scales — and when tilt beats nadir.',
    classLevel: 11, subject: 'geography', topic: 'Introduction to Aerial Photographs · Part 2/2',
    chapters: ['c11_geo_ch25'],
    nodeIds: ['c11_geo_cbse_25_007', 'c11_geo_cbse_25_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a photo-interpreter measuring terrain from a survey flight', intro: 'Hours of drone passes now do what months of theodolite work once did — but the geometry underneath is still one lens, one ray.', goal: 'Compute photo scale under relief variation and choose between vertical and oblique photographs.' },
    discovery: {
        question: 'A camera 3,000 m up photographs a hilltop and a valley in one frame — same scale everywhere, since it\'s one photo?',
        options: ['No — the hilltop is closer to the lens, so its scale is larger; relief changes the effective flying height', 'Yes — one exposure means one scale', 'Yes — scale depends only on the focal length', 'No — valleys always photograph larger'],
        answer: 'No — the hilltop is closer to the lens, so its scale is larger; relief changes the effective flying height',
        hook: 'And satellites haven\'t made these photos obsolete — Cartosat can\'t see through monsoon cloud, but a plane flies underneath it.',
    },
    teaching: [
        { title: 'Interpretation of Aerial Photographs: Elements and Keys', text: 'Interpretation of aerial photographs is the systematic process of identifying natural and cultural features on vertical or oblique aerial images by analyzing eight diagnostic elements: tone (relative.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_25_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compute photo scale at two elevations with f/(H−h), then pick vertical versus oblique photography for mapping contours versus reading quake-damaged facades.',
        labels: ['Interpretation of Aerial Photographs', 'Advantages and Limitations'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_25_007', title: 'Interpretation of Aerial Photographs: Elements and Keys',
          caseStudy: { intro: 'Open Google Earth on your phone and zoom to your own neighborhood at ~500 m eye altitude — notice how the cricket ground appears as a smooth light-toned oval.',
            decisions: [{ prompt: 'List the eight standard elements of aerial photograph interpretation in the correct mnemonic order used by the Survey of India, and give.', options: [
                { text: 'The eight elements in standard mnemonic order (T-T-P-S-S-S-S-A) are: **Tone**', outcome: 'The eight elements in standard mnemonic order (T-T-P-S-S-S-S-A) are: **Tone** — average.' },
                { text: 'tone is the most important element', outcome: 'Not quite — Students believe **"tone is the most important element"** and that "darker always means denser.', reveals: 'tone-is-the-most-important' },
                { text: 'darker always means denser vegetation', outcome: 'Not quite — Students believe **"tone is the most important element"** and that "darker always means denser.', reveals: 'tone-is-the-most-important' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_25_008', title: 'Advantages and Limitations of Aerial Photography',
          scaffold: { problem: 'The Survey of India needs to map a 200 km² area in the Dooars region of West Bengal (elevation 100-300m) at 1:10,000 scale for tea garden.',
            steps: [
            { text: 'Calculate flying height H using scale formula S = f / (H - h_avg).' },
            { text: 'Compute maximum relief displacement for 25m tree at r=110mm (photo edge, 230mm format).' },
            { text: 'Convert photo displacement to ground error at mapping scale: Ground error = d × S_denominator = 8.0mm × 10,000.' },
            { text: 'Determine GCP requirement: Area = 200 km², each GCP controls 25 km² → minimum 8 GCPs.' },
            { text: 'Conclusion: Standard aerial photography at 1:10,000 scale in hilly terrain requires either (a) lower flying height.', faded: true, blankAnswer: '(a) 1720m above MSL; (b) 8.0mm on photo (80m ground error).' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_25_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A drone club member wants to \'just tilt the camera\' for mapping a landslide, arguing: \'An oblique shot is basically a tilted vertical photo — you can measure road lengths on it with one scale factor. And Google Earth imagery works like any aerial photo for measurement.\'',
            decisions: [{ prompt: 'What does he misunderstand about aerial photo geometry?', options: [
                { text: 'Explain the projection difference: a vertical photo is a near-orthographic central projection with roughly uniform scale over flat ground; an oblique displaces the principal point from the nadir, so scale varies non-linearly from foreground to horizon — a single factor can be off by 2× or more. And raw metric photos preserve relief displacement, which is exploited for stereoscopic height; orthorectified mosaics like Google Earth have removed it.', outcome: 'He switches to vertical metric photography for measurement and keeps obliques for what they\'re good at — visual interpretation of facades and terrain.' },
                { text: 'Let him measure the oblique — tilt is a geometric nuisance a single correction factor can fix.', outcome: 'Tilt isn\'t rotation: scale changes continuously with both ground distance and elevation, so no single factor can flatten an oblique into a map.', reveals: 'oblique-is-tilted-vertical' },
                { text: 'Use Google Earth directly — it\'s sharper than old aerial photos, so it must measure better.', outcome: 'Orthorectification removes relief displacement using a DEM; that makes it planimetrically tidy but destroys the stereo geometry metric photos exploit for heights.', reveals: 'google-earth-equals-aerial-photo' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_25_008', title: 'You made it',
          caseStudy: { intro: 'The camera\'s central projection is the whole science — every measurement traces back to a straight ray through a lens.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_25_007', difficulty: 'standard',
          question: 'Interpretation of aerial photographs is the systematic process of identifying.',
          hint: 'If stuck on element definitions: Revisit c11_geo_cbse_25_001 (principle of aerial.',
          misconception: 'Students believe **"tone is the most important element"** and that "darker always means denser vegetation." In reality.',
          parts: [
                { id: 'a', prompt: 'List the eight standard elements of aerial photograph interpretation in the correct mnemonic order used by the Survey of India, and give a one-phrase.', answer: 'The eight elements in standard mnemonic order (T-T-P-S-S-S-S-A) are: **Tone**',
                  options: ['The eight elements in standard mnemonic order (T-T-P-S-S-S-S-A) are: **Tone**', 'tone is the most important element', 'darker always means denser vegetation'],
                  hint: 'If stuck on element definitions: Revisit c11_geo_cbse_25_001 (principle of aerial photography.',
                  misconception: 'Students believe **"tone is the most important element"** and that "darker always means denser vegetation." In reality, on panchromatic.' },
                { id: 'b', prompt: 'A student looks at a vertical aerial photograph of the Punjab plains in November and sees two adjacent rectangular fields: Field A is uniformly dark-toned with.', answer: 'The conclusion is wrong',
                  options: ['The conclusion is wrong', 'tone is the most important element', 'darker always means denser vegetation'],
                  hint: 'If stuck on element definitions: Revisit c11_geo_cbse_25_001 (principle of aerial photography.',
                  misconception: 'Students believe **"tone is the most important element"** and that "darker always means denser vegetation." In reality, on panchromatic.' },
                { id: 'c', prompt: 'You are given a 1:20,000 scale vertical aerial photograph of a coastal Karnataka village.', answer: '**Feature (i): Natural evergreen/semi-evergreen forest**',
                  options: ['**Feature (i): Natural evergreen/semi-evergreen forest**', 'plantation', 'tone is the most important element', 'darker always means denser vegetation'],
                  hint: 'If stuck on element definitions: Revisit c11_geo_cbse_25_001 (principle of aerial photography.',
                  misconception: 'Students believe **"tone is the most important element"** and that "darker always means denser vegetation." In reality, on panchromatic.' },
                { id: 'd', prompt: 'Compare the interpretation of "urban built-up area" on a 1:10,000 scale vertical aerial photograph versus a 1:50,000 scale topographical map of the same area.', answer: 'On the **1:10,000 aerial photograph**: **Shadow** is primary',
                  options: ['On the **1:10,000 aerial photograph**: **Shadow** is primary', 'tone is the most important element', 'darker always means denser vegetation'],
                  hint: 'If stuck on element definitions: Revisit c11_geo_cbse_25_001 (principle of aerial photography.',
                  misconception: 'Students believe **"tone is the most important element"** and that "darker always means denser vegetation." In reality, on panchromatic.' }
          ],
            remediations: { 'tone-is-the-most-important': { steps: ['**Step 1**: Take a printed 1:20,000 vertical aerial photograph of a familiar area (e.g., your district HQ from Survey.', '**Step 2**: Using a translucent overlay, trace *only* tone boundaries (ignore shape knowledge).', '**Step 3**: Compare your tone-map with the actual land cover — you will find 3–5 tone classes map to 10+ cover classes.', '**Step 4**: Now add texture (stipple coarse/fine), pattern (draw row directions), and shadow (mark shadow.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_25_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"tone is the most important element"** and that "darker always means denser vegetation." In reality.',
          parts: [
                { id: 'a', prompt: 'Design a visual interpretation key (not dichotomous) for identifying *five* land cover classes in a 1:25,000 scale vertical aerial photograph of the.', answer: '**Visual Interpretation Key',
                  options: ['**Visual Interpretation Key', 'tone is the most important element', 'darker always means denser vegetation'],
                  hint: 'If stuck on element definitions: Revisit c11_geo_cbse_25_001 (principle of aerial photography.',
                  misconception: 'Students believe **"tone is the most important element"** and that "darker always means denser vegetation." In reality, on panchromatic.' }
          ],
            remediations: { 'tone-is-the-most-important': { steps: ['**Step 1**: Take a printed 1:20,000 vertical aerial photograph of a familiar area (e.g., your district HQ from Survey.', '**Step 2**: Using a translucent overlay, trace *only* tone boundaries (ignore shape knowledge).', '**Step 3**: Compare your tone-map with the actual land cover — you will find 3–5 tone classes map to 10+ cover classes.', '**Step 4**: Now add texture (stipple coarse/fine), pattern (draw row directions), and shadow (mark shadow.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_25_008', difficulty: 'standard',
          question: 'Aerial photography is the technique of capturing photographs of the Earth\'s.',
          hint: 'If stuck, revisit c11_geo_cbse_25_005 (Relief Displacement) and c11_geo_cbse_25_006.',
          misconception: 'Students believe aerial photography is "just like satellite images but from lower altitude" — they miss that aerial.',
          parts: [
                { id: 'a', prompt: 'State any three advantages of aerial photography over traditional ground surveying methods for topographical mapping in India.', answer: 'Correct answer: (1) Synoptic view',
                  options: ['Correct answer: (1) Synoptic view', 'high spectral resolution', 'all-weather capability', 'just like satellite images but from lower altitude'],
                  hint: 'If stuck, revisit c11_geo_cbse_25_005 (Relief Displacement) and c11_geo_cbse_25_006 (Stereoscopic.',
                  misconception: 'Students believe aerial photography is "just like satellite images but from lower altitude" — they miss that aerial photos are central.' },
                { id: 'b', prompt: 'Compare the suitability of aerial photography versus satellite imagery (LISS-IV, 5.8m resolution) for monitoring illegal sand mining along the Yamuna.', answer: 'Correct answer: Aerial photography preferred because: (1) Spatial resolution',
                  options: ['Correct answer: Aerial photography preferred because: (1) Spatial resolution', 'higher resolution', 'just like satellite images but from lower altitude'],
                  hint: 'If stuck, revisit c11_geo_cbse_25_005 (Relief Displacement) and c11_geo_cbse_25_006 (Stereoscopic.',
                  misconception: 'Students believe aerial photography is "just like satellite images but from lower altitude" — they miss that aerial photos are central.' }
          ],
            remediations: { 'aerial-photography-is-just-like': { steps: ['Revisit c11_geo_cbse_25_003 (Geometry: focal length, principal point, perspective centre) — draw the perspective.', 'Revisit c11_geo_cbse_25_005 (Relief displacement) — calculate displacement for a 30m tower at photo centre (zero).', 'Compare with satellite pushbroom geometry using ISRO\'s Cartosat-1 brochure — note linear array scanning vs frame camera.', 'Practice mosaicking 3 overlapping aerial photos of your school campus using QGIS — observe misalignment at edges.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
