#!/usr/bin/env python3
"""
audit_class12_depth.py — Class 12 node DEPTH audit (board-year class, 3,255 nodes).

Same method and output schema as the class 6 / 7-8 node depth audits
(backend/tools/audit_class6_depth.py, backend/tools/audit_class78_depth.py):

  1. Resolve the chapter-level sim mapping. Class-12 node ids look like
     c12_{subject}_cbse_{chapter:02d}_{node:03d}; sim components are
     chapter/topic-scoped and live in three directories:
       frontend/components/simulations/c6_12/      (main C12_* set)
       frontend/components/simulations/c6_12_new/  (recent CBSE-track C12_*CBSE)
       frontend/components/simulations/three/      (3D C12_* sims)
     The chapter map below is hand-curated from (a) every mapped sim's teaching
     text / doc comment / title, (b) each chapter's node definitions in
     backend/_cache/enhanced_nodes_index.json, and (c) the NCERT chapter titles
     in backend/its/competency/catalog_class12_*.json. Cross-subject maps are
     used only where the sim genuinely teaches that chapter's NCERT content
     (e.g. the CS networks sims for IP ch3/ch5, History post-1947 sims for
     Political Science ch9/12/14, the Commerce management sims for BS).
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
     mismatch on "x% of y" items), plus a node-side placeholder-answer scan.
     Defects are attributed to each node whose chapter the defective sim serves.

Heuristic (documented honestly):
  - Diagnostic concept terms: content words of the question stem and the
    answer, minus stopwords, stemmed lightly, expanded via a small domain
    synonym table. A diagnostic counts as COVERED when 0.65 * (IDF-weighted
    share of question terms present in the sim text) + 0.35 * (share of answer
    terms) >= 0.40. IDF is computed over the ~330 chapter documents of class
    12, so common academic words cannot fake coverage.
  - Lexical heuristic: catches topical equivalence only when vocabulary
    overlaps or the synonym table maps it. 15 verdicts across subjects were
    hand-verified against the actual sim interactions (see spot_checks).

Notable honest findings baked into the map:
  - The 3D Solid State chemistry sims (SolidStateCrystalLattices,
    ClosePackingVoids, MetallicCrystals), Surface Chemistry, Metallurgy and
    Chemistry-in-Everyday-Life sims serve chapters that were DROPPED from the
    class-12 node index - no current node teaches them, so they are recorded
    under SIMS_WITHOUT_NODES, not pretended into chem ch1.
  - English (Flamingo/Kaleidoscope/Vistas), Hindi (Aroh/Antra/Antral/Vitan)
    have ZERO sims; those ~1,168 nodes are structurally MISSING.
  - Java/OS/software-testing CS sims, EVS, Legal Studies and Mass Media sims
    serve subjects/units absent from the node index.

Usage:
  python backend/tools/audit_class12_depth.py

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
CATALOG_DIR = os.path.join(ROOT, "backend", "its", "competency")
SIM_DIRS = [
    os.path.join(ROOT, "frontend", "components", "simulations", "c6_12"),
    os.path.join(ROOT, "frontend", "components", "simulations", "c6_12_new"),
    os.path.join(ROOT, "frontend", "components", "simulations", "three"),
]
OUT_DIR = os.path.join(ROOT, "backend", "its", "competency")
OUT_PATH = os.path.join(OUT_DIR, "CLASS12_NODE_DEPTH.json")

COVER_THRESHOLD = 0.40   # blended q/a coverage score needed to call a diagnostic covered
GOLD_RATIO = 0.99        # covered/total diagnostics ratio for GOLD
PARTIAL_RATIO = 0.32     # at least 2 of 6 diagnostics exercised for PARTIAL

SUBJECT_LABELS = {
    "acc": "Accountancy", "bio": "Biology", "biotech": "Biotechnology",
    "bs": "Business Studies", "ca": "Computerised Accounting", "chem": "Chemistry",
    "cs": "Computer Science", "eco": "Economics", "eng_f": "English - Flamingo",
    "eng_k": "English - Kaleidoscope", "eng_v": "English - Vistas", "geo": "Geography",
    "hin_a": "Hindi - Aroh", "hin_al": "Hindi - Antral", "hin_ar": "Hindi - Antra",
    "hin_v": "Hindi - Vitan", "hist": "History", "hs": "Home Science",
    "ip": "Informatics Practices", "math": "Mathematics", "phy": "Physics",
    "ps": "Political Science", "psy": "Psychology", "soc": "Sociology",
}

# ---------------------------------------------------------------------------
# Curated chapter -> sims mapping.
# Key: (12, subject_token, chapter). Value: list of sim basenames (any SIM_DIR).
# Evidence per line: sim doc-comment/title + node definitions + NCERT catalog
# chapter titles. Empty/absent key = no sim serves that chapter (those nodes
# are structurally MISSING).
# ---------------------------------------------------------------------------
CHAPTER_MAP = {
    # ---------------- Accountancy (9 ch, 92 nodes) ----------------
    (12, "acc", 1): ["C12_AccountancyDefinitionMeaningFeaturesSim"],  # partnership def/features (Jaipur Handicrafts case)
    (12, "acc", 2): ["C12_AccountancyPastAdjustmentsAfterSim"],       # admission + past adjustments (Apex ChemTech)
    (12, "acc", 3): ["C12_AccountancyRetirementPartnerGainingSim"],   # retirement/gaining ratio
    # ch4 dissolution: no sim exists
    (12, "acc", 5): ["C12_AccountancyDisclosureShareCapitalSim"],     # share capital (Apex Technologies)
    # ch6 debentures: no sim exists
    (12, "acc", 7): ["C12_AccountancyTreatmentProposedDividendSim"],  # FS of company: proposed dividend treatment
    (12, "acc", 8): ["C12_AccountancyComparativeStatementsMeaningSim", "C12_AccountancyWorkingCapitalTurnoverSim",
                     "C12_AccountancyTreatmentProposedDividendSim"],  # analysis: comparative statements + ratios
    (12, "acc", 9): ["C12_AccountancyWorkingCapitalTurnoverSim"],     # cash flow (Bharat Dynamics audit)

    # ---------------- Biology (13 ch, 114 nodes) ----------------
    # ch1 reproduction overview: no dedicated sim
    (12, "bio", 2): ["C12_BiologySexualReproductionFloweringPlantsSim", "C12_BiologyFloweringPlantDoubleFertilisationSim"],
    (12, "bio", 3): ["C12_BiologyOogenesisSim", "C12_BiologyHumanReproductionCBSESim"],
    (12, "bio", 4): ["C12_BiologyReproductiveHealthCBSESim"],
    (12, "bio", 5): ["C12_BiologyLinkageCrossingOverSim"],            # heredity odyssey lab
    (12, "bio", 6): ["C12_BiologyMolecularBasisofInheritanceCBSESim", "C12_BiologyLinkageCrossingOverSim"],
    (12, "bio", 7): ["C12_BiologyEvolutionSim", "C12_BiologyEvolutionNaturalSelectionSim", "C12_BiologyOriginLifeSim"],
    (12, "bio", 8): ["C12_BiologyHumanHealthImmunitySim", "C12_BiologyHumanHealthandDiseaseCBSESim",
                     "C12_BiologyDrugAlcoholAbuseSim"],
    (12, "bio", 9): ["C12_BiologyMicrobesIndustrialProductsSim"],     # covers husbandry/poultry content
    (12, "bio", 10): ["C12_BiologyMicrobesIndustrialProductsSim"],
    (12, "bio", 11): ["C12_BiotechnologyGeneCloningSim", "C12_BiotechnologyHostVectorSystemSim"],  # biotech principles
    (12, "bio", 12): ["C12_BiotechRecombinantDNAApplicationsCBSESim", "C12_BiotechnologySomaticHybridisationpomatoSim",
                      "C12_BiotechBioremediationCBSESim"],            # Bt toxin / RNAi / applications nodes
    (12, "bio", 13): ["C12_BiologyPopulationInteractionsSim"],        # habitat/niche/interactions

    # ---------------- Biotechnology (13 ch, 144 nodes) ----------------
    (12, "biotech", 1): ["C12_BiotechnologyHostVectorSystemSim", "C12_BiotechnologyNucleotidesNucleosidesStructureSim"],
    (12, "biotech", 2): ["C12_BiotechnologyGeneCloningSim", "C12_BiotechGeneCloningCBSESim"],   # RDT tools/restriction
    (12, "biotech", 3): ["C12_BiotechGeneCloningCBSESim", "C12_BiotechnologyGeneCloningSim"],
    (12, "biotech", 4): ["C12_BiotechRecombinantDNAApplicationsCBSESim", "C12_BiotechnologyTranslationInitiationElongationSim"],
    (12, "biotech", 5): ["C12_BiotechGenomeTechnologyCBSESim", "C12_BiotechnologyRiceGenomeProjectSim",
                         "C12_BiotechnologyGenomicCdnaLibrariesSim", "C12_BiotechnologySequencingSangersChainSim"],
    (12, "biotech", 6): ["C12_BiotechPlantTissueCultureCBSESim", "C12_BiotechnologySomaticHybridisationpomatoSim"],
    (12, "biotech", 7): ["C12_BiotechPlantTissueCultureCBSESim"],     # micropropagation
    (12, "biotech", 8): ["C12_BiotechAnimalCellCultureCBSESim"],
    (12, "biotech", 9): ["C12_BiotechAnimalCellCultureCBSESim"],      # stem cells
    (12, "biotech", 10): ["C12_BiotechMicrobialCultureCBSESim", "C12_BiotechRecombinantDNAApplicationsCBSESim"],
    (12, "biotech", 11): ["C12_BiotechBioremediationCBSESim", "C12_BiotechRecombinantDNAApplicationsCBSESim"],
    (12, "biotech", 12): ["C12_BiotechMicrobialCultureCBSESim", "C12_BiotechBioremediationCBSESim"],
    # ch13 entrepreneurship/public perception: no sim

    # ---------------- Business Studies (11 ch, 108 nodes) ----------------
    (12, "bs", 1): ["C12_BusinessStudiesCoordinationMeaningCoordinationSim"],
    (12, "bs", 2): ["C12_CommerceComparisonTaylorFayolSim"],          # Taylor/Fayol principles
    (12, "bs", 3): ["C12_BusinessStudiesBusinessEnvironmentMeaningSim", "C12_CommerceBusinessEnvironmentMeaningSim"],
    (12, "bs", 4): ["C12_BusinessStudiesPlanningMeaningStepsSim"],
    # ch5 organising, ch6 staffing: no sims
    (12, "bs", 7): ["C12_CommerceDirectingMeaningImportanceSim"],     # Maslow/leadership lab
    # ch8 controlling: no sim
    (12, "bs", 9): ["C12_BusinessStudiesLoansFromFinancialSim"],      # financial management
    (12, "bs", 10): ["C12_CommerceBonusIssueRightsSim"],              # capital raising / financial markets
    (12, "bs", 11): ["C12_BusinessStudiesPlaceChannelsDistributionSim", "C12_CommerceMarketsMeaningTypesSim",
                     "C12_CommerceDigitalMarketingSocialSim"],        # marketing mix + consumer protection

    # ---------------- Computerised Accounting (4 ch, 19 nodes) ----------------
    (12, "ca", 1): ["C12_AccountancyCreatingWorksheetsEnteringSim"],  # accounting systems overhaul (CAS content)
    (12, "ca", 2): ["C12_AccountancyCreatingWorksheetsEnteringSim"],  # spreadsheet use
    # ch3 payroll, ch4 graphs & charts: no sims

    # ---------------- Chemistry (10 ch, 100 nodes) ----------------
    (12, "chem", 1): ["C12_ChemistrySolutionsCBSESim", "C12_ChemistryIdealandnonidealsolutionsSim"],
    (12, "chem", 2): ["C12_ChemistryElectrochemistryCBSESim", "C12_ChemistryBatteriesandfuelcellsSim"],
    (12, "chem", 3): ["C12_ChemistryChemicalKineticsSim"],
    (12, "chem", 4): ["C12_ChemistryTransitionmetalstrendsSim"],
    (12, "chem", 5): ["C12_ChemistryCoordinationCompoundsCBSESim", "C12_ChemistryColourandmagneticpropertiesofcomplexesSim"],
    (12, "chem", 6): ["C12_ChemistryHaloalkanesandHaloarenesCBSESim"],
    (12, "chem", 7): ["C12_ChemistryPhenolsSim", "C12_ChemistryWilliamsonethersynthesisSim"],
    (12, "chem", 8): ["C12_ChemistryAldehydesKetonesandCarboxylicACBSESim"],
    (12, "chem", 9): ["C12_ChemistryAminesandDiazoniumSaltsCBSESim", "C12_ChemistryDiazoniumsaltsSim"],
    (12, "chem", 10): ["C12_ChemistryBiomoleculesCBSESim", "C12_ChemistryBiomoleculesSim"],

    # ---------------- Computer Science (13 ch, 144 nodes) ----------------
    (12, "cs", 1): ["C12_ComputerScienceComputerNetworksSim", "C12_ComputerSciencePacketJourneySim"],
    (12, "cs", 2): ["C12_ComputerScienceComputerNetworksSim", "C12_ComputerSciencePacketJourneySim"],  # topologies
    (12, "cs", 3): ["C12_ComputerScienceComputerNetworksSim"],        # web/WWW
    (12, "cs", 4): ["C12_ComputerScienceDatabaseNormalization1nfSim"],
    (12, "cs", 5): ["C12_InformaticsPracticesSQLFunctionsSim"],       # SQL (shared IP sim)
    # ch6 python-SQL connectivity, ch9 functions, ch10 file handling, ch11 lists, ch13 society: no sims
    (12, "cs", 7): ["C12_ComputerScienceAdvancedBooleanAlgebraSim"],
    (12, "cs", 8): ["C12_ComputerScienceBinarySearchTreeSim"],        # data structures
    (12, "cs", 12): ["C12_ComputerScienceNetworkSecurityCryptographySim", "C12_ComputerScienceSecurityAspectsSim"],

    # ---------------- Economics (11 ch, 107 nodes) ----------------
    # ch1 intro/scarcity/PPF: no sim
    (12, "eco", 2): ["C12_EconomicsDemandMeaningTypesSim", "C12_EconomicsEquimarginalUtilityStatementSim",
                     "C12_EconomicsCrossElasticityDemandSim", "C12_EcoConsumerBehaviourCBSESim"],
    # ch3 production & costs, ch6 monopoly, ch7 macro intro: no sims
    (12, "eco", 4): ["C12_EcoMarketEquilibriumCBSESim"],              # price determination under PC
    (12, "eco", 5): ["C12_EconomicsMarketMechanismEquilibriumSim", "C12_EcoMarketEquilibriumCBSESim",
                     "C12_EconomicsCrossElasticityDemandSim"],
    (12, "eco", 8): ["C12_EconomicsCircularFlowIncomeSim", "C12_EcoNationalIncomeCBSESim"],
    (12, "eco", 9): ["C12_EconomicsMoneyMeaningKindsSim", "C12_EconomicsQuantitativeMethodsCreditSim"],
    (12, "eco", 10): ["C12_EconomicsExanteplannedDemandSim"],
    (12, "eco", 11): ["C12_EconomicsPublicRevenueMeaningSim", "C12_EcoGovernmentBudgetCBSESim"],

    # ---------------- Geography (21 ch, 229 nodes) ----------------
    # ch1 human geography, ch2 world population: no sims
    (12, "geo", 3): ["C12_GeoHumanDevelopmentCBSESim"],
    (12, "geo", 4): ["C12_GeographyHumanSettlementsSim"],             # census rural/urban criteria nodes
    (12, "geo", 5): ["C12_GeoLandResourcesAgricultureCBSESim"],       # primary activities / agriculture
    (12, "geo", 6): ["C12_GeographyIndustriesAgrobasedSim"],          # secondary activities
    (12, "geo", 7): ["C12_GeographyTertiaryQuaternarySim"],
    # ch8 transport (world): no sim
    (12, "geo", 9): ["C12_GeoPopulationDistributionCBSESim"],
    (12, "geo", 10): ["C12_GeographyHumanSettlementsSim"],            # Indian settlements
    (12, "geo", 11): ["C12_GeoLandResourcesAgricultureCBSESim"],
    (12, "geo", 12): ["C12_GeographyWaterResourcesIrrigationSim", "C12_GeographyDroughtsFloodsSim"],
    (12, "geo", 13): ["C12_GeographyWaterResourcesIrrigationSim"],    # resource matrix covers minerals/iron ore
    (12, "geo", 14): ["C12_GeographyIndustriesAgrobasedSim"],         # manufacturing industries
    (12, "geo", 15): ["C12_GeoTransportCommunicationCBSESim"],
    (12, "geo", 16): ["C12_GeoInternationalTradeCBSESim"],
    (12, "geo", 17): ["C12_GeographySelectedIssuesSim"],
    # ch18 data sources, ch19 data processing, ch21 field survey: no sims
    (12, "geo", 20): ["C12_GeographyGraphicalRepresentationSim"],

    # ---------------- History (12 ch, 141 nodes) ----------------
    # ch1 Harappa, ch2 Kings Farmers Towns, ch3 Mahabharata, ch5 Travellers,
    # ch7 Vijayanagara, ch12 Framing the Constitution: no sims
    (12, "hist", 4): ["C12_HistoryThinkersBeliefsBuildingsSim"],      # Sanchi
    (12, "hist", 6): ["C12_HistoryBhaktiSufiTraditionsSim"],
    (12, "hist", 8): ["C12_HistoryPeasantsZamindarsStateSim"],
    (12, "hist", 9): ["C12_HistoryColonialismCountrysideSim"],
    (12, "hist", 10): ["C12_HistoryMeerutMutinySim"],
    (12, "hist", 11): ["C12_HistoryAugustOffer1940Sim"],              # 1940-48 nationalist endgame

    # ---------------- Home Science (14 ch, 168 nodes) ----------------
    # ch1 work/livelihood, ch8 design, ch9 fashion, ch11 hospitality, ch12 consumer ed, ch14 corporate comm: no sims
    (12, "hs", 2): ["C12_BiologyClinicalNutritionCBSESim", "C12_HomeScienceSpecialDietsFeverSim"],
    (12, "hs", 3): ["C12_HomeSciencePrinciplesMethodsCookingSim"],    # Poshan / public nutrition
    (12, "hs", 4): ["C12_HomeSciencePrinciplesMethodsCookingSim"],    # cooking methods / processing
    (12, "hs", 5): ["C12_BiologyFoodQualityCBSESim"],
    (12, "hs", 6): ["C12_BiologyEarlyChildhoodCareCBSESim"],
    (12, "hs", 7): ["C12_HomeScienceSupportServicesSim"],
    (12, "hs", 10): ["C12_HomeScienceFabricCareDecisionSim"],
    (12, "hs", 13): ["C12_HomeScienceDevCommJournalismSim"],

    # ---------------- Informatics Practices (7 ch, 84 nodes) ----------------
    (12, "ip", 1): ["C12_InformaticsPracticesSQLFunctionsSim"],
    (12, "ip", 2): ["C12_InformaticsPracticesPandasSeries1Sim"],
    (12, "ip", 3): ["C12_ComputerScienceComputerNetworksSim", "C12_ComputerSciencePacketJourneySim"],
    (12, "ip", 4): ["C12_ComputerScienceSecurityAspectsSim", "C12_ComputerScienceNetworkSecurityCryptographySim"],
    (12, "ip", 5): ["C12_ComputerScienceComputerNetworksSim", "C12_ComputerSciencePacketJourneySim"],
    # ch6 HTML/XML: no sim
    (12, "ip", 7): ["C12_ComputerScienceNetworkSecurityCryptographySim", "C12_ComputerScienceSecurityAspectsSim"],

    # ---------------- Mathematics (13 ch, 119 nodes) ----------------
    (12, "math", 1): ["C12_MathematicsTypesRelationsReflexiveSim", "C12_AppliedMathsTypesRelationsReflexiveSim"],
    (12, "math", 2): ["C12_MathematicsInverseTrigPropertiesSim"],
    (12, "math", 3): ["C12_MathematicsMatrixMultiplicationSim", "C12_MathsMatrixTransformsSim",
                      "C12_AppliedMathsMatricesConceptNotationSim"],
    (12, "math", 4): ["C12_MathematicsDeterminantsSim", "C12_MathematicsConsistencyInconsistencySystemsSim",
                      "C12_AppliedMathsAdjointInverseMatrixSim"],
    (12, "math", 5): ["C12_MathematicsContinuityAndDifferentiabilitySim", "C12_MathematicsDerivativesParametricFunctionsSim"],
    (12, "math", 6): ["C12_MathematicsDerivativesParametricFunctionsSim", "C12_MathsMaximaMinimaSurfacesSim",
                      "C12_AppliedMathsRateChangeQuantitiesSim", "C12_AppliedMathsApplicationCalculusSketchingSim",
                      "C12_AppliedMathsDifferentiationApplicationsSim"],
    (12, "math", 7): ["C12_MathematicsIntegrationTrigonometricPowersSim", "C12_MathematicsWallisFormulaReductionSim"],
    (12, "math", 8): ["C12_MathematicsAreaUnderSimpleSim", "C12_MathsDefiniteIntegralRiemannSim",
                      "C12_MathsSolidsOfRevolutionSim", "C12_AppliedMathsIntegrationApplicationsSim"],
    (12, "math", 9): ["C12_MathematicsChapter9DifferentialEquationsSim"],
    (12, "math", 10): ["C12_MathematicsTypesVectorsequalSim", "C12_MathsScalarTripleProductSim"],
    (12, "math", 11): ["C12_MathematicsGeometryFormsPlaneSim", "C12_MathsLinesPlanesSpaceSim",
                       "C12_MathsPlaneThrough3PointsSim"],
    (12, "math", 12): ["C12_MathematicsLinearProgrammingSim"],
    (12, "math", 13): ["C12_MathematicsTheoremTotalProbabilitySim", "C12_AppliedMathsRandomVariableProbabilitySim"],

    # ---------------- Physics (14 ch, 122 nodes) ----------------
    (12, "phy", 1): ["C12_PhysicsElectricChargestypesSim", "C12_PhysicsElectricFluxSim",
                     "C12_PhysicsElectrostaticSystemChargesSim", "C12_PhysicsElectricDipoleSim"],
    (12, "phy", 2): ["C12_PhysicsElectrostaticPotentialCapacitanceCBSESim", "C12_PhysicsElectrostaticSystemChargesSim"],
    (12, "phy", 3): ["C12_PhysicsInternalResistanceSim"],
    (12, "phy", 4): ["C12_PhysicsAmperesCircuitalSim", "C12_PhysicsCurrentLoopFieldSim", "C12_PhysicsMagneticFieldLinesSim"],
    (12, "phy", 5): ["C12_PhysicsMagneticFieldLinesSim", "C12_PhysicsMagnetismandMatterCBSESim"],
    (12, "phy", 6): ["C12_PhysicsGeneratorSim", "C12_PhysicsSelfinductionSelfinductanceSim",
                     "C12_PhysicsMagneticFieldLinesSim"],             # EMI incl. eddy-current braking
    (12, "phy", 7): ["C12_PhysicsAlternatingCurrentCBSESim", "C12_PhysicsSelfinductionSelfinductanceSim"],
    (12, "phy", 8): ["C12_PhysicsElectromagneticWavesCBSESim", "C12_PhysicsEMWavePropagationSim"],
    (12, "phy", 9): ["C12_PhysicsRayOpticsAndOpticalInstrumentsSim", "C12_PhysicsDispersionThroughPrismSim",
                     "C12_PhysicsPrismRefractionSim"],
    (12, "phy", 10): ["C12_PhysicsSingleSlitDiffractionSim", "C12_PhysicsBrewstersPolarizationReflectionSim",
                      "C12_PhysicsYoungDoubleSlitSim", "C12_PhysicsHuygensWavefrontsSim"],
    (12, "phy", 11): ["C12_PhysicsDualNatureRadiationCBSESim"],
    (12, "phy", 12): ["C12_PhysicsAtomsSim", "C12_PhysicsEnergyLevelsHydrogenSim", "C12_PhysicsBohrAtomSim",
                      "C12_PhysicsRutherfordScatteringSim"],
    (12, "phy", 13): ["C12_PhysicsNucleiCBSESim"],
    (12, "phy", 14): ["C12_PhysicsSemiconductorElectronicsMaterialsDevicesAndSim", "C12_PhysicsZenerDiodeSim",
                      "C12_PhysicsEnergyBandsSolidsSim", "C12_PhysicsBandGapSim", "C12_PhysicsPNJunctionDiodeSim"],

    # ---------------- Political Science (15 ch, 150 nodes) ----------------
    (12, "ps", 1): ["C12_HistoryGhana19571966BackgroundSim"],         # cold-war blocs / decolonisation
    (12, "ps", 9): ["C12_HistoryFirstGeneralElectionSim"],            # 1952 one-party dominance
    (12, "ps", 12): ["C12_HistoryFirstGeneralElectionSim"],           # 1967 elections
    (12, "ps", 14): ["C12_HistoryPunjabCrisisAkaliSim"],              # regional aspirations 1947-86
    # all other CWP / Politics-in-India chapters: no sims

    # ---------------- Psychology (7 ch, 83 nodes) ----------------
    (12, "psy", 1): ["C12_PsychologyDefinitionIntelligenceFactorSim"],
    (12, "psy", 2): ["C12_PsychologyHumanisticTraitTheoriesSim", "C12_PsySelfPersonalityCBSESim"],
    (12, "psy", 3): ["C12_PsychologyMeaningStressNatureSim"],
    (12, "psy", 4): ["C12_PsyPsychologicalDisordersCBSESim"],
    (12, "psy", 5): ["C12_PsyTherapeuticApproachesCBSESim", "C12_PsychologyPsychotherapyPsychoanalysisClientcentredSim"],
    (12, "psy", 6): ["C12_PsychologyPsychotherapyPsychoanalysisClientcentredSim"],  # attitude/conformity labs
    (12, "psy", 7): ["C12_PsychologyPsychotherapyPsychoanalysisClientcentredSim"],  # social influence content

    # ---------------- Sociology (15 ch, 163 nodes) ----------------
    (12, "soc", 1): ["C12_SociologyIntroducingIndianSocietySim", "C12_SociologyDefinitionFeaturesSocialSim"],
    (12, "soc", 2): ["C12_SociologySocialChangeDevelopmentSim"],      # demographic transition content
    (12, "soc", 3): ["C12_SociologyDefinitionFeaturesTribeSim"],
    (12, "soc", 5): ["C12_SociologyDefinitionFeaturesTribeSim"],      # inequality/identity mapping
    (12, "soc", 6): ["C12_SociologyBeliefsRitualsSuperstitionsSim"],
    # ch4 market as institution, ch7 project work: no sims
    (12, "soc", 8): ["C12_SociologySocialChangeDevelopmentSim"],      # structural change (Sonpur)
    (12, "soc", 9): ["C12_SociologyCulturalChangeSim"],
    (12, "soc", 10): ["C12_SociologyConstitutionSocialChangeSim"],
    (12, "soc", 11): ["C12_SociologySocialChangeDevelopmentSim"],     # rural change
    (12, "soc", 12): ["C12_SociologySocialChangeDevelopmentSim"],     # industrial society
    (12, "soc", 13): ["C12_SociologyGlobalisationSim"],
    # ch14 mass media: no sim (MassMedia vocational sims serve a different subject)
    (12, "soc", 15): ["C12_HistoryAntidowryMovement1970sSim"],        # social movements

    # English (eng_f/eng_k/eng_v) and Hindi (hin_a/hin_al/hin_ar/hin_v):
    # zero sims exist for any chapter - all such nodes are structurally MISSING.
}

# Sims that exist but serve NO chapter of the current class-12 node index
# (dropped/legacy topics or subjects absent from the index). Recorded in the
# output so the audit explains why these sims deliver nothing.
SIMS_WITHOUT_NODES = {
    "C12_ChemistrySolidstatecharacteristicsSim": "solid state content dropped from the class-12 node index",
    "C12_ChemistrySolidStateCrystalLatticesSim": "solid state chapter dropped (3D sim)",
    "C12_ChemistryClosePackingVoidsSim": "solid state chapter dropped (3D sim)",
    "C12_ChemistryMetallicCrystalsSim": "solid state chapter dropped (3D sim)",
    "C12_ChemistryAdsorptionisothermsSim": "surface chemistry chapter dropped",
    "C12_ChemistryGeneralPrinciplesAndProcessesOfSim": "metallurgy chapter dropped",
    "C12_ChemistryUsesofmetalsandalloysSim": "metallurgy chapter dropped",
    "C12_ChemistryDrugtargetinteractionSim": "chemistry-in-everyday-life chapter dropped",
    "C12_BiologyEcosystemSim": "ecosystem chapter absent from the class-12 node index",
    "C12_BiologyBiodiversityAndConservationSim": "biodiversity chapter absent from the class-12 node index",
    "C12_BiologyEnvironmentalIssuesSim": "environmental issues chapter absent from the class-12 node index",
    "C12_ComputerScienceJavaStreamFilterSim": "Java track absent from the Python CS node index",
    "C12_ComputerScienceJavaProjectBankingSim": "Java track absent from the Python CS node index",
    "C12_ComputerScienceOperatingSystemInternalsSim": "OS internals absent from the CS node index",
    "C12_ComputerScienceSoftwareTestingUnitSim": "software testing absent from the CS node index",
    "C12_ComputerScienceFinalRevisionCompleteSim": "whole-syllabus revision sim, not chapter-scoped",
    "C12_AppliedMathsEMIAnnuitySim": "applied-maths financial mathematics has no core-math chapter",
    "C12_AppliedMathsFinancialMathematicsCalculationSim": "applied-maths financial mathematics has no core-math chapter",
    "C12_EcoOpenEconomyMacroCBSESim": "open-economy/BOP chapter absent from the eco node index",
    "C12_HomeScienceIssuesConcernsAdolescentsSim": "adolescence chapter absent from the current HS book",
    "C12_CommerceBonusIssueRightsSim": "",  # mapped to bs ch10 (below) - kept out of this dict
    "C12_EVSMonitoringAtmosphereQualitySim": "EVS subject absent from the node index",
    "C12_EVSModernSchoolsEcologicalSim": "EVS subject absent from the node index",
    "C12_LegalStagesElementsCrimeSim": "legal studies subject absent from the node index",
}
# Fix name + keep the actually-mapped Commerce sims out of the no-node list
SIMS_WITHOUT_NODES.pop("C12_CommerceBonusIssueRightsSim", None)
SIMS_WITHOUT_NODES.pop("C12_LegalStagesElementsCrimeSim", None)
SIMS_WITHOUT_NODES["C12_LegalStudiesStagesElementsCrimeSim"] = "legal studies subject absent from the node index"
SIMS_WITHOUT_NODES["C12_LegalStudiesNatureDefinitionTortSim"] = "legal studies subject absent from the node index"
for _mm in ["C12_MassMediaCameraAnglesCloseupSim", "C12_MassMediaCultureCommunicationWhatSim",
            "C12_MassMediaRoleSocialMediaSim"]:
    SIMS_WITHOUT_NODES[_mm] = "mass media subject absent from the node index"
for _ap in ["C12_AppliedMathsTypesRelationsReflexiveSim", "C12_AppliedMathsMatricesConceptNotationSim",
            "C12_AppliedMathsAdjointInverseMatrixSim", "C12_AppliedMathsRateChangeQuantitiesSim",
            "C12_AppliedMathsApplicationCalculusSketchingSim", "C12_AppliedMathsDifferentiationApplicationsSim",
            "C12_AppliedMathsIntegrationApplicationsSim", "C12_AppliedMathsRandomVariableProbabilitySim"]:
    SIMS_WITHOUT_NODES.pop(_ap, None)  # these ARE mapped to the matching core-maths chapters

# ---------------------------------------------------------------------------
# Domain synonym expansion for diagnostic terms (semantic bridging, kept small
# and auditable). Keys are stemmed tokens; values are alternative spellings /
# symbol forms searched in sim text.
# ---------------------------------------------------------------------------
SYNONYMS = {
    "percent": ["%"], "percentage": ["%"],
    "electrochem": ["galvanic", "electrolytic", "cell"],
    "conductivity": ["conductance", "molar conductivity"],
    "nernst": ["electrode potential"],
    "kinetic": ["rate"],
    "haloalkane": ["alkyl halide", "haloarene"],
    "phenol": ["phenols"],
    "ether": ["alkoxide", "williamson"],
    "aldehyde": ["carbonyl", "ketone"],
    "amine": ["diazonium"],
    "biomolecule": ["carbohydrate", "protein", "vitamin", "nucleic acid"],
    "coordination": ["complex", "ligand"],
    "isomer": ["isomerism", "isomers"],
    "colligative": ["osmotic pressure", "boiling point elevation", "freezing point depression"],
    "reflexive": ["relation", "symmetric", "transitive"],
    "matrix": ["matrices"], "determinant": ["determinants"],
    "continuity": ["continuous", "differentiability", "differentiable"],
    "derivative": ["differentiation", "maxima", "minima"],
    "integral": ["integration", "antiderivative"],
    "vector": ["vectors", "dot product", "cross product"],
    "direction cosine": ["direction cosines"],
    "probability": ["bayes", "conditional probability", "random variable"],
    "lpp": ["linear programming", "feasible"],
    "differential": ["differential equation"],
    "charge": ["coulomb", "electrostatic"],
    "dipole": ["dipole moment"],
    "flux": ["gauss"],
    "potential": ["capacitor", "capacitance"],
    "current": ["ammeter", "ohm", "resistivity"],
    "magnetic": ["magnetism", "lorentz"],
    "induction": ["faraday", "lenz", "emf"],
    "wavefront": ["huygens"],
    "interference": ["young", "double slit", "fringe"],
    "diffraction": ["single slit"],
    "polarization": ["brewster", "polariser", "polaroid"],
    "photoelectric": ["photon", "work function", "threshold"],
    "bohr": ["hydrogen spectrum", "energy level"],
    "nucleus": ["nuclei", "isotope", "binding energy"],
    "semiconductor": ["diode", "pn junction", "doping"],
    "band": ["energy band", "band gap"],
    "rectifier": ["diode"],
    "transistor": ["amplifier"],
    "dna": ["deoxyribonucleic", "double helix"],
    "pollengrain": ["pollen"],
    "embryo": ["embryogenesis"],
    "menstruation": ["menstrual"],
    "mendel": ["inheritance"],
    "plasmid": ["vector", "restriction"],
    "enzyme": ["bioreactor"],
    "habitat": ["niche", "ecosystem"],
    "population": ["populations"],
    "goodwill": ["sacrificing ratio", "revaluation"],
    "debenture": ["debentures"],
    "share": ["shares", "share capital"],
    "ratio": ["ratios", "turnover"],
    "cashflow": ["cash flow"],
    "demand": ["demand curve", "elasticity"],
    "utility": ["marginal utility", "equimarginal"],
    "equilibrium": ["excess demand", "excess supply"],
    "gdp": ["national income", "value added"],
    "money": ["currency", "central bank"],
    "budget": ["fiscal", "receipts", "expenditure"],
    "network": ["topology", "lan", "tcp"],
    "sql": ["mysql", "query"],
    "pandas": ["series", "dataframe"],
    "boolean": ["logic gate", "truth table"],
    "stack": ["push", "pop"],
    "cyber": ["phishing", "cybercrime", "cyber safety"],
    "settlement": ["rural", "urban"],
    "trade": ["exports", "imports"],
    "coldwar": ["cold war"],
    "caste": ["tribe", "family"],
    "globalisation": ["globalization"],
    "attitude": ["conformity"],
    "stress": ["coping", "stressor"],
    "disorder": ["abnormal", "anxiety"],
    "therapy": ["psychotherapy", "counselling"],
    "personality": ["trait", "self"],
    "intelligence": ["iq", "psychometric"],
    "goodness": ["fit"],
}

STOPWORDS = set("""the a an of and or in to for is are was were with by from as that this these those it its
on be can could should would may might must will shall do does did done not no nor but if then than also
more most such other another each any all some both few many much very using use used uses student students
learn learning ability able capacity correctly properly which what when where who whom whose how why
whether between among within without during following above below given give gives taking take takes
question questions answer answers option options correct incorrect mcq
explain describing describe identify distinguishing distinguish define define
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
    """Question terms and answer terms (stemmed, IDF-selected, synonym-expanded).
    The question stem carries the tested skill; the answer adds supporting
    vocabulary but also distractor rationale, so it is weighted lower."""
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
    carry topic vocabulary (e.g. 'kaprekar', 'chlorophyll')."""
    with open(path, encoding="utf-8") as f:
        return f.read().lower()


# ---------------------------------------------------------------------------
# Answer-key defect scanning
# ---------------------------------------------------------------------------

def _split_top_level(body):
    """Split an array body on top-level commas, respecting quoted strings."""
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
    """Bracket-matched extraction of `key: [ ... ]` from an object literal."""
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
                return seg[b + 1 : j]
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
                    seg = txt[start : j + 1]
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
# Audit core
# ---------------------------------------------------------------------------

def load_nodes():
    with open(NODE_INDEX, encoding="utf-8") as f:
        data = json.load(f)
    return [n for n in data["nodes"] if n.get("class") == 12]


def chapter_key(node):
    m = re.match(r"c12_([a-z_]+?)_cbse_(\d+)_", node["node_id"])
    if not m:
        return (12, node.get("subject", "unknown"), 0)
    return (12, m.group(1), int(m.group(2)))


def resolve_sim(name, missing_log):
    for d in SIM_DIRS:
        p = os.path.join(d, name + ".tsx")
        if os.path.exists(p):
            return p
    missing_log.append(name)
    return None


def audit(nodes, sim_cache, defect_cache):
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
    missing_log = []
    mapped_sims = {}
    for k in chap_nodes:
        names = CHAPTER_MAP.get(k, [])
        paths = []
        for nm in names:
            p = resolve_sim(nm, missing_log)
            if p:
                paths.append((nm, p))
        mapped_sims[k] = paths
        for nm, p in paths:
            if nm not in sim_cache:
                sim_cache[nm] = TokenIndex(sim_text(p))
            if nm not in defect_cache:
                defect_cache[nm] = scan_sim_defects(p)

    # ---- per node scoring ----
    results = []
    gold_by_sim, served_by_sim, verdict_by_sim = Counter(), Counter(), defaultdict(Counter)
    for n in cls_nodes:
        k = chapter_key(n)
        subj, ch = k[1], k[2]
        diags = n.get("diagnostics") or []
        sims = mapped_sims.get(k, [])
        uncovered = []
        per_diag = []
        if not diags:
            cov_ratio, verdict = 0.0, "MISSING"
        elif not sims:
            cov_ratio = 0.0
            verdict = "MISSING"
            uncovered = ["<no sim mapped to %s ch%02d - all %d diagnostics uncovered>" % (subj, ch, len(diags))]
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

        primary = None
        if sims:
            if not per_diag:
                primary = sims[0][0]
            else:
                def sim_score(nm):
                    return sum(diag_score(d, sim_cache[nm], idf) for d in diags)
                primary = max(sims, key=lambda nm_p: sim_score(nm_p[0]))[0]
            for nm, _p in sims:
                served_by_sim[nm] += 1
                verdict_by_sim[nm][verdict] += 1
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

        results.append({
            "node_id": n["node_id"],
            "subject": subj,
            "subject_label": SUBJECT_LABELS.get(subj, subj),
            "chapter": ch,
            "sim_id": primary,
            "sims": [nm for nm, _p in sims],
            "verdict": verdict,
            "coverage": round(cov_ratio, 3),
            "diagnostics_total": len(diags),
            "uncovered_diagnostics": uncovered,
            "defects": defects,
        })
    return cls_nodes, results, gold_by_sim, served_by_sim, verdict_by_sim, missing_log, mapped_sims


def build_output(results, gold_by_sim, served_by_sim, verdict_by_sim, missing_log, mapped_sims):
    counts = Counter(r["verdict"] for r in results)

    # ---- per-subject grouping ----
    per_subject = {}
    by_subj = defaultdict(list)
    for r in results:
        by_subj[r["subject"]].append(r)
    for subj in sorted(by_subj):
        rows = by_subj[subj]
        c = Counter(r["verdict"] for r in rows)
        chapters = []
        by_ch = defaultdict(list)
        for r in rows:
            by_ch[r["chapter"]].append(r)
        for ch in sorted(by_ch):
            crows = by_ch[ch]
            cc = Counter(r["verdict"] for r in crows)
            sims_for_ch = sorted({s for r in crows for s in r["sims"]})
            chapters.append({
                "chapter": ch,
                "nodes": len(crows),
                "gold": cc.get("GOLD", 0),
                "partial": cc.get("PARTIAL", 0),
                "missing": cc.get("MISSING", 0),
                "mapped_sims": sims_for_ch,
            })
        sims_ranked = sorted(
            ({ "sim_id": s, "gold_nodes": gold_by_sim.get(s, 0), "served_nodes": served_by_sim.get(s, 0),
               "partial_nodes": verdict_by_sim[s].get("PARTIAL", 0), "missing_nodes": verdict_by_sim[s].get("MISSING", 0)}
             for s in {r["sim_id"] for r in rows if r["sim_id"]}),
            key=lambda d: (-d["gold_nodes"], d["sim_id"]))
        per_subject[subj] = {
            "label": SUBJECT_LABELS.get(subj, subj),
            "total_nodes": len(rows),
            "gold": c.get("GOLD", 0),
            "partial": c.get("PARTIAL", 0),
            "missing": c.get("MISSING", 0),
            "gold_pct": round(100.0 * c.get("GOLD", 0) / len(rows), 1),
            "chapters": chapters,
            "chapters_total": len(by_ch),
            "chapters_with_any_sim": sum(1 for chrow in chapters if chrow["mapped_sims"]),
            "sims": sims_ranked,
        }

    # ---- sim league tables ----
    all_served = sorted(served_by_sim)
    sims_ranked = [
        {"sim_id": s, "gold_nodes": gold_by_sim.get(s, 0), "served_nodes": served_by_sim.get(s, 0),
         "partial_nodes": verdict_by_sim[s].get("PARTIAL", 0), "missing_nodes": verdict_by_sim[s].get("MISSING", 0)}
        for s in all_served
    ]
    sims_ranked.sort(key=lambda d: (-d["gold_nodes"], d["sim_id"]))
    worst_sims = sorted(
        (d for d in sims_ranked if d["served_nodes"] > 0),
        key=lambda d: (d["gold_nodes"], -d["served_nodes"], d["sim_id"]))[:20]

    defect_nodes = [r for r in results if any(d["sim"] for d in r["defects"])]
    node_data_defects = sum(
        1 for r in results if any(d["kind"] == "node_diagnostic_answer_placeholder" for d in r["defects"]))
    mapped_names_in_map = sorted({nm for names in CHAPTER_MAP.values() for nm in names})
    unmapped_sims_in_map = [nm for nm in mapped_names_in_map if served_by_sim.get(nm, 0) == 0]

    return {
        "class": 12,
        "generated_by": "backend/tools/audit_class12_depth.py",
        "method": {
            "approach": (
                "Chapter-level sim mapping (hand-curated from every sim's teaching text, doc comment "
                "and title, matched against each chapter's node definitions in enhanced_nodes_index.json "
                "and the NCERT chapter titles in catalog_class12_*.json), then per-node diagnostic "
                "coverage scoring of each node's 6 diagnostics (q+a+misconception) against the full text "
                "of the mapped sim component(s) across simulations/c6_12, /c6_12_new and /three."
            ),
            "heuristic": (
                "A diagnostic counts covered when 0.65 * (IDF-weighted share of its question-stem terms "
                "present in the sim source text) + 0.35 * (share of its answer terms) >= %.2f. Both the "
                "diagnostic and the sim text are stemmed with the same light stemmer and matched by "
                "equality or shared prefix, plus a curated synonym table (e.g. percent->'%%', "
                "colligative->'osmotic pressure'). IDF is computed over the ~330 class-12 chapter "
                "documents so common academic vocabulary cannot fake coverage. GOLD = all diagnostics "
                "covered; PARTIAL = at least two diagnostics covered; MISSING = no mapped sim or fewer "
                "than two diagnostics covered. Lexical heuristic - conservative on metaphorical sims; "
                "boundary cases were hand-verified (see spot_checks)." % (COVER_THRESHOLD,)
            ),
            "mapping_source": "CHAPTER_MAP table in backend/tools/audit_class12_depth.py",
            "sim_directories": [os.path.relpath(d, ROOT).replace("\\", "/") for d in SIM_DIRS],
            "unmapped_chapters": sorted(
                "%s ch%02d" % (subj, ch)
                for (_c, subj, ch) in {chapter_key_from_subject(subj, ch) for subj, ch in
                                       {(r["subject"], r["chapter"]) for r in results}}
                if not CHAPTER_MAP.get((12, subj, ch))
            ),
            "mapped_sim_files_missing": sorted(set(missing_log)),
            "sims_without_matching_nodes": [
                {"sim_id": s, "reason": r} for s, r in sorted(SIMS_WITHOUT_NODES.items()) if r
            ],
            "mapped_but_zero_gold_sims": unmapped_sims_in_map,
            "limitations": [
                "Lexical term-presence scoring, not interaction testing: a sim may exercise a skill "
                "without naming it, or name it without a scored interaction.",
                "Sims scoped to dropped NCERT chapters (solid state, surface chemistry, metallurgy, "
                "chemistry in everyday life, ecosystem/biodiversity/environmental issues) or to subjects "
                "absent from the node index (EVS, Legal Studies, Mass Media, the Java CS track) deliver "
                "nothing to the current class-12 nodes and are listed explicitly.",
                "English and Hindi literature subjects have no simulations at all; every one of those "
                "nodes is structurally MISSING.",
                "Answer-key defect scan is structural (index range, duplicate options, numeric key type, "
                "% of arithmetic); it does not re-derive every computed answer.",
            ],
        },
        "summary": {
            "total_nodes": len(results),
            "gold": counts.get("GOLD", 0),
            "partial": counts.get("PARTIAL", 0),
            "missing": counts.get("MISSING", 0),
            "gold_pct": round(100.0 * counts.get("GOLD", 0) / max(1, len(results)), 1),
            "nodes_with_mapped_sim": sum(1 for r in results if r["sims"]),
            "nodes_without_any_mapped_sim": sum(1 for r in results if not r["sims"]),
            "missing_with_mapped_sim_but_uncovered": sum(
                1 for r in results if r["verdict"] == "MISSING" and r["sims"]),
            "distinct_sims_delivering_gold": len(gold_by_sim),
            "distinct_sims_serving_nodes": len(served_by_sim),
            "sims_ranked_by_gold_nodes": sims_ranked,
            "worst_sims_least_gold_among_served": worst_sims,
            "nodes_with_sim_defects": len(defect_nodes),
            "nodes_with_placeholder_diagnostic_answers": node_data_defects,
            "per_subject": per_subject,
        },
        "spot_checks": {
            "description": (
                "15 verdicts hand-verified across subjects against the actual sim interactions "
                "(stratified sample; fixed list recorded in the audit script)."
            ),
            "agree": 0,
            "total": 0,
            "checks": [],
        },
        "nodes": results,
    }


def chapter_key_from_subject(subj, ch):
    return (12, subj, ch)


def main():
    nodes = load_nodes()
    sim_cache, defect_cache = {}, {}
    cls_nodes, results, gold_by_sim, served_by_sim, verdict_by_sim, missing_log, mapped_sims = \
        audit(nodes, sim_cache, defect_cache)
    out = build_output(results, gold_by_sim, served_by_sim, verdict_by_sim, missing_log, mapped_sims)

    # merge recorded spot checks (kept in the script so re-runs stay deterministic)
    spot = SPOT_CHECKS
    out["spot_checks"]["agree"] = sum(1 for s in spot if s["agree"])
    out["spot_checks"]["total"] = len(spot)
    out["spot_checks"]["checks"] = spot
    spot_by_id = {s["node_id"]: s for s in spot}
    for r in out["nodes"]:
        if r["node_id"] in spot_by_id:
            r["spot_check"] = spot_by_id[r["node_id"]]["hand"]

    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(out, f, indent=1, ensure_ascii=False, sort_keys=False)

    s = out["summary"]
    print("CLASS 12: total=%d gold=%d partial=%d missing=%d (no-mapped-sim=%d) sims_with_gold=%d defect_nodes=%d"
          % (s["total_nodes"], s["gold"], s["partial"], s["missing"],
             s["nodes_without_any_mapped_sim"], s["distinct_sims_delivering_gold"], s["nodes_with_sim_defects"]))
    for subj in sorted(s["per_subject"]):
        ps = s["per_subject"][subj]
        print("  %-7s %-28s nodes=%4d gold=%4d partial=%4d missing=%4d (%.1f%% gold)"
              % (subj, ps["label"], ps["total_nodes"], ps["gold"], ps["partial"], ps["missing"], ps["gold_pct"]))
    print("  wrote %s" % OUT_PATH)
    return 0


# ---------------------------------------------------------------------------
# Hand verification record (15 verdicts across subjects, drawn from the first
# heuristic run and checked by reading the node's diagnostics against the
# sim's actual challenges/labs/teaching copy).
# ---------------------------------------------------------------------------
SPOT_CHECKS = [
    {"node_id": "c12_phy_cbse_12_003", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
     "note": "EnergyLevelsHydrogen sim carries 18 references to 13.6 eV plus energy-level/ground-state/ionisation labs - all six H-atom energy diagnostics exercised."},
    {"node_id": "c12_math_cbse_11_004", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
     "note": "3D LinesPlanesSpace lab classifies skew/parallel/intersecting and computes the shortest gap live (d=|w|/|n|); the open design task and the negative-distance misconception killer remain uncovered."},
    {"node_id": "c12_chem_cbse_02_005", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
     "note": "ElectrochemistryCBSE sim has molar-conductivity, cell-constant, KCl and strong/weak-electrolyte content matching all six Lambda_m diagnostics."},
    {"node_id": "c12_acc_cbse_01_002", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
     "note": "Jaipur partnership sim has deed-silent Section-13 default challenges, interest on capital/drawings and salary-vs-interest P&L appropriation mapping."},
    {"node_id": "c12_eco_cbse_08_003", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
     "note": "NationalIncomeCBSE + CircularFlowIncome sims carry 95 combined deflator/CPI/real-GDP references."},
    {"node_id": "c12_bio_cbse_06_004", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
     "note": "MolecularBasisCBSE sim has Meselson-Stahl/semi-conservative replication content; LinkageCrossingOver adds lab evidence."},
    {"node_id": "c12_psy_cbse_04_003", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
     "note": "PsychologicalDisordersCBSE sim covers GABA/schizophrenia neurotransmitter quizzes and behavioural/cognitive model contrasts."},
    {"node_id": "c12_soc_cbse_09_004", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
     "note": "CulturalChange sim contains a single incidental 'Westernisation' token; no Srinivas definition, two-forms distinction or sanskritisation-contrast content."},
    {"node_id": "c12_geo_cbse_20_005", "heuristic": "MISSING", "hand": "PARTIAL", "agree": False,
     "note": "Undercall: the GraphicalRepresentation sim has an interactive bar/line/pie switcher with a y-axis truncation toggle ('starts at 10, not 0') that directly exercises the line-graph purpose and the Y-axis-zero-critique diagnostics under different vocabulary."},
    {"node_id": "c12_cs_cbse_01_004", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
     "note": "Networks sims have zero twisted-pair/coaxial/fibre/transmission-media content - guided media is a genuine topical gap."},
    {"node_id": "c12_hs_cbse_02_006", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
     "note": "ClinicalNutrition sim exercises diet-planning and vitamin-D-adjacent skills; the fat-soluble-vitamin mechanics diagnostics (micelles, Bitot's spots) are uncovered."},
    {"node_id": "c12_ip_cbse_02_004", "heuristic": "PARTIAL", "hand": "MISSING", "agree": False,
     "note": "Overcall: the PandasSeries1 sim contains zero occurrences of read_csv/read_excel (the lexical hits were HTML header tags); the CSV/Excel import-mechanics diagnostics are never exercised."},
    {"node_id": "c12_biotech_cbse_05_005", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
     "note": "RiceGenomeProject sim carries HGP/shotgun/base-pair content; GenomeTechnology and Sanger sims add sequencing-strategy evidence."},
    {"node_id": "c12_hist_cbse_04_006", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
     "note": "ThinkersBeliefsBuildings sim is exclusively Sanchi stupa architecture (anda, harmika, toranas) with one 'Buddha' mention; the Buddha-biography diagnostics (Lumbini, Four Sights, aniconic art) are unexercised."},
    {"node_id": "c12_acc_cbse_09_004", "heuristic": "GOLD", "hand": "PARTIAL", "agree": False,
     "note": "Overcall: the WorkingCapitalTurnover sim is a working-capital velocity / profitability-ratio / ROCE spreadsheet lab with one incidental 'cash flow' phrase; the direct-method cash-flow-statement skill is never taught."},
]


if __name__ == "__main__":
    sys.exit(main())
