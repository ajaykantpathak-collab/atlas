import type { SimDef } from '../../engine/types';
import C12_BiologyBiodiversityAndConservationSim from '../../../simulations/c6_12/C12_BiologyBiodiversityAndConservationSim';

/** v3 wrapped master — C12_BiologyBiodiversityAndConservationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biologybiodiversityandconservationsim: SimDef = {
    id: 'v3w_c12_biologybiodiversityandconservationsim',
    title: 'Abiotic Factors: Temperature, Water, Light',
    subtitle: 'Covers temperature (eurythermal/stenothermal, thermal stratification), water (osmotic.',
    classLevel: 12, subject: 'biology', topic: 'Abiotic Factors: Temperature, Water, Light',
    chapters: [],
    nodeIds: ['c12_bio_cbse_13_002', 'c12_bio_cbse_06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine standing in the Thar Desert at noon — the sand burns your feet (temperature), your throat is parched.', goal: 'Master Abiotic Factors: Temperature, Water, Light.' },
    discovery: {
        question: 'Define the term \'stenothermal\' and give one example each of a stenothermal animal and a stenothermal plant from Indian ecosystems.',
        options: ['Stenothermal organisms tolerate only a narrow temperature range', 'polar bear in India', 'cactus'],
        answer: 'Stenothermal organisms tolerate only a narrow temperature range',
        hook: 'Students think "adaptation eliminates the abiotic factor as a limitation." Example: "Camels store water in humps, so.',
    },
    teaching: [
        { title: 'Abiotic factors are the non-living physical.', text: 'Abiotic factors are the non-living physical and chemical components of an ecosystem — specifically temperature, water availability, and light intensity — that directly determine the survival,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bio_cbse_13_002', title: 'Abiotic factors are the non-living.',
          scaffold: { problem: 'A population of freshwater prawns (Macrobrachium rosenbergii) is introduced into two ponds in Odisha: Pond A has stable temperature 28°C,.',
            steps: [
            { text: 'Identify the abiotic factors differing between ponds — temperature stability and salinity (water composition).' },
            { text: 'Recall that Macrobrachium rosenbergii is a stenothermal freshwater species — narrow temperature tolerance, low salinity.' },
            { text: 'Apply thermal biology — daily 12°C fluctuation exceeds the species\' optimum range (28-31°C); repeated thermal stress.' },
            { text: 'Apply osmoregulation — 5 ppt salinity is hyperosmotic to prawn haemolymph; energy diverted to active ion transport.' },
            { text: 'Conclude that both factors act synergistically — temperature fluctuation widens the metabolic demand, salinity narrows.', faded: true, blankAnswer: 'Pond B\'s temperature fluctuation (22-34°C) exceeds the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_06_010', title: 'DNA fingerprinting is a molecular.',
          scaffold: { problem: 'A forensic scientist analyses a blood stain from a crime scene. The DNA is degraded.',
            steps: [
            { text: 'Identify that each locus is heterozygous (two different alleles) because the suspect’s profile shows two bands per.' },
            { text: 'For each heterozygous locus, the genotype frequency under HWE is 2 * p * q.' },
            { text: 'Multiply the 13 genotype frequencies together to get the combined RMP.' },
            { text: 'Compute: e.g., locus1: 2*0.12*0.08 = 0.0192; locus2: 2*0.15*0.10 = 0.03; locus3: 2*0.09*0.11 = 0.0198; ...' },
            { text: 'The product is an extremely small number (e.g., ~1 in 10^15). Conclude that the chance of a random unrelated individual.', faded: true, blankAnswer: 'RMP ≈ 1.2 × 10⁻¹⁵ (example value). Interpretation: The.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_06_010', title: 'Identify each idea',
          dissect: { specimen: 'Abiotic Factors: Temperature, Water, Light', spots: [
            { id: 's1', label: 'Abiotic factors are the non-living', prompt: 'Which idea is this? — Abiotic factors are the non-living physical and chemical components of an ecosystem —.', answer: 'Abiotic factors are the non-living', options: ['Abiotic factors are the non-living', 'DNA fingerprinting is a molecular'] },
            { id: 's2', label: 'DNA fingerprinting is a molecular', prompt: 'Which idea is this? — DNA fingerprinting is a molecular technique that identifies individuals by detecting.', answer: 'DNA fingerprinting is a molecular', options: ['DNA fingerprinting is a molecular', 'Abiotic factors are the non-living'] }
          ] } }
    ],
    explore: { component: C12_BiologyBiodiversityAndConservationSim, prompt: 'Explore the interactive — Abiotic Factors: Temperature, Water, Light' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_010', difficulty: 'standard',
          question: 'DNA fingerprinting is a molecular technique that identifies individuals by.',
          hint: 'If stuck, review restriction enzyme recognition sites and gel electrophoresis separation.',
          misconception: 'Students often think DNA fingerprinting examines the entire genome sequence or looks at genes that code for traits.',
          parts: [
                { id: 'a', prompt: 'What type of DNA sequences are primarily targeted in classical DNA fingerprinting using Southern blotting, and why are they suitable for individual.', answer: 'Classical DNA fingerprinting targets Variable Number Tandem Repeats (VNTRs)',
                  options: ['Classical DNA fingerprinting targets Variable Number Tandem Repeats (VNTRs)', 'coding genes', 'single nucleotide polymorphisms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think DNA fingerprinting examines the entire genome sequence or looks at genes that code for traits.' },
                { id: 'b', prompt: 'Why is Southern blotting followed by hybridisation with a labelled probe necessary after gel electrophoresis in VNTR‑based fingerprinting?', answer: 'Ethidium bromide stains all DNA fragments, producing a smear',
                  options: ['Ethidium bromide stains all DNA fragments, producing a smear', 'staining is enough'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think DNA fingerprinting examines the entire genome sequence or looks at genes that code for traits.' }
          ],
            remediations: { 'dna-fingerprinting-examines-the-entire': { steps: ['Revisit the concept of repetitive DNA (satellites, minisatellites, microsatellites) from node c12_bio_cbse_06_002 (DNA.', 'Review Southern blotting steps in c11_biotech_cbse_12_009 (Southern, Northern, Western Blotting).', 'Practice interpreting band patterns with a worksheet: given parental and child profiles, determine inclusion/exclusion.', 'Watch a 5‑minute animation of PCR‑based STR profiling (e.g., from NCERT’s e‑pathshala) to contrast with Southern blot.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
