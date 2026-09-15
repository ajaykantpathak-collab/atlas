"""Build batch_3 geography catalogs part 2: kegy205-214 (3 concepts each)."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _b3_build import step, concept, worked, catalog, dump

SRC = "D:/node_generator/ncert-mcp/data/processed/text_cache_new/"
OUT = os.path.dirname(os.path.abspath(__file__)) + "/"
STEPS = [{"step": 1, "action": "identify the feature or process",
          "explain": "Note the defining elements of the topic in the question."},
         {"step": 2, "action": "relate to the chapter details",
          "explain": "Match the elements with the chapter's description and examples."},
         {"step": 3, "action": "state the conclusion",
          "explain": "Summarise the answer with key terms and examples."}]
V = "verify_property"
C = "compute"


def sc(cid, title, definition, key_idea, ref, qps):
    return concept(cid, title, "", definition, "", key_idea, ref, qps, V, STEPS)


def build(stem, chap, title, concepts, wex, exercises):
    cat = catalog(11, "geography", chap, title, SRC + stem + ".txt", concepts, wex, exercises)
    dump(OUT + "catalog_class11_geography_" + stem + ".json", cat)


# kegy205 Geomorphic Processes
c1 = sc("kegy.205.1.1", "Endogenetic and Exogenetic Forces and Diastrophism",
        "The earth's surface is shaped by endogenetic forces of diastrophism and volcanism acting from within, and exogenetic forces of weathering, mass wasting, erosion and deposition acting from outside, and the balance of the two keeps the surface in perpetual change.",
        "Diastrophism includes folding, faulting and warping of the crust, while sudden endogenetic movements cause earthquakes and volcanoes.",
        "kegy205.txt geomorphic forces sections",
        ["differentiate endogenetic and exogenetic forces",
         "what is diastrophism and its types", "define volcanism with examples",
         "how do sudden and gradual geomorphic movements differ",
         "state the effects of folding and faulting", "why is the earth's surface ever changing"])
c2 = sc("kegy.205.2.1", "Weathering, Mass Movements and Erosion-Deposition",
        "Weathering is the in-situ breaking of rocks by chemical, physical and biological processes, mass movements transport weathered material downslope under gravity, and erosion by running water, wind, glaciers and waves removes and deposits material across the surface.",
        "Chemical weathering processes include solution, carbonation, hydration, oxidation and reduction, while physical weathering uses unloading, thermal expansion and freeze-thaw.",
        "kegy205.txt weathering and mass movements sections",
        ["define weathering and name its types",
         "differentiate weathering erosion and mass movements", "explain chemical weathering processes with examples",
         "what causes landslides as mass movements", "how does erosion differ from weathering",
         "define denudation and its agents"])
build("kegy205", 205, "Geomorphic Processes", [c1, c2], [],
      [{"id": "exq1", "source_ref": "kegy205.txt exercises",
        "questions": ["Multiple choice on geomorphic processes.",
         "Define weathering and its types with examples.",
         "Differentiate endogenetic and exogenetic forces.",
         "What is mass wasting? State its types.",
         "Explain the significance of weathering in geomorphology."]}])

# kegy206 Landforms and their Evolution
c1 = sc("kegy.206.1.1", "Running Water and Groundwater Landforms",
        "Running water in humid regions evolves fluvial landforms of gorges, V-shaped valleys, waterfalls, meanders, ox-bow lakes, floodplains, levees and deltas, while groundwater in limestone areas forms karst topography of sinkholes, caves, dolines and uvalas.",
        "Erosional features dominate the upper course, transport the middle course, and depositional features like deltas fill the lower course of rivers.",
        "kegy206.txt fluvial and karst sections",
        ["describe the erosional landforms made by running water",
         "what is karst topography and how does it form", "explain the formation of ox-bow lakes and deltas",
         "differentiate gorge and V shaped valley", "name the depositional landforms of rivers",
         "how do caves and sinkholes form in limestone"])
c2 = sc("kegy.206.2.1", "Glacial, Aeolian, Coastal and Karst Landforms",
        "Glaciers carve cirques, arêtes, U-shaped valleys and deposit moraines, drumlins and eskers; wind forms mushroom rocks, yardangs, inselbergs and deposits sand dunes and barchans; waves build cliffs, caves, stacks, beaches and bars along coasts, completing the family of landforms.",
        "Landform evolution proceeds through youth, maturity and old age stages, so each agent leaves a recognisable sequence of erosional and depositional forms.",
        "kegy206.txt glacial aeolian coastal sections",
        ["describe the erosional and depositional features of glaciers",
         "name the landforms made by wind in deserts", "explain the formation of beaches cliffs and stacks",
         "differentiate moraines and drumlins", "what are barchans and seifs",
         "compare erosional landforms of water wind and ice"])
build("kegy206", 206, "Landforms and their Evolution", [c1, c2], [],
      [{"id": "exq1", "source_ref": "kegy206.txt exercises",
        "questions": ["Multiple choice on landforms and their evolution.",
         "Describe the erosional landforms of glaciers.",
         "Explain the evolution of river valleys through stages.",
         "What are the depositional features of the wind?",
         "Write a note on karst topography."]}])

# kegy207 Composition and Structure of Atmosphere
c1 = sc("kegy.207.1.1", "Composition of the Atmosphere: Gases, Vapour and Particulates",
        "The atmosphere is a mixture of nitrogen about 78 per cent, oxygen about 21 per cent, argon, carbon dioxide and traces of other gases, along with water vapour and dust particulates, which together absorb heat, sustain life and shape weather.",
        "Carbon dioxide and water vapour are the heat absorbing gases of the atmosphere, and particulates act as condensation nuclei for clouds.",
        "kegy207.txt composition section",
        ["state the composition of the atmosphere in percentages",
         "why is carbon dioxide important though small in share", "what is the role of water vapour in the atmosphere",
         "how do dust particulates affect weather and climate", "name the permanent and variable gases of air",
         "which layer holds most of the atmospheric mass"])
c2 = sc("kegy.207.2.1", "Structure of the Atmosphere: Troposphere to Exosphere",
        "The atmosphere is layered into the troposphere where weather occurs and temperature falls with height, the stratosphere holding the ozone layer, the mesosphere, the thermosphere or ionosphere reflecting radio waves, and the exosphere merging into space, separated by pauses of equal temperature.",
        "The tropopause, stratopause and mesopause mark the boundaries, and the ozone layer in the stratosphere shields life from ultraviolet radiation.",
        "kegy207.txt structure of atmosphere section",
        ["describe the layers of the atmosphere in order",
         "in which layer does all weather occur and why", "what is the ozone layer and why is it important",
         "define tropopause stratopause and mesopause", "why is the ionosphere useful for radio communication",
         "compare temperature change in troposphere and stratosphere"])
build("kegy207", 207, "Composition and Structure of Atmosphere", [c1, c2], [],
      [{"id": "exq1", "source_ref": "kegy207.txt exercises",
        "questions": ["Multiple choice on the atmosphere's composition and layers.",
         "Describe the composition of the atmosphere with percentages.",
         "Explain the structure of the atmosphere with a diagram.",
         "Why is the troposphere called the weather layer?",
         "What is the importance of the ozone layer?"]}])

# kegy208 Solar Radiation, Heat Balance and Temperature
c1 = sc("kegy.208.1.1", "Insolation, Heat Budget and Albedo",
        "Insolation is the incoming solar radiation received at the top of the atmosphere, of which about 35 units are reflected back by clouds, dust and surfaces as albedo, and the balance heats the land, water and air, so the earth maintains a heat budget of gains equal to losses.",
        "The earth as a whole neither warms nor cools because the incoming shortwave radiation balances the outgoing longwave terrestrial radiation.",
        "kegy208.txt insolation and heat budget sections",
        ["define insolation and the factors controlling it",
         "explain the heat budget of the earth with units", "what is albedo and its values for different surfaces",
         "differentiate shortwave and longwave radiation", "why does the atmosphere get heated from below",
         "state the factors affecting the amount of insolation received"])
c2 = sc("kegy.208.2.1", "Temperature Distribution and Its Controlling Factors",
        "Temperature distribution over the globe follows latitude, altitude, distance from the sea, ocean currents, air masses and slope aspects, and is shown by isotherms that bend across continents and oceans between January and July.",
        "Isotherms generally run east-west but deviate over land and sea, showing higher temperatures over continents in summer and lower in winter at the same latitude.",
        "kegy208.txt temperature distribution sections",
        ["state the factors controlling temperature of a place",
         "what are isotherms and how do they bend", "compare january and july isotherm patterns",
         "how do ocean currents affect coastal temperatures", "explain the effect of altitude on temperature",
         "why do continents show greater temperature range than oceans"])
build("kegy208", 208, "Solar Radiation, Heat Balance and Temperature", [c1, c2], [],
      [{"id": "exq1", "source_ref": "kegy208.txt exercises",
        "questions": ["Multiple choice on insolation and heat balance.",
         "Explain the heat budget of the earth with a diagram.",
         "Define insolation and albedo.",
         "Describe the factors controlling the temperature distribution of the world.",
         "How do isotherms show land and sea temperature contrasts?"]}])

# kegy209 Atmospheric Circulation and Weather Systems
c1 = sc("kegy.209.1.1", "Pressure Belts and Winds: Planetary Circulation",
        "Atmospheric circulation begins with the equatorial low, subtropical highs, subpolar lows and polar highs, and the surface winds of trade winds, westerlies and polar easterlies, with the Coriolis force deflecting winds and the ferrel cell and polar cells completing the tricellular model.",
        "The intertropical convergence zone shifts with the overhead sun, bringing seasonal wind reversals that underlie the monsoon circulation.",
        "kegy209.txt pressure and winds sections",
        ["describe the pressure belts of the world",
         "name the planetary winds and their directions", "what is the coriolis force and its effect on winds",
         "explain the tricellular model of atmospheric circulation",
         "why are the subtropical high belts called horse latitudes", "how does the itcz shift with seasons"])
c2 = sc("kegy.209.2.1", "Air Masses, Fronts, Cyclones and Anticyclones",
        "Air masses acquire the character of their source regions, meet at fronts of warm, cold, stationary and occluded types, and give birth to mid-latitude cyclones with rain belts, while tropical cyclones form over warm seas with spiral rain bands and a calm eye, and anticyclones bring clear settled weather.",
        "Tropical cyclones need sea temperature above 27 degrees, coriolis force and low level convergence, and they die over land or cold water.",
        "kegy209.txt fronts and cyclones sections",
        ["define air mass and name its types",
         "explain the formation of mid latitude cyclones with fronts", "describe the structure of a tropical cyclone",
         "what conditions favour the birth of tropical cyclones", "differentiate warm front cold front and occluded front",
         "compare cyclones and anticyclones"])
build("kegy209", 209, "Atmospheric Circulation and Weather Systems", [c1, c2], [],
      [{"id": "exq1", "source_ref": "kegy209.txt exercises",
        "questions": ["Multiple choice on pressure belts and winds.",
         "Describe the planetary wind system of the world.",
         "Explain the formation of tropical cyclones and their structure.",
         "What are fronts? Name their types.",
         "Discuss the role of the coriolis force in wind circulation."]}])

# kegy210 Water in the Atmosphere
c1 = sc("kegy.210.1.1", "Humidity, Evaporation and Relative Humidity",
        "Water in the atmosphere exists as vapour measured by absolute and specific humidity, and relative humidity compares the actual water vapour with the saturation vapour at that temperature as a percentage, so cooling air to its dew point saturates it and condensation begins.",
        "Relative humidity of 100 per cent means the air is saturated at the dew point temperature, when excess vapour condenses on nuclei into droplets.",
        "kegy.210.1.1".replace("kegy.", "kegy."), "kegy210.txt humidity sections")
c1 = concept("kegy.210.1.1", "Humidity, Evaporation and Relative Humidity", "",
             "Water in the atmosphere exists as vapour measured by absolute and specific humidity, and relative humidity compares the actual water vapour with the saturation vapour at that temperature as a percentage, so cooling air to its dew point saturates it and condensation begins.",
             "relative_humidity = actual_vapour / saturation_vapour * 100",
             "Relative humidity of 100 per cent means the air is saturated at the dew point temperature, when excess vapour condenses on nuclei into droplets.",
             "kegy210.txt humidity sections",
             ["define relative humidity and absolute humidity",
              "calculate the relative humidity from actual and saturation vapour",
              "what is the dew point temperature", "how does evaporation depend on temperature and wind",
              "why does warm air hold more moisture than cold air", "what are condensation nuclei"],
             C, [step(1, "divide actual by saturation vapour",
                      "Divide the actual water vapour by the saturation vapour at the same temperature and multiply by 100 to get the relative humidity",
                      "relative_humidity = actual_vapour / saturation_vapour * 100")])
c2 = sc("kegy.210.2.1", "Condensation, Clouds, Fog and Precipitation Types",
        "Condensation forms dew, frost, fog, mist and clouds when saturated air cools by expansion in convection, convergence or frontal and orographic lifting, and precipitation falls as rainfall, snowfall, sleet or hail when droplets grow heavy by Bergeron or collision-coalescence processes.",
        "Clouds are classified into cirrus, cumulus, stratus and their combinations by height and form, and orographic lifting gives heavy windward rainfall with rain shadow aridity behind.",
        "kegy210.txt condensation and precipitation sections",
        ["describe the forms of condensation near the ground and in air",
         "classify clouds by height and form", "explain orographic and frontal rainfall with diagrams",
         "what is the rain shadow effect", "differentiate rainfall snowfall sleet and hail",
         "state the conditions necessary for precipitation"])
build("kegy210", 210, "Water in the Atmosphere", [c1, c2],
      [worked("ex1", "kegy210.txt humidity section", "kegy.210.1.1", "compute_relative_humidity",
              "At a given temperature the air holds {actual_vapour} grams of vapour per cubic metre while the saturation capacity is {saturation_vapour} grams. Calculate the relative humidity.",
              {"actual_vapour": 10, "saturation_vapour": 20},
              [step(1, "divide actual by saturation vapour",
                    "Divide the actual water vapour by the saturation vapour at the same temperature and multiply by 100 to get the relative humidity",
                    "relative_humidity = actual_vapour / saturation_vapour * 100")]),
       worked("ex2", "kegy210.txt humidity section", "kegy.210.1.1", "compute_relative_humidity",
              "An air sample contains {actual_vapour} grams of water vapour when saturation would need {saturation_vapour} grams. Work out the relative humidity in per cent.",
              {"actual_vapour": 6, "saturation_vapour": 15},
              [step(1, "divide actual by saturation vapour",
                    "Divide the actual water vapour by the saturation vapour at the same temperature and multiply by 100 to get the relative humidity",
                    "relative_humidity = actual_vapour / saturation_vapour * 100")])],
      [{"id": "exq1", "source_ref": "kegy210.txt exercises",
        "questions": ["Multiple choice on humidity and precipitation.",
         "Define absolute humidity and relative humidity.",
        "Describe the forms of condensation.",
        "Explain the types of rainfall with diagrams.",
        "What is the rain shadow effect? Give an Indian example."]}])

# kegy211 World Climate and Climate Change
c1 = sc("kegy.211.1.1", "Climate Classification by Koeppen",
        "Vladimir Koeppen classified world climates by monthly temperature and precipitation into tropical rainy A, dry B, warm temperate rainy C, cold snowy D and polar E groups with letter subtypes for rainfall seasonality and heat, giving the most widely used empirical climate scheme.",
        "Koeppen's capital letters denote major groups, small letters like f, w and s denote rainfall regimes and capitals like S, W, T and F refine dry and cold types.",
        "kegy211.txt koeppen scheme sections",
        ["explain the koeppen scheme of climate classification",
         "name the five major climatic groups of koeppen with letters",
         "how do the small letters f w and s modify koeppen groups",
         "describe the tropical rainy group a climates",
         "which koeppen climates occur in india", "compare dry group b climates of hot desert and steppe"])
c2 = sc("kegy.211.2.1", "Climate Change, Global Warming and Its Causes and Impacts",
        "Climate change shows in rising global temperatures of about 0.6 degrees over the century, retreating glaciers, rising sea levels and shifting rainfall belts, driven by greenhouse gases from burning fossil fuels, deforestation and land use change, alongside natural volcanic and orbital factors.",
        "The Kyoto Protocol and UNFCCC negotiations seek emission cuts, and the impacts threaten agriculture, sea coasts and water supplies worldwide.",
        "kegy211.txt climate change sections",
        ["what evidence shows that world climate is changing",
         "name the greenhouse gases responsible for global warming",
         "state the impacts of climate change on sea level and agriculture",
         "what do unfccc and kyoto protocol aim at", "how do human activities change the climate",
         "differentiate natural and human causes of climate change"])
build("kegy211", 211, "World Climate and Climate Change", [c1, c2], [],
      [{"id": "exq1", "source_ref": "kegy211.txt exercises",
        "questions": ["Multiple choice on world climate groups.",
         "Describe the Koeppen classification of world climates.",
         "What are the causes of climate change?",
         "Explain the greenhouse effect and global warming.",
         "Write a note on the Kyoto Protocol."]}])

# kegy212 Water Oceans
c1 = sc("kegy.212.1.1", "Ocean Floor Relief and Salinity of Ocean Water",
        "The ocean floor shows continental shelf, slope, deep sea plain and trenches, and ocean water averages about 3.5 per cent or 35 parts per thousand salinity, varying with evaporation, precipitation, river influx and circulation from about 32 to 37 ppt in the open sea.",
        "Salinity is highest in subtropical seas of strong evaporation and lowest near river mouths and polar seas of melting ice and heavy rain.",
        "kegy212.txt relief and salinity sections",
        ["describe the relief divisions of the ocean floor",
         "define salinity and its average value in per thousand", "calculate the salinity from dissolved salt and water mass",
         "why do landlocked seas show high salinity", "compare the salinity of baltic and dead sea waters",
         "state the factors controlling ocean salinity"])
c2 = sc("kegy.212.2.1", "Ocean Temperature and the Hydrological Cycle",
        "Ocean water temperature falls with latitude and depth, and the oceans drive the hydrological cycle by evaporating water that returns as precipitation, while the heat capacity of the sea moderates the earth's climate.",
        "The upper warm layer, the thermocline of rapid temperature fall and the deep cold layer structure the ocean vertically.",
        "kegy212.txt temperature and cycle sections",
        ["describe the horizontal and vertical distribution of ocean temperature",
         "what is the thermocline", "explain the hydrological cycle with its stages",
         "how do oceans moderate the climate of coastal areas", "compare day night and seasonal temperature change of land and sea",
         "state the sources of salts dissolved in ocean water"])
build("kegy212", 212, "Water (Oceans)", [c1, c2],
      [worked("ex1", "kegy212.txt salinity section", "kegy.212.1.1", "compute_salinity",
              "A sample of sea water of {water_mass} grams contains {salt_mass} grams of dissolved salts. Calculate its salinity in parts per thousand.",
              {"water_mass": 1000, "salt_mass": 35},
              [step(1, "divide salt by water mass and scale to thousand",
                    "Divide the dissolved salt mass by the sea water mass and multiply by 1000 to get the salinity in parts per thousand",
                    "salinity = salt_mass / water_mass * 1000")]),
       worked("ex2", "kegy212.txt salinity section", "kegy.212.1.1", "compute_salinity",
              "An enclosed sea holds {salt_mass} grams of salts in {water_mass} grams of water. Work out its salinity in parts per thousand and compare it with the ocean average.",
              {"water_mass": 500, "salt_mass": 19},
              [step(1, "divide salt by water mass and scale to thousand",
                    "Divide the dissolved salt mass by the sea water mass and multiply by 1000 to get the salinity in parts per thousand",
                    "salinity = salt_mass / water_mass * 1000")])],
      [{"id": "exq1", "source_ref": "kegy212.txt exercises",
        "questions": ["Multiple choice on oceans and their relief.",
         "Describe the salinity distribution of ocean water.",
        "Explain the relief of the ocean floors with a diagram.",
        "What is the hydrological cycle? Explain its stages.",
        "State the factors affecting the temperature of ocean water."]}])

# kegy213 Movements of Ocean Water
c1 = sc("kegy.213.1.1", "Ocean Currents and Their Effects",
        "Ocean currents are continuous flows of surface water set up by prevailing winds, coriolis force, density differences and coastline shapes, with warm currents flowing from equator to poles and cold currents from poles to equator, meeting at convergence zones rich in fisheries like the Grand Banks.",
        "Warm currents like the Gulf Stream warm western Europe, cold currents like the Labrador cause fog off Newfoundland, and their meeting grounds give the world's best fishing grounds.",
        "kegy213.txt currents sections",
        ["define ocean currents and name their types",
         "what causes the formation of ocean currents", "how do warm and cold currents affect climate",
         "explain the gulf stream and its climatic influence", "why do fishing grounds form where currents meet",
         "describe the sargasso sea and the gulf stream system"])
c2 = sc("kegy.213.2.1", "Waves and Tides of the Ocean",
        "Waves are oscillatory movements raised by wind friction travelling through the water, while tides are rhythmic rises and falls caused by the gravitational pull of the moon and the sun, giving spring tides at new and full moon and neap tides at quarter phases.",
        "Tides serve navigation, fishing and tidal power generation, and their twice-daily rhythm depends on the relative positions of earth, moon and sun.",
        "kegy213.txt waves and tides sections",
        ["define waves and the motion of water particles in them",
         "how are tides caused by the moon and the sun", "differentiate spring tide and neap tide",
         "state the uses of tides for mankind", "explain tidal power generation with examples",
         "what controls the height of ocean waves"])
build("kegy213", 213, "Movements of Ocean Water", [c1, c2], [],
      [{"id": "exq1", "source_ref": "kegy213.txt exercises",
        "questions": ["Multiple choice on ocean movements.",
         "Define ocean currents and their causes.",
        "Explain the origin and types of tides.",
        "What are spring and neap tides?",
        "Discuss the importance of ocean currents for climate and fishing."]}])

# kegy214 Life on the Earth
c1 = sc("kegy.214.1.1", "Biosphere, Ecosystem and Ecological Balance",
        "The biosphere is the narrow zone where lithosphere, hydrosphere and atmosphere meet and life exists, organised into ecosystems of producers, consumers and decomposers exchanging energy and matter through food chains, food webs and nutrient cycling, which keep the ecological balance.",
        "Energy flows one way through the ecosystem from green plants to consumers, while nutrients recycle, so disruption at any level unbalances the whole system.",
        "kegy214.txt biosphere and ecosystem sections",
        ["define biosphere and ecosystem",
         "describe the food chain and food web with examples", "state the role of producers consumers and decomposers",
         "what is ecological balance and how is it disturbed", "explain the flow of energy in an ecosystem",
         "differentiate habitat and niche"])
c2 = sc("kegy.214.2.1", "Biodiversity, Its Loss and Conservation",
        "Biodiversity covers the variety of genes, species and ecosystems on the earth, and its loss proceeds through habitat destruction, overexploitation, pollution, invasive species and climate change, demanding conservation through biosphere reserves, national parks, sanctuaries and laws.",
        "Tropical forests hold the richest biodiversity, and in-situ conservation in reserves alongside ex-situ methods like zoos and gene banks protects species for the future.",
        "kegy214.txt biodiversity sections",
        ["define biodiversity and its three levels",
         "state the causes of loss of biodiversity", "describe the methods of conservation of biodiversity",
         "what are biosphere reserves and their zones", "distinguish in-situ and ex-situ conservation",
         "why is biodiversity important for human survival"])
build("kegy214", 214, "Life on the Earth", [c1, c2], [],
      [{"id": "exq1", "source_ref": "kegy214.txt exercises",
        "questions": ["Multiple choice on biosphere and biodiversity.",
         "Define biosphere and explain its importance.",
        "What is an ecosystem? Describe its components.",
        "Explain the causes of biodiversity loss and conservation methods.",
        "Write a note on food chains and food webs."]}])
print("kegy part 2 done")
