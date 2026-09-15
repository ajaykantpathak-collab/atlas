"""Add third concepts to kegy205-214 and fix non-ASCII char in kegy206."""
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
 "kegy205": ("kegy.205.3.1", "Evolution of Landforms and Significance for Humans", "Geomorphic processes",
   "Landform evolution proceeds from youth to old age under each geomorphic agent, and the resulting plains, valleys and slopes decide soils, water supply, settlement and farming, so geomorphic knowledge guides land use and hazard avoidance.",
   "", "Slope stability, floodplain siting and groundwater recharge all depend on reading the geomorphic history of a landscape.",
   "kegy205.txt evolution and significance discussion",
   ["how do landforms evolve from youth to old age",
    "why is knowledge of geomorphic processes useful for humans",
    "relate landforms to land use and settlement patterns",
    "how does weathering help in soil formation",
    "state the hazards linked to unstable slopes",
    "explain the role of rivers in shaping human geography"],
   V, STEPS),
 "kegy206": ("kegy.206.3.1", "Application of Landform Knowledge in Planning", "Landforms and their evolution",
   "Reading landforms helps in selecting dam sites, terracing hill slopes, planning roads and settlements away from landslide and flood zones, and conserving scenic landforms for tourism, so geomorphology serves practical planning needs.",
   "", "Every landform carries constraints and opportunities, and planners who respect them avoid costly failures like dam seepage or road washouts.",
   "kegy206.txt application discussion",
   ["how does geomorphology help in selecting dam sites",
    "why must roads in mountains avoid landslide prone slopes",
    "how do floodplains guide settlement planning",
    "state the role of landforms in tourism development",
    "how does terracing control erosion on hill slopes",
    "explain land capability and its relation to landforms"],
   V, STEPS),
 "kegy207": ("kegy.207.3.1", "Weather, Climate and the Role of the Atmosphere for Life", "Composition and structure",
   "The atmosphere shields the earth from harmful ultraviolet rays, holds oxygen for breathing and carbon dioxide for plants, and through its water vapour and heat absorbing gases keeps the planet warm enough for life, while its motions produce weather and climate.",
   "", "Human activities that alter atmospheric composition, as in ozone depletion and greenhouse gas build up, directly threaten this life support system.",
   "kegy207.txt significance discussion",
   ["how does the atmosphere protect life on the earth",
    "distinguish weather and climate with examples",
    "why are greenhouse gases both useful and harmful",
    "what human activities change the composition of the atmosphere",
    "state the importance of ozone for the biosphere",
    "how do atmospheric gases regulate the earth's temperature"],
   V, STEPS),
 "kegy208": ("kegy.208.3.1", "Latitudinal Heat Balance and Its Global Effects", "Heat balance and temperature",
   "The latitudinal heat balance shows surplus net radiation between the tropics and deficit towards the poles, and atmospheric and oceanic circulation transfer the surplus heat polewards, keeping the tropics from overheating and the poles from freezing.",
   "", "Without this poleward heat transport by winds and currents, the equator would grow steadily hotter and high latitudes steadily colder.",
   "kegy208.txt latitudinal balance sections",
   ["explain the latitudinal heat balance of the earth",
    "how is surplus heat transferred from tropics to poles",
    "what role do winds and ocean currents play in heat transfer",
    "why do the tropics not keep getting hotter",
    "define net radiation and its variation by latitude",
    "state the effects of heat imbalance on global circulation"],
   V, STEPS),
 "kegy209": ("kegy.209.3.1", "Monsoon Circulation and Seasonal Wind Reversal", "Atmospheric circulation",
   "The monsoon is a seasonal reversal of winds caused by differential heating of land and sea and the shift of the ITCZ, bringing rain-bearing winds to Asia in summer and dry offshore winds in winter, and it is the most important regional weather system on the earth.",
   "", "Summer heating of Asia draws moist equatorial air inland giving heavy rains, while winter high pressure over the continent reverses the flow.",
   "kegy209.txt monsoon sections",
   ["define monsoon and explain its mechanism",
    "why do monsoon winds reverse direction seasonally",
    "state the role of the itcz in the asian monsoon",
    "compare summer and winter monsoon circulation",
    "how does differential heating of land and sea cause monsoons",
    "name the regions of the world with monsoon climate"],
   V, STEPS),
 "kegy210": ("kegy.210.3.1", "Water Balance and the Importance of Atmospheric Moisture", "Water in the atmosphere",
   "Atmospheric moisture links evaporation from oceans and lands with precipitation over land, forming the water balance that feeds rivers, lakes and groundwater, and the timing of this moisture delivery decides agriculture, water supply and flood risk.",
   "", "Only about one per cent of the hydrosphere is atmospheric water, yet it renews the entire land freshwater supply through continuous cycling.",
   "kegy210.txt water balance sections",
   ["explain the water balance of the earth",
    "what share of the hydrosphere is atmospheric water",
    "how does atmospheric moisture reach the land as fresh water",
    "relate humidity to the water needs of crops",
    "state the importance of precipitation timing for farmers",
    "how does evaporation from oceans feed the continents"],
   V, STEPS),
 "kegy211": ("kegy.211.3.1", "Climate Regions of India in the World Pattern", "World climate",
   "India spans several Koeppen climates from the Am tropical monsoon of the west coast, Aw savanna of the interior, BWhw hot desert of the northwest, Cwg humid subtropical of the north and the highland climates of the Himalayas, so the world climate pattern is reproduced within one country.",
   "", "This climatic variety explains India's range of crops, forests and settlement patterns from the equatorial coast to alpine heights.",
   "kegy211.txt indian climates discussion",
   ["which koeppen climate types occur in india",
    "describe the tropical monsoon climate of the west coast",
    "where does the hot desert climate occur in india",
    "compare the climate of the northern plains and the deccan",
    "what are highland climates and where are they found in india",
    "relate india's climate variety to its crop diversity"],
   V, STEPS),
 "kegy212": ("kegy.212.3.1", "Ocean Resources and Their Importance", "Water oceans",
   "Oceans provide food from fisheries, minerals like oil, natural gas and polymetallic nodules, energy from tides and waves, and the sea routes that carry most world trade, making ocean resources vital to the economy and future food security.",
   "", "The seabed beyond national jurisdiction is treated as the common heritage of mankind under the law of the sea.",
   "kegy212.txt ocean resources sections",
   ["name the resources obtained from the oceans",
    "why are oceans important for world trade",
    "what are polymetallic nodules and where do they occur",
    "explain ocean energy resources like tidal and wave power",
    "state the importance of fisheries for food supply",
    "what does the common heritage of mankind mean for the seabed"],
   V, STEPS),
 "kegy213": ("kegy.213.3.1", "Importance of Ocean Movements for Navigation, Climate and Economy",
    "Movements of ocean water",
    "Ocean currents, waves and tides aid and hinder navigation, moderate coastal climates, concentrate fisheries, generate tidal power and shape coasts, so the movements of ocean water carry both economic value and hazards that mariners and planners must respect.",
    "", "Ships use favourable currents to save fuel, while storms at sea generate the largest waves that threaten navigation.",
    "kegy213.txt importance sections",
    ["how do ocean currents aid navigation and trade",
    "state the economic importance of tides",
    "how do currents influence the fishing industry",
    "what hazards do waves and storms pose to ships",
    "explain the role of currents in shaping coastlines",
    "why are tidal power projects limited to certain coasts"],
   V, STEPS),
 "kegy214": ("kegy.214.3.1", "Life Forms, Their Evolution and Threats to the Biosphere",
    "Life on the earth",
    "Life evolved in the primordial oceans from simple cells to complex plants and animals over billions of years, and today pollution, habitat loss, invasive species and climate change threaten the biosphere, so environmental ethics and sustainable living are needed to keep the earth habitable.",
    "", "Human survival depends on the biosphere's services of oxygen, food, water purification and climate regulation, which damaged ecosystems can no longer provide.",
    "kegy214.txt evolution and threats sections",
    ["how did life originate and evolve on the earth",
    "state the threats to the biosphere from human activities",
    "what is sustainable development and why is it needed",
    "how does pollution affect living organisms",
    "define environmental ethics with examples",
    "why are forests called the lungs of the earth"],
   V, STEPS),
}

for stem, args in ADD.items():
    args = [a for a in args if a != ""]
    cid, title, section, definition, key_idea, ref, qps, stype, steps = args
    p = OUT + "catalog_class11_geography_" + stem + ".json"
    cat = json.load(open(p, encoding="utf-8"))
    if len(cat["concepts"]) >= 3:
        print("skip", stem)
        continue
    cat["concepts"].append(concept(cid, title, section, definition, "", key_idea, ref, qps, stype, steps))
    json.dump(cat, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("patched", stem)

# fix non-ASCII in kegy206
p = OUT + "catalog_class11_geography_kegy206.json"
raw = open(p, encoding="utf-8").read()
bad = [ch for ch in raw if ord(ch) > 127]
if bad:
    raw = raw.replace("\u00ea", "e")
    open(p, "w", encoding="utf-8").write(raw)
    print("fixed chars", bad)
else:
    print("kegy206 clean")
