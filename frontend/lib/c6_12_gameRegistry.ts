/**
 * c6_12_gameRegistry.ts — Auto-generated game registry for Class 6-12 sims.
 *
 * Generated from _manifest.json which was built from the 387 VertexAI-generated
 * simulation files in components/simulations/c6_12/.
 *
 * Each entry maps node IDs to the sim component. The junior/senior world
 * uses this to launch the right game when a topic is tapped.
 *
 * DO NOT EDIT MANUALLY — regenerate with:
 *   python scripts/build_c6_12_registry.py
 */

import dynamic from 'next/dynamic'
import type { GameMeta } from './gameRegistry'

// ─── Type for sim components ──────────────────────────────────
type SimComponent = React.ComponentType<{
  onComplete?: (score: number) => void
  width?: number
  height?: number
}>

function lazySim(path: string): SimComponent {
  return dynamic(() => import(path).then((m: Record<string, unknown>) => m.default as SimComponent), {
    ssr: false,
  }) as unknown as SimComponent
}

// ─── Lazy-loaded sim components ───────────────────────────────
const Sim0000 = lazySim('@/components/simulations/maths/LeverSimulation')
const Sim0001 = lazySim('@/components/simulations/maths/PulleySimulation')
const Sim0002 = lazySim('@/components/simulations/c6_12/C6_BiologyLeafStructureTypesSim')
const Sim0003 = lazySim('@/components/simulations/c6_12/C6_BiologyModesDiseaseTransmissionSim')
const Sim0004 = lazySim('@/components/simulations/c6_12/C6_BiologyPlantAnimalCellSim')
const Sim0005 = lazySim('@/components/simulations/c6_12/C6_ChemistryAtomicstructuresubatomicparticlesSim')
const Sim0006 = lazySim('@/components/simulations/c6_12/C6_ChemistryCarbondioxideandnitrogeninairSim')
const Sim0007 = lazySim('@/components/simulations/c6_12/C6_ChemistryMatteranditscompositionSim')
const Sim0008 = lazySim('@/components/simulations/c6_12/C6_ComputerScienceAlgorithmsDefinitionPropertiesSim')
const Sim0009 = lazySim('@/components/simulations/c6_12/C6_ComputerScienceCategoriesComputersMicroSim')
const Sim0010 = lazySim('@/components/simulations/c6_12/C6_ComputerSciencePowerpointImportingDataSim')
const Sim0011 = lazySim('@/components/simulations/c6_12/C6_EVSEnvironmentBioticAbioticSim')
const Sim0012 = lazySim('@/components/simulations/c6_12/C6_EVSHumanImpactEnvironmentSim')
const Sim0013 = lazySim('@/components/simulations/c6_12/C6_GeographyMapsIntroductionSim')
const Sim0014 = lazySim('@/components/simulations/c6_12/C6_GeographyWaterBodiesOceansSim')
const Sim0015 = lazySim('@/components/simulations/c6_12/C6_HistoryCivicsAshokasConversionBuddhismSim')
const Sim0016 = lazySim('@/components/simulations/c6_12/C6_HistoryCivicsCompositionMunicipalCorporationSim')
const Sim0017 = lazySim('@/components/simulations/c6_12/C6_HistoryCivicsEarlyVedicPoliticalSim')
const Sim0018 = lazySim('@/components/simulations/c6_12/C6_HistoryCivicsHistoryMeaningDefinitionSim')
const Sim0019 = lazySim('@/components/simulations/c6_12/C6_HistoryCivicsIndusValleySocietySim')
const Sim0020 = lazySim('@/components/simulations/c6_12/C6_HistoryCivicsScientificProgressGuptaSim')
const Sim0021 = lazySim('@/components/simulations/c6_12/C6_HistoryCivicsSpreadDeclineJainismSim')
const Sim0022 = lazySim('@/components/simulations/c6_12/C6_MathematicsPerimeterAndAreaSim')
const Sim0023 = lazySim('@/components/simulations/c6_12/C6_MathematicsPrimeTimeSim')
const Sim0024 = lazySim('@/components/simulations/c6_12/C6_MathematicsPrimeTimeTheIdliVadaSim')
const Sim0025 = lazySim('@/components/simulations/c6_12/C6_MathematicsSymmetrySim')
const Sim0026 = lazySim('@/components/simulations/c6_12/C6_MathematicsTheOtherSideOfZeroSim')
const Sim0027 = lazySim('@/components/simulations/c6_12/C6_MathematicsCardinalitySim')
const Sim0028 = lazySim('@/components/simulations/c6_12/C6_MathematicsCollectionOrganisationDataSim')
const Sim0029 = lazySim('@/components/simulations/c6_12/C6_MathematicsConsolidatingSenseNumbernessSim')
const Sim0030 = lazySim('@/components/simulations/c6_12/C6_MathematicsConstructionsDrawingLineSim')
const Sim0031 = lazySim('@/components/simulations/c6_12/C6_MathematicsIdeaPercentFractionSim')
const Sim0032 = lazySim('@/components/simulations/c6_12/C6_MathematicsLineLineSegmentSim')
const Sim0033 = lazySim('@/components/simulations/c6_12/C6_MathematicsNumberLineSeeingSim')
const Sim0034 = lazySim('@/components/simulations/c6_12/C6_MathematicsPairLinesIntersectingSim')
const Sim0035 = lazySim('@/components/simulations/c6_12/C6_MathematicsSimplificationBracketsSim')
const Sim0036 = lazySim('@/components/simulations/c6_12/C6_PhysicsPhysicalQuantitiesUnitsSim')
const Sim0037 = lazySim('@/components/simulations/c6_12/C6_PhysicsPitchSoundFrequencySim')
const Sim0038 = lazySim('@/components/simulations/c6_12/C6_PhysicsRectilinearPropagationLightSim')
const Sim0039 = lazySim('@/components/simulations/c6_12/C6_PhysicsUniformNonuniformMotionSim')
const Sim0040 = lazySim('@/components/simulations/c6_12/C6_PhysicsElectricityCircuitsCBSESim')
const Sim0041 = lazySim('@/components/simulations/c6_12/C6_ScienceAJourneyThroughStatesOfSim')
const Sim0042 = lazySim('@/components/simulations/c6_12/C6_ScienceBeyondEarthSim')
const Sim0043 = lazySim('@/components/simulations/c6_12/C6_ScienceBodyMovementsSim')
const Sim0044 = lazySim('@/components/simulations/c6_12/C6_ScienceChangesAroundUsSim')
const Sim0045 = lazySim('@/components/simulations/c6_12/C6_ScienceComponentsOfFoodSim')
const Sim0046 = lazySim('@/components/simulations/c6_12/C6_ScienceDiversityInTheLivingWorldSim')
const Sim0047 = lazySim('@/components/simulations/c6_12/C6_ScienceExploringMagnetsSim')
const Sim0048 = lazySim('@/components/simulations/c6_12/C6_ScienceFibreToFabricSim')
const Sim0049 = lazySim('@/components/simulations/c6_12/C6_ScienceFoodWhereDoesItComeSim')
const Sim0050 = lazySim('@/components/simulations/c6_12/C6_ScienceGarbageInGarbageOutSim')
const Sim0051 = lazySim('@/components/simulations/c6_12/C6_ScienceLivingCreaturesExploringTheirCharacteristicsSim')
const Sim0052 = lazySim('@/components/simulations/c6_12/C6_ScienceMaterialsAroundUsSim')
const Sim0053 = lazySim('@/components/simulations/c6_12/C6_ScienceMethodsOfSeparationInEverydaySim')
const Sim0054 = lazySim('@/components/simulations/c6_12/C6_ScienceMindfulEatingAPathToSim')
const Sim0055 = lazySim('@/components/simulations/c6_12/C6_ScienceNatureSTreasuresSim')
const Sim0056 = lazySim('@/components/simulations/c6_12/C6_ScienceSeparationOfSubstancesSim')
const Sim0057 = lazySim('@/components/simulations/c6_12/C6_ScienceSortingMaterialsIntoGroupsSim')
const Sim0058 = lazySim('@/components/simulations/c6_12/C6_ScienceTemperatureAndItsMeasurementSim')
const Sim0059 = lazySim('@/components/simulations/c6_12/C6_ScienceTheLivingOrganismsCharacteristicsAndSim')
const Sim0060 = lazySim('@/components/simulations/c6_12/C6_ScienceTheWonderfulWorldOfScienceSim')
const Sim0061 = lazySim('@/components/simulations/c6_12/C6_SocialScienceGrassrootsDemocracySim')
const Sim0062 = lazySim('@/components/simulations/c6_12/C6_SocialScienceRuralAdministrationSim')
const Sim0063 = lazySim('@/components/simulations/c6_12/C6_SocialScienceRuralLivelihoodsSim')
const Sim0064 = lazySim('@/components/simulations/c6_12/C7_BiologyKingdomFungiSim')
const Sim0065 = lazySim('@/components/simulations/c6_12/C7_BiologyPollutionEffectsEnvironmentSim')
const Sim0066 = lazySim('@/components/simulations/c6_12/C7_BiologyTissueConceptPlantSim')
const Sim0067 = lazySim('@/components/simulations/c6_12/C7_ChemistryAtomicstructureelectronsprotonsneutronsSim')
const Sim0068 = lazySim('@/components/simulations/c6_12/C7_ChemistryMatterclassificationrevisitedSim')
const Sim0069 = lazySim('@/components/simulations/c6_12/C7_ChemistryWaterauniversalsolventSim')
const Sim0070 = lazySim('@/components/simulations/c6_12/C7_ComputerScienceComputerEthicsUnethicalSim')
const Sim0071 = lazySim('@/components/simulations/c6_12/C7_ComputerScienceHtmlTablesTableSim')
const Sim0072 = lazySim('@/components/simulations/c6_12/C7_ComputerScienceInternalHardwareMotherboardSim')
const Sim0073 = lazySim('@/components/simulations/c6_12/C7_GeographySoilFormationSim')
const Sim0074 = lazySim('@/components/simulations/c6_12/C7_GeographyTopographicalMapsIntroductionSim')
const Sim0075 = lazySim('@/components/simulations/c6_12/C7_HistoryCivicsAlwarsNayanarsVaishnavaSim')
const Sim0076 = lazySim('@/components/simulations/c6_12/C7_HistoryCivicsBaburHumayunFoundingSim')
const Sim0077 = lazySim('@/components/simulations/c6_12/C7_HistoryCivicsComparativeStudyKhaljisSim')
const Sim0078 = lazySim('@/components/simulations/c6_12/C7_HistoryCivicsFivePillarsIslamSim')
const Sim0079 = lazySim('@/components/simulations/c6_12/C7_HistoryCivicsMeaningmedievalBeginningSim')
const Sim0080 = lazySim('@/components/simulations/c6_12/C7_HistoryCivicsObjectivesJusticeLibertySim')
const Sim0081 = lazySim('@/components/simulations/c6_12/C7_MathematicsAlgebraicExpressionsSim')
const Sim0082 = lazySim('@/components/simulations/c6_12/C7_MathematicsAnotherPeekBeyondThePointSim')
const Sim0083 = lazySim('@/components/simulations/c6_12/C7_MathematicsAPeekBeyondThePointSim')
const Sim0084 = lazySim('@/components/simulations/c6_12/C7_MathematicsArithmeticExpressionsSim')
const Sim0085 = lazySim('@/components/simulations/c6_12/C7_MathematicsATaleOfThreeIntersectingSim')
const Sim0086 = lazySim('@/components/simulations/c6_12/C7_MathematicsComparingQuantitiesSim')
const Sim0087 = lazySim('@/components/simulations/c6_12/C7_MathematicsConnectingTheDotsSim')
const Sim0088 = lazySim('@/components/simulations/c6_12/C7_MathematicsConstructionsAndTilingsSim')
const Sim0089 = lazySim('@/components/simulations/c6_12/C7_MathematicsDataHandlingSim')
const Sim0090 = lazySim('@/components/simulations/c6_12/C7_MathematicsExponentsAndPowersSim')
const Sim0091 = lazySim('@/components/simulations/c6_12/C7_MathematicsExpressionsUsingLetterNumbersSim')
const Sim0092 = lazySim('@/components/simulations/c6_12/C7_MathematicsFindingCommonGroundSim')
const Sim0093 = lazySim('@/components/simulations/c6_12/C7_MathematicsFindingTheUnknownSim')
const Sim0094 = lazySim('@/components/simulations/c6_12/C7_MathematicsLargeNumbersAroundUsSim')
const Sim0095 = lazySim('@/components/simulations/c6_12/C7_MathematicsNumberPlaySim')
const Sim0096 = lazySim('@/components/simulations/c6_12/C7_MathematicsPerimeterAndAreaSim')
const Sim0097 = lazySim('@/components/simulations/c6_12/C7_MathematicsRationalNumbersSim')
const Sim0098 = lazySim('@/components/simulations/c6_12/C7_MathematicsExtendCongruenceSimpleSim')
const Sim0099 = lazySim('@/components/simulations/c6_12/C7_MathematicsMultiplicationDivisionDecimalSim')
const Sim0100 = lazySim('@/components/simulations/c6_12/C7_MathematicsMultiplicationDivisionIntegersSim')
const Sim0101 = lazySim('@/components/simulations/c6_12/C7_MathematicsUnderstandingPercentageFractionSim')
const Sim0102 = lazySim('@/components/simulations/c6_12/C7_MathematicsUnderstandingShapesPairsSim')
const Sim0103 = lazySim('@/components/simulations/c6_12/C7_MathsVisualisingSolidShapesSim')
const Sim0104 = lazySim('@/components/simulations/c6_12/C7_PhysicsHeatTransferConductionSim')
const Sim0105 = lazySim('@/components/simulations/c6_12/C7_PhysicsOhmsSim')
const Sim0106 = lazySim('@/components/simulations/c6_12/C7_PhysicsPhysicalNatureMatterSim')
const Sim0107 = lazySim('@/components/simulations/c6_12/C7_PhysicsPressureFluidsliquidsSim')
const Sim0108 = lazySim('@/components/simulations/c6_12/C7_PhysicsElectricityCircuitsComponentsCBSESim')
const Sim0109 = lazySim('@/components/simulations/c6_12/C7_PhysicsLightReflectionMirrorsCBSESim')
const Sim0110 = lazySim('@/components/simulations/c6_12/C7_PhysicsLightShadowsReflectionsCBSESim')
const Sim0111 = lazySim('@/components/simulations/c6_12/C7_PhysicsMeasurementTimeMotionCBSESim')
const Sim0112 = lazySim('@/components/simulations/c6_12/C7_PhysicsMotionTimeCBSESim')
const Sim0113 = lazySim('@/components/simulations/c6_12/C7_ScienceAcidsBasesAndSaltsSim')
const Sim0114 = lazySim('@/components/simulations/c6_12/C7_ScienceAdolescenceAStageOfGrowthSim')
const Sim0115 = lazySim('@/components/simulations/c6_12/C7_ScienceEarthMoonAndTheSunSim')
const Sim0116 = lazySim('@/components/simulations/c6_12/C7_ScienceExploringSubstancesAcidicBasicNeutralSim')
const Sim0117 = lazySim('@/components/simulations/c6_12/C7_ScienceLifeProcessesInAnimalsSim')
const Sim0118 = lazySim('@/components/simulations/c6_12/C7_ScienceNutritionInAnimalsSim')
const Sim0119 = lazySim('@/components/simulations/c6_12/C7_ScienceRespirationInOrganismsSim')
const Sim0120 = lazySim('@/components/simulations/c6_12/C7_ScienceTheEverEvolvingWorldOfSim')
const Sim0121 = lazySim('@/components/simulations/c6_12/C7_ScienceTheWorldOfMetalsAndSim')
const Sim0122 = lazySim('@/components/simulations/c6_12/C7_SocialScienceHumanEnvironmentTropicalSim')
const Sim0123 = lazySim('@/components/simulations/c6_12/C7_SocialScienceKingsKingdomsSim')
const Sim0124 = lazySim('@/components/simulations/c6_12/C7_SocialScienceNewBeginningsCitiesSim')
const Sim0125 = lazySim('@/components/simulations/c6_12/C7_SocialScienceRegionalCulturesSim')
const Sim0126 = lazySim('@/components/simulations/c6_12/C7_SocialScienceTribesNomadsSim')
const Sim0127 = lazySim('@/components/simulations/c6_12/C8_BiologyDiffusionOsmosisSim')
const Sim0128 = lazySim('@/components/simulations/c6_12/C8_BiologyEndocrineSystemHormonesSim')
const Sim0129 = lazySim('@/components/simulations/c6_12/C8_BiologyMicrobesFoodProductionSim')
const Sim0130 = lazySim('@/components/simulations/c6_12/C8_ChemistryChemicalequationsbalancingSim')
const Sim0131 = lazySim('@/components/simulations/c6_12/C8_ChemistryMatterstatesandinterconversionrevisitedSim')
const Sim0132 = lazySim('@/components/simulations/c6_12/C8_ChemistryWaterpropertiesandcompositionSim')
const Sim0133 = lazySim('@/components/simulations/c6_12/C8_ComputerScienceAlgorithmsAdvancedPropertiesSim')
const Sim0134 = lazySim('@/components/simulations/c6_12/C8_ComputerScienceDevelopmentIntroductionTypesSim')
const Sim0135 = lazySim('@/components/simulations/c6_12/C8_ComputerScienceSoftwareTypesSystemSim')
const Sim0136 = lazySim('@/components/simulations/c6_12/C8_GeographyRepresentationGeographicalFeaturesSim')
const Sim0137 = lazySim('@/components/simulations/c6_12/C8_HistoryCivicsAmericanIndependenceBeginningSim')
const Sim0138 = lazySim('@/components/simulations/c6_12/C8_HistoryCivicsBattlePlassey1757Sim')
const Sim0139 = lazySim('@/components/simulations/c6_12/C8_HistoryCivicsLucknowPact1916Sim')
const Sim0140 = lazySim('@/components/simulations/c6_12/C8_HistoryCivicsPeriodTransitionMeaningSim')
const Sim0141 = lazySim('@/components/simulations/c6_12/C8_HistoryCivicsSwamiVivekanandaRamakrishnaSim')
const Sim0142 = lazySim('@/components/simulations/c6_12/C8_HistoryCivicsVicepresidentQualificationsElectionSim')
const Sim0143 = lazySim('@/components/simulations/c6_12/C8_HistoryCivicsWoodsDespatch1854Sim')
const Sim0144 = lazySim('@/components/simulations/c6_12/C8_MathematicsAlgebraicExpressionsAndIdentitiesSim')
const Sim0145 = lazySim('@/components/simulations/c6_12/C8_MathematicsAlgebraPlaySim')
const Sim0146 = lazySim('@/components/simulations/c6_12/C8_MathematicsASquareAndACubeSim')
const Sim0147 = lazySim('@/components/simulations/c6_12/C8_MathematicsComparingQuantitiesSim')
const Sim0148 = lazySim('@/components/simulations/c6_12/C8_MathematicsCubesAndCubeRootsSim')
const Sim0149 = lazySim('@/components/simulations/c6_12/C8_MathematicsDataHandlingSim')
const Sim0150 = lazySim('@/components/simulations/c6_12/C8_MathematicsDirectAndInverseProportionsSim')
const Sim0151 = lazySim('@/components/simulations/c6_12/C8_MathematicsDirectAndInverseProportionsIntroductionSim')
const Sim0152 = lazySim('@/components/simulations/c6_12/C8_MathematicsExploringSomeGeometricThemesSim')
const Sim0153 = lazySim('@/components/simulations/c6_12/C8_MathematicsExponentsAndPowersSim')
const Sim0154 = lazySim('@/components/simulations/c6_12/C8_MathematicsFractionsInDisguiseSim')
const Sim0155 = lazySim('@/components/simulations/c6_12/C8_MathematicsIntroductionToGraphsSim')
const Sim0156 = lazySim('@/components/simulations/c6_12/C8_MathematicsLinearEquationsInOneVariableSim')
const Sim0157 = lazySim('@/components/simulations/c6_12/C8_MathematicsPowerPlaySim')
const Sim0158 = lazySim('@/components/simulations/c6_12/C8_MathematicsProportionalReasoning1Sim')
const Sim0159 = lazySim('@/components/simulations/c6_12/C8_MathematicsProportionalReasoning2Sim')
const Sim0160 = lazySim('@/components/simulations/c6_12/C8_MathematicsQuadrilateralsSim')
const Sim0161 = lazySim('@/components/simulations/c6_12/C8_MathematicsSquaresAndSquareRootsSim')
const Sim0162 = lazySim('@/components/simulations/c6_12/C8_MathematicsTalesByDotsAndLinesSim')
const Sim0163 = lazySim('@/components/simulations/c6_12/C8_MathematicsTheBaudhayanaPythagorasTheoremSim')
const Sim0164 = lazySim('@/components/simulations/c6_12/C8_MathematicsUnderstandingQuadrilateralsSim')
const Sim0165 = lazySim('@/components/simulations/c6_12/C8_MathematicsWeDistributeYetThingsMultiplySim')
const Sim0166 = lazySim('@/components/simulations/c6_12/C8_MathematicsAreaTrapeziumPolygonSim')
const Sim0167 = lazySim('@/components/simulations/c6_12/C8_MathematicsDisjointSim')
const Sim0168 = lazySim('@/components/simulations/c6_12/C8_MathematicsFactorisationsimpleCasesSim')
const Sim0169 = lazySim('@/components/simulations/c6_12/C8_MathematicsPropertiesRationalNumbersSim')
const Sim0170 = lazySim('@/components/simulations/c6_12/C8_PhysicsBoilingEvaporationdifferencesSim')
const Sim0171 = lazySim('@/components/simulations/c6_12/C8_PhysicsKineticTheoryMatterSim')
const Sim0172 = lazySim('@/components/simulations/c6_12/C8_PhysicsLightningConductorSim')
const Sim0173 = lazySim('@/components/simulations/c6_12/C8_PhysicsTurningEffectForceSim')
const Sim0174 = lazySim('@/components/simulations/c6_12/C8_PhysicsElectricityMagneticHeatingCBSESim')
const Sim0175 = lazySim('@/components/simulations/c6_12/C8_PhysicsLightCBSESim')
const Sim0176 = lazySim('@/components/simulations/c6_12/C8_PhysicsSoundCBSESim')
const Sim0177 = lazySim('@/components/simulations/c6_12/C8_ScienceCoalAndPetroleumClass8Sim')
const Sim0178 = lazySim('@/components/simulations/c6_12/C8_ScienceConservationOfPlantsAndAnimalsSim')
const Sim0179 = lazySim('@/components/simulations/c6_12/C8_ScienceExploringForcesSim')
const Sim0180 = lazySim('@/components/simulations/c6_12/C8_ScienceExploringTheInvestigativeWorldOfSim')
const Sim0181 = lazySim('@/components/simulations/c6_12/C8_ScienceHealthTheUltimateTreasureSim')
const Sim0182 = lazySim('@/components/simulations/c6_12/C8_ScienceHowNatureWorksInHarmonySim')
const Sim0183 = lazySim('@/components/simulations/c6_12/C8_ScienceKeepingTimeWithTheSkiesSim')
const Sim0184 = lazySim('@/components/simulations/c6_12/C8_ScienceOurHomeEarthAUniqueSim')
const Sim0185 = lazySim('@/components/simulations/c6_12/C8_SciencePressureWindsStormsAndCyclonesSim')
const Sim0186 = lazySim('@/components/simulations/c6_12/C8_ScienceReachingTheAgeOfAdolescenceSim')
const Sim0187 = lazySim('@/components/simulations/c6_12/C8_ScienceReproductionInAnimalsSim')
const Sim0188 = lazySim('@/components/simulations/c6_12/C8_ScienceSomeNaturalPhenomenaSim')
const Sim0189 = lazySim('@/components/simulations/c6_12/C8_ScienceTheAmazingWorldOfSolutesSim')
const Sim0190 = lazySim('@/components/simulations/c6_12/C8_ScienceTheInvisibleLivingWorldBeyondSim')
const Sim0191 = lazySim('@/components/simulations/c6_12/C8_SocialScienceCulturalCurrentsSim')
const Sim0192 = lazySim('@/components/simulations/c6_12/C8_SocialScienceLawSocialJusticeSim')
const Sim0193 = lazySim('@/components/simulations/c6_12/C9_BiologyAnimalKingdomClassificationSim')
const Sim0194 = lazySim('@/components/simulations/c6_12/C9_BiologyCellTheoryCellSim')
const Sim0195 = lazySim('@/components/simulations/c6_12/C9_BiologyHealthOrganizationswhoSim')
const Sim0196 = lazySim('@/components/simulations/c6_12/C9_ChemistryAcidraincompositionandcausesSim')
const Sim0197 = lazySim('@/components/simulations/c6_12/C9_ChemistryCovalentbondingSim')
const Sim0198 = lazySim('@/components/simulations/c6_12/C9_ChemistryEnergychangesinchemicalreactionsSim')
const Sim0199 = lazySim('@/components/simulations/c6_12/C9_ChemistryLaboratorypreparationofhydrogenSim')
const Sim0200 = lazySim('@/components/simulations/c6_12/C9_ChemistrySoftwaterandhardwaterSim')
const Sim0201 = lazySim('@/components/simulations/c6_12/C9_ChemistrySymbolsofelementsSim')
const Sim0202 = lazySim('@/components/simulations/c6_12/C9_CommerceAppBasicTermsCommerceSim')
const Sim0203 = lazySim('@/components/simulations/c6_12/C9_CommerceAppInterrelationshipsDependenceFunctionalSim')
const Sim0204 = lazySim('@/components/simulations/c6_12/C9_CommercialStudiesAidsTradeBankingSim')
const Sim0205 = lazySim('@/components/simulations/c6_12/C9_CommercialStudiesCommercialNoncommercialActivitiesSim')
const Sim0206 = lazySim('@/components/simulations/c6_12/C9_CommercialStudiesMethodsCommunicationLetterSim')
const Sim0207 = lazySim('@/components/simulations/c6_12/C9_CommercialStudiesTypesBankAccountsSim')
const Sim0208 = lazySim('@/components/simulations/c6_12/C9_ComputerScienceBasicLogicGatesSim')
const Sim0209 = lazySim('@/components/simulations/c6_12/C9_ComputerScienceBluejCreatingProjectsSim')
const Sim0210 = lazySim('@/components/simulations/c6_12/C9_ComputerScienceComputerArchitectureCpuSim')
const Sim0211 = lazySim('@/components/simulations/c6_12/C9_ComputerScienceJavaLoopSyntaxSim')
const Sim0212 = lazySim('@/components/simulations/c6_12/C9_EconApplicationsEconomicEntitiesConsumerSim')
const Sim0213 = lazySim('@/components/simulations/c6_12/C9_EconApplicationsInterdependenceSectorsPrimarySim')
const Sim0214 = lazySim('@/components/simulations/c6_12/C9_EconomicsBasicEconomicProblemSim')
const Sim0215 = lazySim('@/components/simulations/c6_12/C9_EconomicsBasicEconomicTermsSim')
const Sim0216 = lazySim('@/components/simulations/c6_12/C9_EconomicsDefinitionEconomicsAdamSim')
const Sim0217 = lazySim('@/components/simulations/c6_12/C9_EconomicsGovernmentSchemesRemoveSim')
const Sim0218 = lazySim('@/components/simulations/c6_12/C9_EconomicsInterdependenceAgricultureIndustrySim')
const Sim0219 = lazySim('@/components/simulations/c6_12/C9_EVSBiodiversityLossCausesSim')
const Sim0220 = lazySim('@/components/simulations/c6_12/C9_EVSDomesticatedBiodiversityNativeSim')
const Sim0221 = lazySim('@/components/simulations/c6_12/C9_EVSEarthEnvironmentBioticSim')
const Sim0222 = lazySim('@/components/simulations/c6_12/C9_EVSForestEcosystemsTropicalSim')
const Sim0223 = lazySim('@/components/simulations/c6_12/C9_GeographyDenudationWindWorkSim')
const Sim0224 = lazySim('@/components/simulations/c6_12/C9_GeographyEarthPlanetSim')
const Sim0225 = lazySim('@/components/simulations/c6_12/C9_GeographyLandformsPlateausSim')
const Sim0226 = lazySim('@/components/simulations/c6_12_new/C9_GeoIndiaSizeLocationCBSESim')
const Sim0227 = lazySim('@/components/simulations/c6_12_new/C9_GeoNaturalVegetationCBSESim')
const Sim0228 = lazySim('@/components/simulations/c6_12/C9_HistoryCivicsCausesRiseJainismSim')
const Sim0229 = lazySim('@/components/simulations/c6_12/C9_HistoryCivicsCompositeCultureFactorsSim')
const Sim0230 = lazySim('@/components/simulations/c6_12/C9_HistoryCivicsDeclineHarappanCivilisationSim')
const Sim0231 = lazySim('@/components/simulations/c6_12/C9_HistoryCivicsDefinitionConstitutionSignificanceSim')
const Sim0232 = lazySim('@/components/simulations/c6_12/C9_HistoryCivicsGuptaContributionCultureSim')
const Sim0233 = lazySim('@/components/simulations/c6_12/C9_HistoryCivicsMidtermElectionByelectionSim')
const Sim0234 = lazySim('@/components/simulations/c6_12/C9_HistoryCivicsSourcesSangamTirukkuralSim')
const Sim0235 = lazySim('@/components/simulations/c6_12/C9_MathematicsExploringAlgebraicIdentitiesSim')
const Sim0236 = lazySim('@/components/simulations/c6_12/C9_MathematicsIMUpAndDownSim')
const Sim0237 = lazySim('@/components/simulations/c6_12/C9_MathematicsOrientingYourselfTheUseOfSim')
const Sim0238 = lazySim('@/components/simulations/c6_12/C9_MathematicsPredictingWhatComesNextExploringSim')
const Sim0239 = lazySim('@/components/simulations/c6_12/C9_MathematicsAreaTheoremsParallelogramsSim')
const Sim0240 = lazySim('@/components/simulations/c6_12/C9_MathematicsMedianUngroupedDataSim')
const Sim0241 = lazySim('@/components/simulations/c6_12/C9_MathematicsRateGrowthDepreciationSim')
const Sim0242 = lazySim('@/components/simulations/c6_12/C9_MathematicsRationalNumbersRealSim')
const Sim0243 = lazySim('@/components/simulations/c6_12/C9_MathematicsSidesTriangleGreaterSim')
const Sim0244 = lazySim('@/components/simulations/c6_12/C9_MathematicsSolvingSimultaneousLinearSim')
const Sim0245 = lazySim('@/components/simulations/c6_12/C9_MathematicsTrigonometricRatiosStandardSim')
const Sim0246 = lazySim('@/components/simulations/c6_12/C9_PhysicsEquationsUniformlyAcceleratedSim')
const Sim0247 = lazySim('@/components/simulations/c6_12/C9_PhysicsInternationalSystemUnitsSim')
const Sim0248 = lazySim('@/components/simulations/c6_12/C9_PhysicsOhmsResistanceSim')
const Sim0249 = lazySim('@/components/simulations/c6_12/C9_PhysicsSphericalMirrorsTermsSim')
const Sim0250 = lazySim('@/components/simulations/c6_12/C9_PhysicsWeightMassComparisonSim')
const Sim0251 = lazySim('@/components/simulations/c6_12/C9_PhysicsJourneyInsideAtomCBSESim')
const Sim0252 = lazySim('@/components/simulations/c6_12/C9_ScienceAtomicFoundationsOfMatterSim')
const Sim0253 = lazySim('@/components/simulations/c6_12/C9_ScienceDescribingMotionAroundUsSim')
const Sim0254 = lazySim('@/components/simulations/c6_12/C9_ScienceExplorationEnteringTheWorldOfSim')
const Sim0255 = lazySim('@/components/simulations/c6_12/C9_ScienceExploringMixturesAndTheirSeparationSim')
const Sim0256 = lazySim('@/components/simulations/c6_12/C9_ScienceHowForcesAffectMotionSim')
const Sim0257 = lazySim('@/components/simulations/c6_12/C9_ScienceReproductionHowLifeContinuesSim')
const Sim0258 = lazySim('@/components/simulations/c6_12/C9_ScienceSoundWavesCharacteristicsAndApplicationsSim')
const Sim0259 = lazySim('@/components/simulations/c6_12/C9_ScienceTissuesInActionSim')
const Sim0260 = lazySim('@/components/simulations/c6_12/C9_ScienceWorkEnergyAndSimpleMachinesSim')
const Sim0261 = lazySim('@/components/simulations/c6_12/C9_SocialScienceForestSocietySim')
const Sim0262 = lazySim('@/components/simulations/c6_12/C9_SocialScienceFrenchRevolutionSim')
const Sim0263 = lazySim('@/components/simulations/c6_12/C9_SocialScienceStateSociety1000CESim')
const Sim0264 = lazySim('@/components/simulations/c6_12/C9_SocialScienceWorkingOfInstitutionsSim')
const Sim0265 = lazySim('@/components/simulations/c6_12/C10_BiologyChromosomeStructurechromatinSim')
const Sim0266 = lazySim('@/components/simulations/c6_12/C10_BiologyCirculatorySystemdetailedSim')
const Sim0267 = lazySim('@/components/simulations/c6_12/C10_BiologyPollutionTypesSourcesSim')
const Sim0268 = lazySim('@/components/simulations/c6_12/C10_ChemistryAlkanesgeneralformulaandpreparationSim')
const Sim0269 = lazySim('@/components/simulations/c6_12/C10_ChemistryAlloysandamalgamsSim')
const Sim0270 = lazySim('@/components/simulations/c6_12/C10_ChemistryClassificationofbasesSim')
const Sim0271 = lazySim('@/components/simulations/c6_12/C10_ChemistryElectrolysisofspecificcompoundsSim')
const Sim0272 = lazySim('@/components/simulations/c6_12/C10_ChemistryPeriodicpropertiesatomicsizeSim')
const Sim0273 = lazySim('@/components/simulations/c6_12/C10_ChemistryPolarandnonpolarcovalentcompoundsSim')
const Sim0274 = lazySim('@/components/simulations/c6_12/C10_ChemistrySulphuricacidContactprocessSim')
const Sim0275 = lazySim('@/components/simulations/c6_12/C10_ChemistryVapourdensityandmolecularmassSim')
const Sim0276 = lazySim('@/components/simulations/c6_12/C10_CommerceAppDefinitionMarketsMarketingSim')
const Sim0277 = lazySim('@/components/simulations/c6_12/C10_CommerceAppSalesSellingProcessSim')
const Sim0278 = lazySim('@/components/simulations/c6_12/C10_CommerceAppSelectionMeaningMethodsSim')
const Sim0279 = lazySim('@/components/simulations/c6_12/C10_CommercialStudiesAdvertisingMeaningImportanceSim')
const Sim0280 = lazySim('@/components/simulations/c6_12/C10_CommercialStudiesFinalAccountsProfitSim')
const Sim0281 = lazySim('@/components/simulations/c6_12/C10_CommercialStudiesIndustrialRelationsMeaningSim')
const Sim0282 = lazySim('@/components/simulations/c6_12/C10_CommercialStudiesInternetBankingNeftSim')
const Sim0283 = lazySim('@/components/simulations/c6_12/C10_CommercialStudiesMeaningStakeholderSim')
const Sim0284 = lazySim('@/components/simulations/c6_12/C10_ComputerScienceJavaDataTypesSim')
const Sim0285 = lazySim('@/components/simulations/c6_12/C10_ComputerScienceJavaMathClassSim')
const Sim0286 = lazySim('@/components/simulations/c6_12/C10_ComputerScienceJavaProgramFactorialSim')
const Sim0287 = lazySim('@/components/simulations/c6_12/C10_ComputerSciencePrinciplesEncapsulationDataSim')
const Sim0288 = lazySim('@/components/simulations/c6_12/C10_EconApplicationsDemandMeaningTypesSim')
const Sim0289 = lazySim('@/components/simulations/c6_12/C10_EconApplicationsEffectsInflationDebtorsSim')
const Sim0290 = lazySim('@/components/simulations/c6_12/C10_EconApplicationsElasticitySupplyMeaningSim')
const Sim0291 = lazySim('@/components/simulations/c6_12/C10_EconApplicationsRoleCommercialBanksSim')
const Sim0292 = lazySim('@/components/simulations/c6_12/C10_EconomicsDeterminantsDemandNonpriceSim')
const Sim0293 = lazySim('@/components/simulations/c6_12/C10_EconomicsLandMeaningCharacteristicsSim')
const Sim0294 = lazySim('@/components/simulations/c6_12/C10_EconomicsPerfectCompetitionMeaningSim')
const Sim0295 = lazySim('@/components/simulations/c6_12/C10_EconomicsPublicExpenditureRevenueSim')
const Sim0296 = lazySim('@/components/simulations/c6_12/C10_EVSCauseEffectRelationsSim')
const Sim0297 = lazySim('@/components/simulations/c6_12/C10_EVSRoleIndustriesInstitutionsSim')
const Sim0298 = lazySim('@/components/simulations/c6_12/C10_GeographyEnergyResourcesConventionalSim')
const Sim0299 = lazySim('@/components/simulations/c6_12/C10_GeographyTopographicalMapsInterpretationSim')
const Sim0300 = lazySim('@/components/simulations/c6_12/C10_HistoryCivicsAdalatsMeaningAdvantagesSim')
const Sim0301 = lazySim('@/components/simulations/c6_12/C10_HistoryCivicsMeaningFederalSetupSim')
const Sim0302 = lazySim('@/components/simulations/c6_12/C10_HistoryCivicsNoncooperationProgrammeChauriSim')
const Sim0303 = lazySim('@/components/simulations/c6_12/C10_HistoryCivicsPresidentExecutiveLegislativeSim')
const Sim0304 = lazySim('@/components/simulations/c6_12/C10_HistoryCivicsRiseDictatorshipsCausesSim')
const Sim0305 = lazySim('@/components/simulations/c6_12/C10_MathematicsCoordinateGeometrySim')
const Sim0306 = lazySim('@/components/simulations/c6_12/C10_MathematicsIntroductionToTrigonometrySim')
const Sim0307 = lazySim('@/components/simulations/c6_12/C10_MathematicsProbabilitySim')
const Sim0308 = lazySim('@/components/simulations/c6_12/C10_MathematicsRealNumbersSim')
const Sim0309 = lazySim('@/components/simulations/c6_12/C10_MathematicsSomeApplicationsOfTrigonometrySim')
const Sim0310 = lazySim('@/components/simulations/c6_12/C10_MathematicsStatisticsSim')
const Sim0311 = lazySim('@/components/simulations/c6_12/C10_MathematicsSurfaceAreasAndVolumesSim')
const Sim0312 = lazySim('@/components/simulations/c6_12/C10_MathematicsTrianglesSim')
const Sim0313 = lazySim('@/components/simulations/c6_12/C10_AppliedMathsLogicReasoningPropositionsSim')
const Sim0314 = lazySim('@/components/simulations/c6_12/C10_MathematicsComputationBasiccostPriceSim')
const Sim0315 = lazySim('@/components/simulations/c6_12/C10_MathematicsConditionsParallelPerpendicularSim')
const Sim0316 = lazySim('@/components/simulations/c6_12/C10_MathematicsConstructionTangentsCircleSim')
const Sim0317 = lazySim('@/components/simulations/c6_12/C10_MathematicsFactorisingPolynomialCompletelySim')
const Sim0318 = lazySim('@/components/simulations/c6_12/C10_MathematicsGeometricProgressionFirstSim')
const Sim0319 = lazySim('@/components/simulations/c6_12/C10_MathematicsLocusEquidistantFromSim')
const Sim0320 = lazySim('@/components/simulations/c6_12/C10_MathematicsQuadraticEquationsIntroductionSim')
const Sim0321 = lazySim('@/components/simulations/c6_12/C10_MathematicsTrigonometricIdentitiessin2aSim')
const Sim0322 = lazySim('@/components/simulations/c6_12/C10_PhysicsEfficiencyMachinesetaSim')
const Sim0323 = lazySim('@/components/simulations/c6_12/C10_PhysicsHouseWiringPowerSim')
const Sim0324 = lazySim('@/components/simulations/c6_12/C10_PhysicsScatteringLightSim')
const Sim0325 = lazySim('@/components/simulations/c6_12/C10_PhysicsTurningEffectForceSim')
const Sim0326 = lazySim('@/components/simulations/c6_12/C10_ScienceAcidsBasesAndSaltsSim')
const Sim0327 = lazySim('@/components/simulations/c6_12/C10_ScienceChemicalReactionsAndEquationsSim')
const Sim0328 = lazySim('@/components/simulations/c6_12/C10_ScienceControlAndCoordinationSim')
const Sim0329 = lazySim('@/components/simulations/c6_12/C10_ScienceElectricitySim')
const Sim0330 = lazySim('@/components/simulations/c6_12/C10_ScienceHereditySim')
const Sim0331 = lazySim('@/components/simulations/c6_12/C10_ScienceHowDoOrganismsReproduceSim')
const Sim0332 = lazySim('@/components/simulations/c6_12/C10_ScienceLifeProcessesSim')
const Sim0333 = lazySim('@/components/simulations/c6_12/C10_ScienceMagneticEffectsOfElectricCurrentSim')
const Sim0334 = lazySim('@/components/simulations/c6_12/C10_ScienceMetalsAndNonMetalsSim')
const Sim0335 = lazySim('@/components/simulations/c6_12/C10_ScienceOurEnvironmentSim')
const Sim0336 = lazySim('@/components/simulations/c6_12/C10_ScienceTheHumanEyeAndTheSim')
const Sim0337 = lazySim('@/components/simulations/c6_12/C10_SocialScienceOutcomesOfDemocracySim')
const Sim0338 = lazySim('@/components/simulations/c6_12/C11_AccountancyAccountingStandardsMeaningSim')
const Sim0339 = lazySim('@/components/simulations/c6_12/C11_AccountancyBackgroundHistoryTypesSim')
const Sim0340 = lazySim('@/components/simulations/c6_12/C11_AccountancyBasicTermsDrawerSim')
const Sim0341 = lazySim('@/components/simulations/c6_12/C11_AccountancyCapitalisationEntranceAdmissionSim')
const Sim0342 = lazySim('@/components/simulations/c6_12/C11_AccountancyCashBookSimpleSim')
const Sim0343 = lazySim('@/components/simulations/c6_12/C11_AccountancyFromExtractBothSim')
const Sim0344 = lazySim('@/components/simulations/c6_12/C11_AccountancyTradingAccountMeaningSim')
const Sim0345 = lazySim('@/components/simulations/c6_12/C11_AccountancyTypesErrorsOmissionSim')
const Sim0346 = lazySim('@/components/simulations/c6_12/C11_BiologyAnimalKingdomOrganizationSim')
const Sim0347 = lazySim('@/components/simulations/c6_12/C11_BiologyCellWallPlasmodesmataSim')
const Sim0348 = lazySim('@/components/simulations/c6_12/C11_BiologyCirculatoryDisordersSim')
const Sim0349 = lazySim('@/components/simulations/c6_12/C11_BiologyElectronTransportSystemSim')
const Sim0350 = lazySim('@/components/simulations/c6_12/C11_BiologyEndocrineGlandsTheirSim')
const Sim0351 = lazySim('@/components/simulations/c6_12/C11_BiologyMitosisdetailedStagesSim')
const Sim0352 = lazySim('@/components/simulations/c6_12/C11_BiologyTaxonomyClassificationspeciesSim')
const Sim0353 = lazySim('@/components/simulations/c6_12/C11_BiotechnologyBiotechnologyDefinitionoecdSim')
const Sim0354 = lazySim('@/components/simulations/c6_12/C11_BiotechnologyChromatographyExchangePaperSim')
const Sim0355 = lazySim('@/components/simulations/c6_12/C11_BiotechnologyLowrybronstedTheoryAcidSim')
const Sim0356 = lazySim('@/components/simulations/c6_12/C11_BiotechnologyMendelsExperimentsLawsSim')
const Sim0357 = lazySim('@/components/simulations/c6_12/C11_BiotechnologyNutrientMediaWhiteSim')
const Sim0358 = lazySim('@/components/simulations/c6_12/C11_BiotechnologySignificanceMitosisMeiosisSim')
const Sim0359 = lazySim('@/components/simulations/c6_12/C11_BiologyBodyFluidsAndCirculationSim')
const Sim0360 = lazySim('@/components/simulations/c6_12/C11_BiologyExcretoryNephronSim')
const Sim0361 = lazySim('@/components/simulations/c6_12/C11_BiologyLocomotionAndMovementSim')
const Sim0362 = lazySim('@/components/simulations/c6_12/C11_BiologyNeuralControlAndCoordinationSim')
const Sim0363 = lazySim('@/components/simulations/c6_12_new/C11_BiologyPlantGrowthCBSESim')
const Sim0364 = lazySim('@/components/simulations/c6_12_new/C11_BiotechBioinformaticsCBSESim')
const Sim0365 = lazySim('@/components/simulations/c6_12_new/C11_BiotechBiomoleculesCBSESim')
const Sim0366 = lazySim('@/components/simulations/c6_12_new/C11_BiotechEnzymesBioenergeticsCBSESim')
const Sim0367 = lazySim('@/components/simulations/c6_12_new/C11_BiotechGeneticDisordersCBSESim')
const Sim0368 = lazySim('@/components/simulations/c6_12_new/C11_BiotechIntroductionCBSESim')
const Sim0369 = lazySim('@/components/simulations/c6_12/C11_BiotechnologyBasicProcessesSim')
const Sim0370 = lazySim('@/components/simulations/c6_12/C11_BiotechnologyBioreactorGrowthSim')
const Sim0371 = lazySim('@/components/simulations/c6_12_new/C11_BiotechProteinInformaticsCBSESim')
const Sim0372 = lazySim('@/components/simulations/c6_12_new/C11_BiotechToolsTechniquesCBSESim')
const Sim0373 = lazySim('@/components/simulations/c6_12/C11_BusinessStudiesEbankingOnlineServicesSim')
const Sim0374 = lazySim('@/components/simulations/c6_12/C11_BusinessStudiesInsuranceMeaningFeaturesSim')
const Sim0375 = lazySim('@/components/simulations/c6_12/C11_BusinessStudiesMeaningFeaturesBusinessSim')
const Sim0376 = lazySim('@/components/simulations/c6_12/C11_BusinessStudiesPublicPrivateCompaniesSim')
const Sim0377 = lazySim('@/components/simulations/c6_12/C11_ChemistryAlkenespreparationandstructureSim')
const Sim0378 = lazySim('@/components/simulations/c6_12/C11_ChemistryAufbauPauliandHundsrulesSim')
const Sim0379 = lazySim('@/components/simulations/c6_12/C11_ChemistryChemicalequilibriumdynamicnatureSim')
const Sim0380 = lazySim('@/components/simulations/c6_12/C11_ChemistryClassificationOfElementsAndPeriodicitySim')
const Sim0381 = lazySim('@/components/simulations/c6_12/C11_ChemistryDiscoveryofsubatomicparticlesSim')
const Sim0382 = lazySim('@/components/simulations/c6_12/C11_ChemistryFriedelCraftsalkylationandacylationSim')
const Sim0383 = lazySim('@/components/simulations/c6_12/C11_ChemistryHydrocarbonsSim')
const Sim0384 = lazySim('@/components/simulations/c6_12/C11_ChemistryHydrogenbondingSim')
const Sim0385 = lazySim('@/components/simulations/c6_12/C11_ChemistryImportanceandscopeofchemistrySim')
const Sim0386 = lazySim('@/components/simulations/c6_12/C11_ChemistryKosselLewisapproachtobondingSim')
const Sim0387 = lazySim('@/components/simulations/c6_12/C11_ChemistryOrganicChemistryBasicPrincPart1CBSESim')
const Sim0388 = lazySim('@/components/simulations/c6_12/C11_ChemistryOrganicChemistryBasicPrincPart2CBSESim')
const Sim0389 = lazySim('@/components/simulations/c6_12/C11_ChemistryQuantitativeanalysisSim')
const Sim0390 = lazySim('@/components/simulations/c6_12/C11_ChemistryRedoxReactionsCBSESim')
const Sim0391 = lazySim('@/components/simulations/c6_12/C11_ChemistrySolubilityproductSim')
const Sim0392 = lazySim('@/components/simulations/c6_12/C11_ChemistrySomeBasicConceptsofChemistryCBSESim')
const Sim0393 = lazySim('@/components/simulations/c6_12/C11_ChemistryStructureOfAtomSim')
const Sim0394 = lazySim('@/components/simulations/c6_12/C11_ChemistryThermodynamicsCBSESim')
const Sim0395 = lazySim('@/components/simulations/c6_12/C11_CommerceClassificationHumanActivitiesSim')
const Sim0396 = lazySim('@/components/simulations/c6_12/C11_CommerceCooperativeOrganisationsMeaningSim')
const Sim0397 = lazySim('@/components/simulations/c6_12/C11_CommerceExportDocumentsDocumentarySim')
const Sim0398 = lazySim('@/components/simulations/c6_12/C11_CommercePartnershipMeaningFeaturesSim')
const Sim0399 = lazySim('@/components/simulations/c6_12/C11_CommerceQcommercequickCommerceSim')
const Sim0400 = lazySim('@/components/simulations/c6_12/C11_CommerceTypesRetailTradeSim')
const Sim0401 = lazySim('@/components/simulations/c6_12/C11_ComputerScienceAddressingIpv4Ipv6Sim')
const Sim0402 = lazySim('@/components/simulations/c6_12/C11_ComputerScienceComputerArchitectureNeumannSim')
const Sim0403 = lazySim('@/components/simulations/c6_12/C11_ComputerScienceCreateAlterDropSim')
const Sim0404 = lazySim('@/components/simulations/c6_12/C11_ComputerScienceDataStructuresIntroductionSim')
const Sim0405 = lazySim('@/components/simulations/c6_12/C11_ComputerScienceExamPreparationPaperSim')
const Sim0406 = lazySim('@/components/simulations/c6_12/C11_ComputerScienceJavaArraysAdvancedSim')
const Sim0407 = lazySim('@/components/simulations/c6_12/C11_ComputerScienceJavaClassMemberSim')
const Sim0408 = lazySim('@/components/simulations/c6_12/C11_ComputerScienceJavaComplexProgramSim')
const Sim0409 = lazySim('@/components/simulations/c6_12/C11_ComputerScienceJavaIteratorsListiteratorSim')
const Sim0410 = lazySim('@/components/simulations/c6_12/C11_ComputerScienceFunctionsCallStackSim')
const Sim0411 = lazySim('@/components/simulations/c6_12/C11_ComputerScienceStringSlicingSim')
const Sim0412 = lazySim('@/components/simulations/c6_12_new/C11_EcoHumanCapitalCBSESim')
const Sim0413 = lazySim('@/components/simulations/c6_12_new/C11_EcoIndianEconomyCBSESim')
const Sim0414 = lazySim('@/components/simulations/c6_12_new/C11_EcoLiberalisationCBSESim')
const Sim0415 = lazySim('@/components/simulations/c6_12/C11_EconomicsDefinitionEconomicsAdamSim')
const Sim0416 = lazySim('@/components/simulations/c6_12/C11_EconomicsHumanWantsClassificationSim')
const Sim0417 = lazySim('@/components/simulations/c6_12/C11_EconomicsMeasuresDispersionDefinitionSim')
const Sim0418 = lazySim('@/components/simulations/c6_12/C11_EconomicsPlanningEconomicDevelopmentSim')
const Sim0419 = lazySim('@/components/simulations/c6_12/C11_EconomicsPresentationDataTabularSim')
const Sim0420 = lazySim('@/components/simulations/c6_12/C11_EconomicsTypesEconomiesSocialismSim')
const Sim0421 = lazySim('@/components/simulations/c6_12/C11_EconomicsAyurvedaHealthSim')
const Sim0422 = lazySim('@/components/simulations/c6_12/C11_EconomicsComparativeDevelopmentSim')
const Sim0423 = lazySim('@/components/simulations/c6_12/C11_EconomicsEmploymentGrowthInformalisationSim')
const Sim0424 = lazySim('@/components/simulations/c6_12/C11_EconomicsEmploymentInformalisationSim')
const Sim0425 = lazySim('@/components/simulations/c6_12/C11_EconomicsIndianArtArchitectureSim')
const Sim0426 = lazySim('@/components/simulations/c6_12/C11_EVSEnvironmentalScienceScopeSim')
const Sim0427 = lazySim('@/components/simulations/c6_12/C11_EVSHabitatsNichesGausesSim')
const Sim0428 = lazySim('@/components/simulations/c6_12/C11_EVSInternationalLegalRegimesSim')
const Sim0429 = lazySim('@/components/simulations/c6_12_new/C11_GeoClimateCBSESim')
const Sim0430 = lazySim('@/components/simulations/c6_12_new/C11_GeoGeographyDisciplineCBSESim')
const Sim0431 = lazySim('@/components/simulations/c6_12_new/C11_GeoGeomorphicProcessesCBSESim')
const Sim0432 = lazySim('@/components/simulations/c6_12/C11_GeographyAeolianProcessesLandformsSim')
const Sim0433 = lazySim('@/components/simulations/c6_12/C11_GeographyGeographyDisciplineSim')
const Sim0434 = lazySim('@/components/simulations/c6_12/C11_GeographyOceanCurrentsSim')
const Sim0435 = lazySim('@/components/simulations/c6_12/C11_GeographyOceanWaterSalinitySim')
const Sim0436 = lazySim('@/components/simulations/c6_12/C11_GeographyRiverRegimeSim')
const Sim0437 = lazySim('@/components/simulations/c6_12/C11_GeographyAtmosphereCompositionSim')
const Sim0438 = lazySim('@/components/simulations/c6_12/C11_GeographyAtmosphericCirculationSim')
const Sim0439 = lazySim('@/components/simulations/c6_12/C11_GeographyDrainageSystemSim')
const Sim0440 = lazySim('@/components/simulations/c6_12/C11_GeographyHeatBalanceSim')
const Sim0441 = lazySim('@/components/simulations/c6_12/C11_GeographyMapProjectionsSim')
const Sim0442 = lazySim('@/components/simulations/c6_12/C11_GeographyMapScaleSim')
const Sim0443 = lazySim('@/components/simulations/c6_12/C11_GeographyNaturalHazardsSim')
const Sim0444 = lazySim('@/components/simulations/c6_12/C11_GeographyOceanWaterMovementsSim')
const Sim0445 = lazySim('@/components/simulations/c6_12/C11_GeographyOriginEvolutionEarthSim')
const Sim0446 = lazySim('@/components/simulations/c6_12/C11_GeographyRemoteSensingSim')
const Sim0447 = lazySim('@/components/simulations/c6_12/C11_GeographyStructurePhysiographySim')
const Sim0448 = lazySim('@/components/simulations/c6_12/C11_GeographyWaterAtmosphereSim')
const Sim0449 = lazySim('@/components/simulations/c6_12_new/C11_GeoInteriorEarthCBSESim')
const Sim0450 = lazySim('@/components/simulations/c6_12_new/C11_GeoLandformsEvolutionCBSESim')
const Sim0451 = lazySim('@/components/simulations/c6_12_new/C11_GeoOceansContinentsCBSESim')
const Sim0452 = lazySim('@/components/simulations/c6_12/C11_HistoryCircumstancesLeadingProtestSim')
const Sim0453 = lazySim('@/components/simulations/c6_12/C11_HistoryDevelopmentRailwaysCommunicationsSim')
const Sim0454 = lazySim('@/components/simulations/c6_12/C11_HistoryEventsFrom1932Sim')
const Sim0455 = lazySim('@/components/simulations/c6_12/C11_HistoryLongtermCausesAllianceSim')
const Sim0456 = lazySim('@/components/simulations/c6_12/C11_HistorySatyagrahaAgainstRowlattSim')
const Sim0457 = lazySim('@/components/simulations/c6_12/C11_HistoryWeaknessesProvisionalGovernmentSim')
const Sim0458 = lazySim('@/components/simulations/c6_12/C11_HistoryChangingCulturalTraditionsSim')
const Sim0459 = lazySim('@/components/simulations/c6_12/C11_HistoryDisplacingIndigenousPeoplesSim')
const Sim0460 = lazySim('@/components/simulations/c6_12/C11_HistoryEmpireThreeContinentsSim')
const Sim0461 = lazySim('@/components/simulations/c6_12/C11_HistoryPathsModernisationSim')
const Sim0462 = lazySim('@/components/simulations/c6_12/C11_HistoryTheThreeOrdersSim')
const Sim0463 = lazySim('@/components/simulations/c6_12/C11_HistoryWritingCityLifeSim')
const Sim0464 = lazySim('@/components/simulations/c6_12/C11_HomeScienceConceptGrowthDevelopmentSim')
const Sim0465 = lazySim('@/components/simulations/c6_12/C11_HomeScienceIndividualCommunicationVerbalSim')
const Sim0466 = lazySim('@/components/simulations/c6_12/C11_HomeScienceIntroductionStreamsHomeSim')
const Sim0467 = lazySim('@/components/simulations/c6_12/C11_HomeScienceStorageFoodsPerishableSim')
const Sim0468 = lazySim('@/components/simulations/c6_12/C11_InformaticsPracticesKeysExplorerSim')
const Sim0469 = lazySim('@/components/simulations/c6_12/C11_LegalStudiesAncientIndiaHinduSim')
const Sim0470 = lazySim('@/components/simulations/c6_12/C11_LegalStudiesOrdersDecreesJudgementsSim')
const Sim0471 = lazySim('@/components/simulations/c6_12/C11_LegalStudiesPartnershipRegistrationDissolutionSim')
const Sim0472 = lazySim('@/components/simulations/c6_12/C11_MassMediaDifferenceBetweenTelevisionSim')
const Sim0473 = lazySim('@/components/simulations/c6_12/C11_MassMediaNewsValuesTimelinessSim')
const Sim0474 = lazySim('@/components/simulations/c6_12/C11_MassMediaUnderstandingCommunicationDefinitionSim')
const Sim0475 = lazySim('@/components/simulations/c6_12/C11_MathematicsConicSectionsSim')
const Sim0476 = lazySim('@/components/simulations/c6_12/C11_MathematicsIntroductionToThreeDimensionalGeometrySim')
const Sim0477 = lazySim('@/components/simulations/c6_12/C11_MathematicsPermutationsAndCombinationsSim')
const Sim0478 = lazySim('@/components/simulations/c6_12/C11_MathematicsProbabilitySim')
const Sim0479 = lazySim('@/components/simulations/c6_12/C11_MathematicsStatisticsSim')
const Sim0480 = lazySim('@/components/simulations/c6_12/C11_MathematicsStraightLinesSim')
const Sim0481 = lazySim('@/components/simulations/c6_12/C11_AppliedMathsComplexNumbersIntroductionSim')
const Sim0482 = lazySim('@/components/simulations/c6_12/C11_AppliedMathsCorrelationCovarianceKarlSim')
const Sim0483 = lazySim('@/components/simulations/c6_12/C11_AppliedMathsFinancialMathematicsPresentSim')
const Sim0484 = lazySim('@/components/simulations/c6_12/C11_AppliedMathsGeneralTermSumSim')
const Sim0485 = lazySim('@/components/simulations/c6_12/C11_AppliedMathsGraphQuadraticFunctionSim')
const Sim0486 = lazySim('@/components/simulations/c6_12/C11_AppliedMathsGraphsStandardRealSim')
const Sim0487 = lazySim('@/components/simulations/c6_12/C11_AppliedMathsLimitsAlgebraicTrigonometricSim')
const Sim0488 = lazySim('@/components/simulations/c6_12/C11_AppliedMathsSetsRepresentationsEmptySim')
const Sim0489 = lazySim('@/components/simulations/c6_12/C11_MathematicsCubeRootsUnitySim')
const Sim0490 = lazySim('@/components/simulations/c6_12/C11_MathematicsDerivativesSumDifferenceSim')
const Sim0491 = lazySim('@/components/simulations/c6_12/C11_MathematicsEllipseStandardEquationSim')
const Sim0492 = lazySim('@/components/simulations/c6_12/C11_MathematicsFundamentalPrincipleCountingSim')
const Sim0493 = lazySim('@/components/simulations/c6_12/C11_MathematicsGeneralMiddleTermSim')
const Sim0494 = lazySim('@/components/simulations/c6_12/C11_MathematicsHalfAngleOnethirdSim')
const Sim0495 = lazySim('@/components/simulations/c6_12/C11_MathematicsRealValuedFunctionsSim')
const Sim0496 = lazySim('@/components/simulations/c6_12/C11_MathematicsSetsRepresentationsEmptySim')
const Sim0497 = lazySim('@/components/simulations/c6_12/C11_MathematicsSignsTrigonometricFunctionsSim')
const Sim0498 = lazySim('@/components/simulations/c6_12/C11_MathematicsSymmetricFunctionsRootsSim')
const Sim0499 = lazySim('@/components/simulations/c6_12/C11_MathematicsVariousFormsEquationSim')
const Sim0500 = lazySim('@/components/simulations/c6_12_new/C11_MathsInfiniteSeriesCBSESim')
const Sim0501 = lazySim('@/components/simulations/c6_12_new/C11_MathsLinearInequalitiesCBSESim')
const Sim0502 = lazySim('@/components/simulations/c6_12/C11_PhysicsBernoullisTheoremSim')
const Sim0503 = lazySim('@/components/simulations/c6_12/C11_PhysicsConservationMechanicalEnergySim')
const Sim0504 = lazySim('@/components/simulations/c6_12/C11_PhysicsEquilibriumConcurrentForcesSim')
const Sim0505 = lazySim('@/components/simulations/c6_12/C11_PhysicsGeostationarySatellitesSim')
const Sim0506 = lazySim('@/components/simulations/c6_12/C11_PhysicsHeatTransferRadiationSim')
const Sim0507 = lazySim('@/components/simulations/c6_12/C11_PhysicsParallelPerpendicularAxesSim')
const Sim0508 = lazySim('@/components/simulations/c6_12/C11_PhysicsRefrigeratorCoefficientPerformanceSim')
const Sim0509 = lazySim('@/components/simulations/c6_12/C11_PhysicsResolutionVectorsRectangularSim')
const Sim0510 = lazySim('@/components/simulations/c6_12/C11_PhysicsSimplePendulumSim')
const Sim0511 = lazySim('@/components/simulations/c6_12/C11_PhysicsSystemsUnitscgsSim')
const Sim0512 = lazySim('@/components/simulations/c6_12/C11_PhysicsWorkDoneAdiabaticSim')
const Sim0513 = lazySim('@/components/simulations/c6_12/C11_PhysicsGravitationSim')
const Sim0514 = lazySim('@/components/simulations/c6_12/C11_PhysicsKineticTheoryGasesCBSESim')
const Sim0515 = lazySim('@/components/simulations/c6_12/C11_PhysicsMechanicalPropertiesSolidsCBSESim')
const Sim0516 = lazySim('@/components/simulations/c6_12/C11_PhysicsMotionStraightLineCBSESim')
const Sim0517 = lazySim('@/components/simulations/c6_12/C11_PhysicsOscillationsSim')
const Sim0518 = lazySim('@/components/simulations/c6_12/C11_PhysicsThermalPropertiesOfMatterSim')
const Sim0519 = lazySim('@/components/simulations/c6_12/C11_PhysicsThermodynamicsSim')
const Sim0520 = lazySim('@/components/simulations/c6_12/C11_PhysicsUnitsAndMeasurementSim')
const Sim0521 = lazySim('@/components/simulations/c6_12/C11_PhysicsWaveMotionPropertiesCBSESim')
const Sim0522 = lazySim('@/components/simulations/c6_12/C11_PoliticalScienceDisintegrationSovietUnionSim')
const Sim0523 = lazySim('@/components/simulations/c6_12/C11_PoliticalScienceMeaningPoliticalScienceSim')
const Sim0524 = lazySim('@/components/simulations/c6_12/C11_PoliticalScienceSovereigntyMeaningDefinitionSim')
const Sim0525 = lazySim('@/components/simulations/c6_12/C11_PoliticalScienceCitizenshipSim')
const Sim0526 = lazySim('@/components/simulations/c6_12/C11_PoliticalScienceFreedomSim')
const Sim0527 = lazySim('@/components/simulations/c6_12/C11_PoliticalScienceRightsSim')
const Sim0528 = lazySim('@/components/simulations/c6_12/C11_PsychologyDefinitionPsychologyBasicSim')
const Sim0529 = lazySim('@/components/simulations/c6_12/C11_PsychologyForgettingOccursSim')
const Sim0530 = lazySim('@/components/simulations/c6_12/C11_PsychologyStatisticsPsychologyDescriptiveSim')
const Sim0531 = lazySim('@/components/simulations/c6_12/C11_PsychologyTheoriesMotivationSim')
const Sim0532 = lazySim('@/components/simulations/c6_12_new/C11_PsyHumanDevelopmentCBSESim')
const Sim0533 = lazySim('@/components/simulations/c6_12_new/C11_PsyHumanMemoryCBSESim')
const Sim0534 = lazySim('@/components/simulations/c6_12_new/C11_PsyLearningCBSESim')
const Sim0535 = lazySim('@/components/simulations/c6_12_new/C11_PsyThinkingCBSESim')
const Sim0536 = lazySim('@/components/simulations/c6_12_new/C11_PsyWhatIsPsychologyCBSESim')
const Sim0537 = lazySim('@/components/simulations/c6_12/C11_SociologyEmergenceSociologyAnthropologySim')
const Sim0538 = lazySim('@/components/simulations/c6_12/C11_SociologyRoleRoleConflictSim')
const Sim0539 = lazySim('@/components/simulations/c6_12/C11_SociologyToolsDataCollectionSim')
const Sim0540 = lazySim('@/components/simulations/c6_12/C11_SociologyEnvironmentSocietySim')
const Sim0541 = lazySim('@/components/simulations/c6_12/C11_SociologyIndianSociologistsSim')
const Sim0542 = lazySim('@/components/simulations/c6_12/C11_SociologyRuralUrbanSocialOrderSim')
const Sim0543 = lazySim('@/components/simulations/c6_12/C11_SociologySocialProcessesSim')
const Sim0544 = lazySim('@/components/simulations/c6_12/C11_SociologySocialStratificationSim')
const Sim0545 = lazySim('@/components/simulations/c6_12/C11_SociologySocietySocietySim')
const Sim0546 = lazySim('@/components/simulations/c6_12/C11_SociologyWesternSociologistsSim')
const Sim0547 = lazySim('@/components/simulations/c6_12/C12_AccountancyComparativeStatementsMeaningSim')
const Sim0548 = lazySim('@/components/simulations/c6_12/C12_AccountancyCreatingWorksheetsEnteringSim')
const Sim0549 = lazySim('@/components/simulations/c6_12/C12_AccountancyDefinitionMeaningFeaturesSim')
const Sim0550 = lazySim('@/components/simulations/c6_12/C12_AccountancyDisclosureShareCapitalSim')
const Sim0551 = lazySim('@/components/simulations/c6_12/C12_AccountancyPastAdjustmentsAfterSim')
const Sim0552 = lazySim('@/components/simulations/c6_12/C12_AccountancyRetirementPartnerGainingSim')
const Sim0553 = lazySim('@/components/simulations/c6_12/C12_AccountancyTreatmentProposedDividendSim')
const Sim0554 = lazySim('@/components/simulations/c6_12/C12_AccountancyWorkingCapitalTurnoverSim')
const Sim0555 = lazySim('@/components/simulations/c6_12/C12_AppliedMathsDifferentiationApplicationsSim')
const Sim0556 = lazySim('@/components/simulations/c6_12/C12_AppliedMathsEMIAnnuitySim')
const Sim0557 = lazySim('@/components/simulations/c6_12/C12_AppliedMathsIntegrationApplicationsSim')
const Sim0558 = lazySim('@/components/simulations/c6_12/C12_BiologyDrugAlcoholAbuseSim')
const Sim0559 = lazySim('@/components/simulations/c6_12/C12_BiologyLinkageCrossingOverSim')
const Sim0560 = lazySim('@/components/simulations/c6_12/C12_BiologyMicrobesIndustrialProductsSim')
const Sim0561 = lazySim('@/components/simulations/c6_12/C12_BiologyMicrosporogenesisPollenGrainSim')
const Sim0562 = lazySim('@/components/simulations/c6_12/C12_BiologyOogenesisSim')
const Sim0563 = lazySim('@/components/simulations/c6_12/C12_BiologyOriginLifeSim')
const Sim0564 = lazySim('@/components/simulations/c6_12/C12_BiologyPopulationInteractionsSim')
const Sim0565 = lazySim('@/components/simulations/c6_12/C12_BiotechnologyGenomicCdnaLibrariesSim')
const Sim0566 = lazySim('@/components/simulations/c6_12/C12_BiotechnologyNucleotidesNucleosidesStructureSim')
const Sim0567 = lazySim('@/components/simulations/c6_12/C12_BiotechnologyRiceGenomeProjectSim')
const Sim0568 = lazySim('@/components/simulations/c6_12/C12_BiotechnologySequencingSangersChainSim')
const Sim0569 = lazySim('@/components/simulations/c6_12/C12_BiotechnologySomaticHybridisationpomatoSim')
const Sim0570 = lazySim('@/components/simulations/c6_12/C12_BiotechnologyTranslationInitiationElongationSim')
const Sim0571 = lazySim('@/components/simulations/c6_12/C12_BiologyBiodiversityAndConservationSim')
const Sim0572 = lazySim('@/components/simulations/c6_12_new/C12_BiologyClinicalNutritionCBSESim')
const Sim0573 = lazySim('@/components/simulations/c6_12_new/C12_BiologyEarlyChildhoodCareCBSESim')
const Sim0574 = lazySim('@/components/simulations/c6_12/C12_BiologyEcosystemSim')
const Sim0575 = lazySim('@/components/simulations/c6_12/C12_BiologyEnvironmentalIssuesSim')
const Sim0576 = lazySim('@/components/simulations/c6_12/C12_BiologyEvolutionSim')
const Sim0577 = lazySim('@/components/simulations/c6_12/C12_BiologyEvolutionNaturalSelectionSim')
const Sim0578 = lazySim('@/components/simulations/c6_12/C12_BiologyFloweringPlantDoubleFertilisationSim')
const Sim0579 = lazySim('@/components/simulations/c6_12_new/C12_BiologyFoodQualityCBSESim')
const Sim0580 = lazySim('@/components/simulations/c6_12_new/C12_BiologyHumanHealthandDiseaseCBSESim')
const Sim0581 = lazySim('@/components/simulations/c6_12/C12_BiologyHumanHealthImmunitySim')
const Sim0582 = lazySim('@/components/simulations/c6_12_new/C12_BiologyHumanReproductionCBSESim')
const Sim0583 = lazySim('@/components/simulations/c6_12_new/C12_BiologyMolecularBasisofInheritanceCBSESim')
const Sim0584 = lazySim('@/components/simulations/c6_12_new/C12_BiologyReproductiveHealthCBSESim')
const Sim0585 = lazySim('@/components/simulations/c6_12/C12_BiologySexualReproductionFloweringPlantsSim')
const Sim0586 = lazySim('@/components/simulations/c6_12_new/C12_BiotechAnimalCellCultureCBSESim')
const Sim0587 = lazySim('@/components/simulations/c6_12_new/C12_BiotechBioremediationCBSESim')
const Sim0588 = lazySim('@/components/simulations/c6_12_new/C12_BiotechGeneCloningCBSESim')
const Sim0589 = lazySim('@/components/simulations/c6_12_new/C12_BiotechGenomeTechnologyCBSESim')
const Sim0590 = lazySim('@/components/simulations/c6_12_new/C12_BiotechMicrobialCultureCBSESim')
const Sim0591 = lazySim('@/components/simulations/c6_12/C12_BiotechnologyGeneCloningSim')
const Sim0592 = lazySim('@/components/simulations/c6_12/C12_BiotechnologyHostVectorSystemSim')
const Sim0593 = lazySim('@/components/simulations/c6_12_new/C12_BiotechPlantTissueCultureCBSESim')
const Sim0594 = lazySim('@/components/simulations/c6_12_new/C12_BiotechRecombinantDNAApplicationsCBSESim')
const Sim0595 = lazySim('@/components/simulations/c6_12/C12_BusinessStudiesBusinessEnvironmentMeaningSim')
const Sim0596 = lazySim('@/components/simulations/c6_12/C12_BusinessStudiesCoordinationMeaningCoordinationSim')
const Sim0597 = lazySim('@/components/simulations/c6_12/C12_BusinessStudiesLoansFromFinancialSim')
const Sim0598 = lazySim('@/components/simulations/c6_12/C12_BusinessStudiesPlaceChannelsDistributionSim')
const Sim0599 = lazySim('@/components/simulations/c6_12/C12_BusinessStudiesPlanningMeaningStepsSim')
const Sim0600 = lazySim('@/components/simulations/c6_12/C12_ChemistryAdsorptionisothermsSim')
const Sim0601 = lazySim('@/components/simulations/c6_12/C12_ChemistryAldehydesKetonesandCarboxylicACBSESim')
const Sim0602 = lazySim('@/components/simulations/c6_12/C12_ChemistryAminesandDiazoniumSaltsCBSESim')
const Sim0603 = lazySim('@/components/simulations/c6_12/C12_ChemistryBatteriesandfuelcellsSim')
const Sim0604 = lazySim('@/components/simulations/c6_12/C12_ChemistryBiomoleculesCBSESim')
const Sim0605 = lazySim('@/components/simulations/c6_12/C12_ChemistryChemicalKineticsSim')
const Sim0606 = lazySim('@/components/simulations/c6_12/C12_ChemistryColourandmagneticpropertiesofcomplexesSim')
const Sim0607 = lazySim('@/components/simulations/c6_12/C12_ChemistryCoordinationCompoundsCBSESim')
const Sim0608 = lazySim('@/components/simulations/c6_12/C12_ChemistryDiazoniumsaltsSim')
const Sim0609 = lazySim('@/components/simulations/c6_12/C12_ChemistryDrugtargetinteractionSim')
const Sim0610 = lazySim('@/components/simulations/c6_12/C12_ChemistryElectrochemistryCBSESim')
const Sim0611 = lazySim('@/components/simulations/c6_12/C12_ChemistryGeneralPrinciplesAndProcessesOfSim')
const Sim0612 = lazySim('@/components/simulations/c6_12/C12_ChemistryHaloalkanesandHaloarenesCBSESim')
const Sim0613 = lazySim('@/components/simulations/c6_12/C12_ChemistryIdealandnonidealsolutionsSim')
const Sim0614 = lazySim('@/components/simulations/c6_12/C12_ChemistryPhenolsSim')
const Sim0615 = lazySim('@/components/simulations/c6_12/C12_ChemistrySolidstatecharacteristicsSim')
const Sim0616 = lazySim('@/components/simulations/c6_12/C12_ChemistrySolutionsCBSESim')
const Sim0617 = lazySim('@/components/simulations/c6_12/C12_ChemistryTransitionmetalstrendsSim')
const Sim0618 = lazySim('@/components/simulations/c6_12/C12_ChemistryUsesofmetalsandalloysSim')
const Sim0619 = lazySim('@/components/simulations/c6_12/C12_ChemistryWilliamsonethersynthesisSim')
const Sim0620 = lazySim('@/components/simulations/c6_12/C12_CommerceBonusIssueRightsSim')
const Sim0621 = lazySim('@/components/simulations/c6_12/C12_CommerceBusinessEnvironmentMeaningSim')
const Sim0622 = lazySim('@/components/simulations/c6_12/C12_CommerceComparisonTaylorFayolSim')
const Sim0623 = lazySim('@/components/simulations/c6_12/C12_CommerceDigitalMarketingSocialSim')
const Sim0624 = lazySim('@/components/simulations/c6_12/C12_CommerceDirectingMeaningImportanceSim')
const Sim0625 = lazySim('@/components/simulations/c6_12/C12_CommerceMarketsMeaningTypesSim')
const Sim0626 = lazySim('@/components/simulations/c6_12/C12_ComputerScienceAdvancedBooleanAlgebraSim')
const Sim0627 = lazySim('@/components/simulations/c6_12/C12_ComputerScienceBinarySearchTreeSim')
const Sim0628 = lazySim('@/components/simulations/c6_12/C12_ComputerScienceDatabaseNormalization1nfSim')
const Sim0629 = lazySim('@/components/simulations/c6_12/C12_ComputerScienceFinalRevisionCompleteSim')
const Sim0630 = lazySim('@/components/simulations/c6_12/C12_ComputerScienceJavaProjectBankingSim')
const Sim0631 = lazySim('@/components/simulations/c6_12/C12_ComputerScienceJavaStreamFilterSim')
const Sim0632 = lazySim('@/components/simulations/c6_12/C12_ComputerScienceNetworkSecurityCryptographySim')
const Sim0633 = lazySim('@/components/simulations/c6_12/C12_ComputerScienceOperatingSystemInternalsSim')
const Sim0634 = lazySim('@/components/simulations/c6_12/C12_ComputerScienceSoftwareTestingUnitSim')
const Sim0635 = lazySim('@/components/simulations/c6_12/C12_ComputerScienceComputerNetworksSim')
const Sim0636 = lazySim('@/components/simulations/c6_12/C12_ComputerSciencePacketJourneySim')
const Sim0637 = lazySim('@/components/simulations/c6_12_new/C12_EcoConsumerBehaviourCBSESim')
const Sim0638 = lazySim('@/components/simulations/c6_12_new/C12_EcoGovernmentBudgetCBSESim')
const Sim0639 = lazySim('@/components/simulations/c6_12_new/C12_EcoMarketEquilibriumCBSESim')
const Sim0640 = lazySim('@/components/simulations/c6_12_new/C12_EcoNationalIncomeCBSESim')
const Sim0641 = lazySim('@/components/simulations/c6_12/C12_EconomicsCircularFlowIncomeSim')
const Sim0642 = lazySim('@/components/simulations/c6_12/C12_EconomicsCrossElasticityDemandSim')
const Sim0643 = lazySim('@/components/simulations/c6_12/C12_EconomicsDemandMeaningTypesSim')
const Sim0644 = lazySim('@/components/simulations/c6_12/C12_EconomicsEquimarginalUtilityStatementSim')
const Sim0645 = lazySim('@/components/simulations/c6_12/C12_EconomicsExanteplannedDemandSim')
const Sim0646 = lazySim('@/components/simulations/c6_12/C12_EconomicsMarketMechanismEquilibriumSim')
const Sim0647 = lazySim('@/components/simulations/c6_12/C12_EconomicsMoneyMeaningKindsSim')
const Sim0648 = lazySim('@/components/simulations/c6_12/C12_EconomicsPublicRevenueMeaningSim')
const Sim0649 = lazySim('@/components/simulations/c6_12/C12_EconomicsQuantitativeMethodsCreditSim')
const Sim0650 = lazySim('@/components/simulations/c6_12_new/C12_EcoOpenEconomyMacroCBSESim')
const Sim0651 = lazySim('@/components/simulations/c6_12/C12_EVSModernSchoolsEcologicalSim')
const Sim0652 = lazySim('@/components/simulations/c6_12/C12_EVSMonitoringAtmosphereQualitySim')
const Sim0653 = lazySim('@/components/simulations/c6_12/C12_GeographyDroughtsFloodsSim')
const Sim0654 = lazySim('@/components/simulations/c6_12/C12_GeographyIndiaLocationalSettingSim')
const Sim0655 = lazySim('@/components/simulations/c6_12/C12_GeographyIndustriesAgrobasedSim')
const Sim0656 = lazySim('@/components/simulations/c6_12/C12_GeographyWaterResourcesIrrigationSim')
const Sim0657 = lazySim('@/components/simulations/c6_12/C12_GeographyGraphicalRepresentationSim')
const Sim0658 = lazySim('@/components/simulations/c6_12/C12_GeographyHumanSettlementsSim')
const Sim0659 = lazySim('@/components/simulations/c6_12/C12_GeographySelectedIssuesSim')
const Sim0660 = lazySim('@/components/simulations/c6_12/C12_GeographyTertiaryQuaternarySim')
const Sim0661 = lazySim('@/components/simulations/c6_12_new/C12_GeoHumanDevelopmentCBSESim')
const Sim0662 = lazySim('@/components/simulations/c6_12_new/C12_GeoInternationalTradeCBSESim')
const Sim0663 = lazySim('@/components/simulations/c6_12_new/C12_GeoLandResourcesAgricultureCBSESim')
const Sim0664 = lazySim('@/components/simulations/c6_12_new/C12_GeoPlanningSustainableDevCBSESim')
const Sim0665 = lazySim('@/components/simulations/c6_12_new/C12_GeoPopulationDistributionCBSESim')
const Sim0666 = lazySim('@/components/simulations/c6_12_new/C12_GeoTransportCommunicationCBSESim')
const Sim0667 = lazySim('@/components/simulations/c6_12/C12_HistoryAntidowryMovement1970sSim')
const Sim0668 = lazySim('@/components/simulations/c6_12/C12_HistoryAugustOffer1940Sim')
const Sim0669 = lazySim('@/components/simulations/c6_12/C12_HistoryCivilRightsMovementSim')
const Sim0670 = lazySim('@/components/simulations/c6_12/C12_HistoryFirstGeneralElectionSim')
const Sim0671 = lazySim('@/components/simulations/c6_12/C12_HistoryGhana19571966BackgroundSim')
const Sim0672 = lazySim('@/components/simulations/c6_12/C12_HistoryPunjabCrisisAkaliSim')
const Sim0673 = lazySim('@/components/simulations/c6_12/C12_HistoryBhaktiSufiTraditionsSim')
const Sim0674 = lazySim('@/components/simulations/c6_12/C12_HistoryColonialismCountrysideSim')
const Sim0675 = lazySim('@/components/simulations/c6_12/C12_HistoryMeerutMutinySim')
const Sim0676 = lazySim('@/components/simulations/c6_12/C12_HistoryPeasantsZamindarsStateSim')
const Sim0677 = lazySim('@/components/simulations/c6_12/C12_HistoryThinkersBeliefsBuildingsSim')
const Sim0678 = lazySim('@/components/simulations/c6_12/C12_HomeScienceIssuesConcernsAdolescentsSim')
const Sim0679 = lazySim('@/components/simulations/c6_12/C12_HomeSciencePrinciplesMethodsCookingSim')
const Sim0680 = lazySim('@/components/simulations/c6_12/C12_HomeScienceSpecialDietsFeverSim')
const Sim0681 = lazySim('@/components/simulations/c6_12/C12_HomeScienceDevCommJournalismSim')
const Sim0682 = lazySim('@/components/simulations/c6_12/C12_HomeScienceFabricCareDecisionSim')
const Sim0683 = lazySim('@/components/simulations/c6_12/C12_HomeScienceSupportServicesSim')
const Sim0684 = lazySim('@/components/simulations/c6_12/C12_InformaticsPracticesSQLFunctionsSim')
const Sim0685 = lazySim('@/components/simulations/c6_12/C12_LegalStudiesNatureDefinitionTortSim')
const Sim0686 = lazySim('@/components/simulations/c6_12/C12_LegalStudiesStagesElementsCrimeSim')
const Sim0687 = lazySim('@/components/simulations/c6_12/C12_MassMediaCameraAnglesCloseupSim')
const Sim0688 = lazySim('@/components/simulations/c6_12/C12_MassMediaCultureCommunicationWhatSim')
const Sim0689 = lazySim('@/components/simulations/c6_12/C12_MassMediaRoleSocialMediaSim')
const Sim0690 = lazySim('@/components/simulations/c6_12/C12_MathematicsChapter9DifferentialEquationsSim')
const Sim0691 = lazySim('@/components/simulations/c6_12/C12_MathematicsContinuityAndDifferentiabilitySim')
const Sim0692 = lazySim('@/components/simulations/c6_12/C12_MathematicsDeterminantsSim')
const Sim0693 = lazySim('@/components/simulations/c6_12/C12_MathematicsLinearProgrammingSim')
const Sim0694 = lazySim('@/components/simulations/c6_12/C12_AppliedMathsAdjointInverseMatrixSim')
const Sim0695 = lazySim('@/components/simulations/c6_12/C12_AppliedMathsApplicationCalculusSketchingSim')
const Sim0696 = lazySim('@/components/simulations/c6_12/C12_AppliedMathsFinancialMathematicsCalculationSim')
const Sim0697 = lazySim('@/components/simulations/c6_12/C12_AppliedMathsMatricesConceptNotationSim')
const Sim0698 = lazySim('@/components/simulations/c6_12/C12_AppliedMathsRandomVariableProbabilitySim')
const Sim0699 = lazySim('@/components/simulations/c6_12/C12_AppliedMathsRateChangeQuantitiesSim')
const Sim0700 = lazySim('@/components/simulations/c6_12/C12_AppliedMathsTypesRelationsReflexiveSim')
const Sim0701 = lazySim('@/components/simulations/c6_12/C12_MathematicsAreaUnderSimpleSim')
const Sim0702 = lazySim('@/components/simulations/c6_12/C12_MathematicsConsistencyInconsistencySystemsSim')
const Sim0703 = lazySim('@/components/simulations/c6_12/C12_MathematicsDerivativesParametricFunctionsSim')
const Sim0704 = lazySim('@/components/simulations/c6_12/C12_MathematicsGeometryFormsPlaneSim')
const Sim0705 = lazySim('@/components/simulations/c6_12/C12_MathematicsIntegrationTrigonometricPowersSim')
const Sim0706 = lazySim('@/components/simulations/c6_12/C12_MathematicsInverseTrigPropertiesSim')
const Sim0707 = lazySim('@/components/simulations/c6_12/C12_MathematicsMatrixMultiplicationSim')
const Sim0708 = lazySim('@/components/simulations/c6_12/C12_MathematicsTheoremTotalProbabilitySim')
const Sim0709 = lazySim('@/components/simulations/c6_12/C12_MathematicsTypesRelationsReflexiveSim')
const Sim0710 = lazySim('@/components/simulations/c6_12/C12_MathematicsTypesVectorsequalSim')
const Sim0711 = lazySim('@/components/simulations/c6_12/C12_MathematicsWallisFormulaReductionSim')
const Sim0712 = lazySim('@/components/simulations/c6_12/C12_PhysicsAmperesCircuitalSim')
const Sim0713 = lazySim('@/components/simulations/c6_12/C12_PhysicsBrewstersPolarizationReflectionSim')
const Sim0714 = lazySim('@/components/simulations/c6_12/C12_PhysicsDispersionThroughPrismSim')
const Sim0715 = lazySim('@/components/simulations/c6_12/C12_PhysicsElectricChargestypesSim')
const Sim0716 = lazySim('@/components/simulations/c6_12/C12_PhysicsElectricFluxSim')
const Sim0717 = lazySim('@/components/simulations/c6_12/C12_PhysicsElectrostaticSystemChargesSim')
const Sim0718 = lazySim('@/components/simulations/c6_12/C12_PhysicsEnergyBandsSolidsSim')
const Sim0719 = lazySim('@/components/simulations/c6_12/C12_PhysicsEnergyLevelsHydrogenSim')
const Sim0720 = lazySim('@/components/simulations/c6_12/C12_PhysicsGeneratorSim')
const Sim0721 = lazySim('@/components/simulations/c6_12/C12_PhysicsInternalResistanceSim')
const Sim0722 = lazySim('@/components/simulations/c6_12/C12_PhysicsMagneticFieldLinesSim')
const Sim0723 = lazySim('@/components/simulations/c6_12/C12_PhysicsSelfinductionSelfinductanceSim')
const Sim0724 = lazySim('@/components/simulations/c6_12/C12_PhysicsSingleSlitDiffractionSim')
const Sim0725 = lazySim('@/components/simulations/c6_12/C12_PhysicsZenerDiodeSim')
const Sim0726 = lazySim('@/components/simulations/c6_12/C12_PhysicsAlternatingCurrentCBSESim')
const Sim0727 = lazySim('@/components/simulations/c6_12/C12_PhysicsAtomsSim')
const Sim0728 = lazySim('@/components/simulations/c6_12/C12_PhysicsDualNatureRadiationCBSESim')
const Sim0729 = lazySim('@/components/simulations/c6_12/C12_PhysicsElectromagneticWavesCBSESim')
const Sim0730 = lazySim('@/components/simulations/c6_12/C12_PhysicsElectrostaticPotentialCapacitanceCBSESim')
const Sim0731 = lazySim('@/components/simulations/c6_12_new/C12_PhysicsMagnetismandMatterCBSESim')
const Sim0732 = lazySim('@/components/simulations/c6_12/C12_PhysicsNucleiCBSESim')
const Sim0733 = lazySim('@/components/simulations/c6_12/C12_PhysicsRayOpticsAndOpticalInstrumentsSim')
const Sim0734 = lazySim('@/components/simulations/c6_12/C12_PhysicsSemiconductorElectronicsMaterialsDevicesAndSim')
const Sim0735 = lazySim('@/components/simulations/c6_12/C12_PoliticalScienceMeaningFunctionsLegislatureSim')
const Sim0736 = lazySim('@/components/simulations/c6_12/C12_PoliticalScienceSalientFeaturesIndianSim')
const Sim0737 = lazySim('@/components/simulations/c6_12/C12_PoliticalScienceTotalitarianAuthoritarianStatesSim')
const Sim0738 = lazySim('@/components/simulations/c6_12/C12_PsychologyDefinitionIntelligenceFactorSim')
const Sim0739 = lazySim('@/components/simulations/c6_12/C12_PsychologyHumanisticTraitTheoriesSim')
const Sim0740 = lazySim('@/components/simulations/c6_12/C12_PsychologyMeaningStressNatureSim')
const Sim0741 = lazySim('@/components/simulations/c6_12/C12_PsychologyPsychotherapyPsychoanalysisClientcentredSim')
const Sim0742 = lazySim('@/components/simulations/c6_12_new/C12_PsyPsychologicalDisordersCBSESim')
const Sim0743 = lazySim('@/components/simulations/c6_12_new/C12_PsySelfPersonalityCBSESim')
const Sim0744 = lazySim('@/components/simulations/c6_12_new/C12_PsyTherapeuticApproachesCBSESim')
const Sim0745 = lazySim('@/components/simulations/c6_12/C12_SociologyBeliefsRitualsSuperstitionsSim')
const Sim0746 = lazySim('@/components/simulations/c6_12/C12_SociologyDefinitionFeaturesSocialSim')
const Sim0747 = lazySim('@/components/simulations/c6_12/C12_SociologyDefinitionFeaturesTribeSim')
const Sim0748 = lazySim('@/components/simulations/c6_12/C12_SociologySocialChangeDevelopmentSim')
const Sim0749 = lazySim('@/components/simulations/c6_12/C12_SociologyConstitutionSocialChangeSim')
const Sim0750 = lazySim('@/components/simulations/c6_12/C12_SociologyCulturalChangeSim')
const Sim0751 = lazySim('@/components/simulations/c6_12/C12_SociologyGlobalisationSim')
const Sim0752 = lazySim('@/components/simulations/c6_12/C12_SociologyIntroducingIndianSocietySim')
const Sim0753 = lazySim('@/components/simulations/c6_12/C11_BiologyExcretionNitrogenousWastesSim')
const Sim0754 = lazySim('@/components/simulations/c6_12/C11_InformaticsPracticesFileSystemLimitsSim')
const Sim0755 = lazySim('@/components/simulations/c6_12/C12_ChemistryBiomoleculesSim')
const Sim0756 = lazySim('@/components/simulations/c6_12/C12_ComputerScienceSecurityAspectsSim')
const Sim0757 = lazySim('@/components/simulations/c6_12/C6_SocialScienceGrassrootsDemocracyPart3Sim')
const Sim0758 = lazySim('@/components/simulations/c6_12/C7_ScienceElectricityTorchlightSim')
const Sim0759 = lazySim('@/components/simulations/c6_12/C11_PhysicsProjectileMotionSim')
const Sim0760 = lazySim('@/components/simulations/c6_12/C11_PhysicsLawsOfMotionFrictionSim')
const Sim0761 = lazySim('@/components/simulations/c6_12/C11_PhysicsRotationalMotionTorqueSim')
const Sim0762 = lazySim('@/components/simulations/c6_12/C11_PhysicsViscosityTerminalVelocitySim')
const Sim0763 = lazySim('@/components/simulations/c6_12/C11_ChemistrySBlockElementsSim')
const Sim0764 = lazySim('@/components/simulations/c6_12/C11_ChemistryPBlockElementsSim')
const Sim0765 = lazySim('@/components/simulations/c6_12/C11_MathsTrigonometricFunctionsSim')
const Sim0766 = lazySim('@/components/simulations/c6_12/C11_MathsRelationsAndFunctionsSim')
const Sim0767 = lazySim('@/components/simulations/c6_12/C11_InformaticsPracticesDatabaseConceptsSim')
const Sim0768 = lazySim('@/components/simulations/c6_12/C11_HomeScienceUnderstandingFamilyCommunitySocietySim')
const Sim0769 = lazySim('@/components/simulations/c6_12/C12_InformaticsPracticesPandasSeries1Sim')
const Sim0770 = lazySim('@/components/simulations/c6_12/C10_ScienceLightReflectionRefractionSim')
const Sim0771 = lazySim('@/components/simulations/c6_12/C10_MathsPairOfLinearEquationsSim')
const Sim0772 = lazySim('@/components/simulations/c6_12/C10_MathsArithmeticProgressionsSim')
const Sim0773 = lazySim('@/components/simulations/c6_12/C10_MathsAreasRelatedToCirclesSim')
const Sim0774 = lazySim('@/components/simulations/c6_12/C9_MathsProbabilitySim')
const Sim0775 = lazySim('@/components/simulations/c6_12/C8_ScienceChemicalEffectsElectricCurrentSim')
const Sim0776 = lazySim('@/components/simulations/c6_12/C7_ScienceReproductionInPlantsSim')
const Sim0777 = lazySim('@/components/simulations/c6_12/C7_SciencePhysicalChemicalChangesSim')
const Sim0778 = lazySim('@/components/simulations/c6_12/C6_ScienceGettingToKnowPlantsSim')
const Sim0779 = lazySim('@/components/simulations/c6_12/C6_MathsPatternsInMathematicsSim')
// Class 10 depth-coverage chapter sims (node depth audit: previously simless chapters)
const Sim0780 = lazySim('@/components/simulations/c6_12/C10_CivicsPowerSharingBelgiumSriLankaSim')
const Sim0781 = lazySim('@/components/simulations/c6_12/C10_CivicsGenderReligionCasteSim')
const Sim0782 = lazySim('@/components/simulations/c6_12/C10_CivicsPoliticalPartiesSim')
const Sim0783 = lazySim('@/components/simulations/c6_12/C10_GeographyWaterResourcesSim')
const Sim0784 = lazySim('@/components/simulations/c6_12/C10_GeographyLifelinesNationalEconomySim')
const Sim0785 = lazySim('@/components/simulations/c6_12/C10_HistoryMakingOfGlobalWorldSim')

// ─── Game registry entries ────────────────────────────────────
// NOTE: the first six entries are specific sims for nodes that were
// previously only covered by coarse 10-node-range entries further
// below; getGameForNode uses first match, so they must come first.
export const C6_12_GAMES: GameMeta[] = [
  { id: 'c11_biologyexcretionnitrogenouwas', name: 'Biology Excretion Nitrogenous Wastes', emoji: '🧬', color: '#22C55E', nodeIds: ['c11_bio_052', 'c11_bio_055'], subject: 'biology', classLevel: 11, component: Sim0753 },
  { id: 'c11_informaticspracticesfilesystem', name: 'Informatics Practices File System Limits', emoji: '📚', color: '#64748B', nodeIds: ['c11_cs_039', 'c11_cs_040'], subject: 'informatics_practices', classLevel: 11, component: Sim0754 },
  { id: 'c12_chemistrybiomolecules', name: 'Chemistry Biomolecules', emoji: '🧪', color: '#10B981', nodeIds: ['c12_chem_082'], subject: 'chemistry', classLevel: 12, component: Sim0755 },
  { id: 'c12_computersciencesecurityaspects', name: 'Computer Science Security Aspects', emoji: '💻', color: '#6366F1', nodeIds: ['c12_cs_042'], subject: 'computer_science', classLevel: 12, component: Sim0756 },
  { id: 'c6_socialsciencegrassrootsdemo3', name: 'Social Science Grassroots Democracy Part 3', emoji: '📚', color: '#64748B', nodeIds: ['c6_histciv_061', 'c6_histciv_062', 'c6_histciv_063', 'c6_histciv_065'], subject: 'social_science', classLevel: 6, component: Sim0757 },
  { id: 'c7_scienceelectricitytorchlight', name: 'Science Electricity Torchlight', emoji: '📚', color: '#64748B', nodeIds: ['c7_phy_028', 'c7_phy_029'], subject: 'science', classLevel: 7, component: Sim0758 },
  { id: 'c5_leversimulation', name: 'Lever Simulation', emoji: '📚', color: '#64748B', nodeIds: ['c5_sci_xmat_001'], subject: 'science', classLevel: 5, component: Sim0000 },
  { id: 'c5_pulleysimulation', name: 'Pulley Simulation', emoji: '📚', color: '#64748B', nodeIds: ['c5_sci_xmat_002'], subject: 'science', classLevel: 5, component: Sim0001 },
  { id: 'c6_biologyleafstructuretypes', name: 'Biology Leaf Structure Types', emoji: '🧬', color: '#22C55E', nodeIds: ['c6_bio_001', 'c6_bio_002', 'c6_bio_003', 'c6_bio_004', 'c6_bio_005', 'c6_bio_006', 'c6_bio_007', 'c6_bio_008', 'c6_bio_009', 'c6_bio_010'], subject: 'biology', classLevel: 6, component: Sim0002 },
  { id: 'c6_biologymodesdiseasetransmissio', name: 'Biology Modes Disease Transmission', emoji: '🧬', color: '#22C55E', nodeIds: ['c6_bio_021', 'c6_bio_022', 'c6_bio_023', 'c6_bio_024', 'c6_bio_025', 'c6_bio_026', 'c6_bio_027'], subject: 'biology', classLevel: 6, component: Sim0003 },
  { id: 'c6_biologyplantanimalcell', name: 'Biology Plant Animal Cell', emoji: '🧬', color: '#22C55E', nodeIds: ['c6_bio_011', 'c6_bio_012', 'c6_bio_013', 'c6_bio_014', 'c6_bio_015', 'c6_bio_016', 'c6_bio_017', 'c6_bio_018', 'c6_bio_019', 'c6_bio_020'], subject: 'biology', classLevel: 6, component: Sim0004 },
  { id: 'c6_chemistryatomicstructuresubato', name: 'Chemistry Atomicstructuresubatomicparticles', emoji: '📚', color: '#64748B', nodeIds: ['c6_chem_extra_001'], subject: 'chemistryatomicstructuresubatomicparticle', classLevel: 6, component: Sim0005 },
  { id: 'c6_chemistrycarbondioxideandnitro', name: 'Chemistry Carbondioxideandnitrogeninair', emoji: '📚', color: '#64748B', nodeIds: ['c6_chem_extra_001'], subject: 'chemistrycarbondioxideandnitrogeninai', classLevel: 6, component: Sim0006 },
  { id: 'c6_chemistrymatteranditscompositi', name: 'Chemistry Matteranditscomposition', emoji: '📚', color: '#64748B', nodeIds: ['c6_chem_extra_001'], subject: 'chemistrymatteranditscompositio', classLevel: 6, component: Sim0007 },
  { id: 'c6_computersciencealgorithmsdefin', name: 'Computer Science Algorithms Definition Properties', emoji: '💻', color: '#6366F1', nodeIds: ['c6_cs_021', 'c6_cs_022', 'c6_cs_023', 'c6_cs_024', 'c6_cs_025', 'c6_cs_026'], subject: 'computer_science', classLevel: 6, component: Sim0008 },
  { id: 'c6_computersciencecategoriescompu', name: 'Computer Science Categories Computers Micro', emoji: '💻', color: '#6366F1', nodeIds: ['c6_cs_001', 'c6_cs_002', 'c6_cs_003', 'c6_cs_004', 'c6_cs_005', 'c6_cs_006', 'c6_cs_007', 'c6_cs_008', 'c6_cs_009', 'c6_cs_010'], subject: 'computer_science', classLevel: 6, component: Sim0009 },
  { id: 'c6_computersciencepowerpointimpor', name: 'Computer Science Powerpoint Importing Data', emoji: '💻', color: '#6366F1', nodeIds: ['c6_cs_011', 'c6_cs_012', 'c6_cs_013', 'c6_cs_014', 'c6_cs_015', 'c6_cs_016', 'c6_cs_017', 'c6_cs_018', 'c6_cs_019', 'c6_cs_020'], subject: 'computer_science', classLevel: 6, component: Sim0010 },
  { id: 'c6_evsenvironmentbioticabiotic', name: 'EVSEnvironment Biotic Abiotic', emoji: '🌱', color: '#84CC16', nodeIds: ['c6_evs_001', 'c6_evs_002', 'c6_evs_003', 'c6_evs_004', 'c6_evs_005', 'c6_evs_006', 'c6_evs_007', 'c6_evs_008', 'c6_evs_009', 'c6_evs_010'], subject: 'evs', classLevel: 6, component: Sim0011 },
  { id: 'c6_evshumanimpactenvironment', name: 'EVSHuman Impact Environment', emoji: '🌱', color: '#84CC16', nodeIds: ['c6_evs_011', 'c6_evs_012', 'c6_evs_013', 'c6_evs_014'], subject: 'evs', classLevel: 6, component: Sim0012 },
  { id: 'c6_geographymapsintroduction', name: 'Geography Maps Introduction', emoji: '🌍', color: '#FBBF24', nodeIds: ['c6_geo_001', 'c6_geo_002', 'c6_geo_003', 'c6_geo_004', 'c6_geo_005', 'c6_geo_006', 'c6_geo_007', 'c6_geo_008', 'c6_geo_009', 'c6_geo_010'], subject: 'geography', classLevel: 6, component: Sim0013 },
  { id: 'c6_geographywaterbodiesoceans', name: 'Geography Water Bodies Oceans', emoji: '🌍', color: '#FBBF24', nodeIds: ['c6_geo_011', 'c6_geo_012', 'c6_geo_013', 'c6_geo_014', 'c6_geo_015', 'c6_geo_016', 'c6_geo_017', 'c6_geo_018'], subject: 'geography', classLevel: 6, component: Sim0014 },
  { id: 'c6_historycivicsashokasconversion', name: 'History Civics Ashokas Conversion Buddhism', emoji: '📜', color: '#A78BFA', nodeIds: ['c6_histciv_041', 'c6_histciv_042', 'c6_histciv_043', 'c6_histciv_044', 'c6_histciv_045', 'c6_histciv_046', 'c6_histciv_047', 'c6_histciv_048', 'c6_histciv_049', 'c6_histciv_050'], subject: 'history_civics', classLevel: 6, component: Sim0015 },
  { id: 'c6_historycivicscompositionmunici', name: 'History Civics Composition Municipal Corporation', emoji: '📜', color: '#A78BFA', nodeIds: ['c6_histciv_061', 'c6_histciv_062', 'c6_histciv_063', 'c6_histciv_064', 'c6_histciv_065'], subject: 'history_civics', classLevel: 6, component: Sim0016 },
  { id: 'c6_historycivicsearlyvedicpolitic', name: 'History Civics Early Vedic Political', emoji: '📜', color: '#A78BFA', nodeIds: ['c6_histciv_021', 'c6_histciv_022', 'c6_histciv_023', 'c6_histciv_024', 'c6_histciv_025', 'c6_histciv_026', 'c6_histciv_027', 'c6_histciv_028', 'c6_histciv_029', 'c6_histciv_030'], subject: 'history_civics', classLevel: 6, component: Sim0017 },
  { id: 'c6_historycivicshistorymeaningdef', name: 'History Civics History Meaning Definition', emoji: '📜', color: '#A78BFA', nodeIds: ['c6_histciv_001', 'c6_histciv_002', 'c6_histciv_003', 'c6_histciv_004', 'c6_histciv_005', 'c6_histciv_006', 'c6_histciv_007', 'c6_histciv_008', 'c6_histciv_009', 'c6_histciv_010'], subject: 'history_civics', classLevel: 6, component: Sim0018 },
  { id: 'c6_historycivicsindusvalleysociet', name: 'History Civics Indus Valley Society', emoji: '📜', color: '#A78BFA', nodeIds: ['c6_histciv_011', 'c6_histciv_012', 'c6_histciv_013', 'c6_histciv_014', 'c6_histciv_015', 'c6_histciv_016', 'c6_histciv_017', 'c6_histciv_018', 'c6_histciv_019', 'c6_histciv_020'], subject: 'history_civics', classLevel: 6, component: Sim0019 },
  { id: 'c6_historycivicsscientificprogres', name: 'History Civics Scientific Progress Gupta', emoji: '📜', color: '#A78BFA', nodeIds: ['c6_histciv_051', 'c6_histciv_052', 'c6_histciv_053', 'c6_histciv_054', 'c6_histciv_055', 'c6_histciv_056', 'c6_histciv_057', 'c6_histciv_058', 'c6_histciv_059', 'c6_histciv_060'], subject: 'history_civics', classLevel: 6, component: Sim0020 },
  { id: 'c6_historycivicsspreaddeclinejain', name: 'History Civics Spread Decline Jainism', emoji: '📜', color: '#A78BFA', nodeIds: ['c6_histciv_031', 'c6_histciv_032', 'c6_histciv_033', 'c6_histciv_034', 'c6_histciv_035', 'c6_histciv_036', 'c6_histciv_037', 'c6_histciv_038', 'c6_histciv_039', 'c6_histciv_040'], subject: 'history_civics', classLevel: 6, component: Sim0021 },
  { id: 'c6_mathematicsperimeterandarea', name: 'Mathematics Perimeter And Area', emoji: '📚', color: '#64748B', nodeIds: ['c6_math_extra_001'], subject: 'mathematicsperimeterandare', classLevel: 6, component: Sim0022 },
  { id: 'c6_mathematicsprimetime', name: 'Mathematics Prime Time', emoji: '📚', color: '#64748B', nodeIds: ['c6_math_extra_001'], subject: 'mathematicsprimetim', classLevel: 6, component: Sim0023 },
  { id: 'c6_mathematicsprimetimetheidlivad', name: 'Mathematics Prime Time The Idli Vada', emoji: '📚', color: '#64748B', nodeIds: ['c6_math_extra_001'], subject: 'mathematicsprimetimetheidlivad', classLevel: 6, component: Sim0024 },
  { id: 'c6_mathematicssymmetry', name: 'Mathematics Symmetry', emoji: '📚', color: '#64748B', nodeIds: ['c6_math_extra_001'], subject: 'mathematicssymmetr', classLevel: 6, component: Sim0025 },
  { id: 'c6_mathematicstheothersideofzero', name: 'Mathematics The Other Side Of Zero', emoji: '📚', color: '#64748B', nodeIds: ['c6_math_extra_001'], subject: 'mathematicstheothersideofzer', classLevel: 6, component: Sim0026 },
  { id: 'c6_mathematicscardinality', name: 'Mathematics Cardinality', emoji: '📐', color: '#3B82F6', nodeIds: ['c6_math_021', 'c6_math_022', 'c6_math_023', 'c6_math_024', 'c6_math_025', 'c6_math_026', 'c6_math_027', 'c6_math_028', 'c6_math_029', 'c6_math_030'], subject: 'maths', classLevel: 6, component: Sim0027 },
  { id: 'c6_mathematicscollectionorganisat', name: 'Mathematics Collection Organisation Data', emoji: '📐', color: '#3B82F6', nodeIds: ['c6_math_081', 'c6_math_082', 'c6_math_083', 'c6_math_084'], subject: 'maths', classLevel: 6, component: Sim0028 },
  { id: 'c6_mathematicsconsolidatingsensen', name: 'Mathematics Consolidating Sense Numberness', emoji: '📐', color: '#3B82F6', nodeIds: ['c6_math_001', 'c6_math_002', 'c6_math_003', 'c6_math_004', 'c6_math_005', 'c6_math_006', 'c6_math_007', 'c6_math_008', 'c6_math_009', 'c6_math_010'], subject: 'maths', classLevel: 6, component: Sim0029 },
  { id: 'c6_mathematicsconstructionsdrawin', name: 'Mathematics Constructions Drawing Line', emoji: '📐', color: '#3B82F6', nodeIds: ['c6_math_071', 'c6_math_072', 'c6_math_073', 'c6_math_074', 'c6_math_075', 'c6_math_076', 'c6_math_077', 'c6_math_078', 'c6_math_079', 'c6_math_080'], subject: 'maths', classLevel: 6, component: Sim0030 },
  { id: 'c6_mathematicsideapercentfraction', name: 'Mathematics Idea Percent Fraction', emoji: '📐', color: '#3B82F6', nodeIds: ['c6_math_041', 'c6_math_042', 'c6_math_043', 'c6_math_044', 'c6_math_045', 'c6_math_046', 'c6_math_047', 'c6_math_048', 'c6_math_049', 'c6_math_050'], subject: 'maths', classLevel: 6, component: Sim0031 },
  { id: 'c6_mathematicslinelinesegment', name: 'Mathematics Line Line Segment', emoji: '📐', color: '#3B82F6', nodeIds: ['c6_math_051', 'c6_math_052', 'c6_math_053', 'c6_math_054', 'c6_math_055', 'c6_math_056', 'c6_math_057', 'c6_math_058', 'c6_math_059', 'c6_math_060'], subject: 'maths', classLevel: 6, component: Sim0032 },
  { id: 'c6_mathematicsnumberlineseeing', name: 'Mathematics Number Line Seeing', emoji: '📐', color: '#3B82F6', nodeIds: ['c6_math_011', 'c6_math_012', 'c6_math_013', 'c6_math_014', 'c6_math_015', 'c6_math_016', 'c6_math_017', 'c6_math_018', 'c6_math_019', 'c6_math_020'], subject: 'maths', classLevel: 6, component: Sim0033 },
  { id: 'c6_mathematicspairlinesintersecti', name: 'Mathematics Pair Lines Intersecting', emoji: '📐', color: '#3B82F6', nodeIds: ['c6_math_061', 'c6_math_062', 'c6_math_063', 'c6_math_064', 'c6_math_065', 'c6_math_066', 'c6_math_067', 'c6_math_068', 'c6_math_069', 'c6_math_070'], subject: 'maths', classLevel: 6, component: Sim0034 },
  { id: 'c6_mathematicssimplificationbrack', name: 'Mathematics Simplification Brackets', emoji: '📐', color: '#3B82F6', nodeIds: ['c6_math_031', 'c6_math_032', 'c6_math_033', 'c6_math_034', 'c6_math_035', 'c6_math_036', 'c6_math_037', 'c6_math_038', 'c6_math_039', 'c6_math_040'], subject: 'maths', classLevel: 6, component: Sim0035 },
  { id: 'c6_physicsphysicalquantitiesunits', name: 'Physics Physical Quantities Units', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c6_phy_001', 'c6_phy_002', 'c6_phy_003', 'c6_phy_004', 'c6_phy_005', 'c6_phy_006', 'c6_phy_007', 'c6_phy_008', 'c6_phy_009', 'c6_phy_010'], subject: 'physics', classLevel: 6, component: Sim0036 },
  { id: 'c6_physicspitchsoundfrequency', name: 'Physics Pitch Sound Frequency', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c6_phy_031', 'c6_phy_032', 'c6_phy_033', 'c6_phy_034', 'c6_phy_035', 'c6_phy_036'], subject: 'physics', classLevel: 6, component: Sim0037 },
  { id: 'c6_physicsrectilinearpropagationl', name: 'Physics Rectilinear Propagation Light', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c6_phy_021', 'c6_phy_022', 'c6_phy_023', 'c6_phy_024', 'c6_phy_025', 'c6_phy_026', 'c6_phy_027', 'c6_phy_028', 'c6_phy_029', 'c6_phy_030'], subject: 'physics', classLevel: 6, component: Sim0038 },
  { id: 'c6_physicsuniformnonuniformmotion', name: 'Physics Uniform Nonuniform Motion', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c6_phy_011', 'c6_phy_012', 'c6_phy_013', 'c6_phy_014', 'c6_phy_015', 'c6_phy_016', 'c6_phy_017', 'c6_phy_018', 'c6_phy_019', 'c6_phy_020'], subject: 'physics', classLevel: 6, component: Sim0039 },
  { id: 'c6_physicselectricitycircuitscbse', name: 'Physics Electricity Circuits CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c6_phys_extra_001'], subject: 'physicselectricitycircuitscbs', classLevel: 6, component: Sim0040 },
  { id: 'c6_scienceajourneythroughstatesof', name: 'Science AJourney Through States Of', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'scienceajourneythroughstateso', classLevel: 6, component: Sim0041 },
  { id: 'c6_sciencebeyondearth', name: 'Science Beyond Earth', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'sciencebeyondeart', classLevel: 6, component: Sim0042 },
  { id: 'c6_sciencebodymovements', name: 'Science Body Movements', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'sciencebodymovement', classLevel: 6, component: Sim0043 },
  { id: 'c6_sciencechangesaroundus', name: 'Science Changes Around Us', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'sciencechangesaroundu', classLevel: 6, component: Sim0044 },
  { id: 'c6_sciencecomponentsoffood', name: 'Science Components Of Food', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'sciencecomponentsoffoo', classLevel: 6, component: Sim0045 },
  { id: 'c6_sciencediversityinthelivingwor', name: 'Science Diversity In The Living World', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'sciencediversityinthelivingworl', classLevel: 6, component: Sim0046 },
  { id: 'c6_scienceexploringmagnets', name: 'Science Exploring Magnets', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'scienceexploringmagnet', classLevel: 6, component: Sim0047 },
  { id: 'c6_sciencefibretofabric', name: 'Science Fibre To Fabric', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'sciencefibretofabri', classLevel: 6, component: Sim0048 },
  { id: 'c6_sciencefoodwheredoesitcome', name: 'Science Food Where Does It Come', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'sciencefoodwheredoesitcom', classLevel: 6, component: Sim0049 },
  { id: 'c6_sciencegarbageingarbageout', name: 'Science Garbage In Garbage Out', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'sciencegarbageingarbageou', classLevel: 6, component: Sim0050 },
  { id: 'c6_sciencelivingcreaturesexplorin', name: 'Science Living Creatures Exploring Their Character', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'sciencelivingcreaturesexploringtheircharacteristic', classLevel: 6, component: Sim0051 },
  { id: 'c6_sciencematerialsaroundus', name: 'Science Materials Around Us', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'sciencematerialsaroundu', classLevel: 6, component: Sim0052 },
  { id: 'c6_sciencemethodsofseparationinev', name: 'Science Methods Of Separation In Everyday', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'sciencemethodsofseparationineveryda', classLevel: 6, component: Sim0053 },
  { id: 'c6_sciencemindfuleatingapathto', name: 'Science Mindful Eating APath To', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'sciencemindfuleatingapatht', classLevel: 6, component: Sim0054 },
  { id: 'c6_sciencenaturestreasures', name: 'Science Nature STreasures', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'sciencenaturestreasure', classLevel: 6, component: Sim0055 },
  { id: 'c6_scienceseparationofsubstances', name: 'Science Separation Of Substances', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'scienceseparationofsubstance', classLevel: 6, component: Sim0056 },
  { id: 'c6_sciencesortingmaterialsintogro', name: 'Science Sorting Materials Into Groups', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'sciencesortingmaterialsintogroup', classLevel: 6, component: Sim0057 },
  { id: 'c6_sciencetemperatureanditsmeasur', name: 'Science Temperature And Its Measurement', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'sciencetemperatureanditsmeasuremen', classLevel: 6, component: Sim0058 },
  { id: 'c6_sciencethelivingorganismschara', name: 'Science The Living Organisms Characteristics And', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'sciencethelivingorganismscharacteristicsan', classLevel: 6, component: Sim0059 },
  { id: 'c6_sciencethewonderfulworldofscie', name: 'Science The Wonderful World Of Science', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'sciencethewonderfulworldofscienc', classLevel: 6, component: Sim0060 },
  { id: 'c6_socialsciencegrassrootsdemocra', name: 'Social Science Grassroots Democracy', emoji: '📚', color: '#64748B', nodeIds: ['c6_soci_extra_001'], subject: 'socialsciencegrassrootsdemocrac', classLevel: 6, component: Sim0061 },
  { id: 'c6_socialscienceruraladministrati', name: 'Social Science Rural Administration', emoji: '📚', color: '#64748B', nodeIds: ['c6_soci_extra_001'], subject: 'socialscienceruraladministratio', classLevel: 6, component: Sim0062 },
  { id: 'c6_socialsciencerurallivelihoods', name: 'Social Science Rural Livelihoods', emoji: '📚', color: '#64748B', nodeIds: ['c6_soci_extra_001'], subject: 'socialsciencerurallivelihood', classLevel: 6, component: Sim0063 },
  { id: 'c7_biologykingdomfungi', name: 'Biology Kingdom Fungi', emoji: '🧬', color: '#22C55E', nodeIds: ['c7_bio_011', 'c7_bio_012', 'c7_bio_013', 'c7_bio_014', 'c7_bio_015', 'c7_bio_016', 'c7_bio_017', 'c7_bio_018', 'c7_bio_019', 'c7_bio_020'], subject: 'biology', classLevel: 7, component: Sim0064 },
  { id: 'c7_biologypollutioneffectsenviron', name: 'Biology Pollution Effects Environment', emoji: '🧬', color: '#22C55E', nodeIds: ['c7_bio_021', 'c7_bio_022', 'c7_bio_023', 'c7_bio_024', 'c7_bio_025', 'c7_bio_026'], subject: 'biology', classLevel: 7, component: Sim0065 },
  { id: 'c7_biologytissueconceptplant', name: 'Biology Tissue Concept Plant', emoji: '🧬', color: '#22C55E', nodeIds: ['c7_bio_001', 'c7_bio_002', 'c7_bio_003', 'c7_bio_004', 'c7_bio_005', 'c7_bio_006', 'c7_bio_007', 'c7_bio_008', 'c7_bio_009', 'c7_bio_010'], subject: 'biology', classLevel: 7, component: Sim0066 },
  { id: 'c7_chemistryatomicstructureelectr', name: 'Chemistry Atomicstructureelectronsprotonsneutrons', emoji: '📚', color: '#64748B', nodeIds: ['c7_chem_extra_001'], subject: 'chemistryatomicstructureelectronsprotonsneutron', classLevel: 7, component: Sim0067 },
  { id: 'c7_chemistrymatterclassificationr', name: 'Chemistry Matterclassificationrevisited', emoji: '📚', color: '#64748B', nodeIds: ['c7_chem_extra_001'], subject: 'chemistrymatterclassificationrevisite', classLevel: 7, component: Sim0068 },
  { id: 'c7_chemistrywaterauniversalsolven', name: 'Chemistry Waterauniversalsolvent', emoji: '📚', color: '#64748B', nodeIds: ['c7_chem_extra_001'], subject: 'chemistrywaterauniversalsolven', classLevel: 7, component: Sim0069 },
  { id: 'c7_computersciencecomputerethicsu', name: 'Computer Science Computer Ethics Unethical', emoji: '💻', color: '#6366F1', nodeIds: ['c7_cs_011', 'c7_cs_012', 'c7_cs_013', 'c7_cs_014', 'c7_cs_015', 'c7_cs_016', 'c7_cs_017', 'c7_cs_018', 'c7_cs_019', 'c7_cs_020'], subject: 'computer_science', classLevel: 7, component: Sim0070 },
  { id: 'c7_computersciencehtmltablestable', name: 'Computer Science Html Tables Table', emoji: '💻', color: '#6366F1', nodeIds: ['c7_cs_021', 'c7_cs_022', 'c7_cs_023', 'c7_cs_024', 'c7_cs_025'], subject: 'computer_science', classLevel: 7, component: Sim0071 },
  { id: 'c7_computerscienceinternalhardwar', name: 'Computer Science Internal Hardware Motherboard', emoji: '💻', color: '#6366F1', nodeIds: ['c7_cs_001', 'c7_cs_002', 'c7_cs_003', 'c7_cs_004', 'c7_cs_005', 'c7_cs_006', 'c7_cs_007', 'c7_cs_008', 'c7_cs_009', 'c7_cs_010'], subject: 'computer_science', classLevel: 7, component: Sim0072 },
  { id: 'c7_geographysoilformation', name: 'Geography Soil Formation', emoji: '🌍', color: '#FBBF24', nodeIds: ['c7_geo_011', 'c7_geo_012', 'c7_geo_013', 'c7_geo_014', 'c7_geo_015', 'c7_geo_016', 'c7_geo_017', 'c7_geo_018', 'c7_geo_019'], subject: 'geography', classLevel: 7, component: Sim0073 },
  { id: 'c7_geographytopographicalmapsintr', name: 'Geography Topographical Maps Introduction', emoji: '🌍', color: '#FBBF24', nodeIds: ['c7_geo_001', 'c7_geo_002', 'c7_geo_003', 'c7_geo_004', 'c7_geo_005', 'c7_geo_006', 'c7_geo_007', 'c7_geo_008', 'c7_geo_009', 'c7_geo_010'], subject: 'geography', classLevel: 7, component: Sim0074 },
  { id: 'c7_historycivicsalwarsnayanarsvai', name: 'History Civics Alwars Nayanars Vaishnava', emoji: '📜', color: '#A78BFA', nodeIds: ['c7_histciv_041', 'c7_histciv_042', 'c7_histciv_043', 'c7_histciv_044', 'c7_histciv_045', 'c7_histciv_046', 'c7_histciv_047', 'c7_histciv_048', 'c7_histciv_049', 'c7_histciv_050'], subject: 'history_civics', classLevel: 7, component: Sim0075 },
  { id: 'c7_historycivicsbaburhumayunfound', name: 'History Civics Babur Humayun Founding', emoji: '📜', color: '#A78BFA', nodeIds: ['c7_histciv_031', 'c7_histciv_032', 'c7_histciv_033', 'c7_histciv_034', 'c7_histciv_035', 'c7_histciv_036', 'c7_histciv_037', 'c7_histciv_038', 'c7_histciv_039', 'c7_histciv_040'], subject: 'history_civics', classLevel: 7, component: Sim0076 },
  { id: 'c7_historycivicscomparativestudyk', name: 'History Civics Comparative Study Khaljis', emoji: '📜', color: '#A78BFA', nodeIds: ['c7_histciv_021', 'c7_histciv_022', 'c7_histciv_023', 'c7_histciv_024', 'c7_histciv_025', 'c7_histciv_026', 'c7_histciv_027', 'c7_histciv_028', 'c7_histciv_029', 'c7_histciv_030'], subject: 'history_civics', classLevel: 7, component: Sim0077 },
  { id: 'c7_historycivicsfivepillarsislam', name: 'History Civics Five Pillars Islam', emoji: '📜', color: '#A78BFA', nodeIds: ['c7_histciv_011', 'c7_histciv_012', 'c7_histciv_013', 'c7_histciv_014', 'c7_histciv_015', 'c7_histciv_016', 'c7_histciv_017', 'c7_histciv_018', 'c7_histciv_019', 'c7_histciv_020'], subject: 'history_civics', classLevel: 7, component: Sim0078 },
  { id: 'c7_historycivicsmeaningmedievalbe', name: 'History Civics Meaningmedieval Beginning', emoji: '📜', color: '#A78BFA', nodeIds: ['c7_histciv_001', 'c7_histciv_002', 'c7_histciv_003', 'c7_histciv_004', 'c7_histciv_005', 'c7_histciv_006', 'c7_histciv_007', 'c7_histciv_008', 'c7_histciv_009', 'c7_histciv_010'], subject: 'history_civics', classLevel: 7, component: Sim0079 },
  { id: 'c7_historycivicsobjectivesjustice', name: 'History Civics Objectives Justice Liberty', emoji: '📜', color: '#A78BFA', nodeIds: ['c7_histciv_051', 'c7_histciv_052', 'c7_histciv_053', 'c7_histciv_054', 'c7_histciv_055', 'c7_histciv_056', 'c7_histciv_057', 'c7_histciv_058'], subject: 'history_civics', classLevel: 7, component: Sim0080 },
  { id: 'c7_mathematicsalgebraicexpression', name: 'Mathematics Algebraic Expressions', emoji: '📚', color: '#64748B', nodeIds: ['c7_math_extra_001'], subject: 'mathematicsalgebraicexpression', classLevel: 7, component: Sim0081 },
  { id: 'c7_mathematicsanotherpeekbeyondth', name: 'Mathematics Another Peek Beyond The Point', emoji: '📚', color: '#64748B', nodeIds: ['c7_math_extra_001'], subject: 'mathematicsanotherpeekbeyondthepoin', classLevel: 7, component: Sim0082 },
  { id: 'c7_mathematicsapeekbeyondthepoint', name: 'Mathematics APeek Beyond The Point', emoji: '📚', color: '#64748B', nodeIds: ['c7_math_extra_001'], subject: 'mathematicsapeekbeyondthepoin', classLevel: 7, component: Sim0083 },
  { id: 'c7_mathematicsarithmeticexpressio', name: 'Mathematics Arithmetic Expressions', emoji: '📚', color: '#64748B', nodeIds: ['c7_math_extra_001'], subject: 'mathematicsarithmeticexpression', classLevel: 7, component: Sim0084 },
  { id: 'c7_mathematicsataleofthreeinterse', name: 'Mathematics ATale Of Three Intersecting', emoji: '📚', color: '#64748B', nodeIds: ['c7_math_extra_001'], subject: 'mathematicsataleofthreeintersectin', classLevel: 7, component: Sim0085 },
  { id: 'c7_mathematicscomparingquantities', name: 'Mathematics Comparing Quantities', emoji: '📚', color: '#64748B', nodeIds: ['c7_math_extra_001'], subject: 'mathematicscomparingquantitie', classLevel: 7, component: Sim0086 },
  { id: 'c7_mathematicsconnectingthedots', name: 'Mathematics Connecting The Dots', emoji: '📚', color: '#64748B', nodeIds: ['c7_math_extra_001'], subject: 'mathematicsconnectingthedot', classLevel: 7, component: Sim0087 },
  { id: 'c7_mathematicsconstructionsandtil', name: 'Mathematics Constructions And Tilings', emoji: '📚', color: '#64748B', nodeIds: ['c7_math_extra_001'], subject: 'mathematicsconstructionsandtiling', classLevel: 7, component: Sim0088 },
  { id: 'c7_mathematicsdatahandling', name: 'Mathematics Data Handling', emoji: '📚', color: '#64748B', nodeIds: ['c7_math_extra_001'], subject: 'mathematicsdatahandlin', classLevel: 7, component: Sim0089 },
  { id: 'c7_mathematicsexponentsandpowers', name: 'Mathematics Exponents And Powers', emoji: '📚', color: '#64748B', nodeIds: ['c7_math_extra_001'], subject: 'mathematicsexponentsandpower', classLevel: 7, component: Sim0090 },
  { id: 'c7_mathematicsexpressionsusinglet', name: 'Mathematics Expressions Using Letter Numbers', emoji: '📚', color: '#64748B', nodeIds: ['c7_math_extra_001'], subject: 'mathematicsexpressionsusingletternumber', classLevel: 7, component: Sim0091 },
  { id: 'c7_mathematicsfindingcommonground', name: 'Mathematics Finding Common Ground', emoji: '📚', color: '#64748B', nodeIds: ['c7_math_extra_001'], subject: 'mathematicsfindingcommongroun', classLevel: 7, component: Sim0092 },
  { id: 'c7_mathematicsfindingtheunknown', name: 'Mathematics Finding The Unknown', emoji: '📚', color: '#64748B', nodeIds: ['c7_math_extra_001'], subject: 'mathematicsfindingtheunknow', classLevel: 7, component: Sim0093 },
  { id: 'c7_mathematicslargenumbersaroundu', name: 'Mathematics Large Numbers Around Us', emoji: '📚', color: '#64748B', nodeIds: ['c7_math_extra_001'], subject: 'mathematicslargenumbersaroundu', classLevel: 7, component: Sim0094 },
  { id: 'c7_mathematicsnumberplay', name: 'Mathematics Number Play', emoji: '📚', color: '#64748B', nodeIds: ['c7_math_extra_001'], subject: 'mathematicsnumberpla', classLevel: 7, component: Sim0095 },
  { id: 'c7_mathematicsperimeterandarea', name: 'Mathematics Perimeter And Area', emoji: '📚', color: '#64748B', nodeIds: ['c7_math_extra_001'], subject: 'mathematicsperimeterandare', classLevel: 7, component: Sim0096 },
  { id: 'c7_mathematicsrationalnumbers', name: 'Mathematics Rational Numbers', emoji: '📚', color: '#64748B', nodeIds: ['c7_math_extra_001'], subject: 'mathematicsrationalnumber', classLevel: 7, component: Sim0097 },
  { id: 'c7_mathematicsextendcongruencesim', name: 'Mathematics Extend Congruence Simple', emoji: '📐', color: '#3B82F6', nodeIds: ['c7_math_041', 'c7_math_042', 'c7_math_043', 'c7_math_044', 'c7_math_045', 'c7_math_046', 'c7_math_047', 'c7_math_048', 'c7_math_049', 'c7_math_050'], subject: 'maths', classLevel: 7, component: Sim0098 },
  { id: 'c7_mathematicsmultiplicationdivis', name: 'Mathematics Multiplication Division Decimal', emoji: '📐', color: '#3B82F6', nodeIds: ['c7_math_011', 'c7_math_012', 'c7_math_013', 'c7_math_014', 'c7_math_015', 'c7_math_016', 'c7_math_017', 'c7_math_018', 'c7_math_019', 'c7_math_020'], subject: 'maths', classLevel: 7, component: Sim0099 },
  { id: 'c7_mathematicsmultiplicationdivis', name: 'Mathematics Multiplication Division Integers', emoji: '📐', color: '#3B82F6', nodeIds: ['c7_math_001', 'c7_math_002', 'c7_math_003', 'c7_math_004', 'c7_math_005', 'c7_math_006', 'c7_math_007', 'c7_math_008', 'c7_math_009', 'c7_math_010'], subject: 'maths', classLevel: 7, component: Sim0100 },
  { id: 'c7_mathematicsunderstandingpercen', name: 'Mathematics Understanding Percentage Fraction', emoji: '📐', color: '#3B82F6', nodeIds: ['c7_math_021', 'c7_math_022', 'c7_math_023', 'c7_math_024', 'c7_math_025', 'c7_math_026', 'c7_math_027', 'c7_math_028', 'c7_math_029', 'c7_math_030'], subject: 'maths', classLevel: 7, component: Sim0101 },
  { id: 'c7_mathematicsunderstandingshapes', name: 'Mathematics Understanding Shapes Pairs', emoji: '📐', color: '#3B82F6', nodeIds: ['c7_math_031', 'c7_math_032', 'c7_math_033', 'c7_math_034', 'c7_math_035', 'c7_math_036', 'c7_math_037', 'c7_math_038', 'c7_math_039', 'c7_math_040'], subject: 'maths', classLevel: 7, component: Sim0102 },
  { id: 'c7_mathsvisualisingsolidshapes', name: 'Maths Visualising Solid Shapes', emoji: '📚', color: '#64748B', nodeIds: ['c7_math_extra_001'], subject: 'mathsvisualisingsolidshape', classLevel: 7, component: Sim0103 },
  { id: 'c7_physicsheattransferconduction', name: 'Physics Heat Transfer Conduction', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c7_phy_021', 'c7_phy_022', 'c7_phy_023', 'c7_phy_024', 'c7_phy_025', 'c7_phy_026', 'c7_phy_027', 'c7_phy_028', 'c7_phy_029', 'c7_phy_030'], subject: 'physics', classLevel: 7, component: Sim0104 },
  { id: 'c7_physicsohms', name: 'Physics Ohms', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c7_phy_031', 'c7_phy_032', 'c7_phy_033', 'c7_phy_034', 'c7_phy_035'], subject: 'physics', classLevel: 7, component: Sim0105 },
  { id: 'c7_physicsphysicalnaturematter', name: 'Physics Physical Nature Matter', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c7_phy_001', 'c7_phy_002', 'c7_phy_003', 'c7_phy_004', 'c7_phy_005', 'c7_phy_006', 'c7_phy_007', 'c7_phy_008', 'c7_phy_009', 'c7_phy_010'], subject: 'physics', classLevel: 7, component: Sim0106 },
  { id: 'c7_physicspressurefluidsliquids', name: 'Physics Pressure Fluidsliquids', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c7_phy_011', 'c7_phy_012', 'c7_phy_013', 'c7_phy_014', 'c7_phy_015', 'c7_phy_016', 'c7_phy_017', 'c7_phy_018', 'c7_phy_019', 'c7_phy_020'], subject: 'physics', classLevel: 7, component: Sim0107 },
  { id: 'c7_physicselectricitycircuitscomp', name: 'Physics Electricity Circuits Components CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c7_phys_extra_001'], subject: 'physicselectricitycircuitscomponentscbs', classLevel: 7, component: Sim0108 },
  { id: 'c7_physicslightreflectionmirrorsc', name: 'Physics Light Reflection Mirrors CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c7_phys_extra_001'], subject: 'physicslightreflectionmirrorscbs', classLevel: 7, component: Sim0109 },
  { id: 'c7_physicslightshadowsreflections', name: 'Physics Light Shadows Reflections CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c7_phys_extra_001'], subject: 'physicslightshadowsreflectionscbs', classLevel: 7, component: Sim0110 },
  { id: 'c7_physicsmeasurementtimemotioncb', name: 'Physics Measurement Time Motion CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c7_phys_extra_001'], subject: 'physicsmeasurementtimemotioncbs', classLevel: 7, component: Sim0111 },
  { id: 'c7_physicsmotiontimecbse', name: 'Physics Motion Time CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c7_phys_extra_001'], subject: 'physicsmotiontimecbs', classLevel: 7, component: Sim0112 },
  { id: 'c7_scienceacidsbasesandsalts', name: 'Science Acids Bases And Salts', emoji: '📚', color: '#64748B', nodeIds: ['c7_scie_extra_001'], subject: 'scienceacidsbasesandsalt', classLevel: 7, component: Sim0113 },
  { id: 'c7_scienceadolescenceastageofgrow', name: 'Science Adolescence AStage Of Growth', emoji: '📚', color: '#64748B', nodeIds: ['c7_scie_extra_001'], subject: 'scienceadolescenceastageofgrowt', classLevel: 7, component: Sim0114 },
  { id: 'c7_scienceearthmoonandthesun', name: 'Science Earth Moon And The Sun', emoji: '📚', color: '#64748B', nodeIds: ['c7_scie_extra_001'], subject: 'scienceearthmoonandthesu', classLevel: 7, component: Sim0115 },
  { id: 'c7_scienceexploringsubstancesacid', name: 'Science Exploring Substances Acidic Basic Neutral', emoji: '📚', color: '#64748B', nodeIds: ['c7_scie_extra_001'], subject: 'scienceexploringsubstancesacidicbasicneutra', classLevel: 7, component: Sim0116 },
  { id: 'c7_sciencelifeprocessesinanimals', name: 'Science Life Processes In Animals', emoji: '📚', color: '#64748B', nodeIds: ['c7_scie_extra_001'], subject: 'sciencelifeprocessesinanimal', classLevel: 7, component: Sim0117 },
  { id: 'c7_sciencenutritioninanimals', name: 'Science Nutrition In Animals', emoji: '📚', color: '#64748B', nodeIds: ['c7_scie_extra_001'], subject: 'sciencenutritioninanimal', classLevel: 7, component: Sim0118 },
  { id: 'c7_sciencerespirationinorganisms', name: 'Science Respiration In Organisms', emoji: '📚', color: '#64748B', nodeIds: ['c7_scie_extra_001'], subject: 'sciencerespirationinorganism', classLevel: 7, component: Sim0119 },
  { id: 'c7_sciencetheeverevolvingworldof', name: 'Science The Ever Evolving World Of', emoji: '📚', color: '#64748B', nodeIds: ['c7_scie_extra_001'], subject: 'sciencetheeverevolvingworldo', classLevel: 7, component: Sim0120 },
  { id: 'c7_sciencetheworldofmetalsand', name: 'Science The World Of Metals And', emoji: '📚', color: '#64748B', nodeIds: ['c7_scie_extra_001'], subject: 'sciencetheworldofmetalsan', classLevel: 7, component: Sim0121 },
  { id: 'c7_socialsciencehumanenvironmentt', name: 'Social Science Human Environment Tropical', emoji: '📚', color: '#64748B', nodeIds: ['c7_soci_extra_001'], subject: 'socialsciencehumanenvironmenttropica', classLevel: 7, component: Sim0122 },
  { id: 'c7_socialsciencekingskingdoms', name: 'Social Science Kings Kingdoms', emoji: '📚', color: '#64748B', nodeIds: ['c7_soci_extra_001'], subject: 'socialsciencekingskingdom', classLevel: 7, component: Sim0123 },
  { id: 'c7_socialsciencenewbeginningsciti', name: 'Social Science New Beginnings Cities', emoji: '📚', color: '#64748B', nodeIds: ['c7_soci_extra_001'], subject: 'socialsciencenewbeginningscitie', classLevel: 7, component: Sim0124 },
  { id: 'c7_socialscienceregionalcultures', name: 'Social Science Regional Cultures', emoji: '📚', color: '#64748B', nodeIds: ['c7_soci_extra_001'], subject: 'socialscienceregionalculture', classLevel: 7, component: Sim0125 },
  { id: 'c7_socialsciencetribesnomads', name: 'Social Science Tribes Nomads', emoji: '📚', color: '#64748B', nodeIds: ['c7_soci_extra_001'], subject: 'socialsciencetribesnomad', classLevel: 7, component: Sim0126 },
  { id: 'c8_biologydiffusionosmosis', name: 'Biology Diffusion Osmosis', emoji: '🧬', color: '#22C55E', nodeIds: ['c8_bio_001', 'c8_bio_002', 'c8_bio_003', 'c8_bio_004', 'c8_bio_005', 'c8_bio_006', 'c8_bio_007', 'c8_bio_008', 'c8_bio_009', 'c8_bio_010'], subject: 'biology', classLevel: 8, component: Sim0127 },
  { id: 'c8_biologyendocrinesystemhormones', name: 'Biology Endocrine System Hormones', emoji: '🧬', color: '#22C55E', nodeIds: ['c8_bio_011', 'c8_bio_012', 'c8_bio_013', 'c8_bio_014', 'c8_bio_015', 'c8_bio_016', 'c8_bio_017', 'c8_bio_018', 'c8_bio_019', 'c8_bio_020'], subject: 'biology', classLevel: 8, component: Sim0128 },
  { id: 'c8_biologymicrobesfoodproduction', name: 'Biology Microbes Food Production', emoji: '🧬', color: '#22C55E', nodeIds: ['c8_bio_021', 'c8_bio_022', 'c8_bio_023', 'c8_bio_024', 'c8_bio_025', 'c8_bio_026'], subject: 'biology', classLevel: 8, component: Sim0129 },
  { id: 'c8_chemistrychemicalequationsbala', name: 'Chemistry Chemicalequationsbalancing', emoji: '📚', color: '#64748B', nodeIds: ['c8_chem_extra_001'], subject: 'chemistrychemicalequationsbalancin', classLevel: 8, component: Sim0130 },
  { id: 'c8_chemistrymatterstatesandinterc', name: 'Chemistry Matterstatesandinterconversionrevisited', emoji: '📚', color: '#64748B', nodeIds: ['c8_chem_extra_001'], subject: 'chemistrymatterstatesandinterconversionrevisite', classLevel: 8, component: Sim0131 },
  { id: 'c8_chemistrywaterpropertiesandcom', name: 'Chemistry Waterpropertiesandcomposition', emoji: '📚', color: '#64748B', nodeIds: ['c8_chem_extra_001'], subject: 'chemistrywaterpropertiesandcompositio', classLevel: 8, component: Sim0132 },
  { id: 'c8_computersciencealgorithmsadvan', name: 'Computer Science Algorithms Advanced Properties', emoji: '💻', color: '#6366F1', nodeIds: ['c8_cs_011', 'c8_cs_012', 'c8_cs_013', 'c8_cs_014', 'c8_cs_015', 'c8_cs_016', 'c8_cs_017', 'c8_cs_018', 'c8_cs_019', 'c8_cs_020'], subject: 'computer_science', classLevel: 8, component: Sim0133 },
  { id: 'c8_computersciencedevelopmentintr', name: 'Computer Science Development Introduction Types', emoji: '💻', color: '#6366F1', nodeIds: ['c8_cs_021', 'c8_cs_022', 'c8_cs_023', 'c8_cs_024', 'c8_cs_025', 'c8_cs_026', 'c8_cs_027', 'c8_cs_028', 'c8_cs_029', 'c8_cs_030', 'c8_cs_031'], subject: 'computer_science', classLevel: 8, component: Sim0134 },
  { id: 'c8_computersciencesoftwaretypessy', name: 'Computer Science Software Types System', emoji: '💻', color: '#6366F1', nodeIds: ['c8_cs_001', 'c8_cs_002', 'c8_cs_003', 'c8_cs_004', 'c8_cs_005', 'c8_cs_006', 'c8_cs_007', 'c8_cs_008', 'c8_cs_009', 'c8_cs_010'], subject: 'computer_science', classLevel: 8, component: Sim0135 },
  { id: 'c8_geographyrepresentationgeograp', name: 'Geography Representation Geographical Features', emoji: '🌍', color: '#FBBF24', nodeIds: ['c8_geo_001', 'c8_geo_002', 'c8_geo_003', 'c8_geo_004', 'c8_geo_005', 'c8_geo_006', 'c8_geo_007', 'c8_geo_008', 'c8_geo_009', 'c8_geo_010', 'c8_geo_011', 'c8_geo_012'], subject: 'geography', classLevel: 8, component: Sim0136 },
  { id: 'c8_historycivicsamericanindepende', name: 'History Civics American Independence Beginning', emoji: '📜', color: '#A78BFA', nodeIds: ['c8_histciv_011', 'c8_histciv_012', 'c8_histciv_013', 'c8_histciv_014', 'c8_histciv_015', 'c8_histciv_016', 'c8_histciv_017', 'c8_histciv_018', 'c8_histciv_019', 'c8_histciv_020'], subject: 'history_civics', classLevel: 8, component: Sim0137 },
  { id: 'c8_historycivicsbattleplassey1757', name: 'History Civics Battle Plassey1757', emoji: '📜', color: '#A78BFA', nodeIds: ['c8_histciv_021', 'c8_histciv_022', 'c8_histciv_023', 'c8_histciv_024', 'c8_histciv_025', 'c8_histciv_026', 'c8_histciv_027', 'c8_histciv_028', 'c8_histciv_029', 'c8_histciv_030'], subject: 'history_civics', classLevel: 8, component: Sim0138 },
  { id: 'c8_historycivicslucknowpact1916', name: 'History Civics Lucknow Pact1916', emoji: '📜', color: '#A78BFA', nodeIds: ['c8_histciv_051', 'c8_histciv_052', 'c8_histciv_053', 'c8_histciv_054', 'c8_histciv_055', 'c8_histciv_056', 'c8_histciv_057', 'c8_histciv_058', 'c8_histciv_059', 'c8_histciv_060'], subject: 'history_civics', classLevel: 8, component: Sim0139 },
  { id: 'c8_historycivicsperiodtransitionm', name: 'History Civics Period Transition Meaning', emoji: '📜', color: '#A78BFA', nodeIds: ['c8_histciv_001', 'c8_histciv_002', 'c8_histciv_003', 'c8_histciv_004', 'c8_histciv_005', 'c8_histciv_006', 'c8_histciv_007', 'c8_histciv_008', 'c8_histciv_009', 'c8_histciv_010'], subject: 'history_civics', classLevel: 8, component: Sim0140 },
  { id: 'c8_historycivicsswamivivekanandar', name: 'History Civics Swami Vivekananda Ramakrishna', emoji: '📜', color: '#A78BFA', nodeIds: ['c8_histciv_041', 'c8_histciv_042', 'c8_histciv_043', 'c8_histciv_044', 'c8_histciv_045', 'c8_histciv_046', 'c8_histciv_047', 'c8_histciv_048', 'c8_histciv_049', 'c8_histciv_050'], subject: 'history_civics', classLevel: 8, component: Sim0141 },
  { id: 'c8_historycivicsvicepresidentqual', name: 'History Civics Vicepresident Qualifications Electi', emoji: '📜', color: '#A78BFA', nodeIds: ['c8_histciv_061', 'c8_histciv_062', 'c8_histciv_063', 'c8_histciv_064', 'c8_histciv_065', 'c8_histciv_066', 'c8_histciv_067', 'c8_histciv_068', 'c8_histciv_069', 'c8_histciv_070'], subject: 'history_civics', classLevel: 8, component: Sim0142 },
  { id: 'c8_historycivicswoodsdespatch1854', name: 'History Civics Woods Despatch1854', emoji: '📜', color: '#A78BFA', nodeIds: ['c8_histciv_031', 'c8_histciv_032', 'c8_histciv_033', 'c8_histciv_034', 'c8_histciv_035', 'c8_histciv_036', 'c8_histciv_037', 'c8_histciv_038', 'c8_histciv_039', 'c8_histciv_040'], subject: 'history_civics', classLevel: 8, component: Sim0143 },
  { id: 'c8_mathematicsalgebraicexpression', name: 'Mathematics Algebraic Expressions And Identities', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicsalgebraicexpressionsandidentitie', classLevel: 8, component: Sim0144 },
  { id: 'c8_mathematicsalgebraplay', name: 'Mathematics Algebra Play', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicsalgebrapla', classLevel: 8, component: Sim0145 },
  { id: 'c8_mathematicsasquareandacube', name: 'Mathematics ASquare And ACube', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicsasquareandacub', classLevel: 8, component: Sim0146 },
  { id: 'c8_mathematicscomparingquantities', name: 'Mathematics Comparing Quantities', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicscomparingquantitie', classLevel: 8, component: Sim0147 },
  { id: 'c8_mathematicscubesandcuberoots', name: 'Mathematics Cubes And Cube Roots', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicscubesandcuberoot', classLevel: 8, component: Sim0148 },
  { id: 'c8_mathematicsdatahandling', name: 'Mathematics Data Handling', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicsdatahandlin', classLevel: 8, component: Sim0149 },
  { id: 'c8_mathematicsdirectandinversepro', name: 'Mathematics Direct And Inverse Proportions', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicsdirectandinverseproportion', classLevel: 8, component: Sim0150 },
  { id: 'c8_mathematicsdirectandinversepro', name: 'Mathematics Direct And Inverse Proportions Introdu', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicsdirectandinverseproportionsintroductio', classLevel: 8, component: Sim0151 },
  { id: 'c8_mathematicsexploringsomegeomet', name: 'Mathematics Exploring Some Geometric Themes', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicsexploringsomegeometrictheme', classLevel: 8, component: Sim0152 },
  { id: 'c8_mathematicsexponentsandpowers', name: 'Mathematics Exponents And Powers', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicsexponentsandpower', classLevel: 8, component: Sim0153 },
  { id: 'c8_mathematicsfractionsindisguise', name: 'Mathematics Fractions In Disguise', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicsfractionsindisguis', classLevel: 8, component: Sim0154 },
  { id: 'c8_mathematicsintroductiontograph', name: 'Mathematics Introduction To Graphs', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicsintroductiontograph', classLevel: 8, component: Sim0155 },
  { id: 'c8_mathematicslinearequationsinon', name: 'Mathematics Linear Equations In One Variable', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicslinearequationsinonevariabl', classLevel: 8, component: Sim0156 },
  { id: 'c8_mathematicspowerplay', name: 'Mathematics Power Play', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicspowerpla', classLevel: 8, component: Sim0157 },
  { id: 'c8_mathematicsproportionalreasoni', name: 'Mathematics Proportional Reasoning1', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicsproportionalreasoning', classLevel: 8, component: Sim0158 },
  { id: 'c8_mathematicsproportionalreasoni', name: 'Mathematics Proportional Reasoning2', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_002'], subject: 'mathematicsproportionalreasoning', classLevel: 8, component: Sim0159 },
  { id: 'c8_mathematicsquadrilaterals', name: 'Mathematics Quadrilaterals', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicsquadrilateral', classLevel: 8, component: Sim0160 },
  { id: 'c8_mathematicssquaresandsquareroo', name: 'Mathematics Squares And Square Roots', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicssquaresandsquareroot', classLevel: 8, component: Sim0161 },
  { id: 'c8_mathematicstalesbydotsandlines', name: 'Mathematics Tales By Dots And Lines', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicstalesbydotsandline', classLevel: 8, component: Sim0162 },
  { id: 'c8_mathematicsthebaudhayanapythag', name: 'Mathematics The Baudhayana Pythagoras Theorem', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicsthebaudhayanapythagorastheore', classLevel: 8, component: Sim0163 },
  { id: 'c8_mathematicsunderstandingquadri', name: 'Mathematics Understanding Quadrilaterals', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicsunderstandingquadrilateral', classLevel: 8, component: Sim0164 },
  { id: 'c8_mathematicswedistributeyetthin', name: 'Mathematics We Distribute Yet Things Multiply', emoji: '📚', color: '#64748B', nodeIds: ['c8_math_extra_001'], subject: 'mathematicswedistributeyetthingsmultipl', classLevel: 8, component: Sim0165 },
  { id: 'c8_mathematicsareatrapeziumpolygo', name: 'Mathematics Area Trapezium Polygon', emoji: '📐', color: '#3B82F6', nodeIds: ['c8_math_031', 'c8_math_032', 'c8_math_033', 'c8_math_034', 'c8_math_035', 'c8_math_036', 'c8_math_037', 'c8_math_038', 'c8_math_039'], subject: 'maths', classLevel: 8, component: Sim0166 },
  { id: 'c8_mathematicsdisjoint', name: 'Mathematics Disjoint', emoji: '📐', color: '#3B82F6', nodeIds: ['c8_math_011', 'c8_math_012', 'c8_math_013', 'c8_math_014', 'c8_math_015', 'c8_math_016', 'c8_math_017', 'c8_math_018', 'c8_math_019', 'c8_math_020'], subject: 'maths', classLevel: 8, component: Sim0167 },
  { id: 'c8_mathematicsfactorisationsimple', name: 'Mathematics Factorisationsimple Cases', emoji: '📐', color: '#3B82F6', nodeIds: ['c8_math_021', 'c8_math_022', 'c8_math_023', 'c8_math_024', 'c8_math_025', 'c8_math_026', 'c8_math_027', 'c8_math_028', 'c8_math_029', 'c8_math_030'], subject: 'maths', classLevel: 8, component: Sim0168 },
  { id: 'c8_mathematicspropertiesrationaln', name: 'Mathematics Properties Rational Numbers', emoji: '📐', color: '#3B82F6', nodeIds: ['c8_math_001', 'c8_math_002', 'c8_math_003', 'c8_math_004', 'c8_math_005', 'c8_math_006', 'c8_math_007', 'c8_math_008', 'c8_math_009', 'c8_math_010'], subject: 'maths', classLevel: 8, component: Sim0169 },
  { id: 'c8_physicsboilingevaporationdiffe', name: 'Physics Boiling Evaporationdifferences', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c8_phy_021', 'c8_phy_022', 'c8_phy_023', 'c8_phy_024', 'c8_phy_025', 'c8_phy_026', 'c8_phy_027', 'c8_phy_028', 'c8_phy_029', 'c8_phy_030'], subject: 'physics', classLevel: 8, component: Sim0170 },
  { id: 'c8_physicskinetictheorymatter', name: 'Physics Kinetic Theory Matter', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c8_phy_001', 'c8_phy_002', 'c8_phy_003', 'c8_phy_004', 'c8_phy_005', 'c8_phy_006', 'c8_phy_007', 'c8_phy_008', 'c8_phy_009', 'c8_phy_010'], subject: 'physics', classLevel: 8, component: Sim0171 },
  { id: 'c8_physicslightningconductor', name: 'Physics Lightning Conductor', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c8_phy_031', 'c8_phy_032', 'c8_phy_033', 'c8_phy_034', 'c8_phy_035'], subject: 'physics', classLevel: 8, component: Sim0172 },
  { id: 'c8_physicsturningeffectforce', name: 'Physics Turning Effect Force', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c8_phy_011', 'c8_phy_012', 'c8_phy_013', 'c8_phy_014', 'c8_phy_015', 'c8_phy_016', 'c8_phy_017', 'c8_phy_018', 'c8_phy_019', 'c8_phy_020'], subject: 'physics', classLevel: 8, component: Sim0173 },
  { id: 'c8_physicselectricitymagneticheat', name: 'Physics Electricity Magnetic Heating CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c8_phys_extra_001'], subject: 'physicselectricitymagneticheatingcbs', classLevel: 8, component: Sim0174 },
  { id: 'c8_physicslightcbse', name: 'Physics Light CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c8_phys_extra_001'], subject: 'physicslightcbs', classLevel: 8, component: Sim0175 },
  { id: 'c8_physicssoundcbse', name: 'Physics Sound CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c8_phys_extra_001'], subject: 'physicssoundcbs', classLevel: 8, component: Sim0176 },
  { id: 'c8_sciencecoalandpetroleumclass8', name: 'Science Coal And Petroleum Class8', emoji: '📚', color: '#64748B', nodeIds: ['c8_scie_extra_001'], subject: 'sciencecoalandpetroleumclass', classLevel: 8, component: Sim0177 },
  { id: 'c8_scienceconservationofplantsand', name: 'Science Conservation Of Plants And Animals', emoji: '📚', color: '#64748B', nodeIds: ['c8_scie_extra_001'], subject: 'scienceconservationofplantsandanimal', classLevel: 8, component: Sim0178 },
  { id: 'c8_scienceexploringforces', name: 'Science Exploring Forces', emoji: '📚', color: '#64748B', nodeIds: ['c8_scie_extra_001'], subject: 'scienceexploringforce', classLevel: 8, component: Sim0179 },
  { id: 'c8_scienceexploringtheinvestigati', name: 'Science Exploring The Investigative World Of', emoji: '📚', color: '#64748B', nodeIds: ['c8_scie_extra_001'], subject: 'scienceexploringtheinvestigativeworldo', classLevel: 8, component: Sim0180 },
  { id: 'c8_sciencehealththeultimatetreasu', name: 'Science Health The Ultimate Treasure', emoji: '📚', color: '#64748B', nodeIds: ['c8_scie_extra_001'], subject: 'sciencehealththeultimatetreasur', classLevel: 8, component: Sim0181 },
  { id: 'c8_sciencehownatureworksinharmony', name: 'Science How Nature Works In Harmony', emoji: '📚', color: '#64748B', nodeIds: ['c8_scie_extra_001'], subject: 'sciencehownatureworksinharmon', classLevel: 8, component: Sim0182 },
  { id: 'c8_sciencekeepingtimewiththeskies', name: 'Science Keeping Time With The Skies', emoji: '📚', color: '#64748B', nodeIds: ['c8_scie_extra_001'], subject: 'sciencekeepingtimewiththeskie', classLevel: 8, component: Sim0183 },
  { id: 'c8_scienceourhomeearthaunique', name: 'Science Our Home Earth AUnique', emoji: '📚', color: '#64748B', nodeIds: ['c8_scie_extra_001'], subject: 'scienceourhomeearthauniqu', classLevel: 8, component: Sim0184 },
  { id: 'c8_sciencepressurewindsstormsandc', name: 'Science Pressure Winds Storms And Cyclones', emoji: '📚', color: '#64748B', nodeIds: ['c8_scie_extra_001'], subject: 'sciencepressurewindsstormsandcyclone', classLevel: 8, component: Sim0185 },
  { id: 'c8_sciencereachingtheageofadolesc', name: 'Science Reaching The Age Of Adolescence', emoji: '📚', color: '#64748B', nodeIds: ['c8_scie_extra_001'], subject: 'sciencereachingtheageofadolescenc', classLevel: 8, component: Sim0186 },
  { id: 'c8_sciencereproductioninanimals', name: 'Science Reproduction In Animals', emoji: '📚', color: '#64748B', nodeIds: ['c8_scie_extra_001'], subject: 'sciencereproductioninanimal', classLevel: 8, component: Sim0187 },
  { id: 'c8_sciencesomenaturalphenomena', name: 'Science Some Natural Phenomena', emoji: '📚', color: '#64748B', nodeIds: ['c8_scie_extra_001'], subject: 'sciencesomenaturalphenomen', classLevel: 8, component: Sim0188 },
  { id: 'c8_sciencetheamazingworldofsolute', name: 'Science The Amazing World Of Solutes', emoji: '📚', color: '#64748B', nodeIds: ['c8_scie_extra_001'], subject: 'sciencetheamazingworldofsolute', classLevel: 8, component: Sim0189 },
  { id: 'c8_sciencetheinvisiblelivingworld', name: 'Science The Invisible Living World Beyond', emoji: '📚', color: '#64748B', nodeIds: ['c8_scie_extra_001'], subject: 'sciencetheinvisiblelivingworldbeyon', classLevel: 8, component: Sim0190 },
  { id: 'c8_socialscienceculturalcurrents', name: 'Social Science Cultural Currents', emoji: '📚', color: '#64748B', nodeIds: ['c8_soci_extra_001'], subject: 'socialscienceculturalcurrent', classLevel: 8, component: Sim0191 },
  { id: 'c8_socialsciencelawsocialjustice', name: 'Social Science Law Social Justice', emoji: '📚', color: '#64748B', nodeIds: ['c8_soci_extra_001'], subject: 'socialsciencelawsocialjustic', classLevel: 8, component: Sim0192 },
  { id: 'c9_biologyanimalkingdomclassifica', name: 'Biology Animal Kingdom Classification', emoji: '🧬', color: '#22C55E', nodeIds: ['c9_bio_011', 'c9_bio_012', 'c9_bio_013', 'c9_bio_014', 'c9_bio_015', 'c9_bio_016', 'c9_bio_017', 'c9_bio_018', 'c9_bio_019', 'c9_bio_020'], subject: 'biology', classLevel: 9, component: Sim0193 },
  { id: 'c9_biologycelltheorycell', name: 'Biology Cell Theory Cell', emoji: '🧬', color: '#22C55E', nodeIds: ['c9_bio_001', 'c9_bio_002', 'c9_bio_003', 'c9_bio_004', 'c9_bio_005', 'c9_bio_006', 'c9_bio_007', 'c9_bio_008', 'c9_bio_009', 'c9_bio_010'], subject: 'biology', classLevel: 9, component: Sim0194 },
  { id: 'c9_biologyhealthorganizationswho', name: 'Biology Health Organizationswho', emoji: '🧬', color: '#22C55E', nodeIds: ['c9_bio_021', 'c9_bio_022', 'c9_bio_023', 'c9_bio_024', 'c9_bio_025', 'c9_bio_026', 'c9_bio_027', 'c9_bio_028'], subject: 'biology', classLevel: 9, component: Sim0195 },
  { id: 'c9_chemistryacidraincompositionan', name: 'Chemistry Acidraincompositionandcauses', emoji: '📚', color: '#64748B', nodeIds: ['c9_chem_extra_001'], subject: 'chemistryacidraincompositionandcause', classLevel: 9, component: Sim0196 },
  { id: 'c9_chemistrycovalentbonding', name: 'Chemistry Covalentbonding', emoji: '📚', color: '#64748B', nodeIds: ['c9_chem_extra_001'], subject: 'chemistrycovalentbondin', classLevel: 9, component: Sim0197 },
  { id: 'c9_chemistryenergychangesinchemic', name: 'Chemistry Energychangesinchemicalreactions', emoji: '📚', color: '#64748B', nodeIds: ['c9_chem_extra_001'], subject: 'chemistryenergychangesinchemicalreaction', classLevel: 9, component: Sim0198 },
  { id: 'c9_chemistrylaboratorypreparation', name: 'Chemistry Laboratorypreparationofhydrogen', emoji: '📚', color: '#64748B', nodeIds: ['c9_chem_extra_001'], subject: 'chemistrylaboratorypreparationofhydroge', classLevel: 9, component: Sim0199 },
  { id: 'c9_chemistrysoftwaterandhardwater', name: 'Chemistry Softwaterandhardwater', emoji: '📚', color: '#64748B', nodeIds: ['c9_chem_extra_001'], subject: 'chemistrysoftwaterandhardwate', classLevel: 9, component: Sim0200 },
  { id: 'c9_chemistrysymbolsofelements', name: 'Chemistry Symbolsofelements', emoji: '📚', color: '#64748B', nodeIds: ['c9_chem_extra_001'], subject: 'chemistrysymbolsofelement', classLevel: 9, component: Sim0201 },
  { id: 'c9_commerceappbasictermscommerce', name: 'Commerce App Basic Terms Commerce', emoji: '💼', color: '#8B5CF6', nodeIds: ['c9_commapp_001', 'c9_commapp_002', 'c9_commapp_003', 'c9_commapp_004', 'c9_commapp_005', 'c9_commapp_006', 'c9_commapp_007', 'c9_commapp_008', 'c9_commapp_009', 'c9_commapp_010'], subject: 'commerce', classLevel: 9, component: Sim0202 },
  { id: 'c9_commerceappinterrelationshipsd', name: 'Commerce App Interrelationships Dependence Functio', emoji: '💼', color: '#8B5CF6', nodeIds: ['c9_commapp_011', 'c9_commapp_012', 'c9_commapp_013', 'c9_commapp_014', 'c9_commapp_015', 'c9_commapp_016', 'c9_commapp_017'], subject: 'commerce', classLevel: 9, component: Sim0203 },
  { id: 'c9_commercialstudiesaidstradebank', name: 'Commercial Studies Aids Trade Banking', emoji: '📋', color: '#8B5CF6', nodeIds: ['c9_commstud_011', 'c9_commstud_012', 'c9_commstud_013', 'c9_commstud_014', 'c9_commstud_015', 'c9_commstud_016', 'c9_commstud_017', 'c9_commstud_018', 'c9_commstud_019', 'c9_commstud_020'], subject: 'commercial_studies', classLevel: 9, component: Sim0204 },
  { id: 'c9_commercialstudiescommercialnon', name: 'Commercial Studies Commercial Noncommercial Activi', emoji: '📋', color: '#8B5CF6', nodeIds: ['c9_commstud_001', 'c9_commstud_002', 'c9_commstud_003', 'c9_commstud_004', 'c9_commstud_005', 'c9_commstud_006', 'c9_commstud_007', 'c9_commstud_008', 'c9_commstud_009', 'c9_commstud_010'], subject: 'commercial_studies', classLevel: 9, component: Sim0205 },
  { id: 'c9_commercialstudiesmethodscommun', name: 'Commercial Studies Methods Communication Letter', emoji: '📋', color: '#8B5CF6', nodeIds: ['c9_commstud_021', 'c9_commstud_022', 'c9_commstud_023', 'c9_commstud_024', 'c9_commstud_025', 'c9_commstud_026', 'c9_commstud_027', 'c9_commstud_028', 'c9_commstud_029', 'c9_commstud_030'], subject: 'commercial_studies', classLevel: 9, component: Sim0206 },
  { id: 'c9_commercialstudiestypesbankacco', name: 'Commercial Studies Types Bank Accounts', emoji: '📋', color: '#8B5CF6', nodeIds: ['c9_commstud_031', 'c9_commstud_032', 'c9_commstud_033', 'c9_commstud_034', 'c9_commstud_035', 'c9_commstud_036', 'c9_commstud_037', 'c9_commstud_038', 'c9_commstud_039'], subject: 'commercial_studies', classLevel: 9, component: Sim0207 },
  { id: 'c9_computersciencebasiclogicgates', name: 'Computer Science Basic Logic Gates', emoji: '💻', color: '#6366F1', nodeIds: ['c9_cs_011', 'c9_cs_012', 'c9_cs_013', 'c9_cs_014', 'c9_cs_015', 'c9_cs_016', 'c9_cs_017', 'c9_cs_018', 'c9_cs_019', 'c9_cs_020'], subject: 'computer_science', classLevel: 9, component: Sim0208 },
  { id: 'c9_computersciencebluejcreatingpr', name: 'Computer Science Bluej Creating Projects', emoji: '💻', color: '#6366F1', nodeIds: ['c9_cs_021', 'c9_cs_022', 'c9_cs_023', 'c9_cs_024', 'c9_cs_025', 'c9_cs_026', 'c9_cs_027', 'c9_cs_028', 'c9_cs_029', 'c9_cs_030'], subject: 'computer_science', classLevel: 9, component: Sim0209 },
  { id: 'c9_computersciencecomputerarchite', name: 'Computer Science Computer Architecture Cpu', emoji: '💻', color: '#6366F1', nodeIds: ['c9_cs_001', 'c9_cs_002', 'c9_cs_003', 'c9_cs_004', 'c9_cs_005', 'c9_cs_006', 'c9_cs_007', 'c9_cs_008', 'c9_cs_009', 'c9_cs_010'], subject: 'computer_science', classLevel: 9, component: Sim0210 },
  { id: 'c9_computersciencejavaloopsyntax', name: 'Computer Science Java Loop Syntax', emoji: '💻', color: '#6366F1', nodeIds: ['c9_cs_031', 'c9_cs_032', 'c9_cs_033', 'c9_cs_034', 'c9_cs_035', 'c9_cs_036'], subject: 'computer_science', classLevel: 9, component: Sim0211 },
  { id: 'c9_econapplicationseconomicentiti', name: 'Econ Applications Economic Entities Consumer', emoji: '📊', color: '#F59E0B', nodeIds: ['c9_econapp_001', 'c9_econapp_002', 'c9_econapp_003', 'c9_econapp_004', 'c9_econapp_005', 'c9_econapp_006', 'c9_econapp_007', 'c9_econapp_008', 'c9_econapp_009', 'c9_econapp_010'], subject: 'economics', classLevel: 9, component: Sim0212 },
  { id: 'c9_econapplicationsinterdependenc', name: 'Econ Applications Interdependence Sectors Primary', emoji: '📊', color: '#F59E0B', nodeIds: ['c9_econapp_011', 'c9_econapp_012', 'c9_econapp_013', 'c9_econapp_014', 'c9_econapp_015', 'c9_econapp_016', 'c9_econapp_017', 'c9_econapp_018', 'c9_econapp_019', 'c9_econapp_020'], subject: 'economics', classLevel: 9, component: Sim0213 },
  { id: 'c9_economicsbasiceconomicproblem', name: 'Economics Basic Economic Problem', emoji: '📊', color: '#F59E0B', nodeIds: ['c9_econ_021', 'c9_econ_022', 'c9_econ_023', 'c9_econ_024', 'c9_econ_025', 'c9_econ_026', 'c9_econ_027', 'c9_econ_028', 'c9_econ_029', 'c9_econ_030'], subject: 'economics', classLevel: 9, component: Sim0214 },
  { id: 'c9_economicsbasiceconomicterms', name: 'Economics Basic Economic Terms', emoji: '📊', color: '#F59E0B', nodeIds: ['c9_econ_011', 'c9_econ_012', 'c9_econ_013', 'c9_econ_014', 'c9_econ_015', 'c9_econ_016', 'c9_econ_017', 'c9_econ_018', 'c9_econ_019', 'c9_econ_020'], subject: 'economics', classLevel: 9, component: Sim0215 },
  { id: 'c9_economicsdefinitioneconomicsad', name: 'Economics Definition Economics Adam', emoji: '📊', color: '#F59E0B', nodeIds: ['c9_econ_001', 'c9_econ_002', 'c9_econ_003', 'c9_econ_004', 'c9_econ_005', 'c9_econ_006', 'c9_econ_007', 'c9_econ_008', 'c9_econ_009', 'c9_econ_010'], subject: 'economics', classLevel: 9, component: Sim0216 },
  { id: 'c9_economicsgovernmentschemesremo', name: 'Economics Government Schemes Remove', emoji: '📊', color: '#F59E0B', nodeIds: ['c9_econ_041', 'c9_econ_042', 'c9_econ_043', 'c9_econ_044', 'c9_econ_045', 'c9_econ_046'], subject: 'economics', classLevel: 9, component: Sim0217 },
  { id: 'c9_economicsinterdependenceagricu', name: 'Economics Interdependence Agriculture Industry', emoji: '📊', color: '#F59E0B', nodeIds: ['c9_econ_031', 'c9_econ_032', 'c9_econ_033', 'c9_econ_034', 'c9_econ_035', 'c9_econ_036', 'c9_econ_037', 'c9_econ_038', 'c9_econ_039', 'c9_econ_040'], subject: 'economics', classLevel: 9, component: Sim0218 },
  { id: 'c9_evsbiodiversitylosscauses', name: 'EVSBiodiversity Loss Causes', emoji: '🌱', color: '#84CC16', nodeIds: ['c9_evs_031', 'c9_evs_032', 'c9_evs_033', 'c9_evs_034', 'c9_evs_035'], subject: 'evs', classLevel: 9, component: Sim0219 },
  { id: 'c9_evsdomesticatedbiodiversitynat', name: 'EVSDomesticated Biodiversity Native', emoji: '🌱', color: '#84CC16', nodeIds: ['c9_evs_021', 'c9_evs_022', 'c9_evs_023', 'c9_evs_024', 'c9_evs_025', 'c9_evs_026', 'c9_evs_027', 'c9_evs_028', 'c9_evs_029', 'c9_evs_030'], subject: 'evs', classLevel: 9, component: Sim0220 },
  { id: 'c9_evsearthenvironmentbiotic', name: 'EVSEarth Environment Biotic', emoji: '🌱', color: '#84CC16', nodeIds: ['c9_evs_001', 'c9_evs_002', 'c9_evs_003', 'c9_evs_004', 'c9_evs_005', 'c9_evs_006', 'c9_evs_007', 'c9_evs_008', 'c9_evs_009', 'c9_evs_010'], subject: 'evs', classLevel: 9, component: Sim0221 },
  { id: 'c9_evsforestecosystemstropical', name: 'EVSForest Ecosystems Tropical', emoji: '🌱', color: '#84CC16', nodeIds: ['c9_evs_011', 'c9_evs_012', 'c9_evs_013', 'c9_evs_014', 'c9_evs_015', 'c9_evs_016', 'c9_evs_017', 'c9_evs_018', 'c9_evs_019', 'c9_evs_020'], subject: 'evs', classLevel: 9, component: Sim0222 },
  { id: 'c9_geographydenudationwindwork', name: 'Geography Denudation Wind Work', emoji: '🌍', color: '#FBBF24', nodeIds: ['c9_geo_021', 'c9_geo_022', 'c9_geo_023', 'c9_geo_024', 'c9_geo_025', 'c9_geo_026', 'c9_geo_027', 'c9_geo_028', 'c9_geo_029', 'c9_geo_030'], subject: 'geography', classLevel: 9, component: Sim0223 },
  { id: 'c9_geographyearthplanet', name: 'Geography Earth Planet', emoji: '🌍', color: '#FBBF24', nodeIds: ['c9_geo_001', 'c9_geo_002', 'c9_geo_003', 'c9_geo_004', 'c9_geo_005', 'c9_geo_006', 'c9_geo_007', 'c9_geo_008', 'c9_geo_009', 'c9_geo_010'], subject: 'geography', classLevel: 9, component: Sim0224 },
  { id: 'c9_geographylandformsplateaus', name: 'Geography Landforms Plateaus', emoji: '🌍', color: '#FBBF24', nodeIds: ['c9_geo_011', 'c9_geo_012', 'c9_geo_013', 'c9_geo_014', 'c9_geo_015', 'c9_geo_016', 'c9_geo_017', 'c9_geo_018', 'c9_geo_019', 'c9_geo_020'], subject: 'geography', classLevel: 9, component: Sim0225 },
  { id: 'c9_geoindiasizelocationcbse', name: 'Geo India Size Location CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c9_geoi_xc6__001'], subject: 'geoindiasizelocationcbs', classLevel: 9, component: Sim0226 },
  { id: 'c9_geonaturalvegetationcbse', name: 'Geo Natural Vegetation CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c9_geon_xc6__001'], subject: 'geonaturalvegetationcbs', classLevel: 9, component: Sim0227 },
  { id: 'c9_historycivicscausesrisejainism', name: 'History Civics Causes Rise Jainism', emoji: '📜', color: '#A78BFA', nodeIds: ['c9_histciv_031', 'c9_histciv_032', 'c9_histciv_033', 'c9_histciv_034', 'c9_histciv_035', 'c9_histciv_036', 'c9_histciv_037', 'c9_histciv_038', 'c9_histciv_039', 'c9_histciv_040'], subject: 'history_civics', classLevel: 9, component: Sim0228 },
  { id: 'c9_historycivicscompositeculturef', name: 'History Civics Composite Culture Factors', emoji: '📜', color: '#A78BFA', nodeIds: ['c9_histciv_061', 'c9_histciv_062', 'c9_histciv_063', 'c9_histciv_064', 'c9_histciv_065', 'c9_histciv_066', 'c9_histciv_067', 'c9_histciv_068', 'c9_histciv_069'], subject: 'history_civics', classLevel: 9, component: Sim0229 },
  { id: 'c9_historycivicsdeclineharappanci', name: 'History Civics Decline Harappan Civilisation', emoji: '📜', color: '#A78BFA', nodeIds: ['c9_histciv_021', 'c9_histciv_022', 'c9_histciv_023', 'c9_histciv_024', 'c9_histciv_025', 'c9_histciv_026', 'c9_histciv_027', 'c9_histciv_028', 'c9_histciv_029', 'c9_histciv_030'], subject: 'history_civics', classLevel: 9, component: Sim0230 },
  { id: 'c9_historycivicsdefinitionconstit', name: 'History Civics Definition Constitution Significanc', emoji: '📜', color: '#A78BFA', nodeIds: ['c9_histciv_001', 'c9_histciv_002', 'c9_histciv_003', 'c9_histciv_004', 'c9_histciv_005', 'c9_histciv_006', 'c9_histciv_007', 'c9_histciv_008', 'c9_histciv_009', 'c9_histciv_010'], subject: 'history_civics', classLevel: 9, component: Sim0231 },
  { id: 'c9_historycivicsguptacontribution', name: 'History Civics Gupta Contribution Culture', emoji: '📜', color: '#A78BFA', nodeIds: ['c9_histciv_051', 'c9_histciv_052', 'c9_histciv_053', 'c9_histciv_054', 'c9_histciv_055', 'c9_histciv_056', 'c9_histciv_057', 'c9_histciv_058', 'c9_histciv_059', 'c9_histciv_060'], subject: 'history_civics', classLevel: 9, component: Sim0232 },
  { id: 'c9_historycivicsmidtermelectionby', name: 'History Civics Midterm Election Byelection', emoji: '📜', color: '#A78BFA', nodeIds: ['c9_histciv_011', 'c9_histciv_012', 'c9_histciv_013', 'c9_histciv_014', 'c9_histciv_015', 'c9_histciv_016', 'c9_histciv_017', 'c9_histciv_018', 'c9_histciv_019', 'c9_histciv_020'], subject: 'history_civics', classLevel: 9, component: Sim0233 },
  { id: 'c9_historycivicssourcessangamtiru', name: 'History Civics Sources Sangam Tirukkural', emoji: '📜', color: '#A78BFA', nodeIds: ['c9_histciv_041', 'c9_histciv_042', 'c9_histciv_043', 'c9_histciv_044', 'c9_histciv_045', 'c9_histciv_046', 'c9_histciv_047', 'c9_histciv_048', 'c9_histciv_049', 'c9_histciv_050'], subject: 'history_civics', classLevel: 9, component: Sim0234 },
  { id: 'c9_mathematicsexploringalgebraici', name: 'Mathematics Exploring Algebraic Identities', emoji: '📚', color: '#64748B', nodeIds: ['c9_math_extra_001'], subject: 'mathematicsexploringalgebraicidentitie', classLevel: 9, component: Sim0235 },
  { id: 'c9_mathematicsimupanddown', name: 'Mathematics IMUp And Down', emoji: '📚', color: '#64748B', nodeIds: ['c9_math_extra_001'], subject: 'mathematicsimupanddow', classLevel: 9, component: Sim0236 },
  { id: 'c9_mathematicsorientingyourselfth', name: 'Mathematics Orienting Yourself The Use Of', emoji: '📚', color: '#64748B', nodeIds: ['c9_math_extra_001'], subject: 'mathematicsorientingyourselftheuseo', classLevel: 9, component: Sim0237 },
  { id: 'c9_mathematicspredictingwhatcomes', name: 'Mathematics Predicting What Comes Next Exploring', emoji: '📚', color: '#64748B', nodeIds: ['c9_math_extra_001'], subject: 'mathematicspredictingwhatcomesnextexplorin', classLevel: 9, component: Sim0238 },
  { id: 'c9_mathematicsareatheoremsparalle', name: 'Mathematics Area Theorems Parallelograms', emoji: '📐', color: '#3B82F6', nodeIds: ['c9_math_041', 'c9_math_042', 'c9_math_043', 'c9_math_044', 'c9_math_045', 'c9_math_046', 'c9_math_047', 'c9_math_048', 'c9_math_049', 'c9_math_050'], subject: 'maths', classLevel: 9, component: Sim0239 },
  { id: 'c9_mathematicsmedianungroupeddata', name: 'Mathematics Median Ungrouped Data', emoji: '📐', color: '#3B82F6', nodeIds: ['c9_math_051', 'c9_math_052', 'c9_math_053', 'c9_math_054', 'c9_math_055', 'c9_math_056', 'c9_math_057', 'c9_math_058', 'c9_math_059', 'c9_math_060'], subject: 'maths', classLevel: 9, component: Sim0240 },
  { id: 'c9_mathematicsrategrowthdepreciat', name: 'Mathematics Rate Growth Depreciation', emoji: '📐', color: '#3B82F6', nodeIds: ['c9_math_011', 'c9_math_012', 'c9_math_013', 'c9_math_014', 'c9_math_015', 'c9_math_016', 'c9_math_017', 'c9_math_018', 'c9_math_019', 'c9_math_020'], subject: 'maths', classLevel: 9, component: Sim0241 },
  { id: 'c9_mathematicsrationalnumbersreal', name: 'Mathematics Rational Numbers Real', emoji: '📐', color: '#3B82F6', nodeIds: ['c9_math_001', 'c9_math_002', 'c9_math_003', 'c9_math_004', 'c9_math_005', 'c9_math_006', 'c9_math_007', 'c9_math_008', 'c9_math_009', 'c9_math_010'], subject: 'maths', classLevel: 9, component: Sim0242 },
  { id: 'c9_mathematicssidestrianglegreate', name: 'Mathematics Sides Triangle Greater', emoji: '📐', color: '#3B82F6', nodeIds: ['c9_math_031', 'c9_math_032', 'c9_math_033', 'c9_math_034', 'c9_math_035', 'c9_math_036', 'c9_math_037', 'c9_math_038', 'c9_math_039', 'c9_math_040'], subject: 'maths', classLevel: 9, component: Sim0243 },
  { id: 'c9_mathematicssolvingsimultaneous', name: 'Mathematics Solving Simultaneous Linear', emoji: '📐', color: '#3B82F6', nodeIds: ['c9_math_021', 'c9_math_022', 'c9_math_023', 'c9_math_024', 'c9_math_025', 'c9_math_026', 'c9_math_027', 'c9_math_028', 'c9_math_029', 'c9_math_030'], subject: 'maths', classLevel: 9, component: Sim0244 },
  { id: 'c9_mathematicstrigonometricratios', name: 'Mathematics Trigonometric Ratios Standard', emoji: '📐', color: '#3B82F6', nodeIds: ['c9_math_061', 'c9_math_062', 'c9_math_063', 'c9_math_064', 'c9_math_065', 'c9_math_066', 'c9_math_067'], subject: 'maths', classLevel: 9, component: Sim0245 },
  { id: 'c9_physicsequationsuniformlyaccel', name: 'Physics Equations Uniformly Accelerated', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c9_phy_011', 'c9_phy_012', 'c9_phy_013', 'c9_phy_014', 'c9_phy_015', 'c9_phy_016', 'c9_phy_017', 'c9_phy_018', 'c9_phy_019', 'c9_phy_020'], subject: 'physics', classLevel: 9, component: Sim0246 },
  { id: 'c9_physicsinternationalsystemunit', name: 'Physics International System Units', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c9_phy_001', 'c9_phy_002', 'c9_phy_003', 'c9_phy_004', 'c9_phy_005', 'c9_phy_006', 'c9_phy_007', 'c9_phy_008', 'c9_phy_009', 'c9_phy_010'], subject: 'physics', classLevel: 9, component: Sim0247 },
  { id: 'c9_physicsohmsresistance', name: 'Physics Ohms Resistance', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c9_phy_041', 'c9_phy_042', 'c9_phy_043', 'c9_phy_044', 'c9_phy_045', 'c9_phy_046', 'c9_phy_047', 'c9_phy_048'], subject: 'physics', classLevel: 9, component: Sim0248 },
  { id: 'c9_physicssphericalmirrorsterms', name: 'Physics Spherical Mirrors Terms', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c9_phy_031', 'c9_phy_032', 'c9_phy_033', 'c9_phy_034', 'c9_phy_035', 'c9_phy_036', 'c9_phy_037', 'c9_phy_038', 'c9_phy_039', 'c9_phy_040'], subject: 'physics', classLevel: 9, component: Sim0249 },
  { id: 'c9_physicsweightmasscomparison', name: 'Physics Weight Mass Comparison', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c9_phy_021', 'c9_phy_022', 'c9_phy_023', 'c9_phy_024', 'c9_phy_025', 'c9_phy_026', 'c9_phy_027', 'c9_phy_028', 'c9_phy_029', 'c9_phy_030'], subject: 'physics', classLevel: 9, component: Sim0250 },
  { id: 'c9_physicsjourneyinsideatomcbse', name: 'Physics Journey Inside Atom CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c9_phys_extra_001'], subject: 'physicsjourneyinsideatomcbs', classLevel: 9, component: Sim0251 },
  { id: 'c9_scienceatomicfoundationsofmatt', name: 'Science Atomic Foundations Of Matter', emoji: '📚', color: '#64748B', nodeIds: ['c9_scie_extra_001'], subject: 'scienceatomicfoundationsofmatte', classLevel: 9, component: Sim0252 },
  { id: 'c9_sciencedescribingmotionaroundu', name: 'Science Describing Motion Around Us', emoji: '📚', color: '#64748B', nodeIds: ['c9_scie_extra_001'], subject: 'sciencedescribingmotionaroundu', classLevel: 9, component: Sim0253 },
  { id: 'c9_scienceexplorationenteringthew', name: 'Science Exploration Entering The World Of', emoji: '📚', color: '#64748B', nodeIds: ['c9_scie_extra_001'], subject: 'scienceexplorationenteringtheworldo', classLevel: 9, component: Sim0254 },
  { id: 'c9_scienceexploringmixturesandthe', name: 'Science Exploring Mixtures And Their Separation', emoji: '📚', color: '#64748B', nodeIds: ['c9_scie_extra_001'], subject: 'scienceexploringmixturesandtheirseparatio', classLevel: 9, component: Sim0255 },
  { id: 'c9_sciencehowforcesaffectmotion', name: 'Science How Forces Affect Motion', emoji: '📚', color: '#64748B', nodeIds: ['c9_scie_extra_001'], subject: 'sciencehowforcesaffectmotio', classLevel: 9, component: Sim0256 },
  { id: 'c9_sciencereproductionhowlifecont', name: 'Science Reproduction How Life Continues', emoji: '📚', color: '#64748B', nodeIds: ['c9_scie_extra_001'], subject: 'sciencereproductionhowlifecontinue', classLevel: 9, component: Sim0257 },
  { id: 'c9_sciencesoundwavescharacteristi', name: 'Science Sound Waves Characteristics And Applicatio', emoji: '📚', color: '#64748B', nodeIds: ['c9_scie_extra_001'], subject: 'sciencesoundwavescharacteristicsandapplication', classLevel: 9, component: Sim0258 },
  { id: 'c9_sciencetissuesinaction', name: 'Science Tissues In Action', emoji: '📚', color: '#64748B', nodeIds: ['c9_scie_extra_001'], subject: 'sciencetissuesinactio', classLevel: 9, component: Sim0259 },
  { id: 'c9_scienceworkenergyandsimplemach', name: 'Science Work Energy And Simple Machines', emoji: '📚', color: '#64748B', nodeIds: ['c9_scie_extra_001'], subject: 'scienceworkenergyandsimplemachine', classLevel: 9, component: Sim0260 },
  { id: 'c9_socialscienceforestsociety', name: 'Social Science Forest Society', emoji: '📚', color: '#64748B', nodeIds: ['c9_soci_extra_001'], subject: 'socialscienceforestsociet', classLevel: 9, component: Sim0261 },
  { id: 'c9_socialsciencefrenchrevolution', name: 'Social Science French Revolution', emoji: '📚', color: '#64748B', nodeIds: ['c9_soci_extra_001'], subject: 'socialsciencefrenchrevolutio', classLevel: 9, component: Sim0262 },
  { id: 'c9_socialsciencestatesociety1000c', name: 'Social Science State Society1000CE', emoji: '📚', color: '#64748B', nodeIds: ['c9_soci_extra_001'], subject: 'socialsciencestatesociety', classLevel: 9, component: Sim0263 },
  { id: 'c9_socialscienceworkingofinstitut', name: 'Social Science Working Of Institutions', emoji: '📚', color: '#64748B', nodeIds: ['c9_soci_extra_001'], subject: 'socialscienceworkingofinstitution', classLevel: 9, component: Sim0264 },
  { id: 'c10_biologychromosomestructurechro', name: 'Biology Chromosome Structurechromatin', emoji: '🧬', color: '#22C55E', nodeIds: ['c10_bio_001', 'c10_bio_002', 'c10_bio_003', 'c10_bio_004', 'c10_bio_005', 'c10_bio_006', 'c10_bio_007', 'c10_bio_008', 'c10_bio_009', 'c10_bio_010'], subject: 'biology', classLevel: 10, component: Sim0265 },
  { id: 'c10_biologycirculatorysystemdetail', name: 'Biology Circulatory Systemdetailed', emoji: '🧬', color: '#22C55E', nodeIds: ['c10_bio_011', 'c10_bio_012', 'c10_bio_013', 'c10_bio_014', 'c10_bio_015', 'c10_bio_016', 'c10_bio_017', 'c10_bio_018', 'c10_bio_019', 'c10_bio_020'], subject: 'biology', classLevel: 10, component: Sim0266 },
  { id: 'c10_biologypollutiontypessources', name: 'Biology Pollution Types Sources', emoji: '🧬', color: '#22C55E', nodeIds: ['c10_bio_021', 'c10_bio_022', 'c10_bio_023', 'c10_bio_024', 'c10_bio_025', 'c10_bio_026', 'c10_bio_027', 'c10_bio_028', 'c10_bio_029', 'c10_bio_030', 'c10_bio_031'], subject: 'biology', classLevel: 10, component: Sim0267 },
  { id: 'c10_chemistryalkanesgeneralformula', name: 'Chemistry Alkanesgeneralformulaandpreparation', emoji: '📚', color: '#64748B', nodeIds: ['c10_chem_extra_001'], subject: 'chemistryalkanesgeneralformulaandpreparatio', classLevel: 10, component: Sim0268 },
  { id: 'c10_chemistryalloysandamalgams', name: 'Chemistry Alloysandamalgams', emoji: '📚', color: '#64748B', nodeIds: ['c10_chem_extra_001'], subject: 'chemistryalloysandamalgam', classLevel: 10, component: Sim0269 },
  { id: 'c10_chemistryclassificationofbases', name: 'Chemistry Classificationofbases', emoji: '📚', color: '#64748B', nodeIds: ['c10_chem_extra_001'], subject: 'chemistryclassificationofbase', classLevel: 10, component: Sim0270 },
  { id: 'c10_chemistryelectrolysisofspecifi', name: 'Chemistry Electrolysisofspecificcompounds', emoji: '📚', color: '#64748B', nodeIds: ['c10_chem_extra_001'], subject: 'chemistryelectrolysisofspecificcompound', classLevel: 10, component: Sim0271 },
  { id: 'c10_chemistryperiodicpropertiesato', name: 'Chemistry Periodicpropertiesatomicsize', emoji: '📚', color: '#64748B', nodeIds: ['c10_chem_extra_001'], subject: 'chemistryperiodicpropertiesatomicsiz', classLevel: 10, component: Sim0272 },
  { id: 'c10_chemistrypolarandnonpolarcoval', name: 'Chemistry Polarandnonpolarcovalentcompounds', emoji: '📚', color: '#64748B', nodeIds: ['c10_chem_extra_001'], subject: 'chemistrypolarandnonpolarcovalentcompound', classLevel: 10, component: Sim0273 },
  { id: 'c10_chemistrysulphuricacidcontactp', name: 'Chemistry Sulphuricacid Contactprocess', emoji: '📚', color: '#64748B', nodeIds: ['c10_chem_extra_001'], subject: 'chemistrysulphuricacidcontactproces', classLevel: 10, component: Sim0274 },
  { id: 'c10_chemistryvapourdensityandmolec', name: 'Chemistry Vapourdensityandmolecularmass', emoji: '📚', color: '#64748B', nodeIds: ['c10_chem_extra_001'], subject: 'chemistryvapourdensityandmolecularmas', classLevel: 10, component: Sim0275 },
  { id: 'c10_commerceappdefinitionmarketsma', name: 'Commerce App Definition Markets Marketing', emoji: '💼', color: '#8B5CF6', nodeIds: ['c10_commapp_001', 'c10_commapp_002', 'c10_commapp_003', 'c10_commapp_004', 'c10_commapp_005', 'c10_commapp_006', 'c10_commapp_007', 'c10_commapp_008', 'c10_commapp_009', 'c10_commapp_010'], subject: 'commerce', classLevel: 10, component: Sim0276 },
  { id: 'c10_commerceappsalessellingprocess', name: 'Commerce App Sales Selling Process', emoji: '💼', color: '#8B5CF6', nodeIds: ['c10_commapp_011', 'c10_commapp_012', 'c10_commapp_013', 'c10_commapp_014', 'c10_commapp_015', 'c10_commapp_016', 'c10_commapp_017', 'c10_commapp_018', 'c10_commapp_019', 'c10_commapp_020'], subject: 'commerce', classLevel: 10, component: Sim0277 },
  { id: 'c10_commerceappselectionmeaningmet', name: 'Commerce App Selection Meaning Methods', emoji: '💼', color: '#8B5CF6', nodeIds: ['c10_commapp_021', 'c10_commapp_022', 'c10_commapp_023', 'c10_commapp_024', 'c10_commapp_025', 'c10_commapp_026', 'c10_commapp_027', 'c10_commapp_028', 'c10_commapp_029', 'c10_commapp_030', 'c10_commapp_031', 'c10_commapp_032'], subject: 'commerce', classLevel: 10, component: Sim0278 },
  { id: 'c10_commercialstudiesadvertisingme', name: 'Commercial Studies Advertising Meaning Importance', emoji: '📋', color: '#8B5CF6', nodeIds: ['c10_commstud_011', 'c10_commstud_012', 'c10_commstud_013', 'c10_commstud_014', 'c10_commstud_015', 'c10_commstud_016', 'c10_commstud_017', 'c10_commstud_018', 'c10_commstud_019', 'c10_commstud_020'], subject: 'commercial_studies', classLevel: 10, component: Sim0279 },
  { id: 'c10_commercialstudiesfinalaccounts', name: 'Commercial Studies Final Accounts Profit', emoji: '📋', color: '#8B5CF6', nodeIds: ['c10_commstud_021', 'c10_commstud_022', 'c10_commstud_023', 'c10_commstud_024', 'c10_commstud_025', 'c10_commstud_026', 'c10_commstud_027', 'c10_commstud_028', 'c10_commstud_029', 'c10_commstud_030'], subject: 'commercial_studies', classLevel: 10, component: Sim0280 },
  { id: 'c10_commercialstudiesindustrialrel', name: 'Commercial Studies Industrial Relations Meaning', emoji: '📋', color: '#8B5CF6', nodeIds: ['c10_commstud_031', 'c10_commstud_032', 'c10_commstud_033', 'c10_commstud_034', 'c10_commstud_035', 'c10_commstud_036', 'c10_commstud_037', 'c10_commstud_038', 'c10_commstud_039', 'c10_commstud_040'], subject: 'commercial_studies', classLevel: 10, component: Sim0281 },
  { id: 'c10_commercialstudiesinternetbanki', name: 'Commercial Studies Internet Banking Neft', emoji: '📋', color: '#8B5CF6', nodeIds: ['c10_commstud_041', 'c10_commstud_042', 'c10_commstud_043', 'c10_commstud_044', 'c10_commstud_045', 'c10_commstud_046'], subject: 'commercial_studies', classLevel: 10, component: Sim0282 },
  { id: 'c10_commercialstudiesmeaningstakeh', name: 'Commercial Studies Meaning Stakeholder', emoji: '📋', color: '#8B5CF6', nodeIds: ['c10_commstud_001', 'c10_commstud_002', 'c10_commstud_003', 'c10_commstud_004', 'c10_commstud_005', 'c10_commstud_006', 'c10_commstud_007', 'c10_commstud_008', 'c10_commstud_009', 'c10_commstud_010'], subject: 'commercial_studies', classLevel: 10, component: Sim0283 },
  { id: 'c10_computersciencejavadatatypes', name: 'Computer Science Java Data Types', emoji: '💻', color: '#6366F1', nodeIds: ['c10_cs_011', 'c10_cs_012', 'c10_cs_013', 'c10_cs_014', 'c10_cs_015', 'c10_cs_016', 'c10_cs_017', 'c10_cs_018', 'c10_cs_019', 'c10_cs_020'], subject: 'computer_science', classLevel: 10, component: Sim0284 },
  { id: 'c10_computersciencejavamathclass', name: 'Computer Science Java Math Class', emoji: '💻', color: '#6366F1', nodeIds: ['c10_cs_021', 'c10_cs_022', 'c10_cs_023', 'c10_cs_024', 'c10_cs_025', 'c10_cs_026', 'c10_cs_027', 'c10_cs_028', 'c10_cs_029', 'c10_cs_030'], subject: 'computer_science', classLevel: 10, component: Sim0285 },
  { id: 'c10_computersciencejavaprogramfact', name: 'Computer Science Java Program Factorial', emoji: '💻', color: '#6366F1', nodeIds: ['c10_cs_031', 'c10_cs_032', 'c10_cs_033', 'c10_cs_034', 'c10_cs_035', 'c10_cs_036', 'c10_cs_037', 'c10_cs_038', 'c10_cs_039', 'c10_cs_040', 'c10_cs_041', 'c10_cs_043'], subject: 'computer_science', classLevel: 10, component: Sim0286 },
  { id: 'c10_computerscienceprinciplesencap', name: 'Computer Science Principles Encapsulation Data', emoji: '💻', color: '#6366F1', nodeIds: ['c10_cs_001', 'c10_cs_002', 'c10_cs_003', 'c10_cs_004', 'c10_cs_005', 'c10_cs_006', 'c10_cs_007', 'c10_cs_008', 'c10_cs_009', 'c10_cs_010'], subject: 'computer_science', classLevel: 10, component: Sim0287 },
  { id: 'c10_econapplicationsdemandmeaningt', name: 'Econ Applications Demand Meaning Types', emoji: '📊', color: '#F59E0B', nodeIds: ['c10_econapp_001', 'c10_econapp_002', 'c10_econapp_003', 'c10_econapp_004', 'c10_econapp_005', 'c10_econapp_006', 'c10_econapp_007', 'c10_econapp_008', 'c10_econapp_009', 'c10_econapp_010'], subject: 'economics', classLevel: 10, component: Sim0288 },
  { id: 'c10_econapplicationseffectsinflati', name: 'Econ Applications Effects Inflation Debtors', emoji: '📊', color: '#F59E0B', nodeIds: ['c10_econapp_031', 'c10_econapp_032', 'c10_econapp_033'], subject: 'economics', classLevel: 10, component: Sim0289 },
  { id: 'c10_econapplicationselasticitysupp', name: 'Econ Applications Elasticity Supply Meaning', emoji: '📊', color: '#F59E0B', nodeIds: ['c10_econapp_011', 'c10_econapp_012', 'c10_econapp_013', 'c10_econapp_014', 'c10_econapp_015', 'c10_econapp_016', 'c10_econapp_017', 'c10_econapp_018', 'c10_econapp_019', 'c10_econapp_020'], subject: 'economics', classLevel: 10, component: Sim0290 },
  { id: 'c10_econapplicationsrolecommercial', name: 'Econ Applications Role Commercial Banks', emoji: '📊', color: '#F59E0B', nodeIds: ['c10_econapp_021', 'c10_econapp_022', 'c10_econapp_023', 'c10_econapp_024', 'c10_econapp_025', 'c10_econapp_026', 'c10_econapp_027', 'c10_econapp_028', 'c10_econapp_029', 'c10_econapp_030'], subject: 'economics', classLevel: 10, component: Sim0291 },
  { id: 'c10_economicsdeterminantsdemandnon', name: 'Economics Determinants Demand Nonprice', emoji: '📊', color: '#F59E0B', nodeIds: ['c10_econ_011', 'c10_econ_012', 'c10_econ_013', 'c10_econ_014', 'c10_econ_015', 'c10_econ_016', 'c10_econ_017', 'c10_econ_018', 'c10_econ_019', 'c10_econ_020'], subject: 'economics', classLevel: 10, component: Sim0292 },
  { id: 'c10_economicslandmeaningcharacteri', name: 'Economics Land Meaning Characteristics', emoji: '📊', color: '#F59E0B', nodeIds: ['c10_econ_001', 'c10_econ_002', 'c10_econ_003', 'c10_econ_004', 'c10_econ_005', 'c10_econ_006', 'c10_econ_007', 'c10_econ_008', 'c10_econ_009', 'c10_econ_010'], subject: 'economics', classLevel: 10, component: Sim0293 },
  { id: 'c10_economicsperfectcompetitionmea', name: 'Economics Perfect Competition Meaning', emoji: '📊', color: '#F59E0B', nodeIds: ['c10_econ_021', 'c10_econ_022', 'c10_econ_023', 'c10_econ_024', 'c10_econ_025', 'c10_econ_026', 'c10_econ_027', 'c10_econ_028', 'c10_econ_029', 'c10_econ_030'], subject: 'economics', classLevel: 10, component: Sim0294 },
  { id: 'c10_economicspublicexpenditurereve', name: 'Economics Public Expenditure Revenue', emoji: '📊', color: '#F59E0B', nodeIds: ['c10_econ_031', 'c10_econ_032', 'c10_econ_033', 'c10_econ_034', 'c10_econ_035', 'c10_econ_036', 'c10_econ_037', 'c10_econ_038', 'c10_econ_039', 'c10_econ_040', 'c10_econ_041', 'c10_econ_042'], subject: 'economics', classLevel: 10, component: Sim0295 },
  { id: 'c10_evscauseeffectrelations', name: 'EVSCause Effect Relations', emoji: '🌱', color: '#84CC16', nodeIds: ['c10_evs_001', 'c10_evs_002', 'c10_evs_003', 'c10_evs_004', 'c10_evs_005', 'c10_evs_006', 'c10_evs_007', 'c10_evs_008', 'c10_evs_009', 'c10_evs_010'], subject: 'evs', classLevel: 10, component: Sim0296 },
  { id: 'c10_evsroleindustriesinstitutions', name: 'EVSRole Industries Institutions', emoji: '🌱', color: '#84CC16', nodeIds: ['c10_evs_011', 'c10_evs_012', 'c10_evs_013', 'c10_evs_014', 'c10_evs_015', 'c10_evs_016', 'c10_evs_017', 'c10_evs_018', 'c10_evs_019', 'c10_evs_020', 'c10_evs_021'], subject: 'evs', classLevel: 10, component: Sim0297 },
  { id: 'c10_geographyenergyresourcesconven', name: 'Geography Energy Resources Conventional', emoji: '🌍', color: '#FBBF24', nodeIds: ['c10_geo_011', 'c10_geo_012', 'c10_geo_013', 'c10_geo_014', 'c10_geo_015', 'c10_geo_016', 'c10_geo_017', 'c10_geo_018', 'c10_geo_019', 'c10_geo_020', 'c10_geo_021'], subject: 'geography', classLevel: 10, component: Sim0298 },
  { id: 'c10_geographytopographicalmapsinte', name: 'Geography Topographical Maps Interpretation', emoji: '🌍', color: '#FBBF24', nodeIds: ['c10_geo_001', 'c10_geo_002', 'c10_geo_003', 'c10_geo_004', 'c10_geo_005', 'c10_geo_006', 'c10_geo_007', 'c10_geo_008', 'c10_geo_009', 'c10_geo_010'], subject: 'geography', classLevel: 10, component: Sim0299 },
  { id: 'c10_historycivicsadalatsmeaningadv', name: 'History Civics Adalats Meaning Advantages', emoji: '📜', color: '#A78BFA', nodeIds: ['c10_histciv_021', 'c10_histciv_022', 'c10_histciv_023', 'c10_histciv_024', 'c10_histciv_025', 'c10_histciv_026', 'c10_histciv_027', 'c10_histciv_028', 'c10_histciv_029', 'c10_histciv_030'], subject: 'history_civics', classLevel: 10, component: Sim0300 },
  { id: 'c10_historycivicsmeaningfederalset', name: 'History Civics Meaning Federal Setup', emoji: '📜', color: '#A78BFA', nodeIds: ['c10_histciv_001', 'c10_histciv_002', 'c10_histciv_003', 'c10_histciv_004', 'c10_histciv_005', 'c10_histciv_006', 'c10_histciv_007', 'c10_histciv_008', 'c10_histciv_009', 'c10_histciv_010'], subject: 'history_civics', classLevel: 10, component: Sim0301 },
  { id: 'c10_historycivicsnoncooperationpro', name: 'History Civics Noncooperation Programme Chauri', emoji: '📜', color: '#A78BFA', nodeIds: ['c10_histciv_031', 'c10_histciv_032', 'c10_histciv_033', 'c10_histciv_034', 'c10_histciv_035', 'c10_histciv_036', 'c10_histciv_037', 'c10_histciv_038', 'c10_histciv_039', 'c10_histciv_040'], subject: 'history_civics', classLevel: 10, component: Sim0302 },
  { id: 'c10_historycivicspresidentexecutiv', name: 'History Civics President Executive Legislative', emoji: '📜', color: '#A78BFA', nodeIds: ['c10_histciv_011', 'c10_histciv_012', 'c10_histciv_013', 'c10_histciv_014', 'c10_histciv_015', 'c10_histciv_016', 'c10_histciv_017', 'c10_histciv_018', 'c10_histciv_019', 'c10_histciv_020'], subject: 'history_civics', classLevel: 10, component: Sim0303 },
  { id: 'c10_historycivicsrisedictatorships', name: 'History Civics Rise Dictatorships Causes', emoji: '📜', color: '#A78BFA', nodeIds: ['c10_histciv_041', 'c10_histciv_042', 'c10_histciv_043', 'c10_histciv_044', 'c10_histciv_045', 'c10_histciv_046', 'c10_histciv_047', 'c10_histciv_048'], subject: 'history_civics', classLevel: 10, component: Sim0304 },
  { id: 'c10_mathematicscoordinategeometry', name: 'Mathematics Coordinate Geometry', emoji: '📚', color: '#64748B', nodeIds: ['c10_math_extra_001'], subject: 'mathematicscoordinategeometr', classLevel: 10, component: Sim0305 },
  { id: 'c10_mathematicsintroductiontotrigo', name: 'Mathematics Introduction To Trigonometry', emoji: '📚', color: '#64748B', nodeIds: ['c10_math_extra_001'], subject: 'mathematicsintroductiontotrigonometr', classLevel: 10, component: Sim0306 },
  { id: 'c10_mathematicsprobability', name: 'Mathematics Probability', emoji: '📚', color: '#64748B', nodeIds: ['c10_math_extra_001'], subject: 'mathematicsprobabilit', classLevel: 10, component: Sim0307 },
  { id: 'c10_mathematicsrealnumbers', name: 'Mathematics Real Numbers', emoji: '📚', color: '#64748B', nodeIds: ['c10_math_extra_001'], subject: 'mathematicsrealnumber', classLevel: 10, component: Sim0308 },
  { id: 'c10_mathematicssomeapplicationsoft', name: 'Mathematics Some Applications Of Trigonometry', emoji: '📚', color: '#64748B', nodeIds: ['c10_math_extra_001'], subject: 'mathematicssomeapplicationsoftrigonometr', classLevel: 10, component: Sim0309 },
  { id: 'c10_mathematicsstatistics', name: 'Mathematics Statistics', emoji: '📚', color: '#64748B', nodeIds: ['c10_math_extra_001'], subject: 'mathematicsstatistic', classLevel: 10, component: Sim0310 },
  { id: 'c10_mathematicssurfaceareasandvolu', name: 'Mathematics Surface Areas And Volumes', emoji: '📚', color: '#64748B', nodeIds: ['c10_math_extra_001'], subject: 'mathematicssurfaceareasandvolume', classLevel: 10, component: Sim0311 },
  { id: 'c10_mathematicstriangles', name: 'Mathematics Triangles', emoji: '📚', color: '#64748B', nodeIds: ['c10_math_extra_001'], subject: 'mathematicstriangle', classLevel: 10, component: Sim0312 },
  { id: 'c10_appliedmathslogicreasoningprop', name: 'Applied Maths Logic Reasoning Propositions', emoji: '📐', color: '#3B82F6', nodeIds: ['c10_appmath_069'], subject: 'maths', classLevel: 10, component: Sim0313 },
  { id: 'c10_mathematicscomputationbasiccos', name: 'Mathematics Computation Basiccost Price', emoji: '📐', color: '#3B82F6', nodeIds: ['c10_math_001', 'c10_math_002', 'c10_math_003', 'c10_math_004', 'c10_math_005', 'c10_math_006', 'c10_math_007', 'c10_math_008', 'c10_math_009', 'c10_math_010'], subject: 'maths', classLevel: 10, component: Sim0314 },
  { id: 'c10_mathematicsconditionsparallelp', name: 'Mathematics Conditions Parallel Perpendicular', emoji: '📐', color: '#3B82F6', nodeIds: ['c10_math_041', 'c10_math_042', 'c10_math_043', 'c10_math_044', 'c10_math_045', 'c10_math_046', 'c10_math_047', 'c10_math_048', 'c10_math_049', 'c10_math_050'], subject: 'maths', classLevel: 10, component: Sim0315 },
  { id: 'c10_mathematicsconstructiontangent', name: 'Mathematics Construction Tangents Circle', emoji: '📐', color: '#3B82F6', nodeIds: ['c10_math_061', 'c10_math_062', 'c10_math_063', 'c10_math_064', 'c10_math_065', 'c10_math_066', 'c10_math_067', 'c10_math_068', 'c10_math_069', 'c10_math_070'], subject: 'maths', classLevel: 10, component: Sim0316 },
  { id: 'c10_mathematicsfactorisingpolynomi', name: 'Mathematics Factorising Polynomial Completely', emoji: '📐', color: '#3B82F6', nodeIds: ['c10_math_021', 'c10_math_022', 'c10_math_023', 'c10_math_024', 'c10_math_025', 'c10_math_026', 'c10_math_027', 'c10_math_028', 'c10_math_029', 'c10_math_030'], subject: 'maths', classLevel: 10, component: Sim0317 },
  { id: 'c10_mathematicsgeometricprogressio', name: 'Mathematics Geometric Progression First', emoji: '📐', color: '#3B82F6', nodeIds: ['c10_math_031', 'c10_math_032', 'c10_math_033', 'c10_math_034', 'c10_math_035', 'c10_math_036', 'c10_math_037', 'c10_math_038', 'c10_math_039', 'c10_math_040'], subject: 'maths', classLevel: 10, component: Sim0318 },
  { id: 'c10_mathematicslocusequidistantfro', name: 'Mathematics Locus Equidistant From', emoji: '📐', color: '#3B82F6', nodeIds: ['c10_math_051', 'c10_math_052', 'c10_math_053', 'c10_math_054', 'c10_math_055', 'c10_math_056', 'c10_math_057', 'c10_math_058', 'c10_math_059', 'c10_math_060'], subject: 'maths', classLevel: 10, component: Sim0319 },
  { id: 'c10_mathematicsquadraticequationsi', name: 'Mathematics Quadratic Equations Introduction', emoji: '📐', color: '#3B82F6', nodeIds: ['c10_math_011', 'c10_math_012', 'c10_math_013', 'c10_math_014', 'c10_math_015', 'c10_math_016', 'c10_math_017', 'c10_math_018', 'c10_math_019', 'c10_math_020'], subject: 'maths', classLevel: 10, component: Sim0320 },
  { id: 'c10_mathematicstrigonometricidenti', name: 'Mathematics Trigonometric Identitiessin2a', emoji: '📐', color: '#3B82F6', nodeIds: ['c10_math_071', 'c10_math_072', 'c10_math_073', 'c10_math_074', 'c10_math_075', 'c10_math_076', 'c10_math_077', 'c10_math_078', 'c10_math_079', 'c10_math_080'], subject: 'maths', classLevel: 10, component: Sim0321 },
  { id: 'c10_physicsefficiencymachineseta', name: 'Physics Efficiency Machineseta', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c10_phy_011', 'c10_phy_012', 'c10_phy_013', 'c10_phy_014', 'c10_phy_015', 'c10_phy_016', 'c10_phy_017', 'c10_phy_018', 'c10_phy_019', 'c10_phy_020'], subject: 'physics', classLevel: 10, component: Sim0322 },
  { id: 'c10_physicshousewiringpower', name: 'Physics House Wiring Power', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c10_phy_031', 'c10_phy_032', 'c10_phy_033', 'c10_phy_034', 'c10_phy_035', 'c10_phy_036', 'c10_phy_037', 'c10_phy_038', 'c10_phy_039', 'c10_phy_040', 'c10_phy_041', 'c10_phy_042'], subject: 'physics', classLevel: 10, component: Sim0323 },
  { id: 'c10_physicsscatteringlight', name: 'Physics Scattering Light', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c10_phy_021', 'c10_phy_022', 'c10_phy_023', 'c10_phy_024', 'c10_phy_025', 'c10_phy_026', 'c10_phy_027', 'c10_phy_028', 'c10_phy_029', 'c10_phy_030'], subject: 'physics', classLevel: 10, component: Sim0324 },
  { id: 'c10_physicsturningeffectforce', name: 'Physics Turning Effect Force', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c10_phy_001', 'c10_phy_002', 'c10_phy_003', 'c10_phy_004', 'c10_phy_005', 'c10_phy_006', 'c10_phy_007', 'c10_phy_008', 'c10_phy_009', 'c10_phy_010'], subject: 'physics', classLevel: 10, component: Sim0325 },
  { id: 'c10_scienceacidsbasesandsalts', name: 'Science Acids Bases And Salts', emoji: '📚', color: '#64748B', nodeIds: ['c10_scie_extra_001'], subject: 'scienceacidsbasesandsalt', classLevel: 10, component: Sim0326 },
  { id: 'c10_sciencechemicalreactionsandequ', name: 'Science Chemical Reactions And Equations', emoji: '📚', color: '#64748B', nodeIds: ['c10_scie_extra_001'], subject: 'sciencechemicalreactionsandequation', classLevel: 10, component: Sim0327 },
  { id: 'c10_sciencecontrolandcoordination', name: 'Science Control And Coordination', emoji: '📚', color: '#64748B', nodeIds: ['c10_scie_extra_001'], subject: 'sciencecontrolandcoordinatio', classLevel: 10, component: Sim0328 },
  { id: 'c10_scienceelectricity', name: 'Science Electricity', emoji: '📚', color: '#64748B', nodeIds: ['c10_scie_extra_001'], subject: 'scienceelectricit', classLevel: 10, component: Sim0329 },
  { id: 'c10_scienceheredity', name: 'Science Heredity', emoji: '📚', color: '#64748B', nodeIds: ['c10_scie_extra_001'], subject: 'scienceheredit', classLevel: 10, component: Sim0330 },
  { id: 'c10_sciencehowdoorganismsreproduce', name: 'Science How Do Organisms Reproduce', emoji: '📚', color: '#64748B', nodeIds: ['c10_scie_extra_001'], subject: 'sciencehowdoorganismsreproduc', classLevel: 10, component: Sim0331 },
  { id: 'c10_sciencelifeprocesses', name: 'Science Life Processes', emoji: '📚', color: '#64748B', nodeIds: ['c10_scie_extra_001'], subject: 'sciencelifeprocesse', classLevel: 10, component: Sim0332 },
  { id: 'c10_sciencemagneticeffectsofelectr', name: 'Science Magnetic Effects Of Electric Current', emoji: '📚', color: '#64748B', nodeIds: ['c10_scie_extra_001'], subject: 'sciencemagneticeffectsofelectriccurren', classLevel: 10, component: Sim0333 },
  { id: 'c10_sciencemetalsandnonmetals', name: 'Science Metals And Non Metals', emoji: '📚', color: '#64748B', nodeIds: ['c10_scie_extra_001'], subject: 'sciencemetalsandnonmetal', classLevel: 10, component: Sim0334 },
  { id: 'c10_scienceourenvironment', name: 'Science Our Environment', emoji: '📚', color: '#64748B', nodeIds: ['c10_scie_extra_001'], subject: 'scienceourenvironmen', classLevel: 10, component: Sim0335 },
  { id: 'c10_sciencethehumaneyeandthe', name: 'Science The Human Eye And The', emoji: '📚', color: '#64748B', nodeIds: ['c10_scie_extra_001'], subject: 'sciencethehumaneyeandth', classLevel: 10, component: Sim0336 },
  { id: 'c10_socialscienceoutcomesofdemocra', name: 'Social Science Outcomes Of Democracy', emoji: '📚', color: '#64748B', nodeIds: ['c10_soci_extra_001'], subject: 'socialscienceoutcomesofdemocrac', classLevel: 10, component: Sim0337 },
  { id: 'c11_accountancyaccountingstandards', name: 'Accountancy Accounting Standards Meaning', emoji: '💰', color: '#059669', nodeIds: ['c11_acc_011', 'c11_acc_012', 'c11_acc_013', 'c11_acc_014', 'c11_acc_015', 'c11_acc_016', 'c11_acc_017', 'c11_acc_018', 'c11_acc_019', 'c11_acc_020'], subject: 'accountancy', classLevel: 11, component: Sim0338 },
  { id: 'c11_accountancybackgroundhistoryty', name: 'Accountancy Background History Types', emoji: '💰', color: '#059669', nodeIds: ['c11_acc_001', 'c11_acc_002', 'c11_acc_003', 'c11_acc_004', 'c11_acc_005', 'c11_acc_006', 'c11_acc_007', 'c11_acc_008', 'c11_acc_009', 'c11_acc_010'], subject: 'accountancy', classLevel: 11, component: Sim0339 },
  { id: 'c11_accountancybasictermsdrawer', name: 'Accountancy Basic Terms Drawer', emoji: '💰', color: '#059669', nodeIds: ['c11_acc_041', 'c11_acc_042', 'c11_acc_043', 'c11_acc_044', 'c11_acc_045', 'c11_acc_046', 'c11_acc_047', 'c11_acc_048', 'c11_acc_049', 'c11_acc_050'], subject: 'accountancy', classLevel: 11, component: Sim0340 },
  { id: 'c11_accountancycapitalisationentra', name: 'Accountancy Capitalisation Entrance Admission', emoji: '💰', color: '#059669', nodeIds: ['c11_acc_071', 'c11_acc_072', 'c11_acc_073', 'c11_acc_074'], subject: 'accountancy', classLevel: 11, component: Sim0341 },
  { id: 'c11_accountancycashbooksimple', name: 'Accountancy Cash Book Simple', emoji: '💰', color: '#059669', nodeIds: ['c11_acc_021', 'c11_acc_022', 'c11_acc_023', 'c11_acc_024', 'c11_acc_025', 'c11_acc_026', 'c11_acc_027', 'c11_acc_028', 'c11_acc_029', 'c11_acc_030'], subject: 'accountancy', classLevel: 11, component: Sim0342 },
  { id: 'c11_accountancyfromextractboth', name: 'Accountancy From Extract Both', emoji: '💰', color: '#059669', nodeIds: ['c11_acc_031', 'c11_acc_032', 'c11_acc_033', 'c11_acc_034', 'c11_acc_035', 'c11_acc_036', 'c11_acc_037', 'c11_acc_038', 'c11_acc_039', 'c11_acc_040'], subject: 'accountancy', classLevel: 11, component: Sim0343 },
  { id: 'c11_accountancytradingaccountmeani', name: 'Accountancy Trading Account Meaning', emoji: '💰', color: '#059669', nodeIds: ['c11_acc_051', 'c11_acc_052', 'c11_acc_053', 'c11_acc_054', 'c11_acc_055', 'c11_acc_056', 'c11_acc_057', 'c11_acc_058', 'c11_acc_059', 'c11_acc_060'], subject: 'accountancy', classLevel: 11, component: Sim0344 },
  { id: 'c11_accountancytypeserrorsomission', name: 'Accountancy Types Errors Omission', emoji: '💰', color: '#059669', nodeIds: ['c11_acc_061', 'c11_acc_062', 'c11_acc_063', 'c11_acc_064', 'c11_acc_065', 'c11_acc_066', 'c11_acc_067', 'c11_acc_068', 'c11_acc_069', 'c11_acc_070'], subject: 'accountancy', classLevel: 11, component: Sim0345 },
  { id: 'c11_biologyanimalkingdomorganizati', name: 'Biology Animal Kingdom Organization', emoji: '🧬', color: '#22C55E', nodeIds: ['c11_bio_011', 'c11_bio_012', 'c11_bio_013', 'c11_bio_014', 'c11_bio_015', 'c11_bio_016', 'c11_bio_017', 'c11_bio_018', 'c11_bio_019', 'c11_bio_020'], subject: 'biology', classLevel: 11, component: Sim0346 },
  { id: 'c11_biologycellwallplasmodesmata', name: 'Biology Cell Wall Plasmodesmata', emoji: '🧬', color: '#22C55E', nodeIds: ['c11_bio_021', 'c11_bio_022', 'c11_bio_023', 'c11_bio_024', 'c11_bio_025', 'c11_bio_026', 'c11_bio_027', 'c11_bio_028', 'c11_bio_029', 'c11_bio_030'], subject: 'biology', classLevel: 11, component: Sim0347 },
  { id: 'c11_biologycirculatorydisorders', name: 'Biology Circulatory Disorders', emoji: '🧬', color: '#22C55E', nodeIds: ['c11_bio_051', 'c11_bio_052', 'c11_bio_053', 'c11_bio_054', 'c11_bio_055', 'c11_bio_056', 'c11_bio_057', 'c11_bio_058', 'c11_bio_059', 'c11_bio_060'], subject: 'biology', classLevel: 11, component: Sim0348 },
  { id: 'c11_biologyelectrontransportsystem', name: 'Biology Electron Transport System', emoji: '🧬', color: '#22C55E', nodeIds: ['c11_bio_041', 'c11_bio_042', 'c11_bio_043', 'c11_bio_044', 'c11_bio_045', 'c11_bio_046', 'c11_bio_047', 'c11_bio_048', 'c11_bio_049', 'c11_bio_050'], subject: 'biology', classLevel: 11, component: Sim0349 },
  { id: 'c11_biologyendocrineglandstheir', name: 'Biology Endocrine Glands Their', emoji: '🧬', color: '#22C55E', nodeIds: ['c11_bio_061', 'c11_bio_062', 'c11_bio_063', 'c11_bio_064', 'c11_bio_065', 'c11_bio_066', 'c11_bio_067', 'c11_bio_068', 'c11_bio_069', 'c11_bio_070'], subject: 'biology', classLevel: 11, component: Sim0350 },
  { id: 'c11_biologymitosisdetailedstages', name: 'Biology Mitosisdetailed Stages', emoji: '🧬', color: '#22C55E', nodeIds: ['c11_bio_031', 'c11_bio_032', 'c11_bio_033', 'c11_bio_034', 'c11_bio_035', 'c11_bio_036', 'c11_bio_037', 'c11_bio_038', 'c11_bio_039', 'c11_bio_040'], subject: 'biology', classLevel: 11, component: Sim0351 },
  { id: 'c11_biologytaxonomyclassifications', name: 'Biology Taxonomy Classificationspecies', emoji: '🧬', color: '#22C55E', nodeIds: ['c11_bio_001', 'c11_bio_002', 'c11_bio_003', 'c11_bio_004', 'c11_bio_005', 'c11_bio_006', 'c11_bio_007', 'c11_bio_008', 'c11_bio_009', 'c11_bio_010'], subject: 'biology', classLevel: 11, component: Sim0352 },
  { id: 'c11_biotechnologybiotechnologydefi', name: 'Biotechnology Biotechnology Definitionoecd', emoji: '🧬', color: '#22C55E', nodeIds: ['c11_biotech_001', 'c11_biotech_002', 'c11_biotech_003', 'c11_biotech_004', 'c11_biotech_005', 'c11_biotech_006', 'c11_biotech_007', 'c11_biotech_008', 'c11_biotech_009', 'c11_biotech_010'], subject: 'biology', classLevel: 11, component: Sim0353 },
  { id: 'c11_biotechnologychromatographyexc', name: 'Biotechnology Chromatography Exchange Paper', emoji: '🧬', color: '#22C55E', nodeIds: ['c11_biotech_031', 'c11_biotech_032', 'c11_biotech_033', 'c11_biotech_034', 'c11_biotech_035', 'c11_biotech_036', 'c11_biotech_037', 'c11_biotech_038', 'c11_biotech_039', 'c11_biotech_040'], subject: 'biology', classLevel: 11, component: Sim0354 },
  { id: 'c11_biotechnologylowrybronstedtheo', name: 'Biotechnology Lowrybronsted Theory Acid', emoji: '🧬', color: '#22C55E', nodeIds: ['c11_biotech_011', 'c11_biotech_012', 'c11_biotech_013', 'c11_biotech_014', 'c11_biotech_015', 'c11_biotech_016', 'c11_biotech_017', 'c11_biotech_018', 'c11_biotech_019', 'c11_biotech_020'], subject: 'biology', classLevel: 11, component: Sim0355 },
  { id: 'c11_biotechnologymendelsexperiment', name: 'Biotechnology Mendels Experiments Laws', emoji: '🧬', color: '#22C55E', nodeIds: ['c11_biotech_041', 'c11_biotech_042', 'c11_biotech_043', 'c11_biotech_044', 'c11_biotech_045', 'c11_biotech_046', 'c11_biotech_047', 'c11_biotech_048', 'c11_biotech_049', 'c11_biotech_050'], subject: 'biology', classLevel: 11, component: Sim0356 },
  { id: 'c11_biotechnologynutrientmediawhit', name: 'Biotechnology Nutrient Media White', emoji: '🧬', color: '#22C55E', nodeIds: ['c11_biotech_051', 'c11_biotech_052', 'c11_biotech_053', 'c11_biotech_054', 'c11_biotech_055'], subject: 'biology', classLevel: 11, component: Sim0357 },
  { id: 'c11_biotechnologysignificancemitos', name: 'Biotechnology Significance Mitosis Meiosis', emoji: '🧬', color: '#22C55E', nodeIds: ['c11_biotech_021', 'c11_biotech_022', 'c11_biotech_023', 'c11_biotech_024', 'c11_biotech_025', 'c11_biotech_026', 'c11_biotech_027', 'c11_biotech_028', 'c11_biotech_029', 'c11_biotech_030'], subject: 'biology', classLevel: 11, component: Sim0358 },
  { id: 'c11_biologybodyfluidsandcirculatio', name: 'Biology Body Fluids And Circulation', emoji: '📚', color: '#64748B', nodeIds: ['c11_biol_extra_001'], subject: 'biologybodyfluidsandcirculatio', classLevel: 11, component: Sim0359 },
  { id: 'c11_biologyexcretorynephron', name: 'Biology Excretory Nephron', emoji: '📚', color: '#64748B', nodeIds: ['c11_biol_extra_001'], subject: 'biologyexcretorynephro', classLevel: 11, component: Sim0360 },
  { id: 'c11_biologylocomotionandmovement', name: 'Biology Locomotion And Movement', emoji: '📚', color: '#64748B', nodeIds: ['c11_biol_extra_001'], subject: 'biologylocomotionandmovemen', classLevel: 11, component: Sim0361 },
  { id: 'c11_biologyneuralcontrolandcoordin', name: 'Biology Neural Control And Coordination', emoji: '📚', color: '#64748B', nodeIds: ['c11_biol_extra_001'], subject: 'biologyneuralcontrolandcoordinatio', classLevel: 11, component: Sim0362 },
  { id: 'c11_biologyplantgrowthcbse', name: 'Biology Plant Growth CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_biol_xc6__001'], subject: 'biologyplantgrowthcbs', classLevel: 11, component: Sim0363 },
  { id: 'c11_biotechbioinformaticscbse', name: 'Biotech Bioinformatics CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_biot_xc6__001'], subject: 'biotechbioinformaticscbs', classLevel: 11, component: Sim0364 },
  { id: 'c11_biotechbiomoleculescbse', name: 'Biotech Biomolecules CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_biot_xc6__001'], subject: 'biotechbiomoleculescbs', classLevel: 11, component: Sim0365 },
  { id: 'c11_biotechenzymesbioenergeticscbs', name: 'Biotech Enzymes Bioenergetics CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_biot_xc6__001'], subject: 'biotechenzymesbioenergeticscbs', classLevel: 11, component: Sim0366 },
  { id: 'c11_biotechgeneticdisorderscbse', name: 'Biotech Genetic Disorders CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_biot_xc6__001'], subject: 'biotechgeneticdisorderscbs', classLevel: 11, component: Sim0367 },
  { id: 'c11_biotechintroductioncbse', name: 'Biotech Introduction CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_biot_xc6__001'], subject: 'biotechintroductioncbs', classLevel: 11, component: Sim0368 },
  { id: 'c11_biotechnologybasicprocesses', name: 'Biotechnology Basic Processes', emoji: '📚', color: '#64748B', nodeIds: ['c11_biot_extra_001'], subject: 'biotechnologybasicprocesse', classLevel: 11, component: Sim0369 },
  { id: 'c11_biotechnologybioreactorgrowth', name: 'Biotechnology Bioreactor Growth', emoji: '📚', color: '#64748B', nodeIds: ['c11_biot_extra_001'], subject: 'biotechnologybioreactorgrowt', classLevel: 11, component: Sim0370 },
  { id: 'c11_biotechproteininformaticscbse', name: 'Biotech Protein Informatics CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_biot_xc6__001'], subject: 'biotechproteininformaticscbs', classLevel: 11, component: Sim0371 },
  { id: 'c11_biotechtoolstechniquescbse', name: 'Biotech Tools Techniques CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_biot_xc6__001'], subject: 'biotechtoolstechniquescbs', classLevel: 11, component: Sim0372 },
  { id: 'c11_businessstudiesebankingonlines', name: 'Business Studies Ebanking Online Services', emoji: '🏢', color: '#475569', nodeIds: ['c11_bs_021', 'c11_bs_022', 'c11_bs_023', 'c11_bs_024', 'c11_bs_025', 'c11_bs_026', 'c11_bs_027', 'c11_bs_028', 'c11_bs_029', 'c11_bs_030'], subject: 'business_studies', classLevel: 11, component: Sim0373 },
  { id: 'c11_businessstudiesinsurancemeanin', name: 'Business Studies Insurance Meaning Features', emoji: '🏢', color: '#475569', nodeIds: ['c11_bs_031', 'c11_bs_032', 'c11_bs_033', 'c11_bs_034', 'c11_bs_035'], subject: 'business_studies', classLevel: 11, component: Sim0374 },
  { id: 'c11_businessstudiesmeaningfeatures', name: 'Business Studies Meaning Features Business', emoji: '🏢', color: '#475569', nodeIds: ['c11_bs_001', 'c11_bs_002', 'c11_bs_003', 'c11_bs_004', 'c11_bs_005', 'c11_bs_006', 'c11_bs_007', 'c11_bs_008', 'c11_bs_009', 'c11_bs_010'], subject: 'business_studies', classLevel: 11, component: Sim0375 },
  { id: 'c11_businessstudiespublicprivateco', name: 'Business Studies Public Private Companies', emoji: '🏢', color: '#475569', nodeIds: ['c11_bs_011', 'c11_bs_012', 'c11_bs_013', 'c11_bs_014', 'c11_bs_015', 'c11_bs_016', 'c11_bs_017', 'c11_bs_018', 'c11_bs_019', 'c11_bs_020'], subject: 'business_studies', classLevel: 11, component: Sim0376 },
  { id: 'c11_chemistryalkenespreparationand', name: 'Chemistry Alkenespreparationandstructure', emoji: '📚', color: '#64748B', nodeIds: ['c11_chem_extra_001'], subject: 'chemistryalkenespreparationandstructur', classLevel: 11, component: Sim0377 },
  { id: 'c11_chemistryaufbaupauliandhundsru', name: 'Chemistry Aufbau Pauliand Hundsrules', emoji: '📚', color: '#64748B', nodeIds: ['c11_chem_extra_001'], subject: 'chemistryaufbaupauliandhundsrule', classLevel: 11, component: Sim0378 },
  { id: 'c11_chemistrychemicalequilibriumdy', name: 'Chemistry Chemicalequilibriumdynamicnature', emoji: '📚', color: '#64748B', nodeIds: ['c11_chem_extra_001'], subject: 'chemistrychemicalequilibriumdynamicnatur', classLevel: 11, component: Sim0379 },
  { id: 'c11_chemistryclassificationofeleme', name: 'Chemistry Classification Of Elements And Periodici', emoji: '📚', color: '#64748B', nodeIds: ['c11_chem_extra_001'], subject: 'chemistryclassificationofelementsandperiodicit', classLevel: 11, component: Sim0380 },
  { id: 'c11_chemistrydiscoveryofsubatomicp', name: 'Chemistry Discoveryofsubatomicparticles', emoji: '📚', color: '#64748B', nodeIds: ['c11_chem_extra_001'], subject: 'chemistrydiscoveryofsubatomicparticle', classLevel: 11, component: Sim0381 },
  { id: 'c11_chemistryfriedelcraftsalkylati', name: 'Chemistry Friedel Craftsalkylationandacylation', emoji: '📚', color: '#64748B', nodeIds: ['c11_chem_extra_001'], subject: 'chemistryfriedelcraftsalkylationandacylatio', classLevel: 11, component: Sim0382 },
  { id: 'c11_chemistryhydrocarbons', name: 'Chemistry Hydrocarbons', emoji: '📚', color: '#64748B', nodeIds: ['c11_chem_extra_001'], subject: 'chemistryhydrocarbon', classLevel: 11, component: Sim0383 },
  { id: 'c11_chemistryhydrogenbonding', name: 'Chemistry Hydrogenbonding', emoji: '📚', color: '#64748B', nodeIds: ['c11_chem_extra_001'], subject: 'chemistryhydrogenbondin', classLevel: 11, component: Sim0384 },
  { id: 'c11_chemistryimportanceandscopeofc', name: 'Chemistry Importanceandscopeofchemistry', emoji: '📚', color: '#64748B', nodeIds: ['c11_chem_extra_001'], subject: 'chemistryimportanceandscopeofchemistr', classLevel: 11, component: Sim0385 },
  { id: 'c11_chemistrykossellewisapproachto', name: 'Chemistry Kossel Lewisapproachtobonding', emoji: '📚', color: '#64748B', nodeIds: ['c11_chem_extra_001'], subject: 'chemistrykossellewisapproachtobondin', classLevel: 11, component: Sim0386 },
  { id: 'c11_chemistryorganicchemistrybasic', name: 'Chemistry Organic Chemistry Basic Princ Part1CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_chem_extra_001'], subject: 'chemistryorganicchemistrybasicprincpart', classLevel: 11, component: Sim0387 },
  { id: 'c11_chemistryorganicchemistrybasic', name: 'Chemistry Organic Chemistry Basic Princ Part2CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_chem_extra_002'], subject: 'chemistryorganicchemistrybasicprincpart', classLevel: 11, component: Sim0388 },
  { id: 'c11_chemistryquantitativeanalysis', name: 'Chemistry Quantitativeanalysis', emoji: '📚', color: '#64748B', nodeIds: ['c11_chem_extra_001'], subject: 'chemistryquantitativeanalysi', classLevel: 11, component: Sim0389 },
  { id: 'c11_chemistryredoxreactionscbse', name: 'Chemistry Redox Reactions CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_chem_extra_001'], subject: 'chemistryredoxreactionscbs', classLevel: 11, component: Sim0390 },
  { id: 'c11_chemistrysolubilityproduct', name: 'Chemistry Solubilityproduct', emoji: '📚', color: '#64748B', nodeIds: ['c11_chem_extra_001'], subject: 'chemistrysolubilityproduc', classLevel: 11, component: Sim0391 },
  { id: 'c11_chemistrysomebasicconceptsofch', name: 'Chemistry Some Basic Conceptsof Chemistry CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_chem_extra_001'], subject: 'chemistrysomebasicconceptsofchemistrycbs', classLevel: 11, component: Sim0392 },
  { id: 'c11_chemistrystructureofatom', name: 'Chemistry Structure Of Atom', emoji: '📚', color: '#64748B', nodeIds: ['c11_chem_extra_001'], subject: 'chemistrystructureofato', classLevel: 11, component: Sim0393 },
  { id: 'c11_chemistrythermodynamicscbse', name: 'Chemistry Thermodynamics CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_chem_extra_001'], subject: 'chemistrythermodynamicscbs', classLevel: 11, component: Sim0394 },
  { id: 'c11_commerceclassificationhumanact', name: 'Commerce Classification Human Activities', emoji: '💼', color: '#8B5CF6', nodeIds: ['c11_comm_001', 'c11_comm_002', 'c11_comm_003', 'c11_comm_004', 'c11_comm_005', 'c11_comm_006', 'c11_comm_007', 'c11_comm_008', 'c11_comm_009', 'c11_comm_010'], subject: 'commerce', classLevel: 11, component: Sim0395 },
  { id: 'c11_commercecooperativeorganisatio', name: 'Commerce Cooperative Organisations Meaning', emoji: '💼', color: '#8B5CF6', nodeIds: ['c11_comm_021', 'c11_comm_022', 'c11_comm_023', 'c11_comm_024', 'c11_comm_025', 'c11_comm_026', 'c11_comm_027', 'c11_comm_028', 'c11_comm_029', 'c11_comm_030'], subject: 'commerce', classLevel: 11, component: Sim0396 },
  { id: 'c11_commerceexportdocumentsdocumen', name: 'Commerce Export Documents Documentary', emoji: '💼', color: '#8B5CF6', nodeIds: ['c11_comm_051', 'c11_comm_052', 'c11_comm_053', 'c11_comm_054', 'c11_comm_055', 'c11_comm_056', 'c11_comm_057', 'c11_comm_058', 'c11_comm_059', 'c11_comm_060'], subject: 'commerce', classLevel: 11, component: Sim0397 },
  { id: 'c11_commercepartnershipmeaningfeat', name: 'Commerce Partnership Meaning Features', emoji: '💼', color: '#8B5CF6', nodeIds: ['c11_comm_011', 'c11_comm_012', 'c11_comm_013', 'c11_comm_014', 'c11_comm_015', 'c11_comm_016', 'c11_comm_017', 'c11_comm_018', 'c11_comm_019', 'c11_comm_020'], subject: 'commerce', classLevel: 11, component: Sim0398 },
  { id: 'c11_commerceqcommercequickcommerce', name: 'Commerce Qcommercequick Commerce', emoji: '💼', color: '#8B5CF6', nodeIds: ['c11_comm_031', 'c11_comm_032', 'c11_comm_033', 'c11_comm_034', 'c11_comm_035', 'c11_comm_036', 'c11_comm_037', 'c11_comm_038', 'c11_comm_039', 'c11_comm_040'], subject: 'commerce', classLevel: 11, component: Sim0399 },
  { id: 'c11_commercetypesretailtrade', name: 'Commerce Types Retail Trade', emoji: '💼', color: '#8B5CF6', nodeIds: ['c11_comm_041', 'c11_comm_042', 'c11_comm_043', 'c11_comm_044', 'c11_comm_045', 'c11_comm_046', 'c11_comm_047', 'c11_comm_048', 'c11_comm_049', 'c11_comm_050'], subject: 'commerce', classLevel: 11, component: Sim0400 },
  { id: 'c11_computerscienceaddressingipv4i', name: 'Computer Science Addressing Ipv4Ipv6', emoji: '💻', color: '#6366F1', nodeIds: ['c11_cs_061', 'c11_cs_062', 'c11_cs_063', 'c11_cs_064', 'c11_cs_065', 'c11_cs_066', 'c11_cs_067', 'c11_cs_068', 'c11_cs_069', 'c11_cs_070'], subject: 'computer_science', classLevel: 11, component: Sim0401 },
  { id: 'c11_computersciencecomputerarchite', name: 'Computer Science Computer Architecture Neumann', emoji: '💻', color: '#6366F1', nodeIds: ['c11_cs_001', 'c11_cs_002', 'c11_cs_003', 'c11_cs_004', 'c11_cs_005', 'c11_cs_006', 'c11_cs_007', 'c11_cs_008', 'c11_cs_009', 'c11_cs_010'], subject: 'computer_science', classLevel: 11, component: Sim0402 },
  { id: 'c11_computersciencecreatealterdrop', name: 'Computer Science Create Alter Drop', emoji: '💻', color: '#6366F1', nodeIds: ['c11_cs_041', 'c11_cs_042', 'c11_cs_043', 'c11_cs_044', 'c11_cs_045', 'c11_cs_046', 'c11_cs_047', 'c11_cs_048', 'c11_cs_049', 'c11_cs_050'], subject: 'computer_science', classLevel: 11, component: Sim0403 },
  { id: 'c11_computersciencedatastructuresi', name: 'Computer Science Data Structures Introduction', emoji: '💻', color: '#6366F1', nodeIds: ['c11_cs_031', 'c11_cs_032', 'c11_cs_033', 'c11_cs_034', 'c11_cs_035', 'c11_cs_036', 'c11_cs_037', 'c11_cs_038', 'c11_cs_039', 'c11_cs_040'], subject: 'computer_science', classLevel: 11, component: Sim0404 },
  { id: 'c11_computerscienceexampreparation', name: 'Computer Science Exam Preparation Paper', emoji: '💻', color: '#6366F1', nodeIds: ['c11_cs_081', 'c11_cs_082', 'c11_cs_083', 'c11_cs_084', 'c11_cs_085'], subject: 'computer_science', classLevel: 11, component: Sim0405 },
  { id: 'c11_computersciencejavaarraysadvan', name: 'Computer Science Java Arrays Advanced', emoji: '💻', color: '#6366F1', nodeIds: ['c11_cs_021', 'c11_cs_022', 'c11_cs_023', 'c11_cs_024', 'c11_cs_025', 'c11_cs_026', 'c11_cs_027', 'c11_cs_028', 'c11_cs_029', 'c11_cs_030'], subject: 'computer_science', classLevel: 11, component: Sim0406 },
  { id: 'c11_computersciencejavaclassmember', name: 'Computer Science Java Class Member', emoji: '💻', color: '#6366F1', nodeIds: ['c11_cs_011', 'c11_cs_012', 'c11_cs_013', 'c11_cs_014', 'c11_cs_015', 'c11_cs_016', 'c11_cs_017', 'c11_cs_018', 'c11_cs_019', 'c11_cs_020'], subject: 'computer_science', classLevel: 11, component: Sim0407 },
  { id: 'c11_computersciencejavacomplexprog', name: 'Computer Science Java Complex Program', emoji: '💻', color: '#6366F1', nodeIds: ['c11_cs_051', 'c11_cs_052', 'c11_cs_053', 'c11_cs_054', 'c11_cs_055', 'c11_cs_056', 'c11_cs_057', 'c11_cs_058', 'c11_cs_059', 'c11_cs_060'], subject: 'computer_science', classLevel: 11, component: Sim0408 },
  { id: 'c11_computersciencejavaiteratorsli', name: 'Computer Science Java Iterators Listiterator', emoji: '💻', color: '#6366F1', nodeIds: ['c11_cs_071', 'c11_cs_072', 'c11_cs_073', 'c11_cs_074', 'c11_cs_075', 'c11_cs_076', 'c11_cs_077', 'c11_cs_078', 'c11_cs_079', 'c11_cs_080'], subject: 'computer_science', classLevel: 11, component: Sim0409 },
  { id: 'c11_computersciencefunctionscallst', name: 'Computer Science Functions Call Stack', emoji: '📚', color: '#64748B', nodeIds: ['c11_comp_extra_001'], subject: 'computersciencefunctionscallstac', classLevel: 11, component: Sim0410 },
  { id: 'c11_computersciencestringslicing', name: 'Computer Science String Slicing', emoji: '📚', color: '#64748B', nodeIds: ['c11_comp_extra_001'], subject: 'computersciencestringslicin', classLevel: 11, component: Sim0411 },
  { id: 'c11_ecohumancapitalcbse', name: 'Eco Human Capital CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_ecoh_xc6__001'], subject: 'ecohumancapitalcbs', classLevel: 11, component: Sim0412 },
  { id: 'c11_ecoindianeconomycbse', name: 'Eco Indian Economy CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_ecoi_xc6__001'], subject: 'ecoindianeconomycbs', classLevel: 11, component: Sim0413 },
  { id: 'c11_ecoliberalisationcbse', name: 'Eco Liberalisation CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_ecol_xc6__001'], subject: 'ecoliberalisationcbs', classLevel: 11, component: Sim0414 },
  { id: 'c11_economicsdefinitioneconomicsad', name: 'Economics Definition Economics Adam', emoji: '📊', color: '#F59E0B', nodeIds: ['c11_econ_001', 'c11_econ_002', 'c11_econ_003', 'c11_econ_004', 'c11_econ_005', 'c11_econ_006', 'c11_econ_007', 'c11_econ_008', 'c11_econ_009', 'c11_econ_010'], subject: 'economics', classLevel: 11, component: Sim0415 },
  { id: 'c11_economicshumanwantsclassificat', name: 'Economics Human Wants Classification', emoji: '📊', color: '#F59E0B', nodeIds: ['c11_econ_011', 'c11_econ_012', 'c11_econ_013', 'c11_econ_014', 'c11_econ_015', 'c11_econ_016', 'c11_econ_017', 'c11_econ_018', 'c11_econ_019', 'c11_econ_020'], subject: 'economics', classLevel: 11, component: Sim0416 },
  { id: 'c11_economicsmeasuresdispersiondef', name: 'Economics Measures Dispersion Definition', emoji: '📊', color: '#F59E0B', nodeIds: ['c11_econ_070', 'c11_econ_071', 'c11_econ_072', 'c11_econ_073', 'c11_econ_074', 'c11_econ_075', 'c11_econ_076', 'c11_econ_077', 'c11_econ_078', 'c11_econ_079', 'c11_econ_080'], subject: 'economics', classLevel: 11, component: Sim0417 },
  { id: 'c11_economicsplanningeconomicdevel', name: 'Economics Planning Economic Development', emoji: '📊', color: '#F59E0B', nodeIds: ['c11_econ_031', 'c11_econ_032', 'c11_econ_033', 'c11_econ_053', 'c11_econ_054', 'c11_econ_055', 'c11_econ_056', 'c11_econ_057', 'c11_econ_058', 'c11_econ_059'], subject: 'economics', classLevel: 11, component: Sim0418 },
  { id: 'c11_economicspresentationdatatabul', name: 'Economics Presentation Data Tabular', emoji: '📊', color: '#F59E0B', nodeIds: ['c11_econ_060', 'c11_econ_061', 'c11_econ_062', 'c11_econ_063', 'c11_econ_064', 'c11_econ_065', 'c11_econ_066', 'c11_econ_067', 'c11_econ_068', 'c11_econ_069'], subject: 'economics', classLevel: 11, component: Sim0419 },
  { id: 'c11_economicstypeseconomiessociali', name: 'Economics Types Economies Socialism', emoji: '📊', color: '#F59E0B', nodeIds: ['c11_econ_021', 'c11_econ_022', 'c11_econ_023', 'c11_econ_024', 'c11_econ_025', 'c11_econ_026', 'c11_econ_027', 'c11_econ_028', 'c11_econ_029', 'c11_econ_030'], subject: 'economics', classLevel: 11, component: Sim0420 },
  { id: 'c11_economicsayurvedahealth', name: 'Economics Ayurveda Health', emoji: '📚', color: '#64748B', nodeIds: ['c11_econ_extra_001'], subject: 'economicsayurvedahealt', classLevel: 11, component: Sim0421 },
  { id: 'c11_economicscomparativedevelopmen', name: 'Economics Comparative Development', emoji: '📚', color: '#64748B', nodeIds: ['c11_econ_extra_001'], subject: 'economicscomparativedevelopmen', classLevel: 11, component: Sim0422 },
  { id: 'c11_economicsemploymentgrowthinfor', name: 'Economics Employment Growth Informalisation', emoji: '📚', color: '#64748B', nodeIds: ['c11_econ_extra_001'], subject: 'economicsemploymentgrowthinformalisatio', classLevel: 11, component: Sim0423 },
  { id: 'c11_economicsemploymentinformalisa', name: 'Economics Employment Informalisation', emoji: '📚', color: '#64748B', nodeIds: ['c11_econ_extra_001'], subject: 'economicsemploymentinformalisatio', classLevel: 11, component: Sim0424 },
  { id: 'c11_economicsindianartarchitecture', name: 'Economics Indian Art Architecture', emoji: '📚', color: '#64748B', nodeIds: ['c11_econ_extra_001'], subject: 'economicsindianartarchitectur', classLevel: 11, component: Sim0425 },
  { id: 'c11_evsenvironmentalsciencescope', name: 'EVSEnvironmental Science Scope', emoji: '🌱', color: '#84CC16', nodeIds: ['c11_evs_001', 'c11_evs_002', 'c11_evs_003', 'c11_evs_004', 'c11_evs_005', 'c11_evs_006', 'c11_evs_007', 'c11_evs_008', 'c11_evs_009', 'c11_evs_010'], subject: 'evs', classLevel: 11, component: Sim0426 },
  { id: 'c11_evshabitatsnichesgauses', name: 'EVSHabitats Niches Gauses', emoji: '🌱', color: '#84CC16', nodeIds: ['c11_evs_011', 'c11_evs_012', 'c11_evs_013', 'c11_evs_014', 'c11_evs_015', 'c11_evs_016', 'c11_evs_017', 'c11_evs_018', 'c11_evs_019', 'c11_evs_020'], subject: 'evs', classLevel: 11, component: Sim0427 },
  { id: 'c11_evsinternationallegalregimes', name: 'EVSInternational Legal Regimes', emoji: '🌱', color: '#84CC16', nodeIds: ['c11_evs_021', 'c11_evs_022', 'c11_evs_023', 'c11_evs_024', 'c11_evs_025', 'c11_evs_026', 'c11_evs_027', 'c11_evs_028'], subject: 'evs', classLevel: 11, component: Sim0428 },
  { id: 'c11_geoclimatecbse', name: 'Geo Climate CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_geoc_xc6__001'], subject: 'geoclimatecbs', classLevel: 11, component: Sim0429 },
  { id: 'c11_geogeographydisciplinecbse', name: 'Geo Geography Discipline CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_geog_xc6__001'], subject: 'geogeographydisciplinecbs', classLevel: 11, component: Sim0430 },
  { id: 'c11_geogeomorphicprocessescbse', name: 'Geo Geomorphic Processes CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_geog_xc6__001'], subject: 'geogeomorphicprocessescbs', classLevel: 11, component: Sim0431 },
  { id: 'c11_geographyaeolianprocesseslandf', name: 'Geography Aeolian Processes Landforms', emoji: '🌍', color: '#FBBF24', nodeIds: ['c11_geo_011', 'c11_geo_012', 'c11_geo_013', 'c11_geo_014', 'c11_geo_015', 'c11_geo_016', 'c11_geo_017', 'c11_geo_018', 'c11_geo_019', 'c11_geo_020'], subject: 'geography', classLevel: 11, component: Sim0432 },
  { id: 'c11_geographygeographydiscipline', name: 'Geography Geography Discipline', emoji: '🌍', color: '#FBBF24', nodeIds: ['c11_geo_001', 'c11_geo_002', 'c11_geo_003', 'c11_geo_004', 'c11_geo_005', 'c11_geo_006', 'c11_geo_007', 'c11_geo_008', 'c11_geo_009', 'c11_geo_010'], subject: 'geography', classLevel: 11, component: Sim0433 },
  { id: 'c11_geographyoceancurrents', name: 'Geography Ocean Currents', emoji: '🌍', color: '#FBBF24', nodeIds: ['c11_geog_extra_001'], subject: 'geography', classLevel: 11, component: Sim0434 },
  { id: 'c11_geographyoceanwatersalinity', name: 'Geography Ocean Water Salinity', emoji: '🌍', color: '#FBBF24', nodeIds: ['c11_geo_021', 'c11_geo_022', 'c11_geo_023', 'c11_geo_024', 'c11_geo_025'], subject: 'geography', classLevel: 11, component: Sim0435 },
  { id: 'c11_geographyriverregime', name: 'Geography River Regime', emoji: '🌍', color: '#FBBF24', nodeIds: ['c11_geog_extra_001'], subject: 'geography', classLevel: 11, component: Sim0436 },
  { id: 'c11_geographyatmospherecomposition', name: 'Geography Atmosphere Composition', emoji: '📚', color: '#64748B', nodeIds: ['c11_geog_extra_001'], subject: 'geographyatmospherecompositio', classLevel: 11, component: Sim0437 },
  { id: 'c11_geographyatmosphericcirculatio', name: 'Geography Atmospheric Circulation', emoji: '📚', color: '#64748B', nodeIds: ['c11_geog_extra_001'], subject: 'geographyatmosphericcirculatio', classLevel: 11, component: Sim0438 },
  { id: 'c11_geographydrainagesystem', name: 'Geography Drainage System', emoji: '📚', color: '#64748B', nodeIds: ['c11_geog_extra_001'], subject: 'geographydrainagesyste', classLevel: 11, component: Sim0439 },
  { id: 'c11_geographyheatbalance', name: 'Geography Heat Balance', emoji: '📚', color: '#64748B', nodeIds: ['c11_geog_extra_001'], subject: 'geographyheatbalanc', classLevel: 11, component: Sim0440 },
  { id: 'c11_geographymapprojections', name: 'Geography Map Projections', emoji: '📚', color: '#64748B', nodeIds: ['c11_geog_extra_001'], subject: 'geographymapprojection', classLevel: 11, component: Sim0441 },
  { id: 'c11_geographymapscale', name: 'Geography Map Scale', emoji: '📚', color: '#64748B', nodeIds: ['c11_geog_extra_001'], subject: 'geographymapscal', classLevel: 11, component: Sim0442 },
  { id: 'c11_geographynaturalhazards', name: 'Geography Natural Hazards', emoji: '📚', color: '#64748B', nodeIds: ['c11_geog_extra_001'], subject: 'geographynaturalhazard', classLevel: 11, component: Sim0443 },
  { id: 'c11_geographyoceanwatermovements', name: 'Geography Ocean Water Movements', emoji: '📚', color: '#64748B', nodeIds: ['c11_geog_extra_001'], subject: 'geographyoceanwatermovement', classLevel: 11, component: Sim0444 },
  { id: 'c11_geographyoriginevolutionearth', name: 'Geography Origin Evolution Earth', emoji: '📚', color: '#64748B', nodeIds: ['c11_geog_extra_001'], subject: 'geographyoriginevolutioneart', classLevel: 11, component: Sim0445 },
  { id: 'c11_geographyremotesensing', name: 'Geography Remote Sensing', emoji: '📚', color: '#64748B', nodeIds: ['c11_geog_extra_001'], subject: 'geographyremotesensin', classLevel: 11, component: Sim0446 },
  { id: 'c11_geographystructurephysiography', name: 'Geography Structure Physiography', emoji: '📚', color: '#64748B', nodeIds: ['c11_geog_extra_001'], subject: 'geographystructurephysiograph', classLevel: 11, component: Sim0447 },
  { id: 'c11_geographywateratmosphere', name: 'Geography Water Atmosphere', emoji: '📚', color: '#64748B', nodeIds: ['c11_geog_extra_001'], subject: 'geographywateratmospher', classLevel: 11, component: Sim0448 },
  { id: 'c11_geointeriorearthcbse', name: 'Geo Interior Earth CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_geoi_xc6__001'], subject: 'geointeriorearthcbs', classLevel: 11, component: Sim0449 },
  { id: 'c11_geolandformsevolutioncbse', name: 'Geo Landforms Evolution CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_geol_xc6__001'], subject: 'geolandformsevolutioncbs', classLevel: 11, component: Sim0450 },
  { id: 'c11_geooceanscontinentscbse', name: 'Geo Oceans Continents CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_geoo_xc6__001'], subject: 'geooceanscontinentscbs', classLevel: 11, component: Sim0451 },
  { id: 'c11_historycircumstancesleadingpro', name: 'History Circumstances Leading Protest', emoji: '📜', color: '#A78BFA', nodeIds: ['c11_hist_011', 'c11_hist_012', 'c11_hist_013', 'c11_hist_014', 'c11_hist_015', 'c11_hist_016', 'c11_hist_017', 'c11_hist_018', 'c11_hist_019', 'c11_hist_020'], subject: 'history_civics', classLevel: 11, component: Sim0452 },
  { id: 'c11_historydevelopmentrailwayscomm', name: 'History Development Railways Communications', emoji: '📜', color: '#A78BFA', nodeIds: ['c11_hist_001', 'c11_hist_002', 'c11_hist_003', 'c11_hist_004', 'c11_hist_005', 'c11_hist_006', 'c11_hist_007', 'c11_hist_008', 'c11_hist_009', 'c11_hist_010'], subject: 'history_civics', classLevel: 11, component: Sim0453 },
  { id: 'c11_historyeventsfrom1932', name: 'History Events From1932', emoji: '📜', color: '#A78BFA', nodeIds: ['c11_hist_051', 'c11_hist_052', 'c11_hist_053', 'c11_hist_054', 'c11_hist_055', 'c11_hist_056', 'c11_hist_057'], subject: 'history_civics', classLevel: 11, component: Sim0454 },
  { id: 'c11_historylongtermcausesalliance', name: 'History Longterm Causes Alliance', emoji: '📜', color: '#A78BFA', nodeIds: ['c11_hist_031', 'c11_hist_032', 'c11_hist_033', 'c11_hist_034', 'c11_hist_035', 'c11_hist_036', 'c11_hist_037', 'c11_hist_038', 'c11_hist_039', 'c11_hist_040'], subject: 'history_civics', classLevel: 11, component: Sim0455 },
  { id: 'c11_historysatyagrahaagainstrowlat', name: 'History Satyagraha Against Rowlatt', emoji: '📜', color: '#A78BFA', nodeIds: ['c11_hist_021', 'c11_hist_022', 'c11_hist_023', 'c11_hist_024', 'c11_hist_025', 'c11_hist_026', 'c11_hist_027', 'c11_hist_028', 'c11_hist_029', 'c11_hist_030'], subject: 'history_civics', classLevel: 11, component: Sim0456 },
  { id: 'c11_historyweaknessesprovisionalgo', name: 'History Weaknesses Provisional Government', emoji: '📜', color: '#A78BFA', nodeIds: ['c11_hist_041', 'c11_hist_042', 'c11_hist_043', 'c11_hist_044', 'c11_hist_045', 'c11_hist_046', 'c11_hist_047', 'c11_hist_048', 'c11_hist_049', 'c11_hist_050'], subject: 'history_civics', classLevel: 11, component: Sim0457 },
  { id: 'c11_historychangingculturaltraditi', name: 'History Changing Cultural Traditions', emoji: '📚', color: '#64748B', nodeIds: ['c11_hist_extra_001'], subject: 'historychangingculturaltradition', classLevel: 11, component: Sim0458 },
  { id: 'c11_historydisplacingindigenouspeo', name: 'History Displacing Indigenous Peoples', emoji: '📚', color: '#64748B', nodeIds: ['c11_hist_extra_001'], subject: 'historydisplacingindigenouspeople', classLevel: 11, component: Sim0459 },
  { id: 'c11_historyempirethreecontinents', name: 'History Empire Three Continents', emoji: '📚', color: '#64748B', nodeIds: ['c11_hist_extra_001'], subject: 'historyempirethreecontinent', classLevel: 11, component: Sim0460 },
  { id: 'c11_historypathsmodernisation', name: 'History Paths Modernisation', emoji: '📚', color: '#64748B', nodeIds: ['c11_hist_extra_001'], subject: 'historypathsmodernisatio', classLevel: 11, component: Sim0461 },
  { id: 'c11_historythethreeorders', name: 'History The Three Orders', emoji: '📚', color: '#64748B', nodeIds: ['c11_hist_extra_001'], subject: 'historythethreeorder', classLevel: 11, component: Sim0462 },
  { id: 'c11_historywritingcitylife', name: 'History Writing City Life', emoji: '📚', color: '#64748B', nodeIds: ['c11_hist_extra_001'], subject: 'historywritingcitylif', classLevel: 11, component: Sim0463 },
  { id: 'c11_homescienceconceptgrowthdevelo', name: 'Home Science Concept Growth Development', emoji: '🏠', color: '#EC4899', nodeIds: ['c11_home_021', 'c11_home_022', 'c11_home_023', 'c11_home_024', 'c11_home_025', 'c11_home_026', 'c11_home_027', 'c11_home_028', 'c11_home_029', 'c11_home_030'], subject: 'home_science', classLevel: 11, component: Sim0464 },
  { id: 'c11_homescienceindividualcommunica', name: 'Home Science Individual Communication Verbal', emoji: '🏠', color: '#EC4899', nodeIds: ['c11_home_031', 'c11_home_032', 'c11_home_033', 'c11_home_034'], subject: 'home_science', classLevel: 11, component: Sim0465 },
  { id: 'c11_homescienceintroductionstreams', name: 'Home Science Introduction Streams Home', emoji: '🏠', color: '#EC4899', nodeIds: ['c11_home_001', 'c11_home_002', 'c11_home_003', 'c11_home_004', 'c11_home_005', 'c11_home_006', 'c11_home_007', 'c11_home_008', 'c11_home_009', 'c11_home_010'], subject: 'home_science', classLevel: 11, component: Sim0466 },
  { id: 'c11_homesciencestoragefoodsperisha', name: 'Home Science Storage Foods Perishable', emoji: '🏠', color: '#EC4899', nodeIds: ['c11_home_011', 'c11_home_012', 'c11_home_013', 'c11_home_014', 'c11_home_015', 'c11_home_016', 'c11_home_017', 'c11_home_018', 'c11_home_019', 'c11_home_020'], subject: 'home_science', classLevel: 11, component: Sim0467 },
  { id: 'c11_informaticspracticeskeysexplor', name: 'Informatics Practices Keys Explorer', emoji: '📚', color: '#64748B', nodeIds: ['c11_info_extra_001'], subject: 'informaticspracticeskeysexplore', classLevel: 11, component: Sim0468 },
  { id: 'c11_legalstudiesancientindiahindu', name: 'Legal Studies Ancient India Hindu', emoji: '⚖️', color: '#7C3AED', nodeIds: ['c11_legal_001', 'c11_legal_002', 'c11_legal_003', 'c11_legal_004', 'c11_legal_005', 'c11_legal_006', 'c11_legal_007', 'c11_legal_008', 'c11_legal_009', 'c11_legal_010'], subject: 'legal_studies', classLevel: 11, component: Sim0469 },
  { id: 'c11_legalstudiesordersdecreesjudge', name: 'Legal Studies Orders Decrees Judgements', emoji: '⚖️', color: '#7C3AED', nodeIds: ['c11_legal_021', 'c11_legal_022', 'c11_legal_023', 'c11_legal_024', 'c11_legal_025', 'c11_legal_026', 'c11_legal_027', 'c11_legal_028', 'c11_legal_029', 'c11_legal_030'], subject: 'legal_studies', classLevel: 11, component: Sim0470 },
  { id: 'c11_legalstudiespartnershipregistr', name: 'Legal Studies Partnership Registration Dissolution', emoji: '⚖️', color: '#7C3AED', nodeIds: ['c11_legal_011', 'c11_legal_012', 'c11_legal_013', 'c11_legal_014', 'c11_legal_015', 'c11_legal_016', 'c11_legal_017', 'c11_legal_018', 'c11_legal_019', 'c11_legal_020'], subject: 'legal_studies', classLevel: 11, component: Sim0471 },
  { id: 'c11_massmediadifferencebetweentele', name: 'Mass Media Difference Between Television', emoji: '📺', color: '#EF4444', nodeIds: ['c11_massmedia_021', 'c11_massmedia_022', 'c11_massmedia_023', 'c11_massmedia_024', 'c11_massmedia_025'], subject: 'mass_media', classLevel: 11, component: Sim0472 },
  { id: 'c11_massmedianewsvaluestimeliness', name: 'Mass Media News Values Timeliness', emoji: '📺', color: '#EF4444', nodeIds: ['c11_massmedia_011', 'c11_massmedia_012', 'c11_massmedia_013', 'c11_massmedia_014', 'c11_massmedia_015', 'c11_massmedia_016', 'c11_massmedia_017', 'c11_massmedia_018', 'c11_massmedia_019', 'c11_massmedia_020'], subject: 'mass_media', classLevel: 11, component: Sim0473 },
  { id: 'c11_massmediaunderstandingcommunic', name: 'Mass Media Understanding Communication Definition', emoji: '📺', color: '#EF4444', nodeIds: ['c11_massmedia_001', 'c11_massmedia_002', 'c11_massmedia_003', 'c11_massmedia_004', 'c11_massmedia_005', 'c11_massmedia_006', 'c11_massmedia_007', 'c11_massmedia_008', 'c11_massmedia_009', 'c11_massmedia_010'], subject: 'mass_media', classLevel: 11, component: Sim0474 },
  { id: 'c11_mathematicsconicsections', name: 'Mathematics Conic Sections', emoji: '📚', color: '#64748B', nodeIds: ['c11_math_extra_001'], subject: 'mathematicsconicsection', classLevel: 11, component: Sim0475 },
  { id: 'c11_mathematicsintroductiontothree', name: 'Mathematics Introduction To Three Dimensional Geom', emoji: '📚', color: '#64748B', nodeIds: ['c11_math_extra_001'], subject: 'mathematicsintroductiontothreedimensionalgeometr', classLevel: 11, component: Sim0476 },
  { id: 'c11_mathematicspermutationsandcomb', name: 'Mathematics Permutations And Combinations', emoji: '📚', color: '#64748B', nodeIds: ['c11_math_extra_001'], subject: 'mathematicspermutationsandcombination', classLevel: 11, component: Sim0477 },
  { id: 'c11_mathematicsprobability', name: 'Mathematics Probability', emoji: '📚', color: '#64748B', nodeIds: ['c11_math_extra_001'], subject: 'mathematicsprobabilit', classLevel: 11, component: Sim0478 },
  { id: 'c11_mathematicsstatistics', name: 'Mathematics Statistics', emoji: '📚', color: '#64748B', nodeIds: ['c11_math_extra_001'], subject: 'mathematicsstatistic', classLevel: 11, component: Sim0479 },
  { id: 'c11_mathematicsstraightlines', name: 'Mathematics Straight Lines', emoji: '📚', color: '#64748B', nodeIds: ['c11_math_extra_001'], subject: 'mathematicsstraightline', classLevel: 11, component: Sim0480 },
  { id: 'c11_appliedmathscomplexnumbersintr', name: 'Applied Maths Complex Numbers Introduction', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_appmath_021', 'c11_appmath_022', 'c11_appmath_023', 'c11_appmath_024', 'c11_appmath_025', 'c11_appmath_026', 'c11_appmath_027', 'c11_appmath_028', 'c11_appmath_029', 'c11_appmath_030'], subject: 'maths', classLevel: 11, component: Sim0481 },
  { id: 'c11_appliedmathscorrelationcovaria', name: 'Applied Maths Correlation Covariance Karl', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_appmath_061', 'c11_appmath_062', 'c11_appmath_063', 'c11_appmath_064', 'c11_appmath_065', 'c11_appmath_066', 'c11_appmath_067', 'c11_appmath_068', 'c11_appmath_069', 'c11_appmath_070'], subject: 'maths', classLevel: 11, component: Sim0482 },
  { id: 'c11_appliedmathsfinancialmathemati', name: 'Applied Maths Financial Mathematics Present', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_appmath_071', 'c11_appmath_072', 'c11_appmath_073', 'c11_appmath_074'], subject: 'maths', classLevel: 11, component: Sim0483 },
  { id: 'c11_appliedmathsgeneraltermsum', name: 'Applied Maths General Term Sum', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_appmath_041', 'c11_appmath_042', 'c11_appmath_043', 'c11_appmath_044', 'c11_appmath_045', 'c11_appmath_046', 'c11_appmath_047', 'c11_appmath_048', 'c11_appmath_049', 'c11_appmath_050'], subject: 'maths', classLevel: 11, component: Sim0484 },
  { id: 'c11_appliedmathsgraphquadraticfunc', name: 'Applied Maths Graph Quadratic Function', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_appmath_031', 'c11_appmath_032', 'c11_appmath_033', 'c11_appmath_034', 'c11_appmath_035', 'c11_appmath_036', 'c11_appmath_037', 'c11_appmath_038', 'c11_appmath_039', 'c11_appmath_040'], subject: 'maths', classLevel: 11, component: Sim0485 },
  { id: 'c11_appliedmathsgraphsstandardreal', name: 'Applied Maths Graphs Standard Real', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_appmath_011', 'c11_appmath_012', 'c11_appmath_013', 'c11_appmath_014', 'c11_appmath_015', 'c11_appmath_016', 'c11_appmath_017', 'c11_appmath_018', 'c11_appmath_019', 'c11_appmath_020'], subject: 'maths', classLevel: 11, component: Sim0486 },
  { id: 'c11_appliedmathslimitsalgebraictri', name: 'Applied Maths Limits Algebraic Trigonometric', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_appmath_051', 'c11_appmath_052', 'c11_appmath_053', 'c11_appmath_054', 'c11_appmath_055', 'c11_appmath_056', 'c11_appmath_057', 'c11_appmath_058', 'c11_appmath_059', 'c11_appmath_060'], subject: 'maths', classLevel: 11, component: Sim0487 },
  { id: 'c11_appliedmathssetsrepresentation', name: 'Applied Maths Sets Representations Empty', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_appmath_001', 'c11_appmath_002', 'c11_appmath_003', 'c11_appmath_004', 'c11_appmath_005', 'c11_appmath_006', 'c11_appmath_007', 'c11_appmath_008', 'c11_appmath_009', 'c11_appmath_010'], subject: 'maths', classLevel: 11, component: Sim0488 },
  { id: 'c11_mathematicscuberootsunity', name: 'Mathematics Cube Roots Unity', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_math_041', 'c11_math_043', 'c11_math_044', 'c11_math_045', 'c11_math_046', 'c11_math_047', 'c11_math_048', 'c11_math_049', 'c11_math_050', 'c11_math_051'], subject: 'maths', classLevel: 11, component: Sim0489 },
  { id: 'c11_mathematicsderivativessumdiffe', name: 'Mathematics Derivatives Sum Difference', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_math_092', 'c11_math_093', 'c11_math_094', 'c11_math_095', 'c11_math_096', 'c11_math_097', 'c11_math_098', 'c11_math_099', 'c11_math_100', 'c11_math_101'], subject: 'maths', classLevel: 11, component: Sim0490 },
  { id: 'c11_mathematicsellipsestandardequa', name: 'Mathematics Ellipse Standard Equation', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_math_082', 'c11_math_083', 'c11_math_084', 'c11_math_085', 'c11_math_086', 'c11_math_087', 'c11_math_088', 'c11_math_089', 'c11_math_090', 'c11_math_091'], subject: 'maths', classLevel: 11, component: Sim0491 },
  { id: 'c11_mathematicsfundamentalprincipl', name: 'Mathematics Fundamental Principle Counting', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_math_052', 'c11_math_053', 'c11_math_054', 'c11_math_055', 'c11_math_056', 'c11_math_057', 'c11_math_058', 'c11_math_059', 'c11_math_060', 'c11_math_061'], subject: 'maths', classLevel: 11, component: Sim0492 },
  { id: 'c11_mathematicsgeneralmiddleterm', name: 'Mathematics General Middle Term', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_math_062', 'c11_math_063', 'c11_math_064', 'c11_math_065', 'c11_math_066', 'c11_math_067', 'c11_math_068', 'c11_math_069', 'c11_math_070', 'c11_math_071'], subject: 'maths', classLevel: 11, component: Sim0493 },
  { id: 'c11_mathematicshalfangleonethird', name: 'Mathematics Half Angle Onethird', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_math_031', 'c11_math_032', 'c11_math_033', 'c11_math_034', 'c11_math_035', 'c11_math_036', 'c11_math_037', 'c11_math_038', 'c11_math_039', 'c11_math_040'], subject: 'maths', classLevel: 11, component: Sim0494 },
  { id: 'c11_mathematicsrealvaluedfunctions', name: 'Mathematics Real Valued Functions', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_math_011', 'c11_math_012', 'c11_math_013', 'c11_math_014', 'c11_math_015', 'c11_math_016', 'c11_math_017', 'c11_math_018', 'c11_math_019', 'c11_math_020'], subject: 'maths', classLevel: 11, component: Sim0495 },
  { id: 'c11_mathematicssetsrepresentations', name: 'Mathematics Sets Representations Empty', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_math_001', 'c11_math_002', 'c11_math_003', 'c11_math_004', 'c11_math_005', 'c11_math_006', 'c11_math_007', 'c11_math_008', 'c11_math_009', 'c11_math_010'], subject: 'maths', classLevel: 11, component: Sim0496 },
  { id: 'c11_mathematicssignstrigonometricf', name: 'Mathematics Signs Trigonometric Functions', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_math_021', 'c11_math_022', 'c11_math_023', 'c11_math_024', 'c11_math_025', 'c11_math_026', 'c11_math_027', 'c11_math_028', 'c11_math_029', 'c11_math_030'], subject: 'maths', classLevel: 11, component: Sim0497 },
  { id: 'c11_mathematicssymmetricfunctionsr', name: 'Mathematics Symmetric Functions Roots', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_math_102', 'c11_math_103', 'c11_math_104', 'c11_math_105', 'c11_math_106', 'c11_math_107', 'c11_math_108', 'c11_math_109'], subject: 'maths', classLevel: 11, component: Sim0498 },
  { id: 'c11_mathematicsvariousformsequatio', name: 'Mathematics Various Forms Equation', emoji: '📐', color: '#3B82F6', nodeIds: ['c11_math_072', 'c11_math_073', 'c11_math_074', 'c11_math_075', 'c11_math_076', 'c11_math_077', 'c11_math_078', 'c11_math_079', 'c11_math_080', 'c11_math_081'], subject: 'maths', classLevel: 11, component: Sim0499 },
  { id: 'c11_mathsinfiniteseriescbse', name: 'Maths Infinite Series CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_math_xc6__001'], subject: 'mathsinfiniteseriescbs', classLevel: 11, component: Sim0500 },
  { id: 'c11_mathslinearinequalitiescbse', name: 'Maths Linear Inequalities CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_math_xc6__001'], subject: 'mathslinearinequalitiescbs', classLevel: 11, component: Sim0501 },
  { id: 'c11_physicsbernoullistheorem', name: 'Physics Bernoullis Theorem', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c11_phy_061', 'c11_phy_062', 'c11_phy_063', 'c11_phy_064', 'c11_phy_065', 'c11_phy_066', 'c11_phy_067', 'c11_phy_068', 'c11_phy_069', 'c11_phy_070'], subject: 'physics', classLevel: 11, component: Sim0502 },
  { id: 'c11_physicsconservationmechanicale', name: 'Physics Conservation Mechanical Energy', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c11_phy_031', 'c11_phy_032', 'c11_phy_033', 'c11_phy_034', 'c11_phy_035', 'c11_phy_036', 'c11_phy_037', 'c11_phy_038', 'c11_phy_039', 'c11_phy_040'], subject: 'physics', classLevel: 11, component: Sim0503 },
  { id: 'c11_physicsequilibriumconcurrentfo', name: 'Physics Equilibrium Concurrent Forces', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c11_phy_021', 'c11_phy_022', 'c11_phy_023', 'c11_phy_024', 'c11_phy_025', 'c11_phy_026', 'c11_phy_027', 'c11_phy_028', 'c11_phy_029', 'c11_phy_030'], subject: 'physics', classLevel: 11, component: Sim0504 },
  { id: 'c11_physicsgeostationarysatellites', name: 'Physics Geostationary Satellites', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c11_phy_051', 'c11_phy_052', 'c11_phy_053', 'c11_phy_054', 'c11_phy_055', 'c11_phy_056', 'c11_phy_057', 'c11_phy_058', 'c11_phy_059', 'c11_phy_060'], subject: 'physics', classLevel: 11, component: Sim0505 },
  { id: 'c11_physicsheattransferradiation', name: 'Physics Heat Transfer Radiation', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c11_phy_071', 'c11_phy_072', 'c11_phy_073', 'c11_phy_074', 'c11_phy_075', 'c11_phy_076', 'c11_phy_077', 'c11_phy_078', 'c11_phy_079', 'c11_phy_080'], subject: 'physics', classLevel: 11, component: Sim0506 },
  { id: 'c11_physicsparallelperpendicularax', name: 'Physics Parallel Perpendicular Axes', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c11_phy_041', 'c11_phy_042', 'c11_phy_043', 'c11_phy_044', 'c11_phy_045', 'c11_phy_046', 'c11_phy_047', 'c11_phy_048', 'c11_phy_049', 'c11_phy_050'], subject: 'physics', classLevel: 11, component: Sim0507 },
  { id: 'c11_physicsrefrigeratorcoefficient', name: 'Physics Refrigerator Coefficient Performance', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c11_phy_101', 'c11_phy_102', 'c11_phy_103', 'c11_phy_104', 'c11_phy_105', 'c11_phy_106', 'c11_phy_107'], subject: 'physics', classLevel: 11, component: Sim0508 },
  { id: 'c11_physicsresolutionvectorsrectan', name: 'Physics Resolution Vectors Rectangular', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c11_phy_011', 'c11_phy_012', 'c11_phy_013', 'c11_phy_014', 'c11_phy_015', 'c11_phy_016', 'c11_phy_017', 'c11_phy_018', 'c11_phy_019', 'c11_phy_020'], subject: 'physics', classLevel: 11, component: Sim0509 },
  { id: 'c11_physicssimplependulum', name: 'Physics Simple Pendulum', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c11_phy_091', 'c11_phy_092', 'c11_phy_093', 'c11_phy_094', 'c11_phy_095', 'c11_phy_096', 'c11_phy_097', 'c11_phy_098', 'c11_phy_099', 'c11_phy_100'], subject: 'physics', classLevel: 11, component: Sim0510 },
  { id: 'c11_physicssystemsunitscgs', name: 'Physics Systems Unitscgs', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c11_phy_001', 'c11_phy_002', 'c11_phy_003', 'c11_phy_004', 'c11_phy_005', 'c11_phy_006', 'c11_phy_007', 'c11_phy_008', 'c11_phy_009', 'c11_phy_010'], subject: 'physics', classLevel: 11, component: Sim0511 },
  { id: 'c11_physicsworkdoneadiabatic', name: 'Physics Work Done Adiabatic', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c11_phy_081', 'c11_phy_082', 'c11_phy_083', 'c11_phy_084', 'c11_phy_085', 'c11_phy_086', 'c11_phy_087', 'c11_phy_088', 'c11_phy_089', 'c11_phy_090'], subject: 'physics', classLevel: 11, component: Sim0512 },
  { id: 'c11_physicsgravitation', name: 'Physics Gravitation', emoji: '📚', color: '#64748B', nodeIds: ['c11_phys_extra_001'], subject: 'physicsgravitatio', classLevel: 11, component: Sim0513 },
  { id: 'c11_physicskinetictheorygasescbse', name: 'Physics Kinetic Theory Gases CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_phys_extra_001'], subject: 'physicskinetictheorygasescbs', classLevel: 11, component: Sim0514 },
  { id: 'c11_physicsmechanicalpropertiessol', name: 'Physics Mechanical Properties Solids CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_phys_extra_001'], subject: 'physicsmechanicalpropertiessolidscbs', classLevel: 11, component: Sim0515 },
  { id: 'c11_physicsmotionstraightlinecbse', name: 'Physics Motion Straight Line CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_phys_extra_001'], subject: 'physicsmotionstraightlinecbs', classLevel: 11, component: Sim0516 },
  { id: 'c11_physicsoscillations', name: 'Physics Oscillations', emoji: '📚', color: '#64748B', nodeIds: ['c11_phys_extra_001'], subject: 'physicsoscillation', classLevel: 11, component: Sim0517 },
  { id: 'c11_physicsthermalpropertiesofmatt', name: 'Physics Thermal Properties Of Matter', emoji: '📚', color: '#64748B', nodeIds: ['c11_phys_extra_001'], subject: 'physicsthermalpropertiesofmatte', classLevel: 11, component: Sim0518 },
  { id: 'c11_physicsthermodynamics', name: 'Physics Thermodynamics', emoji: '📚', color: '#64748B', nodeIds: ['c11_phys_extra_001'], subject: 'physicsthermodynamic', classLevel: 11, component: Sim0519 },
  { id: 'c11_physicsunitsandmeasurement', name: 'Physics Units And Measurement', emoji: '📚', color: '#64748B', nodeIds: ['c11_phys_extra_001'], subject: 'physicsunitsandmeasuremen', classLevel: 11, component: Sim0520 },
  { id: 'c11_physicswavemotionpropertiescbs', name: 'Physics Wave Motion Properties CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_phys_extra_001'], subject: 'physicswavemotionpropertiescbs', classLevel: 11, component: Sim0521 },
  { id: 'c11_politicalsciencedisintegration', name: 'Political Science Disintegration Soviet Union', emoji: '🏛️', color: '#991B1B', nodeIds: ['c11_pol_021', 'c11_pol_022', 'c11_pol_023', 'c11_pol_024', 'c11_pol_025', 'c11_pol_026', 'c11_pol_027', 'c11_pol_028'], subject: 'political_science', classLevel: 11, component: Sim0522 },
  { id: 'c11_politicalsciencemeaningpolitic', name: 'Political Science Meaning Political Science', emoji: '🏛️', color: '#991B1B', nodeIds: ['c11_pol_001', 'c11_pol_002', 'c11_pol_003', 'c11_pol_004', 'c11_pol_005', 'c11_pol_006', 'c11_pol_007', 'c11_pol_008', 'c11_pol_009', 'c11_pol_010'], subject: 'political_science', classLevel: 11, component: Sim0523 },
  { id: 'c11_politicalsciencesovereigntymea', name: 'Political Science Sovereignty Meaning Definition', emoji: '🏛️', color: '#991B1B', nodeIds: ['c11_pol_011', 'c11_pol_012', 'c11_pol_013', 'c11_pol_014', 'c11_pol_015', 'c11_pol_016', 'c11_pol_017', 'c11_pol_018', 'c11_pol_019', 'c11_pol_020'], subject: 'political_science', classLevel: 11, component: Sim0524 },
  { id: 'c11_politicalsciencecitizenship', name: 'Political Science Citizenship', emoji: '📚', color: '#64748B', nodeIds: ['c11_poli_extra_001'], subject: 'politicalsciencecitizenshi', classLevel: 11, component: Sim0525 },
  { id: 'c11_politicalsciencefreedom', name: 'Political Science Freedom', emoji: '📚', color: '#64748B', nodeIds: ['c11_poli_extra_001'], subject: 'politicalsciencefreedo', classLevel: 11, component: Sim0526 },
  { id: 'c11_politicalsciencerights', name: 'Political Science Rights', emoji: '📚', color: '#64748B', nodeIds: ['c11_poli_extra_001'], subject: 'politicalscienceright', classLevel: 11, component: Sim0527 },
  { id: 'c11_psychologydefinitionpsychology', name: 'Psychology Definition Psychology Basic', emoji: '🧠', color: '#F472B6', nodeIds: ['c11_psy_001', 'c11_psy_002', 'c11_psy_003', 'c11_psy_004', 'c11_psy_005', 'c11_psy_006', 'c11_psy_007', 'c11_psy_008', 'c11_psy_009', 'c11_psy_010'], subject: 'psychology', classLevel: 11, component: Sim0528 },
  { id: 'c11_psychologyforgettingoccurs', name: 'Psychology Forgetting Occurs', emoji: '🧠', color: '#F472B6', nodeIds: ['c11_psy_031', 'c11_psy_032', 'c11_psy_033', 'c11_psy_034', 'c11_psy_035', 'c11_psy_036', 'c11_psy_037'], subject: 'psychology', classLevel: 11, component: Sim0529 },
  { id: 'c11_psychologystatisticspsychology', name: 'Psychology Statistics Psychology Descriptive', emoji: '🧠', color: '#F472B6', nodeIds: ['c11_psy_011', 'c11_psy_012', 'c11_psy_013', 'c11_psy_014', 'c11_psy_015', 'c11_psy_016', 'c11_psy_017', 'c11_psy_018', 'c11_psy_019', 'c11_psy_020'], subject: 'psychology', classLevel: 11, component: Sim0530 },
  { id: 'c11_psychologytheoriesmotivation', name: 'Psychology Theories Motivation', emoji: '🧠', color: '#F472B6', nodeIds: ['c11_psy_021', 'c11_psy_022', 'c11_psy_023', 'c11_psy_024', 'c11_psy_025', 'c11_psy_026', 'c11_psy_027', 'c11_psy_028', 'c11_psy_029', 'c11_psy_030'], subject: 'psychology', classLevel: 11, component: Sim0531 },
  { id: 'c11_psyhumandevelopmentcbse', name: 'Psy Human Development CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_psyh_xc6__001'], subject: 'psyhumandevelopmentcbs', classLevel: 11, component: Sim0532 },
  { id: 'c11_psyhumanmemorycbse', name: 'Psy Human Memory CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_psyh_xc6__001'], subject: 'psyhumanmemorycbs', classLevel: 11, component: Sim0533 },
  { id: 'c11_psylearningcbse', name: 'Psy Learning CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_psyl_xc6__001'], subject: 'psylearningcbs', classLevel: 11, component: Sim0534 },
  { id: 'c11_psythinkingcbse', name: 'Psy Thinking CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_psyt_xc6__001'], subject: 'psythinkingcbs', classLevel: 11, component: Sim0535 },
  { id: 'c11_psywhatispsychologycbse', name: 'Psy What Is Psychology CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c11_psyw_xc6__001'], subject: 'psywhatispsychologycbs', classLevel: 11, component: Sim0536 },
  { id: 'c11_sociologyemergencesociologyant', name: 'Sociology Emergence Sociology Anthropology', emoji: '👥', color: '#06B6D4', nodeIds: ['c11_soc_001', 'c11_soc_002', 'c11_soc_003', 'c11_soc_004', 'c11_soc_005', 'c11_soc_006', 'c11_soc_007', 'c11_soc_008', 'c11_soc_009', 'c11_soc_010'], subject: 'sociology', classLevel: 11, component: Sim0537 },
  { id: 'c11_sociologyroleroleconflict', name: 'Sociology Role Role Conflict', emoji: '👥', color: '#06B6D4', nodeIds: ['c11_soc_021', 'c11_soc_022', 'c11_soc_023', 'c11_soc_024', 'c11_soc_025', 'c11_soc_026', 'c11_soc_027', 'c11_soc_028', 'c11_soc_029', 'c11_soc_030'], subject: 'sociology', classLevel: 11, component: Sim0538 },
  { id: 'c11_sociologytoolsdatacollection', name: 'Sociology Tools Data Collection', emoji: '👥', color: '#06B6D4', nodeIds: ['c11_soc_011', 'c11_soc_012', 'c11_soc_013', 'c11_soc_014', 'c11_soc_015', 'c11_soc_016', 'c11_soc_017', 'c11_soc_018', 'c11_soc_019', 'c11_soc_020'], subject: 'sociology', classLevel: 11, component: Sim0539 },
  { id: 'c11_sociologyenvironmentsociety', name: 'Sociology Environment Society', emoji: '📚', color: '#64748B', nodeIds: ['c11_soci_extra_001'], subject: 'sociologyenvironmentsociet', classLevel: 11, component: Sim0540 },
  { id: 'c11_sociologyindiansociologists', name: 'Sociology Indian Sociologists', emoji: '📚', color: '#64748B', nodeIds: ['c11_soci_extra_001'], subject: 'sociologyindiansociologist', classLevel: 11, component: Sim0541 },
  { id: 'c11_sociologyruralurbansocialorder', name: 'Sociology Rural Urban Social Order', emoji: '📚', color: '#64748B', nodeIds: ['c11_soci_extra_001'], subject: 'sociologyruralurbansocialorde', classLevel: 11, component: Sim0542 },
  { id: 'c11_sociologysocialprocesses', name: 'Sociology Social Processes', emoji: '📚', color: '#64748B', nodeIds: ['c11_soci_extra_001'], subject: 'sociologysocialprocesse', classLevel: 11, component: Sim0543 },
  { id: 'c11_sociologysocialstratification', name: 'Sociology Social Stratification', emoji: '📚', color: '#64748B', nodeIds: ['c11_soci_extra_001'], subject: 'sociologysocialstratificatio', classLevel: 11, component: Sim0544 },
  { id: 'c11_sociologysocietysociety', name: 'Sociology Society Society', emoji: '📚', color: '#64748B', nodeIds: ['c11_soci_extra_001'], subject: 'sociologysocietysociet', classLevel: 11, component: Sim0545 },
  { id: 'c11_sociologywesternsociologists', name: 'Sociology Western Sociologists', emoji: '📚', color: '#64748B', nodeIds: ['c11_soci_extra_001'], subject: 'sociologywesternsociologist', classLevel: 11, component: Sim0546 },
  { id: 'c12_accountancycomparativestatemen', name: 'Accountancy Comparative Statements Meaning', emoji: '💰', color: '#059669', nodeIds: ['c12_acc_041', 'c12_acc_042', 'c12_acc_043', 'c12_acc_044', 'c12_acc_045', 'c12_acc_046', 'c12_acc_047', 'c12_acc_048', 'c12_acc_049', 'c12_acc_050'], subject: 'accountancy', classLevel: 12, component: Sim0547 },
  { id: 'c12_accountancycreatingworksheetse', name: 'Accountancy Creating Worksheets Entering', emoji: '💰', color: '#059669', nodeIds: ['c12_acc_071', 'c12_acc_072', 'c12_acc_073', 'c12_acc_074', 'c12_acc_075', 'c12_acc_076', 'c12_acc_077'], subject: 'accountancy', classLevel: 12, component: Sim0548 },
  { id: 'c12_accountancydefinitionmeaningfe', name: 'Accountancy Definition Meaning Features', emoji: '💰', color: '#059669', nodeIds: ['c12_acc_001', 'c12_acc_002', 'c12_acc_003', 'c12_acc_004', 'c12_acc_005', 'c12_acc_006', 'c12_acc_007', 'c12_acc_008', 'c12_acc_009', 'c12_acc_010'], subject: 'accountancy', classLevel: 12, component: Sim0549 },
  { id: 'c12_accountancydisclosuresharecapi', name: 'Accountancy Disclosure Share Capital', emoji: '💰', color: '#059669', nodeIds: ['c12_acc_031', 'c12_acc_032', 'c12_acc_033', 'c12_acc_034', 'c12_acc_035', 'c12_acc_036', 'c12_acc_037', 'c12_acc_038', 'c12_acc_039', 'c12_acc_040'], subject: 'accountancy', classLevel: 12, component: Sim0550 },
  { id: 'c12_accountancypastadjustmentsafte', name: 'Accountancy Past Adjustments After', emoji: '💰', color: '#059669', nodeIds: ['c12_acc_011', 'c12_acc_012', 'c12_acc_013', 'c12_acc_014', 'c12_acc_015', 'c12_acc_016', 'c12_acc_017', 'c12_acc_018', 'c12_acc_019', 'c12_acc_020'], subject: 'accountancy', classLevel: 12, component: Sim0551 },
  { id: 'c12_accountancyretirementpartnerga', name: 'Accountancy Retirement Partner Gaining', emoji: '💰', color: '#059669', nodeIds: ['c12_acc_021', 'c12_acc_022', 'c12_acc_023', 'c12_acc_024', 'c12_acc_025', 'c12_acc_026', 'c12_acc_027', 'c12_acc_028', 'c12_acc_029', 'c12_acc_030'], subject: 'accountancy', classLevel: 12, component: Sim0552 },
  { id: 'c12_accountancytreatmentproposeddi', name: 'Accountancy Treatment Proposed Dividend', emoji: '💰', color: '#059669', nodeIds: ['c12_acc_051', 'c12_acc_052', 'c12_acc_053', 'c12_acc_054', 'c12_acc_055', 'c12_acc_056', 'c12_acc_057', 'c12_acc_058', 'c12_acc_059', 'c12_acc_060'], subject: 'accountancy', classLevel: 12, component: Sim0553 },
  { id: 'c12_accountancyworkingcapitalturno', name: 'Accountancy Working Capital Turnover', emoji: '💰', color: '#059669', nodeIds: ['c12_acc_061', 'c12_acc_062', 'c12_acc_063', 'c12_acc_064', 'c12_acc_065', 'c12_acc_066', 'c12_acc_067', 'c12_acc_068', 'c12_acc_069', 'c12_acc_070'], subject: 'accountancy', classLevel: 12, component: Sim0554 },
  { id: 'c12_appliedmathsdifferentiationapp', name: 'Applied Maths Differentiation Applications', emoji: '📚', color: '#64748B', nodeIds: ['c12_appl_extra_001'], subject: 'appliedmathsdifferentiationapplication', classLevel: 12, component: Sim0555 },
  { id: 'c12_appliedmathsemiannuity', name: 'Applied Maths EMIAnnuity', emoji: '📚', color: '#64748B', nodeIds: ['c12_appl_extra_001'], subject: 'appliedmathsemiannuit', classLevel: 12, component: Sim0556 },
  { id: 'c12_appliedmathsintegrationapplica', name: 'Applied Maths Integration Applications', emoji: '📚', color: '#64748B', nodeIds: ['c12_appl_extra_001'], subject: 'appliedmathsintegrationapplication', classLevel: 12, component: Sim0557 },
  { id: 'c12_biologydrugalcoholabuse', name: 'Biology Drug Alcohol Abuse', emoji: '🧬', color: '#22C55E', nodeIds: ['c12_bio_041', 'c12_bio_042', 'c12_bio_043', 'c12_bio_044', 'c12_bio_045', 'c12_bio_046', 'c12_bio_047', 'c12_bio_048', 'c12_bio_049', 'c12_bio_050'], subject: 'biology', classLevel: 12, component: Sim0558 },
  { id: 'c12_biologylinkagecrossingover', name: 'Biology Linkage Crossing Over', emoji: '🧬', color: '#22C55E', nodeIds: ['c12_bio_021', 'c12_bio_022', 'c12_bio_023', 'c12_bio_024', 'c12_bio_025', 'c12_bio_026', 'c12_bio_027', 'c12_bio_028', 'c12_bio_029', 'c12_bio_030'], subject: 'biology', classLevel: 12, component: Sim0559 },
  { id: 'c12_biologymicrobesindustrialprodu', name: 'Biology Microbes Industrial Products', emoji: '🧬', color: '#22C55E', nodeIds: ['c12_bio_061', 'c12_bio_062', 'c12_bio_063', 'c12_bio_064', 'c12_bio_065', 'c12_bio_066', 'c12_bio_067', 'c12_bio_068', 'c12_bio_069', 'c12_bio_070', 'c12_bio_071'], subject: 'biology', classLevel: 12, component: Sim0560 },
  { id: 'c12_biologymicrosporogenesispollen', name: 'Biology Microsporogenesis Pollen Grain', emoji: '🧬', color: '#22C55E', nodeIds: ['c12_bio_001', 'c12_bio_002', 'c12_bio_003', 'c12_bio_004', 'c12_bio_005', 'c12_bio_006', 'c12_bio_007', 'c12_bio_008', 'c12_bio_009', 'c12_bio_010'], subject: 'biology', classLevel: 12, component: Sim0561 },
  { id: 'c12_biologyoogenesis', name: 'Biology Oogenesis', emoji: '🧬', color: '#22C55E', nodeIds: ['c12_bio_011', 'c12_bio_012', 'c12_bio_013', 'c12_bio_014', 'c12_bio_015', 'c12_bio_016', 'c12_bio_017', 'c12_bio_018', 'c12_bio_019', 'c12_bio_020'], subject: 'biology', classLevel: 12, component: Sim0562 },
  { id: 'c12_biologyoriginlife', name: 'Biology Origin Life', emoji: '🧬', color: '#22C55E', nodeIds: ['c12_bio_031', 'c12_bio_032', 'c12_bio_033', 'c12_bio_034', 'c12_bio_035', 'c12_bio_036', 'c12_bio_037', 'c12_bio_038', 'c12_bio_039', 'c12_bio_040'], subject: 'biology', classLevel: 12, component: Sim0563 },
  { id: 'c12_biologypopulationinteractions', name: 'Biology Population Interactions', emoji: '🧬', color: '#22C55E', nodeIds: ['c12_bio_051', 'c12_bio_052', 'c12_bio_053', 'c12_bio_054', 'c12_bio_055', 'c12_bio_056', 'c12_bio_057', 'c12_bio_058', 'c12_bio_059', 'c12_bio_060'], subject: 'biology', classLevel: 12, component: Sim0564 },
  { id: 'c12_biotechnologygenomiccdnalibrar', name: 'Biotechnology Genomic Cdna Libraries', emoji: '🧬', color: '#22C55E', nodeIds: ['c12_biotech_021', 'c12_biotech_022', 'c12_biotech_023', 'c12_biotech_024', 'c12_biotech_025', 'c12_biotech_026', 'c12_biotech_027', 'c12_biotech_028', 'c12_biotech_029', 'c12_biotech_030'], subject: 'biology', classLevel: 12, component: Sim0565 },
  { id: 'c12_biotechnologynucleotidesnucleo', name: 'Biotechnology Nucleotides Nucleosides Structure', emoji: '🧬', color: '#22C55E', nodeIds: ['c12_biotech_001', 'c12_biotech_002', 'c12_biotech_003', 'c12_biotech_004', 'c12_biotech_005', 'c12_biotech_006', 'c12_biotech_007', 'c12_biotech_008', 'c12_biotech_009', 'c12_biotech_010'], subject: 'biology', classLevel: 12, component: Sim0566 },
  { id: 'c12_biotechnologyricegenomeproject', name: 'Biotechnology Rice Genome Project', emoji: '🧬', color: '#22C55E', nodeIds: ['c12_biotech_051', 'c12_biotech_052', 'c12_biotech_053', 'c12_biotech_054', 'c12_biotech_055'], subject: 'biology', classLevel: 12, component: Sim0567 },
  { id: 'c12_biotechnologysequencingsangers', name: 'Biotechnology Sequencing Sangers Chain', emoji: '🧬', color: '#22C55E', nodeIds: ['c12_biotech_031', 'c12_biotech_032', 'c12_biotech_033', 'c12_biotech_034', 'c12_biotech_035', 'c12_biotech_036', 'c12_biotech_037', 'c12_biotech_038', 'c12_biotech_039', 'c12_biotech_040'], subject: 'biology', classLevel: 12, component: Sim0568 },
  { id: 'c12_biotechnologysomatichybridisat', name: 'Biotechnology Somatic Hybridisationpomato', emoji: '🧬', color: '#22C55E', nodeIds: ['c12_biotech_041', 'c12_biotech_042', 'c12_biotech_043', 'c12_biotech_044', 'c12_biotech_045', 'c12_biotech_046', 'c12_biotech_047', 'c12_biotech_048', 'c12_biotech_049', 'c12_biotech_050'], subject: 'biology', classLevel: 12, component: Sim0569 },
  { id: 'c12_biotechnologytranslationinitia', name: 'Biotechnology Translation Initiation Elongation', emoji: '🧬', color: '#22C55E', nodeIds: ['c12_biotech_011', 'c12_biotech_012', 'c12_biotech_013', 'c12_biotech_014', 'c12_biotech_015', 'c12_biotech_016', 'c12_biotech_017', 'c12_biotech_018', 'c12_biotech_019', 'c12_biotech_020'], subject: 'biology', classLevel: 12, component: Sim0570 },
  { id: 'c12_biologybiodiversityandconserva', name: 'Biology Biodiversity And Conservation', emoji: '📚', color: '#64748B', nodeIds: ['c12_biol_extra_001'], subject: 'biologybiodiversityandconservatio', classLevel: 12, component: Sim0571 },
  { id: 'c12_biologyclinicalnutritioncbse', name: 'Biology Clinical Nutrition CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_biol_xc6__001'], subject: 'biologyclinicalnutritioncbs', classLevel: 12, component: Sim0572 },
  { id: 'c12_biologyearlychildhoodcarecbse', name: 'Biology Early Childhood Care CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_biol_xc6__001'], subject: 'biologyearlychildhoodcarecbs', classLevel: 12, component: Sim0573 },
  { id: 'c12_biologyecosystem', name: 'Biology Ecosystem', emoji: '📚', color: '#64748B', nodeIds: ['c12_biol_extra_001'], subject: 'biologyecosyste', classLevel: 12, component: Sim0574 },
  { id: 'c12_biologyenvironmentalissues', name: 'Biology Environmental Issues', emoji: '📚', color: '#64748B', nodeIds: ['c12_biol_extra_001'], subject: 'biologyenvironmentalissue', classLevel: 12, component: Sim0575 },
  { id: 'c12_biologyevolution', name: 'Biology Evolution', emoji: '📚', color: '#64748B', nodeIds: ['c12_biol_extra_001'], subject: 'biologyevolutio', classLevel: 12, component: Sim0576 },
  { id: 'c12_biologyevolutionnaturalselecti', name: 'Biology Evolution Natural Selection', emoji: '📚', color: '#64748B', nodeIds: ['c12_biol_extra_001'], subject: 'biologyevolutionnaturalselectio', classLevel: 12, component: Sim0577 },
  { id: 'c12_biologyfloweringplantdoublefer', name: 'Biology Flowering Plant Double Fertilisation', emoji: '📚', color: '#64748B', nodeIds: ['c12_biol_extra_001'], subject: 'biologyfloweringplantdoublefertilisatio', classLevel: 12, component: Sim0578 },
  { id: 'c12_biologyfoodqualitycbse', name: 'Biology Food Quality CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_biol_xc6__001'], subject: 'biologyfoodqualitycbs', classLevel: 12, component: Sim0579 },
  { id: 'c12_biologyhumanhealthanddiseasecb', name: 'Biology Human Healthand Disease CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_biol_xc6__001'], subject: 'biologyhumanhealthanddiseasecbs', classLevel: 12, component: Sim0580 },
  { id: 'c12_biologyhumanhealthimmunity', name: 'Biology Human Health Immunity', emoji: '📚', color: '#64748B', nodeIds: ['c12_biol_extra_001'], subject: 'biologyhumanhealthimmunit', classLevel: 12, component: Sim0581 },
  { id: 'c12_biologyhumanreproductioncbse', name: 'Biology Human Reproduction CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_biol_xc6__001'], subject: 'biologyhumanreproductioncbs', classLevel: 12, component: Sim0582 },
  { id: 'c12_biologymolecularbasisofinherit', name: 'Biology Molecular Basisof Inheritance CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_biol_xc6__001'], subject: 'biologymolecularbasisofinheritancecbs', classLevel: 12, component: Sim0583 },
  { id: 'c12_biologyreproductivehealthcbse', name: 'Biology Reproductive Health CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_biol_xc6__001'], subject: 'biologyreproductivehealthcbs', classLevel: 12, component: Sim0584 },
  { id: 'c12_biologysexualreproductionflowe', name: 'Biology Sexual Reproduction Flowering Plants', emoji: '📚', color: '#64748B', nodeIds: ['c12_biol_extra_001'], subject: 'biologysexualreproductionfloweringplant', classLevel: 12, component: Sim0585 },
  { id: 'c12_biotechanimalcellculturecbse', name: 'Biotech Animal Cell Culture CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_biot_xc6__001'], subject: 'biotechanimalcellculturecbs', classLevel: 12, component: Sim0586 },
  { id: 'c12_biotechbioremediationcbse', name: 'Biotech Bioremediation CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_biot_xc6__001'], subject: 'biotechbioremediationcbs', classLevel: 12, component: Sim0587 },
  { id: 'c12_biotechgenecloningcbse', name: 'Biotech Gene Cloning CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_biot_xc6__001'], subject: 'biotechgenecloningcbs', classLevel: 12, component: Sim0588 },
  { id: 'c12_biotechgenometechnologycbse', name: 'Biotech Genome Technology CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_biot_xc6__001'], subject: 'biotechgenometechnologycbs', classLevel: 12, component: Sim0589 },
  { id: 'c12_biotechmicrobialculturecbse', name: 'Biotech Microbial Culture CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_biot_xc6__001'], subject: 'biotechmicrobialculturecbs', classLevel: 12, component: Sim0590 },
  { id: 'c12_biotechnologygenecloning', name: 'Biotechnology Gene Cloning', emoji: '📚', color: '#64748B', nodeIds: ['c12_biot_extra_001'], subject: 'biotechnologygeneclonin', classLevel: 12, component: Sim0591 },
  { id: 'c12_biotechnologyhostvectorsystem', name: 'Biotechnology Host Vector System', emoji: '📚', color: '#64748B', nodeIds: ['c12_biot_extra_001'], subject: 'biotechnologyhostvectorsyste', classLevel: 12, component: Sim0592 },
  { id: 'c12_biotechplanttissueculturecbse', name: 'Biotech Plant Tissue Culture CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_biot_xc6__001'], subject: 'biotechplanttissueculturecbs', classLevel: 12, component: Sim0593 },
  { id: 'c12_biotechrecombinantdnaapplicati', name: 'Biotech Recombinant DNAApplications CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_biot_xc6__001'], subject: 'biotechrecombinantdnaapplicationscbs', classLevel: 12, component: Sim0594 },
  { id: 'c12_businessstudiesbusinessenviron', name: 'Business Studies Business Environment Meaning', emoji: '🏢', color: '#475569', nodeIds: ['c12_bs_001', 'c12_bs_002', 'c12_bs_003', 'c12_bs_004', 'c12_bs_005', 'c12_bs_006', 'c12_bs_007', 'c12_bs_008', 'c12_bs_009', 'c12_bs_010'], subject: 'business_studies', classLevel: 12, component: Sim0595 },
  { id: 'c12_businessstudiescoordinationmea', name: 'Business Studies Coordination Meaning Coordination', emoji: '🏢', color: '#475569', nodeIds: ['c12_bs_021', 'c12_bs_022', 'c12_bs_023', 'c12_bs_024', 'c12_bs_025', 'c12_bs_026', 'c12_bs_027', 'c12_bs_028', 'c12_bs_029', 'c12_bs_030'], subject: 'business_studies', classLevel: 12, component: Sim0596 },
  { id: 'c12_businessstudiesloansfromfinanc', name: 'Business Studies Loans From Financial', emoji: '🏢', color: '#475569', nodeIds: ['c12_bs_031', 'c12_bs_032', 'c12_bs_033', 'c12_bs_034', 'c12_bs_035', 'c12_bs_036', 'c12_bs_037', 'c12_bs_038', 'c12_bs_039', 'c12_bs_040'], subject: 'business_studies', classLevel: 12, component: Sim0597 },
  { id: 'c12_businessstudiesplacechannelsdi', name: 'Business Studies Place Channels Distribution', emoji: '🏢', color: '#475569', nodeIds: ['c12_bs_041', 'c12_bs_042', 'c12_bs_043', 'c12_bs_044', 'c12_bs_045', 'c12_bs_046', 'c12_bs_047', 'c12_bs_048'], subject: 'business_studies', classLevel: 12, component: Sim0598 },
  { id: 'c12_businessstudiesplanningmeaning', name: 'Business Studies Planning Meaning Steps', emoji: '🏢', color: '#475569', nodeIds: ['c12_bs_011', 'c12_bs_012', 'c12_bs_013', 'c12_bs_014', 'c12_bs_015', 'c12_bs_016', 'c12_bs_017', 'c12_bs_018', 'c12_bs_019', 'c12_bs_020'], subject: 'business_studies', classLevel: 12, component: Sim0599 },
  { id: 'c12_chemistryadsorptionisotherms', name: 'Chemistry Adsorptionisotherms', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistryadsorptionisotherm', classLevel: 12, component: Sim0600 },
  { id: 'c12_chemistryaldehydesketonesandca', name: 'Chemistry Aldehydes Ketonesand Carboxylic ACBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistryaldehydesketonesandcarboxylicacbs', classLevel: 12, component: Sim0601 },
  { id: 'c12_chemistryaminesanddiazoniumsal', name: 'Chemistry Aminesand Diazonium Salts CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistryaminesanddiazoniumsaltscbs', classLevel: 12, component: Sim0602 },
  { id: 'c12_chemistrybatteriesandfuelcells', name: 'Chemistry Batteriesandfuelcells', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistrybatteriesandfuelcell', classLevel: 12, component: Sim0603 },
  { id: 'c12_chemistrybiomoleculescbse', name: 'Chemistry Biomolecules CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistrybiomoleculescbs', classLevel: 12, component: Sim0604 },
  { id: 'c12_chemistrychemicalkinetics', name: 'Chemistry Chemical Kinetics', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistrychemicalkinetic', classLevel: 12, component: Sim0605 },
  { id: 'c12_chemistrycolourandmagneticprop', name: 'Chemistry Colourandmagneticpropertiesofcomplexes', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistrycolourandmagneticpropertiesofcomplexe', classLevel: 12, component: Sim0606 },
  { id: 'c12_chemistrycoordinationcompounds', name: 'Chemistry Coordination Compounds CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistrycoordinationcompoundscbs', classLevel: 12, component: Sim0607 },
  { id: 'c12_chemistrydiazoniumsalts', name: 'Chemistry Diazoniumsalts', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistrydiazoniumsalt', classLevel: 12, component: Sim0608 },
  { id: 'c12_chemistrydrugtargetinteraction', name: 'Chemistry Drugtargetinteraction', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistrydrugtargetinteractio', classLevel: 12, component: Sim0609 },
  { id: 'c12_chemistryelectrochemistrycbse', name: 'Chemistry Electrochemistry CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistryelectrochemistrycbs', classLevel: 12, component: Sim0610 },
  { id: 'c12_chemistrygeneralprinciplesandp', name: 'Chemistry General Principles And Processes Of', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistrygeneralprinciplesandprocesseso', classLevel: 12, component: Sim0611 },
  { id: 'c12_chemistryhaloalkanesandhaloare', name: 'Chemistry Haloalkanesand Haloarenes CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistryhaloalkanesandhaloarenescbs', classLevel: 12, component: Sim0612 },
  { id: 'c12_chemistryidealandnonidealsolut', name: 'Chemistry Idealandnonidealsolutions', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistryidealandnonidealsolution', classLevel: 12, component: Sim0613 },
  { id: 'c12_chemistryphenols', name: 'Chemistry Phenols', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistryphenol', classLevel: 12, component: Sim0614 },
  { id: 'c12_chemistrysolidstatecharacteris', name: 'Chemistry Solidstatecharacteristics', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistrysolidstatecharacteristic', classLevel: 12, component: Sim0615 },
  { id: 'c12_chemistrysolutionscbse', name: 'Chemistry Solutions CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistrysolutionscbs', classLevel: 12, component: Sim0616 },
  { id: 'c12_chemistrytransitionmetalstrend', name: 'Chemistry Transitionmetalstrends', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistrytransitionmetalstrend', classLevel: 12, component: Sim0617 },
  { id: 'c12_chemistryusesofmetalsandalloys', name: 'Chemistry Usesofmetalsandalloys', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistryusesofmetalsandalloy', classLevel: 12, component: Sim0618 },
  { id: 'c12_chemistrywilliamsonethersynthe', name: 'Chemistry Williamsonethersynthesis', emoji: '📚', color: '#64748B', nodeIds: ['c12_chem_extra_001'], subject: 'chemistrywilliamsonethersynthesi', classLevel: 12, component: Sim0619 },
  { id: 'c12_commercebonusissuerights', name: 'Commerce Bonus Issue Rights', emoji: '💼', color: '#8B5CF6', nodeIds: ['c12_comm_031', 'c12_comm_032', 'c12_comm_033', 'c12_comm_034', 'c12_comm_035', 'c12_comm_036', 'c12_comm_037', 'c12_comm_038', 'c12_comm_039', 'c12_comm_040'], subject: 'commerce', classLevel: 12, component: Sim0620 },
  { id: 'c12_commercebusinessenvironmentmea', name: 'Commerce Business Environment Meaning', emoji: '💼', color: '#8B5CF6', nodeIds: ['c12_comm_001', 'c12_comm_002', 'c12_comm_003', 'c12_comm_004', 'c12_comm_005', 'c12_comm_006', 'c12_comm_007', 'c12_comm_008', 'c12_comm_009', 'c12_comm_010'], subject: 'commerce', classLevel: 12, component: Sim0621 },
  { id: 'c12_commercecomparisontaylorfayol', name: 'Commerce Comparison Taylor Fayol', emoji: '💼', color: '#8B5CF6', nodeIds: ['c12_comm_011', 'c12_comm_012', 'c12_comm_013', 'c12_comm_014', 'c12_comm_015', 'c12_comm_016', 'c12_comm_017', 'c12_comm_018', 'c12_comm_019', 'c12_comm_020'], subject: 'commerce', classLevel: 12, component: Sim0622 },
  { id: 'c12_commercedigitalmarketingsocial', name: 'Commerce Digital Marketing Social', emoji: '💼', color: '#8B5CF6', nodeIds: ['c12_comm_051', 'c12_comm_052', 'c12_comm_053', 'c12_comm_054', 'c12_comm_055'], subject: 'commerce', classLevel: 12, component: Sim0623 },
  { id: 'c12_commercedirectingmeaningimport', name: 'Commerce Directing Meaning Importance', emoji: '💼', color: '#8B5CF6', nodeIds: ['c12_comm_021', 'c12_comm_022', 'c12_comm_023', 'c12_comm_024', 'c12_comm_025', 'c12_comm_026', 'c12_comm_027', 'c12_comm_028', 'c12_comm_029', 'c12_comm_030'], subject: 'commerce', classLevel: 12, component: Sim0624 },
  { id: 'c12_commercemarketsmeaningtypes', name: 'Commerce Markets Meaning Types', emoji: '💼', color: '#8B5CF6', nodeIds: ['c12_comm_041', 'c12_comm_042', 'c12_comm_043', 'c12_comm_044', 'c12_comm_045', 'c12_comm_046', 'c12_comm_047', 'c12_comm_048', 'c12_comm_049', 'c12_comm_050'], subject: 'commerce', classLevel: 12, component: Sim0625 },
  { id: 'c12_computerscienceadvancedboolean', name: 'Computer Science Advanced Boolean Algebra', emoji: '💻', color: '#6366F1', nodeIds: ['c12_cs_001', 'c12_cs_002', 'c12_cs_003', 'c12_cs_004', 'c12_cs_005', 'c12_cs_006', 'c12_cs_007', 'c12_cs_008', 'c12_cs_009', 'c12_cs_010'], subject: 'computer_science', classLevel: 12, component: Sim0626 },
  { id: 'c12_computersciencebinarysearchtre', name: 'Computer Science Binary Search Tree', emoji: '💻', color: '#6366F1', nodeIds: ['c12_cs_011', 'c12_cs_012', 'c12_cs_013', 'c12_cs_014', 'c12_cs_015', 'c12_cs_016', 'c12_cs_017', 'c12_cs_018', 'c12_cs_019', 'c12_cs_020'], subject: 'computer_science', classLevel: 12, component: Sim0627 },
  { id: 'c12_computersciencedatabasenormali', name: 'Computer Science Database Normalization1nf', emoji: '💻', color: '#6366F1', nodeIds: ['c12_cs_031', 'c12_cs_032', 'c12_cs_033', 'c12_cs_034', 'c12_cs_035', 'c12_cs_036', 'c12_cs_037', 'c12_cs_038', 'c12_cs_039', 'c12_cs_040'], subject: 'computer_science', classLevel: 12, component: Sim0628 },
  { id: 'c12_computersciencefinalrevisionco', name: 'Computer Science Final Revision Complete', emoji: '💻', color: '#6366F1', nodeIds: ['c12_cs_081', 'c12_cs_082', 'c12_cs_083', 'c12_cs_084', 'c12_cs_085'], subject: 'computer_science', classLevel: 12, component: Sim0629 },
  { id: 'c12_computersciencejavaprojectbank', name: 'Computer Science Java Project Banking', emoji: '💻', color: '#6366F1', nodeIds: ['c12_cs_051', 'c12_cs_052', 'c12_cs_053', 'c12_cs_054', 'c12_cs_055', 'c12_cs_056', 'c12_cs_057', 'c12_cs_058', 'c12_cs_059', 'c12_cs_060'], subject: 'computer_science', classLevel: 12, component: Sim0630 },
  { id: 'c12_computersciencejavastreamfilte', name: 'Computer Science Java Stream Filter', emoji: '💻', color: '#6366F1', nodeIds: ['c12_cs_021', 'c12_cs_022', 'c12_cs_023', 'c12_cs_024', 'c12_cs_025', 'c12_cs_026', 'c12_cs_027', 'c12_cs_028', 'c12_cs_029', 'c12_cs_030'], subject: 'computer_science', classLevel: 12, component: Sim0631 },
  { id: 'c12_computersciencenetworksecurity', name: 'Computer Science Network Security Cryptography', emoji: '💻', color: '#6366F1', nodeIds: ['c12_cs_041', 'c12_cs_042', 'c12_cs_043', 'c12_cs_044', 'c12_cs_045', 'c12_cs_046', 'c12_cs_047', 'c12_cs_048', 'c12_cs_049', 'c12_cs_050'], subject: 'computer_science', classLevel: 12, component: Sim0632 },
  { id: 'c12_computerscienceoperatingsystem', name: 'Computer Science Operating System Internals', emoji: '💻', color: '#6366F1', nodeIds: ['c12_cs_071', 'c12_cs_072', 'c12_cs_073', 'c12_cs_074', 'c12_cs_075', 'c12_cs_076', 'c12_cs_077', 'c12_cs_078', 'c12_cs_079', 'c12_cs_080'], subject: 'computer_science', classLevel: 12, component: Sim0633 },
  { id: 'c12_computersciencesoftwaretesting', name: 'Computer Science Software Testing Unit', emoji: '💻', color: '#6366F1', nodeIds: ['c12_cs_061', 'c12_cs_062', 'c12_cs_063', 'c12_cs_064', 'c12_cs_065', 'c12_cs_066', 'c12_cs_067', 'c12_cs_068', 'c12_cs_069', 'c12_cs_070'], subject: 'computer_science', classLevel: 12, component: Sim0634 },
  { id: 'c12_computersciencecomputernetwork', name: 'Computer Science Computer Networks', emoji: '📚', color: '#64748B', nodeIds: ['c12_comp_extra_001'], subject: 'computersciencecomputernetwork', classLevel: 12, component: Sim0635 },
  { id: 'c12_computersciencepacketjourney', name: 'Computer Science Packet Journey', emoji: '📚', color: '#64748B', nodeIds: ['c12_comp_extra_001'], subject: 'computersciencepacketjourne', classLevel: 12, component: Sim0636 },
  { id: 'c12_ecoconsumerbehaviourcbse', name: 'Eco Consumer Behaviour CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_ecoc_xc6__001'], subject: 'ecoconsumerbehaviourcbs', classLevel: 12, component: Sim0637 },
  { id: 'c12_ecogovernmentbudgetcbse', name: 'Eco Government Budget CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_ecog_xc6__001'], subject: 'ecogovernmentbudgetcbs', classLevel: 12, component: Sim0638 },
  { id: 'c12_ecomarketequilibriumcbse', name: 'Eco Market Equilibrium CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_ecom_xc6__001'], subject: 'ecomarketequilibriumcbs', classLevel: 12, component: Sim0639 },
  { id: 'c12_econationalincomecbse', name: 'Eco National Income CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_econ_xc6__001'], subject: 'econationalincomecbs', classLevel: 12, component: Sim0640 },
  { id: 'c12_economicscircularflowincome', name: 'Economics Circular Flow Income', emoji: '📊', color: '#F59E0B', nodeIds: ['c12_econ_081', 'c12_econ_082', 'c12_econ_083', 'c12_econ_084', 'c12_econ_085', 'c12_econ_086', 'c12_econ_087', 'c12_econ_088', 'c12_econ_089', 'c12_econ_090', 'c12_econ_091'], subject: 'economics', classLevel: 12, component: Sim0641 },
  { id: 'c12_economicscrosselasticitydemand', name: 'Economics Cross Elasticity Demand', emoji: '📊', color: '#F59E0B', nodeIds: ['c12_econ_021', 'c12_econ_022', 'c12_econ_023', 'c12_econ_024', 'c12_econ_025', 'c12_econ_026', 'c12_econ_027', 'c12_econ_028', 'c12_econ_029', 'c12_econ_030'], subject: 'economics', classLevel: 12, component: Sim0642 },
  { id: 'c12_economicsdemandmeaningtypes', name: 'Economics Demand Meaning Types', emoji: '📊', color: '#F59E0B', nodeIds: ['c12_econ_001', 'c12_econ_002', 'c12_econ_003', 'c12_econ_004', 'c12_econ_005', 'c12_econ_006', 'c12_econ_007', 'c12_econ_008', 'c12_econ_009', 'c12_econ_010'], subject: 'economics', classLevel: 12, component: Sim0643 },
  { id: 'c12_economicsequimarginalutilityst', name: 'Economics Equimarginal Utility Statement', emoji: '📊', color: '#F59E0B', nodeIds: ['c12_econ_011', 'c12_econ_012', 'c12_econ_013', 'c12_econ_014', 'c12_econ_015', 'c12_econ_016', 'c12_econ_017', 'c12_econ_018', 'c12_econ_019', 'c12_econ_020'], subject: 'economics', classLevel: 12, component: Sim0644 },
  { id: 'c12_economicsexanteplanneddemand', name: 'Economics Exanteplanned Demand', emoji: '📊', color: '#F59E0B', nodeIds: ['c12_econ_041', 'c12_econ_042', 'c12_econ_043', 'c12_econ_044', 'c12_econ_045', 'c12_econ_046', 'c12_econ_047', 'c12_econ_048', 'c12_econ_049', 'c12_econ_050'], subject: 'economics', classLevel: 12, component: Sim0645 },
  { id: 'c12_economicsmarketmechanismequili', name: 'Economics Market Mechanism Equilibrium', emoji: '📊', color: '#F59E0B', nodeIds: ['c12_econ_031', 'c12_econ_032', 'c12_econ_033', 'c12_econ_034', 'c12_econ_035', 'c12_econ_036', 'c12_econ_037', 'c12_econ_038', 'c12_econ_039', 'c12_econ_040'], subject: 'economics', classLevel: 12, component: Sim0646 },
  { id: 'c12_economicsmoneymeaningkinds', name: 'Economics Money Meaning Kinds', emoji: '📊', color: '#F59E0B', nodeIds: ['c12_econ_051', 'c12_econ_052', 'c12_econ_053', 'c12_econ_054', 'c12_econ_055', 'c12_econ_056', 'c12_econ_057', 'c12_econ_058', 'c12_econ_059', 'c12_econ_060'], subject: 'economics', classLevel: 12, component: Sim0647 },
  { id: 'c12_economicspublicrevenuemeaning', name: 'Economics Public Revenue Meaning', emoji: '📊', color: '#F59E0B', nodeIds: ['c12_econ_071', 'c12_econ_072', 'c12_econ_073', 'c12_econ_074', 'c12_econ_075', 'c12_econ_076', 'c12_econ_077', 'c12_econ_078', 'c12_econ_079', 'c12_econ_080'], subject: 'economics', classLevel: 12, component: Sim0648 },
  { id: 'c12_economicsquantitativemethodscr', name: 'Economics Quantitative Methods Credit', emoji: '📊', color: '#F59E0B', nodeIds: ['c12_econ_061', 'c12_econ_062', 'c12_econ_063', 'c12_econ_064', 'c12_econ_065', 'c12_econ_066', 'c12_econ_067', 'c12_econ_068', 'c12_econ_069', 'c12_econ_070'], subject: 'economics', classLevel: 12, component: Sim0649 },
  { id: 'c12_ecoopeneconomymacrocbse', name: 'Eco Open Economy Macro CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_ecoo_xc6__001'], subject: 'ecoopeneconomymacrocbs', classLevel: 12, component: Sim0650 },
  { id: 'c12_evsmodernschoolsecological', name: 'EVSModern Schools Ecological', emoji: '🌱', color: '#84CC16', nodeIds: ['c12_evs_001', 'c12_evs_002', 'c12_evs_003', 'c12_evs_004', 'c12_evs_005', 'c12_evs_006', 'c12_evs_007', 'c12_evs_008', 'c12_evs_009', 'c12_evs_010'], subject: 'evs', classLevel: 12, component: Sim0651 },
  { id: 'c12_evsmonitoringatmospherequality', name: 'EVSMonitoring Atmosphere Quality', emoji: '🌱', color: '#84CC16', nodeIds: ['c12_evs_011', 'c12_evs_012', 'c12_evs_013', 'c12_evs_014', 'c12_evs_015', 'c12_evs_016', 'c12_evs_017', 'c12_evs_018', 'c12_evs_019', 'c12_evs_020', 'c12_evs_021', 'c12_evs_022'], subject: 'evs', classLevel: 12, component: Sim0652 },
  { id: 'c12_geographydroughtsfloods', name: 'Geography Droughts Floods', emoji: '🌍', color: '#FBBF24', nodeIds: ['c12_geo_011', 'c12_geo_012', 'c12_geo_013', 'c12_geo_014', 'c12_geo_015', 'c12_geo_016', 'c12_geo_017', 'c12_geo_018', 'c12_geo_019', 'c12_geo_020'], subject: 'geography', classLevel: 12, component: Sim0653 },
  { id: 'c12_geographyindialocationalsettin', name: 'Geography India Locational Setting', emoji: '🌍', color: '#FBBF24', nodeIds: ['c12_geo_001', 'c12_geo_002', 'c12_geo_003', 'c12_geo_004', 'c12_geo_005', 'c12_geo_006', 'c12_geo_007', 'c12_geo_008', 'c12_geo_009', 'c12_geo_010'], subject: 'geography', classLevel: 12, component: Sim0654 },
  { id: 'c12_geographyindustriesagrobased', name: 'Geography Industries Agrobased', emoji: '🌍', color: '#FBBF24', nodeIds: ['c12_geo_031', 'c12_geo_032', 'c12_geo_033', 'c12_geo_034', 'c12_geo_035'], subject: 'geography', classLevel: 12, component: Sim0655 },
  { id: 'c12_geographywaterresourcesirrigat', name: 'Geography Water Resources Irrigation', emoji: '🌍', color: '#FBBF24', nodeIds: ['c12_geo_021', 'c12_geo_022', 'c12_geo_023', 'c12_geo_024', 'c12_geo_025', 'c12_geo_026', 'c12_geo_027', 'c12_geo_028', 'c12_geo_029', 'c12_geo_030'], subject: 'geography', classLevel: 12, component: Sim0656 },
  { id: 'c12_geographygraphicalrepresentati', name: 'Geography Graphical Representation', emoji: '📚', color: '#64748B', nodeIds: ['c12_geog_extra_001'], subject: 'geographygraphicalrepresentatio', classLevel: 12, component: Sim0657 },
  { id: 'c12_geographyhumansettlements', name: 'Geography Human Settlements', emoji: '📚', color: '#64748B', nodeIds: ['c12_geog_extra_001'], subject: 'geographyhumansettlement', classLevel: 12, component: Sim0658 },
  { id: 'c12_geographyselectedissues', name: 'Geography Selected Issues', emoji: '📚', color: '#64748B', nodeIds: ['c12_geog_extra_001'], subject: 'geographyselectedissue', classLevel: 12, component: Sim0659 },
  { id: 'c12_geographytertiaryquaternary', name: 'Geography Tertiary Quaternary', emoji: '📚', color: '#64748B', nodeIds: ['c12_geog_extra_001'], subject: 'geographytertiaryquaternar', classLevel: 12, component: Sim0660 },
  { id: 'c12_geohumandevelopmentcbse', name: 'Geo Human Development CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_geoh_xc6__001'], subject: 'geohumandevelopmentcbs', classLevel: 12, component: Sim0661 },
  { id: 'c12_geointernationaltradecbse', name: 'Geo International Trade CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_geoi_xc6__001'], subject: 'geointernationaltradecbs', classLevel: 12, component: Sim0662 },
  { id: 'c12_geolandresourcesagriculturecbs', name: 'Geo Land Resources Agriculture CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_geol_xc6__001'], subject: 'geolandresourcesagriculturecbs', classLevel: 12, component: Sim0663 },
  { id: 'c12_geoplanningsustainabledevcbse', name: 'Geo Planning Sustainable Dev CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_geop_xc6__001'], subject: 'geoplanningsustainabledevcbs', classLevel: 12, component: Sim0664 },
  { id: 'c12_geopopulationdistributioncbse', name: 'Geo Population Distribution CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_geop_xc6__001'], subject: 'geopopulationdistributioncbs', classLevel: 12, component: Sim0665 },
  { id: 'c12_geotransportcommunicationcbse', name: 'Geo Transport Communication CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_geot_xc6__001'], subject: 'geotransportcommunicationcbs', classLevel: 12, component: Sim0666 },
  { id: 'c12_historyantidowrymovement1970s', name: 'History Antidowry Movement1970s', emoji: '📜', color: '#A78BFA', nodeIds: ['c12_hist_031', 'c12_hist_032', 'c12_hist_033', 'c12_hist_034', 'c12_hist_035', 'c12_hist_036', 'c12_hist_037', 'c12_hist_038', 'c12_hist_039', 'c12_hist_040'], subject: 'history_civics', classLevel: 12, component: Sim0667 },
  { id: 'c12_historyaugustoffer1940', name: 'History August Offer1940', emoji: '📜', color: '#A78BFA', nodeIds: ['c12_hist_001', 'c12_hist_002', 'c12_hist_003', 'c12_hist_004', 'c12_hist_005', 'c12_hist_006', 'c12_hist_007', 'c12_hist_008', 'c12_hist_009', 'c12_hist_010'], subject: 'history_civics', classLevel: 12, component: Sim0668 },
  { id: 'c12_historycivilrightsmovement', name: 'History Civil Rights Movement', emoji: '📜', color: '#A78BFA', nodeIds: ['c12_hist_051', 'c12_hist_052', 'c12_hist_053', 'c12_hist_054', 'c12_hist_055', 'c12_hist_056', 'c12_hist_057', 'c12_hist_058', 'c12_hist_059', 'c12_hist_060', 'c12_hist_061'], subject: 'history_civics', classLevel: 12, component: Sim0669 },
  { id: 'c12_historyfirstgeneralelection', name: 'History First General Election', emoji: '📜', color: '#A78BFA', nodeIds: ['c12_hist_011', 'c12_hist_012', 'c12_hist_013', 'c12_hist_014', 'c12_hist_015', 'c12_hist_016', 'c12_hist_017', 'c12_hist_018', 'c12_hist_019', 'c12_hist_020'], subject: 'history_civics', classLevel: 12, component: Sim0670 },
  { id: 'c12_historyghana19571966background', name: 'History Ghana19571966Background', emoji: '📜', color: '#A78BFA', nodeIds: ['c12_hist_041', 'c12_hist_042', 'c12_hist_043', 'c12_hist_044', 'c12_hist_045', 'c12_hist_046', 'c12_hist_047', 'c12_hist_048', 'c12_hist_049', 'c12_hist_050'], subject: 'history_civics', classLevel: 12, component: Sim0671 },
  { id: 'c12_historypunjabcrisisakali', name: 'History Punjab Crisis Akali', emoji: '📜', color: '#A78BFA', nodeIds: ['c12_hist_021', 'c12_hist_022', 'c12_hist_023', 'c12_hist_024', 'c12_hist_025', 'c12_hist_026', 'c12_hist_027', 'c12_hist_028', 'c12_hist_029', 'c12_hist_030'], subject: 'history_civics', classLevel: 12, component: Sim0672 },
  { id: 'c12_historybhaktisufitraditions', name: 'History Bhakti Sufi Traditions', emoji: '📚', color: '#64748B', nodeIds: ['c12_hist_extra_001'], subject: 'historybhaktisufitradition', classLevel: 12, component: Sim0673 },
  { id: 'c12_historycolonialismcountryside', name: 'History Colonialism Countryside', emoji: '📚', color: '#64748B', nodeIds: ['c12_hist_extra_001'], subject: 'historycolonialismcountrysid', classLevel: 12, component: Sim0674 },
  { id: 'c12_historymeerutmutiny', name: 'History Meerut Mutiny', emoji: '📚', color: '#64748B', nodeIds: ['c12_hist_extra_001'], subject: 'historymeerutmutin', classLevel: 12, component: Sim0675 },
  { id: 'c12_historypeasantszamindarsstate', name: 'History Peasants Zamindars State', emoji: '📚', color: '#64748B', nodeIds: ['c12_hist_extra_001'], subject: 'historypeasantszamindarsstat', classLevel: 12, component: Sim0676 },
  { id: 'c12_historythinkersbeliefsbuilding', name: 'History Thinkers Beliefs Buildings', emoji: '📚', color: '#64748B', nodeIds: ['c12_hist_extra_001'], subject: 'historythinkersbeliefsbuilding', classLevel: 12, component: Sim0677 },
  { id: 'c12_homescienceissuesconcernsadole', name: 'Home Science Issues Concerns Adolescents', emoji: '🏠', color: '#EC4899', nodeIds: ['c12_home_021', 'c12_home_022', 'c12_home_023', 'c12_home_024', 'c12_home_025', 'c12_home_026', 'c12_home_027', 'c12_home_028', 'c12_home_029', 'c12_home_030', 'c12_home_031', 'c12_home_032'], subject: 'home_science', classLevel: 12, component: Sim0678 },
  { id: 'c12_homescienceprinciplesmethodsco', name: 'Home Science Principles Methods Cooking', emoji: '🏠', color: '#EC4899', nodeIds: ['c12_home_001', 'c12_home_002', 'c12_home_003', 'c12_home_004', 'c12_home_005', 'c12_home_006', 'c12_home_007', 'c12_home_008', 'c12_home_009', 'c12_home_010'], subject: 'home_science', classLevel: 12, component: Sim0679 },
  { id: 'c12_homesciencespecialdietsfever', name: 'Home Science Special Diets Fever', emoji: '🏠', color: '#EC4899', nodeIds: ['c12_home_011', 'c12_home_012', 'c12_home_013', 'c12_home_014', 'c12_home_015', 'c12_home_016', 'c12_home_017', 'c12_home_018', 'c12_home_019', 'c12_home_020'], subject: 'home_science', classLevel: 12, component: Sim0680 },
  { id: 'c12_homesciencedevcommjournalism', name: 'Home Science Dev Comm Journalism', emoji: '📚', color: '#64748B', nodeIds: ['c12_home_extra_001'], subject: 'homesciencedevcommjournalis', classLevel: 12, component: Sim0681 },
  { id: 'c12_homesciencefabriccaredecision', name: 'Home Science Fabric Care Decision', emoji: '📚', color: '#64748B', nodeIds: ['c12_home_extra_001'], subject: 'homesciencefabriccaredecisio', classLevel: 12, component: Sim0682 },
  { id: 'c12_homesciencesupportservices', name: 'Home Science Support Services', emoji: '📚', color: '#64748B', nodeIds: ['c12_home_extra_001'], subject: 'homesciencesupportservice', classLevel: 12, component: Sim0683 },
  { id: 'c12_informaticspracticessqlfunctio', name: 'Informatics Practices SQLFunctions', emoji: '📚', color: '#64748B', nodeIds: ['c12_info_extra_001'], subject: 'informaticspracticessqlfunction', classLevel: 12, component: Sim0684 },
  { id: 'c12_legalstudiesnaturedefinitionto', name: 'Legal Studies Nature Definition Tort', emoji: '⚖️', color: '#7C3AED', nodeIds: ['c12_legal_011', 'c12_legal_012', 'c12_legal_013', 'c12_legal_014', 'c12_legal_015', 'c12_legal_016', 'c12_legal_017', 'c12_legal_018', 'c12_legal_019', 'c12_legal_020'], subject: 'legal_studies', classLevel: 12, component: Sim0685 },
  { id: 'c12_legalstudiesstageselementscrim', name: 'Legal Studies Stages Elements Crime', emoji: '⚖️', color: '#7C3AED', nodeIds: ['c12_legal_001', 'c12_legal_002', 'c12_legal_003', 'c12_legal_004', 'c12_legal_005', 'c12_legal_006', 'c12_legal_007', 'c12_legal_008', 'c12_legal_009', 'c12_legal_010'], subject: 'legal_studies', classLevel: 12, component: Sim0686 },
  { id: 'c12_massmediacameraanglescloseup', name: 'Mass Media Camera Angles Closeup', emoji: '📺', color: '#EF4444', nodeIds: ['c12_massmedia_011', 'c12_massmedia_012', 'c12_massmedia_013', 'c12_massmedia_014', 'c12_massmedia_015', 'c12_massmedia_016', 'c12_massmedia_017', 'c12_massmedia_018', 'c12_massmedia_019', 'c12_massmedia_020'], subject: 'mass_media', classLevel: 12, component: Sim0687 },
  { id: 'c12_massmediaculturecommunicationw', name: 'Mass Media Culture Communication What', emoji: '📺', color: '#EF4444', nodeIds: ['c12_massmedia_001', 'c12_massmedia_002', 'c12_massmedia_003', 'c12_massmedia_004', 'c12_massmedia_005', 'c12_massmedia_006', 'c12_massmedia_007', 'c12_massmedia_008', 'c12_massmedia_009', 'c12_massmedia_010'], subject: 'mass_media', classLevel: 12, component: Sim0688 },
  { id: 'c12_massmediarolesocialmedia', name: 'Mass Media Role Social Media', emoji: '📺', color: '#EF4444', nodeIds: ['c12_massmedia_021', 'c12_massmedia_022', 'c12_massmedia_023', 'c12_massmedia_024', 'c12_massmedia_025', 'c12_massmedia_026', 'c12_massmedia_027', 'c12_massmedia_028'], subject: 'mass_media', classLevel: 12, component: Sim0689 },
  { id: 'c12_mathematicschapter9differentia', name: 'Mathematics Chapter9Differential Equations', emoji: '📚', color: '#64748B', nodeIds: ['c12_math_extra_001'], subject: 'mathematicschapter', classLevel: 12, component: Sim0690 },
  { id: 'c12_mathematicscontinuityanddiffer', name: 'Mathematics Continuity And Differentiability', emoji: '📚', color: '#64748B', nodeIds: ['c12_math_extra_001'], subject: 'mathematicscontinuityanddifferentiabilit', classLevel: 12, component: Sim0691 },
  { id: 'c12_mathematicsdeterminants', name: 'Mathematics Determinants', emoji: '📚', color: '#64748B', nodeIds: ['c12_math_extra_001'], subject: 'mathematicsdeterminant', classLevel: 12, component: Sim0692 },
  { id: 'c12_mathematicslinearprogramming', name: 'Mathematics Linear Programming', emoji: '📚', color: '#64748B', nodeIds: ['c12_math_extra_001'], subject: 'mathematicslinearprogrammin', classLevel: 12, component: Sim0693 },
  { id: 'c12_appliedmathsadjointinversematr', name: 'Applied Maths Adjoint Inverse Matrix', emoji: '📐', color: '#3B82F6', nodeIds: ['c12_appmath_021', 'c12_appmath_022', 'c12_appmath_023', 'c12_appmath_024', 'c12_appmath_025', 'c12_appmath_026', 'c12_appmath_027', 'c12_appmath_028', 'c12_appmath_029', 'c12_appmath_030'], subject: 'maths', classLevel: 12, component: Sim0694 },
  { id: 'c12_appliedmathsapplicationcalculu', name: 'Applied Maths Application Calculus Sketching', emoji: '📐', color: '#3B82F6', nodeIds: ['c12_appmath_041', 'c12_appmath_042', 'c12_appmath_043', 'c12_appmath_044', 'c12_appmath_045', 'c12_appmath_046', 'c12_appmath_047', 'c12_appmath_048', 'c12_appmath_049', 'c12_appmath_050'], subject: 'maths', classLevel: 12, component: Sim0695 },
  { id: 'c12_appliedmathsfinancialmathemati', name: 'Applied Maths Financial Mathematics Calculation', emoji: '📐', color: '#3B82F6', nodeIds: ['c12_appmath_061', 'c12_appmath_062', 'c12_appmath_063', 'c12_appmath_064', 'c12_appmath_065', 'c12_appmath_066', 'c12_appmath_067', 'c12_appmath_068'], subject: 'maths', classLevel: 12, component: Sim0696 },
  { id: 'c12_appliedmathsmatricesconceptnot', name: 'Applied Maths Matrices Concept Notation', emoji: '📐', color: '#3B82F6', nodeIds: ['c12_appmath_011', 'c12_appmath_012', 'c12_appmath_013', 'c12_appmath_014', 'c12_appmath_015', 'c12_appmath_016', 'c12_appmath_017', 'c12_appmath_018', 'c12_appmath_019', 'c12_appmath_020'], subject: 'maths', classLevel: 12, component: Sim0697 },
  { id: 'c12_appliedmathsrandomvariableprob', name: 'Applied Maths Random Variable Probability', emoji: '📐', color: '#3B82F6', nodeIds: ['c12_appmath_051', 'c12_appmath_052', 'c12_appmath_053', 'c12_appmath_054', 'c12_appmath_055', 'c12_appmath_056', 'c12_appmath_057', 'c12_appmath_058', 'c12_appmath_059', 'c12_appmath_060'], subject: 'maths', classLevel: 12, component: Sim0698 },
  { id: 'c12_appliedmathsratechangequantiti', name: 'Applied Maths Rate Change Quantities', emoji: '📐', color: '#3B82F6', nodeIds: ['c12_appmath_031', 'c12_appmath_032', 'c12_appmath_033', 'c12_appmath_034', 'c12_appmath_035', 'c12_appmath_036', 'c12_appmath_037', 'c12_appmath_038', 'c12_appmath_039', 'c12_appmath_040'], subject: 'maths', classLevel: 12, component: Sim0699 },
  { id: 'c12_appliedmathstypesrelationsrefl', name: 'Applied Maths Types Relations Reflexive', emoji: '📐', color: '#3B82F6', nodeIds: ['c12_appmath_001', 'c12_appmath_002', 'c12_appmath_003', 'c12_appmath_004', 'c12_appmath_005', 'c12_appmath_006', 'c12_appmath_007', 'c12_appmath_008', 'c12_appmath_009', 'c12_appmath_010'], subject: 'maths', classLevel: 12, component: Sim0700 },
  { id: 'c12_mathematicsareaundersimple', name: 'Mathematics Area Under Simple', emoji: '📐', color: '#3B82F6', nodeIds: ['c12_math_061', 'c12_math_062', 'c12_math_063', 'c12_math_064', 'c12_math_065', 'c12_math_066', 'c12_math_067', 'c12_math_068', 'c12_math_069', 'c12_math_070'], subject: 'maths', classLevel: 12, component: Sim0701 },
  { id: 'c12_mathematicsconsistencyinconsis', name: 'Mathematics Consistency Inconsistency Systems', emoji: '📐', color: '#3B82F6', nodeIds: ['c12_math_031', 'c12_math_032', 'c12_math_033', 'c12_math_034', 'c12_math_035', 'c12_math_036', 'c12_math_037', 'c12_math_038', 'c12_math_039', 'c12_math_040'], subject: 'maths', classLevel: 12, component: Sim0702 },
  { id: 'c12_mathematicsderivativesparametr', name: 'Mathematics Derivatives Parametric Functions', emoji: '📐', color: '#3B82F6', nodeIds: ['c12_math_041', 'c12_math_042', 'c12_math_043', 'c12_math_044', 'c12_math_045', 'c12_math_046', 'c12_math_047', 'c12_math_048', 'c12_math_049', 'c12_math_050'], subject: 'maths', classLevel: 12, component: Sim0703 },
  { id: 'c12_mathematicsgeometryformsplane', name: 'Mathematics Geometry Forms Plane', emoji: '📐', color: '#3B82F6', nodeIds: ['c12_math_081', 'c12_math_082', 'c12_math_083', 'c12_math_084', 'c12_math_085', 'c12_math_086', 'c12_math_087', 'c12_math_088', 'c12_math_089', 'c12_math_090'], subject: 'maths', classLevel: 12, component: Sim0704 },
  { id: 'c12_mathematicsintegrationtrigonom', name: 'Mathematics Integration Trigonometric Powers', emoji: '📐', color: '#3B82F6', nodeIds: ['c12_math_051', 'c12_math_052', 'c12_math_053', 'c12_math_054', 'c12_math_055', 'c12_math_056', 'c12_math_057', 'c12_math_058', 'c12_math_059', 'c12_math_060'], subject: 'maths', classLevel: 12, component: Sim0705 },
  { id: 'c12_mathematicsinversetrigproperti', name: 'Mathematics Inverse Trig Properties', emoji: '📐', color: '#3B82F6', nodeIds: ['c12_math_011', 'c12_math_012', 'c12_math_013', 'c12_math_014', 'c12_math_015', 'c12_math_016', 'c12_math_017', 'c12_math_018', 'c12_math_019', 'c12_math_020'], subject: 'maths', classLevel: 12, component: Sim0706 },
  { id: 'c12_mathematicsmatrixmultiplicatio', name: 'Mathematics Matrix Multiplication', emoji: '📐', color: '#3B82F6', nodeIds: ['c12_math_021', 'c12_math_022', 'c12_math_023', 'c12_math_024', 'c12_math_025', 'c12_math_026', 'c12_math_027', 'c12_math_028', 'c12_math_029', 'c12_math_030'], subject: 'maths', classLevel: 12, component: Sim0707 },
  { id: 'c12_mathematicstheoremtotalprobabi', name: 'Mathematics Theorem Total Probability', emoji: '📐', color: '#3B82F6', nodeIds: ['c12_math_091', 'c12_math_092', 'c12_math_093', 'c12_math_094', 'c12_math_095', 'c12_math_096', 'c12_math_097', 'c12_math_098', 'c12_math_099', 'c12_math_100'], subject: 'maths', classLevel: 12, component: Sim0708 },
  { id: 'c12_mathematicstypesrelationsrefle', name: 'Mathematics Types Relations Reflexive', emoji: '📐', color: '#3B82F6', nodeIds: ['c12_math_001', 'c12_math_002', 'c12_math_003', 'c12_math_004', 'c12_math_005', 'c12_math_006', 'c12_math_007', 'c12_math_008', 'c12_math_009', 'c12_math_010'], subject: 'maths', classLevel: 12, component: Sim0709 },
  { id: 'c12_mathematicstypesvectorsequal', name: 'Mathematics Types Vectorsequal', emoji: '📐', color: '#3B82F6', nodeIds: ['c12_math_071', 'c12_math_072', 'c12_math_073', 'c12_math_074', 'c12_math_075', 'c12_math_076', 'c12_math_077', 'c12_math_078', 'c12_math_079', 'c12_math_080'], subject: 'maths', classLevel: 12, component: Sim0710 },
  { id: 'c12_mathematicswallisformulareduct', name: 'Mathematics Wallis Formula Reduction', emoji: '📐', color: '#3B82F6', nodeIds: ['c12_math_101', 'c12_math_102', 'c12_math_103', 'c12_math_104', 'c12_math_105', 'c12_math_106', 'c12_math_107', 'c12_math_108', 'c12_math_109'], subject: 'maths', classLevel: 12, component: Sim0711 },
  { id: 'c12_physicsamperescircuital', name: 'Physics Amperes Circuital', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c12_phy_041', 'c12_phy_042', 'c12_phy_043', 'c12_phy_044', 'c12_phy_045', 'c12_phy_046', 'c12_phy_047', 'c12_phy_048', 'c12_phy_049', 'c12_phy_050'], subject: 'physics', classLevel: 12, component: Sim0712 },
  { id: 'c12_physicsbrewsterspolarizationre', name: 'Physics Brewsters Polarization Reflection', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c12_phy_131', 'c12_phy_132', 'c12_phy_133', 'c12_phy_134', 'c12_phy_135', 'c12_phy_136', 'c12_phy_137', 'c12_phy_138', 'c12_phy_139', 'c12_phy_140'], subject: 'physics', classLevel: 12, component: Sim0713 },
  { id: 'c12_physicsdispersionthroughprism', name: 'Physics Dispersion Through Prism', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c12_phy_081', 'c12_phy_082', 'c12_phy_083', 'c12_phy_084', 'c12_phy_085', 'c12_phy_086', 'c12_phy_087', 'c12_phy_088', 'c12_phy_089', 'c12_phy_090'], subject: 'physics', classLevel: 12, component: Sim0714 },
  { id: 'c12_physicselectricchargestypes', name: 'Physics Electric Chargestypes', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c12_phy_001', 'c12_phy_002', 'c12_phy_003', 'c12_phy_004', 'c12_phy_005', 'c12_phy_006', 'c12_phy_007', 'c12_phy_008', 'c12_phy_009', 'c12_phy_010'], subject: 'physics', classLevel: 12, component: Sim0715 },
  { id: 'c12_physicselectricflux', name: 'Physics Electric Flux', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c12_phy_011', 'c12_phy_012', 'c12_phy_013', 'c12_phy_014', 'c12_phy_015', 'c12_phy_016', 'c12_phy_017', 'c12_phy_018', 'c12_phy_019', 'c12_phy_020'], subject: 'physics', classLevel: 12, component: Sim0716 },
  { id: 'c12_physicselectrostaticsystemchar', name: 'Physics Electrostatic System Charges', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c12_phy_021', 'c12_phy_022', 'c12_phy_023', 'c12_phy_024', 'c12_phy_025', 'c12_phy_026', 'c12_phy_027', 'c12_phy_028', 'c12_phy_029', 'c12_phy_030'], subject: 'physics', classLevel: 12, component: Sim0717 },
  { id: 'c12_physicsenergybandssolids', name: 'Physics Energy Bands Solids', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c12_phy_111', 'c12_phy_112', 'c12_phy_113', 'c12_phy_114', 'c12_phy_115', 'c12_phy_116', 'c12_phy_117', 'c12_phy_118', 'c12_phy_119', 'c12_phy_120'], subject: 'physics', classLevel: 12, component: Sim0718 },
  { id: 'c12_physicsenergylevelshydrogen', name: 'Physics Energy Levels Hydrogen', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c12_phy_101', 'c12_phy_102', 'c12_phy_103', 'c12_phy_104', 'c12_phy_105', 'c12_phy_106', 'c12_phy_107', 'c12_phy_108', 'c12_phy_109', 'c12_phy_110'], subject: 'physics', classLevel: 12, component: Sim0719 },
  { id: 'c12_physicsgenerator', name: 'Physics Generator', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c12_phy_071', 'c12_phy_072', 'c12_phy_073', 'c12_phy_074', 'c12_phy_075', 'c12_phy_076', 'c12_phy_077', 'c12_phy_078', 'c12_phy_079', 'c12_phy_080'], subject: 'physics', classLevel: 12, component: Sim0720 },
  { id: 'c12_physicsinternalresistance', name: 'Physics Internal Resistance', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c12_phy_031', 'c12_phy_032', 'c12_phy_033', 'c12_phy_034', 'c12_phy_035', 'c12_phy_036', 'c12_phy_037', 'c12_phy_038', 'c12_phy_039', 'c12_phy_040'], subject: 'physics', classLevel: 12, component: Sim0721 },
  { id: 'c12_physicsmagneticfieldlines', name: 'Physics Magnetic Field Lines', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c12_phy_051', 'c12_phy_052', 'c12_phy_053', 'c12_phy_054', 'c12_phy_055', 'c12_phy_056', 'c12_phy_057', 'c12_phy_058', 'c12_phy_059', 'c12_phy_060'], subject: 'physics', classLevel: 12, component: Sim0722 },
  { id: 'c12_physicsselfinductionselfinduct', name: 'Physics Selfinduction Selfinductance', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c12_phy_061', 'c12_phy_062', 'c12_phy_063', 'c12_phy_064', 'c12_phy_065', 'c12_phy_066', 'c12_phy_067', 'c12_phy_068', 'c12_phy_069', 'c12_phy_070'], subject: 'physics', classLevel: 12, component: Sim0723 },
  { id: 'c12_physicssingleslitdiffraction', name: 'Physics Single Slit Diffraction', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c12_phy_091', 'c12_phy_092', 'c12_phy_093', 'c12_phy_094', 'c12_phy_095', 'c12_phy_096', 'c12_phy_097', 'c12_phy_098', 'c12_phy_099', 'c12_phy_100'], subject: 'physics', classLevel: 12, component: Sim0724 },
  { id: 'c12_physicszenerdiode', name: 'Physics Zener Diode', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c12_phy_121', 'c12_phy_122', 'c12_phy_123', 'c12_phy_124', 'c12_phy_125', 'c12_phy_126', 'c12_phy_127', 'c12_phy_128', 'c12_phy_129', 'c12_phy_130'], subject: 'physics', classLevel: 12, component: Sim0725 },
  { id: 'c12_physicsalternatingcurrentcbse', name: 'Physics Alternating Current CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_phys_extra_001'], subject: 'physicsalternatingcurrentcbs', classLevel: 12, component: Sim0726 },
  { id: 'c12_physicsatoms', name: 'Physics Atoms', emoji: '📚', color: '#64748B', nodeIds: ['c12_phys_extra_001'], subject: 'physicsatom', classLevel: 12, component: Sim0727 },
  { id: 'c12_physicsdualnatureradiationcbse', name: 'Physics Dual Nature Radiation CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_phys_extra_001'], subject: 'physicsdualnatureradiationcbs', classLevel: 12, component: Sim0728 },
  { id: 'c12_physicselectromagneticwavescbs', name: 'Physics Electromagnetic Waves CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_phys_extra_001'], subject: 'physicselectromagneticwavescbs', classLevel: 12, component: Sim0729 },
  { id: 'c12_physicselectrostaticpotentialc', name: 'Physics Electrostatic Potential Capacitance CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_phys_extra_001'], subject: 'physicselectrostaticpotentialcapacitancecbs', classLevel: 12, component: Sim0730 },
  { id: 'c12_physicsmagnetismandmattercbse', name: 'Physics Magnetismand Matter CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_phys_xc6__001'], subject: 'physicsmagnetismandmattercbs', classLevel: 12, component: Sim0731 },
  { id: 'c12_physicsnucleicbse', name: 'Physics Nuclei CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_phys_extra_001'], subject: 'physicsnucleicbs', classLevel: 12, component: Sim0732 },
  { id: 'c12_physicsrayopticsandopticalinst', name: 'Physics Ray Optics And Optical Instruments', emoji: '📚', color: '#64748B', nodeIds: ['c12_phys_extra_001'], subject: 'physicsrayopticsandopticalinstrument', classLevel: 12, component: Sim0733 },
  { id: 'c12_physicssemiconductorelectronic', name: 'Physics Semiconductor Electronics Materials Device', emoji: '📚', color: '#64748B', nodeIds: ['c12_phys_extra_001'], subject: 'physicssemiconductorelectronicsmaterialsdevicesan', classLevel: 12, component: Sim0734 },
  { id: 'c12_politicalsciencemeaningfunctio', name: 'Political Science Meaning Functions Legislature', emoji: '🏛️', color: '#991B1B', nodeIds: ['c12_pol_011', 'c12_pol_012', 'c12_pol_013', 'c12_pol_014', 'c12_pol_015', 'c12_pol_016', 'c12_pol_017', 'c12_pol_018', 'c12_pol_019', 'c12_pol_020'], subject: 'political_science', classLevel: 12, component: Sim0735 },
  { id: 'c12_politicalsciencesalientfeature', name: 'Political Science Salient Features Indian', emoji: '🏛️', color: '#991B1B', nodeIds: ['c12_pol_021', 'c12_pol_022', 'c12_pol_023', 'c12_pol_024', 'c12_pol_025', 'c12_pol_026', 'c12_pol_027', 'c12_pol_028', 'c12_pol_029', 'c12_pol_030', 'c12_pol_031', 'c12_pol_032'], subject: 'political_science', classLevel: 12, component: Sim0736 },
  { id: 'c12_politicalsciencetotalitarianau', name: 'Political Science Totalitarian Authoritarian State', emoji: '🏛️', color: '#991B1B', nodeIds: ['c12_pol_001', 'c12_pol_002', 'c12_pol_003', 'c12_pol_004', 'c12_pol_005', 'c12_pol_006', 'c12_pol_007', 'c12_pol_008', 'c12_pol_009', 'c12_pol_010'], subject: 'political_science', classLevel: 12, component: Sim0737 },
  { id: 'c12_psychologydefinitionintelligen', name: 'Psychology Definition Intelligence Factor', emoji: '🧠', color: '#F472B6', nodeIds: ['c12_psy_001', 'c12_psy_002', 'c12_psy_003', 'c12_psy_004', 'c12_psy_005', 'c12_psy_006', 'c12_psy_007', 'c12_psy_008', 'c12_psy_009', 'c12_psy_010'], subject: 'psychology', classLevel: 12, component: Sim0738 },
  { id: 'c12_psychologyhumanistictraittheor', name: 'Psychology Humanistic Trait Theories', emoji: '🧠', color: '#F472B6', nodeIds: ['c12_psy_011', 'c12_psy_012', 'c12_psy_013', 'c12_psy_014', 'c12_psy_015', 'c12_psy_016', 'c12_psy_017', 'c12_psy_018', 'c12_psy_019', 'c12_psy_020'], subject: 'psychology', classLevel: 12, component: Sim0739 },
  { id: 'c12_psychologymeaningstressnature', name: 'Psychology Meaning Stress Nature', emoji: '🧠', color: '#F472B6', nodeIds: ['c12_psy_021', 'c12_psy_022', 'c12_psy_023', 'c12_psy_024', 'c12_psy_025', 'c12_psy_026', 'c12_psy_027', 'c12_psy_028', 'c12_psy_029', 'c12_psy_030'], subject: 'psychology', classLevel: 12, component: Sim0740 },
  { id: 'c12_psychologypsychotherapypsychoa', name: 'Psychology Psychotherapy Psychoanalysis Clientcent', emoji: '🧠', color: '#F472B6', nodeIds: ['c12_psy_031', 'c12_psy_032', 'c12_psy_033', 'c12_psy_034', 'c12_psy_035', 'c12_psy_036', 'c12_psy_037', 'c12_psy_038', 'c12_psy_039', 'c12_psy_040', 'c12_psy_041'], subject: 'psychology', classLevel: 12, component: Sim0741 },
  { id: 'c12_psypsychologicaldisorderscbse', name: 'Psy Psychological Disorders CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_psyp_xc6__001'], subject: 'psypsychologicaldisorderscbs', classLevel: 12, component: Sim0742 },
  { id: 'c12_psyselfpersonalitycbse', name: 'Psy Self Personality CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_psys_xc6__001'], subject: 'psyselfpersonalitycbs', classLevel: 12, component: Sim0743 },
  { id: 'c12_psytherapeuticapproachescbse', name: 'Psy Therapeutic Approaches CBSE', emoji: '📚', color: '#64748B', nodeIds: ['c12_psyt_xc6__001'], subject: 'psytherapeuticapproachescbs', classLevel: 12, component: Sim0744 },
  { id: 'c12_sociologybeliefsritualssuperst', name: 'Sociology Beliefs Rituals Superstitions', emoji: '👥', color: '#06B6D4', nodeIds: ['c12_soc_011', 'c12_soc_012', 'c12_soc_013', 'c12_soc_014', 'c12_soc_015', 'c12_soc_016', 'c12_soc_017', 'c12_soc_018', 'c12_soc_019', 'c12_soc_020'], subject: 'sociology', classLevel: 12, component: Sim0745 },
  { id: 'c12_sociologydefinitionfeaturessoc', name: 'Sociology Definition Features Social', emoji: '👥', color: '#06B6D4', nodeIds: ['c12_soc_001', 'c12_soc_002', 'c12_soc_003', 'c12_soc_004', 'c12_soc_005', 'c12_soc_006', 'c12_soc_007', 'c12_soc_008', 'c12_soc_009', 'c12_soc_010'], subject: 'sociology', classLevel: 12, component: Sim0746 },
  { id: 'c12_sociologydefinitionfeaturestri', name: 'Sociology Definition Features Tribe', emoji: '👥', color: '#06B6D4', nodeIds: ['c12_soc_021', 'c12_soc_022', 'c12_soc_023', 'c12_soc_024', 'c12_soc_025', 'c12_soc_026', 'c12_soc_027', 'c12_soc_028', 'c12_soc_029', 'c12_soc_030'], subject: 'sociology', classLevel: 12, component: Sim0747 },
  { id: 'c12_sociologysocialchangedevelopme', name: 'Sociology Social Change Development', emoji: '👥', color: '#06B6D4', nodeIds: ['c12_soc_031', 'c12_soc_032', 'c12_soc_033', 'c12_soc_034', 'c12_soc_035'], subject: 'sociology', classLevel: 12, component: Sim0748 },
  { id: 'c12_sociologyconstitutionsocialcha', name: 'Sociology Constitution Social Change', emoji: '📚', color: '#64748B', nodeIds: ['c12_soci_extra_001'], subject: 'sociologyconstitutionsocialchang', classLevel: 12, component: Sim0749 },
  { id: 'c12_sociologyculturalchange', name: 'Sociology Cultural Change', emoji: '📚', color: '#64748B', nodeIds: ['c12_soci_extra_001'], subject: 'sociologyculturalchang', classLevel: 12, component: Sim0750 },
  { id: 'c12_sociologyglobalisation', name: 'Sociology Globalisation', emoji: '📚', color: '#64748B', nodeIds: ['c12_soci_extra_001'], subject: 'sociologyglobalisatio', classLevel: 12, component: Sim0751 },
  { id: 'c12_sociologyintroducingindiansoci', name: 'Sociology Introducing Indian Society', emoji: '📚', color: '#64748B', nodeIds: ['c12_soci_extra_001'], subject: 'sociologyintroducingindiansociet', classLevel: 12, component: Sim0752 },
  { id: 'c11_physicsprojectilemotion', name: 'Physics Projectile Motion', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c11_phys_extra_001'], subject: 'physicsprojectilemotio', classLevel: 11, component: Sim0759 },
  { id: 'c11_physicslawsofmotionfrictio', name: 'Physics Laws of Motion Friction', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c11_phys_extra_001'], subject: 'physicslawsofmotionfrictio', classLevel: 11, component: Sim0760 },
  { id: 'c11_physicsrotationalmotiontorqu', name: 'Physics Rotational Motion Torque', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c11_phys_extra_001'], subject: 'physicsrotationalmotiontorqu', classLevel: 11, component: Sim0761 },
  { id: 'c11_physicsviscosityterminalvelo', name: 'Physics Viscosity Terminal Velocity', emoji: '⚙️', color: '#0EA5E9', nodeIds: ['c11_phys_extra_001'], subject: 'physicsviscosityterminalvelo', classLevel: 11, component: Sim0762 },
  { id: 'c11_chemistrysblockelement', name: 'Chemistry s-Block Elements', emoji: '🧪', color: '#10B981', nodeIds: ['c11_chem_extra_001'], subject: 'chemistrysblockelement', classLevel: 11, component: Sim0763 },
  { id: 'c11_chemistrypblockelement', name: 'Chemistry p-Block Elements', emoji: '🧪', color: '#10B981', nodeIds: ['c11_chem_extra_001'], subject: 'chemistrypblockelement', classLevel: 11, component: Sim0764 },
  { id: 'c11_mathstrigonometricfunction', name: 'Maths Trigonometric Functions', emoji: '📐', color: '#6366F1', nodeIds: ['c11_math_extra_001'], subject: 'mathstrigonometricfunction', classLevel: 11, component: Sim0765 },
  { id: 'c11_mathsrelationsandfunction', name: 'Maths Relations and Functions', emoji: '📐', color: '#6366F1', nodeIds: ['c11_math_extra_001'], subject: 'mathsrelationsandfunction', classLevel: 11, component: Sim0766 },
  { id: 'c11_informaticspracticesdatabasec', name: 'Informatics Practices Database Concepts', emoji: '🗄️', color: '#6366F1', nodeIds: ['c11_info_extra_001'], subject: 'informatics_practices', classLevel: 11, component: Sim0767 },
  { id: 'c11_homesciencefamilycommunityso', name: 'Home Science Understanding Family Community and Society', emoji: '🏠', color: '#EC4899', nodeIds: ['c11_home_extra_001'], subject: 'home_science', classLevel: 11, component: Sim0768 },
  { id: 'c12_informaticspracticespandasse', name: 'Informatics Practices Data Handling Using Pandas I', emoji: '🐍', color: '#6366F1', nodeIds: ['c12_info_extra_001'], subject: 'informatics_practices', classLevel: 12, component: Sim0769 },
  { id: 'c10_sciencelightreflectionrefra', name: 'Science Light Reflection Refraction', emoji: '📚', color: '#64748B', nodeIds: ['c10_scie_extra_001'], subject: 'sciencelightreflectionrefractio', classLevel: 10, component: Sim0770 },
  { id: 'c10_mathspairoflinearequations', name: 'Maths Pair Of Linear Equations', emoji: '📐', color: '#3B82F6', nodeIds: ['c10_math_extra_001'], subject: 'mathspairoflinearequationsintwovariables', classLevel: 10, component: Sim0771 },
  { id: 'c10_mathsarithmeticprogression', name: 'Maths Arithmetic Progressions', emoji: '📐', color: '#3B82F6', nodeIds: ['c10_math_extra_001'], subject: 'mathsarithmeticprogressions', classLevel: 10, component: Sim0772 },
  { id: 'c10_mathsareasrelatedtocircles', name: 'Maths Areas Related To Circles', emoji: '📐', color: '#3B82F6', nodeIds: ['c10_math_extra_001'], subject: 'mathsareasrelatedtocircles', classLevel: 10, component: Sim0773 },
  { id: 'c9_mathsprobability', name: 'Maths Probability', emoji: '📐', color: '#3B82F6', nodeIds: ['c9_math_extra_001'], subject: 'mathsprobabilityexperimental', classLevel: 9, component: Sim0774 },
  { id: 'c8_sciencechemicaleffectselec', name: 'Science Chemical Effects Of Electric Current', emoji: '📚', color: '#64748B', nodeIds: ['c8_scie_extra_001'], subject: 'sciencechemicaleffectsofelectriccurrent', classLevel: 8, component: Sim0775 },
  { id: 'c7_sciencereproductioninplants', name: 'Science Reproduction In Plants', emoji: '📚', color: '#64748B', nodeIds: ['c7_scie_extra_001'], subject: 'sciencereproductioninplants', classLevel: 7, component: Sim0776 },
  { id: 'c7_sciencephysicalchemicalchan', name: 'Science Physical Chemical Changes', emoji: '📚', color: '#64748B', nodeIds: ['c7_scie_extra_001'], subject: 'sciencephysicalchemicalchanges', classLevel: 7, component: Sim0777 },
  { id: 'c6_sciencegettingtoknowplants', name: 'Science Getting To Know Plants', emoji: '📚', color: '#64748B', nodeIds: ['c6_scie_extra_001'], subject: 'sciencegettingtoknowplants', classLevel: 6, component: Sim0778 },
  { id: 'c6_mathspatternsinmathematics', name: 'Maths Patterns In Mathematics', emoji: '📐', color: '#3B82F6', nodeIds: ['c6_math_extra_001'], subject: 'mathspatternsinmathematics', classLevel: 6, component: Sim0779 },
  // ─── Class 10 depth-coverage chapter sims (node depth audit) ───
  { id: 'c10_civicspowersharingbelgiumsril', name: 'Civics Power Sharing Belgium Sri Lanka', emoji: '⚖️', color: '#06B6D4', nodeIds: ['c10_civ_cbse_01_001', 'c10_civ_cbse_01_002', 'c10_civ_cbse_01_003', 'c10_civ_cbse_01_004', 'c10_civ_cbse_01_005', 'c10_civ_cbse_01_006', 'c10_civ_cbse_01_007', 'c10_civ_cbse_01_008'], subject: 'political_science', classLevel: 10, component: Sim0780 },
  { id: 'c10_civicsgenderreligioncaste', name: 'Civics Gender Religion Caste', emoji: '🧕', color: '#EC4899', nodeIds: ['c10_civ_cbse_03_001', 'c10_civ_cbse_03_002', 'c10_civ_cbse_03_003', 'c10_civ_cbse_03_004', 'c10_civ_cbse_03_005', 'c10_civ_cbse_03_006', 'c10_civ_cbse_03_007', 'c10_civ_cbse_03_008'], subject: 'political_science', classLevel: 10, component: Sim0781 },
  { id: 'c10_civicspoliticalparties', name: 'Civics Political Parties', emoji: '🏛️', color: '#F97316', nodeIds: ['c10_civ_cbse_04_001', 'c10_civ_cbse_04_002', 'c10_civ_cbse_04_003', 'c10_civ_cbse_04_004', 'c10_civ_cbse_04_005', 'c10_civ_cbse_04_006', 'c10_civ_cbse_04_007', 'c10_civ_cbse_04_008'], subject: 'political_science', classLevel: 10, component: Sim0782 },
  { id: 'c10_geographywaterresources', name: 'Geography Water Resources', emoji: '💧', color: '#0EA5E9', nodeIds: ['c10_geo_cbse_03_001', 'c10_geo_cbse_03_002', 'c10_geo_cbse_03_003', 'c10_geo_cbse_03_004', 'c10_geo_cbse_03_005', 'c10_geo_cbse_03_006', 'c10_geo_cbse_03_007', 'c10_geo_cbse_03_008'], subject: 'geography', classLevel: 10, component: Sim0783 },
  { id: 'c10_geographylifelinesnationaleco', name: 'Geography Lifelines National Economy', emoji: '🚂', color: '#14B8A6', nodeIds: ['c10_geo_cbse_07_001', 'c10_geo_cbse_07_002', 'c10_geo_cbse_07_003', 'c10_geo_cbse_07_004', 'c10_geo_cbse_07_005', 'c10_geo_cbse_07_006', 'c10_geo_cbse_07_007', 'c10_geo_cbse_07_008', 'c10_geo_cbse_07_009'], subject: 'geography', classLevel: 10, component: Sim0784 },
  { id: 'c10_historymakingofglobalworld', name: 'History Making Of Global World', emoji: '🌍', color: '#F59E0B', nodeIds: ['c10_hist_cbse_03_001', 'c10_hist_cbse_03_002', 'c10_hist_cbse_03_003', 'c10_hist_cbse_03_004', 'c10_hist_cbse_03_005', 'c10_hist_cbse_03_006', 'c10_hist_cbse_03_007', 'c10_hist_cbse_03_008'], subject: 'history', classLevel: 10, component: Sim0785 },
]
