import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch24_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch24_p2: SimDef = {
    id: 'v3_c11_geo_ch24_p2',
    title: 'Topographical Maps · Part 2/2',
    subtitle: 'Read brown squiggles as slopes, valleys and hills — the Survey of India\'s code for terrain.',
    classLevel: 11, subject: 'geography', topic: 'Topographical Maps · Part 2/2',
    chapters: ['c11_geo_ch24'],
    nodeIds: ['c11_geo_cbse_24_007', 'c11_geo_cbse_24_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a trekker planning a Western Ghats route from a toposheet', intro: 'A zig-zag mountain path is just a contour line walked — the toposheet draws the same idea in brown ink.', goal: 'Interpret contours, contour intervals and the Survey of India sheet-numbering system.' },
    discovery: {
        question: 'On one toposheet the plains get a 20 m contour interval and the hills get 50 m — the interval adapts to terrain, surely?',
        options: ['No — the contour interval is fixed for the whole sheet in the margin; only the spacing between contours changes with slope', 'Yes — steep ground needs coarser intervals', 'Yes — every ridge gets its own interval', 'No — contours aren\'t about elevation at all'],
        answer: 'No — the contour interval is fixed for the whole sheet in the margin; only the spacing between contours changes with slope',
        hook: 'Contours never cross, close into loops on hills, and kink into V\'s pointing upstream — the pattern is the terrain, written flat.',
    },
    teaching: [
        { title: 'Cultural and Natural Features: Standard Symbols and Interpretation', text: 'Standard symbols (conventional signs) on Survey of India topographical maps are internationally standardized graphical representations used to depict cultural (human-made) and natural features.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_24_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Count contours between index lines at CI 20 m, decode a sheet number like 56H/3 into its grid position, and turn contour spacing into gradient.',
        labels: ['Cultural and Natural Features', 'Scale and Numbering'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_24_007', title: 'Cultural and Natural Features: Standard Symbols and Interpretation',
          scaffold: { problem: 'On a 1:50,000 toposheet (Sheet 45D/10, Jaisalmer region), a student identifies a cluster of 12 tube well symbols (● with circle) within a 2.',
            steps: [
            { text: 'Calculate ground area represented by the 2 cm × 2 cm grid square: 2 cm × 50,000 = 100,000 cm = 1 km per side → Area = 1.' },
            { text: 'Compute tube well density: 12 tube wells / 1 km² = 12 tube wells/km². Compute open well density: 3 wells/km².' },
            { text: 'Determine ground distance to metalled road: 1.5 cm × 50,000 = 75,000 cm = 0.75 km.' },
            { text: 'Calculate ground contour spacing: 1.2 cm × 50,000 = 60,000 cm = 0.6 km horizontal distance per 20 m vertical interval.' },
            { text: 'Interpret hydrogeology: Gentle slope (3.3%) and wide contour spacing indicate thick alluvial cover — favorable for tube.' },
            { text: 'Synthesize: The cluster represents Green Revolution-era intensification in Thar Desert alluvial pockets, enabled.', faded: true, blankAnswer: 'Tube well density = 12/km²; Open well density = 3/km²; Road.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_24_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Planning a trek with a Survey of India toposheet marked 45D/7, a friend decodes it as \'series 45, the 10th sheet in sub-sheet D\' and asks how many 1:50,000 sheets sit inside 45D — he guesses ten. On the trek he also warns: \'The contour interval is 20 m on the flat parts but jumps to 50 m where it\'s steep.\'',
            decisions: [{ prompt: 'What does the numbering system actually mean, and what\'s wrong with the contour claim?', options: [
                { text: 'Decode properly: \'45\' is a grid position in the 4°×4° International Map grid, \'D\' is the 4th cell of a 4×4 matrix of 1:250,000 sheets, and each of those subdivides into exactly four 1:50,000 sheets (1–4) — so \'10\' can\'t exist and the answer is 4. And the contour interval is fixed for the whole sheet as printed in the margin; only the spacing between contours tightens on steep ground.', outcome: 'Both errors dissolve: the code is a nested spatial index, not serial numbers, and slope changes the gaps between contours — never the interval.' },
                { text: 'Go with the serial reading — 45D/10 reads like volume 45, section D, sheet 10.', outcome: 'Alphanumerics here are coordinates: the final quadrant only runs 1–4 because each 1:250,000 sheet splits into four 1:50,000 sheets.', reveals: 'toposheet-code-is-serial' },
                { text: 'Accept the variable interval — steep terrain needs a bigger vertical step to stay readable.', outcome: 'The interval is declared per sheet and constant; what changes with slope is the horizontal equivalent — close contours mean steep, not a bigger CI.', reveals: 'contour-interval-varies-on-sheet' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_24_008', title: 'You made it',
          caseStudy: { intro: 'Two millimetres between contours versus five is a 20% slope versus an 8% one — the map measures steepness if you read the spacing.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_24_007', difficulty: 'standard',
          question: 'Standard symbols (conventional signs) on Survey of India topographical maps are.',
          hint: 'If unable to distinguish similar symbols (e.g., well vs tube well, perennial vs seasonal.',
          misconception: 'Students consistently confuse "tube well" (● with small circle) and "well" (● solid circle) symbols, interpreting both.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Standard symbols (conventional signs) on Survey of India topographical maps are',
                  options: ['Standard symbols (conventional signs) on Survey of India topographical maps are', 'A topographical map is a detailed, large-scale representation of a small portion of the', 'A contour is an imaginary line on a topographical map joining all points of equal', 'Contour interpretation for slope types involves analyzing the spacing and arrangement of'],
                  hint: 'If unable to distinguish similar symbols (e.g., well vs tube well, perennial vs seasonal stream).',
                  misconception: 'Students consistently confuse "tube well" (● with small circle) and "well" (● solid circle) symbols, interpreting both as generic "water.' }
          ],
            remediations: { 'students-consistently-confuse-tube-well': { steps: ['On a 1:50,000 toposheet (e.g., 45D/10), locate 5 tube wells and 5 open wells using the legend.', 'Measure distance from each to nearest settlement and metalled road — tube wells cluster near roads/electric lines.', 'Cross-reference with contour pattern — tube wells in deeper alluvium (wider contour spacing), wells in shallow hard.', 'Write one-sentence inference: "Tube well density correlates with road access and alluvial thickness, indicating.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_24_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse "tube well" (● with small circle) and "well" (● solid circle) symbols, interpreting both.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The conventional sign for a \'temple\' (small black flag on pole) and \'mosque\' (small black dome with crescent) on SOI toposheets.', answer: 'The statement is partially valid',
                  options: ['The statement is partially valid', 'purely biased', 'perfect', 'tube well'],
                  hint: 'If unable to distinguish similar symbols (e.g., well vs tube well, perennial vs seasonal stream).',
                  misconception: 'Students consistently confuse "tube well" (● with small circle) and "well" (● solid circle) symbols, interpreting both as generic "water.' },
                { id: 'b', prompt: 'Design a simplified symbol set for a 1:25,000 scale toposheet of an urban fringe area (e.g., Gurugram-Faridabad border) that must represent: (a) multi-storey.', answer: 'Good answer: (a) Tall rectangle with horizontal bars (floors)',
                  options: ['Good answer: (a) Tall rectangle with horizontal bars (floors)', 'tube well', '(● solid circle) symbols, interpreting both as generic'],
                  hint: 'If unable to distinguish similar symbols (e.g., well vs tube well, perennial vs seasonal stream).',
                  misconception: 'Students consistently confuse "tube well" (● with small circle) and "well" (● solid circle) symbols, interpreting both as generic "water.' }
          ],
            remediations: { 'students-consistently-confuse-tube-well': { steps: ['On a 1:50,000 toposheet (e.g., 45D/10), locate 5 tube wells and 5 open wells using the legend.', 'Measure distance from each to nearest settlement and metalled road — tube wells cluster near roads/electric lines.', 'Cross-reference with contour pattern — tube wells in deeper alluvium (wider contour spacing), wells in shallow hard.', 'Write one-sentence inference: "Tube well density correlates with road access and alluvial thickness, indicating.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_24_008', difficulty: 'standard',
          question: 'The Indian topographical map numbering system is a hierarchical indexing scheme.',
          hint: 'If stuck, revisit Class 9 Geography Chapter 1 (Earth\'s grid system) and Class 6 Geography.',
          misconception: 'Students believe the 1:250k sheet number (1–16) increases column-wise (down the columns) because they see \'A\' to \'D\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Indian topographical map numbering system is a hierarchical indexing scheme by the',
                  options: ['The Indian topographical map numbering system is a hierarchical indexing scheme by the', 'A topographical map is a detailed, large-scale representation of a small portion of the', 'A contour is an imaginary line on a topographical map joining all points of equal', 'Contour interpretation for slope types involves analyzing the spacing and arrangement of'],
                  hint: 'If stuck, revisit Class 9 Geography Chapter 1 (Earth\'s grid system) and Class 6 Geography Chapter 1.',
                  misconception: 'Students believe the 1:250k sheet number (1–16) increases column-wise (down the columns) because they see \'A\' to \'D\' in the first column.' }
          ],
            remediations: { 'the-1-250k-sheet-number': { steps: ['Label the top row A, B, C, D; second row E, F, G, H; etc.', 'Now write numbers 1–16 in the *same* cells row-wise.', 'Pick any cell (e.g., F = 6).', 'Verify that moving right increases the number by 1, moving down increases by 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
