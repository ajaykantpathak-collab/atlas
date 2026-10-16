# CISCE Inventory

Inventory of CISCE (ICSE) prescribed syllabus content per class, used to plan corpus coverage for CISCE-board students. Each class section is owned by a separate agent.

---

## CISCE Class 6

**Source of truth (parsed CISCE document, local):** `D:\platform\cbse_data\upper_primary_text\UpperPrimary.txt` — "Curriculum for Upper Primary Classes (VI–VIII)", Research Development and Consultancy Division (RDCD), Council for the Indian School Certificate Examinations, New Delhi, First Edition November 2016 (publisher: cisce.org). Supporting per-subject extracts of the same document: `Biology-at-the-upper-Primary-Level.txt`, `Chemistry-at-Upper-Primary-Level-1.txt`, `Physics-at-Upper-Primary-Level-1.txt`, `Geography-at-Upper-Primary-Level.txt`, `History-and-Civics-at-Upper-Primary-Level.txt`, `Module-II-Maths.txt`, `Module-II-Eng-Primary.txt`, `HINDI` section (in UpperPrimary.txt).

**Note on structure:** CISCE Class 6 is **theme-based, not textbook-chapter-based** — the Council does not prescribe textbooks for Classes VI–VIII (stated in the document). Themes below are listed in the document's teaching order per subject. Coverage marks are against the deployed corpus `deploy/content/enhanced_nodes_md/` (light keyword check only, not a deep audit).

Subjects CISCE prescribes for Class 6 (academic): English (First Language), Second Language (Hindi is the model language given in the curriculum), Mathematics, History & Civics, Geography, Science as three strands — Physics, Chemistry, Biology — Computer Studies, plus Arts Education (stage-level, VI–VIII combined).

### English (First Language)

Skill-based curriculum with 4 areas (no prescribed chapters). Document order:

1. Listening and Speaking — group discussion, debate, speech, drama, presentations; analysing language use in media. [LIKELY-COVERED] (thin — corpus has comprehension/units rather than speaking/listening nodes)
2. Reading — graded reading of stories, dramas, poems, travelogues, autobiographies, reports, speeches, articles; comprehension, inference, figurative language. [LIKELY-COVERED] (`c6_english_u1`–`u5`: plot, setting, comprehension, humour units)
3. Writing — process approach; narratives (200 words, 3+ paragraphs), arguments, notices/messages/letters. [LIKELY-COVERED] (`c6_english_u5` epistolary/letters; `c6_comp_cbse_85` paragraph writing)
4. Grammar and Vocabulary in Context — pronouns (case, reflexive, number/person, antecedent incl. indefinite), subject-verb agreement, transitive/intransitive verbs, perfect tenses and tense shifts, affixes/roots, figures of speech (irony, pun, personification, alliteration, metaphor, simile, assonance, onomatopoeia). [LIKELY-COVERED] (`c6_gram_cbse_80`–`83`: sentences, nouns, verbs, articles; pronoun/tense nodes thin)

### Hindi (Second Language)

Skill + theme based (थीम-आधारित), 3 themes in document order. Suggested content themes: घर-परिवार, मित्र-पड़ोसी, पर्यावरण, पशु-पक्षी, कलाएँ-संस्कृति, खेल, यातायात, त्योहार, स्वास्थ्य-स्वच्छता, विज्ञान-तकनीक, देश.

1. थीम 1: सुनना और बोलना (Listening and Speaking). [GAP]
2. थीम 2: पढ़ना एवं लिखना (Reading and Writing skills). [LIKELY-COVERED] (partial — `c6_hin_cbse_01`–`13` are literature/background-analysis reading nodes; पत्र-लेखन/निबंध-लेखन not node-mapped)
3. थीम 3: व्याकरण और भाषा (Grammar and Language) — संज्ञा एवं संज्ञा-भेद, सर्वनाम एवं भेद, विशेषण, क्रिया एवं क्रिया-भेद, लिंग-वचन, काल, कारक (परसर्ग), विराम-चिह्न, वर्ण-विचार, शब्द-भंडार. [GAP] (no Hindi grammar nodes in corpus)

### Mathematics

6 themes in document order (document sections at UpperPrimary.txt lines 5339–6419):

1. Theme 1: Number System — numberness to 5 digits, place value, operations on large numbers; Integers (need, number line, ordering); Sets (idea, representation, finite/infinite/empty, cardinality); Fractions (types, representation, division); Playing with Numbers (brackets, factors/multiples, divisibility rules 2–11, primes/composites, HCF & LCM). [LIKELY-COVERED] (`c6_math_ch01` numbers, `ch02` integers, `ch03` fractions, `ch12` patterns/number play; Sets sub-topic is a gap)
2. Theme 2: Ratio and Proportion — ratio vs fraction, proportion as equality of two ratios, unitary method (direct variation), percent as fraction with denominator 100, speed-time-distance basics. [LIKELY-COVERED] (`c6_math_ch06`)
3. Theme 3: Algebra — constants/variables/unknowns via patterns, terms, expressions, factor, coefficient, polynomials, degree, like/unlike terms, framing and evaluating expressions. [LIKELY-COVERED] (`c6_math_ch05`)
4. Theme 4: Geometry — basic geometrical ideas (line/segment/ray, open/closed figures, curves), angles and types, triangles and classification, quadrilaterals (trapezium, parallelogram, rectangle, square, rhombus), polygons, 3-D shapes and nets, symmetry and reflection. [LIKELY-COVERED] (`c6_math_ch07` points/lines, `ch10` symmetry, `ch11` constructions)
5. Theme 5: Mensuration — perimeter of shapes, concept of area, area of rectangle and square, conversion of units (mass, time, money, capacity). [LIKELY-COVERED] (`c6_math_ch08`)
6. Theme 6: Data Handling — collection/organisation of data, tally marks, pictographs (scaling), bar graphs, mean and median (≤10 observations). [LIKELY-COVERED] (`c6_math_ch09`)

### History & Civics

**History — 6 themes** (document sections at lines 8202–8817):

1. The River Valley Civilizations — Harappan/Indus, Nile, Tigris-Euphrates; town planning, trade, decline. [LIKELY-COVERED] (`c6_history_ch04` early cities/Harappan; Mesopotamia/Egypt only light)
2. The Vedic Civilization — Early and Later Vedic age, society, economy, religion, Gurukul system. [GAP]
3. Mahavira & Buddha — Great Preachers — lives and teachings of Mahavira and Gautama Buddha. [GAP] (only incidental Buddhism-as-Ashoka's-faith mentions inside `c6_history_ch05`)
4. Rise of Kingdoms & Republicans — Janapadas/Mahajanapadas; Vatsa, Avanti, Kosala, Magadha; Bimbisara, Ajatashatru, Nandas, Alexander's invasion, Chandragupta Maurya. [GAP]
5. The Mauryan Empire — Chandragupta Maurya, Ashoka the Great, administration, Mauryan art, decline. [LIKELY-COVERED] (`c6_history_ch05`)
6. The Golden Age — Gupta Empire — sources, administration, art/literature/science achievements, decline. [GAP]

**Civics — 2 themes** (lines 8818–9108):

1. Rural Local Self Government — Panchayati Raj, Gram Sabha, Gram Panchayat, Panchayat Samiti, Zila Parishad. [LIKELY-COVERED] (`c6_civics_ch11`/`ch12` panchayat, grassroots democracy)
2. Urban Local Self Government — Municipal Committees/Corporations, ward councils, urban civic services. [LIKELY-COVERED] (`c6_civics_ch11`/`ch12` municipal bodies)

### Geography

6 themes in document order (lines 11213–11912):

1. Representation of Geographical Features — maps, sketches, plans, scale (large/small), directions, symbols, diagrams, drainage patterns. [GAP]
2. Landforms — mountains (fold, block, volcanic), valleys, plateaus, plains; formation processes and distribution. [LIKELY-COVERED] (`c6_geography_ch01` geographical/physical diversity)
3. Water Bodies — oceans (5 named), marginal/inland seas, lakes, rivers; importance, water pollution. [GAP] (corpus has only weather/climate nodes `c6_geography_ch02`–`03`)
4. Agriculture — farming practices (subsistence: intensive/extensive/shifting; commercial/plantation), food vs cash crops, major crop regions, green revolution. [LIKELY-COVERED] (`c6_geography_ch04` farming; crop-region detail thin)
5. Minerals — minerals and ores, metallic (iron ore, uranium, bauxite, manganese, gold, silver, copper) vs non-metallic, mining types, conservation. [GAP]
6. Study of Continents: North America and South America — location, boundaries, political divisions, physical features; case studies: lumbering (Canada) vs Amazon basin life. [GAP]

### Physics

6 themes in document order (per-subject overview table lists Matter first; Class VI detailed sections at lines 13170–13880):

1. Theme 1: Matter — meaning, made of atoms/molecules, states (solid, liquid, gas) and their properties. [LIKELY-COVERED] (`c6_chemistry_ch04` materials/matter/states)
2. Theme 2: Physical Quantities and Measurement — length (ruler, measuring tape), mass (beam balance, electronic balance), time (clock, watch, stop-watch), temperature (clinical/laboratory thermometer), area (graph paper), unit conversion. [LIKELY-COVERED] (`c6_physics_ch08` measurement/time; beam balance mentioned)
3. Theme 3: Force — force as push/pull, effects on mass/speed/direction/shape, friction (static, sliding, rolling), advantages/disadvantages. [GAP]
4. Theme 4: Energy — work, energy, simple machines (lever, pulley, wheel-and-axle, inclined plane, wedge, screw). [GAP]
5. Theme 5: Light — rectilinear propagation, pinhole camera (principle, working, image size), shadows, lunar eclipse, umbra/penumbra. [LIKELY-COVERED] (`c6_physics_ch11` light sources, shadows, pinhole nodes)
6. Theme 6: Magnetism — magnets, magnetic/non-magnetic materials, poles, compass, making magnets. [GAP]

### Chemistry

5 themes in document order (lines 15619–16435; overview table: Introduction to Chemistry, Elements Compounds and Mixtures, Matter, Water, Air and Atmosphere):

1. Introduction to Chemistry — matter around us, great chemists (Mendeleev, Lavoisier, Dalton), chemistry in food, clothing, cosmetics, medicines, industries. [GAP]
2. Theme 2: Elements, Compounds and Mixtures — elements (metals/non-metals), symbols, compounds, molecular formulae, mixtures, separation techniques. [LIKELY-COVERED] (`c6_chemistry_ch04` materials/metals/non-metals/mixtures; `ch05` physical-chemical changes context)
3. Theme 3: Matter — states of matter and their characteristics, change of state. [LIKELY-COVERED] (`c6_chemistry_ch04`/`ch05`)
4. Theme 4: Water — importance of water, solute/solvent/solution, water as universal solvent, water pollution and conservation. [GAP] (solute/solvent appear only inside `c6_chemistry_ch04`; no dedicated water chapter)
5. Theme 5: Air and Atmosphere — air everywhere, components (nitrogen, oxygen, carbon dioxide, argon, moisture), uses of oxygen/nitrogen, rising CO2, air pollution. [GAP]

### Biology

5 themes in document order (lines 18462–19128; overview table: Plant Life, The Cell, Human Body, Health and Hygiene, Adaptation):

1. Theme 1: Plant Life — THE FLOWER: parts (4 whorls), pollination (self/cross, agents), fertilisation, fruit formation, seed parts (monocot/dicot), germination conditions. [LIKELY-COVERED] (`c6_biology_ch10` plant growth, seeds, germination)
2. Theme 2: The Cell — plant and animal cell organelles, differences, diagrams (Amoeba, Chlamydomonas). [GAP] (no dedicated cell chapter; passing mentions only)
3. Theme 3: Human Body — digestive system, respiratory system, circulatory system (blood, RBC/WBC/platelets, heart). [LIKELY-COVERED] (partial — `c6_biology_ch09` digestive + breathing nodes; circulatory detail thin)
4. Theme 4: Health and Hygiene — health/hygiene/disease terms, communicable (bacterial, viral, protozoal, worms) vs non-communicable diseases, modes of transmission. [GAP]
5. Theme 5: Adaptation — habitat, adaptations of plants/animals in aquatic, desert, mountain habitats. [GAP]

### Computer Studies

8 topics in document order (lines 20487–21081; overview table confirms Class VI list):

1. Topic 1: Categories of Computers and Computer Languages — micro/mini/mainframes/supercomputers, machine/assembly/high-level languages, translators (compiler/interpreter). [GAP]
2. Topic 2: File Management — Organisation of Data — transferring data between drives/devices, multiple applications, wildcard search, file formats (JPEG, MP3, MP4, doc, XLS). [GAP]
3. Topic 3: Word Processor — Tabular Presentation — tables in word processors. [GAP]
4. Topic 4: Word Processor — Mail Merge. [GAP]
5. Topic 5: Presentation — Visual Effects — slides, transitions, animations. [GAP]
6. Topic 6: Scratch Programming — Introduction to Game Creation. [GAP]
7. Topic 7: HTML — An Introduction — basic tags, structure of an HTML page. [GAP]
8. Topic 8: Internet — Online Surfing — browsers, search, email basics, netiquette. [GAP]

(Corpus group `c6_comp_cbse_85` is actually paragraph-writing content mislabeled as computing — not CISCE CS coverage.)

### Arts Education (stage-level, Classes VI–VIII)

7 themes shared across VI–VIII (not class-specific): Form; Colour (hue, tint, shade); Texture; Composition (2-D/3-D space, symmetry types); Tools and Techniques (drawing, painting, printing, collage, clay modelling, mask making); Art Vocabulary; Art Appreciation (+ Perspective). All [GAP] — no arts nodes in the corpus.

---

### Class 6 counts

- **Subjects covered:** 10 (English, Hindi, Mathematics, History & Civics, Geography, Physics, Chemistry, Biology, Computer Studies, Arts Education)
- **Total chapters/themes listed:** 59 (English 4 areas, Hindi 3 themes, Maths 6, History 6 + Civics 2, Geography 6, Physics 6, Chemistry 5, Biology 5, Computer Studies 8, Arts Education 8)
- **LIKELY-COVERED:** 24
- **GAP:** 35 (worst areas: Computer Studies 8/8 missing, Arts Education 8/8 missing; History ancient periods — Vedic, Buddha/Mahavira, pre-Mauryan kingdoms, Guptas — missing; Geography 4/6 missing; science gaps: Force, Energy, Magnetism, Water, Air & Atmosphere, The Cell, Health & Hygiene, Adaptation)

Coverage annotation method: one-pass keyword/first-node check against `deploy/content/enhanced_nodes_md/` Class 6 groups (`c6_<subject>_chNN`); no deep node-level audit was performed. CBSE content was not audited or modified.

---

## CISCE Class 7

**Source of truth (parsed CISCE publication, local):** `D:\platform\cbse_data\upper_primary_text\UpperPrimary.txt` — *Curriculum for Upper Primary Classes (VI–VIII)*, Research Development and Consultancy Division (RDCD), Council for the Indian School Certificate Examinations, New Delhi, First Edition November 2016 (publisher: cisce.org). Companion per-subject extracts in the same folder carry identical content: `Physics-at-Upper-Primary-Level-1.txt`, `Chemistry-at-Upper-Primary-Level-1.txt`, `Biology-at-the-upper-Primary-Level.txt`, `Geography-at-Upper-Primary-Level.txt`, `History-and-Civics-at-Upper-Primary-Level.txt`, `Module-II-Eng-Primary.txt`. The Council does not prescribe textbooks for Classes VI–VIII; the curriculum is theme-based with Key Concepts per theme (line refs below point into `UpperPrimary.txt`).

**Curricular areas CISCE prescribes for Classes VI–VIII** (~line 730–745): First Language (English), Second Language (Hindi is the model language given), Third Language (V–VIII, school's choice — no chapter list), Mathematics, Science, Social Studies (History & Civics + Geography, optionally combined as HCG), Computer Studies, Arts Education, plus non-examinable areas Physical Education/Yoga, Education in Moral and Spiritual Values, and SUPW (VI–VIII) — the last three carry no prescribed chapter lists and no corpus expectation.

**Coverage annotation method (light, read-only):** each CISCE chapter was keyword-swept against the 586 `c7_*` nodes in `deploy/content/enhanced_nodes_md/` (ids `c7_<subject>_chNN_*`). One pass, no deep audit; CBSE content untouched.

### English (First Language)

Skill-based curriculum, 4 areas (Class VII block: lines 2084–2751):

1. Listening and Speaking — listening/viewing comprehension, discussion, presentations with tone/gesture/voice modulation, multimedia talks on social issues. [LIKELY-COVERED] (75 `c7_engl` literature nodes; speaking skills embedded, no dedicated speaking nodes)
2. Reading — literary/non-literary texts across genres/themes (self/family, community, nation, environment, science & tech, peace, adventure); summarising, evaluating the author's argument. [LIKELY-COVERED]
3. Writing — creative writing (composition 200–250 words, story, poem, dialogue, narrative), notices, posters, formal/informal letters, paragraphs with linkers (however, therefore). [LIKELY-COVERED] (notice 186 files, diary 16)
4. Grammar and Vocabulary in Context — phrases vs clauses in simple/compound/complex sentences; active–passive voice; synonym, antonym, analogy; figurative language (irony, pun, personification, alliteration, metaphor, simile, assonance, onomatopoeia); domain vocabulary. [LIKELY-COVERED] (`c7_gram_cbse_80`–`82`: clauses, continuous tenses, determiners)

### Hindi (Second Language)

Skill + theme based, 3 themes per class, cumulative VI→VIII (Class VII block: lines 3978–4517):

1. थीम 1: सुनना और बोलना (Listening and Speaking) — कहानी सुनना-सुनाना, घटना/चित्र वर्णन, संवाद, वाद-विवाद, आशुभाषण, बहुमाध्यम प्रस्तुति. [LIKELY-COVERED] (21 `c7_hin_cisce` nodes exist in the node registry `cbse_data/nodes/by_subject/hindi_cisce.json` — but NOT yet materialised as files in `deploy/content/enhanced_nodes_md/`)
2. थीम 2: पढ़ना एवं लिखना (Reading and Writing skills) — गद्य/पद्य पठन-बोध, भाव-समझ; रचनात्मक लेखन: निबंध, पत्र, डायरी, विज्ञापन. [LIKELY-COVERED] (same registry caveat)
3. थीम 3: व्याकरण और भाषा (Grammar and Language) — उपसर्ग-प्रत्यय; संज्ञा/सर्वनाम/विशेषण/क्रिया के भेद; क्रिया-विशेषण; लिंग-वचन; काल; कारक-चिह्न; अर्थ के आधार पर वाक्य-भेद व वाक्य-शोधन; विराम-चिह्न; शब्द-भंडार (विलोम, पर्यायवाची, अनेक शब्दों के लिए एक शब्द, मुहावरे). [LIKELY-COVERED] (same registry caveat)

### Mathematics

6 themes, same names as VI/VIII with graded content (Class VII block: lines 6376–7118):

1. Theme 1: Number System — integers (multiplication/division, properties), rational numbers (number line, word problems), decimal fractions, fraction as operator/reciprocal, exponents (natural numbers, laws), sets (equal/equivalent/universal, cardinality). [LIKELY-COVERED] (rational number 11 files, exponents 20; "Sets" itself thin — "finite set" 0 hits)
2. Theme 2: Ratio and Proportion — ratio/proportion revision, unitary method (general expression), percentage introduction (fraction with denominator 100, conversions), profit & loss (single transaction), simple interest (whole years), speed-distance-time. [LIKELY-COVERED] (percentage 51 files, unitary 29, simple interest 4)
3. Theme 3: Algebra — constants/variables/terms/coefficient, like-unlike terms, generating expressions (1–2 unknowns), addition/subtraction of expressions, simple linear equations, simple inequalities (< >). [LIKELY-COVERED] (linear equation 36)
4. Theme 4: Geometry — pairs of angles (linear/supplementary/complementary/adjacent/vertically opposite), parallel lines with transversal (alternate/corresponding angles), triangle properties (angle sum, exterior angle), Pythagoras (verification only), symmetry, congruence (superimposition, criteria), constructions (parallel line, simple triangles). [LIKELY-COVERED] (transversal 13, pythagoras 4, congruence 20)
5. Theme 5: Mensuration — perimeter/circumference revision, area of square/rectangle/triangle/parallelogram/circle/rings/combined figures. [LIKELY-COVERED] (circumference 3, area 26)
6. Theme 6: Data Handling — mean, median, mode of simple data; bar graphs/double bar graphs. [LIKELY-COVERED] (median 10, bar graph 5)

### Physics

7 themes (Class VII block: lines 13800–14564):

1. Theme 1: Physical Quantities and Measurement — volume (3-D concept, unit volume), area of irregular shapes (graph paper), density of regular solids (formula, simple numericals, no SI units), speed calculation. [LIKELY-COVERED] (density 24, volume 33)
2. Theme 2: Force and Pressure: Motion — motion as change of position; types (translatory, circulatory, oscillatory, repetitive/random); uniform vs non-uniform motion, average speed; weight; mass vs weight difference. [LIKELY-COVERED] (speed 122, mass-weight 4; motion-type taxonomy vocabulary thin — translatory/oscillatory 0 hits)
3. Theme 3: Energy — energy as capacity to do work, units (joule, calorie), forms, inter-conversion, law of conservation of energy (roller coaster, hydroelectricity). [LIKELY-COVERED] (conservation of energy 4)
4. Theme 4: Light Energy — reflection (normal, angle of incidence/reflection), laws of reflection, plane mirror (uses, ray diagram, lateral inversion), speed of light (3×10⁸ m/s), primary colours (RGB), colour addition/subtraction. [LIKELY-COVERED] (laws of reflection 5, plane mirror 9, colour 13)
5. Theme 5: Heat — heat as energy (J, cal), temperature units (°C/°F/K), effects (temperature, expansion, change of state), conductors/insulators, heat transfer (conduction, convection, radiation), thermos flask. [LIKELY-COVERED] (conduction 25, convection 17, radiation 30)
6. Theme 6: Sound — sources, longitudinal wave, amplitude (loudness) and frequency, need of medium, reflection/absorption, relative speed in media. [LIKELY-COVERED] (sound 96 files; wave-characteristic detail thin)
7. Theme 7: Electricity and Magnetism — law of magnetism, test by repulsion, electromagnetism/electromagnets, electric bell, current as charge flow, electric cell, resistors, circuit symbols. [LIKELY-COVERED] (electromagnet 7, circuit 35; electric-bell detail absent)

### Chemistry

7 themes (Class VII block: lines 16372–17395):

1. Theme 1: Matter and its Composition — definition of matter, mass and occupied space, brief composition introduction. [LIKELY-COVERED] (matter 117 files)
2. Theme 2: Physical and Chemical Changes — physical vs chemical change, new product with new properties, change of state/energy as physical change. [LIKELY-COVERED] (dedicated `c7_chem_ch02`)
3. Theme 3: Elements, Compounds and Mixtures — identification via symbols/formulae, mixture vs compound (composition of constituents). [LIKELY-COVERED] (compound/mixture/separation nodes abundant)
4. Theme 4: Atomic Structure — atom, molecule, radical, atomicity (mono/di/tri/poly), first 20 elements with names/symbols, valency as combining capacity. [LIKELY-COVERED] (atomic 31, molecule 43; valency/atomicity specifics thin)
5. Theme 5: Language of Chemistry — chemical reactions, characteristics (colour/state/smell/gas/precipitate/heat evolved), word equations. [LIKELY-COVERED] (chemical equation 16, word equations 20)
6. Theme 6: Metals and Non-Metals — general properties (lustre, conduction, malleability, ductility, sonority), classification, rusting and prevention (oiling, painting, galvanisation, tinning), uses, metalloids (silicon, germanium). [LIKELY-COVERED] (dedicated `c7_chem_ch01` = metals; rusting 15, corrosion 11)
7. Theme 7: Air and Atmosphere — air as mixture of gases, composition and uses, oxygen needed for combustion, mass change on burning (Mg, candle), word equations with O₂, acid rain products/effects, air quality. [LIKELY-COVERED] (combustion 18, acid rain 5)

### Biology

5 themes (Class VII block: lines 19130–19624):

1. Theme 1: Tissue — animal tissues: epithelial (location/function), connective (areolar, adipose, bone, cartilage, blood, ligament, tendon), muscular (striated/unstriated/cardiac), nerve tissue (neuron: cell body, dendron, axon). [GAP] (only generic "tissue"/xylem/phloem mentions from plant-transport contexts; epithelial/neuron 0 hits)
2. Theme 2: Kingdom Classification — meaning/need/advantages of classification; Monera (bacteria), Protista (Amoeba structure & life processes), Fungi (mould), Plantae, Animalia (vertebrates + 9 invertebrate phyla). [GAP] (monera/protista/amoeba 0 hits)
3. Theme 3: Plant Life — photosynthesis (definition, factors: light/CO₂/water/chlorophyll, experiment), respiration in plants (aerobic/anaerobic, word equations), photosynthesis vs respiration. [LIKELY-COVERED] (photosynthesis 20, aerobic 5/anaerobic 4)
4. Theme 4: Human Body — excretory system (kidneys, ureter, urinary bladder, urethra, nephron role, UTI/kidney stone), nervous system (cerebrum/cerebellum/medulla, spinal cord, nerves). [LIKELY-COVERED] (nervous 10, kidney 3 — thin)
5. Theme 5: Health and Hygiene — allergy: concept, allergens (dust, pollen, mites), entry routes, symptoms, seasonal/perennial types, precautions. [GAP] (allerg* 0 hits)

### History & Civics

History = The Medieval World (6 themes), Civics = 2 themes (Class VII block: lines 9109–10106; summary table ~8064):

History:
1. Theme 1: Medieval Europe – Rise and Spread of Christianity — decline of the Roman Empire, barbarian invasions (Goths, Vandals, Franks), Byzantium, emergence of the Turks and the Crusades, monasteries. [GAP] (only passing "medieval/Roman Empire" refs; crusades/Byzantium 0 hits)
2. Theme 2: Rise and Spread of Islam — pre-Islamic Arabia, birth/early life of Prophet Mohammad, five principles, Hijrat, return to Mecca, Caliphate, Umayyad and Abbasid dynasties. [LIKELY-COVERED] (islam 19)
3. Theme 3: The Delhi Sultanate — Turkish invasions, the five dynasties, administration, Tughlaq case study, Tughlaq vs Khalji comparison, art and architecture. [LIKELY-COVERED] (sultanate 21)
4. Theme 4: The Vijayanagar and Bahamani Kingdoms — disintegration of the Tughlaq empire, rise of both kingdoms, Krishnadeva Raya, Mahmud Gawan, achievements/administration/art (Hampi, Gol Gumbaz). [LIKELY-COVERED] (vijayanagar 6, hampi 5; Bahmani detail thin)
5. Theme 5: The Mughal Empire — First Battle of Panipat, Babur/Humayun, Sher Shah Suri, Akbar case study (administration, revenue, religious policy), Jahangir/Nur Jahan, Shah Jahan's architecture, Aurangzeb's Deccan policy, decline. [LIKELY-COVERED] (mughal 27)
6. Theme 6: Making of Composite Culture — Bhakti and Sufi movements, teachings of Kabir, Guru Nanak, Shankara, Dnyaneshwar, Alwars and Nayanars, Sufi saints, impact on society. [LIKELY-COVERED] (bhakti 23, sufi 11)

Civics:
7. Theme 1: The Constitution of India — meaning, Constituent Assembly, Preamble, Sovereign/Socialist/Secular/Democratic/Republic, Justice-Equality-Fraternity-Liberty. [LIKELY-COVERED] (constitution 39, preamble 9)
8. Theme 2: Directive Principles of State Policy — welfare state features, DPSP meaning, general and Gandhian principles, DPSP vs Fundamental Rights. [LIKELY-COVERED] (directive principles 9)

### Geography

7 themes (Class VII block: lines 11838–12472; summary table ~11112):

1. Theme 1: Representation of Geographical Features — colours on topographical sheets (blue/red/yellow/brown/green), scales (representative fraction, linear), measuring distance (straight/curved), conventional signs and symbols (Survey of India). [LIKELY-COVERED] (topographic 30)
2. Theme 2: Atmosphere — composition, structure (troposphere, stratosphere/ozone, mesosphere, thermosphere, exosphere), greenhouse effect, global warming (causes, impact, mitigation). [LIKELY-COVERED] (atmosphere 55, greenhouse 18, ozone 3)
3. Theme 3: Weather and Climate — elements of weather (temperature, pressure, humidity, precipitation, winds, clouds), weather vs climate, instruments (thermometer, rain gauge, barometer, hygrometer, anemometer, wind vane), isohyets/isotherms. [LIKELY-COVERED] (rain gauge 5, barometer 5; isotherm detail thin)
4. Theme 4: Weathering and Soil Formation — rock types (igneous, sedimentary, metamorphic), weathering (mechanical/chemical/biological), soil formation, soil profile, soil conservation methods. [LIKELY-COVERED] (weathering 9, soil 90, soil profile 2)
5. Theme 5: Industries — need, types (large/small scale, cottage, agro-based), location factors, world industries (iron & steel, cotton textile, IT, sugar, shipbuilding, fishing, automobile) and centres, industrial pollution. [LIKELY-COVERED] (industr* 48)
6. Theme 6: Energy and Power Resources — renewable (solar, hydro, wind) vs non-renewable (coal, petroleum), major Indian hydroelectric projects (river + state), conservation. [LIKELY-COVERED] (renewable 8, hydroelectric 6)
7. Theme 7: Study of Continents: Europe, Africa, Australia and Antarctica — location, boundaries, political divisions (countries with capitals), physical features; case studies (tourism in Switzerland, cocoa in Ghana, sheep rearing in Australia); Antarctica as the uninhabited continent. [GAP] (only scattered Europe mentions — Africa 3, Australia 1, Antarctica 0; no dedicated continent-study nodes)

### Computer Studies

7 topics (Class VII block: lines 21025–21563). Note: only 2 `c7_comp` nodes exist in the corpus and they contain English notice-writing content.

1. Topic 1: Computer – Hardware Components — external/internal hardware, CPU, disk drives, SMPS, motherboard, ports, modem, peripherals. [GAP]
2. Topic 2: Number System – An Introduction — need for number systems, digits and bases, decimal/binary/octal/hexadecimal, decimal↔binary conversion. [GAP]
3. Topic 3: Computer Virus — definition, boot-sector/program-file viruses, symptoms and harm, antivirus, prevention, malware/worm/spyware/Trojan horse/sweeper. [GAP]
4. Topic 4: Ethics and Safety Measures in Computing — plagiarism, cyber bullying, hacking, phishing, spamming, privacy, software piracy, IPR, strong passwords, firewall, digital footprints. [GAP]
5. Topic 5: Spreadsheets – An Introduction — workbook/worksheet, sheet tab, cell address, formula bar, data types (number/string/formula), formulae, undo/redo, rows/columns, copy/move, autofill. [GAP]
6. Topic 6: Database and DBMS – An Introduction — meaning and uses, create/save a database, primary key, querying. [GAP]
7. Topic 7: HTML – Advanced Features — lists `<OL>/<UL>`, images `<img src>`, links `<a href>`, tables `<table>/<tr>/<td>`, marquee, forms. [GAP]

(A CISCE-aligned `7_cs` topic map exists at `parsed_output/class7_topic_mapping.json` with node ids `c7_cs_001–025`, but those nodes are not materialised in `deploy/content/enhanced_nodes_md/`.)

### Arts Education (Visual Arts)

8 themes recurring across VI–VIII with graded complexity (Class VII block: lines 23457–24893):

1. Theme 1: Form — lines, shapes, sizes; 2-D/3-D, realistic vs abstract forms. [GAP]
2. Theme 2: Colour — colour families, mixing, application. [GAP]
3. Theme 3: Texture — tactile/visual textures, materials. [GAP]
4. Theme 4: Composition — arranging elements in 2-D/3-D space. [GAP]
5. Theme 5: Tools & Techniques — media, tools, craft processes. [GAP]
6. Theme 6: Art (Visual Arts) Vocabulary — art terminology. [GAP]
7. Theme 7: Responding to the Artefacts and Nature — appreciation and critique. [GAP]
8. Theme 8: Perspective — depth, viewpoint. [GAP]

---

### Class 7 counts

- **Subjects covered:** 10 (English, Hindi, Mathematics, Physics, Chemistry, Biology, History & Civics, Geography, Computer Studies, Arts Education). Additional prescribed but non-chapter areas: Third Language, Physical Education/Yoga, Moral & Spiritual Values, SUPW.
- **Total chapters/themes listed:** 62 (English 4 areas, Hindi 3 themes, Maths 6, History 6 + Civics 2, Geography 7, Physics 7, Chemistry 7, Biology 5, Computer Studies 7, Arts Education 8)
- **LIKELY-COVERED:** 42
- **GAP:** 20 (Computer Studies 7/7 missing — entire subject; Arts Education 8/8 missing — entire subject; Biology 3: Tissue, Kingdom Classification, Health & Hygiene–Allergy; Geography 1: Study of Continents Europe/Africa/Australia/Antarctica; History & Civics 1: Medieval Europe – Rise and Spread of Christianity)
- Subjects fully covered: English, Hindi, Mathematics, Physics, Chemistry; near-full: History & Civics (7/8), Geography (6/7)
- Caveats: Hindi coverage rests on 21 `c7_hin_cisce` nodes present in the node registry (`cbse_data/nodes/by_subject/hindi_cisce.json`) but not yet materialised in `deploy/content/enhanced_nodes_md/`; Biology "Human Body" and Chemistry "Atomic Structure" are covered thinly; a parallel CISCE mapping exists at `parsed_output/class7_topic_mapping.json` (bio/chem/cs/geo/histciv/maths/physics) whose `c7_cs`/plain-id nodes are not in the deployed corpus.

Coverage annotation method: one-pass keyword sweep against the 586 `c7_*` nodes in `deploy/content/enhanced_nodes_md/`; no deep node-level audit was performed. CBSE content was not audited or modified.

---

## CISCE Class 8

**Source of truth (parsed CISCE publication, local):** `D:\platform\cbse_data\upper_primary_text\UpperPrimary.txt` — *Curriculum for Upper Primary Classes (VI–VIII)*, Research Development and Consultancy Division (RDCD), Council for the Indian School Certificate Examinations, New Delhi, First Edition November 2016 (publisher: cisce.org). Companion per-subject extracts in the same folder carry identical content: `Physics-at-Upper-Primary-Level-1.txt`, `Chemistry-at-Upper-Primary-Level-1.txt`, `Biology-at-the-upper-Primary-Level.txt`, `Geography-at-Upper-Primary-Level.txt`, `History-and-Civics-at-Upper-Primary-Level.txt`, `Module-II-Maths.txt`, `Module-II-Eng-Primary.txt`. The Council does not prescribe textbooks for Classes VI–VIII; the curriculum is theme-based with Key Concepts per theme (line refs below point into `UpperPrimary.txt`). Parsing quirk: in each Class VIII subject section the "Theme/Topic 1" page sits just before the section header or beside the subject's core-concepts table (PDF page-order artifact) — Theme 1 names below are taken from the core-concepts tables and verified pages.

**Note on structure:** theme-based, not textbook-chapter-based. Themes listed in the document's teaching order. Coverage marks are against the deployed corpus `deploy/content/enhanced_nodes_md/` (560 `c8_*` nodes across 11 groups — the c8 layer follows the new NCERT/CBSE sequence: `c8_math_ch1–14` Ganita-Prakash-style, `c8_physics_ch1–9`, `c8_chem_ch2–3`, `c8_bio_ch1–2`, `c8_civ_ch1–4`, `c8_eco_ch1–3`, `c8_geo_ch1–2`, `c8_hist_ch1–5`, `c8_engl_ch1–5`, plus `c8_gram_cbse_80–85` and `c8_comp_cbse_86`) — light keyword check only, not a deep audit.

Subjects CISCE prescribes for Class 8 (academic): English (First Language), Second Language (Hindi is the model language given in the curriculum), Third Language (school-provided, Class V–VIII), Mathematics, History & Civics, Geography, Science as three strands — Physics, Chemistry, Biology — Computer Studies, plus Arts Education (stage-level, VI–VIII). Also prescribed but non-chapter areas: Physical Education/Yoga, SUPW & Community Service (VI–VIII).

### English (First Language)

Skill-based curriculum with 4 areas, plus a Class VIII Literature recommended-reading list (document lines 2751–3317). Class VIII-specifics: argumentative essays and formal letters are introduced in Class VIII.

1. Listening and Speaking — presentations on social issues (drug abuse, values, life skills), discussions with clarification-seeking, voice modulation, multimedia presentations. [LIKELY-COVERED] (thin — `c8_engl_ch1–5` units carry speaking/grammar nodes; no dedicated listening/speaking set)
2. Reading — critical evaluation of literary/non-literary texts; themes: Self/Family/Friends, Neighbourhood & Community, The Nation (diversity, heritage), Myths/legends/folktales, The World (India's neighbours), Adventure & Imagination, Sports & Yoga, Adolescence issues, Science & Technology, Peace & Harmony, Travel & Tourism, Mass Media, Art & Culture, Health & Sanitation, Famous Personalities, Environmental concerns. [LIKELY-COVERED] (`c8_engl_ch1–5`: setting, character analysis, historical/Kashmir-conflict context, science-fiction units)
3. Writing — paragraph (250–300 words), formal/informal letters, advertisement, diary, journal, notice, poster, articles, report, personal narrative, anecdote, story, poem, feature, dialogues; argumentative essays introduced this year; process approach (plan-draft-revise-edit). [LIKELY-COVERED] (`c8_comp_cbse_86` message writing; letters/reports inside units)
4. Grammar and Vocabulary in Context — phrases vs clauses, main and subordinate clauses, sentence transformation (simple ↔ complex/compound), idioms and figures of speech in context, collocations. [LIKELY-COVERED] (`c8_gram_cbse_80–85` grammar nodes)

ENGLISH LITERATURE — Class VIII suggested reading (recommended, not prescribed; schools may substitute): Lord of the Flies (Golding); A Wizard of Earthsea (Le Guin); The Hobbit (Tolkien); Watership Down (Adams); To Kill a Mockingbird (Lee); The Boy in the Striped Pyjamas (Boyne); A Tale of Two Cities and David Copperfield (Dickens); Les Misérables abridged (Hugo); Sherlock Holmes (Doyle); The Old Man and the Sea (Hemingway); The Pearl (Steinbeck); P.G. Wodehouse (Jeeves/Blandings); The Ramayana/Mahabharata (C. Rajagopalachari); graphic novels (Maus — Spiegelman).

### Hindi (Second Language)

Skill + theme based, 3 themes in document order (कक्षा - VIII section, lines 4567–5083).

1. थीम 1: सुनना और बोलना (Listening and Speaking) — प्रस्तुति, वाद-विवाद, आशुभाषण; ऐतिहासिक स्थल/प्रदर्शनी/आपदा विषय. [GAP]
2. थीम 2: पढ़ना एवं लिखना (Reading and Writing) — कविता, कहानी, एकांकी, निबंध, लेख; व्यंग्य/रूपक/उपमा की समझ; पत्र, डायरी, नोटिस, प्रतिवेदन, सुर्खियाँ-लेखन; विज्ञापन-लेखन के तीन प्रकार (वर्गीकृत, जनहित, उत्पाद-बिक्री). [LIKELY-COVERED] (18 `c8_hin_cisce` registry nodes — काकी (सियारामशरण गुप्त), वृद्धा (प्रेमचंद), साखी (कबीर), पद (मीरा), वर्णन (सूरदास), लेखन-पत्र/अनुच्छेद/संवाद; present in `cbse_data/nodes/by_subject/hindi_cisce.json` but not materialised in `deploy/content/enhanced_nodes_md/`)
3. थीम 3: व्याकरण और भाषा (Grammar and Language) — शब्द-विचार, उपसर्ग-प्रत्यय, तत्सम-तद्भव; संज्ञा (तीन भेद), लिंग-वचन, कारक, सर्वनाम (छह भेद), विशेषण (चार भेद), क्रिया (अकर्मक-सकर्मक, प्रेरणार्थक, संयुक्त, मिश्र, नामधातु), काल, वाच्य (कर्तृ/कर्म/भाव), अव्यय (क्रिया-विशेषण, संबंधबोधक, समुच्चयबोधक, विस्मयादिबोधक, निपात), वाक्य-भेद (अर्थ व रचना के आधार पर, वाक्य-शोधन), विराम-चिह्न, मुहावरे-लोकोक्तियाँ. [LIKELY-COVERED] (`c8_hin_cisce` व्याकरण nodes संज्ञा/सर्वनाम/विशेषण/क्रिया-काल/वाच्य/वाक्य-रचना/मुहावरे/शब्द-भंडार — registry, not deploy corpus)

### Mathematics

6 themes in document order (lines 7167–7878):

1. Theme 1: Number System — Rational Numbers; Squares and Square Roots (patterns, division method); Cubes and Cube Roots; Exponents and Powers; Sets. [LIKELY-COVERED] (`c8_math_ch1` square numbers/roots, `ch2` powers/growth, `ch5` consecutive numbers; rational numbers 4 incidental refs; Sets sub-topic thin)
2. Theme 2: Ratio and Proportion — percentage (applications), unitary method, profit & loss incl. overhead, discount, tax; simple & compound interest (yearly, up to 3 years); direct and inverse variations; time & work. [LIKELY-COVERED] (`c8_math_ch7` proportional change, `ch8` percentage, `ch10` cross-multiplication/proportion; compound interest 9 refs)
3. Theme 3: Algebra — algebraic expressions (multiplication/division), identities (a ± b)² = a² ± 2ab + b², factorisation (simple cases), linear equations in one variable; systems of two linear equations in two variables; linear graphs (y = mx + b). [LIKELY-COVERED] (`c8_math_ch6` distributive property, `ch13` unknown-number tricks; factorisation 18 refs)
4. Theme 4: Geometry — quadrilaterals (properties: parallelogram, square — diagonals equal and bisect at right angles), representing 3-D shapes on plane surfaces (views), parts of a circle. [LIKELY-COVERED] (`c8_math_ch4` quadrilaterals, `ch9` Baudhayana/Pythagoras)
5. Theme 5: Mensuration — area of trapezium and polygons (grid + formulae); surface area (TSA/curved) of cube, cuboid, cylinder via nets; volume and capacity of cuboidal and cylindrical vessels. [LIKELY-COVERED] (`c8_math_ch14` area; trapezium 12 refs, surface area 25 refs)
6. Theme 6: Data Handling — grouping ungrouped data, grouped bar-graphs/histograms, simple pie charts (interpret + construct), probability of simple random experiments (0-to-1 likelihood scale). [LIKELY-COVERED] (`c8_math_ch12` mean of data; pie chart 2 refs, probability 7 refs — probability thin)

### History & Civics

**History — 8 themes** (lines 10106–10836):

1. A Period of Transition — Renaissance (meaning, features), Reformation, Industrial Revolution (life and times before; positive/negative impacts), voyages and explorations. [GAP] (Renaissance 2 incidental refs; covered by solver QBank topic `period_transition` in `backend/solvers/histciv/class8_histciv_questions.py`, not corpus)
2. The Growth of Nationalism — French Revolution (causes, outbreak, impact, Napoleon — brief), American War of Independence (colonies → constitution), American Civil War and Abraham Lincoln. [GAP] (French Revolution 0 refs; nationalism refs are Indian-freedom focused; `french_revolution_causes` exists only in solver QBank)
3. India in the 18th Century — decline of the Mughal Empire, rise of regional powers. [LIKELY-COVERED] (`c8_hist_ch1` Turkic/Afghan invasions context, `ch2` Marathas; Mughal 39 refs, Maratha 15 refs)
4. Traders to Rulers — English East India Company: trade, conquest, expansion to rule. [LIKELY-COVERED] (East India Company 16 refs; "From Trade to Territory" chapter in node registry)
5. British Policies and Impacts — economic/administrative/educational policies and their effects. [LIKELY-COVERED] (`c8_hist_ch3` colonialism, `ch4` early resistance; colonial 50 refs)
6. The Great Uprising of 1857 — causes, spread, leaders, suppression, consequences. [LIKELY-COVERED] (1857 12 refs)
7. Socio-Religious Reforms — reform movements and leaders, women and caste questions. [LIKELY-COVERED] (socio-religious/reform-movement refs; "Women, Caste and Reform" registry chapter)
8. India's Struggle for Freedom — INC sessions, Moderates/Assertives, partition of Bengal, Gandhian movements (Swadeshi/Boycott, Non-Cooperation, Civil Disobedience, Quit India), to Independence. [LIKELY-COVERED] (nationalism 13 refs; freedom-movement nodes in registry)

**Civics — 2 themes** (lines ~10836–11213):

1. The Three Main Organs of the Indian Government: Legislature, Executive, Judiciary — Union Legislature (Lok Sabha, Rajya Sabha), Executive (President, Vice-President, PM, Ministers), Judiciary. [LIKELY-COVERED] (legislature 28, judiciary 20, parliament 41 refs; `c8_civ_ch2` parliamentary system)
2. United Nations — aims (est. 1945), organs (General Assembly, Security Council, International Court of Justice), agencies (UNESCO, UNICEF, WHO). [GAP] ("United Nations" 0 refs in corpus; solver topic `un_aims_principles` only)

### Geography

8 themes in document order (Class VIII section lines 12472–13007; Theme 1 named from the Class VIII core-concepts table, lines 11132–11143):

1. Theme 1: Representation of Geographical Features — maps vs sketch/plan/globe, types by scale, scale meaning/uses, eight cardinal directions, symbols, diagrams (meander, anticline, syncline, tributaries, distributaries, delta, block mountain). [LIKELY-COVERED] (map-scale 11 refs)
2. Theme 2: Population Dynamics — distribution, over/under-population and impacts, birth/death rates, immigration/emigration, population composition and pyramids. [LIKELY-COVERED] (population 94 refs; `c8_eco_ch2` demography)
3. Theme 3: Migration — immigration vs emigration, types, reasons, socio-economic impacts, historical migration regions. [LIKELY-COVERED] (migration 34 refs)
4. Theme 4: Urbanisation — urban growth, push-pull factors, urban problems. [LIKELY-COVERED] (urbanisation/urbanization 16 refs; `c8_eco_ch3` urban areas)
5. Theme 5: Natural and Man-made Disasters — types, causes, case studies of selected disasters, preparedness. [LIKELY-COVERED] (disaster 21 refs, earthquake 3, volcano 2)
6. Theme 6: Asia: The Largest Continent — location, boundaries, political divisions, physical features, climate. [GAP] (no Asia nodes in corpus)
7. Theme 7: India: Geographical Features — mountains, plateaus, deserts, islands, rivers on the map of India. [LIKELY-COVERED] (thin — `c8_geo_ch2` Earth/geoid; "geographical features" 5 refs)
8. Theme 8: India: Human Resources — population (rural/urban, male/female), skilled vs unskilled human resources, employment. [LIKELY-COVERED] ("Human Resources" registry chapter; population refs)

### Physics

8 themes in document order (Class VIII section lines 14564–15619; Theme 1 "Matter" page at lines ~13195–13232 beside the core-concepts table):

1. Theme 1: Matter — atoms and molecules, states (solid/liquid/gas) and their distinguishing properties. [LIKELY-COVERED] (`c8_chem_ch2` atomic/molecular matter; "Nature of Matter" registry chapter)
2. Theme 2: Physical Quantities and Measurement — density of irregular solids and liquids, relative density, floatation/sinking, densities of the three states. [LIKELY-COVERED] (density 57 refs; floatation term absent — partial)
3. Theme 3: Force and Pressure — turning effect/moment of force (units, numericals), pressure in solids/liquids/gases, atmospheric pressure. [LIKELY-COVERED] (`c8_physics_ch3` force, `ch4` pressure)
4. Theme 4: Energy — work, kinetic and gravitational potential energy, conservation of energy and transformations (pendulum, roller coaster). [LIKELY-COVERED] (kinetic energy 28 refs)
5. Theme 5: Light Energy — reflection, spherical mirrors and image formation. [LIKELY-COVERED] (`c8_physics_ch6` spherical mirrors)
6. Theme 6: Heat Transfer — conduction, convection, radiation; thermal expansion. [LIKELY-COVERED] (heat transfer 23, convection 23 refs)
7. Theme 7: Sound — production and propagation, characteristics (frequency, amplitude, pitch, loudness). [LIKELY-COVERED] (sound 76 refs)
8. Theme 8: Electricity — circuits, current, heating and magnetic effects, safety components (fuses, circuit breakers), electromagnet and bell. [LIKELY-COVERED] (`c8_physics_ch2` magnetic effect of current)

### Chemistry

9 themes in document order (Class VIII section lines 17395–18460):

1. Theme 1: Introduction to Chemistry — importance of chemistry in daily life, environment. [GAP]
2. Theme 2: Physical and Chemical Changes — distinguishing changes, new substances, examples from nature. [LIKELY-COVERED] (chemical change 15 refs)
3. Theme 3: Elements, Compounds and Mixtures — classification by properties, separation techniques and their principles. [LIKELY-COVERED] (`c8_chem_ch3` mixtures chapter)
4. Theme 4: Atomic Structure — atom as building block, sub-atomic structure, valency basics. [LIKELY-COVERED] (`c8_chem_ch2` atoms/molecules chapter)
5. Theme 5: Language of Chemistry — symbols (first 20 elements), valency of elements/radicals, writing formulae from valencies, chemical equations. [GAP] (valency 0 refs; chemical equation 9 incidental refs only)
6. Theme 6: Chemical Reactions — types of reactions with examples, energy changes (exothermic/endothermic; NH4Cl dissolution). [LIKELY-COVERED] (partial — chemical equation/electrolysis refs; reaction-type taxonomy thin)
7. Theme 7: Hydrogen — preparation (incl. electrolysis of water), properties, uses. [GAP] (electrolysis 4 incidental refs; no hydrogen chapter)
8. Theme 8: Water — dissolution of salts, hardness/softness, potable water. [GAP] (hard water 1 ref; no water chapter)
9. Theme 9: Carbon and its Compounds — allotropes, carbon dioxide (reactions with lime water/litmus), combustion. [GAP] (allotropes 0 refs; CO2 27 refs are biology/geography-context only)

### Biology

6 themes in document order (Class VIII section lines 19624–20565; Theme 1 "Plant Life" page at lines ~18334–18460 beside the core-concepts table):

1. Theme 1: Plant Life — leaf (venation, simple/compound, modifications for support/protection/water-loss/propagation), flower (four whorls, complete flower), fruit. [LIKELY-COVERED] (transpiration 10, photosynthesis 27, vegetative 4 refs)
2. Theme 2: Reproduction in Plants and Animals — asexual (vegetative propagation) vs sexual reproduction, pollination, fertilisation and post-fertilisation changes, reproductive organs. [LIKELY-COVERED] (reproduction 12, pollination 2, seed dispersal 2 refs — thin)
3. Theme 3: Ecosystems — biotic/abiotic components, food chains and food webs, adaptations, aquatic/terrestrial ecosystem types. [LIKELY-COVERED] (ecosystem 36 refs; `c8_physics_ch8` habitats)
4. Theme 4: Human Body — Endocrine, Circulatory and Nervous — endocrine vs exocrine glands, hormones (thyroid, adrenal, pituitary, pancreas); heart structure, double circulation, blood vessels, lymph, RBC/WBC; nervous system. [GAP] (endocrine 1, thyroid 0, pituitary 0, nervous system 1, circulatory 2 refs — incidental only)
5. Theme 5: Health and Hygiene — balanced diet, deficiency diseases, lifestyle diseases, communicable diseases (influenza, measles…) and vectors, immune system, vaccination/immunisation, first aid. [LIKELY-COVERED] (`c8_bio_ch2` health chapter; disease 34, pathogen 14, hygiene 12 refs; first-aid thin)
6. Theme 6: Food Production — agriculture, horticulture, pisciculture, apiculture, sericulture, animal husbandry, green/white revolution, scientific crop management. [GAP] (apiculture/sericulture/animal husbandry/horticulture 0 refs; only geography-layer "Agriculture" overlap)

### Computer Studies

6 topics in document order (Topic 1 page 275 at lines ~21500–21560 immediately before the CLASS - VIII header; rest at lines 21563–22150):

1. Topic 1: Operating System (OS) and Graphical User Interface (GUI) — Role and Functions — OS need/functions/types, CUI vs GUI (DOS vs Windows), single user. [GAP] (operating system 0 refs)
2. Topic 2: Spreadsheet — Functions and Charts — formulae, ranges (select/name), cell referencing (relative/absolute/mixed), sheet operations, functions (Sum, Average, Max, Min, Count), creating charts. [GAP] (spreadsheet 1 incidental ref)
3. Topic 3: Algorithms and Flowcharts — algorithm definition/characteristics/steps, flowchart symbols, problem solving up to decision making (excluding loops). [GAP] (flowchart 9 refs are maths/algebra-context only)
4. Topic 4: Program Coding. [GAP]
5. Topic 5: App Development. [GAP]
6. Topic 6: Networks — network definition/types, Internet as worldwide interconnecting system, Internet terms. [GAP] (computer network 0 refs; internet 7 incidental refs)

(Corpus group `c8_comp_cbse_86` is actually English message-writing content mislabeled as computing — not CISCE CS coverage. A parallel CISCE-aligned topic map exists at `parsed_output/class8_topic_mapping.json` (`8_cs`: Software/OS, Spreadsheet, Algorithms, Java Programming, App Development, Networks, Cloud Computing, Web Design — 27 plain-id nodes) but is not materialised in the deployed corpus.)

### Arts Education (stage-level, Classes VI–VIII)

8 themes shared across VI–VIII (not class-specific; document lines ~22160–25000): Form; Colour (hue, tint, shade); Texture; Composition (2-D/3-D space, radial/symmetrical/asymmetrical balance); Tools and Techniques (drawing, painting, printing, collage, paper crafts, clay modelling, pottery, mask making); Art (Visual Arts) Vocabulary; Art Appreciation / Responding to the Artefacts and Nature; Perspective. All [GAP] — no arts nodes in the corpus.

---

### Class 8 counts

- **Subjects covered:** 10 (English, Hindi, Mathematics, History & Civics, Geography, Physics, Chemistry, Biology, Computer Studies, Arts Education). Additional prescribed but non-chapter areas: Third Language, Physical Education/Yoga, SUPW & Community Service.
- **Total chapters/themes listed:** 68 (English 4 areas, Hindi 3 themes, Maths 6, History 8 + Civics 2, Geography 8, Physics 8, Chemistry 9, Biology 6, Computer Studies 6, Arts Education 8)
- **LIKELY-COVERED:** 42
- **GAP:** 26 (worst areas: Computer Studies 6/6 missing — entire subject; Arts Education 8/8 missing — entire subject; Chemistry 5: Introduction to Chemistry, Language of Chemistry, Hydrogen, Water, Carbon & its Compounds; Biology 2: Human Body – Endocrine/Circulatory/Nervous, Food Production; History 2: A Period of Transition, Growth of Nationalism (French/American revolutions); Civics 1: United Nations; Geography 1: Asia — The Largest Continent; Hindi 1: सुनना और बोलना)
- Subjects fully covered: Mathematics (6/6), Physics (8/8); near-full: English (4/4), Geography (7/8), History & Civics (7/10), Biology (4/6)
- Caveats: Hindi coverage rests on 18 `c8_hin_cisce` nodes in the node registry (`cbse_data/nodes/by_subject/hindi_cisce.json`) not yet materialised in `deploy/content/enhanced_nodes_md/`; a parallel CISCE-aligned mapping exists at `parsed_output/class8_topic_mapping.json` (bio/chem/cs/geo/histciv/maths/physics, 60 topics) whose plain-id nodes are not in the deployed corpus; History/Civics gaps (Renaissance, French Revolution, UN) are covered only by the solver question bank (`backend/solvers/histciv/class8_histciv_questions.py`), not corpus nodes.

Coverage annotation method: one-pass keyword/first-node sweep against the 560 `c8_*` nodes in `deploy/content/enhanced_nodes_md/` plus registry/solver cross-checks; no deep node-level audit was performed. CBSE content was not audited or modified.

---

## ICSE Class 10

Source of truth: **official CISCE ICSE 2026 Regulations & Syllabus**, fetched from cisce.org on 2026-09-23.
Master page: <https://cisce.org/regulations-and-syllabus-icse-2026/> (subject PDFs under `https://cisce.org/wp-content/uploads/2025/03/...`, cited per subject below). Prescribed textbooks for languages come from Appendix-I: `2025/03/37.-ICSE-Appendix-I-List-of-Prescribed-Books-26.pdf`.
A pre-existing internal parse (`D:\platform\backend\_archive\audits\_cisce_syllabus_data.py`, uncited provenance) was used only as a cross-check. Two corrections vs that file: its C10 "computer_science" list (Boolean Algebra, Hardware) is actually ISC content — the official ICSE C10 subject is **Computer Applications (Java)**; its Economics unit "Emergence of India as a Republic" is superseded by **Consumer Awareness** in the 2026 syllabus.

Exam pattern essentials (from the same PDFs): Group I and II subjects = 80-mark theory paper + 20-mark internal assessment. Group III electives = 100-mark theory + 100-mark internal assessment. English has two papers (Language, Literature), 80+20 each. ICSE candidates take Group I (all), Group II (any 2-3), Group III (any 1).

Coverage annotation: one-pass match against the deployed corpus `deploy/content/enhanced_nodes_md/` (`c10_<subj>_cbse_<NN>` = CBSE-aligned chapter NN). Registry-only CISCE nodes are flagged `(registry-only)` — present in `cbse_data/nodes/by_subject/hindi_cisce.json` but not materialised into `deploy/content/enhanced_nodes_md/`. No deep verification; CBSE content untouched.

### Group I (compulsory)

#### 1. English (01) — Paper 1 Language (2h, 80) + Paper 2 Literature in English (2h, 80); IA: Listening 10 + Speaking 10; Literature IA 20
Source: `https://cisce.org/wp-content/uploads/2025/03/1.-ICSE-English-26.pdf`

Paper 1 — English Language:
1. Composition (one essay, ~400-450 words) [LIKELY-COVERED — c10_comp_cbse_93 argumentative essay spine, partial]
2. Letter writing (formal / informal) [LIKELY-COVERED — c10_comp_cbse_90, c10_comp_cbse_91]
3. Functional grammar / short-answer language items [LIKELY-COVERED — c10_gram_cbse_90-95]
4. Unseen comprehension (prose passage ~500 words) [GAP]

Paper 2 — Literature in English (Class X portion):
5. Drama: Julius Caesar, Acts III-V — William Shakespeare [GAP]
6. Prose: With the Photographer — Stephen Leacock [GAP]
7. Prose: The Elevator — William Sleator [GAP]
8. Prose: The Girl Who Can — Ama Ata Aidoo [GAP]
9. Prose: The Pedestrian — Ray Bradbury [GAP]
10. Prose: The Last Lesson — Alphonse Daudet [GAP]
11. Poetry: Haunted Houses — H.W. Longfellow [GAP]
12. Poetry: The Glove and the Lions — Leigh Hunt [GAP]
13. Poetry: When Great Trees Fall — Maya Angelou [GAP]
14. Poetry: A Considerable Speck — Robert Frost [GAP]
15. Poetry: The Power of Music — Sukumar Ray [GAP]

Prose & poems 6-15 are from *Treasure Chest: A Collection of ICSE Short Stories & Poems* (Evergreen). (Class IX portion — Julius Caesar Acts I-II plus 5 stories/5 poems — is not part of the ICSE exam paper.)

#### 2. Second Language — Hindi (05) (3h, 80 + 20; Section A Language 40, Section B Prescribed Texts 40)
Source: `https://cisce.org/wp-content/uploads/2025/03/2.-ICSE-Second-Language-Indian-Languages-26.pdf` + Appendix-I. Candidates answer from only two of the three books. (Other Indian languages — Bengali, Marathi, Tamil, Kannada, etc. — follow the same paper pattern with their own texts.)

Section A — Language:
1. Composition [LIKELY-COVERED — c10_hin_cisce (लेखन कौशल) (registry-only)]
2. Letter [LIKELY-COVERED — c10_hin_cisce (लेखन कौशल) (registry-only)]
3. Comprehension (unseen passage) [LIKELY-COVERED — c10_hin_cisce (अपठित) (registry-only)]
4. Grammar, syntax, idiom [LIKELY-COVERED — c10_hin_cisce (व्याकरण) (registry-only)]

Section B — Prescribed Texts. *Sahitya Sagar* (Evergreen) — all short stories:
5. Baat Athanni Ki — Sudarshan [LIKELY-COVERED (registry-only)]
6. Kaki — Siyaram Sharan Gupta [LIKELY-COVERED (registry-only)]
7. Maha Yagya Ka Puruskar — Yashpal [LIKELY-COVERED (registry-only)]
8. Netaji Ka Chasma — Swayam Prakash [LIKELY-COVERED (registry-only)]
9. Apna Apna Bhagya — Jainendra Kumar [LIKELY-COVERED (registry-only)]
10. Bade Ghar Ki Beti — Premchand [LIKELY-COVERED (registry-only)]
11. Sandeh — Jaishankar Prasad [LIKELY-COVERED (registry-only)]
12. Bheed Me Khoya Aadmi — Leeladhar Sharma Parvatiya [LIKELY-COVERED (registry-only)]
13. Bhede Aur Bhediyen — Hari Shankar Parsai [LIKELY-COVERED (registry-only)]
14. Do Kalakar — Mannu Bhandari [LIKELY-COVERED (registry-only)]

*Sahitya Sagar* — all poems:
15. Sakhi — Kabir Das [LIKELY-COVERED (registry-only)]
16. Girdhar Ki Kundaliyan — Girdhar Kavi Rai [LIKELY-COVERED (registry-only)]
17. Swarg Bana Sakte Hai — Ramdhari Singh Dinkar [LIKELY-COVERED (registry-only)]
18. Wah Janmabhumi Meri — Sohanlal Dwivedi [LIKELY-COVERED (registry-only)]
19. Megh Aaye — Sarveshwar Dayal Saxena [LIKELY-COVERED (registry-only)]
20. Sur Ke Pad — Surdas [LIKELY-COVERED (registry-only)]
21. Vinay Ke Pad — Tulsidas [LIKELY-COVERED (registry-only)]
22. Bhichhuk — Surya Kant Tripathi 'Nirala' [LIKELY-COVERED (registry-only)]
23. Chalna Hamara Kam Hai — Shivmangal Singh 'Suman' [LIKELY-COVERED (registry-only)]
24. Matri Mandir Ki Or — Subhadra Kumari Chauhan [LIKELY-COVERED (registry-only)]

Novel (third book option):
25. Naya Raasta — Sushma Agarwal [GAP]

*Ekanki Sanchay* (Evergreen) — one-act plays (Sanskara aur Bhavna, Bahu ki Vida, Matri Bhoomi ka Man, Sukhi Dali, Mahabharat ki Ek Sanjh, Deepdan):
26. Ekanki Sanchay — 6 one-act plays [LIKELY-COVERED — 5 c10_hin_cisce nodes found (registry-only); light check]

#### 3. Second Language — Sanskrit (19) (3h, 80 + 20; Language 40 + Texts 40; IA externally moderated)
Source: `https://cisce.org/wp-content/uploads/2025/03/3.-ICSE-Second-Language-Sanskrit.pdf` (combined IX-X syllabus)
1. Composition [GAP]
2. Letter [GAP]
3. Comprehension [GAP]
4. Grammar (declensions, conjugations, sandhi, translation) [GAP]
5. Prescribed text: Sanskrit Vani Book 5 — H.D. Vijayshri & S. Bolar (Orient Longman) [GAP]

#### 4. History, Civics & Geography — Paper 1: History & Civics (2h, 80 + 20)
Source: `https://cisce.org/wp-content/uploads/2025/03/8.-ICSE-History-Civics-26.pdf`

Section A — Civics:
1. The Union Legislature (Lok Sabha, Rajya Sabha, parliamentary procedure, powers of Parliament) [GAP]
2. The Union Executive (President, Vice-President, PM & Council of Ministers) [GAP]
3. The Judiciary (Supreme Court, High Courts, Subordinate Courts, Lok Adalats) [GAP]

Section B — History:
4. The First War of Independence, 1857 (causes, consequences) [GAP]
5. Growth of Nationalism; foundation of the Indian National Congress [LIKELY-COVERED — c10_hist_cbse_02 Nationalism in India, partial]
6. First & Second Phase of the INM 1885-1916 (Moderates, Radicals, Partition of Bengal, Muslim League, Lucknow Pact) [LIKELY-COVERED — c10_hist_cbse_02, partial]
7. Mass Phase of the National Movement 1915-1947 (Non-Cooperation, Civil Disobedience, Quit India) [LIKELY-COVERED — c10_hist_cbse_02]
8. Forward Bloc and INA (Subhas Chandra Bose) [GAP]
9. Independence and Partition (Cabinet Mission, Mountbatten Plan, Indian Independence Act 1947) [GAP]
10. The Contemporary World: The First World War [GAP]
11. Rise of Dictatorships (Fascism in Italy, Nazism in Germany) [GAP]
12. The Second World War [GAP]
13. United Nations (General Assembly, Security Council, ICJ; UNICEF/WHO/UNESCO) [GAP]
14. Non-Aligned Movement (Panchsheel, Nehru) [GAP]

#### 5. History, Civics & Geography — Paper 2: Geography (2h, 80 + 20)
Source: `https://cisce.org/wp-content/uploads/2025/03/9.-ICSE-Geography-26.pdf`

Part I — Map Work:
1. Interpretation of Topographical Maps (grid references, contours, scales, settlement/drainage patterns) [GAP]
2. Map of India (mountains, rivers, passes, winds, mineral/soil/city locations) [GAP]

Part II — Geography of India:
3. Location, Extent and Physical Features [GAP]
4. Climate (temperature/rainfall distribution, monsoon mechanism, seasons) [GAP]
5. Soil Resources (alluvial/black/red/laterite; erosion and conservation) [LIKELY-COVERED — c10_geo_cbse_01 Resources and Development]
6. Natural Vegetation (forest types, conservation) [LIKELY-COVERED — c10_geo_cbse_02 Forest and Wildlife Resources]
7. Water Resources (surface/ground water, irrigation, rainwater harvesting) [LIKELY-COVERED — c10_geo_cbse_03 Water Resources]
8. Mineral and Energy Resources (iron/manganese/copper/bauxite; conventional & non-conventional energy) [LIKELY-COVERED — c10_geo_cbse_05]
9. Agriculture (farming types, rabi/kharif/zayad, crop studies) [LIKELY-COVERED — c10_geo_cbse_04]
10. Manufacturing Industries (sugar, textile, iron & steel, petrochemical, electronics) [LIKELY-COVERED — c10_geo_cbse_06]
11. Transport (roadways, railways, airways, waterways) [LIKELY-COVERED — c10_geo_cbse_07 Lifelines of National Economy]
12. Waste Management (impact, safe disposal, 3 Rs) [GAP]

### Group II (any two or three)

#### 6. Mathematics (12) (2.5h, 80 + 20)
Source: `https://cisce.org/wp-content/uploads/2025/03/12.-ICSE-Mathematics-26.pdf`

Commercial Mathematics:
1. Goods and Services Tax (GST) [GAP]
2. Banking (Recurring Deposit Accounts) [GAP]
3. Shares and Dividends [GAP]

Algebra:
4. Linear Inequations (one unknown; set notation, number line) [GAP]
5. Quadratic Equations in One Variable (nature of roots, formula) [LIKELY-COVERED — c10_math_cbse_04]
6. Ratio and Proportion (componendo/dividendo, mean proportion) [GAP]
7. Factorisation of Polynomials (Factor and Remainder Theorem, degree max 3) [GAP]
8. Matrices (2x2: order, addition/subtraction, multiplication, null/identity) [GAP]
9. Arithmetic Progression (general term, sum, applications) [LIKELY-COVERED — c10_math_cbse_05]
10. Geometric Progression (general term, sum, applications) [GAP]

Coordinate Geometry:
11. Reflection (in x=0, y=0, x=a, y=a, origin; invariant points) [GAP]
12. Section and Mid-Point Formula (incl. centroid) [LIKELY-COVERED — c10_math_cbse_07, partial]
13. Equation of a Line (slope-intercept, two-point form, parallel/perpendicular) [LIKELY-COVERED — c10_math_cbse_07, partial]

Geometry:
14. Similarity (SSS/SAS/AA, Basic Proportionality Theorem, areas, maps/models) [LIKELY-COVERED — c10_math_cbse_06 Triangles, partial]
15. Loci (theorems on loci, constructions) [GAP]
16. Circles (angle, cyclic and tangent properties; chord-tangent theorems) [LIKELY-COVERED — c10_math_cbse_10]
17. Constructions (tangents from external point; circumscribing/inscribing circles on triangle and regular hexagon) [GAP]

Mensuration, Trigonometry, Statistics, Probability:
18. Mensuration (surface area & volume: cylinder, cone, sphere; combined solids) [LIKELY-COVERED — c10_math_cbse_12]
19. Trigonometry — Identities (sin^2A+cos^2A=1 etc.) [LIKELY-COVERED — c10_math_cbse_08]
20. Trigonometry — Heights and Distances (2-D elevation/depression) [LIKELY-COVERED — c10_math_cbse_09]
21. Statistics (mean/median/mode incl. grouped data, histograms, ogive, quartiles) [LIKELY-COVERED — c10_math_cbse_13]
22. Probability (single events, sample space) [LIKELY-COVERED — c10_math_cbse_14]

#### 7. Physics (13) (2h, 80 + 20 internal practical work)
Source: `https://cisce.org/wp-content/uploads/2025/03/13.-ICSE-Physics-26.pdf`
1. Force, Work, Power and Energy (turning forces/moments, equilibrium, centre of gravity, uniform circular motion, work-energy-power, machines — levers, pulleys — conservation of energy) [GAP]
2. Light (refraction through glass block & prism, real/apparent depth, total internal reflection, lenses & lens formula, power of a lens, dispersion/spectrum, EM spectrum, scattering) [LIKELY-COVERED — c10_phy_cbse_04 Light: Reflection and Refraction; TIR/EM-spectrum partial]
3. Sound (echoes & SONAR, natural/damped/forced vibrations, resonance, loudness/pitch/quality, dB, noise pollution) [GAP]
4. Electricity and Magnetism (Ohm's law, emf & internal resistance, series/parallel, electrical power & household circuits, magnetic effect of current, DC motor, EM induction, AC generator, transformer) [LIKELY-COVERED — c10_phy_cbse_01 Electricity + c10_phy_cbse_02 Magnetic Effects; household wiring/transformer partial]
5. Heat (calorimetry: specific heat capacity, method of mixtures, latent heat of fusion) [GAP]
6. Modern Physics (nucleus, radioactivity alpha/beta/gamma, background radiation & safety, nuclear fission & fusion) [GAP]

#### 8. Chemistry (14) (2h, 80 + 20 internal practical work)
Source: `https://cisce.org/wp-content/uploads/2025/03/14.-ICSE-Chemistry-26.pdf`
1. Periodic Properties and their Variations (atomic radii, ionisation potential, electronegativity across periods/groups) [LIKELY-COVERED — c10_chem_cbse_05 Periodic Classification]
2. Chemical Bonding (electrovalent, covalent, coordinate; electron-dot structures; polar compounds) [GAP]
3. Study of Acids, Bases and Salts (definitions, ions, preparation, pH, titration, salt types) [LIKELY-COVERED — c10_chem_cbse_02]
4. Analytical Chemistry (action of NH4OH and NaOH on metal salt solutions; qualitative identification) [GAP]
5. Mole Concept and Stoichiometry (Gay-Lussac's law, vapour density, mole-mass-volume relations, equation-based calculations) [GAP]
6. Electrolysis (electrolytes, ion migration, electrode reactions, electroplating/electro-refining) [GAP]
7. Metallurgy (occurrence, extraction stages, Bayer/Hall process for aluminium, alloys) [LIKELY-COVERED — c10_chem_cbse_03 Metals and Non-metals, partial]
8. Study of Compounds: Hydrogen Chloride, Ammonia, Nitric Acid, Sulphuric Acid (preparation, properties, fountain experiment, uses) [GAP]
9. Organic Chemistry (hydrocarbons: alkanes/alkenes/alkynes; alcohols; carboxylic acids; isomerism; nomenclature; homologous series) [LIKELY-COVERED — c10_chem_cbse_04 Carbon and Its Compounds, partial]

#### 9. Biology (15) (2h, 80 + 20 internal practical work)
Source: `https://cisce.org/wp-content/uploads/2025/03/15.-ICSE-Biology-26.pdf`

Basic Biology:
1. Cell Cycle and Cell Division (mitosis, meiosis) [GAP]
2. Structure of Chromosome (DNA, genes) [GAP]
3. Genetics (Mendel's laws, monohybrid/dihybrid crosses, sex determination) [LIKELY-COVERED — c10_bio_cbse_04 Heredity and Evolution]

Plant Physiology:
4. Absorption by Roots (imbibition, diffusion, osmosis, turgor/flaccidity) [GAP]
5. Transpiration (process, significance, factors) [LIKELY-COVERED — c10_bio_cbse_01 Life Processes, plant transport, partial]
6. Photosynthesis (light/dark reactions, factors, experiments) [LIKELY-COVERED — c10_bio_cbse_01]
7. Chemical Coordination in Plants (tropisms, plant hormones) [LIKELY-COVERED — c10_bio_cbse_02 Control and Coordination]

Human Anatomy and Physiology:
8. Circulatory System (blood, heart, blood vessels, lymph) [LIKELY-COVERED — c10_bio_cbse_01]
9. Excretory System (kidney, nephron, urine formation) [LIKELY-COVERED — c10_bio_cbse_01]
10. Nervous System (neuron, CNS/PNS, reflex action, eye & ear) [LIKELY-COVERED — c10_bio_cbse_02]
11. Endocrine System (hormones, glands, feedback) [LIKELY-COVERED — c10_bio_cbse_02]
12. Reproductive System (organs, fertilisation, placenta, menstrual cycle, twins) [LIKELY-COVERED — c10_bio_cbse_03]

Ecology & Evolution:
13. Population (explosion, demography, birth/death rates, control measures) [GAP]
14. Human Evolution (Lamarck, Darwin, human ancestors) [LIKELY-COVERED — c10_bio_cbse_04]
15. Pollution (types, sources, major pollutants, biodegradable/non-biodegradable, effects) [GAP]

#### 10. Economics (16) (2h, 80 + 20)
Source: `https://cisce.org/wp-content/uploads/2025/03/16.-ICSE-Economics-26.pdf`
1. The Productive Mechanism (land, labour, capital, entrepreneur) [GAP]
2. Theory of Demand and Supply (law, elasticity) [GAP]
3. Market (forms of market) [GAP]
4. Banking in India (money, commercial banks, central bank, monetary policy, demonetisation, public finance) [LIKELY-COVERED — c10_eco_cbse_03 Money and Credit, partial]
5. Inflation (stages, types) [GAP]
6. Consumer Awareness (consumer, rights & duties, food adulteration, redressal measures) [LIKELY-COVERED — c10_eco_cbse_05 Consumer Rights]

#### 11. Commercial Studies (17) (2h, 80 + 20)
Source: `https://cisce.org/wp-content/uploads/2025/03/17.-ICSE-Commercial-Studies-26.pdf`
1. Stakeholders in Commercial Organisations [GAP]
2. Marketing and Sales [GAP]
3. Finance and Accounting (capital market, sources of raising capital) [GAP]
4. Human Resources (recruitment, selection, training) [GAP]
5. Logistics [GAP]
6. Banking (central bank, internet banking, financial fraudulent practices) [LIKELY-COVERED — c10_eco_cbse_03 Money and Credit, partial]
7. Government (Environment (Protection) Act 1986, central & state consumer commissions) [GAP]

#### 12. Environmental Science (20) (80 + 20)
Source: `https://cisce.org/wp-content/uploads/2025/03/20.-ICSE-Environmental-Science-26.pdf`
1. Controlling Air Pollution [GAP]
2. Addressing Population [GAP]
3. Managing the Urban Environment [GAP]
4. Managing Soil and Land [GAP]
5. Food [GAP]
6. Biodiversity [GAP]
7. Energy [GAP]
8. Waste [GAP]
9. Environment and Development [GAP]
10. Towards a Sustainable Future [GAP]

### Group III (any one; each 100-mark theory + 100-mark internal assessment)

#### 13. Computer Applications (21) (2h, 100 + 100) — Java (BlueJ) based
Source: `https://cisce.org/wp-content/uploads/2025/03/21.-ICSE-Computer-Applications-26.pdf`
1. Revision of Class IX syllabus (OOP concepts, Java basics) [GAP]
2. Class as the Basis of All Computation (objects, values, types, operators) [GAP]
3. User-defined Methods [GAP]
4. Constructors [GAP]
5. Library Classes (wrapper classes, Scanner, String, Math) [GAP]
6. Encapsulation (access specifiers) [GAP]
7. Arrays (1-D and 2-D; searching, sorting) [GAP]
8. String Handling [GAP]
Note: the corpus `c10_comp_cbse_90-93` nodes are writing-skill nodes (letters/report/essay), not Java — so no ICSE CA chapter is covered.

#### 14. Economic Applications (22) (2h, 100 + 100)
Source: `https://cisce.org/wp-content/uploads/2025/03/22.-ICSE-Economic-Applications-26.pdf`
1. Demand and Supply [GAP]
2. Factors of Production [GAP]
3. Alternative Market Structures [GAP]
4. The State and Economic Development [LIKELY-COVERED — c10_eco_cbse_01 Development, partial]
5. Money and Banking [LIKELY-COVERED — c10_eco_cbse_03]

#### 15. Commercial Applications (23) (2h, 100 + 100)
Source: `https://cisce.org/wp-content/uploads/2025/03/23.-ICSE-Commercial-Applications-26.pdf`
1. Understanding the Basics of Markets and Marketing [GAP]
2. Understanding Finance [GAP]
3. Understanding Human Resources [GAP]
4. Development of Public Relations (incl. consumer education, environmental ethics) [GAP]

#### 16. Environmental Applications (32) (2h, 100 + 100)
Source: `https://cisce.org/wp-content/uploads/2025/11/32.-ICSE-Environmental-Applications-26.pdf`
1. Caring for our Basic Resources (soil, air, water) [GAP]
2. Resource Use (globalisation impact, NGO role, sustainable growth, North-South divide) [GAP]
3. Appropriate Eco-friendly Technologies [GAP]
4. Initiatives I Can Take (home/school/community, career choices) [GAP]

#### 17. Home Science (26) (2h, 100 + 100)
Source: `https://cisce.org/wp-content/uploads/2025/03/26.-ICSE-Home-Science-26.pdf`
1. Home Management (management process, space, home furnishing) [GAP]
2. Growth and Development during Middle Childhood (milestones, learning difficulties) [GAP]
3. Meal Planning (family meals, hygienic food handling/storage) [GAP]
4. Selection and Care of Textiles and Clothing (fabrics, readymade garments, laundering) [GAP]
5. Communication & Extension (communication aids) [GAP]

#### 18. Physical Education (29) (2h written, 100 + 100)
Source: `https://cisce.org/wp-content/uploads/2025/03/29.-ICSE-Physical-Education.pdf`

Theory Section A:
1. Human Growth and Development [GAP]
2. Physical Education (meaning, objectives) [GAP]
3. Body Types (endomorph, mesomorph, ectomorph) [GAP]
4. Physical Fitness (components, factors) [GAP]
5. Sports Training (principles, methods) [GAP]
6. Safety in Sports (injuries, first aid, prevention) [GAP]
7. Health Education [GAP]
8. Careers in Physical Education [GAP]

Theory Section B — any two of six team games (each: knowledge, rules, fundamental skills, terminology, governing bodies, tournaments):
9. Cricket [GAP]
10. Football [GAP]
11. Hockey [GAP]
12. Basketball [GAP]
13. Volleyball [GAP]
14. Badminton [GAP]

#### 19. Yoga (30) (2h written, 100 + 100)
Source: `https://cisce.org/wp-content/uploads/2025/03/30.-ICSE-Yoga.pdf`

Paper 1 — Theory:
1. Section I Human Biology: Nervous, Endocrine, Circulatory, Excretory systems; Personal hygiene through Yoga [GAP — 5 units]
2. Section II Sages of India (Vyasa, Yagnavalkya, Narsi Mehta, Sri Aurobindo, Swami Vivekananda, Sri Ramana Maharishi) [GAP]
3. Section III Yoga Sutras of Patanjali [GAP]
4. Section IV Schools of Indian Philosophy (orthodox, heterodox, contemporary; five important sutras) [GAP]

Paper 2 — Practical (asanas, pranayama, kriyas; viva) [GAP]

#### 20. Technical Drawing Applications (31) (2h, 100 + 100)
Source: `https://cisce.org/wp-content/uploads/2025/03/31.-ICSE-Technical-Drawing-Applications-26.pdf`
1. Geometrical Constructions based on Plane Geometry [GAP]
2. Area Constructions [GAP]
3. Templates as an Application of Geometrical Constructions [GAP]
4. Scales (plain/diagonal, R.F.) [GAP]
5. Engineering Curves (ellipse, parabola) [GAP]
6. Solids (orthographic projections, development of surfaces) [GAP]
7. Oblique Drawing [GAP]
8. Sections of Right Solids [GAP]
9. Isometric Drawing [GAP]
10. Sectional Orthographic Views (1st and 3rd angle) [GAP]

#### 21. Art (24) — practical subject, four papers + course work
Source: `https://cisce.org/wp-content/uploads/2025/03/24.-ICSE-Art-26.pdf`
1. Paper 1: Drawing/Painting from Still Life [GAP]
2. Paper 2: Drawing/Painting from Nature [GAP]
3. Paper 3: Original Imaginative Composition in Colour [GAP]
4. Paper 4: Applied Art [GAP]

#### 22. Mass Media & Communication (34) (2h, 100 + 100)
Source: `https://cisce.org/wp-content/uploads/2025/03/34.-ICSE-Mass-Media-Communication-26.pdf`
1. Communication (principles, barriers, 7 Cs) [GAP]
2. Print Media and Design (newspaper/magazine anatomy, page making) [GAP]
3. Photography (photo editing) [GAP]
4. Television (history, types, broadcasting in India) [GAP]
5. Integrated Marketing Communications (direct/internet marketing, sales promotion, PR) [GAP]

### Additional prescribed subjects (chapter-level detail not inventoried — language/practical subjects)
Modern Foreign Languages (French `2025/03/5.-ICSE-French-26.pdf`, German `6.-ICSE-German-26.pdf`, Spanish `7.-ICSE-Spanish-26.pdf`; Group II/III variants `18.-...`/`33.-...`), Classical Language (`19.-ICSE-Classical-Language-26.pdf`), Performing Arts — music etc. (`25.-ICSE-Performing-Arts-26.pdf`), Cookery (`27.-ICSE-Cookery-26.pdf`), Fashion Designing (`28.-ICSE-Fashion-Designing.pdf`), Hospitality Management (`35.-ICSE-Hospitality-Management-26.pdf`), SUPW & Community Service (`36.-ICSE-SUPW-and-Community-Service-26.pdf`). All under `https://cisce.org/wp-content/uploads/2025/03/` unless noted.

### Class 10 counts

- **Subjects inventoried at chapter level:** 22 — Group I: English, Hindi (2nd Language), Sanskrit (2nd Language option), History & Civics (HCG Paper 1), Geography (HCG Paper 2); Group II: Mathematics, Physics, Chemistry, Biology, Economics, Commercial Studies, Environmental Science; Group III: Computer Applications, Economic Applications, Commercial Applications, Environmental Applications, Home Science, Physical Education, Yoga, Technical Drawing Applications, Art, Mass Media & Communication. Plus 8 further subjects listed above without chapter breakdown.
- **Total chapters/units listed:** 211 (English 15, Hindi 26, Sanskrit 5, History & Civics 14, Geography 12, Mathematics 22, Physics 6, Chemistry 9, Biology 15, Economics 6, Commercial Studies 7, Environmental Science 10, Computer Applications 8, Economic Applications 5, Commercial Applications 4, Environmental Applications 4, Home Science 5, Physical Education 14, Yoga 5, Technical Drawing Applications 10, Art 4, Mass Media 5)
- **LIKELY-COVERED:** 70 (Hindi 25 — all registry-only, Mathematics 11, Biology 10, Geography 7, Chemistry 4, English 3 — all Language skills, History & Civics 3, Physics 2, Economics 2, Economic Applications 2, Commercial Studies 1)
- **GAP:** 141 — entire subjects with zero coverage: Sanskrit, Environmental Science, Computer Applications, Commercial Applications, Environmental Applications, Home Science, Physical Education, Yoga, Technical Drawing Applications, Art, Mass Media & Communication; near-zero: Commercial Studies (1/7). Structural gaps in core subjects: ICSE-specific Mathematics (GST, Banking, Shares, Matrices, Loci, GP, Reflection, Factor Theorem), Physics (Force/Machines unit, Sound, Calorimetry, Radioactivity), Chemistry (Bonding, Analytical Chemistry, Mole Concept, Electrolysis, Study of Compounds), all ICSE Literature texts (Julius Caesar, Treasure Chest), and Civics/Contemporary-World history units. The only substantive CISCE-specific stock is Hindi (37 `c10_hin_cisce` nodes in `cbse_data/nodes/by_subject/hindi_cisce.json`, still absent from the deployed corpus).
- Caveats: coverage marks are one-pass keyword matches against CBSE-aligned corpus chapters — a LIKELY-COVERED tag does not assert topic-level completeness (ICSE depth on Circles, Coordinate Geometry, Organic Chemistry, etc. typically exceeds the matching CBSE chapter). Hindi marks rely on the node registry, not deployed files. Chapter lists reflect the ICSE 2026 regulations page fetched 2026-09-23; CISCE amendment circulars (`Amendments-ICSE-Year-2026-Regulations.pdf`) should be checked before shipping content.

---

## ISC Class 11

**Subjects inventoried: 19** (council-listed electives not inventoried unit-wise: Physical Education, Hindi, Mass Media Studies, Art/music practicals).

**Source of truth:** CISCE official ISC syllabi (cisce.org — ISC Regulations & Syllabuses; the site blocks bots, so full text was fetched via mirrors). Primary mirror: `https://oswalpublishers.com/syllabus/isc-class-11/<subject>/` (fetched per subject — English I/II, Physics, Chemistry, Biology, Mathematics, History, Political Science, Geography, Economics, Accountancy, Business Studies, Commerce, Computer Science, Sociology, Psychology). Legal Studies, Environmental Science, Home Science, Biotechnology verified via shaalaa / byjus / scribd / collegedekho mirrors of the CISCE PDFs (search-verified). The platform-local parse `D:\platform\backend\_archive\audits\_cisce_syllabus_data.py` (classes "11"/"12") was used as a cross-check — its STEM chapter lists match the official syllabus, but its History/Political Science/Economics/Business Studies/Psychology entries were CBSE-derived and were superseded by the official fetches above.

**Coverage annotation:** light one-pass match against the deployed corpus `deploy/content/enhanced_nodes_md/`, chapter partition per `D:\platform\parsed_output\class11_topic_mapping.json` (corpus subject keys cited as `11_<subj>`). No deep node audit; CBSE content untouched.

### English (compulsory: two papers) (801/802)
*Exam pattern:* Paper I Language: theory 80 (3h) + project 20 (listening + speaking). Paper II Literature: theory 80 (3h) + project 20 (1,000–1,500-word assignment).
*Source:* oswalpublishers.com/syllabus/isc-class-11/english-i-language/ and .../english-ii-literature/ (fetched).

1. Language — Composition (narrative/descriptive/reflective/argumentative/discursive/short story, 400–450 words) [LIKELY-COVERED — c11_comp writing-skills nodes]
2. Language — Directed Writing (article, review, speech, report, statement of purpose; 250–300 words) [LIKELY-COVERED — c11_comp]
3. Language — Proposal Writing (CISCE format) [LIKELY-COVERED — c11_comp]
4. Language — Grammar, Structure and Usage (transformation, phrasal verbs, tenses) [LIKELY-COVERED — c11_gram]
5. Language — Comprehension + summary (approx. 700-word passage) [LIKELY-COVERED — c11_comp]
6. Literature — Drama: Shakespeare, *Macbeth* (Acts I–II) [GAP]
7. Literature — Short stories, *Prism* (Evergreen): A Living God — Lafcadio Hearn; Advice to Youth — Mark Twain; The Paper Menagerie — Ken Liu; The Great Automatic Grammatizator — Roald Dahl; Thank You Ma'am — Langston Hughes [GAP]
8. Literature — Poems, *Rhapsody* (Evergreen): Abhisara – The Tryst — Tagore; Why I Like the Hospital — Hoagland; Sonnet 116 — Shakespeare; Death of a Naturalist — Heaney; Strange Meeting — Owen [GAP]

Subtotal: 8 units — 5 LIKELY-COVERED, 3 GAP.

### Physics (861)
*Exam pattern:* Paper I theory 70 (3h) + practical 15 + project 10 + practical file 5. Weights: Units 1–3: 23, Units 4–6: 17, Units 7–9: 20, Unit 10: 10.
*Source:* oswalpublishers.com/syllabus/isc-class-11/physics/ (fetched).

1. Physical World and Measurement [LIKELY-COVERED — `11_physics`]
2. Kinematics [LIKELY-COVERED]
3. Laws of Motion [LIKELY-COVERED]
4. Work, Energy and Power [LIKELY-COVERED]
5. Motion of System of Particles and Rigid Body [LIKELY-COVERED — corpus "Rotational Motion"]
6. Gravitation [LIKELY-COVERED]
7. Properties of Bulk Matter [LIKELY-COVERED — corpus "Elasticity and Fluid Mechanics" + "Surface Tension and Capillarity"]
8. Heat and Thermodynamics [LIKELY-COVERED — corpus "Thermal Properties and Heat Transfer" + "Thermodynamics"]
9. Behaviour of Perfect Gases and Kinetic Theory [LIKELY-COVERED — corpus "Kinetic Theory of Gases"]
10. Oscillations and Waves [LIKELY-COVERED — corpus "Oscillations" + "Wave Motion"]

Subtotal: 10 units — 10 LIKELY-COVERED, 0 GAP.

### Chemistry (862)
*Exam pattern:* Paper I theory 70 (3h) + practical 15 + project 10 + practical file 5. Physical 41 / Inorganic 6 / Organic 23.
*Source:* oswalpublishers.com/syllabus/isc-class-11/chemistry/ (fetched).

1. Some Basic Concepts of Chemistry [LIKELY-COVERED — `11_chem`]
2. Structure of Atom [LIKELY-COVERED]
3. Classification of Elements and Periodicity [LIKELY-COVERED]
4. Chemical Bonding and Molecular Structure [LIKELY-COVERED]
5. Chemical Thermodynamics [LIKELY-COVERED]
6. Equilibrium [LIKELY-COVERED]
7. Redox Reactions [LIKELY-COVERED]
8. Organic Chemistry — Basic Principles and Techniques [LIKELY-COVERED]
9. Hydrocarbons [LIKELY-COVERED]

Subtotal: 9 units — 9 LIKELY-COVERED, 0 GAP.

### Biology (863)
*Exam pattern:* Paper I theory 70 (3h) + practical 15 + project 10 + practical file 5. Weights: 9/11/15/17/18.
*Source:* oswalpublishers.com/syllabus/isc-class-11/biology/ (fetched).

1. Diversity of Living Organisms [LIKELY-COVERED — `11_bio`]
2. Structural Organisation in Animals and Plants [LIKELY-COVERED]
3. Cell: Structure and Function [LIKELY-COVERED — corpus "Cell Biology and Biomolecules"]
4. Plant Physiology [LIKELY-COVERED]
5. Human Physiology [LIKELY-COVERED]

Subtotal: 5 units — 5 LIKELY-COVERED, 0 GAP.

### Mathematics (851 MATH)
*Exam pattern:* Paper I theory 80 (3h) + Paper II project 20 (two projects, 10 each). Weights: 18/26/20/8/7.
*Source:* oswalpublishers.com/syllabus/isc-class-11/mathematics/ (fetched).

1. Sets and Functions (sets, relations and functions, trigonometry) [LIKELY-COVERED — `11_maths` "Sets", "Relations and Functions", "Trigonometry"]
2. Algebra (complex numbers, quadratics and inequalities, permutations and combinations, binomial theorem, sequence and series) [LIKELY-COVERED — 5 corpus topics]
3. Coordinate Geometry (straight lines, circles, conic sections, intro to 3-D geometry) [LIKELY-COVERED — 4 corpus topics]
4. Calculus (limits and derivatives) [LIKELY-COVERED]
5. Statistics and Probability [LIKELY-COVERED]

Subtotal: 5 units — 5 LIKELY-COVERED, 0 GAP.

### History (851 HIS)
*Exam pattern:* Paper I theory 80 (3h) + Paper II project 20 (800–1,500-word essay). Section A Indian History / Section B World History.
*Source:* oswalpublishers.com/syllabus/isc-class-11/history/ (fetched).

1. Emergence of the Colonial Economy [LIKELY-COVERED — `11_histciv` "Colonial Economy and Transport"]
2. Social Movements (anti-caste struggle, women's question) [LIKELY-COVERED — "Social Reform Movements"]
3. Protest Movements against Colonial Rule (Indigo, Deccan, Munda) [LIKELY-COVERED — "Peasant and Tribal Protest Movements"]
4. Growth of Nationalism (Swadeshi, Muslim League) [LIKELY-COVERED — "Partition of Bengal and Muslim League"]
5. Gandhian Nationalism 1916–1922 (Rowlatt, Khilafat, Non-Cooperation) [LIKELY-COVERED — "Rowlatt Act to Non-Cooperation Movement"]
6. Gandhian Nationalism 1927–1937 (Poorna Swaraj, Civil Disobedience, GoI Act 1935) [LIKELY-COVERED — "Civil Disobedience and Constitutional Developments"]
7. World War I: causes and peace settlements [LIKELY-COVERED]
8. The Great Depression and the New Deal [LIKELY-COVERED]
9. Rise of Communism under Stalin (1928–39) [LIKELY-COVERED — "The Russian Revolution"]
10. Rise of Fascism under Mussolini (1919–39) [LIKELY-COVERED]
11. Rise of Nazism under Hitler (1933–39) [LIKELY-COVERED]
12. Rise of Militarism in Japan (1919–37) [LIKELY-COVERED]

Subtotal: 12 units — 12 LIKELY-COVERED, 0 GAP.

### Political Science (851 POL)
*Exam pattern:* Paper I theory 80 (3h) + Paper II project 20. Section A Political Theory / Section B Contemporary International Relations.
*Source:* oswalpublishers.com/syllabus/isc-class-11/political-science/ (fetched).

1. Introduction to Political Science [LIKELY-COVERED — `11_pol`]
2. The Origin of the State (divine theory; social contract of Hobbes, Locke, Rousseau) [LIKELY-COVERED]
3. Political Ideologies (liberalism, communism) [LIKELY-COVERED]
4. Sovereignty [LIKELY-COVERED]
5. Law [LIKELY-COVERED]
6. Liberty [LIKELY-COVERED — corpus folds 6–8 into "Liberty, Equality and Justice"]
7. Equality [LIKELY-COVERED]
8. Justice (Rawls, Sen) [LIKELY-COVERED]
9. Disintegration of the Soviet Union [LIKELY-COVERED]
10. Unipolar World (Iraq, Afghanistan, India–USA) [LIKELY-COVERED — corpus "US Unilateralism"]
11. Regional Cooperation (ASEAN, EU, SAARC, BRICS, QUAD) [LIKELY-COVERED]
12. South Asia (India–Pakistan, Bangladesh, China) [LIKELY-COVERED — corpus "India Foreign Relations"]

Subtotal: 12 units — 12 LIKELY-COVERED, 0 GAP.

### Geography (851 GEO)
*Exam pattern:* Paper I theory 70 (3h) + Paper II practical 15 + project 15.
*Source:* oswalpublishers.com/syllabus/isc-class-11/geography/ (fetched).

1. Geography as a Discipline [LIKELY-COVERED — `11_geo`]
2. Formation of the Earth [LIKELY-COVERED — "Geomorphology"]
3. Changing Face of the Earth — landforms and gradation [LIKELY-COVERED — "Geomorphology"]
4. Atmosphere [LIKELY-COVERED — "Climatology"]
5. The Realms of Water [LIKELY-COVERED — "Oceanography"]
6. Biosphere — Life on the Earth [LIKELY-COVERED — "Biogeography"]
7. Map Work [LIKELY-COVERED]

Subtotal: 7 units — 7 LIKELY-COVERED, 0 GAP.

### Economics (851 ECO)
*Exam pattern:* Paper I theory 80 (3h) + Paper II project 20 (two projects, 10 each).
*Source:* oswalpublishers.com/syllabus/isc-class-11/economics/ (fetched).

1. Understanding Economics (definitions, micro/macro, basic problems and PPC, types of economies) [LIKELY-COVERED — 4 corpus topics in `11_econ`]
2. Indian Economic Development (post-liberalisation, HDI, planning and NITI Aayog, challenges, sustainable development) [LIKELY-COVERED — 2 corpus topics]
3. Statistics (collection/organisation/presentation, central tendency, dispersion, correlation, index numbers, mathematical tools) [LIKELY-COVERED — 6 corpus topics]

Subtotal: 3 units — 3 LIKELY-COVERED, 0 GAP.

### Accounts / Principles of Accounting (851 ACC)
*Exam pattern:* Paper I theory 80 (3h) + Paper II project 20 (two projects).
*Source:* oswalpublishers.com/syllabus/isc-class-11/accountancy/ (fetched).

1. Introduction to Accounting [LIKELY-COVERED — `11_acc`]
2. Journal, Ledger and Trial Balance (incl. subsidiary books, GST entries) [LIKELY-COVERED — 3 corpus topics]
3. Bank Reconciliation Statement [LIKELY-COVERED]
4. Depreciation (SLM and WDV) [LIKELY-COVERED]
5. Bills of Exchange [LIKELY-COVERED]
6. Accounting Concepts (GAAP, IFRS, accounting standards) [LIKELY-COVERED — "GAAP and Accounting Standards"]
7. Final Accounts (sole trader, with/without adjustments) [LIKELY-COVERED — 2 corpus topics]
8. Rectification of Errors [LIKELY-COVERED]
9. Non-Trading Organisation [LIKELY-COVERED — "Not-for-Profit Organisations"]

Subtotal: 9 units — 9 LIKELY-COVERED, 0 GAP.

### Business Studies (854)
*Exam pattern:* Paper I theory 80 (3h) + Paper II project 20 (two projects).
*Source:* oswalpublishers.com/syllabus/isc-class-11/business-studies/ (fetched).

1. Business Environment (features, importance, PESTLE, Porter, SWOT) [LIKELY-COVERED — partial overlap: `11_bs` "Business Fundamentals"]
2. Entrepreneurship (types, intrapreneurship, enterprise, business risks) [GAP]
3. Managers and Managerial Roles (Mintzberg, authority, change management) [GAP]
4. Automation at Workplaces (productivity tools by sector) [GAP]

Subtotal: 4 units — 1 LIKELY-COVERED, 3 GAP.

### Commerce (850)
*Exam pattern:* Paper I theory 80 (3h) + Paper II project 20 (two projects). Weights: 10/25/5/5/5/10/10/10.
*Source:* oswalpublishers.com/syllabus/isc-class-11/commerce/ (fetched).

1. Nature and Purpose of Business [LIKELY-COVERED — `11_comm` "Business Fundamentals"]
2. Forms of Business Organisation [LIKELY-COVERED]
3. Social Responsibility of Business and Business Ethics [LIKELY-COVERED]
4. Emerging Modes of Business (e-business, e-commerce, q-commerce) [LIKELY-COVERED]
5. Stock Exchange (BSE, NSE, SEBI, demat) [LIKELY-COVERED]
6. Trade (wholesale, retail, home-trade documents) [LIKELY-COVERED]
7. Foreign Trade (export/import procedure and documents, WTO) [LIKELY-COVERED]
8. Insurance [LIKELY-COVERED]

Subtotal: 8 units — 8 LIKELY-COVERED, 0 GAP.

### Computer Science (868)
*Exam pattern:* Paper I theory 70 (3h) + Paper II practical 30 (visiting examiner; 20+ assignments and project). Sections A hardware/logic, B Java, C Python/trends.
*Source:* oswalpublishers.com/syllabus/isc-class-11/computer-science/ (fetched).

1. Numbers (bases, complement arithmetic) [LIKELY-COVERED — `11_cs` "Computer Architecture and Boolean Algebra"]
2. Encodings (integer/real, ASCII, ISCII, Unicode) [LIKELY-COVERED]
3. Propositional Logic, gates, half/full adders [LIKELY-COVERED]
4. Programming in Java (objects, types, statements, methods, ethics, arrays, strings, file I/O) [LIKELY-COVERED — 6 corpus Java topics]
5. Introduction to Python [GAP — corpus is Java-centric]
6. Trends in Computing and Ethical Issues (AI, IoT, cyber security, licensing) [LIKELY-COVERED — "Networks and Web Technologies", partial]

Subtotal: 6 units — 5 LIKELY-COVERED, 1 GAP.

### Sociology (851 SOC)
*Exam pattern:* Paper I theory 70 (3h) + Paper II project 30 (two studies, 15 each).
*Source:* oswalpublishers.com/syllabus/isc-class-11/sociology/ (fetched).

1. Origin and Development of Sociology and Anthropology (Comte, Spencer, Durkheim, Weber, Marx) [LIKELY-COVERED — 3 corpus topics in `11_soc`]
2. Research Methodology [LIKELY-COVERED — "Social Research"]
3. Basic Concepts (society, socialization, culture) [LIKELY-COVERED — 2 corpus topics]
4. Social Structure (groups, status and role, social processes) [LIKELY-COVERED — 3 corpus topics]
5. Social Problems [LIKELY-COVERED]
6. Indian Sociologists (Mukherjee, Ghurye, Bose, Karve, Srinivas) [LIKELY-COVERED — "Indian Sociological Thinkers"]

Subtotal: 6 units — 6 LIKELY-COVERED, 0 GAP.

### Psychology (852)
*Exam pattern:* Paper I theory 70 (3h) + Paper II practical 30 (two studies, 15 each).
*Source:* oswalpublishers.com/syllabus/isc-class-11/psychology/ (fetched).

1. The Subject Psychology (schools, fields, heredity and environment) [LIKELY-COVERED — `11_psy`]
2. Methods of Psychology [LIKELY-COVERED]
3. Attention and Perception [LIKELY-COVERED]
4. Emotions and Motivation [LIKELY-COVERED]
5. Learning [LIKELY-COVERED]
6. Remembering and Forgetting [LIKELY-COVERED]
7. Thinking, Problem Solving and Creativity [LIKELY-COVERED]

Subtotal: 7 units — 7 LIKELY-COVERED, 0 GAP.

### Home Science (864)
*Exam pattern:* Paper I theory 70 (3h) + Paper II practical 30.
*Source:* CISCE Home Science (864) syllabus via shaalaa.com / brainbuildhub.com mirror of the CISCE PDF (search-verified).

1. Concept and Scope of Home Science [LIKELY-COVERED — `11_home` "Introduction to Home Science"]
2. Food, Nutrition, Health and Fitness [LIKELY-COVERED — "Food and Nutrition" + "Food Spoilage and Preservation"]
3. Resource Management [LIKELY-COVERED]
4. Human Development [LIKELY-COVERED — "Human Development and Personality"]
5. Textiles and Clothing [LIKELY-COVERED — "Textile and Laundry"]
6. Communication and Extension [LIKELY-COVERED — "Communication"]

Subtotal: 6 units — 6 LIKELY-COVERED, 0 GAP.

### Biotechnology (878)
*Exam pattern:* Paper I theory 70 (3h) + Paper II practical/project 30.
*Source:* CISCE Biotechnology (878) syllabus via byjus.com / scribd / extramarks mirrors (search-verified; unit granularity reconciled).

1. Introduction to Biotechnology [LIKELY-COVERED — `11_biotech`]
2. Biochemistry and Biomolecules [LIKELY-COVERED]
3. Cell Biology and Cell Division [LIKELY-COVERED]
4. Growth and Development in Living Beings [LIKELY-COVERED — corpus cell/biochemistry topics]
5. Genetics [LIKELY-COVERED — "Genetics and Cancer"]
6. Tissue Culture, Analytical and Lab Techniques [LIKELY-COVERED — "Cell Culture and Laboratory Techniques" + "Bioanalytical Techniques"]

Subtotal: 6 units — 6 LIKELY-COVERED, 0 GAP.

### Legal Studies (812; older code 881/895)
*Exam pattern:* Paper I theory 70 (3h) + Paper II project work 30.
*Source:* CISCE Legal Studies syllabus (35-ISC-Legal-Studies) via scribd / EBC / ResearchGate mirrors (search-verified). Platform teaching nodes: `D:\platform\parsed_output\c11_legal_extract.json` — 30 nodes authored from the ISC syllabus (Law in Ancient India … Right to Constitutional Remedies).

1. Historical Evolution of the Indian Legal System (ancient Dharma, medieval, British) [LIKELY-COVERED — `11_legal` "Historical Evolution of Indian Law"]
2. Law and Jurisprudence / Semantics of Law [LIKELY-COVERED — "Foundations of Law and Jurisprudence"]
3. Constitution of India (constitutionalism, fundamental rights) [LIKELY-COVERED — "Constitutional Law — Fundamental Rights"]
4. Concept of Legal Personality (natural/legal persons, partnership, company) [LIKELY-COVERED — "Commercial Law — Partnership and Company"]
5. Criminal Law and its Processes (courts, punishment, IPC offences) [LIKELY-COVERED — "Criminal Law and Justice System"]
6. Civil Law — Civil Procedure and Law of Torts [LIKELY-COVERED — "Law of Torts and Civil Procedure"]
7. Family Law (HMA, maintenance, adoption, domestic violence) [LIKELY-COVERED]

Subtotal: 7 units — 7 LIKELY-COVERED, 0 GAP.

### Environmental Science (899)
*Exam pattern:* Paper I theory 70 (3h) + Paper II project 30.
*Source:* CISCE EVS (899) 2025-26 revised syllabus via shaalaa.com / jagranjosh mirrors (search-verified).

1. Modes of Existence (foundation of EVS, human-environment relationship) [LIKELY-COVERED — 2 corpus topics in `11_evs`]
2. Ecology (ecosystems, energy flow, nutrient cycles) [LIKELY-COVERED]
3. Pollution and Environmental Degradation [LIKELY-COVERED]
4. Legal Regimes for Sustainable Development [LIKELY-COVERED — "Environmental Law and Policy"]
5. Technology and Environment [LIKELY-COVERED — "Technology, Energy and Health"]
6. Design and Planning for Conservation [LIKELY-COVERED — "Ecosystem Analysis and Design of Solutions"]

Subtotal: 6 units — 6 LIKELY-COVERED, 0 GAP.

### Class 11 counts

- **Subjects:** 19 (English, Physics, Chemistry, Biology, Mathematics, History, Political Science, Geography, Economics, Accounts, Business Studies, Commerce, Computer Science, Sociology, Psychology, Home Science, Biotechnology, Legal Studies, Environmental Science)
- **Total chapters/units listed:** 136
- **LIKELY-COVERED:** 129
- **GAP:** 7 (English Literature — all prescribed texts: Macbeth Acts I–II, Prism stories, Rhapsody poems; Business Studies — Entrepreneurship, Managers and Managerial Roles, Automation at Workplaces; Computer Science — Introduction to Python)

---

## ISC Class 12

**Subjects inventoried: 19** (same elective carve-outs as Class 11).

**Source of truth:** CISCE official ISC syllabi (cisce.org — bot-blocked; full text fetched via `https://oswalpublishers.com/syllabus/isc-class-12/<subject>/` for English I/II, Physics, Chemistry, Biology, Mathematics, History, Political Science, Geography, Economics, Accountancy, Business Studies, Commerce, Computer Science, Sociology, Psychology). Legal Studies (881, revised 2026), EVS (899), Home Science (864), Biotechnology (878) verified via collegedekho / shaalaa / byjus / scribd mirrors of the CISCE PDFs (search-verified). The platform-local parse `backend/_archive/audits/_cisce_syllabus_data.py` class "12" was superseded for History (it carried NCERT "Themes in Indian History" chapters — Bricks Beads and Bones etc. — which are not ISC; the corpus `12_histciv` topics match the official ISC list).

**Coverage annotation:** light one-pass match against `deploy/content/enhanced_nodes_md/`, chapter partition per `D:\platform\parsed_output\class12_topic_mapping.json` (corpus keys `12_<subj>`). No deep node audit; CBSE content untouched.

### English (compulsory: two papers) (801/802)
*Exam pattern:* Paper I Language: theory 80 (3h) + project 20 (listening 5 + speaking 5 + writing 10, visiting examiner). Paper II Literature: theory 80 (3h) + project 20.
*Source:* oswalpublishers.com/syllabus/isc-class-12/english-1-language/ and .../english-2-literature/ (fetched).

1. Language — Composition (400–450 words) [LIKELY-COVERED — c12_comp / c12_gram corpus dirs]
2. Language — Directed Writing + Proposal Writing [LIKELY-COVERED]
3. Language — Grammar, Structure and Usage [LIKELY-COVERED]
4. Language — Comprehension + summary [LIKELY-COVERED]
5. Language — Project writing skills (approx. 500-word piece) [LIKELY-COVERED]
6. Literature — Drama: Shakespeare, *Macbeth* (Acts III–V) [GAP]
7. Literature — Short stories, *Prism*: Atithi/Guest — Tagore; The Cookie Lady — Philip K. Dick; There Will Come Soft Rains — Ray Bradbury; Indigo — Satyajit Ray; The Medicine Bag — Virginia Driving Hawk Sneve [GAP]
8. Literature — Poems, *Rhapsody*: Telephone Conversation — Soyinka; Tithonus — Tennyson; Beethoven — Koyczan; Small Towns and the River — Mamang Dai; Death be not Proud — Donne [GAP]

Subtotal: 8 units — 5 LIKELY-COVERED, 3 GAP.

### Physics (861)
*Exam pattern:* Paper I theory 70 (3h) + practical 15 + project 10 + practical file 5.
*Source:* oswalpublishers.com/syllabus/isc-class-12/physics/ (fetched).

1. Electrostatics [LIKELY-COVERED — `12_physics`]
2. Current Electricity [LIKELY-COVERED]
3. Magnetic Effects of Current and Magnetism [LIKELY-COVERED]
4. Electromagnetic Induction and Alternating Currents [LIKELY-COVERED]
5. Electromagnetic Waves [LIKELY-COVERED]
6. Optics (ray + wave) [LIKELY-COVERED]
7. Dual Nature of Radiation and Matter [LIKELY-COVERED]
8. Atoms and Nuclei [LIKELY-COVERED]
9. Electronic Devices [LIKELY-COVERED]

Subtotal: 9 units — 9 LIKELY-COVERED, 0 GAP.

### Chemistry (862)
*Exam pattern:* Paper I theory 70 (3h) + practical 15 + project 10 + practical file 5.
*Source:* oswalpublishers.com/syllabus/isc-class-12/chemistry/ (fetched).

1. Solutions [LIKELY-COVERED — `12_chem`]
2. Electrochemistry [LIKELY-COVERED]
3. Chemical Kinetics [LIKELY-COVERED]
4. d- and f-Block Elements [LIKELY-COVERED]
5. Coordination Compounds [LIKELY-COVERED]
6. Haloalkanes and Haloarenes [LIKELY-COVERED]
7. Alcohols, Phenols and Ethers [LIKELY-COVERED]
8. Aldehydes, Ketones and Carboxylic Acids [LIKELY-COVERED]
9. Organic Compounds containing Nitrogen [LIKELY-COVERED — corpus "Amines and Diazonium Salts"]
10. Biomolecules [LIKELY-COVERED]

Subtotal: 10 units — 10 LIKELY-COVERED, 0 GAP.

### Biology (863)
*Exam pattern:* Paper I theory 70 (3h) + practical 15 + project 10 + practical file 5.
*Source:* oswalpublishers.com/syllabus/isc-class-12/biology/ (fetched).

1. Reproduction (flowering plants, human, reproductive health) [LIKELY-COVERED — 3 corpus topics in `12_bio`]
2. Genetics and Evolution (inheritance, molecular basis, evolution) [LIKELY-COVERED — 3 corpus topics]
3. Biology and Human Welfare (health and disease, microbes) [LIKELY-COVERED — 2 corpus topics]
4. Biotechnology and its Applications [LIKELY-COVERED]
5. Ecology and Environment (populations, ecosystem, biodiversity) [LIKELY-COVERED — 3 corpus topics]

Subtotal: 5 units — 5 LIKELY-COVERED, 0 GAP.

### Mathematics (851 MATH)
*Exam pattern:* Paper I theory 80 (3h) + Paper II project 20. Section A (units 1–4) + Section B (units 5–7); no Section C in the current syllabus.
*Source:* oswalpublishers.com/syllabus/isc-class-12/mathematics/ (fetched).

1. Relations and Functions (incl. inverse trigonometric functions) [LIKELY-COVERED — `12_maths`]
2. Algebra: Matrices and Determinants [LIKELY-COVERED]
3. Calculus (continuity and differentiability, applications of derivatives, integrals, differential equations) [LIKELY-COVERED]
4. Probability (conditional, Bayes, random variables) [LIKELY-COVERED]
5. Vectors (Section B) [LIKELY-COVERED — "Vector Algebra"]
6. Three-Dimensional Geometry (Section B) [LIKELY-COVERED]
7. Linear Programming (Section B) [LIKELY-COVERED]

Subtotal: 7 units — 7 LIKELY-COVERED, 0 GAP.

### History (851 HIS)
*Exam pattern:* Paper I theory 80 (3h) + Paper II project 20. Section A Indian History / Section B World History.
*Source:* oswalpublishers.com/syllabus/isc-class-12/history/ (fetched).

1. Towards Independence and Partition: The Last Phase (1939–47) [LIKELY-COVERED — `12_histciv` "Towards Independence and Partition (1940-1947)"]
2. Establishment of Indian Democracy (1947–66) [LIKELY-COVERED]
3. Development of Indian Democracy 1964–77 (Shastri, 1967 election, Naxal, JP Movement, Emergency) [LIKELY-COVERED — "India's Internal Challenges (1965-1986)"]
4. Changing Face of the Indian Democracy 1977–86 (Janata, Punjab, Assam, North-East) [LIKELY-COVERED — "India's Internal Challenges (1965-1986)"]
5. India's Foreign Policy (Indo-Pak wars, Sino-Indian war) [LIKELY-COVERED — "India's External Relations"]
6. Movements for Women's Rights (Towards Equality, anti-dowry) [LIKELY-COVERED]
7. World War II (causes, appeasement, Axis defeat) [LIKELY-COVERED]
8. De-colonisation in Asia (China) and Africa (Ghana, Kenya) [LIKELY-COVERED]
9. Cold War (1945–91): origin, end, impact [LIKELY-COVERED]
10. Protest Movements (US civil rights, anti-apartheid, second-wave feminism) [LIKELY-COVERED — "Civil Rights and Anti-Apartheid Movements"]
11. Middle East: Israeli-Palestine Conflict (1916–1993) [LIKELY-COVERED — "The Middle East"]

Subtotal: 11 units — 11 LIKELY-COVERED, 0 GAP.

### Political Science (851 POL)
*Exam pattern:* Paper I theory 80 (3h) + Paper II project 20. Section A Constitution and Government / Section B Indian Democracy.
*Source:* oswalpublishers.com/syllabus/isc-class-12/political-science/ (fetched).

1. Forms of Government [LIKELY-COVERED — `12_pol`]
2. Constitution (written/unwritten, rigid/flexible; UK/USA/India amendment procedures) [LIKELY-COVERED — "Constitution and Amendment Procedures"]
3. Franchise and Representation [LIKELY-COVERED]
4. The Legislature (India vs USA) [LIKELY-COVERED]
5. The Executive [LIKELY-COVERED]
6. The Judiciary (judicial review, Supreme Courts) [LIKELY-COVERED]
7. Indian Constitution (preamble, salient features) [LIKELY-COVERED — "The Indian Constitution"]
8. Fundamental Rights and Directive Principles [LIKELY-COVERED — folded in corpus "The Indian Constitution"]
9. Local Self-Government (73rd/74th Amendments) [LIKELY-COVERED — "Local Government"]
10. Democracy in India — Challenges (caste, communalism, regionalism, violence) [LIKELY-COVERED — "Challenges to Indian Democracy"]

Subtotal: 10 units — 10 LIKELY-COVERED, 0 GAP.

### Geography (851 GEO)
*Exam pattern:* Paper I theory 70 (3h) + Paper II practical 15 + project 15.
*Source:* oswalpublishers.com/syllabus/isc-class-12/geography/ (fetched).

1. Physical Environment (location, structure, drainage, climate, natural vegetation) [LIKELY-COVERED — 4 corpus topics in `12_geo`]
2. Population and Human Settlements [LIKELY-COVERED — 2 corpus topics]
3. Resources of India and their Utilisation (land, water, agriculture, fishing, energy) [LIKELY-COVERED — 3 corpus topics]
4. Infrastructural Resources (transport and communication) [LIKELY-COVERED]
5. Industries [LIKELY-COVERED]
6. Regional Economic Development (case studies: Chhattisgarh, Bengaluru electronics, Haldia) [GAP]
7. Map Work [LIKELY-COVERED]

Subtotal: 7 units — 6 LIKELY-COVERED, 1 GAP.

### Economics (851 ECO)
*Exam pattern:* Paper I theory 80 (3h) + Paper II project 20 (two projects).
*Source:* oswalpublishers.com/syllabus/isc-class-12/economics/ (fetched).

1. Micro Economic Theory (demand, utility, elasticity, supply, market mechanism, production and costs, market forms) [LIKELY-COVERED — 7 corpus topics in `12_econ`]
2. Theory of Income and Employment (Keynesian; multiplier; excess/deficient demand) [LIKELY-COVERED — 2 corpus topics]
3. Money and Banking (money supply, inflation, commercial and central banking) [LIKELY-COVERED — 4 corpus topics]
4. Balance of Payment and Exchange Rate [LIKELY-COVERED]
5. Public Finance (fiscal policy, government budget and deficits) [LIKELY-COVERED — "Government Budget" corpus topic]
6. National Income (circular flow, concepts, measurement methods) [LIKELY-COVERED — "National Income" corpus topic]

Subtotal: 6 units — 6 LIKELY-COVERED, 0 GAP.

### Accounts / Principles of Accounting (851 ACC)
*Exam pattern:* Paper I theory 80 (3h) + Paper II project 20. Section A partnership/company, Section B management accounting, Section C computerised accounting.
*Source:* oswalpublishers.com/syllabus/isc-class-12/accountancy/ (fetched).

1. Partnership Accounts (fundamentals, goodwill, admission/retirement/death/dissolution) [LIKELY-COVERED — 3 corpus topics in `12_acc`]
2. Joint Stock Company Accounts (shares, debentures, redemption, final accounts per Schedule III) [LIKELY-COVERED — 2 corpus topics]
3. Financial Statement Analysis (comparative and common-size statements) [LIKELY-COVERED]
4. Cash Flow Statement (AS-3, indirect method) [LIKELY-COVERED]
5. Ratio Analysis (liquidity, solvency, activity, profitability) [LIKELY-COVERED — 2 corpus topics]
6. Accounting Application of Electronic Spreadsheet [LIKELY-COVERED — "Electronic Spreadsheet and DBMS in Accounting"]
7. Database Management System (SQL basics) [LIKELY-COVERED — folded in same corpus topic]

Subtotal: 7 units — 7 LIKELY-COVERED, 0 GAP.

### Business Studies (854)
*Exam pattern:* Paper I theory 80 (3h) + Paper II project 20 (two projects).
*Source:* oswalpublishers.com/syllabus/isc-class-12/business-studies/ (fetched).

1. Human Resource Management (job planning, recruitment, selection, training, morale, motivation, leadership, appraisal, separation) [LIKELY-COVERED — partial: `12_bs` "Staffing and Directing" topics]
2. Business Communication and Correspondence (letters, reports, e-mail) [GAP]
3. Business Size and Finance (entities, sources of finance) [LIKELY-COVERED — corpus "Sources of Finance" topics]
4. Globalisation and Recent Trends (e-business, outsourcing, online models) [GAP]
5. Business Regulators and Intermediaries (RBI, SEBI, IRDA, FSSAI, BIS) [GAP]

Subtotal: 5 units — 2 LIKELY-COVERED, 3 GAP.

### Commerce (850)
*Exam pattern:* Paper I theory 80 (3h) + Paper II project 20 (two projects).
*Source:* oswalpublishers.com/syllabus/isc-class-12/commerce/ (fetched).

1. Business Environment (micro/macro dimensions, SWOT) [LIKELY-COVERED — `12_comm`]
2. Financing (capital, shares, debentures, banking trends, UPI) [LIKELY-COVERED — 3 corpus topics]
3. Management (Taylor and Fayol principles, planning, organising, staffing, directing, controlling, coordination) [LIKELY-COVERED — 3 corpus topics]
4. Marketing (marketing mix, consumer protection, CPA 2019) [LIKELY-COVERED — 2 corpus topics]

Subtotal: 4 units — 4 LIKELY-COVERED, 0 GAP.

### Computer Science (868)
*Exam pattern:* Paper I theory 70 (3h) + Paper II practical 30 (25+ assignments). Sections A Boolean/hardware, B Java, C OOP/data structures/complexity.
*Source:* oswalpublishers.com/syllabus/isc-class-12/computer-science/ (fetched).

1. Boolean Algebra (equivalence laws, K-maps, SOP/POS) [LIKELY-COVERED — `12_cs` "Boolean Algebra and Digital Logic Circuits"]
2. Computer Hardware (gates, adders, encoders, multiplexers) [LIKELY-COVERED]
3. Implementation of Algorithms / Programming in Java (Class XI review + higher-order problems) [LIKELY-COVERED — "Advanced Java: OOP" corpus topics]
4. Recursion (factorial, GCD, binary search, Tower of Hanoi) [LIKELY-COVERED — "Algorithm Design Techniques"]
5. Inheritance, Interfaces and Polymorphism [LIKELY-COVERED]
6. Data Structures (stack, queue, linked list, trees) [LIKELY-COVERED]
7. Complexity and Big O Notation [LIKELY-COVERED]

Subtotal: 7 units — 7 LIKELY-COVERED, 0 GAP.

### Sociology (851 SOC)
*Exam pattern:* Paper I theory 70 (3h) + Paper II practical 30 (two studies).
*Source:* oswalpublishers.com/syllabus/isc-class-12/sociology/ (fetched).

1. Social Institutions (kinship, marriage, family) [LIKELY-COVERED — 3 corpus topics in `12_soc`]
2. Religion and Society [LIKELY-COVERED]
3. Political Organization (Panchayati Raj) [LIKELY-COVERED]
4. Economic Organization (tribal, agrarian, markets) [LIKELY-COVERED]
5. Tribal India — Past, Present and Future [LIKELY-COVERED — "Tribal Society"]
6. Social Stratification (class, caste, gender) [LIKELY-COVERED — 2 corpus topics]
7. Social Change and Development [LIKELY-COVERED]

Subtotal: 7 units — 7 LIKELY-COVERED, 0 GAP.

### Psychology (852)
*Exam pattern:* Paper I theory 70 (3h) + Paper II practical 30.
*Source:* oswalpublishers.com/syllabus/isc-class-12/psychology/ (fetched).

1. Intelligence and Ability [LIKELY-COVERED — `12_psy`]
2. Personality (theories and assessment) [LIKELY-COVERED]
3. Lifespan Development [LIKELY-COVERED]
4. Stress and Stress Management [LIKELY-COVERED]
5. Psychological Disorders and Psychotherapy [LIKELY-COVERED]
6. Social Thought and Social Behaviour [LIKELY-COVERED — "Social Psychology"]
7. Attitudes [LIKELY-COVERED — folded in corpus "Social Psychology"]
8. Psychology in relation to the Environment and Social Concerns [LIKELY-COVERED — "Counselling" + "Environmental Psychology"]

Subtotal: 8 units — 8 LIKELY-COVERED, 0 GAP.

### Home Science (864)
*Exam pattern:* Paper I theory 70 (3h) + Paper II practical 30.
*Source:* CISCE Home Science (864) syllabus via shaalaa.com / brainbuildhub.com mirror of the CISCE PDF (search-verified).

1. Principles and Methods of Cooking (food science) [LIKELY-COVERED — `12_home`]
2. Meal Planning and Nutrition [LIKELY-COVERED]
3. Special Diets (therapeutic nutrition) [LIKELY-COVERED]
4. Resource Management: Savings and Investments [LIKELY-COVERED]
5. Consumer Protection [LIKELY-COVERED]
6. Food Adulteration and Food Safety [LIKELY-COVERED]
7. Human Development: Adolescence [LIKELY-COVERED — "Adolescent Development"]
8. Human Development: Adulthood [LIKELY-COVERED]
9. Textiles: Traditional Textiles of India [LIKELY-COVERED]
10. Community Development and Public Health [LIKELY-COVERED — "Public Health and Welfare"]

Subtotal: 10 units — 10 LIKELY-COVERED, 0 GAP.

### Biotechnology (878)
*Exam pattern:* Paper I theory 70 (3h) + Paper II practical/project 30.
*Source:* CISCE Biotechnology (878) syllabus via byjus.com / scribd / extramarks mirrors (search-verified; unit granularity reconciled).

1. Molecular Biology (nucleic acids, gene expression, regulation) [LIKELY-COVERED — 3 corpus topics in `12_biotech`]
2. Genetic Engineering / Recombinant DNA Technology [LIKELY-COVERED — "Recombinant DNA Technology: Tools and Vectors"]
3. Biotechnology and its Applications (agriculture, medicine) [LIKELY-COVERED]
4. Cell Culture Technology (plant and animal) [LIKELY-COVERED — 2 corpus topics]
5. Microbial / Environmental and Industrial Biotechnology [LIKELY-COVERED]
6. Bioinformatics, Genomics and Proteomics [LIKELY-COVERED]

Subtotal: 6 units — 6 LIKELY-COVERED, 0 GAP.

### Legal Studies (812; older code 881/895)
*Exam pattern:* Paper I theory 70 (3h) + Paper II project work 30.
*Source:* CISCE Legal Studies (881) revised 2026 syllabus via collegedekho / scribd mirrors (search-verified). Corpus: `12_legal` topics in `D:\platform\parsed_output\class12_topic_mapping.json`.

1. Law of Crimes (stages and elements of crime, offences against body/women/children, IPC significance, criminal law and morality) [LIKELY-COVERED — 2 corpus topics: "Crime and its Categories" + "Offences under IPC"]
2. Law of Contracts (offer, acceptance, consideration, capacity, discharge, remedies) [LIKELY-COVERED — "Law of Contract"]
3. Law of Torts (essentials, specific torts, remedies) [LIKELY-COVERED — "Law of Torts"]
4. Alternative Dispute Resolution (arbitration, conciliation, mediation, Lok Adalat, tribunals, legal services/aid) [LIKELY-COVERED — "Alternative Dispute Resolution"]
5. Property Law [LIKELY-COVERED — "Property Law"]
6. Constitutional Law and Human Rights / Anti-Corruption [LIKELY-COVERED — 2 corpus topics]
7. Legal Maxims and Legal Terms [LIKELY-COVERED — "Legal Maxims"]

Subtotal: 7 units — 7 LIKELY-COVERED, 0 GAP.

### Environmental Science (899)
*Exam pattern:* Paper I theory 70 (3h) + Paper II project 30.
*Source:* CISCE EVS (899) syllabus via shaalaa.com / byjus mirrors (search-verified).

1. Modern Schools of Ecological Thought and Sustainability [LIKELY-COVERED — `12_evs`]
2. Population and Conservation Ecology (dynamics, human population, regulation) [LIKELY-COVERED]
3. Threats to the Ecosystem / Conservation [LIKELY-COVERED]
4. Environmental Monitoring (pollution of air, water, soil) [LIKELY-COVERED]
5. Urbanisation and Sustainable Development [LIKELY-COVERED]
6. Agriculture and Post-Harvest Practices [LIKELY-COVERED]
7. Natural Resource Economics and International Trade [LIKELY-COVERED]

Subtotal: 7 units — 7 LIKELY-COVERED, 0 GAP.

### Class 12 counts

- **Subjects:** 19 (English, Physics, Chemistry, Biology, Mathematics, History, Political Science, Geography, Economics, Accounts, Business Studies, Commerce, Computer Science, Sociology, Psychology, Home Science, Biotechnology, Legal Studies, Environmental Science)
- **Total chapters/units listed:** 141
- **LIKELY-COVERED:** 134
- **GAP:** 7 (English Literature — all prescribed texts: Macbeth Acts III–V, Prism stories, Rhapsody poems; Geography — Regional Economic Development case studies; Business Studies — Business Communication and Correspondence, Globalisation and Recent Trends, Business Regulators and Intermediaries)

Coverage annotation method: one-pass match of official ISC unit names against `deploy/content/enhanced_nodes_md/` chapter partitions (`parsed_output/class11_topic_mapping.json`, `class12_topic_mapping.json`) and the `c11_comp`/`c11_gram`/`c12_comp`/`c12_gram` English-skills groups; no deep node-level audit was performed. CBSE content was not audited or modified.
---

## ICSE Class 9

**Source of truth (official CISCE booklets, fetched 2026-09-23):** CISCE "ICSE Year 2026: Regulations and Syllabuses" — the governing document for Class IX (cisce.org → Publications → ICSE; the Class IX portion of each subject's syllabus). cisce.org is geo-blocked from this host, so booklet PDFs were pulled from Wayback Machine snapshots of the official URLs (timestamps cited per subject). Supporting local parsed syllabus: `backend/_archive/audits/_cisce_syllabus_data.py` (older textbook-TOC parse — matches the official Science/Maths/HCG unit lists, but is **stale for Economics** (old Public-Revenue/Expenditure/Debt units) and Computer (old "Computer Science" TOC); official 2026 lists below take precedence).

**Coverage marks** are against the deployed corpus `deploy/content/enhanced_nodes_md/` (416 Class 9 node files in 48 chapter groups: `c9_math` ch1–8, `c9_physics` ch1–6, `c9_chem` ch1–3, `c9_bio` ch1–4, `c9_hist` ch1–3, `c9_civ` ch1–2, `c9_geo` ch1–2, `c9_engl` ch1–8, `c9_gram` ch80–84, `c9_eco` ch1–2, `c9_comp` ch86). The corpus is CBSE/NCERT-aligned, so ICSE-only chapters are mostly GAPs. Light keyword match, one pass — LIKELY-COVERED does not assert ICSE-level depth.

**Structure CISCE prescribes (Regulations, Part II):** Group I compulsory — English; Second Language (Indian Languages or Modern Foreign Languages); History, Civics & Geography (or HCG Thailand variant). Group II any two/three — Mathematics; Science (Physics, Chemistry, Biology); Economics; Commercial Studies; Modern Foreign Language; Classical Language; Environmental Science. Group III any one/two (50% external + 50% internal) — Computer Applications; Economic Applications; Commercial Applications; Art; Performing Arts; Home Science; Cookery; Fashion Designing; Physical Education; Yoga; Technical Drawing Applications; Environmental Applications; Modern Foreign Languages; Mass Media & Communication; Hospitality Management; plus Section B vocational subjects in a separate CISCE booklet. Group I/II: 80% external + 20% internal assessment. Part I (compulsory internal, not externally examined): Third Language (V–VIII), Art, SUPW & Community Service, Physical Education, Education in Moral and Spiritual Values.

### English (01) — Group I (Paper 1 Language 80m+IA 20m; Paper 2 Literature in English 80m+IA 20m)

Paper 1 skill areas (`1.-ICSE-English.pdf`, snapshot 20240507023639):

1. Composition, 300–350 words (describe/narrate/argue/persuade). [GAP]
2. Letter — formal or informal, format and tone. [LIKELY-COVERED] (`c9_comp_cbse_86` formal-letter skeleton)
3. Notice + e-mail from a given situation. [LIKELY-COVERED] (`c9_comp_cbse_86` class-9 notice nodes)
4. Unseen prose passage (~500 words): comprehension, vocabulary, summary. [GAP]
5. Functional grammar, structure and usage (prepositions, conjunctions, verbs, sentence structure). [LIKELY-COVERED] (`c9_gram_cbse_80`–`84`: tense editing, modals, concord, reported speech, determiners)

Paper 2 — Class IX prescribed texts (Drama + *Treasure Chest: A Collection of ICSE Short Stories & Poems*, Evergreen):

6. Drama: *Julius Caesar*, Acts I & II — William Shakespeare. [GAP]
7. Prose: *Bonku Babu's Friend* — Satyajit Ray. [GAP]
8. Prose: *Oliver Asks for More* — Charles Dickens. [GAP]
9. Prose: *The Model Millionaire* — Oscar Wilde. [GAP]
10. Prose: *Home-coming* — Rabindranath Tagore. [GAP]
11. Prose: *The Boy who Broke the Bank* — Ruskin Bond. [GAP]
12. Poetry: *The Night Mail* — W.H. Auden. [GAP]
13. Poetry: *Skimbleshanks: The Railway Cat* — T.S. Eliot. [GAP]
14. Poetry: *I Remember, I Remember* — Thomas Hood. [GAP]
15. Poetry: *A Doctor's Journal Entry for August 6, 1945* — Vikram Seth. [GAP]
16. Poetry: *A Work of Artifice* — Marge Piercy. [GAP]

Internal Assessment (both papers): Listening & Speaking, written assignments. [GAP] (`c9_engl` ch1–8 is a different, CBSE-style reader — none of the ICSE literature texts exist in the corpus)

### Second Language — Indian Languages (e.g. Hindi) — Group I (`2.-ICSE-Second-Language-Indian-Languages2.pdf`, snapshot 20240705111955)

Skills + prescribed-texts structure (no fixed chapter list; any two textbooks from the Appendix I list):

1. Language — Composition. [GAP]
2. Language — Letter. [GAP]
3. Language — Comprehension (unseen passage). [GAP]
4. Language — Grammar and usage. [GAP]
5. Prescribed Texts — two textbooks (language + literature components). [GAP]

Internal Assessment: written assignments, one language + one literature. [GAP] (No Class 9 Hindi nodes in the deployed corpus.)

### History, Civics & Geography (50) — Group I, Paper 1: History & Civics (`8_ICSE_History_Civics_2025.pdf`, snapshot 20240705232415)

Section A — Civics:

1. Our Constitution (adoption/enforcement, features, welfare state). [LIKELY-COVERED] (`c9_civ_ch1`)
2. Elections (Election Commission, direct/indirect, general/mid-term/by-elections). [LIKELY-COVERED] (`c9_civ_ch2`)
3. Local Self-Government — Rural (Panchayati Raj three tiers) and Urban (municipal bodies). [LIKELY-COVERED] (partial — `c9_civ_ch1` local-governance nodes; no dedicated chapter)

Section B — History:

1. The Harappan Civilisation (sources, urban planning, trade, decline). [LIKELY-COVERED] (`c9_hist_ch2`)
2. The Vedic Period (Vedas/epics, early vs later Vedic society and economy). [LIKELY-COVERED] (`c9_hist_ch3`)
3. Jainism and Buddhism (rise in 6th c. BC, doctrines). [GAP]
4. The Mauryan Empire (Chandragupta, Ashoka, Dhamma, administration). [LIKELY-COVERED] (`c9_hist_ch3`)
5. The Sangam Age (Tirukkural, megaliths, society and economy). [GAP]
6. The Age of the Guptas (administration, Nalanda, Fa-hien, Kalidasa). [LIKELY-COVERED] (`c9_hist_ch3`)
7. Medieval India — (a) The Cholas [LIKELY-COVERED] (`c9_hist_ch3` Chola nodes); (b) The Delhi Sultanate [GAP]; (c) The Mughal Empire [GAP]; (d) Composite Culture — Bhakti and Sufism [GAP]
8. The Modern Age in Europe — (a) Renaissance [GAP]; (b) Reformation [GAP]; (c) Industrial Revolution, Socialism vs Capitalism [GAP]

Internal Assessment: one project/assignment (case study, monument visit, comparative civilisations, etc.). [GAP]

### Geography (50) — Group I, Paper 2: H.C.G. Paper 2 (`9.-ICSE-Geography-26.pdf`, snapshot 20260207181937)

PRINCIPLES OF GEOGRAPHY:

1. Our World — Earth as a planet, geographic grid (latitudes/longitudes, time calculation), rotation and revolution. [GAP]
2. Structure of the Earth — core/mantle/crust, landforms, rocks, volcanoes, earthquakes, weathering and denudation. [LIKELY-COVERED] (`c9_geo_ch1`)
3. Hydrosphere — tides, ocean currents (Gulf Stream, Labrador, Kuro Shio etc.). [GAP]
4. Atmosphere — composition/structure, insolation, pressure belts and winds, humidity, rainfall types. [LIKELY-COVERED] (`c9_geo_ch2`)
5. Pollution — types (air, water, soil, radiation, noise), sources, effects, prevention. [LIKELY-COVERED] (partial — `c9_geo_ch2` climate-impact nodes; no dedicated pollution chapter)
6. Natural Regions of the World — Equatorial to Tundra, climate/vegetation/human adaptation. [GAP]
7. Map Work — natural regions, oceans/seas/gulfs/straits, rivers, mountains, plateaus on a world outline. [GAP]

Internal Assessment: practical record file (map types, scales, atlas/town-guide reading, contours, sketch maps). [GAP]

### Mathematics (51) — Group II (`12.-ICSE-Mathematics_25.pdf`, snapshot 20250911090932)

1. Pure Arithmetic — Rational and Irrational Numbers, surds, rationalisation, proofs of irrationality. [LIKELY-COVERED] (`c9_math_ch3`)
2. Commercial Mathematics — Compound Interest (2–3 year amounts, half-yearly, growth/depreciation). [GAP]
3. Algebra — (i) Expansions [LIKELY-COVERED] (`c9_math_ch4`); (ii) Factorisation [LIKELY-COVERED] (`c9_math_ch4`); (iii) Simultaneous Linear Equations [LIKELY-COVERED] (`c9_math_ch2`); (iv) Indices/Exponents [GAP]; (v) Logarithms [GAP]
4. Geometry — (i) Triangles (congruency, inequalities, Mid-Point and Pythagoras theorems) [GAP]; (ii) Rectilinear Figures (parallelogram theorems, constructions) and Area theorems [GAP]; (iii) Circles — chord and arc properties [LIKELY-COVERED] (`c9_math_ch5`)
5. Statistics — data presentation, mean/median of ungrouped data, frequency polygon. [GAP]
6. Mensuration — triangle/quadrilateral areas (Heron's formula), circle area/circumference, cube and cuboid surface area/volume. [LIKELY-COVERED] (`c9_math_ch6`)
7. Trigonometry — ratios, standard angles, complementary-angle relations, simple right-triangle problems. [GAP]
8. Coordinate Geometry — Cartesian plane, plotting, graphical solution of simultaneous linear equations, distance formula. [LIKELY-COVERED] (`c9_math_ch1`)

Internal Assessment: minimum two assignments. [GAP] (Corpus extras outside ICSE 9: `c9_math_ch7` Probability and `c9_math_ch8` Sequences/AP are CBSE-only; ICSE Class 9 prescribes neither.)

### Science (52) — Group II

**Paper 1: Physics** (`13_ICSE_Physics.pdf`, snapshot 20250909022532):

1. Measurements and Experimentation (SI units, Vernier callipers, screw gauge, simple pendulum). [LIKELY-COVERED] (`c9_physics_ch1`; least-count/zero-error specifics thin)
2. Motion in One Dimension (equations of motion, graphs). [LIKELY-COVERED] (`c9_physics_ch2`)
3. Laws of Motion (contact/non-contact forces, Newton's three laws, momentum, gravitation). [LIKELY-COVERED] (`c9_physics_ch3`; gravitation nodes absent)
4. Fluids (thrust/pressure, Pascal's law, atmospheric pressure, Archimedes' principle, floatation). [GAP]
5. Heat and Energy (heat vs temperature, anomalous expansion of water, energy sources, global warming). [GAP]
6. Light (reflection, plane and spherical mirrors). [GAP]
7. Sound (production, propagation, echoes, ultrasound). [LIKELY-COVERED] (`c9_physics_ch5`)
8. Electricity and Magnetism (current, Ohm's law, series/parallel resistance, magnetism). [LIKELY-COVERED] (`c9_physics_ch6`)

Internal Assessment: 12 listed practicals (least count, pendulum, reflection, focal length, circuits, Archimedes verification). [GAP]

**Paper 2: Chemistry** (`14.-ICSE-Chemistry_25.pdf`, snapshot 20250909022452):

1. The Language of Chemistry (symbols, valency, equations). [LIKELY-COVERED] (partial — `c9_chem_ch3` valency/formulae nodes)
2. Chemical Changes and Reactions (types, energy changes). [GAP]
3. Water (properties, hard vs soft water). [GAP]
4. Atomic Structure and Chemical Bonding (subatomic particles, isotopes, ionic/covalent bonding). [LIKELY-COVERED] (`c9_chem_ch2` + `c9_chem_ch3` bonding nodes)
5. The Periodic Table (history, groups/periods, trends). [GAP]
6. Study of the First Element — Hydrogen. [GAP]
7. Study of Gas Laws (Boyle's, Charles', gas equation). [GAP]
8. Atmospheric Pollution (sources, acid rain, global warming). [GAP]

Internal Assessment: Practical Chemistry list (action of heat on compounds, action of dilute sulphuric acid, etc.). [GAP]

**Paper 3: Biology** (`15.-ICSE-Biology_25.pdf`, snapshot 20250918134137):

1. Basic Biology — the cell, organelles, cell division. [LIKELY-COVERED] (`c9_bio_ch1`)
2. Flowering Plants — flower structure, pollination, fertilisation. [LIKELY-COVERED] (`c9_bio_ch3`)
3. Plant Physiology — absorption/transport, transpiration, photosynthesis. [GAP]
4. Diversity in Living Organisms — classification principles, five kingdoms. [LIKELY-COVERED] (`c9_bio_ch4`)
5. Human Anatomy and Physiology — skeleton, digestive, respiratory, circulatory, excretory systems, skin. [GAP] (only fragments: `c9_bio_ch2` tissues, `c9_bio_ch3` human reproduction)
6. Health and Hygiene — diseases, vectors, immunity. [GAP]
7. Waste Generation and Management. [GAP]

Internal Assessment: practical work list. [GAP]

### Economics (64) — Group II (`16.-ICSE-Economics3.pdf`, snapshot 20240714223657)

1. Introduction to Economics (definitions, micro/macro, activities, sectors, basic terms, entities). [LIKELY-COVERED] (`c9_eco_ch1`)
2. Types of Economies (capitalist, socialist, mixed; developed vs developing; growth vs development). [LIKELY-COVERED] (`c9_eco_ch1` mixed/planned-economy nodes)
3. Problems of an Economy (scarcity, central problems — what/how/for whom). [LIKELY-COVERED] (`c9_eco_ch1`)
4. The Indian Economy: A Study — agriculture, industry, tertiary sectors, Green Revolution, food security. [GAP]
5. Major Problems of the Indian Economy — poverty, unemployment, government schemes. [GAP]
6. Major Reforms and Emerging Trends — LPG model, Smart City, Digital India, Skill India. [LIKELY-COVERED] (partial — `c9_eco_ch1` post-1991 reforms node)

Internal Assessment: one project/assignment. [GAP] (Corpus `c9_eco_ch2` demand/supply is CBSE-only — not in ICSE 9 Economics.)

### Commercial Studies (63) — Group II (`17.-ICSE-Commercial-Studies_25.pdf`, snapshot 20250909022231)

1. Commercial Activities. [GAP]
2. Important Departments of a Commercial Organisation. [GAP]
3. Communication in Commercial Organisations. [GAP]
4. Introduction to Accounting and Bookkeeping. [GAP]
5. Banking. [GAP]
6. Trade. [GAP]
7. Social Responsibility of Commercial Organisations. [GAP]

Internal Assessment. [GAP] — Entire subject absent from corpus.

### Environmental Science (82) — Group II (`20.-ICSE-Environmental-Science2.pdf`, snapshot 20251111024756)

1. Understanding our Environment. [GAP]
2. Living Things in Ecosystems. [GAP]
3. How Ecosystems Work. [GAP]
4. Kinds of Ecosystems. [GAP]
5. Water. [GAP]
6. Air. [GAP]
7. Atmosphere and Climate. [GAP]
8. Soil and Land. [GAP]
9. People. [GAP]
10. Urbanisation. [GAP]
11. Agriculture. [GAP]

Internal Assessment (survey/project). [GAP] — Entire subject absent from corpus.

### Computer Applications (86) — Group III (`21.-ICSE-Computer-Applications_25.pdf`, snapshot 20250724023654; 50% external + 50% internal)

1. Introduction to Object-Oriented Programming Concepts. [GAP]
2. Elementary Concept of Objects and Classes. [GAP]
3. Values and Data Types. [GAP]
4. Operators in Java. [GAP]
5. Input in Java. [GAP]
6. Mathematical Library Methods. [GAP]
7. Conditional Constructs in Java. [GAP]
8. Iterative Constructs in Java. [GAP]
9. Nested for Loops. [GAP]
10. Computing and Ethics. [GAP]

Internal Assessment (100 marks, Java programming assignments). [GAP] — No Java corpus; `c9_comp_cbse_86` is English writing skills under a `comp` prefix, not computer content.

### Economic Applications (87) — Group III (`22.-ICSE-Economic-Applications.pdf`, snapshot 20240705111829)

1. Basic Concepts of Economics. [LIKELY-COVERED] (`c9_eco_ch1`)
2. An Overview of Indian Economy (agriculture, industry, services, ecosystem impact). [GAP]
3. Infrastructure of the Indian Economy. [GAP]
4. Consumer Awareness. [GAP]

Internal Assessment. [GAP]

### Commercial Applications (88) — Group III (`23.-ICSE-Commercial-Applications.pdf`, snapshot 20240705134436)

1. Introduction to Commercial Organisations. [GAP]
2. Functioning of a Commercial Organisation. [GAP]
3. Business Communication. [GAP]
4. Mechanics and Terminology of Accounting. [GAP]

Internal Assessment (10 listed assignments incl. balance-sheet study). [GAP]

### Art (60) — Group III (`24.-ICSE-Art2.pdf`, snapshot 20240809031345; combined IX–X paper structure, offer any two papers)

1. Paper 1: Drawing and/or Painting from Still Life. [GAP]
2. Paper 2: Drawing and/or Painting from Nature. [GAP]
3. Paper 3: Original Imaginative Composition in Colour. [GAP]
4. Paper 4: Applied Art. [GAP]

### Home Science (68) — Group III (`26.-ICSE-Home-Science.pdf`, snapshot 20240705233832)

1. Concept and Scope of Home Science. [GAP]
2. Food and Health. [GAP]
3. Growth and Development of Children. [GAP]
4. The Home and its Maintenance. [GAP]
5. Textile Science and Fabric Construction. [GAP]
6. Communication and Extension. [GAP]

Internal Assessment. [GAP]

### Physical Education (72) — Group III (`29.-ICSE-Physical-Education.pdf`, snapshot 20240706015159)

1. Human Anatomy and Physiology — skeletal system, joints and joint movements. [GAP]
2. Muscular System. [GAP]
3. Respiratory System. [GAP]
4. Circulatory System. [GAP]
5. Games — any two of Cricket, Football, Hockey, Basketball, Volleyball, Badminton (rules, fundamental skills, terminology, governing bodies, tournaments). [GAP]

Internal Assessment (practical performance). [GAP]

### Yoga (84) — Group III (`30.-ICSE-Yoga2.pdf`, snapshot 20240808202505; Paper I Theory 100m + Paper II Internal 100m)

1. Section I — Human Biology: human skeleton, muscular, respiratory, digestive systems. [GAP]
2. Section II — Sages of India: Valmiki, Kabir, Mirabai, Ramakrishna Paramhansa. [GAP]
3. Section III — Concepts of Yoga: Guru–Shishya, four Purusharthas/Ashramas, four Margas, Patanjali, Ashtanga Yoga. [GAP]
4. Section IV — Psychology and Yoga: Hatha Yoga, Pancha Koshas, Pancha Pranas, seven Chakras, wellness pillars. [GAP]
5. Paper II practical — ~24 asanas (Vrikshasana to Supta Konasana), pranayama (Anapanasati, abdominal and full yogic breath), meditation. [GAP]

### Mass Media & Communication (90) — Group III (`34.-ICSE-Mass-Media-Communication_25.pdf`, snapshot 20250805065423)

1. Communication. [GAP]
2. Mass Media. [GAP]
3. Print Media. [GAP]
4. Radio as a Medium. [GAP]
5. Introduction to Advertising. [GAP]
6. Internet. [GAP]

Internal Assessment. [GAP]

### Additional prescribed subjects (listed without chapter breakdown)

Modern Foreign Languages (Group I/II/III variants) and Classical Language (76) — skill-based, textbooks per Appendix I; History, Civics and Geography (Thailand) (58) — regional variant; Performing Arts (91–95), Cookery (69), Fashion Designing (70), Technical Drawing Applications (65), Hospitality Management (73) — Group III Section A; plus Group III **Section B vocational subjects** (separate CISCE booklet, "ICSE Year 2026: Syllabus for Vocational Subjects"). All [GAP] — no corpus coverage.

### Class 9 counts

- **Subjects prescribed:** 25 external-examination subjects (Group I: 3; Group II: 7 + language variants; Group III: 15 + Section B vocational), plus Part I compulsory internal courses (Third Language, Art, SUPW & Community Service, Physical Education, Moral & Spiritual Values). Chapter-level inventory above covers 19 subjects.
- **Total chapters/units/IA components listed:** 167 (English 17, Second Language 6, History & Civics 17, Geography 8, Mathematics 16, Physics 9, Chemistry 9, Biology 8, Economics 7, Commercial Studies 8, Environmental Science 12, Computer Applications 11, Economic Applications 5, Commercial Applications 5, Art 4, Home Science 7, Physical Education 6, Yoga 5, Mass Media 7)
- **LIKELY-COVERED:** 36 (History & Civics 8, Mathematics 7, Physics 5, Economics 4, English Language 3, Geography 3, Biology 3, Chemistry 2, Economic Applications 1)
- **GAP:** 131 — entire subjects with zero coverage: Second Language, Commercial Studies, Environmental Science, Computer Applications, Commercial Applications, Art, Home Science, Physical Education, Yoga, Mass Media; near-zero: Economic Applications (1/4). Structural gaps in core subjects: all ICSE Literature texts (Julius Caesar Acts I–II, Treasure Chest prose/poetry), Civics Local Self-Government depth, Medieval-India Sultanate/Mughal/Composite Culture, Sangam Age, Jainism & Buddhism, Modern Age in Europe, Geography (Our World/grid, Hydrosphere, Natural Regions, Map Work), Mathematics (Compound Interest, Indices/Logarithms, Triangles, Rectilinear Figures, Statistics, Trigonometry), Physics (Fluids, Heat and Energy, Light), Chemistry (5 of 8 units), Biology (Plant Physiology, Human Anatomy & Physiology, Health & Hygiene, Waste Management).
- Caveats: marks are one-pass keyword matches against CBSE-aligned chapters — LIKELY-COVERED does not assert topic-level completeness (e.g., ICSE Measurement requires Vernier callipers/screw gauge; ICSE Circle-theorem proofs exceed the matching corpus chapter). Corpus extras not in ICSE 9: `c9_math` Probability + Sequences/AP, `c9_eco` demand/supply, the entire CBSE-style `c9_engl` reader. The ICSE 2026 booklet is the governing document; check CISCE amendment circulars before shipping content.
