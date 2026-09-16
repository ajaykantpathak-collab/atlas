# Simulation Coverage Map -- CBSE Platform

Generated: 2026-09-09. Read-only audit of `frontend/components/simulations/**/*.tsx` (715 files)
against the NCERT chapter corpus `backend/its/competency/catalog_*.json` (1221 catalogs, class 6-12,
997 unique chapters after dedupe). Machine-readable matrix: `SIMS_COVERAGE.json`.

## 1. Headline totals

| Metric | Count |
|---|---|
| Simulation component files (.tsx) | 715 |
| Healthy | 680 |
| Corrupted (in all_corrupted_sims.txt, on disk) | 35 |
| Stub (<2KB / no export / no interactivity) | 0 |
| Reachable via game registries (student-facing) | 576 |
| Reachable via direct import (pages/tutor/engine) | 3 |
| Referenced only from archived/test pages | 0 |
| Orphaned (imported nowhere outside simulations/) | 136 |
| Unique NCERT chapters (class 6-12) | 997 |
| Chapters with a plausible same-class sim (high/medium confidence) | 251 (25%) |
| Chapters weakly matched (low confidence) | 11 |
| Chapters with no sim (excl. language subjects, incl. weak) | 545 |

## 2. Health summary

- **0 stubs detected**: the smallest file is 3.2KB; every file has an export and interactive logic.
- **35 corrupted on disk** (from the 303-entry `all_corrupted_sims.txt`; the other 268 entries point to
  paths that no longer exist, e.g. removed `c6_8/` and `c6_12_backups/` dirs). On disk: **20 of 24
  class1 games** and **15 `c6_12/` files**. These are being repaired by separate agents and are flagged
  `corrupted` in the JSON. Most are registry-wired, so their games render broken until fixed.

## 3. Totals per class

| Class | Files | Healthy | Corrupted | Registry-wired | Orphaned |
|---|---|---|---|---|---|
| 1 | 24 | 4 | 20 | 21 | 3 |
| 10 | 61 | 59 | 2 | 53 | 8 |
| 11 | 166 | 163 | 3 | 123 | 43 |
| 12 | 183 | 180 | 3 | 131 | 52 |
| 2 | 20 | 20 | 0 | 20 | 0 |
| 3 | 31 | 31 | 0 | 31 | 0 |
| 4 | 28 | 28 | 0 | 28 | 0 |
| 5 | 33 | 33 | 0 | 33 | 0 |
| 6 | 37 | 34 | 3 | 33 | 4 |
| 7 | 34 | 34 | 0 | 26 | 8 |
| 8 | 31 | 29 | 2 | 25 | 6 |
| 9 | 61 | 59 | 2 | 52 | 9 |
| None | 6 | 6 | 0 | 0 | 3 |

(Class `None` = shared primitives/renderers at the simulations root and `maths/` helper sims.)

## 4. Totals per subject

| Subject | Files | Healthy | Corrupted | Registry-wired | Orphaned |
|---|---|---|---|---|---|
| chemistry | 112 | 112 | 0 | 56 | 56 |
| maths | 107 | 95 | 12 | 107 | 0 |
| physics | 80 | 76 | 4 | 60 | 20 |
| biology | 63 | 63 | 0 | 41 | 22 |
| history_civics | 44 | 44 | 0 | 44 | 0 |
| economics | 38 | 38 | 0 | 30 | 8 |
| computer_science | 35 | 32 | 3 | 35 | 0 |
| geography | 31 | 27 | 4 | 17 | 14 |
| evs | 27 | 22 | 5 | 27 | 0 |
| bio | 25 | 23 | 2 | 25 | 0 |
| cs | 18 | 16 | 2 | 18 | 0 |
| geo | 17 | 15 | 2 | 17 | 0 |
| commerce | 17 | 17 | 0 | 17 | 0 |
| accountancy | 16 | 16 | 0 | 16 | 0 |
| psychology | 16 | 16 | 0 | 8 | 8 |
| chem | 9 | 8 | 1 | 9 | 0 |
| commercial_studies | 9 | 9 | 0 | 9 | 0 |
| business_studies | 9 | 9 | 0 | 9 | 0 |
| unknown | 7 | 7 | 0 | 0 | 6 |
| home_science | 7 | 7 | 0 | 7 | 0 |
| sociology | 7 | 7 | 0 | 7 | 0 |
| mass_media | 6 | 6 | 0 | 6 | 0 |
| political_science | 6 | 6 | 0 | 6 | 0 |
| legal_studies | 5 | 5 | 0 | 5 | 0 |
| mathematics | 4 | 4 | 0 | 0 | 2 |

## 5. Registry reachability -- how sims actually get served

Two distinct pipelines exist; file count alone is misleading.

**Pipeline A -- React game registries (the 715 .tsx components).**

- `frontend/lib/gameRegistry.ts` (class 1-5 games) and `frontend/lib/c6_12_gameRegistry.ts`
  (auto-generated, 443 entries `Sim0000..Sim0442`) lazy-import the components and expose
  `{ id, name, nodeIds[], subject, classLevel, component }` records.
- `ALL_GAMES = GAMES + C6_12_GAMES` feeds `frontend/app/(student)/simulations/page.tsx` and the
  living-world/junior-senior worlds; games launch by **world node ID** (`c6_phy_001`, `c10_chem_051`, ...),
  not by question text.
- **576 of 715 files are registry-wired and student-reachable.**
- **136 orphans**: all 55 files in `c6_12_new/`, all 56 in `c6_12_chem_upgraded/` (upgraded duplicates of
  already-wired chemistry sims -- wire them in or delete), 4 root primitives (`InteractiveNumberLine`,
  `SVGBodyDiagram`, `VisualChallenge`, plus `GameRenderer` which IS imported by `lib/game-engine/index.ts`),
  and ~21 unwired files inside `c6_12/` (443 wired entries vs 462 files).
- Reachable only from `_archive` / test pages: 3 files.

**Pipeline B -- PIXI plugin registry (`frontend/lib/sim-framework/`).**

- 13 built-in plugins (`lib/sim-framework/sims/*.ts`) self-register via `simulationRegistry.register()`
  in `lib/sim-framework/index.ts`; `SimulationEngine.run(question, subject)` picks the first plugin whose
  `canHandle(question, subject)` keyword/regex matches (subject-specific first, then any subject).
- Used by `lib/game-engine/challenges/VisualChallengeRenderer.ts` on the /play game canvas -- independent
  of the 715 .tsx files.
- `frontend/lib/sim-engine/` is a second, React-hook scene engine (audio/feedback/speech) consumed by the
  same game engine; it matches by scene config, not by question.

## 6. Chapter coverage matrix (class x subject, catalog chapters)

`existing_sims` = same-class sims in compatible subjects on disk. Coverage = fuzzy token overlap
between `chapter_title` and sim/game names (high/medium = covered; low = weak; none = missing).
Language subjects (english/hindi) and literature-style chapters are listed but not treated as sim gaps.

| Class | Subject | Chapters | Covered | Weak | Missing | Existing sims |
|---|---|---|---|---|---|---|
| 6 | maths | 11 | 6 | 0 | 5 | 9 |
| 6 | science | 26 | 5 | 0 | 21 | 16 |
| 6 | english | 5 | 0 | 0 | 5 | 0 |
| 6 | hindi | 13 | 0 | 0 | 13 | 0 |
| 6 | social_science | 33 | 1 | 0 | 32 | 2 |
| 7 | maths | 28 | 6 | 0 | 22 | 5 |
| 7 | science | 26 | 14 | 1 | 11 | 18 |
| 7 | english | 5 | 0 | 0 | 5 | 0 |
| 7 | hindi | 10 | 0 | 0 | 10 | 0 |
| 7 | social_science | 31 | 1 | 0 | 30 | 2 |
| 8 | maths | 29 | 4 | 0 | 25 | 4 |
| 8 | science | 27 | 10 | 1 | 16 | 16 |
| 8 | english | 5 | 0 | 0 | 5 | 0 |
| 8 | hindi | 10 | 0 | 0 | 10 | 0 |
| 8 | social_science | 27 | 1 | 0 | 26 | 1 |
| 9 | maths | 8 | 4 | 0 | 4 | 7 |
| 9 | science | 13 | 4 | 0 | 9 | 25 |
| 9 | english | 8 | 0 | 0 | 8 | 0 |
| 9 | hindi | 12 | 0 | 0 | 12 | 0 |
| 9 | social_science | 26 | 7 | 1 | 18 | 12 |
| 10 | maths | 14 | 6 | 0 | 8 | 9 |
| 10 | science | 13 | 1 | 1 | 11 | 25 |
| 10 | english | 18 | 0 | 0 | 18 | 0 |
| 10 | hindi | 15 | 0 | 0 | 15 | 0 |
| 10 | social_science | 34 | 6 | 1 | 27 | 10 |
| 11 | biology | 20 | 14 | 0 | 6 | 21 |
| 11 | chemistry | 10 | 5 | 0 | 5 | 30 |
| 11 | maths | 14 | 7 | 0 | 7 | 21 |
| 11 | physics | 14 | 9 | 2 | 3 | 15 |
| 11 | geography | 26 | 12 | 0 | 14 | 9 |
| 11 | accountancy | 11 | 4 | 0 | 7 | 8 |
| 11 | applied_maths | 8 | 0 | 0 | 8 | 0 |
| 11 | biotechnology | 12 | 0 | 0 | 12 | 0 |
| 11 | business_studies | 11 | 10 | 0 | 1 | 4 |
| 11 | computer_science | 11 | 0 | 0 | 11 | 0 |
| 11 | economics | 24 | 16 | 0 | 8 | 9 |
| 11 | english | 44 | 0 | 0 | 44 | 0 |
| 11 | hindi | 37 | 0 | 0 | 37 | 0 |
| 11 | history | 7 | 1 | 0 | 6 | 18 |
| 11 | home_science | 11 | 3 | 0 | 8 | 4 |
| 11 | informatics_practices | 8 | 0 | 0 | 8 | 0 |
| 11 | language | 9 | 0 | 0 | 9 | 0 |
| 11 | political_science | 17 | 0 | 0 | 17 | 3 |
| 11 | political_theory | 6 | 0 | 0 | 6 | 0 |
| 11 | psychology | 8 | 7 | 0 | 1 | 9 |
| 11 | sociology | 10 | 3 | 0 | 7 | 3 |
| 12 | biology | 15 | 11 | 0 | 4 | 27 |
| 12 | chemistry | 11 | 8 | 0 | 3 | 36 |
| 12 | maths | 14 | 9 | 1 | 4 | 18 |
| 12 | physics | 14 | 11 | 0 | 3 | 20 |
| 12 | geography | 19 | 10 | 0 | 9 | 10 |
| 12 | accountancy | 13 | 6 | 0 | 7 | 8 |
| 12 | applied_maths | 11 | 0 | 0 | 11 | 0 |
| 12 | biotechnology | 13 | 0 | 0 | 13 | 0 |
| 12 | business_studies | 12 | 5 | 0 | 7 | 5 |
| 12 | computer_science | 13 | 0 | 0 | 13 | 0 |
| 12 | economics | 16 | 10 | 0 | 6 | 14 |
| 12 | english | 10 | 0 | 0 | 10 | 0 |
| 12 | history | 12 | 1 | 0 | 11 | 24 |
| 12 | home_science | 14 | 0 | 0 | 14 | 3 |
| 12 | informatics_practices | 7 | 0 | 0 | 7 | 0 |
| 12 | political_science | 16 | 1 | 1 | 14 | 3 |
| 12 | psychology | 7 | 4 | 0 | 3 | 7 |
| 12 | sociology | 15 | 8 | 2 | 5 | 4 |

Key structural finding: for classes 6-10 the sim corpus was generated against the **CISCE syllabus**
(node ids `c6_phy_*`, chemistry up to sulphuric acid/alloys/electrolysis), while `catalog_*.json` follows
the **new NCERT books** (Curiosity science 6-8, Ganita Prakash maths 6-8, new social science 6-8).
Hence large nominal gaps in 6-8 even though similar-topic sims exist one grade away or under old titles.

## 7. Prioritized missing-sims worklist

P1 = core subjects (maths, science, physics, chemistry, biology); P2 = social science / geography /
computer science / EVS; P3 = electives. Within each class-subject: `missing` first, then `weak`.
Suggested names follow `C{class}_{Subject}{Topic}Sim.tsx` in `frontend/components/simulations/c6_12/`.


### P1 | Class 6 -- maths -- 5 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Perimeter and Area | missing | `C6_MathematicsPerimeterAndAreaSim.tsx` |
| Prime Time | missing | `C6_MathematicsPrimeTimeSim.tsx` |
| Prime Time: The Idli-Vada Game | missing | `C6_MathematicsPrimeTimeTheIdliVadaSim.tsx` |
| Symmetry | missing | `C6_MathematicsSymmetrySim.tsx` |
| The Other Side of Zero | missing | `C6_MathematicsTheOtherSideOfZeroSim.tsx` |

### P1 | Class 6 -- science -- 21 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| A Journey through States of Water | missing | `C6_ScienceAJourneyThroughStatesOfSim.tsx` |
| Beyond Earth | missing | `C6_ScienceBeyondEarthSim.tsx` |
| Body Movements | missing | `C6_ScienceBodyMovementsSim.tsx` |
| Changes Around Us | missing | `C6_ScienceChangesAroundUsSim.tsx` |
| Components of Food | missing | `C6_ScienceComponentsOfFoodSim.tsx` |
| Diversity in the Living World | missing | `C6_ScienceDiversityInTheLivingWorldSim.tsx` |
| Exploring Magnets | missing | `C6_ScienceExploringMagnetsSim.tsx` |
| Fibre to Fabric | missing | `C6_ScienceFibreToFabricSim.tsx` |
| Food: Where Does it Come From? | missing | `C6_ScienceFoodWhereDoesItComeSim.tsx` |
| Fun with Magnets | missing | `C6_ScienceFunWithMagnetsSim.tsx` |
| Garbage in, Garbage out | missing | `C6_ScienceGarbageInGarbageOutSim.tsx` |
| Living Creatures: Exploring their Characteristics | missing | `C6_ScienceLivingCreaturesExploringTheirCharacteristicsSim.tsx` |
| Materials Around Us | missing | `C6_ScienceMaterialsAroundUsSim.tsx` |
| Methods of Separation in Everyday Life | missing | `C6_ScienceMethodsOfSeparationInEverydaySim.tsx` |
| Mindful Eating: A Path to a Healthy Body | missing | `C6_ScienceMindfulEatingAPathToSim.tsx` |
| Nature's Treasures | missing | `C6_ScienceNatureSTreasuresSim.tsx` |
| Separation of Substances | missing | `C6_ScienceSeparationOfSubstancesSim.tsx` |
| Sorting Materials into Groups | missing | `C6_ScienceSortingMaterialsIntoGroupsSim.tsx` |
| Temperature and its Measurement | missing | `C6_ScienceTemperatureAndItsMeasurementSim.tsx` |
| The Living Organisms  Characteristics and Habitats | missing | `C6_ScienceTheLivingOrganismsCharacteristicsAndSim.tsx` |
| The Wonderful World of Science | missing | `C6_ScienceTheWonderfulWorldOfScienceSim.tsx` |

### P2 | Class 6 -- social_science -- 32 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Economic Activities Around Us | missing | `C6_SimEconomicActivitiesAroundUsSim.tsx` |
| Family and Community | missing | `C6_SimFamilyAndCommunitySim.tsx` |
| Globe: Latitudes and Longitudes | missing | `C6_SimGlobeLatitudesAndLongitudesSim.tsx` |
| Grassroots Democracy -- Part 1: Governance | missing | `C6_SimGrassrootsDemocracyPart1GovernanceSim.tsx` |
| Grassroots Democracy -- Part 2: Local Government in Rural Areas | missing | `C6_SimGrassrootsDemocracyPart2LocalSim.tsx` |
| Grassroots Democracy -- Part 3: Local Government in Urban Areas | missing | `C6_SimGrassrootsDemocracyPart3LocalSim.tsx` |
| Grassroots Democracy, Part 1 | missing | `C6_SimGrassrootsDemocracyPart1Sim.tsx` |
| Grassroots Democracy, Part 2 | missing | `C6_SimGrassrootsDemocracyPart2Sim.tsx` |
| Grassroots Democracy, Part 3 | missing | `C6_SimGrassrootsDemocracyPart3Sim.tsx` |
| India's Cultural Roots | missing | `C6_SimIndiaSCulturalRootsSim.tsx` |
| India, That Is Bharat | missing | `C6_SimIndiaThatIsBharatSim.tsx` |
| India: Climate, Vegetation and Wildlife | missing | `C6_SimIndiaClimateVegetationAndWildlifeSim.tsx` |
| Key Elements of a Democratic Government | missing | `C6_SimKeyElementsOfADemocraticSim.tsx` |
| Landforms and Life | missing | `C6_SimLandformsAndLifeSim.tsx` |
| Locating Places on the Earth | missing | `C6_SimLocatingPlacesOnTheEarthSim.tsx` |
| MOTIONS OF THE EARTH | missing | `C6_SimMotionsOfTheEarthSim.tsx` |
| Major Domains of the Earth | missing | `C6_SimMajorDomainsOfTheEarthSim.tsx` |
| Major Landforms of the Earth | missing | `C6_SimMajorLandformsOfTheEarthSim.tsx` |
| OUR COUNTRY - INDIA | missing | `C6_SimOurCountryIndiaSim.tsx` |
| Rural Administration | missing | `C6_SimRuralAdministrationSim.tsx` |
| Rural Livelihoods | missing | `C6_SimRuralLivelihoodsSim.tsx` |
| The Beginnings of Indian Civilisation | missing | `C6_SimTheBeginningsOfIndianCivilisationSim.tsx` |
| The Earth in the Solar System | missing | `C6_SimTheEarthInTheSolarSim.tsx` |
| The Value of Work | missing | `C6_SimTheValueOfWorkSim.tsx` |
| Timeline and Sources of History | missing | `C6_SimTimelineAndSourcesOfHistorySim.tsx` |
| Understanding Diversity | missing | `C6_SimUnderstandingDiversitySim.tsx` |
| Unity in Diversity, or "Many in the One" | missing | `C6_SimUnityInDiversityOrManySim.tsx` |
| Unity in Diversity, or Many in the One | missing | `C6_SimUnityInDiversityOrManySim.tsx` |
| Urban Administration | missing | `C6_SimUrbanAdministrationSim.tsx` |
| Urban Livelihoods | missing | `C6_SimUrbanLivelihoodsSim.tsx` |
| What is Government? | missing | `C6_SimWhatIsGovernmentSim.tsx` |
| Why Social Science? | missing | `C6_SimWhySocialScienceSim.tsx` |

### P1 | Class 7 -- maths -- 22 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| A Peek Beyond the Point | missing | `C7_MathematicsAPeekBeyondThePointSim.tsx` |
| A Tale of Three Intersecting Lines | missing | `C7_MathematicsATaleOfThreeIntersectingSim.tsx` |
| Algebraic Expressions | missing | `C7_MathematicsAlgebraicExpressionsSim.tsx` |
| Another Peek Beyond the Point | missing | `C7_MathematicsAnotherPeekBeyondThePointSim.tsx` |
| Arithmetic Expressions | missing | `C7_MathematicsArithmeticExpressionsSim.tsx` |
| Comparing Quantities | missing | `C7_MathematicsComparingQuantitiesSim.tsx` |
| Connecting the Dots | missing | `C7_MathematicsConnectingTheDotsSim.tsx` |
| Connecting the Dots... | missing | `C7_MathematicsConnectingTheDotsSim.tsx` |
| Constructions and Tilings | missing | `C7_MathematicsConstructionsAndTilingsSim.tsx` |
| Data Handling | missing | `C7_MathematicsDataHandlingSim.tsx` |
| Exponents and Powers | missing | `C7_MathematicsExponentsAndPowersSim.tsx` |
| Expressions Using Letter-Numbers | missing | `C7_MathematicsExpressionsUsingLetterNumbersSim.tsx` |
| Finding Common Ground | missing | `C7_MathematicsFindingCommonGroundSim.tsx` |
| Finding the Unknown | missing | `C7_MathematicsFindingTheUnknownSim.tsx` |
| Geometric Twins | missing | `C7_MathematicsGeometricTwinsSim.tsx` |
| Large Numbers Around Us | missing | `C7_MathematicsLargeNumbersAroundUsSim.tsx` |
| Lines and Angles | missing | `C7_MathematicsLinesAndAnglesSim.tsx` |
| Number Play | missing | `C7_MathematicsNumberPlaySim.tsx` |
| Parallel and Intersecting Lines | missing | `C7_MathematicsParallelAndIntersectingLinesSim.tsx` |
| Perimeter and Area | missing | `C7_MathematicsPerimeterAndAreaSim.tsx` |
| Rational Numbers | missing | `C7_MathematicsRationalNumbersSim.tsx` |
| The Triangle and its Properties | missing | `C7_MathematicsTheTriangleAndItsPropertiesSim.tsx` |

### P1 | Class 7 -- science -- 12 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Acids, Bases and Salts | missing | `C7_ScienceAcidsBasesAndSaltsSim.tsx` |
| Adolescence - A Stage of Growth and Change | missing | `C7_ScienceAdolescenceAStageOfGrowthSim.tsx` |
| Adolescence: A Stage of Growth and Change | missing | `C7_ScienceAdolescenceAStageOfGrowthSim.tsx` |
| Earth, Moon, and the Sun | missing | `C7_ScienceEarthMoonAndTheSunSim.tsx` |
| Exploring Substances - Acidic, Basic, Neutral | missing | `C7_ScienceExploringSubstancesAcidicBasicNeutralSim.tsx` |
| Exploring Substances: Acidic, Basic, and Neutral | missing | `C7_ScienceExploringSubstancesAcidicBasicAndSim.tsx` |
| Life Processes in Animals | missing | `C7_ScienceLifeProcessesInAnimalsSim.tsx` |
| Nutrition in Animals | missing | `C7_ScienceNutritionInAnimalsSim.tsx` |
| Respiration in Organisms | missing | `C7_ScienceRespirationInOrganismsSim.tsx` |
| The Ever-Evolving World of Science | missing | `C7_ScienceTheEverEvolvingWorldOfSim.tsx` |
| The World of Metals and Non-Metals | missing | `C7_ScienceTheWorldOfMetalsAndSim.tsx` |
| Electric Current and its Effects | weak (weak match: `C7_BiologyPollutionEffectsEnvironmentSim.tsx`) | `C7_ScienceElectricCurrentAndItsEffectsSim.tsx` |

### P2 | Class 7 -- social_science -- 30 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Banks and the Magic of Finance | missing | `C7_SimBanksAndTheMagicOfSim.tsx` |
| Climates of India | missing | `C7_SimClimatesOfIndiaSim.tsx` |
| Delhi: 12th to 15th Century | missing | `C7_SimDelhi12thTo15thCenturySim.tsx` |
| Empires and Kingdoms: 6th to 10th Centuries | missing | `C7_SimEmpiresAndKingdoms6thToSim.tsx` |
| From Barter to Money | missing | `C7_SimFromBarterToMoneySim.tsx` |
| From the Rulers to the Ruled: Types of Governments | missing | `C7_SimFromTheRulersToTheSim.tsx` |
| Geographical Diversity of India | missing | `C7_SimGeographicalDiversityOfIndiaSim.tsx` |
| How the Land Becomes Sacred | missing | `C7_SimHowTheLandBecomesSacredSim.tsx` |
| Human Environment Interactions: The Tropical and the Subtropical Region (Forests and River Basins) | missing | `C7_SimHumanEnvironmentInteractionsTheTropicalSim.tsx` |
| India and Her Neighbours | missing | `C7_SimIndiaAndHerNeighboursSim.tsx` |
| India, a Home to Many | missing | `C7_SimIndiaAHomeToManySim.tsx` |
| Infrastructure: Engine of India's Development | missing | `C7_SimInfrastructureEngineOfIndiaSSim.tsx` |
| Inside Our Earth | missing | `C7_SimInsideOurEarthSim.tsx` |
| Kings and Kingdoms | missing | `C7_SimKingsAndKingdomsSim.tsx` |
| Life in the Deserts | missing | `C7_SimLifeInTheDesertsSim.tsx` |
| New Beginnings: Cities and States | missing | `C7_SimNewBeginningsCitiesAndStatesSim.tsx` |
| Our Changing Earth | missing | `C7_SimOurChangingEarthSim.tsx` |
| The Age of Reorganisation | missing | `C7_SimTheAgeOfReorganisationSim.tsx` |
| The Constitution of India -- An Introduction | missing | `C7_SimTheConstitutionOfIndiaAnSim.tsx` |
| The Constitution of India, An Introduction | missing | `C7_SimTheConstitutionOfIndiaAnSim.tsx` |
| The Gupta Era: An Age of Tireless Creativity | missing | `C7_SimTheGuptaEraAnAgeSim.tsx` |
| The Making of Regional Cultures | missing | `C7_SimTheMakingOfRegionalCulturesSim.tsx` |
| The Rise of Empires | missing | `C7_SimTheRiseOfEmpiresSim.tsx` |
| The State, the Government, and You | missing | `C7_SimTheStateTheGovernmentAndSim.tsx` |
| The Story of Indian Farming | missing | `C7_SimTheStoryOfIndianFarmingSim.tsx` |
| Tracing Changes Through a Thousand Years | missing | `C7_SimTracingChangesThroughAThousandSim.tsx` |
| Tribes, Nomads and Settled Communities | missing | `C7_SimTribesNomadsAndSettledCommunitiesSim.tsx` |
| Turning Tides: 11th and 12th Centuries | missing | `C7_SimTurningTides11thAnd12thSim.tsx` |
| Understanding Markets | missing | `C7_SimUnderstandingMarketsSim.tsx` |
| Understanding the Weather | missing | `C7_SimUnderstandingTheWeatherSim.tsx` |

### P1 | Class 8 -- maths -- 25 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| A Square and A Cube | missing | `C8_MathematicsASquareAndACubeSim.tsx` |
| Algebra Play | missing | `C8_MathematicsAlgebraPlaySim.tsx` |
| Algebraic Expressions and Identities | missing | `C8_MathematicsAlgebraicExpressionsAndIdentitiesSim.tsx` |
| Comparing Quantities | missing | `C8_MathematicsComparingQuantitiesSim.tsx` |
| Cubes and Cube Roots | missing | `C8_MathematicsCubesAndCubeRootsSim.tsx` |
| Data Handling | missing | `C8_MathematicsDataHandlingSim.tsx` |
| Direct and Inverse Proportions | missing | `C8_MathematicsDirectAndInverseProportionsSim.tsx` |
| Direct and Inverse Proportions: Introduction | missing | `C8_MathematicsDirectAndInverseProportionsIntroductionSim.tsx` |
| Exploring Some Geometric Themes | missing | `C8_MathematicsExploringSomeGeometricThemesSim.tsx` |
| Exponents and Powers | missing | `C8_MathematicsExponentsAndPowersSim.tsx` |
| Factorisation | missing | `C8_MathematicsFactorisationSim.tsx` |
| Fractions in Disguise | missing | `C8_MathematicsFractionsInDisguiseSim.tsx` |
| Introduction to Graphs | missing | `C8_MathematicsIntroductionToGraphsSim.tsx` |
| Linear Equations in One Variable | missing | `C8_MathematicsLinearEquationsInOneVariableSim.tsx` |
| Mensuration | missing | `C8_MathematicsMensurationSim.tsx` |
| Power Play | missing | `C8_MathematicsPowerPlaySim.tsx` |
| Proportional Reasoning-1 | missing | `C8_MathematicsProportionalReasoning1Sim.tsx` |
| Proportional Reasoning-2 | missing | `C8_MathematicsProportionalReasoning2Sim.tsx` |
| Quadrilaterals | missing | `C8_MathematicsQuadrilateralsSim.tsx` |
| Squares and Square Roots | missing | `C8_MathematicsSquaresAndSquareRootsSim.tsx` |
| Tales by Dots and Lines | missing | `C8_MathematicsTalesByDotsAndLinesSim.tsx` |
| Tales by Dots and Lines: The Balancing Act | missing | `C8_MathematicsTalesByDotsAndLinesSim.tsx` |
| The Baudhayana-Pythagoras Theorem | missing | `C8_MathematicsTheBaudhayanaPythagorasTheoremSim.tsx` |
| Understanding Quadrilaterals | missing | `C8_MathematicsUnderstandingQuadrilateralsSim.tsx` |
| We Distribute, Yet Things Multiply | missing | `C8_MathematicsWeDistributeYetThingsMultiplySim.tsx` |

### P1 | Class 8 -- science -- 17 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Coal and Petroleum (Class 8) | missing | `C8_ScienceCoalAndPetroleumClass8Sim.tsx` |
| Conservation of Plants and Animals (Class 8) | missing | `C8_ScienceConservationOfPlantsAndAnimalsSim.tsx` |
| Exploring the Investigative World of Science | missing | `C8_ScienceExploringTheInvestigativeWorldOfSim.tsx` |
| Health - The Ultimate Treasure | missing | `C8_ScienceHealthTheUltimateTreasureSim.tsx` |
| Health: The Ultimate Treasure | missing | `C8_ScienceHealthTheUltimateTreasureSim.tsx` |
| How Nature Works in Harmony | missing | `C8_ScienceHowNatureWorksInHarmonySim.tsx` |
| Keeping Time with the Skies | missing | `C8_ScienceKeepingTimeWithTheSkiesSim.tsx` |
| Our Home - Earth, a Unique Life-Sustaining Planet | missing | `C8_ScienceOurHomeEarthAUniqueSim.tsx` |
| Our Home: Earth, a Unique Life Sustaining Planet | missing | `C8_ScienceOurHomeEarthAUniqueSim.tsx` |
| Pressure, Winds, Storms, and Cyclones | missing | `C8_SciencePressureWindsStormsAndCyclonesSim.tsx` |
| Reaching the Age of Adolescence (Chapter 7) | missing | `C8_ScienceReachingTheAgeOfAdolescenceSim.tsx` |
| Reproduction in Animals | missing | `C8_ScienceReproductionInAnimalsSim.tsx` |
| Some Natural Phenomena | missing | `C8_ScienceSomeNaturalPhenomenaSim.tsx` |
| The Amazing World of Solutes, Solvents, and Solutions | missing | `C8_ScienceTheAmazingWorldOfSolutesSim.tsx` |
| The Invisible Living World - Beyond Our Naked Eye | missing | `C8_ScienceTheInvisibleLivingWorldBeyondSim.tsx` |
| The Invisible Living World: Beyond Our Naked Eye | missing | `C8_ScienceTheInvisibleLivingWorldBeyondSim.tsx` |
| Exploring Forces | weak (weak match: `C8_PhysicsTurningEffectForceSim.tsx`) | `C8_ScienceExploringForcesSim.tsx` |

### P2 | Class 8 -- social_science -- 26 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| A Journey through Indian Architecture | missing | `C8_SimAJourneyThroughIndianArchitectureSim.tsx` |
| Citizenship: Rights and Duties | missing | `C8_SimCitizenshipRightsAndDutiesSim.tsx` |
| Civilising the Native, Educating the Nation | missing | `C8_SimCivilisingTheNativeEducatingTheSim.tsx` |
| Cultural Currents: 13th to 17th Centuries | missing | `C8_SimCulturalCurrents13thTo17thSim.tsx` |
| Dynamics of Population | missing | `C8_SimDynamicsOfPopulationSim.tsx` |
| Factors of Production | missing | `C8_SimFactorsOfProductionSim.tsx` |
| From Trade to Territory: The Company Establishes Power | missing | `C8_SimFromTradeToTerritoryTheSim.tsx` |
| How, When and Where | missing | `C8_SimHowWhenAndWhereSim.tsx` |
| Human Resources | missing | `C8_SimHumanResourcesSim.tsx` |
| India's Long Road to Independence | missing | `C8_SimIndiaSLongRoadToSim.tsx` |
| India's Urban Landscape | missing | `C8_SimIndiaSUrbanLandscapeSim.tsx` |
| Industries (Manufacturing) | missing | `C8_SimIndustriesManufacturingSim.tsx` |
| Land, Soil, Water, Natural Vegetation and Wildlife Resources | missing | `C8_SimLandSoilWaterNaturalVegetationSim.tsx` |
| Law and Social Justice | missing | `C8_SimLawAndSocialJusticeSim.tsx` |
| Natural Resources and Their Use | missing | `C8_SimNaturalResourcesAndTheirUseSim.tsx` |
| Parliament and the Making of Laws | missing | `C8_SimParliamentAndTheMakingOfSim.tsx` |
| Reshaping India's Political Map | missing | `C8_SimReshapingIndiaSPoliticalMapSim.tsx` |
| The Colonial Era in India | missing | `C8_SimTheColonialEraInIndiaSim.tsx` |
| The Indian Constitution | missing | `C8_SimTheIndianConstitutionSim.tsx` |
| The Making of the National Movement: 1870s-1947 | missing | `C8_SimTheMakingOfTheNationalSim.tsx` |
| The Parliamentary System: Legislature and Executive | missing | `C8_SimTheParliamentarySystemLegislatureAndSim.tsx` |
| The Rise of the Marathas | missing | `C8_SimTheRiseOfTheMarathasSim.tsx` |
| The Role of the Judiciary in Our Society | missing | `C8_SimTheRoleOfTheJudiciarySim.tsx` |
| Universal Franchise and India's Electoral System | missing | `C8_SimUniversalFranchiseAndIndiaSSim.tsx` |
| When People Revolt 1857 and After | missing | `C8_SimWhenPeopleRevolt1857AndSim.tsx` |
| Women, Caste and Reform | missing | `C8_SimWomenCasteAndReformSim.tsx` |

### P1 | Class 9 -- maths -- 4 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Exploring Algebraic Identities | missing | `C9_MathematicsExploringAlgebraicIdentitiesSim.tsx` |
| I'm Up and Down, and Round and Round | missing | `C9_MathematicsIMUpAndDownSim.tsx` |
| Orienting Yourself: The Use of Coordinates | missing | `C9_MathematicsOrientingYourselfTheUseOfSim.tsx` |
| Predicting What Comes Next: Exploring Sequences and Progressions | missing | `C9_MathematicsPredictingWhatComesNextExploringSim.tsx` |

### P1 | Class 9 -- science -- 9 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Atomic Foundations of Matter | missing | `C9_ScienceAtomicFoundationsOfMatterSim.tsx` |
| Describing Motion Around Us | missing | `C9_ScienceDescribingMotionAroundUsSim.tsx` |
| Exploration: Entering the World of Secondary Science | missing | `C9_ScienceExplorationEnteringTheWorldOfSim.tsx` |
| Exploring Mixtures and their Separation | missing | `C9_ScienceExploringMixturesAndTheirSeparationSim.tsx` |
| How Forces Affect Motion | missing | `C9_ScienceHowForcesAffectMotionSim.tsx` |
| Reproduction: How Life Continues | missing | `C9_ScienceReproductionHowLifeContinuesSim.tsx` |
| Sound Waves: Characteristics and Applications | missing | `C9_ScienceSoundWavesCharacteristicsAndApplicationsSim.tsx` |
| Tissues in Action | missing | `C9_ScienceTissuesInActionSim.tsx` |
| Work, Energy, and Simple Machines | missing | `C9_ScienceWorkEnergyAndSimpleMachinesSim.tsx` |

### P2 | Class 9 -- social_science -- 19 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Atmosphere and Climate | missing | `C9_SimAtmosphereAndClimateSim.tsx` |
| Constitutional Design | missing | `C9_SimConstitutionalDesignSim.tsx` |
| Democracy | missing | `C9_SimDemocracySim.tsx` |
| Democracy in the Contemporary World | missing | `C9_SimDemocracyInTheContemporaryWorldSim.tsx` |
| Democratic Rights | missing | `C9_SimDemocraticRightsSim.tsx` |
| Early Humans and Beginning of Civilisation | missing | `C9_SimEarlyHumansAndBeginningOfSim.tsx` |
| Elections | missing | `C9_SimElectionsSim.tsx` |
| Electoral Politics | missing | `C9_SimElectoralPoliticsSim.tsx` |
| Forest Society and Colonialism | missing | `C9_SimForestSocietyAndColonialismSim.tsx` |
| Pastoralists in the Modern World | missing | `C9_SimPastoralistsInTheModernWorldSim.tsx` |
| People as Resource | missing | `C9_SimPeopleAsResourceSim.tsx` |
| Poverty as a Challenge | missing | `C9_SimPovertyAsAChallengeSim.tsx` |
| Socialism in Europe and the Russian Revolution | missing | `C9_SimSocialismInEuropeAndTheSim.tsx` |
| State and Society up to 1000 CE | missing | `C9_SimStateAndSocietyUpToSim.tsx` |
| The French Revolution | missing | `C9_SimTheFrenchRevolutionSim.tsx` |
| The Price Puzzle: What Drives the Market | missing | `C9_SimThePricePuzzleWhatDrivesSim.tsx` |
| The Story of Village Palampur | missing | `C9_SimTheStoryOfVillagePalampurSim.tsx` |
| Understanding Social Science | missing | `C9_SimUnderstandingSocialScienceSim.tsx` |
| Working of Institutions | weak (weak match: `C9_GeographyDenudationWindWorkSim.tsx`) | `C9_SimWorkingOfInstitutionsSim.tsx` |

### P1 | Class 10 -- maths -- 8 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Coordinate Geometry | missing | `C10_MathematicsCoordinateGeometrySim.tsx` |
| Introduction to Trigonometry | missing | `C10_MathematicsIntroductionToTrigonometrySim.tsx` |
| Probability | missing | `C10_MathematicsProbabilitySim.tsx` |
| Real Numbers | missing | `C10_MathematicsRealNumbersSim.tsx` |
| Some Applications of Trigonometry | missing | `C10_MathematicsSomeApplicationsOfTrigonometrySim.tsx` |
| Statistics | missing | `C10_MathematicsStatisticsSim.tsx` |
| Surface Areas and Volumes | missing | `C10_MathematicsSurfaceAreasAndVolumesSim.tsx` |
| Triangles | missing | `C10_MathematicsTrianglesSim.tsx` |

### P1 | Class 10 -- science -- 12 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Acids, Bases and Salts | missing | `C10_ScienceAcidsBasesAndSaltsSim.tsx` |
| Carbon and its Compounds | missing | `C10_ScienceCarbonAndItsCompoundsSim.tsx` |
| Chemical Reactions and Equations | missing | `C10_ScienceChemicalReactionsAndEquationsSim.tsx` |
| Control and Coordination | missing | `C10_ScienceControlAndCoordinationSim.tsx` |
| Electricity | missing | `C10_ScienceElectricitySim.tsx` |
| Heredity | missing | `C10_ScienceHereditySim.tsx` |
| How do Organisms Reproduce? | missing | `C10_ScienceHowDoOrganismsReproduceSim.tsx` |
| Life Processes | missing | `C10_ScienceLifeProcessesSim.tsx` |
| Metals and Non-metals | missing | `C10_ScienceMetalsAndNonMetalsSim.tsx` |
| Our Environment | missing | `C10_ScienceOurEnvironmentSim.tsx` |
| The Human Eye and the Colourful World | missing | `C10_ScienceTheHumanEyeAndTheSim.tsx` |
| Magnetic Effects of Electric Current | weak (weak match: `C10_EVSCauseEffectRelationsSim.tsx`) | `C10_ScienceMagneticEffectsOfElectricCurrentSim.tsx` |

### P2 | Class 10 -- social_science -- 28 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Agriculture | missing | `C10_SimAgricultureSim.tsx` |
| Consumer Rights | missing | `C10_SimConsumerRightsSim.tsx` |
| Consumer Rights: Consumer Movement, COPRA and Redressal | missing | `C10_SimConsumerRightsConsumerMovementCopraSim.tsx` |
| Development | missing | `C10_SimDevelopmentSim.tsx` |
| Federalism | missing | `C10_SimFederalismSim.tsx` |
| Forest and Wildlife | missing | `C10_SimForestAndWildlifeSim.tsx` |
| Gender, Religion and Caste | missing | `C10_SimGenderReligionAndCasteSim.tsx` |
| Gender, Religion and Caste in Democratic Politics | missing | `C10_SimGenderReligionAndCasteInSim.tsx` |
| Globalisation and the Indian Economy | missing | `C10_SimGlobalisationAndTheIndianEconomySim.tsx` |
| Lifelines of National Economy | missing | `C10_SimLifelinesOfNationalEconomySim.tsx` |
| Lifelines of National Economy: Transport and Communication | missing | `C10_SimLifelinesOfNationalEconomyTransportSim.tsx` |
| Lifelines of National Economy: Transport, Communication and Trade | missing | `C10_SimLifelinesOfNationalEconomyTransportSim.tsx` |
| Manufacturing Industries | missing | `C10_SimManufacturingIndustriesSim.tsx` |
| Money and Credit | missing | `C10_SimMoneyAndCreditSim.tsx` |
| Nationalism in Europe: Revolution, Unification and Allegory | missing | `C10_SimNationalismInEuropeRevolutionUnificationSim.tsx` |
| Nationalism in India | missing | `C10_SimNationalismInIndiaSim.tsx` |
| Outcomes of Democracy | missing | `C10_SimOutcomesOfDemocracySim.tsx` |
| Outcomes of Democracy: Accountability, Growth and Dignity | missing | `C10_SimOutcomesOfDemocracyAccountabilityGrowthSim.tsx` |
| Political Parties | missing | `C10_SimPoliticalPartiesSim.tsx` |
| Power-sharing | missing | `C10_SimPowerSharingSim.tsx` |
| Print Culture and the Modern World | missing | `C10_SimPrintCultureAndTheModernSim.tsx` |
| Sectors of the Indian Economy | missing | `C10_SimSectorsOfTheIndianEconomySim.tsx` |
| The Age of Industrialisation | missing | `C10_SimTheAgeOfIndustrialisationSim.tsx` |
| The Age of Industrialisation: Factories, Workers and Colonies | missing | `C10_SimTheAgeOfIndustrialisationFactoriesSim.tsx` |
| The Making of a Global World | missing | `C10_SimTheMakingOfAGlobalSim.tsx` |
| The Making of a Global World: Trade, Migration and Depression | missing | `C10_SimTheMakingOfAGlobalSim.tsx` |
| The Rise of Nationalism in Europe | missing | `C10_SimTheRiseOfNationalismInSim.tsx` |
| Agriculture: Types of Farming, Cropping Seasons and Major Crops | weak (weak match: `C10_EconApplicationsDemandMeaningTypesSim.tsx`) | `C10_SimAgricultureTypesOfFarmingCroppingSim.tsx` |

### P1 | Class 11 -- biology -- 6 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Biological Classification | missing | `C11_BiologyBiologicalClassificationSim.tsx` |
| Body Fluids and Circulation | missing | `C11_BiologyBodyFluidsAndCirculationSim.tsx` |
| Chemical Coordination and Integration | missing | `C11_BiologyChemicalCoordinationAndIntegrationSim.tsx` |
| Locomotion and Movement | missing | `C11_BiologyLocomotionAndMovementSim.tsx` |
| Neural Control and Coordination | missing | `C11_BiologyNeuralControlAndCoordinationSim.tsx` |
| The Living World | missing | `C11_BiologyTheLivingWorldSim.tsx` |

### P1 | Class 11 -- chemistry -- 5 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Chemical Bonding and Molecular Structure | missing | `C11_ChemistryChemicalBondingAndMolecularStructureSim.tsx` |
| Classification of Elements and Periodicity in Properties | missing | `C11_ChemistryClassificationOfElementsAndPeriodicitySim.tsx` |
| Equilibrium | missing | `C11_ChemistryEquilibriumSim.tsx` |
| Hydrocarbons | missing | `C11_ChemistryHydrocarbonsSim.tsx` |
| Structure of Atom | missing | `C11_ChemistryStructureOfAtomSim.tsx` |

### P1 | Class 11 -- maths -- 7 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Binomial Theorem | missing | `C11_MathematicsBinomialTheoremSim.tsx` |
| Conic Sections | missing | `C11_MathematicsConicSectionsSim.tsx` |
| Introduction to Three Dimensional Geometry | missing | `C11_MathematicsIntroductionToThreeDimensionalGeometrySim.tsx` |
| Permutations and Combinations | missing | `C11_MathematicsPermutationsAndCombinationsSim.tsx` |
| Probability | missing | `C11_MathematicsProbabilitySim.tsx` |
| STRAIGHT LINES | missing | `C11_MathematicsStraightLinesSim.tsx` |
| Statistics | missing | `C11_MathematicsStatisticsSim.tsx` |

### P1 | Class 11 -- physics -- 5 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Gravitation | missing | `C11_PhysicsGravitationSim.tsx` |
| Oscillations | missing | `C11_PhysicsOscillationsSim.tsx` |
| Thermodynamics | missing | `C11_PhysicsThermodynamicsSim.tsx` |
| Thermal Properties of Matter | weak (weak match: `C11_PhysicsMechanicalPropertiesSolidsCBSESim.tsx`, orphaned) | `C11_PhysicsThermalPropertiesOfMatterSim.tsx` |
| Units and Measurement | weak (weak match: `C11_PhysicsSystemsUnitscgsSim.tsx`) | `C11_PhysicsUnitsAndMeasurementSim.tsx` |

### P2 | Class 11 -- computer_science -- 11 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Computer System | missing | `C11_ComputerScienceComputerSystemSim.tsx` |
| Emerging Trends | missing | `C11_ComputerScienceEmergingTrendsSim.tsx` |
| Encoding Schemes and Number System | missing | `C11_ComputerScienceEncodingSchemesAndNumberSystemSim.tsx` |
| Flow of Control | missing | `C11_ComputerScienceFlowOfControlSim.tsx` |
| Functions | missing | `C11_ComputerScienceFunctionsSim.tsx` |
| Getting Started with Python | missing | `C11_ComputerScienceGettingStartedWithPythonSim.tsx` |
| Introduction to Problem Solving | missing | `C11_ComputerScienceIntroductionToProblemSolvingSim.tsx` |
| Lists | missing | `C11_ComputerScienceListsSim.tsx` |
| Societal Impact | missing | `C11_ComputerScienceSocietalImpactSim.tsx` |
| Strings | missing | `C11_ComputerScienceStringsSim.tsx` |
| Tuples and Dictionaries | missing | `C11_ComputerScienceTuplesAndDictionariesSim.tsx` |

### P2 | Class 11 -- geography -- 14 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Atmospheric Circulation and Weather Systems | missing | `C11_GeographyAtmosphericCirculationAndWeatherSystemsSim.tsx` |
| Composition and Structure of Atmosphere | missing | `C11_GeographyCompositionAndStructureOfAtmosphereSim.tsx` |
| Drainage System | missing | `C11_GeographyDrainageSystemSim.tsx` |
| India: Location | missing | `C11_GeographyIndiaLocationSim.tsx` |
| Introduction to Maps | missing | `C11_GeographyIntroductionToMapsSim.tsx` |
| Introduction to Remote Sensing | missing | `C11_GeographyIntroductionToRemoteSensingSim.tsx` |
| Latitude, Longitude and Time | missing | `C11_GeographyLatitudeLongitudeAndTimeSim.tsx` |
| Map Projections | missing | `C11_GeographyMapProjectionsSim.tsx` |
| Map Scale | missing | `C11_GeographyMapScaleSim.tsx` |
| Natural Hazards and Disasters | missing | `C11_GeographyNaturalHazardsAndDisastersSim.tsx` |
| Natural Vegetation | missing | `C11_GeographyNaturalVegetationSim.tsx` |
| Solar Radiation, Heat Balance and Temperature | missing | `C11_GeographySolarRadiationHeatBalanceAndSim.tsx` |
| Structure and Physiography | missing | `C11_GeographyStructureAndPhysiographySim.tsx` |
| Topographical Maps | missing | `C11_GeographyTopographicalMapsSim.tsx` |

### P3 | Class 11 -- accountancy -- 7 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Bank Reconciliation Statement | missing | `C11_AccountancyBankReconciliationStatementSim.tsx` |
| Depreciation, Provisions and Reserves | missing | `C11_AccountancyDepreciationProvisionsAndReservesSim.tsx` |
| Financial Statements - I | missing | `C11_AccountancyFinancialStatementsISim.tsx` |
| Financial Statements - II | missing | `C11_AccountancyFinancialStatementsIiSim.tsx` |
| Recording of Transactions - II | missing | `C11_AccountancyRecordingOfTransactionsIiSim.tsx` |
| Recording of Transactions I | missing | `C11_AccountancyRecordingOfTransactionsISim.tsx` |
| Recording of Transactions-I | missing | `C11_AccountancyRecordingOfTransactionsISim.tsx` |

### P3 | Class 11 -- applied_maths -- 8 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Calculus | missing | `C11_AppliedMathsCalculusSim.tsx` |
| Counting: Permutations and Combinations | missing | `C11_AppliedMathsCountingPermutationsAndCombinationsSim.tsx` |
| Numbers and Quantification | missing | `C11_AppliedMathsNumbersAndQuantificationSim.tsx` |
| Probability | missing | `C11_AppliedMathsProbabilitySim.tsx` |
| Relations | missing | `C11_AppliedMathsRelationsSim.tsx` |
| Sequences and Series | missing | `C11_AppliedMathsSequencesAndSeriesSim.tsx` |
| Sets | missing | `C11_AppliedMathsSetsSim.tsx` |
| Straight Line | missing | `C11_AppliedMathsStraightLineSim.tsx` |

### P3 | Class 11 -- biotechnology -- 12 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| An Introduction to Biotechnology | missing | `C11_BiotechnologyAnIntroductionToBiotechnologySim.tsx` |
| Basic Principles of Inheritance | missing | `C11_BiotechnologyBasicPrinciplesOfInheritanceSim.tsx` |
| Basic Processes | missing | `C11_BiotechnologyBasicProcessesSim.tsx` |
| Biomolecules | missing | `C11_BiotechnologyBiomoleculesSim.tsx` |
| Cellular Organelles | missing | `C11_BiotechnologyCellularOrganellesSim.tsx` |
| Cellular Processes | missing | `C11_BiotechnologyCellularProcessesSim.tsx` |
| Enzymes and Bioenergetics | missing | `C11_BiotechnologyEnzymesAndBioenergeticsSim.tsx` |
| Genetic Disorder | missing | `C11_BiotechnologyGeneticDisorderSim.tsx` |
| Introduction to Bioinformatics | missing | `C11_BiotechnologyIntroductionToBioinformaticsSim.tsx` |
| Programming and Systems Biology | missing | `C11_BiotechnologyProgrammingAndSystemsBiologySim.tsx` |
| Protein Informatics and Cheminformatics | missing | `C11_BiotechnologyProteinInformaticsAndCheminformaticsSim.tsx` |
| Tools and Techniques | missing | `C11_BiotechnologyToolsAndTechniquesSim.tsx` |

### P3 | Class 11 -- business_studies -- 1 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Internal Trade | missing | `C11_BusinessStudiesInternalTradeSim.tsx` |

### P3 | Class 11 -- economics -- 8 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Correlation | missing | `C11_EconomicsCorrelationSim.tsx` |
| Employment: Growth, Informalisation and Other Issues | missing | `C11_EconomicsEmploymentGrowthInformalisationAndOtherSim.tsx` |
| Employment: Informalisation and other issues | missing | `C11_EconomicsEmploymentInformalisationAndOtherIssuesSim.tsx` |
| Index Numbers | missing | `C11_EconomicsIndexNumbersSim.tsx` |
| Introducing Ayurveda: The Science of Health and Disease | missing | `C11_EconomicsIntroducingAyurvedaTheScienceOfSim.tsx` |
| Introduction | missing | `C11_EconomicsIntroductionSim.tsx` |
| Use of Statistical Tools | missing | `C11_EconomicsUseOfStatisticalToolsSim.tsx` |
| Yoga | missing | `C11_EconomicsYogaSim.tsx` |

### P3 | Class 11 -- history -- 6 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Changing Cultural Traditions | missing | `C11_SimChangingCulturalTraditionsSim.tsx` |
| Changing Traditions: An Overview of Three Orders and Cultural Change | missing | `C11_SimChangingTraditionsAnOverviewOfSim.tsx` |
| Displacing Indigenous Peoples | missing | `C11_SimDisplacingIndigenousPeoplesSim.tsx` |
| Paths to Modernisation | missing | `C11_SimPathsToModernisationSim.tsx` |
| The Three Orders | missing | `C11_SimTheThreeOrdersSim.tsx` |
| Writing and City Life | missing | `C11_SimWritingAndCityLifeSim.tsx` |

### P3 | Class 11 -- home_science -- 8 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Adulthood | missing | `C11_HomeScienceAdulthoodSim.tsx` |
| Care and Maintenance of Fabrics | missing | `C11_HomeScienceCareAndMaintenanceOfFabricsSim.tsx` |
| Childhood | missing | `C11_HomeScienceChildhoodSim.tsx` |
| Fabrics Around Us | missing | `C11_HomeScienceFabricsAroundUsSim.tsx` |
| Management of Resources | missing | `C11_HomeScienceManagementOfResourcesSim.tsx` |
| Our Apparel | missing | `C11_HomeScienceOurApparelSim.tsx` |
| Understanding Family, Community and Society | missing | `C11_HomeScienceUnderstandingFamilyCommunityAndSocietySim.tsx` |
| Understanding Oneself: Adolescence | missing | `C11_HomeScienceUnderstandingOneselfAdolescenceSim.tsx` |

### P3 | Class 11 -- informatics_practices -- 8 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Brief Overview of Python | missing | `C11_InformaticsPracticesBriefOverviewOfPythonSim.tsx` |
| Computer System | missing | `C11_InformaticsPracticesComputerSystemSim.tsx` |
| Database Concepts | missing | `C11_InformaticsPracticesDatabaseConceptsSim.tsx` |
| Emerging Trends | missing | `C11_InformaticsPracticesEmergingTrendsSim.tsx` |
| Introduction to NumPy | missing | `C11_InformaticsPracticesIntroductionToNumpySim.tsx` |
| Introduction to Structured Query Language (SQL) | missing | `C11_InformaticsPracticesIntroductionToStructuredQueryLanguageSim.tsx` |
| Understanding Data | missing | `C11_InformaticsPracticesUnderstandingDataSim.tsx` |
| Working with Lists and Dictionaries | missing | `C11_InformaticsPracticesWorkingWithListsAndDictionariesSim.tsx` |

### P3 | Class 11 -- political_science -- 17 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Citizenship | missing | `C11_PoliticalScienceCitizenshipSim.tsx` |
| Constitution as a Living Document | missing | `C11_PoliticalScienceConstitutionAsALivingDocumentSim.tsx` |
| Constitution: Why and How? | missing | `C11_PoliticalScienceConstitutionWhyAndHowSim.tsx` |
| Election and Representation | missing | `C11_PoliticalScienceElectionAndRepresentationSim.tsx` |
| Equality | missing | `C11_PoliticalScienceEqualitySim.tsx` |
| Executive | missing | `C11_PoliticalScienceExecutiveSim.tsx` |
| Federalism | missing | `C11_PoliticalScienceFederalismSim.tsx` |
| Freedom | missing | `C11_PoliticalScienceFreedomSim.tsx` |
| Judiciary | missing | `C11_PoliticalScienceJudiciarySim.tsx` |
| Legislature | missing | `C11_PoliticalScienceLegislatureSim.tsx` |
| Local Governments | missing | `C11_PoliticalScienceLocalGovernmentsSim.tsx` |
| Nationalism | missing | `C11_PoliticalScienceNationalismSim.tsx` |
| Rights | missing | `C11_PoliticalScienceRightsSim.tsx` |
| Rights in the Indian Constitution | missing | `C11_PoliticalScienceRightsInTheIndianConstitutionSim.tsx` |
| Secularism | missing | `C11_PoliticalScienceSecularismSim.tsx` |
| Social Justice | missing | `C11_PoliticalScienceSocialJusticeSim.tsx` |
| The Philosophy of the Constitution | missing | `C11_PoliticalScienceThePhilosophyOfTheConstitutionSim.tsx` |

### P3 | Class 11 -- political_theory -- 6 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Citizenship | missing | `C11_PoliticalScienceCitizenshipSim.tsx` |
| Freedom | missing | `C11_PoliticalScienceFreedomSim.tsx` |
| Nationalism | missing | `C11_PoliticalScienceNationalismSim.tsx` |
| Political Theory: An Introduction | missing | `C11_PoliticalSciencePoliticalTheoryAnIntroductionSim.tsx` |
| Rights | missing | `C11_PoliticalScienceRightsSim.tsx` |
| Secularism | missing | `C11_PoliticalScienceSecularismSim.tsx` |

### P3 | Class 11 -- psychology -- 1 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Sensory, Attentional and Perceptual Processes | missing | `C11_PsychologySensoryAttentionalAndPerceptualProcessesSim.tsx` |

### P3 | Class 11 -- sociology -- 7 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Culture and Socialisation | missing | `C11_SociologyCultureAndSocialisationSim.tsx` |
| Environment and Society | missing | `C11_SociologyEnvironmentAndSocietySim.tsx` |
| Indian Sociologists | missing | `C11_SociologyIndianSociologistsSim.tsx` |
| Introducing Western Sociologists | missing | `C11_SociologyIntroducingWesternSociologistsSim.tsx` |
| Social Change and Social Order in Rural and Urban Society | missing | `C11_SociologySocialChangeAndSocialOrderSim.tsx` |
| Social Structure, Stratification and Social Processes in Society | missing | `C11_SociologySocialStructureStratificationAndSocialSim.tsx` |
| Understanding Social Institutions | missing | `C11_SociologyUnderstandingSocialInstitutionsSim.tsx` |

### P1 | Class 12 -- biology -- 4 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Biodiversity and Conservation | missing | `C12_BiologyBiodiversityAndConservationSim.tsx` |
| Ecosystem | missing | `C12_BiologyEcosystemSim.tsx` |
| Environmental Issues | missing | `C12_BiologyEnvironmentalIssuesSim.tsx` |
| Evolution | missing | `C12_BiologyEvolutionSim.tsx` |

### P1 | Class 12 -- chemistry -- 3 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Chemical Kinetics | missing | `C12_ChemistryChemicalKineticsSim.tsx` |
| General Principles and Processes of Isolation of Elements | missing | `C12_ChemistryGeneralPrinciplesAndProcessesOfSim.tsx` |
| The d- and f-Block Elements | missing | `C12_ChemistryTheDAndFBlockSim.tsx` |

### P1 | Class 12 -- maths -- 5 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Chapter 9 Differential Equations | missing | `C12_MathematicsChapter9DifferentialEquationsSim.tsx` |
| Continuity and Differentiability | missing | `C12_MathematicsContinuityAndDifferentiabilitySim.tsx` |
| Determinants | missing | `C12_MathematicsDeterminantsSim.tsx` |
| Linear Programming | missing | `C12_MathematicsLinearProgrammingSim.tsx` |
| Relations and Functions | weak (weak match: `C12_AppliedMathsTypesRelationsReflexiveSim.tsx`) | `C12_MathematicsRelationsAndFunctionsSim.tsx` |

### P1 | Class 12 -- physics -- 3 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Atoms | missing | `C12_PhysicsAtomsSim.tsx` |
| Ray Optics and Optical Instruments | missing | `C12_PhysicsRayOpticsAndOpticalInstrumentsSim.tsx` |
| Semiconductor Electronics: Materials, Devices and Simple Circuits | missing | `C12_PhysicsSemiconductorElectronicsMaterialsDevicesAndSim.tsx` |

### P2 | Class 12 -- computer_science -- 13 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Computer Networks | missing | `C12_ComputerScienceComputerNetworksSim.tsx` |
| Data Communication | missing | `C12_ComputerScienceDataCommunicationSim.tsx` |
| Database Concepts | missing | `C12_ComputerScienceDatabaseConceptsSim.tsx` |
| Exception Handling in Python | missing | `C12_ComputerScienceExceptionHandlingInPythonSim.tsx` |
| File Handling in Python | missing | `C12_ComputerScienceFileHandlingInPythonSim.tsx` |
| Project Based Learning | missing | `C12_ComputerScienceProjectBasedLearningSim.tsx` |
| Queue | missing | `C12_ComputerScienceQueueSim.tsx` |
| Searching | missing | `C12_ComputerScienceSearchingSim.tsx` |
| Security Aspects | missing | `C12_ComputerScienceSecurityAspectsSim.tsx` |
| Sorting | missing | `C12_ComputerScienceSortingSim.tsx` |
| Stack | missing | `C12_ComputerScienceStackSim.tsx` |
| Structured Query Language (SQL) | missing | `C12_ComputerScienceStructuredQueryLanguageSqlSim.tsx` |
| Understanding Data | missing | `C12_ComputerScienceUnderstandingDataSim.tsx` |

### P2 | Class 12 -- geography -- 9 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Data Processing | missing | `C12_GeographyDataProcessingSim.tsx` |
| Data: Sources and Compilation | missing | `C12_GeographyDataSourcesAndCompilationSim.tsx` |
| Geographical Perspective on Selected Issues and Problems | missing | `C12_GeographyGeographicalPerspectiveOnSelectedIssuesSim.tsx` |
| Graphical Representation of Data | missing | `C12_GeographyGraphicalRepresentationOfDataSim.tsx` |
| Primary Activities | missing | `C12_GeographyPrimaryActivitiesSim.tsx` |
| Secondary Activities | missing | `C12_GeographySecondaryActivitiesSim.tsx` |
| Tertiary and Quaternary Activities | missing | `C12_GeographyTertiaryAndQuaternaryActivitiesSim.tsx` |
| Use of Computer in Data Processing and Mapping | missing | `C12_GeographyUseOfComputerInDataSim.tsx` |
| Hindi-medium chapter #9 (see SIMS_COVERAGE.json) | missing | `C12_GeographyCh9Sim.tsx` |

### P3 | Class 12 -- accountancy -- 7 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Accounting Ratios | missing | `C12_AccountancyAccountingRatiosSim.tsx` |
| Dissolution of Partnership Firm | missing | `C12_AccountancyDissolutionOfPartnershipFirmSim.tsx` |
| Graphs and Charts for Business Data | missing | `C12_AccountancyGraphsAndChartsForBusinessSim.tsx` |
| Issue and Redemption of Debentures | missing | `C12_AccountancyIssueAndRedemptionOfDebenturesSim.tsx` |
| Overview of Computerised Accounting System | missing | `C12_AccountancyOverviewOfComputerisedAccountingSystemSim.tsx` |
| Spreadsheet | missing | `C12_AccountancySpreadsheetSim.tsx` |
| Use of Spreadsheet in Business Applications | missing | `C12_AccountancyUseOfSpreadsheetInBusinessSim.tsx` |

### P3 | Class 12 -- applied_maths -- 11 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Algebra | missing | `C12_AppliedMathsAlgebraSim.tsx` |
| Differential Equations and Modeling | missing | `C12_AppliedMathsDifferentialEquationsAndModelingSim.tsx` |
| Differentiation and Its Applications | missing | `C12_AppliedMathsDifferentiationAndItsApplicationsSim.tsx` |
| Financial Mathematics | missing | `C12_AppliedMathsFinancialMathematicsSim.tsx` |
| Index Numbers and Time-based Data | missing | `C12_AppliedMathsIndexNumbersAndTimeBasedSim.tsx` |
| Inferential Statistics | missing | `C12_AppliedMathsInferentialStatisticsSim.tsx` |
| Integration and Its Application | missing | `C12_AppliedMathsIntegrationAndItsApplicationSim.tsx` |
| Linear Programming Problem | missing | `C12_AppliedMathsLinearProgrammingProblemSim.tsx` |
| Numbers, Quantification and Numerical Applications | missing | `C12_AppliedMathsNumbersQuantificationAndNumericalApplicationsSim.tsx` |
| Practical and Project Work | missing | `C12_AppliedMathsPracticalAndProjectWorkSim.tsx` |
| Probability Distribution | missing | `C12_AppliedMathsProbabilityDistributionSim.tsx` |

### P3 | Class 12 -- biotechnology -- 13 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| An Overview of Recombinant DNA Technology | missing | `C12_BiotechnologyAnOverviewOfRecombinantDnaSim.tsx` |
| Animal Cell Culture | missing | `C12_BiotechnologyAnimalCellCultureSim.tsx` |
| Applications of Recombinant DNA Technology | missing | `C12_BiotechnologyApplicationsOfRecombinantDnaTechnologySim.tsx` |
| Bioprocessing and Biomanufacturing | missing | `C12_BiotechnologyBioprocessingAndBiomanufacturingSim.tsx` |
| Bioremediation | missing | `C12_BiotechnologyBioremediationSim.tsx` |
| Entrepreneurship | missing | `C12_BiotechnologyEntrepreneurshipSim.tsx` |
| Gene Cloning | missing | `C12_BiotechnologyGeneCloningSim.tsx` |
| Genome Technology and Engineering | missing | `C12_BiotechnologyGenomeTechnologyAndEngineeringSim.tsx` |
| Host-Vector System | missing | `C12_BiotechnologyHostVectorSystemSim.tsx` |
| Microbial Culture | missing | `C12_BiotechnologyMicrobialCultureSim.tsx` |
| Plant Tissue Culture | missing | `C12_BiotechnologyPlantTissueCultureSim.tsx` |
| Recent Innovations in Biotechnology | missing | `C12_BiotechnologyRecentInnovationsInBiotechnologySim.tsx` |
| Stem Cell Culture and Organ Culture | missing | `C12_BiotechnologyStemCellCultureAndOrganSim.tsx` |

### P3 | Class 12 -- business_studies -- 7 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Consumer Protection | missing | `C12_BusinessStudiesConsumerProtectionSim.tsx` |
| Controlling | missing | `C12_BusinessStudiesControllingSim.tsx` |
| Directing | missing | `C12_BusinessStudiesDirectingSim.tsx` |
| Nature and Significance of Management | missing | `C12_BusinessStudiesNatureAndSignificanceOfManagementSim.tsx` |
| Organising | missing | `C12_BusinessStudiesOrganisingSim.tsx` |
| Principles of Management | missing | `C12_BusinessStudiesPrinciplesOfManagementSim.tsx` |
| Staffing | missing | `C12_BusinessStudiesStaffingSim.tsx` |

### P3 | Class 12 -- economics -- 6 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Balance of Payments | missing | `C12_EconomicsBalanceOfPaymentsSim.tsx` |
| Development Experience of India - A Comparison with Neighbours | missing | `C12_EconomicsDevelopmentExperienceOfIndiaASim.tsx` |
| Introduction | missing | `C12_EconomicsIntroductionSim.tsx` |
| Introduction to Macroeconomics | missing | `C12_EconomicsIntroductionToMacroeconomicsSim.tsx` |
| Production and Costs | missing | `C12_EconomicsProductionAndCostsSim.tsx` |
| The Theory of the Firm under Perfect Competition | missing | `C12_EconomicsTheTheoryOfTheFirmSim.tsx` |

### P3 | Class 12 -- history -- 11 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| An Imperial Capital: Vijayanagara | missing | `C12_SimAnImperialCapitalVijayanagaraSim.tsx` |
| Bhakti-Sufi Traditions | missing | `C12_SimBhaktiSufiTraditionsSim.tsx` |
| Bricks, Beads and Bones | missing | `C12_SimBricksBeadsAndBonesSim.tsx` |
| Colonialism and the Countryside | missing | `C12_SimColonialismAndTheCountrysideSim.tsx` |
| Framing the Constitution | missing | `C12_SimFramingTheConstitutionSim.tsx` |
| Kings, Farmers and Towns | missing | `C12_SimKingsFarmersAndTownsSim.tsx` |
| Peasants, Zamindars and the State | missing | `C12_SimPeasantsZamindarsAndTheStateSim.tsx` |
| Social Histories: Using the Mahabharata | missing | `C12_SimSocialHistoriesUsingTheMahabharataSim.tsx` |
| The Meerut Mutiny of 1857 | missing | `C12_SimTheMeerutMutinyOf1857Sim.tsx` |
| Thinkers, Beliefs and Buildings | missing | `C12_SimThinkersBeliefsAndBuildingsSim.tsx` |
| Through the Eyes of Travellers | missing | `C12_SimThroughTheEyesOfTravellersSim.tsx` |

### P3 | Class 12 -- home_science -- 14 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Care and Maintenance of Fabrics in Institutions | missing | `C12_HomeScienceCareAndMaintenanceOfFabricsSim.tsx` |
| Clinical Nutrition and Dietetics | missing | `C12_HomeScienceClinicalNutritionAndDieteticsSim.tsx` |
| Consumer Education and Protection | missing | `C12_HomeScienceConsumerEducationAndProtectionSim.tsx` |
| Corporate Communication and Public Relations | missing | `C12_HomeScienceCorporateCommunicationAndPublicRelationsSim.tsx` |
| Design for Fabric and Apparel | missing | `C12_HomeScienceDesignForFabricAndApparelSim.tsx` |
| Development Communication and Journalism | missing | `C12_HomeScienceDevelopmentCommunicationAndJournalismSim.tsx` |
| Early Childhood Care and Education | missing | `C12_HomeScienceEarlyChildhoodCareAndEducationSim.tsx` |
| Fashion Design and Merchandising | missing | `C12_HomeScienceFashionDesignAndMerchandisingSim.tsx` |
| Food Processing and Technology | missing | `C12_HomeScienceFoodProcessingAndTechnologySim.tsx` |
| Food Quality and Food Safety | missing | `C12_HomeScienceFoodQualityAndFoodSafetySim.tsx` |
| Hospitality Management | missing | `C12_HomeScienceHospitalityManagementSim.tsx` |
| Management of Support Services, Institutions and Programmes for Children, Youth and Elderly | missing | `C12_HomeScienceManagementOfSupportServicesInstitutionsSim.tsx` |
| Public Nutrition and Health | missing | `C12_HomeSciencePublicNutritionAndHealthSim.tsx` |
| Work, Livelihood and Career | missing | `C12_HomeScienceWorkLivelihoodAndCareerSim.tsx` |

### P3 | Class 12 -- informatics_practices -- 7 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Data Handling Using Pandas - I | missing | `C12_InformaticsPracticesDataHandlingUsingPandasISim.tsx` |
| Data Handling using Pandas - II | missing | `C12_InformaticsPracticesDataHandlingUsingPandasIiSim.tsx` |
| Introduction to Computer Networks | missing | `C12_InformaticsPracticesIntroductionToComputerNetworksSim.tsx` |
| Plotting with Pyplot | missing | `C12_InformaticsPracticesPlottingWithPyplotSim.tsx` |
| Project Based Learning | missing | `C12_InformaticsPracticesProjectBasedLearningSim.tsx` |
| Querying and SQL Functions | missing | `C12_InformaticsPracticesQueryingAndSqlFunctionsSim.tsx` |
| Societal Impacts | missing | `C12_InformaticsPracticesSocietalImpactsSim.tsx` |

### P3 | Class 12 -- political_science -- 15 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Alternative Centres of Power | missing | `C12_PoliticalScienceAlternativeCentresOfPowerSim.tsx` |
| Challenges of Nation-Building | missing | `C12_PoliticalScienceChallengesOfNationBuildingSim.tsx` |
| Challenges to and Restoration of the Congress System | missing | `C12_PoliticalScienceChallengesToAndRestorationOfSim.tsx` |
| Contemporary Centres of Power | missing | `C12_PoliticalScienceContemporaryCentresOfPowerSim.tsx` |
| Contemporary South Asia | missing | `C12_PoliticalScienceContemporarySouthAsiaSim.tsx` |
| Environment and Natural Resources | missing | `C12_PoliticalScienceEnvironmentAndNaturalResourcesSim.tsx` |
| Era of One-Party Dominance | missing | `C12_PoliticalScienceEraOfOnePartyDominanceSim.tsx` |
| Globalisation | missing | `C12_PoliticalScienceGlobalisationSim.tsx` |
| International Organisations | missing | `C12_PoliticalScienceInternationalOrganisationsSim.tsx` |
| Politics of Planned Development | missing | `C12_PoliticalSciencePoliticsOfPlannedDevelopmentSim.tsx` |
| Regional Aspirations | missing | `C12_PoliticalScienceRegionalAspirationsSim.tsx` |
| Security in the Contemporary World | missing | `C12_PoliticalScienceSecurityInTheContemporaryWorldSim.tsx` |
| The Crisis of Democratic Order | missing | `C12_PoliticalScienceTheCrisisOfDemocraticOrderSim.tsx` |
| The End of Bipolarity | missing | `C12_PoliticalScienceTheEndOfBipolaritySim.tsx` |
| India's External Relations | weak (weak match: `C12_PoliticalScienceSalientFeaturesIndianSim.tsx`) | `C12_PoliticalScienceIndiaSExternalRelationsSim.tsx` |

### P3 | Class 12 -- psychology -- 3 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Attitude and Social Cognition | missing | `C12_PsychologyAttitudeAndSocialCognitionSim.tsx` |
| Meeting Life Challenges | missing | `C12_PsychologyMeetingLifeChallengesSim.tsx` |
| Social Influence and Group Processes | missing | `C12_PsychologySocialInfluenceAndGroupProcessesSim.tsx` |

### P3 | Class 12 -- sociology -- 7 chapter(s) without a sim

| Chapter title | Status | Suggested sim file |
|---|---|---|
| Introducing Indian Society | missing | `C12_SociologyIntroducingIndianSocietySim.tsx` |
| Mass Media and Communications | missing | `C12_SociologyMassMediaAndCommunicationsSim.tsx` |
| Suggestions for Project Work | missing | `C12_SociologySuggestionsForProjectWorkSim.tsx` |
| The Challenges of Cultural Diversity | missing | `C12_SociologyTheChallengesOfCulturalDiversitySim.tsx` |
| The Demographic Structure of the Indian Society | missing | `C12_SociologyTheDemographicStructureOfTheSim.tsx` |
| Cultural Change | weak (weak match: `C12_SociologySocialChangeDevelopmentSim.tsx`) | `C12_SociologyCulturalChangeSim.tsx` |
| Structural Change | weak (weak match: `C12_SociologySocialChangeDevelopmentSim.tsx`) | `C12_SociologyStructuralChangeSim.tsx` |

**Total new sims to build (missing only, classes 6-12): ~534**, of which P1 core-subject: 167,
P2: 180, P3: 187. Many class 6-8 gaps can be closed faster by adapting existing adjacent-grade sims
(e.g. C7/C9 physics for C6 magnets/light) rather than greenfield builds.

## 8. Classes 1-5 note

No `catalog_*.json` exists for classes 1-5, so chapter-level mapping is not possible there.
All 136 class 1-5 games are registry-wired in `gameRegistry.ts` with explicit nodeIds, but
**20 of the 24 class 1 games are on the corrupted list** (repair in flight by other agents), so the
junior world is partially broken today. Junior-world coverage should be audited against node stores
instead of catalogs.

## 9. Recommended actions (non-exhaustive, read-only audit)

1. Wire `c6_12_chem_upgraded/` (56 upgraded duplicates) into `c6_12_gameRegistry.ts` replacing old versions, or archive them.
2. Audit the ~21 unwired `c6_12/` files and the 4 root primitives; delete or register.
3. Fix the 35 corrupted files (in flight by repair agents); they are registry-wired and student-visible.
4. Build P1 worklist first (class 6-10 NCERT science + maths 6-8 + class 10 science board chapters:
   Electricity, Light, Life Processes, Acids/Bases, Carbon compounds, Heredity, Reproduction).
5. Regenerate `c6_12_gameRegistry.ts` via `scripts/build_c6_12_registry.py` after any addition.
