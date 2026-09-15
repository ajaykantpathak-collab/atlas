// C6 old-sim registry -> enhanced nodeIds (chapter-level coverage)
// Each chapter-based sim maps to all nodes in its chapter.

import type { ComponentType } from 'react';

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

export interface C6OldSim { id: string; component: ComponentType; nodeIds: string[]; }

export const C6_OLD_SIMS: C6OldSim[] = [
  { id: 'C6_BiologyLeafStructureTypesSim', component: C6_BiologyLeafStructureTypesSim, nodeIds: ['c6_biology_ch10_001', 'c6_biology_ch10_002', 'c6_biology_ch10_003', 'c6_biology_ch10_004', 'c6_biology_ch10_005', 'c6_biology_ch10_006', 'c6_biology_ch10_007'] },
  { id: 'C6_BiologyModesDiseaseTransmissionSim', component: C6_BiologyModesDiseaseTransmissionSim, nodeIds: ['c6_biology_ch09_001', 'c6_biology_ch09_002', 'c6_biology_ch09_003', 'c6_biology_ch09_004', 'c6_biology_ch09_005', 'c6_biology_ch09_006', 'c6_biology_ch09_007', 'c6_biology_ch09_008'] },
  { id: 'C6_BiologyPlantAnimalCellSim', component: C6_BiologyPlantAnimalCellSim, nodeIds: ['c6_biology_ch10_001', 'c6_biology_ch10_002', 'c6_biology_ch10_003', 'c6_biology_ch10_004', 'c6_biology_ch10_005', 'c6_biology_ch10_006', 'c6_biology_ch10_007'] },
  { id: 'C6_ChemistryAtomicstructuresubatomicparticlesSim', component: C6_ChemistryAtomicstructuresubatomicparticlesSim, nodeIds: ['c6_chemistry_ch04_001', 'c6_chemistry_ch04_002', 'c6_chemistry_ch04_003', 'c6_chemistry_ch04_004', 'c6_chemistry_ch04_005', 'c6_chemistry_ch04_006', 'c6_chemistry_ch04_007', 'c6_chemistry_ch04_008', 'c6_chemistry_ch04_009', 'c6_chemistry_ch04_010'] },
  { id: 'C6_ChemistryCarbondioxideandnitrogeninairSim', component: C6_ChemistryCarbondioxideandnitrogeninairSim, nodeIds: ['c6_chemistry_ch04_001', 'c6_chemistry_ch04_002', 'c6_chemistry_ch04_003', 'c6_chemistry_ch04_004', 'c6_chemistry_ch04_005', 'c6_chemistry_ch04_006', 'c6_chemistry_ch04_007', 'c6_chemistry_ch04_008', 'c6_chemistry_ch04_009', 'c6_chemistry_ch04_010'] },
  { id: 'C6_ChemistryMatteranditscompositionSim', component: C6_ChemistryMatteranditscompositionSim, nodeIds: ['c6_chemistry_ch04_001', 'c6_chemistry_ch04_002', 'c6_chemistry_ch04_003', 'c6_chemistry_ch04_004', 'c6_chemistry_ch04_005', 'c6_chemistry_ch04_006', 'c6_chemistry_ch04_007', 'c6_chemistry_ch04_008', 'c6_chemistry_ch04_009', 'c6_chemistry_ch04_010'] },
  { id: 'C6_ComputerScienceAlgorithmsDefinitionPropertiesSim', component: C6_ComputerScienceAlgorithmsDefinitionPropertiesSim, nodeIds: [] },
  { id: 'C6_ComputerScienceCategoriesComputersMicroSim', component: C6_ComputerScienceCategoriesComputersMicroSim, nodeIds: [] },
  { id: 'C6_ComputerSciencePowerpointImportingDataSim', component: C6_ComputerSciencePowerpointImportingDataSim, nodeIds: [] },
  { id: 'C6_EVSEnvironmentBioticAbioticSim', component: C6_EVSEnvironmentBioticAbioticSim, nodeIds: ['c6_biology_ch10_001', 'c6_biology_ch10_002', 'c6_biology_ch10_003', 'c6_biology_ch10_004', 'c6_biology_ch10_005', 'c6_biology_ch10_006', 'c6_biology_ch10_007'] },
  { id: 'C6_EVSHumanImpactEnvironmentSim', component: C6_EVSHumanImpactEnvironmentSim, nodeIds: ['c6_physics_ch02_006', 'c6_physics_ch02_007', 'c6_physics_ch02_008', 'c6_physics_ch02_009', 'c6_physics_ch02_010'] },
  { id: 'C6_GeographyMapsIntroductionSim', component: C6_GeographyMapsIntroductionSim, nodeIds: ['c6_geography_ch01_001', 'c6_geography_ch01_002', 'c6_geography_ch01_003', 'c6_geography_ch01_004', 'c6_geography_ch01_005', 'c6_geography_ch01_006', 'c6_geography_ch01_007'] },
  { id: 'C6_GeographyWaterBodiesOceansSim', component: C6_GeographyWaterBodiesOceansSim, nodeIds: ['c6_geography_ch01_001', 'c6_geography_ch01_002', 'c6_geography_ch01_003', 'c6_geography_ch01_004', 'c6_geography_ch01_005', 'c6_geography_ch01_006', 'c6_geography_ch01_007'] },
  { id: 'C6_HistoryCivicsAshokasConversionBuddhismSim', component: C6_HistoryCivicsAshokasConversionBuddhismSim, nodeIds: ['c6_history_ch05_007', 'c6_history_ch05_008', 'c6_history_ch05_009', 'c6_history_ch05_010', 'c6_history_ch05_011', 'c6_history_ch05_012', 'c6_history_ch05_013', 'c6_history_ch05_014'] },
  { id: 'C6_HistoryCivicsCompositionMunicipalCorporationSim', component: C6_HistoryCivicsCompositionMunicipalCorporationSim, nodeIds: ['c6_civics_ch12_015', 'c6_civics_ch12_016', 'c6_civics_ch12_017', 'c6_civics_ch12_018', 'c6_civics_ch12_019', 'c6_civics_ch12_020', 'c6_civics_ch12_021', 'c6_civics_ch12_022'] },
  { id: 'C6_HistoryCivicsEarlyVedicPoliticalSim', component: C6_HistoryCivicsEarlyVedicPoliticalSim, nodeIds: ['c6_history_ch04_001', 'c6_history_ch04_002', 'c6_history_ch04_003', 'c6_history_ch04_004', 'c6_history_ch04_005', 'c6_history_ch04_006'] },
  { id: 'C6_HistoryCivicsHistoryMeaningDefinitionSim', component: C6_HistoryCivicsHistoryMeaningDefinitionSim, nodeIds: ['c6_history_ch04_001', 'c6_history_ch04_002', 'c6_history_ch04_003', 'c6_history_ch04_004', 'c6_history_ch04_005', 'c6_history_ch04_006'] },
  { id: 'C6_HistoryCivicsIndusValleySocietySim', component: C6_HistoryCivicsIndusValleySocietySim, nodeIds: ['c6_history_ch04_001', 'c6_history_ch04_002', 'c6_history_ch04_003', 'c6_history_ch04_004', 'c6_history_ch04_005', 'c6_history_ch04_006'] },
  { id: 'C6_HistoryCivicsScientificProgressGuptaSim', component: C6_HistoryCivicsScientificProgressGuptaSim, nodeIds: ['c6_history_ch09_033', 'c6_history_ch09_034', 'c6_history_ch09_035', 'c6_history_ch09_036', 'c6_history_ch09_037', 'c6_history_ch09_038'] },
  { id: 'C6_HistoryCivicsSpreadDeclineJainismSim', component: C6_HistoryCivicsSpreadDeclineJainismSim, nodeIds: ['c6_history_ch06_015', 'c6_history_ch06_016', 'c6_history_ch06_017', 'c6_history_ch06_018', 'c6_history_ch06_019', 'c6_history_ch06_020'] },
  { id: 'C6_MathematicsCardinalitySim', component: C6_MathematicsCardinalitySim, nodeIds: ['c6_math_ch01_001', 'c6_math_ch01_002', 'c6_math_ch01_003', 'c6_math_ch01_004', 'c6_math_ch01_005', 'c6_math_ch01_006', 'c6_math_ch01_007', 'c6_math_ch01_008', 'c6_math_ch01_009', 'c6_math_ch01_010', 'c6_math_ch01_011', 'c6_math_ch01_012', 'c6_math_ch01_013', 'c6_math_ch01_014', 'c6_math_ch01_015'] },
  { id: 'C6_MathematicsCollectionOrganisationDataSim', component: C6_MathematicsCollectionOrganisationDataSim, nodeIds: ['c6_math_ch09_095', 'c6_math_ch09_096', 'c6_math_ch09_097', 'c6_math_ch09_098', 'c6_math_ch09_099', 'c6_math_ch09_100', 'c6_math_ch09_101', 'c6_math_ch09_102', 'c6_math_ch09_103', 'c6_math_ch09_104'] },
  { id: 'C6_MathematicsConsolidatingSenseNumbernessSim', component: C6_MathematicsConsolidatingSenseNumbernessSim, nodeIds: ['c6_math_ch01_001', 'c6_math_ch01_002', 'c6_math_ch01_003', 'c6_math_ch01_004', 'c6_math_ch01_005', 'c6_math_ch01_006', 'c6_math_ch01_007', 'c6_math_ch01_008', 'c6_math_ch01_009', 'c6_math_ch01_010', 'c6_math_ch01_011', 'c6_math_ch01_012', 'c6_math_ch01_013', 'c6_math_ch01_014', 'c6_math_ch01_015'] },
  { id: 'C6_MathematicsConstructionsDrawingLineSim', component: C6_MathematicsConstructionsDrawingLineSim, nodeIds: ['c6_math_ch11_113', 'c6_math_ch11_114', 'c6_math_ch11_115', 'c6_math_ch11_116', 'c6_math_ch11_117', 'c6_math_ch11_118', 'c6_math_ch11_119', 'c6_math_ch11_120'] },
  { id: 'C6_MathematicsIdeaPercentFractionSim', component: C6_MathematicsIdeaPercentFractionSim, nodeIds: ['c6_math_ch03_029', 'c6_math_ch03_030', 'c6_math_ch03_031', 'c6_math_ch03_032', 'c6_math_ch03_033', 'c6_math_ch03_034', 'c6_math_ch03_035', 'c6_math_ch03_036', 'c6_math_ch03_037', 'c6_math_ch03_038', 'c6_math_ch03_039', 'c6_math_ch03_040', 'c6_math_ch03_041'] },
  { id: 'C6_MathematicsLineLineSegmentSim', component: C6_MathematicsLineLineSegmentSim, nodeIds: ['c6_math_ch07_070', 'c6_math_ch07_071', 'c6_math_ch07_072', 'c6_math_ch07_073', 'c6_math_ch07_074', 'c6_math_ch07_075', 'c6_math_ch07_076', 'c6_math_ch07_077', 'c6_math_ch07_078', 'c6_math_ch07_079', 'c6_math_ch07_080', 'c6_math_ch07_081', 'c6_math_ch07_082', 'c6_math_ch07_083', 'c6_math_ch07_084'] },
  { id: 'C6_MathematicsNumberLineSeeingSim', component: C6_MathematicsNumberLineSeeingSim, nodeIds: ['c6_math_ch02_016', 'c6_math_ch02_017', 'c6_math_ch02_018', 'c6_math_ch02_019', 'c6_math_ch02_020', 'c6_math_ch02_021', 'c6_math_ch02_022', 'c6_math_ch02_023', 'c6_math_ch02_024', 'c6_math_ch02_025', 'c6_math_ch02_026', 'c6_math_ch02_027', 'c6_math_ch02_028'] },
  { id: 'C6_MathematicsPairLinesIntersectingSim', component: C6_MathematicsPairLinesIntersectingSim, nodeIds: ['c6_math_ch07_070', 'c6_math_ch07_071', 'c6_math_ch07_072', 'c6_math_ch07_073', 'c6_math_ch07_074', 'c6_math_ch07_075', 'c6_math_ch07_076', 'c6_math_ch07_077', 'c6_math_ch07_078', 'c6_math_ch07_079', 'c6_math_ch07_080', 'c6_math_ch07_081', 'c6_math_ch07_082', 'c6_math_ch07_083', 'c6_math_ch07_084'] },
  { id: 'C6_MathematicsPerimeterAndAreaSim', component: C6_MathematicsPerimeterAndAreaSim, nodeIds: ['c6_math_ch08_085', 'c6_math_ch08_086', 'c6_math_ch08_087', 'c6_math_ch08_088', 'c6_math_ch08_089', 'c6_math_ch08_090', 'c6_math_ch08_091', 'c6_math_ch08_092', 'c6_math_ch08_093', 'c6_math_ch08_094'] },
  { id: 'C6_MathematicsPrimeTimeSim', component: C6_MathematicsPrimeTimeSim, nodeIds: ['c6_math_ch01_001', 'c6_math_ch01_002', 'c6_math_ch01_003', 'c6_math_ch01_004', 'c6_math_ch01_005', 'c6_math_ch01_006', 'c6_math_ch01_007', 'c6_math_ch01_008', 'c6_math_ch01_009', 'c6_math_ch01_010', 'c6_math_ch01_011', 'c6_math_ch01_012', 'c6_math_ch01_013', 'c6_math_ch01_014', 'c6_math_ch01_015'] },
  { id: 'C6_MathematicsPrimeTimeTheIdliVadaSim', component: C6_MathematicsPrimeTimeTheIdliVadaSim, nodeIds: ['c6_math_ch01_001', 'c6_math_ch01_002', 'c6_math_ch01_003', 'c6_math_ch01_004', 'c6_math_ch01_005', 'c6_math_ch01_006', 'c6_math_ch01_007', 'c6_math_ch01_008', 'c6_math_ch01_009', 'c6_math_ch01_010', 'c6_math_ch01_011', 'c6_math_ch01_012', 'c6_math_ch01_013', 'c6_math_ch01_014', 'c6_math_ch01_015'] },
  { id: 'C6_MathematicsSimplificationBracketsSim', component: C6_MathematicsSimplificationBracketsSim, nodeIds: ['c6_math_ch05_052', 'c6_math_ch05_053', 'c6_math_ch05_054', 'c6_math_ch05_055', 'c6_math_ch05_056', 'c6_math_ch05_057', 'c6_math_ch05_058', 'c6_math_ch05_059', 'c6_math_ch05_060', 'c6_math_ch05_061'] },
  { id: 'C6_MathematicsSymmetrySim', component: C6_MathematicsSymmetrySim, nodeIds: ['c6_math_ch10_105', 'c6_math_ch10_106', 'c6_math_ch10_107', 'c6_math_ch10_108', 'c6_math_ch10_109', 'c6_math_ch10_110', 'c6_math_ch10_111', 'c6_math_ch10_112'] },
  { id: 'C6_MathematicsTheOtherSideOfZeroSim', component: C6_MathematicsTheOtherSideOfZeroSim, nodeIds: ['c6_math_ch02_016', 'c6_math_ch02_017', 'c6_math_ch02_018', 'c6_math_ch02_019', 'c6_math_ch02_020', 'c6_math_ch02_021', 'c6_math_ch02_022', 'c6_math_ch02_023', 'c6_math_ch02_024', 'c6_math_ch02_025', 'c6_math_ch02_026', 'c6_math_ch02_027', 'c6_math_ch02_028'] },
  { id: 'C6_PhysicsElectricityCircuitsCBSESim', component: C6_PhysicsElectricityCircuitsCBSESim, nodeIds: ['c6_physics_ch03_011', 'c6_physics_ch03_012', 'c6_physics_ch03_013', 'c6_physics_ch03_014', 'c6_physics_ch03_015', 'c6_physics_ch03_016', 'c6_physics_ch03_017', 'c6_physics_ch03_018'] },
  { id: 'C6_PhysicsPhysicalQuantitiesUnitsSim', component: C6_PhysicsPhysicalQuantitiesUnitsSim, nodeIds: ['c6_physics_ch01_001', 'c6_physics_ch01_002', 'c6_physics_ch01_003', 'c6_physics_ch01_004', 'c6_physics_ch01_005'] },
  { id: 'C6_PhysicsPitchSoundFrequencySim', component: C6_PhysicsPitchSoundFrequencySim, nodeIds: ['c6_physics_ch03_011', 'c6_physics_ch03_012', 'c6_physics_ch03_013', 'c6_physics_ch03_014', 'c6_physics_ch03_015', 'c6_physics_ch03_016', 'c6_physics_ch03_017', 'c6_physics_ch03_018'] },
  { id: 'C6_PhysicsRectilinearPropagationLightSim', component: C6_PhysicsRectilinearPropagationLightSim, nodeIds: ['c6_physics_ch11_035', 'c6_physics_ch11_036', 'c6_physics_ch11_037', 'c6_physics_ch11_038', 'c6_physics_ch11_039', 'c6_physics_ch11_040', 'c6_physics_ch11_041', 'c6_physics_ch11_042', 'c6_physics_ch11_043', 'c6_physics_ch11_044'] },
  { id: 'C6_PhysicsUniformNonuniformMotionSim', component: C6_PhysicsUniformNonuniformMotionSim, nodeIds: ['c6_physics_ch08_027', 'c6_physics_ch08_028', 'c6_physics_ch08_029', 'c6_physics_ch08_030', 'c6_physics_ch08_031', 'c6_physics_ch08_032', 'c6_physics_ch08_033', 'c6_physics_ch08_034'] },
  { id: 'C6_ScienceAJourneyThroughStatesOfSim', component: C6_ScienceAJourneyThroughStatesOfSim, nodeIds: ['c6_physics_ch07_019', 'c6_physics_ch07_020', 'c6_physics_ch07_021', 'c6_physics_ch07_022', 'c6_physics_ch07_023', 'c6_physics_ch07_024', 'c6_physics_ch07_025', 'c6_physics_ch07_026'] },
  { id: 'C6_ScienceBeyondEarthSim', component: C6_ScienceBeyondEarthSim, nodeIds: ['c6_physics_ch12_045', 'c6_physics_ch12_046', 'c6_physics_ch12_047', 'c6_physics_ch12_048', 'c6_physics_ch12_049', 'c6_physics_ch12_050', 'c6_physics_ch12_051', 'c6_physics_ch12_052'] },
  { id: 'C6_ScienceBodyMovementsSim', component: C6_ScienceBodyMovementsSim, nodeIds: ['c6_biology_ch10_001', 'c6_biology_ch10_002', 'c6_biology_ch10_003', 'c6_biology_ch10_004', 'c6_biology_ch10_005', 'c6_biology_ch10_006', 'c6_biology_ch10_007'] },
  { id: 'C6_ScienceChangesAroundUsSim', component: C6_ScienceChangesAroundUsSim, nodeIds: ['c6_chemistry_ch05_001', 'c6_chemistry_ch05_002', 'c6_chemistry_ch05_003', 'c6_chemistry_ch05_004', 'c6_chemistry_ch05_005', 'c6_chemistry_ch05_006', 'c6_chemistry_ch05_007', 'c6_chemistry_ch05_008', 'c6_chemistry_ch05_009', 'c6_chemistry_ch05_010'] },
  { id: 'C6_ScienceComponentsOfFoodSim', component: C6_ScienceComponentsOfFoodSim, nodeIds: ['c6_biology_ch09_001', 'c6_biology_ch09_002', 'c6_biology_ch09_003', 'c6_biology_ch09_004', 'c6_biology_ch09_005', 'c6_biology_ch09_006', 'c6_biology_ch09_007', 'c6_biology_ch09_008'] },
  { id: 'C6_ScienceDiversityInTheLivingWorldSim', component: C6_ScienceDiversityInTheLivingWorldSim, nodeIds: ['c6_biology_ch10_001', 'c6_biology_ch10_002', 'c6_biology_ch10_003', 'c6_biology_ch10_004', 'c6_biology_ch10_005', 'c6_biology_ch10_006', 'c6_biology_ch10_007'] },
  { id: 'C6_ScienceExploringMagnetsSim', component: C6_ScienceExploringMagnetsSim, nodeIds: ['c6_physics_ch03_011', 'c6_physics_ch03_012', 'c6_physics_ch03_013', 'c6_physics_ch03_014', 'c6_physics_ch03_015', 'c6_physics_ch03_016', 'c6_physics_ch03_017', 'c6_physics_ch03_018'] },
  { id: 'C6_ScienceFibreToFabricSim', component: C6_ScienceFibreToFabricSim, nodeIds: [] },
  { id: 'C6_ScienceFoodWhereDoesItComeSim', component: C6_ScienceFoodWhereDoesItComeSim, nodeIds: ['c6_biology_ch09_001', 'c6_biology_ch09_002', 'c6_biology_ch09_003', 'c6_biology_ch09_004', 'c6_biology_ch09_005', 'c6_biology_ch09_006', 'c6_biology_ch09_007', 'c6_biology_ch09_008'] },
  { id: 'C6_ScienceGarbageInGarbageOutSim', component: C6_ScienceGarbageInGarbageOutSim, nodeIds: ['c6_chemistry_ch05_001', 'c6_chemistry_ch05_002', 'c6_chemistry_ch05_003', 'c6_chemistry_ch05_004', 'c6_chemistry_ch05_005', 'c6_chemistry_ch05_006', 'c6_chemistry_ch05_007', 'c6_chemistry_ch05_008', 'c6_chemistry_ch05_009', 'c6_chemistry_ch05_010'] },
  { id: 'C6_ScienceLivingCreaturesExploringTheirCharacteristicsSim', component: C6_ScienceLivingCreaturesExploringTheirCharacteristicsSim, nodeIds: ['c6_biology_ch10_001', 'c6_biology_ch10_002', 'c6_biology_ch10_003', 'c6_biology_ch10_004', 'c6_biology_ch10_005', 'c6_biology_ch10_006', 'c6_biology_ch10_007'] },
  { id: 'C6_ScienceMaterialsAroundUsSim', component: C6_ScienceMaterialsAroundUsSim, nodeIds: ['c6_chemistry_ch04_001', 'c6_chemistry_ch04_002', 'c6_chemistry_ch04_003', 'c6_chemistry_ch04_004', 'c6_chemistry_ch04_005', 'c6_chemistry_ch04_006', 'c6_chemistry_ch04_007', 'c6_chemistry_ch04_008', 'c6_chemistry_ch04_009', 'c6_chemistry_ch04_010'] },
  { id: 'C6_ScienceMethodsOfSeparationInEverydaySim', component: C6_ScienceMethodsOfSeparationInEverydaySim, nodeIds: ['c6_chemistry_ch05_001', 'c6_chemistry_ch05_002', 'c6_chemistry_ch05_003', 'c6_chemistry_ch05_004', 'c6_chemistry_ch05_005', 'c6_chemistry_ch05_006', 'c6_chemistry_ch05_007', 'c6_chemistry_ch05_008', 'c6_chemistry_ch05_009', 'c6_chemistry_ch05_010'] },
  { id: 'C6_ScienceMindfulEatingAPathToSim', component: C6_ScienceMindfulEatingAPathToSim, nodeIds: ['c6_biology_ch09_001', 'c6_biology_ch09_002', 'c6_biology_ch09_003', 'c6_biology_ch09_004', 'c6_biology_ch09_005', 'c6_biology_ch09_006', 'c6_biology_ch09_007', 'c6_biology_ch09_008'] },
  { id: 'C6_ScienceNatureSTreasuresSim', component: C6_ScienceNatureSTreasuresSim, nodeIds: ['c6_physics_ch02_006', 'c6_physics_ch02_007', 'c6_physics_ch02_008', 'c6_physics_ch02_009', 'c6_physics_ch02_010'] },
  { id: 'C6_ScienceSeparationOfSubstancesSim', component: C6_ScienceSeparationOfSubstancesSim, nodeIds: ['c6_chemistry_ch05_001', 'c6_chemistry_ch05_002', 'c6_chemistry_ch05_003', 'c6_chemistry_ch05_004', 'c6_chemistry_ch05_005', 'c6_chemistry_ch05_006', 'c6_chemistry_ch05_007', 'c6_chemistry_ch05_008', 'c6_chemistry_ch05_009', 'c6_chemistry_ch05_010'] },
  { id: 'C6_ScienceSortingMaterialsIntoGroupsSim', component: C6_ScienceSortingMaterialsIntoGroupsSim, nodeIds: ['c6_chemistry_ch04_001', 'c6_chemistry_ch04_002', 'c6_chemistry_ch04_003', 'c6_chemistry_ch04_004', 'c6_chemistry_ch04_005', 'c6_chemistry_ch04_006', 'c6_chemistry_ch04_007', 'c6_chemistry_ch04_008', 'c6_chemistry_ch04_009', 'c6_chemistry_ch04_010'] },
  { id: 'C6_ScienceTemperatureAndItsMeasurementSim', component: C6_ScienceTemperatureAndItsMeasurementSim, nodeIds: [] },
  { id: 'C6_ScienceTheLivingOrganismsCharacteristicsAndSim', component: C6_ScienceTheLivingOrganismsCharacteristicsAndSim, nodeIds: ['c6_biology_ch10_001', 'c6_biology_ch10_002', 'c6_biology_ch10_003', 'c6_biology_ch10_004', 'c6_biology_ch10_005', 'c6_biology_ch10_006', 'c6_biology_ch10_007'] },
  { id: 'C6_ScienceTheWonderfulWorldOfScienceSim', component: C6_ScienceTheWonderfulWorldOfScienceSim, nodeIds: ['c6_physics_ch01_001', 'c6_physics_ch01_002', 'c6_physics_ch01_003', 'c6_physics_ch01_004', 'c6_physics_ch01_005'] },
  { id: 'C6_SocialScienceGrassrootsDemocracyPart3Sim', component: C6_SocialScienceGrassrootsDemocracyPart3Sim, nodeIds: ['c6_civics_ch12_015', 'c6_civics_ch12_016', 'c6_civics_ch12_017', 'c6_civics_ch12_018', 'c6_civics_ch12_019', 'c6_civics_ch12_020', 'c6_civics_ch12_021', 'c6_civics_ch12_022'] },
  { id: 'C6_SocialScienceGrassrootsDemocracySim', component: C6_SocialScienceGrassrootsDemocracySim, nodeIds: ['c6_civics_ch12_015', 'c6_civics_ch12_016', 'c6_civics_ch12_017', 'c6_civics_ch12_018', 'c6_civics_ch12_019', 'c6_civics_ch12_020', 'c6_civics_ch12_021', 'c6_civics_ch12_022'] },
  { id: 'C6_SocialScienceRuralAdministrationSim', component: C6_SocialScienceRuralAdministrationSim, nodeIds: ['c6_civics_ch12_015', 'c6_civics_ch12_016', 'c6_civics_ch12_017', 'c6_civics_ch12_018', 'c6_civics_ch12_019', 'c6_civics_ch12_020', 'c6_civics_ch12_021', 'c6_civics_ch12_022'] },
  { id: 'C6_SocialScienceRuralLivelihoodsSim', component: C6_SocialScienceRuralLivelihoodsSim, nodeIds: ['c6_civics_ch16_039', 'c6_civics_ch16_040', 'c6_civics_ch16_041'] },
];