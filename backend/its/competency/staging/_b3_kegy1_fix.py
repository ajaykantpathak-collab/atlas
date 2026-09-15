"""Append a third concept to each kegy part-1 catalog (3-concept minimum)."""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _b3_build import concept

OUT = os.path.dirname(os.path.abspath(__file__)) + "/"
V = "verify_property"
STEPS = [{"step": 1, "action": "identify the feature or process",
          "explain": "Note the defining elements of the topic in the question."},
         {"step": 2, "action": "relate to the chapter details",
          "explain": "Match the elements with the chapter's description and examples."},
         {"step": 3, "action": "state the conclusion",
          "explain": "Summarise the answer with key terms and examples."}]

ADD = {
 "catalog_class11_geography_kegy101.json": concept(
    "kegy.101.3.1", "Standard Meridian, Time and India's Size", "Location",
    "India covers about 3.28 million square km, nearly 2.4 per cent of the world's total area, and the standard meridian of 82 degree 30 minute east passing through Mirzapur fixes Indian Standard Time, about five and a half hours ahead of Greenwich Mean Time.",
    "", "The east-west spread of about 30 degrees of longitude makes the sun rise nearly two hours earlier in Arunachal Pradesh than in Gujarat, which the standard meridian harmonises.",
    "kegy101.txt size and standard meridian sections",
    ["how large is india in area compared to the world",
     "which meridian is taken as the standard meridian of india",
     "why does the sun rise earlier in arunachal pradesh than in gujarat",
     "what is the time difference between ist and gmt",
     "which states does the tropic of cancer pass through",
     "how does india's size give it diversity of climate and vegetation"],
    V, STEPS),
 "catalog_class11_geography_kegy102.json": concept(
    "kegy.102.3.1", "Significance of the Himalayas and Physiographic Diversity", "Physiography",
    "The Himalayan barrier shields the plains from cold winds, forces monsoon rains to ascend and feed perennial rivers, and together with the plateau, plains, coasts and islands gives India unmatched physiographic diversity of landscapes, soils, climates and economies.",
    "", "Physiographic regions guide agriculture, industry and settlement, since each division offers distinct resources like alluvial soils of the plains and minerals of the plateau.",
    "kegy102.txt significance discussion",
    ["how do the himalayas influence the climate and rivers of india",
     "state the significance of the peninsular plateau for minerals",
     "why are the northern plains called the granary of india",
     "how does physiography affect the economy of a region",
     "relate physiographic divisions to the diversity of india",
     "why are coasts and islands important for trade"],
    V, STEPS),
 "catalog_class11_geography_kegy103.json": concept(
    "kegy.103.3.1", "Important Rivers and Water Resources Management", "Drainage system",
    "India's rivers carry about 1869 cubic km of water annually, and their basins support hydel power, irrigation and inland navigation, so water management through multipurpose projects, pollution control and inter-state cooperation is central to the drainage geography of the country.",
    "", "Multipurpose river valley projects like the Bhakra Nangal and Damodar Valley combine irrigation, power, flood control and navigation on the major river systems.",
    "kegy103.txt water resources discussion",
    ["name the multipurpose projects built on indian rivers",
     "what are the benefits of river valley projects", "how can river pollution be controlled",
     "why do inter state river disputes arise and how are they settled",
     "state the uses of the ganga and indus river waters",
     "what is the role of rivers in indian agriculture"],
    V, STEPS),
 "catalog_class11_geography_kegy104.json": concept(
    "kegy.104.3.1", "Climate, Monsoon Dependence and Its Variability", "Climate",
    "India's climate is described as the monsoon type with alternating wet and dry seasons, and the economy from agriculture to water supply depends on the timing and variability of monsoon rains, so years of weak monsoon bring drought while strong monsoons bring floods.",
    "", "The southwest monsoon delivers about 75 to 80 per cent of annual rainfall in four months, making its variability the single most important climatic fact of India.",
    "kegy104.txt monsoon dependence discussion",
    ["why is india said to have a monsoon type of climate",
     "how does monsoon variability affect indian agriculture",
     "what share of annual rainfall does the southwest monsoon bring",
     "compare the climates of kerala and rajasthan",
     "how do jet streams and el nino influence monsoon strength",
     "state the effects of a failed monsoon on the economy"],
    V, STEPS),
 "catalog_class11_geography_kegy105.json": concept(
    "kegy.105.3.1", "Forest Cover, Uses and Biodiversity Value", "Natural vegetation",
    "Forests cover about a fifth of India's area, providing timber, fuel, fodder, bamboo, medicinal plants and habitat for biodiversity, and the National Forest Policy aims at one third of the land under forest to maintain ecological balance.",
    "", "Forests regulate climate, hold soils against erosion and recharge water, so their conservation serves both economic use and ecological stability.",
    "kegy105.txt forest uses and policy sections",
    ["what does the national forest policy aim at",
     "state the direct and indirect uses of forests",
     "how do forests prevent soil erosion and floods",
     "why are forests called biodiversity hotspots",
     "compare reserved protected and unclassed forests",
     "how does deforestation affect the environment"],
    V, STEPS),
 "catalog_class11_geography_kegy106.json": concept(
    "kegy.106.3.1", "Vulnerability Zones and Community Preparedness", "Natural hazards",
    "India's hazard vulnerability is mapped into seismic zones with the Himalayan belt in the most severe zone, a cyclone prone east coast, flood plains of the Ganga-Brahmaputra and drought prone arid tracts, so vulnerability zoning with community preparedness reduces disaster losses.",
    "", "Knowing the vulnerable zone lets authorities plan building codes, shelters and evacuation routes before the hazard strikes.",
    "kegy106.txt vulnerability sections",
    ["which areas of india fall in the highest seismic zone",
     "why is the east coast more cyclone prone than the west",
     "which regions of india are drought prone",
     "how does vulnerability zoning help in disaster planning",
     "describe the role of the community in disaster preparedness",
     "name the flood prone areas of india"],
    V, STEPS),
 "catalog_class11_geography_kegy201.json": concept(
    "kegy.201.3.1", "Latitude, Longitude and the Study of the Earth's Surface", "Geography as a discipline",
    "Geography uses coordinates of latitude and longitude, maps, scales and remote sensing to locate and explain phenomena on the earth's surface, making it the study of areal differentiation and spatial organisation of both physical and human features.",
    "", "Locating places precisely through the grid of parallels and meridians is the first step of all geographical analysis.",
    "kegy201.txt locating features discussion",
    ["how do latitude and longitude locate a place on the earth",
     "what is the role of maps in geographical study",
     "define areal differentiation with an example",
     "how does remote sensing aid geographical analysis",
     "state the difference between latitude and longitude",
     "why is the spatial perspective unique to geography"],
    V, STEPS),
 "catalog_class11_geography_kegy202.json": concept(
    "kegy.202.3.1", "The Solar System, Planets and the Earth as a Unique Planet",
    "Solar system",
    "The solar system holds eight planets of which Mercury, Venus, Earth and Mars are terrestrial rocky planets while Jupiter, Saturn, Uranus and Neptune are jovian gas giants, and the earth alone sustains life because of its ideal distance from the sun, water, atmosphere and ozone shield.",
    "", "The earth's size and distance from the sun hold gases and water in the right balance, which is why it is called a privileged or unique planet.",
    "kegy202.txt solar system sections",
    ["name the eight planets in order from the sun",
     "differentiate terrestrial and jovian planets",
     "why is the earth called a unique or privileged planet",
     "what role does the ozone layer play for life",
     "compare the earth with venus and mars",
     "state the conditions that make life possible on the earth"],
    V, STEPS),
 "catalog_class11_geography_kegy203.json": concept(
    "kegy.203.3.1", "Earthquakes, Volcanoes and Their Interior Links",
    "Interior of the earth",
    "Earthquakes release energy as seismic waves along faults, volcanoes erupt magma from the asthenosphere, and both phenomena connect to the layered interior and moving plates, with epicentre, focus and intensity scales describing their occurrence.",
    "", "Study of the interior explains why earthquakes cluster at plate boundaries and why volcanic rocks like basalt reveal mantle material at the surface.",
    "kegy203.txt earthquakes and volcanoes sections",
    ["define focus and epicentre of an earthquake",
     "how are earthquakes measured and classified",
     "what is the relation between volcanoes and the earth's interior",
     "name the types of volcanoes with examples",
     "why do earthquake waves bend at layer boundaries",
     "state the causes and effects of earthquakes"],
    V, STEPS),
 "catalog_class11_geography_kegy204.json": concept(
    "kegy.204.3.1", "Distribution of Oceans, Continents and Indian Plate Movements",
    "Distribution of oceans and continents",
    "Oceans cover about 71 per cent and continents about 29 per cent of the earth's surface, and the Indian plate's northward drift after breaking from Gondwanaland continues to push the Himalayas upward while making the Indian subcontinent seismically active.",
    "", "The distribution of land and water follows plate boundaries, with mid ocean ridges marking construction and trenches marking consumption of crust.",
    "kegy204.txt distribution and indian plate sections",
    ["what percentage of the earth is covered by oceans",
     "how does the indian plate movement affect the himalayas",
     "name the types of plate margins of the indian plate",
     "why is the indian subcontinent prone to earthquakes",
     "describe the deccan trap volcanism and its origin",
     "what was gondwanaland and which present lands formed it"],
    V, STEPS),
}

for fname, extra in ADD.items():
    p = OUT + fname
    cat = json.load(open(p, encoding="utf-8"))
    if len(cat["concepts"]) >= 3:
        print("skip", fname)
        continue
    cat["concepts"].append(extra)
    json.dump(cat, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("patched", fname)
