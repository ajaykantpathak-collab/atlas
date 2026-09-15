import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch01_p1: SimDef = {
    id: 'v3_c12_geo_ch01_p1',
    title: 'Human Geography · Part 1/2',
    subtitle: 'Taylor\'s traffic lights: run the green, obey the red',
    classLevel: 12, subject: 'geography', topic: 'Human Geography · Part 1/2',
    chapters: ['c12_geo_ch01'],
    nodeIds: ['c12_geo_cbse_01_001', 'c12_geo_cbse_01_002', 'c12_geo_cbse_01_003', 'c12_geo_cbse_01_004', 'c12_geo_cbse_01_005', 'c12_geo_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Human geographer', intro: 'Every road you travel and every heatwave you flee is a two-way negotiation between people and planet. That\'s the discipline.', goal: 'Define human geography\'s scope and its three schools — determinism, possibilism, neo-determinism — through real-world evidence.' },
    discovery: {
        question: 'Punjab\'s Green Revolution pumped groundwater for rice until the water table crashed. Which school of geographic thought saw that \'collision\' coming?',
        options: ['Neo-determinism — Taylor\'s traffic lights: humans may run green lights of possibility but only by obeying the red lights of environmental limits', 'Possibilism — humans are free of nature', 'Determinism — nature decides everything', 'Behaviouralism — perception decides'],
        answer: 'Neo-determinism — Taylor\'s traffic lights: humans may run green lights of possibility but only by obeying the red lights of environmental limits',
        hook: 'Human geography runs both ways: \'naturalisation of humans\' (low-tech societies shaped by nature) and \'humanisation of nature\' (glass-domed Trondheim in polar dark). Determinism says only red lights exist, possibilism only green — neo-determinism is the driver who knows both are real.',
    },
    teaching: [
        { title: 'Human Geography: Definition, Nature and Scope', text: 'Human Geography is the synthetic study of the dynamic relationship between human societies and the Earth\'s surface, examining the spatial distribution of human phenomena, the socio-cultural.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map the field itself: split the naturalisers from the humanisers, weigh determinism against possibilism on real landscapes, and trace how the quantitative revolution triggered humanistic, radical and behavioural pushback.',
        labels: ['Human Geography: Definition, Nature', 'Naturalisation of Humans', 'Human Geography vs Physical', 'Major Schools of Human'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_01_001', title: 'Human Geography: Definition, Nature and Scope',
          caseStudy: { intro: 'Look at your daily commute to school: you travel on a road (humanised nature), pass farms modified from forests (humanised nature), and see a weather app.',
            decisions: [{ prompt: 'Define human geography according to Ellen C. Semple and identify the key word that distinguishes her definition from Ratzel\'s.', options: [
                { text: 'Semple defines human geography as "the study of the changing relationship between the', outcome: 'Semple defines human geography as "the study of the changing relationship between the unresting man.' },
                { text: 'synthetic study', outcome: 'Not quite — Students often think "Human Geography = study of human activities only" and "Physical Geography.', reveals: 'human-geography-study-of-human' },
                { text: 'changing/unresting/unstable', outcome: 'Not quite — Students often think "Human Geography = study of human activities only" and "Physical Geography.', reveals: 'human-geography-study-of-human' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_01_002', title: 'Naturalisation of Humans and Humanisation of Nature',
          caseStudy: { intro: 'Begin by observing your own surroundings: notice how the air conditioner in your classroom modifies the natural temperature — this is humanisation of nature.',
            decisions: [{ prompt: 'Define "naturalisation of humans" and "humanisation of nature" in one sentence each, using the terminology of environmental determinism and.', options: [
                { text: 'Naturalisation of humans is the state where primitive societies with minimal technology', outcome: 'Naturalisation of humans is the state where primitive societies with minimal technology adapt.' },
                { text: 'humanisation', outcome: 'Not quite — Students confuse "humanisation of nature" with "urbanisation" or "industrialisation" only, missing.', reveals: 'students-confuse-humanisation-of-nature' },
                { text: 'humanisation of nature', outcome: 'Not quite — Students confuse "humanisation of nature" with "urbanisation" or "industrialisation" only, missing.', reveals: 'students-confuse-humanisation-of-nature' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_01_003', title: 'Human Geography vs Physical Geography: Interrelation',
          caseStudy: { intro: 'Begin by observing your immediate surroundings: note the natural features (trees, slope, soil, temperature) and human features (buildings, roads, crops.',
            decisions: [{ prompt: 'Define \'naturalisation of humans\' and \'humanisation of nature\' in one sentence each, using the NCERT terminology.', options: [
                { text: 'Naturalisation of humans: the stage of low technological development when human societies', outcome: 'Naturalisation of humans: the stage of low technological development when human societies directly.' },
                { text: 'humanisation of nature', outcome: 'Not quite — Students often think "humanisation of nature" means only modern, high-tech societies (like.', reveals: 'humanisation-of-nature-means-only' },
                { text: 'naturalisation of humans', outcome: 'Not quite — Students often think "humanisation of nature" means only modern, high-tech societies (like.', reveals: 'humanisation-of-nature-means-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_01_004', title: 'Major Schools of Human Geography: Determinism',
          caseStudy: { intro: 'Observe a tribal hamlet in the Abujh Maad region of Chhattisgarh where families practice shifting cultivation (penda), rely entirely on forest produce for.',
            decisions: [{ prompt: 'Define Environmental Determinism in one sentence using the exact NCERT terminology for the human-nature relationship at low technological.', options: [
                { text: 'Environmental Determinism is the interaction between primitive human society and strong', outcome: 'Environmental Determinism is the interaction between primitive human society and strong forces.' },
                { text: 'humans change nature to suit them', outcome: 'Not quite — Students equate "Environmental Determinism" with "Climate Determinism" (e.g., "tropical climates.', reveals: 'students-equate-environmental-determinism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_01_006', title: 'Major Schools of Human Geography: Neo-Determinism (Griffith Taylor)',
          caseStudy: { intro: 'Observe the traffic lights at a busy Delhi intersection: red forces every vehicle to stop regardless of the driver\'s urgency, amber gives a brief transition.',
            decisions: [{ prompt: 'State the three colours in Griffith Taylor\'s traffic-light analogy and what each colour represents in human-environment interaction.', options: [
                { text: 'Correct answer: Red = stop (environmental limits that must not be crossed, e.g., carrying', outcome: 'Correct answer: Red = stop (environmental limits that must not be crossed, e.g., carrying capacity.' },
                { text: 'red means danger, green means safe', outcome: 'Not quite — Students confuse **neo-determinism\'s "stop-and-go" with a simple "balance" or "compromise"** and.', reveals: 'students-confuse-neo-determinism-s' },
                { text: 'danger', outcome: 'Not quite — Students confuse **neo-determinism\'s "stop-and-go" with a simple "balance" or "compromise"** and.', reveals: 'students-confuse-neo-determinism-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On an internship with a district development cell, you\'re reviewing two proposals for a flood-prone river valley: one diverts 90% of the river for an industrial estate, the other tunnels a metro link under the floodplain but fits flood-gates and leaves minimum ecological flow.',
            decisions: [{ prompt: 'Which proposal does human geography\'s determinism-possibilism-neo-determinism debate support?', options: [
                { text: 'The flood-gated tunnel — it humanises nature through technology while still obeying the \'red signals\' neo-determinism demands; the 90% diversion is possibilism ignoring ecological limits, like hydropower projects that dry downstream springs.', outcome: 'The chapter\'s middle path is the point: technology lets humans modify nature, but Griffith Taylor\'s \'stop-and-go\' determinism says you stop when nature signals — downstream springs drying is exactly that signal.' },
                { text: 'The full diversion — technology exists precisely to free humans from nature\'s constraints, so bigger modification means bigger development.', outcome: 'That\'s pure possibilism without the brake; the chapter\'s own test case shows diverting nearly all of a river\'s flow is unsustainable humanisation that triggers the very \'red signal\' neo-determinism warns about.', reveals: 'technology-beats-nature' },
                { text: 'Reject both — any modification of a river valley violates the environment; leave it to nature.', outcome: 'That swings to naturalisation — humans dictated by nature; the chapter treats technology within ecological limits as legitimate, so refusing all modification throws away the neo-determinist option.', reveals: 'all-modification-is-violation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now place any human-environment story on the nature–culture dial — and explain why the discipline fought over whose light was green.',
            decisions: [{ prompt: 'What comes next? Human Geography · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Human Geography · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_001', difficulty: 'standard',
          question: 'Human Geography is the synthetic study of the dynamic relationship between.',
          hint: 'If stuck, re-read c11_geo_cbse_01_001 and c11_geo_cbse_01_009 focusing on "geography.',
          misconception: 'Students often think "Human Geography = study of human activities only" and "Physical Geography = study of nature.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Human Geography is the synthetic study of the dynamic relationship between human',
                  options: ['Human Geography is the synthetic study of the dynamic relationship between human', 'Naturalisation of Humans refers to the early stage of human-environment interaction where', 'Human geography and physical geography are inseparable components of geography that study', 'Environmental Determinism is the school of thought in human geography'],
                  hint: 'If stuck, re-read c11_geo_cbse_01_001 and c11_geo_cbse_01_009 focusing on "geography as integrating.',
                  misconception: 'Students often think "Human Geography = study of human activities only" and "Physical Geography = study of nature only." They miss that.' }
          ],
            remediations: { 'human-geography-study-of-human': { steps: ['Revisit **c11_geo_cbse_01_001** (Geography as a Discipline) to recall geography\'s integrative nature.', 'Draw a two-column table: "Physical Environment" (landforms, climate, soil) vs "Human Environment" (settlements.', 'For your local area, fill 3 rows showing *how each physical feature shapes a human activity* and *how that human.', 'Re-read the Benda (naturalisation) and Kari (humanisation) case studies in NCERT.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Human Geography = study of human activities only" and "Physical Geography = study of nature.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The quantitative revolution in human geography (1950s-60s) made the discipline more scientific but less human." Use the emergence.', answer: 'The statement is **largely valid**',
                  options: ['The statement is **largely valid**', 'Human Geography = study of human activities only', 'Physical Geography = study of nature only'],
                  hint: 'If stuck, re-read c11_geo_cbse_01_001 and c11_geo_cbse_01_009 focusing on "geography as integrating.',
                  misconception: 'Students often think "Human Geography = study of human activities only" and "Physical Geography = study of nature only." They miss that.' }
          ],
            remediations: { 'human-geography-study-of-human': { steps: ['Revisit **c11_geo_cbse_01_001** (Geography as a Discipline) to recall geography\'s integrative nature.', 'Draw a two-column table: "Physical Environment" (landforms, climate, soil) vs "Human Environment" (settlements.', 'For your local area, fill 3 rows showing *how each physical feature shapes a human activity* and *how that human.', 'Re-read the Benda (naturalisation) and Kari (humanisation) case studies in NCERT.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_002', difficulty: 'standard',
          question: 'Naturalisation of Humans refers to the early stage of human-environment.',
          hint: 'Revisit c11_geo_cbse_01_009 (Geography as Integrating Discipline) and c11_geo_cbse_17_001.',
          misconception: 'Students confuse "humanisation of nature" with "urbanisation" or "industrialisation" only, missing that traditional.',
          parts: [
                { id: 'a', prompt: 'Explain why the understanding of natural laws (e.g., friction, heat, DNA, aerodynamics) is a prerequisite for technology to "loosen the shackles of environment.', answer: 'Technology is applied knowledge of natural laws',
                  options: ['Technology is applied knowledge of natural laws', 'humanisation of nature', 'urbanisation', 'industrialisation'],
                  hint: 'Revisit c11_geo_cbse_01_009 (Geography as Integrating Discipline) and c11_geo_cbse_17_001 (Human.',
                  misconception: 'Students confuse "humanisation of nature" with "urbanisation" or "industrialisation" only, missing that traditional agriculture (terrace.' },
                { id: 'b', prompt: 'Classify each scenario as naturalisation, humanisation, or neo-determinism: (a) A Gond tribal family in Bastar uses only forest herbs for medicine.', answer: '(a) Naturalisation',
                  options: ['(a) Naturalisation', 'humanisation of nature', 'urbanisation', 'industrialisation'],
                  hint: 'Revisit c11_geo_cbse_01_009 (Geography as Integrating Discipline) and c11_geo_cbse_17_001 (Human.',
                  misconception: 'Students confuse "humanisation of nature" with "urbanisation" or "industrialisation" only, missing that traditional agriculture (terrace.' }
          ],
            remediations: { 'students-confuse-humanisation-of-nature': { steps: ['Re-read the Benda and Kari narratives in NCERT (pages 3-4) and create a two-column table: "What nature dictates".', 'Visit a local park and a nearby construction site; photograph and label 3 examples of humanisation (benches, paved.', 'Re-attempt Diagnostic Question 3 with a fresh scenario: classify a sacred grove (protected by tradition), a solar farm.', 'If still confused, revisit c11_geo_cbse_01_009 (Geography as Integrating Discipline) and c11_soc_cbse_08_002 (Two-Way.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_003', difficulty: 'standard',
          question: 'Human geography and physical geography are inseparable components of geography.',
          hint: 'Revisit c11_geo_cbse_01_004 and c11_geo_cbse_01_005 to recall the sub-branches, and.',
          misconception: 'Students often think "humanisation of nature" means only modern, high-tech societies (like Trondheim), and.',
          parts: [
                { id: 'a', prompt: 'Analyze the neo-determinism (stop-and-go determinism) concept using the traffic light analogy.', answer: 'Neo-determinism: humans can create possibilities (green light) but must respect',
                  options: ['Neo-determinism: humans can create possibilities (green light) but must respect', 'technology solves everything', 'we are helpless before nature', 'humanisation of nature'],
                  hint: 'Revisit c11_geo_cbse_01_004 and c11_geo_cbse_01_005 to recall the sub-branches, and.',
                  misconception: 'Students often think "humanisation of nature" means only modern, high-tech societies (like Trondheim), and "naturalisation of humans" means.' }
          ],
            remediations: { 'humanisation-of-nature-means-only': { steps: ['Re-read the Benda (Abujh Maad) and Kari (Trondheim) boxes in NCERT.', 'For your own city/village, list three ways you are naturalised (e.g., depend on rain, fear heatwave, use local building.', 'Identify one "red light" your area faces (e.g., groundwater depletion, flood risk, landslide zone).', 'Explain how technology both helps and hits the red light. Re-do Diagnostic Question 4 with this personal example.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_004', difficulty: 'standard',
          question: 'Environmental Determinism is the school of thought in human geography which.',
          hint: 'If stuck, revisit c12_geo_cbse_01_002 and map each Benda action to "nature as master".',
          misconception: 'Students equate "Environmental Determinism" with "Climate Determinism" (e.g., "tropical climates make people lazy.',
          parts: [
                { id: 'a', prompt: 'A student argues: "The Inuit in the Arctic and the Bedouins in the Sahara both practice determinism because they wear fur and live in tents respectively.".', answer: 'Step 1: Identify the determinist claim',
                  options: ['Step 1: Identify the determinist claim', 'adaptation', 'determination'],
                  hint: 'If stuck, revisit c12_geo_cbse_01_002 and map each Benda action to "nature as master" — this.',
                  misconception: 'Students equate "Environmental Determinism" with "Climate Determinism" (e.g., "tropical climates make people lazy, temperate climates make.' },
                { id: 'b', prompt: 'Compare the "Naturalisation of Humans" (Determinism) and "Humanisation of Nature" (Possibilism) using the two NCERT case studies: Benda (Abujh Maad) and Kari.', answer: '| Aspect | Benda (Determinism) | Kari (Possibilism) |',
                  options: ['| Aspect | Benda (Determinism) | Kari (Possibilism) |', 'Mother Nature'],
                  hint: 'If stuck, revisit c12_geo_cbse_01_002 and map each Benda action to "nature as master" — this.',
                  misconception: 'Students equate "Environmental Determinism" with "Climate Determinism" (e.g., "tropical climates make people lazy, temperate climates make.' }
          ],
            remediations: { 'students-equate-environmental-determinism-with': { steps: ['Re-read the "Naturalisation of Humans" box (Benda story) and underline every verb showing *passive* human action.', 'Re-read the "Humanisation of Nature" box (Kari story) and underline every verb showing *active* human action (drives.', 'Make a T-chart: Left column = Benda\'s verbs (determinism), Right column = Kari\'s verbs (possibilism).', 'Ask: "Which verb list requires technology?" → All Kari\'s verbs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_005', difficulty: 'standard',
          question: 'Possibilism is the school of thought in human geography which asserts that the.',
          hint: 'If stuck, revisit c12_geo_cbse_01_004 (Determinism) and the NCERT story of Benda (Abujh.',
          misconception: 'Students often equate possibilism with "humans can conquer nature completely" and cite examples like Dubai\'s Palm.',
          parts: [
                { id: 'a', prompt: 'Explain why the statement "Humans are completely free to do whatever they want on Earth" is a misinterpretation of possibilism.', answer: 'Possibilism does not claim absolute freedom',
                  options: ['Possibilism does not claim absolute freedom', 'possibilism means no environmental limits'],
                  hint: 'If stuck, revisit c12_geo_cbse_01_004 (Determinism) and the NCERT story of Benda (Abujh Maad).',
                  misconception: 'Students often equate possibilism with "humans can conquer nature completely" and cite examples like Dubai\'s Palm Islands.' }
          ],
            remediations: { 'students-often-equate-possibilism-with': { steps: ['If a student cannot distinguish possibilism from "technological optimism," do this 3-step remediation: 1.', 'Re-read the NCERT box "Humanisation of Nature" (Trondheim example) and list *all* the energy inputs required (oil for.', 'Compare with the "Naturalisation of Humans" box (Benda in Abujh Maad) — note the near-zero external energy use.', 'Discuss: "Which lifestyle has more *future* possibilities if fossil fuels become scarce?" This forces the student.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_006', difficulty: 'standard',
          question: 'Neo-determinism (Stop-and-Go Determinism), proposed by Griffith Taylor, is.',
          hint: 'If unclear on determinism vs. possibilism, revisit **c12_geo_cbse_01_004** (Benda\'s story.',
          misconception: 'Students confuse **neo-determinism\'s "stop-and-go" with a simple "balance" or "compromise"** and write.',
          parts: [
                { id: 'a', prompt: 'Why did Griffith Taylor propose neo-determinism as a "middle path" (Madhyam Marg) between environmental determinism and possibilism?', answer: 'Correct answer: Determinism (Ratzel, Semple) saw technology as negligible',
                  options: ['Correct answer: Determinism (Ratzel, Semple) saw technology as negligible', 'Taylor just compromised', 'stop-and-go', 'balance'],
                  hint: 'If unclear on determinism vs. possibilism, revisit **c12_geo_cbse_01_004** (Benda\'s story.',
                  misconception: 'Students confuse **neo-determinism\'s "stop-and-go" with a simple "balance" or "compromise"** and write: "Neo-determinism means we should.' },
                { id: 'b', prompt: 'ANALYZE: Compare the 2013 Kedarnath disaster and the success of Indira Gandhi Canal in Rajasthan through the neo-determinist framework.', answer: 'Correct analysis: - **Kedarnath 2013**: Unregulated tourism infrastructure,',
                  options: ['Correct analysis: - **Kedarnath 2013**: Unregulated tourism infrastructure,', 'stop-and-go', 'balance', 'compromise'],
                  hint: 'If unclear on determinism vs. possibilism, revisit **c12_geo_cbse_01_004** (Benda\'s story.',
                  misconception: 'Students confuse **neo-determinism\'s "stop-and-go" with a simple "balance" or "compromise"** and write: "Neo-determinism means we should.' }
          ],
            remediations: { 'students-confuse-neo-determinism-s': { steps: ['If the student cannot distinguish neo-determinism from "balance/compromise": 1.', 'Revisit **c12_geo_cbse_01_004 (Determinism)** and **c12_geo_cbse_01_005 (Possibilism)** — make a three-column table.', 'Rows: Role of nature, Role of technology, Human agency, Red-light concept, Example.', 'Watch the 5-min animation "Griffith Taylor\'s Traffic Lights" (NCERT official YouTube) — pause at each colour and write.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
