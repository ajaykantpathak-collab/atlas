// Rich C6 sims wrapped in the full pedagogy loop — hand-tuned per topic.
// Old component = explore.component (bespoke visual); engine adds discovery/teach/challenge/reflect + real nodeIds.

import type { SimDef } from '../../sims_v2/engine/types';

import C6_BiologyLeafStructureTypesSim from './C6_BiologyLeafStructureTypesSim';
import C6_BiologyModesDiseaseTransmissionSim from './C6_BiologyModesDiseaseTransmissionSim';
import C6_BiologyPlantAnimalCellSim from './C6_BiologyPlantAnimalCellSim';
import C6_ChemistryAtomicstructuresubatomicparticlesSim from './C6_ChemistryAtomicstructuresubatomicparticlesSim';
import C6_ChemistryCarbondioxideandnitrogeninairSim from './C6_ChemistryCarbondioxideandnitrogeninairSim';
import C6_ChemistryMatteranditscompositionSim from './C6_ChemistryMatteranditscompositionSim';
import C6_ComputerScienceAlgorithmsDefinitionPropertiesSim from './C6_ComputerScienceAlgorithmsDefinitionPropertiesSim';
import C6_ComputerScienceCategoriesComputersMicroSim from './C6_ComputerScienceCategoriesComputersMicroSim';
import C6_ComputerSciencePowerpointImportingDataSim from './C6_ComputerSciencePowerpointImportingDataSim';
import C6_EVSEnvironmentBioticAbioticSim from './C6_EVSEnvironmentBioticAbioticSim';
import C6_EVSHumanImpactEnvironmentSim from './C6_EVSHumanImpactEnvironmentSim';
import C6_GeographyMapsIntroductionSim from './C6_GeographyMapsIntroductionSim';
import C6_GeographyWaterBodiesOceansSim from './C6_GeographyWaterBodiesOceansSim';
import C6_HistoryCivicsAshokasConversionBuddhismSim from './C6_HistoryCivicsAshokasConversionBuddhismSim';
import C6_HistoryCivicsCompositionMunicipalCorporationSim from './C6_HistoryCivicsCompositionMunicipalCorporationSim';
import C6_HistoryCivicsEarlyVedicPoliticalSim from './C6_HistoryCivicsEarlyVedicPoliticalSim';
import C6_HistoryCivicsHistoryMeaningDefinitionSim from './C6_HistoryCivicsHistoryMeaningDefinitionSim';
import C6_HistoryCivicsIndusValleySocietySim from './C6_HistoryCivicsIndusValleySocietySim';
import C6_HistoryCivicsScientificProgressGuptaSim from './C6_HistoryCivicsScientificProgressGuptaSim';
import C6_HistoryCivicsSpreadDeclineJainismSim from './C6_HistoryCivicsSpreadDeclineJainismSim';
import C6_MathematicsCardinalitySim from './C6_MathematicsCardinalitySim';
import C6_MathematicsCollectionOrganisationDataSim from './C6_MathematicsCollectionOrganisationDataSim';
import C6_MathematicsConsolidatingSenseNumbernessSim from './C6_MathematicsConsolidatingSenseNumbernessSim';
import C6_MathematicsConstructionsDrawingLineSim from './C6_MathematicsConstructionsDrawingLineSim';
import C6_MathematicsIdeaPercentFractionSim from './C6_MathematicsIdeaPercentFractionSim';
import C6_MathematicsLineLineSegmentSim from './C6_MathematicsLineLineSegmentSim';
import C6_MathematicsNumberLineSeeingSim from './C6_MathematicsNumberLineSeeingSim';
import C6_MathematicsPairLinesIntersectingSim from './C6_MathematicsPairLinesIntersectingSim';
import C6_MathematicsPerimeterAndAreaSim from './C6_MathematicsPerimeterAndAreaSim';
import C6_MathematicsPrimeTimeSim from './C6_MathematicsPrimeTimeSim';
import C6_MathematicsPrimeTimeTheIdliVadaSim from './C6_MathematicsPrimeTimeTheIdliVadaSim';
import C6_MathematicsSimplificationBracketsSim from './C6_MathematicsSimplificationBracketsSim';
import C6_MathematicsSymmetrySim from './C6_MathematicsSymmetrySim';
import C6_MathematicsTheOtherSideOfZeroSim from './C6_MathematicsTheOtherSideOfZeroSim';
import C6_PhysicsElectricityCircuitsCBSESim from './C6_PhysicsElectricityCircuitsCBSESim';
import C6_PhysicsPhysicalQuantitiesUnitsSim from './C6_PhysicsPhysicalQuantitiesUnitsSim';
import C6_PhysicsPitchSoundFrequencySim from './C6_PhysicsPitchSoundFrequencySim';
import C6_PhysicsRectilinearPropagationLightSim from './C6_PhysicsRectilinearPropagationLightSim';
import C6_PhysicsUniformNonuniformMotionSim from './C6_PhysicsUniformNonuniformMotionSim';
import C6_ScienceAJourneyThroughStatesOfSim from './C6_ScienceAJourneyThroughStatesOfSim';
import C6_ScienceBeyondEarthSim from './C6_ScienceBeyondEarthSim';
import C6_ScienceBodyMovementsSim from './C6_ScienceBodyMovementsSim';
import C6_ScienceChangesAroundUsSim from './C6_ScienceChangesAroundUsSim';
import C6_ScienceComponentsOfFoodSim from './C6_ScienceComponentsOfFoodSim';
import C6_ScienceDiversityInTheLivingWorldSim from './C6_ScienceDiversityInTheLivingWorldSim';
import C6_ScienceExploringMagnetsSim from './C6_ScienceExploringMagnetsSim';
import C6_ScienceFibreToFabricSim from './C6_ScienceFibreToFabricSim';
import C6_ScienceFoodWhereDoesItComeSim from './C6_ScienceFoodWhereDoesItComeSim';
import C6_ScienceGarbageInGarbageOutSim from './C6_ScienceGarbageInGarbageOutSim';
import C6_ScienceLivingCreaturesExploringTheirCharacteristicsSim from './C6_ScienceLivingCreaturesExploringTheirCharacteristicsSim';
import C6_ScienceMaterialsAroundUsSim from './C6_ScienceMaterialsAroundUsSim';
import C6_ScienceMethodsOfSeparationInEverydaySim from './C6_ScienceMethodsOfSeparationInEverydaySim';
import C6_ScienceMindfulEatingAPathToSim from './C6_ScienceMindfulEatingAPathToSim';
import C6_ScienceNatureSTreasuresSim from './C6_ScienceNatureSTreasuresSim';
import C6_ScienceSeparationOfSubstancesSim from './C6_ScienceSeparationOfSubstancesSim';
import C6_ScienceSortingMaterialsIntoGroupsSim from './C6_ScienceSortingMaterialsIntoGroupsSim';
import C6_ScienceTemperatureAndItsMeasurementSim from './C6_ScienceTemperatureAndItsMeasurementSim';
import C6_ScienceTheLivingOrganismsCharacteristicsAndSim from './C6_ScienceTheLivingOrganismsCharacteristicsAndSim';
import C6_ScienceTheWonderfulWorldOfScienceSim from './C6_ScienceTheWonderfulWorldOfScienceSim';
import C6_SocialScienceGrassrootsDemocracyPart3Sim from './C6_SocialScienceGrassrootsDemocracyPart3Sim';
import C6_SocialScienceGrassrootsDemocracySim from './C6_SocialScienceGrassrootsDemocracySim';
import C6_SocialScienceRuralAdministrationSim from './C6_SocialScienceRuralAdministrationSim';
import C6_SocialScienceRuralLivelihoodsSim from './C6_SocialScienceRuralLivelihoodsSim';

export const w_c6_biologyleafstructuretypessim: SimDef = {
    id: 'w_c6_biologyleafstructuretypessim', title: 'Biology Leaf Structure Types', subtitle: 'How Do Plants Grow? From Seed to Tree',
    classLevel: 6, subject: 'science', topic: 'How Do Plants Grow? From Seed to Tree',
    chapters: ['c6_biology_ch10'],
    nodeIds: ['c6_biology_ch10_001', 'c6_biology_ch10_002', 'c6_biology_ch10_003', 'c6_biology_ch10_004', 'c6_biology_ch10_005', 'c6_biology_ch10_006', 'c6_biology_ch10_007'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: How Do Plants Grow? From Seed to Tree', goal: 'Master How Do Plants Grow? From Seed to Tree' },
    discovery: { question: 'Why does a leaf have a network of veins instead of being a flat sheet?', options: ['Veins carry water and food like tiny pipes', 'Veins are decoration', 'Veins hold the leaf down'], answer: 'Veins carry water and food like tiny pipes', hook: 'Leaf veins are transport pipes — xylem brings water, phloem carries food!' },
    teaching: [{ title: 'Leaf Structure', text: 'A leaf has a blade, a stalk, and veins — veins carry water in and food out, and the stomata breathe.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_BiologyLeafStructureTypesSim, prompt: 'Try the interactive — Leaf Structure' },
    challenges: [{ type: '', nodeId: 'c6_biology_ch10_001', question: 'What do leaf veins do?', answer: 'carry water and food', options: ['carry water and food', 'make seeds', 'attract bees'], hint: 'Think pipes!', misconception: 'Veins are transport — xylem (water up), phloem (food around).', workedExample: ['Veins = pipes.', 'Xylem carries water.', 'Phloem carries food.'] }],
    reflect: { prompts: ['What did you discover about How Do Plants Grow? From Seed to Tree?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_biologymodesdiseasetransmissionsim: SimDef = {
    id: 'w_c6_biologymodesdiseasetransmissionsim', title: 'Biology Modes Disease Transmission', subtitle: 'Nutrition in Animals: The Digestive System',
    classLevel: 6, subject: 'science', topic: 'Nutrition in Animals: The Digestive System',
    chapters: ['c6_biology_ch09'],
    nodeIds: ['c6_biology_ch09_001', 'c6_biology_ch09_002', 'c6_biology_ch09_003', 'c6_biology_ch09_004', 'c6_biology_ch09_005', 'c6_biology_ch09_006', 'c6_biology_ch09_007', 'c6_biology_ch09_008'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Nutrition in Animals: The Digestive System', goal: 'Master Nutrition in Animals: The Digestive System' },
    discovery: { question: 'If a person with a cold sneezes near you, how might you catch it?', options: ['Through air droplets carrying germs', 'By looking at them', 'Only by touching'], answer: 'Through air droplets carrying germs', hook: 'Diseases spread in different ways — air, water, touch, insects. Knowing HOW helps you block it!' },
    teaching: [{ title: 'How Diseases Spread', text: 'Diseases transmit through air (sneeze), water (dirty water), contact (touch), and vectors (mosquitoes).', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_BiologyModesDiseaseTransmissionSim, prompt: 'Try the interactive — How Diseases Spread' },
    challenges: [{ type: '', nodeId: 'c6_biology_ch09_001', question: 'Malaria spreads through:', answer: 'mosquito bites', options: ['mosquito bites', 'dirty water', 'touching'], hint: 'A vector carries it!', misconception: 'Malaria is vector-borne — mosquitoes carry it, not air or water.', workedExample: ['Vector = carrier.', 'Mosquito carries malaria.', 'Vector-borne.'] }],
    reflect: { prompts: ['What did you discover about Nutrition in Animals: The Digestive Syst?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_biologyplantanimalcellsim: SimDef = {
    id: 'w_c6_biologyplantanimalcellsim', title: 'Biology Plant Animal Cell', subtitle: 'How Do Plants Grow? From Seed to Tree',
    classLevel: 6, subject: 'science', topic: 'How Do Plants Grow? From Seed to Tree',
    chapters: ['c6_biology_ch10'],
    nodeIds: ['c6_biology_ch10_001', 'c6_biology_ch10_002', 'c6_biology_ch10_003', 'c6_biology_ch10_004', 'c6_biology_ch10_005', 'c6_biology_ch10_006', 'c6_biology_ch10_007'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: How Do Plants Grow? From Seed to Tree', goal: 'Master How Do Plants Grow? From Seed to Tree' },
    discovery: { question: "A plant cell has a wall but an animal cell doesn't. Why would a plant need that extra wall?", options: ["Plants can't move so they need a rigid shape", 'Plants are bigger', 'Animal cells are stronger'], answer: "Plants can't move so they need a rigid shape", hook: "The cell wall gives plants rigidity — that's why a plant stands tall without a skeleton!" },
    teaching: [{ title: 'Plant vs Animal Cell', text: 'Both have nucleus, cytoplasm, membrane. Plant cells ADD a cell wall, chloroplasts, and a big vacuole.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_BiologyPlantAnimalCellSim, prompt: 'Try the interactive — Plant vs Animal Cell' },
    challenges: [{ type: '', nodeId: 'c6_biology_ch10_001', question: "Which do plant cells have but animal cells don't?", answer: 'cell wall and chloroplasts', options: ['cell wall and chloroplasts', 'nucleus', 'cytoplasm'], hint: 'Think green and rigid!', misconception: 'Cell wall + chloroplasts are plant-only — for support and photosynthesis.', workedExample: ['Wall = support.', 'Chloroplasts = photosynthesis.', 'Plant-only.'] }],
    reflect: { prompts: ['What did you discover about How Do Plants Grow? From Seed to Tree?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_chemistryatomicstructuresubatomicparticlessim: SimDef = {
    id: 'w_c6_chemistryatomicstructuresubatomicparticlessim', title: 'Chemistry Atomicstructuresubatomicparticles', subtitle: 'What Are Materials and Why We Classify Them',
    classLevel: 6, subject: 'science', topic: 'What Are Materials and Why We Classify Them',
    chapters: ['c6_chemistry_ch04'],
    nodeIds: ['c6_chemistry_ch04_001', 'c6_chemistry_ch04_002', 'c6_chemistry_ch04_003', 'c6_chemistry_ch04_004', 'c6_chemistry_ch04_005', 'c6_chemistry_ch04_006', 'c6_chemistry_ch04_007', 'c6_chemistry_ch04_008', 'c6_chemistry_ch04_009', 'c6_chemistry_ch04_010'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: What Are Materials and Why We Classify Them', goal: 'Master What Are Materials and Why We Classify Them' },
    discovery: { question: 'An atom is mostly empty space, yet a wall feels solid. How can that be?', options: ['Electrons move so fast they act like a solid cloud', "Atoms aren't real", "Walls aren't made of atoms"], answer: 'Electrons move so fast they act like a solid cloud', hook: "Atoms are mostly empty — but electrons zip around so fast the 'empty' behaves solid!" },
    teaching: [{ title: 'Inside the Atom', text: 'Atoms have a tiny nucleus (protons + neutrons) with electrons orbiting — most of the atom is empty space.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ChemistryAtomicstructuresubatomicparticlesSim, prompt: 'Try the interactive — Inside the Atom' },
    challenges: [{ type: '', nodeId: 'c6_chemistry_ch04_001', question: 'The nucleus contains:', answer: 'protons and neutrons', options: ['protons and neutrons', 'electrons', 'only protons'], hint: 'The heavy center!', misconception: 'Nucleus = protons + neutrons; electrons orbit outside.', workedExample: ['Center = nucleus.', 'Protons + neutrons inside.', 'Electrons orbit.'] }],
    reflect: { prompts: ['What did you discover about What Are Materials and Why We Classify T?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_chemistrycarbondioxideandnitrogeninairsim: SimDef = {
    id: 'w_c6_chemistrycarbondioxideandnitrogeninairsim', title: 'Chemistry Carbondioxideandnitrogeninair', subtitle: 'What Are Materials and Why We Classify Them',
    classLevel: 6, subject: 'science', topic: 'What Are Materials and Why We Classify Them',
    chapters: ['c6_chemistry_ch04'],
    nodeIds: ['c6_chemistry_ch04_001', 'c6_chemistry_ch04_002', 'c6_chemistry_ch04_003', 'c6_chemistry_ch04_004', 'c6_chemistry_ch04_005', 'c6_chemistry_ch04_006', 'c6_chemistry_ch04_007', 'c6_chemistry_ch04_008', 'c6_chemistry_ch04_009', 'c6_chemistry_ch04_010'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: What Are Materials and Why We Classify Them', goal: 'Master What Are Materials and Why We Classify Them' },
    discovery: { question: "Air is invisible but we know it has nitrogen and CO2. How do we know it's a mixture, not nothing?", options: ['We can test and measure its gases', 'We can see it', 'It has weight only'], answer: 'We can test and measure its gases', hook: 'Air is a mixture — ~78% nitrogen, ~21% oxygen, plus CO2 and more. We prove it with tests!' },
    teaching: [{ title: 'Gases in Air', text: 'Air is a mixture: mostly nitrogen and oxygen, with CO2, water vapor and trace gases — each plays a role.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ChemistryCarbondioxideandnitrogeninairSim, prompt: 'Try the interactive — Gases in Air' },
    challenges: [{ type: '', nodeId: 'c6_chemistry_ch04_001', question: 'The most abundant gas in air is:', answer: 'nitrogen', options: ['nitrogen', 'oxygen', 'carbon dioxide'], hint: 'Not oxygen — the biggest share!', misconception: 'Nitrogen is ~78% of air — the most abundant, not oxygen.', workedExample: ['Air = mixture.', 'Nitrogen ~78%.', 'Oxygen ~21%.'] }],
    reflect: { prompts: ['What did you discover about What Are Materials and Why We Classify T?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_chemistrymatteranditscompositionsim: SimDef = {
    id: 'w_c6_chemistrymatteranditscompositionsim', title: 'Chemistry Matteranditscomposition', subtitle: 'What Are Materials and Why We Classify Them',
    classLevel: 6, subject: 'science', topic: 'What Are Materials and Why We Classify Them',
    chapters: ['c6_chemistry_ch04'],
    nodeIds: ['c6_chemistry_ch04_001', 'c6_chemistry_ch04_002', 'c6_chemistry_ch04_003', 'c6_chemistry_ch04_004', 'c6_chemistry_ch04_005', 'c6_chemistry_ch04_006', 'c6_chemistry_ch04_007', 'c6_chemistry_ch04_008', 'c6_chemistry_ch04_009', 'c6_chemistry_ch04_010'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: What Are Materials and Why We Classify Them', goal: 'Master What Are Materials and Why We Classify Them' },
    discovery: { question: 'Ice, water, and steam are the same substance in different forms. What actually changed?', options: ['How closely the particles are packed and move', 'The material itself', 'Nothing changed'], answer: 'How closely the particles are packed and move', hook: 'Matter is made of particles — how tightly packed they are decides solid, liquid, or gas!' },
    teaching: [{ title: 'States of Matter', text: 'Matter is particles. Solid = tightly packed, liquid = loose, gas = far apart and free-moving.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ChemistryMatteranditscompositionSim, prompt: 'Try the interactive — States of Matter' },
    challenges: [{ type: '', nodeId: 'c6_chemistry_ch04_001', question: 'In a gas, the particles are:', answer: 'far apart and moving freely', options: ['far apart and moving freely', 'tightly packed', 'fixed in place'], hint: 'Think of steam!', misconception: "Gas particles are far apart and free — that's why gases spread out.", workedExample: ['Solid = packed.', 'Gas = far apart.', 'Movement differs.'] }],
    reflect: { prompts: ['What did you discover about What Are Materials and Why We Classify T?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_computersciencealgorithmsdefinitionpropertiessim: SimDef = {
    id: 'w_c6_computersciencealgorithmsdefinitionpropertiessim', title: 'Computer Science Algorithms Definition Properties', subtitle: 'this concept',
    classLevel: 6, subject: 'science', topic: 'this concept',
    chapters: [],
    nodeIds: [],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: this concept', goal: 'Master this concept' },
    discovery: { question: 'A recipe lists steps to bake a cake in exact order. How is that like a computer program?', options: ['Both are algorithms — step-by-step instructions to reach a result', "They're not related", 'Computers eat cake'], answer: 'Both are algorithms — step-by-step instructions to reach a result', hook: 'An algorithm = a precise step-by-step procedure. Recipes, instructions, and code are all algorithms!' },
    teaching: [{ title: 'Algorithms', text: 'An algorithm is a finite set of clear, ordered steps to solve a problem — input, process, output.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ComputerScienceAlgorithmsDefinitionPropertiesSim, prompt: 'Try the interactive — Algorithms' },
    challenges: [{ type: 'mcq', question: 'An algorithm is:', answer: 'a step-by-step procedure to solve a problem', options: ['a step-by-step procedure to solve a problem', 'a computer part', 'a type of code'], hint: 'Ordered steps!', misconception: 'Algorithm = ordered, finite, clear steps that solve a problem.', workedExample: ['Steps in order.', 'Finite + clear.', '= algorithm.'] }],
    reflect: { prompts: ['What did you discover about this concept?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_computersciencecategoriescomputersmicrosim: SimDef = {
    id: 'w_c6_computersciencecategoriescomputersmicrosim', title: 'Computer Science Categories Computers Micro', subtitle: 'this concept',
    classLevel: 6, subject: 'science', topic: 'this concept',
    chapters: [],
    nodeIds: [],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: this concept', goal: 'Master this concept' },
    discovery: { question: "A smartwatch and a supercomputer are both 'computers' — how do they differ?", options: ['By size, power, and purpose — micro to supercomputer', "They don't differ", 'Only by price'], answer: 'By size, power, and purpose — micro to supercomputer', hook: 'Computers range from micro (watch, phone) to supercomputers (weather forecasting) — categorized by power and use!' },
    teaching: [{ title: 'Categories of Computers', text: 'Computers are classified by size and power — microcomputers (phones, PCs), minicomputers, mainframes, supercomputers.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ComputerScienceCategoriesComputersMicroSim, prompt: 'Try the interactive — Categories of Computers' },
    challenges: [{ type: 'mcq', question: 'A supercomputer is used for:', answer: 'complex tasks like weather forecasting', options: ['complex tasks like weather forecasting', 'sending texts', 'gaming only'], hint: 'Biggest and fastest!', misconception: 'Supercomputers handle massive computation — weather, research.', workedExample: ['Micro = small.', 'Super = huge.', 'Classified by power.'] }],
    reflect: { prompts: ['What did you discover about this concept?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_computersciencepowerpointimportingdatasim: SimDef = {
    id: 'w_c6_computersciencepowerpointimportingdatasim', title: 'Computer Science Powerpoint Importing Data', subtitle: 'this concept',
    classLevel: 6, subject: 'science', topic: 'this concept',
    chapters: [],
    nodeIds: [],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: this concept', goal: 'Master this concept' },
    discovery: { question: 'Why import a chart into a presentation instead of re-typing the numbers?', options: ['Importing keeps data linked and accurate — no re-typing errors', "It's faster to type", "You can't import"], answer: 'Importing keeps data linked and accurate — no re-typing errors', hook: 'Importing pulls data straight in — charts, tables, images — keeping it accurate and saving effort!' },
    teaching: [{ title: 'Importing Data', text: 'Importing brings external data (charts, tables, images) into a file — faster and error-free versus re-typing.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ComputerSciencePowerpointImportingDataSim, prompt: 'Try the interactive — Importing Data' },
    challenges: [{ type: 'mcq', question: 'Importing data into a slide:', answer: 'brings external data in directly', options: ['brings external data in directly', 'deletes data', 'only adds text'], hint: 'Pull it in!', misconception: 'Importing inserts external data directly — accurate and efficient.', workedExample: ['Import = bring in.', 'No re-typing.', 'Stays accurate.'] }],
    reflect: { prompts: ['What did you discover about this concept?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_evsenvironmentbioticabioticsim: SimDef = {
    id: 'w_c6_evsenvironmentbioticabioticsim', title: 'E V S Environment Biotic Abiotic', subtitle: 'How Do Plants Grow? From Seed to Tree',
    classLevel: 6, subject: 'science', topic: 'How Do Plants Grow? From Seed to Tree',
    chapters: ['c6_biology_ch10'],
    nodeIds: ['c6_biology_ch10_001', 'c6_biology_ch10_002', 'c6_biology_ch10_003', 'c6_biology_ch10_004', 'c6_biology_ch10_005', 'c6_biology_ch10_006', 'c6_biology_ch10_007'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: How Do Plants Grow? From Seed to Tree', goal: 'Master How Do Plants Grow? From Seed to Tree' },
    discovery: { question: "A rock, a tree, and sunlight are all in a forest. Which are 'living' parts of the environment?", options: ['Only the tree — living things are biotic', 'All three', 'Tree and sunlight'], answer: 'Only the tree — living things are biotic', hook: 'Biotic = living (plants, animals). Abiotic = non-living (water, rock, sunlight). Both shape the environment!' },
    teaching: [{ title: 'Biotic vs Abiotic', text: 'Biotic = living components (organisms). Abiotic = non-living (water, air, soil, sunlight). Together = environment.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_EVSEnvironmentBioticAbioticSim, prompt: 'Try the interactive — Biotic vs Abiotic' },
    challenges: [{ type: '', nodeId: 'c6_biology_ch10_001', question: 'Which is abiotic?', answer: 'sunlight', options: ['sunlight', 'a bird', 'a mushroom'], hint: 'Living or not?', misconception: 'Abiotic = non-living. Sunlight, water, soil are abiotic; birds/mushrooms are biotic.', workedExample: ['Biotic = living.', 'Abiotic = non-living.', 'Sunlight = abiotic.'] }],
    reflect: { prompts: ['What did you discover about How Do Plants Grow? From Seed to Tree?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_evshumanimpactenvironmentsim: SimDef = {
    id: 'w_c6_evshumanimpactenvironmentsim', title: 'E V S Human Impact Environment', subtitle: 'Nature as Our Laboratory',
    classLevel: 6, subject: 'science', topic: 'Nature as Our Laboratory',
    chapters: ['c6_physics_ch02'],
    nodeIds: ['c6_physics_ch02_006', 'c6_physics_ch02_007', 'c6_physics_ch02_008', 'c6_physics_ch02_009', 'c6_physics_ch02_010'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Nature as Our Laboratory', goal: 'Master Nature as Our Laboratory' },
    discovery: { question: 'Cutting forests for farms grows food but destroys habitats. Is human impact always bad?', options: ['Not always — but it must be managed sustainably', 'Always bad', 'Never harmful'], answer: 'Not always — but it must be managed sustainably', hook: 'Humans change the environment — some help, some harm. The key is balancing needs with nature!' },
    teaching: [{ title: 'Human Impact', text: 'Human activities (farming, building, pollution) reshape the environment — some sustainable, some destructive.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_EVSHumanImpactEnvironmentSim, prompt: 'Try the interactive — Human Impact' },
    challenges: [{ type: '', nodeId: 'c6_physics_ch02_006', question: 'Pollution is an example of:', answer: 'harmful human impact', options: ['harmful human impact', 'helpful impact', 'natural change'], hint: 'Does it help or harm?', misconception: 'Pollution harms air/water/soil — a negative human impact needing control.', workedExample: ['Human actions reshape nature.', 'Pollution = harm.', 'Sustainability = balance.'] }],
    reflect: { prompts: ['What did you discover about Nature as Our Laboratory?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_geographymapsintroductionsim: SimDef = {
    id: 'w_c6_geographymapsintroductionsim', title: 'Geography Maps Introduction', subtitle: 'What Makes India Geographically Diverse',
    classLevel: 6, subject: 'social', topic: 'What Makes India Geographically Diverse',
    chapters: ['c6_geography_ch01'],
    nodeIds: ['c6_geography_ch01_001', 'c6_geography_ch01_002', 'c6_geography_ch01_003', 'c6_geography_ch01_004', 'c6_geography_ch01_005', 'c6_geography_ch01_006', 'c6_geography_ch01_007'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: What Makes India Geographically Diverse', goal: 'Master What Makes India Geographically Diverse' },
    discovery: { question: 'Why do we need a map instead of just describing a place in words?', options: ['A map shows position and distance at a glance', 'Maps are prettier', 'Words are too long'], answer: 'A map shows position and distance at a glance', hook: 'A map is a scaled picture of a place — it shows WHERE things are and how far apart!' },
    teaching: [{ title: 'What is a Map', text: 'A map is a representation of an area showing features, distance (scale), and direction — a tool for locating places.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_GeographyMapsIntroductionSim, prompt: 'Try the interactive — What is a Map' },
    challenges: [{ type: '', nodeId: 'c6_geography_ch01_001', question: 'The scale on a map tells you:', answer: 'real distance per map distance', options: ['real distance per map distance', "the map's color", 'the direction'], hint: '1cm = ?km!', misconception: 'Scale converts map distance to real distance — like 1cm = 50km.', workedExample: ['Map = scaled picture.', 'Scale = real distance.', 'Direction = compass.'] }],
    reflect: { prompts: ['What did you discover about What Makes India Geographically Diverse?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_geographywaterbodiesoceanssim: SimDef = {
    id: 'w_c6_geographywaterbodiesoceanssim', title: 'Geography Water Bodies Oceans', subtitle: 'What Makes India Geographically Diverse',
    classLevel: 6, subject: 'social', topic: 'What Makes India Geographically Diverse',
    chapters: ['c6_geography_ch01'],
    nodeIds: ['c6_geography_ch01_001', 'c6_geography_ch01_002', 'c6_geography_ch01_003', 'c6_geography_ch01_004', 'c6_geography_ch01_005', 'c6_geography_ch01_006', 'c6_geography_ch01_007'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: What Makes India Geographically Diverse', goal: 'Master What Makes India Geographically Diverse' },
    discovery: { question: "Earth is called the 'blue planet' — yet most of that water can't be drunk. Why?", options: ['Oceans are salty — fresh water is rare', 'All water is drinkable', "There's no water"], answer: 'Oceans are salty — fresh water is rare', hook: "~97% of Earth's water is salty ocean! Fresh water is a tiny fraction — that's why we conserve it!" },
    teaching: [{ title: 'Water Bodies', text: 'Oceans, seas, rivers, lakes — most water is salty ocean. Fresh water (rivers, lakes, ice) is scarce and precious.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_GeographyWaterBodiesOceansSim, prompt: 'Try the interactive — Water Bodies' },
    challenges: [{ type: '', nodeId: 'c6_geography_ch01_001', question: "Most of Earth's water is:", answer: 'salty ocean water', options: ['salty ocean water', 'fresh river water', 'ice'], hint: 'Think oceans!', misconception: '~97% is ocean salt water; fresh water is a tiny fraction.', workedExample: ['97% ocean.', 'Little fresh water.', 'Conserve it.'] }],
    reflect: { prompts: ['What did you discover about What Makes India Geographically Diverse?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_historycivicsashokasconversionbuddhismsim: SimDef = {
    id: 'w_c6_historycivicsashokasconversionbuddhismsim', title: 'History Civics Ashokas Conversion Buddhism', subtitle: 'The Rise of the Mauryan Empire',
    classLevel: 6, subject: 'social', topic: 'The Rise of the Mauryan Empire',
    chapters: ['c6_history_ch05'],
    nodeIds: ['c6_history_ch05_007', 'c6_history_ch05_008', 'c6_history_ch05_009', 'c6_history_ch05_010', 'c6_history_ch05_011', 'c6_history_ch05_012', 'c6_history_ch05_013', 'c6_history_ch05_014'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: The Rise of the Mauryan Empire', goal: 'Master The Rise of the Mauryan Empire' },
    discovery: { question: 'Emperor Ashoka won the Kalinga war but then gave up war forever. What changed him?', options: ['The suffering he saw made him embrace peace and Buddhism', 'He lost the war', 'He was forced'], answer: 'The suffering he saw made him embrace peace and Buddhism', hook: "After Kalinga's bloodshed, Ashoka chose Buddhism and 'dhamma' — ruling by peace, not conquest!" },
    teaching: [{ title: "Ashoka's Turning Point", text: "The Kalinga war's horror transformed Ashoka — he embraced Buddhism and spread non-violence through edicts.", emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_HistoryCivicsAshokasConversionBuddhismSim, prompt: "Try the interactive — Ashoka's Turning Point" },
    challenges: [{ type: '', nodeId: 'c6_history_ch05_007', question: 'Ashoka embraced Buddhism after:', answer: 'the Kalinga war', options: ['the Kalinga war', 'becoming emperor', 'a famine'], hint: 'A war that changed a king!', misconception: "The Kalinga war's suffering converted Ashoka to Buddhism and peace.", workedExample: ['Kalinga = bloody war.', 'Saw suffering.', 'Chose Buddhism/peace.'] }],
    reflect: { prompts: ['What did you discover about The Rise of the Mauryan Empire?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_historycivicscompositionmunicipalcorporationsim: SimDef = {
    id: 'w_c6_historycivicscompositionmunicipalcorporationsim', title: 'History Civics Composition Municipal Corporation', subtitle: 'What is Grassroots Democracy?',
    classLevel: 6, subject: 'social', topic: 'What is Grassroots Democracy?',
    chapters: ['c6_civics_ch12'],
    nodeIds: ['c6_civics_ch12_015', 'c6_civics_ch12_016', 'c6_civics_ch12_017', 'c6_civics_ch12_018', 'c6_civics_ch12_019', 'c6_civics_ch12_020', 'c6_civics_ch12_021', 'c6_civics_ch12_022'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: What is Grassroots Democracy?', goal: 'Master What is Grassroots Democracy?' },
    discovery: { question: 'Who fixes the roads, water and garbage in a big city?', options: ["The Municipal Corporation — the city's local government", 'The Prime Minister', 'Nobody'], answer: "The Municipal Corporation — the city's local government", hook: 'Cities run on a Municipal Corporation — elected councillors manage water, roads, sanitation!' },
    teaching: [{ title: 'Municipal Corporation', text: "The Municipal Corporation is a city's local government — elected ward councillors run services like water and waste.", emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_HistoryCivicsCompositionMunicipalCorporationSim, prompt: 'Try the interactive — Municipal Corporation' },
    challenges: [{ type: '', nodeId: 'c6_civics_ch12_015', question: 'A Municipal Corporation handles:', answer: 'city services like water and roads', options: ['city services like water and roads', 'national defense', 'making laws for the country'], hint: 'Local city work!', misconception: 'Municipal Corporation = urban local body — water, roads, sanitation.', workedExample: ['City = corporation.', 'Ward councillors elected.', 'Runs services.'] }],
    reflect: { prompts: ['What did you discover about What is Grassroots Democracy??'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_historycivicsearlyvedicpoliticalsim: SimDef = {
    id: 'w_c6_historycivicsearlyvedicpoliticalsim', title: 'History Civics Early Vedic Political', subtitle: 'Introduction to Early Cities in the Subcontin',
    classLevel: 6, subject: 'social', topic: 'Introduction to Early Cities in the Subcontin',
    chapters: ['c6_history_ch04'],
    nodeIds: ['c6_history_ch04_001', 'c6_history_ch04_002', 'c6_history_ch04_003', 'c6_history_ch04_004', 'c6_history_ch04_005', 'c6_history_ch04_006'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Introduction to Early Cities in the Subcontinent', goal: 'Master Introduction to Early Cities in the Subcontinent' },
    discovery: { question: 'Early Vedic society was organized into tribes. How did that shape their politics?', options: ['Tribal councils and chiefs made decisions together', 'One king ruled all', 'There was no organization'], answer: 'Tribal councils and chiefs made decisions together', hook: 'Early Vedic tribes (janas) had assemblies like the sabha and samiti — early forms of shared decision-making!' },
    teaching: [{ title: 'Early Vedic Polity', text: 'Vedic tribes were led by chiefs guided by assemblies (sabha, samiti) — power was shared, not absolute.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_HistoryCivicsEarlyVedicPoliticalSim, prompt: 'Try the interactive — Early Vedic Polity' },
    challenges: [{ type: '', nodeId: 'c6_history_ch04_001', question: 'The sabha and samiti were:', answer: 'tribal assemblies that advised the chief', options: ['tribal assemblies that advised the chief', 'war weapons', 'religious books'], hint: 'Early democracy!', misconception: 'Sabha and samiti were assemblies — early shared decision-making.', workedExample: ['Tribes = janas.', 'Sabha/samiti = assemblies.', 'Shared decisions.'] }],
    reflect: { prompts: ['What did you discover about Introduction to Early Cities in the Subc?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_historycivicshistorymeaningdefinitionsim: SimDef = {
    id: 'w_c6_historycivicshistorymeaningdefinitionsim', title: 'History Civics History Meaning Definition', subtitle: 'Introduction to Early Cities in the Subcontin',
    classLevel: 6, subject: 'social', topic: 'Introduction to Early Cities in the Subcontin',
    chapters: ['c6_history_ch04'],
    nodeIds: ['c6_history_ch04_001', 'c6_history_ch04_002', 'c6_history_ch04_003', 'c6_history_ch04_004', 'c6_history_ch04_005', 'c6_history_ch04_006'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Introduction to Early Cities in the Subcontinent', goal: 'Master Introduction to Early Cities in the Subcontinent' },
    discovery: { question: 'How do we know about kings who lived thousands of years ago when nobody from then is alive?', options: ['Through sources they left — inscriptions, coins, ruins', 'Guessing', 'Stories alone'], answer: 'Through sources they left — inscriptions, coins, ruins', hook: 'History is reconstructed from SOURCES — coins, inscriptions, monuments, texts — clues from the past!' },
    teaching: [{ title: 'What is History', text: 'History is the study of the past using sources — inscriptions, coins, artifacts, texts — to reconstruct what happened.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_HistoryCivicsHistoryMeaningDefinitionSim, prompt: 'Try the interactive — What is History' },
    challenges: [{ type: '', nodeId: 'c6_history_ch04_001', question: 'A source in history is:', answer: 'evidence from the past like coins or inscriptions', options: ['evidence from the past like coins or inscriptions', "a river's start", 'a book about today'], hint: 'Clues left behind!', misconception: 'Sources = evidence (coins, inscriptions, ruins) historians use.', workedExample: ['Sources = evidence.', 'Coins, inscriptions.', 'Rebuild the past.'] }],
    reflect: { prompts: ['What did you discover about Introduction to Early Cities in the Subc?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_historycivicsindusvalleysocietysim: SimDef = {
    id: 'w_c6_historycivicsindusvalleysocietysim', title: 'History Civics Indus Valley Society', subtitle: 'Introduction to Early Cities in the Subcontin',
    classLevel: 6, subject: 'social', topic: 'Introduction to Early Cities in the Subcontin',
    chapters: ['c6_history_ch04'],
    nodeIds: ['c6_history_ch04_001', 'c6_history_ch04_002', 'c6_history_ch04_003', 'c6_history_ch04_004', 'c6_history_ch04_005', 'c6_history_ch04_006'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Introduction to Early Cities in the Subcontinent', goal: 'Master Introduction to Early Cities in the Subcontinent' },
    discovery: { question: 'The Harappans built cities with grid streets and covered drains 4000 years ago. What does that tell us?', options: ['They had advanced urban planning', 'They copied others', 'They were primitive'], answer: 'They had advanced urban planning', hook: 'Harappan cities had planned grids, drainage, and the Great Bath — remarkably modern urban design!' },
    teaching: [{ title: 'Indus Valley Civilisation', text: 'The Harappan civilisation built planned cities (Harappa, Mohenjo-daro) with drainage, grids, and trade.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_HistoryCivicsIndusValleySocietySim, prompt: 'Try the interactive — Indus Valley Civilisation' },
    challenges: [{ type: '', nodeId: 'c6_history_ch04_001', question: 'Harappan cities are famous for:', answer: 'grid streets and drainage systems', options: ['grid streets and drainage systems', 'huge palaces', 'castles'], hint: 'Think town planning!', misconception: 'Harappa = planned cities with grids, drains, Great Bath.', workedExample: ['Grid streets.', 'Covered drains.', 'Advanced planning.'] }],
    reflect: { prompts: ['What did you discover about Introduction to Early Cities in the Subc?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_historycivicsscientificprogressguptasim: SimDef = {
    id: 'w_c6_historycivicsscientificprogressguptasim', title: 'History Civics Scientific Progress Gupta', subtitle: 'Babur and the Founding of the Mughal Empire',
    classLevel: 6, subject: 'social', topic: 'Babur and the Founding of the Mughal Empire',
    chapters: ['c6_history_ch09'],
    nodeIds: ['c6_history_ch09_033', 'c6_history_ch09_034', 'c6_history_ch09_035', 'c6_history_ch09_036', 'c6_history_ch09_037', 'c6_history_ch09_038'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Babur and the Founding of the Mughal Empire', goal: 'Master Babur and the Founding of the Mughal Empire' },
    discovery: { question: 'The concept of ZERO as a number was formalized in ancient India. Why was that world-changing?', options: ['Zero enabled place-value math and modern arithmetic', 'It was just a symbol', 'It made counting harder'], answer: 'Zero enabled place-value math and modern arithmetic', hook: "The Gupta era gave us zero, decimal system, and advances in astronomy — the 'golden age' of Indian science!" },
    teaching: [{ title: 'Gupta Golden Age', text: 'The Gupta period saw breakthroughs in math (zero, decimals), astronomy, and metallurgy — a scientific golden age.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_HistoryCivicsScientificProgressGuptaSim, prompt: 'Try the interactive — Gupta Golden Age' },
    challenges: [{ type: '', nodeId: 'c6_history_ch09_033', question: "The Gupta period is called a 'golden age' because of:", answer: 'advances in science and math like zero', options: ['advances in science and math like zero', 'gold coins only', 'wars'], hint: 'Zero was born here!', misconception: 'Gupta era = scientific flowering — zero, decimal math, astronomy.', workedExample: ['Zero invented.', 'Decimal system.', 'Golden age.'] }],
    reflect: { prompts: ['What did you discover about Babur and the Founding of the Mughal Emp?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_historycivicsspreaddeclinejainismsim: SimDef = {
    id: 'w_c6_historycivicsspreaddeclinejainismsim', title: 'History Civics Spread Decline Jainism', subtitle: 'Introduction to the Medieval Period',
    classLevel: 6, subject: 'social', topic: 'Introduction to the Medieval Period',
    chapters: ['c6_history_ch06'],
    nodeIds: ['c6_history_ch06_015', 'c6_history_ch06_016', 'c6_history_ch06_017', 'c6_history_ch06_018', 'c6_history_ch06_019', 'c6_history_ch06_020'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Introduction to the Medieval Period', goal: 'Master Introduction to the Medieval Period' },
    discovery: { question: 'Jainism taught non-violence so strictly that monks swept the ground to avoid harming insects. Why did it spread then decline?', options: ['It spread via trade but declined as Buddhism and Hinduism grew', 'It was banned', 'It never spread'], answer: 'It spread via trade but declined as Buddhism and Hinduism grew', hook: "Jainism's strict non-violence attracted merchants, but rival faiths and its austerity limited its growth!" },
    teaching: [{ title: 'Jainism', text: 'Jainism (Mahavira) taught extreme non-violence and self-discipline — it spread then declined as other faiths grew.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_HistoryCivicsSpreadDeclineJainismSim, prompt: 'Try the interactive — Jainism' },
    challenges: [{ type: '', nodeId: 'c6_history_ch06_015', question: "Jainism's core teaching is:", answer: 'complete non-violence (ahimsa)', options: ['complete non-violence (ahimsa)', 'conquest', 'wealth'], hint: 'Harm nothing!', misconception: 'Jainism centers on ahimsa — absolute non-violence to all living things.', workedExample: ['Ahimsa = non-violence.', 'Mahavira founded it.', 'Spread then declined.'] }],
    reflect: { prompts: ['What did you discover about Introduction to the Medieval Period?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_mathematicscardinalitysim: SimDef = {
    id: 'w_c6_mathematicscardinalitysim', title: 'Mathematics Cardinality', subtitle: 'Numbers in Our Everyday Life',
    classLevel: 6, subject: 'maths', topic: 'Numbers in Our Everyday Life',
    chapters: ['c6_math_ch01'],
    nodeIds: ['c6_math_ch01_001', 'c6_math_ch01_002', 'c6_math_ch01_003', 'c6_math_ch01_004', 'c6_math_ch01_005', 'c6_math_ch01_006', 'c6_math_ch01_007', 'c6_math_ch01_008', 'c6_math_ch01_009', 'c6_math_ch01_010', 'c6_math_ch01_011', 'c6_math_ch01_012', 'c6_math_ch01_013', 'c6_math_ch01_014', 'c6_math_ch01_015'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Numbers in Our Everyday Life', goal: 'Master Numbers in Our Everyday Life' },
    discovery: { question: 'If two classrooms have the same number of students, how can you tell without counting each one?', options: ['Match them one-to-one — same cardinality', 'Guess', "They can't be compared"], answer: 'Match them one-to-one — same cardinality', hook: 'Cardinality = the SIZE of a set. Pairing objects one-to-one compares sizes without counting!' },
    teaching: [{ title: 'Cardinality', text: 'Cardinality is how many things are in a set. One-to-one matching shows two sets are equal without counting.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_MathematicsCardinalitySim, prompt: 'Try the interactive — Cardinality' },
    challenges: [{ type: '', nodeId: 'c6_math_ch01_001', question: 'Cardinality means:', answer: 'the number of elements in a set', options: ['the number of elements in a set', 'the order of numbers', 'the largest number'], hint: 'How many!', misconception: 'Cardinality = set size — the count of elements.', workedExample: ['Cardinality = size.', 'One-to-one matching.', 'Compare sets.'] }],
    reflect: { prompts: ['What did you discover about Numbers in Our Everyday Life?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_mathematicscollectionorganisationdatasim: SimDef = {
    id: 'w_c6_mathematicscollectionorganisationdatasim', title: 'Mathematics Collection Organisation Data', subtitle: 'Introduction to Data',
    classLevel: 6, subject: 'maths', topic: 'Introduction to Data',
    chapters: ['c6_math_ch09'],
    nodeIds: ['c6_math_ch09_095', 'c6_math_ch09_096', 'c6_math_ch09_097', 'c6_math_ch09_098', 'c6_math_ch09_099', 'c6_math_ch09_100', 'c6_math_ch09_101', 'c6_math_ch09_102', 'c6_math_ch09_103', 'c6_math_ch09_104'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Introduction to Data', goal: 'Master Introduction to Data' },
    discovery: { question: 'A shopkeeper notes every sale on paper. How can they quickly see which item sells most?', options: ['Organize the data into a table or graph', 'Read every receipt again', "They can't know"], answer: 'Organize the data into a table or graph', hook: 'Data becomes useful when organized — tally marks, tables, and graphs turn raw numbers into insight!' },
    teaching: [{ title: 'Handling Data', text: 'Data is collected then organized — tally marks, tables, pictographs, and bar graphs reveal patterns.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_MathematicsCollectionOrganisationDataSim, prompt: 'Try the interactive — Handling Data' },
    challenges: [{ type: '', nodeId: 'c6_math_ch09_095', question: 'A tally mark of 5 is drawn as:', answer: 'four lines plus a diagonal', options: ['four lines plus a diagonal', 'five dots', 'the number 5'], hint: 'Think of the gate shape!', misconception: 'Tally of 5 = four vertical lines crossed by a diagonal.', workedExample: ['Data needs organizing.', 'Tally = groups of 5.', 'Graphs show patterns.'] }],
    reflect: { prompts: ['What did you discover about Introduction to Data?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_mathematicsconsolidatingsensenumbernesssim: SimDef = {
    id: 'w_c6_mathematicsconsolidatingsensenumbernesssim', title: 'Mathematics Consolidating Sense Numberness', subtitle: 'Numbers in Our Everyday Life',
    classLevel: 6, subject: 'maths', topic: 'Numbers in Our Everyday Life',
    chapters: ['c6_math_ch01'],
    nodeIds: ['c6_math_ch01_001', 'c6_math_ch01_002', 'c6_math_ch01_003', 'c6_math_ch01_004', 'c6_math_ch01_005', 'c6_math_ch01_006', 'c6_math_ch01_007', 'c6_math_ch01_008', 'c6_math_ch01_009', 'c6_math_ch01_010', 'c6_math_ch01_011', 'c6_math_ch01_012', 'c6_math_ch01_013', 'c6_math_ch01_014', 'c6_math_ch01_015'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Numbers in Our Everyday Life', goal: 'Master Numbers in Our Everyday Life' },
    discovery: { question: "You can estimate a crowd is 'about 200' without counting. What number sense lets you do that?", options: ['Estimation — a feel for size and rounding', 'Exact counting', 'Memorizing'], answer: 'Estimation — a feel for size and rounding', hook: 'Number sense = understanding size, estimation, and relationships — not just counting but FEELING numbers!' },
    teaching: [{ title: 'Number Sense', text: 'Number sense is an intuitive feel for size, estimation, and how numbers relate — beyond mechanical counting.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_MathematicsConsolidatingSenseNumbernessSim, prompt: 'Try the interactive — Number Sense' },
    challenges: [{ type: '', nodeId: 'c6_math_ch01_001', question: 'Estimating a crowd uses:', answer: 'number sense and rounding', options: ['number sense and rounding', 'exact counting', 'measuring tools'], hint: 'About how many!', misconception: 'Estimation uses number sense — a feel for size without exact counting.', workedExample: ['Estimate ≈ close guess.', 'Number sense = feel.', 'Not exact counting.'] }],
    reflect: { prompts: ['What did you discover about Numbers in Our Everyday Life?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_mathematicsconstructionsdrawinglinesim: SimDef = {
    id: 'w_c6_mathematicsconstructionsdrawinglinesim', title: 'Mathematics Constructions Drawing Line', subtitle: 'Introduction to Geometric Construction',
    classLevel: 6, subject: 'maths', topic: 'Introduction to Geometric Construction',
    chapters: ['c6_math_ch11'],
    nodeIds: ['c6_math_ch11_113', 'c6_math_ch11_114', 'c6_math_ch11_115', 'c6_math_ch11_116', 'c6_math_ch11_117', 'c6_math_ch11_118', 'c6_math_ch11_119', 'c6_math_ch11_120'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Introduction to Geometric Construction', goal: 'Master Introduction to Geometric Construction' },
    discovery: { question: 'How do you draw a perfect 5cm line segment without guessing?', options: ['Use a ruler marked to exactly 5cm', 'Estimate by eye', 'Fold the paper'], answer: 'Use a ruler marked to exactly 5cm', hook: 'Constructions use ruler and compass for EXACT shapes — no measuring-by-eye allowed!' },
    teaching: [{ title: 'Geometric Construction', text: 'Constructions build exact figures — lines, angles, circles — using only a ruler and compass.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_MathematicsConstructionsDrawingLineSim, prompt: 'Try the interactive — Geometric Construction' },
    challenges: [{ type: '', nodeId: 'c6_math_ch11_113', question: 'A line segment differs from a line because it:', answer: 'has two fixed endpoints', options: ['has two fixed endpoints', 'goes on forever', 'is curved'], hint: 'Segment = bounded!', misconception: 'A segment has two endpoints; a line extends infinitely both ways.', workedExample: ['Segment = 2 endpoints.', 'Line = infinite.', 'Ray = one endpoint.'] }],
    reflect: { prompts: ['What did you discover about Introduction to Geometric Construction?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_mathematicsideapercentfractionsim: SimDef = {
    id: 'w_c6_mathematicsideapercentfractionsim', title: 'Mathematics Idea Percent Fraction', subtitle: 'Introduction to Fractions',
    classLevel: 6, subject: 'maths', topic: 'Introduction to Fractions',
    chapters: ['c6_math_ch03'],
    nodeIds: ['c6_math_ch03_029', 'c6_math_ch03_030', 'c6_math_ch03_031', 'c6_math_ch03_032', 'c6_math_ch03_033', 'c6_math_ch03_034', 'c6_math_ch03_035', 'c6_math_ch03_036', 'c6_math_ch03_037', 'c6_math_ch03_038', 'c6_math_ch03_039', 'c6_math_ch03_040', 'c6_math_ch03_041'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Introduction to Fractions', goal: 'Master Introduction to Fractions' },
    discovery: { question: "A 50% off sale and a 'half price' sale — are they the same?", options: ['Yes — 50% means half (50/100)', 'No, 50% is more', 'No, half is more'], answer: 'Yes — 50% means half (50/100)', hook: "Percent = 'out of 100'. 50% = 50/100 = 1/2 — percentages are just fractions in disguise!" },
    teaching: [{ title: 'Percent and Fractions', text: 'Percent means per hundred — 50% = 1/2, 25% = 1/4. Percentages and fractions are interchangeable.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_MathematicsIdeaPercentFractionSim, prompt: 'Try the interactive — Percent and Fractions' },
    challenges: [{ type: '', nodeId: 'c6_math_ch03_029', question: '75% as a fraction is:', answer: '3/4', options: ['3/4', '7/5', '3/5'], hint: '75 out of 100 simplifies!', misconception: '75% = 75/100 = 3/4 — divide top and bottom by 25.', workedExample: ['75/100.', 'Divide by 25.', '= 3/4.'] }],
    reflect: { prompts: ['What did you discover about Introduction to Fractions?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_mathematicslinelinesegmentsim: SimDef = {
    id: 'w_c6_mathematicslinelinesegmentsim', title: 'Mathematics Line Line Segment', subtitle: 'Introduction to Geometry: Points, Lines, Line',
    classLevel: 6, subject: 'maths', topic: 'Introduction to Geometry: Points, Lines, Line',
    chapters: ['c6_math_ch07'],
    nodeIds: ['c6_math_ch07_070', 'c6_math_ch07_071', 'c6_math_ch07_072', 'c6_math_ch07_073', 'c6_math_ch07_074', 'c6_math_ch07_075', 'c6_math_ch07_076', 'c6_math_ch07_077', 'c6_math_ch07_078', 'c6_math_ch07_079', 'c6_math_ch07_080', 'c6_math_ch07_081', 'c6_math_ch07_082', 'c6_math_ch07_083', 'c6_math_ch07_084'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Introduction to Geometry: Points, Lines, Line Segments', goal: 'Master Introduction to Geometry: Points, Lines, Line Segm' },
    discovery: { question: "A laser beam and a ruler edge both look straight. Which one is a 'line' in geometry?", options: ['Neither fully — a line extends infinitely, unlike both', 'The laser', 'The ruler'], answer: 'Neither fully — a line extends infinitely, unlike both', hook: 'A line goes on forever both ways; a segment has two ends; a ray has one end and goes on!' },
    teaching: [{ title: 'Lines and Segments', text: 'Line = infinite both ways. Segment = two endpoints. Ray = one endpoint, infinite the other way.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_MathematicsLineLineSegmentSim, prompt: 'Try the interactive — Lines and Segments' },
    challenges: [{ type: '', nodeId: 'c6_math_ch07_070', question: 'A ray has:', answer: 'one endpoint and extends infinitely', options: ['one endpoint and extends infinitely', 'two endpoints', 'no endpoints'], hint: 'Like a sunbeam!', misconception: 'A ray starts at one point and extends infinitely in one direction.', workedExample: ['Line = infinite.', 'Segment = 2 ends.', 'Ray = 1 end.'] }],
    reflect: { prompts: ['What did you discover about Introduction to Geometry: Points, Lines,?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_mathematicsnumberlineseeingsim: SimDef = {
    id: 'w_c6_mathematicsnumberlineseeingsim', title: 'Mathematics Number Line Seeing', subtitle: 'Introduction to Integers',
    classLevel: 6, subject: 'maths', topic: 'Introduction to Integers',
    chapters: ['c6_math_ch02'],
    nodeIds: ['c6_math_ch02_016', 'c6_math_ch02_017', 'c6_math_ch02_018', 'c6_math_ch02_019', 'c6_math_ch02_020', 'c6_math_ch02_021', 'c6_math_ch02_022', 'c6_math_ch02_023', 'c6_math_ch02_024', 'c6_math_ch02_025', 'c6_math_ch02_026', 'c6_math_ch02_027', 'c6_math_ch02_028'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Introduction to Integers', goal: 'Master Introduction to Integers' },
    discovery: { question: 'Where does -3 sit relative to +2 on the number line — and which is bigger?', options: ['-3 is left of +2, so +2 is bigger', '-3 is bigger', "They're equal"], answer: '-3 is left of +2, so +2 is bigger', hook: 'On a number line, right = bigger, left = smaller. Negative numbers sit LEFT of zero!' },
    teaching: [{ title: 'The Number Line', text: 'The number line places numbers in order — right is bigger, left is smaller, negatives are left of zero.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_MathematicsNumberLineSeeingSim, prompt: 'Try the interactive — The Number Line' },
    challenges: [{ type: '', nodeId: 'c6_math_ch02_016', question: 'On a number line, moving right means numbers get:', answer: 'bigger', options: ['bigger', 'smaller', 'negative'], hint: 'Right = up!', misconception: 'Numbers increase to the right and decrease to the left on a number line.', workedExample: ['Right = bigger.', 'Left = smaller.', 'Negatives left of 0.'] }],
    reflect: { prompts: ['What did you discover about Introduction to Integers?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_mathematicspairlinesintersectingsim: SimDef = {
    id: 'w_c6_mathematicspairlinesintersectingsim', title: 'Mathematics Pair Lines Intersecting', subtitle: 'Introduction to Geometry: Points, Lines, Line',
    classLevel: 6, subject: 'maths', topic: 'Introduction to Geometry: Points, Lines, Line',
    chapters: ['c6_math_ch07'],
    nodeIds: ['c6_math_ch07_070', 'c6_math_ch07_071', 'c6_math_ch07_072', 'c6_math_ch07_073', 'c6_math_ch07_074', 'c6_math_ch07_075', 'c6_math_ch07_076', 'c6_math_ch07_077', 'c6_math_ch07_078', 'c6_math_ch07_079', 'c6_math_ch07_080', 'c6_math_ch07_081', 'c6_math_ch07_082', 'c6_math_ch07_083', 'c6_math_ch07_084'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Introduction to Geometry: Points, Lines, Line Segments', goal: 'Master Introduction to Geometry: Points, Lines, Line Segm' },
    discovery: { question: "Railway tracks never meet, but a crossroads does. What's the geometric difference?", options: ['Tracks are parallel (never meet); roads are intersecting', 'Both are parallel', 'Both intersect'], answer: 'Tracks are parallel (never meet); roads are intersecting', hook: 'Parallel lines never meet (same direction); intersecting lines cross; perpendicular lines cross at 90°!' },
    teaching: [{ title: 'Pairs of Lines', text: 'Parallel lines never intersect. Intersecting lines cross. Perpendicular lines cross at a right angle (90°).', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_MathematicsPairLinesIntersectingSim, prompt: 'Try the interactive — Pairs of Lines' },
    challenges: [{ type: '', nodeId: 'c6_math_ch07_070', question: 'Perpendicular lines meet at:', answer: 'a 90° right angle', options: ['a 90° right angle', 'any angle', 'no angle'], hint: 'The corner of a square!', misconception: 'Perpendicular = intersecting at exactly 90°.', workedExample: ['Parallel = never meet.', 'Intersecting = cross.', 'Perpendicular = 90°.'] }],
    reflect: { prompts: ['What did you discover about Introduction to Geometry: Points, Lines,?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_mathematicsperimeterandareasim: SimDef = {
    id: 'w_c6_mathematicsperimeterandareasim', title: 'Mathematics Perimeter And Area', subtitle: 'Introduction to Perimeter',
    classLevel: 6, subject: 'maths', topic: 'Introduction to Perimeter',
    chapters: ['c6_math_ch08'],
    nodeIds: ['c6_math_ch08_085', 'c6_math_ch08_086', 'c6_math_ch08_087', 'c6_math_ch08_088', 'c6_math_ch08_089', 'c6_math_ch08_090', 'c6_math_ch08_091', 'c6_math_ch08_092', 'c6_math_ch08_093', 'c6_math_ch08_094'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Introduction to Perimeter', goal: 'Master Introduction to Perimeter' },
    discovery: { question: 'A fence around a garden vs the grass inside it — which is perimeter and which is area?', options: ['Fence = perimeter (boundary); grass = area (inside)', 'Both are area', 'Both are perimeter'], answer: 'Fence = perimeter (boundary); grass = area (inside)', hook: 'Perimeter = distance AROUND the edge; area = space INSIDE. Fencing needs perimeter; sod needs area!' },
    teaching: [{ title: 'Perimeter and Area', text: 'Perimeter = total boundary length (2(l+w)). Area = space inside (l×w). They measure different things!', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_MathematicsPerimeterAndAreaSim, prompt: 'Try the interactive — Perimeter and Area' },
    challenges: [{ type: '', nodeId: 'c6_math_ch08_085', question: 'Perimeter of a 5cm × 3cm rectangle:', answer: '16 cm', options: ['16 cm', '15 cm', '8 cm'], hint: 'Add all four sides!', misconception: 'Perimeter = 2×(5+3) = 2×8 = 16 cm.', workedExample: ['2×(5+3).', '2×8.', '= 16 cm.'] }],
    reflect: { prompts: ['What did you discover about Introduction to Perimeter?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_mathematicsprimetimesim: SimDef = {
    id: 'w_c6_mathematicsprimetimesim', title: 'Mathematics Prime Time', subtitle: 'Numbers in Our Everyday Life',
    classLevel: 6, subject: 'maths', topic: 'Numbers in Our Everyday Life',
    chapters: ['c6_math_ch01'],
    nodeIds: ['c6_math_ch01_001', 'c6_math_ch01_002', 'c6_math_ch01_003', 'c6_math_ch01_004', 'c6_math_ch01_005', 'c6_math_ch01_006', 'c6_math_ch01_007', 'c6_math_ch01_008', 'c6_math_ch01_009', 'c6_math_ch01_010', 'c6_math_ch01_011', 'c6_math_ch01_012', 'c6_math_ch01_013', 'c6_math_ch01_014', 'c6_math_ch01_015'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Numbers in Our Everyday Life', goal: 'Master Numbers in Our Everyday Life' },
    discovery: { question: "Why can't 7 be split into a multiplication of smaller whole numbers?", options: ['7 is prime — only 1 and 7 divide it', '7 is too big', 'It can be split'], answer: '7 is prime — only 1 and 7 divide it', hook: "Prime numbers have exactly two factors — 1 and itself. They're the 'atoms' of multiplication!" },
    teaching: [{ title: 'Prime Numbers', text: "A prime has exactly two factors (1 and itself). 7 is prime; 8 isn't (2×4). Primes can't be split further.", emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_MathematicsPrimeTimeSim, prompt: 'Try the interactive — Prime Numbers' },
    challenges: [{ type: '', nodeId: 'c6_math_ch01_001', question: 'Which number is prime?', answer: '11', options: ['11', '12', '9'], hint: 'Only divisible by 1 and itself!', misconception: '11 = 1×11 only. 12 = 2×6, 9 = 3×3 — those are composite.', workedExample: ['Prime = 2 factors.', '11 = 1×11.', 'Composite = more.'] }],
    reflect: { prompts: ['What did you discover about Numbers in Our Everyday Life?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_mathematicsprimetimetheidlivadasim: SimDef = {
    id: 'w_c6_mathematicsprimetimetheidlivadasim', title: 'Mathematics Prime Time The Idli Vada', subtitle: 'Numbers in Our Everyday Life',
    classLevel: 6, subject: 'maths', topic: 'Numbers in Our Everyday Life',
    chapters: ['c6_math_ch01'],
    nodeIds: ['c6_math_ch01_001', 'c6_math_ch01_002', 'c6_math_ch01_003', 'c6_math_ch01_004', 'c6_math_ch01_005', 'c6_math_ch01_006', 'c6_math_ch01_007', 'c6_math_ch01_008', 'c6_math_ch01_009', 'c6_math_ch01_010', 'c6_math_ch01_011', 'c6_math_ch01_012', 'c6_math_ch01_013', 'c6_math_ch01_014', 'c6_math_ch01_015'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Numbers in Our Everyday Life', goal: 'Master Numbers in Our Everyday Life' },
    discovery: { question: 'If idlis come in plates of 3 and vadas in plates of 4, when do both come out equal counts?', options: ['At 12 — the LCM of 3 and 4', 'At 7', 'Never'], answer: 'At 12 — the LCM of 3 and 4', hook: 'The smallest number both divide into is the LCM — it finds when cycles line up!' },
    teaching: [{ title: 'LCM and HCF', text: 'LCM = smallest common multiple (when things sync). HCF = largest common factor (biggest shared divisor).', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_MathematicsPrimeTimeTheIdliVadaSim, prompt: 'Try the interactive — LCM and HCF' },
    challenges: [{ type: '', nodeId: 'c6_math_ch01_001', question: 'The LCM of 3 and 4 is:', answer: '12', options: ['12', '7', '1'], hint: 'Smallest number both reach!', misconception: 'Multiples of 3: 3,6,9,12. Of 4: 4,8,12. First common = 12.', workedExample: ['3: 3,6,9,12.', '4: 4,8,12.', 'LCM = 12.'] }],
    reflect: { prompts: ['What did you discover about Numbers in Our Everyday Life?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_mathematicssimplificationbracketssim: SimDef = {
    id: 'w_c6_mathematicssimplificationbracketssim', title: 'Mathematicsplification Brackets', subtitle: 'Introduction to Algebra: Variables and Consta',
    classLevel: 6, subject: 'maths', topic: 'Introduction to Algebra: Variables and Consta',
    chapters: ['c6_math_ch05'],
    nodeIds: ['c6_math_ch05_052', 'c6_math_ch05_053', 'c6_math_ch05_054', 'c6_math_ch05_055', 'c6_math_ch05_056', 'c6_math_ch05_057', 'c6_math_ch05_058', 'c6_math_ch05_059', 'c6_math_ch05_060', 'c6_math_ch05_061'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Introduction to Algebra: Variables and Constants', goal: 'Master Introduction to Algebra: Variables and Constants' },
    discovery: { question: "In 2 + 3 × 4, why isn't the answer 20?", options: ['Multiplication comes before addition (BODMAS)', 'It is 20', 'Left to right always'], answer: 'Multiplication comes before addition (BODMAS)', hook: 'Order of operations! × and ÷ before + and −. 2 + 3×4 = 2 + 12 = 14, not 20!' },
    teaching: [{ title: 'Order of Operations', text: 'BODMAS: Brackets, Orders, Division, Multiplication, Addition, Subtraction — solve in that order.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_MathematicsSimplificationBracketsSim, prompt: 'Try the interactive — Order of Operations' },
    challenges: [{ type: '', nodeId: 'c6_math_ch05_052', question: 'Solve: 2 + 3 × 4', answer: '14', options: ['14', '20', '24'], hint: 'Multiply first!', misconception: '3×4 = 12 first, then 2+12 = 14. BODMAS puts multiplication before addition.', workedExample: ['3×4 = 12.', '2 + 12.', '= 14.'] }],
    reflect: { prompts: ['What did you discover about Introduction to Algebra: Variables and C?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_mathematicssymmetrysim: SimDef = {
    id: 'w_c6_mathematicssymmetrysim', title: 'Mathematics Symmetry', subtitle: 'Introduction to Symmetry',
    classLevel: 6, subject: 'maths', topic: 'Introduction to Symmetry',
    chapters: ['c6_math_ch10'],
    nodeIds: ['c6_math_ch10_105', 'c6_math_ch10_106', 'c6_math_ch10_107', 'c6_math_ch10_108', 'c6_math_ch10_109', 'c6_math_ch10_110', 'c6_math_ch10_111', 'c6_math_ch10_112'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Introduction to Symmetry', goal: 'Master Introduction to Symmetry' },
    discovery: { question: "Why does a butterfly look 'balanced' but a scribble doesn't?", options: ['The butterfly has symmetry — matching halves', "It's just prettier", 'It has more colors'], answer: 'The butterfly has symmetry — matching halves', hook: 'Symmetry means one half mirrors the other — a line of symmetry splits a shape into identical halves!' },
    teaching: [{ title: 'Symmetry', text: 'A shape is symmetric if a line divides it into two mirror-image halves. Butterflies, squares, and faces show it.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_MathematicsSymmetrySim, prompt: 'Try the interactive — Symmetry' },
    challenges: [{ type: '', nodeId: 'c6_math_ch10_105', question: 'A line of symmetry divides a shape into:', answer: 'two mirror-image halves', options: ['two mirror-image halves', 'three parts', 'unequal parts'], hint: 'Like folding paper!', misconception: 'A line of symmetry splits a shape into two identical mirror halves.', workedExample: ['Fold in half.', 'Halves match.', '= symmetry.'] }],
    reflect: { prompts: ['What did you discover about Introduction to Symmetry?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_mathematicstheothersideofzerosim: SimDef = {
    id: 'w_c6_mathematicstheothersideofzerosim', title: 'Mathematics The Other Side Of Zero', subtitle: 'Introduction to Integers',
    classLevel: 6, subject: 'maths', topic: 'Introduction to Integers',
    chapters: ['c6_math_ch02'],
    nodeIds: ['c6_math_ch02_016', 'c6_math_ch02_017', 'c6_math_ch02_018', 'c6_math_ch02_019', 'c6_math_ch02_020', 'c6_math_ch02_021', 'c6_math_ch02_022', 'c6_math_ch02_023', 'c6_math_ch02_024', 'c6_math_ch02_025', 'c6_math_ch02_026', 'c6_math_ch02_027', 'c6_math_ch02_028'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Introduction to Integers', goal: 'Master Introduction to Integers' },
    discovery: { question: 'A temperature of -5°C — what does the minus sign actually mean?', options: ['5 degrees below zero', "Negative five doesn't exist", 'It means plus'], answer: '5 degrees below zero', hook: "Negative numbers are 'the other side of zero' — below-zero temperatures, debts, depths below sea level!" },
    teaching: [{ title: 'Integers Below Zero', text: 'Negative numbers sit below zero on the number line — for temperatures, debts, and depths. -5 = five below zero.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_MathematicsTheOtherSideOfZeroSim, prompt: 'Try the interactive — Integers Below Zero' },
    challenges: [{ type: '', nodeId: 'c6_math_ch02_016', question: '-8 is a number that is:', answer: '8 below zero', options: ['8 below zero', '8 above zero', 'not a real number'], hint: 'Think temperature!', misconception: '-8 is eight units below zero — used for cold, debt, and depth.', workedExample: ['Negative = below 0.', '-8 = 8 below.', 'Real-world use.'] }],
    reflect: { prompts: ['What did you discover about Introduction to Integers?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_physicselectricitycircuitscbsesim: SimDef = {
    id: 'w_c6_physicselectricitycircuitscbsesim', title: 'Physics Electricity Circuits C B S E', subtitle: 'A Torchlight and Its Parts',
    classLevel: 6, subject: 'science', topic: 'A Torchlight and Its Parts',
    chapters: ['c6_physics_ch03'],
    nodeIds: ['c6_physics_ch03_011', 'c6_physics_ch03_012', 'c6_physics_ch03_013', 'c6_physics_ch03_014', 'c6_physics_ch03_015', 'c6_physics_ch03_016', 'c6_physics_ch03_017', 'c6_physics_ch03_018'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: A Torchlight and Its Parts', goal: 'Master A Torchlight and Its Parts' },
    discovery: { question: 'Why does a bulb in a broken loop stay dark even with a good battery?', options: ['Current needs a complete closed path to flow', 'The bulb is dead', "Batteries don't work"], answer: 'Current needs a complete closed path to flow', hook: 'A circuit is a LOOP — electricity must flow out and back. Break the loop and the bulb goes dark!' },
    teaching: [{ title: 'Electric Circuits', text: 'A circuit is a closed loop: battery → wire → bulb → back to battery. Current only flows when the loop is complete.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_PhysicsElectricityCircuitsCBSESim, prompt: 'Try the interactive — Electric Circuits' },
    challenges: [{ type: '', nodeId: 'c6_physics_ch03_011', question: 'A bulb lights only when the circuit is:', answer: 'closed (complete loop)', options: ['closed (complete loop)', 'open', 'broken'], hint: 'Complete the loop!', misconception: 'Current needs a closed path — an open switch or gap stops the flow.', workedExample: ['Loop must close.', 'Open = no current.', 'Closed = bulb lights.'] }],
    reflect: { prompts: ['What did you discover about A Torchlight and Its Parts?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_physicsphysicalquantitiesunitssim: SimDef = {
    id: 'w_c6_physicsphysicalquantitiesunitssim', title: 'Physics Physical Quantities Units', subtitle: 'What is Science and Why It Matters',
    classLevel: 6, subject: 'science', topic: 'What is Science and Why It Matters',
    chapters: ['c6_physics_ch01'],
    nodeIds: ['c6_physics_ch01_001', 'c6_physics_ch01_002', 'c6_physics_ch01_003', 'c6_physics_ch01_004', 'c6_physics_ch01_005'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: What is Science and Why It Matters', goal: 'Master What is Science and Why It Matters' },
    discovery: { question: "Why do we say '5 metres' and not just '5' when measuring a room?", options: ['A number needs a unit to mean something real', "It's just a habit", 'Metres are bigger'], answer: 'A number needs a unit to mean something real', hook: "A measurement = number + unit. '5' alone is meaningless — 5 metres, 5 grams, 5 seconds are different things!" },
    teaching: [{ title: 'Physical Quantities & Units', text: 'A physical quantity is measured as a number plus a unit — metres for length, grams for mass, seconds for time.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_PhysicsPhysicalQuantitiesUnitsSim, prompt: 'Try the interactive — Physical Quantities & Units' },
    challenges: [{ type: '', nodeId: 'c6_physics_ch01_001', question: "'5 kg' measures:", answer: 'mass', options: ['mass', 'length', 'time'], hint: 'kg = kilograms!', misconception: 'Kilograms measure mass; metres measure length; seconds measure time.', workedExample: ['Number + unit.', 'kg = mass.', 'm = length.'] }],
    reflect: { prompts: ['What did you discover about What is Science and Why It Matters?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_physicspitchsoundfrequencysim: SimDef = {
    id: 'w_c6_physicspitchsoundfrequencysim', title: 'Physics Pitch Sound Frequency', subtitle: 'A Torchlight and Its Parts',
    classLevel: 6, subject: 'science', topic: 'A Torchlight and Its Parts',
    chapters: ['c6_physics_ch03'],
    nodeIds: ['c6_physics_ch03_011', 'c6_physics_ch03_012', 'c6_physics_ch03_013', 'c6_physics_ch03_014', 'c6_physics_ch03_015', 'c6_physics_ch03_016', 'c6_physics_ch03_017', 'c6_physics_ch03_018'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: A Torchlight and Its Parts', goal: 'Master A Torchlight and Its Parts' },
    discovery: { question: 'Why does a thin rubber band make a higher twang than a thick one?', options: ['It vibrates faster — higher frequency means higher pitch', "It's louder", "It's shorter"], answer: 'It vibrates faster — higher frequency means higher pitch', hook: 'Pitch = frequency! Fast vibrations = high pitch (whistle); slow = low pitch (drum). Frequency is the key!' },
    teaching: [{ title: 'Sound and Pitch', text: 'Sound is vibration. Frequency (vibrations per second) sets pitch — high frequency = high pitch, low = low.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_PhysicsPitchSoundFrequencySim, prompt: 'Try the interactive — Sound and Pitch' },
    challenges: [{ type: '', nodeId: 'c6_physics_ch03_011', question: 'A high-pitched sound has:', answer: 'high frequency vibration', options: ['high frequency vibration', 'slow vibration', 'no vibration'], hint: 'Fast = high!', misconception: 'High pitch = high frequency (fast vibration). Low pitch = low frequency.', workedExample: ['Pitch = frequency.', 'Fast = high pitch.', 'Slow = low.'] }],
    reflect: { prompts: ['What did you discover about A Torchlight and Its Parts?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_physicsrectilinearpropagationlightsim: SimDef = {
    id: 'w_c6_physicsrectilinearpropagationlightsim', title: 'Physics Rectilinear Propagation Light', subtitle: 'Sources of Light: Natural and Artificial',
    classLevel: 6, subject: 'science', topic: 'Sources of Light: Natural and Artificial',
    chapters: ['c6_physics_ch11'],
    nodeIds: ['c6_physics_ch11_035', 'c6_physics_ch11_036', 'c6_physics_ch11_037', 'c6_physics_ch11_038', 'c6_physics_ch11_039', 'c6_physics_ch11_040', 'c6_physics_ch11_041', 'c6_physics_ch11_042', 'c6_physics_ch11_043', 'c6_physics_ch11_044'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Sources of Light: Natural and Artificial', goal: 'Master Sources of Light: Natural and Artificial' },
    discovery: { question: "Why can't you see around a corner even though light is everywhere?", options: ["Light travels in straight lines — it can't bend around", 'Corners block eyes', 'Light is too weak'], answer: "Light travels in straight lines — it can't bend around", hook: "Light travels in straight lines (rectilinear propagation) — that's why shadows have sharp edges!" },
    teaching: [{ title: 'Light Travels Straight', text: "Light moves in straight lines — it can't curve around objects, which is why shadows form behind them.", emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_PhysicsRectilinearPropagationLightSim, prompt: 'Try the interactive — Light Travels Straight' },
    challenges: [{ type: '', nodeId: 'c6_physics_ch11_035', question: 'Shadows form because light:', answer: 'travels straight and gets blocked', options: ['travels straight and gets blocked', 'bends around objects', 'disappears'], hint: 'Blocked straight rays!', misconception: 'Light travels straight — an opaque object blocks it, casting a shadow.', workedExample: ['Light = straight.', 'Blocked = shadow.', 'No bending.'] }],
    reflect: { prompts: ['What did you discover about Sources of Light: Natural and Artificial?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_physicsuniformnonuniformmotionsim: SimDef = {
    id: 'w_c6_physicsuniformnonuniformmotionsim', title: 'Physics Uniform Nonuniform Motion', subtitle: 'Measuring Time: From Sundials to Clocks',
    classLevel: 6, subject: 'science', topic: 'Measuring Time: From Sundials to Clocks',
    chapters: ['c6_physics_ch08'],
    nodeIds: ['c6_physics_ch08_027', 'c6_physics_ch08_028', 'c6_physics_ch08_029', 'c6_physics_ch08_030', 'c6_physics_ch08_031', 'c6_physics_ch08_032', 'c6_physics_ch08_033', 'c6_physics_ch08_034'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Measuring Time: From Sundials to Clocks', goal: 'Master Measuring Time: From Sundials to Clocks' },
    discovery: { question: 'A car on an empty highway vs one in city traffic — which shows uniform motion?', options: ['The highway car at steady speed; traffic is non-uniform', 'Both uniform', 'The traffic car'], answer: 'The highway car at steady speed; traffic is non-uniform', hook: 'Uniform motion = equal distances in equal times (steady speed). Stop-and-go traffic is non-uniform!' },
    teaching: [{ title: 'Uniform vs Non-uniform Motion', text: 'Uniform = constant speed, equal distance each second. Non-uniform = speed keeps changing (speeding up, slowing down).', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_PhysicsUniformNonuniformMotionSim, prompt: 'Try the interactive — Uniform vs Non-uniform Motion' },
    challenges: [{ type: '', nodeId: 'c6_physics_ch08_027', question: 'Uniform motion means moving:', answer: 'at a constant speed', options: ['at a constant speed', 'faster and slower', 'in circles'], hint: 'Steady!', misconception: 'Uniform = constant speed covering equal distances in equal times.', workedExample: ['Uniform = steady.', 'Non-uniform = varying.', 'Speed tells which.'] }],
    reflect: { prompts: ['What did you discover about Measuring Time: From Sundials to Clocks?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_scienceajourneythroughstatesofsim: SimDef = {
    id: 'w_c6_scienceajourneythroughstatesofsim', title: 'Science A Journey Through States Of', subtitle: 'What is Heat and How It Flows',
    classLevel: 6, subject: 'science', topic: 'What is Heat and How It Flows',
    chapters: ['c6_physics_ch07'],
    nodeIds: ['c6_physics_ch07_019', 'c6_physics_ch07_020', 'c6_physics_ch07_021', 'c6_physics_ch07_022', 'c6_physics_ch07_023', 'c6_physics_ch07_024', 'c6_physics_ch07_025', 'c6_physics_ch07_026'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: What is Heat and How It Flows', goal: 'Master What is Heat and How It Flows' },
    discovery: { question: 'Ice on a table melts; water on a stove vanishes. What invisible change is happening?', options: ['Heat makes particles move faster, changing the state', 'The water is magic', 'It evaporates by itself'], answer: 'Heat makes particles move faster, changing the state', hook: 'Heat = particle speed! Ice → water → steam as particles gain energy and break free!' },
    teaching: [{ title: 'States of Water', text: 'Water changes state with heat: solid (ice) → liquid (water) → gas (steam). Heat speeds up particles.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceAJourneyThroughStatesOfSim, prompt: 'Try the interactive — States of Water' },
    challenges: [{ type: '', nodeId: 'c6_physics_ch07_019', question: 'Melting ice into water is caused by:', answer: 'heat energy', options: ['heat energy', 'cold', 'pressure only'], hint: 'Add heat!', misconception: 'Heat makes particles move faster — ice melts to water, water boils to steam.', workedExample: ['Heat = energy.', 'Ice melts.', 'Water boils.'] }],
    reflect: { prompts: ['What did you discover about What is Heat and How It Flows?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_sciencebeyondearthsim: SimDef = {
    id: 'w_c6_sciencebeyondearthsim', title: 'Science Beyond Earth', subtitle: 'Rotation of the Earth: Day and Night',
    classLevel: 6, subject: 'science', topic: 'Rotation of the Earth: Day and Night',
    chapters: ['c6_physics_ch12'],
    nodeIds: ['c6_physics_ch12_045', 'c6_physics_ch12_046', 'c6_physics_ch12_047', 'c6_physics_ch12_048', 'c6_physics_ch12_049', 'c6_physics_ch12_050', 'c6_physics_ch12_051', 'c6_physics_ch12_052'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Rotation of the Earth: Day and Night', goal: 'Master Rotation of the Earth: Day and Night' },
    discovery: { question: "Why do we see the Sun 'move' across the sky if it isn't actually moving?", options: ["Earth's rotation makes the Sun appear to move", 'The Sun orbits Earth', "It's an illusion of clouds"], answer: "Earth's rotation makes the Sun appear to move", hook: 'Earth spins on its axis — that rotation makes the Sun appear to rise and set, and causes day and night!' },
    teaching: [{ title: 'Earth and Sky', text: 'Earth rotates on its axis (day/night) and revolves around the Sun (year). The Sun only appears to move.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceBeyondEarthSim, prompt: 'Try the interactive — Earth and Sky' },
    challenges: [{ type: '', nodeId: 'c6_physics_ch12_045', question: 'Day and night are caused by:', answer: 'Earth rotating on its axis', options: ['Earth rotating on its axis', 'the Sun moving', 'clouds'], hint: 'We spin!', misconception: "Earth's rotation causes day and night — the side facing the Sun gets day.", workedExample: ['Earth rotates.', 'Facing Sun = day.', 'Away = night.'] }],
    reflect: { prompts: ['What did you discover about Rotation of the Earth: Day and Night?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_sciencebodymovementssim: SimDef = {
    id: 'w_c6_sciencebodymovementssim', title: 'Science Body Movements', subtitle: 'How Do Plants Grow? From Seed to Tree',
    classLevel: 6, subject: 'science', topic: 'How Do Plants Grow? From Seed to Tree',
    chapters: ['c6_biology_ch10'],
    nodeIds: ['c6_biology_ch10_001', 'c6_biology_ch10_002', 'c6_biology_ch10_003', 'c6_biology_ch10_004', 'c6_biology_ch10_005', 'c6_biology_ch10_006', 'c6_biology_ch10_007'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: How Do Plants Grow? From Seed to Tree', goal: 'Master How Do Plants Grow? From Seed to Tree' },
    discovery: { question: 'Your arm bends at the elbow but not in the middle of the forearm. Why?', options: ['Joints allow bending only where bones meet', 'Bones are soft there', 'Muscles only work at elbows'], answer: 'Joints allow bending only where bones meet', hook: 'Movement happens at JOINTS — where two bones meet. Different joints allow different motions!' },
    teaching: [{ title: 'Body Movements', text: 'Bones meet at joints — hinge (elbow), ball-and-socket (shoulder), pivot (neck). Joints enable movement.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceBodyMovementsSim, prompt: 'Try the interactive — Body Movements' },
    challenges: [{ type: '', nodeId: 'c6_biology_ch10_001', question: 'Bending your arm happens at:', answer: 'the elbow joint', options: ['the elbow joint', 'the forearm bone', 'the wrist only'], hint: 'Where bones meet!', misconception: 'Movement occurs at joints — the elbow is a hinge joint.', workedExample: ['Joints = bone meetings.', 'Hinge = elbow.', 'Movement at joints.'] }],
    reflect: { prompts: ['What did you discover about How Do Plants Grow? From Seed to Tree?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_sciencechangesaroundussim: SimDef = {
    id: 'w_c6_sciencechangesaroundussim', title: 'Science Changes Around Us', subtitle: 'Physical Changes: What Changes and What Stays',
    classLevel: 6, subject: 'science', topic: 'Physical Changes: What Changes and What Stays',
    chapters: ['c6_chemistry_ch05'],
    nodeIds: ['c6_chemistry_ch05_001', 'c6_chemistry_ch05_002', 'c6_chemistry_ch05_003', 'c6_chemistry_ch05_004', 'c6_chemistry_ch05_005', 'c6_chemistry_ch05_006', 'c6_chemistry_ch05_007', 'c6_chemistry_ch05_008', 'c6_chemistry_ch05_009', 'c6_chemistry_ch05_010'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Physical Changes: What Changes and What Stays the Same', goal: 'Master Physical Changes: What Changes and What Stays the ' },
    discovery: { question: "Melting butter can be re-frozen, but a burnt match can't un-burn. What's the difference?", options: ['Melting is reversible; burning is irreversible', 'Both are reversible', 'Both are permanent'], answer: 'Melting is reversible; burning is irreversible', hook: "Some changes reverse (melt/freeze); others can't (burn/rust). Physical vs chemical change!" },
    teaching: [{ title: 'Reversible vs Irreversible', text: "Reversible changes can be undone (melting, folding). Irreversible changes can't (burning, cooking, rusting).", emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceChangesAroundUsSim, prompt: 'Try the interactive — Reversible vs Irreversible' },
    challenges: [{ type: '', nodeId: 'c6_chemistry_ch05_001', question: 'Which change is reversible?', answer: 'melting ice', options: ['melting ice', 'burning paper', 'cooking an egg'], hint: 'Can you undo it?', misconception: 'Melting is reversible — ice refreezes. Burning and cooking are permanent.', workedExample: ['Melt = reversible.', 'Burn = irreversible.', 'Undo it? tells you.'] }],
    reflect: { prompts: ['What did you discover about Physical Changes: What Changes and What ?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_sciencecomponentsoffoodsim: SimDef = {
    id: 'w_c6_sciencecomponentsoffoodsim', title: 'Science Components Of Food', subtitle: 'Nutrition in Animals: The Digestive System',
    classLevel: 6, subject: 'science', topic: 'Nutrition in Animals: The Digestive System',
    chapters: ['c6_biology_ch09'],
    nodeIds: ['c6_biology_ch09_001', 'c6_biology_ch09_002', 'c6_biology_ch09_003', 'c6_biology_ch09_004', 'c6_biology_ch09_005', 'c6_biology_ch09_006', 'c6_biology_ch09_007', 'c6_biology_ch09_008'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Nutrition in Animals: The Digestive System', goal: 'Master Nutrition in Animals: The Digestive System' },
    discovery: { question: 'How can a lab test reveal that a potato hides starch inside it?', options: ['Iodine turns blue-black where starch is present', 'Smell it', "It can't be tested"], answer: 'Iodine turns blue-black where starch is present', hook: 'Nutrient tests! Iodine detects starch (blue-black), copper sulphate finds protein, paper test finds fat!' },
    teaching: [{ title: 'Components of Food', text: 'Foods contain nutrients — carbs, proteins, fats. Chemical tests detect each: iodine for starch, etc.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceComponentsOfFoodSim, prompt: 'Try the interactive — Components of Food' },
    challenges: [{ type: '', nodeId: 'c6_biology_ch09_001', question: 'The iodine test detects:', answer: 'starch', options: ['starch', 'protein', 'fat'], hint: 'Blue-black color!', misconception: 'Iodine turns blue-black with starch — the classic starch test.', workedExample: ['Iodine + starch.', '= blue-black.', 'Starch found.'] }],
    reflect: { prompts: ['What did you discover about Nutrition in Animals: The Digestive Syst?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_sciencediversityinthelivingworldsim: SimDef = {
    id: 'w_c6_sciencediversityinthelivingworldsim', title: 'Science Diversity In The Living World', subtitle: 'How Do Plants Grow? From Seed to Tree',
    classLevel: 6, subject: 'science', topic: 'How Do Plants Grow? From Seed to Tree',
    chapters: ['c6_biology_ch10'],
    nodeIds: ['c6_biology_ch10_001', 'c6_biology_ch10_002', 'c6_biology_ch10_003', 'c6_biology_ch10_004', 'c6_biology_ch10_005', 'c6_biology_ch10_006', 'c6_biology_ch10_007'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: How Do Plants Grow? From Seed to Tree', goal: 'Master How Do Plants Grow? From Seed to Tree' },
    discovery: { question: "A fish, a bird, and a bacterium are all 'living' — how do scientists organize such variety?", options: ['By grouping them into categories by shared features', 'By size only', "They can't be organized"], answer: 'By grouping them into categories by shared features', hook: 'Classification groups living things by shared features — making sense of millions of species!' },
    teaching: [{ title: 'Diversity of Life', text: 'Living things are classified into groups by shared characteristics — kingdoms, plants vs animals, etc.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceDiversityInTheLivingWorldSim, prompt: 'Try the interactive — Diversity of Life' },
    challenges: [{ type: '', nodeId: 'c6_biology_ch10_001', question: 'Classification groups organisms by:', answer: 'shared characteristics', options: ['shared characteristics', 'their color', 'alphabet'], hint: 'Common features!', misconception: 'Classification groups by shared features — structure, reproduction, habitat.', workedExample: ['Group by features.', 'Shared traits.', 'Organize diversity.'] }],
    reflect: { prompts: ['What did you discover about How Do Plants Grow? From Seed to Tree?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_scienceexploringmagnetssim: SimDef = {
    id: 'w_c6_scienceexploringmagnetssim', title: 'Science Exploring Magnets', subtitle: 'A Torchlight and Its Parts',
    classLevel: 6, subject: 'science', topic: 'A Torchlight and Its Parts',
    chapters: ['c6_physics_ch03'],
    nodeIds: ['c6_physics_ch03_011', 'c6_physics_ch03_012', 'c6_physics_ch03_013', 'c6_physics_ch03_014', 'c6_physics_ch03_015', 'c6_physics_ch03_016', 'c6_physics_ch03_017', 'c6_physics_ch03_018'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: A Torchlight and Its Parts', goal: 'Master A Torchlight and Its Parts' },
    discovery: { question: 'Why do two magnets push apart when you bring their north poles together?', options: ['Like poles repel — same poles push away', "They're too heavy", 'They attract'], answer: 'Like poles repel — same poles push away', hook: 'Magnet rule: like poles REPEL, opposite poles ATTRACT. North-North pushes; North-South pulls!' },
    teaching: [{ title: 'Magnets', text: 'Magnets have two poles — north and south. Opposite poles attract; like poles repel. Magnets pull iron objects.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceExploringMagnetsSim, prompt: 'Try the interactive — Magnets' },
    challenges: [{ type: '', nodeId: 'c6_physics_ch03_011', question: 'North pole + South pole will:', answer: 'attract each other', options: ['attract each other', 'repel each other', 'do nothing'], hint: 'Opposites attract!', misconception: 'Opposite poles attract (N-S); like poles repel (N-N or S-S).', workedExample: ['Opposite = attract.', 'Same = repel.', 'N pulls S.'] }],
    reflect: { prompts: ['What did you discover about A Torchlight and Its Parts?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_sciencefibretofabricsim: SimDef = {
    id: 'w_c6_sciencefibretofabricsim', title: 'Science Fibre To Fabric', subtitle: 'this concept',
    classLevel: 6, subject: 'science', topic: 'this concept',
    chapters: [],
    nodeIds: ['c6_biology_ch09_007'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: this concept', goal: 'Master this concept' },
    discovery: { question: "How does fluffy cotton on a plant become the smooth shirt you're wearing?", options: ['Fibres are spun into yarn, then woven into fabric', "It's cut directly", "It's glued"], answer: 'Fibres are spun into yarn, then woven into fabric', hook: 'Fibre → yarn → fabric! Cotton fibres get spun into thread, then woven or knitted into cloth!' },
    teaching: [{ title: 'Fibre to Fabric', text: 'Fabric making: plant/animal fibres are spun into yarn, then woven or knitted into cloth. Two main stages!', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceFibreToFabricSim, prompt: 'Try the interactive — Fibre to Fabric' },
    challenges: [{ type: 'mcq', question: 'Fabric is made by first spinning fibres into:', answer: 'yarn', options: ['yarn', 'plastic', 'paper'], hint: 'Fibre → thread!', misconception: 'Fibres are spun into yarn (thread), then woven or knitted into fabric.', workedExample: ['Fibre first.', 'Spin = yarn.', 'Weave = fabric.'] }],
    reflect: { prompts: ['What did you discover about this concept?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_sciencefoodwheredoesitcomesim: SimDef = {
    id: 'w_c6_sciencefoodwheredoesitcomesim', title: 'Science Food Where Does It Come', subtitle: 'Nutrition in Animals: The Digestive System',
    classLevel: 6, subject: 'science', topic: 'Nutrition in Animals: The Digestive System',
    chapters: ['c6_biology_ch09'],
    nodeIds: ['c6_biology_ch09_001', 'c6_biology_ch09_002', 'c6_biology_ch09_003', 'c6_biology_ch09_004', 'c6_biology_ch09_005', 'c6_biology_ch09_006', 'c6_biology_ch09_007', 'c6_biology_ch09_008'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Nutrition in Animals: The Digestive System', goal: 'Master Nutrition in Animals: The Digestive System' },
    discovery: { question: "Is a tomato a plant product or an animal product — and how do you trace any food's origin?", options: ['Plant product — trace food back to its source', 'Animal product', "It's a mineral"], answer: 'Plant product — trace food back to its source', hook: 'Every food traces back to plants or animals — grains, fruits, vegetables from plants; milk, eggs, meat from animals!' },
    teaching: [{ title: 'Sources of Food', text: 'Food comes from plants (grains, fruits, vegetables) or animals (milk, eggs, meat, honey). Trace each to its source.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceFoodWhereDoesItComeSim, prompt: 'Try the interactive — Sources of Food' },
    challenges: [{ type: '', nodeId: 'c6_biology_ch09_001', question: 'Milk comes from:', answer: 'animals', options: ['animals', 'plants', 'minerals'], hint: 'Plant or animal?', misconception: 'Milk is an animal product; grains and vegetables are plant products.', workedExample: ['Food = plant or animal.', 'Milk = animal.', 'Rice = plant.'] }],
    reflect: { prompts: ['What did you discover about Nutrition in Animals: The Digestive Syst?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_sciencegarbageingarbageoutsim: SimDef = {
    id: 'w_c6_sciencegarbageingarbageoutsim', title: 'Science Garbage In Garbage Out', subtitle: 'Physical Changes: What Changes and What Stays',
    classLevel: 6, subject: 'science', topic: 'Physical Changes: What Changes and What Stays',
    chapters: ['c6_chemistry_ch05'],
    nodeIds: ['c6_chemistry_ch05_001', 'c6_chemistry_ch05_002', 'c6_chemistry_ch05_003', 'c6_chemistry_ch05_004', 'c6_chemistry_ch05_005', 'c6_chemistry_ch05_006', 'c6_chemistry_ch05_007', 'c6_chemistry_ch05_008', 'c6_chemistry_ch05_009', 'c6_chemistry_ch05_010'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Physical Changes: What Changes and What Stays the Same', goal: 'Master Physical Changes: What Changes and What Stays the ' },
    discovery: { question: 'Why does a banana peel rot in weeks but a plastic bag lasts for years?', options: ["Peels are biodegradable; plastic isn't", 'Peels are softer', 'Plastic is cleaner'], answer: "Peels are biodegradable; plastic isn't", hook: 'Biodegradable waste rots (food, paper); non-biodegradable waste persists (plastic, metal). Sort your waste!' },
    teaching: [{ title: 'Garbage and Waste', text: 'Waste splits into biodegradable (rots — food, paper) and non-biodegradable (persists — plastic, glass).', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceGarbageInGarbageOutSim, prompt: 'Try the interactive — Garbage and Waste' },
    challenges: [{ type: '', nodeId: 'c6_chemistry_ch05_001', question: 'Which is non-biodegradable?', answer: 'plastic bag', options: ['plastic bag', 'banana peel', 'paper'], hint: 'Does it rot?', misconception: "Plastic doesn't decompose — it's non-biodegradable. Peels and paper rot.", workedExample: ['Bio = rots.', 'Non-bio = persists.', 'Plastic = non-bio.'] }],
    reflect: { prompts: ['What did you discover about Physical Changes: What Changes and What ?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_sciencelivingcreaturesexploringtheircharacteristicssim: SimDef = {
    id: 'w_c6_sciencelivingcreaturesexploringtheircharacteristicssim', title: 'Science Living Creatures Exploring Their Characteristics', subtitle: 'How Do Plants Grow? From Seed to Tree',
    classLevel: 6, subject: 'science', topic: 'How Do Plants Grow? From Seed to Tree',
    chapters: ['c6_biology_ch10'],
    nodeIds: ['c6_biology_ch10_001', 'c6_biology_ch10_002', 'c6_biology_ch10_003', 'c6_biology_ch10_004', 'c6_biology_ch10_005', 'c6_biology_ch10_006', 'c6_biology_ch10_007'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: How Do Plants Grow? From Seed to Tree', goal: 'Master How Do Plants Grow? From Seed to Tree' },
    discovery: { question: "A seed doesn't look alive, yet it grows into a plant. What makes something 'living'?", options: ['Living things grow, respire, reproduce, respond', 'Being big', 'Moving fast'], answer: 'Living things grow, respire, reproduce, respond', hook: 'Living things share traits: they grow, breathe, need food, reproduce, respond to stimuli, and die!' },
    teaching: [{ title: 'Characteristics of Living Things', text: 'All living things grow, respire, need nutrition, respond to stimuli, reproduce, and eventually die.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceLivingCreaturesExploringTheirCharacteristicsSim, prompt: 'Try the interactive — Characteristics of Living Things' },
    challenges: [{ type: '', nodeId: 'c6_biology_ch10_001', question: 'A living thing must be able to:', answer: 'grow and reproduce', options: ['grow and reproduce', 'be large', 'never change'], hint: 'The signs of life!', misconception: 'Growth, respiration, reproduction, response — the marks of living things.', workedExample: ['Grow.', 'Reproduce.', 'Respond.', '= living.'] }],
    reflect: { prompts: ['What did you discover about How Do Plants Grow? From Seed to Tree?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_sciencematerialsaroundussim: SimDef = {
    id: 'w_c6_sciencematerialsaroundussim', title: 'Science Materials Around Us', subtitle: 'What Are Materials and Why We Classify Them',
    classLevel: 6, subject: 'science', topic: 'What Are Materials and Why We Classify Them',
    chapters: ['c6_chemistry_ch04'],
    nodeIds: ['c6_chemistry_ch04_001', 'c6_chemistry_ch04_002', 'c6_chemistry_ch04_003', 'c6_chemistry_ch04_004', 'c6_chemistry_ch04_005', 'c6_chemistry_ch04_006', 'c6_chemistry_ch04_007', 'c6_chemistry_ch04_008', 'c6_chemistry_ch04_009', 'c6_chemistry_ch04_010'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: What Are Materials and Why We Classify Them', goal: 'Master What Are Materials and Why We Classify Them' },
    discovery: { question: 'Why is a cooking pot metal but its handle plastic?', options: ['Metal conducts heat to cook; plastic insulates the handle', 'Plastic is cheaper', "Metal can't be handles"], answer: 'Metal conducts heat to cook; plastic insulates the handle', hook: 'We pick materials by PROPERTY — metal conducts heat (pot), plastic insulates (handle), glass is transparent (window)!' },
    teaching: [{ title: 'Materials Around Us', text: 'Objects are made of materials chosen for properties — conductivity, hardness, transparency, flexibility.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceMaterialsAroundUsSim, prompt: 'Try the interactive — Materials Around Us' },
    challenges: [{ type: '', nodeId: 'c6_chemistry_ch04_001', question: 'We choose materials based on their:', answer: 'properties like strength or conductivity', options: ['properties like strength or conductivity', 'color only', 'name'], hint: 'Match property to use!', misconception: 'Materials are chosen for properties — metal conducts, plastic insulates.', workedExample: ['Property decides use.', 'Metal conducts.', 'Plastic insulates.'] }],
    reflect: { prompts: ['What did you discover about What Are Materials and Why We Classify T?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_sciencemethodsofseparationineverydaysim: SimDef = {
    id: 'w_c6_sciencemethodsofseparationineverydaysim', title: 'Science Methods Of Separation In Everyday', subtitle: 'Physical Changes: What Changes and What Stays',
    classLevel: 6, subject: 'science', topic: 'Physical Changes: What Changes and What Stays',
    chapters: ['c6_chemistry_ch05'],
    nodeIds: ['c6_chemistry_ch05_001', 'c6_chemistry_ch05_002', 'c6_chemistry_ch05_003', 'c6_chemistry_ch05_004', 'c6_chemistry_ch05_005', 'c6_chemistry_ch05_006', 'c6_chemistry_ch05_007', 'c6_chemistry_ch05_008', 'c6_chemistry_ch05_009', 'c6_chemistry_ch05_010'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Physical Changes: What Changes and What Stays the Same', goal: 'Master Physical Changes: What Changes and What Stays the ' },
    discovery: { question: 'How does a winnowing basket separate grain from husk?', options: ['Wind blows the lighter husk away', 'It dissolves the husk', "It can't separate them"], answer: 'Wind blows the lighter husk away', hook: 'Separation methods exploit differences — winnowing uses weight, sieving uses size, filtering uses particle size!' },
    teaching: [{ title: 'Separation Methods', text: 'We separate mixtures by exploiting differences — handpicking, sieving (size), winnowing (weight), filtration, evaporation.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceMethodsOfSeparationInEverydaySim, prompt: 'Try the interactive — Separation Methods' },
    challenges: [{ type: '', nodeId: 'c6_chemistry_ch05_001', question: 'Winnowing separates grain from husk using:', answer: 'wind/air to blow the lighter husk', options: ['wind/air to blow the lighter husk', 'water', 'magnets'], hint: 'Lighter blows away!', misconception: 'Winnowing uses air — the light husk blows away, heavy grain stays.', workedExample: ['Winnowing = wind.', 'Light husk blows.', 'Grain stays.'] }],
    reflect: { prompts: ['What did you discover about Physical Changes: What Changes and What ?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_sciencemindfuleatingapathtosim: SimDef = {
    id: 'w_c6_sciencemindfuleatingapathtosim', title: 'Science Mindful Eating A Path To', subtitle: 'Nutrition in Animals: The Digestive System',
    classLevel: 6, subject: 'science', topic: 'Nutrition in Animals: The Digestive System',
    chapters: ['c6_biology_ch09'],
    nodeIds: ['c6_biology_ch09_001', 'c6_biology_ch09_002', 'c6_biology_ch09_003', 'c6_biology_ch09_004', 'c6_biology_ch09_005', 'c6_biology_ch09_006', 'c6_biology_ch09_007', 'c6_biology_ch09_008'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Nutrition in Animals: The Digestive System', goal: 'Master Nutrition in Animals: The Digestive System' },
    discovery: { question: 'Why is a plate of dal, rice, and vegetables healthier than a bag of chips?', options: ['A balanced diet gives all nutrients; chips give mostly fat/salt', 'Chips are fresher', 'They taste worse'], answer: 'A balanced diet gives all nutrients; chips give mostly fat/salt', hook: 'A balanced diet = right mix of carbs, proteins, fats, vitamins — fuel + building blocks + protection!' },
    teaching: [{ title: 'Balanced Diet', text: 'A balanced diet combines all nutrients — carbs for energy, proteins for growth, fats, vitamins, minerals, water, fibre.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceMindfulEatingAPathToSim, prompt: 'Try the interactive — Balanced Diet' },
    challenges: [{ type: '', nodeId: 'c6_biology_ch09_001', question: 'A balanced diet should include:', answer: 'a mix of all nutrients', options: ['a mix of all nutrients', 'only protein', 'only carbs'], hint: 'Variety!', misconception: 'Balanced diet = all nutrients — carbs, protein, fat, vitamins, minerals.', workedExample: ['All nutrients.', 'Carbs = energy.', 'Protein = growth.'] }],
    reflect: { prompts: ['What did you discover about Nutrition in Animals: The Digestive Syst?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_sciencenaturestreasuressim: SimDef = {
    id: 'w_c6_sciencenaturestreasuressim', title: 'Science Nature S Treasures', subtitle: 'Nature as Our Laboratory',
    classLevel: 6, subject: 'science', topic: 'Nature as Our Laboratory',
    chapters: ['c6_physics_ch02'],
    nodeIds: ['c6_physics_ch02_006', 'c6_physics_ch02_007', 'c6_physics_ch02_008', 'c6_physics_ch02_009', 'c6_physics_ch02_010'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Nature as Our Laboratory', goal: 'Master Nature as Our Laboratory' },
    discovery: { question: "Sunlight, wind, and water are 'free' yet essential. Why call them treasures?", options: ["They're natural resources we depend on completely", "They're shiny", "They're rare"], answer: "They're natural resources we depend on completely", hook: "Nature's treasures — air, water, sunlight, soil — are free but priceless; life depends on them!" },
    teaching: [{ title: "Nature's Treasures", text: "Natural resources — air, water, sunlight, soil, forests — sustain all life. Renewable ones replenish; others don't.", emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceNatureSTreasuresSim, prompt: "Try the interactive — Nature's Treasures" },
    challenges: [{ type: '', nodeId: 'c6_physics_ch02_006', question: 'Which is a renewable resource?', answer: 'sunlight', options: ['sunlight', 'coal', 'plastic'], hint: 'Does it replenish?', misconception: 'Sunlight and wind are renewable — they replenish. Coal and oil are non-renewable.', workedExample: ['Renewable = replenishes.', 'Sun, wind = yes.', 'Coal = no.'] }],
    reflect: { prompts: ['What did you discover about Nature as Our Laboratory?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_scienceseparationofsubstancessim: SimDef = {
    id: 'w_c6_scienceseparationofsubstancessim', title: 'Science Separation Of Substances', subtitle: 'Physical Changes: What Changes and What Stays',
    classLevel: 6, subject: 'science', topic: 'Physical Changes: What Changes and What Stays',
    chapters: ['c6_chemistry_ch05'],
    nodeIds: ['c6_chemistry_ch05_001', 'c6_chemistry_ch05_002', 'c6_chemistry_ch05_003', 'c6_chemistry_ch05_004', 'c6_chemistry_ch05_005', 'c6_chemistry_ch05_006', 'c6_chemistry_ch05_007', 'c6_chemistry_ch05_008', 'c6_chemistry_ch05_009', 'c6_chemistry_ch05_010'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Physical Changes: What Changes and What Stays the Same', goal: 'Master Physical Changes: What Changes and What Stays the ' },
    discovery: { question: 'How do you get salt back from salty water?', options: ['Evaporate the water — salt stays behind', 'Filter it', 'Freeze it'], answer: 'Evaporate the water — salt stays behind', hook: 'Different substances, different methods! Evaporation recovers dissolved salt; filtration catches undissolved solids!' },
    teaching: [{ title: 'Separating Substances', text: 'Separate mixtures by property — evaporation (dissolved solids), filtration (insoluble), sedimentation, decantation.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceSeparationOfSubstancesSim, prompt: 'Try the interactive — Separating Substances' },
    challenges: [{ type: '', nodeId: 'c6_chemistry_ch05_001', question: 'To recover dissolved salt from water you use:', answer: 'evaporation', options: ['evaporation', 'filtration', 'a magnet'], hint: 'Salt is dissolved, not floating!', misconception: 'Dissolved salt needs evaporation — boil off the water, salt remains.', workedExample: ['Dissolved = evaporate.', 'Undissolved = filter.', 'Match method to type.'] }],
    reflect: { prompts: ['What did you discover about Physical Changes: What Changes and What ?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_sciencesortingmaterialsintogroupssim: SimDef = {
    id: 'w_c6_sciencesortingmaterialsintogroupssim', title: 'Science Sorting Materials Into Groups', subtitle: 'What Are Materials and Why We Classify Them',
    classLevel: 6, subject: 'science', topic: 'What Are Materials and Why We Classify Them',
    chapters: ['c6_chemistry_ch04'],
    nodeIds: ['c6_chemistry_ch04_001', 'c6_chemistry_ch04_002', 'c6_chemistry_ch04_003', 'c6_chemistry_ch04_004', 'c6_chemistry_ch04_005', 'c6_chemistry_ch04_006', 'c6_chemistry_ch04_007', 'c6_chemistry_ch04_008', 'c6_chemistry_ch04_009', 'c6_chemistry_ch04_010'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: What Are Materials and Why We Classify Them', goal: 'Master What Are Materials and Why We Classify Them' },
    discovery: { question: 'Why do we sort a toolbox by screwdrivers, hammers, wrenches instead of dumping them together?', options: ['Grouping by shared properties makes things easy to find and use', 'It looks neat only', 'No reason'], answer: 'Grouping by shared properties makes things easy to find and use', hook: 'Sorting materials by shared properties — metal/wood/plastic, hard/soft, soluble/insoluble — brings order!' },
    teaching: [{ title: 'Sorting Materials', text: 'Materials are grouped by shared properties — appearance, hardness, solubility, transparency, conductivity.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceSortingMaterialsIntoGroupsSim, prompt: 'Try the interactive — Sorting Materials' },
    challenges: [{ type: '', nodeId: 'c6_chemistry_ch04_001', question: 'We sort materials by their:', answer: 'shared properties', options: ['shared properties', 'price', 'weight only'], hint: 'What do they share?', misconception: 'Grouping by shared properties (hardness, solubility) organizes materials.', workedExample: ['Shared property = group.', 'Metal, wood, plastic.', 'Order from sorting.'] }],
    reflect: { prompts: ['What did you discover about What Are Materials and Why We Classify T?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_sciencetemperatureanditsmeasurementsim: SimDef = {
    id: 'w_c6_sciencetemperatureanditsmeasurementsim', title: 'Science Temperature And Its Measurement', subtitle: 'this concept',
    classLevel: 6, subject: 'science', topic: 'this concept',
    chapters: [],
    nodeIds: [],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: this concept', goal: 'Master this concept' },
    discovery: { question: 'Why does a metal spoon feel colder than a wooden one in the same room?', options: ['Metal conducts heat from your hand faster — same temp, different feel', "It's actually colder", 'Wood is warmer'], answer: 'Metal conducts heat from your hand faster — same temp, different feel', hook: 'Temperature measures hotness — a thermometer reads it. Conductors feel cold because they pull heat from you!' },
    teaching: [{ title: 'Temperature & Measurement', text: 'Temperature measures how hot/cold. A thermometer measures it in °C or °F. Normal body temp = 37°C.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceTemperatureAndItsMeasurementSim, prompt: 'Try the interactive — Temperature & Measurement' },
    challenges: [{ type: 'mcq', question: 'Normal human body temperature is about:', answer: '37°C', options: ['37°C', '100°C', '0°C'], hint: 'Body temp!', misconception: 'Normal body temperature is 37°C (98.6°F) — measured with a thermometer.', workedExample: ['Thermometer measures.', 'Body = 37°C.', '°C or °F.'] }],
    reflect: { prompts: ['What did you discover about this concept?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_sciencethelivingorganismscharacteristicsandsim: SimDef = {
    id: 'w_c6_sciencethelivingorganismscharacteristicsandsim', title: 'Science The Living Organisms Characteristics And', subtitle: 'How Do Plants Grow? From Seed to Tree',
    classLevel: 6, subject: 'science', topic: 'How Do Plants Grow? From Seed to Tree',
    chapters: ['c6_biology_ch10'],
    nodeIds: ['c6_biology_ch10_001', 'c6_biology_ch10_002', 'c6_biology_ch10_003', 'c6_biology_ch10_004', 'c6_biology_ch10_005', 'c6_biology_ch10_006', 'c6_biology_ch10_007'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: How Do Plants Grow? From Seed to Tree', goal: 'Master How Do Plants Grow? From Seed to Tree' },
    discovery: { question: 'Why do fish live in water but camels live in deserts?', options: ['Each organism is adapted to its habitat', 'They choose randomly', "They can't move"], answer: 'Each organism is adapted to its habitat', hook: 'Habitat = where an organism lives. Each is adapted to its environment — fish gills for water, camel humps for desert!' },
    teaching: [{ title: 'Habitats', text: "A habitat is an organism's home — forest, desert, ocean. Organisms are adapted to survive in their habitat.", emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceTheLivingOrganismsCharacteristicsAndSim, prompt: 'Try the interactive — Habitats' },
    challenges: [{ type: '', nodeId: 'c6_biology_ch10_001', question: 'A camel is adapted to the desert by:', answer: 'storing fat in its hump and surviving without water', options: ['storing fat in its hump and surviving without water', 'having gills', 'growing fur for cold'], hint: 'Desert survival!', misconception: 'Camels store fat and conserve water — adaptations to desert life.', workedExample: ['Habitat = home.', 'Adapted to survive.', 'Camel = desert.'] }],
    reflect: { prompts: ['What did you discover about How Do Plants Grow? From Seed to Tree?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_sciencethewonderfulworldofsciencesim: SimDef = {
    id: 'w_c6_sciencethewonderfulworldofsciencesim', title: 'Science The Wonderful World Of Science', subtitle: 'What is Science and Why It Matters',
    classLevel: 6, subject: 'science', topic: 'What is Science and Why It Matters',
    chapters: ['c6_physics_ch01'],
    nodeIds: ['c6_physics_ch01_001', 'c6_physics_ch01_002', 'c6_physics_ch01_003', 'c6_physics_ch01_004', 'c6_physics_ch01_005'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: What is Science and Why It Matters', goal: 'Master What is Science and Why It Matters' },
    discovery: { question: 'Why does a dropped ball always fall down and never float up?', options: ['Gravity pulls it toward Earth — science explains it', 'It chooses to', 'Air pushes it'], answer: 'Gravity pulls it toward Earth — science explains it', hook: 'Science explains the everyday — gravity, light, sound, motion. Curiosity + experiment = understanding!' },
    teaching: [{ title: 'The World of Science', text: "Science is a way of understanding the world through curiosity, observation, and experiment — asking 'why' and testing it.", emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_ScienceTheWonderfulWorldOfScienceSim, prompt: 'Try the interactive — The World of Science' },
    challenges: [{ type: '', nodeId: 'c6_physics_ch01_001', question: 'Science is best described as:', answer: 'asking questions and testing answers', options: ['asking questions and testing answers', 'memorizing facts', 'magic'], hint: 'Question + test!', misconception: 'Science = observe, question, hypothesize, test — a method, not just facts.', workedExample: ['Ask why.', 'Test it.', "That's science."] }],
    reflect: { prompts: ['What did you discover about What is Science and Why It Matters?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_socialsciencegrassrootsdemocracypart3sim: SimDef = {
    id: 'w_c6_socialsciencegrassrootsdemocracypart3sim', title: 'Social Science Grassroots Democracy Part3', subtitle: 'What is Grassroots Democracy?',
    classLevel: 6, subject: 'social', topic: 'What is Grassroots Democracy?',
    chapters: ['c6_civics_ch12'],
    nodeIds: ['c6_civics_ch12_015', 'c6_civics_ch12_016', 'c6_civics_ch12_017', 'c6_civics_ch12_018', 'c6_civics_ch12_019', 'c6_civics_ch12_020', 'c6_civics_ch12_021', 'c6_civics_ch12_022'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: What is Grassroots Democracy?', goal: 'Master What is Grassroots Democracy?' },
    discovery: { question: 'How does a village make decisions about its own roads and water?', options: ['Through the Gram Panchayat — village self-government', 'The Prime Minister decides', 'Nobody decides'], answer: 'Through the Gram Panchayat — village self-government', hook: 'Grassroots democracy = decisions made at the local level — the Gram Panchayat and Gram Sabha run village affairs!' },
    teaching: [{ title: 'Grassroots Democracy', text: 'Panchayati Raj = village self-government. The Gram Sabha (all villagers) and Gram Panchayat (elected) decide locally.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_SocialScienceGrassrootsDemocracyPart3Sim, prompt: 'Try the interactive — Grassroots Democracy' },
    challenges: [{ type: '', nodeId: 'c6_civics_ch12_015', question: 'The Gram Panchayat is:', answer: "the village's elected local government", options: ["the village's elected local government", 'a national body', 'a court'], hint: 'Village level!', misconception: 'Gram Panchayat = elected village council — local self-government.', workedExample: ['Village = Panchayat.', 'Elected locally.', 'Runs village affairs.'] }],
    reflect: { prompts: ['What did you discover about What is Grassroots Democracy??'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_socialsciencegrassrootsdemocracysim: SimDef = {
    id: 'w_c6_socialsciencegrassrootsdemocracysim', title: 'Social Science Grassroots Democracy', subtitle: 'What is Grassroots Democracy?',
    classLevel: 6, subject: 'social', topic: 'What is Grassroots Democracy?',
    chapters: ['c6_civics_ch12'],
    nodeIds: ['c6_civics_ch12_015', 'c6_civics_ch12_016', 'c6_civics_ch12_017', 'c6_civics_ch12_018', 'c6_civics_ch12_019', 'c6_civics_ch12_020', 'c6_civics_ch12_021', 'c6_civics_ch12_022'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: What is Grassroots Democracy?', goal: 'Master What is Grassroots Democracy?' },
    discovery: { question: 'Why is it better for villagers to decide local issues than a faraway government?', options: ['They know their own needs best — local decisions fit local needs', "It's cheaper", "It's faster"], answer: 'They know their own needs best — local decisions fit local needs', hook: 'Decentralization! Local government means people closest to a problem decide it — faster and better-suited!' },
    teaching: [{ title: 'Local Self-Government', text: 'Grassroots democracy puts power at the village level — people decide their own roads, water, schools.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_SocialScienceGrassrootsDemocracySim, prompt: 'Try the interactive — Local Self-Government' },
    challenges: [{ type: '', nodeId: 'c6_civics_ch12_015', question: 'Grassroots democracy means:', answer: 'decisions made at the local/village level', options: ['decisions made at the local/village level', 'only national elections', 'no government'], hint: 'Bottom-up!', misconception: 'Grassroots = local level — villagers decide their own issues.', workedExample: ['Local = grassroots.', 'Village decides.', 'Decentralized power.'] }],
    reflect: { prompts: ['What did you discover about What is Grassroots Democracy??'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_socialscienceruraladministrationsim: SimDef = {
    id: 'w_c6_socialscienceruraladministrationsim', title: 'Social Science Rural Administration', subtitle: 'What is Grassroots Democracy?',
    classLevel: 6, subject: 'social', topic: 'What is Grassroots Democracy?',
    chapters: ['c6_civics_ch12'],
    nodeIds: ['c6_civics_ch12_015', 'c6_civics_ch12_016', 'c6_civics_ch12_017', 'c6_civics_ch12_018', 'c6_civics_ch12_019', 'c6_civics_ch12_020', 'c6_civics_ch12_021', 'c6_civics_ch12_022'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: What is Grassroots Democracy?', goal: 'Master What is Grassroots Democracy?' },
    discovery: { question: 'If two farmers dispute a field boundary, who settles it at the village level?', options: ['The Panchayat and local officials like the Patwari', 'The Supreme Court', 'Nobody'], answer: 'The Panchayat and local officials like the Patwari', hook: "Rural administration handles land records (Patwari), disputes (Panchayat), and policing — the village's own system!" },
    teaching: [{ title: 'Rural Administration', text: 'Rural areas are run by the Panchayat (council), Patwari (land records), and local police — administration close to home.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_SocialScienceRuralAdministrationSim, prompt: 'Try the interactive — Rural Administration' },
    challenges: [{ type: '', nodeId: 'c6_civics_ch12_015', question: 'Land records in a village are kept by:', answer: 'the Patwari', options: ['the Patwari', 'the mayor', 'the Prime Minister'], hint: 'Village record-keeper!', misconception: 'The Patwari maintains village land records — part of rural administration.', workedExample: ['Patwari = records.', 'Panchayat = disputes.', 'Local admin.'] }],
    reflect: { prompts: ['What did you discover about What is Grassroots Democracy??'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};
export const w_c6_socialsciencerurallivelihoodssim: SimDef = {
    id: 'w_c6_socialsciencerurallivelihoodssim', title: 'Social Science Rural Livelihoods', subtitle: 'Understanding Economic Activities',
    classLevel: 6, subject: 'social', topic: 'Understanding Economic Activities',
    chapters: ['c6_civics_ch16'],
    nodeIds: ['c6_civics_ch16_039', 'c6_civics_ch16_040', 'c6_civics_ch16_041'],
    emoji: '🔬', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a young scientist', intro: 'Explore: Understanding Economic Activities', goal: 'Master Understanding Economic Activities' },
    discovery: { question: 'Not every villager farms — what other work happens in a village?', options: ['Diverse work — teaching, shopkeeping, carpentry, labour', 'Only farming', 'No work'], answer: 'Diverse work — teaching, shopkeeping, carpentry, labour', hook: 'Rural livelihoods are diverse — farming plus shops, crafts, teaching, and daily labour. A whole local economy!' },
    teaching: [{ title: 'Rural Livelihoods', text: 'Villages have varied work — farming, small shops, crafts, teaching, labour — not everyone is a farmer.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }],
    explore: { component: C6_SocialScienceRuralLivelihoodsSim, prompt: 'Try the interactive — Rural Livelihoods' },
    challenges: [{ type: '', nodeId: 'c6_civics_ch16_039', question: 'Rural livelihoods include:', answer: 'farming, shops, crafts, and labour', options: ['farming, shops, crafts, and labour', 'only farming', 'only factory work'], hint: 'Many kinds of work!', misconception: 'Rural livelihoods span farming, trade, crafts, and daily labour.', workedExample: ['Not just farming.', 'Shops, crafts, labour.', 'Diverse economy.'] }],
    reflect: { prompts: ['What did you discover about Understanding Economic Activities?'] },
    successLine: 'Mastered it! 🌟', tryAgainLine: 'Try the simulation again.',
};

export const C6_WRAPPED = [w_c6_biologyleafstructuretypessim, w_c6_biologymodesdiseasetransmissionsim, w_c6_biologyplantanimalcellsim, w_c6_chemistryatomicstructuresubatomicparticlessim, w_c6_chemistrycarbondioxideandnitrogeninairsim, w_c6_chemistrymatteranditscompositionsim, w_c6_computersciencealgorithmsdefinitionpropertiessim, w_c6_computersciencecategoriescomputersmicrosim, w_c6_computersciencepowerpointimportingdatasim, w_c6_evsenvironmentbioticabioticsim, w_c6_evshumanimpactenvironmentsim, w_c6_geographymapsintroductionsim, w_c6_geographywaterbodiesoceanssim, w_c6_historycivicsashokasconversionbuddhismsim, w_c6_historycivicscompositionmunicipalcorporationsim, w_c6_historycivicsearlyvedicpoliticalsim, w_c6_historycivicshistorymeaningdefinitionsim, w_c6_historycivicsindusvalleysocietysim, w_c6_historycivicsscientificprogressguptasim, w_c6_historycivicsspreaddeclinejainismsim, w_c6_mathematicscardinalitysim, w_c6_mathematicscollectionorganisationdatasim, w_c6_mathematicsconsolidatingsensenumbernesssim, w_c6_mathematicsconstructionsdrawinglinesim, w_c6_mathematicsideapercentfractionsim, w_c6_mathematicslinelinesegmentsim, w_c6_mathematicsnumberlineseeingsim, w_c6_mathematicspairlinesintersectingsim, w_c6_mathematicsperimeterandareasim, w_c6_mathematicsprimetimesim, w_c6_mathematicsprimetimetheidlivadasim, w_c6_mathematicssimplificationbracketssim, w_c6_mathematicssymmetrysim, w_c6_mathematicstheothersideofzerosim, w_c6_physicselectricitycircuitscbsesim, w_c6_physicsphysicalquantitiesunitssim, w_c6_physicspitchsoundfrequencysim, w_c6_physicsrectilinearpropagationlightsim, w_c6_physicsuniformnonuniformmotionsim, w_c6_scienceajourneythroughstatesofsim, w_c6_sciencebeyondearthsim, w_c6_sciencebodymovementssim, w_c6_sciencechangesaroundussim, w_c6_sciencecomponentsoffoodsim, w_c6_sciencediversityinthelivingworldsim, w_c6_scienceexploringmagnetssim, w_c6_sciencefibretofabricsim, w_c6_sciencefoodwheredoesitcomesim, w_c6_sciencegarbageingarbageoutsim, w_c6_sciencelivingcreaturesexploringtheircharacteristicssim, w_c6_sciencematerialsaroundussim, w_c6_sciencemethodsofseparationineverydaysim, w_c6_sciencemindfuleatingapathtosim, w_c6_sciencenaturestreasuressim, w_c6_scienceseparationofsubstancessim, w_c6_sciencesortingmaterialsintogroupssim, w_c6_sciencetemperatureanditsmeasurementsim, w_c6_sciencethelivingorganismscharacteristicsandsim, w_c6_sciencethewonderfulworldofsciencesim, w_c6_socialsciencegrassrootsdemocracypart3sim, w_c6_socialsciencegrassrootsdemocracysim, w_c6_socialscienceruraladministrationsim, w_c6_socialsciencerurallivelihoodssim];