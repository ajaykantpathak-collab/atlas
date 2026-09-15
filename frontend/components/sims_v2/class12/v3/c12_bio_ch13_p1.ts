import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch13_p1: SimDef = {
    id: 'v3_c12_bio_ch13_p1',
    title: 'Organisms and Populations · Part 1/2',
    subtitle: 'Habitat is the address. Niche is the job description. Never confuse them.',
    classLevel: 12, subject: 'biology', topic: 'Organisms and Populations · Part 1/2',
    chapters: ['c12_bio_ch13'],
    nodeIds: ['c12_bio_cbse_13_001', 'c12_bio_cbse_13_002', 'c12_bio_cbse_13_003', 'c12_bio_cbse_13_004', 'c12_bio_cbse_13_005', 'c12_bio_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Field ecologist', intro: 'Ecology starts with two questions: where does it live, and what does it do there? They\'re not the same.', goal: 'Distinguish habitat from niche and explain how abiotic factors limit organism distribution.' },
    discovery: {
        question: 'An Indian roller bird perches on a banyan tree. Its habitat is the tree — but what is its niche?',
        options: ['Its functional role — hunting insects from that perch, nesting in cavities, interacting with other species', 'The same as its habitat — the two terms are interchangeable', 'The geographic range of all banyan trees across India', 'Its physical address — the exact branch it sits on'],
        answer: 'Its functional role — hunting insects from that perch, nesting in cavities, interacting with other species',
        hook: 'Habitat is the address; niche is the profession. Students merge the two — but an organism\'s niche is everything it *does*: what it eats, when it breeds, whom it competes with.',
    },
    teaching: [
        { title: 'Organism and Environment: Habitat and Niche', text: 'Habitat is the specific physical location or environment where an organism lives, characterized by its abiotic factors (temperature, light, soil, water) and biotic components.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_13_001', title: 'Your mission',
          mission: { widget: 'prism', validate: 'prism:angle=60',
            instruction: 'On the lab: set the light angle to 60° — how does the spectrum shift?.',
        context: 'Take a field trip in your mind: define habitat and niche for organisms you observe, then test how temperature, water and light set the limits on where each species can survive at all.',
            observePrompt: 'What did the prism interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_13_001', title: 'Organism and Environment: Habitat and Niche',
          caseStudy: { intro: 'Observe a banyan tree (Ficus benghalensis) in your neighborhood: it provides habitat for epiphytes, birds, insects, and squirrels.',
            decisions: [{ prompt: 'Define habitat and niche. Give one example of an organism where the habitat and niche are clearly distinct.', options: [
                { text: 'Habitat is the physical address (e.g., a pond for a frog)', outcome: 'Habitat is the physical address (e.g., a pond for a frog); niche is the functional role (e.g., frog.' },
                { text: 'frog\'s niche is the pond', outcome: 'Not quite — Students think "niche = habitat + food" and omit reproductive strategy, temporal activity patterns.', reveals: 'niche-habitat-food-and-omit' },
                { text: 'niche = habitat + food', outcome: 'Not quite — Students think "niche = habitat + food" and omit reproductive strategy, temporal activity patterns.', reveals: 'niche-habitat-food-and-omit' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_13_002', title: 'Abiotic Factors: Temperature, Water, Light',
          caseStudy: { intro: 'Imagine standing in the Thar Desert at noon — the sand burns your feet (temperature), your throat is parched (water), and the glare is blinding (light).',
            decisions: [{ prompt: 'Define the term \'stenothermal\' and give one example each of a stenothermal animal and a stenothermal plant from Indian ecosystems.', options: [
                { text: 'Stenothermal organisms tolerate only a narrow temperature range', outcome: 'Stenothermal organisms tolerate only a narrow temperature range.' },
                { text: 'polar bear in India', outcome: 'Not quite — Students think "adaptation eliminates the abiotic factor as a limitation." Example: "Camels store.', reveals: 'adaptation-eliminates-the-abiotic-factor' },
                { text: 'cactus', outcome: 'Not quite — Students think "adaptation eliminates the abiotic factor as a limitation." Example: "Camels store.', reveals: 'adaptation-eliminates-the-abiotic-factor' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_13_003', title: 'Adaptations: Morphological, Physiological, Behavioral',
          caseStudy: { intro: 'Observe a cactus in the Thar Desert: its leaves are reduced to spines, stem is green and fleshy, roots are widespread.',
            decisions: [{ prompt: 'Define "adaptation" in the evolutionary biology sense. How does it differ from "acclimatization"?', options: [
                { text: 'Adaptation is a heritable trait that increases fitness in a specific environment,', outcome: 'Adaptation is a heritable trait that increases fitness in a specific environment, produced.' },
                { text: 'adaptation is when an organism changes to suit its environment', outcome: 'Not quite — Students frequently equate "adaptation" with any useful trait, ignoring heritability and.', reveals: 'students-frequently-equate-adaptation-with' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_13_004', title: 'Population Attributes: Density, Birth Rate, Death Rate',
          scaffold: { problem: 'In a 25-hectare teak plantation, a forester uses the quadrat method to estimate teak tree density.',
            steps: [
            { text: 'Calculate total individuals counted across all quadrats. Sum = 3+5+2+4+6+3+4+5+2+3+4+5+3+4+2+6+4+3+5+4+3+2+4+5+3 = 96.' },
            { text: 'Calculate total area sampled. Each quadrat = 10 m × 10 m = 100 m². 25 quadrats = 25 × 100 = 2500 m².' },
            { text: 'Compute density per m². Density = 96 / 2500 = 0.0384 trees/m².' },
            { text: 'Convert to density per hectare. 1 ha = 10,000 m². Density per ha = 0.0384 × 10,000 = 384 trees/ha.' },
            { text: 'Estimate total population in 25 ha. Total = 384 trees/ha × 25 ha = 9600 teak trees.', faded: true, blankAnswer: 'Mean density = 384 trees/hectare; Estimated total.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_13_005', title: 'Population Growth: Exponential and Logistic Models',
          scaffold: { problem: 'A bacterial culture starts with 100 cells. Under optimal conditions, the generation time is 30 minutes.',
            steps: [
            { text: 'Generation time g = 30 min = 0.5 hr. In exponential growth, N = N₀ × 2^(t/g).' },
            { text: 'Calculate r = ln(2)/0.5 = 1.386 hr⁻¹. This means population increases ~3.99× per hour (e^1.386)' },
            { text: 'For part (b): N(4) = 100 × e^(1.386×4) = 100 × e^5.544 = 100 × 255.6 ≈ 25,560 cells' },
            { text: 'For part (c): 50% of K = 5×10⁸ cells. Use logistic equation: N(t) = K / (1 + ((K-N₀)/N₀)e^(-rt)).' },
            { text: '5×10⁸ = 10⁹ / (1 + ((10⁹-100)/100)e^(-1.386t)) → 1 + 9.999×10⁶ e^(-1.386t) = 2 → e^(-1.386t) = 1/9.999×10⁶ ≈ 10⁻⁷' },
            { text: '-1.386t = ln(10⁻⁷) = -16.118 → t = 11.63 hours. Check: at t=11.63, exponential would give N=100×e^(1.386×11.63) ≈ 5×10⁸.', faded: true, blankAnswer: '(a) r = 1.386 hr⁻¹ (b) 25,560 cells (c) 11.63 hours' }
            ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_13_006', title: 'Life History Variation',
          caseStudy: { intro: 'Observe a bamboo forest flowering after 50 years — all plants flower simultaneously, set seed, and die (semelparity).',
            decisions: [{ prompt: 'Define semelparity and give one plant and one animal example from the Indian subcontinent.', options: [
                { text: 'Semelparity: organisms reproduce once in their lifetime and then die', outcome: 'Semelparity: organisms reproduce once in their lifetime and then die.' },
                { text: 'semelparity means reproducing many times', outcome: 'Not quite — Students often think "r-selected means pests/invasive species and K-selected means endangered/large.', reveals: 'r-selected-means-pests-invasive' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_13_002', title: 'Identify each idea',
          dissect: { specimen: 'Organisms and Populations · Part 1/2', spots: [
            { id: 's1', label: 'Organism and Environment Habitat and Niche', prompt: 'Which idea is this? — Habitat is the specific physical location or environment where an organism lives.', answer: 'Organism and Environment Habitat and Niche', options: ['Organism and Environment Habitat and Niche', 'Abiotic Factors Temperature Water Light', 'Adaptations Morphological Physiological Behavioral', 'Population Attributes Density Birth Rate Death Rate'] },
            { id: 's2', label: 'Abiotic Factors Temperature Water Light', prompt: 'Which idea is this? — Abiotic factors are the non-living physical and chemical components of an ecosystem.', answer: 'Abiotic Factors Temperature Water Light', options: ['Abiotic Factors Temperature Water Light', 'Organism and Environment Habitat and Niche', 'Adaptations Morphological Physiological Behavioral', 'Population Attributes Density Birth Rate Death Rate'] },
            { id: 's3', label: 'Adaptations Morphological Physiological Behavioral', prompt: 'Which idea is this? — An adaptation is a heritable trait — morphological, physiological, or behavioral — that.', answer: 'Adaptations Morphological Physiological Behavioral', options: ['Adaptations Morphological Physiological Behavioral', 'Organism and Environment Habitat and Niche', 'Abiotic Factors Temperature Water Light', 'Population Attributes Density Birth Rate Death Rate'] },
            { id: 's4', label: 'Population Attributes Density Birth Rate Death Rate', prompt: 'Which idea is this? — Population attributes are statistical characteristics that describe a population\'s size.', answer: 'Population Attributes Density Birth Rate Death Rate', options: ['Population Attributes Density Birth Rate Death Rate', 'Organism and Environment Habitat and Niche', 'Abiotic Factors Temperature Water Light', 'Adaptations Morphological Physiological Behavioral'] },
            { id: 's5', label: 'Population Growth Exponential and Logistic Models', prompt: 'Which idea is this? — Population growth models describe how population size (N) changes over time (t).', answer: 'Population Growth Exponential and Logistic Models', options: ['Population Growth Exponential and Logistic Models', 'Organism and Environment Habitat and Niche', 'Abiotic Factors Temperature Water Light', 'Adaptations Morphological Physiological Behavioral'] },
            { id: 's6', label: 'Life History Variation', prompt: 'Which idea is this? — Life history variation refers to the diversity in reproductive strategies among.', answer: 'Life History Variation', options: ['Life History Variation', 'Organism and Environment Habitat and Niche', 'Abiotic Factors Temperature Water Light', 'Adaptations Morphological Physiological Behavioral'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_13_001', title: 'A real-world call',
          caseStudy: { intro: 'Reproductive-health education reduces disease and unsafe practices, but some communities worry it conflicts with their values or rushes children into adult topics.',
            decisions: [{ prompt: 'Should schools teach it regardless?', options: [
                { text: 'Yes — health literacy is a right, not a preference', outcome: 'Public health\'s position — information withheld is a harm; but taught without cultural care, it can alienate the families who need it most.' },
                { text: 'Yes, but shaped with community input', outcome: 'The pragmatic middle — content stays accurate, delivery respects context; slower, but it actually reaches people.' },
                { text: 'No — families should decide the timing', outcome: 'Respects family authority; the risk is that the students who most need the information are exactly those whose families don\'t provide it.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school biodiversity assignment on the tiger, a student submits: \'Niche — the forest; it eats deer.\' His teacher returns it marked incomplete.',
            decisions: [{ prompt: 'What\'s missing from that \'niche\'?', options: [
                { text: 'The forest is only the habitat — the address; the niche is the profession: solitary territorial ambush predator, largely nocturnal, needing a large home range and specific prey interactions.', outcome: 'Niche spans diet, activity timing, social structure, reproduction and interactions — not just where the animal lives and one thing it eats.' },
                { text: 'Nothing — niche means habitat plus diet, and \'forest plus deer\' covers both.', outcome: 'That strips out behaviour, temporal activity and trophic interactions; \'address plus one meal\' is exactly the truncated definition exams penalise.', reveals: 'niche-is-address-plus-food' },
                { text: 'Nothing — and since a niche is genetically fixed, the tiger\'s role can\'t differ between the Sundarbans and central India.', outcome: 'The fundamental niche is constrained, but the realised niche shifts with context — Sundarbans tigers swim, drink saline water and hunt fish.', reveals: 'niche-is-genetically-fixed' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now separate where an organism lives from what it does there — the first real skill of ecology. Niche vs habitat is a classic board trap and the foundation of environmental science careers.',
            decisions: [{ prompt: 'What comes next? Organisms and Populations · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Organisms and Populations · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'prism', prompt: 'Explore the prism interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'prism', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_13_001', difficulty: 'standard',
          question: 'Habitat is the specific physical location or environment where an organism.',
          hint: 'If stuck, review Class 9 "Adaptations as Outcomes of Structural Change" (c9_bio_ch4_6).',
          misconception: 'Students think "niche = habitat + food" and omit reproductive strategy, temporal activity patterns, and behavioral.',
          parts: [
                { id: 'a', prompt: 'Define habitat and niche. Give one example of an organism where the habitat and niche are clearly distinct.', answer: 'Habitat is the physical address (e.g., a pond for a frog)',
                  options: ['Habitat is the physical address (e.g., a pond for a frog)', 'frog\'s niche is the pond', 'niche = habitat + food', 'equates habitat with niche (e'],
                  hint: 'If stuck, review Class 9 "Adaptations as Outcomes of Structural Change" (c9_bio_ch4_6) and practice.',
                  misconception: 'Students think "niche = habitat + food" and omit reproductive strategy, temporal activity patterns, and behavioral interactions.' },
                { id: 'b', prompt: 'In a forest, two warbler species feed on insects in the same trees. Species A forages on outer branches; Species B forages on inner branches.', answer: 'This is resource partitioning',
                  options: ['This is resource partitioning', 'niche = habitat + food'],
                  hint: 'If stuck, review Class 9 "Adaptations as Outcomes of Structural Change" (c9_bio_ch4_6) and practice.',
                  misconception: 'Students think "niche = habitat + food" and omit reproductive strategy, temporal activity patterns, and behavioral interactions.' },
                { id: 'c', prompt: 'Analyze: "The competitive exclusion principle states that two species competing for the same limiting resource cannot coexist at constant population values.', answer: 'Mechanisms: (1) Environmental fluctuations (turbulence, nutrient pulses) prevent',
                  options: ['Mechanisms: (1) Environmental fluctuations (turbulence, nutrient pulses) prevent', 'they eat different things', 'niche = habitat + food'],
                  hint: 'If stuck, review Class 9 "Adaptations as Outcomes of Structural Change" (c9_bio_ch4_6) and practice.',
                  misconception: 'Students think "niche = habitat + food" and omit reproductive strategy, temporal activity patterns, and behavioral interactions.' }
          ],
            remediations: { 'niche-habitat-food-and-omit': { steps: ['Revisit Class 9 "Adaptations as Outcomes of Structural Change" (c9_bio_ch4_6) to relink structural adaptations.', 'Watch a 5-min video on Connell\'s barnacle experiment (Chthamalus/Balanus) — visualize fundamental vs realized niche.', 'Practice writing niche descriptions for 3 Indian species (e.g., lion-tailed macaque, sundari tree, hoolock gibbon).', 'Re-attempt Diagnostic Q2 and Q3.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_13_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "niche = habitat + food" and omit reproductive strategy, temporal activity patterns, and behavioral.',
          parts: [
                { id: 'a', prompt: 'Design a field study to test whether two coexisting frog species in a Western Ghats stream partition their niches by diet, microhabitat, or breeding time.', answer: 'Method: (1) Stomach flushing or fecal metabarcoding for diet composition',
                  options: ['Method: (1) Stomach flushing or fecal metabarcoding for diet composition', 'niche = habitat + food'],
                  hint: 'If stuck, review Class 9 "Adaptations as Outcomes of Structural Change" (c9_bio_ch4_6) and practice.',
                  misconception: 'Students think "niche = habitat + food" and omit reproductive strategy, temporal activity patterns, and behavioral interactions.' }
          ],
            remediations: { 'niche-habitat-food-and-omit': { steps: ['Revisit Class 9 "Adaptations as Outcomes of Structural Change" (c9_bio_ch4_6) to relink structural adaptations.', 'Watch a 5-min video on Connell\'s barnacle experiment (Chthamalus/Balanus) — visualize fundamental vs realized niche.', 'Practice writing niche descriptions for 3 Indian species (e.g., lion-tailed macaque, sundari tree, hoolock gibbon).', 'Re-attempt Diagnostic Q2 and Q3.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_13_002', difficulty: 'standard',
          question: 'Abiotic factors are the non-living physical and chemical components of.',
          hint: 'If stuck, revisit c11_bio_cbse_11_007 (Factors Affecting Photosynthesis: Law of Limiting.',
          misconception: 'Students think "adaptation eliminates the abiotic factor as a limitation." Example: "Camels store water in humps,.',
          parts: [
                { id: 'a', prompt: 'Define the term \'stenothermal\' and give one example each of a stenothermal animal and a stenothermal plant from Indian ecosystems.', answer: 'Stenothermal organisms tolerate only a narrow temperature range',
                  options: ['Stenothermal organisms tolerate only a narrow temperature range', 'polar bear in India', 'cactus', 'adaptation eliminates the abiotic factor as a limitation'],
                  hint: 'If stuck, revisit c11_bio_cbse_11_007 (Factors Affecting Photosynthesis: Law of Limiting Factors).',
                  misconception: 'Students think "adaptation eliminates the abiotic factor as a limitation." Example: "Camels store water in humps, so water isn\'t limiting.' },
                { id: 'b', prompt: 'Why does a fish die when placed in distilled water, but survive in pond water? Explain using the concept of osmosis and osmoregulation.', answer: 'Distilled water is hypotonic to fish body fluids',
                  options: ['Distilled water is hypotonic to fish body fluids', 'distilled water has no oxygen', 'adaptation eliminates the abiotic factor as a limitation', 'Camels store water in humps, so water isn\'t limiting for them'],
                  hint: 'If stuck, revisit c11_bio_cbse_11_007 (Factors Affecting Photosynthesis: Law of Limiting Factors).',
                  misconception: 'Students think "adaptation eliminates the abiotic factor as a limitation." Example: "Camels store water in humps, so water isn\'t limiting.' },
                { id: 'c', prompt: 'A farmer in Punjab grows wheat (a long-day plant) and rice (a short-day plant).', answer: 'Wheat (long-day) flowers when day length > critical length (approx',
                  options: ['Wheat (long-day) flowers when day length > critical length (approx', 'rice flowers first', 'adaptation eliminates the abiotic factor as a limitation', 'Camels store water in humps, so water isn\'t limiting for them'],
                  hint: 'If stuck, revisit c11_bio_cbse_11_007 (Factors Affecting Photosynthesis: Law of Limiting Factors).',
                  misconception: 'Students think "adaptation eliminates the abiotic factor as a limitation." Example: "Camels store water in humps, so water isn\'t limiting.' }
          ],
            remediations: { 'adaptation-eliminates-the-abiotic-factor': { steps: ['Revisit c11_bio_cbse_11_007 (Law of Limiting Factors) — draw the photosynthesis rate vs light/CO₂/temperature curves.', 'Revisit c11_bio_cbse_13_008 (Seed Dormancy and Germination) — note how water, temperature, light each gate germination.', 'Do the "Factor Limitation Table" exercise: list 5 Indian organisms, for each write the factor that would kill it first.', 'Re-attempt DIAGNOSTIC_QUESTION_5 with this table.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_13_003', difficulty: 'standard',
          question: 'An adaptation is a heritable trait — morphological, physiological,.',
          hint: 'Revisit c10_bio_cbse_04_007 (Darwin\'s natural selection) and c9_bio_ch4_6 (basic.',
          misconception: 'Students frequently equate "adaptation" with any useful trait, ignoring heritability and evolutionary history.',
          parts: [
                { id: 'a', prompt: 'A desert lizard basks in the sun to raise its body temperature and retreats into a burrow during peak heat.', answer: 'Behavioral adaptation',
                  options: ['Behavioral adaptation', 'physiological because it involves temperature'],
                  hint: 'Revisit c10_bio_cbse_04_007 (Darwin\'s natural selection) and c9_bio_ch4_6 (basic adaptation types).',
                  misconception: 'Students frequently equate "adaptation" with any useful trait, ignoring heritability and evolutionary history.' },
                { id: 'b', prompt: 'The kangaroo rat (North American desert) never drinks water; it survives on metabolic water from seeds. Its kidneys produce extremely concentrated urine.', answer: 'metabolic water production, (',
                  options: ['metabolic water production, (', 'morphological'],
                  hint: 'Revisit c10_bio_cbse_04_007 (Darwin\'s natural selection) and c9_bio_ch4_6 (basic adaptation types).',
                  misconception: 'Students frequently equate "adaptation" with any useful trait, ignoring heritability and evolutionary history.' }
          ],
            remediations: { 'students-frequently-equate-adaptation-with': { steps: ['Revisit c9_bio_ch4_6 (Class 9: Adaptations: Structural and Behavioural) to re-learn the three categories with basic.', 'Watch a 5-min video on "acclimatization vs adaptation" (e.g., high-altitude natives vs.', 'Write three Indian examples for each category without notes.', 'Re-attempt Diagnostic Questions 1 and 5.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_13_004', difficulty: 'standard',
          question: 'Population attributes are statistical characteristics that describe.',
          hint: 'If stuck, revisit Class 9 "Biodiversity" (c9_bio_ch4_1) for population vs.',
          misconception: 'Students often think "population density" always means "number of individuals per unit area" and apply it uniformly.',
          parts: [
                { id: 'a', prompt: 'In a mark-recapture study of frogs in a pond, 80 frogs are captured, marked, and released. Two weeks later, 60 frogs are captured, of which 12 are marked.', answer: 'Yes, the calculation is correct: N = (M × C) / R = (80 × 60) / 12 = 400 frogs',
                  options: ['Yes, the calculation is correct: N = (M × C) / R = (80 × 60) / 12 = 400 frogs', 'population density', 'number of individuals per unit area'],
                  hint: 'If stuck, revisit Class 9 "Biodiversity" (c9_bio_ch4_1) for population vs.',
                  misconception: 'Students often think "population density" always means "number of individuals per unit area" and apply it uniformly.' },
                { id: 'b', prompt: 'A town has a population of 50,000. In one year, 650 live births and 400 deaths are recorded.', answer: 'Crude birth rate = (650 / 50,000) × 1000 = 13 per 1000 per year',
                  options: ['Crude birth rate = (650 / 50,000) × 1000 = 13 per 1000 per year', 'the calculation is wrong', 'population density', 'number of individuals per unit area'],
                  hint: 'If stuck, revisit Class 9 "Biodiversity" (c9_bio_ch4_1) for population vs.',
                  misconception: 'Students often think "population density" always means "number of individuals per unit area" and apply it uniformly.' },
                { id: 'c', prompt: 'Compare the suitability of quadrat sampling vs. mark-recapture for estimating population density of: (a) banyan trees in a 50-hectare forest, (b) tigers in the.', answer: 'banyan trees in a 50-hectare forest, (',
                  options: ['banyan trees in a 50-hectare forest, (', 'population density', 'number of individuals per unit area'],
                  hint: 'If stuck, revisit Class 9 "Biodiversity" (c9_bio_ch4_1) for population vs.',
                  misconception: 'Students often think "population density" always means "number of individuals per unit area" and apply it uniformly.' }
          ],
            remediations: { 'population-density-always-means-number': { steps: ['Revisit Class 9 "Biodiversity" (c9_bio_ch4_1) to recall the difference between species richness (count of species) and.', 'Practice unit conversions: 1 km² = 100 ha = 10⁶ m²; 1 ha = 10⁴ m². Do 5 conversions daily until automatic.', 'For mark-recapture, derive the Lincoln-Petersen formula yourself: M/N = R/C → N = MC/R. Write it from memory 3 times.', 'Create a table comparing crude vs. specific rates with denominators.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_13_005', difficulty: 'standard',
          question: 'Population growth models describe how population size (N) changes over time.',
          hint: 'If stuck on r = b - d, revisit c12_bio_cbse_13_004 population attributes.',
          misconception: 'Students believe "carrying capacity K is a fixed, unchanging number for a species." They write in exams: "K for tigers.',
          parts: [
                { id: 'a', prompt: 'In the logistic equation dN/dt = rN[(K-N)/K], what happens to the growth rate dN/dt when N = K/2? Explain why this point is biologically significant.', answer: 'At N = K/2, dN/dt = r(K/2)[(K-K/2)/K] = r(K/2)(1/2) = rK/4',
                  options: ['At N = K/2, dN/dt = r(K/2)[(K-K/2)/K] = r(K/2)(1/2) = rK/4', 'growth rate is zero', 'growth rate is rN', 'carrying capacity K is a fixed, unchanging number for a species'],
                  hint: 'If stuck on r = b - d, revisit c12_bio_cbse_13_004 population attributes.',
                  misconception: 'Students believe "carrying capacity K is a fixed, unchanging number for a species." They write in exams: "K for tigers is 100" as if it\'s.' }
          ],
            remediations: { 'carrying-capacity-k-is-a': { steps: ['Revisit c12_bio_cbse_13_004 — review how birth/death rates depend on density.', 'Do the "flour beetle" thought experiment: same species, two jars — one with 10g flour, one with 100g flour.', 'Plot K vs resource level — it\'s a positive correlation.', 'Redo diagnostic question 2 with N=K/2 concept, emphasizing K is a parameter of the ENVIRONMENT, not the species.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_13_006', difficulty: 'standard',
          question: 'Life history variation refers to the diversity in reproductive strategies among.',
          hint: 'Revisit c12_bio_cbse_13_005 — focus on the derivation of logistic equation dN/dt.',
          misconception: 'Students often think "r-selected means pests/invasive species and K-selected means endangered/large animals." This.',
          parts: [
                { id: 'a', prompt: 'Define semelparity and give one plant and one animal example from the Indian subcontinent.', answer: 'Semelparity: organisms reproduce once in their lifetime and then die',
                  options: ['Semelparity: organisms reproduce once in their lifetime and then die', 'semelparity means reproducing many times'],
                  hint: 'Revisit c12_bio_cbse_13_005 — focus on the derivation of logistic equation dN/dt = rN(1-N/K) and.',
                  misconception: 'Students often think "r-selected means pests/invasive species and K-selected means endangered/large animals." This is wrong because: (1).' },
                { id: 'b', prompt: 'A population of mosquitoes in a seasonal pond shows exponential growth during monsoon but crashes in dry season.', answer: 'r-selected',
                  options: ['r-selected', 'K-selected because population grows fast'],
                  hint: 'Revisit c12_bio_cbse_13_005 — focus on the derivation of logistic equation dN/dt = rN(1-N/K) and.',
                  misconception: 'Students often think "r-selected means pests/invasive species and K-selected means endangered/large animals." This is wrong because: (1).' }
          ],
            remediations: { 'r-selected-means-pests-invasive': { steps: ['Have them list 5 Indian species (2 plants, 3 animals) and research their actual life history traits (clutch size, age.', 'Plot each species on an r-K continuum axis based on traits, not size or fame.', 'Discuss why a house gecko (small, multiple clutches/year, no care) is r-selected while a tortoise (small, few eggs.', 'Re-attempt Diagnostic Question 5 with new examples.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
