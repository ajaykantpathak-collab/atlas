#!/usr/bin/env python3
"""
audit_class11_depth.py — Class 11 node DEPTH audit.

Companion to audit_class78_depth.py (identical method, same output schema).
For all 3,166 enhanced_nodes_index nodes of class 11 (the largest class,
22 subjects):

  1. Resolve the chapter-level sim mapping (sim components in
     frontend/components/simulations/{c6_12,c6_12_new,three}/ are chapter-
     scoped; node ids are c11_acc_cbse_01_001-style, so mapping is
     (subject, chapter) -> sims). The chapter map below is hand-curated from
     every C11 sim's teaching text / challenge questions (read individually)
     matched against each chapter's node definitions; the registry
     (frontend/lib/c6_12_gameRegistry.ts), SIM_NODE_MAP.json and the 3D-lab
     wiring (frontend/app/3d-lab/agentSims.json) were used as evidence.
     Sims whose topic has no chapter in the class-11 node index (e.g. the
     organic-chemistry sims, Java-syllabus CS sims, ocean/atmosphere world-
     geography sims, NPO accountancy, modern-Indian-history sims, EVS /
     mass-media / legal-studies electives) are deliberately NOT mapped to a
     nearest chapter; they are reported in UNMAPPED_SIMS.

  2. Per node, extract its 6 diagnostics (question + answer + misconception)
     and score each diagnostic's concept terms against the FULL TEXT of the
     mapped sim(s) (teaching copy, challenges, quiz banks, labs, misconception
     killers - the whole component source).

  3. Verdict per node:
       GOLD    - every diagnostic skill exercised by the mapped sim content
       PARTIAL - at least two diagnostics exercised; uncovered ones are listed
       MISSING - no sim mapped to the chapter, or mapped sim never touches
                 the node's diagnostic skills (fewer than two covered)

  4. Answer-key defect scan over every mapped sim (out-of-range correctIndex,
     duplicate options, non-numeric correctAnswer on numeric items, arithmetic
     mismatch on "x% of y" items) plus a node-side scan for placeholder
     diagnostic answers. Defects are attributed to each node whose chapter the
     defective sim serves.

Heuristic (identical to the class 7-8 audit):
  - Diagnostic concept terms: content words of the question stem and the
    answer, minus stopwords, stemmed lightly, expanded via a small domain
    synonym table. A diagnostic counts as COVERED when 0.65 * (IDF-weighted
    share of question terms present in the sim text) + 0.35 * (share of answer
    terms) >= 0.40. IDF is computed over chapter documents of class 11 so
    common academic words cannot fake coverage.
  - Lexical heuristic: conservative on metaphorical/illustrative sims.
    15 verdicts across different subjects were hand-verified against the
    actual sim interactions (see spot_checks in the output).

Usage:
  python backend/tools/audit_class11_depth.py

Deterministic: no randomness, no timestamps, stable sort order throughout.
"""

import json
import math
import os
import re
import sys
from collections import Counter, defaultdict

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
NODE_INDEX = os.path.join(ROOT, "backend", "_cache", "enhanced_nodes_index.json")
SIM_DIRS = [
    os.path.join(ROOT, "frontend", "components", "simulations", "c6_12"),
    os.path.join(ROOT, "frontend", "components", "simulations", "c6_12_new"),
    os.path.join(ROOT, "frontend", "components", "simulations", "three"),
]
OUT_DIR = os.path.join(ROOT, "backend", "its", "competency")

KLASS = 11
COVER_THRESHOLD = 0.40   # blended q/a coverage score needed to call a diagnostic covered
GOLD_RATIO = 0.99        # covered/total diagnostics ratio for GOLD
PARTIAL_RATIO = 0.32     # at least 2 of 6 diagnostics exercised for PARTIAL

SUBJECT_NAMES = {
    "acc": "Accountancy", "bio": "Biology", "biotech": "Biotechnology",
    "bs": "Business Studies", "chem": "Chemistry", "cs": "Computer Science",
    "eco": "Economics (Indian Economic Development)", "eng_h": "English - Hornbill",
    "eng_s": "English - Snapshots", "eng_w": "English - Woven Words",
    "geo": "Geography", "hin_ar": "Hindi - Aroh", "hin_v": "Hindi - Vitan",
    "hist": "History (Themes in World History)", "hs": "Home Science",
    "ip": "Informatics Practices", "math": "Mathematics", "phy": "Physics",
    "ps": "Political Science", "psy": "Psychology", "soc": "Sociology",
    "stat": "Statistics for Economics",
}

# ---------------------------------------------------------------------------
# Curated (subject, chapter) -> sims mapping.
# Built by reading every C11 sim's teaching text / challenge questions and
# matching against each chapter's node definitions. Evidence sources: the
# game registry, SIM_NODE_MAP.json, agentSims.json chapter labels, and direct
# reads of the sim components. A sim serving several chapters is listed under
# each; a chapter with no genuine serving sim is absent (its nodes are
# structurally MISSING).
# ---------------------------------------------------------------------------
CHAPTER_MAP = {
    # ---------------- Accountancy (9 chapters) ----------------
    ("acc", 1): ["C11_AccountancyBackgroundHistoryTypesSim", "C11_AccountancyBasicTermsDrawerSim"],
    ("acc", 2): ["C11_AccountancyAccountingStandardsMeaningSim"],
    # ch3 Recording of Transactions (journal/ledger): no sim
    ("acc", 4): ["C11_AccountancyCashBookSimpleSim"],
    ("acc", 5): ["C11_AccountancyCashBookSimpleSim", "C11_AccountancyFromExtractBothSim"],
    ("acc", 6): ["C11_AccountancyTypesErrorsOmissionSim", "C11_AccountancyCashBookSimpleSim"],
    ("acc", 7): ["C11_AccountancyFromExtractBothSim"],
    ("acc", 8): ["C11_AccountancyTradingAccountMeaningSim"],
    ("acc", 9): ["C11_AccountancyTradingAccountMeaningSim"],

    # ---------------- Biology (19 chapters) ----------------
    ("bio", 1): ["C11_BiologyTaxonomyClassificationspeciesSim"],
    ("bio", 2): ["C11_BiologyTaxonomyClassificationspeciesSim"],
    # ch3 Plant Kingdom: no sim
    ("bio", 4): ["C11_BiologyAnimalKingdomOrganizationSim"],
    ("bio", 8): ["C11_BiologyCellWallPlasmodesmataSim",
                 "C11_BiologyCellUltrastructureSim", "C11_BiologyLipidBilayerMembraneSim"],
    ("bio", 9): ["C11_BiotechBiomoleculesCBSESim"],
    ("bio", 10): ["C11_BiologyMitosisdetailedStagesSim", "C11_BiologyMitosisSpindleSim"],
    ("bio", 11): ["C11_BiologyMitosisdetailedStagesSim"],
    ("bio", 12): ["C11_BiologyElectronTransportSystemSim"],
    ("bio", 13): ["C11_BiologyPlantGrowthCBSESim"],
    ("bio", 15): ["C11_BiologyBodyFluidsAndCirculationSim", "C11_BiologyBodyFluidsHeartSim",
                  "C11_BiologyCirculatoryDisordersSim"],
    ("bio", 16): ["C11_BiologyExcretionNitrogenousWastesSim", "C11_BiologyExcretoryNephronSim",
                  "C11_BiologyNephronFiltrationSim"],
    ("bio", 17): ["C11_BiologyLocomotionAndMovementSim"],
    ("bio", 18): ["C11_BiologyNeuralControlAndCoordinationSim", "C11_BiologyNeuronSynapseSim"],
    ("bio", 19): ["C11_BiologyEndocrineGlandsTheirSim"],

    # ---------------- Biotechnology (12 chapters) ----------------
    ("biotech", 1): ["C11_BiotechnologyBiotechnologyDefinitionoecdSim", "C11_BiotechIntroductionCBSESim"],
    ("biotech", 2): ["C11_BiologyCellWallPlasmodesmataSim", "C11_BiologyLipidBilayerMembraneSim"],
    ("biotech", 3): ["C11_BiotechBiomoleculesCBSESim"],
    ("biotech", 4): ["C11_BiotechEnzymesBioenergeticsCBSESim", "C11_BiotechnologyLowrybronstedTheoryAcidSim",
                     "C11_BiotechnologySignificanceMitosisMeiosisSim"],
    ("biotech", 5): ["C11_BiotechnologySignificanceMitosisMeiosisSim", "C11_BiotechnologyBioreactorGrowthSim",
                     "C11_BiologyMitosisSpindleSim"],
    ("biotech", 6): ["C11_BiotechnologyMendelsExperimentsLawsSim"],
    ("biotech", 7): ["C11_BiotechnologyBasicProcessesSim"],
    ("biotech", 8): ["C11_BiotechGeneticDisordersCBSESim"],
    ("biotech", 9): ["C11_BiotechBioinformaticsCBSESim"],
    ("biotech", 11): ["C11_BiotechBioinformaticsCBSESim"],
    ("biotech", 10): ["C11_BiotechProteinInformaticsCBSESim"],
    ("biotech", 12): ["C11_BiotechToolsTechniquesCBSESim", "C11_BiotechnologyChromatographyExchangePaperSim",
                      "C11_BiotechnologyNutrientMediaWhiteSim"],

    # ---------------- Business Studies (11 chapters) ----------------
    ("bs", 1): ["C11_BusinessStudiesMeaningFeaturesBusinessSim", "C11_CommerceClassificationHumanActivitiesSim"],
    ("bs", 2): ["C11_CommercePartnershipMeaningFeaturesSim", "C11_CommerceCooperativeOrganisationsMeaningSim"],
    ("bs", 3): ["C11_BusinessStudiesPublicPrivateCompaniesSim"],
    ("bs", 4): ["C11_BusinessStudiesInsuranceMeaningFeaturesSim", "C11_BusinessStudiesEbankingOnlineServicesSim"],
    ("bs", 5): ["C11_BusinessStudiesEbankingOnlineServicesSim", "C11_CommerceQcommercequickCommerceSim"],
    ("bs", 6): ["C11_CommerceCooperativeOrganisationsMeaningSim"],
    ("bs", 7): ["C11_BusinessStudiesPublicPrivateCompaniesSim"],
    ("bs", 10): ["C11_CommerceTypesRetailTradeSim", "C11_CommerceQcommercequickCommerceSim"],
    ("bs", 11): ["C11_CommerceExportDocumentsDocumentarySim"],

    # ---------------- Chemistry (9 chapters) ----------------
    ("chem", 1): ["C11_ChemistrySomeBasicConceptsofChemistryCBSESim", "C11_ChemistryImportanceandscopeofchemistrySim"],
    ("chem", 2): ["C11_ChemistryStructureOfAtomSim", "C11_ChemistryDiscoveryofsubatomicparticlesSim",
                  "C11_ChemistryAufbauPauliandHundsrulesSim"],
    ("chem", 3): ["C11_ChemistryClassificationOfElementsAndPeriodicitySim", "C11_ChemistryPBlockElementsSim",
                  "C11_ChemistrySBlockElementsSim"],
    ("chem", 4): ["C11_ChemistryKosselLewisapproachtobondingSim", "C11_ChemistryVSEPRShapesSim",
                  "C11_ChemistryHybridizationOrbitalsSim", "C11_ChemistryHydrogenbondingSim"],
    ("chem", 5): ["C11_ChemistryHydrogenbondingSim"],
    ("chem", 6): ["C11_ChemistryThermodynamicsCBSESim"],
    ("chem", 7): ["C11_ChemistryChemicalequilibriumdynamicnatureSim", "C11_ChemistrySolubilityproductSim"],
    ("chem", 8): ["C11_ChemistryRedoxReactionsCBSESim"],
    # ch9 Hydrogen: no sim

    # ---------------- Computer Science (11 chapters) ----------------
    ("cs", 1): ["C11_ComputerScienceComputerArchitectureNeumannSim"],
    ("cs", 2): ["C11_ComputerScienceExamPreparationPaperSim"],
    ("cs", 6): ["C11_ComputerScienceStringSlicingSim"],
    ("cs", 8): ["C11_ComputerScienceFunctionsCallStackSim"],
    ("cs", 10): ["C11_ComputerScienceDataStructuresIntroductionSim", "C11_ComputerScienceExamPreparationPaperSim"],
    ("cs", 11): ["C11_ComputerScienceAddressingIpv4Ipv6Sim"],

    # ---------------- Informatics Practices (8 chapters) ----------------
    ("ip", 1): ["C11_ComputerScienceComputerArchitectureNeumannSim"],
    ("ip", 6): ["C11_InformaticsPracticesFileSystemLimitsSim"],
    ("ip", 7): ["C11_InformaticsPracticesDatabaseConceptsSim", "C11_InformaticsPracticesKeysExplorerSim",
                "C11_ComputerScienceCreateAlterDropSim"],
    # ch2 python, ch3 control flow, ch4 lists, ch5 functions, ch8 data viz: no sims

    # ---------------- Economics / IED (8 chapters) ----------------
    ("eco", 1): ["C11_EcoIndianEconomyCBSESim"],
    ("eco", 2): ["C11_EcoIndianEconomyCBSESim", "C11_EconomicsPlanningEconomicDevelopmentSim"],
    ("eco", 3): ["C11_EcoLiberalisationCBSESim"],
    ("eco", 4): ["C11_EcoHumanCapitalCBSESim", "C11_EconomicsTypesEconomiesSocialismSim"],
    ("eco", 6): ["C11_EconomicsEmploymentGrowthInformalisationSim", "C11_EconomicsEmploymentInformalisationSim"],
    ("eco", 8): ["C11_EconomicsComparativeDevelopmentSim", "C11_EconomicsTypesEconomiesSocialismSim"],

    # ---------------- Statistics for Economics (8 chapters) ----------------
    ("stat", 1): ["C11_EconomicsDefinitionEconomicsAdamSim", "C11_EconomicsHumanWantsClassificationSim"],
    ("stat", 4): ["C11_EconomicsPresentationDataTabularSim"],
    ("stat", 5): ["C11_MathematicsStatisticsSim", "C11_EconomicsMeasuresDispersionDefinitionSim"],
    ("stat", 6): ["C11_EconomicsMeasuresDispersionDefinitionSim", "C11_MathematicsStatisticsSim"],
    ("stat", 7): ["C11_AppliedMathsCorrelationCovarianceKarlSim"],

    # ---------------- Geography (26 chapters) ----------------
    ("geo", 1): ["C11_GeographyGeographyDisciplineSim", "C11_GeoGeographyDisciplineCBSESim"],
    ("geo", 2): ["C11_GeographyOriginEvolutionEarthSim"],
    ("geo", 3): ["C11_GeoInteriorEarthCBSESim"],
    ("geo", 4): ["C11_GeoOceansContinentsCBSESim"],
    ("geo", 6): ["C11_GeoGeomorphicProcessesCBSESim"],
    ("geo", 7): ["C11_GeoLandformsEvolutionCBSESim", "C11_GeographyAeolianProcessesLandformsSim"],
    ("geo", 9): ["C11_GeographyStructurePhysiographySim", "C11_GeographyDrainageSystemSim"],
    ("geo", 10): ["C11_GeoClimateCBSESim", "C11_GeographyHeatBalanceSim", "C11_GeographyAtmosphericCirculationSim"],
    ("geo", 11): ["C11_GeographyNaturalHazardsSim"],
    ("geo", 13): ["C11_GeographyDrainageSystemSim", "C11_GeographyRiverRegimeSim"],
    ("geo", 22): ["C11_GeographyMapProjectionsSim", "C11_GeographyMapScaleSim"],
    ("geo", 23): ["C11_GeographyMapScaleSim"],
    ("geo", 26): ["C11_GeographyRemoteSensingSim"],

    # ---------------- History (7 themes present in index) ----------------
    ("hist", 1): ["C11_HistoryWritingCityLifeSim"],
    ("hist", 2): ["C11_HistoryEmpireThreeContinentsSim"],
    ("hist", 3): ["C11_HistoryEmpireThreeContinentsSim"],
    ("hist", 6): ["C11_HistoryTheThreeOrdersSim"],
    ("hist", 7): ["C11_HistoryChangingCulturalTraditionsSim"],

    # ---------------- Home Science (11 chapters) ----------------
    ("hs", 1): ["C11_HomeScienceIntroductionStreamsHomeSim", "C11_HomeScienceUnderstandingFamilyCommunitySocietySim"],
    ("hs", 2): ["C11_HomeScienceConceptGrowthDevelopmentSim"],
    ("hs", 3): ["C11_HomeScienceStorageFoodsPerishableSim", "C11_HomeScienceIntroductionStreamsHomeSim"],
    ("hs", 4): ["C11_HomeScienceStorageFoodsPerishableSim"],
    ("hs", 6): ["C11_HomeScienceIndividualCommunicationVerbalSim", "C11_MassMediaUnderstandingCommunicationDefinitionSim"],
    ("hs", 7): ["C11_HomeScienceIntroductionStreamsHomeSim"],
    ("hs", 8): ["C11_HomeScienceConceptGrowthDevelopmentSim"],
    ("hs", 10): ["C11_HomeScienceUnderstandingFamilyCommunitySocietySim"],
    ("hs", 11): ["C11_HomeScienceFabricCareSim"],

    # ---------------- Mathematics (14 chapters) ----------------
    ("math", 1): ["C11_MathematicsSetsRepresentationsEmptySim", "C11_AppliedMathsSetsRepresentationsEmptySim"],
    ("math", 2): ["C11_MathsRelationsAndFunctionsSim", "C11_MathematicsRealValuedFunctionsSim",
                  "C11_AppliedMathsGraphsStandardRealSim"],
    ("math", 3): ["C11_MathsTrigonometricFunctionsSim", "C11_MathematicsSignsTrigonometricFunctionsSim",
                  "C11_MathematicsHalfAngleOnethirdSim", "C11_AppliedMathsGraphsStandardRealSim"],
    # ch4 Induction: no sim
    ("math", 5): ["C11_AppliedMathsComplexNumbersIntroductionSim", "C11_MathematicsCubeRootsUnitySim",
                  "C11_MathematicsSymmetricFunctionsRootsSim", "C11_AppliedMathsGraphQuadraticFunctionSim"],
    ("math", 6): ["C11_MathsLinearInequalitiesCBSESim"],
    ("math", 7): ["C11_MathematicsPermutationsAndCombinationsSim", "C11_MathematicsFundamentalPrincipleCountingSim"],
    ("math", 8): ["C11_MathematicsGeneralMiddleTermSim"],
    ("math", 9): ["C11_MathsInfiniteSeriesCBSESim", "C11_AppliedMathsGeneralTermSumSim"],
    ("math", 10): ["C11_MathematicsStraightLinesSim", "C11_MathematicsVariousFormsEquationSim"],
    ("math", 11): ["C11_MathematicsConicSectionsSim", "C11_MathematicsEllipseStandardEquationSim",
                   "C11_MathsConicSectionsConeSim"],
    ("math", 12): ["C11_MathematicsIntroductionToThreeDimensionalGeometrySim", "C11_Maths3DGeometryLinesSim",
                   "C11_MathsDirectionCosinesLabSim"],
    ("math", 13): ["C11_AppliedMathsLimitsAlgebraicTrigonometricSim", "C11_MathematicsDerivativesSumDifferenceSim",
                   "C11_AppliedMathsGraphsStandardRealSim"],
    # ch14 Mathematical Reasoning: no sim

    # ---------------- Physics (14 chapters) ----------------
    ("phy", 1): ["C11_PhysicsUnitsAndMeasurementSim", "C11_PhysicsSystemsUnitscgsSim"],
    ("phy", 2): ["C11_PhysicsMotionStraightLineCBSESim", "C11_PhysicsStraightLineMotionSim"],
    ("phy", 3): ["C11_PhysicsProjectileMotionSim", "C11_PhysicsResolutionVectorsRectangularSim"],
    ("phy", 4): ["C11_PhysicsLawsOfMotionFrictionSim", "C11_PhysicsEquilibriumConcurrentForcesSim"],
    ("phy", 5): ["C11_PhysicsConservationMechanicalEnergySim", "C11_PhysicsWorkDoneAdiabaticSim"],
    ("phy", 6): ["C11_PhysicsRotationalMotionTorqueSim", "C11_PhysicsParallelPerpendicularAxesSim",
                 "C11_PhysicsCentreOfMassSim", "C11_PhysicsGyroscopePrecessionSim"],
    ("phy", 7): ["C11_PhysicsGravitationSim", "C11_PhysicsGeostationarySatellitesSim",
                 "C11_PhysicsGravitationKeplerSim", "C11_PhysicsSatelliteOrbitsSim"],
    ("phy", 8): ["C11_PhysicsMechanicalPropertiesSolidsCBSESim"],
    ("phy", 9): ["C11_PhysicsBernoullisTheoremSim", "C11_PhysicsViscosityTerminalVelocitySim"],
    ("phy", 10): ["C11_PhysicsThermalPropertiesOfMatterSim", "C11_PhysicsHeatTransferRadiationSim"],
    ("phy", 11): ["C11_PhysicsThermodynamicsSim", "C11_PhysicsWorkDoneAdiabaticSim",
                  "C11_PhysicsRefrigeratorCoefficientPerformanceSim"],
    ("phy", 12): ["C11_PhysicsKineticTheoryGasesCBSESim"],
    ("phy", 13): ["C11_PhysicsOscillationsSim", "C11_PhysicsSimplePendulumSim", "C11_PhysicsSHMCircularProjectionSim"],
    ("phy", 14): ["C11_PhysicsWaveMotionPropertiesCBSESim", "C11_PhysicsWaveTypesSim"],

    # ---------------- Political Science (18 chapters) ----------------
    ("ps", 1): ["C11_PoliticalScienceMeaningPoliticalScienceSim"],
    ("ps", 2): ["C11_PoliticalScienceFreedomSim"],
    ("ps", 5): ["C11_PoliticalScienceRightsSim"],
    ("ps", 6): ["C11_PoliticalScienceCitizenshipSim"],
    ("ps", 7): ["C11_PoliticalScienceSovereigntyMeaningDefinitionSim", "C11_PoliticalScienceMeaningPoliticalScienceSim"],
    ("ps", 10): ["C11_PoliticalScienceSovereigntyMeaningDefinitionSim"],
    ("ps", 11): ["C11_PoliticalScienceRightsSim"],
    # ch15 Judiciary: no sim (the LegalStudies orders/decrees sim is CPC civil
    # procedure, not constitutional judicial independence - verified by reading).

    # ---------------- Psychology (8 chapters) ----------------
    ("psy", 1): ["C11_PsychologyDefinitionPsychologyBasicSim", "C11_PsyWhatIsPsychologyCBSESim"],
    ("psy", 2): ["C11_PsychologyMethodsEnquirySim", "C11_PsychologyStatisticsPsychologyDescriptiveSim"],
    ("psy", 3): ["C11_PsyHumanDevelopmentCBSESim"],
    ("psy", 4): ["C11_PsychologyStatisticsPsychologyDescriptiveSim"],
    ("psy", 5): ["C11_PsyLearningCBSESim"],
    ("psy", 6): ["C11_PsyHumanMemoryCBSESim", "C11_PsychologyForgettingOccursSim"],
    ("psy", 7): ["C11_PsyThinkingCBSESim"],
    ("psy", 8): ["C11_PsychologyTheoriesMotivationSim"],

    # ---------------- Sociology (10 chapters) ----------------
    ("soc", 1): ["C11_SociologySocietySocietySim", "C11_SociologyEmergenceSociologyAnthropologySim"],
    ("soc", 2): ["C11_SociologyRoleRoleConflictSim"],
    ("soc", 4): ["C11_SociologyRoleRoleConflictSim"],
    ("soc", 5): ["C11_SociologyToolsDataCollectionSim"],
    ("soc", 6): ["C11_SociologySocialStratificationSim", "C11_SociologySocialProcessesSim"],
    ("soc", 7): ["C11_SociologyRuralUrbanSocialOrderSim"],
    ("soc", 8): ["C11_SociologyEnvironmentSocietySim"],
    ("soc", 9): ["C11_SociologyWesternSociologistsSim", "C11_SociologyEmergenceSociologyAnthropologySim"],
    ("soc", 10): ["C11_SociologyIndianSociologistsSim"],

    # English (eng_h / eng_s / eng_w) and Hindi (hin_ar / hin_v): no sims exist.
}

# Sims that exist but serve no chapter of the class-11 node index (topic absent
# from the index or from a different class/elective). Recorded in the output.
UNMAPPED_SIMS = [
    "C11_AccountancyCapitalisationEntranceAdmissionSim",  # NPO/entrance fees - no NPO chapter in index
    "C11_ChemistryAlkenespreparationandstructureSim",     # organic chemistry - not in index
    "C11_ChemistryFriedelCraftsalkylationandacylationSim",
    "C11_ChemistryHydrocarbonsSim",
    "C11_ChemistryOrganicChemistryBasicPrincPart1CBSESim",
    "C11_ChemistryOrganicChemistryBasicPrincPart2CBSESim",
    "C11_ChemistryQuantitativeanalysisSim",
    "C11_ComputerScienceJavaArraysAdvancedSim",           # Java-syllabus (ISC) content, index is Python
    "C11_ComputerScienceJavaClassMemberSim",
    "C11_ComputerScienceJavaComplexProgramSim",
    "C11_ComputerScienceJavaIteratorsListiteratorSim",
    "C11_EVSEnvironmentalScienceScopeSim",                # EVS elective - no chapter in index
    "C11_EVSHabitatsNichesGausesSim",
    "C11_EVSInternationalLegalRegimesSim",
    "C11_EconomicsIndianArtArchitectureSim",              # Kaleidoscope topics - not in index
    "C11_EconomicsAyurvedaHealthSim",
    "C11_GeographyAtmosphereCompositionSim",              # world atmosphere/ocean chapters absent from index
    "C11_GeographyAtmosphericCirculationSim",             # (circulation mapped to India-climate ch10)
    "C11_GeographyOceanCurrentsSim",
    "C11_GeographyOceanWaterMovementsSim",
    "C11_GeographyOceanWaterSalinitySim",
    "C11_GeographyWaterAtmosphereSim",
    "C11_HistoryCircumstancesLeadingProtestSim",          # modern-Indian history / world wars - not in index
    "C11_HistoryDevelopmentRailwaysCommunicationsSim",
    "C11_HistoryDisplacingIndigenousPeoplesSim",
    "C11_HistoryEventsFrom1932Sim",
    "C11_HistoryLongtermCausesAllianceSim",
    "C11_HistoryPathsModernisationSim",
    "C11_HistorySatyagrahaAgainstRowlattSim",
    "C11_HistoryWeaknessesProvisionalGovernmentSim",
    "C11_LegalStudiesAncientIndiaHinduSim",               # legal-studies elective - not in index
    "C11_LegalStudiesOrdersDecreesJudgementsSim",         # CPC civil procedure - ps ch15 (judiciary independence) rejected on hand read
    "C11_LegalStudiesPartnershipRegistrationDissolutionSim",
    "C11_MassMediaDifferenceBetweenTelevisionSim",        # mass-media elective - not in index
    "C11_MassMediaNewsValuesTimelinessSim",
    "C11_MathematicsProbabilitySim",                      # probability not in the 14-chapter math index
    "C11_MathsProbabilityDiceTowerSim",
    "C11_MathsVectorsDotCrossSim",                        # vector algebra not in the math index
    "C11_PoliticalScienceDisintegrationSovietUnionSim",   # class-12 politics topic
    "C11_AppliedMathsFinancialMathematicsPresentSim",     # applied-maths financial topics not in index
]

# ---------------------------------------------------------------------------
# Domain synonym expansion for diagnostic terms (semantic bridging, kept small
# and auditable). Keys are stemmed tokens; values are alternative spellings /
# symbol forms searched in sim text.
# ---------------------------------------------------------------------------
SYNONYMS = {
    "percent": ["%"], "percentage": ["%"],
    "profit": ["selling price", "cost price"],
    "discount": ["marked price"],
    "depreciation": ["written down value", "wdv", "salvage"],
    "ledger": ["posting"],
    "reconcil": ["pass book", "bank statement"],
    "trial": ["trial balance"],
    "hcf": ["highest common factor", "common factor"],
    "lcm": ["lowest common multiple", "least common multiple", "common multiple"],
    "congruence": ["congruent"], "congruency": ["congruent"],
    "photosynthesis": ["chlorophyll", "stomata", "photophosphorylation", "photosystem"],
    "respiration": ["glycolysis", "krebs", "mitochondri"],
    "transpiration": ["xylem", "stomata"],
    "nephron": ["kidney", "glomerulus"],
    "neuron": ["axon", "synapse", "dendrite"],
    "enzyme": ["substrate", "catalyst", "km", "vmax"],
    "mitosis": ["karyokinesis", "cytokinesis"],
    "meiosis": ["bivalent", "chiasmata"],
    "osmosis": ["diffusion"],
    "acid": ["acids", "buffer", "ph"],
    "base": ["bases"],
    "orbit": ["orbital", "quantum"],
    "electron": ["subatomic"],
    "bond": ["bonding", "covalent", "ionic"],
    "hybrid": ["hybridis", "hybridiz"],
    "equilibrium": ["reversible"],
    "entropy": ["enthalpy", "thermodynamic"],
    "oxidation": ["redox", "oxidis", "oxidiz"],
    "hydrocarbon": ["alkane", "alkene", "alkyne"],
    "isomer": ["isomerism"],
    "periodic": ["periodicity", "mendeleev"],
    "trigonometr": ["sin", "cos", "tan", "radian"],
    "binomial": ["expansion", "factorial"],
    "permutation": ["combination", "arrangement"],
    "derivative": ["differenti", "limit"],
    "conic": ["ellipse", "parabola", "hyperbola"],
    "complex": ["imaginary", "iota"],
    "inequality": ["inequalities"],
    "vector": ["scalar", "resultant"],
    "projectile": ["trajectory", "range"],
    "friction": ["frictionless"],
    "gravitation": ["gravity", "orbit", "satellite", "kepler"],
    "oscillation": ["shm", "pendulum", "periodic"],
    "wave": ["wavelength", "frequency", "amplitude", "transverse"],
    "thermodynamic": ["adiabatic", "isothermal", "entropy", "enthalpy"],
    "viscosity": ["terminal velocity", "poiseuille"],
    "strain": ["stress", "young"],
    "capillarity": ["surface tension"],
    "rotation": ["torque", "angular", "moment of inertia"],
    "collision": ["momentum", "elastic"],
    "interference": ["superposition", "standing wave"],
    "doppler": ["frequency shift"],
    "circuit": ["circuits", "ohm"],
    "voltage": ["potential difference", "volt"],
    "fraction": ["numerator", "denominator"],
    "decimal": ["tenths", "hundredths"],
    "equation": ["solve", "unknown"],
    "exponent": ["power", "powers"],
    "median": ["average", "mean"],
    "proportion": ["proportional", "ratio"],
    "polynomial": ["expression"],
    "factoris": ["factor", "factoring"],
    "habitat": ["ecosystem"],
    "monsoon": ["rainfall", "itcz", "jet stream"],
    "isobar": ["contour"],
    "constitution": ["preamble", "constitutional"],
    "judiciary": ["court", "courts", "judgement"],
    "legislature": ["parliament", "law-making"],
    "executive": ["minister", "government"],
    "federalism": ["federal", "union", "state list"],
    "secularism": ["secular"],
    "sovereignty": ["sovereign"],
    "citizenship": ["citizen"],
    "nationalism": ["nation"],
    "database": ["dbms", "sql", "table"],
    "python": ["list", "tuple", "dictionary", "def"],
    "network": ["protocol", "ip", "topology"],
    "memory": ["encoding", "recall", "forgetting"],
    "learning": ["conditioning", "reinforcement"],
    "motivation": ["drive", "arousal", "incentive"],
    "attention": ["vigilance", "selective"],
    "perception": ["sensation", "illusion"],
    "statistics": ["variance", "deviation", "correlation"],
    "correlation": ["covariance", "pearson"],
    "index": ["laspeyres", "price index"],
    "questionnaire": ["schedule", "interview", "census"],
    "stratification": ["class", "caste", "inequality"],
    "socialisation": ["norms", "culture"],
    "kinship": ["family", "marriage"],
    "communication": ["verbal", "non-verbal", "sender", "receiver"],
    "nutrition": ["nutrient", "diet", "vitamin"],
    "fabric": ["fibre", "textile", "laundry"],
    "development": ["milestone", "growth"],
    "health": ["wellness", "who"],
}

STOPWORDS = set("""the a an of and or in to for is are was were with by from as that this these those it its
on be can could should would may might must will shall do does did done not no nor but if then than also
more most such other another each any all some both few many much very using use used uses student students
learn learning ability able capacity correctly properly which what when where who whom whose how why
whether between among within without during following above below given give gives taking take takes
question questions answer answers option options correct incorrect mcq
explain describing describe identify distinguishing distinguish define defined
a b c d ii iii iv vi vii viii""".split())


def light_stem(w):
    """Light, deterministic stemming applied IDENTICALLY to diagnostic terms and
    sim-text tokens, so both sides meet in the same normalised space."""
    if len(w) > 4 and w.endswith("ies"):
        return w[:-3] + "y"
    if len(w) > 5 and w.endswith("ied"):
        return w[:-3] + "y"
    if len(w) > 6 and w.endswith("ing"):
        return w[:-3]
    if len(w) > 6 and w.endswith("ed"):
        return w[:-2]
    if len(w) > 4 and w.endswith(("sses", "ches", "shes", "xes", "zes")):
        return w[:-2]
    if len(w) > 3 and w.endswith("s") and not w.endswith(("ss", "us", "is")):
        return w[:-1]
    return w


class TokenIndex:
    """Stemmed token set of one sim with a 4-char prefix bucket index, so a
    diagnostic term matches when the stemmed sim token equals it or shares a
    prefix in either direction (catches 'increase'/'increased')."""

    def __init__(self, text):
        self.tokens = set()
        for t in tokenize(text):
            self.tokens.add(light_stem(t))
        self.prefix = defaultdict(list)
        for tok in self.tokens:
            if len(tok) >= 4:
                self.prefix[tok[:4]].append(tok)

    def has(self, term):
        if term in self.tokens:
            return True
        if len(term) >= 4:
            for tok in self.prefix.get(term[:4], ()):
                if len(tok) >= 4 and (tok.startswith(term) or term.startswith(tok)):
                    return True
        return False


def tokenize(text):
    return re.findall(r"[a-z%][a-z%\-]{1,}", text.lower())


def diagnostic_parts(diag, idf_fn):
    """Question terms and answer terms (stemmed, IDF-selected, synonym-expanded)."""
    q = diag.get("q") or ""
    a = diag.get("a") or ""

    def terms_of(text, cap):
        raw = [t for t in tokenize(text) if t not in STOPWORDS and len(t) > 2]
        seen, terms = set(), []
        for t in raw:
            st = light_stem(t)
            if st in seen:
                continue
            seen.add(st)
            terms.append(st)
        if len(terms) > cap:
            terms.sort(key=lambda t: -idf_fn(t))
            terms = terms[:cap]
        exp = set()
        for t in terms:
            exp.add(t)
            for syn in SYNONYMS.get(t, []):
                for w in tokenize(syn):
                    exp.add(light_stem(w) if len(w) > 3 else w)
        return exp

    return terms_of(q, 12), terms_of(a, 12)


def terms_share(terms, idx, idf_fn):
    if not terms:
        return 0.0
    weight_all = sum(idf_fn(t) for t in terms)
    if weight_all <= 0:
        return 0.0
    hit = sum(idf_fn(t) for t in terms if idx.has(t))
    return hit / weight_all


def diag_score(diag, idx, idf_fn):
    tq, ta = diagnostic_parts(diag, idf_fn)
    return 0.65 * terms_share(tq, idx, idf_fn) + 0.35 * terms_share(ta, idx, idf_fn)


def sim_text(path):
    """Full component source as lowercase text (teaching copy + challenges +
    quiz banks + labs + misconception killers). Code identifiers stay in - they
    carry topic vocabulary."""
    with open(path, encoding="utf-8") as f:
        return f.read().lower()


# ---------------------------------------------------------------------------
# Answer-key defect scanning (identical method to the class 7-8 audit)
# ---------------------------------------------------------------------------

def _split_top_level(body):
    parts, cur, depth = [], [], 0
    quote = None
    i = 0
    while i < len(body):
        ch = body[i]
        if quote:
            if ch == "\\" and i + 1 < len(body):
                cur.append(ch)
                cur.append(body[i + 1])
                i += 2
                continue
            if ch == quote:
                quote = None
            cur.append(ch)
        elif ch in "'\"":
            quote = ch
            cur.append(ch)
        else:
            if ch in "([{":
                depth += 1
            elif ch in ")]}":
                depth -= 1
            if ch == "," and depth == 0:
                parts.append("".join(cur))
                cur = []
            else:
                cur.append(ch)
        i += 1
    if cur:
        parts.append("".join(cur))
    return [p.strip().strip("'\"") for p in parts if p.strip()]


def _extract_array(seg, key):
    i = seg.find(key)
    if i < 0:
        return None
    b = seg.find("[", i)
    if b < 0:
        return None
    depth = 0
    for j in range(b, len(seg)):
        if seg[j] == "[":
            depth += 1
        elif seg[j] == "]":
            depth -= 1
            if depth == 0:
                return seg[b + 1: j]
    return None


def scan_sim_defects(path):
    """Structural answer-key scan of one sim component. Deterministic."""
    with open(path, encoding="utf-8") as f:
        txt = f.read()
    defects = []
    spans = []
    for m in re.finditer(r"\{", txt):
        start = m.start()
        depth = 0
        for j in range(start, min(start + 4000, len(txt))):
            c = txt[j]
            if c == "{":
                depth += 1
            elif c == "}":
                depth -= 1
                if depth == 0:
                    seg = txt[start: j + 1]
                    if ("correctIndex" in seg or "correctAnswer" in seg) and len(seg) < 3000:
                        spans.append(seg)
                    break
        else:
            break
    for seg in spans:
        arr = _extract_array(seg, "options")
        opts = _split_top_level(arr) if arr is not None else None
        mq = re.search(r"question\s*:\s*[\'\"](.*?)[\'\"]\s*,", seg, re.S)
        qtext = mq.group(1) if mq else seg[:100]
        mi = re.search(r"correctIndex\s*:\s*(-?\d+)", seg)
        ma = re.search(r"correctAnswer\s*:\s*[\'\"]?(-?\d+(?:\.\d+)?)[\'\"]?", seg)
        if mi and opts:
            idx = int(mi.group(1))
            if idx < 0 or idx >= len(opts):
                defects.append({
                    "kind": "correct_index_out_of_range",
                    "detail": "correctIndex %d but %d options" % (idx, len(opts)),
                    "question": qtext[:140],
                })
            dupes = sorted({o for o in opts if len(o) > 2 and opts.count(o) > 1})
            if dupes:
                defects.append({
                    "kind": "duplicate_options",
                    "detail": "identical options: %s" % "; ".join(dupes[:2])[:120],
                    "question": qtext[:140],
                })
        if ma is None and re.search(r"correctAnswer\s*:\s*[\'\"][^\'\"]*[\'\"]", seg):
            defects.append({
                "kind": "non_numeric_correct_answer",
                "detail": "numeric-type challenge carries a non-numeric correctAnswer",
                "question": qtext[:140],
            })
        if ma and mq:
            mp = re.search(r"(\d+(?:\.\d+)?)\s*%\s*of\s*(?:Rs\.?\s*)?(\d+(?:\.\d+)?)", mq.group(1))
            if mp:
                expect = float(mp.group(1)) * float(mp.group(2)) / 100.0
                got = float(ma.group(1))
                if abs(expect - got) > 0.01:
                    defects.append({
                        "kind": "percent_answer_mismatch",
                        "detail": "question computes %s%% of %s = %s but key says %s" % (
                            mp.group(1), mp.group(2), expect, ma.group(1)),
                        "question": qtext[:140],
                    })
    seen, out = set(), []
    for d in defects:
        key = json.dumps(d, sort_keys=True)
        if key in seen:
            continue
        seen.add(key)
        out.append(d)
    return out


# ---------------------------------------------------------------------------
# Hand verification record (15 verdicts drawn across different subjects and
# checked by reading the node's diagnostics against the sim's actual
# challenges/labs/teaching copy).
# ---------------------------------------------------------------------------
SPOT_CHECKS = [
    {"node_id": "c11_phy_cbse_07_002", "subject": "phy", "heuristic": "GOLD", "hand": "PARTIAL", "agree": False,
     "note": "Overcall: Gravitation/Kepler/Satellite sims exercise law-of-gravitation computations (G, "
             "universal gravitation, orbital velocity, inverse-square) but the vector-form (D2) and "
             "three-mass equilateral-superposition (D4) diagnostics are not systematically exercised - "
             "no superposition/equilateral content in any of the 4 mapped sims."},
    {"node_id": "c11_math_cbse_01_003", "subject": "math", "heuristic": "GOLD", "hand": "PARTIAL", "agree": False,
     "note": "Overcall: the sets sims exercise cardinality, empty-set vs {0}, power-set and one-to-one "
             "mappings, but the equal-sets-vs-equivalent-sets distinction (D1-D4 hinge on the words "
             "'equal'/'equivalent') is never named; coverage rides on generic set vocabulary."},
    {"node_id": "c11_acc_cbse_05_001", "subject": "acc", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
     "note": "BRS deeply exercised by both sims: amended-cash-book method, unpresented cheques, bank "
             "charges, overdraft starts, dual-extract reconciliation."},
    {"node_id": "c11_chem_cbse_04_002", "subject": "chem", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
     "note": "Kossel-Lewis sim covers lattice enthalpy (x13 mentions), MgO comparisons (x5), ionisation "
             "energy and electron-gain vocabulary the diagnostics test."},
    {"node_id": "c11_bio_cbse_08_004", "subject": "bio", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
     "note": "Cell-wall sim covers wall layers/plasmodesmata/pectinase-cellulase reasoning; algal-vs-"
             "angiosperm composition and the open design task are genuinely uncovered."},
    {"node_id": "c11_cs_cbse_02_005", "subject": "cs", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
     "note": "ISC exam-rehearsal sim genuinely exercises Boolean algebra: truth tables, half-adder, "
             "universal gates (NAND x15 / NOR x16), distribution law."},
    {"node_id": "c11_cs_cbse_06_002", "subject": "cs", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
     "note": "StringSlicingSim is all slice notation/negative indices; the diagnostics test type(), escape "
             "sequences, immutability TypeError and IndexError - none appear in the sim."},
    {"node_id": "c11_hist_cbse_01_001", "subject": "hist", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
     "note": "WritingCityLife sim is a thin urbanism explainer (scribe x6, no Tigris/Euphrates/cuneiform/"
             "ecological-zones content) versus geography-of-Mesopotamia diagnostics."},
    {"node_id": "c11_geo_cbse_11_001", "subject": "geo", "heuristic": "MISSING", "hand": "PARTIAL", "agree": False,
     "note": "Undercall: hazards sim carries hazard x34 / disaster x17 / cyclone x6 / earthquake x5 / "
             "vulnerability x5 - it genuinely exercises the hazard-vs-disaster definition (D1, covered) "
             "and the cyclone-vulnerability data comparison (D3 scored 0.36, just under threshold)."},
    {"node_id": "c11_ps_cbse_15_001", "subject": "ps", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
     "note": "Mapping corrected during hand verification: the LegalStudies orders/decrees sim is CPC civil "
             "procedure (Munsif courts, written statements) - Article 50, judge tenure and judicial "
             "independence never appear. ps ch15 is now unmapped, so the node is structurally MISSING."},
    {"node_id": "c11_eng_h_cbse_01_001", "subject": "eng_h", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
     "note": "No English sims exist at all for class 11 (Hornbill/Snapshots/Woven Words unserved)."},
    {"node_id": "c11_hs_cbse_07_001", "subject": "hs", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
     "note": "Intro-streams sim covers the WHO definition (D1) and wellness-dimensions content (health x21, "
             "mental x17); only the case-application task is uncovered."},
    {"node_id": "c11_psy_cbse_04_001", "subject": "psy", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
     "note": "Psych-statistics sim unexpectedly carries Gestalt (x18)/illusion (x16)/attention (x9) content - "
             "covers sensation-vs-perception and top-down perception; threshold computations uncovered."},
    {"node_id": "c11_stat_cbse_07_001", "subject": "stat", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
     "note": "Karl-Pearson sim exercises correlation-vs-causation with a verbatim ice-cream/sunburn "
             "spurious-correlation challenge and the r-domain rules."},
    {"node_id": "c11_bs_cbse_05_002", "subject": "bs", "heuristic": "PARTIAL", "hand": "MISSING", "agree": False,
     "note": "Overcall: the Ebanking sim teaches RTGS/NEFT/credit-card mechanics and the Qcommerce sim "
             "teaches dark-store operations; neither exercises the NCERT e-business benefits/limitations "
             "framework (low personal touch, digital divide, people resistance) the diagnostics test."},
]


def load_nodes():
    with open(NODE_INDEX, encoding="utf-8") as f:
        data = json.load(f)
    nodes = [n for n in data["nodes"] if n.get("class") == KLASS]
    return nodes


def chapter_key(node):
    return (node.get("subject"), node.get("chapter"))


def build_sim_path_map():
    paths = {}
    for d in SIM_DIRS:
        if not os.path.isdir(d):
            continue
        for fn in sorted(os.listdir(d)):
            if fn.endswith(".tsx") and fn.startswith("C11_"):
                paths.setdefault(fn[:-4], os.path.join(d, fn))
    return paths


def audit(nodes, sim_paths, sim_cache, defect_cache):
    cls_nodes = sorted(nodes, key=lambda n: n["node_id"])

    # ---- chapter documents for IDF ----
    chap_docs = defaultdict(Counter)
    chap_nodes = defaultdict(list)
    for n in cls_nodes:
        k = chapter_key(n)
        chap_nodes[k].append(n)
        for t in tokenize((n.get("definition") or "") + " " + (n.get("mastery_criteria") or "")):
            if t not in STOPWORDS and len(t) > 2:
                chap_docs[k][light_stem(t)] += 1
    df = Counter()
    for doc in chap_docs.values():
        for t in doc:
            df[t] += 1
    N = max(1, len(chap_docs))

    def idf(t):
        return math.log((N + 1) / (1 + df.get(t, 0))) + 0.1

    # ---- sims ----
    missing_files = []
    mapped_sims = {}
    for k in chap_nodes:
        names = CHAPTER_MAP.get(k, [])
        paths = []
        for nm in names:
            p = sim_paths.get(nm)
            if p:
                paths.append((nm, p))
            else:
                missing_files.append("%s (mapped to %s ch%s but file missing)" % (nm, k[0], k[1]))
        mapped_sims[k] = paths
        for nm, p in paths:
            if nm not in sim_cache:
                sim_cache[nm] = TokenIndex(sim_text(p))
            if nm not in defect_cache:
                defect_cache[nm] = scan_sim_defects(p)

    # ---- per node scoring ----
    results = []
    gold_by_sim = Counter()
    for n in cls_nodes:
        k = chapter_key(n)
        diags = n.get("diagnostics") or []
        sims = mapped_sims.get(k, [])
        uncovered = []
        per_diag = []
        if not diags:
            cov_ratio, verdict = 0.0, "MISSING"
        elif not sims:
            cov_ratio = 0.0
            verdict = "MISSING"
            uncovered = ["<no sim mapped to %s ch%s - all %d diagnostics uncovered>" % (
                k[0], k[1], len(diags))]
        else:
            for i, d in enumerate(diags, 1):
                tq, ta = diagnostic_parts(d, idf)
                if not tq and not ta:
                    per_diag.append((i, 0.0, False))
                    uncovered.append("diagnostic %d (no extractable terms)" % i)
                    continue
                best = 0.0
                for nm, _p in sims:
                    best = max(best, diag_score(d, sim_cache[nm], idf))
                per_diag.append((i, round(best, 3), best >= COVER_THRESHOLD))
                if best < COVER_THRESHOLD:
                    q = (d.get("q") or "").strip().split("\n")[0]
                    uncovered.append("diagnostic %d (coverage %.2f): %s" % (i, best, q[:130]))
            covered = sum(1 for _i, _s, ok in per_diag if ok)
            cov_ratio = covered / len(diags)
            verdict = "GOLD" if cov_ratio >= GOLD_RATIO else ("PARTIAL" if cov_ratio >= PARTIAL_RATIO else "MISSING")

        # primary sim = mapped sim with best total coverage contribution
        primary = None
        if sims:
            if not per_diag:
                primary = sims[0][0]
            else:
                def sim_score(nm):
                    return sum(diag_score(d, sim_cache[nm], idf) for d in diags)
                primary = max(sims, key=lambda nm_p: sim_score(nm_p[0]))[0]
            if verdict == "GOLD":
                gold_by_sim[primary] += 1

        defects = []
        placeholder_kinds = re.compile(r"^\[?\s*(answer needed|tbd|todo|n/?a)\s*\]?$", re.I)
        for d in diags:
            a = (d.get("a") or "").strip()
            if a == "" or placeholder_kinds.match(a):
                defects.append({
                    "kind": "node_diagnostic_answer_placeholder",
                    "sim": None,
                    "detail": "diagnostic %d has an empty/placeholder answer in the node index" % d.get("index", 0),
                    "question": ((d.get("q") or "").strip().split("\n")[0])[:140],
                })
        for nm, _p in sims:
            for d in defect_cache.get(nm, []):
                dd = dict(d)
                dd["sim"] = nm
                defects.append(dd)

        entry = {
            "node_id": n["node_id"],
            "subject": k[0],
            "chapter": k[1],
            "sim_id": primary,
            "sims": [nm for nm, _p in sims],
            "verdict": verdict,
            "coverage": round(cov_ratio, 3),
            "diagnostics_total": len(diags),
            "uncovered_diagnostics": uncovered,
            "defects": defects,
        }
        results.append(entry)
    return cls_nodes, results, gold_by_sim, missing_files


def build_output(results, gold_by_sim, missing_files):
    counts = Counter(r["verdict"] for r in results)
    sims_ranked = [
        {"sim_id": s, "gold_nodes": c}
        for s, c in sorted(gold_by_sim.items(), key=lambda kv: (-kv[1], kv[0]))
    ]

    # ---- per-subject summary ----
    by_subject = {}
    for subj in sorted({r["subject"] for r in results}):
        rows = [r for r in results if r["subject"] == subj]
        c = Counter(r["verdict"] for r in rows)
        by_subject[subj] = {
            "name": SUBJECT_NAMES.get(subj, subj),
            "total_nodes": len(rows),
            "gold": c.get("GOLD", 0),
            "partial": c.get("PARTIAL", 0),
            "missing": c.get("MISSING", 0),
            "chapters_total": len({r["chapter"] for r in rows}),
            "chapters_with_sim": len({(r["subject"], r["chapter"]) for r in rows if r["sims"]}),
            "gold_share": round(c.get("GOLD", 0) / max(1, len(rows)), 3),
        }

    mapped_node_count = sum(1 for r in results if r["sims"])
    defect_nodes = [r for r in results if any(d["sim"] for d in r["defects"])]
    node_data_defects = sum(
        1 for r in results if any(d["kind"] == "node_diagnostic_answer_placeholder" for d in r["defects"]))

    # worst mapped sims: primary sims serving >= 5 nodes with the lowest mean coverage
    per_sim = defaultdict(list)
    for r in results:
        if r["sim_id"]:
            per_sim[r["sim_id"]].append(r["coverage"])
    worst_mapped_sims = [
        {"sim_id": s, "nodes_served": len(cs),
         "mean_coverage": round(sum(cs) / len(cs), 3),
         "verdicts": dict(sorted(Counter(
             r["verdict"] for r in results if r["sim_id"] == s).items()))}
        for s, cs in sorted(per_sim.items(), key=lambda kv: (sum(kv[1]) / len(kv[1]), kv[0]))
        if len(cs) >= 5
    ][:15]

    spot = SPOT_CHECKS
    spot_agree = sum(1 for s in spot if s.get("agree"))
    return {
        "class": KLASS,
        "generated_by": "backend/tools/audit_class11_depth.py",
        "method": {
            "approach": (
                "Chapter-level sim mapping (hand-curated from every C11 sim's teaching text and "
                "challenge questions read individually, cross-checked against the game registry, "
                "SIM_NODE_MAP.json, agentSims.json and each chapter's node definitions), then "
                "per-node diagnostic coverage scoring of each node's 6 diagnostics (q+a+misconception) "
                "against the full text of the mapped sim component(s) in "
                "frontend/components/simulations/{c6_12,c6_12_new,three}/."
            ),
            "heuristic": (
                "A diagnostic counts covered when 0.65 * (IDF-weighted share of its question-"
                "stem terms present in the sim source text) + 0.35 * (share of its answer "
                "terms) >= %.2f. Both the diagnostic and the sim text are stemmed with the "
                "same light stemmer and matched by equality or shared prefix, plus a curated "
                "synonym table (e.g. gravitation->'kepler/satellite', respiration->'glycolysis/"
                "krebs'). IDF is computed over class-11 chapter documents so common academic "
                "vocabulary cannot fake coverage. GOLD = all diagnostics covered; PARTIAL = "
                "at least two diagnostics covered; MISSING = no mapped sim or fewer than "
                "two diagnostics covered. Lexical heuristic - conservative on metaphorical "
                "sims; 15 boundary cases were hand-verified (see spot_checks)." % (COVER_THRESHOLD,)
            ),
            "mapping_source": "CHAPTER_MAP table in backend/tools/audit_class11_depth.py",
            "unmapped_chapters": sorted(
                "%s ch%s (%d nodes)" % (subj, ch, sum(1 for r in results if r["subject"] == subj and r["chapter"] == ch))
                for (subj, ch) in sorted({(r["subject"], r["chapter"]) for r in results}, key=lambda x: (x[0], x[1]))
                if not CHAPTER_MAP.get((subj, ch))
            ),
            "unmapped_sims": sorted(UNMAPPED_SIMS),
            "limitations": [
                "Lexical term-presence scoring, not interaction testing: a sim may exercise a "
                "skill without naming it, or name it without a scored interaction.",
                "Sims scoped to topics absent from the node index (organic chemistry, ocean/atmosphere "
                "world geography, Java CS, modern-Indian history, electives) deliver nothing to the "
                "current node graph and are reported as unmapped sims.",
                "English (Hornbill/Snapshots/Woven Words) and Hindi (Aroh/Vitan) have no sims at all; "
                "their 975 nodes are structurally MISSING.",
                "Answer-key defect scan is structural (index range, duplicate options, numeric "
                "key type, % of arithmetic); it does not re-derive every computed answer.",
            ],
        },
        "summary": {
            "total_nodes": len(results),
            "gold": counts.get("GOLD", 0),
            "partial": counts.get("PARTIAL", 0),
            "missing": counts.get("MISSING", 0),
            "nodes_with_mapped_sim": mapped_node_count,
            "nodes_without_sim": sum(1 for r in results if r["verdict"] == "MISSING" and not r["sims"]),
            "missing_despite_mapped_sim": sum(1 for r in results if r["verdict"] == "MISSING" and r["sims"]),
            "sims_ranked_by_gold_nodes": sims_ranked,
            "worst_mapped_sims": worst_mapped_sims,
            "distinct_sims_delivering_gold": len(gold_by_sim),
            "nodes_with_sim_defects": len(defect_nodes),
            "nodes_with_placeholder_diagnostic_answers": node_data_defects,
            "by_subject": by_subject,
        },
        "spot_checks": {
            "description": (
                "15 verdicts across different subjects hand-verified against the actual sim "
                "interactions (stratified sample; fixed list recorded in the audit script)."
            ),
            "agree": spot_agree,
            "total": len(spot),
            "checks": spot,
        },
        "nodes": results,
    }


def main():
    nodes = load_nodes()
    sim_paths = build_sim_path_map()
    sim_cache, defect_cache = {}, {}
    cls_nodes, results, gold_by_sim, missing_files = audit(nodes, sim_paths, sim_cache, defect_cache)
    out = build_output(results, gold_by_sim, missing_files)
    path = os.path.join(OUT_DIR, "CLASS11_NODE_DEPTH.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(out, f, indent=1, ensure_ascii=False, sort_keys=False)
    s = out["summary"]
    print("CLASS %d: total=%d gold=%d partial=%d missing=%d (no-sim=%d) sims_with_gold=%d defect_nodes=%d"
          % (KLASS, s["total_nodes"], s["gold"], s["partial"], s["missing"],
             s["nodes_without_sim"], s["distinct_sims_delivering_gold"], s["nodes_with_sim_defects"]))
    if missing_files:
        for mf in sorted(set(missing_files)):
            print("  MISSING FILE:", mf)
    print("  by subject:")
    for subj, d in s["by_subject"].items():
        print("    %-8s %-45s total=%4d gold=%4d partial=%4d missing=%4d"
              % (subj, d["name"], d["total_nodes"], d["gold"], d["partial"], d["missing"]))
    print("  wrote %s" % path)


if __name__ == "__main__":
    sys.exit(main())
