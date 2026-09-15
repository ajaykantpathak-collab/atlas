// 10-worker async template generation — 1 template per call, 10 concurrent
// Usage: node scripts/gen-templates-parallel.js <batchStart> <batchEnd>
// Each "batch" = 10 templates generated in parallel
const fs = require('fs');
const https = require('https');

const API_KEY = 'sk-ant-opm-fHBMbyeWx8oBoWZj_iGi3zLbJ9bEVfpe';
const MODEL = 'claude-opus-5';
const MAX_TOKENS = 64000;
const CONCURRENCY = 10;

// All 51 templates in priority order (Tier 1 first)
const ALL_TEMPLATES = [
  // Tier 1 — Critical (16 templates)
  { name: 'ChemistryC10CompleteSim', file: 'components/simulations/c9_12/ChemistryC10CompleteSim.tsx', classBand: 'C9-12', subject: 'Chemistry', nodes: 'c10_chem_001 through c10_chem_080 (80 nodes)', teaches: 'The entire C10 Chemistry syllabus — periodic properties, bonding theories, acids/bases/salts, mole concept, gas laws, stoichiometry, electrolysis, metallurgy, and organic chemistry (hydrocarbons through carboxylic acids).', interactive: 'Periodic trends explorer; bond builder with electron dots; pH titration lab; mole calculator with stoichiometry; metal extraction simulator; organic molecule sketcher with IUPAC naming; electrolysis cell builder.', priority: 'Critical — 80 nodes, largest single gap' },
  { name: 'AccountsSim', file: 'components/simulations/c9_12/AccountsSim.tsx', classBand: 'C9-12', subject: 'Accounts', nodes: 'c11_acc_001 through c11_acc_074, c12_acc_001 through c12_acc_077 (151 nodes)', teaches: 'Complete double-entry bookkeeping system — journal, ledger, trial balance, subsidiary books, bank reconciliation, depreciation, bills of exchange, final accounts (trading/P&L/balance sheet), partnership accounts, company accounts, cash flow statements, and financial ratios.', interactive: 'Transaction-to-journal entry converter; ledger posting simulator; trial balance generator; BRS builder; depreciation calculator (SLM/WDV); final accounts preparer; ratio analyser.', priority: 'Critical — 151 nodes, zero template coverage' },
  { name: 'ComputerProgSim', file: 'components/simulations/c9_12/ComputerProgSim.tsx', classBand: 'C9-12', subject: 'Computer Science', nodes: 'c6_cs through c12_cs (~200 nodes across C6-C12)', teaches: 'Complete computer science curriculum from C6 to C12 — algorithms, flowcharts, programming (Java), data structures, DBMS, networking, web technologies, software engineering, and emerging technologies.', interactive: 'Code editor with Java syntax; algorithm visualizer; data structure animator; SQL query runner; network topology builder; sorting algorithm comparison; project scaffold generator.', priority: 'Critical — ~200 nodes, zero C11-12 coverage' },
  { name: 'C11_C12_PhysicsAdvancedSim', file: 'components/simulations/c9_12/C11_C12_PhysicsAdvancedSim.tsx', classBand: 'C9-12', subject: 'Physics', nodes: 'c11_phy and c12_phy (~170 nodes)', teaches: 'Advanced physics for C11-C12 covering rotational motion, gravitation, elasticity, fluid mechanics, thermal properties, thermodynamics, kinetic theory, SHM, wave motion, electrostatics, EMI, AC circuits, EM waves, optics, modern physics, nuclear physics, semiconductors, and communication systems.', interactive: 'Rotational dynamics simulator; gravitation field mapper; thermodynamic cycle animator; SHM energy visualiser; EMI demonstrator; semiconductor device tester; communication system flow diagram.', priority: 'Critical — ~170 nodes' },
  { name: 'BiologyC9_12_AdvancedSim', file: 'components/simulations/c9_12/BiologyC9_12_AdvancedSim.tsx', classBand: 'C9-12', subject: 'Biology', nodes: 'c9_bio through c12_bio (~170 nodes)', teaches: 'Complete secondary biology — cell biology, tissues, classification, plant physiology, human physiology, genetics, evolution, biotechnology, reproduction, molecular biology, immunology, ecology, and environmental biology.', interactive: 'Cell biology lab; genetic cross simulator; plant physiology monitor; human body system explorer; ecology niche mapper; evolution timeline; biotechnology tool box.', priority: 'Critical — ~170 nodes' },
  { name: 'PoliticalScienceSim', file: 'components/simulations/c9_12/PoliticalScienceSim.tsx', classBand: 'C9-12', subject: 'Political Science', nodes: 'c11_pol_001 through c11_pol_028, c12_pol_001 through c12_pol_032 (60 nodes)', teaches: 'State, government, constitutions, democracy, rights, governance, Indian political system, comparative government, and contemporary political issues.', interactive: 'Constitution builder; government structure explorer; rights and duties matcher; comparative government analyser; political ideology position mapper.', priority: 'Critical — 60 nodes, zero coverage' },
  { name: 'SociologySim', file: 'components/simulations/c9_12/SociologySim.tsx', classBand: 'C9-12', subject: 'Sociology', nodes: 'c11_soc_001 through c11_soc_030, c12_soc_001 through c12_soc_030 (65 nodes)', teaches: 'Society, culture, social groups, stratification (class/caste), social institutions (family, marriage, religion), social change, and Indian social structure from Comte to contemporary issues.', interactive: 'Society structure mapper; stratification pyramid builder; kinship diagram creator; social change timeline; caste vs class comparator; ethnographic observation simulator.', priority: 'Critical — 65 nodes, zero coverage' },
  { name: 'LegalStudiesSim', file: 'components/simulations/c9_12/LegalStudiesSim.tsx', classBand: 'C9-12', subject: 'Legal Studies', nodes: 'c11_legal_001 through c11_legal_030, c12_legal_001 through c12_legal_020 (50 nodes)', teaches: 'Legal systems, criminal/civil law, contracts, property law, family law, human rights, judiciary, ADR mechanisms, legal maxims, and the Indian constitutional framework.', interactive: 'Court hierarchy explorer; case scenario analyser; contract drafter; legal maxim matching game; rights and remedies lookup; ADR method selector.', priority: 'Critical — 50 nodes, ~10% coverage' },
  { name: 'ChemistryFoundationsSim', file: 'components/simulations/c6_8/ChemistryFoundationsSim.tsx', classBand: 'C6-8', subject: 'Chemistry', nodes: 'c6_chem_001 through c6_chem_019, c7_chem_001 through c7_chem_009, c8_chem_001 through c8_chem_005 (~40 nodes)', teaches: 'Matter composition, elements/compounds/mixtures, physical vs chemical changes, metals/non-metals, and the foundational language of chemistry (symbols, formulae).', interactive: 'Matter classifier; change detector (physical vs chemical); element/compound sorter; mixture separator lab; symbol-to-element matching game.', priority: 'Critical — prerequisite for all C9-12 chemistry' },
  { name: 'GeographyContentSim', file: 'components/simulations/c9_12/GeographyContentSim.tsx', classBand: 'C1-12', subject: 'Geography', nodes: 'c1_geo through c12_geo (~200 nodes across all classes)', teaches: 'Complete geography from neighbourhood awareness (C1) through physical geography (rocks, climate, landforms) to human geography (population, resources, agriculture, industries) and regional studies.', interactive: 'Globe explorer; map reader; landform identifier; climate data analyser; resource mapper; population pyramid builder; India regional study hub.', priority: 'Critical — highest cross-class span' },
  // Tier 1 continued
  { name: 'PhysicsForcesSim', file: 'components/simulations/c9_12/PhysicsForcesSim.tsx', classBand: 'C6-10', subject: 'Physics', nodes: 'c6_phy_013-016, c8_phy_011-017, c10_phy_001-003, c10_phy_009-013 (19 nodes)', teaches: 'Force as push/pull, types of forces, weight, pressure, work, energy, mechanical advantage, velocity ratio, efficiency, lever classes, and pulley systems.', interactive: 'Force vector builder; pressure calculator (P=F/A); lever class sorter with MA calculator; pulley system builder; machine efficiency lab.', priority: 'Critical — 19 nodes' },
  { name: 'PhysicsOpticsSim', file: 'components/simulations/c9_12/PhysicsOpticsSim.tsx', classBand: 'C7-10', subject: 'Physics', nodes: 'c7_phy_015-020, c8_phy_018-021, c9_phy_030-032, c10_phy_014-021 (21 nodes)', teaches: 'Reflection, refraction, spherical mirrors, lenses, dispersion, prism, EM spectrum, and scattering of light.', interactive: 'Ray diagram builder; lens formula calculator; prism dispersion lab; EM spectrum explorer; microscope/telescope simulator.', priority: 'Critical — 21 nodes' },
  { name: 'PhysicsElectricitySim', file: 'components/simulations/c9_12/PhysicsElectricitySim.tsx', classBand: 'C7-10', subject: 'Physics', nodes: 'c7_phy_028-031, c8_phy_032-035, c10_phy_028-034 (15 nodes)', teaches: 'Electric current, circuits, Ohms law, series/parallel combinations, electrical power, household wiring, safety devices, and electromagnetic effects.', interactive: 'Circuit simulator (series/parallel); Ohms law explorer; household wiring designer; fuse/circuit breaker tester; Oersted experiment simulator.', priority: 'Critical — 15 nodes' },
  { name: 'AtomicStructureSim', file: 'components/simulations/c6_8/AtomicStructureSim.tsx', classBand: 'C6-9', subject: 'Chemistry', nodes: 'c6_chem_009-012, c7_chem_010-012, c8_chem_005-009, c9_chem_025-029 (17 nodes)', teaches: 'Evolution of atomic models from Dalton to Bohr, subatomic particles, electronic configuration, valency, and the modern periodic table.', interactive: 'Atomic model builder (Dalton to Bohr); electron configurator; periodic table explorer with trends; valency calculator; isotope comparison tool.', priority: 'Critical — 17 nodes' },
  { name: 'ChemicalReactionsSim', file: 'components/simulations/c6_8/ChemicalReactionsSim.tsx', classBand: 'C6-9', subject: 'Chemistry', nodes: 'c6_chem_003-008, c7_chem_003-008, c7_chem_012-016, c8_chem_010-020, c9_chem_010-012, c9_chem_043-045 (32 nodes)', teaches: 'Chemical reaction types (combination, decomposition, displacement, double displacement), equation balancing, hydrogen preparation and properties, carbon compounds, and redox fundamentals.', interactive: 'Equation balancer with visual atom tracking; reaction type classifier; hydrogen lab simulator; carbon compound builder; redox reaction electron transfer visualizer.', priority: 'Critical — 32 nodes' },
  { name: 'BusinessStudiesSim', file: 'components/simulations/c9_12/BusinessStudiesSim.tsx', classBand: 'C9-12', subject: 'Business Studies', nodes: 'c11_bs_001 through c11_bs_035, c12_bs_001 through c12_bs_048 (83 nodes)', teaches: 'Business organisation forms, management principles (Taylor/Fayol), marketing mix, business finance, stock exchange, consumer protection, and modern business trends.', interactive: 'Business form selector; management principle applier; marketing mix designer; financial ratio calculator; consumer case resolver; stock market simulator.', priority: 'Critical — 83 nodes, ~2% coverage' },
  // Tier 1 final
  { name: 'HistoryIndiaSim', file: 'components/simulations/c9_12/HistoryIndiaSim.tsx', classBand: 'C6-12', subject: 'History & Civics', nodes: 'c6_histciv through c12_hist (~200 nodes)', teaches: 'Complete Indian and world history from ancient civilisations through medieval kingdoms, the freedom struggle, world wars, Cold War, decolonisation, and post-independence India.', interactive: 'Timeline builder; cause-effect chain mapper; historical figure role-play; map-based territorial change tracker; document analyser.', priority: 'Critical — ~200 nodes' },
  { name: 'HistoryCivicsSim', file: 'components/simulations/c6_8/HistoryCivicsSim.tsx', classBand: 'C6-10', subject: 'History & Civics', nodes: 'c6_histciv_001-065, c7_histciv_046-058, c8_histciv_057-070, c9_histciv_001-006, c10_histciv_001-021 (~80 nodes)', teaches: 'Indian Constitution, Parliament, President, Prime Minister, Supreme Court, fundamental rights, local self-government, and the working of Indian democracy.', interactive: 'Parliament simulator (bill passage); constitution explorer; election role-play; writ issuer; Panchayati Raj structure builder; emergency scenario handler.', priority: 'Critical — ~80 nodes' },
  { name: 'OrganicChemistryC10Sim', file: 'components/simulations/c9_12/OrganicChemistryC10Sim.tsx', classBand: 'C9-12', subject: 'Chemistry', nodes: 'c10_chem_065 through c10_chem_080 (16 nodes)', teaches: 'Organic chemistry for C10 — tetravalency, catenation, isomerism, homologous series, IUPAC nomenclature, and the preparation/properties of alkanes, alkenes, alkynes, ethanol, and acetic acid.', interactive: 'Molecular structure builder; IUPAC name generator; isomer matcher; homologous series explorer; reaction predictor for addition/substitution; functional group identifier.', priority: 'Critical — 16 nodes' },
  // Tier 2 — Important
  { name: 'WaterStudiesSimulation', file: 'components/simulations/c6_8/WaterStudiesSimulation.tsx', classBand: 'C1-5', subject: 'Chemistry, EVS', nodes: 'c1_chem_001-004, c2_chem_001-004, c3_chem_006-008, c5_chem_009, c7_chem_017-018, c8_chem_017-018 (16 nodes)', teaches: 'Complete water studies from sources and properties through conservation, purification, and hard/soft water.', interactive: 'Water source explorer; purification filter builder; hard vs soft water tester; water usage calculator; rainwater harvester designer.', priority: 'Important — 16 nodes' },
  { name: 'MatterPropertiesSimulation', file: 'components/simulations/c6_8/MatterPropertiesSimulation.tsx', classBand: 'C3-5', subject: 'Chemistry, Physics', nodes: 'c3_chem_001-008, c4_chem_001, c5_chem_001-008 (17 nodes)', teaches: 'States of matter (solid/liquid/gas), particle theory, interconversion of states, properties of materials, and basic separation methods.', interactive: 'Particle arrangement builder for each state; state change simulator with temperature control; separation technique lab; properties matcher game.', priority: 'Important — 17 nodes' },
  { name: 'AirBreathingSimulation', file: 'components/simulations/c6_8/AirBreathingSimulation.tsx', classBand: 'C4-7', subject: 'Chemistry, Biology', nodes: 'c4_chem_002-004, c5_chem_010-012, c6_chem_015-019, c7_chem_017-020 (15 nodes)', teaches: 'Composition of air, the process of breathing and respiration, carbon dioxide and oxygen cycles, and water as a universal solvent.', interactive: 'Air composition analyzer; breathing diagram builder; respiration equation balancer; gas exchange simulator; CO2/O2 cycle tracker.', priority: 'Important — 15 nodes' },
  { name: 'MaterialsSolutionsSimulation', file: 'components/simulations/c6_8/MaterialsSolutionsSimulation.tsx', classBand: 'C4-5', subject: 'Chemistry', nodes: 'c4_chem_005-010, c5_chem_006-008 (9 nodes)', teaches: 'Properties of materials, solubility, saturated/unsaturated solutions, and separation of mixtures.', interactive: 'Solubility tester with temperature control; separation method selector; solution concentration calculator; material property matcher.', priority: 'Important — 9 nodes' },
  { name: 'PhysicsHeatSim', file: 'components/simulations/c9_12/PhysicsHeatSim.tsx', classBand: 'C3-10', subject: 'Physics', nodes: 'c3_phy_003-006, c8_phy_022-024, c10_phy_035-036, c10_phy_007-008 (11 nodes)', teaches: 'Heat as energy, temperature, thermal expansion, calorimetry, specific heat capacity, latent heat, and change of state.', interactive: 'Temperature vs heat comparator; expansion calculator; calorimetry lab with mixing; latent heat phase change simulator; specific heat capacity measurer.', priority: 'Important — 11 nodes' },
  { name: 'PhysicsSoundSim', file: 'components/simulations/c9_12/PhysicsSoundSim.tsx', classBand: 'C5-10', subject: 'Physics', nodes: 'c5_phy_001-004, c6_phy_030-031, c7_phy_024-027, c8_phy_025-026, c10_phy_022-027 (18 nodes)', teaches: 'Sound production, propagation, loudness, pitch, quality (timbre), natural/forced vibrations, resonance, and echoes.', interactive: 'Sound wave visualizer; pitch-loudness lab; resonance demonstrator; echo distance calculator; musical instrument sound analyser.', priority: 'Important — 18 nodes' },
  { name: 'PhysicsNuclearSim', file: 'components/simulations/c9_12/PhysicsNuclearSim.tsx', classBand: 'C9-12', subject: 'Physics', nodes: 'c10_phy_037-042 (6 nodes)', teaches: 'Radioactivity, alpha/beta/gamma decay, uses and hazards of radioisotopes, nuclear fission and fusion.', interactive: 'Decay chain simulator; half-life calculator; fission vs fusion comparison; radioisotope application explorer; radiation safety lab.', priority: 'Important — 6 nodes' },
  { name: 'PhysicsElectrostaticsSim', file: 'components/simulations/c9_12/PhysicsElectrostaticsSim.tsx', classBand: 'C9-12', subject: 'Physics', nodes: 'c10_phy_042, c11_phy_003-004, c11_phy_006-007, c11_phy_009-013, c11_phy_015 (11 nodes)', teaches: 'Coulombs law, electric field, electric potential, equipotential surfaces, and electrostatic energy.', interactive: 'Coulombs law force calculator; electric field line mapper; potential surface explorer; dipole torque simulator; Gauss law demonstrator.', priority: 'Important — 11 nodes' },
  { name: 'PhysicsC8FoundationsSim', file: 'components/simulations/c6_8/PhysicsC8FoundationsSim.tsx', classBand: 'C6-8', subject: 'Physics', nodes: 'c8_phy_001-009, c8_phy_020-021, c8_phy_027-031 (14 nodes)', teaches: 'State interconversion, density measurement, dispersion, and static electricity.', interactive: 'State change lab with particle animation; density measurement tool; static electricity generator; electroscope interaction; lightning conductor simulator.', priority: 'Important — 14 nodes' },
  { name: 'BiologyHumanPhysioSim', file: 'components/simulations/c9_12/BiologyHumanPhysioSim.tsx', classBand: 'C9-12', subject: 'Biology', nodes: 'c10_bio_005-016, c10_bio_030-031, c11_bio_069-070, c12_bio_058 (17 nodes)', teaches: 'Detailed human physiology including digestion, respiration, circulation, excretion, nervous system, endocrine system, and plant physiology.', interactive: 'Organ system navigator; physiological process simulator; hormone level regulator; enzyme inhibition lab; vitamin deficiency identifier.', priority: 'Important — 17 nodes' },
  { name: 'BiologyEcologySim', file: 'components/simulations/c9_12/BiologyEcologySim.tsx', classBand: 'C9-12', subject: 'Biology, EVS', nodes: 'c11_bio_068-070, c12_bio_059-071 (15 nodes)', teaches: 'Ecological principles including limiting factors, amphibolic pathways, enzyme inhibition, Hardy-Weinberg equilibrium, gene technology, population models, succession, biodiversity.', interactive: 'Ecosystem simulator; population growth grapher; succession stage builder; biodiversity hotspot mapper; microbial application explorer; gene therapy pathway designer.', priority: 'Important — 15 nodes' },
  { name: 'BiologyPlantSim', file: 'components/simulations/c9_12/BiologyPlantSim.tsx', classBand: 'C9-12', subject: 'Biology', nodes: 'c10_bio_005-009, c11_bio_042-045, c12_bio_065 (10 nodes)', teaches: 'Root absorption, ascent of sap, transpiration, photosynthesis (light/dark reactions), plant growth regulators, photoperiodism, seed formation and dispersal.', interactive: 'Root hair osmosis simulator; transpiration rate measurer; photosynthesis equation builder; plant hormone effect tester; seed dispersal mechanism explorer.', priority: 'Important — 10 nodes' },
  { name: 'MassMediaSim', file: 'components/simulations/c9_12/MassMediaSim.tsx', classBand: 'C9-12', subject: 'Mass Media', nodes: 'c11_massmedia_001-025, c12_massmedia_001-028 (53 nodes)', teaches: 'Communication models, journalism ethics, news values, reporting techniques, radio/TV programming, film studies, camera work, public relations, social media.', interactive: 'News story builder; camera angle simulator; radio script writer; PR campaign designer; social media impact analyser; ethical dilemma resolver.', priority: 'Important — 53 nodes' },
  { name: 'HomeScienceSim', file: 'components/simulations/c9_12/HomeScienceSim.tsx', classBand: 'C9-12', subject: 'Home Science', nodes: 'c11_home_001-034, c12_home_001-032 (66 nodes)', teaches: 'Food and nutrition, meal planning, resource management, child development, textile science, laundering methods, consumer protection, and adolescent health.', interactive: 'Meal planner with nutritional analysis; fabric identifier; stain removal simulator; developmental milestone tracker; budgeting tool; consumer rights advisor.', priority: 'Important — 66 nodes' },
  { name: 'PsychologySim', file: 'components/simulations/c9_12/PsychologySim.tsx', classBand: 'C9-12', subject: 'Psychology', nodes: 'c11_psy_001-037, c12_psy_001-041 (78 nodes)', teaches: 'Definition and schools of psychology, research methods, sensation/perception, learning theories, memory, thinking, motivation, emotion, intelligence, personality, development, stress, abnormal behaviour, psychotherapy, and social psychology.', interactive: 'Memory game; conditioning lab; personality type sorter; stress management simulator; intelligence test explorer; social influence experiment.', priority: 'Important — 78 nodes' },
  { name: 'BiotechnologySim', file: 'components/simulations/c9_12/BiotechnologySim.tsx', classBand: 'C9-12', subject: 'Biotechnology', nodes: 'c11_biotech_001-055, c12_biotech_001-055 (110 nodes)', teaches: 'rDNA technology, restriction enzymes, vectors, transformation, PCR, gene editing (CRISPR), GM crops, bioreactors, fermentation, bioinformatics, genomics, proteomics, and regulatory frameworks.', interactive: 'Restriction enzyme cutter; DNA ligase joiner; PCR thermal cycler; CRISPR gene editor; bioreactor designer; BLAST search simulator; phylogenetic tree builder.', priority: 'Important — 110 nodes' },
  { name: 'CommerceSim', file: 'components/simulations/c9_12/CommerceSim.tsx', classBand: 'C9-12', subject: 'Commerce', nodes: 'c11_comm_001-060, c12_comm_001-055 (115 nodes)', teaches: 'Business organisation, trade, aids to trade, e-commerce, warehousing, insurance, stock exchange, export/import procedures, and documents of trade.', interactive: 'Trade flow simulator; document generator; insurance policy designer; export-import procedure walkthrough; e-commerce platform builder.', priority: 'Important — 115 nodes' },
  { name: 'EconomicsAdvancedSim', file: 'components/simulations/c9_12/EconomicsAdvancedSim.tsx', classBand: 'C9-12', subject: 'Economics', nodes: 'c11_econ_031-080, c12_econ_001-091 (~120 nodes)', teaches: 'National income, money and banking, balance of payments, fiscal policy, public finance, income determination, international trade, and Indian economy post-liberalisation.', interactive: 'National income calculator; money multiplier simulator; budget preparer; BOP statement builder; elasticity analyser; market equilibrium grapher.', priority: 'Important — ~120 nodes' },
  { name: 'GeographySkillsSim', file: 'components/simulations/c9_12/GeographySkillsSim.tsx', classBand: 'C6-12', subject: 'Geography', nodes: 'c6_geo_001-005, c7_geo_001-003, c8_geo_001-007, c10_geo_001-003, c11_geo_001-003, c11_geo_025 (22 nodes)', teaches: 'Map reading, topographical map interpretation, scale, direction, geographical skills, and spatial analysis.', interactive: 'Interactive map reader; topo map interpreter; scale converter; direction finder; landform identifier from contours; GIS data explorer.', priority: 'Important — 22 nodes' },
  { name: 'EnvironmentalScienceSim', file: 'components/simulations/c9_12/EnvironmentalScienceSim.tsx', classBand: 'C1-12', subject: 'EVS', nodes: 'c1_evs through c12_evs (~157 nodes)', teaches: 'Complete environmental science from personal hygiene and surroundings through ecosystems, biodiversity, pollution, climate change, sustainable development, and environmental policy.', interactive: 'Ecosystem simulator; pollution tracker; carbon footprint calculator; biodiversity mapper; climate change impact explorer; sustainability action planner.', priority: 'Important — ~157 nodes' },
  { name: 'AppliedMathematicsSim', file: 'components/simulations/c9_12/AppliedMathematicsSim.tsx', classBand: 'C9-12', subject: 'Applied Mathematics', nodes: 'c11_appmath_001-074, c12_appmath_001-068 (143 nodes)', teaches: 'Applied mathematics including advanced calculus applications in commerce, financial mathematics (annuities, EMI, NPV), index numbers, moving averages, linear programming, probability distributions, and differential equations with business applications.', interactive: 'EMI calculator; NPV analyser; LP graphical solver; distribution grapher; index number builder; moving average plotter; break-even point finder.', priority: 'Important — 143 nodes' },
  { name: 'PhysicsC9_MiscSim', file: 'components/simulations/c9_12/PhysicsC9_MiscSim.tsx', classBand: 'C9-12', subject: 'Physics', nodes: 'c9_phy_003-004, c9_phy_010-011, c9_phy_033-037, c9_phy_042-044 (12 nodes)', teaches: 'Vernier callipers, screw gauge, distance-time/velocity-time graphs, equations of motion, wave nature of sound, infrasonic/sonic/ultrasonic frequencies, electric circuits, induced magnetism, and Earths magnetic field.', interactive: 'Vernier calliper simulator; v-t graph analyser; wave frequency explorer; circuit diagram builder; magnetic field line mapper; neutral point finder.', priority: 'Important — 12 nodes' },
  { name: 'C11_ChemistryTopicsSim', file: 'components/simulations/c9_12/C11_ChemistryTopicsSim.tsx', classBand: 'C9-12', subject: 'Chemistry', nodes: 'c11_chem_001-010, c11_chem_062-092 (~40 nodes)', teaches: 'C11 chemistry topics not fully covered by existing templates: importance/scope of chemistry, laws of chemical combination, atomic/molecular masses, stoichiometry, redox mechanisms, organic reaction mechanisms (SN1/SN2, E1/E2), aromatic chemistry.', interactive: 'Reaction mechanism builder; hybridisation visualiser; aromatic substitution predictor; redox equation balancer; organic synthesis pathway designer.', priority: 'Important — ~40 nodes' },
  { name: 'C12_ChemistryTopicsSim', file: 'components/simulations/c9_12/C12_ChemistryTopicsSim.tsx', classBand: 'C9-12', subject: 'Chemistry', nodes: 'c12_chem_095-104 (10 nodes)', teaches: 'Advanced C12 chemistry topics: Soddy-Fajans laws, Hardy-Schulze rule, Kolbes electrolysis, haloform reaction, carbylamine reaction, Hoffmann bromamide degradation, Williamson ether synthesis, interhalogen compounds, zwitterions, and polymerisation mechanisms.', interactive: 'Reaction pathway designer; named reaction explorer; polymerisation mechanism builder; coordinate compound isomerism matcher; colloid stability tester.', priority: 'Important — 10 nodes' },
  { name: 'MathsC9_12_AdvancedSim', file: 'components/simulations/c9_12/MathsC9_12_AdvancedSim.tsx', classBand: 'C9-12', subject: 'Mathematics', nodes: 'c9_math_001-006, c9_math_023-027, c9_math_064-067, c10_math_003, c10_math_009-010, c10_math_015-018, c11_math_001-009, c11_math_086-109, c12_math_001-009, c12_math_095-105 (~75 nodes)', teaches: 'Advanced mathematics spanning C9-C12 — number systems, surds, logarithms, coordinate geometry, calculus (limits, derivatives, integrals), 3D geometry, vectors, differential equations, probability distributions, and mathematical reasoning.', interactive: 'Function grapher; derivative visualiser; integral area calculator; 3D geometry plotter; vector operation tool; probability distribution grapher; limit evaluator.', priority: 'Important — ~75 nodes' },
  { name: 'BiologyC6_8Sim', file: 'components/simulations/c6_8/BiologyC6_8Sim.tsx', classBand: 'C6-8', subject: 'Biology', nodes: 'c6_bio_001-027, c7_bio_002-026, c8_bio_003-026 (~78 nodes)', teaches: 'Middle school biology — leaf structure, plant/animal cells, tissues, classification, photosynthesis, respiration, human body systems, diseases, microbes, and adaptation.', interactive: 'Cell explorer; tissue identifier; organ system navigator; disease classifier; photosynthesis simulator; food web builder; adaptation matching game.', priority: 'Important — ~78 nodes' },
  // Tier 3 — Gap Fillers
  { name: 'PhysicsWorldSim', file: 'components/simulations/class1/PhysicsWorldSim.tsx', classBand: 'C1-5', subject: 'Physics', nodes: 'c1_phy_007-008, c2_phy_009-010, c5_phy_012 (4 nodes)', teaches: 'Students explore how the Sun creates seasons through Earths tilt, understand day-night cycle via Earths rotation, and master cardinal directions.', interactive: 'Drag Earth to orbit Sun and watch seasons change; rotate Earth to see day/night boundary; compass game for directions; shadow-length tracker.', priority: 'Gap Filler — 4 nodes' },
  { name: 'BiologyFoundationsSimulation', file: 'components/simulations/class1/BiologyFoundationsSimulation.tsx', classBand: 'C1-5', subject: 'Biology, EVS', nodes: 'c1_bio_002-009, c2_bio_001-008, c3_bio_001-005, c4_bio_001-002, c4_bio_017-018, c5_bio_007-009 (26 nodes)', teaches: 'Human body basics, sense organs, food and nutrition, health and hygiene, living vs non-living, and basic plant/animal biology.', interactive: 'Body part identifier; food group sorter; sense organ explorer; healthy habit builder; living things classifier; adaptation matching game.', priority: 'Gap Filler — 26 nodes' },
  { name: 'CommunicationStudiesSim', file: 'components/simulations/c9_12/CommunicationStudiesSim.tsx', classBand: 'C9-12', subject: 'Communication Studies', nodes: 'c9_commstud_001-046, c10_commstud_001-046, c9_commapp_001-042, c10_commapp_001-032 (88 nodes)', teaches: 'Communication process, business communication, marketing, advertising, sales promotion, consumer protection, accounting basics, HR management, PR, logistics.', interactive: 'Communication model builder; advertisement designer; sales pitch simulator; accounting entry recorder; logistics chain mapper; environmental impact assessor.', priority: 'Gap Filler — 88 nodes' },
  { name: 'CommerceApplicationsSim', file: 'components/simulations/c9_12/CommerceApplicationsSim.tsx', classBand: 'C9-12', subject: 'Commerce Applications', nodes: 'c9_commapp_001-042, c10_commapp_001-032 (74 nodes)', teaches: 'Commerce applications including marketing mix, accounting fundamentals, cost classification, HR management, training, PR, environmental issues, consumer education.', interactive: 'Marketing mix designer; cost classifier; training method selector; PR campaign planner; environmental impact calculator; consumer rights advisor.', priority: 'Gap Filler — 74 nodes' },
  { name: 'ComputerSkillsC1_5Sim', file: 'components/simulations/class1/ComputerSkillsC1_5Sim.tsx', classBand: 'C1-5', subject: 'Computer Science', nodes: 'c1_cs_001-010, c2_cs_001-012, c3_cs_001-015, c4_cs_001-018, c5_cs_001-020 (60 nodes)', teaches: 'Computer literacy from basics through hardware, software, file management, MS Office, internet, email safety, and introductory programming (Scratch, LOGO).', interactive: 'Computer part identifier; file manager simulator; Word/PowerPoint mini-apps; internet safety quiz; Scratch block sorter; LOGO turtle graphics runner.', priority: 'Important — 60 nodes' },
  { name: 'PhysicsC6_AdvancedSim', file: 'components/simulations/c6_8/PhysicsC6_AdvancedSim.tsx', classBand: 'C6-8', subject: 'Physics', nodes: 'c6_phy_006, c6_phy_010, c6_phy_030, c6_phy_031 (4 nodes)', teaches: 'Measurement of area, periodic motion classification, loudness-pitch-frequency relationships, and sound amplitude measurement.', interactive: 'Area measurement tool; motion classifier; sound property explorer; frequency-pitch matching game.', priority: 'Gap Filler — 4 nodes' }
];

const SYSTEM_PROMPT = `You are a senior React/TypeScript engineer building interactive educational simulations for a CISCE learning platform. You generate ONE complete, compilable, production-ready simulation component.

## CRITICAL: ACTUAL API USAGE (DO NOT INVENT METHODS)

### audioManager — use .play() with VALID SoundEffect strings ONLY:
audioManager.play('tap')        // button taps, selections
audioManager.play('success')    // correct answer
audioManager.play('error')      // wrong answer
audioManager.play('celebration')// challenge complete
audioManager.play('hint')       // hint shown
audioManager.play('pickup')     // drag start
audioManager.play('drop-correct') // correct drop
audioManager.play('drop-wrong')   // wrong drop
audioManager.play('whoosh')     // transitions
audioManager.play('sparkle')    // sparkles
audioManager.play('chime')      // notifications
audioManager.play('pop')        // small interactions
audioManager.play('count')      // counting
audioManager.play('balance')    // balancing
audioManager.play('swoop')      // animations
// DO NOT use audioManager.playSuccess(), audioManager.playTick(), etc.
// DO NOT use optional chaining (?.) — call directly: audioManager.play('success')

### speechManager — use .speak() for spoken instructions and feedback:
speechManager.speak('Welcome to the chemistry lab! Let us explore the periodic table.')
speechManager.speak('Correct! The pH of this solution is 7.')
speechManager.speak('Not quite. Remember that acids have pH below 7.')
// Call speechManager.speak() at least 5 times: on welcome, on correct, on wrong, on hint, on complete

### HintBubble — use as a JSX component in the render:
<HintBubble show={showHint} text={currentHint} />
// Must appear in the JSX return, not just imported

### Confetti, SuccessBanner, SparkleBurst — use as JSX components:
<Confetti show={showConfetti} />
<SuccessBanner show={showSuccess} text="Challenge Complete!" />
<SparkleBurst show={showSparkle} x={400} y={300} />

## STRICT REQUIREMENTS — the template MUST satisfy ALL of these:

1. 'use client' directive at the very top
2. ONLY these imports allowed:
   - React: import React, { useState, useEffect, useRef, useCallback } from 'react'
   - framer-motion: import { motion, AnimatePresence } from 'framer-motion'
   - From '../../../lib/sim-engine': audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst
   - From '../../sim-primitives/Draggable': Draggable (if drag interaction needed)
3. NO other external libraries. NO three, planck, matter-js, pixi, katex, jsxgraph, howler.
4. Default export of the component.
5. Props interface accepting enrichment data:
   interface TemplateNameProps {
     nodeId?: string;
     title?: string;
     definition?: string;
     eli5?: string;
     misconceptions?: Array<{ belief: string; correction: string }>;
     diagnosticQuestions?: Array<{
       number: number; bloomLevel: string; question: string; answer: string;
       answerType?: 'number' | 'text' | 'mcq'; unit?: string; formula?: string;
       working?: string; options?: string[]; hint?: string;
     }>;
     masteryCriteria?: string;
     onComplete?: (score: number) => void;
   }
6. DEFAULT_PROPS object with rich, topic-specific content — at least 5 misconceptions and 8 diagnostic questions.
7. Minimum 800 lines of substantive code (not padding).
8. Detailed SVG visualization — topic-specific, NOT generic. Custom SVG components for the subject matter. Create SVG as separate functions: function PeriodicTableSVG() { return (<svg>...</svg>) }
9. At least 8 challenges with progressive difficulty, each with: question, answer, options (3-4 for MCQ), hint, misconception feedback.
10. Theory section with EXACTLY 5 teaching slides (TEACHING_SLIDES array with 5 entries). Each slide: { title, content, keyPoints }.
11. Adaptive difficulty: 'foundation' | 'standard' | 'advanced'.
12. localStorage persistence: save mastery score under key 'mastery_<nodeId>'.
13. Spaced repetition: show review badge if due.
14. Guided discovery: hints reveal incrementally.
15. Misconception feedback: when student answers wrong, show the SPECIFIC misconception from the data.
16. Real-world activity suggestion at the end.
17. onComplete callback: call onComplete(score) when all challenges done, score = max(0, 100 - errors*5).
18. Auto-hint after 10 seconds of inactivity using a useRef timer.
19. Progress tracking: show current challenge / total, score, errors.
20. TypeScript strict mode compatible — no 'any', no unused vars, no missing types.
21. audioManager.play() must be called at least 8 times with valid SoundEffect strings.
22. speechManager.speak() must be called at least 5 times.
23. <HintBubble> must appear in the JSX return.
24. <Confetti>, <SuccessBanner>, <SparkleBurst> must all appear in the JSX return.

## OUTPUT FORMAT
Output ONLY the code in a single code block. No explanations. Start with 'use client' and end with the default export.

\`\`\`tsx
[full code here]
\`\`\``;

function generateUserPrompt(template) {
  let existingNames = '';
  try {
    existingNames = fs.readFileSync('D:\\dream_app\\frontend\\all_templates_extracted.txt', 'utf8');
  } catch (e) {}

  let prompt = `Generate ONE complete simulation template. 800+ lines, compilable TypeScript/React.\n\n`;
  prompt += `## EXISTING TEMPLATES (do NOT duplicate — the template below is NEW):\n`;
  prompt += existingNames.substring(0, 6000) + '\n\n';
  prompt += `## TEMPLATE TO GENERATE (NEW — does not exist yet):\n\n`;
  prompt += `Name: ${template.name}\n`;
  prompt += `File path: ${template.file}\n`;
  prompt += `Class band: ${template.classBand}\n`;
  prompt += `Subject: ${template.subject}\n`;
  prompt += `Nodes covered: ${template.nodes}\n`;
  prompt += `What it teaches: ${template.teaches}\n`;
  prompt += `Key interactive elements: ${template.interactive}\n`;
  prompt += `Priority: ${template.priority}\n\n`;
  prompt += `Generate this ONE template now. Output only the code in a single tsx code block.`;
  return prompt;
}

function callOpus(template, workerId) {
  return new Promise((resolve, reject) => {
    const userPrompt = generateUserPrompt(template);
    const requestBody = JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }]
    });

    const start = Date.now();
    const options = {
      hostname: 'api.opusmax.pro',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'anthropic-version': '2023-06-01'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const elapsed = Math.round((Date.now() - start) / 1000);
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            resolve({ workerId, template, success: false, error: parsed.error, elapsed });
            return;
          }
          if (!parsed.content) {
            resolve({ workerId, template, success: false, error: 'No content', elapsed });
            return;
          }
          const text = parsed.content.filter(c => c.type === 'text').map(c => c.text).join('\n');
          resolve({ workerId, template, success: true, text, usage: parsed.usage, elapsed });
        } catch (e) {
          resolve({ workerId, template, success: false, error: e.message, elapsed });
        }
      });
    });

    req.on('error', (e) => resolve({ workerId, template, success: false, error: e.message, elapsed: 0 }));
    req.write(requestBody);
    req.end();
  });
}

function extractCode(text) {
  // Try ```tsx:FILE_PATH format first
  const match1 = text.match(/```tsx:[^\n]+\n([\s\S]*?)```/);
  if (match1) return match1[1];
  // Try ```tsx format
  const match2 = text.match(/```tsx\n([\s\S]*?)```/);
  if (match2) return match2[1];
  // Try without language tag
  const match3 = text.match(/```\n([\s\S]*?)```/);
  if (match3 && match3[1].includes('use client')) return match3[1];
  return null;
}

async function main() {
  const startIdx = parseInt(process.argv[2] || '0');
  const endIdx = parseInt(process.argv[3] || String(Math.min(ALL_TEMPLATES.length, CONCURRENCY)));

  let templates = ALL_TEMPLATES.slice(startIdx, endIdx);
  // Skip templates that already exist
  const before = templates.length;
  templates = templates.filter(t => {
    const fullPath = 'D:\\dream_app\\frontend\\' + t.file.replace(/\//g, '\\');
    if (fs.existsSync(fullPath)) {
      console.log(`SKIP (exists): ${t.name}`);
      return false;
    }
    return true;
  });
  console.log(`\n=== PARALLEL GENERATION ===`);
  console.log(`Templates: ${templates.length} (skipped ${before - templates.length} existing)`);
  console.log(`Concurrency: ${CONCURRENCY}`);
  if (templates.length > 0) {
    console.log(`Templates: ${templates.map(t => t.name).join(', ')}`);
    console.log(`\nFiring ${templates.length} workers simultaneously...\n`);
  } else {
    console.log('All templates already exist!');
    return;
  }

  const startTime = Date.now();
  const results = await Promise.all(templates.map((t, i) => callOpus(t, i + 1)));

  const totalElapsed = Math.round((Date.now() - startTime) / 1000);
  console.log(`\n=== ALL WORKERS COMPLETE (${totalElapsed}s) ===\n`);

  const savedFiles = [];
  let successCount = 0;
  let failCount = 0;

  results.forEach(r => {
    if (!r.success) {
      console.log(`Worker ${r.workerId} FAILED: ${r.name || r.template.name} - ${JSON.stringify(r.error)} (${r.elapsed}s)`);
      failCount++;
      return;
    }

    const code = extractCode(r.text);
    if (!code) {
      console.log(`Worker ${r.workerId} FAILED: ${r.template.name} - no code block found in response (${r.elapsed}s)`);
      // Save raw for debugging
      fs.writeFileSync(`D:\\dream_app\\frontend\\scripts\\raw_${r.template.name}.txt`, r.text, 'utf8');
      failCount++;
      return;
    }

    const fullPath = 'D:\\dream_app\\frontend\\' + r.template.file.replace(/\//g, '\\');
    try {
      // Ensure directory exists
      const dir = fullPath.substring(0, fullPath.lastIndexOf('\\'));
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(fullPath, code, 'utf8');
      const lineCount = code.split('\n').length;
      console.log(`Worker ${r.workerId} OK: ${r.template.name} - ${lineCount} lines, ${code.length} chars (${r.elapsed}s)`);
      savedFiles.push({ path: fullPath, lines: lineCount, name: r.template.name });
      successCount++;
    } catch (e) {
      console.log(`Worker ${r.workerId} FAILED: ${r.template.name} - save error: ${e.message}`);
      failCount++;
    }
  });

  console.log(`\n=== SUMMARY ===`);
  console.log(`Success: ${successCount}/${templates.length}`);
  console.log(`Failed: ${failCount}/${templates.length}`);
  console.log(`Total time: ${totalElapsed}s`);
  console.log(`\nSaved files:`);
  savedFiles.forEach(f => console.log(`  ${f.name}: ${f.lines} lines`));

  // Write summary JSON
  const summary = {
    startIdx, endIdx, totalElapsed, successCount, failCount,
    savedFiles: savedFiles.map(f => ({ name: f.name, path: f.path, lines: f.lines }))
  };
  fs.writeFileSync(`D:\\dream_app\\frontend\\scripts\\parallel_${startIdx}_${endIdx}_summary.json`, JSON.stringify(summary, null, 2));
  console.log(`\nSummary: scripts/parallel_${startIdx}_${endIdx}_summary.json`);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
