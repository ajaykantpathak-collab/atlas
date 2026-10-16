# SANDBOX_TAXONOMY.md — Which kind of sandbox each subject needs (classes 6-12)

> Research doc. Grounded in the corpus (c6-c12 subject groups), the ICSE/CBSE
> syllabus structure, and how each subject is actually taught and examined.
> Purpose: sandbox TYPE is a per-subject pedagogical decision, not a generic
> 3D scene. Every sandbox shares one engine skeleton (canvas, solver,
> misconception injection, class/topic picker, progress) but the INTERACTION
> MODEL differs by subject.

## The 8 sandbox engine types (build once each, content-pack per subject)

| # | Engine type | Core interaction | Teaches |
|---|---|---|---|
| E1 | **Parameter Lab** | Sliders/inputs → solver computes → live visual update; impossible states trigger misconception panel | How quantities relate; what breaks when you break laws |
| E2 | **Construction Workbench** | Place/connect/draw artifacts following rules → validity checked by solver | Procedures, structures, proofs, balanced forms |
| E3 | **Virtual Lab** (sequenced experiment) | Steps in order → observation recorded → conclusion drawn | Practical method: hypothesis, setup, observation, inference |
| E4 | **System Simulator** | Change one part → system evolves (time/state) → emergent outcome | Dynamics, feedback, cause-chains over time |
| E5 | **Geospatial Explorer** | Pan/zoom maps, place labels, read layers (topo/climate) | Locational reasoning, map literacy, regional patterns |
| E6 | **Timeline & Causal-Chain Explorer** | Events on a timeline; drag causes to effects; see chains branch | Chronology, cause-effect, historical reasoning |
| E7 | **Document & Ledger Workbench** | Fill/post/classify documents → arithmetic verified live | Recording, classification, compliance |
| E8 | **Code Runtime** | Write/arrange code → run → see output + trace | Programming logic, syntax, debugging |

## Subject-by-subject mapping (classes 6-12)

### 1. Mathematics (6-10 + 11-12 + Applied Maths 11-12)
- Engines: **E1 Parameter Lab** (primary) + **E2 Construction Workbench** (geometry) + E8-lite (patterns)
- 6-8: number line manipulative, fraction bars, ratio tables, integers on trajectories, algebra tiles, simple equations balance, geometry: angle sums/draggable vertices, perimeter/area with drag, symmetry/mirror, data: toss/dice empirical vs theoretical
- 9-10: coordinate plotter, Pythagoras/inequality drag, polynomial grapher, AP/GP dot-growth, trig unit-circle + heights-and-distances scene, statistics (ogive, mean-median-mode on live data), surface-area nets in 3D
- 11-12 + Applied: function grapher (domain/range live), trig wave composer, limits zoom-in, derivative-as-slope drag, integral-as-area, matrices multiply visualizer, LPP feasible-region with constraint sliders, ANOVA-lite/index-number data lab (Applied: FINANCE tabs — SI/CI/annuity sliders, EMI breakup)
- Solver wiring: maths2_families (62 rows) + applied_maths_families + symbolic_solver
- Misconception hooks: triangle inequality violation, LCM≠product traps, sign errors on integer ops, LPP infeasible regions

### 2. Physics (6-10 science + 11-12)
- Engines: **E1 Parameter Lab** + **E3 Virtual Lab** + **E4 System Simulator**
- 6-8: circuits workbench (cell/bulb/switch drag → live current), magnet field-line viewer, states-of-matter particle sim, measurement tools (vernier reading drill)
- 9-10: motion graphs (drag u,a,t → live s-t/v-t), force+friction on incline, pressure/depth, upthrust/Archimedes tank, light: ray-diagram mirrors/lenses (drag object along principal axis), sound wave (f/A sliders), current: Ohm's law + series/parallel + fuse rating, kWh bill lab
- 11-12: projectile lab 3D, SHM spring-pendulum, gravitation two-body, thermal expansion, kinetic-theory gas piston, wave superposition, electrostatics field lines, capacitor charging, ray optics bench, wave optics interference, photoelectric effect, semiconductor diode/boolean
- Solver wiring: physics_families.py (new) + stem_units_solver + symbolic_solver
- Misconception hooks: heavier-falls-faster, current-gets-used-up, mirror-inversion traps, heat-vs-temperature

### 3. Chemistry (6-10 science + 11-12)
- Engines: **E2 Construction Workbench** (equations) + **E3 Virtual Lab** + 3D **molecule/lattice viewer**
- 6-8: element/compound/mixture sorting, valency cross-over formula builder, equation balancer (drag coefficients), physical-vs-chemical change sorter, water/hardness lab, metal-reactivity ladder experiments
- 9-10: atom builder (2n² shells, isotopes), mole-conversion workbench (mass↔moles↔particles), gas-law piston, acid-base titration lab (colour-endpoint), electrolysis cell (anode/cathode products), alloy/allotrope comparators, organic families builder
- 11-12: 3D molecular shapes (VSEPR), orbital viewer, equilibrium shift slider (Le Chatelier), thermodynamics enthalpy lab, kinetics rate-vs-concentration, electrochemistry cell potential solver, organic reaction-mechanism maps
- Solver wiring: chemistry_families.py (new) + symbolic_solver (balancing)
- Misconception hooks: valency cross-over errors, H₂O = 2H+O counting, "heavier gas diffuses slower", oxidation=adding-oxygen-only

### 4. Biology (6-10 science + 11-12)
- Engines: **3D Organism/Cell Explorer** + **E3 Virtual Lab** + **E4 System Simulator** + genetics **E1-lite (Punnett workbench)**
- 6-7: cell/organelle explorer (plant vs animal toggle), classification sorter (five-kingdom drag), photosynthesis factor lab (light/CO₂/water sliders → rate), human body systems tour (excretory/nervous), plant transport (xylem/phloem petunia-balsam experiments)
- 9-10: cell division (mitosis/meiosis side-by-side), genetics Punnett workbench (mono/dihybrid, sex-linked), blood-groups inheritance, evaporation/transpiration lab, endocrine system map, population interactions matrix, ecosystem energy-flow (10% law)
- 11-12: biomolecule 3D viewer, enzyme kinetics slider, neural synapse animation, genetics+Hardy-Weinberg solver, biotech: recombinant-DNA assembly (restriction enzyme cutting), ECG/mendelian disorder explorer, ecology: population growth curves, biodiversity indices
- Solver wiring: biology_families.py (new)
- Misconception hooks: plant-food-from-soil-only, respiration-vs-photosynthesis conflation, dominant-always-common, evolution="improvement"

### 5. Biotechnology (11-12)
- Engines: **E3 Virtual Lab** + **E2 Construction Workbench**
- Recombinant DNA assembly bench (restriction enzymes → vector insertion → host transformation), PCR thermal-cycle simulator, bioreactor parameter lab, electrophoresis gel runner

### 6. Accountancy (11-12 + Commercial Studies accounts 9-10)
- Engine: **E7 Document & Ledger Workbench** + **E1 Parameter Lab** (depreciation/ratios)
- Journal workbench (transaction → debit/credit with golden-rules reasoning), ledger T-account posting → trial balance → final accounts assembler, depreciation SLM/WDV schedule lab, BRS two-direction reconciler, ratio analysis from statement line items, partnership division lab
- Solver wiring: accountancy_families.py (new)
- Misconception hooks: furniture-on-credit→purchases error, capital-vs-revenue expenditure, drawings treated as expense

### 7. Economics (9-12)
- Engines: **E1 Parameter Lab** + **E4 System Simulator** + **E7-lite data lab**
- 9-10: poverty/food-security data explorer, people-as-resource literacy labs, sectors-of-economy employment shift visualizer
- 11-12 Statistics: data collection/organisation lab, index numbers (Laspeyres/Paasche) builder, correlation scatter explorer
- 11-12 Micro: demand-supply 3D market (shift curves → live equilibrium), elasticity point explorer, cost-curve family, market-forms comparator
- 11-12 Macro: circular-flow 3D (households/firms/govt/foreign), national-income identity solver, money-multiplier chain, budget deficits lab, forex depreciation/appreciation
- Solver wiring: economics_families.py (new)
- Misconception hooks: GDP-vs-welfare conflation, demand-curve-slope ≠ elasticity, deficit-always-bad

### 8. Business Studies / Commerce (9-12)
- Engines: **E7 Document Workbench** + **E4 System Simulator** + case-lab
- Business documents flow (enquiry→quotation→order→invoice→delivery), department coordination simulator, marketing-mix lab (4P sliders), leadership-styles scenario player, insurance/transport document workbench, company-forms comparator
- Misconception hooks: advertising=only-marketing, insurance=investment

### 9. Geography (6-12)
- Engines: **E5 Geospatial Explorer** (primary) + **E1 Parameter Lab** (climate graphs) + **E6 Timeline** (landform evolution)
- 6-8: latitudes/longitudes globe, India physical-features map, continents/oceans explorer, landform-forge (tectonic interactions), energy-resources selector, Africa/Asia/Europe map labs (countries, rivers, climate), contour/toposheet reader (hill/valley/spur identification), rock cycle, monsoon animation, natural-regions explorer
- 9-10: Earth-structure cross-section, latitude-longitude time lab, pressure-belt winds, ocean currents map (warm/cold), volcanic/earthquake zones, natural-vegetation map, soil-types map
- Solver wiring: climate-graph computation (graph-type data lab), coordinate distance/rotation labs
- Misconception hooks: Sun-revolves-around-Earth, all-deserts-are-hot, monsoon="just rain"

### 10. History & Civics (6-12)
- Engines: **E6 Timeline & Causal-Chain Explorer** (primary) + civics **E4 System Simulator** + constitution **E2 Construction Workbench** (Preamble builder)
- 6-8: ancient civilisations timeline (Egypt/Harappa/Vedic), Mauryan/Gupta administration maps + chains, Jainism/Buddhism cause-chains, Delhi Sultanate/Mughal relays, Constitution: Preamble builder (drag descriptors), three-organs simulator (make/execute/enforce), DPSP-to-law converter, medieval kingdoms (Cholas, Mughals), freedom-chapters (1857, national movement)
- 9-12: religion movements (Bhakti/Sufi/unaffecting splits), modern Europe (Renaissance→Reformation→French Rev chains), Industrial Revolution cause-web, freedom-struggle timeline (1857→Gandhian era→Independence), world wars, UN organs simulator, judiciary/civic processes
- Solver wiring: causal-graph engine; dates/facts verified against corpus nodes (authored histories)
- Misconception hooks: "1857=only Sepoy Mutiny", colonial-drain oversimplification, Gandhi-invented-untouchability-abolition

### 11. English (Language + Literature, 6-12)
- Engines: **E8-adapted Language Gym** + **E2 Construction Workbench** (writing structures)
- Grammar gym: tense/voice/concession drills with instant diagnosis (authored wrong-answer clauses), sentence-assembly drag, error-spotting trainer
- Writing workbench: notice/e-mail/essay skeletons → live format checker (ICSE format marks), model-vs-weak comparison (the corpus's marked-up weak versions)
- Literature explorer: text-grounded quotation banks, character maps, theme-webs, reference-to-context trainer (RCT question generator from authored content)
- Misconception hooks: tense drift, indirect-speech backshift errors, "summary = shorten by deleting words"

### 12. Hindi (भाषा + साहित्य, 6-12)
- Engine: **E8-adapted भाषा सुधार कक्षा** (Language Gym, Devanagari UI) + writing workbench
- व्याकरण drills (संधि, समास, कारक, रस-अलंकार identification), मुहावरे trainer, पत्र-लेखन format checker, निबंध structure builder, पठन-बोध passages with authored Q-types
- Literature explorer for prescribed texts (पद-भेद, काव्य-सौंदर्य nodes)
- Misconception hooks: अनुस्वार/अनुनासिक errors, वचन mismatches, काल errors

### 13. Computer Applications / Computer Science (6-12)
- Engine: **E8 Code Runtime** (primary) + flowchart **E2 Workbench**
- Java runtime: write code → run → live output + variable-state trace tables; loop/conditional visualizers; error-clinic (compile vs runtime vs logical)
- 6-8: flowchart builder (drag symbols → execute), scratch-style algorithm runner
- 9-12: OOP concept visualizer (objects/classes live), BlueJ-style method tracing, data-structures step-through
- Misconception hooks: `=` vs `==`, integer division, infinite-loop detection, fall-through switch

### 14. Environmental Science (6-12)
- Engines: **E4 System Simulator** (primary) + **E5 Geospatial** + **E3 Virtual Lab**
- Ecosystem sim (remove a species → cascade), population-growth lab, resource-depletion accounts, pollution-dispersion map, climate-impact timeline, waste-segregation trainer, carbon-footprint calculator
- Misconception hooks: decomposition-is-instant, recycling-solves-everything

### 15. AI / Robotics (6-12)
- Engine: **E8 Code Runtime** + **E4 System Simulator**
- AI: training-data bias lab, decision-tree builder, chatbot-flow designer; Robotics: sensor-actuator wiring sim, loop-programming rover on a grid arena

### 16. Legal Studies / Political Science (11-12)
- Engines: **E2 Construction Workbench** + **E6 Timeline** + case-lab
- Constitution articles explorer, case-law timeline, court-process simulator, election-process simulator, rights-duties mapper
- Misconception hooks: DPSP-justiciable confusion, PIL-scope myths

### 17. Physical Education / Yoga (if kept)
- Engine: **E1 Parameter Lab** (fitness/body metrics) + drill videos — LOW priority

### 18. Psychology / Sociology (11-12, if kept)
- Engine: **E4 System Simulator** + case-lab (experiments, surveys, statistical mini-labs reusing the maths data lab)

### 19. Home Science / Fashion Design / Cookery (elective, if kept)
- Engine: **E3 Virtual Lab** — LOW priority

### 20. Second/Third Languages (French etc., if kept)
- Engine: **E8-adapted Language Gym** (same as Hindi engine, content-pack swapped)

## Cross-cutting engine architecture (what is shared)

Every sandbox instance = content pack + shared engine skeleton:
1. **Canvas layer** (3D three.js / 2D canvas / DOM workbench / map / timeline / code editor — per engine type)
2. **Solver layer** (subject families module → API; computes ground truth for ANY student state)
3. **Misconception injection** (wrong state → corpus node's authored misconception + common misconception → MisconceptionPanel, closed-world)
4. **Class/topic picker** (from the class-wise book inventory JSON per subject)
5. **Progress + mastery** (BKT state, streaks, prereq chaining — existing practice_service)

## Build priority (engine types, not subjects)

| Wave | Engine | Unlocks |
|---|---|---|
| 1 | E1 Parameter Lab (generic) | maths, physics quantities, chem gas laws, economics elasticities, accounts depreciation |
| 2 | E2 Construction Workbench (generic) | geometry, equation balancing, Preamble builder, flowcharts, sentence/notice formats |
| 3 | E8 Code Runtime | compapp/csoc/ai/robotics |
| 4 | E7 Document & Ledger Workbench | accountancy, business studies, comst documents |
| 5 | E5 Geospatial Explorer | geography (India/world/topo), some envsci |
| 6 | E3 Virtual Labs | chemistry practicals, biology experiments, physics practicals |
| 7 | E4 System Simulators + E6 Timeline | eco/climate/population dynamics, history chains |
| 8 | Language Gyms | English + Hindi (Devanagari pack) |

## What NOT to build
- A "generic sandbox builder" that tries to serve all subjects with one UI — the interaction model IS the pedagogy
- 3D for subjects that don't need it (economics curves are 2D-native; forcing 3D hurts usability)
- Free-form LLM-generated sandbox content — closed-world authored rule: same as MisconceptionPanel
