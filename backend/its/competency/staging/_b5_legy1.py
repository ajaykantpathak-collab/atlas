# Batch 5 drafts: legy101-108 (Fundamentals of Human Geography)
import _b5_helper as H

# ---------------- legy101: Human Geography Nature and Scope ---------------- #
C = [
 H.concept("legy.101.1", "Nature and Scope of Human Geography", "Nature and Scope",
  "Human geography studies the changing relationship between the resting "
  "human community and the active physical environment, synthesising ideas "
  "from sister disciplines; it moves from nature-humans to humans-nature and "
  "finally to human beings as modifiers of the earth.",
  "",
  "Geography is the study of areal differentiation: what is where, why there "
  "and how it changes through time.",
  "legy101.txt nature of human geography and human-environment relationship sections",
  ["define human geography and its scope",
   "how does human geography synthesise ideas from other disciplines",
   "what is meant by areal differentiation",
   "trace the shift from nature-humans to humans-nature views",
   "why is human geography called a synthesising discipline",
   "distinguish physical geography from human geography"],
  "verify_property",
  [H.vstep(1, "state the subject matter", "the interaction of human society with the physical environment is the core object"),
  H.vstep(2, "note the synthesis", "concepts are borrowed and reworked from sociology, economics, history and biology"),
  H.vstep(3, "close with areal difference", "explaining why places differ is geography's signature task")]),
 H.concept("legy.101.2", "Determinism, Possibilism and Neo-determinism",
  "Human Geography Through the Corridors of Time",
  "Environmental determinism holds that nature controls human life and was "
  "associated with Ratzel and Semple; possibilism of Vidal de La Blache and "
  "Febvre counters that humans are active agents choosing within limits set "
  "by nature; Griffith Taylor's neo-determinism or stop-and-go determinism "
  "argues for balanced development respecting both human skill and "
  "environmental limits.",
  "",
  "The schools differ on agency: nature commands (determinism), humans "
  "command (possibilism), or a middle path times human action to "
  "environmental tolerance (neo-determinism).",
  "legy101.txt determinism, possibilism and neo-determinism passages",
  ["compare environmental determinism and possibilism with proponents",
   "what does stop-and-go determinism propose",
   "who propounded neo-determinism and why is it a middle path",
   "which school did Ratzel and Semple belong to",
   "give an example where possibilism explains human choices",
   "why did scholars reject pure determinism"],
  "verify_property",
  [H.vstep(1, "pair school and scholar", "Ratzel-Semple to determinism; Vidal de La Blache-Febvre to possibilism; Taylor to neo-determinism"),
  H.vstep(2, "test with an example", "air conditioning and greenhouses show humans overcoming nature, the possibilist point"),
  H.vstep(3, "close with balance", "Taylor stops development where environmental tolerance ends and goes where it resumes")]),
 H.concept("legy.101.3", "Fields and Sub-fields of Human Geography",
  "Fields and Sub-fields of Human Geography",
  "Human geography branches into social geography, urban and rural geography, "
  "population and settlement geography, economic geography (with agriculture, "
  "industry and tourism branches), historical, political, bio-geography and "
  "environmental geography, each linked to sister disciplines.",
  "",
  "Every sub-field pairs a geographical question with the concepts of a "
  "sister discipline, which is how the subject keeps expanding.",
  "legy101.txt fields and sub-fields table",
  ["list the major sub-fields of human geography",
   "what does settlement geography study",
   "how is economic geography subdivided",
   "which sub-field links geography with political science",
   "define bio-geography as given in the chapter",
   "what is the place of environmental geography among sub-fields"],
  "verify_property",
  [H.vstep(1, "read the branches", "social, urban-rural, population-settlement and economic are the principal fields"),
  H.vstep(2, "link sister subjects", "each sub-field is born where geography meets a companion discipline"),
  H.vstep(3, "close with purpose", "the branches together cover every human activity over space")]),
]
W = [H.we("we_legy101_1", "legy101.txt determinism-possibilism passage", "legy.101.2",
  "Contrast environmental determinism and possibilism using one example each.",
  {},
  [H.vstep(1, "state determinism", "nature dictates livelihood, dress and housing; the equatorial forest tribes illustrate it"),
   H.vstep(2, "state possibilism", "technology lets humans farm deserts and build in cold lands, so nature only proposes"),
   H.vstep(3, "verdict", "modern geography accepts limits but stresses human agency")],
  qtype="short_answer"),
 H.we("we_legy101_2", "legy101.txt neo-determinism passage", "legy.101.2",
  "Explain Griffith Taylor's stop-and-go determinism with its policy meaning.",
  {},
  [H.vstep(1, "state the doctrine", "human programmes should fit environmental tolerances rather than fight them"),
   H.vstep(2, "policy meaning", "go where nature allows, stop where degradation begins, like traffic lights"),
   H.vstep(3, "verdict", "it seeks balanced development between fatalism and arrogance")],
  qtype="short_answer"),
 H.we("we_legy101_3", "legy101.txt sub-fields table", "legy.101.3",
  "Match four sub-fields of human geography with their sister disciplines.",
  {},
  [H.vstep(1, "social geography", "borrows from sociology the study of social groups over space"),
   H.vstep(2, "political geography", "draws on political science for states, boundaries and power"),
   H.vstep(3, "economic geography", "uses economics for production, exchange and consumption patterns")],
  qtype="short_answer")]
E = [H.ex("ex_legy101_1", "legy101.txt end-of-chapter exercises, reworded",
          ["define human geography and show its links with sister disciplines",
           "compare the three schools of human-environment relations",
           "explain stop-and-go determinism with a development example",
           "enumerate the sub-fields of human geography with their focus",
           "why is human geography called the mother of allied branches"]),
     H.ex("ex_legy101_2", "legy101.txt applied questions, reworded",
          ["argue a possibilist case for modern technology in deserts",
           "show how population geography and sociology interlock",
           "evaluate determinism with a counterexample of your region",
           "state the contribution of Vidal de La Blache to geography",
           "distinguish physical and human geography by scope and method"])]
H.emit("legy101", H.make_cat("legy101", "Human Geography Nature and Scope", C, W, E))

# ---------------- legy102: The World Population ---------------- #
C = [
 H.concept("legy.102.1", "Patterns of Population Distribution", "Patterns of Population Distribution",
  "About 90 per cent of the world's population lives on about 10 per cent of "
  "its land area, with dense clusters in East Asia, South Asia, South East "
  "Asia and Europe, where availability of water, fertile plains and mild "
  "climate attract settlement.",
  "",
  "Distribution is uneven because habitability is uneven: water, plains and "
  "soil pull people, deserts and tundra push them away.",
  "legy102.txt distribution patterns and factors attracting concentration",
  ["what share of humanity lives on what share of land area",
   "name the major population clusters of the world",
   "why do river plains support dense populations",
   "which physical factors limit settlement in deserts and polar areas",
   "how does availability of water shape distribution",
   "what is meant by sparse and dense population regions"],
  "verify_property",
  [H.vstep(1, "quote the shares", "90 per cent of people on 10 per cent of land is the chapter's headline imbalance"),
  H.vstep(2, "list the clusters", "East, South and South East Asia plus Europe are the four crowded regions"),
  H.vstep(3, "close with factors", "water availability, plains and climate explain the pull of these clusters")]),
 H.concept("legy.102.2", "Density of Population", "Density of Population",
  "Population density is the ratio between the number of people and the area "
  "of land they occupy, usually expressed as persons per square kilometre; "
  "the world average and country averages mask sharp internal contrasts.",
  "population_density = total_population / land_area",
  "Dividing total population by land area in square kilometres yields density "
  "in persons per square kilometre.",
  "legy102.txt density definition and density of world and regions",
  ["define population density and give its formula",
   "compute density when population and area are given",
   "why does density vary within a country",
   "compare high and low density regions with examples",
   "how is density used in planning",
   "what units express population density"],
  "compute",
  [H.cstep(1, "state the ratio", "density equals population divided by area in sq km", "population_density = total_population / land_area")]),
 H.concept("legy.102.3", "Population Growth and its Components", "Population Growth",
  "Population growth is the change of population in an area between two time "
  "points, expressed as absolute change or growth rate per cent; natural "
  "growth comes from births and deaths while migration adds immigration and "
  "emigration components.",
  "",
  "Growth rates peak in the developing world because birth rates fall later "
  "than death rates, producing the demographic bulge.",
  "legy102.txt growth components, growth rates and demographic transition sections",
  ["distinguish absolute growth from growth rate",
   "list the four components of population change",
   "how do birth and death rates jointly determine natural growth",
   "what is the role of migration in population change",
   "compare growth patterns of developed and developing regions",
   "define natural increase of population"],
  "verify_property",
  [H.vstep(1, "separate the components", "births minus deaths give natural growth; migrants give the mechanical component"),
  H.vstep(2, "read the rates", "growth rate per cent allows comparison across countries of different sizes"),
  H.vstep(3, "close with regions", "developing countries now contribute the bulk of annual additions")]),
 H.concept("legy.102.4", "Top Ten Countries and Their Share", "Population Distribution",
  "The ten most populous countries of the world contribute about 60 per cent "
  "of the world's population, with China and India alone approaching two-fifths; "
  "the remaining world population share can be found by subtracting the top "
  "ten share from 100.",
  "rest_share = 100 - top_ten_share",
  "Subtracting the top ten share from 100 gives the share of all other "
  "countries together.",
  "legy102.txt ten most populous countries passage (60 per cent of world population)",
  ["what share of world population do the ten most populous countries hold",
   "compute the share of the remaining countries of the world",
   "which two countries dominate the top ten list",
   "why do few countries hold most of humanity",
   "how is population concentration linked to development challenges",
   "name five countries of the top ten list"],
  "compute",
  [H.cstep(1, "record the top ten share", "the ten most populous countries hold 60 per cent of humanity", "top_ten_share = 60"),
   H.cstep(2, "subtract from 100", "the rest of the world is the difference from the full hundred", "rest_share = 100 - top_ten_share")]),
]
W = [H.we("we_legy102_1", "legy102.txt density definition", "legy.102.2",
  "A country has a population of 24,00,000 on an area of 1,20,000 sq km. "
  "Compute its population density.",
  {"total_population": 2400000, "land_area": 120000},
  [H.cstep(1, "state the formula", "density = population / area in sq km", "population_density = total_population / land_area")]),
 H.we("we_legy102_2", "legy102.txt top ten countries passage", "legy.102.4",
  "The ten most populous countries hold 60 per cent of world population. What "
  "is the share of all remaining countries?",
  {"top_ten_share": 60},
  [H.cstep(1, "record the top ten share", "60 per cent is held by the top ten countries", "top_ten_share = 60"),
   H.cstep(2, "subtract from 100", "100 - 60 leaves the rest of the world", "rest_share = 100 - top_ten_share")]),
 H.we("we_legy102_3", "legy102.txt distribution factors", "legy.102.1",
  "Explain three physical factors behind the clustering of world population.",
  {},
  [H.vstep(1, "water", "settled life gathers around rivers, lakes and coastal water sources"),
   H.vstep(2, "plains and soil", "flat fertile plains permit agriculture and dense rural settlement"),
   H.vstep(3, "climate", "moderate climates of Europe and monsoon Asia attract population while hot deserts and tundra repel")],
  qtype="short_answer")]
E = [H.ex("ex_legy102_1", "legy102.txt end-of-chapter exercises, reworded",
          ["explain the uneven distribution of world population with factors",
           "compute density for a country with given population and area",
           "describe the four major population clusters of the world",
           "differentiate absolute growth from growth rate",
           "why do deserts remain sparsely populated even with resources"]),
     H.ex("ex_legy102_2", "legy102.txt applied questions, reworded",
          ["compute the remaining share when the top ten countries hold 60 per cent",
           "analyse how irrigation changes regional density",
           "compare the demographic situations of developed and developing regions",
           "explain the role of migration in redistributing population",
           "argue why density alone cannot measure crowding"])]
H.emit("legy102", H.make_cat("legy102", "The World Population Distribution, Density and Growth", C, W, E))

# ---------------- legy103: Human Development ---------------- #
C = [
 H.concept("legy.103.1", "Growth versus Development", "Growth and Development",
  "Growth is a quantitative, directional change (for example a rise in real "
  "income), while development is qualitative, value-positive growth implying "
  "improvement in human life; development is a process and both need not move "
  "together.",
  "",
  "Mahbub-ul-Haq and Amartya Sen reframed development as enlarging people's "
  "choices, not merely raising income.",
  "legy103.txt growth and development distinction and Haq-Sen references",
  ["differentiate growth from development with examples",
   "why can growth occur without development",
   "who pioneered the human development approach",
   "what does development as enlarging choices mean",
   "define value-positive growth",
   "how is development both a process and a goal"],
  "verify_property",
  [H.vstep(1, "contrast the terms", "growth counts more output; development asks who benefits and how life improves"),
  H.vstep(2, "cite the founders", "Mahbub-ul-Haq with Amartya Sen launched the Human Development Reports"),
  H.vstep(3, "close with choices", "enlarging choices in health, knowledge and resources defines development")]),
 H.concept("legy.103.2", "Four Pillars of Human Development",
  "The Four Pillars of Human Development",
  "Human development rests on four pillars: equity (equal access to "
  "opportunities), sustainability (continuity of opportunities for future "
  "generations), productivity (efficient use of resources, especially people) "
  "and empowerment (freedom and power to make choices).",
  "",
  "A development strategy missing any pillar fails: without equity the gains "
  "concentrate, without sustainability they expire.",
  "legy103.txt equity-sustainability-productivity-empowerment section",
  ["name and explain the four pillars of human development",
   "how does equity differ from empowerment",
   "what does sustainability demand of present generations",
   "why is productivity called a people-centred pillar",
   "give an example where equity is violated",
   "link empowerment with political freedom"],
  "verify_property",
  [H.vstep(1, "recite the pillars", "equity, sustainability, productivity and empowerment form the pillar set"),
  H.vstep(2, "pair pillars with failures", "inequity blocks access; unsustainability cancels future options"),
  H.vstep(3, "close with agency", "empowerment turns beneficiaries into decision-makers")]),
 H.concept("legy.103.3", "Approaches to Human Development", "Approaches to Human Development",
  "Four approaches explain or measure human development: the income approach "
  "(linking levels to income), the welfare approach (state responsibility for "
  "welfare), the basic needs approach (minimum needs of food, education, "
  "health) and the capability approach of Amartya Sen (building people's "
  "capabilities to choose).",
  "",
  "The capability approach is the accepted core: development means expanding "
  "what people can be and do, not merely what they consume.",
  "legy103.txt income-welfare-basic needs-capability approaches section",
  ["describe the four approaches to human development",
   "what does the capability approach emphasise",
   "how does the basic needs approach measure progress",
   "criticise the income approach to development",
   "which approach do Human Development Reports follow",
   "relate welfare approach to state policy"],
  "verify_property",
  [H.vstep(1, "list the four", "income, welfare, basic needs and capability are the chapter's approaches"),
  H.vstep(2, "identify the core", "Sen's capability approach underlies the human development index tradition"),
  H.vstep(3, "close with shift", "the shift is from means (income) to ends (chosen lives)")]),
 H.concept("legy.103.4", "Measuring Human Development", "Measuring Human Development",
  "The Human Development Index combines three equally weighted sub-indices - "
  "health (life expectancy), education (schooling) and access to resources "
  "(income) - so the HDI can be estimated as the average of the three index "
  "scores, with countries grouped into very high, high, medium and low "
  "development classes.",
  "hdi_value = (health_index + education_index + income_index) / 3",
  "Averaging the health, education and income sub-indices gives the HDI "
  "value on a 0 to 1 scale.",
  "legy103.txt human development index dimensions and international comparisons",
  ["list the three dimensions of the Human Development Index",
   "compute an HDI estimate from three sub-index scores",
   "name the scholars behind the HDI",
   "how are countries grouped by HDI values",
   "why is income converted to purchasing power parity",
   "what does a low HDI value indicate"],
  "compute",
  [H.cstep(1, "add the three sub-indices", "health, education and income scores are summed", "index_sum = health_index + education_index + income_index"),
   H.cstep(2, "average them", "dividing by three yields the HDI estimate", "hdi_value = (health_index + education_index + income_index) / 3")]),
]
W = [H.we("we_legy103_1", "legy103.txt HDI dimensions", "legy.103.4",
  "A country scores health_index 0.7, education_index 0.5 and income_index "
  "0.6. Estimate its HDI.",
  {"health_index": 0.7, "education_index": 0.5, "income_index": 0.6},
  [H.cstep(1, "add the sub-indices", "0.7 + 0.5 + 0.6", "index_sum = health_index + education_index + income_index"),
   H.cstep(2, "divide by three", "the average gives the HDI estimate", "hdi_value = (health_index + education_index + income_index) / 3")]),
 H.we("we_legy103_2", "legy103.txt pillars section", "legy.103.2",
  "Match each pillar of human development to one policy example.",
  {},
  [H.vstep(1, "equity", "scholarships for first-generation learners widen access"),
   H.vstep(2, "sustainability", "renewable energy keeps options open for the future"),
   H.vstep(3, "empowerment", "local self-government transfers decision-making to people")],
  qtype="short_answer"),
 H.we("we_legy103_3", "legy103.txt capability approach", "legy.103.3",
  "Why is the capability approach preferred over the income approach?",
  {},
  [H.vstep(1, "income as means", "income matters only through what it enables people to do"),
   H.vstep(2, "capabilities as ends", "health, knowledge and voice are valued directly as chosen lives"),
   H.vstep(3, "conclusion", "the capability approach captures freedom, which income alone misses")],
  qtype="short_answer")]
E = [H.ex("ex_legy103_1", "legy103.txt end-of-chapter exercises, reworded",
          ["distinguish growth and development with examples",
           "explain the four pillars of human development",
           "compute an HDI estimate from three given sub-indices",
           "describe the four approaches to human development",
           "why do Human Development Reports rank countries"]),
     H.ex("ex_legy103_2", "legy103.txt applied questions, reworded",
          ["relate the capability approach to schooling policy",
           "argue whether high growth guarantees development",
           "explain sustainability with a resource example",
           "compare basic needs and welfare approaches",
           "identify the HDI class of a country with given sub-indices"])]
H.emit("legy103", H.make_cat("legy103", "मानव विकास", C, W, E))

# ---------------- legy104: Primary Activities ---------------- #
C = [
 H.concept("legy.104.1", "Food Gathering and Hunting", "Food Gathering and Hunting",
  "The earliest primary activities are food gathering and hunting, practised "
  "today by small groups like the Bushmen of Kalahari, Pygmies of Congo and "
  "the Chukchis, whose tools are simple and whose survival depends on the "
  "natural availability of plants and animals.",
  "",
  "These economies neither cultivate nor herd: they live directly on what "
  "nature offers, which keeps them mobile and small in number.",
  "legy104.txt food gathering and hunting sections with tribal examples",
  ["name present-day hunter-gatherer groups and their regions",
   "why are hunting-gathering economies always small in numbers",
   "what tools characterise gatherer-hunter groups",
   "how does mobility suit a gathering economy",
   "compare hunting with gathering as livelihoods",
   "why is this activity called a primary activity"],
  "verify_property",
  [H.vstep(1, "list the groups", "Bushmen, Pygmies and Chukchis are the chapter's surviving examples"),
  H.vstep(2, "note the logic", "dependence on wild produce caps population density and forces movement"),
  H.vstep(3, "close with definition", "extracting food directly from nature makes it primary in the strictest sense")]),
 H.concept("legy.104.2", "Pastoral Nomadism and Transhumance", "Pastoralism",
  "Pastoral nomadism is a subsistence herding system in which nomads move "
  "with camels, yaks, sheep and goats across arid lands of Sahara, Central "
  "Asia and Tibet following fodder; in mountain regions like the Alps the "
  "seasonal movement of herders between high pastures and valleys is called "
  "transhumance.",
  "",
  "Nomadism is horizontal mobility across drylands while transhumance is "
  "vertical mobility across mountains, both timed by seasons.",
  "legy104.txt pastoral nomadism and transhumance passages",
  ["define pastoral nomadism with regions and animals",
   "what is transhumance and where is it practised",
   "distinguish nomadism from transhumance",
   "how do nomads decide their movement routes",
   "why do herdsmen prefer camels and goats in deserts",
   "compare ranching with pastoral nomadism"],
  "verify_property",
  [H.vstep(1, "define the systems", "nomads roam drylands; transhumant herders climb Alps pastures seasonally"),
  H.vstep(2, "match animals to climate", "camels, goats and sheep survive aridity; yaks suit high altitude cold"),
  H.vstep(3, "close with seasons", "both movements follow the calendar of fodder availability")]),
 H.concept("legy.104.3", "Types of Agriculture", "Agriculture",
  "Agriculture ranges from intensive subsistence farming of dense monsoon "
  "Asia, plantation agriculture of tropical estates (tea, coffee, rubber), "
  "extensive commercial grain farming of North American prairies, mixed "
  "farming and dairy of western Europe, Mediterranean agriculture with "
  "viticulture, to co-operative, collective and state farms of the socialist "
  "tradition.",
  "",
  "Farm types answer market and environment together: subsistence feeds the "
  "household, plantations and grain farms feed the world market.",
  "legy104.txt agriculture classification sections",
  ["distinguish intensive subsistence from extensive commercial farming",
   "what crops characterise plantation agriculture",
   "define viticulture and its region",
   "how do dairy and mixed farming differ",
   "describe collective and state farms of the former USSR",
   "why is Mediterranean agriculture specialised in horticulture"],
  "verify_property",
  [H.vstep(1, "sort by purpose", "subsistence types sell little; commercial types organise for the market"),
  H.vstep(2, "map the examples", "tea estates, prairie wheat farms and Danish dairies typify distinct systems"),
  H.vstep(3, "close with institutions", "co-operative, collective and state farms differ by who owns and manages them")]),
 H.concept("legy.104.4", "Mining and Fishing", "Mining and Fishing",
  "Mining extracts minerals through surface or shaft methods, its location "
  "fixed by geological occurrence but profitability decided by transport and "
  "market factors; fishing, an age-old primary activity, divides into inland "
  "and deep-sea fishing with modern vessels using sonar and freezing "
  "technology.",
  "",
  "Both activities depend on nature's endowment but their scale is set by "
  "technology and demand.",
  "legy104.txt mining factors and fishing methods sections",
  ["list the physical and economic factors affecting mining",
   "compare surface and shaft mining",
   "distinguish inland from deep-sea fishing",
   "what technologies raised the fish catch in modern times",
   "why is fishing concentrated on continental shelves",
   "relate primary activities to resource depletion risks"],
  "verify_property",
  [H.vstep(1, "split the determinants", "geology decides where minerals lie; economics decides whether mining pays"),
  H.vstep(2, "note fishing geography", "shallow warm shelves teem with plankton and so with fish"),
  H.vstep(3, "close with technology", "sonar, refrigeration and factory ships industrialised the catch")]),
]
W = [H.we("we_legy104_1", "legy104.txt pastoralism passages", "legy.104.2",
  "Differentiate pastoral nomadism from transhumance with regions.",
  {},
  [H.vstep(1, "nomadism", "dryland herders of Sahara and Central Asia move long distances for fodder"),
   H.vstep(2, "transhumance", "Alpine herders shift vertically between valley winter homes and summer pastures"),
   H.vstep(3, "contrast", "the first is wide horizontal roaming, the second a fixed seasonal climb")],
  qtype="short_answer"),
 H.we("we_legy104_2", "legy104.txt agriculture sections", "legy.104.3",
  "Classify prairie grain farming, Assam tea estates and Danish dairy farming "
  "into the chapter's farm types.",
  {},
  [H.vstep(1, "prairies", "extensive commercial grain farming with machinery and export orientation"),
   H.vstep(2, "tea estates", "plantation agriculture with hired labour and a single crop"),
   H.vstep(3, "Denmark", "dairy farming linked to mixed farming and market cooperatives")],
  qtype="short_answer"),
 H.we("we_legy104_3", "legy104.txt mining section", "legy.104.4",
  "Explain why a rich mineral deposit may still remain unexploited.",
  {},
  [H.vstep(1, "geology is fixed", "deposits occur where nature put them, not where demand is"),
   H.vstep(2, "economics decides", "distance from market and transport costs can erase profits"),
   H.vstep(3, "conclusion", "exploitation waits until price and infrastructure turn the deposit viable")],
  qtype="short_answer")]
E = [H.ex("ex_legy104_1", "legy104.txt end-of-chapter exercises, reworded",
          ["describe food gathering and hunting with present-day examples",
           "differentiate pastoral nomadism and transhumance",
           "explain plantation agriculture with crop and region examples",
           "compare co-operative, collective and state farming",
           "list factors affecting the location of mining activity"]),
     H.ex("ex_legy104_2", "legy104.txt applied questions, reworded",
          ["argue why primary activities remain relevant in modern economies",
           "evaluate fishing technology and the risk of over-fishing",
           "explain Mediterranean agriculture with viticulture",
           "match farm types with their regions and products",
           "discuss sustainability limits of mining-based economies"])]
H.emit("legy104", H.make_cat("legy104", "Primary Activities", C, W, E))

# ---------------- legy105: Secondary Activities ---------------- #
C = [
 H.concept("legy.105.1", "Nature and Classification of Manufacturing",
  "Nature of Secondary Activities",
  "Secondary activities transform raw materials into finished goods; "
  "manufacturing is classified by scale (artisan, craft, cottage, factory, "
  "large-scale), by raw material (agro-based, mineral-based, forest-based) "
  "and by ownership (public, private, joint, multinational).",
  "",
  "Value addition is the test of manufacturing: the product must be worth "
  "more than the raw materials and labour that entered it.",
  "legy105.txt manufacturing classification sections",
  ["define manufacturing and value addition",
   "classify industries by scale of production",
   "differentiate cottage from factory industry",
   "give examples of agro-based and mineral-based industries",
   "how does ownership distinguish public and joint sector units",
   "what is a footloose industry's classification basis"],
  "verify_property",
  [H.vstep(1, "test value addition", "changing cotton cloth to garments raises worth, the definition of manufacturing"),
  H.vstep(2, "sort the bases", "scale, raw material and ownership are three independent classification axes"),
  H.vstep(3, "close with examples", "steel from ore and sugar from cane show mineral and agro bases")]),
 H.concept("legy.105.2", "Location Factors of Industry", "Factors Influencing Industrial Location",
  "Industrial location is decided by access to raw materials, market, labour, "
  "power, transport and capital, moderated by agglomeration economies and "
  "government policy; modern footloose and high-tech industries escape the "
  "raw material pull and follow skilled labour and communication networks.",
  "",
  "When raw material is weight-losing the factory moves to the source; when "
  "the product is perishable or heavy it moves to the market.",
  "legy105.txt location factors and footloose industry sections",
  ["list the major factors of industrial location",
   "why do weight-losing industries locate near raw materials",
   "what are agglomeration economies",
   "define footloose industry and give its features",
   "what distinguishes high-tech industries",
   "how does government policy shift industrial location"],
  "verify_property",
  [H.vstep(1, "read the pull factors", "raw material, market, labour, power and transport anchor classical location theory"),
  H.vstep(2, "apply the weight rule", "sugar and copper smelting move to sources because weight is lost in processing"),
  H.vstep(3, "close with footloose logic", "software firms follow skilled minds and data links, not mines")]),
 H.concept("legy.105.3", "Major Manufacturing Regions", "Some Theories of Manufacturing Location",
  "Modern manufacturing is highly concentrated: the major manufacturing "
  "regions of North America, Europe and East Asia cover less than 10 per cent "
  "of the world's land area, so the remaining land share is about 90 per "
  "cent outside these belts.",
  "non_manufacturing_share = 100 - manufacturing_land_share",
  "Subtracting the manufacturing belt share from 100 gives the land share "
  "outside the great manufacturing regions.",
  "legy105.txt distribution of manufacturing regions (less than 10 per cent of land)",
  ["what share of land do major manufacturing regions cover",
   "compute the land share outside manufacturing belts",
   "name the world's major manufacturing regions",
   "why does manufacturing concentrate in few places",
   "relate agglomeration to regional concentration",
   "how does the developing world enter manufacturing maps"],
  "compute",
  [H.cstep(1, "record the manufacturing share", "the belts cover about 10 per cent of land", "manufacturing_land_share = 10"),
   H.cstep(2, "subtract from 100", "the remainder lies outside the belts", "non_manufacturing_share = 100 - manufacturing_land_share")]),
 H.concept("legy.105.4", "Theories of Industrial Location", "Some Theories of Manufacturing Location",
  "Location theory explains the best site for a plant: Weber's least-cost "
  "approach minimises transport and labour costs through locational "
  "triangles, while modern thinking adds agglomeration, government policy and "
  "innovation networks to the calculus.",
  "",
  "Weighing transport against labour and agglomeration costs is the durable "
  "core of industrial location reasoning.",
  "legy105.txt least-cost theory and agglomeration discussions",
  ["state Weber's least-cost theory and its locational triangle",
   "how do labour and agglomeration modify transport costs",
   "apply least-cost reasoning to a sugar mill",
   "what role does government policy play in location",
   "why do related industries cluster together",
   "compare classical and modern location thinking"],
  "verify_property",
  [H.vstep(1, "draw the triangle", "two material sources and one market set Weber's minimum-cost geometry"),
  H.vstep(2, "add the modifiers", "cheap labour or clustered services can pull the plant off the pure transport point"),
  H.vstep(3, "close with realism", "policy zones and innovation districts reshape the classic map today")]),
]
W = [H.we("we_legy105_1", "legy105.txt manufacturing distribution", "legy.105.3",
  "Major manufacturing regions cover about 10 per cent of the world's land. "
  "Compute the land share outside these regions.",
  {"manufacturing_land_share": 10},
  [H.cstep(1, "record the belt share", "10 per cent of land lies under manufacturing belts", "manufacturing_land_share = 10"),
   H.cstep(2, "subtract from 100", "100 - 10 = 90 per cent lies outside", "non_manufacturing_share = 100 - manufacturing_land_share")]),
 H.we("we_legy105_2", "legy105.txt location factors", "legy.105.2",
  "Why does a sugar mill locate near cane fields while a garment factory may "
  "locate in a city?",
  {},
  [H.vstep(1, "weight-losing case", "cane loses most of its weight in milling, so transport favours the field site"),
   H.vstep(2, "market-linked case", "garments gain value per unit weight and need urban labour and fashion information"),
   H.vstep(3, "conclusion", "the weight-to-value ratio decides the pull of source versus market")],
  qtype="short_answer"),
 H.we("we_legy105_3", "legy105.txt footloose section", "legy.105.2",
  "List three features that make a high-tech industry footloose.",
  {},
  [H.vstep(1, "light raw material", "chips and software carry little weight per rupee of value"),
   H.vstep(2, "skill dependence", "researchers matter more than ore or cheap power"),
   H.vstep(3, "network link", "data highways replace rail links as the vital connection")],
  qtype="short_answer")]
E = [H.ex("ex_legy105_1", "legy105.txt end-of-chapter exercises, reworded",
          ["classify manufacturing by scale, raw material and ownership",
           "compute the land share outside the major manufacturing regions",
           "explain Weber's least-cost location theory",
           "define footloose industries with examples",
           "discuss agglomeration economies with a cluster example"]),
     H.ex("ex_legy105_2", "legy105.txt applied questions, reworded",
          ["argue the location logic of an aluminium smelter",
           "contrast cottage and factory industry",
           "evaluate high-tech regions like Silicon Valley",
           "show how policy zones alter industrial geography",
           "relate value addition to secondary activity definition"])]
H.emit("legy105", H.make_cat("legy105", "Secondary Activities", C, W, E))

# ---------------- legy106: Tertiary and Quaternary Activities ---------------- #
C = [
 H.concept("legy.106.1", "Nature of Tertiary Activities", "Tertiary Activities",
  "Tertiary activities involve the provision of services and exchange of "
  "produced goods - trade, transport, communication and commercial services; "
  "unlike secondary work they do not transform matter but support production "
  "and connect producers with consumers.",
  "",
  "Services have outgrown manufacturing in developed economies, making the "
  "tertiary sector the largest employer of the modern age.",
  "legy106.txt tertiary activities definition and trade-transport sections",
  ["define tertiary activities and give examples",
   "how do tertiary activities support secondary production",
   "distinguish tertiary from secondary activities",
   "name the components of the service economy",
   "why are services called the exchange of knowledge",
   "relate urbanisation to growth of services"],
  "verify_property",
  [H.vstep(1, "define the sector", "service provision, not matter transformation, defines the tertiary sector"),
  H.vstep(2, "link the sectors", "transport and trade complete what factories begin"),
  H.vstep(3, "close with employment", "service jobs now dominate developed economies' workforce")]),
 H.concept("legy.106.2", "Tourism: The Largest Tertiary Activity", "Tourism",
  "Tourism has become the world's single largest tertiary activity with about "
  "250 million registered jobs and revenue near 40 per cent of total GDP, "
  "fed by cultural, adventure and historical tourism; coastal, mountain and "
  "heritage resources drive the flows.",
  "tourism_jobs = 250",
  "Tourism sustains about 250 million jobs worldwide, its share of world "
  "revenue being around 40 per cent of total GDP.",
  "legy106.txt tourism scale (250 million jobs, 40 per cent of GDP) and tourism types",
  ["state the size of tourism in jobs and GDP share",
   "compute or recall the world tourism job count",
   "name the types of tourism described in the chapter",
   "why do coastal and mountain areas attract tourists",
   "what is eco-tourism",
   "how does tourism alter local economies and environments"],
  "compute",
  [H.cstep(1, "record the job count", "tourism registers about 250 million jobs worldwide", "tourism_jobs = 250"),
   H.cstep(2, "note the revenue share", "revenue equals about 40 per cent of total GDP", "tourism_gdp_share = 40")]),
 H.concept("legy.106.3", "Medical Services and Medical Tourism", "Medical Services",
  "Medical tourism draws foreign patients to countries offering skilled care "
  "at lower cost; about 55,000 patients from the USA visited India in 2005 "
  "for treatment, showing how services are traded across borders.",
  "",
  "When services cross borders, wages and standards arbitrage: skilled "
  "doctors and low costs make India a destination, not a source, of patients.",
  "legy106.txt medical services for overseas patients (55,000 US patients in 2005)",
  ["what is medical tourism and why does it grow",
   "how many US patients visited India in 2005 for treatment",
   "which Indian centres attract overseas patients",
   "compare medical tourism with conventional tourism",
   "what infrastructure supports medical tourism",
   "discuss the risks of export-oriented health services"],
  "verify_property",
  [H.vstep(1, "quote the flow", "55,000 US patients came to India in 2005 for treatment"),
  H.vstep(2, "explain the economics", "low cost plus internationally comparable skill draws patients across borders"),
  H.vstep(3, "close with caution", "balancing export care with domestic needs is the policy challenge")]),
 H.concept("legy.106.4", "Quaternary and Quinary Activities", "Quaternary Activities",
  "Quaternary activities are knowledge-based services - research, information "
  "generation, consultancy, data processing and outsourcing - carried by "
  "professionals; quinary activities are the highest-level decision-making "
  "by top executives and officials.",
  "",
  "Outsourcing shifts quaternary tasks to distant countries, making knowledge "
  "work as tradable as goods.",
  "legy106.txt quaternary-quinary sections and outsourcing discussion",
  ["define quaternary activities with examples",
   "how do quinary activities differ from quaternary",
   "what is outsourcing and why do firms outsource",
   "name the skills demanded by quaternary work",
   "which cities lead global outsourcing and why",
   "relate the digital divide to quaternary services"],
  "verify_property",
  [H.vstep(1, "separate the levels", "knowledge services are quaternary; top-level executive decisions are quinary"),
  H.vstep(2, "spot the geography", "back offices in Bangalore and Manila serve clients in distant time zones"),
  H.vstep(3, "close with skills", "education and digital access decide who participates in this sector")]),
]
W = [H.we("we_legy106_1", "legy106.txt tourism scale", "legy.106.2",
  "Recall the size of world tourism in jobs and GDP share as given in the chapter.",
  {"tourism_jobs": 250, "tourism_gdp_share": 40},
  [H.cstep(1, "state the job count", "about 250 million registered jobs", "tourism_jobs = 250"),
   H.cstep(2, "state the GDP share", "revenue equals about 40 per cent of total GDP", "tourism_gdp_share = 40")]),
 H.we("we_legy106_2", "legy106.txt medical services", "legy.106.3",
  "Explain medical tourism with the chapter's India example.",
  {},
  [H.vstep(1, "define the trade", "foreign patients travel for skilled, lower-cost treatment"),
   H.vstep(2, "quote the data", "about 55,000 US patients visited India in 2005"),
   H.vstep(3, "conclusion", "service trade follows skill-cost differentials like any export")],
  qtype="short_answer"),
 H.we("we_legy106_3", "legy106.txt quaternary section", "legy.106.4",
  "Distinguish quaternary from quinary activities with one example each.",
  {},
  [H.vstep(1, "quaternary", "research analysts and IT service workers generate and process knowledge"),
   H.vstep(2, "quinary", "CEOs, ministers and university vice-chancellors take highest-level decisions"),
   H.vstep(3, "contrast", "the first creates knowledge services, the second exercises top authority")],
  qtype="short_answer")]
E = [H.ex("ex_legy106_1", "legy106.txt end-of-chapter exercises, reworded",
          ["define tertiary activities and their components",
           "state the size of world tourism in jobs and GDP share",
           "explain medical tourism with the 2005 India example",
           "differentiate quaternary and quinary activities",
           "discuss outsourcing and its geography"]),
     H.ex("ex_legy106_2", "legy106.txt applied questions, reworded",
          ["argue why services dominate developed economies",
           "evaluate eco-tourism as sustainable development",
           "compare trade in goods with trade in services",
           "map the leading destinations of medical tourism",
           "relate the digital divide to quaternary employment"])]
H.emit("legy106", H.make_cat("legy106", "Tertiary and Quaternary Activities", C, W, E))

# ---------------- legy107: Transport and Communication ---------------- #
C = [
 H.concept("legy.107.1", "Transport Network and Modes", "Transport",
  "Transport is a service linking production with consumption through lines "
  "and nodes; its modes are land (roads and railways), water (inland and "
  "ocean), air and pipelines, each chosen by distance, weight, value and "
  "urgency of the goods moved.",
  "",
  "A network's worth lies in nodes and accessibility: the denser the links, "
  "the lower the friction of distance.",
  "legy107.txt transport network, nodes and mode selection sections",
  ["define transport and its components of network",
   "list the major modes of transport",
   "what factors decide the choice of transport mode",
   "explain nodes and links in a network",
   "how does friction of distance shape transport costs",
   "compare land and water transport for bulk goods"],
  "verify_property",
  [H.vstep(1, "name the modes", "road, rail, water, air and pipelines are the chapter's modes"),
  H.vstep(2, "match goods to modes", "bulk ore rides rails and ships, perishables fly, fluids move by pipelines"),
  H.vstep(3, "close with accessibility", "nodes like ports and junctions concentrate value on the network")]),
 H.concept("legy.107.2", "Roads: Length and Regional Shares", "Roadways",
  "The world's total motorable road length is only about 15 million km, of "
  "which North America accounts for about 33 per cent, with highway density "
  "there reaching about 0.65 km per sq km.",
  "na_road_length = total_road_length * na_share / 100",
  "Multiplying the world road length by North America's percentage share "
  "gives its approximate road length in million km.",
  "legy107.txt road length (15 million km), North America share (33 per cent) and density 0.65 km per sq km",
  ["what is the world's total motorable road length",
   "compute North America's share of world road length",
   "state North America's highway density",
   "why is road transport flexible compared with rail",
   "contrast highway networks of developed and developing countries",
   "what is the Trans-Canadian highway route"],
  "compute",
  [H.cstep(1, "record the world total and share", "total 15 million km, North America 33 per cent", "na_share = 33"),
   H.cstep(2, "apply the percentage", "share times total gives the regional length", "na_road_length = total_road_length * na_share / 100")]),
 H.concept("legy.107.3", "Railways, Waterways and Air Routes", "Railways, Waterways and Airways",
  "Railways carry heavy traffic on dense networks of Europe, Russia and North "
  "America, with trans-continental lines like the Trans-Siberian linking "
  "continents; inland and ocean waterways offer the cheapest bulk transport "
  "through canals like Suez and Panama, while airways serve long-distance "
  "high-value flows through great airports.",
  "",
  "Each trunk route overcame a natural barrier - the Trans-Siberian crossed "
  "the taiga, the Suez canal cut the Cape route - shortening world distance.",
  "legy107.txt railway networks, trans-continental lines, Suez and Panama canals, air routes",
  ["name the major trans-continental railways and their routes",
   "why are Suez and Panama canals strategic waterways",
   "compare rail and water transport for bulk cargo",
   "which regions hold dense railway networks",
   "how did airways change long-distance transport",
   "state the role of inland waterways in Europe"],
  "verify_property",
  [H.vstep(1, "trace the trunk lines", "the Trans-Siberian spans Russia linking Europe with the Pacific"),
  H.vstep(2, "price the canals", "Suez and Panama shorten voyages by thousands of kilometres"),
  H.vstep(3, "close with air", "airways carry urgency and value, not bulk")]),
 H.concept("legy.107.4", "Communication Services", "Communication",
  "Communication networks carry messages rather than matter: postal services "
  "form the land-based grid, telecom and satellite systems carry voice and "
  "data instantly, and the internet with undersea cables integrates the "
  "global economy.",
  "",
  "Mass media and cyberspace compress space so that information moves faster "
  "than any transport mode.",
  "legy107.txt postal, telecom, satellite and internet sections",
  ["classify communication services into personal and mass media",
   "how do satellites support global communication",
   "what role do undersea cables play in the internet",
   "compare postal and electronic communication",
   "why is communication called the nervous system of the economy",
   "state the meaning of a communication network's accessibility"],
  "verify_property",
  [H.vstep(1, "split the grid", "posts move paper messages; telecom and internet move electronic ones"),
  H.vstep(2, "note the infrastructure", "satellites and undersea fibre form the long-haul backbone"),
  H.vstep(3, "close with integration", "real-time communication globalised finance and production")]),
]
W = [H.we("we_legy107_1", "legy107.txt road length passage", "legy.107.2",
  "World motorable road length is about 15 million km and North America holds "
  "33 per cent of it. Compute North America's road length in million km.",
  {"total_road_length": 15, "na_share": 33},
  [H.cstep(1, "record totals", "15 million km total with a 33 per cent North American share", "total_road_length = 15"),
   H.cstep(2, "apply the percentage", "15 times 33 divided by 100 gives about 4.95 million km", "na_road_length = total_road_length * na_share / 100")]),
 H.we("we_legy107_2", "legy107.txt canals passage", "legy.107.3",
  "Why are the Suez and Panama canals called strategic waterways?",
  {},
  [H.vstep(1, "Suez shortens Asia-Europe", "it removes the Cape of Good Hope detour for Asian trade"),
   H.vstep(2, "Panama joins two oceans", "Atlantic-Pacific shipping saves the long South American passage"),
   H.vstep(3, "conclusion", "canal chokepoints set the geometry of world shipping")],
  qtype="short_answer"),
 H.we("we_legy107_3", "legy107.txt communication section", "legy.107.4",
  "List two personal and two mass communication services from the chapter.",
  {},
  [H.vstep(1, "personal services", "postal mail and telephone connect individuals"),
   H.vstep(2, "mass media", "radio and television reach mass audiences at once"),
   H.vstep(3, "contrast", "personal channels are targeted, mass media broadcast to all")],
  qtype="short_answer")]
E = [H.ex("ex_legy107_1", "legy107.txt end-of-chapter exercises, reworded",
          ["explain the modes of transport with their choice factors",
           "compute North America's road length from the world total and share",
           "describe trans-continental railways with examples",
           "state the strategic importance of the Suez and Panama canals",
           "differentiate personal and mass communication services"]),
     H.ex("ex_legy107_2", "legy107.txt applied questions, reworded",
          ["argue why highways dominate short-distance freight",
           "evaluate air transport for perishable exports",
           "map the world's densest railway regions",
           "relate satellite technology to navigation and weather services",
           "discuss the digital divide in communication networks"])]
H.emit("legy107", H.make_cat("legy107", "Transport and Communication", C, W, E))

# ---------------- legy108: International Trade ---------------- #
C = [
 H.concept("legy.108.1", "Basis and History of International Trade", "History of International Trade",
  "International trade is the exchange of goods and services across national "
  "boundaries, based on differences in resource endowments, technology and "
  "specialisation; historically it moved from the Silk Route and medieval "
  "spice trade to the slave trade and the industrial-era exchange of raw "
  "materials for manufactures.",
  "",
  "Trade follows comparative advantage: nations export what their resources "
  "and skills produce best and import the rest.",
  "legy108.txt trade basis, Silk Route, slave trade and industrial trade history",
  ["define international trade and its basis",
   "trace the Silk Route's role in early trade",
   "how did the slave trade shape Atlantic commerce",
   "what changed with the industrial revolution in trade patterns",
   "distinguish bilateral and multilateral trade",
   "give examples of resource-based and skill-based exports"],
  "verify_property",
  [H.vstep(1, "state the basis", "unequal endowments and specialisation make exchange beneficial"),
  H.vstep(2, "recall the routes", "the Silk Route carried silk and ideas; the triangular trade moved slaves and cotton"),
  H.vstep(3, "close with industrialism", "factories turned colonies into raw material suppliers and captive markets")]),
 H.concept("legy.108.2", "Balance of Trade", "Why Does International Trade Occur",
  "Balance of trade is the difference between the value of a country's "
  "exports and its imports in a year; exports exceeding imports give a "
  "positive or favourable balance, imports exceeding exports a negative or "
  "unfavourable balance.",
  "trade_balance = exports_value - imports_value",
  "Subtracting import value from export value yields the trade balance, "
  "positive when exports lead.",
  "legy108.txt balance of trade definition (positive and negative)",
  ["define balance of trade with its formula",
   "compute a trade balance from export and import values",
   "when is the balance called favourable",
   "why is an unfavourable balance a concern",
   "how does trade balance link to foreign exchange",
   "give an example of a country with a favourable balance"],
  "compute",
  [H.cstep(1, "record the two values", "exports and imports are valued in a common currency", "exports_value = 1"),
   H.cstep(2, "subtract imports from exports", "a positive result is a favourable balance", "trade_balance = exports_value - imports_value")]),
 H.concept("legy.108.3", "World Trade Patterns and Institutions",
  "World Trade Organisation and Trade Blocs",
  "World trade is dominated by developed regions which exchange manufactures "
  "and services, while developing countries export primary products and "
  "low-skill manufactures; the World Trade Organisation regulates multilateral "
  "trade rules, and regional blocs like the EU and NAFTA liberalise trade "
  "within groups.",
  "",
  "The terms of trade debate centres on falling primary product prices "
  "against rising manufactured goods prices, keeping developing exporters "
  "disadvantaged.",
  "legy108.txt world trade patterns, WTO and trade blocs sections",
  ["describe the pattern of world trade between regions",
   "what does the World Trade Organisation do",
   "name major trade blocs and their purpose",
   "why do developing countries seek fairer terms of trade",
   "contrast exports of developed and developing countries",
   "how do trade blocs both help and hinder global trade"],
  "verify_property",
  [H.vstep(1, "split the exporters", "developed regions sell manufactures and services; developing regions sell primaries"),
  H.vstep(2, "state the rule-maker", "the WTO frames and enforces multilateral trade rules"),
  H.vstep(3, "close with blocs", "the EU and NAFTA internalise free trade while protecting their borders")]),
 H.concept("legy.108.4", "Ports as Gateways of Trade", "Ports",
  "Ports are the gateways of international trade, classified as commercial, "
  "oil, fishing, container and refuge ports; gateway ports like London and "
  "Singapore command hinterlands and forelands, linking the interior with "
  "overseas markets.",
  "",
  "A port's power lies in its hinterland's produce and its foreland's "
  "connections, which is why container hubs dominate modern shipping.",
  "legy108.txt port types, hinterland and foreland discussion",
  ["define ports and their major types",
   "explain hinterland and foreland of a port",
   "what makes a port a gateway port",
   "why have container ports grown in importance",
   "name two great gateway ports of the world",
   "relate port efficiency to trade competitiveness"],
  "verify_property",
  [H.vstep(1, "sort the types", "commercial, oil, fishing, container and refuge ports serve distinct trades"),
  H.vstep(2, "define the lands", "hinterland is the producing interior; foreland is the overseas market side"),
  H.vstep(3, "close with containers", "standardised boxes and gantry cranes cut turnaround time, crowning hub ports")]),
]
W = [H.we("we_legy108_1", "legy108.txt balance of trade definition", "legy.108.2",
  "A country exports goods worth 800 billion currency units and imports worth "
  "950 billion. Compute its trade balance and state its nature.",
  {"exports_value": 800, "imports_value": 950},
  [H.cstep(1, "record the values", "exports 800, imports 950 billion units", "exports_value = 800"),
   H.cstep(2, "subtract imports from exports", "800 - 950 = -150, an unfavourable balance", "trade_balance = exports_value - imports_value")]),
 H.we("we_legy108_2", "legy108.txt hinterland-foreland passage", "legy.108.4",
  "Explain hinterland and foreland using a major port.",
  {},
  [H.vstep(1, "hinterland", "the port's interior supplies exports and absorbs imports along rail-road links"),
   H.vstep(2, "foreland", "the overseas shipping destinations form the market side of the port"),
   H.vstep(3, "conclusion", "Singapore thrives because both its lands are vast and well linked")],
  qtype="short_answer"),
 H.we("we_legy108_3", "legy108.txt WTO passage", "legy.108.3",
  "State two functions of the WTO and one criticism of it by developing countries.",
  {},
  [H.vstep(1, "rule function", "the WTO frames multilateral rules for goods, services and intellectual property"),
   H.vstep(2, "dispute function", "it settles trade disputes among member states"),
   H.vstep(3, "criticism", "developing countries argue that farm subsidies of rich states skew the terms of trade")],
  qtype="short_answer")]
E = [H.ex("ex_legy108_1", "legy108.txt end-of-chapter exercises, reworded",
          ["define international trade and explain its basis",
           "compute trade balance from given export and import values",
           "describe the history of trade from the Silk Route to WTO",
           "explain the terms of trade problem of developing countries",
           "classify ports with examples"]),
     H.ex("ex_legy108_2", "legy108.txt applied questions, reworded",
          ["argue for and against trade blocs",
           "relate specialisation to comparative advantage",
           "map the world's leading container ports",
           "evaluate how port efficiency raises exports",
           "discuss the role of services in modern world trade"])]
H.emit("legy108", H.make_cat("legy108", "International Trade", C, W, E))

print("legy1 done")
