# Batch 5 drafts: legy201-209 (India: People and Economy)
import _b5_helper as H

# ---------------- legy201: Population ---------------- #
C = [
 H.concept("legy.201.1", "Distribution and Density of India's Population",
  "Distribution and Density of Population",
  "India is the second most populous country with 1,210 million people (2011); "
  "its population is unevenly distributed, with density rising from sparse "
  "Aravalli and north-eastern hills to over a thousand persons per sq km in "
  "the northern plains, depending on terrain, climate, water and development.",
  "population_density = total_population / area_sq_km",
  "Dividing a state's population by its area in square kilometres gives its "
  "density in persons per sq km.",
  "legy201.txt distribution and density sections (2011 census figures)",
  ["what was India's population in the 2011 census",
   "compute density from a state's population and area",
   "why is density high in the northern plains",
   "which regions of India are sparsely populated and why",
   "how does terrain affect distribution",
   "define population density with units"],
  "compute",
  [H.cstep(1, "state the ratio", "density equals population divided by area", "population_density = total_population / area_sq_km")]),
 H.concept("legy.201.2", "Phases of Population Growth", "Population Growth",
  "India's population growth falls into four phases: the stagnant phase before "
  "1921 with high mortality, the steadily expanding phase 1921-1951 (1921 as "
  "the year of great divide), the rapid high-growth phase 1951-1981, and the "
  "phase of high growth with definite signs of slowing since 1981.",
  "",
  "The death rate fell faster than the birth rate in every phase after 1921, "
  "which is why growth accelerated even as families shrank.",
  "legy201.txt growth phases and year of great divide sections",
  ["name the four phases of India's population growth",
   "why is 1921 called the year of great divide",
   "what characterised the stagnant phase of growth",
   "when did growth rates peak in India",
   "which phase shows definite signs of slowing",
   "relate death rate decline to growth acceleration"],
  "verify_property",
  [H.vstep(1, "mark the divide", "1921 separates the earlier mortality-dominated period from sustained expansion"),
  H.vstep(2, "sequence the phases", "stagnant, steady, rapid and slowing phases follow in order"),
  H.vstep(3, "close with rates", "birth-death differentials explain each phase's growth")]),
 H.concept("legy.201.3", "Sex Ratio and Age Composition", "Population Composition",
  "The sex ratio counts females per thousand males; India's 2011 census "
  "recorded 940 females per thousand males, with sharp interstate contrasts, "
  "while the age composition shows India as a young country with a large "
  "working-age share and a declining child share.",
  "sex_ratio = number_of_females * 1000 / number_of_males",
  "Multiplying the female-male ratio by a thousand expresses the sex ratio "
  "conventionally as females per thousand males.",
  "legy201.txt sex ratio (940 in 2011) and age composition sections",
  ["define sex ratio and give India's 2011 figure",
   "compute a sex ratio from female and male populations",
   "why do some states show adverse sex ratios",
   "what does the age composition reveal about India",
   "how does the child population share affect dependency",
   "compare sex ratios of Kerala and Haryana states"],
  "compute",
  [H.cstep(1, "state the convention", "sex ratio is females per thousand males", "sex_ratio = number_of_females * 1000 / number_of_males")]),
 H.concept("legy.201.4", "Work Participation and Occupational Structure",
  "Occupational Structure",
  "The work participation rate is the proportion of working population "
  "(workers) to total population; occupational structure divides workers into "
  "cultivators, agricultural labourers, household industry and other workers, "
  "and a high share of primary workers signals underemployment disguised in "
  "agriculture.",
  "",
  "Development shifts workers from primary to secondary and tertiary "
  "occupations, so occupational structure is a development indicator.",
  "legy201.txt work participation rate and occupational categories sections",
  ["define work participation rate",
   "list the four occupational categories of the census",
   "why does a large primary workforce indicate disguised unemployment",
   "how does occupational structure change with development",
   "compare male and female work participation",
   "relate literacy to occupational structure"],
  "verify_property",
  [H.vstep(1, "define the rate", "workers as a proportion of total population is the participation rate"),
  H.vstep(2, "read the categories", "cultivators, agricultural labourers, household industry workers and other workers form the census classes"),
  H.vstep(3, "close with development", "tertiary share rises as economies mature")]),
]
W = [H.we("we_legy201_1", "legy201.txt density section", "legy.201.1",
  "A state has a population of 9,12,00,000 and an area of 1,90,000 sq km. "
  "Compute its population density.",
  {"total_population": 91200000, "area_sq_km": 190000},
  [H.cstep(1, "state the formula", "density = population / area", "population_density = total_population / area_sq_km")]),
 H.we("we_legy201_2", "legy201.txt sex ratio section (940 in 2011)", "legy.201.3",
  "India's 2011 census counts about 586 million females and 623 million "
  "males. Estimate the sex ratio.",
  {"number_of_females": 586, "number_of_males": 623},
  [H.cstep(1, "state the formula", "sex ratio = females per thousand males", "sex_ratio = number_of_females * 1000 / number_of_males")]),
 H.we("we_legy201_3", "legy201.txt growth phases", "legy.201.2",
  "Why is 1921 the year of great divide? Explain in three steps.",
  {},
  [H.vstep(1, "before 1921", "growth was stagnant as epidemics and famines kept death rates high"),
   H.vstep(2, "after 1921", "death rates began a sustained fall while births stayed high"),
   H.vstep(3, "conclusion", "the turning point splits two demographic regimes, hence the name")],
  qtype="short_answer")]
E = [H.ex("ex_legy201_1", "legy201.txt end-of-chapter exercises, reworded",
          ["describe the regional pattern of India's population distribution",
           "compute density for a state from census population and area",
           "explain the phases of population growth with the year of great divide",
           "define sex ratio and compute it from census counts",
           "discuss occupational structure as a development indicator"]),
     H.ex("ex_legy201_2", "legy201.txt applied questions, reworded",
          ["argue why plains hold more people than plateaus",
           "evaluate the demographic dividend of a young age structure",
           "explain interstate contrasts in work participation",
           "relate literacy with sex ratio patterns",
           "identify causes of slowing growth after 1981"])]
H.emit("legy201", H.make_cat("legy201", "Population Distribution, Density, Growth and Composition", C, W, E))

# ---------------- legy202: Human Settlements ---------------- #
C = [
 H.concept("legy.202.1", "Rural Settlement Types", "Rural Settlements",
  "Rural settlements take clustered, semi-clustered, hamleted and dispersed "
  "forms; water availability, farmland pattern, defence needs and social "
  "structure decide whether houses huddle around a pond or scatter across "
  "fields.",
  "",
  "Each form solves a local problem: clustered villages share wells and "
  "defence, dispersed hamlets sit close to scattered plots.",
  "legy202.txt rural settlement types and their factors",
  ["name the major types of rural settlements",
   "what factors decide the form of a rural settlement",
   "why do dispersed settlements appear in hilly and forest areas",
   "how does water availability shape clustered villages",
   "define a hamleted settlement",
   "relate social structure to settlement pattern"],
  "verify_property",
  [H.vstep(1, "list the forms", "clustered, semi-clustered, hamleted and dispersed are the chapter's types"),
  H.vstep(2, "match factor to form", "scarce water clusters settlements along tanks and wells; rough terrain disperses them"),
  H.vstep(3, "close with society", "caste-based streets and defence walls imprint social structure on plans")]),
 H.concept("legy.202.2", "Urban Settlements and Urbanisation", "Urban Settlements",
  "Urban settlements are functionally tied to secondary and tertiary "
  "activities; India's urban population share rose to about 31.16 per cent by "
  "2011, so roughly 69 per cent of Indians still live in rural settlements, "
  "making the country one of the least urbanised large economies.",
  "rural_share = 100 - urban_share",
  "Subtracting the urban percentage from 100 gives the rural share of population.",
  "legy202.txt urbanisation trends table (31.16 per cent urban in 2011)",
  ["what was India's urban population share in 2011",
   "compute the rural population share from the urban share",
   "define a town as per the census criteria",
   "differentiate rural and urban economies",
   "why is urbanisation considered low in India",
   "list problems of rapid urban growth"],
  "compute",
  [H.cstep(1, "record the urban share", "the 2011 census reports 31.16 per cent urban population", "urban_share = 31.16"),
   H.cstep(2, "subtract from 100", "the remainder is the rural share", "rural_share = 100 - urban_share")]),
 H.concept("legy.202.3", "Functional Classification of Towns", "Functional Classification of Towns",
  "Towns are classified by their dominant functions - administrative, "
  "defence, industrial, transport, cultural and recreational - and the census "
  "separates them into statutory towns, census towns and urban agglomerations.",
  "",
  "Function gives the town its identity, though most large cities are "
  "multi-functional with one dominant call.",
  "legy202.txt functional classification and census town categories",
  ["name the functional types of Indian towns with examples",
   "differentiate statutory towns from census towns",
   "what is an urban agglomeration",
   "give an example each of an administrative and industrial town",
   "how does function affect town size and growth",
   "why are large cities called multi-functional"],
  "verify_property",
  [H.vstep(1, "list the functions", "administrative, defence, industrial, transport, cultural and recreational functions classify towns"),
  H.vstep(2, "note the census terms", "statutory towns, census towns and urban agglomerations are official categories"),
  H.vstep(3, "close with dominance", "one function usually dominates even in diversified cities")]),
]
W = [H.we("we_legy202_1", "legy202.txt urbanisation table", "legy.202.2",
  "The 2011 census reports 31.16 per cent urban population. Compute India's "
  "rural share.",
  {"urban_share": 31.16},
  [H.cstep(1, "record the urban share", "31.16 per cent is urban", "urban_share = 31.16"),
   H.cstep(2, "subtract from 100", "100 - 31.16 leaves the rural share", "rural_share = 100 - urban_share")]),
 H.we("we_legy202_2", "legy202.txt settlement types", "legy.202.1",
  "Explain why hilly forested tracts favour dispersed settlements.",
  {},
  [H.vstep(1, "terrain splits land", " cultivable patches lie scattered between slopes and streams"),
   H.vstep(2, "farm access", "homes sit near plots to save daily travel"),
   H.vstep(3, "conclusion", "dispersal follows the geometry of usable land")],
  qtype="short_answer"),
 H.we("we_legy202_3", "legy202.txt functional classification", "legy.202.3",
  "Classify New Delhi, Jamshedpur and Amritsar by dominant function.",
  {},
  [H.vstep(1, "administrative", "New Delhi is dominated by government functions"),
   H.vstep(2, "industrial", "Jamshedpur grew around iron and steel plants"),
   H.vstep(3, "trade-cultural", "Amritsar's function rests on trade and religious-cultural importance")],
  qtype="short_answer")]
E = [H.ex("ex_legy202_1", "legy202.txt end-of-chapter exercises, reworded",
          ["describe the types of rural settlements with Indian examples",
           "compute the rural share from the 2011 urban percentage",
           "explain the functional classification of towns",
           "differentiate statutory towns, census towns and urban agglomerations",
           "discuss the problems of urbanisation in India"]),
     H.ex("ex_legy202_2", "legy202.txt applied questions, reworded",
          ["argue why India urbanises slowly despite economic growth",
           "evaluate the census definition of urban areas",
           "relate water scarcity to settlement clustering",
           "map the major urban agglomerations of India",
           "explain how defence needs shaped historic settlements"])]
H.emit("legy202", H.make_cat("legy202", "Human Settlements", C, W, E))

# ---------------- legy203: Land Resources and Agriculture ---------------- #
C = [
 H.concept("legy.203.1", "Land Use Categories and Their Changes",
  "Land Use Categories",
  "The land use record divides India's area into forest land, land put to "
  "non-agricultural uses, barren and wasteland, permanent pastures, culturable "
  "wasteland, current and old fallows and net sown area; the net sown area is "
  "the core of the agricultural economy and its share shapes cropping "
  "possibilities.",
  "non_forest_share = 100 - forest_share",
  "Subtracting the forest percentage of the reporting area from 100 gives the "
  "non-forest land share.",
  "legy203.txt land use categories and their composition sections",
  ["list the land use categories of the land use record",
   "compute the non-forest share from the forest share",
   "define net sown area and gross cropped area",
   "what are culturable wastelands",
   "why do forest area percentages need careful reading",
   "how has land under non-agricultural uses changed and why"],
  "compute",
  [H.cstep(1, "record the forest share", "forest land is a stated percentage of the reporting area", "forest_share = 22.07"),
   H.cstep(2, "subtract from 100", "the remainder is non-forest land", "non_forest_share = 100 - forest_share")]),
 H.concept("legy.203.2", "Cropping Pattern: Cereals and Pulses", "Cropping Pattern",
  "On the basis of grain structure foodgrains divide into cereals and pulses; "
  "cereals occupy about 54 per cent of the total cropped area of India, so "
  "the remaining cropped area carries pulses, oilseeds, fibres and other "
  "crops.",
  "non_cereal_share = 100 - cereal_share",
  "Subtracting the cereal share of cropped area from 100 gives the share under "
  "all non-cereal crops.",
  "legy203.txt cereals occupy about 54 per cent of total cropped area",
  ["what share of cropped area do cereals occupy",
   "compute the non-cereal share of cropped area",
   "differentiate cereals from pulses by grain structure",
   "name the major cereal crops of India",
   "why do pulses suit dryland agriculture",
   "how does cropping pattern shift with irrigation"],
  "compute",
  [H.cstep(1, "record the cereal share", "cereals cover about 54 per cent of total cropped area", "cereal_share = 54"),
   H.cstep(2, "subtract from 100", "the rest of cropped area is non-cereal", "non_cereal_share = 100 - cereal_share")]),
 H.concept("legy.203.3", "Land Degradation and Conservation", "Land Degradation and Conservation Measures",
  "Land degradation through water and wind erosion, waterlogging, salinisation "
  "and alkalinisation removes the productive base; conservation responses "
  "include afforestation, grazing control, contour bunding, terrace farming, "
  "shelter belts and regulated use of chemical fertilisers and irrigation.",
  "",
  "Degradation is both natural and human-made, so conservation must combine "
  "engineering works with farming practice change.",
  "legy203.txt degradation causes and conservation measures sections",
  ["list the major causes of land degradation in India",
   "name five conservation measures for degraded land",
   "how does waterlogging degrade irrigated land",
   "what is shelter belt plantation",
   "explain terrace farming as a conservation device",
   "relate fertiliser overuse to soil health"],
  "verify_property",
  [H.vstep(1, "trace the causes", "erosion, waterlogging, salinity and chemical misuse degrade cropland"),
  H.vstep(2, "pair causes with cures", "contour bunding checks water erosion; shelter belts check wind"),
  H.vstep(3, "close with practice", "grazing control and irrigation discipline sustain the gains")]),
 H.concept("legy.203.4", "Common Property Resources", "Common Property Resources",
  "Common property resources are resources accessible to the whole community "
  "like village pastures, tanks, forests and ponds; they support the rural "
  "poor, but open access without regulation leads to their overuse and "
  "decline, so community management is essential.",
  "",
  "The tragedy of the commons is reversed where village institutions "
  "regulate grazing, fishing and firewood collection.",
  "legy203.txt common property resources discussion",
  ["define common property resources with examples",
   "why are CPRs vital for the rural poor",
   "how does open access degrade commons",
   "describe a successful community management arrangement",
   "relate CPR decline to women's workload",
   "what policies can revive common property resources"],
  "verify_property",
  [H.vstep(1, "define the access", "commons are open to community use, unlike private plots"),
  H.vstep(2, "state the risk", "unregulated use shrinks pastures, tanks and groves"),
  H.vstep(3, "close with institutions", "local rules restore the balance between use and renewal")]),
]
W = [H.we("we_legy203_1", "legy203.txt cereals share", "legy.203.2",
  "Cereals occupy about 54 per cent of India's total cropped area. Compute "
  "the share of all other crops.",
  {"cereal_share": 54},
  [H.cstep(1, "record the cereal share", "cereals hold about 54 per cent", "cereal_share = 54"),
   H.cstep(2, "subtract from 100", "100 - 54 = 46 per cent is non-cereal", "non_cereal_share = 100 - cereal_share")]),
 H.we("we_legy203_2", "legy203.txt land use categories", "legy.203.1",
  "Forest area is about 22.07 per cent of the reporting area. Compute the "
  "non-forest land share.",
  {"forest_share": 22.07},
  [H.cstep(1, "record the forest share", "forest land stands at 22.07 per cent", "forest_share = 22.07"),
   H.cstep(2, "subtract from 100", "100 - 22.07 gives the non-forest share", "non_forest_share = 100 - forest_share")]),
 H.we("we_legy203_3", "legy203.txt conservation section", "legy.203.3",
  "Suggest three conservation measures for a waterlogged irrigated tract.",
  {},
  [H.vstep(1, "fix the drainage", "line and clean channels to stop seepage and waterlogging"),
   H.vstep(2, "change the cropping", "shift water-loving crops to crops needing less irrigation"),
   H.vstep(3, "treat the soil", "apply gypsum and leaching to reclaim saline-alkaline patches")],
  qtype="short_answer")]
E = [H.ex("ex_legy203_1", "legy203.txt end-of-chapter exercises, reworded",
          ["explain the land use categories of India",
           "compute the non-cereal share of cropped area",
           "describe causes and cures of land degradation",
           "define common property resources with examples",
           "differentiate net sown area and gross cropped area"]),
     H.ex("ex_legy203_2", "legy203.txt applied questions, reworded",
          ["evaluate the declining share of pastureland",
           "argue for community management of commons",
           "relate irrigation expansion to waterlogging",
           "explain the land use record's limitations",
           "suggest a village plan for degraded land"])]
H.emit("legy203", H.make_cat("legy203", "Land Resources and Agriculture", C, W, E))

# ---------------- legy204: Water Resources ---------------- #
C = [
 H.concept("legy.204.1", "India's Water Endowment", "Water Resources of India",
  "India accounts for about 2.45 per cent of the world's surface area, 4 per "
  "cent of its water resources and about 17 per cent of its population, so "
  "the per capita water availability is far below the world average and "
  "declining with population growth.",
  "pressure_index = population_share / water_share",
  "Dividing India's population share by its water share shows how many times "
  "harder the population presses on each unit of water than the world average.",
  "legy204.txt India water endowment passage (2.45 per cent area, 4 per cent water, 17 per cent population)",
  ["state India's shares of world area, water and population",
   "compute the pressure index of population on water",
   "why is per capita water availability falling",
   "which are the major river basins with surplus water",
   "define water scarcity: physical and economic",
   "how does rainfall variability affect water stress"],
  "compute",
  [H.cstep(1, "record the shares", "population share 17, water share 4", "population_share = 17"),
   H.cstep(2, "divide population share by water share", "the quotient measures relative pressure", "pressure_index = population_share / water_share")]),
 H.concept("legy.204.2", "Water Demand and Conflicts", "The Water Demand and Conflicts",
  "Water demand divides among agriculture, domestic use, industries and power; "
  "rising demand creates inter-state river disputes and sectoral conflicts, "
  "making allocation, pricing and conservation politically charged issues.",
  "",
  "Irrigation takes the largest share, so farm efficiency measures free water "
  "for cities and industry.",
  "legy204.txt water demand sections and inter-state conflicts",
  ["name the sectors competing for water in India",
   "why does irrigation dominate water demand",
   "give examples of inter-state water disputes",
   "how can demand management ease conflicts",
   "relate groundwater overuse to falling water tables",
   "explain the conflict between domestic and industrial users"],
  "verify_property",
  [H.vstep(1, "rank the users", "irrigation leads, then domestic, industrial and power uses"),
  H.vstep(2, "cite the conflicts", "inter-state river disputes illustrate political scarcity"),
  H.vstep(3, "close with efficiency", "drip and sprinkler systems cut farm demand sharply")]),
 H.concept("legy.204.3", "Watershed Management and Rainwater Harvesting",
  "Watershed Management and Rainwater Harvesting",
  "Watershed management treats a drainage basin as a unit for soil and water "
  "conservation through check dams, contour bunds and vegetation, while "
  "rainwater harvesting captures rooftop and surface runoff; both revive local "
  "water security as shown by community efforts like Tarun Bharat Sangh's "
  "work and Tamil Nadu's rooftop laws.",
  "",
  "Local capture of rain recharges wells and revives streams, reducing "
  "dependence on distant reservoirs.",
  "legy204.txt watershed management and rainwater harvesting cases",
  ["define watershed management and its techniques",
   "what does rainwater harvesting include",
   "how did community efforts revive rivers in Alwar district",
   "explain rooftop harvesting with a city example",
   "relate check dams to groundwater recharge",
   "evaluate watershed programmes against large dams"],
  "verify_property",
  [H.vstep(1, "define the unit", "the watershed organises conservation around natural drainage"),
  H.vstep(2, "list the structures", "check dams, contour bunds and vegetation slow and store runoff"),
  H.vstep(3, "close with cases", "Alwar's johads and rooftop laws show state and society acting together")]),
 H.concept("legy.204.4", "Recycling and Conservation of Water", "Recycling and Conservation of Water",
  "Water conservation extends to recycling industrial effluents, treating "
  "sewage for reuse, pricing water to curb waste and reviving traditional "
  "structures; every saved unit of demand is cheaper than a new supply "
  "project.",
  "",
  "Demand-side conservation - meters, tariffs, recycling - is the cheapest "
  "new source of water.",
  "legy204.txt recycling and conservation measures sections",
  ["list conservation measures for industries and homes",
   "how does pricing affect water use",
   "explain sewage treatment as a water source",
   "relate crop choice to water conservation",
   "what are the gains of recycling effluents",
   "compare supply-side and demand-side strategies"],
  "verify_property",
  [H.vstep(1, "sort the measures", "recycling, pricing, metering and crop choice all cut demand"),
  H.vstep(2, "weigh the costs", "treating and reusing water costs less than damming new rivers"),
  H.vstep(3, "close with practice", "conservation turns scarcity into management")]),
]
W = [H.we("we_legy204_1", "legy204.txt water endowment passage", "legy.204.1",
  "India has about 17 per cent of world population and 4 per cent of world "
  "water resources. Compute the population pressure index on water.",
  {"population_share": 17, "water_share": 4},
  [H.cstep(1, "record the shares", "population 17 per cent, water 4 per cent", "population_share = 17"),
   H.cstep(2, "divide", "17 divided by 4 gives about 4.25 times world-average pressure", "pressure_index = population_share / water_share")]),
 H.we("we_legy204_2", "legy204.txt watershed case", "legy.204.3",
  "How did johads change the water scenario of Alwar district villages?",
  {},
  [H.vstep(1, "build the structure", "villagers revived small earthen check dams called johads"),
   H.vstep(2, "recharge follows", "monsoon runoff slowed and seeped, raising groundwater"),
   H.vstep(3, "conclusion", "dried rivers began flowing again, showing community power over scarcity")],
  qtype="short_answer"),
 H.we("we_legy204_3", "legy204.txt conflicts section", "legy.204.2",
  "Suggest two measures to reduce inter-state river water disputes.",
  {},
  [H.vstep(1, "share data", "joint gauging and transparent flow data reduce suspicion"),
   H.vstep(2, "cap demand", "efficient irrigation lowers each state's claimed share"),
   H.vstep(3, "conclusion", "tribunals plus efficiency make settlements durable")],
  qtype="short_answer")]
E = [H.ex("ex_legy204_1", "legy204.txt end-of-chapter exercises, reworded",
          ["state India's shares of world area, water and population",
           "compute the population pressure index on water resources",
           "describe watershed management techniques",
           "explain rainwater harvesting with examples",
           "discuss inter-state water conflicts and remedies"]),
     H.ex("ex_legy204_2", "legy204.txt applied questions, reworded",
          ["argue for demand-side water management",
           "evaluate rooftop harvesting laws of Tamil Nadu",
           "relate irrigation efficiency to water availability",
           "plan a village water budget for a dry district",
           "compare large dams with local harvesting"])]
H.emit("legy204", H.make_cat("legy204", "Water Resources", C, W, E))

# ---------------- legy205: Mineral and Energy Resources ---------------- #
C = [
 H.concept("legy.205.1", "Distribution of Key Minerals", "Distribution of Minerals",
  "Metallic minerals like iron, manganese, bauxite and copper occur mainly in "
  "the peninsular plateau's old crystalline rocks, and over 97 per cent of "
  "coal reserves lie in the valleys of Damodar, Sone, Mahanadi and Godavari, "
  "making mineral geography highly concentrated.",
  "outside_share = 100 - valley_share",
  "Subtracting the valley share of coal from 100 gives the coal lying outside "
  "these valleys.",
  "legy205.txt distribution of minerals and coal reserves (over 97 per cent in valleys)",
  ["where do India's metallic minerals mainly occur",
   "compute the coal share outside the great valleys",
   "name the coal-bearing valleys of peninsular India",
   "why does bauxite suit plateau regions",
   "state the distribution of manganese",
   "relate geology to mineral concentration"],
  "compute",
  [H.cstep(1, "record the valley share", "over 97 per cent of coal reserves lie in the valleys", "valley_share = 97"),
   H.cstep(2, "subtract from 100", "the remainder is coal outside these valleys", "outside_share = 100 - valley_share")]),
 H.concept("legy.205.2", "Ferrous, Non-ferrous and Non-metallic Minerals",
  "Ferrous Mineral",
  "Ferrous minerals - iron ore, manganese, chromite and nickel - form the "
  "backbone of metallurgical industries; non-ferrous minerals like copper, "
  "bauxite and lead feed electrical and manufacturing uses, while mica and "
  "limestone lead non-metallic minerals.",
  "",
  "Iron ore belts of Odisha-Jharkhand, Durg-Bastar, Bellary-Chitradurga and "
  "Maharashtra-Goa anchor India's steel economy.",
  "legy205.txt ferrous, non-ferrous and non-metallic mineral sections",
  ["name India's four iron ore belts",
   "distinguish ferrous from non-ferrous minerals with examples",
   "which minerals support the electrical industry",
   "state the uses of limestone and mica",
   "why is manganese vital for steel making",
   "describe bauxite distribution in India"],
  "verify_property",
  [H.vstep(1, "sort the minerals", "iron, manganese, chromite and nickel are ferrous; copper, bauxite and lead are non-ferrous"),
  H.vstep(2, "map the belts", "Odisha-Jharkhand and Durg-Bastar belts carry the richest hematite"),
  H.vstep(3, "close with uses", "each mineral feeds a distinct industrial chain")]),
 H.concept("legy.205.3", "Conventional and Non-conventional Energy",
  "Energy Resources",
  "Conventional energy includes coal, petroleum, natural gas and hydel power, "
  "while non-conventional sources - solar, wind, tidal, geothermal, "
  "biogas - are renewable and decentralised; India's energy strategy pushes "
  "non-conventional sources to cut import dependence and pollution.",
  "",
  "Solar and wind energy suit India's geography, from Thar desert sun to the "
  "coastal wind corridors of Tamil Nadu and Gujarat.",
  "legy205.txt conventional and non-conventional energy sections",
  ["differentiate conventional and non-conventional energy",
   "state the potential of solar and wind energy in India",
   "describe biogas as a rural energy source",
   "where is tidal energy possible in India",
   "why must India reduce coal dependence",
   "name geothermal energy sites mentioned in the chapter"],
  "verify_property",
  [H.vstep(1, "split the sources", "coal, oil, gas and hydel are conventional; solar, wind, tidal and biogas are not"),
  H.vstep(2, "match source to place", "Rajasthan's sun, coastal Tamil Nadu's wind and Gulf of Khambhat's tides fit distinct sources"),
  H.vstep(3, "close with strategy", "renewables cut imports and local pollution together")]),
 H.concept("legy.205.4", "Conservation of Minerals and Energy", "Conservation of Minerals",
  "Minerals are finite and non-reproducible, so conservation demands planned "
  "extraction, improved technology, recycling of metals, reduced wastage and "
  "substitution; energy conservation adds efficiency standards, mass transit "
  "and renewable substitution.",
  "",
  "Recycling one tonne of scrap steel saves ore, coal and energy together - "
  "conservation multiplies resources.",
  "legy205.txt conservation of minerals and energy sections",
  ["why is conservation of minerals necessary",
   "list methods of mineral conservation",
   "how does recycling save energy",
   "state energy conservation measures for households",
   "relate public transport to energy saving",
   "explain substitution with an example"],
  "verify_property",
  [H.vstep(1, "state the finiteness", "minerals cannot regrow, so every tonne extracted is gone forever"),
  H.vstep(2, "list the tools", "efficient technology, recycling and substitution stretch the stock"),
  H.vstep(3, "close with behaviour", "transit choices and efficiency norms conserve at the demand end")]),
]
W = [H.we("we_legy205_1", "legy205.txt coal valleys passage", "legy.205.1",
  "Over 97 per cent of coal reserves occur in the Damodar, Sone, Mahanadi and "
  "Godavari valleys. Compute the share of coal outside these valleys.",
  {"valley_share": 97},
  [H.cstep(1, "record the valley share", "about 97 per cent lies in the valleys", "valley_share = 97"),
   H.cstep(2, "subtract from 100", "100 - 97 = 3 per cent lies elsewhere", "outside_share = 100 - valley_share")]),
 H.we("we_legy205_2", "legy205.txt energy sections", "legy.205.3",
  "Match four regions of India with suitable non-conventional energy sources.",
  {},
  [H.vstep(1, "Thar desert", "high insolation suits solar plants"),
   H.vstep(2, "Tamil Nadu coast", "strong sea winds suit wind farms"),
   H.vstep(3, "Gulf of Khambhat", "high tidal range suits tidal power; rural plains suit biogas")],
  qtype="short_answer"),
 H.we("we_legy205_3", "legy205.txt conservation section", "legy.205.4",
  "Suggest three measures to conserve minerals in industry.",
  {},
  [H.vstep(1, "recycle scrap", "steel and aluminium scrap reduce ore demand"),
   H.vstep(2, "improve technology", "better beneficiation raises yield per tonne mined"),
   H.vstep(3, "substitute", "fibre optics replaced copper in many networks")],
  qtype="short_answer")]
E = [H.ex("ex_legy205_1", "legy205.txt end-of-chapter exercises, reworded",
          ["describe the distribution of ferrous minerals in India",
           "compute the coal share outside the main valleys",
           "differentiate conventional and non-conventional energy",
           "explain the potential of solar and wind energy in India",
           "suggest conservation measures for minerals"]),
     H.ex("ex_legy205_2", "legy205.txt applied questions, reworded",
          ["argue why mineral geography constrains industrial location",
           "evaluate India's renewable energy strategy",
           "explain geothermal and tidal prospects",
           "relate energy conservation to sustainable development",
           "plan a village energy mix with local sources"])]
H.emit("legy205", H.make_cat("legy205", "Mineral and Energy Resources", C, W, E))

# ---------------- legy206: Planning and Sustainable Development ---------------- #
C = [
 H.concept("legy.206.1", "Planning in India", "Planning in India",
  "India adopted planning through successive Five Year Plans prepared by the "
  "Planning Commission, combining sectoral planning for particular sectors "
  "with regional planning for balanced development of areas; plans set "
  "objectives, allocate resources and evaluate outcomes.",
  "",
  "Planning is the exercise of deliberate state choice over development "
  "priorities, correcting the uneven geography left by markets alone.",
  "legy206.txt planning approach and Five Year Plan objectives",
  ["define planning and sectoral planning",
   "what does regional planning aim at",
   "state the objectives of early Five Year Plans",
   "who prepares India's plans and how",
   "distinguish target group from target area planning",
   "evaluate plan achievements in agriculture and industry"],
  "verify_property",
  [H.vstep(1, "define the terms", "sectoral plans target industries; regional plans target areas"),
  H.vstep(2, "recall the machinery", "the Planning Commission drafted plans approved by the National Development Council"),
  H.vstep(3, "close with purpose", "balanced regional development is the recurring objective")]),
 H.concept("legy.206.2", "Target Area Planning", "Target Area Planning",
  "Target area planning directs resources to backward regions: the Drought "
  "Prone Areas Programme, Desert Development Programme and hill area "
  "development programmes cover identified districts; the Irrigation "
  "Commission of 1972 used 30 per cent irrigated area as the criterion to "
  "demarcate 67 drought-prone districts, so about 70 per cent or less of "
  "irrigated area flagged vulnerability.",
  "rainfed_share = 100 - irrigated_criterion",
  "A district with 30 per cent irrigated area has 70 per cent rainfed area - "
  "the vulnerability marker used for drought-prone demarcation.",
  "legy206.txt Irrigation Commission 1972 criterion (30 per cent irrigated area, 67 districts)",
  ["what criterion did the Irrigation Commission 1972 use",
   "compute the rainfed share implied by the drought criterion",
   "name the target area programmes of India",
   "how many districts were demarcated as drought prone",
   "what works did DDA Programme fund",
   "evaluate hill area development programmes"],
  "compute",
  [H.cstep(1, "record the criterion", "30 per cent irrigated area marked a drought-prone district", "irrigated_criterion = 30"),
   H.cstep(2, "subtract from 100", "70 per cent rainfed share flagged vulnerability", "rainfed_share = 100 - irrigated_criterion")]),
 H.concept("legy.206.3", "Indira Gandhi Canal Command Area", "Indira Gandhi Canal Command Area",
  "The Indira Gandhi Canal, drawing from the Sutlej at Harike, carries water "
  "through Punjab and Haryana into Rajasthan's desert districts, greening the "
  "command area for canal-irrigated agriculture while raising risks of "
  "waterlogging, salinity and ecological stress if management fails.",
  "",
  "The canal proves that water can remake desert geography, but only with "
  "disciplined irrigation practice.",
  "legy206.txt Indira Gandhi Canal spread and its positive and adverse effects",
  ["trace the route of the Indira Gandhi Canal",
   "list the benefits in the Rajasthan command area",
   "what adverse effects threaten the canal command area",
   "how can waterlogging be prevented in canal areas",
   "describe changes in cropping after canal arrival",
   "relate canal irrigation to desert ecology"],
  "verify_property",
  [H.vstep(1, "trace the canal", "from Harike barrage across Punjab and Haryana into Sri Ganganagar and beyond"),
  H.vstep(2, "weigh the effects", "green fields and grain production versus seepage and salinity"),
  H.vstep(3, "close with management", "lined channels and crop discipline decide long-term success")]),
 H.concept("legy.206.4", "Sustainable Development", "Sustainable Development",
  "Sustainable development meets present needs without sacrificing the ability "
  "of future generations to meet theirs; it balances economic growth, social "
  "equity and environmental care, as in watershed programmes, joint forest "
  "management and organic farming practices.",
  "",
  "Sustainability converts development from a race for output into "
  "stewardship of resources across generations.",
  "legy206.txt sustainable development definition and case practices",
  ["define sustainable development",
   "how does joint forest management work",
   "explain organic farming as sustainable practice",
   "relate watershed development to sustainability",
   "name the indicators of unsustainable growth",
   "what role do local communities play in sustainability"],
  "verify_property",
  [H.vstep(1, "define the term", "present needs are met without cutting off future needs"),
  H.vstep(2, "cite the practices", "joint forest management shares forest produce and protection with villagers"),
  H.vstep(3, "close with balance", "equity, ecology and economy must move together")]),
]
W = [H.we("we_legy206_1", "legy206.txt drought criterion", "legy.206.2",
  "The Irrigation Commission demarcated drought-prone districts by 30 per "
  "cent irrigated area. Compute the rainfed share such a district has.",
  {"irrigated_criterion": 30},
  [H.cstep(1, "record the criterion", "30 per cent irrigated area marks drought proneness", "irrigated_criterion = 30"),
   H.cstep(2, "subtract from 100", "100 - 30 = 70 per cent rainfed area", "rainfed_share = 100 - irrigated_criterion")]),
 H.we("we_legy206_2", "legy206.txt canal command section", "legy.206.3",
  "Assess the Indira Gandhi Canal's effects with one positive and one adverse "
  "outcome.",
  {},
  [H.vstep(1, "positive", "desert districts gained canal-irrigated farming and fodder"),
   H.vstep(2, "adverse", "seepage raised water tables, bringing waterlogging and salinity"),
   H.vstep(3, "verdict", "benefits persist only under careful water management")],
  qtype="short_answer"),
 H.we("we_legy206_3", "legy206.txt sustainability section", "legy.206.4",
  "Explain joint forest management as sustainable development in three steps.",
  {},
  [H.vstep(1, "share the role", "village committees protect degraded forests with the forest department"),
   H.vstep(2, "share the produce", "communities receive a share of timber and non-timber products"),
   H.vstep(3, "conclusion", "livelihood and forest regeneration rise together, the essence of sustainability")],
  qtype="short_answer")]
E = [H.ex("ex_legy206_1", "legy206.txt end-of-chapter exercises, reworded",
          ["define planning and its sectoral and regional forms",
           "compute the rainfed share implied by the drought-prone criterion",
           "describe target area programmes with examples",
           "assess the Indira Gandhi Canal command area",
           "explain sustainable development with Indian cases"]),
     H.ex("ex_legy206_2", "legy206.txt applied questions, reworded",
          ["argue for and against canal irrigation in deserts",
           "evaluate the drought-prone areas programme",
           "relate empowerment of women to sustainable development",
           "plan sustainable land use for a semi-arid district",
           "compare plan-era and market-era development approaches"])]
H.emit("legy206", H.make_cat("legy206", "Planning and Sustainable Development in Indian Context", C, W, E))

# ---------------- legy207: Transport and Communication ---------------- #
C = [
 H.concept("legy.207.1", "Road Transport in India", "Roadways",
  "Roads carry about 85 per cent of passenger and 70 per cent of freight "
  "traffic in India, and are classified into national highways, state "
  "highways, major district roads and rural roads, with golden quadrilateral "
  "super highways linking the four metro cities.",
  "non_road_passenger_share = 100 - road_passenger_share",
  "Subtracting the road share of passenger traffic from 100 gives the share "
  "carried by rail, air and water together.",
  "legy207.txt road classification and traffic shares (85 per cent passenger, 70 per cent freight)",
  ["what share of passenger traffic do roads carry",
   "compute the non-road share of passenger traffic",
   "classify Indian roads by administration",
   "what is the golden quadrilateral",
   "contrast national and state highways",
   "evaluate rural roads under Pradhan Mantri Gram Sadak Yojana"],
  "compute",
  [H.cstep(1, "record the road share", "roads carry 85 per cent of passengers", "road_passenger_share = 85"),
   H.cstep(2, "subtract from 100", "the rest travels by rail, air and water", "non_road_passenger_share = 100 - road_passenger_share")]),
 H.concept("legy.207.2", "Railways: Network and Zones", "Railways",
  "Indian Railways is the largest public undertaking running the country's "
  "biggest network, organised into zones; the dense network of the northern "
  "plains contrasts with thin coverage in the Himalaya, desert and north-east, "
  "while konkan railway and metro rail extend the system.",
  "",
  "Terrain decides the rails: flat plains support dense grids, mountains "
  "raise costs and limit lines.",
  "legy207.txt railway development, zones and difficulty zones sections",
  ["describe the regional pattern of railway density in India",
   "which terrain regions are unsuited to railways and why",
   "what is the Konkan railway's significance",
   "how are railway zones organised",
   "compare rail and road freight for long hauls",
   "state the role of railways in national integration"],
  "verify_property",
  [H.vstep(1, "map the density", "the northern plains hold the densest network; Himalaya and desert the sparsest"),
  H.vstep(2, "explain the limits", "high construction cost and diffused demand keep hills and deserts thin"),
  H.vstep(3, "close with zones", "zonal organisation manages the vast single system")]),
 H.concept("legy.207.3", "Water, Pipeline and Air Transport", "Waterways, Pipelines and Airways",
  "Inland waterways on the Ganga-Brahmaputra and the west coast canals, five "
  "national waterways, crude oil and product pipelines like the Naharkatia-"
  "Nunmati-Barauni line, and air services through Air India and private "
  "carriers complete India's transport mix.",
  "",
  "Waterways move cheap bulk, pipelines move fluids without packaging, and "
  "airways serve speed and distance rather than weight.",
  "legy207.txt waterways, pipelines and aviation sections",
  ["name the national waterways of India",
   "trace the Naharkatia-Nunmati-Barauni pipeline",
   "compare waterways with railways for bulk cargo",
   "why are pipelines suited to crude oil and gas",
   "describe the growth of private aviation",
   "state the role of heli routes in remote areas"],
  "verify_property",
  [H.vstep(1, "list the waterways", "the Ganga, Brahmaputra and west coast canal systems form the national waterways"),
  H.vstep(2, "follow the pipeline", "Naharkatia fields feed Nunmati and Barauni refineries by pipeline"),
  H.vstep(3, "close with air", "private carriers widened air access beyond the national carrier")]),
 H.concept("legy.207.4", "Communication Networks in India", "Communication",
  "India's communication spans the postal network - among the world's largest "
  "with post offices in nearly every village - landline and mobile telephony "
  "with millions of village connections, and broadcasting and internet "
  "services that link the country's markets and administration.",
  "",
  "Postal reach plus mobile telephony gives even remote villages at least one "
  "channel to the national network.",
  "legy207.txt postal, telecom and internet sections",
  ["describe the extent of India's postal network",
   "how has telephony changed rural communication",
   "name the national telecom backbone services",
   "compare printed and electronic media reach",
   "state the role of communication in disaster management",
   "relate internet growth to the digital economy"],
  "verify_property",
  [H.vstep(1, "count the channels", "posts, telephones, broadcasting and internet form the four channels"),
  H.vstep(2, "note the village reach", "village post offices and mobile towers extend the network's last mile"),
  H.vstep(3, "close with integration", "communication knits markets, administration and families together")]),
]
W = [H.we("we_legy207_1", "legy207.txt road traffic shares", "legy.207.1",
  "Roads carry 85 per cent of passenger traffic. Compute the share of all "
  "other modes together.",
  {"road_passenger_share": 85},
  [H.cstep(1, "record the road share", "85 per cent of passengers move by road", "road_passenger_share = 85"),
   H.cstep(2, "subtract from 100", "100 - 85 = 15 per cent by other modes", "non_road_passenger_share = 100 - road_passenger_share")]),
 H.we("we_legy207_2", "legy207.txt railway sections", "legy.207.2",
  "Why is railway density low in the Himalayan and desert regions?",
  {},
  [H.vstep(1, "construction cost", "mountain terrain needs tunnels and bridges, raising costs"),
   H.vstep(2, "thin demand", "low population and freight volumes cannot repay the investment"),
   H.vstep(3, "conclusion", "economics, not neglect, keeps these networks thin")],
  qtype="short_answer"),
 H.we("we_legy207_3", "legy207.txt waterways section", "legy.207.3",
  "State two advantages of inland waterways for freight.",
  {},
  [H.vstep(1, "cheap hauling", "water resistance makes bulk hauling cost far less per tonne-km"),
   H.vstep(2, "no land acquisition", "rivers are ready-made channels needing little land"),
   H.vstep(3, "conclusion", "fuel savings make rivers ideal for coal, ore and grain")],
  qtype="short_answer")]
E = [H.ex("ex_legy207_1", "legy207.txt end-of-chapter exercises, reworded",
          ["classify Indian roads and give their traffic shares",
           "compute the non-road share of passenger traffic",
           "describe the regional pattern of railway development",
           "name the national waterways and their routes",
           "evaluate the growth of communication networks"]),
     H.ex("ex_legy207_2", "legy207.txt applied questions, reworded",
          ["argue the case for freight corridors",
           "compare pipeline transport with rail for petroleum",
           "map the golden quadrilateral and its corridors",
           "relate communication growth to e-governance",
           "plan last-mile connectivity for a hill district"])]
H.emit("legy207", H.make_cat("legy207", "Transport and Communication", C, W, E))

# ---------------- legy208: International Trade ---------------- #
C = [
 H.concept("legy.208.1", "Changing Composition of India's Trade",
  "Changing Pattern of the Composition of India's Imports",
  "India's export composition shifted from agricultural products to "
  "manufactured goods, which formed about 67.8 per cent of exports in "
  "2021-22, while imports include crude oil and petroleum, pearls, chemicals "
  "and electronic goods; the shift mirrors industrialisation and skill "
  "upgradation.",
  "non_manufactured_share = 100 - manufactured_share",
  "Subtracting the manufactured goods share of exports from 100 gives the "
  "share of agriculture, ores and other non-manufactured exports.",
  "legy208.txt export composition table (manufactured goods 67.8 per cent in 2021-22)",
  ["what share of exports do manufactured goods form recently",
   "compute the non-manufactured export share",
   "trace the decline of agricultural exports' share",
   "name India's major import items",
   "why do crude oil imports dominate",
   "relate IT services to invisible exports"],
  "compute",
  [H.cstep(1, "record the manufactured share", "manufactured goods formed about 67.8 per cent of exports", "manufactured_share = 67.8"),
   H.cstep(2, "subtract from 100", "the remainder is non-manufactured exports", "non_manufactured_share = 100 - manufactured_share")]),
 H.concept("legy.208.2", "Direction and Balance of Trade", "Direction of Trade",
  "India's trade direction has moved towards Asia: countries of Asia and "
  "ASEAN now take the largest shares of exports and imports, with the USA, "
  "China and Gulf states as leading partners, while the trade balance swings "
  "with oil prices and global demand.",
  "",
  "Neighbouring Asian economies replace old western partners as India's main "
  "trade geography, changing ports and shipping patterns too.",
  "legy208.txt direction of trade and major partners sections",
  ["which regions dominate India's trade direction",
   "name India's leading trade partners",
   "how does oil price movement affect the trade balance",
   "define balance of trade and its favourable form",
   "compute the balance from export and import values",
   "relate trade direction to port traffic"],
  "verify_property",
  [H.vstep(1, "map the partners", "Asian and ASEAN countries lead, with USA, China and Gulf states prominent"),
  H.vstep(2, "define the balance", "exports minus imports give the balance, favourable when positive"),
  H.vstep(3, "close with oil", "crude import bills swing the balance seasonally and cyclically")]),
 H.concept("legy.208.3", "Sea Ports and Airports as Trade Gateways",
  "Sea Ports",
  "About 95 per cent of India's international trade by volume moves by sea "
  "through twelve major ports like Mumbai, Kandla, Visakhapatnam, Paradip and "
  "Chennai, complemented by minor ports and international airports handling "
  "high-value cargo like gems and electronics.",
  "",
  "Ports are trade's gateways: their capacity and turnaround decide whether "
  "export competitiveness reaches the seas.",
  "legy208.txt sea ports and airports sections",
  ["what share of India's trade volume moves by sea",
   "name the major sea ports of India with their hinterlands",
   "differentiate major and minor ports",
   "which commodities move through Indian airports",
   "explain the role of container terminals",
   "relate port efficiency to export growth"],
  "verify_property",
  [H.vstep(1, "state the sea share", "about 95 per cent of trade volume rides the seas"),
  H.vstep(2, "list the gateways", "Mumbai, Kandla, Visakhapatnam, Paradip and Chennai anchor the coasts"),
  H.vstep(3, "close with air cargo", "gems, electronics and pharma prefer airports for speed and safety")]),
 H.concept("legy.208.4", "Trade Policy and Global Integration", "Trade Policy",
  "India's trade policy moved from import substitution and licensing before "
  "1991 to trade liberalisation, with reduced tariffs, export promotion "
  "zones and free trade agreements integrating India into global value "
  "chains.",
  "",
  "Liberalisation changed both what India trades and how: service exports, "
  "electronics assembly and regional agreements now shape the ledger.",
  "legy208.txt trade policy reform and export promotion sections",
  ["contrast pre-1991 and post-1991 trade policies",
   "what do export promotion zones do",
   "name India's major free trade agreements mentioned",
   "how did tariffs move after liberalisation",
   "relate global value chains to Indian manufacturing",
   "evaluate service exports in the trade ledger"],
  "verify_property",
  [H.vstep(1, "date the turn", "1991 liberalisation replaced licensing with tariff-led openness"),
  H.vstep(2, "list the tools", "export zones, FTAs and tariff cuts are the policy instruments"),
  H.vstep(3, "close with chains", "joining global value chains made ports and skills decisive")]),
]
W = [H.we("we_legy208_1", "legy208.txt export composition table", "legy.208.1",
  "Manufactured goods formed about 67.8 per cent of India's exports in "
  "2021-22. Compute the share of all other exports.",
  {"manufactured_share": 67.8},
  [H.cstep(1, "record the manufactured share", "manufactured goods take about 67.8 per cent", "manufactured_share = 67.8"),
   H.cstep(2, "subtract from 100", "100 - 67.8 = 32.2 per cent is non-manufactured", "non_manufactured_share = 100 - manufactured_share")]),
 H.we("we_legy208_2", "legy208.txt balance of trade section", "legy.208.2",
  "Compute India's trade balance in a year when exports were 310 billion "
  "dollars and imports 470 billion dollars.",
  {"exports_value": 310, "imports_value": 470},
  [H.cstep(1, "record the values", "exports 310, imports 470 billion dollars", "exports_value = 310"),
   H.cstep(2, "subtract imports from exports", "310 - 470 = -160, an unfavourable balance", "trade_balance = exports_value - imports_value")]),
 H.we("we_legy208_3", "legy208.txt sea ports section", "legy.208.3",
  "Why do most of India's trade volumes move by sea rather than air?",
  {},
  [H.vstep(1, "bulk economics", "ships carry huge volumes at a fraction of air cost"),
   H.vstep(2, "cargo profile", "crude, coal, grains and machinery dominate and are weighty"),
   H.vstep(3, "conclusion", "only high-value light cargo justifies air freight")],
  qtype="short_answer")]
E = [H.ex("ex_legy208_1", "legy208.txt end-of-chapter exercises, reworded",
          ["describe the changing composition of India's exports",
           "compute the non-manufactured export share from the table",
           "explain the direction of India's trade with partners",
           "define and compute balance of trade",
           "evaluate the role of ports in foreign trade"]),
     H.ex("ex_legy208_2", "legy208.txt applied questions, reworded",
          ["argue the effects of 1991 trade liberalisation",
           "relate crude oil imports to trade deficits",
           "map India's major sea ports and their trades",
           "assess service exports in the national economy",
           "discuss free trade agreements and farming interests"])]
H.emit("legy208", H.make_cat("legy208", "International Trade", C, W, E))

# ---------------- legy209: Geographical Perspective on Selected Issues ---------------- #
C = [
 H.concept("legy.209.1", "Urbanisation and Environmental Pollution",
  "Environmental Pollution",
  "About 55 per cent of the world's population now lives in cities and the "
  "share is projected to reach 68 per cent by 2050; this urban surge "
  "concentrates air, water and waste pollution, putting pressure on "
  "governments and environments alike.",
  "urban_increase = urban_2050 - urban_now",
  "The projected rise in the urban share equals the 2050 estimate minus the "
  "present share.",
  "legy209.txt urbanisation and pollution pressure passage (55 per cent now, 68 per cent by 2050)",
  ["state the present and projected urban shares of world population",
   "compute the projected increase in urban share by 2050",
   "how does urbanisation worsen air and water pollution",
   "name the major sources of urban air pollution",
   "what is the pressure on governments from urban growth",
   "relate vehicle growth to urban air quality"],
  "compute",
  [H.cstep(1, "record the two shares", "55 per cent now, 68 per cent projected by 2050", "urban_now = 55"),
   H.cstep(2, "take the difference", "68 minus 55 gives the 13-point rise", "urban_increase = urban_2050 - urban_now")]),
 H.concept("legy.209.2", "Water Pollution and Diseases", "Water Pollution and Diseases",
  "Untreated sewage and industrial effluents pollute rivers and groundwater, "
  "spreading water-borne diseases like cholera, typhoid, jaundice and "
  "diarrhoea; the poor bear the burden as they depend on polluted surface "
  "water.",
  "",
  "Safe drinking water is preventive medicine: every clean source removes a "
  "hospital queue.",
  "legy209.txt water pollution and water-borne disease sections",
  ["name the water-borne diseases linked to polluted water",
   "how do sewage and effluents pollute rivers",
   "why do the poor suffer most from water pollution",
   "what treatments remove pollutants from drinking water",
   "relate groundwater contamination to health",
   "suggest measures to secure safe village water"],
  "verify_property",
  [H.vstep(1, "trace the pathway", "sewage and effluents enter rivers and wells, then households"),
  H.vstep(2, "name the diseases", "cholera, typhoid, jaundice and diarrhoea ride polluted water"),
  H.vstep(3, "close with equity", "poor households without treated supply suffer the heaviest toll")]),
 H.concept("legy.209.3", "Land Degradation, Drought and Desertification",
  "Land Degradation",
  "Land degradation from deforestation, overgrazing, mining and faulty "
  "irrigation combines with drought to advance desertification, especially in "
  "arid and semi-arid tracts; watershed treatment, shelter belts and grazing "
  "discipline are the checked remedies.",
  "",
  "Desertification is degradation's end state - restoring cover and moisture "
  "early is far cheaper than reversing dunes.",
  "legy209.txt land degradation, drought and desertification sections",
  ["list the causes of land degradation discussed",
   "how does drought trigger desertification",
   "describe watershed treatment as a remedy",
   "what role do shelter belts play",
   "relate overgrazing to pasture decline",
   "suggest a village-level anti-desertification plan"],
  "verify_property",
  [H.vstep(1, "trace the chain", "tree loss and overgrazing expose soil; drought completes the conversion to desert"),
  H.vstep(2, "apply the remedies", "watershed works and shelter belts hold soil and moisture"),
  H.vstep(3, "close with timing", "early treatment prevents costly dune reclamation")]),
 H.concept("legy.209.4", "Measures Against Environmental Issues",
  "Environmental Issues and Remedies",
  "Measures against environmental issues combine government action - "
  "pollution control boards, emission norms, afforestation programmes - with "
  "citizen measures like rainwater harvesting, waste segregation and public "
  "transport; awareness is the multiplier of all such measures.",
  "",
  "Laws set the limits, but daily choices of energy, water and waste decide "
  "the actual pollution load.",
  "legy209.txt government and citizen measures for environmental issues",
  ["list government remedies for pollution in India",
   "what citizen actions reduce pollution loads",
   "how do pollution control boards function",
   "evaluate public transport as a remedy",
   "relate awareness campaigns to behaviour change",
   "suggest a school-level environmental action plan"],
  "verify_property",
  [H.vstep(1, "split the actors", "state agencies regulate; citizens change daily practice"),
  H.vstep(2, "cite the instruments", "norms, boards and afforestation programmes are state tools"),
  H.vstep(3, "close with awareness", "informed choices multiply every formal remedy")]),
]
W = [H.we("we_legy209_1", "legy209.txt urbanisation passage", "legy.209.1",
  "The world's urban share is 55 per cent now and is projected at 68 per "
  "cent by 2050. Compute the projected increase.",
  {"urban_now": 55, "urban_2050": 68},
  [H.cstep(1, "record the shares", "55 now, 68 by 2050", "urban_now = 55"),
   H.cstep(2, "subtract", "68 - 55 = 13 percentage points of growth ahead", "urban_increase = urban_2050 - urban_now")]),
 H.we("we_legy209_2", "legy209.txt water disease section", "legy.209.2",
  "Link polluted water to two diseases and one preventive measure.",
  {},
  [H.vstep(1, "disease pathway", "cholera and typhoid germs travel in sewage-polluted water"),
   H.vstep(2, "prevention", "boiling, filtration or protected wells cut the pathway"),
   H.vstep(3, "conclusion", "safe water is the cheapest health programme")],
  qtype="short_answer"),
 H.we("we_legy209_3", "legy209.txt desertification section", "legy.209.3",
  "Prepare a three-step village plan against desertification.",
  {},
  [H.vstep(1, "hold the soil", "plant shelter belts and grass strips against wind"),
   H.vstep(2, "store the rain", "build check dams and farm ponds for moisture"),
   H.vstep(3, "cut the pressure", "regulate grazing and promote drought-hardy crops")],
  qtype="short_answer")]
E = [H.ex("ex_legy209_1", "legy209.txt end-of-chapter exercises, reworded",
          ["compute the projected rise in urban population share by 2050",
           "describe the causes and effects of water pollution",
           "explain land degradation and its conservation",
           "discuss drought and desertification with examples",
           "evaluate responses to environmental issues"]),
     H.ex("ex_legy209_2", "legy209.txt applied questions, reworded",
          ["argue for urban waste segregation programmes",
           "relate air pollution to vehicle policy",
           "plan safe drinking water for a flood-prone village",
           "assess afforestation programmes you know",
           "connect sustainable lifestyles to pollution reduction"])]
H.emit("legy209", H.make_cat("legy209", "Geographical Perspective on Selected Issues and Problems", C, W, E))

print("legy2 done")
