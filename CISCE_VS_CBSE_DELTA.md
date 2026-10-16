# CISCE vs CBSE — Chapters Not Common

The chapter-level delta between the CISCE (ICSE 6–10, ISC 11–12) prescribed syllabus and the deployed CBSE-aligned corpus (`deploy/content/enhanced_nodes_md/`, 13,488 nodes). Produced by 6 verification agents (one per class band), each re-checking `CISCE_INVENTORY.md` marks against the actual corpus node files. **"Not common" = CISCE prescribes it, the CBSE corpus lacks it** — i.e. content that must be authored for CISCE students.

## Headline

| Class | Subjects | CISCE chapters | Common | **Not common** | Thin/partial |
|---|---|---|---|---|---|
| CISCE 6 | 10 | 59 | 20 | **36** | 3 |
| CISCE 7 | 10 | 62 | 22 | **26** | 14 |
| CISCE 8 | 10 | 68 | 40* | **28** | — |
| ICSE 9 | 19 | 167 | 36 | **131** | — |
| ICSE 10 | 22 | 211 | 74 | **137** | — |
| ISC 11 | 19 | 136 | 84 | **38** | 14 |
| ISC 12 | 19 | 141 | 104 | **22** | 15 |
| **Total** | — | **844** | **380** | **~418** | ~32 |

\* Class 8 counted against the deployed corpus only (see corrections below).

Roughly **half of the CISCE syllabus is not served by the CBSE corpus**. The gap concentrates in: whole elective subjects (Classes 6–12), the English/Hindi literature set texts, ICSE's humanities block (9–10), ICSE-specific Maths/Science chapters the rationalised CBSE syllabus dropped (9–10), and ISC's Java-based CS + Legal Studies + Environmental Science (11–12).

## Cross-cutting findings (verified)

1. **Hindi CISCE content is registry-only, never deployed.** `cbse_data/nodes/by_subject/hindi_cisce.json` holds `c6/c7_hin_cisce` (70 ids) and `c10_hin_cisce` (37 ids — every prescribed Sahitya Sagar story, Naya Raasta chapter, Ekanki Sanchay play) but **zero files exist in the deployed corpus**. Inventory marks counting these as covered were wrong.
2. **Legal Studies (ISC 11+12) and Environmental Science (ISC 11+12) have zero nodes anywhere.** The `c11/c12_legal` and `c11/c12_evs` keys exist only in `parsed_output/class*_topic_mapping.json` planning files that were never materialised.
3. **Class 11–12 Computer Science corpus is Python-based** (new CBSE syllabus); ISC prescribes **Java** (Classes 9–12 Computer Applications/CS), so the programming strand is a gap in both directions.
4. **English literature set texts are 100% absent**: ICSE 9/10 *Julius Caesar* + *Treasure Chest* anthology; ISC 11/12 *Macbeth* + *Prism*/*Rhapsody* anthologies; CBSE readers (First Flight, Flamingo, etc.) are CBSE-only extras.
5. **Inventory corrections found during verification**: ICSE 10 Maths Factorisation-of-Polynomials & Constructions are covered (thin); Physics Modern Physics partially covered (fission/fusion in Sources of Energy); Chemical Bonding ionic/covalent covered, coordinate bond missing; ISC 12 Legal/EVS "LIKELY-COVERED" marks flipped to GAP (planning-JSON-only); ICSE 9 Physics Measurement is better covered than flagged (Vernier/screw-gauge nodes exist); `c9_physics_ch4`, `c9_chem_ch1`, `c9_hist_ch1` are CBSE-only extras; class-6 `c6_hin`, class-7 `c7_hin` cited by the inventory do not exist as files.

---

## CISCE Class 6

### English (First Language)
**Not common:** 1. Listening and Speaking — group discussion, debate, drama, presentations, media-language analysis (no speaking/listening nodes).
**Thin:** Grammar area — pronoun case, perfect tenses, figures of speech beyond `c6_gram_cbse_80–83` (sentences/nouns/verbs/articles).

### Hindi (Second Language)
**Not common (entire subject — 0 deployed files):** 1. सुनना और बोलना (listening/speaking) 2. पढ़ना एवं लिखना (reading + निबंध/पत्र/डायरी writing) 3. व्याकरण और भाषा (संज्ञा/सर्वनाम/विशेषण/क्रिया भेद, काल, कारक, विराम-चिह्न, शब्द-भंडार).

### Mathematics
**Not common:** none at theme level. **Thin:** Sets sub-topic (cardinality) — no nodes. **CBSE-only:** Decimals (ch04).

### History & Civics
**Not common:** 1. The Vedic Civilization (Early/Later Vedic, Gurukul) 2. Mahavira & Buddha — Great Preachers 3. Rise of Kingdoms & Republicans (Janapadas/Mahajanapadas, Magadha, Alexander, Chandragupta Maurya — content sits one class up in `c7_hist_ch02`) 4. The Golden Age — Gupta Empire (sits in `c7_hist_ch04`).
**Thin:** River Valley Civilizations — Nile/Tigris-Euphrates light.
**CBSE-only:** `c6_history_ch06–12` (medieval, Europeans, nationalism, Constitution); whole `c6_economics` subject.

### Geography
**Not common:** 1. Representation of Geographical Features (maps, scale, symbols) 2. Water Bodies (oceans, seas, lakes, rivers, pollution) 3. Minerals (ores, mining, conservation) 4. Study of Continents: North & South America (lumbering vs Amazon case studies).
**Thin:** Agriculture — modern content (crop types, green revolution) sits in `c7_geo_ch04`; class-6 chapter is archaeology-of-farming.

### Physics
**Not common:** 1. Force (push/pull, effects, friction) 2. Energy (work, simple machines — lever/pulley/inclined plane) 3. Magnetism (poles, compass, making magnets).
**Thin:** Light — umbra/penumbra vocabulary.

### Chemistry
**Not common:** 1. Introduction to Chemistry (chemists, chemistry in daily life) 2. Water (solutions, universal solvent, conservation) 3. Air and Atmosphere (components, uses of O₂/N₂, pollution).

### Biology
**Not common:** 1. The Cell (organelles, plant vs animal cell, Amoeba) 2. Health and Hygiene (communicable disease, transmission) 3. Adaptation (aquatic/desert/mountain habitats).
**Thin:** Plant Life (flower whorls, fertilisation, fruit formation); Human Body — circulatory content lives in class-7 corpus.

### Computer Studies
**Not common (entire subject):** 1. Categories of Computers & Computer Languages 2. File Management 3. Word Processor — Tabular Presentation 4. Mail Merge 5. Presentation — Visual Effects 6. Scratch Programming 7. HTML — An Introduction 8. Internet — Online Surfing.

### Arts Education
**Not common (entire subject):** 1. Form 2. Colour 3. Texture 4. Composition 5. Tools & Techniques 6. Art Vocabulary 7. Art Appreciation 8. Perspective.

`Class 6: 10 subjects, 59 CISCE chapters, 20 common, 36 not common (+3 thin).`

---

## CISCE Class 7

### English (First Language)
**Not common:** none at area level. **Thin:** active–passive voice, analogies; speaking/listening embedded-only.

### Hindi (Second Language)
**Not common (entire subject — 0 deployed files; 34 registry-only ids):** all 3 themes (सुनना-बोलना; पढ़ना-लेखन; व्याकरण).

### Mathematics
**Not common:** none. **Thin:** Sets (equal/equivalent/universal); profit & loss; simple interest (lives in `c7_eco_ch04`); exponents (scattered).

### Physics
**Not common:** 1. Sound (longitudinal waves, amplitude/frequency, reflection).
**Thin:** Physical Quantities (no volume/density chapter); Force & Motion (no motion chapter); Energy (no chapter); Electricity & Magnetism (electromagnet/bell content scattered).
**CBSE-only:** `ch07` acids-and-bases misfiled under physics.

### Chemistry
**Not common:** 1. Atomic Structure (radicals, atomicity, first 20 elements, valency).
**Thin:** Matter & Composition; Elements/Compounds/Mixtures (class-6 corpus only); Language of Chemistry; Air & Atmosphere (no dedicated chapters).

### Biology
**Not common:** 1. Tissue (epithelial/connective/muscular/nerve) 2. Kingdom Classification (Monera/Protista/Fungi/Plantae/Animalia) 3. Health and Hygiene — Allergy.
**Thin:** Human Body — excretory/nervous detail.

### History & Civics
**Not common:** 1. Medieval Europe — Rise and Spread of Christianity 2. Rise and Spread of Islam (pre-Islamic Arabia, Prophet Mohammad, Hijrat, Caliphate, Umayyads/Abbasids).
**Thin:** Vijayanagar & Bahamani Kingdoms.
**CBSE-only:** Second Urbanisation, post-Maurya, post-Gupta, migrants chapters; civics ch01/ch03.

### Geography
**Not common:** 1. Study of Continents: Europe, Africa, Australia, Antarctica (Switzerland/Ghana/Australia case studies).
**Thin (corrected LIKELY→thin):** Representation of Geographical Features; Atmosphere (layers/ozone); Weathering & Soil Formation; Industries; Energy & Power Resources — none have dedicated chapters.

### Computer Studies
**Not common (entire subject):** 1. Hardware Components (CPU, SMPS, motherboard) 2. Number System — An Introduction (binary conversion) 3. Computer Virus 4. Ethics and Safety Measures 5. Spreadsheets — An Introduction 6. Database and DBMS 7. HTML — Advanced Features.

### Arts Education (Visual Arts)
**Not common (entire subject):** 1. Form 2. Colour 3. Texture 4. Composition 5. Tools & Techniques 6. Art Vocabulary 7. Responding to Artefacts/Nature 8. Perspective.

`Class 7: 10 subjects, 62 CISCE chapters, 22 common, 26 not common (+14 thin).`

---

## CISCE Class 8

### English (First Language)
**Not common:** 1. Listening and Speaking as a dedicated strand 2. Recommended-reading list (Lord of the Flies, The Hobbit, To Kill a Mockingbird, Maus).
**Thin:** Mass Media / Peace & Harmony / Sports & Yoga reading themes; notice writing; argumentative essay node.

### Hindi (Second Language)
**Not common (entire subject — 18 registry-only `c8_hin_cisce` ids, 0 deployed files):** 1. सुनना और बोलना 2. पढ़ना एवं लिखना (कविता/कहानी/एकांकी/निबंध, पत्र-डायरी-प्रतिवेदन, विज्ञापन) 3. व्याकरण और भाषा (संज्ञा/सर्वनाम/क्रिया/काल/वाच्य/मुहावरे).

### Mathematics
**Not common:** none. **Thin:** Sets; Rational Numbers (no dedicated chapter); Data Handling depth.
**CBSE-only:** Ganita Prakash-style enrichment chapters (power patterns, origin of counting, Baudhayana, fractals, number tricks).

### History & Civics
**Not common:** 1. A Period of Transition (Renaissance, Reformation, Industrial Revolution, voyages) 2. The Growth of Nationalism (French Revolution, American War of Independence, Civil War) 3. Civics: United Nations (aims, organs, agencies).
**CBSE-only:** Indian architecture chapter; franchise/justice/citizenship civics chapters.

### Geography
**Not common:** 1. Asia: The Largest Continent (location, political divisions, physical features, climate).
**Thin (corrected):** Representation of Geographical Features (0 map-scale nodes); India: Geographical Features.
**CBSE-only:** Resources; Earth-as-planet; `c8_eco` layer (CISCE prescribes no Economics).

### Physics
**Not common:** none (all 8 themes map). **Thin:** relative density, floatation (0 refs).
**CBSE-only:** scientific method, solutions, Moon phases, habitats, unique-planet chapters.

### Chemistry
**Not common:** 1. Introduction to Chemistry 2. Language of Chemistry (symbols, valency, formulae, equations) 3. Hydrogen (preparation, electrolysis of water) 4. Water (hardness/softness, potable) 5. Carbon and its Compounds (allotropes, CO₂ reactions).
**Thin:** reaction-type taxonomy.

### Biology
**Not common:** 1. Human Body — Endocrine, Circulatory and Nervous (hormones, double circulation, lymph) 2. Food Production (horticulture, pisciculture, apiculture, sericulture, revolutions).
**Thin (corrected):** Reproduction in Plants and Animals (no pollination/fertilisation in `c8_bio`); first-aid.

### Computer Studies
**Not common (entire subject):** 1. Operating System and GUI 2. Spreadsheet (formulae, charts) 3. Algorithms and Flowcharts 4. Program Coding 5. App Development 6. Networks.

### Arts Education
**Not common (entire subject):** 1. Form 2. Colour 3. Texture 4. Composition 5. Tools & Techniques 6. Art Vocabulary 7. Art Appreciation 8. Perspective.

`Class 8: 10 subjects, 68 CISCE chapters, 40 common (deployed-strict), 28 not common.`

---

## ICSE Class 9

### English (01)
**Not common:** 1. Composition (300–350-word essay) 2. Unseen prose comprehension 3. Drama: *Julius Caesar* Acts I–II 4–8. Prose: *Bonku Babu's Friend*, *Oliver Asks for More*, *The Model Millionaire*, *Home-coming*, *The Boy who Broke the Bank* 9–13. Poetry: *The Night Mail*, *Skimbleshanks*, *I Remember I Remember*, *A Doctor's Journal Entry*, *A Work of Artifice* 14. Listening & Speaking internal assessment.
**Thin:** letter/notice depth; functional grammar (prepositions/conjunctions/sentence structure).
**CBSE-only:** entire `c9_engl` ch1–8 CBSE reader.

### Second Language (Hindi etc.)
**Not common (entire subject):** 1. Composition 2. Letter 3. Comprehension 4. Grammar & usage 5. Prescribed texts (2 textbooks) 6. Internal assessment.

### History & Civics (Paper 1)
**Not common:** 1. Jainism and Buddhism 2. The Sangam Age 3. Medieval India (b): Delhi Sultanate 4. Medieval India (c): Mughal Empire 5. Medieval India (d): Composite Culture — Bhakti & Sufism 6. Modern Europe (a): Renaissance 7. Modern Europe (b): Reformation 8. Modern Europe (c): Industrial Revolution, Socialism vs Capitalism 9. Project.
**Thin:** Local Self-Government (1 node vs ICSE's 3-tier detail).
**CBSE-only:** `c9_hist_ch1` historiography; Egyptian civilisation.

### Geography (Paper 2)
**Not common:** 1. Our World (geographic grid, time calculation, rotation/revolution) 2. Hydrosphere (tides, ocean currents) 3. Natural Regions of the World 4. Map Work (world outline) 5. Practical record file.
**Thin:** Pollution (climate-impact nodes only; no air/water/soil/noise types).
**CBSE-only:** Indian monsoon/India-centric climate nodes.

### Mathematics (51)
**Not common:** 1. Compound Interest (half-yearly, growth/depreciation) 2. Indices 3. Logarithms 4. Triangles (congruency, Mid-Point & Pythagoras theorems) 5. Rectilinear Figures + Area theorems 6. Statistics (mean/median, frequency polygon) 7. Internal assessment.
**CBSE-only:** Probability (ch7); Sequences/AP (ch8).

### Science — Physics (Paper 1)
**Not common:** 1. Fluids (Pascal, Archimedes, floatation) 2. Heat and Energy (anomalous expansion, energy sources, global warming) 3. Light (reflection, plane & spherical mirrors) 4. Practicals. **Thin:** gravitation sub-topic of Laws of Motion (0 nodes).
**CBSE-only:** `c9_physics_ch4` Work and Energy.

### Science — Chemistry (Paper 2)
**Not common:** 1. Chemical Changes and Reactions 2. Water 3. The Periodic Table 4. Study of the First Element — Hydrogen 5. Study of Gas Laws (Boyle, Charles) 6. Atmospheric Pollution 7. Practicals.
**Thin:** Language of Chemistry (no symbols/valency-table/equation-balancing unit).
**CBSE-only:** `c9_chem_ch1` Is Matter Around Us Pure.

### Science — Biology (Paper 3)
**Not common:** 1. Plant Physiology (absorption, transpiration, photosynthesis) 2. Human Anatomy and Physiology (skeleton, digestive, respiratory, circulatory, excretory, skin) 3. Health and Hygiene (diseases, vectors, immunity) 4. Waste Generation and Management 5. Practicals.
**CBSE-only:** human-reproduction half of `c9_bio_ch3`.

### Economics (64)
**Not common:** 1. The Indian Economy: A Study (sectors, Green Revolution, food security) 2. Major Problems of the Indian Economy 3. Project. **Thin:** Reforms & Emerging Trends (1 node).
**CBSE-only:** `c9_eco_ch2` demand/supply.

### Entire subjects with zero coverage
- **Commercial Studies (63):** Commercial Activities; Departments; Communication; Accounting & Bookkeeping; Banking; Trade; Social Responsibility.
- **Environmental Science (82):** 11 units (Ecosystems → Agriculture).
- **Computer Applications (86, Java):** OOP concepts; Objects & Classes; Values/Data Types; Operators; Input; Math methods; Conditionals; Iteration; Nested loops; Computing ethics.
- **Economic Applications (87):** Indian Economy overview; Infrastructure; Consumer Awareness.
- **Commercial Applications (88):** Commercial Organisations; Functioning; Business Communication; Accounting mechanics.
- **Art (60), Home Science (68), Physical Education (72), Yoga (84), Mass Media & Communication (90):** entire subjects absent.
- Also absent (no chapter breakdown inventoried): Modern Foreign Languages, Classical Language, Performing Arts, Cookery, Fashion Designing, Technical Drawing Applications, Hospitality Management.

`ICSE 9: 19 subjects, 167 CISCE chapters, 36 common, 131 not common.`

---

## ICSE Class 10

### English (Group I)
**Not common:** 1. Unseen comprehension 2. Drama: *Julius Caesar* Acts III–V 3–7. Prose (*Treasure Chest*): *With the Photographer*, *The Elevator*, *The Girl Who Can*, *The Pedestrian*, *The Last Lesson* 8–12. Poetry: *Haunted Houses*, *The Glove and the Lions*, *When Great Trees Fall*, *A Considerable Speck*, *The Power of Music*.
**CBSE-only:** First Flight + Footprints (18 chapter groups).

### Second Language — Hindi
**Not common:** 1. *Naya Raasta* (novel) 2. Entire deployed Hindi section — 0 `c10_hin` files; the 37 registry nodes (Sahitya Sagar ×10, poems ×10, Ekanki Sanchay ×6→5 nodes, लेखन/अपठित/व्याकरण) are never materialised and thin per-text.

### Second Language — Sanskrit
**Not common (entire subject):** Composition; Letter; Comprehension; Grammar (declensions, sandhi); *Sanskrit Vani* Book 5.

### History & Civics (Paper 1)
**Not common:** 1. The Union Legislature 2. The Union Executive 3. The Judiciary (Supreme Court, Lok Adalats) 4. The First War of Independence, 1857 5. Forward Bloc and INA 6. Independence and Partition (Cabinet Mission, Mountbatten, 1947 Act) 7. The First World War 8. Rise of Dictatorships (Fascism/Nazism) 9. The Second World War 10. United Nations 11. Non-Aligned Movement.
**CBSE-only:** Nationalism in Europe, Global World, Industrialisation, Print Culture; 5 civics chapters (Power-sharing → Outcomes of Democracy).

### Geography (Paper 2)
**Not common:** 1. Interpretation of Topographical Maps 2. Map of India drill 3. Location, Extent and Physical Features 4. Climate (monsoon mechanism — no dedicated chapter) 5. Waste Management.

### Mathematics
**Not common:** 1. GST 2. Banking (Recurring Deposits, M.V. formula) 3. Shares and Dividends 4. Linear Inequations 5. Ratio and Proportion (componendo/dividendo) 6. Matrices (2×2) 7. Geometric Progression 8. Reflection (coordinate transformations) 9. Loci.
**Thin (corrected):** Factor/Remainder theorem drills; standalone construction steps.
**CBSE-only:** Real Numbers; Polynomials; Pair of Linear Equations; Areas Related to Circles.

### Physics
**Not common:** 1. Force, Work, Power and Energy (moments, equilibrium, machines) 2. Sound (echoes, SONAR, resonance, noise pollution) 3. Heat / Calorimetry (specific heat, method of mixtures, latent heat).
**Thin (corrected):** Modern Physics (missing α/β/γ decay, nucleus, background radiation); Light (missing total internal reflection, EM spectrum, scattering); Electricity (missing transformer, emf/internal resistance).
**CBSE-only:** Sources of Energy (ch03).

### Chemistry
**Not common:** 1. Analytical Chemistry (NH₄OH/NaOH qualitative) 2. Mole Concept and Stoichiometry (Gay-Lussac, vapour density) 3. Electrolysis (standalone) 4. Study of Compounds: HCl, Ammonia, Nitric Acid, Sulphuric Acid.
**Thin (corrected):** coordinate bond, electron-dot structures, polarity; Metallurgy depth.
**CBSE-only:** Chemical Reactions and Equations (ch01).

### Biology
**Not common:** 1. Cell Cycle and Cell Division (mitosis/meiosis phases) 2. Structure of Chromosome 3. Population 4. Pollution.
**Thin:** Transpiration (4 nodes vs dedicated chapter).

### Economics
**Not common:** 1. The Productive Mechanism 2. Theory of Demand and Supply 3. Market (forms) 4. Inflation.
**CBSE-only:** Sectors of the Indian Economy; Globalisation.

### Entire subjects with zero coverage
- **Commercial Studies (10):** Stakeholders; Marketing & Sales; Finance & Accounting; Human Resources; Logistics; Government (EP Act 1986).
- **Environmental Science (II):** Controlling Air Pollution; Addressing Population; Urban Environment; Soil & Land; Food; Biodiversity; Energy; Waste; Environment & Development; Sustainable Future.
- **Computer Applications (Java):** OOP revision; Class as Basis of Computation; User-defined Methods; Constructors; Library Classes; Encapsulation; Arrays; String Handling.
- **Economic Applications:** Demand & Supply; Factors of Production; Market Structures.
- **Commercial Applications:** Markets & Marketing; Finance; Human Resources; Public Relations.
- **Environmental Applications:** Basic Resources; Resource Use; Eco-friendly Technologies; Initiatives I Can Take.
- **Home Science, Physical Education, Yoga, Technical Drawing Applications, Art, Mass Media & Communication:** entire subjects absent.

`ICSE 10: 22 subjects, 211 CISCE chapters, 74 common, 137 not common.`

---

## ISC Class 11

### English (801/802)
**Not common:** 1. Drama: *Macbeth* Acts I–II 2–5. Short stories (*Prism*): A Living God; Advice to Youth; The Paper Menagerie; The Great Automatic Grammatizator; Thank You Ma'am 6–9. Poems (*Rhapsody*): Abhisara – The Tryst; Why I Like the Hospital; Death of a Naturalist; Strange Meeting.
**Thin:** composition/directed/proposal writing (3 writing nodes only).
**CBSE-only:** Hornbill, Snapshots, Woven Words (Sonnet 116 shared).

### Physics / Chemistry / Biology
**Not common:** none — full unit-level overlap.

### Mathematics
**Not common:** 1. Statistics and Probability (unit 5 — no class-11 chapter).
**CBSE-only:** Mathematical Reasoning; Mathematical Induction.

### History (851 HIS)
**Not common (all 12 units):** Colonial Economy; Social Movements; Protest Movements (Indigo/Deccan/Munda); Growth of Nationalism; Gandhian Nationalism 1916–22; Gandhian Nationalism 1927–37; WWI; Great Depression & New Deal; Communism under Stalin; Fascism under Mussolini; Nazism under Hitler; Militarism in Japan.
**CBSE-only:** entire deployed `c11_hist` = NCERT Themes in World History (Mesopotamia → Italian Renaissance).

### Political Science
**Not common:** 1. Disintegration of the Soviet Union (sits in class-12 nodes) 2. Unipolar World 3. Regional Cooperation (ASEAN/EU/SAARC/BRICS/QUAD).
**Thin:** Origin of the State; Political Ideologies; Sovereignty; Law; South Asia (no dedicated nodes).
**CBSE-only:** Indian Constitution at Work chapters.

### Geography / Sociology / Psychology / Home Science
**Not common:** none — unit-level overlap.

### Economics
**Thin:** Understanding Economics intro unit (statistics-first corpus). **CBSE-only:** Rural Development; India–Pakistan–China.

### Accounts (851 ACC)
**Not common:** 1. Bills of Exchange 2. Non-Trading Organisation. **Thin:** Rectification of Errors.

### Business Studies (854)
**Not common:** 1. Entrepreneurship 2. Managers and Managerial Roles 3. Automation at Workplaces. **Thin:** Business Environment (PESTLE/SWOT).
**CBSE-only:** essentially the whole deployed CBSE BS-11 syllabus (overlaps ISC Commerce).

### Commerce (850)
**Not common:** 1. Stock Exchange (BSE/NSE/SEBI/demat).

### Computer Science (868)
**Not common:** 1. Programming in **Java** (objects, methods, arrays, strings, file I/O) — corpus is Python-based. **Thin:** Trends in Computing (IoT/cyber incidental; AI absent).
**CBSE-only:** problem solving, DSA, DBMS/SQL, data visualisation.

### Biotechnology
**Thin:** Growth & Development; Tissue Culture (downgraded).

### Entire subjects with zero coverage
- **Legal Studies (812):** all 7 units (Historical Evolution; Jurisprudence; Constitution; Legal Personality; Criminal Law; Civil Law & Torts; Family Law) — planning-JSON only.
- **Environmental Science (899):** all 6 units (Modes of Existence; Ecology; Pollution; Legal Regimes; Technology; Conservation Design) — planning-JSON only.

`ISC 11: 19 subjects, 136 CISCE chapters, 84 common, 38 not common (+14 thin).`

---

## ISC Class 12

### English (801/802)
**Not common:** 1. Drama: *Macbeth* Acts III–V 2–6. Short stories (*Prism*): Atithi; The Cookie Lady; Soft Rains; Indigo (Satyajit Ray — not CBSE's Fischer *Indigo*); Medicine Bag 7–11. Poems (*Rhapsody*): Soyinka; Tithonus; Beethoven; Mamang Dai; Donne.
**Thin:** 400–450-word composition; proposal writing; comprehension/summary; project writing (0 nodes each).
**CBSE-only:** Flamingo, Vistas, Kaleidoscope.

### Physics / Chemistry / Biology / Mathematics
**Not common:** none — full unit overlap (CBSE-only extras: Communication Systems in Physics).

### History (851 HIS)
**Not common:** 1. World War II 2. De-colonisation in Asia (China) and Africa (Ghana, Kenya) 3. Middle East: Israeli-Palestine Conflict 1916–1993.
**Thin:** Women's Rights movements (Towards Equality); Protest Movements (civil rights, anti-apartheid).
**CBSE-only:** entire deployed `c12_hist` = NCERT Themes in Indian History (ISC units 1–5, 9 covered via Political Science corpus).

### Political Science / Sociology / Home Science / Biotechnology / Economics
**Not common:** none.

### Geography
**Not common:** 1. Regional Economic Development case studies (Chhattisgarh, Bengaluru electronics, Haldia).
**CBSE-only:** Fundamentals of Human Geography world papers; practicals ch18–21.

### Accounts
**Thin:** DBMS/SQL-in-accounting. **CBSE-only:** payroll accounting, graphs.

### Business Studies (854)
**Not common:** 1. Business Communication and Correspondence 2. Globalisation and Recent Trends. **Thin (corrected):** Regulators & Intermediaries (SEBI/RBI covered inside other units).
**CBSE-only:** management-functions block ch01–08; Financial Management ch09.

### Commerce (850)
**Not common:** none (served by Business Studies nodes; no dedicated `12_comm` files exist).

### Computer Science (868)
**Not common:** 1. Computer Hardware (adders, encoders, multiplexers) 2. Programming in **Java** 3. Inheritance, Interfaces and Polymorphism. **Thin:** Tower of Hanoi/recursion depth.

### Psychology
**Thin:** Lifespan Development; environmental psychology.

### Entire subjects with zero coverage
- **Legal Studies (812):** Law of Crimes; Law of Contracts; Law of Torts; ADR (Lok Adalat, arbitration); Property Law; Legal Maxims — planning-JSON only.
- **Environmental Science (899):** Ecological Thought & Sustainability; Urbanisation; Agriculture & Post-Harvest; Resource Economics & Trade — planning-JSON only (rest overlapped by Biology ecology).

`ISC 12: 19 subjects, 141 CISCE chapters, 104 common, 22 not common (+15 thin).`

---

## What this means for the CISCE build

1. **Whole subjects to create from scratch** (~250 of the 418 gaps): Computer Studies 6–8, Arts 6–8, all Hindi CISCE material (registry exists — materialise + deepen), Sanskrit, Commercial/Economic/Environmental/Applications group at 9–10, Art/Home Science/PE/Yoga/Mass Media/Technical Drawing at 9–10, Legal Studies + Environmental Science at 11–12.
2. **Shared subjects needing new chapters** (~170 gaps): ICSE humanities block 9–10 (H&C + map-work Geography), ICSE Maths/Phy/Chem/Bio-specific chapters 9–10, all literature set texts (Julius Caesar, Treasure Chest, Prism, Rhapsody, Macbeth, plus Hindi/Sanskrit texts), ISC History 11–12, ISC Java CS.
3. **Reuse candidates**: ISC 11–12 Physics/Chem/Bio/Maths/Geo/Soc/Psy/Accounts are ~fully common; CBSE-only extras should be filtered out of a CISCE student's syllabus view rather than re-authored.
4. **Node-ID convention for new content**: `c{class}_{subject}_{board}_{chapter}_{num}.md` with board token `icse` (classes 6–10) / `isc` (11–12). Note: `services/enhanced_nodes.py` ID regex currently hardcodes `_cbse_` and needs generalising before any CISCE file can load.
