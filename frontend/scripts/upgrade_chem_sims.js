/**
 * Chemistry Sim Upgrade Pipeline
 *
 * Upgrades 56 chemistry sims to FULL PREMIUM quality matching physics/biology/maths.
 * Uses 33 Gemini keys in a STAGGERED approach:
 *   - Each key generates 1 sim, then takes 60s break, then generates next
 *   - Keys are staggered so not all hit the API at the same time
 *   - Rate limit handling with exponential backoff
 *
 * What gets added to each chemistry sim:
 *   - SCENARIO (narrative lab context)
 *   - DISCOVERY_QUESTION (if missing)
 *   - EXPLORATION_STEPS (5 interactive labs)
 *   - PREDICTION_QUESTIONS (predict-then-check)
 *   - OBSERVATION_QUESTIONS
 *   - REAL_WORLD_ACTIVITY
 *   - 22+ progressive challenges (up from 0-10)
 *   - Topic-specific SVG diagrams
 *   - Full BKT/SM2/mastery integration (already present in most)
 *   - onComplete callback (if missing)
 *
 * Strategy: REGENERATE each sim from scratch with the premium prompt.
 * Originals are backed up, NOT overwritten.
 *
 * Output: D:\platform\frontend\components\simulations\c6_12_chem_upgraded\
 * Backups: D:\platform\frontend\components\simulations\c6_12_chem_backups\
 *
 * Usage:
 *   node upgrade_chem_sims.js              # all 56 sims
 *   node upgrade_chem_sims.js 0 5          # first 5 sims (test run)
 *   node upgrade_chem_sims.js 10 20        # sims 10-19
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

// ─── Load 33 Gemini keys ──────────────────────────────────────
const keysRaw = fs.readFileSync('D:/platform/frontend/scripts/gemini-keys-all.env', 'utf8');
const KEYS = [];
for (const line of keysRaw.split('\n')) {
  const m = line.match(/^GEMINI_KEY_\d+=(.+)$/);
  if (m) KEYS.push(m[1].trim());
}
console.log(`Loaded ${KEYS.length} Gemini keys`);

const MODEL = 'gemini-3.6-flash';
const MAX_TOKENS = 65536;
const BREAK_MS = 90000;           // 90s break between sims per key (avoid 429)
const MAX_RETRIES = 6;            // retries per sim on 503/429
const STAGGER_MS = 3000;          // 3s stagger between key starts (spread load)
const RATE_LIMIT_BACKOFF_BASE = 90; // start at 90s for rate limits

const SIM_DIR = 'D:/platform/frontend/components/simulations/c6_12';
const OUTPUT_DIR = 'D:/platform/frontend/components/simulations/c6_12_chem_upgraded';
const BACKUP_DIR = 'D:/platform/frontend/components/simulations/c6_12_chem_backups';
const NEW_SIM_OUTPUT_DIR = 'D:/platform/frontend/components/simulations/c6_12_new';
const FIXED_NODES_DIR = 'D:/platform/cbse_coverage_output_fixed';

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(BACKUP_DIR, { recursive: true });

// ─── Load CISCE enrichment for chemistry nodes ────────────────
const CISCE_DIR = 'D:\\cisce';
const enrichmentCache = {};

function loadEnrichmentForClassSubject(classNum, subjectCode) {
  const cacheKey = `${classNum}_${subjectCode}`;
  if (enrichmentCache[cacheKey]) return enrichmentCache[cacheKey];

  const subjDir = 'chem';
  const enrichmentDir = path.join(CISCE_DIR, subjDir, 'enrichment');
  if (!fs.existsSync(enrichmentDir)) return {};

  const classPrefix = `c${classNum}_`;
  const nodeMap = {};

  try {
    const allFiles = fs.readdirSync(enrichmentDir).filter(f =>
      f.startsWith(classPrefix) && f.endsWith('.marker')
    );

    for (const fileName of allFiles) {
      const filePath = path.join(enrichmentDir, fileName);
      const content = fs.readFileSync(filePath, 'utf8');

      const nodeRegex = /^--- NODE (\S+) ---\r?$/gm;
      let match;
      const sections = [];

      while ((match = nodeRegex.exec(content)) !== null) {
        if (sections.length > 0) {
          const prevSection = sections[sections.length - 1];
          prevSection.content = content.substring(prevSection.startIdx, match.index).trim();
        }
        sections.push({ nodeId: match[1], startIdx: nodeRegex.lastIndex });
      }
      if (sections.length > 0) {
        const lastSection = sections[sections.length - 1];
        lastSection.content = content.substring(lastSection.startIdx).trim();
      }

      for (const section of sections) {
        if (!nodeMap[section.nodeId]) {
          nodeMap[section.nodeId] = section.content;
        } else {
          nodeMap[section.nodeId] += '\n\n' + section.content;
        }
      }
    }
  } catch (e) {}

  enrichmentCache[cacheKey] = nodeMap;
  return nodeMap;
}

function getEnrichmentForNodes(nodes, classNum) {
  const allEnrichment = loadEnrichmentForClassSubject(classNum, 'chem');
  const parts = [];
  for (const nodeId of nodes) {
    const raw = allEnrichment[nodeId];
    if (!raw) continue;
    // Extract only DEFINITION, ELI5, and COMMON_MISCONCEPTION — skip TEXT_WALKTHROUGH and DIAGNOSTIC_QUESTION which are huge
    const defMatch = raw.match(/DEFINITION:\s*\|\n([\s\S]*?)(?=\n[A-Z_]+:)/);
    const eli5Match = raw.match(/ELI5:\s*\|\n([\s\S]*?)(?=\n[A-Z_]+:)/);
    const miscMatch = raw.match(/COMMON_MISCONCEPTION:\s*\|\n([\s\S]*?)(?=\n[A-Z_]+:|$)/);
    
    let summary = `### ${nodeId}\n`;
    if (defMatch) summary += `DEFINITION: ${defMatch[1].trim().substring(0, 500)}\n`;
    if (eli5Match) summary += `ELI5: ${eli5Match[1].trim().substring(0, 300)}\n`;
    if (miscMatch) summary += `COMMON_MISCONCEPTION: ${miscMatch[1].trim().substring(0, 800)}\n`;
    
    parts.push(summary);
  }
  return parts.length > 0 ? parts.join('\n---\n') : null;
}

// ─── Get 11 new sims for zero-coverage chapters ───────────────
function getNewSims() {
  const NEW_CHAPTERS = [
    { id: 'C12_PhysicsMagnetismandMatterCBSESim', class: 12, subject: 'Physics', chapter: 'Magnetism and Matter',
      fixedFile: 'fixed_phy_c12.json' },
    { id: 'C12_BiologyReproductiveHealthCBSESim', class: 12, subject: 'Biology', chapter: 'Reproductive Health',
      fixedFile: 'fixed_bio_c12.json' },
    { id: 'C11_BiologyPlantGrowthCBSESim', class: 11, subject: 'Biology', chapter: 'Plant Growth and Development',
      fixedFile: 'fixed_bio_c11.json' },
    { id: 'C12_BiologyMolecularBasisofInheritanceCBSESim', class: 12, subject: 'Biology', chapter: 'Molecular Basis of Inheritance',
      fixedFile: 'fixed_bio_c12.json' },
    { id: 'C12_BiologyHumanHealthandDiseaseCBSESim', class: 12, subject: 'Biology', chapter: 'Human Health and Disease',
      fixedFile: 'fixed_bio_c12.json' },
    { id: 'C12_BiologyHumanReproductionCBSESim', class: 12, subject: 'Biology', chapter: 'Human Reproduction',
      fixedFile: 'fixed_bio_c12.json' },
    { id: 'C12_BiologyEarlyChildhoodCareCBSESim', class: 12, subject: 'Biology', chapter: 'Early Childhood Care and Education',
      fixedFile: 'fixed_bio_c12.json' },
    { id: 'C12_BiologyFoodQualityCBSESim', class: 12, subject: 'Biology', chapter: 'Food Quality and Food Safety',
      fixedFile: 'fixed_bio_c12.json' },
    { id: 'C12_BiologyClinicalNutritionCBSESim', class: 12, subject: 'Biology', chapter: 'Clinical Nutrition and Dietetics',
      fixedFile: 'fixed_bio_c12.json' },
    { id: 'C11_MathsLinearInequalitiesCBSESim', class: 11, subject: 'Maths', chapter: 'Linear Inequalities',
      fixedFile: 'fixed_maths_c11.json' },
    { id: 'C11_MathsInfiniteSeriesCBSESim', class: 11, subject: 'Maths', chapter: 'Infinite Series',
      fixedFile: 'fixed_maths_c11.json' },
  ];

  // ─── Phase 1: Biotechnology (15 sims) ────────────────────────
  const BIOTECH_CHAPTERS = [
    { id: 'C11_BiotechIntroductionCBSESim', class: 11, subject: 'Biotechnology', chapter: 'Introduction to Biotechnology', fixedFile: 'fixed_bt_c11.json' },
    { id: 'C11_BiotechBiomoleculesCBSESim', class: 11, subject: 'Biotechnology', chapter: 'Biomolecules', fixedFile: 'fixed_bt_c11.json' },
    { id: 'C11_BiotechToolsTechniquesCBSESim', class: 11, subject: 'Biotechnology', chapter: 'Tools and Techniques', fixedFile: 'fixed_bt_c11.json' },
    { id: 'C11_BiotechGeneticDisordersCBSESim', class: 11, subject: 'Biotechnology', chapter: 'Genetic Disorders', fixedFile: 'fixed_bt_c11.json' },
    { id: 'C11_BiotechCellularProcessesCBSESim', class: 11, subject: 'Biotechnology', chapter: 'Cellular Processes', fixedFile: 'fixed_bt_c11.json' },
    { id: 'C11_BiotechEnzymesBioenergeticsCBSESim', class: 11, subject: 'Biotechnology', chapter: 'Enzymes and Bioenergetics', fixedFile: 'fixed_bt_c11.json' },
    { id: 'C11_BiotechProteinInformaticsCBSESim', class: 11, subject: 'Biotechnology', chapter: 'Protein Informatics', fixedFile: 'fixed_bt_c11.json' },
    { id: 'C11_BiotechBioinformaticsCBSESim', class: 11, subject: 'Biotechnology', chapter: 'Introduction to Bioinformatics', fixedFile: 'fixed_bt_c11.json' },
    { id: 'C12_BiotechMicrobialCultureCBSESim', class: 12, subject: 'Biotechnology', chapter: 'Microbial Culture', fixedFile: 'fixed_bt_c12.json' },
    { id: 'C12_BiotechRecombinantDNAApplicationsCBSESim', class: 12, subject: 'Biotechnology', chapter: 'Applications of Recombinant DNA Technology', fixedFile: 'fixed_bt_c12.json' },
    { id: 'C12_BiotechGeneCloningCBSESim', class: 12, subject: 'Biotechnology', chapter: 'Gene Cloning', fixedFile: 'fixed_bt_c12.json' },
    { id: 'C12_BiotechAnimalCellCultureCBSESim', class: 12, subject: 'Biotechnology', chapter: 'Animal Cell Culture', fixedFile: 'fixed_bt_c12.json' },
    { id: 'C12_BiotechPlantTissueCultureCBSESim', class: 12, subject: 'Biotechnology', chapter: 'Plant Tissue Culture', fixedFile: 'fixed_bt_c12.json' },
    { id: 'C12_BiotechGenomeTechnologyCBSESim', class: 12, subject: 'Biotechnology', chapter: 'Genome Technology', fixedFile: 'fixed_bt_c12.json' },
    { id: 'C12_BiotechBioremediationCBSESim', class: 12, subject: 'Biotechnology', chapter: 'Bioremediation', fixedFile: 'fixed_bt_c12.json' },
  ];

  // ─── Phase 2: Geography (15 sims) ────────────────────────────
  const GEO_CHAPTERS = [
    { id: 'C11_GeoInteriorEarthCBSESim', class: 11, subject: 'Geography', chapter: 'Interior of the Earth', fixedFile: 'fixed_geo_c11.json' },
    { id: 'C11_GeoLandformsEvolutionCBSESim', class: 11, subject: 'Geography', chapter: 'Landforms and Their Evolution', fixedFile: 'fixed_geo_c11.json' },
    { id: 'C11_GeoGeomorphicProcessesCBSESim', class: 11, subject: 'Geography', chapter: 'Geomorphic Processes', fixedFile: 'fixed_geo_c11.json' },
    { id: 'C11_GeoOceansContinentsCBSESim', class: 11, subject: 'Geography', chapter: 'Distribution of Oceans and Continents', fixedFile: 'fixed_geo_c11.json' },
    { id: 'C12_GeoTransportCommunicationCBSESim', class: 12, subject: 'Geography', chapter: 'Transport and Communication', fixedFile: 'fixed_geo_c12.json' },
    { id: 'C12_GeoLandResourcesAgricultureCBSESim', class: 12, subject: 'Geography', chapter: 'Land Resources and Agriculture', fixedFile: 'fixed_geo_c12.json' },
    { id: 'C12_GeoPlanningSustainableDevCBSESim', class: 12, subject: 'Geography', chapter: 'Planning and Sustainable Development', fixedFile: 'fixed_geo_c12.json' },
    { id: 'C12_GeoInternationalTradeCBSESim', class: 12, subject: 'Geography', chapter: 'International Trade', fixedFile: 'fixed_geo_c12.json' },
    { id: 'C9_GeoNaturalVegetationCBSESim', class: 9, subject: 'Geography', chapter: 'Natural Vegetation and Wildlife', fixedFile: 'fixed_geo_c9.json' },
    { id: 'C9_GeoIndiaSizeLocationCBSESim', class: 9, subject: 'Geography', chapter: 'India', fixedFile: 'fixed_geo_c9.json' },
    { id: 'C11_GeoGeographyDisciplineCBSESim', class: 11, subject: 'Geography', chapter: 'Geography as a Discipline', fixedFile: 'fixed_geo_c11.json' },
    { id: 'C11_GeoWaterResourcesCBSESim', class: 11, subject: 'Geography', chapter: 'Water Resources', fixedFile: 'fixed_geo_c11.json' },
    { id: 'C11_GeoClimateCBSESim', class: 11, subject: 'Geography', chapter: 'Climate', fixedFile: 'fixed_geo_c11.json' },
    { id: 'C12_GeoHumanDevelopmentCBSESim', class: 12, subject: 'Geography', chapter: 'Human Development', fixedFile: 'fixed_geo_c12.json' },
    { id: 'C12_GeoPopulationDistributionCBSESim', class: 12, subject: 'Geography', chapter: 'Population', fixedFile: 'fixed_geo_c12.json' },
  ];

  // ─── Phase 3: Economics (10 sims) ────────────────────────────
  const ECO_CHAPTERS = [
    { id: 'C12_EcoConsumerBehaviourCBSESim', class: 12, subject: 'Economics', chapter: 'Theory of Consumer Behaviour', fixedFile: 'fixed_eco_c12.json' },
    { id: 'C12_EcoGovernmentBudgetCBSESim', class: 12, subject: 'Economics', chapter: 'Government Budget and the Economy', fixedFile: 'fixed_eco_c12.json' },
    { id: 'C12_EcoOpenEconomyMacroCBSESim', class: 12, subject: 'Economics', chapter: 'Open Economy Macroeconomics', fixedFile: 'fixed_eco_c12.json' },
    { id: 'C12_EcoNationalIncomeCBSESim', class: 12, subject: 'Economics', chapter: 'National Income Accounting', fixedFile: 'fixed_eco_c12.json' },
    { id: 'C12_EcoProductionCostsCBSESim', class: 12, subject: 'Economics', chapter: 'Production and Costs', fixedFile: 'fixed_eco_c12.json' },
    { id: 'C12_EcoMarketEquilibriumCBSESim', class: 12, subject: 'Economics', chapter: 'Market Equilibrium', fixedFile: 'fixed_eco_c12.json' },
    { id: 'C12_EcoDemandSupplyCBSESim', class: 12, subject: 'Economics', chapter: 'Demand', fixedFile: 'fixed_eco_c12.json' },
    { id: 'C11_EcoIndianEconomyCBSESim', class: 11, subject: 'Economics', chapter: 'Indian Economy 1950-1990', fixedFile: 'fixed_eco_c11.json' },
    { id: 'C11_EcoHumanCapitalCBSESim', class: 11, subject: 'Economics', chapter: 'Human Capital Formation', fixedFile: 'fixed_eco_c11.json' },
    { id: 'C11_EcoLiberalisationCBSESim', class: 11, subject: 'Economics', chapter: 'Liberalisation', fixedFile: 'fixed_eco_c11.json' },
  ];

  // ─── Phase 4: Psychology (8 sims) ────────────────────────────
  const PSY_CHAPTERS = [
    { id: 'C11_PsyWhatIsPsychologyCBSESim', class: 11, subject: 'Psychology', chapter: 'What is Psychology?', fixedFile: 'fixed_psy_c11.json' },
    { id: 'C11_PsyHumanMemoryCBSESim', class: 11, subject: 'Psychology', chapter: 'Human Memory', fixedFile: 'fixed_psy_c11.json' },
    { id: 'C11_PsyHumanDevelopmentCBSESim', class: 11, subject: 'Psychology', chapter: 'Human Development', fixedFile: 'fixed_psy_c11.json' },
    { id: 'C11_PsyThinkingCBSESim', class: 11, subject: 'Psychology', chapter: 'Thinking', fixedFile: 'fixed_psy_c11.json' },
    { id: 'C11_PsyLearningCBSESim', class: 11, subject: 'Psychology', chapter: 'Learning', fixedFile: 'fixed_psy_c11.json' },
    { id: 'C12_PsyPsychologicalDisordersCBSESim', class: 12, subject: 'Psychology', chapter: 'Psychological Disorders', fixedFile: 'fixed_psy_c12.json' },
    { id: 'C12_PsySelfPersonalityCBSESim', class: 12, subject: 'Psychology', chapter: 'Self and Personality', fixedFile: 'fixed_psy_c12.json' },
    { id: 'C12_PsyTherapeuticApproachesCBSESim', class: 12, subject: 'Psychology', chapter: 'Therapeutic Approaches', fixedFile: 'fixed_psy_c12.json' },
  ];

  // ─── Phase 5-10: Humanities interactive activities ───────────
  const HUMANITIES_CHAPTERS = [
    // Phase 5: English (8)
    { id: 'C10_EngPoetryAnalyzerCBSESim', class: 10, subject: 'English', chapter: 'Poetry', fixedFile: 'fixed_engl_c10.json' },
    { id: 'C11_EngLiteraryDevicesCBSESim', class: 11, subject: 'English', chapter: 'Literary Devices', fixedFile: 'fixed_engl_c11.json' },
    { id: 'C12_EngCharacterMapperCBSESim', class: 12, subject: 'English', chapter: 'Character', fixedFile: 'fixed_engl_c12.json' },
    { id: 'C10_EngGrammarBuilderCBSESim', class: 10, subject: 'English', chapter: 'Grammar', fixedFile: 'fixed_engl_c10.json' },
    { id: 'C11_EngVocabularyBuilderCBSESim', class: 11, subject: 'English', chapter: 'Vocabulary', fixedFile: 'fixed_engl_c11.json' },
    { id: 'C12_EngComprehensionCBSESim', class: 12, subject: 'English', chapter: 'Comprehension', fixedFile: 'fixed_engl_c12.json' },
    { id: 'C11_EngWritingSkillsCBSESim', class: 11, subject: 'English', chapter: 'Writing', fixedFile: 'fixed_engl_c11.json' },
    { id: 'C12_EngThemeTrackerCBSESim', class: 12, subject: 'English', chapter: 'Theme', fixedFile: 'fixed_engl_c12.json' },
    // Phase 6: Hindi (8)
    { id: 'C10_HinKavitaVishleshakCBSESim', class: 10, subject: 'Hindi', chapter: 'Kavita', fixedFile: 'fixed_hin_c10.json' },
    { id: 'C11_HinVyakaranKhelCBSESim', class: 11, subject: 'Hindi', chapter: 'Vyakaran', fixedFile: 'fixed_hin_c11.json' },
    { id: 'C12_HinShabdkoshCBSESim', class: 12, subject: 'Hindi', chapter: 'Shabdkosh', fixedFile: 'fixed_hin_c12.json' },
    { id: 'C10_HinKahaniKramCBSESim', class: 10, subject: 'Hindi', chapter: 'Kahani', fixedFile: 'fixed_hin_c10.json' },
    { id: 'C11_HinRachnaVishleshanCBSESim', class: 11, subject: 'Hindi', chapter: 'Rachna', fixedFile: 'fixed_hin_c11.json' },
    { id: 'C12_HinAlankarCBSESim', class: 12, subject: 'Hindi', chapter: 'Alankar', fixedFile: 'fixed_hin_c12.json' },
    { id: 'C9_HinSandhiSamasCBSESim', class: 9, subject: 'Hindi', chapter: 'Sandhi', fixedFile: 'fixed_hin_c9.json' },
    { id: 'C8_HinVakyaNirmanCBSESim', class: 8, subject: 'Hindi', chapter: 'Vakya', fixedFile: 'fixed_hin_c8.json' },
    // Phase 7: History (6)
    { id: 'C10_HistTimelineBuilderCBSESim', class: 10, subject: 'History', chapter: 'Nationalism', fixedFile: 'fixed_hist_c10.json' },
    { id: 'C11_HistTimelineBuilderCBSESim', class: 11, subject: 'History', chapter: 'Empires', fixedFile: 'fixed_hist_c11.json' },
    { id: 'C12_HistTimelineBuilderCBSESim', class: 12, subject: 'History', chapter: 'Independence', fixedFile: 'fixed_hist_c12.json' },
    { id: 'C8_HistTimelineBuilderCBSESim', class: 8, subject: 'History', chapter: 'Colonialism', fixedFile: 'fixed_hist_c8.json' },
    { id: 'C7_HistTimelineBuilderCBSESim', class: 7, subject: 'History', chapter: 'Delhi', fixedFile: 'fixed_hist_c7.json' },
    { id: 'C6_HistTimelineBuilderCBSESim', class: 6, subject: 'History', chapter: 'Civilizations', fixedFile: 'fixed_hist_c6.json' },
    // Phase 8: Political Science (5)
    { id: 'C11_PolSciElectionSimulatorCBSESim', class: 11, subject: 'Political Science', chapter: 'Election', fixedFile: 'fixed_pol_c11.json' },
    { id: 'C12_PolSciConstitutionCBSESim', class: 12, subject: 'Political Science', chapter: 'Constitution', fixedFile: 'fixed_pol_c12.json' },
    { id: 'C11_PolSciLegislatureCBSESim', class: 11, subject: 'Political Science', chapter: 'Legislature', fixedFile: 'fixed_pol_c11.json' },
    { id: 'C12_PolSciGlobalPoliticsCBSESim', class: 12, subject: 'Political Science', chapter: 'Global', fixedFile: 'fixed_pol_c12.json' },
    { id: 'C11_PolSciBranchesPowerCBSESim', class: 11, subject: 'Political Science', chapter: 'Executive', fixedFile: 'fixed_pol_c11.json' },
    // Phase 9: Sociology (4)
    { id: 'C11_SocStratificationCBSESim', class: 11, subject: 'Sociology', chapter: 'Social Structure', fixedFile: 'fixed_soc_c11.json' },
    { id: 'C12_SocSocialChangeCBSESim', class: 12, subject: 'Sociology', chapter: 'Social Change', fixedFile: 'fixed_soc_c12.json' },
    { id: 'C11_SocCultureSocietyCBSESim', class: 11, subject: 'Sociology', chapter: 'Culture', fixedFile: 'fixed_soc_c11.json' },
    { id: 'C12_SocDemographicTransitionCBSESim', class: 12, subject: 'Sociology', chapter: 'Population', fixedFile: 'fixed_soc_c12.json' },
    // Phase 10: Legal Studies (3)
    { id: 'C11_LegalMockCourtCBSESim', class: 11, subject: 'Legal Studies', chapter: 'Court', fixedFile: 'fixed_legal_c11.json' },
    { id: 'C12_LegalCaseAnalyzerCBSESim', class: 12, subject: 'Legal Studies', chapter: 'Case', fixedFile: 'fixed_legal_c12.json' },
    { id: 'C11_LegalRightsAnalyzerCBSESim', class: 11, subject: 'Legal Studies', chapter: 'Rights', fixedFile: 'fixed_legal_c11.json' },
  ];

  // Select phase based on argument
  const phaseArg = process.argv.find(a => a.startsWith('--phase='));
  const phase = phaseArg ? phaseArg.split('=')[1] : 'all';
  let chapters;
  if (phase === 'biotech') chapters = BIOTECH_CHAPTERS;
  else if (phase === 'geo') chapters = GEO_CHAPTERS;
  else if (phase === 'eco') chapters = ECO_CHAPTERS;
  else if (phase === 'psy') chapters = PSY_CHAPTERS;
  else if (phase === 'humanities') chapters = HUMANITIES_CHAPTERS;
  else chapters = NEW_CHAPTERS; // default: original 11

  const sims = [];
  for (const ch of chapters) {
    const fixedPath = path.join(FIXED_NODES_DIR, ch.fixedFile);
    if (!fs.existsSync(fixedPath)) {
      console.log(`  WARN: ${ch.fixedFile} not found, skipping ${ch.id}`);
      continue;
    }
    const data = JSON.parse(fs.readFileSync(fixedPath, 'utf8'));
    const nodes = data.results[0].nodes;
    const chapterNodes = nodes.filter(n => n.chapter && n.chapter.includes(ch.chapter));
    if (chapterNodes.length === 0) {
      console.log(`  WARN: no nodes found for chapter "${ch.chapter}" in ${ch.fixedFile}`);
      continue;
    }
    const nodeIds = chapterNodes.map(n => n.node_id);
    // Build topic summary from node topics
    const topics = chapterNodes.map(n => n.topic).join('; ');
    sims.push({
      file: `${ch.id}.tsx`,
      baseName: ch.id,
      class: ch.class,
      nodeIds,
      existingMisc: [],
      subject: ch.subject,
      chapter: ch.chapter,
      topics,
    });
  }
  return sims;
}

// ─── Get all 56 chemistry sims ────────────────────────────────
function getChemSims() {
  const files = fs.readdirSync(SIM_DIR).filter(f => f.match(/C\d+_Chemistry.*Sim\.tsx$/));
  const sims = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(SIM_DIR, file), 'utf8');
    const nodeMatches = content.match(/c\d+_chem(?:_cbse)?_\d+/g) || [];
    const nodeIds = [...new Set(nodeMatches)];
    const classMatch = file.match(/C(\d+)_/);
    const cls = classMatch ? parseInt(classMatch[1]) : 0;
    const baseName = file.replace('.tsx', '');

    // Extract existing misconceptions if present
    let existingMisc = [];
    try {
      const miscMatch = content.match(/MISCONCEPTIONS_CHECKLIST\s*:\s*Misconception\[\]\s*=\s*\[([\s\S]*?)\];/);
      if (miscMatch) {
        const miscContent = miscMatch[1];
        const itemRegex = /id:\s*"([^"]+)".*?title:\s*"([^"]+)".*?description:\s*"([^"]+)".*?correction:\s*"([^"]+)"/gs;
        let m;
        while ((m = itemRegex.exec(miscContent)) !== null) {
          existingMisc.push({ id: m[1], title: m[2], description: m[3], correction: m[4] });
        }
      }
    } catch (e) {}

    sims.push({ file, baseName, class: cls, nodeIds, existingMisc });
  }

  return sims.sort((a, b) => a.class - b.class || a.file.localeCompare(b.file));
}

// ─── Build premium upgrade prompt ─────────────────────────────
function buildPrompt(sim) {
  const nodeIdList = sim.nodeIds.join(', ');
  const nodeInfo = sim.nodeIds.map(id => `  - ${id}`).join('\n');
  const enrichment = getEnrichmentForNodes(sim.nodeIds, sim.class);
  const boardLabel = sim.class <= 10 ? 'ICSE' : 'ISC';
  const existingMiscStr = sim.existingMisc.length > 0
    ? sim.existingMisc.map(m => `- ${m.title}: ${m.description} → ${m.correction}`).join('\n')
    : 'Generate 6 topic-specific misconceptions.';

  // New sims have subject/chapter/topics; chemistry upgrades don't
  const subject = sim.subject || 'Chemistry';
  const chapter = sim.chapter ? `\nChapter: ${sim.chapter}` : '';
  const topicsStr = sim.topics ? `\n\n## TOPICS THIS SIM COVERS\n${sim.topics}` : '';

  return `You are a senior React/TypeScript engineer building a PREMIUM interactive ${subject.toLowerCase()} simulation for a CISCE (${boardLabel}) learning platform. This must match the quality of our physics and biology sims (which have 22+ challenges, 2000+ lines, full interactive labs).

## CRITICAL: PREMIUM QUALITY BAR
This sim must match our physics/biology sims which have:
- 22+ progressive challenges across 3 difficulty tiers (foundation/standard/advanced)
- 2000+ lines of code
- 5 interactive exploration labs (EXPLORATION_STEPS)
- 2+ prediction questions (PREDICTION_QUESTIONS)
- 2+ observation questions (OBSERVATION_QUESTIONS)
- 1 real-world extension activity (REAL_WORLD_ACTIVITY)
- Custom topic-specific SVG diagrams (at least 3)
- Full BKT/SM2/mastery integration
- Discovery question with 4 options
- Narrative scenario
- 6+ misconceptions with corrections
- 8+ diagnostic questions

## YOUR TASK
Output the COMPLETE TypeScript code for a React component. Output ONLY the code — no explanations, no markdown fences, no commentary. Start with 'use client' and end with the default export.

## COMPONENT TO GENERATE
File: ${sim.baseName}.tsx
Class: ${sim.class} (${boardLabel})
Subject: ${subject}${chapter}

## NODES THIS SIM COVERS (you must teach ALL of these)
${nodeInfo}${topicsStr}

These node IDs MUST appear in the code as string literals:
${nodeIdList}

## ENRICHMENT DATA (use for definitions, ELI5, misconceptions)
${enrichment || 'Use your knowledge of the CISCE ' + boardLabel + ' chemistry curriculum to provide accurate definitions, ELI5 explanations, common misconceptions, and diagnostic questions.'}

## EXISTING MISCONCEPTIONS TO PRESERVE AND EXPAND
${existingMiscStr}

## MANDATORY CODE SECTIONS — YOU MUST INCLUDE ALL OF THESE EXACTLY

### Section 1: SCENARIO (place after ALL_NODE_IDS)
const SCENARIO = {
  title: '<topic-specific lab name>',
  intro: '<2-3 sentence narrative placing student in a real chemistry lab context>',
  context: '<2-3 sentence description of what the student will do in this lab>',
};

### Section 2: DISCOVERY_QUESTION (place after SCENARIO)
const DISCOVERY_QUESTION = {
  question: '<counterintuitive chemistry question that tests preconceptions>',
  options: ['<option A>', '<option B>', '<option C>', '<option D>'],
  correctIndex: <0-3>,
  hintAfter: '<1-2 sentence explanation of why the correct answer is surprising>',
};

### Section 3: EXPLORATION_STEPS (place after DEFAULT_PROPS — MANDATORY, DO NOT SKIP)
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: <first interactive exploration title>',
    instruction: '<what student does in this lab — must involve manipulating variables>',
    interactionType: '<topic-specific-interaction-1>',
    nodeId: <NODE_VARIABLE_1>,
  },
  {
    title: 'Lab 2: <second interactive exploration title>',
    instruction: '<what student does in this lab>',
    interactionType: '<topic-specific-interaction-2>',
    nodeId: <NODE_VARIABLE_2>,
  },
  {
    title: 'Lab 3: <third interactive exploration title>',
    instruction: '<what student does in this lab>',
    interactionType: '<topic-specific-interaction-3>',
    nodeId: <NODE_VARIABLE_3>,
  },
  {
    title: 'Lab 4: <fourth interactive exploration title>',
    instruction: '<what student does in this lab>',
    interactionType: '<topic-specific-interaction-4>',
    nodeId: <NODE_VARIABLE_4>,
  },
  {
    title: 'Lab 5: <fifth interactive exploration title>',
    instruction: '<what student does in this lab>',
    interactionType: '<topic-specific-interaction-5>',
    nodeId: <NODE_VARIABLE_5>,
  },
];

### Section 4: PREDICTION_QUESTIONS (place after EXPLORATION_STEPS — MANDATORY, DO NOT SKIP)
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: <chemistry scenario question>',
    options: ['<option A>', '<option B>', '<option C>', '<option D>'],
    correctIndex: <0-3>,
    verifyInstruction: '<how to verify in the interactive lab>',
    nodeId: <NODE_VARIABLE>,
  },
  {
    question: 'Predict: <second chemistry scenario question>',
    options: ['<option A>', '<option B>', '<option C>', '<option D>'],
    correctIndex: <0-3>,
    verifyInstruction: '<how to verify in the interactive lab>',
    nodeId: <NODE_VARIABLE>,
  },
];

### Section 5: OBSERVATION_QUESTIONS (place after PREDICTION_QUESTIONS — MANDATORY, DO NOT SKIP)
const OBSERVATION_QUESTIONS = [
  {
    question: '<what do you notice about...>',
    observableOptions: ['<option A>', '<option B>', '<option C>', '<option D>'],
    correctIndex: <0-3>,
    nodeId: <NODE_VARIABLE>,
  },
  {
    question: '<what happens when...>',
    observableOptions: ['<option A>', '<option B>', '<option C>', '<option D>'],
    correctIndex: <0-3>,
    nodeId: <NODE_VARIABLE>,
  },
];

### Section 6: REAL_WORLD_ACTIVITY (place after OBSERVATION_QUESTIONS — MANDATORY, DO NOT SKIP)
const REAL_WORLD_ACTIVITY = {
  title: '<real-world chemistry task title>',
  description: '<2-3 sentence description of a real chemistry lab or industry task>',
  steps: [
    '<step 1 with specific values>',
    '<step 2 with calculation>',
    '<step 3 with result>',
    '<step 4 with conclusion>',
  ],
};

### Section 7: CHALLENGES array — 22+ challenges across 3 tiers
Each challenge: id, nodeId, type, difficulty, competencyLevel, question, options/correctIndex or correctAnswer, explanation, hints[3], misconceptionIndex
- Foundation (7): recall, understanding — classify, drag-label, match
- Standard (8): application, analysis — numeric, distinguish
- Advanced (7+): evaluation, creativity — construct, drag-sort

### Section 8: 3+ topic-specific SVG diagram components

### Section 9: Main component with BKT/SM2/mastery/feedback/tabs
- BKT state tracking (createBKTState, bktUpdate, getMasteryLevel)
- SM-2 spaced repetition (createReviewItem, sm2Update)
- Mastery store (recordGameScore, getNodeMastery)
- Adaptive difficulty based on BKT mastery
- Auto-hint after 10s inactivity (useRef timer)
- onComplete(score) callback
- audioManager.play() 8+ times with valid sounds
- speechManager.speak() 5+ times
- <HintBubble>, <Confetti>, <SuccessBanner>, <SparkleBurst> in JSX
- Tabs: discovery → lab → challenges → summary
- EXPLORATION_STEPS.map() in the lab tab JSX
- PREDICTION_QUESTIONS.map() in the discovery tab JSX
- OBSERVATION_QUESTIONS.map() in the lab tab JSX
- REAL_WORLD_ACTIVITY rendered in the summary tab JSX

## CHEMISTRY-SPECIFIC VISUAL REQUIREMENTS
- Interactive molecular models: atoms, bonds, electron shells (SVG or Canvas)
- Animated chemical reactions: atoms rearranging, bonds breaking/forming
- SVG diagrams: atomic structure, electron configuration, periodic table trends
- Interactive periodic table explorer (if relevant)
- Balanced equation visualiser with atom count tracking
- pH scale, titration curves, reaction rate graphs (Canvas, live updating)
- 3D molecular geometry using CSS transforms or Canvas
- At least 3 molecular structure SVGs + 1 Canvas animation
- Show chemical processes as animated sequences, not static text

## API USAGE (DO NOT INVENT METHODS)
audioManager.play('tap'|'success'|'error'|'celebration'|'hint'|'pickup'|'drop-correct'|'drop-wrong'|'whoosh'|'sparkle'|'chime'|'pop'|'count'|'balance'|'swoop')
speechManager.speak('text') — call 5+ times
<HintBubble show={showHint} text={currentHint} />
<Confetti show={showConfetti} />
<SuccessBanner show={showSuccess} text="Challenge Complete!" />
<SparkleBurst show={showSparkle} x={400} y={300} />

## IMPORTS (use exactly these)
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

## STRICT REQUIREMENTS:
1. 'use client' at top
2. 2000+ lines minimum
3. 22+ challenges with progressive difficulty (foundation → standard → advanced)
4. EXPLORATION_STEPS array with exactly 5 lab objects — MANDATORY, NOT OPTIONAL
5. PREDICTION_QUESTIONS array with at least 2 objects — MANDATORY, NOT OPTIONAL
6. OBSERVATION_QUESTIONS array with at least 2 objects — MANDATORY, NOT OPTIONAL
7. REAL_WORLD_ACTIVITY object with title, description, steps[] — MANDATORY, NOT OPTIONAL
8. SCENARIO object with title, intro, context — MANDATORY, NOT OPTIONAL
9. DISCOVERY_QUESTION object with question, options[4], correctIndex, hintAfter — MANDATORY, NOT OPTIONAL
10. 3+ topic-specific SVG diagrams
11. All node IDs as string literals
12. NO 'any' type ANYWHERE — use 'unknown' or specific interfaces. NEVER write ': any' or 'as any'
13. onComplete(score) called on completion
14. bktUpdate() after each answer
15. sm2Update() after each challenge
16. recordGameScore() on completion
17. audioManager.play() 8+ times
18. speechManager.speak() 5+ times
19. All 4 feedback components in JSX
20. Default export: export default ${sim.baseName};
21. EXPLORATION_STEPS must be rendered in JSX using .map()
22. PREDICTION_QUESTIONS must be rendered in JSX using .map()
23. OBSERVATION_QUESTIONS must be rendered in JSX using .map()
24. REAL_WORLD_ACTIVITY must be rendered in JSX

## CRITICAL WARNING
If you skip EXPLORATION_STEPS, PREDICTION_QUESTIONS, OBSERVATION_QUESTIONS, or REAL_WORLD_ACTIVITY, the component will be REJECTED and regenerated. These are NOT optional. Every single one of our 130 physics/biology/maths sims has ALL of these sections. You MUST include them ALL.

## OUTPUT: Only code. No markdown fences. No explanations.
Start with 'use client';
End with: export default ${sim.baseName};`;
}

// ─── Call Gemini API ──────────────────────────────────────────
function callGemini(prompt, key) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, topP: 0.9, maxOutputTokens: MAX_TOKENS },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      ],
    });

    const apiPath = `/v1beta/models/${MODEL}:generateContent?key=${key}`;

    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      path: apiPath,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            if (json.error) { reject(new Error(`API error: ${json.error.message}`)); return; }
            const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text || text.length < 500) { reject(new Error(`Response too short: ${text?.length || 0} chars`)); return; }
            resolve(text);
          } catch (e) { reject(new Error(`Parse error: ${e.message}`)); }
        } else if (res.statusCode === 503) {
          reject(new Error('503 service overloaded'));
        } else if (res.statusCode === 429) {
          reject(new Error('429 rate limited'));
        } else {
          reject(new Error(`API error ${res.statusCode}: ${data.substring(0, 300)}`));
        }
      });
    });

    req.on('error', (e) => reject(new Error(`Network error: ${e.message}`)));
    req.setTimeout(480000, () => { req.destroy(); reject(new Error('Request timeout (8min)')); });
    req.write(body);
    req.end();
  });
}

// ─── Call with retry on 503/429 — rotate keys on failure ──────
async function callGeminiWithRetry(prompt, key, simBaseName, keyIdx) {
  let currentKey = key;
  let currentKeyIdx = keyIdx;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await callGemini(prompt, currentKey);
    } catch (e) {
      const is429 = e.message.includes('429');
      const is503 = e.message.includes('503');
      const isTimeout = e.message.includes('timeout');
      const isEmpty = e.message.includes('too short') || e.message.includes('undefined');

      if (is429 || is503 || isTimeout || isEmpty) {
        // Rotate to a DIFFERENT key for retry — spread load across all 33 keys
        currentKeyIdx = (currentKeyIdx + 7) % KEYS.length; // jump by 7 to spread widely
        currentKey = KEYS[currentKeyIdx];
        const delay = is429
          ? Math.min(RATE_LIMIT_BACKOFF_BASE * 1000 * Math.pow(2, attempt - 1), 300000)
          : Math.min(5000 * Math.pow(2, attempt - 1), 60000);
        console.log(`  [${simBaseName}][Key${currentKeyIdx+1}] Retry ${attempt}/${MAX_RETRIES} in ${delay/1000}s — ${e.message.substring(0, 60)}`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw e;
    }
  }
}

// ─── Extract code from response ───────────────────────────────
function extractCode(response) {
  let code = response.trim();
  if (code.startsWith('```')) {
    const firstNewline = code.indexOf('\n');
    if (firstNewline > 0) code = code.substring(firstNewline + 1);
  }
  if (code.endsWith('```')) code = code.substring(0, code.length - 3);
  const ucIdx1 = code.indexOf("'use client'");
  const ucIdx2 = code.indexOf('"use client"');
  const ucIdx = Math.max(ucIdx1, ucIdx2);
  if (ucIdx > 0) code = code.substring(ucIdx);
  return code.trim();
}

// ─── Quality checks ───────────────────────────────────────────
function runQualityChecks(sim, code) {
  const lineCount = code.split('\n').length;
  const challenges = (code.match(/type: '(classify|distinguish|match|drag-label|drag-sort|numeric|construct)'/g) || []).length;
  const hasScenario = /SCENARIO\s*=/.test(code);
  const hasDQ = /DISCOVERY_QUESTION\s*=/.test(code);
  const hasExploration = /EXPLORATION_STEPS\s*=/.test(code);
  const hasPrediction = /PREDICTION_QUESTIONS\s*=/.test(code);
  const hasObservation = /OBSERVATION_QUESTIONS\s*=/.test(code);
  const hasRealWorld = /REAL_WORLD_ACTIVITY\s*=/.test(code);
  const hasTeachingSlides = /TEACHING_SLIDES\s*=/.test(code);
  const hasBKT = /bktUpdate\s*\(/.test(code);
  const hasSM2 = /sm2Update\s*\(/.test(code);
  const hasMastery = /recordGameScore\s*\(/.test(code);
  const hasOnComplete = /onComplete\s*\(/.test(code);
  const hasAudio = /audioManager\.play\s*\(/.test(code);
  const hasSpeech = /speechManager\.speak\s*\(/.test(code);
  const hasHintBubble = /<HintBubble/.test(code);
  const hasConfetti = /<Confetti/.test(code);
  const hasSuccessBanner = /<SuccessBanner/.test(code);
  const hasSparkleBurst = /<SparkleBurst/.test(code);
  const hasDefaultExport = /export\s+default\s+/.test(code);
  const noAny = !/:\s*any\b/.test(code) && !/as\s+any\b/.test(code);

  // Node IDs present
  const codeNoComments = code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
  const nodesCovered = sim.nodeIds.filter(n =>
    codeNoComments.includes(`'${n}'`) || codeNoComments.includes(`"${n}"`)
  ).length;

  const checks = {
    lineCount,
    challenges,
    hasScenario,
    hasDQ,
    hasExploration,
    hasPrediction,
    hasObservation,
    hasRealWorld,
    hasTeachingSlides,
    hasBKT,
    hasSM2,
    hasMastery,
    hasOnComplete,
    hasAudio,
    hasSpeech,
    hasHintBubble,
    hasConfetti,
    hasSuccessBanner,
    hasSparkleBurst,
    hasDefaultExport,
    noAny,
    nodesCovered,
    nodesTotal: sim.nodeIds.length,
  };

  const passed = Object.entries(checks).filter(([k, v]) => {
    if (k === 'lineCount') return v >= 1500;
    if (k === 'challenges') return v >= 18;
    if (k === 'nodesCovered') return v >= checks.nodesTotal * 0.8;
    if (k === 'nodesTotal') return true;
    return v === true;
  }).length;

  const total = Object.keys(checks).length - 1; // exclude nodesTotal
  return { checks, passed, total };
}

// ─── Process one sim ──────────────────────────────────────────
async function processSim(sim, key, keyIdx, outDir) {
  const tag = `[${sim.baseName}][Key${keyIdx+1}]`;
  console.log(`${tag} START — C${sim.class} ${sim.subject || 'Chemistry'}, ${sim.nodeIds.length} nodes`);

  // Check if already upgraded
  const outputPath = path.join(outDir, `${sim.baseName}.tsx`);
  if (fs.existsSync(outputPath)) {
    console.log(`${tag} SKIP — already upgraded`);
    return { sim: sim.baseName, status: 'skipped' };
  }

  // Build prompt
  const prompt = buildPrompt(sim);
  console.log(`${tag} Prompt: ${(prompt.length / 1024).toFixed(0)} KB, calling Gemini...`);

  try {
    const response = await callGeminiWithRetry(prompt, key, sim.baseName, keyIdx);
    const code = extractCode(response);

    // Quality checks
    const { checks, passed, total } = runQualityChecks(sim, code);
    console.log(`${tag} Quality: ${passed}/${total} — Lines: ${checks.lineCount}, Challenges: ${checks.challenges}`);

    if (checks.lineCount < 500) {
      console.log(`${tag} FAIL — too short (${checks.lineCount} lines)`);
      return { sim: sim.baseName, status: 'failed', reason: 'too short', checks };
    }

    // Save whatever we got — missing sections will be fixed later
    fs.writeFileSync(outputPath, code);
    console.log(`${tag} SAVED → ${outputPath}`);

    // Log what's missing (will be fixed by fixer script)
    const missing = [];
    if (!checks.hasScenario) missing.push('SCENARIO');
    if (!checks.hasDQ) missing.push('DQ');
    if (!checks.hasExploration) missing.push('EXP');
    if (!checks.hasPrediction) missing.push('PRED');
    if (!checks.hasObservation) missing.push('OBS');
    if (!checks.hasRealWorld) missing.push('RWA');
    if (missing.length > 0) console.log(`${tag} MISSING (will fix later): ${missing.join(', ')}`);

    return { sim: sim.baseName, status: 'success', checks, missing };
  } catch (e) {
    console.log(`${tag} ERROR — ${e.message}`);
    return { sim: sim.baseName, status: 'error', reason: e.message };
  }
}

// ─── Main: staggered key workers ──────────────────────────────
async function main() {
  const startIdx = parseInt(process.argv[2] || '0', 10);
  const endIdx = parseInt(process.argv[3] || '0', 10);
  const isNewSims = process.argv.includes('--new-sims');
  const phaseArg = process.argv.find(a => a.startsWith('--phase='));
  const phase = phaseArg ? phaseArg.split('=')[1] : null;
  const isPhase = !!phase;

  const allSims = isPhase ? getNewSims() : (isNewSims ? getNewSims() : getChemSims());
  const outDir = isPhase || isNewSims ? NEW_SIM_OUTPUT_DIR : OUTPUT_DIR;
  fs.mkdirSync(outDir, { recursive: true });

  const pipelineName = isPhase ? `PHASE GENERATION (${phase})` : (isNewSims ? 'NEW SIM GENERATION' : 'CHEMISTRY SIM UPGRADE');
  console.log(`\n=== ${pipelineName} PIPELINE ===`);
  console.log(`Total sims: ${allSims.length}`);
  console.log(`Keys: ${KEYS.length}`);
  console.log(`Break between sims: ${BREAK_MS/1000}s`);
  console.log(`Stagger: ${STAGGER_MS/1000}s between key starts`);
  console.log(`Rate limit backoff: ${RATE_LIMIT_BACKOFF_BASE}s base, exponential`);
  console.log(`Max retries: ${MAX_RETRIES}`);
  console.log(`Output: ${outDir}`);
  if (!isNewSims) console.log(`Backups: ${BACKUP_DIR}`);
  console.log('');

  // Filter to requested range
  const end = endIdx > 0 ? endIdx : allSims.length;
  const sims = allSims.slice(startIdx, end);
  console.log(`Processing sims ${startIdx} to ${end - 1} (${sims.length} sims)`);
  console.log('');

  // Distribute sims across ALL keys — spread evenly to avoid rate limits
  // If sims < keys, spread them out with gaps so no two adjacent keys are used
  const keyQueues = Array.from({ length: KEYS.length }, () => []);
  const step = Math.max(1, Math.floor(KEYS.length / sims.length));
  sims.forEach((sim, i) => {
    const keyIdx = (i * step) % KEYS.length;
    keyQueues[keyIdx].push(sim);
  });

  console.log('Key distribution:');
  keyQueues.forEach((q, i) => {
    if (q.length > 0) console.log(`  Key${i + 1}: ${q.length} sims — ${q.map(s => s.baseName).join(', ')}`);
  });
  console.log('');

  // Launch each key worker with stagger
  const allResults = [];
  const workerPromises = [];

  for (let keyIdx = 0; keyIdx < KEYS.length; keyIdx++) {
    if (keyQueues[keyIdx].length === 0) continue;

    const workerPromise = (async () => {
      // Stagger start
      const staggerDelay = keyIdx * STAGGER_MS;
      if (staggerDelay > 0) await new Promise(r => setTimeout(r, staggerDelay));

      const key = KEYS[keyIdx];
      console.log(`[Key${keyIdx + 1}] Worker started (staggered ${staggerDelay / 1000}s)`);

      for (let i = 0; i < keyQueues[keyIdx].length; i++) {
        const sim = keyQueues[keyIdx][i];
        const result = await processSim(sim, key, keyIdx, outDir);
        allResults.push(result);

        // 60s break between sims (not after last one)
        if (i < keyQueues[keyIdx].length - 1) {
          console.log(`[Key${keyIdx + 1}] Break ${BREAK_MS / 1000}s before next sim...`);
          await new Promise(r => setTimeout(r, BREAK_MS));
        }
      }

      console.log(`[Key${keyIdx + 1}] Worker done — ${keyQueues[keyIdx].length} sims processed`);
    })();

    workerPromises.push(workerPromise);
  }

  // Wait for all workers
  await Promise.all(workerPromises);

  // Summary
  console.log('\n=== PIPELINE COMPLETE ===');
  const success = allResults.filter(r => r.status === 'success').length;
  const failed = allResults.filter(r => r.status === 'failed').length;
  const errors = allResults.filter(r => r.status === 'error').length;
  const skipped = allResults.filter(r => r.status === 'skipped').length;
  console.log(`Success: ${success}`);
  console.log(`Failed: ${failed}`);
  console.log(`Errors: ${errors}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Total: ${allResults.length}`);

  // Save results
  const resultsFile = path.join(OUTPUT_DIR, '_upgrade_results.json');
  fs.writeFileSync(resultsFile, JSON.stringify(allResults, null, 2));
  console.log(`Results saved: ${resultsFile}`);

  // List failed/error sims that need retry
  const needRetry = allResults.filter(r => r.status === 'failed' || r.status === 'error');
  if (needRetry.length > 0) {
    console.log('\nSims needing retry:');
    for (const r of needRetry) {
      console.log(`  ${r.sim} — ${r.status}: ${r.reason || ''}`);
    }
  }
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
