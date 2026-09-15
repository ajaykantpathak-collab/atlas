"""Build batch_3 geography catalogs part 1: kegy101-106, kegy201-204."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _b3_build import step, concept, worked, catalog, dump

SRC = "D:/node_generator/ncert-mcp/data/processed/text_cache_new/"
OUT = os.path.dirname(os.path.abspath(__file__)) + "/"
V = "verify_property"
C = "compute"


def simple_concept(*args):
    args = [a for a in args if a != ""]
    code, sec, title, section, definition, key_idea, ref, qps = args
    return concept(code, title, section, definition, "", key_idea, ref, qps, V,
                   [{"step": 1, "action": "identify the feature or process", "explain": "Note the defining elements of the topic in the question."},
                    {"step": 2, "action": "relate to the chapter details", "explain": "Match the elements with the chapter's description and examples."},
                    {"step": 3, "action": "state the conclusion", "explain": "Summarise the answer with the key terms and examples."}])


# kegy101 India: Location
c1 = simple_concept("kegy.101.1.1", "1.1", "Size and Location of India in the World",
    "Location", "India lies entirely in the northern hemisphere between about 8 degree 4 minute and 37 degree 6 minute north latitude and 68 degree 7 minute and 97 degree 25 minute east longitude, with the Tropic of Cancer dividing the country into almost two equal halves and the 82 degree 30 minute east meridian fixing Indian Standard Time.",
    "India's central location at the head of the Indian Ocean and its contacts with West Asia, Africa, Europe and East Asia give it a commanding trade and cultural position.",
    "kegy101.txt size and location sections",
    ["describe the latitudinal and longitudinal extent of india",
     "what is the significance of the tropic of cancer for india", "how is indian standard time determined",
     "which water bodies border the indian peninsula", "why is india called a subcontinent",
     "name india's neighbouring countries and their locations"])
c2 = simple_concept("kegy.101.2.1", "1.2", "India and Its Neighbours: Political Contacts",
    "India and its neighbours", "India shares land boundaries with Pakistan, Afghanistan, China, Nepal, Bhutan, Bangladesh and Myanmar, and its island neighbours Sri Lanka and Maldives lie across the Palk Strait and the Arabian Sea, linking South Asia through trade and culture.",
    "The Himalayas guard the north, the Bay of Bengal, Arabian Sea and Indian Ocean enclose the peninsula, and Sri Lanka is separated by the narrow Palk Strait.",
    "kegy101.txt india and neighbours section",
    ["name the countries sharing a land border with india",
     "which strait separates sri lanka from india", "how do the himalayas influence india's northern boundary",
     "locate india's island neighbours", "which states border pakistan and bangladesh",
     "why is the indian ocean named after india"])
cat = catalog(11, "geography", 101, "India: Location", SRC + "kegy101.txt", [c1, c2], [],
              [{"id": "exq1", "source_ref": "kegy101.txt exercises",
                "questions": ["Choose the right answer: The Tropic of Cancer does not pass through which state?",
                 "Name the group of islands lying in the Arabian Sea.",
                 "Why is the 82 degree 30 minute E meridian important for India?",
                 "The sun rises in Arunachal Pradesh about two hours before Gujarat - explain.",
                 "Name the neighbouring countries of India and their capitals."]}])
dump(OUT + "catalog_class11_geography_kegy101.json", cat)

# kegy102 Structure and Physiography
c1 = simple_concept("kegy.102.1.1", "1.1", "Geological Structure and the Himalayan Mountains",
    "Physiography", "India's physiography rests on the Peninsular block, the Himalayas and other young fold mountains, and the Indo-Ganga-Brahmaputra plain; the Himalayas show three major divisions of Greater Himalaya or Himadri, Lesser Himalaya or Himachal and Shiwaliks, along with Purvanchal eastern hills.",
    "The syntaxial bends at Nanga Parvat and Namcha Barwa and the trans-Himalayan Karakoram, Ladakh and Zanskar ranges complete the northern mountain wall.",
    "kegy102.txt himalayan mountains section",
    ["describe the three divisions of the himalayas",
     "what are the syntaxial bends of the himalayas", "differentiate greater himalaya lesser himalaya and shiwaliks",
     "name the ranges of the trans himalayan region", "which valleys and passes occur in the himachal himalaya",
     "describe the purvanchal or eastern hills"])
c2 = simple_concept("kegy.102.2.1", "1.2", "Northern Plains, Peninsular Plateau and Coastal Regions",
    "Physiography", "The Northern Plains formed of alluvium stretch from Punjab to Assam with Bhabar, Terai, Bhangar and Khadar belts; the Peninsular Plateau carries the Deccan trap, Central Highlands and Deccan Plateau, and the coastal plains with Keralan backwaters, plus islands of Andaman-Nicobar and Lakshadweep, complete the physiographic divisions.",
    "The plateau's structural differences, the Gondwana coal fields and the volcanic Deccan traps mark the peninsular block's distinct geological history.",
    "kegy102.txt northern plains and plateau sections",
    ["divide the northern plains and name their belts",
     "describe the central highlands and deccan plateau", "what are bhabar terai bhangar and khadar",
     "name the physiographic divisions of india", "compare the arabian sea and bay of bengal coastal plains",
     "describe the islands of india and their origin"])
cat = catalog(11, "geography", 102, "Structure and Physiography", SRC + "kegy102.txt", [c1, c2], [],
              [{"id": "exq1", "source_ref": "kegy102.txt exercises",
                "questions": ["Describe the major structural divisions of India.",
                 "What is the significance of the Purvanchal hills?",
                 "Discuss the formation of the northern plains.",
                 "Distinguish between bhangar and khadar.",
                 "Write a short note on the Deccan Trap."]}])
dump(OUT + "catalog_class11_geography_kegy102.json", cat)

# kegy103 Drainage System
c1 = simple_concept("kegy.103.1.1", "1.1", "Drainage Patterns and the Himalayan Rivers",
    "Drainage system", "The drainage system of India follows the uplift of the Himalayas and the peninsular slope, showing dendritic, trellis, radial and rectangular patterns; the Himalayan rivers Indus, Ganga and Brahmaputra are perennial, snow fed and form big basins with gorges, meanders and deltas.",
    "", "The Indus rises near Mansarovar with five tributaries of Jhelum, Chenab, Ravi, Beas and Sutlej, while the Ganga basin and Brahmaputra carry the largest water volume.",
    "kegy103.txt himalayan rivers section",
    ["name the major himalayan rivers and their tributaries",
     "explain dendritic and trellis drainage patterns", "why are himalayan rivers perennial",
     "describe the course of the indus system in india", "compare ganga and brahmaputra river systems",
     "what is a river basin and drainage divide"])
c2 = simple_concept("kegy.103.2.1", "1.2", "Peninsular Rivers, River Regimes and Pollution",
    "Peninsular drainage", "Peninsular rivers like the Mahanadi, Godavari, Krishna, Kaveri, Narmada and Tapi are rain fed and seasonal, flowing through hard rock terrain with estuaries instead of large deltas, and their flow regimes depend on the monsoon; rivers face pollution and inter-state disputes requiring water quality management.",
    "", "The east flowing rivers form deltas while the west flowing Narmada and Tapi occupy rift valleys making estuaries, which shows the structural control of peninsular drainage.",
    "kegy103.txt peninsular rivers and pollution sections",
    ["compare east flowing and west flowing peninsular rivers",
     "why do narmada and tapi form estuaries", "name the himalayan and peninsular drainage systems",
     "describe the regime of peninsular rivers", "what are the causes of river pollution in india",
     "explain the evolution of the peninsular drainage system"])
cat = catalog(11, "geography", 103, "Drainage System", SRC + "kegy103.txt", [c1, c2], [],
              [{"id": "exq1", "source_ref": "kegy103.txt exercises",
                "questions": ["Name the major drainage patterns with examples.",
                 "Why are the Himalayan rivers perennial and peninsular rivers seasonal?",
                 "Describe the drainage pattern of peninsular rivers.",
                 "What is meant by a drainage divide?",
                 "Write a note on river pollution and its control."]}])
dump(OUT + "catalog_class11_geography_kegy103.json", cat)

# kegy104 Climate
c1 = simple_concept("kegy.104.1.1", "1.1", "Monsoon Mechanism and Seasons of India",
    "Climate", "India's climate is dominated by the monsoon mechanism of differential heating, ITCZ shift, jet streams and Tibetan plateau effects, giving four seasons of cold weather, hot weather, advancing monsoon and retreating monsoon with rainfall from the Arabian Sea and Bay of Bengal branches.",
    "", "The onset and retreat of the southwest monsoon, the burst of the monsoon, and October heat and retreating monsoon rains of Tamil Nadu shape the annual weather rhythm.",
    "kegy104.txt monsoon and seasons sections",
    ["explain the mechanism of the indian monsoon",
     "describe the seasons of india in order", "what are the arabian sea and bay of bengal monsoon branches",
     "define burst of the monsoon and october heat", "what is the role of jet streams in the monsoon",
     "state the features of the retreating monsoon season"])
c2 = simple_concept("kegy.104.2.1", "1.2", "Rainfall Distribution, Variability and El Nino",
    "Rainfall distribution", "Rainfall in India varies from very high on the Western Ghats windward side and Meghalaya's Cherrapunji-Mawsynram to arid western Rajasthan, with the El Nino southern oscillation affecting monsoon strength and variability year to year.",
    "", "Areas receiving over 400 cm of rain contrast with below 60 cm zones, and this variability decides agriculture, water supply and flood-drought risk.",
    "kegy104.txt rainfall distribution section",
    ["describe the spatial distribution of rainfall in india",
     "what is el nino and how does it affect the monsoon", "name the wettest and driest regions of india",
     "why do the western ghats receive heavy rainfall", "explain monsoon variability and its effects",
     "define the el nino southern oscillation"])
cat2 = catalog(11, "geography", 104, "Climate", SRC + "kegy104.txt", [c1, c2], [],
               [{"id": "exq1", "source_ref": "kegy104.txt exercises",
                 "questions": ["Describe the mechanism of monsoon onset in India.",
                  "Discuss the spatial distribution of rainfall in the country.",
                  "What is the ITCZ and how does it affect the monsoon?",
                  "Explain the El Nino effect on the Indian monsoon.",
                  "Name the seasons of India with their main features."]}])
dump(OUT + "catalog_class11_geography_kegy104.json", cat2)

# kegy105 Natural Vegetation
c1 = simple_concept("kegy.105.1.1", "1.1", "Types of Forests in India",
    "Natural vegetation", "India's natural vegetation ranges from tropical evergreen and semi-evergreen forests in heavy rainfall areas, tropical deciduous or monsoon forests of moist and dry types, tropical thorn forests of arid zones, montane forests by altitude, to littoral and swamp forests of mangroves in deltas.",
    "", "Tropical deciduous forests are the most widespread, shedding leaves in the dry season, while evergreen forests show multi-storeyed diversity above 200 cm rainfall.",
    "kegy105.txt types of forests section",
    ["classify the forest types of india with rainfall zones",
     "differentiate moist and moist dry deciduous forests", "describe montane forests by altitude",
     "what are mangrove or littoral forests and where do they grow", "name the trees of tropical evergreen forests",
     "where are thorn forests found and what trees grow there"])
c2 = simple_concept("kegy.105.2.1", "1.2", "Forest Conservation and Social Forestry",
    "Forest conservation", "Forest conservation rests on joint forest management with local communities, social forestry of farm and avenue planting, protection of biodiversity through national parks and sanctuaries, and wildlife protection laws against depletion of forest cover.",
    "", "The Forest Conservation policy and joint forest management involve villagers in protecting degraded forests, sharing benefits of regeneration.",
    "kegy105.txt conservation section",
    ["explain joint forest management and its benefits",
     "define social forestry and its components", "how do national parks and sanctuaries protect wildlife",
     "state the causes of depletion of forest resources", "what measures conserve natural vegetation",
     "describe the wildlife protection policy of india"])
cat = catalog(11, "geography", 105, "Natural Vegetation", SRC + "kegy105.txt", [c1, c2], [],
              [{"id": "exq1", "source_ref": "kegy105.txt exercises",
                "questions": ["Choose the right answer about forest types.",
                 "Explain the types of natural vegetation of India.",
                 "What is social forestry? State its objectives.",
                 "Describe the features of tropical deciduous forests.",
                 "Why are mangroves important for the coast?"]}])
dump(OUT + "catalog_class11_geography_kegy105.json", cat)

# kegy106 Natural Hazards and Disasters
c1 = simple_concept("kegy.106.1.1", "1.1", "Natural Hazards: Earthquakes, Tsunami, Cyclones and Floods",
    "Natural hazards", "Natural hazards include earthquakes along seismic zones, tsunamis from undersea earthquakes, tropical cyclones of the Bay of Bengal and Arabian Sea, floods and droughts from rainfall variability, and landslides in mountains, each demanding preparedness and management.",
    "", "India's seismic zoning marks the most quake-prone Himalayan belt, and the east coast faces frequent tropical cyclones in the retreating monsoon season.",
    "kegy106.txt hazards sections",
    ["classify the natural hazards affecting india",
     "why are the himalayas earthquake prone", "how do tropical cyclones form in the indian seas",
     "what causes floods and droughts in india", "explain the occurrence of landslides in mountains",
     "describe the tsunami hazard of the indian ocean"])
c2 = simple_concept("kegy.106.2.1", "1.2", "Disaster Management and Mitigation",
    "Disaster management", "Disaster management moves through prevention, mitigation, preparedness, response and recovery, using early warning systems, cyclone shelters, land use regulation, relief and rehabilitation to reduce losses from natural hazards.",
    "", "Community preparedness with warning dissemination and rescue training converts hazards from disasters into manageable events.",
    "kegy106.txt management section",
    ["state the phases of disaster management",
     "what early warning systems exist for cyclones", "how does land use regulation reduce disaster risk",
     "explain relief and rehabilitation after a disaster", "what is mitigation in disaster management",
     "describe community preparedness for natural hazards"])
cat = catalog(11, "geography", 106, "Natural Hazards and Disasters", SRC + "kegy106.txt", [c1, c2], [],
              [{"id": "exq1", "source_ref": "kegy106.txt exercises",
                "questions": ["Define natural hazard and disaster with examples.",
                 "Explain the causes and effects of earthquakes in India.",
                 "Describe the management of flood hazards.",
                 "What is a cyclone and how are warnings issued?",
                 "Suggest mitigation measures for landslides."]}])
dump(OUT + "catalog_class11_geography_kegy106.json", cat)

# kegy201 Geography as a Discipline
c1 = simple_concept("kegy.201.1.1", "1.1", "Geography as an Integrating Discipline and Its Branches",
    "Geography as a discipline", "Geography integrates the study of physical and human environments over the earth's surface, synthesising spatial and temporal relations, and divides into physical geography of geomorphology, climatology, hydrology and biogeography, and human geography of social, economic, population and settlement geography with branches of regional studies and spatial analysis.",
    "", "The word geography comes from Greek meaning earth description, and its dual approach studies both the natural and the cultural landscape.",
    "kegy201.txt branches of geography section",
    ["define geography as a discipline and its scope",
     "name the branches of physical and human geography", "what is the difference between regional and systematic geography",
     "how does geography integrate natural and social sciences", "explain the term spatial approach in geography",
     "state the importance of studying geography"])
c2 = simple_concept("kegy.201.2.1", "1.2", "Physical Geography and Its Importance",
    "Physical geography", "Physical geography deals with earth's surface processes of landforms, weather and climate, water, soils, plants and animals as integrated systems, explaining the spatial distribution of natural phenomena and their influence on human life.",
    "", "Understanding geomorphic, climatic and biotic processes helps in resource use, hazard preparedness and environmental management.",
    "kegy201.txt physical geography section",
    ["define physical geography and its branches",
     "why is physical geography important for human life", "name the four spheres of the physical environment",
     "how do geomorphic processes shape the land", "explain the study of climatology",
     "relate physical geography to environmental management"])
cat = catalog(11, "geography", 201, "Geography as a Discipline", SRC + "kegy201.txt", [c1, c2], [],
              [{"id": "exq1", "source_ref": "kegy201.txt exercises",
                "questions": ["Which one of the following scholars coined the term Geography?",
                 "Explain the branches of geography.",
                 "What is the difference between physical and human geography?",
                 "How does geography help in understanding the environment?",
                 "Define the term systematic approach in geography."]}])
dump(OUT + "catalog_class11_geography_kegy201.json", cat)

# kegy202 Origin and Evolution of the Earth
c1 = simple_concept("kegy.202.1.1", "1.1", "Early Theories: Nebular Hypothesis to Big Bang",
    "Origin of the earth", "Early theories of the earth's origin include the nebular hypothesis of Kant and Laplace with a slowly spinning cloud of gas, tidal theories of a passing star, and the modern Big Bang theory of a singular huge explosion about 13.7 billion years ago expanding the universe from the size of a point.",
    "", "The Big Bang expanded space, formed hydrogen and helium gases, and gravity condensed matter into galaxies and stars, with the solar system forming about 4.6 billion years ago.",
    "kegy202.txt early theories sections",
    ["explain the nebular hypothesis of the origin of the earth",
     "describe the big bang theory of the universe", "when did the solar system form according to modern theory",
     "compare tidal and collision theories", "what evidence supports the expanding universe",
     "define a light year in measuring cosmic distance"])
c2 = simple_concept("kegy.202.2.1", "1.2", "Evolution of the Earth: Planets, Moon and Life",
    "Evolution of the earth", "The solar system evolved from a disc shaped cloud of gas and dust with planetesimals accreting into planets; the moon formed by the giant impact or big splat theory, and the earth's evolution shows differentiation of layers, loss of primordial atmosphere and development of the present atmosphere and oceans enabling life.",
    "", "The evolution of life began in the oceans about 3.8 billion years ago with single celled blue green algae, long before the oxygen rich atmosphere formed.",
    "kegy202.txt evolution sections",
    ["describe the stages of the earth's evolution",
     "explain the giant impact or big splat theory of the moon", "how did the present atmosphere of the earth form",
     "when and how did life begin on the earth", "differentiate terrestrial and jovian planets",
     "what are planetesimals in the solar nebula"])
cat = catalog(11, "geography", 202, "The Origin and Evolution of the Earth", SRC + "kegy202.txt", [c1, c2], [],
              [{"id": "exq1", "source_ref": "kegy202.txt exercises",
                "questions": ["Multiple choice on the origin of the earth.",
                 "Explain the Big Bang theory with its evidence.",
                 "Describe the nebular hypothesis of Laplace.",
                 "How was the moon formed according to the giant impact theory?",
                 "Write a short note on the evolution of the atmosphere."]}])
dump(OUT + "catalog_class11_geography_kegy202.json", cat)

# kegy203 Interior of the Earth
c1 = simple_concept("kegy.203.1.1", "1.1", "Sources of Information About the Earth's Interior",
    "Interior of the earth", "Direct sources of the earth's interior are mining and drilling projects like the Kola superdeep borehole, while indirect sources include seismic waves, meteorites, gravitation, magnetic field and density studies that reveal a layered interior.",
    "", "Seismic waves behave differently in each layer, so their speed and direction reveal the crust, mantle and core and the discontinuities between them.",
    "kegy203.txt sources of information section",
    ["what are the direct and indirect sources of information about the earth's interior",
     "how do seismic waves reveal the earth's interior", "define shadow zone of earthquakes",
     "name the discontinuities inside the earth", "why are meteorites indirect evidence of the interior",
     "explain the behaviour of s and p waves in layers"])
c2 = simple_concept("kegy.203.2.1", "1.2", "Layers of the Earth: Crust, Mantle, Core and Rocks",
    "Structure of the earth", "The earth divides into the thin crust of sial and sima, the mantle with upper and lower parts separated by the Moho and Repetti discontinuities, and the core of nickel and iron divided by the Gutenberg discontinuity, made of rocks of igneous, sedimentary and metamorphic types in the crust.",
    "", "The asthenosphere in the upper mantle is the source of magma, and the core's liquid outer part and solid inner part explain the shadow zones of seismic waves.",
    "kegy203.txt layers and rocks sections",
    ["describe the layers of the earth with their depths",
     "define moho gutenberg and repetti discontinuities", "differentiate sial and sima",
     "classify rocks into igneous sedimentary and metamorphic", "what is the asthenosphere and why is it important",
     "compare the outer core and inner core of the earth"])
cat = catalog(11, "geography", 203, "Interior of the Earth", SRC + "kegy203.txt", [c1, c2], [],
              [{"id": "exq1", "source_ref": "kegy203.txt exercises",
                "questions": ["Multiple choice on the earth's interior.",
                "What are indirect sources of information about the interior?",
                "Describe the layers of the earth with a diagram.",
                "Define the shadow zone of an earthquake.",
                "Name the types of rocks with examples."]}])
dump(OUT + "catalog_class11_geography_kegy203.json", cat)

# kegy204 Distribution of Oceans and Continents
c1 = simple_concept("kegy.204.1.1", "1.1", "Continental Drift Theory of Wegener",
    "Continental drift", "Alfred Wegener's continental drift theory proposed that all continents formed a single landmass Pangaea surrounded by the ocean Panthalassa, which broke into Laurasia and Gondwanaland and drifted apart, supported by jigsaw fit of continents, rocks of same age, tillite deposits, placer deposits and fossil evidence.",
    "", "Wegener suggested pole-fleeing tidal and gravitational differential forces for drift, but the theory failed to explain the driving force until sea floor spreading revived it.",
    "kegy204.txt continental drift section",
    ["state the postulates of the continental drift theory",
     "what evidence supports the drift of continents", "define pangaea laurasia and gondwanaland",
     "which forces did wegener propose for the drift", "why was the drift theory initially rejected",
     "describe the jigsaw fit of continents"])
c2 = simple_concept("kegy.204.2.1", "1.2", "Sea Floor Spreading and Plate Tectonics",
    "Plate tectonics", "Harry Hess's sea floor spreading showed new crust forming at mid-ocean ridges and sinking at trenches, and plate tectonics divides the lithosphere into seven major plates moving over the asthenosphere, with divergent, convergent and transform boundaries building mountains, trenches and volcanoes.",
    "", "Convergent boundaries of ocean-continent, continent-continent and ocean-ocean type produce Andes, Himalayas and island arcs respectively, explaining the distribution of earthquakes and volcanoes.",
    "kegy204.txt plate tectonics section",
    ["explain sea floor spreading with its evidence",
     "name the major and minor plates of the world", "compare divergent convergent and transform plate boundaries",
     "how did the himalayas form by plate collision", "define subduction zone and trench",
     "relate plate boundaries to earthquakes and volcanoes"])
cat = catalog(11, "geography", 204, "Distribution of Oceans and Continents", SRC + "kegy204.txt", [c1, c2], [],
              [{"id": "exq1", "source_ref": "kegy204.txt exercises",
                "questions": ["Multiple choice on continental drift.",
                 "Who proposed the continental drift theory and what was Pangaea?",
                 "Explain sea floor spreading with evidence.",
                 "What are the major plates of the world?",
                 "Describe the types of plate boundaries with examples."]}])
dump(OUT + "catalog_class11_geography_kegy204.json", cat)
print("kegy part 1 done")
