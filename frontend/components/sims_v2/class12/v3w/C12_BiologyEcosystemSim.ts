import type { SimDef } from '../../engine/types';
import C12_BiologyEcosystemSim from '../../../simulations/c6_12/C12_BiologyEcosystemSim';

/** v3 wrapped master — C12_BiologyEcosystemSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biologyecosystemsim: SimDef = {
    id: 'v3w_c12_biologyecosystemsim',
    title: 'Organism and Environment: Habitat and Niche',
    subtitle: 'This node covers definitions of habitat and niche, the concept of ecological niche.',
    classLevel: 12, subject: 'biology', topic: 'Organism and Environment: Habitat and Niche',
    chapters: [],
    nodeIds: ['c12_bio_cbse_13_001', 'c12_bio_cbse_13_002', 'c12_bio_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a banyan tree (Ficus benghalensis) in your neighborhood: it provides habitat for epiphytes, birds,.', goal: 'Master Organism and Environment: Habitat and Niche.' },
    discovery: {
        question: 'Define habitat and niche. Give one example of an organism where the habitat and niche are clearly distinct.',
        options: ['Habitat is the physical address (e.g., a pond for a frog)', 'frog\'s niche is the pond', 'niche = habitat + food'],
        answer: 'Habitat is the physical address (e.g., a pond for a frog)',
        hook: 'Students think "niche = habitat + food" and omit reproductive strategy, temporal activity patterns, and behavioral.',
    },
    teaching: [
        { title: 'Habitat is the specific physical location or.', text: 'Habitat is the specific physical location or environment where an organism lives, characterized by its abiotic factors (temperature, light, soil, water) and biotic components.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bio_cbse_13_001', title: 'Habitat is the specific physical.',
          scaffold: { problem: 'The Indian pangolin (Manis crassicaudata) and the Indian porcupine (Hystrix indica) both inhabit scrub forests of central India and feed on.',
            steps: [
            { text: 'Identify habitat overlap — both occupy similar scrub forest habitat (shared address).' },
            { text: 'Compare dietary niches — pangolin is myrmecophagous (specialized on ants/termites); porcupine is herbivorous/omnivorous.' },
            { text: 'Compare temporal niches — pangolin is strictly nocturnal; porcupine is nocturnal but also crepuscular.' },
            { text: 'Compare microhabitat use — pangolin forages on ground and climbs trees for arboreal ants; porcupine forages on ground,.' },
            { text: 'Compare reproductive niches — pangolin gives birth to 1 young in burrow; porcupine has 2-4 young in rock crevices.' },
            { text: 'Synthesize — multidimensional niche differentiation (diet, time, space, reproduction) reduces competition below.', faded: true, blankAnswer: 'Coexistence is enabled by strong dietary separation.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_13_002', title: 'Abiotic factors are the non-living.',
          scaffold: { problem: 'A population of freshwater prawns (Macrobrachium rosenbergii) is introduced into two ponds in Odisha: Pond A has stable temperature 28°C,.',
            steps: [
            { text: 'Identify the abiotic factors differing between ponds — temperature stability and salinity (water composition).' },
            { text: 'Recall that Macrobrachium rosenbergii is a stenothermal freshwater species — narrow temperature tolerance, low salinity.' },
            { text: 'Apply thermal biology — daily 12°C fluctuation exceeds the species\' optimum range (28-31°C); repeated thermal stress.' },
            { text: 'Apply osmoregulation — 5 ppt salinity is hyperosmotic to prawn haemolymph; energy diverted to active ion transport.' },
            { text: 'Conclude that both factors act synergistically — temperature fluctuation widens the metabolic demand, salinity narrows.', faded: true, blankAnswer: 'Pond B\'s temperature fluctuation (22-34°C) exceeds the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_10_006', title: 'Microbes as biocontrol agents are.',
          scaffold: { problem: 'A cotton farmer in Maharashtra observes bollworm (Helicoverpa armigera) infestation.',
            steps: [
            { text: 'Identify the pest — Helicoverpa armigera is a lepidopteran larva, known to be susceptible to Bt Cry1Ac toxin.' },
            { text: 'Recall Bt mode of action — Cry1Ac protoxin is activated in alkaline midgut (pH ~10) of lepidopterans, binds to specific.' },
            { text: 'Recall cypermethrin mode of action — synthetic pyrethroid, neurotoxin that keeps sodium channels open → hyperexcitation.' },
            { text: 'Compare ecological impact — Bt is host-specific (minimal non-target effects), degrades in sunlight (short persistence),.' },
            { text: 'Consider integrated pest management (IPM) — Bt fits IPM (can be rotated with other modes of action, preserves.' },
            { text: 'Conclude — For sustainable management, Bt spray is preferred if applied at correct larval stage and coverage; chemical.', faded: true, blankAnswer: 'Bt formulation is the better first choice for sustainable.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_13_002', title: 'Identify each idea',
          dissect: { specimen: 'Organism and Environment: Habitat and Niche', spots: [
            { id: 's1', label: 'Habitat is the specific physical', prompt: 'Which idea is this? — Habitat is the specific physical location or environment where an organism lives,.', answer: 'Habitat is the specific physical', options: ['Habitat is the specific physical', 'Abiotic factors are the non-living', 'Microbes as biocontrol agents are'] },
            { id: 's2', label: 'Abiotic factors are the non-living', prompt: 'Which idea is this? — Abiotic factors are the non-living physical and chemical components of an ecosystem —.', answer: 'Abiotic factors are the non-living', options: ['Abiotic factors are the non-living', 'Habitat is the specific physical', 'Microbes as biocontrol agents are'] },
            { id: 's3', label: 'Microbes as biocontrol agents are', prompt: 'Which idea is this? — Microbes as biocontrol agents are microorganisms (bacteria, fungi, viruses, protozoa).', answer: 'Microbes as biocontrol agents are', options: ['Microbes as biocontrol agents are', 'Habitat is the specific physical', 'Abiotic factors are the non-living'] }
          ] } }
    ],
    explore: { component: C12_BiologyEcosystemSim, prompt: 'Explore the interactive — Organism and Environment: Habitat and Niche' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_13_001', difficulty: 'standard',
          question: 'Habitat is the specific physical location or environment where an organism.',
          hint: 'If stuck, review Class 9 "Adaptations as Outcomes of Structural Change" (c9_bio_ch4_6).',
          misconception: 'Students think "niche = habitat + food" and omit reproductive strategy, temporal activity patterns, and behavioral.',
          parts: [
                { id: 'a', prompt: 'Define habitat and niche. Give one example of an organism where the habitat and niche are clearly distinct.', answer: 'Habitat is the physical address (e.g., a pond for a frog)',
                  options: ['Habitat is the physical address (e.g., a pond for a frog)', 'frog\'s niche is the pond', 'niche = habitat + food'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "niche = habitat + food" and omit reproductive strategy, temporal activity patterns, and behavioral interactions.' },
                { id: 'b', prompt: 'In a forest, two warbler species feed on insects in the same trees. Species A forages on outer branches; Species B forages on inner branches.', answer: 'This is resource partitioning',
                  options: ['This is resource partitioning', 'niche = habitat + food'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "niche = habitat + food" and omit reproductive strategy, temporal activity patterns, and behavioral interactions.' },
                { id: 'c', prompt: 'Analyze: "The competitive exclusion principle states that two species competing for the same limiting resource cannot coexist at constant population values.', answer: 'Mechanisms: (1) Environmental fluctuations (turbulence, nutrient pulses) prevent',
                  options: ['Mechanisms: (1) Environmental fluctuations (turbulence, nutrient pulses) prevent', 'they eat different things', 'niche = habitat + food'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "niche = habitat + food" and omit reproductive strategy, temporal activity patterns, and behavioral interactions.' }
          ],
            remediations: { 'niche-habitat-food-and-omit': { steps: ['Revisit Class 9 "Adaptations as Outcomes of Structural Change" (c9_bio_ch4_6) to relink structural adaptations to.', 'Watch a 5-min video on Connell\'s barnacle experiment (Chthamalus/Balanus) — visualize fundamental vs realized niche.', 'Practice writing niche descriptions for 3 Indian species (e.g., lion-tailed macaque, sundari tree, hoolock gibbon).', 'Re-attempt Diagnostic Q2 and Q3.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_13_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "niche = habitat + food" and omit reproductive strategy, temporal activity patterns, and behavioral.',
          parts: [
                { id: 'a', prompt: 'Design a field study to test whether two coexisting frog species in a Western Ghats stream partition their niches by diet, microhabitat, or breeding time.', answer: 'Method: (1) Stomach flushing or fecal metabarcoding for diet composition',
                  options: ['Method: (1) Stomach flushing or fecal metabarcoding for diet composition', 'niche = habitat + food'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "niche = habitat + food" and omit reproductive strategy, temporal activity patterns, and behavioral interactions.' }
          ],
            remediations: { 'niche-habitat-food-and-omit': { steps: ['Revisit Class 9 "Adaptations as Outcomes of Structural Change" (c9_bio_ch4_6) to relink structural adaptations to.', 'Watch a 5-min video on Connell\'s barnacle experiment (Chthamalus/Balanus) — visualize fundamental vs realized niche.', 'Practice writing niche descriptions for 3 Indian species (e.g., lion-tailed macaque, sundari tree, hoolock gibbon).', 'Re-attempt Diagnostic Q2 and Q3.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_13_002', difficulty: 'standard',
          question: 'Abiotic factors are the non-living physical and chemical components of an.',
          hint: 'If stuck, revisit c11_bio_cbse_11_007 (Factors Affecting Photosynthesis: Law of Limiting.',
          misconception: 'Students think "adaptation eliminates the abiotic factor as a limitation." Example: "Camels store water in humps, so.',
          parts: [
                { id: 'a', prompt: 'Define the term \'stenothermal\' and give one example each of a stenothermal animal and a stenothermal plant from Indian ecosystems.', answer: 'Stenothermal organisms tolerate only a narrow temperature range',
                  options: ['Stenothermal organisms tolerate only a narrow temperature range', 'polar bear in India', 'cactus'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "adaptation eliminates the abiotic factor as a limitation." Example: "Camels store water in humps, so water isn\'t limiting.' },
                { id: 'b', prompt: 'Why does a fish die when placed in distilled water, but survive in pond water? Explain using the concept of osmosis and osmoregulation.', answer: 'Distilled water is hypotonic to fish body fluids',
                  options: ['Distilled water is hypotonic to fish body fluids', 'distilled water has no oxygen', 'adaptation eliminates the abiotic factor as a limitation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "adaptation eliminates the abiotic factor as a limitation." Example: "Camels store water in humps, so water isn\'t limiting.' },
                { id: 'c', prompt: 'A farmer in Punjab grows wheat (a long-day plant) and rice (a short-day plant).', answer: 'Wheat (long-day) flowers when day length > critical length (approx',
                  options: ['Wheat (long-day) flowers when day length > critical length (approx', 'rice flowers first', 'adaptation eliminates the abiotic factor as a limitation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "adaptation eliminates the abiotic factor as a limitation." Example: "Camels store water in humps, so water isn\'t limiting.' }
          ],
            remediations: { 'adaptation-eliminates-the-abiotic-factor': { steps: ['Revisit c11_bio_cbse_11_007 (Law of Limiting Factors) — draw the photosynthesis rate vs light/CO₂/temperature curves;.', 'Revisit c11_bio_cbse_13_008 (Seed Dormancy and Germination) — note how water, temperature, light each gate germination.', 'Do the "Factor Limitation Table" exercise: list 5 Indian organisms, for each write the factor that would kill it first.', 'Re-attempt DIAGNOSTIC_QUESTION_5 with this table.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_13_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "adaptation eliminates the abiotic factor as a limitation." Example: "Camels store water in humps, so.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Desert plants have deep roots to access water; therefore, water is the only limiting factor for them." Is this correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'temperature doesn\'t matter', 'adaptation eliminates the abiotic factor as a limitation', 'Camels store water in humps, so water isn\'t limiting for them'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "adaptation eliminates the abiotic factor as a limitation." Example: "Camels store water in humps, so water isn\'t limiting.' }
          ],
            remediations: { 'adaptation-eliminates-the-abiotic-factor': { steps: ['Revisit c11_bio_cbse_11_007 (Law of Limiting Factors) — draw the photosynthesis rate vs light/CO₂/temperature curves;.', 'Revisit c11_bio_cbse_13_008 (Seed Dormancy and Germination) — note how water, temperature, light each gate germination.', 'Do the "Factor Limitation Table" exercise: list 5 Indian organisms, for each write the factor that would kill it first.', 'Re-attempt DIAGNOSTIC_QUESTION_5 with this table.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_006', difficulty: 'standard',
          question: 'Microbes as biocontrol agents are microorganisms (bacteria, fungi, viruses,.',
          hint: 'If stuck, review c11_bio_cbse_02_002 (Monera), c11_bio_cbse_02_005 (Fungi), and.',
          misconception: 'Students often think that "Bacillus thuringiensis" and "Bt cotton" are the same thing.',
          parts: [
                { id: 'a', prompt: 'A farmer applies a Trichoderma-based biofungicide to soil infected with Rhizoctonia solani (causing root rot).', answer: '1) Trichoderma spores germinate and grow rapidly, colonizing the rhizosphere',
                  options: ['1) Trichoderma spores germinate and grow rapidly, colonizing the rhizosphere', 'competition', 'antibiotics'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "Bacillus thuringiensis" and "Bt cotton" are the same thing.' }
          ],
            remediations: { 'bacillus-thuringiensis-and-bt-cotton': { steps: ['Revisit c11_bio_cbse_02_003 (Bacteria: Structure and Reproduction) to recall bacterial spore formation and protein.', 'Re-read the NCERT box on "Bt toxin" in the Microbes in Human Welfare chapter (not the Biotechnology chapter) and make a.', 'Attempt Diagnostic Question 1 and 2 again; if still incorrect, watch a 5-min animation of Bt toxin activation in insect.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "Bacillus thuringiensis" and "Bt cotton" are the same thing.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Microbial biocontrol agents are always safer and more effective than chemical pesticides, so they should completely replace them in.', answer: 'The statement is false',
                  options: ['The statement is false', 'Bacillus thuringiensis', 'Bt cotton', 'Name the microbe used as biocontrol agent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "Bacillus thuringiensis" and "Bt cotton" are the same thing.' }
          ],
            remediations: { 'bacillus-thuringiensis-and-bt-cotton': { steps: ['Revisit c11_bio_cbse_02_003 (Bacteria: Structure and Reproduction) to recall bacterial spore formation and protein.', 'Re-read the NCERT box on "Bt toxin" in the Microbes in Human Welfare chapter (not the Biotechnology chapter) and make a.', 'Attempt Diagnostic Question 1 and 2 again; if still incorrect, watch a 5-min animation of Bt toxin activation in insect.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
